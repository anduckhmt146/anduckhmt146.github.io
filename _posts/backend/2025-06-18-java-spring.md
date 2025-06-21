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

```java
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

- Drawback of Reactive Programming: You've built a Spring Boot app using Spring WebFlux (reactive), but your data access layer uses Spring Data JPA, which is blocking => Blocking operations (like JDBC) stall those event loops, which are supposed to stay free and responsive.

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

Notes:

Why we use Spring MVC rather than Reactive Programming in REST API ?

- Both WebFlux and WebMVC can do CRUD things.

- The different is WebMVC the requests are waited the previous requests completed, it execute in order => Reactive Programming WebFlux execute it concurrency => CPU bounded

- The most important is many essential libraries in the Java ecosystem (e.g., JPA, JDBC, Hibernate, Apache HTTP Client) are blocking => using Reactive Programming cause thread starvation.

# 8. Spring MVC without Spring Boot:

- Spring MVC is only a part of Spring Web.

- Eclipse is free to run Tomcat server. Tomcat is a Servlets Container to run Servlet.

- Dispatcher Servlet is a controller -> routing request to other controllers.

- When to run in Tomcat, you need to define the config <dispatcher-servlet></dispatcher-servlet> in web.xml.

- It is too much complicated to run Java in Tomcat outside, rather than Tomcat embedding.

# 9. Spring Data JPA:

- ORM to help query database, abstract in repository layer.

- You can custom SQL for the repository layer.

- You name the function findUsernameById => JPA is auto know to implement this function to find by id.

# 10. Spring Data REST

- Use annotation @Repository, or @RepositoryRestResource(path = "members") to generate CRUD api with repository.

```java
@RepositoryRestResource(path = "members")
public interface UserRepository extends JpaRepository<User, Long> {
```

# 11. Spring AOP (Aspect of Programming)

- Instead of writing duplication in code: logging, validation, exception for each function in code => We can use Spring AOP to centralize the handling exception to another place.

- Using @Aspect in a class **LoggingAspect** to assign it as an Aspect Class.

- Before Advice: using @Before("execution\* com. telusko-springboatrest service.JobService.updateJob(..))") in the function call -> To make it call before everything function JobService execute.

- Join Point: Can print the function that you called.

- After Advice: @After, @AfterThrowing, @AfterReturning

- Around Advice: using to **PerformanceMonitoringAspect** -> time execution of the function

```java
@Around ("execution (* com. telusko seningbeatrest service.JobService. getJob(..))")
public void monitorTime (ProceedingJoinPoint jp) throws Throwable {
    long start = System.currentTimeMillis(); I
    const obj = jp.proceed();
    Long end = System.currentTimeMillis();

    LOGGER.info("Time taken : " + (end-start));

    return obj;
}
```

- Around: using in **ValidationAspect** to using with argument

```java
@Around ("execution (* com.telusko-spcingbaatrest.service.JobService.getJob(..)) && args(postId)")
public Object validateAndUpdate(ProceedingJoinPoint jp, int postld) throws Throwable {
  if (postId < 0) {
     postId = -postId;
  ｝

  const obj = jp.proceed(new Object[]{postId});

  return obj;
}
```

**Notes:** It run function in @Around before executing function later or always check the validation, if it failed the Aspect function will throw error.

# 12. Spring Security

- User data is important, some data if leaked, you can blocked from the hacker such as credit cards. But some data if it's gone, it's gone, e.g. medical records, customer data.

![](/images/spring_security.png)

- **Notes:** Client -> Security Filters -> Filter Chain -> Servlet Filters (in order).

- After login -> Create session ID -> use to access resource -> Write JSESSIONID to cookie to make other requests.

- To get the session from request, we use HttpServletRequest to get session id.

```java
@GetMapping("hello")
public String greet(HttpServletRequest request) {
  return request.getSession.getId();
}
```

- You can define you own username, password in resources, application.properties with variable spring.security.user.name và spring.security.user.password.

---

**Basic Auth - Username, Password**

- When you submit a request, you send a token but not username, password -> Because username, password is leakable -> using token is more secure.

- Declare new object, e.g new Student(), List<Student> in Java Spring -> It is just a memcache, and class are the dto.

- CSRF (Cross-site Request Forgery) is a token -> prevent website in other domain, such as: facebook.com -> share cookie to .zalopay.vn domain -> Use CSRF do make sure cookie is not share to other domain.

- By default, Spring Security required to add CSRF token to POST, PUT, DELETE API => Else it will return 401, it means that Spring Security required users to add X-CSFF-TOKEN to the header requests of API.

- You can use same.site.strict in application.properties -> to make sure it only can share cookie in same site.

- 2 types of REST API: Stateless and Stateful -> /about, /students same token -> it is stateful (for sessionID in cookie)

- **Notes:** If you are implement stateful API -> You need to maintain CSRF token to send with session ID, it means that although they have cookie, but not have token, it is not success to POST, PUT, DELETE resource.

- **Notes:** If SameSite=Strict or SameSite=Lax cookies: Prevent cookies from being automatically sent in cross-site requests.

- @Configuration and @Bean different -> @Configuration is a Singleton Bean.

- **Notes: By default, Spring Security has default config for you, but if you declare SecurityConfig with @Configuration and @EnableWebSecurity, you overwrite the config => use @Configuration to overwrite the default config or define in application.properties.**

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    http.csrf(customizer -> customizer.disable());
    http.authorizeHttpRequests(request -> request.anyRequest() .authenticated());|
    http.httpBasic(Customizer.withDefaults());
    http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)

    // Stateless you need to send request from the client every requests and do not need form
    return http.build()
  }
```

- Each request must contain all the information needed to process it. The server does not store session state between requests. Therefore, no session-based login -> no need for login form.

- You can customize the http.csrf interface by using without lambda interface and @Overwrite the functions -> Lambda function make write the interface of java class easier.

```java

  Customizer<CsrfConfigurer<HttpSecurity>> customCsrf = new Customizer<CsrfContigurer<<HttpSecurity>> {
      @Override
      public void Customize(CrfConfigurer<HttpSecurity> configurer) {
        configurer.disable();
      }
  }:

  http.csrf(custCsrf);

```

- You can use Lambda function to write the filters, interceptors more cleaner

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(customizer -> customizer.disable())
        .authorizeHttpRequests(request -> request.anyRequest() .authenticated())
        .httpBasic(Customizer.withDefaults())
        .sessionManagement(session -> bession sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    return http.build()
  }
```

- If you use basic authenticate with HTTP, it will display a prompt to input value in browser.

---

- Login with multiple users -> Database.

- **Notes: Using UserDetail Service. We can return an object to implement the interface or an abstract class that implement the interface.**

```java
@Bean
public UserDetailsService userDetailsService() {
  UserDetails user = User.withRefaultPasswerdEncoder().username("navin").password("n@123").roles("USER").build();

  UserDetails admin = User.withRefaulthasswerdEncoder().username("admin").password("admin@789").roles("ADMIN").build();

  return new InMemoryUserDetailsManager (user, admin);
}
```

- You can store data in MYSQL using JDBC, JPA -> load data to userdetail interface for authenticate users.

- **Notes:** Filters/Interceptors are executed in order.

- **Notes:** You can implement the userDetailService in your own with your database.

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
  @Autowined
  private UserDetailsServive userDetailsService;

  @Bean
  public AuthenticationProvider authProvider(){
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider();

    provider.setUserDetailsService(userDetailsService);
    provider.setPasswordEncoder(...);

    return provider;
  }
}
```

- Implement the UserDetail Service and UserRepository.

```java
public interface UserRepo extends JpaRepository<User, Integer> {
  User findByUsername(string username)
}
```

```java
@Service
public class MyUserDetailsService implements UserDetailsService {
  @Autowined
  private UserRepo repo;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = repo.findByUsername(username);

    if (user == null) {
      System.out.println("User 404");
      throw new UsernameNotFoundException ("User 404");
    }

    return new UserPrincipal(user)
  }
}
```

```java
public class UserPrincipal implements UserDetails {
  private User user;

  public UserPrincipal(user UserRepository) {
    this.user = user;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.singleton(new SimpleGrantedAuthority(role: "USER"));
  }

  @Override
  public String getPassword() {
    return user.getPassword()
  }

```

---

- Hashing Algorithm: MD5 (128 bit), SHA256 (256 bit) -> Hash with multiple rounds -> Hash 1 time.

- Bcrypt -> hash 256 bit + salt multiple times.

- Using Bcrypt to encode when register new user when create/update user.

- You can use BScrypt to implement in PasswordEncoder of UserDetail service and when store to database -> Because it tell the Spring Boot to verify 2 passwords during login by comparing the raw password -> encoded password and compare this password in the database (compare 2 hashing password)
