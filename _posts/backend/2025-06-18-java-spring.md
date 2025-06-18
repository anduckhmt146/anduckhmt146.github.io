---
layout: post
title: Deep dive language - Java Spring
date: 2025-06-18
categories: tech
---

Here is a some notes to deep dive in Java Spring

# 1. Spring Framework - Fundamentals:

- Spring is a framework, including: Spring Data, Spring Microservices, Spring Cloud, Spring Security,...

- The most important ideas of Spring auto **Manage Object** by creating, deleling,... instead of developer => Developer only declare Beans and do not need to New, Constructure, Destructure Object.

- Spring Boot is an annotation-based components to auto configure (configure xml file for Beans,...) of Spring Framework => It can collaborate each Spring Components together.

- A framework is consider good is:

  - Good to use.

  - Good community.

  - Good documentation.

- IOC (Invertion of Control): Instead of developer control all the objects, delegate the control object for Spring.

- DI (Dependency Injection): When you need to inject an object to another object => use @Autowired to init the object from bean.

- Use Spring start to init projects, using IDE like IntelliJ.

# 2. Spring without Boot

- Install spring package.

- Need to declare an "spring.xml" file, declare each <bean></bean> node to Application Context => point to a package className.

- Scope: The default of bean scope is "singleton" => Create bean object when you call new ClassPathXmlApplicationContext("spring.xml") => But when you declare the scope to "prototype", the bean object is created when you init new Student(), new Employee().
