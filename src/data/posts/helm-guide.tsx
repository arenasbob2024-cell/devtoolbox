'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Helm Complete Guide: Kubernetes Package Manager for Charts, Releases & Deployments',
    description: 'Master Helm from installation to production. Learn charts, releases, repositories, template language, values, dependencies, hooks, Helmfile, CI/CD integration, security, and Helm vs Kustomize.',
    tldr: 'Helm is the package manager for Kubernetes. It bundles manifests into reusable Charts with configurable values.yaml. Key commands: helm install (deploy), helm upgrade (update), helm rollback (revert), helm uninstall (remove). Charts use Go templates with built-in objects (.Values, .Release, .Chart). Use Helmfile for multi-release management, chart repositories (Artifact Hub, Harbor, ChartMuseum) for sharing, and helm-secrets or Cosign for security. Helm excels at complex multi-environment deployments; Kustomize is simpler for overlay-based patching.',
  },
  zh: {
    title: 'Helm 完整指南：Kubernetes 包管理器 — Chart、Release 与部署全解析',
    description: '从安装到生产环境全面掌握 Helm。学习 Chart、Release、仓库、模板语言、Values、依赖、Hooks、Helmfile、CI/CD 集成、安全性以及 Helm 与 Kustomize 的对比。',
    tldr: 'Helm 是 Kubernetes 的包管理器。它将清单文件打包为可复用的 Chart，通过 values.yaml 进行配置。核心命令：helm install（部署）、helm upgrade（更新）、helm rollback（回滚）、helm uninstall（卸载）。Chart 使用 Go 模板引擎和内置对象（.Values、.Release、.Chart）。使用 Helmfile 管理多个 Release，使用 Chart 仓库（Artifact Hub、Harbor、ChartMuseum）共享 Chart，使用 helm-secrets 或 Cosign 保障安全。Helm 擅长复杂的多环境部署；Kustomize 更适合基于 overlay 的补丁方案。',
  },
};

export default function HelmGuide({ lang }: { lang: string }) {
  const ct = translations[lang as keyof typeof translations] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is Helm and why do I need it for Kubernetes?', acceptedAnswer: { '@type': 'Answer', text: 'Helm is the package manager for Kubernetes, analogous to apt for Debian or npm for Node.js. It bundles related Kubernetes manifests (Deployments, Services, ConfigMaps, Secrets, etc.) into reusable, versioned packages called Charts. You need Helm when deploying complex applications with many interdependent resources, when you want per-environment configuration (dev/staging/prod) without duplicating YAML, or when installing community software like PostgreSQL, Redis, or Prometheus from Artifact Hub.' } },
      { '@type': 'Question', name: 'What is the difference between a Helm Chart and a Helm Release?', acceptedAnswer: { '@type': 'Answer', text: 'A Chart is a package — a collection of Kubernetes manifest templates plus a values.yaml file that defines configurable parameters. A Release is a running instance of a Chart deployed to a cluster. You can install the same Chart multiple times with different release names and values, creating multiple independent Releases. For example, one Redis Chart can produce a "redis-cache" release and a "redis-session" release with different configurations.' } },
      { '@type': 'Question', name: 'How do I install Helm on macOS, Linux, and Windows?', acceptedAnswer: { '@type': 'Answer', text: 'On macOS: brew install helm. On Linux: curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash, or use snap install helm --classic. On Windows: choco install kubernetes-helm or scoop install helm. Verify with helm version. Helm v3 is a single binary with no server-side component (Tiller was removed in v3).' } },
      { '@type': 'Question', name: 'What is the Helm template language and how does it work?', acceptedAnswer: { '@type': 'Answer', text: 'Helm templates use Go template syntax (text/template and sprig functions). Templates access built-in objects: .Values (user-supplied configuration), .Release (release metadata like name and namespace), .Chart (Chart.yaml metadata), and .Capabilities (cluster API versions). Common constructs include {{ .Values.image.tag }}, {{ if .Values.ingress.enabled }}, {{ range .Values.env }}, and pipeline functions like {{ .Values.name | quote }}.' } },
      { '@type': 'Question', name: 'How do I override values in Helm?', acceptedAnswer: { '@type': 'Answer', text: 'Values can be overridden in multiple ways with increasing precedence: (1) default values.yaml in the chart, (2) parent chart values.yaml, (3) -f or --values flag pointing to a YAML file (helm install -f prod-values.yaml), (4) --set flag for individual values (helm install --set replicas=3), (5) --set-string for string values, (6) --set-file for file contents. Multiple -f flags merge left to right. Use helm show values <chart> to see all available defaults.' } },
      { '@type': 'Question', name: 'What are Helm hooks and when should I use them?', acceptedAnswer: { '@type': 'Answer', text: 'Helm hooks are special resources annotated with helm.sh/hook that run at specific points in the release lifecycle: pre-install, post-install, pre-upgrade, post-upgrade, pre-delete, post-delete, pre-rollback, post-rollback, and test. Common uses include database migrations (pre-upgrade), cache warming (post-install), backup before upgrade (pre-upgrade), and integration tests (test). Hooks run as Jobs and can have weights for ordering and delete policies for cleanup.' } },
      { '@type': 'Question', name: 'What is Helmfile and how does it differ from Helm?', acceptedAnswer: { '@type': 'Answer', text: 'Helmfile is a declarative tool that manages multiple Helm releases as code. While Helm deploys individual charts, Helmfile orchestrates many releases defined in a helmfile.yaml. It supports environments (dev/staging/prod), release dependencies, conditional releases, and synchronized apply/destroy across releases. Think of Helmfile as a Terraform for Helm releases — you declare your desired state and Helmfile converges the cluster to match.' } },
      { '@type': 'Question', name: 'Should I use Helm or Kustomize for Kubernetes deployments?', acceptedAnswer: { '@type': 'Answer', text: 'Use Helm when you need: reusable packages shared across teams or the community, complex parameterization with conditionals and loops, release lifecycle management (install/upgrade/rollback/history), and chart dependencies. Use Kustomize when you need: simple overlay-based patching of existing YAML, no templating language, kubectl-native workflow (kubectl apply -k), and straightforward base+overlay directory structures. Many teams use both: Helm for third-party software and Kustomize for in-house applications, or Helm to render templates and Kustomize to apply environment-specific patches.' } },
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
          <li>Helm packages Kubernetes manifests into reusable Charts with configurable values and versioned releases.</li>
          <li>Core commands: helm install, helm upgrade, helm rollback, helm uninstall, helm list, helm repo, helm search.</li>
          <li>Charts use Go template syntax with built-in objects: .Values, .Release, .Chart, .Capabilities.</li>
          <li>Override values via -f values-file.yaml or --set key=value; multiple sources merge with defined precedence.</li>
          <li>Hooks (pre-install, post-upgrade, etc.) run Jobs at lifecycle points for migrations, backups, and tests.</li>
          <li>Helmfile manages multiple releases declaratively; chart repos (Harbor, ChartMuseum) enable team sharing.</li>
          <li>Helm excels at parameterized packaging; Kustomize excels at overlay patching. Many teams use both.</li>
        </ul>
      </div>

      {/* Section 1: What Is Helm */}
      <h2 style={h2Style}>What Is Helm?</h2>
      <p style={pStyle}>
        Helm is the package manager for Kubernetes. Just as apt manages packages on Debian, npm manages packages for Node.js, and Homebrew manages packages on macOS, Helm manages packages for Kubernetes clusters. A Helm package is called a <strong>Chart</strong> &mdash; a collection of Kubernetes manifest templates bundled with default configuration values and metadata.
      </p>
      <p style={pStyle}>
        Without Helm, deploying a production application to Kubernetes means writing and maintaining dozens of YAML files &mdash; Deployments, Services, ConfigMaps, Secrets, Ingress, PersistentVolumeClaims, ServiceAccounts, RBAC roles, and more. When you need the same application in dev, staging, and production with different configurations, you end up duplicating YAML or writing brittle sed scripts. Helm solves this by parameterizing your manifests: you write templates once, and customize each deployment through a values file.
      </p>
      <p style={pStyle}>
        Helm v3 (the current major version since 2019) removed the server-side Tiller component that was required in v2, making Helm a purely client-side tool. It stores release state as Kubernetes Secrets in the target namespace, uses three-way strategic merge patches for upgrades, and supports OCI registries for chart distribution.
      </p>

      {/* Section 2: Installation */}
      <h2 style={h2Style}>Installing Helm</h2>
      <p style={pStyle}>
        Helm is distributed as a single binary. Install it on any platform and verify the installation with <code>helm version</code>.
      </p>
      <pre style={codeStyle}><code>{
'# ── macOS ────────────────────────────────────────────────────────\n'
+ 'brew install helm\n'
+ '\n'
+ '# ── Linux (official script) ───────────────────────────────────\n'
+ 'curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash\n'
+ '\n'
+ '# ── Linux (snap) ─────────────────────────────────────────────\n'
+ 'sudo snap install helm --classic\n'
+ '\n'
+ '# ── Windows (Chocolatey) ─────────────────────────────────────\n'
+ 'choco install kubernetes-helm\n'
+ '\n'
+ '# ── Windows (Scoop) ──────────────────────────────────────────\n'
+ 'scoop install helm\n'
+ '\n'
+ '# ── Verify installation ──────────────────────────────────────\n'
+ 'helm version\n'
+ '# version.BuildInfo{Version:"v3.16.x", ...}\n'
+ '\n'
+ '# ── Shell completion ─────────────────────────────────────────\n'
+ 'helm completion bash > /etc/bash_completion.d/helm\n'
+ 'helm completion zsh > "\${fpath[1]}/_helm"'
      }</code></pre>

      {/* Section 3: Core Concepts */}
      <h2 style={h2Style}>Helm Core Concepts: Charts, Releases, and Repositories</h2>

      <h3 style={h3Style}>Charts</h3>
      <p style={pStyle}>
        A Chart is a directory (or .tgz archive) containing all the Kubernetes resource definitions needed to run an application. Every chart has a <code>Chart.yaml</code> (metadata), a <code>values.yaml</code> (default configuration), and a <code>templates/</code> directory containing Go-templated Kubernetes manifests.
      </p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>Releases</h3>
      <p style={pStyle}>
        A Release is a running instance of a Chart in a Kubernetes cluster. When you run <code>helm install my-app ./my-chart</code>, Helm creates a release named &quot;my-app&quot;. You can install the same chart multiple times with different release names and different values, each producing an independent set of Kubernetes resources. Each release has a revision history, enabling upgrades and rollbacks.
      </p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>Repositories</h3>
      <p style={pStyle}>
        A Repository is an HTTP server or OCI registry that hosts packaged charts. Artifact Hub (<code>artifacthub.io</code>) is the public discovery portal aggregating charts from hundreds of repositories. You can also run private repositories using Harbor, ChartMuseum, or any OCI-compatible registry (Docker Hub, GitHub Container Registry, AWS ECR).
      </p>

      <pre style={codeStyle}><code>{
'# Helm Concepts Overview\n'
+ '#\n'
+ '# Chart (Package)      ──install──▶  Release (Instance)\n'
+ '#   Chart.yaml                         my-app (rev 1)\n'
+ '#   values.yaml         ──upgrade──▶  my-app (rev 2)\n'
+ '#   templates/                          \n'
+ '#     deployment.yaml   ──rollback──▶ my-app (rev 1)\n'
+ '#     service.yaml\n'
+ '#     ingress.yaml      ──uninstall──▶ (deleted)\n'
+ '#\n'
+ '# Repository: where charts are stored and shared\n'
+ '#   artifacthub.io  |  Harbor  |  ChartMuseum  |  OCI Registry'
      }</code></pre>

      {/* Section 4: Essential Helm Commands */}
      <h2 style={h2Style}>Essential Helm Commands</h2>

      <h3 style={h3Style}>Repository Management</h3>
      <pre style={codeStyle}><code>{
'# Add a chart repository\n'
+ 'helm repo add bitnami https://charts.bitnami.com/bitnami\n'
+ 'helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx\n'
+ 'helm repo add jetstack https://charts.jetstack.io\n'
+ '\n'
+ '# Update local repo index\n'
+ 'helm repo update\n'
+ '\n'
+ '# List configured repos\n'
+ 'helm repo list\n'
+ '\n'
+ '# Search for charts\n'
+ 'helm search repo redis              # Search local repos\n'
+ 'helm search hub wordpress           # Search Artifact Hub\n'
+ 'helm search repo bitnami/postgresql --versions  # All versions'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>Install, Upgrade, Rollback, Uninstall</h3>
      <pre style={codeStyle}><code>{
'# ── Install a chart ──────────────────────────────────────────\n'
+ 'helm install my-redis bitnami/redis \\\n'
+ '  --namespace caching --create-namespace \\\n'
+ '  --set auth.password=supersecret \\\n'
+ '  --set replica.replicaCount=3\n'
+ '\n'
+ '# Install with custom values file\n'
+ 'helm install my-app ./my-chart -f prod-values.yaml\n'
+ '\n'
+ '# Dry-run to preview (no actual install)\n'
+ 'helm install my-app ./my-chart --dry-run --debug\n'
+ '\n'
+ '# ── List releases ─────────────────────────────────────────\n'
+ 'helm list                           # Current namespace\n'
+ 'helm list -A                        # All namespaces\n'
+ 'helm list --failed                  # Only failed releases\n'
+ '\n'
+ '# ── Upgrade a release ─────────────────────────────────────\n'
+ 'helm upgrade my-redis bitnami/redis \\\n'
+ '  --set replica.replicaCount=5\n'
+ '\n'
+ 'helm upgrade my-app ./my-chart -f prod-values.yaml\n'
+ '\n'
+ '# Install if not exists, upgrade if exists\n'
+ 'helm upgrade --install my-app ./my-chart -f values.yaml\n'
+ '\n'
+ '# ── Rollback ──────────────────────────────────────────────\n'
+ 'helm history my-redis               # Show revision history\n'
+ 'helm rollback my-redis 1            # Rollback to revision 1\n'
+ 'helm rollback my-redis 0            # Rollback to previous\n'
+ '\n'
+ '# ── Uninstall ─────────────────────────────────────────────\n'
+ 'helm uninstall my-redis\n'
+ 'helm uninstall my-redis --keep-history  # Keep release history'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>Inspect and Debug</h3>
      <pre style={codeStyle}><code>{
'# Show chart info\n'
+ 'helm show chart bitnami/redis       # Chart.yaml metadata\n'
+ 'helm show values bitnami/redis      # Default values.yaml\n'
+ 'helm show readme bitnami/redis      # README\n'
+ 'helm show all bitnami/redis         # Everything\n'
+ '\n'
+ '# View release details\n'
+ 'helm get values my-redis            # User-supplied values\n'
+ 'helm get values my-redis --all      # All values (merged)\n'
+ 'helm get manifest my-redis          # Rendered K8s manifests\n'
+ 'helm get notes my-redis             # Post-install notes\n'
+ '\n'
+ '# Render templates locally without installing\n'
+ 'helm template my-app ./my-chart -f values.yaml\n'
+ 'helm template my-app ./my-chart --debug  # With debug info'
      }</code></pre>

      {/* Section 5: Creating Charts */}
      <h2 style={h2Style}>Creating Your Own Helm Chart</h2>
      <p style={pStyle}>
        Use <code>helm create</code> to scaffold a new chart. This generates a complete directory structure with best-practice defaults including a Deployment, Service, Ingress, ServiceAccount, and HPA templates.
      </p>

      <pre style={codeStyle}><code>{
'# Scaffold a new chart\n'
+ 'helm create my-app\n'
+ '\n'
+ '# Generated structure:\n'
+ 'my-app/\n'
+ '  Chart.yaml          # Chart metadata (name, version, deps)\n'
+ '  values.yaml         # Default configuration values\n'
+ '  charts/             # Dependency charts (subcharts)\n'
+ '  templates/          # Go-templated Kubernetes manifests\n'
+ '    deployment.yaml\n'
+ '    service.yaml\n'
+ '    ingress.yaml\n'
+ '    serviceaccount.yaml\n'
+ '    hpa.yaml\n'
+ '    NOTES.txt          # Post-install instructions\n'
+ '    _helpers.tpl        # Reusable template snippets\n'
+ '    tests/\n'
+ '      test-connection.yaml'
      }</code></pre>

      <h3 style={h3Style}>Chart.yaml</h3>
      <pre style={codeStyle}><code>{
'apiVersion: v2\n'
+ 'name: my-app\n'
+ 'description: A Helm chart for My Application\n'
+ 'type: application          # "application" or "library"\n'
+ 'version: 0.1.0             # Chart version (SemVer)\n'
+ 'appVersion: "1.16.0"       # App version (informational)\n'
+ 'keywords:\n'
+ '  - web\n'
+ '  - api\n'
+ 'maintainers:\n'
+ '  - name: DevOps Team\n'
+ '    email: devops@example.com\n'
+ 'dependencies:\n'
+ '  - name: postgresql\n'
+ '    version: "~13.0"\n'
+ '    repository: https://charts.bitnami.com/bitnami\n'
+ '    condition: postgresql.enabled'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>values.yaml</h3>
      <pre style={codeStyle}><code>{
'# Default values for my-app\n'
+ 'replicaCount: 2\n'
+ '\n'
+ 'image:\n'
+ '  repository: myregistry.io/my-app\n'
+ '  tag: "latest"\n'
+ '  pullPolicy: IfNotPresent\n'
+ '\n'
+ 'service:\n'
+ '  type: ClusterIP\n'
+ '  port: 80\n'
+ '\n'
+ 'ingress:\n'
+ '  enabled: false\n'
+ '  host: my-app.example.com\n'
+ '  tls: []\n'
+ '\n'
+ 'resources:\n'
+ '  requests:\n'
+ '    cpu: 100m\n'
+ '    memory: 128Mi\n'
+ '  limits:\n'
+ '    cpu: 500m\n'
+ '    memory: 256Mi\n'
+ '\n'
+ 'env:\n'
+ '  - name: NODE_ENV\n'
+ '    value: production\n'
+ '  - name: LOG_LEVEL\n'
+ '    value: info\n'
+ '\n'
+ 'postgresql:\n'
+ '  enabled: true\n'
+ '  auth:\n'
+ '    database: myapp\n'
+ '    username: appuser'
      }</code></pre>

      {/* Section 6: Template Language */}
      <h2 style={h2Style}>Helm Template Language</h2>
      <p style={pStyle}>
        Helm uses the Go template engine (<code>text/template</code>) extended with Sprig functions and custom Helm functions. Templates are rendered before being sent to Kubernetes, producing valid YAML manifests. Understanding the template language is essential for creating flexible, production-grade charts.
      </p>

      <h3 style={h3Style}>Built-in Objects</h3>
      <ul style={ulStyle}>
        <li><strong>.Values</strong> &mdash; user-supplied configuration merged from values.yaml, -f files, and --set flags.</li>
        <li><strong>.Release</strong> &mdash; release metadata: .Release.Name, .Release.Namespace, .Release.Revision, .Release.IsUpgrade, .Release.IsInstall.</li>
        <li><strong>.Chart</strong> &mdash; contents of Chart.yaml: .Chart.Name, .Chart.Version, .Chart.AppVersion.</li>
        <li><strong>.Capabilities</strong> &mdash; cluster info: .Capabilities.KubeVersion, .Capabilities.APIVersions.</li>
        <li><strong>.Template</strong> &mdash; current template info: .Template.Name, .Template.BasePath.</li>
        <li><strong>.Files</strong> &mdash; access non-template files in the chart: .Files.Get, .Files.GetBytes, .Files.AsConfig.</li>
      </ul>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>Template Syntax and Functions</h3>
      <pre style={codeStyle}><code>{
'# templates/deployment.yaml\n'
+ 'apiVersion: apps/v1\n'
+ 'kind: Deployment\n'
+ 'metadata:\n'
+ '  name: {{ include "my-app.fullname" . }}\n'
+ '  labels:\n'
+ '    {{- include "my-app.labels" . | nindent 4 }}\n'
+ 'spec:\n'
+ '  replicas: {{ .Values.replicaCount }}\n'
+ '  selector:\n'
+ '    matchLabels:\n'
+ '      {{- include "my-app.selectorLabels" . | nindent 6 }}\n'
+ '  template:\n'
+ '    metadata:\n'
+ '      labels:\n'
+ '        {{- include "my-app.selectorLabels" . | nindent 8 }}\n'
+ '    spec:\n'
+ '      containers:\n'
+ '        - name: {{ .Chart.Name }}\n'
+ '          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"\n'
+ '          ports:\n'
+ '            - containerPort: {{ .Values.service.port }}\n'
+ '          {{- if .Values.resources }}\n'
+ '          resources:\n'
+ '            {{- toYaml .Values.resources | nindent 12 }}\n'
+ '          {{- end }}\n'
+ '          {{- if .Values.env }}\n'
+ '          env:\n'
+ '            {{- range .Values.env }}\n'
+ '            - name: {{ .name }}\n'
+ '              value: {{ .value | quote }}\n'
+ '            {{- end }}\n'
+ '          {{- end }}'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>Pipelines and Sprig Functions</h3>
      <pre style={codeStyle}><code>{
'# ── Pipelines: chain functions with | ─────────────────────────\n'
+ '{{ .Values.name | upper | quote }}         # "MY-APP"\n'
+ '{{ .Values.name | default "fallback" }}    # Use fallback if empty\n'
+ '{{ .Values.port | int }}                   # Cast to integer\n'
+ '\n'
+ '# ── String functions ───────────────────────────────────────────\n'
+ '{{ trim .Values.name }}\n'
+ '{{ trimSuffix "-" .Values.name }}\n'
+ '{{ printf "%s-%s" .Release.Name .Chart.Name }}\n'
+ '{{ .Values.name | replace "-" "_" }}\n'
+ '\n'
+ '# ── Conditionals ──────────────────────────────────────────────\n'
+ '{{- if .Values.ingress.enabled }}\n'
+ 'apiVersion: networking.k8s.io/v1\n'
+ 'kind: Ingress\n'
+ '...\n'
+ '{{- end }}\n'
+ '\n'
+ '{{- if and .Values.tls.enabled .Values.tls.secret }}\n'
+ '  tls:\n'
+ '    - secretName: {{ .Values.tls.secret }}\n'
+ '{{- else if .Values.tls.enabled }}\n'
+ '  tls:\n'
+ '    - secretName: {{ .Release.Name }}-tls\n'
+ '{{- end }}\n'
+ '\n'
+ '# ── Range (iteration) ─────────────────────────────────────────\n'
+ '{{- range .Values.ingress.hosts }}\n'
+ '  - host: {{ .host | quote }}\n'
+ '    http:\n'
+ '      paths:\n'
+ '        {{- range .paths }}\n'
+ '        - path: {{ .path }}\n'
+ '          pathType: {{ .pathType }}\n'
+ '        {{- end }}\n'
+ '{{- end }}\n'
+ '\n'
+ '# ── toYaml for nested structures ──────────────────────────────\n'
+ '{{- with .Values.nodeSelector }}\n'
+ '      nodeSelector:\n'
+ '        {{- toYaml . | nindent 8 }}\n'
+ '{{- end }}'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>Named Templates (_helpers.tpl)</h3>
      <pre style={codeStyle}><code>{
'# templates/_helpers.tpl\n'
+ '{{- define "my-app.fullname" -}}\n'
+ '{{- if .Values.fullnameOverride }}\n'
+ '{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}\n'
+ '{{- else }}\n'
+ '{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" }}\n'
+ '{{- end }}\n'
+ '{{- end }}\n'
+ '\n'
+ '{{- define "my-app.labels" -}}\n'
+ 'helm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" }}\n'
+ '{{ include "my-app.selectorLabels" . }}\n'
+ 'app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}\n'
+ 'app.kubernetes.io/managed-by: {{ .Release.Service }}\n'
+ '{{- end }}\n'
+ '\n'
+ '{{- define "my-app.selectorLabels" -}}\n'
+ 'app.kubernetes.io/name: {{ .Chart.Name }}\n'
+ 'app.kubernetes.io/instance: {{ .Release.Name }}\n'
+ '{{- end }}'
      }</code></pre>

      {/* Section 7: Values & Overrides */}
      <h2 style={h2Style}>Values and Overrides</h2>
      <p style={pStyle}>
        Helm merges values from multiple sources with a defined precedence. Understanding this merge order is critical for managing per-environment configurations correctly.
      </p>

      <pre style={codeStyle}><code>{
'# Value precedence (lowest to highest):\n'
+ '# 1. Chart default values.yaml\n'
+ '# 2. Parent chart values (if subchart)\n'
+ '# 3. -f / --values files (left to right)\n'
+ '# 4. --set / --set-string / --set-file flags\n'
+ '\n'
+ '# ── Per-environment values files ─────────────────────────────\n'
+ '# values.yaml          (defaults)\n'
+ '# values-dev.yaml      (dev overrides)\n'
+ '# values-staging.yaml  (staging overrides)\n'
+ '# values-prod.yaml     (production overrides)\n'
+ '\n'
+ '# Deploy to staging:\n'
+ 'helm upgrade --install my-app ./my-chart \\\n'
+ '  -f values.yaml \\\n'
+ '  -f values-staging.yaml \\\n'
+ '  --namespace staging\n'
+ '\n'
+ '# Deploy to production with an extra override:\n'
+ 'helm upgrade --install my-app ./my-chart \\\n'
+ '  -f values.yaml \\\n'
+ '  -f values-prod.yaml \\\n'
+ '  --set image.tag=v2.5.0 \\\n'
+ '  --namespace production\n'
+ '\n'
+ '# View all merged values for a release:\n'
+ 'helm get values my-app --all\n'
+ '\n'
+ '# Show chart defaults:\n'
+ 'helm show values bitnami/redis > redis-defaults.yaml'
      }</code></pre>

      {/* Section 8: Dependencies & Subcharts */}
      <h2 style={h2Style}>Dependencies and Subcharts</h2>
      <p style={pStyle}>
        Charts can depend on other charts. Dependencies are declared in <code>Chart.yaml</code> and downloaded into the <code>charts/</code> directory. This lets you compose complex applications (e.g., your app + PostgreSQL + Redis) as a single deployable unit.
      </p>

      <pre style={codeStyle}><code>{
'# Chart.yaml dependencies section\n'
+ 'dependencies:\n'
+ '  - name: postgresql\n'
+ '    version: "~13.0"\n'
+ '    repository: https://charts.bitnami.com/bitnami\n'
+ '    condition: postgresql.enabled\n'
+ '  - name: redis\n'
+ '    version: "~18.0"\n'
+ '    repository: https://charts.bitnami.com/bitnami\n'
+ '    condition: redis.enabled\n'
+ '  - name: common\n'
+ '    version: "~2.0"\n'
+ '    repository: https://charts.bitnami.com/bitnami\n'
+ '    tags:\n'
+ '      - infrastructure\n'
+ '\n'
+ '# ── Manage dependencies ──────────────────────────────────────\n'
+ 'helm dependency update ./my-chart   # Download deps to charts/\n'
+ 'helm dependency list ./my-chart     # List deps and status\n'
+ 'helm dependency build ./my-chart    # Rebuild Chart.lock\n'
+ '\n'
+ '# ── Override subchart values in parent values.yaml ───────────\n'
+ '# values.yaml\n'
+ 'postgresql:\n'
+ '  enabled: true\n'
+ '  auth:\n'
+ '    database: myapp\n'
+ '    username: appuser\n'
+ '    password: secret123\n'
+ '  primary:\n'
+ '    persistence:\n'
+ '      size: 20Gi\n'
+ '\n'
+ 'redis:\n'
+ '  enabled: true\n'
+ '  auth:\n'
+ '    enabled: false\n'
+ '  replica:\n'
+ '    replicaCount: 2'
      }</code></pre>

      {/* Section 9: Helm Hooks */}
      <h2 style={h2Style}>Helm Hooks</h2>
      <p style={pStyle}>
        Hooks let you run operations at specific points in the release lifecycle. They are standard Kubernetes resources with special annotations that tell Helm when to execute them. Common use cases include database migrations before an upgrade, cache warming after an install, and backups before a delete.
      </p>

      <ul style={ulStyle}>
        <li><strong>pre-install</strong> &mdash; runs after templates are rendered but before any resources are created.</li>
        <li><strong>post-install</strong> &mdash; runs after all resources are created and ready.</li>
        <li><strong>pre-upgrade</strong> &mdash; runs before an upgrade (ideal for database migrations and backups).</li>
        <li><strong>post-upgrade</strong> &mdash; runs after upgrade is complete.</li>
        <li><strong>pre-delete / post-delete</strong> &mdash; runs before/after release deletion.</li>
        <li><strong>pre-rollback / post-rollback</strong> &mdash; runs before/after a rollback operation.</li>
        <li><strong>test</strong> &mdash; runs when <code>helm test</code> is invoked.</li>
      </ul>

      <pre style={codeStyle}><code>{
'# templates/db-migration-hook.yaml\n'
+ 'apiVersion: batch/v1\n'
+ 'kind: Job\n'
+ 'metadata:\n'
+ '  name: {{ include "my-app.fullname" . }}-db-migrate\n'
+ '  annotations:\n'
+ '    "helm.sh/hook": pre-upgrade,pre-install\n'
+ '    "helm.sh/hook-weight": "0"       # Lower runs first\n'
+ '    "helm.sh/hook-delete-policy": before-hook-creation\n'
+ 'spec:\n'
+ '  backoffLimit: 3\n'
+ '  template:\n'
+ '    spec:\n'
+ '      restartPolicy: Never\n'
+ '      containers:\n'
+ '        - name: migrate\n'
+ '          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"\n'
+ '          command: ["npm", "run", "db:migrate"]\n'
+ '          env:\n'
+ '            - name: DATABASE_URL\n'
+ '              valueFrom:\n'
+ '                secretKeyRef:\n'
+ '                  name: {{ include "my-app.fullname" . }}-db\n'
+ '                  key: url\n'
+ '\n'
+ '# Hook delete policies:\n'
+ '#   before-hook-creation  - delete previous hook before new one\n'
+ '#   hook-succeeded        - delete after success\n'
+ '#   hook-failed           - delete after failure'
      }</code></pre>

      {/* Section 10: Chart Testing */}
      <h2 style={h2Style}>Chart Testing</h2>
      <p style={pStyle}>
        Helm supports built-in testing via the <code>helm test</code> command. Test resources are annotated with <code>helm.sh/hook: test</code> and typically verify that the deployed application is reachable and functioning correctly.
      </p>

      <pre style={codeStyle}><code>{
'# templates/tests/test-connection.yaml\n'
+ 'apiVersion: v1\n'
+ 'kind: Pod\n'
+ 'metadata:\n'
+ '  name: {{ include "my-app.fullname" . }}-test\n'
+ '  annotations:\n'
+ '    "helm.sh/hook": test\n'
+ 'spec:\n'
+ '  restartPolicy: Never\n'
+ '  containers:\n'
+ '    - name: wget\n'
+ '      image: busybox:latest\n'
+ '      command:\n'
+ '        - /bin/sh\n'
+ '        - -c\n'
+ '        - |\n'
+ '          wget -qO- http://{{ include "my-app.fullname" . }}:{{ .Values.service.port }}/health\n'
+ '          if [ \\$? -eq 0 ]; then echo "PASS"; else echo "FAIL" && exit 1; fi\n'
+ '\n'
+ '# Run tests\n'
+ 'helm test my-app\n'
+ 'helm test my-app --logs    # Show test pod logs\n'
+ '\n'
+ '# ── Lint and validate ────────────────────────────────────────\n'
+ 'helm lint ./my-chart               # Check chart for issues\n'
+ 'helm lint ./my-chart -f values-prod.yaml  # Lint with values\n'
+ '\n'
+ '# Validate rendered templates with kubeval or kubeconform\n'
+ 'helm template my-app ./my-chart | kubeconform -strict'
      }</code></pre>

      {/* Section 11: Helmfile */}
      <h2 style={h2Style}>Helmfile: Managing Multiple Releases</h2>
      <p style={pStyle}>
        Helmfile is a declarative specification for deploying multiple Helm charts. It defines a desired state of Helm releases and lets you apply, diff, and destroy them as a group. Think of it as a Terraform for Helm releases &mdash; you declare what you want, and Helmfile reconciles the cluster to match.
      </p>

      <pre style={codeStyle}><code>{
'# helmfile.yaml\n'
+ 'repositories:\n'
+ '  - name: bitnami\n'
+ '    url: https://charts.bitnami.com/bitnami\n'
+ '  - name: ingress-nginx\n'
+ '    url: https://kubernetes.github.io/ingress-nginx\n'
+ '\n'
+ 'environments:\n'
+ '  dev:\n'
+ '    values:\n'
+ '      - env/dev.yaml\n'
+ '  staging:\n'
+ '    values:\n'
+ '      - env/staging.yaml\n'
+ '  production:\n'
+ '    values:\n'
+ '      - env/production.yaml\n'
+ '\n'
+ 'releases:\n'
+ '  - name: ingress\n'
+ '    chart: ingress-nginx/ingress-nginx\n'
+ '    namespace: ingress-system\n'
+ '    version: 4.10.x\n'
+ '    values:\n'
+ '      - ingress-values.yaml\n'
+ '\n'
+ '  - name: my-api\n'
+ '    chart: ./charts/my-api\n'
+ '    namespace: {{ .Environment.Name }}\n'
+ '    values:\n'
+ '      - charts/my-api/values.yaml\n'
+ '      - charts/my-api/values-{{ .Environment.Name }}.yaml\n'
+ '    set:\n'
+ '      - name: image.tag\n'
+ '        value: {{ requiredEnv "IMAGE_TAG" }}\n'
+ '\n'
+ '  - name: database\n'
+ '    chart: bitnami/postgresql\n'
+ '    namespace: {{ .Environment.Name }}\n'
+ '    version: 13.x\n'
+ '    condition: database.enabled\n'
+ '    values:\n'
+ '      - db-values.yaml\n'
+ '\n'
+ '# ── Helmfile commands ────────────────────────────────────────\n'
+ '# helmfile -e staging sync        # Apply all releases\n'
+ '# helmfile -e production diff     # Preview changes\n'
+ '# helmfile -e dev destroy         # Remove all releases\n'
+ '# helmfile -e staging apply       # Sync with confirmation\n'
+ '# helmfile -l name=my-api sync    # Sync specific release'
      }</code></pre>

      {/* Section 12: Chart Repositories */}
      <h2 style={h2Style}>Chart Repositories: Harbor, ChartMuseum, and OCI</h2>
      <p style={pStyle}>
        For teams that need private chart hosting, several options exist beyond the public Artifact Hub. Harbor provides enterprise-grade registry features. ChartMuseum is a lightweight chart server. Modern Helm also supports OCI registries natively.
      </p>

      <pre style={codeStyle}><code>{
'# ── ChartMuseum (lightweight chart server) ───────────────────\n'
+ '# Install ChartMuseum\n'
+ 'helm repo add chartmuseum https://chartmuseum.github.io/charts\n'
+ 'helm install chartmuseum chartmuseum/chartmuseum \\\n'
+ '  --set env.open.DISABLE_API=false \\\n'
+ '  --set persistence.enabled=true\n'
+ '\n'
+ '# Push a chart to ChartMuseum\n'
+ 'helm package ./my-chart\n'
+ 'curl --data-binary "@my-chart-0.1.0.tgz" \\\n'
+ '  http://chartmuseum.example.com/api/charts\n'
+ '\n'
+ '# ── OCI Registry (Docker Hub, GHCR, ECR, Harbor) ────────────\n'
+ '# Login to registry\n'
+ 'helm registry login ghcr.io -u USERNAME\n'
+ '\n'
+ '# Package and push\n'
+ 'helm package ./my-chart\n'
+ 'helm push my-chart-0.1.0.tgz oci://ghcr.io/myorg/charts\n'
+ '\n'
+ '# Pull and install from OCI\n'
+ 'helm pull oci://ghcr.io/myorg/charts/my-chart --version 0.1.0\n'
+ 'helm install my-app oci://ghcr.io/myorg/charts/my-chart \\\n'
+ '  --version 0.1.0\n'
+ '\n'
+ '# ── Harbor (enterprise registry) ────────────────────────────\n'
+ 'helm repo add harbor https://harbor.example.com/chartrepo/myproject\n'
+ 'helm push my-chart-0.1.0.tgz harbor'
      }</code></pre>

      {/* Section 13: Helm with CI/CD */}
      <h2 style={h2Style}>Helm with CI/CD: GitHub Actions and ArgoCD</h2>

      <h3 style={h3Style}>GitHub Actions</h3>
      <pre style={codeStyle}><code>{
'# .github/workflows/helm-deploy.yaml\n'
+ 'name: Deploy with Helm\n'
+ 'on:\n'
+ '  push:\n'
+ '    branches: [main]\n'
+ '\n'
+ 'jobs:\n'
+ '  deploy:\n'
+ '    runs-on: ubuntu-latest\n'
+ '    steps:\n'
+ '      - uses: actions/checkout@v4\n'
+ '\n'
+ '      - name: Set up Helm\n'
+ '        uses: azure/setup-helm@v4\n'
+ '        with:\n'
+ '          version: v3.16.0\n'
+ '\n'
+ '      - name: Configure kubeconfig\n'
+ '        run: |\n'
+ '          mkdir -p \\$HOME/.kube\n'
+ '          echo "\\${{ secrets.KUBECONFIG }}" > \\$HOME/.kube/config\n'
+ '\n'
+ '      - name: Helm lint\n'
+ '        run: helm lint ./charts/my-app\n'
+ '\n'
+ '      - name: Deploy to staging\n'
+ '        run: |\n'
+ '          helm upgrade --install my-app ./charts/my-app \\\n'
+ '            -f charts/my-app/values-staging.yaml \\\n'
+ '            --set image.tag=\\${{ github.sha }} \\\n'
+ '            --namespace staging \\\n'
+ '            --wait --timeout 5m'
      }</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>ArgoCD with Helm</h3>
      <pre style={codeStyle}><code>{
'# argocd-application.yaml\n'
+ 'apiVersion: argoproj.io/v1alpha1\n'
+ 'kind: Application\n'
+ 'metadata:\n'
+ '  name: my-app\n'
+ '  namespace: argocd\n'
+ 'spec:\n'
+ '  project: default\n'
+ '  source:\n'
+ '    repoURL: https://github.com/myorg/my-app.git\n'
+ '    targetRevision: main\n'
+ '    path: charts/my-app\n'
+ '    helm:\n'
+ '      valueFiles:\n'
+ '        - values-production.yaml\n'
+ '      parameters:\n'
+ '        - name: image.tag\n'
+ '          value: v2.5.0\n'
+ '  destination:\n'
+ '    server: https://kubernetes.default.svc\n'
+ '    namespace: production\n'
+ '  syncPolicy:\n'
+ '    automated:\n'
+ '      prune: true\n'
+ '      selfHeal: true\n'
+ '    syncOptions:\n'
+ '      - CreateNamespace=true'
      }</code></pre>

      {/* Section 14: Security */}
      <h2 style={h2Style}>Helm Security: Signing and Provenance</h2>
      <p style={pStyle}>
        Helm supports chart signing and verification using GnuPG (GPG) keys. A provenance file (<code>.prov</code>) is generated alongside the chart archive, containing a cryptographic signature and a SHA-256 hash of the chart. This ensures chart integrity and authenticity.
      </p>

      <pre style={codeStyle}><code>{
'# ── Sign a chart with GPG ────────────────────────────────────\n'
+ '# Generate a GPG key (if you do not have one)\n'
+ 'gpg --full-generate-key\n'
+ '\n'
+ '# Package and sign\n'
+ 'helm package --sign --key "DevOps Team" \\\n'
+ '  --keyring ~/.gnupg/secring.gpg ./my-chart\n'
+ '# Produces: my-chart-0.1.0.tgz + my-chart-0.1.0.tgz.prov\n'
+ '\n'
+ '# ── Verify a chart ────────────────────────────────────────\n'
+ 'helm verify my-chart-0.1.0.tgz\n'
+ 'helm install --verify my-app my-chart-0.1.0.tgz\n'
+ '\n'
+ '# ── OCI + Cosign (sigstore) ──────────────────────────────\n'
+ '# Modern alternative using keyless signing\n'
+ 'cosign sign ghcr.io/myorg/charts/my-chart:0.1.0\n'
+ 'cosign verify ghcr.io/myorg/charts/my-chart:0.1.0\n'
+ '\n'
+ '# ── Helm Secrets plugin (encrypted values) ──────────────\n'
+ 'helm plugin install https://github.com/jkroepke/helm-secrets\n'
+ '\n'
+ '# Encrypt a values file with SOPS + age\n'
+ 'sops --encrypt --age age1abc123... values-secrets.yaml \\\n'
+ '  > values-secrets.enc.yaml\n'
+ '\n'
+ '# Deploy with encrypted values\n'
+ 'helm secrets upgrade my-app ./my-chart \\\n'
+ '  -f values.yaml \\\n'
+ '  -f values-secrets.enc.yaml'
      }</code></pre>

      {/* Section 15: Best Practices */}
      <h2 style={h2Style}>Helm Best Practices</h2>
      <ul style={ulStyle}>
        <li><strong>Pin chart versions</strong> &mdash; always specify <code>--version</code> when installing from repositories. Never rely on &quot;latest&quot; in production.</li>
        <li><strong>Use helm upgrade --install</strong> &mdash; this idempotent command installs if the release does not exist and upgrades if it does. Ideal for CI/CD.</li>
        <li><strong>Always pass --wait and --timeout</strong> &mdash; <code>--wait</code> makes Helm wait until all resources are ready before marking the release as successful. <code>--timeout 5m</code> prevents indefinite hangs.</li>
        <li><strong>Keep values.yaml minimal</strong> &mdash; only include parameters that users genuinely need to customize. Document each value with comments.</li>
        <li><strong>Use _helpers.tpl</strong> &mdash; extract reusable template logic (names, labels, selectors) into named templates to avoid repetition and ensure consistency.</li>
        <li><strong>Run helm lint and helm template</strong> &mdash; lint catches structural issues and template renders manifests locally for inspection before deploying.</li>
        <li><strong>Version your charts with SemVer</strong> &mdash; bump the chart version on every change. Use appVersion to track the application version independently.</li>
        <li><strong>Use --atomic for safety</strong> &mdash; <code>--atomic</code> automatically rolls back a failed upgrade, preventing broken releases in production.</li>
        <li><strong>Separate secrets from values</strong> &mdash; use helm-secrets or external secret managers (Vault, AWS Secrets Manager, SOPS) instead of putting secrets in plain values files.</li>
        <li><strong>Test your charts</strong> &mdash; write <code>helm test</code> hooks, use ct (chart-testing) for CI, and validate rendered output with kubeconform.</li>
      </ul>

      {/* Section 16: Helm vs Kustomize */}
      <h2 style={h2Style}>Helm vs Kustomize</h2>
      <p style={pStyle}>
        Helm and Kustomize are the two dominant approaches to managing Kubernetes configurations. They solve overlapping but different problems, and many teams use both.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Aspect</th>
              <th style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Helm</th>
              <th style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Kustomize</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Approach</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Templating + packaging</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Overlay patching (template-free)</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Language</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Go templates + Sprig</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Plain YAML + kustomization.yaml</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Packaging</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Charts (.tgz) with repos</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Directories (no packaging)</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Release management</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Built-in (history, rollback)</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>None (relies on kubectl / GitOps)</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Conditionals / loops</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Full (if/else, range, with)</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>None</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>kubectl native</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>No (separate binary)</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Yes (kubectl apply -k)</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Best for</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Community charts, complex apps, multi-env</td>
              <td style={{ border: '1px solid var(--border-color)', padding: '10px 14px', verticalAlign: 'top' }}>Simple overlays, in-house apps</td>
            </tr>
          </tbody>
        </table>
      </div>

      <pre style={codeStyle}><code>{
'# ── Kustomize example for comparison ──────────────────────────\n'
+ '# base/kustomization.yaml\n'
+ 'apiVersion: kustomize.config.k8s.io/v1beta1\n'
+ 'kind: Kustomization\n'
+ 'resources:\n'
+ '  - deployment.yaml\n'
+ '  - service.yaml\n'
+ '\n'
+ '# overlays/production/kustomization.yaml\n'
+ 'apiVersion: kustomize.config.k8s.io/v1beta1\n'
+ 'kind: Kustomization\n'
+ 'resources:\n'
+ '  - ../../base\n'
+ 'patches:\n'
+ '  - target:\n'
+ '      kind: Deployment\n'
+ '      name: my-app\n'
+ '    patch: |-\n'
+ '      - op: replace\n'
+ '        path: /spec/replicas\n'
+ '        value: 5\n'
+ 'images:\n'
+ '  - name: my-app\n'
+ '    newTag: v2.5.0\n'
+ '\n'
+ '# Apply with kubectl\n'
+ 'kubectl apply -k overlays/production/\n'
+ '\n'
+ '# ── Using both together ──────────────────────────────────────\n'
+ '# Render Helm templates, then apply Kustomize patches\n'
+ 'helm template my-app ./my-chart -f values.yaml > rendered.yaml\n'
+ '# Add rendered.yaml to Kustomize base, then overlay'
      }</code></pre>

      {/* Section 17: FAQ */}
      <h2 style={h2Style}>Frequently Asked Questions</h2>

      <h3 style={h3Style}>What is Helm and why do I need it?</h3>
      <p style={pStyle}>Helm bundles Kubernetes manifests into reusable Charts. Use it for complex multi-resource deployments, per-environment configuration, and installing community software from Artifact Hub.</p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>Chart vs Release?</h3>
      <p style={pStyle}>A Chart is a package (templates + values). A Release is a running instance in your cluster. The same Chart can be installed multiple times with different names and configurations.</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>How do I install Helm?</h3>
      <p style={pStyle}>macOS: <code>brew install helm</code>. Linux: official install script or <code>snap install helm --classic</code>. Windows: <code>choco install kubernetes-helm</code>. Verify with <code>helm version</code>.</p>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>How does the template language work?</h3>
      <p style={pStyle}>Go template syntax with Sprig functions. Access .Values, .Release, .Chart, and .Capabilities objects. Supports conditionals, loops, pipelines, and named templates in _helpers.tpl.</p>

      <h3 style={{ ...h3Style, color: '#ec4899' }}>How do I override values?</h3>
      <p style={pStyle}>Precedence: chart defaults &lt; parent chart &lt; <code>-f</code> files (left to right) &lt; <code>--set</code> flags. Use <code>helm show values</code> to discover available parameters.</p>

      <h3 style={h3Style}>What are Helm hooks?</h3>
      <p style={pStyle}>Resources annotated with <code>helm.sh/hook</code> that run at lifecycle points (pre-install, pre-upgrade, post-upgrade, test, etc.). Used for DB migrations, backups, and smoke tests.</p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>What is Helmfile?</h3>
      <p style={pStyle}>A declarative tool for managing multiple Helm releases in one <code>helmfile.yaml</code> with environment support, dependencies, and synchronized apply/destroy.</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>Helm or Kustomize?</h3>
      <p style={pStyle}>Helm for reusable packages, community charts, and release lifecycle. Kustomize for overlay patching and kubectl-native workflows. Many teams use both together.</p>

      {/* Section 18: Conclusion */}
      <h2 style={h2Style}>Conclusion</h2>
      <p style={pStyle}>
        Helm is an essential tool in the Kubernetes ecosystem. It transforms the complexity of managing dozens of YAML manifests into reusable, versioned, configurable packages. Whether you are deploying a simple web application or orchestrating a complex microservices architecture with databases, caches, and ingress controllers, Helm provides the packaging, release management, and ecosystem that make Kubernetes deployments repeatable and reliable.
      </p>
      <p style={pStyle}>
        Start with <code>helm create</code> to scaffold your first chart, learn the template language incrementally, and adopt best practices like version pinning, helm lint, and --atomic upgrades. As your infrastructure grows, add Helmfile for multi-release management, chart repositories for team sharing, and chart signing for security. The investment in learning Helm pays dividends across every Kubernetes project you touch.
      </p>
    </div>
  );
}
