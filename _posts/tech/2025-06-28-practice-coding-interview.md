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

Use stack when:

- Nested structures

- Undo/rollback

- Balancing / matching elements (like parentheses)

- Monotonic order tracking (next greater/smaller)
