---
layout: post
title: "DSA: Coding Interview Patterns"
date: 2025-01-28
---

Here is boilerplate template code that helps you shortcut thinking, reuse repeatable code, save your time, let you focus more on problem-solving while implementing algorithms in coding interview.

<!-- Highlight.js CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css">

<!-- Highlight.js JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    hljs.highlightAll();
  });
</script>

<style>
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 20px 0; 
    }

    th, td {
        border: 1px solid black;
        padding: 12px;
        text-align: left;
        vertical-align: middle;
    }

    th {
        font-weight: bold;
    }   
</style>



<details>
<summary><h1>1. Basic Data Structure</h1></summary>

<h2>1.1. Array</h2>

<details>
<summary>Code</summary>

<pre>
<code class="python">
nums = [0, 10, 20, 30, 40, 50]

# Loop with index and value
for i, num in enumerate(nums):
    print(i, num)
</code>
</pre>
</details>


<h2>1.2. Linked List</h2>

<details>
<summary>Code</summary>

<pre>
<code class="python">
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
</code>
</pre>
</details>


<h2>1.3. Stack</h2>

<details>
<summary>Code</summary>

<pre>
<code class="python">
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
</code>
</pre>
</details>


<h2>1.4. Queue</h2>

<details>
<summary>Code</summary>

<pre>
<code class="python">
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
</code>
</pre>
</details>


<h2>1.5. Priority Queue</h2>

<details>
<summary>Code</summary>

<pre>
<code class="python">
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
</code>
</pre>
</details>

<h2>1.6. Hash Map</h2>

<details>
<summary>Code</summary>

<pre>
<code class="python">
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
</code>
</pre>
</details>


<h2>1.7. Set</h2>

<details>
<summary>Code</summary>

<pre>
<code class="python">
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
</code>
</pre>
</details>

<h2>1.8. Infinity</h2>

<details>
<summary>Code</summary>

<pre>
<code class="python">
import math

positive_inf = math.inf
negative_inf = -math.inf
</code>
</pre>
</details>
</details>

<details>
<summary><h1>2. Space & Time Complexity</h1></summary>

<h2>Time Complexity</h2>

<table>
    <tr>
        <th>Runtime</th>
        <th>Usecase</th>
        <th>Constraint</th>
    </tr>
    <tr>
        <td>O(1)</td>
        <td>
          <ol>
              <li>Hashmap lookup</li>
              <li>Array access and update</li>
              <li>Push and pop from a stack/queue</li>
              <li>Finding and applying math formula</li>
          </ol>
        </td>
        <td><b>n > 10^9</b></td>
    </tr>
    <tr>
        <td>O(logN)</td>
        <td>
          <ol>
              <li>Binary Search</li>
              <li><b>Look up</b> in Tree Data Structure</li>
              <li><b>Look up</b> in Divide by N</li>
          </ol>
        </td>
        <td><b>n > 10^8</b></td>
    </tr>
    <tr>
       <td>O(N)</td>
        <td>
          <ol>
              <li>Scan array size N</li>
              <li>Two Pointers</li>
              <li>Stack/Queue Traversal</li>
              <li>Worst case of Tree/Graph</li>
          </ol>
        </td>
        <td><b>n <= 10^6</b></td>
    </tr>
    <tr>
        <td>O(Klog(N))</td>
        <td>
          <ol>
              <li>Heap (Top K)</li>
              <li>Binary search (Top K)</li>
          </ol>
        </td>
        <td><b>n <= 10^6</b></td>
    </tr>
    <tr>
      <td>O(Nlog(N))</td>
      <td>
        <ol>
            <li><b>Sorting</b></li>
            <li>Quick Sort</li>
            <li>Merge Sort (Divide and conquer)</li>
        </ol>
      </td>
      <td><b>n <= 10^6</b></td>
    </tr>
    <tr>
      <td>O(N^2)</td>
      <td>
        <ol>
            <li>Brute Force (Nested loops)</li>
        </ol>
      </td>
      <td><b>n <= 10^3</b></td>
    </tr>
    <tr>
    <td>O(2^N)</td>
    <td>
      <ol>
          <li>Combinatorial Problems: Subset</li>
          <li>Backtracking</li>
      </ol>
    </td>
    <td><b>n <= 20</b></td>
  </tr>
  <tr>
    <td>O(N!)</td>
    <td>
      <ol>
          <li>Generating & Permutation Problems</li>
      </ol>
    </td>
    <td><b>n <= 12</b></td>
  </tr>
</table>

<b>Notes:</b> In happy case, we write algorithms to pass the following constraints:

<ul>
  <li><b>Search: </b>O(logN)</li>
  <li><b>Sort: </b>O(Nlog(N))</li>
</ul>

<h2>Space Complexity</h2>

<ol>
  <li>DFS uses less memory than BFS.</li>
  <li>Adjacency list uses less memory than matrix.</li>
</ol>

</details>