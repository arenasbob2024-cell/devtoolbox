'use client';

import Link from 'next/link';

export default function KubernetesBeginnerGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Is Kubernetes?</h2>
      <p>
        <strong>Kubernetes</strong> (often abbreviated as <strong>K8s</strong>) is an open-source container orchestration platform originally developed by Google and now maintained by the Cloud Native Computing Foundation (CNCF). It automates the deployment, scaling, and management of containerized applications across clusters of machines. Kubernetes has become the industry standard for running production workloads at scale, used by organizations of all sizes from startups to the largest enterprises.
      </p>
      <p>
        This comprehensive tutorial covers everything a beginner needs to know about Kubernetes in 2026: core concepts, architecture, hands-on setup, deploying your first application, networking, storage, configuration management, scaling, and production best practices. By the end of this guide, you will have a solid foundation for working with Kubernetes.
      </p>

      <h2>Why Kubernetes?</h2>
      <p>
        Before Kubernetes, deploying applications at scale required manual server management, custom deployment scripts, and complex load balancing configurations. Kubernetes solves these problems with a declarative approach: you describe the desired state of your application, and Kubernetes makes it happen.
      </p>
      <ul>
        <li><strong>Self-healing</strong>: Automatically restarts failed containers, replaces unresponsive nodes, and reschedules workloads when nodes die.</li>
        <li><strong>Horizontal scaling</strong>: Scale applications up or down with a single command or automatically based on CPU/memory usage or custom metrics.</li>
        <li><strong>Service discovery and load balancing</strong>: Built-in DNS and load balancing distribute traffic across healthy container instances.</li>
        <li><strong>Rolling updates and rollbacks</strong>: Deploy new versions with zero downtime and instantly roll back if something goes wrong.</li>
        <li><strong>Configuration management</strong>: Separate configuration from application code using ConfigMaps and Secrets.</li>
        <li><strong>Storage orchestration</strong>: Automatically mount local, cloud, or network storage to your containers.</li>
        <li><strong>Infrastructure abstraction</strong>: Run the same workloads on any cloud (AWS, GCP, Azure) or on-premises with minimal changes.</li>
      </ul>

      <h2>Kubernetes Architecture</h2>
      <p>
        A Kubernetes cluster consists of a <strong>control plane</strong> (master) and one or more <strong>worker nodes</strong>. The control plane manages the cluster state, while worker nodes run your application containers.
      </p>
      <pre><code className="language-text">{`Kubernetes Cluster Architecture:

┌──────────────────────────────────────────────────────────────────┐
│                         CONTROL PLANE                            │
│                                                                  │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ API Server  │  │  Scheduler   │  │ Controller Manager   │   │
│  │ (kube-api)  │  │              │  │ (node, replication,  │   │
│  │             │  │ Assigns pods │  │  endpoint, service   │   │
│  │ REST API    │  │ to nodes     │  │  account controllers)│   │
│  └──────┬──────┘  └──────────────┘  └──────────────────────┘   │
│         │                                                        │
│  ┌──────┴──────┐  ┌──────────────┐                              │
│  │    etcd     │  │ Cloud        │                              │
│  │ (key-value  │  │ Controller   │                              │
│  │  store)     │  │ Manager      │                              │
│  └─────────────┘  └──────────────┘                              │
└──────────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Worker Node 1  │ │   Worker Node 2  │ │   Worker Node 3  │
│                  │ │                  │ │                  │
│  ┌────────────┐  │ │  ┌────────────┐  │ │  ┌────────────┐  │
│  │  kubelet   │  │ │  │  kubelet   │  │ │  │  kubelet   │  │
│  └────────────┘  │ │  └────────────┘  │ │  └────────────┘  │
│  ┌────────────┐  │ │  ┌────────────┐  │ │  ┌────────────┐  │
│  │ kube-proxy │  │ │  │ kube-proxy │  │ │  │ kube-proxy │  │
│  └────────────┘  │ │  └────────────┘  │ │  └────────────┘  │
│  ┌────────────┐  │ │  ┌────────────┐  │ │  ┌────────────┐  │
│  │ Container  │  │ │  │ Container  │  │ │  │ Container  │  │
│  │ Runtime    │  │ │  │ Runtime    │  │ │  │ Runtime    │  │
│  └────────────┘  │ │  └────────────┘  │ │  └────────────┘  │
│                  │ │                  │ │                  │
│  [Pod] [Pod]     │ │  [Pod] [Pod]     │ │  [Pod] [Pod]     │
└──────────────────┘ └──────────────────┘ └──────────────────┘`}</code></pre>

      <h3>Control Plane Components</h3>
      <ul>
        <li><strong>API Server (kube-apiserver)</strong>: The front door to the cluster. All communication (kubectl, dashboards, other components) goes through the API server. It validates and processes REST requests and updates the cluster state in etcd.</li>
        <li><strong>etcd</strong>: A distributed key-value store that holds the entire cluster state. It is the single source of truth for what should be running, configurations, secrets, and service discovery data.</li>
        <li><strong>Scheduler (kube-scheduler)</strong>: Watches for newly created Pods without an assigned node and selects the best node based on resource requirements, affinity rules, taints, and tolerations.</li>
        <li><strong>Controller Manager</strong>: Runs controller loops that watch the cluster state and make changes to move the current state toward the desired state. Includes the Node Controller, ReplicaSet Controller, Endpoint Controller, and Service Account Controller.</li>
      </ul>

      <h3>Worker Node Components</h3>
      <ul>
        <li><strong>kubelet</strong>: An agent running on each node that ensures containers described in PodSpecs are running and healthy. It communicates with the API server and manages the container lifecycle.</li>
        <li><strong>kube-proxy</strong>: Maintains network rules on each node to enable Service communication. It handles routing traffic to the correct Pod regardless of which node the Pod is running on.</li>
        <li><strong>Container Runtime</strong>: The software that runs containers. Kubernetes supports containerd (default), CRI-O, and other CRI-compatible runtimes. Docker as a runtime was deprecated in Kubernetes 1.24.</li>
      </ul>

      <h2>Setting Up a Local Kubernetes Cluster</h2>
      <p>
        For development and learning, you can run Kubernetes locally using several tools. Here are the most popular options:
      </p>

      <h3>Option 1: Minikube</h3>
      <pre><code className="language-bash">{`# Install minikube (macOS with Homebrew)
brew install minikube

# Install minikube (Linux)
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Start a cluster
minikube start

# Start with specific resources
minikube start --cpus=4 --memory=8192 --driver=docker

# Verify the cluster is running
minikube status

# Open Kubernetes dashboard
minikube dashboard

# Stop the cluster
minikube stop

# Delete the cluster
minikube delete`}</code></pre>

      <h3>Option 2: kind (Kubernetes in Docker)</h3>
      <pre><code className="language-bash">{`# Install kind
brew install kind  # macOS
# or
go install sigs.k8s.io/kind@latest  # with Go

# Create a cluster
kind create cluster --name my-cluster

# Create a multi-node cluster with config
cat <<EOF | kind create cluster --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
- role: worker
EOF

# List clusters
kind get clusters

# Delete a cluster
kind delete cluster --name my-cluster`}</code></pre>

      <h3>Option 3: Docker Desktop</h3>
      <pre><code className="language-text">{`Docker Desktop includes a built-in Kubernetes cluster:

1. Open Docker Desktop
2. Go to Settings → Kubernetes
3. Check "Enable Kubernetes"
4. Click "Apply & Restart"
5. Wait for the Kubernetes icon to turn green

This is the simplest option for Mac and Windows users.`}</code></pre>

      <h3>Install kubectl</h3>
      <pre><code className="language-bash">{`# macOS
brew install kubectl

# Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install kubectl /usr/local/bin/kubectl

# Verify installation
kubectl version --client

# Check cluster connection
kubectl cluster-info

# View nodes
kubectl get nodes`}</code></pre>

      <h2>Core Kubernetes Objects</h2>

      <h3>Pods</h3>
      <p>
        A <strong>Pod</strong> is the smallest deployable unit in Kubernetes. It represents one or more containers that share networking and storage. Most commonly, a Pod runs a single container. Multi-container Pods are used for sidecar patterns (logging, proxying, monitoring).
      </p>
      <pre><code className="language-yaml">{`# pod.yaml - Basic Pod definition
apiVersion: v1
kind: Pod
metadata:
  name: my-app
  labels:
    app: my-app
    version: v1
spec:
  containers:
    - name: app
      image: nginx:1.27-alpine
      ports:
        - containerPort: 80
      resources:
        requests:
          memory: "64Mi"
          cpu: "100m"
        limits:
          memory: "128Mi"
          cpu: "250m"
      livenessProbe:
        httpGet:
          path: /healthz
          port: 80
        initialDelaySeconds: 5
        periodSeconds: 10
      readinessProbe:
        httpGet:
          path: /ready
          port: 80
        initialDelaySeconds: 3
        periodSeconds: 5`}</code></pre>
      <pre><code className="language-bash">{`# Create a Pod
kubectl apply -f pod.yaml

# List all Pods
kubectl get pods

# Get Pod details
kubectl describe pod my-app

# View Pod logs
kubectl logs my-app
kubectl logs my-app -f  # follow logs

# Execute a command in a running Pod
kubectl exec -it my-app -- /bin/sh

# Delete a Pod
kubectl delete pod my-app`}</code></pre>

      <h3>Deployments</h3>
      <p>
        A <strong>Deployment</strong> manages a set of identical Pods (ReplicaSet). It handles rolling updates, rollbacks, and scaling. In practice, you almost never create Pods directly; you use Deployments.
      </p>
      <pre><code className="language-yaml">{`# deployment.yaml
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
      maxSurge: 1          # 1 extra Pod during update
      maxUnavailable: 0     # no downtime
  template:
    metadata:
      labels:
        app: web-app
        version: v1.2.0
    spec:
      containers:
        - name: web
          image: my-app:1.2.0
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: "production"
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: db-credentials
                  key: url
          resources:
            requests:
              memory: "128Mi"
              cpu: "200m"
            limits:
              memory: "256Mi"
              cpu: "500m"
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
            periodSeconds: 5`}</code></pre>
      <pre><code className="language-bash">{`# Apply the deployment
kubectl apply -f deployment.yaml

# Check rollout status
kubectl rollout status deployment/web-app

# View deployment details
kubectl get deployments
kubectl describe deployment web-app

# Scale the deployment
kubectl scale deployment web-app --replicas=5

# Update the image (triggers rolling update)
kubectl set image deployment/web-app web=my-app:1.3.0

# Rollback to previous version
kubectl rollout undo deployment/web-app

# View rollout history
kubectl rollout history deployment/web-app

# Rollback to a specific revision
kubectl rollout undo deployment/web-app --to-revision=2`}</code></pre>

      <h3>Services</h3>
      <p>
        A <strong>Service</strong> provides a stable network endpoint to access a set of Pods. Pods are ephemeral and can be replaced at any time, so you never connect to a Pod directly. Services use label selectors to discover which Pods to route traffic to.
      </p>
      <pre><code className="language-yaml">{`# service.yaml - ClusterIP (internal access only)
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
spec:
  type: ClusterIP
  selector:
    app: web-app
  ports:
    - protocol: TCP
      port: 80          # Service port (what clients use)
      targetPort: 3000   # Container port (where app listens)

---
# NodePort service (accessible from outside the cluster)
apiVersion: v1
kind: Service
metadata:
  name: web-app-nodeport
spec:
  type: NodePort
  selector:
    app: web-app
  ports:
    - port: 80
      targetPort: 3000
      nodePort: 30080    # Accessible at <NodeIP>:30080

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
    - port: 80
      targetPort: 3000`}</code></pre>
      <pre><code className="language-bash">{`# Create a service
kubectl apply -f service.yaml

# List services
kubectl get services

# Get service details
kubectl describe service web-app-service

# Test service from within the cluster
kubectl run test-curl --image=curlimages/curl --rm -it -- \
  curl http://web-app-service/health`}</code></pre>

      <h2>ConfigMaps and Secrets</h2>
      <p>
        <strong>ConfigMaps</strong> store non-confidential configuration data. <strong>Secrets</strong> store sensitive data like passwords, tokens, and certificates. Both can be injected into Pods as environment variables or mounted as files.
      </p>
      <pre><code className="language-yaml">{`# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: "production"
  LOG_LEVEL: "info"
  MAX_CONNECTIONS: "100"
  config.json: |
    {
      "features": {
        "darkMode": true,
        "betaFeatures": false
      },
      "pagination": {
        "defaultPageSize": 20,
        "maxPageSize": 100
      }
    }

---
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
stringData:              # stringData auto-encodes to base64
  username: admin
  password: super-secret-password-123
  url: postgres://admin:super-secret-password-123@db:5432/myapp`}</code></pre>
      <pre><code className="language-yaml">{`# Using ConfigMap and Secret in a Deployment
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
          image: my-app:latest
          # Environment variables from ConfigMap
          envFrom:
            - configMapRef:
                name: app-config
          # Individual values from Secret
          env:
            - name: DB_USERNAME
              valueFrom:
                secretKeyRef:
                  name: db-credentials
                  key: username
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: db-credentials
                  key: password
          # Mount ConfigMap as a file
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

      <h2>Namespaces</h2>
      <p>
        <strong>Namespaces</strong> provide logical isolation within a cluster. They are used to separate environments (dev, staging, production), teams, or applications. Resources within a namespace are isolated by default but can communicate across namespaces using fully qualified DNS names.
      </p>
      <pre><code className="language-bash">{`# Create a namespace
kubectl create namespace staging
kubectl create namespace production

# List namespaces
kubectl get namespaces

# Deploy to a specific namespace
kubectl apply -f deployment.yaml -n staging

# List Pods in a namespace
kubectl get pods -n staging

# Set default namespace for kubectl
kubectl config set-context --current --namespace=staging

# Access a service across namespaces
# Format: <service-name>.<namespace>.svc.cluster.local
curl http://web-app-service.production.svc.cluster.local/api`}</code></pre>

      <h2>Ingress: Exposing Applications to the Internet</h2>
      <p>
        An <strong>Ingress</strong> manages external access to services, typically HTTP/HTTPS. It provides URL-based routing, SSL termination, and virtual hosting. You need an Ingress Controller (such as NGINX Ingress, Traefik, or AWS ALB) to process Ingress rules.
      </p>
      <pre><code className="language-yaml">{`# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
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
      <pre><code className="language-bash">{`# Install NGINX Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml

# Or with Helm
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx

# Apply ingress rules
kubectl apply -f ingress.yaml

# Check ingress
kubectl get ingress
kubectl describe ingress app-ingress`}</code></pre>

      <h2>Persistent Storage</h2>
      <p>
        By default, container storage is ephemeral and lost when the container restarts. <strong>PersistentVolumes (PV)</strong> and <strong>PersistentVolumeClaims (PVC)</strong> provide durable storage that survives Pod restarts and rescheduling.
      </p>
      <pre><code className="language-yaml">{`# PersistentVolumeClaim - request storage
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-data
spec:
  accessModes:
    - ReadWriteOnce      # Single node read-write
  storageClassName: standard
  resources:
    requests:
      storage: 10Gi

---
# StatefulSet with persistent storage (for databases)
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
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
          env:
            - name: POSTGRES_DB
              value: myapp
            - name: POSTGRES_USER
              valueFrom:
                secretKeyRef:
                  name: db-credentials
                  key: username
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: db-credentials
                  key: password
            - name: PGDATA
              value: /var/lib/postgresql/data/pgdata
          volumeMounts:
            - name: postgres-storage
              mountPath: /var/lib/postgresql/data
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
  volumeClaimTemplates:
    - metadata:
        name: postgres-storage
      spec:
        accessModes: ["ReadWriteOnce"]
        storageClassName: standard
        resources:
          requests:
            storage: 10Gi`}</code></pre>

      <h2>Horizontal Pod Autoscaler (HPA)</h2>
      <p>
        The <strong>HPA</strong> automatically scales the number of Pod replicas based on observed CPU utilization, memory usage, or custom metrics. This ensures your application can handle traffic spikes without manual intervention.
      </p>
      <pre><code className="language-yaml">{`# hpa.yaml
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
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70   # Scale up when CPU > 70%
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80   # Scale up when memory > 80%
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
        - type: Pods
          value: 2
          periodSeconds: 60         # Add max 2 pods per minute
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60         # Remove max 10% per minute`}</code></pre>
      <pre><code className="language-bash">{`# Apply HPA
kubectl apply -f hpa.yaml

# Check HPA status
kubectl get hpa
kubectl describe hpa web-app-hpa

# Simulate load to test autoscaling
kubectl run load-test --image=busybox --rm -it -- \
  /bin/sh -c "while true; do wget -q -O- http://web-app-service/; done"

# Watch Pods scale
kubectl get pods -w`}</code></pre>

      <h2>Complete Application Example</h2>
      <p>
        Here is a complete example deploying a Node.js application with a PostgreSQL database, including all necessary Kubernetes resources:
      </p>
      <pre><code className="language-yaml">{`# Complete example: namespace, configmap, secret, deployment, service, ingress

# 1. Namespace
apiVersion: v1
kind: Namespace
metadata:
  name: my-app
---

# 2. ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: my-app
data:
  NODE_ENV: "production"
  PORT: "3000"
  LOG_LEVEL: "info"
---

# 3. Secret
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: my-app
type: Opaque
stringData:
  DATABASE_URL: "postgres://app:secret@postgres:5432/myapp"
  JWT_SECRET: "my-jwt-secret-key-change-in-production"
---

# 4. PostgreSQL StatefulSet
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: my-app
spec:
  serviceName: postgres
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
          env:
            - name: POSTGRES_DB
              value: myapp
            - name: POSTGRES_USER
              value: app
            - name: POSTGRES_PASSWORD
              value: secret
          volumeMounts:
            - name: pg-data
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: pg-data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 5Gi
---

# 5. PostgreSQL Service
apiVersion: v1
kind: Service
metadata:
  name: postgres
  namespace: my-app
spec:
  type: ClusterIP
  selector:
    app: postgres
  ports:
    - port: 5432
      targetPort: 5432
---

# 6. Application Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: my-app
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
        - name: app
          image: my-registry/my-app:1.0.0
          ports:
            - containerPort: 3000
          envFrom:
            - configMapRef:
                name: app-config
            - secretRef:
                name: app-secrets
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "256Mi"
              cpu: "300m"
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 15
            periodSeconds: 20
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10
---

# 7. Application Service
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
  namespace: my-app
spec:
  type: ClusterIP
  selector:
    app: web-app
  ports:
    - port: 80
      targetPort: 3000
---

# 8. Ingress
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-app-ingress
  namespace: my-app
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web-app-service
                port:
                  number: 80`}</code></pre>
      <pre><code className="language-bash">{`# Deploy the complete application
kubectl apply -f complete-app.yaml

# Verify everything is running
kubectl get all -n my-app

# Check Pod logs
kubectl logs -n my-app deployment/web-app

# Port-forward to test locally
kubectl port-forward -n my-app service/web-app-service 8080:80
# Now visit http://localhost:8080`}</code></pre>

      <h2>Essential kubectl Commands</h2>
      <pre><code className="language-bash">{`# --- Cluster Information ---
kubectl cluster-info                    # Cluster details
kubectl get nodes -o wide               # List nodes with extra info
kubectl top nodes                       # Node resource usage
kubectl top pods                        # Pod resource usage

# --- Working with Pods ---
kubectl get pods -A                     # All pods in all namespaces
kubectl get pods -o wide                # Pods with node and IP info
kubectl get pods --show-labels          # Show labels
kubectl get pods -l app=web-app         # Filter by label
kubectl describe pod <pod-name>         # Detailed Pod info
kubectl logs <pod-name> -c <container>  # Logs from specific container
kubectl logs <pod-name> --previous      # Logs from crashed container
kubectl exec -it <pod-name> -- bash     # Shell into a Pod
kubectl port-forward <pod-name> 8080:80 # Forward local port to Pod

# --- Deployments ---
kubectl get deployments                 # List deployments
kubectl rollout status deploy/<name>    # Watch rollout progress
kubectl rollout history deploy/<name>   # View revision history
kubectl rollout undo deploy/<name>      # Rollback to previous
kubectl scale deploy/<name> --replicas=5 # Scale up/down

# --- Debugging ---
kubectl get events --sort-by=.metadata.creationTimestamp
kubectl describe node <node-name>       # Check node conditions
kubectl get pod <name> -o yaml          # Full Pod YAML
kubectl run debug --image=busybox -it --rm -- sh  # Debug container

# --- Resource Management ---
kubectl apply -f manifest.yaml          # Create/update resources
kubectl delete -f manifest.yaml         # Delete resources
kubectl diff -f manifest.yaml           # Preview changes
kubectl get all                         # All resources in namespace`}</code></pre>

      <h2>Kubernetes Best Practices for Beginners</h2>
      <ul>
        <li><strong>Always set resource requests and limits</strong>: Without resource constraints, a single misbehaving Pod can consume all node resources and affect other workloads. Start with conservative limits and adjust based on monitoring.</li>
        <li><strong>Use liveness and readiness probes</strong>: Liveness probes detect crashed applications and trigger restarts. Readiness probes prevent traffic from reaching Pods that are not yet ready to serve requests.</li>
        <li><strong>Never use the <code>latest</code> tag</strong>: Always use specific image tags (e.g., <code>my-app:1.2.3</code>) for reproducible deployments. The <code>latest</code> tag can point to different images over time, causing unexpected behavior.</li>
        <li><strong>Use namespaces for isolation</strong>: Separate environments, teams, and applications into different namespaces. Apply ResourceQuotas and LimitRanges to prevent resource hogging.</li>
        <li><strong>Store configuration in ConfigMaps and Secrets</strong>: Never hardcode configuration values in container images. Use ConfigMaps for non-sensitive data and Secrets for credentials.</li>
        <li><strong>Use Deployments, not bare Pods</strong>: Deployments provide rolling updates, rollbacks, self-healing, and scaling. Bare Pods are not rescheduled when a node fails.</li>
        <li><strong>Implement health checks</strong>: Add both liveness and readiness probes with appropriate timeouts and thresholds. Use <code>startupProbe</code> for slow-starting applications.</li>
        <li><strong>Use labels and selectors consistently</strong>: Labels like <code>app</code>, <code>version</code>, <code>environment</code>, and <code>team</code> make it easy to filter, select, and manage resources across the cluster.</li>
        <li><strong>Keep manifests in version control</strong>: Store all Kubernetes YAML files in Git alongside your application code. Use tools like Kustomize or Helm for environment-specific configurations.</li>
        <li><strong>Start with managed Kubernetes</strong>: For production, use a managed service (EKS, GKE, AKS) instead of managing the control plane yourself. Focus on your application, not cluster operations.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>What is the difference between a Pod and a container?</h3>
      <p>
        A container is a single running process with its own filesystem and network. A Pod is Kubernetes&apos;s smallest unit and can contain one or more containers that share the same network namespace and storage volumes. Containers in the same Pod communicate via localhost. In most cases, a Pod runs a single container.
      </p>

      <h3>When should I use StatefulSet instead of Deployment?</h3>
      <p>
        Use StatefulSets for workloads that require stable, unique network identifiers, stable persistent storage, and ordered deployment and scaling. Common examples include databases (PostgreSQL, MySQL), message queues (Kafka, RabbitMQ), and distributed systems (Elasticsearch, ZooKeeper). For stateless web applications and APIs, use Deployments.
      </p>

      <h3>How do I troubleshoot a Pod that is not starting?</h3>
      <p>
        Start with <code>kubectl describe pod &lt;name&gt;</code> to check the Events section for error messages. Common issues include: ImagePullBackOff (wrong image name or missing credentials), CrashLoopBackOff (application crashing on startup), Pending (insufficient resources or node affinity mismatch), and OOMKilled (out of memory, increase memory limits).
      </p>

      <h3>What is Helm and do I need it?</h3>
      <p>
        Helm is a package manager for Kubernetes. It bundles Kubernetes manifests into reusable &quot;charts&quot; with configurable values. Helm is useful for deploying complex applications with many resources, managing environment-specific configurations, and installing third-party software (databases, monitoring tools, ingress controllers). Beginners should learn raw YAML first, then graduate to Helm as complexity grows.
      </p>

      <h3>How do I monitor my Kubernetes cluster?</h3>
      <p>
        The standard monitoring stack includes Prometheus for metrics collection, Grafana for dashboards and visualization, and the Kubernetes Dashboard for a web UI. For logs, use the ELK stack (Elasticsearch, Logstash, Kibana) or Loki with Grafana. Managed Kubernetes services also provide built-in monitoring through their cloud dashboards.
      </p>

      <h2>Conclusion</h2>
      <p>
        Kubernetes is a powerful platform that transforms how you deploy and manage applications. While the learning curve is steep, the core concepts are straightforward once you understand the building blocks: Pods run your containers, Deployments manage replicas and updates, Services provide stable networking, and ConfigMaps and Secrets handle configuration. Start with a local cluster using Minikube or kind, deploy a simple application, and gradually explore more advanced features like Ingress, persistent storage, autoscaling, and Helm charts. Kubernetes skills are among the most valuable in modern DevOps and cloud-native development.
      </p>
    </>
  );
}
