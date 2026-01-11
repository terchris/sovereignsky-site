#!/usr/bin/env node

/**
 * Generate bloc pages from data/blocs/blocs.json
 *
 * Creates:
 * 1. /blocs/_index.md - Landing page for all blocs
 * 2. /countries/{bloc}/index.md - Individual bloc pages (EU, EEA, Five Eyes, etc.)
 *
 * Example: /countries/eu/ shows EU member countries with datacenter info
 *
 * Usage: node scripts/generate-blocs-pages.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const CONTENT_COUNTRIES_DIR = path.join(__dirname, '..', 'content', 'countries');
const CONTENT_BLOCS_DIR = path.join(__dirname, '..', 'content', 'blocs');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function safeWrite(filePath, content) {
  fs.writeFileSync(filePath, content);
}

function generateBlocsLandingPage(blocs) {
  ensureDir(CONTENT_BLOCS_DIR);

  const indexPath = path.join(CONTENT_BLOCS_DIR, '_index.md');

  const md = `---
title: "Regional Blocs"
description: "Geopolitical and economic blocs with common data governance frameworks affecting digital sovereignty"
---

Regional blocs share common legal frameworks and data protection standards across their member countries. Understanding these blocs is essential for navigating cross-border data flows and compliance requirements.
`;

  safeWrite(indexPath, md);
  console.log(`Generated blocs landing page: content/blocs/_index.md`);
}

function main() {
  // Try new data structure first, fall back to old
  let blocs = [];
  const newBlocsPath = path.join(DATA_DIR, 'blocs', 'blocs.json');
  const oldJurisdictionsPath = path.join(DATA_DIR, 'jurisdictions.json');

  if (fs.existsSync(newBlocsPath)) {
    const blocsData = readJson(newBlocsPath);
    blocs = blocsData.itemListElement || blocsData.blocs || [];
  } else if (fs.existsSync(oldJurisdictionsPath)) {
    const jurisdictions = readJson(oldJurisdictionsPath);
    blocs = jurisdictions.blocs || [];
  }

  // Generate /blocs/ landing page
  generateBlocsLandingPage(blocs);

  // Generate individual bloc pages in /countries/
  ensureDir(CONTENT_COUNTRIES_DIR);

  let generated = 0;
  blocs.forEach((bloc) => {
    // Use slug if available, otherwise use identifier
    const slug = bloc.slug || bloc.identifier;
    if (!slug) {
      console.warn(`Skipping bloc without slug or identifier: ${JSON.stringify(bloc)}`);
      return;
    }

    const targetDir = path.join(CONTENT_COUNTRIES_DIR, slug);
    const indexPath = path.join(targetDir, 'index.md');

    ensureDir(targetDir);

    const abstract = bloc.abstract || `${bloc.name} jurisdictional bloc.`;
    const summary = bloc.summary || '';
    // Support both memberOf (new) and members (old)
    const members = bloc.memberOf || bloc.members || [];

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
members: ${JSON.stringify(members)}
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
