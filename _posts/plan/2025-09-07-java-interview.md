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

# 5. Hibernate

# 6. Spring (follow the learning docs)

# 7. Functional Programming
