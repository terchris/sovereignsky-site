#!/usr/bin/env node

/**
 * Combine country GeoJSON files into bloc files (EU, EEA, Five Eyes, etc.)
 * 
 * Reads data/regions.json to determine bloc membership,
 * combines individual country files from static/data/countries/,
 * and writes combined files to static/data/blocs/
 * 
 * Usage: node scripts/geojson-create-blocks.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const COUNTRIES_DIR = path.join(__dirname, '..', 'static', 'data', 'countries');
const BLOCS_DIR = path.join(__dirname, '..', 'static', 'data', 'blocs');

const REGIONS_PATH = path.join(DATA_DIR, 'regions.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function main() {
  console.log('Reading regions.json...');
  const regions = readJson(REGIONS_PATH);

  // Define blocs to generate
  const blocDefinitions = {
    'EU': (r) => r.eu_member === true,
    'EEA': (r) => r.eea_member === true,
    'five-eyes': (r) => r.blocs && r.blocs.includes('five-eyes'),
    'adequacy': (r) => r.adequacy_decision === true || (r.blocs && r.blocs.includes('adequacy')),
  };

  ensureDir(BLOCS_DIR);

  for (const [blocName, filterFn] of Object.entries(blocDefinitions)) {
    const memberCountries = regions.filter(filterFn);
    const countryCodes = memberCountries.map(r => r.id);

    console.log(`\n${blocName}: ${countryCodes.join(', ')}`);

    // Collect features from individual country files
    const allFeatures = [];
    const missing = [];

    for (const code of countryCodes) {
      const countryFile = path.join(COUNTRIES_DIR, `${code}.json`);

      if (!fs.existsSync(countryFile)) {
        missing.push(code);
        continue;
      }

      const countryGeoJson = readJson(countryFile);
      if (countryGeoJson.features) {
        allFeatures.push(...countryGeoJson.features);
      }
    }

    if (missing.length > 0) {
      console.log(`  ⚠ Missing: ${missing.join(', ')}`);
    }

    // Write combined file
    const combinedGeoJson = {
      type: 'FeatureCollection',
      features: allFeatures
    };

    const outputPath = path.join(BLOCS_DIR, `${blocName}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(combinedGeoJson));

    const sizeKb = (fs.statSync(outputPath).size / 1024).toFixed(1);
    console.log(`  ✓ ${blocName}.json (${sizeKb} KB, ${allFeatures.length} features from ${countryCodes.length - missing.length} countries)`);
  }

  console.log(`\nDone. Files written to static/data/blocs/`);
}

main();
