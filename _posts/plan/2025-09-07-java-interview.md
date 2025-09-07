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

# 3. Collections

# 4. Java Concurrency

# 5. Hibernate

# 6. Spring (follow the learning docs)
