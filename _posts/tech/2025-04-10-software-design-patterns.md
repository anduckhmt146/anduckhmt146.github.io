---
layout: post
title: Software Design Patterns
date: 2025-04-10
categories: tech
---

Here is some common design patterns in cloud architecture, applying to design software to fulfill with 5 well-architectured pillar: Reliability, Security, Performance Efficiency, Cost Optimization, Performance Efficiency

Ref: [https://learn.microsoft.com/en-us/azure/architecture/patterns/](https://learn.microsoft.com/en-us/azure/architecture/patterns/)

# 1. Routing Pattern

![](/images/global-request-azure.png)

1. The user issues an HTTP or HTTPS request to an Azure Front Door endpoint.

2. The WAF rules are evaluated. Rules that match are always logged. If the Azure Front Door WAF policy mode is set to prevention and the matching rule has an action set to block on anomaly, the request is blocked. Otherwise, the request continues or is redirected, or the subsequent rules are evaluated.

3. The route configured in Azure Front Door is matched and the correct origin group is selected. In this example, the path was to the static content in the website.

4. The origin is selected from the origin group.

   - In this example, the health probes deemed the website unhealthy, so it's eliminated from the possible origins.
   - This website is selected.

5. The request is routed to the Azure storage account via Private Link over the Microsoft backbone network.

# 2. Ambassador (Proxy)

![](/images/ambassador-example.png)

Create helper services that send network requests on behalf of a consumer service or application. An ambassador service can be thought of as an out-of-process proxy that is co-located with the client.

**Advantageous:**

- **Reliability**: The network communications mediation point facilitated by this pattern provides an opportunity to add reliability patterns to network communication, such as retry or buffering.

- **Security**: This pattern provides an opportunity to augment security on network communications that couldn't have been handled by the client directly.

**Pros:**

- Monitoring and Managing APIs, implementing mechanism like circuit breaker, retry, failover routing,...

**Cons:**

- Make API high latency because calling to proxy but not call service directly.

# 3. Anti-corruption Layer pattern

Implement a façade or adapter layer between different subsystems that don't share the same semantics. This layer translates requests that one subsystem makes to the other subsystem. Use this pattern to ensure that an application's design is not limited by dependencies on outside subsystems. This pattern was first described by Eric Evans in Domain-Driven Design.

![](/images/anti-corruption-layer.png)

Use it to make a proxy between calling subsystems, allowing in case **new system** to calling interface API to get resources in **legacy system**.

You can know **legacy system** is the system that can not be change code or maintainable anymore. So instead of changing code in legacy system, we only care about the input and output schema of the interface and enhance logic in adapter layer by **Open-closed principle**.

**Usecase:**

A migration is planned to happen over multiple stages, but integration between new and legacy systems needs to be maintained.

- Two or more subsystems have different semantics, but still need to communicate.

- This pattern may not be suitable if there are no significant semantic differences between new and legacy systems.

**Advantageous:**

- **Operational Excellence:** This pattern helps ensure that new component design remains uninfluenced by legacy implementations that might have different data models or business rules when you integrate with these legacy systems and it can reduce technical debt in new components while still supporting existing components.

# 4. Asynchronous Request-Reply pattern

Decouple backend processing from a frontend host, where backend processing needs to be asynchronous, but the frontend still needs a clear response.

Can use patterns: **Queue-Based Load Leveling pattern**, **HTTP polling**

![](/images/http_polling.webp)

**Notes:** In client-side, we usually show loading while processing the long-polling jobs (usually transaction jobs) and start polling until the jobs is completed in background, or multiple system through message queue in backend.

Polling can be useful to client applications, as it's challenging to use long running connections or provide call-back endpoints. With polling, the client application will make a call to the API, which triggers long running operations in the backend.

The API will return a response as quickly as possible, acknowledging the request has been received. This is usually in the form of a HTTP 202 (Accepted) status code.

When we make a successful call to the status endpoint, it should return HTTP 200 (OK) as well as an update on the status of the background process work. Once the work is complete, the status endpoint can either return a resource that shows the work is complete, or redirect to another resource url (HTTP 302).

![](/images/client-sever-asynchronus.webp)

**Advantageous:**

- **Performance Efficiency**: Decoupling the request and reply phases of interactions for processes that don't need immediate answers improves the responsiveness and scalability of systems. As an asynchronous approach, you can **maximize concurrency on the server side** and schedule work to be completed as capacity allows, allow **different services can be scale independently**.
