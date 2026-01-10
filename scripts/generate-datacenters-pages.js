#!/usr/bin/env node

/**
 * Generate /datacenters/{provider}/ pages from data/datacenters/datacenters.json
 *
 * This script generates minimal markdown files with all data in frontmatter.
 * All content is rendered dynamically via shortcodes using page params.
 *
 * Usage: node scripts/generate-datacenters-pages.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'datacenters');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Simple YAML serializer for frontmatter
function toYaml(obj, indent = 0) {
  const spaces = '  '.repeat(indent);
  let result = '';

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      if (value.length === 0) {
        result += `${spaces}${key}: []\n`;
      } else if (typeof value[0] === 'object') {
        result += `${spaces}${key}:\n`;
        value.forEach((item) => {
          result += `${spaces}  -\n`;
          for (const [k, v] of Object.entries(item)) {
            if (v === null || v === undefined) continue;
            if (Array.isArray(v)) {
              if (v.length === 0) {
                result += `${spaces}    ${k}: []\n`;
              } else {
                result += `${spaces}    ${k}:\n`;
                v.forEach((i) => {
                  result += `${spaces}      - ${typeof i === 'string' ? `"${i}"` : i}\n`;
                });
              }
            } else {
              result += `${spaces}    ${k}: ${typeof v === 'string' ? `"${v}"` : v}\n`;
            }
          }
        });
      } else {
        result += `${spaces}${key}:\n`;
        value.forEach((item) => {
          result += `${spaces}  - ${typeof item === 'string' ? `"${item}"` : item}\n`;
        });
      }
    } else if (typeof value === 'object') {
      result += `${spaces}${key}:\n`;
      result += toYaml(value, indent + 1);
    } else if (typeof value === 'string') {
      result += `${spaces}${key}: "${value.replace(/"/g, '\\"')}"\n`;
    } else {
      result += `${spaces}${key}: ${value}\n`;
    }
  }

  return result;
}

function main() {
  const providers = readJson(path.join(DATA_DIR, 'datacenters', 'datacenters.json'));
  const regionList = readJson(path.join(DATA_DIR, 'regions.json'));

  const regionsById = {};
  regionList.forEach((r) => {
    regionsById[r.identifier] = r;
  });

  ensureDir(CONTENT_DIR);

  let count = 0;
  providers.forEach((p) => {
    const providerId = p.identifier;
    if (!providerId) return;

    const providerDir = path.join(CONTENT_DIR, providerId);
    ensureDir(providerDir);

    // Get vendor country info
    const vendorCountryId = p.vendorCountryId || '';
    const vendorRegion = regionsById[vendorCountryId] || {};
    const vendorCountryName = vendorRegion.name || vendorCountryId;
    const vendorFlag = vendorRegion.flag || '';
    const vendorRisk = vendorRegion.riskLevel || 'unknown';
    const vendorSlug = vendorRegion.slug || '';

    // Build frontmatter object
    const frontmatter = {
      title: `${p.name} Datacenters`,
      description: `Datacenter locations for ${p.name}, colored by vendor jurisdiction`,
      layout: 'provider',
      type: 'datacenters',
      echarts: true,
      showTableOfContents: true,
      // Provider data
      provider_id: providerId,
      provider_name: p.name,
      provider_type: p.providerType || '',
      provider_url: p.url || '',
      date_modified: p.dateModified || '',
      // Vendor jurisdiction
      vendor_country_id: vendorCountryId,
      vendor_country_name: vendorCountryName,
      vendor_country_flag: vendorFlag,
      vendor_country_slug: vendorSlug,
      vendor_risk: vendorRisk,
      // Region stats
      total_regions: (p.regions || []).length,
      total_countries: [...new Set((p.regions || []).map(r => r.countryId))].length,
      // Regions data
      regions: (p.regions || []).map(r => ({
        identifier: r.identifier || '',
        name: r.name || '',
        countryId: r.countryId || '',
        city: r.city || '',
        coordinates: r.coordinates || []
      }))
    };

    // Generate YAML frontmatter
    const yamlContent = toYaml(frontmatter);

    const md = `---
${yamlContent}---

*No additional commentary yet. [Contribute on GitHub](https://github.com/terchris/sovereignsky-site).*
`;

    fs.writeFileSync(path.join(providerDir, 'index.md'), md);
    count += 1;
  });

  console.log(`Generated ${count} provider pages in content/datacenters/{provider}/index.md`);
}

main();
