---
title: "Bifrost"
description: "Application portfolio management - track all applications in your organization and their integrations"
date: 2024-01-01
status: "active"
topics:
  - "critical-infrastructure"
tags:
  - "application-portfolio"
  - "integration"
  - "cmdb"
  - "documentation"
  - "visualization"
showHero: true
heroStyle: "big"
cascade:
  showTableOfContents: true
  showDate: false
  showAuthor: false
---

System for keeping track of applications in an organization and all integrations between them. Visualize dependencies, automate documentation, and understand your IT landscape.

## Features

- **Application Registry** - Catalog all applications in your organization
- **Integration Mapping** - Track connections and data flows between systems
- **Dependency Visualization** - Force-directed graphs showing relationships
- **Documentation Generation** - Auto-generate wiki and PDF catalogs
- **Import/Export** - Bulk import from Excel, ServiceNow integration

## Technical Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 14 (App Router) |
| Backend | Strapi CMS |
| API | TypeScript |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Deployment | Kubernetes, Docker |
