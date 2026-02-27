'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Microservices Guide: Architecture, Communication Patterns, and Best Practices',
    description: 'A comprehensive guide to microservices architecture covering domain-driven design, service communication (REST, gRPC, message queues), API Gateway patterns, service discovery, distributed tracing, event-driven architecture, CQRS, saga pattern, Docker/Kubernetes, service mesh, observability, and deployment strategies.',

    tldr: 'Microservices decompose a large application into small, independently deployable services. Each service owns its data, communicates via APIs or events, and can be deployed without affecting others. The trade-off: significant operational complexity vs. independent scalability and team autonomy.',

    keyTakeaways: 'Key Takeaways',
    kt1: 'Design around business domains (DDD bounded contexts), not technical layers.',
    kt2: 'Use synchronous REST/gRPC for request-response; async messaging (Kafka/RabbitMQ) for decoupling.',
    kt3: 'Each service owns its own database — never share a DB between services.',
    kt4: 'Implement the saga pattern for distributed transactions instead of 2PC.',
    kt5: 'Use an API Gateway for cross-cutting concerns: auth, rate limiting, routing, circuit breaking.',
    kt6: 'Observability (metrics, logs, traces) is non-negotiable in production microservices.',
    kt7: 'Start with a modular monolith; extract services only when you have a clear scaling or team need.',
    kt8: 'Service mesh (Istio/Linkerd) handles mTLS, retries, and traffic shaping at the infrastructure level.',

    introTitle: 'What Are Microservices?',
    introDesc1: 'Microservices is an architectural style where a single application is built as a suite of small, independently deployable services. Each service runs in its own process, communicates with lightweight mechanisms (typically HTTP/REST or message queues), and is independently deployable and scalable.',
    introDesc2: 'The term was popularized by Martin Fowler and James Lewis in 2014, though the underlying concepts — single responsibility, separation of concerns, loose coupling — have been core software engineering principles for decades.',
    introDesc3: 'Organizations like Netflix, Amazon, Uber, and Spotify adopted microservices to enable hundreds of teams to deploy independently, scale bottleneck services without affecting others, and use different technology stacks where appropriate.',

    vsMonolithTitle: 'Microservices vs Monolith vs Modular Monolith',
    vsMonolithDesc: 'Before adopting microservices, understand the trade-offs. The right architecture depends on your team size, deployment frequency, and scaling needs.',

    dddTitle: 'Domain-Driven Design: The Foundation',
    dddDesc1: 'Domain-Driven Design (DDD) provides the vocabulary and patterns needed to design effective microservices. Without DDD, teams tend to create chatty, over-coupled services that are worse than the monolith they replaced.',
    dddBoundedContextTitle: 'Bounded Contexts',
    dddBoundedContextDesc: 'A bounded context is a clear boundary within which a particular domain model applies. "Order" means different things in the Shipping context (physical item to deliver) vs. the Billing context (invoice to generate). Each microservice should correspond to one bounded context.',
    dddAggregateTitle: 'Aggregates',
    dddAggregateDesc: 'An aggregate is a cluster of domain objects that can be treated as a single unit. The aggregate root is the only object that outside objects hold references to. Aggregates define transaction boundaries — you should not have a transaction that spans multiple aggregates (and therefore not multiple services).',
    dddCode: 'OrderAggregate example (TypeScript)',

    commTitle: 'Service Communication Patterns',
    commDesc: 'Choosing the right communication pattern is critical. The wrong choice leads to tight coupling, cascading failures, and poor performance.',
    restTitle: 'REST (HTTP/JSON)',
    restDesc: 'REST is the most common synchronous communication protocol. It is simple, widely understood, and works with any language. Use REST for external APIs and when simplicity matters more than performance.',
    grpcTitle: 'gRPC (Protocol Buffers)',
    grpcDesc: 'gRPC uses Protocol Buffers for serialization, providing 3-10x better performance than REST/JSON. It supports streaming, strong typing through .proto files, and code generation. Use gRPC for internal service-to-service communication where performance is critical.',
    mqTitle: 'Message Queues (Async)',
    mqDesc: 'Asynchronous messaging via Kafka, RabbitMQ, or AWS SQS decouples services. The producer does not wait for the consumer to process the message. Use messaging for event-driven workflows, when you need guaranteed delivery, or when the consumer may be temporarily unavailable.',
    commCompareTitle: 'Communication Pattern Comparison',

    gatewayTitle: 'API Gateway Pattern',
    gatewayDesc1: 'An API Gateway is the single entry point for all client requests. It handles cross-cutting concerns so individual services do not have to implement them repeatedly.',
    gatewayDesc2: 'Popular API Gateways include Kong, AWS API Gateway, Nginx with Lua, Traefik, and Envoy. In Kubernetes, Ingress controllers often serve as the API Gateway.',
    gatewayFeaturesTitle: 'Core API Gateway Responsibilities',
    gatewayCode: 'Kong API Gateway configuration example',

    discoveryTitle: 'Service Discovery',
    discoveryDesc1: 'In a dynamic microservices environment, service instances start and stop frequently. Service discovery solves the problem of how services find each other without hardcoded IP addresses.',
    discoveryClientTitle: 'Client-Side Discovery',
    discoveryClientDesc: 'The client queries a service registry (Consul, Eureka) to get available instances, then applies load balancing logic itself. Netflix Ribbon is a classic example. More flexible but adds complexity to each client.',
    discoveryServerTitle: 'Server-Side Discovery',
    discoveryServerDesc: 'The client makes a request to a load balancer or DNS, which queries the registry and forwards the request. Kubernetes DNS is the canonical example — services are reachable at service-name.namespace.svc.cluster.local. Simpler for clients but requires infrastructure support.',
    discoveryCode: 'Kubernetes service discovery example',

    tracingTitle: 'Distributed Tracing',
    tracingDesc1: 'A single user request may touch dozens of services. Distributed tracing tracks the journey of a request across all services, making it possible to identify latency bottlenecks and diagnose failures.',
    tracingCorrelationTitle: 'Correlation IDs',
    tracingCorrelationDesc: 'Every request gets a unique trace ID at the entry point (API Gateway). Each service propagates this ID via HTTP headers (X-Trace-Id, X-Span-Id) and includes it in all log entries. This lets you grep all logs for a single request across services.',
    tracingOpenTelTitle: 'OpenTelemetry',
    tracingOpenTelDesc: 'OpenTelemetry is the CNCF standard for distributed tracing, metrics, and logs. It provides vendor-neutral SDKs that export to Jaeger, Zipkin, Datadog, or any OpenTelemetry-compatible backend.',
    tracingCode: 'OpenTelemetry Node.js setup example',

    eventTitle: 'Event-Driven Architecture',
    eventDesc1: 'Event-driven architecture (EDA) uses events to communicate between services. When something happens in one service, it publishes an event. Other services subscribe to events they care about and react accordingly.',
    eventKafkaTitle: 'Apache Kafka',
    eventKafkaDesc: 'Kafka is a distributed event streaming platform. Events are stored in topics and partitioned for scalability. Consumers read events at their own pace, and events can be replayed. Kafka is ideal for high-throughput event streaming, audit logs, and event sourcing.',
    eventRabbitTitle: 'RabbitMQ',
    eventRabbitDesc: 'RabbitMQ is a message broker that implements AMQP. It supports complex routing via exchanges and queues. Better for task queues and RPC-style messaging. Messages are typically deleted after consumption (unlike Kafka where they are retained).',
    eventSourcingTitle: 'Event Sourcing',
    eventSourcingDesc: 'Instead of storing current state, event sourcing stores the sequence of events that led to the current state. The current state is derived by replaying events. This provides a full audit trail, temporal queries, and the ability to rebuild read models.',
    eventCode: 'Kafka producer/consumer example in Node.js',

    dataTitle: 'Data Management in Microservices',
    dataDesc1: 'The hardest part of microservices is data management. The core principle is database-per-service: each service owns its data and no other service can directly query it.',
    dataCQRSTitle: 'CQRS (Command Query Responsibility Segregation)',
    dataCQRSDesc: 'CQRS separates read and write operations into different models. The write side handles commands and emits events. The read side maintains denormalized read models (projections) optimized for queries. This allows independent scaling of reads and writes.',
    dataSagaTitle: 'Saga Pattern for Distributed Transactions',
    dataSagaDesc: 'When a business operation spans multiple services (e.g., place order → reserve inventory → charge payment), you cannot use a database transaction. The saga pattern orchestrates a series of local transactions with compensating transactions for rollback.',
    dataSagaChoreTitle: 'Choreography vs Orchestration',
    dataSagaChoreDesc: 'Choreography: Services react to events without a central coordinator. Decoupled but hard to trace. Orchestration: A central saga orchestrator (a separate service) tells each participant what to do. Easier to understand and debug but adds a central service.',
    dataCode: 'Saga orchestration example',

    containerTitle: 'Containerization and Orchestration',
    containerDesc1: 'Docker packages each microservice into a portable, self-contained image. Kubernetes orchestrates these containers across a cluster, handling deployment, scaling, health checks, and service discovery.',
    dockerfileTitle: 'Production Dockerfile Best Practices',
    k8sTitle: 'Kubernetes Deployment Patterns',
    k8sDesc: 'A Kubernetes Deployment manages a ReplicaSet of pods. A Service provides stable network access. A HorizontalPodAutoscaler scales pods based on CPU/memory or custom metrics.',
    containerCode: 'Multi-stage Dockerfile example',
    k8sCode: 'Kubernetes Deployment + Service YAML',

    meshTitle: 'Service Mesh',
    meshDesc1: 'A service mesh is an infrastructure layer that handles service-to-service communication. It provides mTLS, retries, circuit breaking, load balancing, and observability without changing application code.',
    meshIstioTitle: 'Istio',
    meshIstioDesc: 'Istio injects a sidecar proxy (Envoy) into each pod. All traffic goes through the proxy, which enforces policies, collects telemetry, and handles failures. Istio provides a control plane (Istiod) that configures all proxies centrally.',
    meshLinkerdTitle: 'Linkerd',
    meshLinkerdDesc: 'Linkerd is a lighter-weight alternative to Istio. It uses a Rust-based micro-proxy instead of Envoy. Linkerd is easier to install and has lower resource overhead. It focuses on reliability features (retries, timeouts, circuit breaking) and mTLS.',
    meshCode: 'Istio VirtualService for canary traffic splitting',

    observabilityTitle: 'Observability: Metrics, Logs, and Traces',
    observabilityDesc: 'The three pillars of observability — metrics, logs, and traces — are essential for understanding system behavior in production. Without observability, debugging microservices is like flying blind.',
    metricsTitle: 'Metrics with Prometheus',
    metricsDesc: 'Prometheus scrapes metrics from services via HTTP. Services expose a /metrics endpoint with counters, gauges, histograms, and summaries. Grafana visualizes Prometheus data. Use the RED method: Rate, Errors, Duration for each service.',
    logsTitle: 'Structured Logging',
    logsDesc: 'Log in JSON format to enable machine parsing. Include trace_id, service name, environment, and severity in every log line. Ship logs to a central system (Elasticsearch, Loki, or CloudWatch).',
    observabilityCode: 'Prometheus metrics in Node.js example',

    testingTitle: 'Testing Strategies',
    testingDesc: 'Testing microservices requires a layered strategy. The test pyramid still applies, but integration and contract tests become more important.',
    testContractTitle: 'Contract Testing with Pact',
    testContractDesc: 'Consumer-driven contract testing ensures that a service (consumer) and its dependencies (providers) agree on the API contract. Pact is the most popular framework. The consumer writes tests that define expectations, generating a "pact" file. The provider verifies it can satisfy the pact.',
    testE2ETitle: 'End-to-End Testing',
    testE2EDesc: 'E2E tests for microservices are expensive to maintain. Reserve them for critical user journeys only. Use Docker Compose or Kubernetes to spin up the full stack. Tools: Cypress, Playwright, or REST Assured.',
    testCode: 'Pact consumer test example (JavaScript)',

    deployTitle: 'Deployment Strategies',
    deployDesc: 'Zero-downtime deployment is critical in microservices. Kubernetes supports several strategies natively.',
    deployBlueGreenTitle: 'Blue-Green Deployment',
    deployBlueGreenDesc: 'Run two identical production environments (blue and green). Deploy new version to green. Test. Switch traffic from blue to green instantly. Green becomes the new production. Blue becomes the staging environment for the next deployment. Rollback is instant: just switch back.',
    deployCanaryTitle: 'Canary Deployment',
    deployCanaryDesc: 'Gradually shift traffic to the new version. Start with 5%, monitor error rates and latency, increase to 25%, 50%, 100%. Istio and Argo Rollouts automate canary deployments. If anything goes wrong, traffic shifts back immediately.',
    deployCode: 'Kubernetes canary deployment with Argo Rollouts',

    faqTitle: 'Frequently Asked Questions',
    faq1q: 'When should I use microservices instead of a monolith?',
    faq1a: 'Start with a monolith. Migrate to microservices when you have clear evidence of need: multiple teams stepping on each other, specific components needing independent scaling, or different technology requirements. Conway\'s Law says your architecture mirrors your org structure — you need at least 2-3 independent teams to benefit from microservices.',
    faq2q: 'How small should a microservice be?',
    faq2a: 'A microservice should be small enough to be owned and maintained by one team (2-8 engineers), but large enough to justify the operational overhead. A good heuristic: one aggregate per service, or one bounded context per service. If a service needs to call another service synchronously for most of its operations, they might belong together.',
    faq3q: 'How do I handle distributed transactions?',
    faq3a: 'Avoid distributed transactions whenever possible by designing service boundaries carefully. When unavoidable, use the Saga pattern with either choreography (events) or orchestration (saga orchestrator service). Never use 2-phase commit (2PC) in microservices — it creates tight coupling and blocking behavior.',
    faq4q: 'How do services share data without sharing a database?',
    faq4a: 'Services share data via APIs or events, not by directly querying another service\'s database. For reporting or analytics that needs data from multiple services, use an event-driven approach to build a separate read model (CQRS). For data consistency across services, use eventual consistency with domain events.',
    faq5q: 'What is the difference between an API Gateway and a service mesh?',
    faq5a: 'An API Gateway handles north-south traffic (external clients to services): auth, routing, rate limiting, SSL termination. A service mesh handles east-west traffic (service-to-service): mTLS, retries, circuit breaking, observability. They are complementary, not alternatives. You typically need both in a production microservices system.',
    faq6q: 'How do I avoid the microservices death star (over-connected services)?',
    faq6a: 'Apply the Single Responsibility Principle at the service level. Use async events instead of synchronous chains. Limit each service to 3-5 direct dependencies max. Regularly draw the service dependency graph — if it looks like a death star, refactor service boundaries. Strong domain modeling (DDD) prevents over-coupling.',
    faq7q: 'Should I use GraphQL or REST for my API Gateway?',
    faq7a: 'REST is simpler and better understood. Use REST unless you have specific needs that GraphQL solves: multiple clients with different data needs (mobile vs web), avoiding over-fetching on mobile, or a large surface area where clients need to compose their own queries. GraphQL Federation is gaining traction for microservices but adds complexity.',
    faq8q: 'How do I migrate from a monolith to microservices?',
    faq8a: 'Use the Strangler Fig pattern: new features are built as microservices, and the monolith is gradually replaced piece by piece. Start with services that are natural boundaries (e.g., user authentication), have clear interfaces, and can be extracted without touching the rest of the monolith. Never do a big-bang rewrite.',
  },
  zh: {
    title: '微服务指南：架构、通信模式与最佳实践',
    description: '全面的微服务架构指南，涵盖领域驱动设计、服务通信（REST、gRPC、消息队列）、API网关模式、服务发现、分布式追踪、事件驱动架构、CQRS、Saga模式、Docker/Kubernetes、服务网格、可观测性和部署策略。',

    tldr: '微服务将大型应用拆分为小型、可独立部署的服务。每个服务拥有自己的数据，通过API或事件通信，可独立部署而不影响其他服务。代价是：显著的运维复杂性 vs 独立扩展能力和团队自治。',

    keyTakeaways: '核心要点',
    kt1: '围绕业务领域（DDD限界上下文）设计，而非技术层次。',
    kt2: '请求-响应用同步REST/gRPC；解耦用异步消息（Kafka/RabbitMQ）。',
    kt3: '每个服务拥有自己的数据库 — 永远不要在服务间共享数据库。',
    kt4: '使用Saga模式处理分布式事务，而非2PC。',
    kt5: '使用API网关处理横切关注点：认证、限流、路由、熔断。',
    kt6: '可观测性（指标、日志、追踪）在生产微服务中是必不可少的。',
    kt7: '从模块化单体开始，只有在有明确扩展或团队需求时才提取服务。',
    kt8: '服务网格（Istio/Linkerd）在基础设施层处理mTLS、重试和流量整形。',

    introTitle: '什么是微服务？',
    introDesc1: '微服务是一种架构风格，将单个应用构建为一套小型、可独立部署的服务。每个服务运行在自己的进程中，通过轻量级机制（通常是HTTP/REST或消息队列）通信，可独立部署和扩展。',
    introDesc2: '该术语由Martin Fowler和James Lewis于2014年推广，尽管其底层概念——单一职责、关注点分离、松耦合——几十年来一直是核心软件工程原则。',
    introDesc3: 'Netflix、Amazon、Uber和Spotify等组织采用微服务，使数百个团队能够独立部署，扩展瓶颈服务而不影响其他服务，并在适当时使用不同的技术栈。',

    vsMonolithTitle: '微服务 vs 单体 vs 模块化单体',
    vsMonolithDesc: '在采用微服务之前，了解权衡。正确的架构取决于您的团队规模、部署频率和扩展需求。',

    dddTitle: '领域驱动设计：基础',
    dddDesc1: '领域驱动设计（DDD）提供了设计有效微服务所需的词汇和模式。没有DDD，团队往往会创建比所替换的单体更糟糕的过度耦合服务。',
    dddBoundedContextTitle: '限界上下文',
    dddBoundedContextDesc: '限界上下文是特定领域模型适用的清晰边界。"订单"在配送上下文（要交付的实物）和账单上下文（要生成的发票）中含义不同。每个微服务应对应一个限界上下文。',
    dddAggregateTitle: '聚合',
    dddAggregateDesc: '聚合是可作为单一单元处理的领域对象集群。聚合根是外部对象持有引用的唯一对象。聚合定义事务边界——不应有跨越多个聚合（因此也不跨越多个服务）的事务。',
    dddCode: 'OrderAggregate示例（TypeScript）',

    commTitle: '服务通信模式',
    commDesc: '选择正确的通信模式至关重要。错误的选择会导致紧耦合、级联故障和性能差。',
    restTitle: 'REST（HTTP/JSON）',
    restDesc: 'REST是最常见的同步通信协议。它简单、广为人知，适用于任何语言。REST适用于外部API，以及简单性比性能更重要的场景。',
    grpcTitle: 'gRPC（协议缓冲区）',
    grpcDesc: 'gRPC使用协议缓冲区进行序列化，性能比REST/JSON好3-10倍。它通过.proto文件支持流式传输、强类型和代码生成。gRPC适用于性能关键的内部服务间通信。',
    mqTitle: '消息队列（异步）',
    mqDesc: '通过Kafka、RabbitMQ或AWS SQS的异步消息传递解耦服务。生产者不等待消费者处理消息。消息传递适用于事件驱动工作流、需要有保证交付时，或消费者可能暂时不可用时。',
    commCompareTitle: '通信模式比较',

    gatewayTitle: 'API网关模式',
    gatewayDesc1: 'API网关是所有客户端请求的单一入口点。它处理横切关注点，因此各服务无需重复实现。',
    gatewayDesc2: '流行的API网关包括Kong、AWS API Gateway、带Lua的Nginx、Traefik和Envoy。在Kubernetes中，Ingress控制器通常充当API网关。',
    gatewayFeaturesTitle: 'API网关核心职责',
    gatewayCode: 'Kong API网关配置示例',

    discoveryTitle: '服务发现',
    discoveryDesc1: '在动态微服务环境中，服务实例频繁启停。服务发现解决了服务如何在没有硬编码IP地址的情况下相互找到的问题。',
    discoveryClientTitle: '客户端服务发现',
    discoveryClientDesc: '客户端查询服务注册中心（Consul、Eureka）获取可用实例，然后自己应用负载均衡逻辑。Netflix Ribbon是典型例子。更灵活但增加了每个客户端的复杂性。',
    discoveryServerTitle: '服务器端服务发现',
    discoveryServerDesc: '客户端向负载均衡器或DNS发出请求，后者查询注册中心并转发请求。Kubernetes DNS是典型例子——服务可通过service-name.namespace.svc.cluster.local访问。客户端更简单但需要基础设施支持。',
    discoveryCode: 'Kubernetes服务发现示例',

    tracingTitle: '分布式追踪',
    tracingDesc1: '单个用户请求可能涉及数十个服务。分布式追踪跟踪请求在所有服务中的旅程，使识别延迟瓶颈和诊断故障成为可能。',
    tracingCorrelationTitle: '关联ID',
    tracingCorrelationDesc: '每个请求在入口点（API网关）获得唯一的追踪ID。每个服务通过HTTP头（X-Trace-Id、X-Span-Id）传播此ID，并将其包含在所有日志条目中。这让您可以在所有服务中grep单个请求的所有日志。',
    tracingOpenTelTitle: 'OpenTelemetry',
    tracingOpenTelDesc: 'OpenTelemetry是分布式追踪、指标和日志的CNCF标准。它提供供应商中立的SDK，可导出到Jaeger、Zipkin、Datadog或任何兼容OpenTelemetry的后端。',
    tracingCode: 'OpenTelemetry Node.js设置示例',

    eventTitle: '事件驱动架构',
    eventDesc1: '事件驱动架构（EDA）使用事件在服务间通信。当一个服务中发生某事时，它发布一个事件。其他服务订阅它们关心的事件并做出相应反应。',
    eventKafkaTitle: 'Apache Kafka',
    eventKafkaDesc: 'Kafka是分布式事件流平台。事件存储在主题中并分区以实现可扩展性。消费者按自己的节奏读取事件，事件可以重放。Kafka非常适合高吞吐量事件流、审计日志和事件溯源。',
    eventRabbitTitle: 'RabbitMQ',
    eventRabbitDesc: 'RabbitMQ是实现AMQP的消息代理。它通过交换机和队列支持复杂路由。更适合任务队列和RPC风格的消息传递。消息通常在消费后删除（不像Kafka那样保留）。',
    eventSourcingTitle: '事件溯源',
    eventSourcingDesc: '事件溯源不存储当前状态，而是存储导致当前状态的事件序列。当前状态通过重放事件派生。这提供了完整的审计跟踪、时间查询和重建读取模型的能力。',
    eventCode: 'Node.js中的Kafka生产者/消费者示例',

    dataTitle: '微服务中的数据管理',
    dataDesc1: '微服务中最难的部分是数据管理。核心原则是每服务一数据库：每个服务拥有自己的数据，其他服务不能直接查询它。',
    dataCQRSTitle: 'CQRS（命令查询职责分离）',
    dataCQRSDesc: 'CQRS将读写操作分离为不同的模型。写入侧处理命令并发出事件。读取侧维护针对查询优化的非规范化读取模型（投影）。这允许独立扩展读写。',
    dataSagaTitle: 'Saga模式处理分布式事务',
    dataSagaDesc: '当业务操作跨越多个服务时（例如：下单→预留库存→扣款），不能使用数据库事务。Saga模式协调一系列本地事务，并为回滚提供补偿事务。',
    dataSagaChoreTitle: '编排 vs 协调',
    dataSagaChoreDesc: '编排：服务对事件做出反应，没有中央协调器。解耦但难以追踪。协调：中央Saga协调器（独立服务）告知每个参与者该做什么。更易于理解和调试，但增加了中央服务。',
    dataCode: 'Saga协调示例',

    containerTitle: '容器化与编排',
    containerDesc1: 'Docker将每个微服务打包成可移植的自包含镜像。Kubernetes在集群中协调这些容器，处理部署、扩展、健康检查和服务发现。',
    dockerfileTitle: '生产Dockerfile最佳实践',
    k8sTitle: 'Kubernetes部署模式',
    k8sDesc: 'Kubernetes Deployment管理Pod的ReplicaSet。Service提供稳定的网络访问。HorizontalPodAutoscaler根据CPU/内存或自定义指标扩展Pod。',
    containerCode: '多阶段Dockerfile示例',
    k8sCode: 'Kubernetes Deployment + Service YAML',

    meshTitle: '服务网格',
    meshDesc1: '服务网格是处理服务间通信的基础设施层。它提供mTLS、重试、熔断、负载均衡和可观测性，无需修改应用代码。',
    meshIstioTitle: 'Istio',
    meshIstioDesc: 'Istio向每个Pod注入边车代理（Envoy）。所有流量都经过代理，代理执行策略、收集遥测数据并处理故障。Istio提供集中配置所有代理的控制平面（Istiod）。',
    meshLinkerdTitle: 'Linkerd',
    meshLinkerdDesc: 'Linkerd是Istio的轻量级替代品。它使用基于Rust的微代理代替Envoy。Linkerd更易安装，资源开销更低。它专注于可靠性功能（重试、超时、熔断）和mTLS。',
    meshCode: 'Istio VirtualService金丝雀流量分割',

    observabilityTitle: '可观测性：指标、日志和追踪',
    observabilityDesc: '可观测性的三大支柱——指标、日志和追踪——对于理解生产中的系统行为至关重要。没有可观测性，调试微服务就像盲飞。',
    metricsTitle: '使用Prometheus的指标',
    metricsDesc: 'Prometheus通过HTTP从服务抓取指标。服务通过/metrics端点暴露计数器、仪表、直方图和摘要。Grafana可视化Prometheus数据。对每个服务使用RED方法：速率、错误、持续时间。',
    logsTitle: '结构化日志',
    logsDesc: '以JSON格式记录日志以启用机器解析。在每行日志中包含trace_id、服务名称、环境和严重级别。将日志发送到中央系统（Elasticsearch、Loki或CloudWatch）。',
    observabilityCode: 'Node.js中Prometheus指标示例',

    testingTitle: '测试策略',
    testingDesc: '测试微服务需要分层策略。测试金字塔仍然适用，但集成测试和契约测试变得更加重要。',
    testContractTitle: '使用Pact的契约测试',
    testContractDesc: '消费者驱动的契约测试确保服务（消费者）及其依赖项（提供者）对API契约达成一致。Pact是最流行的框架。消费者编写定义期望的测试，生成"pact"文件。提供者验证它能满足契约。',
    testE2ETitle: '端到端测试',
    testE2EDesc: 'E2E微服务测试维护成本高昂。仅为关键用户旅程保留它们。使用Docker Compose或Kubernetes启动完整堆栈。工具：Cypress、Playwright或REST Assured。',
    testCode: 'Pact消费者测试示例（JavaScript）',

    deployTitle: '部署策略',
    deployDesc: '零停机部署在微服务中至关重要。Kubernetes原生支持多种策略。',
    deployBlueGreenTitle: '蓝绿部署',
    deployBlueGreenDesc: '运行两个相同的生产环境（蓝色和绿色）。将新版本部署到绿色。测试。立即将流量从蓝色切换到绿色。绿色成为新的生产环境。蓝色成为下次部署的暂存环境。回滚是即时的：只需切回。',
    deployCanaryTitle: '金丝雀部署',
    deployCanaryDesc: '逐渐将流量转移到新版本。从5%开始，监控错误率和延迟，增加到25%、50%、100%。Istio和Argo Rollouts自动化金丝雀部署。如果出现问题，流量立即切回。',
    deployCode: '使用Argo Rollouts的Kubernetes金丝雀部署',

    faqTitle: '常见问题',
    faq1q: '什么时候应该使用微服务而不是单体？',
    faq1a: '从单体开始。当您有明确需求时再迁移到微服务：多个团队相互干扰、特定组件需要独立扩展，或技术要求不同。Conway定律说您的架构反映您的组织结构——您需要至少2-3个独立团队才能从微服务中受益。',
    faq2q: '微服务应该多小？',
    faq2a: '微服务应该小到可以由一个团队（2-8名工程师）拥有和维护，但足够大以证明运维开销合理。一个好的启发式：每服务一个聚合，或每服务一个限界上下文。如果一个服务大多数操作需要同步调用另一个服务，它们可能应该在一起。',
    faq3q: '如何处理分布式事务？',
    faq3a: '通过仔细设计服务边界尽量避免分布式事务。当不可避免时，使用Saga模式，采用编排（事件）或协调（Saga协调器服务）。永远不要在微服务中使用2阶段提交（2PC）——它会造成紧耦合和阻塞行为。',
    faq4q: '服务如何在不共享数据库的情况下共享数据？',
    faq4a: '服务通过API或事件共享数据，而不是直接查询另一个服务的数据库。对于需要来自多个服务数据的报告或分析，使用事件驱动方法构建独立的读取模型（CQRS）。对于跨服务的数据一致性，使用带领域事件的最终一致性。',
    faq5q: 'API网关和服务网格有什么区别？',
    faq5a: 'API网关处理南北流量（外部客户端到服务）：认证、路由、限流、SSL终止。服务网格处理东西流量（服务间）：mTLS、重试、熔断、可观测性。它们互补，不是替代关系。在生产微服务系统中通常需要两者。',
    faq6q: '如何避免微服务死星（过度连接的服务）？',
    faq6a: '在服务级别应用单一职责原则。使用异步事件代替同步链。每个服务最多限制3-5个直接依赖。定期绘制服务依赖图——如果看起来像死星，重构服务边界。强大的领域建模（DDD）可防止过度耦合。',
    faq7q: '应该为API网关使用GraphQL还是REST？',
    faq7a: 'REST更简单、更广为人知。除非您有GraphQL解决的特定需求，否则使用REST：多个具有不同数据需求的客户端（移动端vs网页）、避免移动端过度获取，或客户端需要组合自己查询的大型表面积。GraphQL Federation在微服务中越来越受欢迎，但增加了复杂性。',
    faq8q: '如何从单体迁移到微服务？',
    faq8a: '使用绞杀者无花果模式：新功能构建为微服务，单体逐步被替换。从自然边界的服务开始（例如用户认证），这些服务具有清晰的接口，可以在不接触单体其余部分的情况下提取。永远不要进行大爆炸式重写。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When should I use microservices instead of a monolith?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start with a monolith. Migrate to microservices when you have clear evidence of need: multiple teams stepping on each other, specific components needing independent scaling, or different technology requirements. Conway\'s Law says your architecture mirrors your org structure — you need at least 2-3 independent teams to benefit from microservices.',
      },
    },
    {
      '@type': 'Question',
      name: 'How small should a microservice be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A microservice should be small enough to be owned and maintained by one team (2-8 engineers), but large enough to justify the operational overhead. A good heuristic: one aggregate per service, or one bounded context per service.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I handle distributed transactions in microservices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the Saga pattern with either choreography (events) or orchestration (saga orchestrator service). Never use 2-phase commit (2PC) in microservices — it creates tight coupling and blocking behavior.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do services share data without sharing a database?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Services share data via APIs or events, not by directly querying another service\'s database. For reporting, use an event-driven approach to build a separate read model (CQRS). For consistency, use eventual consistency with domain events.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between an API Gateway and a service mesh?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An API Gateway handles north-south traffic (external clients to services): auth, routing, rate limiting, SSL termination. A service mesh handles east-west traffic (service-to-service): mTLS, retries, circuit breaking, observability. They are complementary.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I avoid the microservices death star (over-connected services)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Apply the Single Responsibility Principle at the service level. Use async events instead of synchronous chains. Limit each service to 3-5 direct dependencies max. Regularly draw the service dependency graph and refactor if it looks like a death star.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use GraphQL or REST for my API Gateway?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'REST is simpler and better understood. Use REST unless you have specific needs that GraphQL solves: multiple clients with different data needs, avoiding over-fetching on mobile, or clients that need to compose their own queries.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I migrate from a monolith to microservices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the Strangler Fig pattern: new features are built as microservices, and the monolith is gradually replaced piece by piece. Start with services that are natural boundaries, have clear interfaces, and can be extracted without touching the rest of the monolith. Never do a big-bang rewrite.',
      },
    },
  ],
};

export default function MicroservicesGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const sectionStyle: React.CSSProperties = {
    marginBottom: '2.5rem',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: '1rem',
    marginTop: '2.5rem',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '0.5rem',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#334155',
    marginBottom: '0.75rem',
    marginTop: '1.75rem',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.75',
    color: '#475569',
    marginBottom: '1rem',
  };

  const codeBlockStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '1.25rem 1.5rem',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace',
    whiteSpace: 'pre',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  };

  const thStyle: React.CSSProperties = {
    background: '#1e293b',
    color: '#f1f5f9',
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontWeight: 600,
    borderBottom: '2px solid #334155',
  };

  const tdStyle: React.CSSProperties = {
    padding: '0.7rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    color: '#475569',
    verticalAlign: 'top',
  };

  const tdAltStyle: React.CSSProperties = {
    ...tdStyle,
    background: '#f8fafc',
  };

  const tldrStyle: React.CSSProperties = {
    background: '#f0f9ff',
    border: '1px solid #0ea5e9',
    borderLeft: '4px solid #0ea5e9',
    borderRadius: '8px',
    padding: '1.25rem 1.5rem',
    marginBottom: '2rem',
  };

  const ktStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1.25rem 1.5rem',
    marginBottom: '2rem',
  };

  const badgeStyle = (color: string): React.CSSProperties => ({
    display: 'inline-block',
    background: color,
    color: '#fff',
    borderRadius: '4px',
    padding: '2px 8px',
    fontSize: '0.75rem',
    fontWeight: 600,
    marginRight: '6px',
  });

  const inlineCodeStyle: React.CSSProperties = {
    background: '#f1f5f9',
    color: '#0f172a',
    padding: '1px 6px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '0.875em',
  };

  const asciiDiagramStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '0.85rem',
    color: '#334155',
    lineHeight: '1.5',
    overflowX: 'auto',
    whiteSpace: 'pre',
    marginBottom: '1.5rem',
  };

  const noteStyle: React.CSSProperties = {
    background: '#fffbeb',
    border: '1px solid #fbbf24',
    borderLeft: '4px solid #f59e0b',
    borderRadius: '6px',
    padding: '0.875rem 1.25rem',
    marginBottom: '1.25rem',
    color: '#78350f',
    fontSize: '0.9rem',
  };

  const tipStyle: React.CSSProperties = {
    background: '#f0fdf4',
    border: '1px solid #86efac',
    borderLeft: '4px solid #22c55e',
    borderRadius: '6px',
    padding: '0.875rem 1.25rem',
    marginBottom: '1.25rem',
    color: '#14532d',
    fontSize: '0.9rem',
  };

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem', color: '#1e293b', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={tldrStyle}>
        <strong style={{ color: '#0369a1', display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: '1.65' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={ktStyle}>
        <strong style={{ color: '#334155', display: 'block', marginBottom: '0.75rem', fontSize: '1rem' }}>{t.keyTakeaways}</strong>
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          {[t.kt1, t.kt2, t.kt3, t.kt4, t.kt5, t.kt6, t.kt7, t.kt8].map((item, idx) => (
            <li key={idx} style={{ color: '#475569', lineHeight: '1.7', marginBottom: '0.35rem' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Introduction */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.introTitle}</h2>
        <p style={pStyle}>{t.introDesc1}</p>
        <p style={pStyle}>{t.introDesc2}</p>
        <p style={pStyle}>{t.introDesc3}</p>

        <div style={asciiDiagramStyle}>{
          'Monolith vs Microservices\n' +
          '\n' +
          'MONOLITH                      MICROSERVICES\n' +
          '+-----------------------+     +-------+  +-------+  +-------+\n' +
          '|  UI Layer             |     |  UI   |  |  API  |  | Auth  |\n' +
          '|  Business Logic       |     | Svc   |  | Gtwy  |  |  Svc  |\n' +
          '|  Data Access          |     +-------+  +-------+  +-------+\n' +
          '|  All In One Process   |         |          |          |\n' +
          '+-----------+-----------+     +-------+  +-------+  +-------+\n' +
          '            |                 | Order |  | Invty |  | Notif |\n' +
          '    +-------+-------+         |  Svc  |  |  Svc  |  |  Svc  |\n' +
          '    | Single DB     |         +---+---+  +---+---+  +---+---+\n' +
          '    +---------------+             |          |          |\n' +
          '                              +---+---+  +---+---+  +---+---+\n' +
          '                              | Order |  | Invty |  | Email |\n' +
          '                              |  DB   |  |  DB   |  |  DB   |\n' +
          '                              +-------+  +-------+  +-------+'
        }</div>
      </section>

      {/* Monolith vs Microservices Comparison */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.vsMonolithTitle}</h2>
        <p style={pStyle}>{t.vsMonolithDesc}</p>

        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Dimension</th>
                <th style={thStyle}>Monolith</th>
                <th style={thStyle}>Modular Monolith</th>
                <th style={thStyle}>Microservices</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdAltStyle}><strong>Deployment</strong></td>
                <td style={tdAltStyle}>Single artifact</td>
                <td style={tdAltStyle}>Single artifact, modular internals</td>
                <td style={tdAltStyle}>Independent per service</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Scalability</strong></td>
                <td style={tdStyle}>Scale entire app</td>
                <td style={tdStyle}>Scale entire app</td>
                <td style={tdStyle}>Scale individual services</td>
              </tr>
              <tr>
                <td style={tdAltStyle}><strong>Dev Complexity</strong></td>
                <td style={tdAltStyle}><span style={badgeStyle('#22c55e')}>Low</span></td>
                <td style={tdAltStyle}><span style={badgeStyle('#f59e0b')}>Medium</span></td>
                <td style={tdAltStyle}><span style={badgeStyle('#ef4444')}>High</span></td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Ops Complexity</strong></td>
                <td style={tdStyle}><span style={badgeStyle('#22c55e')}>Low</span></td>
                <td style={tdStyle}><span style={badgeStyle('#22c55e')}>Low</span></td>
                <td style={tdStyle}><span style={badgeStyle('#ef4444')}>Very High</span></td>
              </tr>
              <tr>
                <td style={tdAltStyle}><strong>Team Autonomy</strong></td>
                <td style={tdAltStyle}>Shared codebase</td>
                <td style={tdAltStyle}>Module ownership</td>
                <td style={tdAltStyle}>Full service ownership</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Tech Diversity</strong></td>
                <td style={tdStyle}>Single stack</td>
                <td style={tdStyle}>Single stack</td>
                <td style={tdStyle}>Per-service choice</td>
              </tr>
              <tr>
                <td style={tdAltStyle}><strong>Data Isolation</strong></td>
                <td style={tdAltStyle}>Shared DB</td>
                <td style={tdAltStyle}>Shared DB, schema modules</td>
                <td style={tdAltStyle}>DB per service</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Best For</strong></td>
                <td style={tdStyle}>&lt;10 devs, early-stage</td>
                <td style={tdStyle}>10-50 devs, clean architecture</td>
                <td style={tdStyle}>50+ devs, proven domain</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={noteStyle}>
          <strong>Production tip:</strong> Netflix, Amazon, and Uber all started as monoliths. They migrated to microservices only after achieving product-market fit and facing genuine scaling bottlenecks. Premature microservices is a common failure mode.
        </div>
      </section>

      {/* Domain-Driven Design */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.dddTitle}</h2>
        <p style={pStyle}>{t.dddDesc1}</p>

        <h3 style={h3Style}>{t.dddBoundedContextTitle}</h3>
        <p style={pStyle}>{t.dddBoundedContextDesc}</p>

        <div style={asciiDiagramStyle}>{
          'Bounded Contexts Example: E-Commerce\n' +
          '\n' +
          '+------------------+   +------------------+   +------------------+\n' +
          '|  Order Context   |   | Shipping Context |   | Billing Context  |\n' +
          '|                  |   |                  |   |                  |\n' +
          '|  Order           |   |  Order           |   |  Order           |\n' +
          '|   - items[]      |   |   - trackingNo   |   |   - invoiceNo    |\n' +
          '|   - status       |   |   - weight       |   |   - taxAmount    |\n' +
          '|   - customerId   |   |   - carrier      |   |   - dueDate      |\n' +
          '+------------------+   +------------------+   +------------------+\n' +
          '        ^                       ^                       ^\n' +
          '        |  Same concept "Order" has different meaning per context\n' +
          '        |  Each context has its OWN model and OWN database'
        }</div>

        <h3 style={h3Style}>{t.dddAggregateTitle}</h3>
        <p style={pStyle}>{t.dddAggregateDesc}</p>

        <p style={{ ...pStyle, fontStyle: 'italic', color: '#64748b' }}>{t.dddCode}:</p>
        <div style={codeBlockStyle}>{
          '// Order Aggregate (TypeScript)\n' +
          'class Order {\n' +
          '  private id: OrderId;\n' +
          '  private customerId: CustomerId;\n' +
          '  private items: OrderItem[] = [];\n' +
          '  private status: OrderStatus = OrderStatus.PENDING;\n' +
          '  private events: DomainEvent[] = [];\n' +
          '\n' +
          '  // Aggregate Root — all operations go through this object\n' +
          '  addItem(productId: ProductId, quantity: number, price: Money): void {\n' +
          '    if (this.status !== OrderStatus.PENDING) {\n' +
          '      throw new Error("Cannot add items to a non-pending order");\n' +
          '    }\n' +
          '    const item = new OrderItem(productId, quantity, price);\n' +
          '    this.items.push(item);\n' +
          '    this.events.push(new ItemAddedEvent(this.id, item));\n' +
          '  }\n' +
          '\n' +
          '  confirm(): void {\n' +
          '    if (this.items.length === 0) {\n' +
          '      throw new Error("Cannot confirm empty order");\n' +
          '    }\n' +
          '    this.status = OrderStatus.CONFIRMED;\n' +
          '    // Emit domain event — other contexts react to this\n' +
          '    this.events.push(new OrderConfirmedEvent(this.id, this.customerId));\n' +
          '  }\n' +
          '\n' +
          '  // Transaction boundary: OrderItem CANNOT be modified outside Order\n' +
          '  // Never hold a direct reference to OrderItem from outside this aggregate\n' +
          '  getTotal(): Money {\n' +
          '    return this.items.reduce((sum, item) => sum.add(item.subtotal()), Money.ZERO);\n' +
          '  }\n' +
          '\n' +
          '  pullEvents(): DomainEvent[] {\n' +
          '    const events = [...this.events];\n' +
          '    this.events = [];\n' +
          '    return events;\n' +
          '  }\n' +
          '}'
        }</div>
      </section>

      {/* Service Communication */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.commTitle}</h2>
        <p style={pStyle}>{t.commDesc}</p>

        <h3 style={h3Style}>{t.restTitle}</h3>
        <p style={pStyle}>{t.restDesc}</p>

        <h3 style={h3Style}>{t.grpcTitle}</h3>
        <p style={pStyle}>{t.grpcDesc}</p>

        <div style={codeBlockStyle}>{
          '// order.proto — gRPC service definition\n' +
          'syntax = "proto3";\n' +
          'package order;\n' +
          '\n' +
          'service OrderService {\n' +
          '  rpc GetOrder(GetOrderRequest) returns (Order);\n' +
          '  rpc CreateOrder(CreateOrderRequest) returns (Order);\n' +
          '  rpc StreamOrders(StreamOrdersRequest) returns (stream Order);\n' +
          '}\n' +
          '\n' +
          'message GetOrderRequest {\n' +
          '  string order_id = 1;\n' +
          '}\n' +
          '\n' +
          'message Order {\n' +
          '  string id = 1;\n' +
          '  string customer_id = 2;\n' +
          '  repeated OrderItem items = 3;\n' +
          '  OrderStatus status = 4;\n' +
          '  int64 created_at = 5;\n' +
          '}\n' +
          '\n' +
          'message OrderItem {\n' +
          '  string product_id = 1;\n' +
          '  int32 quantity = 2;\n' +
          '  int64 price_cents = 3;\n' +
          '}\n' +
          '\n' +
          'enum OrderStatus {\n' +
          '  PENDING = 0;\n' +
          '  CONFIRMED = 1;\n' +
          '  SHIPPED = 2;\n' +
          '}'
        }</div>

        <h3 style={h3Style}>{t.mqTitle}</h3>
        <p style={pStyle}>{t.mqDesc}</p>

        <h3 style={h3Style}>{t.commCompareTitle}</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Protocol</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Latency</th>
                <th style={thStyle}>Coupling</th>
                <th style={thStyle}>Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdAltStyle}><strong>REST/HTTP</strong></td>
                <td style={tdAltStyle}>Synchronous</td>
                <td style={tdAltStyle}>~1-50ms</td>
                <td style={tdAltStyle}><span style={badgeStyle('#f59e0b')}>Temporal</span></td>
                <td style={tdAltStyle}>External APIs, simple services</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>gRPC</strong></td>
                <td style={tdStyle}>Synchronous</td>
                <td style={tdStyle}>~0.1-5ms</td>
                <td style={tdStyle}><span style={badgeStyle('#f59e0b')}>Temporal</span></td>
                <td style={tdStyle}>Internal high-perf service calls</td>
              </tr>
              <tr>
                <td style={tdAltStyle}><strong>Kafka</strong></td>
                <td style={tdAltStyle}>Async / Stream</td>
                <td style={tdAltStyle}>~5-50ms</td>
                <td style={tdAltStyle}><span style={badgeStyle('#22c55e')}>Loose</span></td>
                <td style={tdAltStyle}>Event streaming, audit log, fan-out</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>RabbitMQ</strong></td>
                <td style={tdStyle}>Async / Queue</td>
                <td style={tdStyle}>~1-10ms</td>
                <td style={tdStyle}><span style={badgeStyle('#22c55e')}>Loose</span></td>
                <td style={tdStyle}>Task queues, RPC, routing</td>
              </tr>
              <tr>
                <td style={tdAltStyle}><strong>AWS SQS/SNS</strong></td>
                <td style={tdAltStyle}>Async / Managed</td>
                <td style={tdAltStyle}>~10-200ms</td>
                <td style={tdAltStyle}><span style={badgeStyle('#22c55e')}>Loose</span></td>
                <td style={tdAltStyle}>Managed cloud, fan-out, FIFO</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* API Gateway */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.gatewayTitle}</h2>
        <p style={pStyle}>{t.gatewayDesc1}</p>
        <p style={pStyle}>{t.gatewayDesc2}</p>

        <div style={asciiDiagramStyle}>{
          'API Gateway Architecture\n' +
          '\n' +
          '  Mobile     Web      3rd-Party\n' +
          '    App      SPA        Client\n' +
          '     |        |           |\n' +
          '     +--------+-----------+\n' +
          '              |\n' +
          '     +--------v-----------+\n' +
          '     |    API  GATEWAY    |\n' +
          '     |  - SSL Termination |\n' +
          '     |  - Auth / JWT      |\n' +
          '     |  - Rate Limiting   |\n' +
          '     |  - Request Routing |\n' +
          '     |  - Circuit Breaker |\n' +
          '     |  - Request Logging |\n' +
          '     |  - Response Cache  |\n' +
          '     +--+------+------+---+\n' +
          '        |      |      |\n' +
          '   +----+  +---+  +--+---+\n' +
          '   |Order|  |Auth|  |Notif|\n' +
          '   | Svc |  | Svc|  | Svc |\n' +
          '   +-----+  +----+  +-----+'
        }</div>

        <h3 style={h3Style}>{t.gatewayFeaturesTitle}</h3>
        <p style={{ ...pStyle, fontStyle: 'italic', color: '#64748b' }}>{t.gatewayCode}:</p>
        <div style={codeBlockStyle}>{
          '# Kong declarative config (kong.yml)\n' +
          '_format_version: "3.0"\n' +
          '\n' +
          'services:\n' +
          '  - name: order-service\n' +
          '    url: http://order-svc:3000\n' +
          '    routes:\n' +
          '      - name: order-routes\n' +
          '        paths:\n' +
          '          - /api/orders\n' +
          '        methods:\n' +
          '          - GET\n' +
          '          - POST\n' +
          '    plugins:\n' +
          '      - name: jwt              # JWT validation\n' +
          '        config:\n' +
          '          secret_is_base64: false\n' +
          '      - name: rate-limiting    # Rate limiting\n' +
          '        config:\n' +
          '          minute: 60\n' +
          '          hour: 1000\n' +
          '          policy: local\n' +
          '      - name: circuit-breaker  # Circuit breaker\n' +
          '        config:\n' +
          '          timeout: 5000\n' +
          '          error_threshold: 50\n' +
          '          volume_threshold: 10\n' +
          '\n' +
          '  - name: auth-service\n' +
          '    url: http://auth-svc:3001\n' +
          '    routes:\n' +
          '      - name: auth-routes\n' +
          '        paths:\n' +
          '          - /api/auth\n' +
          '    plugins:\n' +
          '      - name: cors\n' +
          '        config:\n' +
          '          origins:\n' +
          '            - https://myapp.com\n' +
          '          methods:\n' +
          '            - GET\n' +
          '            - POST\n' +
          '            - OPTIONS'
        }</div>
      </section>

      {/* Service Discovery */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.discoveryTitle}</h2>
        <p style={pStyle}>{t.discoveryDesc1}</p>

        <h3 style={h3Style}>{t.discoveryClientTitle}</h3>
        <p style={pStyle}>{t.discoveryClientDesc}</p>

        <h3 style={h3Style}>{t.discoveryServerTitle}</h3>
        <p style={pStyle}>{t.discoveryServerDesc}</p>

        <p style={{ ...pStyle, fontStyle: 'italic', color: '#64748b' }}>{t.discoveryCode}:</p>
        <div style={codeBlockStyle}>{
          '# Kubernetes Service + DNS discovery\n' +
          '\n' +
          'apiVersion: v1\n' +
          'kind: Service\n' +
          'metadata:\n' +
          '  name: order-service\n' +
          '  namespace: production\n' +
          'spec:\n' +
          '  selector:\n' +
          '    app: order-api\n' +
          '  ports:\n' +
          '    - protocol: TCP\n' +
          '      port: 80\n' +
          '      targetPort: 3000\n' +
          '  type: ClusterIP  # Only accessible within cluster\n' +
          '\n' +
          '---\n' +
          '# Other services reach order-service via DNS:\n' +
          '# http://order-service.production.svc.cluster.local/orders\n' +
          '# Short form within same namespace: http://order-service/orders\n' +
          '\n' +
          '# Node.js service calling another service via DNS\n' +
          'const ORDER_SVC = process.env.ORDER_SERVICE_URL ||\n' +
          '  "http://order-service.production.svc.cluster.local";\n' +
          '\n' +
          'async function getOrder(orderId) {\n' +
          '  const response = await fetch(\n' +
          '    ORDER_SVC + "/orders/" + orderId,\n' +
          '    {\n' +
          '      headers: {\n' +
          '        "X-Trace-Id": getCurrentTraceId(),\n' +
          '        "Authorization": "Bearer " + getServiceToken(),\n' +
          '      },\n' +
          '      signal: AbortSignal.timeout(5000), // 5s timeout\n' +
          '    }\n' +
          '  );\n' +
          '  if (!response.ok) throw new Error("Order service error: " + response.status);\n' +
          '  return response.json();\n' +
          '}'
        }</div>
      </section>

      {/* Distributed Tracing */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.tracingTitle}</h2>
        <p style={pStyle}>{t.tracingDesc1}</p>

        <h3 style={h3Style}>{t.tracingCorrelationTitle}</h3>
        <p style={pStyle}>{t.tracingCorrelationDesc}</p>

        <h3 style={h3Style}>{t.tracingOpenTelTitle}</h3>
        <p style={pStyle}>{t.tracingOpenTelDesc}</p>

        <p style={{ ...pStyle, fontStyle: 'italic', color: '#64748b' }}>{t.tracingCode}:</p>
        <div style={codeBlockStyle}>{
          '// OpenTelemetry setup for Node.js microservice\n' +
          '// tracing.js — load BEFORE any other imports\n' +
          'const { NodeSDK } = require("@opentelemetry/sdk-node");\n' +
          'const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");\n' +
          'const { Resource } = require("@opentelemetry/resources");\n' +
          'const { SEMRESATTRS_SERVICE_NAME } = require("@opentelemetry/semantic-conventions");\n' +
          'const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");\n' +
          'const { ExpressInstrumentation } = require("@opentelemetry/instrumentation-express");\n' +
          '\n' +
          'const sdk = new NodeSDK({\n' +
          '  resource: new Resource({\n' +
          '    [SEMRESATTRS_SERVICE_NAME]: "order-service",\n' +
          '  }),\n' +
          '  traceExporter: new OTLPTraceExporter({\n' +
          '    url: "http://jaeger-collector:4318/v1/traces",\n' +
          '  }),\n' +
          '  instrumentations: [\n' +
          '    new HttpInstrumentation(),    // Auto-instrument HTTP calls\n' +
          '    new ExpressInstrumentation(), // Auto-instrument Express routes\n' +
          '  ],\n' +
          '});\n' +
          '\n' +
          'sdk.start();\n' +
          '\n' +
          '// Manual span creation for business logic\n' +
          'const { trace, context } = require("@opentelemetry/api");\n' +
          'const tracer = trace.getTracer("order-service");\n' +
          '\n' +
          'async function processOrder(orderId) {\n' +
          '  const span = tracer.startSpan("processOrder", {\n' +
          '    attributes: { "order.id": orderId },\n' +
          '  });\n' +
          '  try {\n' +
          '    const result = await context.with(\n' +
          '      trace.setSpan(context.active(), span),\n' +
          '      () => doProcessOrder(orderId)\n' +
          '    );\n' +
          '    span.setStatus({ code: 1 }); // OK\n' +
          '    return result;\n' +
          '  } catch (err) {\n' +
          '    span.recordException(err);\n' +
          '    span.setStatus({ code: 2, message: err.message }); // ERROR\n' +
          '    throw err;\n' +
          '  } finally {\n' +
          '    span.end();\n' +
          '  }\n' +
          '}'
        }</div>
      </section>

      {/* Event-Driven Architecture */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.eventTitle}</h2>
        <p style={pStyle}>{t.eventDesc1}</p>

        <h3 style={h3Style}>{t.eventKafkaTitle}</h3>
        <p style={pStyle}>{t.eventKafkaDesc}</p>

        <h3 style={h3Style}>{t.eventRabbitTitle}</h3>
        <p style={pStyle}>{t.eventRabbitDesc}</p>

        <h3 style={h3Style}>{t.eventSourcingTitle}</h3>
        <p style={pStyle}>{t.eventSourcingDesc}</p>

        <p style={{ ...pStyle, fontStyle: 'italic', color: '#64748b' }}>{t.eventCode}:</p>
        <div style={codeBlockStyle}>{
          '// Kafka producer/consumer in Node.js (kafkajs)\n' +
          'const { Kafka } = require("kafkajs");\n' +
          '\n' +
          'const kafka = new Kafka({\n' +
          '  clientId: "order-service",\n' +
          '  brokers: ["kafka-1:9092", "kafka-2:9092", "kafka-3:9092"],\n' +
          '  retry: { initialRetryTime: 100, retries: 8 },\n' +
          '});\n' +
          '\n' +
          '// PRODUCER: Publish domain events\n' +
          'const producer = kafka.producer({ idempotent: true });\n' +
          '\n' +
          'async function publishOrderConfirmed(order) {\n' +
          '  await producer.connect();\n' +
          '  await producer.send({\n' +
          '    topic: "order.confirmed",\n' +
          '    messages: [{\n' +
          '      key: order.id,                    // Partition by order ID\n' +
          '      value: JSON.stringify({\n' +
          '        eventId: crypto.randomUUID(),\n' +
          '        eventType: "order.confirmed",\n' +
          '        occurredAt: new Date().toISOString(),\n' +
          '        data: { orderId: order.id, customerId: order.customerId },\n' +
          '      }),\n' +
          '      headers: { "trace-id": getCurrentTraceId() },\n' +
          '    }],\n' +
          '  });\n' +
          '}\n' +
          '\n' +
          '// CONSUMER: Inventory service reacts to order.confirmed\n' +
          'const consumer = kafka.consumer({ groupId: "inventory-service" });\n' +
          '\n' +
          'async function startInventoryConsumer() {\n' +
          '  await consumer.connect();\n' +
          '  await consumer.subscribe({\n' +
          '    topic: "order.confirmed",\n' +
          '    fromBeginning: false,\n' +
          '  });\n' +
          '\n' +
          '  await consumer.run({\n' +
          '    eachMessage: async ({ topic, partition, message }) => {\n' +
          '      const event = JSON.parse(message.value.toString());\n' +
          '      console.log("[inventory] Processing:", event.eventType, event.data.orderId);\n' +
          '\n' +
          '      // Idempotency check — Kafka can redeliver on retry\n' +
          '      const alreadyProcessed = await db.processedEvents.exists(event.eventId);\n' +
          '      if (alreadyProcessed) return;\n' +
          '\n' +
          '      await reserveInventory(event.data);\n' +
          '      await db.processedEvents.insert(event.eventId);\n' +
          '    },\n' +
          '  });\n' +
          '}'
        }</div>
      </section>

      {/* Data Management */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.dataTitle}</h2>
        <p style={pStyle}>{t.dataDesc1}</p>

        <h3 style={h3Style}>{t.dataCQRSTitle}</h3>
        <p style={pStyle}>{t.dataCQRSDesc}</p>

        <div style={asciiDiagramStyle}>{
          'CQRS Architecture\n' +
          '\n' +
          '  Client\n' +
          '    |\n' +
          '    +--COMMAND--> Command Handler --> Write DB (PostgreSQL)\n' +
          '    |                                        |\n' +
          '    |                              Domain Event Published\n' +
          '    |                                        |\n' +
          '    |                              Event Handler updates\n' +
          '    |                              Read Model (Elasticsearch / Redis)\n' +
          '    |                                        |\n' +
          '    +---QUERY---> Query Handler  <-- Read DB (Elasticsearch)'
        }</div>

        <h3 style={h3Style}>{t.dataSagaTitle}</h3>
        <p style={pStyle}>{t.dataSagaDesc}</p>

        <h3 style={h3Style}>{t.dataSagaChoreTitle}</h3>
        <p style={pStyle}>{t.dataSagaChoreDesc}</p>

        <p style={{ ...pStyle, fontStyle: 'italic', color: '#64748b' }}>{t.dataCode}:</p>
        <div style={codeBlockStyle}>{
          '// Saga Orchestrator — Place Order Saga\n' +
          'class PlaceOrderSaga {\n' +
          '  async execute(command) {\n' +
          '    const sagaId = crypto.randomUUID();\n' +
          '    const steps = [];\n' +
          '\n' +
          '    try {\n' +
          '      // Step 1: Create order in PENDING state\n' +
          '      const order = await this.orderService.create(command);\n' +
          '      steps.push({ action: "order.created", compensate: () =>\n' +
          '        this.orderService.cancel(order.id) });\n' +
          '\n' +
          '      // Step 2: Reserve inventory\n' +
          '      const reservation = await this.inventoryService.reserve(\n' +
          '        order.items\n' +
          '      );\n' +
          '      steps.push({ action: "inventory.reserved", compensate: () =>\n' +
          '        this.inventoryService.release(reservation.id) });\n' +
          '\n' +
          '      // Step 3: Charge payment\n' +
          '      const payment = await this.paymentService.charge({\n' +
          '        customerId: command.customerId,\n' +
          '        amount: order.total,\n' +
          '      });\n' +
          '      steps.push({ action: "payment.charged", compensate: () =>\n' +
          '        this.paymentService.refund(payment.id) });\n' +
          '\n' +
          '      // Step 4: Confirm order\n' +
          '      await this.orderService.confirm(order.id);\n' +
          '\n' +
          '      return { success: true, orderId: order.id };\n' +
          '\n' +
          '    } catch (error) {\n' +
          '      // COMPENSATE: run in reverse order\n' +
          '      console.error("Saga failed at step:", steps.length, error.message);\n' +
          '      for (const step of steps.reverse()) {\n' +
          '        try {\n' +
          '          await step.compensate();\n' +
          '        } catch (compensateError) {\n' +
          '          // Log compensation failure — requires manual intervention\n' +
          '          logger.error("Compensation failed", step.action, compensateError);\n' +
          '        }\n' +
          '      }\n' +
          '      throw new SagaFailedError(sagaId, error);\n' +
          '    }\n' +
          '  }\n' +
          '}'
        }</div>
      </section>

      {/* Containerization */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.containerTitle}</h2>
        <p style={pStyle}>{t.containerDesc1}</p>

        <h3 style={h3Style}>{t.dockerfileTitle}</h3>
        <p style={{ ...pStyle, fontStyle: 'italic', color: '#64748b' }}>{t.containerCode}:</p>
        <div style={codeBlockStyle}>{
          '# Multi-stage Dockerfile for Node.js microservice\n' +
          'FROM node:20-alpine AS deps\n' +
          'WORKDIR /app\n' +
          'COPY package*.json ./\n' +
          'RUN npm ci --only=production\n' +
          '\n' +
          '# Build stage\n' +
          'FROM node:20-alpine AS builder\n' +
          'WORKDIR /app\n' +
          'COPY package*.json ./\n' +
          'RUN npm ci\n' +
          'COPY . .\n' +
          'RUN npm run build\n' +
          '\n' +
          '# Production stage — minimal image\n' +
          'FROM node:20-alpine AS production\n' +
          'WORKDIR /app\n' +
          '\n' +
          '# Security: run as non-root user\n' +
          'RUN addgroup -S appgroup && adduser -S appuser -G appgroup\n' +
          '\n' +
          'COPY --from=deps /app/node_modules ./node_modules\n' +
          'COPY --from=builder /app/dist ./dist\n' +
          'COPY --from=builder /app/package.json ./\n' +
          '\n' +
          'USER appuser\n' +
          '\n' +
          'EXPOSE 3000\n' +
          '\n' +
          '# Health check\n' +
          'HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \\\n' +
          '  CMD wget -qO- http://localhost:3000/health || exit 1\n' +
          '\n' +
          'CMD ["node", "dist/server.js"]'
        }</div>

        <h3 style={h3Style}>{t.k8sTitle}</h3>
        <p style={pStyle}>{t.k8sDesc}</p>
        <p style={{ ...pStyle, fontStyle: 'italic', color: '#64748b' }}>{t.k8sCode}:</p>
        <div style={codeBlockStyle}>{
          '# kubernetes/order-service.yml\n' +
          'apiVersion: apps/v1\n' +
          'kind: Deployment\n' +
          'metadata:\n' +
          '  name: order-service\n' +
          '  namespace: production\n' +
          'spec:\n' +
          '  replicas: 3\n' +
          '  selector:\n' +
          '    matchLabels:\n' +
          '      app: order-service\n' +
          '  template:\n' +
          '    metadata:\n' +
          '      labels:\n' +
          '        app: order-service\n' +
          '        version: "1.4.2"\n' +
          '    spec:\n' +
          '      containers:\n' +
          '        - name: order-service\n' +
          '          image: myregistry/order-service:1.4.2\n' +
          '          ports:\n' +
          '            - containerPort: 3000\n' +
          '          env:\n' +
          '            - name: NODE_ENV\n' +
          '              value: "production"\n' +
          '            - name: DB_URL\n' +
          '              valueFrom:\n' +
          '                secretKeyRef:\n' +
          '                  name: order-secrets\n' +
          '                  key: database-url\n' +
          '          resources:\n' +
          '            requests:\n' +
          '              cpu: "100m"\n' +
          '              memory: "128Mi"\n' +
          '            limits:\n' +
          '              cpu: "500m"\n' +
          '              memory: "512Mi"\n' +
          '          readinessProbe:\n' +
          '            httpGet:\n' +
          '              path: /health/ready\n' +
          '              port: 3000\n' +
          '            initialDelaySeconds: 10\n' +
          '            periodSeconds: 5\n' +
          '          livenessProbe:\n' +
          '            httpGet:\n' +
          '              path: /health/live\n' +
          '              port: 3000\n' +
          '            initialDelaySeconds: 30\n' +
          '            periodSeconds: 10\n' +
          '---\n' +
          'apiVersion: v1\n' +
          'kind: Service\n' +
          'metadata:\n' +
          '  name: order-service\n' +
          'spec:\n' +
          '  selector:\n' +
          '    app: order-service\n' +
          '  ports:\n' +
          '    - port: 80\n' +
          '      targetPort: 3000\n' +
          '---\n' +
          'apiVersion: autoscaling/v2\n' +
          'kind: HorizontalPodAutoscaler\n' +
          'metadata:\n' +
          '  name: order-service-hpa\n' +
          'spec:\n' +
          '  scaleTargetRef:\n' +
          '    apiVersion: apps/v1\n' +
          '    kind: Deployment\n' +
          '    name: order-service\n' +
          '  minReplicas: 3\n' +
          '  maxReplicas: 20\n' +
          '  metrics:\n' +
          '    - type: Resource\n' +
          '      resource:\n' +
          '        name: cpu\n' +
          '        target:\n' +
          '          type: Utilization\n' +
          '          averageUtilization: 70'
        }</div>
      </section>

      {/* Service Mesh */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.meshTitle}</h2>
        <p style={pStyle}>{t.meshDesc1}</p>

        <h3 style={h3Style}>{t.meshIstioTitle}</h3>
        <p style={pStyle}>{t.meshIstioDesc}</p>

        <h3 style={h3Style}>{t.meshLinkerdTitle}</h3>
        <p style={pStyle}>{t.meshLinkerdDesc}</p>

        <p style={{ ...pStyle, fontStyle: 'italic', color: '#64748b' }}>{t.meshCode}:</p>
        <div style={codeBlockStyle}>{
          '# Istio VirtualService — canary traffic splitting\n' +
          'apiVersion: networking.istio.io/v1alpha3\n' +
          'kind: VirtualService\n' +
          'metadata:\n' +
          '  name: order-service\n' +
          'spec:\n' +
          '  hosts:\n' +
          '    - order-service\n' +
          '  http:\n' +
          '    - match:\n' +
          '        - headers:\n' +
          '            canary:\n' +
          '              exact: "true"         # Header-based routing for testing\n' +
          '      route:\n' +
          '        - destination:\n' +
          '            host: order-service\n' +
          '            subset: v2\n' +
          '    - route:                        # Default: 90% v1, 10% v2\n' +
          '        - destination:\n' +
          '            host: order-service\n' +
          '            subset: v1\n' +
          '          weight: 90\n' +
          '        - destination:\n' +
          '            host: order-service\n' +
          '            subset: v2\n' +
          '          weight: 10\n' +
          '      retries:\n' +
          '        attempts: 3\n' +
          '        perTryTimeout: 5s\n' +
          '        retryOn: "5xx,connect-failure"\n' +
          '      timeout: 30s\n' +
          '---\n' +
          'apiVersion: networking.istio.io/v1alpha3\n' +
          'kind: DestinationRule\n' +
          'metadata:\n' +
          '  name: order-service\n' +
          'spec:\n' +
          '  host: order-service\n' +
          '  trafficPolicy:\n' +
          '    tls:\n' +
          '      mode: ISTIO_MUTUAL  # mTLS between services\n' +
          '    connectionPool:\n' +
          '      tcp:\n' +
          '        maxConnections: 100\n' +
          '      http:\n' +
          '        h2UpgradePolicy: UPGRADE\n' +
          '    outlierDetection:\n' +
          '      consecutiveGatewayErrors: 5\n' +
          '      interval: 30s\n' +
          '      baseEjectionTime: 30s     # Circuit breaker\n' +
          '  subsets:\n' +
          '    - name: v1\n' +
          '      labels:\n' +
          '        version: v1\n' +
          '    - name: v2\n' +
          '      labels:\n' +
          '        version: v2'
        }</div>
      </section>

      {/* Observability */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.observabilityTitle}</h2>
        <p style={pStyle}>{t.observabilityDesc}</p>

        <h3 style={h3Style}>{t.metricsTitle}</h3>
        <p style={pStyle}>{t.metricsDesc}</p>

        <p style={{ ...pStyle, fontStyle: 'italic', color: '#64748b' }}>{t.observabilityCode}:</p>
        <div style={codeBlockStyle}>{
          '// Prometheus metrics in Node.js\n' +
          'const client = require("prom-client");\n' +
          '\n' +
          '// Enable default metrics (CPU, memory, GC, event loop)\n' +
          'client.collectDefaultMetrics({ prefix: "order_svc_" });\n' +
          '\n' +
          '// RED metrics: Rate, Errors, Duration\n' +
          'const httpRequestTotal = new client.Counter({\n' +
          '  name: "http_requests_total",\n' +
          '  help: "Total HTTP requests",\n' +
          '  labelNames: ["method", "route", "status_code"],\n' +
          '});\n' +
          '\n' +
          'const httpRequestDuration = new client.Histogram({\n' +
          '  name: "http_request_duration_seconds",\n' +
          '  help: "HTTP request duration",\n' +
          '  labelNames: ["method", "route", "status_code"],\n' +
          '  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],\n' +
          '});\n' +
          '\n' +
          'const ordersProcessed = new client.Counter({\n' +
          '  name: "orders_processed_total",\n' +
          '  help: "Total orders processed",\n' +
          '  labelNames: ["status"],\n' +
          '});\n' +
          '\n' +
          '// Express middleware\n' +
          'app.use((req, res, next) => {\n' +
          '  const end = httpRequestDuration.startTimer();\n' +
          '  res.on("finish", () => {\n' +
          '    const labels = {\n' +
          '      method: req.method,\n' +
          '      route: req.route ? req.route.path : req.path,\n' +
          '      status_code: res.statusCode,\n' +
          '    };\n' +
          '    httpRequestTotal.inc(labels);\n' +
          '    end(labels);\n' +
          '  });\n' +
          '  next();\n' +
          '});\n' +
          '\n' +
          '// Metrics endpoint — scraped by Prometheus\n' +
          'app.get("/metrics", async (req, res) => {\n' +
          '  res.set("Content-Type", client.register.contentType);\n' +
          '  res.end(await client.register.metrics());\n' +
          '});'
        }</div>

        <h3 style={h3Style}>{t.logsTitle}</h3>
        <p style={pStyle}>{t.logsDesc}</p>

        <div style={tipStyle}>
          <strong>Production tip:</strong> Use the ELK stack (Elasticsearch + Logstash + Kibana) or Grafana Loki for log aggregation. Always include <code style={inlineCodeStyle}>trace_id</code>, <code style={inlineCodeStyle}>service</code>, and <code style={inlineCodeStyle}>environment</code> fields in every log line for efficient cross-service debugging.
        </div>
      </section>

      {/* Testing */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.testingTitle}</h2>
        <p style={pStyle}>{t.testingDesc}</p>

        <h3 style={h3Style}>{t.testContractTitle}</h3>
        <p style={pStyle}>{t.testContractDesc}</p>

        <p style={{ ...pStyle, fontStyle: 'italic', color: '#64748b' }}>{t.testCode}:</p>
        <div style={codeBlockStyle}>{
          '// Pact consumer test — OrderService calling InventoryService\n' +
          'const { Pact } = require("@pact-foundation/pact");\n' +
          'const { like, eachLike } = require("@pact-foundation/pact").Matchers;\n' +
          '\n' +
          'const provider = new Pact({\n' +
          '  consumer: "OrderService",\n' +
          '  provider: "InventoryService",\n' +
          '  port: 4000,\n' +
          '  dir: "./pacts",\n' +
          '});\n' +
          '\n' +
          'describe("OrderService -> InventoryService contract", () => {\n' +
          '  before(() => provider.setup());\n' +
          '  after(() => provider.finalize());\n' +
          '\n' +
          '  describe("GET /inventory/:productId", () => {\n' +
          '    before(() => provider.addInteraction({\n' +
          '      state: "product SKU-123 exists with stock",\n' +
          '      uponReceiving: "a request for product inventory",\n' +
          '      withRequest: {\n' +
          '        method: "GET",\n' +
          '        path: "/inventory/SKU-123",\n' +
          '      },\n' +
          '      willRespondWith: {\n' +
          '        status: 200,\n' +
          '        headers: { "Content-Type": "application/json" },\n' +
          '        body: {\n' +
          '          productId: like("SKU-123"),\n' +
          '          quantity: like(50),\n' +
          '          available: like(true),\n' +
          '        },\n' +
          '      },\n' +
          '    }));\n' +
          '\n' +
          '    it("returns inventory for a product", async () => {\n' +
          '      const inventory = await inventoryClient.getInventory("SKU-123");\n' +
          '      expect(inventory.available).to.be.true;\n' +
          '      expect(inventory.quantity).to.be.a("number");\n' +
          '    });\n' +
          '  });\n' +
          '});'
        }</div>

        <h3 style={h3Style}>{t.testE2ETitle}</h3>
        <p style={pStyle}>{t.testE2EDesc}</p>

        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Test Type</th>
                <th style={thStyle}>Scope</th>
                <th style={thStyle}>Speed</th>
                <th style={thStyle}>Cost</th>
                <th style={thStyle}>Tools</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdAltStyle}><strong>Unit</strong></td>
                <td style={tdAltStyle}>Single class / function</td>
                <td style={tdAltStyle}><span style={badgeStyle('#22c55e')}>Fast</span></td>
                <td style={tdAltStyle}><span style={badgeStyle('#22c55e')}>Low</span></td>
                <td style={tdAltStyle}>Jest, Vitest, JUnit</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Integration</strong></td>
                <td style={tdStyle}>Service + DB / external</td>
                <td style={tdStyle}><span style={badgeStyle('#f59e0b')}>Medium</span></td>
                <td style={tdStyle}><span style={badgeStyle('#f59e0b')}>Medium</span></td>
                <td style={tdStyle}>Supertest, Testcontainers</td>
              </tr>
              <tr>
                <td style={tdAltStyle}><strong>Contract</strong></td>
                <td style={tdAltStyle}>API contract between services</td>
                <td style={tdAltStyle}><span style={badgeStyle('#f59e0b')}>Medium</span></td>
                <td style={tdAltStyle}><span style={badgeStyle('#f59e0b')}>Medium</span></td>
                <td style={tdAltStyle}>Pact, Spring Cloud Contract</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>E2E</strong></td>
                <td style={tdStyle}>Full system, UI to DB</td>
                <td style={tdStyle}><span style={badgeStyle('#ef4444')}>Slow</span></td>
                <td style={tdStyle}><span style={badgeStyle('#ef4444')}>High</span></td>
                <td style={tdStyle}>Cypress, Playwright</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Deployment */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.deployTitle}</h2>
        <p style={pStyle}>{t.deployDesc}</p>

        <h3 style={h3Style}>{t.deployBlueGreenTitle}</h3>
        <p style={pStyle}>{t.deployBlueGreenDesc}</p>

        <h3 style={h3Style}>{t.deployCanaryTitle}</h3>
        <p style={pStyle}>{t.deployCanaryDesc}</p>

        <p style={{ ...pStyle, fontStyle: 'italic', color: '#64748b' }}>{t.deployCode}:</p>
        <div style={codeBlockStyle}>{
          '# Argo Rollouts — Canary deployment with analysis\n' +
          'apiVersion: argoproj.io/v1alpha1\n' +
          'kind: Rollout\n' +
          'metadata:\n' +
          '  name: order-service\n' +
          'spec:\n' +
          '  replicas: 10\n' +
          '  selector:\n' +
          '    matchLabels:\n' +
          '      app: order-service\n' +
          '  template:\n' +
          '    metadata:\n' +
          '      labels:\n' +
          '        app: order-service\n' +
          '  strategy:\n' +
          '    canary:\n' +
          '      steps:\n' +
          '        - setWeight: 10        # 10% canary traffic\n' +
          '        - pause: { duration: 5m }  # Wait 5 min\n' +
          '        - analysis:            # Automated analysis\n' +
          '            templates:\n' +
          '              - templateName: success-rate\n' +
          '            args:\n' +
          '              - name: service-name\n' +
          '                value: order-service\n' +
          '        - setWeight: 25\n' +
          '        - pause: { duration: 10m }\n' +
          '        - setWeight: 50\n' +
          '        - pause: { duration: 10m }\n' +
          '        - setWeight: 100       # Full rollout\n' +
          '---\n' +
          'apiVersion: argoproj.io/v1alpha1\n' +
          'kind: AnalysisTemplate\n' +
          'metadata:\n' +
          '  name: success-rate\n' +
          'spec:\n' +
          '  metrics:\n' +
          '    - name: success-rate\n' +
          '      interval: 1m\n' +
          '      successCondition: result[0] >= 0.95  # 95% success rate required\n' +
          '      provider:\n' +
          '        prometheus:\n' +
          '          address: http://prometheus:9090\n' +
          '          query: |\n' +
          '            sum(rate(http_requests_total{job="{{args.service-name}}",status_code!~"5.."}[5m]))\n' +
          '            /\n' +
          '            sum(rate(http_requests_total{job="{{args.service-name}}"}[5m]))'
        }</div>
      </section>

      {/* FAQ Section */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.faqTitle}</h2>

        {[
          { q: t.faq1q, a: t.faq1a },
          { q: t.faq2q, a: t.faq2a },
          { q: t.faq3q, a: t.faq3a },
          { q: t.faq4q, a: t.faq4a },
          { q: t.faq5q, a: t.faq5a },
          { q: t.faq6q, a: t.faq6a },
          { q: t.faq7q, a: t.faq7a },
          { q: t.faq8q, a: t.faq8a },
        ].map((faq, idx) => (
          <div
            key={idx}
            style={{
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '1.25rem',
              marginBottom: '1.25rem',
            }}
          >
            <h3 style={{ ...h3Style, marginTop: 0, color: '#1e40af' }}>{faq.q}</h3>
            <p style={{ ...pStyle, marginBottom: 0 }}>{faq.a}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
