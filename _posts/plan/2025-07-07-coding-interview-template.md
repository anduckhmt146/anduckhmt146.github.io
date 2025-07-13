---
layout: post
title: Coding Interview Template
date: 2025-07-07
categories: plan
---

Here is the template for coding interview patterns

# 1. Two Pointer

![](/images/Coding-Interview/two-pointer-pattern.png)

## 1.1. Go in the opposite

- Step 1: Giống binary search nhưng mà không dùng mid

Sample:

```python
def twoSum(nums, target):
  left, right = 0, len(nums) - 1

  while left < right:
    current_sum = nums[left] + nums[right]
    if current_sum == target:
        return True

    if current_sum < target:
        left += 1
    else:
        right -= 1

  return False
```

## 1.2. 3-Sum (Keep one number -> 2-Sum):

- Step 1: Keep nums[i] and follow 2 sum pattern.

Sample:

```python
class Solution:
    def triangleNumber(self, nums: List[int]):
        nums.sort()
        n = len(nums)

        count = 0

        for end in range(n - 1, -1, -1):
            target = nums[end]
            left, right = 0, end - 1

            while left < right:
                curr_sum = nums[left] + nums[right]

                if curr_sum > target:
                    count += right - left # Node here (Keep right)
                    right -= 1
                else:
                    left += 1

        return count
```

## 1.3. Go in the same

- Step 1: Go from left to right.

- Step 2: Init nextNonDup.

- Step 3: If meet condition => Increase nextNonDup in condition.

```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        nextNonDup = 0
        n = len(nums)

        for i in range(n):
            if i == 0 or nums[i] != nums[nextNonDup - 1]:
                nums[nextNonDup] = nums[i]
                nextNonDup += 1

        return nextNonDup
```

## 1.4. Swapping

### 1.4.1. Swap to back

- Step 1: Go from left to right.

- Step 2: Init nextNonZeros.

- Step 3: If meet nums[i] == 0 => Swap it back => Increase nextNonZeros in condition.

```python
class Solution:
    def moveZeroes(self, nums: List[int]):
        n = len(nums)
        nextNonZeros = 0

        for i in range(n):
            if nums[i] != 0:
                nums[i], nums[nextNonZeros] = nums[nextNonZeros], nums[i]
                nextNonZeros += 1

        return nums
```

### 1.4.2. Swap back and front

- Step 1: Go from left and right, init counter i

- Step 2: If get nums[i] == 0 => Swap left, if get nums[i] == 1, increase i += 1. Only i += 1 when swap left

- Step 3: If get nums[i] == 2, swap to right.

```python
class Solution:
    def sortColors(self, nums: List[int]):
        left, right = 0, len(nums) - 1
        i = 0

        while i <= right:
            if nums[i] == 0:
                nums[i], nums[left] = nums[left], nums[i]
                left += 1
                i += 1
            elif nums[i] == 1:
                i += 1
            else:
                nums[i], nums[right] = nums[right], nums[i]
                right -= 1

        return nums
```

## 1.5. Trapping water

- Step 1: Count the gap between left and right.
- Step 2: Count value by leftMax and rightMax.

```python
class Solution:
    def trappingWater(self, heights: List[int]):
        if not heights:
            return 0
        left, right = 0, len(heights) - 1
        leftMax, rightMax = heights[left], heights[right]
        count = 0

        while left < right:
            if rightMax > leftMax:
                left += 1
                if heights[left] > leftMax:
                    leftMax = heights[left]
                else:
                    count += leftMax - heights[left]
            else:
                right -= 1
                if heights[right] > rightMax:
                    rightMax = heights[right]
                else:
                    count += rightMax - heights[right]

        return count
```

# 2. Sliding Window

![](/images/Coding-Interview/sliding-window-pattern.png)

## 2.1. Fixed-size k elements

- Step 1: Loop end pointer.

- Step 2: Counting

- Step 3: Prunning when end - start + 1 = k.

- Step 4: Update max_len in loop.

```python
class Solution:
    def maxSum(self, nums: List[int], k: int):
        state = 0
        start = 0
        max_sum = 0

        for end in range(len(nums)):
            state += nums[end]

            # Prunning
            if end - start + 1 == k:
                # Update max here
                max_sum = max(max_sum, state)
                state -= nums[start]
                start +=1

        return max_sum
```

## 2.2. Prunning k distincts

- Step 1: Loop end pointer.

- Step 2: Counting.

- Step 3: Prunning from start when reach the length => Increase start.

- Step 4: Find maximum outside the loop.

Sample:

```python
class Solution:
    def longestSubstringWithoutRepeat(self, s: str):
        k = 1

        # Init start
        start = 0
        state = {}
        n = len(s)
        max_len = 0

        # Loop end
        for end in range(n):
            # Counting
            state[s[end]] = state.get(s[end], 0) + 1
            while state[s[end]] > k:
                state[s[start]] -= 1
                if state[s[start]] == 0:
                    del state[s[start]]
                start += 1

            max_len = max(max_len, end - start + 1)

        return max_len
```

## 2.3. Min/Max in range k

- Step 1: Loop end pointer.

- Step 2: Counting

- Step 3: Prunning when reach the condition including max_freq, (e.g. end - start + 1 - max_freq > k) => Increase start.

- Step 4: Find max_len outside.

```pythonclass Solution:
    def characterReplacement(self, s: str, k: int):
        state = {}
        start = 0
        max_len = 0
        max_freq = 0

        # Loop end
        for end in range(len(s)):
            state[s[end]] = state.get(s[end], 0) + 1
            max_freq = max(max_freq, state[s[end]])
            while (end - start + 1 - max_freq) > k:
                state[s[start]] -= 1
                if state[s[start]] == 0:
                    del(state[s[start]])
                start += 1

            max_len = max(max_len, end - start + 1)

        return max_len
```

## 2.4. Merge 2 type

- Step 1: Priority fixed-size length k.

- Step 2: Prunning when end - start + 1 == k

- Step 3: Subarray length k => Handle state count in when end - start + 1 == k.

- Step 4: Subarray length k => Update max event in loop when len(state) == k

```python
class Solution:
    def maxSum(self, nums: List[int], k: int):
        state = {}
        curr_sum = 0

        start = 0
        max_sum = 0

        for end in range(len(nums)):
            state[nums[end]] = state.get(nums[end], 0) + 1
            curr_sum += nums[end]

            # Prunning
            if end - start + 1 == k:
                if len(state) == k:
                    # Update max here
                    max_sum = max(max_sum, curr_sum)

                curr_sum -= nums[start]
                state[nums[start]] -= 1
                if state[nums[start]] == 0:
                    del(state[nums[start]])

                start += 1

        return max_sum
```

# 3. Linked List

![](/images/Coding-Interview/linked-list-pattern.png)

## 3.1. Fast & Slow Pointer (Middle Of Linked List)

- Step 1: Init slow and fast to head

- Step 2: Điều kiện fast & fast.next.next

```python
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow = head
        fast = head

        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next
            if slow == fast:
                return True

        return False
```

## 3.2. Reversed Linked List

- Step 1: Using prev = None and current = head.

- Step 2: Assign curr->next = prev, assign by order: prev = current, current = next.

```python
def reverse(head):
  prev = None
  current = head
  while current:
    next_ = current.next
    current.next = prev
    prev = current
    current = next_

  return prev
```

## 3.3. Merge 2 Linked List

- Step 1: Init head.

- Step 2: Assign head to head of l1 or head of l2.

- Step 3: Using tail = head, using tail to transfer the 2 linked list.

```python
def merge_lists(l1, l2):
  if not l1: return l2
  if not l2: return l1

  if l1.val < l2.val:
    head = l1
    l1 = l1.next
  else:
    head = l2
    l2 = l2.next

  tail = head
  while l1 and l2:
    if l1.val < l2.val:
      tail.next = l1
      l1 = l1.next
    else:
      tail.next = l2
      l2 = l2.next
    tail = tail.next

  tail.next = l1 or l2
  return head
```

## 3.4. Dummny Node With New Array

- Step 1: Using dummy node to keep head.

- Step 2: Using current = head to transfer.

- Step 3: while current and current = current.next

```python
def findLength(head):
  length = 0
  current = head
  while current:
    length += 1
    current = current.next
  return length
```

## 3.5. Delete Node Kth in Linked List

- Step 1: Using current and prev

- Step 2: Read from prev to curr:

  - prev = curr
  - curr = curr -> next

- Step 3: If find value curr.val == target => prev.next = curr.next (skip curr node)

```python
def deleteNode(head, target):
  if head.val == target:
    return head.next

  prev = None
  curr = head

  while curr:
    if curr.val == target:
      prev.next = curr.next
      break
    prev = curr
    curr = curr.next

  return head
```

# 4. Stack

![](/images/Coding-Interview/stack-pattern.png)

## 4.1. Calculate expresion with "()"

- Step 1: Idea to calculate all the sum of stack.

- Step 2: Assign default sign = '+' => If meet negative -3 + 2

  - First sign = '+' num = 0 => Add 0 to stack and sign = '-'

  - When meet the second '+' => it append -3 to stack

  - Next character ch = '2' → updates num = 2.

  - No more characters → final operation triggere => sign = '+' → stack.append(2)

- Step 3: If meet '(' => recursive to count sum and break when meet ')'.

```python
class Solution:
    def calculate(self, s: str) -> int:
        def helper(chars):
            num = 0
            sign = '+'
            stack = []
            while chars:
                ch = chars.pop(0)

                if ch.isdigit():
                    num = num * 10 + int(ch)

                if ch == '(':
                    num = helper(chars)

                # not digit -> sign or not chars
                if ch in '+-*/)' or not chars:
                    if sign == '+':
                        stack.append(num)
                    elif sign == '-':
                        stack.append(-num)
                    elif sign == '*':
                        stack.append(stack.pop() * num)
                    elif sign == '/':
                        prev = stack.pop()
                        stack.append(int(prev / num))  # Truncate toward zero

                    sign = ch
                    num = 0

                    if ch == ')':
                        break

            return sum(stack)

        return helper(list(s))
```

## 4.2. Evaluation of Postfix Expression

- Step 1: If meet digit build it.

- Step 2: If you find the character => calculate and add to stack

- Step 3: Using stack sau / track trước

```python
def evaluate_postfix(expression):
    stack = []
    tokens = expression.split()

    for token in tokens:
        if token.isdigit():
            stack.append(int(token))
        else:
            b = stack.pop()
            a = stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            elif token == '/':
                stack.append(int(a / b))  # Integer division

    return stack[0]
```

## 4.3. Monolithic Stack

- Step 1: Loop from left to right, append i to stack.

- Step 2: if nums[i] > nums[stack[-1]] => Update index of the greater element of the last stack is nums[i]

```python
def nextGreaterElement(nums):
  n = len(nums)
  result = [-1] * n
  stack = []

  for i in range(n):
    while stack and nums[i] > nums[stack[-1]]:
      idx = stack.pop()
      result[idx] = nums[i]
    stack.append(i)

  return result
```

## 4.4. Longest Valid Parenthesis

- Step 1: If find '(' add to stack.

- Step 2: Else check prefix is '(' => pop the stack => Update max.

- Step 3: Else append it to stack.

```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        max_len = 0
        # Magic here to trick case ()
        # Store last index of '('
        stack = [-1]

        for i, char in enumerate(s):
            if char == '(':
                stack.append(i)
            else:
                stack.pop()
                if stack:
                   max_len = max(max_len, i - stack[-1])
                else:
                    stack.append(i)

        return max_len
```

# 5. CPU Scheduling

![](/images/Coding-Interview/cpu-scheduling-pattern.png)

## 5.1. Non-preemptive scheduling

### 5.1.1. SJF - Shortest Job First

- Step 1: Sort by start_time, init time, schedule.

- Step 2: Init ready tasks.

- Step 3: Init when i < n or ready tasks.

- Step 4: while i < n and tasks[i]['arrival_time'] <= time => Push to ready heap => Order by burst_time (tasks[i]['burst_time'],...)

- Step 5: If ready have tasks => Process it. Else time = start of the tasks.

```python
import heapq

def sjf(tasks):
    tasks.sort(key=lambda x:x['arrival_time'])

    # Base
    time = 0
    schedule = []

    # Add them
    i = 0
    ready = []
    n = len(tasks)

    while i < n or ready:
        while i < n and tasks[i]['arrival_time'] <= time:
            heapq.heappush(ready, (tasks[i]['burst_time'], tasks[i]['arrival_time'], tasks[i]['pid'], tasks[i]))
            i += 1

        if ready:
            _, _, _, task = heapq.heappop(ready)
            start_time = time
            end_time = start_time + task['burst_time']
            schedule.append((task['pid'], start_time, end_time))
            time = end_time
        else:
            time = tasks[i]['arrival_time']

    return schedule

# Sample test case
tasks = [
    {'pid': 'P1', 'arrival_time': 0, 'burst_time': 8},
    {'pid': 'P2', 'arrival_time': 1, 'burst_time': 4},
    {'pid': 'P3', 'arrival_time': 2, 'burst_time': 9},
    {'pid': 'P4', 'arrival_time': 3, 'burst_time': 5}
]

result = sjf(tasks)
for pid, start, end in result:
    print(f"Task {pid}: Start at {start}, End at {end}")
```

### 5.1.2. Priority Scheduling

- Step 1: Sort by start_time, init time, schedule.

- Step 2: Init ready tasks.

- Step 3: Init when i < n or ready tasks.

- Step 4: while i < n and tasks[i]['arrival_time'] <= time => Push to ready heap => Order by (tasks[i]['priority'],...)

- Step 5: If ready have tasks => Process it. Else time = start of the tasks.

```python
import heapq

def priority_scheduling(tasks):
    # Sort by arrival time first
    tasks.sort(key=lambda x: x['arrival_time'])

    time = 0
    i = 0
    n = len(tasks)
    schedule = []
    ready = []

    while i < n or ready:
        # Push all tasks that have arrived into the ready queue
        while i < n and tasks[i]['arrival_time'] <= time:
            task = tasks[i]
            heapq.heappush(ready, (task['priority'], task['arrival_time'], task['pid'], task))
            i += 1

        if ready:
            _, _, _, task = heapq.heappop(ready)
            start = time
            end = start + task['burst_time']
            schedule.append((task['pid'], start, end))
            time = end
        else:
            # If no task is ready, jump to the next arrival
            time = tasks[i]['arrival_time']

    return schedule

tasks = [
    {'pid': 'P1', 'arrival_time': 0, 'burst_time': 10, 'priority': 3},
    {'pid': 'P2', 'arrival_time': 2, 'burst_time': 5,  'priority': 1},
    {'pid': 'P3', 'arrival_time': 1, 'burst_time': 8,  'priority': 2},
    {'pid': 'P4', 'arrival_time': 3, 'burst_time': 6,  'priority': 4}
]

result = priority_scheduling(tasks)

for pid, start, end in result:
    print(f"Task {pid}: Start at {start}, End at {end}")
```

### 5.1.3. FCFS - First Come First Serve

- Step 1: Sort by start_time, init time, schedule.

- Step 2: Loop task in tasks.

- Step 3: Update schedule.

- Step 4: Update time = curr_time + burst_time, time = end_time.

- Step 5: if time < task['arrival_time']: time = task['arrival_time']

```python
def fcfs(tasks):
    # Task
    tasks.sort(key=lambda x:x['arrival_time'])

    # Time
    time = 0
    schedule = []

    for task in tasks:
        if time < task['arrival_time']:
            time = task['arrival_time']

        start_time = time
        end_time = time + task['burst_time']
        schedule.append((task['pid'], start_time, end_time))
        time = end_time

    return schedule


tasks = [
    {'pid': 'P1', 'arrival_time': 0, 'burst_time': 5},
    {'pid': 'P2', 'arrival_time': 1, 'burst_time': 3},
    {'pid': 'P3', 'arrival_time': 2, 'burst_time': 1},
]
print(fcfs(tasks))
```

### 5.1.4. Max CPU Load

- Step 1: Init time, schedule.

- Step 2: For job in jobs

- Step 3: Auto add jobs to queue => count max_cpu_load outside.

- Step 4: While time have pass end tasks => pop it out heap

```python
import heapq

def find_max_cpu_load(jobs):
    # Sort jobs
    jobs.sort(key=lambda x:x[0])
    process_tasks = []

    # CPU load
    max_cpu_load = 0
    curr_cpu_load = 0

    for job in jobs:
        start, end, load = job

        while process_tasks and process_tasks[0][0] <= start:
            processed_job = heapq.heappop(process_tasks)
            curr_cpu_load -= processed_job[1]

        # Append to jobs to queue by start_time
        heapq.heappush(process_tasks, (end, load))

        # Update max_cpu_load
        curr_cpu_load += load
        max_cpu_load = max(max_cpu_load, curr_cpu_load)

    return max_cpu_load

jobs = [(1, 4, 3), (2, 5, 4), (7, 9, 6)]
print(find_max_cpu_load(jobs))
```

## 5.2. Preemptive scheduling

### 5.2.1. SRTF - Shortest Remaining Time First (SJF + Remaining)

- Step 1: Sort by start_time, init time, schedule, add 'remaining': t['burst_time'].

- Step 2: Init ready tasks, priority by remaining time.

- Step 3: Init completed = 0, last_pid => to detect when the running process has changed, start_time => marks when a process starts (or resumes) execution

- Step 4: Loop when completed < n or ready.

- Step 5: While i < n and tasks[i]['arrival_time'] <= time => Add 'remaining_time' to tasks.

- Step 6: If ready => task['remaining'] -= 1, time += 1, update last_pid.

- Step 7: if pid != last_pid, next task is the last_pid but last_pid is not None => add the remaining tasks last_pid to heap.

```python
import heapq

def srtf(tasks):
    # Preprocess: add 'remaining' field and sort by arrival
    tasks = sorted([{**t, 'remaining': t['burst_time']} for t in tasks], key=lambda x: x['arrival_time'])

    time = 0
    i = 0
    n = len(tasks)
    ready = []  # (remaining_time, arrival_time, pid, task)
    schedule = []

    completed = 0
    last_pid = None
    start_time = None

    while completed < n or ready:
        # Push all tasks that have arrived into the ready
        while i < n and tasks[i]['arrival_time'] <= time:
            task = tasks[i]
            heapq.heappush(ready, (task['remaining'], task['arrival_time'], task['pid'], task))
            i += 1

        if ready:
            _, _, pid, task = heapq.heappop(ready)

            if pid != last_pid:
                # Job cu chua xong
                if last_pid is not None:
                    schedule.append((last_pid, start_time, time))
                start_time = time
                last_pid = pid

            # Execute task for 1 time unit
            task['remaining'] -= 1
            time += 1

            if task['remaining'] > 0:
                heapq.heappush(ready, (task['remaining'], task['arrival_time'], task['pid'], task))
            else:
                completed += 1
                schedule.append((pid, start_time, time))
                last_pid = None
        else:
            time += 1

    return schedule

tasks = [
    {'pid': 'P1', 'arrival_time': 0, 'burst_time': 8},
    {'pid': 'P2', 'arrival_time': 1, 'burst_time': 4},
    {'pid': 'P3', 'arrival_time': 2, 'burst_time': 9},
    {'pid': 'P4', 'arrival_time': 3, 'burst_time': 5}
]

for pid, start, end in srtf(tasks):
    print(f"Task {pid}: Start at {start}, End at {end}")
```

### 5.2.2. Round Robin (FCFS + Remaining)

- Step 1: Sort by start_time, init time, schedule, add 'remaining': t['burst_time'].

- Step 2: Init completed = 0, ready => different than FCFS because to store remaining tasks.

- Step 3: while completed < n or ready

- Step 4: while i < n and tasks[i]['arrival_time'] <= time => ready.append(tasks[i]).

- Step 5: If ready handle tasks + push remaning tasks to queue => schedule.append((task['pid'], start_time, time + min(quantum, task['remaining'])))

- Step 6: Remember to push tasks come from the time while the current tasks is executed => while i < n and tasks[i]['arrival_time'] <= time => ready.append(tasks[i])

- Step 7: Count completed += 1 when the tasks in compleeted.

- Step 8: If not is queue => time = tasks[i]['arrival_time'].

```python
from collections import deque

def round_robin(tasks, quantum):
    # Add remaining time to each task
    tasks = sorted([{**t, 'remaining': t['burst_time']} for t in tasks], key=lambda x: x['arrival_time'])

    time = 0
    schedule = []


    i = 0  # Index for incoming tasks
    n = len(tasks)

    completed = 0
    ready = deque()

    while completed < n or ready:
        # Enready tasks that have arrived
        while i < n and tasks[i]['arrival_time'] <= time:
            ready.append(tasks[i])
            i += 1

        if ready:
            task = ready.popleft()

            start_time = time
            duration = min(quantum, task['remaining'])
            time += duration
            task['remaining'] -= duration
            schedule.append((task['pid'], start_time, time))

            # But while that task was executing, new tasks might have arrived
            while i < n and tasks[i]['arrival_time'] <= time:
                ready.append(tasks[i])
                i += 1

            # If not finished, push back to ready
            if task['remaining'] > 0:
                ready.append(task)
            else:
                completed += 1
        else:
            # No ready task, jump to the next arrival time
            if i < n:
                time = tasks[i]['arrival_time']

    return schedule

tasks = [
    {'pid': 'P1', 'arrival_time': 0, 'burst_time': 5},
    {'pid': 'P2', 'arrival_time': 1, 'burst_time': 3},
    {'pid': 'P3', 'arrival_time': 2, 'burst_time': 8},
    {'pid': 'P4', 'arrival_time': 3, 'burst_time': 6}
]

quantum = 3

result = round_robin(tasks, quantum)
for pid, start, end in result:
    print(f"Task {pid}: Start at {start}, End at {end}")
```

### 5.2.3. Cooldown

- Step 1: Count the frequence of the jobs, do longer jobs first.

- Step 2: Init time, schedule

- Step 3: Init ready (max_heap) and cooldown deque.

- Step 4: while ready or cooldown:

- Step 5: If have ready => Process tasks in ready => Add remaining task to cool down at time + n + 1 => cooldown.append((time + n + 1, cnt + 1)).

- Step 6: If have cooldown and come to time cooldown at cooldown[0][0] == time => Push cooldown tasks to ready task: heapq.heappush(ready, cooldown.popleft()[1])

```python
import heapq
from collections import Counter, deque
from typing import List

class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        # Count the frequency of tasks
        freq = Counter(tasks)

        # Python's heapq is a min-heap, so we store negative frequencies for max-heap behavior
        ready = [-cnt for cnt in freq.values()]
        heapq.heapify(ready)

        # Queue to manage cooldowns: (ready_time, -task_count)
        cooldown = deque()

        time = 0
        while ready or cooldown:
            time += 1

            # Release from cooldown if task is ready
            if cooldown and cooldown[0][0] == time:
                heapq.heappush(ready, cooldown.popleft()[1])

            if ready:
                cnt = heapq.heappop(ready)
                if cnt + 1 < 0:
                    # Add to cooldown queue with ready time = now + n + 1
                    cooldown.append((time + n + 1, cnt + 1))

        return time
```

## 5.3. Top-K

### 5.3.1. Closest (Max Heap)

- Step 1: Init max heap

- Step 2: Loop for number

- Step 3: If len < k => heappush.

- Step 4: Else if len > k and distance < -heap[0][0] => heappushpop.

```python
import heapq

class Solution:
    def kClosest(self, points: List[List[int]], k: int):
        heap = []

        for point in points:
            x, y = point
            distance = x * x + y * y

            if len(heap) < k:
                heapq.heappush(heap, (-distance, point))
            elif distance < -heap[0][0]:
                heapq.heappushpop(heap, (-distance, point))

        return [item[1] for item in heap]
```

### 5.3.2. Maximum (Min Heap)

- Step 1: Init min heap

- Step 2: Loop for number

- Step 3: If len < k => heappush.

- Step 4: Else if len > k and num > heap[0] => heappushpop.

```python
class Solution:
    def kthLargest(self, nums: List[int], k: int):
        heap = []
        for num in nums:
            if len(heap) < k:
                heapq.heappush(heap, num)
            elif num > heap[0]:
                heapq.heappushpop(heap, num)

        return heap[0]
```

## 5.4. Multiple CPUs

### 5.4.1. FCFS Multiple CPUs

- Step 1: Sort by start_time, init time, schedule.

- Step 2: Init cpu_heap [(0, cpu_id) for cpu_id in range(cpu_count)].

- Step 3: Loop task in tasks.

- Step 4: Get earliest available CPU, start_time = max(cpu_available_time, arrival)

- Step 5: schedule.append({'pid': pid, 'cpu': cpu_id, 'start_time': start_time, 'end_time': end_time})

- Step 6: Push end_time to CPU heapq.heappush(cpu_heap, (end_time, cpu_id))

```python
import heapq

def fcfs_multi_cpu(tasks, cpu_count):
    # Sort tasks by arrival time
    tasks = sorted(tasks, key=lambda x: x['arrival_time'])

    # Min-heap of (available_time, cpu_id)
    cpu_heap = [(0, cpu_id) for cpu_id in range(cpu_count)]
    heapq.heapify(cpu_heap)

    schedule = []

    for task in tasks:
        arrival = task['arrival_time']
        burst = task['burst_time']
        pid = task['pid']

        # Get the earliest available CPU
        available_time, cpu_id = heapq.heappop(cpu_heap)

        # The task starts at the max of CPU's available time or its own arrival
        start_time = max(available_time, arrival)
        end_time = start_time + burst

        schedule.append({
            'pid': pid,
            'cpu': cpu_id,
            'start_time': start_time,
            'end_time': end_time
        })

        # Update the CPU's available time
        heapq.heappush(cpu_heap, (end_time, cpu_id))

    return schedule


# Example
tasks = [
    {'pid': 'P1', 'arrival_time': 0, 'burst_time': 5},
    {'pid': 'P2', 'arrival_time': 1, 'burst_time': 3},
    {'pid': 'P3', 'arrival_time': 2, 'burst_time': 1},
    {'pid': 'P4', 'arrival_time': 3, 'burst_time': 2},
]
result = fcfs_multi_cpu(tasks, cpu_count=2)
for entry in result:
    print(entry)
```

### 5.4.2. SJF Multiple CPUs

- Step 1: Sort by start_time, init time, schedule.

- Step 2: Init cpu_heap [(0, cpu_id) for cpu_id in range(cpu_count)].

- Step 3: Init ready queue

- Step 4: Using assigned = False => Use to make sure assign all tasks for available CPU

- Step 5: while i < n or ready or any(cpu[0] > time for cpu in cpu_heap)

- Step 6: while i < n and tasks[i]['arrival_time'] <= time => append tasks to heap priority task['burst_time'] => heapq.heappush(ready, (task['burst_time']..)).

- Step 7: Assigned task to all CPUs
  => while ready and cpu_heap and cpu_heap[0][0] <= time
  => start_time = max(time, cpu_available_time)
  => heapq.heappush(cpu_heap, (end_time, cpu_id))

- Step 8: Fallback, if not CPU is ready => time = max(time + 1, min(tasks[i]['arrival_time'], cpu_heap[0][0])).

```python
import heapq
from typing import List, Dict, Tuple

def sjf_multi_cpu(tasks: List[Dict], k: int) -> List[Tuple[str, int, int, int]]:
    tasks.sort(key=lambda x: x['arrival_time'])  # sort by arrival_time
    n = len(tasks)
    i = 0
    time = 0
    ready = []  # (burst_time, arrival_time, pid, task)
    cpu_heap = []    # (available_time, cpu_id)
    schedule = []

    # Initialize all CPUs as available at time 0
    for cpu_id in range(k):
        heapq.heappush(cpu_heap, (0, cpu_id))

    while i < n or ready or any(cpu[0] > time for cpu in cpu_heap):
        # Add tasks that have arrived by current time
        while i < n and tasks[i]['arrival_time'] <= time:
            task = tasks[i]
            heapq.heappush(ready, (task['burst_time'], task['arrival_time'], task['pid'], task))
            i += 1

        # Assign tasks to available CPUs
        assigned = False
        while ready and cpu_heap and cpu_heap[0][0] <= time:
            burst_time, arrival_time, pid, task = heapq.heappop(ready)
            cpu_available_time, cpu_id = heapq.heappop(cpu_heap)

            start_time = max(time, cpu_available_time)
            end_time = start_time + burst_time
            schedule.append((pid, start_time, end_time, cpu_id))

            heapq.heappush(cpu_heap, (end_time, cpu_id))
            assigned = True

        if not assigned:
            # Advance time to next task arrival or next CPU free time
            next_times = []
            if i < n:
                next_times.append(tasks[i]['arrival_time'])
            if cpu_heap:
                next_times.append(cpu_heap[0][0])
            if next_times:
                time = max(time + 1, min(next_times))

    print("Time", time)

    return schedule

tasks = [
    {'pid': 'P1', 'arrival_time': 0, 'burst_time': 4},
    {'pid': 'P2', 'arrival_time': 1, 'burst_time': 3},
    {'pid': 'P3', 'arrival_time': 2, 'burst_time': 1},
    {'pid': 'P4', 'arrival_time': 3, 'burst_time': 2},
    {'pid': 'P5', 'arrival_time': 4, 'burst_time': 5},
]

schedule = sjf_multi_cpu(tasks, k=3)

for pid, start, end, cpu_id in schedule:
    print(f"CPU{cpu_id} runs {pid} from {start} to {end}")
```

### 5.4.3. Priority Scheduling Multiple CPUs

- Step 1: Sort by start_time, init time, schedule.

- Step 2: Init cpu_heap [(0, cpu_id) for cpu_id in range(cpu_count)].

- Step 3: Init ready queue

- Step 4: Using assigned = False => Use to make sure assign all tasks for available CPU

- Step 5: while i < n or ready or any(cpu[0] > time for cpu in cpu_heap)

- Step 6: while i < n and tasks[i]['arrival_time'] <= time => append tasks to heap priority task['priority'] => heapq.heappush(ready, (task['priority']..)).

- Step 7: Assigned task to all CPUs
  => while ready and cpu_heap and cpu_heap[0][0] <= time
  => start_time = max(time, cpu_available_time)
  => heapq.heappush(cpu_heap, (end_time, cpu_id))

- Step 8: Fallback, if not CPU is ready => time = max(time + 1, min(tasks[i]['arrival_time'], cpu_heap[0][0])).

```python
import heapq

def priority_scheduling_multi_cpu(tasks, cpu_count):
    tasks = sorted(tasks, key=lambda x: x['arrival_time'])
    i = 0
    time = 0
    n = len(tasks)

    cpu_heap = [(0, cpu_id) for cpu_id in range(cpu_count)]
    heapq.heapify(cpu_heap)

    ready_queue = []
    schedule = []

    while i < n or ready_queue:
        # Add all tasks that have arrived by current time
        while i < n and tasks[i]['arrival_time'] <= time:
            task = tasks[i]
            heapq.heappush(ready_queue, (task['priority'], task['arrival_time'], task['pid'], task))
            i += 1

        # Assign ready tasks to available CPUs
        assigned = False
        while ready_queue and cpu_heap and cpu_heap[0][0] <= time:
            cpu_available_time, cpu_id = heapq.heappop(cpu_heap)
            _, arrival, pid, task = heapq.heappop(ready_queue)

            start_time = max(cpu_available_time, arrival, time)
            end_time = start_time + task['burst_time']

            schedule.append({
                'pid': pid,
                'cpu': cpu_id,
                'start_time': start_time,
                'end_time': end_time
            })

            heapq.heappush(cpu_heap, (end_time, cpu_id))
            assigned = True

        # If no task is assigned and no CPU is available yet, move time forward
        if not assigned:
            next_arrival = tasks[i]['arrival_time'] if i < n else float('inf')
            next_cpu_free = cpu_heap[0][0] if cpu_heap else float('inf')
            # Move to the next event (task arrival or CPU becomes free)
            time = max(time + 1, min(next_arrival, next_cpu_free))

    return schedule


tasks = [
    {'pid': 'P1', 'arrival_time': 0, 'burst_time': 10, 'priority': 3},
    {'pid': 'P2', 'arrival_time': 2, 'burst_time': 5,  'priority': 1},
    {'pid': 'P3', 'arrival_time': 1, 'burst_time': 8,  'priority': 2},
    {'pid': 'P4', 'arrival_time': 3, 'burst_time': 6,  'priority': 4}
]

result = priority_scheduling_multi_cpu(tasks, cpu_count=2)
for r in result:
    print(r)
```

# 6. Merge Interval

![](/images/Coding-Interview/merge-interval-pattern.png)

## 6.1. Merge Interval

## 6.2. Overlapping Interval

## 6.3. Non-overlapping Interval

# 7. Divide and Conquer

![](/images/Coding-Interview/divide-and-conquer-pattern.png)

## 7.1. Merge Sort

## 7.2. Quick Sort

## 7.3. Pow(x, n)

# 8. DFS

# 9. BFS

# 10. Dynamic Programming

# 11. Greedy

# 12. Trie

```

```
