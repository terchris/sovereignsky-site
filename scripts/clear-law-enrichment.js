#!/usr/bin/env node
/**
 * Clear enrichment fields from data/laws.json.
 *
 * Use this when you do NOT want to ship potentially unverified text.
 * It removes the optional enrichment fields so only the core, existing fields remain.
 *
 * Usage:
 *   node scripts/clear-law-enrichment.js
 */

const fs = require('fs');
const path = require('path');

const LAWS_PATH = path.join(__dirname, '..', 'data', 'laws.json');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
}

function main() {
  const data = readJson(LAWS_PATH);
  const laws = data.laws || [];

  const fieldsToRemove = [
    'review_status',
    'what_it_does',
    'who_it_applies_to',
    'key_provisions',
    'compliance_actions',
    'enforcement'
  ];

  let changed = 0;
  laws.forEach(law => {
    let did = false;
    fieldsToRemove.forEach(f => {
      if (Object.prototype.hasOwnProperty.call(law, f)) {
        delete law[f];
        did = true;
      }
    });
    if (did) changed += 1;
  });

  writeJson(LAWS_PATH, data);
  console.log(`Cleared enrichment fields on ${changed}/${laws.length} laws.`);
}

main();


