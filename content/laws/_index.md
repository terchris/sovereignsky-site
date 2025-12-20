---
title: "Jurisdiction & Laws"
description: "Understanding data sovereignty laws and their impact on your software choices"
echarts: true
layout: "simple"
---

When your organization uses cloud software, your data may be subject to laws in the vendor's home country - regardless of where the data is physically stored. This is called **jurisdiction exposure**.

## Global Surveillance Laws Map

This interactive map shows countries with laws that may affect your data sovereignty. **Green** indicates safe jurisdictions (EU/EEA or adequacy decisions), while **red** indicates high-risk jurisdictions with extraterritorial data access laws.

{{< jurisdiction-map >}}

## Understanding the Risk Levels

### Low Risk

Strong data protection laws aligned with GDPR. No extraterritorial data access concerns.

### Moderate Risk

Generally adequate protection with some surveillance capabilities or legal uncertainties.

### Elevated Risk

Significant surveillance laws or extraterritorial data access capabilities. Consider mitigations.

### High Risk

Broad government access to data, weak privacy protections, or extraterritorial reach. Avoid for sensitive data.

### Sanctioned

Subject to international sanctions. Business relationships may be legally restricted.

## Jurisdictional Frameworks

### [🇪🇺 European Union](/laws/eu/)

The European Union provides comprehensive data protection through GDPR and related regulations.

- **Members:** 27 countries
- **Laws:** 3 bloc-level laws
- **Risk Level:** ✅ Low Risk

### [🇪🇺 European Economic Area](/laws/eea/)

The EEA extends the EU single market to Norway, Iceland, and Liechtenstein.

- **Members:** 3 countries
- **Laws:** 1 bloc-level laws
- **Risk Level:** ✅ Low Risk

### [👁️ Five Eyes](/laws/five-eyes/)

Intelligence alliance between Australia, Canada, New Zealand, United Kingdom, and United States.

- **Members:** 5 countries
- **Laws:** 0 bloc-level laws
- **Risk Level:** 🔶 Elevated Risk

### [✓ EU Adequacy Decisions](/laws/adequacy/)

Countries recognized by the European Commission as providing adequate data protection, allowing free flow of personal data from the EU without additional safeguards.

- **Members:** 14 countries
- **Laws:** 0 bloc-level laws
- **Risk Level:** ✅ Low Risk

## Countries by Risk Level

### Low Risk

- [🇦🇹 Austria](/laws/austria/)
- [🇧🇪 Belgium](/laws/belgium/)
- [🇧🇬 Bulgaria](/laws/bulgaria/)
- [🇭🇷 Croatia](/laws/croatia/)
- [🇨🇾 Cyprus](/laws/cyprus/)
- [🇨🇿 Czechia](/laws/czechia/)
- [🇩🇰 Denmark](/laws/denmark/)
- [🇪🇪 Estonia](/laws/estonia/)
- [🇫🇮 Finland](/laws/finland/)
- [🇫🇷 France](/laws/france/)
- [🇩🇪 Germany](/laws/germany/)
- [🇬🇷 Greece](/laws/greece/)
- [🇭🇺 Hungary](/laws/hungary/)
- [🇮🇪 Ireland](/laws/ireland/)
- [🇮🇹 Italy](/laws/italy/)
- [🇯🇵 Japan](/laws/japan/)
- [🇱🇻 Latvia](/laws/latvia/)
- [🇱🇹 Lithuania](/laws/lithuania/)
- [🇱🇺 Luxembourg](/laws/luxembourg/)
- [🇲🇹 Malta](/laws/malta/)
- [🇳🇱 Netherlands](/laws/netherlands/)
- [🇳🇴 Norway](/laws/norway/)
- [🇵🇱 Poland](/laws/poland/)
- [🇵🇹 Portugal](/laws/portugal/)
- [🇷🇴 Romania](/laws/romania/)
- [🇸🇰 Slovakia](/laws/slovakia/)
- [🇸🇮 Slovenia](/laws/slovenia/)
- [🇰🇷 South Korea](/laws/south-korea/)
- [🇪🇸 Spain](/laws/spain/)
- [🇸🇪 Sweden](/laws/sweden/)
- [🇨🇭 Switzerland](/laws/switzerland/)

### Moderate Risk

- [🇧🇭 Bahrain](/laws/bahrain/)
- [🇧🇷 Brazil](/laws/brazil/)
- [🇨🇦 Canada](/laws/canada/)
- [🇨🇱 Chile](/laws/chile/)
- [🇨🇴 Colombia](/laws/colombia/)
- [🇪🇬 Egypt](/laws/egypt/)
- [🇭🇰 Hong Kong](/laws/hong-kong/)
- [🇮🇩 Indonesia](/laws/indonesia/)
- [🇮🇱 Israel](/laws/israel/)
- [🇲🇾 Malaysia](/laws/malaysia/)
- [🇲🇽 Mexico](/laws/mexico/)
- [🇳🇿 New Zealand](/laws/new-zealand/)
- [🇵🇭 Philippines](/laws/philippines/)
- [🇶🇦 Qatar](/laws/qatar/)
- [🇸🇦 Saudi Arabia](/laws/saudi-arabia/)
- [🇷🇸 Serbia](/laws/serbia/)
- [🇸🇬 Singapore](/laws/singapore/)
- [🇿🇦 South Africa](/laws/south-africa/)
- [🇹🇼 Taiwan](/laws/taiwan/)
- [🇹🇭 Thailand](/laws/thailand/)
- [🇹🇷 Turkey](/laws/turkey/)
- [🇦🇪 United Arab Emirates](/laws/united-arab-emirates/)

### Elevated Risk

- [🇦🇺 Australia](/laws/australia/)
- [🇮🇳 India](/laws/india/)
- [🇬🇧 United Kingdom](/laws/united-kingdom/)

### High Risk

- [🇨🇳 China](/laws/china/)
- [🇺🇸 USA](/laws/usa/)

### Sanctioned

- [🇷🇺 Russia](/laws/russia/)

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
