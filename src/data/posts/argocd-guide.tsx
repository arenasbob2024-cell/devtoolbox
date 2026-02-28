'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Argo CD Complete Guide: GitOps Continuous Delivery for Kubernetes',
    description: 'Master Argo CD for GitOps-based Kubernetes deployments. Learn installation, architecture, Application CRD, sync policies, multi-cluster management, RBAC, secrets, ApplicationSets, notifications, Helm/Kustomize integration, CI/CD pipelines, and best practices.',
    tldr: 'Argo CD is a declarative GitOps continuous delivery tool for Kubernetes. It watches Git repositories and automatically synchronizes the desired application state defined in manifests (Helm, Kustomize, plain YAML) to target clusters. Key features: Application CRD for declarative app definitions, sync waves and hooks for ordered deployments, health checks, multi-cluster support, SSO/RBAC, ApplicationSets for managing apps at scale, and built-in notifications. It replaces imperative kubectl apply pipelines with a pull-based reconciliation model where Git is the single source of truth.',
  },
  zh: {
    title: 'Argo CD 完整指南：基于 GitOps 的 Kubernetes 持续交付',
    description: '掌握 Argo CD 的 GitOps Kubernetes 部署。学习安装、架构、Application CRD、同步策略、多集群管理、RBAC、密钥管理、ApplicationSet、通知、Helm/Kustomize 集成、CI/CD 流水线和最佳实践。',
    tldr: 'Argo CD 是一个声明式 GitOps 持续交付工具。它监控 Git 仓库，自动将清单（Helm、Kustomize、纯 YAML）中定义的期望应用状态同步到目标集群。核心特性：Application CRD 声明式定义应用、同步波次和钩子实现有序部署、健康检查、多集群支持、SSO/RBAC、ApplicationSet 大规模管理应用、内置通知。它用基于拉取的协调模型取代了命令式 kubectl apply 流水线，Git 成为唯一的事实来源。',
  },
};

export default function ArgocdGuide({ lang }: { lang: string }) {
  const ct = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is Argo CD and how does it differ from traditional CI/CD?', acceptedAnswer: { '@type': 'Answer', text: 'Argo CD is a declarative GitOps continuous delivery tool for Kubernetes. Unlike traditional push-based CI/CD (Jenkins, GitHub Actions deploying via kubectl apply), Argo CD uses a pull-based model: it continuously watches Git repositories and reconciles the live cluster state to match the desired state in Git. This means Git is the single source of truth, all changes are auditable, and drift is automatically detected and corrected.' } },
      { '@type': 'Question', name: 'How do I install Argo CD on a Kubernetes cluster?', acceptedAnswer: { '@type': 'Answer', text: 'Install Argo CD with kubectl: create the argocd namespace, then apply the install manifest from the official GitHub release. Alternatively, use the Argo CD Helm chart for more customization. After installation, access the UI by port-forwarding the argocd-server service to localhost:8080, retrieve the initial admin password from the argocd-initial-admin-secret, and log in via the CLI or web UI.' } },
      { '@type': 'Question', name: 'What is the Argo CD Application CRD?', acceptedAnswer: { '@type': 'Answer', text: 'The Application CRD is the core Argo CD resource. It defines a source (Git repo, path, target revision) and a destination (Kubernetes cluster, namespace). Argo CD watches the source, renders manifests (plain YAML, Helm, Kustomize, Jsonnet), and syncs them to the destination. Applications can be managed declaratively as YAML or through the web UI and CLI.' } },
      { '@type': 'Question', name: 'What are sync waves and hooks in Argo CD?', acceptedAnswer: { '@type': 'Answer', text: 'Sync waves control the order in which resources are applied during a sync operation. Resources are annotated with argocd.argoproj.io/sync-wave with integer values; lower values sync first. Hooks (PreSync, Sync, PostSync, SyncFail) are Jobs or Pods that run at specific phases — for example, a PreSync hook can run database migrations before the application deployment starts.' } },
      { '@type': 'Question', name: 'How does Argo CD handle multi-cluster deployments?', acceptedAnswer: { '@type': 'Answer', text: 'Argo CD natively supports multi-cluster management. Register external clusters using argocd cluster add, which creates a ServiceAccount with appropriate RBAC on the target cluster and stores credentials as a Kubernetes Secret in the Argo CD namespace. Applications can then target any registered cluster. Combined with ApplicationSets, you can deploy the same application to dozens of clusters from a single Argo CD instance.' } },
      { '@type': 'Question', name: 'How do I manage secrets with Argo CD?', acceptedAnswer: { '@type': 'Answer', text: 'Never store plain-text secrets in Git. Use Sealed Secrets (Bitnami) to encrypt secrets that only the cluster can decrypt, External Secrets Operator to sync secrets from AWS Secrets Manager, HashiCorp Vault, or Azure Key Vault, or SOPS with age/GPG to encrypt secret files in Git. Argo CD integrates with all these approaches through its plugin system or native Kubernetes resource support.' } },
      { '@type': 'Question', name: 'What is an ApplicationSet and when should I use it?', acceptedAnswer: { '@type': 'Answer', text: 'ApplicationSet is an Argo CD controller that generates Application resources from templates using generators (List, Cluster, Git directory, Git file, Matrix, Merge, Pull Request). Use ApplicationSets when you need to deploy the same application across multiple clusters, manage monorepo microservices, create apps from pull requests for preview environments, or generate applications dynamically from a list of environments.' } },
      { '@type': 'Question', name: 'How does Argo CD compare to Flux CD?', acceptedAnswer: { '@type': 'Answer', text: 'Both are CNCF GitOps tools for Kubernetes. Argo CD provides a rich web UI, Application CRD model, RBAC, and SSO out of the box, making it better for teams that want visibility and multi-tenancy. Flux follows a more Kubernetes-native, controller-per-concern design (source-controller, kustomize-controller, helm-controller) and integrates tightly with Flagger for progressive delivery. Argo CD is generally easier to adopt for teams wanting a UI-driven experience; Flux suits teams preferring a pure CLI/GitOps-only workflow.' } },
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
          <li>Argo CD implements GitOps: Git is the single source of truth for your Kubernetes desired state.</li>
          <li>The pull-based reconciliation model automatically detects and corrects drift between Git and live cluster state.</li>
          <li>Application CRD declaratively defines source (Git repo), destination (cluster/namespace), and sync policy.</li>
          <li>Sync waves and hooks enable ordered deployments — run DB migrations before app rollout, verify after.</li>
          <li>ApplicationSets generate hundreds of Applications from templates using cluster, Git, or list generators.</li>
          <li>Sealed Secrets, External Secrets Operator, or SOPS keep secrets encrypted in Git while Argo CD syncs them safely.</li>
          <li>Multi-cluster management, SSO/RBAC, and a rich web UI make Argo CD suitable for enterprise-scale GitOps.</li>
        </ul>
      </div>

      {/* Section 1: What is Argo CD & GitOps */}
      <h2 style={h2Style}>What Is Argo CD and GitOps?</h2>
      <p style={pStyle}>
        Argo CD is a declarative, GitOps-based continuous delivery tool for Kubernetes, maintained as a CNCF graduated project. It continuously monitors Git repositories containing Kubernetes manifests and automatically synchronizes the desired application state to target clusters. When someone pushes a change to Git, Argo CD detects the difference between the live state and the desired state and reconciles them — either automatically or with manual approval.
      </p>
      <p style={pStyle}>
        GitOps is an operational framework that takes DevOps best practices — version control, collaboration, compliance, CI/CD — and applies them to infrastructure automation. The core principle is simple: the entire system state is described declaratively in Git, and an automated agent (Argo CD) ensures the live system matches that description at all times. Every change is a Git commit, every rollback is a Git revert, and every audit trail is a Git log.
      </p>
      <p style={pStyle}>
        Traditional CI/CD pipelines push changes to clusters using kubectl apply or helm upgrade from a CI runner. This push model has problems: CI credentials with cluster admin access are a security risk, pipeline failures can leave the cluster in a partially-applied state, and there is no continuous reconciliation — if someone manually changes a resource, nobody knows. Argo CD solves all of these by running inside the cluster, pulling desired state from Git, and continuously reconciling.
      </p>

      {/* Section 2: Installation */}
      <h2 style={h2Style}>Installation: kubectl and Helm</h2>
      <h3 style={h3Style}>Install with kubectl (Quick Start)</h3>
      <pre style={codeStyle}><code>{
'# Create namespace and install Argo CD\n'
+ 'kubectl create namespace argocd\n'
+ 'kubectl apply -n argocd -f \\\n'
+ '  https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml\n'
+ '\n'
+ '# Wait for all pods to be ready\n'
+ 'kubectl wait --for=condition=Ready pod --all -n argocd --timeout=300s\n'
+ '\n'
+ '# Get the initial admin password\n'
+ 'argocd admin initial-password -n argocd\n'
+ '\n'
+ '# Port-forward the API server\n'
+ 'kubectl port-forward svc/argocd-server -n argocd 8080:443\n'
+ '\n'
+ '# Login via CLI\n'
+ 'argocd login localhost:8080 --username admin --password <initial-password>\n'
+ '\n'
+ '# Change the admin password immediately\n'
+ 'argocd account update-password'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>Install with Helm (Production)</h3>
      <pre style={codeStyle}><code>{
'# Add the Argo Helm repository\n'
+ 'helm repo add argo https://argoproj.github.io/argo-helm\n'
+ 'helm repo update\n'
+ '\n'
+ '# Install with custom values\n'
+ 'helm install argocd argo/argo-cd \\\n'
+ '  --namespace argocd \\\n'
+ '  --create-namespace \\\n'
+ '  --set server.service.type=LoadBalancer \\\n'
+ '  --set server.extraArgs[0]=--insecure \\\n'
+ '  --set configs.params."server\\.insecure"=true \\\n'
+ '  --set ha.enabled=true \\\n'
+ '  --set controller.replicas=2 \\\n'
+ '  --set redis-ha.enabled=true \\\n'
+ '  -f values-production.yaml\n'
+ '\n'
+ '# values-production.yaml example:\n'
+ '# server:\n'
+ '#   replicas: 2\n'
+ '#   ingress:\n'
+ '#     enabled: true\n'
+ '#     hosts:\n'
+ '#       - argocd.example.com\n'
+ '#     tls:\n'
+ '#       - secretName: argocd-tls\n'
+ '#         hosts:\n'
+ '#           - argocd.example.com'
      }</code></pre>

      {/* Section 3: Architecture */}
      <h2 style={h2Style}>Architecture: Core Components</h2>
      <p style={pStyle}>
        Argo CD consists of three main components that work together to implement the GitOps reconciliation loop. Understanding this architecture is essential for troubleshooting, scaling, and securing your Argo CD installation.
      </p>
      <pre style={codeStyle}><code>{
'Argo CD Architecture\n'
+ '\n'
+ '  Git Repository          Argo CD (in-cluster)            Target Cluster(s)\n'
+ '  ┌──────────┐     ┌─────────────────────────────┐     ┌──────────────────┐\n'
+ '  │ manifests│     │  ┌────────────────────────┐  │     │                  │\n'
+ '  │ helm/    │◄────┤  │    Repo Server         │  │     │  Namespaces      │\n'
+ '  │ kustomize│     │  │  (clone, render, cache) │  │     │  ┌────────────┐ │\n'
+ '  │ plain/   │     │  └───────────┬────────────┘  │     │  │ Deployments│ │\n'
+ '  └──────────┘     │              │                │     │  │ Services   │ │\n'
+ '                   │  ┌───────────▼────────────┐  │     │  │ ConfigMaps │ │\n'
+ '                   │  │  Application Controller │  │────►│  │ Secrets    │ │\n'
+ '                   │  │  (diff, sync, health)   │  │     │  │ Ingress    │ │\n'
+ '                   │  └───────────┬────────────┘  │     │  └────────────┘ │\n'
+ '                   │              │                │     └──────────────────┘\n'
+ '  Web UI / CLI     │  ┌───────────▼────────────┐  │\n'
+ '  ┌──────────┐     │  │      API Server        │  │\n'
+ '  │ Browser  │◄────┤  │  (gRPC/REST, auth,     │  │\n'
+ '  │ argocd   │     │  │   RBAC, web UI)        │  │\n'
+ '  │  CLI     │     │  └────────────────────────┘  │\n'
+ '  └──────────┘     └─────────────────────────────┘'
      }</code></pre>

      <h3 style={h3Style}>API Server</h3>
      <p style={pStyle}>
        The API Server is the central component that exposes the gRPC and REST API consumed by the web UI, CLI, and CI/CD systems. It handles authentication (local accounts, SSO via OIDC/SAML/LDAP), authorization (RBAC policies), and serves the built-in web dashboard. It manages Application and AppProject resources and triggers sync operations.
      </p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>Repo Server</h3>
      <p style={pStyle}>
        The Repo Server clones Git repositories, caches them locally, and renders Kubernetes manifests. It supports plain YAML, Helm charts (helm template), Kustomize overlays (kustomize build), Jsonnet, and custom config management plugins. The Repo Server is stateless and horizontally scalable — for large installations with hundreds of applications, run multiple replicas.
      </p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>Application Controller</h3>
      <p style={pStyle}>
        The Application Controller is the brain of Argo CD. It continuously monitors running applications, compares the live state against the desired state from the Repo Server, detects drift (OutOfSync), and optionally auto-syncs. It also evaluates resource health using built-in and custom health checks. The controller runs the reconciliation loop on a configurable interval (default: 3 minutes for full reconciliation, with webhook-triggered instant checks).
      </p>

      {/* Section 4: Application CRD */}
      <h2 style={h2Style}>The Application CRD</h2>
      <p style={pStyle}>
        The Application custom resource is the fundamental building block in Argo CD. It defines what to deploy (source), where to deploy (destination), and how to sync (sync policy). Applications can be created via the UI, CLI, or declaratively as YAML — the latter is the GitOps-recommended approach, often called the "app of apps" pattern.
      </p>
      <pre style={codeStyle}><code>{
'# application.yaml - Argo CD Application CRD\n'
+ 'apiVersion: argoproj.io/v1alpha1\n'
+ 'kind: Application\n'
+ 'metadata:\n'
+ '  name: my-web-app\n'
+ '  namespace: argocd\n'
+ '  finalizers:\n'
+ '    - resources-finalizer.argocd.argoproj.io\n'
+ 'spec:\n'
+ '  project: default\n'
+ '  source:\n'
+ '    repoURL: https://github.com/org/k8s-manifests.git\n'
+ '    targetRevision: main\n'
+ '    path: apps/web-app/overlays/production\n'
+ '  destination:\n'
+ '    server: https://kubernetes.default.svc\n'
+ '    namespace: production\n'
+ '  syncPolicy:\n'
+ '    automated:\n'
+ '      prune: true\n'
+ '      selfHeal: true\n'
+ '      allowEmpty: false\n'
+ '    syncOptions:\n'
+ '      - CreateNamespace=true\n'
+ '      - PrunePropagationPolicy=foreground\n'
+ '      - PruneLast=true\n'
+ '    retry:\n'
+ '      limit: 5\n'
+ '      backoff:\n'
+ '        duration: 5s\n'
+ '        factor: 2\n'
+ '        maxDuration: 3m'
      }</code></pre>

      {/* Section 5: Projects */}
      <h2 style={h2Style}>AppProjects: Multi-Tenancy and Access Control</h2>
      <p style={pStyle}>
        AppProjects provide logical grouping and access control for Applications. They restrict which Git repositories an Application can use as source, which clusters and namespaces it can deploy to, and which Kubernetes resource kinds are allowed or denied. Projects are essential for multi-tenancy — different teams get different projects with scoped permissions.
      </p>
      <pre style={codeStyle}><code>{
'apiVersion: argoproj.io/v1alpha1\n'
+ 'kind: AppProject\n'
+ 'metadata:\n'
+ '  name: team-backend\n'
+ '  namespace: argocd\n'
+ 'spec:\n'
+ '  description: Backend team project\n'
+ '  sourceRepos:\n'
+ '    - https://github.com/org/backend-manifests.git\n'
+ '    - https://github.com/org/shared-charts.git\n'
+ '  destinations:\n'
+ '    - server: https://kubernetes.default.svc\n'
+ '      namespace: backend-*\n'
+ '    - server: https://staging-cluster.example.com\n'
+ '      namespace: backend-*\n'
+ '  clusterResourceWhitelist:\n'
+ '    - group: ""\n'
+ '      kind: Namespace\n'
+ '  namespaceResourceBlacklist:\n'
+ '    - group: ""\n'
+ '      kind: ResourceQuota\n'
+ '    - group: ""\n'
+ '      kind: LimitRange\n'
+ '  roles:\n'
+ '    - name: backend-dev\n'
+ '      description: Backend developer role\n'
+ '      policies:\n'
+ '        - p, proj:team-backend:backend-dev, applications, get, team-backend/*, allow\n'
+ '        - p, proj:team-backend:backend-dev, applications, sync, team-backend/*, allow\n'
+ '      groups:\n'
+ '        - backend-developers'
      }</code></pre>

      {/* Section 6: Sync Policies */}
      <h2 style={h2Style}>Sync Policies: Automated vs Manual</h2>
      <p style={pStyle}>
        Sync policies determine how Argo CD reconciles the live state with the desired state. Manual sync requires explicit user action (via UI or CLI) to apply changes. Automated sync triggers synchronization whenever the desired state in Git diverges from the live state. Each mode has distinct use cases depending on your deployment risk tolerance.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Feature</th>
            <th style={thStyle}>Manual Sync</th>
            <th style={thStyle}>Automated Sync</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Trigger</td><td style={tdStyle}>User clicks Sync or runs argocd app sync</td><td style={tdStyle}>Automatic on Git change detection</td></tr>
          <tr><td style={tdStyle}>Prune</td><td style={tdStyle}>Optional per sync</td><td style={tdStyle}>Configurable: prune=true removes orphans</td></tr>
          <tr><td style={tdStyle}>Self-heal</td><td style={tdStyle}>Not available</td><td style={tdStyle}>selfHeal=true reverts manual cluster changes</td></tr>
          <tr><td style={tdStyle}>Best for</td><td style={tdStyle}>Production with approval gates</td><td style={tdStyle}>Dev/staging, trusted production repos</td></tr>
          <tr><td style={tdStyle}>Rollback</td><td style={tdStyle}>Git revert + manual sync</td><td style={tdStyle}>Git revert triggers auto-sync</td></tr>
        </tbody>
      </table>
      <pre style={codeStyle}><code>{
'# Manual sync via CLI\n'
+ 'argocd app sync my-web-app --prune --force\n'
+ '\n'
+ '# Automated sync in Application spec\n'
+ '# syncPolicy:\n'
+ '#   automated:\n'
+ '#     prune: true        # Delete resources removed from Git\n'
+ '#     selfHeal: true     # Revert manual cluster changes\n'
+ '#     allowEmpty: false  # Prevent sync if Git returns empty manifests'
      }</code></pre>

      {/* Section 7: Sync Waves & Hooks */}
      <h2 style={h2Style}>Sync Waves and Hooks</h2>
      <p style={pStyle}>
        Sync waves control the order in which Argo CD applies resources during a sync. Resources are assigned wave numbers via annotations: lower waves are applied first, and Argo CD waits for all resources in a wave to be healthy before proceeding to the next. Hooks are special resources (usually Jobs) that run at specific lifecycle phases.
      </p>
      <pre style={codeStyle}><code>{
'# Wave -1: Namespace and RBAC (created first)\n'
+ 'apiVersion: v1\n'
+ 'kind: Namespace\n'
+ 'metadata:\n'
+ '  name: my-app\n'
+ '  annotations:\n'
+ '    argocd.argoproj.io/sync-wave: "-1"\n'
+ '---\n'
+ '# Wave 0: ConfigMaps and Secrets\n'
+ 'apiVersion: v1\n'
+ 'kind: ConfigMap\n'
+ 'metadata:\n'
+ '  name: app-config\n'
+ '  annotations:\n'
+ '    argocd.argoproj.io/sync-wave: "0"\n'
+ 'data:\n'
+ '  DATABASE_HOST: postgres.db.svc\n'
+ '---\n'
+ '# Wave 1: Database migration (PreSync hook)\n'
+ 'apiVersion: batch/v1\n'
+ 'kind: Job\n'
+ 'metadata:\n'
+ '  name: db-migrate\n'
+ '  annotations:\n'
+ '    argocd.argoproj.io/hook: PreSync\n'
+ '    argocd.argoproj.io/hook-delete-policy: HookSucceeded\n'
+ 'spec:\n'
+ '  template:\n'
+ '    spec:\n'
+ '      containers:\n'
+ '        - name: migrate\n'
+ '          image: my-app:latest\n'
+ '          command: ["./migrate", "--up"]\n'
+ '      restartPolicy: Never\n'
+ '---\n'
+ '# Wave 2: Application Deployment\n'
+ 'apiVersion: apps/v1\n'
+ 'kind: Deployment\n'
+ 'metadata:\n'
+ '  name: my-app\n'
+ '  annotations:\n'
+ '    argocd.argoproj.io/sync-wave: "2"\n'
+ '---\n'
+ '# PostSync hook: Smoke test\n'
+ 'apiVersion: batch/v1\n'
+ 'kind: Job\n'
+ 'metadata:\n'
+ '  name: smoke-test\n'
+ '  annotations:\n'
+ '    argocd.argoproj.io/hook: PostSync\n'
+ '    argocd.argoproj.io/hook-delete-policy: HookSucceeded\n'
+ 'spec:\n'
+ '  template:\n'
+ '    spec:\n'
+ '      containers:\n'
+ '        - name: test\n'
+ '          image: curlimages/curl:latest\n'
+ '          command: ["curl", "-f", "http://my-app.my-app.svc/healthz"]\n'
+ '      restartPolicy: Never'
      }</code></pre>

      <h3 style={h3Style}>Hook Types Reference</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Hook</th>
            <th style={thStyle}>When It Runs</th>
            <th style={thStyle}>Common Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>PreSync</td><td style={tdStyle}>Before sync starts</td><td style={tdStyle}>Database migrations, schema changes</td></tr>
          <tr><td style={tdStyle}>Sync</td><td style={tdStyle}>During sync (with wave ordering)</td><td style={tdStyle}>Complex resource creation order</td></tr>
          <tr><td style={tdStyle}>PostSync</td><td style={tdStyle}>After all resources are healthy</td><td style={tdStyle}>Smoke tests, notifications, cache warming</td></tr>
          <tr><td style={tdStyle}>SyncFail</td><td style={tdStyle}>When sync operation fails</td><td style={tdStyle}>Cleanup, alerting, rollback triggers</td></tr>
          <tr><td style={tdStyle}>Skip</td><td style={tdStyle}>Never synced by Argo CD</td><td style={tdStyle}>Resources managed externally</td></tr>
        </tbody>
      </table>

      {/* Section 8: Health Checks */}
      <h2 style={h2Style}>Health Checks</h2>
      <p style={pStyle}>
        Argo CD evaluates the health of every resource it manages. Built-in health checks cover Deployments (are all replicas available?), StatefulSets, DaemonSets, Ingress, PersistentVolumeClaims, and more. For custom resources (CRDs), you can define custom health check scripts in Lua that Argo CD evaluates to determine Healthy, Progressing, Degraded, Suspended, or Missing status.
      </p>
      <pre style={codeStyle}><code>{
'# Custom health check for a CronJob (in argocd-cm ConfigMap)\n'
+ '# data:\n'
+ '#   resource.customizations.health.batch_CronJob: |\n'
+ '#     hs = {}\n'
+ '#     if obj.status ~= nil then\n'
+ '#       if obj.status.lastScheduleTime ~= nil then\n'
+ '#         hs.status = "Healthy"\n'
+ '#         hs.message = "CronJob is scheduled"\n'
+ '#       else\n'
+ '#         hs.status = "Progressing"\n'
+ '#         hs.message = "Waiting for first schedule"\n'
+ '#       end\n'
+ '#     else\n'
+ '#       hs.status = "Progressing"\n'
+ '#       hs.message = "No status yet"\n'
+ '#     end\n'
+ '#     return hs'
      }</code></pre>

      {/* Section 9: Multi-Cluster Management */}
      <h2 style={h2Style}>Multi-Cluster Management</h2>
      <p style={pStyle}>
        Argo CD can manage applications across multiple Kubernetes clusters from a single control plane. This is critical for organizations with separate clusters for development, staging, production, or regional deployments. External clusters are registered and their credentials are stored securely as Kubernetes Secrets in the Argo CD namespace.
      </p>
      <pre style={codeStyle}><code>{
'# Register an external cluster\n'
+ 'argocd cluster add staging-context --name staging-cluster\n'
+ 'argocd cluster add prod-us-east --name prod-us-east\n'
+ 'argocd cluster add prod-eu-west --name prod-eu-west\n'
+ '\n'
+ '# List registered clusters\n'
+ 'argocd cluster list\n'
+ '\n'
+ '# Deploy to a specific cluster\n'
+ 'apiVersion: argoproj.io/v1alpha1\n'
+ 'kind: Application\n'
+ 'metadata:\n'
+ '  name: web-app-prod-us\n'
+ '  namespace: argocd\n'
+ 'spec:\n'
+ '  project: production\n'
+ '  source:\n'
+ '    repoURL: https://github.com/org/manifests.git\n'
+ '    path: overlays/prod-us-east\n'
+ '    targetRevision: main\n'
+ '  destination:\n'
+ '    server: https://prod-us-east.example.com\n'
+ '    namespace: web-app'
      }</code></pre>

      {/* Section 10: SSO & RBAC */}
      <h2 style={h2Style}>SSO and RBAC</h2>
      <p style={pStyle}>
        Argo CD supports Single Sign-On via OIDC (Okta, Auth0, Keycloak, Google), SAML 2.0, LDAP, and GitHub/GitLab OAuth. RBAC policies use a Casbin model to control who can view, sync, delete, or override applications at the project or global level. This enables fine-grained access control for multi-team environments.
      </p>
      <pre style={codeStyle}><code>{
'# argocd-cm ConfigMap - OIDC SSO configuration\n'
+ 'data:\n'
+ '  url: https://argocd.example.com\n'
+ '  oidc.config: |\n'
+ '    name: Okta\n'
+ '    issuer: https://org.okta.com/oauth2/default\n'
+ '    clientID: argocd-client-id\n'
+ '    clientSecret: $oidc.okta.clientSecret\n'
+ '    requestedScopes:\n'
+ '      - openid\n'
+ '      - profile\n'
+ '      - email\n'
+ '      - groups\n'
+ '\n'
+ '# argocd-rbac-cm ConfigMap - RBAC policies\n'
+ 'data:\n'
+ '  policy.default: role:readonly\n'
+ '  policy.csv: |\n'
+ '    # Admins can do everything\n'
+ '    p, role:admin, applications, *, */*, allow\n'
+ '    p, role:admin, clusters, *, *, allow\n'
+ '    p, role:admin, repositories, *, *, allow\n'
+ '    p, role:admin, projects, *, *, allow\n'
+ '    \n'
+ '    # Developers can view and sync their project apps\n'
+ '    p, role:developer, applications, get, team-backend/*, allow\n'
+ '    p, role:developer, applications, sync, team-backend/*, allow\n'
+ '    p, role:developer, applications, action/*, team-backend/*, allow\n'
+ '    \n'
+ '    # Map SSO groups to roles\n'
+ '    g, platform-team, role:admin\n'
+ '    g, backend-devs, role:developer'
      }</code></pre>

      {/* Section 11: Secrets Management */}
      <h2 style={h2Style}>Secrets Management</h2>
      <p style={pStyle}>
        Storing plain-text Kubernetes Secrets in Git violates security best practices. Argo CD integrates with multiple secret management solutions that keep encrypted or referenced secrets in Git while the actual values are resolved at sync time or by in-cluster controllers.
      </p>

      <h3 style={h3Style}>Sealed Secrets (Bitnami)</h3>
      <pre style={codeStyle}><code>{
'# Install Sealed Secrets controller\n'
+ 'helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets\n'
+ 'helm install sealed-secrets sealed-secrets/sealed-secrets -n kube-system\n'
+ '\n'
+ '# Encrypt a secret (safe to commit to Git)\n'
+ 'kubectl create secret generic db-creds \\\n'
+ '  --from-literal=password=supersecret \\\n'
+ '  --dry-run=client -o yaml | \\\n'
+ '  kubeseal --controller-name=sealed-secrets \\\n'
+ '           --controller-namespace=kube-system \\\n'
+ '           --format yaml > sealed-db-creds.yaml\n'
+ '\n'
+ '# The SealedSecret can be safely stored in Git\n'
+ '# Argo CD syncs it; the controller decrypts it in-cluster'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>External Secrets Operator</h3>
      <pre style={codeStyle}><code>{
'# ExternalSecret syncs from AWS Secrets Manager\n'
+ 'apiVersion: external-secrets.io/v1beta1\n'
+ 'kind: ExternalSecret\n'
+ 'metadata:\n'
+ '  name: db-credentials\n'
+ 'spec:\n'
+ '  refreshInterval: 1h\n'
+ '  secretStoreRef:\n'
+ '    name: aws-secrets-manager\n'
+ '    kind: ClusterSecretStore\n'
+ '  target:\n'
+ '    name: db-credentials\n'
+ '    creationPolicy: Owner\n'
+ '  data:\n'
+ '    - secretKey: username\n'
+ '      remoteRef:\n'
+ '        key: prod/db-credentials\n'
+ '        property: username\n'
+ '    - secretKey: password\n'
+ '      remoteRef:\n'
+ '        key: prod/db-credentials\n'
+ '        property: password'
      }</code></pre>

      {/* Section 12: ApplicationSet */}
      <h2 style={h2Style}>ApplicationSets: Managing Apps at Scale</h2>
      <p style={pStyle}>
        The ApplicationSet controller generates Argo CD Application resources from templates using generators. Instead of manually creating hundreds of Application CRDs, you define a template and a generator that produces the parameter sets. This is essential for managing monorepos, multi-cluster deployments, and dynamic environments.
      </p>

      <h3 style={h3Style}>Cluster Generator (Multi-Cluster)</h3>
      <pre style={codeStyle}><code>{
'apiVersion: argoproj.io/v1alpha1\n'
+ 'kind: ApplicationSet\n'
+ 'metadata:\n'
+ '  name: web-app-all-clusters\n'
+ '  namespace: argocd\n'
+ 'spec:\n'
+ '  generators:\n'
+ '    - clusters:\n'
+ '        selector:\n'
+ '          matchLabels:\n'
+ '            env: production\n'
+ '  template:\n'
+ '    metadata:\n'
+ '      name: web-app-{{name}}\n'
+ '    spec:\n'
+ '      project: production\n'
+ '      source:\n'
+ '        repoURL: https://github.com/org/manifests.git\n'
+ '        targetRevision: main\n'
+ '        path: overlays/{{metadata.labels.region}}\n'
+ '      destination:\n'
+ '        server: "{{server}}"\n'
+ '        namespace: web-app\n'
+ '      syncPolicy:\n'
+ '        automated:\n'
+ '          prune: true\n'
+ '          selfHeal: true'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>Git Directory Generator (Monorepo)</h3>
      <pre style={codeStyle}><code>{
'apiVersion: argoproj.io/v1alpha1\n'
+ 'kind: ApplicationSet\n'
+ 'metadata:\n'
+ '  name: monorepo-services\n'
+ '  namespace: argocd\n'
+ 'spec:\n'
+ '  generators:\n'
+ '    - git:\n'
+ '        repoURL: https://github.com/org/monorepo.git\n'
+ '        revision: main\n'
+ '        directories:\n'
+ '          - path: services/*\n'
+ '  template:\n'
+ '    metadata:\n'
+ '      name: "{{path.basename}}"\n'
+ '    spec:\n'
+ '      project: default\n'
+ '      source:\n'
+ '        repoURL: https://github.com/org/monorepo.git\n'
+ '        targetRevision: main\n'
+ '        path: "{{path}}"\n'
+ '      destination:\n'
+ '        server: https://kubernetes.default.svc\n'
+ '        namespace: "{{path.basename}}"'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#ec4899' }}>Pull Request Generator (Preview Environments)</h3>
      <pre style={codeStyle}><code>{
'apiVersion: argoproj.io/v1alpha1\n'
+ 'kind: ApplicationSet\n'
+ 'metadata:\n'
+ '  name: pr-previews\n'
+ '  namespace: argocd\n'
+ 'spec:\n'
+ '  generators:\n'
+ '    - pullRequest:\n'
+ '        github:\n'
+ '          owner: org\n'
+ '          repo: web-app\n'
+ '          tokenRef:\n'
+ '            secretName: github-token\n'
+ '            key: token\n'
+ '        requeueAfterSeconds: 60\n'
+ '  template:\n'
+ '    metadata:\n'
+ '      name: preview-{{branch_slug}}\n'
+ '    spec:\n'
+ '      project: previews\n'
+ '      source:\n'
+ '        repoURL: https://github.com/org/web-app.git\n'
+ '        targetRevision: "{{head_sha}}"\n'
+ '        path: k8s/preview\n'
+ '      destination:\n'
+ '        server: https://kubernetes.default.svc\n'
+ '        namespace: preview-{{number}}'
      }</code></pre>

      {/* Section 13: Notifications */}
      <h2 style={h2Style}>Argo CD Notifications</h2>
      <p style={pStyle}>
        Argo CD Notifications (built-in since v2.6) sends alerts to Slack, Teams, email, webhooks, GitHub, and more when application events occur (sync succeeded, sync failed, health degraded). Notifications are configured via the argocd-notifications-cm ConfigMap with triggers and templates.
      </p>
      <pre style={codeStyle}><code>{
'# argocd-notifications-cm ConfigMap\n'
+ 'apiVersion: v1\n'
+ 'kind: ConfigMap\n'
+ 'metadata:\n'
+ '  name: argocd-notifications-cm\n'
+ '  namespace: argocd\n'
+ 'data:\n'
+ '  service.slack: |\n'
+ '    token: $slack-token\n'
+ '  trigger.on-sync-succeeded: |\n'
+ '    - when: app.status.operationState.phase in ["Succeeded"]\n'
+ '      send: [app-sync-succeeded]\n'
+ '  trigger.on-sync-failed: |\n'
+ '    - when: app.status.operationState.phase in ["Error", "Failed"]\n'
+ '      send: [app-sync-failed]\n'
+ '  trigger.on-health-degraded: |\n'
+ '    - when: app.status.health.status == "Degraded"\n'
+ '      send: [app-health-degraded]\n'
+ '  template.app-sync-succeeded: |\n'
+ '    message: |\n'
+ '      Application {{.app.metadata.name}} sync succeeded.\n'
+ '      Revision: {{.app.status.sync.revision}}\n'
+ '  template.app-sync-failed: |\n'
+ '    message: |\n'
+ '      Application {{.app.metadata.name}} sync FAILED.\n'
+ '      Error: {{.app.status.operationState.message}}\n'
+ '\n'
+ '# Subscribe an app to notifications (annotation)\n'
+ '# metadata:\n'
+ '#   annotations:\n'
+ '#     notifications.argoproj.io/subscribe.on-sync-succeeded.slack: deploys'
      }</code></pre>

      {/* Section 14: Helm & Kustomize Integration */}
      <h2 style={h2Style}>Argo CD with Helm and Kustomize</h2>
      <h3 style={h3Style}>Helm Integration</h3>
      <p style={pStyle}>
        Argo CD renders Helm charts using helm template (not helm install), which means it treats Helm as a manifest generator rather than a release manager. You can specify Helm values inline, from files in the repo, or from external value files. This approach gives Argo CD full control over resource lifecycle while leveraging the Helm chart ecosystem.
      </p>
      <pre style={codeStyle}><code>{
'apiVersion: argoproj.io/v1alpha1\n'
+ 'kind: Application\n'
+ 'metadata:\n'
+ '  name: nginx-ingress\n'
+ '  namespace: argocd\n'
+ 'spec:\n'
+ '  project: infrastructure\n'
+ '  source:\n'
+ '    repoURL: https://kubernetes.github.io/ingress-nginx\n'
+ '    chart: ingress-nginx\n'
+ '    targetRevision: 4.9.1\n'
+ '    helm:\n'
+ '      releaseName: nginx-ingress\n'
+ '      valuesObject:\n'
+ '        controller:\n'
+ '          replicaCount: 3\n'
+ '          service:\n'
+ '            type: LoadBalancer\n'
+ '          metrics:\n'
+ '            enabled: true\n'
+ '  destination:\n'
+ '    server: https://kubernetes.default.svc\n'
+ '    namespace: ingress-nginx'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>Kustomize Integration</h3>
      <pre style={codeStyle}><code>{
'# Application using Kustomize overlays\n'
+ 'apiVersion: argoproj.io/v1alpha1\n'
+ 'kind: Application\n'
+ 'metadata:\n'
+ '  name: api-prod\n'
+ '  namespace: argocd\n'
+ 'spec:\n'
+ '  source:\n'
+ '    repoURL: https://github.com/org/manifests.git\n'
+ '    path: api/overlays/production\n'
+ '    targetRevision: main\n'
+ '    kustomize:\n'
+ '      namePrefix: prod-\n'
+ '      commonLabels:\n'
+ '        env: production\n'
+ '      images:\n'
+ '        - name=api-image\n'
+ '          newName=registry.example.com/api\n'
+ '          newTag=v2.5.0\n'
+ '  destination:\n'
+ '    server: https://kubernetes.default.svc\n'
+ '    namespace: api-production\n'
+ '\n'
+ '# Corresponding kustomization.yaml in the repo\n'
+ '# apiVersion: kustomize.config.k8s.io/v1beta1\n'
+ '# kind: Kustomization\n'
+ '# resources:\n'
+ '#   - ../../base\n'
+ '# patches:\n'
+ '#   - path: replica-patch.yaml\n'
+ '#   - path: resource-limits-patch.yaml'
      }</code></pre>

      {/* Section 15: CI/CD Pipeline Integration */}
      <h2 style={h2Style}>CI/CD Pipeline Integration</h2>
      <p style={pStyle}>
        In a GitOps workflow, CI and CD are cleanly separated. CI (GitHub Actions, GitLab CI, Jenkins) builds, tests, and pushes container images. CD is handled entirely by Argo CD watching the Git repo. The CI pipeline updates the image tag in the Git manifest repository, and Argo CD detects the change and syncs. This separation means CI never needs cluster credentials.
      </p>
      <pre style={codeStyle}><code>{
'# GitHub Actions CI pipeline that triggers Argo CD\n'
+ 'name: Build and Update Manifests\n'
+ 'on:\n'
+ '  push:\n'
+ '    branches: [main]\n'
+ '\n'
+ 'jobs:\n'
+ '  build:\n'
+ '    runs-on: ubuntu-latest\n'
+ '    steps:\n'
+ '      - uses: actions/checkout@v4\n'
+ '\n'
+ '      - name: Build and push image\n'
+ '        run: |\n'
+ '          docker build -t registry.example.com/app:$GITHUB_SHA .\n'
+ '          docker push registry.example.com/app:$GITHUB_SHA\n'
+ '\n'
+ '      - name: Update manifest repo\n'
+ '        run: |\n'
+ '          git clone https://github.com/org/k8s-manifests.git\n'
+ '          cd k8s-manifests\n'
+ '          # Update image tag in kustomization.yaml\n'
+ '          cd apps/web-app/overlays/production\n'
+ '          kustomize edit set image \\\n'
+ '            app=registry.example.com/app:$GITHUB_SHA\n'
+ '          git add .\n'
+ '          git commit -m "Update web-app to $GITHUB_SHA"\n'
+ '          git push\n'
+ '          # Argo CD detects change and syncs automatically'
      }</code></pre>

      <h3 style={h3Style}>Image Updater (Automatic Image Tag Updates)</h3>
      <p style={pStyle}>
        Argo CD Image Updater is a companion tool that watches container registries for new image tags and automatically updates the Application source. This eliminates the need for the CI pipeline to commit image tag changes to Git — the Image Updater handles it.
      </p>
      <pre style={codeStyle}><code>{
'# Application annotation for Image Updater\n'
+ 'metadata:\n'
+ '  annotations:\n'
+ '    argocd-image-updater.argoproj.io/image-list: |\n'
+ '      app=registry.example.com/app\n'
+ '    argocd-image-updater.argoproj.io/app.update-strategy: semver\n'
+ '    argocd-image-updater.argoproj.io/app.allow-tags: regexp:^v[0-9]+\\.[0-9]+\\.[0-9]+$\n'
+ '    argocd-image-updater.argoproj.io/write-back-method: git'
      }</code></pre>

      {/* Section 16: Disaster Recovery */}
      <h2 style={h2Style}>Disaster Recovery</h2>
      <p style={pStyle}>
        Since Argo CD follows the GitOps principle, disaster recovery is straightforward: your Git repositories contain the desired state of all applications. If the Argo CD installation is lost, reinstall it, reconnect the repositories, and all applications will be re-synced automatically. However, you should also back up Argo CD-specific configuration.
      </p>
      <pre style={codeStyle}><code>{
'# Export all Argo CD resources for backup\n'
+ 'argocd admin export -n argocd > argocd-backup.yaml\n'
+ '\n'
+ '# Back up specific resource types\n'
+ 'kubectl get applications -n argocd -o yaml > apps-backup.yaml\n'
+ 'kubectl get appprojects -n argocd -o yaml > projects-backup.yaml\n'
+ 'kubectl get secrets -n argocd -l argocd.argoproj.io/secret-type=repository -o yaml > repos-backup.yaml\n'
+ 'kubectl get secrets -n argocd -l argocd.argoproj.io/secret-type=cluster -o yaml > clusters-backup.yaml\n'
+ '\n'
+ '# Restore from backup\n'
+ 'argocd admin import -n argocd < argocd-backup.yaml\n'
+ '\n'
+ '# Best practice: Store Argo CD config as code\n'
+ '# Keep Application, AppProject, and config YAMLs\n'
+ '# in a dedicated Git repo managed by a bootstrap app'
      }</code></pre>

      {/* Section 17: Best Practices */}
      <h2 style={h2Style}>Best Practices</h2>
      <ul style={ulStyle}>
        <li><strong>Separate app repo from config repo</strong> — Keep application source code and Kubernetes manifests in separate Git repositories. CI builds images from the app repo; CD reads manifests from the config repo. This decouples application releases from infrastructure changes.</li>
        <li><strong>Use the App of Apps pattern</strong> — Define a root Application that points to a directory of Application manifests. When you add a new app, commit its Application YAML to this directory, and the root app auto-syncs it.</li>
        <li><strong>Enable automated sync with selfHeal for dev/staging</strong> — In non-production environments, automated sync with self-heal ensures the cluster always matches Git, catching manual changes immediately.</li>
        <li><strong>Use manual sync with approval gates for production</strong> — In production, require explicit sync approval. Combine with CI checks (passing tests, security scans) before the manifest repo is updated.</li>
        <li><strong>Pin targetRevision to tags or SHA in production</strong> — Avoid tracking HEAD of main in production. Pin to a specific Git tag or commit SHA for predictable, auditable deployments.</li>
        <li><strong>Leverage sync waves for dependency ordering</strong> — Ensure CRDs are created before custom resources, databases before apps, and config before deployments.</li>
        <li><strong>Set resource limits on Argo CD components</strong> — The Application Controller and Repo Server can be memory-intensive with hundreds of apps. Set appropriate resource requests and limits, and scale replicas horizontally.</li>
        <li><strong>Use Projects to enforce least-privilege</strong> — Restrict each teams project to specific repos, clusters, namespaces, and resource kinds. Deny cluster-scoped resources unless explicitly needed.</li>
        <li><strong>Integrate with Prometheus and Grafana</strong> — Argo CD exports Prometheus metrics. Monitor sync duration, sync failures, app health status, and API server request latency.</li>
        <li><strong>Adopt Progressive Delivery</strong> — Combine Argo CD with Argo Rollouts for canary deployments, blue-green releases, and traffic shifting experiments before full promotion.</li>
      </ul>

      {/* Section 18: Argo CD vs Flux */}
      <h2 style={h2Style}>Argo CD vs Flux: Choosing a GitOps Tool</h2>
      <p style={pStyle}>
        Argo CD and Flux are both CNCF graduated GitOps projects for Kubernetes. They share the same core principle (Git as source of truth, pull-based reconciliation) but differ significantly in architecture, user experience, and ecosystem integration.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Dimension</th>
            <th style={thStyle}>Argo CD</th>
            <th style={thStyle}>Flux</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Architecture</td><td style={tdStyle}>Monolithic: API Server + Controller + Repo Server</td><td style={tdStyle}>Microservices: source-controller, kustomize-controller, helm-controller, notification-controller</td></tr>
          <tr><td style={tdStyle}>Web UI</td><td style={tdStyle}>Built-in, feature-rich dashboard</td><td style={tdStyle}>No built-in UI (Weave GitOps is a third-party option)</td></tr>
          <tr><td style={tdStyle}>CRD Model</td><td style={tdStyle}>Application, AppProject, ApplicationSet</td><td style={tdStyle}>GitRepository, Kustomization, HelmRelease, HelmRepository</td></tr>
          <tr><td style={tdStyle}>Multi-Tenancy</td><td style={tdStyle}>Projects + RBAC + SSO</td><td style={tdStyle}>Namespace-scoped controllers + service account impersonation</td></tr>
          <tr><td style={tdStyle}>Helm Support</td><td style={tdStyle}>helm template (manifest generation)</td><td style={tdStyle}>Native helm install/upgrade via HelmRelease</td></tr>
          <tr><td style={tdStyle}>Progressive Delivery</td><td style={tdStyle}>Argo Rollouts (canary, blue-green)</td><td style={tdStyle}>Flagger (canary, A/B, blue-green)</td></tr>
          <tr><td style={tdStyle}>Image Automation</td><td style={tdStyle}>Argo CD Image Updater (add-on)</td><td style={tdStyle}>Built-in image-reflector + image-automation controllers</td></tr>
          <tr><td style={tdStyle}>Best For</td><td style={tdStyle}>Teams wanting UI, SSO/RBAC, multi-cluster visibility</td><td style={tdStyle}>Teams preferring minimal footprint, CLI-only, Kubernetes-native design</td></tr>
        </tbody>
      </table>

      {/* FAQ Section */}
      <h2 style={h2Style}>Frequently Asked Questions</h2>

      <h3 style={h3Style}>What is Argo CD and how does it differ from traditional CI/CD?</h3>
      <p style={pStyle}>
        Argo CD is a declarative GitOps continuous delivery tool for Kubernetes. Unlike traditional push-based CI/CD where a pipeline runs kubectl apply or helm upgrade, Argo CD uses a pull-based model. It runs inside the cluster, continuously watches Git repositories, compares the desired state in Git against the live cluster state, and reconciles any differences. This means Git becomes the single source of truth, all changes are auditable through Git history, drift is automatically detected, and CI pipelines never need direct cluster access.
      </p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>How do I install Argo CD?</h3>
      <p style={pStyle}>
        Install Argo CD by creating the argocd namespace and applying the official install manifest with kubectl. For production, use the Argo Helm chart with HA (high availability) configuration — multiple API Server replicas, Redis HA, and the Application Controller sharding feature for large-scale deployments. After installation, retrieve the initial admin password from the argocd-initial-admin-secret, port-forward or expose the server via Ingress, and log in.
      </p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>What are sync waves and hooks?</h3>
      <p style={pStyle}>
        Sync waves control resource application order during a sync. Annotate resources with argocd.argoproj.io/sync-wave and an integer value — lower values are applied first. Hooks (PreSync, Sync, PostSync, SyncFail) are Jobs that run at specific lifecycle phases. For example, use a PreSync hook for database migrations before the app deployment, and a PostSync hook for smoke tests after deployment completes.
      </p>

      <h3 style={{ ...h3Style, color: '#ec4899' }}>How does Argo CD handle secrets?</h3>
      <p style={pStyle}>
        Never commit plain-text secrets to Git. Use Sealed Secrets (encrypts secrets client-side; the controller decrypts in-cluster), External Secrets Operator (syncs secrets from AWS Secrets Manager, Vault, Azure Key Vault), or SOPS with age/GPG encryption. Argo CD syncs these encrypted or reference resources like any other manifest, and the respective controller resolves the actual secret values within the cluster.
      </p>

      <h3 style={h3Style}>What is the App of Apps pattern?</h3>
      <p style={pStyle}>
        The App of Apps pattern is a bootstrapping approach where a single root Application points to a Git directory containing other Application manifests. When Argo CD syncs the root app, it creates all child applications, which in turn sync their own resources. This enables managing your entire platform — infrastructure components, shared services, application deployments — from a single entry point. Adding a new application is as simple as committing a new Application YAML file.
      </p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>How does multi-cluster deployment work?</h3>
      <p style={pStyle}>
        Register external clusters using argocd cluster add, which creates a ServiceAccount on the target cluster and stores credentials in the Argo CD namespace. Applications can then target any registered cluster by specifying its server URL in the destination field. Combined with ApplicationSets and the cluster generator, you can deploy the same application to all clusters matching a label selector from a single Argo CD instance.
      </p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>When should I use ApplicationSets?</h3>
      <p style={pStyle}>
        Use ApplicationSets when you need to manage applications at scale: deploying across multiple clusters (cluster generator), managing microservices in a monorepo (Git directory generator), creating preview environments from pull requests (PR generator), or generating applications from a dynamic list of environments (list or matrix generator). ApplicationSets eliminate the need to manually create and maintain hundreds of Application CRDs.
      </p>

      <h3 style={{ ...h3Style, color: '#ec4899' }}>How does Argo CD compare to Flux?</h3>
      <p style={pStyle}>
        Both are CNCF graduated GitOps tools. Argo CD offers a rich web UI, built-in SSO/RBAC, multi-cluster management, and ApplicationSets — ideal for teams needing visibility and multi-tenancy. Flux uses a microservices architecture with separate controllers for sources, Kustomize, and Helm, and has built-in image automation. Flux suits teams preferring a minimal, CLI-driven, Kubernetes-native approach. For most teams starting with GitOps, Argo CD provides a smoother onboarding experience due to its UI and comprehensive feature set.
      </p>

      {/* Conclusion */}
      <h2 style={h2Style}>Conclusion</h2>
      <p style={pStyle}>
        Argo CD brings the principles of GitOps to Kubernetes continuous delivery, replacing fragile push-based scripts with a robust, auditable, self-healing reconciliation loop. By making Git the single source of truth, every deployment is versioned, every change is reviewable, and every rollback is a git revert. The combination of Application CRDs, sync policies, waves, hooks, ApplicationSets, and multi-cluster support makes Argo CD suitable for everything from a single-app startup to an enterprise platform managing thousands of microservices across global clusters. Start simple — one Application, one cluster, manual sync — and progressively adopt automation, ApplicationSets, and progressive delivery with Argo Rollouts as your needs grow.
      </p>
    </div>
  );
}
