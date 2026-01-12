---
title: "Developer Guide"
description: "Getting started with SecureNet - configuration and usage"
date: 2025-12-10
weight: 10
tags: ["devcontainer", "DNS", "configuration", "setup"]
categories: ["Guides"]
aliases:
  - /projects/securenet/developer-guide/
---

# SovereignSky: Developer Guide

## Quick Start

Add DNS configuration to access internal services.

### Devcontainer

In `devcontainer.json`:
```json
{
  "runArgs": ["--dns=172.17.0.1", "--dns=8.8.8.8"]
}
```

### Docker Compose

```yaml
services:
  myapp:
    dns:
      - 172.17.0.1
      - 8.8.8.8
```

### Docker CLI

```bash
docker run --dns=172.17.0.1 --dns=8.8.8.8 myimage
```

### Kubernetes

No configuration needed.

---

## Internal Services

Access via `*.sovereignsky.no`:

| Service | URL |
|---------|-----|
| Grafana | `http://grafana.sovereignsky.no` |
| API | `http://api.sovereignsky.no` |
| Docs | `http://docs.sovereignsky.no` |

---

## Troubleshooting

**Internal services not reachable?**
→ Start the SovereignSky container

**Internet not working?**
→ Check your network connection (SovereignSky doesn't affect internet access)
