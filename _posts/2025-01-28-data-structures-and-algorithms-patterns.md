---
layout: post
title: "DSA: Coding Interview Patterns"
date: 2025-01-28
---

Here is boilerplate template code that helps you shortcut thinking, reuse repeatable code, save your time, let you focus more on problem-solving while implementing algorithms in coding interview.


# 1. Basic Data Structure

## 1.1. Array

<details>
<summary>Code</summary>

<pre style="background-color: lightgray; color: black;">

    nums = [0, 10, 20, 30, 40, 50]

    # Loop with index and value
    for i, num in enumerate(nums):
        print(i, num)

</pre>
</details>


## 1.2. Linked List

<details>
<summary>Code</summary>

<pre style="background-color: lightgray; color: black;">

    from llist import sllist, dllist

    # Create a singly linked list
    singly_list = sllist()

    # Add elements to the singly linked list
    singly_list.append(1)
    singly_list.append(2)
    singly_list.append(3)

    # Display the singly linked list
    print("Singly Linked List:", singly_list)  # Output: sllist([1, 2, 3])

    # Access elements
    print("First element:", singly_list.first.value)  # Output: 1
    print("Last element:", singly_list.last.value)   # Output: 3

    # Remove an element
    singly_list.remove(singly_list.first)  # Removes the first element
    print("After removal:", singly_list)  # Output: sllist([2, 3])

    # Create a doubly linked list
    doubly_list = dllist()

    # Add elements to the doubly linked list
    doubly_list.append(1)
    doubly_list.append(2)
    doubly_list.append(3)

    # Display the doubly linked list
    print("Doubly Linked List:", doubly_list)  # Output: dllist([1, 2, 3])

    # Insert at a specific position
    doubly_list.insert(0, doubly_list.first)  # Insert 0 at the start
    print("After insertion:", doubly_list)   # Output: dllist([0, 1, 2, 3])
    </pre>
    </details>


## 1.3. Stack

<details>
<summary>Code</summary>

<pre style="background-color: lightgray; color: black;">

    # Declaring a stack using a list
    stack = []

    # Push operation (adding elements to the stack)
    stack.append(10)
    stack.append(20)
    stack.append(30)

    # Pop operation (removing the top element of the stack)
    top_element = stack.pop()  # Removes and returns 30

    # Checking the top element without removing it
    top_element = stack[-1]  # 20

    # Checking if the stack is empty
    is_empty = len(stack) == 0

</pre>
</details>


## 1.4. Queue

<details>
<summary>Code</summary>

<pre style="background-color: lightgray; color: black;">

    from queue import Queue

    # Create a FIFO queue
    q = Queue()

    # Add elements to the queue
    q.put(1)
    q.put(2)
    q.put(3)

    # Remove elements from the queue
    print(q.get())  # Output: 1
    print(q.get())  # Output: 2

    # Check if the queue is empty
    print(q.empty())  # Output: False

</pre>
</details>


## 1.5. Priority Queue

<details>
<summary>Code</summary>

<pre style="background-color: lightgray; color: black;">

    from queue import PriorityQueue

    # Create a priority queue
    q = PriorityQueue()

    # Add elements with priorities (lower number = higher priority)
    q.put((1, "Task A"))
    q.put((3, "Task C"))
    q.put((2, "Task B"))

    # Remove elements based on priority
    print(q.get())  # Output: (1, 'Task A')
    print(q.get())  # Output: (2, 'Task B')

</pre>
</details>

## 1.6. Hash Map

<details>
<summary>Code</summary>

<pre style="background-color: lightgray; color: black;">

    # Create a hash map
    hash_map = {}

    # Add key-value pairs
    hash_map["name"] = "Alice"
    hash_map["age"] = 25
    hash_map["city"] = "New York"

    # Access values by keys
    print(hash_map["name"])  # Output: Alice

    # Update a value
    hash_map["age"] = 26

    # Check if a key exists
    print("city" in hash_map)  # Output: True

    # Delete a key-value pair
    del hash_map["city"]

    # Iterate over keys and values
    for key, value in hash_map.items():
        print(f"{key}: {value}") # Output: (Alice: 26)

</pre>
</details>


## 1.6. Set

<details>
<summary>Code</summary>

<pre style="background-color: lightgray; color: black;">

    # Creating an empty set
    my_set = set()

    # Adding elements to the set
    my_set.add(1)
    my_set.add(2)
    my_set.add(3)

    # Adding 2 again (no effect)
    my_set.add(2)

    # Removing an element
    my_set.remove(1)

    # The set still contains only one instance of 2
    print(my_set)  # Output: {2, 3}

</pre>
</details>

## 1.7. Infinity

<details>
<summary>Code</summary>

<pre style="background-color: lightgray; color: black;">
    
    import math

    positive_inf = math.inf
    negative_inf = -math.inf

</pre>
</details>