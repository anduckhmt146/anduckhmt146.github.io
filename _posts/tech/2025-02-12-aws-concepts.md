---
layout: post
title: 'AWS Concepts'
date: 2025-03-30
categories: tech
---

Here is the concepts of AWS that I learned for AWS Certified Cloud Practitioner.

# 1. Cloud Computing

## 1.1. The deployment model of the cloud

Private cloud:

- Cloud services used by a single organization, not exposed to the public

- Complete control

- Security for sensitive applications

- Meet specific business needs

Public cloud:

- Cloud resources owned and operated by a third-party cloud service provider delivered over the internet

Hybrid cloud:

- Keep some server on premises and extend some capabilities to the cloud

- Control over sensitive assets in your private infrastructure

- Flexibility and cost-effectiveness of the public cloud

## 1.2. Five characteristics of Cloud Computing (5 tính chất)

- **On-demand self service:**

  - Users can provision recources and use them without human interaction from the service provider

- **Broad network access**

  - Resources available over the network and can be accessed by diverse client platforms

- **Multi-tenancy and resource pooling**

  - Multiple customers can share the same infrastructure and applications with security and privacy

  - Multiple customers are serviced from the same physical resources

- **Rapid elasticity and scalability**

  - Automatically and quickly acquire and dispose resources when needed
  - Quickly and easily scale based on demand

- **Measured service**

  - Usage is measured, users pay correctly for what they have used

## 1.3. Six advantages of Cloud Computing (6 lợi ích)

- **Trade capital/fixed expense (CAPEX) for operational/ variable expense (OPEX):** You pay for what you use instead of making huge upfront investments

  - Pay On-Demand: don't own hardware

  - Reduced total cost of ownership (TCO) & operational expense (OPEX)

- **Benefit from massive economies of scale:** Volumne discounts are passed on to you, which provides pay-as-you-go prices

  - Prices are reduced as AWS is more efficient due to large scale

- **Stop guessing capacity:** Your capacity is matched exactly to your demand

  - Scale based on actual measured usage

- **Increase speed and agility:** They provided services allow you to innovate more quickly and deliver yours applications faster

- **Stop spending money running and maintaining data centers:** Your can focus on building your application instead of managing hardware

- **Go global in minutes:** leverage the AWS global infrastructure. You can deploy your application around the world at the click of a button

## 1.4. Problems solved by the Cloud

- **Flexibility:** change resource types when needed

- **Cost-effectiveness:** pay as you go, for what you use

- **Scalability:** accomodate larger loads by makng hardware stronger or adding additional nodes

- **Elasticity:** ability to scale out and scale in when needed

- **High-availability and fault-tolerance:** build accross data centers

- **Agility:** rapidly develop, test and launch software applications

## 1.5. Benefits of Cloud Computing

- **High availability:** Highly available systems area designed to operate continuously without failure for a long time. These systems avoid loss of service by reducing or managing failures

- **Elasticity:** With elasticity, you don't have to plan ahead of time how much capacity you need. You can provision only what you need, and then grow and shrink based on demand

- **Agility:** The cloud helps you increase agility. All the services you have access to help you innovate faster, giving you speed to market

- **Durability:** Durability is all about long-term data protection. This means your data will remain intact without corruption

## 1.6. CapEx vs OpEx

- **Capital Expenditures (CapEx):** Capital Expenditures are upfront purchases toward fixed assets (equipment, computers, property, software,…).

- **Operating Expenses (OpEx):** Operating Expenses are funds used to run day-to-day operations.

## 2.1. Types of cloud computing

**IaaS:**

- Provide building blocks for cloud IT.

- Provide networking, computers, data storage space.

- Highest level of flexibility.

- Easy parallel with traditional on-premises IT.

**PaaS:**

- Removes the need for your organization to manage the underlying infrastructure

- Focus on the deployment and management of your application

**SaaS:**

- Completed product that is run and managed by the service provider

![IaaS, PasS, SaaS](/images/iaas-paas-saas-diagram.png)

## 2.2. Pricing of the cloud

- 3 types: **Compute, Storage, Transfer OUT** (transfer IN is free).

### How to choose an AWS region

- **Compliance with data governance and legal requirements:** data never leaves a region without your explicit permission

- **Proximity to customers:** reduced latency

- **Available services within a region:** new services and new features aren't available in every region

- **Pricing:** pricing varies region to region and is transparent in the service pricing page

### AWS Availability Zones

- Each region has many availability zones (usually 3, min is 3, max is 6).

- Each availability zone (AZ) has one or more discrete data centers with redundant power, networking, and connectivity.

- They're separate from each other, so they are isolated from disasters.

- They're connected with high-bandwidth, ultra-low latency networking.

## 2.3. Tour of the AWS console (Global Scope, Local Scope)

AWS has Global Services (4 servies: IAM, CDN, DNS, WAF)

- Identity and Access Management (IAM)

- Route 53 (DNS Service)

- CloudFront (Content Delivery Network)

- WAF (Web Application Firewall)

Most AWS services are region-scoped

- Amazon EC2 (Infrastructure as a Service)

- Elastic Beanstalk (Platform as a Service)

- Lambda (Function as a Service)

- Rekognition (Software as a Service)

# 2. Technology

## 2.1. AWS Global Architecture

### Regions

A region is a physical location, contain AZs.

Regions have several characteristics:

- Fully independent and isolated: if one region is impacted, the others will not be.

- Resource and service specific: regions are isolated, and resources aren't automatically replicated across them

Usecases:

- Should set up resources in regions closest to your users.

- Most resources are tied to a specific region.

### Availability Zones

Availability Zones (Azs) consist of one or more physically separated data centers.

An AZ contains a server you're renting, where you deploy application.

An AZ is associated with a single region

Multi-AZ deployments allow applications to communicate between different Availability Zones within the same region for redundancy and high availability

Characteristics of Azs:

- Physically separated
- Connected through low-latency links
- Fault tolerant
- Allows for high availability

### Edge locations

Edge locations cache content for fast delivery to your users

Content delivery network CDN and Amazon CloudFront

Notes:

- An edge location is like a mini data center but it's doesn't run your main infrastructure like EC2 instances.

## 2.2. Compute Services - AWS Technology

### 1. EC2

EC2 allows you to rent and manage virtual servers in the cloud. AWS virtual servers are called instances.

**Comparison:**

- Servers are the physical compute hardware running in a data center.
- EC2 instances are the virtual servers running on these physical servers.
- Instances are not considered serverless

**Usage:**

- You're able to provision an EC2 instances at the click of a button

- You can use a preconfigured template called an Amazon Machine Image (AMI) to launch your instance

- You can deploy your applications directly to EC2 instances

- You can receive 750 compute hours per month on the Free Tier plan

**Methods:**

- AWS Mangement Console.

- SSH Shell.

- EC2 Instance Connect

- AWS System Manager

The most common way to connect to Linux EC2 instance is via Secure Shell (SSH)

1. Generate a key pair

A key pair, which consists of a private key and a public key, proves your identity when connecting to an EC2 instance

2. Connect via SSH

You have an SSH client on your laptop that uses the private key

When you connect to your EC2 instance, your EC2 instance uses the public key

#### On demand:

A fixed price in which you are billed down to the second based on the instance type. There is no contract, and you only pay on what you use

Use on-demand instances when:

- You care about low cost without any upfront payment or long-term commitment

- Your application has unpredictable workloads that can't be interrupted

- Your applications are under development

- Your workloads will not run longer than a year

- You can reserve capacity using on-demand capacity reservations. The EC2 capacity is held for you whether or not you run the instance

#### Spot:

Spot instances let you take advantage of unused EC2 capacity. Your request is fulfilled only if capacity is available

Use spot instances when:

- You are not concerned about the start or stop time of your application

- Your workloads can be interrupted

- Your application is only feasible at a very low compute prices

- You can save up to 90% off On-Demand prices

- You pay the spot price that's in effect at the beginning of each hour

#### Reserved Instances (RIs):

RIs allows you to commit to a specific instance type in a particular region for 1 or 3 years

Use Reserved Instances when:

- Your application has steady state usage, and you can commit to 1 or 3 years
- You can pay money upfront in order to receive a discount for On-Demand prices
- Your application requires a capacity reservation
- You can save up to 75% off On-Demand prices

- You are required to sign a contract

- You can reserve capacity in an Availability Zone for any duration

- You can pay All Upfront, Partial Upfront or No Upfront. All Upfront for the max term earns the highest discount

Provide convertible types at 54% discount

#### Dedicated hosts

Dedicated hosts allow you to pay for a physical server that is fully dedicated to running your instances

Use dedicated hosts when:

- Your want to bring your own server-bound software license from vendors like Microsoft or Oracle

- You have regulatory or corporate compliance requirements around tenancy model

- You can save up to 70% off on-demand prices

- You bring your existing per-socket, per-core or per-VM software licenses

- There's no multi-tenancy, meaning the server is not shared with other customers

A dedicated host is a physical server, whereas a dedicated instance runs on the host

#### Savings plan

Savings plan allows you to commit to compute usage (measured per hour) for 1 or 3 years

Use savings plan when:

- You want to lower your bill across multiple compute services

- You want the flexibility to change compute services, instances types, operating systems, or regions

- You can save up to 72% On-demand prices

- You are not making a commitment to dedicated host, just compute usage

Savings can be shared across various compute services like EC2, Fargate and Lambda

This does not provide a capacity reservation

#### Features

EC2 instances offer load balancing and auto-scaling

- Load balancing: Elastic load balancing automatically distributes your incoming application traffic across multiple EC2 instances

- EC2 auto scaling adds or replaces EC2 instances automatically across AZs, based on need and changing demand. Reduce the impact of system failures and improve the availability of your applications

- Horizontal scaling (scaling out): adding or removing servers/instances

- Vertical scaling (scaling up): upgrades an EC2 instance by adding more power (CPU, RAM) to an existing server

### 2. AWS Lambda

Lambda is a serverless compute service that lets you run code without managing servers

You author application code, called functions, using many popular languages

- Scales automatically

- Serverless, means you don't have to worry about managing servers like with EC2

- Lambda is a building block for many serverless applications (serverless means AWS manages the servers for you and you cannot access them, you can pretend they don't exist)

### Usage

- Real-time file processing: for e.g you have Data File and you upload to S3 Bucket, when the upload happens, it triggers a Lambda to read that file and store that data in a DynamoDB table

- Sending email notifications: for e.g you want to use Lambda and the Simple Notification Service to get very detailed file change notifications from CodeCommit. Whenever the file changes, it triggers CloudWatch, which then triggers a Lambda, which triggers SNS to send an email

- Backend business logic: for e.g when develop Alexa Skills, the backend is typically a Lambda function that retrieves values from a database like DynamoDB and sends that information back to Alexa

#### Features

Support popular programming languages like Java, Go, PowerShell, Nodejs, C#, Python and Ruby

You author code using your favorite development environment or via the console

Lambda can execute your code in response to events

Lambda functions have a 15-minute timeout

#### Pricing Model

You are charged based on the duration and number of requests

- Compute time: Pay only for compute time used, there is no charge if your code is not running

- Request count: A request is counted each time it starts execution. Test invokes in the console count as well

- Always free: The free usage tier include 1 million free requests each month

### 3. AWS Fargate

Fargate is a serverless compute engine for containers.

Fargate allows you to manage containers, like Docker

Scales automatically

Serverless, means you don't worry about provisioning, configuring or scaling servers

### 4. AWS Lightsail: Instance Provider (virtual private server (VPS)), like Heroku, Onrender

Lightsail allows you to quickly launch all the resources you need for small projects

Deploy preconfigured applications, like WordPress websites at the click of a button

Simple screen for people with no cloud experience

Includes a virtual machine, SSD-based storage, data transfer, DNS management, and a static IP

Provide a low, predictable monthly fee

### 5. AWS Outposts: run cloud on-premise

Outposts allows you to run cloud services in your internal data center

Support workloads that need to remain on-premises due to latency or data-sovereignty needs

AWS delivers and install servers in your internal data center

Used for a hybrid experience

Have access to the cloud services and APIs to deploy apps on-premises

### 6. Batch: Run batch job

Batch allows you to process large workloads in smaller chunks (or batches)

Run hundreds and thousands of smaller batch processing jobs

Dynamically provisions instances based on volume

## 3. Storage Services - AWS Technology

- Used for access not query.

### 1. S3

S3 is an object storage service for the cloud that is highly available

- Objects (or files) are stored in buckets (or directories)

- Essentially unlimited storage that can hold millions of objects per bucket

- Objects can be public or private

You can upload objects via the console, the CLI, programmatically from within code using SDKs

You can set security at the bucket level or individual object level using access control lists (ACLs), bucket policies, or access point policies

You can enable versioning to create multiple versions of your file in order to protect against accidental deletion and to use a previous version

You can use S3 access logs to track the access to your buckets and objects

S3 is a regional service, but bucket names must be globally unique

S3 is a regional service but has a global namespace

**Data accessibility**

- Durability: make sure your objects are never lost or compromised

- Availability: you can access your data quickly when you need it

**S3 Storage Classes**

Amazon S3 offers several storage classes designed for different use case:

- S3 Standard: General purpose storage class, suitable for frequently accessed data.

- S3 Intelligent-Tiering: Automatically moves data between two access tiers when access patterns change, optimizing costs without performance impact.

- S3 Standard -(/) Infrequent Access (IA): Suitable for data that is accessed less frequently, but requires rapid access when needed. It offers lower storage costs compared to S3 Standard, but with a retrieval fee.

- S3 One Zone -(/) Infrequent Access (IA): A low-cost storage option for infrequently accessed data that is stored in a single availability zone. Suitable for data that can be easily recreated if the availability zone is lost.

- S3 Glacier: Low-cost storage service for data archiving and long-term backup. Suitable for data that is infrequently accessed and requires retrieval times ranging from minutes to hours.

- S3 Glacier Deep Archive: Lowest-cost storage class for long-term data archiving that is rarely accessed. Retrieval times can range from 12 hours to 48 hours.

- S3 Outposts: Extends S3 to on-premises environments, allowing you to store and retrieve data locally while still using the same S3 APIs and features.

**When to use object storage when to use cdn ?**

Use Object Storage When:

1. Storing Large or Static Files

Suitable for images, videos, logs, backups, database snapshots, and unstructured data.

Example: AWS S3, Google Cloud Storage, MinIO.

2. Files Need to Be Accessed Dynamically via API

If your application dynamically retrieves or modifies objects, object storage is ideal.

Example: Storing user-generated content (profile pictures, documents).

Use a CDN When:

1. You Need Fast Content Delivery to Users Worldwide

CDNs cache content in multiple locations globally, reducing latency.

Example: Cloudflare, AWS CloudFront, Akamai.

2. Your Application Has High-Traffic Static Content

Websites serving images, CSS, JS files, videos, or APIs benefit from caching.

Example: Hosting static assets like JavaScript bundles for a React app.

3. You Want to Reduce Load on Your Backend & Storage

CDN offloads requests from the origin server, improving performance.

Example: Instead of fetching images from S3 every time, serve cached copies from CDN nodes.

**S3 in the real world**

- Static websites: Deploy static websites to S3 and use CloudFront for Global Distribution

- Data archive: Archive data using Amazon Glacier as a storage option for Amazon S3

- Analytics systems: Store data in Amazon S3 for use with analytics services like Redshift and Athena

- Mobile applications: Mobile application users can upload files to an Amazon S3 bucket

### 2. EC2 Storage

### 2.1 EBS

EBS is a storage device (called a volume) that can be attached to (or removed from) your instance

Data persists when instance is not running

- Can only be attached to one instance in the same availability zone

- Tied to one Availability Zone

Recommended for:

- Quickly accessible data

- Running a database on an instance

- Long-term data storage

### 2.2. EC2 Instance Store

An instance store is local storage that is physically attached to the host computer and cannot be removed

Storage on disks physically attached to an instance

Storage is temporary since data loss occurs when the EC2 instance is stopped

Faster with higher I/O speeds

Recommended for:

- Temporary storage needs

- Data replicated across multiple instances

Ideal for applications that require fast, temporary storage, such as Redis, Memcached, or intermediary processing buffers.

### 2.3. EFS

EFS is a serverless network file system for sharing files

Only support the Linux file system

Accessible across different availability zones in the same region

More expensive than EBS

Recommended for:

- Main directories for business-critical apps

- Lift-and-shift existing enterprise apps

![image.png](/images/efs-s3.png)

### 3. Storage Gateway

Storage Gateway is a hybrid storage service

Connect on premises and cloud data

Supports a hybrid model

Recommended for:

- Moving backups to the cloud

- Reducing costs for hybrid cloud storage

Low latency access to data

![image.png](/images/storage-gateway.png)

### 4. AWS Backup

AWS Backup helps you manage data backups across multiple AWS services

Integrates with resources like EC2, EBS, EFS, and more

Create a backup plan that includes frequency and retention

## 4. Content Delivery Services

Edge locations: mini data centers where files are cache

Distribution cache: Name given to the collection of edge locations

Origin: the original source of the content

### 1. Amazon CloudFront

CloudFront is a CDN that delivers data and applications globally with low latency

- Makes content available globally or restrict it based on location

- Speeds up delivery of static and dynamic web content

- Uses edge locations to cache content

CloudFront in the real world:

- S3 static websites: CloudFront is often used with S3 to deploy content globally

- Prevent attacks: CloudFront can stop certain web attacks, like DDoS

- **IP Address Blocking: Geo-restriction prevents users in certain country from accessing content**

**Note: S3 chặn IP theo quốc gia được**

### 2. Amazon Global Accelerator

- Nhiều người trên toàn thế giới (nhiều quốc gia) cùng access 1 cái => chọn global

Amazon Global Accelerator is a networking service that improves the availability and performance of your applications with global users.

- Provides static IP addresses that act as a fixed entry point to your application endpoints in AWS
- Uses the AWS global network to optimize the path to your application, improving performance
- Automatically reroutes traffic to healthy endpoints in the event of an application failure

Global Accelerator in the real world:

- Gaming: Reduces latency and improves the gaming experience for players around the world
- IoT: Ensures reliable and fast communication between IoT devices and the cloud
- Web Applications: Enhances the performance and availability of web applications for global users

### 3. Amazon S3 Transfer Acceleration

- Nhiều người trên toàn thế giới (nhiều quốc gia) cùng access vào S3 => chọn global S3.

S3 Transfer Acceleration improves content uploads and downloads to and from S3 buckets

- Fast transfer of files over long distances

- Uses CloudFront's globally distributed edge locations

- Customers around the world can upload to a central bucket

## 5. Networking Services

### 1. Amazon Virtual Private Cloud (VPC)

VPC is a foundational service that allows you to create a secure private network in the AWS cloud where you launch your resources

Private virtual network

- Launch resources like EC2 instances inside the VPC

- Isolate and protect resources

- A VPC spans Availability Zones in a region

Term:

**NACL (network access control list):** Access control lists (ACLs) ensure the proper traffic is allowed into the subnet.

**Internet Gateway:** allows public traffic to the internet like a VPC

**VPC Peering:** allows you to connect 2 VPCs together. Peering facilitates the transfer of data in a secure manner

### 2. Amazon Route 53

Request đi qua DNS trước => mới vào service.

**Route 53 is a Domain Name Service that routes users to applications**

- Domain name registration

- Performs health checks on AWS resources

- Support hybrid cloud architecture

- DDoS attack protection

### 3. AWS Direct Connect

VPC là các service internet gọi nhau, direct connect là từ on-premises hay server local lên AWS.

AWS Direct Connect is a networking service that provides an alternative to using the internet to connect to AWS. Using AWS Direct Connect, data that would have previously been transported over the internet is delivered through a private network connection between your facilities and AWS.

Direct Connect is a dedicated physical network connection from your on-premises data center to AWS

In real world:

- Large datasets: Transfer large datasets to AWS

- Business-critical data: Transfer internal data directly to AWS, bypassing your internet service provider

- Hybrid model: Build hybrid environment

### 4. AWS VPN

Giống y chang AWS Direct Connect -> nhưng đi qua đường Internet.

Site-to-Site VPN creates a secure connection between your internal networks and your AWS VPCs

- Similar to Direct Connect, but data travels over the public internet

Data is automatically encrypted

- Connects your on-premises data center to AWS

- Supports a hybrid environment

In real world:

- A Site-to-Site VPN makes moving application to the cloud easier-

### 5. API Gateway

API Gateway allows you to build and manage APIs

- Share data between systems

- Integrate with services like Lambda

## 6. Databases

### 1. Amazon Relational Database Service (RDS)

RDS is a service that makes it easy to launch and manage relational databases

- Supports popular database engines

- Offers high availability and fault tolerance using Multi-AZ deployment option

AWS manages the database with automatic software patching, automated backups, operating system maintenance, and more.

Launch read replicas across multiple regions in order to provide enhanced performance and durability

### 2. Amazon Aurora

Giống RDS nhưng mà AWS nó optimized hơn.

- Aurora is a relational database compatible with MySQL and PostgreSQL that was created by AWS

Supports MySQL and PostgreSQL databases engines

- 5x faster than normal MySQL and 3x faster than normal PostgreSQL

- Scales automatically while providing durability and high availability

- Managed by RDS

### 3. DynamoDB: Key-value

DynamoDB is a fully managed NoSQL key-value and document database

- NoSQL key-value database

- Fully managed and serverless

- Non-relational

Scales automatically to massive workloads with fast performance

### 4. Amazon DocumentDB: Document

DocumentDB is a fully managed document database that supports MongoDB

Document Database

- MongoDB compatible

- Fully managed and serverless

- Non-relational

### 5. Amazon ElastiCache: Redis & Memcache

ElastiCache is a fully managed in-memory datastore compatible with Redis or Memcached

In-memory datastore

- Compatible with Redis or Memcached engines

- Data can be lost

- Offers high performance and low-latency

### 6. Amazon Neptune: GraphDB

Neptune is a fully managed graph database that supports highly connected datasets

- Graph database service

- Supports highly connected datasets like social media networks

- Fully managed and serverless

- Fast and reliable

### 7. Databases in real world

- Database to the cloud -> use RDS

- Migrate an on-premises PostgreSQL database to the cloud -> RDS and Aurora

- Alleviate database load for data that is accessed often -> ElastiCache

- Process large sets of user profiles and social interactions -> Neptune

- NoSQL database fast enough to handle millions of requests per second -> DynamoDB

- Operate MongoDB workload at scale -> DocumentDB

Note:

- RDS is only for relational databases. Don't forget the supported database engines: Amazon Aurora, PostgreSQL, MySQL, MariaDB, Oracle database and SQL Server

- Aurora: Don't forget Aurora only supports PostgreSQL and MySQL

- DynamoDB: Don't forget DynamoDB is a NoSQL database

- Neptune: Don't forget Neptune helps you to create social media graphs

- ElastiCache: ElastiCache is a in-memory datastore

- DocumentDB: Don't forget DocumentDB supports MongoDB

## 7. Migration and Transfer Services

### 1. Database Migration Service (DMS)

DMS helps you to migrate database to or within AWS

- Migrate on-premises databases to AWS

- Provide continuous data replication

- Support homogeneous and heterogeneous migrations

- Virtually no downtime

DMS in the real world:

- Oracle to Aurora MySQL

- Oracle to Oracle

- RDS Oracle to Aurora MySQL

### 2. Server Migration Service (SMS)

SMS allows you to migrate on-premises servers to AWS

- Migrate on-premises servers to AWS

- Server saved as a new Amazon Machine Image (AMI)

- Use AMI to launch servers as EC2 instances

### 3. Snow Family

- Sử dụng để truyền dữ liệu file từ on-premise to cloud (EC2 & S3).

The Snow Family allows you to transfer large amounts of on-premses data to AWS using a physical device

**Snowcone:**

- Smallest member of data transport devices

- 8 terabytes of usable storage

- Offline shipping

- Online with DataSync

**Snowball and Snowball Edge:**

- Peta-byte scale data transport solution

- Transfer data in and out

- Cheaper than internet transfer

- Snowball Edge supports EC2 and Lambda

**Snowmobile**

- Multi-petabyte or exa-byte scale

- Data loaded to S3

- Securely transported

### 4. DataSync

- Sử dụng để truyền dữ liệu file từ on-premise to cloud (Database).

DataSync allows for online data transfer from on-premises to AWS storage services like S3 or EFS

- Migrates data from on-premises to AWS

- Copy data over Direct Connect or the Internet

- Copy data between AWS storage services

- Replicate data cross-region or cross-account

**Notes:**

- Snowball Edge: Don't forget the services natively supported by snowball edge, like EC2 and Lambda

- Snowmobile: Don't forget Snowmobile is the largest member of the transport family and support exabyte-scale data

- Snowball: Snowball transfers petabytes of data and is cheaper than transferring over the internet

- DataSync: DataSync transfers data online and can be used to replicate data cross-region or cross-account

## 8. Analytics Service

### 1. Amazon Redshift

Redshift is a scalable data warehouse solution

- Data warehousing solution

- Improves speed and efficiency

- Handle exabyte-scale data

Redshift in the real world

- Data consolidation: When you need to consolidate multiple data sources for reporting

- Relational databases: When you want to run a database that doesn't require real-time transaction processing (insert, update and delete)

### 2. Athena

Dùng để query S3.

Athena is a query service for Amazon S3

- Query service

- Analyze S3 data using SQL

- Pay per query

- Considered serverless

### 3. Glue

Dùng để làm ETL.

Glue prepares your data for analytics

- Extract, transform, load (ETL) service

- Prepare and load data

- Helps to better understand data

### 4. Kinesis

Dùng để streaming log.

Kinesis allows you to analyze data and video streams in real time

- Analyze real-time, streaming data

- Supports video, audio, application logs, website clickstreams and IoT

### 5. Elastic MapReduce

Dùng để tính toán song song data trên nhiều node.

EMR helps you process large amounts of data

- Process big data

- Analyze data using Hadoop

- Works with big data frameworks

### 6. Data Pipeline

Dùng để thiết kế dòng chảy data từ hệ thống này sang hệ thống khác.

Data Pipeline helps you move data between compute and storage services running either on AWS or on-premises

- Move data at specific intervals

- Move data based on conditions

- Send notifications on success failure

### 7. QuickSight

Dùng để visualize data nhanh.

QuickSight helps you visualize your data

- Build interactive dashboards

- Embed dashboards in your applications

### 8. Analytics in real world

- Search data in S3: Athena helps you query historical data stored in S3 as if they were relational data using standard SQL

- Log analytics: Kinesis helps you analyze logs in near real time for application monitoring or fraud detection

## 9. Machine Learning Services

### 1. Rekognition

Object detection cho ảnh và video.

Rekognition allows you to automate your image and video analysis

- Image and video analysis

- Identify custom labels in images and videos

- Face and text detection in images and videos

![AWS SageMaker](/images/rekognition.png)

### 2. Comprehend

Tìm relationship in text.

Comprehend is a natural language processing (NLP) service that finds relationships in text

- Natural-language processing (NLP) service

- Uncover insights and relationships

- Analyzes text

![AWS Polly](/images/detect.png)

### 3. Polly: con vẹt

Chuyển text into speech, có thể điều chỉnh khoảng thời gian, giọng điệu này kia luôn.

Polly turns text into speech

- Mimics natural-sounding human speech

- Several voices across many languages

- Can create a custom voice

![AWS Polly](/images/polly.png)

### 4. SageMaker

- Hỗ trợ Jupiter Notebook, connect đến data source như S3, database, dùng để build, train và deploy model.

SageMaker helps you build, train and deploy machine learning models quickly

- Prepare data for models

- Train and deploy models

- Provide deep learning AMIs

![AWS SageMaker](/images/sage-maker.png)

### 5. Translate

Translate provides language translation

- Provide real-time and batch language translation

- Supports many languages

- Translate many content formats

![AWS Translate](/images/translate.png)

### 6. Lex

- Dùng để build chatbot.

Lex helps you build conversational interfaces like chatbots

- Recognizes speech and understands language

- Build highly engaging chatbot

- Power Amazon Alexa

![Lex](/images/lex.png)

## 10. Developer tools

### 1. Cloud9

Cloud9 như 1 IDE trên browser.

Allows you to write code within an integrated development environment (IDE) from within your web browser

- Integrated development environment

- Write and debug code

- Supports popular programming languages

E.g: Cloud9 preconfigures the development environment with the needed SDKs and libraries. You can easily write the code for your Lambda function directly in your web browser

### 2. CodeCommit

Github phiên bản AWS cloud.

CodeCommit is a source control system for private Git repositories

- Create repositories to store code

- Commit, branch and merge code

- Collaborate with other software developers

E.g: CodeCommit can be used to manage source code and the different versions of application files. CodeCommit is similar to GitHub

### 3. CodeBuild

Giống CI dùng để build và run tests.

CodeBuild allows you to build and test your application source code

- Compiles source code and runs tests

- Enable continuous integration and delivery

- Produces build artifacts ready to be deployed

Eg: CodeBuild allows you to run as many parallel streams of tests as needed, allowing you to deploy your changes to production more quickly

### 4. CodeDeploy

Giống CD để deploy.

CodeDeploy manages the deployment of code to compute services in the cloud or on-premises

- Deploys code to EC2, Fargate, Lambda and on-premises

- Maintains application uptime

E.g: CodeDeploy eliminates downtime of your application when deploying a new version due to its rolling deployments

### 5. CodePipeline

Tích hợp CodeBuild (CI) and CodeDeploy (CD) thành một pipeline tổng như 1 CI/CD.

CodePipeline automates the software release process

Quickly deliver new features and updates

- Integrates with CodeBuild to run builds and unit tests

- Integrates with CodeCommit to retrieve source code

- Integrate with CodeDeploy to deploy your changes

E.g: When combined with other developer tools, CodePipeline helps development teams implement DevOps practices that automate testing and the movement of code to production

### 6. X-Ray

Giống con Opentelemetry để tracing các service trên cloud.

X-Ray helps you to debug production applications

- Analyze and debug production applications

- Map applications components

- View requests end to end

E.g: X-Ray can help you map requests made to your RDS database from within your application. You can track information about the SQL queries generated and more

### 7. CodeStar

Giao diện UI để xem CodePipeline.

CodeStar helps developers collaboratively work on development projects

- Developers connect their development environment

- Integrates with CodeCommit, CodeBuild, and CodeDeploy

- Contains issue tracking dashboard

E.g: CodeStar can help you manage your entire development pipeline, integrating with CodeCommit, CodeBuild, and CodeDeploy

![Code Pipeline Code Star](/images/code-pipeline-code-star.png)

### 8. Developer Tools in real world

- CodeCommit: offers a service similar to GitHub that works with Git repositories

- Cloud9: offers an integrated development environment (IDE) that runs inside a web browser

- CodeDeploy: allows you to deploy an application to servers running on-premises and in the cloud

- CodePipeline: allows you to implement a CI/CD pipeline

## 11. Infrastructure Management Services

### 1. CloudFormation

CloudFormation allows you to provision AWS resources using Infrastructure as Code (IaC)

- Provide a repeatable process for provisioning resources

- Works with most AWS services

- Creates templates for the resources you want to provision

In real world, you can use CloudFormation to automate the creation of EC2 instances in your AWS account

![Cloud Formation](/images/cloud-formation.png)

### 2. Elastic Beanstalk

- Cũng dạng template giống Cloudformation nhưng mà dùng Web UI để tạo.

Elastic Beanstalk allows you to deploy your web applications and web services to AWS

- Orchestration service that provisions resources

- Automatically handles the deployment

- Monitors application health via a health dashboard

For example, after you upload your Java code, Elastic Beanstalk deploys it and handles capacity provisioning, load balancing, and Auto Scaling. Elastic Beanstalk even monitors the health of your application

![BeanStalk](/images/beanstalk.png)

### 3. OpsWorks

- Nó chỉ quản lý tầng instance thôi, có thể vừa on-premises vừa AWS cloud.

OpsWorks allows you to use Chef or Puppet to automate the configuration of your servers and deploy code

- Deploy code and manage applications

- Manage on-premises servers on EC2 instances in AWS Cloud

- Work with Chef and Puppet automation platforms

In real world, OpsWorks allows you to define software installation scripts and automate configuration for your application servers

![OpsWork](/images/ops-work.png)

![Compare OpsWork](/images/compare-opswork.png)

### 4. Infrastructure Management in real world

- CloudFormation: supports infrastructure automation using Infrastructure as Code (IaC)

- Elastic Beanstalk: is only used to deploy applications to the AWS Cloud - it is not used to deploy applications on-premises

- OpsWorks: can deploy applications on-premises, and it also automates infrastructure management using Chef or Puppet

## 12. Messaging and Integration Service

Loose coupling: Coupling defines the inter-dependencies or connections between components of a system, loose coupling helps reduce the risk of cascading failures between components.

### 1. Simple Queue Service (SQS)

SQS is a queuing service that allows you to build loosely coupled systems

- Allows component-to-component communication using messages

- Multiple components (or producers) can add messages to the queue

- Messages are processed in an asynchronous manner

In real world: Build a money transfer app that performs well under heavy load -> SQS lets you build an application that is loosely coupled, allows components to send, store and receive messages. The use of a messaging queue helps to improve performance and scalability.

### 2. Simple Notification Service (SNS)

SNS allows you to send emails and text messages in your applications

- Send email and text messages

- Publish messages to a topic

- Subscribers receive messages

In real world: Send an email when CPU utilization of an EC2 instance goes above 80% -> SNS works with CloudWatch when an alarm's metric threshold is breached to send an email

### 3. Simple Email Service (SES)

SES is an email service that allows you to send richly formatted HTML emails from your applications

- Ideal choice for marketing campaigns or professional emails

- Unlike SNS, SES sends HTML emails

In real world: Send a marketing email and track open or click-through rates -> SES allows you to send richly formatted HTML emails in bulk and gain valuable insights about the effectiveness of your campaign

### 4. Messaging in real world

- Messages in queue are processed in FIFO order

- Message queues support loose coupling

- SNS sends text messages and plain text emails

- SES sends HTML-formatted emails for marketing campaigns

## 13. Auditing, Monitoring, and Logging Services

### 1. CloudWatch

CloudWatch is a collection of services that help you monitor and observe your cloud resources

- Collect metrics, logs and events

- Detect anomalies in your environment

- Set alarms

- Visualize logs

In real world:

- CloudWatch Alarms: Set high resolution alarms

- CloudWatch Logs: Monitor application logs

- CloudWatch Metrics: Visualize time-series data

- CloudWatch Events: Trigger an event based on a condition

  - Provides real-time monitoring on EC2 instance: CloudWatch Alarms can notify you if an EC2 instance goes into the stopped state or usage goes above a certain utilization

  - Receive a notification when root user activity is detected in your account: Create CloudWatch event rule to notify you when root user API calls are detected in your account indicating root user activity

### 2. CloudTrail

CloudTrail tracks user activities and API calls within your account (IAM user).

- Log and retain account activity

- Track activity through the console, SDKs, and CLI

- Identify which user made changes

- Detect unusual activity in your account

In real world:.

- Track the time a particular event occur in your account -> You can troubleshoot events over the past 90 days using the CloudTrail event history log to find the specific time and event occurred on a per-region basis. You can create custom trail to extend past 90 days

### 3. Auditing, Monitoring, and Logging in real world

- Use CloudWatch to monitor your EC2 instances and notify you when certain events occur

- Things you can track with CloudTrail: username, event time and name, IP address, access key, region and error code

## 14. Additional Services

### 1. Amazon Workspaces

Tạo một node instance cấp máy cho nhân viên trên cloud.

Amazon Workspaces allows you to host virtual desktops in the cloud

- Virtualize Window or Linux desktops

- Enables employees to work from home

### 2. Amazon Connect

Đóng vai trò như một helpdesk for customer support.

Amazon Connect is a cloud contact center service

- Provides customer service functionality

- Improves productivity of help desk agents

# 3. Security and Compliance

## 1. Shared Responsibility Model

### Public Cloud

In the public cloud, there is a shared responsibility between you and AWS

### AWS's responsibility:

- **Security of the cloud:** AWS is responsible for protecting and securing their infrastructure

  - AWS Global Infrastructure: AWS is responsible for its global infrastructure elements: regions, edge locations, and Availability Zones

  - Building security: AWS controls access to its data centers where your data resides

  - Networking components: AWS maintains networking components: generators, uninterruptible power supply (UPS) systems, computer room air conditioning (CRAC) units, fire suppression systems, and more

  - Software: AWS is responsible for any managed service like RDS, S3, ECS, or Lambda, patching of host operating systems, and data access endpoints

### Your responsibility

**Security in the cloud:** You are responsible for how the services are implemented and managing your application data

- Application data: you're responsible for managing your application data, which includes encryption options

- Security Configuration: You're responsible for securing your account and API calls, rotating credentials, internet access from your VPCs and more

- Patching: You're responsible for the guest operating system (OS), which includes updates and security patches

- Identity and Access Management: You're responsible for application security and identity and access management

- Network traffic: You're responsible for network traffic protection, which includes security group firewall configuration

- Installed Software: You’re responsible for your application code, installed software, and more. You should frequently scan for and patch vulnerabilities in your code

Examples:

- Firewall configuration -> yours

- Data centers security for the physical building -> AWS

- Encryption for EBS volumes -> yours

- Language version of Lambda -> AWS

- Taking DB backups in RDS -> yours

- Updating the firmware on the underlying EC2 hosts -> AWS

- Ensuring data is encrypted at rest -> yours

- Managing the network infrastructure -> AWS

- Patching the guest operating system for EC2 -> yours

- Physically destroying storage media at end of life -> AWS

### EC2 Shared Responsibility Model

Đối với EC2, host là của AWS, OS là của người dùng

Your responsibility:

- Install application

- Patching the guest operating system

- Security controls

AWS:

- EC2 service

- Patching the host operating system

- Security of the physical server

### Lambda Shared Responsibility Model

Đối với Lambda, code là của bạn, toàn bộ runtime environment là của AWS.

Your responsibility:

- Security of code

- Security of sensitive data

- IAM for permissions

AWS

- Lambda service

- Upgrading Lambda languages

- Lambda endpoints

- Operating system

- Underlying infrastructure

- Software dependencies

Which security responsibilities are shared?

Patch management:

- AWS: Patching infrastructure

- Yours: Patching guest OS and applications

Configuration Management:

- AWS: Configuring infrastructure devices

- Yours: Configuring databases and applications

Awareness of Training:

- AWS: AWS employees

- Yours: your employees

## 2. 6 pillars of Well-Architected Framework

### Operation Excellence

Tốt cho operation cho business.

This pillar focuses on creating applications that effective support production workloads:

- Plan for and anticipate failure

- Deploy smaller, reversible changes

- Script operations and code

- Learn from failure and refine

### Security

Tốt cho vấn đề security dữ liệu người dùng.

This pillar focuses on putting mechanism in place that help protect your systems and data

- Automate security tasks

- Encrypt data in transit and at rest

- Assign only the least privileges required

- Track who did what and when

- Ensure security at all application layers

### Reliability

Nó phải tự khôi phục được khi xảy ra sự cố.

This pillar focuses on designing systems that work consistently and recover quickly

- Recover from failure automatically

- Scale horizontally from resilience

- Stop guessing capacity

- Manage change through automation

- Test recovery procedures

### Performance Efficiency

Đảm bảo hiệu năng của ứng dụng.

This pillar focuses on effective use of computing resources to meet system and business requirements while removing bottlenecks

- Use serverless architectures first

- Use multi-region deployments

- Delegate tasks to a cloud vendor

- Experiment with virtual resources

### Cost Optimization

Tiết kiệm chi phí sử dụng.

This pillar focuses on delivering optimum and resilient solutions at the least cost to the user.

- Utilize consumption-based pricing

- Implement Cloud Financial Management

- Measure overall efficiency

- Pay only for resources your application requires

### Sustainability

Thân thiện về môi trường phát triển bền vững.

This pillar focuses on environmental impacts, especially energy consumption and efficiency

- Understand your impact

- Establish sustainability goals

- Maximize utilization

- Use managed services

- Reduce downstream impact

### In Real Life

**Operational Excellence**

- You can use AWS CodeCommit for version control to enable tracking of code changes and to version-control CloudFormation templates of your infrastructure

**Security**

- You can configure central logging of all actions performed in your account using CloudTrail

**Reliability**

- You can use Multi-AZ deployments for enhanced availability and reliability of RDS databases

**Performance Efficiency**

- You can use Lambda to run code with zero administration

**Cost Optimization**

- You can use S3 Intelligent-Tiering to automatically move your data between access tiers based on how frequently you access/ your usage patterns

**Sustainability**

- You can use EC2 Auto Scaling to ensure your are maximizing utilization

## 3. IAM Users

### Identity and Access Management

IAM allows you to control access to your AWS services and resources

- How you secure your cloud resources

- You define who has access

- You define what they can do

- A free global service

### Identities vs Access

Identities: Who can access you resources

- Root user

- Individual users

- Groups

- Roles

Access: What resources they can access

- Policies

- AWS managed policies

- Customer managed policies

- Permissions boundaries

### Authentication ("Who") vs Authorization ("What")

- **Authentication:** Authentication is where you present your identity (username) and provide verification (password)

- **Authorization:** Authorization determines which services and resources the authenticated identity has access to

### Users

- Users are entities you create in IAM to represent the person or application needing to access your resource.

- The Principle of least privileges involves giving a user the minimum access required to get the job done.

### Groups

Group là chủ động tự phân quyền (có thể áp dụng cho mỗi phòng ban 1 admin)

A Group is a collection of IAM users that helps you apply common access controls to all group members

- Administrators: perform administrative tasks such as creating new users

- Developers: use compute and database services to build applications

- Analysts: run budget and usage report

### IAM Users in real world

- IAM: Identity and Access Management, Global service

- Root account created by default, shouldn't be used or shared

- Users are people within your organization, and can be grouped

- Groups only contains users, not other groups

- Users don't have to belong to a group, and user can belong to multiple groups

## 4. IAM Permissions

### Roles

- Roles define access permissions and are temporarily assumed by an IAM user or a service

### Policies

- You manage permissions for IAM users, groups and roles by creating a policy document in JSON format and attaching it

![IAM](/images/iam.png)

**Notes:** Can i user have multiple policies AWS ?

- Yes, an AWS IAM user can have multiple policies attached, including both inline and managed policies, allowing for flexible and granular permission assignments.

### IAM Best Practices

- **Enable MFA for privileged users:** You should enable multi-factor authentication (MFA) for the root user and other administrative users

- **Implement strong password policies:** You should require IAM users to change their passwords after a specified period of time, prevent users from reusing previous passwords, and rotate security credentials regularly

- **Create individual users instead of using root:** You shouldn't use the root user for daily tasks

- **Use roles for Amazon EC2 instances:** You should use roles for applications that run on EC2 instances instead of long term credentials like access keys

### IAM Credential Report

The IAM Credential Report lists all users in your account and the status or their various credentials

- Lists all users and status of passwords, access keys, and MFA devices

- Used for auditing and compliance

### IAM Permissions in real world

- Users or Groups can be assigned JSON documents called policies

- These policies define the permissions of the users

- In AWS you apply the least privilege principle: don’t give more permissions than a user needs

## 5. Application Security Services: Prevent Attack

### 1. Firewall (tầng Gateway)

Trong khi đó, Security Group (tầng Instance).

Firewalls prevent unauthorized access to your networks by inspecting incoming and ongoing traffic against security rules you've defined

![Firewall Security Group](/images/firewall-security-group.png)

### 1. Web Application Firewall (WAF): XSS, SQL Injection.

WAF helps protect your web applications against common web attacks

- Protect apps against common attacks pattern

- Protect against SQL injection

- Protect against cross-site scripting

Firewall in real world

- **Protect your web application from cross-site scripting attacks:** You can deploy a web application directly to an EC2 instance and protect it from cross-site scripting attacks using WAF. You can even deploy WAF on CloudFront as part of your CDN solution to block malicious traffic

![WAF](/images/waf.png)

### 2. Shield: DDOS

A DDoS attack causes a traffic jam on a website or web application in an attempt to cause it to crash

Shield is a managed Distributes Denial of Service (DDoS) protection service

- Shield standard: Provides free protection of against common and frequently occurring attacks

- Shield advanced: Provides enhanced protection and 24/7 access to AWS experts for a fee

DDoS protection via Shield Advanced is supported on several services

- CloudFront

- Route 53

- Elastic Load Balancing

- AWS Global Accelerator

In Real World:

- Receive real-time notifications of suspected DDoS incidents and assistance from AWS during the attack.

- Shield Advanced will give you notifications of DDoS attacks via CloudWatch Metrics. Additionally, with Shield Advanced, you will have 24/7 access to AWS experts to assist during an attack

### 3. Macie: Protect Sensitive Data

Macie helps you discover and protect sensitive data

- Use machine learning

- Evaluate S3 environment

- Uncovers personally identifiable information (PII)

In Real World:

- Discover passport numbers stored on S3

- Macie can be used to find sensitive data like passport numbers, social security numbers, and credit card numbers on S3

**Review**

- WAF protects against SQL injection and cross-site scripting attacks

- Shield provides DDoS protection and works with CloudFront, Route 53, Elastic Load Balancing, and AWS Global Accelerator

- Macie helps you find sensitive information

## 6. Additional Security Services: Config

### 1. Config

Access, thay đổi, audit các config change trên AWS, deliver vào S3, bắn SNS để cập nhật real time các thay đổi thông báo.

Config allows you to assess, audit, and evaluate the configurations of resources

- Track configuration changes over time

- Delivers configuration history file to S3

- Notifications via Simple Notification Service (SNS) of every configuration change

In Real World:

- Identify system-level configuration changes made to your EC2 instances: Config allows you to record configuration changes within your EC2 instances. You can view network, software and operating system (OS) configuration changes, system-level updates, and more

### 2. GuardDuty

Sử dụng CloudTrail, VPC Flow Logs và DNS Logs để phân tích các hành vi bất thường của **người dùng** trên AWS.

GuardDuty is an intelligent threat detection system that uncovers unauthorized behavior

- Uses machine learning

- Built-in detection for EC2, S3 and IAM

- Review CloudTrail, VPC Flow Logs, and DNS Logs

In Real World:

- Detect unusual API calls in your account: GuardDuty 's anomaly detection feature evaluates all API requests in your account and identifies events that are associated with common techniques used by attackers

### 3. Inspector

Inspector dùng để report những vulnerabilities liên quan đến **EC2, network**.

Inspector works with EC2 instances to uncover and report vulnerabilities

- Agent installed on EC2 instance

- Reports vulnerabilities found

- Checks access from the internet, remote root login, vulnerable software versions, etc.

In Real World:

- Identify unintended network access to an EC2 instance via a detailed report of security findings: inspector has several built-in rules to access your EC2 instances to find vulnerabilities and report them prioritized by level of severity.

### 4. Artifact

Các thông tin về ISO compliance và certificate đối với các service của business đang host trên cloud.

Artifact offers on-demand access to AWS security and compliance reports

- Central repository for compliance reports from third-party auditors

- Service Organization Control (SOC) reports

- Payment Card Industry (PCI) reports

In Real World:

- You need to access AWS' certification for ISO compliance: Artifact provides central repository for AWS security and compliance reports via a self-service portal

### 5. Cognito

Dịch vụ OAuth service của AWS.

Cognito helps you control access to mobile and web applications

- Provides authentication and authorization

- Helps you manage users

- Assist with user sign-up and sign-in

In Real World:

- You need to add a social media sign-in to your web application: Cognito provides functionality that allows your users to sign in to your application through social media accounts like Facebook and Google

### 6. Usecase in real world

- Config allows you to identify changes to various resources over time

- GuardDuty identifies malicious or unauthorized activities in your AWS account

- Inspector only works for EC2 instances

- Artifact provides you with compliance reports

- Cognito controls access to mobile and web applications

## 7. Data Encryption and Secrets Management Services

Có 2 loại data:

- **Data in flight:** Data that is moving from one location to another.

- **Data at rest**: Data that is inactive or stored for later use.

### 1. Key Management Service (KMS)

Lưu tất cả các access và encryption keys của AWS **(kiểu software-key)**.

KMS allows you to generate and store encryption keys

- Key generator

- Store and control keys

- AWS manages encryption keys

- Automatically enabled for certain services

In Real World:

- Create encrypted Amazon EBS volumes: When you create an encrypted Amazon EBS volume, you're able to specify a KMS customer master key

### 2. CloudHSM

Dùng để lưu các key dạng **hardware**

CloudHSM is a hardware security module (HSM) used to generate encryption keys

- Dedicated hardware for security

- Generate and manage your own encryption keys

- AWS does not have access to your keys

In Real World:

- Meet compliance requirements for data security by using dedicated hardware: CloudHSM allows you to meet corporate, contractual, and regulatory compliance requirements for data security by using dedicated hardware in the cloud

### 3. Secrets Manager

Serect Manager được dùng để built riêng cho RDS, RedShift, DocumentDB.

Secrets Manager allows you to manage and retrieve secrets (passwords or keys)

- Rotate, manage, and retrieve secrets

- Encrypt secrets at rest

- Integrates with services like RDS, Redshift, and DocumentDB

In Real World:

- Retrieve database credentials needed for your application code: Secrets Manager allows you to retrieve database credentials with a call to Secrets Manager APIs, removing the need to hardcore sensitive information in plain text within your application code

### 4. Application in real world

- AWS manages KMS keys

- Secrets Manager has built-in integration for RDS, Redshift, and DocumentDB

- You manage the keys generated with CloudHSM

## 8. AWS Account

### 1. AWS Management Console

- The AWS Management Console allows you to access your AWS account and manage applications running from your account from a web browser.

### 2. Root user

- Automatically created when you open your account.

### 3. Console

- Allows access via web browser (terminal nhưng mà trên web).

### 4. CLI

- Is a form of programmatic access from a command or terminal window (terminal trong máy tính local).

# 4. Pricing, Billing and Governance

## 4.1. AWS Pricing

### 1. Fundamental drivers of cost

There are three fundamental drivers of cost

- Compute: Hourly from launch to termination

- Storage: The data you store in the cloud

- Outbound data transfer: Data in flight moving between systems

### 2. Free Offer Types

- 12 months free: 12 months' free usage following your initial sign-up date to AWS

- Always free: Offers do not expire and are available to all AWS customer

- Trials: Short-term free trials starting from the date you activate a particular service

### 3. EC2 Pricing

- **On-demand:** You pay by the hour or the second without pre-paying

- **Savings plan:** Commit to compute usage measured per hour for a 1- or 3-year term

- **Reserved Instances:** Commit to use for 1 or 3 years; pay regardless of usage

- **Spot Instances:** Instances only launch if spare capacity is available

- **Dedicated Hosts:** An entire physical server just for you

### 4. Lambda Pricing

- **Number of requests:** Include test invokes from the console

- **Code execution time:** From execution start, in response to events, to stop

- **Always free:** 1 million requests per month

### 5. S3 Pricing: you pay for the storage you use

- **Storage class:** Various storage classes

- **Storage:** Number and size of objects

- **Data transfer:** Data transferred out of S3 Region

- **Request data and retrieval:** Requests made for data and amount of requests

### 6. RDS Pricing

- **Running clock hours**

- **Type of database**

- **Storage**

- **Purchase type**

- **Database count**

- **API requests**

- **Deployment type**

- **Data transfer:** Inbound data transfer is free, and there is a charge for outbound data transfer

### 7. Application Discovery Service (compute price)

- **Total Cost of Ownership (TCO):** TCO is a financial estimate that helps you understand both the direct and indirect costs AWS.

Application Discovery Service helps you plan migration projects to the AWS Cloud

- Plan migration projects

- Used to estimate TCO

- Works with other services to migrate servers

Few ways to reduce TCO Using AWS

- **Minimize capital expenditures:** AWS helps you minimize large capital expenditures, which reduce your TCO.

- **Utilize Reserved Instances:** AWS provides Reserved Instances to help you lock in savings and reduce your TCO.

- **Right size your resources:** AWS helps you match the provisioning of resources to your usage needs to reduce your TCO.

Pricing Calculator

- The pricing calculator provides an estimate of AWS fees and charges

- Explore services based on your use case

- Find instance types that fit your needs

### 8. AWS Price List API (API price)

The Price List API allows you to query the price of AWS services

- Query using JSON or HTML

- Receive price alerts when prices change

## 4.2. Billing Services

### 1. Budgets

Dùng để plan budget sẽ sử dụng.

Budgets allows you to set custom budgets that alert you when your costs usage exceed your budgeted amount

- Improve planning and cost control

- Cost, usage and reservation budgets

- Budget alerts

There are 3 budget types:

- **Cost budgets:** Plan how much you want to spend on a service

- **Usage budgets:** Plan how much you want to use on one or more services

- **Reservation budgets:** Set RIs or Saving Plans utilization or coverage targets

In Real World:

- Monitor Free Tier usage so you don't incur unwanted costs:

  - You can monitor Free Tier usage to ensure you don't accidentally exceed Free Tier limits and incur unwanted costs.

  - You can set up an alert notification for when your account is approaching a particular dollar amount

### 2. Cost and Usage Report

Dùng để phân tích cost sử dụng hàng tháng **(số liệu, report)**

The Cost and Usage Report contains the most comprehensive set of cost and usage data

- Downloadable detailed and comprehensive report

- Lists usage for each service category

- Aggregate usage data on a daily, hourly or month level

In Real World:

- **View the most granular data about your AWS bill:** The Cost and Usage Report gives you the availability to do a deep dive into your AWS cost and usage data. Once set up, you can download the report using the Amazon S3 console

### 3. Cost Explorer

Dùng để vẽ **chart visualize** chi phí sử dụng cloud.

Cost Explorer allows you to visualize and forecast your costs and usage over time

- Visualize costs over time

- View past 12 months

- Forecast for up to 3 months

In Real World:

- **Analyze your EC2 usage over the past 7, 30, or 60 days:** If you are considering your options for Savings Plans, AWS Cost Explorer can analyze your EC2 usage over the past 7, 30, or 60 days

## 4.3. Governance Services (Root Account / Admin Account dùng)

### 1. Organizations

Quản lý các AWS Account theo Group, 1 group gồm nhiều Unit, thanh toán một lần cho cả group, quản lý quyền theo Unit. Thanh toán theo group thì được giảm giá nhiều hơn.

Organizations allows you to centrally manage multiple AWS accounts under one umbrella

- Group multiple accounts

- Single payment for all accounts

- Automate account creation

- Allocate resources and apply policies across accounts

Organization service control policies (SCPs) are used to enforce permissions you want everyone in the organization to follow.

![Organization](/images/organization.png)

Benefits of Organizations

- **Consolidated billing:** The advantage of consolidated billing is that you receive one bill for multiple accounts

- **Cost savings:** You'll receive volume discounts since usage is combined across accounts

- **Account governance:** You have quick and automated way to create accounts or invite existing accounts

In Real World:

- **Reduce costs by sharing resources across accounts:** Organizations allows you to save money using Reserved Instances (RIs) sharing. RI sharing allows all accounts in the organization to receive the hourly cost-benefit of RIs purchased by any other account. You can always turn off RI sharing using the master payer (or root) organization

### 2. Control Tower

Quản lý infrastructure và services theo mô hình multi-account.

Control Tower helps you to ensure your account conform to company-wide policies

- Helps set-up new accounts using a multi-account strategy

- Works directly with AWS Organizations

- Enforces the best use of services across accounts

- Provides a dashboard to manage accounts

![](/images/aws-control-tower.png)

In Real World:

- **Disallow public write access to all S3 buckets across your account:** Control Tower allows you to govern your multi-account environment by enabling cross-account security audits or preventing or detecting security issues through mandatory or optional guardrails.

### 3. Systems Manager

Quản lý toàn bộ AWS resources.

System Manager gives you visibility and control over you AWS resources

- Automate operational tasks on your resources

- Group resources and take action

- Patch and run commands on multiple EC2 instances or manage RDS instances

In Real World

- **Deploy operating system and software patches automatically across a large group of instances:** System Manager allows you to auto-patch software running on EC2 instances according to a schedule

### 4. Trusted Advisor

Check các issues vi phạm best practices đối với các services trên AWS.

Trusted Advisor provides real-time guidance to help you provision your resources following AWS best practices

- Checks your accounts and make recommendations

- Helps you see service limits

- Helps you understand best practices

Recommendations:

- Checks for unrestricted access for specific port on EC2 instances

- Checks S3 bucket permissions to determine if public access

- Checks for multi-factor authentication (MFA) on root account

- Checks IAM password policy

- Checks for RDS public snapshots

- Checks for services usage greater than 80% over service limit

- Checks for exposed access keys

- Check for CloudFront content delivery optimization

In Real World:

- **Check read and write capacity service limits to DynamoDB:** Trusted Advisor helps you reduce your overall costs by monitoring service limits

### 5. License Manager

Dùng để quản lý software licenses.

License Manager helps you manage software licenses

- Manage on-premises and AWS licenses

- Track licenses for Oracle, Microsoft, SAP and more

### 6. Certificate Manager (chỉ SSL thôi)

Dùng để quản lý các chứng chỉ SSL/TLS

Certificate Manager helps you provision and manage SSL/TLS certificates

- Provides public and private certificates for free

- Integrate with Elastic Load Balancing, API Gateway, and more

## 4.4. Management Services

### 1. Managed Services

Dùng để quản lý AWS Infrastructure nhưng cho role Mangement.

Managed Services helps you efficiently operate your AWS Infrastructure

- Augment your internal staffs

- Provide ongoing management of your infrastructure

- Reduces operational risks and overhead

In Real World

- **Develop application-specific health monitoring using CloudWatch:** Managed services can increase your operational efficiency by helping you develop application-specific health monitoring using CloudWatch

### 2. Professional Services

Dùng để đưa ra lời khuyên để migrate từ on-premises to cloud.

Professional Services helps enterprise customers move to a cloud-based operating model

- Proposes solutions

- Architect solutions

- Implement solutions

In Real World

- **Get help with evaluating an application for migration to the cloud:** You can quickly move on-premises applications to the cloud using AWS Professional Services

### 3. AWS Partner Network (APN)

Một cộng đồng cho các partner triển khai và bán các giải pháp công nghệ và dịch vụ tư vấn AWS => Bán design.

APN is a global community for approved partners that offer software solutions and consulting services for AWS

- Offer technology partners that provide software solutions

- Provide consulting partners that offer professional services

- Find approved vendors with deep AWS expertise

In Real World

- **You need help designing and building a new application:** If your team lacks the technical expertise to build and deploy cloud applications, the APN could help you get up and running quickly

### 4. Marketplace

Dùng để bán solution softwares => bán sản phẩm trên AWS.

Marketplace

- Buy third-party software

- Sell solutions to AWS customers

- Search the catalog of software listings and install with the click of a button

In Real World

- **Try out an application before making a long-term commitment:** Some products listed on marketplace offer free trials. The free trial allows you to try the software before you buy it

### 5. Personal Health Dashboard

Dashboard các trạng thái sức khoẻ các services trên AWS.

Personal Health Dashboard alerts you to events that might impact your AWS environment

- Provides troubleshooting guidance

- Feedback tailored to your specific environment

## 5. Support Plans

### 1.Basic

Cho hỏi giá billing với account thôi.

Basic Support is included for free for all AWS accounts

- Account and Billing support cases

- Service limit increases

### 2. Developer

Cho hỗ trợ technical

Developer Support starts at $29 a month, is recommended for testing and development.

- Recommended for testing and development

- Account and Billing support cases

- Service limit increases

- Technical support

- 1 primary contact

- Unlimited support cases

### 3. Business

Cho hỗ trợ business case nhiều hơn trên production.

Business Support starts at $100 a month and is recommended for production workloads

- Account and Billing support cases

- Service limit increases

- Technical support

- Unlimited contacts

- Unlimited cases

- Full Set of Trusted Advisor Checks

- Cloud support engineers: 24/7 access via email, phone or chat

Response times:

- < 24 hours General guidance

- < 4 hours Production system impaired

- < 12 hours System impaired

- < 1 hours Production system down

### 4. Enterprise

- Thêm cái technical account manager.

Enterprise Support starts at $15000 a month and is recommended for business or mission-critical production workloads.

Enterprise Support starts at $15000 a month and is recommended for business or mission-critical production workloads

- Account and Billing support cases

- Service limit increases

- Technical support

- Unlimited contacts

- Unlimited cases

- Full Set of Trusted Advisor Checks

- Technical Account Manager (TAM)

- Concierge support team

- Infrastructure Event Management

- Cloud support engineers: 24/7 access via email, phone or chat

Response times:

- < 24 hours General guidance

- < 4 hours Production system impaired

- < 12 hours System impaired

- < 1 hours Production system down

- < 15 minutes Business-critical system down

### 5. Support Case Types

- **Account and billing:** Account-related and billing cases can be opened by all customers

- **Service limit increases:** Default service quota (or limit) increases can be opened by all customers

- **Technical support:** Technical support cases can only be opened by customers on the Developer, Business, Enterprise plans
