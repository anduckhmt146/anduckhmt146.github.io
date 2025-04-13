---
layout: post
title: '42 Coding Interview Pattern'
date: 2025-04-11
categories: tech
---

Here is 42 coding interview patterns would help you think clearer about DSA.

<!-- Highlight.js CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css">

<!-- Highlight.js JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    hljs.highlightAll();
  });
</script>

Ref:

- [https://github.com/Chanda-Abdul/Several-Coding-Patterns-for-Solving-Data-Structures-and-Algorithms-Problems-during-Interviews](https://github.com/Chanda-Abdul/Several-Coding-Patterns-for-Solving-Data-Structures-and-Algorithms-Problems-during-Interviews)

- [https://www.designgurus.io/blog/coding-patterns-for-tech-interviews](https://www.designgurus.io/blog/coding-patterns-for-tech-interviews)

# 1. Pattern 1: Sliding Window

## 1.1. Fixed Sliding Window

Ref: [https://leetcode.com/problems/maximum-average-subarray-i/description/](https://leetcode.com/problems/maximum-average-subarray-i/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        result = []
        windowStart, windowSum, windowEnd = 0, 0, 0
        maxWindowAvg = float('-inf')
        
        for windowEnd in range(0, len(nums)):
            windowSum += nums[windowEnd]
            
            if windowEnd >= k - 1:    
                maxWindowAvg = max(maxWindowAvg, windowSum / k)
                
                windowSum -= nums[windowStart]
                windowStart += 1
        
        return maxWindowAvg
</code>
</pre>
</details>

## 1.2. Variant Sliding Window

Ref: [https://leetcode.com/problems/minimum-size-subarray-sum/description/](https://leetcode.com/problems/minimum-size-subarray-sum/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        windowSum, windowStart = 0, 0
        minSubArrayLength = float('inf')

        for windowEnd in range(0, len(nums)):
            windowSum += nums[windowEnd]

            while windowSum >= target:
                minSubArrayLength = min(minSubArrayLength, windowEnd - windowStart + 1)

                windowSum -= nums[windowStart]
                windowStart += 1
        
        if minSubArrayLength == float('inf'):
            return 0

        return minSubArrayLength
</code>
</pre>
</details>

## 1.3. Shift All Window

Ref: [https://leetcode.com/problems/repeated-dna-sequences/description/](https://leetcode.com/problems/repeated-dna-sequences/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        # If string length is less than 10, no possible repeats
        if len(s) < 10:
            return []
        
        result = set()  # Store repeated sequences
        window = s[0:10]  # Initial window
        seen = {window}  # Track all seen sequences
        
        # Slide the window from index 1 to end
        for i in range(1, len(s) - 9):
            # Slide window one position right
            window = s[i:i+10]
            
            # If we've seen this sequence before, it's a repeat
            if window in seen:
                result.add(window)
            # If not seen, add to seen set
            else:
                seen.add(window)
        
        return list(result)
</code>
</pre>
</details>

## 1.4. Longest window without duplicate character

Ref: [https://leetcode.com/problems/longest-substring-without-repeating-characters/description/](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Initialize variables
        windowStart = 0
        maxLength = 0
        charIndexMap = {}  # Store the last index of each character
        
        # Iterate through the string
        for windowEnd in range(0, len(s)):
            rightChar = s[windowEnd]
            
            # If the character is already in the map and its index is within our window
            if rightChar in charIndexMap and charIndexMap[rightChar] >= windowStart:
                # Move windowStart to the right of the previous occurrence
                windowStart = charIndexMap[rightChar] + 1
            
            # Update the character's last seen index
            charIndexMap[rightChar] = windowEnd
            
            # Update maxLength if current window is larger
            maxLength = max(maxLength, windowEnd - windowStart + 1)
        
        return maxLength
        
</code>
</pre>
</details>

## 1.5. Longest Substring with K Distinct Characters

![https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
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

# Test cases
print(longest_substring_with_k_distinct("araaci", 2))  # 4, The longest substring with no more than '2' distinct characters is "araa"
print(longest_substring_with_k_distinct("araaci", 1))  # 2, The longest substring with no more than '1' distinct characters is "aa"
print(longest_substring_with_k_distinct("cbbebi", 3))  # 5, The longest substrings with no more than '3' distinct characters are "cbbeb" & "bbebi"
        
</code>
</pre>
</details>

# 2. Pattern 2: Two Pointer

# 3. Pattern 3: Fast & Slow Pointer

# 4. Pattern 4: Merge Interval

# 5. Pattern 5: Cyclic Sort

# 6. Pattern 6: In-place Reversal of a LinkedList

# 7. Pattern 7: Breadth First Search (Tree)

# 8. Pattern 8: Depth First Search (DFS)

# 9. Pattern 9: Two Heaps

# 10. Pattern 10: Subsets

# 11. Pattern 11: Modified Binary Search

# 12. Pattern 12: Bitwise XOR

# 13. Pattern 13: Top 'K' Elements

# 14. Pattern 14: K-way merge

# 15. Pattern 15: 0/1 Knapsack (Dynamic Programming)

# 16. Pattern 16: Topological Sort

# 17. Pattern 17: Stacks

# 18. Pattern 18: Monotonic Stack

# 19. Pattern 19: Graphs

# 20. Pattern 20: Island

# 21. Pattern 21: Greedy Algorithms

# 22. Pattern 22: Backtracking

# 23. Pattern 23: Trie

# 24. Pattern 24: Union Find

# 25. Pattern 25: Ordered Set

# 26. Pattern 26: Prefix Sum

# 27. Pattern 27: Multi-threaded

# 28. Pattern 28: Unbounded Knapsack

# 29. Pattern 29: Fibonacci Numbers

# 30. Pattern 30: Palindromic Subsequence

# 31. Pattern 31: Longest Common Substring

# 32. Pattern 32: Counting Pattern

# 33. Pattern 33: Monotonic Queue Pattern

# 34. Pattern 34: Simulation Pattern

# 35. Pattern 35: Linear Sorting Algorithm Pattern

# 36. Pattern 36: Meet in the Middle Pattern

# 37. Pattern 37: MO's Algorithm Pattern

# 38. Pattern 38: Serialize and Deserialize Pattern

# 39. Pattern 39: Clone Pattern

# 40. Pattern 40: Articulation Points and Bridges Pattern

# 41. Pattern 41: Segment Tree Pattern

# 42. Pattern 42: Binary Indexed Tree Pattern
