#!/usr/bin/env node

/**
 * Generate /laws/{law-id}/ pages from data/laws/laws.json
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
 * Build a flag lookup map from regions and blocs
 * Returns: { jurisdictionId: flag, ... }
 */
function buildFlagLookup() {
  const flagMap = {};
  
  // Load regions (countries)
  try {
    const regions = readJson(path.join(DATA_DIR, 'regions.json'));
    regions.forEach(region => {
      if (region.id && region.flag) {
        flagMap[region.id] = region.flag;
      }
    });
  } catch (e) {
    console.warn('Warning: Could not load regions.json for flags');
  }
  
  // Load blocs
  try {
    const jurisdictions = readJson(path.join(DATA_DIR, 'jurisdictions.json'));
    (jurisdictions.blocs || []).forEach(bloc => {
      if (bloc.id && bloc.flag) {
        flagMap[bloc.id] = bloc.flag;
      }
    });
  } catch (e) {
    console.warn('Warning: Could not load jurisdictions.json for flags');
  }
  
  return flagMap;
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
 * Returns: { lawId: [ { id, type, name, year, flag }, ... ], ... }
 */
function buildRelationshipMap(laws, flagLookup) {
  // Create a lookup for law metadata including primary jurisdiction flag
  const lawLookup = {};
  laws.forEach(law => {
    // Get flag from first jurisdiction in applies_to
    const primaryJurisdiction = (law.applies_to || [])[0] || '';
    const flag = flagLookup[primaryJurisdiction] || '';
    
    lawLookup[law.id] = { 
      name: law.name, 
      year: law.year,
      flag: flag
    };
  });

  // Initialize relationship map for all laws
  const relationshipMap = {};
  laws.forEach(law => {
    relationshipMap[law.id] = [];
  });

  // Process each law's explicit relationships
  laws.forEach(law => {
    if (!law.related_laws) return;

    law.related_laws.forEach(rel => {
      const targetId = rel.id;
      const relType = rel.type;

      // Skip if target law doesn't exist
      if (!lawLookup[targetId]) {
        console.warn(`  Warning: ${law.id} references unknown law: ${targetId}`);
        return;
      }

      // Add forward relationship (from this law to target)
      const forwardExists = relationshipMap[law.id].some(
        r => r.id === targetId && r.type === relType
      );
      if (!forwardExists) {
        relationshipMap[law.id].push({
          id: targetId,
          type: relType,
          name: lawLookup[targetId].name,
          year: lawLookup[targetId].year,
          flag: lawLookup[targetId].flag
        });
      }

      // Add inverse relationship (from target back to this law)
      const inverseType = getInverseRelationType(relType);
      const inverseExists = relationshipMap[targetId].some(
        r => r.id === law.id && r.type === inverseType
      );
      if (!inverseExists) {
        relationshipMap[targetId].push({
          id: law.id,
          type: inverseType,
          name: lawLookup[law.id].name,
          year: lawLookup[law.id].year,
          flag: lawLookup[law.id].flag
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
      id: rel.id,
      name: rel.name,
      year: rel.year,
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

function yamlKeyProvisionsList(key, arr) {
  if (!Array.isArray(arr) || arr.length === 0) return [];
  const out = [`${key}:`];
  arr.forEach(p => {
    if (!p || typeof p !== 'object') return;
    if (!p.title || !p.description) return;
    out.push(`  - title: ${yamlString(p.title)}`);
    out.push(`    description: ${yamlString(p.description)}`);
  });
  return out.length > 1 ? out : [];
}

// Build frontmatter from law data, using definitions for human-readable descriptions
function buildFrontmatter(law, definitions, relationships) {
  // Get human-readable descriptions from definitions
  const typeDesc = definitions.type?.values?.[law.type] || '';
  const govAccessDesc = definitions.government_access?.values?.[law.government_access] || '';
  const dataProtDesc = definitions.data_protection?.values?.[law.data_protection] || '';

  const lines = [
    `title: "${law.name}"`,
    `law_id: "${law.id}"`,
    `full_name: "${yamlEscapeString(law.full_name)}"`,
    `year: ${law.year}`,
    `scope: "${law.scope}"`,
    `applies_to:`,
    ...law.applies_to.map(a => `  - "${a}"`),
    `source_url: "${law.url}"`,
    // Multi-dimensional classification fields with descriptions
    `law_type: "${law.type}"`,
    `law_type_description: "${yamlEscapeString(typeDesc)}"`,
    `government_access: "${law.government_access}"`,
    `government_access_description: "${yamlEscapeString(govAccessDesc)}"`,
    `data_protection: "${law.data_protection}"`,
    `data_protection_description: "${yamlEscapeString(dataProtDesc)}"`,
    `extraterritorial: ${law.extraterritorial}`,
    `requires_localization: ${law.requires_localization}`,
    `requires_backdoor: ${law.requires_backdoor}`
  ];

  // Optional enrichment fields (kept in laws.json, copied into frontmatter for templates)
  const reviewStatus = law.review_status || 'ai-generated';
  lines.push(`review_status: "${reviewStatus}"`);

  lines.push(...yamlStringList('tags', law.tags));
  lines.push(...yamlStringList('what_it_does', law.what_it_does));
  lines.push(...yamlStringList('who_it_applies_to', law.who_it_applies_to));
  lines.push(...yamlKeyProvisionsList('key_provisions', law.key_provisions));
  lines.push(...yamlStringList('compliance_actions', law.compliance_actions));

  if (law.enforcement && typeof law.enforcement === 'object') {
    const hasAuthority = !!law.enforcement.authority;
    const hasMaxFine = !!law.enforcement.max_fine;
    const hasNotes = !!law.enforcement.notes;
    if (hasAuthority || hasMaxFine || hasNotes) {
      lines.push('enforcement:');
      if (hasAuthority) lines.push(`  authority: ${yamlString(law.enforcement.authority)}`);
      if (hasMaxFine) lines.push(`  max_fine: ${yamlString(law.enforcement.max_fine)}`);
      if (hasNotes) lines.push(`  notes: ${yamlString(law.enforcement.notes)}`);
    }
  }

  // Add relationships if any exist
  if (relationships && relationships.length > 0) {
    const grouped = groupRelationshipsByType(relationships);
    
    lines.push(`related_laws:`);
    
    Object.keys(grouped).sort().forEach(relType => {
      lines.push(`  ${relType}:`);
      grouped[relType].forEach(rel => {
        lines.push(`    - id: "${rel.id}"`);
        lines.push(`      name: "${rel.name}"`);
        lines.push(`      year: ${rel.year}`);
        if (rel.flag) {
          lines.push(`      flag: "${rel.flag}"`);
        }
      });
    });
  }

  lines.push(`layout: "single"`);
  lines.push(`type: "laws"`);

  return lines.join('\n');
}

// Build default body content for new pages
function buildDefaultBody(law) {
  return `${law.summary}

---

*No additional commentary yet. [Contribute on GitHub](https://github.com/helpers-no).*
`;
}

function main() {
  console.log('Generating /laws/ pages from data/laws/laws.json...\n');

  const lawsData = readJson(path.join(DATA_DIR, 'laws', 'laws.json'));
  const laws = lawsData.laws || [];
  const definitions = lawsData.definitions || {};

  // Build flag lookup from regions and blocs
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
    const lawDir = path.join(CONTENT_DIR, law.id);
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
    const relationships = relationshipMap[law.id] || [];

    const frontmatter = buildFrontmatter(law, definitions, relationships);
    const content = `---
${frontmatter}
---

${body}
`;

    fs.writeFileSync(indexPath, content);
  });

  console.log(`Created: ${created} new law pages`);
  console.log(`Updated: ${updated} existing law pages`);
  console.log(`Total: ${laws.length} laws in /laws/{id}/index.md`);
}

main();
