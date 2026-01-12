---
title: "Norwegian Digital Sovereignty Index (NDSI)"
identifier: "ndsi"
weight: 15
date: 2024-01-01
description: "What gets measured gets managed. NDSI provides a structured framework to assess your organization's sovereignty posture, identify vulnerabilities to foreign control, and track improvement over time - aligned with EU standards and Norwegian regulations."
summary: "A community-driven framework for measuring and improving digital sovereignty readiness in Norwegian organizations"
status: "planned"
externalUrl: "https://sovereignsky.no/sovereignsky/ndsi/"
topics:
  - "digital-sovereignty"
  - "data-protection"
tags:
  - "norway"
  - "index"
  - "assessment"
  - "framework"
audience:
  - "public-sector"
  - "enterprise"
  - "it-ops"
showHero: true
heroStyle: "big"
layout: "single"
type: "sovereignsky"
---

Measure your organization's digital sovereignty readiness. Based on the EU Cloud Sovereignty Framework.

## What Is NDSI?

The Norwegian Digital Sovereignty Index is a practical framework for measuring how dependent your organization is on foreign-controlled digital infrastructure. Based on the EU Cloud Sovereignty Framework, it provides a standardized way to assess, compare, and improve your sovereignty posture.

## NDSI Levels

Organizations are scored from Level 0 to Level 4:

| Level | Name | Score | What It Means |
|-------|------|-------|---------------|
| 4 | Sovereign | 35-44 | Strong control over digital infrastructure |
| 3 | Resilient | 26-34 | Good awareness, some dependencies to address |
| 2 | Aware | 18-25 | Significant dependencies, exit strategies needed |
| 1 | Dependent | 9-17 | High foreign dependency, priority action needed |
| 0 | Unassessed | 0-8 | Critical gaps, immediate investigation required |

## Components

### [NDSI Quick Scan Survey](survey/)

11 questions covering:
- **Provider & Jurisdiction** - Who provides your cloud services? Are they subject to the US CLOUD Act?
- **Data Control** - Where is your data stored? Do you have visibility into all SaaS tools?
- **Exit Readiness** - Can you migrate away? How long would it take?
- **Operational Resilience** - Backup procedures tested? Alternative providers identified?

### [Software Risk Check](software-risk-check/)

Select the tools your organization uses and get an instant risk assessment. Each tool is scored based on:
- Provider jurisdiction and ownership
- Data location guarantees
- Exit capability and portability
- Availability of sovereign alternatives

## Dependencies

NDSI depends on the **Software Database** to provide:
- Risk scores for individual software products
- Mapping to European and open-source alternatives
- Vendor ownership and jurisdiction data

## Current Status

The framework is in planning phase. The survey and basic scoring are functional, but full integration with the Software Database for automated risk assessment is under development.
