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
