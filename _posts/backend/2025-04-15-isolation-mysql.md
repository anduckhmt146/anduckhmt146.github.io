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

# 2. Some errors for database

## 2.1. Lost updates

Occurs when two or more transactions read the same data and then update it based on the value read.

The last write operation overwrites the previous ones, causing updates to be "lost."

Example:

- Transaction A reads a value of x = 10

- Transaction B reads the same x = 10

- Transaction A updates x = 10 + 5 = 15

- Transaction B updates x = 10 + 3 = 13 (overwriting A’s update)

Result: The update from Transaction A is lost.

## 2.2. Dirty reads

Occurs when a transaction reads data that has been written by another transaction but not yet committed. If the other transaction rolls back, the read data becomes invalid.

Example:

- Transaction A updates x = 20 but hasn't committed

- Transaction B reads x = 20

- Transaction A rolls back — now x should still be the old value

- Transaction B read a value that never officially existed

Result: Inconsistent or invalid data might be used.

## 2.3. Non-repeatable reads

Happens when a transaction reads the same row twice and gets different data each time because another transaction modified and committed changes to that row between the two reads.

Example:

- Transaction A reads x = 10

- Transaction B updates x = 20 and commits

- Transaction A reads x again and sees x = 20

Result: Transaction A sees different values in the same transaction.

## 2.4. Phantoms

Occurs when a transaction re-executes a query and finds a different set of rows due to another committed transaction adding or deleting rows that match the query condition.

Example:

- Transaction A queries SELECT \* FROM users WHERE age > 18 and sees 3 users

- Transaction B inserts a new user with age = 21 and commits

- Transaction A runs the same query again and now sees 4 users

Result: A "phantom" row appears or disappears in the result set.
