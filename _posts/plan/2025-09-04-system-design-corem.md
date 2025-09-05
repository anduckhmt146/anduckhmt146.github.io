---
layout: post
title: System Design C.O.R.E.M and Cloud Principles
date: 2025-09-04
categories: plan
---

# 1. C.O.R.E.M Principle

- C: Constrain

- O: Outline the high-level blueprint.

- R: Refine for reality.

- E: Eveluate the trade-offs about 6 pillars.

- M: Measure

## 1.1. C - Contrain

- Scope, Scale, Security.

- Functional, Non-functional

- Empathy-driven design.

## 1.2. O - Outline high-level blueprint

- Data

- APIs

- Services: service boundary

## 1.3. R - Refine for Reality:

### 1.3.1. Scaling

1. Load Balancing: Your First Step to Scaling

2. Caching: The Art of Reducing Latency

3. Content Delivery Networks (CDNs): Bringing Data Closer to the User

4. Database Scaling Part 1: Replication and Read Replicas

5. Database Scaling Part 2: Sharding and Federation

### 1.3.2. Handling Exception

1. Message Queues: Decoupling Your Services for High Availability

2. Redundancy and Failover: Eliminating Single Points of Failure

3. The Circuit Breaker Pattern: Preventing Cascading Failures

### 1.3.3. Security

1. Authentication vs. Authorization: Who Are You and What Can You Do?

2. A Practical Look at OAuth 2.0

3. The API Gateway: Your System's Fortified Front Door

## 1.4. E - Evaluate the Trade-offs

1. There are always have trade-offs.

2. Using a Trade-off Matrix to Justify Your Decisions

3. The CAP theory

## 1.5. M - Measure

1. Logging

2. Metrics

3. Tracing.

4. Dashboards and Alerting

## 1.6. Detail Interview Questions

# 2. System Design Principles

## 2.1. Consistency Patterns

1. **Weak consistency:**

- After write, reads may or may not see it, no guarantee when to see it, only when the system try to make new requests => maybe the system serves stale data indefinately.

- Example: Memcached, it work in real-time use cases: VoIP, video chat, real-time multilayer games.

2. **Eventual consistency:**

- After write, reads will eventually see it (typically within miliseconds). Data is replicas asynchronusly.

- Example: Read replicas, DNS.

3. **Strong consistency:**

- After write, reads will see it. Data is replicated synchronuosly.

- Example: RDBMS

## 2.2. Availability Patterns

### 2.2.1. Fail-over:

1. **Active-passive:**

- Depend on hot or cold standby.
- It also be called master-slave failover.
- Example: MySQL DBMS, based on master-slave.

2. **Active-active:**

- Both servers are managing traffic, spreading the load between them.
- It also be called master-master failover.
- Example: NoSQL DBMS, Cassandra, DynamoDB, based on master-master.

### 2.2.2. Replication:

1. **Master-slave replication:**

- Master: client write to master => sync data **asychronously** to slaves.
- Slaves: serve only read for client.
- If the master goes down, the system allow **read-only** mode in slaves => Until a slave is promoted to a new master.

2. **Master-master replication:**

- Master: client write to master => sync data **asychronously** to other master.
- If a master goes down, the system can operate both read and write operations.
- Cons: Violate ACID pricinple, conflict resolution.

3. **Disadvantages bor both:**

- Loss data: can happened when master write data.

- Write multiple data => stuck the read replicas.

- More read replicas, the more you have to replicate => replica lag.

- Costly and Complexity.

### 2.2.3. Availability in numbers

1. **99.9% availability - three 9s**

- Downtime per year: 8h 45min 57s
- Downtime per month: 43m 49.7s
- Downtime per week: 10m 4.8s
- Downtime per day: 1m 26.4s

2. **99.99% availability - four 9s**

- Downtime per year: 52min 35.7s
- Downtime per month: 4m 23s
- Downtime per week: 1m 5s
- Downtime per day: 8.6s

3. **Calculate availability**

- **In sequence:**

```bash
Availability (Total) = Availability (Foo) * Availability (Bar)
```

- **In parallel:**

```bash
Availability (Total) = 1 - (1 - Availability (Foo)) * (1 - Availability (Bar))
```

# 3. System Design Components

# 4. System Design Dive Deep

# 5. Cloud Components

# 6. Well-architected Cloud Principle
