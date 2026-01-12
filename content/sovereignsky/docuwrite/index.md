---
title: "DocuWrite"
identifier: "docuwrite"
weight: 45
date: 2024-01-01
description: "Cloud document services scan your content and may share data with foreign authorities. DocuWrite runs entirely locally, ensuring sensitive documentation never leaves your infrastructure - critical for classified, legal, or confidential materials."
summary: "Swiss army knife for converting Markdown to professional PDFs, Word documents, and presentations"
status: "active"
repository: "https://github.com/terchris/docuwrite-base"
externalUrl: "https://github.com/terchris/docuwrite-base"
topics:
  - "critical-infrastructure"
tags:
  - "documentation"
  - "markdown"
  - "pdf"
  - "pandoc"
  - "mermaid"
  - "presentations"
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

Generate professional documentation from Markdown files and Azure DevOps Wikis. Containerized toolbox combining Pandoc, Mermaid, and Marp for cross-platform document generation.

## The Problem It Solves

Outdated documentation that stakeholders can't access. DocuWrite creates snapshot PDFs from your Wiki that everyone can share - same version, same meeting, delete after.

## Output Features

- Professional table of contents
- Numbered pages with generation timestamp
- Fully searchable PDF
- Auto-generated TODO list appendix
- Figures appendix
- Mermaid diagram support

## Included Tools

| Tool | Purpose |
|------|--------|
| Pandoc | Markdown to PDF, DOCX, and other formats |
| Mermaid CLI | Diagrams from text descriptions |
| Marp CLI | Slide decks (PDF, PowerPoint) from Markdown |
| Puppeteer | PDF from HTML |
| Firefox | PDF from HTML |

## Repositories

- **docuwrite-base** - Container with all tools (AMD64 + ARM64)
- **bifrost-docuwrite** - Wiki-to-PDF workflow automation
