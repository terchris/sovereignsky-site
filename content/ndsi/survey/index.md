---
title: "Digital Sovereignty Survey"
description: "Find out how dependent your organization is on foreign cloud providers"
summary: "Answer 11 questions and discover your NDSI level. Get a clear picture of your digital sovereignty risks and concrete recommendations for improvement."
weight: 1
---

## How Sovereign Is Your Organization?

Take this 5-minute survey to find out:
- Your **NDSI Level** (0-4) based on the EU Cloud Sovereignty Framework
- **Risk areas** where you're most exposed to foreign dependencies
- **Concrete recommendations** to improve your sovereignty posture

No signup. No data collection. All answers stay in your browser.

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
      "html": "<div style='padding: 24px; background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); border-radius: 12px; border-left: 4px solid #28a745;'><h2 style='color: #155724; margin-top: 0;'>Level 4: Sovereign</h2><p style='font-size: 1.2em;'><strong>Score: {totalScore} / 44</strong></p><p>Strong sovereignty posture. You have good control over your digital infrastructure and clear exit strategies.</p><h4>Recommended Actions:</h4><ul><li>Maintain your current position through regular re-assessment</li><li>Monitor for changes in provider ownership or terms</li><li>Share your approach with peers to help others improve</li></ul><p style='margin-top: 16px;'><a href='/software/'>Browse software alternatives</a> | <a href='/ndsi/portfolio/'>Check your software portfolio</a></p></div>"
    },
    {
      "expression": "{totalScore} >= 26 and {totalScore} < 35",
      "html": "<div style='padding: 24px; background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%); border-radius: 12px; border-left: 4px solid #ffc107;'><h2 style='color: #856404; margin-top: 0;'>Level 3: Resilient</h2><p style='font-size: 1.2em;'><strong>Score: {totalScore} / 44</strong></p><p>Good awareness with some dependencies to address. You have visibility into your situation but room for improvement.</p><h4>Recommended Actions:</h4><ul><li>Document and test exit strategies for critical services</li><li>Evaluate EU/Norwegian alternatives for highest-risk services</li><li>Review contracts for jurisdiction and termination clauses</li></ul><p style='margin-top: 16px;'><a href='/software/'>Browse software alternatives</a> | <a href='/ndsi/portfolio/'>Check your software portfolio</a></p></div>"
    },
    {
      "expression": "{totalScore} >= 18 and {totalScore} < 26",
      "html": "<div style='padding: 24px; background: linear-gradient(135deg, #ffe5d0 0%, #ffd6b8 100%); border-radius: 12px; border-left: 4px solid #fd7e14;'><h2 style='color: #984c0c; margin-top: 0;'>Level 2: Aware</h2><p style='font-size: 1.2em;'><strong>Score: {totalScore} / 44</strong></p><p>Significant dependencies identified. You need exit strategies and contingency planning.</p><h4>Recommended Actions:</h4><ul><li>Map all cloud dependencies and their jurisdictions</li><li>Create exit strategy for your most critical service</li><li>Test backup recovery procedures</li><li>Identify alternative providers for critical functions</li></ul><p style='margin-top: 16px;'><a href='/software/'>Browse software alternatives</a> | <a href='/ndsi/portfolio/'>Check your software portfolio</a></p></div>"
    },
    {
      "expression": "{totalScore} >= 9 and {totalScore} < 18",
      "html": "<div style='padding: 24px; background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%); border-radius: 12px; border-left: 4px solid #dc3545;'><h2 style='color: #721c24; margin-top: 0;'>Level 1: Dependent</h2><p style='font-size: 1.2em;'><strong>Score: {totalScore} / 44</strong></p><p>High dependency on foreign providers with limited resilience. Priority action needed.</p><h4>Recommended Actions:</h4><ul><li>Identify where your critical data is actually stored</li><li>Understand CLOUD Act implications for your organization</li><li>Start contingency planning immediately</li><li>Brief leadership on digital sovereignty risks</li></ul><p style='margin-top: 16px;'><a href='/software/'>Browse software alternatives</a> | <a href='/ndsi/portfolio/'>Check your software portfolio</a></p></div>"
    },
    {
      "expression": "{totalScore} < 9",
      "html": "<div style='padding: 24px; background: linear-gradient(135deg, #e2e3e5 0%, #d6d8db 100%); border-radius: 12px; border-left: 4px solid #6c757d;'><h2 style='color: #383d41; margin-top: 0;'>Level 0: Unassessed</h2><p style='font-size: 1.2em;'><strong>Score: {totalScore} / 44</strong></p><p>Critical gaps identified. Many 'Don't know' answers indicate areas needing immediate investigation.</p><h4>Recommended Actions:</h4><ul><li>Map all cloud services your organization uses</li><li>Identify the legal jurisdiction of each provider</li><li>Determine where your data is physically stored</li><li>This is your starting point - awareness is the first step</li></ul><p style='margin-top: 16px;'><a href='/software/'>Browse software alternatives</a> | <a href='/ndsi/portfolio/'>Check your software portfolio</a></p></div>"
    }
  ],
  "completedHtml": "<div style='padding: 24px; background: #f8f9fa; border-radius: 12px;'><h2>Assessment Complete</h2><p>Your score: {totalScore} / 44</p><p>Check the recommendations above based on your level.</p></div>"
}
{{< /survey >}}

---

## Understanding Your Score

| Level | Score | What It Means |
|-------|-------|---------------|
| **Level 4: Sovereign** | 35-44 | Strong control over digital infrastructure |
| **Level 3: Resilient** | 26-34 | Good awareness, some dependencies to address |
| **Level 2: Aware** | 18-25 | Significant dependencies, exit strategies needed |
| **Level 1: Dependent** | 9-17 | High foreign dependency, priority action needed |
| **Level 0: Unassessed** | 0-8 | Critical gaps, immediate investigation required |

## What's Next?

- [Check Your Software Portfolio](/ndsi/portfolio/) - See how your specific tools rate
- [Browse Software Database](/software/) - Find Norwegian and EU alternatives
- [Learn More](/ndsi/) - About the NDSI framework

---

*All data stays in your browser. No cookies, no tracking, no analytics.*
