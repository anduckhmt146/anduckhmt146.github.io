---
layout: post
title: "System Design: Abstraction Concepts"
date: 2025-01-27

---

Here are some abstract concepts to help you truly understand what System Design and Software Architecture are in real world. These insights will guide you to approach these terms without overrating & misunderstanding them.

# 1. Terminology

## 1.1. Software Architecture

- You can think of Software Architecture as the **blueprint** of a building, it describes the overall framework and structure but doesn't dictate the detailed construction. It is **pure abstraction without implementations**.

- **Software Architecture Patterns:** The polymorphism of an abstraction, there are multiple ways to implement its blueprint. In the context of building architecture, these are called patterns—for example, apartments (shared multi-ternant housing) and grounded houses (single-family houses) represent different models of a building, each designed to serve a specific purpose. For example of software architecture patterns: Microservices, Monolithic, Event-Driven, Layer, Hexagon, Client-Server,...

> **Note:**  Software Architecture Patterns are still a **pure abstraction without implementations**. It is a high-level design.

## 1.2. System Design

- **Practical implementation design for a specific software product** based on its software architecture design.

- System design is just a process of planning the **data-flow** within a software product, breaking it down into multiple smaller, general-purpose services. Each service are focused on efficiently handling data that they are responsible for. We are usually split software into micro-services based on a **data-intensive** approach.

- For example, a product like a Movie App is designed using the Microservice Pattern (Software Architecture) and implemented with a System Design that includes three services: Movie Booking, Movie Payment Gateway, and Movie Promotion.

- About what to do in System Design, it involves several key tasks, including: draw sequence diagrams, database design, resource estimates, tradeoffs,...

> **Note:**  System Design is an **implementation design of a specific product**. It is a high-level design.

## 1.3. OOP Design

- Writing OOP code, class interface, and inheritance, related to class diagram here.

- Applying low-level design patterns, SOLID principles into implementations.

> **Note:** OOP Design is a low-level design, focusing on how to write clean code, maintainable code, clean structure codebase to implement a feature.

## 1.4. Functional Requirements

Functional requirements are usually designed based on:

- **User actions:** Describing the actions a user can perform within the system, such as creating an account, logging in, or submitting a form.

- **Data input and processing:** Defining how the system should process, manipulate, or transform data based on user input or other sources.

## 1.5. Non-functional Requirements

Non-functional requirements is required for big-tech million users services, most notably:

- **Scalability:** A well-designed system should be able to handle increasing amounts of work or users without compromising performance => It means how the service can handle 1 million users with acceptable latency, compared to serving just 1,000 users.

- **Availability:** High availability is essential for ensuring that the system can continue to function even in the face of failures, such as hardware or network issues. This requires designing for redundancy, failover mechanisms => It means how the service handles errors, exceptions while running.

- **Performance (latency & throughput):** Latency refers to the time taken to respond to requests, while throughput is the amount of work or transactions the system can handle in a given time frame => It means how good the service performs with user requests.

Besides these main non-functional requirements, there are also **Reliability** (the service returns correct results), **Consistency** (data is consistent between services), and **Efficiency** (the service should have minimal redundant operations).

# 2. What we need to focus in System Design

When we engage in system design, we focus on designing the following aspects:

- **Services:** This includes the various components, applications, and APIs that provide specific functionality or processing capabilities. Services can be designed as monoliths or, more commonly, as microservices to enable better scalability, maintainability, and flexibility.

- **Dataflow:** Designing the flow of data within and between the services is crucial for ensuring efficient processing, timely communication, and accurate results. This involves understanding the data formats, protocols, and communication patterns used between services.

- **Storage:** The storage design encompasses databases, caches, and file systems required to store and manage data throughout the system. This includes selecting appropriate storage technologies, data modeling, and ensuring data consistency and durability.

