---
layout: post
title: Grab Interview
date: 2025-10-01
categories: plan
---

# 1. Questions

1. String Without AAA or BBB — Medium — 37.7%
🔗 https://leetcode.com/problems/string-without-aaa-or-bbb

Edge case: (a = 7, b = 1) => Try: "aabaaaba" → still has "aaa".

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

3. Minimum Cost For Tickets — Medium — 60.5%
🔗 https://leetcode.com/problems/minimum-cost-for-tickets

4. Word Abbreviation — Hard — 54.3%
🔗 https://leetcode.com/problems/word-abbreviation

5. Convert to Base -2 — Medium — 59.0%
🔗 https://leetcode.com/problems/convert-to-base-2

6. Reconstruct a 2-Row Binary Matrix — Medium — 40.4%
🔗 https://leetcode.com/problems/reconstruct-a-2-row-binary-matrix

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
