---
layout: post
title: Nginx Advanced
date: 2025-04-18
categories: backend
---

[Docker + Nginx] Config Nginx cơ bản cho SPA (React) & Spring Boot trong Docker

Đây là hướng dẫn cơ bản phần sau khi ae đã biết tự viết Dockerfile file nhé !

# 1. Kiến trúc & Mục tiêu

- React SPA port 3000 -> serve static
- Spring Boot API port 8080
- Nginx làm reverse proxy
- Chạy tất cả trong Docker Compose

# 2. Git Pull Source

- Cài git trên server.

- Có thể dùng cách này login qua username và token để có thể pull source từ repo của git về.

# 3. Cấu trúc thư mục và compose

docker-compose.yml
nginx
default.conf
services
frontend (React)
backend (Spring Boot)

docker-compose.yml

![](/images/dockerfile_spring_react.jpg)

# 4. Nginx config (nginx/default.conf)

![](/images/nginx_spring_react.jpg)

# 5. Build and Run

Trở về folder chứa docker-compose.yml

Run cmd: docker-compose up -d --build (có thể là docker compose up -d --build tuỳ version của docker-compose)

# 6. Lưu ý về post này

- Trc khi cấu hình nginx thì phải Trỏ tên miền & HTTPS. DNS: Tạo A record trỏ domain.com -> IP máy chủ chạy Docker/Nginx.

- Chưa có HTTPS: Có thể lục lại post trc mình có nói về việc lấy ssl free hoặc bn có thể đki mua

# 7. Nâng cao hơn

Security headers: HSTS, X-Frame-Options, X‑Content‑Type‑Options...

- Timeouts: Đặt proxy_read_timeout/proxy_connect_timeout để tránh socket treo

- Rate limiting: Dùng limit_req_zone để chống DDOS cơ bản

- Gzip/Compression: Kích hoạt gzip on; gzip_types,... để giảm băng thông

- Client caching: Thêm cache-control, expires cho static assets

- Health check: Định nghĩa location /healthz để LB hoặc k8s probe.

- Env vars & secrets: Đừng hardcode trong config, dùng Docker secrets hoặc Vaul
