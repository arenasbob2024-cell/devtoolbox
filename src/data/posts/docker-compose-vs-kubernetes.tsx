'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Docker Compose vs Kubernetes: Container Orchestration Comparison',
    intro: 'Docker Compose and Kubernetes serve different scales of container orchestration. This comprehensive comparison examines use cases, complexity, performance, and real-world scenarios to help you choose the right tool for your infrastructure needs.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Docker Compose is perfect for local development, simple deployments, and single-host scenarios. Kubernetes excels at large-scale, production-grade container orchestration with auto-scaling, self-healing, and multi-node clusters. Choose Compose for simplicity and small scale; choose Kubernetes when you need enterprise-grade reliability and scale.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Docker Compose is ideal for development environments and simple single-host deployments',
    takeaway2: 'Kubernetes provides enterprise-grade features: auto-scaling, self-healing, rolling updates',
    takeaway3: 'Compose uses YAML files that are simpler to write and understand',
    takeaway4: 'Kubernetes has a steeper learning curve but offers much more control',
    takeaway5: 'Both can work together: Compose for dev, Kubernetes for production',
    takeaway6: 'Managed Kubernetes services (EKS, GKE, AKS) reduce operational complexity',
    
    whatIsComposeTitle: 'What is Docker Compose?',
    whatIsComposeContent: 'Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application\'s services, networks, and volumes, then create and start all services with a single command. It\'s designed for development, testing, and simple staging environments.',
    
    whatIsK8sTitle: 'What is Kubernetes?',
    whatIsK8sContent: 'Kubernetes (K8s) is an open-source container orchestration platform originally developed by Google. It automates deployment, scaling, and management of containerized applications across clusters of hosts. Kubernetes provides a framework to run distributed systems resiliently, taking care of scaling and failover for your applications.',
    
    performanceTitle: 'Performance & Scalability',
    performanceIntro: 'Key differences in performance and scaling capabilities:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing core orchestration capabilities:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'See how each tool defines a web application with database:',
    
    composeExampleTitle: 'Docker Compose',
    k8sExampleTitle: 'Kubernetes',
    
    useCasesTitle: 'Use Cases',
    useCasesIntro: 'When to use each tool:',
    
    whenToUseTitle: 'When to Use Each Tool',
    composeBestFor: 'Use Docker Compose When:',
    k8sBestFor: 'Use Kubernetes When:',
    
    migrationTitle: 'Migration Path',
    migrationIntro: 'Moving from Compose to Kubernetes:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Docker Compose and Kubernetes serve different purposes and scales. Compose excels at developer productivity and simple deployments, while Kubernetes is the choice for production-grade, scalable infrastructure. Many teams use both: Compose for local development and CI/CD, Kubernetes for production. Start with Compose if you\'re new to containers, then graduate to Kubernetes when your scale and reliability requirements demand it.',
    
    faq1q: 'Can I use Docker Compose in production?',
    faq1a: 'Yes, Docker Compose can be used in production for simple applications. However, it lacks built-in features like auto-scaling, self-healing, and rolling updates that Kubernetes provides. Consider your availability and scaling requirements before choosing.',
    
    faq2q: 'How do I convert Docker Compose to Kubernetes?',
    faq2a: 'Tools like Kompose can automatically convert docker-compose.yml files to Kubernetes manifests. However, manual tuning is usually needed to take advantage of Kubernetes-specific features like deployments, services, and configmaps.',
    
    faq3q: 'Is Kubernetes overkill for small projects?',
    faq3a: 'For small projects with simple requirements, Kubernetes can add unnecessary complexity. Consider using Docker Compose, Docker Swarm, or managed container services like AWS ECS or Google Cloud Run for simpler alternatives.',
    
    faq4q: 'Can Docker Compose do load balancing?',
    faq4a: 'Docker Compose itself doesn\'t provide load balancing. You need to add a reverse proxy like Nginx or Traefik to your compose file for load balancing between container instances.',
    
    faq5q: 'What is the learning curve for Kubernetes?',
    faq5a: 'Kubernetes has a steep learning curve. Expect 2-4 weeks to understand core concepts (pods, services, deployments) and several months to become proficient. Managed services and tools like Helm can reduce complexity.',
    
    faq6q: 'Does Docker Compose support scaling?',
    faq6a: 'Yes, you can scale services with "docker-compose up --scale service=N". However, this only works on a single host. For multi-host scaling, you need Kubernetes, Docker Swarm, or similar orchestrators.',
    
    faq7q: 'Can I run Kubernetes locally?',
    faq7a: 'Yes, tools like Minikube, kind, k3s, and Docker Desktop with Kubernetes enabled allow you to run Kubernetes locally for development and learning purposes.',
    
    faq8q: 'What about Docker Swarm vs Kubernetes?',
    faq8a: 'Docker Swarm is simpler than Kubernetes and integrates natively with Docker. However, it has fewer features and a smaller ecosystem. Kubernetes has become the industry standard for container orchestration.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Docker Compose vs Kubernetes：容器编排对比',
    intro: 'Docker Compose和Kubernetes服务于不同规模的容器编排需求。本全面比较考察使用场景、复杂度、性能和真实案例，帮助你为基础设施需求选择合适的工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Docker Compose非常适合本地开发、简单部署和单主机场景。Kubernetes在大规模、生产级容器编排方面表现出色，提供自动扩缩容、自愈能力和多节点集群。追求简单和小规模时选择Compose；需要企业级可靠性和规模时选择Kubernetes。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Docker Compose非常适合开发环境和简单的单主机部署',
    takeaway2: 'Kubernetes提供企业级功能：自动扩缩容、自愈能力、滚动更新',
    takeaway3: 'Compose使用YAML文件，更简单易懂',
    takeaway4: 'Kubernetes学习曲线较陡，但提供更多控制',
    takeaway5: '两者可以配合使用：Compose用于开发，Kubernetes用于生产',
    takeaway6: '托管Kubernetes服务（EKS、GKE、AKS）降低运维复杂度',
    
    whatIsComposeTitle: '什么是Docker Compose？',
    whatIsComposeContent: 'Docker Compose是定义和运行多容器Docker应用的工具。使用Compose，你可以用YAML文件配置服务、网络和卷，然后用单个命令创建和启动所有服务。它专为开发、测试和简单的预发布环境设计。',
    
    whatIsK8sTitle: '什么是Kubernetes？',
    whatIsK8sContent: 'Kubernetes（K8s）是Google最初开发的开源容器编排平台。它自动管理跨主机集群的容器化应用的部署、扩展和运维。Kubernetes提供了弹性运行分布式系统的框架，负责应用的扩展和故障转移。',
    
    performanceTitle: '性能与扩展性',
    performanceIntro: '性能和扩展能力的关键差异：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较核心编排能力：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '查看每个工具如何定义带数据库的Web应用：',
    
    composeExampleTitle: 'Docker Compose',
    k8sExampleTitle: 'Kubernetes',
    
    useCasesTitle: '使用场景',
    useCasesIntro: '何时使用每个工具：',
    
    whenToUseTitle: '何时使用每个工具',
    composeBestFor: '使用Docker Compose的场景：',
    k8sBestFor: '使用Kubernetes的场景：',
    
    migrationTitle: '迁移路径',
    migrationIntro: '从Compose迁移到Kubernetes：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Docker Compose和Kubernetes服务于不同的目的和规模。Compose在开发效率和简单部署方面表现出色，而Kubernetes是生产级、可扩展基础设施的选择。许多团队同时使用两者：Compose用于本地开发和CI/CD，Kubernetes用于生产。如果你是容器新手，从Compose开始，当规模和可靠性需求增加时再迁移到Kubernetes。',
    
    faq1q: 'Docker Compose可以在生产环境使用吗？',
    faq1a: '可以，Docker Compose可以在生产环境中用于简单应用。但是，它缺少Kubernetes提供的自动扩缩容、自愈能力和滚动更新等功能。选择前请考虑你的可用性和扩展需求。',
    
    faq2q: '如何将Docker Compose转换为Kubernetes？',
    faq2a: 'Kompose等工具可以自动将docker-compose.yml文件转换为Kubernetes清单。但是，通常需要手动调整以利用Kubernetes特有的功能，如Deployment、Service和ConfigMap。',
    
    faq3q: 'Kubernetes对小项目来说是否过于复杂？',
    faq3a: '对于需求简单的小项目，Kubernetes可能增加不必要的复杂性。考虑使用Docker Compose、Docker Swarm或AWS ECS、Google Cloud Run等托管容器服务作为更简单的替代方案。',
    
    faq4q: 'Docker Compose可以做负载均衡吗？',
    faq4a: 'Docker Compose本身不提供负载均衡。你需要在compose文件中添加Nginx或Traefik等反向代理来实现容器实例间的负载均衡。',
    
    faq5q: 'Kubernetes的学习曲线如何？',
    faq5a: 'Kubernetes学习曲线较陡。预计需要2-4周理解核心概念（Pod、Service、Deployment），几个月才能熟练。托管服务和Helm等工具可以降低复杂度。',
    
    faq6q: 'Docker Compose支持扩展吗？',
    faq6a: '支持，你可以使用"docker-compose up --scale service=N"扩展服务。但是，这只在单主机上有效。要多主机扩展，你需要Kubernetes、Docker Swarm或类似的编排器。',
    
    faq7q: '可以在本地运行Kubernetes吗？',
    faq7a: '可以，Minikube、kind、k3s和启用Kubernetes的Docker Desktop等工具允许你在本地运行Kubernetes，用于开发和学习目的。',
    
    faq8q: 'Docker Swarm和Kubernetes相比如何？',
    faq8a: 'Docker Swarm比Kubernetes更简单，与Docker原生集成。但是，它的功能较少，生态系统较小。Kubernetes已成为容器编排的行业标准。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function DockerComposeVsKubernetes({ lang }: { lang: string }) {
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

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      {/* Key Takeaways */}
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

      {/* Overview */}
      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>
      
      <h3 style={h3Style}>{ct.whatIsComposeTitle}</h3>
      <p style={pStyle}>{ct.whatIsComposeContent}</p>

      <h3 style={h3Style}>{ct.whatIsK8sTitle}</h3>
      <p style={pStyle}>{ct.whatIsK8sContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Docker Compose</th>
              <th style={thStyle}>Kubernetes</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2013', '2014'],
              [isZh ? '开发方' : 'Developed By', 'Docker Inc', 'Google/CNCF'],
              [isZh ? '目标规模' : 'Target Scale', 'Single Host', 'Multi-Node Clusters'],
              [isZh ? '配置格式' : 'Config Format', 'docker-compose.yml', 'YAML Manifests'],
              [isZh ? '自动扩缩容' : 'Auto-Scaling', 'No', 'Yes (HPA/VPA)'],
              [isZh ? '自愈能力' : 'Self-Healing', 'Limited', 'Yes (Restart Policies)'],
              [isZh ? '服务发现' : 'Service Discovery', 'DNS (single host)', 'DNS + Service Mesh'],
              [isZh ? '负载均衡' : 'Load Balancing', 'Manual', 'Built-in'],
              [isZh ? '滚动更新' : 'Rolling Updates', 'Limited', 'Yes (Deployments)'],
              [isZh ? '学习曲线' : 'Learning Curve', 'Low', 'High'],
            ].map(([feature, compose, k8s], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{compose}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{k8s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Docker Compose</th>
              <th style={thStyle}>Kubernetes</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '最大节点数' : 'Max Nodes', '1', '1000+'],
              [isZh ? '容器启动时间' : 'Container Startup', '< 1s', '2-30s (Pod scheduling)'],
              [isZh ? '资源开销' : 'Resource Overhead', 'Minimal', '~500MB+ (control plane)'],
              [isZh ? '水平扩展' : 'Horizontal Scaling', 'Manual', 'Automatic (HPA)'],
              [isZh ? '高可用性' : 'High Availability', 'No', 'Yes (multi-node)'],
              [isZh ? '配置复杂度' : 'Config Complexity', 'Low', 'High'],
            ].map(([metric, compose, k8s], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{compose}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{k8s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Docker Compose</th>
              <th style={thStyle}>Kubernetes</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '多容器应用' : 'Multi-Container Apps', '✓', '✓'],
              [isZh ? '网络配置' : 'Networking', 'Basic', 'Advanced (CNI)'],
              [isZh ? '存储卷' : 'Volumes/Storage', '✓', 'PV/PVC/StorageClass'],
              [isZh ? '密钥管理' : 'Secrets', 'Basic', 'Secrets + Vault Integration'],
              [isZh ? '配置管理' : 'Config Management', 'Environment', 'ConfigMaps'],
              [isZh ? '健康检查' : 'Health Checks', 'Limited', 'Liveness/Readiness Probes'],
              [isZh ? '资源限制' : 'Resource Limits', 'Basic', 'Requests/Limits'],
              [isZh ? 'RBAC' : 'RBAC', 'No', 'Yes'],
              [isZh ? '命名空间隔离' : 'Namespace Isolation', 'No', 'Yes'],
              [isZh ? 'CRD扩展' : 'CRD Extensions', 'No', 'Yes'],
            ].map(([feature, compose, k8s], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{compose}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{k8s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#2496ed' }}>{ct.composeExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://db:5432/myapp
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:`}</code></pre>

      <h3 style={{ ...h3Style, color: '#326ce5' }}>{ct.k8sExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# kubernetes/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
---
# postgres-statefulset.yaml
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
        image: postgres:15
        ports:
        - containerPort: 5432
        env:
        - name: POSTGRES_DB
          value: myapp
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: password
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: postgres-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi`}</code></pre>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #2496ed' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#2496ed' }}>{ct.composeBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '本地开发环境' : 'Local development environments'}</li>
            <li>{isZh ? 'CI/CD流水线' : 'CI/CD pipelines'}</li>
            <li>{isZh ? '小型单机部署' : 'Small single-server deployments'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '学习Docker' : 'Learning Docker'}</li>
            <li>{isZh ? '简单的预发布环境' : 'Simple staging environments'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #326ce5' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#326ce5' }}>{ct.k8sBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '生产级应用' : 'Production-grade applications'}</li>
            <li>{isZh ? '需要高可用性' : 'High availability requirements'}</li>
            <li>{isZh ? '自动扩缩容需求' : 'Auto-scaling needs'}</li>
            <li>{isZh ? '多节点集群' : 'Multi-node clusters'}</li>
            <li>{isZh ? '微服务架构' : 'Microservices architecture'}</li>
            <li>{isZh ? '企业级部署' : 'Enterprise deployments'}</li>
          </ul>
        </div>
      </div>

      {/* Migration */}
      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`# Install Kompose
curl -L https://github.com/kubernetes/kompose/releases/download/v1.28.0/kompose-linux-amd64 -o kompose
chmod +x kompose
sudo mv ./kompose /usr/local/bin/kompose

# Convert docker-compose.yml to Kubernetes manifests
kompose convert

# This generates:
# - deployment-web.yaml
# - deployment-db.yaml
# - service-web.yaml
# - persistentvolumeclaim.yaml

# Apply to Kubernetes
kubectl apply -f .

# Or use Helm for more control
helm create myapp
# Edit templates to match your needs`}</code></pre>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/yaml-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>YAML Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
      </div>

      {/* FAQ */}
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
