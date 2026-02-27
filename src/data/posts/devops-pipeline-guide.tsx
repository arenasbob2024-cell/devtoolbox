'use client';
import React from 'react';

const translations = {
  en: {
    title: 'DevOps Pipeline Guide: CI/CD, GitHub Actions, Docker, Infrastructure as Code & Deployment Strategies',
    description: 'A comprehensive DevOps pipeline guide covering CI/CD fundamentals, GitHub Actions workflows, GitLab CI/CD, Docker multi-stage builds, Terraform and Pulumi IaC, blue-green and canary deployments, secrets management with Vault, GitOps with ArgoCD and Flux, pipeline security with SAST/DAST, and monitoring strategies.',
    tldr: 'A DevOps pipeline automates the journey from code commit to production deployment. Start with CI/CD fundamentals — build, test, and deploy automatically on every push. Use GitHub Actions or GitLab CI for pipeline orchestration with matrix builds, caching, and reusable workflows. Containerize with Docker multi-stage builds for minimal images. Adopt Infrastructure as Code with Terraform or Pulumi to manage environments declaratively. Deploy using blue-green or canary strategies to minimize risk. Secure your pipeline with SAST, DAST, and dependency scanning. Implement GitOps with ArgoCD or Flux for Kubernetes-native continuous delivery. Always have rollback strategies and monitor every stage of the pipeline.',
    keyTakeaways: [
      'CI/CD automates build, test, and deploy stages — commit triggers pipeline, not manual steps',
      'GitHub Actions uses YAML workflows with matrix builds, caching, secrets, and reusable workflows',
      'Docker multi-stage builds create minimal production images by separating build and runtime layers',
      'Terraform and Pulumi enable Infrastructure as Code — declarative, version-controlled, reproducible environments',
      'Blue-green and canary deployments reduce risk by gradually shifting traffic to new versions',
      'GitOps (ArgoCD, Flux) uses Git as the single source of truth for Kubernetes deployments',
      'Pipeline security includes SAST, DAST, dependency scanning, and secrets management with Vault or AWS Secrets Manager',
      'Monitoring and rollback strategies are essential — always have a fast path back to the last known good state',
    ],
    sections: {
      cicdFundamentals: 'CI/CD Fundamentals',
      cicdFundamentalsContent: 'Continuous Integration (CI) and Continuous Delivery/Deployment (CD) form the backbone of modern DevOps pipelines. CI ensures that every code change is automatically built and tested, catching bugs early. CD extends this by automatically deploying validated changes to staging or production environments.',
      buildTestDeploy: 'Build, Test, Deploy Pipeline',
      buildTestDeployContent: 'A standard pipeline has three core stages. The Build stage compiles code, resolves dependencies, and produces artifacts. The Test stage runs unit tests, integration tests, and linting. The Deploy stage pushes artifacts to target environments. Each stage acts as a quality gate — if any stage fails, the pipeline stops and notifies the team.',
      buildTestDeployExample: 'Pipeline stage progression:',
      githubActions: 'GitHub Actions Workflows',
      githubActionsContent: 'GitHub Actions is a CI/CD platform built into GitHub. Workflows are defined in YAML files under .github/workflows/ and triggered by events like push, pull_request, or schedule. Key features include matrix builds for testing across multiple OS/language versions, caching for faster builds, encrypted secrets for credentials, and reusable workflows for DRY pipeline definitions.',
      githubActionsExample: 'GitHub Actions workflow with matrix builds and caching:',
      gitlabCiCd: 'GitLab CI/CD',
      gitlabCiCdContent: 'GitLab CI/CD uses a .gitlab-ci.yml file in the repository root. It features built-in container registry, Auto DevOps for zero-configuration pipelines, environments with review apps, and DAG (Directed Acyclic Graph) pipelines for complex dependency management. GitLab runners execute pipeline jobs and can be shared or project-specific.',
      gitlabCiCdExample: 'GitLab CI/CD pipeline configuration:',
      dockerMultiStage: 'Docker Multi-Stage Builds',
      dockerMultiStageContent: 'Multi-stage builds use multiple FROM statements in a single Dockerfile. The build stage contains all development dependencies and compilers, while the final stage copies only the compiled artifact into a minimal base image. This dramatically reduces image size and attack surface. Always use specific version tags for base images, never use latest in production.',
      dockerMultiStageExample: 'Docker multi-stage build for a Node.js application:',
      containerRegistries: 'Container Registries',
      containerRegistriesContent: 'Container registries store and distribute Docker images. Options include Docker Hub (public and private repositories), GitHub Container Registry (ghcr.io, integrated with GitHub Actions), Amazon ECR (integrated with AWS services), Google Artifact Registry, and Azure Container Registry. Choose based on your cloud provider and access control requirements. Always scan images for vulnerabilities before pushing to production registries.',
      terraformBasics: 'Terraform Basics',
      terraformBasicsContent: 'Terraform by HashiCorp is the most widely adopted Infrastructure as Code tool. It uses HCL (HashiCorp Configuration Language) to declaratively define infrastructure. The core workflow is terraform init (initialize providers), terraform plan (preview changes), and terraform apply (execute changes). State is stored in a backend (S3, Azure Blob, GCS) to track resource mappings. Use modules for reusable infrastructure components and workspaces for environment separation.',
      terraformExample: 'Terraform configuration for an AWS ECS service:',
      pulumiIac: 'Pulumi — IaC with Programming Languages',
      pulumiIacContent: 'Pulumi takes a different approach to IaC by using real programming languages (TypeScript, Python, Go, C#) instead of domain-specific languages. This gives you access to loops, conditionals, type checking, IDE support, and testing frameworks. Pulumi manages state similarly to Terraform and supports all major cloud providers. It is particularly appealing to teams that prefer writing infrastructure code in the same language as their application.',
      pulumiExample: 'Pulumi infrastructure in TypeScript:',
      blueGreenCanary: 'Deployment Strategies: Blue-Green and Canary',
      blueGreenCanaryContent: 'Blue-green deployment maintains two identical production environments. Blue is the current live version, Green is the new version. After deploying and testing Green, traffic is switched from Blue to Green. Rollback is instant — just switch back to Blue. Canary deployment gradually routes a small percentage of traffic (e.g., 5%) to the new version, monitors metrics, and increases traffic if everything looks healthy. Rolling deployments update instances one at a time, maintaining availability throughout.',
      blueGreenExample: 'Kubernetes blue-green deployment manifest:',
      environmentManagement: 'Environment Management',
      environmentManagementContent: 'Proper environment management requires at least three tiers: development, staging, and production. Staging should mirror production as closely as possible in terms of configuration, data shape, and infrastructure. Use environment-specific configuration files, feature flags for gradual rollouts, and database migration strategies that work across environments. Never share secrets between environments.',
      secretsManagement: 'Secrets Management',
      secretsManagementContent: 'Never store secrets in code, environment variables on disk, or pipeline configurations. Use dedicated secrets management tools. HashiCorp Vault provides dynamic secrets, encryption as a service, and fine-grained access policies. AWS Secrets Manager integrates with IAM for access control and supports automatic rotation. For Kubernetes, use External Secrets Operator to sync secrets from Vault or cloud providers into Kubernetes Secrets.',
      secretsExample: 'Vault integration in a pipeline:',
      monitoringPipelines: 'Monitoring Pipelines',
      monitoringPipelinesContent: 'Pipeline monitoring goes beyond application monitoring. Track build duration trends, test flakiness rates, deployment frequency, lead time for changes, mean time to recovery (MTTR), and change failure rate. These are the DORA metrics that indicate DevOps performance. Use tools like Grafana dashboards, Datadog CI Visibility, or built-in analytics from GitHub Actions or GitLab to visualize pipeline health.',
      rollbackStrategies: 'Rollback Strategies',
      rollbackStrategiesContent: 'Every deployment needs a rollback plan. Strategies include: reverting the Git commit and re-running the pipeline, using container image tags to redeploy the previous version, Kubernetes rollout undo for instant rollback, database migration rollback scripts (always write backward-compatible migrations), and feature flags to disable problematic features without redeploying. Automate rollbacks based on health check failures and error rate thresholds.',
      rollbackExample: 'Kubernetes rollback commands:',
      gitops: 'GitOps with ArgoCD and Flux',
      gitopsContent: 'GitOps uses Git repositories as the single source of truth for declarative infrastructure and applications. ArgoCD and Flux are Kubernetes-native GitOps operators that continuously reconcile the desired state in Git with the actual state in the cluster. Changes are made via pull requests — no direct kubectl apply. This provides audit trails, easy rollbacks (git revert), and consistent environments. ArgoCD offers a web UI for visualization, while Flux is more lightweight and composable.',
      gitopsExample: 'ArgoCD Application manifest:',
      pipelineSecurity: 'Pipeline Security: SAST, DAST, and Dependency Scanning',
      pipelineSecurityContent: 'Shift security left by integrating it into the pipeline. SAST (Static Application Security Testing) analyzes source code for vulnerabilities without running it — tools include Semgrep, SonarQube, and CodeQL. DAST (Dynamic Application Security Testing) tests the running application for vulnerabilities like XSS and SQL injection — tools include OWASP ZAP and Burp Suite. Dependency scanning checks third-party packages for known CVEs — tools include Snyk, Dependabot, and Trivy for container images. Run all three in every pipeline.',
      pipelineSecurityExample: 'Security scanning in GitHub Actions:',
      faqTitle: 'Frequently Asked Questions',
    },
  },
  zh: {
    title: 'DevOps 流水线指南：CI/CD、GitHub Actions、Docker、基础设施即代码与部署策略',
    description: '全面的 DevOps 流水线指南，涵盖 CI/CD 基础、GitHub Actions 工作流、GitLab CI/CD、Docker 多阶段构建、Terraform 和 Pulumi 基础设施即代码、蓝绿和金丝雀部署、Vault 密钥管理、ArgoCD 和 Flux 的 GitOps、SAST/DAST 流水线安全以及监控策略。',
    tldr: 'DevOps 流水线自动化了从代码提交到生产部署的整个过程。从 CI/CD 基础开始——在每次推送时自动构建、测试和部署。使用 GitHub Actions 或 GitLab CI 进行流水线编排，支持矩阵构建、缓存和可复用工作流。使用 Docker 多阶段构建创建最小化镜像。采用 Terraform 或 Pulumi 的基础设施即代码来声明式管理环境。使用蓝绿或金丝雀策略部署以最小化风险。通过 SAST、DAST 和依赖扫描保护流水线安全。使用 ArgoCD 或 Flux 实现 GitOps，以 Kubernetes 原生方式进行持续交付。始终准备回滚策略并监控流水线的每个阶段。',
    keyTakeaways: [
      'CI/CD 自动化构建、测试和部署阶段——提交触发流水线，而非手动操作',
      'GitHub Actions 使用 YAML 工作流，支持矩阵构建、缓存、密钥和可复用工作流',
      'Docker 多阶段构建通过分离构建层和运行时层创建最小化生产镜像',
      'Terraform 和 Pulumi 实现基础设施即代码——声明式、版本控制、可重现的环境',
      '蓝绿和金丝雀部署通过逐步切换流量到新版本来降低风险',
      'GitOps（ArgoCD、Flux）使用 Git 作为 Kubernetes 部署的唯一事实来源',
      '流水线安全包括 SAST、DAST、依赖扫描以及使用 Vault 或 AWS Secrets Manager 进行密钥管理',
      '监控和回滚策略至关重要——始终保持快速回退到上一个已知良好状态的路径',
    ],
    sections: {
      cicdFundamentals: 'CI/CD 基础',
      cicdFundamentalsContent: '持续集成（CI）和持续交付/部署（CD）构成了现代 DevOps 流水线的骨干。CI 确保每次代码变更都自动构建和测试，尽早发现缺陷。CD 进一步将经过验证的变更自动部署到预发布或生产环境。',
      buildTestDeploy: '构建、测试、部署流水线',
      buildTestDeployContent: '标准流水线有三个核心阶段。构建阶段编译代码、解析依赖并生成制品。测试阶段运行单元测试、集成测试和代码检查。部署阶段将制品推送到目标环境。每个阶段充当质量门——如果任何阶段失败，流水线停止并通知团队。',
      buildTestDeployExample: '流水线阶段进展：',
      githubActions: 'GitHub Actions 工作流',
      githubActionsContent: 'GitHub Actions 是内置于 GitHub 的 CI/CD 平台。工作流定义在 .github/workflows/ 目录下的 YAML 文件中，由 push、pull_request 或 schedule 等事件触发。核心功能包括用于跨多个操作系统/语言版本测试的矩阵构建、加速构建的缓存、加密密钥管理以及 DRY 流水线定义的可复用工作流。',
      githubActionsExample: 'GitHub Actions 矩阵构建与缓存工作流：',
      gitlabCiCd: 'GitLab CI/CD',
      gitlabCiCdContent: 'GitLab CI/CD 使用仓库根目录的 .gitlab-ci.yml 文件。它提供内置容器注册中心、零配置的 Auto DevOps 流水线、带审查应用的环境管理以及用于复杂依赖管理的 DAG（有向无环图）流水线。GitLab Runner 执行流水线任务，可以是共享的或项目专用的。',
      gitlabCiCdExample: 'GitLab CI/CD 流水线配置：',
      dockerMultiStage: 'Docker 多阶段构建',
      dockerMultiStageContent: '多阶段构建在单个 Dockerfile 中使用多个 FROM 语句。构建阶段包含所有开发依赖和编译器，最终阶段只将编译好的制品复制到最小化基础镜像中。这大幅减小了镜像体积和攻击面。生产环境中始终使用具体版本标签，绝不使用 latest。',
      dockerMultiStageExample: 'Node.js 应用的 Docker 多阶段构建：',
      containerRegistries: '容器注册中心',
      containerRegistriesContent: '容器注册中心存储和分发 Docker 镜像。选项包括 Docker Hub（公共和私有仓库）、GitHub Container Registry（ghcr.io，与 GitHub Actions 集成）、Amazon ECR（与 AWS 服务集成）、Google Artifact Registry 和 Azure Container Registry。根据云提供商和访问控制需求选择。推送到生产注册中心前务必扫描镜像漏洞。',
      terraformBasics: 'Terraform 基础',
      terraformBasicsContent: 'HashiCorp 的 Terraform 是最广泛采用的基础设施即代码工具。它使用 HCL（HashiCorp 配置语言）声明式定义基础设施。核心工作流是 terraform init（初始化提供者）、terraform plan（预览变更）和 terraform apply（执行变更）。状态存储在后端（S3、Azure Blob、GCS）以跟踪资源映射。使用模块实现可复用基础设施组件，使用工作空间进行环境隔离。',
      terraformExample: 'AWS ECS 服务的 Terraform 配置：',
      pulumiIac: 'Pulumi——使用编程语言的基础设施即代码',
      pulumiIacContent: 'Pulumi 采用不同的 IaC 方法，使用真正的编程语言（TypeScript、Python、Go、C#）而非领域特定语言。这让你可以使用循环、条件判断、类型检查、IDE 支持和测试框架。Pulumi 的状态管理类似 Terraform，支持所有主要云提供商。对于偏好用应用语言编写基础设施代码的团队特别有吸引力。',
      pulumiExample: 'TypeScript 编写的 Pulumi 基础设施：',
      blueGreenCanary: '部署策略：蓝绿部署和金丝雀部署',
      blueGreenCanaryContent: '蓝绿部署维护两个相同的生产环境。蓝色是当前线上版本，绿色是新版本。部署并测试绿色环境后，将流量从蓝色切换到绿色。回滚是即时的——只需切换回蓝色。金丝雀部署逐步将少量流量（如 5%）路由到新版本，监控指标，如果一切正常则增加流量。滚动部署逐个更新实例，全程保持可用性。',
      blueGreenExample: 'Kubernetes 蓝绿部署清单：',
      environmentManagement: '环境管理',
      environmentManagementContent: '合理的环境管理至少需要三个层级：开发、预发布和生产。预发布环境在配置、数据结构和基础设施方面应尽可能接近生产环境。使用环境特定的配置文件、用于渐进式发布的功能标志，以及跨环境兼容的数据库迁移策略。永远不要在环境之间共享密钥。',
      secretsManagement: '密钥管理',
      secretsManagementContent: '永远不要将密钥存储在代码、磁盘上的环境变量或流水线配置中。使用专用的密钥管理工具。HashiCorp Vault 提供动态密钥、加密即服务和细粒度访问策略。AWS Secrets Manager 与 IAM 集成进行访问控制，支持自动轮换。对于 Kubernetes，使用 External Secrets Operator 将密钥从 Vault 或云提供商同步到 Kubernetes Secrets。',
      secretsExample: '流水线中的 Vault 集成：',
      monitoringPipelines: '监控流水线',
      monitoringPipelinesContent: '流水线监控超越应用监控。跟踪构建耗时趋势、测试不稳定率、部署频率、变更前置时间、平均恢复时间（MTTR）和变更失败率。这些是衡量 DevOps 绩效的 DORA 指标。使用 Grafana 仪表板、Datadog CI Visibility 或 GitHub Actions/GitLab 的内置分析来可视化流水线健康状况。',
      rollbackStrategies: '回滚策略',
      rollbackStrategiesContent: '每次部署都需要回滚计划。策略包括：回退 Git 提交并重新运行流水线、使用容器镜像标签重新部署上一版本、Kubernetes rollout undo 实现即时回滚、数据库迁移回滚脚本（始终编写向后兼容的迁移）以及功能标志在不重新部署的情况下禁用问题功能。基于健康检查失败和错误率阈值自动化回滚。',
      rollbackExample: 'Kubernetes 回滚命令：',
      gitops: '使用 ArgoCD 和 Flux 的 GitOps',
      gitopsContent: 'GitOps 使用 Git 仓库作为声明式基础设施和应用的唯一事实来源。ArgoCD 和 Flux 是 Kubernetes 原生的 GitOps 操作器，持续协调 Git 中的期望状态与集群中的实际状态。变更通过 Pull Request 进行——不直接执行 kubectl apply。这提供了审计追踪、简便的回滚（git revert）和一致的环境。ArgoCD 提供 Web UI 进行可视化，而 Flux 更轻量和可组合。',
      gitopsExample: 'ArgoCD Application 清单：',
      pipelineSecurity: '流水线安全：SAST、DAST 和依赖扫描',
      pipelineSecurityContent: '将安全左移，集成到流水线中。SAST（静态应用安全测试）在不运行代码的情况下分析源代码漏洞——工具包括 Semgrep、SonarQube 和 CodeQL。DAST（动态应用安全测试）测试运行中的应用漏洞，如 XSS 和 SQL 注入——工具包括 OWASP ZAP 和 Burp Suite。依赖扫描检查第三方包的已知 CVE——工具包括 Snyk、Dependabot 和用于容器镜像的 Trivy。在每个流水线中运行这三项。',
      pipelineSecurityExample: 'GitHub Actions 中的安全扫描：',
      faqTitle: '常见问题',
    },
  },
};

export default function DevopsPipelineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const faqData = [
    {
      question: isZh ? 'CI 和 CD 有什么区别？' : 'What is the difference between CI and CD?',
      answer: isZh
        ? 'CI（持续集成）是指开发者频繁将代码合并到共享主干，每次合并自动触发构建和测试。CD 有两层含义：持续交付（Continuous Delivery）意味着代码变更自动构建、测试并准备好部署到生产环境，但需要手动批准才能发布；持续部署（Continuous Deployment）更进一步，验证通过后自动部署到生产环境，无需人工干预。大多数团队从 CI + 持续交付开始，随着信心增加逐步过渡到持续部署。'
        : 'CI (Continuous Integration) means developers frequently merge code to a shared mainline, with each merge automatically triggering builds and tests. CD has two meanings: Continuous Delivery means code changes are automatically built, tested, and prepared for production release, but require manual approval to deploy; Continuous Deployment goes further by automatically deploying to production after validation, with no human intervention. Most teams start with CI + Continuous Delivery and gradually transition to Continuous Deployment as confidence grows.',
    },
    {
      question: isZh ? 'GitHub Actions 和 GitLab CI/CD 应该怎么选？' : 'How should I choose between GitHub Actions and GitLab CI/CD?',
      answer: isZh
        ? '选择取决于你的代码托管平台和需求。GitHub Actions：如果代码已在 GitHub 上，Actions 是最自然的选择，拥有庞大的 Marketplace 生态、免费的公共仓库额度、与 GitHub 功能深度集成。GitLab CI/CD：如果你需要一体化平台（代码、CI/CD、容器注册中心、安全扫描、项目管理），GitLab 更合适，它的 Auto DevOps 可以零配置启动流水线，内置的审查应用和环境管理也很强大。性能方面两者相当，生态系统上 GitHub Actions 的第三方集成更丰富。'
        : 'The choice depends on your code hosting platform and requirements. GitHub Actions: if your code is already on GitHub, Actions is the most natural choice with a massive Marketplace ecosystem, free minutes for public repos, and deep integration with GitHub features. GitLab CI/CD: if you need an all-in-one platform (code, CI/CD, container registry, security scanning, project management), GitLab is better suited, with Auto DevOps for zero-configuration pipelines and robust review apps and environment management. Performance is comparable; GitHub Actions has a richer third-party integration ecosystem.',
    },
    {
      question: isZh ? 'Docker 多阶段构建为什么重要？' : 'Why are Docker multi-stage builds important?',
      answer: isZh
        ? '多阶段构建解决了镜像体积和安全问题。单阶段构建的镜像包含编译器、开发依赖和构建工具，动辄数百 MB 到数 GB。多阶段构建将构建环境和运行环境分离：第一阶段安装所有依赖并编译，最终阶段只从前一阶段复制编译后的产物到精简基础镜像（如 alpine 或 distroless）。好处包括：镜像体积减少 50-90%、攻击面更小（更少的包 = 更少的漏洞）、拉取和部署更快、构建缓存更高效。'
        : 'Multi-stage builds solve image size and security concerns. Single-stage build images include compilers, dev dependencies, and build tools, often reaching hundreds of MB or several GB. Multi-stage builds separate the build environment from the runtime environment: the first stage installs all dependencies and compiles, the final stage copies only the compiled artifacts from the previous stage into a minimal base image (e.g., alpine or distroless). Benefits include: 50-90% smaller images, reduced attack surface (fewer packages = fewer vulnerabilities), faster pulls and deployments, and more efficient build caching.',
    },
    {
      question: isZh ? 'Terraform 和 Pulumi 有什么区别？' : 'What is the difference between Terraform and Pulumi?',
      answer: isZh
        ? 'Terraform 使用自己的 DSL（HCL），声明式定义基础设施，社区最大、模块生态最丰富，是行业标准。Pulumi 使用通用编程语言（TypeScript、Python、Go、C#），开发者可以用熟悉的语言编写 IaC，支持循环、条件、类型系统和单元测试。选择建议：团队主要是运维或混合角色 → Terraform（学习曲线低、文档多）；团队主要是开发者且偏好代码优先 → Pulumi（语言熟悉、IDE 支持好）。两者都支持多云、状态管理和模块化，迁移成本不高。'
        : 'Terraform uses its own DSL (HCL) to declaratively define infrastructure, has the largest community and richest module ecosystem, and is the industry standard. Pulumi uses general-purpose programming languages (TypeScript, Python, Go, C#), letting developers write IaC in familiar languages with loops, conditionals, type systems, and unit testing. Recommendation: teams that are primarily ops or mixed roles should choose Terraform (lower learning curve, more documentation); teams that are primarily developers preferring code-first should choose Pulumi (language familiarity, better IDE support). Both support multi-cloud, state management, and modularity, and migration cost is modest.',
    },
    {
      question: isZh ? '蓝绿部署和金丝雀部署如何选择？' : 'When should I use blue-green vs canary deployment?',
      answer: isZh
        ? '蓝绿部署：适合需要即时回滚的场景，流量一次性从旧版切到新版，回滚只需切换回去。缺点是需要双倍基础设施资源，且无法部分验证。金丝雀部署：适合需要渐进式验证的场景，先将 1-5% 的流量导向新版本，监控错误率和性能指标，逐步增加流量。缺点是更复杂，需要流量路由能力和指标监控。大型系统推荐金丝雀（风险更低），小型系统蓝绿就够了。滚动部署是折中方案，逐个替换实例，但回滚较慢。'
        : 'Blue-green deployment: ideal when you need instant rollback, traffic switches entirely from old to new in one step, and rollback is just switching back. Downsides are double infrastructure resources and no partial validation. Canary deployment: ideal for gradual validation, routing 1-5% of traffic to the new version first, monitoring error rates and performance metrics, then gradually increasing traffic. Downsides are more complexity, requiring traffic routing capabilities and metrics monitoring. For large systems, canary is recommended (lower risk); for small systems, blue-green is sufficient. Rolling deployment is a middle ground, replacing instances one at a time, but rollback is slower.',
    },
    {
      question: isZh ? '如何在流水线中安全管理密钥？' : 'How should I manage secrets securely in a pipeline?',
      answer: isZh
        ? '密钥管理原则：1) 永远不要在代码或配置文件中硬编码密钥；2) 使用专用工具——HashiCorp Vault（动态密钥、自动轮换、审计日志）、AWS Secrets Manager（IAM 集成、自动轮换）或 Azure Key Vault；3) CI/CD 平台的密钥管理——GitHub Actions Secrets（加密存储，运行时注入）、GitLab CI Variables（Protected/Masked 变量）；4) Kubernetes 场景使用 External Secrets Operator 从 Vault 同步密钥；5) 实施最小权限原则——每个服务只能访问它需要的密钥；6) 定期轮换所有密钥和证书。'
        : 'Secrets management principles: 1) Never hardcode secrets in code or config files; 2) Use dedicated tools — HashiCorp Vault (dynamic secrets, automatic rotation, audit logs), AWS Secrets Manager (IAM integration, automatic rotation), or Azure Key Vault; 3) CI/CD platform secrets — GitHub Actions Secrets (encrypted storage, injected at runtime), GitLab CI Variables (Protected/Masked variables); 4) For Kubernetes, use External Secrets Operator to sync from Vault; 5) Implement least privilege — each service should only access the secrets it needs; 6) Regularly rotate all secrets and certificates.',
    },
    {
      question: isZh ? 'GitOps 和传统 CI/CD 有什么不同？' : 'How does GitOps differ from traditional CI/CD?',
      answer: isZh
        ? '传统 CI/CD 是推模式——流水线构建完成后主动推送部署到集群。GitOps 是拉模式——集群中的操作器（ArgoCD/Flux）持续监控 Git 仓库，发现差异时自动将集群状态同步到 Git 中定义的状态。核心区别：1) Git 是唯一事实来源，所有变更通过 PR 进行；2) 声明式，描述期望状态而非执行步骤；3) 自动漂移检测和修复——有人手动 kubectl 修改后会被自动恢复；4) 完整审计追踪——Git 历史记录了谁在何时做了什么变更。适合 Kubernetes 环境，非 K8s 环境则传统 CI/CD 更实用。'
        : 'Traditional CI/CD uses a push model — the pipeline actively pushes deployments to the cluster after building. GitOps uses a pull model — operators in the cluster (ArgoCD/Flux) continuously monitor the Git repository and automatically sync cluster state to match the state defined in Git when differences are detected. Key differences: 1) Git is the single source of truth, all changes go through PRs; 2) Declarative, describing desired state rather than execution steps; 3) Automatic drift detection and remediation — manual kubectl changes are automatically reverted; 4) Complete audit trail — Git history records who changed what and when. Best suited for Kubernetes environments; traditional CI/CD is more practical for non-K8s environments.',
    },
    {
      question: isZh ? '如何在流水线中实施安全扫描？' : 'How do I implement security scanning in a pipeline?',
      answer: isZh
        ? '安全扫描应覆盖三个层面：1) SAST（静态分析）——在代码提交阶段扫描源代码漏洞，工具如 Semgrep（快速、规则可定制）、SonarQube（全面、支持多语言）、CodeQL（GitHub 原生、深度语义分析）；2) 依赖扫描——检查第三方包的已知 CVE，工具如 Snyk（修复建议好）、Dependabot（GitHub 原生、自动 PR）、npm audit/pip-audit（包管理器内置）；3) DAST（动态分析）——在部署到测试环境后扫描运行中的应用，工具如 OWASP ZAP（开源、CI 友好）。容器镜像用 Trivy 扫描。将扫描作为 PR 检查的必过门槛，高危漏洞阻止合并。'
        : 'Security scanning should cover three layers: 1) SAST (Static Analysis) — scan source code for vulnerabilities at commit time, using tools like Semgrep (fast, customizable rules), SonarQube (comprehensive, multi-language), CodeQL (GitHub-native, deep semantic analysis); 2) Dependency scanning — check third-party packages for known CVEs, using tools like Snyk (good fix suggestions), Dependabot (GitHub-native, auto PRs), npm audit/pip-audit (built into package managers); 3) DAST (Dynamic Analysis) — scan the running application after deploying to a test environment, using tools like OWASP ZAP (open-source, CI-friendly). Scan container images with Trivy. Make scanning a required PR check gate, blocking merges on high-severity vulnerabilities.',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '48rem',
    margin: '0 auto',
    padding: '2rem 1rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1e293b',
    lineHeight: 1.8,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2.2rem',
    fontWeight: 800,
    lineHeight: 1.3,
    marginBottom: '1.5rem',
    color: '#0f172a',
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    color: '#475569',
    marginBottom: '2rem',
    lineHeight: 1.7,
  };

  const tldrBoxStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    borderRadius: '0.5rem',
    padding: '1.25rem 1.5rem',
    marginBottom: '2rem',
    fontSize: '0.97rem',
    lineHeight: 1.75,
  };

  const tldrLabelStyle: React.CSSProperties = {
    fontWeight: 700,
    color: '#0369a1',
    fontSize: '1rem',
    marginBottom: '0.5rem',
  };

  const keyTakeawaysBoxStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '0.5rem',
    padding: '1.25rem 1.5rem',
    marginBottom: '2.5rem',
  };

  const keyTakeawaysLabelStyle: React.CSSProperties = {
    fontWeight: 700,
    color: '#334155',
    fontSize: '1.05rem',
    marginBottom: '0.75rem',
  };

  const takeawayItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    color: '#334155',
  };

  const checkStyle: React.CSSProperties = {
    color: '#22c55e',
    fontWeight: 700,
    marginTop: '0.15rem',
    flexShrink: 0,
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#0f172a',
    marginTop: '2.5rem',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #e2e8f0',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: '#334155',
    marginBottom: '1rem',
    lineHeight: 1.8,
  };

  const codeBlockStyle: React.CSSProperties = {
    background: '#1e293b',
    color: '#e2e8f0',
    borderRadius: '0.5rem',
    padding: '1.25rem',
    overflowX: 'auto',
    fontSize: '0.88rem',
    lineHeight: 1.7,
    marginBottom: '1.5rem',
    fontFamily: '"Fira Code", "JetBrains Mono", Consolas, monospace',
  };

  const codeLabelStyle: React.CSSProperties = {
    fontSize: '0.92rem',
    fontWeight: 600,
    color: '#64748b',
    marginBottom: '0.5rem',
  };

  const faqContainerStyle: React.CSSProperties = {
    marginTop: '2.5rem',
    marginBottom: '2rem',
  };

  const faqTitleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: '1.25rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #e2e8f0',
  };

  const faqItemStyle: React.CSSProperties = {
    marginBottom: '1.25rem',
    padding: '1rem 1.25rem',
    background: '#f8fafc',
    borderRadius: '0.5rem',
    border: '1px solid #e2e8f0',
  };

  const faqQuestionStyle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: '1.02rem',
    color: '#1e293b',
    marginBottom: '0.5rem',
  };

  const faqAnswerStyle: React.CSSProperties = {
    fontSize: '0.95rem',
    color: '#475569',
    lineHeight: 1.75,
  };

  return (
    <div style={containerStyle}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <h1 style={titleStyle}>{t.title}</h1>
      <p style={descriptionStyle}>{t.description}</p>

      {/* TL;DR Box */}
      <div style={tldrBoxStyle}>
        <div style={tldrLabelStyle}>TL;DR</div>
        <div>{t.tldr}</div>
      </div>

      {/* Key Takeaways Box */}
      <div style={keyTakeawaysBoxStyle}>
        <div style={keyTakeawaysLabelStyle}>{isZh ? '核心要点' : 'Key Takeaways'}</div>
        {t.keyTakeaways.map((item, i) => (
          <div key={i} style={takeawayItemStyle}>
            <span style={checkStyle}>{'>'}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* CI/CD Fundamentals */}
      <h2 style={sectionTitleStyle}>{t.sections.cicdFundamentals}</h2>
      <p style={paragraphStyle}>{t.sections.cicdFundamentalsContent}</p>

      <h3 style={{ ...sectionTitleStyle, fontSize: '1.25rem', borderBottom: '1px solid #e2e8f0' }}>{t.sections.buildTestDeploy}</h3>
      <p style={paragraphStyle}>{t.sections.buildTestDeployContent}</p>
      <div style={codeLabelStyle}>{t.sections.buildTestDeployExample}</div>
      <pre style={codeBlockStyle}><code>{
        '# Typical CI/CD Pipeline Stages\n' +
        '#\n' +
        '# 1. Source     - Code commit triggers pipeline\n' +
        '# 2. Build      - Compile code, install dependencies\n' +
        '# 3. Test       - Unit tests, integration tests, linting\n' +
        '# 4. Security   - SAST, dependency scanning\n' +
        '# 5. Package    - Build Docker image, push to registry\n' +
        '# 6. Deploy     - Deploy to staging environment\n' +
        '# 7. Verify     - Smoke tests, health checks\n' +
        '# 8. Promote    - Deploy to production (manual gate or auto)\n' +
        '# 9. Monitor    - Track metrics, error rates, performance\n' +
        '\n' +
        '# Each stage acts as a quality gate:\n' +
        '# If tests fail  -> pipeline stops, team notified\n' +
        '# If scan finds critical CVE -> pipeline blocks merge\n' +
        '# If health check fails -> automatic rollback'
      }</code></pre>

      {/* GitHub Actions */}
      <h2 style={sectionTitleStyle}>{t.sections.githubActions}</h2>
      <p style={paragraphStyle}>{t.sections.githubActionsContent}</p>
      <div style={codeLabelStyle}>{t.sections.githubActionsExample}</div>
      <pre style={codeBlockStyle}><code>{
        '# .github/workflows/ci.yml\n' +
        'name: CI Pipeline\n' +
        'on:\n' +
        '  push:\n' +
        '    branches: [main]\n' +
        '  pull_request:\n' +
        '    branches: [main]\n' +
        '\n' +
        'jobs:\n' +
        '  test:\n' +
        '    runs-on: ubuntu-latest\n' +
        '    strategy:\n' +
        '      matrix:\n' +
        '        node-version: [18, 20, 22]\n' +
        '    steps:\n' +
        '      - uses: actions/checkout@v4\n' +
        '      - uses: actions/setup-node@v4\n' +
        '        with:\n' +
        '          node-version: \\${{ matrix.node-version }}\n' +
        '          cache: "npm"\n' +
        '      - run: npm ci\n' +
        '      - run: npm test\n' +
        '      - run: npm run lint\n' +
        '\n' +
        '  build-and-push:\n' +
        '    needs: test\n' +
        '    runs-on: ubuntu-latest\n' +
        '    if: github.ref == \'refs/heads/main\'\n' +
        '    steps:\n' +
        '      - uses: actions/checkout@v4\n' +
        '      - uses: docker/setup-buildx-action@v3\n' +
        '      - uses: docker/login-action@v3\n' +
        '        with:\n' +
        '          registry: ghcr.io\n' +
        '          username: \\${{ github.actor }}\n' +
        '          password: \\${{ secrets.GITHUB_TOKEN }}\n' +
        '      - uses: docker/build-push-action@v5\n' +
        '        with:\n' +
        '          push: true\n' +
        '          tags: ghcr.io/\\${{ github.repository }}:latest\n' +
        '          cache-from: type=gha\n' +
        '          cache-to: type=gha,mode=max'
      }</code></pre>

      {/* GitLab CI/CD */}
      <h2 style={sectionTitleStyle}>{t.sections.gitlabCiCd}</h2>
      <p style={paragraphStyle}>{t.sections.gitlabCiCdContent}</p>
      <div style={codeLabelStyle}>{t.sections.gitlabCiCdExample}</div>
      <pre style={codeBlockStyle}><code>{
        '# .gitlab-ci.yml\n' +
        'stages:\n' +
        '  - test\n' +
        '  - build\n' +
        '  - deploy\n' +
        '\n' +
        'variables:\n' +
        '  DOCKER_IMAGE: \\$CI_REGISTRY_IMAGE:\\$CI_COMMIT_SHA\n' +
        '\n' +
        'test:\n' +
        '  stage: test\n' +
        '  image: node:20-alpine\n' +
        '  cache:\n' +
        '    key: \\$CI_COMMIT_REF_SLUG\n' +
        '    paths:\n' +
        '      - node_modules/\n' +
        '  script:\n' +
        '    - npm ci\n' +
        '    - npm test\n' +
        '    - npm run lint\n' +
        '  artifacts:\n' +
        '    reports:\n' +
        '      junit: test-results.xml\n' +
        '\n' +
        'build:\n' +
        '  stage: build\n' +
        '  image: docker:24\n' +
        '  services:\n' +
        '    - docker:24-dind\n' +
        '  script:\n' +
        '    - docker login -u \\$CI_REGISTRY_USER -p \\$CI_REGISTRY_PASSWORD \\$CI_REGISTRY\n' +
        '    - docker build -t \\$DOCKER_IMAGE .\n' +
        '    - docker push \\$DOCKER_IMAGE\n' +
        '\n' +
        'deploy_staging:\n' +
        '  stage: deploy\n' +
        '  environment:\n' +
        '    name: staging\n' +
        '    url: https://staging.example.com\n' +
        '  script:\n' +
        '    - kubectl set image deployment/app app=\\$DOCKER_IMAGE\n' +
        '  only:\n' +
        '    - main'
      }</code></pre>

      {/* Docker Multi-Stage Builds */}
      <h2 style={sectionTitleStyle}>{t.sections.dockerMultiStage}</h2>
      <p style={paragraphStyle}>{t.sections.dockerMultiStageContent}</p>
      <div style={codeLabelStyle}>{t.sections.dockerMultiStageExample}</div>
      <pre style={codeBlockStyle}><code>{
        '# Dockerfile — Multi-stage build\n' +
        '\n' +
        '# Stage 1: Build\n' +
        'FROM node:20-alpine AS builder\n' +
        'WORKDIR /app\n' +
        'COPY package*.json ./\n' +
        'RUN npm ci --only=production && \\\n' +
        '    cp -R node_modules /prod_modules && \\\n' +
        '    npm ci\n' +
        'COPY . .\n' +
        'RUN npm run build\n' +
        '\n' +
        '# Stage 2: Production\n' +
        'FROM node:20-alpine AS production\n' +
        'WORKDIR /app\n' +
        'RUN addgroup -g 1001 appgroup && \\\n' +
        '    adduser -u 1001 -G appgroup -s /bin/sh -D appuser\n' +
        'COPY --from=builder /prod_modules ./node_modules\n' +
        'COPY --from=builder /app/dist ./dist\n' +
        'COPY --from=builder /app/package.json ./\n' +
        'USER appuser\n' +
        'EXPOSE 3000\n' +
        'HEALTHCHECK --interval=30s --timeout=3s \\\n' +
        '  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1\n' +
        'CMD ["node", "dist/server.js"]\n' +
        '\n' +
        '# Result: ~150MB instead of ~1.2GB\n' +
        '# No dev dependencies, no source code, non-root user'
      }</code></pre>

      {/* Container Registries */}
      <h3 style={{ ...sectionTitleStyle, fontSize: '1.25rem', borderBottom: '1px solid #e2e8f0' }}>{t.sections.containerRegistries}</h3>
      <p style={paragraphStyle}>{t.sections.containerRegistriesContent}</p>

      {/* Terraform */}
      <h2 style={sectionTitleStyle}>{t.sections.terraformBasics}</h2>
      <p style={paragraphStyle}>{t.sections.terraformBasicsContent}</p>
      <div style={codeLabelStyle}>{t.sections.terraformExample}</div>
      <pre style={codeBlockStyle}><code>{
        '# main.tf — Terraform AWS ECS Service\n' +
        '\n' +
        'terraform {\n' +
        '  required_version = ">= 1.7"\n' +
        '  backend "s3" {\n' +
        '    bucket = "myapp-terraform-state"\n' +
        '    key    = "prod/terraform.tfstate"\n' +
        '    region = "us-east-1"\n' +
        '  }\n' +
        '}\n' +
        '\n' +
        'provider "aws" {\n' +
        '  region = var.aws_region\n' +
        '}\n' +
        '\n' +
        'resource "aws_ecs_cluster" "main" {\n' +
        '  name = "\\${var.project}-\\${var.environment}"\n' +
        '  setting {\n' +
        '    name  = "containerInsights"\n' +
        '    value = "enabled"\n' +
        '  }\n' +
        '}\n' +
        '\n' +
        'resource "aws_ecs_service" "app" {\n' +
        '  name            = "\\${var.project}-svc"\n' +
        '  cluster         = aws_ecs_cluster.main.id\n' +
        '  task_definition = aws_ecs_task_definition.app.arn\n' +
        '  desired_count   = var.app_count\n' +
        '  launch_type     = "FARGATE"\n' +
        '\n' +
        '  network_configuration {\n' +
        '    subnets         = var.private_subnets\n' +
        '    security_groups = [aws_security_group.ecs.id]\n' +
        '  }\n' +
        '\n' +
        '  load_balancer {\n' +
        '    target_group_arn = aws_lb_target_group.app.arn\n' +
        '    container_name   = var.project\n' +
        '    container_port   = 3000\n' +
        '  }\n' +
        '}\n' +
        '\n' +
        '# terraform init  -> download providers\n' +
        '# terraform plan  -> preview changes\n' +
        '# terraform apply -> execute changes'
      }</code></pre>

      {/* Pulumi */}
      <h2 style={sectionTitleStyle}>{t.sections.pulumiIac}</h2>
      <p style={paragraphStyle}>{t.sections.pulumiIacContent}</p>
      <div style={codeLabelStyle}>{t.sections.pulumiExample}</div>
      <pre style={codeBlockStyle}><code>{
        '// index.ts — Pulumi AWS ECS with TypeScript\n' +
        'import * as pulumi from "@pulumi/pulumi";\n' +
        'import * as aws from "@pulumi/aws";\n' +
        'import * as awsx from "@pulumi/awsx";\n' +
        '\n' +
        'const config = new pulumi.Config();\n' +
        'const environment = config.require("environment");\n' +
        'const desiredCount = config.getNumber("desiredCount") || 2;\n' +
        '\n' +
        '// Create a VPC with best-practice defaults\n' +
        'const vpc = new awsx.ec2.Vpc("app-vpc", {\n' +
        '  numberOfAvailabilityZones: 2,\n' +
        '  natGateways: { strategy: "Single" },\n' +
        '});\n' +
        '\n' +
        '// Create an ECS cluster\n' +
        'const cluster = new aws.ecs.Cluster("app-cluster", {\n' +
        '  settings: [{\n' +
        '    name: "containerInsights",\n' +
        '    value: "enabled",\n' +
        '  }],\n' +
        '});\n' +
        '\n' +
        '// Build and publish Docker image\n' +
        'const image = new awsx.ecs.Image("app-image", {\n' +
        '  repositoryUrl: repo.url,\n' +
        '  context: "./app",\n' +
        '  platform: "linux/amd64",\n' +
        '});\n' +
        '\n' +
        '// Create Fargate service with ALB\n' +
        'const service = new awsx.ecs.FargateService("app-svc", {\n' +
        '  cluster: cluster.arn,\n' +
        '  desiredCount: desiredCount,\n' +
        '  taskDefinitionArgs: {\n' +
        '    container: {\n' +
        '      image: image.imageUri,\n' +
        '      cpu: 256,\n' +
        '      memory: 512,\n' +
        '      portMappings: [{ containerPort: 3000 }],\n' +
        '    },\n' +
        '  },\n' +
        '});\n' +
        '\n' +
        'export const url = service.loadBalancer?.endpoint;'
      }</code></pre>

      {/* Blue-Green and Canary */}
      <h2 style={sectionTitleStyle}>{t.sections.blueGreenCanary}</h2>
      <p style={paragraphStyle}>{t.sections.blueGreenCanaryContent}</p>
      <div style={codeLabelStyle}>{t.sections.blueGreenExample}</div>
      <pre style={codeBlockStyle}><code>{
        '# Blue-Green Deployment with Kubernetes\n' +
        '\n' +
        '# Step 1: Deploy green (new version) alongside blue (current)\n' +
        'apiVersion: apps/v1\n' +
        'kind: Deployment\n' +
        'metadata:\n' +
        '  name: app-green\n' +
        '  labels:\n' +
        '    app: myapp\n' +
        '    version: green\n' +
        'spec:\n' +
        '  replicas: 3\n' +
        '  selector:\n' +
        '    matchLabels:\n' +
        '      app: myapp\n' +
        '      version: green\n' +
        '  template:\n' +
        '    metadata:\n' +
        '      labels:\n' +
        '        app: myapp\n' +
        '        version: green\n' +
        '    spec:\n' +
        '      containers:\n' +
        '        - name: app\n' +
        '          image: myapp:2.0.0\n' +
        '          ports:\n' +
        '            - containerPort: 3000\n' +
        '          readinessProbe:\n' +
        '            httpGet:\n' +
        '              path: /health\n' +
        '              port: 3000\n' +
        '            initialDelaySeconds: 5\n' +
        '            periodSeconds: 10\n' +
        '---\n' +
        '# Step 2: Switch service selector to green\n' +
        'apiVersion: v1\n' +
        'kind: Service\n' +
        'metadata:\n' +
        '  name: app-service\n' +
        'spec:\n' +
        '  selector:\n' +
        '    app: myapp\n' +
        '    version: green  # Change from "blue" to "green"\n' +
        '  ports:\n' +
        '    - port: 80\n' +
        '      targetPort: 3000'
      }</code></pre>

      {/* Environment Management */}
      <h2 style={sectionTitleStyle}>{t.sections.environmentManagement}</h2>
      <p style={paragraphStyle}>{t.sections.environmentManagementContent}</p>

      {/* Secrets Management */}
      <h2 style={sectionTitleStyle}>{t.sections.secretsManagement}</h2>
      <p style={paragraphStyle}>{t.sections.secretsManagementContent}</p>
      <div style={codeLabelStyle}>{t.sections.secretsExample}</div>
      <pre style={codeBlockStyle}><code>{
        '# Vault integration in GitHub Actions\n' +
        'jobs:\n' +
        '  deploy:\n' +
        '    runs-on: ubuntu-latest\n' +
        '    steps:\n' +
        '      - name: Import Secrets from Vault\n' +
        '        uses: hashicorp/vault-action@v3\n' +
        '        with:\n' +
        '          url: https://vault.example.com\n' +
        '          method: jwt\n' +
        '          role: github-deploy\n' +
        '          secrets: |\n' +
        '            secret/data/prod/db DB_PASSWORD ;\n' +
        '            secret/data/prod/api API_KEY\n' +
        '\n' +
        '      - name: Deploy with secrets\n' +
        '        run: |\n' +
        '          echo "Deploying with injected secrets..."\n' +
        '          # Secrets are available as env vars\n' +
        '          # DB_PASSWORD and API_KEY injected by vault-action\n' +
        '          helm upgrade app ./chart \\\n' +
        '            --set db.password=\\$DB_PASSWORD \\\n' +
        '            --set api.key=\\$API_KEY\n' +
        '\n' +
        '# External Secrets Operator for Kubernetes\n' +
        'apiVersion: external-secrets.io/v1beta1\n' +
        'kind: ExternalSecret\n' +
        'metadata:\n' +
        '  name: app-secrets\n' +
        'spec:\n' +
        '  refreshInterval: 1h\n' +
        '  secretStoreRef:\n' +
        '    name: vault-backend\n' +
        '    kind: ClusterSecretStore\n' +
        '  target:\n' +
        '    name: app-secrets\n' +
        '  data:\n' +
        '    - secretKey: db-password\n' +
        '      remoteRef:\n' +
        '        key: secret/data/prod/db\n' +
        '        property: password'
      }</code></pre>

      {/* Monitoring Pipelines */}
      <h2 style={sectionTitleStyle}>{t.sections.monitoringPipelines}</h2>
      <p style={paragraphStyle}>{t.sections.monitoringPipelinesContent}</p>

      {/* Rollback Strategies */}
      <h2 style={sectionTitleStyle}>{t.sections.rollbackStrategies}</h2>
      <p style={paragraphStyle}>{t.sections.rollbackStrategiesContent}</p>
      <div style={codeLabelStyle}>{t.sections.rollbackExample}</div>
      <pre style={codeBlockStyle}><code>{
        '# Kubernetes rollback commands\n' +
        '\n' +
        '# View rollout history\n' +
        'kubectl rollout history deployment/app\n' +
        '\n' +
        '# Rollback to previous version\n' +
        'kubectl rollout undo deployment/app\n' +
        '\n' +
        '# Rollback to specific revision\n' +
        'kubectl rollout undo deployment/app --to-revision=3\n' +
        '\n' +
        '# Check rollout status\n' +
        'kubectl rollout status deployment/app\n' +
        '\n' +
        '# -------------------------------------------\n' +
        '# Automated rollback with health checks\n' +
        '# -------------------------------------------\n' +
        '\n' +
        '# deploy.sh\n' +
        '#!/bin/bash\n' +
        'set -e\n' +
        '\n' +
        'DEPLOY_NAME="app"\n' +
        'NAMESPACE="production"\n' +
        'TIMEOUT="300s"\n' +
        '\n' +
        '# Apply new deployment\n' +
        'kubectl apply -f deployment.yaml -n \\$NAMESPACE\n' +
        '\n' +
        '# Wait for rollout with timeout\n' +
        'if ! kubectl rollout status deployment/\\$DEPLOY_NAME \\\n' +
        '    -n \\$NAMESPACE --timeout=\\$TIMEOUT; then\n' +
        '  echo "Rollout failed! Initiating rollback..."\n' +
        '  kubectl rollout undo deployment/\\$DEPLOY_NAME -n \\$NAMESPACE\n' +
        '  kubectl rollout status deployment/\\$DEPLOY_NAME -n \\$NAMESPACE\n' +
        '  echo "Rollback complete."\n' +
        '  exit 1\n' +
        'fi\n' +
        '\n' +
        'echo "Deployment successful!"'
      }</code></pre>

      {/* GitOps */}
      <h2 style={sectionTitleStyle}>{t.sections.gitops}</h2>
      <p style={paragraphStyle}>{t.sections.gitopsContent}</p>
      <div style={codeLabelStyle}>{t.sections.gitopsExample}</div>
      <pre style={codeBlockStyle}><code>{
        '# ArgoCD Application manifest\n' +
        'apiVersion: argoproj.io/v1alpha1\n' +
        'kind: Application\n' +
        'metadata:\n' +
        '  name: myapp-production\n' +
        '  namespace: argocd\n' +
        'spec:\n' +
        '  project: default\n' +
        '  source:\n' +
        '    repoURL: https://github.com/org/k8s-manifests.git\n' +
        '    targetRevision: main\n' +
        '    path: environments/production\n' +
        '  destination:\n' +
        '    server: https://kubernetes.default.svc\n' +
        '    namespace: production\n' +
        '  syncPolicy:\n' +
        '    automated:\n' +
        '      prune: true      # Delete resources removed from Git\n' +
        '      selfHeal: true   # Revert manual cluster changes\n' +
        '    syncOptions:\n' +
        '      - CreateNamespace=true\n' +
        '    retry:\n' +
        '      limit: 3\n' +
        '      backoff:\n' +
        '        duration: 5s\n' +
        '        factor: 2\n' +
        '        maxDuration: 3m\n' +
        '\n' +
        '# Flux Kustomization\n' +
        'apiVersion: kustomize.toolkit.fluxcd.io/v1\n' +
        'kind: Kustomization\n' +
        'metadata:\n' +
        '  name: myapp\n' +
        '  namespace: flux-system\n' +
        'spec:\n' +
        '  interval: 5m\n' +
        '  path: ./environments/production\n' +
        '  prune: true\n' +
        '  sourceRef:\n' +
        '    kind: GitRepository\n' +
        '    name: k8s-manifests\n' +
        '  healthChecks:\n' +
        '    - apiVersion: apps/v1\n' +
        '      kind: Deployment\n' +
        '      name: myapp\n' +
        '      namespace: production'
      }</code></pre>

      {/* Pipeline Security */}
      <h2 style={sectionTitleStyle}>{t.sections.pipelineSecurity}</h2>
      <p style={paragraphStyle}>{t.sections.pipelineSecurityContent}</p>
      <div style={codeLabelStyle}>{t.sections.pipelineSecurityExample}</div>
      <pre style={codeBlockStyle}><code>{
        '# Security scanning in GitHub Actions\n' +
        'name: Security Pipeline\n' +
        'on: [push, pull_request]\n' +
        '\n' +
        'jobs:\n' +
        '  sast:\n' +
        '    name: Static Analysis (SAST)\n' +
        '    runs-on: ubuntu-latest\n' +
        '    steps:\n' +
        '      - uses: actions/checkout@v4\n' +
        '      - name: Run Semgrep\n' +
        '        uses: returntocorp/semgrep-action@v1\n' +
        '        with:\n' +
        '          config: >-\n' +
        '            p/security-audit\n' +
        '            p/owasp-top-ten\n' +
        '            p/nodejs\n' +
        '\n' +
        '  dependency-scan:\n' +
        '    name: Dependency Scanning\n' +
        '    runs-on: ubuntu-latest\n' +
        '    steps:\n' +
        '      - uses: actions/checkout@v4\n' +
        '      - name: Run Snyk\n' +
        '        uses: snyk/actions/node@master\n' +
        '        env:\n' +
        '          SNYK_TOKEN: \\${{ secrets.SNYK_TOKEN }}\n' +
        '        with:\n' +
        '          args: --severity-threshold=high\n' +
        '\n' +
        '  container-scan:\n' +
        '    name: Container Image Scan\n' +
        '    runs-on: ubuntu-latest\n' +
        '    needs: [sast]\n' +
        '    steps:\n' +
        '      - uses: actions/checkout@v4\n' +
        '      - name: Build image\n' +
        '        run: docker build -t myapp:scan .\n' +
        '      - name: Run Trivy\n' +
        '        uses: aquasecurity/trivy-action@master\n' +
        '        with:\n' +
        '          image-ref: myapp:scan\n' +
        '          format: table\n' +
        '          exit-code: 1\n' +
        '          severity: CRITICAL,HIGH\n' +
        '\n' +
        '  dast:\n' +
        '    name: Dynamic Analysis (DAST)\n' +
        '    runs-on: ubuntu-latest\n' +
        '    needs: [container-scan]\n' +
        '    steps:\n' +
        '      - name: Deploy to test environment\n' +
        '        run: |\n' +
        '          docker run -d -p 3000:3000 myapp:scan\n' +
        '          sleep 10\n' +
        '      - name: OWASP ZAP Baseline Scan\n' +
        '        uses: zaproxy/action-baseline@v0.12.0\n' +
        '        with:\n' +
        '          target: http://localhost:3000'
      }</code></pre>

      {/* FAQ Section */}
      <div style={faqContainerStyle}>
        <h2 style={faqTitleStyle}>{t.sections.faqTitle}</h2>
        {faqData.map((item, i) => (
          <div key={i} style={faqItemStyle}>
            <div style={faqQuestionStyle}>{item.question}</div>
            <div style={faqAnswerStyle}>{item.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
