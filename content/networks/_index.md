---
title: "Networks"
description: "Cables in and out of Norway — and the domestic routes we can document from public sources"
echarts: true
layout: "simple"
---

Norway’s digital connectivity depends on a limited set of **subsea fibre systems**, **landing areas**, and **domestic backhaul routes**. This page is an attempt to map *what can be mapped from public sources*—with clear limits on completeness and precision.

**Important:** there is **no single official public map** of all network connections in and out of Norway. For security and commercial reasons, the exact routes of many terrestrial backbones (and detailed seabed routes) are not public.

## Network Map

{{< network-map showSimulation="true" >}}

### What this map is (and is not)

- **What it is**: a **schematic** map showing publicly documented cable systems and approximate landing areas, plus a few major domestic backbone endpoints (where public).
- **What it is not**: an authoritative engineering map. **Do not** use this map for navigation, safety, or operational/security decisions.

## Key Infrastructure Categories

{{< network-data >}}

---

## What we can (and can’t) map from open sources

- **We can map well**:
  - Named cable systems and their endpoints/landing areas (from operator pages and public reporting).
  - Domestic *access coverage* (Nkom coverage maps) to show dependency patterns by municipality/household.
- **We cannot map completely**:
  - Exact terrestrial backbone routes across Norway (often not publicly disclosed).
  - Exact seabed cable routing and protection details (sensitive and not consistently public).

---

## Vulnerability (high-level)

### High risk areas

1. **Arctic Connectivity** - Single aging cable to Svalbard until 2028
2. **Geographic Concentration** - Major landing stations clustered in southern Norway (Kristiansand, Stavanger, Lista)

### Medium risk areas

1. **Transatlantic Routes** - Limited diversity, both via Bulk infrastructure
2. **Oslo Fjord** - Geographic funnel for coastal traffic

### Lower risk areas

1. **UK Connectivity** - Multiple independent routes
2. **Denmark/EU Routes** - Good diversity via multiple operators

---

## Data Sources

This page and map are built from public sources (documentation pages and official references), including:

- [Submarine Networks](https://www.submarinenetworks.com/) — system pages (HAVSIL, NO-UK, IOEMA, Celtic Norse, N0r5ke Viking)
- [Bulk Infrastructure](https://bulkinfrastructure.com/fiber-networks/our-systems) — operator documentation
- [Space Norway](https://spacenorway.com/projects/our-projects/subsea-cables/) — Arctic infrastructure
- [Tampnet](https://www.tampnet.com/norfest) — coastal/offshore networks
- [Nkom](https://dekningskart.nkom.no) — official broadband coverage maps (access networks)

---

## Related Resources

- [Nkom Coverage Maps](https://dekningskart.nkom.no) - Official broadband coverage data
- [Datacenters](/datacenters/) - Cloud datacenter locations in Norway
- [Jurisdictions](/jurisdictions/) - Understanding data jurisdiction
