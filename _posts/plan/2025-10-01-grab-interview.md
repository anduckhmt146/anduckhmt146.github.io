---
layout: post
title: Grab Interview
date: 2025-10-01
categories: plan
---

# 1. Questions

1. String Without AAA or BBB — Medium — 37.7%
   🔗 https://leetcode.com/problems/string-without-aaa-or-bbb

- Edge case: (a = 7, b = 1) => Try: "aabaaaba" → still has "aaa".

- Time Complexity = O(a + b)

- Space Complexity = O(a + b) (for the output string).

```python
class Solution:
    def strWithout3a3b(self, a: int, b: int) -> str:
        # 🔹 Edge case: impossible scenario
        if a > 2 * (b + 1) or b > 2 * (a + 1):
            return ""   # or raise Exception("No valid string can be formed")

        res = []
        while a > 0 or b > 0:
            if a > b:
                # Prefer 'a', but avoid "aaa"
                if len(res) >= 2 and res[-1] == res[-2] == 'a':
                    res.append('b')
                    b -= 1
                else:
                    res.append('a')
                    a -= 1
            else:
                # Prefer 'b', but avoid "bbb"
                if len(res) >= 2 and res[-1] == res[-2] == 'b':
                    res.append('a')
                    a -= 1
                else:
                    res.append('b')
                    b -= 1
        return "".join(res)

```

2. Partition Array into Disjoint Intervals — Medium — 45.4%
   🔗 https://leetcode.com/problems/partition-array-into-disjoint-intervals

Idea:

- max_left[i] <= min_right[i+1] => then we can partition at position i.

- left_max = the maximum value that must be included in the left partition (so far).

If we see a new value nums[i] that is smaller than this left_max, it means:

If we cut the partition before i, that small number would end up in the right part,
but then right would contain an element < left_max, which breaks the rule.

Worst case:

arr = [5,4,3,2,1]

- Time: O(n)

- Space: O(1)

```python
def partitionDisjoint(nums):
    left_max = nums[0]
    max_so_far = nums[0]
    partition_idx = 0

    for i in range(1, len(nums)):
        max_so_far = max(max_so_far, nums[i])
        if nums[i] < left_max:   # must extend left partition
            partition_idx = i
            left_max = max_so_far
    return partition_idx + 1

```

3. Minimum Cost For Tickets — Medium — 60.5%
   🔗 https://leetcode.com/problems/minimum-cost-for-tickets

- dp[i] = minimum cost to cover all travel up to day i.

- If i is not a travel day → dp[i] = dp[i-1]

- If i is a travel day:

dp[i] = min(
dp[i-1] + cost[0], # buy 1-day
dp[max(0, i-7)] + cost[1], # buy 7-day
dp[max(0, i-30)] + cost[2] # buy 30-day
)

```python
def mincostTickets(days, costs):
    dayset = set(days)
    last_day = days[-1]
    dp = [0] * (last_day + 1)

    for i in range(1, last_day + 1):
        if i not in dayset:
            dp[i] = dp[i-1]   # no travel
        else:
            dp[i] = min(
                dp[i-1] + costs[0],
                dp[max(0, i-7)] + costs[1],
                dp[max(0, i-30)] + costs[2]
            )
    return dp[last_day]

```

⏱️ Time: O(last_day)
💾 Space: O(last_day)

```python
def mincostTickets(days, costs):
    n = len(days)
    dp = [0] * (n + 1)

    for i in range(n-1, -1, -1):
        # Option 1: buy 1-day pass
        j = i
        while j < n and days[j] < days[i] + 1:
            j += 1
        cost1 = costs[0] + dp[j]

        # Option 2: buy 7-day pass
        j = i
        while j < n and days[j] < days[i] + 7:
            j += 1
        cost7 = costs[1] + dp[j]

        # Option 3: buy 30-day pass
        j = i
        while j < n and days[j] < days[i] + 30:
            j += 1
        cost30 = costs[2] + dp[j]

        dp[i] = min(cost1, cost7, cost30)

    return dp[0]

```

🔄 Iteration by iteration
i = 5 → day 20

1-day: covers [20], so j=6, cost1 = 2 + dp[6] = 2

7-day: covers [20], same j=6, cost7 = 7 + dp[6] = 7

30-day: covers [20], same j=6, cost30 = 15 + dp[6] = 15
👉 dp[5] = min(2,7,15) = 2

i = 4 → day 8

1-day: covers [8], so j=5, cost1 = 2 + dp[5] = 2 + 2 = 4

7-day: covers [8,20>?] stops at j=5 (since 20 ≥ 15), cost7 = 7 + dp[5] = 7 + 2 = 9

30-day: covers [8,20] (since 20 < 38), j=6, cost30 = 15 + dp[6] = 15
👉 dp[4] = min(4,9,15) = 4

i = 3 → day 7

1-day: covers [7], so j=4, cost1 = 2 + dp[4] = 2 + 4 = 6

7-day: covers [7,8], then stops at j=5 (20 ≥ 14), cost7 = 7 + dp[5] = 7 + 2 = 9

30-day: covers [7,8,20] (20 < 37), so j=6, cost30 = 15 + dp[6] = 15
👉 dp[3] = min(6,9,15) = 6

i = 2 → day 6

1-day: covers [6], so j=3, cost1 = 2 + dp[3] = 2 + 6 = 8

7-day: covers [6,7,8], stops at j=5 (20 ≥ 13), cost7 = 7 + dp[5] = 7 + 2 = 9

30-day: covers [6,7,8,20] (20 < 36), j=6, cost30 = 15
👉 dp[2] = min(8,9,15) = 8

i = 1 → day 4

1-day: covers [4], so j=2, cost1 = 2 + dp[2] = 2 + 8 = 10

7-day: covers [4,6,7,8], stops at j=5 (20 ≥ 11), cost7 = 7 + dp[5] = 7 + 2 = 9

30-day: covers [4,6,7,8,20] (20 < 34), j=6, cost30 = 15
👉 dp[1] = min(10,9,15) = 9

i = 0 → day 1

1-day: covers [1], so j=1, cost1 = 2 + dp[1] = 2 + 9 = 11

7-day: covers [1,4,6,7], stops at j=4 (since days[4]=8 ≥ 8), cost7 = 7 + dp[4] = 7 + 4 = 11

30-day: covers [1,4,6,7,8,20], so j=6, cost30 = 15
👉 dp[0] = min(11,11,15) = 11

⏱️ Time: O(n²) worst case, but usually faster.
💾 Space: O(n)

Worst case:

- days = [1, 2, 3, 4, 5, 6, ..., 365]
- costs = [2, 7, 15]

4. Word Abbreviation — Hard — 54.3%
   🔗 https://leetcode.com/problems/word-abbreviation

5. Convert to Base -2 (Khó) — Medium — 59.0%
   🔗 https://leetcode.com/problems/convert-to-base-2

Note:

6 ÷ -2 → q = -3, r = 0
-3 ÷ -2 → q = 2, r = 1
2 ÷ -2 → q = -1, r = 0
-1 ÷ -2 → q = 1, r = 1
1 ÷ -2 → q = 0, r = 1

Result: "11010" ✅

```python
class Solution:
    def baseNeg2(self, n: int) -> str:
        if n == 0:
            return "0"

        res = []
        while n != 0:
            n, r = divmod(n, -2)
            if r < 0:
                n += 1
                r += 2
            res.append(str(r))

        return "".join(res[::-1])

```

=> q×(−2)+r=(q+1)×(−2)+(r+2)

=> −3=1×−2+(−1)

to −3=2×−2+1 ✅

Note:

13=3×22+0×21+1×20

=> 3=1×2+1

=> 13=1×23+1×22+0×21+1×20

---

divmod(6, -2) => (−2) x (−3)+0=6

Calculate -3

6. Reconstruct a 2-Row Binary Matrix — Medium — 40.4%
   🔗 https://leetcode.com/problems/reconstruct-a-2-row-binary-matrix

- Only 2 rows.

- If colsum[i] == 2 → both rows must be 1 in column i → decrease both upper and lower by 1.

- If colsum[i] == 0 → both rows must be 0.

- If colsum[i] == 1 → exactly one of the rows has 1.

Algorithm

- Initialize 2 empty rows: upperRow = [], lowerRow = [].

- First pass → assign colsum == 2 and colsum == 0.

- Second pass → assign colsum == 1 depending on available upper and lower.

- Verify counts at the end.

```python
def reconstructMatrix(upper, lower, colsum):
    n = len(colsum)
    top = [0] * n
    bottom = [0] * n

    # First handle colsum = 2
    for i in range(n):
        if colsum[i] == 2:
            top[i] = bottom[i] = 1
            upper -= 1
            lower -= 1
            if upper < 0 or lower < 0:
                return []

    # Then handle colsum = 1
    for i in range(n):
        if colsum[i] == 1:
            if upper > 0:
                top[i] = 1
                upper -= 1
            elif lower > 0:
                bottom[i] = 1
                lower -= 1
            else:
                return []

    if upper == 0 and lower == 0:
        return [top, bottom]
    return []

```

7. Trapping Rain Water — Hard — 48.9%
   🔗 https://leetcode.com/problems/trapping-rain-water

8. Add Two Numbers — Medium — 33.9%
   🔗 https://leetcode.com/problems/add-two-numbers

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1, l2):
    dummy = ListNode()
    current = dummy
    carry = 0

    while l1 or l2 or carry:
        val1 = l1.val if l1 else 0
        val2 = l2.val if l2 else 0
        total = val1 + val2 + carry

        carry, digit = divmod(total, 10)
        current.next = ListNode(digit)
        current = current.next

        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None

    return dummy.next

```

Step by step:

Add 2 + 5 + 0 (carry) = 7 → digit = 7, carry = 0
Result: 7

Add 4 + 6 + 0 = 10 → digit = 0, carry = 1
Result: 7 → 0

Add 3 + 4 + 1 = 8 → digit = 8, carry = 0
Result: 7 → 0 → 8

Output: 7 → 0 → 8 ✅Step by step:

Add 2 + 5 + 0 (carry) = 7 → digit = 7, carry = 0
Result: 7

Add 4 + 6 + 0 = 10 → digit = 0, carry = 1
Result: 7 → 0

Add 3 + 4 + 1 = 8 → digit = 8, carry = 0
Result: 7 → 0 → 8

Output: 7 → 0 → 8 ✅

9. First Missing Positive — Hard — 32.0%
   🔗 https://leetcode.com/problems/first-missing-positive

10. Best Time to Buy and Sell Stock — Easy — 50.5%
    🔗 https://leetcode.com/problems/best-time-to-buy-and-sell-stock

```python
def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0

    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > max_profit:
            max_profit = price - min_price

    return max_profit
```

11. Palindrome Linked List — Easy — 39.3%
    🔗 https://leetcode.com/problems/palindrome-linked-list

```python
def isPalindrome(head):
    vals = []
    while head:
        vals.append(head.val)
        head = head.next
    return vals == vals[::-1]

```

Naive Solution: O(N) space

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def isPalindrome(head: ListNode) -> bool:
    if not head or not head.next:
        return True

    # 1. Find middle (slow will stop at mid)
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    # 2. Reverse second half
    prev = None
    curr = slow
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt

    # 3. Compare halves
    left, right = head, prev
    while right:  # only need to check right half
        if left.val != right.val:
            return False
        left = left.next
        right = right.next

    return True
```

Vip Solution: O(1) space

12. Product of Array Except Self — Medium — 60.1%
    🔗 https://leetcode.com/problems/product-of-array-except-self

Note: prefix[i-1] \* postfix[i+1]

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        prefix = [1] * len(nums)
        postfix = [1] * len(nums)

        # Step 1: build prefix & postfix arrays
        for i in range(0, len(nums)):
            prefix[i] = nums[i] if i == 0 else prefix[i - 1] * nums[i]
            postfix[len(nums) - 1 - i] = nums[len(nums) - 1] if i == 0 else postfix[len(nums) - i] * nums[len(nums) - 1 - i]


        # Step 2: build result
        result = [1] * len(nums)
        for i in range(0, len(nums)):
            left = prefix[i - 1] if i > 0 else 1
            right = postfix[i + 1] if i < len(nums) - 1 else 1
            result[i] = left * right

        return result
```

- Time Complexity: O(n)

- Space Complexity: O(n) (but can be optimized to O(1))

13. Kth Largest Element in an Array — Medium — 55.4%
    🔗 https://leetcode.com/problems/kth-largest-element-in-an-array

```python
import heapq

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        heap = []
        for num in nums:
            heapq.heappush(heap, num)
            if len(heap) > k:
                heapq.heappop(heap)
        return heap[0]

```

14. Adding Two Negabinary Numbers — Medium — 34.2%
    🔗 https://leetcode.com/problems/adding-two-negabinary-numbers

```python
def negabinary_to_int(arr):
    val = 0
    base = 1
    for digit in reversed(arr):
        val += digit * base
        base *= -2
    return val
```

```python
def int_to_negabinary(n):
    if n == 0:
        return [0]
    res = []
    while n != 0:
        n, r = divmod(n, -2)
        if r < 0:
            n += 1
            r += 2
        res.append(r)
    return res[::-1]
```

```python
class Solution:
    def addNegabinary(self, arr1, arr2):
        a = negabinary_to_int(arr1)
        b = negabinary_to_int(arr2)
        return int_to_negabinary(a + b)

```

15. Merge Intervals — Medium — 35.4%
    🔗 https://leetcode.com/problems/merge-intervals

```python
class Solution:
    def merge(self, intervals):
        if not intervals:
            return []

        # Step 1: Sort by start time
        intervals.sort(key=lambda x: x[0])

        merged = [intervals[0]]

        # Step 2: Merge
        for start, end in intervals[1:]:
            last_end = merged[-1][1]

            if start <= last_end:
                # Overlap → extend the end
                merged[-1][1] = max(last_end, end)
            else:
                # No overlap
                merged.append([start, end])

        return merged

```

Time Complexity: O(n log n)

16. Longest Substring Without Repeating Characters — Medium — 28.2%
    🔗 https://leetcode.com/problems/longest-substring-without-repeating-characters

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = set()
        left = 0
        max_len = 0

        for right in range(len(s)):
            while s[right] in seen:
                seen.remove(s[left])
                left += 1
            seen.add(s[right])
            max_len = max(max_len, right - left + 1)

        return max_len

```

17. Two Sum — Easy — 55.7%
    🔗 https://leetcode.com/problems/two-sum

```python
class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i

```

18. Minimum Number of Food Buckets to Feed the Hamsters — Medium — 47.0%
    🔗 https://leetcode.com/problems/minimum-number-of-food-buckets-to-feed-the-hamsters

🔹 Approach (Greedy)

- Traverse from left to right.

- For each 'H', try to place a bucket:

- Prefer to place it on the right side (i+1) if possible (feeds current + maybe next hamster).

- Otherwise, place it on the left side (i-1).

- If neither works → return -1.

```python
class Solution:
    def minimumBuckets(self, street: str) -> int:
        n = len(street)
        street = list(street)  # convert to mutable list
        buckets = 0

        for i in range(n):
            if street[i] == 'H':
                # already covered by left bucket
                if i > 0 and street[i-1] == 'B':
                    continue

                # try to place bucket on the right
                if i+1 < n and street[i+1] == '.':
                    street[i+1] = 'B'
                    buckets += 1
                # otherwise, try to place on the left
                elif i > 0 and street[i-1] == '.':
                    street[i-1] = 'B'
                    buckets += 1
                else:
                    return -1

        return buckets

```

19. Longest Palindromic Substring — Medium — 35.8%
    🔗 https://leetcode.com/problems/longest-palindromic-substring

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        def expand(l, r):
            while l >= 0 and r < len(s) and s[l] == s[r]:
                l -= 1
                r += 1
            return s[l+1:r]

        res = ""
        for i in range(len(s)):
            # odd length
            odd = expand(i, i)
            # even length
            even = expand(i, i+1)

            # pick the longer one
            res = max(res, odd, even, key=len)

        return res

```

- dp[i][j] = True if substring s[i:j+1] is palindrome.

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        n = len(s)
        dp = [[False]*n for _ in range(n)]
        start, max_len = 0, 1

        # every single char is palindrome
        for i in range(n):
            dp[i][i] = True

        # check substrings
        for length in range(2, n+1):
            for i in range(n-length+1):
                j = i + length - 1
                if s[i] == s[j]:
                    if length == 2 or dp[i+1][j-1]:
                        dp[i][j] = True
                        if length > max_len:
                            start, max_len = i, length

        return s[start:start+max_len]

```

20. LRU Cache — Medium — 45.2%
    🔗 https://leetcode.com/problems/lru-cache

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

- In doubly linked list, self.\_remove(node) is O(1), not O(N):

21. Search a 2D Matrix — Medium — 52.2%
    🔗 https://leetcode.com/problems/search-a-2d-matrix

Idea:

- mid = (left + right) // 2, value = matrix[mid // n][mid % n]

matrix = [
[1, 3, 5, 7],
[10, 11, 16, 20],
[23, 30, 34, 50]
]

=> 11, 23, 16

```python
from typing import List

class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix or not matrix[0]:
            return False

        m, n = len(matrix), len(matrix[0])
        left, right = 0, m * n - 1

        while left <= right:
            mid = (left + right) // 2
            value = matrix[mid // n][mid % n]

            if value == target:
                return True
            elif value < target:
                left = mid + 1
            else:
                right = mid - 1

        return False
```

Note:

- Time: O(log(m\*n)) → efficient

- Space: O(1) → no extra memory

22. Valid Parentheses — Easy — 42.3%
    🔗 https://leetcode.com/problems/valid-parentheses

```python
class Solution:
    def isValid(self, s: str):
        # Your code goes here
        stack = []
        mapping = {"(": ")", "{": "}", "[": "]"}

        for char in s:
            if char in mapping:
                stack.append(char)
            else:
                if not stack:
                    return False

                top = stack.pop()
                if char != mapping[top]:
                    return False

        return not stack
```

23. Simplify Path — Medium — 47.8%
    🔗 https://leetcode.com/problems/simplify-path

Steps:

- Input: "/home//foo/../bar/"

- Split by /: ["", "home", "", "foo", "..", "bar", ""]

Process:

- home → push

- foo → push

- .. → pop (foo)

- bar → push

=> Stack = ["home", "bar"]

Example

Input: "/../a/./b//c/"

Process:

- .. → ignore (stack empty)

- a → push

- . → skip

- b → push

- c → push

Stack = ["a", "b", "c"]

Output: "/a/b/c"

Output:

```python
class Solution:
    def simplifyPath(self, path: str) -> str:
        stack = []
        parts = path.split("/")

        for part in parts:
            if part == "" or part == ".":
                continue
            elif part == "..":
                if stack:
                    stack.pop()
            else:
                stack.append(part)

        return "/" + "/".join(stack)

```

24. Daily Temperatures — Medium — 67.3%
    🔗 https://leetcode.com/problems/daily-temperatures

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

- Time: O(N)

- Space: O(N)

25. Number of Steps to Reduce a Number in Binary Representation to One — Medium — 61.6%
    🔗 https://leetcode.com/problems/number-of-steps-to-reduce-a-number-in-binary-representation-to-one

```python
def numSteps(s: str) -> int:
    # s is binary string representing a positive integer, e.g. "1101"
    n = len(s)
    steps = 0
    carry = 0

    # process from LSB to the bit just left of MSB (index 1 through n-1 reversed),
    # i.e., i = n-1 down to 1
    for i in range(n - 1, 0, -1):
        if s[i] == '0':
            if carry == 0:
                # even -> one division
                steps += 1
            else:
                # 0 + carry -> 1 -> must add then divide
                steps += 2
                # carry remains 1
        else:  # s[i] == '1'
            if carry == 0:
                # odd -> add 1 (creates carry) then divide
                steps += 2
                carry = 1
            else:
                # 1 + carry = 0 (carry stays 1), then divide => 1 step
                steps += 1
                # carry remains 1

    # Finally, if there's a carry at the MSB, it creates an extra step
    steps += carry
    return steps

```

Dry run:

1101 (13) → odd → +1 = 1110 → ÷2 = 111
111 (7) → odd → +1 = 1000 → ÷2 = 100
100 (4) → ÷2 = 10
10 (2) → ÷2 = 1

26. Valid anagram

```python
from collections import Counter

def isAnagram(s: str, t: str) -> bool:
    return Counter(s) == Counter(t)

```

27. Group anagrams

```python
class Solution:
    # O(NlogN)
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        # O(N * L)
        result = []
        outHashMap = {}
        for i in range(0, len(strs)):
            hashMap = {}
            for character in strs[i]:
                hashMap[character] = hashMap.get(character, 0) + 1

            # Sort hashmap by key
            sorted_hashMap = tuple(sorted(hashMap.items()))
            if sorted_hashMap not in outHashMap:
                outHashMap[sorted_hashMap] = []
            outHashMap[sorted_hashMap].append(strs[i])

        return list(outHashMap.values())
```

28. Next greater element

- All the integers of nums1 also appear in nums2.

```python
def nextGreaterElement(nums1, nums2):
    stack = []
    next_greater = {}

    for num in nums2:
        while stack and num > stack[-1]:
            next_greater[stack.pop()] = num
        stack.append(num)

    return [next_greater.get(num, -1) for num in nums1]
```
