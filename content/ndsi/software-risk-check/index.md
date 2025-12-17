---
title: "Software Risk Check"
description: "Check the sovereignty risk of your software tools"
summary: "Select the tools your organization uses. Get an instant risk assessment showing which tools expose you to foreign dependencies."
weight: 2
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
            { "value": "ms-teams:2.4", "text": "Microsoft Teams (Microsoft 365 chat, video, collaboration)" },
            { "value": "slack:2.5", "text": "Slack (Team messaging with channels and integrations)" },
            { "value": "pexip:0.8", "text": "Pexip (Norwegian video conferencing)" },
            { "value": "whereby:0.9", "text": "Whereby (Norwegian simple video meetings)" },
            { "value": "element:0.7", "text": "Element/Matrix (Open source chat and video)" }
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
            { "value": "github:2.3", "text": "GitHub (Code hosting, CI/CD, Microsoft-owned)" },
            { "value": "gitlab:1.8", "text": "GitLab (Code hosting, CI/CD, self-host option)" }
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
            { "value": "jira:2.2", "text": "Jira (Atlassian project and issue tracking)" }
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
            { "value": "salesforce:2.8", "text": "Salesforce (CRM, sales and marketing platform)" },
            { "value": "superoffice:0.9", "text": "SuperOffice (Norwegian/Scandinavian CRM)" }
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
            { "value": "tripletex:0.6", "text": "Tripletex (Norwegian cloud accounting)" }
          ],
          "colCount": 1
        }
      ]
    }
  ],
  "completedHtml": "<div id='portfolio-results-placeholder'><p>Calculating your results...</p></div>"
}
{{< /survey >}}

<div id="portfolio-results" style="display: none;"></div>

<script>
function calculatePortfolioResults() {
  const resultsDiv = document.getElementById('portfolio-results');
  const placeholder = document.getElementById('portfolio-results-placeholder');
  if (!resultsDiv) return;

  // Get all selected tools from localStorage
  const surveyData = localStorage.getItem('portfolio-check');
  if (!surveyData) {
    return;
  }

  const data = JSON.parse(surveyData);
  const allSelections = [];

  // Collect all selections from all question types
  Object.keys(data).forEach(key => {
    if (Array.isArray(data[key])) {
      data[key].forEach(item => {
        const [id, score] = item.split(':');
        allSelections.push({ id, score: parseFloat(score) });
      });
    }
  });

  if (allSelections.length === 0) {
    if (placeholder) {
      placeholder.innerHTML = `
        <div style="padding: 24px; background: #f8f9fa; border-radius: 12px; text-align: center;">
          <h2 style="margin-top: 0;">No Tools Selected</h2>
          <p>You didn't select any tools. Refresh the page and check the tools your organization uses.</p>
        </div>
      `;
    }
    return;
  }

  const totalScore = allSelections.reduce((sum, s) => sum + s.score, 0);
  const avgScore = totalScore / allSelections.length;
  const count = allSelections.length;

  // Determine risk level
  let level, levelColor, levelBg, recommendation;
  if (avgScore <= 1.0) {
    level = 'Low Risk';
    levelColor = '#155724';
    levelBg = 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)';
    recommendation = 'Your portfolio has good digital sovereignty. Continue monitoring for changes in provider ownership or terms.';
  } else if (avgScore <= 2.0) {
    level = 'Moderate Risk';
    levelColor = '#856404';
    levelBg = 'linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%)';
    recommendation = 'Your portfolio has some sovereignty risks. Consider exit strategies for US-based tools and evaluate European alternatives.';
  } else if (avgScore <= 3.0) {
    level = 'Elevated Risk';
    levelColor = '#984c0c';
    levelBg = 'linear-gradient(135deg, #ffe5d0 0%, #ffd6b8 100%)';
    recommendation = 'Significant foreign dependencies detected. Document exit strategies and begin evaluating sovereign alternatives for critical tools.';
  } else {
    level = 'High Risk';
    levelColor = '#721c24';
    levelBg = 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)';
    recommendation = 'High dependency on foreign cloud providers. Priority action needed - start contingency planning immediately.';
  }

  // Count by risk category
  const lowRisk = allSelections.filter(s => s.score <= 1.0).length;
  const modRisk = allSelections.filter(s => s.score > 1.0 && s.score <= 2.5).length;
  const highRisk = allSelections.filter(s => s.score > 2.5).length;

  const resultHTML = `
    <div style="padding: 24px; background: ${levelBg}; border-radius: 12px; border-left: 4px solid ${levelColor};">
      <h2 style="color: ${levelColor}; margin-top: 0;">Portfolio Risk: ${level}</h2>
      <p style="font-size: 1.2em;"><strong>Average Risk Score: ${avgScore.toFixed(1)} / 4.0</strong></p>
      <p><strong>${count} tools</strong> analyzed: ${lowRisk} low risk, ${modRisk} moderate risk, ${highRisk} elevated/high risk</p>
      <p>${recommendation}</p>
    </div>

    <div style="margin-top: 24px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
      <h3 style="margin-top: 0;">Next Steps</h3>
      <ul>
        <li><a href="/software/">Browse the Software Database</a> - Find sovereign alternatives</li>
        <li><a href="/ndsi/survey/">Take the Full NDSI Survey</a> - Assess organizational readiness</li>
        <li><a href="/ndsi/">Learn more about NDSI</a> - Understand the framework</li>
      </ul>
    </div>

    <div style="margin-top: 16px; text-align: center;">
      <button onclick="localStorage.removeItem('portfolio-check'); location.reload();" style="padding: 8px 16px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer;">
        ← Start Over
      </button>
    </div>
  `;

  // Show in placeholder if it exists
  if (placeholder) {
    placeholder.innerHTML = resultHTML;
  }
}
</script>

---

## About This Assessment

The risk score for each tool is based on the [Norwegian Digital Sovereignty Index](/ndsi/) framework:

- 🟢 **Low risk (0-1.0)** - Norwegian/EU provider, strong data control
- 🟡 **Moderate risk (1.1-2.5)** - Foreign provider with mitigations available
- 🟠 **Elevated risk (2.6-3.0)** - Significant foreign dependency
- 🔴 **High risk (3.1-4.0)** - Critical foreign dependency

All data stays in your browser. No information is sent to any server.
