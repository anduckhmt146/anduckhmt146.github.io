---
layout: post
title: Problems of the day
date: 2025-07-28
categories: tech
---

# 1. Decode Ways

![](/images/Coding-Problems/decode-ways.png)

```python
class Solution:
    def numDecodings(self, s: str) -> int:
        n = len(s)

        # Base case
        if n > 0 and s[0] == '0':
            return 0

        # Init n + 1 items
        dp = [0] * (n + 1)
        dp[0] = 1
        dp[1] = 1

        for i in range(2, n + 1):
            one_digit = s[i - 1]
            two_digit = s[i - 2:i]

            if 1 <= int(one_digit) <= 9:
                dp[i] += dp[i - 1]
            if 10 <= int(two_digit) <= 26:
                dp[i] += dp[i - 2]

        return dp[n]
```

![](/images/Coding-Problems/decode-ways-magic.png)

# 2. 2D Prefix Matrix

![](/images/Coding-Problems/2d-prefix-magic.png)

# 3. Rotate Matrix

- Run from the bottom of the column to row

- Continue in another column

![](/images/Coding-Problems/rotate-matrix-magic.png)

# 4. Min Cost Climbing Stairs

- DP theo cost(i - 1), and cost(i - 2) + cost[i]

- Top down: cost[i] + min(dfs(i + 1), dfs(i + 2))

- Backward: for i in range(len(cost) - 3, -1, -1) => cost[i] += min(cost[i + 1], cost[i + 2])

- Bottom-up: dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])

![](/images/Coding-Problems/climb-stair-magic.png)

# 5. Sort an Array

- Heap Sort

- Merge Sort

- Quick Sort

# 6. Word Ladder

- Idea: BFS.

- Time Complexity: O(N^2 x M (list))

![](/images/Coding-Problems/word-ladder-magic.png)

# 7. Delete Node in a BST

![](/images/Coding-Problems/min-of-the-right-subtree-magic.png)

# 8. Minimum Interval to Include Each Query

- Sort by length interval.

![](/images/Coding-Problems/minimum-interval-magic.png)

# 9. Partition Labels

![](/images/Coding-Problems/partition-labels.png)

# 10. Combination Sum 2

![](/images/Coding-Problems/combination-sum-2-magic.png)

![](/images/Coding-Problems/combination-sum-2-implement.png)

# 11. Climb Stairs

![](/images/Coding-Problems/climbing-stairs-magic.png)

![](/images/Coding-Problems/climbing-stairs-dp.png)
