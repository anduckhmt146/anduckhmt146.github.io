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
