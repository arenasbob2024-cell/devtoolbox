'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'AWS Guide: Essential Cloud Services for Developers (EC2, S3, Lambda, RDS, CloudFront)',
    description: 'A comprehensive guide to AWS core services including EC2, S3, Lambda, API Gateway, RDS, DynamoDB, CloudFront, VPC, and CloudFormation with real CLI examples, IAM policies, and cost optimization tips.',
    tldr: 'AWS is the leading cloud platform with 200+ services. For most applications, master these six: EC2 (virtual machines), S3 (object storage), Lambda (serverless compute), RDS (managed databases), CloudFront (CDN), and IAM (identity/access control). Use the AWS Free Tier for learning, set billing alerts immediately, and use IAM roles instead of long-lived access keys.',
    keyTakeaway1: 'IAM roles are always safer than IAM users with access keys — use them for EC2 instances, Lambda functions, and CI/CD pipelines.',
    keyTakeaway2: 'S3 + CloudFront is the cheapest and most scalable way to host static websites and serve large files globally.',
    keyTakeaway3: 'Lambda cold starts affect Node.js/Python less than Java/C# — keep functions warm with provisioned concurrency for latency-sensitive workloads.',
    keyTakeaway4: 'RDS Multi-AZ provides automatic failover; Read Replicas provide read scalability — they are separate features, use both if needed.',
    keyTakeaway5: 'Always tag every AWS resource with at minimum: Project, Environment, Owner — it makes cost allocation and cleanup vastly easier.',
    keyTakeaway6: 'Use AWS Cost Explorer and set billing alarms before you start — unexpected bills are the most common AWS beginner mistake.',
    intro: 'Amazon Web Services (AWS) is the world\'s most comprehensive cloud platform with over 200 fully featured services spanning compute, storage, networking, databases, AI/ML, security, and more. Launched in 2006 with just S3 and EC2, AWS now powers millions of applications from startups to Fortune 500 enterprises. Whether you are running a personal project or architecting a globally distributed system, understanding the essential AWS services is a critical skill for modern developers. This guide covers the most important services you will use day-to-day, with real CLI commands, IAM policy examples, architecture patterns, and cost optimization strategies.',
    h2CoreConcepts: 'AWS Core Concepts: Regions, Availability Zones, and IAM',
    coreConceptsDesc: 'Before diving into specific services, you need to understand how AWS organizes its global infrastructure and controls access.',
    h3Regions: 'Regions and Availability Zones',
    regionsDesc: 'AWS operates in 33+ geographic Regions, each containing 3+ Availability Zones (AZs). A Region is an isolated geographic area (e.g., us-east-1, eu-west-1, ap-southeast-1). An AZ is a physically separate data center within a region with independent power, cooling, and networking. Deploying across multiple AZs protects against data center failures. Some services (IAM, CloudFront, Route 53) are global; most (EC2, RDS, Lambda) are regional.',
    h3IAM: 'IAM: Identity and Access Management',
    iamDesc: 'IAM is the backbone of AWS security. It controls who can access AWS services and what actions they can perform. The core components are: Users (people or apps with long-term credentials), Groups (collections of users), Roles (assumed by AWS services or external identities — no static credentials), and Policies (JSON documents defining permissions). The golden rule: always use roles over access keys, and apply the principle of least privilege.',
    h3Pricing: 'Understanding AWS Pricing',
    pricingDesc: 'AWS uses a pay-as-you-go model. Key pricing concepts: On-Demand (pay per second/hour, no commitment), Reserved Instances (1-3 year commitment, up to 72% savings), Spot Instances (unused capacity, up to 90% savings but can be interrupted), Savings Plans (flexible commitment across instance families), and Free Tier (12 months free for new accounts on select services). Always use the AWS Pricing Calculator before deploying production workloads.',
    h2EC2: 'EC2: Elastic Compute Cloud',
    ec2Desc: 'EC2 provides resizable virtual machines (called instances) in the cloud. It is the foundation of many AWS architectures. You choose the operating system, instance type, storage, and networking configuration.',
    h3InstanceTypes: 'EC2 Instance Type Families',
    instanceTypesDesc: 'AWS offers hundreds of instance types organized into families. The name format is: [family][generation].[size] (e.g., t3.micro, m5.xlarge, c6i.2xlarge).',
    h3SecurityGroups: 'Security Groups',
    securityGroupsDesc: 'Security groups act as virtual firewalls for your EC2 instances. They control inbound and outbound traffic at the instance level. Unlike NACLs, security groups are stateful: if you allow inbound traffic, the response is automatically allowed.',
    h3UserData: 'User Data Scripts',
    userDataDesc: 'User data scripts run on instance launch and are perfect for bootstrapping: installing software, pulling configs, or registering the instance with a service.',
    h2S3: 'S3: Simple Storage Service',
    s3Desc: 'S3 is AWS\'s object storage service. It stores files (objects) in containers (buckets). S3 offers 11 nines (99.999999999%) of durability, lifecycle management, versioning, server-side encryption, and static website hosting.',
    h3S3Storage: 'S3 Storage Classes',
    s3StorageDesc: 'S3 offers several storage classes optimized for different access patterns and cost requirements.',
    h3S3Static: 'Static Website Hosting',
    s3StaticDesc: 'S3 can host static websites directly without any servers. Combined with CloudFront, this is the cheapest way to serve static content globally.',
    h3PresignedURLs: 'Presigned URLs',
    presignedURLsDesc: 'Presigned URLs allow temporary, authenticated access to private S3 objects without exposing your credentials. They are essential for user file uploads and secure downloads.',
    h2Lambda: 'Lambda: Serverless Functions',
    lambdaDesc: 'Lambda runs your code without provisioning or managing servers. You pay only for the compute time you consume. Lambda supports Node.js, Python, Go, Java, Ruby, .NET, and custom runtimes.',
    h3LambdaTriggers: 'Lambda Triggers',
    lambdaTriggersDesc: 'Lambda functions can be triggered by dozens of AWS services and events.',
    h3LambdaColdStarts: 'Understanding Cold Starts',
    lambdaColdStartsDesc: 'A cold start occurs when Lambda has to initialize a new execution environment for your function. This adds latency: 100ms-1s for Node.js/Python, 1-5s for Java/C#. Strategies to minimize cold starts include keeping functions small, using Provisioned Concurrency for latency-sensitive functions, initializing SDK clients outside the handler, and using lighter runtimes (Node.js over Java).',
    h3LambdaLayers: 'Lambda Layers',
    lambdaLayersDesc: 'Layers let you share code and dependencies across multiple Lambda functions. A layer is a ZIP archive containing libraries, custom runtimes, or data. Functions can use up to 5 layers, and layers can be versioned.',
    h2APIGateway: 'API Gateway: REST and HTTP APIs',
    apiGatewayDesc: 'API Gateway is the front door for your Lambda functions and backend services. It handles authentication, throttling, caching, CORS, and request/response transformations.',
    h3RestVsHTTP: 'REST API vs HTTP API',
    restVsHTTPDesc: 'API Gateway offers two main API types. REST APIs are more feature-rich (request validation, usage plans, caching, WAF integration) but cost more. HTTP APIs are simpler, faster (lower latency), and cost 70% less. Use HTTP APIs for Lambda integrations and REST APIs when you need advanced features.',
    h2RDS: 'RDS: Relational Database Service',
    rdsDesc: 'RDS provides managed relational databases: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, and Aurora. AWS handles backups, patching, Multi-AZ failover, and read replicas.',
    h3RDSMultiAZ: 'Multi-AZ Deployments',
    rdsMultiAZDesc: 'Multi-AZ creates a synchronous standby replica in a different AZ. In case of primary failure, RDS automatically fails over to the standby (typically 1-2 minutes). Multi-AZ is for high availability, NOT for read scaling. The standby is not readable — use Read Replicas for that.',
    h3RDSSnapshots: 'Snapshots and Backups',
    rdsSnapshotsDesc: 'RDS supports automated backups (1-35 day retention) and manual snapshots that persist until deleted. You can restore to any point-in-time within the retention period or create a new instance from a snapshot.',
    h2DynamoDB: 'DynamoDB: NoSQL at Scale',
    dynamoDesc: 'DynamoDB is a fully managed NoSQL database with single-digit millisecond latency at any scale. It is schemaless, serverless, and automatically handles partitioning. It is ideal for high-traffic applications where read/write patterns are predictable.',
    h3DynamoIndexes: 'Indexes: GSI and LSI',
    dynamoIndexesDesc: 'DynamoDB has two types of secondary indexes. Local Secondary Indexes (LSI) share the partition key but have a different sort key — they must be created at table creation. Global Secondary Indexes (GSI) can have completely different partition and sort keys — they can be created at any time and have their own read/write capacity.',
    h3DynamoStreams: 'DynamoDB Streams',
    dynamoStreamsDesc: 'Streams capture a time-ordered sequence of every change (INSERT, MODIFY, REMOVE) made to items in a table. Each record is available for 24 hours. Streams can trigger Lambda functions for event-driven architectures.',
    h2CloudFront: 'CloudFront: Global Content Delivery Network',
    cloudFrontDesc: 'CloudFront is AWS\'s CDN with 450+ edge locations globally. It caches content close to users, reducing latency and origin load. CloudFront supports S3, EC2, ALB, API Gateway, and custom origins.',
    h3CloudFrontBehaviors: 'Cache Behaviors',
    cloudFrontBehaviorsDesc: 'Behaviors define how CloudFront handles requests for different URL patterns. You can configure different origins, TTLs, headers to forward, and Lambda@Edge functions for each behavior. The default behavior matches all requests (*) and is your fallback.',
    h3CloudFrontInvalidation: 'Cache Invalidation',
    cloudFrontInvalidationDesc: 'When you update content, you may need to invalidate the CloudFront cache. The first 1,000 invalidation paths per month are free; subsequent ones cost $0.005 each. Use versioned file names (app.v2.js) instead of invalidations for better cache control.',
    h2VPC: 'VPC: Virtual Private Cloud',
    vpcDesc: 'VPC is your private, isolated network within AWS. Every AWS account comes with a default VPC. For production workloads, create custom VPCs with proper subnet segmentation.',
    h3VPCSubnets: 'Public vs Private Subnets',
    vpcSubnetsDesc: 'Public subnets have a route to the Internet Gateway and are used for resources that need direct internet access (load balancers, bastion hosts). Private subnets have no direct internet route and are used for databases, application servers, and Lambda functions. Private subnets can access the internet via a NAT Gateway (for IPv4) in a public subnet.',
    h3NACLs: 'NACLs vs Security Groups',
    naclsDesc: 'Network ACLs operate at the subnet level and are stateless: you must explicitly allow both inbound and outbound rules. Security groups operate at the instance level and are stateful. Use security groups as your primary control; use NACLs for additional subnet-level protection when needed.',
    h2CloudFormation: 'CloudFormation: Infrastructure as Code',
    cloudFormationDesc: 'CloudFormation lets you provision AWS resources using JSON or YAML templates. It manages resource dependencies, supports rollback on failure, and enables infrastructure versioning. It is the AWS-native IaC tool; alternatives include CDK (TypeScript/Python), Terraform, and Pulumi.',
    h2AWSCLI: 'AWS CLI: Key Commands and Profiles',
    awsCLIDesc: 'The AWS CLI is essential for automation, scripting, and day-to-day operations. Install it with pip or a package manager, configure profiles, and use it in scripts and CI/CD pipelines.',
    h2Comparison: 'AWS vs GCP vs Azure: Service Comparison',
    comparisonDesc: 'Here is a comparison of equivalent services across the three major cloud providers.',
    h2CostOptimization: 'Cost Optimization Tips',
    costOptDesc: 'AWS costs can spiral quickly without careful management. These strategies will help you control your bill.',
    cost1: 'Right-size EC2 instances: use AWS Compute Optimizer recommendations. Oversized instances are the most common source of waste.',
    cost2: 'Use Savings Plans or Reserved Instances for predictable workloads: 1-year no-upfront saves 30-40%, 3-year saves up to 72%.',
    cost3: 'Enable S3 Intelligent Tiering for objects accessed unpredictably — it automatically moves data to the cheapest tier.',
    cost4: 'Use Spot Instances for fault-tolerant workloads (batch processing, CI/CD, ML training) — up to 90% savings.',
    cost5: 'Set up AWS Budgets and billing alerts in CloudWatch immediately. A forgotten EC2 instance can cost hundreds per month.',
    cost6: 'Delete unused Elastic IP addresses, unattached EBS volumes, and idle load balancers — these cost money even when unused.',
    cost7: 'Use CloudFront to reduce data transfer costs from EC2/S3 — CloudFront to internet is cheaper than EC2 to internet.',
    cost8: 'Enable RDS Auto Stop for development databases — automatically stops them after a period of inactivity to avoid idle charges.',
    h2FAQ: 'Frequently Asked Questions',
    faq1Q: 'What is the difference between EC2 and Lambda?',
    faq1A: 'EC2 provides virtual machines you manage (OS, dependencies, scaling). Lambda is serverless: you only write code, AWS handles the infrastructure. EC2 is better for long-running processes, stateful workloads, and when you need specific system configuration. Lambda is better for event-driven, short-lived tasks, and when you want zero infrastructure management and pay-per-use billing.',
    faq2Q: 'When should I use DynamoDB vs RDS?',
    faq2A: 'Use DynamoDB when you need: massive scale (millions of requests/second), single-digit millisecond latency, a flexible schema, or when your access patterns are predictable and can be modeled with a partition key + sort key. Use RDS when you need: complex queries and joins, ACID transactions across multiple tables, a familiar SQL interface, or when your query patterns are complex and ad-hoc.',
    faq3Q: 'What is the cheapest way to run a static website on AWS?',
    faq3A: 'S3 static website hosting + CloudFront CDN. Upload your HTML/CSS/JS to an S3 bucket, enable static hosting, create a CloudFront distribution pointing to S3, and use Route 53 for your domain. This setup costs pennies for low-traffic sites and scales to millions of users without any servers. The S3 Free Tier includes 5GB storage and 20,000 GET requests per month.',
    faq4Q: 'How do IAM roles work for EC2 instances?',
    faq4A: 'When you attach an IAM role to an EC2 instance, the instance metadata service (IMDS) provides temporary credentials to applications running on the instance. The AWS SDK automatically reads these credentials from http://169.254.169.254/latest/meta-data/iam/security-credentials/ — you do not need to set any environment variables or config files. The credentials are automatically rotated. Never put AWS access keys in your application code or EC2 user data.',
    faq5Q: 'What is the difference between CloudFront and a load balancer?',
    faq5A: 'CloudFront is a Content Delivery Network (CDN) that caches content at edge locations globally, reducing latency for geographically distributed users and reducing origin load. An Application Load Balancer (ALB) distributes traffic across multiple backend servers within a region for availability and scalability. Use both together: CloudFront in front of an ALB for global caching + regional load balancing. CloudFront is not a replacement for a load balancer.',
    faq6Q: 'How do S3 presigned URLs work?',
    faq6A: 'A presigned URL is a URL with authentication parameters embedded in the query string (signature, expiration, access key ID). When a client requests this URL, S3 validates the signature and expiration without requiring any AWS credentials from the client. This is the standard pattern for: user file uploads (presigned PUT), secure file downloads (presigned GET), and third-party access to private objects without making the bucket public. Presigned URLs expire after a configured duration (15 minutes to 7 days).',
    faq7Q: 'What is VPC peering and when do I need it?',
    faq7A: 'VPC peering creates a private network connection between two VPCs, allowing resources in either VPC to communicate using private IP addresses as if they were in the same network. You need it when you have resources in separate VPCs that need to communicate privately — for example, a shared services VPC (with databases, monitoring) connected to multiple application VPCs. Peering does not support transitive routing: if A peers with B and B peers with C, A cannot reach C through B.',
    faq8Q: 'What is the AWS Free Tier and what are its limits?',
    faq8A: 'The AWS Free Tier has three types: 12-month free (for new accounts: 750 hours/month t2.micro EC2, 5GB S3, 25GB DynamoDB, 750 hours RDS db.t2.micro), Always free (Lambda: 1M requests/month, DynamoDB: 25GB, CloudFront: 1TB data transfer out, SNS: 1M publishes), and Trials (limited-time free trials for newer services). Be careful: the Free Tier does NOT cover all services, and exceeding limits results in charges. Always set up billing alerts.',
  },
  zh: {
    title: 'AWS 完全指南：开发者必备云服务详解（EC2、S3、Lambda、RDS、CloudFront）',
    description: '全面介绍 AWS 核心服务，包括 EC2、S3、Lambda、API Gateway、RDS、DynamoDB、CloudFront、VPC 和 CloudFormation，附真实 CLI 示例、IAM 策略和成本优化技巧。',
    tldr: 'AWS 是领先的云平台，拥有 200+ 服务。对于大多数应用，掌握这六个核心服务即可：EC2（虚拟机）、S3（对象存储）、Lambda（无服务器计算）、RDS（托管数据库）、CloudFront（CDN）和 IAM（身份/访问控制）。使用 AWS 免费套餐学习，立即设置账单警报，使用 IAM 角色而非长期访问密钥。',
    keyTakeaway1: 'IAM 角色始终比带有访问密钥的 IAM 用户更安全——对 EC2 实例、Lambda 函数和 CI/CD 流水线使用角色。',
    keyTakeaway2: 'S3 + CloudFront 是托管静态网站和全球提供大文件的最便宜、最可扩展的方式。',
    keyTakeaway3: 'Lambda 冷启动对 Node.js/Python 影响比 Java/C# 小——对延迟敏感的工作负载使用预置并发保持函数预热。',
    keyTakeaway4: 'RDS Multi-AZ 提供自动故障转移；只读副本提供读取可扩展性——它们是独立功能，如有需要可同时使用。',
    keyTakeaway5: '始终为每个 AWS 资源打至少以下标签：Project（项目）、Environment（环境）、Owner（负责人）——这将大大简化成本分配和清理工作。',
    keyTakeaway6: '使用 AWS Cost Explorer 并在开始之前设置账单警报——意外账单是 AWS 初学者最常见的错误。',
    intro: 'Amazon Web Services（AWS）是世界上最全面的云平台，拥有 200 多项全功能服务，涵盖计算、存储、网络、数据库、AI/ML、安全等领域。AWS 于 2006 年仅以 S3 和 EC2 起步，现在为从初创企业到财富 500 强的数百万应用程序提供支持。无论你是在运行个人项目还是设计全球分布式系统，了解基本的 AWS 服务是现代开发者的关键技能。本指南涵盖你日常使用的最重要服务，附带真实的 CLI 命令、IAM 策略示例、架构模式和成本优化策略。',
    h2CoreConcepts: 'AWS 核心概念：区域、可用区和 IAM',
    coreConceptsDesc: '在深入了解具体服务之前，你需要了解 AWS 如何组织其全球基础设施并控制访问。',
    h3Regions: '区域和可用区',
    regionsDesc: 'AWS 在 33+ 个地理区域运营，每个区域包含 3+ 个可用区（AZ）。区域是独立的地理区域（如 us-east-1、eu-west-1、ap-southeast-1）。AZ 是区域内物理分离的数据中心，具有独立的电源、冷却和网络。跨多个 AZ 部署可防止数据中心故障。某些服务（IAM、CloudFront、Route 53）是全球性的；大多数（EC2、RDS、Lambda）是区域性的。',
    h3IAM: 'IAM：身份和访问管理',
    iamDesc: 'IAM 是 AWS 安全的基础。它控制谁可以访问 AWS 服务以及可以执行哪些操作。核心组件包括：用户（具有长期凭证的人员或应用程序）、组（用户集合）、角色（由 AWS 服务或外部身份承担——无静态凭证）和策略（定义权限的 JSON 文档）。黄金法则：始终使用角色而非访问密钥，并应用最小权限原则。',
    h3Pricing: '了解 AWS 定价',
    pricingDesc: 'AWS 使用按需付费模式。主要定价概念：按需（按秒/小时付费，无承诺）、预留实例（1-3 年承诺，最高节省 72%）、Spot 实例（未使用容量，最高节省 90% 但可能被中断）、节省计划（跨实例系列的灵活承诺）和免费套餐（新账户前 12 个月特定服务免费）。在部署生产工作负载之前，始终使用 AWS 定价计算器。',
    h2EC2: 'EC2：弹性计算云',
    ec2Desc: 'EC2 在云中提供可调整大小的虚拟机（称为实例）。它是许多 AWS 架构的基础。你选择操作系统、实例类型、存储和网络配置。',
    h3InstanceTypes: 'EC2 实例类型系列',
    instanceTypesDesc: 'AWS 提供数百种按系列组织的实例类型。命名格式为：[系列][代数].[大小]（如 t3.micro、m5.xlarge、c6i.2xlarge）。',
    h3SecurityGroups: '安全组',
    securityGroupsDesc: '安全组作为 EC2 实例的虚拟防火墙，在实例级别控制入站和出站流量。与 NACL 不同，安全组是有状态的：如果允许入站流量，响应将自动被允许。',
    h3UserData: '用户数据脚本',
    userDataDesc: '用户数据脚本在实例启动时运行，非常适合引导操作：安装软件、拉取配置或将实例注册到服务。',
    h2S3: 'S3：简单存储服务',
    s3Desc: 'S3 是 AWS 的对象存储服务，将文件（对象）存储在容器（存储桶）中。S3 提供 11 个 9（99.999999999%）的持久性、生命周期管理、版本控制、服务器端加密和静态网站托管。',
    h3S3Storage: 'S3 存储类',
    s3StorageDesc: 'S3 提供多种针对不同访问模式和成本要求优化的存储类。',
    h3S3Static: '静态网站托管',
    s3StaticDesc: 'S3 可以直接托管静态网站，无需任何服务器。与 CloudFront 结合，这是全球提供静态内容的最便宜方式。',
    h3PresignedURLs: '预签名 URL',
    presignedURLsDesc: '预签名 URL 允许对私有 S3 对象进行临时、经过身份验证的访问，而无需暴露你的凭证。它们对于用户文件上传和安全下载至关重要。',
    h2Lambda: 'Lambda：无服务器函数',
    lambdaDesc: 'Lambda 无需预置或管理服务器即可运行你的代码。你只需为消耗的计算时间付费。Lambda 支持 Node.js、Python、Go、Java、Ruby、.NET 和自定义运行时。',
    h3LambdaTriggers: 'Lambda 触发器',
    lambdaTriggersDesc: 'Lambda 函数可以由数十种 AWS 服务和事件触发。',
    h3LambdaColdStarts: '理解冷启动',
    lambdaColdStartsDesc: '当 Lambda 必须为函数初始化新的执行环境时，会发生冷启动。这会增加延迟：Node.js/Python 100ms-1s，Java/C# 1-5s。减少冷启动的策略包括：保持函数体积小、为延迟敏感的函数使用预置并发、在处理程序外初始化 SDK 客户端，以及使用更轻量的运行时（Node.js 而非 Java）。',
    h3LambdaLayers: 'Lambda 层',
    lambdaLayersDesc: '层允许跨多个 Lambda 函数共享代码和依赖项。层是包含库、自定义运行时或数据的 ZIP 存档。函数最多可使用 5 个层，层可以版本化。',
    h2APIGateway: 'API Gateway：REST 和 HTTP API',
    apiGatewayDesc: 'API Gateway 是 Lambda 函数和后端服务的入口。它处理身份验证、限流、缓存、CORS 和请求/响应转换。',
    h3RestVsHTTP: 'REST API vs HTTP API',
    restVsHTTPDesc: 'API Gateway 提供两种主要 API 类型。REST API 功能更丰富（请求验证、使用计划、缓存、WAF 集成）但成本更高。HTTP API 更简单、更快（更低延迟），成本降低 70%。将 HTTP API 用于 Lambda 集成，将 REST API 用于需要高级功能的场景。',
    h2RDS: 'RDS：关系数据库服务',
    rdsDesc: 'RDS 提供托管关系数据库：MySQL、PostgreSQL、MariaDB、Oracle、SQL Server 和 Aurora。AWS 处理备份、修补、Multi-AZ 故障转移和只读副本。',
    h3RDSMultiAZ: 'Multi-AZ 部署',
    rdsMultiAZDesc: 'Multi-AZ 在不同 AZ 中创建同步备用副本。在主实例故障的情况下，RDS 自动故障转移到备用实例（通常 1-2 分钟）。Multi-AZ 用于高可用性，而非读取扩展。备用实例不可读——为此使用只读副本。',
    h3RDSSnapshots: '快照和备份',
    rdsSnapshotsDesc: 'RDS 支持自动备份（1-35 天保留期）和持续到删除的手动快照。你可以还原到保留期内的任意时间点，或从快照创建新实例。',
    h2DynamoDB: 'DynamoDB：大规模 NoSQL',
    dynamoDesc: 'DynamoDB 是完全托管的 NoSQL 数据库，在任何规模下都具有个位数毫秒延迟。它是无模式、无服务器的，自动处理分区。适合读/写模式可预测的高流量应用程序。',
    h3DynamoIndexes: '索引：GSI 和 LSI',
    dynamoIndexesDesc: 'DynamoDB 有两种辅助索引类型。本地辅助索引（LSI）共享分区键但具有不同的排序键——必须在创建表时创建。全局辅助索引（GSI）可以有完全不同的分区键和排序键——可以随时创建，有自己的读/写容量。',
    h3DynamoStreams: 'DynamoDB 流',
    dynamoStreamsDesc: '流捕获对表中项目所做的每次更改（INSERT、MODIFY、REMOVE）的按时间排序的序列。每条记录可用 24 小时。流可以触发 Lambda 函数用于事件驱动架构。',
    h2CloudFront: 'CloudFront：全球内容分发网络',
    cloudFrontDesc: 'CloudFront 是 AWS 的 CDN，在全球拥有 450+ 边缘位置。它将内容缓存在靠近用户的位置，减少延迟和源服务器负载。CloudFront 支持 S3、EC2、ALB、API Gateway 和自定义源。',
    h3CloudFrontBehaviors: '缓存行为',
    cloudFrontBehaviorsDesc: '行为定义 CloudFront 如何处理不同 URL 模式的请求。你可以为每个行为配置不同的源、TTL、要转发的标头和 Lambda@Edge 函数。默认行为匹配所有请求（*），是你的回退。',
    h3CloudFrontInvalidation: '缓存失效',
    cloudFrontInvalidationDesc: '更新内容时，可能需要使 CloudFront 缓存失效。每月前 1,000 个失效路径免费；后续每个收费 $0.005。使用版本化文件名（app.v2.js）代替失效操作，以获得更好的缓存控制。',
    h2VPC: 'VPC：虚拟私有云',
    vpcDesc: 'VPC 是你在 AWS 内的私有隔离网络。每个 AWS 账户都有一个默认 VPC。对于生产工作负载，创建具有适当子网分段的自定义 VPC。',
    h3VPCSubnets: '公有子网 vs 私有子网',
    vpcSubnetsDesc: '公有子网有通往互联网网关的路由，用于需要直接互联网访问的资源（负载均衡器、堡垒主机）。私有子网没有直接互联网路由，用于数据库、应用服务器和 Lambda 函数。私有子网可以通过公有子网中的 NAT 网关访问互联网（用于 IPv4）。',
    h3NACLs: 'NACL vs 安全组',
    naclsDesc: '网络 ACL 在子网级别运行，是无状态的：必须显式允许入站和出站规则。安全组在实例级别运行，是有状态的。使用安全组作为主要控制；在需要额外子网级别保护时使用 NACL。',
    h2CloudFormation: 'CloudFormation：基础设施即代码',
    cloudFormationDesc: 'CloudFormation 允许使用 JSON 或 YAML 模板配置 AWS 资源。它管理资源依赖关系，支持失败时回滚，并支持基础设施版本控制。它是 AWS 原生 IaC 工具；替代方案包括 CDK（TypeScript/Python）、Terraform 和 Pulumi。',
    h2AWSCLI: 'AWS CLI：关键命令和配置文件',
    awsCLIDesc: 'AWS CLI 对于自动化、脚本编写和日常操作至关重要。使用 pip 或包管理器安装，配置配置文件，并在脚本和 CI/CD 流水线中使用。',
    h2Comparison: 'AWS vs GCP vs Azure：服务对比',
    comparisonDesc: '以下是三大主要云提供商等效服务的对比。',
    h2CostOptimization: '成本优化技巧',
    costOptDesc: '如果不进行仔细管理，AWS 成本可能会迅速上涨。这些策略将帮助你控制账单。',
    cost1: '调整 EC2 实例大小：使用 AWS Compute Optimizer 建议。超大实例是最常见的浪费来源。',
    cost2: '对可预测的工作负载使用节省计划或预留实例：1 年无预付节省 30-40%，3 年节省高达 72%。',
    cost3: '对访问模式不可预测的对象启用 S3 智能分层——它会自动将数据移动到最便宜的层。',
    cost4: '对容错工作负载（批处理、CI/CD、ML 训练）使用 Spot 实例——最高节省 90%。',
    cost5: '立即设置 AWS Budgets 和 CloudWatch 账单警报。一个被遗忘的 EC2 实例每月可能花费数百美元。',
    cost6: '删除未使用的弹性 IP 地址、未附加的 EBS 卷和空闲负载均衡器——即使未使用也会收费。',
    cost7: '使用 CloudFront 降低 EC2/S3 的数据传输成本——CloudFront 到互联网比 EC2 到互联网更便宜。',
    cost8: '为开发数据库启用 RDS 自动停止——在一段时间不活动后自动停止，避免空闲费用。',
    h2FAQ: '常见问题',
    faq1Q: 'EC2 和 Lambda 有什么区别？',
    faq1A: 'EC2 提供你管理的虚拟机（操作系统、依赖项、扩展）。Lambda 是无服务器的：你只写代码，AWS 处理基础设施。EC2 更适合长期运行的进程、有状态工作负载以及需要特定系统配置的场景。Lambda 更适合事件驱动的短暂任务，以及希望零基础设施管理和按使用量付费计费的场景。',
    faq2Q: '什么时候应该使用 DynamoDB vs RDS？',
    faq2A: '在以下情况使用 DynamoDB：需要大规模（每秒数百万请求）、个位数毫秒延迟、灵活模式，或者访问模式可预测且可以用分区键+排序键建模。在以下情况使用 RDS：需要复杂查询和连接、跨多个表的 ACID 事务、熟悉的 SQL 接口，或者查询模式复杂且是临时性的。',
    faq3Q: '在 AWS 上运行静态网站的最便宜方式是什么？',
    faq3A: 'S3 静态网站托管 + CloudFront CDN。将 HTML/CSS/JS 上传到 S3 存储桶，启用静态托管，创建指向 S3 的 CloudFront 分发，并使用 Route 53 配置域名。这种设置对于低流量网站每月只需几美分，且无需任何服务器即可扩展到数百万用户。S3 免费套餐包括每月 5GB 存储和 20,000 次 GET 请求。',
    faq4Q: 'IAM 角色如何为 EC2 实例工作？',
    faq4A: '将 IAM 角色附加到 EC2 实例时，实例元数据服务（IMDS）向实例上运行的应用程序提供临时凭证。AWS SDK 自动从 http://169.254.169.254/latest/meta-data/iam/security-credentials/ 读取这些凭证——你无需设置任何环境变量或配置文件。凭证会自动轮换。永远不要在应用程序代码或 EC2 用户数据中放置 AWS 访问密钥。',
    faq5Q: 'CloudFront 和负载均衡器有什么区别？',
    faq5A: 'CloudFront 是内容分发网络（CDN），在全球边缘位置缓存内容，减少地理分布用户的延迟并减少源服务器负载。应用程序负载均衡器（ALB）在区域内跨多个后端服务器分配流量以实现可用性和可扩展性。两者配合使用：CloudFront 在 ALB 前面实现全球缓存+区域负载均衡。CloudFront 不能替代负载均衡器。',
    faq6Q: 'S3 预签名 URL 是如何工作的？',
    faq6A: '预签名 URL 是查询字符串中嵌入了身份验证参数（签名、到期时间、访问密钥 ID）的 URL。当客户端请求此 URL 时，S3 验证签名和到期时间，无需客户端提供任何 AWS 凭证。这是以下场景的标准模式：用户文件上传（预签名 PUT）、安全文件下载（预签名 GET）以及第三方访问私有对象而不公开存储桶。预签名 URL 在配置的持续时间后过期（15 分钟到 7 天）。',
    faq7Q: 'VPC 对等互连是什么，什么时候需要它？',
    faq7A: 'VPC 对等互连在两个 VPC 之间创建私有网络连接，允许任一 VPC 中的资源使用私有 IP 地址进行通信，就好像它们在同一网络中一样。当你在不同 VPC 中有需要私下通信的资源时需要它——例如，共享服务 VPC（包含数据库、监控）连接到多个应用程序 VPC。对等互连不支持传递路由：如果 A 与 B 对等，B 与 C 对等，A 无法通过 B 到达 C。',
    faq8Q: 'AWS 免费套餐是什么，有哪些限制？',
    faq8A: 'AWS 免费套餐有三种类型：12 个月免费（新账户：每月 750 小时 t2.micro EC2、5GB S3、25GB DynamoDB、750 小时 RDS db.t2.micro）、永久免费（Lambda：每月 100 万次请求；DynamoDB：25GB；CloudFront：1TB 数据传出；SNS：100 万次发布）和试用版（较新服务的限时免费试用）。注意：免费套餐不涵盖所有服务，超出限制将产生费用。始终设置账单警报。',
  },
};

export default function AWSGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
      { '@type': 'Question', name: t.faq6Q, acceptedAnswer: { '@type': 'Answer', text: t.faq6A } },
      { '@type': 'Question', name: t.faq7Q, acceptedAnswer: { '@type': 'Answer', text: t.faq7A } },
      { '@type': 'Question', name: t.faq8Q, acceptedAnswer: { '@type': 'Answer', text: t.faq8A } },
    ],
  };

  const codeStyle: React.CSSProperties = {
    backgroundColor: '#111827',
    color: '#f9fafb',
    padding: '1rem',
    borderRadius: '0.5rem',
    overflowX: 'auto',
    fontSize: '0.85rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    display: 'block',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginTop: '2.5rem',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #e2e8f0',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginTop: '2rem',
    marginBottom: '0.75rem',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  };

  const thStyle: React.CSSProperties = {
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontWeight: 600,
    borderBottom: '2px solid #334155',
  };

  const tdStyle: React.CSSProperties = {
    padding: '0.65rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    verticalAlign: 'top',
  };

  const tdAltStyle: React.CSSProperties = {
    ...tdStyle,
    backgroundColor: '#f8fafc',
  };

  return (
    <article style={{ maxWidth: 'none', lineHeight: '1.75' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={{
        background: '#f0f9ff',
        border: '2px solid #0ea5e9',
        borderRadius: '0.75rem',
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
      }}>
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '0.5rem' }}>TL;DR</strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Introduction */}
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      {/* Key Takeaways */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '0.75rem',
        padding: '1.25rem 1.5rem',
        marginBottom: '2.5rem',
      }}>
        <strong style={{ fontSize: '1rem', display: 'block', marginBottom: '0.75rem' }}>Key Takeaways</strong>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          {[t.keyTakeaway1, t.keyTakeaway2, t.keyTakeaway3, t.keyTakeaway4, t.keyTakeaway5, t.keyTakeaway6].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', color: '#334155' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* ── Core Concepts ── */}
      <h2 style={h2Style}>{t.h2CoreConcepts}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.coreConceptsDesc}</p>

      <h3 style={h3Style}>{t.h3Regions}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.regionsDesc}</p>
      <pre><code style={codeStyle}>{
'# List all regions\n' +
'aws ec2 describe-regions --output table\n\n' +
'# Set a default region in environment\n' +
'export AWS_DEFAULT_REGION=us-east-1\n\n' +
'# Set region in AWS CLI profile\n' +
'aws configure set region us-east-1\n\n' +
'# List AZs in current region\n' +
'aws ec2 describe-availability-zones \\\n' +
'  --query "AvailabilityZones[].ZoneName" \\\n' +
'  --output text'
      }</code></pre>

      <h3 style={h3Style}>{t.h3IAM}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.iamDesc}</p>
      <pre><code style={codeStyle}>{
'# Example IAM policy — least privilege for S3 read on specific bucket\n' +
'{\n' +
'  "Version": "2012-10-17",\n' +
'  "Statement": [\n' +
'    {\n' +
'      "Sid": "ReadSpecificBucket",\n' +
'      "Effect": "Allow",\n' +
'      "Action": [\n' +
'        "s3:GetObject",\n' +
'        "s3:ListBucket"\n' +
'      ],\n' +
'      "Resource": [\n' +
'        "arn:aws:s3:::my-app-bucket",\n' +
'        "arn:aws:s3:::my-app-bucket/*"\n' +
'      ]\n' +
'    }\n' +
'  ]\n' +
'}\n\n' +
'# Create an IAM role for EC2 (trust policy)\n' +
'aws iam create-role \\\n' +
'  --role-name MyEC2Role \\\n' +
'  --assume-role-policy-document file://ec2-trust-policy.json\n\n' +
'# Attach a managed policy\n' +
'aws iam attach-role-policy \\\n' +
'  --role-name MyEC2Role \\\n' +
'  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess\n\n' +
'# Create instance profile and add role\n' +
'aws iam create-instance-profile --instance-profile-name MyEC2Profile\n' +
'aws iam add-role-to-instance-profile \\\n' +
'  --instance-profile-name MyEC2Profile \\\n' +
'  --role-name MyEC2Role'
      }</code></pre>

      <h3 style={h3Style}>{t.h3Pricing}</h3>
      <p style={{ marginBottom: '1.5rem' }}>{t.pricingDesc}</p>

      {/* ── EC2 ── */}
      <h2 style={h2Style}>{t.h2EC2}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.ec2Desc}</p>

      <h3 style={h3Style}>{t.h3InstanceTypes}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.instanceTypesDesc}</p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Family</th>
              <th style={thStyle}>Purpose</th>
              <th style={thStyle}>Examples</th>
              <th style={thStyle}>Use Cases</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['t3/t4g', 'Burstable General Purpose', 't3.micro, t3.small, t4g.medium', 'Dev/test, low-traffic web apps, small DBs'],
              ['m5/m6i', 'General Purpose', 'm5.large, m6i.xlarge, m6a.2xlarge', 'Web apps, app servers, small-medium DBs'],
              ['c5/c6i', 'Compute Optimized', 'c5.large, c6i.2xlarge, c6g.4xlarge', 'Batch processing, ML inference, gaming'],
              ['r5/r6i', 'Memory Optimized', 'r5.large, r6i.2xlarge, x2idn.32xlarge', 'In-memory DBs, Redis, Elasticsearch, SAP'],
              ['i3/i4i', 'Storage Optimized', 'i3.large, i4i.xlarge, d3en.2xlarge', 'NoSQL DBs, data warehousing, Kafka'],
              ['p3/p4d', 'GPU Instances', 'p3.2xlarge, p4d.24xlarge, g5.xlarge', 'ML training, GPU rendering, HPC'],
            ].map(([family, purpose, examples, uses], idx) => (
              <tr key={idx}>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}><code style={{ fontSize: '0.85rem' }}>{family}</code></td>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}>{purpose}</td>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}><code style={{ fontSize: '0.8rem' }}>{examples}</code></td>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}>{uses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{t.h3SecurityGroups}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.securityGroupsDesc}</p>
      <pre><code style={codeStyle}>{
'# Create a security group\n' +
'aws ec2 create-security-group \\\n' +
'  --group-name my-web-sg \\\n' +
'  --description "Web server security group" \\\n' +
'  --vpc-id vpc-0123456789abcdef0\n\n' +
'# Allow HTTP from anywhere\n' +
'aws ec2 authorize-security-group-ingress \\\n' +
'  --group-id sg-0123456789abcdef0 \\\n' +
'  --protocol tcp --port 80 --cidr 0.0.0.0/0\n\n' +
'# Allow HTTPS from anywhere\n' +
'aws ec2 authorize-security-group-ingress \\\n' +
'  --group-id sg-0123456789abcdef0 \\\n' +
'  --protocol tcp --port 443 --cidr 0.0.0.0/0\n\n' +
'# Allow SSH from specific IP only\n' +
'aws ec2 authorize-security-group-ingress \\\n' +
'  --group-id sg-0123456789abcdef0 \\\n' +
'  --protocol tcp --port 22 --cidr 203.0.113.0/32\n\n' +
'# Allow traffic from another security group (e.g., ALB → EC2)\n' +
'aws ec2 authorize-security-group-ingress \\\n' +
'  --group-id sg-ec2 \\\n' +
'  --protocol tcp --port 8080 \\\n' +
'  --source-group sg-alb'
      }</code></pre>

      <h3 style={h3Style}>{t.h3UserData}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.userDataDesc}</p>
      <pre><code style={codeStyle}>{
'#!/bin/bash\n' +
'# EC2 User Data — runs as root on first boot\n' +
'set -euo pipefail\n\n' +
'# Update packages\n' +
'yum update -y\n\n' +
'# Install Node.js 20 via NVM\n' +
'export HOME=/root\n' +
'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash\n' +
'source ~/.nvm/nvm.sh\n' +
'nvm install 20\n' +
'nvm use 20\n\n' +
'# Install PM2 globally\n' +
'npm install -g pm2\n\n' +
'# Clone application from S3\n' +
'aws s3 cp s3://my-app-bucket/app.tar.gz /tmp/app.tar.gz\n' +
'mkdir -p /opt/app\n' +
'tar -xzf /tmp/app.tar.gz -C /opt/app\n' +
'cd /opt/app && npm install --production\n\n' +
'# Start the application\n' +
'pm2 start server.js --name my-app\n' +
'pm2 startup\n' +
'pm2 save\n\n' +
'# Signal CloudFormation that instance is ready\n' +
'# (if using cfn-init)\n' +
'# /opt/aws/bin/cfn-signal -e $? ...'
      }</code></pre>

      <pre><code style={codeStyle}>{
'# Launch an EC2 instance with user data\n' +
'aws ec2 run-instances \\\n' +
'  --image-id ami-0abcdef1234567890 \\\n' +
'  --instance-type t3.small \\\n' +
'  --key-name my-key-pair \\\n' +
'  --security-group-ids sg-0123456789abcdef0 \\\n' +
'  --subnet-id subnet-0123456789abcdef0 \\\n' +
'  --iam-instance-profile Name=MyEC2Profile \\\n' +
'  --user-data file://user-data.sh \\\n' +
'  --tag-specifications \\\n' +
'    "ResourceType=instance,Tags=[{Key=Name,Value=my-server},{Key=Environment,Value=production}]" \\\n' +
'  --count 1'
      }</code></pre>

      {/* ── S3 ── */}
      <h2 style={h2Style}>{t.h2S3}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.s3Desc}</p>

      <h3 style={h3Style}>{t.h3S3Storage}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.s3StorageDesc}</p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Storage Class</th>
              <th style={thStyle}>Retrieval</th>
              <th style={thStyle}>Min Duration</th>
              <th style={thStyle}>Cost</th>
              <th style={thStyle}>Use Case</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['S3 Standard', 'Instant', 'None', '$$', 'Frequently accessed data'],
              ['S3 Intelligent-Tiering', 'Instant', 'None', '$-$$', 'Unknown/changing patterns'],
              ['S3 Standard-IA', 'Instant', '30 days', '$', 'Infrequent access, rapid when needed'],
              ['S3 One Zone-IA', 'Instant', '30 days', '$', 'Non-critical, reproductible data'],
              ['S3 Glacier Instant', 'Instant', '90 days', '¢', 'Archive with instant retrieval'],
              ['S3 Glacier Flexible', 'Minutes-hours', '90 days', '¢', 'Long-term archive, rare access'],
              ['S3 Glacier Deep Archive', '12 hours', '180 days', '¢¢', 'Regulatory/compliance archive'],
            ].map(([cls, retrieval, minDur, cost, useCase], idx) => (
              <tr key={idx}>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}><strong>{cls}</strong></td>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}>{retrieval}</td>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}>{minDur}</td>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}>{cost}</td>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}>{useCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre><code style={codeStyle}>{
'# Create a bucket\n' +
'aws s3api create-bucket \\\n' +
'  --bucket my-app-bucket-2026 \\\n' +
'  --region us-east-1\n\n' +
'# For regions other than us-east-1, add LocationConstraint\n' +
'aws s3api create-bucket \\\n' +
'  --bucket my-app-bucket-2026 \\\n' +
'  --region eu-west-1 \\\n' +
'  --create-bucket-configuration LocationConstraint=eu-west-1\n\n' +
'# Enable versioning\n' +
'aws s3api put-bucket-versioning \\\n' +
'  --bucket my-app-bucket-2026 \\\n' +
'  --versioning-configuration Status=Enabled\n\n' +
'# Enable server-side encryption (SSE-S3)\n' +
'aws s3api put-bucket-encryption \\\n' +
'  --bucket my-app-bucket-2026 \\\n' +
'  --server-side-encryption-configuration \\\n' +
'    "{\\"Rules\\":[{\\"ApplyServerSideEncryptionByDefault\\":{\\"SSEAlgorithm\\":\\"AES256\\"}}]}"\n\n' +
'# Block all public access (recommended default)\n' +
'aws s3api put-public-access-block \\\n' +
'  --bucket my-app-bucket-2026 \\\n' +
'  --public-access-block-configuration \\\n' +
'    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"\n\n' +
'# Upload a file\n' +
'aws s3 cp ./index.html s3://my-app-bucket-2026/\n\n' +
'# Sync a local directory to S3 (like rsync)\n' +
'aws s3 sync ./dist s3://my-app-bucket-2026/ --delete\n\n' +
'# Set cache headers for static assets\n' +
'aws s3 sync ./dist s3://my-app-bucket-2026/ \\\n' +
'  --cache-control "max-age=31536000,public" \\\n' +
'  --exclude "*.html" \\\n' +
'  --delete\n\n' +
'# Upload HTML files with no-cache\n' +
'aws s3 sync ./dist s3://my-app-bucket-2026/ \\\n' +
'  --include "*.html" \\\n' +
'  --cache-control "no-cache,no-store,must-revalidate"'
      }</code></pre>

      <h3 style={h3Style}>{t.h3S3Static}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.s3StaticDesc}</p>
      <pre><code style={codeStyle}>{
'# Enable static website hosting\n' +
'aws s3api put-bucket-website \\\n' +
'  --bucket my-app-bucket-2026 \\\n' +
'  --website-configuration \\\n' +
'    "{\\"IndexDocument\\":{\\"Suffix\\":\\"index.html\\"},\\"ErrorDocument\\":{\\"Key\\":\\"404.html\\"}}""\n\n' +
'# Set bucket policy for public read (required for static hosting)\n' +
'cat > bucket-policy.json << EOF\n' +
'{\n' +
'  "Version": "2012-10-17",\n' +
'  "Statement": [{\n' +
'    "Sid": "PublicReadGetObject",\n' +
'    "Effect": "Allow",\n' +
'    "Principal": "*",\n' +
'    "Action": "s3:GetObject",\n' +
'    "Resource": "arn:aws:s3:::my-app-bucket-2026/*"\n' +
'  }]\n' +
'}\n' +
'EOF\n' +
'aws s3api put-bucket-policy \\\n' +
'  --bucket my-app-bucket-2026 \\\n' +
'  --policy file://bucket-policy.json\n\n' +
'# Your website is now at:\n' +
'# http://my-app-bucket-2026.s3-website-us-east-1.amazonaws.com\n' +
'# Point CloudFront at this origin for HTTPS + CDN'
      }</code></pre>

      <h3 style={h3Style}>{t.h3PresignedURLs}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.presignedURLsDesc}</p>
      <pre><code style={codeStyle}>{
'# CLI: Generate presigned GET URL (valid 1 hour)\n' +
'aws s3 presign s3://my-app-bucket-2026/private-file.pdf \\\n' +
'  --expires-in 3600\n\n' +
'# Node.js SDK v3: Presigned PUT (for user uploads)\n' +
'import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";\n' +
'import { getSignedUrl } from "@aws-sdk/s3-request-presigner";\n\n' +
'const s3 = new S3Client({ region: "us-east-1" });\n\n' +
'async function getUploadUrl(key: string, contentType: string) {\n' +
'  const command = new PutObjectCommand({\n' +
'    Bucket: "my-app-bucket-2026",\n' +
'    Key: key,\n' +
'    ContentType: contentType,\n' +
'  });\n\n' +
'  // URL expires in 15 minutes\n' +
'  const url = await getSignedUrl(s3, command, { expiresIn: 900 });\n' +
'  return url;\n' +
'}\n\n' +
'// Client uploads directly to S3 (no server bandwidth used)\n' +
'const url = await getUploadUrl("uploads/avatar.jpg", "image/jpeg");\n' +
'await fetch(url, {\n' +
'  method: "PUT",\n' +
'  body: file,\n' +
'  headers: { "Content-Type": "image/jpeg" },\n' +
'});'
      }</code></pre>

      {/* ── Lambda ── */}
      <h2 style={h2Style}>{t.h2Lambda}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.lambdaDesc}</p>

      <h3 style={h3Style}>{t.h3LambdaTriggers}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.lambdaTriggersDesc}</p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Trigger Source</th>
              <th style={thStyle}>Invocation Type</th>
              <th style={thStyle}>Common Use Case</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['API Gateway / Function URL', 'Synchronous', 'REST APIs, webhooks'],
              ['S3 (ObjectCreated, ObjectRemoved)', 'Asynchronous', 'Image processing, file transformations'],
              ['DynamoDB Streams', 'Stream', 'Change data capture, event sourcing'],
              ['SQS', 'Poll-based', 'Message processing, job queues'],
              ['SNS', 'Asynchronous', 'Fan-out notifications'],
              ['EventBridge (CloudWatch Events)', 'Asynchronous', 'Scheduled tasks, event routing'],
              ['Kinesis Data Streams', 'Stream', 'Real-time analytics, log processing'],
              ['Cognito', 'Synchronous', 'Custom auth flows, user pool triggers'],
              ['CloudFront (Lambda@Edge)', 'Synchronous', 'Request/response manipulation at edge'],
            ].map(([trigger, type, useCase], idx) => (
              <tr key={idx}>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}><strong>{trigger}</strong></td>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}>{type}</td>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}>{useCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre><code style={codeStyle}>{
'// Lambda handler best practices — Node.js 20\n' +
'import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";\n' +
'import { marshall } from "@aws-sdk/util-dynamodb";\n\n' +
'// Initialize clients OUTSIDE the handler (reused across warm invocations)\n' +
'const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION });\n\n' +
'// Type the event — import from @types/aws-lambda\n' +
'export const handler = async (event: AWSLambda.APIGatewayProxyEventV2) => {\n' +
'  // Always log structured JSON for CloudWatch Insights queries\n' +
'  console.log(JSON.stringify({ event: "request", path: event.rawPath }));\n\n' +
'  try {\n' +
'    const body = JSON.parse(event.body || "{}") as { name: string };\n\n' +
'    await dynamo.send(new PutItemCommand({\n' +
'      TableName: process.env.TABLE_NAME!,\n' +
'      Item: marshall({\n' +
'        pk: "USER#" + Date.now(),\n' +
'        name: body.name,\n' +
'        createdAt: new Date().toISOString(),\n' +
'      }),\n' +
'    }));\n\n' +
'    return {\n' +
'      statusCode: 201,\n' +
'      headers: { "Content-Type": "application/json" },\n' +
'      body: JSON.stringify({ success: true }),\n' +
'    };\n' +
'  } catch (err) {\n' +
'    console.error(JSON.stringify({ error: String(err) }));\n' +
'    return { statusCode: 500, body: JSON.stringify({ error: "Internal error" }) };\n' +
'  }\n' +
'};\n\n' +
'# Deploy Lambda via AWS CLI\n' +
'# 1. Create deployment package\n' +
'npm run build && zip -r function.zip dist/ node_modules/\n\n' +
'# 2. Create the function\n' +
'aws lambda create-function \\\n' +
'  --function-name my-api-handler \\\n' +
'  --runtime nodejs20.x \\\n' +
'  --role arn:aws:iam::123456789012:role/LambdaExecutionRole \\\n' +
'  --handler dist/index.handler \\\n' +
'  --zip-file fileb://function.zip \\\n' +
'  --timeout 30 \\\n' +
'  --memory-size 256 \\\n' +
'  --environment "Variables={TABLE_NAME=my-table,LOG_LEVEL=info}"\n\n' +
'# 3. Update function code (redeploy)\n' +
'aws lambda update-function-code \\\n' +
'  --function-name my-api-handler \\\n' +
'  --zip-file fileb://function.zip\n\n' +
'# 4. Enable Provisioned Concurrency (eliminate cold starts)\n' +
'aws lambda put-provisioned-concurrency-config \\\n' +
'  --function-name my-api-handler \\\n' +
'  --qualifier prod \\\n' +
'  --provisioned-concurrent-executions 5'
      }</code></pre>

      <h3 style={h3Style}>{t.h3LambdaColdStarts}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.lambdaColdStartsDesc}</p>

      <h3 style={h3Style}>{t.h3LambdaLayers}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.lambdaLayersDesc}</p>
      <pre><code style={codeStyle}>{
'# Create a Lambda layer (e.g., shared utilities + node_modules)\n' +
'# Layer structure: nodejs/node_modules/...\n' +
'mkdir -p layer/nodejs\n' +
'cp -r node_modules layer/nodejs/\n' +
'cd layer && zip -r ../shared-deps-layer.zip nodejs/\n\n' +
'# Publish the layer\n' +
'aws lambda publish-layer-version \\\n' +
'  --layer-name shared-dependencies \\\n' +
'  --description "Shared node_modules for production" \\\n' +
'  --zip-file fileb://shared-deps-layer.zip \\\n' +
'  --compatible-runtimes nodejs18.x nodejs20.x\n\n' +
'# Attach layer to a function\n' +
'aws lambda update-function-configuration \\\n' +
'  --function-name my-api-handler \\\n' +
'  --layers arn:aws:lambda:us-east-1:123456789012:layer:shared-dependencies:3'
      }</code></pre>

      {/* ── API Gateway ── */}
      <h2 style={h2Style}>{t.h2APIGateway}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.apiGatewayDesc}</p>

      <h3 style={h3Style}>{t.h3RestVsHTTP}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.restVsHTTPDesc}</p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Feature</th>
              <th style={thStyle}>REST API</th>
              <th style={thStyle}>HTTP API</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Pricing (per million)', '$3.50', '$1.00'],
              ['Latency', 'Higher', 'Lower (~60% faster)'],
              ['Request Validation', 'Yes', 'No'],
              ['WAF Integration', 'Yes', 'No'],
              ['Usage Plans / API Keys', 'Yes', 'No'],
              ['Response Caching', 'Yes', 'No'],
              ['Lambda Proxy Integration', 'Yes', 'Yes (optimized)'],
              ['JWT Authorizers', 'Via Lambda', 'Native'],
              ['CORS', 'Manual', 'Auto-configure'],
              ['Private API (VPC)', 'Yes', 'No'],
            ].map(([feature, rest, http], idx) => (
              <tr key={idx}>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}><strong>{feature}</strong></td>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}>{rest}</td>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}>{http}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre><code style={codeStyle}>{
'# Create an HTTP API (recommended for Lambda)\n' +
'aws apigatewayv2 create-api \\\n' +
'  --name my-http-api \\\n' +
'  --protocol-type HTTP \\\n' +
'  --cors-configuration \\\n' +
'    "AllowOrigins=[https://myapp.com],AllowMethods=[GET,POST,PUT,DELETE],AllowHeaders=[Content-Type,Authorization]"\n\n' +
'# Create Lambda integration\n' +
'aws apigatewayv2 create-integration \\\n' +
'  --api-id abc123 \\\n' +
'  --integration-type AWS_PROXY \\\n' +
'  --integration-uri arn:aws:lambda:us-east-1:123456789012:function:my-api-handler \\\n' +
'  --payload-format-version 2.0\n\n' +
'# Create a route\n' +
'aws apigatewayv2 create-route \\\n' +
'  --api-id abc123 \\\n' +
'  --route-key "POST /users" \\\n' +
'  --target integrations/xyz789\n\n' +
'# Add a JWT authorizer\n' +
'aws apigatewayv2 create-authorizer \\\n' +
'  --api-id abc123 \\\n' +
'  --name CognitoJWT \\\n' +
'  --authorizer-type JWT \\\n' +
'  --identity-source "$request.header.Authorization" \\\n' +
'  --jwt-configuration \\\n' +
'    "Issuer=https://cognito-idp.us-east-1.amazonaws.com/us-east-1_abc123,Audience=[my-app-client-id]"'
      }</code></pre>

      {/* ── RDS ── */}
      <h2 style={h2Style}>{t.h2RDS}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.rdsDesc}</p>

      <h3 style={h3Style}>{t.h3RDSMultiAZ}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.rdsMultiAZDesc}</p>
      <pre><code style={codeStyle}>{
'# Create an RDS PostgreSQL instance with Multi-AZ\n' +
'aws rds create-db-instance \\\n' +
'  --db-instance-identifier my-postgres-prod \\\n' +
'  --db-instance-class db.t3.medium \\\n' +
'  --engine postgres \\\n' +
'  --engine-version 15.4 \\\n' +
'  --master-username admin \\\n' +
'  --master-user-password "$(openssl rand -base64 32)" \\\n' +
'  --allocated-storage 100 \\\n' +
'  --storage-type gp3 \\\n' +
'  --multi-az \\\n' +
'  --backup-retention-period 7 \\\n' +
'  --deletion-protection \\\n' +
'  --enable-performance-insights \\\n' +
'  --db-subnet-group-name my-db-subnet-group \\\n' +
'  --vpc-security-group-ids sg-0db123456789\n\n' +
'# Create a Read Replica in same region\n' +
'aws rds create-db-instance-read-replica \\\n' +
'  --db-instance-identifier my-postgres-replica \\\n' +
'  --source-db-instance-identifier my-postgres-prod \\\n' +
'  --db-instance-class db.t3.medium\n\n' +
'# Promote replica to standalone (e.g., for region failover)\n' +
'aws rds promote-read-replica \\\n' +
'  --db-instance-identifier my-postgres-replica\n\n' +
'# Enable IAM database authentication\n' +
'aws rds modify-db-instance \\\n' +
'  --db-instance-identifier my-postgres-prod \\\n' +
'  --enable-iam-database-authentication \\\n' +
'  --apply-immediately'
      }</code></pre>

      <h3 style={h3Style}>{t.h3RDSSnapshots}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.rdsSnapshotsDesc}</p>
      <pre><code style={codeStyle}>{
'# Create a manual snapshot\n' +
'aws rds create-db-snapshot \\\n' +
'  --db-instance-identifier my-postgres-prod \\\n' +
'  --db-snapshot-identifier my-postgres-backup-2026-02-27\n\n' +
'# Restore from snapshot (creates a new instance)\n' +
'aws rds restore-db-instance-from-db-snapshot \\\n' +
'  --db-instance-identifier my-postgres-restored \\\n' +
'  --db-snapshot-identifier my-postgres-backup-2026-02-27 \\\n' +
'  --db-instance-class db.t3.medium\n\n' +
'# Restore to a specific point in time\n' +
'aws rds restore-db-instance-to-point-in-time \\\n' +
'  --source-db-instance-identifier my-postgres-prod \\\n' +
'  --target-db-instance-identifier my-postgres-pitr \\\n' +
'  --restore-time 2026-02-26T12:00:00Z'
      }</code></pre>

      {/* ── DynamoDB ── */}
      <h2 style={h2Style}>{t.h2DynamoDB}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.dynamoDesc}</p>

      <h3 style={h3Style}>{t.h3DynamoIndexes}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.dynamoIndexesDesc}</p>
      <pre><code style={codeStyle}>{
'# Create a DynamoDB table with GSI\n' +
'aws dynamodb create-table \\\n' +
'  --table-name Orders \\\n' +
'  --attribute-definitions \\\n' +
'    AttributeName=PK,AttributeType=S \\\n' +
'    AttributeName=SK,AttributeType=S \\\n' +
'    AttributeName=GSI1PK,AttributeType=S \\\n' +
'    AttributeName=GSI1SK,AttributeType=S \\\n' +
'  --key-schema \\\n' +
'    AttributeName=PK,KeyType=HASH \\\n' +
'    AttributeName=SK,KeyType=RANGE \\\n' +
'  --global-secondary-indexes \\\n' +
'    "[{\\"IndexName\\":\\"GSI1\\",\\"KeySchema\\":[{\\"AttributeName\\":\\"GSI1PK\\",\\"KeyType\\":\\"HASH\\"},{\\"AttributeName\\":\\"GSI1SK\\",\\"KeyType\\":\\"RANGE\\"}],\\"Projection\\":{\\"ProjectionType\\":\\"ALL\\"}}]" \\\n' +
'  --billing-mode PAY_PER_REQUEST\n\n' +
'# Single-table design: PK/SK patterns\n' +
'# User:       PK=USER#userId    SK=PROFILE\n' +
'# Order:      PK=USER#userId    SK=ORDER#orderId\n' +
'# GSI1 query: PK=ORDER#status   SK=createdAt (all orders by status)\n\n' +
'# Query orders for a user\n' +
'aws dynamodb query \\\n' +
'  --table-name Orders \\\n' +
'  --key-condition-expression "PK = :pk AND begins_with(SK, :skPrefix)" \\\n' +
'  --expression-attribute-values \\\n' +
'    "{\\":pk\\":{\\"S\\":\\"USER#user123\\"},\\":skPrefix\\":{\\"S\\":\\"ORDER#\\"}}"\n\n' +
'# Query via GSI (all PENDING orders)\n' +
'aws dynamodb query \\\n' +
'  --table-name Orders \\\n' +
'  --index-name GSI1 \\\n' +
'  --key-condition-expression "GSI1PK = :status" \\\n' +
'  --expression-attribute-values "{\\":status\\":{\\"S\\":\\"ORDER#PENDING\\"}}"'
      }</code></pre>

      <h3 style={h3Style}>{t.h3DynamoStreams}</h3>
      <p style={{ marginBottom: '1.5rem' }}>{t.dynamoStreamsDesc}</p>

      {/* ── CloudFront ── */}
      <h2 style={h2Style}>{t.h2CloudFront}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.cloudFrontDesc}</p>

      <h3 style={h3Style}>{t.h3CloudFrontBehaviors}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cloudFrontBehaviorsDesc}</p>
      <pre><code style={codeStyle}>{
'# Create a CloudFront distribution (S3 origin)\n' +
'aws cloudfront create-distribution --distribution-config file://cf-config.json\n\n' +
'# cf-config.json (simplified)\n' +
'{\n' +
'  "Origins": {\n' +
'    "Quantity": 1,\n' +
'    "Items": [{\n' +
'      "Id": "S3Origin",\n' +
'      "DomainName": "my-app-bucket.s3.amazonaws.com",\n' +
'      "S3OriginConfig": { "OriginAccessIdentity": "" }\n' +
'    }]\n' +
'  },\n' +
'  "DefaultCacheBehavior": {\n' +
'    "TargetOriginId": "S3Origin",\n' +
'    "ViewerProtocolPolicy": "redirect-to-https",\n' +
'    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",\n' +
'    "Compress": true\n' +
'  },\n' +
'  "CacheBehaviors": {\n' +
'    "Quantity": 1,\n' +
'    "Items": [{\n' +
'      "PathPattern": "/api/*",\n' +
'      "TargetOriginId": "APIGatewayOrigin",\n' +
'      "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",\n' +
'      "ViewerProtocolPolicy": "https-only"\n' +
'    }]\n' +
'  },\n' +
'  "PriceClass": "PriceClass_100",\n' +
'  "HttpVersion": "http2and3",\n' +
'  "IsIPV6Enabled": true\n' +
'}'
      }</code></pre>

      <h3 style={h3Style}>{t.h3CloudFrontInvalidation}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cloudFrontInvalidationDesc}</p>
      <pre><code style={codeStyle}>{
'# Invalidate specific files\n' +
'aws cloudfront create-invalidation \\\n' +
'  --distribution-id EDFDVBD6EXAMPLE \\\n' +
'  --paths "/index.html" "/app.js"\n\n' +
'# Invalidate all files (expensive if > 1000 paths/month)\n' +
'aws cloudfront create-invalidation \\\n' +
'  --distribution-id EDFDVBD6EXAMPLE \\\n' +
'  --paths "/*"\n\n' +
'# Better: Use versioned asset names (no invalidation needed)\n' +
'# app.abc123.js  <- content hash in filename\n' +
'# styles.def456.css\n' +
'# Only invalidate index.html (the entry point)'
      }</code></pre>

      {/* ── VPC ── */}
      <h2 style={h2Style}>{t.h2VPC}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.vpcDesc}</p>

      <h3 style={h3Style}>{t.h3VPCSubnets}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.vpcSubnetsDesc}</p>
      <pre><code style={codeStyle}>{
'# Create a VPC\n' +
'aws ec2 create-vpc --cidr-block 10.0.0.0/16\n\n' +
'# Create public subnets (one per AZ)\n' +
'aws ec2 create-subnet \\\n' +
'  --vpc-id vpc-0abc123 \\\n' +
'  --cidr-block 10.0.1.0/24 \\\n' +
'  --availability-zone us-east-1a\n\n' +
'aws ec2 create-subnet \\\n' +
'  --vpc-id vpc-0abc123 \\\n' +
'  --cidr-block 10.0.2.0/24 \\\n' +
'  --availability-zone us-east-1b\n\n' +
'# Create private subnets\n' +
'aws ec2 create-subnet \\\n' +
'  --vpc-id vpc-0abc123 \\\n' +
'  --cidr-block 10.0.11.0/24 \\\n' +
'  --availability-zone us-east-1a\n\n' +
'# Create Internet Gateway (for public subnets)\n' +
'aws ec2 create-internet-gateway\n' +
'aws ec2 attach-internet-gateway \\\n' +
'  --vpc-id vpc-0abc123 \\\n' +
'  --internet-gateway-id igw-0abc123\n\n' +
'# Create NAT Gateway in public subnet (for private subnet outbound)\n' +
'# First, allocate an Elastic IP\n' +
'aws ec2 allocate-address --domain vpc\n\n' +
'aws ec2 create-nat-gateway \\\n' +
'  --subnet-id subnet-public-1a \\\n' +
'  --allocation-id eipalloc-0abc123\n\n' +
'# Add default route to private route table via NAT Gateway\n' +
'aws ec2 create-route \\\n' +
'  --route-table-id rtb-private \\\n' +
'  --destination-cidr-block 0.0.0.0/0 \\\n' +
'  --nat-gateway-id nat-0abc123'
      }</code></pre>

      <h3 style={h3Style}>{t.h3NACLs}</h3>
      <p style={{ marginBottom: '1.5rem' }}>{t.naclsDesc}</p>

      {/* ── CloudFormation ── */}
      <h2 style={h2Style}>{t.h2CloudFormation}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.cloudFormationDesc}</p>
      <pre><code style={codeStyle}>{
'# CloudFormation template: S3 bucket + Lambda + API Gateway\n' +
'AWSTemplateFormatVersion: "2010-09-09"\n' +
'Description: "Serverless API stack"\n\n' +
'Parameters:\n' +
'  Environment:\n' +
'    Type: String\n' +
'    AllowedValues: [dev, staging, production]\n' +
'    Default: dev\n\n' +
'Resources:\n' +
'  # S3 bucket for uploads\n' +
'  UploadsBucket:\n' +
'    Type: AWS::S3::Bucket\n' +
'    Properties:\n' +
'      BucketName: !Sub "uploads-${Environment}-${AWS::AccountId}"\n' +
'      VersioningConfiguration:\n' +
'        Status: Enabled\n' +
'      BucketEncryption:\n' +
'        ServerSideEncryptionConfiguration:\n' +
'          - ServerSideEncryptionByDefault:\n' +
'              SSEAlgorithm: AES256\n\n' +
'  # Lambda execution role\n' +
'  LambdaRole:\n' +
'    Type: AWS::IAM::Role\n' +
'    Properties:\n' +
'      AssumeRolePolicyDocument:\n' +
'        Version: "2012-10-17"\n' +
'        Statement:\n' +
'          - Effect: Allow\n' +
'            Principal: { Service: lambda.amazonaws.com }\n' +
'            Action: sts:AssumeRole\n' +
'      ManagedPolicyArns:\n' +
'        - arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole\n' +
'      Policies:\n' +
'        - PolicyName: S3Access\n' +
'          PolicyDocument:\n' +
'            Version: "2012-10-17"\n' +
'            Statement:\n' +
'              - Effect: Allow\n' +
'                Action: [s3:GetObject, s3:PutObject]\n' +
'                Resource: !Sub "${UploadsBucket.Arn}/*"\n\n' +
'  # Lambda function\n' +
'  ApiFunction:\n' +
'    Type: AWS::Lambda::Function\n' +
'    Properties:\n' +
'      FunctionName: !Sub "api-handler-${Environment}"\n' +
'      Runtime: nodejs20.x\n' +
'      Handler: dist/index.handler\n' +
'      Role: !GetAtt LambdaRole.Arn\n' +
'      Timeout: 30\n' +
'      MemorySize: 256\n' +
'      Environment:\n' +
'        Variables:\n' +
'          BUCKET_NAME: !Ref UploadsBucket\n' +
'          ENV: !Ref Environment\n\n' +
'Outputs:\n' +
'  BucketName:\n' +
'    Value: !Ref UploadsBucket\n' +
'  FunctionArn:\n' +
'    Value: !GetAtt ApiFunction.Arn\n\n' +
'# Deploy the stack\n' +
'aws cloudformation deploy \\\n' +
'  --template-file template.yml \\\n' +
'  --stack-name my-serverless-api \\\n' +
'  --parameter-overrides Environment=production \\\n' +
'  --capabilities CAPABILITY_IAM'
      }</code></pre>

      {/* ── AWS CLI ── */}
      <h2 style={h2Style}>{t.h2AWSCLI}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.awsCLIDesc}</p>
      <pre><code style={codeStyle}>{
'# Install AWS CLI v2\n' +
'# macOS\n' +
'brew install awscli\n\n' +
'# Linux\n' +
'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"\n' +
'unzip awscliv2.zip && sudo ./aws/install\n\n' +
'# --- Configure profiles ---\n' +
'# Interactive setup (asks for key ID, secret, region, output format)\n' +
'aws configure\n\n' +
'# Configure a named profile\n' +
'aws configure --profile production\n\n' +
'# ~/.aws/credentials\n' +
'# [default]\n' +
'# aws_access_key_id = AKIAIOSFODNN7EXAMPLE\n' +
'# aws_secret_access_key = wJalrXUtnFEMI/K7MDENG...\n\n' +
'# [production]\n' +
'# aws_access_key_id = AKIAI...\n' +
'# aws_secret_access_key = ...\n\n' +
'# ~/.aws/config\n' +
'# [default]\n' +
'# region = us-east-1\n' +
'# output = json\n\n' +
'# [profile production]\n' +
'# region = us-east-1\n' +
'# role_arn = arn:aws:iam::123456789012:role/ProductionRole\n' +
'# source_profile = default\n\n' +
'# Use a specific profile\n' +
'aws s3 ls --profile production\n' +
'AWS_PROFILE=production aws ec2 describe-instances\n\n' +
'# --- Essential commands ---\n' +
'# EC2\n' +
'aws ec2 describe-instances --query "Reservations[].Instances[].[InstanceId,State.Name,Tags[?Key==Name].Value|[0]]" --output table\n' +
'aws ec2 start-instances --instance-ids i-0abc123\n' +
'aws ec2 stop-instances --instance-ids i-0abc123\n\n' +
'# S3\n' +
'aws s3 ls s3://my-bucket/ --recursive --human-readable --summarize\n' +
'aws s3 rm s3://my-bucket/old-file.txt\n' +
'aws s3 mv s3://src/file.txt s3://dest/file.txt\n\n' +
'# Lambda\n' +
'aws lambda list-functions --query "Functions[].[FunctionName,Runtime,LastModified]" --output table\n' +
'aws lambda invoke --function-name my-fn --payload "{\\"test\\":true}" response.json\n\n' +
'# CloudWatch Logs\n' +
'aws logs tail /aws/lambda/my-fn --follow\n' +
'aws logs filter-log-events \\\n' +
'  --log-group-name /aws/lambda/my-fn \\\n' +
'  --filter-pattern "ERROR"\n\n' +
'# SSM Parameter Store (store secrets securely)\n' +
'aws ssm put-parameter \\\n' +
'  --name "/myapp/prod/db-password" \\\n' +
'  --value "supersecret" \\\n' +
'  --type SecureString\n\n' +
'aws ssm get-parameter \\\n' +
'  --name "/myapp/prod/db-password" \\\n' +
'  --with-decryption \\\n' +
'  --query "Parameter.Value" --output text'
      }</code></pre>

      {/* ── Comparison Table ── */}
      <h2 style={h2Style}>{t.h2Comparison}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.comparisonDesc}</p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Service Category</th>
              <th style={thStyle}>AWS</th>
              <th style={thStyle}>Google Cloud (GCP)</th>
              <th style={thStyle}>Microsoft Azure</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Virtual Machines', 'EC2', 'Compute Engine', 'Virtual Machines'],
              ['Object Storage', 'S3', 'Cloud Storage (GCS)', 'Azure Blob Storage'],
              ['Serverless Functions', 'Lambda', 'Cloud Functions / Cloud Run', 'Azure Functions'],
              ['Managed Kubernetes', 'EKS', 'GKE', 'AKS'],
              ['Managed MySQL/Postgres', 'RDS Aurora', 'Cloud SQL', 'Azure Database for PostgreSQL'],
              ['NoSQL Database', 'DynamoDB', 'Firestore / Bigtable', 'Cosmos DB'],
              ['CDN', 'CloudFront', 'Cloud CDN', 'Azure CDN / Front Door'],
              ['DNS', 'Route 53', 'Cloud DNS', 'Azure DNS'],
              ['Message Queue', 'SQS', 'Cloud Pub/Sub', 'Azure Service Bus'],
              ['Event Streaming', 'Kinesis', 'Pub/Sub Lite / Dataflow', 'Azure Event Hubs'],
              ['Container Registry', 'ECR', 'Artifact Registry (GCR)', 'Azure Container Registry'],
              ['Identity / Auth', 'Cognito', 'Firebase Auth / Identity Platform', 'Azure Active Directory B2C'],
              ['API Gateway', 'API Gateway', 'Apigee / Cloud Endpoints', 'Azure API Management'],
              ['Infrastructure as Code', 'CloudFormation / CDK', 'Deployment Manager / Config Connector', 'ARM / Bicep'],
              ['Monitoring', 'CloudWatch', 'Cloud Monitoring + Logging', 'Azure Monitor'],
              ['Secret Management', 'Secrets Manager', 'Secret Manager', 'Azure Key Vault'],
              ['ML/AI Platform', 'SageMaker', 'Vertex AI', 'Azure Machine Learning'],
              ['Data Warehouse', 'Redshift', 'BigQuery', 'Azure Synapse Analytics'],
              ['VPN / Private Network', 'VPC + Direct Connect', 'VPC + Dedicated Interconnect', 'VNet + ExpressRoute'],
            ].map(([category, aws, gcp, azure], idx) => (
              <tr key={idx}>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}><strong>{category}</strong></td>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}>{aws}</td>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}>{gcp}</td>
                <td style={idx % 2 === 0 ? tdStyle : tdAltStyle}>{azure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Cost Optimization ── */}
      <h2 style={h2Style}>{t.h2CostOptimization}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.costOptDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.cost1, t.cost2, t.cost3, t.cost4, t.cost5, t.cost6, t.cost7, t.cost8].map((tip, i) => (
          <li key={i} style={{ marginBottom: '0.75rem', lineHeight: '1.7' }}>{tip}</li>
        ))}
      </ul>
      <pre><code style={codeStyle}>{
'# Set up a billing alert at $50\n' +
'aws cloudwatch put-metric-alarm \\\n' +
'  --alarm-name "AWS-Billing-50-USD" \\\n' +
'  --alarm-description "Alert when estimated charges exceed $50" \\\n' +
'  --namespace "AWS/Billing" \\\n' +
'  --metric-name "EstimatedCharges" \\\n' +
'  --statistic Maximum \\\n' +
'  --dimensions Name=Currency,Value=USD \\\n' +
'  --period 86400 \\\n' +
'  --evaluation-periods 1 \\\n' +
'  --threshold 50 \\\n' +
'  --comparison-operator GreaterThanOrEqualToThreshold \\\n' +
'  --alarm-actions arn:aws:sns:us-east-1:123456789012:billing-alerts\n\n' +
'# Note: Billing metrics only exist in us-east-1!\n' +
'# aws cloudwatch put-metric-alarm --region us-east-1 ...\n\n' +
'# Find idle/unused EC2 instances (< 5% CPU over 7 days)\n' +
'aws cloudwatch get-metric-statistics \\\n' +
'  --namespace AWS/EC2 \\\n' +
'  --metric-name CPUUtilization \\\n' +
'  --dimensions Name=InstanceId,Value=i-0abc123 \\\n' +
'  --start-time 2026-02-20T00:00:00Z \\\n' +
'  --end-time 2026-02-27T00:00:00Z \\\n' +
'  --period 86400 \\\n' +
'  --statistics Average\n\n' +
'# List unattached EBS volumes (potential waste)\n' +
'aws ec2 describe-volumes \\\n' +
'  --filters Name=status,Values=available \\\n' +
'  --query "Volumes[].[VolumeId,Size,CreateTime]" \\\n' +
'  --output table\n\n' +
'# List unused Elastic IPs (cost $0.005/hour if unattached)\n' +
'aws ec2 describe-addresses \\\n' +
'  --query "Addresses[?AssociationId==null].[AllocationId,PublicIp]" \\\n' +
'  --output table'
      }</code></pre>

      {/* ── FAQ ── */}
      <h2 style={h2Style}>{t.h2FAQ}</h2>
      <div style={{ marginBottom: '1rem' }}>
        {[
          [t.faq1Q, t.faq1A],
          [t.faq2Q, t.faq2A],
          [t.faq3Q, t.faq3A],
          [t.faq4Q, t.faq4A],
          [t.faq5Q, t.faq5A],
          [t.faq6Q, t.faq6A],
          [t.faq7Q, t.faq7A],
          [t.faq8Q, t.faq8A],
        ].map(([q, a], i) => (
          <div key={i} style={{
            borderLeft: '3px solid #0ea5e9',
            paddingLeft: '1.25rem',
            marginBottom: '1.75rem',
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', marginTop: 0 }}>{q}</h3>
            <p style={{ margin: 0, color: '#334155', lineHeight: '1.75' }}>{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
