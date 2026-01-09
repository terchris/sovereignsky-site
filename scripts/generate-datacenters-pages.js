#!/usr/bin/env node

/**
 * Generate /datacenters/{provider}/ pages from data/datacenters/providers.json
 *
 * This script generates:
 * - content/datacenters/{provider_id}/index.md for each provider (e.g., /datacenters/aws/, /datacenters/azure/)
 *
 * Usage: node scripts/generate-datacenters-pages.js
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'datacenters');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function escapeHtml(input) {
  return (input ?? '').toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(input) {
  // escapeHtml already escapes quotes; keep alias for readability at callsites
  return escapeHtml(input);
}

function titleForProvider(p) {
  return `${p.provider_name} Datacenters`;
}

function riskBadge(vendorRisk, riskLevels) {
  const emoji = {
    low: '✅',
    moderate: '⚠️',
    elevated: '🔶',
    high: '🚨',
    sanctioned: '⛔',
    unknown: '❓'
  }[vendorRisk] || '';
  const def = riskLevels && riskLevels[vendorRisk];
  const label = (def && def.label) ? def.label : (vendorRisk || 'unknown');
  return `${emoji ? emoji + ' ' : ''}${label}`;
}

function getSeverityBadge(severity) {
  const badges = {
    protective: '🛡️ Protective',
    neutral: '⚖️ Neutral',
    medium: '⚠️ Medium Concern',
    high: '🚨 High Concern'
  };
  return badges[severity] || severity || 'unknown';
}

function buildBlocsById(jurisdictions) {
  const blocsById = {};
  (jurisdictions.blocs || []).forEach((bloc) => {
    blocsById[bloc.id] = bloc;
  });
  return blocsById;
}

function getInheritedLaws(bloc, blocsById, visited = new Set()) {
  if (!bloc || visited.has(bloc.id)) return [];
  visited.add(bloc.id);

  let laws = [];
  (bloc.inheritsFrom || []).forEach((parentId) => {
    const parent = blocsById[parentId];
    if (!parent) return;
    if (parent.laws) {
      laws = laws.concat(parent.laws.map((law) => ({
        ...law,
        source_bloc: parent.name,
        source_bloc_id: parent.id
      })));
    }
    laws = laws.concat(getInheritedLaws(parent, blocsById, visited));
  });
  return laws;
}

function getCountryLaws(region, blocsById) {
  const result = {
    national: region.nationalLaws || [],
    bloc_laws: [],
    inherited_laws: []
  };
  (region.blocs || []).forEach((blocId) => {
    const bloc = blocsById[blocId];
    if (!bloc) return;
    if (bloc.laws) {
      bloc.laws.forEach((law) => {
        result.bloc_laws.push({
          ...law,
          source_bloc: bloc.name,
          source_bloc_id: bloc.id
        });
      });
    }
    result.inherited_laws = result.inherited_laws.concat(getInheritedLaws(bloc, blocsById));
  });
  return result;
}

function formatLawMd(law, showSourceBloc = false) {
  const source = (law.url) ? `- **Source:** [Read the law](${law.url})\n` : '';
  const via = (showSourceBloc && law.source_bloc && law.source_bloc_id)
    ? `- **Applies via:** [${law.source_bloc}](/laws/${law.source_bloc_id}/)\n`
    : '';
  return [
    `### ${law.name} (${law.year})`,
    '',
    `**${law.full_name}**`,
    '',
    `${law.summary}`,
    '',
    `- **Severity:** ${getSeverityBadge(law.severity)}`,
    via + source,
    '---',
    ''
  ].join('\n');
}

function groupRegionsByCountry(regions) {
  const byCountry = new Map();
  (regions || []).forEach((r) => {
    const cid = r.country_id || '??';
    if (!byCountry.has(cid)) byCountry.set(cid, []);
    byCountry.get(cid).push(r);
  });
  return byCountry;
}

function main() {
  const providers = readJson(path.join(DATA_DIR, 'datacenters', 'providers.json'));
  const regionList = readJson(path.join(DATA_DIR, 'regions.json'));
  const jurisdictions = readJson(path.join(DATA_DIR, 'jurisdictions.json'));

  const regionsById = {};
  regionList.forEach((r) => {
    regionsById[r.id] = r;
  });

  const riskLevels = jurisdictions.riskLevels || {};
  const blocsById = buildBlocsById(jurisdictions);

  ensureDir(CONTENT_DIR);

  let count = 0;
  providers.forEach((p) => {
    const providerId = p.provider_id;
    if (!providerId) return;

    const providerDir = path.join(CONTENT_DIR, providerId);
    ensureDir(providerDir);

    const regions = p.regions || [];
    const vendorCountry = p.vendor_country_id || 'Unknown';
    const vendorRegion = regionsById[vendorCountry];
    const vendorRisk = (vendorRegion && vendorRegion.riskLevel) ? vendorRegion.riskLevel : 'unknown';
    const vendorCountryName = (vendorRegion && vendorRegion.name) ? vendorRegion.name : vendorCountry;
    const vendorFlag = (vendorRegion && vendorRegion.flag) ? vendorRegion.flag : '';
    const vendorLawSlug = (vendorRegion && vendorRegion.slug) ? vendorRegion.slug : null;
    const vendorLawLink = vendorLawSlug ? `/laws/${vendorLawSlug}/` : null;

    const vendorBlocs = (vendorRegion && vendorRegion.blocs) ? vendorRegion.blocs : [];
    const vendorBlocNames = vendorBlocs
      .map((id) => blocsById[id] ? blocsById[id].name : id)
      .filter(Boolean);

    const laws = vendorRegion ? getCountryLaws(vendorRegion, blocsById) : { national: [], bloc_laws: [], inherited_laws: [] };
    const lawsMdParts = [];
    if (laws.national && laws.national.length > 0) {
      lawsMdParts.push('### National laws');
      lawsMdParts.push('');
      laws.national.forEach((law) => lawsMdParts.push(formatLawMd(law, false)));
    }
    if (laws.bloc_laws && laws.bloc_laws.length > 0) {
      lawsMdParts.push('### Bloc laws');
      lawsMdParts.push('');
      laws.bloc_laws.forEach((law) => lawsMdParts.push(formatLawMd(law, true)));
    }
    if (laws.inherited_laws && laws.inherited_laws.length > 0) {
      lawsMdParts.push('### Inherited laws');
      lawsMdParts.push('');
      laws.inherited_laws.forEach((law) => lawsMdParts.push(formatLawMd(law, true)));
    }
    const lawsMd = lawsMdParts.length > 0
      ? lawsMdParts.join('\n')
      : '_No laws are listed for this jurisdiction yet._\n';

    // Build locations list grouped by physical country.
    const byCountry = groupRegionsByCountry(regions);
    const countryGroups = Array.from(byCountry.entries()).map(([countryId, items]) => {
      const cr = regionsById[countryId];
      return {
        countryId,
        countryName: (cr && cr.name) ? cr.name : countryId,
        countryFlag: (cr && cr.flag) ? cr.flag : '',
        count: items.length,
        regions: items.slice().sort((a, b) => (a.region_name || '').localeCompare(b.region_name || ''))
      };
    }).sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.countryName.localeCompare(b.countryName);
    });

    const locationsUpdated = p.updated || (p.meta && p.meta.updated) || '';
    const locationsUpdatedMd = locationsUpdated
      ? `\n_Last updated: ${locationsUpdated}_\n`
      : '';

    const lawCount =
      (laws.national ? laws.national.length : 0) +
      (laws.bloc_laws ? laws.bloc_laws.length : 0) +
      (laws.inherited_laws ? laws.inherited_laws.length : 0);

    const filterUiHtml = `
<div class="not-prose mt-3 mb-2">
  <div class="flex flex-wrap gap-2 items-center">
    <input class="ss-dc-loc-filter-input w-full sm:w-auto px-3 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
           type="search"
           placeholder="Filter locations (country, city, region id)…" />
    <button type="button" class="ss-dc-loc-filter-clear px-3 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm">
      Clear
    </button>
  </div>
  <div class="mt-2 flex flex-wrap gap-2 items-center">
    <span class="text-xs text-neutral-500 dark:text-neutral-400">Quick:</span>
    <button type="button" data-ss-dc-set="euEea" class="px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm">EU/EEA</button>
    <button type="button" data-ss-dc-set="nordics" class="px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm">Nordics</button>
    <button type="button" data-ss-dc-set="us" class="px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm">US</button>
    <button type="button" data-ss-dc-set="apac" class="px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm">APAC</button>
  </div>
</div>
`.trim();

    const groupedLocationsMd = countryGroups.map((g) => {
      const safeName = escapeHtml(g.countryName || g.countryId || '');
      const summary = `${g.countryFlag ? g.countryFlag + ' ' : ''}${safeName} (${g.countryId}) — ${g.count}`;
      const chips = g.regions.map((r) => {
        const regionLabel = r.region_name || r.region_id || 'Region';
        const cityText = r.city ? `— ${r.city}` : '';
        const idText = r.region_id ? `(${r.region_id})` : '';
        const search = `${g.countryName} ${g.countryId} ${regionLabel} ${r.region_id || ''} ${r.city || ''}`.toLowerCase();
        return `<span class="ss-dc-region-chip inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
  data-country-id="${g.countryId}"
  data-search="${escapeAttr(search)}">
  <span class="font-medium">${escapeHtml(regionLabel)}</span>
  <span class="text-neutral-500 dark:text-neutral-400">${escapeHtml(cityText)}${idText ? ` <span class="text-neutral-400 dark:text-neutral-500">${escapeHtml(idText)}</span>` : ''}</span>
</span>`;
      }).join('\n');

      return `
<div class="ss-dc-country-group not-prose">
  <details class="mt-3">
    <summary class="cursor-pointer font-semibold text-neutral-800 dark:text-neutral-100">${summary}</summary>
    <div class="mt-2 flex flex-wrap gap-2">
      ${chips || '<span class="text-sm text-neutral-500 dark:text-neutral-400">No locations.</span>'}
    </div>
  </details>
</div>
`.trim();
    }).join('\n\n');

    const md =
`---
title: "${titleForProvider(p)}"
description: "Datacenter locations for ${p.provider_name}, colored by vendor jurisdiction"
echarts: true
provider_id: "${providerId}"
showTableOfContents: true
---

## Provider

{{< datacenter-provider-summary >}}

## Risk Assessment: ${vendorFlag ? `${vendorFlag} ` : ''}${vendorCountryName}

{{< datacenter-risk-assessment >}}

## Map

{{< datacenter-map providers="${providerId}" showFilters="false" >}}

## Laws in provider jurisdiction

<details class="not-prose mt-2">
  <summary class="cursor-pointer font-semibold">Show laws (${lawCount || 0})</summary>
  <div class="prose dark:prose-invert mt-3">

${lawsMd}

  </div>
</details>

## Locations by country
${locationsUpdatedMd}
${filterUiHtml}
${groupedLocationsMd || '_No locations available._'}

→ [Back to all providers](/datacenters/)
`;

    fs.writeFileSync(path.join(providerDir, 'index.md'), md);
    count += 1;
  });

  console.log(`Generated ${count} provider pages in content/datacenters/{provider}/index.md`);
}

main();


