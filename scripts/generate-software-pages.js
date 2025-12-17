#!/usr/bin/env node

/**
 * Generate Hugo content pages for each software product
 *
 * Reads: data/software.json
 * Creates: content/software/{slug}.md for each product
 */

const fs = require('fs');
const path = require('path');

// Paths
const dataPath = path.join(__dirname, '..', 'data', 'software.json');
const contentDir = path.join(__dirname, '..', 'content', 'software');

// Read software data
console.log('Reading software.json...');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Ensure content directory exists
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
  console.log('Created content/software/ directory');
}

// Generate page for each product
let created = 0;
let updated = 0;

data.products.forEach(product => {
  const filename = `${product.slug}.md`;
  const filepath = path.join(contentDir, filename);

  // Generate front matter
  const frontMatter = {
    title: product.name,
    description: product.description,
    software_id: product.id,
    vendor: product.vendor.name,
    country: product.vendor.country,
    risk_level: product.sovereignty.level,
    sovereignty_score: product.sovereignty.score,
    cloud_act: product.sovereignty.cloud_act || false,
    use_areas: product.use_areas,
    date: new Date().toISOString().split('T')[0],
    layout: 'single',
    type: 'software'
  };

  // Build markdown content
  const content = `---
title: "${frontMatter.title}"
description: "${frontMatter.description}"
software_id: "${frontMatter.software_id}"
vendor: "${frontMatter.vendor}"
country: "${frontMatter.country}"
risk_level: "${frontMatter.risk_level}"
sovereignty_score: ${frontMatter.sovereignty_score}
cloud_act: ${frontMatter.cloud_act}
use_areas: [${frontMatter.use_areas.map(a => `"${a}"`).join(', ')}]
date: ${frontMatter.date}
layout: single
type: software
---

<!-- Content is rendered from data/software.json via layouts/software/single.html -->
`;

  // Check if file exists
  const existed = fs.existsSync(filepath);

  // Write file
  fs.writeFileSync(filepath, content);

  if (existed) {
    updated++;
    console.log(`  Updated: ${filename}`);
  } else {
    created++;
    console.log(`  Created: ${filename}`);
  }
});

console.log(`\nDone! Created: ${created}, Updated: ${updated}, Total: ${data.products.length}`);
