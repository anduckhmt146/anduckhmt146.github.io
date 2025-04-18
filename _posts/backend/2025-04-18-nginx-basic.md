---
layout: post
title: Nginx Basic
date: 2025-04-18
categories: backend
---

[Nginx 101] Công dụng thật sự của Nginx trong quá trình deploy hệ thống là gì ?

Bạn từng nghe đến nginx như 1 web server nổi tiếng. Nhưng đó chỉ là 1 phần nhỏ của nginx

# 1. Làm Reverse Proxy (công dụng phổ biến nhất)

Giúp chuyển tiếp request từ client vào các app server phía sau (Spring Boot, Node.js, v.v)

**Lợi ích:**

- Giấu app thật sau nginx (tăng security)

- Load balancing nhiều app instance

- Dễ scale ngang microservices

- Cấu hình HTTPS SSL tập trung

# 2. Serve static file (ảnh, HTML, JS, CSS)

Thay vì để backend serve file tĩnh -> dùng nginx để làm điều đó nhẹ hơn và nhanh hơn

Use case thực tế:

- Deploy SPA (Vue, React) lên VPS

- Dùng location / trỏ tới thư mục build

# 3. Tạo Load Balancer đơn giản

Tự làm 1 mini load balancer mà không cần dùng HAProxy hay service mesh

Vd:
upstream app_servers {
server 127.0.0.1:8080;
server 127.0.0.1:8081;
}

**Lợi ích:**

- Phân tải dễ dàng

- Có thể config thêm health check, sticky session

**How do sticky sessions work?**

- In client-server protocols, like HTTP, a session is a group of client interactions with a server within a given time span — for example, viewing multiple pages on a website or performing multiple actions on a web application. During a session, data is stored on the server, and this method utilizes features that would not be possible otherwise, for example, keeping the client authenticated.

- Without sticky sessions, requests coming from the same client would be routed to a different server each time. The following diagram illustrates how requests are routed with and without sticky sessions.

Nghĩa là với sticky session, thì mỗi session nó vào 1 pod cụ thể.

![](/images/sticky-sessions.jpg)

# 4. Làm Gateway cho hệ thống microservices

Chuyển route theo path tới từng service riêng biệt
Ví dụ: /auth → auth-service, /api → api-service

**Lợi ích:**

- Dễ config routing

- Dễ kiểm soát CORS, headers, security

# 5. Tăng hiệu suất xử lý nhờ caching

- Cache các response tĩnh

- Cache file JS/CSS có version

- Giảm áp lực cho backend

# 6. Redirect / Rewrite URL linh hoạt

- Chuyển hướng HTTP → HTTPS

- Redirect domain cũ sang domain mới

- Rewrite path cho phù hợp frontend/backend

# 7. Bảo mật

- Giới hạn số request/IP → chống DDoS cơ bản

- Chặn bot, fake User-Agent

- Cấu hình WAF (với module ngoài)

# 8. Monitoring & log

- Ghi access log, error log chuẩn format

- Dễ tích hợp ELK, Promtail + Loki

- Đo lường performance từng request

Tổng kết:

- Nginx không chỉ là web server.

- Nó là bảo kê tuyến đầu cho backend, đóng vai trò cực kỳ quan trọng từ routing, bảo mật đến caching và scale hệ thống.

- Dù bạn deploy app nhỏ hay microservice lớn biết dùng NGINX chuẩn bài sẽ tiết kiệm rất nhiều công sức và tiền bạc
