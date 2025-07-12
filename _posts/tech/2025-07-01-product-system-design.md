---
layout: post
title: Product System Design
date: 2025-07-01
categories: tech
---

Here is some note for product system design.

# 1. Bit-ly

- Applying CQRS seperate read-write pattern.

- Using auto increment Redis + base62 [A-Z] [a-z] [0-9] hasing pattern.

- Centralize the distributed Redis Counter -> Make sure the url-id is unique across multiple instances.

- To achieve 10M rps, using multiple layer cache: CDN > Redis > Horizontal Scaling (Stateless).

- Algorithm of Hashing
  - Hex: [0–9] [a–f]
  - Base64: [A–Z] [a–z] [0–9] [+ /]

![](/images/System-Design/Product/bit-ly.png)

# 2. Dropbox File System

## 2.1. Upload File

![](/images/System-Design/Product/dropbox_upload_file.png)

## 2.2. Download File

- Pre-signed URL: We need pre-signed URLs to provide secure, temporary access to private resources in a time-range without exposing credentials or making the resource publicly accessible.

![](/images/System-Design/Product/dropbox_download_file.png)

## 2.3. Sync local file and remote change in cloud

- Using client-side sync agent + 'Last write win' to handle conflicts => sync update metadata to DynamoDB.

- Using 2 services:

  - File Service: Upload file and create metadata.

  - Sync Service: Listen changes and update metadata.

![](/images/System-Design/Product/dropbox_sync_content.png)

## 2.4. How will your system handle uploading large files (up to 50GB)

- Upload by each chunk, each chunk has its pre-signed url.

![](/images/System-Design/Product/dropbox_update_large_file.png)

## 2.5. If you have a network interruptions, how it resume to upload the image but not start from scratch

![](/images/System-Design/Product/dropbox_handle_network_condition.png)

## 2.6. How to sync file faster by reducing bandwidth

- Only sync the modified chunks, compress images and videos before transfer.

![](/images/System-Design/Product/dropbox_handle_network_condition.png)

## 2.7. How can we minimize the time required to detect that a remote file has changed while not overloading the system with getChanges() requests?

- Using Polling Strategy instead of using WebSocket.

![](/images/System-Design/Product/dropbox_polling.png)

## 2.8. Notes:

- Web Server and Browser prevent large file in requests (2GB request limits).

- In file storage system, we need to prioritize **Availability** => User can access the file although network condition => Inconsistent Data is acceptable.

- Compressing only work when: Time Transfer > Time compressing => If the image is already compressing, if you continue to compress it => It is counterproductive.

- How to content-based file deduplication => Cryptographic fingerprinting (Hashing) => filenames + location.

- We can use parallel chunking technique.

- When the file is already upload, S3 trigger events => SQS => Amazon Dynamo DB to update status of the file to Completed.

- Hybrid client-side for real-time update:

  - Web Socket: active file.
  - Pooling: in-active file.

- 'Last Write Win' improve the eventually consistency.

# 3. NoSQL Design

## 3.1. Redis

![](/images/System-Design/Product/redis.png)

## 3.2. MongoDB

![](/images/System-Design/Product/mongodb.png)

![](/images/System-Design/Product/master-single-point-of-failure.png)

## 3.3. Cassandra

![](/images/System-Design/Product/cassandra.png)

## 3.4. DynamoDB

![](/images/System-Design/Product/dynamodb.png)

## 3.5. Lock, concurrency, index, partition DBMS: Redis, MongoDB, Cassandra, DynamoDB, SQL

# 4. SQL Design

## 4.1. Lock Database

- Khi select need to WHERE from 'index' => Không là nó scan DB.

- Khi select \* => auto lock bảng => Write vào không được.

When SELECT 1 billions records => What is lock db ?

![](/images/lock-db.png)

## 4.2. Isolation Lock happen in ACID

- In ACID, Isolation Level in ACID

- 3 types of READ:

  - Dirty Read: Read without commit.

  - Non-repeatable Read: In the same trasaction, read the same row 2 times => Return 2 different value because other transaction has commited it.

  - Phanrom Read: Read same time with different numbers of row.

- 4 Isolation of Level:

  - Read Uncommited

  - Read Commited.

  - Repeatable Read.

  - Seralizable

![](/images/System-Design/isolation_level.png)

## 4.3. Hadoop (File System)

- Hadoop: Distributed File System from Data Warehouse.

- Data Warehouse: Using Hive to query Hadoop.

- Data Lakehouse: versioning, metadata, only has ACID, still distributed => Keep ACID by using distributed patterns: 2-Phrase-Commit, transaction logs, slower than warehouse.

- DBMS: File System + Query Engine + Metadata.

## 4.4. Hive:

- Hive: Store metadata for Hadoop (File System)

## 4.5. Two-phrase commit

- Failed in ISOLATION level.

![](/images/System-Design/two-phrase-commit.png)

## 4.6. Airflow

- Using cronjob to schedule job to query data.

- CI/CD of data.

## 4.7. Flink & Spark

- Compute Engine

- Spark: batch processing, read batch from Kafka => Count enough records to use.

- Flink: Read real-time, read data from Kafka => Compute to predict the fraud detection real-time, costly and less to use.

- Depend on jobs => write a cron job with Spark, Flink => DE write cronjob.

## 4.8. OLAP

- Using query engine to read data in data warehouse.

- PostgreSQL

- Redshift

- Lakehouse -> trino

## 4.9. Superset

- Superset -> Trino -> Query data in lakehouse (warehouse) -> Red-shift.

- Warehouse: SQL

- Lakehouse.

- Object: metadata -> ETL -> Read from S3 -> Tool make it (abstract from sql -> query data in engine).

- Data will store in file and partitioning.

- Everything is a distributed file system -> Partition -> Abstract by sql query in tool.

## 4.10. Write-Ahead Log

- A Write-Ahead Log is a sequential log file that records every intended modification to the database before the actual data is written.

- Use to store history action of DBMS => Use for rollback, migration when change data capture,...
