#!/usr/bin/env node

/**
 * Generate /countries/{bloc}/ pages from data/jurisdictions.json blocs
 *
 * Creates one page per bloc (EU, EEA, Five Eyes, etc.)
 * Example: /countries/eu/ shows EU member countries with datacenter info
 *
 * Usage: node scripts/generate-blocs-pages.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const CONTENT_COUNTRIES_DIR = path.join(__dirname, '..', 'content', 'countries');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function safeWrite(filePath, content) {
  fs.writeFileSync(filePath, content);
}

function main() {
  const jurisdictions = readJson(path.join(DATA_DIR, 'jurisdictions.json'));
  const blocs = jurisdictions.blocs || [];

  ensureDir(CONTENT_COUNTRIES_DIR);

  let generated = 0;
  blocs.forEach((bloc) => {
    const slug = bloc.slug;
    if (!slug) {
      console.warn(`Skipping bloc without slug: ${bloc.identifier}`);
      return;
    }

    const targetDir = path.join(CONTENT_COUNTRIES_DIR, slug);
    const indexPath = path.join(targetDir, 'index.md');

    ensureDir(targetDir);

    const abstract = bloc.abstract || `${bloc.name} jurisdictional bloc.`;
    const summary = bloc.summary || '';

    const md = `---
blocId: "${bloc.identifier}"
name: "${bloc.name}"
flag: "${bloc.flag || ''}"
slug: "${slug}"
abstract: "${abstract.replace(/"/g, '\\"')}"
summary: "${summary.replace(/"/g, '\\"')}"
body: ""
image: ""
riskLevel: "${bloc.riskLevel || ''}"
members: ${JSON.stringify(bloc.members || [])}
laws: ${JSON.stringify(bloc.laws || [])}
inheritsFrom: ${JSON.stringify(bloc.inheritsFrom || [])}
echarts: true
layout: "bloc"
showTableOfContents: true
---
`;

    safeWrite(indexPath, md);
    generated += 1;
  });

  console.log(`Generated ${generated} bloc pages in content/countries/{bloc}/index.md`);
}

main();
