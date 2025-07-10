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

---

## 5. Sudoku

### 5.1. Clarify requirements

- Solving Sudoku

### 5.2. Idea & Example

- Solution 1: Go to the empty block -> Try [1 -> 9] -> Check row, col, in square 3 x 3.

- After that -> BFS first the choice and continue to fill all the column.

### 5.3. Implement

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

## 6. N-Queen

### 6.1. Requirement:

- Clear requirements

### 6.2. Example:

- Try to put N-queens into a table.

## 6.3. Algorithm:

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

---

## 7. Minimum Knight Move (BFS)

### 7.1. Requirements

- Find minimum step for knight go from (0,0) -> (x,y)

### 7.2. Example:

- Using BFS to find knight move

### 7.3. Implement

- Step 1: Visit start, add queue + update visited

- Step 2: Visit neighbor, add queue + update visited

```python
from collections import deque

class Solution:
    def minStepToReachTarget(self, knightPos, targetPos, n):
        start = (knightPos[0], knightPos[1])
        target = (targetPos[0], targetPos[1])

        if start == target:
            return 0

        # Init
        visited = [[False for _ in range(n)] for _ in range(n)]
        queue = deque()

        # Visit start
        queue.append((knightPos[0], knightPos[1], 0))
        visited[knightPos[0]][knightPos[1]] = True

        # Directions
        directions = [
            (-2, -1), (-1, -2), (1, -2), (2, -1),
            (2, 1), (1, 2), (-1, 2), (-2, 1)
        ]

        def isValid(nx, ny):
            return 0 <= nx < n and 0 <= ny < n and not visited[nx][ny]


        while queue:
            x, y, steps = queue.popleft()

            # Visit neighbors
            for dx, dy in directions:
                nx, ny = x + dx, y + dy

                if isValid(nx, ny):
                    if (nx, ny) == target:
                        return steps + 1
                    # Visit neighbor
                    queue.append(nx, ny, steps + 1)
                    visited[nx][ny] = True

        return -1
```

## 8. Island (DFS)

### 8.1. Requirements

- Count number of components in matrix

### 8.2. Example

### 8.3. Implement

- Step 1: Find '1' and DFS from it.

- Step 2: Count number of components

```python
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        row, col = len(grid), len(grid[0])
        visited = [[False for _ in range(col)] for _ in range(row)]
        countNumIslands = 0

        def isValid(row_index, col_index):
            return 0 <= row_index < row and 0 <= col_index < col and not visited[row_index][col_index]


        def dfs(row_index, col_index):
            if not isValid(row_index, col_index) or grid[row_index][col_index] == "0":
                return

            # Visited it
            grid[row_index][col_index] = "0"
            visited[row_index][col_index] = True

            # DFS without backtrack
            dfs(row_index + 1, col_index)
            dfs(row_index - 1, col_index)
            dfs(row_index, col_index + 1)
            dfs(row_index, col_index - 1)


        for i in range(row):
            for j in range(col):
                if grid[i][j] == '1':
                    if isValid(i, j):
                        dfs(i, j)
                        countNumIslands += 1

        return countNumIslands

```

# 9. Surrounded Regions (DFS Border)

```python
class Solution:
    def solve(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        row, col = len(board), len(board[0])
        visited = [[False for _ in range(col)] for _ in range(row)]

        def isValid(row_index, col_index):
            return 0 <= row_index < row and 0 <= col_index < col and not visited[row_index][col_index]

        def dfs(row_index, col_index):
            if not isValid(row_index, col_index) or board[row_index][col_index] != "O":
                return

            # Visited it
            board[row_index][col_index] = "#"
            visited[row_index][col_index] = True

            # DFS without backtrack
            dfs(row_index + 1, col_index)
            dfs(row_index - 1, col_index)
            dfs(row_index, col_index + 1)
            dfs(row_index, col_index - 1)

        # DFS in borders
        for i in range(row):
            dfs(i, 0)
            dfs(i, col - 1)
        for j in range(col):
            dfs(0, j)
            dfs(row - 1, j)

        for i in range(row):
            for j in range(col):
                if board[i][j] == 'O':
                    board[i][j] = 'X'
                elif board[i][j] == '#':
                    board[i][j] = 'O'
```

---

## 10. Max CPU Load (Min Heap for End Time)

### 10.1. Requirements

Find the max CPU load the job overlap in the same time.

### 10.2. Example:

```python
Input: jobs[] = [{1, 4, 3}, {2, 5, 4}, {7, 9, 6}]
Output: 7

```

### 10.3. Implement

- Step 1: Init min heap

- Step 2: When come to start -> add (end, load) to queue, update max CPU load => use heap to keep the min end.

- Step 3: When come to end -> remove all tasks from the queue.

**Notes: Heap is sort in real-time.**

```python
import heapq

def find_max_cpu_load(jobs):
    sorted_jobs = sorted(jobs, key=lambda x:x[0]) # Sort by start time
    min_heap = [] # store (end, load)

    current_cpu_load = 0
    max_cpu_load = 0

    for job in sorted_jobs:
        start, end, load = job
m
        while min_heap and min_heap[0][0] <= start:
            ended_job = heapq.heappop(min_heap)
            current_cpu_load -= ended_job[1]

        # Push CPU load
        heapq.heappush(min_heap, (end, load))
        current_cpu_load += load

        # Max CPU load
        max_cpu_load = max(current_cpu_load, max_cpu_load)

    return max_cpu_load


jobs = [(1, 4, 3), (2, 5, 4), (7, 9, 6)]
print(find_max_cpu_load(jobs))
```

## 11. Task Scheduler (Max Heap)

### 11.1. Requirements

- Schedule jobs for CPU with each some must be wait for n time with same category.

### 11.2. Example

max_heap = [(-5, 'A'), (-2, 'B'), (-2, 'C')]
n = 2

Step 1:

    - Slot 1:

      Pop -5 → task A, run it

      New count = -4, push to temp

      cycle += 1

    - Slot 2:
      Pop -2 → task B, run it

      New count = -1, push to temp

      cycle += 1

    - Slot 3:
      Pop -2 → task C, run it

Current: max_heap = [-4, -1, -1]

...

### 11.3. Implement

- Using max heap to prior complete the long task first.

```python
from collections import Counter
import heapq

class Solution:
    def leastInterval(self, tasks, n):
        tasksCount = Counter(tasks)
        maxHeap = [-count for count in tasksCount.values()]
        heapq.heapify(maxHeap)
        process_time = 0

        while maxHeap:
            coolDownTasks = []
            steps = 0
            # Each cycle
            for _ in range(n + 1):
                if maxHeap:
                    max_workload_jobs = heapq.heappop(maxHeap)
                    if max_workload_jobs + 1 < 0:
                        coolDownTasks.append(max_workload_jobs + 1)
                    steps += 1
                elif coolDownTasks:
                    # idle jobs
                    steps += 1

            for remaining_task in coolDownTasks:
                heapq.heappush(maxHeap, remaining_task)

            process_time += steps

        return process_time
```

## 12. Customer - Employee Multitasks

Idea:

- Step 1: If customer come before time -> add to queue.

- Step 2: Process all employee by priority > arrival > execute > id.

- Step 3: If all employee to busy need to update time

```python
import heapq

def serve_customers(customers, num_employees):
    # Step 1: Sort by arrival
    customers.sort(key=lambda c: c['arrival'])

    time = 0
    i = 0
    n = len(customers)
    waiting_customers = []  # (priority, arrival, execute, id)
    busy_employees = []     # (available_time, employee_id)
    result = []
    last_finish_time = 0  # Track the time when last customer finishes

    # All employees available at t = 0
    for eid in range(num_employees):
        heapq.heappush(busy_employees, (0, eid))

    while i < n or waiting_customers:
        # Step 2: Enqueue all customers who have arrived
        while i < n and customers[i]['arrival'] <= time:
            c = customers[i]
            heapq.heappush(waiting_customers, (c['priority'], c['arrival'], c['execute'], c['id']))
            i += 1

        # Step 3: Assign available employees
        while waiting_customers and busy_employees and busy_employees[0][0] <= time:
            _, eid = heapq.heappop(busy_employees)
            priority, arrival, cid, execute = heapq.heappop(waiting_customers)
            result.append(cid)
            end_time = time + execute
            last_finish_time = max(last_finish_time, end_time)
            heapq.heappush(busy_employees, (end_time, eid))  # employee busy until this time

        # Step 4: Advance time
        if waiting_customers and (not busy_employees or busy_employees[0][0] > time):
            time = min(busy_employees[0][0], customers[i]['arrival'] if i < n else float('inf'))
        elif not waiting_customers and i < n:
            time = customers[i]['arrival']
        elif not waiting_customers and not busy_employees:
            break
        else:
            time += 1

    return result, last_finish_time

customers = [
    {"id": 1, "arrival": 0, "execute": 3, "priority": 2},
    {"id": 2, "arrival": 1, "execute": 2, "priority": 1},
    {"id": 3, "arrival": 1, "execute": 1, "priority": 1},
    {"id": 4, "arrival": 2, "execute": 4, "priority": 3}
]

result, total_time = serve_customers(customers, num_employees=2)
print("Order:", result)         # e.g., [3,1,2,4]
print("Total time:", total_time)  # e.g., 7
```

## 13. Single-Threaded CPU

```python
import heapq
from typing import List

class Solution:
    def getOrder(self, tasks: List[List[int]]) -> List[int]:
        # Step 1: Add original index and sort tasks by start_time, then execute_time
        tasks = [(task[0], task[1], i) for i, task in enumerate(tasks)]  # (start_time, process_time, index)
        tasks.sort(key=lambda x: (x[0], x[1]))  # Sort by start_time, then process_time

        waiting_tasks = []
        res = []
        i = 0
        n = len(tasks)
        time = 0

        while i < n or waiting_tasks:
            # Push all tasks available at current time into the heap
            while i < n and tasks[i][0] <= time:
                heapq.heappush(waiting_tasks, (tasks[i][1], tasks[i][2]))  # (process_time, index)
                i += 1

            if waiting_tasks:
                process_time, index = heapq.heappop(waiting_tasks)
                time += process_time
                res.append(index)
            else:
                time = tasks[i][0]

        return res

```

## 14. Meeting Room 2 (Allocate Meeting or Jobs != Priority Order)

```python
from typing import List
import heapq

# Definition of Interval
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end

class Solution:
    def minMeetingRooms(self, intervals: List[Interval]) -> int:
        if not intervals:
            return 0

        intervals.sort(key=lambda x: x.start)

        min_heap = []

        for meeting in intervals:
            if min_heap and min_heap[0] <= meeting.start:
                heapq.heappop(min_heap)

            heapq.heappush(min_heap, meeting.end)

        return len(min_heap)

```

---

## 15. Capacity to Ship Packages Within D Days (Greedy)

### 15.1. Requirements

- Maximum of the ship capacity -> load all the pakage in D days.

### 15.2. Idea & Example (Idea High-level is important, important freely)

- Ship capacity: [max(arr), sum(arr)]

- With the capacity -> How to check the valid

- Idea: Start increasing packages to the ship -> whether is <= days.

### 15.3. Idea

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

## 16. Maximum Profit in Job Scheduling (Knapstack, choose only 1)

Idea:

- dp[i]: The maximum profit considering the first i jobs.

- Two choices:

  - Skip the current job → take dp[i - 1]

  - Take the current job → profit becomes dp[idx] + p

```python
from bisect import bisect_right

class Solution:
    def jobScheduling(self, startTime, endTime, profit):
        # Combine all job info
        jobs = sorted(zip(startTime, endTime, profit), key=lambda x: x[1])  # sort by endTime
        n = len(jobs)

        # dp[i]: max profit until taking to first i jobs
        dp = [0] * (n + 1)
        end_times = [job[1] for job in jobs]

        for i in range(1, n + 1):
            s, e, p = jobs[i - 1]

            # Find the last job that ends before this one starts
            idx = bisect_right(end_times, s, lo=0, hi=i-1)  # binary search
            dp[i] = max(dp[i - 1], dp[idx] + p)

        return dp[n]

```

## 17. Maximum Earnings From Taxi (Knapstack)

Each ride is an item:

    - "Weight" = time interval [start, end]

    - "Value" = profit = end - start + tip

You either:

    - Take the ride (if it doesn't overlap with previous ones), or

    - Skip it

- Step 1: Duyệt từ (1, n + 1) -> d[i]
- Step 2: Compare max(dp[i - 1], d[latest_start - 1] + current_profix)

```python
from bisect import bisect_right

class Solution:
    def maxTaxiEarnings(self, n: int, rides: List[List[int]]) -> int:
        rides.sort(key=lambda x: x[1])
        m = len(rides)

        # Extract end times for binary search
        i
        dp = [0] * (m + 1)

        for i in range(1, m + 1):
            start, end, tip = rides[i - 1]
            earnings = end - start + tip

            # Find the last ride that ends <= current ride's start
            idx = bisect_right(end_times, start, lo=0, hi=i - 1)
            # Two choices: take current ride or skip
            dp[i] = max(dp[i - 1], dp[idx] + earnings)

        return dp[m]
```

## 18. Coin Change 2 (Unbounding Knapstack)

```python
from typing import List

class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        dp = [0] * (amount + 1)
        dp[0] = 1  # There's 1 way to make amount 0 (pick nothing)

        for coin in coins:
            for i in range(coin, amount + 1):
                dp[i] += dp[i - coin]

        return dp[amount]

```

### 19. Work Break

```python
from typing import List

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        word_set = set(wordDict)
        n = len(s)
        dp = [False] * (n + 1)
        dp[0] = True  # Empty string is always valid

        for i in range(1, n + 1):
            for j in range(i):
                if dp[j] and s[j:i] in word_set:
                    dp[i] = True
                    break

        return dp[n]
```

## 20. Combination Sum IV (Count permutation -> Auto use Unknapstack Problem)

```python
from typing import List

class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        dp = [0] * (target + 1)
        dp[0] = 1  # There's one way to make 0 — choose nothing

        for total in range(1, target + 1):
            for num in nums:
                if total >= num:
                    dp[total] += dp[total - num]

        return dp[target]

```

## 21. Knapstack Problem

weights = [1, 3, 4, 5]
values = [1, 4, 5, 7]
W = 7
n = 4

```python
def knapsack_01(weights, values, W):
    n = len(weights)
    # dp[i][w]: max value using first i items with capacity w
    dp = [[0] * (W + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        wt = weights[i - 1]
        val = values[i - 1]
        for w in range(W + 1):
            if wt > w:
                dp[i][w] = dp[i - 1][w]  # can't include
            else:
                dp[i][w] = max(dp[i - 1][w], dp[i - 1][w - wt] + val)

    return dp[n][W]

```

## 22. Target Sum

- You select it in 2 subset P(Positive) or N(Negative) -> sum(P)−sum(N)=target

=> sum(P) = (target + totalSum) / 2

```python
from typing import List

class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        total = sum(nums)
        if (target + total) % 2 != 0 or total < abs(target):
            return 0

        subset_sum = (target + total) // 2

        # Way to get subset_sum
        dp = [0] * (subset_sum + 1)
        dp[0] = 1  # There's 1 way to reach sum 0 — pick nothing

        for num in nums:
            for s in range(subset_sum, num - 1, -1):  # 0/1 Knapsack => go backward
                dp[s] += dp[s - num]

        return dp[subset_sum]

```

![](/images/dynamic_programming.png)
​

- **Knapstack 0/1:**

```bash
dp[i][w] = max(
    dp[i-1][w],                        # Don't take current item
    dp[i-1][w - weights[i]] + values[i]  # Take current item
)
```

```bash
for i in range(n):
    for w in range(W, weights[i] - 1, -1):  # Go backward
        dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

```

- Example

```python
def canPartition(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False
    target = total // 2

    dp = [False] * (target + 1)
    dp[0] = True

    for num in nums:
        for s in range(target, num - 1, -1):  # Go backward
            dp[s] = dp[s] or dp[s - num]

    return dp[target]

```

- **Unbounded Knapsack**

```bash
dp[w] = max(
    dp[w],
    dp[w - weight[i]] + value[i]  # take it again
)
```

```bash
for i in range(n):
    for w in range(weight[i], W + 1):  # Go forward
        dp[w] = max(dp[w], dp[w - weight[i]] + value[i])
```

- Example

```python
def change(amount, coins):
    dp = [0] * (amount + 1)
    dp[0] = 1

    for coin in coins:
        for a in range(coin, amount + 1):  # Go forward
            dp[a] += dp[a - coin]

    return dp[amount]

```

- **Multi-Dimensional Knapsack**

```bash
dp[w][v] = max(
    dp[w][v],
    dp[w - weight[i]][v - volume[i]] + value[i]
)
```

```bash
for i in range(n):
    for w in range(W, weight[i] - 1, -1):
        for v in range(V, volume[i] - 1, -1):
            dp[w][v] = max(dp[w][v], dp[w - weight[i]][v - volume[i]] + value[i])
```

- Example

```python
def findMaxForm(strs, m, n):
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for s in strs:
        zero = s.count('0')
        one = s.count('1')

        for i in range(m, zero - 1, -1):
            for j in range(n, one - 1, -1):
                dp[i][j] = max(dp[i][j], dp[i - zero][j - one] + 1)

    return dp[m][n]
```

## 24. Unbounded Knapstack Problem

Input:

- weights = [2, 3, 4]
- values = [5, 7, 8]
- W = 10

Output: 25

```python
def unbounded_knapsack(W, weights, values):
    n = len(weights)
    dp = [0] * (W + 1)

    for w in range(W + 1):
        for i in range(n):
            if weights[i] <= w:
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[W]

```

**Notes:** Cứ profit + subset + coin change -> Auto dynamic programming.

---

## 25. Valid Parenthesis

```python
class Solution:
    def isValid(self, s: str) -> bool:
        mapping = {'(': ')', '{': '}', '[': ']'}
        stack = []

        for char in s:
            if char in mapping:
                stack.append(char)
            else:
                if not stack:
                    return False

                top = stack.pop()
                if char != mapping[top]:
                    return False

        return not stack

```

## 26. Evaluate Reverse Polish Notation

- Note: b trước, a sau

```python
class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        for token in tokens:
            if token in {"+", "-", "*", "/"}:
                # b first, a later
                b = stack.pop()
                a = stack.pop()
                if token == "+":
                    stack.append(a + b)
                elif token == "-":
                    stack.append(a - b)
                elif token == "*":
                    stack.append(a * b)
                else:
                    stack.append(int(a / b))
            else:
                stack.append(int(token))

        return stack.pop() if stack else 0
```

## 27. Basic Calculator II

**Magic here:** ch = '_': previous sign = '+' → push 2 → stack = [3, 2], update sign = '_'

```python
class Solution:
    def calculate(self, s: str) -> int:
        stack = []
        num = 0
        sign = '+'  # Initially assume the number is positive
        s = s.replace(" ", "")  # Remove spaces for easier parsing

        for i, ch in enumerate(s):
            if ch.isdigit():
                num = num * 10 + int(ch)
            if not ch.isdigit() or i == len(s) - 1:
                if sign == '+':
                    stack.append(num)
                elif sign == '-':
                    stack.append(-num)
                elif sign == '*':
                    stack.append(stack.pop() * num)
                elif sign == '/':
                    stack.append(int(stack.pop() / num))  # truncate toward zero
                # ch = '*': previous sign = '+' → push 2 → stack = [3, 2], update sign = '*'
                sign = ch
                num = 0

        return sum(stack)

```

## 28. Basic Calculator

- Magic:

  - We think recursively for () in evaluate expression: num = helper(chars) # Evaluate inside parentheses

```python
class Solution:
    def calculate(self, s: str) -> int:
        def helper(chars: list) -> int:
            stack = []
            num = 0
            sign = '+'  # Start with '+' as default operator

            while chars:
                ch = chars.pop(0)

                if ch.isdigit():
                    num = num * 10 + int(ch)

                if ch == '(':
                    num = helper(chars)  # Evaluate inside parentheses

                # If current char is an operator or end of expression
                if (not ch.isdigit() and ch != ' ') or not chars:
                    if sign == '+':
                        stack.append(num)
                    elif sign == '-':
                        stack.append(-num)
                    elif sign == '*':
                        stack.append(stack.pop() * num)
                    elif sign == '/':
                        prev = stack.pop()
                        # Python's int division truncates toward zero
                        stack.append(int(prev / num))
                    sign = ch
                    num = 0

                if ch == ')':
                    break

            return sum(stack)

        return helper(list(s))

```

## 29. Next Greater Element

- **Idea: Using stack to reverse data structure**

```python
class Solution:
    def nextGreaterElements(self, nums: List[int]) -> List[int]:
        nums2 = nums + nums
        n = len(nums2)

        # Init a stack
        stack = []

        # Result array
        res = [0] * n

        # Loop from the end of the array
        # Use stack for reserved order
        for i in range(n - 1, -1, -1):
            #  Remove all smaller elements in stack
            while stack and stack[-1] <= nums2[i]:
                stack.pop()

            # Update value
            if stack:
                res[i] = stack[-1]
            else:
                res[i] = -1

            stack.append(nums2[i])

        return res[:len(nums)]
```

---

## 28. Generate Phone Numbers

```python
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        digitMapping = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz"
        }

        res = []

        # Calculate in the backtrack function
        def backtrack(index, path):
            if index == len(digits):
                res.append(path[:])
                return

            keyboardChar = digitMapping[digits[index]]
            for char in keyboardChar:
                # Move the logic to backtrack function too
                backtrack(index + 1, path + char)

        backtrack(0, "")
        return res if digits != "" else []

```

## 29. Subset

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = []
        n = len(nums)

        def backtrack(index, path):
            if index == n:
                res.append(path[:])
                return

            backtrack(index + 1, path + [nums[index]])
            backtrack(index + 1, path)

        backtrack(0, [])
        return res
```

## 30. Combination Sum

```python
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        res = []
        n = len(candidates)
        def backtrack(index, path, remainingSum):
            if remainingSum == 0:
                res.append(path[:])
                return

            if index == n or remainingSum < 0:
                return

            path.append(candidates[index])
            backtrack(index, path, remainingSum - candidates[index])
            path.pop()
            backtrack(index + 1, path, remainingSum)

        backtrack(0, [], target)
        return res
```

---
