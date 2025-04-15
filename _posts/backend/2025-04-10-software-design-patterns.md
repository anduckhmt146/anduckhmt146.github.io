---
layout: post
title: Software Design Patterns
date: 2025-04-10
categories: backend
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

# 5. Backends for Frontends pattern

Decouple backend services from the frontend implementations to tailor experiences for different client interfaces. This pattern is useful when you want to avoid customizing a backend that serves multiple interfaces. This pattern is based on Pattern: Backends For Frontends described by Sam Newman.

**Notes:** It means that whether we build services, a lot of repeated usecase required calling to core services to serve frontend business, such as: get ID of users while accessing app by calling to UM services, implement the payment logic by calling to payment services,... And each team must implement ad-hocs API to serving this demand, it is waste and repetitive but can not avoid => We should use **BFF for ad-hocs APIs (only for frontend purposes)**.

![](/images/backend-for-frontend-example.png)

**Use this pattern when:**

- A shared or general purpose backend service must be maintained with significant development overhead.

- You want to optimize the backend for the requirements of specific client interfaces.

- Customizations are made to a general-purpose backend to accommodate multiple interfaces.

- A programming language is better suited for the backend of a specific user interface, but not all user interfaces.

**This pattern may not be suitable:**

- When interfaces make the same or similar requests to the backend.

- When only one interface is used to interact with the backend.

**Advantageous:**

- **Reliability:** Having separate services that are exclusive to a specific frontend interface contains malfunctions so the availability of one client might not affect the availability of another client's access.

- **Security:** Because of service separation introduced in this pattern, the security and authorization in the service layer that supports one client can be tailored to the functionality required by that client, potentially reducing the surface area of an API and lateral movement among different backends that might expose different capabilities.

- **Performance Efficiency**: The backend separation enables you to optimize in ways that might not be possible with a shared service layer. When you handle individual clients differently, you can optimize performance for a specific client's constraints and functionality

# 6. Bulkhead pattern (vách ngăn)

The Bulkhead pattern is a type of application design that is tolerant of failure. In a bulkhead architecture, also known as cell-based architecture, **elements of an application are isolated into pools so that if one fails, the others will continue to function**. It is related to mechanism such as: circuit breaker, rate limiter, retry,...

For example, **Resilience4j** is a library with patterns:

- **Circuit Breaker:** This pattern monitors the health of a remote service and switches to a fallback if it's experiencing high error rates, preventing cascading failures.

- **Rate Limiter:** This pattern controls the number of requests that a service can handle within a certain period, preventing overload and denial-of-service attacks.

- **Retry:** This pattern automatically retries failed requests a certain number of times, giving the system a chance to recover.

- **Bulkhead:** This pattern isolates different services within a system to prevent one service's failure from affecting others.

- **Time Limiter:** This pattern ensures that requests are executed within a specified time frame, preventing indefinite hangs.

- **Cache:** This pattern stores frequently accessed data in memory to reduce the number of calls to remote services and improve performance.

![](/images/bulkhead-pattern.png)

**Use this pattern to:**

- Isolate resources used to consume a set of backend services, especially if the application can provide some level of functionality even when one of the services is not responding.

- Isolate critical consumers from standard consumers.

- Protect the application from cascading failures.

**This pattern may not be suitable when:**

- Less efficient use of resources may not be acceptable in the project.

- The added complexity is not necessary

**Advantageous:**

- Reliability

- Security

- Performance Efficiency

**Example**

The following Kubernetes configuration file creates an isolated container to run a single service, with its own CPU and memory resources and limits.

![](/images/k8s.png)

# 7. Cache-aside

If data in cache, load data in cache, else query database => update cache

![](/images/cache-aside-diagram.png)

**Disavantagous**:

- Data in cache can be stale. **Must be set expired time while implementing this caching strategy.**

**When to use this pattern:**

- When the cached data set is static. If the data will fit into the available cache space, prime the cache with the data on startup and apply a policy that prevents the data from expiring.

**Advantageous:**

- Reliability

- Performance Efficiency
