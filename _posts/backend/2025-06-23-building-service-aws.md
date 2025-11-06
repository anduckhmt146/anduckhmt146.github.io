---
layout: post
title: AWS Applications
date: 2025-06-23
categories: cloud-solution
---

Here is some techniques when implementing services in AWS

# 1. Principles:

- **Step 1:** Requirement gathering

  - Business requirements.
  - Functional requirements.
  - Non-functional requirements.
  - Technical requirements.
  - Data requirements.
  - Integration requirements.
  - Security & Compliance requirements.
  - Financial requirements.

- **Step 2:** Choosing an architecture pattern

  - Web application.
  - Data proccessing pipeline.
  - Serverless architecture.
  - Microservice.
  - Event-driven architecture.
  - Domain: e-commerce, media and entertainment, healthcare, financial service,..
  - Every architecture pattern has a strengths, weaknesses, trade-offs.

- **Step 3:** Selecting a service

  - You can choose AWS services.
  - Or leverage third-party services.

- **Step 4:** Diagramming the service.

- **Step 5:** Exploring Well-Architecture framework.

- **Step 6:** Using AWS Console, AWS CLI, AWS SDK, IaC (CloudFormation & Terraform)...
  - AWS Console: convenient with create a EC2, but drawbacks when you need to create 100 - 1000 EC2s.
  - AWS CLI: Using in your terminal, required AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION.

```bash
$ aws <command> <subcommand> [options and parameters]
```

    - AWS SDK: Golang, NodeJS, Python... provide abstract high-level interface for you to make HTTP/HTTPS requests.

    - IaC: CloudFormation and Terraform.
        - CloudFormation (.yaml)

```bash
Resources:
    NewEC2Instance:
        Type: AWS::EC2::Instance
            Properties:
            ImageId: "ami-0c101f26f147fa7fd"
```

        - Terraform

```bash
provider "aws" {
    region = "us-east-1"
}

resource "aws_instance" "ec2" {
    ami = "ami-0c101f26f147fa7fd"
    instance_type = "t2.micro"
}
```

# 2. Host a personal website:

## 2.1. Architecture:

![](/images/AWS/static_website.png)

## 2.2. AWS Serices

- S3:

  - Pros: Versioning, easy to host static website and assets.
  - Cons: S3 is a regional service.

- CloudFront:

  - Pros: Globally access.

- Cloud Watch:
  - Monitor both S3 and CloudFront.

## 2.3. How to implement:

- Step 1: Upload source code to S3.

- Step 2: Come to AWS CloundFront -> Config policy point to S3.

```bash
{
  "Version": "2008-10-17",
  "Id": "PolicyForCloudFrontPrivateContent",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::cloudprojectwebsitebucket/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::111111111111:distribution/E33NUQ32Z0XQZB"
        }
      }
    }
  ]
}
```

- Step 3: Go to CloudWatch to monitor the website: 4xx Error Rate, 5xx Error Rate,...

- Step 4: Buy DNS Name in Route 53 -> Add custom domain name in AWS Cloud Front.

- Step 5: Add security to the website.

  - Add AWS WAF (Firebase)

  - Add Shield (DDoS)

  - Add logging in CloudFront.

## 2.4. Final Architecture:

![](/images/AWS/static_security_website.png)

# 3. Building a Recipe-Sharing (Server Application)

## 3.1. Architeture

![](/images/AWS/recipe_sharing.png)

## 3.2. AWS Service:

---

Frontend Layer:

- AWS S3: to store build frontend

- AWS Cloudfront: Distribute frontend over the world

---

Backend Layer:

- AWS VPC: Isolate network to only allow frontend CDN -> call backend EC2.

- EC2: API Server.

- Load Balancer: Load balancing traffic to multiple EC2s.

---

Database Layer

- DynamoDB: Database layer to create/update/delete data.

---

Deployment Layer

- CloudFormation: use to deploy code.

- Route 53: to buy DNS.

- Certificate Manager: to buy SSL for the domain.

## 3.3. Future Work:

- Auto Scaling: Infrastructure.

- CI/CD: Implement AWS CodeCommit.

- Authentication: Using OAuth of AWS Cognito.

- Logging, Monitoring: CloudWatch Logs.

- Caching: DynamoDB Accelerator (DAX), Redis or Memcached.

## 3.4. Final Architecture:

![](/images/AWS/recipe_sharing_final.png)

# 4. Building a Recipe-Sharing (Serverless)

## 4.1. Archiecture

![](/images/AWS/recipe_sharing_serverless.png)

## 4.2. Choosing service

- S3: Store frontend build.

- CDN: Serve frontend build.

- CloudFormation: Deployment.

- AWS Cognito: Use to authenticate, authorization with AWS.

- AWS Lambda: upload function and execute.

```python
import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('recipes')
def lambda_handler(event, context):
    try:
        recipe_id = event['pathParameters']['recipe_id']
        response = table.delete_item(Key = {
            'id': recipe_id
        })
        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": "Recipe deleted successfully"
            })
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({
                "message": f "Error deleting recipe: {e}"
            })
        }
```

- API Gateway: Route API to services and functions.

## 4.3. Future Work:

- Store user profile

## 4.4. Final Architecture:

![](/images/AWS/recipe_sharing_serverless_final.png)

# 5. Build Image Analyzer to Detect Photo Friendliness

## 5.1. Architecture:

![](/images/AWS/photo_classification.png)

## 5.2. Choosing service:

- AWS Rekognition: ML services of AWS.

- API Gateway: Route traffic from client to AWS Lambda.

- AWS Lambda: use to execute the function to AWS Rekognition.

- Terraform: use to define infrastructure.

## 5.3. Deployment with Terraform

- **lambda.tf**

```python
data "aws_iam_policy"
"rekognition_policy" {
    arn = "arn:aws:iam::aws:policy/AmazonRekognitionReadOnlyAccess"
}
resource "aws_iam_role_policy_attachment"
"codedeploy_service_role_policy_attach" {
    role = aws_iam_role.lambda_role.name
    policy_arn = "${data.aws_iam_policy.rekognition_policy.arn}"
}
data "archive_file"
"zip_the_python_code" {
    type = "zip"
    source_file = "${path.module}/python/rekognition.py"
    output_path = "${path.module}/python/rekognition.zip"
}
resource "aws_lambda_function"
"terraform_lambda_func" {
    filename = "${path.module}/python/rekognition.zip"
    function_name = "Detection_Lambda_Function"
    role = aws_iam_role.lambda_role.arn
    handler = "rekognition.lambda_handler"
    runtime = "python3.8"
    depends_on = [aws_iam_role_policy_attachment.attach_iam_policy_to_iam_role]
}
```

- **apigw.tf**

```python
resource "aws_api_gateway_method"
"proxy" {
    rest_api_id = aws_api_gateway_rest_api.my_api.id
    resource_id = aws_api_gateway_resource.root.id
    http_method = "POST"
    authorization = "NONE"
}
resource "aws_api_gateway_integration"
"lambda_integration" {
    rest_api_id = aws_api_gateway_rest_api.my_api.id
    resource_id = aws_api_gateway_resource.root.id
    http_method = aws_api_gateway_method.proxy.http_method
    integration_http_method = "POST"
    type = "AWS"
    uri = aws_lambda_function.terraform_lambda_func.invoke_arn
}
resource "aws_api_gateway_method_response"
"proxy" {
    rest_api_id = aws_api_gateway_rest_api.my_api.id
    resource_id = aws_api_gateway_resource.root.id
    http_method = aws_api_gateway_method.proxy.http_method
    status_code = "200"
}
resource "aws_api_gateway_integration_response"
"proxy" {
    rest_api_id = aws_api_gateway_rest_api.my_api.id
    resource_id = aws_api_gateway_resource.root.id
    http_method = aws_api_gateway_method.proxy.http_method
    status_code = aws_api_gateway_method_response.proxy.status_code
    depends_on = [
        aws_api_gateway_method.proxy,
        aws_api_gateway_integration.lambda_integration
    ]
}
```

- Run the code

```bash
terraform apply
```

# 6. Build Content Translation Pipeline

## 6.1. Architecture

![](/images/AWS/content_translating.png)

![](/images/AWS/content_translating_admin.png)

## 6.2. Choosing services:

- AWS Translate: Use to translate language.

- AWS CodePipeline and AWS CodeBuild: Build CI/CD.

# 7. Implementing a Chatbot Using Machine Learning

## 7.1. Architecture

![](/images/AWS/chatbot.png)

- AWS Cognito come with AWS Gateway -> because it helps the OAuth without implement authenticate service in the BE.

- AWS Event Bridge: Use when multiple lambda function interact with each others.

# 8. Building a Business Intelligence Application

## 8.1. Architecture

![](/images/AWS/aws_business_intelligence.png)

## 8.2. Choosing AWS Services:

- S3: Store event.

- AWS Glue: ETL the raw data.

- Amazon Athena: Using SQL to query data in S3 or log format.

- AWS Quick Insights: Use to view some visualizations and dashboards.

# 8. Future Work

## 8.1. Deploy with ECS

![](/images/AWS/ecs.png)

- ECS to use to deploy docker containers.

- ECS can run in serverless (Fargate) or EC2 (Virtual Machine).

## 8.2. API with GraphQL

![](/images/AWS/aws_graphql.png)

- AWS AppSync: To build API Query with GraphQL

## 8.3. AWS Genrative AI

![](/images/AWS/aws_generative_ai.png)

- AWS Bedrock: Use in Generative AI.

## 8.4. Asynchronus API

![](/images/AWS/aws_asynchronus.png)

## 8.5. AWS SNS Fanout

![](/images/AWS/aws_fanout.png)

## 8.6. AWS Event-driven

## 8.7. AWS Pricing Calculator
