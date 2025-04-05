---
layout: post
title: 'System Design Concepts - High-level Component'
date: 2025-04-05
categories: tech
---

Here is the component of the system design framework, it provides a systematic thinking approach to system design.

![System Design Images](/images/system-design-primer-copy.png)

To simplify the design process, we should design each layer in the following order:

**Client -> Load Balancer -> Web Server (API) -> Storage.**

- For Read API, we need Cache.

- For Write API, we need SQL Master/Slave.

- For API Async, such as worker -> We need queue.

- For API need service communication, we use grpc DNS, queue, distributed cache.

![System Design Template](/images/system-design-mindmap.png)

Reference: [https://medium.com/coders-mojo/day-19-of-system-design-series-system-design-important-terms-45002fbbb789](https://medium.com/coders-mojo/day-19-of-system-design-series-system-design-important-terms-45002fbbb789)

# 1. Client

## 1.1. DNS

- Research about DNS - updated later

## 1.2. CDN

- Research about CDN - updated later

# 2. Load Balancer

## 2.1. Layer 4

- Research about Load Balancer - updated later

## 2.2. Layer 7

- Research about Load Balancer - updated later

## 2.3. Reverse Proxy

- Research about Load Balancer - updated later

## 2.4. Active-Active

- Research about Load Balancer - updated later

## 2.5. Active-Passive

- Research about Load Balancer - updated later

# 3. Web Server

## 3.1. Read API

- Research about Read API - updated later

## 3.2. Write API

- Research about Write API - updated later

## 3.3. Write async API

- Research about Write async API - updated later

## 3.4. Worker

- Research about Worker - updated later

# 4. Caching:

## 4.1. Memcached

- Research about Memcached - updated later

## 4.2. Distributed Cache - Redis

- Research about Redis - updated later

# 5. Database

## 5.1. SQL

- Research about SQL - updated later

## 5.2. SQL Write Master-Slave

- Research about SQL Write Master-Slave - updated later

## 5.3. SQL Read Replication

- Research about SQL Read Replication - updated later

## 5.4. SQL Sharding

- Research about SQL Sharding - updated later

## 5.5. SQL Partitioning

- Research about SQL Partitioning - updated later

## 5.6. SQL Federation

- Research about SQL Federation - updated later

## 5.7. NoSQL

- Research about NoSQL - updated later

# 6. Storage

## 6.1. Object Storage

- Research about Object Storage - updated later

## 6.2. File Storage

- Research about File Storage - updated later

# 7. Queue

## 7.1. Message Queue

- Research about Message Queue - updated later

## 7.2. Pub-sub

- Research about Pub-sub - updated later

# 8. Non-functional requirements

## 8.1. Performance & Scalability

- Research about Performance & Scalability - updated later

## 8.2. Availability & Consistency

- Research about Availability & Consistency - updated later

## 8.3. Latency & Throughput

- Research about Latency & Throughput - updated later

# 9. Protocol

## 9.1. REST

- Research about REST - updated later

## 9.2. GRPC

- Research about GRPC - updated later

## 9.3. WebSocket

- Research about WebSocket - updated later

## 9.4. GraphQL

- Research about GraphQL - updated later
