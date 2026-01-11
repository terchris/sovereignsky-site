#!/usr/bin/env node
// Removes topics from publications that don't exist in topics.json

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

const topics = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'topics', 'topics.json'), 'utf8'));
const validTopics = new Set(topics.itemListElement.map(t => t.identifier));

const pubsPath = path.join(DATA_DIR, 'publications', 'publications.json');
const pubs = JSON.parse(fs.readFileSync(pubsPath, 'utf8'));

console.log('Valid topics:', validTopics.size);
console.log('Processing publications...\n');

let totalRemoved = 0;
pubs.forEach(pub => {
  const original = pub.topics || [];
  pub.topics = original.filter(t => validTopics.has(t));
  const removed = original.filter(t => !validTopics.has(t));
  if (removed.length) {
    console.log(`${pub.identifier}:`);
    console.log(`  Removed: ${removed.join(', ')}`);
    console.log(`  Kept: ${pub.topics.join(', ')}`);
    totalRemoved += removed.length;
  }
});

fs.writeFileSync(pubsPath, JSON.stringify(pubs, null, 2));

const uniqueTopics = [...new Set(pubs.flatMap(p => p.topics))];
console.log(`\nDone. Removed ${totalRemoved} invalid topic references.`);
console.log(`Publications now use ${uniqueTopics.length} unique valid topics.`);
