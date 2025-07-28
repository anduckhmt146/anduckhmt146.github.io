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
