#!/usr/bin/env node
/**
 * generate-persona-pages.js
 *
 * Generates individual persona content pages from data/personas/personas.json
 * Creates content/personas/{persona-id}/index.md for each persona
 *
 * Usage: node scripts/generate-persona-pages.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const PERSONAS_DATA_PATH = path.join(ROOT_DIR, 'data/personas/personas.json');
const PERSONAS_CONTENT_DIR = path.join(ROOT_DIR, 'content/personas');

// Load personas data
const personasData = JSON.parse(fs.readFileSync(PERSONAS_DATA_PATH, 'utf8'));
const personas = personasData.itemListElement || [];

console.log(`Found ${personas.length} personas to generate pages for\n`);

function escapeYaml(str) {
  return String(str || '').replace(/"/g, '\\"');
}

let created = 0;
let updated = 0;

personas.forEach(persona => {
  const audienceType = persona.audienceType;
  const name = persona.name || audienceType;
  const shortDesc = persona.disambiguatingDescription || '';
  const description = persona.description || '';
  const icon = persona.icon || 'user';

  const personaDir = path.join(PERSONAS_CONTENT_DIR, audienceType);
  const indexPath = path.join(personaDir, 'index.md');

  // Create directory if it doesn't exist
  if (!fs.existsSync(personaDir)) {
    fs.mkdirSync(personaDir, { recursive: true });
  }

  const isNew = !fs.existsSync(indexPath);

  // Generate frontmatter
  // - summary: short description for header (disambiguatingDescription)
  // - description: full inspiring text shown below image
  const content = `---
title: "${escapeYaml(name)}"
summary: "${escapeYaml(shortDesc)}"
description: "${escapeYaml(description)}"
persona_id: "${audienceType}"
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
    console.log(`CREATE: ${audienceType}`);
    created++;
  } else {
    console.log(`UPDATE: ${audienceType}`);
    updated++;
  }
});

console.log(`\nDone! Created ${created}, updated ${updated}.`);
