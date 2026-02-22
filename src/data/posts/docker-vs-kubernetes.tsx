'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Docker vs Kubernetes: When to Use Each in 2026',
    intro: 'Docker and Kubernetes are two of the most important technologies in modern software deployment, but they solve fundamentally different problems. Docker packages your application into portable containers, while Kubernetes orchestrates those containers at scale. This guide breaks down when to use each, how they complement each other, and how to decide the right approach for your project in 2026.',

    whatIsDockerTitle: 'What Is Docker?',
    whatIsDockerDesc1: 'Docker is a containerization platform that packages applications and their dependencies into lightweight, portable units called containers. Each container includes everything the application needs to run: code, runtime, system libraries, and configuration files. Containers share the host OS kernel, making them far more efficient than traditional virtual machines.',
    whatIsDockerDesc2: 'Docker solved a fundamental problem in software development: the "it works on my machine" syndrome. By packaging the entire runtime environment, Docker ensures that an application behaves identically in development, staging, and production. This consistency dramatically reduces deployment failures and simplifies debugging.',
    dockerfileTitle: 'Docker in Practice: Building an Image',
    dockerfileCode: `# Dockerfile for a Node.js application
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]`,
    dockerComposeTitle: 'Docker Compose for Multi-Container Apps',
    dockerComposeDesc: 'Docker Compose lets you define and run multi-container applications using a single YAML file. It is ideal for local development environments where you need a database, cache, and application server running together.',
    dockerComposeCode: `# docker-compose.yml
version: '3.9'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      timeout: 5s
      retries: 5

  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:`,

    whatIsK8sTitle: 'What Is Kubernetes?',
    whatIsK8sDesc1: 'Kubernetes (often abbreviated K8s) is a container orchestration platform originally developed by Google. It automates the deployment, scaling, and management of containerized applications across clusters of machines. While Docker runs containers on a single host, Kubernetes coordinates containers across many hosts.',
    whatIsK8sDesc2: 'Kubernetes provides self-healing capabilities: if a container crashes, Kubernetes automatically restarts it. If a node fails, Kubernetes reschedules containers to healthy nodes. It handles service discovery, load balancing, rolling updates, and secret management out of the box.',
    k8sArchTitle: 'Kubernetes Architecture',
    k8sArchDesc: 'A Kubernetes cluster consists of a control plane and worker nodes. The control plane manages the cluster state through the API server, scheduler, controller manager, and etcd (the distributed key-value store). Worker nodes run the kubelet agent and container runtime, executing the actual workloads in units called Pods.',
    k8sDeployCode: `# deployment.yaml — Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web-app
          image: myregistry/web-app:v2.1.0
          ports:
            - containerPort: 3000
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          livenessProbe:
            httpGet:
              path: /healthz
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 15
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: app-secrets
                  key: database-url
---
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
spec:
  selector:
    app: web-app
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-app-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
    - hosts:
        - app.example.com
      secretName: app-tls
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web-app-service
                port:
                  number: 80`,

    comparisonTitle: 'Docker vs Kubernetes: Feature Comparison',
    comparisonDesc: 'Understanding the fundamental differences helps you choose the right tool for each scenario:',

    whenDockerTitle: 'When to Use Docker Alone',
    whenDockerDesc: 'Docker without Kubernetes is the right choice in many common scenarios. Not every application needs container orchestration, and adding Kubernetes too early introduces unnecessary complexity.',
    whenDocker1: 'Local development environments where you need consistent, reproducible setups across team members.',
    whenDocker2: 'Small applications with 1-5 containers that can comfortably run on a single server.',
    whenDocker3: 'CI/CD pipelines where Docker provides isolated, clean build environments for testing and artifact generation.',
    whenDocker4: 'Monolithic applications that are being gradually containerized but do not yet need orchestration.',
    whenDocker5: 'Personal projects, prototypes, and MVPs where operational overhead must be minimal.',

    whenK8sTitle: 'When to Use Kubernetes',
    whenK8sDesc: 'Kubernetes becomes essential when your application needs to scale reliably across multiple machines, handle traffic spikes automatically, or maintain high availability.',
    whenK8s1: 'Microservices architectures with 10+ services that need independent scaling, deployment, and service discovery.',
    whenK8s2: 'Production workloads requiring zero-downtime deployments, automatic rollbacks, and self-healing.',
    whenK8s3: 'Multi-team organizations where different teams deploy independently to shared infrastructure.',
    whenK8s4: 'Applications with variable traffic patterns that benefit from horizontal pod autoscaling.',
    whenK8s5: 'Compliance-heavy environments where you need fine-grained access controls, network policies, and audit logging.',

    alternativesTitle: 'Alternatives to Full Kubernetes',
    alternativesDesc: 'Running a full Kubernetes cluster is operationally expensive. In 2026, several lighter alternatives have matured:',
    alt1Title: 'Docker Swarm',
    alt1Desc: 'Built into Docker Engine. Simpler than Kubernetes but with limited features. Good for small teams that need basic orchestration without the Kubernetes learning curve.',
    alt2Title: 'K3s / K0s',
    alt2Desc: 'Lightweight Kubernetes distributions that strip out cloud-provider-specific features. K3s uses about 512MB of RAM and is ideal for edge computing, IoT, and resource-constrained environments.',
    alt3Title: 'Managed Kubernetes (EKS, GKE, AKS)',
    alt3Desc: 'Cloud providers manage the control plane for you, reducing operational burden significantly. You only manage worker nodes and your application workloads. This is the most common Kubernetes deployment model in production.',
    alt4Title: 'Container-as-a-Service (Cloud Run, Fargate, Fly.io)',
    alt4Desc: 'Serverless container platforms that run your Docker containers without any cluster management. You push a container image and the platform handles scaling, networking, and infrastructure. Ideal when you want container portability without orchestration complexity.',

    hpaTitle: 'Kubernetes Autoscaling',
    hpaDesc: 'Horizontal Pod Autoscaler (HPA) automatically adjusts the number of pod replicas based on CPU usage, memory consumption, or custom metrics. This ensures your application scales to meet demand without over-provisioning.',
    hpaCode: `# hpa.yaml — Horizontal Pod Autoscaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
        - type: Pods
          value: 4
          periodSeconds: 60
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60`,

    decisionTitle: 'Decision Framework: Docker or Kubernetes?',
    decisionDesc: 'Use this framework to guide your decision based on your project needs:',

    bestPracticesTitle: 'Best Practices for Both',
    bp1: 'Use multi-stage Docker builds to keep production images small. A typical Node.js image can go from 1GB to 150MB with proper multi-stage configuration.',
    bp2: 'Never run containers as root. Always specify a non-root USER in your Dockerfile and set security contexts in Kubernetes.',
    bp3: 'Pin specific image tags instead of using "latest." Immutable tags (using image digests) provide the strongest guarantee of reproducibility.',
    bp4: 'Set resource requests and limits in Kubernetes. Without them, a single misbehaving pod can starve the entire node.',
    bp5: 'Implement health checks (liveness and readiness probes in Kubernetes, HEALTHCHECK in Docker). They enable self-healing and prevent traffic from reaching unhealthy instances.',
    bp6: 'Store secrets in dedicated secret management systems (Kubernetes Secrets with encryption at rest, HashiCorp Vault, or cloud-native solutions). Never bake secrets into container images.',
    bp7: 'Use namespaces in Kubernetes to isolate environments (dev, staging, production) and teams. Apply resource quotas and network policies per namespace.',
    bp8: 'Scan container images for vulnerabilities in your CI pipeline using tools like Trivy, Snyk, or Grype. Block images with critical CVEs from reaching production.',

    faq1q: 'Can I use Docker without Kubernetes?',
    faq1a: 'Absolutely. Docker is a standalone tool that works perfectly on its own. Docker Compose handles multi-container setups on a single host. Many successful production applications run on Docker without any orchestrator, especially when deployed to container-as-a-service platforms like Cloud Run, Fly.io, or Railway.',
    faq2q: 'Can I use Kubernetes without Docker?',
    faq2a: 'Yes. Since Kubernetes 1.24, Docker is no longer the default container runtime. Most production Kubernetes clusters use containerd or CRI-O directly. Kubernetes works with any OCI-compliant container runtime. You can still build images with Docker and run them on Kubernetes with containerd.',
    faq3q: 'How many containers do I need before Kubernetes makes sense?',
    faq3a: 'There is no magic number, but generally Kubernetes starts making sense when you have 10+ microservices, need auto-scaling, require zero-downtime deployments, or have multiple teams deploying independently. For fewer than 5 services, Docker Compose or a container-as-a-service platform is usually sufficient.',
    faq4q: 'Is Kubernetes overkill for small projects?',
    faq4a: 'For small projects, yes. Kubernetes has significant operational overhead: you need to understand networking, storage, RBAC, monitoring, and cluster maintenance. Managed Kubernetes (EKS, GKE) reduces this but still has a learning curve. For small projects, use Docker with a PaaS like Fly.io, Railway, or Render.',
    faq5q: 'What is the cost difference between Docker and Kubernetes?',
    faq5a: 'Docker itself is free and open source. Kubernetes is also free, but running a cluster has costs: compute for worker nodes, managed control plane fees ($70-200/month on cloud providers), monitoring, logging, and engineering time. A minimal production Kubernetes setup on AWS EKS costs roughly $200-500/month before workload costs. Docker on a single VPS can cost as little as $5-20/month.',

    tryTools: 'Try our related developer tools',
  },
  zh: {
    title: 'Docker vs Kubernetes：2026 年该如何选择',
    intro: 'Docker 和 Kubernetes 是现代软件部署中最重要的两项技术，但它们解决的是根本不同的问题。Docker 将应用打包成可移植的容器，而 Kubernetes 在大规模场景下编排这些容器。本指南详细分析何时使用哪个、它们如何互补，以及如何在 2026 年为你的项目做出正确选择。',

    whatIsDockerTitle: '什么是 Docker？',
    whatIsDockerDesc1: 'Docker 是一个容器化平台，将应用程序及其依赖项打包成轻量、可移植的单元（称为容器）。每个容器包含应用运行所需的一切：代码、运行时、系统库和配置文件。容器共享宿主机的操作系统内核，因此比传统虚拟机更加高效。',
    whatIsDockerDesc2: 'Docker 解决了软件开发中的一个根本问题："在我机器上能跑"综合症。通过打包整个运行时环境，Docker 确保应用在开发、测试和生产环境中行为完全一致。这种一致性大幅减少了部署失败并简化了调试过程。',
    dockerfileTitle: 'Docker 实战：构建镜像',
    dockerfileCode: `# Node.js 应用的 Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# 生产阶段
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]`,
    dockerComposeTitle: 'Docker Compose 多容器应用',
    dockerComposeDesc: 'Docker Compose 允许你使用单个 YAML 文件定义和运行多容器应用。非常适合需要数据库、缓存和应用服务器协同运行的本地开发环境。',
    dockerComposeCode: `# docker-compose.yml
version: '3.9'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      timeout: 5s
      retries: 5

  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:`,

    whatIsK8sTitle: '什么是 Kubernetes？',
    whatIsK8sDesc1: 'Kubernetes（通常缩写为 K8s）是一个容器编排平台，最初由 Google 开发。它自动化容器化应用在机器集群中的部署、扩展和管理。Docker 在单台主机上运行容器，而 Kubernetes 跨多台主机协调容器。',
    whatIsK8sDesc2: 'Kubernetes 提供自我修复能力：如果容器崩溃，Kubernetes 会自动重启；如果节点故障，Kubernetes 会将容器重新调度到健康节点。它还内置了服务发现、负载均衡、滚动更新和密钥管理功能。',
    k8sArchTitle: 'Kubernetes 架构',
    k8sArchDesc: 'Kubernetes 集群由控制平面和工作节点组成。控制平面通过 API 服务器、调度器、控制器管理器和 etcd（分布式键值存储）管理集群状态。工作节点运行 kubelet 代理和容器运行时，以 Pod 为单位执行实际工作负载。',
    k8sDeployCode: `# deployment.yaml — Kubernetes 部署
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web-app
          image: myregistry/web-app:v2.1.0
          ports:
            - containerPort: 3000
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          livenessProbe:
            httpGet:
              path: /healthz
              port: 3000
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: app-secrets
                  key: database-url
---
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
spec:
  selector:
    app: web-app
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP`,

    comparisonTitle: 'Docker vs Kubernetes：功能对比',
    comparisonDesc: '理解两者的根本差异有助于你在不同场景中做出正确选择：',

    whenDockerTitle: '何时只用 Docker',
    whenDockerDesc: '在很多常见场景中，单独使用 Docker 是正确的选择。并非每个应用都需要容器编排，过早引入 Kubernetes 会带来不必要的复杂性。',
    whenDocker1: '本地开发环境 — 需要在团队成员间保持一致、可重复的配置。',
    whenDocker2: '拥有 1-5 个容器的小型应用，可以在单台服务器上轻松运行。',
    whenDocker3: 'CI/CD 流水线 — Docker 为测试和构建提供隔离、干净的环境。',
    whenDocker4: '正在逐步容器化但尚不需要编排的单体应用。',
    whenDocker5: '个人项目、原型和 MVP — 运维开销需要最小化。',

    whenK8sTitle: '何时使用 Kubernetes',
    whenK8sDesc: '当你的应用需要跨多台机器可靠扩展、自动处理流量高峰或保持高可用性时，Kubernetes 就变得不可或缺。',
    whenK8s1: '拥有 10+ 服务的微服务架构，需要独立的扩展、部署和服务发现。',
    whenK8s2: '需要零停机部署、自动回滚和自我修复的生产工作负载。',
    whenK8s3: '多团队组织，不同团队需要独立部署到共享基础设施。',
    whenK8s4: '流量模式不固定的应用，可从水平 Pod 自动扩缩中受益。',
    whenK8s5: '合规性要求高的环境，需要细粒度的访问控制、网络策略和审计日志。',

    alternativesTitle: '全量 Kubernetes 的替代方案',
    alternativesDesc: '运行完整的 Kubernetes 集群在运维上代价高昂。2026 年，一些更轻量的替代方案已经成熟：',
    alt1Title: 'Docker Swarm',
    alt1Desc: '内置于 Docker 引擎中。比 Kubernetes 简单但功能有限。适合需要基础编排但不想学习 Kubernetes 的小团队。',
    alt2Title: 'K3s / K0s',
    alt2Desc: '轻量级 Kubernetes 发行版，去除了云厂商特定功能。K3s 仅需约 512MB 内存，非常适合边缘计算、IoT 和资源受限环境。',
    alt3Title: '托管 Kubernetes（EKS、GKE、AKS）',
    alt3Desc: '云厂商为你管理控制平面，大幅减少运维负担。你只需管理工作节点和应用工作负载。这是生产环境中最常见的 Kubernetes 部署模式。',
    alt4Title: '容器即服务（Cloud Run、Fargate、Fly.io）',
    alt4Desc: '无服务器容器平台，无需任何集群管理即可运行 Docker 容器。你推送容器镜像，平台负责扩缩容、网络和基础设施。当你想要容器的可移植性但不想要编排的复杂性时，这是理想选择。',

    hpaTitle: 'Kubernetes 自动扩缩',
    hpaDesc: '水平 Pod 自动扩缩器（HPA）根据 CPU 使用率、内存消耗或自定义指标自动调整 Pod 副本数量。这确保你的应用能够按需扩展而不会过度配置。',
    hpaCode: `# hpa.yaml — 水平 Pod 自动扩缩器
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80`,

    decisionTitle: '决策框架：Docker 还是 Kubernetes？',
    decisionDesc: '根据你的项目需求，使用以下框架来指导决策：',

    bestPracticesTitle: '两者的最佳实践',
    bp1: '使用多阶段 Docker 构建来保持生产镜像精简。一个典型的 Node.js 镜像通过适当的多阶段配置可以从 1GB 缩减到 150MB。',
    bp2: '永远不要以 root 身份运行容器。在 Dockerfile 中始终指定非 root USER，并在 Kubernetes 中设置安全上下文。',
    bp3: '固定特定的镜像标签，不要使用 "latest"。不可变标签（使用镜像摘要）提供最强的可复现性保证。',
    bp4: '在 Kubernetes 中设置资源请求和限制。没有它们，一个行为异常的 Pod 可能会耗尽整个节点的资源。',
    bp5: '实现健康检查（Kubernetes 中的存活和就绪探针，Docker 中的 HEALTHCHECK）。它们实现自我修复并防止流量到达不健康的实例。',
    bp6: '将密钥存储在专用的密钥管理系统中（启用静态加密的 Kubernetes Secrets、HashiCorp Vault 或云原生方案）。永远不要将密钥嵌入容器镜像。',
    bp7: '使用 Kubernetes 命名空间来隔离环境（开发、测试、生产）和团队。为每个命名空间应用资源配额和网络策略。',
    bp8: '在 CI 流水线中使用 Trivy、Snyk 或 Grype 等工具扫描容器镜像漏洞。阻止包含严重 CVE 的镜像进入生产环境。',

    faq1q: '可以不用 Kubernetes 只用 Docker 吗？',
    faq1a: '完全可以。Docker 是一个独立工具，单独使用效果很好。Docker Compose 可以处理单台主机上的多容器场景。许多成功的生产应用在没有任何编排器的情况下运行 Docker，尤其是部署到 Cloud Run、Fly.io 或 Railway 等容器即服务平台时。',
    faq2q: '可以不用 Docker 只用 Kubernetes 吗？',
    faq2a: '可以。自 Kubernetes 1.24 起，Docker 不再是默认的容器运行时。大多数生产 Kubernetes 集群直接使用 containerd 或 CRI-O。Kubernetes 兼容任何 OCI 标准的容器运行时。你仍然可以用 Docker 构建镜像，然后在使用 containerd 的 Kubernetes 上运行。',
    faq3q: '需要多少容器才值得用 Kubernetes？',
    faq3a: '没有一个确切的数字，但通常当你有 10+ 微服务、需要自动扩缩、需要零停机部署，或有多个团队独立部署时，Kubernetes 才开始有意义。如果少于 5 个服务，Docker Compose 或容器即服务平台通常就够了。',
    faq4q: '对小项目来说 Kubernetes 是不是大材小用？',
    faq4a: '对小项目而言，确实如此。Kubernetes 有显著的运维开销：你需要理解网络、存储、RBAC、监控和集群维护。托管 Kubernetes（EKS、GKE）减少了这些但仍有学习曲线。对于小项目，建议使用 Docker 配合 Fly.io、Railway 或 Render 等 PaaS 平台。',
    faq5q: 'Docker 和 Kubernetes 的成本差异是什么？',
    faq5a: 'Docker 本身是免费开源的。Kubernetes 也是免费的，但运行集群有成本：工作节点的计算资源、托管控制平面费用（云厂商每月 $70-200）、监控、日志和工程师时间。在 AWS EKS 上最小的生产 Kubernetes 集群大约每月 $200-500（不含工作负载成本）。Docker 在单台 VPS 上的成本低至每月 $5-20。',

    tryTools: '试试我们相关的开发者工具',
  },
};

export default function DockerVsKubernetes({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* What Is Docker */}
      <h2 style={h2Style}>{ct.whatIsDockerTitle}</h2>
      <p style={pStyle}>{ct.whatIsDockerDesc1}</p>
      <p style={pStyle}>{ct.whatIsDockerDesc2}</p>
      <h3 style={h3Style}>{ct.dockerfileTitle}</h3>
      <pre style={codeStyle}><code>{ct.dockerfileCode}</code></pre>
      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.dockerComposeTitle}</h3>
      <p style={pStyle}>{ct.dockerComposeDesc}</p>
      <pre style={codeStyle}><code>{ct.dockerComposeCode}</code></pre>

      {/* What Is Kubernetes */}
      <h2 style={h2Style}>{ct.whatIsK8sTitle}</h2>
      <p style={pStyle}>{ct.whatIsK8sDesc1}</p>
      <p style={pStyle}>{ct.whatIsK8sDesc2}</p>
      <h3 style={h3Style}>{ct.k8sArchTitle}</h3>
      <p style={pStyle}>{ct.k8sArchDesc}</p>
      <pre style={codeStyle}><code>{ct.k8sDeployCode}</code></pre>

      {/* Comparison Table */}
      <h2 style={h2Style}>{ct.comparisonTitle}</h2>
      <p style={pStyle}>{ct.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Feature</th>
              <th style={thStyle}>Docker</th>
              <th style={thStyle}>Kubernetes</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Purpose', 'Build & run containers', 'Orchestrate containers at scale'],
              ['Scope', 'Single host', 'Multi-node cluster'],
              ['Scaling', 'Manual', 'Automatic (HPA, VPA)'],
              ['Self-healing', 'Restart policies only', 'Full (reschedule, replace, restart)'],
              ['Networking', 'Bridge / host networks', 'Cluster-wide SDN, services, ingress'],
              ['Load Balancing', 'Manual / external', 'Built-in service load balancing'],
              ['Rolling Updates', 'Not built-in', 'Native rolling update strategy'],
              ['Learning Curve', 'Low', 'High'],
              ['Operational Cost', 'Minimal', 'Significant'],
              ['Best For', 'Dev, CI/CD, small apps', 'Production microservices at scale'],
            ].map(([feature, docker, k8s], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{docker}</td>
                <td style={tdStyle}>{k8s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When Docker */}
      <h2 style={h2Style}>{ct.whenDockerTitle}</h2>
      <p style={pStyle}>{ct.whenDockerDesc}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{ct.whenDocker1}</li>
        <li>{ct.whenDocker2}</li>
        <li>{ct.whenDocker3}</li>
        <li>{ct.whenDocker4}</li>
        <li>{ct.whenDocker5}</li>
      </ul>

      {/* When Kubernetes */}
      <h2 style={h2Style}>{ct.whenK8sTitle}</h2>
      <p style={pStyle}>{ct.whenK8sDesc}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{ct.whenK8s1}</li>
        <li>{ct.whenK8s2}</li>
        <li>{ct.whenK8s3}</li>
        <li>{ct.whenK8s4}</li>
        <li>{ct.whenK8s5}</li>
      </ul>

      {/* Alternatives */}
      <h2 style={h2Style}>{ct.alternativesTitle}</h2>
      <p style={pStyle}>{ct.alternativesDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: ct.alt1Title, desc: ct.alt1Desc, color: '#3b82f6' },
          { title: ct.alt2Title, desc: ct.alt2Desc, color: '#22c55e' },
          { title: ct.alt3Title, desc: ct.alt3Desc, color: '#f59e0b' },
          { title: ct.alt4Title, desc: ct.alt4Desc, color: '#8b5cf6' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}` }}>
            <strong style={{ color: item.color }}>{item.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* HPA */}
      <h2 style={h2Style}>{ct.hpaTitle}</h2>
      <p style={pStyle}>{ct.hpaDesc}</p>
      <pre style={codeStyle}><code>{ct.hpaCode}</code></pre>

      {/* Decision Framework */}
      <h2 style={h2Style}>{ct.decisionTitle}</h2>
      <p style={pStyle}>{ct.decisionDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Scenario</th>
              <th style={thStyle}>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Solo dev, 1-3 services', 'Docker + Docker Compose'],
              ['Small team, < 5 services', 'Docker + Docker Compose or Docker Swarm'],
              ['Need auto-scaling', 'Kubernetes (managed) or CaaS'],
              ['Microservices, 10+ services', 'Kubernetes (managed: EKS / GKE / AKS)'],
              ['Edge / IoT deployment', 'Docker + K3s'],
              ['Serverless containers', 'Cloud Run / Fargate / Fly.io'],
              ['Enterprise, multi-team', 'Kubernetes with namespaces + RBAC'],
              ['Learning / prototyping', 'Docker Desktop with Compose'],
            ].map(([scenario, rec], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={tdStyle}>{rec}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Best Practices */}
      <h2 style={h2Style}>{ct.bestPracticesTitle}</h2>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{ct.bp1}</li>
        <li>{ct.bp2}</li>
        <li>{ct.bp3}</li>
        <li>{ct.bp4}</li>
        <li>{ct.bp5}</li>
        <li>{ct.bp6}</li>
        <li>{ct.bp7}</li>
        <li>{ct.bp8}</li>
      </ul>

      {/* Related Tools CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
      </div>

      {/* FAQ */}
      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a], [ct.faq2q, ct.faq2a], [ct.faq3q, ct.faq3a], [ct.faq4q, ct.faq4a], [ct.faq5q, ct.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
