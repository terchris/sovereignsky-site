#!/usr/bin/env node
/**
 * Generate Hugo content pages for Networks connections from JSON.
 *
 * Input:
 *  - data/networks/networks.json (connections)
 *  - data/networks/networks-actors.json (actor registry)
 *  - data/networks/networks-places.json (place registry)
 *
 * Output:
 *  - content/networks/<connection_id>/index.md
 *
 * Behavior:
 *  - Always updates frontmatter from JSON data
 *  - Preserves custom body content if it exists
 *  - Creates default body for new pages
 *
 * Usage:
 *  node scripts/generate-network-pages.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const NETWORKS_PATH = path.join(ROOT, "data/networks/networks.json");
const ACTORS_PATH = path.join(ROOT, "data/networks/networks-actors.json");
const PLACES_PATH = path.join(ROOT, "data/networks/networks-places.json");
const OUT_DIR = path.join(ROOT, "content/networks");

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

// Parse existing markdown to extract frontmatter and body
function parseMarkdown(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (match) {
    return {
      frontmatter: match[1],
      body: match[2].trim()
    };
  }
  return { frontmatter: '', body: content.trim() };
}

function yamlQuote(s) {
  const str = String(s ?? "");
  if (/[:\n"]/g.test(str)) return JSON.stringify(str);
  return `"${str}"`;
}

function iso2FlagEmoji(code) {
  const c = String(code || "").trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(c)) return "";
  const A = 0x1f1e6;
  return String.fromCodePoint(A + (c.charCodeAt(0) - 65), A + (c.charCodeAt(1) - 65));
}

function formatAttrRow(name, value) {
  return `| **${name}** | ${value || "—"} |`;
}

function actorDisplay(actorId, actorById) {
  const a = actorById[actorId];
  if (!a) return actorId;
  return a.actor_name + (a.country_id ? ` (${a.country_id})` : "");
}

// Build frontmatter from connection data
function buildFrontmatter(c, tags) {
  const title = c.connection_name || c.connection_id;
  const description = c.description || "";

  const lines = [
    `title: ${yamlQuote(title)}`,
    `description: ${yamlQuote(description)}`,
    `connection_id: ${yamlQuote(c.connection_id)}`,
    `echarts: true`,
  ];

  if (tags.length > 0) {
    lines.push(`tags: [${tags.map((t) => JSON.stringify(t)).join(", ")}]`);
  }

  return lines.join("\n");
}

// Build default body content for new pages
function buildDefaultBody(c, placeById, actorById) {
  const description = c.description || "";
  const status = c.status || "active";
  const sources = Array.isArray(c.sources) ? c.sources : [];
  const hasRoute = Array.isArray(c.route) && c.route.length >= 2;

  const endpoints = (c.endpoint_place_ids || []).map((pid) => {
    const p = placeById[pid];
    if (!p) return pid;
    const flag = iso2FlagEmoji(p.country_id || p.address?.addressCountry);
    return `${flag ? `${flag} ` : ""}${p.name || pid}`;
  });
  const routeLine = endpoints.length ? endpoints.join(" → ") : "—";

  const lines = [
    "## Overview",
    "",
    description ? description : "_No summary yet._",
    "",
    "## Route",
    "",
    `**Endpoints:** ${routeLine}`,
    "",
    `{{< network-connection-map connection_id="${c.connection_id}" >}}`,
    "",
    hasRoute ? "_Schematic polyline is available for map rendering._" : "_Route is auto-generated for visualization from endpoints (schematic)._",
    "",
    "## Attributes",
    "",
    "| Attribute | Value |",
    "|-----------|-------|",
    formatAttrRow("Status", status),
    formatAttrRow("Scope", c.scope),
    formatAttrRow("Type", c.type),
    c.rfs ? formatAttrRow("Operational", c.rfs) : null,
    c.length_km ? formatAttrRow("Length", `${c.length_km} km`) : null,
    "",
    "## Owners & Operators",
    "",
    `{{< network-actors connection_id="${c.connection_id}" >}}`,
    "",
    "## Links",
    "",
    ...sources
      .filter((s) => s && s.url)
      .map((s) => {
        const title = s.title || new URL(s.url).hostname.replace(/^www\./, "");
        return `- [${title}](${s.url})`;
      }),
    "",
  ];

  return lines.filter((x) => x !== null).join("\n");
}

// Check if body content is custom (not the default generated content)
function isCustomBody(body) {
  if (!body) return false;
  // If it doesn't start with default structure, it's custom
  if (!body.startsWith("## Overview")) return true;
  // If it doesn't contain the "No summary yet" marker, someone edited it
  if (!body.includes("_No summary yet._")) return true;
  return false;
}

function main() {
  console.log("Generating /networks/ pages from JSON data...\n");

  const networks = readJson(NETWORKS_PATH);
  const actorsData = readJson(ACTORS_PATH);
  const places = readJson(PLACES_PATH);

  const connections = Array.isArray(networks) ? networks : [];
  const actors = Array.isArray(actorsData) ? actorsData : [];

  const placeById = Object.fromEntries(
    places.filter((p) => p && p.identifier).map((p) => [p.identifier, p])
  );
  const actorById = Object.fromEntries(
    actors.filter((a) => a && a.actor_id).map((a) => [a.actor_id, a])
  );

  fs.mkdirSync(OUT_DIR, { recursive: true });

  let created = 0;
  let updated = 0;

  for (const c of connections) {
    if (!c || !c.connection_id) continue;
    const id = c.connection_id;
    if (id === "_index") continue;

    const outPath = path.join(OUT_DIR, id, "index.md");
    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    const tags = Array.isArray(c.tags) ? c.tags : [];
    let body = buildDefaultBody(c, placeById, actorById);

    // Check if file exists and has custom content
    if (fs.existsSync(outPath)) {
      const existing = fs.readFileSync(outPath, "utf8");
      const parsed = parseMarkdown(existing);

      // If there's custom body content, preserve it
      if (isCustomBody(parsed.body)) {
        body = parsed.body;
      }
      updated++;
    } else {
      created++;
    }

    const frontmatter = buildFrontmatter(c, tags);
    const content = `---
${frontmatter}
---

${body}
`;

    fs.writeFileSync(outPath, content, "utf8");
  }

  console.log(`Created: ${created} new pages`);
  console.log(`Updated: ${updated} existing pages`);
  console.log(`Total: ${connections.length} connections in /networks/{id}/index.md`);
}

main();
