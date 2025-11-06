---
layout: post
title: Scalability
date: 2025-04-17
categories: system-design
---

[Scalability] Làm sao để tối ưu hệ thống khi có 1 triệu user truy cập cùng 1 lúc ?

Để hệ thống vận hành trơn tru khi có hàng triệu người dùng truy cập cùng lúc, một Software Architect cần phải suy nghĩ về rất nhiều yếu tố

Dưới đây là một checklist đầy đủ về những nguyên nhân gây nghẽn và giải pháp tối ưu, giúp hệ thống của bạn luôn sẵn sàng với lưu lượng lớn

# 1. Tắc nghẽn do kiến trúc monolithic

Toàn bộ logic và resource gộp chung => gặp khó khăn khi scale

**Giải pháp:**

- Chuyển sang microservice

- Stateless hóa service để scale horizontal

- Đặt API Gateway (rate-limit, circuit breaker)

- Dùng service mesh (Istio, Linkerd) nếu cần observability

![](/images/service_mesh.png)

# 2. DB nghẽn do query trực tiếp quá nhiều

1 triệu user suy ra khoảng hàng chục triệu query đổ vào db

**Giải pháp:**

- Dùng connection pool (HikariCP, PgBouncer)

- Read/Write Splitting (Master-Slave)

- Caching layer (Redis/Memcached) cho data nóng

- Phân mảnh (sharding) hoặc partition bảng lớn

MySQL table partitioning is used to improve query performance, data management, and storage efficiency, especially when dealing with large datasets => thay vì scan all thì chia nhỏ nhiều bảng ra để query nhanh hơn.

![](/images/partition.jpg)

# 3. Tác vụ nặng nằm trong request chính

Gửi email, ghi log, xử lý ảnh… nằm trong flow sync dẫn đến chậm

**Giải pháp:**

- Dùng Message Queue (Kafka, RabbitMQ, Redis Streams)

- Producer đẩy job, Consumer xử lý bất đồng bộ

- Retry logic có delay, dead-letter queue

# 4. Thiếu cache hoặc dùng cache sai cách

Query data mỗi lần load trang dẫn đến hệ thống không chịu nổi

**Giải pháp:**

- Multi-layer cache: CDN -> Redis -> Local Cache

- TTL, cache invalidation đúng cách

- Cache theo key động: user:{id}, homepage:{lang}

- Dùng cache-aside thay vì write-through nếu dữ liệu thường xuyên thay đổi

# 5. Frontend và API không được tối ưu

FE spam nhiều API, payload lớn, thiếu lazy load.

**Giải pháp:**

- Dùng GraphQL/BFF để gộp API.

- Enable GZIP, HTTP/2, CDN cho static.

- Debounce input, paginate mọi list.

- Prefetch thông minh thay vì load tất

# 6. Hạ tầng không tự scale

Traffic tăng đột biến nhưng app không scale theo

**Giải pháp:**

- Deploy lên Kubernetes (HPA, VPA)

- Sử dụng autoscaling EC2, Cloud Run, Fargate.

- Load Balancer layer 7 (ngăn DDoS, phân tải thông minh).

HTTP and TCP are both essential protocols for web communication, but they operate at different layers of the network stack.

- TCP (Transmission Control Protocol) is a transport-layer protocol responsible for reliable, ordered, and error-checked delivery of data packets.

- HTTP (Hypertext Transfer Protocol) is an application-layer protocol that defines how data, like web pages and images, is formatted and transferred over the internet

![](/images/load-balancing.png)

- Layer 4 load balancer xử lý dữ liệu tìm thấy trong các giao thức tầng mạng và giao vận (IP, TCP, FTP, UDP).

- Layer 7 load balancer phân phối yêu cầu dựa trên dữ liệu tìm thấy trong tầng ứng dụng, lớp giao thức như HTTP.
