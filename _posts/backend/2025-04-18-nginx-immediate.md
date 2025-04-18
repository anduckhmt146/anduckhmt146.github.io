---
layout: post
title: Nginx Immediate
date: 2025-04-18
categories: backend
---

[Nginx 201] Làm sao để backend scale 20 instance mà Nginx không cần sửa tay ?

Bạn có thể đã từng cấu hình NGINX để reverse proxy đến backend, nhưng đến lúc traffic tăng, bạn scale backend lên 10–20 instance thì ngỏm. Nginx vẫn chỉ biết vài IP cũ trong file config.

Vậy làm sao để NGINX tự biết danh sách backend mới mà không cần bạn sửa tay từng dòng upstream ?

# 1. Câu chuyện thực tế:

Bạn có 1 app backend:

- Đang dùng Nginx làm reverse proxy
- Ban đầu bạn cấu hình:

**Ví dụ:**

upstream backend {
server 201.72.7.628
server 201.73.9.728
}

Nhưng khi bạn scale backend lên 20 instance (trong Docker/K8s), thì:

- Các IP mới không tự vào được upstream.

- Bạn phải sửa file config bằng tay rồi nginx -s reload.

# 2. Cách 1: Dùng Docker dùng nginx-proxy hoặc docker-gen

Cài thêm container nginx-proxy:

- Tự theo dõi container backend (qua Docker socket)

- Sinh file nginx.conf mới với list IP hiện tại

- Tự reload Nginx

**Ví dụ:**

Khi bạn khởi chạy 5 container backend mới, nginx-proxy sẽ auto thêm 5 IP đó vào cấu hình mà bạn không cần đụng tay.

Basic stack:

```bash
docker run -d \
 -p 80:80 \
 -v /var/run/docker.sock:/tmp/docker.sock:ro \
 jwilder/nginx-proxy
```

# 3. Cách 2 : Dùng DNS Round Robin (có thể dùng cả trong Docker lẫn K8s)

- Nginx không cần IP cụ thể, mà chỉ cần 1 domain.

- Domain đó trỏ đến nhiều IP backend.

**Ví dụ:**

resolver 202.82.8.274; // với Docker
upstream backend {
server backend.com resolve;
}

Lưu ý: DNS phải hỗ trợ round-robin (trả về nhiều IP) và TTL ngắn (để NGINX cập nhật nhanh)

# 4. Cách 3: Kubernetes chuẩn chỉnh, dùng Ingress Controller

Trong K8s, bạn không cần tự config Nginx. Dùng nginx-ingress-controller:

- Theo dõi Service và các Pod
- Tự load list IP pod mới
- Route traffic đúng pod, tự scale theo service

# 5. Đánh giá chung:

- **Cách 1:** Thường dùng cho Dev environment hoặc hệ thống nhỏ

- **Cách 2:** Được dùng nhiều nhất trong hệ thống trung bình -> lớn chưa dùng K8s

- **Cách 3:** Dùng trong production lớn, cloud-native system
