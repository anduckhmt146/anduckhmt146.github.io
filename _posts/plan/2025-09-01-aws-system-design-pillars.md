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

**Security:**

**Identity and access management:**

**Detection:**

**Infrastructure protection:**

**Data protection:**

**Incident response:**

**Application security:**

# 3. Reliability

# 4. Performance Efficiency

# 5. Cost Optimization

# 6. Sustainability
