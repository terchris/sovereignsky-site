#!/usr/bin/env node

/**
 * Update regions.json with abstract, summary, body, and image fields
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'regions.json');

// Abstracts, summaries, and descriptions for each country based on data sovereignty perspective
// Description replaces placeholder text in regions.json
const countryContent = {
  NO: {
    abstract: "EEA member with strong GDPR implementation and robust data protection traditions.",
    summary: "Norway participates in the European Economic Area, adopting EU data protection regulations including GDPR. Norwegian data centers offer strong sovereignty for organizations seeking European jurisdiction without EU membership.",
  },
  IS: {
    abstract: "EEA member with GDPR compliance and renewable energy-powered data centers.",
    summary: "Iceland participates in the EEA framework, implementing GDPR. The country is known for cold climate cooling and 100% renewable energy, making it attractive for sustainable data center operations.",
  },
  LI: {
    abstract: "Microstate EEA member with Swiss-style banking privacy traditions and GDPR compliance.",
    summary: "Liechtenstein participates in the EEA and implements GDPR. The principality combines European data protection with a tradition of financial privacy and discretion.",
  },
  SE: {
    abstract: "EU member with advanced digital infrastructure and strong transparency traditions.",
    summary: "Sweden is an EU member state with world-leading digital infrastructure and a long tradition of transparency in government. Home to major tech companies and data centers operating under comprehensive EU data protection.",
  },
  DK: {
    abstract: "EU member with robust digital infrastructure and strong Nordic data protection culture.",
    summary: "Denmark is an EU member with excellent digital infrastructure and connectivity. Danish data protection aligns with GDPR and benefits from the Nordic tradition of transparency and rule of law.",
  },
  FI: {
    abstract: "EU member known for transparency, cold climate data centers, and renewable energy.",
    summary: "Finland is an EU member renowned for government transparency and strong rule of law. The cold climate and abundant renewable energy make it ideal for energy-efficient data center operations.",
  },
  DE: {
    abstract: "EU member with Europe's strictest data protection interpretation and enforcement.",
    summary: "Germany has some of the strictest data protection standards in the EU, with strong state-level enforcement. German Datenschutz culture makes it a preferred location for privacy-conscious organizations.",
  },
  FR: {
    abstract: "EU member championing European digital sovereignty with active data protection enforcement.",
    summary: "France is a leading advocate for European digital sovereignty. The CNIL is one of Europe's most active data protection authorities, and France hosts significant cloud infrastructure initiatives.",
  },
  NL: {
    abstract: "EU member hosting major internet exchanges and Europe's largest data center market.",
    summary: "The Netherlands is a major European internet hub, hosting AMS-IX and significant data center capacity. Dutch data protection combines EU standards with a pragmatic business environment.",
  },
  PL: {
    abstract: "EU member with rapidly growing data center infrastructure in Central Europe.",
    summary: "Poland is an EU member with expanding data center capacity serving Central and Eastern Europe. The country offers EU data protection standards with competitive operating costs.",
  },
  IE: {
    abstract: "EU member hosting European HQs of major US tech companies with complex enforcement dynamics.",
    summary: "Ireland hosts European headquarters for Google, Meta, Microsoft, and other tech giants. While subject to GDPR, the Irish DPC's role as lead supervisor for many cross-border cases has drawn scrutiny.",
  },
  AT: {
    abstract: "EU member with strong privacy activism heritage and rigorous data protection enforcement.",
    summary: "Austria is known for privacy activism—the Schrems cases originated here. Austrian data protection enforcement is rigorous, making it a strong choice for privacy-focused European hosting.",
  },
  BE: {
    abstract: "EU member hosting European institutions with comprehensive GDPR implementation.",
    summary: "Belgium hosts major EU institutions in Brussels. Belgian data protection follows GDPR standards with strong institutional presence of European regulatory bodies.",
  },
  BG: {
    abstract: "EU member offering cost-effective data center operations under GDPR.",
    summary: "Bulgaria is an EU member providing GDPR-compliant infrastructure at competitive costs. The country serves as a gateway between Europe and the Balkans.",
  },
  HR: {
    abstract: "EU member providing Adriatic gateway data services under GDPR.",
    summary: "Croatia is an EU member state offering GDPR-compliant data services. The country provides connectivity between Central Europe and the Mediterranean.",
  },
  CY: {
    abstract: "EU member with strategic Mediterranean location and GDPR compliance.",
    summary: "Cyprus is an EU member offering GDPR protection with a strategic location bridging Europe, Middle East, and Africa. The island has growing data center infrastructure.",
  },
  CZ: {
    abstract: "EU member with strong IT sector and Central European connectivity.",
    summary: "Czechia is an EU member with a developed IT sector and excellent Central European connectivity. Prague hosts significant data center capacity under GDPR standards.",
  },
  EE: {
    abstract: "EU member pioneering digital government and e-residency with strong cybersecurity.",
    summary: "Estonia is a global leader in digital government and cybersecurity. The country offers GDPR-compliant infrastructure with innovative approaches to digital identity and cross-border services.",
  },
  GR: {
    abstract: "EU member providing Mediterranean data services with emerging infrastructure.",
    summary: "Greece is an EU member with developing data center infrastructure. The country offers GDPR compliance with strategic positioning for Southern European and Eastern Mediterranean markets.",
  },
  HU: {
    abstract: "EU member with Central European connectivity under GDPR framework.",
    summary: "Hungary is an EU member providing data services under GDPR. The country offers connectivity across Central Europe, though rule of law concerns have drawn EU attention.",
  },
  LV: {
    abstract: "EU member with Baltic connectivity and growing digital infrastructure.",
    summary: "Latvia is an EU member state in the Baltics offering GDPR-compliant infrastructure. Riga serves as a regional technology hub with strong Nordic and EU connectivity.",
  },
  LT: {
    abstract: "EU member with fintech specialization and Baltic digital hub ambitions.",
    summary: "Lithuania is an EU member developing as a fintech and digital services hub. The country offers GDPR compliance with growing data center infrastructure in the Baltics.",
  },
  LU: {
    abstract: "EU member hosting European institutions and major financial services infrastructure.",
    summary: "Luxembourg hosts EU institutions and major financial sector operations. The country combines GDPR compliance with strong financial services expertise and excellent connectivity.",
  },
  MT: {
    abstract: "EU member with emerging tech sector and Mediterranean connectivity.",
    summary: "Malta is an EU member with a growing technology sector, particularly in gaming and blockchain. The island offers GDPR compliance with strategic Mediterranean positioning.",
  },
  PT: {
    abstract: "EU member with Atlantic connectivity and growing data center investments.",
    summary: "Portugal is an EU member with significant subsea cable connectivity to the Americas and Africa. Lisbon hosts growing data center infrastructure under GDPR standards.",
  },
  RO: {
    abstract: "EU member with competitive costs and strong IT workforce.",
    summary: "Romania is an EU member offering GDPR-compliant infrastructure with a skilled IT workforce. The country provides cost-effective data services for European operations.",
  },
  SK: {
    abstract: "EU member with Central European location and GDPR compliance.",
    summary: "Slovakia is an EU member providing GDPR-compliant data services. The country offers Central European connectivity with competitive operating costs.",
  },
  SI: {
    abstract: "EU member bridging Central Europe and the Balkans with GDPR compliance.",
    summary: "Slovenia is an EU member providing connectivity between Central Europe and the Balkans. The country offers GDPR-compliant infrastructure with excellent Alpine region access.",
  },
  ES: {
    abstract: "EU member with major data center investments and transatlantic connectivity.",
    summary: "Spain is an EU member with significant data center expansion and excellent connectivity to Latin America and Africa. Spanish data centers operate under full GDPR protection.",
  },
  IT: {
    abstract: "EU member with major industrial base and Mediterranean data hub development.",
    summary: "Italy is an EU member with growing data center infrastructure, particularly in Milan. The country offers GDPR compliance with strong connectivity across the Mediterranean.",
  },
  CH: {
    abstract: "Non-EU country with adequacy decision, banking privacy traditions, and strong data protection.",
    summary: "Switzerland has an EU adequacy decision and the revised FADP provides strong data protection. The country combines neutrality with banking privacy traditions and strict data security standards.",
  },
  US: {
    abstract: "Major cloud provider jurisdiction with significant extraterritorial data access laws.",
    summary: "The United States has broad surveillance laws including the CLOUD Act, FISA Section 702, and others that enable government access to data held by US companies globally. This creates significant sovereignty concerns for non-US organizations.",
  },
  GB: {
    abstract: "Post-Brexit jurisdiction with EU adequacy but Five Eyes membership and broad surveillance powers.",
    summary: "The UK has an EU adequacy decision but maintains extensive surveillance capabilities under the Investigatory Powers Act. As a Five Eyes member, intelligence-sharing arrangements affect data sovereignty assessments.",
  },
  CN: {
    abstract: "Jurisdiction requiring cooperation with national intelligence and strict data localization.",
    summary: "China's National Intelligence Law requires organizations to cooperate with state intelligence work. Combined with data localization requirements and cross-border transfer restrictions, this creates significant sovereignty challenges.",
  },
  RU: {
    abstract: "Sanctioned jurisdiction with mandatory data localization and surveillance backdoors.",
    summary: "Russia is subject to international sanctions following the 2022 invasion of Ukraine. Data localization laws and SORM surveillance requirements make Russian hosting incompatible with most sovereignty needs.",
  },
  IL: {
    abstract: "Adequacy country with advanced cybersecurity sector but surveillance technology concerns.",
    summary: "Israel has partial EU adequacy and a world-leading cybersecurity industry. However, concerns about surveillance technology exports and regional political considerations affect sovereignty assessments.",
  },
  IN: {
    abstract: "Major IT services hub with broad government surveillance powers and emerging data protection.",
    summary: "India has broad surveillance powers under the IT Act. The new DPDP Act provides some protection but includes significant government exemptions. Major IT outsourcing destination.",
  },
  AU: {
    abstract: "Five Eyes member with controversial encryption backdoor legislation.",
    summary: "Australia's TOLA Act allows authorities to compel assistance in accessing encrypted data. As a Five Eyes member, Australia has extensive intelligence-sharing arrangements affecting data sovereignty.",
  },
  CA: {
    abstract: "Adequacy country with reasonable protection but Five Eyes intelligence sharing concerns.",
    summary: "Canada has EU adequacy and PIPEDA provides reasonable data protection. However, Five Eyes membership means intelligence-sharing considerations for sensitive data sovereignty decisions.",
  },
  JP: {
    abstract: "Adequacy country with comprehensive data protection aligned to international standards.",
    summary: "Japan has an EU adequacy decision since 2019 and the APPI provides comprehensive data protection. Japanese data centers offer strong sovereignty for Asia-Pacific operations.",
  },
  KR: {
    abstract: "Adequacy country with strong data protection enforcement and advanced infrastructure.",
    summary: "South Korea received EU adequacy in 2022 and PIPA provides robust data protection with active enforcement. The country has world-class digital infrastructure and connectivity.",
  },
  NZ: {
    abstract: "Adequacy country with good protection but Five Eyes membership considerations.",
    summary: "New Zealand has EU adequacy and the Privacy Act 2020 provides solid protection. However, Five Eyes membership requires consideration for sensitive sovereignty assessments.",
  },
  AE: {
    abstract: "Middle East hub with developing data protection framework and free zone regulations.",
    summary: "The UAE is a major Middle East technology hub with data centers in Dubai and Abu Dhabi. Free zones like DIFC have their own data protection regulations, while federal law continues to develop.",
    description: "The United Arab Emirates is a major Middle East technology and business hub. Data centers operate in Dubai and Abu Dhabi, with free zones like DIFC and ADGM having their own data protection frameworks. The federal Personal Data Protection Law (2021) provides baseline protection, though free zone regulations often offer stronger standards.",
  },
  BH: {
    abstract: "Gulf state with emerging data protection and regional financial services hub.",
    summary: "Bahrain hosts regional data centers and financial services operations. The country has developing data protection regulations and serves as a Gulf connectivity hub.",
    description: "Bahrain serves as a regional financial services and technology hub in the Gulf. The Personal Data Protection Law (2018) provides data protection standards, and the country hosts data centers serving regional operations. Bahrain's relatively open regulatory environment has attracted cloud providers and financial services firms.",
  },
  BR: {
    abstract: "Latin America's largest economy with LGPD data protection framework.",
    summary: "Brazil enacted the LGPD (Lei Geral de Proteção de Dados) modeled on GDPR. As Latin America's largest market, Brazil hosts significant data center infrastructure with developing enforcement.",
    description: "Brazil enacted the Lei Geral de Proteção de Dados (LGPD) in 2018, creating a comprehensive data protection framework modeled on GDPR. As Latin America's largest economy, Brazil hosts significant data center infrastructure in São Paulo and other major cities. The ANPD (National Data Protection Authority) oversees enforcement.",
  },
  CL: {
    abstract: "Stable South American jurisdiction with developing data protection modernization.",
    summary: "Chile offers political stability and growing data center infrastructure in South America. The country is modernizing its data protection framework to align with international standards.",
    description: "Chile offers political stability and a growing technology sector in South America. The country is modernizing its data protection framework with legislation to align with international standards including GDPR principles. Santiago hosts expanding data center infrastructure serving the region.",
  },
  CO: {
    abstract: "Andean hub with data protection law and growing regional connectivity.",
    summary: "Colombia has data protection legislation and serves as a hub for Andean region connectivity. The country hosts growing data center capacity for Latin American operations.",
    description: "Colombia has comprehensive data protection under Law 1581 of 2012, enforced by the Superintendency of Industry and Commerce. The country serves as a connectivity hub for the Andean region with growing data center capacity in Bogotá and other cities. Colombia offers a stable regulatory environment for Latin American operations.",
  },
  EG: {
    abstract: "North African hub with developing digital infrastructure and data localization tendencies.",
    summary: "Egypt hosts data centers serving North Africa and the Middle East. The country has data localization requirements and is developing its digital infrastructure and protection framework.",
    description: "Egypt serves as a major connectivity hub between Africa, Europe, and Asia, with significant submarine cable landing stations. The Personal Data Protection Law (2020) establishes data protection requirements with data localization provisions. Cairo hosts growing data center infrastructure serving North Africa and the Middle East.",
  },
  HK: {
    abstract: "Asian financial hub with data protection ordinance but increasing mainland China influence.",
    summary: "Hong Kong has its own Personal Data Privacy Ordinance but faces increasing integration with mainland China. The 2020 National Security Law has raised concerns about data access and sovereignty.",
    description: "Hong Kong maintains its own legal system including the Personal Data (Privacy) Ordinance (PDPO). However, the 2020 National Security Law has raised significant concerns about potential government access to data and the territory's autonomy. Organizations must carefully assess the implications of increasing mainland China integration for data sovereignty.",
  },
  ID: {
    abstract: "Southeast Asia's largest economy with data localization requirements.",
    summary: "Indonesia has data localization requirements for certain sectors and is developing comprehensive data protection legislation. Jakarta hosts growing data center capacity for the region.",
    description: "Indonesia, Southeast Asia's largest economy, has data localization requirements under Government Regulation 71/2019 for public sector and certain strategic data. The Personal Data Protection Law (2022) provides comprehensive data protection. Jakarta and surrounding areas host rapidly expanding data center capacity serving the archipelago.",
  },
  MX: {
    abstract: "North American market with federal data protection law and US proximity.",
    summary: "Mexico has the Federal Law on Protection of Personal Data and significant data center infrastructure. Proximity to the US market drives demand while offering different jurisdictional characteristics.",
    description: "Mexico has the Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP), providing comprehensive data protection. The country offers significant data center infrastructure in Querétaro, Mexico City, and other locations. Proximity to the US market drives demand while maintaining separate jurisdictional characteristics from US law.",
  },
  MY: {
    abstract: "Southeast Asian hub with PDPA data protection and regional connectivity.",
    summary: "Malaysia has the Personal Data Protection Act and hosts significant data center infrastructure. Kuala Lumpur and Johor serve as regional connectivity hubs for Southeast Asia.",
    description: "Malaysia has the Personal Data Protection Act 2010 (PDPA) providing data protection standards. The country hosts significant data center infrastructure in Kuala Lumpur, Cyberjaya, and Johor, serving as regional connectivity hubs for Southeast Asia. Malaysia offers competitive costs with good infrastructure quality.",
  },
  PH: {
    abstract: "Southeast Asian market with Data Privacy Act and growing BPO sector.",
    summary: "The Philippines has the Data Privacy Act of 2012 enforced by the NPC. The country hosts significant business process outsourcing operations and growing data center infrastructure.",
    description: "The Philippines has the Data Privacy Act of 2012, enforced by the National Privacy Commission (NPC). The country is a major destination for business process outsourcing (BPO) and hosts growing data center infrastructure in Metro Manila and Clark. English proficiency and US cultural alignment support service delivery.",
  },
  QA: {
    abstract: "Gulf state with emerging data protection and regional hub ambitions.",
    summary: "Qatar is developing data center infrastructure and data protection regulations. The country aims to serve as a regional hub with diversification beyond hydrocarbon industries.",
    description: "Qatar is developing its technology infrastructure as part of economic diversification efforts. The Personal Data Privacy Protection Law (2016) provides baseline data protection. The Qatar Financial Centre has its own data protection regulations. Doha hosts growing data center capacity with ambitions to serve as a regional technology hub.",
  },
  RS: {
    abstract: "EU candidate country aligning data protection with European standards.",
    summary: "Serbia is an EU candidate country working to align its data protection framework with GDPR. Belgrade hosts regional data services as the country progresses toward EU membership.",
    description: "Serbia is an EU candidate country progressively aligning its legal framework with EU standards. The Personal Data Protection Law (2018) is modeled on GDPR. Belgrade hosts data center infrastructure serving the Western Balkans region as the country works toward EU membership.",
  },
  SA: {
    abstract: "Gulf region's largest economy with developing data protection and localization requirements.",
    summary: "Saudi Arabia has data localization requirements and is developing comprehensive data protection regulations under Vision 2030 digitalization initiatives.",
    description: "Saudi Arabia, the Gulf region's largest economy, has data localization requirements for certain categories of data. The Personal Data Protection Law (2021) provides comprehensive data protection. Major investments in data center infrastructure support Vision 2030 digitalization initiatives in Riyadh and other cities.",
  },
  SG: {
    abstract: "Asia-Pacific hub with PDPA data protection and extensive subsea connectivity.",
    summary: "Singapore has the Personal Data Protection Act and serves as a major Asia-Pacific data center hub. Excellent subsea cable connectivity makes it a preferred location for regional operations.",
    description: "Singapore has the Personal Data Protection Act (PDPA) providing comprehensive data protection with active enforcement by the PDPC. The city-state is a major Asia-Pacific data center hub with excellent subsea cable connectivity and stable rule of law. Singapore is a preferred jurisdiction for regional headquarters and data operations.",
  },
  TH: {
    abstract: "Southeast Asian market with PDPA enacted and growing data center investments.",
    summary: "Thailand enacted its Personal Data Protection Act in 2019. Bangkok and surrounding areas host growing data center capacity serving the Greater Mekong region.",
    description: "Thailand enacted the Personal Data Protection Act (PDPA) in 2019, with full enforcement from 2022. Bangkok and the Eastern Economic Corridor host growing data center capacity serving Thailand and the Greater Mekong region. The country offers a large domestic market and strategic location in Southeast Asia.",
  },
  TR: {
    abstract: "Eurasian bridge with data protection law but political and rule of law concerns.",
    summary: "Turkey has data protection legislation and strategic location bridging Europe and Asia. However, political developments and rule of law concerns affect sovereignty assessments.",
    description: "Turkey has data protection under Law No. 6698 (KVKK), modeled partly on EU standards. The country's strategic location bridges Europe and Asia with significant data center infrastructure in Istanbul. However, political developments and rule of law concerns require careful assessment for data sovereignty decisions.",
  },
  TW: {
    abstract: "Advanced technology hub with data protection law and semiconductor industry concentration.",
    summary: "Taiwan has comprehensive data protection under the Personal Data Protection Act. The island hosts critical semiconductor manufacturing and advanced technology infrastructure.",
    description: "Taiwan has comprehensive data protection under the Personal Data Protection Act (PDPA). The island is a global leader in semiconductor manufacturing and hosts advanced technology infrastructure. Taiwan offers strong rule of law and technical expertise, though cross-strait relations require consideration in sovereignty assessments.",
  },
  ZA: {
    abstract: "African hub with POPIA data protection and regional connectivity.",
    summary: "South Africa has the Protection of Personal Information Act (POPIA) and hosts the largest data center market in Africa. Johannesburg and Cape Town serve as connectivity hubs for the continent.",
    description: "South Africa has the Protection of Personal Information Act (POPIA), providing comprehensive data protection with enforcement by the Information Regulator. The country hosts Africa's largest data center market in Johannesburg and Cape Town, serving as connectivity hubs for the continent with significant submarine cable infrastructure.",
  },
};

function main() {
  const regions = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

  let updatedDescriptions = 0;
  const updated = regions.map(region => {
    const content = countryContent[region.identifier];

    // Check if description is a placeholder
    const isPlaceholder = region.description && region.description.includes('Placeholder');

    // Use new description if available and current is placeholder, otherwise keep existing
    let description = region.description;
    if (isPlaceholder && content?.description) {
      description = content.description;
      updatedDescriptions++;
    }

    // Keep existing fields and update
    const result = {
      ...region,
      description: description,
      abstract: content?.abstract || `${region.name} jurisdiction for data center operations.`,
      summary: content?.summary || description,
      body: "", // Set body to empty
      image: "", // Empty for now, can be populated later
    };

    return result;
  });

  // Write back with nice formatting
  fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2) + '\n');

  console.log(`Updated ${updated.length} regions with abstract, summary, body, and image fields`);
  console.log(`Replaced ${updatedDescriptions} placeholder descriptions with real content`);
}

main();
