---
layout: post
title: Interview Process
date: 2025-11-10
categories: plan
---

# 1. Third-party recruiter

- They only want to acquise as much as candidates as possible.

- They are only payed when you accepted the offer.

- So if you have another offer, or request higher salary they do not accept because the higher risk that you do not accept their offers.

=> Do not talk anything about salary expectations, job searches with them.

# 2. Internal recruiter

- They schedule the slots for you to interview round.

=> waste time and cost of company => must be impressed them.

=> Say as much keyword in JD as possible so that they process you.

# 3. Live Coding

- 2 mins -> clarify requirements, input/output/contrains.

- 3 mins -> Come up with draft solutions, why do you do in steps: why sorting, why looping, why variables.

- 5 - 10 mins -> Implement the solution and explain each steps.

=> First impressive when you finish solution in 10 - 15 mins => Show you are good problem-solving skills.

=> Other 30 mins, they use to struggle you => Focus on thinking process, and completed it is important => Practice optimization skills.

=> At least 2 - 3 solutions.

# 4. System Design Interview

## 4.1. High-level design:

- Functional requirements: Core features (send message, post tweet, search user, etc.).

- Non-functional requirements: Scale, latency, throughput, availability, consistency.

- Traffic estimates and capacity planning: Requests/sec, storage size, growth projections.

- Architecture components:

  - Load balancers
  - Backend servers
  - Databases (SQL vs NoSQL, sharding, replication)
  - Caches, queues, CDNs, pub/sub

- Data flows: Read path vs write path, how requests move through the system

- Trade-offs: CAP theorem, eventual vs strong consistency, cost vs scalability.

## 4.2. Low-level design:

- Object-oriented modeling: Classes, objects, interfaces, relationships

- Design patterns: Factory, Strategy, Observer, Singleton, etc.

- APIs and methods: Clear function signatures, parameters, return types

- Data models: Table schemas, indexes, relationships, how queries are optimized

- Component interactions: Sequence diagrams, how modules talk to each other

- Edge cases and validations: Error handling, retries, testing considerations

- Maintainability: Clean abstractions, modularity, extensibility

## 4.3. Notes

- Error 1: Do not ask the requirements, e.g. number of active users, scalability.

- Error 2: Do not talk in order of logic, e.g. talk about high-level design first, talk database design later => You need systematic logic to strange system.

- Error 3: Estimate 1000 images, each image 1 MB => Need to store 1TB => So we need sharding.

- Error 4: Detail each fields in table, what fields should be index.

- Error 5: Each level different, require the structure to answer different -> Why to choose the technology rather than other technology.

- Error 6: Use the techstack that the interviewer know.

# 5. Lesson learned

- Sky Mavis Interview: Be careful in implement, dry run the source code, do not easily to conclude when the problem is similar.

- Senior Grab Interview: Clarify problem more detailed, explain reason for clearly.

- Middle Grab Interview: Optimize the code to O(N).

# 6. Resumes

- Used to impress the recruiter.

- Write it shortly in each bullet and focus more in impacts.

# 7. Hiring Manager

- Decide whether to fill the headcount.

# 8. How to search jobs

- When you email a real human and they don’t respond, that hurts: you put yourself out there, someone made a value judgment about you, and you lost.

=> You need to sale yourself.

- Build personal brands or open-sources.

- Email EM or Linkedin Sale Navigator for opportunities.
