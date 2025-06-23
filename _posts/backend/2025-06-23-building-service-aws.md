---
layout: post
title: How to implement services using AWS
date: 2025-06-23
categories: tech
---

Here is some techniques when implementing services in AWS

# 1. Principles:

- **Step 1:** Requirement gathering
    - Business requirements.
    - Functional requirements.
    - Non-functional requirements.
    - Technical requirements.
    - Data requirements.
    - Integration requirements.
    - Security & Compliance requirements.
    - Financial requirements.

- **Step 2:** Choosing an architecture pattern
    - Web application.
    - Data proccessing pipeline.
    - Serverless architecture.
    - Microservice.
    - Event-driven architecture.
    - Domain: e-commerce, media and entertainment, healthcare, financial service,..
    - Every architecture pattern has a strengths, weaknesses, trade-offs.

- **Step 3:** Selecting a service
    - You can choose AWS services.
    - Or leverage third-party services.

- **Step 4:** Diagramming the service.

- **Step 5:** Exploring Well-Architecture framework.

- **Step 6:** Using AWS Console, AWS CLI, AWS SDK, IaC (CloudFormation & Terraform)...
    - AWS Console: convenient with create a EC2, but drawbacks when you need to create 100 - 1000 EC2s.
    - AWS CLI: Using in your terminal, required AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION.
```bash
$ aws <command> <subcommand> [options and parameters]
```
    - AWS SDK: Golang, NodeJS, Python... provide abstract high-level interface for you to make HTTP/HTTPS requests.

    - IaC: 