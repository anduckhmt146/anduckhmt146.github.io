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

- Eventual consistency: Parts may show different data briefly, but will match soon.

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

- This makes pagination incredibly simple: we just query for articles with IDs less than the cursor value => Scroll from the highest ID to the lowest one. We just store the last article we saw client side as the cursor and pass it along with each API request.

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

- Pros: This avoids the memory explosion of separate category caches (25 categories × 10 regions = 250 cache keys) => Reading 1,000 articles from Redis takes ~10ms, and in-memory filtering adds only 1-2ms.

# 7. Design Ticketmaster

## 7.1. Non-functional requirements

- Consistency for booking events.

- Availability for searching events.

- Scalability for handle popular events.

## 7.2. Entities

![](/images/System-Design/Product/Ticketmaster/entities.png)

## 7.3. API Design

![](/images/System-Design/Product/Ticketmaster/api-design.png)

## 7.4. How will users be able to view simple event details when clicking on an event? ie. name, description, location, date, etc.

![](/images/System-Design/Product/Ticketmaster/event-service.png)

## 7.5. How will users be able to search for events?

![](/images/System-Design/Product/Ticketmaster/search-service.png)

## 7.6. How will users be able to book specific seats for events? Each physical seat has exactly one ticket. Do not consider General Admission or section-based booking.

![](/images/System-Design/Product/Ticketmaster/booking.png)

## 7.7. Implement a two-phase booking process:

1. Seat Reservation: Temporarily hold selected seats.
2. Booking Confirmation: Finalize purchase within a time limit.

How would you design this to prevent users from losing seats during checkout?

- To implement the two-phase booking process and prevent users from losing seats during checkout, we’ll use a distributed lock system with Redis and a 10-minute TTL (Time to Live). When a user selects seats to reserve, the client sends a POST request to the Booking Service with the selected ticketIds. The Booking Service attempts to acquire locks for these seats in Redis, setting a TTL of 10 minutes for each lock. This reservation ensures that no other user can reserve or book the same seats during this period.

- If the user completes the purchase within the 10-minute window, the Booking Service finalizes the booking by updating the ticket statuses to “booked”. If the user does not complete the purchase in time, the locks automatically expire due to the TTL, and the seats become available for others to reserve. This mechanism effectively prevents seat loss during checkout by exclusively holding seats for the user and automatically releasing them if the reservation times out.

![](/images/System-Design/Product/Ticketmaster/distributed-lock.png)

## 7.8. How can your design scale to support up to 10M concurrent users reading event data? Focus on optimizing the database and read flow for this high volume of requests.

- Read from cache => Read replicas, because Database engine need time to query.

![](/images/System-Design/Product/Ticketmaster/cache.png)

## 7.9. How can you improve search to handle complex queries more efficiently. If you think your design already handles this well, explain how.

- When search it return data from Elastic Search, rather than the database.

![](/images/System-Design/Product/Ticketmaster/elastic-search.png)

## 7.10. How can you make the seat map on the event page automatically refresh to display the latest seat availability in real time?

- We can implement Server-Sent Events (SSE). When a user views the seat map on the event page, the client establishes an SSE connection to the Booking Service. The server then pushes updates to the client whenever there’s a change in seat availability—such as seats being reserved or booked by other users. On the client, we'll receive these updates and block off the seats in the seat map accordingly.

- As we scale, we may not be able to fit all connections for a single event on a single Booking Service instance. In this case, we can introduce pub/sub to broadcast changes or add a dispatcher that utilizes Zookeeper or a similar service to know which server to send updates to.

![](/images/System-Design/Product/Ticketmaster/sse.png)

## 7.11. How would you implement a virtual waiting room that queues users for popular events and grants access based on their queue position?

- We can implement a virtual waiting room using Redis' Sorted Sets data structure. When users attempt to access the event page during peak times, they are redirected to a waiting room, and their session IDs are added to a Redis Sorted Set with their timestamp as the score, ensuring first-come-first-served order.

- Every N minutes, or based on the number of completed bookings, we use ZRANGE to pull users from the front of the queue and grant them access to the event details page in a controlled manner, throttling the number of concurrent bookings and preventing system overload. This approach ensures fairness by serving users in the order they arrived and provides scalability to handle surges in traffic.

![](/images/System-Design/Product/Ticketmaster/redis-sorted-set.png)

Example:

```bash
ZADD booking_queue 1625380000 user1
ZADD booking_queue 1625380001 user2
ZADD booking_queue 1625380002 user3
```

Top 100 users from 0 to 99.

```bash
ZRANGE booking_queue 0 99
```

```bash
-- KEYS[1] = ZSET key (e.g., "booking_queue")
-- ARGV[1] = user_id
-- ARGV[2] = score (e.g., timestamp)
-- ARGV[3] = max size (e.g., 100)

local zset = KEYS[1]
local user = ARGV[1]
local score = tonumber(ARGV[2])
local max_size = tonumber(ARGV[3])

-- Get current size
local current_size = redis.call("ZCARD", zset)

if current_size < max_size then
    redis.call("ZADD", zset, score, user)
    return "ADDED"
else
    -- Get the lowest score entry
    local lowest = redis.call("ZRANGE", zset, 0, 0, "WITHSCORES")
    local lowest_user = lowest[1]
    local lowest_score = tonumber(lowest[2])

    if score > lowest_score then
        -- Remove the oldest
        redis.call("ZREM", zset, lowest_user)
        -- Add the new user
        redis.call("ZADD", zset, score, user)
        return "REPLACED"
    else
        return "REJECTED"
    end
end
```

## 7.12. Redis faster than Disk-based access

- Because Redis is in-memory access.

- DBMS is Disk-based access

## 7.13. Which consistency model prevents concurrent processes from allocating the same resource?

- Strong Consistency

## 7.14. Which approach works BEST for efficient partial text matching in search queries?

Full-text search engines

- SQL Like: full table scans.

- Elastic Search: Inverted Index, Fuzzy Matching.

## 7.15. Distributed locks prevent multiple processes from accessing shared resources simultaneously.

- Yes

## 7.16. A system needs to prevent double resource allocation, which database property is most essential?

- Transactions ensure that operations like checking availability and marking resources as allocated happen atomically.

=> Preventing race conditions where multiple users could claim the same resource simultaneously.

## 7.17. Horizontal Scale

- Stateless service.

## 7.18. Which technology enables real-time server-to-client data streaming without client polling?

- SSE.

## 7.19. What happens when a distributed lock's TTL expires before the operation completes?

- Lock becomes available to other processes

## 7.20. Which strategy works BEST for managing millions of simultaneous users during high-demand events?

- Implement virtual waiting queues

## 7.21. Inverted indexes improve full-text search performance by mapping words to documents.

- True

## 7.22. When designing for high availability, which system component should prioritize consistency over availability?

- Payment processing must prioritize consistency to prevent double charges, financial discrepancies, and fraud.

# 8. Design FB News Feed

## 8.1. Non-functional Requirements

![](/images/System-Design/Product/FB-Posts/non-functional-requirements.png)

## 8.2. Entities

![](/images/System-Design/Product/FB-Posts/entities.png)

## 8.3. Users should be able to create posts

![](/images/System-Design/Product/FB-Posts/create-posts.png)

## 8.4. Users should be able to friend/follow people.

![](/images/System-Design/Product/FB-Posts/follow-people.png)

## 8.5. How do we handle users who are following a large number of users? (Push Model)

- Push by create new record: UserID -> FollowID -> FeedID

![](/images/System-Design/Product/FB-Posts/pulling-feeds.png)

## 8.6. How do we handle users with a large number of followers?

- Celebrity Problem: Pull Model.

![](/images/System-Design/Product/FB-Posts/celebrity-pull-model.png)

## 8.7. How can we handle heavy-read and unread of posts?

- Using Redis for heavy-read posts.

![](/images/System-Design/Product/FB-Posts/heavy-read-posts.png)

## 8.8. Fan-out on write means aggregating data at read time when a user requests their feed.

- Fan-out on write means pre-aggregating data when posts are created (at write time).

- While fan-out on read means aggregating data when users request their feed (at read time).

## 8.9. Key-value stores can scale infinitely regardless of how requests are distributed across the keyspace.

- Key-value stores require even load distribution across partitions to scale effectively.

- If certain keys get much more traffic (hot keys), those partitions become bottlenecks, limiting scalability.

![](/images/System-Design/Product/FB-Posts/offset-pagination.png)

![](/images/System-Design/Product/FB-Posts/cursor-pagination.png)

## 8.10. Secondary indexes in databases are primarily used to improve write performance rather than enable different query patterns.

- Secodary Index: Support read, but longer write.

## 8.11. What is the most effective approach to handle hot keys in a distributed cache system?

- Implement redundant caching where multiple nodes can serve the same popular keys

## 8.12. For modeling follow relationships in a social network using a key-value store, what is the most efficient approach for supporting both 'who does user X follow' and 'who follows user X' queries?

- Create a table with composite keys and a secondary index with reversed keys

- Idea: Using composite keys (follower:following) with a secondary index that reverses the key order (following:follower) allows efficient querying of both access patterns in a single table structure, which is optimal for key-value stores.

![](/images/System-Design/Product/FB-Posts/composite-key.png)

- Efficient lookups: All queries are direct key-prefix scans (ideal for key-value stores).

🔑 Partition Key & Sort Key

- Partition Key: Determines which physical partition (node/shard) the item is stored on.
- Sort Key: Determines the order of items within a partition.

## 8.13. What is the primary benefit of maintaining precomputed feeds for users in a social media system?

- Cache is pre-computed.

## 8.14. In the context of the CAP theorem, a social media feed system that tolerates up to 1 minute of post staleness is prioritizing which combination?

- Availability and Partition tolerance

## 8.15. In a hybrid fan-out strategy for social feeds, what is the most practical approach for handling celebrity accounts with millions of followers?

- Skipping fan-out for celebrity accounts (not writing to millions of feeds) and instead merging their recent posts during read operations is more efficient than trying to update millions of precomputed feeds.

## 8.16. Why are stateless services easier to scale horizontally compared to stateful services?

- Any instance can handle any request without needing to maintain session data

- Idea: Horizontal Scaling.

## 8.17. When using message queues to handle posts from users with varying follower counts, what is a key consideration for queue design?

- Posts from users with few followers require little work (updating few feeds), while posts from users with millions of followers require massive work. The queue system needs to account for this variable workload to avoid bottlenecks.

# 9. Design Tinder

## 9.1. Functional Requirements

![](/images/System-Design/Product/Tinder/functional-requirements.png)

## 9.2. Non-functional Requirements

![](/images/System-Design/Product/Tinder/non-functional-requirements.png)

## 9.3. Entities

- Actor of your system, discover later.

![](/images/System-Design/Product/Tinder/entities.png)

## 9.4. API Design

- Each demand (requirement) => 1 Endpoint

![](/images/System-Design/Product/Tinder/api-design.png)

# 10. Patterns

## 10.1. Real-time Updates

### 10.1.1. Network Protocol

- Network Layer (Layer 3):

  - Assigns IP addresses (IPv4 or IPv6) to devices.
  - Splits large packets into smaller ones if needed.

- Transport Layer (Layer 4):

  - TCP: connection-oriented protocol: before you can send data, you need to establish a connection with the other side.

  - UDP: connectionless protocol: you can send data to any other IP address on the network without any prior setup.

  - TCP tracks every byte sent and requires ACKs to confirm receipt. If packets get lost, TCP retransmits them. UDP simply doesn’t do this, TCP ensures data arrives in order.

- Application Layer (Layer 7): At the final layer are the application protocols like DNS, HTTP, Websockets, WebRTC => DNS can choose to use TCP or UDP.

---

TCP Connection

- When user make connections using TCP -> Three-way handshanking + Make requests + Finish.

- When a user makes REST requests like GET, POST, or PUT, the underlying transport protocol is typically TCP, can use **keep-alive** for sessions.

---

Load Balancers

- Layer 4 Load Balancers: AWS Network Load Balancer => Load to IP layer

- Layer 7 Load Balancers: API Gateway => Load HTTP requests.

- It works together

```bash
User Request --> Layer 4 Load Balancer --> Layer 7 Load Balancer --> Backend Server
```

```bash
Internet
   ↓
Layer 4 Load Balancer (e.g., AWS Network Load Balancer)
   ↓
Layer 7 Load Balancer (e.g., AWS Application Load Balancer, NGINX)
   ↓
Backend servers (web servers, APIs, etc.)

```

### 10.1.2. Client Updates

**1. Simple Polling**

Cons:

- Can cause unnecessary network traffic (lots of requests with no new data).

- Higher latency for real-time updates because client only checks periodically.

```javascript
async function poll() {
  const response = await fetch('/api/updates');
  const data = await response.json();
  processData(data);
}

// Poll every 2 seconds
setInterval(poll, 2000);
```

**2. Long Polling**

- Server only requests when it have more data -> Else it hold the requests, client do not need to make requests.

  - Step 1: Client makes HTTP request to server
  - Step 2: Server holds request open until new data is available
  - Step 3: Server responds with data
  - Step 4: Client immediately makes new request
  - Step 5: Process repeats

- In simple polling, the client checks for new data only at fixed intervals (e.g., every 5 seconds). If new data arrives just after a check, the client has to wait until the next interval to find out — causing a delay that can be several seconds.

- In long polling, the client sends a request and the server holds this request open until new data is available.

When the data arrives, the server immediately responds.

- The client then instantly sends a new request to listen for more updates.

- Because the server responds as soon as new data is available, the delay between data creation and client notification is minimized—usually just the network latency and processing time.

Cons:

- More complex to implement.

- Holding many open connections can strain the server.

---

Different Long Polling and Web Socket

- Long polling: HTTP request/response cycle.

- Web Socket: Persistent, full-duplex TCP

**3. Server-Sent Events (SSE)**

Cons:

- Limited browser support EventSource.

- One-way communication only: Server to Client.

**4. WebSocket: The Full-Duplex Champion**

Cons:

- More complex to implement.
- Requires special infrastructure.
- Stateful connections, can make load balancing and scaling more complex.

**5. WebRTC: The Peer-to-Peer Solution**

Use for video calling, peer-to-peer connection.

1. Peers discover each other through signaling server.

2. Exchange connection info (ICE candidates)

3. Establish direct peer connection, using STUN/TURN if needed

4. Stream audio/video or send data directly

WebSocket — When to Use

- Client-server communication: WebSocket creates a persistent, full-duplex connection between a client and a server.

WebRTC — When to Use

- Peer-to-peer communication: WebRTC enables direct, low-latency peer-to-peer connections between browsers/devices.

```javascript
const config = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};
```

- STUN server: Helps peers find their public IP addresses to connect through NATs/firewalls.

- TURN server: Relays media/data if a direct peer-to-peer connection can’t be established (e.g., due to restrictive NATs).

![](/images/System-Design/Patterns/real-time-protocol.png)

### 10.1.3. Server Pull/Push

1. Pulling with Simple Polling

Cons:

- High latency.
- Excess DB load when updates are infrequent and polling is frequent.

2. Pushing via Consistent Hashes

- Each server -> Each client fixed.

Zookeepers is used to store metadata of clients and servers.

![](/images/System-Design/Patterns/zookeeper.png)

Cons:

- Complex to implement correctly

- Requires coordination service (like Zookeeper)

- All servers need to maintain routing information

When to use:

- WebSocket: stateful

- Consistent hashing is ideal when you need to maintain persistent connections (WebSocket/SSE) and your system needs to scale dynamically, state 'on', 'off'.

3. Pushing via Pub/Sub

Cons:

- The Pub/Sub service becomes a single point of failure and bottleneck.

### 10.1.4. WebSockets require every intermediary (load balancers, proxies) between client and server to support the upgrade handshake.

- Yes

### 10.1.5. Which load balancer type (per the OSI model) is generally preferred when terminating long-lived WebSocket connections?

- L4 balancers operate at the TCP layer and preserve the single underlying connection, avoiding issues some L7 proxies have with WebSocket stickiness.

### 10.1.6. Consistent hashing reduces connection churn when scaling endpoint servers up or down.

- True because it auto sharding to another nodes in ring architecture.

- Only the keys mapping to the portion of the hash ring owned by added/removed nodes move, so most clients stay put.

### 10.1.7. In a pub/sub architecture, which component is responsible for routing published messages to all active subscribers?

- Message Queue.

### 10.1.8. WebRTC always guarantees a direct peer-to-peer path between browsers without relays.

- Success: STUN: Help a client find its public IP address and port as seen from the internet (outside its NAT) - Session Traversal Utilities for NAT

- Failed (Fallback): TURN: Relay data between peers when direct connection isn't possible - Traversal Using Relays around NAT

- When NAT traversal fails, TURN relays forward traffic, so not all flows are purely peer-to-peer.

### 10.1.9. Using a "least connections" strategy at the load balancer helps distribute WebSocket clients more evenly across endpoint servers.

- Yes

### 10.1.10. When would you MOST LIKELY choose consistent hashing over a pub/sub approach on the server side?

- If per-client state is heavy, pinning that user to one server (via hashing) avoids expensive state transfer and cache misses => Fixed some client state to server to save resources.

### 10.1.11. SSE streams can be buffered by misconfigured proxies, delaying updates to clients even though the server flushes chunks immediately.

- Proxies that don't support Transfer-Encoding: chunked may wait for the full response before forwarding, defeating streaming semantics.

## 10.2. Dealing with Contention

### 10.2.1. Transaction

```sql
BEGIN TRANSACTION;

-- Debit Alice's account
UPDATE accounts SET balance = balance - 100 WHERE user_id = 'alice';

-- Credit Bob's account
UPDATE accounts SET balance = balance + 100 WHERE user_id = 'bob';

COMMIT; -- Both operations succeed together
```

Transaction

```sql
BEGIN TRANSACTION;

-- Check and reserve the seat
UPDATE concerts
SET available_seats = available_seats - 1
WHERE concert_id = 'weeknd_tour'
  AND available_seats >= 1;

-- Create the ticket record
INSERT INTO tickets (user_id, concert_id, seat_number, purchase_time)
VALUES ('user123', 'weeknd_tour', 'A15', NOW());

COMMIT;
```

### 10.2.2. Pessimistic Locking

- "Pessimistic" about conflicts - assuming they will happen and preventing them.

When a transaction or thread wants to access a resource (like a row in a table), it locks it before reading or writing. Other transactions/threads must wait until the lock is released.

Types of Locks:

- Read Lock (Shared Lock): Others can also read, but not write.

- Write Lock (Exclusive Lock): Others can't read or write.

```sql
BEGIN;

SELECT * FROM accounts WHERE id = 101 FOR UPDATE;

-- Do some update here
UPDATE accounts SET balance = balance - 100 WHERE id = 101;

COMMIT;
optimi
```

### 10.2.3. Optimistic locking

Update success

```sql
UPDATE accounts
SET balance = 900, version = 4
WHERE id = 1 AND version = 3;
```

Update failed

```sql
UPDATE accounts
SET balance = 800, version = 4
WHERE id = 1 AND version = 3;
```

### 10.2.4. Isolation Levels

- READ UNCOMMITTED: Can see uncommitted changes from other transactions (rarely used)

- READ COMMITTED: Can only see committed changes (default in PostgreSQL)

- REPEATABLE READ: Same data read multiple times within a transaction stays consistent (default in MySQL)

- SERIALIZABLE: Strongest isolation, transactions appear to run one after another

The defaults of either READ COMMITTED or REPEATABLE READ => still allows our concert ticket race condition because both Alice and Bob can read "1 seat available" simultaneously before updating.

Solution: Using SERIALIZABLE

```sql
-- Set isolation level for this transaction
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;

UPDATE concerts
SET available_seats = available_seats - 1
WHERE concert_id = 'weeknd_tour'
  AND available_seats >= 1;

-- Create the ticket record
INSERT INTO tickets (user_id, concert_id, seat_number, purchase_time)
VALUES ('user123', 'weeknd_tour', 'A15', NOW());

COMMIT;
```

![](/images/System-Design/Patterns/isolation-levels.png)

With SERIALIZABLE, the database automatically detects conflicts and aborts one transaction if they would interfere with each other.

### 10.2.5. Optimistic Concurrency Control

```sql
-- Alice reads: concert has 1 seat, version 42
-- Bob reads: concert has 1 seat, version 42

-- Alice tries to update first:
BEGIN TRANSACTION;
UPDATE concerts
SET available_seats = available_seats - 1, version = version + 1
WHERE concert_id = 'weeknd_tour'
  AND version = 42;  -- Expected version

INSERT INTO tickets (user_id, concert_id, seat_number, purchase_time)
VALUES ('alice', 'weeknd_tour', 'A15', NOW());
COMMIT;

-- Alice's update succeeds, seats = 0, version = 43

-- Bob tries to update:
BEGIN TRANSACTION;
UPDATE concerts
SET available_seats = available_seats - 1, version = version + 1
WHERE concert_id = 'weeknd_tour'
  AND version = 42;  -- Stale version!

-- Bob's update affects 0 rows - conflict detected, transaction rolls back
```

### 10.2.6. Multiple nodes

#### Two-phrase commit

- Step 1: Prepare, transaction stays open, waiting for coordinator's decision

```sql
-- Database A during prepare phase
BEGIN TRANSACTION;
SELECT balance FROM accounts WHERE user_id = 'alice' FOR UPDATE;
-- Check if balance >= 100
UPDATE accounts SET balance = balance - 100 WHERE user_id = 'alice';
-- Transaction stays open, waiting for coordinator's decision

-- Database B during prepare phase
BEGIN TRANSACTION;
SELECT * FROM accounts WHERE user_id = 'bob' FOR UPDATE;
-- Verify account exists and is active
UPDATE accounts SET balance = balance + 100 WHERE user_id = 'bob';
-- Transaction stays open, waiting for coordinator's decision
```

- Step 2: Coordinator commit.

#### Distributed Locks

- Redis with TTL

- Database columns: Add status, expiration column.

- ZooKeeper/etcd: Use coordination service to distribued lock. Both systems use consensus algorithms (Raft for etcd, ZAB for ZooKeeper) to maintain consistency across multiple nodes.

#### Saga Pattern

- Step 1 - Debit $100 from Alice's account in Database A, commit immediately

- Step 2 - Credit $100 to Bob's account in Database B, commit immediately

- Step 3 - Send confirmation notifications and adjust rollup or commit.

![](/images/System-Design/Patterns/transaction-pattern.png)

Cons:

- During saga execution, the system is temporarily inconsistent. After Step 1 completes, Alice's account is debited but Bob's account isn't credited yet.

- Other processes might see Alice's balance as $100 lower during this window. If someone checks the total money in the system, it appears to have decreased temporarily.

### When to use

Here are some bang on examples of when you might need to use contention patterns:

- Multiple users competing for limited resources: concert tickets, auction bidding, flash sale inventory, or matching drivers with riders

- Prevent double-booking or double-charging in scenarios: payment processing, seat reservations, or meeting room scheduling.

- Ensure data consistency under high concurrency for operations: account balance updates, inventory management, or collaborative editing

- Handle race conditions in distributed systems: where the same operation might happen simultaneously across multiple servers and where the outcome is sensitive to the order of operations.

When not to use:

- Read-heavy workloads: Handle write conflicts -> Impact read performance.

### 10.2.7. How do you prevent deadlocks with pessimistic locking?

- Alice wants to transfer $100 to Bob, while Bob simultaneously wants to transfer $50 to Alice.

- Transaction A locks Alice's account first, then tries to lock Bob's account.

- Transaction B locks Bob's account first, then tries to lock Alice's account. Both transactions wait forever for the other to release their lock.

![](/images/System-Design/Patterns/deadlock.png)

Solution:

- Sort the resources you need to lock by some deterministic key like user ID, database primary key, or even memory address.

- If you need to lock users 123 and 456, always lock 123 first even if your business logic processes 456 first.

- Use database timeout for fallback => Most modern databases also have automatic deadlock detection that kills one transaction when cycles are detected.

### 10.2.8. What if your coordinator service crashes during a distributed transaction in 2-Phrase Commit ?

![](/images/System-Design/Patterns/2pc-crash.png)

Production systems handle this with coordinator failover and transaction recovery

=> When a new coordinator starts up, it reads persistent logs to determine which transactions were in-flight and completes them.

### 10.2.9. How do you handle the ABA problem with optimistic concurrency

- Update the review_count for user know the problem.

```sql
-- Use review count as the "version" since it always increases
UPDATE restaurants
SET avg_rating = 4.1, review_count = review_count + 1
WHERE restaurant_id = 'pizza_palace'
  AND review_count = 100;  -- Expected current count
```

### 10.2.10. What about performance when everyone wants the same resource

![](/images/System-Design/Patterns/messsage-queue.png)

### 10.2.11. What does the SQL 'FOR UPDATE' clause accomplish?

- Exclusive lock: write.

- Shared lock: read.

### 10.2.12. Pessimistic locking more efficient when conflicts are frequent.

- Optimistic concurrency control works best when conflicts are rare, multiple conflicts => multiple retries.
- Frequent conflicts mean lots of retries. making pessimistic locking more efficient.

### 10.2.13. In two-phase commit, transactions can stay open across network calls.

- This is actually a dangerous aspect of 2PC - open transactions hold locks during network coordination, which can cause problems if the coordinator crashes.

### 10.2.14. What is the standard solution for preventing deadlocks with pessimistic locking?

- Always acquire locks in a consistent order

### 10.2.15. Which approach works best for handling the 'hot partition' problem where everyone wants the same resource?

- Implement queue-based serialization

### 10.2.16. When should you choose pessimistic locking over optimistic concurrency control?

- Optimistic approaches that require rollback => Reduce the rollback rates.

### 10.2.17. What is the main advantage of keeping contended data in a single database?

- ACID transaction.

## 10.3. Multi-step Processes

### 10.3.1. Order Messy State in real-world

![](/images/System-Design/Patterns/order-messy-state.png)

### 10.3.2. Single Server Orchestration

![](/images/System-Design/Patterns/single-server-orchestration.png)

- Cons: It have to manually config event state and handle failure in each service.

### 10.3.3. Event Sourcing

![](/images/System-Design/Patterns/event-sourcing-pattern.png)

- Implement event sourcing patterns.

### 10.3.4. Workflow Management

![](/images/System-Design/Patterns/workflow-management-pattern.png)

- Manage state of transaction.

- Query transaction by time.

Use for payment system, rail-hailing system.

![](/images/System-Design/Patterns/workflow-rail-hailing-system.png)

### 10.3.5. How will you handle updates to the workflow ?

- Workflow Versioning.

- Workflow Migrations

### 10.3.6. How do we keep the workflow state size in check

- First, we should try to minimize the size of the activity input and results.

- Second, we can keep our workflows lean by periodically recreating them. If you have a long-running workflow with lots of history, you can periodically recreate the workflow from the beginning, passing only the required inputs to the new workflow to keep going.

### 10.3.7. How do we deal with external events

- External systems send signals through the workflow engine's API. The workflow suspends efficiently - no polling, no resource consumption.

- This pattern handles human tasks, webhook callbacks, and integration with external systems.

### 10.3.8. How can we ensure X step runs exactly once

- Most workflow systems provide a way to ensure an activity runs exactly once ... for a very specific definition of "run".

- The solution is to make the activity idempotent. This means that the activity can be called multiple times with the same inputs and get the same result.

### 10.3.9. What is the primary challenge that multi-step processes address in distributed systems?

- Coordinating multiple services reliably across failures and retries

### 10.3.10. What is the key principle behind event sourcing?

- Store a sequence of events that represent what happened

### 10.3.11. In event sourcing architecture, what triggers the next step in a workflow?

- Workers consuming events from the event store => change state.

### 10.3.12. Workflow systems eliminate the need for building custom infrastructure for state management and orchestration.

- Workflow systems and durable execution engines provide the benefits of event sourcing and state management => without requiring you to build the infrastructure yourself.

### 10.3.13. In Temporal workflows, what is the key requirement for workflows vs activities?

- Workflows must be deterministic (same inputs and history produce same decisions) to enable replay-based recovery.

- Activities must be idempotent (can be called multiple times with same result) but won't be retried once they succeed.

### 10.3.14. Temporal uses a history database to remember activity results during workflow replay.

- Each activity run is recorded in a history database.

- If a workflow runner crashes, another runner can replay the workflow and use the history to remember what happened with each activity invocation.

#### 10.3.15. How do managed workflow systems like AWS Step Functions differ from durable execution engines like Temporal?

- They use declarative definitions (JSON/YAML) instead of code

#### 10.3.16. How do workflow systems handle external events like waiting for user input?

- Workflows use signals to wait for external events efficiently.

### 10.3.17. Apache Airflow is better suited for event-driven, long-running user-facing workflows than scheduled batch workflows

- Apache Airflow excels at scheduled batch workflows like ETL and data pipelines, do not use for user-facing workflows.

## 10.4. Scaling Reads

### 10.4.1. Problem

Consider an Instagram feed. When you open the app, you're immediately hit with dozens of photos, each requiring multiple database queries to fetch the image metadata, user information, like counts, and comment previews. That's potentially 100+ read operations just to load your feed.

Meanwhile, you might only post one photo per day - a single write operation.

=> It's not code problem, it's physics problems about CPU, data, and disk I/O is bounded

### 10.4.2. Solution

1. Optimize read performance within your database

2. Scale your database horizontally

3. Add external caching layers

### 10.4.3. Optimize read performance within your database

- Indexing.

- Hardware Upgrades.

- Denormalization Strategies.

- Materialized views: Precomputing expensive aggregations

### 10.4.4. Scale your database horizontally

- Read Replicas.

- Database Sharding

- Geographic sharding.

### 10.4.5. Add External Caching Layers

- Application-Level Caching: Redis, Memcache.

- CDN.

### 10.4.6. Do not apply for write-heavy system

### 10.4.7. What happens when your queries start taking longer as your dataset grows ?

- Add index.

- Using EXPLAIN to check.

### 10.4.8. How do you handle millions of concurrent reads for the same cached data - Hotpots Problem ?

- Request coalescing: Query data for first requests and add to memcache.

- Distributed load: feed:taylor-swift:1, feed:taylor-swift:2 => in multiple reading shards.

### 10.4.9. What happens when multiple requests try to rebuild an expired cache entry simultaneously?

- When that hour passes and the entry expires, all 100,000 requests suddenly see a cache miss in the same instant.

=> Your database, sized to handle maybe 1,000 queries per second during normal cache misses, suddenly gets hit with 100,000 identical queries.

- Solution:

  - Distributed Cache: Only first requests hit the database => Lock other requests, consider it will peak the server.

  - Stale-while-revalidate: This refreshes cache entries before they expire, but not all at once.

### 10.4.10. How do you handle cache invalidation when data updates need to be immediately visible?

- Write-through caching: Change the value of cache when updating.

- Delete item in cache, after a time => query db and update cache.

- CDN Caching: More complexity, using TTLs in edge caching.

### 10.4.11. Modern hardware and database engines handle write well-designed multiple indexes efficiently.

### 10.4.12. What is the main trade-off when using denormalization for read scaling?

- Increased storage for faster reads

- Denormalization trades storage space for read speed by storing redundant data to avoid expensive joins.

### 10.4.13. What is the key challenge with read replicas in leader-follower replication?

- Replication lag causing potentially stale reads

### 10.4.14. Synchronous replication ensures consistency but introduces latency, while asynchronous replication is faster but potentially serves stale data.

- Yes

### 10.4.15. When does functional sharding make sense for read scaling?

- When different business domains have different access patterns

### 10.4.16. Why do most applications benefit significantly from caching?

- Access patterns are highly skewed - popular content gets requested repeatedly

### 10.4.17. CDNs only make sense for data accessed by multiple users.

### 10.4.18. How should cache TTL be determined?

- Based on non-functional requirements, such as: search results should be no more than 30 seconds stale

### 10.4.19. What is the key benefit of request coalescing for handling hot keys?

- Request coalescing ensures that even if millions of users want the same data simultaneously, your backend only receives N requests - one per application server doing the coalescing.

### 10.4.20. What is the 'stale-while-revalidate' pattern for cache stampede prevention?

- Serving old data while refreshing in the background

### 10.4.21. Cache versioning avoids invalidation complexity by changing cache keys when data updates, making old entries naturally unreachable.

- Yes

## 10.5. Scaling Writes

## 10.6. Handling Large Blobs

## 10.7. Managing Long Running Tasks
