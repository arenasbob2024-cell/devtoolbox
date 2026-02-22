'use client';

import Link from 'next/link';

export default function KubernetesBasics({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Is Kubernetes?</h2>
      <p>
        <strong>Kubernetes</strong> (often abbreviated as K8s) is an open-source container orchestration platform originally developed by Google. It automates the deployment, scaling, and management of containerized applications. Instead of manually deploying containers on servers, you declare what you want (desired state), and Kubernetes makes it happen and keeps it running.
      </p>
      <p>
        This guide covers the core concepts every developer needs to understand: Pods, Deployments, Services, ConfigMaps, Secrets, namespaces, and networking. By the end, you will be able to deploy your first application to a Kubernetes cluster and understand the building blocks for more complex architectures.
      </p>

      <h2>Kubernetes Architecture Overview</h2>
      <pre><code className="language-text">{`Kubernetes Cluster Architecture:

┌─────────────────────────────────────────────────────────────┐
│                     Control Plane                            │
│  ┌─────────────┐ ┌──────────┐ ┌────────────┐ ┌──────────┐  │
│  │ API Server  │ │ Scheduler│ │ Controller │ │  etcd    │  │
│  │ (kube-api)  │ │          │ │ Manager    │ │ (store)  │  │
│  └─────────────┘ └──────────┘ └────────────┘ └──────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
      ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
      │  Worker    │ │  Worker    │ │  Worker    │
      │  Node 1   │ │  Node 2   │ │  Node 3   │
      │           │ │           │ │           │
      │ ┌───────┐ │ │ ┌───────┐ │ │ ┌───────┐ │
      │ │kubelet│ │ │ │kubelet│ │ │ │kubelet│ │
      │ └───────┘ │ │ └───────┘ │ │ └───────┘ │
      │ ┌───────┐ │ │ ┌───────┐ │ │ ┌───────┐ │
      │ │kube-  │ │ │ │kube-  │ │ │ │kube-  │ │
      │ │proxy  │ │ │ │proxy  │ │ │ │proxy  │ │
      │ └───────┘ │ │ └───────┘ │ │ └───────┘ │
      │ ┌───┐┌───┐│ │ ┌───┐┌───┐│ │ ┌───┐     │
      │ │Pod││Pod││ │ │Pod││Pod││ │ │Pod│     │
      │ └───┘└───┘│ │ └───┘└───┘│ │ └───┘     │
      └───────────┘ └───────────┘ └───────────┘

Control Plane Components:
  - API Server:  Frontend for the cluster (all commands go here)
  - Scheduler:   Decides which node runs each Pod
  - Controller:  Monitors cluster state, maintains desired state
  - etcd:        Key-value store for all cluster data

Worker Node Components:
  - kubelet:     Agent that runs on each node, manages Pods
  - kube-proxy:  Network proxy for Service networking
  - Pods:        The actual running containers`}</code></pre>

      <h2>Core Concept 1: Pods</h2>
      <p>
        A <strong>Pod</strong> is the smallest deployable unit in Kubernetes. It wraps one or more containers that share the same network namespace (they can talk to each other via <code>localhost</code>) and storage volumes. In practice, most Pods contain a single container.
      </p>
      <pre><code className="language-yaml">{`# pod.yaml - A simple Pod definition
apiVersion: v1
kind: Pod
metadata:
  name: my-app
  labels:
    app: my-app
    environment: development
spec:
  containers:
    - name: app
      image: node:20-alpine
      ports:
        - containerPort: 3000
      resources:
        requests:
          memory: "128Mi"
          cpu: "100m"
        limits:
          memory: "256Mi"
          cpu: "500m"
      env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "3000"`}</code></pre>
      <pre><code className="language-bash">{`# Create the Pod
kubectl apply -f pod.yaml

# Check Pod status
kubectl get pods

# View Pod details
kubectl describe pod my-app

# View Pod logs
kubectl logs my-app

# Execute command inside Pod
kubectl exec -it my-app -- /bin/sh

# Delete the Pod
kubectl delete pod my-app`}</code></pre>

      <h2>Core Concept 2: Deployments</h2>
      <p>
        You rarely create Pods directly. Instead, you use a <strong>Deployment</strong>, which manages a set of identical Pods (called replicas). Deployments handle rolling updates, rollbacks, and self-healing -- if a Pod crashes, the Deployment automatically creates a new one.
      </p>
      <pre><code className="language-yaml">{`# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  replicas: 3                     # Run 3 identical Pods
  selector:
    matchLabels:
      app: web-app                # Must match template labels
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1                 # Max extra Pods during update
      maxUnavailable: 0           # Zero downtime
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web
          image: myregistry/web-app:1.2.0
          ports:
            - containerPort: 3000
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "1000m"
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 15
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10`}</code></pre>
      <pre><code className="language-bash">{`# Deploy
kubectl apply -f deployment.yaml

# Check rollout status
kubectl rollout status deployment/web-app

# View deployment details
kubectl get deployments
kubectl describe deployment web-app

# Scale up/down
kubectl scale deployment web-app --replicas=5

# Update image (triggers rolling update)
kubectl set image deployment/web-app web=myregistry/web-app:1.3.0

# Roll back to previous version
kubectl rollout undo deployment/web-app

# View rollout history
kubectl rollout history deployment/web-app`}</code></pre>

      <h2>Core Concept 3: Services</h2>
      <p>
        Pods are ephemeral -- they get new IP addresses every time they restart. A <strong>Service</strong> provides a stable network endpoint (DNS name and IP) that routes traffic to the correct Pods using label selectors. Services also handle load balancing across multiple Pod replicas.
      </p>
      <pre><code className="language-yaml">{`# service.yaml - ClusterIP (internal access only)
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
spec:
  type: ClusterIP              # Internal cluster access
  selector:
    app: web-app               # Routes to Pods with this label
  ports:
    - protocol: TCP
      port: 80                 # Service port (what clients connect to)
      targetPort: 3000         # Pod port (where app listens)

---
# NodePort service (external access via node IP:port)
apiVersion: v1
kind: Service
metadata:
  name: web-app-nodeport
spec:
  type: NodePort
  selector:
    app: web-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
      nodePort: 30080          # Accessible at <NodeIP>:30080

---
# LoadBalancer service (cloud provider integration)
apiVersion: v1
kind: Service
metadata:
  name: web-app-lb
spec:
  type: LoadBalancer
  selector:
    app: web-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000`}</code></pre>

      <h3>Service Types Comparison</h3>
      <table>
        <thead>
          <tr><th>Service Type</th><th>Access Scope</th><th>Use Case</th></tr>
        </thead>
        <tbody>
          <tr><td>ClusterIP</td><td>Internal cluster only</td><td>Microservice communication</td></tr>
          <tr><td>NodePort</td><td>External via node IP:port</td><td>Development, testing</td></tr>
          <tr><td>LoadBalancer</td><td>External via cloud LB</td><td>Production web apps</td></tr>
          <tr><td>ExternalName</td><td>DNS CNAME mapping</td><td>External service references</td></tr>
        </tbody>
      </table>

      <h2>Core Concept 4: ConfigMaps and Secrets</h2>
      <p>
        <strong>ConfigMaps</strong> store non-sensitive configuration data, and <strong>Secrets</strong> store sensitive data (passwords, API keys, TLS certificates). Both decouple configuration from container images so you can change settings without rebuilding.
      </p>
      <pre><code className="language-yaml">{`# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  API_URL: "https://api.example.com"
  config.json: |
    {
      "feature_flags": {
        "dark_mode": true,
        "new_dashboard": false
      }
    }

---
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
stringData:                      # Use stringData for plain text input
  DATABASE_URL: "postgresql://user:pass@db:5432/mydb"
  JWT_SECRET: "your-super-secret-key"
  API_KEY: "sk-abc123def456"

---
# Using ConfigMap and Secret in a Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web
          image: myregistry/web-app:1.2.0
          ports:
            - containerPort: 3000
          envFrom:
            - configMapRef:
                name: app-config
            - secretRef:
                name: app-secrets
          volumeMounts:
            - name: config-volume
              mountPath: /app/config
              readOnly: true
      volumes:
        - name: config-volume
          configMap:
            name: app-config
            items:
              - key: config.json
                path: config.json`}</code></pre>

      <h2>Core Concept 5: Namespaces</h2>
      <p>
        <strong>Namespaces</strong> provide logical isolation within a cluster. They are useful for separating environments (dev, staging, production), teams, or applications. Resources within a namespace can reference each other by name; cross-namespace access requires the full DNS name.
      </p>
      <pre><code className="language-bash">{`# Create a namespace
kubectl create namespace staging

# Deploy to a specific namespace
kubectl apply -f deployment.yaml -n staging

# List resources in a namespace
kubectl get pods -n staging
kubectl get all -n staging

# Set default namespace for your context
kubectl config set-context --current --namespace=staging

# List all namespaces
kubectl get namespaces

# DNS for cross-namespace access:
# <service-name>.<namespace>.svc.cluster.local
# Example: web-app-service.staging.svc.cluster.local`}</code></pre>

      <h2>Core Concept 6: Ingress</h2>
      <p>
        An <strong>Ingress</strong> manages external HTTP/HTTPS access to Services within the cluster. It provides URL-based routing, TLS termination, and virtual hosting -- similar to a reverse proxy like Nginx.
      </p>
      <pre><code className="language-yaml">{`# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - app.example.com
        - api.example.com
      secretName: tls-secret
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80
    - host: api.example.com
      http:
        paths:
          - path: /v1
            pathType: Prefix
            backend:
              service:
                name: api-v1-service
                port:
                  number: 80
          - path: /v2
            pathType: Prefix
            backend:
              service:
                name: api-v2-service
                port:
                  number: 80`}</code></pre>

      <h2>Complete Example: Deploy a Web Application</h2>
      <p>
        Here is a complete, production-ready example that deploys a Node.js web application with a PostgreSQL database, including ConfigMaps, Secrets, Services, and an Ingress.
      </p>
      <pre><code className="language-yaml">{`# 1-namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: myapp

---
# 2-configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: myapp
data:
  NODE_ENV: "production"
  PORT: "3000"

---
# 3-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
  namespace: myapp
type: Opaque
stringData:
  POSTGRES_USER: "appuser"
  POSTGRES_PASSWORD: "secure-password-here"
  POSTGRES_DB: "myappdb"
  DATABASE_URL: "postgresql://appuser:secure-password-here@postgres:5432/myappdb"

---
# 4-postgres-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
  namespace: myapp
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:16-alpine
          ports:
            - containerPort: 5432
          envFrom:
            - secretRef:
                name: db-credentials
          volumeMounts:
            - name: pg-data
              mountPath: /var/lib/postgresql/data
      volumes:
        - name: pg-data
          persistentVolumeClaim:
            claimName: pg-pvc

---
# 5-postgres-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  namespace: myapp
spec:
  selector:
    app: postgres
  ports:
    - port: 5432
      targetPort: 5432

---
# 6-web-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
        - name: web
          image: myregistry/web-app:1.0.0
          ports:
            - containerPort: 3000
          envFrom:
            - configMapRef:
                name: app-config
            - secretRef:
                name: db-credentials
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000

---
# 7-web-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
  namespace: myapp
spec:
  selector:
    app: web-app
  ports:
    - port: 80
      targetPort: 3000`}</code></pre>

      <h2>Essential kubectl Commands</h2>
      <pre><code className="language-bash">{`# Cluster info
kubectl cluster-info
kubectl get nodes

# Pods
kubectl get pods                       # List pods
kubectl get pods -o wide               # Show node assignment
kubectl describe pod <name>            # Detailed info
kubectl logs <pod-name>                # View logs
kubectl logs <pod-name> -f             # Follow (tail) logs
kubectl exec -it <pod-name> -- sh     # Shell into pod
kubectl port-forward <pod> 8080:3000   # Local port forwarding

# Deployments
kubectl get deployments
kubectl rollout status deployment/<name>
kubectl rollout undo deployment/<name>
kubectl scale deployment/<name> --replicas=5

# Services
kubectl get services
kubectl describe service <name>

# Apply and delete
kubectl apply -f manifest.yaml
kubectl delete -f manifest.yaml

# Debug
kubectl get events --sort-by=.lastTimestamp
kubectl top pods                       # Resource usage
kubectl top nodes`}</code></pre>

      <h2>Kubernetes vs Docker Compose</h2>
      <table>
        <thead>
          <tr><th>Feature</th><th>Docker Compose</th><th>Kubernetes</th></tr>
        </thead>
        <tbody>
          <tr><td>Scope</td><td>Single machine</td><td>Multi-node cluster</td></tr>
          <tr><td>Self-healing</td><td>restart policies</td><td>Full self-healing</td></tr>
          <tr><td>Scaling</td><td>Manual scale command</td><td>Auto-scaling (HPA)</td></tr>
          <tr><td>Load balancing</td><td>Basic round-robin</td><td>Advanced LB with Services</td></tr>
          <tr><td>Rolling updates</td><td>Limited</td><td>Built-in with rollback</td></tr>
          <tr><td>Networking</td><td>Single bridge network</td><td>Pod-to-Pod across nodes</td></tr>
          <tr><td>Secret management</td><td>Environment files</td><td>Encrypted Secrets</td></tr>
          <tr><td>Best for</td><td>Local dev, simple deploys</td><td>Production at scale</td></tr>
        </tbody>
      </table>

      <h2>Getting Started Locally</h2>
      <pre><code className="language-bash">{`# Option 1: Minikube (most popular for learning)
brew install minikube       # macOS
minikube start
minikube dashboard          # Opens web UI

# Option 2: Docker Desktop (built-in K8s)
# Enable Kubernetes in Docker Desktop settings

# Option 3: kind (Kubernetes in Docker)
brew install kind
kind create cluster --name my-cluster

# Verify your cluster is running
kubectl cluster-info
kubectl get nodes`}</code></pre>

      <h2>Conclusion</h2>
      <p>
        Kubernetes has a steep learning curve, but understanding six core concepts -- Pods, Deployments, Services, ConfigMaps/Secrets, Namespaces, and Ingress -- gives you a solid foundation. Start with a local cluster using Minikube or kind, deploy a simple application, and gradually explore features like auto-scaling, persistent volumes, and Helm charts.
      </p>
      <p>
        Remember: Kubernetes solves problems at scale. If you are running a few containers on a single server, Docker Compose may be sufficient. Kubernetes becomes essential when you need multi-node deployment, auto-scaling, zero-downtime updates, and self-healing infrastructure.
      </p>
      <p>
        Generate your Kubernetes YAML configurations with our <Link href={`/${lang}/tools/yaml-json`}>YAML to JSON Converter</Link>, explore <Link href={`/${lang}/blog/docker-compose-cheat-sheet`}>Docker Compose Cheat Sheet</Link>, or check our <Link href={`/${lang}/blog/docker-compose-yaml-errors`}>Docker YAML Errors Guide</Link> for debugging configuration files.
      </p>
    </>
  );
}
