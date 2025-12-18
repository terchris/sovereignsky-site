#!/usr/bin/env node

/**
 * Generate Hugo content and data files for software products
 *
 * Reads:
 *   - data/products.json (full product data)
 *   - data/vendors.json (vendor data)
 *   - data/useAreas.json (use area definitions)
 *   - data/frameworks/ndsi.json (framework definition)
 *
 * Creates:
 *   - content/software/{slug}.md for each product (Hugo pages)
 *   - data/productsList.json (slim JSON for client-side filtering)
 *
 * Calculates:
 *   - risk_level from assessment scores
 *   - cloud_act from vendor country
 */

const fs = require('fs');
const path = require('path');

// Paths
const dataDir = path.join(__dirname, '..', 'data');
const contentDir = path.join(__dirname, '..', 'content', 'software');

// Read data files
console.log('Reading data files...');
const products = JSON.parse(fs.readFileSync(path.join(dataDir, 'products.json'), 'utf8'));
const vendors = JSON.parse(fs.readFileSync(path.join(dataDir, 'vendors.json'), 'utf8'));
const useAreas = JSON.parse(fs.readFileSync(path.join(dataDir, 'useAreas.json'), 'utf8'));
const ndsiFramework = JSON.parse(fs.readFileSync(path.join(dataDir, 'frameworks', 'ndsi.json'), 'utf8'));

// Build vendor lookup map
const vendorMap = {};
vendors.vendors.forEach(v => {
  vendorMap[v.id] = v;
});

// Build use_areas lookup map
const useAreaMap = {};
useAreas.forEach(a => {
  useAreaMap[a.id] = a;
});

// Valid use area IDs for validation
const validUseAreaIds = new Set(useAreas.map(a => a.id));

// Countries subject to CLOUD Act
const cloudActCountries = ['US'];

// Countries with Schrems II concerns
const schremsIICountries = ['US', 'CN', 'RU'];

/**
 * Calculate risk level from assessment scores using framework definition
 */
function calculateRiskLevel(assessment, framework) {
  if (!assessment || !assessment.scores) return 'unknown';

  const dimensions = framework.dimensions;
  let totalWeight = 0;
  let weightedSum = 0;

  dimensions.forEach(dim => {
    const score = assessment.scores[dim.id];
    if (score !== undefined) {
      const weight = dim.weight || 1.0;
      weightedSum += score.score * weight;
      totalWeight += weight;
    }
  });

  if (totalWeight === 0) return 'unknown';

  const avgScore = weightedSum / totalWeight;

  // Find matching level
  const levels = Object.entries(framework.levels)
    .sort((a, b) => a[1].max_avg - b[1].max_avg);

  for (const [levelId, levelDef] of levels) {
    if (avgScore <= levelDef.max_avg) {
      return levelId;
    }
  }

  return 'high'; // Default if above all thresholds
}

/**
 * Generate slim product object for client-side filtering
 */
function generateSlimProduct(product, vendor, riskLevel) {
  const useAreaNames = product.use_areas.map(areaId => {
    const area = useAreaMap[areaId];
    return area ? area.name : areaId;
  });

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    vendor_id: vendor.id,
    vendor_name: vendor.name,
    vendor_country: vendor.country,
    vendor_country_name: vendor.country_name,
    risk_level: riskLevel,
    cloud_act: cloudActCountries.includes(vendor.country),
    use_areas: product.use_areas,
    use_area_names: useAreaNames,
    open_source: product.open_source || false,
    self_hosted: product.hosting?.self_hosted || false,
    url: `/software/${product.slug}/`
  };
}

/**
 * Generate markdown page for a product
 */
function generateMarkdownPage(product, vendor, riskLevel) {
  const useAreaNames = product.use_areas.map(areaId => {
    const area = useAreaMap[areaId];
    return area ? area.name : areaId;
  });

  const cloudAct = cloudActCountries.includes(vendor.country);
  const schremsII = schremsIICountries.includes(vendor.country);

  const riskLabels = {
    'low': 'Low Risk',
    'moderate': 'Moderate Risk',
    'elevated': 'Elevated Risk',
    'significant': 'Significant Risk',
    'high': 'High Risk',
    'unknown': 'Unknown'
  };

  return `---
title: "${product.name}"
description: "${product.description}"
software_id: "${product.id}"
vendor_id: "${vendor.id}"
vendor_name: "${vendor.name}"
vendor_country: "${vendor.country}"
vendor_country_name: "${vendor.country_name}"
risk_level: "${riskLevel}"
risk_label: "${riskLabels[riskLevel] || riskLevel}"
cloud_act: ${cloudAct}
schrems_ii: ${schremsII}
open_source: ${product.open_source || false}
data_portability: "${product.data_portability || 'unknown'}"
date: ${new Date().toISOString().split('T')[0]}
layout: single
type: software

# Hosting options
hosting_norway: ${product.hosting?.norway || false}
hosting_eu: ${product.hosting?.eu || false}
hosting_self: ${product.hosting?.self_hosted || false}

# Taxonomies for Hugo filtering
risk_levels:
  - "${riskLevel}"
vendor_countries:
  - "${vendor.country}"
use_areas:
${product.use_areas.map(a => `  - "${a}"`).join('\n')}

# Display metadata
use_area_names:
${useAreaNames.map(a => `  - "${a}"`).join('\n')}
---

<!-- Content is rendered from data/products.json via layouts/software/single.html -->
`;
}

// Ensure content directory exists
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
  console.log('Created content/software/ directory');
}

// Process products
console.log('\nProcessing products...');
const slimProducts = [];
let created = 0;
let updated = 0;
let errors = 0;

products.products.forEach(product => {
  // Validate vendor reference
  const vendor = vendorMap[product.vendor_id];
  if (!vendor) {
    console.error(`  ERROR: Vendor "${product.vendor_id}" not found for product "${product.id}"`);
    errors++;
    return;
  }

  // Validate use_areas references
  const invalidAreas = product.use_areas.filter(areaId => !validUseAreaIds.has(areaId));
  if (invalidAreas.length > 0) {
    console.error(`  ERROR: Invalid use_areas [${invalidAreas.join(', ')}] for product "${product.id}"`);
    errors++;
    return;
  }

  // Calculate risk level from NDSI assessment
  const ndsiAssessment = product.assessments?.ndsi;
  const riskLevel = calculateRiskLevel(ndsiAssessment, ndsiFramework);

  // Generate slim product for client-side
  const slimProduct = generateSlimProduct(product, vendor, riskLevel);
  slimProducts.push(slimProduct);

  // Generate markdown page
  const markdown = generateMarkdownPage(product, vendor, riskLevel);
  const filename = `${product.slug}.md`;
  const filepath = path.join(contentDir, filename);

  const existed = fs.existsSync(filepath);
  fs.writeFileSync(filepath, markdown);

  if (existed) {
    updated++;
    console.log(`  Updated: ${filename} (${riskLevel})`);
  } else {
    created++;
    console.log(`  Created: ${filename} (${riskLevel})`);
  }
});

// Write slim products list for client-side filtering
// Note: Hugo data files use camelCase (productsList.json -> site.Data.productsList)
const slimProductsPath = path.join(dataDir, 'productsList.json');
fs.writeFileSync(slimProductsPath, JSON.stringify(slimProducts, null, 2));
console.log(`\nGenerated: data/productsList.json (${slimProducts.length} products)`);

// Summary
console.log(`\nDone!`);
console.log(`  Pages created: ${created}`);
console.log(`  Pages updated: ${updated}`);
console.log(`  Errors: ${errors}`);
console.log(`  Total products: ${products.products.length}`);

if (errors > 0) {
  process.exit(1);
}
