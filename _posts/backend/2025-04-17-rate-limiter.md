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

Pros:

- Allows for burst traffic handling
- Memory efficient implementation
- Simple to understand and implement
- Flexible rate control

Cons:

- Can be complex to tune bucket size and refill rate
- May not be suitable for strict rate limiting
- Burst allowance might not be desired in all cases

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

Pros:

- Provides consistent output rate
- Good for traffic shaping
- Prevents system overload effectively
- Ideal for constant rate processing

Cons:

- No burst handling capability
- Can lead to added latency
- Queue can grow large under heavy load
- Memory overhead from queue

Use when:

- You need a consistent processing rate
- You want to smooth out traffic spikes
- Memory isn't a major constraint

# 3. Fixed Window Counter

![](/images/fixed_window.webp)

This algorithm divides time into fixed windows and counts requests in each window. When the counter hits the limit, new requests are rejected until the next window starts.

Key characteristics:

- Simple to understand and implement
- Resets counter at fixed intervals
- Can allow twice the rate limit at window boundaries
- Memory efficient

Pros:

- Very simple to implement
- Minimal memory usage
- Clear time boundaries
- Easy to understand and debug

Cons:

- Boundary conditions can allow spike in traffic
- Less accurate than other methods
- Can be unfair at window boundaries
- Not suitable for precise rate limiting

Use when:

- You need a simple implementation
- Precise accuracy isn't critical
- You have fixed time-based quotas

# 4. Sliding Window Log

![](/images/sliding_window_log.webp)

Keeps track of timestamps for each request in a time window that "slides" forward. Removes old timestamps and counts current ones to make decisions.

Key characteristics:

- Very accurate
- No boundary conditions
- Higher memory usage
- More complex implementation

Pros:

- Highly accurate rate limiting
- No boundary condition issues
- Precise control over time windows
- Fair distribution of requests

Cons:

- Need to store all requests.
- High memory usage
- Computationally expensive
- Complex to implement
- Can be slow with many requests

Use when:

- You need high accuracy
- Memory isn't a constraint
- You have variable rate requirements

# 5. Sliding Window Counter

![](/images/sliding_window.webp)

Combines the fixed window counter with a weighted sliding window to smooth out boundary conditions.

Key characteristics:

- More accurate than fixed window
- Less memory intensive than sliding log
- Moderate implementation complexity
- Good balance of accuracy and performance

Pros:

- Based on Probability
- Better accuracy than fixed window
- Reasonable memory usage
- Smooth rate limiting
- Good compromise solution

Cons:

- More complex than fixed window
- Less accurate than sliding log
- Can be tricky to implement correctly
- May need fine-tuning of weights

Use when:

- You need better accuracy than fixed window
- Memory efficiency is important
- You can accept some approximation
