---
title: "sovdev-logger"
description: "Multi-language structured logging with zero-effort observability - one log call, complete observability"
date: 2025-01-01
status: "active"
topics:
  - "cybersecurity"
  - "critical-infrastructure"
tags:
  - "logging"
  - "observability"
  - "opentelemetry"
  - "metrics"
  - "tracing"
  - "typescript"
showHero: true
heroStyle: "big"
cascade:
  showTableOfContents: true
  showDate: false
  showAuthor: false
---

Stop writing separate code for logs, metrics, and traces. Write one log entry and automatically get structured logs, metrics dashboards, distributed traces, and service dependency maps.

## The Problem

Traditional observability requires 20+ lines per operation - separate logger calls, metric counters, trace spans, manual correlation.

## The Solution

```typescript
sovdev_log(INFO, FUNCTIONNAME, 'Payment processed', PEER_SERVICES.PAYMENT_GATEWAY, input, output);
// ↑ Automatic logs + metrics + traces + correlation
```

**Result**: 95% less instrumentation code, complete observability out of the box.

## What You Get Automatically

| Output | Backends |
|--------|----------|
| Structured Logs | Azure Log Analytics, Loki, JSON files |
| Metrics | Azure Monitor, Prometheus, Grafana |
| Distributed Traces | Application Insights, Tempo |
| Service Maps | Automatic dependency graphs |

## Supported Languages

| Language | Status |
|----------|--------|
| TypeScript | ✅ Available |
| Go, Python, C#, Rust, PHP | 📅 Planned |

Works with any OpenTelemetry-compatible backend: Azure Monitor, Grafana Cloud, Datadog, New Relic, or self-hosted.
