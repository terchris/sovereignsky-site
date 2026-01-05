#!/usr/bin/env node
/**
 * Autofill enrichment fields in data/laws.json for all laws.
 *
 * Goal: ensure every law has:
 * - what_it_does: string[]
 * - who_it_applies_to: string[]
 * - key_provisions: {title, description}[]
 * - compliance_actions: string[]
 * - enforcement: {authority?, max_fine?, notes?}
 *
 * This script is conservative:
 * - It does NOT overwrite existing non-empty values.
 * - It uses existing summary + classification fields to generate safe, plain-language text.
 *
 * Usage:
 *   node scripts/autofill-law-enrichment.js
 */

const fs = require('fs');
const path = require('path');

const LAWS_PATH = path.join(__dirname, '..', 'data', 'laws.json');

function readJson(p) {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJson(p, obj) {
    fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
}

function nonEmptyString(s) {
    return typeof s === 'string' && s.trim().length > 0;
}

function ensureArray(v) {
    return Array.isArray(v) ? v : [];
}

function sentenceSplit(text) {
    if (!nonEmptyString(text)) return [];
    // Simple sentence split; good enough for our short summaries.
    return text
        .split(/(?<=[.!?])\s+/)
        .map(s => s.trim())
        .filter(Boolean);
}

function pushUnique(arr, s) {
    if (!nonEmptyString(s)) return;
    if (!arr.includes(s)) arr.push(s);
}

function defaultWhoAppliesToById(id) {
    const map = {
        // EU digital / platform / competition
        'dsa': ['Online platforms and intermediaries', 'Very large platforms/search engines (VLOPs/VLOSEs)', 'Traders using online platforms'],
        'dma': ['Large “gatekeeper” platforms', 'Business users relying on gatekeepers', 'App developers and ecosystem partners'],
        // EU sectoral / cyber
        'nis2': ['Essential and important entities', 'Operators of critical services (sector-dependent)', 'Management bodies responsible for compliance'],
        'dora': ['Financial entities (banks, insurers, investment firms, etc.)', 'ICT service providers to financial sector', 'Critical third‑party providers (as designated)'],
        'cra': ['Manufacturers of products with digital elements', 'Software vendors/distributors', 'Importers and integrators placing products on the EU market'],
        'ai-act': ['AI system providers', 'Deployers/users of high‑risk AI', 'Importers/distributors of AI systems'],
        'data-act': ['Data holders (device/service providers)', 'Users of connected products and related services', 'Cloud providers (switching/interoperability)'],
        'dga': ['Data intermediaries', 'Public-sector bodies sharing protected data', 'Data altruism organizations'],
        // EU privacy stack / transfers
        'gdpr': ['Data controllers', 'Data processors', 'Organizations processing EU personal data (including outside the EU)'],
        'eprivacy': ['Telecom and electronic communications providers', 'Website/app operators using cookies or similar identifiers', 'Marketers sending electronic communications'],
        'led': ['Law enforcement authorities', 'Criminal justice bodies', 'Processors handling law-enforcement data on behalf of authorities'],
        'schrems-ii': ['Organizations transferring personal data internationally', 'Data exporters/importers using SCCs and safeguards', 'Supervisory authorities evaluating transfers'],
        'eu-us-dpf': ['EU data exporters', 'US companies self‑certifying under the framework', 'Oversight/redress bodies handling complaints'],
        // National implementations / complements
        'bdsg': ['German controllers and processors', 'Employers and public bodies in Germany', 'Organizations subject to GDPR with German-specific rules'],
        'fadp': ['Organizations in Switzerland processing personal data', 'Foreign entities targeting Swiss residents (in some cases)', 'Controllers/processors under Swiss law'],
        'uk-gdpr': ['Controllers and processors subject to UK data protection law', 'Organizations offering goods/services to UK residents (in some cases)', 'Public/private sector organizations handling UK personal data'],
        'personopplysningsloven': ['Controllers and processors in Norway', 'Organizations processing Norwegian residents’ personal data', 'Public and private entities subject to Norwegian GDPR implementation'],
        'ekomlov': ['Telecom/electronic communications providers', 'Network operators', 'Entities subject to lawful interception/retention duties (as applicable)'],
        'sikkerhetsloven': ['Operators of security‑sensitive services', 'Suppliers handling classified/sensitive information', 'Organizations designated under national security rules'],
        // US stack
        'cloud-act': ['US-based service providers', 'Foreign affiliates of US providers (via control)', 'Organizations using US cloud services'],
        'fisa-702': ['Electronic communication service providers (as compelled)', 'Non‑US persons located outside the US (as targets)', 'Organizations whose traffic transits US infrastructure'],
        'eo-12333': ['US intelligence agencies', 'Organizations whose data is collected abroad/in transit', 'Service providers handling international communications'],
        'patriot-act': ['US authorities conducting national security investigations', 'Service providers receiving lawful demands', 'Organizations holding relevant records'],
        'ecpa': ['Electronic communication service providers', 'US law enforcement seeking stored communications', 'Organizations holding electronic communications/records'],
        // UK surveillance/security
        'investigatory-powers-act': ['Telecom operators and service providers', 'Government agencies conducting surveillance', 'Users whose communications may be retained/intercepted'],
        'national-security-act-uk': ['Individuals and organizations involved in sensitive activities', 'Entities subject to foreign interference/espionage offenses', 'Organizations interacting with UK national security processes'],
        // China
        'national-intelligence-law': ['Organizations and citizens in China', 'Companies operating in China', 'Entities asked to provide assistance to intelligence work'],
        'cybersecurity-law': ['Network operators in China', 'Critical information infrastructure operators', 'Providers handling personal/important data'],
        'data-security-law': ['Organizations handling “important data” in China', 'Entities conducting cross‑border data transfers', 'Businesses subject to data classification controls'],
        'pipl': ['Personal information handlers in China', 'Organizations offering products/services to people in China (in some cases)', 'Processors handling personal information on behalf of handlers'],
        // Russia
        'yarovaya-law': ['Telecom operators and internet services in Russia', 'Messaging providers subject to retention/assistance duties', 'Operators handling communications metadata/content (as required)'],
        'data-localization-law': ['Organizations collecting Russian citizens’ personal data', 'Online services targeting Russian users', 'Service providers storing/processing Russian personal data'],
        'sorm': ['Telecom operators and ISPs in Russia', 'Network equipment vendors/integrators', 'Authorities conducting interception under SORM'],
        // India
        'it-act-2000': ['Online platforms and intermediaries in India', 'Organizations receiving decryption/interception orders', 'Users subject to cybercrime provisions'],
        'dpdp-act': ['Data fiduciaries (controllers) in India', 'Data processors acting on behalf of fiduciaries', 'Organizations processing digital personal data in India'],
        // Australia
        'tola-act': ['Telecom and tech service providers', 'Software/hardware vendors receiving assistance requests', 'Organizations subject to secrecy/assistance obligations'],
        // Canada/Japan/Korea/NZ
        'pipeda': ['Private-sector organizations in Canada', 'Organizations handling personal information in commercial activities', 'Service providers processing data for covered orgs'],
        'appi': ['Businesses handling personal information in Japan', 'Organizations transferring personal data internationally', 'Data processors/service providers'],
        'pipa': ['Organizations processing personal information in Korea', 'Online services collecting/using personal data', 'Data processors and vendors'],
        'privacy-act-2020': ['Agencies and organizations in New Zealand covered by the Act', 'Organizations disclosing personal information overseas', 'Entities subject to breach notification duties']
    };
    return map[id] || ['Organizations and service providers in scope', 'Public authorities (where applicable)', 'Individuals whose data/communications are affected'];
}

function defaultEnforcementById(id) {
    const map = {
        // EU
        'gdpr': { authority: 'Independent Data Protection Authorities (DPAs) in each member state', notes: 'Enforcement and interpretations vary by authority; major cases often set de facto market standards.' },
        'eprivacy': { notes: 'Enforcement is generally handled by national authorities under member‑state implementing laws.' },
        'led': { notes: 'Enforcement is handled by national supervisory authorities and courts under member‑state law.' },
        'schrems-ii': { notes: 'A CJEU judgment applied via supervisory authorities and courts when assessing international transfers.' },
        'eu-us-dpf': { notes: 'Operates as an adequacy framework with oversight and redress mechanisms; practical enforcement depends on participating bodies and complaint processes.' },
        'dsa': { notes: 'Enforced by national Digital Services Coordinators; the European Commission has direct powers for VLOPs/VLOSEs.' },
        'dma': { notes: 'Enforced by the European Commission for designated gatekeepers; remedies can include fines and behavioral/structural measures.' },
        'ai-act': { notes: 'Enforced by national market surveillance/competent authorities; governance includes EU‑level coordination.' },
        'nis2': { notes: 'Implemented and enforced by member states via national competent authorities; penalties are set in national law.' },
        'dora': { notes: 'Supervised by financial regulators and competent authorities; sanctions and supervisory measures are sector‑specific.' },
        'data-act': { notes: 'Enforced by member states via competent authorities; penalties are set by national law.' },
        'dga': { notes: 'Supervised by member‑state authorities (varies by role: intermediaries, altruism, public‑sector data sharing).' },
        'cra': { notes: 'Market surveillance authorities enforce product compliance; enforcement is tied to product safety/CE‑style compliance regimes.' },
        // UK
        'uk-gdpr': { authority: 'UK Information Commissioner’s Office (ICO)', notes: 'UK GDPR is enforced by the ICO; interpretations can differ from EU post‑Brexit.' },
        'investigatory-powers-act': { notes: 'Oversight involves judicial/commissioner mechanisms; compliance obligations are imposed on providers via warrants/notices.' },
        'national-security-act-uk': { notes: 'Enforced through UK law enforcement and prosecutorial processes; application depends on specific offenses and powers used.' },
        // Norway / Germany / Switzerland
        'personopplysningsloven': { authority: 'Norwegian Data Protection Authority (Datatilsynet)', notes: 'Enforced under Norwegian GDPR implementation; sectoral rules may also apply.' },
        'bdsg': { notes: 'Enforced alongside GDPR by German supervisory authorities; includes German-specific rules and exemptions.' },
        'fadp': { notes: 'Enforced by Swiss authorities under the Federal Act on Data Protection; specific remedies depend on Swiss law.' },
        'ekomlov': { notes: 'Enforced by Norwegian regulators under telecom rules; obligations depend on implementing regulations and orders.' },
        'sikkerhetsloven': { notes: 'Enforced by national security authorities; applicability depends on designation of security‑sensitive functions.' },
        // US
        'cloud-act': { notes: 'Orders are issued through US legal process; providers may be compelled to disclose data even if stored abroad.' },
        'fisa-702': { notes: 'Operates through US intelligence legal mechanisms; transparency is limited and oversight is specialized.' },
        'eo-12333': { notes: 'Executive authority exercised by intelligence agencies; oversight is primarily internal/executive and specialized.' },
        'patriot-act': { notes: 'Enforced via US national security and law‑enforcement processes; scope depends on the specific provision invoked.' },
        'ecpa': { notes: 'Enforced via US criminal procedure and court orders; requirements vary by data type and age/storage.' },
        // China / Russia / India / AU / CA / JP / KR / NZ
        'national-intelligence-law': { notes: 'Applies through Chinese state authorities; compelled assistance may be subject to secrecy requirements.' },
        'cybersecurity-law': { notes: 'Enforced by Chinese regulators; includes security reviews and localization obligations for certain operators.' },
        'data-security-law': { notes: 'Enforced by Chinese authorities through data classification and transfer control mechanisms.' },
        'pipl': { notes: 'Enforced by Chinese regulators; cross‑border transfers and localization rules can be strict depending on data type.' },
        'yarovaya-law': { notes: 'Enforced by Russian authorities; providers may face retention and decryption/assistance obligations.' },
        'data-localization-law': { notes: 'Enforced by Russian regulators; noncompliance can lead to blocking or administrative measures.' },
        'sorm': { notes: 'Enforced by Russian security services; providers must enable lawful interception capabilities.' },
        'it-act-2000': { notes: 'Enforced via Indian authorities and courts; interception/decryption directions depend on orders under the Act and rules.' },
        'dpdp-act': { notes: 'Enforced by India’s Data Protection Board (and related processes) with penalties defined in the Act and rules.' },
        'tola-act': { notes: 'Enforced via Australian authorities; assistance notices may include secrecy obligations.' },
        'pipeda': { authority: 'Office of the Privacy Commissioner of Canada (OPC)', notes: 'Enforcement historically relied on investigations and recommendations; remedies depend on the specific framework and amendments.' },
        'appi': { authority: 'Personal Information Protection Commission (PPC, Japan)', notes: 'Enforced by the PPC; cross‑border transfer rules and safeguards apply.' },
        'pipa': { authority: 'Personal Information Protection Commission (PIPC, Korea)', notes: 'Enforced by the PIPC with strong powers and administrative sanctions.' },
        'privacy-act-2020': { authority: 'Office of the Privacy Commissioner (New Zealand)', notes: 'Enforced via investigations and compliance mechanisms; includes breach notification requirements.' }
    };
    return map[id] || { notes: 'Enforcement varies by jurisdiction and implementation; see the official text for details.' };
}

function buildWhatItDoes(law) {
    const bullets = [];
    const sentences = sentenceSplit(law.summary);
    // Use up to 2 sentences from summary
    pushUnique(bullets, sentences[0]);
    if (sentences[1]) pushUnique(bullets, sentences[1]);

    // Add classification-based bullets (safe and general)
    if (law.requires_localization) {
        pushUnique(bullets, 'May require certain categories of data to be stored or processed within the jurisdiction.');
    }
    if (law.requires_backdoor) {
        pushUnique(bullets, 'May compel technical assistance such as decryption support or access enablement under legal process.');
    } else if (law.government_access === 'broad') {
        pushUnique(bullets, 'Enables broad government access to data under national security or law‑enforcement powers.');
    } else if (law.government_access === 'targeted') {
        pushUnique(bullets, 'Enables targeted government access under warrants or court orders for specific investigations.');
    }
    if (law.extraterritorial) {
        pushUnique(bullets, 'Can apply beyond borders in certain situations (e.g., based on the provider’s location or the affected users).');
    }

    // Keep concise
    return bullets.filter(Boolean).slice(0, 5);
}

function buildKeyProvisions(law) {
    const out = [];
    const s = sentenceSplit(law.summary);
    const core = s[0] || law.summary || `${law.name} sets rules within its scope.`;

    out.push({
        title: 'Core scope',
        description: core
    });

    let second = '';
    if (law.type === 'privacy') {
        second = 'Defines obligations for handling personal data and sets safeguards around processing, sharing, and accountability.';
    } else if (law.type === 'access') {
        second = 'Creates legal mechanisms for authorities to request or compel access to data held by providers.';
    } else if (law.type === 'surveillance') {
        second = 'Establishes surveillance or interception capabilities and related retention/assistance requirements.';
    } else if (law.type === 'localization') {
        second = 'Creates residency/local storage requirements for certain data categories and may restrict cross‑border transfers.';
    } else if (law.type === 'security') {
        second = 'Defines security obligations (risk management, incident response, and governance) for covered entities.';
    } else if (law.type === 'sector') {
        second = 'Sets sector‑specific obligations and oversight requirements relevant to regulated services and providers.';
    }

    if (second) {
        out.push({ title: 'Key obligations', description: second });
    }

    return out.slice(0, 3);
}

function buildComplianceActions(law) {
    const actions = [];
    pushUnique(actions, 'Assess whether you are in scope (by jurisdiction, entity type, and data flows).');
    pushUnique(actions, 'Map relevant data and processing activities (where data is stored, who can access it, and under what contracts).');

    if (law.type === 'privacy') {
        pushUnique(actions, 'Update privacy notices, lawful basis, contracts/DPAs, and rights-handling processes.');
    }
    if (law.type === 'access' || law.type === 'surveillance') {
        pushUnique(actions, 'Evaluate provider jurisdiction and government-access exposure; plan mitigations (encryption, split trust, sovereign hosting).');
    }
    if (law.requires_localization || law.type === 'localization') {
        pushUnique(actions, 'Implement data residency controls and verify vendor/subprocessor locations.');
    }
    if (law.type === 'security') {
        pushUnique(actions, 'Implement risk management, incident reporting, and supplier security processes appropriate to the framework.');
    }
    if (law.type === 'sector') {
        pushUnique(actions, 'Identify sector-specific obligations and document controls, audits, and reporting duties.');
    }

    return actions.slice(0, 5);
}

function main() {
    const data = readJson(LAWS_PATH);
    const laws = data.laws || [];

    let changed = 0;

    laws.forEach(law => {
        const before = JSON.stringify({
            review_status: law.review_status,
            what_it_does: law.what_it_does,
            who_it_applies_to: law.who_it_applies_to,
            key_provisions: law.key_provisions,
            compliance_actions: law.compliance_actions,
            enforcement: law.enforcement
        });

        // Mark as AI-generated unless already verified
        if (!law.review_status) {
            law.review_status = 'ai-generated';
        } else if (law.review_status !== 'verified') {
            law.review_status = 'ai-generated';
        }

        // what_it_does
        if (!Array.isArray(law.what_it_does) || law.what_it_does.length === 0) {
            law.what_it_does = buildWhatItDoes(law);
        }

        // who_it_applies_to
        if (!Array.isArray(law.who_it_applies_to) || law.who_it_applies_to.length === 0) {
            law.who_it_applies_to = defaultWhoAppliesToById(law.id);
        }

        // key_provisions
        if (!Array.isArray(law.key_provisions) || law.key_provisions.length === 0) {
            law.key_provisions = buildKeyProvisions(law);
        }

        // compliance_actions
        if (!Array.isArray(law.compliance_actions) || law.compliance_actions.length === 0) {
            law.compliance_actions = buildComplianceActions(law);
        }

        // enforcement
        if (!law.enforcement || typeof law.enforcement !== 'object') {
            law.enforcement = defaultEnforcementById(law.id);
        } else {
            // Fill missing pieces conservatively
            const defaults = defaultEnforcementById(law.id);
            if (!law.enforcement.authority && defaults.authority) law.enforcement.authority = defaults.authority;
            if (!law.enforcement.notes && defaults.notes) law.enforcement.notes = defaults.notes;
        }

        const after = JSON.stringify({
            review_status: law.review_status,
            what_it_does: law.what_it_does,
            who_it_applies_to: law.who_it_applies_to,
            key_provisions: law.key_provisions,
            compliance_actions: law.compliance_actions,
            enforcement: law.enforcement
        });

        if (before !== after) changed += 1;
    });

    writeJson(LAWS_PATH, data);
    console.log(`Updated ${changed}/${laws.length} laws with enrichment fields.`);
}

main();


