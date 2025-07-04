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

## 2.10. Generate Parentheses

- Add "(" to the string as much as possible, and after add "(", we add ")"

```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []

        def backtrack(curr_str, open_count, close_count):
            if len(curr_str) == 2 * n:
                res.append(curr_str)
                return

            if open_count < n:
                backtrack(curr_str + "(", open_count + 1, close_count)

            if close_count < open_count:
                backtrack(curr_str + ")", open_count, close_count + 1)

        backtrack("", 0, 0)
        return res
```

## 2.11. Longest Valid Parentheses

- Store last "(" of the character.

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

---

## 2.12. Next Greater Element

Notes: Loop from left to right, if nums[i] > the last stack => Update the index of greater than last stack is nums[i]

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

## 2.12. Next Smaller Element

Notes: Loop from left to right, if nums[i] < the last stack => Update the index of greater than last stack is nums[i]

```python
def nextSmallerElement(nums):
  n = len(nums)
  result = [-1] * n
  stack = []

  for i in range(n):
    while stack and nums[i] < nums[stack[-1]]:
      idx = stack.pop()
      result[idx] = nums[i]
    stack.append(i)

  return result
```

## 2.13. Daily Temperatures

```python
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)

        stack = []
        result = [0] * n

        for i in range(n):
            while stack and temperatures[i] > temperatures[stack[-1]]:
                top = stack.pop()
                result[top] = i - top

            stack.append(i)

        return result
```

## 2.14. Largest Rectangle in Histogram

- Find the first element smaller than the current row => Area.

- Find the max area from the left and the right too.

- Compare in both left and right max

Specical case: [2,4,6]

```python
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        stack = []
        max_area = 0
        i = 0
        n = len(heights)
        while i < n:
            if not stack or heights[i] >= heights[stack[-1]]:
                stack.append(i)
                i += 1
            else:
                top = stack.pop()
                right = i - 1
                left = stack[-1] if stack else -1
                area = heights[top] * (right - left)
                max_area = max(max_area, area)

        # Second pass: clean up remaining elements in stack
        # Make sure the stack is increment (2,4,6)
        while stack:
            top = stack.pop()
            right = n - 1
            left = stack[-1] if stack else -1
            area = heights[top] * (right - left)
            max_area = max(max_area, area)

        return max_area
```

# 3. Binary Search

## 3.1. Koko Eating Bananas

```python
import math

class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        # Greedy in range [1, max(piles)]
        left, right = 1, max(piles)

        def canEat(speed):
            count = 0
            for banana in piles:
                count += math.ceil(banana / speed)

            return count <= h

        while left <= right:
            mid = (left + right) // 2
            if canEat(mid):
                right = mid - 1
            else:
                left = mid + 1

        return left
```

## 3.2. Search in Rotated Sorted Array

- Search the target in array using O(logN)

- Idea: Using Binary Search of Binary Search

```python
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

```python
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        if not nums:
            return -1

        left, right = 0, len(nums) - 1

        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid

            if nums[left] <= nums[mid]:
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1

            else:
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1

        return -1
```

# 4. Merge Interval (Sort theo start time)

## 4.1. Check Overlap Interval (Can Attend Meeting)

```python
class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]):
        # Sort by start time
        intervals.sort(key=lambda x:x[0])

        n = len(intervals)

        # Check validate
        for i in range(1, n):
            # Overlap
            if intervals[i][0] < intervals[i - 1][1]:
                return False

        return True

```

## 4.2. Merge Interval

- Sort by start time:
  - If the start < last merge (overlap) => merge to the last.
  - Else: append to the list.

```python
def mergeIntervals(intervals):
  sortedIntervals = sorted(intervals, key=lambda x: x[0])
  merged = []

  for interval in sortedIntervals:
    if not merged or interval[0] > merged[-1][1]:
      merged.append(interval)
    else:
      merged[-1][1] = max(interval[1], merged[-1][1])

  return merged

```

## 4.3. Non-Overlapping

- Sort by end => check the overlap with end

```python
def nonOverlappingIntervals(intervals):
  if not intervals:
    return 0

  intervals.sort(key=lambda x: x[1])
  end = intervals[0][1]
  count = 1

  for i in range(1, len(intervals)):
    # Non-overlapping interval found
    if intervals[i][0] >= end:
      end = intervals[i][1]
      count += 1

  return len(intervals) - count
```

## 4.4. Insert Intervals

```python
class Solution:
    def insertIntervals(self, intervals: List[List[int]], newInterval: List[int]):
        intervals.append(newInterval)
        intervals.sort(key=lambda x:x[0])
        n = len(intervals)
        merged = []

        for i in range(0, n):
            # Do not overlap
            if not merged or intervals[i][0] > merged[-1][1]:
                merged.append(intervals[i])
            else:
                merged[-1][1] = max(merged[-1][1], intervals[i][1])

        return merged

```

## 4.5. Non-overlap Intervals

- intervals = [[1,3], [2,4], [3,5]]

=> Can not compare intervals[i][0] >= intervals[i - 1][1] => because if we skip the interval[i - 1], it will miss to select the interval[i].

```python
class Solution:
    def nonOverlappingIntervals(self, intervals: List[List[int]]):
        if not intervals:
            return 0

        # Sort by end time
        intervals.sort(key=lambda x:x[1])

        # len of intervals
        n = len(intervals)
        count = 1
        end = intervals[0][1]

        # Check the non-overlapping range
        for i in range(1, n):
            # The overlap interval
            if intervals[i][0] >= end:
                end = intervals[i][1]
                count += 1

        return n - count

```

## 4.6. Employee Free Time

```python
def employeeFreeTime(intervals):
    intervals.sort(key=lambda x:x[0])
    n = len(intervals)
    merged = []

    for i in range(n):
        # Do not overlap
        if not merged or intervals[i][0] > merged[-1][1]:
            merged.append(intervals[i])
        else:
            merged[-1][1] = max(merged[-1][1], intervals[i][1])

    result = []
    for i in range(len(merged) - 1):
        result.append([merged[i][1], merged[i + 1][0]])

    return result


schedule = [[2,4],[7,10],[1,5],[6,9]]
print(employeeFreeTime(schedule))
```

---

# 5. Recursion

- Rule 1: Luôn có basecase

- Rule 2: Ví dụ với input nhỏ trước (Lấy ví dụ cái nhỏ nhất trước)

- Rule 3: Không dùng external varibles, chỉ dùng parameter truyền vào recursive function => làm sao cái parameter đó nó càng gần base case hơn.

- Rule 4: luôn assump là cái bước trước đó đúng => dùng cái đó chứng minh bước sau

- Phân biệt Recursion and Tail Recursion:
  - Recursion: lưu vào stack call => go the basecase => compute back.
  - Tail Recursion: lưu trực tiếp trong hàm recursion => tới bước tail chỉ cần return không cần compute nữa.

# 6. Backtracking

## 6.1. Core Idea

- Backtrack is still a tree => depth-first tree searching

```python
function solvable(n):
    if n is a leaf node:
        if n is a goal node, return true
        else return false
    else:
        for each child c of n:
            if solvable(c): return true
        return false
```

How does this work?

    - If any child of n is solvable, then n is solvable.
    - If no child of n is solvable, then n is not solvable.

```python
boolean solve(Node n):
    put node n on the stack
    while the stack is not empty:
        topnode = the node at the top of the stack
        if topnode is a leaf:
            If it is a goal node, return true
            else pop it off the stack
        else:
            if topnode has untried children:
                push the next untried child onto the stack
            else pop the node off the stack
    return false
```

## 6.2. Prunning

Bản chất check isValid là 1 cách prunning

```python
boolean explore1 (int country, Color color) {
    if (country >= map.length())
        return goodColoring();

    mapColors[country] = color;
    for (Color c: Color.values()) {
        if (explore1(country + 1, c)) {
            return true;
        }
    }
    mapColors[country] = Color.NONE;
    return false;
}
```

- Prunning

```python
boolean explore1 (int country, Color color) {
    if (country >= map.length())
        return goodColoring();

    if (okToColor(country, color)) {
        mapColors[country] = color;
        for (Color c: Color.values()) {
            if (explore1(country + 1, c)) {
                return true;
            }
        }
        mapColors[country] = Color.NONE;
    }
    return false;
}
```

- Benchmark

```python
Method 1: 2355638070 ns.
Method 2: 20516 ns.
```

## 6.3. Binary Search

```python
function solvable(binaryTree):
    1. if node is null/None, return false
    2. if node is a goal node return true
    3. if solvable(node.leftChild), return true
    4. if solvable(node.rightChild), return true
    5. return false
```

```python
class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    # Insert key into BST
    def insert(self, key):
        self.root = self._insert(self.root, key)

    def _insert(self, node, key):
        if node is None:
            return Node(key)
        if key < node.key:
            node.left = self._insert(node.left, key)
        elif key > node.key:
            node.right = self._insert(node.right, key)
        return node

    # Search for a key
    def search(self, key):
        return self._search(self.root, key)

    def _search(self, node, key):
        if node is None or node.key == key:
            return node
        if key < node.key:
            return self._search(node.left, key)
        return self._search(node.right, key)

    # In-order traversal (sorted order)
    def inorder(self):
        result = []
        self._inorder(self.root, result)
        return result

    def _inorder(self, node, result):
        if node:
            self._inorder(node.left, result)
            result.append(node.key)
            self._inorder(node.right, result)

```

## 6.3. Binary Search II

- How to get the solution

```python
def solve(node):
    """Find goal node and report path."""
    if node == None:
        return None

    if node.is_goal_node:
        return [node.name]

    temp = solve(node.left_child)

    if temp != None:
        return [node.name] + temp

    temp = solve(node.right_child)
    if temp != None:
        return [node.name] + temp
        return None
```

## 6.4. Concepts

- Concepts for tree (k-tree)

```python
To search from a node:
    if the node is a goal node,
        return success.
    for each child of the node:
        if searching from that child succeeds,
        return success.
    return failure.
```

- Concepts for graph

```python
To search from a node:

    if the node is a goal node,
        return success.

    if we've been at this node before,
        return failure.

    for each neighbor of the node:
        if searching from that neighbor succeeds,
            return success.
    return failure
```

## 6.5. Debug:

- Print the order of function call.

- Order of sample call

```python
Entering solvable(Root)
| Entering solvable(A)
| | Entering solvable(C)
| | | Entering solvable(null)
| | | solvable(null) returns false
| | | Entering solvable(null)
| | | solvable(null) returns false
| | solvable(C) returns false
| | Entering solvable(D)
| | | Entering solvable(null)
| | | solvable(null) returns false
| | | Entering solvable(null)
| | | solvable(null) returns false
| | solvable(D) returns false
| solvable(A) returns false
| Entering solvable(B)
| | Entering solvable(E)
| | solvable(E) returns true
| solvable(B) returns true
solvable(Root) returns true
```

**- Scan all the path:**

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Build the tree
root = TreeNode(5)
root.left = TreeNode(4)
root.right = TreeNode(8)
root.left.left = TreeNode(11)
root.left.left.left = TreeNode(7)
root.left.left.right = TreeNode(2)
root.right.left = TreeNode(13)
root.right.right = TreeNode(4)

#        5
#       / \
#      4   8
#     /   / \
#   11  13  4
#   /  \
#  7    2

def findAllPaths(root, target):
    res = []

    def backtrack(node, path, total):
        if not node:
            return

        path.append(node.val)
        total += node.val
        print(f"Visited Node: {node.val}, Path: {path}, Sum: {total}")

        if not node.left and not node.right and total == target:
            print(f"✅ Found valid path: {path}")
            res.append(list(path))

        backtrack(node.left, path, total)
        backtrack(node.right, path, total)

        print(f"Backtracking from: {node.val}, Path before pop: {path}")
        path.pop()

    backtrack(root, [], 0)
    return res

paths = findAllPaths(root, 22)
print("All paths that sum to 22:", paths)
```

Output:

```python
Visited Node: 5, Path: [5], Sum: 5
Visited Node: 4, Path: [5, 4], Sum: 9
Visited Node: 11, Path: [5, 4, 11], Sum: 20
Visited Node: 7, Path: [5, 4, 11, 7], Sum: 27
Backtracking from: 7, Path before pop: [5, 4, 11, 7]
Visited Node: 2, Path: [5, 4, 11, 2], Sum: 22
✅ Found valid path: [5, 4, 11, 2]
Backtracking from: 2, Path before pop: [5, 4, 11, 2]
Backtracking from: 11, Path before pop: [5, 4, 11]
Backtracking from: 4, Path before pop: [5, 4]
Visited Node: 8, Path: [5, 8], Sum: 13
Visited Node: 13, Path: [5, 8, 13], Sum: 26
Backtracking from: 13, Path before pop: [5, 8, 13]
Visited Node: 4, Path: [5, 8, 4], Sum: 17
Backtracking from: 4, Path before pop: [5, 8, 4]
Backtracking from: 8, Path before pop: [5, 8]
Backtracking from: 5, Path before pop: [5]
All paths that sum to 22: [[5, 4, 11, 2]]
```

- Scan to find 1 path:

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Build the tree
root = TreeNode(5)
root.left = TreeNode(4)
root.right = TreeNode(8)
root.left.left = TreeNode(11)
root.left.left.left = TreeNode(7)
root.left.left.right = TreeNode(2)
root.right.left = TreeNode(13)
root.right.right = TreeNode(4)

def findOnePath(root, target):
    result = []

    def backtrack(node, path, total):
        if not node:
            return False

        path.append(node.val)
        total += node.val
        print(f"Visited Node: {node.val}, Path: {path}, Sum: {total}")

        if not node.left and not node.right and total == target:
            print(f"✅ Found valid path: {path}")
            result.extend(path)
            return True

        if backtrack(node.left, path, total) or backtrack(node.right, path, total):
            return True

        print(f"Backtracking from: {node.val}, Path before pop: {path}")
        path.pop()
        return False

    found = backtrack(root, [], 0)
    return result if found else None

# ✅ ACTUALLY CALL THE FUNCTION HERE
result = findOnePath(root, 22)
print("Final result:", result)
```

Output:

```python
Visited Node: 5, Path: [5], Sum: 5
Visited Node: 4, Path: [5, 4], Sum: 9
Visited Node: 11, Path: [5, 4, 11], Sum: 20
Visited Node: 7, Path: [5, 4, 11, 7], Sum: 27
Backtracking from: 7, Path before pop: [5, 4, 11, 7]
Visited Node: 2, Path: [5, 4, 11, 2], Sum: 22
✅ Found valid path: [5, 4, 11, 2]
Final result: [5, 4, 11, 2]
```

# 7. Tree

## 7.1. Path Sum:

- Find only 1 path

```python
class Solution:
    def pathSum(self, root: TreeNode, target: int) -> bool:
        def dfs(node, curr_sum):
            if not node:
                return False

            curr_sum += node.val

            # If it's a leaf node, check if the sum matches the target
            if not node.left and not node.right:
                # Find a function and return
                return curr_sum == target

            # Continue to left or right subtree
            return dfs(node.left, curr_sum) or dfs(node.right, curr_sum)

        return dfs(root, 0)

```

## 7.2. Count Good Nodes in Binary Tree:

- Cover all

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def goodNodes(self, root: TreeNode) -> int:
        # Duyet het
        count = 0

        def dfs(node, prev_max_value):
            nonlocal count
            if not node:
                return

            prev_max_value = max(prev_max_value, node.val)
            if node.val == prev_max_value:
                count += 1

            dfs(node.left, prev_max_value)
            dfs(node.right, prev_max_value)

        dfs(root, root.val)
        return count
```

## 7.3. Count Path Sum

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        if not root:
            return False

        def dfs(node, total):
            if not node:
                # In case [1,2] => When traversal right 1 -> null, targetSum = 1 => Count true, we do not allow it.
                return False

            # Calculate sum until val
            total += node.val

            # Only check when find in a leaf node
            if not node.left and not node.right:
                return total == targetSum

            left = dfs(node.left, total)
            right = dfs(node.right, total)
            # Return when found the result
            return left or right

        return dfs(root, 0)
```

## 7.4. Validate BST:

```python
class Solution:
    def validateBST(self, root):
        def dfs(node, min_val, max_val):
            if not node:
                return True

            if not (min_val < node.val < max_val):
                return False

            return dfs(node.left, min_val, node.val) and dfs(node.right, node.val, max_val)

        return dfs(root, float('-inf'), float('inf'))

```

## 7.5. Calculate Tilt

- Condition 1: Góc nhìn của node.

- Condition 2: Góc nhìn đối với parent của node.

```python
class Solution:
    def calculateTilt(self, root):
        # Scan all the tree
        tilt = 0
        def dfs(node):
            nonlocal tilt

            if not node:
                return 0

            # If I a node of the tree, I would return
            # Top-down
            left = dfs(node.left)
            right = dfs(node.right)
            tilt += abs(left - right)

            # return the sum of the current subtree
            # Bottom up
            return left + right + node.val

        dfs(root)
        return tilt

```

## 7.6. Path Sum

```python
class Solution:
    def pathSum(self, nodes: TreeNode, target: int):
        def dfs(node, total):
            if not node:
                return total == target

            # Calculate node
            total += node.val

            # Prunning here
            if not node.left and not node.right and total == target:
                return True

            left = dfs(node.left, total)
            right = dfs(node.right, total)

            # Left Right trả gì cho root
            return left or right

        return dfs(nodes, 0)
```

## 7.7. Count Good Nodes in Binary Tree

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def goodNodes(self, root: TreeNode) -> int:
        count = 0
        def dfs(node, prev_max):
            nonlocal count
            if not node:
                return False

            # What node do
            if node.val >= prev_max:
                prev_max = node.val
                count += 1

            # What left right do for root
            left = dfs(node.left, prev_max)
            right = dfs(node.right, prev_max)
            return left and right

        dfs(root, root.val)
        return count
```

## 7.8. Validate Binary Search Tree

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def dfs(node):
            if not node:
                return True

            # Step 1: Prunning
            if node.val < node.left or node.val > node.right:
                return False

            # Step 2: What node do
            # Continue to traversal to left and right

            # Step 3: What left and right do for node
            left = dfs(node.left)
            right = dfs(node.right)
            return left and right

        return dfs(root)
```

## 7.9. Binary Tree Tilt

- Step 1: Basecase
- Step 2: Prunning
- Step 3: What node.val do
- Step 4: What left right do for node

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def findTilt(self, root: Optional[TreeNode]) -> int:
        titl = 0

        def dfs(node):
            nonlocal titl

            # Step 1: Basecase
            if not node:
                return 0

            # Step 2: Prunning

            # Step 3: What node.val do
            # Calculate the left and right abs
            left = dfs(node.left)
            right = dfs(node.right)
            titl += abs(left - right)

            # Step 4: What left right do for node
            return left + right + node.val

        dfs(root)
        return titl
```

## 7.10. Diameter of a Binary Tree

- Height is call from the leaf to the node.

```python
class Solution:
    def maxDiameter(self, nodes: TreeNode):
        diameterLen = 0

        # Height from the leaf to the node
        def dfs(node):
            nonlocal diameterLen
            # Step 1: Base case
            if not node:
                return 0

            # Step 2: Prunning
            # No prunning

            # Step 3: What node val do
            # Find the max distance from its left and right
            left = dfs(node.left)
            right = dfs(node.right)
            # (Root -> right) + (Root -> left)
            diameterLen = max(diameterLen, left + right)

            # Step 4: Do left and right
            # Return the height of current subtree
            return 1 + max(left, right)

        dfs(nodes)
        return diameterLen
```

## 7.11. Path Sum II

- Backtrack.

- Basecase > Prunning > What Node do > What left and right do.

```python
class Solution:
    def pathSum(self, root, target):
        res = []

        def dfs(node, path, curr_sum):
            nonlocal res
            # Base case
            if not node:
                return False

            # What node do
            path.append(node.val)
            curr_sum += node.val

            if not node.left and not node.right and curr_sum == target:
                res.append(path[:])

            # Prunning
            if curr_sum > target:
                return False

            # What left and right do
            left = dfs(node.left, path, curr_sum)
            right = dfs(node.right, path, curr_sum)

            # backtrack
            path.pop()
            return left and right

        dfs(root, [], 0)
        return res

```

## 7.12. Longest Univalue Path (Hay)

- Step 1: Basecase
- Step 2: Prunning
- Step 3: What node.val do
- Step 4: What left right do for node

- Assump we already have the largest of the same value in left right

```python
    subLeft = dfs(node.left)
    subRight = dfs(node.right)

    currLeft, currRight = 0, 0
    if node.left and node.left.val == node.val:
        currLeft = subLeft + 1
    if node.right and node.right.val == node.val:
        currRight = subRight + 1
    max_height = max(max_height, currLeft + currRight)

    # What left and right do
    return max(currLeft, currRight)
```

```python
class Solution:
    def longestUnivaluePath(self, root: TreeNode):
        max_height = 0

        # Height from the leaf to curr_node
        def dfs(node):
            nonlocal max_height
            # Base case
            if not node:
                return 0

            # Prunning
            # No prunning

            # What node do
            # The max of same value from left and from right
            subLeft = dfs(node.left)
            subRight = dfs(node.right)

            currLeft, currRight = 0, 0
            if node.left and node.left.val == node.val:
                currLeft = subLeft + 1
            if node.right and node.right.val == node.val:
                currRight = subRight + 1
            max_height = max(max_height, currLeft + currRight)

            # What left and right do
            return max(currLeft, currRight)

        dfs(root)
        return max_height

```

# 8. Graph

## 8.1. Adjacency List

- Step 1: Basecase

- Step 2: Visit node

- Step 3: Visit neighbors

```python
adjList = {
    "1": ["2", "4"],
    "2": ["1", "3"],
    "3": ["2", "4"],
    "4": ["1", "3", "5"],
    "5": ["4"]
}
```

```python
def dfs(adjList):
    visited = set()
    def dfs_helper(node):
        if node in visited:
            return

        # Visit node
        print("Visit node: ", node)
        visited.add(node)
        for neighbor in adjList[node]:
            dfs_helper(neighbor)

    # Ensure the unconnected graph is still cover
    for node in adjList:
        if node not in visited:
            dfs_helper(node)

adjList = {
    "1": ["2", "4"],
    "2": ["1", "3"],
    "3": ["2", "4"],
    "4": ["1", "3", "5"],
    "5": ["4"]
}
dfs(adjList)
```

## 8.2. Copy Graph

```python
from typing import Dict, List

class IntGraphNode:
    def __init__(self, value = 0, neighbors = None):
        self.value = value
        self.neighbors = neighbors if neighbors is not None else []

class Solution:
    def copy_graph(self, node: IntGraphNode) -> Dict[int, List[int]]:
        def dfs(root):
            visited = set()
            result = {}

            def dfs_helper(node):
                if node.value in visited:
                    return

                visited.add(node.value)
                result[node.value] = [neighbor.value for neighbor in node.neighbors]

                for neighbor in node.neighbors:
                    dfs_helper(neighbor)

            if root:
                dfs_helper(root)
            return result

        return dfs(node)
```

## 8.3. Graph Valid Tree

- Graph connected.

- But no cycle.

  - **Idea:** Visit DFS and check we have visited the parent again.

  - Visited đại từ 1 node nào cũng được => nếu tất cả đều connected component thì có thể visited được hết.

- Using defaultdict for init.

- Allow to visit a dup again, as long as it is not a parent.

```python
from collections import defaultdict

class Solution:
    def graph_valid_tree(self, n, edges):
        graph = defaultdict(list)
        for start, end in edges:
            graph[start].append(end)
            graph[end].append(start)

        visited = set()
        def isCycle(node, parent):
            visited.add(node)
            for neighbor in graph[node]:
                # [0,1] and [1,0] is ok
                if neighbor == parent:
                    continue
                # Prunning => True xong không Prunning xuống nữa
                if neighbor in visited:
                    return True
                if isCycle(neighbor, node):
                    return True
            return False

        # Check not cycle & connected
        return not isCycle(0, 0) and len(visited) == n

```

## 8.4. Matrix DFS

- Step 1: Basecase

- Step 2: Prunning

- Step 3: Node

- Step 4: Neighbor

```python
def dfs(matrix):
    visited = set()

    # Cứ tưởng tượng toạ độ trên trục Oxy (0, 0)
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    def dfs_helper(r, c):
        # Basecase
        if (r, c) in visited:
            return

        # Prunning
        if r < 0 or r >= len(matrix) or c < 0 or c >= len(matrix[0]):
            return

        # Neighbor
        visited.add((r, c))
        print("Visit:", (r, c))
        for dr, dc in directions:
            dfs_helper(r + dr, c + dc)

    dfs_helper(0, 0)

matrix = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
]
dfs(matrix)
```

## 8.5. Flood Fill

- Step 1: Basecase

- Step 2: Prunning

- Step 3: Node

- Step 4: Neighbor

```python
class Solution:
    def flood_fill(self, image, sr, sc, color):
        m, n = len(image), len(image[0])
        # Visited
        visited = set()

        # Directions
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        def dfs(r, c, prev_color, color):
            # Base case
            if (r, c) in visited:
                return

            # Prunning
            if r < 0 or r >= m or c < 0 or c >= n:
                return

            if image[r][c] != prev_color or image[r][c] == color:
                return

            # Node
            image[r][c] = color

            # Neighbor
            for dr, dc in directions:
                dfs(r + dr, c + dc, prev_color, color)

        dfs(sr, sc, image[sr][sc], color)
        return image

```

## 8.6. Number of Islands

- Step 1: Basecase

- Step 2: Prunning

- Step 3: Node

- Step 4: Neighbor

- Notes: Logic check (r, c) in visited only match when the dfs call to the (r, c) => So we still need to check the visited outside too.

```python
class Solution:
    def number_of_islands(self, grid):
        row, col = len(grid), len(grid[0])
        visited = set()

        # directions
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        def dfs(r, c):
            # Base case
            # (0, 1) is already in visited if it was reached by DFS from another cell.
            if (r, c) in visited:
                return

            # Prunning
            if r < 0 or r >= row or c < 0 or c >= col:
                return

            if grid[r][c] == 0:
                return

            # Node
            visited.add((r, c))

            # Neighbor
            for dr, dc in directions:
                dfs(r + dr, c + dc)

        count = 0
        for i in range(row):
            for j in range(col):
                if grid[i][j] == 1 and (i, j) not in visited:
                    dfs(i, j)
                    count += 1

        return count

```

## 8.7. Boundaries in the Matrix (Surrounded Regions)

- DFS border 'O' to make is 'S'.

- Change another 'O' to 'X'.

```python
class Solution:
    def surrounded_regions(self, grid: List[List[str]]):
        if not grid or not grid[0]:
            return []
        row, col = len(grid), len(grid[0])
        visited = set()

        # Directions
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        def dfs(r, c):
            # Base case
            if (r, c) in visited:
                return

            # Prunning
            if r < 0 or r >= row or c < 0 or c >= col:
                return

            if grid[r][c] != 'O':
                return

            # Node
            visited.add((r, c))
            grid[r][c] = 'S'

            # Check neighbor
            for dr, dc in directions:
                dfs(r + dr, c + dc)

        # Step 1: DFS in col 0 and col - 1
        for i in range(row):
            if grid[i][0] == 'O':
                dfs(i, 0)
            if grid[i][col - 1] == 'O':
                dfs(i, col - 1)

        # Step 2: DFS in row 0 and row - 1
        for j in range(col):
            if grid[0][j] == 'O':
                dfs(0, j)
            if grid[row - 1][j] == 'O':
                dfs(row - 1, j)

        # Step 3: Change another X to O
        for i in range(row):
            for j in range(col):
                if grid[i][j] == 'O':
                    grid[i][j] = 'X'
                elif grid[i][j] == 'S':
                    grid[i][j] = 'O'

        return grid
```

## 8.8. Pacific Atlantic Water Flow

- Backtracking from border to check it contains both ocean.

```python
class Solution:
    def pacific_atlantic_flow(self, grid: List[List[int]]):
        # Water from high to low
        # Top - left: Pacific
        # Bottom - Right: Atlantic

        if not grid or not grid[0]:
            return []

        # Get row, col
        row, col = len(grid), len(grid[0])

        # Visited
        pacific = set()
        atlantic = set()

        # directions
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        def dfs(r, c, visited, prev_height):
            # Base case
            if (r, c) in visited:
                return

            # Prunning
            if r < 0 or r >= row or c < 0 or c >= col:
                return

            # If the height is larger than the curr_height => this water flow to the ocean
            if grid[r][c] < prev_height:
                return

            # Node
            visited.add((r, c))

            # Neighbor
            for dr, dc in directions:
                dfs(r + dr, c + dc, visited, grid[r][c])

        # Check in top and bottom row
        for j in range(col):
            dfs(0, j, pacific, grid[0][j])
            dfs(row - 1, j, atlantic, grid[row - 1][j])

        # Check in left and right col
        for i in range(row):
            dfs(i, 0, pacific, grid[i][0])
            dfs(i, col - 1, atlantic, grid[i][col - 1])

        # Count both in pacific and atlantic
        result = []
        for i in range(row):
            for j in range(col):
                if (i, j) in pacific and (i, j) in atlantic:
                    result.append([i, j])

        return result
```

# 9. BFS

## 9.1. Implement BFS:

Ideas:

    - Append to queue.

    - Popleft

- Step 1: Base case

- Step 2: Root

- Step 3: Neighbors

- Step 4: Pop start of the queue.

```python
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def bfs(root):
    # Base case
    if not root:
        return []

    # Root
    result = []
    queue = deque([root])

    # Neighbors
    while queue:
        # Add the node in start of the queue
        start = queue.popleft()
        result.append(start.val)

        # Add the left and right of start to queue
        if start.left:
            queue.append(start.left)

        if start.right:
            queue.append(start.right)

    return result

root = TreeNode(1)
root.left = TreeNode(2, TreeNode(4), TreeNode(5))
root.right = TreeNode(3, TreeNode(6))
print(bfs(root))
```

## 9.2. Level Order Sum

- Step 1: Base case

- Step 2: Root.

- Step 3: Neighbors.

- Step 4: Level of the queue.

- Step 5: Pop start

```python
from collections import deque

class Solution:
    def level_order_sum(self, root: TreeNode):
        # Base case
        if not root:
            return []

        # Root
        queue = deque([root])
        result = []

        # Neighbors
        while queue:
            # Level Queue
            level_size = len(queue)

            curr_sum = 0
            for _ in range(level_size):
                # Pop Start
                start = queue.popleft()
                curr_sum += start.val

                if start.left:
                    queue.append(start.left)

                if start.right:
                    queue.append(start.right)

            result.append(curr_sum)

        return result
```

## 9.3. Rightmost Node

- Step 1: Base case

- Step 2: Root

- Step 3: Neighbors

- Step 4: Level

- Step 5: Popleft.

```python
from collections import deque

class Solution:
    def rightmostNode(self, root: TreeNode):
        # Base case
        if not root:
            return []

        # Root
        queue = deque([root])
        result = []

        # Neighbors
        while queue:
            # Level size
            level_size = len(queue)

            for i in range(level_size):
                # Pop left
                start = queue.popleft()

                if i == level_size - 1:
                    result.append(start.val)

                if start.left:
                    queue.append(start.left)

                if start.right:
                    queue.append(start.right)

        return result
```

## 9.4. Zigzag Level Order

```python
from collections import deque

class Solution:
    def zig_zag(self, root: TreeNode):
        # Base case
        if not root:
            return []

        # Root
        queue = deque([root])
        result = []
        odd = True

        # Neighbors
        while queue:
            # Level
            level_size = len(queue)
            curr_list = []
            for _ in range(level_size):
                # Pop left
                start = queue.popleft()
                curr_list.append(start.val)
                if start.left:
                    queue.append(start.left)
                if start.right:
                    queue.append(start.right)

            if odd:
                result.append(curr_list[:])
            else:
                result.append(curr_list[::-1])

            odd = not odd

        return result

```

## 9.5. Maximum Width of Binary Tree

- Add the index of the node.

```python
from collections import deque

class Solution:
    def maxWidth(self, root: TreeNode):
        # Base case
        if not root:
            return 0

        # Node
        queue = deque([(root, 0)])
        max_width = 0

        # Neighbor
        while queue:
            # Level
            level_size = len(queue)
            _, first_index = queue[0]
            last_index = -1
            for i in range(level_size):
                # Pop left
                start, index = queue.popleft()

                if i == level_size - 1:
                    last_index = index

                if start.left:
                    queue.append((start.left, 2 * index))
                if start.right:
                    queue.append((start.right, 2 * index + 1))

            max_width = max(max_width, last_index - first_index + 1)

        return max_width

```

## 9.6. BFS in Adjacency List

- Step 1: Base case

- Step 2: Visit node

- Step 3: Visit neighbors

- Step 4: Level

- Step 5: Pop left

```python
from collections import deque

def bfs(adjList, root):
    # Base case

    # Root
    visited = set()
    queue = deque([root])

    # Neighbors
    while queue:
        # Popleft
        start = queue.popleft()

        print("Visited:", start)
        visited.add(start)

        # Neighbors
        for neighbor in adjList[start]:
            if neighbor not in visited:
                queue.append(neighbor)
                visited.add(neighbor)

adjList = {
    "1": ["2", "4"],
    "2": ["1", "3"],
    "3": ["2", "4"],
    "4": ["1", "3", "5"],
    "5": ["4"]
}

bfs(adjList, "1")
```

## 9.7. BFS in Matrix

```python
from collections import deque

def bfs(grid, r, c):
    # Base case

    # Node
    visited = set()
    queue = deque([(r, c)])

    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    # Neighbors
    while queue:
        # Pop left
        start_row, start_col = queue.popleft()
        visited.add((start_row, start_col))

        print("Visited:", (start_row, start_col))

        # Neighbors
        for dr, dc in directions:
            n_row = start_row + dr
            n_col = start_col + dc

            # Prunning
            if n_row < 0 or n_row >= len(grid) or n_col < 0 or n_col >= len(grid[0]):
                continue

            if (n_row, n_col) in visited:
                continue

            queue.append((n_row, n_col))
            visited.add((n_row, n_col))


matrix = [
    [0, 0, 0],
    [0, 1, 1],
    [0, 1, 0]
]

bfs(matrix, 0, 0)
```

## 9.8. Adjacency List Level-By-Level

```python
from collections import deque

def bfs(adjList, root):
    # Base case

    # Root
    visited = set()
    queue = deque(root)
    result = []

    # Neighbors
    while queue:
        # Level
        level_size = len(queue)
        temp = []

        for _ in range(level_size):
            # Pop left
            start = queue.popleft()
            visited.add(start)
            temp.append(start)

            # Neighbors
            for neighbor in adjList[start]:
                if neighbor not in visited:
                    queue.append(neighbor)
                    visited.add(neighbor)

        result.append(temp)

    return result

adjList = {
    "1": ["2", "4"],
    "2": ["1", "3"],
    "3": ["2", "4"],
    "4": ["1", "3", "5"],
    "5": ["4"]
}

print(bfs(adjList, "1"))
```

## 9.9. Matrix Level-By-Level

- queue = deque([(r, c)]): The way to init a tuple

```python
from collections import deque

def bfs(grid, r, c):
    # Base case

    # Node
    visited = set()
    # The way to init a tuple
    queue = deque([(r, c)])

    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    result = []

    # Neighbors
    while queue:
        level_size = len(queue)
        temp = []

        for _ in range(level_size):
            # Pop left
            start_row, start_col = queue.popleft()
            visited.add((start_row, start_col))
            temp.append((start_row, start_col))

            # Visited the neighbors
            for dr, dc in directions:
                n_row = start_row + dr
                n_col = start_col + dc

                # Prunning
                if n_row < 0 or n_row >= len(grid) or n_col < 0 or n_col >= len(grid[0]):
                    continue

                if (n_row, n_col) in visited:
                    continue

                queue.append((n_row, n_col))
                visited.add((n_row, n_col))

        result.append(temp)

    return result

matrix = [
    [0, 0, 0],
    [0, 1, 1],
    [0, 1, 0]
]
print(bfs(matrix, 0, 0))
```

## 9.10. Minimum Knight Moves

- To count the level of the node in BFS, add the length to a node too.

- level_size is total of of a level, find shortest path is the count of the level.

```python
from collections import deque

class Solution:
    def minimum_knight_moves(self, x: int, y: int):
        def bfs(start_x, start_y):
            # Base case

            # Root
            visited = set()
            queue = deque([(start_x, start_y)])

            # Start with (0, 0) in Oxy axis
            directions = [(-1, 2), (-2, 1), (-2, -1), (-1, -2), (1, 2), (2, 1), (2, -1), (1, -2)]

            steps = 0

            # Neighbors
            while queue:
                level_size = len(queue)
                for _ in range(level_size):
                    # Pop left
                    x_idx, y_idx = queue.popleft()
                    visited.add((x_idx, y_idx))
                    if (x_idx, y_idx) == (x, y):
                        return steps

                    # Neighbors
                    for dr, dc in directions:
                        nx_idx = x_idx + dr
                        ny_idx = y_idx + dc

                        # Prunning
                        if (nx_idx, ny_idx) in visited:
                            continue

                        queue.append((nx_idx, ny_idx))
                        visited.add((nx_idx, ny_idx))

                steps += 1

            return -1

        return bfs(0, 0)
```

## 9.11. Rotting Oranges

- BFS and change the value Fresh oranges to rottens oranges.

- If the value is rottens continue to BFS.

- Find the intitial rottens index first, only change fresh to rotten oranges.

```python
from collections import deque

class Solution:
    def rotting_oranges(self, grid: List[List[str]]):
        if not grid or not grid[0]:
            return -1

        row, col = len(grid), len(grid[0])
        fresh_oranges = 0

        # Node
        visited = set()
        queue = deque()
        times = -1

        for i in range(row):
            for j in range(col):
                if grid[i][j] == 'R':
                    queue.append((i, j))
                    visited.add((i, j))
                elif grid[i][j] == 'F':
                    fresh_oranges += 1

        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        # Neighbors
        while queue:
            # Level (Count)
            level_size = len(queue)
            for _ in range(level_size):
                # Pop left
                start_row, start_col = queue.popleft()

                # Neighbors
                for dr, dc in directions:
                    n_row = start_row + dr
                    n_col = start_col + dc

                    # Prunning
                    if n_row < 0 or n_row >= row or n_col < 0 or n_col >= col:
                        continue

                    if (n_row, n_col) in visited:
                        continue

                    if grid[n_row][n_col] != 'F':
                        continue

                    grid[n_row][n_col] = 'R'
                    queue.append((n_row, n_col))
                    visited.add((n_row, n_col))
                    fresh_oranges -= 1
            times += 1

        return times if fresh_oranges == 0 else -1

```

# 10. Backtracking

# 11. Divide and Conquer (quick sort, merge sort, pow x n)

## 11.1. Merge k Sorted Lists

- Step 1: Base case

- Step 2: Split Mid

- Step 3: Merge 2 list

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        # Assump we have 50 lists => change it multiple [list1, list2], [list3, list4]
        # Merge range
        # Merge 2 lists
        if not lists:
            return None
        return self.merge_range(lists, 0, len(lists) - 1)


    def merge_range(self, lists, left, right):
        # Base case
        # Mid
        # Merge 2 list

        if left == right:
            return lists[left]

        mid = (left + right) // 2

        l1 = self.merge_range(lists, left, mid)
        l2 = self.merge_range(lists, mid + 1, right)
        return self.merge_two_lists(l1, l2)


    def merge_two_lists(self, l1, l2):
        dummy = ListNode()
        current = dummy
        while l1 and l2:
            if l1.val < l2.val:
                current.next = l1
                l1 = l1.next
            else:
                current.next = l2
                l2 = l2.next

            current = current.next

        current.next = l1 if l1 else l2
        return dummy.next

```

## 11.2. Merge Sort

```python
def merge_sort(arr):
    # Base case: array of 0 or 1 element is already sorted
    if len(arr) <= 1:
        return arr

    # Split the array into two halves
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    # Merge the sorted halves
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    # Merge two sorted arrays
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Append any remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    return result

```

## 11.3. Max Subarray (Sliding Window - Hay):

```python
from typing import List

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # Initialize current max and global max to the first element
        current_sum = max_sum = nums[0]

        # Iterate through the rest of the array
        for num in nums[1:]:
            # Either start new subarray at current num or extend previous one
            current_sum = max(num, current_sum + num)
            max_sum = max(max_sum, current_sum)

        return max_sum

```

## 11.4. Quick Sort

- Using pivot to sort small < pivot < large.

- Continue to subarray.

- j đi sau i đi trước

- Step 1: Find left - right.

- Step 2: Find partition in subarray.

- Step 3: Sort Partition.

```python
def quick_sort(arr):
    def partition(low, high):
        pivot = arr[high]
        i = low - 1

        for j in range(low, high):
            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]

        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        return i + 1

    def quicksort_recursive(low, high):
        if low < high:
            pi = partition(low, high)
            quicksort_recursive(low, pi - 1)
            quicksort_recursive(pi + 1, high)

    quicksort_recursive(0, len(arr) - 1)
    return arr

```

## 11.5. Implement Quick Sort

- Step 1: Find pivot.

- Step 2: Recursive sort for each pivot of subarray (pivot1 of arr1, pivot2 of arr2)

```python
def partition(arr, left, right):
    pivot = arr[right]
    i = left - 1

    for j in range(left, right):
        # Swap to after pivot
        # j đi sau i đi trước
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    # Swap pivot
    arr[i + 1], arr[right] = arr[right], arr[i + 1]
    return i + 1



def quick_sort_recursion(arr, left, right):
    if left < right:
        pivot_index = partition(arr, left, right)
        quick_sort_recursion(arr, left, pivot_index - 1)
        quick_sort_recursion(arr,  pivot_index + 1, right)


def quick_sort(arr):
    quick_sort_recursion(arr, 0, len(arr) - 1)

arr = [1, 7, 4, 1, 10, 9, 2]
quick_sort(arr)
print(arr)

```

## 11.6. Implement Merge Sort

```python
def merge_two_lists(l1, l2):
    result = []
    i, j = 0, 0
    while i < len(l1) and j < len(l2):
        if l1[i] < l2[j]:
            result.append(l1[i])
            i += 1
        else:
            result.append(l2[j])
            j += 1

    result.extend(l1[i:])
    result.extend(l2[j:])
    return result

def merge_sort_recursive(arr, left, right):
    if left == right:
        return [arr[left]]

    mid = (left + right) // 2

    l1 = merge_sort_recursive(arr, left, mid)
    l2 = merge_sort_recursive(arr, mid + 1, right)

    return merge_two_lists(l1, l2)


def merge_sort(arr):
    if not arr:
        return []
    return merge_sort_recursive(arr, 0, len(arr) - 1)


arr = [1, 7, 4, 1, 10, 9, 2]
print(merge_sort(arr))

```

## 11.7. Pow(x, n):

- Step 1: Base case

- Step 2: Divide

- Step 3: Conquer

```python
class Solution:
    def myPow(self, x: float, n: int) -> float:
        def exponent(base, pow):
            # Base case
            if pow == 0:
                return 1.0

            # Divide
            half = exponent(base, pow // 2)

            # Conquer
            if pow % 2 == 0:
                return half * half
            else:
                return half * half * base

        if n < 0:
            x = 1 / x
            n = -n

        return exponent(x, n)


```

# 12. Dynamic Programming

## 12.1. Min Cost Climbing Stairs

- To reach the ith => we need cost[i] + come from (i - 1) or (i - 2).

```python
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        n = len(cost)
        if n == 0:
            return cost[0]
        if n == 1:
            return cost[1]

        dp = [0] * (n + 1)
        dp[0] = cost[0]
        dp[1] = cost[1]

        for i in range(2, n + 1):
            dp[i] = (0 if i == n else cost[i]) + min(dp[i - 1], dp[i - 2])

        return dp[n]
```

## 12.2. Minimum Path Sum

- Max value in (i, j) => dp[i][j] = grid[i][j] + min(dp[i - 1][j], dp[i][j - 1])

- Remember to fill the first row and left column.

```python
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        row, col = len(grid), len(grid[0])

        dp = [[0] * col for _ in range(row)]

        # Init dp
        dp[0][0] = grid[0][0]

        # We can do it because we start from (0, 0)
        # Start first row
        for j in range(1, col):
            dp[0][j] = grid[0][j] + dp[0][j - 1]

        # Start left column
        for i in range(1, row):
            dp[i][0] = grid[i][0] + dp[i - 1][0]


        # Fill in another value
        for i in range(1, row):
            for j in range(1, col):
                dp[i][j] = grid[i][j] + min(dp[i - 1][j], dp[i][j - 1])

        return dp[row - 1][col - 1]
```

## 12.3. Coin Change.

- Can choose between dp[x] and dp[x - coin] + 1 => I mean dp[x - coin] + 1 to reach the target coin.

- If the coin that can not be make => it still forever ('inf' + 1 = 'inf')

- Notes: amount + 1 => Because to reach amount

- Step 1: Loop coin

- Step 2: Loop target

```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # Step 1: Loop coin
        # Step 2: Loop target
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0 # Base case


        # amount + 1 => Because to reach amount
        for coin in coins:
            for i in range(coin, amount + 1):
                dp[i] = min(dp[i], dp[i - coin] + 1)

        return dp[amount] if dp[amount] != float('inf') else -1
```

## 12.4. Minimum Falling Path Sum (Hay)

- Start from the row n - 2 to upward

- Choose the min count until the last row.

- Choose the min in the start of the matrix

```python
from typing import List

class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        n = len(matrix)

        # Start from the second-last row and go upward
        for row in range(n - 2, -1, -1):
            for col in range(n):
                # Get values from the next row: directly below, left-diagonal, right-diagonal
                down = matrix[row + 1][col]
                left = matrix[row + 1][col - 1] if col > 0 else float('inf')
                right = matrix[row + 1][col + 1] if col < n - 1 else float('inf')

                # Update current cell with min falling path sum
                matrix[row][col] += min(down, left, right)

        # The answer is the min in the first row
        return min(matrix[0])
```

## 12.5. Minimum Cost For Tickets (Hay)

```python
from typing import List

class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        day_set = set(days)
        last_day = days[-1]
        dp = [0] * (last_day + 1)

        for day in range(1, last_day + 1):
            if day not in day_set:
                dp[day] = dp[day - 1]  # no travel, cost stays the same
            else:
                dp[day] = min(
                    dp[max(0, day - 1)] + costs[0],  # 1-day ticket
                    dp[max(0, day - 7)] + costs[1],  # 7-day ticket
                    dp[max(0, day - 30)] + costs[2]  # 30-day ticket
                )
        return dp[last_day]

```

## 12.6. 2 Keys Keyboard (Hay nhưng khó)

```python
class Solution:
    def minSteps(self, n: int) -> int:
        dp = [0] * (n + 1)
        # dp[i] = min number of steps to get i 'A's

        for i in range(2, n + 1):
            dp[i] = i  # worst case: all Paste after one Copy All at 1
            for j in range(i // 2, 1, -1):
                if i % j == 0:
                    dp[i] = dp[j] + (i // j)
                    break  # we want the largest factor to minimize steps

        return dp[n]
```

## 12.7. Perfect Squares (Giống bài chia coin)

```python
import math

class Solution:
    def numSquares(self, n: int) -> int:
        # dp[i] will be the least number of perfect square numbers that sum to i
        dp = [float('inf')] * (n + 1)
        dp[0] = 0  # base case: 0 is made up of 0 numbers

        # Precompute all perfect squares less than or equal to n
        squares = [i * i for i in range(1, int(math.sqrt(n)) + 1)]

        for square in squares:
            for i in range(square, n + 1):
                dp[i] = min(dp[i], dp[i - square] + 1)

        return dp[n]

```

## 12.8. Last Stone Weight II (Each Stone use once)

- Step 1: Loop by coin.

- Step 2: Loop back from target

```python
class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        total = sum(stones)
        target = total // 2
        # dp[j] means the maximum sum we can get which is <= j
        dp = [0] * (target + 1)

        for stone in stones:
            for j in range(target, stone - 1, -1):
                dp[j] = max(dp[j], dp[j - stone] + stone)

        return total - 2 * dp[target]

```

## 12.9. Triangle (Giống Minimum Falling Path Sum)

```python
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        if not triangle:
            return 0

        # Start from the bottom row
        dp = triangle[-1][:]  # Copy the last row

        # Iterate from the second-to-last row upward
        for row in range(len(triangle) - 2, -1, -1):
            for col in range(len(triangle[row])):
                # Update dp[col] to be the min path sum from this cell
                dp[col] = triangle[row][col] + min(dp[col], dp[col + 1])

        return dp[0]  # Top element will contain the minimum path sum

```

Notes:

- Unbounded Knapstack: Go forward because weight = 0 => dp[cap] = max(dp[cap], dp[cap - weight] + value) => if weight = 0 we can reuse

- Knapstack 0/1: Go backward => dp[cap] = max(dp[cap], dp[cap - weight] + value) => cap - weight != cap => Due to weight start from end will different than 0.

- Trùng thì forward, Khác thì backward.

- Step 1: Loop coin.

- Step 2: Loop target.

## 12.10. Ones and Zeroes

## 12.11. Maximal Square

## 12.12. Coin Change

- Step 1: Init DP
- Step 2: Loop coin
- Step 3: Loop target

Here's what happens:

dp[1] = min(dp[1], dp[0] + 1) → 1 coin

dp[2] = min(dp[2], dp[1] + 1) → 2 coins

...

dp[5] = min(dp[5], dp[4] + 1) → 5 coins

Each new dp[i] is built on top of the result from dp[i - coin], which may already include the same coin.

```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # Step 1: Init DP
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0

        # Step 2: Loop coin
        for coin in coins:
            # Step 3: Loop target
            for i in range(coin, amount + 1):
                dp[i] = min(dp[i], dp[i - coin] + 1)

        return dp[amount] if dp[amount] != float('inf') else -1

```

## 12.13. Maximal Square (Hay nhưng chưa hiểu)

```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        if not matrix:
            return 0

        rows, cols = len(matrix), len(matrix[0])
        # dp[i][j] will represent the size of the largest square ending at (i, j)
        dp = [[0] * (cols + 1) for _ in range(rows + 1)]
        max_side = 0

        for i in range(1, rows + 1):
            for j in range(1, cols + 1):
                if matrix[i - 1][j - 1] == '1':
                    dp[i][j] = min(
                        dp[i - 1][j],      # top
                        dp[i][j - 1],      # left
                        dp[i - 1][j - 1]   # top-left
                    ) + 1
                    max_side = max(max_side, dp[i][j])

        return max_side * max_side  # return area

```

## 12.14. Ones and Zeroes (Hay)

- Step 1: DP

- Step 2: Coin

- Step 3: Target

- Forward: coin -> n + 1

- Backward: n -> coin - 1

```python
class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        # Step 1: DP
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        # Step 2: Coin
        for s in strs:
            zeros = s.count('0')
            ones = s.count('1')
            # Step 3: Target
            for i in range(m, zeros - 1, -1):
                for j in range(n, ones - 1, -1):
                    dp[i][j] = max(dp[i][j], dp[i - zeros][j - ones] + 1)

        return dp[m][n]
```
