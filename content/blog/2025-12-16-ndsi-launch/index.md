---
title: "Introducing the Norwegian Digital Sovereignty Index (NDSI)"
date: 2025-12-16
description: "A free self-assessment tool to measure your organization's digital sovereignty readiness. Based on the EU Cloud Sovereignty Framework."
summary: "How dependent is your organization on foreign cloud providers? Take the NDSI Quick Scan - 11 questions, 5 minutes, all data stays in your browser."
tags: ["sovereignty", "eu", "public-sector"]
audiences: ["public-sector", "enterprise"]
categories: ["Tools"]
draft: true
---

How dependent is your organization on foreign cloud providers? Could you continue operations if Microsoft, Google, or AWS became unavailable tomorrow?

Most Norwegian organizations can't answer these questions. **That's a problem.**

## Why We Built This

Norwegian trust in American security guarantees [collapsed from 80% to 47%](/blog/2025-12-13-war-fear-digital-dependency/) in three months. The [hybrid war is already here](/blog/2025-12-15-hybrid-war-already-here/) - GPS jamming, cable cutting, infrastructure hacking.

Yet we keep moving more data and services to American cloud providers.

The EU responded with the [Cloud Sovereignty Framework](https://commission.europa.eu/document/download/09579818-64a6-4dd5-9577-446ab6219113_en) - a concrete way to measure sovereignty. We've adapted it for Norwegian organizations.

## NDSI Quick Scan

**11 questions. 5 minutes. All data stays in your browser.**

No signup. No data collection. No sales pitch. Just an honest assessment of where you stand.

---

{{< survey id="ndsi-quickscan" >}}
{
  "title": "NDSI Quick Scan",
  "description": "Assess your organization's digital sovereignty readiness",
  "showProgressBar": "top",
  "progressBarType": "questions",
  "showQuestionNumbers": "on",
  "questionErrorLocation": "bottom",
  "showCompletedPage": true,
  "pages": [
    {
      "name": "page1",
      "title": "Provider & Jurisdiction",
      "elements": [
        {
          "type": "radiogroup",
          "name": "q1_provider",
          "title": "Who provides your organization's primary cloud services (email, documents, collaboration)?",
          "isRequired": true,
          "choices": [
            { "value": 4, "text": "Norwegian company (e.g., Tietoevry, Basefarm)" },
            { "value": 3, "text": "EU/EEA company (non-Norwegian)" },
            { "value": 1, "text": "US company with EU data centers (Microsoft, Google, AWS)" },
            { "value": 0, "text": "US company, unknown data location" },
            { "value": 0, "text": "Don't know" }
          ]
        },
        {
          "type": "radiogroup",
          "name": "q2_cloudact",
          "title": "Are your critical cloud providers subject to the US CLOUD Act or similar foreign laws that could compel data access?",
          "isRequired": true,
          "choices": [
            { "value": 4, "text": "No - all providers are EU/EEA companies not subject to foreign access laws" },
            { "value": 2, "text": "Partially - some services are, but critical data is on EU-only providers" },
            { "value": 1, "text": "Yes - primary providers (Microsoft 365, Google Workspace, AWS) are US companies" },
            { "value": 0, "text": "Don't know" }
          ]
        },
        {
          "type": "radiogroup",
          "name": "q9_contracts",
          "title": "Are your cloud service contracts governed by Norwegian or EU law?",
          "isRequired": true,
          "choices": [
            { "value": 4, "text": "Yes - Norwegian law exclusively" },
            { "value": 3, "text": "Yes - EU/EEA law" },
            { "value": 1, "text": "Mixed - some contracts under foreign law" },
            { "value": 0, "text": "Don't know" }
          ]
        }
      ]
    },
    {
      "name": "page2",
      "title": "Data Control",
      "elements": [
        {
          "type": "radiogroup",
          "name": "q3_location_core",
          "title": "For your core systems (email, documents, CRM, HR, ERP) - do you know where data is stored?",
          "isRequired": true,
          "choices": [
            { "value": 4, "text": "Yes - all in Norway" },
            { "value": 3, "text": "Yes - all in EU/EEA" },
            { "value": 1, "text": "Yes - some outside EU/EEA" },
            { "value": 0, "text": "No - we don't have full visibility" }
          ]
        },
        {
          "type": "radiogroup",
          "name": "q3b_location_saas",
          "title": "Do you have visibility into all SaaS tools used in your organization (Miro, Slack, Notion, Figma, etc.)?",
          "isRequired": true,
          "choices": [
            { "value": 4, "text": "Yes - complete inventory, all approved and tracked by IT" },
            { "value": 2, "text": "Mostly - core tools tracked, but some shadow IT exists" },
            { "value": 1, "text": "Limited - teams adopt tools without central oversight" },
            { "value": 0, "text": "No - we don't know what SaaS tools are being used" }
          ]
        },
        {
          "type": "radiogroup",
          "name": "q4_export",
          "title": "Can you fully migrate your critical systems (CRM, ERP, collaboration) to another provider - including data, configurations, and integrations?",
          "isRequired": true,
          "choices": [
            { "value": 4, "text": "Yes - complete export possible with documented APIs and standard formats" },
            { "value": 2, "text": "Mostly - data exportable but would lose some configurations/integrations" },
            { "value": 1, "text": "Limited - can export raw data but system logic/workflows are locked in" },
            { "value": 0, "text": "Don't know" }
          ]
        },
        {
          "type": "radiogroup",
          "name": "q10_ownership",
          "title": "Do you know the ownership structure of your critical cloud providers?",
          "isRequired": true,
          "choices": [
            { "value": 4, "text": "Yes - Norwegian/EU owned, no foreign controlling interests" },
            { "value": 3, "text": "Yes - EU owned but with some foreign investment" },
            { "value": 1, "text": "Yes - US/foreign owned (Microsoft, Google, Amazon, etc.)" },
            { "value": 0, "text": "Don't know" }
          ]
        }
      ]
    },
    {
      "name": "page3",
      "title": "Exit Readiness",
      "elements": [
        {
          "type": "radiogroup",
          "name": "q5_exit",
          "title": "Do you have a documented exit strategy for your most critical cloud service?",
          "isRequired": true,
          "choices": [
            { "value": 4, "text": "Yes - documented, tested, with timeline and alternative providers identified" },
            { "value": 2, "text": "Partially - documented but not tested" },
            { "value": 1, "text": "Informally - we've thought about it but nothing documented" },
            { "value": 0, "text": "No" }
          ]
        },
        {
          "type": "radiogroup",
          "name": "q6_migration",
          "title": "How long would it take to migrate away from your primary cloud provider?",
          "isRequired": true,
          "choices": [
            { "value": 4, "text": "Less than 1 month" },
            { "value": 3, "text": "1-3 months" },
            { "value": 2, "text": "3-6 months" },
            { "value": 1, "text": "6-12 months" },
            { "value": 0, "text": "More than 12 months / Don't know" }
          ]
        }
      ]
    },
    {
      "name": "page4",
      "title": "Operational Resilience",
      "elements": [
        {
          "type": "radiogroup",
          "name": "q7_backup",
          "title": "Have you tested backup and recovery procedures for your cloud services in the past 12 months?",
          "isRequired": true,
          "choices": [
            { "value": 4, "text": "Yes - full recovery test completed successfully" },
            { "value": 2, "text": "Yes - partial test (some systems)" },
            { "value": 1, "text": "No - but we have documented procedures" },
            { "value": 0, "text": "No - no testing or documentation" }
          ]
        },
        {
          "type": "radiogroup",
          "name": "q8_alternatives",
          "title": "Do you have alternative providers identified for your critical services?",
          "isRequired": true,
          "choices": [
            { "value": 4, "text": "Yes - alternatives identified, evaluated, and ready to activate" },
            { "value": 2, "text": "Yes - alternatives identified but not evaluated" },
            { "value": 1, "text": "No - but we could find alternatives" },
            { "value": 0, "text": "No - we're locked in / Don't know" }
          ]
        }
      ]
    }
  ],
  "calculatedValues": [
    {
      "name": "totalScore",
      "expression": "{q1_provider} + {q2_cloudact} + {q3_location_core} + {q3b_location_saas} + {q4_export} + {q5_exit} + {q6_migration} + {q7_backup} + {q8_alternatives} + {q9_contracts} + {q10_ownership}"
    }
  ],
  "completedHtmlOnCondition": [
    {
      "expression": "{totalScore} >= 35",
      "html": "<div style='padding: 24px; background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); border-radius: 12px; border-left: 4px solid #28a745;'><h2 style='color: #155724; margin-top: 0;'>🟢 NDSI Level 4: Sovereign</h2><p style='font-size: 1.2em;'><strong>Score: {totalScore} / 44</strong></p><p>Strong sovereignty posture. You have good control over your digital infrastructure and clear exit strategies.</p><h4>Recommended Actions:</h4><ul><li>Maintain your current position through regular re-assessment</li><li>Monitor for changes in provider ownership or terms</li><li>Share your approach with peers to help others improve</li><li>Consider contributing to NDSI improvement</li></ul></div>"
    },
    {
      "expression": "{totalScore} >= 26 and {totalScore} < 35",
      "html": "<div style='padding: 24px; background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%); border-radius: 12px; border-left: 4px solid #ffc107;'><h2 style='color: #856404; margin-top: 0;'>🟡 NDSI Level 3: Resilient</h2><p style='font-size: 1.2em;'><strong>Score: {totalScore} / 44</strong></p><p>Good awareness with some dependencies to address. You have visibility into your situation but room for improvement.</p><h4>Recommended Actions:</h4><ul><li>Document and test exit strategies for critical services</li><li>Evaluate EU/Norwegian alternatives for highest-risk services</li><li>Review contracts for jurisdiction and termination clauses</li><li>Implement customer-managed encryption where possible</li></ul></div>"
    },
    {
      "expression": "{totalScore} >= 18 and {totalScore} < 26",
      "html": "<div style='padding: 24px; background: linear-gradient(135deg, #ffe5d0 0%, #ffd6b8 100%); border-radius: 12px; border-left: 4px solid #fd7e14;'><h2 style='color: #984c0c; margin-top: 0;'>🟠 NDSI Level 2: Aware</h2><p style='font-size: 1.2em;'><strong>Score: {totalScore} / 44</strong></p><p>Significant dependencies identified. You need exit strategies and contingency planning.</p><h4>Recommended Actions:</h4><ul><li>Map all cloud dependencies and their jurisdictions</li><li>Create exit strategy for your most critical service</li><li>Test backup recovery procedures</li><li>Identify alternative providers for critical functions</li><li>Review CLOUD Act implications for your data</li></ul></div>"
    },
    {
      "expression": "{totalScore} >= 9 and {totalScore} < 18",
      "html": "<div style='padding: 24px; background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%); border-radius: 12px; border-left: 4px solid #dc3545;'><h2 style='color: #721c24; margin-top: 0;'>🔴 NDSI Level 1: Dependent</h2><p style='font-size: 1.2em;'><strong>Score: {totalScore} / 44</strong></p><p>High dependency on foreign providers with limited resilience. Priority action needed.</p><h4>Recommended Actions:</h4><ul><li>Identify where your critical data is actually stored</li><li>Understand CLOUD Act implications for your organization</li><li>Start contingency planning immediately</li><li>Brief leadership on digital sovereignty risks</li><li>Consider the full NDSI assessment for detailed analysis</li></ul></div>"
    },
    {
      "expression": "{totalScore} < 9",
      "html": "<div style='padding: 24px; background: linear-gradient(135deg, #e2e3e5 0%, #d6d8db 100%); border-radius: 12px; border-left: 4px solid #6c757d;'><h2 style='color: #383d41; margin-top: 0;'>⚫ NDSI Level 0: Unassessed</h2><p style='font-size: 1.2em;'><strong>Score: {totalScore} / 44</strong></p><p>Critical gaps identified. Many 'Don't know' answers indicate areas needing immediate investigation.</p><h4>Recommended Actions:</h4><ul><li>Map all cloud services your organization uses</li><li>Identify the legal jurisdiction of each provider</li><li>Determine where your data is physically stored</li><li>Document who has administrative access</li><li>This is your starting point - awareness is the first step</li></ul></div>"
    }
  ],
  "completedHtml": "<div style='padding: 24px; background: #f8f9fa; border-radius: 12px;'><h2>Assessment Complete</h2><p>Your score: {totalScore} / 44</p><p>Check the recommendations above based on your level.</p></div>"
}
{{< /survey >}}

---

## Understanding Your Score

| Level | Score | What It Means |
|-------|-------|---------------|
| **🟢 Level 4: Sovereign** | 35-44 | Strong control over digital infrastructure |
| **🟡 Level 3: Resilient** | 26-34 | Good awareness, some dependencies to address |
| **🟠 Level 2: Aware** | 18-25 | Significant dependencies, exit strategies needed |
| **🔴 Level 1: Dependent** | 9-17 | High foreign dependency, priority action needed |
| **⚫ Level 0: Unassessed** | 0-8 | Critical gaps, immediate investigation required |

## Based on the EU Cloud Sovereignty Framework

The NDSI Quick Scan is adapted from the [EU Cloud Sovereignty Framework](https://commission.europa.eu/document/download/09579818-64a6-4dd5-9577-446ab6219113_en) (October 2025), which defines 8 sovereignty dimensions:

1. **Strategic Sovereignty** - Provider anchoring in EU ecosystem
2. **Legal & Jurisdictional** - Exposure to foreign laws (CLOUD Act)
3. **Data & AI Sovereignty** - Control over data location and access
4. **Operational Sovereignty** - Ability to operate independently
5. **Supply Chain** - Origin of technology components
6. **Technology** - Openness and interoperability
7. **Security & Compliance** - EU-controlled security operations
8. **Sustainability** - Long-term resilience

The Quick Scan covers the most critical aspects for Norwegian organizations. A full assessment covering all dimensions is in development.

## Privacy First

- **All data stays in your browser** - nothing is sent to any server
- No cookies, no tracking, no analytics
- Open source - [view the code](https://github.com/norwegianredcross/sovereignsky-site)
- You can save your results locally or share them - your choice

## Help Us Improve

This is **version 0.1** of the NDSI. We need your feedback:

- Are the questions clear and relevant?
- Is the scoring fair and useful?
- What's missing?
- What would make this more actionable?

[Open an issue](https://github.com/norwegianredcross/sovereignsky-site/issues) or contribute directly.

---

*The NDSI is part of the [SovereignSky](/) initiative for Norwegian digital independence.*
