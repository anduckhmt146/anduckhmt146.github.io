---
layout: post
title: 'Zalopay Payment - Concept'
date: 2025-02-23
categories: tech
---

Here is some general knowledge about integrate payment with Zalopay by my self-learning.

Documents: [https://beta-docs.zalopay.vn/docs/openapi](https://beta-docs.zalopay.vn/docs/openapi)

# 1. General Flow

You only need to focus some keys and 2 API:

- Key: app_id, mac_key, callback_key information from Zalopay

- Create Order API

- Query Order API

You only need to understand main concepts:

- **Step 1:** User -> Merchant BE -> **Create Order** -> Zalopay => Zalopay return order_url (can used to create QR).

- **Step 2:** User -> order_url -> Payment success => **Fallback (Redirect) to Merchant BE** -> Update merchant inventory in merchant BE -> Show success in merchant FE.

- **Step 3:** In case of fallback failed by network, can use **Query API** to check the transaction status.

![Payment Flow](/images/payment-flow.png)

# 2. Business Model

## 2.1. Payment Gateway

![Payment Gateway](/images/payment-gateway.png)

## 2.2. Multifunction QR (VietQR)

This QR is generated from order_url, can be paid by: flexibly use any banking application (Vietcombank, OCB,...) or digital wallet.

![VietQR](/images/viet-qr.png)

## 2.3. Apple Pay

![Apple Pay](/images/apple-pay.png)

## 2.4. Google Pay

![Google Pay](/images/google-pay.png)

## 2.5. Quick Pay (Personal QR)

![Personal QR](/images/personal-qr.png)

## 2.6. POS QR Code

### 2.6.1. Static QR

- Only need to print QR of merchant account => User scan by hand and input the amount, manually check.

![Static QR](/images/static-qr.png)

### 2.6.2. Dynamic QR

- **Case 1:** Merchant input amount in POS, example 100k VND => POS generate static QR.

- **Case 2:** QR is generated in merchant website, for example: Tiki based on total amount => Dynamic QR by price.

![Dynamic QR](/images/dynamic-qr.png)

## 2.7. Tokeninzation Payments

Used in monthly billing products or subscription.

### 2.7.1. Wallet Token

- Auto payment for monthly bill by amount in wallet.

### 2.7.2. Card Token

- Auto payment for monthly bill by credit card.

### 2.7.3. Subcription

- Use to pay for subscription in credit cards.

## 2.8. Cash on delivery (directly payment)

- This is pay when receive shipping of food, mobility, ordered products of shipper.

![Zalopay ZOD](/images/zod.png)

# 3. API Details

Docs: [https://beta-docs.zalopay.vn/docs/openapi](https://beta-docs.zalopay.vn/docs/openapi)

## 3.1. Order

1. Create order: /v2/create

Here is some main fields

- app_id: The app that merchant register with zalopay.

- app_trans_id: merchant generate for tracking.

- amount: amount of order.

- redirect_url: fallback url of merchant for Zalopay to notify the process the transaction (success/failed)

- mac: It is signature of order. It's calculated by following input: hmac_input = app_id | app_trans_id | app_user | amount | app_time | embed_data | item with SHA256.

2. Query: /v2/query

Here is some main fields

- app_id

- app_trans_id

- mac

## 3.2. Refund

1. Refund transaction: /v2/refund

Here is some main fields

- app_id

- m_refund_id: refund id.

- zp_trans_id: transaction id.

- amount: the amount to refund.

- mac

2. Query refund: /v2/query_refund

Here is some main fields

- app_id

- m_refund_id

- mac

## 3.3. Binding

1. Bind token: /v2/tokenization/bind

2. Query token: /v2/tokenization/query

3. Bind aggrement: /v2/agreement/bind

4. Unbind aggrement: /v2/agreement/unbind

5. Request for agreement pay (merchant call): /v2/agreement/pay

6. Query user balance: /v2/agreement/balance

## 3.4. OAuth

![Oauth2](/images/oauth2.png)

Notes:

- Generate authorization token only required client_id + privileges.

- Generate access_token required authorization token + client_id + client_secret.

- Generate authorization first to prevent man of the middle attack.

- The tranfer token flow should only be by 2 servers.
