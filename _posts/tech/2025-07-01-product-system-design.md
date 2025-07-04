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