#!/usr/bin/env node
/**
 * Generate Hugo content pages for Networks connections from JSON.
 *
 * Input:
 *  - data/networks/networks.json (connections)
 *
 * Output:
 *  - content/networks/<identifier>/index.md
 *
 * Behavior:
 *  - Creates minimal frontmatter pages
 *  - All content is rendered from JSON data by the template
 *
 * Usage:
 *  node scripts/generate-network-pages.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const NETWORKS_PATH = path.join(ROOT, "data/networks/networks.json");
const OUT_DIR = path.join(ROOT, "content/networks");

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function yamlQuote(s) {
  const str = String(s ?? "");
  if (/[:\n"]/g.test(str)) return JSON.stringify(str);
  return `"${str}"`;
}

// Build frontmatter from connection data
function buildFrontmatter(c) {
  const title = c.name || c.identifier;
  const description = c.description || "";
  const tags = Array.isArray(c.tags) ? c.tags : [];
  const topics = Array.isArray(c.topics) ? c.topics : [];

  const lines = [
    `title: ${yamlQuote(title)}`,
    `identifier: ${yamlQuote(c.identifier)}`,
    `description: ${yamlQuote(description)}`,
    `echarts: true`,
    `layout: "single"`,
    `type: "networks"`,
  ];

  if (tags.length > 0) {
    lines.push(`tags: [${tags.map((t) => JSON.stringify(t)).join(", ")}]`);
  }

  if (topics.length > 0) {
    lines.push(`topics: [${topics.map((t) => JSON.stringify(t)).join(", ")}]`);
  }

  return lines.join("\n");
}

function createIndexPage() {
  const indexPath = path.join(OUT_DIR, "_index.md");
  const content = `---
title: "Networks"
description: "Submarine cables, terrestrial fibre, and network infrastructure connecting Norway to the world"
echarts: true
---

{{< network-map >}}

{{< network-data >}}
`;
  fs.writeFileSync(indexPath, content, "utf8");
  return fs.existsSync(indexPath);
}

function main() {
  console.log("Generating /networks/ pages from JSON data...\n");

  const networks = readJson(NETWORKS_PATH);
  const connections = Array.isArray(networks) ? networks : [];

  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Create the list page (_index.md)
  createIndexPage();
  console.log("Created: _index.md (list page)");

  let created = 0;
  let updated = 0;

  for (const c of connections) {
    if (!c || !c.identifier) continue;
    const id = c.identifier;
    if (id === "_index") continue;

    const outPath = path.join(OUT_DIR, id, "index.md");
    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    const exists = fs.existsSync(outPath);
    if (exists) {
      updated++;
    } else {
      created++;
    }

    const frontmatter = buildFrontmatter(c);
    const content = `---
${frontmatter}
---
`;

    fs.writeFileSync(outPath, content, "utf8");
  }

  console.log(`Created: ${created} new pages`);
  console.log(`Updated: ${updated} existing pages`);
  console.log(`Total: ${connections.length} connections in /networks/{id}/index.md`);
}

main();
