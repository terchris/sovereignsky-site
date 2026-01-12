---
title: "Bifrost"
identifier: "bifrost"
weight: 35
date: 2024-01-01
description: "You cannot secure what you cannot see. Bifrost maps your entire application landscape and data flows, revealing hidden dependencies on foreign services - the essential first step in any sovereignty assessment or migration planning."
summary: "Gain full visibility into your organization's application landscape, integrations, and ownership"
status: "active"
repository: "https://github.com/terchris/bifrost"
externalUrl: "https://github.com/terchris/bifrost"
topics:
  - "critical-infrastructure"
tags:
  - "application-portfolio"
  - "integration"
  - "cmdb"
  - "documentation"
  - "visualization"
audience:
  - "developer"
  - "it-ops"
showHero: true
heroStyle: "big"
layout: "single"
type: "sovereignsky"
---

A Configuration Management Database (CMDB) designed to map, document, and govern how applications, APIs, data flows, and stakeholders connect across an organization.

## What Is Bifrost?

Bifrost provides a structured, authoritative view of the IT landscape—combining technical dependencies with clear accountability and ownership.

> **What sets this CMDB apart:** Unlike traditional CMDBs that focus primarily on infrastructure, Bifrost treats applications, APIs, integrations, and stakeholders as equal first-class entities—each with unique identities, ownership, and lifecycle management.

## Application Registry

At its core, Bifrost maintains a comprehensive application registry where each application is assigned a unique, persistent identifier and enriched with business, technical, and operational metadata. Applications are linked to business owners, technical owners, and other stakeholders, ensuring that responsibility is explicit rather than implicit.

Stakeholders are mapped to real identities through integration with Microsoft Entra ID, enabling accurate ownership, role-based access, and traceability over time—even as personnel change.

## Integrations & APIs as First-Class Items

Beyond applications, Bifrost models integrations and APIs as first-class configuration items. Every integration and API is assigned a unique integration identifier (INT number) and documented with:

- Purpose and direction
- Data classification
- Lifecycle status
- Independent stakeholders and owners

APIs can have their own stakeholders and owners, independent of the applications they connect, reflecting real-world responsibility for interface contracts, security, and availability.

## Dependency Visualization

Using interactive dependency and integration visualizations, Bifrost shows:

- How applications and APIs are interconnected
- Which systems depend on which interfaces
- Where critical business processes are exposed to risk

This enables accurate impact analysis, supports change management, and reduces uncertainty during incidents or modernization efforts.

## Automation & Integration

To reduce manual effort and ensure adoption, Bifrost supports:

- **Bulk Import** - Synchronization with Excel and ServiceNow
- **Documentation Generation** - Auto-generate wikis and PDF catalogs
- **Living Source of Truth** - Continuously updated model rather than static inventory

## Technical Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 14 (App Router) |
| Backend | Strapi CMS |
| API | TypeScript |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Deployment | Kubernetes, Docker |
