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

# 5. Design a Local Delivery Service like Gopuff

## 5.1. Entities:

![](/images/System-Design/Product/Food-Delivery/food-delivery-entities.png)

## 5.2. API Design

![](/images/System-Design/Product/Food-Delivery/food-delivery-api-design.png)

## 5.3. How will customers be able to query the availability of items within a fixed distance (e.g. 30 miles)?

![](/images/System-Design/Product/Food-Delivery/query-fixed-distance.png)

## 5.4. How can we extend the design so that we only return items which can be delivered within 1 hour?

![](/images/System-Design/Product/Food-Delivery/place-order.png)

## 5.5. How can we ensure users cannot order items which are unavailable? How do we avoid race conditions?

"To avoid both race conditions and customers ordering out of stock inventory, we'll use a transaction on our Postgres database. In this transaction we'll:

(1) Check the inventory items are still available at the locations we determined when we checked availability.
(2) Decrement the inventory counts at those locations.
(3) Create a new Order record with the associated items."

## 5.6. How can we ensure availability lookups are fast and available?

(1) We can use the prefix of the geohash of a location as the cache key so small changes in the location still hit the same fulfillment centers. 

(2) Each nearby service instance can maintain a local cache of the fulfillment centers so that location search can be done without an external call. Since fulfillment centers aren't changing often, we can make the cache TTL long.

(3) We can replicate our Postgres instance and have the availability service read from replicas. This may mean availability lookups are slightly stale, but we're ok with this."

Idea: The location only store data for it, do not scan all table.

![](/images/System-Design/Product/Food-Delivery/query-local-region.png)

## 5.7. How do delivery systems efficiently aggregate inventory across multiple warehouse locations?

- Sum quantities from nearby warehouses

## 5.8. Travel time estimation services provide more accurate delivery zones than simple distance calculations

- Travel time services account for real-world factors like traffic, road conditions, and geographic barriers, providing more accurate delivery feasibility than straight-line distance calculations that ignore these constraints.

## 5.9. Which technique is MOST effective for preventing concurrent resource allocation conflicts?

- Atomic transactions.

## 5.10. Implement database read performance

- Read replica: Use for master slave, write in master, read from slave. But replica can serve stale data.

- Query Caching.

- Index.

- Write-ahead logging: keep track all actions of DBMS, use for migration data.

![](/images/System-Design/Product/Food-Delivery/read-replica.png)

## 5.11. Which algorithm accounts for Earth's curvature when calculating geographic distances?

- The Haversine formula.

## 5.12. Two-phase filtering 

- Two-phase filtering first applies cheap local filters (like simple distance calculations) to reduce the candidate set before making expensive external API calls (like travel time estimation).

- Step 1: Pre-computed radius filtering

## 5.13. Paritition strategy

- Round-robin distribution

- Geographic sharding

- Hash partitioning

- Timestamp-based splitting

## 5.14. What happens when cached inventory data becomes stale after concurrent orders?

- Overselling inventory

## 5.15. Which isolation level BEST prevents phantom reads in concurrent transactions?

- Two read query -> Call different numbers of rows.

- Only serializable solve phantom read.

## 5.16. Eventual consistency and Partition Tolerance

- Eventual consistency:	Parts may show different data briefly, but will match soon.

- Partition Tolerance: Partition tolerance means a system can work even when some parts can't talk to each other => Using Data Replication or Local Cache.

## 5.17. Reduce external service 

- Batch Processing.

- Result Caching.

- Local pre-filtering.

# 6. Design a News Aggregator (Example dev.to)

## 6.1. Non-requirements

![](/images/System-Design/Product/News/non-functional-requirements.png)

## 6.2. Entities

![](/images/System-Design/Product/News/entities.png)

## 6.3. API Design

![](/images/System-Design/Product/News/api-design.png)

## 6.4. How will your system collect and store news articles from thousands of publishers worldwide via their RSS feeds?

![](/images/System-Design/Product/News/rss-data-collection.png)

## 6.5. How will your system show users a regional feed of news articles?

![](/images/System-Design/Product/News/feed-region-service.png)

## 6.6. Scroll through the feed 'infinitely'?

- An optimal solution could use monotonically increasing article IDs (like ULIDs) as cursors, eliminating timestamp collisions entirely.

-  This makes pagination incredibly simple: we just query for articles with IDs less than the cursor value => Scroll from the highest ID to the lowest one. We just store the last article we saw client side as the cursor and pass it along with each API request.

## 6.7. How do you ensure that users feeds load quickly (< 200ms)?

- Using CDC (Change Data Capture) from database to Redis.

- Update pre-computed value to Redis, using ZREVRANGE, maintain only the most recent 1,000-2,000 articles per region.

![](/images/System-Design/Product/News/feeds-redis-cdc.png)

## 6.8. How do we ensure articles appear in feeds within 30 minutes of publication? Even for publishers that don't have RSS feeds.

- Integrate with Webhook of platforms.

- Using 3 methods: frequent RSS polling, Web Scraper, Webhook.

![](/images/System-Design/Product/News/webhook.png)

## 6.9. How do you efficiently deliver thumbnail images for millions of news articles in user feeds?

- Using thumbnail in region of the client-side.

![](/images/System-Design/Product/News/cdn.png)

## 6.10. How do you scale your cache infrastructure to handle 10M concurrent users requesting feeds?

- With 10M concurrent users requesting feeds, a single cache instance can only handle ~100k requests per second, creating a massive bottleneck

=> Scale the redis, each instance 100k rps -> 100 instance can handle 10M rps.

![](/images/System-Design/Product/News/redis-replica.png)

## 6.11. Why do news aggregators like Google News download and store their own copies of publisher thumbnails rather than linking directly to publisher images?

- Publisher images can be slow to load, change URLs, or become unavailable, which would break the feed experience => Storing local copies ensures consistent load and latency.

## 6.12. Cursor-based pagination & Offset-page Approach

- Cursor-based pagination -> decrease down ID from the cursor.

- Offset page -> Rerender when publishers have new data.

## 6.13. Why might implementing webhooks from publishers be preferred over frequent RSS polling for breaking news delivery?

- Webhooks provide immediate notification when content is published, reducing discovery latency from minutes to seconds.

## 6.14. When implementing personalized news feeds, why might 'pre-computed user caches' be worse than 'dynamic feed assembly' despite being faster?

- Pre-computed user caches require enormous additional memory and introduce complex cache invalidation logic

## 6.15. Why do news aggregators implement Change Data Capture (CDC) instead of simple database polling for cache updates?

- CDC triggers cache updates immediately when new articles are inserted, providing sub-second freshness.

- Pooling require a high database load.

## 6.16. During a major election, your Redis cache serving 100M users gets overwhelmed at 100k requests/second. What's the BEST immediate scaling solution?

- Add read replicas.

## 6.17. A system's database must serve 100,000 read requests per second. Which scaling approach handles this load most effectively?

- Implement read replicas.

## 6.18. A news publisher's RSS feed is down for 2 hours during breaking news. What's the BEST fallback strategy?

- Context: 1 publisher source is lost => What do you do ?

- Solution: Using Web Scraping technique if the RSS feeds is failed.

## 6.19. What happens when cached data becomes stale in high-frequency update systems?

- Users see outdated information

## 6.20. All of the following improve content freshness

- Real-time webhooks

- Frequent polling

- Change data capture

## 6.21. Geographic data distribution reduces latency by serving content from nearby locations.

- Yes

## 6.22. During traffic spikes, which component typically becomes the bottleneck in read-heavy systems?

- In read-heavy systems, the database or cache layer typically becomes the bottleneck first -> Data retrieval operations.

- About server: it is basic routing, and load balacers can usually be scaled easily than data layer.

## 6.24. Eventual consistency is acceptable for news feeds where availability matters more than perfect synchronization.

- According to the CAP theorem, news aggregation systems often prioritize availability over strict consistency. 

- Users prefer access to slightly outdated content rather than no content at all.

## 6.25. When implementing category-based news feeds (Sports, Politics, Tech), which approach provides the best balance of performance and resource efficiency?

- Cache metadata in regional caches (like feed:US) => Filtering from this key.

- Pros:  This avoids the memory explosion of separate category caches (25 categories × 10 regions = 250 cache keys) => Reading 1,000 articles from Redis takes ~10ms, and in-memory filtering adds only 1-2ms.