---
title: "Software Risk Check"
weight: 2
description: "Check the sovereignty risk of your software tools"
summary: "Select the tools your organization uses. Get an instant risk assessment showing which tools expose you to foreign dependencies."
topics:
  - "digital-sovereignty"
  - "data-protection"
audience:
  - "public-sector"
  - "enterprise"
  - "it-ops"
---

## Which Tools Does Your Organization Use?

Select all that apply. We'll show you the sovereignty risk of your software portfolio.

No signup. No data collection. All answers stay in your browser.

---

{{< survey id="portfolio-check" >}}
{
  "title": "Software Portfolio Check",
  "description": "Select the tools your organization uses",
  "showProgressBar": "top",
  "progressBarType": "pages",
  "showQuestionNumbers": "off",
  "questionErrorLocation": "bottom",
  "showCompletedPage": true,
  "pages": [
    {
      "name": "communication",
      "title": "Communication Tools",
      "description": "Email, chat, video and meetings",
      "elements": [
        {
          "type": "checkbox",
          "name": "communication_tools",
          "title": "Which communication tools does your organization use?",
          "isRequired": false,
          "choices": [
            {
              "value": "ms-teams:2.4",
              "text": "Microsoft Teams (Microsoft 365 chat, video, collaboration)"
            },
            {
              "value": "slack:2.5",
              "text": "Slack (Team messaging with channels and integrations)"
            },
            {
              "value": "pexip:0.8",
              "text": "Pexip (Norwegian video conferencing)"
            },
            {
              "value": "whereby:0.9",
              "text": "Whereby (Norwegian simple video meetings)"
            },
            {
              "value": "element:0.7",
              "text": "Element/Matrix (Open source chat and video)"
            }
          ],
          "colCount": 1
        }
      ]
    },
    {
      "name": "devtools",
      "title": "Development & IT",
      "description": "Code hosting, CI/CD, version control",
      "elements": [
        {
          "type": "checkbox",
          "name": "dev_tools",
          "title": "Which development tools does your organization use?",
          "isRequired": false,
          "choices": [
            {
              "value": "github:2.3",
              "text": "GitHub (Code hosting, CI/CD, Microsoft-owned)"
            },
            {
              "value": "gitlab:1.8",
              "text": "GitLab (Code hosting, CI/CD, self-host option)"
            }
          ],
          "colCount": 1
        }
      ]
    },
    {
      "name": "project",
      "title": "Project Management",
      "description": "Task tracking, agile, scrum",
      "elements": [
        {
          "type": "checkbox",
          "name": "project_tools",
          "title": "Which project management tools does your organization use?",
          "isRequired": false,
          "choices": [
            {
              "value": "jira:2.2",
              "text": "Jira (Atlassian project and issue tracking)"
            }
          ],
          "colCount": 1
        }
      ]
    },
    {
      "name": "crm",
      "title": "Sales & CRM",
      "description": "Customer relationship management",
      "elements": [
        {
          "type": "checkbox",
          "name": "crm_tools",
          "title": "Which CRM tools does your organization use?",
          "isRequired": false,
          "choices": [
            {
              "value": "salesforce:2.8",
              "text": "Salesforce (CRM, sales and marketing platform)"
            },
            {
              "value": "superoffice:0.9",
              "text": "SuperOffice (Norwegian/Scandinavian CRM)"
            }
          ],
          "colCount": 1
        }
      ]
    },
    {
      "name": "finance",
      "title": "Finance & Accounting",
      "description": "Invoicing, accounting, payroll",
      "elements": [
        {
          "type": "checkbox",
          "name": "finance_tools",
          "title": "Which finance tools does your organization use?",
          "isRequired": false,
          "choices": [
            {
              "value": "tripletex:0.6",
              "text": "Tripletex (Norwegian cloud accounting)"
            }
          ],
          "colCount": 1
        }
      ]
    }
  ],
  "completedHtml": "<div id='portfolio-results-placeholder'><p>Calculating your results...</p></div>"
}
{{< /survey >}}
