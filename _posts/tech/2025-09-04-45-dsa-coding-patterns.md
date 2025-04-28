---
layout: post
title: '42 Coding Interview Pattern'
date: 2025-04-12
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

Ref: [https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/)

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

## 1.6. Longest Repeating Character Replacement

Ref: [https://leetcode.com/problems/longest-repeating-character-replacement/description/](https://leetcode.com/problems/longest-repeating-character-replacement/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        windowStart = 0
        maxLength = 0
        maxRepeatLetterCount = 0
        charFrequency = {}
        
        # Try to extend the range [windowStart, windowEnd]
        for windowEnd in range(0, len(s)):
            endChar = s[windowEnd]
            charFrequency[endChar] = charFrequency.get(endChar, 0) + 1
            
            # *REVIEW THIS LINE*
            maxRepeatLetterCount = max(maxRepeatLetterCount, charFrequency[endChar])


            # current window size is from windowStart to windowEnd, overall we have a letter which is
            # repeating maxRepeatLetterCount times, this means we can have a window which has one letter
            # repeating maxRepeatLetterCount times and the remaining letters we should replace
            # if the remaining letters are more than k, it is the time to shrink the window as we
            # are not allowed to replace more than k letters
            if (windowEnd - windowStart + 1 - maxRepeatLetterCount) > k:
                startChar = s[windowStart]
                charFrequency[startChar] -= 1
                windowStart += 1
                
            maxLength = max(maxLength, windowEnd - windowStart + 1)
        
        return maxLength
</code>
</pre>
</details>

The key differences between this problem and others where we need while:

**Problems needing while:**

- When multiple characters might need to be removed to make the window valid
- Example: "Find longest substring with at most K distinct characters"
- Because adding one character might require removing multiple characters

**This problem (using if):**

- Adding one character can only make the window invalid by at most one character
- Because maxRepeatLetterCount can only increase or stay the same
- Therefore, we only ever need to remove one character at most

**Notes:** You do not replace it in real, you only increase the windowStart and imply that we can replace all it.

## 1.6. Longest Repeating Character Replacement With Bit 1

Ref: [https://leetcode.com/problems/max-consecutive-ones-iii/](https://leetcode.com/problems/max-consecutive-ones-iii/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        windowStart = 0
        maxLength = 0
        maxRepeatOneCount = 0  # Track count of 1's instead of 0's
        bitFrequency = {}
        
        # Try to extend the range [windowStart, windowEnd]
        for windowEnd in range(len(nums)):
            endBit = nums[windowEnd]
            bitFrequency[endBit] = bitFrequency.get(endBit, 0) + 1
            
            # Track the count of 1's as our maxRepeat count
            if endBit == 1:
                maxRepeatOneCount = max(maxRepeatOneCount, bitFrequency[1])
            
            # Current window size minus count of 1's gives us count of 0's
            # If count of 0's exceeds k, shrink window
            if (windowEnd - windowStart + 1 - maxRepeatOneCount) > k:
                startBit = nums[windowStart]
                bitFrequency[startBit] -= 1
                windowStart += 1
            
            maxLength = max(maxLength, windowEnd - windowStart + 1)
        
        return maxLength
</code>
</pre>
</details>

## 1.7. Longest Subarray of Bit 1 After Deleting One Element

Ref: [https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        windowStart = 0
        maxLength = 0
        maxRepeatOneCount = 0  # Track count of 1's instead of 0's
        bitFrequency = {}
        
        # Try to extend the range [windowStart, windowEnd]
        for windowEnd in range(0, len(nums)):
            endBit = nums[windowEnd]
            bitFrequency[endBit] = bitFrequency.get(endBit, 0) + 1
            
            # Track the count of 1's as our maxRepeat count
            if endBit == 1:
                maxRepeatOneCount = max(maxRepeatOneCount, bitFrequency[1])
            
            # Current window size minus count of 1's gives us count of 0's
            # If count of 0's exceeds k, shrink window
            if (windowEnd - windowStart + 1 - maxRepeatOneCount) > 1:
                startBit = nums[windowStart]
                bitFrequency[startBit] -= 1
                windowStart += 1
            
            maxLength = max(maxLength, windowEnd - windowStart + 1)
        
        return maxLength - 1 if maxLength > 0 else maxLength
        
</code>
</pre>
</details>

## 1.8. Sliding Window in Multiple String

Ref: [https://leetcode.com/problems/permutation-in-string/](https://leetcode.com/problems/permutation-in-string/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import Counter

class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        # Edge cases
        if len(s1) > len(s2):
            return False
            
        # Initialize frequency maps
        s1Map = {}
        windowMap = {}
        
        # Build frequency map for s1
        for char in s1:
            s1Map[char] = s1Map.get(char, 0) + 1
            
        # Initialize sliding window with first len(s1) characters
        windowStart = 0
        
        # Try to extend the range [windowStart, windowEnd]
        for windowEnd in range(len(s2)):
            # Add character to window frequency map
            endChar = s2[windowEnd]
            windowMap[endChar] = windowMap.get(endChar, 0) + 1
            
            # If window size is larger than s1 length, shrink window
            if windowEnd >= len(s1):
                startChar = s2[windowStart]
                windowMap[startChar] -= 1
                
                # Remove character from map if count becomes 0
                if windowMap[startChar] == 0:
                    del windowMap[startChar]
                    
                windowStart += 1
            
            # Check if current window is a permutation
            if windowMap == s1Map:
                return True
                
        return False

</code>
</pre>
</details>

## 1.9. String Anagrams

Ref: [https://leetcode.com/problems/find-all-anagrams-in-a-string/](https://leetcode.com/problems/find-all-anagrams-in-a-string/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        # Edge cases
        if len(p) > len(s):
            return []
            
        # Initialize frequency maps
        pMap = {}
        windowMap = {}
        
        # Build frequency map for s1
        for char in p:
            pMap[char] = pMap.get(char, 0) + 1
            
        # Initialize sliding window with first len(s1) characters
        windowStart = 0

        # Result
        res = []
        
        # Try to extend the range [windowStart, windowEnd]
        for windowEnd in range(0, len(s)):
            # Add character to window frequency map
            endChar = s[windowEnd]
            windowMap[endChar] = windowMap.get(endChar, 0) + 1
            
            # If window size is larger than p length, shrink window
            if windowEnd >= len(p):
                startChar = s[windowStart]
                windowMap[startChar] -= 1
                
                # Remove character from map if count becomes 0
                if windowMap[startChar] == 0:
                    del windowMap[startChar]
                    
                windowStart += 1
            
            # Check if current window is a permutation
            if windowMap == pMap:
                res.append(windowEnd - len(p) + 1)
                
        return res

</code>
</pre>
</details>

## 1.10. Min Window Substring

Ref: [https://leetcode.com/problems/minimum-window-substring/](https://leetcode.com/problems/minimum-window-substring/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        # Edge cases
        if not s or not t or len(s) < len(t):
            return ""
            
        # Initialize frequency maps
        targetMap = {}  # frequency map for string t
        windowMap = {}  # frequency map for current window
        
        # Build frequency map for target string
        for char in t:
            targetMap[char] = targetMap.get(char, 0) + 1
            
        # Initialize variables
        windowStart = 0
        minLength = float('inf')
        minStart = 0
        matched = 0  # count of characters matched with required frequency
        
        # Try to extend the range [windowStart, windowEnd]
        for windowEnd in range(len(s)):
            # Add current character to window frequency map
            endChar = s[windowEnd]
            windowMap[endChar] = windowMap.get(endChar, 0) + 1
            
            # If current character matches target frequency, increment matched count
            if endChar in targetMap and windowMap[endChar] == targetMap[endChar]:
                matched += 1
                
            # Try to shrink window when we have matched all characters
            while matched == len(targetMap):
                # Update minimum window size if current window is smaller
                windowLength = windowEnd - windowStart + 1
                if windowLength < minLength:
                    minLength = windowLength
                    minStart = windowStart
                
                # Remove character from start of window
                startChar = s[windowStart]
                windowMap[startChar] -= 1
                
                # If removed character was part of target and now frequency is less,
                # decrement matched count
                if startChar in targetMap and windowMap[startChar] < targetMap[startChar]:
                    matched -= 1
                    
                windowStart += 1
        
        # Return minimum window substring or empty string if not found
        return s[minStart:minStart + minLength] if minLength != float('inf') else ""
        

</code>
</pre>
</details>

## 1.11. Subarray Product Less Than K

Ref: [https://leetcode.com/problems/subarray-product-less-than-k/](https://leetcode.com/problems/subarray-product-less-than-k/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        if k <= 1:
            return 0
            
        left = 0
        product = 1
        count = 0
        
        for right in range(0, len(nums)):
            product *= nums[right]
            
            # Move left pointer until product is less than k
            while product >= k:
                product //= nums[left]
                left += 1
                
            # Number of new subarrays ending at right
            count += right - left + 1
            
        return count
</code>
</pre>
</details>

## 1.12. Maximum Number of Vowels in a Substring of Given Length

Ref: [https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        if k <= 1:
            return 0
            
        left = 0
        product = 1
        count = 0
        
        for right in range(0, len(nums)):
            product *= nums[right]
            
            # Move left pointer until product is less than k
            while product >= k:
                product //= nums[left]
                left += 1
                
            # Number of new subarrays ending at right
            count += right - left + 1
            
        return count
</code>
</pre>
</details>

## 1.13. Substring Sliding Window

<details>
<summary>Code</summary>
class Solution:
    def isSubstring(self, s: str, t: str) -> bool:
        if len(t) > len(s):
            return False

        left, right = 0, 0
        while right < len(s):
            if right - left < len(t):
                right += 1
                continue

            if s[left:right] == t:
                return True

            left += 1
            right += 1

        return False

<pre>
<code class="python">

</code>
</pre>
</details>

## 1.14. Prefix and Postfix

Ref: [https://leetcode.com/problems/product-of-array-except-self/](https://leetcode.com/problems/product-of-array-except-self/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        prefix = [1] * len(nums)
        postfix = [1] * len(nums)
        # Create prefix and postfix list
        for i in range(0, len(nums)):
            prefix[i] = nums[i] if i == 0 else prefix[i - 1] * nums[i]
            postfix[len(nums) - 1 - i] = nums[len(nums) - 1] if i == 0 else postfix[len(nums) - i] * nums[len(nums) - 1 - i]

        # print(prefix)
        # print(postfix)

        # Compute result using prefix and postfix
        result = [1] * len(nums)
        for i in range(0, len(nums)):
            left = prefix[i - 1] if i > 0 else 1
            right = postfix[i + 1] if i < len(nums) - 1 else 1
            result[i] = left * right

        return result
</code>
</pre>
</details>

## 1.15. Second Smallest

Ref: [https://leetcode.com/problems/increasing-triplet-subsequence/](https://leetcode.com/problems/increasing-triplet-subsequence/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def increasingTriplet(self, nums: List[int]) -> bool:
        first = float('inf')
        second = float('inf')

        for num in nums:
            if num <= first:
                first = num  # smallest so far
            elif num <= second:
                second = num  # second smallest
            else:
                # found a number greater than both -> triplet exists
                return True

        return False
</code>
</pre>
</details>

## 1.15. Group String (Count From Index 1)

Ref: [https://leetcode.com/problems/string-compression/](https://leetcode.com/problems/string-compression/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def compress(self, chars: List[str]) -> int:
        res = []
        count = 1  # Start with 1 since we always have at least one occurrence

        for i in range(1, len(chars) + 1):
            if i < len(chars) and chars[i] == chars[i - 1]:
                count += 1
            else:
                # End of a group
                res.append(chars[i - 1])
                if count > 1:
                    for digit in str(count):
                        res.append(digit)
                count = 1  # Reset count for the next character group

        # Modify input list in-place
        chars[:] = res
        return len(res)

</code>
</pre>
</details>

## 1.16. Prefix and Suffix

Ref: [https://leetcode.com/problems/find-pivot-index/description/](https://leetcode.com/problems/find-pivot-index/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        prefix = [0] * len(nums)
        for i in range(0, len(nums)):
            prefix[i] = nums[0] if i == 0 else prefix[i - 1] + nums[i]

        postfix = [0] * len(nums)
        
        for i in range(len(nums) - 1, -1, -1):
            postfix[i] = nums[len(nums) - 1] if i == len(nums) - 1 else postfix[i + 1] + nums[i]

        for i in range(len(nums)):
            if prefix[i] == postfix[i]:
                return i

        return -1

</code>
</pre>
</details>

# 2. Pattern 2: Two Pointer

## 2.1. Two Sum

Ref: [https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # O(N * logN)

        # Pair each number with its index
        nums_with_indices = list(enumerate(nums))  # [(index, value)]

        # Sort based on the values
        nums_with_indices.sort(key=lambda x: x[1])

        # Two Pointer Technique
        start, end = 0, len(nums_with_indices) - 1

        while start < end:
            curr_sum = nums_with_indices[start][1] + nums_with_indices[end][1]

            if curr_sum == target:
                return [nums_with_indices[start][0], nums_with_indices[end][0]]
            elif curr_sum < target:
                start += 1
            else:
                end -= 1

        return [-1, -1]
</code>
</pre>
</details>

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # O(N)
        numToIndex = {}
        for pE in range(0, len(nums)):
            currVal = nums[pE]

            if target - currVal in numToIndex:
                return [pE, numToIndex[target - currVal]]
            
            numToIndex[currVal] = pE

        return [-1, -1]
</code>
</pre>
</details>

## 2.2. Remove duplicates

Ref: [https://leetcode.com/problems/remove-duplicates-from-sorted-array/](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        nextNonDup = 0
        pE = 0
        while pE < len(nums):
            if pE == 0 or nums[pE] != nums[nextNonDup - 1]:
                nums[nextNonDup] = nums[pE]
                nextNonDup += 1
            pE += 1

        return nextNonDup
</code>
</pre>
</details>

## 2.3. Remove Element

Ref: [https://leetcode.com/problems/remove-element/](https://leetcode.com/problems/remove-element/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        nextNonTarget = 0
        pE = 0
        while pE < len(nums):
            if nums[pE] != val:
                nums[nextNonTarget] = nums[pE]
                nextNonTarget += 1
            pE += 1

        return nextNonTarget
</code>
</pre>
</details>

## 2.4. Squares of a Sorted Array

Ref: [https://leetcode.com/problems/squares-of-a-sorted-array/description/](https://leetcode.com/problems/squares-of-a-sorted-array/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        start, end = 0, len(nums) - 1
        highestSquare = len(nums) - 1
        result = [0] * len(nums)   

        while start <= end:
            startSquare = nums[start] ** 2
            endSquare = nums[end] ** 2

            if startSquare > endSquare:
                result[highestSquare] = startSquare
                start += 1
            else:
                result[highestSquare] = endSquare
                end -= 1

            # M lớn nhất rồi thì t fill thằng thứ 2
            highestSquare -= 1

        return result

</code>
</pre>
</details>

## 2.5. Three sums

Ref: [https://leetcode.com/problems/3sum/description/](https://leetcode.com/problems/3sum/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def twoSum(self, nums: List[int], start: int, end: int, target: int) -> List[int]:
        # O(N)
        numToIndex = {}
        result = []
        for pE in range(start, end + 1):
            currVal = nums[pE]

            if target - currVal in numToIndex:
                result.append([currVal, target - currVal])
            
            numToIndex[currVal] = pE

        return result

    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()  # Sort the array to handle duplicates
        result = set()
        for pE in range(0, len(nums)):
            # because the previous solution is contain this solution too
            if pE > 0 and nums[pE] == nums[pE - 1]:
                continue

            firstVal = nums[pE]
            resultTwoSum = self.twoSum(nums, pE + 1, len(nums) - 1, 0 - firstVal)
            for [secondVal, thirdVal] in resultTwoSum:
                result.add((firstVal, secondVal, thirdVal))

        return [list(triplet) for triplet in result]
    
</code>
</pre>
</details>

## 2.6. Three sums closest

Ref: [https://leetcode.com/problems/3sum-closest/](https://leetcode.com/problems/3sum-closest/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        nums.sort()
        closestSum = float('inf')
        for pE in range(0, len(nums) - 2):
            left = pE + 1
            right = len(nums) - 1
            while (left < right):
                currSum = nums[pE] + nums[left] + nums[right]
                if abs(currSum - target) < abs(closestSum - target):
                    closestSum = currSum

                # Check with currSum
                if currSum < target:
                    left += 1
                elif currSum > target:
                    right -= 1
                else:
                    return currSum
        return closestSum
    
</code>
</pre>
</details>

## 2.7. Three sums smaller

Ref: [https://leetcode.com/problems/3sum-smaller/](https://leetcode.com/problems/3sum-smaller/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def tripletsWithSmallerSum(self, nums: List[int], target: int) -> int:
        nums.sort()  # Sort the array to use the two-pointer technique
        count = 0

        for i in range(len(nums) - 2):
            left, right = i + 1, len(nums) - 1
            while left < right:
                current_sum = nums[i] + nums[left] + nums[right]
                if current_sum < target:
                    # If nums[i] + nums[left] + nums[right] is less than target,
                    # then all elements from left to right form valid triplets
                    count += right - left
                    left += 1
                else:
                    right -= 1

        return count
    
</code>
</pre>
</details>

## 2.8. Dutch National Problem (Sort In Place)

Ref: [https://leetcode.com/problems/sort-colors/](https://leetcode.com/problems/sort-colors/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def twoSum(self, nums: List[int], start: int, end: int, target: int) -> List[int]:
        # O(N)
        numToIndex = {}
        result = []
        for pE in range(start, end + 1):
            currVal = nums[pE]

            if target - currVal in numToIndex:
                result.append([currVal, target - currVal])
            
            numToIndex[currVal] = pE

        return result

    def threeSum(self, nums: List[int], start: int, end: int, target: int) -> List[List[int]]:
        result = []
        for pE in range(start, end + 1):
            firstVal = nums[pE]
            resultTwoSum = self.twoSum(nums, pE + 1, len(nums) - 1, target - firstVal)
            for [secondVal, thirdVal] in resultTwoSum:
                result.append([firstVal, secondVal, thirdVal])

        return result

    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        nums.sort()  # Sort the array to handle duplicates
        result = set()
        for pE in range(0, len(nums)):
            if pE > 0 and nums[pE] == nums[pE - 1]:
                continue
            firstVal = nums[pE]
            resultThreeSum = self.threeSum(nums, pE + 1, len(nums) - 1, target - firstVal)
            for [secondVal, thirdVal, fourVal] in resultThreeSum:
                result.add((firstVal, secondVal, thirdVal, fourVal))

        return [list(triplet) for triplet in result]


</code>
</pre>
</details>

## 2.9. Four sum

Ref: [https://leetcode.com/problems/4sum/](https://leetcode.com/problems/4sum/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        left = 0
        right = len(nums) - 1
        curr = 0

        # Because we compare curr <= right, do not increase the left pointer
        while curr <= right:
            if nums[curr] == 0:
                nums[left], nums[curr] = nums[curr], nums[left]
                left += 1
                # Because after swap: 1,2 will always > 0
                curr += 1
            elif nums[curr] == 2:
                nums[right], nums[curr] = nums[curr], nums[right]
                right -= 1
                # Because after swap may be it is 2, and 2 may be > 1
            else:
                curr += 1

        return nums

</code>
</pre>
</details>

## 2.10. Shortest Subarray to be Removed to Make Array Sorted

Ref: [https://leetcode.com/problems/shortest-subarray-to-be-removed-to-make-array-sorted/description/](https://leetcode.com/problems/
shortest-subarray-to-be-removed-to-make-array-sorted/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def findLengthOfShortestSubarray(self, arr: List[int]) -> int:
        n = len(arr)
        
        # Find the longest non-decreasing prefix
        left = 0
        while left < n - 1 and arr[left] <= arr[left + 1]:
            left += 1
            
        # If the entire array is non-decreasing
        if left == n - 1:
            return 0
            
        # Find the longest non-decreasing suffix
        right = n - 1
        while right > 0 and arr[right] >= arr[right - 1]:
            right -= 1
            
        # We have two options:
        # 1. Remove everything after left
        # 2. Remove everything before right
        # First is remove all the prefix or the suffix
        result = min(n - left - 1, right)
        
        # Try to merge the prefix and suffix, because we merge i to j, and find the min gap
        i = 0
        j = right
        while i <= left and j < n:
            if arr[i] <= arr[j]:
                # We can merge from i to j
                result = min(result, j - i - 1)
                i += 1
            else:
                j += 1
                
        return result
        
</code>
</pre>
</details>

## 2.11. Max number of K-sum pairs

Ref: [https://leetcode.com/problems/max-number-of-k-sum-pairs/](https://leetcode.com/problems/max-number-of-k-sum-pairs/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
def maxOperations(self, nums: List[int], k: int) -> int:
freqMap = {}
count = 0

        for num in nums:
            complement = k - num

            # If we have the complement and haven't used it yet
            if complement in freqMap and freqMap[complement] > 0:
                count += 1
                freqMap[complement] -= 1  # Mark the complement as used
            else:
                # Add current number to frequency map
                freqMap[num] = freqMap.get(num, 0) + 1

        return count
</code>
</pre>
</details>

## 2.12. Merge Alternatively

<!-- Ref: []()

<details>
<summary>Code</summary>

<pre>
<code class="python">

</code>
</pre>
</details> -->

Ref: [https://leetcode.com/problems/merge-strings-alternately/description](https://leetcode.com/problems/merge-strings-alternately/description)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        s, i, j = "", 0, 0

        while i < len(word1) and j < len(word2):
            s += word1[i] + word2[j]
            i += 1
            j += 1

        if i < len(word1):
            s += word1[i:]

        if j < len(word2):
            s += word2[j:]

        return s

</code>
</pre>
</details>

## 2.13. String Immutable, Need to change to List Character

Ref: [https://leetcode.com/problems/reverse-vowels-of-a-string/](https://leetcode.com/problems/reverse-vowels-of-a-string/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def reverseVowels(self, s: str) -> str:
        # Give all the vowels first
        vowels = ['a', 'e', 'i', 'o', 'u']
        vowelWord = []
        for character in s:
            if character.lower() in vowels:
                vowelWord.append(character)

        right = len(vowelWord) - 1
        s_list = list(s)
        for i in range(0, len(s_list)):
            if s[i].lower() in vowels:
                s_list[i] = vowelWord[right]
                right -= 1

        return ''.join(s_list)

</code>
</pre>
</details>

## 2.14. Can Place Flower (Adjacent Bit 0 and 1)

Ref: [https://leetcode.com/problems/can-place-flowers/](https://leetcode.com/problems/can-place-flowers/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        count = 0
        for i in range(0, len(flowerbed)):
            if flowerbed[i] == 0:
                empty_left = (i == 0 or flowerbed[i - 1] == 0)
                empty_right = (i == len(flowerbed) - 1 or flowerbed[i + 1] == 0)
                if empty_left and empty_right:
                    flowerbed[i] = 1
                    count += 1
        return count >= n
</code>
</pre>
</details>

## 2.15. Check A Map Values in Unique

Ref: [https://leetcode.com/problems/unique-number-of-occurrences/](https://leetcode.com/problems/unique-number-of-occurrences/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def uniqueOccurrences(self, arr: List[int]) -> bool:
        numToCount = {}
        for num in arr:
            numToCount[num] = numToCount.get(num, 0) + 1
        
        # Get all frequency values
        frequencies = list(numToCount.values())
        
        # Use a set to check if all frequencies are unique
        return len(frequencies) == len(set(frequencies))

</code>
</pre>
</details>

## 2.16. Determine if Two Strings Are Close

Ref: [https://leetcode.com/problems/determine-if-two-strings-are-close/description/](https://leetcode.com/problems/determine-if-two-strings-are-close/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import Counter

class Solution:
    def closeStrings(self, word1: str, word2: str) -> bool:
        # Must be same length
        if len(word1) != len(word2):
            return False

        # Same characters
        if set(word1) != set(word2):
            return False

        # Same frequency pattern (ignoring which character)
        # Such as [2,3,1] == [1,2,3] => sort for easy compare
        return sorted(Counter(word1).values()) == sorted(Counter(word2).values())
        

</code>
</pre>
</details>

## 2.17. Count Tuple In Map

Ref: [https://leetcode.com/problems/equal-row-and-column-pairs/description/](https://leetcode.com/problems/equal-row-and-column-pairs/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import Counter

class Solution:
    def equalPairs(self, grid: List[List[int]]) -> int:
        # O(N^3)
        N = len(grid)
        count = 0
        for i in range(0, N):
            firstRow = tuple(grid[i]) # Row i
            secondCol = []
            for k in range(0, N):
                thirdCol = []
                for j in range(0, N):
                    thirdCol.append(grid[j][k])
                secondCol.append(tuple(thirdCol))

            counterCol = Counter(secondCol)
            count += counterCol[firstRow]

        return count

        # O(N^2) => tranpose matrix O(N)
        # n = len(grid)
        # # Convert rows to tuples
        # row_tuples = [tuple(row) for row in grid]

        # # Convert columns to tuples using zip
        # col_tuples = list(zip(*grid))

        # print(row_tuples, col_tuples)

        # # Count frequency of each column
        # col_counter = Counter(col_tuples)

        # # Count how many rows match columns
        # count = 0
        # for row in row_tuples:
        #     count += col_counter[row]

        # return count            
        
</code>
</pre>
</details>

## 2.18. Merge Sort Array

Ref: [https://leetcode.com/problems/merge-sorted-array/description/](https://leetcode.com/problems/merge-sorted-array/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        # Create subarrays for nums1 and nums2
        subNums1 = nums1[:m] if m > 0 else []
        subNums2 = nums2[:n] if n > 0 else []

        i = 0
        j = 0
        k = 0
        res = [0] * (m + n)

        # Merge the two arrays into res
        while i < m and j < n:
            if subNums1[i] < subNums2[j]:
                res[k] = subNums1[i]
                i += 1
            else:
                res[k] = subNums2[j]
                j += 1
            k += 1

        while i < m:
            res[k] = subNums1[i]
            i += 1
            k += 1

        while j < n:
            res[k] = subNums2[j]
            j += 1
            k += 1

        # Modify nums1 in-place
        for index in range(m + n):
            nums1[index] = res[index]

</code>
</pre>
</details>

## 2.19. Remove duplicates 2

Ref: [https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        nextNonDup = 0
        pE = 0

        while pE < len(nums):
            if pE < 2 or nums[pE] != nums[nextNonDup - 1] or nums[pE] != nums[nextNonDup - 2]:
                nums[nextNonDup] = nums[pE]
                nextNonDup += 1
            pE += 1

        return nextNonDup

</code>
</pre>
</details>

## 2.20. Majority Element

Ref: [https://leetcode.com/problems/majority-element/description/](https://leetcode.com/problems/majority-element/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import Counter
import math

class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        numsCounter = Counter(nums)

        for key, value in numsCounter.items():
            if value > math.floor(len(nums) / 2):
                return key

        return -1

</code>
</pre>
</details>

## 2.21. Rotate Array

Ref: [https://leetcode.com/problems/rotate-array/description/](https://leetcode.com/problems/rotate-array/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        n = len(nums)
        original = nums[:]

        # Loop in the end
        for i in range(n - 1, -1, -1):
            nums[(i + k) % n] = original[i]

        # n = len(nums)
        # k %= n  # In case k > n

        # # Copy the last k elements + the rest
        # nums[:] = nums[-k:] + nums[:-k]

</code>
</pre>
</details>

## 2.22. Append Characters to String to Make Subsequence

Ref: [https://leetcode.com/problems/append-characters-to-string-to-make-subsequence/description/](https://leetcode.com/problems/append-characters-to-string-to-make-subsequence/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def appendCharacters(self, s: str, t: str) -> int:
        i = 0 
        j = 0 
        
        while i < len(s) and j < len(t):
            if s[i] == t[j]:
                j += 1
            i += 1

        return len(t) - j

</code>
</pre>
</details>

## 2.23. String Matching in an Array

Ref: [https://leetcode.com/problems/string-matching-in-an-array/description/](https://leetcode.com/problems/string-matching-in-an-array/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def stringMatching(self, words: List[str]) -> List[str]:
        # O(NlogN)
        # O(N^2)
        # Remove dup
        result = set()
        sortedWords = sorted(words, key=len)
        for i in range(0, len(sortedWords) - 1):
            for j in range(i + 1, len(sortedWords)):
                if sortedWords[i] in sortedWords[j]:
                    result.add(sortedWords[i])

        return list(result)

</code>
</pre>
</details>

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

# 43. Pattern 43: Math

## 43.1. Greatest Common Divisor of Strings

Ref: [https://leetcode.com/problems/greatest-common-divisor-of-strings/](https://leetcode.com/problems/greatest-common-divisor-of-strings/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
import math

class Solution:
    def gcdOfStrings(self, str1: str, str2: str) -> str:
        # If concatenating in both orders yields different results, there's no GCD string
        if str1 + str2 != str2 + str1:
            return ""

        # The length of the GCD string is the GCD of the lengths
        gcd_len = math.gcd(len(str1), len(str2))
        return str1[:gcd_len]
        
</code>
</pre>
</details>

## 43.2. Rabbits in Forest

Ref: [https://leetcode.com/problems/rabbits-in-forest/description/](https://leetcode.com/problems/rabbits-in-forest/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import Counter
import math

class Solution:
    def numRabbits(self, answers: List[int]) -> int:
        # If a rabbit says "x other rabbits have the same color," it means there are x + 1 total rabbits of that color.
        # But if multiple rabbits say the same number, they might be in the same group, or represent multiple groups of that same size.
        counter = Counter(answers)
        count = 0

        # Edgecase: 1,1,1 => 2 group
        for key, freq in counter.items():
            group_size = key + 1
            groups = math.ceil(freq / group_size)
            count += groups * group_size

        return count
        
</code>
</pre>
</details>

## 43.3. How Many Numbers Are Smaller Than the Current Number

Ref: [https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/description/](https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def smallerNumbersThanCurrent(self, nums: List[int]) -> List[int]:
        # O(N^2)
        res = []
        for i in range(0, len(nums)):
            count = 0
            for j in range(0, len(nums)):
                if j != i and nums[j] < nums[i]:
                    count += 1
            res.append(count)

        return res


        # O(NlogN)
        sort_num = sorted(nums)
        numToIndex = {}

        # [1,2,2,3,8]
        for i, value in enumerate(sort_num):
            if value not in numToIndex:
                numToIndex[value] = i

        return [numToIndex[num] for num in nums]

</code>
</pre>
</details>

## 43.4. Best Time to Buy and Sell Stock (Finding Min Dynamic)

Ref: [https://leetcode.com/problems/best-time-to-buy-and-sell-stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0

        for i in range(0, len(prices)):
            if prices[i] < min_price:
                min_price = prices[i]
            
            # profit = price[i] - min_price at previous time
            max_profit = max(max_profit, prices[i] - min_price)
        
        return max_profit

</code>
</pre>
</details>

## 43.4. Best Time to Buy and Sell Stock 2 (If larger than previous price and you will buy)

Ref: [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # If larger than you will buy
        maxProfit = 0
        for i in range(1, len(prices)):
            if prices[i] > prices[i - 1]:
                maxProfit += prices[i] - prices[i - 1]

        return maxProfit

</code>
</pre>
</details>

## 43.5. Jump Game

Ref: [https://leetcode.com/problems/jump-game/](https://leetcode.com/problems/jump-game/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        farthest = 0
        for i in range(0, len(nums)):
            # Previous step can not read here
            if (i > farthest): 
                return False
            # Farthest jump at step i
            farthest = max(farthest, i + nums[i])
        
        return True

</code>
</pre>
</details>

## 43.5. Jump Game 2

Ref: [https://leetcode.com/problems/jump-game-ii/](https://leetcode.com/problems/jump-game-ii/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def jump(self, nums: List[int]) -> int:
        farthest = 0
        nextStep = 0
        count = 0
        # Final step do not need to jump
        for i in range(0, len(nums) - 1):
            # Previous step can not read here
            if (i > farthest): 
                return 0

            # Farthest jump at step i
            farthest = max(farthest, i + nums[i]) if i + nums[i] < len(nums) else len(nums) - 1

            # Jump in the largest step
            if i == nextStep:
                count += 1
                nextStep = farthest
        
        return count
        

</code>
</pre>
</details>

## 43.5. H-Index (Max i and n - i)

Ref: [https://leetcode.com/problems/h-index/description/](https://leetcode.com/problems/h-index/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def hIndex(self, citations: List[int]) -> int:
        # Find i number is larger than i
        # O(NlogN)
        citations.sort()

        maxHIndex = 0
        for i in range(0, len(citations)):
            # For example [1, and 5 values] => 1 must be pass
            h = min(citations[i], len(citations) - i)
            maxHIndex = max(maxHIndex, h)
        
        return maxHIndex

</code>
</pre>
</details>

## 43.6. HashMap - Insert Delete GetRandom O(1)

Ref: [https://leetcode.com/problems/insert-delete-getrandom-o1/](https://leetcode.com/problems/insert-delete-getrandom-o1/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
import random

class RandomizedSet:

    def __init__(self):
        self.hashMap = {}
        

    def insert(self, val: int) -> bool:
        if val in self.hashMap:
            return False
        self.hashMap[val] = True
        return True
        

    def remove(self, val: int) -> bool:
        if val not in self.hashMap:
            return False
        del self.hashMap[val]
        return True
        

    # O(N) => you can use a list to make it to O(1)
    def getRandom(self) -> int:
        return random.choice(list(self.hashMap.keys()))
        


# Your RandomizedSet object will be instantiated and called as such:
# obj = RandomizedSet()
# param_1 = obj.insert(val)
# param_2 = obj.remove(val)
# param_3 = obj.getRandom()


# import random

# class RandomizedSet:

#     def __init__(self):
#         self.dict = {}       # val -> index in list
#         self.list = []       # index -> val

#     def insert(self, val: int) -> bool:
#         if val in self.dict:
#             return False
#         self.list.append(val)
#         self.dict[val] = len(self.list) - 1
#         return True

#     def remove(self, val: int) -> bool:
#         if val not in self.dict:
#             return False
#         index = self.dict[val]
#         last_element = self.list[-1]
#         # Move last element to the spot of the one to remove
#         self.list[index] = last_element
#         self.dict[last_element] = index
#         # Remove last element
#         self.list.pop()
#         del self.dict[val]
#         return True

#     def getRandom(self) -> int:
#         return random.choice(self.list)


</code>
</pre>
</details>

## 43.7. Gas Station (Circular Array)

Ref: [https://leetcode.com/problems/gas-station/description/](https://leetcode.com/problems/gas-station/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        # O(N^2)
        # for i in range(len(gas)):
        #     fuel = gas[i] - cost[i]
        #     if fuel < 0:
        #         continue

        #     j = (i + 1) % len(gas)
        #     count = 1

        #     while j != i:
        #         fuel += gas[j] - cost[j]
        #         if fuel < 0:
        #             break
        #         j = (j + 1) % len(gas)
        #         count += 1

        #     if count == len(gas) and fuel >= 0:
        #         return i

        # return -1

        # O(N)
        total_gas = 0
        total_cost = 0
        tank = 0
        start = 0

        for i in range(len(gas)):
            total_gas += gas[i]
            total_cost += cost[i]

            # No need to add gas[i + 1] — it gets picked up in the next loop iteration.
            tank += gas[i] - cost[i]

            if tank < 0:
                # Can't reach this station from previous start
                start = i + 1
                tank = 0

        return start if total_gas >= total_cost else -1

</code>
</pre>
</details>

## 43.8. Candy

Ref: [https://leetcode.com/problems/candy/](https://leetcode.com/problems/candy/)

<details>
<summary>Code</summary>

<pre>
<code class="python">

# Do a left-to-right pass to make sure each child has more candies than the left neighbor if their rating is higher.
# Do a right-to-left pass to ensure each child has more candies than the right neighbor if their rating is higher.

class Solution:
    def candy(self, ratings: List[int]) -> int:
        # Greedy
        n = len(ratings)
        candies = [1] * n

        # Left to right
        for i in range(1, n):
            if ratings[i] > ratings[i - 1]:
                candies[i] = candies[i - 1] + 1

        # Right to left
        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                candies[i] = max(candies[i], candies[i + 1] + 1)

        return sum(candies)

</code>
</pre>
</details>

## 43.9. Container With Most Water

Ref: [https://leetcode.com/problems/container-with-most-water/](https://leetcode.com/problems/container-with-most-water/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def maxArea(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        maxArea = 0
        while left < right:
            currArea = min(height[left], height[right]) * (right - left)
            maxArea = max(maxArea, currArea)
            if height[left] <= height[right]:
                left += 1
            else:
                right -= 1

        return maxArea

</code>
</pre>
</details>

## 43.10. Trapping Rain Water

Ref: [https://leetcode.com/problems/trapping-rain-water/](https://leetcode.com/problems/trapping-rain-water/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def trap(self, height: List[int]) -> int:
        stack = []
        water_trapped = 0

        for i in range(0, len(height)):
            while stack and height[i] > height[stack[-1]]:
                top = stack.pop()

                if stack:
                    width = i - stack[-1] - 1  
                    bounded_height = min(height[i], height[stack[-1]]) - height[top] 
                    water_trapped += width * bounded_height

            stack.append(i)

        return water_trapped

</code>
</pre>
</details>

## 43.11. Next Greater Element II

Ref: [https://leetcode.com/problems/next-greater-element-ii/description/](https://leetcode.com/problems/next-greater-element-ii/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def nextGreaterElements(self, nums: List[int]) -> List[int]:
        n = len(nums)
        result = [-1] * n
        stack = []
        
        for i in range(2 * n - 1, -1, -1):
            curr_idx = i % n
            
            while stack and nums[stack[-1]] <= nums[curr_idx]:
                stack.pop()
                
            if stack:
                result[curr_idx] = nums[stack[-1]]
            
            stack.append(curr_idx)
            
        return result

</code>
</pre>
</details>

## 43.12. Roman to Integer

Ref: [https://leetcode.com/problems/roman-to-integer/description/](https://leetcode.com/problems/roman-to-integer/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def romanToInt(self, s: str) -> int:
        hashMap = {
            'I': 1,
            'V': 5,
            'X': 10,
            'L': 50,
            'C': 100,
            'D': 500,
            'M': 1000
        }

        val = 0
        for i in range(0, len(s)):
            if i < len(s) - 1 and hashMap[s[i]] < hashMap[s[i + 1]]:
                val -= hashMap[s[i]]
            else:
                val += hashMap[s[i]]

        return val
        
</code>
</pre>
</details>

## 43.13. Integer to Roman

Ref: [https://leetcode.com/problems/integer-to-roman/description/](https://leetcode.com/problems/integer-to-roman/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def intToRoman(self, num: int) -> str:
        val = [
            1000, 900, 500, 400,
            100, 90, 50, 40,
            10, 9, 5, 4, 1
        ]
        syms = [
            "M", "CM", "D", "CD",
            "C", "XC", "L", "XL",
            "X", "IX", "V", "IV", "I"
        ]
        
        roman = ""
        for i in range(len(val)):
            while num >= val[i]:
                roman += syms[i]
                num -= val[i]
        return roman
        
</code>
</pre>
</details>

## 43.14. Count Largest Group

Ref: [https://leetcode.com/problems/count-largest-group/](https://leetcode.com/problems/count-largest-group/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import defaultdict

class Solution:
    def countLargestGroup(self, n: int) -> int:
        count = defaultdict(int)

        for i in range(1, n + 1):
            digit_sum = sum(int(d) for d in str(i))
            count[digit_sum] += 1

        max_size = max(count.values())
        return sum(1 for v in count.values() if v == max_size)
        
</code>
</pre>
</details>

## 43.15. Longest Common Prefix

Ref: [https://leetcode.com/problems/longest-common-prefix/description/](https://leetcode.com/problems/longest-common-prefix/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        minLen = min(len(word) for word in strs)
        result = ""
        
        for i in range(0, minLen):
            currChar = strs[0][i]
            if all(word[i] == currChar for word in strs):
                result += currChar
            else:
                break
                
        return result
        
</code>
</pre>
</details>

## 43.16. Zigzag Conversion

Ref: [https://leetcode.com/problems/zigzag-conversion/](https://leetcode.com/problems/zigzag-conversion/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1 or numRows >= len(s):
            return s

        # Create a list of strings for all rows
        # Character in one row
        rows = [''] * numRows
        current_row = 0
        going_down = False

        for char in s:
            rows[current_row] += char
            # Change direction at the first or last row
            if current_row == 0 or current_row == numRows - 1:
                going_down = not going_down
            current_row += 1 if going_down else -1

        return ''.join(rows)
        
</code>
</pre>
</details>

## 43.17. SubString Using Sliding Window

Ref: [https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
        if not needle:
            return 0

        for i in range(len(haystack) - len(needle) + 1):
            if haystack[i:i + len(needle)] == needle:
                return i
        return -1
        
</code>
</pre>
</details>

## 43.18. Text Justification

Ref: [https://leetcode.com/problems/text-justification/description/](https://leetcode.com/problems/text-justification/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
        res = []
        i = 0
        while i < len(words):
            # Step 1: Determine how many words fit into the current line
            line_len = len(words[i])
            j = i + 1
            while j < len(words) and line_len + 1 + len(words[j]) <= maxWidth:
                line_len += 1 + len(words[j])
                j += 1

            line_words = words[i:j]
            num_words = j - i
            total_chars = sum(len(w) for w in line_words)
            num_spaces = maxWidth - total_chars

            # Step 2: Build the line
            # Build last line
            if j == len(words) or num_words == 1:
                # Last line or single word -> left justified
                line = ' '.join(line_words)
                line += ' ' * (maxWidth - len(line))
            # Build middle line
            else:
                # Fully justify
                spaces_between = num_words - 1
                space, extra = divmod(num_spaces, spaces_between)
                line = ''
                for k in range(spaces_between):
                    line += line_words[k]
                    line += ' ' * (space + (1 if k < extra else 0))
                line += line_words[-1]  # Last word

            res.append(line)
            i = j
        return res
        
</code>
</pre>
</details>
