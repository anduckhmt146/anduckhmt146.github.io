---
layout: post
title: Principle Software Architect
date: 2025-08-20
categories: tech
---

# 1. Principle Design

![](/images/Software-Architect/Principles/principle.png)

# 2. Trade-off

![](/images/Software-Architect/Principles/trade-off.jpeg)

# 3. Focus Point

## 3.1. Layer Design

- Focus on each layer, higher layer only depend on the lower level.

## 3.2. Modular Design

- Each module is independent developed components.

- Each module can interconnected with other modules.

## 3.3. Domain-Driven Design

- Focus on business core.

- Use bounded contexts to seperate domains.

## 3.4. Event Driven Architecture:

- Communicate via events, not direct calls.

## 3.5. Service-Oriented Design

- Design microservices to calling each others.

## 3.6. User-Centered Design

- Design based on user interaction.

# 4. Sample Architecture

## 4.1. SaaS Platform Architecture

- Microservices with API Gateway.

- Authenticate with OAuth2, SSO.

- RBAC.

- Background job processing (emails, reports).

- Stripe or Razorpay integration for billing.

- Logging, Monitoring using ELK, Grafana.

## 4.2. eCommerece Platform

- Modular Services: Catalog, Cart, Order, Payment, Delivery.

- Redis-based caching for product search.

- Event-driven checkout and order placement.

- External Integration: Payment Gateway, shipping API.

- Elastic search for search and filtering.

- CDN for media assets.

## 4.3. Banking/ Fintech Architecture

- Hexagon Architecture: strong boundary enforcement.

- Encryption at rest and transit: KMS, TLS.

- Real-time fraud detection using asynchronus processing.

- Event sourcing and auto logging.

- Mobile first client apps with biometric auth.

- KYC, RBI,...

# 5. Design Security

## 5.1. Principle of Least Privilege

- A database read-only replca should only have read access.

## 5.2. Fallback Securely

- Always have fallback mechanism and sanitize error messages.

## 5.3. Use multi defense layer

- Multiple secure layers: Firewall, authentication, encryption, rate limiting.

## 5.4. Using secure defaults of platforms.

- The default configuration of the systems should be the most secure one.

## 5.5. Minimize attack surface

- Do not expose admin aPI on public network.

- Always route to API gateways.
