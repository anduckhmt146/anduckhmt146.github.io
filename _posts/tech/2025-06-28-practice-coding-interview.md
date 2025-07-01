---
layout: post
title: Dynamic Programming, Stack, Merge Intervals
date: 2025-06-28
categories: tech
---

# 1. Dynamic Programming

## 1.1. Maximum Earnings From Taxi

```python
from bisect import bisect_right

class Solution:
    def maxTaxiEarnings(self, n: int, rides: List[List[int]]) -> int:
        # Sort by end time
        rides.sort(key=lambda x:x[1])
        m = len(rides)

        # Create a dp to track maximum until the i
        end_times = [ride[1] for ride in rides]
        dp = [0] * (m + 1)

        # Go backward
        for i in range(1, m + 1):
            start, end, tip = rides[i - 1]
            earning = end - start + tip
            # only find in array
            idx = bisect_right(end_times, start, lo = 0, hi = i - 1)
            dp[i] = max(dp[i - 1], dp[idx] + earning)

        return dp[m]
```

## 1.2. Partition Equal Subset Sum

- **Notes:**

For example: arr = [1,2,5]

dp[0] = True -> If we choose []
dp[1] = True -> If we choose [1]

```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        # Check we can contribute the target // 2 in the current array => If an array can sum to target // 2 in the index i => the rest still target // 2 too
        if sum(nums) % 2 != 0:
            return False

        target = sum(nums) // 2

        # dp[i] means "Can we form a subset of numbers from the list that sums up to exactly i?"
        dp = [False] * (target + 1)
        dp[0] = True # No choice subset is 0, we choose []
        # For example, dp[1] = True if we choose [1]

        # For each num, we try to add it to existing possible sums.
        for num in nums:
            for i in range(target, num - 1, -1):
                dp[i] = dp[i] or dp[i - num]

        return dp[target]
```

## 1.3. Subset Sum Problem

arr = [7, 3, 2, 5, 8]
target = 14

=> Output [7, 2, 5], True

```python
def isSubsetSum(arr, target_sum):
    # dp[i][targetSum] to track whether from i element we can form target
    n = len(arr)
    dp = [[False] * (target_sum + 1) for _ in range(n + 1)]

    # We always can get sum 0 by not choosing anything []
    for i in range(n + 1):
        dp[i][0] = True

    # Backward
    for i in range(n + 1):
        for j in range(1, target_sum + 1):
            if arr[i - 1] > j:
                # Can not choose arr[i - 1]
                dp[i][j] = dp[i - 1][j]
            else:
                # Can choose or not
                dp[i][j] = dp[i - 1][j] or dp[i - 1][j - arr[i - 1]]

    # Unil n -> find target_sum
    return dp[n][target_sum]
```

```python
def printBackward(dp, arr, n, target_sum):
    subset = []
    i, j = n, target_sum
    while i > 0 and j > 0:
        if dp[i][j] == dp[i - 1][j]:
            i -= 1
        else:
            subset.append(arr[i - 1])
            j -= arr[i - 1]
            i -= 1

    print(subset[::-1])
```

```python
def isSubsetSum(arr, target_sum):
    # dp[i][targetSum] to track whether from i element we can form target
    n = len(arr)
    dp = [[False] * (target_sum + 1) for _ in range(n + 1)]

    # We always can get sum 0 by not choosing anything []
    for i in range(n + 1):
        dp[i][0] = True

    # Backward
    for i in range(n + 1):
        for j in range(1, target_sum + 1):
            if arr[i - 1] > j:
                # Can not choose arr[i - 1]
                dp[i][j] = dp[i - 1][j]
            else:
                # Can choose or not
                dp[i][j] = dp[i - 1][j] or dp[i - 1][j - arr[i - 1]]

    # Unil n -> find target_sum
    result = dp[n][target_sum]

    printBackward(dp, arr, n, target_sum)

    return result

def printBackward(dp, arr, n, target_sum):
    subset = []
    i, j = n, target_sum
    while i > 0 and j > 0:
        if dp[i][j] == dp[i - 1][j]:
            i -= 1
        else:
            subset.append(arr[i - 1])
            j -= arr[i - 1]
            i -= 1

    print(subset[::-1])

print(isSubsetSum([7, 3, 2, 5, 8], 14))
```

## 1.4. Knapstack Problem

W = 4, profit[] = [1, 2, 3], weight[] = [4, 5, 1]

Using dp[i][weight] -> Get weight until ith element

```python
def knapsack(weights, values, capacity):
    # Create 2-D dp array to carry i item with capacity
    n = len(values)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    # Loop and update array
    for i in range(1, n + 1):
        for j in range(capacity + 1):
            if weights[i - 1] > j:
                dp[i][j] = dp[i - 1][j]
            else:
                # Lay hoac khong lay item i
                dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - weights[i - 1]] + values[i - 1])

    return dp[n][capacity]

weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
capacity = 5

print(knapsack(weights, values, capacity))
```

## 1.5. Target Sum (Positive and Negative)

- Split to array Negative and Positive, select from this collection to get the sum

- Trước sau gì cũng duyệt hết nên 1-D được rồi

- Call from [target_sum, num] thôi.

```python
from typing import List

class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        if (sum(nums) + target) % 2 != 0 or abs(target) > sum(nums):
            return 0

        # Find target_sum is postive, and other is negative
        target_sum = (sum(nums) + target) // 2

        # Trước sau gì cũng duyệt hết nên 1-D được rồi
        # Count the way to choose num -> get the sum
        dp = [0] * (target_sum + 1)
        dp[0] = 1  # One way to make sum 0 (pick nothing)

        for num in nums:
            for j in range(target_sum, num - 1, -1):
                dp[j] = dp[j] + dp[j - num]

        return dp[target_sum]

```

---

## 1.6. Unbounded Knapsack

weights = [2, 3, 4]
values = [40, 50, 100]
capacity = 8

print(unbounded_knapsack(weights, values, capacity)) # Output: 200

- Cái kia tính tới phần tử i chứ unbounded thì chỉ cần tính theo weight

- Cái nào cũng 2 vòng lặp, khác nào trong ngoài thôi.

- Can get ith item, dp[w - weights[i]] là bỏ cùng 1 cái khối lượng đó (bản chất là bỏ cái cũ) + lấy thêm cái đó.

- Loop tới n thôi, do cái này không có backward.

```python
def unbounded_knapsack(weights, values, capacity):
    n = len(weights)

    # Max value you can gain after catch i weights
    # Cái kia tính tới phần tử i chứ unbounded thì chỉ cần tính theo weight
    dp = [0] * (capacity + 1)
    dp[0] = 0

    # Go forward
    for w in range(1, capacity + 1):
        for i in range(n):
            # Can get ith item, dp[w - weights[i]] là bỏ cùng 1 cái khối lượng đó (bản chất là bỏ cái cũ) + lấy thêm cái đó
            if weights[i] <= w:
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[capacity]


weights = [2, 3, 4]
values = [40, 50, 100]
capacity = 8

print(unbounded_knapsack(weights, values, capacity))  # Output: 200
```

## 1.7. Minimum Cost to Cut a Stick (Min-max trong đoạn -> Cut cut này auto dynamic programming)

```python
from typing import List

class Solution:
    def minCost(self, n: int, cuts: List[int]) -> int:
        # Step 1: Add 0 and n to the list of cuts and sort it
        cuts = [0] + sorted(cuts) + [n]
        m = len(cuts)

        # Step 2: Initialize a 2D DP array
        dp = [[0] * m for _ in range(m)]

        # Step 3: Bottom-up DP - compute min cost for all intervals of increasing length
        for length in range(2, m):  # interval length
            for i in range(m - length):  # start of interval
                j = i + length  # end of interval
                dp[i][j] = float('inf')
                for k in range(i + 1, j):  # possible cut points between i and j
                    cost = cuts[j] - cuts[i] + dp[i][k] + dp[k][j]
                    dp[i][j] = min(dp[i][j], cost)

        # Step 4: Return the minimum cost to cut the entire stick
        return dp[0][m - 1]

```

## 1.8. Coin Change

```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        n = len(coins)

        # Number of way to have amount i
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0

        for w in range(1, amount + 1):
            for i in range(n):
                if coins[i] <= w:
                    dp[w] = min(dp[w], dp[w - coins[i]] + 1)

        return dp[amount] if dp[amount] != float('inf') else -1

```

## 1.8. Coin Change 2 (Dynamic Programming Count Sum)

- Bài count sum thì chạy 2 vòng for. For num bên ngoài, weight bên trong.

```python
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        # Init n of the amount
        n = len(coins)

        # Count way so init 0
        dp = [0] * (amount + 1)
        dp[0] = 1 # Do not get any coins

        for coin in coins:
            for w in range(coin, amount + 1):
                dp[w] += dp[w - coin]

        return dp[amount]
```

---

**Fibonacci Pattern**

## 1.9. Jump Game II

```python
from typing import List

class Solution:
    def jump(self, nums: List[int]) -> int:
        n = len(nums)

        # Minimum number to jump to ith
        dp = [float('inf')] * n
        dp[0] = 0

        for i in range(1, n):
            for j in range(i):
                if j + nums[j] >= i:  # Can we jump from j to i?
                    dp[i] = min(dp[i], dp[j] + 1)

        return dp[n - 1]
```

## 1.10. Min Cost Climbing Stairs

- dp[i] represents min cost to reach step i

```python
from typing import List

class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        n = len(cost)
        dp = [0] * (n + 1)  # dp[i] represents min cost to reach step i

        for i in range(2, n + 1):
            dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])

        return dp[n]

```

## 1.11. House Robber

- Backward: n + 1.

- Hiện tại thì n thôi

```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        n = len(nums)
        # Find max -> init 0
        # dp is max value the thief can get until the home i
        if n == 0:
            return 0
        if n == 1:
            return nums[0]

        dp = [0] * n
        dp[0] = nums[0]
        dp[1] = max(nums[0], nums[1])

        for i in range(2, n):
            # dp[i - 1] là skip nhà ith
            # dp[i - 2] + nums[i] là lấy nhà i - 2 và i
            dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])

        return dp[n - 1]

```

**Notes:**

- Cứ capacity thì capacity + 1.

- Loop trong array thì n.

---

**Notes:**

- Cái chuỗi liên tục (continuous) thì Sliding Window or Longest substring with K character -> You can pop to shrink the string -> Sliding Window (left to right), cái nào based trên quá khứ được dùng Sliding Window.

- Bớt element trong chuỗi liên tục -> Palindrome -> Dynamic Programming => Cái gì cần tương lai thì dùng pattern + Dynamic Programming.

## 1.12. Longest Palindromic Substring

- s[i..j] is a palindrome if:

  - s[i] == s[j] and

  - dp[i+1][j-1] == True (i.e., the inner substring is a palindrome)

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        n = len(s)
        if n < 2:
            return s

        # Create a 2D table to store palindrome truth values
        dp = [[False] * n for _ in range(n)]

        start = 0       # start index of longest palindrome
        max_len = 1     # length of longest palindrome

        # All substrings of length 1 are palindromes
        for i in range(n):
            dp[i][i] = True

        # Check all substring lengths from 2 to n
        for length in range(2, n + 1):           # substring length
            for i in range(n - length + 1):      # starting index
                j = i + length - 1               # ending index

                if s[i] == s[j]:
                    if length == 2 or dp[i + 1][j - 1]:
                        dp[i][j] = True
                        if length > max_len:
                            start = i
                            max_len = length

        return s[start:start + max_len]

```

- Still O(N^2), but Brute Force need O(N) to check palindrome -> But dynamic programming reuse the previous calculation.

## 1.13. Longest Substring with K Character

```python
class Solution:
    def longest_substring_with_k_distinct(self, str, k):
        # Given a string, find the length of the longest substring in it with no more than K distinct characters.
        windowStart = 0
        maxLength = 0
        charFrequency = {} # store the frequence count of character

        # in the following loop we'll try to extend the range [windowStart, windowEnd]
        for windowEnd in range(0, len(str)):
            endChar = str[windowEnd]
            charFrequency[endChar] = charFrequency.get(endChar, 0) + 1

            # shrink the window until we are left with k distinct characters
            # in the charFrequency dictionary
            while len(charFrequency) > k:
                startChar = str[windowStart]
                charFrequency[startChar] -= 1

                if charFrequency[startChar] == 0:
                    del charFrequency[startChar]
                windowStart += 1

            maxLength = max(maxLength, windowEnd - windowStart + 1)

        return maxLength
```

```python
def longest_substring_k_distinct_dp(s: str, k: int) -> int:
    n = len(s)
    dp = [[0]*n for _ in range(n)]
    max_len = 0

    for i in range(n):
        freq = {}
        for j in range(i, n):
            freq[s[j]] = freq.get(s[j], 0) + 1
            if len(freq) <= k:
                dp[i][j] = j - i + 1
                max_len = max(max_len, dp[i][j])
    return max_len

```

## 1.14. Longest Palindromic Subsequence (Subsequence có thể bỏ được)

- dp[i][j] => mean that is the maximum size palindrome until [i:j].

- if s[i] == s[j]: dp[i][j] = 2 + dp[i + 1][j - 1], cộng thêm 2 giá trị đầu cuối vào chuỗi hiện có => vẫn là chuỗi palindrome.

- else: dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]) => bỏ đầu hoặc cuối

```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        # Create a 2D DP array initialized to 0
        dp = [[0] * n for _ in range(n)]

        # All substrings of length 1 are palindromes of length 1
        for i in range(n):
            dp[i][i] = 1

        # Build the DP table
        for length in range(2, n + 1):  # Substring lengths from 2 to n
            for i in range(n - length + 1):
                j = i + length - 1
                if s[i] == s[j]:
                    dp[i][j] = 2 + dp[i + 1][j - 1]
                else:
                    dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])

        return dp[0][n - 1]
```

---

## 1.15. Longest Common Substring (Không based quá khứ được, 2 chuỗi khác nhau)

- Không based quá khứ được, 2 chuỗi khác nhau -> Dynamic Programming

```python
def longest_common_substring(s1: str, s2: str) -> int:
    n1, n2 = len(s1), len(s2)
    dp = [[0] * (n2 + 1) for _ in range(n1 + 1)]
    max_len = 0

    for i in range(1, n1 + 1):
        for j in range(1, n2 + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
                max_len = max(max_len, dp[i][j])

    return max_len

s1 = "geeksforgeeks"
s2 = "practicewritegeekscourses"
print(longest_common_substring(s1, s2))
```

## 1.16. Longest Common Subsequence (có thể bỏ i, hoặc j)

```python
class Solution:
    def longestCommonSubsequence(self, s1: str, s2: str) -> int:
        m, n = len(s1), len(s2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if s1[i - 1] == s2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

        return dp[m][n]
```

---

# 2. Stack

Use stack when:

- Nested structures

- Undo/rollback

- Balancing / matching elements (like parentheses)

- Monotonic order tracking (next greater/smaller)

## 2.1. Basic Calculator

Example: "-3+2"

    - First char is '-', so sign = '+' won’t apply right away.
    - It sees '-' as the first actual operator, then reads '3', and processes sign == '-', so it appends -3.

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

## 2.2 Design LRU

```python
class Node:
    def __init__(self, key: int, value: int):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> Node
        self.head = None  # LRU
        self.tail = None  # MRU

    def _remove(self, node: Node):
        """Remove a node from the linked list."""
        if node.prev:
            node.prev.next = node.next
        else:
            self.head = node.next  # node was head

        if node.next:
            node.next.prev = node.prev
        else:
            self.tail = node.prev  # node was tail

    def _add_to_tail(self, node: Node):
        """Add node to the end (MRU)."""
        node.prev = self.tail
        node.next = None
        if self.tail:
            self.tail.next = node
        self.tail = node

        if not self.head:
            self.head = node

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        node = self.cache[key]
        self._remove(node)
        self._add_to_tail(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.value = value
            self._remove(node)
            self._add_to_tail(node)
        else:
            if len(self.cache) >= self.capacity:
                # Remove LRU node
                lru = self.head
                self._remove(lru)
                del self.cache[lru.key]

            new_node = Node(key, value)
            self.cache[key] = new_node
            self._add_to_tail(new_node)

```

## 2.3. Queue using Stacks

```python
class MyQueue:

    def __init__(self):
        self.in_stack = []
        self.out_stack = []

    def push(self, x: int) -> None:
        self.in_stack.append(x)

    def pop(self) -> int:
        self.peek()  # Ensure out_stack has the current front element
        return self.out_stack.pop()

    def peek(self) -> int:
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack[-1]

    def empty(self) -> bool:
        return not self.in_stack and not self.out_stack

```

## 1.20. Stack using Queues

```python
from collections import deque

class MyStack:

    def __init__(self):
        self.queue = deque()

    def push(self, x: int) -> None:
        self.queue.append(x)
        # Rotate the queue so the last element becomes the front
        for _ in range(len(self.queue) - 1):
            self.queue.append(self.queue.popleft())

    def pop(self) -> int:
        return self.queue.popleft()

    def top(self) -> int:
        return self.queue[0]

    def empty(self) -> bool:
        return not self.queue

```

## 2.4. Evaluation of Postfix Expression

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

# Example usage
expr = "5 1 2 + 4 * + 3 -"
print(evaluate_postfix(expr))  # Output: 14

```

## 2.5. Evaluation of Prefix Expression

```python
def evaluate_prefix(expression):
    stack = []
    tokens = expression.split()[::-1]  # reverse for right-to-left

    for token in tokens:
        if token.isdigit():
            stack.append(int(token))
        else:
            a = stack.pop()
            b = stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            elif token == '/':
                stack.append(int(a / b))  # integer division

    return stack[0]

# Example usage
expr = "+ 9 * 2 3"
print(evaluate_prefix(expr))  # Output: 15

```

## 2.6. Min Stack

```python
class MinStack:

    def __init__(self):
        self.stack = []       # Main stack
        self.min_stack = []   # Stack to track current min at each level

    def push(self, val: int) -> None:
        self.stack.append(val)
        # Push the new min (either val or current min)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
        else:
            self.min_stack.append(self.min_stack[-1])

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]

```

## 2.7. Max Stack

```python
class MaxStack:

    def __init__(self):
        self.stack = []
        self.max_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.max_stack or val >= self.max_stack[-1]:
            self.max_stack.append(val)
        else:
            self.max_stack.append(self.max_stack[-1])

    def pop(self) -> int:
        self.max_stack.pop()
        return self.stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMax(self) -> int:
        return self.max_stack[-1]

    def empty(self) -> bool:
        return not self.stack

```

## 2.8. Decode String

Notes: curr_str = prev_str + curr_str \* prev_num

```python
 elif char == "]":
    prev_num = stack.pop()
    prev_str = stack.pop()
    # Note
    curr_str = prev_str + curr_str * prev_num
```

```python
class Solution:
    def decodeString(self, s: str) -> str:
        stack = []
        curr_num = 0
        curr_str = ""

        for char in s:
            if char.isdigit():
                curr_num = curr_num * 10 + (int(char))
            elif char == "[":
                stack.append(curr_str)
                stack.append(curr_num)
                curr_num = 0
                curr_str = ""
            elif char == "]":
                prev_num = stack.pop()
                prev_str = stack.pop()
                # Note
                curr_str = prev_str + curr_str * prev_num
            # Case char is character
            else:
                curr_str += char

        return curr_str
```

## 2.9. Car Fleet

```python
class Solution:
    def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:
        # Zip and sort by position
        cars = sorted(zip(position, speed), reverse=True)

        # The car closest to target is process first, and other cars will pass it
        times = [(target - pos) / spd for pos, spd in cars]

        # Count fleets
        fleets = 0
        curr_time = 0

        for time in times:
            if time > curr_time:
                fleets += 1
                curr_time = max(curr_time, time)

        return fleets
        
```