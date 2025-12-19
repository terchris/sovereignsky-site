#!/usr/bin/env node

/**
 * Generate /laws/ pages from data/regions.json and data/jurisdictions.json
 *
 * This script generates:
 * - /laws/{country-slug}/ for each country (e.g., /laws/norway/, /laws/usa/)
 * - /laws/{bloc-slug}/ for each bloc (e.g., /laws/eu/, /laws/eea/, /laws/five-eyes/)
 * - /laws/_index.md (main laws page with map)
 *
 * Usage: node scripts/generate-laws-pages.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'laws');

// Load data files
const regions = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'regions.json'), 'utf8'));
const jurisdictions = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'jurisdictions.json'), 'utf8'));

// Create blocs lookup
const blocsById = {};
jurisdictions.blocs.forEach(bloc => {
  blocsById[bloc.id] = bloc;
});

// Helper: Get inherited laws for a bloc (recursive)
function getInheritedLaws(bloc, visited = new Set()) {
  if (visited.has(bloc.id)) return [];
  visited.add(bloc.id);

  let laws = [];
  if (bloc.inherits_from) {
    bloc.inherits_from.forEach(parentId => {
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
        laws = laws.concat(getInheritedLaws(parent, visited));
      }
    });
  }
  return laws;
}

// Helper: Get all applicable laws for a country
function getCountryLaws(region) {
  const result = {
    national: region.national_laws || [],
    bloc_laws: [],
    inherited_laws: []
  };

  if (region.blocs) {
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
        const inherited = getInheritedLaws(bloc);
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
    md += `- **Applies via:** [${law.source_bloc}](/laws/${law.source_bloc_id}/)\n`;
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
layout: "simple"
---

${region.description}

## Risk Assessment

**Overall Risk Level:** ${getRiskBadge(region.risk_level)}

${riskInfo.description || ''}

`;

  // Memberships
  const memberships = [];
  if (region.eu_member) memberships.push('[European Union](/laws/eu/)');
  if (region.eea_member) memberships.push('[European Economic Area](/laws/eea/)');
  if (region.adequacy_decision) memberships.push('[EU Adequacy Decision](/laws/adequacy/)');
  if (region.blocs) {
    region.blocs.forEach(blocId => {
      if (blocId !== 'eu' && blocId !== 'eea' && blocId !== 'adequacy') {
        const bloc = blocsById[blocId];
        if (bloc) {
          memberships.push(`[${bloc.name}](/laws/${bloc.slug}/)`);
        }
      }
    });
  }

  if (memberships.length > 0) {
    md += `### Memberships & Frameworks\n\n`;
    memberships.forEach(m => {
      md += `- ${m}\n`;
    });
    md += '\n';
  }

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
  md += `→ [View all jurisdictions](/laws/)\n`;
  md += `→ [Browse software by jurisdiction](/software/)\n`;

  return md;
}

// Generate bloc page
function generateBlocPage(bloc) {
  const riskInfo = jurisdictions.risk_levels[bloc.risk_level] || {};
  const inheritedLaws = getInheritedLaws(bloc);

  // Get member countries
  const memberCountries = regions.filter(r => bloc.members.includes(r.id));

  let md = `---
title: "${bloc.flag} ${bloc.name}"
description: "${bloc.description}"
layout: "simple"
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
        md += `- [${parent.flag} ${parent.name}](/laws/${parent.slug}/)\n`;
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
      md += `| [${country.flag} ${country.name}](/laws/${country.slug}/) | ${getRiskBadge(country.risk_level)} |\n`;
    });
    md += '\n';
  }

  // Navigation
  md += `---\n\n`;
  md += `→ [View all jurisdictions](/laws/)\n`;
  md += `→ [Browse software by jurisdiction](/software/)\n`;

  return md;
}

// Generate main index page
function generateIndexPage() {
  let md = `---
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

`;

  // Risk level definitions from jurisdictions.json
  Object.entries(jurisdictions.risk_levels).forEach(([key, level]) => {
    md += `### ${level.label}\n\n${level.description}\n\n`;
  });

  // Bloc overview
  md += `## Jurisdictional Frameworks\n\n`;

  jurisdictions.blocs.forEach(bloc => {
    const memberCount = bloc.members.length;
    const lawCount = (bloc.laws || []).length;
    md += `### [${bloc.flag} ${bloc.name}](/laws/${bloc.slug}/)\n\n`;
    md += `${bloc.description.split('.')[0]}.\n\n`;
    md += `- **Members:** ${memberCount} countries\n`;
    md += `- **Laws:** ${lawCount} bloc-level laws\n`;
    md += `- **Risk Level:** ${getRiskBadge(bloc.risk_level)}\n\n`;
  });

  // Country list by risk
  md += `## Countries by Risk Level\n\n`;

  const byRisk = {};
  regions.forEach(region => {
    const risk = region.risk_level || 'unknown';
    if (!byRisk[risk]) byRisk[risk] = [];
    byRisk[risk].push(region);
  });

  ['low', 'moderate', 'elevated', 'high', 'sanctioned'].forEach(risk => {
    if (byRisk[risk] && byRisk[risk].length > 0) {
      const riskInfo = jurisdictions.risk_levels[risk] || { label: risk };
      md += `### ${riskInfo.label}\n\n`;
      byRisk[risk].sort((a, b) => a.name.localeCompare(b.name)).forEach(region => {
        md += `- [${region.flag} ${region.name}](/laws/${region.slug}/)\n`;
      });
      md += '\n';
    }
  });

  // What this means
  md += `---

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
`;

  return md;
}

// Main execution
function main() {
  console.log('Generating /laws/ pages from JSON data...\n');

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
  console.log('Generated: /laws/_index.md');

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
