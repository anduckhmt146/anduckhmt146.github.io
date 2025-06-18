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

- You can use the <property></property> to set value to private variable of the class, value (initial value), ref (@Autowired)

- You also can use <constructure-arg value=""></constructure-arg> => Init constructure Student(int age)

---

- Use @Override to implement the methods of the interface, using field autowire class -> bean byName or byType if we have 2 concrete class to implement the same interface.

- Using primary to the class that you want to priority.

- Lazy init Bean => If you have a Desktop and Laptop Bean to implement interface Computer => By default, it inits 2 beans in initial phrase => But you can use lazy-init to only init a bean when it is declared or autowired.

# 3. Apply Java-based approach

- Similar to declare in xml file.

- @Configuration is declare a config xml.

- @Bean is declare a bean, can declare "name" of the bean.

- @Scope to declare different object => use annotation with the same of xml file.

- @Autowire, @Primary ("desktop" > "computer"), @Qualifier("desktop" or "laptop") => mock some fields in Bean.

- @Configuration > @ComponentScan > @Component => Scan all the @Component to @Configuration => Only create Bean.

- @Autowired to find the object and inject to the @Bean => Using @Primary or @Qualifier => Both object and setter, getter function.

# 4. Spring Boot

- @SpringBoot configure annotations for you.

- @Configuration

```bash
  @ComponentScan(basePackages = "com.example.services")
  @Import({DatabaseConfig.class})
  @PropertySource("classpath:application.properties")
  public class AppConfig {
  }
```

- @Service is the same as @Component, but write in layer.

- @Repository is the same as @Component, but write in layer.

# 5. Spring JDBC

- Connect DB, Query database, Keep connection, connect with H2 database.

- @Autowired for Setter and Getter

- H2 is just a database, not a cluster => just add JDBC template to query => DSN: jdbc:h2:mem:testdb

- Apply JDBC template for query db.

- Add postgres, mysql to resources file => add connection JDBC to database.
