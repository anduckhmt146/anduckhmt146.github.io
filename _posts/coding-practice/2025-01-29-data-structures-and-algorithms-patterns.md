---
layout: post
title: 'DSA: Whiteboard Coding Patterns'
date: 2025-02-14
categories: tech
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
<ul>
    <li>A BFS or DFS function traverses all the nodes of a tree in scope function.</li>
    <li>The only different between Tree and Graph is: <b>Graph can have cycle, but Tree does not.</b></li>
</ul>

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

<h3>Shortest Path - Undirected/Directed Graph - Unweighted Graph (BFS)</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import deque
from typing import List

# Graph represented as an adjacency list
graph = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1],
    3: [0],
    4: [1, 5],
    5: [4]
}

def get_neighbors(node: int):
    return graph.get(node, [])

# BFS to find the shortest path
def shortest_path(graph: List[List[int]], a: int, b: int) -> int:
    def bfs(root: int, target: int):
        queue = deque([root])
        visited = {root}
        level = 0  # Represents distance

        while queue:
            n = len(queue)
            for _ in range(n):
                node = queue.popleft()
                if node == target:
                    return level  # Found the shortest path
                for neighbor in get_neighbors(node):
                    if neighbor not in visited:
                        queue.append(neighbor)
                        visited.add(neighbor)
            level += 1  # Increase distance at each BFS level
        
        return -1  # No path found

    return bfs(a, b)

# Example usage
start, end = 0, 5
print(f"Shortest path from {start} to {end}:", shortest_path(graph, start, end))

# Output: 0 → 1 → 4 → 5, Shortest path from 0 to 5: 3

</code>
</pre>

<b>Notes:</b>

<ul>
    <li><b>Time Complexity:</b> O(E + V) (Edges + Vertices)</li>
    <li><b>Space Complexity:</b> O(V) (Vertices)</li>
</ul>
</details>

<h3>Shortest Path - Undirected/Directed Graph -  Weighted Graph (Dijkstra's Algorithm)</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from heapq import heappop, heappush
from math import inf
from typing import List, Tuple

def shortest_path(graph: List[List[Tuple[int, int]]], a: int, b: int) -> int:
    def get_neighbors(node: int):
        return graph[node]

    def dijkstra(root: int, target: int) -> int:
        num_nodes = len(graph)
        distances = [inf] * num_nodes
        distances[root] = 0  # Distance to start node is 0
        queue = [(0, root)]  # (distance, node) heap

        while queue:
            curr_dist, node = heappop(queue)

            # If we reached the target node, return the shortest distance
            if node == target:
                return curr_dist

            for neighbor, weight in get_neighbors(node):
                new_dist = curr_dist + weight
                if new_dist < distances[neighbor]:  # Found a shorter path
                    distances[neighbor] = new_dist
                    heappush(queue, (new_dist, neighbor))

        return -1 if distances[target] == inf else distances[target]

    return dijkstra(a, b)

# Example usage
if __name__ == "__main__":
    # Example graph (Adjacency List)
    graph = [
        [(1, 4), (2, 1)],  # Node 0 -> (Node 1, Weight 4), (Node 2, Weight 1)
        [(3, 1)],          # Node 1 -> (Node 3, Weight 1)
        [(1, 2), (3, 5)],  # Node 2 -> (Node 1, Weight 2), (Node 3, Weight 5)
        []                 # Node 3 (no outgoing edges)
    ]

    start, end = 0, 3
    result = shortest_path(graph, start, end)
    print(f"Shortest path from {start} to {end}: {result}")
    
    # Output:
    # The shortest path is 0 → 2 → 1 → 3, with cost 1 + 2 + 1 = 4.
    # Shortest path from 0 to 3: 4
</code>
</pre>

<b>Notes:</b>

<ul>
    <li><b>Time Complexity:</b> O((V + E) * log(V))</li>
    <li><b>Space Complexity:</b> O(V)</li>
</ul>

</details>

<h3>Topological Sort - Non-Cycle Graph - Task Scheduling</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import deque

def find_indegree(graph):
    indegree = { node: 0 for node in graph }  # dict
    for node in graph:
        for neighbor in graph[node]:
            indegree[neighbor] += 1
    return indegree

def topo_sort(graph):
    res = []
    q = deque()
    indegree = find_indegree(graph)
    for node in indegree:
        if indegree[node] == 0:
            q.append(node)
    while len(q) > 0:
        node = q.popleft()
        res.append(node)
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                q.append(neighbor)
    return res if len(graph) == len(res) else None

# Example Graph (DAG)
graph = {
    'A': ['C'],
    'B': ['C', 'D'],
    'C': ['E'],
    'D': ['F'],
    'E': ['H', 'F'],
    'F': ['G'],
    'G': [],
    'H': []
}

# Perform topological sorting
result = topo_sort(graph)

# Output the result
print("Topological Order:", result)

# Output: Topological Order: ['A', 'B', 'C', 'D', 'E', 'H', 'F', 'G']
</code>
</pre>

<b>Notes:</b>

<ul>
    <li><b>Time Complexity:</b> O(V + E)</li>
    <li><b>Space Complexity:</b> O(V + E)</li>
</ul>

</details>

<h3>Minimum Spanning Tree - Shortest Resource To Connect Graph Components</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
import heapq

def prim(graph, start):
    # Priority queue (min-heap) for edges
    pq = []
    # To keep track of visited vertices
    visited = set()
    # Initialize MST edges and total weight
    mst_edges = []
    mst_weight = 0
    
    # Function to add edges to priority queue
    def add_edges(vertex):
        visited.add(vertex)
        for neighbor, weight in graph[vertex]:
            if neighbor not in visited:
                heapq.heappush(pq, (weight, vertex, neighbor))
    
    # Start with the start vertex
    add_edges(start)
    
    while pq:
        weight, u, v = heapq.heappop(pq)
        
        if v not in visited:
            mst_edges.append((u, v, weight))
            mst_weight += weight
            add_edges(v)
    
    return mst_edges, mst_weight

# Example graph: adjacency list representation
graph = {
    'A': [('B', 1), ('C', 4), ('D', 3)],
    'B': [('A', 1), ('D', 2), ('E', 5)],
    'C': [('A', 4), ('D', 6)],
    'D': [('B', 2), ('C', 6), ('E', 5)],
    'E': [('B', 5), ('D', 5)]
}

# Starting from vertex 'A'
mst_edges, mst_weight = prim(graph, 'A')

# Output the result
print("MST Edges:", mst_edges)
print("Total MST Weight:", mst_weight)

</code>
</pre>

<b>Notes:</b>

<ul>
    <li><b>Time Complexity:</b> O(ElogV)</li>
    <li><b>Space Complexity:</b> O(V + E)</li>
</ul>

</details>
</details>

<details>
<summary><h2>3.3. Array</h2></summary>

<h3>Binary Search</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

# Example Feasible Function
def feasible(mid: int, arr: List[int], target: int) -> bool:
    # Check if the element at 'mid' is greater than or equal to 'target'
    return arr[mid] >= target

# Binary Search with Feasible Function
def binary_search(arr: List[int], target: int) -> int:
    left, right = 0, len(arr) - 1
    first_true_index = -1
    
    while left <= right:
        mid = (left + right) // 2
        
        # Use the feasible function to check the current index
        if feasible(mid, arr, target):
            first_true_index = mid
            right = mid - 1  # Look for an earlier index where feasible is true
        else:
            left = mid + 1  # Look for a larger element in the right half
    
    return first_true_index


arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
target = 8

result = binary_search(arr, target)

if result != -1:
    print(f"The first index where the value is greater than or equal to {target} is {result}")
else:
    print(f"No value greater than or equal to {target} found")

</code>
</pre>
</details>

<h3>Same Direction</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

def remove_duplicates(arr: List[int]) -> int:
    slow = 0
    for fast in range(len(arr)):
        if arr[fast] != arr[slow]:
            slow += 1
            arr[slow] = arr[fast]
    return slow + 1

if __name__ == "__main__":
    arr = [int(x) for x in input().split()]
    res = remove_duplicates(arr)
    print(" ".join(map(str, arr[:res])))
</code>
</pre>
</details>

<h3>Opposite Direction</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

def two_sum_sorted(arr: List[int], target: int) -> List[int]:
    l, r = 0, len(arr) - 1
    while l < r:
        two_sum = arr[l] + arr[r]
        if two_sum == target:
            return [l, r]
        if two_sum < target:
            l += 1
        else:
            r -= 1
    return []

if __name__ == "__main__":
    arr = [int(x) for x in input().split()]
    target = int(input())
    res = two_sum_sorted(arr, target)
    print(" ".join(map(str, res)))
</code>
</pre>
</details>

<h3>Sliding Window (Fixed Size)</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

# Example of an optimal function - find maximum in the current window
def optimal(ans, window) -> int:
    return max(ans, max(window))

# Sliding Window Function with Fixed Window Size
def sliding_window_fixed(input: List[int], window_size: int) -> int:
    # Initialize the window with the first `window_size` elements
    window = input[:window_size]
    ans = optimal(float('-inf'), window)  # Set initial answer to the smallest possible number
    
    # Start sliding the window
    for right in range(window_size, len(input)):
        left = right - window_size
        # Remove the element at the `left` side of the window
        window.remove(input[left])
        # Append the new element at the `right` side of the window
        window.append(input[right])
        
        # Update the answer based on the current window
        ans = optimal(ans, window)
    
    return ans

# Example Usage
input_list = [1, 3, -1, -3, 5, 3, 6, 7]
window_size = 3

result = sliding_window_fixed(input_list, window_size)
print(f"The maximum value in each window is: {result}")

</code>
</pre>
</details>

<h3>Sliding Window (Longest Size)</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

# Function to check if the window is invalid (contains duplicate characters)
def invalid(window: List[str]) -> bool:
    return len(window) != len(set(window))  # If the window has duplicates, it's invalid

# Sliding Window Function to find the Longest Substring Without Repeating Characters
def sliding_window_flexible_longest(input: str) -> int:
    # Initialize the sliding window and result variable
    window = []
    ans = 0
    left = 0
    
    # Iterate over the string with the 'right' pointer
    for right in range(len(input)):
        # Append the current character to the window
        window.append(input[right])
        
        # Shrink the window from the left until it's valid (no duplicates)
        while invalid(window):
            window.remove(input[left])  # Remove the leftmost character
            left += 1  # Move the left pointer to the right
        
        # Update the answer with the size of the current valid window
        ans = max(ans, right - left + 1)
    
    return ans

# Example Usage
input_str = "abcabcbb"

result = sliding_window_flexible_longest(input_str)
print(f"The length of the longest substring without repeating characters is: {result}")


</code>
</pre>
</details>

<h3>Sliding Window (Smallest Size)</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

# Function to check if the window sum is greater than or equal to the target
def valid(window: List[int], target: int) -> bool:
    return sum(window) >= target

# Sliding Window Function to find the Shortest Subarray with Sum >= target
def sliding_window_flexible_shortest(input: List[int], target: int) -> int:
    # Initialize the sliding window, result variable (ans), and left pointer
    window = []
    ans = float('inf')  # Start with an infinite answer
    left = 0
    
    # Iterate over the list with the 'right' pointer
    for right in range(len(input)):
        # Add the current element to the window
        window.append(input[right])
        
        # While the window is valid (sum >= target), shrink the window from the left
        while valid(window, target):
            # Update the answer to the minimum size of the valid window
            ans = min(ans, right - left + 1)
            
            # Remove the element at the left side of the window and move 'left' pointer
            window.pop(0)
            left += 1
    
    # Return the smallest valid window length, or -1 if no valid window is found
    return ans if ans != float('inf') else -1

# Example Usage
input_list = [2, 1, 5, 2, 3, 2]
target = 7

result = sliding_window_flexible_shortest(input_list, target)
print(f"The length of the shortest subarray with sum >= {target} is: {result}")
</code>
</pre>
</details>

<h3>Prefix Sum</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import Counter, List

def subarray_sum_total(arr: List[int], target: int) -> int:
    prefix_sums: Counter[int] = Counter()
    prefix_sums[0] = 1  # since empty array's sum is 0
    cur_sum = 0
    count = 0
    for val in arr:
        cur_sum += val
        complement = cur_sum - target
        if complement in prefix_sums:
            count += prefix_sums[complement]
        prefix_sums[cur_sum] += 1
    return count

if __name__ == "__main__":
    arr = [int(x) for x in input().split()]
    target = int(input())
    res = subarray_sum_total(arr, target)
    print(res)
</code>
</pre>
</details>

</details>

<details>
<summary><h2>3.4. Stack</h2></summary>

<h3>Mono Stack</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
def mono_stack(insert_entries):
    stack = []
    result = []  # This will store the next greater elements
    for entry in insert_entries:
        # Pop elements from the stack that are less than or equal to the current element
        while stack and stack[-1] <= entry:
            stack.pop()
        if stack:
            result.append(stack[-1])  # The top of the stack is the next greater element
        else:
            result.append(None)  # No greater element exists
        stack.append(entry)  # Push the current entry onto the stack
    return result

# Example usage
entries = [4, 5, 2, 10, 8]
next_greater = mono_stack(entries)
print(next_greater)

# Output: [None, 4, None, 2, 2]
</code>
</pre>
</details>
</details>

<details>
<summary><h2>3.5. Heap</h2></summary>

<h3>Top K</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from heapq import heappop, heappush
from typing import List, Tuple

def k_closest_points(points: List[List[int]], k: int) -> List[List[int]]:
    def dist(point: List[int]) -> int:
        return -(point[0] ** 2 + point[1] ** 2)  # "-" for max heap

    max_heap: List[Tuple[int, List[int]]] = []
    for i in range(k):
        pt = points[i]
        heappush(max_heap, (dist(pt), pt))

    for i in range(k, len(points)):
        pt = points[i]
        if dist(pt) > max_heap[0][0]:
            heappop(max_heap)
            heappush(max_heap, (dist(pt), pt))

    res = []
    while len(max_heap) > 0:
        _, pt = heappop(max_heap)
        res.append(pt)
    res.reverse()
    return res

if __name__ == "__main__":
    # Fixed input example
    points = [
        [1, 3],  # Point (1, 3)
        [-2, 2], # Point (-2, 2)
        [5, 8],  # Point (5, 8)
        [0, 1],  # Point (0, 1)
        [-1, -1] # Point (-1, -1)
    ]
    k = 3  # We need to find the 3 closest points to the origin

    # Get the closest k points
    res = k_closest_points(points, k)

    # Output the result
    for row in res:
        print(" ".join(map(str, row)))

</code>
</pre>
</details>

<h3>Two Heaps</h3>
<details>
<summary>Code</summary>

<pre>
<code class="python">
from heapq import heappop, heappush

class MedianOfStream:
    def __init__(self):
        self.max_heap = []
        self.min_heap = []

    def add_number(self, num: float) -> None:
        if len(self.min_heap) == 0 or num < self.min_heap[0]:
            heappush(self.max_heap, -num)
        else:
            heappush(self.min_heap, num)
        self._balance()

    def get_median(self) -> float:
        if len(self.max_heap) == len(self.min_heap):
            return (-self.max_heap[0] + self.min_heap[0]) / 2
        return -self.max_heap[0]

    def _balance(self) -> None:
        if len(self.max_heap) < len(self.min_heap):
            val = heappop(self.min_heap)
            heappush(self.max_heap, -val)
        if len(self.max_heap) > len(self.min_heap) + 1:
            val = heappop(self.max_heap)
            heappush(self.min_heap, -val)

if __name__ == "__main__":
    median_of_stream = MedianOfStream()
    n = int(input())
    for _ in range(n):
        line = input().strip()
        if line == "get":
            median = median_of_stream.get_median()
            print(f"{median:.1f}")
        else:
            num = float(line)
            median_of_stream.add_number(num)

</code>
</pre>
</details>

</details>

<details>
<summary><h2>3.6. Backtracking</h2></summary>

<h3>Backtracking (Generate)</h3>

<details>
<summary>Template</summary>

<pre>
<code class="python">
ans = []
def dfs(start_index, path, [...additional states]):
    if is_leaf(start_index):
        ans.append(path[:]) # add a copy of the path to the result
        return
    for edge in get_edges(start_index, [...additional states]):
        # prune if needed
        if not is_valid(edge):
            continue
        path.add(edge)
        if additional states:
            update(...additional states)
        dfs(start_index + len(edge), path, [...additional states])
        # revert(...additional states) if necessary e.g. permutations
        path.pop()

</code>
</pre>
</details>

<details>
<summary>Example: Finding All Paths in a Graph with Additional States</summary>

<pre>
<code class="python">
from typing import List

# Example graph (nodes have weights)
graph = {
    0: [1, 2],    # Node 0 has edges to nodes 1 and 2
    1: [3],       # Node 1 has an edge to node 3
    2: [3],       # Node 2 has an edge to node 3
    3: []         # Node 3 is a leaf node (no outgoing edges)
}

ans = []  # Store the result paths

# Example of node weights for each node
node_weights = {
    0: 2,  # Node 0 has weight 2
    1: 3,  # Node 1 has weight 3
    2: 1,  # Node 2 has weight 1
    3: 4   # Node 3 has weight 4
}

# Additional state: track the sum of the current path
def is_leaf(start_index: int) -> bool:
    return len(graph[start_index]) == 0

# Get edges from the current node (outgoing edges)
def get_edges(start_index: int) -> List[int]:
    return graph[start_index]

# Check if the edge is valid (pruning condition)
def is_valid(edge: int, visited: set) -> bool:
    return edge not in visited  # Valid if the edge has not been visited

# DFS function with additional state (path_sum)
def dfs(start_index: int, path: List[int], visited: set, path_sum: int, target_sum: int) -> None:
    # If leaf node and the path sum is valid, add the path to the answer
    if is_leaf(start_index):
        if path_sum <= target_sum:  # Prune paths that exceed the target sum
            ans.append(path[:])  # Add a copy of the path to the result
        return
    
    # Explore all outgoing edges from the current node
    for edge in get_edges(start_index):
        # Prune if the edge is not valid (i.e., already visited)
        if not is_valid(edge, visited):
            continue
        
        # Add the current edge to the path and mark it as visited
        path.append(edge)
        visited.add(edge)
        
        # Update the path_sum as we add the weight of the current node
        new_path_sum = path_sum + node_weights[edge]
        
        # Recursive DFS call with updated state
        dfs(edge, path, visited, new_path_sum, target_sum)
        
        # Backtrack: Remove the edge from path and unmark it as visited
        path.pop()
        visited.remove(edge)

# Example Usage
start_node = 0  # Starting from node 0
path = [start_node]  # Initial path with the start node
visited = {start_node}  # Mark the start node as visited
path_sum = node_weights[start_node]  # Initialize the path sum with the start node's weight
target_sum = 7  # We want to find paths with a sum <= 7

# Run DFS to find all valid paths
dfs(start_node, path, visited, path_sum, target_sum)

# Output the result
print("All valid paths from start to end (with sum <= 7):", ans)
</code>
</pre>
</details>

<h3>Backtracking (Aggregation)</h3>

<details>
<summary>Template</summary>

<pre>
<code class="python">
def dfs(start_index, [...additional states]):
    if is_leaf(start_index):
        return 1
    ans = initial_value
    for edge in get_edges(start_index, [...additional states]):
        if additional states: 
            update([...additional states])
        ans = aggregate(ans, dfs(start_index + len(edge), [...additional states]))
        if additional states: 
            revert([...additional states])
    return ans
</code>
</pre>
</details>

<details>
<summary>Example: Finding the Number of Paths to Reach a Leaf Node in a Directed Graph</summary>

<pre>
<code class="python">
from typing import List

# Example graph (nodes are connected in a directed graph)
graph = {
    0: [1, 2],  # Node 0 has edges to nodes 1 and 2
    1: [3],     # Node 1 has an edge to node 3
    2: [3],     # Node 2 has an edge to node 3
    3: []       # Node 3 is a leaf node (no outgoing edges)
}

# A function to check if the node is a leaf node (no outgoing edges)
def is_leaf(start_index: int) -> bool:
    return len(graph[start_index]) == 0

# A function to get edges from the current node (outgoing edges)
def get_edges(start_index: int) -> List[int]:
    return graph[start_index]

# A function to aggregate the result (sum of all valid paths)
def aggregate(ans, result):
    return ans + result

# DFS function to find the number of paths from start node to leaf nodes
def dfs(start_index: int, visited: set) -> int:
    # If the node is a leaf node, return 1 (this is a valid path)
    if is_leaf(start_index):
        return 1
    
    ans = 0  # Initialize the result to 0 for counting valid paths

    # Explore all outgoing edges (neighbors)
    for edge in get_edges(start_index):
        # If the edge leads to a node not visited yet (avoid cycles)
        if edge not in visited:
            # Add the edge to visited set (mark as visited)
            visited.add(edge)
            
            # Recursively call DFS to find paths starting from 'edge'
            ans = aggregate(ans, dfs(edge, visited))
            
            # Backtrack: Remove the edge from visited set (revert state)
            visited.remove(edge)
    
    return ans

# Example Usage
start_node = 0  # Starting from node 0
visited = {start_node}  # Mark the start node as visited

# Run DFS to find all paths to the leaf nodes
total_paths = dfs(start_node, visited)

# Output the result
print("Total number of paths to leaf nodes:", total_paths)
</code>
</pre>
</details>

</details>

</details>
