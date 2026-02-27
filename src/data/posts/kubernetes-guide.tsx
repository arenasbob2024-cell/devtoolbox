'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Kubernetes Complete Guide 2026: Pods, Deployments, Helm, Scaling & More',
    description: 'Master Kubernetes from first principles. Learn Pods, Deployments, Services, ConfigMaps, Helm, Ingress, PersistentVolumes, HPA, and how K8s compares to Docker Swarm and HashiCorp Nomad.',
    tldr: 'Kubernetes (K8s) is the industry-standard container orchestration platform. Key concepts: Pods (smallest deployable unit), Deployments (manage replicas + rolling updates), Services (stable networking), ConfigMaps/Secrets (configuration), Ingress (HTTP routing), PersistentVolumes (durable storage), and HPA (autoscaling). Use kubectl to interact with the cluster and Helm to package applications as charts.',

    introTitle: 'What Is Kubernetes and Why It Matters',
    introP1: 'Kubernetes (K8s) is an open-source container orchestration system originally designed by Google and donated to the Cloud Native Computing Foundation (CNCF) in 2014. It automates the deployment, scaling, and lifecycle management of containerized applications across clusters of machines. In 2026, Kubernetes is the de facto standard for running production workloads at scale — from startups shipping their first microservice to hyperscalers managing millions of containers per day.',
    introP2: 'Before Kubernetes, teams managed servers manually: custom deployment scripts, fragile SSH-based deploys, and hand-rolled load balancers. Docker solved the "it works on my machine" problem by packaging apps into containers, but running thousands of containers across dozens of servers without orchestration is chaos. Kubernetes brings order: you describe the desired state of your system in YAML manifests, and Kubernetes continuously reconciles the actual state to match. A container crashes? Kubernetes restarts it. A node dies? Kubernetes reschedules the workloads to healthy nodes. Traffic spikes? Kubernetes scales out. Traffic drops? Kubernetes scales back in — automatically.',
    introP3: 'The platform provides self-healing, horizontal scaling, rolling updates with zero downtime, secret management, service discovery, load balancing, and storage orchestration — all as built-in primitives. This guide covers everything you need to go from "what is a Pod?" to running a production-grade application with Helm, autoscaling, and persistent storage.',

    keyFeaturesTitle: 'Key Kubernetes Features',
    feat1: 'Self-healing: automatically restarts failed containers, replaces unresponsive Pods, kills containers that fail health checks, and reschedules them on healthy nodes.',
    feat2: 'Horizontal scaling: scale applications up or down with a single command (kubectl scale) or automatically based on CPU, memory, or custom metrics via HPA.',
    feat3: 'Rolling updates & rollbacks: deploy new versions with zero downtime using configurable rolling update strategies; roll back instantly if anything goes wrong.',
    feat4: 'Service discovery & load balancing: built-in DNS and kube-proxy distribute traffic automatically across healthy Pod instances without manual configuration.',
    feat5: 'Configuration management: separate app code from configuration using ConfigMaps (non-sensitive) and Secrets (sensitive), injected as environment variables or file mounts.',
    feat6: 'Storage orchestration: automatically provision and attach cloud or on-premises storage to Pods using PersistentVolumes and StorageClasses.',
    feat7: 'Infrastructure abstraction: the same Kubernetes manifests run on AWS EKS, Google GKE, Azure AKS, or bare-metal with minimal modifications.',
    feat8: 'Extensibility: CustomResourceDefinitions (CRDs) and Operators allow you to extend Kubernetes with domain-specific automation for databases, messaging systems, and more.',

    coreConceptsTitle: 'Core Concepts: Pods, Deployments, Services, and More',
    podsTitle: 'Pods — The Smallest Deployable Unit',
    podsP1: 'A Pod is the atomic unit of Kubernetes — the smallest thing you can deploy. A Pod wraps one or more containers that share the same network namespace (they communicate via localhost) and storage volumes. In practice, most Pods run a single application container, with optional sidecar containers for logging, proxying (Envoy/Istio), or secrets injection (Vault Agent).',
    deploymentsTitle: 'Deployments — Managing Replicas and Updates',
    deploymentsP1: 'A Deployment is a higher-level abstraction that manages a ReplicaSet, which in turn manages a set of identical Pods. You tell the Deployment "I want 3 replicas of this container image" and it creates, monitors, and maintains exactly 3 running Pods. When you update the image, the Deployment orchestrates a rolling update — spinning up new Pods before terminating old ones — ensuring zero downtime.',
    servicesTitle: 'Services — Stable Networking Endpoints',
    servicesP1: 'Pods are ephemeral — they can be created, destroyed, and rescheduled at any time with different IP addresses. A Service provides a stable virtual IP (ClusterIP) and DNS name that proxies traffic to a set of Pods selected by labels. Four Service types exist: ClusterIP (internal cluster access), NodePort (accessible on each node IP), LoadBalancer (cloud provider external load balancer), and ExternalName (DNS alias).',
    replicasetsTitle: 'ReplicaSets — Ensuring Availability',
    replicasetsP1: 'A ReplicaSet ensures that a specified number of Pod replicas are running at any given time. If a Pod crashes, the ReplicaSet controller immediately creates a replacement. ReplicaSets are rarely created directly; Deployments manage them automatically and provide the additional capability of rolling updates and rollback history.',
    namespacesTitle: 'Namespaces — Logical Isolation',
    namespacesP1: 'Namespaces partition a single cluster into multiple virtual clusters. They are the primary mechanism for multi-tenancy: separating dev, staging, and production environments; isolating teams; or organizing microservices. Resources within a namespace share the same DNS domain and can be subject to ResourceQuotas and LimitRanges to prevent any one namespace from consuming all cluster resources.',

    kubectlTitle: 'kubectl Commands: The Complete Reference',
    kubectlP1: 'kubectl is the command-line tool for interacting with a Kubernetes cluster. It communicates with the Kubernetes API server and is your primary interface for deploying applications, inspecting resources, debugging problems, and managing the cluster.',

    yamlTitle: 'YAML Manifests: Pod, Deployment, Service, ConfigMap, Secret',
    yamlP1: 'Kubernetes resources are defined as YAML manifests and applied to the cluster using kubectl apply -f. Every manifest has four top-level fields: apiVersion, kind, metadata, and spec. Here are production-ready examples for the most common resource types.',

    helmTitle: 'Helm: The Package Manager for Kubernetes',
    helmP1: 'Helm is the package manager for Kubernetes, analogous to apt for Debian or npm for Node.js. A Helm chart is a collection of Kubernetes manifest templates with configurable values. Charts can be shared via repositories (Artifact Hub hosts thousands of community charts for databases, monitoring, ingress controllers, and more). Helm manages the release lifecycle: install, upgrade, rollback, and uninstall.',
    helmP2: 'Helm v3 (current) eliminates the server-side Tiller component from Helm v2. Charts are versioned and releases can be inspected, diffed, and rolled back. For teams that need per-environment customization, Helm values files provide a clean separation between chart logic and deployment-specific configuration.',

    networkingTitle: 'Kubernetes Networking: ClusterIP, NodePort, LoadBalancer, Ingress',
    networkingP1: 'Kubernetes networking operates at three levels: Pod-to-Pod communication (handled by the CNI plugin — Flannel, Calico, Cilium), Service-based load balancing (kube-proxy), and external access (Ingress controllers). Understanding each layer is critical for designing resilient, secure application architectures.',

    storageTitle: 'Storage: PersistentVolumes, PersistentVolumeClaims, StorageClasses',
    storageP1: 'Container storage is ephemeral by default — data is lost when a container restarts. For stateful applications (databases, caches, file storage), Kubernetes provides the PersistentVolume (PV) subsystem. A PV is a piece of storage in the cluster provisioned by an administrator or dynamically by a StorageClass. A PersistentVolumeClaim (PVC) is a request for storage by a user, specifying size and access mode. Kubernetes binds PVCs to matching PVs.',
    storageP2: 'StorageClasses allow dynamic provisioning: instead of pre-creating PVs, the cluster automatically provisions storage (EBS on AWS, Persistent Disk on GCP, Azure Disk) when a PVC is created. This is the standard approach on managed Kubernetes. StatefulSets use volumeClaimTemplates to give each Pod instance its own stable, uniquely-named PVC that persists across Pod rescheduling.',

    scalingTitle: 'Auto-scaling: HPA, VPA, and Cluster Autoscaler',
    scalingP1: 'Kubernetes provides three complementary autoscaling mechanisms operating at different levels of the stack. The Horizontal Pod Autoscaler (HPA) scales the number of Pod replicas based on metrics. The Vertical Pod Autoscaler (VPA) adjusts resource requests and limits for existing Pods. The Cluster Autoscaler adjusts the number of nodes in the cluster based on pending Pods and node utilization.',
    scalingP2: 'For most applications, HPA is the primary autoscaling tool. It queries the metrics API (CPU, memory, or custom metrics from Prometheus Adapter) and scales the target Deployment or StatefulSet up or down with configurable stabilization windows to prevent thrashing.',

    comparisonTitle: 'Kubernetes vs Docker Swarm vs HashiCorp Nomad',
    comparisonP1: 'Kubernetes is not the only container orchestrator. Docker Swarm is simpler and built into Docker Engine. HashiCorp Nomad is a general-purpose orchestrator that handles containers, binaries, Java JARs, and more. Here is how they compare across the dimensions that matter most in production:',

    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the difference between a Pod and a container in Kubernetes?',
    faq1a: 'A container is a single process with its own filesystem and process namespace. A Pod is Kubernetes abstraction layer that wraps one or more containers sharing the same network namespace and storage volumes. Containers inside a Pod communicate via localhost. In most cases a Pod contains one container, but the sidecar pattern uses multiple containers — for example, an app container plus an Envoy proxy for service mesh traffic management.',
    faq2q: 'How do I debug a CrashLoopBackOff Pod?',
    faq2a: 'CrashLoopBackOff means the container keeps crashing and Kubernetes keeps restarting it with exponential back-off. Debug with: (1) kubectl describe pod to read the Events section for error messages, (2) kubectl logs --previous to see logs from the last crashed instance, (3) kubectl exec -it to shell into the running container if it starts briefly, (4) check resource limits — OOMKilled means the container exceeded its memory limit.',
    faq3q: 'What is Helm and when should I use it?',
    faq3a: 'Helm is a package manager for Kubernetes. It bundles related Kubernetes manifests into reusable, versioned packages called charts. Use Helm when: (1) you deploy complex applications with 5+ interdependent resources, (2) you need per-environment configuration (dev, staging, prod) without duplicating manifests, (3) you want to install community-maintained software (PostgreSQL, Redis, NGINX Ingress, Prometheus) from Artifact Hub. For simple single-service apps, raw kubectl apply is often sufficient.',
    faq4q: 'How much does running Kubernetes cost?',
    faq4a: 'Kubernetes itself is free. Cluster costs include: managed control plane fees ($70-150/month on EKS/GKE/AKS), worker node compute ($50-500+/month depending on workload), load balancers ($15-20/month each), and persistent storage ($0.10-0.20/GB/month). A minimal production cluster on EKS might run $200-400/month. Lightweight alternatives like K3s on a single VPS can cost as little as $10-20/month.',
    faq5q: 'What is the difference between a Deployment and a StatefulSet?',
    faq5a: 'Deployments are for stateless applications where Pods are interchangeable. StatefulSets are for stateful applications (databases, queues) where Pods need: (1) stable, unique network identities (pod-0, pod-1, pod-2), (2) stable persistent storage that follows the Pod when rescheduled, (3) ordered, graceful deployment and scaling. Use Deployments for web servers and APIs; use StatefulSets for PostgreSQL, MongoDB, Kafka, Elasticsearch, and ZooKeeper.',
    faq6q: 'How does Kubernetes handle zero-downtime deployments?',
    faq6a: 'Kubernetes Deployments use a RollingUpdate strategy by default. With maxUnavailable: 0 and maxSurge: 1, Kubernetes creates one new Pod with the updated image, waits for it to become Ready (pass readiness probes), then terminates one old Pod, and repeats until all replicas are updated. Combined with pre-stop hooks and a terminationGracePeriodSeconds, running requests complete before the old Pod is killed, achieving true zero-downtime deploys.',
    faq7q: 'What managed Kubernetes service should I choose: EKS, GKE, or AKS?',
    faq7a: 'Google GKE is generally considered the most feature-complete and operationally excellent — unsurprisingly, since Google invented Kubernetes. AWS EKS integrates deeply with the AWS ecosystem (IAM, ALB, EBS) and is the best choice if you are already all-in on AWS. Azure AKS is the natural choice for Microsoft-centric shops using Azure AD and Azure DevOps. All three provide autopilot/serverless node management modes that further reduce operational overhead.',
    faq8q: 'How do I expose a Kubernetes application to the internet?',
    faq8a: 'You have three options: (1) NodePort: exposes the service on a static port on each node IP — simplest but not production-grade, (2) LoadBalancer: provisions a cloud load balancer automatically — simplest for cloud environments but creates one LB per service (expensive), (3) Ingress: a single entry point that routes HTTP/HTTPS traffic to multiple services based on host and path rules — the recommended production pattern. Use an Ingress controller (NGINX, Traefik, AWS ALB Ingress) and cert-manager for automatic TLS certificates.',

    conclusionTitle: 'Conclusion',
    conclusionP1: 'Kubernetes is one of the most transformative technologies in modern infrastructure, but it comes with genuine complexity. The key insight is to learn it incrementally: start with Pods and Deployments on a local cluster (minikube or kind), add Services and Ingress, then graduate to Helm for packaging, HPA for autoscaling, and PersistentVolumes for stateful workloads. In production, use a managed service (EKS, GKE, AKS) so you can focus on your application rather than cluster operations. The investment in learning Kubernetes pays dividends for years — it is a foundational skill for any developer working in cloud-native environments.',

    tryTools: 'Try our related developer tools',
  },
  zh: {
    title: 'Kubernetes 完整指南 2026：Pod、Deployment、Helm、弹性伸缩全解析',
    description: '从基础到进阶掌握 Kubernetes。学习 Pod、Deployment、Service、ConfigMap、Helm、Ingress、PersistentVolume、HPA，以及 K8s 与 Docker Swarm 和 HashiCorp Nomad 的对比。',
    tldr: 'Kubernetes（K8s）是行业标准的容器编排平台。核心概念：Pod（最小可部署单元）、Deployment（管理副本和滚动更新）、Service（稳定网络端点）、ConfigMap/Secret（配置管理）、Ingress（HTTP 路由）、PersistentVolume（持久化存储）、HPA（自动弹性伸缩）。使用 kubectl 与集群交互，使用 Helm 将应用打包为 Chart。',

    introTitle: 'Kubernetes 是什么，为什么重要',
    introP1: 'Kubernetes（K8s）是一个开源容器编排系统，最初由 Google 设计，2014 年捐献给云原生计算基金会（CNCF）。它能在机器集群上自动化容器化应用的部署、扩缩和生命周期管理。2026 年，Kubernetes 已成为大规模运行生产工作负载的事实标准——从初创公司的第一个微服务，到超大规模企业每天管理数百万个容器。',
    introP2: '在 Kubernetes 出现之前，团队需要手动管理服务器：自定义部署脚本、脆弱的 SSH 部署方式、手工搭建的负载均衡器。Docker 解决了"在我机器上能跑"的问题，但在没有编排工具的情况下，在数十台服务器上运行数千个容器是一团混乱。Kubernetes 带来了秩序：你在 YAML 清单中描述系统的期望状态，Kubernetes 持续将实际状态协调到与期望状态一致。容器崩溃了？Kubernetes 自动重启。节点宕机了？Kubernetes 将工作负载重新调度到健康节点。流量激增？Kubernetes 自动扩容。流量下降？Kubernetes 自动缩容——完全自动。',
    introP3: '平台内置了自我修复、水平扩缩、零停机滚动更新、Secret 管理、服务发现、负载均衡和存储编排等能力。本指南涵盖了从"什么是 Pod"到使用 Helm、自动伸缩和持久化存储运行生产级应用所需的一切知识。',

    keyFeaturesTitle: 'Kubernetes 核心特性',
    feat1: '自我修复：自动重启失败的容器，替换无响应的 Pod，杀死未通过健康检查的容器，并将其重新调度到健康节点。',
    feat2: '水平扩缩：通过单条命令（kubectl scale）手动扩缩，或通过 HPA 基于 CPU、内存或自定义指标自动扩缩。',
    feat3: '滚动更新与回滚：使用可配置的滚动更新策略实现零停机部署；出现问题时可立即回滚。',
    feat4: '服务发现与负载均衡：内置 DNS 和 kube-proxy 无需手动配置即可自动将流量分发到健康的 Pod 实例。',
    feat5: '配置管理：通过 ConfigMap（非敏感配置）和 Secret（敏感配置）将应用代码与配置分离，以环境变量或文件挂载方式注入。',
    feat6: '存储编排：使用 PersistentVolume 和 StorageClass 自动为 Pod 供应和挂载云端或本地存储。',
    feat7: '基础设施抽象：相同的 Kubernetes 清单可在 AWS EKS、Google GKE、Azure AKS 或裸金属上以极少改动运行。',
    feat8: '可扩展性：CustomResourceDefinitions（CRD）和 Operator 允许你为数据库、消息系统等扩展 Kubernetes 的领域特定自动化能力。',

    coreConceptsTitle: '核心概念：Pod、Deployment、Service 等',
    podsTitle: 'Pod — 最小可部署单元',
    podsP1: 'Pod 是 Kubernetes 的原子单位，是可以部署的最小实体。Pod 将一个或多个共享网络命名空间（通过 localhost 通信）和存储卷的容器封装在一起。实际上，大多数 Pod 运行单个应用容器，辅以用于日志、代理（Envoy/Istio）或 Secret 注入（Vault Agent）的边车容器。',
    deploymentsTitle: 'Deployment — 管理副本和更新',
    deploymentsP1: 'Deployment 是一个高级抽象，用于管理 ReplicaSet，ReplicaSet 再管理一组相同的 Pod。你告诉 Deployment"我要 3 个这个容器镜像的副本"，它就会创建、监控并维护恰好 3 个运行中的 Pod。更新镜像时，Deployment 会编排滚动更新——在终止旧 Pod 之前启动新 Pod——确保零停机。',
    servicesTitle: 'Service — 稳定的网络端点',
    servicesP1: 'Pod 是短暂的——它们可以随时被创建、销毁和重新调度，且 IP 地址会变化。Service 提供一个稳定的虚拟 IP（ClusterIP）和 DNS 名称，将流量代理到一组通过标签选择的 Pod。四种 Service 类型：ClusterIP（集群内部访问）、NodePort（通过每个节点 IP 访问）、LoadBalancer（云厂商外部负载均衡器）、ExternalName（DNS 别名）。',
    replicasetsTitle: 'ReplicaSet — 确保可用性',
    replicasetsP1: 'ReplicaSet 确保在任何给定时间运行指定数量的 Pod 副本。如果一个 Pod 崩溃，ReplicaSet 控制器会立即创建替代 Pod。ReplicaSet 很少直接创建，Deployment 会自动管理它们，并额外提供滚动更新和回滚历史记录的能力。',
    namespacesTitle: 'Namespace — 逻辑隔离',
    namespacesP1: 'Namespace 将单个集群划分为多个虚拟集群，是实现多租户的主要机制：分离开发、测试和生产环境；隔离团队；或组织微服务。同一 Namespace 内的资源共享相同的 DNS 域，可以通过 ResourceQuota 和 LimitRange 进行限制，防止某个 Namespace 消耗所有集群资源。',

    kubectlTitle: 'kubectl 命令：完整参考',
    kubectlP1: 'kubectl 是与 Kubernetes 集群交互的命令行工具。它与 Kubernetes API 服务器通信，是你部署应用、检查资源、调试问题和管理集群的主要界面。',

    yamlTitle: 'YAML 清单：Pod、Deployment、Service、ConfigMap、Secret',
    yamlP1: 'Kubernetes 资源定义为 YAML 清单，使用 kubectl apply -f 应用到集群。每个清单有四个顶级字段：apiVersion、kind、metadata 和 spec。以下是最常见资源类型的生产就绪示例。',

    helmTitle: 'Helm：Kubernetes 包管理器',
    helmP1: 'Helm 是 Kubernetes 的包管理器，类似于 Debian 的 apt 或 Node.js 的 npm。Helm Chart 是一组带有可配置参数值的 Kubernetes 清单模板。Chart 可通过仓库共享（Artifact Hub 托管了数千个社区 Chart，用于数据库、监控、Ingress 控制器等）。Helm 管理 Release 的完整生命周期：安装、升级、回滚和卸载。',
    helmP2: 'Helm v3（当前版本）去除了 Helm v2 的服务端 Tiller 组件。Chart 有版本管理，Release 可以被检查、对比和回滚。对于需要按环境定制的团队，Helm values 文件在 Chart 逻辑和部署特定配置之间提供了清晰的分离。',

    networkingTitle: 'Kubernetes 网络：ClusterIP、NodePort、LoadBalancer、Ingress',
    networkingP1: 'Kubernetes 网络在三个层面运行：Pod 间通信（由 CNI 插件处理——Flannel、Calico、Cilium）、基于 Service 的负载均衡（kube-proxy）和外部访问（Ingress 控制器）。理解每一层对于设计高弹性、安全的应用架构至关重要。',

    storageTitle: '存储：PersistentVolume、PersistentVolumeClaim、StorageClass',
    storageP1: '容器存储默认是临时的——容器重启时数据会丢失。对于有状态应用（数据库、缓存、文件存储），Kubernetes 提供了 PersistentVolume（PV）子系统。PV 是集群中的一块存储，由管理员预配置或由 StorageClass 动态供应。PersistentVolumeClaim（PVC）是用户对存储的请求，指定大小和访问模式。Kubernetes 将 PVC 绑定到匹配的 PV。',
    storageP2: 'StorageClass 支持动态供应：无需预先创建 PV，集群在创建 PVC 时自动供应存储（AWS 的 EBS、GCP 的 Persistent Disk、Azure Disk）。这是托管 Kubernetes 上的标准做法。StatefulSet 使用 volumeClaimTemplates 为每个 Pod 实例提供自己的稳定、唯一命名的 PVC，在 Pod 重新调度后仍然持久。',

    scalingTitle: '自动伸缩：HPA、VPA 和集群自动扩缩器',
    scalingP1: 'Kubernetes 提供三种互补的自动扩缩机制，在栈的不同层面运行。水平 Pod 自动扩缩器（HPA）根据指标缩放 Pod 副本数量。垂直 Pod 自动扩缩器（VPA）调整现有 Pod 的资源请求和限制。集群自动扩缩器根据待调度的 Pod 和节点利用率调整集群中的节点数量。',
    scalingP2: '对于大多数应用，HPA 是主要的自动扩缩工具。它查询 Metrics API（CPU、内存，或来自 Prometheus Adapter 的自定义指标），并通过可配置的稳定窗口扩缩目标 Deployment 或 StatefulSet，防止频繁抖动。',

    comparisonTitle: 'Kubernetes vs Docker Swarm vs HashiCorp Nomad',
    comparisonP1: 'Kubernetes 不是唯一的容器编排器。Docker Swarm 更简单，内置于 Docker Engine。HashiCorp Nomad 是通用编排器，可处理容器、二进制文件、Java JAR 等。以下是它们在生产中最重要维度上的对比：',

    faqTitle: '常见问题',
    faq1q: 'Kubernetes 中 Pod 和容器有什么区别？',
    faq1a: '容器是具有自己文件系统和进程命名空间的单个进程。Pod 是 Kubernetes 的抽象层，包裹一个或多个共享网络命名空间和存储卷的容器。Pod 内的容器通过 localhost 通信。大多数情况下 Pod 包含一个容器，但边车模式会使用多个容器——例如，应用容器加上 Envoy 代理用于服务网格流量管理。',
    faq2q: '如何调试 CrashLoopBackOff 的 Pod？',
    faq2a: 'CrashLoopBackOff 意味着容器不断崩溃，Kubernetes 以指数退避方式不断重启它。调试方法：(1) kubectl describe pod 查看 Events 部分的错误信息；(2) kubectl logs --previous 查看上次崩溃实例的日志；(3) kubectl exec -it 在容器短暂启动时进入 Shell；(4) 检查资源限制——OOMKilled 表示容器超过了内存限制。',
    faq3q: 'Helm 是什么，什么时候该用它？',
    faq3a: 'Helm 是 Kubernetes 的包管理器。它将相关的 Kubernetes 清单打包成可复用的版本化包（称为 Chart）。以下情况使用 Helm：(1) 部署有 5 个以上相互依赖资源的复杂应用；(2) 需要按环境（开发、测试、生产）配置而不重复清单；(3) 想从 Artifact Hub 安装社区维护的软件（PostgreSQL、Redis、NGINX Ingress、Prometheus）。对于简单的单服务应用，直接 kubectl apply 通常就够了。',
    faq4q: '运行 Kubernetes 的成本是多少？',
    faq4a: 'Kubernetes 本身是免费的。集群成本包括：托管控制平面费用（EKS/GKE/AKS 每月 $70-150）、工作节点计算资源（根据工作负载每月 $50-500+）、负载均衡器（每个每月 $15-20）和持久化存储（每 GB 每月 $0.10-0.20）。EKS 上最小的生产集群可能每月需要 $200-400。K3s 在单台 VPS 上的轻量替代方案低至每月 $10-20。',
    faq5q: 'Deployment 和 StatefulSet 有什么区别？',
    faq5a: 'Deployment 用于无状态应用，Pod 之间可以互换。StatefulSet 用于有状态应用（数据库、队列），Pod 需要：(1) 稳定、唯一的网络身份（pod-0、pod-1、pod-2）；(2) 重新调度后仍跟随 Pod 的稳定持久存储；(3) 有序、优雅的部署和扩缩。Web 服务器和 API 用 Deployment；PostgreSQL、MongoDB、Kafka、Elasticsearch 和 ZooKeeper 用 StatefulSet。',
    faq6q: 'Kubernetes 如何实现零停机部署？',
    faq6a: 'Kubernetes Deployment 默认使用 RollingUpdate 策略。设置 maxUnavailable: 0 和 maxSurge: 1，Kubernetes 先用新镜像创建一个新 Pod，等它变为 Ready 状态（通过就绪探针），再终止一个旧 Pod，如此循环直到所有副本更新完毕。配合 pre-stop hook 和 terminationGracePeriodSeconds，运行中的请求在旧 Pod 被杀死前完成处理，实现真正的零停机部署。',
    faq7q: '应该选择哪个托管 Kubernetes 服务：EKS、GKE 还是 AKS？',
    faq7a: 'Google GKE 通常被认为功能最完善、运维体验最好——毕竟 Kubernetes 是 Google 发明的。AWS EKS 与 AWS 生态深度集成（IAM、ALB、EBS），如果你已全面使用 AWS 则是最佳选择。Azure AKS 是使用 Azure AD 和 Azure DevOps 的微软技术栈团队的自然选择。三者都提供了 Autopilot/Serverless 节点管理模式，进一步降低运维开销。',
    faq8q: '如何将 Kubernetes 应用暴露到互联网？',
    faq8a: '有三种选择：(1) NodePort：在每个节点 IP 上以静态端口暴露服务——最简单但不适合生产；(2) LoadBalancer：自动供应云负载均衡器——云环境最简单，但每个服务创建一个 LB（成本较高）；(3) Ingress：单个入口点根据主机和路径规则将 HTTP/HTTPS 流量路由到多个服务——推荐的生产模式。使用 Ingress 控制器（NGINX、Traefik、AWS ALB Ingress）和 cert-manager 自动管理 TLS 证书。',

    conclusionTitle: '总结',
    conclusionP1: 'Kubernetes 是现代基础设施中最具变革性的技术之一，但它有真实的复杂性。关键是循序渐进地学习：从本地集群（minikube 或 kind）的 Pod 和 Deployment 开始，添加 Service 和 Ingress，然后进阶到 Helm 打包、HPA 自动伸缩和 PersistentVolume 有状态工作负载。在生产环境中，使用托管服务（EKS、GKE、AKS），让你专注于应用本身而不是集群运维。投入学习 Kubernetes 的时间会在未来数年持续产生回报——它是在云原生环境中工作的任何开发者的基础技能。',

    tryTools: '试试我们相关的开发者工具',
  },
};

export default function KubernetesGuide({ lang }: { lang: string }) {
  const ct = translations[lang as keyof typeof translations] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const codeStyle: React.CSSProperties = {
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 8,
    padding: '16px 20px',
    overflowX: 'auto',
    fontSize: 13,
    lineHeight: 1.8,
    display: 'block',
    marginBottom: 20,
  };
  const thStyle: React.CSSProperties = {
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    padding: '10px 14px',
    textAlign: 'left',
    fontWeight: 700,
    fontSize: 13,
  };
  const tdStyle: React.CSSProperties = {
    border: '1px solid var(--border-color)',
    padding: '10px 14px',
    fontSize: 13,
    verticalAlign: 'top',
  };
  const h2Style: React.CSSProperties = {
    fontSize: 22,
    fontWeight: 700,
    marginTop: 44,
    marginBottom: 16,
    color: 'var(--text-primary)',
  };
  const h3Style: React.CSSProperties = {
    fontSize: 17,
    fontWeight: 600,
    marginTop: 28,
    marginBottom: 10,
    color: '#3b82f6',
  };
  const pStyle: React.CSSProperties = {
    lineHeight: 1.85,
    color: 'var(--text-secondary)',
    marginBottom: 16,
  };
  const ulStyle: React.CSSProperties = {
    lineHeight: 2.1,
    color: 'var(--text-secondary)',
    paddingLeft: 22,
    marginBottom: 20,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{
        background: '#f0f9ff',
        borderLeft: '4px solid #0ea5e9',
        borderRadius: '0 8px 8px 0',
        padding: '16px 20px',
        marginBottom: 28,
      }}>
        <strong style={{ color: '#0369a1', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</strong>
        <p style={{ margin: '6px 0 0', color: '#0c4a6e', lineHeight: 1.75, fontSize: 14 }}>{ct.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: 10,
        padding: '18px 22px',
        marginBottom: 32,
      }}>
        <strong style={{ fontSize: 15, color: 'var(--text-primary)' }}>Key Takeaways</strong>
        <ul style={{ margin: '10px 0 0', paddingLeft: 20, color: 'var(--text-secondary)', lineHeight: 2 }}>
          <li>Kubernetes automates deployment, scaling, and self-healing of containerized applications across clusters.</li>
          <li>Pods are the smallest unit; Deployments manage Pods at scale with rolling updates and rollback support.</li>
          <li>Services provide stable DNS names and load balancing; Ingress routes HTTP traffic to multiple services.</li>
          <li>HPA autoscales Pod replicas based on CPU/memory; the Cluster Autoscaler adds/removes nodes automatically.</li>
          <li>Helm packages applications as Charts — reusable, versioned, configurable — and manages release lifecycle.</li>
          <li>PersistentVolumes and StorageClasses provide durable storage for stateful workloads like databases.</li>
          <li>For production, use a managed Kubernetes service (EKS, GKE, AKS) to eliminate control plane operations.</li>
        </ul>
      </div>

      {/* Section 1: Introduction */}
      <h2 style={h2Style}>{ct.introTitle}</h2>
      <p style={pStyle}>{ct.introP1}</p>
      <p style={pStyle}>{ct.introP2}</p>
      <p style={pStyle}>{ct.introP3}</p>

      <h3 style={h3Style}>{ct.keyFeaturesTitle}</h3>
      <ul style={ulStyle}>
        <li>{ct.feat1}</li>
        <li>{ct.feat2}</li>
        <li>{ct.feat3}</li>
        <li>{ct.feat4}</li>
        <li>{ct.feat5}</li>
        <li>{ct.feat6}</li>
        <li>{ct.feat7}</li>
        <li>{ct.feat8}</li>
      </ul>

      {/* Cluster Architecture Diagram */}
      <pre style={codeStyle}><code>{
'Kubernetes Cluster Architecture\n'
+ '\n'
+ '┌─────────────────────────── CONTROL PLANE ───────────────────────────┐\n'
+ '│                                                                      │\n'
+ '│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐    │\n'
+ '│  │  API Server  │  │  Scheduler   │  │  Controller Manager    │    │\n'
+ '│  │  (REST API)  │  │  (pod→node)  │  │  (node/replica/svc)    │    │\n'
+ '│  └──────┬───────┘  └──────────────┘  └────────────────────────┘    │\n'
+ '│         │                                                            │\n'
+ '│  ┌──────┴───────┐  ┌──────────────┐                                │\n'
+ '│  │     etcd     │  │    Cloud     │                                │\n'
+ '│  │  (key-value) │  │  Controller  │                                │\n'
+ '│  └──────────────┘  └──────────────┘                                │\n'
+ '└──────────────────────────────────────────────────────────────────────┘\n'
+ '         │                     │                     │\n'
+ '         ▼                     ▼                     ▼\n'
+ '┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐\n'
+ '│  Worker Node 1   │  │  Worker Node 2   │  │  Worker Node 3   │\n'
+ '│                  │  │                  │  │                  │\n'
+ '│  ┌────────────┐  │  │  ┌────────────┐  │  │  ┌────────────┐  │\n'
+ '│  │  kubelet   │  │  │  │  kubelet   │  │  │  │  kubelet   │  │\n'
+ '│  └────────────┘  │  │  └────────────┘  │  │  └────────────┘  │\n'
+ '│  ┌────────────┐  │  │  ┌────────────┐  │  │  ┌────────────┐  │\n'
+ '│  │ kube-proxy │  │  │  │ kube-proxy │  │  │  │ kube-proxy │  │\n'
+ '│  └────────────┘  │  │  └────────────┘  │  │  └────────────┘  │\n'
+ '│  ┌────────────┐  │  │  ┌────────────┐  │  │  ┌────────────┐  │\n'
+ '│  │ containerd │  │  │  │ containerd │  │  │  │ containerd │  │\n'
+ '│  └────────────┘  │  │  └────────────┘  │  │  └────────────┘  │\n'
+ '│  [Pod][Pod][Pod] │  │  [Pod][Pod][Pod] │  │  [Pod][Pod][Pod] │\n'
+ '└──────────────────┘  └──────────────────┘  └──────────────────┘'
      }</code></pre>

      {/* Section 2: Core Concepts */}
      <h2 style={h2Style}>{ct.coreConceptsTitle}</h2>

      <h3 style={h3Style}>{ct.podsTitle}</h3>
      <p style={pStyle}>{ct.podsP1}</p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.deploymentsTitle}</h3>
      <p style={pStyle}>{ct.deploymentsP1}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.servicesTitle}</h3>
      <p style={pStyle}>{ct.servicesP1}</p>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.replicasetsTitle}</h3>
      <p style={pStyle}>{ct.replicasetsP1}</p>

      <h3 style={{ ...h3Style, color: '#ec4899' }}>{ct.namespacesTitle}</h3>
      <p style={pStyle}>{ct.namespacesP1}</p>

      {/* Section 3: kubectl Commands */}
      <h2 style={h2Style}>{ct.kubectlTitle}</h2>
      <p style={pStyle}>{ct.kubectlP1}</p>

      <h3 style={h3Style}>Install kubectl and Set Up a Local Cluster</h3>
      <pre style={codeStyle}><code>{
'# Install kubectl (macOS)\n'
+ 'brew install kubectl\n'
+ '\n'
+ '# Install kubectl (Linux)\n'
+ 'curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"\n'
+ 'sudo install kubectl /usr/local/bin/kubectl\n'
+ '\n'
+ '# Verify installation\n'
+ 'kubectl version --client\n'
+ '\n'
+ '# ── Local Cluster Options ─────────────────────────────────────────\n'
+ '\n'
+ '# Option 1: minikube (recommended for beginners)\n'
+ 'brew install minikube\n'
+ 'minikube start --cpus=4 --memory=8192 --driver=docker\n'
+ 'minikube dashboard          # Open web UI\n'
+ 'minikube stop\n'
+ '\n'
+ '# Option 2: kind (Kubernetes in Docker)\n'
+ 'brew install kind\n'
+ 'kind create cluster --name dev\n'
+ 'kind get clusters\n'
+ 'kind delete cluster --name dev\n'
+ '\n'
+ '# Option 3: Docker Desktop\n'
+ '# Settings → Kubernetes → Enable Kubernetes → Apply & Restart\n'
+ '\n'
+ '# Check cluster connection\n'
+ 'kubectl cluster-info\n'
+ 'kubectl get nodes -o wide'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>Essential kubectl Commands</h3>
      <pre style={codeStyle}><code>{
'# ── Cluster & Nodes ──────────────────────────────────────────────\n'
+ 'kubectl cluster-info                      # Show control plane URL\n'
+ 'kubectl get nodes                         # List all nodes\n'
+ 'kubectl get nodes -o wide                 # Nodes with IP, OS, runtime\n'
+ 'kubectl top nodes                         # CPU & memory usage per node\n'
+ 'kubectl describe node <node-name>         # Detailed node info & events\n'
+ '\n'
+ '# ── Pods ─────────────────────────────────────────────────────────\n'
+ 'kubectl get pods                          # Pods in current namespace\n'
+ 'kubectl get pods -A                       # Pods across all namespaces\n'
+ 'kubectl get pods -n staging               # Pods in staging namespace\n'
+ 'kubectl get pods -o wide                  # Pods with node & IP\n'
+ 'kubectl get pods --show-labels            # Show pod labels\n'
+ 'kubectl get pods -l app=web-app           # Filter by label\n'
+ 'kubectl get pods -w                       # Watch pod status live\n'
+ '\n'
+ 'kubectl describe pod <pod-name>           # Detailed pod info & events\n'
+ 'kubectl logs <pod-name>                   # Container stdout logs\n'
+ 'kubectl logs <pod-name> -f                # Stream logs (follow)\n'
+ 'kubectl logs <pod-name> --previous        # Logs from crashed container\n'
+ 'kubectl logs <pod-name> -c <container>    # Logs from specific container\n'
+ '\n'
+ 'kubectl exec -it <pod-name> -- bash       # Shell into pod\n'
+ 'kubectl exec -it <pod-name> -- /bin/sh    # Shell (Alpine/BusyBox)\n'
+ 'kubectl exec <pod-name> -- env            # Print environment variables\n'
+ '\n'
+ 'kubectl port-forward pod/<pod-name> 8080:80   # Local port 8080 to pod port 80\n'
+ 'kubectl port-forward svc/<svc-name> 8080:80   # Local port to service port\n'
+ '\n'
+ 'kubectl delete pod <pod-name>             # Delete pod (Deployment recreates it)\n'
+ '\n'
+ '# ── Deployments ──────────────────────────────────────────────────\n'
+ 'kubectl get deployments\n'
+ 'kubectl get deploy -o wide\n'
+ 'kubectl describe deployment <name>\n'
+ '\n'
+ 'kubectl apply -f deployment.yaml          # Create or update\n'
+ 'kubectl delete -f deployment.yaml         # Delete\n'
+ 'kubectl diff -f deployment.yaml           # Preview changes\n'
+ '\n'
+ 'kubectl scale deploy <name> --replicas=5  # Scale manually\n'
+ 'kubectl set image deploy/<name> app=myimage:2.0.0  # Update image\n'
+ '\n'
+ 'kubectl rollout status deploy/<name>      # Watch rollout progress\n'
+ 'kubectl rollout history deploy/<name>     # View revision history\n'
+ 'kubectl rollout undo deploy/<name>        # Rollback to previous\n'
+ 'kubectl rollout undo deploy/<name> --to-revision=3  # Specific revision\n'
+ '\n'
+ '# ── Services & Ingress ───────────────────────────────────────────\n'
+ 'kubectl get services\n'
+ 'kubectl get svc -o wide\n'
+ 'kubectl describe svc <name>\n'
+ 'kubectl get ingress\n'
+ 'kubectl describe ingress <name>\n'
+ '\n'
+ '# ── ConfigMaps & Secrets ─────────────────────────────────────────\n'
+ 'kubectl get configmaps\n'
+ 'kubectl describe configmap <name>\n'
+ 'kubectl get secrets\n'
+ 'kubectl get secret <name> -o jsonpath="{.data.password}" | base64 --decode\n'
+ '\n'
+ '# ── Namespaces ───────────────────────────────────────────────────\n'
+ 'kubectl get namespaces\n'
+ 'kubectl create namespace staging\n'
+ 'kubectl config set-context --current --namespace=staging\n'
+ '\n'
+ '# ── Debugging ────────────────────────────────────────────────────\n'
+ 'kubectl get events --sort-by=.metadata.creationTimestamp\n'
+ 'kubectl get pod <name> -o yaml            # Full YAML spec\n'
+ 'kubectl run debug-pod --image=busybox:latest -it --rm -- sh\n'
+ 'kubectl top pods                          # Resource usage\n'
+ '\n'
+ '# ── All Resources ────────────────────────────────────────────────\n'
+ 'kubectl get all                           # All resources in namespace\n'
+ 'kubectl get all -n my-namespace\n'
+ 'kubectl get all -A                        # All resources everywhere'
      }</code></pre>

      {/* Section 4: YAML Manifests */}
      <h2 style={h2Style}>{ct.yamlTitle}</h2>
      <p style={pStyle}>{ct.yamlP1}</p>

      <h3 style={h3Style}>Pod Manifest</h3>
      <pre style={codeStyle}><code>{
'# pod.yaml — Production-ready Pod definition\n'
+ 'apiVersion: v1\n'
+ 'kind: Pod\n'
+ 'metadata:\n'
+ '  name: my-app\n'
+ '  namespace: production\n'
+ '  labels:\n'
+ '    app: my-app\n'
+ '    version: v1.0.0\n'
+ '    tier: backend\n'
+ 'spec:\n'
+ '  containers:\n'
+ '    - name: app\n'
+ '      image: nginx:1.27-alpine\n'
+ '      ports:\n'
+ '        - containerPort: 80\n'
+ '          protocol: TCP\n'
+ '      resources:\n'
+ '        requests:\n'
+ '          memory: "64Mi"\n'
+ '          cpu: "100m"\n'
+ '        limits:\n'
+ '          memory: "128Mi"\n'
+ '          cpu: "250m"\n'
+ '      livenessProbe:\n'
+ '        httpGet:\n'
+ '          path: /healthz\n'
+ '          port: 80\n'
+ '        initialDelaySeconds: 10\n'
+ '        periodSeconds: 15\n'
+ '        failureThreshold: 3\n'
+ '      readinessProbe:\n'
+ '        httpGet:\n'
+ '          path: /ready\n'
+ '          port: 80\n'
+ '        initialDelaySeconds: 5\n'
+ '        periodSeconds: 10\n'
+ '      startupProbe:\n'
+ '        httpGet:\n'
+ '          path: /healthz\n'
+ '          port: 80\n'
+ '        failureThreshold: 30\n'
+ '        periodSeconds: 5\n'
+ '      lifecycle:\n'
+ '        preStop:\n'
+ '          exec:\n'
+ '            command: ["/bin/sh", "-c", "sleep 5"]\n'
+ '  terminationGracePeriodSeconds: 30\n'
+ '  restartPolicy: Always'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>Deployment Manifest (Production-Ready)</h3>
      <pre style={codeStyle}><code>{
'# deployment.yaml\n'
+ 'apiVersion: apps/v1\n'
+ 'kind: Deployment\n'
+ 'metadata:\n'
+ '  name: web-app\n'
+ '  namespace: production\n'
+ '  labels:\n'
+ '    app: web-app\n'
+ '  annotations:\n'
+ '    kubernetes.io/change-cause: "Release v1.2.0 — performance improvements"\n'
+ 'spec:\n'
+ '  replicas: 3\n'
+ '  selector:\n'
+ '    matchLabels:\n'
+ '      app: web-app\n'
+ '  strategy:\n'
+ '    type: RollingUpdate\n'
+ '    rollingUpdate:\n'
+ '      maxSurge: 1          # Max 1 extra Pod during update\n'
+ '      maxUnavailable: 0    # No downtime\n'
+ '  template:\n'
+ '    metadata:\n'
+ '      labels:\n'
+ '        app: web-app\n'
+ '        version: "1.2.0"\n'
+ '    spec:\n'
+ '      containers:\n'
+ '        - name: web\n'
+ '          image: my-registry/web-app:1.2.0\n'
+ '          ports:\n'
+ '            - containerPort: 3000\n'
+ '          env:\n'
+ '            - name: NODE_ENV\n'
+ '              value: "production"\n'
+ '            - name: DB_PASSWORD\n'
+ '              valueFrom:\n'
+ '                secretKeyRef:\n'
+ '                  name: db-credentials\n'
+ '                  key: password\n'
+ '          envFrom:\n'
+ '            - configMapRef:\n'
+ '                name: app-config\n'
+ '          resources:\n'
+ '            requests:\n'
+ '              memory: "128Mi"\n'
+ '              cpu: "200m"\n'
+ '            limits:\n'
+ '              memory: "256Mi"\n'
+ '              cpu: "500m"\n'
+ '          livenessProbe:\n'
+ '            httpGet:\n'
+ '              path: /health\n'
+ '              port: 3000\n'
+ '            initialDelaySeconds: 10\n'
+ '            periodSeconds: 15\n'
+ '          readinessProbe:\n'
+ '            httpGet:\n'
+ '              path: /ready\n'
+ '              port: 3000\n'
+ '            initialDelaySeconds: 5\n'
+ '            periodSeconds: 5\n'
+ '          lifecycle:\n'
+ '            preStop:\n'
+ '              exec:\n'
+ '                command: ["/bin/sh", "-c", "sleep 10"]\n'
+ '      terminationGracePeriodSeconds: 60\n'
+ '      topologySpreadConstraints:\n'
+ '        - maxSkew: 1\n'
+ '          topologyKey: topology.kubernetes.io/zone\n'
+ '          whenUnsatisfiable: DoNotSchedule\n'
+ '          labelSelector:\n'
+ '            matchLabels:\n'
+ '              app: web-app'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>Service Manifest — All Four Types</h3>
      <pre style={codeStyle}><code>{
'# ClusterIP — internal cluster access only (default)\n'
+ 'apiVersion: v1\n'
+ 'kind: Service\n'
+ 'metadata:\n'
+ '  name: web-app-svc\n'
+ '  namespace: production\n'
+ 'spec:\n'
+ '  type: ClusterIP\n'
+ '  selector:\n'
+ '    app: web-app\n'
+ '  ports:\n'
+ '    - protocol: TCP\n'
+ '      port: 80\n'
+ '      targetPort: 3000\n'
+ '\n'
+ '---\n'
+ '# NodePort — accessible at <NodeIP>:30080 from outside cluster\n'
+ 'apiVersion: v1\n'
+ 'kind: Service\n'
+ 'metadata:\n'
+ '  name: web-app-nodeport\n'
+ 'spec:\n'
+ '  type: NodePort\n'
+ '  selector:\n'
+ '    app: web-app\n'
+ '  ports:\n'
+ '    - port: 80\n'
+ '      targetPort: 3000\n'
+ '      nodePort: 30080     # Must be 30000–32767\n'
+ '\n'
+ '---\n'
+ '# LoadBalancer — provisions cloud LB (EKS/GKE/AKS)\n'
+ 'apiVersion: v1\n'
+ 'kind: Service\n'
+ 'metadata:\n'
+ '  name: web-app-lb\n'
+ '  annotations:\n'
+ '    service.beta.kubernetes.io/aws-load-balancer-type: "nlb"\n'
+ 'spec:\n'
+ '  type: LoadBalancer\n'
+ '  selector:\n'
+ '    app: web-app\n'
+ '  ports:\n'
+ '    - port: 443\n'
+ '      targetPort: 3000'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>ConfigMap and Secret</h3>
      <pre style={codeStyle}><code>{
'# configmap.yaml — non-sensitive configuration\n'
+ 'apiVersion: v1\n'
+ 'kind: ConfigMap\n'
+ 'metadata:\n'
+ '  name: app-config\n'
+ '  namespace: production\n'
+ 'data:\n'
+ '  NODE_ENV: "production"\n'
+ '  LOG_LEVEL: "info"\n'
+ '  PORT: "3000"\n'
+ '  MAX_CONNECTIONS: "100"\n'
+ '  app.json: |\n'
+ '    {\n'
+ '      "features": {\n'
+ '        "darkMode": true,\n'
+ '        "betaFeatures": false\n'
+ '      },\n'
+ '      "pagination": {\n'
+ '        "defaultPageSize": 20\n'
+ '      }\n'
+ '    }\n'
+ '\n'
+ '---\n'
+ '# secret.yaml — sensitive data (base64-encoded in etcd)\n'
+ 'apiVersion: v1\n'
+ 'kind: Secret\n'
+ 'metadata:\n'
+ '  name: db-credentials\n'
+ '  namespace: production\n'
+ 'type: Opaque\n'
+ 'stringData:\n'
+ '  username: admin\n'
+ '  password: "super-secret-password-change-me"\n'
+ '  url: "postgres://admin:password@postgres:5432/myapp"\n'
+ '\n'
+ '---\n'
+ '# TLS Secret — for HTTPS certificates\n'
+ 'apiVersion: v1\n'
+ 'kind: Secret\n'
+ 'metadata:\n'
+ '  name: tls-cert\n'
+ '  namespace: production\n'
+ 'type: kubernetes.io/tls\n'
+ 'data:\n'
+ '  tls.crt: <base64-encoded-cert>\n'
+ '  tls.key: <base64-encoded-key>'
      }</code></pre>

      {/* Section 5: Helm */}
      <h2 style={h2Style}>{ct.helmTitle}</h2>
      <p style={pStyle}>{ct.helmP1}</p>
      <p style={pStyle}>{ct.helmP2}</p>

      <h3 style={h3Style}>Helm Installation and Basic Commands</h3>
      <pre style={codeStyle}><code>{
'# Install Helm (macOS)\n'
+ 'brew install helm\n'
+ '\n'
+ '# Install Helm (Linux)\n'
+ 'curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash\n'
+ '\n'
+ '# Verify\n'
+ 'helm version\n'
+ '\n'
+ '# ── Repository Management ────────────────────────────────────────\n'
+ 'helm repo add stable https://charts.helm.sh/stable\n'
+ 'helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx\n'
+ 'helm repo add bitnami https://charts.bitnami.com/bitnami\n'
+ 'helm repo add prometheus-community https://prometheus-community.github.io/helm-charts\n'
+ 'helm repo update                          # Refresh repo indices\n'
+ 'helm repo list                            # Show configured repos\n'
+ '\n'
+ '# ── Installing Charts ────────────────────────────────────────────\n'
+ '# Install NGINX Ingress Controller\n'
+ 'helm install ingress-nginx ingress-nginx/ingress-nginx \\\n'
+ '  --namespace ingress-nginx \\\n'
+ '  --create-namespace\n'
+ '\n'
+ '# Install PostgreSQL with custom values\n'
+ 'helm install my-postgres bitnami/postgresql \\\n'
+ '  --namespace production \\\n'
+ '  --set auth.postgresPassword=secret123 \\\n'
+ '  --set primary.persistence.size=20Gi \\\n'
+ '  --set primary.resources.requests.memory=256Mi\n'
+ '\n'
+ '# Install with a values file (preferred for complex configs)\n'
+ 'helm install my-release my-chart/ -f values-production.yaml\n'
+ '\n'
+ '# ── Release Management ───────────────────────────────────────────\n'
+ 'helm list                                 # List all releases\n'
+ 'helm list -n production                   # Releases in namespace\n'
+ 'helm status my-postgres                   # Release status\n'
+ 'helm history my-postgres                  # Release history\n'
+ '\n'
+ '# Upgrade a release\n'
+ 'helm upgrade my-postgres bitnami/postgresql \\\n'
+ '  --namespace production \\\n'
+ '  --set auth.postgresPassword=secret123 \\\n'
+ '  --set primary.persistence.size=30Gi\n'
+ '\n'
+ '# Rollback to previous version\n'
+ 'helm rollback my-postgres 1\n'
+ '\n'
+ '# Uninstall a release\n'
+ 'helm uninstall my-postgres -n production\n'
+ '\n'
+ '# ── Chart Development ────────────────────────────────────────────\n'
+ 'helm create my-app                        # Scaffold a new chart\n'
+ 'helm lint my-app/                         # Validate chart syntax\n'
+ 'helm template my-app my-app/ -f values.yaml  # Render templates locally\n'
+ 'helm install my-app my-app/ --dry-run --debug\n'
+ 'helm package my-app/                      # Package chart as .tgz'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>Helm Values File Example</h3>
      <pre style={codeStyle}><code>{
'# values-production.yaml\n'
+ '# Override default chart values for production environment\n'
+ '\n'
+ 'replicaCount: 3\n'
+ '\n'
+ 'image:\n'
+ '  repository: my-registry/web-app\n'
+ '  tag: "1.2.0"\n'
+ '  pullPolicy: IfNotPresent\n'
+ '\n'
+ 'service:\n'
+ '  type: ClusterIP\n'
+ '  port: 80\n'
+ '\n'
+ 'ingress:\n'
+ '  enabled: true\n'
+ '  className: nginx\n'
+ '  annotations:\n'
+ '    cert-manager.io/cluster-issuer: letsencrypt-prod\n'
+ '  hosts:\n'
+ '    - host: app.example.com\n'
+ '      paths:\n'
+ '        - path: /\n'
+ '          pathType: Prefix\n'
+ '  tls:\n'
+ '    - secretName: app-tls\n'
+ '      hosts:\n'
+ '        - app.example.com\n'
+ '\n'
+ 'resources:\n'
+ '  requests:\n'
+ '    memory: 256Mi\n'
+ '    cpu: 200m\n'
+ '  limits:\n'
+ '    memory: 512Mi\n'
+ '    cpu: 500m\n'
+ '\n'
+ 'autoscaling:\n'
+ '  enabled: true\n'
+ '  minReplicas: 3\n'
+ '  maxReplicas: 10\n'
+ '  targetCPUUtilizationPercentage: 70\n'
+ '\n'
+ 'config:\n'
+ '  NODE_ENV: production\n'
+ '  LOG_LEVEL: info\n'
+ '\n'
+ 'postgresql:\n'
+ '  enabled: true\n'
+ '  auth:\n'
+ '    database: myapp\n'
+ '    existingSecret: db-credentials\n'
+ '  primary:\n'
+ '    persistence:\n'
+ '      size: 20Gi\n'
+ '      storageClass: gp3'
      }</code></pre>

      {/* Section 6: Networking */}
      <h2 style={h2Style}>{ct.networkingTitle}</h2>
      <p style={pStyle}>{ct.networkingP1}</p>

      <h3 style={h3Style}>Ingress — HTTP Routing with TLS</h3>
      <pre style={codeStyle}><code>{
'# ingress.yaml — Route traffic to multiple services via one entry point\n'
+ 'apiVersion: networking.k8s.io/v1\n'
+ 'kind: Ingress\n'
+ 'metadata:\n'
+ '  name: app-ingress\n'
+ '  namespace: production\n'
+ '  annotations:\n'
+ '    nginx.ingress.kubernetes.io/rewrite-target: /\n'
+ '    nginx.ingress.kubernetes.io/ssl-redirect: "true"\n'
+ '    nginx.ingress.kubernetes.io/proxy-body-size: "50m"\n'
+ '    cert-manager.io/cluster-issuer: letsencrypt-prod\n'
+ 'spec:\n'
+ '  ingressClassName: nginx\n'
+ '  tls:\n'
+ '    - hosts:\n'
+ '        - app.example.com\n'
+ '        - api.example.com\n'
+ '      secretName: app-tls-secret\n'
+ '  rules:\n'
+ '    - host: app.example.com\n'
+ '      http:\n'
+ '        paths:\n'
+ '          - path: /\n'
+ '            pathType: Prefix\n'
+ '            backend:\n'
+ '              service:\n'
+ '                name: frontend-svc\n'
+ '                port:\n'
+ '                  number: 80\n'
+ '    - host: api.example.com\n'
+ '      http:\n'
+ '        paths:\n'
+ '          - path: /v1\n'
+ '            pathType: Prefix\n'
+ '            backend:\n'
+ '              service:\n'
+ '                name: api-v1-svc\n'
+ '                port:\n'
+ '                  number: 80\n'
+ '          - path: /v2\n'
+ '            pathType: Prefix\n'
+ '            backend:\n'
+ '              service:\n'
+ '                name: api-v2-svc\n'
+ '                port:\n'
+ '                  number: 80\n'
+ '\n'
+ '---\n'
+ '# ClusterIssuer — Let\'s Encrypt production certificates\n'
+ 'apiVersion: cert-manager.io/v1\n'
+ 'kind: ClusterIssuer\n'
+ 'metadata:\n'
+ '  name: letsencrypt-prod\n'
+ 'spec:\n'
+ '  acme:\n'
+ '    server: https://acme-v02.api.letsencrypt.org/directory\n'
+ '    email: admin@example.com\n'
+ '    privateKeySecretRef:\n'
+ '      name: letsencrypt-prod\n'
+ '    solvers:\n'
+ '      - http01:\n'
+ '          ingress:\n'
+ '            class: nginx'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#ec4899' }}>NetworkPolicy — Zero-Trust Pod Networking</h3>
      <pre style={codeStyle}><code>{
'# networkpolicy.yaml — Deny all, then allow only required paths\n'
+ 'apiVersion: networking.k8s.io/v1\n'
+ 'kind: NetworkPolicy\n'
+ 'metadata:\n'
+ '  name: api-network-policy\n'
+ '  namespace: production\n'
+ 'spec:\n'
+ '  podSelector:\n'
+ '    matchLabels:\n'
+ '      app: api-server\n'
+ '  policyTypes:\n'
+ '    - Ingress\n'
+ '    - Egress\n'
+ '  ingress:\n'
+ '    - from:\n'
+ '        - podSelector:\n'
+ '            matchLabels:\n'
+ '              app: frontend        # Only frontend can call API\n'
+ '        - namespaceSelector:\n'
+ '            matchLabels:\n'
+ '              name: monitoring     # Prometheus can scrape metrics\n'
+ '      ports:\n'
+ '        - protocol: TCP\n'
+ '          port: 3000\n'
+ '  egress:\n'
+ '    - to:\n'
+ '        - podSelector:\n'
+ '            matchLabels:\n'
+ '              app: postgres        # API can only reach the DB\n'
+ '      ports:\n'
+ '        - protocol: TCP\n'
+ '          port: 5432'
      }</code></pre>

      {/* Section 7: Storage */}
      <h2 style={h2Style}>{ct.storageTitle}</h2>
      <p style={pStyle}>{ct.storageP1}</p>
      <p style={pStyle}>{ct.storageP2}</p>

      <h3 style={h3Style}>StorageClass, PVC, and StatefulSet</h3>
      <pre style={codeStyle}><code>{
'# storageclass.yaml — Dynamic provisioning on AWS\n'
+ 'apiVersion: storage.k8s.io/v1\n'
+ 'kind: StorageClass\n'
+ 'metadata:\n'
+ '  name: fast-ssd\n'
+ 'provisioner: ebs.csi.aws.com\n'
+ 'volumeBindingMode: WaitForFirstConsumer\n'
+ 'reclaimPolicy: Retain\n'
+ 'parameters:\n'
+ '  type: gp3\n'
+ '  iops: "3000"\n'
+ '  throughput: "125"\n'
+ '  encrypted: "true"\n'
+ '\n'
+ '---\n'
+ '# pvc.yaml — Request 20Gi of SSD storage\n'
+ 'apiVersion: v1\n'
+ 'kind: PersistentVolumeClaim\n'
+ 'metadata:\n'
+ '  name: postgres-data\n'
+ '  namespace: production\n'
+ 'spec:\n'
+ '  accessModes:\n'
+ '    - ReadWriteOnce\n'
+ '  storageClassName: fast-ssd\n'
+ '  resources:\n'
+ '    requests:\n'
+ '      storage: 20Gi\n'
+ '\n'
+ '---\n'
+ '# StatefulSet — PostgreSQL with per-pod stable storage\n'
+ 'apiVersion: apps/v1\n'
+ 'kind: StatefulSet\n'
+ 'metadata:\n'
+ '  name: postgres\n'
+ '  namespace: production\n'
+ 'spec:\n'
+ '  serviceName: postgres\n'
+ '  replicas: 1\n'
+ '  selector:\n'
+ '    matchLabels:\n'
+ '      app: postgres\n'
+ '  template:\n'
+ '    metadata:\n'
+ '      labels:\n'
+ '        app: postgres\n'
+ '    spec:\n'
+ '      containers:\n'
+ '        - name: postgres\n'
+ '          image: postgres:16-alpine\n'
+ '          ports:\n'
+ '            - containerPort: 5432\n'
+ '          env:\n'
+ '            - name: POSTGRES_DB\n'
+ '              value: myapp\n'
+ '            - name: POSTGRES_USER\n'
+ '              valueFrom:\n'
+ '                secretKeyRef:\n'
+ '                  name: db-credentials\n'
+ '                  key: username\n'
+ '            - name: POSTGRES_PASSWORD\n'
+ '              valueFrom:\n'
+ '                secretKeyRef:\n'
+ '                  name: db-credentials\n'
+ '                  key: password\n'
+ '            - name: PGDATA\n'
+ '              value: /var/lib/postgresql/data/pgdata\n'
+ '          volumeMounts:\n'
+ '            - name: postgres-storage\n'
+ '              mountPath: /var/lib/postgresql/data\n'
+ '          resources:\n'
+ '            requests:\n'
+ '              memory: "256Mi"\n'
+ '              cpu: "250m"\n'
+ '            limits:\n'
+ '              memory: "512Mi"\n'
+ '              cpu: "1"\n'
+ '          livenessProbe:\n'
+ '            exec:\n'
+ '              command: ["pg_isready", "-U", "admin", "-d", "myapp"]\n'
+ '            initialDelaySeconds: 30\n'
+ '            periodSeconds: 10\n'
+ '  volumeClaimTemplates:\n'
+ '    - metadata:\n'
+ '        name: postgres-storage\n'
+ '      spec:\n'
+ '        accessModes: ["ReadWriteOnce"]\n'
+ '        storageClassName: fast-ssd\n'
+ '        resources:\n'
+ '          requests:\n'
+ '            storage: 20Gi\n'
+ '\n'
+ '---\n'
+ '# Headless service for StatefulSet DNS\n'
+ 'apiVersion: v1\n'
+ 'kind: Service\n'
+ 'metadata:\n'
+ '  name: postgres\n'
+ '  namespace: production\n'
+ 'spec:\n'
+ '  clusterIP: None              # Headless — no virtual IP\n'
+ '  selector:\n'
+ '    app: postgres\n'
+ '  ports:\n'
+ '    - port: 5432\n'
+ '      targetPort: 5432'
      }</code></pre>

      {/* Section 8: Autoscaling */}
      <h2 style={h2Style}>{ct.scalingTitle}</h2>
      <p style={pStyle}>{ct.scalingP1}</p>
      <p style={pStyle}>{ct.scalingP2}</p>

      <h3 style={h3Style}>Horizontal Pod Autoscaler (HPA)</h3>
      <pre style={codeStyle}><code>{
'# hpa.yaml — Scale web-app pods based on CPU and memory\n'
+ 'apiVersion: autoscaling/v2\n'
+ 'kind: HorizontalPodAutoscaler\n'
+ 'metadata:\n'
+ '  name: web-app-hpa\n'
+ '  namespace: production\n'
+ 'spec:\n'
+ '  scaleTargetRef:\n'
+ '    apiVersion: apps/v1\n'
+ '    kind: Deployment\n'
+ '    name: web-app\n'
+ '  minReplicas: 3\n'
+ '  maxReplicas: 20\n'
+ '  metrics:\n'
+ '    - type: Resource\n'
+ '      resource:\n'
+ '        name: cpu\n'
+ '        target:\n'
+ '          type: Utilization\n'
+ '          averageUtilization: 70\n'
+ '    - type: Resource\n'
+ '      resource:\n'
+ '        name: memory\n'
+ '        target:\n'
+ '          type: Utilization\n'
+ '          averageUtilization: 80\n'
+ '    - type: Pods\n'
+ '      pods:\n'
+ '        metric:\n'
+ '          name: http_requests_per_second\n'
+ '        target:\n'
+ '          type: AverageValue\n'
+ '          averageValue: "1000"\n'
+ '  behavior:\n'
+ '    scaleUp:\n'
+ '      stabilizationWindowSeconds: 60\n'
+ '      policies:\n'
+ '        - type: Pods\n'
+ '          value: 4\n'
+ '          periodSeconds: 60\n'
+ '    scaleDown:\n'
+ '      stabilizationWindowSeconds: 300\n'
+ '      policies:\n'
+ '        - type: Percent\n'
+ '          value: 10\n'
+ '          periodSeconds: 60'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>Vertical Pod Autoscaler (VPA)</h3>
      <pre style={codeStyle}><code>{
'# vpa.yaml — Automatically tune resource requests and limits\n'
+ 'apiVersion: autoscaling.k8s.io/v1\n'
+ 'kind: VerticalPodAutoscaler\n'
+ 'metadata:\n'
+ '  name: web-app-vpa\n'
+ '  namespace: production\n'
+ 'spec:\n'
+ '  targetRef:\n'
+ '    apiVersion: apps/v1\n'
+ '    kind: Deployment\n'
+ '    name: web-app\n'
+ '  updatePolicy:\n'
+ '    updateMode: "Auto"\n'
+ '  resourcePolicy:\n'
+ '    containerPolicies:\n'
+ '      - containerName: web\n'
+ '        minAllowed:\n'
+ '          cpu: 100m\n'
+ '          memory: 128Mi\n'
+ '        maxAllowed:\n'
+ '          cpu: "2"\n'
+ '          memory: 2Gi\n'
+ '        controlledResources: ["cpu", "memory"]'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>Test Autoscaling with Load Generation</h3>
      <pre style={codeStyle}><code>{
'# Apply HPA\n'
+ 'kubectl apply -f hpa.yaml\n'
+ '\n'
+ '# Check current HPA status\n'
+ 'kubectl get hpa -n production\n'
+ 'kubectl describe hpa web-app-hpa -n production\n'
+ '\n'
+ '# Generate CPU load to trigger autoscaling\n'
+ 'kubectl run load-generator \\\n'
+ '  --image=busybox:latest \\\n'
+ '  --rm -it \\\n'
+ '  --restart=Never \\\n'
+ '  -- /bin/sh -c "while true; do wget -q -O- http://web-app-svc/; done"\n'
+ '\n'
+ '# In a second terminal: watch pods scale up\n'
+ 'kubectl get pods -n production -w\n'
+ '\n'
+ '# Watch HPA metrics update live\n'
+ 'kubectl get hpa -n production -w\n'
+ '\n'
+ '# Stop load generator (Ctrl+C), watch pods scale down after 5 min\n'
+ '# Cluster Autoscaler adds nodes when pods are Pending\n'
+ 'kubectl get nodes -w'
      }</code></pre>

      {/* Section 9: Comparison Table */}
      <h2 style={h2Style}>{ct.comparisonTitle}</h2>
      <p style={pStyle}>{ct.comparisonP1}</p>
      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 680 }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: '22%' }}>Feature</th>
              <th style={{ ...thStyle, width: '26%' }}>Kubernetes</th>
              <th style={{ ...thStyle, width: '26%' }}>Docker Swarm</th>
              <th style={{ ...thStyle, width: '26%' }}>HashiCorp Nomad</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Origin', 'Google → CNCF (2014)', 'Docker Inc. (2016)', 'HashiCorp (2015)'],
              ['Workloads', 'OCI containers', 'Docker containers only', 'Containers, binaries, JARs, VMs'],
              ['Learning Curve', 'High', 'Low', 'Medium'],
              ['Setup Complexity', 'High (many components)', 'Very low (built-in to Docker)', 'Low (single binary)'],
              ['Auto-scaling', 'HPA, VPA, Cluster Autoscaler', 'Basic / manual', 'Dynamic task placement'],
              ['Self-healing', 'Full reschedule + restart', 'Basic restart policies', 'Job re-scheduling'],
              ['Networking', 'CNI plugins, NetworkPolicy, full SDN', 'Overlay network, basic routing', 'Consul Connect, CNI plugins'],
              ['Storage', 'PV/PVC/StorageClass ecosystem', 'Docker volumes', 'Host volumes, CSI plugins'],
              ['Rolling Updates', 'Native, configurable', 'Built-in, limited options', 'Canary, blue-green, rolling'],
              ['Service Discovery', 'CoreDNS + kube-proxy', 'Built-in DNS (VIP)', 'Consul (first-class)'],
              ['RBAC', 'Granular, mature', 'Basic Swarm secrets', 'ACL policies via Consul/Vault'],
              ['Ecosystem', 'Enormous (CNCF, Helm, Operators)', 'Small, Docker-centric', 'HashiCorp stack integration'],
              ['Managed Cloud', 'EKS, GKE, AKS, DOKS, and more', 'Not offered by major clouds', 'HCP Nomad (HashiCorp Cloud)'],
              ['Resource Overhead', 'High (~2GB control plane)', 'Minimal (embedded in Docker)', 'Low (~256MB single agent)'],
              ['Best For', 'Large-scale microservices, cloud-native', 'Simple teams, small scale', 'Mixed workloads (containers + legacy)'],
            ].map(([feature, k8s, swarm, nomad], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{k8s}</td>
                <td style={tdStyle}>{swarm}</td>
                <td style={tdStyle}>{nomad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decision Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {[
          {
            title: 'Choose Kubernetes when…',
            color: '#3b82f6',
            items: [
              'Running 10+ microservices that need independent scaling',
              'Production workloads requiring zero-downtime deploys and auto-rollback',
              'Teams need fine-grained RBAC and namespace-level resource quotas',
              'You want the richest ecosystem (Helm, Operators, service mesh, Prometheus)',
              'You are deploying to AWS, GCP, or Azure with managed control plane offerings',
            ],
          },
          {
            title: 'Choose Docker Swarm when…',
            color: '#22c55e',
            items: [
              'Small team with simple Docker-based apps running on 1-5 servers',
              'You want zero additional tooling beyond Docker Engine',
              'Quick setup is more valuable than advanced features',
              'Migrating from Docker Compose to basic orchestration with minimal relearning',
              'Limited budget for DevOps expertise',
            ],
          },
          {
            title: 'Choose HashiCorp Nomad when…',
            color: '#f59e0b',
            items: [
              'Mixed workloads: containers AND legacy binaries, Java JARs, or VMs',
              'Already invested in the HashiCorp stack (Consul, Vault, Terraform)',
              'You need Kubernetes-grade features with significantly lower operational overhead',
              'Edge deployments or multi-datacenter workloads across heterogeneous infrastructure',
              'Compliance requires workload isolation without full Kubernetes complexity',
            ],
          },
        ].map((card, i) => (
          <div key={i} style={{
            padding: '16px 20px',
            background: 'var(--bg-input)',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            borderLeft: '4px solid ' + card.color,
          }}>
            <strong style={{ color: card.color, fontSize: 15 }}>{card.title}</strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20, color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: 14 }}>
              {card.items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* Complete Application Example */}
      <h2 style={h2Style}>Complete Production Application Example</h2>
      <p style={pStyle}>
        The following manifest deploys a Node.js API with PostgreSQL, Ingress, and HPA in a single file.
        Apply with <code style={{ background: 'var(--bg-input)', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>kubectl apply -f complete-app.yaml</code>.
      </p>
      <pre style={codeStyle}><code>{
'# complete-app.yaml\n'
+ '\n'
+ '# 1. Namespace\n'
+ 'apiVersion: v1\n'
+ 'kind: Namespace\n'
+ 'metadata:\n'
+ '  name: myapp\n'
+ '  labels:\n'
+ '    environment: production\n'
+ '---\n'
+ '# 2. ConfigMap\n'
+ 'apiVersion: v1\n'
+ 'kind: ConfigMap\n'
+ 'metadata:\n'
+ '  name: app-config\n'
+ '  namespace: myapp\n'
+ 'data:\n'
+ '  NODE_ENV: production\n'
+ '  PORT: "3000"\n'
+ '  LOG_LEVEL: info\n'
+ '---\n'
+ '# 3. Secret\n'
+ 'apiVersion: v1\n'
+ 'kind: Secret\n'
+ 'metadata:\n'
+ '  name: app-secrets\n'
+ '  namespace: myapp\n'
+ 'type: Opaque\n'
+ 'stringData:\n'
+ '  DATABASE_URL: postgres://app:secret@postgres:5432/myapp\n'
+ '  JWT_SECRET: change-me-in-production\n'
+ '---\n'
+ '# 4. PostgreSQL StatefulSet\n'
+ 'apiVersion: apps/v1\n'
+ 'kind: StatefulSet\n'
+ 'metadata:\n'
+ '  name: postgres\n'
+ '  namespace: myapp\n'
+ 'spec:\n'
+ '  serviceName: postgres\n'
+ '  replicas: 1\n'
+ '  selector:\n'
+ '    matchLabels:\n'
+ '      app: postgres\n'
+ '  template:\n'
+ '    metadata:\n'
+ '      labels:\n'
+ '        app: postgres\n'
+ '    spec:\n'
+ '      containers:\n'
+ '        - name: postgres\n'
+ '          image: postgres:16-alpine\n'
+ '          env:\n'
+ '            - { name: POSTGRES_DB, value: myapp }\n'
+ '            - { name: POSTGRES_USER, value: app }\n'
+ '            - { name: POSTGRES_PASSWORD, value: secret }\n'
+ '          volumeMounts:\n'
+ '            - { name: pg-data, mountPath: /var/lib/postgresql/data }\n'
+ '          resources:\n'
+ '            requests: { memory: 256Mi, cpu: 250m }\n'
+ '            limits:   { memory: 512Mi, cpu: "1" }\n'
+ '  volumeClaimTemplates:\n'
+ '    - metadata:\n'
+ '        name: pg-data\n'
+ '      spec:\n'
+ '        accessModes: [ReadWriteOnce]\n'
+ '        resources:\n'
+ '          requests:\n'
+ '            storage: 10Gi\n'
+ '---\n'
+ '# 5. Postgres Service\n'
+ 'apiVersion: v1\n'
+ 'kind: Service\n'
+ 'metadata:\n'
+ '  name: postgres\n'
+ '  namespace: myapp\n'
+ 'spec:\n'
+ '  type: ClusterIP\n'
+ '  selector:\n'
+ '    app: postgres\n'
+ '  ports:\n'
+ '    - { port: 5432, targetPort: 5432 }\n'
+ '---\n'
+ '# 6. App Deployment\n'
+ 'apiVersion: apps/v1\n'
+ 'kind: Deployment\n'
+ 'metadata:\n'
+ '  name: web-app\n'
+ '  namespace: myapp\n'
+ 'spec:\n'
+ '  replicas: 3\n'
+ '  selector:\n'
+ '    matchLabels:\n'
+ '      app: web-app\n'
+ '  strategy:\n'
+ '    type: RollingUpdate\n'
+ '    rollingUpdate: { maxSurge: 1, maxUnavailable: 0 }\n'
+ '  template:\n'
+ '    metadata:\n'
+ '      labels:\n'
+ '        app: web-app\n'
+ '    spec:\n'
+ '      containers:\n'
+ '        - name: app\n'
+ '          image: my-registry/web-app:1.0.0\n'
+ '          ports:\n'
+ '            - { containerPort: 3000 }\n'
+ '          envFrom:\n'
+ '            - configMapRef: { name: app-config }\n'
+ '            - secretRef:    { name: app-secrets }\n'
+ '          resources:\n'
+ '            requests: { memory: 128Mi, cpu: 100m }\n'
+ '            limits:   { memory: 256Mi, cpu: 500m }\n'
+ '          livenessProbe:\n'
+ '            httpGet: { path: /health, port: 3000 }\n'
+ '            initialDelaySeconds: 15\n'
+ '          readinessProbe:\n'
+ '            httpGet: { path: /ready, port: 3000 }\n'
+ '            initialDelaySeconds: 5\n'
+ '---\n'
+ '# 7. App Service\n'
+ 'apiVersion: v1\n'
+ 'kind: Service\n'
+ 'metadata:\n'
+ '  name: web-app-svc\n'
+ '  namespace: myapp\n'
+ 'spec:\n'
+ '  type: ClusterIP\n'
+ '  selector:\n'
+ '    app: web-app\n'
+ '  ports:\n'
+ '    - { port: 80, targetPort: 3000 }\n'
+ '---\n'
+ '# 8. Ingress\n'
+ 'apiVersion: networking.k8s.io/v1\n'
+ 'kind: Ingress\n'
+ 'metadata:\n'
+ '  name: web-app-ingress\n'
+ '  namespace: myapp\n'
+ '  annotations:\n'
+ '    cert-manager.io/cluster-issuer: letsencrypt-prod\n'
+ 'spec:\n'
+ '  ingressClassName: nginx\n'
+ '  tls:\n'
+ '    - hosts: [myapp.example.com]\n'
+ '      secretName: myapp-tls\n'
+ '  rules:\n'
+ '    - host: myapp.example.com\n'
+ '      http:\n'
+ '        paths:\n'
+ '          - path: /\n'
+ '            pathType: Prefix\n'
+ '            backend:\n'
+ '              service:\n'
+ '                name: web-app-svc\n'
+ '                port: { number: 80 }\n'
+ '---\n'
+ '# 9. HPA\n'
+ 'apiVersion: autoscaling/v2\n'
+ 'kind: HorizontalPodAutoscaler\n'
+ 'metadata:\n'
+ '  name: web-app-hpa\n'
+ '  namespace: myapp\n'
+ 'spec:\n'
+ '  scaleTargetRef:\n'
+ '    apiVersion: apps/v1\n'
+ '    kind: Deployment\n'
+ '    name: web-app\n'
+ '  minReplicas: 3\n'
+ '  maxReplicas: 15\n'
+ '  metrics:\n'
+ '    - type: Resource\n'
+ '      resource:\n'
+ '        name: cpu\n'
+ '        target:\n'
+ '          type: Utilization\n'
+ '          averageUtilization: 70'
      }</code></pre>

      <h3 style={h3Style}>Verify the Deployment</h3>
      <pre style={codeStyle}><code>{
'# Apply the entire stack at once\n'
+ 'kubectl apply -f complete-app.yaml\n'
+ '\n'
+ '# Verify all resources are created\n'
+ 'kubectl get all -n myapp\n'
+ '\n'
+ '# Watch pods reach Running state\n'
+ 'kubectl get pods -n myapp -w\n'
+ '\n'
+ '# Stream application logs\n'
+ 'kubectl logs -n myapp -l app=web-app --tail=50 -f\n'
+ '\n'
+ '# Test connectivity from inside the cluster\n'
+ 'kubectl run test --image=curlimages/curl:latest --rm -it \\\n'
+ '  --restart=Never -n myapp \\\n'
+ '  -- curl http://web-app-svc/health\n'
+ '\n'
+ '# Port-forward for local testing\n'
+ 'kubectl port-forward -n myapp svc/web-app-svc 8080:80\n'
+ '# Open http://localhost:8080\n'
+ '\n'
+ '# Check HPA status\n'
+ 'kubectl get hpa -n myapp\n'
+ '\n'
+ '# Check TLS certificate (cert-manager)\n'
+ 'kubectl get certificate -n myapp\n'
+ 'kubectl describe certificate myapp-tls -n myapp'
      }</code></pre>

      {/* Related Tools CTA */}
      <div style={{
        padding: '20px 24px',
        background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
        borderRadius: 12,
        border: '1px solid rgba(59,130,246,0.3)',
        textAlign: 'center',
        marginTop: 32,
        marginBottom: 32,
      }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>{ct.tryTools}</p>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
          JSON Formatter · YAML Validator · Base64 Encoder · JWT Decoder · Cron Expression Generator
        </p>
      </div>

      {/* Section 10: FAQ */}
      <h2 style={h2Style}>{ct.faqTitle}</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
        [ct.faq7q, ct.faq7a],
        [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{
          marginBottom: 16,
          padding: '16px 20px',
          background: 'var(--bg-input)',
          borderRadius: 8,
          border: '1px solid var(--border-color)',
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 8px', color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0 }}>{a}</p>
        </div>
      ))}

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionP1}</p>
    </div>
  );
}
