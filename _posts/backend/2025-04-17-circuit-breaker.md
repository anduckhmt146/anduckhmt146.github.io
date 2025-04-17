---
layout: post
title: Circuit Breaker
date: 2025-04-17
categories: backend
---

The Circuit Breaker pattern is a crucial design pattern in distributed systems that helps prevent cascading failures and provides resilience when dealing with external dependencies. Similar to an electrical circuit breaker that trips when there's too much current, this pattern monitors for failures and "trips" when a service is failing too frequently.

## 9.1. Close (cho phép service đi qua)

![](/images/Circuit_Breaker_-Closed_state.png)

## 9.2. Open:

![](/images/Circuit_Breaker_-Openstate.png)

## 9.3. Half-Open:

![](/images/Circuit_Breaker_-Half_Open_state.png)

You can implement the proxy as a state machine that includes the following states. These states mimic the functionality of an electrical circuit breaker:

- **Closed:** The request from the application is routed to the operation. The proxy maintains a count of the number of recent failures. If the call to the operation is unsuccessful, the proxy increments this count. If the number of recent failures exceeds a specified threshold within a given time period, the proxy is placed into the Open state and starts a time-out timer. When the timer expires, the proxy is placed into the Half-Open state.

- **Open:** The request from the application fails immediately and an exception is returned to the application.

- **Half-Open:** A limited number of requests from the application are allowed to pass through and invoke the operation. If these requests are successful, the circuit breaker assumes that the fault that caused the failure is fixed, and the circuit breaker switches to the Closed state. The failure counter is reset. If any request fails, the circuit breaker assumes that the fault is still present, so it reverts to the Open state. It restarts the time-out timer so that the system can recover from the failure.

**Advantagous**:

- **Reliability:** This pattern helps prevent a faulting dependency from overloading. Use this pattern to trigger graceful degradation in the workload. Couple circuit breakers with automatic recovery to provide self-preservation and self-healing.

- **Performance Efficiency:** This pattern avoids the retry-on-error approach, which can lead to excessive resource usage during dependency recovery and can overload performance on a dependency that's attempting recovery.
