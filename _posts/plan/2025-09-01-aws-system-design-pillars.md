---
layout: post
title: 6 Pillars AWS System Design
date: 2025-09-01
categories: plan
---

# 1. Operational Excellence

## 1.1. Design principles

- Organize teams around business outcomes.

- Implement observability for actionable insights.

- Safely automate where possible.

- Make frequenct, small, resersible changes.

- Refine operations procedures frequently.

- Anticiplate/Predict failure.

- Learn from all operational events and metrics.

- Use managed available service.

## 1.2. Questions

**Operations:**

### OPS 1: How do you determine what your priorities are?

- OPS01-BP01: Evaluate external customer needs.

- OPS01-BP02: Evaluate internal customer needs.

- OPS01-BP03: Evaludate govermance requirements: company rules.

- OPS01-BP04: Evaluate compliance requirements: country rules.

- OPS01-BP05: Evaluate threat landscape

- OPS01-BP06: Evaluate tradeoffs while managing benefits and risks

### OPS 2: How do you structure your organization to support your business outcomes?

- OPS02-BP01: Resources have identified owners.

- OPS02-BP02: Processes and procedures have identified owner.

- OPS02-BP03: Operation activities have identified owners responsible for their performance.

- OPS02-BP04: Merchanisms exist to manage responsibilities and ownership.

- OPS02-BP05: Mechanisms exist to request additions, changes, and exceptions

- OPS02-BP06: Responsibilities between teams are predefined or negotiated

### OPS 3: How does your organizational culture support your business outcomes?

- OPS03-BP01: Provide executive sponsorship

- OPS03-BP02: Team members are empowered to take action when outcomes are at risk.

- OPS03-BP03: Escalation is encouraged

- OPS03-BP04: Communications are timely, clear, and actionable

- OPS03-BP05: Experimentation is encouraged

- OPS03-BP06: Team members are encouraged to maintain and grow their skill sets

- OPS03-BP07: Resource teams appropriately

### OPS 4: How do you implement observability in your workload?

- OPS04-BP01: Identify key performance indicators

- OPS04-BP02: Implement application telemetry

- OPS04-BP03: Implement user experience telemetry

- OPS04-BP04: Implement dependency telemetry

- OPS04-BP05: Implement distributed tracing

## OPS 5: How do you reduce defects, ease remediation, and improve flow into production?

- OPS05-BP01: Use version control

- OPS05-BP02: Test and validate changes

- OPS05-BP03: Use configuration management systems

- OPS05-BP04: Use build and deployment management systems

- OPS05-BP05: Perform patch management: bản vá

- OPS05-BP06: Share design standards

- OPS05-BP07: Implement practices to improve code quality

- OPS05-BP08: Use multiple environments

- OPS05-BP09: Make frequent, small, reversible changes

- OPS05-BP10: Fully automate integration and deployment

### OPS 6: How do you mitigate deployment risks?

- OPS06-BP01: Plan for unsuccessful changes

- OPS06-BP02: Test deployments

- OPS06-BP03: Employ safe deployment strategies

- OPS06-BP04: Automate testing and rollback

### OPS 7: How do you know that you are ready to support a workload?

- OPS07-BP01: Ensure personnel capability

- OPS07-BP02: Ensure a consistent review of operational readiness

- OPS07-BP03: Use runbooks to perform procedures: A runbook is a documented process to achieve a specific outcome.

- OPS07-BP04: Use playbooks to investigate issues: Playbooks are step-by-step guides used to investigate an incident

- OPS07-BP05: Make informed decisions to deploy systems and changes

- OPS07-BP06: Create support plans for production workloads

**Operate:**

### OPS 8: How do you utilize workload observability in your organization?

- OPS08-BP01: Analyze workload metrics

- OPS08-BP02: Analyze workload logs

- OPS08-BP03: Analyze workload traces

- OPS08-BP04: Create actionable alerts

- OPS08-BP05: Create dashboards

### OPS 9: How do you understand the health of your operations?

- OPS09-BP01: Measure operations goals and KPIs with metrics

- OPS09-BP02: Communicate status and trends to ensure visibility into operation

- OPS09-BP03: Review operations metrics and prioritize improvement

### OPS 10: How do you manage workload and operations events?

- OPS10-BP01: Use a process for event, incident, and problem management.

- OPS10-BP02: Have a process per alert

- OPS10-BP03: Prioritize operational events based on business impact

- OPS10-BP04: Define escalation paths

- OPS10-BP05: Define a customer communication plan for service-impacting events

- OPS10-BP06: Communicate status through dashboards

- OPS10-BP07: Automate responses to events

**Evolve:**

### OPS 11: How do you evolve operations?

- OPS11-BP01: Have a process for continuous improvement

- OPS11-BP02: Perform post-incident analysis

- OPS11-BP03: Implement feedback loops

- OPS11-BP04: Perform knowledge management

- OPS11-BP05: Define drivers for improvement

- OPS11-BP06: Validate insights

- OPS11-BP07: Perform operations metrics reviews

- OPS11-BP08: Document and share lessons learned

- OPS11-BP09: Allocate time to make improvements

# 2. Security

## 2.1. Design principles

- Implement a least privilege foundation.

- Maintain traceability: audit changes in your environment in real-time.

- Apply security at all layers

- Automate security best practices

- Protect data in transit and at rest

- Keep people away from data

- Prepare for security events

## 2.2. Questions

**Security foundations:**

### SEC 1: How do you securely operate your workload?

- SEC01-BP01: Separate workloads using accounts

- SEC01-BP02: Secure account root user and properties

- SEC01-BP03: Identify and validate control objectives

- SEC01-BP04: Stay up to date with security threats and recommendations

- SEC01-BP05: Reduce security management scope

- SEC01-BP06: Automate deployment of standard security controls

- SEC01-BP07: Identify threats and prioritize mitigations using a threat model

- SEC01-BP08: Evaluate and implement new security services and features regularly

**Identity and access management:**

### SEC 2: How do you manage identities for people and machines?

- SEC02-BP01: Use strong sign-in mechanisms

- SEC02-BP02: Use temporary credentials

- SEC02-BP03: Store and use secrets securely

- SEC02-BP04: Rely on a centralized identity provider

- SEC02-BP05: Audit and rotate credentials periodically

- SEC02-BP06: Employ user groups and attributes

### SEC 3: How do you manage permissions for people and machines?

- SEC03-BP01: Define access requirements

- SEC03-BP02: Grant least privilege access

- SEC03-BP03: Establish emergency access process

- SEC03-BP04: Reduce permissions continuously

- SEC03-BP05: Define permission guardrails for your organization

- SEC03-BP06: Manage access based on lifecycle

- SEC03-BP07: Analyze public and cross-account access

- SEC03-BP08: Share resources securely within your organization

- SEC03-BP09: Share resources securely with a third party

**Detection:**

### SEC 4: How do you detect and investigate security events?

- SEC04-BP01: Configure service and application logging

- SEC04-BP02: Capture logs, findings, and metrics in standardized locations

- SEC04-BP03: Correlate and enrich security alerts

- SEC04-BP04: Initiate remediation for non-compliant resources: alert resources that do not meet compliance rules.

**Infrastructure protection:**

### SEC 5: How do you protect your network resources? (Network)

- SEC05-BP01: Create network layers

- SEC05-BP02: Control trffic flow within your network layers

- SEC05-BP03: Implement inspection-based protection

- SEC05-BP04: Automate network protection

### SEC 6: How do you protect your compute resources? (Compute)

- SEC06-BP01: Perform vulnerability management

- SEC06-BP02: Provision compute from hardened images

- SEC06-BP03: Reduce manual management and interactive access

- SEC06-BP04: Validate software integrity

- SEC06-BP05: Automate compute protection

**Data protection:**

### SEC 7: How do you classify your data? (Data)

- SEC07-BP01: Understand your data classification scheme

- SEC07-BP02: Apply data protection controls based on data sensitivity

- SEC07-BP03 Automate identification and classification

- SEC07-BP04: Define scalable data lifecycle management

### SEC 8: How do you protect your data at rest? (Data rest)

- SEC08-BP01: Implement secure key management

- SEC08-BP02: Enforce encryption at rest

- SEC08-BP03: Automate data at rest protection

- SEC08-BP04: Enforce access control

### SEC 9: How do you protect your data in transit? (Data transit)

- SEC09-BP01: Implement secure key and certificate management

- SEC09-BP02: Enforce encryption in transit

- SEC09-BP03: Authenticate network communications

**Incident response:**

### SEC 10: How do you anticipate, respond to, and recover from incidents? (Detect incidents)

- SEC10-BP01: Identify key personnel and external resources

- SEC10-BP02: Develop incident management plans

- SEC10-BP03: Prepare forensic capabilities

- SEC10-BP04: Develop and test security incident response playbooks

- SEC10-BP05: Pre-provision access

- SEC10-BP06: Pre-deploy tools

- SEC10-BP07: Run simulations

- SEC10-BP08: Establish a framework for learning from incidents

**Application security:**

### SEC 11: How do you incorporate and validate the security properties of applications throughout the design, development, and deployment lifecycle? (application security)

- SEC11-BP01: Train for application security

- SEC11-BP02: Automate testing throughout the development and release lifecycle

- SEC11-BP03: Perform regular penetration testing

- SEC11-BP04: Conduct code reviews

- SEC11-BP05: Centralize services for packages and dependencies

- SEC11-BP06: Deploy software programmatically

- SEC11-BP07: Regularly assess security properties of the pipelines

- SEC11-BP08: Build a program that embeds security ownership in workload teams

# 3. Reliability

## 3.1. Design principles

- Automatically recover from failure

- Test recovery procedures

- Scale horizontally to increase aggregate workload availability

- Stop guessing capacity

- Manage change through automation: can tracked and reviewed.

## 3.2. Questions

**Foundations:**

### REL 1: How do you manage Service Quotas (Limits) and constraints?

- REL01-BP01: Aware of service quotas and constraints

- REL01-BP02: Manage service quotas across accounts and regions

- REL01-BP03: Accommodate fixed service quotas and constraints through architecture

- REL01-BP04: Monitor and manage quotas

- REL01-BP05: Automate quota management

- REL01-BP06: Ensure that a suﬃcient gap exists between the current quotas and the maximum usage to accommodate failover

### REL 2: How do you plan your network topology? (network)

- REL02-BP01: Use highly available network connectivity for your workload public endpoints

- REL02-BP02: Provision redundant connectivity between private networks in the cloud and on-premises environments.

- REL02-BP03: Ensure IP subnet allocation accounts for expansion and availability

- REL02-BP04: Prefer hub-and-spoke topologies over many-to-many mesh

- REL02-BP05: Enforce non-overlapping private IP address ranges in all private address spaces where they are connected

**Workload architecture:**

### REL 3: How do you design your workload service architecture? (workload)

- REL03-BP01: Choose how to segment your workload

- REL03-BP02: Build services focused on specific business domains and functionality

- REL03-BP03: Provide service contracts per API

### REL 4: How do you design interactions in a distributed system to prevent failures? (prevent failure)

- REL04-BP01: Identify the kind of distributed systems you depend on

- REL04-BP02: Implement loosely coupled dependencies

- REL04-BP03: Do constant work

- REL04-BP04: Make mutating operations idempotent

### REL 5: How do you design interactions in a distributed system to mitigate or withstand failures? (migrate, withstand failures)

- REL05-BP01: Implement graceful degradation to transform applicable hard dependencies into soft dependencies

- REL05-BP02: Throttle requests

- REL05-BP03: Control and limit retry calls

- REL05-BP04: Fail fast and limit queues

- REL05-BP05: Set client timeouts

- REL05-BP06: Make systems stateless where possible

- REL05-BP07: Implement emergency levers

**Change management:**

### REL 6: How do you monitor workload resources? (monitor)

- REL06-BP01: Monitor all components for the workload (Generation)

- REL06-BP02: Define and calculate metrics (Aggregation)

- REL06-BP03: Send notifications (Real-time processing and alarming)

- REL06-BP04: Automate responses (Real-time processing and alarming)

- REL06-BP05: Analyze logs

- REL06-BP06: Regularly review monitoring scope and metrics

- REL06-BP07: Monitor end-to-end tracing of requests through your system

### REL 7: How do you design your workload to adapt to changes in demand? (adapt changes)

- REL07-BP01: Use automation when obtaining or scaling resources

- REL07-BP02: Obtain resources upon detection of impairment to a workload

- REL07-BP03: Obtain resources upon detection that more resources are needed for a workload

- REL07-BP04: Load test your workload

### REL 8: How do you implement change? (implement changes)

- REL08-BP01: Use runbooks for standard activities such as deployment

- REL08-BP02: Integrate functional testing as part of your deployment

- REL08-BP03: Integrate resiliency testing as part of your deployment

- REL08-BP04: Deploy using immutable infrastructure

- REL08-BP05: Deploy changes with automation

**Failure management:**

### REL 9: How do you back up data? (back up data)

- REL09-BP01: Identify and back up all data that needs to be backed up, or reproduce the data from sources

- REL09-BP02: Secure and encrypt backups

- REL09-BP03: Perform data backup automatically

- REL09-BP04: Perform periodic recovery of the data to verify backup integrity and processes

### REL 10: How do you use fault isolation to protect your workload? (fault isolation)

- REL10-BP01: Deploy the workload to multiple locations

- REL10-BP02: Automate recovery for components constrained to a single location

- REL10-BP03: Use bulkhead architectures to limit scope of impact

### REL 11: How do you design your workload to withstand component failures? (withstand fault)

- REL11-BP01: Monitor all components of the workload to detect failures

- REL11-BP02: Fail over to healthy resources

- REL11-BP03: Automate healing on all layers

- REL11-BP04: Rely on the data plane and not the control plane during recovery

- REL11-BP05: Use static stability to prevent bimodal behavior

- REL11-BP06: Send notifications when events impact availability

- REL11-BP07: Architect your product to meet availability targets and uptime service level agreements (SLAs)

### REL 12: How do you test reliability? (test)

- REL12-BP01: Use playbooks to investigate failures (strategy)

- REL12-BP02: Perform post-incident analysis

- REL12-BP03: Test scalability and performance requirements

- REL12-BP04: Test resiliency using chaos engineering

- REL12-BP05: Conduct game days regularly

### REL 13: How do you plan for disaster recovery (DR)? (discovery)

- REL13-BP01: Define recovery objectives for downtime and data loss

- REL13-BP02: Use defined recovery strategies to meet the recovery objectives

- REL13-BP03: Test disaster recovery implementation to validate the implementation

- REL13-BP04: Manage configuration drift at the DR site or Region

- REL13-BP05: Automate recovery

# 4. Performance Efficiency

# 5. Cost Optimization

# 6. Sustainability
