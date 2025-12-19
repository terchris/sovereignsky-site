#!/usr/bin/env node

/**
 * Merge datacenter provider files into a single datacenters.json
 *
 * Reads all JSON files from data/datacenters/ and creates:
 * - data/datacenters.json (merged file for Hugo templates)
 *
 * Usage: node scripts/merge-datacenters.js
 */

const fs = require('fs');
const path = require('path');

const DATACENTERS_DIR = path.join(__dirname, '..', 'data', 'datacenters');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'datacenters.json');

function main() {
  console.log('Merging datacenter provider files...\n');

  // Read all JSON files from datacenters directory
  const files = fs.readdirSync(DATACENTERS_DIR).filter(f => f.endsWith('.json'));

  const providers = [];
  let totalRegions = 0;

  files.forEach(file => {
    const filePath = path.join(DATACENTERS_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    providers.push(data);
    const regionCount = data.regions ? data.regions.length : 0;
    totalRegions += regionCount;

    console.log(`  ${data.provider_name}: ${regionCount} regions`);
  });

  // Sort providers: US hyperscalers first, then EU, then Nordic (by name within each group)
  const vendorOrder = {
    'US': 1,
    'FR': 2,
    'DE': 2,
    'CH': 2,
    'SE': 3,
    'NO': 3
  };

  providers.sort((a, b) => {
    const orderA = vendorOrder[a.vendor_country_id] || 4;
    const orderB = vendorOrder[b.vendor_country_id] || 4;
    if (orderA !== orderB) return orderA - orderB;
    return a.provider_name.localeCompare(b.provider_name);
  });

  // Build merged output
  const output = {
    providers: providers,
    meta: {
      total_providers: providers.length,
      total_regions: totalRegions,
      generated: new Date().toISOString().split('T')[0],
      description: "Merged datacenter data from data/datacenters/*.json"
    }
  };

  // Write merged file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

  console.log(`\nGenerated: data/datacenters.json`);
  console.log(`  Providers: ${providers.length}`);
  console.log(`  Total regions: ${totalRegions}`);
}

main();
