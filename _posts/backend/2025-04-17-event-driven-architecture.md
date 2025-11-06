---
layout: post
title: Event Driven Architecture
date: 2025-04-17
categories: system-design
---

[Event-Driven Architecture] Làm thế nào EDA giúp hệ thống scale và xử lý bất đồng bộ hiệu quả ?

Bạn đã từng nghe “Webhooks gửi event thì hệ thống khắp nơi phản ứng ngay” chưa ?

Hãy cùng khám phá EDA, kiến trúc giúp tách rời các thành phần và xử lý việc giao tiếp trong hệ thống một cách bất đồng bộ, cực kỳ hiệu quả cho các hệ thống số lượng request lớn !

# 1. EDA là gì?

- EDA là mô hình thiết kế hệ thống dựa trên sự kiện.

- Khi một sự kiện xảy ra (user đăng ký, đơn hàng tạo, file upload…), service producer phát sinh event, đẩy vào event broker (RabbitMQ, Kafka, v.v.), và các service consumer sẽ lắng nghe, xử lý event đó

# 2. Tại sao cần EDA?

- Bất đồng bộ và Non-blocking: Service không phải chờ đợi xử lý các tác vụ phụ, giúp response nhanh

- Decoupling: Các service độc lập với nhau, dễ bảo trì và scale riêng

- Khả năng mở rộng: Thêm consumer mới để xử lý event mà không cần thay đổi producer

# 3. Ví dụ thực tế:

- Đơn hàng online:

* Khi user tạo đơn hàng, Service Order chỉ lưu đơn hàng và phát sinh event OrderCreated.
* Các service khác (EmailService, InventoryService, LogService) nhận sự kiện này để gửi email xác nhận, trừ tồn kho, và ghi log.

- Nhờ vậy, hệ thống phản ứng realtime mà không bị trễ do xử lý tất cả trong 1 transaction

# 4. Ưu điểm của EDA:

- Performance: Xử lý event bất đồng bộ, giảm độ trễ

- Scalability: Mỗi service có thể scale độc lập, theo nhu cầu xử lý event

- Resilience: Có thể triển khai retry, dead-letter queue nếu một event không được xử lý thành công

- Flexibility: Dễ thêm mới tính năng mà không ảnh hưởng đến flow

![](/images/dead-letter-queue.png)

# 5. Nhược điểm và Thách thức:

- Complexity: Cần quản lý và monitoring event broker, xử lý retry, đảm bảo order trong từng partition (trong Kafka) hoặc đúng thứ tự FIFO (trong RabbitMQ nếu chỉ 1 consumer)

- Debugging: Xác định nguồn gốc lỗi trong flow event có thể phức tạp do tính bất đồng bộ

- Consistency: Đảm bảo event được xử lý đúng thứ tự cần có kỹ thuật bổ trợ (ví dụ: sequence number, timestamp)

# 6. Giải pháp tối ưu EDA:

- Chọn đúng công nghệ broker: Kafka nếu cần throughput cao và FIFO theo partition, RabbitMQ nếu hệ thống nhỏ hơn và cần đơn giản

- Thiết kế event schema rõ ràng: Bao gồm các thông tin định danh (eventId, timestamp, sourceId)

- Xây dựng cơ chế retry và dead-letter queue: Để xử lý event thất bại

- Monitoring và Logging: Sử dụng Prometheus, Grafana, ELK để theo dõi luồng event và xử lý lỗi kịp thời

# 7. Best Practice:

- Sử dụng Contract-driven Development cho event schema: Đảm bảo tất cả các consumer đều biết định dạng event

- Chia nhỏ event nếu cần thiết để tối ưu việc xử lý xen kẽ

- Implement idempotency: Để đảm bảo nếu event bị lặp thì consumer không xử lý lặp lại

# 8. Khi nào không nên dùng EDA:

- Với các ứng dụng nhỏ hoặc đơn giản, nơi các call sync có thể đảm bảo performance và không cần quá nhiều sự kiện

- Khi độ trễ của event broker không đáp ứng yêu cầu realtime của ứng dụng
