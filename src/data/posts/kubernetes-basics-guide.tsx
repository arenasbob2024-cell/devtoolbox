export default function KubernetesBasicsGuide() {
  return (
    <>
      <h2>Kubernetes Basics: Getting Started Guide for Developers</h2>
      <p>
        Kubernetes (often abbreviated as K8s) has become the industry standard for container orchestration.
        Whether you are deploying microservices, scaling a web application, or managing complex distributed
        systems, Kubernetes provides a powerful platform that automates deployment, scaling, and operations
        of application containers. This guide covers the fundamental concepts every developer needs to
        understand before working with Kubernetes in 2026.
      </p>

      <h2>What is Kubernetes?</h2>
      <p>
        Kubernetes is an open-source container orchestration platform originally developed by Google and now
        maintained by the Cloud Native Computing Foundation (CNCF). It manages containerized workloads and
        services, providing declarative configuration and automation. Instead of manually deploying containers
        on individual servers, Kubernetes handles scheduling, networking, storage, and health monitoring
        automatically.
      </p>
      <p>
        Key problems Kubernetes solves:
      </p>
      <ul>
        <li><strong>Service discovery and load balancing</strong> - Kubernetes can expose a container using a DNS name or its own IP address and load-balance traffic across replicas</li>
        <li><strong>Storage orchestration</strong> - Automatically mount local storage, cloud providers, or network storage systems</li>
        <li><strong>Automated rollouts and rollbacks</strong> - Describe the desired state and Kubernetes changes the actual state at a controlled rate</li>
        <li><strong>Self-healing</strong> - Restarts failed containers, replaces and reschedules containers when nodes die</li>
        <li><strong>Secret and configuration management</strong> - Deploy and update secrets and application configuration without rebuilding images</li>
        <li><strong>Horizontal scaling</strong> - Scale your application up or down with a single command, a UI, or automatically based on CPU usage</li>
      </ul>

      <h2>Core Concepts and Architecture</h2>

      <h3>Cluster Architecture</h3>
      <p>
        A Kubernetes cluster consists of two main components: the Control Plane (master) and Worker Nodes.
        The Control Plane manages the overall state of the cluster, while Worker Nodes run your application
        workloads.
      </p>
      <ul>
        <li><strong>Control Plane</strong> - Runs the API server, scheduler, controller manager, and etcd (key-value store for cluster data)</li>
        <li><strong>Worker Nodes</strong> - Run the kubelet agent, container runtime (containerd or CRI-O), and kube-proxy</li>
        <li><strong>kubectl</strong> - The command-line tool used to interact with the Kubernetes API server</li>
      </ul>

      <h3>Pods</h3>
      <p>
        A Pod is the smallest deployable unit in Kubernetes. It represents one or more containers that share
        storage, network, and a specification for how to run. In most cases, a Pod runs a single container,
        but multi-container Pods are used for sidecar patterns like logging agents or service meshes.
      </p>
      <pre><code>{`# pod.yaml - A simple Pod definition
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
          cpu: "250m"
        limits:
          memory: "256Mi"
          cpu: "500m"
      env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url`}</code></pre>

      <h3>Deployments</h3>
      <p>
        Deployments are the recommended way to manage Pods in production. A Deployment describes a desired
        state (e.g., 3 replicas of your app), and the Deployment controller changes the actual state to match.
        Deployments support rolling updates, rollbacks, and scaling.
      </p>
      <pre><code>{`# deployment.yaml
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
        - name: web
          image: my-registry/web-app:v1.2.0
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 15
            periodSeconds: 20
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "1000m"`}</code></pre>

      <h3>Services</h3>
      <p>
        A Service exposes a set of Pods as a network service. Since Pods are ephemeral (they can be created
        and destroyed at any time), Services provide a stable endpoint for communication. Kubernetes supports
        several Service types:
      </p>
      <ul>
        <li><strong>ClusterIP</strong> (default) - Exposes the Service on an internal IP, accessible only within the cluster</li>
        <li><strong>NodePort</strong> - Exposes the Service on each node&apos;s IP at a static port (30000-32767)</li>
        <li><strong>LoadBalancer</strong> - Provisions an external load balancer (cloud provider specific)</li>
        <li><strong>ExternalName</strong> - Maps the Service to a DNS name</li>
      </ul>
      <pre><code>{`# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
spec:
  type: LoadBalancer
  selector:
    app: web-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080

---
# Internal service for database
apiVersion: v1
kind: Service
metadata:
  name: database-service
spec:
  type: ClusterIP
  selector:
    app: postgres
  ports:
    - protocol: TCP
      port: 5432
      targetPort: 5432`}</code></pre>

      <h2>Essential kubectl Commands</h2>
      <p>
        kubectl is the primary command-line tool for managing Kubernetes clusters. Here are the commands
        you will use most frequently:
      </p>
      <pre><code>{`# Cluster information
kubectl cluster-info
kubectl get nodes
kubectl get namespaces

# Working with Pods
kubectl get pods                           # List all pods in default namespace
kubectl get pods -n my-namespace           # List pods in specific namespace
kubectl get pods -o wide                   # Show additional details (node, IP)
kubectl describe pod my-app                # Detailed pod information
kubectl logs my-app                        # View pod logs
kubectl logs my-app -f                     # Stream logs in real-time
kubectl logs my-app -c sidecar             # Logs from specific container
kubectl exec -it my-app -- /bin/sh         # Shell into a pod

# Working with Deployments
kubectl get deployments
kubectl create deployment web --image=nginx:latest
kubectl scale deployment web --replicas=5
kubectl set image deployment/web web=nginx:1.25
kubectl rollout status deployment/web
kubectl rollout history deployment/web
kubectl rollout undo deployment/web        # Rollback to previous version

# Apply configuration files
kubectl apply -f deployment.yaml
kubectl apply -f ./k8s/                    # Apply all files in directory
kubectl delete -f deployment.yaml

# Resource management
kubectl top pods                           # CPU/memory usage
kubectl top nodes
kubectl get events --sort-by=.metadata.creationTimestamp`}</code></pre>

      <h2>ConfigMaps and Secrets</h2>
      <p>
        ConfigMaps store non-confidential configuration data as key-value pairs. Secrets store sensitive
        data like passwords, tokens, and TLS certificates. Both can be injected into Pods as environment
        variables or mounted as files.
      </p>
      <pre><code>{`# configmap.yaml
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
      "feature_flags": {
        "new_dashboard": true,
        "beta_api": false
      }
    }

---
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
stringData:
  database-url: "postgresql://user:pass@db:5432/myapp"
  api-key: "sk-abc123def456"

---
# Using ConfigMap and Secret in a Pod
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
        - name: app
          image: my-app:latest
          envFrom:
            - configMapRef:
                name: app-config
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: app-secrets
                  key: database-url
          volumeMounts:
            - name: config-volume
              mountPath: /app/config
      volumes:
        - name: config-volume
          configMap:
            name: app-config
            items:
              - key: config.json
                path: config.json`}</code></pre>

      <h2>Namespaces</h2>
      <p>
        Namespaces provide a way to divide cluster resources between multiple users or teams. They are
        useful for organizing environments (dev, staging, production) or isolating teams within a shared
        cluster.
      </p>
      <pre><code>{`# Create namespaces
kubectl create namespace development
kubectl create namespace staging
kubectl create namespace production

# Deploy to a specific namespace
kubectl apply -f deployment.yaml -n staging

# Set default namespace for kubectl
kubectl config set-context --current --namespace=development

# Resource quotas per namespace
apiVersion: v1
kind: ResourceQuota
metadata:
  name: dev-quota
  namespace: development
spec:
  hard:
    pods: "20"
    requests.cpu: "4"
    requests.memory: "8Gi"
    limits.cpu: "8"
    limits.memory: "16Gi"`}</code></pre>

      <h2>Ingress Controllers</h2>
      <p>
        Ingress manages external HTTP and HTTPS access to services within a cluster. An Ingress controller
        (like NGINX Ingress or Traefik) reads Ingress resources and configures the load balancer accordingly.
        This allows path-based and host-based routing, TLS termination, and more.
      </p>
      <pre><code>{`# ingress.yaml
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
        - myapp.example.com
        - api.example.com
      secretName: app-tls
  rules:
    - host: myapp.example.com
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
                  number: 8080
          - path: /v2
            pathType: Prefix
            backend:
              service:
                name: api-v2-service
                port:
                  number: 8080`}</code></pre>

      <h2>Local Development with Minikube</h2>
      <p>
        Minikube runs a single-node Kubernetes cluster on your local machine. It is the easiest way to
        learn and experiment with Kubernetes without needing a cloud provider.
      </p>
      <pre><code>{`# Install minikube (macOS)
brew install minikube

# Start a local cluster
minikube start --driver=docker --cpus=4 --memory=8192

# Enable useful addons
minikube addons enable ingress
minikube addons enable metrics-server
minikube addons enable dashboard

# Open Kubernetes dashboard
minikube dashboard

# Access a LoadBalancer service locally
minikube tunnel

# Stop and delete cluster
minikube stop
minikube delete`}</code></pre>

      <h2>Health Checks and Probes</h2>
      <p>
        Kubernetes uses probes to determine the health of a container. Configuring probes correctly is
        critical for reliable deployments and self-healing behavior.
      </p>
      <ul>
        <li><strong>Liveness probe</strong> - Determines if a container is running. If it fails, Kubernetes restarts the container</li>
        <li><strong>Readiness probe</strong> - Determines if a container is ready to accept traffic. If it fails, the Pod is removed from Service endpoints</li>
        <li><strong>Startup probe</strong> - Used for slow-starting containers. Disables liveness and readiness checks until the container has started</li>
      </ul>
      <pre><code>{`spec:
  containers:
    - name: app
      image: my-app:latest
      ports:
        - containerPort: 8080

      # Liveness: restart if /healthz fails
      livenessProbe:
        httpGet:
          path: /healthz
          port: 8080
        initialDelaySeconds: 15
        periodSeconds: 20
        failureThreshold: 3

      # Readiness: stop sending traffic if /ready fails
      readinessProbe:
        httpGet:
          path: /ready
          port: 8080
        initialDelaySeconds: 5
        periodSeconds: 10
        failureThreshold: 3

      # Startup: allow up to 5 minutes for slow startup
      startupProbe:
        httpGet:
          path: /healthz
          port: 8080
        failureThreshold: 30
        periodSeconds: 10`}</code></pre>

      <h2>Best Practices for Beginners</h2>
      <ul>
        <li><strong>Always set resource requests and limits</strong> - Prevents a single Pod from consuming all node resources and helps the scheduler make better decisions</li>
        <li><strong>Use Deployments, not bare Pods</strong> - Deployments handle rolling updates, rollbacks, and self-healing automatically</li>
        <li><strong>Configure health probes</strong> - Readiness and liveness probes enable Kubernetes to route traffic correctly and restart unhealthy containers</li>
        <li><strong>Use namespaces for isolation</strong> - Separate environments and teams with namespaces and resource quotas</li>
        <li><strong>Store configuration in ConfigMaps</strong> - Never hardcode configuration in container images; use ConfigMaps and Secrets for environment-specific values</li>
        <li><strong>Use labels consistently</strong> - Labels like app, version, environment enable powerful selection, monitoring, and automation</li>
        <li><strong>Pin image versions</strong> - Never use the <code>latest</code> tag in production; always specify exact image versions for reproducibility</li>
        <li><strong>Enable RBAC</strong> - Use Role-Based Access Control to limit what users and service accounts can do</li>
        <li><strong>Monitor with metrics-server</strong> - Install metrics-server for <code>kubectl top</code> and Horizontal Pod Autoscaler</li>
        <li><strong>Start with managed Kubernetes</strong> - Use EKS, GKE, or AKS for production instead of managing your own control plane</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>What is the difference between Docker and Kubernetes?</h3>
      <p>
        Docker is a container runtime that builds and runs individual containers. Kubernetes is an
        orchestration platform that manages many containers across many machines. Docker creates
        the containers; Kubernetes decides where to run them, how many to run, how to network them
        together, and how to handle failures. In modern Kubernetes, containerd (a component of Docker)
        is typically used as the container runtime.
      </p>

      <h3>When should I use Kubernetes?</h3>
      <p>
        Kubernetes is ideal when you need to run multiple services that must scale independently,
        require high availability, or need automated deployment workflows. If you have a single
        small application, simpler solutions like Docker Compose, a PaaS (Heroku, Railway), or
        serverless might be more appropriate. Kubernetes adds operational complexity, so evaluate
        whether the benefits justify the overhead.
      </p>

      <h3>How does Kubernetes handle scaling?</h3>
      <p>
        Kubernetes supports both horizontal and vertical scaling. Horizontal Pod Autoscaler (HPA)
        automatically adjusts the number of Pod replicas based on CPU utilization, memory usage, or
        custom metrics. Vertical Pod Autoscaler (VPA) adjusts resource requests and limits. Cluster
        Autoscaler adds or removes nodes from the cluster based on pending Pod demands.
      </p>

      <h3>What is Helm and should I use it?</h3>
      <p>
        Helm is a package manager for Kubernetes that bundles related YAML manifests into reusable
        charts. It simplifies deploying complex applications (databases, monitoring stacks, ingress
        controllers) with a single command. Helm is recommended once you move beyond simple
        deployments and need to manage multiple environments or share configurations across teams.
      </p>

      <h3>How do I debug a failing Pod?</h3>
      <p>
        Start with <code>kubectl describe pod &lt;name&gt;</code> to see events and status conditions.
        Check logs with <code>kubectl logs &lt;name&gt;</code>. If the container is crash-looping, use
        <code>kubectl logs &lt;name&gt; --previous</code> to see logs from the last terminated container.
        For deeper debugging, use <code>kubectl exec -it &lt;name&gt; -- /bin/sh</code> to shell into
        the running container and inspect the filesystem, network, and processes.
      </p>
    </>
  );
}
