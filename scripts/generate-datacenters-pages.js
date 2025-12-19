#!/usr/bin/env node

/**
 * Generate /datacenters/{provider}/ pages from data/datacenters.json
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
  (bloc.inherits_from || []).forEach((parentId) => {
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
    national: region.national_laws || [],
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
  const datacenters = readJson(path.join(DATA_DIR, 'datacenters.json'));
  const providers = datacenters.providers || [];
  const regionList = readJson(path.join(DATA_DIR, 'regions.json'));
  const jurisdictions = readJson(path.join(DATA_DIR, 'jurisdictions.json'));

  const regionsById = {};
  regionList.forEach((r) => {
    regionsById[r.id] = r;
  });

  const riskLevels = jurisdictions.risk_levels || {};
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
    const vendorRisk = (vendorRegion && vendorRegion.risk_level) ? vendorRegion.risk_level : 'unknown';
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

    const groupedLocationsMd = countryGroups.map((g) => {
      const header = `### ${g.countryFlag ? g.countryFlag + ' ' : ''}${g.countryName} (${g.countryId}) — ${g.count}`;
      const lines = g.regions.map((r) => {
        const city = r.city ? ` — ${r.city}` : '';
        const rid = r.region_id ? ` (\`${r.region_id}\`)` : '';
        return `- **${r.region_name || r.region_id || 'Region'}**${city}${rid}`;
      });
      return `${header}\n\n${lines.join('\n')}`;
    }).join('\n\n');

    const locationsUpdated = p.updated || (p.meta && p.meta.updated) || (datacenters.meta && datacenters.meta.generated) || '';
    const locationsUpdatedMd = locationsUpdated
      ? `\n_Last updated: ${locationsUpdated}_\n`
      : '';

    const md =
`---
title: "${titleForProvider(p)}"
description: "Datacenter locations for ${p.provider_name}, colored by vendor jurisdiction"
layout: "simple"
echarts: true
provider_id: "${providerId}"
---

This page shows **${p.provider_name}** datacenter regions on the global map.

- **Provider HQ**: ${vendorFlag ? vendorFlag + ' ' : ''}\`${vendorCountry}\` (${vendorCountryName})
- **Jurisdiction risk**: ${vendorLawLink ? `[${riskBadge(vendorRisk, riskLevels)}](${vendorLawLink})` : riskBadge(vendorRisk, riskLevels)}
- **Jurisdiction blocs**: ${vendorBlocNames.length ? vendorBlocNames.join(', ') : '—'}
- **Regions**: ${regions.length}
- **Official site**: ${p.vendor_website ? `[${p.vendor_website}](${p.vendor_website})` : '—'}

## Map

{{< datacenter-map providers="${providerId}" showFilters="false" >}}

## Laws in provider jurisdiction

${lawsMd}

## Locations by country
${locationsUpdatedMd}
${groupedLocationsMd || '_No locations available._'}

→ [Back to all providers](/datacenters/)
`;

    fs.writeFileSync(path.join(providerDir, 'index.md'), md);
    count += 1;
  });

  console.log(`Generated ${count} provider pages in content/datacenters/{provider}/index.md`);
}

main();


