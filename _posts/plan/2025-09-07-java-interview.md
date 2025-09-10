---
layout: post
title: Java Interview
date: 2025-09-07
categories: plan
---

# 1. Java Language

## 1.1. What are the OOPs concepts?

1. Inheritance: child class inheritance a public, protected function of parent class => extends.

```java
class Animal {
    private String name;

    // Parent constructor
    public Animal(String name) {
        this.name = name;
        System.out.println("Animal constructor called. Name = " + name);
    }

    public void eat() {
        System.out.println(name + " is eating");
    }

    protected void sleep() {
        System.out.println(name + " is sleeping");
    }
}

class Dog extends Animal {  // Inheritance
    private String breed;

    // Child constructor must call parent constructor using super()
    public Dog(String name, String breed) {
        super(name); // calls Animal(String name)
        this.breed = breed;
        System.out.println("Dog constructor called. Breed = " + breed);
    }

    public void bark() {
        System.out.println(breed + " is barking");
    }
}

public class InheritanceExample {
    public static void main(String[] args) {
        // Create Dog object
        Dog d = new Dog("Buddy", "Golden Retriever");

        d.eat();   // inherited public method
        d.sleep(); // inherited protected method
        d.bark();  // child’s own method
    }
}

```

2. Encapsulation: Call setter and getter rather than know the implementation

```java
class Person {
    private String name;  // hidden
    private int age;

    // Getter and Setter (Encapsulation)
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        if (age > 0) {
            this.age = age;
        }
    }
}

public class EncapsulationExample {
    public static void main(String[] args) {
        Person p = new Person();
        p.setName("John");   // using setter
        p.setAge(25);
        System.out.println(p.getName() + " is " + p.getAge() + " years old");
    }
}

```

3. Polymorphism: same class and method but override different behavior.

```java
class Shape {
    public void draw() {
        System.out.println("Drawing a shape");
    }
}

class Circle extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

class Square extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a square");
    }
}

public class PolymorphismExample {
    public static void main(String[] args) {
        Shape s1 = new Circle();  // runtime polymorphism
        Shape s2 = new Square();

        s1.draw(); // Drawing a circle
        s2.draw(); // Drawing a square
    }
}

```

4. Abstraction class & Interface: provide blueprint for other class to know.

- Abstract methods (no body → must be implemented by subclasses).

- Concrete methods (with body → reusable by subclasses).

Example abstract class

```java
abstract class Vehicle {
    abstract void start();  // abstract method → must be implemented

    public void stop() {    // concrete method → reusable
        System.out.println("Vehicle stopped");
    }
}

class Car extends Vehicle {
    @Override
    void start() {
        System.out.println("Car started with key");
    }
}

```

5. Interface:

```java
interface Flyable {
    void fly(); // abstract method
}

class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("Bird is flying");
    }
}
```

6. Overloading: Params different behave different

```java
class Calculator {
    // Method 1
    int add(int a, int b) {
        return a + b;
    }

    // Method 2 (overloaded: different parameter count)
    int add(int a, int b, int c) {
        return a + b + c;
    }

    // Method 3 (overloaded: different parameter types)
    double add(double a, double b) {
        return a + b;
    }
}

public class OverloadingExample {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.add(2, 3));        // calls first method
        System.out.println(calc.add(2, 3, 4));     // calls second method
        System.out.println(calc.add(2.5, 3.5));    // calls third method
    }
}
```

- Override: override the implement of the functions => run-time polymorphism

```java
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}

public class OverridingExample {
    public static void main(String[] args) {
        Animal a1 = new Animal();
        Animal a2 = new Dog();  // Upcasting

        a1.sound(); // Animal makes a sound
        a2.sound(); // Dog barks (runtime polymorphism)
    }
}

```

## 1.2. Access Modifers

- Default: access in the same package.

- Private: access in class.

- Protected: Access in subclass and same package.

- Public: Access in everywhere.

## 1.3. SOLID

- S: Each module do only 1 work

- O: Write new function not update legacy.

- L: If B is subclass of A, anywhere you use A => You can new object with B.

- I: Interface should not have unnecessary functions.

- D: depend on abstraction not to concretions.

## 1.4. Order of execution (Syntax)

- Static initialization blocks: run when loaded first time in JVM.

- Initialization blocks: run in the same order which they appear from program.

- Instance Initialization blocks: executed whenever the class is initialized.

## 1.5. Lambda Expressions and Closures

- A lambda expression is an anonymous function and can be defined as a parameter.

- The Closures = lambda/function + captured variables from outer scope.

## 1.6. List Method

- clone() - Creates and returns a copy of this object.

- equals() - Indicates whether some other object is "equal to" this one.

- finalize() - Called by the garbage collector on an object when garbage

...

## 1.7. What is the difference between atomic, volatile, synchronized?

- volatile: A variable is written by one thread and read by many others, status flags, config values, stop signals.

- synchronized: Ensuring mutual exclusion (only one thread in a block at a time).

- atomic: use for counter, fast counters, accumulators, reference updates.

Notes: volatile → thread-safe for visibility-only problems (flags, single writes, publish/subscribe values).NOT thread-safe for atomic updates or compound actions.

## 1.8. Object finalization

- Called by the garbage collector

- If an object can not be accessed from any live object, this means that it can be safely garbage collected.

## 1.9. What is Serialization in Java?

- Convert object to binary => sent over the network to any other running Java virtual machine.

## 1.10. Java Cloning

- Shalow Cloning: Creates a copy of an object, but does not copy the nested objects deeply => asign pointer.

- Deep Cloning: Different object

## 1.11. String, StringBuffer, StringBuilder Overview

- String → Immutable (cannot be changed once created).

- StringBuffer (safe) → Mutable, thread-safe.

- StringBuilder → Mutable, but not thread-safe (faster).

## 1.12. What is synchronized ?

- In Java, synchronized is a keyword used to control access to blocks of code or methods by multiple threads.

- It ensures that only one thread can execute a synchronized block/method at a time for a given object.

- It’s used to prevent race conditions (when multiple threads try to modify shared data simultaneously).

Example:

```java
class Counter {
    private int count = 0;

    // synchronized method
    public synchronized void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}

public class SyncExample {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        // Create two threads incrementing counter
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });

        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });

        t1.start();
        t2.start();

        // Wait for both threads to finish
        t1.join();
        t2.join();

        System.out.println("Final count: " + counter.getCount()); // Expected: 2000
    }
}
```

👉 Without synchronized, you might see inconsistent results (e.g., < 2000) due to race conditions.

## 1.13. Java 8 features

- Lambda Expressions: a new language feature allowing us to treat actions as objects

- Method References: enable us to define Lambda Expressions by referring to methods directly using their names

- Optional: special wrapper class used for expressing optionality

- Functional Interface: an interface with maximum one abstract method; implementation can be provided using a Lambda Expression

- Default methods: give us the ability to add full implementations in interfaces besides abstract methods

- Nashorn, JavaScript Engine: Java-based engine for executing and evaluating JavaScript code

- Stream API: a special iterator class that allows us to process collections of objects in a functional manner

- Date API: an improved, immutable JodaTime-inspired Date API

## 1.14. Java 11 features

- New methods to the String class: isBlank, lines, strip, stripLeading, stripTrailing, and repeat.

- New File Methods: readString and writeString static methods from the Files class.

- The new HTTP client: improves overall performance and provides support for both HTTP/1.1 and HTTP/2

- Modular System: since Java 9

## 1.15. What is annotaions

Annotations in Java are metadata (extra information) added to code.

- They don’t change how the program runs directly.

- Instead, they give instructions to the compiler, tools, or the runtime (JVM, frameworks like Spring, Hibernate, JUnit).

- They are marked with @ symbol.

## 1.16. Immutable class?

- Immutable objects are those objects whose state can not be changed once created.

=> Thread safe, because it do not change state of immutable objects.

# 2. Memory Management

## 2.1. What Is Garbage Collection and What Are Its Advantages?

- Looking at heap => Detect what object is used, which are not, detect unused object.

- An in-used object: maintain a pointer to that object.

- An un-used object, unreferenced object: can be reclaimed.

=> Developer do not need to deallocate object like C.

Notes: When the garbage collector thread is running, other threads are stopped.

## 2.2. What Are Stack and Heap? What Is Stored in Each of These Memory Structures, and How Are They Interrelated?

- Stack: local varibales, references to the object to heap to execute method. Every thread hs its own stack.

- Heap: Address of an object.

Notes: Garbage Collection -> look in the heap.

## 2.3. How Generational Garbage Collection Works

Heap including:

- Young Generation: newly created objects

- Old or Tenured Generation: The old generation hosts objects that have lived in memory longer than a certain "age".

- Permanent Generation: platform library classes and methods may be stored here.

🔹 How Does GC Work?

1. **Reachability Analysis:**

- GC checks which objects are reachable from "GC roots".

- GC roots = local variables, active threads, static fields, JNI references.

- If an object cannot be reached → it’s garbage.

2. **Mark and Sweep Algorithm (simplified):**

- Mark: GC starts from GC roots and marks all reachable objects.

- Sweep: Objects not marked are deleted, memory reclaimed.

3. **Compact:**

- After sweeping, heap may have “holes” (fragmentation).

- GC compacts memory by moving objects together, improving allocation efficiency.

Notes: GC only reclaimed the object if it does not have any references on it.

## 2.4. What about the finalize function

- When an object becomes eligible for garbage collection, the GC has to run the finalize method on it.

## 2.5. What Happens When There Is Not Enough Heap Space

- It will throws OutOfMemoryError

## 2.6. What Is a Stringbuilder and What Are Its Use Cases?

- StringBuilder: to build a string, because String is immuatable.

- If you want modify a string in single-thread => use StringBuilder, if you want to modify string in multi-thread => using StringBuffer.

# 3. Collections

## 3.1. Describe the Collections Type Hierarchy.

Notes: Iterale < Collection < (List, Set, Queue, Map)

1. The Iterable interface represents any collection that can be iterated using the for-each loop.

2. The Collection interface inherits from Iterable and adds generic methods for checking if an element is in a collection, adding and removing elements from the collection, determining its size

3. List > Collection

4. Set > Collection

5. Queue > Collection

6. Map > Collection

## 3.2. Map Interface

1. LinkedHashMap: used to look up with O(1).

2. TreeMap: lookup O(logN) => Design for sort with Comparator.

3. ConcurrentHashMap: thread-safe implement map for concurrency of updates.

## 3.3. LinkedList and ArrayList

1. ArrayList: List interface based on array.

2. LinkedList: doubly-linked list.

## 3.4. What Is the Difference Between Fail-Fast and Fail-Safe Iterators?

1. **Fail-fast:** HashMap, ArrayList, and other non-thread-safe collections => throw ConcurrentModificationException as soon as they detect a concurrent modification.

2. **Fail-safe:** thread-safe collections such as ConcurrentHashMap, CopyOnWriteArrayList => Only 1 thread modify at the same time.

## 3.5. How to use Comparator with Collections

- Use can edit and add conditions to class Comparable and Comparator Interfaces to Sort Collections

## 3.6. ArrayList and LinkedList

- Use ArrayList when you need fast random access and most operations are append.

- Use LinkedList when you need fast insertions/deletions (especially at ends or when you already have an iterator pointing to the right spot).

## 3.7. HashSet vs TreeSet vs LinkedHashSet

- HashSet is basically a HashMap with only keys (all values are a constant dummy object) => HashSet is a set.

- LinkedHashSet = HashSet + maintains insertion order via linked list.

- TreeSet = a sorted set, backed by TreeMap.

## 3.8. HashMap and TreeMap

- HashMap: a key-value maps.

- TreeMap: manage the order of the key.

# 4. Java Concurrency

## 4.1. What Is the Difference Between a Process and a Thread?

- Process: do not share common memory.

- Threads: can share common memory

=> We can have multi-thread conflict and thread-safe.

## 4.2. How Can You Create a Thread Instance and Run It?

- In Java, you can create a Thread and run by thread.start().

## 4.3. Different States of a Thread

- NEW

- RUNNABLE

- BLOCKED

- WAITING

- TIME_WAITING.

- TERMINATED.

## 4.4. Runable and Callale Thread

- Run is a runable thread.

- Callable run when it is called, return a value.

## 4.5. What Is a Daemon Thread

- A daemon thread is a background thread that does not prevent the JVM from exiting => infinitive threads.

- Use cases: Background monitoring (metrics, heartbeats).

## 4.6. What Is the Thread’s Interrupt Flag?

- Call thread.interrupt() to interrupt on the thread object.

## 4.7. Executor and Executorservice

- Executor and ExecutorService are two related interfaces of java.util.concurrent framework => manage thread pool.

The ExecutorService interface have 3 implementations:

- ThreadPoolExecutor: executing tasks using a pool of threads

- ScheduledThreadPoolExecutor: allow task scheduling.

- ForkJoinPool: dealing with recursive algorithm tasks.

**Example:** Declare threadpools with 3 threads.

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorExample {
    public static void main(String[] args) {
        // Create a fixed thread pool with 3 threads
        ExecutorService executor = Executors.newFixedThreadPool(3);

        // Submit 5 tasks
        for (int i = 1; i <= 5; i++) {
            int taskId = i;
            executor.submit(() -> {
                System.out.println("Task " + taskId + " is running by " + Thread.currentThread().getName());
                try {
                    Thread.sleep(1000); // simulate work
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
                System.out.println("Task " + taskId + " is finished by " + Thread.currentThread().getName());
            });
        }

        // Shut down executor after finishing tasks
        executor.shutdown();
    }
}

```

Notes: Instead of manually starting threads, Java provides ExecutorService for better thread management.

## 4.8. What Is the Meaning of a Synchronized Keyword in the Definition of a Method

- If the function is already acquired by another thread, the former thread will enter the BLOCKED state => and wait until another thread is released.

=> Make sure the thread is executed in order.

## 4.9. Deadlock, Livelock, and Starvation

- **Deadlock:** 2 thread lock each other => In modern DBMS, after the timeout it will release the lock.

- **Livelock:** such threads are alive and not blocked, but still, do not make any progress because they overwhelm each other with useless work.

- **Starvation**: wait too long to be executed.

## 4.10. Fork/Join Framework

- Fork/Join: try to steal jobs for busy threads.

## 4.11. Wait, Notify, NotifyAll

**Method:**

- wait(): lock, the current thread stays there until some other thread calls notify() or notifyAll() on the same object.

- notify() → Wakes up one thread that is waiting on the same object’s monitor.

- notifyAll() → Wakes up all threads waiting on the same object’s monitor.

```java
class SharedData {
    private boolean available = false;

    public synchronized void produce() {
        while (available) { // already produced, wait
            try { wait(); } catch (InterruptedException e) {}
        }
        System.out.println("Produced item");
        available = true;
        notify(); // notify consumer
    }

    public synchronized void consume() {
        while (!available) { // nothing to consume, wait
            try { wait(); } catch (InterruptedException e) {}
        }
        System.out.println("Consumed item");
        available = false;
        notify(); // notify producer
    }
}

public class WaitNotifyExample {
    public static void main(String[] args) {
        SharedData data = new SharedData();

        Thread producer = new Thread(() -> {
            for (int i = 0; i < 3; i++) data.produce();
        });

        Thread consumer = new Thread(() -> {
            for (int i = 0; i < 3; i++) data.consume();
        });

        producer.start();
        consumer.start();
    }
}

```

## 4.12. Runnable

- An interface (java.lang.Runnable) representing a task with no return value.

```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Running in thread: " + Thread.currentThread().getName());
    }
}

public class RunnableExample {
    public static void main(String[] args) {
        Thread t = new Thread(new MyRunnable());
        t.start();
    }
}

```

## 4.13. Callable

- Same as callback => return future value.

```java
import java.util.concurrent.*;

class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        System.out.println("Callable running in: " + Thread.currentThread().getName());
        return 42; // return result
    }
}

public class CallableExample {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<Integer> future = executor.submit(new MyCallable());

        // get() blocks until result is available
        System.out.println("Result: " + future.get());

        executor.shutdown();
    }
}

```

# 5. Hibernate

## 5.1. What is ORM in Hibernate?

- Mapping from object data stored to relational database.

## 5.2. Hibernate over JDBC

- JDBC: Write SQL manually.

- ORM: Maps Java classes (entities) to database tables.

## 5.3. Hibernate framework?

Hibernate core interfaces are:

- Configuration
- SessionFactory
- Session
- Criteria
- Query
- Transaction

## 5.4. What is a Session in Hibernate?

- A session is an object that maintains the connection between Java object application and database.

## 5.5. What is a SessionFactory?

- SessionFactory provides an instance of Session.

- It is a factory class that gives the Session objects based on the configuration parameters in order to establish the connection to the database.

## 5.6. What is the difference between first level cache and second level cache?

- First Level Cache: cache in a session.

- Second Level Cache: can be shared with multiple sessions.

## 5.7. Can you explain the concept behind Hibernate Inheritance Mapping?

There are different inheritance mapping strategies available:

- Single Table Strategy
- Table Per Class Strategy
- Mapped Super Class Strategy
- Joined Table Strategy

## 5.7. What is N+1 SELECT problem in Hibernate?

- Fetch all list at the first time => Lazy loading strategy => 1 query.

- N query to load each times.

## 5.8. How to solve N+1 SELECT problem in Hibernate?

- Pre-fetch the records in batches which helps us to reduce the problem of N+1 to (N/K) + 1 where K refers to the size of the batch.

- Subselect the fetching strategy

## 5.9. What is Single Table Strategy?

- The inheritance data hierarchy is stored in the single table by making use of a discriminator column which determines to what class the record belongs.

## 5.10. Can you tell something about Named SQL Query

- Use name to query

=> name = "findIBEmployeeByFullName",  
 query = "from InterviewBitEmployee e where e.fullName = :fullName"

# 6. Functional Programming

## 6.1. What is a stream

- A stream is a sequence of elements supporting sequential and parallel aggregate operations

![](/images/System-Design/Concepts/stream_java.png)

# 7. Java Machine

## 7.1. What is bytecode

- Java bytecode is the instruction set of Java virtual machine => same like MIPS.

## 7.2. JVM, JRE, JDK

- JVM: Java virtual machine, including just-in-time compiler.

- JRE: JVM + libraries.

- JDK: JVM + libraries + Debuggers.

1. JVM (Java Virtual Machine)

- What it is: A virtual machine that runs Java bytecode.

- Role: Converts .class files (bytecode) into machine-specific instructions.

- Platform independence: Write once, run anywhere → same .class runs on Windows, Linux, Mac (as long as JVM exists).

2. JRE (Java Runtime Environment)

- What it is: A package containing the JVM + libraries + other components needed to run Java programs.

- Contains: JVM, Core libraries (java.lang, java.util, etc.), Other runtime files

- Does NOT contain: Development tools (compiler, debugger).

3. JDK (Java Development Kit)

- What it is: A full package for Java developers.

- Contains: JRE (which contains JVM), Development tools (compiler javac, debugger, JavaDoc, etc.)

![](/images/System-Design/Concepts/JVM-JRE-JDK.png)

## 7.3. Class loader

1. Load core Java file.

2. Load libaries: JRE, EXT, Lib.

3. Load classpath: .jar, .war

Notes:

- .class file = Java bytecode + structure

- Java byte code

```java
getstatic
ldc
invokevirtual
return
```

# 8. Spring (follow the learning docs)

Docs: [https://anduckhmt146.site/java-spring/](https://anduckhmt146.site/java-spring/)

# 9. Exception Handling

## 9.1. Errors vs Exceptions

- Errors represent unrecoverable conditions like hardware failures or resource exhaustion => OutOfMemoryError, StackOverFlowError

- Exceptions: can be throwable by business logic

=> Exceptions for localized failures, errors in JVM-level.

## 9.2. Checked vs Unchecked Exceptions

1. Checked Exceptions: Compiler forces you to self handle before compile => Example reading a file without IOException, the code won't compile.

2. Unchecked Exceptions: inherit in RuntimeException => do not require try catch, null or divide by 0

## 9.3. Try-Catch-Finally Block

- Try: success.

- Catch: crash or exception => go to catch.

- Finnally: always execute

## 9.4. Multiple Catch and Nested Try

- Multicatch

=> Catch 1: EOFException ex

=> Catch 2: FileNotFoundException ex

## 9.5. Throw vs Throws

- throw: use to throw exception right now.

- throws: extends a class

## 9.6. Creating Custom Exceptions

- Checked Exception: extends the class Exception.

- Unchecked Exception: extends the class RuntimeException.

# 10. File Handling & I/O in Java

## 10.1. I/O Streams Basic

- Type: Byte stream (reads/writes raw bytes).

- Use case: Binary data (images, videos, PDFs, audio).

## 10.2. Reader and Writer Class

- Type: Character stream (reads/writes characters, 16-bit Unicode).

- Use case: Text files (supports proper encoding).

## 10.3. BufferedReader and Buffered Writer

- Type: Character streams with buffer.

- Use case: Efficient reading/writing of text, reading lines.

## 10.4. Serialization and Deserialization

- Type: Object stream (converts entire objects to/from bytes).

- Use case: Saving objects to files, transferring objects across network.

# 11. Java 8

# 12. Java 9 - 17

# 13. JVM Architecture

## 13.1. Just-in-time compiler Java

- Just-In-Time Compiler (JIT) used to convert Hotpots Java bytecode -> binary code of computer => Optimize by cache hotpots code that execute multiple times => faster.

## 13.2. Garbage Collection (GC)

GC automatically frees memory by removing objects that are no longer referenced.

Common algorithms:

- Mark and Sweep → finds reachable objects and deletes unreferenced ones.

- Generational GC → divides heap into Young (Eden + Survivor) and Old generations for efficiency.

## 13.3. Java Memory Model (JMM) Overview

1. volatile

- Guarantee: Visibility + ordering (but not atomicity).

- Meaning: When one thread writes a volatile variable, other threads immediately see the new value.

2. synchronized

- Guarantee: Visibility + atomicity + ordering.

- Meaning: Ensures that only one thread can access the block at a time and changes are visible to all threads.

3. final

- Guarantee: Safe publication of immutable objects.

- Meaning: Once a final field is set in a constructor, other threads see the correctly constructed object (no partially initialized state).

## 13.4. Stack vs Heap Memory

Stack (per thread):

- Stores method frames (local variables, call info).

- Fast, managed automatically (pop/push).

Heap (shared):

- Stores objects, arrays, class instances.

- Managed by GC.

## 13.5. JVM Architecture Basics (Hay)

Notes: Java used both interpreter and compiler.

- Compiler: javac compile .java to .class

- ClassLoader: loads .class files into memory.

- Runtime Data Areas:

  - Method Area (class info, static vars)
  - Heap (objects)
  - Stack (method frames)
  - PC Register (per thread)
  - Native Method Stack

- Execution Engine:

  - Interpreter (executes bytecode)
  - JIT Compiler (converts hot code to native machine code)

- Garbage Collector: frees memory.

## 13.6. Strong, Weak, Soft, Phantom References

1. Strong Reference (default)

```java
Object obj = new Object(); // strong reference
```

=> As long as there’s a strong reference, GC will never collect the object. Most references in Java are strong by default.

=> For normal program data (business objects, configs, etc.), you don’t want them disappearing unexpectedly.

2. Soft Reference

```java
Created with new SoftReference<>(object).
```

=> GC will collect if memory is low, but otherwise keeps the object.

3. Weak Reference

- GC removes if no strong refs exist (used in caches).

4. Phantom Reference

- Used for cleanup before object is reclaimed.

## 13.7. Garbage Collection in Java (detail focus)

- Minor GC: cleans Young Generation (short-lived objects).

- Major GC / Full GC: cleans Old Generation (long-lived objects).

Collectors:

- Serial GC: single-threaded, good for small apps.

- Parallel GC: multiple threads, good for throughput.

- CMS (Concurrent Mark Sweep): minimizes pause times.

- G1 (Garbage First): modern default, balances throughput + low pause.

## 13.8. Memory Leaks in Java

- Even with GC, leaks happen if objects are referenced but unused

- Causes:

  - Static fields holding big objects.

  - Unclosed resources (sockets, DB connections).

- Solutions:

  - Use tools like VisualVM/JConsole to detect leaks.

  - Set unused references to null (not reference)

## 13.9. Do GC auto clear new Object()

- GC auto clear the memory when set object = null or object = new reference -> clean old reference.

```java
public class GCDemo {
    public static void main(String[] args) {
        MyObject o1 = new MyObject(); // created, referenced
        o1 = null;                    // no reference → eligible for GC

        MyObject o2 = new MyObject();
        MyObject o3 = new MyObject();
        o2 = o3;   // the object previously referenced by o2 is now unreferenced → eligible for GC
    }
}

```

# 14. Bean, Spring MVC, Spring Reactive Programming (WebFlux)

## 14.1. Bean Scopes

- Singleton: Single instance throughout the application.

- Prototype: A new instance is created for each request.

- Request: A new instance is created for each HTTP request.

- Session: A new instance is created for each user session.

=> Default is Singleton

## 14.2. Bean Lifecycle

1. Instantiation: Spring creates the bean instance (using constructor or factory method).

2. Injects dependencies: into the bean’s fields/setters/constructor.

3. Add @PostConstruct to make sure the bean it is init successfully.

4. Bean Usage: injection of beans for application-wide use.

5. Add @PreDestroy to check reference before destroy a Bean.

## 14.3. Bean define

- XML Configuration Files: Centralized lengthy configurations, but wordy and less maintainable compared to annotations

## 14.4. Spring Framework

- Modular Design

- Dependency Injection

- Aspect-oriented programming

- Transaction management

- Data access

- Model-View-Controller(MVC)

- Web development

- Testing

- Spring Cloud

## 14.5. ApplicationContext

- ApplicationContext is the Spring IoC container (advanced version of BeanFactory)

- It is responsible for:

- Creating beans (instantiation)

- Wiring dependencies (dependency injection)

- Managing lifecycle (init & destroy callbacks)

- Providing advanced features: AOP, internationalization, event publishing, profiles, etc.

- Common Implementations

  - ClassPathXmlApplicationContext: loads beans from XML.

  - AnnotationConfigApplicationContext: loads beans from Java @Configuration classes.

## 14.6. Component Scan

- Look at the packages (e.g. com.example.app) => Tell what components to register to the beans

## 14.7. Profiles

- Profiles allow configuration for applications differently in different environments, such as
  - Development
  - Staging
  - Production

## 14.8. Spring AOP

- Aspect: A building block bundles together cross-cutting concerns.

  - Advice: The code that is executed before, after, or around a method invocation.
  - Pointcut: Condition triggering the tasks(advice).

- Join point: when the advice execute.

  - method calls
  - field access
  - object creation

- Weaving: Merge aspect and non-aspect in compile time.

## 14.9. DispatcherServlet, Spring MVC, Spring WebFlux

1. Servlet Container & DispatcherServlet:

- It is the central dispatcher in Spring MVC => Orchestration to routing requests.

- Steps:

  - Request comes to web app → servlet container forwards it to DispatcherServlet.

  - DispatcherServlet looks up a suitable Handler Mapping to find the right controller.

  - Invokes the Controller method (often annotated with @RequestMapping, @GetMapping, etc.).

  - Controller returns a ModelAndView or data object.

  - DispatcherServlet delegates to a ViewResolver (e.g., Thymeleaf, JSP) or returns JSON/XML directly.

**Notes:**

- Servlet Container: Java EE (Jakarta EE) application server (like Tomcat, Jetty, Undertow).

- DispatcherServlet: Spring provided.

2. Spring MVC (Servlet-based, synchronous)

- Built on top of the Servlet API (Tomcat, Jetty, etc.).

- Request-per-thread model:

  - Each HTTP request → one thread from servlet container thread pool.

  - The thread is blocked until response is ready.

Notes: Multi-threads based on thread pool of Servlet container.

3. @Async and @Callable for Async Programming with Spring MVC

- Using @Async to call two services or databases in parallel call two services or databases in parallel

```java
@Service
public class MyService {
    @Async
    public CompletableFuture<String> task1() {
        // simulate delay
        return CompletableFuture.completedFuture("Task1 done");
    }

    @Async
    public CompletableFuture<String> task2() {
        return CompletableFuture.completedFuture("Task2 done");
    }
}

```

4. Spring WebFlux (not MVC, it is event loop)

- High concurrency (e.g., chat apps, IoT, streaming APIs).

- Microservices that talk to other async/non-blocking services (DBs, queues, APIs).

- Real-time applications.

5. Spring MVC handle requests

Flow:

1. Client sends request → Servlet container (Tomcat, Jetty).

2. Container assigns a thread from its pool to handle this request.

3. Request is passed to DispatcherServlet.

4. DispatcherServlet looks up a controller (e.g., @RestController method).

5. Controller runs → often calls blocking I/O (DB query, REST API, file read).

6. While waiting, the thread is blocked.

7. Controller returns a response object (e.g., String, ResponseEntity).

8. DispatcherServlet renders it (via HttpMessageConverter, ViewResolver).

9. Response sent back to client.

Thread is released to the pool.

👉 Model: One request = One thread (until done).
👉 Problem: If many requests wait on slow I/O, threads get exhausted.

6. Spring WebFlux (Reactive, Non-blocking)

Notes: Mono and Flux return a Callback => to wait and continue call to execute when the data is completed.

Idea: Callback and Event loop for concurrency programming.

Flow:

1. Client sends request → Netty (or reactive-enabled Tomcat/Jetty).

2. Request is passed to DispatcherHandler (WebFlux’s equivalent of DispatcherServlet).

3. DispatcherHandler looks up a controller.

4. Controller returns a Publisher (Mono<T> or Flux<T>).

5. Instead of blocking, WebFlux registers callbacks for when the data is ready.

6. The event loop continues handling other requests using the same thread.

7. When data arrives, the pipeline continues (map, filter, flatMap, etc.).

DispatcherHandler writes the response asynchronously to the client.

👉 Model: One thread = Many concurrent requests (thanks to event loop).
👉 Benefit: Handles high concurrency with fewer threads (good for real-time apps, streaming, microservices).

## 14.10. Why Java develop reactive or stream processing ?

- Idea: Event loop and Callback Architecture.

1. Without Reactive Streams (blocking)

```java
List<User> users = userService.findAll(); // blocks until DB query finishes
```

2. With Reactive Streams (non-blocking, streaming)

```java
Flux<User> users = userService.findAll(); // returns immediately
users.filter(u -> u.isActive())
     .map(User::getName)
     .subscribe(System.out::println);

```

=> Blocking and return by stream, not fetch all data in the first load.

# 15. Spring Security

- Client -> Multiple Filter layers before reaching -> Dispatcher Serverlet -> Controller.

Interceptors:

- AuthenticationManager / ProviderManager / AuthenticationProvider

- UsernamePasswordAuthenticationFilter

- BasicAuthenticationFilter

# 16. Spring Cloud

- Eureka: Service Discovery, HTTP client

---

# 1. Concurrency Java & Multithreading (uu tien 2)

- How concurrency in java work ?

- Thread-safe: synchronized, volatile, Lock, AtomicXXX, ConcurrentHashMap, synchronizedMap

---

1. volatile: Changes made by one thread are immediately visible to others, can not use by counter (10 -> 11, 12)

2. synchronized: You want both atomicity and visibility => block when another thread complete.

3. AtomicInteger: Giống Persimisstic Lock => Do not lock like synchronized but check current value in mem -> retry until match new value.

4. ConcurrentHashMap

   - Reads: non-blocking (volatile semantics).

   - Writes: use CAS or synchronized at bucket level, not global lock.

   - Multiple writers can update different buckets simultaneously.

5. synchronizedMap: Single global lock -> lock full the Map.

6. HashTable (thread-safe): block full the map

7. HashMap (not-threadsafe): Better performance in single-threaded use.

8. ArrayList, LinkedList, HashMap, HashSet, TreeMap, TreeSet, PriorityQueue, StringBuilder, Stream: do not thread-safe

---

- Thread, Runnable, Callable

1. Thread: Represents a unit of execution in Java.

2. Runnable pass to thread => void execution.

3. Callable: Pass to thread => return value

---

- ExecutorService, ForkJoinPool, CompletableFuture

1. ExecutorService: Thread pool manager → handles thread lifecycle for you.

2. ForkJoinPool: Uses work-stealing algorithm (idle threads “steal” tasks from busy ones).

3. CompletableFuture (Like Stream, like callback)

```java
CompletableFuture.supplyAsync(() -> {
    // background task
    System.out.println("Fetching data...");
    return "data-from-API";
})
.thenApply(data -> {
    // process the result
    return data.toUpperCase();
})
.thenAccept(result -> {
    // final consumer
    System.out.println("Result: " + result);
});
```

---

- Producer–Consumer, Deadlock, Livelock, Starvation, ThreadLocal.

1. Deadlock: thread wait or each other

2. Livelock: thread live but can not call to each other.

3. Starvation: wait long time to execute.

---

👉 Gợi ý trả lời: không chỉ giải thích keyword, mà nên đưa use case thực tế trong dự án (VD: xử lý giao dịch song song, batch job).

# 2. Garbage Collector (uu tien 1)

- How garbage collector work ?

The JVM divides memory into heap generations:

- Young Generation (Eden + Survivor) → most new objects. Minor GC runs frequently.

- Old Generation (Tenured) → long-lived objects. Major/Full GC less frequent.

- Metaspace (Java 8+) → class metadata.

GC algorithms:

1. Serial GC → single-threaded, simple apps => Algorithm: Mark → Sweep → Compact.

---

- Uses a single thread for garbage collection.

- While GC runs → your entire application pauses (Stop-The-World).

---

2. Parallel GC → multi-threaded, throughput-focused => Algorithm: Mark → Sweep → Compact (like Serial) => multithread

---

- Uses multiple threads to perform GC in parallel.

- Still has Stop-The-World pauses, but cleaning is faster because many workers are helping.

---

3.  CMS (deprecated) → low-latency but fragmentation issues => Algorithm: Mark (mostly concurrent) → Sweep (concurrent).

---

=>

CMS (Concurrent Mark-Sweep) goes through these steps:

Mark: Finds which objects are still alive.

Sweep: Deletes the garbage objects (frees memory).

What it does NOT do:

CMS does not move the remaining (alive) objects together in memory.

--

It just frees scattered spaces where garbage was.

4. G1 GC (default from Java 9) → region-based, predictable pause times => Region-based + compaction (incremental or concurrent) => compact by region

---

=> Chia vùng + dọn nhà (thằng này 1 thôi)

Heap divided into regions (instead of fixed Young/Old spaces).

Each region can be Eden, Survivor, or Old, but roles can change dynamically.

GC collects the regions with the most garbage first (hence the name Garbage First).

Concurrent marking finds live objects across the heap.

---

5. ZGC, Shenandoah (Java 11/17) → ultra-low latency, concurrent compaction.

---

=> Chia vùng + nhiều thằng arrange nhà.

Heap divided into regions (instead of fixed Young/Old spaces).

Each region can be Eden, Survivor, or Old, but roles can change dynamically.

GC collects the regions with the most garbage first (hence the name Garbage First).

Concurrent marking finds live objects across the heap.

---

## 2.1. 🗑️ Heap Generations (classic model: Serial, Parallel, CMS)

1. Young Generation

2. Old Generation (Tenured)

3. Permanent Generation (PermGen) [Java 7 and earlier]

## 2.2. 🌱 Heap in Modern GCs

1. G1 GC

- Heap divided into regions (1–32 MB each).

- Regions can dynamically be Eden, Survivor, or Old.

- This removes rigid separation → more flexible.

2. ZGC / Shenandoah

- Heap also divided into regions (but designed for concurrent relocation).

- They avoid fragmentation because compaction happens concurrently.

## 2.3. Tool

- JConsole

# 3. Bean Life Cycle (uu tien 3)

IoC Container: quản lý bean lifecycle.

AOP: logging, transaction, security.

Spring Boot AutoConfiguration: dựa trên @EnableAutoConfiguration.

Spring Transaction: propagation + isolation levels.

- How bean life cycle ?

1. Container Started: The Spring IoC container is initialized.

2. Bean Instantiated: The container creates an instance of the bean.

3. Dependencies Injected: The container injects the dependencies into the bean.

4. Custom init() method: If the bean implements InitializingBean or has a custom initialization method specified via @PostConstruct or init-method.

5. Bean is Ready: The bean is now fully initialized and ready to be used.

6. Custom utility method: This could be any custom method you have defined in your bean.

7. Custom destroy() method: If the bean implements DisposableBean or has a custom destruction method specified via @PreDestroy or destroy-method, it is called when the container is shutting down => custom destroy.

---

Spring AOP

- Aspect: A building block bundles together cross-cutting concerns.

  - Advice: The code that is executed before, after, or around a method invocation.
  - Pointcut: Condition triggering the tasks(advice).

- Join point: when the advice execute.

  - method calls
  - field access
  - object creation

- Weaving: Merge aspect and non-aspect in compile time.

1. Logging

```java
@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint jp) {
        System.out.println("Method called: " + jp.getSignature());
    }
```

# 4. How stream work (uu tien 4)

- How stream work ?

1. A Stream is a pipeline of data processing operations on a collection (or other data source). Inspired by functional programming.

2. Doesn’t store data → works on the data source (Collection, Array, I/O).

3. Contains 3 parts:

- Source → intermediate ops (map/filter/...) → terminal op (collect/forEach/reduce/...).

=> Streams don’t process data until a terminal op is called.

=> Write more clean

# 5. Hibernate ORM (ORM library) basics: session lifecycle, lazy loading (uu tien 5)

- How hibernate work ?

## 5.1. N + 1 problem

- You query for a list of parent entities (→ 1 query).

- For each parent, Hibernate lazily loads its child entities (→ N queries)

**1 depts -> N employees**

## 5.2. Lazy Loading in Hibernate

=> Because Hibernate delays (is lazy about) loading associated entities until you actually use them.

```java
Department dept = session.get(Department.class, 1);
System.out.println(dept.getName());         // Only loads Department

System.out.println(dept.getEmployees());    // Triggers SQL for Employees
```

=> Only load when needed.

## 5.3. Session lifecycle

- A Session is a single-threaded object provided by Hibernate to interact with the database.

- Responsible for:

  - Managing entity state (Transient, Persistent, Detached).

  - Query execution (HQL, SQL, Criteria).

  - Transaction boundaries.

  - First-level cache.

- State Meaning:

  - Transient Not associated with session/DB new Entity()

  - Persistent Managed by session, in 1st-level cache session.save(entity)

  - Detached Was persistent, but session closed After session.close()

  - Removed Marked for deletion session.delete(entity)

# 6. Transactional (uu tien 6)

- How transactional work ?

=> It’s an annotation in Spring that tells the framework to run a method inside a database transaction.

Method call intercepted by Spring AOP proxy.

Transaction starts before method executes.

- If method executes successfully → commit.

- If method throws a runtime exception (unchecked) → rollback.

# 7. Java 8, Java 17 co gi moi ?

1. Java 8

- Lambda Expressions: A lambda is essentially an anonymous function (no name, inline).

- Stream APIs: A pipeline for processing data (like SQL for collections).

- CompletableFuture: When data or API return value => process and continue to map data.

2. Java 17

- New garbarge collector
