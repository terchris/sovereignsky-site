---
title: "Software Database"
identifier: "software-database"
weight: 10
date: 2024-12-01
description: "Every foreign SaaS tool is a potential backdoor for extraterritorial data access. This database helps organizations identify European and open-source alternatives to reduce dependency on US Cloud Act-subject vendors and maintain data sovereignty."
summary: "4,400+ software products categorized, validated, and mapped with sovereign alternatives"
status: "active"
repository: "https://github.com/terchris/software-scrape"
externalUrl: "https://sovereignsky.no/software/"
topics:
  - "digital-sovereignty"
  - "data-protection"
tags:
  - "software"
  - "alternatives"
  - "open-source"
  - "european"
  - "catalog"
audience:
  - "developer"
  - "public-sector"
  - "it-ops"
  - "enterprise"
  - "humanitarian"
showHero: true
heroStyle: "big"
layout: "single"
type: "sovereignsky"
---

Find replacements for foreign-controlled tools. European and open-source alternatives mapped to common proprietary tools.

## What It Does

The Software Database aggregates software from multiple government-vetted and expert-curated catalogs into a unified, searchable catalog. Each product is deduplicated, categorized across four taxonomies, and enriched with vendor information, alternatives mappings, and sovereignty assessments.

## Data Sources

We prioritize government-vetted catalogs for quality and legal compliance:

| Source | Products | Publisher | Trust Level |
|--------|----------|-----------|-------------|
| SILL France | 626 | DINUM - French Government | Government-vetted |
| CNCF Cloud Native Landscape | 1,358 | Cloud Native Computing Foundation | Foundation-backed |
| Euro Stack | 1,103 | Abilian SAS / EuroStack Initiative (FR) | Expert-curated |
| OpenAlternative | 649 | OpenAlternative | Community-curated |
| Cloud Service Map | 582 | Google Cloud | Expert-curated |
| switching.software | 130 | Datenpunks (DE) | Expert-curated |

### Planned Sources

| Source | Publisher | Trust Level |
|--------|-----------|-------------|
| openCode / ZenDiS | German Government (ZenDiS) | Government-vetted |
| Developers Italia | Italian Government | Government-vetted |
| EU OSS Catalogue | European Commission | Government-vetted |

## The Challenges

### Deduplication: One Product, Many Identities

The same software appears across catalogs with different identifiers. For example, Ansible appears as `ansible`, `red-hat-ansible`, and `ansible-automation-platform` depending on the source. We maintain a canonical registry with 942 product mappings that resolve duplicates across the 4,400+ raw entries from all sources.

### Category Harmonization

Each catalog uses its own category system - CNCF uses technical hierarchies, SILL France uses publiccode.yml categories, Euro-Stack uses business focus. We map all source categories to four standardized taxonomies:

- **Technical** (43 categories): Infrastructure capabilities
- **Developer** (26 categories): Development tools and frameworks
- **Business** (28 categories): Use cases and departments
- **Platforms** (8 categories): Operating systems and clouds

This requires 10,415+ lines of category mappings.

### Data Enrichment

Raw catalog data lacks context. We enrich products using Wikidata for vendor information (headquarters, founding date) and web search to validate descriptions and find missing homepages.

## Goal: Fully Automated Pipeline

The target is a weekly automated pipeline that scrapes all sources, auto-suggests canonical ID mappings using fuzzy matching, and publishes the updated catalog - flagging conflicts for human review without blocking the pipeline.
