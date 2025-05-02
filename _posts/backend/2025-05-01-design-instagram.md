---
layout: post
title: 'System Design: Social Media - Instagram'
date: 2025-05-01
categories: tech
---

Here is some technique for design a social media, such as: Instagram, Facebook,...

# 1. Design

Link: [https://blog.algomaster.io/p/design-instagram-system-design-interview](https://blog.algomaster.io/p/design-instagram-system-design-interview)

![](/images/System-Design/social_media.png)

# 2. Note

## 2.1. Relational Database for Structured Data

Given the structured nature of user profiles and posts metadata, a relational database (like PostgreSQL or MySQL) is often well-suited.

![](/images/System-Design/social_media_sql.png)

## 2.2. NoSQL Databases for High-Volume Data

While relational databases are ideal for structured data, they struggle with high-velocity writes and large scale distributed workloads. NoSQL databases like Cassandra, DynamoDB, or Redis provide horizontal scalability and high availability.

To reduce feed generation latency, a denormalized feed table stores precomputed timelines

- Updated asynchronously via Kafka when a user posts.

- Cached in Redis for quick retrieval.

```bash
{
  "user_id": 56789,
  "feed": [
    {"post_id": 111, "user_id": 123, "media_url": "s3://path1", "caption": "Hello world"},
    {"post_id": 112, "user_id": 234, "media_url": "s3://path2", "caption": "Sunset view"}
  ]
}
```

## 2.3. Using Graph Databases for Social Connections

To support complex relationship queries, such as mutual friends, suggested followers, and influencer ranking, we can use a graph database like Neo4j or Amazon Neptune.

They efficiently model follower-following relationships with nodes and edges.

Example Query: "People You May Know"

```bash
MATCH (me:User {id:12345})-[:FOLLOWS]->(friend)-[:FOLLOWS]->(suggested)
WHERE NOT (me)-[:FOLLOWS]->(suggested)
RETURN suggested LIMIT 5
```

## 2.4. Search Index

To support fast and scalable search queries, we can leverage Elasticsearch, a distributed, real-time search engine optimized for full-text searches.

Each user profile and post metadata can be stored as a document in an Elasticsearch index, allowing quick lookups and advanced filtering.

```bash
{
  "user_id": 12345,
  "username": "john_doe",
  "full_name": "John Doe",
  "bio": "Photographer | Traveler"
}
```

```bash
{
  "hashtag": "#travel",
  "post_count": 1500000,
  "last_used": "2025-03-20T12:00:00Z"
}
```

## 2.5. Media Storage

Instagram handles petabytes of photos/videos, requiring a durable and low-latency storage solution.

A distributed object storage system, such as Amazon S3, is well-suited for storing media files. It supports pre-signed URLs, enabling users to upload media directly without routing through application servers, reducing load and latency.

To ensure high durability, media files are stored in multiple replicas across different data centers, protecting against data loss.

To further optimize read latency, content can be cached closer to users using a Content Delivery Network (CDN) like Cloudflare or Amazon CloudFront. This reduces load times and improves the user experience, especially for frequently accessed media.

## 2.6. Photo/Video Upload

**1. User Initiates the Upload**

- The user selects one or more photos or videos and enters a caption.

- The client (mobile app/web browser) sends an upload request to the API Gateway.

**2. API Gateway Handles the Request**

- The API gateway authenticates and validates the request.

- Routes the request to the Post Service.

**3. Post Service Generates a Pre-signed URL**

- Instead of uploading media directly through the backend, the Post Service generates pre-signed URLs from Object Storage (one per media file).

- It sends the pre-signed URLs back to the client.

**4. Client Uploads Media to Object Storage**

- The client directly uploads each file in parallel to Object Storage via the pre-signed URLs.

- This reduces backend load and enables faster parallel uploads.

- Once all uploads are complete, the client sends a confirmation request to the backend with all media URLs.

**5. Post Service Saves Metadata in the Database**

- The Post Service stores post metadata (caption, timestamp, user ID) in the Posts table and stores each media file separately in the Media Table.

**6. Kafka Publishes a "New Post" Event**

- The Post Service sends an event to Kafka, notifying the Feed Service.

## 2.7. Newsfeed Generation

### Fan-out-on-write (Push Model) for Normal Users

For normal users with a manageable number of followers, we use fan-out-on-write, meaning posts are pushed to followers’ feeds at the time of posting.

**How It Works**

- User A posts a new photo/video.

- The Post Service sends an event to Kafka, notifying the Feed Service.

- The Feed Service identifies the users followers (e.g., 500 followers).

- The post is immediately inserted into each follower’s timeline, stored in Redis (hot cache).

- When followers open their feeds, posts are instantly available, ensuring low-latency reads.

- Example:

LPUSH - Add Post to Followers’ Feeds

User 12345 (John Doe) posts a new photo

He has 500 followers

The Feed Service pushes this post to all 500 followers' feeds

```bash
LPUSH feed:56789 "{'post_id': 98765, 'author': 'john_doe', 'media_url': 'https://cdn.instagram.com/photo98765.jpg', 'caption': 'Sunset at the beach!', 'timestamp': '2025-03-20T14:30:00Z'}"

LPUSH feed:67890 "{'post_id': 98765, 'author': 'john_doe', 'media_url': 'https://cdn.instagram.com/photo98765.jpg', 'caption': 'Sunset at the beach!', 'timestamp': '2025-03-20T14:30:00Z'}"

LPUSH feed:78901 "{'post_id': 98765, 'author': 'john_doe', 'media_url': 'https://cdn.instagram.com/photo98765.jpg', 'caption': 'Sunset at the beach!', 'timestamp': '2025-03-20T14:30:00Z'}"

...
```

Here, John's post is pushed to the feeds of followers 56789, 67890, and 78901, along with 497 other followers.

### Fan-out-on-read (Pull Model) for Celebrities

For celebrities and influencers, where a single post may need to reach millions of followers, preloading into every follower’s feed is impractical.

Instead, a fan-out-on-read (pull model) is used.

**How It Works**

1. When a user requests their newsfeed, the Feed Service dynamically retrieves:

   - Normal users’ posts from Redis (precomputed feeds).

   - Celebrity posts from a hot cache (Redis) or a persistent store (PostgreSQL).

2. The system merges both types of posts in real-time before serving the feed.

## 2.8. Search Request

### Indexing New Content

**1. A New Post/User is Created**

- A user uploads a post or creates an account.

- The Post/User stores metadata in the database.

- The Post/User Service publishes an event to Kafka.

**2. Search Service Updates Elasticsearch Index**

- The Search Service consumes Kafka events and adds new users, posts, or hashtags to Elasticsearch.

### Search Request

**1. User Initiates a Search Request**

- The user types a query in the search bar (e.g., "john_doe" or "#travel").

- The client (mobile/web) sends a request.

- The request is routed via the API Gateway to the Search Service.

**2. Search Service Queries Elasticsearch**

- The Search Service first checks Redis Cache for recent searches. If not found, queries Elasticsearch for relevant results.

- Elasticsearch performs full-text search, prefix matching and ranking based on engagement/popularity.

**3. Elasticsearch Returns Results**

- Elasticsearch returns ranked results matching the query.

- The Search Service formats the response.

```bash
{
  "users": [
    { "user_id": 12345, "username": "john_doe", "full_name": "John Doe", "profile_pic": "https://cdn.example.com/john.jpg" },
    { "user_id": 67890, "username": "johnny_depp", "full_name": "Johnny Depp", "profile_pic": "https://cdn.example.com/johnny.jpg" }
  ],
  "hashtags": [
    { "tag": "travel", "post_count": 10M },
    { "tag": "travelphotography", "post_count": 5M }
  ]
}
```

**4. Search Results are Cached in Redis**

- The Search Service caches frequent queries in Redis for faster lookups.

- Next time a user searches for the same query, the result is served from Redis instantly.

## 2.9. Like, Share, Comment

- The Engagement Service processes like, comment and share requests.

- It sends a Kafka event to update the DB asynchronously.

**Like event:**

```bash
{
  "event": "POST_LIKED",
  "user_id": 12345,
  "post_id": 67890
}
```

**Share event:**

```bash
{
  "event": "POST_SHARED",
  "user_id": 12345,
  "post_id": 67890
}
```

**Comment event:**

```bash
{
  "event": "POST_COMMENTED",
  "user_id": 12345,
  "post_id": 67890,
  "comment_id": 99999,
  "content": "Amazing shot!"
}
```

To optimize the latency for popular posts, we can cache like / share count and top comments.
