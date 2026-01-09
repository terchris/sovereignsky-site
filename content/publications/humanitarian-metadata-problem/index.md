---
title: "The Humanitarian Metadata Problem: 'Doing No Harm' in the Digital Era"
description: "Technical analysis of how metadata from telecommunications, messaging apps, cash transfers, and social media can endanger humanitarian beneficiaries and staff"
date: 2020-11-01
external_url: "https://www.icrc.org/en/document/digital-trails-could-endanger-people-receiving-humanitarian-aid-icrc-and-privacy"
publisher: "ICRC / Privacy International"
topics:
  - "privacy"
  - "cybersecurity"
audience:
  - "humanitarian"
  - "public-sector"
  - "it-ops"
  - "consumer"
tags:
  - "metadata"
  - "cell-tower"
  - "messaging-apps"
  - "mobile-money"
  - "encryption"
type: publications
---

## Abstract

Technical analysis of how metadata from telecommunications, messaging, and payments can identify, locate, and profile individuals in crisis situations—risks that persist even when content is encrypted.

## Summary

This ICRC/Privacy International report documents how even "off" phones can be tracked via cell tower pings, how messaging apps reveal relationships and behaviour patterns through metadata, and how mobile money creates financial profiles. The finding applies beyond humanitarian work: any organisation handling sensitive data faces the same metadata exposure risks.

---

## Key Findings

### On What Metadata Reveals

The report documents how metadata enables detailed profiling:

> "Using the large amount of data and metadata generated on social media, it is possible to very accurately predict people's behaviour, preferences, and other personal details (e.g. ethnicity, sexual orientation and political and religious affiliations)."

### On the Stakes

The foreword makes the risk explicit:

> "Protecting the processing of their Personal Data can literally be a matter of life and death."

### On Telecommunications

Even basic mobile phone use generates exploitable metadata:

> "When using telecommunications, humanitarian organisations put all parties involved at risk of their telecommunication data (message or call content) being intercepted and the associated metadata (sender/recipient, time and location) being accessed."

And critically:

> "Even when calls or messages are not being exchanged, mobile phones regularly 'ping' nearby cell towers to ensure the best possible continuous service. As a result, **users can be tracked through their phones' location service. This tracking continues even when the phone is not being used, is in sleep mode, or is turned off**."

### On Messaging Apps

The report notes that encryption is insufficient:

> "While some messaging apps encrypt message content during communications, they also commonly ask the user to reveal more data, share more data than the user may realise (such as the device and SIM identifiers – IMSI and IMEI – and information on the phone), or ask the user to give the app permission to access other information on their device such as location, photos and contacts."

Inference over time is the real risk:

> "A messaging app could infer – from the frequency of your calls or SMS communications – when you wake up, go to sleep, what time zone you're in, and who your closest friends are."

### On Mobile Money

Cash transfer programmes using mobile money create specific vulnerabilities:

> "Mobile money transaction details are often reported to the recipient via an unencrypted SMS. Thus, even when the electronic transfer is encrypted, the details of the transaction are not and can be intercepted directly or by other apps on the recipient's phone."

The consequences extend to financial access:

> "The domestic telecommunications company may be obliged (e.g. by Know Your Customer regulations) or inclined (e.g. for their commercial partnerships) to share data collected or inferred from the CTP. These data can be used to financially profile a person, and this may restrict their access to financial services in the future."

### On Smartcards

The report documents how transaction metadata identifies individuals:

> "Smartcard metadata are usually sufficient to identify an individual with a high degree of precision. Behavioural patterns, physical movements, and purchasing habits can then all be inferred and attributed to the identified individual(s)."

### On Social Media Shadow Profiles

Even people without accounts are tracked:

> "Often, even if a user deletes a given social media account, limits the number of apps that can access it, or never had an account in the first place, their shadow profile exists and is fed by information gleaned from other social media accounts or websites they use and even from their contacts' social media accounts."

---

## Risks by Technology Type

| Technology | Key Risks | Mitigation |
|------------|-----------|------------|
| **Telecommunications (SMS/Voice)** | Location tracking, content interception, 2G vulnerabilities | Use end-to-end encrypted alternatives; plan for interception |
| **Messaging Apps** | Device data collection, contact access, inference over time | Digital literacy training; limit app permissions; risk assessment |
| **Mobile Money** | Unencrypted SMS confirmations, financial profiling, KYC data sharing | Check telecom ownership; avoid single-group CTPs |
| **Smartcards** | Transaction metadata identifies individuals, geo-tracking | Map all entities with data access; negotiate data minimisation |
| **Social Media** | Shadow profiles, SOCMINT exploitation, platform data sharing | Digital literacy; sector-wide negotiation with platforms |

---

## The Data Types

The report distinguishes three categories of metadata:

| Type | Description | Example |
|------|-------------|---------|
| **Declared data** | Information users explicitly provide | Name, phone number, address |
| **Inferred data** | Information derived from behaviour | Sleep patterns, relationships, location history |
| **Interest/intent data** | Information about what users seek | Search queries, clicked links, app usage |

All three types can be "owned, processed, shared and stored for different periods of time, by different third parties, and under different jurisdictions applying different regulations."

---

## Specific Recommendations

### For Telecommunications

> "End-to-end encrypted, secure communication methods should be used instead of voice or SMS even if they do not always prevent metadata from being accessed."

> "Humanitarian organisations should conduct advance risk assessments for all telecommunications exchanges; here, they should always plan for scenarios in which third parties are able to gain access to the content, time and location of all exchanges."

### For Cash Transfers

> "Because the use of CTPs is strongly associated with humanitarian programmes, organisations should take steps to ensure that persons registered in these programmes are not automatically associated with specific identity factors."

> "Humanitarian organisations should also check who owns/controls the telecommunications operations involved in a CTP. This may reveal useful information on how the company operates and what additional threats or risks there may be regarding data sharing."

### For Social Media

> "The sector as a whole could jointly negotiate with major social media platforms (e.g. Facebook and Twitter) in order to secure specific safeguards across their services and in particular for humanitarian metadata."

---

## Why This Matters Beyond Humanitarian Work

The metadata risks documented here apply to any organisation:

- **Healthcare** — Patient messaging and appointment data reveals conditions and treatment patterns
- **Legal services** — Communication metadata reveals client relationships and case timing
- **Journalism** — Source protection fails when metadata reveals contact patterns
- **Any sensitive work** — Location tracking continues even when devices appear "off"

The report's core principle applies universally:

> "To reconcile these actions with the 'do no harm' principle, the humanitarian community must better understand the risks associated with the generation, exposure and processing of metadata."

---

## The Publishers

| Organisation | Role | Standing |
|--------------|------|----------|
| **ICRC** | Operational humanitarian expertise | Guardian of IHL since 1863; direct field experience |
| **Privacy International** | Technical surveillance research | UK charity since 1990; award-winning research on surveillance technology |

This report builds on Privacy International's influential 2013 study *Aiding Surveillance*, which first documented how development and humanitarian technology enables surveillance and repression.

---

## Access

**[Read the Full Report →](https://www.icrc.org/en/document/digital-trails-could-endanger-people-receiving-humanitarian-aid-icrc-and-privacy)**

Available as open access PDF from ICRC.

---

## Related Resources

- [Aiding Surveillance (2013)](https://privacyinternational.org/report/841/aiding-surveillance) — Privacy International's foundational report on surveillance and development aid
- [Humanitarian Futures for Messaging Apps (2017)](https://www.icrc.org/en/document/messaging-apps-untapped-humanitarian-resource) — ICRC, The Engine Room, and Block Party's analysis of messaging app opportunities and risks
- [Handbook on Data Protection in Humanitarian Action](/publications/icrc-data-protection-handbook/) — The comprehensive ICRC reference work
- [Privacy International](https://privacyinternational.org/) — Ongoing surveillance research and advocacy
