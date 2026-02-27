'use client';

import React from 'react';

const translations = {
  en: {
    title: 'AWS Services Guide 2026: EC2, S3, RDS, Lambda, ECS/EKS, CloudFront, IAM, VPC & Cost Optimization',
    description:
      'Complete guide to core AWS services: compute (EC2, Lambda, ECS/EKS), storage (S3), databases (RDS, DynamoDB), networking (VPC, Route 53, CloudFront), security (IAM), messaging (SQS/SNS), monitoring (CloudWatch), and proven cost optimization strategies.',
  },
  zh: {
    title: 'AWS 服务全指南 2026：EC2、S3、RDS、Lambda、ECS/EKS、CloudFront、IAM、VPC 与成本优化',
    description:
      '全面讲解 AWS 核心服务：计算（EC2、Lambda、ECS/EKS）、存储（S3）、数据库（RDS、DynamoDB）、网络（VPC、Route 53、CloudFront）、安全（IAM）、消息（SQS/SNS）、监控（CloudWatch）以及经过验证的成本优化策略。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between EC2 On-Demand, Reserved, and Spot Instances?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On-Demand instances charge per second with no commitment, ideal for unpredictable workloads. Reserved Instances offer up to 72% discount for 1-3 year commitments, best for steady-state usage. Spot Instances provide up to 90% discount by using spare EC2 capacity, but can be interrupted with 2 minutes notice — perfect for fault-tolerant batch jobs, CI/CD, and data processing.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use RDS vs DynamoDB?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use RDS when you need relational data with complex joins, transactions, and SQL support (MySQL, PostgreSQL, Oracle, SQL Server). Use DynamoDB for key-value or document workloads requiring single-digit millisecond latency at any scale, such as gaming leaderboards, session stores, IoT data, and e-commerce carts. DynamoDB is fully managed and serverless, while RDS requires instance sizing and maintenance windows.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I choose between ECS and EKS for container orchestration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Choose ECS if you want a simpler, AWS-native container orchestration service with deep integration into other AWS services and no additional management overhead. Choose EKS if you need Kubernetes compatibility, want to run the same workloads across AWS and other clouds, or already have Kubernetes expertise. Both support Fargate for serverless containers, eliminating the need to manage underlying EC2 instances.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best practices for AWS IAM security?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Follow the principle of least privilege — grant only permissions needed. Enable MFA on all accounts, especially root. Use IAM roles instead of long-lived access keys. Implement Service Control Policies in AWS Organizations. Rotate credentials regularly. Use IAM Access Analyzer to identify unused permissions. Never embed credentials in code; use IAM roles for EC2/Lambda or AWS Secrets Manager.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Amazon VPC work and what are the key components?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A VPC is an isolated virtual network within AWS. Key components include subnets (public and private), route tables, Internet Gateway (for public internet access), NAT Gateway (for private subnet outbound access), security groups (stateful instance-level firewall), and NACLs (stateless subnet-level firewall). Best practice is to use multiple Availability Zones with public subnets for load balancers and private subnets for application servers and databases.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between SQS and SNS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SQS (Simple Queue Service) is a message queue for decoupling producers and consumers — messages are pulled by consumers and processed once. SNS (Simple Notification Service) is a pub/sub system that pushes messages to multiple subscribers simultaneously (Lambda, SQS, HTTP, email, SMS). Use SQS for task queues and work distribution, SNS for fan-out notifications. They are often used together: SNS publishes to multiple SQS queues for parallel processing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I reduce my AWS bill by 40-60%?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key strategies: 1) Use Reserved Instances or Savings Plans for steady workloads (up to 72% savings). 2) Leverage Spot Instances for fault-tolerant workloads (up to 90% savings). 3) Right-size instances using AWS Compute Optimizer. 4) Use S3 Intelligent-Tiering for automatic storage cost optimization. 5) Enable auto-scaling to match capacity to demand. 6) Delete unused EBS volumes, snapshots, and Elastic IPs. 7) Use AWS Cost Explorer and set billing alerts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do CloudFront and Route 53 work together for global applications?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Route 53 provides DNS resolution with health checks and routing policies (latency-based, geolocation, failover, weighted). CloudFront is a CDN that caches content at 400+ edge locations worldwide, reducing latency to single-digit milliseconds. Together, Route 53 routes users to the nearest CloudFront edge location, which serves cached content or fetches from the origin. This combination delivers global sub-100ms response times with automatic failover.',
      },
    },
  ],
};

export default function AwsServicesGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    marginBottom: '24px',
  };

  const thStyle: React.CSSProperties = {
    padding: '10px 14px',
    textAlign: 'left',
    background: '#1e293b',
    color: '#f1f5f9',
    fontWeight: '600',
  };

  const tdStyle: React.CSSProperties = {
    padding: '9px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
    verticalAlign: 'top',
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', marginBottom: '16px' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: '1.7', margin: '0' }}>
          {t.description}
        </p>
      </header>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          {isZh ? 'TL;DR — 60 秒速览 AWS 核心服务' : 'TL;DR — AWS Core Services in 60 Seconds'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.9' }}>
          <li>{isZh ? 'EC2 提供弹性计算能力；Spot 实例可节省高达 90% 成本' : 'EC2 provides elastic compute; Spot Instances save up to 90% cost'}</li>
          <li>{isZh ? 'S3 提供 99.999999999%（11 个 9）的持久性，适合存储任何规模数据' : 'S3 delivers 99.999999999% (11 nines) durability for data at any scale'}</li>
          <li>{isZh ? 'RDS 适合关系型数据，DynamoDB 适合单毫秒级延迟的键值/文档工作负载' : 'RDS for relational data, DynamoDB for single-ms latency key-value/document workloads'}</li>
          <li>{isZh ? 'Lambda 按调用计费，ECS/EKS 用于容器化微服务' : 'Lambda charges per invocation; ECS/EKS for containerized microservices'}</li>
          <li>{isZh ? 'VPC + 安全组 + IAM 构建纵深防御安全模型' : 'VPC + Security Groups + IAM build defense-in-depth security'}</li>
          <li>{isZh ? 'CloudFront + Route 53 实现全球亚 100ms 响应时间' : 'CloudFront + Route 53 deliver global sub-100ms response times'}</li>
          <li>{isZh ? 'SQS/SNS 解耦微服务；CloudWatch 提供全栈可观测性' : 'SQS/SNS decouple microservices; CloudWatch provides full-stack observability'}</li>
          <li>{isZh ? '预留实例 + Savings Plans + 自动伸缩可削减 40-60% 账单' : 'Reserved Instances + Savings Plans + Auto Scaling cut 40-60% off your bill'}</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <strong style={{ fontSize: '1rem', color: '#334155', display: 'block', marginBottom: '10px' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.9' }}>
          <li>{isZh ? '选择正确的实例类型和定价模型是最大的成本杠杆' : 'Choosing the right instance type and pricing model is the biggest cost lever'}</li>
          <li>{isZh ? '一切设计都应考虑多可用区高可用' : 'Design everything for multi-AZ high availability from day one'}</li>
          <li>{isZh ? 'IAM 最小权限原则是安全的基石，使用角色而非密钥' : 'IAM least privilege is the security foundation — use roles, not access keys'}</li>
          <li>{isZh ? '无服务器架构（Lambda + DynamoDB + API Gateway）可将运维开销降至接近零' : 'Serverless (Lambda + DynamoDB + API Gateway) reduces ops overhead to near zero'}</li>
          <li>{isZh ? '基础设施即代码（CloudFormation / CDK / Terraform）是生产环境必需' : 'Infrastructure as Code (CloudFormation / CDK / Terraform) is a production requirement'}</li>
          <li>{isZh ? 'AWS Well-Architected Framework 五大支柱指导架构决策' : 'AWS Well-Architected Framework five pillars guide every architecture decision'}</li>
        </ul>
      </div>

      {/* Section 1: AWS Overview */}
      <h2 style={h2Style}>
        {isZh ? '1. AWS 服务全景图' : '1. AWS Services Landscape'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Amazon Web Services（AWS）是全球最大的云平台，提供超过 200 种服务，覆盖计算、存储、数据库、网络、安全、分析、机器学习等领域。理解核心服务及其组合方式是构建可靠、可扩展云架构的基础。'
          : 'Amazon Web Services (AWS) is the world\'s largest cloud platform, offering over 200 services spanning compute, storage, databases, networking, security, analytics, machine learning, and more. Understanding core services and how they compose together is the foundation for building reliable, scalable cloud architectures.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '类别' : 'Category'}</th>
            <th style={thStyle}>{isZh ? '核心服务' : 'Core Services'}</th>
            <th style={thStyle}>{isZh ? '典型用途' : 'Typical Use Case'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '计算' : 'Compute'}</td>
            <td style={tdStyle}>EC2, Lambda, ECS, EKS</td>
            <td style={tdStyle}>{isZh ? 'Web 服务器、API、批处理、微服务' : 'Web servers, APIs, batch jobs, microservices'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '存储' : 'Storage'}</td>
            <td style={tdStyle}>S3, EBS, EFS, Glacier</td>
            <td style={tdStyle}>{isZh ? '对象存储、块存储、文件系统、归档' : 'Object storage, block storage, file systems, archival'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '数据库' : 'Database'}</td>
            <td style={tdStyle}>RDS, DynamoDB, ElastiCache, Aurora</td>
            <td style={tdStyle}>{isZh ? '关系型、NoSQL、缓存、高性能 OLTP' : 'Relational, NoSQL, caching, high-perf OLTP'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '网络' : 'Networking'}</td>
            <td style={tdStyle}>VPC, Route 53, CloudFront, ELB</td>
            <td style={tdStyle}>{isZh ? '虚拟网络、DNS、CDN、负载均衡' : 'Virtual networks, DNS, CDN, load balancing'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '安全' : 'Security'}</td>
            <td style={tdStyle}>IAM, KMS, WAF, Shield</td>
            <td style={tdStyle}>{isZh ? '身份管理、加密、Web 防火墙、DDoS 防护' : 'Identity, encryption, web firewall, DDoS protection'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '消息/集成' : 'Messaging'}</td>
            <td style={tdStyle}>SQS, SNS, EventBridge, Step Functions</td>
            <td style={tdStyle}>{isZh ? '消息队列、发布订阅、事件驱动、工作流' : 'Message queues, pub/sub, event-driven, workflows'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '监控' : 'Monitoring'}</td>
            <td style={tdStyle}>CloudWatch, X-Ray, CloudTrail</td>
            <td style={tdStyle}>{isZh ? '指标、日志、链路追踪、审计' : 'Metrics, logs, tracing, audit trails'}</td>
          </tr>
        </tbody>
      </table>

      {/* Section 2: EC2 */}
      <h2 style={h2Style}>
        {isZh ? '2. EC2：弹性计算的基石' : '2. EC2: The Foundation of Elastic Compute'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Amazon EC2（Elastic Compute Cloud）提供按需、可调整大小的计算能力。从单台开发服务器到数千台高性能计算节点，EC2 都能满足需求。理解实例类型、定价模型和自动伸缩是控制成本和保证性能的关键。'
          : 'Amazon EC2 (Elastic Compute Cloud) provides on-demand, resizable compute capacity. From a single development server to thousands of HPC nodes, EC2 scales to meet any demand. Understanding instance types, pricing models, and auto-scaling is the key to controlling costs and guaranteeing performance.'}
      </p>

      <h3 style={h3Style}>{isZh ? '实例类型选择' : 'Instance Type Selection'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '系列' : 'Family'}</th>
            <th style={thStyle}>{isZh ? '优化方向' : 'Optimized For'}</th>
            <th style={thStyle}>{isZh ? '典型实例' : 'Example'}</th>
            <th style={thStyle}>{isZh ? '场景' : 'Use Case'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>T3 / T4g</td>
            <td style={tdStyle}>{isZh ? '突发性能' : 'Burstable'}</td>
            <td style={tdStyle}>t3.medium</td>
            <td style={tdStyle}>{isZh ? '开发环境、轻量 Web' : 'Dev/test, light web servers'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>M6i / M7g</td>
            <td style={tdStyle}>{isZh ? '通用均衡' : 'General Purpose'}</td>
            <td style={tdStyle}>m6i.xlarge</td>
            <td style={tdStyle}>{isZh ? '应用服务器、中型数据库' : 'App servers, mid-size databases'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>C6i / C7g</td>
            <td style={tdStyle}>{isZh ? '计算密集' : 'Compute Optimized'}</td>
            <td style={tdStyle}>c6i.2xlarge</td>
            <td style={tdStyle}>{isZh ? '批处理、科学建模、编码转换' : 'Batch processing, modeling, encoding'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>R6i / R7g</td>
            <td style={tdStyle}>{isZh ? '内存密集' : 'Memory Optimized'}</td>
            <td style={tdStyle}>r6i.4xlarge</td>
            <td style={tdStyle}>{isZh ? '内存数据库、实时大数据' : 'In-memory DB, real-time big data'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>P4d / G5</td>
            <td style={tdStyle}>{isZh ? 'GPU 加速' : 'Accelerated (GPU)'}</td>
            <td style={tdStyle}>p4d.24xlarge</td>
            <td style={tdStyle}>{isZh ? 'ML 训练、图形渲染、HPC' : 'ML training, graphics, HPC'}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? 'EC2 定价模型对比' : 'EC2 Pricing Models Compared'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '模型' : 'Model'}</th>
            <th style={thStyle}>{isZh ? '折扣' : 'Discount'}</th>
            <th style={thStyle}>{isZh ? '承诺' : 'Commitment'}</th>
            <th style={thStyle}>{isZh ? '最佳场景' : 'Best For'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>On-Demand</td>
            <td style={tdStyle}>0%</td>
            <td style={tdStyle}>{isZh ? '无' : 'None'}</td>
            <td style={tdStyle}>{isZh ? '不可预测的短期工作负载' : 'Unpredictable, short-term workloads'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Reserved (RI)</td>
            <td style={tdStyle}>{isZh ? '最高 72%' : 'Up to 72%'}</td>
            <td style={tdStyle}>{isZh ? '1 或 3 年' : '1 or 3 year'}</td>
            <td style={tdStyle}>{isZh ? '稳态基线工作负载' : 'Steady-state baseline workloads'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Spot</td>
            <td style={tdStyle}>{isZh ? '最高 90%' : 'Up to 90%'}</td>
            <td style={tdStyle}>{isZh ? '无（可被中断）' : 'None (interruptible)'}</td>
            <td style={tdStyle}>{isZh ? '容错批处理、CI/CD、大数据' : 'Fault-tolerant batch, CI/CD, big data'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Savings Plans</td>
            <td style={tdStyle}>{isZh ? '最高 72%' : 'Up to 72%'}</td>
            <td style={tdStyle}>{isZh ? '1 或 3 年 $/hr 承诺' : '1 or 3 year $/hr commitment'}</td>
            <td style={tdStyle}>{isZh ? '灵活跨实例类型/区域' : 'Flexible across instance types/regions'}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? 'Auto Scaling 配置示例' : 'Auto Scaling Configuration Example'}</h3>
      <pre style={preStyle}><code>{'# EC2 Auto Scaling Group — CloudFormation snippet\n'
        + 'AutoScalingGroup:\n'
        + '  Type: AWS::AutoScaling::AutoScalingGroup\n'
        + '  Properties:\n'
        + '    LaunchTemplate:\n'
        + '      LaunchTemplateId: !Ref MyLaunchTemplate\n'
        + '      Version: !GetAtt MyLaunchTemplate.LatestVersionNumber\n'
        + '    MinSize: 2\n'
        + '    MaxSize: 10\n'
        + '    DesiredCapacity: 2\n'
        + '    VPCZoneIdentifier:\n'
        + '      - !Ref PrivateSubnet1\n'
        + '      - !Ref PrivateSubnet2\n'
        + '    TargetGroupARNs:\n'
        + '      - !Ref MyTargetGroup\n'
        + '    HealthCheckType: ELB\n'
        + '    HealthCheckGracePeriod: 300\n'
        + '\n'
        + 'ScalingPolicy:\n'
        + '  Type: AWS::AutoScaling::ScalingPolicy\n'
        + '  Properties:\n'
        + '    AutoScalingGroupName: !Ref AutoScalingGroup\n'
        + '    PolicyType: TargetTrackingScaling\n'
        + '    TargetTrackingConfiguration:\n'
        + '      PredefinedMetricSpecification:\n'
        + '        PredefinedMetricType: ASGAverageCPUUtilization\n'
        + '      TargetValue: 60.0'}</code></pre>

      {/* Section 3: S3 */}
      <h2 style={h2Style}>
        {isZh ? '3. S3：无限扩展的对象存储' : '3. S3: Infinitely Scalable Object Storage'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Amazon S3（Simple Storage Service）提供行业领先的持久性（99.999999999%）、可用性和安全性。S3 存储桶可存储从字节到 5TB 的任意数量对象，广泛用于静态网站托管、数据湖、备份和媒体分发。'
          : 'Amazon S3 (Simple Storage Service) delivers industry-leading durability (99.999999999%), availability, and security. S3 buckets store any number of objects from bytes to 5TB, widely used for static website hosting, data lakes, backups, and media distribution.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'S3 存储类别与成本' : 'S3 Storage Classes & Cost'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '存储类别' : 'Storage Class'}</th>
            <th style={thStyle}>{isZh ? '延迟' : 'Latency'}</th>
            <th style={thStyle}>{isZh ? '最低存储时长' : 'Min Duration'}</th>
            <th style={thStyle}>{isZh ? '用途' : 'Use Case'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>S3 Standard</td>
            <td style={tdStyle}>{isZh ? '毫秒级' : 'Milliseconds'}</td>
            <td style={tdStyle}>{isZh ? '无' : 'None'}</td>
            <td style={tdStyle}>{isZh ? '频繁访问数据' : 'Frequently accessed data'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>S3 Intelligent-Tiering</td>
            <td style={tdStyle}>{isZh ? '毫秒级' : 'Milliseconds'}</td>
            <td style={tdStyle}>{isZh ? '无' : 'None'}</td>
            <td style={tdStyle}>{isZh ? '访问模式不确定' : 'Unknown/changing access patterns'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>S3 Standard-IA</td>
            <td style={tdStyle}>{isZh ? '毫秒级' : 'Milliseconds'}</td>
            <td style={tdStyle}>30 {isZh ? '天' : 'days'}</td>
            <td style={tdStyle}>{isZh ? '不频繁但需快速访问' : 'Infrequent but rapid access needed'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>S3 Glacier Instant</td>
            <td style={tdStyle}>{isZh ? '毫秒级' : 'Milliseconds'}</td>
            <td style={tdStyle}>90 {isZh ? '天' : 'days'}</td>
            <td style={tdStyle}>{isZh ? '季度访问归档' : 'Quarterly access archives'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>S3 Glacier Deep Archive</td>
            <td style={tdStyle}>12-48h</td>
            <td style={tdStyle}>180 {isZh ? '天' : 'days'}</td>
            <td style={tdStyle}>{isZh ? '合规长期归档' : 'Compliance long-term archival'}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? 'S3 生命周期策略示例' : 'S3 Lifecycle Policy Example'}</h3>
      <pre style={preStyle}><code>{'# AWS CLI — S3 lifecycle configuration\n'
        + 'aws s3api put-bucket-lifecycle-configuration \\\n'
        + '  --bucket my-data-lake \\\n'
        + '  --lifecycle-configuration \'{\n'
        + '    "Rules": [\n'
        + '      {\n'
        + '        "ID": "ArchiveOldLogs",\n'
        + '        "Status": "Enabled",\n'
        + '        "Filter": { "Prefix": "logs/" },\n'
        + '        "Transitions": [\n'
        + '          { "Days": 30,  "StorageClass": "STANDARD_IA" },\n'
        + '          { "Days": 90,  "StorageClass": "GLACIER" },\n'
        + '          { "Days": 365, "StorageClass": "DEEP_ARCHIVE" }\n'
        + '        ],\n'
        + '        "Expiration": { "Days": 2555 }\n'
        + '      }\n'
        + '    ]\n'
        + '  }\''}</code></pre>

      {/* Section 4: RDS & DynamoDB */}
      <h2 style={h2Style}>
        {isZh ? '4. RDS 与 DynamoDB：关系型 vs NoSQL' : '4. RDS vs DynamoDB: Relational vs NoSQL'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '数据库选择是架构决策中最重要的一环。AWS 提供全托管关系型数据库（RDS/Aurora）和 NoSQL 数据库（DynamoDB），各有其最佳应用场景。'
          : 'Database selection is one of the most critical architecture decisions. AWS offers fully managed relational databases (RDS/Aurora) and NoSQL databases (DynamoDB), each with distinct strengths.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'RDS / Aurora 概览' : 'RDS / Aurora Overview'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Amazon RDS 支持 MySQL、PostgreSQL、MariaDB、Oracle 和 SQL Server。Aurora 是 AWS 自研的 MySQL/PostgreSQL 兼容引擎，性能是标准 MySQL 的 5 倍、PostgreSQL 的 3 倍，存储自动扩展至 128TB。'
          : 'Amazon RDS supports MySQL, PostgreSQL, MariaDB, Oracle, and SQL Server. Aurora is AWS\'s custom MySQL/PostgreSQL-compatible engine delivering 5x MySQL and 3x PostgreSQL performance, with storage auto-scaling to 128TB.'}
      </p>
      <pre style={preStyle}><code>{'# Create a Multi-AZ PostgreSQL RDS instance\n'
        + 'aws rds create-db-instance \\\n'
        + '  --db-instance-identifier myapp-db \\\n'
        + '  --db-instance-class db.r6g.xlarge \\\n'
        + '  --engine postgres \\\n'
        + '  --engine-version 15.4 \\\n'
        + '  --master-username admin \\\n'
        + '  --master-user-password "\\${SECURE_PASSWORD}" \\\n'
        + '  --allocated-storage 100 \\\n'
        + '  --storage-type gp3 \\\n'
        + '  --multi-az \\\n'
        + '  --vpc-security-group-ids sg-0abc1234 \\\n'
        + '  --db-subnet-group-name myapp-db-subnets \\\n'
        + '  --backup-retention-period 7 \\\n'
        + '  --storage-encrypted'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'DynamoDB 关键概念' : 'DynamoDB Key Concepts'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'DynamoDB 是完全无服务器的键值和文档数据库，提供个位数毫秒响应。核心概念包括分区键（Partition Key）、排序键（Sort Key）、全局二级索引（GSI）和本地二级索引（LSI）。容量模式分为按需（On-Demand）和预配置（Provisioned）。'
          : 'DynamoDB is a fully serverless key-value and document database delivering single-digit millisecond responses. Core concepts include Partition Key, Sort Key, Global Secondary Indexes (GSI), and Local Secondary Indexes (LSI). Capacity modes are On-Demand and Provisioned.'}
      </p>
      <pre style={preStyle}><code>{'# DynamoDB table with GSI — CloudFormation\n'
        + 'OrdersTable:\n'
        + '  Type: AWS::DynamoDB::Table\n'
        + '  Properties:\n'
        + '    TableName: Orders\n'
        + '    BillingMode: PAY_PER_REQUEST    # On-Demand\n'
        + '    AttributeDefinitions:\n'
        + '      - AttributeName: PK\n'
        + '        AttributeType: S\n'
        + '      - AttributeName: SK\n'
        + '        AttributeType: S\n'
        + '      - AttributeName: GSI1PK\n'
        + '        AttributeType: S\n'
        + '    KeySchema:\n'
        + '      - AttributeName: PK\n'
        + '        KeyType: HASH\n'
        + '      - AttributeName: SK\n'
        + '        KeyType: RANGE\n'
        + '    GlobalSecondaryIndexes:\n'
        + '      - IndexName: GSI1\n'
        + '        KeySchema:\n'
        + '          - AttributeName: GSI1PK\n'
        + '            KeyType: HASH\n'
        + '          - AttributeName: SK\n'
        + '            KeyType: RANGE\n'
        + '        Projection:\n'
        + '          ProjectionType: ALL\n'
        + '    PointInTimeRecoverySpecification:\n'
        + '      PointInTimeRecoveryEnabled: true'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'RDS vs DynamoDB 决策矩阵' : 'RDS vs DynamoDB Decision Matrix'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '维度' : 'Dimension'}</th>
            <th style={thStyle}>RDS / Aurora</th>
            <th style={thStyle}>DynamoDB</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '数据模型' : 'Data Model'}</td>
            <td style={tdStyle}>{isZh ? '关系型 / SQL' : 'Relational / SQL'}</td>
            <td style={tdStyle}>{isZh ? '键值 / 文档' : 'Key-Value / Document'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '延迟' : 'Latency'}</td>
            <td style={tdStyle}>{isZh ? '低毫秒级（依查询复杂度）' : 'Low ms (query dependent)'}</td>
            <td style={tdStyle}>{isZh ? '个位数毫秒（一致）' : 'Single-digit ms (consistent)'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '扩展方式' : 'Scaling'}</td>
            <td style={tdStyle}>{isZh ? '纵向（读扩展用只读副本）' : 'Vertical (read replicas for reads)'}</td>
            <td style={tdStyle}>{isZh ? '自动水平扩展' : 'Automatic horizontal scaling'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '事务' : 'Transactions'}</td>
            <td style={tdStyle}>{isZh ? '完整 ACID' : 'Full ACID'}</td>
            <td style={tdStyle}>{isZh ? '有限事务（25项/4MB）' : 'Limited (25 items / 4MB)'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '运维' : 'Operations'}</td>
            <td style={tdStyle}>{isZh ? '需选择实例、维护窗口' : 'Instance sizing, maintenance windows'}</td>
            <td style={tdStyle}>{isZh ? '完全无服务器' : 'Fully serverless'}</td>
          </tr>
        </tbody>
      </table>

      {/* Section 5: Lambda */}
      <h2 style={h2Style}>
        {isZh ? '5. Lambda：事件驱动无服务器计算' : '5. Lambda: Event-Driven Serverless Compute'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'AWS Lambda 让你无需管理服务器即可运行代码。上传代码，Lambda 自动分配计算资源、执行并伸缩。你只为实际使用的计算时间付费（按毫秒计费），空闲时零成本。'
          : 'AWS Lambda runs your code without provisioning or managing servers. Upload your code, and Lambda handles compute allocation, execution, and scaling. You pay only for actual compute time (billed per millisecond) with zero cost when idle.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Lambda 函数最佳实践' : 'Lambda Function Best Practices'}</h3>
      <pre style={preStyle}><code>{'# Python Lambda with best practices\n'
        + 'import json\n'
        + 'import boto3\n'
        + 'import os\n'
        + 'from aws_lambda_powertools import Logger, Tracer, Metrics\n'
        + 'from aws_lambda_powertools.utilities.typing import LambdaContext\n'
        + '\n'
        + '# Initialize outside handler (reused across invocations)\n'
        + 'logger = Logger()\n'
        + 'tracer = Tracer()\n'
        + 'metrics = Metrics()\n'
        + 'dynamodb = boto3.resource("dynamodb")\n'
        + 'table = dynamodb.Table(os.environ["TABLE_NAME"])\n'
        + '\n'
        + '@logger.inject_lambda_context\n'
        + '@tracer.capture_lambda_handler\n'
        + '@metrics.log_metrics(capture_cold_start_metric=True)\n'
        + 'def handler(event, context: LambdaContext):\n'
        + '    """Process API Gateway request."""\n'
        + '    try:\n'
        + '        body = json.loads(event["body"])\n'
        + '        order_id = body["order_id"]\n'
        + '\n'
        + '        # Single-table design query\n'
        + '        response = table.get_item(\n'
        + '            Key={"PK": f"ORDER#{order_id}", "SK": "METADATA"}\n'
        + '        )\n'
        + '\n'
        + '        if "Item" not in response:\n'
        + '            return {"statusCode": 404, "body": "Not found"}\n'
        + '\n'
        + '        metrics.add_metric(name="OrderLookup", unit="Count", value=1)\n'
        + '        return {\n'
        + '            "statusCode": 200,\n'
        + '            "headers": {"Content-Type": "application/json"},\n'
        + '            "body": json.dumps(response["Item"], default=str)\n'
        + '        }\n'
        + '    except Exception as e:\n'
        + '        logger.exception("Failed to process request")\n'
        + '        return {"statusCode": 500, "body": "Internal error"}'}</code></pre>

      <p style={pStyle}>
        {isZh
          ? 'Lambda 关键限制：最大执行时间 15 分钟、部署包 250MB（解压后）、内存 128MB-10GB、并发默认 1000（可请求提升）。冷启动延迟取决于运行时和包大小——使用 Provisioned Concurrency 或 SnapStart（Java）来消除冷启动。'
          : 'Lambda key limits: 15-minute max execution, 250MB deployment package (unzipped), 128MB-10GB memory, 1000 default concurrency (increase on request). Cold start latency depends on runtime and package size — use Provisioned Concurrency or SnapStart (Java) to eliminate cold starts.'}
      </p>

      {/* Section 6: ECS/EKS */}
      <h2 style={h2Style}>
        {isZh ? '6. ECS 与 EKS：容器编排' : '6. ECS & EKS: Container Orchestration'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '当工作负载超出 Lambda 的限制（长时间运行、大内存、自定义运行时），容器是下一个选择。AWS 提供两种编排服务：ECS（AWS 原生）和 EKS（托管 Kubernetes）。两者都支持 Fargate 无服务器启动模式。'
          : 'When workloads outgrow Lambda limits (long-running, large memory, custom runtimes), containers are the next step. AWS offers two orchestrators: ECS (AWS-native) and EKS (managed Kubernetes). Both support Fargate serverless launch type.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'ECS vs EKS 对比' : 'ECS vs EKS Comparison'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '维度' : 'Dimension'}</th>
            <th style={thStyle}>ECS</th>
            <th style={thStyle}>EKS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '学习曲线' : 'Learning Curve'}</td>
            <td style={tdStyle}>{isZh ? '低——AWS 概念' : 'Low — AWS-native concepts'}</td>
            <td style={tdStyle}>{isZh ? '高——需 K8s 知识' : 'High — requires K8s knowledge'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '多云兼容' : 'Multi-Cloud'}</td>
            <td style={tdStyle}>{isZh ? '仅 AWS' : 'AWS only'}</td>
            <td style={tdStyle}>{isZh ? '是（标准 K8s）' : 'Yes (standard K8s)'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '控制平面费用' : 'Control Plane Cost'}</td>
            <td style={tdStyle}>{isZh ? '免费' : 'Free'}</td>
            <td style={tdStyle}>~$73/{isZh ? '月' : 'month'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '生态系统' : 'Ecosystem'}</td>
            <td style={tdStyle}>{isZh ? 'AWS 服务集成深度' : 'Deep AWS integration'}</td>
            <td style={tdStyle}>{isZh ? 'CNCF / Helm / Istio 等' : 'CNCF / Helm / Istio ecosystem'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Fargate</td>
            <td style={tdStyle}>{isZh ? '完全支持' : 'Fully supported'}</td>
            <td style={tdStyle}>{isZh ? '支持（部分限制）' : 'Supported (some limitations)'}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? 'ECS Fargate 任务定义' : 'ECS Fargate Task Definition'}</h3>
      <pre style={preStyle}><code>{'# ECS Fargate Task Definition — CloudFormation\n'
        + 'TaskDefinition:\n'
        + '  Type: AWS::ECS::TaskDefinition\n'
        + '  Properties:\n'
        + '    Family: myapp-api\n'
        + '    Cpu: "512"\n'
        + '    Memory: "1024"\n'
        + '    NetworkMode: awsvpc\n'
        + '    RequiresCompatibilities: [FARGATE]\n'
        + '    ExecutionRoleArn: !GetAtt ECSExecutionRole.Arn\n'
        + '    TaskRoleArn: !GetAtt ECSTaskRole.Arn\n'
        + '    ContainerDefinitions:\n'
        + '      - Name: api\n'
        + '        Image: !Sub "\\${AWS::AccountId}.dkr.ecr.\\${AWS::Region}.amazonaws.com/myapp:latest"\n'
        + '        PortMappings:\n'
        + '          - ContainerPort: 8080\n'
        + '        LogConfiguration:\n'
        + '          LogDriver: awslogs\n'
        + '          Options:\n'
        + '            awslogs-group: /ecs/myapp-api\n'
        + '            awslogs-region: !Ref AWS::Region\n'
        + '            awslogs-stream-prefix: ecs\n'
        + '        Environment:\n'
        + '          - Name: NODE_ENV\n'
        + '            Value: production\n'
        + '        Secrets:\n'
        + '          - Name: DB_PASSWORD\n'
        + '            ValueFrom: !Ref DbPasswordSecret'}</code></pre>

      {/* Section 7: CloudFront & Route 53 */}
      <h2 style={h2Style}>
        {isZh ? '7. CloudFront 与 Route 53：全球内容分发与 DNS' : '7. CloudFront & Route 53: Global CDN & DNS'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'CloudFront 是 AWS 的 CDN 服务，在全球 400+ 边缘站点缓存内容，将延迟降至个位数毫秒。Route 53 是高可用的 DNS 服务，提供域名注册、DNS 路由和健康检查三合一功能。'
          : 'CloudFront is AWS\'s CDN with 400+ edge locations worldwide, caching content to reduce latency to single-digit milliseconds. Route 53 is a highly available DNS service combining domain registration, DNS routing, and health checking.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Route 53 路由策略' : 'Route 53 Routing Policies'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '策略' : 'Policy'}</th>
            <th style={thStyle}>{isZh ? '说明' : 'Description'}</th>
            <th style={thStyle}>{isZh ? '场景' : 'Use Case'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Simple</td>
            <td style={tdStyle}>{isZh ? '单一资源标准路由' : 'Standard routing to single resource'}</td>
            <td style={tdStyle}>{isZh ? '单一端点' : 'Single endpoint'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Weighted</td>
            <td style={tdStyle}>{isZh ? '按权重分配流量' : 'Distribute traffic by weight'}</td>
            <td style={tdStyle}>{isZh ? '蓝绿/金丝雀部署' : 'Blue-green / canary deploys'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Latency-based</td>
            <td style={tdStyle}>{isZh ? '路由到最低延迟区域' : 'Route to lowest-latency region'}</td>
            <td style={tdStyle}>{isZh ? '多区域应用' : 'Multi-region applications'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Failover</td>
            <td style={tdStyle}>{isZh ? '健康检查自动故障转移' : 'Auto-failover on health check failure'}</td>
            <td style={tdStyle}>{isZh ? '主备灾备' : 'Active-passive DR'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Geolocation</td>
            <td style={tdStyle}>{isZh ? '按用户地理位置路由' : 'Route by user geographic location'}</td>
            <td style={tdStyle}>{isZh ? '合规与内容本地化' : 'Compliance & content localization'}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? 'CloudFront 分发配置' : 'CloudFront Distribution Setup'}</h3>
      <pre style={preStyle}><code>{'# CloudFront with S3 origin — CloudFormation\n'
        + 'CloudFrontDistribution:\n'
        + '  Type: AWS::CloudFront::Distribution\n'
        + '  Properties:\n'
        + '    DistributionConfig:\n'
        + '      Origins:\n'
        + '        - Id: S3Origin\n'
        + '          DomainName: !GetAtt MyBucket.RegionalDomainName\n'
        + '          S3OriginConfig:\n'
        + '            OriginAccessIdentity: ""\n'
        + '          OriginAccessControlId: !Ref OAC\n'
        + '      DefaultCacheBehavior:\n'
        + '        TargetOriginId: S3Origin\n'
        + '        ViewerProtocolPolicy: redirect-to-https\n'
        + '        CachePolicyId: 658327ea-f89d-4fab-a63d-7e88639e58f6  # CachingOptimized\n'
        + '        Compress: true\n'
        + '      ViewerCertificate:\n'
        + '        AcmCertificateArn: !Ref Certificate\n'
        + '        SslSupportMethod: sni-only\n'
        + '        MinimumProtocolVersion: TLSv1.2_2021\n'
        + '      Enabled: true\n'
        + '      HttpVersion: http2and3\n'
        + '      PriceClass: PriceClass_100'}</code></pre>

      {/* Section 8: IAM */}
      <h2 style={h2Style}>
        {isZh ? '8. IAM：身份与访问管理' : '8. IAM: Identity & Access Management'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'IAM 是 AWS 安全的基础。它控制谁（身份）可以对哪些资源执行什么操作。IAM 策略是 JSON 文档，定义 Effect（Allow/Deny）、Action、Resource 和可选 Condition。遵循最小权限原则是安全运营的第一要务。'
          : 'IAM is the foundation of AWS security. It controls who (identity) can perform what actions on which resources. IAM policies are JSON documents defining Effect (Allow/Deny), Action, Resource, and optional Condition. Following the principle of least privilege is the top security priority.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'IAM 最佳实践清单' : 'IAM Best Practices Checklist'}</h3>
      <p style={pStyle}>
        {isZh
          ? '1) 为 root 账户启用 MFA 并锁定——日常不使用。2) 为每个人/服务创建独立 IAM 用户或角色。3) 使用 IAM 角色（而非 Access Key）为 EC2/Lambda 授权。4) 策略附加到组而非用户。5) 使用 AWS Organizations + SCP 实现跨账户治理。6) 定期使用 IAM Access Analyzer 审计权限。7) 使用 aws-vault 或 SSO 管理本地凭据。'
          : '1) Enable MFA on root and lock it down — never use for daily tasks. 2) Create individual IAM users or roles for every person/service. 3) Use IAM roles (not access keys) for EC2/Lambda. 4) Attach policies to groups, not individual users. 5) Use AWS Organizations + SCPs for cross-account governance. 6) Audit with IAM Access Analyzer regularly. 7) Use aws-vault or SSO for local credential management.'}
      </p>

      <pre style={preStyle}><code>{'# Least-privilege IAM policy example\n'
        + '{\n'
        + '  "Version": "2012-10-17",\n'
        + '  "Statement": [\n'
        + '    {\n'
        + '      "Sid": "AllowS3ReadOnly",\n'
        + '      "Effect": "Allow",\n'
        + '      "Action": [\n'
        + '        "s3:GetObject",\n'
        + '        "s3:ListBucket"\n'
        + '      ],\n'
        + '      "Resource": [\n'
        + '        "arn:aws:s3:::my-app-data",\n'
        + '        "arn:aws:s3:::my-app-data/*"\n'
        + '      ]\n'
        + '    },\n'
        + '    {\n'
        + '      "Sid": "AllowDynamoDBCRUD",\n'
        + '      "Effect": "Allow",\n'
        + '      "Action": [\n'
        + '        "dynamodb:GetItem",\n'
        + '        "dynamodb:PutItem",\n'
        + '        "dynamodb:UpdateItem",\n'
        + '        "dynamodb:DeleteItem",\n'
        + '        "dynamodb:Query"\n'
        + '      ],\n'
        + '      "Resource": "arn:aws:dynamodb:us-east-1:123456789012:table/Orders",\n'
        + '      "Condition": {\n'
        + '        "ForAllValues:StringEquals": {\n'
        + '          "dynamodb:LeadingKeys": ["\\${aws:PrincipalTag/tenant_id}"]\n'
        + '        }\n'
        + '      }\n'
        + '    }\n'
        + '  ]\n'
        + '}'}</code></pre>

      {/* Section 9: VPC */}
      <h2 style={h2Style}>
        {isZh ? '9. VPC：网络隔离与架构' : '9. VPC: Network Isolation & Architecture'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'VPC（Virtual Private Cloud）是 AWS 中的隔离虚拟网络。一个生产级 VPC 通常包含多个可用区中的公有子网和私有子网、Internet 网关、NAT 网关、安全组和网络 ACL。正确的 VPC 设计是安全和可用性的基础。'
          : 'A VPC (Virtual Private Cloud) is an isolated virtual network within AWS. A production-grade VPC typically spans multiple Availability Zones with public and private subnets, Internet Gateway, NAT Gateway, Security Groups, and Network ACLs. Proper VPC design is the foundation for security and availability.'}
      </p>

      <h3 style={h3Style}>{isZh ? '安全组 vs 网络 ACL' : 'Security Groups vs Network ACLs'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
            <th style={thStyle}>{isZh ? '安全组' : 'Security Group'}</th>
            <th style={thStyle}>{isZh ? '网络 ACL' : 'Network ACL'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '作用层级' : 'Level'}</td>
            <td style={tdStyle}>{isZh ? '实例/ENI 级别' : 'Instance / ENI level'}</td>
            <td style={tdStyle}>{isZh ? '子网级别' : 'Subnet level'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '状态' : 'Statefulness'}</td>
            <td style={tdStyle}>{isZh ? '有状态' : 'Stateful'}</td>
            <td style={tdStyle}>{isZh ? '无状态' : 'Stateless'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '规则类型' : 'Rules'}</td>
            <td style={tdStyle}>{isZh ? '仅允许规则' : 'Allow rules only'}</td>
            <td style={tdStyle}>{isZh ? '允许 + 拒绝规则' : 'Allow + Deny rules'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '评估方式' : 'Evaluation'}</td>
            <td style={tdStyle}>{isZh ? '所有规则一起评估' : 'All rules evaluated together'}</td>
            <td style={tdStyle}>{isZh ? '按编号顺序匹配' : 'Rules processed in number order'}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? '生产级 VPC 架构' : 'Production VPC Architecture'}</h3>
      <pre style={preStyle}><code>{'# Three-tier VPC architecture — Terraform\n'
        + 'module "vpc" {\n'
        + '  source  = "terraform-aws-modules/vpc/aws"\n'
        + '  version = "5.5.0"\n'
        + '\n'
        + '  name = "production-vpc"\n'
        + '  cidr = "10.0.0.0/16"\n'
        + '\n'
        + '  azs              = ["us-east-1a", "us-east-1b", "us-east-1c"]\n'
        + '  public_subnets   = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]\n'
        + '  private_subnets  = ["10.0.11.0/24", "10.0.12.0/24", "10.0.13.0/24"]\n'
        + '  database_subnets = ["10.0.21.0/24", "10.0.22.0/24", "10.0.23.0/24"]\n'
        + '\n'
        + '  enable_nat_gateway     = true\n'
        + '  single_nat_gateway     = false  # One per AZ for HA\n'
        + '  one_nat_gateway_per_az = true\n'
        + '\n'
        + '  enable_dns_hostnames = true\n'
        + '  enable_dns_support   = true\n'
        + '\n'
        + '  # VPC Flow Logs\n'
        + '  enable_flow_log                      = true\n'
        + '  create_flow_log_cloudwatch_log_group = true\n'
        + '  create_flow_log_iam_role             = true\n'
        + '\n'
        + '  tags = {\n'
        + '    Environment = "production"\n'
        + '    Terraform   = "true"\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Section 10: SQS & SNS */}
      <h2 style={h2Style}>
        {isZh ? '10. SQS 与 SNS：异步消息与通知' : '10. SQS & SNS: Async Messaging & Notifications'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '微服务架构的关键原则是松耦合。SQS（消息队列）和 SNS（发布/订阅）是 AWS 中实现异步通信的两大核心服务。它们经常配合使用：SNS 扇出到多个 SQS 队列，实现并行处理。'
          : 'Loose coupling is a key principle in microservices. SQS (message queue) and SNS (publish/subscribe) are the two core AWS services for asynchronous communication. They are often used together: SNS fans out to multiple SQS queues for parallel processing.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'SQS 标准队列 vs FIFO 队列' : 'SQS Standard vs FIFO Queues'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
            <th style={thStyle}>Standard</th>
            <th style={thStyle}>FIFO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '吞吐量' : 'Throughput'}</td>
            <td style={tdStyle}>{isZh ? '无限制' : 'Unlimited'}</td>
            <td style={tdStyle}>{isZh ? '300 TPS（批量 3000）' : '300 TPS (3000 w/ batching)'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '顺序保证' : 'Ordering'}</td>
            <td style={tdStyle}>{isZh ? '尽力而为' : 'Best-effort'}</td>
            <td style={tdStyle}>{isZh ? '严格顺序' : 'Strict FIFO'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '去重' : 'Deduplication'}</td>
            <td style={tdStyle}>{isZh ? '至少一次' : 'At-least-once'}</td>
            <td style={tdStyle}>{isZh ? '精确一次' : 'Exactly-once'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '适用场景' : 'Use Case'}</td>
            <td style={tdStyle}>{isZh ? '高吞吐工作负载' : 'High-throughput workloads'}</td>
            <td style={tdStyle}>{isZh ? '订单处理、金融交易' : 'Order processing, financial transactions'}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? 'SNS + SQS 扇出模式' : 'SNS + SQS Fan-Out Pattern'}</h3>
      <pre style={preStyle}><code>{'# SNS topic fans out to multiple SQS queues\n'
        + '# — CloudFormation snippet\n'
        + 'OrderTopic:\n'
        + '  Type: AWS::SNS::Topic\n'
        + '  Properties:\n'
        + '    TopicName: order-events\n'
        + '\n'
        + 'PaymentQueue:\n'
        + '  Type: AWS::SQS::Queue\n'
        + '  Properties:\n'
        + '    QueueName: payment-processing\n'
        + '    VisibilityTimeout: 300\n'
        + '    RedrivePolicy:\n'
        + '      deadLetterTargetArn: !GetAtt PaymentDLQ.Arn\n'
        + '      maxReceiveCount: 3\n'
        + '\n'
        + 'InventoryQueue:\n'
        + '  Type: AWS::SQS::Queue\n'
        + '  Properties:\n'
        + '    QueueName: inventory-update\n'
        + '    VisibilityTimeout: 300\n'
        + '\n'
        + 'NotificationQueue:\n'
        + '  Type: AWS::SQS::Queue\n'
        + '  Properties:\n'
        + '    QueueName: customer-notification\n'
        + '\n'
        + '# Subscribe all queues to the topic\n'
        + 'PaymentSub:\n'
        + '  Type: AWS::SNS::Subscription\n'
        + '  Properties:\n'
        + '    TopicArn: !Ref OrderTopic\n'
        + '    Protocol: sqs\n'
        + '    Endpoint: !GetAtt PaymentQueue.Arn\n'
        + '    FilterPolicy:\n'
        + '      event_type: [order_placed, order_updated]'}</code></pre>

      {/* Section 11: CloudWatch */}
      <h2 style={h2Style}>
        {isZh ? '11. CloudWatch：全栈可观测性' : '11. CloudWatch: Full-Stack Observability'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'CloudWatch 提供指标、日志、告警和仪表盘，是 AWS 的统一可观测性平台。结合 X-Ray 进行分布式链路追踪，CloudTrail 进行 API 操作审计，构成完整的可观测性三件套。'
          : 'CloudWatch provides metrics, logs, alarms, and dashboards as AWS\'s unified observability platform. Combined with X-Ray for distributed tracing and CloudTrail for API audit trails, they form the complete observability trinity.'}
      </p>

      <h3 style={h3Style}>{isZh ? '自定义指标与告警' : 'Custom Metrics & Alarms'}</h3>
      <pre style={preStyle}><code>{'# Python — publish custom CloudWatch metric\n'
        + 'import boto3\n'
        + 'from datetime import datetime\n'
        + '\n'
        + 'cloudwatch = boto3.client("cloudwatch")\n'
        + '\n'
        + 'def publish_order_metric(order_total: float, region: str):\n'
        + '    cloudwatch.put_metric_data(\n'
        + '        Namespace="MyApp/Orders",\n'
        + '        MetricData=[\n'
        + '            {\n'
        + '                "MetricName": "OrderValue",\n'
        + '                "Dimensions": [\n'
        + '                    {"Name": "Region", "Value": region},\n'
        + '                ],\n'
        + '                "Timestamp": datetime.utcnow(),\n'
        + '                "Value": order_total,\n'
        + '                "Unit": "None",\n'
        + '                "StorageResolution": 60   # standard (1-min)\n'
        + '            }\n'
        + '        ]\n'
        + '    )'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'CloudWatch Alarm 配置' : 'CloudWatch Alarm Configuration'}</h3>
      <pre style={preStyle}><code>{'# CloudWatch Alarm — CloudFormation\n'
        + 'HighCPUAlarm:\n'
        + '  Type: AWS::CloudWatch::Alarm\n'
        + '  Properties:\n'
        + '    AlarmName: high-cpu-api-cluster\n'
        + '    AlarmDescription: "CPU > 80% for 5 minutes"\n'
        + '    Namespace: AWS/ECS\n'
        + '    MetricName: CPUUtilization\n'
        + '    Dimensions:\n'
        + '      - Name: ClusterName\n'
        + '        Value: !Ref ECSCluster\n'
        + '      - Name: ServiceName\n'
        + '        Value: !GetAtt ECSService.Name\n'
        + '    Statistic: Average\n'
        + '    Period: 300\n'
        + '    EvaluationPeriods: 1\n'
        + '    Threshold: 80\n'
        + '    ComparisonOperator: GreaterThanThreshold\n'
        + '    AlarmActions:\n'
        + '      - !Ref OpsNotificationTopic\n'
        + '    OKActions:\n'
        + '      - !Ref OpsNotificationTopic'}</code></pre>

      <p style={pStyle}>
        {isZh
          ? 'CloudWatch Logs Insights 提供类 SQL 查询语言，可在海量日志中快速定位问题。示例查询：'
          : 'CloudWatch Logs Insights provides a SQL-like query language for rapidly searching massive log volumes. Example query:'}
      </p>
      <pre style={preStyle}><code>{'# Find top 10 slowest API requests in the last hour\n'
        + 'fields @timestamp, @message\n'
        + '| filter @message like /duration/\n'
        + '| parse @message "duration=* ms" as duration_ms\n'
        + '| sort duration_ms desc\n'
        + '| limit 10'}</code></pre>

      {/* Section 12: Cost Optimization */}
      <h2 style={h2Style}>
        {isZh ? '12. 成本优化：从账单中削减 40-60%' : '12. Cost Optimization: Cutting 40-60% Off Your Bill'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '成本优化不是一次性工作——它是持续的运营实践。AWS 提供多种工具和策略来帮助你在不牺牲性能的情况下大幅降低支出。以下是经过验证的成本优化策略清单。'
          : 'Cost optimization is not a one-time activity — it is an ongoing operational practice. AWS provides multiple tools and strategies to help dramatically reduce spending without sacrificing performance. Here is a proven cost optimization playbook.'}
      </p>

      <h3 style={h3Style}>{isZh ? '计算成本优化' : 'Compute Cost Optimization'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '策略' : 'Strategy'}</th>
            <th style={thStyle}>{isZh ? '潜在节省' : 'Potential Savings'}</th>
            <th style={thStyle}>{isZh ? '实施复杂度' : 'Implementation Effort'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '实例右调（Right-sizing）' : 'Right-sizing instances'}</td>
            <td style={tdStyle}>10-30%</td>
            <td style={tdStyle}>{isZh ? '低' : 'Low'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Savings Plans</td>
            <td style={tdStyle}>{isZh ? '最高 72%' : 'Up to 72%'}</td>
            <td style={tdStyle}>{isZh ? '低' : 'Low'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Spot Instances</td>
            <td style={tdStyle}>{isZh ? '最高 90%' : 'Up to 90%'}</td>
            <td style={tdStyle}>{isZh ? '中' : 'Medium'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>Graviton (ARM)</td>
            <td style={tdStyle}>20-40%</td>
            <td style={tdStyle}>{isZh ? '低-中' : 'Low-Medium'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '自动伸缩' : 'Auto Scaling'}</td>
            <td style={tdStyle}>20-50%</td>
            <td style={tdStyle}>{isZh ? '中' : 'Medium'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '迁移到 Lambda/Fargate' : 'Migrate to Lambda/Fargate'}</td>
            <td style={tdStyle}>30-70%</td>
            <td style={tdStyle}>{isZh ? '高' : 'High'}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? '存储与数据传输优化' : 'Storage & Data Transfer Optimization'}</h3>
      <p style={pStyle}>
        {isZh
          ? '存储优化策略：1) 使用 S3 Intelligent-Tiering 自动迁移访问模式不确定的数据。2) 启用 S3 生命周期策略将旧数据迁移到 Glacier。3) 使用 gp3 替代 gp2 EBS 卷（同等性能，节省 20%）。4) 定期清理未挂载的 EBS 卷和过期快照。5) 使用 CloudFront 减少数据传输费用——边缘传输比从 S3/EC2 直接传输便宜得多。'
          : 'Storage optimization strategies: 1) Use S3 Intelligent-Tiering for data with unknown access patterns. 2) Enable S3 lifecycle policies to transition old data to Glacier. 3) Use gp3 instead of gp2 EBS volumes (same performance, 20% cheaper). 4) Regularly clean up unattached EBS volumes and expired snapshots. 5) Use CloudFront to reduce data transfer costs — edge transfer is much cheaper than direct S3/EC2 transfer.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'AWS 成本管理工具' : 'AWS Cost Management Tools'}</h3>
      <pre style={preStyle}><code>{'# Set up a monthly budget alert with AWS CLI\n'
        + 'aws budgets create-budget \\\n'
        + '  --account-id 123456789012 \\\n'
        + '  --budget \'{\n'
        + '    "BudgetName": "MonthlySpend",\n'
        + '    "BudgetLimit": {\n'
        + '      "Amount": "1000",\n'
        + '      "Unit": "USD"\n'
        + '    },\n'
        + '    "BudgetType": "COST",\n'
        + '    "TimeUnit": "MONTHLY"\n'
        + '  }\' \\\n'
        + '  --notifications-with-subscribers \'[\n'
        + '    {\n'
        + '      "Notification": {\n'
        + '        "NotificationType": "ACTUAL",\n'
        + '        "ComparisonOperator": "GREATER_THAN",\n'
        + '        "Threshold": 80,\n'
        + '        "ThresholdType": "PERCENTAGE"\n'
        + '      },\n'
        + '      "Subscribers": [\n'
        + '        {\n'
        + '          "SubscriptionType": "EMAIL",\n'
        + '          "Address": "ops-team@example.com"\n'
        + '        }\n'
        + '      ]\n'
        + '    }\n'
        + '  ]\''}</code></pre>

      <h3 style={h3Style}>{isZh ? '成本优化检查清单' : 'Cost Optimization Checklist'}</h3>
      <div style={{ background: '#fefce8', border: '1px solid #fde68a', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#713f12', lineHeight: '1.9' }}>
          <li>{isZh ? '使用 AWS Cost Explorer 分析支出趋势（按服务、账户、标签）' : 'Use AWS Cost Explorer to analyze spending trends (by service, account, tags)'}</li>
          <li>{isZh ? '启用 AWS Compute Optimizer 获取实例右调建议' : 'Enable AWS Compute Optimizer for right-sizing recommendations'}</li>
          <li>{isZh ? '使用 Trusted Advisor 的成本优化检查' : 'Run Trusted Advisor cost optimization checks'}</li>
          <li>{isZh ? '为所有资源添加成本分配标签（团队、环境、项目）' : 'Tag all resources with cost allocation tags (team, environment, project)'}</li>
          <li>{isZh ? '设置 AWS Budgets 告警（80% / 100% / 预测超支）' : 'Set AWS Budgets alerts (80% / 100% / forecasted overspend)'}</li>
          <li>{isZh ? '每月审查 Savings Plans 和 RI 覆盖率报告' : 'Review Savings Plans and RI coverage reports monthly'}</li>
          <li>{isZh ? '清理：未使用的弹性 IP、EBS 卷、旧 AMI、空负载均衡器' : 'Clean up: unused Elastic IPs, EBS volumes, old AMIs, empty load balancers'}</li>
          <li>{isZh ? '考虑多区域 vs 单区域——数据传输费用是隐藏杀手' : 'Consider multi-region vs single-region — data transfer is a hidden cost killer'}</li>
        </ul>
      </div>

      {/* Section 13: Well-Architected Reference */}
      <h2 style={h2Style}>
        {isZh ? '13. AWS Well-Architected 参考架构' : '13. AWS Well-Architected Reference Architecture'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'AWS Well-Architected Framework 定义了五大支柱：卓越运营、安全性、可靠性、性能效率和成本优化。以下是一个典型的三层 Web 应用架构，综合运用了本指南介绍的核心服务。'
          : 'The AWS Well-Architected Framework defines five pillars: Operational Excellence, Security, Reliability, Performance Efficiency, and Cost Optimization. Below is a typical three-tier web application architecture combining the core services covered in this guide.'}
      </p>

      <pre style={preStyle}><code>{'# Three-tier architecture overview\n'
        + '#\n'
        + '# Internet\n'
        + '#   |-- Route 53 (DNS, latency-based routing)\n'
        + '#   |-- CloudFront (CDN, static assets + API caching)\n'
        + '#   |-- WAF (rate limiting, SQL injection protection)\n'
        + '#   |\n'
        + '# VPC (10.0.0.0/16)\n'
        + '#   |\n'
        + '#   |-- Public Subnets (3 AZs)\n'
        + '#   |     |-- ALB (Application Load Balancer)\n'
        + '#   |     |-- NAT Gateways\n'
        + '#   |\n'
        + '#   |-- Private Subnets (3 AZs)\n'
        + '#   |     |-- ECS Fargate / EKS (app containers)\n'
        + '#   |     |-- Lambda (async processing)\n'
        + '#   |     |-- SQS queues + SNS topics\n'
        + '#   |\n'
        + '#   |-- Database Subnets (3 AZs)\n'
        + '#         |-- Aurora PostgreSQL (Multi-AZ)\n'
        + '#         |-- ElastiCache Redis (cluster mode)\n'
        + '#         |-- DynamoDB (session store)\n'
        + '#\n'
        + '# Observability:\n'
        + '#   CloudWatch Metrics + Logs + Alarms\n'
        + '#   X-Ray distributed tracing\n'
        + '#   CloudTrail API audit logging\n'
        + '#\n'
        + '# Security:\n'
        + '#   IAM roles (least privilege)\n'
        + '#   KMS encryption (at rest + in transit)\n'
        + '#   Secrets Manager (DB creds, API keys)\n'
        + '#   GuardDuty (threat detection)'}</code></pre>

      <h3 style={h3Style}>{isZh ? '五大支柱快速参考' : 'Five Pillars Quick Reference'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '支柱' : 'Pillar'}</th>
            <th style={thStyle}>{isZh ? '关键实践' : 'Key Practices'}</th>
            <th style={thStyle}>{isZh ? '核心服务' : 'Core Services'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '卓越运营' : 'Operational Excellence'}</td>
            <td style={tdStyle}>{isZh ? 'IaC、CI/CD、Runbook' : 'IaC, CI/CD, Runbooks'}</td>
            <td style={tdStyle}>CloudFormation, CodePipeline, Systems Manager</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '安全性' : 'Security'}</td>
            <td style={tdStyle}>{isZh ? '最小权限、加密、审计' : 'Least privilege, encryption, audit'}</td>
            <td style={tdStyle}>IAM, KMS, GuardDuty, CloudTrail</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '可靠性' : 'Reliability'}</td>
            <td style={tdStyle}>{isZh ? '多 AZ、自动恢复、备份' : 'Multi-AZ, auto-recovery, backups'}</td>
            <td style={tdStyle}>Auto Scaling, Route 53, S3 Cross-Region</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '性能效率' : 'Performance Efficiency'}</td>
            <td style={tdStyle}>{isZh ? '正确实例类型、缓存、CDN' : 'Right instance type, caching, CDN'}</td>
            <td style={tdStyle}>CloudFront, ElastiCache, Graviton</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '成本优化' : 'Cost Optimization'}</td>
            <td style={tdStyle}>{isZh ? '预留/Spot、右调、生命周期策略' : 'Reserved/Spot, right-size, lifecycle policies'}</td>
            <td style={tdStyle}>Savings Plans, Compute Optimizer, S3 IT</td>
          </tr>
        </tbody>
      </table>

      {/* Conclusion */}
      <h2 style={h2Style}>
        {isZh ? '总结' : 'Conclusion'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'AWS 生态系统庞大但有章可循。从计算（EC2/Lambda/ECS）到存储（S3）、数据库（RDS/DynamoDB）、网络（VPC/CloudFront/Route 53）、安全（IAM）、消息（SQS/SNS）到监控（CloudWatch），每个服务都有其最佳使用场景。关键是根据工作负载特征选择合适的服务组合，遵循 Well-Architected Framework 的五大支柱，并持续优化成本。从小处着手，按需扩展，善用托管服务——这就是 AWS 云架构的核心理念。'
          : 'The AWS ecosystem is vast but follows clear patterns. From compute (EC2/Lambda/ECS) to storage (S3), databases (RDS/DynamoDB), networking (VPC/CloudFront/Route 53), security (IAM), messaging (SQS/SNS), and monitoring (CloudWatch), each service has its optimal use case. The key is choosing the right service combination for your workload characteristics, following the Well-Architected Framework\'s five pillars, and continuously optimizing costs. Start small, scale on demand, leverage managed services — that is the core philosophy of AWS cloud architecture.'}
      </p>

      {/* FAQ */}
      <h2 style={h2Style}>
        {isZh ? '常见问题' : 'Frequently Asked Questions'}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqSchema.mainEntity.map((faq, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '20px 24px',
              background: '#ffffff',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b', margin: '0 0 10px 0' }}>
              {faq.name}
            </h3>
            <p style={{ color: '#475569', lineHeight: '1.7', margin: '0' }}>
              {faq.acceptedAnswer.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
