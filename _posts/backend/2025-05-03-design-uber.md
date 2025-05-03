---
layout: post
title: 'System Design: Rail-hailing - Uber'
date: 2025-05-03
categories: tech
---

Here is some concepts of System Design: Rail-hailing - Uber.

# 1. Design

Link: [https://blog.algomaster.io/p/design-uber-system-design-interview](https://blog.algomaster.io/p/design-uber-system-design-interview)

![](/images/System-Design/uber.png)

## 1.1 User Management

Manages rider and driver accounts, preferences, and availability.

### Rider Service

- Handles registration, login, and profile updates for riders.
- Stores rider preferences such as:
  - Default payment methods
  - Favorite locations

### Driver Service

- Manages driver availability (online/offline).
- Stores vehicle information including:
  - Make
  - Model
  - License plate

## 1.2. Ride Management

Handles the full lifecycle of a ride, from request to completion.

### Ride Service

- Manages ride creation and tracks ride status:
  - Requested → Driver Assigned → In-progress → Completed
- Coordinates with:
  - Matching Service
  - Routing Service
  - Payment Service

### Matching Service

- Finds the nearest available drivers for ride requests.
- Performs fallback matching if a driver declines.
- Queries the **Location Service** or geo-indexed data for driver locations.
- Updates the **Ride Service** with the selected driver.

### Location Service

- Stores driver locations in an in-memory or geo-indexed datastore (e.g., Redis, NoSQL).
- Receives frequent location updates (every 3 seconds).
- Supports:
  - Real-time driver tracking
  - Matching optimization

### Routing Service

- Calculates:
  - Optimal routes
  - Estimated Time of Arrival (ETA)
  - Turn-by-turn directions
- Supports external APIs (e.g., Google Maps, Mapbox) and internal geospatial systems.

### Pricing Service

- Computes ride fares based on:
  - Distance
  - Time
  - Surge pricing
- Provides fare estimates and finalizes trip cost with the **Ride Service**.

## 1.3. Post-Ride Management

Handles transactions and feedback after ride completion.

### Payment Service

- Processes transactions and stores payment history in a SQL database.
- Integrates with external providers:
  - Stripe
  - PayPal
- Supports credit card and digital wallet transactions.

### Rating Service

- Enables both riders and drivers to **rate each other** after a ride.

# 2. Workflow

## 2.1. Booking a Ride

This document outlines the detailed flow of how a ride is booked within the ride-sharing platform.

### 🧾 Rider Initiates a Ride Request

- The rider opens the app and inputs pickup and destination locations.
- Taps the **"Request Ride"** button.
- The request (including rider ID and location data) is sent to the **API Gateway** via HTTPS.
- The **API Gateway** authenticates the request (e.g., JWT token validation) and forwards it to the **Ride Service**.

### 🛠️ Ride Service Creates a New Ride

- Creates a new ride entry in the **SQL database** with status `REQUESTED`.
- Calls:
  - **Pricing Service** to get a fare estimate.
  - **Routing Service** to retrieve the ETA.
- Finalizes the ride request before moving forward.

### 🔍 Matching Service Locates an Available Driver

- After rider confirms the request, the **Ride Service** invokes the **Matching Service**.
- **Matching Service**:
  - Queries the **Location Service** (or geo-indexed store) to find available drivers near the pickup location.
  - Sorts/ranks drivers by proximity, ratings, acceptance rate, etc.
  - Selects the best candidate.
  - Sends a **push notification** to the selected driver's mobile app.
- The driver sees ride details (pickup location, estimated fare, ETA) and has a limited time to accept/decline.

### ✅ Driver Accepts (or Declines) the Ride

- If the driver **accepts**, the **Driver App** notifies the **Matching Service**.
- If the driver **declines**, the **Matching Service** selects the next best candidate.
- On acceptance:
  - **Matching Service** updates the **Ride Service** with the assigned driver.
  - **Ride Service** updates the ride record in the database:
    - Assigned driver info
    - Status: `DRIVER_ASSIGNED`

### 📩 Rider Receives Confirmation

- **Ride Service** sends a notification to the rider via app push message.
- Rider app displays:
  - Driver’s name
  - Vehicle details
  - **Real-time ETA** (from Routing Service)

This sequence ensures a seamless and dynamic interaction between services to optimize ride assignment and user experience.

## 2.2 Finding Nearby Drivers

Finding nearby drivers is a core use case in any ride-hailing system. It must be fast, accurate, and scalable to handle millions of concurrent ride requests efficiently.

### 2.2.1. Naive Solution: Using a Relational Database (SQL)

A basic approach is to store driver locations in a SQL database (e.g., MySQL, PostgreSQL) and query nearby drivers using Haversine formula.

**Query: Finding Drivers within 5 km (Using Haversine Formula)**

```sql
SELECT driver_id, latitude, longitude,
       (6371 * acos(cos(radians(37.7749)) * cos(radians(latitude))
       * cos(radians(longitude) - radians(-122.4194))
       + sin(radians(37.7749)) * sin(radians(latitude)))) AS distance
FROM drivers
WHERE status = 'available'
HAVING distance <= 5
ORDER BY distance ASC
LIMIT 10;
```

### 2.2.2. Using Database Extensions like PostGIS

PostGIS is a spatial database extension for PostgreSQL, allowing geospatial indexing.

**Query: Finding Nearby Drivers Using PostGIS**

```sql
SELECT driver_id, ST_DistanceSphere(location, ST_MakePoint(-122.4194, 37.7749)) AS distance
FROM drivers
WHERE status = 'available'
AND ST_DWithin(location, ST_MakePoint(-122.4194, 37.7749)::GEOGRAPHY, 5000) -- 5 km radius
ORDER BY distance ASC
LIMIT 10;
```

### 2.2.3. Geohashing (Efficient Grid-Based Search)

Geohashing converts latitude & longitude into a string representation by dividing the world into hierarchical grids. Nearby locations have similar geohashes, allowing efficient lookups.

**How Geohashing Works:**

- The world is divided into a grid with cells of different sizes.

- Each latitude/longitude pair is converted into a unique hash string (e.g., "9q9hv" for San Francisco).

- To find nearby drivers, search for drivers in the same or adjacent geohash regions.

**Example: Storing Driver Locations in Redis (Key-Value Store)**

```sql
GEOADD drivers -122.4194 37.7749 "driver_123"
```

**Query: Finding Drivers in a 5 km Radius**

```sql
GEORADIUS drivers -122.4194 37.7749 5 km WITHDIST
```

### 2.2.4. Quadtree (Hierarchical Spatial Indexing)

A quadtree is a tree-based spatial data structure that recursively divides a 2D space into quadrants.

![](/images/System-Design/uber_quadtree.png)

**Example: Querying a Quadtree for Nearby Drivers**

```python
quadtree.find_nearby(lat=37.7749, lon=-122.4194, radius=5000)
```

### 2.2.5. What Does Uber Actually Use?

![](/images/System-Design/uber_h3.png)

**What is H3?**

H3 is an open-source geospatial indexing system developed by Uber.

It divides the world into hexagonal cells instead of squares (used in Geohashing).

Each hexagon has better spatial coverage (less overlap, more uniform).

H3 supports hierarchical indexing, allowing efficient nearby searches.

## 2.3 Real-Time Tracking

### 🚗 Driver Location Updates

- The driver's app captures GPS coordinates (latitude & longitude) every **3 seconds**.
- Location data is sent to the **Location Service** via an API call.
- The **Location Service** validates and stores the **latest position** in an in-memory datastore (e.g., **Redis**, **DynamoDB**).
- A fast, **ephemeral storage system** with **geospatial indexing** (like Redis) is used due to frequent location updates.

### 👁️ Rider Tracking the Driver’s Location

There are two approaches for delivering real-time updates to the rider’s app:

1. **Polling (API Calls Every Few Seconds)**

   - ✅ Simple to implement
   - ⚠️ High network usage, increased server load

2. **WebSockets (Push Updates)**
   - ✅ Low latency, efficient
   - ⚠️ More complex implementation

**✅ Recommendation:** Use **WebSockets** as the primary real-time tracking method with **polling** as a fallback.

**🔁 Workflow:**

- Rider app opens a WebSocket connection at the start of a ride.
- Subscribes to driver location updates.
- Location Service emits updates every 3 seconds.
- Rider app dynamically renders the driver's position on the map.

## ⏱️ 2.4 ETA Computation (Estimated Time of Arrival)

ETA is calculated in **two parts**:

1. **Pickup ETA** – Time for the driver to reach the rider's pickup location.
2. **Drop-off ETA** – Time from pickup to the final destination.

### 🚘 Find the Closest Available Drivers

- Query the **Location Service** (with or without a geospatial index) for nearby **active drivers**.
- The **Matching Service** can filter drivers based on availability, ratings, or cancellation history.

### ⏳ Determine the Estimated Pickup Time

- Use the **Routing Service** to estimate travel time for each nearby driver.
- Include **real-time traffic conditions** in calculations.
- Select the driver with the **shortest ETA** (or apply custom business logic).

### 🚦 Calculate the Estimated Drop-off Time

- The **Routing Service** computes the optimal route from pickup to drop-off.
- Takes into account **historical trip data** and **live traffic updates**.

### 🔄 ETA Recalculation

- The **Ride Service** periodically invokes the **Routing Service** to refresh ETAs.
- Recalculation may be triggered by **traffic conditions** or **route changes**.
- The updated ETA is displayed to the rider.

## 💰 2.5 Fare Estimation

The **Pricing Service** calculates the estimated fare before booking confirmation based on various real-time and historical metrics.

### 🧮 Fare Formula

```bash
Total Fare = Base Fare + (Cost per km × Distance) + (Cost per minute × Time) + Surge Multiplier + Tolls
```

### 📌 Component Breakdown

- **Base Fare** – Flat fee to start the ride (e.g., $2.00).
- **Cost per km** – Rate per kilometer traveled.
- **Cost per minute** – Rate for time spent (e.g., traffic delays).
- **Surge Pricing** – Multiplier applied when demand exceeds supply.
- **Tolls & Taxes** – Additional fees based on route and region.

### 📝 Steps for Fare Estimation

1. **Retrieve Distance & Time**

   - Pull estimated travel distance and duration from the **Routing Service**.

2. **Check for Surge Pricing**

   - Compare **real-time demand vs. supply**.
   - Apply **surge multiplier** (e.g., 1.5x, 2x) for high-demand periods.

3. **Apply Pricing Formula**

   - Use **city-specific rate cards**.
   - Add tolls if applicable.

4. **Return Estimated Fare**
   - Output a **price range** (e.g., $12–$15) to account for traffic variation.

## 💳 2.6 Handling Payments Post-Ride

### ✅ Ride Completion

- When a ride ends (status: `COMPLETED`), the **Ride Service**:
  - Updates the ride record in the SQL database.
  - Notifies the rider via app.
  - Begins fare finalization and payment processing.

### 💵 Final Fare Calculation

- **Ride Service** gathers final data:
  - Distance traveled, time, surge multiplier.
- Calls **Pricing Service** to calculate the **final fare**.
- Updates the fare in the ride record for payment.

### 🔐 Payment Authorization & Processing

1. **Triggering Payment**

   - Triggered by the **Ride Service** or an **Event-Driven** system (e.g., message queue).

2. **Lookup & Verification**

   - The **Payment Service** checks the **default payment method** via the **User Service**.
   - If missing, rider is prompted to update it.

3. **Charge Initiation**

   - Uses an **external payment gateway** (e.g., Stripe, PayPal).
   - Initiates an **asynchronous charge**.

4. **Webhook Notification**

   - Upon charge success/failure, a **webhook event** notifies the **Payment Service**.

5. **Update Payment Status**
   - Database updated from `PENDING` ➝ `SUCCESS` or `FAILED`.

---

## ✅ Summary

This system ensures:

- Accurate real-time tracking with minimal latency.
- ETA and fare estimations that adapt to live traffic and demand.
- Seamless post-ride payment flows powered by event-driven architecture.
