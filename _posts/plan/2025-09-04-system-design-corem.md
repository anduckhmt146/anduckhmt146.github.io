---
layout: post
title: C.R.O.E.M System Design
date: 2025-09-04
categories: plan
---

# 1. Why to use C.O.R.E.M

- C: Constrain

- O: Outline the high-level blueprint.

- R: Refine for reality.

- E: Eveluate the trade-offs about 6 pillars.

- M: Measure

# 2. C - Contrain

- Scope, Scale, Security.

- Functional, Non-functional

- Empathy-driven design.

# 3. O - Outline high-level blueprint

- Data

- APIs

- Services: service boundary

# 4. R - Refine for Reality:

## 4.1. Scaling

1. Load Balancing: Your First Step to Scaling

2. Caching: The Art of Reducing Latency

3. Content Delivery Networks (CDNs): Bringing Data Closer to the User

4. Database Scaling Part 1: Replication and Read Replicas

5. Database Scaling Part 2: Sharding and Federation

## 4.2. Handling Exception

1. Message Queues: Decoupling Your Services for High Availability

2. Redundancy and Failover: Eliminating Single Points of Failure

3. The Circuit Breaker Pattern: Preventing Cascading Failures

## 4.3. Security

1. Authentication vs. Authorization: Who Are You and What Can You Do?

2. A Practical Look at OAuth 2.0

3. The API Gateway: Your System's Fortified Front Door

# 5. M - Measure

1. Logging

2. Metrics

3. Tracing.

4. Dashboards and Alerting
