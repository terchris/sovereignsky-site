---
title: "From ARPANET to Amazon: How We Broke the Internet's Original Promise"
identifier: "2025-12-25-arpanet-broken-promise"
date: 2025-12-25
description: "The internet was built to survive nuclear war. We've since made it vulnerable to fishing trawlers and policy changes in Washington. The same architecture designed for resilience has been recentralized - and Russia is already testing our cables."
summary: "The internet was built to survive nuclear war. We've since made it vulnerable to fishing trawlers and policy changes in Washington. The same architecture designed for resilience has been recentralized - and Russia is already testing our cables."
showHero: true
topics:
  - "digital-sovereignty"
  - "critical-infrastructure"
  - "platform-dependency"
tags:
  - "arpanet"
  - "russia"
  - "hybrid-warfare"
  - "submarine-cables"
audiences:
  - "it-ops"
  - "security"
authors:
  - "SovereignSky"
layout: "single"
type: "blog"
---

In 1969, ARPANET introduced packet switching – a radical idea where data could route around damage. No single point of failure. The US military wanted communications that could survive a Soviet first strike.

The architecture was resilient by design. Distributed. Decentralized. Sovereign.

## What we built instead

Fifty years later, European critical infrastructure runs on three American hyperscalers. We traded resilience for convenience. The same impulse that once distributed risk has now concentrated it:

- **Legal exposure** – The [CLOUD Act](/laws/cloud-act/) gives US authorities access to data stored by American companies, regardless of where servers are physically located
- **Regulatory uncertainty** – [Schrems II](/laws/schrems-ii/) invalidated Privacy Shield. The [EU-US Data Privacy Framework](/laws/eu-us-dpf/) is its fragile replacement – we're operating in legal grey zones.
- **Supply chain opacity** – [NIS2](/laws/nis2/) demands control we don't actually have

A policy change in Washington, a new sanctions regime, or a shift in trade relations could disrupt Nordic digital services overnight.

But that's the theoretical risk. The physical risk is already here.

## This is not a drill

While we debated data sovereignty in conference rooms, Russia began testing our infrastructure directly.

**January 2022:** The Svalbard cable was cut. SvalSat handles roughly 30% of global polar orbit satellite downlinks – this wasn't just Norwegian infrastructure, it was a node in the world's space communications.

**Ongoing:** Norwegian media has extensively documented Russian trawlers moving in zig-zag patterns along our coast – directly over known cable routes. These aren't fishing expeditions.

**October 2023:** The Balticconnector pipeline and Estonia-Sweden telecom cables were damaged in the Baltic Sea.

The original ARPANET architects imagined Soviet missiles. They didn't imagine we'd voluntarily concentrate our infrastructure *and* face hybrid warfare – where cables get cut by "accidents" rather than warheads.

## The dual vulnerability

We are now exposed on two axes simultaneously:

1. **Physical layer** – Submarine cables can be cut. And they are being cut.
2. **Logical layer** – Even if the cables survive, our services depend on control planes in Redmond, Seattle, and Mountain View.

A distributed network means nothing if every node depends on the same American authentication service, the same cloud provider, the same DNS infrastructure.

## Rebuilding resilience

This isn't about rejecting cloud computing. It's about remembering why distributed systems matter – and applying that principle at every layer:

- **Infrastructure** – European and Nordic hosting with transparent supply chains
- **Software** – Open source stacks we can inspect, modify, and operate ourselves
- **Data** – Localization that means something legally, not just geographically
- **Skills** – Operational sovereignty requires people who understand the systems, not just consume them

The internet's architects understood that resilience requires redundancy, distribution, and local control. We forgot. The cables off our coast are a reminder.

---

*For more on the active hybrid threat to Norwegian infrastructure, see [The Hybrid War Is Already Here](/blog/2025-12-15-hybrid-war-already-here/).*
