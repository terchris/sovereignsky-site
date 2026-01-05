---
title: "Jurisdiction & Laws"
description: "Understanding data sovereignty laws and their impact on your software choices"
echarts: true
layout: "simple"
---

When you use cloud software, your data may be subject to laws in the vendor's home country—regardless of where the data is physically stored. This is called **jurisdiction exposure**.

{{< page-stats section="jurisdictions" >}}

## Map

Search, filter, and click a country to open its full jurisdiction page.

{{< jurisdiction-map >}}

<details>
<summary><strong>What do the risk levels mean?</strong></summary>

- **Low**: Strong data protection; low extraterritorial access risk.
- **Moderate**: Generally adequate protection; some surveillance/legal uncertainty.
- **Elevated**: Significant surveillance capabilities; consider mitigations.
- **High**: Broad state access and/or extraterritorial reach; avoid for sensitive data.
- **Sanctioned**: Legal/business restrictions may apply.
</details>

## Jurisdictional Frameworks

- [🇪🇺 European Union](/jurisdictions/eu/)
- [🇪🇺 European Economic Area](/jurisdictions/eea/)
- [👁️ Five Eyes](/jurisdictions/five-eyes/)
- [✓ EU Adequacy Decisions](/jurisdictions/adequacy/)

---

## What This Means for Your Organization

If you use software from a US company (Microsoft 365, Google Workspace, Salesforce, etc.), your data may be accessible to US authorities even if:
- ✅ You store data in your home country
- ✅ You use EU Data Boundary settings
- ✅ You encrypt your data (unless you control the keys)

**Mitigation strategies:**
1. Choose vendors from safe jurisdictions (EU/EEA companies)
2. Self-host where possible
3. Use customer-managed encryption keys
4. Understand what data you're storing and its sensitivity

→ [Browse software by jurisdiction](/software/)
