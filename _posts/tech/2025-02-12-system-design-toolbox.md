---
layout: post
title: 'System Design: Toolbox'
date: 2025-02-12
categories: tech
---

Here is something I will note for Technological Toolbox in the book "System Design Fundamentals", but I haven't start :)

![Ảnh](/images/system-design.jpg)

# 1. Back-of-the-Envelope Math

## What is the Purpose?

## Do I Need to Do Math?

## Types of Back-of-the-Envelope Calculations

## Back-of-the-Envelope Calculation Techniques

## Common Mistakes

# 2. API Design

## Idempotency

## Client vs Server Generated Data

## Efficiency

## Correctness

## Focus on the Core

# 3. Schema Design

## Defining Schemas

# 4. Indexing Strategies

## What is Indexing?

## Primary Index

## Secondary Index

## Index Use Cases

### Key or Attribute Lookup

### Range Lookup

### Prefix Search

### Composite Index

### Geo Index

# 5. Databases

## Definition

## Purpose

## How Do I Choose a Database?

## Types of Databases

### Relational Database

### Document Store

### Columnar Store

### Object Store

### Wide Column Store

### Reverse Index Store

### In-Memory Store

### Geo-Spatial Databases

### ZooKeeper

# 6. Real-Time Data Update

## Use Case

## Short Poll

## Long Poll

## Server-Sent Event

## WebSocket

## How to Pick a Protocol

## How to Scale WebSockets

## WebSocket Load Balancer

## Is Connection Still Alive?

# 7. Concurrency Control and Transaction

## Definition

## Purpose and Examples

## Single Thread

## Single Thread Micro Batch

## Partition Into Multiple Serial Processing

## Pessimistic Locking

## Optimistic Locking

## Change Product Requirement to Simplify

## How to Pick a Concurrency Strategy

# 8. Replication

## Definition

## Purpose and Examples

## Leader-Follower Replication

## Leader-Leader Replication

## Leaderless Replication

## How to Pick a Replication Strategy

## What Should Be My Replication Factor?

# 9. Sharding Strategies

## Definition

## Purpose and Examples

## Vertical Sharding

## Horizontal Sharding

## Hash Key

## Range Key

## Other Data Structures

## Outlier Keys

## Geo-Shards

## Sharding Considerations

## Making the Final Recommendation

# 10. Cache Strategies

## Definition

## Purpose and Examples

### Improve Latency

### Improve Throughput

### Improve Bandwidth

## Cache Considerations

### Cache Hit Rate

### What Are You Caching?

### Write to Cache

### Cache Invalidation

### Cache Eviction

### Failure Scenario and Redundancy

### Data Structure

### Thundering Herd

# 11. Asynchronous Processing

## Definition

## Purpose

## Synchronous and Asynchronous

## Reasons for Asynchronous Processing

## The Nature of the Job is Asynchronous

## The Processing Time is Indeterministic

## The Processing Time is Long-Running

## Improve Perceived Latency

# 12. Batch Processing

## Purpose

## Build Reverse Index for Search

## Word Count for Document

## Considerations

# 13. Stream Processing

## Purpose

## System is Down

## Late and Out of Order Events

## Watermark

## Checkpointing

## Batch Size

# 14. Lambda Architecture

## Batch vs Stream Processing

### Data is Enormous

### Compute Intensive

### Complexity of Streaming

### Use Case

## Lambda Architecture

# 15. Queue

## Message Queue

## Publisher Subscriber

## Delivery Semantics and Guarantees

## Custom Queue

# 16. Conflict Resolution

## Last Write Wins

## Conflict-Free Replicated Data Type (CRDT)

## Keep Records of the Conflict

## Custom Conflict Resolution

# 17. Security

## API Security Considerations

## Man in the Middle Attack

## Authentication

# 18. Timeout

# 19. Exponential Backoff

# 20. Buffering

# 21. Sampling

# 22. ID Generator

## UUID

## Auto Increment

## Auto Increment Multiple Machines

## Strongly Consistent and Fault Tolerant

## Distributed Roughly Sorted ID

## Offline Generation

## Custom ID

# 23. Compression

## Lossless vs Lossy

## Compression Efficiency

## Quality of File

## Computing Time to Compress a File

## Compatibility of Devices

## Compressed File Usage

# 24. Pass Only Needed Data

## Filtering

## Pass Chunk Delta with Rsync

# 25. Fail to Open

# 26. Distributed Transaction

## Money Transfer

## Blob Storage and Metadata Storage

## Third Party Data Source

## Database and Queue

## Cache and Storage Update

## Abstract Design Choices

# 27. Cold Storage

# 28. Networking

## IP and Port

## Domain Name System (DNS)

## How to Route to the Closest Region

## OSI Model

# 29. API Gateway

# 30. Content Delivery Network

## Improve Latency

## Reduce Bandwidth

## Better Availability with Redundancy

## CDN Considerations

# 31. Monitoring

## Latency

## QPS

## Error Rate

## Storage

## Metrics Count

# 32. Full-Text Search

## Text to Token Path

## Normalize Step

## Tokenize Step

## Remove Stop Words Step

## Stemming

## Indexing

## N-Gram

## Search Query

## Ranking

## Data Source and Indexing Pipeline

# 33. Service Discovery and Request Routing

## Load Balancing

## Shard Discovery

# 34. Product Solutions
