#!/usr/bin/env node

/**
 * Generate /laws/{identifier}/ pages from data/laws/laws.json
 *
 * Creates stub pages for each law. If a page already exists with content,
 * it preserves the content and only updates the frontmatter.
 *
 * Handles bidirectional relationships: if law A relates to law B,
 * the inverse relationship is automatically added to law B's page.
 *
 * Usage: node scripts/generate-laws-pages.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'laws');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

// Parse existing markdown to extract frontmatter and content
function parseMarkdown(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (match) {
    return {
      frontmatter: match[1],
      body: match[2].trim()
    };
  }
  return { frontmatter: '', body: content.trim() };
}

/**
 * Build a flag lookup map from jurisdictions
 * Returns: { jurisdictionId: flag, ... }
 */
function buildFlagLookup() {
  const flagMap = {};

  try {
    const jurisdictions = readJson(path.join(DATA_DIR, 'jurisdictions.json'));

    // Load blocs
    (jurisdictions.blocs || []).forEach(bloc => {
      if (bloc.id && bloc.flag) {
        flagMap[bloc.id] = bloc.flag;
      }
    });

    // Load countries
    (jurisdictions.countries || []).forEach(country => {
      if (country.id && country.flag) {
        flagMap[country.id] = country.flag;
      }
    });
  } catch (e) {
    console.warn('Warning: Could not load jurisdictions.json for flags');
  }

  return flagMap;
}

/**
 * Load law types for category descriptions
 */
function loadLawTypes() {
  try {
    const lawTypes = readJson(path.join(DATA_DIR, 'laws', 'law_types.json'));
    const typeMap = {};
    (lawTypes.itemListElement || []).forEach(type => {
      typeMap[type.identifier] = type;
    });
    return typeMap;
  } catch (e) {
    console.warn('Warning: Could not load law_types.json');
    return {};
  }
}

/**
 * Get the inverse relationship type
 * Symmetric relationships return the same type
 */
function getInverseRelationType(type) {
  const inverseMap = {
    'implements': 'implemented_by',
    'implemented_by': 'implements',
    'interprets': 'interpreted_by',
    'interpreted_by': 'interprets',
    'conflicts_with': 'conflicts_with', // symmetric
    'complements': 'complements', // symmetric
    'succeeds': 'succeeded_by',
    'succeeded_by': 'succeeds',
    'extends': 'extended_by',
    'extended_by': 'extends',
    'amends': 'amended_by',
    'amended_by': 'amends'
  };
  return inverseMap[type] || type;
}

/**
 * Build bidirectional relationship map from all laws
 * Returns: { lawId: [ { identifier, type, name, legislationDate, flag }, ... ], ... }
 */
function buildRelationshipMap(laws, flagLookup) {
  // Create a lookup for law metadata including primary jurisdiction flag
  const lawLookup = {};
  laws.forEach(law => {
    // Get flag from first jurisdiction
    const primaryJurisdiction = (law.legislationJurisdiction || [])[0] || '';
    const flag = flagLookup[primaryJurisdiction.toLowerCase()] || flagLookup[primaryJurisdiction] || '';

    lawLookup[law.identifier] = {
      name: law.name,
      legislationDate: law.legislationDate,
      flag: flag
    };
  });

  // Initialize relationship map for all laws
  const relationshipMap = {};
  laws.forEach(law => {
    relationshipMap[law.identifier] = [];
  });

  // Process each law's explicit relationships
  laws.forEach(law => {
    if (!law.isRelatedTo) return;

    law.isRelatedTo.forEach(rel => {
      const targetId = rel.identifier;
      const relType = rel.type;

      // Skip if target law doesn't exist
      if (!lawLookup[targetId]) {
        console.warn(`  Warning: ${law.identifier} references unknown law: ${targetId}`);
        return;
      }

      // Add forward relationship (from this law to target)
      const forwardExists = relationshipMap[law.identifier].some(
        r => r.identifier === targetId && r.type === relType
      );
      if (!forwardExists) {
        relationshipMap[law.identifier].push({
          identifier: targetId,
          type: relType,
          name: lawLookup[targetId].name,
          legislationDate: lawLookup[targetId].legislationDate,
          flag: lawLookup[targetId].flag
        });
      }

      // Add inverse relationship (from target back to this law)
      const inverseType = getInverseRelationType(relType);
      const inverseExists = relationshipMap[targetId].some(
        r => r.identifier === law.identifier && r.type === inverseType
      );
      if (!inverseExists) {
        relationshipMap[targetId].push({
          identifier: law.identifier,
          type: inverseType,
          name: lawLookup[law.identifier].name,
          legislationDate: lawLookup[law.identifier].legislationDate,
          flag: lawLookup[law.identifier].flag
        });
      }
    });
  });

  return relationshipMap;
}

/**
 * Group relationships by type for cleaner frontmatter
 */
function groupRelationshipsByType(relationships) {
  const grouped = {};
  relationships.forEach(rel => {
    if (!grouped[rel.type]) {
      grouped[rel.type] = [];
    }
    grouped[rel.type].push({
      identifier: rel.identifier,
      name: rel.name,
      legislationDate: rel.legislationDate,
      flag: rel.flag || ''
    });
  });
  return grouped;
}

function yamlEscapeString(s) {
  return String(s ?? '').replace(/"/g, '\\"');
}

function yamlString(s) {
  return `"${yamlEscapeString(s)}"`;
}

function yamlStringList(key, arr) {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  const out = [`${key}:`];
  arr.forEach(item => {
    if (item === null || item === undefined) return;
    out.push(`  - ${yamlString(item)}`);
  });
  return out.length > 1 ? out : [];
}

// Build frontmatter from law data
function buildFrontmatter(law, lawTypes, relationships) {
  // Get category description from law_types
  const categoryInfo = lawTypes[law.category] || {};
  const categoryDesc = categoryInfo.description || '';

  const lines = [
    `title: ${yamlString(law.name)}`,
    `identifier: ${yamlString(law.identifier)}`,
    `alternateName: ${yamlString(law.alternateName || '')}`,
    `description: ${yamlString(law.description || '')}`,
    `abstract: ${yamlString(law.abstract || '')}`,
    `summary: ${yamlString(law.summary || '')}`,
    `legislationDate: ${yamlString(law.legislationDate)}`,
    `legislationLegalForce: ${yamlString(law.legislationLegalForce || 'InForce')}`,
    `sourceUrl: ${yamlString(law.url || '')}`,
  ];

  // Jurisdiction array
  if (law.legislationJurisdiction && law.legislationJurisdiction.length > 0) {
    lines.push(`legislationJurisdiction:`);
    law.legislationJurisdiction.forEach(j => {
      lines.push(`  - ${yamlString(j)}`);
    });
  }

  // Classification fields
  lines.push(`category: ${yamlString(law.category)}`);
  lines.push(`categoryDescription: ${yamlString(categoryDesc)}`);
  lines.push(`governmentAccess: ${yamlString(law.governmentAccess || '')}`);
  lines.push(`dataProtection: ${yamlString(law.dataProtection || '')}`);
  lines.push(`extraterritorial: ${law.extraterritorial === true}`);
  lines.push(`requiresLocalization: ${law.requiresLocalization === true}`);
  lines.push(`requiresBackdoor: ${law.requiresBackdoor === true}`);

  // Review status
  lines.push(`reviewStatus: ${yamlString(law.reviewStatus || 'ai-generated')}`);

  // Topics
  lines.push(...yamlStringList('topics', law.topics));

  // Tags
  lines.push(...yamlStringList('tags', law.tags));

  // Audience
  lines.push(...yamlStringList('audience', law.audience));

  // Add relationships if any exist
  if (relationships && relationships.length > 0) {
    const grouped = groupRelationshipsByType(relationships);

    lines.push(`isRelatedTo:`);

    Object.keys(grouped).sort().forEach(relType => {
      lines.push(`  ${relType}:`);
      grouped[relType].forEach(rel => {
        lines.push(`    - identifier: ${yamlString(rel.identifier)}`);
        lines.push(`      name: ${yamlString(rel.name)}`);
        lines.push(`      legislationDate: ${yamlString(rel.legislationDate)}`);
        if (rel.flag) {
          lines.push(`      flag: ${yamlString(rel.flag)}`);
        }
      });
    });
  }

  lines.push(`layout: "single"`);
  lines.push(`type: "laws"`);

  return lines.join('\n');
}

// Build default body content for new pages
// Note: Abstract and Summary are now in frontmatter and rendered via common-content-section partial
function buildDefaultBody(law) {
  return `*No additional commentary yet. [Contribute on GitHub](https://github.com/terchris/sovereignsky-site).*
`;
}

function main() {
  console.log('Generating /laws/ pages from data/laws/laws.json...\n');

  const lawsData = readJson(path.join(DATA_DIR, 'laws', 'laws.json'));
  const laws = lawsData.itemListElement || [];

  if (laws.length === 0) {
    console.error('No laws found in itemListElement array');
    process.exit(1);
  }

  // Load law types for category descriptions
  console.log('Loading law types...');
  const lawTypes = loadLawTypes();
  console.log(`Loaded ${Object.keys(lawTypes).length} law types\n`);

  // Build flag lookup from jurisdictions
  console.log('Loading jurisdiction flags...');
  const flagLookup = buildFlagLookup();
  console.log(`Loaded ${Object.keys(flagLookup).length} jurisdiction flags\n`);

  // Build bidirectional relationship map
  console.log('Building bidirectional relationship map...');
  const relationshipMap = buildRelationshipMap(laws, flagLookup);

  // Count total relationships
  let totalRelationships = 0;
  Object.values(relationshipMap).forEach(rels => {
    totalRelationships += rels.length;
  });
  console.log(`Found ${totalRelationships} total relationships (including inverses)\n`);

  ensureDir(CONTENT_DIR);

  let created = 0;
  let updated = 0;

  laws.forEach(law => {
    const lawDir = path.join(CONTENT_DIR, law.identifier);
    const indexPath = path.join(lawDir, 'index.md');

    ensureDir(lawDir);

    let body = buildDefaultBody(law);

    // Check if file exists and has custom content
    if (fs.existsSync(indexPath)) {
      const existing = fs.readFileSync(indexPath, 'utf8');
      const parsed = parseMarkdown(existing);

      // If there's custom body content (not just the default), preserve it
      if (parsed.body && !parsed.body.includes('No additional commentary yet')) {
        body = parsed.body;
        updated++;
      } else {
        updated++;
      }
    } else {
      created++;
    }

    // Get relationships for this law (including inverse relationships)
    const relationships = relationshipMap[law.identifier] || [];

    const frontmatter = buildFrontmatter(law, lawTypes, relationships);
    const content = `---
${frontmatter}
---

${body}
`;

    fs.writeFileSync(indexPath, content);
  });

  // Generate _index.md for the list page
  const listIndexPath = path.join(CONTENT_DIR, '_index.md');
  const listIndexContent = `---
title: "Laws"
description: "Data sovereignty and privacy laws from jurisdictions worldwide, including access powers, localization requirements, and protection frameworks"
---

{{< page-stats section="laws" >}}
`;

  const listIndexIsNew = !fs.existsSync(listIndexPath);
  fs.writeFileSync(listIndexPath, listIndexContent);
  if (listIndexIsNew) {
    console.log(`CREATE: _index.md`);
    created++;
  } else {
    console.log(`UPDATE: _index.md`);
    updated++;
  }

  console.log(`\nCreated: ${created} new law pages`);
  console.log(`Updated: ${updated} existing law pages`);
  console.log(`Total: ${laws.length} laws in /laws/{identifier}/index.md`);
}

main();
