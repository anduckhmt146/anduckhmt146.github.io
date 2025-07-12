---
layout: post
title: Coding Interview Template
date: 2025-07-07
categories: plan
---

Here is the template for coding interview patterns

# 1. Two Pointer

![](/images/Coding-Interview/two-pointer-pattern.png)

## 1.1. Go in the opposite

- Step 1: Giống binary search nhưng mà không dùng mid

Sample:

```python
def twoSum(nums, target):
  left, right = 0, len(nums) - 1

  while left < right:
    current_sum = nums[left] + nums[right]
    if current_sum == target:
        return True

    if current_sum < target:
        left += 1
    else:
        right -= 1

  return False
```

## 1.2. 3-Sum (Keep one number -> 2-Sum):

- Step 1: Keep nums[i] and follow 2 sum pattern.

Sample:

```python
class Solution:
    def triangleNumber(self, nums: List[int]):
        nums.sort()
        n = len(nums)

        count = 0

        for end in range(n - 1, -1, -1):
            target = nums[end]
            left, right = 0, end - 1

            while left < right:
                curr_sum = nums[left] + nums[right]

                if curr_sum > target:
                    count += right - left # Node here (Keep right)
                    right -= 1
                else:
                    left += 1

        return count
```

## 1.3. Go in the same

- Step 1: Go from left to right.

- Step 2: Init nextNonDup.

- Step 3: If meet condition => Increase nextNonDup in condition.

```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        nextNonDup = 0
        n = len(nums)

        for i in range(n):
            if i == 0 or nums[i] != nums[nextNonDup - 1]:
                nums[nextNonDup] = nums[i]
                nextNonDup += 1

        return nextNonDup
```

## 1.4. Swapping

### 1.4.1. Swap to back

- Step 1: Go from left to right.

- Step 2: Init nextNonZeros.

- Step 3: If meet nums[i] == 0 => Swap it back => Increase nextNonZeros in condition.

```python
class Solution:
    def moveZeroes(self, nums: List[int]):
        n = len(nums)
        nextNonZeros = 0

        for i in range(n):
            if nums[i] != 0:
                nums[i], nums[nextNonZeros] = nums[nextNonZeros], nums[i]
                nextNonZeros += 1

        return nums
```

### 1.4.2. Swap back and front

- Step 1: Go from left and right, init counter i

- Step 2: If get nums[i] == 0 => Swap left, if get nums[i] == 1, increase i += 1. Only i += 1 when swap left

- Step 3: If get nums[i] == 2, swap to right.

```python
class Solution:
    def sortColors(self, nums: List[int]):
        left, right = 0, len(nums) - 1
        i = 0

        while i <= right:
            if nums[i] == 0:
                nums[i], nums[left] = nums[left], nums[i]
                left += 1
                i += 1
            elif nums[i] == 1:
                i += 1
            else:
                nums[i], nums[right] = nums[right], nums[i]
                right -= 1

        return nums
```

## 1.5. Trapping water

- Step 1: Count the gap between left and right.
- Step 2: Count value by leftMax and rightMax.

```python
class Solution:
    def trappingWater(self, heights: List[int]):
        if not heights:
            return 0
        left, right = 0, len(heights) - 1
        leftMax, rightMax = heights[left], heights[right]
        count = 0

        while left < right:
            if rightMax > leftMax:
                left += 1
                if heights[left] > leftMax:
                    leftMax = heights[left]
                else:
                    count += leftMax - heights[left]
            else:
                right -= 1
                if heights[right] > rightMax:
                    rightMax = heights[right]
                else:
                    count += rightMax - heights[right]

        return count
```

# 2. Sliding Window

![](/images/Coding-Interview/sliding-window-pattern.png)

## 2.1. Fixed-size k elements

- Step 1: Loop end pointer.

- Step 2: Counting

- Step 3: Prunning when end - start + 1 = k.

- Step 4: Update max_len in loop.

```python
class Solution:
    def maxSum(self, nums: List[int], k: int):
        state = 0
        start = 0
        max_sum = 0

        for end in range(len(nums)):
            state += nums[end]

            # Prunning
            if end - start + 1 == k:
                # Update max here
                max_sum = max(max_sum, state)
                state -= nums[start]
                start +=1

        return max_sum
```

## 2.2. Prunning k distincts

- Step 1: Loop end pointer.

- Step 2: Counting.

- Step 3: Prunning from start when reach the length => Increase start.

- Step 4: Find maximum outside the loop.

Sample:

```python
class Solution:
    def longestSubstringWithoutRepeat(self, s: str):
        k = 1

        # Init start
        start = 0
        state = {}
        n = len(s)
        max_len = 0

        # Loop end
        for end in range(n):
            # Counting
            state[s[end]] = state.get(s[end], 0) + 1
            while state[s[end]] > k:
                state[s[start]] -= 1
                if state[s[start]] == 0:
                    del state[s[start]]
                start += 1

            max_len = max(max_len, end - start + 1)

        return max_len
```

## 2.3. Min/Max in range k

- Step 1: Loop end pointer.

- Step 2: Counting

- Step 3: Prunning when reach the condition including max_freq, (e.g. end - start + 1 - max_freq > k) => Increase start.

- Step 4: Find max_len outside.

```pythonclass Solution:
    def characterReplacement(self, s: str, k: int):
        state = {}
        start = 0
        max_len = 0
        max_freq = 0

        # Loop end
        for end in range(len(s)):
            state[s[end]] = state.get(s[end], 0) + 1
            max_freq = max(max_freq, state[s[end]])
            while (end - start + 1 - max_freq) > k:
                state[s[start]] -= 1
                if state[s[start]] == 0:
                    del(state[s[start]])
                start += 1

            max_len = max(max_len, end - start + 1)

        return max_len
```

## 2.4. Merge 2 type

- Step 1: Priority fixed-size length k.

- Step 2: Prunning when end - start + 1 == k

- Step 3: Subarray length k => Handle state count in when end - start + 1 == k.

- Step 4: Subarray length k => Update max event in loop when len(state) == k

```python
class Solution:
    def maxSum(self, nums: List[int], k: int):
        state = {}
        curr_sum = 0

        start = 0
        max_sum = 0

        for end in range(len(nums)):
            state[nums[end]] = state.get(nums[end], 0) + 1
            curr_sum += nums[end]

            # Prunning
            if end - start + 1 == k:
                if len(state) == k:
                    # Update max here
                    max_sum = max(max_sum, curr_sum)

                curr_sum -= nums[start]
                state[nums[start]] -= 1
                if state[nums[start]] == 0:
                    del(state[nums[start]])

                start += 1

        return max_sum
```

# 3. Linked List

![](/images/Coding-Interview/linked-list-pattern.png)

## 3.1. Fast & Slow Pointer (Middle Of Linked List)

- Step 1: Init slow and fast to head

- Step 2: Điều kiện fast & fast.next.next

```python
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow = head
        fast = head

        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next
            if slow == fast:
                return True

        return False
```

## 3.2. Reversed Linked List

- Step 1: Using prev = None and current = head.

- Step 2: Assign curr->next = prev, assign by order: prev = current, current = next.

```python
def reverse(head):
  prev = None
  current = head
  while current:
    next_ = current.next
    current.next = prev
    prev = current
    current = next_

  return prev
```

## 3.3. Merge 2 Linked List

- Step 1: Init head.

- Step 2: Assign head to head of l1 or head of l2.

- Step 3: Using tail = head, using tail to transfer the 2 linked list.

```python
def merge_lists(l1, l2):
  if not l1: return l2
  if not l2: return l1

  if l1.val < l2.val:
    head = l1
    l1 = l1.next
  else:
    head = l2
    l2 = l2.next

  tail = head
  while l1 and l2:
    if l1.val < l2.val:
      tail.next = l1
      l1 = l1.next
    else:
      tail.next = l2
      l2 = l2.next
    tail = tail.next

  tail.next = l1 or l2
  return head
```

## 3.4. Dummny Node With New Array

- Step 1: Using dummy node to keep head.

- Step 2: Using current = head to transfer.

- Step 3: while current and current = current.next

```python
def findLength(head):
  length = 0
  current = head
  while current:
    length += 1
    current = current.next
  return length
```

## 3.5. Delete Node Kth in Linked List

- Step 1: Using current and prev

- Step 2: Read from prev to curr:

  - prev = curr
  - curr = curr -> next

- Step 3: If find value curr.val == target => prev.next = curr.next (skip curr node)

```python
def deleteNode(head, target):
  if head.val == target:
    return head.next

  prev = None
  curr = head

  while curr:
    if curr.val == target:
      prev.next = curr.next
      break
    prev = curr
    curr = curr.next

  return head
```

# 4. Stack

![](/images/Coding-Interview/stack-pattern.png)

## 4.1. Calculate expresion with "()"

- Step 1: Idea to calculate all the sum of stack.

- Step 2: Assign default sign = '+' => If meet negative -3 + 2

  - First sign = '+' num = 0 => Add 0 to stack and sign = '-'

  - When meet the second '+' => it append -3 to stack

  - Next character ch = '2' → updates num = 2.

  - No more characters → final operation triggere => sign = '+' → stack.append(2)

- Step 3: If meet '(' => recursive to count sum and break when meet ')'.

```python
class Solution:
    def calculate(self, s: str) -> int:
        def helper(chars):
            num = 0
            sign = '+'
            stack = []
            while chars:
                ch = chars.pop(0)

                if ch.isdigit():
                    num = num * 10 + int(ch)

                if ch == '(':
                    num = helper(chars)

                # not digit -> sign or not chars
                if ch in '+-*/)' or not chars:
                    if sign == '+':
                        stack.append(num)
                    elif sign == '-':
                        stack.append(-num)
                    elif sign == '*':
                        stack.append(stack.pop() * num)
                    elif sign == '/':
                        prev = stack.pop()
                        stack.append(int(prev / num))  # Truncate toward zero

                    sign = ch
                    num = 0

                    if ch == ')':
                        break

            return sum(stack)

        return helper(list(s))
```

## 4.2. Evaluation of Postfix Expression

- Step 1: If meet digit build it.

- Step 2: If you find the character => calculate and add to stack

- Step 3: Using stack sau / track trước

```python
def evaluate_postfix(expression):
    stack = []
    tokens = expression.split()

    for token in tokens:
        if token.isdigit():
            stack.append(int(token))
        else:
            b = stack.pop()
            a = stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            elif token == '/':
                stack.append(int(a / b))  # Integer division

    return stack[0]
```

## 4.3. Monolithic Stack

- Step 1: Loop from left to right, append i to stack.

- Step 2: if nums[i] > nums[stack[-1]] => Update index of the greater element of the last stack is nums[i]

```python
def nextGreaterElement(nums):
  n = len(nums)
  result = [-1] * n
  stack = []

  for i in range(n):
    while stack and nums[i] > nums[stack[-1]]:
      idx = stack.pop()
      result[idx] = nums[i]
    stack.append(i)

  return result
```

## 4.4. Longest Valid Parenthesis

- Step 1: If find '(' add to stack.

- Step 2: Else check prefix is '(' => pop the stack => Update max.

- Step 3: Else append it to stack.

```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        max_len = 0
        # Magic here to trick case ()
        # Store last index of '('
        stack = [-1]

        for i, char in enumerate(s):
            if char == '(':
                stack.append(i)
            else:
                stack.pop()
                if stack:
                   max_len = max(max_len, i - stack[-1])
                else:
                    stack.append(i)

        return max_len
```

# 5. CPU Scheduling

![](/images/Coding-Interview/cpu-scheduling-pattern.png)

## 5.1. Non-preemptive scheduling

### 5.1.1. SJF - Shortest Job First

### 5.1.2. Priority Scheduling

### 5.1.3. FCFS - First Come First Serve

## 5.2. Preemptive scheduling

### 5.2.1. SRTF - Shortest Remaining Time First

### 5.2.2. Round Robin

### 5.2.3. Cooldown

## 5.3. Top-K

### 5.3.1. Closest (Max Heap)

### 5.3.2. Maximum (Min Heap)

# 6. Merge Interval

![](/images/Coding-Interview/merge-interval-pattern.png)

## 6.1. Merge Interval

## 6.2. Overlapping Interval

## 6.3. Non-overlapping Interval

# 7. Divide and Conquer

![](/images/Coding-Interview/divide-and-conquer-pattern.png)

## 7.1. Merge Sort

## 7.2. Quick Sort

## 7.3. Pow(x, n)

# 8. DFS

# 9. BFS

# 10. Dynamic Programming

# 11. Greedy

# 12. Trie

```

```
