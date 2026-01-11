#!/usr/bin/env node
/**
 * Transform datacenter field names to standardized conventions:
 * - snake_case → camelCase
 * - *_id/*_name → identifier/name
 */

const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../data/datacenters/datacenters.json');
const outputFile = inputFile; // Overwrite in place

// Read the data
const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

// Transform each provider
const transformed = data.map(provider => {
  const newProvider = {
    identifier: provider.provider_id,
    name: provider.provider_name,
    providerType: provider.provider_type,
    vendorCountryId: provider.vendor_country_id,
    url: provider.vendor_website,
    dateModified: provider.updated,
    regions: (provider.regions || []).map(region => ({
      identifier: region.region_id,
      name: region.region_name,
      countryId: region.country_id,
      city: region.city,
      coordinates: region.coordinates
    }))
  };

  // Only include meta if it exists
  if (provider.meta) {
    newProvider.meta = provider.meta;
  }

  return newProvider;
});

// Write back
fs.writeFileSync(outputFile, JSON.stringify(transformed, null, 2) + '\n');

console.log(`Transformed ${transformed.length} providers`);
console.log('Field name changes:');
console.log('  provider_id → identifier');
console.log('  provider_name → name');
console.log('  provider_type → providerType');
console.log('  vendor_country_id → vendorCountryId');
console.log('  vendor_website → url');
console.log('  updated → dateModified');
console.log('  region_id → identifier');
console.log('  region_name → name');
console.log('  country_id → countryId');
