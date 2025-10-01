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

5. Convert to Base -2 — Medium — 59.0%
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

9. First Missing Positive — Hard — 32.0%
   🔗 https://leetcode.com/problems/first-missing-positive

10. Best Time to Buy and Sell Stock — Easy — 50.5%
    🔗 https://leetcode.com/problems/best-time-to-buy-and-sell-stock

11. Palindrome Linked List — Easy — 39.3%
    🔗 https://leetcode.com/problems/palindrome-linked-list

12. Product of Array Except Self — Medium — 60.1%
    🔗 https://leetcode.com/problems/product-of-array-except-self

13. Kth Largest Element in an Array — Medium — 55.4%
    🔗 https://leetcode.com/problems/kth-largest-element-in-an-array

14. Adding Two Negabinary Numbers — Medium — 34.2%
    🔗 https://leetcode.com/problems/adding-two-negabinary-numbers

15. Merge Intervals — Medium — 35.4%
    🔗 https://leetcode.com/problems/merge-intervals

16. Longest Substring Without Repeating Characters — Medium — 28.2%
    🔗 https://leetcode.com/problems/longest-substring-without-repeating-characters

17. Two Sum — Easy — 55.7%
    🔗 https://leetcode.com/problems/two-sum

18. Minimum Number of Food Buckets to Feed the Hamsters — Medium — 47.0%
    🔗 https://leetcode.com/problems/minimum-number-of-food-buckets-to-feed-the-hamsters

19. Longest Palindromic Substring — Medium — 35.8%
    🔗 https://leetcode.com/problems/longest-palindromic-substring

20. LRU Cache — Medium — 45.2%
    🔗 https://leetcode.com/problems/lru-cache

21. Search a 2D Matrix — Medium — 52.2%
    🔗 https://leetcode.com/problems/search-a-2d-matrix

22. Valid Parentheses — Easy — 42.3%
    🔗 https://leetcode.com/problems/valid-parentheses

23. Simplify Path — Medium — 47.8%
    🔗 https://leetcode.com/problems/simplify-path

24. Daily Temperatures — Medium — 67.3%
    🔗 https://leetcode.com/problems/daily-temperatures

25. Number of Steps to Reduce a Number in Binary Representation to One — Medium — 61.6%
    🔗 https://leetcode.com/problems/number-of-steps-to-reduce-a-number-in-binary-representation-to-one
