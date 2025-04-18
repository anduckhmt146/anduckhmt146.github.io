---
layout: post
title: Rate Limiter
date: 2025-04-17
categories: backend
---

Rate limiting is a crucial design pattern used in distributed systems to control the rate of incoming requests or traffic to a service. It helps protect services from being overwhelmed, ensures fair resource usage, and maintains system stability.

A rate limiter acts as a gatekeeper that monitors and regulates the number of requests a client can make to an API or service within a specified time window. When the limit is exceeded, subsequent requests are either delayed or rejected until the next time window begins.

Key benefits of rate limiting include:

- **Service Protection**: Prevents services from being overwhelmed by too many requests
- **Resource Management**: Ensures fair distribution of system resources among users
- **Cost Control**: Helps manage infrastructure costs by limiting excessive usage
- **Security**: Protects against DDoS attacks and brute force attempts
- **Quality of Service**: Maintains consistent performance for all users

Common rate limiting algorithms include:

- Token Bucket
- Leaky Bucket
- Fixed Window Counter
- Sliding Window Log
- Sliding Window Counter

# 1. Token Bucket

![](/images/token_bucket.webp)

The Token Bucket algorithm uses the concept of a bucket that is continuously filled with tokens at a fixed rate. Each request consumes one token. If tokens are available, the request is allowed; if not, it's throttled.

Key characteristics:

- Bucket has a maximum capacity
- Tokens are added at a constant rate
- Allows for bursts of traffic up to bucket capacity
- Simple to implement and memory efficient

Use when:

- You need to allow brief bursts of requests
- You want to enforce a steady average rate with some flexibility

# 2. Leaky Bucket

![](/images/leaky_bucket.webp)

The Leaky Bucket algorithm processes requests at a constant rate, like water leaking from a bucket. If the bucket is full, new requests are dropped.

Key characteristics:

- Fixed processing rate
- Queue-based implementation
- Smooths out bursts of traffic
- Memory usage depends on queue size

# 3. Fixed Window Counter

![](/images/fixed_window.webp)

This algorithm divides time into fixed windows and counts requests in each window. When the counter hits the limit, new requests are rejected until the next window starts.

Key characteristics:

- Simple to understand and implement
- Resets counter at fixed intervals
- Can allow twice the rate limit at window boundaries
- Memory efficient

Although it has the potential risks that the attackers can take advantage of the time in the bulkhead.

For example, if you partition time by 24 hours, attackers can attack at 23:59h - 24h with the double traffic of 2 days.

# 4. Sliding Window Log

![](/images/sliding_window_log.webp)

Keeps track of timestamps for each request in a time window that "slides" forward. Removes old timestamps and counts current ones to make decisions.

Key characteristics:

- Very accurate
- No boundary conditions
- Higher memory usage
- More complex implementation

It limits the traffic by the gap between the final log and current timestamp, it is accurate to detect anomolies. But the **drawback** is we need to store **all the logs** when querying.

# 5. Sliding Window Counter

![](/images/sliding_window.webp)

Combines the fixed window counter with a weighted sliding window to smooth out boundary conditions.

Key characteristics:

- More accurate than fixed window
- Less memory intensive than sliding log
- Moderate implementation complexity
- Good balance of accuracy and performance

You can use the last access time and probability to predict the average frequency access of users.

```bash
Access per week 1 * (Number of days in week 1 / 7) + Access per week 2 * (Number of days in week 2 / 7)
```
