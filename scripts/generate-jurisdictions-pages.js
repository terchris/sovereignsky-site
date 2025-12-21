#!/usr/bin/env node

/**
 * Generate /jurisdictions/ pages from data/regions.json and data/jurisdictions.json
 *
 * This script generates:
 * - /jurisdictions/{country-slug}/ for each country (e.g., /jurisdictions/norway/, /jurisdictions/usa/)
 * - /jurisdictions/{bloc-slug}/ for each bloc (e.g., /jurisdictions/eu/, /jurisdictions/eea/, /jurisdictions/five-eyes/)
 * - /jurisdictions/_index.md (main jurisdictions page with map)
 *
 * Usage: node scripts/generate-jurisdictions-pages.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'jurisdictions');

// Load data files
const regions = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'regions.json'), 'utf8'));
const jurisdictions = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'jurisdictions.json'), 'utf8'));

// Create blocs lookup
const blocsById = {};
jurisdictions.blocs.forEach(bloc => {
  blocsById[bloc.id] = bloc;
});

// Helper: Get inherited laws for a bloc (recursive)
// excludeBlocIds: if a parent bloc is directly applicable elsewhere, skip inheriting from it
function getInheritedLaws(bloc, visited = new Set(), excludeBlocIds = new Set()) {
  if (visited.has(bloc.id)) return [];
  visited.add(bloc.id);

  let laws = [];
  if (bloc.inherits_from) {
    bloc.inherits_from.forEach(parentId => {
      if (excludeBlocIds && excludeBlocIds.has(parentId)) {
        return;
      }
      const parent = blocsById[parentId];
      if (parent) {
        // Add parent's own laws
        if (parent.laws) {
          laws = laws.concat(parent.laws.map(law => ({
            ...law,
            source_bloc: parent.name,
            source_bloc_id: parent.id
          })));
        }
        // Recursively get grandparent laws
        laws = laws.concat(getInheritedLaws(parent, visited, excludeBlocIds));
      }
    });
  }
  return laws;
}

// Helper: Get effective members for a bloc (direct + inherited member lists)
function getEffectiveBlocMembers(bloc, visited = new Set()) {
  if (!bloc || !bloc.id) return [];
  if (visited.has(bloc.id)) return [];
  visited.add(bloc.id);

  let members = Array.isArray(bloc.members) ? bloc.members.slice() : [];
  if (bloc.inherits_from) {
    bloc.inherits_from.forEach((parentId) => {
      const parent = blocsById[parentId];
      if (parent) {
        members = members.concat(getEffectiveBlocMembers(parent, visited));
      }
    });
  }

  return Array.from(new Set(members));
}

// Helper: Get all applicable laws for a country
function getCountryLaws(region) {
  const result = {
    national: region.national_laws || [],
    bloc_laws: [],
    inherited_laws: []
  };

  if (region.blocs) {
    const directBlocIds = new Set(region.blocs);
    region.blocs.forEach(blocId => {
      const bloc = blocsById[blocId];
      if (bloc) {
        // Direct bloc laws
        if (bloc.laws) {
          bloc.laws.forEach(law => {
            result.bloc_laws.push({
              ...law,
              source_bloc: bloc.name,
              source_bloc_id: bloc.id
            });
          });
        }
        // Inherited laws from parent blocs
        const inherited = getInheritedLaws(bloc, new Set(), directBlocIds);
        result.inherited_laws = result.inherited_laws.concat(inherited);
      }
    });
  }

  return result;
}

// Helper: Format severity badge
function getSeverityBadge(severity) {
  const badges = {
    'protective': '🛡️ Protective',
    'neutral': '⚖️ Neutral',
    'medium': '⚠️ Medium Concern',
    'high': '🚨 High Concern'
  };
  return badges[severity] || severity;
}

// Helper: Format risk level badge
function getRiskBadge(riskLevel) {
  const badges = {
    'low': '✅ Low Risk',
    'moderate': '⚠️ Moderate Risk',
    'elevated': '🔶 Elevated Risk',
    'high': '🚨 High Risk',
    'sanctioned': '⛔ Sanctioned'
  };
  return badges[riskLevel] || riskLevel;
}

// Helper: Format law as markdown
function formatLaw(law, showSource = false) {
  let md = `### ${law.name} (${law.year})\n\n`;
  md += `**${law.full_name}**\n\n`;
  md += `${law.summary}\n\n`;
  md += `- **Severity:** ${getSeverityBadge(law.severity)}\n`;
  if (showSource && law.source_bloc) {
    md += `- **Applies via:** [${law.source_bloc}](/jurisdictions/${law.source_bloc_id}/)\n`;
  }
  if (law.url) {
    md += `- **Source:** [Read the law](${law.url})\n`;
  }
  md += '\n---\n\n';
  return md;
}

// Generate country page
function generateCountryPage(region) {
  const laws = getCountryLaws(region);
  const riskInfo = jurisdictions.risk_levels[region.risk_level] || {};

  // Build frontmatter
  let md = `---
title: "${region.flag} ${region.name}"
description: "Data sovereignty laws and regulations in ${region.name}"
layout: "country"
showTableOfContents: true
---

${region.description}

## Risk Assessment

**Overall Risk Level:** ${getRiskBadge(region.risk_level)}

${riskInfo.description || ''}

`;

  // National laws
  if (laws.national.length > 0) {
    md += `## National Laws\n\n`;
    md += `These laws are specific to ${region.name}.\n\n`;
    laws.national.forEach(law => {
      md += formatLaw(law, false);
    });
  }

  // Bloc laws (direct membership)
  if (laws.bloc_laws.length > 0) {
    md += `## Applicable Bloc Laws\n\n`;
    md += `These laws apply through ${region.name}'s membership in regional agreements.\n\n`;
    laws.bloc_laws.forEach(law => {
      md += formatLaw(law, true);
    });
  }

  // Inherited laws
  if (laws.inherited_laws.length > 0) {
    md += `## Inherited Laws\n\n`;
    md += `These laws apply through inherited agreements.\n\n`;
    laws.inherited_laws.forEach(law => {
      md += formatLaw(law, true);
    });
  }

  // No laws message
  if (laws.national.length === 0 && laws.bloc_laws.length === 0 && laws.inherited_laws.length === 0) {
    md += `## Laws\n\nNo specific laws of concern have been identified for ${region.name}.\n\n`;
  }

  // Navigation
  md += `---\n\n`;
  md += `→ [View all jurisdictions](/jurisdictions/)\n`;
  md += `→ [Browse software by jurisdiction](/software/)\n`;

  return md;
}

// Generate bloc page
function generateBlocPage(bloc) {
  const riskInfo = jurisdictions.risk_levels[bloc.risk_level] || {};
  const inheritedLaws = getInheritedLaws(bloc);

  // Get member countries (direct + inherited, e.g. EEA includes EU members)
  const effectiveMembers = getEffectiveBlocMembers(bloc);
  const memberCountries = regions.filter(r => effectiveMembers.includes(r.id));

  let md = `---
title: "${bloc.flag} ${bloc.name}"
description: "${bloc.description}"
showTableOfContents: true
---

${bloc.description}

## Risk Assessment

**Overall Risk Level:** ${getRiskBadge(bloc.risk_level)}

${riskInfo.description || ''}

`;

  // Notes
  if (bloc.notes) {
    md += `> **Note:** ${bloc.notes}\n\n`;
  }

  // Inherits from
  if (bloc.inherits_from && bloc.inherits_from.length > 0) {
    md += `### Inherits From\n\n`;
    bloc.inherits_from.forEach(parentId => {
      const parent = blocsById[parentId];
      if (parent) {
        md += `- [${parent.flag} ${parent.name}](/jurisdictions/${parent.slug}/)\n`;
      }
    });
    md += '\n';
  }

  // Direct laws
  if (bloc.laws && bloc.laws.length > 0) {
    md += `## Laws\n\n`;
    md += `These laws apply to all member states of the ${bloc.name}.\n\n`;
    bloc.laws.forEach(law => {
      md += formatLaw(law, false);
    });
  }

  // Inherited laws
  if (inheritedLaws.length > 0) {
    md += `## Inherited Laws\n\n`;
    md += `These laws are inherited from parent frameworks.\n\n`;
    inheritedLaws.forEach(law => {
      md += formatLaw(law, true);
    });
  }

  // Member countries
  if (memberCountries.length > 0) {
    md += `## Member Countries\n\n`;
    md += `| Country | Risk Level |\n`;
    md += `|---------|------------|\n`;
    memberCountries.sort((a, b) => a.name.localeCompare(b.name)).forEach(country => {
      md += `| [${country.flag} ${country.name}](/jurisdictions/${country.slug}/) | ${getRiskBadge(country.risk_level)} |\n`;
    });
    md += '\n';
  }

  // Navigation
  md += `---\n\n`;
  md += `→ [View all jurisdictions](/jurisdictions/)\n`;
  md += `→ [Browse software by jurisdiction](/software/)\n`;

  return md;
}

// Generate main index page
function generateIndexPage() {
  return `---
title: "Jurisdiction & Laws"
description: "Understanding data sovereignty laws and their impact on your software choices"
echarts: true
layout: "simple"
---

When you use cloud software, your data may be subject to laws in the vendor’s home country—regardless of where the data is physically stored. This is called **jurisdiction exposure**.

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
4. Understand what data you’re storing and its sensitivity

→ [Browse software by jurisdiction](/software/)
`;
}

// Main execution
function main() {
  console.log('Generating /jurisdictions/ pages from JSON data...\n');

  // Ensure content/laws directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }

  // Clean existing generated pages (keep only _index.md initially)
  const existingFiles = fs.readdirSync(CONTENT_DIR);
  existingFiles.forEach(file => {
    const filePath = path.join(CONTENT_DIR, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      fs.rmSync(filePath, { recursive: true });
      console.log(`  Removed: ${file}/`);
    }
  });

  // Generate main index
  const indexContent = generateIndexPage();
  fs.writeFileSync(path.join(CONTENT_DIR, '_index.md'), indexContent);
  console.log('Generated: /jurisdictions/_index.md');

  // Generate country pages
  let countryCount = 0;
  regions.forEach(region => {
    if (!region.slug) {
      console.warn(`  Skipping ${region.name}: no slug defined`);
      return;
    }

    const countryDir = path.join(CONTENT_DIR, region.slug);
    fs.mkdirSync(countryDir, { recursive: true });

    const content = generateCountryPage(region);
    fs.writeFileSync(path.join(countryDir, 'index.md'), content);
    countryCount++;
  });
  console.log(`Generated: ${countryCount} country pages`);

  // Generate bloc pages
  let blocCount = 0;
  jurisdictions.blocs.forEach(bloc => {
    const blocDir = path.join(CONTENT_DIR, bloc.slug);
    fs.mkdirSync(blocDir, { recursive: true });

    const content = generateBlocPage(bloc);
    fs.writeFileSync(path.join(blocDir, 'index.md'), content);
    blocCount++;
  });
  console.log(`Generated: ${blocCount} bloc pages`);

  console.log('\nDone! Total pages generated:', 1 + countryCount + blocCount);
}

main();
