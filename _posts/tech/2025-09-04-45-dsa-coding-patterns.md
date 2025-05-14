---
layout: post
title: '42 Coding Interview Pattern'
date: 2025-05-05
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

## 2.24. Group Anagrams

Ref: [https://leetcode.com/problems/group-anagrams/description/](https://leetcode.com/problems/group-anagrams/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
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

</code>
</pre>
</details>

## 2.25. Maximum Swap

Ref: [https://leetcode.com/problems/maximum-swap/description/](https://leetcode.com/problems/maximum-swap/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def maximumSwap(self, num: int) -> int:
        num_str = list(str(num))
        last = {int(x): i for i, x in enumerate(num_str)}  # last position of each digit

        for i, digit in enumerate(num_str):
            for d in range(9, int(digit), -1):  # check digits larger than current
                if last.get(d, -1) > i:
                    # swap
                    num_str[i], num_str[last[d]] = num_str[last[d]], num_str[i]
                    return int(''.join(num_str))

        return num  # already the maximum

</code>
</pre>
</details>

## 2.26. Max Chunks To Make Sorted II

Ref: [https://leetcode.com/problems/max-chunks-to-make-sorted-ii/](https://leetcode.com/problems/max-chunks-to-make-sorted-ii/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def maxChunksToSorted(self, arr: List[int]) -> int:
        n = len(arr)
        max_left = [0] * n
        min_right = [0] * n

        # Fill max_left array
        max_left[0] = arr[0]
        for i in range(1, n):
            max_left[i] = max(max_left[i - 1], arr[i])

        # Fill min_right array
        min_right[-1] = arr[-1]
        for i in range(n - 2, -1, -1):
            min_right[i] = min(min_right[i + 1], arr[i])

        # Count valid chunks
        chunks = 0
        for i in range(n - 1):
            if max_left[i] <= min_right[i + 1]:
                chunks += 1

        return chunks + 1

</code>
</pre>
</details>

# 3. Pattern 3: Fast & Slow Pointer

# 4. Pattern 4: Merge Interval

## 4.1. Merge Intervals

Ref: [https://leetcode.com/problems/merge-intervals/description/](https://leetcode.com/problems/merge-intervals/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        if len(intervals) < 2:
            return intervals

        # Sort intervals based on the start time
        intervals.sort(key=lambda x: x[0])

        merged = []
        start, end = intervals[0]

        for i in range(1, len(intervals)):
            curr_start, curr_end = intervals[i]

            if curr_start <= end:  # Overlapping intervals
                end = max(end, curr_end)
            else:
                # Non-overlapping interval, append previous one
                merged.append([start, end])
                start, end = curr_start, curr_end

        # Add the last interval
        merged.append([start, end])

        return merged

</code>
</pre>
</details>

## 4.2. Insert Interval

Ref: [https://leetcode.com/problems/insert-interval/](https://leetcode.com/problems/insert-interval/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        # Sort intervals based on the start time
        intervals += [newInterval]

        if len(intervals) < 2:
            return intervals

        intervals.sort(key=lambda x: x[0])

        merged = []
        start, end = intervals[0]

        for i in range(1, len(intervals)):
            curr_start, curr_end = intervals[i]

            if curr_start <= end:  # Overlapping intervals
                end = max(end, curr_end)
            else:
                # Non-overlapping interval, append previous one
                merged.append([start, end])
                start, end = curr_start, curr_end

        # Add the last interval
        merged.append([start, end])

        return merged

</code>
</pre>
</details>

## 4.3. Intersection Interval

Ref: [https://leetcode.com/problems/interval-list-intersections/description/](https://leetcode.com/problems/interval-list-intersections/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def intervalIntersection(self, firstList: List[List[int]], secondList: List[List[int]]) -> List[List[int]]:
        # Step 1: Merge both lists
        intervals = firstList + secondList
        
        # Step 2: Sort by start time
        intervals.sort(key=lambda x: x[0])
        
        result = []
        prev = intervals[0]

        for i in range(1, len(intervals)):
            curr = intervals[i]

            # Check for overlap
            start = max(prev[0], curr[0])
            end = min(prev[1], curr[1])
            if start <= end:
                result.append([start, end])

            # Update prev to the one that extends further
            if curr[1] > prev[1]:
                prev = curr

        return result

</code>
</pre>
</details>

## 4.4. Meeting Rooms

Ref: [https://leetcode.com/problems/meeting-rooms/description/](https://leetcode.com/problems/meeting-rooms/description/)

```bash
Input: intervals = [[0,30],[5,10],[15,20]]
Output: False  # Because [0,30] overlaps with both other meetings
```

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        intervals.sort(key=lambda x: x[0])
        
        for i in range(1, len(intervals)):
            if intervals[i][0] < intervals[i-1][1]:  # overlap
                return False
                
        return True

</code>
</pre>
</details>

## 4.5. Meeting Rooms 2 (Pop ra thêm vào)

Ref: [https://leetcode.com/problems/meeting-rooms-ii/description/](https://leetcode.com/problems/meeting-rooms-ii/description/)

```bash
Meetings: [[4,5], [2,3], [2,4], [3,5]]
Output: 2
Explanation: We will need one room for [2,3] and [3,5], and another room for [2,4] and [4,5].
```

<details>
<summary>Code</summary>

<pre>
<code class="python">

# Start processing:

# Heap: []
# Add [2,3]:

# No rooms yet, so we allocate one.
# Heap becomes [3].

# Process [2,4]:
# Start time 2 < earliest end time 3 → Overlap → need new room.

# Heap: [3, 4]
# Process [3,5]:
# Start time 3 ≥ earliest end time 3 → Room becomes free → reuse room.

# Pop 3, push 5.
# Heap: [4, 5]

# Process [4,5]:
# Start time 4 ≥ earliest end time 4 → Room becomes free → reuse room.

# Pop 4, push 5.
# Heap: [5, 5]

from typing import List
import heapq

class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        if not intervals:
            return 0

        # Sort by start time
        intervals.sort(key=lambda x: x[0])
        
        # Initialize a heap with the end time of the first meeting
        heap = [intervals[0][1]]
        
        for i in range(1, len(intervals)):
            # If the room is free, reuse it (pop the earliest end time)
            if intervals[i][0] >= heap[0]:
                heapq.heappop(heap)
            # Allocate a new room
            heapq.heappush(heap, intervals[i][1])
        
        return len(heap)

</code>
</pre>
</details>

## 4.6. Car Pooling (Greedy)

Ref: [https://leetcode.com/problems/car-pooling/description/](https://leetcode.com/problems/car-pooling/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def carPooling(self, trips: List[List[int]], capacity: int) -> bool:
        # Step 1: Use a difference array to track passenger changes at each location
        changes = [0] * 1001  # locations go from 0 to 1000

        for num_passengers, start, end in trips:
            changes[start] += num_passengers
            changes[end] -= num_passengers

        # Step 2: Sweep through the route and track the number of passengers
        current_passengers = 0
        for passengers in changes:
            current_passengers += passengers
            if current_passengers > capacity:
                return False

        return True


</code>
</pre>
</details>

## 4.7. Max CPU Load (Merge intervals => Find max)

Ref: [https://www.geeksforgeeks.org/maximum-cpu-load-from-the-given-list-of-jobs/](https://www.geeksforgeeks.org/maximum-cpu-load-from-the-given-list-of-jobs/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
import heapq
from typing import List

def findMaxCPULoad(jobs: List[List[int]]) -> int:
    # Step 1: Sort jobs by start time
    jobs.sort(key=lambda x: x[0])

    max_cpu_load = 0
    current_load = 0
    min_heap = []  # stores [end_time, load]

    for start, end, load in jobs:
        # Step 2: Remove all jobs that have ended
        while min_heap and min_heap[0][0] <= start:
            ended_job = heapq.heappop(min_heap)
            current_load -= ended_job[1]

        # Step 3: Add current job
        heapq.heappush(min_heap, [end, load])
        current_load += load

        # Step 4: Update max load
        max_cpu_load = max(max_cpu_load, current_load)

    return max_cpu_load

</code>
</pre>
</details>

## 4.8. Employee Freetime (Merge Overlap, and get the free gap)

Ref: [https://leetcode.com/problems/employee-free-time/description/](https://leetcode.com/problems/employee-free-time/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

# Provided Interval class
class Interval:
    def __init__(self, start: int, end: int):
        self.start = start
        self.end = end

class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        if len(intervals) < 2:
            return intervals

        intervals.sort(key=lambda x: x[0])
        merged = []
        start, end = intervals[0]

        for i in range(1, len(intervals)):
            curr_start, curr_end = intervals[i]

            if curr_start <= end:
                end = max(end, curr_end)
            else:
                merged.append([start, end])
                start, end = curr_start, curr_end

        merged.append([start, end])
        return merged

    def employeeFreeTime(self, schedule: 'List[List[Interval]]') -> 'List[Interval]':
        # Step 1: Flatten intervals
        intervals = [[i.start, i.end] for employee in schedule for i in employee]

        # Step 2: Merge using your function
        merged = self.merge(intervals)

        # Step 3: Find gaps (free time)
        free_times = []
        for i in range(1, len(merged)):
            prev_end = merged[i-1][1]
            curr_start = merged[i][0]
            if prev_end < curr_start:
                free_times.append(Interval(prev_end, curr_start))

        return free_times

</code>
</pre>
</details>

# 5. Pattern 5: Cyclic Sort

# 6. Pattern 6: In-place Reversal of a LinkedList

# 7. Pattern 7: Binary Tree (Tree)

---

**Ancestor**

## 7.1. Lowest Common Ancestor of a Binary Search Tree

Ref: [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None


class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        # If both nodes are smaller than the current root, go left.
        # If both are greater, go right.
        # Otherwise, you have found the split point, i.e., the Lowest Common Ancestor.

        while root:
            if p.val < root.val and q.val < root.val:
                root = root.left
            elif p.val > root.val and q.val > root.val:
                root = root.right
            else:
                return root

</code>
</pre>
</details>

## 7.2. Lowest Common Ancestor of a Binary Tree

Ref: [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        # Base case: if root is None or matches either p or q
        if root is None or root == p or root == q:
            return root
        
        # Search in the left and right subtrees

        # Loop in both left and right, and find the first reach node
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        
        # If both sides return non-null, current root is the LCA
        if left and right:
            return root
        
        # If only one side is non-null, return that side
        return left if left else right

</code>
</pre>
</details>

## 7.3. Maximum Difference Between Node and Ancestor

Ref: [https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/description/](https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxAncestorDiff(self, root: Optional[TreeNode]) -> int:
        # cur_max and cur_min flow only along one path at a time.
        # When we go down the left subtree (5 → 3 → 1), the state is isolated to that path.
        # When we go down the right (5 → 8 → 10), it’s a separate set of state values.
        def dfs(node, cur_max, cur_min):
            if not node:
                return cur_max - cur_min
            
            # Update current max and min
            # I mean curr_max and curr_min is reset based on different path (path root to left or path root to right)
            cur_max = max(cur_max, node.val)
            cur_min = min(cur_min, node.val)
            
            # Continue DFS traversal
            left = dfs(node.left, cur_max, cur_min)
            right = dfs(node.right, cur_max, cur_min)
            
            return max(left, right)
        
        return dfs(root, root.val, root.val)

</code>
</pre>
</details>

## 7.4. Lowest Common Ancestor of Deepest Leaves

Ref: [https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/description/](https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def lcaDeepestLeaves(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # Helper function to return both depth and LCA
        def dfs(node):
            if not node:
                return (0, None)
            
            left_depth, left_lca = dfs(node.left)
            right_depth, right_lca = dfs(node.right)
            
            if left_depth > right_depth:
                return (left_depth + 1, left_lca)
            elif right_depth > left_depth:
                return (right_depth + 1, right_lca)
            else:
                # Equal depth => current node is the LCA of both deepest sides
                return (left_depth + 1, node)
        
        return dfs(root)[1]

</code>
</pre>
</details>

## 7.5. Kth Ancestor of a Tree Node (Store All Tree Ancestor)

Ref: [https://leetcode.com/problems/kth-ancestor-of-a-tree-node/](https://leetcode.com/problems/kth-ancestor-of-a-tree-node/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class TreeAncestor:

    def __init__(self, n: int, parent: List[int]):
        self.LOG = 20  # Enough for trees with up to around 10^6 nodes
        self.dp = [[-1] * self.LOG for _ in range(n)]

        # Initialize each node's direct parent (2^0-th ancestor)
        for i in range(n):
            self.dp[i][0] = parent[i]

        # Fill in the dp table for all 2^j-th ancestors
        for j in range(1, self.LOG):
            for i in range(n):
                prev_ancestor = self.dp[i][j - 1]
                if prev_ancestor != -1:
                    self.dp[i][j] = self.dp[prev_ancestor][j - 1]

        print(self.dp)

    def getKthAncestor(self, node: int, k: int) -> int:
        power = 0
        while k > 0 and node != -1:
            if k % 2 == 1:
                node = self.dp[node][power]
            k //= 2
            power += 1
        return node

    
</code>
</pre>
</details>

---

**Tree Depth First Search (DFS)**

## 7.6. Path Sum

Ref: [https://leetcode.com/problems/path-sum/description/](https://leetcode.com/problems/path-sum/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:
        def dfs(node, currentSum):
            if not node:
                return False
            
            currentSum += node.val
            
            # If it's a leaf node, check if the path sum matches targetSum
            if not node.left and not node.right:
                return currentSum == targetSum
            
            # Continue DFS on left and right subtrees
            return dfs(node.left, currentSum) or dfs(node.right, currentSum)
        
        return dfs(root, 0)

</code>
</pre>
</details>

## 7.7. Binary Tree Paths

Ref: [https://leetcode.com/problems/binary-tree-paths/description/](https://leetcode.com/problems/binary-tree-paths/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:
        result = []
        def dfs(node, path):
            if not node:
                return
            
            path.append(str(node.val))
            if not node.left and not node.right:
                result.append("->".join(path))
            else:
                dfs(node.left, path)
                dfs(node.right, path)

            # Backtrack
            path.pop()

        
        dfs(root, [])
        print(result)
        return result

</code>
</pre>
</details>

## 7.8. Path Sum II (Backtracking Magic)

Ref: [https://leetcode.com/problems/path-sum-ii/description/](https://leetcode.com/problems/path-sum-ii/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:
        result = []
        def dfs(node, path, target):
            if not node:
                return
            
            path.append(node.val)
            target -= node.val
            if not node.left and not node.right and target == 0:
                result.append(path[:])
            else:
                dfs(node.left, path, target)
                dfs(node.right, path, target)

            # Backtrack
            path.pop()
            target += node.val

        
        dfs(root, [], targetSum)
        return result

</code>
</pre>
</details>

## 7.9. Sum Root to Leaf Numbers (Modify an nonlocal variable)

Ref: [https://leetcode.com/problems/sum-root-to-leaf-numbers/description/](https://leetcode.com/problems/sum-root-to-leaf-numbers/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        total = 0
        def dfs(node, path):
            nonlocal total  # Declare nonlocal so we can modify 'total'
            if not node:
                return
            
            path.append(str(node.val))
            if not node.left and not node.right:
                total += int("".join(path))
            else:
                dfs(node.left, path)
                dfs(node.right, path)

            # Backtrack
            path.pop()

        
        dfs(root, [])
        return total

</code>
</pre>
</details>

## 7.10. Path Sum III (Sum of the local branch - Idea - Root -> M - Root-> N = M -> N)

Ref: [https://leetcode.com/problems/path-sum-iii/description/](https://leetcode.com/problems/path-sum-iii/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

from typing import Optional
from collections import defaultdict

class Solution:

    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        prefix_sum = defaultdict(int)
        prefix_sum[0] = 1  # base case: empty path has sum = 0
        self.count = 0

        def dfs(node, current_sum):
            if not node:
                return

            current_sum += node.val

            # Check if there is a prefix path we can subtract to reach targetSum

            # IDEA: current_sum = sum from the root to the current node
            # If there exists a prefix_sum = current_sum - targetSum, then
            # the subpath from after that earlier prefix to the current node must sum to targetSum.

            # IDEA: Sum root -> m subtract for root -> n = targetSum => n -> m is the prefix path
            self.count += prefix_sum[current_sum - targetSum]

            # Add current sum to prefix sums
            prefix_sum[current_sum] += 1

            dfs(node.left, current_sum)
            dfs(node.right, current_sum)

            # Backtrack: remove current sum from the map
            prefix_sum[current_sum] -= 1

        dfs(root, 0)
        return self.count

</code>
</pre>
</details>

## 7.11. Diameter of Binary Tree (Backtrack Height of the Node)

Ref: [https://leetcode.com/problems/diameter-of-binary-tree/description/](https://leetcode.com/problems/diameter-of-binary-tree/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        self.max_diameter = 0

        def dfs(node):
            if not node:
                return 0

            left = dfs(node.left)
            right = dfs(node.right)

            self.max_diameter = max(self.max_diameter, left + right)

            # Backtrack height of the node
            return 1 + max(left, right)

        dfs(root)
        return self.max_diameter


</code>
</pre>
</details>

## 7.12. Binary Tree Maximum Path Sum (Care about what we return in root and leaf, it is enough)

Ref: [https://leetcode.com/problems/binary-tree-maximum-path-sum/description/](https://leetcode.com/problems/binary-tree-maximum-path-sum/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        self.max_sum = float('-inf')

        def dfs(node):
            if not node:
                return 0

            # Compute max path sum *starting* from left/right, ignore negatives
            left = max(dfs(node.left), 0)
            right = max(dfs(node.right), 0)

            # Max path THROUGH this node = left + node.val + right
            self.max_sum = max(self.max_sum, node.val + left + right)

            # Return max gain from this node to parent
            # IDEA: In root, in left and right, we have multiple branches, we only select a branch to do this
            # Care about what we return in root and leaf, it is enough
            return node.val + max(left, right)

        dfs(root)
        return self.max_sum

</code>
</pre>
</details>

---

**BFS**

## 7.13. Binary Tree Level Order Traversal

Ref: [https://leetcode.com/problems/binary-tree-level-order-traversal/description/](https://leetcode.com/problems/binary-tree-level-order-traversal/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import deque
from typing import Optional, List

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        
        result = []
        queue = deque([root])
        
        while queue:
            level_size = len(queue)

            # NOTES: Each level we declare here
            level_nodes = []
            
            for _ in range(level_size):
                node = queue.popleft()
                level_nodes.append(node.val)
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            result.append(level_nodes)
        
        return result

</code>
</pre>
</details>

## 7.14. Binary Tree Level Order Traversal II

Ref: [https://leetcode.com/problems/binary-tree-level-order-traversal-ii/description/](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrderBottom(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        
        result = []
        queue = deque([root])
        
        while queue:
            level_size = len(queue)

            # NOTES: Each level we declare here
            level_nodes = []
            
            for _ in range(level_size):
                node = queue.popleft()
                level_nodes.append(node.val)
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            result.append(level_nodes)
        
        return result[::-1]

</code>
</pre>
</details>

## 7.15. ZigZag Tree (Binary Tree Zigzag Level Order Traversal)

Ref: [https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        
        result = []
        queue = deque([root])
        left_to_right = True

        # When out the loop 
        while queue:
            level_size = len(queue)

            # NOTES: Each level we declare here
            level_nodes = []
            
            for _ in range(level_size):
                node = queue.popleft()
                if left_to_right:
                    level_nodes.append(node.val)
                else:
                    level_nodes = [node.val] + level_nodes
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            result.append(level_nodes)
            # NOTES: If we come to backtrack here => it change level
            left_to_right = not left_to_right
            
        return result

</code>
</pre>
</details>

## 7.16. Average of Levels in Binary Tree

Ref: [https://leetcode.com/problems/average-of-levels-in-binary-tree/description/](https://leetcode.com/problems/average-of-levels-in-binary-tree/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def averageOfLevels(self, root: Optional[TreeNode]) -> List[float]:
        if not root:
            return []
        
        result = []
        queue = deque([root])
        
        while queue:
            level_size = len(queue)

            # NOTES: Each level we declare here
            level_nodes = []
            
            for _ in range(level_size):
                node = queue.popleft()
                level_nodes.append(node.val)
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            result.append(float(sum(level_nodes) / len(level_nodes)))
        
        return result

</code>
</pre>
</details>

## 7.17. Maximum Level Sum of a Binary Tree

Ref: [https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/description/](https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxLevelSum(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        
        queue = deque([root])
        maxSum = float('-inf')
        maxLevelSum = 0
        
        currLevel = 0
        
        while queue:
            level_size = len(queue)

            # NOTES: Each level we declare here
            level_nodes = []
            
            for _ in range(level_size):
                node = queue.popleft()
                level_nodes.append(node.val)
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            currLevel += 1
            
            if sum(level_nodes) > maxSum:
                maxSum = sum(level_nodes)
                maxLevelSum = currLevel
        
        return maxLevelSum

</code>
</pre>
</details>

## 7.18. Minimum Depth of Binary Tree

Ref: [https://leetcode.com/problems/minimum-depth-of-binary-tree/description/](https://leetcode.com/problems/minimum-depth-of-binary-tree/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def minDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        
        result = []
        queue = deque([root])

        # NOTES: Each level we declare here
        currLevel = 1
        
        while queue:
            level_size = len(queue)
            
            for _ in range(level_size):
                node = queue.popleft()

                if not node.left and not node.right:
                    return currLevel
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            currLevel += 1
        
        return 1

</code>
</pre>
</details>

# 7.19. Maximum Depth of Binary Tree

Ref: [https://leetcode.com/problems/maximum-depth-of-binary-tree/description/](https://leetcode.com/problems/maximum-depth-of-binary-tree/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        self.max_height = 0

        # def dfs(node):
        #     if not node:
        #         return 0
        #     left = dfs(node.left)
        #     right = dfs(node.right)
        #     return 1 + max(left, right)

        def dfs(node, depth):
            if not node:
                return

            self.max_height = max(self.max_height, depth)
            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)

        dfs(root, 1)
        return self.max_height
        
</code>
</pre>
</details>

# 7.20. Populating Next Right Pointers in Each Node (Keep the prev node to find sibling)

Ref: [https://leetcode.com/problems/populating-next-right-pointers-in-each-node/description/](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import deque

class Solution:
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        if not root:
            return None

        queue = deque([root])

        while queue:
            size = len(queue)
            prev = None
            for i in range(size):
                node = queue.popleft()
                if prev:
                    prev.next = node
                prev = node

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            # Last node in the level points to None (implicitly already None)

        return root
        
</code>
</pre>
</details>

# 7.21. Right View of Binary Tree

Ref: [https://leetcode.com/problems/binary-tree-right-side-view/description/](https://leetcode.com/problems/binary-tree-right-side-view/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import deque
from typing import Optional, List

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []

        result = []
        queue = deque([root])

        while queue:
            level_size = len(queue)

            # level_nodes = []

            for i in range(level_size):
                node = queue.popleft()
                # Capture the rightmost element at this level
                if i == level_size - 1:
                    result.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            # result.append(level_nodes)

        return result
        
</code>
</pre>
</details>

# 7.22. Left View of Binary Tree

Ref: [https://www.geeksforgeeks.org/problems/left-view-of-binary-tree/1](https://www.geeksforgeeks.org/problems/left-view-of-binary-tree/1)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import deque
from typing import Optional, List

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    class Solution:
    def LeftView(self, root):
        if not root:
            return []

        result = []
        queue = deque([root])

        while queue:
            level_size = len(queue)
            for i in range(level_size):
                node = queue.popleft()
                # Capture the leftmost element at this level
                if i == 0:
                    result.append(node.data)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

        return result
        
</code>
</pre>
</details>

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def LeftView(self, root):
        result = []

        def dfs(node, depth):
            if not node:
                return
            if depth == len(result):  # First node seen at this depth
                result.append(node.data)
            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)

        dfs(root, 0)
        return result
        
</code>
</pre>
</details>

# 8. Pattern 8: BFS, DFS in Tree

# 9. Pattern 9: Two Heaps

# 10. Pattern 10: Subsets

# 11. Pattern 11: Modified Binary Search

# 12. Pattern 12: Bitwise XOR

# 13. Pattern 13: Top 'K' Elements

## 13.1. Top K Frequent Elements

Ref: [https://leetcode.com/problems/top-k-frequent-elements/description/](https://leetcode.com/problems/top-k-frequent-elements/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import Counter
import heapq
from typing import List

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        # Count frequencies using Counter
        count = Counter(nums)
         # Build a heap of the k most frequent elements
        heap = heapq.nlargest(k, count.items(), key=lambda x: x[1])
        return [item for item, freq in heap]

</code>
</pre>
</details>

## 13.2. Kth Largest Element in an Array (Pop Min => Min Heap Size K)

Ref: [https://leetcode.com/problems/kth-largest-element-in-an-array/description/](https://leetcode.com/problems/kth-largest-element-in-an-array/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
import heapq

class Solution:
    # IDEA: Min Heap to pop min
    def findKthLargest(self, nums: List[int], k: int) -> int:
        # Use a max-heap (invert distances)
        min_heap = []

        for num in nums:
            heapq.heappush(min_heap, num)

            if len(min_heap) > k:
                heapq.heappop(min_heap)

        return min_heap[0]

</code>
</pre>
</details>

## 13.3. K Closest Points to Origin (Pop Max => Max Heap Size K)

Ref: [https://leetcode.com/problems/k-closest-points-to-origin/description/](https://leetcode.com/problems/k-closest-points-to-origin/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
import heapq
import math
from typing import List

class Solution:
    def distance(self, point: List[int]) -> float:
        return point[0] ** 2 + point[1] ** 2  # skip sqrt for efficiency

    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        # Use a max-heap (invert distances)
        max_heap = []

        for point in points:
            dist = -self.distance(point)  # invert to simulate max-heap
            heapq.heappush(max_heap, (dist, point))

            if len(max_heap) > k:
                # IDEA: Python's heapq is a min-heap by default, meaning:
                # IDEA: It always keeps the smallest element at the top (heap[0]), here is dist
                heapq.heappop(max_heap)

        # Extract only the points from the heap
        return [point for _, point in max_heap]

</code>
</pre>
</details>

## 13.4. Connect Ropes

Ref: [https://leetcode.com/problems/minimum-cost-to-connect-sticks/description/](https://leetcode.com/problems/minimum-cost-to-connect-sticks/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
import heapq

def connect_ropes(ropes):
    heapq.heapify(ropes) # Convert list into a min-heap
    total_cost = 0

    while len(ropes) > 1:
        # Pop two smallest ropes
        first = heapq.heappop(ropes)
        second = heapq.heappop(ropes)

        cost = first + second
        total_cost += cost

        # Push the combined rope back into the heap
        heapq.heappush(ropes, cost)

    return total_cost

</code>
</pre>
</details>

## 13.5. Sort Characters By Frequency

Ref: [https://leetcode.com/problems/sort-characters-by-frequency/description/](https://leetcode.com/problems/sort-characters-by-frequency/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import Counter
import heapq
from typing import List

class Solution:
    def frequencySort(self, s: str) -> str:
         # Count frequencies using Counter
        count = Counter(s)
         # Build a heap of the k most frequent elements
        heap = heapq.nlargest(len(s), count.items(), key=lambda x: x[1])
        return ''.join([item * freq for item, freq in heap])

</code>
</pre>
</details>

## 13.6. Kth Largest Element in a Stream (Real-time idea)

Ref: [https://leetcode.com/problems/kth-largest-element-in-a-stream/description/](https://leetcode.com/problems/kth-largest-element-in-a-stream/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
import heapq

# IDEA: K largest use min heap
class KthLargest:

    def __init__(self, k: int, nums: List[int]):
        self.k = k
        self.min_heap = nums
        # Inplace
        heapq.heapify(self.min_heap)
        # Maintain only the k largest elements in the heap
        while len(self.min_heap) > k:
            heapq.heappop(self.min_heap)

    def add(self, val: int) -> int:
        # Push first
        heapq.heappush(self.min_heap, val)

        # If heap grows beyond k, remove the smallest
        if len(self.min_heap) > self.k:
            heapq.heappop(self.min_heap)

        # The root is the k-th largest
        return self.min_heap[0]
        

# Your KthLargest object will be instantiated and called as such:
# obj = KthLargest(k, nums)
# param_1 = obj.add(val)

</code>
</pre>
</details>

## 13.7. 'K' Closest Numbers

Ref: [https://leetcode.com/problems/find-k-closest-elements/description/](https://leetcode.com/problems/find-k-closest-elements/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
import heapq

class Solution:
    # Max Heap
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        # Use a max-heap (invert distances)
        max_heap = []

        for num in arr:
            dist = -abs(num - x) # invert to simulate max-heap
            heapq.heappush(max_heap, (dist, -num))

            # Because it push larger, remove the smaller first => reverse to remove the larger first, push smaller later
            if len(max_heap) > k:
                # IDEA: Python's heapq is a min-heap by default, meaning:
                # IDEA: It always keeps the smallest element at the top (heap[0]), here is dist
                heapq.heappop(max_heap)

        # Extract only the arr from the heap
        result = [-num for _, num in max_heap]
        # Why -num? 
        # This ensures that when two numbers have the same distance from x, the smaller number is preferred — as required by the problem.
        result.sort()
        return result

</code>
</pre>
</details>

## 13.8. Least Number of Unique Integers after K Removals

Ref: [https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/description/](https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def findLeastNumOfUniqueInts(self, arr: List[int], k: int) -> int:
        # Step 1: Count the frequency of each number
        count = Counter(arr)

        # Step 2: Sort the frequencies from smallest to largest
        freq_list = sorted(count.values())  # we only care about the frequencies

        # Step 3: Remove the least frequent elements first, reducing k
        unique_count = len(freq_list)
        for freq in freq_list:
            if k >= freq:
                k -= freq
                unique_count -= 1  # one unique number is fully removed
            else:
                break  # can't remove this whole group, stop here

        return unique_count

</code>
</pre>
</details>

## 13.9. Reorganize String

Ref: [https://leetcode.com/problems/reorganize-string/description/](https://leetcode.com/problems/reorganize-string/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
import heapq
from collections import Counter

class Solution:
    # To avoid having the same characters next to each other, you want to spread out the most frequent characters as evenly as possible.
    def reorganizeString(self, s: str) -> str:
        # Step 1: Count the frequency of each character
        count = Counter(s)

        if any(freq > (len(s) + 1) // 2 for freq in count.values()):
            return ""

        max_heap = [(-freq, char) for char, freq in count.items()]
        heapq.heapify(max_heap)

        prev_freq, prev_char = 0, ''
        result = []

        while max_heap:
            freq, char = heapq.heappop(max_heap)
            result.append(char)

            # If the previous character can still be used, push it back
            if prev_freq < 0:
                heapq.heappush(max_heap, (prev_freq, prev_char))

            # Update previous character to the current one
            prev_freq, prev_char = freq + 1, char  # since freq is negative

        reorganized = ''.join(result)

        # Final check: if the result is valid
        for i in range(1, len(reorganized)):
            if reorganized[i] == reorganized[i - 1]:
                return ""
        
        return reorganized

</code>
</pre>
</details>

## 13.10. Task Scheduler

Ref: [https://leetcode.com/problems/task-scheduler/description/](https://leetcode.com/problems/task-scheduler/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import Counter, deque

class Solution:
    def leastInterval(self, tasks, n):
        time = 0
        task_counts = Counter(tasks)
        cooldown = {}  # task -> next available time

        while task_counts:
            available = [task for task in task_counts if cooldown.get(task, 0) <= time]

            if available:
                # Choose task with highest remaining count
                task = max(available, key=lambda x: task_counts[x])
                task_counts[task] -= 1
                if task_counts[task] == 0:
                    del task_counts[task]
                cooldown[task] = time + n + 1

            time += 1

        return time


</code>
</pre>
</details>

## 13.11. Maximum Frequency Stack

Ref: [https://leetcode.com/problems/maximum-frequency-stack/description/](https://leetcode.com/problems/maximum-frequency-stack/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import Counter, deque

class Solution:
    def leastInterval(self, tasks, n):
        time = 0
        task_counts = Counter(tasks)
        cooldown = {}  # task -> next available time

        while task_counts:
            available = [task for task in task_counts if cooldown.get(task, 0) <= time]

            if available:
                # Choose task with highest remaining count
                task = max(available, key=lambda x: task_counts[x])
                task_counts[task] -= 1
                if task_counts[task] == 0:
                    del task_counts[task]
                cooldown[task] = time + n + 1

            time += 1

        return time


</code>
</pre>
</details>

## 13.12. Maximum Frequency Stack

Ref: [https://leetcode.com/problems/maximum-frequency-stack/description/](https://leetcode.com/problems/maximum-frequency-stack/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import defaultdict

class FreqStack:

    def __init__(self):
        self.freq = defaultdict(int)          # val -> freq
        self.group = defaultdict(list)        # freq -> list (stack of values)
        self.max_freq = 0

    def push(self, val: int) -> None:
        f = self.freq[val] + 1
        self.freq[val] = f
        self.group[f].append(val)

        if f > self.max_freq:
            self.max_freq = f

    def pop(self) -> int:
        val = self.group[self.max_freq].pop()
        self.freq[val] -= 1

        if not self.group[self.max_freq]:
            self.max_freq -= 1

        return val

</code>
</pre>
</details>

## 13.13. Top K Frequent Words

Ref: [https://leetcode.com/problems/top-k-frequent-words/description/](https://leetcode.com/problems/top-k-frequent-words/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def topKFrequent(self, words: List[str], k: int) -> List[str]:
        # Count frequencies using Counter
        count = Counter(words)
        # Build a heap of the k most frequent elements, and by lexicalgraphical order
        # -x[1] ensures higher frequency comes first.
        # x[0] ensures lexicographical order among words with the same frequency.
        heap = heapq.nsmallest(k, count.items(), key=lambda x: (-x[1], x[0]))
        return [item for item, freq in heap]
</code>
</pre>
</details>

---

**Add new element to the pq if future calculation will depend on the current calculated value**

## 13.14. Maximum Average Pass Ratio (Sample Calculation for Max Heap)

Ref: [https://leetcode.com/problems/maximum-average-pass-ratio/description/](https://leetcode.com/problems/maximum-average-pass-ratio/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def maxAverageRatio(self, classes: List[List[int]], extraStudents: int) -> float:
        def gain(p: int, t: int) -> float:
            return (p + 1) / (t + 1) - p / t

        heap = []
        for p, t in classes:
            heapq.heappush(heap, (-gain(p, t), p, t))

        for _ in range(extraStudents):
            g, p, t = heapq.heappop(heap)
            p += 1
            t += 1
            heapq.heappush(heap, (-gain(p, t), p, t))

        return sum(p / t for _, p, t in heap) / len(classes)
        
</code>
</pre>
</details>

## 13.15. Maximum Ice Cream Bars

Ref: [https://leetcode.com/problems/maximum-ice-cream-bars/description/](https://leetcode.com/problems/maximum-ice-cream-bars/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def maxIceCream(self, costs: List[int], coins: int) -> int:
        costs.sort()
        count = 0

        for price in costs:
            if coins < price:
                break
            coins -= price
            count += 1

        return count
        
</code>
</pre>
</details>

## 13.16. Minimum Interval to Include Each Query

Ref: [https://leetcode.com/problems/minimum-interval-to-include-each-query/description/](https://leetcode.com/problems/minimum-interval-to-include-each-query/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List
import heapq

class Solution:
    def minInterval(self, intervals: List[List[int]], queries: List[int]) -> List[int]:
        intervals.sort()
        sorted_queries = sorted((q, i) for i, q in enumerate(queries))
        result = [-1] * len(queries)
        min_heap = []
        i = 0  # Pointer for intervals

        for query, idx in sorted_queries:
            # Add all intervals starting before or at the query
            while i < len(intervals) and intervals[i][0] <= query:
                start, end = intervals[i]
                if end >= query:
                    heapq.heappush(min_heap, (end - start + 1, end))
                i += 1
            
            # Remove intervals from heap that don't cover the query
            while min_heap and min_heap[0][1] < query:
                heapq.heappop(min_heap)

            if min_heap:
                result[idx] = min_heap[0][0]

        return result
        
</code>
</pre>
</details>

## 13.17. Equal Sum Arrays With Minimum Number of Operations (Two Heap, Min Heap and Max Heap)

Ref: [https://leetcode.com/problems/equal-sum-arrays-with-minimum-number-of-operations/description/](https://leetcode.com/problems/equal-sum-arrays-with-minimum-number-of-operations/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List
import heapq

class Solution:
    def minOperations(self, nums1: List[int], nums2: List[int]) -> int:
        if len(nums1) * 6 < len(nums2) or len(nums2) * 6 < len(nums1):
            return -1  # impossible to match sums

        sum1, sum2 = sum(nums1), sum(nums2)

        if sum1 == sum2:
            return 0

        # Ensure sum1 is smaller
        if sum1 > sum2:
            nums1, nums2 = nums2, nums1
            sum1, sum2 = sum2, sum1

        # Gains for increasing nums1 (values: 6 - num)
        min_heap = [6 - num for num in nums1 if 6 - num > 0]
        # Gains for decreasing nums2 (values: num - 1)
        max_heap = [num - 1 for num in nums2 if num - 1 > 0]

        # Use max-heaps: invert signs
        min_heap = [-x for x in min_heap]
        max_heap = [-x for x in max_heap]
        heapq.heapify(min_heap)
        heapq.heapify(max_heap)

        diff = sum2 - sum1
        ops = 0

        while diff > 0:
            gain1 = -min_heap[0] if min_heap else 0
            gain2 = -max_heap[0] if max_heap else 0

            if gain1 == 0 and gain2 == 0:
                return -1  # No possible gains left

            if gain1 >= gain2:
                diff -= gain1
                heapq.heappop(min_heap)
            else:
                diff -= gain2
                heapq.heappop(max_heap)

            ops += 1

        return ops
        
</code>
</pre>
</details>

# 14. Pattern 14: K-way merge

# 15. Pattern 15: 0/1 Knapsack (Dynamic Programming)

# 16. Pattern 16: Topological Sort

# 17. Pattern 17: Stacks

## 17.1. Next Greater Element I

Ref: [https://leetcode.com/problems/next-greater-element-i/description/](https://leetcode.com/problems/next-greater-element-i/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
        n = len(nums2)
        result = [0] * n
        stack = []

        for i in range(n - 1, -1, -1):
            while stack and stack[-1] <= nums2[i]:
                stack.pop()
            
            if stack:
                result[i] = stack[-1]
            else:
                result[i] = -1

            stack.append(nums2[i])

        hashMapGreater = {}

        for i in range(len(nums2)):
            hashMapGreater[nums2[i]] = result[i]

        return [hashMapGreater[num] for num in nums1]
        
</code>
</pre>
</details>

## 17.2. Next Greater Element II

Ref: [https://leetcode.com/problems/next-greater-element-ii/](https://leetcode.com/problems/next-greater-element-ii/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def nextGreaterElements(self, nums: List[int]) -> List[int]:
        nums2 = nums + nums

        n = len(nums2)
        result = [0] * n
        stack = []

        for i in range(n - 1, -1, -1):
            while stack and stack[-1] <= nums2[i]:
                stack.pop()
            
            if stack:
                result[i] = stack[-1]
            else:
                result[i] = -1

            stack.append(nums2[i])

        return result[:len(nums)]

</code>
</pre>
</details>

## 17.3. Next Greater Array

<details>
<summary>Code</summary>

<pre>
<code class="python">
def next_greater_elements(arr):
    n = len(arr)
    result = [None] * n
    stack = []

    for i in range(n - 1, -1, -1):
        # Pop elements from the stack that are less than or equal to current element
        while stack and stack[-1] <= arr[i]:
            stack.pop()
        
        # If stack is not empty, top is the next greater element
        if stack:
            result[i] = stack[-1]
        else:
            result[i] = None  # Or use -1 if preferred

        # Push current element onto stack
        stack.append(arr[i])

    return result

# Test input
arr = [13, 8, 1, 5, 2, 5, 9, 7, 6, 12]

# [None, 9, 5, 9, 5, 9, 12, 12, 12, None]
print(next_greater_elements(arr))

</code>
</pre>
</details>

## 17.4. Previous Greater Array

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def previousGreaterElements(self, nums: List[int]) -> List[int]:
        res = []
        stack = []  # This will store elements in decreasing order

        for num in nums:
            while stack and stack[-1] <= num:
                stack.pop()
            if stack:
                res.append(stack[-1])
            else:
                res.append(-1)
            stack.append(num)
        
        return res

</code>
</pre>
</details>

## 17.5. Next Smaller Element

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

def next_smaller_elements(arr: List[int]) -> List[int]:
    result = [-1] * len(arr)
    stack = []

    for i in range(len(arr) - 1, -1, -1):
        while stack and stack[-1] >= arr[i]:
            stack.pop()
        
        if stack:
            result[i] = stack[-1]
        
        stack.append(arr[i])

    return result

# Example
arr = [13, 8, 1, 5, 2, 5, 9, 7, 6, 12]
print(next_smaller_elements(arr))


</code>
</pre>
</details>

## 17.6. Previous Smaller Element

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

def previous_smaller_elements(arr: List[int]) -> List[int]:
    result = [-1] * len(arr)
    stack = []

    for i in range(len(arr)):
        while stack and stack[-1] >= arr[i]:
            stack.pop()
        
        if stack:
            result[i] = stack[-1]
        
        stack.append(arr[i])

    return result

# Example
arr = [13, 8, 1, 5, 2, 5, 9, 7, 6, 12]
print(previous_smaller_elements(arr))

</code>
</pre>
</details>

## 17.7. Daily Temperatures

Ref: [https://leetcode.com/problems/daily-temperatures/description/](https://leetcode.com/problems/daily-temperatures/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        result = [0] * n
        stack = []

        for i in range(n - 1, -1, -1):
            while stack and temperatures[stack[-1]] <= temperatures[i]:
                stack.pop()
            
            if stack:
                result[i] = stack[-1] - i
            else:
                result[i] = 0

            stack.append(i)

        return result
            
</code>
</pre>
</details>

## 17.8. Largest Rectangle in Histogram

Ref: [https://leetcode.com/problems/largest-rectangle-in-histogram/description/](https://leetcode.com/problems/largest-rectangle-in-histogram/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        n = len(heights)
        prev_smaller = [-1] * n
        next_smaller = [n] * n

        # Compute Previous Smaller Element (PSE)
        stack = []
        for i in range(n):
            while stack and heights[stack[-1]] >= heights[i]:
                stack.pop()
            if stack:
                prev_smaller[i] = stack[-1]
            stack.append(i)

        # Compute Next Smaller Element (NSE)
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and heights[stack[-1]] >= heights[i]:
                stack.pop()
            if stack:
                next_smaller[i] = stack[-1]
            stack.append(i)

        # Compute max area
        max_area = 0
        for i in range(n):
            height = heights[i]
            width = next_smaller[i] - prev_smaller[i] - 1
            area = height * width
            max_area = max(max_area, area)

        return max_area

            
</code>
</pre>
</details>

## 17.9. Online Stock Span

Ref: [https://leetcode.com/problems/online-stock-span/description/](https://leetcode.com/problems/online-stock-span/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class StockSpanner:

    def __init__(self):
        self.prices = []       # Stores all prices seen so far

    def next(self, price: int) -> int:
        self.prices.append(price)

        res = []
        stack = []  # This will store elements in decreasing order

        for i in range(len(self.prices)):
            while stack and self.prices[stack[-1]] <= self.prices[i]:
                stack.pop()
            if stack:
                res.append(stack[-1])
            else:
                res.append(-1)
            stack.append(i)

        # Get the previous greater index for the latest price
        prev_greater_index = res[-1]
        current_index = len(self.prices) - 1

        if prev_greater_index == -1:
            span = current_index + 1
        else:
            span = current_index - prev_greater_index

        return span

# Your StockSpanner object will be instantiated and called as such:
# obj = StockSpanner()
# param_1 = obj.next(price)
</code>
</pre>
</details>

## 17.20. 132 Pattern

Ref: [https://leetcode.com/problems/132-pattern/description/](https://leetcode.com/problems/132-pattern/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def find132pattern(self, nums: List[int]) -> bool:
        stack = []  # This will store potential "2"s (nums[k]) in decreasing order
        third = float('-inf')  # This keeps track of the "2" in the 132 pattern

        # Traverse from right to left
        # Next greater element
        # Next
        for num in reversed(nums):
            if num < third:
                # Found a 132 pattern
                return True
            # Greater
            while stack and stack[-1] < num:
                # Pop all smaller elements and update the "2" (third)
                third = stack.pop()
            stack.append(num)

        return False

</code>
</pre>
</details>

## 17.21. Trapping Rain Water

Ref: [https://leetcode.com/problems/trapping-rain-water/description/](https://leetcode.com/problems/trapping-rain-water/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def trap(self, height: List[int]) -> int:
        stack = []
        water = 0

        for i in range(len(height)):
            while stack and height[stack[-1]] <= height[i]:
                top = stack.pop()

                if not stack:
                    break  # No left boundary to trap water

                # Distance (width) between the left and right boundaries
                distance = i - stack[-1] - 1

                # Height of water above the current bar
                # Area of 2 rectangle - Area of bottom valley
                bounded_height = min(height[stack[-1]], height[i]) - height[top]

                # Add trapped water
                water += distance * bounded_height

            stack.append(i)

        return water

</code>
</pre>
</details>

## 17.28. Number of Visible People in a Queue (Remove the height when needed)

Ref: [https://leetcode.com/problems/number-of-visible-people-in-a-queue/description/](https://leetcode.com/problems/number-of-visible-people-in-a-queue/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def canSeePersonsCount(self, heights: List[int]) -> List[int]:
        n = len(heights)
        res = [0] * n
        stack = []

        # Next greater element
        for i in range(n - 1, -1, -1):
            count = 0
            while stack and stack[-1] < heights[i]:
                stack.pop()
                count += 1
            if stack:
                count += 1
            res[i] = count
            stack.append(heights[i])
        
        return res

</code>
</pre>
</details>

# 18. Pattern 18: Monotonic Stack

# 19. Pattern 19: Graphs

## 19.1. Network Delay Time (Dijkstra Algorithm)

Ref: [https://leetcode.com/problems/network-delay-time/description/](https://leetcode.com/problems/network-delay-time/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
import heapq
from collections import defaultdict

class Solution:

    def networkDelayTime(self, times, n, k):
        # Build adjacency list
        graph = defaultdict(list)
        for u, v, w in times:
            graph[u].append((v, w))

        # Dijkstra Min-heap to track the shortest path: (current_cost, current_node)
        heap = [(0, k)]
        visited = {}

        while heap:
            time, node = heapq.heappop(heap)

            # Skip if already visited
            if node in visited:
                continue

            visited[node] = time

            for neighbor, weight in graph[node]:
                if neighbor not in visited:
                    heapq.heappush(heap, (time + weight, neighbor))

        # k = 2, value: {2: 0, 1: 1, 3: 1, 4: 2}
        print(visited)

        # If all nodes are visited, return the max time; else, -1
        return max(visited.values()) if len(visited) == n else -1

</code>
</pre>
</details>

## 19.2. Paths in Maze That Lead to Same Room (Find All Paths)

Ref: [https://leetcode.com/problems/paths-in-maze-that-lead-to-same-room/description/](https://leetcode.com/problems/paths-in-maze-that-lead-to-same-room/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import defaultdict

class Solution:
    def find_all_paths(self, graph, start):
        stack = [(start, [start])]
        room_paths = defaultdict(list)

        while stack:
            node, path = stack.pop()
            room_paths[node].append(path)

            for neighbor in graph.get(node, []):
                if neighbor not in path:  # avoid cycles
                    stack.append((neighbor, path + [neighbor]))
        
        # {'A': [['A']], 'C': [['A', 'C']], 'D': [['A', 'C', 'D'], ['A', 'B', 'D']], 'B': [['A', 'B']]}
        print(room_paths)

        # Filter rooms that have more than one path
        multiple_path_rooms = {
            room: paths for room, paths in room_paths.items()
            if len(paths) > 1
        }

        return multiple_path_rooms

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
}

result = find_all_paths(graph, 'A')
for room, paths in result.items():
    print(f"Room {room} has {len(paths)} paths:")
    for p in paths:
        print("  -> " + " -> ".join(p))


</code>
</pre>
</details>

## 19.3. Clone Graph (DFS)

Ref: [https://leetcode.com/problems/clone-graph/description/](https://leetcode.com/problems/clone-graph/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
"""
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""

from typing import Optional
class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        if not node:
            return None

        visited = {}  # Dictionary to store cloned nodes

        def dfs(current: 'Node') -> 'Node':
            if current in visited:
                return visited[current]

            # Clone the current node
            copy = Node(current.val)
            visited[current] = copy  # Mark as visited (cloned)

            # Visit all neighbors
            for neighbor in current.neighbors:
                copy.neighbors.append(dfs(neighbor))  # Recursively clone neighbors

            return copy

        return dfs(node)


</code>
</pre>
</details>

---

**Union Find**

## 19.4. Number of Provinces (DFS Island, Union Find)

Ref: [https://leetcode.com/problems/number-of-provinces/description/](https://leetcode.com/problems/number-of-provinces/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        def dfs(city: int):
            visited[city] = True
            for neighbor in range(len(isConnected)):
                # Explore the graph when needed
                if isConnected[city][neighbor] == 1 and not visited[neighbor]:
                    dfs(neighbor)

        n = len(isConnected)
        visited = [False] * n
        provinces = 0
        for i in range(n):
            if not visited[i]:
                dfs(i)
                provinces += 1
        
        return provinces
        
from typing import List

class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        parent = list(range(n))  # Initially, each node is its own parent

        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])  # Path compression
            return parent[x]

        def union(x, y):
            rootX = find(x)
            rootY = find(y)
            if rootX != rootY:
                parent[rootX] = rootY  # Union

        # Iterate through the upper triangle of the matrix to avoid duplicates
        for i in range(n):
            for j in range(i + 1, n):
                if isConnected[i][j] == 1:
                    union(i, j)

        # Count unique roots
        return len({find(i) for i in range(n)})


</code>
</pre>
</details>

## 19.5. Redundant Connection (Union Find)

Ref: [https://leetcode.com/problems/redundant-connection/description/](https://leetcode.com/problems/redundant-connection/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        parent = [i for i in range(len(edges) + 1)]

        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])  # Path compression
            return parent[x]

        def union(x, y):
            rootX = find(x)
            rootY = find(y)
            if rootX == rootY:
                return False  # Cycle detected
            parent[rootY] = rootX
            return True

        for u, v in edges:
            if not union(u, v):
                return [u, v]

</code>
</pre>
</details>

## 19.6. Most Stones Removed with Same Row or Column (Union Find)

Ref: [https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/description/](https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def removeStones(self, stones):
        parent = {}

        def find(x):
            if x not in parent:
                parent[x] = x  # Initialize parent if x is new

            if parent[x] != x:
                parent[x] = find(parent[x])  # Path compression

            return parent[x]

        def union(x, y):
            parent[find(x)] = find(y)

        for x, y in stones:
            row = f"r{x}"
            col = f"c{y}"
            union(row, col)

        # {'c0': 'c1', 'r0': 'c0', 'c1': 'c2', 'r1': 'c1', 'c2': 'c2', 'r2': 'c2'}
        print(parent)
        unique_groups = {find(x) for x in parent}

        # {'c2'}
        # For every node in parent, we find its ultimate root using find(x. Then collect all unique roots
        print(unique_groups)
        return len(stones) - len(unique_groups)

</code>
</pre>
</details>

## 19.7. Number of Operations to Make Network Connected (Union Find)

Ref: [https://leetcode.com/problems/number-of-operations-to-make-network-connected/description/](https://leetcode.com/problems/number-of-operations-to-make-network-connected/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def makeConnected(self, n: int, connections: List[List[int]]) -> int:
        if len(connections) < n - 1:
            return -1  # Not enough cables
        
        parent = [i for i in range(n)]
        
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        
        def union(x, y):
            rootX = find(x)
            rootY = find(y)
            if rootX != rootY:
                parent[rootX] = rootY
        
        for a, b in connections:
            union(a, b)
        
        # Count number of connected components
        components = len(set(find(i) for i in range(n)))
        return components - 1

</code>
</pre>
</details>

## 19.8. Satisfiability of Equality Equations

Ref: [https://leetcode.com/problems/satisfiability-of-equality-equations/description/](https://leetcode.com/problems/satisfiability-of-equality-equations/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def equationsPossible(self, equations: List[str]) -> bool:
        parent = [i for i in range(26)]  # one for each lowercase letter
        
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        
        def union(x, y):
            parent[find(x)] = find(y)
        
        # First, process all '==' equations
        for eq in equations:
            if eq[1:3] == '==':
                x = ord(eq[0]) - ord('a')
                y = ord(eq[3]) - ord('a')
                union(x, y)
        
        # Then, process all '!=' equations
        for eq in equations:
            if eq[1:3] == '!=':
                x = ord(eq[0]) - ord('a')
                y = ord(eq[3]) - ord('a')
                if find(x) == find(y):
                    return False
        
        return True

</code>
</pre>
</details>

## 19.9. Accounts Merge

Ref: [https://leetcode.com/problems/accounts-merge/description/](https://leetcode.com/problems/accounts-merge/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List
from collections import defaultdict

class Solution:
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        parent = {}
        
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        
        def union(x, y):
            parent.setdefault(x, x)
            parent.setdefault(y, y)
            parent[find(x)] = find(y)
        
        email_to_name = {}

        # Union all emails under the same person
        for account in accounts:
            name = account[0]
            first_email = account[1]
            for email in account[1:]:
                email_to_name[email] = name
                union(first_email, email)

        # Merge emails by their root parent
        merged = defaultdict(list)
        for email in parent:
            root = find(email)
            merged[root].append(email)

        # Build final result
        result = []
        for root, emails in merged.items():
            # Because all email have the same root
            name = email_to_name[root]
            result.append([name] + sorted(emails))

        return result

</code>
</pre>
</details>

---

**DFS**

## 19.10. Surrounded Regions

Ref: [https://leetcode.com/problems/surrounded-regions/](https://leetcode.com/problems/surrounded-regions/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def solve(self, board):
        if not board or not board[0]:
            return

        rows, cols = len(board), len(board[0])

        def dfs(r, c):
            if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != 'O':
                return
            board[r][c] = '#'  # temporary mark
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        # Step 1: Mark border-connected 'O's
        for i in range(rows):
            dfs(i, 0)
            dfs(i, cols - 1)
        for j in range(cols):
            dfs(0, j)
            dfs(rows - 1, j)

        # Step 2: Flip internal 'O' to 'X', and '#' back to 'O'
        for i in range(rows):
            for j in range(cols):
                if board[i][j] == 'O':
                    board[i][j] = 'X'
                elif board[i][j] == '#':
                    board[i][j] = 'O'

</code>
</pre>
</details>

## 19.11. Number of Enclaves

Ref: [https://leetcode.com/problems/number-of-enclaves/description/](https://leetcode.com/problems/number-of-enclaves/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def numEnclaves(self, grid: List[List[int]]) -> int:
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])

        def dfs(r, c):
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != 1:
                return
            grid[r][c] = 2  # temporary mark
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        # Step 1: Mark border-connected 'O's
        for i in range(rows):
            dfs(i, 0)
            dfs(i, cols - 1)
        for j in range(cols):
            dfs(0, j)
            dfs(rows - 1, j)

        count = 0
        # Step 2: Flip internal 'O' to 'X', and '#' back to 'O'
        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == 1:
                    count += 1

        return count

</code>
</pre>
</details>

---

**Time taken to reach all nodes or share information to all graph nodes**

## 19.12. Time Needed to Inform All Employees

Ref: [https://leetcode.com/problems/time-needed-to-inform-all-employees/description/](https://leetcode.com/problems/time-needed-to-inform-all-employees/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    # Employee:   0  1  2  3  4  5  6
    # Manager:   -1  0  0  1  1  2  2
    #      0
    #    /   \
    #   1     2
    #. / \   / \
    # 3  4  5   6

    def numOfMinutes(self, n: int, headID: int, manager: List[int], informTime: List[int]) -> int:
        tree = defaultdict(list)
        for emp, mgr in enumerate(manager):
            if mgr != -1:
                tree[mgr].append(emp)

        def dfs(emp_id):
            max_time = 0
            for subordinate in tree[emp_id]:
                max_time = max(max_time, dfs(subordinate))
            return informTime[emp_id] + max_time

        return dfs(headID)
            

</code>
</pre>
</details>

## 19.13. Number of Closed Islands

Ref: [http://leetcode.com/problems/number-of-closed-islands/description/](http://leetcode.com/problems/number-of-closed-islands/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def closedIsland(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
    
        def dfs(r, c):
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == 1:
                return
            grid[r][c] = 1  # mark as visited
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                dfs(r + dr, c + dc)

        # Step 1: Remove lands connected to borders
        # Reason: Change all 0 in the border to 1
        for i in range(rows):
            dfs(i, 0)
            dfs(i, cols - 1)
        for j in range(cols):
            dfs(0, j)
            dfs(rows - 1, j)

        # Step 2: Count closed islands
        count = 0
        for i in range(1, rows - 1):
            for j in range(1, cols - 1):
                # It must be an isolation and count += 1
                if grid[i][j] == 0:
                    dfs(i, j)
                    count += 1

        return count            

</code>
</pre>
</details>

## 19.14. Number of Islands

Ref: [https://leetcode.com/problems/number-of-islands/description/](https://leetcode.com/problems/number-of-islands/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0
        
        rows, cols = len(grid), len(grid[0])

        # Flip 1 to 0
        def dfs(r, c):
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
                return
            grid[r][c] = '0'  # mark as visited
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                dfs(r + dr, c + dc)

        # Find 1 and flip to 0
        count = 0
        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == '1':
                    dfs(i, j)
                    count += 1

        return count        

</code>
</pre>
</details>

## 19.15. Keys and Rooms

Ref: [https://leetcode.com/problems/keys-and-rooms/description/](https://leetcode.com/problems/keys-and-rooms/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:
        visited = set()
        
        def dfs(room: int):
            if room in visited:
                return
            visited.add(room)
            for key in rooms[room]:
                dfs(key)
        
        dfs(0)  # Start from room 0
        return len(visited) == len(rooms)

</code>
</pre>
</details>

## 19.16. Max Area of Island

Ref: [https://leetcode.com/problems/max-area-of-island/description/](https://leetcode.com/problems/max-area-of-island/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        if not grid:
            return 0
        
        rows, cols = len(grid), len(grid[0])
        maxArea = 0

        # Flip 1 to 0
        def dfs(r, c):
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == 0:
                return 0
            grid[r][c] = 0  # mark as visited

            # When first DFS, count it
            area = 1
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                area += dfs(r + dr, c + dc)
            
            # Area each time count DFS
            return area


        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == 1:
                    maxArea = max(maxArea, dfs(i, j))

        return maxArea


</code>
</pre>
</details>

## 19.17. Flood Fill

Ref: [https://leetcode.com/problems/flood-fill/description/](https://leetcode.com/problems/flood-fill/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        rows, cols = len(image), len(image[0])
        original_color = image[sr][sc]

        if original_color == color:
            return image  # no need to fill if color is same
    
        # Change color to original_color, similar idea flip 1 to 0 and count
        def dfs(r, c):
            if r < 0 or r >= rows or c < 0 or c >= cols or image[r][c] != original_color:
                return
            image[r][c] = color # mark as visited
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                dfs(r + dr, c + dc)

        # Step 2: DFS here
        dfs(sr, sc)

        return image

</code>
</pre>
</details>

---

**Graph Cycle**

## 19.18. Find Eventual Safe States (Cycle)

Ref: [https://leetcode.com/problems/find-eventual-safe-states/description/](https://leetcode.com/problems/find-eventual-safe-states/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:
        # Still run 0 -> n
        n = len(graph)
        state = [0] * n

        def dfs(node):
            if state[node] != 0:
                return state[node] == 2  # safe if previously marked safe

            state[node] = 1  # mark as visiting
            for neighbor in graph[node]:
                if not dfs(neighbor):  # if any neighbor is unsafe
                    return False
            state[node] = 2  # mark as safe
            return True

        return [i for i in range(n) if dfs(i)]

</code>
</pre>
</details>

## 19.19. Coloring A Border (Edge Case, color the frame only in border)

Ref: [https://leetcode.com/problems/coloring-a-border/description/](https://leetcode.com/problems/coloring-a-border/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def colorBorder(self, grid: List[List[int]], row: int, col: int, color: int) -> List[List[int]]:
        rows, cols = len(grid), len(grid[0])
        original_color = grid[row][col]
        visited = [[False] * cols for _ in range(rows)]
        borders = []

        def dfs(r, c):
            visited[r][c] = True
            is_border = False
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                nr, nc = r + dr, c + dc
                # Logic check border, and we only want to color original_color
                if nr < 0 or nr >= rows or nc < 0 or nc >= cols or grid[nr][nc] != original_color:
                    is_border = True
                elif not visited[nr][nc]:
                    dfs(nr, nc)
            if is_border:
                borders.append((r, c))

        dfs(row, col)

        for r, c in borders:
            grid[r][c] = color

        return grid

</code>
</pre>
</details>

## 19.20. Find the Town Judge

Ref: [https://leetcode.com/problems/find-the-town-judge/description/](https://leetcode.com/problems/find-the-town-judge/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List
from collections import defaultdict

class Solution:
    def findJudge(self, n: int, trust: List[List[int]]) -> int:
        graph = defaultdict(list)
        out_degree = [0] * (n + 1)
        in_degree = [0] * (n + 1)

        for a, b in trust:
            graph[a].append(b)
            out_degree[a] += 1
            in_degree[b] += 1

        # def dfs(person, visited):
        #     visited.add(person)
        #     for neighbor in graph[person]:
        #         if neighbor not in visited:
        #             dfs(neighbor, visited)

        for i in range(1, n + 1):
            if out_degree[i] == 0 and in_degree[i] == n - 1:
                return i

        return -1

</code>
</pre>
</details>

## 19.21. Employee Importance

Ref: [https://leetcode.com/problems/employee-importance/description/](https://leetcode.com/problems/employee-importance/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
"""
# Definition for Employee.
class Employee:
    def __init__(self, id: int, importance: int, subordinates: List[int]):
        self.id = id
        self.importance = importance
        self.subordinates = subordinates
"""

class Solution:
    def getImportance(self, employees: List['Employee'], id: int) -> int:
        # Create a mapping from id to employee object for quick lookup
        emp_map = {employee.id: employee for employee in employees}
        
        def dfs(emp_id: int) -> int:
            employee = emp_map[emp_id]
            total_importance = employee.importance
            for sub_id in employee.subordinates:
                total_importance += dfs(sub_id)
            return total_importance
        
        return dfs(id)

</code>
</pre>
</details>

---

**BFS - Shortest Path**

## 19.22. 01 Matrix

Ref: [https://leetcode.com/problems/01-matrix/description/](https://leetcode.com/problems/01-matrix/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def updateMatrix(self, mat: List[List[int]]) -> List[List[int]]:
        rows, cols = len(mat), len(mat[0])
        q = deque()

        # Initialize
        for r in range(rows):
            for c in range(cols):
                if mat[r][c] == 0:
                    q.append((r, c))
                else:
                    mat[r][c] = float('inf')

        # BFS
        while q:
            r, c = q.popleft()
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols:
                    # Update the shortest distance from r,c to nr,nc
                    if mat[nr][nc] > mat[r][c] + 1:
                        mat[nr][nc] = mat[r][c] + 1
                        q.append((nr, nc))
        
        return mat

</code>
</pre>
</details>

## 19.22. As Far from Land as Possible (Largest Distance from A to B)

Ref: [https://leetcode.com/problems/as-far-from-land-as-possible/](https://leetcode.com/problems/as-far-from-land-as-possible/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import deque
from typing import List

class Solution:
    # After BFS ends, distance holds the maximum distance a water cell is from the nearest land.
    def maxDistance(self, grid: List[List[int]]) -> int:
        n = len(grid)
        q = deque()

        # Step 1: Add all land cells to the queue
        for i in range(n):
            for j in range(n):
                if grid[i][j] == 1:
                    q.append((i, j))

        # If there is no land or no water, return -1
        if not q or len(q) == n * n:
            return -1

        # Step 2: BFS from all land cells simultaneously
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        distance = -1


        # IDEA: Start from land to the deepest water
        while q:
            distance += 1
            for _ in range(len(q)):
                x, y = q.popleft()
                for dx, dy in directions:
                    nx, ny = x + dx, y + dy
                    # If it's a water cell, mark it visited and add to queue
                    if 0 <= nx < n and 0 <= ny < n and grid[nx][ny] == 0:
                        grid[nx][ny] = 2  # Mark as visited
                        q.append((nx, ny))

        return distance

</code>
</pre>
</details>

## 19.33. Rotting Oranges (BFS Classic)

Ref: [https://leetcode.com/problems/rotting-oranges/description/](https://leetcode.com/problems/rotting-oranges/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import deque
from typing import List

class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        queue = deque()
        fresh_oranges = 0

        # Step 1: Add all rotten oranges to the queue and count fresh ones
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 2:
                    queue.append((r, c, 0))  # (row, col, minutes)
                elif grid[r][c] == 1:
                    fresh_oranges += 1

        # Step 2: BFS to rot adjacent fresh oranges
        directions = [(-1,0), (1,0), (0,-1), (0,1)]  # up, down, left, right
        minutes = 0

        while queue:
            r, c, mins = queue.popleft()
            minutes = max(minutes, mins)
            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2  # Rot the orange
                    fresh_oranges -= 1
                    queue.append((nr, nc, mins + 1))

        return minutes if fresh_oranges == 0 else -1

</code>
</pre>
</details>

## 19.34. Shortest Path in Binary Matrix (8 directions)

Ref: [https://leetcode.com/problems/shortest-path-in-binary-matrix/](https://leetcode.com/problems/shortest-path-in-binary-matrix/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import deque
from typing import List

class Solution:
    def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
        # Check if the starting or ending cell is blocked
        if grid[0][0] == 1 or grid[-1][-1] == 1:
            return -1
        
        # Directions for 8 possible moves (right, left, down, up, diagonals)
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]
        
        # BFS setup: queue stores (x, y, distance)
        queue = deque([(0, 0, 1)])  # Start from the top-left corner, with distance 1
        n = len(grid)  # Size of the grid
        
        # Mark the starting cell as visited
        grid[0][0] = 1
        
        while queue:
            x, y, dist = queue.popleft()
            
            # If we reach the bottom-right corner, return the distance
            if x == n - 1 and y == n - 1:
                return dist
            
            # Explore all 8 directions
            for dx, dy in directions:
                nx, ny = x + dx, y + dy
                
                # Check if the new position is within bounds and not visited
                if 0 <= nx < n and 0 <= ny < n and grid[nx][ny] == 0:
                    # Mark the cell as visited
                    grid[nx][ny] = 1
                    # Add the new position to the queue with the incremented distance
                    queue.append((nx, ny, dist + 1))
        
        # If we finish BFS without reaching the bottom-right corner, return -1
        return -1


</code>
</pre>
</details>

---

**Graph coloring/Bipartition**

## 19.35. Graph Bipartite

Ref: [https://leetcode.com/problems/is-graph-bipartite/description/](https://leetcode.com/problems/is-graph-bipartite/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List
from collections import deque

class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        n = len(graph)
        color = [-1] * n  # -1 means unvisited; 0 and 1 are two colors

        for start in range(n):
            if color[start] == -1:
                queue = deque([start])
                color[start] = 0

                while queue:
                    node = queue.popleft()
                    for neighbor in graph[node]:
                        if color[neighbor] == -1:
                            color[neighbor] = 1 - color[node]  # alternate color
                            queue.append(neighbor)
                        elif color[neighbor] == color[node]:
                            return False  # same color on both sides means not bipartite
        return True

</code>
</pre>
</details>

## 19.36. Possible Bipartition

Ref: [https://leetcode.com/problems/possible-bipartition/description/](https://leetcode.com/problems/possible-bipartition/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def possibleBipartition(self, n: int, dislikes: List[List[int]]) -> bool:
        graph = defaultdict(list)
        for a, b in dislikes:
            graph[a].append(b)
            graph[b].append(a)

        color = {}

        for node in range(1, n+1):
            if node not in color:
                queue = deque([node])
                color[node] = 0
                while queue:
                    curr = queue.popleft()
                    for neighbor in graph[curr]:
                        if neighbor not in color:
                            color[neighbor] = 1 - color[curr]
                            queue.append(neighbor)
                        elif color[neighbor] == color[curr]:
                            return False
        return True
            
</code>
</pre>
</details>

---

**Topology Sort (Kahn Algorithm)**

## 19.37. Course Schedule

Ref: [https://leetcode.com/problems/course-schedule/description/](https://leetcode.com/problems/course-schedule/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import defaultdict, deque
from typing import List

# BFS Topology Sort)
class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # Build the graph and in-degree array
        graph = defaultdict(list)
        in_degree = [0] * numCourses

        for dest, src in prerequisites:
            graph[src].append(dest)
            in_degree[dest] += 1

        # Initialize queue with nodes having zero in-degree (no prerequisites)
        queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
        completed_courses = 0

        result = []
        while queue:
            course = queue.popleft()
            result.append(course)
            completed_courses += 1

            for neighbor in graph[course]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        # [0, 1]
        print("Result: ", result)
        return completed_courses == numCourses
            
</code>
</pre>
</details>

## 19.37. Course Schedule II

Ref: [https://leetcode.com/problems/course-schedule-ii/](https://leetcode.com/problems/course-schedule-ii/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        # Build the graph and in-degree array
        graph = defaultdict(list)
        in_degree = [0] * numCourses

        for dest, src in prerequisites:
            graph[src].append(dest)
            in_degree[dest] += 1

        # Initialize queue with nodes having zero in-degree (no prerequisites)
        queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
        completed_courses = 0

        result = []
        while queue:
            course = queue.popleft()
            result.append(course)
            completed_courses += 1

            for neighbor in graph[course]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        return result if completed_courses == numCourses else []
            
</code>
</pre>
</details>

---

**Find Shortest Path in Weighted Graph (Dijkstra's/Bellman Ford)**

About no-directed graph, we use BFS

## 19.38. Network Delay Time (Dijkstra - Find 1 to 1)

Ref: [https://leetcode.com/problems/network-delay-time/description/](https://leetcode.com/problems/network-delay-time/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List
import heapq
from collections import defaultdict

class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        # Build the adjacency list
        graph = defaultdict(list)
        for u, v, w in times:
            graph[u].append((v, w))

        # Min-heap to get the next closest node
        min_heap = [(0, k)]  # (time, node)
        visited = set()
        time_to_reach = {}

        while min_heap:
            time, node = heapq.heappop(min_heap)
            if node in visited:
                continue
            visited.add(node)
            time_to_reach[node] = time

            for neighbor, weight in graph[node]:
                if neighbor not in visited:
                    heapq.heappush(min_heap, (time + weight, neighbor))

        # {2: 0, 1: 1, 3: 1, 4: 2}
        print(time_to_reach)

        return max(time_to_reach.values()) if len(visited) == n else -1
            
</code>
</pre>
</details>

## 19.38. Find the City With the Smallest Number of Neighbors at a Threshold Distance (Floyd-Warshall - Find N to N)

Ref: [https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def findTheCity(self, n: int, edges: List[List[int]], distanceThreshold: int) -> int:
        # Step 1: Initialize distance matrix
        dist = [[float('inf')] * n for _ in range(n)]
        
        for i in range(n):
            dist[i][i] = 0
        
        for u, v, w in edges:
            dist[u][v] = w
            dist[v][u] = w  # Because the graph is undirected
        
        # Step 2: Floyd-Warshall to compute all-pairs shortest paths
        for k in range(n):
            for i in range(n):
                for j in range(n):
                    if dist[i][j] > dist[i][k] + dist[k][j]:
                        dist[i][j] = dist[i][k] + dist[k][j]
        
        # Step 3: Count reachable cities within distanceThreshold
        min_reachable = n
        city_index = -1
        
        for i in range(n):
            # Number of nodes can reachable
            count = sum(1 for j in range(n) if i != j and dist[i][j] <= distanceThreshold)
            if count <= min_reachable:
                min_reachable = count
                city_index = i  # Prefer the city with the greatest number in case of tie
        
        return city_index
            
</code>
</pre>
</details>

## 19.39. Cheapest Flights Within K Stops (Bellman-Ford - Snapshot in Kth)

Ref: [https://leetcode.com/problems/cheapest-flights-within-k-stops/](https://leetcode.com/problems/cheapest-flights-within-k-stops/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        # Step 1: Initialize distances array with "infinite" cost
        prices = [float('inf')] * n
        prices[src] = 0
        
        # Step 2: Run the Bellman-Ford algorithm for k+1 times
        for i in range(k + 1):
            tmp = prices.copy()
            for u, v, w in flights:
                if prices[u] == float('inf'):
                    continue
                if prices[u] + w < tmp[v]:
                    tmp[v] = prices[u] + w
            prices = tmp
        
        return -1 if prices[dst] == float('inf') else prices[dst]
            
</code>
</pre>
</details>

---

**Prim Algorithm**

## 19.40. Connecting Cities With Minimum Cost (Prim)

Ref: [https://leetcode.com/problems/connecting-cities-with-minimum-cost/description/](https://leetcode.com/problems/connecting-cities-with-minimum-cost/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        if n == 0:
            return 0

        # Step 1: Build graph
        graph = defaultdict(list)
        for city1, city2, cost in connections:
            graph[city1].append((cost, city2))
            graph[city2].append((cost, city1))

        visited = set()
        min_heap = [(0, 1)]  # (cost, starting_city)
        total_cost = 0

        while min_heap and len(visited) < n:
            cost, city = heapq.heappop(min_heap)
            if city in visited:
                continue
            visited.add(city)
            total_cost += cost
            for nei_cost, nei_city in graph[city]:
                if nei_city not in visited:
                    heapq.heappush(min_heap, (nei_cost, nei_city))

        return total_cost if len(visited) == n else -1
            
</code>
</pre>
</details>

---

**Strongly Connected Components**

## 19.41. Strongly Connected Components: Tarjan's Algorithm

Ref: [https://leetcode.com/problems/critical-connections-in-a-network/](https://leetcode.com/problems/critical-connections-in-a-network/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List
from collections import defaultdict

class Solution:
    def criticalConnections(self, n: int, connections: List[List[int]]) -> List[List[int]]:
        graph = defaultdict(list)
        for u, v in connections:
            graph[u].append(v)
            graph[v].append(u)

        discovery = [-1] * n
        low = [-1] * n
        time = [0]
        result = []

        def dfs(node, parent):
            discovery[node] = low[node] = time[0]
            time[0] += 1

            for neighbor in graph[node]:
                if neighbor == parent:
                    continue
                if discovery[neighbor] == -1:
                    dfs(neighbor, node)
                    low[node] = min(low[node], low[neighbor])
                    if low[neighbor] > discovery[node]:
                        result.append([node, neighbor])
                else:
                    low[node] = min(low[node], discovery[neighbor])

        dfs(0, -1)
        return result
            
</code>
</pre>
</details>

---

**A\* Search**

## 19.42. Sliding puzzle (Game Backtracking)

Ref: [https://leetcode.com/problems/sliding-puzzle/](https://leetcode.com/problems/sliding-puzzle/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List
from collections import deque

class Solution:
    def slidingPuzzle(self, board: List[List[int]]) -> int:
        start = ''.join(str(cell) for row in board for cell in row)
        target = '123450'

        # Mapping of index to its neighbors on a 2x3 board
        neighbors = {
            0: [1, 3],
            1: [0, 2, 4],
            2: [1, 5],
            3: [0, 4],
            4: [1, 3, 5],
            5: [2, 4]
        }

        visited = set()
        queue = deque([(start, 0)])
        visited.add(start)

        while queue:
            state, steps = queue.popleft()
            if state == target:
                return steps

            zero_idx = state.index('0')
            for neighbor in neighbors[zero_idx]:
                new_state = list(state)
                # Swap '0' with the neighbor
                new_state[zero_idx], new_state[neighbor] = new_state[neighbor], new_state[zero_idx]
                new_state_str = ''.join(new_state)

                if new_state_str not in visited:
                    visited.add(new_state_str)
                    queue.append((new_state_str, steps + 1))

        return -1
            
</code>
</pre>
</details>

## 19.43. Find if Path Exists in Graph

Ref: [https://leetcode.com/problems/find-if-path-exists-in-graph/description/](https://leetcode.com/problems/find-if-path-exists-in-graph/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def validPath(self, n: int, edges: List[List[int]], source: int, destination: int) -> bool:
        graph = defaultdict(list)
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)
        
        visited = [False] * n
        result = []

        def dfs(node, target, path = []):
            if node == target:
                result.append(path[:])
                return

            visited[node] = True  # mark as visiting
            path.append(node)
            
            for neighbor in graph[node]:
                if not visited[neighbor]:
                    dfs(neighbor, target, path)
            
            # Backtracking
            # Do not set visited[node] = False for do not repeated visited
            path.pop()

        dfs(source, destination)
        return len(result) > 0
            
</code>
</pre>
</details>

## 19.44. Steps by Knight (BFS with 8 direction)

Ref: [https://www.geeksforgeeks.org/problems/steps-by-knight5927/1](https://www.geeksforgeeks.org/problems/steps-by-knight5927/1)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import deque

class Solution:
    def minStepToReachTarget(self, knightPos, targetPos, n):
        # All 8 possible movements for a knight in chess
        directions = [
            (-2, -1), (-1, -2), (1, -2), (2, -1),
            (2, 1), (1, 2), (-1, 2), (-2, 1)
        ]
        
        # Convert to 0-indexed positions
        knightPos = (knightPos[0] - 1, knightPos[1] - 1)
        targetPos = (targetPos[0] - 1, targetPos[1] - 1)

        # If starting position is the same as target
        if knightPos == targetPos:
            return 0

        visited = [[False for _ in range(n)] for _ in range(n)]
        queue = deque()
        queue.append((knightPos[0], knightPos[1], 0))  # (x, y, steps)
        visited[knightPos[0]][knightPos[1]] = True

        while queue:
            x, y, steps = queue.popleft()

            for dx, dy in directions:
                nx, ny = x + dx, y + dy

                if 0 <= nx < n and 0 <= ny < n and not visited[nx][ny]:
                    if (nx, ny) == targetPos:
                        return steps + 1
                    visited[nx][ny] = True
                    queue.append((nx, ny, steps + 1))

        return -1  # If unreachable (shouldn't happen on an open board)

</code>
</pre>
</details>

## 19.45. Reorder Routes to Make All Paths Lead to the City Zero (Idea đi từ 0 đến các thành phố khác, nào đi không được thì change + 1)

Ref: [https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/description/](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import defaultdict, deque
from typing import List

class Solution:
    def minReorder(self, n: int, connections: List[List[int]]) -> int:
        # Build the graph with direction info
        graph = defaultdict(list)
        for u, v in connections:
            graph[u].append((v, 1))  # original direction
            graph[v].append((u, 0))  # reverse direction

        visited = set()
        queue = deque([0])
        visited.add(0)
        changes = 0

        while queue:
            current = queue.popleft()
            for neighbor, direction in graph[current]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
                    changes += direction  # increment if we need to reverse this edge

        return changes

</code>
</pre>
</details>

## 19.46. Detect cycle in an undirected graph

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import defaultdict

class Solution:
    def hasCycle(self, n: int, edges: list[list[int]]) -> bool:
        graph = defaultdict(list)
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)  # undirected

        visited = [False] * n

        def dfs(node, parent):
            visited[node] = True
            for neighbor in graph[node]:
                if not visited[neighbor]:
                    if dfs(neighbor, node):
                        return True
                elif neighbor != parent:
                    return True  # found a back edge (cycle)
            return False

        for i in range(n):
            if not visited[i]:
                if dfs(i, -1):
                    return True
        return False

</code>
</pre>
</details>

## 19.47. Detect cycle in an directed graph

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import defaultdict

class Solution:
    def hasCycle(self, n: int, edges: list[list[int]]) -> bool:
        graph = defaultdict(list)
        for u, v in edges:
            graph[u].append(v)  # directed edge

        visited = [False] * n
        rec_stack = [False] * n  # recursion stack

        def dfs(node):
            visited[node] = True
            rec_stack[node] = True

            for neighbor in graph[node]:
                if not visited[neighbor]:
                    if dfs(neighbor):
                        return True
                elif rec_stack[neighbor]:
                    return True  # cycle detected

            rec_stack[node] = False
            return False

        for i in range(n):
            if not visited[i]:
                if dfs(i):
                    return True
        return False

</code>
</pre>
</details>

## 19.48. Eventual Safe States

Ref: [https://www.geeksforgeeks.org/problems/eventual-safe-states/1](https://www.geeksforgeeks.org/problems/eventual-safe-states/1)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:    
    def eventualSafeNodes(self, V : int, adj : List[List[int]]) -> List[int]:
        state = [0] * V  # 0 = unvisited, 1 = visiting, 2 = safe

        def dfs(node):
            if state[node] == 1:
                return False  # cycle detected
            if state[node] == 2:
                return True  # already determined safe

            state[node] = 1  # mark as visiting

            for neighbor in adj[node]:
                if not dfs(neighbor):
                    return False

            state[node] = 2  # mark as safe
            return True

        result = []
        for i in range(V):
            if dfs(i):
                result.append(i)

        return result

</code>
</pre>
</details>

For example:

![](/images/cycle_safe_node.png)

- So the unsafe nodes are: 0, 1, 3

- And the safe nodes are: 2, 4, 5, 6

## 19.49. Longest Cycle in a Graph

Ref: [https://leetcode.com/problems/longest-cycle-in-a-graph/description/](https://leetcode.com/problems/longest-cycle-in-a-graph/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def longestCycle(self, edges: List[int]) -> int:
        state = [0] * len(edges)  # 0 = unvisited, 1 = visiting, 2 = safe
        max_cycle_length = -1
        
        def dfs(node, path):
            if state[node] == 1:  # cycle detected
                cycle_start = node
                cycle_length = 0
                for i in range(len(path) - 1, -1, -1):
                    cycle_length += 1
                    if path[i] == cycle_start:
                        break
                return cycle_length

            if state[node] == 2:  # already safe
                return 0
            
            state[node] = 1  # mark as visiting
            
            path.append(node)
            next_node = edges[node]
            
            cycle_length = 0
            # Loop dfs from a node until meet cycle
            if next_node != -1:  # valid edge
                cycle_length = dfs(next_node, path)

            state[node] = 2  # mark as safe
            path.pop()
            
            return cycle_length
        
        for i in range(len(edges)):
            if state[i] == 0:  # unvisited node
                cycle_length = dfs(i, [])
                max_cycle_length = max(max_cycle_length, cycle_length)
        
        return max_cycle_length if max_cycle_length > 0 else -1

</code>
</pre>
</details>

## 19.50. Largest Color Value in a Directed Graph (Topology Sort): Can not generate all paths because it will cause out of memory if we have a loop

Ref: [https://leetcode.com/problems/largest-color-value-in-a-directed-graph/description/](https://leetcode.com/problems/largest-color-value-in-a-directed-graph/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from collections import defaultdict, deque
from typing import List

class Solution:
    def largestPathValue(self, colors: str, edges: List[List[int]]) -> int:
        n = len(colors)
        graph = defaultdict(list)
        in_degree = [0] * n
        
        for u, v in edges:
            graph[u].append(v)
            in_degree[v] += 1
        
        # color_count[i][c] = max count of color c in any path ending at node i
        color_count = [[0] * 26 for _ in range(n)]
        
        queue = deque()
        for i in range(n):
            if in_degree[i] == 0:
                queue.append(i)
                color_count[i][ord(colors[i]) - ord('a')] = 1
        
        visited = 0
        max_color_value = 0
        
        while queue:
            node = queue.popleft()
            visited += 1
            for neighbor in graph[node]:
                for c in range(26):
        # "For node i, what is the max number of times each color can appear on a path ending at i?"
                    color_count[neighbor][c] = max(
                        color_count[neighbor][c],
                        color_count[node][c] + (1 if c == ord(colors[neighbor]) - ord('a') else 0)
                    )
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
            max_color_value = max(max_color_value, max(color_count[node]))
        
        return max_color_value if visited == n else -1

</code>
</pre>
</details>

## 19.51. Geek's Village and Wells (BFS to find shortest distance in Matrix)

Ref: [https://www.geeksforgeeks.org/problems/geeks-village-and-wells--170647/1](https://www.geeksforgeeks.org/problems/geeks-village-and-wells--170647/1)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List
from collections import deque

class Solution:
    # BFS from W to other node
    def chefAndWells(self, n: int, m: int,
                     c: List[List[str]]) -> List[List[int]]:

        result = [[0 if c[i][j] != 'H' else -1 for j in range(m)] for i in range(n)]
        visited = [[False] * m for _ in range(n)]
        q = deque()
        
        # Start from all wells
        for i in range(n):
            for j in range(m):
                if c[i][j] == 'W':
                    q.append((i, j, 0))  # (row, col, dist)
                    visited[i][j] = True
        
        dirs = [(-1,0), (1,0), (0,-1), (0,1)]
        
        while q:
            x, y, d = q.popleft()
            for dx, dy in dirs:
                nx, ny = x + dx, y + dy
                if 0 <= nx < n and 0 <= ny < m and not visited[nx][ny]:
                    if c[nx][ny] != 'N':  # not blocked
                        visited[nx][ny] = True
                        q.append((nx, ny, d + 1))
                        if c[nx][ny] == 'H':
                            if result[nx][ny] == -1 or result[nx][ny] > (d + 1) * 2:
                                result[nx][ny] = (d + 1) * 2
        
        return result

</code>
</pre>
</details>

## 19.52. Path With Minimum Effort (Dijkstra in Matrix with weight not 01)

Ref: [https://leetcode.com/problems/path-with-minimum-effort/description/](https://leetcode.com/problems/path-with-minimum-effort/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
import heapq
from typing import List

class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        rows, cols = len(heights), len(heights[0])
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        effort = [[float('inf')] * cols for _ in range(rows)]
        effort[0][0] = 0
        min_heap = [(0, 0, 0)]  # (effort, x, y)

        while min_heap:
            curr_effort, x, y = heapq.heappop(min_heap)
            if x == rows - 1 and y == cols - 1:
                return curr_effort

            for dx, dy in directions:
                nx, ny = x + dx, y + dy
                if 0 <= nx < rows and 0 <= ny < cols:
                    next_effort = max(curr_effort, abs(heights[nx][ny] - heights[x][y]))
                    if next_effort < effort[nx][ny]:
                        effort[nx][ny] = next_effort
                        heapq.heappush(min_heap, (next_effort, nx, ny))

        return 0  # fallback (shouldn't be reached)

</code>
</pre>
</details>

# 20. Pattern 20: Island

# 21. Pattern 21: Greedy Algorithms

# 22. Pattern 22: Backtracking

## 22.1. Permutations

Ref: [https://leetcode.com/problems/permutations/description/](https://leetcode.com/problems/permutations/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []

        def backtrack(nums, i):
            if i == len(nums):
                result.append(nums)
                return
            for j in range(i, len(nums)):
                new_nums = nums[:]            # make a fresh copy
                new_nums[i], new_nums[j] = new_nums[j], new_nums[i]
                backtrack(new_nums, i + 1)

        backtrack(nums, 0)
        return result


# Solution 2
from typing import List

class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []

        def backtrack(start=0):
            if start == len(nums):
                result.append(nums[:])
                return
            for i in range(start, len(nums)):
                # [1,2], [1,3], [1,4]
                # When the i = 1 is pass, i = 2 and continue
                nums[start], nums[i] = nums[i], nums[start]  # swap
                backtrack(start + 1)
                # Backtrack
                nums[start], nums[i] = nums[i], nums[start]  # backtrack

        backtrack()
        return result
            
</code>
</pre>
</details>

## 22.2. Permutations II (Unique)

Ref: [https://leetcode.com/problems/permutations-ii/description/](https://leetcode.com/problems/permutations-ii/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        result = []
        nums.sort()  # Sort to group duplicates together

        def backtrack(nums, i):
            if i == len(nums):
                result.append(nums)
                return

            used = set()
            for j in range(i, len(nums)):
                if nums[j] in used:
                    continue  # Skip duplicates at this level

                used.add(nums[j])
                new_nums = nums[:]  # make a copy
                new_nums[i], new_nums[j] = new_nums[j], new_nums[i]
                backtrack(new_nums, i + 1)

        backtrack(nums, 0)
        return result


from typing import List

class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        result = []
        nums.sort()  # Sort to make it easy to skip duplicates

        def backtrack(start=0):
            if start == len(nums):
                result.append(nums[:])
                return

            # [1,2], [1,3], [1,4]
            # When the i = 1 is pass, i = 2 and continue
            seen = set()  # Used to skip duplicates at this recursion level
            for i in range(start, len(nums)):
                if nums[i] in seen:
                    continue
                seen.add(nums[i])
                nums[start], nums[i] = nums[i], nums[start]
                backtrack(start + 1)
                nums[start], nums[i] = nums[i], nums[start]  # backtrack

        backtrack()
        return result

            
</code>
</pre>
</details>

## 22.3. Combinations

Ref: [https://leetcode.com/problems/combinations/](https://leetcode.com/problems/combinations/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        res = []

        def backtrack(start: int, path: List[int]):
            if len(path) == k:
                res.append(path[:])
                return
            # [1,2], [1,3], [1,4]
            # When the i = 1 is pass, i = 2 and continue
            for i in range(start, n + 1):
                path.append(i)
                backtrack(i + 1, path)
                path.pop()
        
        backtrack(1, [])
        return res
            
</code>
</pre>
</details>

## 22.4. Combination Sum

Ref: [https://leetcode.com/problems/combination-sum/description/](https://leetcode.com/problems/combination-sum/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        result = []

        def backtrack(remaining, start, path):
            if remaining == 0:
                result.append(path[:])
                return
            elif remaining < 0:
                return
            
            for i in range(start, len(candidates)):
                path.append(candidates[i])
                # i, not i+1 because we can reuse same elements
                backtrack(remaining - candidates[i], i, path) 
                path.pop()

        backtrack(target, 0, [])
        return result
            
</code>
</pre>
</details>

## 22.5. Combination Sum II

Ref: [https://leetcode.com/problems/combination-sum-ii/description/](https://leetcode.com/problems/combination-sum-ii/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        result = set()

        def backtrack(remaining, start, path):
            if remaining == 0:
                result.add(tuple(path))  # Convert to tuple to store in set
                return
            elif remaining < 0:
                return
            
            for i in range(start, len(candidates)):
                # Skip duplicates (common and understand)
                if i > start and candidates[i] == candidates[i - 1]:
                    continue

                path.append(candidates[i])
                # i + 1: each number can be used only once
                backtrack(remaining - candidates[i], i + 1, path) 
                path.pop()

        backtrack(target, 0, [])
        return [list(comb) for comb in result]  # Convert each tuple back to list

</code>
</pre>
</details>

## 22.6. Combination Sum III

Ref: [https://leetcode.com/problems/combination-sum-iii/](https://leetcode.com/problems/combination-sum-iii/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        candidates = [1,2,3,4,5,6,7,8,9]
        candidates.sort()
        result = set()

        def backtrack(remaining, start, path):
            if remaining == 0 and len(path) == k:
                result.add(tuple(path))  # Convert to tuple to store in set
                return
            elif remaining < 0:
                return
            
            for i in range(start, len(candidates)):
                # Skip duplicates (common and understand)
                if i > start and candidates[i] == candidates[i - 1]:
                    continue

                path.append(candidates[i])
                # i + 1: each number can be used only once
                backtrack(remaining - candidates[i], i + 1, path) 
                path.pop()

        backtrack(n, 0, [])
        return [list(comb) for comb in result]  # Convert each tuple back to list

</code>
</pre>
</details>

## 22.7. Subsets

Ref: [https://leetcode.com/problems/subsets/description/](https://leetcode.com/problems/subsets/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        result = []

        # Giong combination sum nhung khong co diem dung ma lay het
        def backtrack(start, path):
            result.append(path[:])  # Add the current subset to the result
            for i in range(start, len(nums)):
                path.append(nums[i])
                # Do not contain duplicate
                backtrack(i + 1, path)
                path.pop()

        backtrack(0, [])
        return result

</code>
</pre>
</details>

## 22.8. Subsets II

Ref: [https://leetcode.com/problems/subsets-ii/description/](https://leetcode.com/problems/subsets-ii/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        result = []

        def backtrack(start, path):
            result.append(path[:])
            for i in range(start, len(nums)):
                # Skip duplicates
                if i > start and nums[i] == nums[i - 1]:
                    continue
                path.append(nums[i])
                backtrack(i + 1, path)
                path.pop()

        backtrack(0, [])
        return result

</code>
</pre>
</details>

## 22.9. Palindrome Partitioning

Ref: [https://leetcode.com/problems/palindrome-partitioning/description/](https://leetcode.com/problems/palindrome-partitioning/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def partition(self, s: str) -> List[List[str]]:
        result = []
        current_partition = []
        
        def is_palindrome(sub: str) -> bool:
            return sub == sub[::-1]
        
        def backtrack(start: int):
            if start == len(s):
                result.append(current_partition[:])
                return
            
            for end in range(start + 1, len(s) + 1):
                substring = s[start:end]
                if is_palindrome(substring):
                    current_partition.append(substring)
                    backtrack(end)
                    current_partition.pop()
        
        backtrack(0)
        return result

</code>
</pre>
</details>

## 22.10. Generate Parentheses

Ref: [https://leetcode.com/problems/generate-parentheses/description/](https://leetcode.com/problems/generate-parentheses/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        result = []

        def backtrack(current: str, open_count: int, close_count: int):
            # Base case: if the current string has all pairs
            if len(current) == 2 * n:
                result.append(current)
                return
            
            # Add an opening parenthesis if we still have one
            if open_count < n:
                backtrack(current + "(", open_count + 1, close_count)
            
            # Add a closing parenthesis if it won't exceed the number of opens
            
            # Why You Don’t See current.pop()
            # That creates a new string every time (current + "("), so we don’t need to undo        anything — the old current is untouched.
            if close_count < open_count:
                backtrack(current + ")", open_count, close_count + 1)
        
        backtrack("", 0, 0)
        return result

</code>
</pre>
</details>

## 22.11. Letter Combinations of a Phone Number

Ref: [https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/](https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []

        phone_map = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz"
        }

        result = []

        def backtrack(index: int, path: str):
            if index == len(digits):
                result.append(path)
                return

            possible_letters = phone_map[digits[index]]
            for letter in possible_letters:
                # Backtrack for each letter "a", "b", "c" 
                backtrack(index + 1, path + letter)

        backtrack(0, "")
        return result

</code>
</pre>
</details>

## 22.12. Word search

Ref: [https://leetcode.com/problems/word-search/description/](https://leetcode.com/problems/word-search/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        rows, cols = len(board), len(board[0])
        
        def dfs(r, c, i):
            if i == len(word):
                return True
            if (r < 0 or c < 0 or r >= rows or c >= cols 
                or board[r][c] != word[i]):
                return False
            
            # Temporarily mark the cell as visited
            temp = board[r][c]
            
            # Flip the word[i] to '#' is found
            board[r][c] = "#"
            
            # Explore neighbors in 4 directions
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                found = dfs(r + dr, c + dc, i + 1)  # Recursively check neighbors
                if found:
                    return True
            
            # Restore the cell
            board[r][c] = temp
            
            return False
        
        for r in range(rows):
            for c in range(cols):
                if board[r][c] == word[0]:
                    if dfs(r, c, 0):
                        return True
        return False

</code>
</pre>
</details>

## 22.13. N-Queens

Ref: [https://leetcode.com/problems/n-queens/description/](https://leetcode.com/problems/n-queens/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        def is_valid(board, row, col):
            # Check column
            for i in range(row):
                if board[i][col] == 'Q':
                    return False
            # Check upper-left diagonal
            i, j = row - 1, col - 1
            while i >= 0 and j >= 0:
                if board[i][j] == 'Q':
                    return False
                i -= 1
                j -= 1
            # Check upper-right diagonal
            i, j = row - 1, col + 1
            while i >= 0 and j < n:
                if board[i][j] == 'Q':
                    return False
                i -= 1
                j += 1
            return True

        def backtrack(row):
            if row == n:
                result.append(["".join(r) for r in board])
                return
            for col in range(n):
                if is_valid(board, row, col):
                    board[row][col] = 'Q'
                    backtrack(row + 1)
                    board[row][col] = '.'

        result = []
        board = [['.'] * n for _ in range(n)]
        backtrack(0)
        return result

</code>
</pre>
</details>

## 22.14. Sudoku Solver

Ref: [https://leetcode.com/problems/sudoku-solver/description/](https://leetcode.com/problems/sudoku-solver/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        def is_valid(r, c, ch):
            # Check row
            for i in range(9):
                if board[r][i] == ch:
                    return False
            # Check column
            for i in range(9):
                if board[i][c] == ch:
                    return False
            # Check 3x3 sub-box
            box_row_start = (r // 3) * 3
            box_col_start = (c // 3) * 3
            for i in range(3):
                for j in range(3):
                    if board[box_row_start + i][box_col_start + j] == ch:
                        return False
            return True

        def backtrack():
            for i in range(9):
                for j in range(9):
                    if board[i][j] == '.':
                        for ch in map(str, range(1, 10)):
                            if is_valid(i, j, ch):
                                board[i][j] = ch
                                if backtrack():
                                    return True
                                board[i][j] = '.'  # backtrack
                        return False  # No valid number found
            return True  # All cells filled

        backtrack()

</code>
</pre>
</details>

## 22.15. Permutations of a String (Permutation)

Ref: [https://www.geeksforgeeks.org/problems/permutations-of-a-given-string2041/1](https://www.geeksforgeeks.org/problems/permutations-of-a-given-string2041/1)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def findPermutation(self, s):
        s = list(s)
        result = set()

        def backtrack(start=0):
            if start == len(s):
                result.add(''.join(s[:]))
                return
            for i in range(start, len(s)):
                s[start], s[i] = s[i], s[start]  # swap
                backtrack(start + 1)
                # Backtrack
                s[start], s[i] = s[i], s[start]  # backtrack

        backtrack()
        return list(result)
</code>
</pre>
</details>

## 22.16. Word Break (Combination Sum)

Ref: [https://leetcode.com/problems/word-break/description/](https://leetcode.com/problems/word-break/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

# Idea of Combination Sum
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        result = []
        word_set = set(wordDict)
        n = len(s)

        def backtrack(start: int, path: List[str]):
            # Multiple function call so we can not return False here
            if start == n:
                result.append(" ".join(path))
                return

            for end in range(start + 1, n + 1):
                word = s[start:end]
                if word in word_set:
                    path.append(word)
                    backtrack(end, path)
                    path.pop()

        backtrack(0, [])
        return len(result) > 0

</code>
</pre>
</details>

## 22.17. Rat in a Maze Problem

Ref: [https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1](https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    # Function to find all possible paths in the maze
    def ratInMaze(self, maze):
        n = len(maze)
        result = []
        
        # Directions: D (down), L (left), R (right), U (up)
        # ('D', dx + 1, dy), ('L', dx, dy - 1), ('R', dx, dy + 1), ('U', dx - 1, dy)
        directions = [('D', 1, 0), ('L', 0, -1), ('R', 0, 1), ('U', -1, 0)]

        def isSafe(x, y, visited):
            return 0 <= x < n and 0 <= y < n and maze[x][y] == 1 and not visited[x][y]

        def backtrack(x, y, path, visited):
            if x == n - 1 and y == n - 1:
                result.append(path)
                return
            
            visited[x][y] = True

            for dir_char, dx, dy in directions:
                new_x, new_y = x + dx, y + dy
                if isSafe(new_x, new_y, visited):
                    backtrack(new_x, new_y, path + dir_char, visited)

            visited[x][y] = False  # backtrack

        if maze[0][0] == 1:
            visited = [[False for _ in range(n)] for _ in range(n)]
            backtrack(0, 0, '', visited)

        return sorted(result)

</code>
</pre>
</details>

## 22.18. Path with Maximum Gold

Ref: [https://leetcode.com/problems/path-with-maximum-gold/description/](https://leetcode.com/problems/path-with-maximum-gold/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
from typing import List

class Solution:
    def getMaximumGold(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])

        def dfs(x: int, y: int) -> int:
            gold = grid[x][y]
            grid[x][y] = 0  # mark as visited

            # NOTES: TOTAL RESULT AFTER BACKTRACKING
            max_gold = 0
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < rows and 0 <= ny < cols and grid[nx][ny] > 0:
                    max_gold = max(max_gold, dfs(nx, ny))

            grid[x][y] = gold  # backtrack
            return gold + max_gold

        max_total = 0
        for i in range(rows):
            for j in range(cols):
                if grid[i][j] > 0:
                    max_total = max(max_total, dfs(i, j))

        return max_total


</code>
</pre>
</details>

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

## 43.17. Text Justification

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

## 43.18. Substring

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

## 43.19. Pascal's Triangle

Ref: [https://leetcode.com/problems/pascals-triangle/description/](https://leetcode.com/problems/pascals-triangle/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        triangle = []
        for i in range(0, numRows):
            result = [1] * (i + 1) # 1,2,3,4,5,...
            for j in range(1, len(result) - 1):
                if i < 2:
                    continue
                result[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
            triangle.append(result)
        return triangle
</code>
</pre>
</details>

## 43.20. Unique Email Addresses

Ref: [https://leetcode.com/problems/unique-email-addresses/description/](https://leetcode.com/problems/unique-email-addresses/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def numUniqueEmails(self, emails: List[str]) -> int:
        uniqueEmail = []
        count = 0

        for email in emails:
            parts = email.split("@")
            if len(parts) != 2:
                continue
            localName = parts[0]

            # Remove . character
            localName = localName.replace(".", "")

            # Skip data after + in localName
            localName = localName.split("+")[0]

            # Domain name
            domainName = parts[1]

            # Email
            email = localName + "@" + domainName

            if email not in uniqueEmail:
                count += 1
                uniqueEmail.append(email)

        return count
        
</code>
</pre>
</details>

## 43.21. Isomorphic Strings

Ref: [https://leetcode.com/problems/isomorphic-strings/description/](https://leetcode.com/problems/isomorphic-strings/description/)

<details>
<summary>Code</summary>

<pre>
<code class="python">
class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        hashMapStoT = {}
        hashMapTtoS = {}
        for i in range(0, len(s)):
            if s[i] not in hashMapStoT:
                hashMapStoT[s[i]] = t[i]

            if t[i] not in hashMapTtoS:
                hashMapTtoS[t[i]] = s[i]

            if hashMapTtoS[t[i]] != s[i]:
                return False

            if hashMapStoT[s[i]] != t[i]:
                return False
        
        return True
        
</code>
</pre>
</details>
