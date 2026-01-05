---
title: "Specification"
description: "Detailed technical specification for SecureNet implementation"
date: 2025-12-15
weight: 20
tags: ["specification", "technical", "architecture", "Tailscale", "containers"]
categories: ["Technical Reference"]
aliases:
  - /projects/securenet/specification/
---

# SovereignSky Specification

**Status:** Draft

## Goal

Provide developers with **secure access to defined internal services** without exposing their machines to the organization network.

**SovereignSky** is the implementation that achieves this goal:
- Zero trust connectivity to defined internal services
- Monitoring of developer environments

SovereignSky is the **responsibility boundary** between developers and the integration team.

## Security Model

### Assumptions

**Developer machine:**
- Assumed to be infected with malware
- Private property of the developer (BYOD)
- Any OS (Windows, Mac, Linux) and CPU (x86, ARM)
- We have no control over what is installed


**Developer network:**
- The Developer machine is connected to a network that is insecure and monitored by a foreign power

### Isolation Layer

The **Isolation Layer** is a secure, isolated environment on the developer's machine. Think of it as a "clean computer within an infected computer" - malware on the host cannot reach software running inside the Isolation Layer, and vice versa.

Software running inside this environment:
- Is protected from malware on the host machine
- Is separated from other software on the machine
- Runs identically on Windows, Mac, and Linux

### SovereignSky Network

SovereignSky is a **zero trust network** that runs on top of the developer's underlying network. It is:
- An encrypted overlay network
- Isolated inside the Isolation Layer - the host machine has no access
- The only path to internal services

### SovereignSky Gateway

The **SovereignSky Gateway** is the software that connects to the SovereignSky Network. It:
- Runs inside the Isolation Layer (not directly on the host)
- Provides DNS resolution for internal services
- Provides monitoring of developer environments
- Is the only component with access to the SovereignSky Network

### SovereignSky Backend

A **SovereignSky Backend** hosts internal services that developers access through the SovereignSky Network. Each backend provides services such as:
- Internal web services
- AI/LLM services
- Internal APIs

Backends can run anywhere - on-premises, in the cloud, or at a partner location. The SovereignSky Network securely connects the Gateway to one or more Backends regardless of their physical location.

Developers never access Backends directly - only through the SovereignSky Gateway.

### Resilience

The SovereignSky Network supports multiple Backends for resilience. If the primary Backend becomes unavailable, the SovereignSky Gateway automatically routes traffic to an alternative Backend.

This means:
- No single point of failure
- Developers continue working even if one Backend is down
- Backends can be located in different physical locations (cloud providers/on premise) for disaster recovery

### Overview Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ DEVELOPER MACHINE (infected, untrusted)                                      │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ ISOLATION LAYER ("clean computer within infected computer")             ││
│  │                                                                         ││
│  │  ┌─────────────────────────────────────────────────────────────────┐   ││
│  │  │ SOVEREIGNSKY GATEWAY                                            │   ││
│  │  │                                                                 │   ││
│  │  │  • DNS resolution for internal services                         │   ││
│  │  │  • Monitoring of developer environments                         │   ││
│  │  │  • Only component with network access                           │   ││
│  │  └──────────────────────────┬──────────────────────────────────────┘   ││
│  │                             │                                          ││
│  └─────────────────────────────┼──────────────────────────────────────────┘│
│                                │                                            │
└────────────────────────────────┼────────────────────────────────────────────┘
                                 │
                    SOVEREIGNSKY NETWORK
                    (encrypted overlay network)
                                 │
              ┌──────────────────┴──────────────────┐
              │                                     │
              ▼                                     ▼
┌─────────────────────────────┐     ┌─────────────────────────────┐
│ SOVEREIGNSKY BACKEND        │     │ SOVEREIGNSKY BACKEND        │
│ (Primary)                   │     │ (Failover)                  │
│                             │     │                             │
│ • Internal web services     │     │ • Internal web services     │
│ • AI/LLM services           │     │ • AI/LLM services           │
│ • Internal APIs             │     │ • Internal APIs             │
│                             │     │                             │
│ Location: Cloud/On-premise  │     │ Location: Different site    │
└─────────────────────────────┘     └─────────────────────────────┘
```

### Comparison: SovereignSky vs Traditional VPN/WiFi

**Traditional approach (WiFi/VPN):** Developer's machine connects directly to the organization network. The entire machine is "inside" - including any malware.

**SovereignSky approach:** Only the SovereignSky Gateway has network access to internal services. The developer's host machine is **never connected** to the internal network.

```
TRADITIONAL (WiFi/VPN):                    SOVEREIGNSKY (Zero Trust):

┌─────────────────────┐                    ┌─────────────────────┐
│ Developer Machine   │                    │ Developer Machine   │
│                     │                    │                     │
│  ┌───────────────┐  │                    │  ┌───────────────┐  │
│  │ Malware       │──┼──► Org Network     │  │ Malware       │──┼──► ✗ No access
│  └───────────────┘  │                    │  └───────────────┘  │
│                     │                    │                     │
│  ┌───────────────┐  │                    │  ┌───────────────┐  │
│  │ Dev tools     │──┼──► Org Network     │  │ Dev tools     │──┼──► ✗ No access
│  └───────────────┘  │                    │  └───────────────┘  │
│                     │                    │                     │
│  Entire machine     │                    │  ┌───────────────┐  │
│  is "inside"        │                    │  │ SovereignSky  │──┼──► Org Network
└─────────────────────┘                    │  │ (container)   │  │    (only this)
                                           │  └───────────────┘  │
                                           └─────────────────────┘
```

### Key Security Benefit

If the developer's machine is infected:
- **Malware cannot reach internal services** - only SovereignSky container has Tailscale connectivity
- **Host processes have no route** to Tailscale IPs (100.x.x.x)
- **Only containers using SovereignSky DNS** can resolve internal names

---

## Design Principles

1. **Integration team ownership:** SovereignSky is owned and maintained by the integration team. Developers use it as a service - they don't need to understand or configure its internals.
2. **Single container:** All SovereignSky functionality in one container (Tailscale, dnsmasq, OTel, Nginx, etc.)
3. **Keep it slim:** Minimize container size where possible - guiding rule, not a hard requirement
4. **Devcontainer simplicity:** Devcontainers only need `--dns=172.17.0.1` and OTel endpoint configured - nothing else
5. **SovereignSky owns identity:** Developer email configured once in SovereignSky, not in each devcontainer

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  DEVELOPER'S MACHINE (e.g., mint-macbookair)                    │
│                                                                  │
│  Browser → localhost:19000 ────────────────────────────────┐    │
│                                                             │    │
│  ┌─────────────────────────────────────────────────────────┼────┤
│  │ RANCHER DESKTOP VM                                      │    │
│  │                                                         │    │
│  │  Docker Socket ◄───────────────────────────────────┐    │    │
│  │       │                                            │    │    │
│  │       │                                            │    │    │
│  │  ┌────┴────────────────────────────────────────────┴──┐ │    │
│  │  │ SOVEREIGNSKY CONTAINER                             │ │    │
│  │  │                                                    │ │    │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │ │    │
│  │  │  │ DNS      │  │ OTel     │  │ Nginx            │◄┼─┼────┘
│  │  │  │ DNS      │  │ Collector│  │ Reverse Proxy    │ │ │
│  │  │  │          │  │ :4318    │  │ :19000-19099     │ │ │
│  │  │  └──────────┘  └────┬─────┘  └────────┬─────────┘ │ │
│  │  │                     │                 │           │ │
│  │  │  ┌──────────────────┴─────────────────┴─────────┐ │ │
│  │  │  │ VPN (WireGuard)                              │ │ │
│  │  │  │ → k8s:4318 (OTel)                           │ │ │
│  │  │  │ → k8s:80 (Grafana, Host header)             │ │ │
│  │  │  └──────────────────────────────────────────────┘ │ │
│  │  │                                                    │ │
│  │  │  Docker API client (queries socket)               │ │
│  │  │  - Discovers containers                           │ │
│  │  │  - Gets names, labels, metrics                    │ │
│  │  └────────────────────────────────────────────────────┘ │
│  │                                                         │
│  │  ┌──────────────────┐  ┌──────────────────┐            │
│  │  │ dev-terje-*      │  │ dev-anna-*       │            │
│  │  │ --dns=172.17.0.1 │  │ --dns=172.17.0.1 │            │
│  │  │ sends to :4318   │  │ sends to :4318   │            │
│  │  └──────────────────┘  └──────────────────┘            │
│  └─────────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────────┘
                              │
                       VPN (WireGuard)
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  K8S CLUSTER (e.g., k8s-imac)                                   │
│                                                                  │
│  Traefik:4318 → OTel Collector (standard port)                  │
│  Traefik:80 → Grafana (Host: grafana.*)                         │
│                                                                  │
│  Data filtered by developer_id in queries                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## DNS and Routing Architecture

### How It Works

SovereignSky runs with `network_mode: host`, meaning it shares the host's network stack. This is key to understanding how DNS and routing work together.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HOST MACHINE (Rancher Desktop VM)                                            │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │ HOST NETWORK NAMESPACE                                                  │ │
│  │                                                                         │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │ │
│  │  │ SOVEREIGNSKY (network_mode: host)                               │   │ │
│  │  │                                                                  │   │ │
│  │  │  Internal DNS (:53)           VPN daemon                          │   │ │
│  │  │  ┌─────────────────┐        ┌─────────────────┐                 │   │ │
│  │  │  │ *.sovereignsky  │        │ vpn0            │                 │   │ │
│  │  │  │ .no → 100.119.  │        │ interface       │                 │   │ │
│  │  │  │ 133.35          │        │                 │                 │   │ │
│  │  │  │                 │        │ Routes:         │                 │   │ │
│  │  │  │ other → 8.8.8.8 │        │ 100.64.0.0/10   │                 │   │ │
│  │  │  │ (Google DNS)    │        │ → vpn0          │                 │   │ │
│  │  │  └─────────────────┘        └─────────────────┘                 │   │ │
│  │  └─────────────────────────────────────────────────────────────────┘   │ │
│  │                                                                         │ │
│  │  Host Routing Table:                                                    │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐   │ │
│  │  │ Destination      Gateway        Interface                       │   │ │
│  │  │ 100.64.0.0/10    -              vpn0        (VPN network)        │   │ │
│  │  │ 172.17.0.0/16    -              docker0     (Docker bridge)     │   │ │
│  │  │ 0.0.0.0/0        <router>       eth0/wifi   (Internet)          │   │ │
│  │  └─────────────────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                        ▲                                     │
│  ┌─────────────────────────────────────┼──────────────────────────────────┐ │
│  │ DOCKER BRIDGE (172.17.0.0/16)       │                                  │ │
│  │                                     │                                  │ │
│  │  ┌──────────────────────────────────┴───────────────────────────────┐ │ │
│  │  │ Devcontainer (e.g., dev-project-alpha)                           │ │ │
│  │  │                                                                   │ │ │
│  │  │ DNS:     172.17.0.1  (--dns=172.17.0.1 in runArgs)               │ │ │
│  │  │ Gateway: 172.17.0.1  (default Docker bridge gateway)             │ │ │
│  │  └───────────────────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### DNS Query Flow

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  Devcontainer   │      │  SovereignSky   │      │  Google DNS     │
│                 │      │  Internal DNS     │      │  (8.8.8.8)      │
└────────┬────────┘      └────────┬────────┘      └────────┬────────┘
         │                        │                        │
         │  1. Query:             │                        │
         │  otel.sovereignsky.no  │                        │
         │───────────────────────►│                        │
         │                        │                        │
         │  2. Local match:       │                        │
         │  *.sovereignsky.no     │                        │
         │  → 100.119.133.35      │                        │
         │◄───────────────────────│                        │
         │                        │                        │
         │  3. Query:             │                        │
         │  github.com            │                        │
         │───────────────────────►│                        │
         │                        │  4. Forward to         │
         │                        │  Google DNS            │
         │                        │───────────────────────►│
         │                        │                        │
         │                        │  5. Response:          │
         │                        │  140.82.121.4          │
         │                        │◄───────────────────────│
         │  6. Return response    │                        │
         │◄───────────────────────│                        │
         │                        │                        │
```

### Routing Flow (After DNS Resolution)

**Case 1: Traffic to VPN network (*.sovereignsky.no)**

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  Devcontainer   │      │  Host Network   │      │  K8s Cluster    │
│                 │      │  (vpn0)         │      │  (k8s-imac)     │
└────────┬────────┘      └────────┬────────┘      └────────┬────────┘
         │                        │                        │
         │  1. Connect to         │                        │
         │  100.119.133.35:4318   │                        │
         │───────────────────────►│                        │
         │  (default gw:          │                        │
         │   172.17.0.1)          │                        │
         │                        │                        │
         │                        │  2. Host routing:      │
         │                        │  100.x.x.x → vpn0      │
         │                        │───────────────────────►│
         │                        │     VPN (WireGuard)    │
         │                        │                        │
         │                        │  3. Response           │
         │                        │◄───────────────────────│
         │  4. Return to          │                        │
         │  devcontainer          │                        │
         │◄───────────────────────│                        │
         │                        │                        │
```

**Case 2: Traffic to public internet (github.com)**

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  Devcontainer   │      │  Host Network   │      │  Internet       │
│                 │      │  (eth0/wifi)    │      │  (github.com)   │
└────────┬────────┘      └────────┬────────┘      └────────┬────────┘
         │                        │                        │
         │  1. Connect to         │                        │
         │  140.82.121.4:443      │                        │
         │───────────────────────►│                        │
         │  (default gw:          │                        │
         │   172.17.0.1)          │                        │
         │                        │                        │
         │                        │  2. Host routing:      │
         │                        │  default → eth0/wifi   │
         │                        │───────────────────────►│
         │                        │     Normal Internet    │
         │                        │                        │
         │                        │  3. Response           │
         │                        │◄───────────────────────│
         │  4. Return to          │                        │
         │  devcontainer          │                        │
         │◄───────────────────────│                        │
         │                        │                        │
```

### Summary Table

| Traffic Type | DNS Resolution | Routing Path |
|--------------|----------------|--------------|
| `*.sovereignsky.no` | Internal DNS → VPN IP (100.x.x.x) | Docker bridge → Host → vpn0 → k8s |
| `*.taile269d.ts.net` | Internal DNS → VPN IP (100.x.x.x) | Docker bridge → Host → vpn0 → VPN node |
| Public internet | Internal DNS → Google DNS → Public IP | Docker bridge → Host → eth0/wifi → Internet |

### Key Configuration Points

**Devcontainer requirements:**
```json
// devcontainer.json
{
  "runArgs": [
    "--dns=172.17.0.1"    // Use SovereignSky Internal DNS
  ]
}
```

**SovereignSky requirements:**
```yaml
# docker-compose.yml
services:
  sovereignsky:
    network_mode: host      # Share host network (required for Tailscale routing)
    cap_add:
      - NET_ADMIN           # Required for Tailscale
```

**dnsmasq configuration:**
```conf
# sovereignsky.conf
server=8.8.8.8                              # Upstream for public DNS
address=/.sovereignsky.no/100.119.133.35    # All *.sovereignsky.no → k8s-imac
```

---

## Responsibility Boundary

| Layer | Responsibility | Owner |
|-------|---------------|-------|
| Devcontainer | Send telemetry to `otel.sovereignsky.no:4318` | Developer |
| SovereignSky | DNS, OTel enrichment, Grafana proxy, Docker discovery, **owns developer identity** | Integration Team |
| K8s Cluster | Store/query telemetry, Grafana dashboards | Cluster Team (cluster-llm) |

**Key principle:** Developers don't need to know about Tailscale, k8s, or cluster configuration. They just:
1. Configure SovereignSky once with their email
2. Send telemetry to `otel.sovereignsky.no:4318`
3. Open `localhost:19000` to see the portal with all available services

---

## Identity Architecture (Simplified)

### Core Principle: SovereignSky Owns Developer Identity

**SovereignSky is configured ONCE per machine with developer email. Devcontainers don't need to know who the developer is.**

```
┌─────────────────────────────────────────────────────────────────────────┐
│ DEVELOPER'S MACHINE                                                      │
│                                                                          │
│  SOVEREIGNSKY CONTAINER (one per machine)                               │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Identity Config (set ONCE, stored in volume):                      │ │
│  │                                                                    │ │
│  │   DEVELOPER_EMAIL=terje@company.com     ← From config file         │ │
│  │   MACHINE_NAME=mint-macbookair          ← From host env/build arg  │ │
│  │   MACHINE_OS=linux                      ← From host env/build arg  │ │
│  │                                                                    │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                              │                                           │
│                    Docker Socket (discovery)                             │
│                              │                                           │
│  ┌───────────────────────────┼───────────────────────────────────────┐  │
│  │                           ▼                                        │  │
│  │  DEVCONTAINER 1                    DEVCONTAINER 2                 │  │
│  │  name: project-alpha               name: my-experiments           │  │
│  │  (has git repo)                    (no repo, just folder)         │  │
│  │                                                                    │  │
│  │  Sends to :4318                    Sends to :4318                 │  │
│  │  (no identity config needed)       (no identity config needed)    │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  SovereignSky enriches ALL telemetry with:                              │
│    developer_email: terje@company.com    (from SovereignSky config)     │
│    machine_name: mint-macbookair         (from SovereignSky config)     │
│    container_name: project-alpha         (from Docker API)              │
└─────────────────────────────────────────────────────────────────────────┘
```

### Identity Variables

| Variable | Where Set | Where Stored | Example |
|----------|-----------|--------------|---------|
| `DEVELOPER_EMAIL` | SovereignSky config file | Volume mount | `terje@company.com` |
| `MACHINE_NAME` | Build arg from host | Container env | `mint-macbookair` (Linux), `NRX-PF5FWHPC` (Windows) |
| `MACHINE_OS` | Build arg from host | Container env | Derived from which DEV_* vars are set |
| `container_name` | Docker (from devcontainer) | Docker API | `dev-project-alpha` |

### Host Identity via Build Args (from devcontainer-toolbox pattern)

SovereignSky captures host info at build time via `devcontainer.json` build args:

```json
// devcontainer.json for SovereignSky
{
  "build": {
    "args": {
      // Mac/Linux
      "DEV_MAC_LOGNAME": "${localEnv:LOGNAME}",
      "DEV_MAC_USER": "${localEnv:USER}",
      "DEV_LINUX_LOGNAME": "${localEnv:LOGNAME}",
      "DEV_LINUX_USER": "${localEnv:USER}",
      // Windows
      "DEV_WIN_USERNAME": "${localEnv:USERNAME}",
      "DEV_WIN_COMPUTERNAME": "${localEnv:COMPUTERNAME}",
      "DEV_WIN_USERDOMAIN": "${localEnv:USERDOMAIN}",
      "DEV_WIN_OS": "${localEnv:OS}"
    }
  }
}
```

These become container environment variables:

| Host OS | Variables Available | Machine Name From |
|---------|--------------------|--------------------|
| **Mac** | `DEV_MAC_USER`, `DEV_MAC_LOGNAME` | `hostname` command or config |
| **Linux** | `DEV_LINUX_USER`, `DEV_LINUX_LOGNAME` | `hostname` command or config |
| **Windows** | `DEV_WIN_USERNAME`, `DEV_WIN_COMPUTERNAME`, `DEV_WIN_USERDOMAIN`, `DEV_WIN_OS` | `DEV_WIN_COMPUTERNAME` |

**OS Detection:** If `DEV_WIN_OS` is set → Windows. If `DEV_MAC_USER` is set → Mac. Otherwise → Linux.

### SovereignSky Config File

**Location:** `~/.sovereignsky/config` on host, mounted into container

**Format (simple, Phase 1):**
```bash
# ~/.sovereignsky/config
DEVELOPER_EMAIL=terje@company.com
MACHINE_NAME=mint-macbookair    # Optional - can auto-detect from hostname
```

**Note:** `MACHINE_NAME` can be set explicitly or auto-detected. On Windows, `DEV_WIN_COMPUTERNAME` provides this automatically.

**Future enhancements (Phase 2+):**
- OAuth login via browser
- Tailscale identity integration
- Team/organization from company IdP

### Devcontainer Naming Convention

**Use `dev-` prefix to distinguish devcontainers from other containers:**

```json
// devcontainer.json
{
  "name": "dev-${localWorkspaceFolderBasename}"
}
```

Results in container names like:
- `dev-project-alpha`
- `dev-backend-api`
- `dev-experiments`

**Why the `dev-` prefix?**

SovereignSky sees ALL containers via Docker socket:
```
├── sovereignsky          ← Gateway (ignore)
├── dev-project-alpha     ← Devcontainer ✅
├── dev-backend-api       ← Devcontainer ✅
├── redis                 ← Service (track separately)
├── postgres              ← Database (track separately)
└── nginx                 ← Infrastructure (ignore)
```

Benefits:
- Easy filtering: `container_name =~ "dev-.*"` shows only devcontainers
- Clear distinction between developer workspaces and services
- Grafana dashboards can filter/group by devcontainer vs service
- Project name extracted by removing `dev-` prefix

**Note:** `localWorkspaceFolderBasename` is typically the repo name, but not always (custom folder names, monorepos, scratch projects). It's a *project identifier*, not guaranteed to match the git repo name.

### Container Name Sanitization

SovereignSky sanitizes container names when extracting `project_name`:

**Rules:**
1. Lowercase everything
2. Replace `.` with `-`
3. Strip leading dots (hidden folders)
4. Remove `dev-` prefix to get `project_name`

**Examples:**

| Folder Name | Container Name | project_name |
|-------------|---------------|--------------|
| `my-project` | `dev-my-project` | `my-project` |
| `NRX.Communication` | `dev-nrx-communication` | `nrx-communication` |
| `.devcontainer` | `dev-devcontainer` | `devcontainer` |
| `INT0001017-Contacts-Enrichment` | `dev-int0001017-contacts-enrichment` | `int0001017-contacts-enrichment` |
| `bolt.new-any-llm` | `dev-bolt-new-any-llm` | `bolt-new-any-llm` |

**Length:** Max container name is 63 chars (DNS limit). With `dev-` prefix (4 chars), folder names up to 59 chars are safe. Typical org naming conventions (e.g., `INT0001017-Contacts-Enrichment` at 30 chars) fit easily.

**Duplicate names:** If a developer has two folders with the same name in different locations (e.g., `projects/my-app` and `experiments/my-app`), Docker will auto-rename the second container. SovereignSky tracks by actual container name, so both are handled correctly.

### Multiple Devcontainers

A developer can run multiple devcontainers simultaneously:

```
Developer: terje@company.com
Machine: mint-macbookair

├── sovereignsky                  ← Gateway (knows: terje@company.com)
├── dev-project-alpha             ← Devcontainer 1
├── dev-backend-api               ← Devcontainer 2
├── dev-experiments               ← Devcontainer 3
├── redis                         ← Service (also tracked)
└── postgres                      ← Service (also tracked)
```

All telemetry gets tagged with:
```yaml
# For devcontainers (dev-* prefix)
developer_email: terje@company.com
machine_name: mint-macbookair
container_name: dev-project-alpha
container_type: devcontainer       # SovereignSky adds this based on dev- prefix
project_name: project-alpha        # Extracted from container name

# For services (no dev- prefix)
developer_email: terje@company.com
machine_name: mint-macbookair
container_name: redis
container_type: service
```

### What Devcontainers Need

**Minimal requirements:**
1. DNS pointing to SovereignSky: `--dns=172.17.0.1`
2. OTel endpoint: `OTEL_EXPORTER_OTLP_ENDPOINT=http://otel.sovereignsky.no:4318`

**That's it.** No identity configuration needed in devcontainer.

---

## Components

### 1. Standard Port 4318

**Requirement:** Use OTLP standard port 4318 end-to-end.

```
Devcontainer → otel.sovereignsky.no:4318 → SovereignSky:4318 → k8s:4318
```

**Why:**
- Standard OTel SDK configuration works out of the box
- No port translation confusion
- Industry best practice

**Changes needed:**
- SovereignSky: OTel Collector listens on `0.0.0.0:4318`
- SovereignSky dnsmasq: `otel.sovereignsky.no` → `127.0.0.1` (local)
- K8s Traefik: Add entrypoint on port 4318 (request to cluster-llm)

**Devcontainer config:**
```bash
OTEL_EXPORTER_OTLP_ENDPOINT=http://otel.sovereignsky.no:4318
# Standard - no special configuration needed
```

---

### 2. Dynamic Container Naming Convention

**Algorithm:** `dev-<sanitized-email>-<reponame>`

**Examples:**
| Email | Repo | Container Name |
|-------|------|----------------|
| `terje.christensen@company.com` | `my-project` | `dev-terje-christensen-my-project` |
| `anna.smith@org.no` | `backend-api` | `dev-anna-smith-backend-api` |
| `bob@test.io` | `frontend` | `dev-bob-frontend` |

**Sanitization rules:**
1. Lowercase everything
2. Replace `@` with `-`
3. Replace `.` with `-`
4. Remove other special characters
5. Truncate to 63 characters (Docker limit)

**Where it's set:**
- Devcontainer's `devcontainer.json` or `docker-compose.yml`
- Uses environment variables: `${localEnv:USER}` or `${localEnv:EMAIL}`

**Benefits:**
- SovereignSky can parse container name to extract developer identity
- No need for devcontainer to send identity in every request
- Consistent naming across all developer environments

---

### 3. Docker Socket Discovery

SovereignSky mounts `/var/run/docker.sock` and queries the Docker API to discover:

**What SovereignSky discovers:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Docker Socket API Queries                                       │
│                                                                  │
│  GET /containers/json                                            │
│  ├── Container names (dev-terje-*, dev-anna-*, etc.)            │
│  ├── Container IDs                                               │
│  ├── Image names                                                 │
│  ├── Labels                                                      │
│  ├── Network settings                                            │
│  ├── Created/Started timestamps                                  │
│  └── Status (running, stopped, etc.)                            │
│                                                                  │
│  GET /containers/{id}/stats                                      │
│  ├── CPU usage                                                   │
│  ├── Memory usage                                                │
│  ├── Network I/O                                                 │
│  └── Block I/O                                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Use cases:**
1. **OTel enrichment:** Add container metadata to telemetry
2. **Auto-discovery:** Know which devcontainers are running
3. **Metrics collection:** CPU/memory per container
4. **Session tracking:** Container start/stop events
5. **Health monitoring:** Detect unhealthy containers

**Enrichment from Docker API:**
```yaml
resource:
  attributes:
    - container.name: dev-terje-christensen-myproject
    - container.id: abc123...
    - container.image.name: devcontainer-toolbox:latest
    - developer.email: terje.christensen@company.com  # parsed from name
    - project.name: myproject  # parsed from name
    - sovereignsky.instance: sovereignsky-mint
```

---

### 4. OTel Collector in SovereignSky

**Responsibilities:**
- Receive OTLP on port 4318 (standard)
- Enrich with developer/project identity
- Buffer if network is down
- Forward to k8s cluster

**Key configuration:**
```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318  # Accessible from other containers

processors:
  resource:
    attributes:
      # Add SovereignSky instance identity
      - key: sovereignsky.instance
        value: ${env:TS_HOSTNAME}
        action: upsert
      # Developer identity parsed from container name
      - key: developer.email
        from_attribute: container.name
        action: upsert
        # ... parsing logic

  batch:
    timeout: 10s

exporters:
  otlphttp:
    endpoint: http://k8s-imac.taile269d.ts.net:4318
    # Or via Tailscale DNS once port 4318 is exposed
```

**Buffering for resilience:**
- If k8s is unreachable, buffer locally
- Retry with exponential backoff
- Developers don't lose telemetry during network issues

---

### 5. Nginx Reverse Proxy (Multi-Service)

**Goal:** Developer accesses k8s services via localhost ports.

**Port range 19000-19099** reserved for SovereignSky services:

| Port | Service | Backend | Notes |
|------|---------|---------|-------|
| 19000 | **Portal** | (local static page) | Landing page with links to all services |
| 19001 | Grafana | grafana.sovereignsky.no | Monitoring dashboards |
| 19002 | Open WebUI | openwebui.sovereignsky.no | LLM chat interface |
| 19003 | LiteLLM | litellm.sovereignsky.no | LLM API proxy |
| 19004-19099 | Reserved | - | Future services |

**Why this design?**
- **Port 19000 = Portal** - Developer only needs to remember one port
- Portal shows all available services with clickable links
- No need to memorize individual service ports
- Portal can show service status (up/down)

**Why this port range?**
- Ports 3000, 8080, etc. conflict with common dev tools
- Port range 19000-19099 is high, unlikely to conflict
- Works without elevation on Windows/Mac/Linux
- Easy to remember: "19000 = SovereignSky portal"

```
┌─────────────────────────────────────────────────────────────────┐
│  Developer Browser                                               │
│  http://localhost:19000  → Portal (links to all services)       │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  SovereignSky Nginx (ports 19000-19099 exposed to host)         │
│                                                                  │
│  # Port 19000 - Portal (static landing page)                    │
│  server {                                                        │
│      listen 19000;                                               │
│      root /app/portal;                                          │
│      index index.html;                                          │
│  }                                                               │
│                                                                  │
│  # Port 19001 - Grafana                                         │
│  server {                                                        │
│      listen 19001;                                               │
│      location / {                                                │
│          proxy_pass http://grafana.sovereignsky.no;             │
│          proxy_set_header Host grafana.sovereignsky.no;         │
│          proxy_set_header Authorization "Bearer ${TOKEN}";      │
│      }                                                           │
│  }                                                               │
│                                                                  │
│  # Port 19002 - Open WebUI                                      │
│  server {                                                        │
│      listen 19002;                                               │
│      location / {                                                │
│          proxy_pass http://openwebui.sovereignsky.no;           │
│          proxy_set_header Host openwebui.sovereignsky.no;       │
│      }                                                           │
│  }                                                               │
│                                                                  │
│  # Port 19003 - LiteLLM API                                     │
│  server {                                                        │
│      listen 19003;                                               │
│      location / {                                                │
│          proxy_pass http://litellm.sovereignsky.no;             │
│          proxy_set_header Host litellm.sovereignsky.no;         │
│      }                                                           │
│  }                                                               │
└─────────────────────────────────────────────────────────────────┘

Portal page (http://localhost:19000):
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│   🚀 SovereignSky Developer Portal                              │
│                                                                  │
│   Welcome, terje.christensen@company.com                        │
│   Instance: sovereignsky-mint                                   │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  Available Services                                      │   │
│   ├─────────────────────────────────────────────────────────┤   │
│   │  📊 Grafana          http://localhost:19001    [●]      │   │
│   │     Monitoring dashboards for your containers           │   │
│   │                                                          │   │
│   │  💬 Open WebUI       http://localhost:19002    [●]      │   │
│   │     Chat with LLMs (GPT, Claude, etc.)                  │   │
│   │                                                          │   │
│   │  🤖 LiteLLM API      http://localhost:19003    [●]      │   │
│   │     OpenAI-compatible API endpoint                      │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│   [●] = Service online    [○] = Service offline                 │
│                                                                  │
│   Running containers: 2                                         │
│   - dev-terje-christensen-myproject                            │
│   - dev-terje-christensen-backend                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                               │
                        VPN (WireGuard)
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│  K8s Cluster Services                                            │
│                                                                  │
│  - Grafana (pre-filtered by developer_id)                       │
│  - Open WebUI (LLM chat)                                        │
│  - LiteLLM (API proxy to various LLMs)                          │
│  - Future services...                                            │
└─────────────────────────────────────────────────────────────────┘
```

**Features:**
- Each service on its own port (no path conflicts)
- Automatic Host header injection
- Optional authentication per service
- Developer doesn't need to know about Tailscale/k8s

**Security:**
- Auth tokens managed by SovereignSky
- Data isolation where applicable (Grafana filtered by developer_id)
- Services only accessible via SovereignSky (not directly exposed)

---

## Data Flow

### Telemetry Flow

```
1. Devcontainer app generates telemetry
   └─► OTEL_EXPORTER_OTLP_ENDPOINT=http://otel.sovereignsky.no:4318

2. DNS resolution (via SovereignSky Internal DNS)
   └─► otel.sovereignsky.no → 127.0.0.1 (SovereignSky local)

3. SovereignSky OTel Collector receives
   └─► Queries Docker socket for container metadata
   └─► Enriches with developer_id, project_name, container info

4. SovereignSky forwards to k8s
   └─► k8s-imac:4318 (via Tailscale)

5. K8s OTel Collector receives and stores
   └─► Loki (logs), Tempo (traces), Prometheus (metrics)
```

### Grafana Access Flow

```
1. Developer opens localhost:19000
   └─► SovereignSky Nginx receives request

2. Nginx proxies to Grafana
   └─► grafana.sovereignsky.no (via Tailscale)
   └─► Adds auth token

3. Grafana serves dashboard
   └─► Pre-filtered by developer_id from SovereignSky config
```

---

## SovereignSky Container Components

| Component | Purpose | Port |
|-----------|---------|------|
| VPN (WireGuard) | Secure tunnel to k8s cluster | - |
| Internal DNS | DNS resolution | 53 (172.17.0.1) |
| OTel Collector | Receive, enrich, forward telemetry | 4318 |
| Nginx | Reverse proxy for k8s services | 19000-19099 |
| Supervisor | Process management | - |
| Docker client | Container discovery | socket |

**Process management (Supervisor):**
```
supervisord
├── VPN daemon (WireGuard)
├── Internal DNS
├── otelcol (OTel Collector)
└── nginx (reverse proxy)
```

---

## Migration from devcontainer-toolbox

| Component | Current Location | New Location | Notes |
|-----------|-----------------|--------------|-------|
| OTel Collector | devcontainer | SovereignSky | Centralized enrichment |
| otelcol-lifecycle-config.yaml | devcontainer | SovereignSky | Adapted for central role |
| otelcol-metrics-config.yaml | devcontainer | SovereignSky | System metrics via Docker API |
| Nginx proxy | devcontainer | SovereignSky | For Grafana access |
| Supervisor | devcontainer | SovereignSky | Manage all processes |
| service-otel-monitoring.sh | devcontainer | SovereignSky | Adapted for central role |
| service-nginx.sh | devcontainer | SovereignSky | Simplified for Grafana only |

**What stays in devcontainer:**
- Application code
- Development tools
- Basic networking (`--dns=172.17.0.1`)

**What moves to SovereignSky:**
- All telemetry infrastructure
- All proxy/routing infrastructure
- All identity/enrichment logic

---

## K8s Cluster Requirements

**Request to cluster-llm:**

1. **Add Traefik entrypoint on port 4318**
   - Standard OTLP/HTTP port
   - Route to OTel Collector service

2. **Grafana service account**
   - Read-only token for SovereignSky proxy
   - Scoped to specific dashboards

3. **Pre-built dashboards**
   - Devcontainer overview (filtered by developer_id)
   - Container metrics (CPU, memory, network)
   - Application logs and traces

---

## Open Questions

### Resolved

1. **Developer identity:** ✅ RESOLVED - SovereignSky owns developer identity via config file (`~/.sovereignsky/config`). Devcontainers don't need identity configuration.

2. **Container naming:** ✅ RESOLVED - No special naming convention required. Devcontainers use folder name (`${localWorkspaceFolderBasename}`). SovereignSky enriches all telemetry with developer email from its config.

3. **Multiple devcontainers:** ✅ RESOLVED - Each container gets unique name from folder. All telemetry tagged with same `developer_email` (from SovereignSky) + different `container_name` (from Docker API).

4. **Metrics collection:** ✅ RESOLVED - SovereignSky collects metrics for "everything" in Rancher Desktop via Docker socket API (CPU, memory, network I/O per container).

5. **Offline mode:** ✅ RESOLVED - Buffering is not a priority. If Tailscale is down, telemetry is lost. Acceptable trade-off for simplicity.

6. **Grafana filtering:** ✅ RESOLVED - Option D (Backend Query Filtering) is safest. SovereignSky proxy injects `developer_email` filter into all queries.

   **Security Analysis:**

   | Option | Safe? | Why |
   |--------|-------|-----|
   | A: Nginx URL rewrite | ❌ NO | Developer can change `?var-developer_id=` in URL |
   | B: Dashboard variables | ❌ NO | Developer can select any ID from dropdown |
   | C: Grafana user accounts | ✅ YES | But complex - requires user management |
   | D: Backend query filtering | ✅ YES | **SELECTED** - Cannot be bypassed |

   **Implementation:**
   - SovereignSky config contains `DEVELOPER_EMAIL=terje@company.com`
   - Nginx/proxy inspects Grafana API requests
   - Injects filter into Loki LogQL queries: `{developer_email="terje@company.com"}`
   - Injects filter into Prometheus PromQL queries
   - Transparent to developer - they just see "their" data

---

## Component Analysis: What to Migrate from devcontainer-toolbox

Analysis of `/Users/terje.christensen/learn/projects-2025/devcontainer-toolbox/.devcontainer/additions/` to determine what SovereignSky needs.

### Components to Migrate

| Component | Source File | Needed in SovereignSky | Notes |
|-----------|------------|------------------------|-------|
| **Supervisor** | `config-supervisor.sh` | ✅ YES | Process management + log rotation (10MB max) |
| **docker_stats receiver** | `otel/otelcol-metrics-config.yaml` | ✅ YES | Collects container metrics via Docker socket |
| **Resource processor** | `otel/otelcol-metrics-config.yaml` | ✅ YES | Adds identity labels - adapt for container name parsing |
| **Lifecycle collector** | `service-otel-monitoring.sh` | ✅ YES (modified) | Centralized - receives from devcontainers |
| **Log rotation** | `config-supervisor.sh` | ✅ YES | `stdout_logfile_maxbytes=10MB` prevents disk fill |

### Components NOT Needed

| Component | Source File | Why Not Needed |
|-----------|------------|----------------|
| **script_exporter** | `otel/script-exporter-config.yaml` | Custom scripts expose devcontainer-specific metrics; SovereignSky gets this via Docker API |
| **devcontainer_info script** | `otel/scripts/devcontainer_info.sh` | SovereignSky parses container name instead |
| **k8s_status script** | `otel/scripts/k8s_status.sh` | Maybe useful later for health checks, not priority |
| **Per-container lifecycle collector** | `service-otel-monitoring.sh` | Architecture change: devcontainers send TO SovereignSky |

### Key Architecture Difference

**devcontainer-toolbox (current):**
```
Each devcontainer runs:
- OTel Lifecycle Collector (port 4318) → sends to cluster
- OTel Metrics Collector → monitors itself → sends to cluster
- script_exporter → custom metrics via scripts
```

**SovereignSky (Option B):**
```
SovereignSky runs:
- OTel Lifecycle Collector (port 4318) → RECEIVES from devcontainers → sends to cluster
- OTel Metrics Collector → monitors ALL containers via Docker socket → sends to cluster
- No script_exporter needed (Docker API provides container info)

Devcontainers run:
- Nothing! Just send lifecycle events to otel.sovereignsky.no:4318
```

### Supervisor Configuration for SovereignSky

Based on `config-supervisor.sh`, SovereignSky needs:

```ini
[supervisord]
nodaemon=true
logfile=/var/log/supervisord.log
pidfile=/var/run/supervisord.pid

[program:tailscaled]
command=/usr/sbin/tailscaled --state=/var/lib/tailscale/tailscaled.state
autostart=true
autorestart=true
stdout_logfile=/var/log/tailscaled.log
stdout_logfile_maxbytes=10MB
stderr_logfile=/var/log/tailscaled.err
stderr_logfile_maxbytes=10MB

[program:dnsmasq]
command=/usr/sbin/dnsmasq -k
autostart=true
autorestart=true
stdout_logfile=/var/log/dnsmasq.log
stdout_logfile_maxbytes=10MB

[program:otelcol]
command=/usr/local/bin/otelcol --config=/etc/otel/config.yaml
autostart=true
autorestart=true
stdout_logfile=/var/log/otelcol.log
stdout_logfile_maxbytes=10MB
stderr_logfile=/var/log/otelcol.err
stderr_logfile_maxbytes=10MB

[program:nginx]
command=/usr/sbin/nginx -g "daemon off;"
autostart=true
autorestart=true
stdout_logfile=/var/log/nginx-access.log
stdout_logfile_maxbytes=10MB
stderr_logfile=/var/log/nginx-error.log
stderr_logfile_maxbytes=10MB
```

### OTel Collector Config for SovereignSky

Based on `otel/otelcol-metrics-config.yaml`, key receivers needed:

```yaml
receivers:
  # Receive lifecycle events from devcontainers
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318

  # Collect metrics from ALL containers via Docker socket
  docker_stats:
    endpoint: unix:///var/run/docker.sock
    collection_interval: 10s
    timeout: 5s
    api_version: 1.24
    metrics:
      container.cpu.usage.total:
        enabled: true
      container.memory.usage.total:
        enabled: true
      container.network.io.usage.rx_bytes:
        enabled: true
      container.network.io.usage.tx_bytes:
        enabled: true

processors:
  # Enrich with identity parsed from container name
  resource:
    attributes:
      - key: sovereignsky.instance
        value: ${env:TS_HOSTNAME}
        action: upsert
      # Developer identity extracted from container name pattern:
      # dev-<sanitized-email>-<reponame>

  batch:
    timeout: 10s

exporters:
  otlphttp:
    endpoint: http://k8s-imac.taile269d.ts.net:4318
```

---

## Implementation Stages

### Stage 1: Port 4318 & Basic OTel
- Request cluster-llm to add port 4318
- Add OTel Collector to SovereignSky
- Test basic forwarding

### Stage 2: Docker Socket Discovery
- Mount Docker socket in SovereignSky
- Implement container discovery
- Add enrichment based on container name

### Stage 3: Grafana Proxy
- Add Nginx to SovereignSky
- Configure Grafana proxy
- Test developer access

### Stage 4: Full Integration
- Dashboard templates
- Documentation for developers
- Migration guide from devcontainer-toolbox

---

## Future Enhancements

### PAC File for Clean URLs (Optional)

Instead of accessing services via port numbers (`localhost:19001`, `localhost:19002`), developers can configure a PAC (Proxy Auto-Configuration) file to use clean domain names.

**Without PAC:**
```
localhost:19000  → Portal
localhost:19001  → Grafana
localhost:19002  → Open WebUI
localhost:19003  → LiteLLM
```

**With PAC:**
```
grafana.sovereignsky.no    → Grafana
openwebui.sovereignsky.no  → Open WebUI
litellm.sovereignsky.no    → LiteLLM
```

**How it works:**

1. Developer configures browser to use PAC file (one-time setup)
2. PAC file routes `*.sovereignsky.no` to `localhost:19000`
3. SovereignSky Nginx routes by Host header to correct backend

**PAC file example:**
```javascript
function FindProxyForURL(url, host) {
    if (dnsDomainIs(host, ".sovereignsky.no")) {
        return "PROXY localhost:19000";
    }
    return "DIRECT";
}
```

**Nginx configuration (single port, host-based routing):**
```nginx
server {
    listen 19000;
    server_name grafana.sovereignsky.no;
    location / {
        proxy_pass http://100.119.133.35;
        proxy_set_header Host grafana.sovereignsky.no;
    }
}

server {
    listen 19000;
    server_name openwebui.sovereignsky.no;
    location / {
        proxy_pass http://100.119.133.35;
        proxy_set_header Host openwebui.sovereignsky.no;
    }
}
```

**Benefits:**
- Clean, memorable URLs
- Only one port (19000) needs to be exposed
- Same URLs work in documentation and bookmarks

**Trade-offs:**
- Requires one-time browser configuration per developer
- Not all applications respect PAC settings (browsers do, some CLIs don't)

**Priority:** Low - Nice to have after core functionality is working.

---

## References

- Current SovereignSky: `sovereignsky-container/`
- devcontainer-toolbox OTel: `/Users/terje.christensen/learn/projects-2025/devcontainer-toolbox/.devcontainer/additions/otel/`
- devcontainer-toolbox Nginx: `/Users/terje.christensen/learn/projects-2025/devcontainer-toolbox/.devcontainer/additions/nginx/`
- Cluster communication: `securenet-docs/talk.md`
