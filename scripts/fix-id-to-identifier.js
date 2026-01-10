#!/usr/bin/env node
/**
 * Fix .id to .identifier in Hugo templates for region/bloc dict lookups
 */

const fs = require('fs');
const path = require('path');

const layoutsDir = path.join(__dirname, '..', 'layouts');

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walkDir(filepath, callback);
    } else if (file.endsWith('.html')) {
      callback(filepath);
    }
  });
}

const replacements = [
  // Hugo dict lookup patterns for regions/blocs
  ['(dict .id .)', '(dict .identifier .)'],
  ['(dict .id.)', '(dict .identifier.)'],
  // Equality checks in range contexts (region/bloc iteration)
  ['eq .id $blocId', 'eq .identifier $blocId'],
  ['eq .id $countryId', 'eq .identifier $countryId'],
  ['eq .id $jurisdictionId', 'eq .identifier $jurisdictionId'],
  ['eq .id $lawId', 'eq .identifier $lawId'],
];

let totalFiles = 0;

walkDir(layoutsDir, (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  let originalContent = content;

  for (const [from, to] of replacements) {
    content = content.split(from).join(to);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filepath, content);
    const relPath = path.relative(path.join(__dirname, '..'), filepath);
    console.log(`Updated: ${relPath}`);
    totalFiles++;
  }
});

console.log(`\nTotal files updated: ${totalFiles}`);
