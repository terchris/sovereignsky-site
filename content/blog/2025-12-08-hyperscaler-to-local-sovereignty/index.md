---
title: "From Hyperscaler to Local: Why Norwegian Organizations Are Rethinking Cloud Strategy"
date: 2025-12-08
showHero: true
description: "The geopatriation trend - moving from US hyperscalers to local cloud providers for sovereignty, security, and control."
summary: "The geopatriation trend - moving from US hyperscalers to local cloud providers for sovereignty, security, and control."
tags: ["sovereignty", "data-residency", "vendor-lock-in", "norway"]
audiences: ["enterprise", "public-sector"]
categories: ["Technical"]
---

Who controls your data? Who can access it? And what happens if that access is cut off?

These questions are driving a fundamental shift in how Norwegian organizations think about cloud infrastructure. It's no longer just about cost optimization - it's about sovereignty, control, and national security.

> Gartner predicts that by 2030, more than 75 per cent of all enterprises outside the US will have a digital sovereignty strategy, supported by a sovereign cloud strategy.
>
> — [Gartner](https://www.channelweb.co.uk/news/2025/geopatriation)

Gartner calls this trend "[geopatriation](https://www.channelweb.co.uk/news/2025/geopatriation)" - moving from hyperscalers to local or regional cloud providers. Their 2025 survey found that **61% of Western European CIOs** said geopolitical factors will increase their reliance on local or regional cloud providers.

This isn't about rejecting cloud technology. It's about choosing who you trust with your nation's data.

## Why Sovereignty Matters Now

The geopolitical landscape has changed. The comfortable assumption that American cloud providers will always be available and trustworthy is being questioned at the highest levels.

**The legal reality:**
- **CLOUD Act** - US law requires American companies to hand over data to US authorities, regardless of where it's stored
- **No jurisdictional protection** - Data in Azure's Norwegian region is still subject to US law
- **Executive order dependency** - The EU-US Data Privacy Framework can be revoked with a signature

**The geopolitical reality:**
- Denmark's Defense Intelligence Service has [identified the United States as a security threat](https://www.cnn.com/2025/12/10/europe/denmark-intelligence-report-intl) for the first time - warning that the US "uses economic power, including threats of high tariffs, to enforce its will and no longer rules out the use of military force, even against allies"
- Norway's Minister of Digitalisation Karianne Tung has advised all organizations to [prepare exit strategies](/blog/2025-12-01-norway-exit-strategy/) from US cloud providers

When a NATO ally officially classifies the US as a potential security concern, the implications for digital infrastructure cannot be ignored.

## Norway and the Nordics: Taking Action

Norwegian organizations are responding to these concerns with concrete investments in sovereign infrastructure.

### Telenor's Skygard: Building Norway's Sovereign Infrastructure

When Norway's largest telecom company Telenor [couldn't find a cloud provider meeting their security requirements](https://www.telenor.com/media/newsroom/announcement/telenor-hafslund-and-hitecvision-announces-2-4-billion-nok-investment-in-oslo-data-center/), they decided to build their own.

In 2024, Telenor partnered with energy company Hafslund and investor HitecVision to create **Skygard** - a NOK 2.4 billion (€200+ million) investment in sovereign Norwegian data centers.

**Why they're building it:**
- Norwegian security authorities requested data centers for sensitive national infrastructure
- Need for "trusted local alternative" to global hyperscalers
- Target customers: government agencies, critical infrastructure, financial services, healthcare

**The message is clear:** When one of Norway's largest companies says they can't find a cloud provider they trust with sensitive data, it tells you something about the state of the market.

### Green Mountain: Sovereign Infrastructure Already Operating

For organizations choosing colocation over hyperscalers, [Green Mountain's Norwegian data centers](https://greenmountain.no/) offer an established alternative.

Built inside a former NATO ammunition store near Stavanger and powered by 100% renewable hydropower, their facilities host:
- Banks and financial services
- Government agencies
- Cloud service providers

The appeal: **Tier III certified Norwegian infrastructure** under Norwegian jurisdiction, with among the lowest electricity costs in Europe.

## The Business Case: Sovereignty AND Savings

Sovereignty isn't just about security - there's often a compelling cost argument as well. Companies that have moved away from hyperscalers report significant savings.

### 37signals (Basecamp): Control and Cost Reduction

37signals - the company behind Basecamp and Hey - [exited AWS entirely](https://www.theregister.com/2024/10/21/37signals_aws_savings/) and moved to colocation.

**The results:**
- Annual infrastructure bill dropped from $3.2 million to **under $1 million**
- Projected five-year savings: **over $10 million**
- **Full control** over their infrastructure and data
- No dependency on a single US provider

As founder David Heinemeier Hansson wrote: the decision wasn't just about money - it was about regaining control over their own destiny.

### Ahrefs: Independence by Design

SEO software company Ahrefs [never migrated to cloud in the first place](https://www.theregister.com/2023/03/13/ahrefs_on_prem_savings/), calculating that AWS would cost them **$408 million more** over 2.5 years.

But beyond cost, they maintain complete control over their infrastructure - no dependency on US providers, no CLOUD Act exposure, no risk of service disruption due to geopolitical events.

## The Hidden Exit Tax: Egress Fees

Want to regain sovereignty over your data? First, you'll need to pay to get it out.

**Egress fee reality:**
- Moving 50TB costs **$3,500-7,000** in egress fees alone
- A company with 5PB of archival data faces **$250,000** just to download it from AWS
- Egress fees can add **30-50%** to monthly cloud bills unexpectedly

This is by design. Egress fees are "deliberately designed to lock you into a single cloud provider" - making it expensive to exercise your sovereignty.

### The EU Data Act: Regulatory Support for Sovereignty

The [EU Data Act](https://digital-strategy.ec.europa.eu/en/factpages/data-act-explained), effective September 2025, introduces measures to protect businesses from unfair cloud contracts. By January 2027, switching charges including egress fees will be prohibited entirely for customers in Norway and the EU.

The EU is actively supporting organizations that want to regain control of their data.

## The Real Numbers on Migration Costs

Before budgeting for migration, ask: **can you actually move?**

If your organization has built on vendor-specific services - Azure Functions with native triggers, AWS Lambda integrations, proprietary database APIs - the migration cost isn't just infrastructure. It's rewriting code. We covered this in detail in [Cloud Vendor Lock-in: The Hidden Cost of Developer Convenience](/blog/2025-12-06-vendor-lock-in-hidden-cost/).

Assuming your workloads are portable, budget for these costs. According to [industry analysis](https://appinventiv.com/blog/cloud-migration-costs/), migration projects typically range widely based on complexity:

**One-time migration costs:**
- Simple migrations (lift-and-shift): **$50,000-200,000**
- Complex enterprise migrations: **$600,000 to over $1 million**
- Timeline: weeks for simple migrations, 12-24 months for complex transformations

**Ongoing considerations:**
- Colocation fees (rack space, power, bandwidth)
- Hardware refresh cycles (typically 3-5 years)
- Staff training or hiring
- Software licensing changes

The investment in sovereignty is real - but so is the cost of dependency.

## What This Means for Norwegian Organizations

### 1. Assess Your Sovereignty Risk

Map your critical systems to their infrastructure providers:
- Which systems hold sensitive data?
- Which are subject to US jurisdiction via CLOUD Act?
- What would happen if access was disrupted?

### 2. Explore Norwegian Alternatives

Norwegian colocation options like Green Mountain and the new Skygard facilities offer:
- Data sovereignty under Norwegian law
- No CLOUD Act exposure
- Competitive pricing
- Renewable energy

### 3. Identify Migration Candidates

Look for workloads that are:
- Subject to Norwegian data residency requirements
- Containing sensitive citizen or business data
- Critical to national infrastructure
- Stable and predictable (cost-effective to host locally)

### 4. Plan for the Exit Tax

Budget for egress fees, migration tooling, parallel running costs, and potential downtime. The EU Data Act will help after January 2027, but planning ahead reduces surprises.

### 5. Consider Hybrid Sovereignty

You don't have to choose all-or-nothing. Many organizations are keeping non-sensitive workloads in hyperscaler clouds while moving sensitive data and critical systems to sovereign infrastructure.

## The Path Forward

Cloud geopatriation has moved from contrarian position to mainstream strategy. By mid-2025, analysts predict it could become the "hottest term" in infrastructure planning, driven by:

- **Sovereignty concerns** - Data residency, legal jurisdiction, and national security
- **Geopolitical risk** - The changing relationship between Europe and the US
- **Regulatory pressure** - EU Data Act and national security requirements
- **Control** - Organizations want to own their infrastructure destiny

The question for Norwegian organizations is no longer whether to think about sovereignty - it's how quickly to act.

Your data. Your infrastructure. Your choice.

---

## Sources

**Nordic Sources:**
- [Telenor Skygard Data Center Investment - Telenor Group](https://www.telenor.com/media/newsroom/announcement/telenor-hafslund-and-hitecvision-announces-2-4-billion-nok-investment-in-oslo-data-center/)
- [Norway's Data Center Builders Focus on Energy Efficiency - Computer Weekly](https://www.computerweekly.com/news/366599458/Norways-datacentre-builders-focus-on-energy-efficiency)
- [Green Mountain Data Centers](https://greenmountain.no/)
- [Denmark identifies US as security threat - CNN](https://www.cnn.com/2025/12/10/europe/denmark-intelligence-report-intl)

**Global Sources:**
- [Gartner: "This is geopatriation, not cloud repatriation"](https://www.channelweb.co.uk/news/2025/geopatriation)
- [37signals Cloud Exit Savings - The Register](https://www.theregister.com/2024/10/21/37signals_aws_savings/)
- [Basecamp: Leaving the Cloud](https://basecamp.com/cloud-exit)
- [Why We're Leaving the Cloud - DHH](https://world.hey.com/dhh/why-we-re-leaving-the-cloud-654b47e0)
- [Ahrefs On-Prem Savings - The Register](https://www.theregister.com/2023/03/13/ahrefs_on_prem_savings/)
- [Cloud Migration Costs 2025 - Appinventiv](https://appinventiv.com/blog/cloud-migration-costs/)
- [The True Cost of Cloud Data Egress - CloudOptimo](https://www.cloudoptimo.com/blog/the-true-cost-of-cloud-data-egress-and-how-to-manage-it/)
