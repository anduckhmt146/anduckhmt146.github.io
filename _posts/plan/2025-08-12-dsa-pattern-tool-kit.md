---
layout: post
title: DSA Pattern and Toolkit
date: 2025-08-12
categories: plan
---

# 1. Toolkit

## 1.1. Two Pointer

- Go in the opposite direction.

- Go in the same direction.

- Swap to left.

- Swap back.

- Trapping water.

## 1.2. Sliding Window

- Fixed-size k elements.

- Dynamic size:

  - Prunning k disticts.

  - Min/Max in range k.

- Merge both Fixed-size and Dynamic size

## 1.3. Linked List

- Fast and slow pointer.

- Reversed linked list.

- Merge 2 linked list.

- Dummy node with new linked list.

- Delete node kth in the linked list.

## 1.4. Stack

- Calculate expression.

- Monolithic stack.

- Longest Valid Parenthesis "()"

## 1.5. CPU Scheduling

- Non-preemptive scheduling: Shortest Job First, Priority, FCFS.

- Preemptive scheduling: SRTF, round robin, cooldown time.

- Top K Closest (Max Heap).

- Top K Maximum (Min Heap).

## 1.6. Merge Interval

- Merge Interval.

- Overlapping Interval.

- Non-overlapping interval.

## 1.7. Divide and Conquer

- Quick sort.

- Merge sort.

- Pow(x,n).

## 1.8. DFS

- DFS in tree: Prunning, No-prunning.

Step 1: Basecase

Step 2: Prunning

Step 3: What node.val do

Step 4: What left right do

- DFS in graph: adjatency list, matrix, matrix boundaries

Step 1: Basecase

Step 2: Prunning

Step 3: Node

Step 4: Neighbor

- Backtracking: Permutations, Subset, Combination Sum.

## 1.9. BFS

- Level order in tree.

- Level order in graph.

- Topology Sort (In-degree = 0).

- BFS in matrix: Shortest path, dijkstra.

## 1.10. Greedy

- Greeds & Cookies.

- Buy and sell stock.

- Gas station.

- Jump game.

## 1.11. Trie

- Insert.

- Delete.

- Search.

- Prefix

## 1.12. Dynamic Programming

- Bounded knapstack.

- Unbounded knapstack.

- Subsequence.

- Robot matrix.

- Maximum profit scheduling.

- Edit Distance.

# 2. Patterns

## 2.1. Tree

- two branch top-down

- re-build tree (top-down)

- re-build BST (inorder
  approach)

- use BST attributes

- find LCA

- populate next ptr

- unique BST

- preorder

- turn tree to string

- inorder

- postorder

- bfs

- build a child_parent hashmap

- assign idx

- assign coordinates

## 2.2. Linked List

- use sentinel node

- use two pointers (prev and cur)

- use two pointers (slow and fast)

- use two pointers (find LCA/intersection)

- use two pointers (utilize symmetry property)

- get linked list length

- use merge sort to sort list

- interweaving nodes

- use dll and hashmap together

- change val as change node

- skiplist

## 2.3. Hash Map

- separate chaining

- store val

- store sth’s freq

- snapshot of hashmap

- build bijection mapping relation

- store valid val’s freq for finding pairs

## 2.4. Binary Search

- search in a sorted array for specific val

- search in a sorted array for most close val

- search in sth’s range

- use boundary to record

- rotated sorted array

## 2.5. Heap

- greedily schedule tasks (start/end/val)

- top k problem (based on heap)

- k way merge problem

- two heap problem

- storing and popping out elements

- use bfs and heap

## 2.6. String

- traverse from end

- handle value’s bound

- use chunk

- use rabin karp (rolling hash)

- string composition

## 2.7. Trie

- Standard trie

- Custom trie node

- perform dfs inside trie

## 2.8. Array

- traverse

- use boyer moore vote algorithm

- use reverse technique

- use circular array

- specific range array (cyclic sort)

- specific range array (cycle detection)

- use finite state machine

- use difference array

- use knuth shuffle

- use reservoir sampling

- simulation

- use swap

- maintain array's range dynamically

- pre-process the array

- compare two intervals each round

- use heap to store previous intervals’ states

- use standard prefix sum

- use hashmap to validate the gap subarray

- use standard sliding window

- use left ptr to record

- find next permutation

- traverse two sequences

- use shrink type

- use expand type

- use self defined sort

- top k problem (based on sort)

- use bucket sort

- use quick select

- use merge sort

## 2.9. Stack/Queue

- use queue to simulate

- use stack to store the last states

- implement stack/queue

- use variables to simulate stack

- use stack to simulate

- use monotonic queue and sliding window

- use monotonic stack (consider one side’s relationship)

## 2.10. Backtracking

- Subset.

- Permutation.

- Combination.

- Backtracking with constraints

## 2.11. Graph

- DFS.

- BFS with single source.

- BFS with multiple sources.

- union find

- kahn (topological sort)

- dijkstra (shortest path)

- bellman ford (shortest path)

- floyd warshall (shortest path)

- kruskal (mst)

- tarjan (scc)

- hierholzer (eulerian path)

- matrix

## 2.12. Bit Manipulation

- XOR

- Shift

- Bit Masking

## 2.13. Dynamic Programming

- 2D DP.

- Knapstack (0 - 1).

- Knapstack (Complete knapstack).

- Knapstack Permutation.

- Linear sequence

- LIS

- Double sequence

- interval (start from one interval)

## 2.14. Greedy

- greddy

## 2.15. Math

- sieve of eratosthenes

- exponentiation by squaring

- rejection sampling

- math
