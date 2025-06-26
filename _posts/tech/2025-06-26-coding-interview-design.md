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

## 3.1. Clarify requirements

- A man, a plan, a canal, Panama -> True

- Only count for alphabet

## 3.2. Idea:

- Two Pointer legendary question

## 3.3 Implement:

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
