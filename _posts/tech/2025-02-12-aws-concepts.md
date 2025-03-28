---
layout: post
title: 'AWS Concepts'
date: 2025-02-12
categories: tech
---

Here is the concepts of AWS that I learned for AWS Certified Cloud Practitioner.

# 1. Cloud Computing

## The deployment model of the cloud

## Five characteristics of Cloud Computing

## Six advantages of Cloud Computing

## Problems solved by the Cloud

## Benefits of Cloud Computing

## CapEx vs OpEx

## Types of cloud computing

## Pricing of the cloud

## How to choose an AWS region

## AWS Availability Zones

## Tour of the AWS console (Global Scope, Local Scope)

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

You care about low cost without any upfront payment or long-term commitment

Your application has unpredictable workloads that can't be interrupted

Your applications are under development

Your workloads will not run longer than a year

You can reserve capacity using on-demand capacity reservations. The EC2 capacity is held for you whether or not you run the instance

#### Spot:

Spot instances let you take advantage of unused EC2 capacity. Your request is fulfilled only if capacity is available

Use spot instances when:

You are not concerned about the start or stop time of your application

Your workloads can be interrupted

Your application is only feasible at a very low compute prices

You can save up to 90% off On-Demand prices

You pay the spot price that's in effect at the beginning of each hour

#### Reserved Instances (RIs):

RIs allows you to commit to a specific instance type in a particular region for 1 or 3 years

Use Reserved Instances when:

Your application has steady state usage, and you can commit to 1 or 3 years

You can pay money upfront in order to receive a discount for On-Demand prices

Your application requires a capacity reservation

You can save up to 75% off On-Demand prices

You are required to sign a contract

You can reserve capacity in an Availability Zone for any duration

You can pay All Upfront, Partial Upfront or No Upfront. All Upfront for the max term earns the highest discount

Provide convertible types at 54% discount

#### Dedicated hosts

Dedicated hosts allow you to pay for a physical server that is fully dedicated to running your instances

Use dedicated hosts when:

Your want to bring your own server-bound software license from vendors like Microsoft or Oracle

You have regulatory or corporate compliance requirements around tenancy model

You can save up to 70% off on-demand prices

You bring your existing per-socket, per-core or per-VM software licenses

There's no multi-tenancy, meaning the server is not shared with other customers

A dedicated host is a physical server, whereas a dedicated instance runs on the host

#### Savings plan

Savings plan allows you to commit to compute usage (measured per hour) for 1 or 3 years

Use savings plan when:

You want to lower your bill across multiple compute services

You want the flexibility to change compute services, instances types, operating systems, or regions

You can save up to 72% On-demand prices

You are not making a commitment to dedicated host, just compute usage

Savings can be shared across various compute services like EC2, Fargate and Lambda

This does not provide a capacity reservation

#### Features

EC2 instances offer load balancing and auto-scaling

Load balancing: Elastic load balancing automatically distributes your incoming application traffic across multiple EC2 instances

EC2 auto scaling adds or replaces EC2 instances automatically across AZs, based on need and changing demand. Reduce the impact of system failures and improve the availability of your applications

Horizontal scaling (scaling out): adding or removing servers/instances

Vertical scaling (scaling up): upgrades an EC2 instance by adding more power (CPU, RAM) to an existing server

### 2. AWS Lambda

Lambda is a serverless compute service that lets you run code without managing servers

You author application code, called functions, using many popular languages

Scales automatically

Serverless, means you don't have to worry about managing servers like with EC2

Lambda is a building block for many serverless applications (serverless means AWS manages the servers for you and you cannot access them, you can pretend they don't exist)

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

### 2. Amazon Route 53

### 3. AWS Direct Connect

### 4. AWS VPN

### 5. API Gateway

## 6. Databases

### 1. Amazon Relational Database Service (RDS)

### 2. Amazon Aurora

### 3. DynamoDB

### 4. Amazon DocumentDB

### 5. Amazon ElastiCache

### 6. Amazon Neptune

### 7. Databases in real world

## 7. Migration and Transfer Services

### 1. Database Migration Service (DMS)

### 2. Server Migration Service (SMS)

### 3. Snow Family

### 4. DataSync

## 8. Analytics Service

### 1. Amazon Redshift

### 2. Athena

### 3. Glue

### 4. Kinesis

### 5. Elastic MapReduce

### 6. Data Pipeline

### 7. QuickSight

### 8. Analytics in real world

## 9. Machine Learning Services

### 1. Rekognition

### 2. Comprehend

### 3. Polly

### 4. SageMaker

### 5. Translate

### 6. Lex

## 10. Machine Learning Services

### 1. Cloud9

### 2. CodeCommit

### 3. CodeBuild

### 4. CodeDeploy

### 5. CodePipeline

### 6. X-Ray

### 7. CodeStar

### 8. Developer Tools in real world

## 11. Infrastructure Management Services

### 1. CloudFormation

### 2. Elastic Beanstalk

### 3. OpsWorks

### 4. Infrastructure Management in real world

## 12. Messaging and Integration Service

### 1. Simple Queue Service (SQS)

### 2. Simple Notification Service (SNS)

### 3. Simple Email Service (SES)

### 4. Messaging in real world

## 13. Auditing, Monitoring, and Logging Services

### 1. CloudWatch

### 2. CloudTrail

### 3. Auditing, Monitoring, and Logging in real world

## 14. Additional Services

### 1. Amazon Workspaces

### 2. Amazon Connect

# 3. Security and Compliance

## 1. Shared Responsibility Model

### Public Cloud

### EC2 Shared Responsibility Model

### Lambda Shared Responsibility Model

## 2. 6 pillars of Well-Architected Framework

## 3. IAM Users

### Identity and Access Management

### Identities vs Access

### Authentication ("Who") vs Authorization ("What")

### Users

### Groups

### IAM Users in real world

## 4. IAM Permissions

### Roles

### Policies

### IAM Best Practices

### IAM Credential Report

### IAM Permissions in real world

## 5. Application Security Services

### 1. Firewall

#### 1. Web Application Firewall (WAF)

#### 2. Firewall in real world

### 2. Distributed Denial of Service (DDoS)

#### 1. Shield

#### 2. Macie

#### 3. Distributed Denial of Service (DDoS)

## 6. Additional Security Services

### 1. Config

### 2. GuardDuty

### 3. Inspector

### 4. Artifact

### 5. Cognito

### 6. Usecase in real world

## 7. Data Encryption and Secrets Management Services

### 1. Key Management Service (KMS)

### 2. CloudHSM

### 3. Secrets Manager

### 4. Application in real world

## 8. AWS Account

### 1. AWS Management Console

### 2. Root user

### 3. Console

### 4. CLI

# 4. Pricing, Billing and Governance

## 4.1. AWS Pricing

### 1. Fundamental drivers of cost

### 2. Free Offer Types

### 3. EC2 Pricing

### 4. Lambda Pricing

### 5. S3 Pricing: you pay for the storage you use

### 6. RSD Pricing

### 7. Application Discovery Service

### 8. AWS Price List API

## 4.2. Billing Services

### 1. Budgets

### 2. Cost and Usage Report

### 3. Cost Explorer

## 4.3. Governance Services

### 1. Organizations

### 2. Control Tower

### 3. Systems Manager

### 4. Trusted Advisor

### 5. License Manager

### 6. Certificate Manager

## 4.4. Management Services

### 1. Managed Services

### 2. Professional Services

### 3. AWS Partner Network (APN)

### 4. Marketplace

### 5. Personal Health Dashboard

## 5. Support Plans

### 1.Basic

### 2. Developer

### 3. Business

### 4. Enterprise

### 5. Support Case Types
