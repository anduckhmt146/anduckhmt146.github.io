---
layout: post
title: Software Architect Template
date: 2025-07-17
categories: plan
---

Here is plan for software architect template

# 1. What is solution architect ?

![](/images/Software-Architect/software-architect-thinking.png)

- The main purpose of software architecture is to reduce the cost of building and changing the software.

# 2. Software Architect questions ?

- Programming language.

- Code reuse across platform.

- Early error detection (compile-time vs runtime error detection, breadth of validation).

- Availability and cost of hiring the right talent; learning curve for new hires

- Readability and refactorability of code.

- Appronach to code composition, embrancing the change.

- Data store and approach to data modeling.

- Application-specific data model, and the blast radius from changing it

- Performance and latency in all tiers and platforms

- Scalability and redundancy.

- Spiky traffic patterns, autoscaling, capacity planning

- Error recovery

- Logging, telemetry, and other instrumentation

- Reducing complexity

- User interfaces and their maintainability

- External APIs

- User identity and security

- Hardware and human costs of the infrastructure and its maintenance

- Enabling multiple concurrent development workstreams

- Enabling testability.

- Fast-tracking development by adopting third-party frameworks

# 3. Programming Language

- Consier: strong static typing, explicitly defined data structures, interfaces, isomorphism, third-party libraries, ease of refactoring, functional and object-oriented, ease and cost of hiring, learning curve for new hires, general readability.

1. Strong static typing:

- Some language have strong and weak typing.
- Error is caught early.

2. Static and dynamic type checking.

- Static type: check type at compiled time.
- Dynamic type: check in run time.

=> To produce reliable code, you need a language featuring both strong typing and static type checking.

3. Support for explicitly defined data structures: interface, class to define data structure at compile time.

4. Support for interfaces: it is like contract for dependency injection.

5. Isomorphism: In the most common scenario, that's the ability of the language to run on the client platform (browser and/or mobile devices) and on the server.
   - Native isomorphism: run both in browser and server.
   - Transpiled isomorphism: TypeScript can transpile to JavaScript. React Native and Apache Cordorva in mobile, NodeJS in server side, mapping from language to language.
   - Generated isomorphism: Kotlin can run in server using Java Virtual Machine or on Android devices, mapping objects in language.

=> Native and Transpiled Isomorphic languages are extremely useful in cross-platform development, by allowing you to share your code and third-party libraries across platforms.

6. Availability of third-party libraries: JavaScript/TypeScript, Java and Python.

7. Ease of refactoring: we have refactoring tools to do this, or need to consider the logic, converting methods to top-level functions, converting static members to global variables or constants, converting inner classes to toplevel classes, moving declarations and implementations between modules.

8. Functional vs Object-Oriented: Functional is black-box, OOP is white-box. OOP is better when you want to model a real-life objects, FP for data transformations or pipelines.

9. Ease and cost of hiring.

10. Learning curve.

11. Readability.
