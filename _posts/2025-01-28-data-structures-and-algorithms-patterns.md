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

<details>
<summary><h1>3. DSA Patterns</h1></summary>

<details>
<summary><h2>3.1. Tree</h2></summary>

When to use BFS or DFS ?

<br/>

BFS is better at:

<ul>
    <li>Finding nodes close/closest to the root</li>
</ul>

 
DFS is better at:

<ul>
    <li>Finding nodes far away from the root</li>
</ul>

<h3>BFS</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import deque

class Node:
    def __init__(self, value):
        self.value = value
        self.children = []

def is_goal(node):
    # Define your goal condition here (e.g., find a specific value)
    return node.value == "goal2"

def FOUND(node):
    # Handle the case when the goal is found (e.g., return the node or its value)
    return f"Goal found: {node.value}"

def NOT_FOUND():
    # Handle the case when the goal is not found
    return "Goal not found in tree"

def bfs(root):
    queue = deque([root])
    while len(queue) > 0:
        node = queue.popleft()
        print(f"Visiting node: {node.value}")  
        # Debug/trace the visited nodes
        for child in node.children:
            if is_goal(child):
                return FOUND(child)
            queue.append(child)
    return NOT_FOUND()

# Create a tree for testing
root = Node("root") 
child1 = Node("child1")
child2 = Node("child2")
child3 = Node("goal")
child4 = Node("child4")

# Build the tree structure
root.children.extend([child1, child2])
child1.children.append(child3)
child2.children.append(child4)

# Test the BFS function
result = bfs(root)
print(result) 

# Output
Visiting node: root
Visiting node: child1
Visiting node: child2
Visiting node: goal
Visiting node: child4
Goal2 not found in tree
</code>
</pre>
</details>

<h3>DFS</h3>

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Node:
    def __init__(self, value):
        self.val = value
        self.left = None
        self.right = None

# DFS function with traversal tracking
def dfs(root, target, path):
    if root is None:
        return None
    
    # Add the current node to the traversal path
    path.append(root.val)
    
    print(f"Node: {root.val}")
    
    # Check if the current node matches the target
    if root.val == target:
        print(f"Traversal path: {path}")
        return root

    # Search in the left subtree
    left = dfs(root.left, target, path)
    if left is not None:
        return left
    
    # Search in the right subtree
    right = dfs(root.right, target, path)
    if right is not None:
        return right
    
    # Backtrack: remove the node from the path if the target is not found in its subtree
    path.pop()
    return None

# Create a binary tree
root = Node(1)
root.left = Node(2)
root.right = Node(3)
root.left.left = Node(4)
root.left.right = Node(5)
root.right.left = Node(6)
root.right.right = Node(7)

# Test the modified DFS function
target = 5
path = []  # List to track the traversal path
result = dfs(root, target, path)

if result:
    print(f"Node with value {target} found: {result.val}")
else:
    print(f"Node with value {target} not found.")

# Output
Node: 1
Node: 2
Node: 4
Node: 5
Traversal path: [1, 2, 5]
Node with value 5 found: 5
</code>
</pre>
</details>

<br />
<b>Notes:</b>
A BFS or DFS function traverses all the nodes of a tree in scope function.

</details>

<details>
<summary><h2>3.2. Graph</h2></summary>

When to use BFS or DFS ?

<br/>

BFS is better at:

<ul>
    <li>Finding the <b>shortest distance</b> between two vertices</li>
    <li>Graph of unknown size</li>
</ul>


DFS is better at:

<ul>
    <li>Use less memory than BFS for wide graphs</li>
    <li>Finding nodes far away from the root</li>
</ul>

<h3>BFS (Graph)</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import deque

# Example graph represented as an adjacency list
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B'],
    'F': ['C']
}

# Function to get neighbors of a node
def get_neighbors(node):
    return graph.get(node, [])

# BFS Implementation
def bfs(root):
    queue = deque([root])
    visited = set([root])

    while queue:
        node = queue.popleft()
        print(node, end=" ")  # Process the node (print in this case)

        for neighbor in get_neighbors(node):
            if neighbor not in visited:
                queue.append(neighbor)
                visited.add(neighbor)

# Run BFS starting from node 'A'
bfs('A')
</code>
</pre>

<b>Notes:</b> Because you loop all the graph nodes, so time complexity is O(N).
</details>

<h3>BFS (Matrix)</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import deque

# Example grid
grid = [
    [1, 1, 0, 1, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1]
]

num_rows, num_cols = len(grid), len(grid[0])

# Function to get valid 4-directional neighbors
def get_neighbors(coord):
    row, col = coord
    delta_row = [-1, 0, 1, 0]
    delta_col = [0, 1, 0, -1]
    res = []
    for i in range(4):
        neighbor_row = row + delta_row[i]
        neighbor_col = col + delta_col[i]
        if 0 <= neighbor_row < num_rows and 0 <= neighbor_col < num_cols:
            res.append((neighbor_row, neighbor_col))
    return res

# BFS function to traverse the grid
def bfs(starting_node):
    queue = deque([starting_node])
    visited = set([starting_node])

    while queue:
        node = queue.popleft()
        row, col = node

        # Process the node (print its position)
        print(f"Visited: ({row}, {col})")

        for neighbor in get_neighbors(node):
            if neighbor in visited:
                continue
            
            # Do stuff with the node if required
            r, c = neighbor
            if grid[r][c] == 1:  # Only visit accessible cells (1s)
                queue.append(neighbor)
                visited.add(neighbor)

# Start BFS from (0,0)
bfs((0, 0))
</code>
</pre>

<b>Notes:</b> Because you loop all the items of the matrix, so time complexity is O(R x C).

</details>

<h3>BFS (Island - Connected Component)</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import deque

# Example grid
grid = [
    [1, 1, 0, 1, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1]
]

num_rows, num_cols = len(grid), len(grid[0])

# Function to get valid 4-directional neighbors
def get_neighbors(coord):
    row, col = coord
    delta_row = [-1, 0, 1, 0]
    delta_col = [0, 1, 0, -1]
    res = []
    for i in range(4):
        neighbor_row = row + delta_row[i]
        neighbor_col = col + delta_col[i]
        if 0 <= neighbor_row < num_rows and 0 <= neighbor_col < num_cols:
            res.append((neighbor_row, neighbor_col))
    return res

# BFS function to traverse an island and mark it visited
def bfs(starting_node, visited):
    queue = deque([starting_node])
    visited.add(starting_node)

    while queue:
        node = queue.popleft()
        row, col = node

        for neighbor in get_neighbors(node):
            r, c = neighbor
            if neighbor not in visited and grid[r][c] == 1:  # Only visit land cells (1s)
                queue.append(neighbor)
                visited.add(neighbor)

# Function to count islands
def count_islands(grid):
    visited = set()
    island_count = 0

    for r in range(num_rows):
        for c in range(num_cols):
            if grid[r][c] == 1 and (r, c) not in visited:
                bfs((r, c), visited) # It break out when can not BFS anymore
                island_count += 1

    return island_count

# Run the island count function
num_islands = count_islands(grid)
print("Number of islands:", num_islands)

# Output: 
# Number of islands: 2
</code>
</pre>

<b>Notes:</b> Because you loop all the items of the matrix, so time complexity is O(R x C).

</details>

<h3>DFS (Graph)</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
# Example graph represented as an adjacency list
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B'],
    'F': ['C']
}

# Function to get neighbors of a node
def get_neighbors(node):
    return graph.get(node, [])

# DFS function
def dfs(root, visited):
    print(root, end=" ")  # Process the node (print in this case)
    for neighbor in get_neighbors(root):
        if neighbor in visited:
            continue
        visited.add(neighbor)
        dfs(neighbor, visited)

# Run DFS starting from node 'A'
visited_nodes = set(['A'])  # Initialize visited set with the root node
dfs('A', visited_nodes)

# Output: A B D E C F
</code>
</pre>
</details>

<h3>DFS (Maze)</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import deque

# Example maze grid (0 = wall, 1 = open path)
maze = [
    [1, 1, 0, 1, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1]
]

num_rows, num_cols = len(maze), len(maze[0])

# Start and end positions
start = (0, 0)  # S (Start)
end = (0, 4)    # E (Exit)

# Function to get valid 4-directional neighbors
def get_neighbors(coord):
    row, col = coord
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    neighbors = []
    
    for dr, dc in directions:
        r, c = row + dr, col + dc
        if 0 <= r < num_rows and 0 <= c < num_cols and maze[r][c] == 1:
            neighbors.append((r, c))
    
    return neighbors

# DFS function to find a path from start to exit
def dfs(node, visited, path):
    if node == end:  # Reached the exit
        return True

    visited.add(node)
    path.append(node)

    for neighbor in get_neighbors(node):
        if neighbor not in visited:
            if dfs(neighbor, visited, path):  # Recursive call
                return True  # Stop DFS when exit is found

    # Backtrack if no valid path found
    path.pop()
    return False

# Run DFS to find a path
visited_nodes = set()
path = []

if dfs(start, visited_nodes, path):
    print("Path to exit:", path)
else:
    print("No path found!")

# Output: Path to exit: [(0, 0), (0, 1), (1, 1), (2, 1), (2, 0), (2, 2), (2, 3), (1, 3), (0, 3), (0, 4)]
</code>
</pre>
</details>
</details>

<h2>3.3. Array</h2>

<h2>3.4. Heap</h2>

<h2>3.5. Backtracking</h2>

</details>