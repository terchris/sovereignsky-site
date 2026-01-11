#!/usr/bin/env node
/**
 * generate-persona-pages.js
 *
 * Generates individual persona content pages from data/audience/audience.json
 * Creates content/personas/{identifier}/index.md for each audience
 *
 * Usage: node scripts/generate-persona-pages.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const AUDIENCE_DATA_PATH = path.join(ROOT_DIR, 'data/audience/audience.json');
const PERSONAS_CONTENT_DIR = path.join(ROOT_DIR, 'content/personas');

// Load audience data
const audienceData = JSON.parse(fs.readFileSync(AUDIENCE_DATA_PATH, 'utf8'));
const audiences = audienceData.itemListElement || [];

console.log(`Found ${audiences.length} audiences to generate persona pages for\n`);

function escapeYaml(str) {
  return String(str || '').replace(/"/g, '\\"');
}

let created = 0;
let updated = 0;

audiences.forEach(audience => {
  const identifier = audience.identifier;
  const name = audience.name || identifier;
  const description = audience.description || '';
  const abstract = audience.abstract || '';
  const icon = audience.icon || 'user';

  const personaDir = path.join(PERSONAS_CONTENT_DIR, identifier);
  const indexPath = path.join(personaDir, 'index.md');

  // Create directory if it doesn't exist
  if (!fs.existsSync(personaDir)) {
    fs.mkdirSync(personaDir, { recursive: true });
  }

  const isNew = !fs.existsSync(indexPath);

  // Generate frontmatter
  // - description: short summary for SEO/cards
  // - abstract: longer inspiring text for detail pages
  const content = `---
title: "${escapeYaml(name)}"
description: "${escapeYaml(description)}"
abstract: "${escapeYaml(abstract)}"
persona_id: "${identifier}"
icon: "${icon}"
date: ${new Date().toISOString().split('T')[0]}
showHero: true
showDate: false
showAuthor: false
showReadingTime: false
showTableOfContents: true
showPagination: false
---

`;

  fs.writeFileSync(indexPath, content);

  if (isNew) {
    console.log(`CREATE: ${identifier}`);
    created++;
  } else {
    console.log(`UPDATE: ${identifier}`);
    updated++;
  }
});

// Generate _index.md for the list page
const indexPath = path.join(PERSONAS_CONTENT_DIR, '_index.md');
const indexContent = `---
title: "Personas"
description: "${escapeYaml(audienceData.description || 'Target audiences for content, events, and software recommendations')}"
date: ${new Date().toISOString().split('T')[0]}
showHero: false
showDate: false
showAuthor: false
showReadingTime: false
showTableOfContents: false
showPagination: false
---

{{< page-stats section="personas" >}}

These personas are used across the site (especially for event "audience" and software filtering). Pick one to jump into relevant events, laws, and products.

`;

// Create content directory if it doesn't exist
if (!fs.existsSync(PERSONAS_CONTENT_DIR)) {
  fs.mkdirSync(PERSONAS_CONTENT_DIR, { recursive: true });
}

const indexIsNew = !fs.existsSync(indexPath);
fs.writeFileSync(indexPath, indexContent);
if (indexIsNew) {
  console.log(`CREATE: _index.md`);
  created++;
} else {
  console.log(`UPDATE: _index.md`);
  updated++;
}

console.log(`\nDone! Created ${created}, updated ${updated}.`);
