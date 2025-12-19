---
title: "Datacenters"
description: "Cloud datacenter locations and their jurisdiction implications"
echarts: true
layout: "simple"
---

Where your cloud provider stores data matters less than where the provider is headquartered. This map shows datacenter locations colored by **vendor jurisdiction** - not physical location.

## Datacenter Map

{{< datacenter-map >}}

## Datacenter Providers

{{< datacenter-providers >}}

## Understanding Jurisdiction Exposure

### The Problem

When you use a US cloud provider like AWS, Azure, or Google Cloud:

- Your data might be stored in **Frankfurt, Germany**
- But the vendor is subject to **US law**
- The **CLOUD Act** allows US authorities to compel access to data regardless of where it's stored

This means data stored in EU datacenters by US companies is **not protected** from US government access.

### The Solution

To maintain data sovereignty, consider:

1. **EU/EEA-based providers** - OVHcloud (France), Hetzner (Germany), Scaleway (France)
2. **Swiss providers** - Exoscale (Switzerland has adequacy decision but is not EU/EEA)
3. **Nordic providers** - Safespring (Sweden), Green Mountain (Norway), Basefarm (Norway)

These providers are not subject to US extraterritorial laws like the CLOUD Act.

## Providers by Jurisdiction

### US Providers (CLOUD Act applies)

| Provider | Regions | Note |
|----------|---------|------|
| Amazon Web Services | 29 | Largest global footprint |
| Microsoft Azure | 46 | Includes Norway regions |
| Google Cloud Platform | 40 | Strong in Europe |

### EU/EEA Providers (Sovereignty-friendly)

| Provider | HQ | Regions |
|----------|-----|---------|
| OVHcloud | France | 10 |
| Hetzner | Germany | 6 |
| Scaleway | France | 3 |
| Safespring | Sweden | 3 |
| Green Mountain | Norway | 6 |
| Basefarm | Norway | 3 |

### Swiss Providers (Adequate)

| Provider | Regions |
|----------|---------|
| Exoscale | 7 |

---

## Related

- [Jurisdiction & Laws](/laws/) - Understanding surveillance laws
- [Software Alternatives](/software/) - Find sovereignty-friendly software
