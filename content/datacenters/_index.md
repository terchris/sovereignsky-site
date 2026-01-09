---
title: "Datacenters"
description: "Cloud datacenter locations and their jurisdiction implications"
echarts: true
---

{{< page-stats section="datacenters" >}}

## Regions by Country

{{< datacenter-country-chart type="bar" height="600px" >}}

**Note:** There is no central database of all cloud datacenter regions. This data is compiled from **public sources** (provider documentation, press releases, and official announcements) and is continuously updated as providers expand. Some providers do not publicly disclose all locations.

{{< datacenter-map >}}

## Datacenter Providers

{{< datacenter-providers >}}

## Countries

{{< datacenter-countries >}}

## Understanding Jurisdiction Exposure

### The Problem

When you use a US cloud provider like AWS, Azure, or Google Cloud:

- Your data might be stored in **Frankfurt, Germany**
- But the vendor is subject to **US law**
- The **CLOUD Act** allows US authorities to compel access to data regardless of where it's stored

This means data stored in EU datacenters by US companies is **not protected** from US government access.

---

## Related

- [Jurisdiction & Laws](/laws/) - Understanding surveillance laws
- [Software Alternatives](/software/) - Find sovereignty-friendly software
