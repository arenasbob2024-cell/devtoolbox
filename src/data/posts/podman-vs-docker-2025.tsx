'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Podman vs Docker 2025: Container Runtime Comparison',
    intro: 'Podman has emerged as a Docker alternative with daemonless architecture and rootless containers. This comprehensive comparison examines security, performance, compatibility, and real-world usage to help you choose the right container runtime for 2025.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Podman offers enhanced security with rootless containers and daemonless architecture, making it ideal for multi-tenant and security-conscious environments. Docker remains more user-friendly with better tooling ecosystem. Both use OCI-compliant containers, so images are interchangeable. For maximum security, choose Podman; for ease of use and ecosystem, choose Docker.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Podman runs without a daemon, improving security and reliability',
    takeaway2: 'Podman supports rootless containers natively, enhancing multi-tenant security',
    takeaway3: 'Docker has a larger ecosystem and better documentation',
    takeaway4: 'Both are OCI-compliant, images work on either runtime',
    takeaway5: 'Podman is Docker CLI compatible with alias support',
    takeaway6: 'Podman integrates better with systemd for production deployments',
    
    whatIsPodmanTitle: 'What is Podman?',
    whatIsPodmanContent: 'Podman (Pod Manager) is a daemonless, open-source container engine developed by Red Hat. It follows the OCI (Open Container Initiative) standards and can run containers as root or in rootless mode. Podman uses a fork-exec model instead of a client-server architecture, eliminating the single point of failure that a daemon represents.',
    
    whatIsDockerTitle: 'What is Docker?',
    whatIsDockerContent: 'Docker revolutionized containerization when it launched in 2013. It uses a client-server architecture with a daemon (dockerd) that manages containers. Docker Desktop provides an easy-to-use GUI for development, and Docker Hub offers a vast registry of pre-built images. It remains the most widely adopted container platform.',
    
    performanceTitle: 'Performance & Architecture',
    performanceIntro: 'Key architectural and performance differences:',
    
    securityTitle: 'Security Comparison',
    securityIntro: 'Security features and considerations:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing core capabilities:',
    
    codeExampleTitle: 'CLI Examples',
    codeExampleIntro: 'See how commands compare between Podman and Docker:',
    
    podmanExampleTitle: 'Podman Commands',
    dockerExampleTitle: 'Docker Commands',
    
    whenToUseTitle: 'When to Use Each Tool',
    podmanBestFor: 'Use Podman When:',
    dockerBestFor: 'Use Docker When:',
    
    migrationTitle: 'Migrating from Docker to Podman',
    migrationIntro: 'Easy transition steps:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both Podman and Docker are mature, production-ready container runtimes. Podman excels in security-critical environments with its rootless containers and daemonless architecture. Docker maintains an edge in developer experience and ecosystem tooling. For most development workflows, Docker remains the default choice. For production deployments, especially in multi-tenant or regulated environments, Podman offers compelling security advantages. Many organizations use both: Docker for development and Podman for production.',
    
    faq1q: 'Can Podman run Docker images?',
    faq1a: 'Yes, Podman can run any OCI-compliant container image, including those from Docker Hub. The image formats are identical, so you can pull and run the same images with either tool.',
    
    faq2q: 'Is Podman a drop-in replacement for Docker?',
    faq2a: 'Almost. Podman provides Docker-compatible CLI commands. You can even create an alias "alias docker=podman" to use familiar Docker commands. However, some advanced Docker features like Docker Swarm are not supported.',
    
    faq3q: 'Why is Podman considered more secure?',
    faq3a: 'Podman runs rootless containers by default, meaning containers run as a regular user without root privileges. It also has no daemon (eliminating a potential attack surface) and integrates with user namespaces for additional isolation.',
    
    faq4q: 'Does Podman have a GUI like Docker Desktop?',
    faq4a: 'Yes, Podman Desktop is a GUI application similar to Docker Desktop. It provides a visual interface for managing containers, images, and pods across Linux, macOS, and Windows.',
    
    faq5q: 'Can I use docker-compose with Podman?',
    faq5a: 'Yes, Podman supports Docker Compose through "podman-compose". Alternatively, Podman has native support for Kubernetes YAML files and Pods, which can replace many compose use cases.',
    
    faq6q: 'Which is faster, Podman or Docker?',
    faq6a: 'Performance is comparable for most use cases. Podman may have slightly faster container startup due to its fork-exec model. Docker may be faster for operations that benefit from its daemon caching. Differences are usually negligible.',
    
    faq7q: 'Does Podman support Kubernetes?',
    faq7a: 'Yes, Podman can generate Kubernetes YAML from running containers ("podman generate kube") and deploy pods from Kubernetes YAML ("podman play kube"). This makes it easy to transition to Kubernetes.',
    
    faq8q: 'What about Docker Desktop licensing?',
    faq8a: 'Docker Desktop requires a paid subscription for commercial use in larger organizations. Podman Desktop is completely free and open source, making it an attractive alternative for cost-conscious organizations.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Podman vs Docker 2025：容器运行时对比',
    intro: 'Podman作为Docker的替代品，以无守护进程架构和无根容器著称。本全面比较考察安全性、性能、兼容性和实际使用场景，帮助你在2025年选择合适的容器运行时。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Podman通过无根容器和无守护进程架构提供增强的安全性，非常适合多租户和安全敏感环境。Docker仍然更用户友好，拥有更好的工具生态系统。两者都使用OCI兼容容器，镜像可互换。追求最高安全性选择Podman；追求易用性和生态系统选择Docker。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Podman无需守护进程运行，提高安全性和可靠性',
    takeaway2: 'Podman原生支持无根容器，增强多租户安全性',
    takeaway3: 'Docker拥有更大的生态系统和更好的文档',
    takeaway4: '两者都符合OCI标准，镜像可在任一运行时使用',
    takeaway5: 'Podman兼容Docker CLI，支持别名',
    takeaway6: 'Podman与systemd集成更好，适合生产部署',
    
    whatIsPodmanTitle: '什么是Podman？',
    whatIsPodmanContent: 'Podman（Pod管理器）是Red Hat开发的无守护进程开源容器引擎。它遵循OCI（开放容器倡议）标准，可以以root或无根模式运行容器。Podman使用fork-exec模型而非客户端-服务器架构，消除了守护进程代表的单点故障。',
    
    whatIsDockerTitle: '什么是Docker？',
    whatIsDockerContent: 'Docker在2013年推出时彻底改变了容器化。它使用客户端-服务器架构，通过守护进程（dockerd）管理容器。Docker Desktop提供易于使用的GUI开发环境，Docker Hub提供大量预构建镜像注册表。它仍然是最广泛采用的容器平台。',
    
    performanceTitle: '性能与架构',
    performanceIntro: '关键架构和性能差异：',
    
    securityTitle: '安全性对比',
    securityIntro: '安全功能和注意事项：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较核心能力：',
    
    codeExampleTitle: 'CLI示例',
    codeExampleIntro: '查看Podman和Docker命令对比：',
    
    podmanExampleTitle: 'Podman命令',
    dockerExampleTitle: 'Docker命令',
    
    whenToUseTitle: '何时使用每个工具',
    podmanBestFor: '使用Podman的场景：',
    dockerBestFor: '使用Docker的场景：',
    
    migrationTitle: '从Docker迁移到Podman',
    migrationIntro: '简单过渡步骤：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Podman和Docker都是成熟、生产就绪的容器运行时。Podman在安全关键环境中表现出色，具有无根容器和无守护进程架构。Docker在开发者体验和生态系统工具方面保持优势。对于大多数开发工作流程，Docker仍是默认选择。对于生产部署，特别是多租户或受监管环境，Podman提供令人信服的安全优势。许多组织同时使用两者：Docker用于开发，Podman用于生产。',
    
    faq1q: 'Podman可以运行Docker镜像吗？',
    faq1a: '可以，Podman可以运行任何OCI兼容的容器镜像，包括来自Docker Hub的镜像。镜像格式完全相同，你可以用任一工具拉取和运行相同的镜像。',
    
    faq2q: 'Podman可以直接替代Docker吗？',
    faq2a: '几乎可以。Podman提供Docker兼容的CLI命令。你甚至可以创建别名"alias docker=podman"来使用熟悉的Docker命令。但是，一些高级Docker功能如Docker Swarm不受支持。',
    
    faq3q: '为什么Podman被认为更安全？',
    faq3a: 'Podman默认运行无根容器，意味着容器以普通用户身份运行，没有root权限。它也没有守护进程（消除了潜在攻击面），并与用户命名空间集成提供额外隔离。',
    
    faq4q: 'Podman有类似Docker Desktop的GUI吗？',
    faq4a: '有，Podman Desktop是一个类似Docker Desktop的GUI应用程序。它提供可视化界面来管理Linux、macOS和Windows上的容器、镜像和Pod。',
    
    faq5q: '可以在Podman中使用docker-compose吗？',
    faq5a: '可以，Podman通过"podman-compose"支持Docker Compose。另外，Podman原生支持Kubernetes YAML文件和Pod，可以替代许多compose用例。',
    
    faq6q: 'Podman和Docker哪个更快？',
    faq6a: '大多数用例性能相当。Podman由于fork-exec模型，容器启动可能略快。Docker对于受益于守护进程缓存的操作可能更快。差异通常可以忽略不计。',
    
    faq7q: 'Podman支持Kubernetes吗？',
    faq7a: '支持，Podman可以从运行中的容器生成Kubernetes YAML（"podman generate kube"），也可以从Kubernetes YAML部署Pod（"podman play kube"）。这使得过渡到Kubernetes变得容易。',
    
    faq8q: 'Docker Desktop许可如何？',
    faq8a: 'Docker Desktop在大型组织商业使用需要付费订阅。Podman Desktop完全免费开源，对于注重成本的组织是一个有吸引力的替代方案。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PodmanVsDocker2025({ lang }: { lang: string }) {
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
      
      <h3 style={h3Style}>{ct.whatIsPodmanTitle}</h3>
      <p style={pStyle}>{ct.whatIsPodmanContent}</p>

      <h3 style={h3Style}>{ct.whatIsDockerTitle}</h3>
      <p style={pStyle}>{ct.whatIsDockerContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Podman</th>
              <th style={thStyle}>Docker</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2019', '2013'],
              [isZh ? '开发方' : 'Developed By', 'Red Hat', 'Docker Inc'],
              [isZh ? '架构' : 'Architecture', 'Daemonless (fork-exec)', 'Client-Server (daemon)'],
              [isZh ? 'Root权限' : 'Root Privileges', 'Optional (rootless)', 'Required (daemon runs as root)'],
              [isZh ? 'OCI兼容' : 'OCI Compliant', 'Yes', 'Yes'],
              [isZh ? 'CLI兼容' : 'CLI Compatibility', 'Docker-compatible', 'Native'],
              [isZh ? 'Pod支持' : 'Pod Support', 'Native', 'Via Compose/Swarm'],
              [isZh ? 'systemd集成' : 'systemd Integration', 'Native', 'Limited'],
              [isZh ? '许可' : 'License', 'Apache 2.0 (Free)', 'Docker Subscription'],
            ].map(([feature, podman, docker], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{podman}</td>
                <td style={tdStyle}>{docker}</td>
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
              <th style={thStyle}>Podman</th>
              <th style={thStyle}>Docker</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '容器启动时间' : 'Container Startup', '~0.5s', '~0.6s'],
              [isZh ? '镜像拉取时间' : 'Image Pull Time', 'Same', 'Same'],
              [isZh ? '内存占用（空闲）' : 'Memory (Idle)', '~20MB', '~100MB (daemon)'],
              [isZh ? 'CPU开销' : 'CPU Overhead', 'Minimal', 'Daemon uses ~1-2%'],
              [isZh ? '并发容器' : 'Concurrent Containers', 'Excellent', 'Excellent'],
              [isZh ? '单点故障' : 'Single Point of Failure', 'No', 'Yes (daemon)'],
            ].map(([metric, podman, docker], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{podman}</td>
                <td style={tdStyle}>{docker}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Security */}
      <h2 style={h2Style}>{ct.securityTitle}</h2>
      <p style={pStyle}>{ct.securityIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '安全特性' : 'Security Feature'}</th>
              <th style={thStyle}>Podman</th>
              <th style={thStyle}>Docker</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '无根容器' : 'Rootless Containers', '✓ Native', 'Experimental'],
              [isZh ? '用户命名空间' : 'User Namespaces', '✓ Default', 'Requires config'],
              [isZh ? '无守护进程' : 'Daemonless', '✓', '✗'],
              [isZh ? 'SELinux支持' : 'SELinux Support', '✓ Native', '✓'],
              [isZh ? 'AppArmor支持' : 'AppArmor Support', '✓', '✓'],
              [isZh ? '容器逃逸风险' : 'Container Escape Risk', 'Lower', 'Higher (daemon)'],
              [isZh ? '多租户隔离' : 'Multi-tenant Isolation', 'Excellent', 'Good'],
              [isZh ? '可信镜像' : 'Trusted Images', '✓', '✓'],
            ].map(([feature, podman, docker], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{podman}</td>
                <td style={tdStyle}>{docker}</td>
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
              <th style={thStyle}>Podman</th>
              <th style={thStyle}>Docker</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '构建镜像' : 'Build Images', '✓ (Buildah)', '✓ (docker build)'],
              [isZh ? '镜像注册表' : 'Image Registries', 'Docker Hub, Quay, etc.', 'Docker Hub, others'],
              [isZh ? '卷管理' : 'Volume Management', '✓', '✓'],
              [isZh ? '网络' : 'Networking', 'CNI', 'CNM'],
              [isZh ? 'Compose支持' : 'Compose Support', 'podman-compose', 'docker-compose'],
              [isZh ? 'Kubernetes YAML' : 'Kubernetes YAML', '✓ Native', '✗'],
              [isZh ? 'GUI桌面' : 'Desktop GUI', 'Podman Desktop', 'Docker Desktop'],
              [isZh ? 'Swarm/集群' : 'Swarm/Clustering', '✗', '✓'],
              [isZh ? 'Dev Container' : 'Dev Containers', '✓', '✓'],
              [isZh ? 'VS Code集成' : 'VS Code Integration', '✓', '✓'],
            ].map(([feature, podman, docker], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{podman}</td>
                <td style={tdStyle}>{docker}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div>
          <h3 style={{ ...h3Style, color: '#892ca0' }}>{ct.podmanExampleTitle}</h3>
          <pre style={codeStyle}><code>{`# List containers
podman ps -a

# Run a container
podman run -d -p 8080:80 nginx

# Build an image
podman build -t myapp .

# Run rootless
podman run --user 1000 alpine

# Generate systemd service
podman generate systemd --name mycontainer

# Generate Kubernetes YAML
podman generate kube mycontainer > pod.yaml

# Play Kubernetes YAML
podman play kube pod.yaml

# Run a pod (multi-container)
podman pod create --name mypod
podman run -d --pod mypod nginx
podman run -d --pod mypod redis

# Push to registry
podman push myapp docker://registry.io/myapp`}</code></pre>
        </div>
        <div>
          <h3 style={{ ...h3Style, color: '#2496ed' }}>{ct.dockerExampleTitle}</h3>
          <pre style={codeStyle}><code>{`# List containers
docker ps -a

# Run a container
docker run -d -p 8080:80 nginx

# Build an image
docker build -t myapp .

# Run with user
docker run --user 1000 alpine

# No native systemd
# (requires manual setup)

# No native Kubernetes YAML
# (need kompose or similar)

# Docker Compose
docker-compose up -d

# Docker Swarm
docker swarm init
docker stack deploy -c compose.yml app

# Push to registry
docker push registry.io/myapp`}</code></pre>
        </div>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #892ca0' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#892ca0' }}>{ct.podmanBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '安全敏感环境' : 'Security-sensitive environments'}</li>
            <li>{isZh ? '多租户平台' : 'Multi-tenant platforms'}</li>
            <li>{isZh ? '无root访问权限' : 'No root access available'}</li>
            <li>{isZh ? 'RHEL/CentOS/Fedora系统' : 'RHEL/CentOS/Fedora systems'}</li>
            <li>{isZh ? '需要systemd集成' : 'Need systemd integration'}</li>
            <li>{isZh ? 'Kubernetes过渡' : 'Kubernetes transition'}</li>
            <li>{isZh ? '避免许可费用' : 'Avoid licensing costs'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #2496ed' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#2496ed' }}>{ct.dockerBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '开发和学习' : 'Development and learning'}</li>
            <li>{isZh ? '丰富的GUI工具' : 'Rich GUI tooling'}</li>
            <li>{isZh ? 'Docker Swarm集群' : 'Docker Swarm clustering'}</li>
            <li>{isZh ? '广泛的文档和教程' : 'Extensive docs and tutorials'}</li>
            <li>{isZh ? '现有Docker工作流' : 'Existing Docker workflows'}</li>
            <li>{isZh ? 'CI/CD管道兼容' : 'CI/CD pipeline compatibility'}</li>
            <li>{isZh ? '社区支持' : 'Community support'}</li>
          </ul>
        </div>
      </div>

      {/* Migration */}
      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`# Step 1: Install Podman
# Linux
sudo apt install podman  # Debian/Ubuntu
sudo dnf install podman  # Fedora/RHEL

# macOS
brew install podman
podman machine init
podman machine start

# Windows - use Podman Desktop or WSL2

# Step 2: Create Docker alias (optional)
echo 'alias docker=podman' >> ~/.bashrc
echo 'alias docker-compose=podman-compose' >> ~/.bashrc
source ~/.bashrc

# Step 3: Use existing images
# Images are stored differently but can be pulled from same registries
podman pull nginx:latest
podman pull docker.io/library/nginx:latest

# Step 4: Convert docker-compose to Podman
# Install podman-compose
pip install podman-compose

# Run compose file
podman-compose up -d

# Step 5: Generate systemd services for production
podman generate systemd --name --files --new mycontainer
sudo mv container-mycontainer.service /etc/systemd/system/
sudo systemctl enable container-mycontainer
sudo systemctl start container-mycontainer`}</code></pre>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={'/' + lang + '/tools/hash-generator'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a>
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
