---
title: "CLOUD Act"
law_id: "cloud-act"
full_name: "Clarifying Lawful Overseas Use of Data Act"
year: 2018
scope: "national"
applies_to:
  - "US"
source_url: "https://www.congress.gov/bill/115th-congress/house-bill/4943"
law_type: "access"
law_type_description: "Enables government or law enforcement data access"
government_access: "broad"
government_access_description: "Bulk collection, minimal oversight, backdoor requirements, or extraterritorial compulsion"
data_protection: "none"
data_protection_description: "No individual data protection provisions"
extraterritorial: true
requires_localization: false
requires_backdoor: false
review_status: "ai-generated"
what_it_does:
  - "US can compel US companies to hand over data regardless of where it is stored."
  - "This extraterritorial reach is a key concern for data sovereignty."
  - "Enables broad government access to data under national security or law‑enforcement powers."
  - "Can apply beyond borders in certain situations (e.g., based on the provider’s location or the affected users)."
who_it_applies_to:
  - "US-based service providers"
  - "Foreign affiliates of US providers (via control)"
  - "Organizations using US cloud services"
key_provisions:
  - title: "Core scope"
    description: "US can compel US companies to hand over data regardless of where it is stored."
  - title: "Key obligations"
    description: "Creates legal mechanisms for authorities to request or compel access to data held by providers."
compliance_actions:
  - "Assess whether you are in scope (by jurisdiction, entity type, and data flows)."
  - "Map relevant data and processing activities (where data is stored, who can access it, and under what contracts)."
  - "Evaluate provider jurisdiction and government-access exposure; plan mitigations (encryption, split trust, sovereign hosting)."
enforcement:
  notes: "Orders are issued through US legal process; providers may be compelled to disclose data even if stored abroad."
related_laws:
  complements:
    - id: "fisa-702"
      name: "FISA Section 702"
      year: 2008
      flag: "🇺🇸"
    - id: "eo-12333"
      name: "EO 12333"
      year: 1981
      flag: "🇺🇸"
    - id: "patriot-act"
      name: "Patriot Act"
      year: 2001
      flag: "🇺🇸"
    - id: "ecpa"
      name: "ECPA"
      year: 1986
      flag: "🇺🇸"
    - id: "eu-us-dpf"
      name: "EU-US DPF"
      year: 2023
      flag: "🇪🇺"
  conflicts_with:
    - id: "gdpr"
      name: "GDPR"
      year: 2018
      flag: "🇪🇺"
    - id: "schrems-ii"
      name: "Schrems II"
      year: 2020
      flag: "🇪🇺"
layout: "single"
type: "laws"
---

The CLOUD Act allows US law enforcement to compel US-based technology companies to provide data stored on their servers, regardless of where that data is physically located. This extraterritorial reach is one of the most significant concerns for organizations seeking data sovereignty.

## What the CLOUD Act Does

The CLOUD Act establishes that:

1. **US companies must comply with US warrants** for data they control, even if that data is stored in datacenters outside the United States
2. **Physical location does not protect data** - storing data in an EU datacenter operated by a US company does not shield it from US government access
3. **Executive agreements** can be established between the US and foreign governments to streamline cross-border data requests

The law was passed in 2018, partly in response to the *Microsoft Ireland* case, where Microsoft had refused to hand over emails stored in Ireland. The CLOUD Act clarified that US jurisdiction follows the company, not the data.

## Why This Matters for Data Sovereignty

### The Datacenter Myth

Many organizations believe that choosing a cloud provider's EU datacenter protects their data from US government access. This is incorrect. If you use:

- Microsoft Azure (EU region)
- Amazon Web Services (Frankfurt, Stockholm, etc.)
- Google Cloud Platform (any region)

...your data remains subject to US government requests under the CLOUD Act, because these are US-headquartered companies.

### Conflict with GDPR

The CLOUD Act creates a direct legal conflict with the EU's General Data Protection Regulation (GDPR). Under GDPR, transferring personal data to third countries (including the US) requires specific legal bases. A US government request under the CLOUD Act is not recognized as a valid legal basis under EU law.

This puts US cloud providers in an impossible position: comply with US law and violate GDPR, or comply with GDPR and violate US law.

### Impact on Humanitarian Organizations

For humanitarian organizations, NGOs, and civil society groups, the CLOUD Act raises specific concerns:

- **Beneficiary data protection** - Personal data of vulnerable populations could be accessed by US authorities
- **Operational security** - Information about field operations, partner organizations, and local staff could be disclosed
- **Neutrality** - Perceived ties to US intelligence capabilities may compromise the organization's neutral status in conflict zones
- **Legal obligations** - Many humanitarian organizations have data protection commitments to donors, partners, and beneficiaries that may conflict with CLOUD Act exposure

## What Triggers CLOUD Act Access

US authorities can request data when:

- The data is held by a company subject to US jurisdiction (headquarters, incorporation, or significant operations in the US)
- A valid warrant, subpoena, or court order is issued
- The request relates to a criminal investigation

The company may challenge overly broad requests, but the legal presumption favors disclosure.

## Mitigating CLOUD Act Exposure

Organizations concerned about CLOUD Act exposure have several options:

### 1. Choose Non-US Providers

Select cloud providers headquartered and incorporated entirely outside US jurisdiction:

- European providers (OVHcloud, Scaleway, Hetzner, etc.)
- Swiss providers (Infomaniak, Exoscale)
- Other non-US alternatives

### 2. Technical Controls

Even with US providers, some technical measures can reduce exposure:

- **Client-side encryption** - Encrypt data before uploading, with keys you control
- **Zero-knowledge architectures** - Use services where the provider cannot access plaintext data
- **Data minimization** - Only store necessary data in cloud environments

### 3. Contractual Protections

While contracts cannot override US law, they can provide:

- Notification requirements before disclosure
- Commitment to challenge overly broad requests
- Transparency about government data requests received

## Related Laws

The CLOUD Act works alongside other US surveillance laws:

- [FISA Section 702](/laws/fisa-702/) - Foreign intelligence surveillance targeting non-US persons
- [EO 12333](/laws/eo-12333/) - Authorizes intelligence collection outside US territory
- [USA PATRIOT Act](/laws/patriot-act/) - Expanded surveillance powers post-9/11

Together, these laws create a comprehensive framework for US government access to data held by US companies, regardless of where that data is stored or whose data it is.

## EU-US Data Privacy Framework

The [EU-US Data Privacy Framework](/laws/eu-us-dpf/) (2023) is an adequacy decision that attempts to address GDPR concerns about US surveillance laws. It establishes safeguards for US intelligence access and creates redress mechanisms for EU citizens. However, it does not change the underlying CLOUD Act powers - US companies remain subject to US law enforcement requests regardless of this framework.

Organizations should understand that the DPF provides a legal basis for data transfers but does not eliminate CLOUD Act exposure. The framework could be invalidated by the EU Court of Justice (as happened to its predecessors Safe Harbor and Privacy Shield), making long-term reliance on it risky.
