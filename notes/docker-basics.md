---
title: Docker Basics
slug: docker-basics
created: 2026-09-15T20:16:28
tags: DevOps, System-Design
---

# Docker Basics

Docker packages an application and its dependencies into a container for
consistent deployment across environments.

```bash
docker build -t noteflow .
docker run -p 5000:5000 noteflow
```

For orchestrating many containers in production, teams often move to
kubernetes, which also plays a role in a bigger system design picture
(load balancer, scalability, etc).
