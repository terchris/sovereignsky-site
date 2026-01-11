#!/usr/bin/env node

/**
 * Generate /laws/{identifier}/ pages from data/laws/laws.json
 *
 * Creates stub pages for each law. Body content comes from JSON.
 *
 * Handles bidirectional relationships: if law A relates to law B,
 * the inverse relationship is automatically added to law B's page.
 *
 * Image handling:
 * - If image field is set, copies from images/laws/{filename} to content/laws/{id}/featured.png
 * - If image starts with http, downloads from URL
 *
 * Usage: node scripts/generate-laws-pages.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const DATA_DIR = path.join(__dirname, '..', 'data');
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'laws');
const IMAGES_DIR = path.join(__dirname, '..', 'images', 'laws');

// Copy image from source to destination
function copyImage(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

// Download image from URL
function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);

    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        downloadImage(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

// Handle image for a law
async function handleImage(law, lawDir) {
  if (!law.image) return false;

  const destPath = path.join(lawDir, 'featured.png');

  // Check if it's a URL
  if (law.image.startsWith('http://') || law.image.startsWith('https://')) {
    try {
      await downloadImage(law.image, destPath);
      console.log(`  Downloaded image for: ${law.identifier}`);
      return true;
    } catch (err) {
      console.warn(`  Warning: Failed to download image for ${law.identifier}: ${err.message}`);
      return false;
    }
  }

  // It's a local filename - copy from images folder
  const srcPath = path.join(IMAGES_DIR, law.image);
  if (copyImage(srcPath, destPath)) {
    return true;
  }
  // Silent - no warning if image doesn't exist (many laws won't have images)
  return false;
}

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

// Get body content from JSON or use default
function getBodyContent(law) {
  if (law.body && law.body.trim()) {
    return law.body;
  }
  return `*No additional commentary yet. [Contribute on GitHub](https://github.com/terchris/sovereignsky-site).*`;
}

async function main() {
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

  for (const law of laws) {
    const lawDir = path.join(CONTENT_DIR, law.identifier);
    const indexPath = path.join(lawDir, 'index.md');

    ensureDir(lawDir);

    // Handle image (copy or download)
    await handleImage(law, lawDir);

    // Get body from JSON
    const body = getBodyContent(law);

    // Track created vs updated
    if (fs.existsSync(indexPath)) {
      updated++;
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
  }

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

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
