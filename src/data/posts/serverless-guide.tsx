'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Serverless Architecture Complete Guide 2026: AWS Lambda, Vercel, Cloudflare Workers, Cold Starts, and Cost Optimization',
    description: 'Master serverless computing: AWS Lambda, Vercel Functions, Cloudflare Workers, FaaS concepts, cold start optimization, serverless databases, event-driven architecture, monitoring, and cost strategies.',
    intro: 'Serverless computing has fundamentally changed how developers build and deploy applications. Instead of managing infrastructure, you write functions that run in response to events — and the cloud provider handles everything else. This comprehensive guide covers the full serverless ecosystem in 2026: from AWS Lambda and Vercel Functions to Cloudflare Workers, serverless databases, cold start mitigation, event-driven architecture, monitoring strategies, and cost optimization techniques.',
    tldrTitle: 'TL;DR',
    tldrText: 'Serverless lets you run code without managing servers — you pay only for actual execution time. AWS Lambda is the most feature-rich platform for backend logic; Vercel Functions excel at Next.js/frontend integration; Cloudflare Workers deliver sub-millisecond cold starts at the edge. The main tradeoffs are cold starts, execution time limits, and statelessness. Use serverless databases like Neon or Upstash Redis to complement your functions.',
    keyTakeawaysTitle: 'Key Takeaways',
    kt1: 'Serverless = no server management, auto-scaling, pay-per-execution billing model',
    kt2: 'AWS Lambda supports 15-minute max duration, 10GB memory, and 19+ runtimes including containers',
    kt3: 'Cloudflare Workers use V8 isolates for sub-millisecond cold starts across 300+ edge locations',
    kt4: 'Cold starts range from 0ms (Cloudflare) to 1s+ (Java/JVM on Lambda) — use provisioned concurrency or warming strategies',
    kt5: 'Serverless databases: PlanetScale (MySQL), Neon (Postgres), Turso (SQLite at edge), Upstash (Redis/Kafka)',
    kt6: 'Event-driven architecture with SNS/SQS/EventBridge unlocks powerful decoupled system designs',
    kt7: 'Use AWS CloudWatch, Datadog, or Lumigo for observability — distributed tracing is essential',
    kt8: 'Cost optimization: right-size memory, use ARM (Graviton2), minimize cold starts, batch S3/DynamoDB operations',
    h2WhatIs: 'What is Serverless? FaaS and the Serverless Paradigm',
    whatIsDesc: 'Serverless computing is a cloud execution model where the cloud provider dynamically allocates compute resources to run your code. The term "serverless" is misleading — servers still exist, but they are abstracted away from the developer. You focus entirely on writing code, not on provisioning EC2 instances, managing OS patches, or configuring load balancers.',
    faasTitle: 'Function as a Service (FaaS)',
    faasDesc: 'FaaS is the core building block of serverless. You package code as individual functions, each with a single responsibility. Functions are stateless, short-lived, and triggered by events. The platform handles scaling: if 10,000 requests arrive simultaneously, 10,000 function instances run in parallel automatically.',
    serverlessCharTitle: 'Core Characteristics of Serverless',
    sc1: 'No server management — no EC2, no OS updates, no capacity planning',
    sc2: 'Auto-scaling — from zero to millions of invocations without configuration',
    sc3: 'Pay-per-use — billed only for actual execution time (typically per 100ms or 1ms)',
    sc4: 'Event-driven — functions are triggered by HTTP, S3 events, database streams, queues, timers',
    sc5: 'Stateless — each invocation is independent; state must be stored in external services',
    sc6: 'Short-lived — execution time limits from 10 seconds (edge) to 15 minutes (Lambda)',
    h2Lambda: 'AWS Lambda: Functions, Triggers, Layers, and Cold Start Optimization',
    lambdaDesc: 'AWS Lambda is the most mature and feature-rich FaaS platform. Launched in 2014, it supports 19+ runtimes including Node.js, Python, Java, Go, Ruby, .NET, and custom container images up to 10GB. Lambda integrates natively with the entire AWS ecosystem: API Gateway, S3, DynamoDB, SQS, SNS, EventBridge, Kinesis, and more.',
    lambdaRuntimesTitle: 'Lambda Runtimes and Memory',
    lambdaRt1: 'Node.js 20/18 — fastest cold starts for JavaScript/TypeScript workloads',
    lambdaRt2: 'Python 3.12/3.11 — great for ML inference, data processing, scripting',
    lambdaRt3: 'Java 21 (with SnapStart) — enterprise JVM workloads with reduced cold starts',
    lambdaRt4: 'Go 1.x — compiled binary, very fast cold starts, low memory usage',
    lambdaRt5: '.NET 8 — C# and F# with Native AOT for faster startup',
    lambdaRt6: 'Container Images — Docker images up to 10GB, any language or framework',
    lambdaTriggersTitle: 'Lambda Triggers',
    lambdaTrig1: 'API Gateway / Function URL — HTTP/HTTPS endpoint for synchronous invocation',
    lambdaTrig2: 'S3 Events — triggered on object create, delete, modify',
    lambdaTrig3: 'DynamoDB Streams — process table changes in real-time',
    lambdaTrig4: 'SQS — pull messages from queues for batch processing',
    lambdaTrig5: 'SNS — fan-out notifications to multiple subscribers',
    lambdaTrig6: 'EventBridge — event bus for decoupled microservices',
    lambdaTrig7: 'CloudWatch Events / Cron — scheduled periodic invocations',
    lambdaTrig8: 'Kinesis Data Streams — real-time data stream processing',
    lambdaLayersTitle: 'Lambda Layers',
    lambdaLayersDesc: 'Lambda Layers are ZIP archives that contain libraries, custom runtimes, or other dependencies shared across multiple functions. Layers reduce deployment package size and enable dependency sharing. A function can use up to 5 layers, with a combined unzipped size of 250MB.',
    lambdaColdStartTitle: 'Cold Start Optimization',
    lambdaColdStartDesc: 'A cold start occurs when Lambda must initialize a new execution environment: download the code, start the runtime, and run initialization code outside the handler. Cold starts add 100ms to 1s+ of latency depending on runtime and package size.',
    coldStartMit1: 'Provisioned Concurrency — pre-warm a set number of execution environments (eliminates cold starts, adds cost)',
    coldStartMit2: 'Lambda SnapStart — Java-specific: snapshot the initialized JVM state, resume from snapshot (reduces 6-10s → sub-second)',
    coldStartMit3: 'Minimize package size — smaller ZIP means faster download; use tree-shaking, exclude dev dependencies',
    coldStartMit4: 'Move initialization outside handler — SDK clients, DB connections initialized once per container lifecycle',
    coldStartMit5: 'Use arm64 (Graviton2) — ~20% faster cold starts for Node.js and Python compared to x86',
    coldStartMit6: 'Keep functions warm — scheduled CloudWatch event every 5 minutes (free tier strategy)',
    h2Vercel: 'Vercel Functions and Edge Runtime',
    vercelDesc: 'Vercel Functions are serverless functions deeply integrated with the Next.js framework. They run in AWS Lambda under the hood but are abstracted through Vercel\'s platform with zero-config deployment, automatic edge routing, and tight integration with Next.js App Router features like Server Actions and Route Handlers.',
    vercelFunctionsTitle: 'Vercel Function Types',
    vf1: 'Serverless Functions — Node.js runtime, up to 30s (Hobby) / 300s (Pro), 1GB memory, full Node.js APIs',
    vf2: 'Edge Functions — V8 runtime, 30MB size limit, 30s execution, <1ms cold start, runs globally at Vercel\'s edge',
    vf3: 'Edge Middleware — runs before every request for auth, redirects, A/B testing; lightest weight',
    vercelEdgeTitle: 'Vercel Edge Runtime',
    vercelEdgeDesc: 'The Edge Runtime is a lightweight JavaScript runtime based on V8 isolates (not Node.js). It supports Web-standard APIs but not Node.js-specific APIs like fs, crypto (use Web Crypto instead), or native modules. Edge Functions run at Vercel\'s 100+ edge locations worldwide.',
    h2CloudflareWorkers: 'Cloudflare Workers: V8 Isolates, KV, and Durable Objects',
    cfDesc: 'Cloudflare Workers is a unique serverless platform that uses V8 isolates instead of containers or VMs. This architectural choice delivers sub-millisecond cold starts — the same JavaScript engine that runs in Chrome, but without the overhead of a full Node.js process. Workers run at 300+ Cloudflare data centers globally.',
    cfIsolatesTitle: 'Why V8 Isolates Matter',
    cfIso1: 'Zero cold start overhead — isolates start in under 5ms, often under 1ms',
    cfIso2: 'Memory efficiency — each isolate uses ~3MB vs 50-100MB for a Lambda container',
    cfIso3: 'True edge execution — not just replication, runs at the closest PoP to the user',
    cfIso4: 'No container boot — no OS, no Node.js startup, just V8 and your code',
    cfStorageTitle: 'Cloudflare Storage Options',
    cfSt1: 'Workers KV — globally replicated key-value store, eventual consistency, optimized for reads',
    cfSt2: 'D1 Database — SQLite at the edge, strongly consistent, full SQL, general availability 2024',
    cfSt3: 'R2 Object Storage — S3-compatible, zero egress fees, ideal for media and assets',
    cfSt4: 'Durable Objects — strongly consistent stateful compute, single-instance coordination, WebSockets',
    cfSt5: 'Queues — message queuing for background processing and fan-out',
    h2Frameworks: 'Serverless Framework vs SST vs AWS SAM',
    frameworksDesc: 'Several frameworks exist to simplify serverless development, deployment, and infrastructure management. Choosing the right one depends on your team\'s preferences, the complexity of your infrastructure, and your cloud provider.',
    sfTitle: 'Serverless Framework',
    sfDesc: 'The original serverless deployment tool. Uses serverless.yml for configuration and supports all major cloud providers. Version 4 (2024) introduced per-function billing on its platform. Best for: teams with existing Serverless Framework projects, multi-cloud deployments.',
    sstTitle: 'SST (Ion) — Serverless Stack',
    sstDesc: 'SST v3 (Ion) uses Pulumi under the hood with a TypeScript-first approach. It provides live Lambda development (code changes reflect instantly), resource binding (connect Lambda to RDS/DynamoDB with type-safe bindings), and a console for monitoring. Best for: TypeScript teams building on AWS.',
    samTitle: 'AWS SAM (Serverless Application Model)',
    samDesc: 'AWS\'s official framework for serverless. Uses CloudFormation-based YAML/JSON templates. Includes the SAM CLI for local testing with sam local invoke and sam local start-api. Best for: teams already invested in CloudFormation, enterprise environments requiring AWS-native tooling.',
    cdkTitle: 'AWS CDK',
    cdkDesc: 'The AWS Cloud Development Kit lets you define infrastructure in TypeScript, Python, Java, or Go. CDK synthesizes to CloudFormation, so it has access to every AWS service. Best for: complex infrastructure with many interconnected services.',
    h2EventDriven: 'Event-Driven Architecture with Serverless',
    eventDesc: 'Serverless functions excel in event-driven architectures because they are inherently stateless and event-triggered. The challenge is coordinating multiple functions, handling failures, and maintaining observability across asynchronous workflows.',
    eda1Title: 'SNS: Fan-Out Pattern',
    eda1Desc: 'Amazon SNS (Simple Notification Service) sends a message to multiple subscribers simultaneously. Each subscriber (SQS queue, Lambda, HTTP endpoint) receives the same message independently. Perfect for audit logging, cache invalidation, and notification systems.',
    eda2Title: 'SQS: Queue-Based Load Leveling',
    eda2Desc: 'Amazon SQS decouples producers and consumers. Lambda polls SQS queues in batches (up to 10,000 messages per batch). Failed messages go to a Dead Letter Queue (DLQ) for debugging. Essential for rate-limiting downstream systems and handling traffic spikes.',
    eda3Title: 'EventBridge: Event Bus',
    eda3Desc: 'EventBridge is a serverless event bus that routes events between AWS services, third-party SaaS apps, and your own applications. Rules filter events by content and route to targets. EventBridge Pipes enable point-to-point integrations with filtering and enrichment.',
    eda4Title: 'Step Functions: Orchestration',
    eda4Desc: 'AWS Step Functions orchestrate multiple Lambda functions into stateful workflows. The Express Workflows mode is optimized for high-volume, short-duration workflows. Standard Workflows support human approval steps, long-running tasks, and complex branching logic.',
    h2Databases: 'Serverless Databases: PlanetScale, Neon, Turso, Upstash Redis',
    dbDesc: 'Traditional databases are poor fits for serverless: they use persistent TCP connections (Lambda may open thousands), have per-connection overhead, and require VPC configuration. Serverless databases use HTTP APIs, connection pooling, and edge-optimized architectures.',
    psTitle: 'PlanetScale (MySQL)',
    psDesc: 'PlanetScale is a serverless MySQL-compatible database using Vitess (the technology behind YouTube\'s database). Key features: branching (database branches like Git branches), non-blocking schema changes, and a Boost feature for caching query results. The serverless driver uses HTTP, avoiding connection pool exhaustion.',
    neonTitle: 'Neon (PostgreSQL)',
    neonDesc: 'Neon is a serverless PostgreSQL with a unique architecture: compute and storage are separated. Compute scales to zero when idle (branch auto-suspend) and wakes in ~100ms. The serverless driver uses WebSockets for low-latency connections from edge environments. Neon supports database branching for dev/staging workflows.',
    tursoTitle: 'Turso (SQLite at the Edge)',
    tursoDesc: 'Turso extends libSQL (a fork of SQLite) to run as a distributed database. You can create databases in 30+ regions, with primary and replica nodes. The libSQL client works in Cloudflare Workers and edge runtimes. Ideal for applications needing per-tenant or per-user databases at low cost.',
    upstashTitle: 'Upstash Redis and Kafka',
    upstashDesc: 'Upstash provides serverless Redis and Kafka with per-request pricing (no per-hour billing). Redis is accessed via REST API, making it compatible with edge runtimes. Key use cases: rate limiting, session storage, caching, leaderboards. Upstash Kafka enables event streaming with serverless pricing.',
    h2ColdStart: 'The Cold Start Problem and Mitigation Strategies',
    coldStartDesc: 'A cold start is the latency penalty when a serverless platform initializes a new function instance. Understanding cold starts is critical for building responsive serverless applications.',
    coldStartPhases: 'Cold Start Phases',
    csp1: 'Code download — fetch ZIP/container from S3/ECR to the execution environment',
    csp2: 'Runtime initialization — start Node.js, Python, JVM, or other runtime process',
    csp3: 'Function initialization — run code outside your handler (imports, SDK setup, DB connections)',
    csp4: 'Handler invocation — finally execute your actual function code',
    coldStartTimes: 'Typical Cold Start Times by Runtime (AWS Lambda)',
    cst1: 'Node.js 20 — 200-400ms (lightweight functions), up to 1-2s with heavy SDKs',
    cst2: 'Python 3.12 — 200-500ms',
    cst3: 'Go — 50-150ms (compiled binary, no runtime initialization)',
    cst4: 'Java 21 (no SnapStart) — 2-10s; with SnapStart: 200-500ms',
    cst5: '.NET 8 Native AOT — 200-400ms (significant improvement over .NET 6)',
    cst6: 'Cloudflare Workers — 0-5ms (V8 isolates, not containers)',
    coldStartStrategiesTitle: 'Mitigation Strategies',
    csm1: 'Provisioned Concurrency (Lambda) — maintains N warm instances; eliminates cold starts but adds fixed cost',
    csm2: 'Lambda SnapStart (Java) — JVM state snapshot; Tiered Compilation for 50-80% cold start reduction',
    csm3: 'Warming functions — CloudWatch cron ping every 5 minutes; use concurrency parameter to warm multiple instances',
    csm4: 'Minimal dependencies — import only what you need; webpack/esbuild tree-shaking; lazy imports',
    csm5: 'Connection pooling — RDS Proxy for Aurora/RDS; PgBouncer equivalent for PostgreSQL',
    csm6: 'Edge runtimes — move latency-sensitive logic to Cloudflare Workers or Vercel Edge for 0ms cold starts',
    h2Monitoring: 'Monitoring Serverless: CloudWatch, Datadog, Lumigo',
    monitoringDesc: 'Serverless monitoring is harder than traditional application monitoring. Functions are ephemeral, distributed, and short-lived. You cannot SSH into a function instance. Distributed tracing and structured logging are essential.',
    cwTitle: 'AWS CloudWatch',
    cwDesc: 'CloudWatch is the native AWS monitoring service. Lambda automatically sends logs to CloudWatch Logs and metrics (invocations, duration, errors, throttles) to CloudWatch Metrics. CloudWatch Insights lets you query logs with a SQL-like syntax. Lambda Insights provides enhanced monitoring with memory usage, initialization duration, and more.',
    datadogTitle: 'Datadog',
    datadogDesc: 'Datadog\'s serverless monitoring uses a Lambda layer and forwarder. It collects enhanced metrics, distributed traces (APM), and logs in a unified view. The Datadog Lambda Extension sends data in-process, reducing the overhead of the forwarder pattern. Best for: teams already using Datadog for infrastructure monitoring.',
    lumigoTitle: 'Lumigo',
    lumigoDesc: 'Lumigo is purpose-built for serverless observability. It auto-instruments Lambda functions with zero code changes, provides visual end-to-end distributed tracing across Lambda-to-Lambda and Lambda-to-service calls, and alerts on anomalies. Lumigo\'s "execution timeline" view is particularly valuable for debugging complex serverless workflows.',
    xrayTitle: 'AWS X-Ray',
    xrayDesc: 'X-Ray provides distributed tracing for AWS-native architectures. Enable active tracing in Lambda to automatically trace function invocations. Add the X-Ray SDK to trace downstream calls to DynamoDB, S3, SNS, SQS, and HTTP endpoints. Service maps visualize the entire request flow.',
    h2Comparison: 'Serverless vs Containers vs Traditional Servers',
    comparisonDesc: 'Choosing the right compute model depends on your workload characteristics, team expertise, and cost profile. No single model is universally superior.',
    compPlatform: 'Platform',
    compColdStart: 'Cold Start',
    compMaxDuration: 'Max Duration',
    compScaling: 'Scaling',
    compPricing: 'Pricing Model',
    compBestFor: 'Best For',
    compLambda: 'AWS Lambda',
    compLambdaColdStart: '100ms-1s',
    compLambdaMax: '15 minutes',
    compLambdaScaling: 'Automatic (1000 concurrent/default)',
    compLambdaPricing: 'Per invocation + GB-second',
    compLambdaBest: 'Event processing, APIs, scheduled jobs',
    compVercel: 'Vercel Functions',
    compVercelColdStart: '50-500ms',
    compVercelMax: '30s (Hobby) / 300s (Pro)',
    compVercelScaling: 'Automatic',
    compVercelPricing: 'Per invocation + GB-hour',
    compVercelBest: 'Next.js apps, full-stack web',
    compCF: 'Cloudflare Workers',
    compCFColdStart: '0-5ms',
    compCFMax: '30 seconds',
    compCFScaling: 'Automatic (no limit)',
    compCFPricing: 'Per request (10M free/month)',
    compCFBest: 'Edge logic, APIs, low-latency',
    compNetlify: 'Netlify Functions',
    compNetlifyColdStart: '100-500ms',
    compNetlifyMax: '10 seconds (background: 15 min)',
    compNetlifyScaling: 'Automatic',
    compNetlifyPricing: 'Per invocation + runtime minutes',
    compNetlifyBest: 'JAMstack sites, form handling',
    compContainers: 'Containers (ECS/Fargate)',
    compContainersColdStart: '30-60s (task launch)',
    compContainersMax: 'Unlimited',
    compContainersScaling: 'Minutes (task launch time)',
    compContainersPricing: 'Per vCPU/hour + memory/hour',
    compContainersBest: 'Long-running workloads, stateful apps',
    compTraditional: 'Traditional VMs',
    compTraditionalColdStart: 'None (always on)',
    compTraditionalMax: 'Unlimited',
    compTraditionalScaling: 'Manual or slow auto-scaling',
    compTraditionalPricing: 'Per hour (whether idle or busy)',
    compTraditionalBest: 'Predictable high-traffic, legacy apps',
    h2CostOpt: 'Cost Optimization for Serverless',
    costDesc: 'Serverless is often cheaper than traditional servers for variable workloads, but costs can spiral with poor configuration or high-volume steady-state traffic. Understanding the cost model and optimization levers is essential.',
    costFactorsTitle: 'Lambda Cost Factors',
    cf1: 'Invocations — $0.20 per 1M requests (400K free/month)',
    cf2: 'Compute — $0.0000166667 per GB-second (100ms increments)',
    cf3: 'Provisioned Concurrency — $0.000004646 per GB-second (always running)',
    cf4: 'Data Transfer — $0.09/GB out (first 1GB free)',
    costOptTitle: 'Cost Optimization Techniques',
    co1: 'Right-size memory — more memory = more vCPU = faster execution = potentially lower cost; benchmark with AWS Lambda Power Tuning',
    co2: 'Use ARM/Graviton2 — 20% cheaper and 19% better price/performance than x86',
    co3: 'Optimize package size — smaller packages = shorter cold starts = faster billed duration',
    co4: 'Batch operations — process SQS messages in batches of 10,000 instead of 1-at-a-time',
    co5: 'Use S3 Express One Zone — 10x lower request costs for high-frequency Lambda-to-S3 workloads',
    co6: 'Cache in-function — store frequently accessed data in Lambda memory across warm invocations',
    co7: 'Use DynamoDB DAX or ElastiCache — reduce Lambda execution time by caching DB results',
    co8: 'Avoid unnecessary async operations — parallel AWS SDK calls with Promise.all reduce duration',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'When should I NOT use serverless?',
    faq1A: 'Avoid serverless for: long-running processes exceeding 15 minutes (use ECS/EKS instead), applications requiring persistent in-memory state (use Redis or stateful containers), very high steady-state traffic where provisioned compute is cheaper, WebSocket applications requiring persistent connections (use Durable Objects or EC2), GPU-intensive workloads (Lambda lacks GPU support).',
    faq2Q: 'How do I handle database connections in Lambda?',
    faq2A: 'Lambda functions can exhaust database connection pools because each function instance opens its own connection. Solutions: (1) Use RDS Proxy as a connection pooler for Aurora/RDS, (2) Use serverless databases with HTTP APIs like PlanetScale, Neon, or Upstash, (3) Initialize connections outside the handler so they are reused across warm invocations, (4) Use DynamoDB instead of relational DB when possible.',
    faq3Q: 'What is the difference between synchronous and asynchronous Lambda invocation?',
    faq3A: 'Synchronous invocation (RequestResponse) waits for the function to complete and returns the result — used by API Gateway, ALB, Lambda Function URLs. Asynchronous invocation (Event) queues the request and returns immediately — used by S3, SNS, EventBridge. The caller does not wait. Lambda retries async failures up to 2 times. Use a Dead Letter Queue (DLQ) to capture failed async events.',
    faq4Q: 'How do I run serverless locally for development?',
    faq4A: 'Options: (1) SST dev command — deploys to AWS but enables live code reload with local file watching, (2) Serverless Offline plugin — simulates API Gateway and Lambda locally, (3) AWS SAM CLI — sam local invoke and sam local start-api for local testing, (4) Wrangler dev — Cloudflare Workers local development with full Workers API support, (5) Vercel dev — local Next.js + Functions development.',
    faq5Q: 'What are Lambda concurrency limits and how do I increase them?',
    faq5A: 'The default Lambda concurrency limit is 1,000 concurrent executions per region (across all functions). You can request limit increases through the AWS Service Quotas console (up to 10,000+ is common for production accounts). Reserved Concurrency guarantees a function gets a set number of concurrent executions. Provisioned Concurrency pre-warms instances and is useful for eliminating cold starts.',
    faq6Q: 'Is serverless suitable for machine learning inference?',
    faq6A: 'Yes, for many ML use cases. AWS Lambda supports Python and can run inference with scikit-learn, XGBoost, and even PyTorch (with careful package optimization). Lambda layers can package ML models up to 250MB. For larger models, use Lambda container images (up to 10GB). Lambda lacks GPU support — for GPU inference use SageMaker Serverless Inference or container-based solutions.',
    faq7Q: 'How does serverless handle secrets and environment variables?',
    faq7A: 'Lambda supports environment variables encrypted with AWS KMS. For production secrets, use AWS Secrets Manager or AWS Systems Manager Parameter Store — Lambda can fetch secrets at startup and cache them in memory across warm invocations. Avoid hardcoding secrets in environment variables for sensitive production data. Cloudflare Workers uses Wrangler secrets, stored encrypted and accessible as environment variables at runtime.',
    faq8Q: 'What is the maximum payload size for Lambda?',
    faq8A: 'Synchronous invocation (API Gateway): 6MB request, 6MB response. Asynchronous invocation: 256KB payload. For larger payloads, upload to S3 and pass the S3 URL as the event payload. Lambda Function URLs have the same 6MB limit as API Gateway. If you need to stream large responses, use Lambda Response Streaming (up to 20MB) introduced in 2023.',
  },
  zh: {
    title: 'Serverless 架构完全指南 2026：AWS Lambda、Vercel、Cloudflare Workers、冷启动与成本优化',
    description: '掌握无服务器计算：AWS Lambda、Vercel Functions、Cloudflare Workers、FaaS 概念、冷启动优化、无服务器数据库、事件驱动架构、监控和成本策略。',
    intro: '无服务器计算从根本上改变了开发者构建和部署应用的方式。你只需编写函数来响应事件，云提供商处理所有基础设施。本指南涵盖 2026 年完整的无服务器生态：AWS Lambda、Vercel Functions、Cloudflare Workers、无服务器数据库、冷启动优化、事件驱动架构、监控策略和成本优化技术。',
    tldrTitle: 'TL;DR',
    tldrText: '无服务器让你无需管理服务器即可运行代码——只为实际执行时间付费。AWS Lambda 是后端逻辑最成熟的平台；Vercel Functions 在 Next.js/前端集成方面表现出色；Cloudflare Workers 在边缘提供亚毫秒级冷启动。主要权衡是冷启动、执行时间限制和无状态性。',
    keyTakeawaysTitle: '关键要点',
    kt1: 'Serverless = 无服务器管理、自动扩展、按执行付费的计费模型',
    kt2: 'AWS Lambda 支持最长 15 分钟、10GB 内存和 19+ 运行时包括容器',
    kt3: 'Cloudflare Workers 使用 V8 隔离实现在 300+ 边缘位置的亚毫秒级冷启动',
    kt4: '冷启动从 0ms（Cloudflare）到 1s+（Java/JVM on Lambda）不等——使用预置并发或预热策略',
    kt5: '无服务器数据库：PlanetScale (MySQL)、Neon (Postgres)、Turso (边缘 SQLite)、Upstash (Redis/Kafka)',
    kt6: 'SNS/SQS/EventBridge 的事件驱动架构实现强大的解耦系统设计',
    kt7: '使用 AWS CloudWatch、Datadog 或 Lumigo 进行可观测性——分布式追踪至关重要',
    kt8: '成本优化：合理设置内存、使用 ARM (Graviton2)、减少冷启动、批量 S3/DynamoDB 操作',
    h2WhatIs: '什么是 Serverless？FaaS 和无服务器范式',
    whatIsDesc: '无服务器计算是一种云执行模型，云提供商动态分配计算资源来运行你的代码。"无服务器"这个名称有些误导——服务器仍然存在，但对开发者来说是抽象的。你完全专注于编写代码，而不是配置 EC2 实例、管理系统补丁或配置负载均衡器。',
    faasTitle: '函数即服务 (FaaS)',
    faasDesc: 'FaaS 是无服务器的核心构建模块。你将代码打包为单一职责的独立函数。函数是无状态的、短暂的，由事件触发。平台处理扩展：如果同时收到 10,000 个请求，则自动并行运行 10,000 个函数实例。',
    serverlessCharTitle: '无服务器的核心特征',
    sc1: '无服务器管理——无需 EC2、无需 OS 更新、无需容量规划',
    sc2: '自动扩展——从零到数百万次调用，无需配置',
    sc3: '按使用付费——仅为实际执行时间计费（通常按 100ms 或 1ms）',
    sc4: '事件驱动——函数由 HTTP、S3 事件、数据库流、队列、定时器触发',
    sc5: '无状态——每次调用都是独立的；状态必须存储在外部服务中',
    sc6: '短暂——执行时间限制从 10 秒（边缘）到 15 分钟（Lambda）',
    h2Lambda: 'AWS Lambda：函数、触发器、层和冷启动优化',
    lambdaDesc: 'AWS Lambda 是最成熟、功能最丰富的 FaaS 平台。2014 年推出，支持 19+ 运行时，包括 Node.js、Python、Java、Go、Ruby、.NET 和最大 10GB 的自定义容器镜像。Lambda 与整个 AWS 生态系统原生集成：API Gateway、S3、DynamoDB、SQS、SNS、EventBridge、Kinesis 等。',
    lambdaRuntimesTitle: 'Lambda 运行时和内存',
    lambdaRt1: 'Node.js 20/18 — JavaScript/TypeScript 工作负载最快的冷启动',
    lambdaRt2: 'Python 3.12/3.11 — 适合 ML 推理、数据处理、脚本',
    lambdaRt3: 'Java 21（使用 SnapStart）— 通过 SnapStart 减少冷启动的企业 JVM 工作负载',
    lambdaRt4: 'Go 1.x — 编译二进制文件，冷启动非常快，内存使用低',
    lambdaRt5: '.NET 8 — 使用 Native AOT 的 C# 和 F# 以加快启动速度',
    lambdaRt6: '容器镜像 — 最大 10GB 的 Docker 镜像，任何语言或框架',
    lambdaTriggersTitle: 'Lambda 触发器',
    lambdaTrig1: 'API Gateway / Function URL — 用于同步调用的 HTTP/HTTPS 端点',
    lambdaTrig2: 'S3 事件 — 在对象创建、删除、修改时触发',
    lambdaTrig3: 'DynamoDB Streams — 实时处理表更改',
    lambdaTrig4: 'SQS — 从队列拉取消息进行批量处理',
    lambdaTrig5: 'SNS — 向多个订阅者扇出通知',
    lambdaTrig6: 'EventBridge — 解耦微服务的事件总线',
    lambdaTrig7: 'CloudWatch Events / Cron — 定时周期性调用',
    lambdaTrig8: 'Kinesis Data Streams — 实时数据流处理',
    lambdaLayersTitle: 'Lambda 层',
    lambdaLayersDesc: 'Lambda 层是包含库、自定义运行时或多个函数共享的其他依赖的 ZIP 存档。层减少了部署包大小并支持依赖共享。一个函数最多可以使用 5 个层，合并解压大小为 250MB。',
    lambdaColdStartTitle: '冷启动优化',
    lambdaColdStartDesc: '冷启动发生在 Lambda 必须初始化新执行环境时：下载代码、启动运行时，并运行处理程序外的初始化代码。冷启动会增加 100ms 到 1s+ 的延迟，具体取决于运行时和包大小。',
    coldStartMit1: '预置并发 — 预热一定数量的执行环境（消除冷启动，增加成本）',
    coldStartMit2: 'Lambda SnapStart — Java 专用：快照已初始化的 JVM 状态，从快照恢复（将 6-10s 减少到次秒级）',
    coldStartMit3: '最小化包大小 — 更小的 ZIP 意味着更快的下载；使用 tree-shaking，排除开发依赖',
    coldStartMit4: '将初始化移到处理程序外 — SDK 客户端、DB 连接在每个容器生命周期中初始化一次',
    coldStartMit5: '使用 arm64 (Graviton2) — 与 x86 相比，Node.js 和 Python 冷启动快约 20%',
    coldStartMit6: '保持函数热态 — 每 5 分钟触发一次 CloudWatch 事件（免费层策略）',
    h2Vercel: 'Vercel Functions 和 Edge Runtime',
    vercelDesc: 'Vercel Functions 是与 Next.js 框架深度集成的无服务器函数。它们在底层运行在 AWS Lambda 上，但通过 Vercel 平台进行了抽象，提供零配置部署、自动边缘路由，以及与 Next.js App Router 功能（如 Server Actions 和 Route Handlers）的紧密集成。',
    vercelFunctionsTitle: 'Vercel 函数类型',
    vf1: 'Serverless Functions — Node.js 运行时，最长 30s（Hobby）/300s（Pro），1GB 内存，完整 Node.js API',
    vf2: 'Edge Functions — V8 运行时，30MB 大小限制，30s 执行，<1ms 冷启动，在 Vercel 边缘全球运行',
    vf3: 'Edge Middleware — 在每个请求之前运行，用于认证、重定向、A/B 测试；最轻量级',
    vercelEdgeTitle: 'Vercel Edge Runtime',
    vercelEdgeDesc: 'Edge Runtime 是基于 V8 隔离的轻量级 JavaScript 运行时（不是 Node.js）。它支持 Web 标准 API，但不支持 Node.js 特有的 API（如 fs、crypto - 改用 Web Crypto）或原生模块。Edge Functions 在 Vercel 全球 100+ 边缘位置运行。',
    h2CloudflareWorkers: 'Cloudflare Workers：V8 隔离、KV 和 Durable Objects',
    cfDesc: 'Cloudflare Workers 是一个独特的无服务器平台，使用 V8 隔离而非容器或 VM。这种架构选择实现了亚毫秒级冷启动——与在 Chrome 中运行的同一 JavaScript 引擎，但没有完整 Node.js 进程的开销。Workers 在全球 300+ 个 Cloudflare 数据中心运行。',
    cfIsolatesTitle: 'V8 隔离的重要性',
    cfIso1: '零冷启动开销——隔离在 5ms 内启动，通常低于 1ms',
    cfIso2: '内存效率——每个隔离约 3MB，而 Lambda 容器需 50-100MB',
    cfIso3: '真正的边缘执行——不只是复制，在离用户最近的 PoP 运行',
    cfIso4: '无容器引导——没有 OS、没有 Node.js 启动，只有 V8 和你的代码',
    cfStorageTitle: 'Cloudflare 存储选项',
    cfSt1: 'Workers KV — 全球复制的键值存储，最终一致性，针对读取优化',
    cfSt2: 'D1 Database — 边缘 SQLite，强一致性，完整 SQL，2024 年正式可用',
    cfSt3: 'R2 Object Storage — 兼容 S3，零出口费用，适合媒体和资源',
    cfSt4: 'Durable Objects — 强一致性的有状态计算，单实例协调，WebSockets',
    cfSt5: 'Queues — 后台处理和扇出的消息队列',
    h2Frameworks: 'Serverless Framework vs SST vs AWS SAM',
    frameworksDesc: '有几种框架可以简化无服务器开发、部署和基础设施管理。选择合适的框架取决于你团队的偏好、基础设施的复杂性和云提供商。',
    sfTitle: 'Serverless Framework',
    sfDesc: '原始的无服务器部署工具。使用 serverless.yml 进行配置并支持所有主要云提供商。适合：拥有现有 Serverless Framework 项目的团队、多云部署。',
    sstTitle: 'SST (Ion) — Serverless Stack',
    sstDesc: 'SST v3 (Ion) 在底层使用 Pulumi，采用 TypeScript 优先的方式。提供实时 Lambda 开发（代码更改立即生效）、资源绑定（类型安全地将 Lambda 连接到 RDS/DynamoDB）和监控控制台。适合：在 AWS 上构建的 TypeScript 团队。',
    samTitle: 'AWS SAM（无服务器应用模型）',
    samDesc: 'AWS 官方无服务器框架。使用基于 CloudFormation 的 YAML/JSON 模板。包括 SAM CLI，可用 sam local invoke 和 sam local start-api 进行本地测试。适合：已投入 CloudFormation 的团队。',
    cdkTitle: 'AWS CDK',
    cdkDesc: 'AWS Cloud Development Kit 让你用 TypeScript、Python、Java 或 Go 定义基础设施。CDK 综合为 CloudFormation。适合：有许多相互关联服务的复杂基础设施。',
    h2EventDriven: '无服务器的事件驱动架构',
    eventDesc: '无服务器函数在事件驱动架构中表现出色，因为它们本质上是无状态且事件触发的。挑战在于协调多个函数、处理失败以及维护异步工作流的可观测性。',
    eda1Title: 'SNS：扇出模式',
    eda1Desc: 'Amazon SNS 同时将消息发送给多个订阅者。每个订阅者独立接收相同消息。非常适合审计日志、缓存失效和通知系统。',
    eda2Title: 'SQS：基于队列的负载均衡',
    eda2Desc: 'Amazon SQS 解耦生产者和消费者。Lambda 批量轮询 SQS 队列（每批最多 10,000 条消息）。失败的消息进入死信队列（DLQ）进行调试。',
    eda3Title: 'EventBridge：事件总线',
    eda3Desc: 'EventBridge 是一个无服务器事件总线，在 AWS 服务、第三方 SaaS 应用和你自己的应用之间路由事件。规则按内容过滤事件并路由到目标。',
    eda4Title: 'Step Functions：编排',
    eda4Desc: 'AWS Step Functions 将多个 Lambda 函数编排为有状态的工作流。Express Workflows 模式针对高量、短时工作流进行了优化。Standard Workflows 支持人工审批步骤和复杂分支逻辑。',
    h2Databases: '无服务器数据库：PlanetScale、Neon、Turso、Upstash Redis',
    dbDesc: '传统数据库不适合无服务器：它们使用持久 TCP 连接（Lambda 可能打开数千个），有每连接开销，并需要 VPC 配置。无服务器数据库使用 HTTP API、连接池和边缘优化架构。',
    psTitle: 'PlanetScale (MySQL)',
    psDesc: 'PlanetScale 是使用 Vitess（YouTube 数据库背后的技术）的无服务器 MySQL 兼容数据库。主要特性：分支（像 Git 分支一样的数据库分支）、非阻塞模式更改。无服务器驱动使用 HTTP，避免连接池耗尽。',
    neonTitle: 'Neon (PostgreSQL)',
    neonDesc: 'Neon 是具有独特架构的无服务器 PostgreSQL：计算和存储分离。计算在空闲时扩展到零（分支自动暂停）并在 ~100ms 内唤醒。无服务器驱动使用 WebSockets 实现边缘环境的低延迟连接。',
    tursoTitle: 'Turso（边缘 SQLite）',
    tursoDesc: 'Turso 扩展了 libSQL（SQLite 的一个分支）以作为分布式数据库运行。你可以在 30+ 个区域创建数据库。libSQL 客户端在 Cloudflare Workers 和边缘运行时中工作。',
    upstashTitle: 'Upstash Redis 和 Kafka',
    upstashDesc: 'Upstash 提供按请求定价的无服务器 Redis 和 Kafka（无每小时计费）。Redis 通过 REST API 访问，与边缘运行时兼容。主要用途：速率限制、会话存储、缓存、排行榜。',
    h2ColdStart: '冷启动问题和缓解策略',
    coldStartDesc: '冷启动是无服务器平台初始化新函数实例时的延迟惩罚。理解冷启动对于构建响应式无服务器应用至关重要。',
    coldStartPhases: '冷启动阶段',
    csp1: '代码下载 — 从 S3/ECR 获取 ZIP/容器到执行环境',
    csp2: '运行时初始化 — 启动 Node.js、Python、JVM 或其他运行时进程',
    csp3: '函数初始化 — 运行处理程序外的代码（导入、SDK 设置、DB 连接）',
    csp4: '处理程序调用 — 最终执行你的实际函数代码',
    coldStartTimes: '各运行时典型冷启动时间（AWS Lambda）',
    cst1: 'Node.js 20 — 200-400ms（轻量函数），使用大型 SDK 可达 1-2s',
    cst2: 'Python 3.12 — 200-500ms',
    cst3: 'Go — 50-150ms（编译二进制文件，无运行时初始化）',
    cst4: 'Java 21（无 SnapStart）— 2-10s；使用 SnapStart：200-500ms',
    cst5: '.NET 8 Native AOT — 200-400ms（相对 .NET 6 有显著改善）',
    cst6: 'Cloudflare Workers — 0-5ms（V8 隔离，非容器）',
    coldStartStrategiesTitle: '缓解策略',
    csm1: '预置并发（Lambda）— 维护 N 个热实例；消除冷启动但增加固定成本',
    csm2: 'Lambda SnapStart（Java）— JVM 状态快照；分层编译实现 50-80% 冷启动减少',
    csm3: '预热函数 — 每 5 分钟 CloudWatch cron ping；使用并发参数预热多个实例',
    csm4: '最小依赖 — 仅导入所需内容；webpack/esbuild tree-shaking；延迟导入',
    csm5: '连接池 — Aurora/RDS 使用 RDS Proxy；PostgreSQL 的 PgBouncer 等价物',
    csm6: '边缘运行时 — 将延迟敏感逻辑移至 Cloudflare Workers 或 Vercel Edge，实现 0ms 冷启动',
    h2Monitoring: '监控无服务器：CloudWatch、Datadog、Lumigo',
    monitoringDesc: '无服务器监控比传统应用监控更难。函数是短暂的、分布式的、短命的。你无法 SSH 进入函数实例。分布式追踪和结构化日志至关重要。',
    cwTitle: 'AWS CloudWatch',
    cwDesc: 'CloudWatch 是原生 AWS 监控服务。Lambda 自动将日志发送到 CloudWatch Logs，将指标（调用次数、持续时间、错误、限流）发送到 CloudWatch Metrics。CloudWatch Insights 让你用类 SQL 语法查询日志。',
    datadogTitle: 'Datadog',
    datadogDesc: 'Datadog 的无服务器监控使用 Lambda 层和转发器。它在统一视图中收集增强指标、分布式追踪（APM）和日志。Datadog Lambda Extension 在进程内发送数据，减少转发器模式的开销。',
    lumigoTitle: 'Lumigo',
    lumigoDesc: 'Lumigo 专为无服务器可观测性构建。它自动检测 Lambda 函数（无需更改代码），提供跨 Lambda 到 Lambda 和 Lambda 到服务调用的端到端分布式追踪，并对异常发出警报。',
    xrayTitle: 'AWS X-Ray',
    xrayDesc: 'X-Ray 为 AWS 原生架构提供分布式追踪。在 Lambda 中启用主动追踪以自动追踪函数调用。添加 X-Ray SDK 以追踪对 DynamoDB、S3、SNS、SQS 和 HTTP 端点的下游调用。',
    h2Comparison: 'Serverless vs 容器 vs 传统服务器',
    comparisonDesc: '选择正确的计算模型取决于你的工作负载特征、团队专业知识和成本概况。没有哪种模型是普遍优越的。',
    compPlatform: '平台',
    compColdStart: '冷启动',
    compMaxDuration: '最长执行时间',
    compScaling: '扩展',
    compPricing: '定价模型',
    compBestFor: '最适合',
    compLambda: 'AWS Lambda',
    compLambdaColdStart: '100ms-1s',
    compLambdaMax: '15 分钟',
    compLambdaScaling: '自动（默认 1000 并发）',
    compLambdaPricing: '按调用次数 + GB-秒',
    compLambdaBest: '事件处理、API、定时任务',
    compVercel: 'Vercel Functions',
    compVercelColdStart: '50-500ms',
    compVercelMax: '30s (Hobby) / 300s (Pro)',
    compVercelScaling: '自动',
    compVercelPricing: '按调用次数 + GB-小时',
    compVercelBest: 'Next.js 应用、全栈 Web',
    compCF: 'Cloudflare Workers',
    compCFColdStart: '0-5ms',
    compCFMax: '30 秒',
    compCFScaling: '自动（无限制）',
    compCFPricing: '按请求（每月 1000 万免费）',
    compCFBest: '边缘逻辑、API、低延迟',
    compNetlify: 'Netlify Functions',
    compNetlifyColdStart: '100-500ms',
    compNetlifyMax: '10 秒（后台：15 分钟）',
    compNetlifyScaling: '自动',
    compNetlifyPricing: '按调用次数 + 运行时分钟',
    compNetlifyBest: 'JAMstack 站点、表单处理',
    compContainers: '容器 (ECS/Fargate)',
    compContainersColdStart: '30-60s（任务启动）',
    compContainersMax: '无限制',
    compContainersScaling: '分钟级（任务启动时间）',
    compContainersPricing: '按 vCPU/小时 + 内存/小时',
    compContainersBest: '长时间运行工作负载、有状态应用',
    compTraditional: '传统虚拟机',
    compTraditionalColdStart: '无（始终运行）',
    compTraditionalMax: '无限制',
    compTraditionalScaling: '手动或缓慢的自动扩展',
    compTraditionalPricing: '按小时（无论空闲或繁忙）',
    compTraditionalBest: '可预测的高流量、遗留应用',
    h2CostOpt: '无服务器成本优化',
    costDesc: '对于可变工作负载，无服务器通常比传统服务器便宜，但配置不良或高流量稳态流量可能导致成本失控。理解成本模型和优化杠杆至关重要。',
    costFactorsTitle: 'Lambda 成本因素',
    cf1: '调用次数 — 每 100 万请求 $0.20（每月 40 万免费）',
    cf2: '计算 — 每 GB-秒 $0.0000166667（100ms 增量）',
    cf3: '预置并发 — 每 GB-秒 $0.000004646（始终运行）',
    cf4: '数据传输 — 出站 $0.09/GB（前 1GB 免费）',
    costOptTitle: '成本优化技术',
    co1: '合理设置内存 — 更多内存 = 更多 vCPU = 更快执行 = 潜在更低成本；使用 AWS Lambda Power Tuning 基准测试',
    co2: '使用 ARM/Graviton2 — 比 x86 便宜 20%，价格/性能比好 19%',
    co3: '优化包大小 — 更小的包 = 更短的冷启动 = 更快的计费持续时间',
    co4: '批量操作 — 一次处理 10,000 条 SQS 消息而不是每次处理 1 条',
    co5: '使用 S3 Express One Zone — 高频 Lambda 到 S3 工作负载的请求成本降低 10 倍',
    co6: '函数内缓存 — 在热调用之间将频繁访问的数据存储在 Lambda 内存中',
    co7: '使用 DynamoDB DAX 或 ElastiCache — 通过缓存 DB 结果减少 Lambda 执行时间',
    co8: '避免不必要的异步操作 — 使用 Promise.all 并行 AWS SDK 调用减少持续时间',
    h2Faq: '常见问题',
    faq1Q: '什么时候不应该使用无服务器？',
    faq1A: '避免在以下情况使用无服务器：超过 15 分钟的长时间运行进程（改用 ECS/EKS）、需要持久内存状态的应用（使用 Redis 或有状态容器）、预置计算更便宜的非常高的稳态流量、需要持久连接的 WebSocket 应用（使用 Durable Objects 或 EC2）、GPU 密集型工作负载（Lambda 不支持 GPU）。',
    faq2Q: '如何在 Lambda 中处理数据库连接？',
    faq2A: 'Lambda 函数可能耗尽数据库连接池，因为每个函数实例都打开自己的连接。解决方案：(1) 对 Aurora/RDS 使用 RDS Proxy 作为连接池，(2) 使用带 HTTP API 的无服务器数据库，如 PlanetScale、Neon 或 Upstash，(3) 在处理程序外初始化连接，以便在热调用之间复用，(4) 尽可能使用 DynamoDB 代替关系型 DB。',
    faq3Q: '同步和异步 Lambda 调用有什么区别？',
    faq3A: '同步调用（RequestResponse）等待函数完成并返回结果——由 API Gateway、ALB、Lambda Function URL 使用。异步调用（Event）将请求排队并立即返回——由 S3、SNS、EventBridge 使用。调用者不等待。Lambda 对异步失败重试最多 2 次。使用死信队列（DLQ）捕获失败的异步事件。',
    faq4Q: '如何在本地运行无服务器进行开发？',
    faq4A: '选项：(1) SST dev 命令——部署到 AWS 但通过本地文件监视启用实时代码重新加载，(2) Serverless Offline 插件——在本地模拟 API Gateway 和 Lambda，(3) AWS SAM CLI——sam local invoke 和 sam local start-api 进行本地测试，(4) Wrangler dev——Cloudflare Workers 本地开发，(5) Vercel dev——本地 Next.js + Functions 开发。',
    faq5Q: 'Lambda 并发限制是什么，如何增加？',
    faq5A: '默认 Lambda 并发限制是每个区域 1,000 个并发执行（跨所有函数）。你可以通过 AWS Service Quotas 控制台请求限制增加（生产账户通常可达 10,000+）。Reserved Concurrency 保证函数获得一定数量的并发执行。Provisioned Concurrency 预热实例，用于消除冷启动。',
    faq6Q: '无服务器适合机器学习推理吗？',
    faq6A: '是的，适合许多 ML 用例。AWS Lambda 支持 Python，可以使用 scikit-learn、XGBoost 甚至 PyTorch（需要仔细优化包）运行推理。Lambda 层可以打包最大 250MB 的 ML 模型。对于更大的模型，使用 Lambda 容器镜像（最大 10GB）。Lambda 不支持 GPU——对于 GPU 推理，使用 SageMaker Serverless Inference 或基于容器的解决方案。',
    faq7Q: '无服务器如何处理 Secrets 和环境变量？',
    faq7A: 'Lambda 支持使用 AWS KMS 加密的环境变量。对于生产 Secrets，使用 AWS Secrets Manager 或 AWS Systems Manager Parameter Store——Lambda 可以在启动时获取 Secrets 并在热调用之间缓存在内存中。避免在环境变量中硬编码生产敏感数据。Cloudflare Workers 使用 Wrangler secrets，在运行时作为环境变量加密存储和访问。',
    faq8Q: 'Lambda 的最大有效载荷大小是多少？',
    faq8A: '同步调用（API Gateway）：6MB 请求，6MB 响应。异步调用：256KB 有效载荷。对于更大的有效载荷，上传到 S3 并将 S3 URL 作为事件有效载荷传递。如果你需要流式传输大型响应，使用 2023 年引入的 Lambda Response Streaming（最大 20MB）。',
  },
};

export default function ServerlessGuide({ lang }: { lang: string }) {
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

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <strong style={{ display: 'block', marginBottom: '8px', color: '#0369a1' }}>{t.tldrTitle}</strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: '1.6' }}>{t.tldrText}</p>
      </div>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <strong style={{ display: 'block', marginBottom: '12px', fontSize: '1rem' }}>{t.keyTakeawaysTitle}</strong>
        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
          {[t.kt1, t.kt2, t.kt3, t.kt4, t.kt5, t.kt6, t.kt7, t.kt8].map((item, i) => (
            <li key={i} style={{ marginBottom: '6px', lineHeight: '1.6' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Section 1: What is Serverless */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2WhatIs}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.whatIsDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.faasTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.faasDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.serverlessCharTitle}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.sc1, t.sc2, t.sc3, t.sc4, t.sc5, t.sc6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>

      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// A basic AWS Lambda function (Node.js 20)
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// Initialize outside handler — reused across warm invocations
const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const userId = event.pathParameters?.id;

  if (!userId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing user ID' }) };
  }

  const user = await dynamoClient.send(
    new GetItemCommand({ TableName: 'Users', Key: { id: { S: userId } } })
  );

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: user.Item }),
  };
};`}</code></pre>

      {/* Section 2: AWS Lambda */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Lambda}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.lambdaDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.lambdaRuntimesTitle}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.lambdaRt1, t.lambdaRt2, t.lambdaRt3, t.lambdaRt4, t.lambdaRt5, t.lambdaRt6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>

      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# Deploy a Lambda function with SAM
# template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Globals:
  Function:
    Runtime: nodejs20.x
    Architectures: [arm64]    # Graviton2: 20% cheaper
    MemorySize: 512
    Timeout: 30
    Environment:
      Variables:
        NODE_ENV: production

Resources:
  ApiFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/index.handler
      Events:
        ApiEvent:
          Type: HttpApi
          Properties:
            Path: /api/{proxy+}
            Method: ANY
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref UsersTable
    Metadata:
      BuildMethod: esbuild
      BuildProperties:
        EntryPoints: [src/index.ts]
        Bundle: true
        Minify: true
        Target: es2022

  UsersTable:
    Type: AWS::DynamoDB::Table
    Properties:
      BillingMode: PAY_PER_REQUEST
      KeySchema:
        - AttributeName: id
          KeyType: HASH
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.lambdaTriggersTitle}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.lambdaTrig1, t.lambdaTrig2, t.lambdaTrig3, t.lambdaTrig4, t.lambdaTrig5, t.lambdaTrig6, t.lambdaTrig7, t.lambdaTrig8].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.lambdaLayersTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.lambdaLayersDesc}</p>

      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# Create and publish a Lambda Layer
# 1. Prepare the layer contents (must follow directory structure)
mkdir -p layer/nodejs
cd layer/nodejs
npm install sharp@0.33.0 --os=linux --cpu=arm64
cd ..

# 2. Zip and publish
zip -r sharp-layer.zip nodejs/
aws lambda publish-layer-version \\
  --layer-name sharp-image-processing \\
  --zip-file fileb://sharp-layer.zip \\
  --compatible-runtimes nodejs20.x \\
  --compatible-architectures arm64

# 3. Attach to function in SAM template
# Layers:
#   - !Ref SharpLayer
#   - arn:aws:lambda:us-east-1:580247275435:layer:LambdaInsightsExtension-Arm64:5`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.lambdaColdStartTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.lambdaColdStartDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.coldStartMit1, t.coldStartMit2, t.coldStartMit3, t.coldStartMit4, t.coldStartMit5, t.coldStartMit6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>

      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// Cold start optimization patterns

// BAD: Initializing inside handler (cold start every invocation)
export const badHandler = async (event: APIGatewayProxyEvent) => {
  const client = new S3Client({ region: 'us-east-1' }); // Cold start!
  const db = await connectToDatabase();                   // Cold start!
  // ...
};

// GOOD: Initialize outside handler (warm invocation reuse)
const s3Client = new S3Client({ region: 'us-east-1' });   // Once per container
let dbConnection: Pool | null = null;

async function getDb(): Promise<Pool> {
  if (!dbConnection) {
    dbConnection = await createPool(process.env.DATABASE_URL!);
  }
  return dbConnection;
}

export const goodHandler = async (event: APIGatewayProxyEvent) => {
  const db = await getDb(); // Reuses connection on warm invocations
  // ...
};

// Provisioned Concurrency with SAM
// In template.yaml:
// AutoPublishAlias: live
// ProvisionedConcurrencyConfig:
//   ProvisionedConcurrentExecutions: 5`}</code></pre>

      {/* Section 3: Vercel Functions */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Vercel}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.vercelDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.vercelFunctionsTitle}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.vf1, t.vf2, t.vf3].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>

      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// app/api/users/route.ts - Vercel Serverless Function (Next.js App Router)
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Runs in Node.js runtime (default)
export const runtime = 'nodejs'; // or 'edge' for Edge Functions

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');

  const users = await db.query(
    'SELECT id, name, email FROM users ORDER BY created_at DESC LIMIT 20 OFFSET \${(page - 1) * 20}',
    [(page - 1) * 20]
  );

  return NextResponse.json({ users, page });
}

// app/api/edge-hello/route.ts - Vercel Edge Function
export const runtime = 'edge';

export async function GET(request: Request) {
  const { geo } = request as Request & { geo: { country: string; city: string } };

  return new Response(
    JSON.stringify({ message: 'Hello from the edge!', country: geo?.country }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}

// middleware.ts - Edge Middleware (runs before every request)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Add custom headers for all responses
  const response = NextResponse.next();
  response.headers.set('X-Custom-Header', 'edge-processed');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.vercelEdgeTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.vercelEdgeDesc}</p>

      {/* Section 4: Cloudflare Workers */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2CloudflareWorkers}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.cfDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.cfIsolatesTitle}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.cfIso1, t.cfIso2, t.cfIso3, t.cfIso4].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>

      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// src/index.ts - Cloudflare Worker with D1, KV, and Durable Objects
export interface Env {
  DB: D1Database;
  CACHE: KVNamespace;
  RATE_LIMITER: DurableObjectNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Rate limiting with Durable Objects
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const rateLimiterId = env.RATE_LIMITER.idFromName(clientIP);
    const rateLimiter = env.RATE_LIMITER.get(rateLimiterId);
    const { allowed } = await rateLimiter.fetch(request).then(r => r.json<{ allowed: boolean }>());

    if (!allowed) {
      return new Response('Too Many Requests', { status: 429 });
    }

    // Check KV cache first
    const cacheKey = url.pathname + url.search;
    const cached = await env.CACHE.get(cacheKey);
    if (cached) {
      return new Response(cached, {
        headers: { 'Content-Type': 'application/json', 'X-Cache': 'HIT' },
      });
    }

    // Query D1 database
    const { results } = await env.DB.prepare(
      'SELECT id, title, slug FROM posts WHERE published = 1 ORDER BY created_at DESC LIMIT 10'
    ).all();

    const json = JSON.stringify({ posts: results });

    // Cache for 60 seconds
    ctx.waitUntil(env.CACHE.put(cacheKey, json, { expirationTtl: 60 }));

    return new Response(json, {
      headers: { 'Content-Type': 'application/json', 'X-Cache': 'MISS' },
    });
  },
};

// wrangler.toml
// name = "my-worker"
// main = "src/index.ts"
// compatibility_date = "2024-01-01"
//
// [[d1_databases]]
// binding = "DB"
// database_name = "my-blog-db"
// database_id = "xxxx-xxxx-xxxx"
//
// [[kv_namespaces]]
// binding = "CACHE"
// id = "xxxx-xxxx-xxxx"
//
// [[durable_objects.bindings]]
// name = "RATE_LIMITER"
// class_name = "RateLimiter"`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.cfStorageTitle}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.cfSt1, t.cfSt2, t.cfSt3, t.cfSt4, t.cfSt5].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>

      {/* Section 5: Frameworks */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Frameworks}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.frameworksDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.sfTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.sfDesc}</p>

      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# serverless.yml - Serverless Framework v4
service: my-api
frameworkVersion: '4'

provider:
  name: aws
  runtime: nodejs20.x
  architecture: arm64
  region: us-east-1
  environment:
    DATABASE_URL: \${ssm:/my-app/database-url}
  iam:
    role:
      statements:
        - Effect: Allow
          Action: ['dynamodb:*']
          Resource: !GetAtt UsersTable.Arn

functions:
  getUser:
    handler: src/users.getUser
    events:
      - httpApi:
          path: /users/{id}
          method: GET

  processOrder:
    handler: src/orders.process
    events:
      - sqs:
          arn: !GetAtt OrderQueue.Arn
          batchSize: 100
          maximumBatchingWindow: 30

resources:
  Resources:
    UsersTable:
      Type: AWS::DynamoDB::Table
      Properties:
        BillingMode: PAY_PER_REQUEST
        KeySchema:
          - AttributeName: id
            KeyType: HASH
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S

plugins:
  - serverless-esbuild
  - serverless-offline`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.sstTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.sstDesc}</p>

      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// sst.config.ts - SST v3 (Ion)
import { SSTConfig } from 'sst';
import { Api, Table, Function } from 'sst/constructs';

export default {
  config(_input) {
    return { name: 'my-app', region: 'us-east-1' };
  },
  stacks(app) {
    app.stack(function Stack({ stack }) {
      const table = new Table(stack, 'Users', {
        fields: { id: 'string', email: 'string' },
        primaryIndex: { partitionKey: 'id' },
      });

      const api = new Api(stack, 'Api', {
        routes: {
          'GET /users/{id}': {
            function: {
              handler: 'packages/functions/src/users.getUser',
              bind: [table],  // Type-safe resource binding
            },
          },
        },
      });

      stack.addOutputs({ ApiEndpoint: api.url });
    });
  },
} satisfies SSTConfig;

// packages/functions/src/users.ts
import { Resource } from 'sst';
import { DynamoDB } from 'aws-sdk';

const dynamo = new DynamoDB.DocumentClient();

export async function getUser(event: APIGatewayProxyEventV2) {
  const userId = event.pathParameters?.id!;

  // Resource.Users.name is typed and resolves to the DynamoDB table name
  const result = await dynamo.get({
    TableName: Resource.Users.name,
    Key: { id: userId },
  }).promise();

  return { statusCode: 200, body: JSON.stringify(result.Item) };
}`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.samTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.samDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.cdkTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.cdkDesc}</p>

      {/* Section 6: Event-Driven */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2EventDriven}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.eventDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.eda1Title}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.eda1Desc}</p>

      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// SNS Fan-out: Publish once, multiple subscribers receive
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const sns = new SNSClient({ region: 'us-east-1' });

// Publisher: user-service Lambda
async function onUserCreated(userId: string, email: string) {
  await sns.send(new PublishCommand({
    TopicArn: process.env.USER_EVENTS_TOPIC_ARN,
    Subject: 'UserCreated',
    Message: JSON.stringify({ userId, email, event: 'USER_CREATED' }),
    MessageAttributes: {
      eventType: { DataType: 'String', StringValue: 'USER_CREATED' },
    },
  }));
}

// Subscriber 1: email-service Lambda (sends welcome email)
// Subscriber 2: analytics-service Lambda (records signup event)
// Subscriber 3: crm-service Lambda (creates CRM record)
// All receive the same message independently and process in parallel

// SQS Consumer: Process orders in batches
export const processOrdersBatch = async (event: SQSEvent) => {
  const results = await Promise.allSettled(
    event.Records.map(record => processOrder(JSON.parse(record.body)))
  );

  // Return partial failures for SQS to retry
  const failures = results
    .map((r, i) => r.status === 'rejected' ? { itemIdentifier: event.Records[i].messageId } : null)
    .filter(Boolean);

  return { batchItemFailures: failures };
};`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.eda2Title}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.eda2Desc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.eda3Title}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.eda3Desc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.eda4Title}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.eda4Desc}</p>

      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// AWS Step Functions: Order Processing Workflow
// state-machine.asl.json
{
  "Comment": "Order processing workflow",
  "StartAt": "ValidateOrder",
  "States": {
    "ValidateOrder": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Parameters": {
        "FunctionName": "\${ValidateOrderFunction}",
        "Payload.\$": "\$"
      },
      "Next": "IsValid",
      "Catch": [{ "ErrorEquals": ["States.ALL"], "Next": "OrderFailed" }]
    },
    "IsValid": {
      "Type": "Choice",
      "Choices": [
        { "Variable": "\$.valid", "BooleanEquals": true, "Next": "ProcessPayment" }
      ],
      "Default": "OrderFailed"
    },
    "ProcessPayment": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Parameters": { "FunctionName": "\${ProcessPaymentFunction}", "Payload.\$": "\$" },
      "Next": "FulfillOrder",
      "Retry": [{ "ErrorEquals": ["PaymentRetryable"], "MaxAttempts": 3, "IntervalSeconds": 5 }]
    },
    "FulfillOrder": {
      "Type": "Parallel",
      "Branches": [
        { "StartAt": "UpdateInventory", "States": { "UpdateInventory": { "Type": "Task", "Resource": "arn:aws:states:::lambda:invoke", "Parameters": { "FunctionName": "\${InventoryFunction}", "Payload.\$": "\$" }, "End": true } } },
        { "StartAt": "SendConfirmationEmail", "States": { "SendConfirmationEmail": { "Type": "Task", "Resource": "arn:aws:states:::lambda:invoke", "Parameters": { "FunctionName": "\${EmailFunction}", "Payload.\$": "\$" }, "End": true } } }
      ],
      "Next": "OrderComplete"
    },
    "OrderComplete": { "Type": "Succeed" },
    "OrderFailed": { "Type": "Fail", "Error": "OrderProcessingFailed" }
  }
}`}</code></pre>

      {/* Section 7: Serverless Databases */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Databases}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.dbDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.psTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.psDesc}</p>

      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// PlanetScale serverless driver (HTTP-based, no connection pooling needed)
import { connect } from '@planetscale/database';

const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

// Works in Lambda, Edge Functions, Cloudflare Workers — HTTP only
export async function getUser(id: string) {
  const result = await connection.execute(
    'SELECT id, name, email FROM users WHERE id = :id',
    { id }
  );
  return result.rows[0];
}

// Neon serverless driver (WebSocket-based for edge compatibility)
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function getPosts(page: number) {
  const offset = (page - 1) * 10;
  return await sql\`
    SELECT id, title, slug, created_at
    FROM posts
    WHERE published = true
    ORDER BY created_at DESC
    LIMIT 10 OFFSET \${offset}
  \`;
}`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.neonTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.neonDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.tursoTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.tursoDesc}</p>

      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// Turso (libSQL) in a Cloudflare Worker
import { createClient } from '@libsql/client/web';

const client = createClient({
  url: 'libsql://my-db-org.turso.io',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function getTodosByUser(userId: string) {
  const result = await client.execute({
    sql: 'SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC',
    args: [userId],
  });
  return result.rows;
}

// Upstash Redis in Lambda / Edge
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limiting with sliding window
export async function checkRateLimit(userId: string): Promise<boolean> {
  const key = 'rate_limit:' + userId;
  const now = Date.now();
  const window = 60_000; // 1 minute
  const limit = 100;

  const pipeline = redis.pipeline();
  pipeline.zremrangebyscore(key, 0, now - window);
  pipeline.zadd(key, { score: now, member: String(now) });
  pipeline.zcard(key);
  pipeline.expire(key, 60);

  const results = await pipeline.exec<[number, number, number, number]>();
  const count = results[2];
  return count <= limit;
}`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.upstashTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.upstashDesc}</p>

      {/* Section 8: Cold Starts */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2ColdStart}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.coldStartDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.coldStartPhases}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.csp1, t.csp2, t.csp3, t.csp4].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.coldStartTimes}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.cst1, t.cst2, t.cst3, t.cst4, t.cst5, t.cst6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.coldStartStrategiesTitle}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.csm1, t.csm2, t.csm3, t.csm4, t.csm5, t.csm6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>

      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// Lambda warming strategy with CloudWatch Events
// In SAM template:
// ScheduledWarmUp:
//   Type: AWS::Serverless::Function
//   Properties:
//     Handler: src/warmer.handler
//     Events:
//       WarmUpEvent:
//         Type: Schedule
//         Properties:
//           Schedule: rate(5 minutes)

// src/warmer.ts
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

const lambda = new LambdaClient({ region: 'us-east-1' });
const FUNCTIONS_TO_WARM = ['api-handler', 'auth-handler', 'webhook-handler'];
const CONCURRENCY = 3; // Warm 3 instances per function

export const handler = async () => {
  await Promise.all(
    FUNCTIONS_TO_WARM.flatMap(fn =>
      Array.from({ length: CONCURRENCY }, (_, i) =>
        lambda.send(new InvokeCommand({
          FunctionName: fn,
          InvocationType: 'Event',
          Payload: JSON.stringify({ source: 'warmer', index: i }),
        }))
      )
    )
  );
  console.log('Warming complete for', FUNCTIONS_TO_WARM.length, 'functions');
};

// In your actual function handler, detect warm-up pings and return early:
export const handler = async (event: any) => {
  if (event.source === 'warmer') return { warmed: true };
  // ... actual handler logic
};`}</code></pre>

      {/* Section 9: Monitoring */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Monitoring}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.monitoringDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.cwTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.cwDesc}</p>

      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// Structured logging for CloudWatch Insights
import { Logger } from '@aws-lambda-powertools/logger';
import { Tracer } from '@aws-lambda-powertools/tracer';
import { Metrics, MetricUnit } from '@aws-lambda-powertools/metrics';

const logger = new Logger({ serviceName: 'user-service', logLevel: 'INFO' });
const tracer = new Tracer({ serviceName: 'user-service' });
const metrics = new Metrics({ namespace: 'UserService', serviceName: 'user-service' });

export const handler = async (event: APIGatewayProxyEvent) => {
  logger.appendKeys({ requestId: event.requestContext.requestId });
  const segment = tracer.getSegment();

  try {
    logger.info('Processing request', { path: event.path, method: event.httpMethod });

    const subsegment = segment?.addNewSubsegment('DynamoDB.GetUser');
    const user = await getUser(event.pathParameters?.id!);
    subsegment?.close();

    metrics.addMetric('UserFetched', MetricUnit.Count, 1);

    logger.info('Request completed', { userId: user.id });
    return { statusCode: 200, body: JSON.stringify(user) };
  } catch (error) {
    logger.error('Request failed', { error });
    metrics.addMetric('UserFetchError', MetricUnit.Count, 1);
    throw error;
  } finally {
    metrics.publishStoredMetrics();
  }
};

// CloudWatch Logs Insights query:
// fields @timestamp, @message, requestId, userId
// | filter level = "ERROR"
// | sort @timestamp desc
// | limit 100`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.datadogTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.datadogDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.lumigoTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.lumigoDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.xrayTitle}</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.xrayDesc}</p>

      {/* Section 10: Comparison Table */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Comparison}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.comparisonDesc}</p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{t.compPlatform}</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{t.compColdStart}</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{t.compMaxDuration}</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{t.compScaling}</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{t.compPricing}</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{t.compBestFor}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.compLambda, t.compLambdaColdStart, t.compLambdaMax, t.compLambdaScaling, t.compLambdaPricing, t.compLambdaBest],
              [t.compVercel, t.compVercelColdStart, t.compVercelMax, t.compVercelScaling, t.compVercelPricing, t.compVercelBest],
              [t.compCF, t.compCFColdStart, t.compCFMax, t.compCFScaling, t.compCFPricing, t.compCFBest],
              [t.compNetlify, t.compNetlifyColdStart, t.compNetlifyMax, t.compNetlifyScaling, t.compNetlifyPricing, t.compNetlifyBest],
              [t.compContainers, t.compContainersColdStart, t.compContainersMax, t.compContainersScaling, t.compContainersPricing, t.compContainersBest],
              [t.compTraditional, t.compTraditionalColdStart, t.compTraditionalMax, t.compTraditionalScaling, t.compTraditionalPricing, t.compTraditionalBest],
            ].map((row, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ border: '1px solid #e2e8f0', padding: '10px 14px' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 11: Cost Optimization */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2CostOpt}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>{t.costDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.costFactorsTitle}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.cf1, t.cf2, t.cf3, t.cf4].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.costOptTitle}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.co1, t.co2, t.co3, t.co4, t.co5, t.co6, t.co7, t.co8].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>

      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# AWS Lambda Power Tuning - find optimal memory for cost/performance
# Uses Step Functions to benchmark your function at different memory settings
# https://github.com/alexcasalboni/aws-lambda-power-tuning

# Deploy the power tuning state machine
sam deploy --template-url https://s3.amazonaws.com/...

# Invoke it with your function ARN and test payload
aws stepfunctions start-execution \\
  --state-machine-arn "arn:aws:states:us-east-1:xxx:stateMachine:powerTuningStateMachine" \\
  --input '{
    "lambdaARN": "arn:aws:lambda:us-east-1:xxx:function:my-function",
    "powerValues": [128, 256, 512, 1024, 2048, 3008],
    "num": 10,
    "payload": {"key": "value"},
    "parallelInvocation": true,
    "strategy": "cost"
  }'

# Results show cost and duration at each memory level
# A function running at 1024MB for 200ms may be cheaper than 128MB for 1500ms

# Optimize bundle size with esbuild
# package.json scripts:
# "build": "esbuild src/index.ts --bundle --platform=node --target=node20 --outfile=dist/index.js --minify --tree-shaking=true --external:@aws-sdk/*"
# AWS SDK v3 is pre-installed in Lambda runtime — mark as external to save ~50MB

# Measure actual bundle impact
du -sh dist/
# Before: 45MB   (bundled with AWS SDK)
# After:  2.3MB  (AWS SDK marked as external)`}</code></pre>

      {/* Section 12: FAQ */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Faq}</h2>

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
        <div key={i} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', marginTop: 0 }}>{q}</h3>
          <p style={{ margin: 0, lineHeight: '1.75', color: '#374151' }}>{a}</p>
        </div>
      ))}
    </article>
  );
}
