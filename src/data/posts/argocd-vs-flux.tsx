'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'ArgoCD vs Flux: GitOps Tool Comparison',
    intro: 'GitOps has revolutionized Kubernetes deployments, and ArgoCD and Flux are the two leading tools. This comprehensive comparison examines architecture, features, user experience, and enterprise capabilities to help you choose the right GitOps solution.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'ArgoCD offers a rich UI, visual sync status, and is easier for beginners. Flux provides lighter architecture, multi-tenancy, and better CLI experience. For teams new to GitOps in 2025, ArgoCD is recommended. For advanced users and large-scale deployments, Flux with its modular architecture is excellent.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Both are CNCF graduated projects with strong community support',
    takeaway2: 'ArgoCD has superior UI/UX for visual learners',
    takeaway3: 'Flux is more lightweight and modular',
    takeaway4: 'ArgoCD uses Application CRD; Flux uses Kustomization/HelmRelease',
    takeaway5: 'Both support multi-cluster and multi-tenant deployments',
    takeaway6: 'ArgoCD has built-in Image Updater; Flux integrates with Image Automation',
    
    whatIsArgoCDTitle: 'What is ArgoCD?',
    whatIsArgoCDContent: 'ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes. It provides a web-based UI, CLI, and API for managing application deployments. ArgoCD continuously monitors Git repositories and syncs the live state with the desired state defined in Git.',
    
    whatIsFluxTitle: 'What is Flux?',
    whatIsFluxContent: 'Flux is a set of continuous and progressive delivery solutions for Kubernetes that are open and extensible. Developed by Weaveworks and now part of CNCF, Flux follows the GitOps methodology with a focus on security, multi-tenancy, and integration with existing tools.',
    
    architectureTitle: 'Architecture Comparison',
    architectureIntro: 'Different approaches to GitOps:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Side-by-side feature comparison:',
    
    uiTitle: 'User Interface',
    uiIntro: 'Visual management capabilities:',
    
    deploymentTitle: 'Deployment Methods',
    deploymentIntro: 'How applications are deployed:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Defining applications in each tool:',
    
    argoCDExampleTitle: 'ArgoCD Application',
    fluxExampleTitle: 'Flux Kustomization',
    
    multiTenancyTitle: 'Multi-Tenancy',
    multiTenancyIntro: 'Supporting multiple teams:',
    
    securityTitle: 'Security Features',
    securityIntro: 'Built-in security capabilities:',
    
    whenToUseTitle: 'When to Use Each',
    argoCDBestFor: 'Use ArgoCD When:',
    fluxBestFor: 'Use Flux When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both ArgoCD and Flux are excellent GitOps tools. ArgoCD excels with its intuitive UI, making it ideal for teams adopting GitOps and those who prefer visual management. Flux offers a more lightweight, modular approach suitable for advanced users and large-scale multi-tenant environments. Choose ArgoCD for ease of use and visualization; choose Flux for flexibility and CLI-centric workflows.',
    
    faq1q: 'Can ArgoCD and Flux coexist in the same cluster?',
    faq1a: 'Yes, they can coexist. Some organizations use ArgoCD for application deployments and Flux for cluster infrastructure. However, ensure they manage different namespaces to avoid conflicts.',
    
    faq2q: 'Which has better Helm support?',
    faq2a: 'Both have excellent Helm support. ArgoCD natively renders Helm charts before applying. Flux uses HelmRelease CRD with advanced features like Helm test hooks and rollback on failure.',
    
    faq3q: 'How do they handle secrets?',
    faq3a: 'ArgoCD integrates with sealed-secrets, vault, and SOPS. Flux has native sealed-secrets support and Mozilla SOPS integration. Both recommend not storing plain secrets in Git.',
    
    faq4q: 'What about rollback capabilities?',
    faq4a: 'ArgoCD has built-in rollback via UI and CLI with history tracking. Flux relies on Git revert and provides automated rollbacks through its image automation features.',
    
    faq5q: 'Which is better for multi-cluster?',
    faq5a: 'Both support multi-cluster well. ArgoCD uses ApplicationSets for multi-cluster deployments. Flux v2 has native multi-cluster support with cluster API integration.',
    
    faq6q: 'How resource-intensive are they?',
    faq6a: 'Flux is generally lighter on resources. ArgoCD requires more memory due to its UI and Redis cache. For resource-constrained environments, Flux is more efficient.',
    
    faq7q: 'Do they support progressive delivery?',
    faq7a: 'ArgoCD has Argo Rollouts for canary/blue-green deployments. Flux integrates with Flagger for progressive delivery. Both require additional components for advanced strategies.',
    
    faq8q: 'What is the learning curve?',
    faq8a: 'ArgoCD is easier for beginners due to its UI and intuitive concepts. Flux has a steeper initial curve but offers more flexibility. Plan 1-2 weeks for ArgoCD proficiency, 2-3 weeks for Flux.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'ArgoCD vs Flux：GitOps 工具对比',
    intro: 'GitOps 彻底改变了 Kubernetes 部署，ArgoCD 和 Flux 是两个领先的工具。本全面比较考察架构、功能、用户体验和企业能力，帮助您选择合适的 GitOps 解决方案。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'ArgoCD 提供丰富的 UI、可视化同步状态，对初学者更友好。Flux 提供更轻量的架构、多租户支持和更好的 CLI 体验。对于 2025 年 GitOps 新手团队，推荐 ArgoCD。对于高级用户和大规模部署，Flux 及其模块化架构非常出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: '两者都是 CNCF 毕业项目，有强大的社区支持',
    takeaway2: 'ArgoCD 为视觉学习者提供卓越的 UI/UX',
    takeaway3: 'Flux 更轻量且模块化',
    takeaway4: 'ArgoCD 使用 Application CRD；Flux 使用 Kustomization/HelmRelease',
    takeaway5: '两者都支持多集群和多租户部署',
    takeaway6: 'ArgoCD 有内置镜像更新器；Flux 集成镜像自动化',
    
    whatIsArgoCDTitle: '什么是 ArgoCD？',
    whatIsArgoCDContent: 'ArgoCD 是一个用于 Kubernetes 的声明式 GitOps 持续交付工具。它提供基于 Web 的 UI、CLI 和 API 来管理应用部署。ArgoCD 持续监控 Git 仓库，并将实时状态与 Git 中定义的期望状态同步。',
    
    whatIsFluxTitle: '什么是 Flux？',
    whatIsFluxContent: 'Flux 是一套用于 Kubernetes 的开放和可扩展的持续和渐进交付解决方案。由 Weaveworks 开发，现在是 CNCF 的一部分，Flux 遵循 GitOps 方法论，专注于安全性、多租户和与现有工具的集成。',
    
    architectureTitle: '架构对比',
    architectureIntro: '不同的 GitOps 方法：',
    
    featuresTitle: '功能对比',
    featuresIntro: '并列功能比较：',
    
    uiTitle: '用户界面',
    uiIntro: '可视化管理能力：',
    
    deploymentTitle: '部署方法',
    deploymentIntro: '应用如何部署：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '在每个工具中定义应用：',
    
    argoCDExampleTitle: 'ArgoCD Application',
    fluxExampleTitle: 'Flux Kustomization',
    
    multiTenancyTitle: '多租户',
    multiTenancyIntro: '支持多个团队：',
    
    securityTitle: '安全特性',
    securityIntro: '内置安全能力：',
    
    whenToUseTitle: '何时使用',
    argoCDBestFor: '使用 ArgoCD 的场景：',
    fluxBestFor: '使用 Flux 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在 2025 年，ArgoCD 和 Flux 都是优秀的 GitOps 工具。ArgoCD 以其直观的 UI 脱颖而出，非常适合采用 GitOps 的团队和喜欢可视化管理的人。Flux 提供更轻量、模块化的方法，适合高级用户和大规模多租户环境。选择 ArgoCD 以获得易用性和可视化；选择 Flux 以获得灵活性和以 CLI 为中心的工作流程。',
    
    faq1q: 'ArgoCD 和 Flux 可以在同一集群中共存吗？',
    faq1a: '是的，它们可以共存。一些组织使用 ArgoCD 进行应用部署，使用 Flux 管理集群基础设施。但是，确保它们管理不同的命名空间以避免冲突。',
    
    faq2q: '哪个对 Helm 支持更好？',
    faq2a: '两者都有出色的 Helm 支持。ArgoCD 在应用之前原生渲染 Helm charts。Flux 使用 HelmRelease CRD，具有 Helm 测试钩子和失败时回滚等高级功能。',
    
    faq3q: '它们如何处理密钥？',
    faq3a: 'ArgoCD 与 sealed-secrets、vault 和 SOPS 集成。Flux 原生支持 sealed-secrets 和 Mozilla SOPS 集成。两者都建议不要在 Git 中存储明文密钥。',
    
    faq4q: '回滚能力如何？',
    faq4a: 'ArgoCD 通过 UI 和 CLI 内置回滚功能，带有历史跟踪。Flux 依赖 Git revert，并通过其镜像自动化功能提供自动回滚。',
    
    faq5q: '哪个更适合多集群？',
    faq5a: '两者都很好地支持多集群。ArgoCD 使用 ApplicationSets 进行多集群部署。Flux v2 通过集群 API 集成具有原生多集群支持。',
    
    faq6q: '它们的资源消耗如何？',
    faq6a: 'Flux 通常资源消耗更少。ArgoCD 由于其 UI 和 Redis 缓存需要更多内存。对于资源受限的环境，Flux 更高效。',
    
    faq7q: '它们支持渐进式交付吗？',
    faq7a: 'ArgoCD 有 Argo Rollouts 用于金丝雀/蓝绿部署。Flux 与 Flagger 集成进行渐进式交付。两者都需要额外的组件来实现高级策略。',
    
    faq8q: '学习曲线如何？',
    faq8a: 'ArgoCD 对初学者更容易，因为它的 UI 和直观的概念。Flux 有更陡的初始曲线，但提供更多灵活性。计划 ArgoCD 1-2 周，Flux 2-3 周达到熟练。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ArgoCDVsFlux({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

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

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      <h2 style={h2Style}>{ct.takeawaysTitle}</h2>
      <div style={{ ...boxStyle, borderLeft: '4px solid #22c55e' }}>
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{ct.takeaway1}</li>
          <li>{ct.takeaway2}</li>
          <li>{ct.takeaway3}</li>
          <li>{ct.takeaway4}</li>
          <li>{ct.takeaway5}</li>
          <li>{ct.takeaway6}</li>
        </ul>
      </div>

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>
      
      <h3 style={h3Style}>{ct.whatIsArgoCDTitle}</h3>
      <p style={pStyle}>{ct.whatIsArgoCDContent}</p>

      <h3 style={h3Style}>{ct.whatIsFluxTitle}</h3>
      <p style={pStyle}>{ct.whatIsFluxContent}</p>

      <h2 style={h2Style}>{ct.architectureTitle}</h2>
      <p style={pStyle}>{ct.architectureIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>ArgoCD</th>
              <th style={thStyle}>Flux</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心组件' : 'Core Components', 'Single controller', 'Multiple controllers'],
              [isZh ? '数据存储' : 'Data Store', 'etcd + Redis', 'Kubernetes API'],
              [isZh ? '状态管理' : 'State Management', 'Application CRD', 'Kustomization/HelmRelease'],
              [isZh ? 'UI' : 'Web UI', 'Built-in rich UI', isZh ? '无原生UI' : 'No native UI'],
              [isZh ? 'CLI体验' : 'CLI Experience', 'argocd CLI', 'flux CLI'],
              [isZh ? '配置方式' : 'Configuration', 'CRD-based', 'CRD-based'],
              [isZh ? '资源消耗' : 'Resource Usage', isZh ? '较高' : 'Higher', isZh ? '较低' : 'Lower'],
              [isZh ? '模块化' : 'Modularity', isZh ? '一体化' : 'Monolithic', isZh ? '高度模块化' : 'Highly modular'],
            ].map(([feature, argocd, flux], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{argocd}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{flux}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>ArgoCD</th>
              <th style={thStyle}>Flux</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Git仓库支持' : 'Git Repo Support', 'Multiple sources', 'Multiple sources'],
              [isZh ? 'Helm支持' : 'Helm Support', '✓ Native', '✓ HelmRelease'],
              [isZh ? 'Kustomize支持' : 'Kustomize Support', '✓', '✓ Native'],
              [isZh ? 'JSON/YAML支持' : 'JSON/YAML Support', '✓', '✓'],
              [isZh ? '自动同步' : 'Auto Sync', '✓', '✓'],
              [isZh ? '手动同步' : 'Manual Sync', '✓', '✓'],
              [isZh ? '健康检查' : 'Health Checks', '✓ Built-in', '✓'],
              [isZh ? '回滚' : 'Rollback', '✓ Built-in', 'Git revert'],
              [isZh ? '多集群' : 'Multi-cluster', 'ApplicationSets', 'Native'],
              [isZh ? '镜像更新' : 'Image Updates', 'Image Updater', 'Image Automation'],
              [isZh ? '通知' : 'Notifications', 'Built-in', 'Notification Controller'],
              [isZh ? 'RBAC' : 'RBAC', '✓ Comprehensive', '✓'],
            ].map(([feature, argocd, flux], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{argocd}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{flux}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.uiTitle}</h2>
      <p style={pStyle}>{ct.uiIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>ArgoCD UI</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '丰富的 Web UI，实时可视化应用状态、资源拓扑、同步历史、差异比较。支持通过 UI 创建和管理应用。适合可视化管理。' : 'Rich Web UI with real-time visualization of application status, resource topology, sync history, and diff comparisons. Create and manage applications through UI. Great for visual management.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Flux UI</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '无原生 UI。可以使用 Weave GitOps（开源）或 Flux web UI 项目。主要通过 CLI 和 kubectl 管理。适合 CLI 爱好者。' : 'No native UI. Use Weave GitOps (open source) or Flux web UI projects. Mainly managed via CLI and kubectl. Great for CLI enthusiasts.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <pre style={codeStyle}><code>{`# ArgoCD Installation
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Access UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Get initial password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

# Flux Installation
flux install --version=v2.0.0

# Or using kubectl
kubectl apply -f https://github.com/fluxcd/flux2/releases/latest/download/install.yaml

# Bootstrap with Git repository
flux bootstrap github \\
  --owner=myorg \\
  --repository=myrepo \\
  --branch=main \\
  --path=./clusters/my-cluster`}</code></pre>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.argoCDExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# ArgoCD Application CRD
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/myorg/myapp.git
    targetRevision: HEAD
    path: k8s/overlays/production
    kustomize:
      namePrefix: prod-
  destination:
    server: https://kubernetes.default.svc
    namespace: myapp
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
    - Validate=true
    - CreateNamespace=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m

---
# ApplicationSet for multi-cluster
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: myapp-multi-cluster
  namespace: argocd
spec:
  generators:
  - list:
      elements:
      - cluster: cluster1
        url: https://cluster1.example.com
      - cluster: cluster2
        url: https://cluster2.example.com
  template:
    metadata:
      name: 'myapp-{{cluster}}'
    spec:
      project: default
      source:
        repoURL: https://github.com/myorg/myapp.git
        targetRevision: HEAD
        path: k8s/base
      destination:
        server: '{{url}}'
        namespace: myapp`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.fluxExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Flux GitRepository and Kustomization
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: GitRepository
metadata:
  name: myapp
  namespace: flux-system
spec:
  interval: 1m0s
  ref:
    branch: main
  url: https://github.com/myorg/myapp.git
  secretRef:
    name: ssh-key

---
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: myapp
  namespace: flux-system
spec:
  interval: 5m0s
  path: ./k8s/overlays/production
  prune: true
  sourceRef:
    kind: GitRepository
    name: myapp
  targetNamespace: myapp
  healthChecks:
  - apiVersion: apps/v1
    kind: Deployment
    name: myapp
    namespace: myapp

---
# HelmRelease for Helm charts
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: myapp
  namespace: flux-system
spec:
  interval: 5m
  chart:
    spec:
      chart: mychart
      version: '1.0.0'
      sourceRef:
        kind: HelmRepository
        name: myrepo
      interval: 1m
  values:
    replicaCount: 3
    image:
      tag: v1.0.0`}</code></pre>

      <h2 style={h2Style}>{ct.multiTenancyTitle}</h2>
      <p style={pStyle}>{ct.multiTenancyIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '多租户特性' : 'Multi-Tenancy Feature'}</th>
              <th style={thStyle}>ArgoCD</th>
              <th style={thStyle}>Flux</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '命名空间隔离' : 'Namespace Isolation', 'Projects', 'Namespaces'],
              [isZh ? 'RBAC支持' : 'RBAC Support', '✓ Comprehensive', '✓'],
              [isZh ? '仓库访问控制' : 'Repo Access Control', '✓', '✓'],
              [isZh ? '集群访问控制' : 'Cluster Access Control', '✓', '✓'],
              [isZh ? '租户自助服务' : 'Tenant Self-Service', '✓', '✓'],
              [isZh ? '资源配额' : 'Resource Quotas', isZh ? '通过项目' : 'Via Projects', isZh ? '原生' : 'Native'],
            ].map(([feature, argocd, flux], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{argocd}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{flux}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.securityTitle}</h2>
      <p style={pStyle}>{ct.securityIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '安全特性' : 'Security Feature'}</th>
              <th style={thStyle}>ArgoCD</th>
              <th style={thStyle}>Flux</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'SSO集成' : 'SSO Integration', 'Dex, OIDC, SAML', 'OIDC'],
              [isZh ? '密钥管理' : 'Secrets Management', 'Sealed Secrets, Vault', 'SOPS, Sealed Secrets'],
              [isZh ? 'Git SSH密钥' : 'Git SSH Keys', '✓', '✓'],
              [isZh ? '镜像签名验证' : 'Image Signature', '✓', '✓ Cosign'],
              [isZh ? '审计日志' : 'Audit Logs', '✓', '✓'],
              [isZh ? '网络策略' : 'Network Policies', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
            ].map(([feature, argocd, flux], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{argocd}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{flux}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.argoCDBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'GitOps新手团队' : 'Teams new to GitOps'}</li>
            <li>{isZh ? '需要可视化管理' : 'Visual management needs'}</li>
            <li>{isZh ? '审计和合规要求' : 'Audit and compliance'}</li>
            <li>{isZh ? '企业级RBAC' : 'Enterprise RBAC'}</li>
            <li>{isZh ? '复杂应用拓扑' : 'Complex app topology'}</li>
            <li>{isZh ? '需要内置UI' : 'Need built-in UI'}</li>
            <li>{isZh ? '快速故障排查' : 'Quick troubleshooting'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.fluxBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '高级用户' : 'Advanced users'}</li>
            <li>{isZh ? 'CLI优先工作流' : 'CLI-first workflow'}</li>
            <li>{isZh ? '资源受限环境' : 'Resource-constrained'}</li>
            <li>{isZh ? '模块化需求' : 'Modularity requirements'}</li>
            <li>{isZh ? '大规模多租户' : 'Large-scale multi-tenant'}</li>
            <li>{isZh ? '渐进式交付' : 'Progressive delivery'}</li>
            <li>{isZh ? 'CNCF原生集成' : 'CNCF native integration'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/yaml-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>YAML Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
      </div>

      <h2 style={h2Style}>FAQ</h2>
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
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
