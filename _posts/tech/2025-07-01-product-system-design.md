---
layout: post
title: Product System Design
date: 2025-07-01
categories: tech
---

Here is some note for product system design.

# 1. Bit-ly

- Applying CQRS seperate read-write pattern.

- Using auto increment Redis + base62 [A-Z] [a-z] [0-9] hasing pattern.

- Centralize the distributed Redis Counter -> Make sure the url-id is unique across multiple instances.

- To achieve 10M rps, using multiple layer cache: CDN > Redis > Horizontal Scaling (Stateless).

- Algorithm of Hashing
    - Hex: [0–9] [a–f]
    - Base64: [A–Z] [a–z] [0–9] [+ /]

![](/images/System-Design/Product/bit-ly.png)