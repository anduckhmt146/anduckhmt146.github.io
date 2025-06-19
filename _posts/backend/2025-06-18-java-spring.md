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

# 6. Build production

- Java: We build .jar file in local -> Run the .jar file in production.

- Golang: Build to binary .app -> Run the binary in production.

- NodeJS: Need to run entry point node index.js.

- React: Deploy build to CDN -> access index.html to get resources.

# 7. Java Spring Web, Servlets, JSP and Reactive Programming:

- Servlets: server handler of Java, that handle request HTTP, each request per a thread, back request need to wait previous requests to completed first => blocking I/O, using Tomcat.

- Reactive: server handler Java, that handle concurrency project by event loop + callback => non-blocking I/O, using WebFlux.

- Drawback of Reactive Programming: You’ve built a Spring Boot app using Spring WebFlux (reactive), but your data access layer uses Spring Data JPA, which is blocking => Blocking operations (like JDBC) stall those event loops, which are supposed to stay free and responsive.

- Reactive apps are built on non-blocking event loops => When a JDBC come to event loop it will stuck the queue => **Do not use Reactive Programming for query database.**

- Spring Boot can support both Sevelets (Spring Web) and Reactive (Spring Reactive Web).

- Tomcat server to run Servlets HTTP, there are: External Tomcat (can use @WebServlets), Embeded Tomcat (add Serlets to Tomcat Server) => addServlets and Servlets Mapping.

- JSP (Java Server Pages): file .jsp => can use to send HTML to the client - View layer. Serlets is a Controller, Object as Model => Model can come from database or object class (POJO - Plain Old Java Object).

- Using Tomcat Jasper to convert JSP -> Servlets

- Use response field of session.getAtrribute and session.setAttribute to bind data to another JSP file.

- In Spring, you can change HttpServletRequest => parameter, e.g (@RequestParam("page") int page, @RequestParam("limit") limit int).

- In Spring, you can change HTTPSession response => Model model or ModelAndView (spring.web.ui -> HTTPSession for JSP) => model.addAtribute("result", result) => as long as it contains the same interface.

- The model can use to addObject model.addObject => And we can use @ModelAttribute to set value for object before assign it to JSP.

- Using @Configure properties default of Spring Boot => https://docs.spring.io/spring-boot/appendix/application-properties/index.html

# 8. Spring MVC without Spring Boot:

- Spring MVC is only a part of Spring Web.

- Eclipse is free to run Tomcat server. Tomcat is a Servlets Container to run Servlet.

- Dispatcher Servlet is a controller -> routing request to other controllers.

- When to run in Tomcat, you need to define the config <dispatcher-servlet></dispatcher-servlet> in web.xml.

- It is too much complicated to run Java in Tomcat outside, rather than Tomcat embedding.

# 9. Spring Data JPA:

- ORM to help query database, abstract in repository layer.

- You can custom SQL for the repository layer.
