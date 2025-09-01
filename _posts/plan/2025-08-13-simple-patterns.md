---
layout: post
title: DSA Pattern and Toolkit Cheetsheet
date: 2025-09-01
categories: plan
---

# 1. Problems

## 1. Serialize and Deserialize BST

Example: root = [2, 1, 3]

- serialize(self, root: Optional[TreeNode]) -> str
  => Build BST: "2 1 3"

- def deserialize(self, data: str) -> Optional[TreeNode]:
  => From "2 1 3"
  Step 1: Using upper and lower bound, at 2 (-inf, 2), (2, +inf) => Root is 2.
  Step 2: At 1, (-inf, 1), (1, 2) in the subleft tree.
  Step 3: At 3, (2, 3), (3, +inf) in the subright tree.

## 2. Insert Delete GetRandom O(1)

- def **init**(self):

  - self.dict = {} # value -> index in list
  - self.list = [] # stores values => use for random store.

- def insert(self, val: int) -> bool:

  - insert to a hash map => list = [1,2], dict = {1:0, 2:1}

- def remove(self, val: int) -> bool:

  - Swap the last index of dict into the key of val in hashmap => Val, index.
  - rs.remove(1) => # swap last(2) with 1, list=[2], dict={2:0} => self.list[idx] = last_val and self.dict[last_val] = idx
  - list.pop().
  - del self.dict[val]

- def getRandom(self) -> int:

  - Use random to get value by index in list.

## 3. Shortest Way to Form String

- Time Complexity: O(len(source) × len(target)).

- Idea 1: source = "abc", target = "abcbc"

=> Loop through target => And each time loop through source to count the character

=> Example: abcbc => Find first abc in source, find bc in source => Count 2.

- Idea 2: source = "abc", target = "acdbc"

=> Find ac in source, d not in source => Return -1.

- Idea 3: source = "xyz", target = "xzyxz"

=> Find xz in source, find y in source, find xz in source => Count 3

## 4. Populating Next Right Pointers in Each Node II

- Idea BFS: use the prev to store the prev node => build next to the node in same level.

- Why make sure node in the same len of queue is belonged to same level ?

  - Start [1] → level_size = 1 → process node 1, push children → queue becomes [2, 3].

  - Next level: level_size = 2 → process nodes 2, 3, connect them, push [4, 5, 7].

  - Next level: level_size = 3 → process 4, 5, 7. No children → done.

- Example:

1

2 3

4 5 7

Notes:

- Level 2: prev = 2 => 2 -> 3

- Level 3: prev = 4 => 4 -> 5, prev = 5 => 5 -> 7.

## 5. Minimum Height Trees

- The diameter of a tree = longest path between any two nodes.

=> Minimum height must be in the center of the tree.

- Trim all the **leaves** node until the remaining node > 2

## 6. Design Search Autocomplete System (Hay)

- Trie + HashMap

```bash
'i'   → ["i love you", "island", "i love leetcode"]
' '   → ["i love you", "i love leetcode"]
'a'   → []
'#'   → add "i a" into history
```

- Each node store all the sequences when come to this node, example: 'i a' => 'i', ' ', 'a' each node store ["i love you", "island", "i love leetcode"]

- def add_sentence(self, sentence: str, count: int): Use trie to traverse and search the node, when come to each node update the list of sentences.

- def search(self, prefix: str): Search prefix to the end of the prefix, find sentences with the last chracter of the prefix => Filter the last top 3 by heap.

- def input(self, c: str): When find the '#', add sentences to the tree.
