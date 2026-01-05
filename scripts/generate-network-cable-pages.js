#!/usr/bin/env node
/**
 * Generate Hugo content pages for Networks connections from JSON.
 *
 * Input:
 *  - data/networks/networks.json (connections, stations, operators)
 *  - data/networks/networks-actors.json (actor registry for names/countries/websites)
 *
 * Output:
 *  - content/networks/<connection_id>/index.md
 *
 * Safety:
 *  - By default, WILL NOT overwrite an existing file unless it already has `generated: true` in front matter.
 *  - Pass --force to overwrite everything.
 *
 * Usage:
 *  node scripts/generate-network-cable-pages.js
 *  node scripts/generate-network-cable-pages.js --force
 */

const fs = require("fs");
const path = require("path");

const ROOT = "/workspaces/sovereignsky-site";
const NETWORKS_PATH = path.join(ROOT, "data/networks/networks.json");
const ACTORS_PATH = path.join(ROOT, "data/networks/networks-actors.json");
const OUT_DIR = path.join(ROOT, "content/networks");

const args = new Set(process.argv.slice(2));
const FORCE = args.has("--force");

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function slugTag(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function yamlQuote(s) {
  // Minimal YAML quoting
  const str = String(s ?? "");
  if (/[:\n"]/g.test(str)) return JSON.stringify(str);
  return `"${str}"`;
}

function hasGeneratedFrontMatter(md) {
  // naive check: "generated: true" appears before the 2nd front matter delimiter
  const m = md.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return false;
  return /\bgenerated:\s*true\b/.test(m[1]);
}

function formatAttrRow(name, value) {
  return `| **${name}** | ${value || "—"} |`;
}

function actorDisplay(actorId, actorById) {
  const a = actorById[actorId];
  if (!a) return actorId;
  return a.actor_name + (a.country_id ? ` (${a.country_id})` : "");
}

function operatorDisplay(operatorId, operatorById, actorById) {
  const op = operatorById[operatorId];
  if (!op) return operatorId;
  if (op.actor_id) return actorDisplay(op.actor_id, actorById);
  return op.operator_name || operatorId;
}

function main() {
  const networks = readJson(NETWORKS_PATH);
  const actorsData = readJson(ACTORS_PATH);

  const placesData = readJson(path.join(ROOT, "data/networks/networks-places.json"));
  const places = placesData.places || [];
  const operators = networks.operators || [];
  const connections = networks.connections || [];
  const actors = actorsData.actors || [];

  const placeById = Object.fromEntries(
    places.filter((p) => p && p.identifier).map((p) => [p.identifier, p])
  );
  const operatorById = Object.fromEntries(
    operators.filter((o) => o && o.operator_id).map((o) => [o.operator_id, o])
  );
  const actorById = Object.fromEntries(
    actors.filter((a) => a && a.actor_id).map((a) => [a.actor_id, a])
  );

  fs.mkdirSync(OUT_DIR, { recursive: true });

  let wrote = 0;
  let skipped = 0;

  for (const c of connections) {
    if (!c || !c.connection_id) continue;
    const id = c.connection_id;
    if (id === "_index") continue;
    const title = c.connection_name || id;
    const description = c.description || "";

    const outPath = path.join(OUT_DIR, id, "index.md");
    fs.mkdirSync(path.dirname(outPath), { recursive: true });

    if (fs.existsSync(outPath) && !FORCE) {
      const existing = fs.readFileSync(outPath, "utf8");
      if (!hasGeneratedFrontMatter(existing)) {
        skipped += 1;
        continue;
      }
    }

    const status = c.status || "active";
    const tags = [
      slugTag(c.type),
      slugTag(c.scope),
      slugTag(c.medium),
      slugTag(status),
      slugTag(c.map_category),
      ...(c.operator_ids || []).map(slugTag),
    ].filter(Boolean);

    const endpoints = (c.endpoint_place_ids || []).map((pid) => (placeById[pid]?.name || pid));
    const owners = (c.owner_actor_ids || []).map((aid) => actorDisplay(aid, actorById));
    const ops = (c.operator_ids || []).map((oid) => operatorDisplay(oid, operatorById, actorById));

    const sources = Array.isArray(c.sources) ? c.sources : [];

    const routeLine = endpoints.length ? endpoints.join(" → ") : "—";
    const hasRoute = Array.isArray(c.route) && c.route.length >= 2;

    const md = [
      "---",
      `title: ${yamlQuote(title)}`,
      `description: ${yamlQuote(description)}`,
      `generated: true`,
      `generated_from: ${yamlQuote("data/networks/networks.json")}`,
      `connection_id: ${yamlQuote(id)}`,
      `echarts: true`,
      `tags: [${tags.map((t) => JSON.stringify(t)).join(", ")}]`,
      "---",
      "",
      "## Overview",
      "",
      description ? description : "_No summary yet (generated from dataset)._",
      "",
      "## Route",
      "",
      `**Endpoints:** ${routeLine}`,
      "",
      "{{< network-connection-map connection_id=\"" + id + "\" >}}",
      "",
      hasRoute ? "_Schematic polyline is available for map rendering._" : "_Route is auto-generated for visualization from endpoints (schematic)._",
      "",
      "## Attributes",
      "",
      "| Attribute | Value |",
      "|-----------|-------|",
      formatAttrRow("Status", status),
      formatAttrRow("Scope", c.scope),
      formatAttrRow("Medium", c.medium),
      formatAttrRow("Type", c.type),
      formatAttrRow("Category", c.map_category),
      c.rfs ? formatAttrRow("Ready for Service", c.rfs_detail || c.rfs) : formatAttrRow("Ready for Service", ""),
      c.length_km ? formatAttrRow("Length", `${c.length_km} km`) : formatAttrRow("Length", ""),
      c.fiber_pairs ? formatAttrRow("Fiber pairs", c.fiber_pairs) : null,
      c.capacity_tbps ? formatAttrRow("Capacity", `${c.capacity_tbps} Tbps`) : null,
      "",
      "## Operators",
      "",
      ops.length ? ops.map((x) => `- ${x}`).join("\n") : "—",
      "",
      "## Owners",
      "",
      owners.length ? owners.map((x) => `- ${x}`).join("\n") : "—",
      "",
      c.url ? "## Links\n" : "## Links\n",
      ...(c.url ? [`- ${c.url}`] : []),
      ...sources.map((s) => {
        if (!s || !s.url) return null;
        return `- ${s.title ? `${s.title}: ` : ""}${s.url}`;
      }).filter(Boolean),
      "",
    ]
      .filter((x) => x !== null)
      .join("\n");

    fs.writeFileSync(outPath, md, "utf8");
    wrote += 1;
  }

  console.log(`Generated pages: wrote=${wrote} skipped=${skipped} force=${FORCE}`);
}

main();


