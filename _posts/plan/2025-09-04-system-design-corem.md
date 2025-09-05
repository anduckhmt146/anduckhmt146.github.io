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

## 2.3. Consistency and Availability

1. **CAP Theory:**

- Consistency: read receive most recent write or error.

- Availability: request must receive response.

- Partition Tolerance: the system continue to operate despite a partitioning failed by network error.

2. **CP - consistency and partition tolerance:**

- Waiting a response from parititoned node => timeout error.

- Use cases: MySQL DBMS.

- **Notes:** Have timeout error => Must be C.

3. **AP - availability and partition tolerance**

- Response can return from any node => data might not be the latest.

- Use cases: Eventually consistency system.

4. **CA - consistency and availability:**

- Due to the network is unreliable, so we can not make sure partition tolerant work on-time.

- CA only happens in single-node.

## 2.4. Performance vs scalability

- If you have a performance problem, your system is slow for a single user.

- If you have a scalability problem, your system is fast for a single user but slow under heavy load.

=> Performace is latency for a user, scalability is latency for heavy-load.

## 2.5. Latency vs throughput

- Latency is the time to perform some action or to produce some result.

- Throughput is the number of such actions or results per unit of time.

=> Maximize throughput with acceptable latency.

# 3. System Design Components

## 3.1. DNS

- Hierachical and decentralized naming system.

![](/images/System-Design/Concepts/DNS.png)

### 3.1.1. Resolver Process

- Step 1: Query to Root server first => (.com, .net, .org,...) => Send it to TLD nameserver.

- Step 2: TLD nameserver resolve by .com, .net => generate top-level domains (.com, .org, .edu) and country code top-level domains (.us, .uk,...) => Send it to Authoritative DNS server.

- Step 3: Authoritative DNS server resolve in nearest geography resolve it in DNS A record, CNAME record => return IP address, else fallback to NXDOMAIN message.

### 3.1.2. Query Type

1. **Recursive:**

- If it has the result cached → returns it.
- If not → it contacts other DNS servers on your behalf (root → TLD → authoritative).
- It only returns the final answer (or an error) to you.
- Pros: Simple for the client (only one request).
- Cons: More load on the recursive resolver.

2. **Iterative:**

- It asks a root server → gets referral to TLD server.
- It asks the TLD server → gets referral to authoritative server.
- It asks the authoritative server → finally gets the IP.
- Pros: Client has more control.
- Cons: More requests to multiple DNS server.

3. **Non-recursive**

- Query from local cache.

- Static IP: config static.

- Dynamic IP: using DHCP.

- Every DNS response includes a TTL (set by the domain owner in their authoritative DNS), your resolver caches it for at most 300 seconds (5 min).

- Worst case: connections fail until TTL expires.

### 3.1.3. Record Types

- A (Address record): hold IPv4 of a domain.

- AAAA (IP Version 6 Address record): hold IPv6 of a domain.

- CNAME (Canonical Name): This domain name is just another name for that domain.

```bash
www.example.com CNAME example.com.
```

- MX (Mail exchanger record): which mail server(s) are responsible for receiving email for a domain.

- TXT (Text Record): this is a DNS record used to store arbitrary text information about a domain.

- NS (Name Server records): Specifies the authoritative name servers for a domain.

```bash
example.com.   IN NS   ns1.exampledns.com.
example.com.   IN NS   ns2.exampledns.com.
```

- SOA (Start of Authority): Defines important administrative information for a DNS zone.

```bash
example.com. IN SOA ns1.exampledns.com. admin.example.com. (
               2025090501 ; serial
               7200       ; refresh
               3600       ; retry
               1209600    ; expire
               86400 )    ; minimum TTL
```

- SRV (Service Location record): Specifies the location (hostname + port) of specific services (e.g., SIP, XMPP, LDAP).

- PTR (Reverse-lookup Pointer record): Maps an IP address → domain name (reverse DNS lookup).

```bash
10.2.0.192.in-addr.arpa.   IN PTR   mail.example.com.
```

- CERT (Certificate record): Stores cryptographic certificates (PKIX, PGP, SPKI) in DNS.

### 3.1.4. Subdomains

- A subdomain is an additional part of our main domain name. It is commonly used to logically separate a website into sections.

- Each subdomain can have its own DNS records, independent of the root domain.

### 3.1.5. DNS Zones

- A domain (like example.com) can be split into multiple zones, or all records can live in one zone.

- You can delegate a subdomain to a different zone.

=> Manage in different authoritative name servers.

### 3.1.6. DNS Caching

- A DNS cache (sometimes called a DNS resolver cache) is a temporary database, maintained by a computer's operating system that contains records of all the recent visits and attempted visits to websites and other internet domains.

- The Domain Name System implements a time-to-live (TTL) on every DNS record.

=> Store in local computer.

### 3.1.7. Reverse DNS

- Normally, DNS resolution goes:

```bash
domain → IP (via A/AAAA records).
```

- Reverse DNS does the opposite:

```bash
IP → domain (via PTR records).
```

- Look up in PTR (Reverse-lookup Pointer record)

```bash
192.0.2.10 -> 10.2.0.192.in-addr.arpa

10.2.0.192.in-addr.arpa. IN PTR mail.example.com
```

Result;

```bash
192.0.2.10 -> mail.example.com
```

- Use cases: Email servers check and see if an email message came from a valid server before bringing it onto their network

- If IP do not have DNS => it map the IP to NXDOMAIN.

# 4. System Design Dive Deep

# 5. Cloud Components

# 6. Well-architected Cloud Principle
