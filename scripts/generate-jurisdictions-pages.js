#!/usr/bin/env node

/**
 * Generate /jurisdictions/ pages from data/regions.json, data/jurisdictions.json, and data/laws/laws.json
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
const lawsData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'laws', 'laws.json'), 'utf8'));

// Create lookups
const blocsById = {};
jurisdictions.blocs.forEach(bloc => {
  blocsById[bloc.identifier] = bloc;
});

const lawsById = {};
(lawsData.itemListElement || []).forEach(law => {
  lawsById[law.identifier] = law;
});

// Helper: Resolve law IDs to full law objects
function resolveLaws(lawIds) {
  if (!lawIds || !Array.isArray(lawIds)) return [];
  return lawIds
    .map(id => lawsById[id])
    .filter(Boolean);
}

// Helper: Get inherited laws for a bloc (recursive)
// excludeBlocIds: if a parent bloc is directly applicable elsewhere, skip inheriting from it
function getInheritedLaws(bloc, visited = new Set(), excludeBlocIds = new Set()) {
  if (visited.has(bloc.identifier)) return [];
  visited.add(bloc.identifier);

  let laws = [];
  if (bloc.inheritsFrom) {
    bloc.inheritsFrom.forEach(parentId => {
      if (excludeBlocIds && excludeBlocIds.has(parentId)) {
        return;
      }
      const parent = blocsById[parentId];
      if (parent) {
        // Add parent's own laws (resolved from IDs)
        const parentLaws = resolveLaws(parent.laws);
        laws = laws.concat(parentLaws.map(law => ({
          ...law,
          source_bloc: parent.name,
          source_bloc_id: parent.identifier
        })));
        // Recursively get grandparent laws
        laws = laws.concat(getInheritedLaws(parent, visited, excludeBlocIds));
      }
    });
  }
  return laws;
}

// Helper: Get effective members for a bloc (direct + inherited member lists)
function getEffectiveBlocMembers(bloc, visited = new Set()) {
  if (!bloc || !bloc.identifier) return [];
  if (visited.has(bloc.identifier)) return [];
  visited.add(bloc.identifier);

  let members = Array.isArray(bloc.members) ? bloc.members.slice() : [];
  if (bloc.inheritsFrom) {
    bloc.inheritsFrom.forEach((parentId) => {
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
    national: resolveLaws(region.nationalLaws),
    bloc_laws: [],
    inherited_laws: []
  };

  if (region.blocs) {
    const directBlocIds = new Set(region.blocs);
    region.blocs.forEach(blocId => {
      const bloc = blocsById[blocId];
      if (bloc) {
        // Direct bloc laws (resolved from IDs)
        const blocLaws = resolveLaws(bloc.laws);
        blocLaws.forEach(law => {
          result.bloc_laws.push({
            ...law,
            source_bloc: bloc.name,
            source_bloc_id: bloc.identifier
          });
        });
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

// Helper: Format law as markdown with link to law page
function formatLaw(law, showSource = false) {
  let md = `### [${law.name}](/laws/${law.identifier}/) (${law.legislationDate})\n\n`;
  md += `**${law.alternateName || law.name}**\n\n`;
  md += `${law.description}\n\n`;
  md += `- **Category:** ${law.category}\n`;
  if (showSource && law.source_bloc) {
    md += `- **Applies via:** [${law.source_bloc}](/jurisdictions/${law.source_bloc_id}/)\n`;
  }
  md += `- **Details:** [Read more →](/laws/${law.identifier}/)\n`;
  md += '\n---\n\n';
  return md;
}

// Generate country page - minimal frontmatter only, template renders from JSON
function generateCountryPage(region) {
  return `---
title: "${region.flag} ${region.name}"
description: "Data sovereignty laws and regulations in ${region.name}"
layout: "country"
country_id: "${region.identifier}"
---
`;
}

// Generate bloc page - minimal frontmatter only, template renders from JSON
function generateBlocPage(bloc) {
  return `---
title: "${bloc.flag} ${bloc.name}"
description: "${bloc.description}"
layout: "bloc"
bloc_id: "${bloc.identifier}"
---
`;
}

// Generate main index page with map shortcode
function generateIndexPage() {
  return `---
title: "Jurisdiction & Laws"
description: "Understanding data sovereignty laws and their impact on your software choices"
echarts: true
---

When you use cloud software, your data may be subject to laws in the vendor's home country—regardless of where the data is physically stored. This is called **jurisdiction exposure**.

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
`;
}

// Main execution
function main() {
  console.log('Generating /jurisdictions/ pages from JSON data...\n');

  // Ensure content/jurisdictions directory exists
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
