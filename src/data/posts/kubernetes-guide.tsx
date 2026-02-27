'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Kubernetes Complete Guide for Developers — Pods, Deployments, Helm, RBAC & CI/CD',
    description: 'Master Kubernetes with this complete developer guide covering Pods, Deployments, Services, Ingress, Helm Charts, Persistent Storage, Health Checks, HPA, RBAC, and CI/CD integration.',
  },
  zh: {
    title: 'Kubernetes 开发者完整指南 — Pod、Deployment、Helm、RBAC 与 CI/CD',
    description: '全面掌握 Kubernetes，涵盖 Pod、Deployment、Service、Ingress、Helm Chart、持久化存储、健康检查、HPA、RBAC 及 CI/CD 集成的完整开发者指南。',
  },
};

export default function KubernetesGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between a Pod and a Deployment in Kubernetes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Pod is the smallest deployable unit in Kubernetes — it wraps one or more containers sharing network and storage. A Deployment manages a ReplicaSet of Pods, providing declarative updates, rollback capability, rolling update strategy, and self-healing. You should almost always use Deployments rather than creating bare Pods, because Deployments ensure the desired number of replicas is always running and handle Pod restarts automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between ClusterIP, NodePort, and LoadBalancer services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ClusterIP exposes the service on an internal cluster IP — only reachable within the cluster. NodePort exposes the service on each Node\'s IP at a static port (30000–32767), allowing external access via <NodeIP>:<NodePort>. LoadBalancer provisions an external load balancer (cloud provider) and assigns a public IP. For production, use LoadBalancer or Ingress with ClusterIP backends for HTTP traffic.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I store sensitive data in Kubernetes without hardcoding it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use Kubernetes Secrets for sensitive data like passwords, API keys, and certificates. Secrets are base64-encoded (not encrypted by default) and can be injected as environment variables or volume mounts. For stronger security, enable encryption at rest in etcd, use external-secrets-operator to sync from AWS Secrets Manager or HashiCorp Vault, and restrict Secret access with RBAC.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Helm and when should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Helm is the package manager for Kubernetes. It bundles related Kubernetes manifests into a "Chart" with a values.yaml file for configuration. Use Helm when you need to manage complex multi-resource deployments, share configurations across environments, or install community charts (e.g., nginx-ingress, cert-manager, prometheus). For simple single-app deployments, plain kubectl with kustomize overlays may be sufficient.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Kubernetes handle Pod health and restarts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kubernetes uses three types of probes: livenessProbe (restarts a container if it fails — use for deadlock detection), readinessProbe (removes Pod from Service endpoints if it fails — use for startup checks), and startupProbe (gives slow-starting containers extra time before liveness kicks in). Configure initialDelaySeconds, periodSeconds, failureThreshold, and successThreshold to tune behavior.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is HorizontalPodAutoscaler and how does it work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HPA automatically scales the number of Pod replicas based on observed CPU/memory utilization or custom metrics. It requires metrics-server to be installed. HPA queries metrics every 15 seconds, computes desired replicas as (currentReplicas * currentMetricValue / desiredMetricValue), and adjusts within minReplicas and maxReplicas bounds. For scale-to-zero, consider KEDA (Kubernetes Event-driven Autoscaling).',
        },
      },
      {
        '@type': 'Question',
        name: 'How does RBAC work in Kubernetes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RBAC (Role-Based Access Control) grants permissions to users, groups, or ServiceAccounts. A Role defines rules (verbs: get/list/create/delete on resources) within a namespace; ClusterRole applies cluster-wide. RoleBinding/ClusterRoleBinding attaches a Role to a subject. Best practice: create dedicated ServiceAccounts per workload with least-privilege Roles, avoid using the default ServiceAccount, and regularly audit permissions with kubectl auth can-i.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I perform a zero-downtime deployment in Kubernetes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Configure your Deployment with strategy.type: RollingUpdate and set maxSurge (extra Pods during update, e.g. 1 or 25%) and maxUnavailable: 0 (no Pods taken down until new one is ready). Ensure your readinessProbe is correctly configured so traffic only routes to ready Pods. Combined with preStop hooks and terminationGracePeriodSeconds, this achieves true zero-downtime deployments.',
        },
      },
    ],
  };

  return (
    <article style={{ maxWidth: 860, margin: '0 auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b', lineHeight: 1.7 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>{t.title}</h1>
      <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: 32 }}>{t.description}</p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: 8, padding: '16px 20px', marginBottom: 40 }}>
        <strong style={{ color: '#0369a1', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</strong>
        <p style={{ margin: '8px 0 0', color: '#0c4a6e' }}>
          Kubernetes orchestrates containerized workloads using Pods, Deployments, and Services. Master declarative YAML manifests, Helm for package management, PVCs for storage, probes for health checks, HPA for autoscaling, and RBAC for security. Integrate with GitHub Actions for automated CI/CD deployments.
        </p>
      </div>

      {/* Section 1: Core Concepts */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>1. Core Concepts</h2>
        <p>Kubernetes (k8s) is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications. Understanding its primitives is essential before writing any YAML.</p>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Essential Objects</h3>
        <ul style={{ paddingLeft: 24, marginBottom: 20 }}>
          <li style={{ marginBottom: 8 }}><strong>Pod</strong> — Smallest deployable unit; one or more containers sharing network namespace and storage volumes.</li>
          <li style={{ marginBottom: 8 }}><strong>Deployment</strong> — Manages a ReplicaSet of Pods; handles rolling updates and rollbacks declaratively.</li>
          <li style={{ marginBottom: 8 }}><strong>Service</strong> — Stable network endpoint for a set of Pods (ClusterIP/NodePort/LoadBalancer).</li>
          <li style={{ marginBottom: 8 }}><strong>Namespace</strong> — Virtual cluster within a cluster; isolates resources by team/environment (dev/staging/prod).</li>
          <li style={{ marginBottom: 8 }}><strong>ConfigMap</strong> — Non-sensitive key-value configuration injected as env vars or files.</li>
          <li style={{ marginBottom: 8 }}><strong>Secret</strong> — Base64-encoded sensitive data (passwords, tokens, certs).</li>
        </ul>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>kubectl Basics</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# Get cluster info
kubectl cluster-info

# List all resources in a namespace
kubectl get all -n my-namespace

# Describe a specific Pod
kubectl describe pod my-pod-abc123 -n my-namespace

# View logs (follow mode)
kubectl logs -f deployment/my-app -n my-namespace

# Execute a command inside a container
kubectl exec -it my-pod-abc123 -n my-namespace -- /bin/sh

# Apply a manifest
kubectl apply -f deployment.yaml

# Delete resources
kubectl delete -f deployment.yaml

# Get events (useful for debugging)
kubectl get events --sort-by='.lastTimestamp' -n my-namespace

# Switch context/namespace
kubectl config use-context my-cluster
kubectl config set-context --current --namespace=my-namespace`}
        </pre>

        <div style={{ background: '#fff7ed', borderLeft: '4px solid #f97316', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
          <strong>Tip:</strong> Install <code>kubectx</code> and <code>kubens</code> to quickly switch between clusters and namespaces. Use <code>k9s</code> as a terminal UI for real-time cluster monitoring.
        </div>
      </section>

      {/* Section 2: Deployments */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>2. Deployments</h2>
        <p>A Deployment provides declarative updates for Pods and ReplicaSets. You describe the desired state and the Deployment Controller changes the actual state at a controlled rate.</p>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Complete Deployment Manifest</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: production
  labels:
    app: my-app
    version: "1.0"
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Extra pods during update
      maxUnavailable: 0  # No downtime
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-registry/my-app:v1.2.3
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        env:
        - name: NODE_ENV
          value: "production"
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: password`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Rollout Commands</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# Check rollout status
kubectl rollout status deployment/my-app -n production

# View rollout history
kubectl rollout history deployment/my-app -n production

# Rollback to previous version
kubectl rollout undo deployment/my-app -n production

# Rollback to specific revision
kubectl rollout undo deployment/my-app --to-revision=2 -n production

# Pause a rollout (canary-style)
kubectl rollout pause deployment/my-app -n production

# Resume a paused rollout
kubectl rollout resume deployment/my-app -n production

# Force restart all pods (e.g., to pick up new ConfigMap)
kubectl rollout restart deployment/my-app -n production`}
        </pre>

        <p style={{ marginTop: 16 }}>Always set <code>resources.requests</code> and <code>resources.limits</code> on every container. Requests influence Pod scheduling decisions; limits prevent runaway containers from starving other workloads on the same node.</p>
      </section>

      {/* Section 3: Services & Ingress */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>3. Services &amp; Ingress</h2>
        <p>Services provide a stable DNS name and IP address for a dynamic set of Pods. Ingress routes external HTTP/HTTPS traffic to internal Services based on host/path rules.</p>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Service Types</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# ClusterIP (default) — internal only
apiVersion: v1
kind: Service
metadata:
  name: my-app-svc
spec:
  type: ClusterIP
  selector:
    app: my-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000

---
# NodePort — accessible via <NodeIP>:<NodePort>
spec:
  type: NodePort
  ports:
  - port: 80
    targetPort: 3000
    nodePort: 30080  # Range: 30000-32767

---
# LoadBalancer — cloud LB with public IP
spec:
  type: LoadBalancer
  ports:
  - port: 443
    targetPort: 3000`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Ingress with TLS &amp; Path Routing</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - api.example.com
    secretName: api-tls-secret
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /v1
        pathType: Prefix
        backend:
          service:
            name: api-v1-svc
            port:
              number: 80
      - path: /v2
        pathType: Prefix
        backend:
          service:
            name: api-v2-svc
            port:
              number: 80`}
        </pre>
        <p style={{ marginTop: 16 }}>Install <code>ingress-nginx</code> with Helm: <code>helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx</code>. Use <code>cert-manager</code> with a ClusterIssuer for automatic Let's Encrypt TLS certificates.</p>
      </section>

      {/* Section 4: ConfigMaps & Secrets */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>4. ConfigMaps &amp; Secrets</h2>
        <p>ConfigMaps store non-sensitive configuration; Secrets store sensitive data. Both can be injected as environment variables or mounted as files in Pods.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# ConfigMap — env vars and config files
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: "production"
  LOG_LEVEL: "info"
  config.json: |
    {
      "feature_flags": { "newUI": true },
      "api_timeout": 5000
    }

---
# Secret — base64 encoded
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
stringData:          # stringData auto-encodes to base64
  DB_PASSWORD: "super-secret-password"
  DB_URL: "postgresql://user:pass@db:5432/mydb"

---
# Use ConfigMap as volume mount
spec:
  volumes:
  - name: config-vol
    configMap:
      name: app-config
      items:
      - key: config.json
        path: config.json
  containers:
  - name: app
    volumeMounts:
    - name: config-vol
      mountPath: /etc/app/config.json
      subPath: config.json`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>External Secrets Operator</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# Sync secret from AWS Secrets Manager
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: db-external-secret
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: ClusterSecretStore
  target:
    name: db-secret
  data:
  - secretKey: DB_PASSWORD
    remoteRef:
      key: production/myapp/db
      property: password`}
        </pre>
      </section>

      {/* Section 5: Helm Charts */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>5. Helm Charts</h2>
        <p>Helm is the package manager for Kubernetes. Charts bundle multiple Kubernetes resources with templating support, making it easy to deploy and configure complex applications.</p>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Essential Helm Commands</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# Add a chart repository
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

# Search for charts
helm search repo nginx

# Install a chart with custom values
helm install my-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  -f custom-values.yaml

# Upgrade an existing release
helm upgrade my-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --set controller.replicaCount=3

# List releases
helm list -A  # all namespaces

# View release history
helm history my-nginx -n ingress-nginx

# Rollback to previous release
helm rollback my-nginx 1 -n ingress-nginx

# Uninstall a release
helm uninstall my-nginx -n ingress-nginx

# Template rendering (dry-run)
helm template my-app ./my-chart -f prod-values.yaml`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>values.yaml Example</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# values.yaml
replicaCount: 3

image:
  repository: my-registry/my-app
  tag: "1.2.3"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  className: nginx
  hosts:
  - host: api.example.com
    paths:
    - path: /
      pathType: Prefix

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 100m
    memory: 128Mi

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70`}
        </pre>

        <p style={{ marginTop: 16 }}>Use <strong>helmfile</strong> to declaratively manage multiple Helm releases across environments. Define all releases in <code>helmfile.yaml</code> and apply with <code>helmfile sync</code>.</p>
      </section>

      {/* Section 6: Persistent Storage */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>6. Persistent Storage</h2>
        <p>Containers are ephemeral by default — data is lost when a Pod restarts. PersistentVolumes (PV) and PersistentVolumeClaims (PVC) provide durable storage that outlives individual Pods.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# StorageClass — defines provisioner and parameters
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  encrypted: "true"
reclaimPolicy: Retain
volumeBindingMode: WaitForFirstConsumer

---
# PersistentVolumeClaim
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
  - ReadWriteOnce   # Single node; use ReadWriteMany for shared storage (NFS/EFS)
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 20Gi

---
# StatefulSet with volumeClaimTemplates (auto-creates PVC per replica)
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 1
  template:
    spec:
      containers:
      - name: postgres
        image: postgres:15
        volumeMounts:
        - name: data
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: fast-ssd
      resources:
        requests:
          storage: 20Gi`}
        </pre>

        <div style={{ background: '#f0fdf4', borderLeft: '4px solid #22c55e', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
          <strong>Access Modes:</strong> <code>ReadWriteOnce</code> (one node, R/W), <code>ReadOnlyMany</code> (many nodes, R), <code>ReadWriteMany</code> (many nodes, R/W — requires NFS/CephFS/EFS). Use StatefulSets for databases and stateful workloads that need stable network identities and persistent storage.
        </div>
      </section>

      {/* Section 7: Health Checks */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>7. Health Checks</h2>
        <p>Kubernetes uses three probe types to determine container health. Configuring them correctly is critical for zero-downtime deployments and self-healing.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`containers:
- name: my-app
  image: my-app:v1

  # startupProbe: gives slow apps time to initialize
  # Fires BEFORE liveness/readiness probes
  startupProbe:
    httpGet:
      path: /healthz
      port: 3000
    initialDelaySeconds: 10
    periodSeconds: 10
    failureThreshold: 30  # 30 * 10s = 5 min max startup time

  # livenessProbe: restart container if unhealthy (deadlock detection)
  livenessProbe:
    httpGet:
      path: /healthz
      port: 3000
    initialDelaySeconds: 0
    periodSeconds: 15
    failureThreshold: 3
    timeoutSeconds: 5

  # readinessProbe: remove from Service endpoints if not ready
  readinessProbe:
    httpGet:
      path: /ready
      port: 3000
    initialDelaySeconds: 5
    periodSeconds: 10
    failureThreshold: 3
    successThreshold: 1

  # Exec probe example (for non-HTTP services)
  livenessProbe:
    exec:
      command:
      - /bin/sh
      - -c
      - "redis-cli ping | grep PONG"
    periodSeconds: 30

  # gRPC probe (Kubernetes 1.24+)
  readinessProbe:
    grpc:
      port: 9090
    periodSeconds: 10`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Graceful Shutdown</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`spec:
  terminationGracePeriodSeconds: 60
  containers:
  - name: my-app
    lifecycle:
      preStop:
        exec:
          command: ["/bin/sh", "-c", "sleep 5"]  # Allow LB to drain`}
        </pre>
      </section>

      {/* Section 8: HPA & Resource Scaling */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>8. HPA &amp; Resource Scaling</h2>
        <p>HorizontalPodAutoscaler automatically scales Pods based on CPU, memory, or custom metrics. It requires <code>metrics-server</code> to be installed in the cluster.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# Install metrics-server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

---
# HPA based on CPU + memory
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
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
        type: AverageValue
        averageValue: 400Mi
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300  # Prevent thrashing
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Pods
        value: 4
        periodSeconds: 60`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>KEDA — Event-Driven Autoscaling</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# Scale to zero based on RabbitMQ queue length
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: worker-scaledobject
spec:
  scaleTargetRef:
    name: worker-deployment
  minReplicaCount: 0   # Scale to zero!
  maxReplicaCount: 50
  triggers:
  - type: rabbitmq
    metadata:
      queueName: task-queue
      queueLength: "5"  # 1 replica per 5 messages`}
        </pre>
      </section>

      {/* Section 9: RBAC */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>9. RBAC</h2>
        <p>Role-Based Access Control (RBAC) is the standard authorization mechanism in Kubernetes. It controls which users and service accounts can perform which actions on which resources.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# ServiceAccount for a specific workload
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-app-sa
  namespace: production

---
# Role — namespaced permissions
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: my-app-role
  namespace: production
rules:
- apiGroups: [""]
  resources: ["configmaps", "secrets"]
  verbs: ["get", "list", "watch"]
- apiGroups: ["apps"]
  resources: ["deployments"]
  verbs: ["get", "list", "watch", "update", "patch"]

---
# RoleBinding — attach Role to ServiceAccount
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: my-app-rolebinding
  namespace: production
subjects:
- kind: ServiceAccount
  name: my-app-sa
  namespace: production
roleRef:
  kind: Role
  apiGroup: rbac.authorization.k8s.io
  name: my-app-role

---
# ClusterRole — cluster-wide permissions (e.g., node reader)
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: node-reader
rules:
- apiGroups: [""]
  resources: ["nodes"]
  verbs: ["get", "list", "watch"]`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Audit &amp; Verify</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# Check if a ServiceAccount can perform an action
kubectl auth can-i create pods \
  --as=system:serviceaccount:production:my-app-sa \
  -n production

# List all permissions for a ServiceAccount
kubectl auth can-i --list \
  --as=system:serviceaccount:production:my-app-sa \
  -n production

# Use rbac-tool for visual audit
kubectl rbac-tool lookup my-app-sa`}
        </pre>
      </section>

      {/* Section 10: CI/CD Integration */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>10. CI/CD Integration</h2>
        <p>Automating Kubernetes deployments with GitHub Actions enables continuous delivery. The key steps are: build and push image, update the manifest (or use kustomize/helm), and apply to the cluster.</p>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>GitHub Actions Deployment Workflow</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`name: Deploy to Kubernetes

on:
  push:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
    - uses: actions/checkout@v4

    - name: Log in to Container Registry
      uses: docker/login-action@v3
      with:
        registry: \${{ env.REGISTRY }}
        username: \${{ github.actor }}
        password: \${{ secrets.GITHUB_TOKEN }}

    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }}

    - name: Set up kubectl
      uses: azure/setup-kubectl@v3

    - name: Configure kubeconfig
      run: |
        echo "\${{ secrets.KUBECONFIG }}" | base64 -d > /tmp/kubeconfig
        export KUBECONFIG=/tmp/kubeconfig

    - name: Deploy with kustomize
      run: |
        cd k8s/overlays/production
        kustomize edit set image my-app=\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }}
        kubectl apply -k .
        kubectl rollout status deployment/my-app -n production --timeout=300s`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Kustomize Overlay Structure</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`k8s/
├── base/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── kustomization.yaml
└── overlays/
    ├── staging/
    │   ├── kustomization.yaml   # patches for staging
    │   └── replica-patch.yaml
    └── production/
        ├── kustomization.yaml   # patches for production
        └── replica-patch.yaml

# overlays/production/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- ../../base
patchesStrategicMerge:
- replica-patch.yaml
images:
- name: my-app
  newName: ghcr.io/my-org/my-app
  newTag: latest`}
        </pre>

        <div style={{ background: '#fff7ed', borderLeft: '4px solid #f97316', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
          <strong>Image Pull Policy:</strong> Use <code>imagePullPolicy: Always</code> in development (always fetch latest), <code>IfNotPresent</code> in production with immutable tags (SHA digest), and never use <code>latest</code> in production deployments.
        </div>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Quick Tool: Format Your YAML Manifests</h3>
        <p>
          Use the{' '}
          <Link href="https://viadreams.cc/en/tools/yaml-formatter" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>
            YAML Formatter
          </Link>{' '}
          to validate and beautify your Kubernetes manifests before applying them to the cluster.
        </p>
      </section>

      {/* Section: Networking & Network Policies */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>Network Policies</h2>
        <p>By default, all Pods in a Kubernetes cluster can communicate with each other. Network Policies act as a firewall, restricting ingress and egress traffic between Pods using label selectors.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# Default-deny all ingress (baseline security posture)
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: production
spec:
  podSelector: {}   # Applies to ALL pods in namespace
  policyTypes:
  - Ingress

---
# Allow only frontend pods to reach backend
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend         # Policy applies to backend pods
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend    # Only allow frontend pods
    ports:
    - protocol: TCP
      port: 8080

---
# Allow namespace-scoped access (e.g., monitoring namespace)
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-monitoring
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: monitoring
    ports:
    - protocol: TCP
      port: 9090   # Prometheus scrape port`}
        </pre>

        <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
          <strong>Security Note:</strong> Network Policies require a CNI plugin that supports them (Calico, Cilium, Weave Net). The default Flannel CNI does NOT enforce Network Policies. Verify your CNI supports policies before relying on them for security isolation.
        </div>
      </section>

      {/* Section: Pod Disruption Budgets & Node Affinity */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>Pod Disruption Budgets &amp; Scheduling</h2>
        <p>PodDisruptionBudgets (PDB) protect your application availability during voluntary disruptions (node drains, cluster upgrades). Node affinity and pod topology spread constraints control where Pods land.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# PodDisruptionBudget — ensure minimum availability during node drains
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: my-app-pdb
  namespace: production
spec:
  minAvailable: 2        # At least 2 pods must always be available
  # OR: maxUnavailable: 1  # At most 1 pod can be unavailable at a time
  selector:
    matchLabels:
      app: my-app

---
# Pod Topology Spread Constraints — spread across zones
spec:
  topologySpreadConstraints:
  - maxSkew: 1                          # Max difference between zones
    topologyKey: topology.kubernetes.io/zone
    whenUnsatisfiable: DoNotSchedule    # Or: ScheduleAnyway
    labelSelector:
      matchLabels:
        app: my-app

---
# Node Affinity — prefer specific node types
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: kubernetes.io/arch
            operator: In
            values: [amd64]
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        preference:
          matchExpressions:
          - key: node.kubernetes.io/instance-type
            operator: In
            values: [m5.xlarge, m5.2xlarge]

  # Pod Anti-Affinity — avoid same node as other app replicas
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchLabels:
              app: my-app
          topologyKey: kubernetes.io/hostname`}
        </pre>
      </section>

      {/* Section: Monitoring & Observability */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>Monitoring &amp; Observability</h2>
        <p>A production Kubernetes cluster needs metrics (Prometheus), logs (Loki/ELK), and traces (Jaeger/Tempo). The Prometheus Operator makes it easy to deploy and configure the full monitoring stack.</p>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# Install kube-prometheus-stack (Prometheus + Grafana + Alertmanager)
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm upgrade --install kube-prometheus-stack \
  prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  -f monitoring-values.yaml

# ServiceMonitor — tell Prometheus to scrape your app
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: my-app-monitor
  namespace: monitoring
  labels:
    release: kube-prometheus-stack
spec:
  selector:
    matchLabels:
      app: my-app
  namespaceSelector:
    matchNames: [production]
  endpoints:
  - port: http
    path: /metrics
    interval: 30s

# PrometheusRule — define alerts
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: my-app-alerts
  namespace: monitoring
spec:
  groups:
  - name: my-app
    rules:
    - alert: HighErrorRate
      expr: |
        rate(http_requests_total{status=~"5.."}[5m]) /
        rate(http_requests_total[5m]) > 0.05
      for: 2m
      labels:
        severity: warning
      annotations:
        summary: "High error rate on {{ $labels.instance }}"
        description: "Error rate is {{ $value | humanizePercentage }}"

    - alert: PodCrashLooping
      expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
      for: 5m
      labels:
        severity: critical`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Useful kubectl Debugging Commands</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# Resource usage by node
kubectl top nodes

# Resource usage by pod
kubectl top pods -n production --sort-by=memory

# Debug a crashed pod (init containers, previous logs)
kubectl logs my-pod --previous -n production
kubectl logs my-pod -c init-container -n production

# Port-forward for local debugging
kubectl port-forward svc/my-app-svc 8080:80 -n production

# Create a temporary debug pod
kubectl run debug-pod \
  --image=nicolaka/netshoot \
  --restart=Never \
  --rm -it \
  -n production -- /bin/bash

# Copy files to/from a pod
kubectl cp my-pod:/var/log/app.log ./app.log -n production

# Watch pod status in real time
kubectl get pods -n production -w

# Drain a node for maintenance
kubectl drain my-node --ignore-daemonsets --delete-emptydir-data`}
        </pre>
      </section>

      {/* Key Takeaways */}
      <section style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '24px 28px', marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 16, marginTop: 0 }}>Key Takeaways</h2>
        <ul style={{ paddingLeft: 24, margin: 0 }}>
          <li style={{ marginBottom: 10 }}>Always use Deployments (not bare Pods) with RollingUpdate strategy and <code>maxUnavailable: 0</code> for zero-downtime updates.</li>
          <li style={{ marginBottom: 10 }}>Set <code>resources.requests</code> and <code>resources.limits</code> on every container to enable proper scheduling and prevent resource starvation.</li>
          <li style={{ marginBottom: 10 }}>Configure all three probe types (<code>startupProbe</code>, <code>livenessProbe</code>, <code>readinessProbe</code>) for production workloads.</li>
          <li style={{ marginBottom: 10 }}>Use Helm for complex multi-resource deployments; use Kustomize for environment-specific overlays in CI/CD.</li>
          <li style={{ marginBottom: 10 }}>Store all secrets in external secret managers (AWS Secrets Manager, Vault) and sync with external-secrets-operator — never commit secrets to Git.</li>
          <li style={{ marginBottom: 10 }}>Apply least-privilege RBAC with dedicated ServiceAccounts per workload; use <code>kubectl auth can-i</code> to audit permissions.</li>
          <li style={{ marginBottom: 10 }}>Use StatefulSets with <code>volumeClaimTemplates</code> for stateful workloads like databases that require stable storage and network identity.</li>
          <li style={{ marginBottom: 10 }}>Enable HPA with CPU/memory targets and configure <code>scaleDown.stabilizationWindowSeconds</code> to prevent autoscaling thrashing.</li>
        </ul>
      </section>

      {/* Common Pitfalls */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>Common Pitfalls &amp; Troubleshooting</h2>
        <p>These are the most frequent issues Kubernetes operators encounter in production, along with their root causes and fixes.</p>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>ImagePullBackOff / ErrImagePull</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# Diagnose
kubectl describe pod my-pod -n production
# Look for: "Failed to pull image", "unauthorized", "not found"

# Common causes:
# 1. Wrong image name or tag
# 2. Private registry without imagePullSecrets
# 3. Registry rate limiting (Docker Hub)

# Fix: Create registry secret
kubectl create secret docker-registry my-registry-secret \
  --docker-server=ghcr.io \
  --docker-username=my-user \
  --docker-password=my-token \
  -n production

# Reference in Deployment
spec:
  imagePullSecrets:
  - name: my-registry-secret`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>OOMKilled — Out of Memory</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# Detect OOMKilled containers
kubectl get pods -n production -o json | \
  jq '.items[].status.containerStatuses[]? | select(.lastState.terminated.reason=="OOMKilled") | .name'

# Check container memory usage
kubectl top pods -n production

# Fix: Increase memory limit (or fix memory leak)
resources:
  requests:
    memory: "256Mi"
  limits:
    memory: "1Gi"   # Was 512Mi, now increased

# Use VPA (Vertical Pod Autoscaler) for automatic right-sizing
kubectl apply -f https://github.com/kubernetes/autoscaler/releases/latest/download/vertical-pod-autoscaler.yaml`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>CrashLoopBackOff</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# CrashLoopBackOff: container starts, crashes, restarts, backoff increases
# Kubernetes doubles the backoff: 10s, 20s, 40s, 80s, up to 5 minutes

# Diagnose
kubectl logs my-pod --previous -n production   # Logs from LAST crash
kubectl describe pod my-pod -n production       # Check exit codes, events

# Common exit codes:
# Exit 1  — Application error (check app logs)
# Exit 137 — OOMKilled (increase memory limit)
# Exit 143 — SIGTERM not handled (fix graceful shutdown)
# Exit 1   + "exec format error" — Wrong CPU architecture (amd64 vs arm64)

# Quick fix: temporarily set a debug sleep to inspect
spec:
  containers:
  - name: my-app
    command: ["/bin/sh", "-c", "sleep infinity"]  # Override entrypoint to debug`}
        </pre>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Pending Pods — Insufficient Resources</h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', lineHeight: 1.6 }}>
{`# Pod stuck in Pending
kubectl describe pod my-pod -n production
# Look for: "Insufficient cpu", "Insufficient memory", "No nodes available"

# Check node capacity vs allocatable
kubectl describe nodes | grep -A5 "Allocated resources"

# Check resource usage per namespace
kubectl describe resourcequota -n production

# ResourceQuota — limit total resources per namespace
apiVersion: v1
kind: ResourceQuota
metadata:
  name: production-quota
  namespace: production
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
    pods: "50"

# LimitRange — set default resource requests/limits
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: production
spec:
  limits:
  - default:
      memory: 256Mi
      cpu: 200m
    defaultRequest:
      memory: 128Mi
      cpu: 100m
    type: Container`}
        </pre>
      </section>

      {/* FAQ Section */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, borderBottom: '2px solid #e2e8f0', paddingBottom: 8, marginBottom: 20 }}>Frequently Asked Questions</h2>

        {faqSchema.mainEntity.map((faq, idx) => (
          <div key={idx} style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 8, color: '#0f172a' }}>{faq.name}</h3>
            <p style={{ margin: 0, color: '#475569' }}>{faq.acceptedAnswer.text}</p>
          </div>
        ))}
      </section>
    </article>
  );
}
