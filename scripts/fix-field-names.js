#!/usr/bin/env node
/**
 * Fix field names in templates to match standardized camelCase conventions
 */

const fs = require('fs');
const path = require('path');

const files = [
  'layouts/partials/sidebar/jurisdiction-laws-card.html',
  'layouts/partials/sidebar/jurisdiction-memberships-card.html',
  'layouts/partials/sidebar/jurisdiction-datacenters-card.html',
  'layouts/jurisdictions/country.html',
  'layouts/shortcodes/jurisdiction-map.html',
  'layouts/jurisdictions/single.html',
  'layouts/partials/jurisdiction-laws-inline.html',
  'layouts/datacenters/single.html',
  'layouts/datacenters/provider.html',
  'layouts/datacenters/country.html',
  'layouts/shortcodes/jurisdiction-laws.html',
  'layouts/_default/software-term.html',
  'layouts/partials/software-term-content.html',
  'layouts/software/single.html',
  'layouts/software/list.html',
  'layouts/shortcodes/datacenter-provider-summary.html',
  'layouts/shortcodes/datacenter-map.html',
  'layouts/shortcodes/datacenter-providers.html',
  'layouts/shortcodes/datacenter-risk-assessment.html',
  'layouts/shortcodes/datacenter-countries.html',
  'layouts/shortcodes/datacenter-country-regions.html',
  'layouts/shortcodes/datacenter-country-providers.html',
  'layouts/partials/datacenter-risk-assessment-inline.html',
  'layouts/partials/datacenter-provider-summary-inline.html',
  'layouts/partials/datacenter-country-regions-inline.html',
  'layouts/partials/datacenter-country-providers-inline.html',
  'scripts/generate-jurisdictions-pages.js',
  'scripts/generate-software-pages.js',
  'scripts/generate-datacenters-pages.js',
];

const replacements = [
  // Field access patterns
  ['.risk_level', '.riskLevel'],
  ['.eu_member', '.euMember'],
  ['.eea_member', '.eeaMember'],
  ['.law_concern', '.lawConcern'],
  ['.national_laws', '.nationalLaws'],
  ['.inherits_from', '.inheritsFrom'],
  ['.map_color', '.mapColor'],
  ['.adequacy_decision', '.adequacyDecision'],
  ['.political_concern', '.politicalConcern'],
  // Index/key access patterns
  ['"risk_level"', '"riskLevel"'],
  ['"map_color"', '"mapColor"'],
  ['"inherits_from"', '"inheritsFrom"'],
  ['"national_laws"', '"nationalLaws"'],
  ['"eu_member"', '"euMember"'],
  ['"eea_member"', '"eeaMember"'],
  ['"law_concern"', '"lawConcern"'],
  ['"adequacy_decision"', '"adequacyDecision"'],
  // Object key patterns (JS)
  ['risk_levels', 'riskLevels'],
  ['risk_level:', 'riskLevel:'],
  ['risk_level,', 'riskLevel,'],
  ['national_laws:', 'nationalLaws:'],
  ['national_laws,', 'nationalLaws,'],
  ['inherits_from:', 'inheritsFrom:'],
  ['inherits_from,', 'inheritsFrom,'],
  // .id to .identifier (be careful - only in specific contexts)
];

let totalUpdated = 0;

files.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping (not found): ${file}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(fullPath, content);
    console.log(`Updated: ${file}`);
    totalUpdated++;
  }
});

console.log(`\nTotal files updated: ${totalUpdated}`);
