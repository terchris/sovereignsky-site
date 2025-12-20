#!/usr/bin/env node

/**
 * Extract individual country GeoJSON files from a world GeoJSON file.
 * 
 * Reads regions.json to determine which countries are needed,
 * extracts each country feature collection from the input GeoJSON,
 * and writes to static/data/countries/{ISO}.json
 * 
 * Usage:
 *   node scripts/geojson-extract-countries.js
 *   node scripts/geojson-extract-countries.js static/data/world-110m.geo.json
 *   node scripts/geojson-extract-countries.js --input static/data/world-50m.geo.json
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const STATIC_DATA_DIR = path.join(__dirname, '..', 'static', 'data');
const COUNTRIES_OUTPUT_DIR = path.join(STATIC_DATA_DIR, 'countries');

const DEFAULT_WORLD_GEOJSON_PATH = path.join(STATIC_DATA_DIR, 'world-50m.geo.json');
const REGIONS_PATH = path.join(DATA_DIR, 'regions.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function getArgValue(argv, flag) {
  const idx = argv.indexOf(flag);
  if (idx === -1) return null;
  const val = argv[idx + 1];
  if (!val || val.startsWith('-')) return null;
  return val;
}

function resolveInputPath(inputPath) {
  // Allow passing absolute paths, or relative paths from the current working dir.
  return path.isAbsolute(inputPath) ? inputPath : path.resolve(process.cwd(), inputPath);
}

function getWorldGeoJsonPath() {
  const argv = process.argv.slice(2);

  const explicit = getArgValue(argv, '--input') || getArgValue(argv, '-i') || argv.find(a => !a.startsWith('-'));
  if (!explicit) return DEFAULT_WORLD_GEOJSON_PATH;

  return resolveInputPath(explicit);
}

/**
 * Try to extract ISO 2-letter code from a GeoJSON feature's properties.
 * Different sources use different property names.
 */
function getIsoCode(properties) {
  if (!properties) return null;

  // Common property names for ISO 2-letter codes (in order of preference)
  const candidates = [
    'ISO_A2',
    'iso_a2',
    'ISO_A2_EH',   // Natural Earth sometimes uses this
    'iso_a2_eh',
    'ISO2',
    'iso2',
    'id',
    'ID',
    'code',
    'CODE',
    'country_code',
    'COUNTRY_CODE',
    'ADM0_A3',     // 3-letter code fallback
    'adm0_a3',
    'ISO_A3',
    'iso_a3',
  ];

  for (const key of candidates) {
    const val = properties[key];
    if (typeof val === 'string' && val.length >= 2 && val.length <= 3 && val !== '-99' && val !== '-1') {
      // Return first 2 chars if it's a 3-letter code, otherwise as-is
      return val.length === 3 ? val.substring(0, 2) : val;
    }
  }

  return null;
}

function main() {
  const worldGeoJsonPath = getWorldGeoJsonPath();

  console.log('Reading regions.json...');
  const regions = readJson(REGIONS_PATH);
  const neededCodes = new Set(regions.map(r => r.id.toUpperCase()));
  console.log(`Found ${neededCodes.size} countries needed: ${[...neededCodes].join(', ')}`);

  console.log(`\nReading world GeoJSON: ${worldGeoJsonPath}`);
  if (!fs.existsSync(worldGeoJsonPath)) {
    console.error(`Error: input file not found: ${worldGeoJsonPath}`);
    console.error('Usage: node scripts/geojson-extract-countries.js [path/to/world.geo.json]');
    console.error(`Default: ${DEFAULT_WORLD_GEOJSON_PATH}`);
    process.exit(1);
  }
  const world = readJson(worldGeoJsonPath);

  if (!world.features || !Array.isArray(world.features)) {
    console.error('Error: input GeoJSON does not have a features array');
    process.exit(1);
  }

  console.log(`Found ${world.features.length} features in input GeoJSON`);

  // Debug: show first feature's properties to help identify the ISO code field
  if (world.features.length > 0) {
    const firstProps = world.features[0].properties;
    console.log('\nFirst feature properties (for debugging):');
    console.log(JSON.stringify(firstProps, null, 2).substring(0, 500) + '...');
  }

  ensureDir(COUNTRIES_OUTPUT_DIR);

  // Build a map of ISO code -> feature(s)
  const featuresByCode = new Map();
  let unmatchedCount = 0;

  for (const feature of world.features) {
    const code = getIsoCode(feature.properties);
    if (!code) {
      unmatchedCount++;
      continue;
    }

    const upperCode = code.toUpperCase();
    if (!featuresByCode.has(upperCode)) {
      featuresByCode.set(upperCode, []);
    }
    featuresByCode.get(upperCode).push(feature);
  }

  console.log(`\nMatched ${featuresByCode.size} unique country codes, ${unmatchedCount} features without valid codes`);

  // Write individual country files
  let written = 0;
  let skipped = 0;
  const missing = [];

  for (const code of neededCodes) {
    const features = featuresByCode.get(code);

    if (!features || features.length === 0) {
      missing.push(code);
      skipped++;
      continue;
    }

    // Create a FeatureCollection for this country
    // (some countries have multiple features, e.g., islands)
    const countryGeoJson = {
      type: 'FeatureCollection',
      features: features
    };

    const outputPath = path.join(COUNTRIES_OUTPUT_DIR, `${code}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(countryGeoJson));

    const sizeKb = (fs.statSync(outputPath).size / 1024).toFixed(1);
    console.log(`  ${code}.json (${sizeKb} KB, ${features.length} feature(s))`);
    written++;
  }

  console.log(`\n✓ Written ${written} country files to static/data/countries/`);

  if (missing.length > 0) {
    console.log(`\n⚠ Missing countries (not found in input GeoJSON): ${missing.join(', ')}`);
  }

  // Show available codes not in regions.json (for reference)
  const availableCodes = [...featuresByCode.keys()].filter(c => !neededCodes.has(c)).sort();
  if (availableCodes.length > 0) {
    console.log(`\nAvailable but not needed (${availableCodes.length}): ${availableCodes.slice(0, 20).join(', ')}${availableCodes.length > 20 ? '...' : ''}`);
  }
}

main();
