---
layout: post
title: Consistent Trap
date: 2025-04-17
categories: backend
---

[Consistency Trap] Làm sao để đảm bảo dữ liệu nhất quán khi scale microservices ?

Khi chuyển từ monolith sang microservices, vấn đề data consistency trở nên cực kỳ đau đầu.
Vì sao lại khó ? Làm sao để tránh “mất đồng bộ” khi hệ thống ngày càng phức tạp ?
Cùng đi qua nguyên nhân, ví dụ thực tế và các giải pháp nhé ae !

# 1. Nguyên nhân:

- Mỗi service 1 database. Trong kiến trúc microservices, mỗi service thường có DB riêng biệt nên không thể dùng transaction xuyên DB như thời monolithic.

Kết quả:

- Dữ liệu bị sai lệch giữa các service
- Không rollback được nếu 1 bước fail giữa chừng

# 2. Ví dụ thực tế: Đặt hàng

Quy trình:

- User tạo đơn hàng
- Trừ hàng trong kho
- Gửi mail xác nhận

Nếu bước 2 fail (hết hàng), bạn rollback kiểu gì nếu đã lưu đơn hàng ở bước 1 ?

# 3. Giải pháp

## 1. SAGA Pattern

- Tách transaction lớn thành nhiều step nhỏ
- Mỗi step là 1 local transaction. Nếu 1 step fail -> gọi step bù (compensating)
  Ví dụ:

* Step 1: Tạo order
* Step 2: Trừ kho
* Nếu step 2 fail → gọi rollback để huỷ order

Có 2 loại SAGA:

- Choreography: Các service publish/subcribe lẫn nhau qua message broker
- Orchestration: Có 1 coordinator gọi từng step

## 2. Eventual Consistency

- Chấp nhận dữ liệu sẽ tạm thời không đồng bộ, miễn sao sẽ nhất quán “cuối cùng”.
- Được dùng nhiều trong hệ thống phân tán như Kafka, Elasticsearch.

## 3. Outbox Pattern

- Khi thay đổi dữ liệu, bạn ghi event vào một bảng outbox
- Worker đọc bảng này và publish ra message broker. Đảm bảo atomicity giữa DB và event.
- Kết hợp tốt với CDC (Change Data Capture) để đẩy sự kiện realtime

Ví dụ: Change Data Capture (CDC) được dùng trong quá trình migrate dữ liệu database sang nhiều data source khác nhau bằng cách hứng các câu query INSERT, UPDATE events,... trong quá trình migrate sang nhiều data source khác nhau.

![](/images/cdc.png)

Khi scale hệ thống, bạn cần thiết kế theo tư duy bất đồng bộ. Đừng cố ép mọi thứ “giống như monolith”, vì chính tư duy đó là điểm nghẽn.
Giữ được consistency trong microservices không hề dễ, nhưng nếu nắm vững Saga, Outbox, Eventual Consistency, thì bạn đang đi đúng
