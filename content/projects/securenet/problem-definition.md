---
title: "Problem Definition"
description: "Why SecureNet exists - the risks organizations face when providing developers access to internal services"
date: 2025-12-01
weight: 1
tags: ["zero trust", "security", "VPN", "BYOD", "cloud sovereignty"]
categories: ["Documentation"]
---

# SovereignSky Problem Definition

**Status:** Draft

## The Risk Landscape

Organizations face multiple categories of risk when providing developers access to internal services:

### Security Risk: Compromised Developer Machines

Developer machines are assumed to be infected with malware. Traditional solutions (VPN, corporate WiFi) give the entire machine access to internal services - including any malware.

### Operational Risk: Developer Software Installation

Developers constantly install and test new software - IDEs, frameworks, libraries, AI tools, productivity apps. Many tools promise productivity gains but don't work as intended for specific projects. This creates:

- **A constant cycle of installing and uninstalling software**
- **Unknown software from unknown sources** running on machines with network access
- **Headaches for IT departments** who normally control what can be installed on managed machines
- **Conflict between developer productivity and IT security policies**

Traditional managed devices don't work for developers - they need freedom to experiment with tools.

### Geopolitical Risk: Cloud Provider Dependency

American tech giants control over 70% of Europe's cloud infrastructure. US laws (CLOUD Act) and political instability create regulatory and operational risks. Government guidance recommends exit strategies.

### Technical Risk: Vendor Lock-in

Developers use proprietary cloud features that tie code to one provider. Migration requires rewriting code, not just moving infrastructure.

### Cost Risk: Uncontrolled Cloud Spending

Developers provision resources without understanding costs. Invoices go to finance, not developers, breaking the feedback loop.

---

## Security and Operational Risk: Developer Access

Developers need access to internal services (APIs, web servers, AI tools) to do their work. Traditional solutions expose the organization to unacceptable risk.

### Types of Developers

**Internal developers** work for the organization and use organization-provided machines. IT can manage these machines, but developers still need freedom to install development tools.

**External developers (consultants)** bring their own machines. They may:
- Work for the organization two days a week and another client the rest
- Use the same machine for multiple clients
- Have software installed from previous or concurrent projects
- Be subject to no IT oversight from the organization

The organization's IT department has no visibility or control over consultant machines.

### Developer Machines and Networks

Developer machines are any OS (Windows, Mac, Linux) and any CPU (x86, ARM). Developers work from anywhere - home, coffee shops, hotels, co-working spaces.

**Potential risks:**
- Developer machines can be infected with malware or run software that is not allowed on our network.
- Developers can use networks that are insecure

### Traditional Solutions and Their Risks

#### VPN for IT Staff and Developers

**How it works:** The developer's machine connects to the **Management Network** via VPN. The entire machine becomes "inside" the management network.

**The Management Network** provides access to backend infrastructure like Azure Service Bus management, internal admin portals, and other services not exposed publicly.

**When it's used:** Not all developers use VPN all the time. It's typically needed for specific management tasks.

**The risk:** When a developer connects via VPN, their entire machine - including any malware - gains access to the Management Network.

```
┌─────────────────────┐
│ Developer Machine   │
│                     │
│  ┌───────────────┐  │
│  │ Malware       │──┼──► Management Network ⚠️
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │ Dev tools     │──┼──► Management Network
│  └───────────────┘  │
│                     │
│  Entire machine     │
│  is "inside"        │
└─────────────────────┘
```

#### Managed Devices for external developers

**How it works:** The organization provides and controls the developer's machine.

**The problems:**
- Expensive to purchase and maintain
- Developers resist using restricted machines
- Onboarding time as a new external developer must set up the computer according to his preferences before starting to work.

### What We Need for Security

```
TRADITIONAL (VPN):                         WHAT WE NEED (Zero Trust):

┌─────────────────────┐                    ┌─────────────────────┐
│ Developer Machine   │                    │ Developer Machine   │
│                     │                    │                     │
│  ┌───────────────┐  │                    │  ┌───────────────┐  │
│  │ Malware       │──┼──► Management      │  │ Malware       │──┼──► ✗ No access
│  └───────────────┘  │    Network         │  └───────────────┘  │
│                     │                    │                     │
│  ┌───────────────┐  │                    │  ┌───────────────┐  │
│  │ Dev tools     │──┼──► Management      │  │ Dev tools     │──┼──► ✗ No access
│  └───────────────┘  │    Network         │  └───────────────┘  │
│                     │                    │                     │
│  Entire machine     │                    │  ┌───────────────┐  │
│  is "inside"        │                    │  │ Isolated      │──┼──► Management
└─────────────────────┘                    │  │ Gateway       │  │    Network
                                           │  └───────────────┘  │    (only this)
                                           └─────────────────────┘
```

---

## Cloud and Vendor Risk: Infrastructure Dependency

Organizations hosting services on US cloud providers face strategic risks that require contingency planning. Using proprietary cloud features creates additional lock-in that makes migration difficult.

### Geopolitical Risk: Cloud Provider Dependency

Organizations hosting internal services on US cloud providers face regulatory and political risks that require contingency planning.

#### Current Situation

Most organizations run their backend services on US cloud providers (Azure, AWS, Google Cloud). This creates dependency on:
- US jurisdiction and laws (CLOUD Act)
- Continued political and trade relations
- Stable access to US-controlled infrastructure

#### The Risks

- **US CLOUD Act** - US providers must hand over data to US authorities regardless of where it is stored
- **GDPR compliance** - Uncertainty about data transfers to US jurisdiction
- **Political instability** - Access to US services can be disrupted by policy changes, sanctions, or trade disputes

#### Government Guidance

Norwegian Minister of Digitalisation Karianne Tung has advised all organizations to have an exit strategy for US cloud providers. The EU is developing a Cloud Sovereignty Framework to address this dependency.

#### What We Need for Cloud Independence

A solution that:
- Can run on any cloud provider or on-premise infrastructure
- Supports automatic failover between locations
- Allows migration without disrupting developer workflows

```
TODAY:                                     WHAT WE NEED:

┌─────────────────────┐                    ┌─────────────────────┐
│ US Cloud (Azure)    │                    │ US Cloud (Primary)  │
│                     │                    │         │           │
│  All services       │                    │         ▼           │
│  Single point of    │                    │ ┌─────────────────┐ │
│  failure            │                    │ │ On-Premise      │ │
│                     │                    │ │ (Failover)      │ │
│  No exit strategy   │                    │ └────────┬────────┘ │
│                     │                    │          ▼          │
└─────────────────────┘                    │ ┌─────────────────┐ │
                                           │ │ Nordic Cloud    │ │
                                           │ │ (Backup Primary)│ │
                                           │ └─────────────────┘ │
                                           └─────────────────────┘
```

### Technical Risk: Vendor Lock-in

Developers often rely on proprietary cloud-specific SDKs and bindings, creating dependencies that complicate migration even when open standards are available. Code ties to one provider through familiar APIs rather than portable abstractions.

#### Common Lock-in Patterns

- **Azure Service Bus** - SDKs and bindings optimized for Azure workflows, though AMQP provides a standard protocol underneath
- **AWS Lambda** - Custom triggers and runtime extensions, despite OCI container support
- **Google Cloud Functions** - Provider-specific event handlers over portable alternatives
- **Proprietary APIs** - Direct use of vendor SDKs over standard protocols

#### Standards Support vs. Developer Habits

Cloud providers support key standards, but adoption lags due to convenience of proprietary tools:
- **Serverless functions** - OCI containers enable portability, yet AWS Lambda, Azure Functions, and Google Cloud Functions favor native triggers over CloudEvents
- **Message queues** - AMQP works in Azure Service Bus (abstractable via Dapr), but AWS SQS and SDK defaults encourage proprietary patterns
- **Identity** - OAuth/OIDC form the base, with extensions adding friction for multi-cloud setups
- **Observability** - OpenTelemetry integrates across AWS, Azure, and GCP, but native tools like Application Insights (Azure), CloudWatch (AWS), and Cloud Logging (GCP) dominate

#### The Real Challenge

Developers default to quick proprietary paths, leading to "soft lock-in" where rewrites are needed for migration—not due to absent standards, but ingrained habits.

**No organizational strategy for vendor independence.** Most organizations have no policy requiring portable solutions. Internal developers, and especially external consultants, select technologies they already know to get the job done quickly. There is no incentive to choose standards-compliant alternatives.

**Higher costs from duplicated infrastructure.** When developers freely choose technologies, they often provision new services instead of reusing existing ones. This leads to paying for multiple databases, message queues, and storage accounts that serve similar purposes.

**Fragmented infrastructure and maintenance burden.** Developers select databases and services they're familiar with rather than reusing what the organization already operates. For example, a consultant might spin up Azure Cosmos DB when PostgreSQL is already available and supported. After go-live, the organization inherits:
- Multiple database platforms requiring different expertise
- Increased licensing and operational costs
- Competence gaps when the original developer leaves
- Ongoing maintenance for systems that could have been consolidated

### Cost Risk: Uncontrolled Cloud Spending

Cloud services are designed to be easy to use. Developers can provision resources with a few clicks - without understanding the cost implications.

#### The Problem

- **Developers don't see costs** - invoices go to finance or IT management, not to the developers making decisions
- **Invoices are unreadable** - cloud billing is so complex that even finance teams struggle to understand what they're paying for
- **No feedback loop** - developers never learn the cost of their choices
- **Easy to overspend** - a misconfigured service can cost thousands before anyone notices

#### What This Leads To

- Budget overruns that are discovered too late
- No accountability for spending decisions
- Organizations paying for resources they don't need
- Surprise bills that are difficult to explain or justify

### What We Need for Cloud and Vendor Risk

**For vendor independence:**
- Clear policies requiring use of open standards where available
- Reuse of existing infrastructure before provisioning new services
- Abstractions that remove vendor lock-in (e.g., Dapr for pub/sub instead of direct Azure Service Bus SDKs)
- Architecture that isolates provider-specific code
- Clear guidelines on which services are approved for use

**For cost control:**
- Cost visibility for developers making provisioning decisions
- Approval process for new infrastructure that doesn't already exist
- Regular cost reviews tied to projects and teams

---

## Requirements Summary

A solution that addresses:

**Security and Operational Risk:**
1. Gives developers access to internal services
2. Does NOT give the developer's machine access to the Management Network
3. Works regardless of where the developer is located
4. Works on any developer machine (Windows, Mac, Linux)
5. Protects internal services even if the developer's machine is compromised

**Cloud and Vendor Risk:**
6. Can failover to alternative infrastructure if a cloud provider becomes unavailable
7. Allows migration away from US cloud providers without disrupting developer workflows
8. Enforces use of open standards and portable abstractions
9. Provides visibility into infrastructure costs and usage
