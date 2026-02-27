'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'AWS Lambda Complete Guide: Serverless Functions, API Gateway, and Event-Driven Architecture',
    intro: 'AWS Lambda lets you run code without provisioning or managing servers. You pay only for the compute time you consume, and Lambda scales automatically from a few requests per day to thousands per second. This guide covers Lambda fundamentals, handler patterns in Node.js and Python, API Gateway integration, event sources, layers, DynamoDB operations, Step Functions, performance tuning, testing, and monitoring.',
    tldr: 'AWS Lambda is a serverless compute service that runs your code in response to events. It supports Node.js, Python, Java, Go, .NET, and custom runtimes. Key concepts: handler functions process events, cold starts occur on new containers, API Gateway provides HTTP endpoints, and event sources like S3, DynamoDB Streams, and SQS trigger functions automatically. Use provisioned concurrency for latency-sensitive workloads, Lambda Layers for shared dependencies, and SAM for infrastructure as code.',
    takeaway1: 'Lambda charges per request and per GB-second of compute. The free tier includes 1M requests and 400,000 GB-seconds per month.',
    takeaway2: 'Cold starts range from 100ms (Node.js/Python) to 1-2s (Java/.NET). Use provisioned concurrency to eliminate them for critical paths.',
    takeaway3: 'Initialize SDK clients and database connections outside the handler to reuse them across warm invocations.',
    takeaway4: 'API Gateway + Lambda is the most common pattern for building serverless REST APIs.',
    takeaway5: 'Lambda Layers let you share code and dependencies across multiple functions without bundling them in each deployment.',
    takeaway6: 'Use AWS SAM or CDK for infrastructure as code. SAM extends CloudFormation with serverless-specific shortcuts.',
    h2Fundamentals: 'Lambda Fundamentals',
    fundamentalsDesc: 'Lambda runs your code in short-lived containers managed by AWS. When a request arrives, Lambda either reuses a warm container or creates a new one (cold start). The execution environment persists between invocations, so variables declared outside the handler are reused.',
    h3ExecutionModel: 'Execution Model',
    executionModelDesc: 'Each Lambda function has an init phase (cold start) and an invoke phase. During init, Lambda downloads your code, starts the runtime, and runs initialization code. The invoke phase executes your handler. Cold starts add 100ms to 2s of latency depending on runtime and package size.',
    h3ColdStarts: 'Cold Start Factors',
    coldStartCol1: 'Factor',
    coldStartCol2: 'Impact',
    coldStartCol3: 'Mitigation',
    cs1c1: 'Runtime',
    cs1c2: 'Node.js/Python: ~100-200ms, Java: ~1-2s',
    cs1c3: 'Choose lightweight runtimes',
    cs2c1: 'Package size',
    cs2c2: 'Larger packages increase download time',
    cs2c3: 'Tree-shake, use layers',
    cs3c1: 'VPC',
    cs3c2: 'VPC-attached adds 1-5s (improved with Hyperplane)',
    cs3c3: 'Avoid VPC unless needed',
    cs4c1: 'Memory',
    cs4c2: 'More memory = more CPU = faster init',
    cs4c3: 'Allocate 512MB+ for faster starts',
    h2NodeHandler: 'Lambda with Node.js',
    nodeHandlerDesc: 'Node.js is the most popular Lambda runtime. The handler receives an event object and a context object. Return a value or throw an error.',
    h2PythonHandler: 'Lambda with Python',
    pythonHandlerDesc: 'Python is the second most popular Lambda runtime. The handler pattern is similar to Node.js but uses Python conventions.',
    h2ApiGateway: 'API Gateway Integration',
    apiGatewayDesc: 'API Gateway provides HTTP endpoints that trigger Lambda functions. It handles routing, request validation, authorization, throttling, and CORS. The most common setup is a REST API with Lambda proxy integration.',
    h3RestConfig: 'REST API Configuration',
    restConfigDesc: 'With Lambda proxy integration, API Gateway passes the entire HTTP request to Lambda and expects a specific response format.',
    h2EventSources: 'Event Sources',
    eventSourcesDesc: 'Lambda can be triggered by many AWS services. Each event source provides a different event structure.',
    h3S3: 'S3 Events',
    s3Desc: 'Trigger Lambda when objects are created, modified, or deleted in an S3 bucket.',
    h3DynamoStreams: 'DynamoDB Streams',
    dynamoStreamsDesc: 'Process changes to DynamoDB tables in real-time. Each stream record contains the old and new item images.',
    h3SQS: 'SQS',
    sqsDesc: 'Process messages from an SQS queue. Lambda polls the queue and invokes your function with batches of messages.',
    h2Layers: 'Lambda Layers and Dependencies',
    layersDesc: 'Layers let you package libraries, custom runtimes, and configuration files separately from your function code. A function can use up to 5 layers. Layers are extracted to /opt in the execution environment.',
    h2EnvSecrets: 'Environment Variables and Secrets',
    envSecretsDesc: 'Use environment variables for configuration and AWS Systems Manager Parameter Store or Secrets Manager for sensitive values. Environment variables are encrypted at rest and can be encrypted in transit with KMS.',
    h2DynamoDB: 'Lambda with DynamoDB',
    dynamoDBDesc: 'DynamoDB is the most common database for Lambda because it scales seamlessly and has single-digit millisecond latency. Use the AWS SDK v3 for smaller bundle size.',
    h2StepFunctions: 'Step Functions',
    stepFunctionsDesc: 'Step Functions orchestrate multiple Lambda functions into workflows. They handle retries, error handling, parallel execution, and state management. Define workflows using Amazon States Language (ASL).',
    h2Performance: 'Performance Optimization',
    performanceDesc: 'Lambda performance depends on memory allocation, package size, and initialization code. Memory scales linearly with CPU power.',
    h3ProvisionedConcurrency: 'Provisioned Concurrency',
    provisionedDesc: 'Pre-warms execution environments to eliminate cold starts. Use it for latency-sensitive APIs. Costs apply even when idle.',
    h3MemoryTuning: 'Memory Tuning',
    memoryTuningDesc: 'Lambda allocates CPU proportional to memory. At 1769 MB you get 1 full vCPU. More memory often reduces duration and total cost.',
    h2Testing: 'Testing Lambda Functions',
    testingDesc: 'Use SAM CLI for local testing and the AWS SDK for integration tests. SAM CLI emulates the Lambda runtime locally.',
    h2IaC: 'Infrastructure as Code with SAM',
    iacDesc: 'AWS SAM (Serverless Application Model) extends CloudFormation with serverless-specific resource types. A SAM template defines functions, APIs, event sources, and permissions in a single YAML file.',
    h2Monitoring: 'Monitoring and Debugging',
    monitoringDesc: 'Lambda integrates with CloudWatch for logs and metrics, and X-Ray for distributed tracing. Every invocation automatically logs to CloudWatch.',
    h3CloudWatch: 'CloudWatch Metrics',
    cloudWatchDesc: 'Lambda emits metrics for invocations, duration, errors, throttles, and concurrent executions. Set alarms on error rate and duration.',
    h3XRay: 'X-Ray Tracing',
    xRayDesc: 'X-Ray traces requests across Lambda, API Gateway, DynamoDB, and other AWS services. Enable active tracing in the function configuration.',
    h2Limits: 'Lambda Limits and Quotas',
    limitsDesc: 'Understanding Lambda limits helps you design functions that stay within service boundaries. These are the most commonly encountered limits.',
    limitsCol1: 'Resource',
    limitsCol2: 'Default Limit',
    limitsCol3: 'Adjustable',
    lim1c1: 'Concurrent executions',
    lim1c2: '1,000 per region',
    lim1c3: 'Yes (up to tens of thousands)',
    lim2c1: 'Timeout',
    lim2c2: '15 minutes (900 seconds)',
    lim2c3: 'No (hard limit)',
    lim3c1: 'Memory',
    lim3c2: '128 MB to 10,240 MB',
    lim3c3: 'No',
    lim4c1: 'Deployment package (zip)',
    lim4c2: '50 MB direct, 250 MB unzipped',
    lim4c3: 'No (use container images for larger)',
    lim5c1: 'Ephemeral storage (/tmp)',
    lim5c2: '512 MB to 10,240 MB',
    lim5c3: 'Configurable',
    lim6c1: 'Environment variable size',
    lim6c2: '4 KB total',
    lim6c3: 'No',
    lim7c1: 'Layers per function',
    lim7c2: '5',
    lim7c3: 'No',
    h2ErrorHandling: 'Error Handling Patterns',
    errorHandlingDesc: 'Proper error handling is critical for Lambda reliability. The approach differs between synchronous invocations (API Gateway) and asynchronous invocations (S3, SNS, EventBridge). For sync, return structured error responses. For async, configure dead-letter queues and Lambda destinations.',
    h2Deployment: 'Deployment Best Practices',
    deploymentDesc: 'Use aliases and versions for safe deployments. Lambda versions are immutable snapshots of your function code and configuration. Aliases are pointers to versions that enable traffic shifting and rollback.',
    deployTip1: 'Use $LATEST for development, numbered versions for staging/production',
    deployTip2: 'Create aliases (dev, staging, prod) pointing to specific versions',
    deployTip3: 'Use weighted aliases for canary deployments (90% v1, 10% v2)',
    deployTip4: 'Enable CodeDeploy hooks for pre/post traffic shift validation',
    deployTip5: 'Pin API Gateway stages to Lambda aliases, not $LATEST',
    deployTip6: 'Automate deployments with SAM pipelines or GitHub Actions',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is the maximum execution time for Lambda?',
    faq1A: 'Lambda functions can run for up to 15 minutes (900 seconds). For longer workloads, use Step Functions to chain multiple Lambda invocations, or consider ECS/Fargate for long-running tasks.',
    faq2Q: 'How much does AWS Lambda cost?',
    faq2A: 'Lambda pricing has two components: $0.20 per 1M requests and $0.0000166667 per GB-second. The free tier includes 1M requests and 400,000 GB-seconds per month, which is enough for many small applications.',
    faq3Q: 'How do I reduce cold start times?',
    faq3A: 'Use lightweight runtimes (Node.js or Python), minimize package size with tree-shaking, keep functions out of VPCs unless necessary, allocate more memory for faster init, and use provisioned concurrency for critical paths.',
    faq4Q: 'Can Lambda connect to a relational database?',
    faq4A: 'Yes, but use RDS Proxy to manage connection pooling. Without it, Lambda can exhaust database connections during traffic spikes because each concurrent execution opens its own connection.',
    faq5Q: 'What is the maximum deployment package size?',
    faq5A: 'The deployment package limit is 50 MB (zipped) for direct upload or 250 MB (unzipped) including layers. For larger packages, use container images up to 10 GB.',
    faq6Q: 'How do Lambda Layers work?',
    faq6A: 'Layers are ZIP archives containing libraries or dependencies. They are extracted to /opt in the execution environment. A function can reference up to 5 layers. Layers are versioned and can be shared across functions and accounts.',
    faq7Q: 'What is the difference between synchronous and asynchronous invocation?',
    faq7A: 'Synchronous invocation waits for the function to complete and returns the result (API Gateway, SDK invoke). Asynchronous invocation queues the event and returns immediately (S3, SNS, EventBridge). Lambda handles retries for async failures.',
    faq8Q: 'How do I handle errors in Lambda?',
    faq8A: 'For synchronous invocations, return appropriate HTTP status codes. For async invocations, configure a dead-letter queue (SQS or SNS) or a Lambda destination for failed events. Use structured logging with request IDs for debugging.',
  },
  zh: {
    title: 'AWS Lambda 完全指南：无服务器函数、API Gateway 和事件驱动架构',
    intro: 'AWS Lambda 让你无需配置或管理服务器即可运行代码。你只需为消耗的计算时间付费，Lambda 会自动扩展。本指南涵盖 Lambda 基础、Node.js 和 Python 处理程序模式、API Gateway 集成、事件源、层、DynamoDB 操作、Step Functions、性能调优、测试和监控。',
    tldr: 'AWS Lambda 是一种无服务器计算服务，响应事件运行代码。支持 Node.js、Python、Java、Go、.NET 和自定义运行时。关键概念：处理函数处理事件，冷启动发生在新容器上，API Gateway 提供 HTTP 端点，S3、DynamoDB Streams 和 SQS 等事件源自动触发函数。',
    takeaway1: 'Lambda 按请求和每 GB 秒计算收费。免费层每月包含 100 万请求和 400,000 GB 秒。',
    takeaway2: '冷启动范围从 100ms（Node.js/Python）到 1-2s（Java/.NET）。使用预置并发消除关键路径的冷启动。',
    takeaway3: '在处理程序外初始化 SDK 客户端和数据库连接，以在热调用间重用。',
    takeaway4: 'API Gateway + Lambda 是构建无服务器 REST API 最常见的模式。',
    takeaway5: 'Lambda 层让你在多个函数间共享代码和依赖，无需在每次部署中捆绑。',
    takeaway6: '使用 AWS SAM 或 CDK 进行基础设施即代码。SAM 用无服务器特定快捷方式扩展 CloudFormation。',
    h2Fundamentals: 'Lambda 基础',
    fundamentalsDesc: 'Lambda 在 AWS 管理的短生命周期容器中运行代码。请求到达时，Lambda 重用温暖容器或创建新容器（冷启动）。',
    h3ExecutionModel: '执行模型',
    executionModelDesc: '每个 Lambda 函数有初始化阶段（冷启动）和调用阶段。冷启动增加 100ms 到 2s 的延迟。',
    h3ColdStarts: '冷启动因素',
    coldStartCol1: '因素',
    coldStartCol2: '影响',
    coldStartCol3: '缓解',
    cs1c1: '运行时',
    cs1c2: 'Node.js/Python: ~100-200ms, Java: ~1-2s',
    cs1c3: '选择轻量级运行时',
    cs2c1: '包大小',
    cs2c2: '更大的包增加下载时间',
    cs2c3: '摇树优化，使用层',
    cs3c1: 'VPC',
    cs3c2: 'VPC 附加增加 1-5s',
    cs3c3: '除非需要否则避免 VPC',
    cs4c1: '内存',
    cs4c2: '更多内存 = 更多 CPU = 更快初始化',
    cs4c3: '分配 512MB+ 以加快启动',
    h2NodeHandler: 'Lambda 与 Node.js',
    nodeHandlerDesc: 'Node.js 是最流行的 Lambda 运行时。处理程序接收事件对象和上下文对象。',
    h2PythonHandler: 'Lambda 与 Python',
    pythonHandlerDesc: 'Python 是第二流行的 Lambda 运行时。处理程序模式类似于 Node.js。',
    h2ApiGateway: 'API Gateway 集成',
    apiGatewayDesc: 'API Gateway 提供触发 Lambda 函数的 HTTP 端点，处理路由、请求验证、授权、限流和 CORS。',
    h3RestConfig: 'REST API 配置',
    restConfigDesc: '使用 Lambda 代理集成时，API Gateway 将整个 HTTP 请求传递给 Lambda。',
    h2EventSources: '事件源',
    eventSourcesDesc: 'Lambda 可由多种 AWS 服务触发，每个事件源提供不同的事件结构。',
    h3S3: 'S3 事件',
    s3Desc: '当 S3 存储桶中的对象被创建、修改或删除时触发 Lambda。',
    h3DynamoStreams: 'DynamoDB Streams',
    dynamoStreamsDesc: '实时处理 DynamoDB 表的更改。每个流记录包含旧的和新的项目映像。',
    h3SQS: 'SQS',
    sqsDesc: '处理 SQS 队列中的消息。Lambda 轮询队列并批量调用函数。',
    h2Layers: 'Lambda 层和依赖',
    layersDesc: '层让你将库、自定义运行时和配置文件与函数代码分开打包。函数最多可使用 5 个层。',
    h2EnvSecrets: '环境变量和密钥',
    envSecretsDesc: '使用环境变量进行配置，使用 Parameter Store 或 Secrets Manager 存储敏感值。',
    h2DynamoDB: 'Lambda 与 DynamoDB',
    dynamoDBDesc: 'DynamoDB 是 Lambda 最常用的数据库，因为它无缝扩展且具有个位数毫秒延迟。',
    h2StepFunctions: 'Step Functions',
    stepFunctionsDesc: 'Step Functions 将多个 Lambda 函数编排成工作流，处理重试、错误处理和并行执行。',
    h2Performance: '性能优化',
    performanceDesc: 'Lambda 性能取决于内存分配、包大小和初始化代码。内存与 CPU 能力线性扩展。',
    h3ProvisionedConcurrency: '预置并发',
    provisionedDesc: '预热执行环境以消除冷启动。用于延迟敏感的 API。',
    h3MemoryTuning: '内存调优',
    memoryTuningDesc: 'Lambda 按内存比例分配 CPU。1769 MB 获得 1 个完整 vCPU。',
    h2Testing: '测试 Lambda 函数',
    testingDesc: '使用 SAM CLI 进行本地测试，使用 AWS SDK 进行集成测试。',
    h2IaC: '使用 SAM 的基础设施即代码',
    iacDesc: 'AWS SAM 用无服务器特定资源类型扩展 CloudFormation。',
    h2Monitoring: '监控和调试',
    monitoringDesc: 'Lambda 与 CloudWatch 集成用于日志和指标，与 X-Ray 集成用于分布式追踪。',
    h3CloudWatch: 'CloudWatch 指标',
    cloudWatchDesc: 'Lambda 发出调用次数、持续时间、错误、限流和并发执行的指标。',
    h3XRay: 'X-Ray 追踪',
    xRayDesc: 'X-Ray 跨 Lambda、API Gateway、DynamoDB 追踪请求。在函数配置中启用主动追踪。',
    h2Limits: 'Lambda 限制和配额',
    limitsDesc: '了解 Lambda 限制有助于设计在服务边界内的函数。以下是最常遇到的限制。',
    limitsCol1: '资源',
    limitsCol2: '默认限制',
    limitsCol3: '可调整',
    lim1c1: '并发执行',
    lim1c2: '每区域 1,000',
    lim1c3: '是（最高数万）',
    lim2c1: '超时',
    lim2c2: '15 分钟（900 秒）',
    lim2c3: '否（硬限制）',
    lim3c1: '内存',
    lim3c2: '128 MB 到 10,240 MB',
    lim3c3: '否',
    lim4c1: '部署包（zip）',
    lim4c2: '直接上传 50 MB，解压 250 MB',
    lim4c3: '否（使用容器镜像）',
    lim5c1: '临时存储（/tmp）',
    lim5c2: '512 MB 到 10,240 MB',
    lim5c3: '可配置',
    lim6c1: '环境变量大小',
    lim6c2: '总共 4 KB',
    lim6c3: '否',
    lim7c1: '每函数层数',
    lim7c2: '5',
    lim7c3: '否',
    h2ErrorHandling: '错误处理模式',
    errorHandlingDesc: '正确的错误处理对 Lambda 可靠性至关重要。同步调用（API Gateway）和异步调用（S3、SNS）的处理方式不同。同步返回结构化错误响应，异步配置死信队列和 Lambda 目标。',
    h2Deployment: '部署最佳实践',
    deploymentDesc: '使用别名和版本进行安全部署。Lambda 版本是函数代码和配置的不可变快照。别名是指向版本的指针，支持流量转移和回滚。',
    deployTip1: '开发使用 $LATEST，暂存/生产使用编号版本',
    deployTip2: '创建别名（dev、staging、prod）指向特定版本',
    deployTip3: '使用加权别名进行金丝雀部署（90% v1, 10% v2）',
    deployTip4: '启用 CodeDeploy 钩子进行流量转移前后验证',
    deployTip5: '将 API Gateway 阶段绑定到 Lambda 别名，而非 $LATEST',
    deployTip6: '使用 SAM 管道或 GitHub Actions 自动化部署',
    h2Faq: '常见问题',
    faq1Q: 'Lambda 的最大执行时间是多少？',
    faq1A: 'Lambda 函数最多可运行 15 分钟。对于更长的工作负载，使用 Step Functions 或 ECS/Fargate。',
    faq2Q: 'AWS Lambda 费用多少？',
    faq2A: '按请求（每百万 $0.20）和每 GB 秒收费。免费层每月包含 100 万请求。',
    faq3Q: '如何减少冷启动时间？',
    faq3A: '使用轻量级运行时，最小化包大小，避免不必要的 VPC，分配更多内存，使用预置并发。',
    faq4Q: 'Lambda 能连接关系数据库吗？',
    faq4A: '可以，但使用 RDS Proxy 管理连接池。否则 Lambda 可能耗尽数据库连接。',
    faq5Q: '最大部署包大小是多少？',
    faq5A: '直接上传 50 MB（压缩），含层 250 MB（解压）。容器镜像最大 10 GB。',
    faq6Q: 'Lambda 层如何工作？',
    faq6A: '层是包含库的 ZIP 归档，提取到 /opt。函数最多引用 5 个层。',
    faq7Q: '同步和异步调用有什么区别？',
    faq7A: '同步调用等待完成并返回结果。异步调用将事件入队并立即返回。',
    faq8Q: '如何处理 Lambda 中的错误？',
    faq8A: '同步调用返回 HTTP 状态码。异步调用配置死信队列或 Lambda 目标。使用结构化日志调试。',
  },
};

export default function AwsLambdaGuide({ lang }: { lang: string }) {
  const isZh = lang === 'zh';
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

  const h2Style: React.CSSProperties = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' };
  const h3Style: React.CSSProperties = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' };
  const pStyle: React.CSSProperties = { marginBottom: '1rem', lineHeight: '1.7' };
  const preStyle: React.CSSProperties = { backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.6' };
  const thStyle: React.CSSProperties = { padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 600 };
  const tdStyle: React.CSSProperties = { padding: '0.75rem', borderBottom: '1px solid #e2e8f0' };
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1rem 1.5rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <strong>TL;DR:</strong> {t.tldr}
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem', marginTop: 0 }}>
          {isZh ? '关键要点' : 'Key Takeaways'}
        </h3>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: 0 }}>
          {[t.takeaway1, t.takeaway2, t.takeaway3, t.takeaway4, t.takeaway5, t.takeaway6].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* 1. Lambda Fundamentals */}
      <h2 style={h2Style}>{t.h2Fundamentals}</h2>
      <p style={pStyle}>{t.fundamentalsDesc}</p>

      <h3 style={h3Style}>{t.h3ExecutionModel}</h3>
      <p style={pStyle}>{t.executionModelDesc}</p>
      <pre style={preStyle}><code>{'// Lambda execution lifecycle\n' +
'// INIT PHASE (cold start only)\n' +
'const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");\n' +
'const client = new DynamoDBClient({}); // reused across invocations\n' +
'\n' +
'// INVOKE PHASE (every request)\n' +
'exports.handler = async (event, context) => {\n' +
'  console.log("Request ID:", context.awsRequestId);\n' +
'  console.log("Time left:", context.getRemainingTimeInMillis(), "ms");\n' +
'  return { statusCode: 200, body: "OK" };\n' +
'};'}</code></pre>

      <h3 style={h3Style}>{t.h3ColdStarts}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.coldStartCol1}</th>
            <th style={thStyle}>{t.coldStartCol2}</th>
            <th style={thStyle}>{t.coldStartCol3}</th>
          </tr>
        </thead>
        <tbody>
          {[
            [t.cs1c1, t.cs1c2, t.cs1c3],
            [t.cs2c1, t.cs2c2, t.cs2c3],
            [t.cs3c1, t.cs3c2, t.cs3c3],
            [t.cs4c1, t.cs4c2, t.cs4c3],
          ].map((row, i) => (
            <tr key={i}>
              <td style={tdStyle}>{row[0]}</td>
              <td style={tdStyle}>{row[1]}</td>
              <td style={tdStyle}>{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 2. Node.js Handler */}
      <h2 style={h2Style}>{t.h2NodeHandler}</h2>
      <p style={pStyle}>{t.nodeHandlerDesc}</p>
      <pre style={preStyle}><code>{'// index.mjs (ES module handler)\n' +
'export const handler = async (event, context) => {\n' +
'  const { httpMethod, path, body, queryStringParameters } = event;\n' +
'\n' +
'  try {\n' +
'    const data = JSON.parse(body || "{}");\n' +
'    return {\n' +
'      statusCode: 200,\n' +
'      headers: { "Content-Type": "application/json" },\n' +
'      body: JSON.stringify({ message: "Success", input: data }),\n' +
'    };\n' +
'  } catch (err) {\n' +
'    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };\n' +
'  }\n' +
'};'}</code></pre>

      {/* 3. Python Handler */}
      <h2 style={h2Style}>{t.h2PythonHandler}</h2>
      <p style={pStyle}>{t.pythonHandlerDesc}</p>
      <pre style={preStyle}><code>{'# lambda_function.py\n' +
'import json\n' +
'import boto3\n' +
'\n' +
'# Init outside handler (reused on warm starts)\n' +
's3 = boto3.client("s3")\n' +
'\n' +
'def handler(event, context):\n' +
'    body = json.loads(event.get("body", "{}"))\n' +
'    return {\n' +
'        "statusCode": 200,\n' +
'        "headers": {"Content-Type": "application/json"},\n' +
'        "body": json.dumps({"message": "Hello", "input": body})\n' +
'    }'}</code></pre>

      {/* 4. API Gateway */}
      <h2 style={h2Style}>{t.h2ApiGateway}</h2>
      <p style={pStyle}>{t.apiGatewayDesc}</p>

      <h3 style={h3Style}>{t.h3RestConfig}</h3>
      <p style={pStyle}>{t.restConfigDesc}</p>
      <pre style={preStyle}><code>{'// API Gateway Lambda Proxy - event structure\n' +
'// event.httpMethod    -> "GET", "POST", etc.\n' +
'// event.path          -> "/users/123"\n' +
'// event.headers       -> { "Content-Type": "..." }\n' +
'// event.queryStringParameters -> { "page": "1" }\n' +
'// event.body          -> "{...}" (string)\n' +
'\n' +
'exports.handler = async (event) => {\n' +
'  if (event.httpMethod === "GET" && event.path === "/users") {\n' +
'    return {\n' +
'      statusCode: 200,\n' +
'      headers: {\n' +
'        "Content-Type": "application/json",\n' +
'        "Access-Control-Allow-Origin": "*"\n' +
'      },\n' +
'      body: JSON.stringify([{ id: 1, name: "Alice" }])\n' +
'    };\n' +
'  }\n' +
'  return { statusCode: 404, body: "Not Found" };\n' +
'};'}</code></pre>

      {/* 5. Event Sources */}
      <h2 style={h2Style}>{t.h2EventSources}</h2>
      <p style={pStyle}>{t.eventSourcesDesc}</p>

      <h3 style={h3Style}>{t.h3S3}</h3>
      <p style={pStyle}>{t.s3Desc}</p>
      <pre style={preStyle}><code>{'// S3 event handler\n' +
'exports.handler = async (event) => {\n' +
'  for (const record of event.Records) {\n' +
'    const bucket = record.s3.bucket.name;\n' +
'    const key = decodeURIComponent(record.s3.object.key);\n' +
'    console.log("New object:", bucket, key);\n' +
'    // Process the uploaded file\n' +
'  }\n' +
'};'}</code></pre>

      <h3 style={h3Style}>{t.h3DynamoStreams}</h3>
      <p style={pStyle}>{t.dynamoStreamsDesc}</p>
      <pre style={preStyle}><code>{'// DynamoDB Streams handler\n' +
'exports.handler = async (event) => {\n' +
'  for (const record of event.Records) {\n' +
'    const { eventName, dynamodb } = record;\n' +
'    if (eventName === "INSERT") {\n' +
'      console.log("New item:", JSON.stringify(dynamodb.NewImage));\n' +
'    } else if (eventName === "MODIFY") {\n' +
'      console.log("Updated:", JSON.stringify(dynamodb.NewImage));\n' +
'    }\n' +
'  }\n' +
'};'}</code></pre>

      <h3 style={h3Style}>{t.h3SQS}</h3>
      <p style={pStyle}>{t.sqsDesc}</p>
      <pre style={preStyle}><code>{'// SQS handler with batch processing\n' +
'exports.handler = async (event) => {\n' +
'  const failures = [];\n' +
'  for (const record of event.Records) {\n' +
'    try {\n' +
'      const body = JSON.parse(record.body);\n' +
'      await processMessage(body);\n' +
'    } catch (err) {\n' +
'      failures.push({ itemIdentifier: record.messageId });\n' +
'    }\n' +
'  }\n' +
'  return { batchItemFailures: failures };\n' +
'};'}</code></pre>

      {/* 6. Layers */}
      <h2 style={h2Style}>{t.h2Layers}</h2>
      <p style={pStyle}>{t.layersDesc}</p>
      <pre style={preStyle}><code>{'# Create a Lambda Layer\n' +
'mkdir -p layer/nodejs && cd layer/nodejs\n' +
'npm init -y\n' +
'npm install sharp axios\n' +
'cd ..\n' +
'zip -r my-layer.zip nodejs/\n' +
'\n' +
'# Publish the layer\n' +
'aws lambda publish-layer-version \\\n' +
'  --layer-name my-deps \\\n' +
'  --zip-file fileb://my-layer.zip \\\n' +
'  --compatible-runtimes nodejs20.x\n' +
'\n' +
'# Attach layer to function\n' +
'aws lambda update-function-configuration \\\n' +
'  --function-name my-func \\\n' +
'  --layers arn:aws:lambda:us-east-1:123:layer:my-deps:1'}</code></pre>

      {/* 7. Environment Variables */}
      <h2 style={h2Style}>{t.h2EnvSecrets}</h2>
      <p style={pStyle}>{t.envSecretsDesc}</p>
      <pre style={preStyle}><code>{'// Access env vars and secrets\n' +
'const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");\n' +
'const ssm = new SSMClient({});\n' +
'\n' +
'// Simple env var (set in Lambda config)\n' +
'const TABLE = process.env.TABLE_NAME;\n' +
'\n' +
'// Cached secret from Parameter Store\n' +
'let dbPassword;\n' +
'async function getSecret() {\n' +
'  if (!dbPassword) {\n' +
'    const resp = await ssm.send(new GetParameterCommand({\n' +
'      Name: "/myapp/db-password",\n' +
'      WithDecryption: true\n' +
'    }));\n' +
'    dbPassword = resp.Parameter.Value;\n' +
'  }\n' +
'  return dbPassword;\n' +
'}'}</code></pre>

      {/* 8. DynamoDB CRUD */}
      <h2 style={h2Style}>{t.h2DynamoDB}</h2>
      <p style={pStyle}>{t.dynamoDBDesc}</p>
      <pre style={preStyle}><code>{'const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");\n' +
'const { DynamoDBDocumentClient, PutCommand, GetCommand,\n' +
'  QueryCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");\n' +
'\n' +
'const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));\n' +
'const TABLE = process.env.TABLE_NAME;\n' +
'\n' +
'exports.handler = async (event) => {\n' +
'  // CREATE\n' +
'  await ddb.send(new PutCommand({\n' +
'    TableName: TABLE,\n' +
'    Item: { pk: "user#1", sk: "profile", name: "Alice" }\n' +
'  }));\n' +
'  // READ\n' +
'  const { Item } = await ddb.send(new GetCommand({\n' +
'    TableName: TABLE, Key: { pk: "user#1", sk: "profile" }\n' +
'  }));\n' +
'  // QUERY\n' +
'  const { Items } = await ddb.send(new QueryCommand({\n' +
'    TableName: TABLE,\n' +
'    KeyConditionExpression: "pk = :pk",\n' +
'    ExpressionAttributeValues: { ":pk": "user#1" }\n' +
'  }));\n' +
'  return { statusCode: 200, body: JSON.stringify(Items) };\n' +
'};'}</code></pre>

      {/* 9. Step Functions */}
      <h2 style={h2Style}>{t.h2StepFunctions}</h2>
      <p style={pStyle}>{t.stepFunctionsDesc}</p>
      <pre style={preStyle}><code>{'{\n' +
'  "Comment": "Order processing workflow",\n' +
'  "StartAt": "ValidateOrder",\n' +
'  "States": {\n' +
'    "ValidateOrder": {\n' +
'      "Type": "Task",\n' +
'      "Resource": "arn:aws:lambda:us-east-1:123:function:validate",\n' +
'      "Next": "ProcessPayment",\n' +
'      "Catch": [{\n' +
'        "ErrorEquals": ["ValidationError"],\n' +
'        "Next": "OrderFailed"\n' +
'      }]\n' +
'    },\n' +
'    "ProcessPayment": {\n' +
'      "Type": "Task",\n' +
'      "Resource": "arn:aws:lambda:us-east-1:123:function:payment",\n' +
'      "Next": "SendConfirmation"\n' +
'    },\n' +
'    "SendConfirmation": {\n' +
'      "Type": "Task",\n' +
'      "Resource": "arn:aws:lambda:us-east-1:123:function:notify",\n' +
'      "End": true\n' +
'    },\n' +
'    "OrderFailed": { "Type": "Fail", "Error": "OrderFailed" }\n' +
'  }\n' +
'}'}</code></pre>

      {/* 10. Performance */}
      <h2 style={h2Style}>{t.h2Performance}</h2>
      <p style={pStyle}>{t.performanceDesc}</p>

      <h3 style={h3Style}>{t.h3ProvisionedConcurrency}</h3>
      <p style={pStyle}>{t.provisionedDesc}</p>
      <pre style={preStyle}><code>{'# Enable provisioned concurrency\n' +
'aws lambda put-provisioned-concurrency-config \\\n' +
'  --function-name my-api \\\n' +
'  --qualifier prod \\\n' +
'  --provisioned-concurrent-executions 10\n' +
'\n' +
'# Auto-scale provisioned concurrency\n' +
'# Use Application Auto Scaling to adjust\n' +
'# based on utilization (target: 70%)'}</code></pre>

      <h3 style={h3Style}>{t.h3MemoryTuning}</h3>
      <p style={pStyle}>{t.memoryTuningDesc}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '内存' : 'Memory'}</th>
            <th style={thStyle}>vCPU</th>
            <th style={thStyle}>{isZh ? '适用场景' : 'Best For'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>128 MB</td><td style={tdStyle}>0.07</td><td style={tdStyle}>{isZh ? '简单路由/代理' : 'Simple routing/proxy'}</td></tr>
          <tr><td style={tdStyle}>512 MB</td><td style={tdStyle}>0.29</td><td style={tdStyle}>{isZh ? 'API + 数据库查询' : 'API + DB queries'}</td></tr>
          <tr><td style={tdStyle}>1769 MB</td><td style={tdStyle}>1.0</td><td style={tdStyle}>{isZh ? '数据处理/转换' : 'Data processing'}</td></tr>
          <tr><td style={tdStyle}>3008 MB</td><td style={tdStyle}>1.7</td><td style={tdStyle}>{isZh ? '图片/视频处理' : 'Image/video processing'}</td></tr>
          <tr><td style={tdStyle}>10240 MB</td><td style={tdStyle}>6.0</td><td style={tdStyle}>{isZh ? 'ML 推理' : 'ML inference'}</td></tr>
        </tbody>
      </table>

      {/* 11. Testing */}
      <h2 style={h2Style}>{t.h2Testing}</h2>
      <p style={pStyle}>{t.testingDesc}</p>
      <pre style={preStyle}><code>{'# Install SAM CLI\n' +
'brew install aws-sam-cli\n' +
'\n' +
'# Invoke locally with test event\n' +
'sam local invoke MyFunction -e events/api.json\n' +
'\n' +
'# Start local API Gateway\n' +
'sam local start-api\n' +
'# => http://127.0.0.1:3000/users\n' +
'\n' +
'# Generate sample events\n' +
'sam local generate-event s3 put \\\n' +
'  --bucket my-bucket --key test.txt > events/s3.json\n' +
'\n' +
'# Run unit tests (Jest example)\n' +
'# test/handler.test.js\n' +
'# const { handler } = require("../index");\n' +
'# test("returns 200", async () => {\n' +
'#   const event = { httpMethod: "GET", path: "/users" };\n' +
'#   const result = await handler(event);\n' +
'#   expect(result.statusCode).toBe(200);\n' +
'# });'}</code></pre>

      {/* 12. SAM Template */}
      <h2 style={h2Style}>{t.h2IaC}</h2>
      <p style={pStyle}>{t.iacDesc}</p>
      <pre style={preStyle}><code>{'# template.yaml\n' +
'AWSTemplateFormatVersion: "2010-09-09"\n' +
'Transform: AWS::Serverless-2016-10-31\n' +
'\n' +
'Globals:\n' +
'  Function:\n' +
'    Timeout: 30\n' +
'    Runtime: nodejs20.x\n' +
'    MemorySize: 512\n' +
'\n' +
'Resources:\n' +
'  ApiFunction:\n' +
'    Type: AWS::Serverless::Function\n' +
'    Properties:\n' +
'      Handler: src/index.handler\n' +
'      Events:\n' +
'        GetUsers:\n' +
'          Type: Api\n' +
'          Properties:\n' +
'            Path: /users\n' +
'            Method: get\n' +
'      Environment:\n' +
'        Variables:\n' +
'          TABLE_NAME: !Ref UsersTable\n' +
'      Policies:\n' +
'        - DynamoDBCrudPolicy:\n' +
'            TableName: !Ref UsersTable\n' +
'\n' +
'  UsersTable:\n' +
'    Type: AWS::DynamoDB::Table\n' +
'    Properties:\n' +
'      TableName: users\n' +
'      BillingMode: PAY_PER_REQUEST\n' +
'      AttributeDefinitions:\n' +
'        - AttributeName: pk\n' +
'          AttributeType: S\n' +
'      KeySchema:\n' +
'        - AttributeName: pk\n' +
'          KeyType: HASH'}</code></pre>

      {/* 13. Monitoring */}
      <h2 style={h2Style}>{t.h2Monitoring}</h2>
      <p style={pStyle}>{t.monitoringDesc}</p>

      <h3 style={h3Style}>{t.h3CloudWatch}</h3>
      <p style={pStyle}>{t.cloudWatchDesc}</p>
      <pre style={preStyle}><code>{'// Structured logging for CloudWatch\n' +
'exports.handler = async (event, context) => {\n' +
'  console.log(JSON.stringify({\n' +
'    level: "INFO",\n' +
'    requestId: context.awsRequestId,\n' +
'    message: "Processing request",\n' +
'    path: event.path,\n' +
'    method: event.httpMethod\n' +
'  }));\n' +
'\n' +
'  // CloudWatch Embedded Metric Format\n' +
'  console.log(JSON.stringify({\n' +
'    _aws: { Timestamp: Date.now(),\n' +
'      CloudWatchMetrics: [{\n' +
'        Namespace: "MyApp",\n' +
'        Dimensions: [["Function"]],\n' +
'        Metrics: [{ Name: "ProcessingTime", Unit: "Milliseconds" }]\n' +
'      }]\n' +
'    },\n' +
'    Function: context.functionName,\n' +
'    ProcessingTime: 42\n' +
'  }));\n' +
'};'}</code></pre>

      <h3 style={h3Style}>{t.h3XRay}</h3>
      <p style={pStyle}>{t.xRayDesc}</p>
      <pre style={preStyle}><code>{'# Enable X-Ray tracing via CLI\n' +
'aws lambda update-function-configuration \\\n' +
'  --function-name my-func \\\n' +
'  --tracing-config Mode=Active\n' +
'\n' +
'# SAM template\n' +
'# Properties:\n' +
'#   Tracing: Active\n' +
'\n' +
'# In code: wrap AWS SDK calls for tracing\n' +
'# const AWSXRay = require("aws-xray-sdk-core");\n' +
'# const AWS = AWSXRay.captureAWS(require("aws-sdk"));'}</code></pre>

      {/* Lambda Limits */}
      <h2 style={h2Style}>{t.h2Limits}</h2>
      <p style={pStyle}>{t.limitsDesc}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.limitsCol1}</th>
            <th style={thStyle}>{t.limitsCol2}</th>
            <th style={thStyle}>{t.limitsCol3}</th>
          </tr>
        </thead>
        <tbody>
          {[
            [t.lim1c1, t.lim1c2, t.lim1c3],
            [t.lim2c1, t.lim2c2, t.lim2c3],
            [t.lim3c1, t.lim3c2, t.lim3c3],
            [t.lim4c1, t.lim4c2, t.lim4c3],
            [t.lim5c1, t.lim5c2, t.lim5c3],
            [t.lim6c1, t.lim6c2, t.lim6c3],
            [t.lim7c1, t.lim7c2, t.lim7c3],
          ].map((row, i) => (
            <tr key={i}>
              <td style={tdStyle}>{row[0]}</td>
              <td style={tdStyle}>{row[1]}</td>
              <td style={tdStyle}>{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Error Handling Patterns */}
      <h2 style={h2Style}>{t.h2ErrorHandling}</h2>
      <p style={pStyle}>{t.errorHandlingDesc}</p>
      <pre style={preStyle}><code>{'// Robust error handling pattern\n' +
'class AppError extends Error {\n' +
'  constructor(message, statusCode, errorCode) {\n' +
'    super(message);\n' +
'    this.statusCode = statusCode;\n' +
'    this.errorCode = errorCode;\n' +
'  }\n' +
'}\n' +
'\n' +
'exports.handler = async (event, context) => {\n' +
'  try {\n' +
'    const result = await processRequest(event);\n' +
'    return {\n' +
'      statusCode: 200,\n' +
'      body: JSON.stringify(result)\n' +
'    };\n' +
'  } catch (err) {\n' +
'    console.error(JSON.stringify({\n' +
'      level: "ERROR",\n' +
'      requestId: context.awsRequestId,\n' +
'      error: err.message,\n' +
'      code: err.errorCode || "INTERNAL_ERROR"\n' +
'    }));\n' +
'    const statusCode = err.statusCode || 500;\n' +
'    return {\n' +
'      statusCode,\n' +
'      body: JSON.stringify({\n' +
'        error: err.errorCode || "INTERNAL_ERROR",\n' +
'        message: statusCode < 500 ? err.message : "Internal error"\n' +
'      })\n' +
'    };\n' +
'  }\n' +
'};'}</code></pre>

      {/* Deployment Best Practices */}
      <h2 style={h2Style}>{t.h2Deployment}</h2>
      <p style={pStyle}>{t.deploymentDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.deployTip1, t.deployTip2, t.deployTip3, t.deployTip4, t.deployTip5, t.deployTip6].map((tip, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.7' }}>{tip}</li>
        ))}
      </ul>
      <pre style={preStyle}><code>{'# Publish a new version\n' +
'aws lambda publish-version --function-name my-func\n' +
'\n' +
'# Create/update alias pointing to version 5\n' +
'aws lambda create-alias \\\n' +
'  --function-name my-func \\\n' +
'  --name prod --function-version 5\n' +
'\n' +
'# Canary deployment: shift 10% traffic to v6\n' +
'aws lambda update-alias \\\n' +
'  --function-name my-func \\\n' +
'  --name prod --function-version 6 \\\n' +
'  --routing-config AdditionalVersionWeights={"5"=0.9}'}</code></pre>

      {/* FAQ */}
      <h2 style={h2Style}>{t.h2Faq}</h2>
      {[
        [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A], [t.faq4Q, t.faq4A],
        [t.faq5Q, t.faq5A], [t.faq6Q, t.faq6A], [t.faq7Q, t.faq7A], [t.faq8Q, t.faq8A],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
          <p style={pStyle}>{a}</p>
        </div>
      ))}
    </article>
  );
}
