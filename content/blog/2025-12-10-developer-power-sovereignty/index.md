---
title: "You, the Developer, Hold the Keys to National Sovereignty"
date: 2025-12-10
description: "Why your technical decisions matter for your country's independence - and what you can do about it"
summary: "Why your technical decisions matter for your country's independence - and what you can do about it"
tags: ["cloud sovereignty", "developers", "vendor lock-in", "open standards", "digital independence"]
categories: ["Opinion"]
---

Your mother needs a hospital appointment. The booking system runs on Azure. The authentication flows through Okta. The email reminder uses SendGrid. The SMS notification goes via a Norwegian provider, but you know that their service run i a US cloud.

Now imagine the US decides to restrict access to cloud services for European customers. Trade dispute. Sanctions. Political retaliation. It doesn't matter why - what matters is that your mother can't book her appointment.

This isn't science fiction. This is the architecture we've built.

## The Services That Would Stop

Think about what happens when the big cloud providers become unavailable:

**Healthcare:**
- Hospital booking systems go dark
- Patient records become inaccessible
- Lab results can't be delivered
- Prescription systems fail

**Municipal services:**
- Building permit applications stop
- Kindergarten enrollment freezes
- Social services can't process cases
- Property registration halts

**Daily life:**
- Bank payments may fail
- Public transport apps stop working
- Emergency services lose coordination tools
- Schools can't access learning platforms

This isn't about inconvenience. It's about whether a nation can function.

## Why Management Can't Fix This

Your CTO sees "Microsoft Azure" on the architecture diagram and thinks: "Enterprise grade. Reliable. Good choice."

They don't see:
- The Azure Service Bus SDK that only speaks to Azure
- The Azure Functions triggers that can't run anywhere else
- The Cosmos DB queries that won't work on PostgreSQL
- The Application Insights integration baked into every service

Management approves technology based on vendor reputation, cost projections, and feature lists. They don't understand the bindings. They can't see the lock-in.

**You can.**

You're the one who writes `using Azure.Messaging.ServiceBus` instead of using AMQP. You're the one who deploys to Azure Functions instead of a container. You're the one who chooses Cosmos DB when PostgreSQL would work.

Every line of code you write either increases or decreases your nation's dependency on foreign infrastructure.

## The Geopolitical Reality

"But the USA is our ally! They're the West. Our reliable partners. Our friends."

Have you heard about the new sheriff in town? At the Munich Security Conference in February 2025, US Vice President JD Vance [lectured European allies](https://www.realclearpolitics.com/video/2025/02/14/full_speech_vice_president_jd_vance_addresses_munich_security_conference.html) on free speech and democracy, declared "there is a new sheriff in town," and made clear that American interests come first. The speech was so confrontational that one senior European official said Vance "did something whilst being in Germany that Germans are pretty good at: Teaching lessons to others."

Then in December 2025, Denmark's Defense Intelligence Service [identified the United States as a security threat](https://www.cnn.com/2025/12/10/europe/denmark-intelligence-report-intl) for the first time ever. The report warns that the US "uses economic power, including threats of high tariffs, to enforce its will and no longer rules out the use of military force, even against allies." A NATO ally. Calling the US a threat. In an official intelligence assessment.

The comfortable assumption that "US services will always be available" is a relic of a more stable era.

Consider:
- **CLOUD Act** - US law requires American companies to hand over data to US authorities, regardless of where it's stored
- **Executive orders** - The EU-US Data Privacy Framework depends on US executive orders that can be revoked
- **Trade wars** - Technology access has become a tool of foreign policy (ask Huawei)
- **Political instability** - What happens to service agreements when administrations change?
- **Military threats** - The US president has refused to rule out military action against Greenland, a territory of our neighboring ally Denmark

Norwegian Minister of Digitalisation Karianne Tung has advised all organizations to have an exit strategy. The EU is investing €180 million in sovereign cloud alternatives. Governments understand the risk.

But governments don't write code. You do.

## What You Can Do

Every technical decision is a vote for independence or dependence. Here's how to vote for sovereignty:

### 1. Choose Protocols Over SDKs

Instead of:
```csharp
// Locked to Azure
using Azure.Messaging.ServiceBus;
var client = new ServiceBusClient(connectionString);
```

Consider:
```csharp
// Works with any AMQP broker
using Amqp;
var connection = new Connection(address);
```

Or better - use an abstraction like Dapr that lets you switch backends without code changes.

### 2. Containerize Instead of Going Serverless

Azure Functions, AWS Lambda, and Google Cloud Functions are convenient. They're also prisons.

A containerized workload runs anywhere: Azure, AWS, on-premise, or a Norwegian data center. The 30 minutes you spend writing a Dockerfile buys your nation independence.

### 3. Use OpenTelemetry, Not Vendor APM

Instead of:
```csharp
// Locked to Azure
using Microsoft.ApplicationInsights;
var telemetry = new TelemetryClient();
```

Use:
```csharp
// Works everywhere
using OpenTelemetry;
var tracer = TracerProvider.Default.GetTracer("MyService");
```

OpenTelemetry sends data to any backend - Jaeger, Prometheus, Grafana, or yes, even Application Insights if you choose.

### 4. Pick Boring Databases

Cosmos DB is impressive. It's also only available on Azure.

PostgreSQL runs everywhere. It's battle-tested, well-understood, and supported by every cloud provider and on-premise setup. When the choice doesn't matter for your use case, choose the portable option.

### 5. Question Every Managed Service

Before using a cloud-specific service, ask:
- What happens if we need to run this elsewhere?
- Is there a standard protocol or open-source alternative?
- Am I choosing this because it's better, or because it's easier right now?

"Easier right now" is how nations lose their digital independence.

## The Conversation You Need to Have

Next time you're in an architecture review, ask: "What's our exit strategy for this service?"

You'll get blank stares. That's the point.

Push for:
- **An approved services list** that prioritizes portable options
- **Abstraction requirements** for infrastructure dependencies
- **Regular portability assessments** of critical systems

Your organization probably won't care about national sovereignty. But they might care about:
- Negotiating leverage with vendors
- Avoiding surprise migrations when regulations change
- Not being held hostage on pricing

Frame it however you need to. The result is the same.

## Your Responsibility

Software developers have become critical infrastructure workers without most of us realizing it. The code you write today determines whether essential services function tomorrow.

You have knowledge that your managers, your executives, and your politicians don't have. You understand what it means when a system is built on proprietary foundations. You can see the dependencies that others can't.

That knowledge comes with responsibility.

The next time you reach for a vendor SDK instead of an open standard, remember: you're not just making a technical choice. You're making a choice about whether your country can function independently.

Your mother's hospital appointment might depend on it.

---

## What To Do Monday Morning

1. **Audit one service** - Pick a system you work on. List its cloud dependencies. Could it run elsewhere?

2. **Propose one change** - Find one place where a proprietary SDK could be replaced with a standard protocol.

3. **Start the conversation** - Ask your team: "Do we have an exit strategy?"

4. **Learn Dapr** - It takes a few hours to understand. It could save months of migration work.

5. **Document dependencies** - Create visibility. You can't fix what you can't see.

Small steps. Big impact. Your nation is counting on you - they just don't know it yet.

---

## Further Reading

**On Digital Sovereignty:**
- [What is Digital Sovereignty and How Are Countries Approaching It?](https://www.weforum.org/stories/2025/01/europe-digital-sovereignty/) - World Economic Forum overview of the sovereignty landscape
- [Reclaiming Europe's Digital Sovereignty](https://www.noemamag.com/reclaiming-europes-digital-sovereignty/) - NOEMA Magazine on strategic independence
- [The State of Digital Sovereignty in Europe 2025](https://wire.com/en/blog/state-digital-sovereignty-europe) - Survey and insights on current state
- [A Primer on Digital Sovereignty & Open Source](https://www.opensourcerers.org/2021/08/09/a-promer-on-digital-sovereignty/) - How open source enables sovereignty

**On Escaping Vendor Lock-in:**
- [Open Source: The Key to Achieving Digital Sovereignty](https://www.suse.com/c/open-source-the-key-to-achieving-digital-sovereignty/) - SUSE on open source as the path forward
- [Sovereignty Through Portability: How to Avoid Vendor Lock-in](https://www.arvato-systems.com/blog/sovereignty-through-portability-how-to-avoid-vendor-lock-in) - Practical portability strategies
- [Open Source Software: Added Flexibility to Break Free from Vendor Lock-in](https://www.bfh.ch/en/news/stories/2025/open-source-vendor-lock-in/) - Academic perspective on gradual migration
- [Open Source: A Global Commons to Enable Digital Sovereignty](https://opensource.org/blog/open-source-a-global-commons-to-enable-digital-sovereignty) - Open Source Initiative on the global commons

**On Critical Infrastructure:**
- [The Danger of Critical Infrastructure Interdependency](https://www.cigionline.org/articles/danger-critical-infrastructure-interdependency/) - Centre for International Governance Innovation on cascading failures
- [Building Resilient Platforms: Insights from Mission-Critical Infrastructure](https://www.infoq.com/articles/building-resilient-platforms-mission-critical-infrastructure/) - InfoQ on building systems others depend on
