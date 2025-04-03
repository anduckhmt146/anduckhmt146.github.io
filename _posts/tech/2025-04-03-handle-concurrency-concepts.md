---
layout: post
title: Backend - Concurrency Programming
date: 2025-04-02
categories: tech
---

A breif about advanced skills in backend programming.

# 1. Context

Backend skills can be divided into two levels:

- **Basic level:** focuses on connecting and interacting with infrastructure (Database, Redis, Kafka) using protocols like HTTP, gRPC, GraphQL, WebSocket, UDP,...

- **Advanced level:** deals with concurrency programming, handling multiple requests and processes through inter-process communication and managing concurrent database/Redis access.

In this blog, we will diccuss about concurrency programming in Backend Programming with main concepts, using Golang language.

# 2. Advanced Backend Programming with Go

## 2.1. When to use

When you need to handle multiple **background tasks** that can run independently, such as:

- Pushing log to analytics dashboard: Google Analytics, Kibana,...
- Cache warming and maintenance jobs: reconcilation, alerting,...
- Create multiple workers (worker pool) to split jobs independently for a long-running jobs.

**Notes:** All of the tasks is not depend to the main business process => if you call this functions synchoronously, it will cause the high latency for your service but do not necessary.

=> Parallel programming enables significant performance improvements by executing these tasks concurrently, reducing overall latency and improving system throughput.

## 2.2. Issues

- Race condition: and it causes crash services due to the conflict when multiple processes access to the same memory address at the same time.

- Data inconsistency: when you do not follow ACID principle while updating database.

## 2.3. Goroutines

- Each goroutine you can view as an process to run functions parallelly with each other.

- Main function is a goroutine.

## 2.4. Channel

- Channel is a queue for multiple goroutines (process) to communicate with others.

- Implemented by pubsub mechanism.

## 2.5. Wait Group

- Used to wait N goroutines to complete their job.

## 2.6. Mutex

- Used to lock the process in 1 goroutine.
