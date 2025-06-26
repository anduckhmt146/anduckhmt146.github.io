---
layout: post
title: 'Coding Interview - Design'
date: 2025-06-26
categories: tech
---

Here is some coding interview to practice design

- Easy: 30 minutes.

- Medium: 1 hours.

- Hard: 2 hours.

## 1. Decrypt Message

### Step 1: Clarify Requirements

The messages consist of lowercase Latin letters only, and every word is encrypted separately as follows:

- Convert every letter to its ASCII value.

- Modify the ASCII values by adding 1 to the first letter, and for each subsequent letter, add the encrypted ASCII value of the previous letter to its original ASCII value.

- Subtract 26 from every letter until it is in the range of lowercase letters a-z in ASCII. Convert the values back to letters.

Example: "crime" -> "dnotq"

### Step 2: Design Algorithm

- **Notes:**

**Encrypt idea:**

c: 99 -> d: 100

r: 114 + 100 = 224 (- 26 - 26 - 26 - 26) = 110 (n)

i: 105 + 110 = 215 - 26 \* 4 = 111 (o)

m: 109 + 111 - 26 \* 4 = 116 (t)

e: 101 + 116 - 26 \* 4 = 113 (q)

[a - z] = [97 - 122]

**Decrypt idea:**

d: 100 - 1 = 99 (c)

n: 110 - 100 + 26 \* 4 = 114 (r)

o: 111 - 110 + 26 \* 4 = 105 (i)

t: 116 - 111 + 26 \* 4 = 109 (m)

q: 113 - 116 + 26 \* 4 = 101 (e)

### Step 3: Design Algorithm

Idea

```python
ascii_value = ord('a')
print(ascii_value)

ascii_number = chr(97)
print(ascii_number)
```

```python
def decrypt(word: str) -> str:
    res = ""
    prev_char = 1
    for char in word:
        ascii_int = ord(char)
        gap = ascii_int - prev_char

        while gap < 97 or gap > 122:
            if gap < 97:
                gap += 26
            elif gap > 122:
                gap -= 26
            else:
                break
        res += chr(gap)
        prev_char = ord(char)

    return res

# debug your code below
print(decrypt("dnotq"))
```

## 2. Most Common Words

### 2.1. Clarify Requirements

- Count the frequence of the sentence:

```python
text = 'It was the best of times, it was the worst of times.'
```

### 2.2. Example

```python

[
    ('it', 2),
    ('of', 2),
    ('the', 2),
    ('times', 2),
    ('was', 2),
    ('best', 1),
    ('worst', 1)
]
```

- Need to sort by alphabet.

- Need to lower case a string.

### 2.3. Implement

- **Syntax**

```python
from collections import Counter

sentence = sentence.lower()
words = sentence.split()
counter = Counter(words)

# Using method items()
list(counter.items())

# Sort key
sorted_items = sorted(counter.items(), key=lambda x: x[0])
```

- Sorted receive: (Item, and Lambda function to sort)

- Priority sort by frequence first, alphabet later: key = lambda x: (-x[1], x[0])

```python
from typing import List, Tuple
from collections import Counter
import string

def most_common_words(text: str) -> List[Tuple[str, int]]:
    cleanedText = text.translate(str.maketrans('', '', string.punctuation)).lower()
    words = cleanedText.split()

    counter = Counter(words)
    items = counter.items()

    sortItems = sorted(items, key = lambda x: (-x[1], x[0]))
    return list(sortItems)

# debug your code below
print(most_common_words("It was the best of times, it was the worst of times."))
```

## 3. Valid Palindrome

### 3.1. Clarify requirements

- A man, a plan, a canal, Panama -> True

- Only count for alphabet

### 3.2. Idea:

- Two Pointer legendary question

### 3.3 Implement:

```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1

        while left < right:
            # Move left to next alphanumeric
            # Reach the left
            while left < right and not s[left].isalnum():
                left += 1
            # Move right to previous alphanumeric
            # Reach the right
            while left < right and not s[right].isalnum():
                right -= 1
            # Compare characters
            if s[left].lower() != s[right].lower():
                return False

            # Need to increase left and right here -> Above is only find the character
            left += 1
            right -= 1

        return True

```

```python
# Core function
def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        # Core function
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True

# debug your code below
print(is_palindrome('abcba'))
```

- **Implementation**

```python
def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1

        # Core function
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1

    return True

# debug your code below
print(is_palindrome('abcba'))
```

## 4. Validate IP Address

## 4.1. Requirements

- Clear

## 4.2. Example

- Learning convert string sang int.

- Check number is leading with "0".

- Try catch principle.

## 4.3. Implement

- Split the queryIP

- Check list contain 4 items -> IPV4 -> Validate a list of item of IPV4

- Check list contain 8 items -> IPV6 -> Validate a list of item of IPV6

```python
class Solution:
    def validIPAddress(self, queryIP: str) -> str:
        # Split the queryIP
        # Check list contain 4 items -> IPV4 -> Validate a list of item of IPV4
        # Chekc list contain 8 items -> IPV6 -> Validate a list of item of IPV6

        ipV4List = queryIP.split('.')
        if len(ipV4List) == 4:
            for item in ipV4List:
                try:
                    value = int(item)
                except ValueError:
                    return "Neither"

                if item == "0":
                    continue

                if value < 0 or value > 255 or item.startswith("0"):
                    return "Neither"
            return "IPv4"

        ipV6List = queryIP.split(':')
        if len(ipV6List) == 8:
            for item in ipV6List:
                if len(item) == 0 or len(item) > 4:
                    return "Neither"
                try:
                    value = int(item, 16)
                except ValueError:
                    return "Neither"
                if value < 0 or value > 0xFFFF:
                    return "Neither"
            return "IPv6"

        return "Neither"
```

## 5. Capacity to Ship Packages Within D Days (Greedy)

### 5.1. Requirements

- Maximum of the ship capacity -> load all the pakage in D days.

### 5.2. Idea & Example (Idea High-level is important, important freely)

- Ship capacity: [max(arr), sum(arr)]

- With the capacity -> How to check the valid

- Idea: Start increasing packages to the ship -> whether is <= days.

### 5.3. Idea

- **Idea 1**: Note, in case the load > capacity, set prev_sum = 0 and continue to load

```python
class Solution:
    def shipWithinDays(self, weights: List[int], days: int) -> int:
        left, right = max(weights), sum(weights)
        for capacity in range(left, right + 1):
            prev_sum = 0
            count_day = 1
            for i in range(len(weights)):
                if prev_sum + weights[i] > capacity:
                    count_day += 1
                    prev_sum = 0
                prev_sum += weights[i]

            if count_day <= days:
                return capacity

        return 0
```

- **Idea 2**

```python
class Solution:
    def shipWithinDays(self, weights: List[int], days: int) -> int:
        left, right = max(weights), sum(weights)

        def canShip(capacity):
            prev_sum = 0
            count_day = 1
            for i in range(len(weights)):
                if prev_sum + weights[i] > capacity:
                    count_day += 1
                    prev_sum = 0
                prev_sum += weights[i]

            return count_day <= days

        while left <= right:
            mid = (left + right) // 2
            if canShip(mid):
                right = mid - 1
            else:
                left = mid + 1

        return left
```

## 6. Sudoku

### 6.1. Clarify requirements

- Solving Sudoku

### 6.2. Idea & Example

- Solution 1: Go to the empty block -> Try [1 -> 9] -> Check row, col, in square 3 x 3.

- After that -> BFS first the choice and continue to fill all the column.

### 6.3. Implement

- Write backtracking condition first.

- Write condition check later.

- Backtracking need to return -> Think backtracking as an asynchonus job, others job below in call in recurstion step.

- **Using backtrack return True -> prevent when find the solution (find điểm dừng) => luôn có điểm dừng cho đệ quy.**

```python
import math

class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        row, col = len(board), len(board[0])

        def isValid(row_index, col_index, val):
            # Duyệt dọc -> chạy row, Check in col_index
            for i in range(row):
                if board[i][col_index] == val:
                    return False

            # Duyện ngang -> chạy col, Check in row_index
            for j in range(col):
                if board[row_index][j] == val:
                    return False

            # Check in math.sqrt(row) * math.sqrt(col)
            box_start_row = 3 * (row_index // 3)
            box_start_col = 3 * (col_index // 3)
            for i in range(3):
                for j in range(3):
                    if board[box_start_row + i][box_start_col + j] == val:
                        return False

            return True

        def backtrack():
            for row_index in range(row):
                for col_index in range(col):
                    # Find "." and try [1 -> 9]
                    if board[row_index][col_index] == ".":
                        for val in range(1, 10):
                            # Precheck before assign
                            if isValid(row_index, col_index, str(val)):
                                board[row_index][col_index] = str(val)
                                # Asynchronus, find to the end of the table
                                if backtrack():
                                    return True
                                board[row_index][col_index] = "."
                        return False
            return True

        backtrack()
```

## 7. N-Queen

### 7.1. Requirement:

- Clear requirements

### 7.2. Example:

- Try to put N-queens into a table.

## 7.3. Algorithm:

- Put 1 queen first in row 0 first. Put another queens later.

- Step 1: Find '.'

- Step 2: Check valid

- Step 3: Backtrack

```python
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        board = [['.'] * n for _ in range(n)]
        res = []

        def isValid(row_index, col_index):
            # Check col
            for i in range(n):
                if board[i][col_index] == 'Q':
                    return False

            # Check upper-left diagonal (Only check upper row)
            i, j = row_index - 1, col_index - 1
            while i >= 0 and j >= 0:
                if board[i][j] == 'Q':
                    return False
                i -= 1
                j -= 1

            # Check upper-right diagonal
            i, j = row_index - 1, col_index + 1
            while i >= 0 and j < n:
                if board[i][j] == 'Q':
                    return False
                i -= 1
                j += 1
            return True

        def backtrack(row_index):
            if row_index == n:
                res.append(["".join(r) for r in board])
                return

            for col_index in range(n):
                # Step 1: Find '.'
                # Step 2: Check valid
                # Step 3: Backtrack
                if board[row_index][col_index] == '.':
                    if isValid(row_index, col_index):
                        board[row_index][col_index] = 'Q'
                        backtrack(row_index + 1)
                        board[row_index][col_index] = '.'

        backtrack(0)
        return res
```

## 8. Knight Move

## 9. Island

## 10. Max CPU Scheduling

## 11. Valid Parenthesis

## 12. Maximum Earnings From Taxi (Knapstack)

## 13. Coin Change (Unbounding Knapstack)

## 14. Generate Phone Numbers

## 15. Subset
