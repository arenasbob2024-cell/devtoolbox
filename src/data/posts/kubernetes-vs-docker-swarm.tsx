'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Kubernetes vs Docker Swarm: Container Orchestration Comparison',
    intro: 'Kubernetes has become the industry standard for container orchestration, but Docker Swarm offers simplicity for smaller deployments. This comprehensive comparison examines architecture, features, learning curve, and use cases to help you choose the right orchestration platform.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Kubernetes offers enterprise-grade features, extensive ecosystem, and is the industry standard, but has steep learning curve. Docker Swarm provides simplicity, easy setup, and native Docker integration. For production workloads at scale in 2025, Kubernetes is the clear choice. For small teams and simple deployments, Docker Swarm remains viable.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Kubernetes has 95%+ market share for container orchestration',
    takeaway2: 'Docker Swarm is simpler but lacks advanced features',
    takeaway3: 'Both support rolling updates and service discovery',
    takeaway4: 'Kubernetes has steeper learning curve but better tooling',
    takeaway5: 'Docker Swarm is built into Docker Engine',
    takeaway6: 'Kubernetes ecosystem is vastly larger',
    
    whatIsK8sTitle: 'What is Kubernetes?',
    whatIsK8sContent: 'Kubernetes (K8s), developed by Google and now maintained by CNCF, is an open-source container orchestration platform. It provides automated deployment, scaling, and management of containerized applications. Kubernetes has become the de facto standard for container orchestration in enterprise environments.',
    
    whatIsSwarmTitle: 'What is Docker Swarm?',
    whatIsSwarmContent: 'Docker Swarm is Docker\'s native clustering and orchestration solution. It turns a pool of Docker hosts into a single virtual host, enabling container deployment across multiple nodes. Swarm is known for its simplicity and tight integration with Docker CLI.',
    
    architectureTitle: 'Architecture Comparison',
    architectureIntro: 'Fundamental architectural differences:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Detailed feature comparison:',
    
    scalingTitle: 'Scaling Comparison',
    scalingIntro: 'How each platform handles scaling:',
    
    networkingTitle: 'Networking',
    networkingIntro: 'Networking capabilities comparison:',
    
    storageTitle: 'Storage Management',
    storageIntro: 'Persistent storage approaches:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Deploying applications on each platform:',
    
    k8sExampleTitle: 'Kubernetes Deployment',
    swarmExampleTitle: 'Docker Swarm Service',
    
    learningCurveTitle: 'Learning Curve',
    learningCurveIntro: 'Time investment required:',
    
    ecosystemTitle: 'Ecosystem & Tooling',
    ecosystemIntro: 'Available tools and integrations:',
    
    whenToUseTitle: 'When to Use Each',
    k8sBestFor: 'Use Kubernetes When:',
    swarmBestFor: 'Use Docker Swarm When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Kubernetes is the clear winner for production container orchestration. Its extensive features, massive ecosystem, and industry adoption make it the default choice. Docker Swarm remains useful for small-scale deployments, development environments, and teams that prioritize simplicity over advanced features. Most organizations should invest in Kubernetes skills.',
    
    faq1q: 'Can Docker Swarm and Kubernetes coexist?',
    faq1a: 'Yes, you can run both in the same infrastructure. Some organizations use Swarm for development and Kubernetes for production. Tools like Kompose can convert Docker Compose files to Kubernetes manifests.',
    
    faq2q: 'Is Docker Swarm still maintained?',
    faq2a: 'Docker Swarm mode is still included in Docker Engine and receives updates. However, Mirantis now maintains Swarm after acquiring Docker Enterprise. Development has slowed compared to Kubernetes.',
    
    faq3q: 'How many nodes can Kubernetes handle?',
    faq3a: 'Kubernetes can handle 5,000+ nodes and 150,000+ pods per cluster in official tests. Large organizations run clusters with thousands of nodes. Scaling requires proper planning and infrastructure.',
    
    faq4q: 'Can I migrate from Swarm to Kubernetes?',
    faq4a: 'Yes, migration is possible. Use Kompose to convert Compose files to Kubernetes manifests. Red Hat\'s Migration Toolkit for Containers helps with complex migrations. Plan for differences in networking and storage.',
    
    faq5q: 'Which is better for small deployments?',
    faq5a: 'Docker Swarm is easier for small deployments (under 50 containers). For anything larger or requiring advanced features, Kubernetes is worth the investment. Consider managed Kubernetes (GKE, EKS, AKS) to reduce complexity.',
    
    faq6q: 'Does Kubernetes require more resources?',
    faq6a: 'Yes, Kubernetes control plane requires more resources (at least 2GB RAM for master). Docker Swarm is lightweight. However, managed Kubernetes services eliminate this concern.',
    
    faq7q: 'What about monitoring and logging?',
    faq7a: 'Kubernetes has Prometheus, Grafana, ELK stack integration. Docker Swarm relies on third-party tools. Kubernetes ecosystem provides more comprehensive observability solutions.',
    
    faq8q: 'Is Kubernetes overkill for simple apps?',
    faq8a: 'For truly simple apps, yes. Consider serverless platforms or PaaS instead. But if you anticipate growth or need container orchestration features, starting with Kubernetes saves migration effort later.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Kubernetes vs Docker Swarm：容器编排对比',
    intro: 'Kubernetes 已成为容器编排的行业标准，但 Docker Swarm 为较小规模的部署提供了简单性。本全面比较考察架构、功能、学习曲线和用例，帮助您选择合适的编排平台。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Kubernetes 提供企业级功能、广泛的生态系统，是行业标准，但学习曲线陡峭。Docker Swarm 提供简单性、易于设置和原生 Docker 集成。对于 2025 年的大规模生产工作负载，Kubernetes 是明确的选择。对于小团队和简单部署，Docker Swarm 仍然可行。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Kubernetes 在容器编排市场占有率超过 95%',
    takeaway2: 'Docker Swarm 更简单但缺乏高级功能',
    takeaway3: '两者都支持滚动更新和服务发现',
    takeaway4: 'Kubernetes 学习曲线更陡但工具更好',
    takeaway5: 'Docker Swarm 内置于 Docker Engine',
    takeaway6: 'Kubernetes 生态系统大得多',
    
    whatIsK8sTitle: '什么是 Kubernetes？',
    whatIsK8sContent: 'Kubernetes（K8s）由 Google 开发，现在由 CNCF 维护，是一个开源容器编排平台。它提供容器化应用的自动部署、扩展和管理。Kubernetes 已成为企业环境中容器编排的事实标准。',
    
    whatIsSwarmTitle: '什么是 Docker Swarm？',
    whatIsSwarmContent: 'Docker Swarm 是 Docker 的原生集群和编排解决方案。它将 Docker 主机池转换为单个虚拟主机，实现跨多个节点的容器部署。Swarm 以其简单性和与 Docker CLI 的紧密集成而闻名。',
    
    architectureTitle: '架构对比',
    architectureIntro: '根本的架构差异：',
    
    featuresTitle: '功能对比',
    featuresIntro: '详细功能比较：',
    
    scalingTitle: '扩展性对比',
    scalingIntro: '每个平台如何处理扩展：',
    
    networkingTitle: '网络',
    networkingIntro: '网络能力比较：',
    
    storageTitle: '存储管理',
    storageIntro: '持久存储方法：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '在每个平台上部署应用：',
    
    k8sExampleTitle: 'Kubernetes 部署',
    swarmExampleTitle: 'Docker Swarm 服务',
    
    learningCurveTitle: '学习曲线',
    learningCurveIntro: '所需时间投入：',
    
    ecosystemTitle: '生态系统与工具',
    ecosystemIntro: '可用的工具和集成：',
    
    whenToUseTitle: '何时使用',
    k8sBestFor: '使用 Kubernetes 的场景：',
    swarmBestFor: '使用 Docker Swarm 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在 2025 年，Kubernetes 是生产容器编排的明确赢家。其广泛的功能、庞大的生态系统和行业采用使其成为默认选择。Docker Swarm 对于小规模部署、开发环境和优先考虑简单性而非高级功能的团队仍然有用。大多数组织应该投资 Kubernetes 技能。',
    
    faq1q: 'Docker Swarm 和 Kubernetes 可以共存吗？',
    faq1a: '是的，您可以在同一基础设施中运行两者。一些组织在开发中使用 Swarm，在生产中使用 Kubernetes。像 Kompose 这样的工具可以将 Docker Compose 文件转换为 Kubernetes 清单。',
    
    faq2q: 'Docker Swarm 还在维护吗？',
    faq2a: 'Docker Swarm 模式仍然包含在 Docker Engine 中并接收更新。然而，在收购 Docker Enterprise 后，Mirantis 现在维护 Swarm。与 Kubernetes 相比，开发已经放缓。',
    
    faq3q: 'Kubernetes 可以处理多少节点？',
    faq3a: '在官方测试中，Kubernetes 可以处理 5,000+ 节点和每个集群 150,000+ pod。大型组织运行具有数千个节点的集群。扩展需要适当的规划和基础设施。',
    
    faq4q: '我可以从 Swarm 迁移到 Kubernetes 吗？',
    faq4a: '是的，迁移是可能的。使用 Kompose 将 Compose 文件转换为 Kubernetes 清单。Red Hat 的 Migration Toolkit for Containers 帮助进行复杂迁移。规划网络和存储的差异。',
    
    faq5q: '哪个更适合小型部署？',
    faq5a: 'Docker Swarm 对于小型部署（少于 50 个容器）更容易。对于任何更大或需要高级功能的情况，Kubernetes 值得投资。考虑托管 Kubernetes（GKE、EKS、AKS）以降低复杂性。',
    
    faq6q: 'Kubernetes 需要更多资源吗？',
    faq6a: '是的，Kubernetes 控制平面需要更多资源（master 至少 2GB RAM）。Docker Swarm 是轻量级的。然而，托管 Kubernetes 服务消除了这个顾虑。',
    
    faq7q: '监控和日志呢？',
    faq7a: 'Kubernetes 有 Prometheus、Grafana、ELK 栈集成。Docker Swarm 依赖第三方工具。Kubernetes 生态系统提供更全面的可观测性解决方案。',
    
    faq8q: 'Kubernetes 对于简单应用是否过度？',
    faq8a: '对于真正简单的应用，是的。考虑无服务器平台或 PaaS。但如果您预期增长或需要容器编排功能，从 Kubernetes 开始可以节省以后的迁移工作。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function KubernetesVsDockerSwarm({ lang }: { lang: string }) {
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
      
      <h3 style={h3Style}>{ct.whatIsK8sTitle}</h3>
      <p style={pStyle}>{ct.whatIsK8sContent}</p>

      <h3 style={h3Style}>{ct.whatIsSwarmTitle}</h3>
      <p style={pStyle}>{ct.whatIsSwarmContent}</p>

      <h2 style={h2Style}>{ct.architectureTitle}</h2>
      <p style={pStyle}>{ct.architectureIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Kubernetes</th>
              <th style={thStyle}>Docker Swarm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '架构类型' : 'Architecture', 'Declarative API', 'Imperative CLI'],
              [isZh ? 'API服务器' : 'API Server', 'Required', 'Built-in'],
              [isZh ? '键值存储' : 'Key-Value Store', 'etcd', 'Raft consensus'],
              [isZh ? '调度器' : 'Scheduler', 'Advanced (multiple)', 'Simple built-in'],
              [isZh ? '控制器管理器' : 'Controller Manager', 'Yes', 'No'],
              [isZh ? '节点代理' : 'Node Agent', 'kubelet', 'Swarm agent'],
              [isZh ? '网络代理' : 'Network Proxy', 'kube-proxy', 'Overlay network'],
              [isZh ? '最小节点数' : 'Minimum Nodes', '1 (dev) / 3 (prod)', '1'],
            ].map(([feature, k8s, swarm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#3b82f6' }}>{k8s}</td>
                <td style={tdStyle}>{swarm}</td>
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
              <th style={thStyle}>Kubernetes</th>
              <th style={thStyle}>Docker Swarm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '滚动更新' : 'Rolling Updates', '✓', '✓'],
              [isZh ? '回滚' : 'Rollbacks', '✓ Automatic', '✓ Manual'],
              [isZh ? '服务发现' : 'Service Discovery', '✓ CoreDNS', '✓ Built-in'],
              [isZh ? '负载均衡' : 'Load Balancing', '✓ Multiple options', '✓ Built-in'],
              [isZh ? '自动扩缩' : 'Auto-scaling', '✓ HPA/VPA', isZh ? '需第三方' : 'Third-party'],
              [isZh ? '密钥管理' : 'Secrets Management', '✓', '✓'],
              [isZh ? '配置管理' : 'Config Management', 'ConfigMaps', 'Config files'],
              [isZh ? '持久存储' : 'Persistent Storage', 'PV/PVC/CSI', 'Volumes'],
              [isZh ? '健康检查' : 'Health Checks', 'Liveness/Readiness', 'Healthcheck'],
              [isZh ? 'RBAC' : 'RBAC', '✓ Comprehensive', isZh ? '基本' : 'Basic'],
              [isZh ? '命名空间' : 'Namespaces', '✓', '✗'],
              [isZh ? 'CRD' : 'Custom Resources', '✓', '✗'],
            ].map(([feature, k8s, swarm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{k8s}</td>
                <td style={tdStyle}>{swarm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.scalingTitle}</h2>
      <p style={pStyle}>{ct.scalingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '扩展能力' : 'Scaling Capability'}</th>
              <th style={thStyle}>Kubernetes</th>
              <th style={thStyle}>Docker Swarm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '最大节点数' : 'Max Nodes', '5,000+', '~1,000'],
              [isZh ? '每节点最大Pod' : 'Max Pods/Node', '110', 'Limited'],
              [isZh ? '自动扩缩' : 'Auto-scaling', 'HPA, VPA, CA', isZh ? '需第三方' : 'Third-party'],
              [isZh ? '集群自动扩缩' : 'Cluster Autoscaler', '✓', isZh ? '无原生支持' : 'No native'],
              [isZh ? '批处理作业' : 'Batch Jobs', 'Jobs/CronJobs', isZh ? '无' : 'None'],
              [isZh ? '水平扩展' : 'Horizontal Scale', '✓ Native', '✓'],
            ].map(([feature, k8s, swarm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{k8s}</td>
                <td style={tdStyle}>{swarm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.networkingTitle}</h2>
      <p style={pStyle}>{ct.networkingIntro}</p>

      <pre style={codeStyle}><code>{`# Kubernetes Networking
# Services expose applications
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer

---
# Ingress for HTTP routing
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80

# Docker Swarm Networking
# Create overlay network
docker network create -d overlay mynetwork

# Deploy service with network
docker service create \\
  --name myapp \\
  --network mynetwork \\
  --publish 80:8080 \\
  myimage:v1`}</code></pre>

      <h2 style={h2Style}>{ct.storageTitle}</h2>
      <p style={pStyle}>{ct.storageIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '存储特性' : 'Storage Feature'}</th>
              <th style={thStyle}>Kubernetes</th>
              <th style={thStyle}>Docker Swarm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '持久卷' : 'Persistent Volumes', 'PV/PVC', 'Volumes'],
              [isZh ? '存储类' : 'Storage Classes', '✓ Dynamic', isZh ? '手动' : 'Manual'],
              [isZh ? 'CSI支持' : 'CSI Support', '✓', isZh ? '有限' : 'Limited'],
              [isZh ? 'NFS' : 'NFS', '✓', '✓'],
              [isZh ? '云存储' : 'Cloud Storage', 'AWS EBS, GCE, Azure', isZh ? '需插件' : 'Plugins'],
              [isZh ? '本地存储' : 'Local Storage', '✓', '✓'],
            ].map(([feature, k8s, swarm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{k8s}</td>
                <td style={tdStyle}>{swarm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.k8sExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Kubernetes Deployment (deployment.yaml)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp
  labels:
    app: webapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
      - name: webapp
        image: nginx:1.21
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "128Mi"
            cpu: "250m"
          limits:
            memory: "256Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        env:
        - name: ENV
          value: "production"

---
# Service
apiVersion: v1
kind: Service
metadata:
  name: webapp-service
spec:
  selector:
    app: webapp
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer

# Apply deployment
# kubectl apply -f deployment.yaml
# kubectl get pods
# kubectl scale deployment webapp --replicas=5`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.swarmExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Docker Swarm Service (CLI)
# Initialize swarm
docker swarm init

# Deploy service
docker service create \\
  --name webapp \\
  --replicas 3 \\
  --publish 80:80 \\
  --env ENV=production \\
  --health-cmd "curl -f http://localhost/health" \\
  --health-interval 10s \\
  --health-retries 3 \\
  nginx:1.21

# List services
docker service ls

# Scale service
docker service scale webapp=5

# Update service
docker service update --image nginx:1.22 webapp

# Docker Compose for Swarm (docker-compose.yml)
version: "3.8"
services:
  webapp:
    image: nginx:1.21
    ports:
      - "80:80"
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: "0.5"
          memory: 256M
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure

# Deploy stack
# docker stack deploy -c docker-compose.yml myapp`}</code></pre>

      <h2 style={h2Style}>{ct.learningCurveTitle}</h2>
      <p style={pStyle}>{ct.learningCurveIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '学习方面' : 'Learning Aspect'}</th>
              <th style={thStyle}>Kubernetes</th>
              <th style={thStyle}>Docker Swarm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '入门时间' : 'Time to Proficiency', '2-4 weeks', '1-2 days'],
              [isZh ? '概念数量' : 'Concepts to Learn', '50+', '~10'],
              [isZh ? 'CLI命令' : 'CLI Commands', 'kubectl (40+)', 'docker service'],
              [isZh ? 'YAML复杂性' : 'YAML Complexity', isZh ? '高' : 'High', isZh ? '低' : 'Low'],
              [isZh ? '调试难度' : 'Debugging', isZh ? '复杂' : 'Complex', isZh ? '简单' : 'Simple'],
              [isZh ? '文档质量' : 'Documentation', isZh ? '全面' : 'Comprehensive', isZh ? '基础' : 'Basic'],
            ].map(([feature, k8s, swarm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{k8s}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{swarm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.ecosystemTitle}</h2>
      <p style={pStyle}>{ct.ecosystemIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Kubernetes Ecosystem</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Helm (package manager), Prometheus/Grafana (monitoring), Istio/Linkerd (service mesh), ArgoCD/Flux (GitOps), Velero (backup), Rancher (management), OpenShift (enterprise), Minikube/Kind (local dev)
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Docker Swarm Ecosystem</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Docker Compose (local dev), Portainer (GUI), Traefik (ingress), Prometheus (monitoring), basic third-party tools
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.k8sBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '大规模部署' : 'Large-scale deployments'}</li>
            <li>{isZh ? '微服务架构' : 'Microservices architecture'}</li>
            <li>{isZh ? '多云/混合云' : 'Multi-cloud/hybrid'}</li>
            <li>{isZh ? '需要自动扩缩' : 'Auto-scaling needs'}</li>
            <li>{isZh ? '复杂网络需求' : 'Complex networking'}</li>
            <li>{isZh ? 'GitOps工作流' : 'GitOps workflows'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.swarmBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '小团队' : 'Small teams'}</li>
            <li>{isZh ? '简单部署' : 'Simple deployments'}</li>
            <li>{isZh ? '开发/测试环境' : 'Dev/test environments'}</li>
            <li>{isZh ? '少于50容器' : 'Under 50 containers'}</li>
            <li>{isZh ? '快速原型' : 'Quick prototyping'}</li>
            <li>{isZh ? 'Docker生态用户' : 'Docker ecosystem users'}</li>
            <li>{isZh ? '学习曲线敏感' : 'Learning curve sensitive'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/yaml-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>YAML Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encode'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
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
