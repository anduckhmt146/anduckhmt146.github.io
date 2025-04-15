---
layout: post
title: 4 Isolation Level MySQL
date: 2025-04-15
categories: backend
---

Here is 4 types of isolation level MySQL when handle concurrency processing in database.

# 1. Four types of isolation level MySQL

![](/images/isolation-level-mysql.jpeg)

## 1.1. Read Uncommitted

This is the most loose restriction of isolation

- Transaction 1 has updated data, but not committed.

- Transaction 2 will read the data after T1 updated.

![](/images/read-uncomitted.png)

## 1.2. Read Committed

Step 1: If transaction 1 has not committed

Step 2: When transaction 2 read data it will display the old data.

Step 3: When transaction 1 has committed, transaction 2 read data it will display the new data.

![](/images/read-committed.png)

## 1.3. Non-repeatable reads

Step 1: If transaction 1 has committed, if transaction 2 has not committed, this still read the old data

Step 2: When transaction 2 has comitted, it still read new data

Usage:

- It make the transaction 2 has consistent data while computing an transaction.

- For example, in a transaction 2, if they need 2 times to read data, if we do not implement this non-repeatable reads, the first when this transaction read data, the value is 5 and then in the second read the value is 7 => using 2 different values for one computing about the price of the ticket or booking.

![](/images/read-repetable.png)

## 1.4. Serializable

Step 1: When the transaction 1 is executed, the transaction 2 can not executed.

Step 2: After transaction 1 has comitted, the transaction 2 could be executed.

![](/images/seralizable.png)
