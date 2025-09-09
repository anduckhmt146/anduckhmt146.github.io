---
layout: post
title: Java Interview
date: 2025-09-07
categories: plan
---

# 1. Java Language

## 1.1. What are the OOPs concepts?

- Inheritance: child class inheritance a public, protected function of parent class => extends.

- Encapsulation: Call setter and getter rather than know the implementation

- Polymorphism: same class and method but override different behavior.

- Abstraction class & Interface: provide blueprint for other class to know.

  - Abstract methods (no body → must be implemented by subclasses).

  - Concrete methods (with body → reusable by subclasses).

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

## 4.8. What Is the Meaning of a Synchronized Keyword in the Definition of a Method

- If the function is already acquired by another thread, the former thread will enter the BLOCKED state => and wait until another thread is released.

=> Make sure the thread is executed in order.

## 4.9. Deadlock, Livelock, and Starvation

- **Deadlock:** 2 thread lock each other => In modern DBMS, after the timeout it will release the lock.

- **Livelock:** such threads are alive and not blocked, but still, do not make any progress because they overwhelm each other with useless work.

- **Starvation**: wait too long to be executed.

## 4.10. Fork/Join Framework

- Fork/Join: try to steal jobs for busy threads.

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
