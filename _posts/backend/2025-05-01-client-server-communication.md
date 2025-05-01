---
layout: post
title: Server-Client Communication
date: 2025-05-01
categories: backend
---

Here is some technique for real-time server-client communication

# Webhook:

- **Usage:** When merchant to make a HTTP request (POST, GET) to your server to confirm their events have completed. It is called webhook.

- **Example:** You are building an admin dashboard for an e-commerce platform. You want real-time order updates. Customer buys a product → Payment gateway (Stripe/PayPal) triggers a Webhook to your server. Your server processes the webhook, confirms order, updates database.

# SSE

- **Usage:** When to need to use a real-time update in client-side without polling.

- **Example:** You have a social media platform where users need to be notified of new likes, comments, or mentions in real-time. When another user interacts with their content, your server sends an SSE event to update their notification feed instantly, without requiring page refresh. This is more efficient than polling the server every few seconds for updates.

# Web Socket

- **Usage:** When you need bi-directional real-time communication between client and server. Both server and client can send messages to each other at any time.

- **Example:** Chat applications, real-time gaming, collaborative editing where both client and server need to push updates to each other frequently.

# Long Pooling

- **Usage:** When you need real-time updates but cannot use WebSocket/SSE. Client makes HTTP request and server holds it until data is available.

- **Mechanism:** The client initiates an HTTP request The server holds the request open until new data is available or a timeout occurs. Once the server responds, the client immediately re-requests to wait for new data again.

- **Example:** You're building a basic notification system where instant delivery isn't critical. The client sends a request to check for new notifications, and the server holds this request open (typically 30-60 seconds). If new notifications arrive during this time, the server responds immediately. If no notifications arrive, the server sends an empty response after timeout, and the client initiates a new request. This creates a continuous cycle that simulates real-time updates while using standard HTTP.

# Short Polling

- **Usage:** When you need periodic updates and real-time isn't critical. Client makes regular HTTP requests at fixed intervals.

- **Example:** A dashboard displaying system metrics that updates every minute. The client sends HTTP requests every 60 seconds to fetch new data. While not real-time, it's simple to implement and sufficient for many use cases where immediate updates aren't necessary.
