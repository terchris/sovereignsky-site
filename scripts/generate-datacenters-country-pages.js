#!/usr/bin/env node

/**
 * Generate /datacenters/{country}/ pages from data/regions.json + data/datacenters.json
 *
 * Creates one page per country that has at least one datacenter region physically located there.
 * Example: /datacenters/norway/ shows all provider regions located in Norway, with a map auto-zoomed to Norway.
 *
 * Usage: node scripts/generate-datacenters-country-pages.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const CONTENT_DC_DIR = path.join(__dirname, '..', 'content', 'datacenters');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function safeWrite(filePath, content) {
  fs.writeFileSync(filePath, content);
}

function formatTitle(country) {
  const flag = country.flag ? `${country.flag} ` : '';
  return `${flag}${country.name} Datacenters`;
}

function main() {
  const regions = readJson(path.join(DATA_DIR, 'regions.json'));
  const datacenters = readJson(path.join(DATA_DIR, 'datacenters.json'));

  const regionById = new Map(regions.map((r) => [r.id, r]));
  const providers = (datacenters.providers || []);
  const providerIds = new Set(providers.map((p) => p.provider_id).filter(Boolean));

  // Count datacenter regions by physical country, and capture provider counts per country.
  const countsByCountry = new Map(); // countryId -> count
  const providersByCountry = new Map(); // countryId -> Map(providerId -> count)

  providers.forEach((p) => {
    const pid = p.provider_id;
    (p.regions || []).forEach((r) => {
      const cid = r.country_id;
      if (!cid) return;
      countsByCountry.set(cid, (countsByCountry.get(cid) || 0) + 1);
      if (!providersByCountry.has(cid)) providersByCountry.set(cid, new Map());
      const m = providersByCountry.get(cid);
      m.set(pid, (m.get(pid) || 0) + 1);
    });
  });

  ensureDir(CONTENT_DC_DIR);

  let generated = 0;
  Array.from(countsByCountry.entries())
    .filter(([cid, count]) => count > 0 && regionById.has(cid))
    .map(([cid, count]) => {
      const meta = regionById.get(cid);
      return { cid, count, meta };
    })
    .filter((x) => x.meta && x.meta.slug) // needs slug to build URL
    .sort((a, b) => (a.meta.name || a.cid).localeCompare((b.meta.name || b.cid)))
    .forEach(({ cid, count, meta }) => {
      const slug = meta.slug;
      const targetDir = path.join(CONTENT_DC_DIR, slug);
      const indexPath = path.join(targetDir, 'index.md');

      // Avoid collisions: if someone ever adds a provider_id equal to a country slug,
      // or if a provider page already exists at that path, we don't overwrite it.
      if (providerIds.has(slug)) {
        console.warn(`Skipping /datacenters/${slug}/: conflicts with provider_id "${slug}"`);
        return;
      }
      if (fs.existsSync(indexPath)) {
        const existing = fs.readFileSync(indexPath, 'utf8');
        if (existing.includes('provider_id:')) {
          console.warn(`Skipping /datacenters/${slug}/: existing page looks like a provider page`);
          return;
        }
      }

      ensureDir(targetDir);

      const provCounts = providersByCountry.get(cid) || new Map();
      const provItems = Array.from(provCounts.entries())
        .map(([pid, c]) => {
          const p = providers.find((x) => x.provider_id === pid);
          return {
            provider_id: pid,
            provider_name: (p && p.provider_name) ? p.provider_name : pid,
            count: c
          };
        })
        .sort((a, b) => {
          if (b.count !== a.count) return b.count - a.count;
          return a.provider_name.localeCompare(b.provider_name);
        });

      const providersMd = provItems.length > 0
        ? provItems.map((p) => `- [${p.provider_name}](/datacenters/${p.provider_id}/) (${p.count})`).join('\n')
        : '_No providers found._';

      const title = formatTitle(meta);
      const description = `Datacenter regions physically located in ${meta.name}.`;

      const md = `---
title: "${title}"
description: "${description}"
echarts: true
layout: "datacenters/country"
country_id: "${cid}"
showTableOfContents: true
---

Datacenter regions physically located in **${meta.name}** across all providers.

## Map

{{< datacenter-map countries="${cid}" showFilters="false" >}}

## Providers

${providersMd}

## Laws

→ [Exposure laws for ${meta.name}](/laws/${slug}/)

→ [Back to all datacenters](/datacenters/)
`;

      safeWrite(indexPath, md);
      generated += 1;
    });

  console.log(`Generated ${generated} country datacenter pages in content/datacenters/{country}/index.md`);
}

main();


