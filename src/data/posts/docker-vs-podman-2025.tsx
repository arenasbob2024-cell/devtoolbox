'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Docker vs Podman 2025: Container Technology Comparison',
    intro: 'Docker has been the de facto standard for containerization for over a decade, but Podman has emerged as a daemonless, rootless alternative that addresses many security concerns. This comprehensive comparison examines architecture, security, performance, and real-world use cases to help you choose the right container technology for 2025.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Podman offers superior security with rootless containers and daemonless architecture, while Docker provides better tooling maturity and ecosystem. For production environments prioritizing security in 2025, Podman is recommended. For development workflows and extensive third-party integrations, Docker remains the practical choice.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Podman runs rootless containers by default, eliminating a major security risk',
    takeaway2: 'Docker requires a daemon; Podman is daemonless with fork-exec model',
    takeaway3: 'Both use OCI-compliant containers and can run each other\'s images',
    takeaway4: 'Podman is compatible with Docker CLI (alias docker=podman)',
    takeaway5: 'Docker Desktop provides better GUI and development experience',
    takeaway6: 'Kubernetes YAML works natively with Podman pods',
    
    whatIsDockerTitle: 'What is Docker?',
    whatIsDockerContent: 'Docker, released in 2013, revolutionized software deployment by popularizing containerization. It uses a client-server architecture with a daemon (dockerd) that manages containers. Docker Desktop provides a polished GUI for macOS and Windows, making it the go-to choice for developers worldwide.',
    
    whatIsPodmanTitle: 'What is Podman?',
    whatIsPodmanContent: 'Podman, developed by Red Hat and released in 2019, is a daemonless container engine that runs containers as direct processes. It supports rootless containers out of the box, significantly improving security. Podman is fully compatible with Docker CLI and OCI container standards.',
    
    architectureTitle: 'Architecture Comparison',
    architectureIntro: 'The fundamental difference lies in how each tool manages containers:',
    
    securityTitle: 'Security Comparison',
    securityIntro: 'Security is where Podman has a distinct advantage:',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmark results from containerized workloads:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Side-by-side feature comparison:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'CLI commands are nearly identical:',
    
    dockerExampleTitle: 'Docker Commands',
    podmanExampleTitle: 'Podman Commands',
    
    podsTitle: 'Podman Pods vs Docker Compose',
    podsIntro: 'Podman offers native pod support:',
    
    rootlessTitle: 'Rootless Containers',
    rootlessIntro: 'Running containers without root privileges:',
    
    migrationTitle: 'Migration Guide',
    migrationIntro: 'Migrating from Docker to Podman:',
    
    whenToUseTitle: 'When to Use Each',
    podmanBestFor: 'Use Podman When:',
    dockerBestFor: 'Use Docker When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Podman is the superior choice for production environments where security is paramount. Its rootless architecture and daemonless design eliminate entire classes of vulnerabilities. Docker remains excellent for development workflows, CI/CD pipelines, and teams invested in the Docker ecosystem. Both tools can coexist - use Podman for production and Docker for development if needed.',
    
    faq1q: 'Can Podman run Docker images?',
    faq1a: 'Yes, Podman is fully OCI-compliant and can pull and run images from Docker Hub and any container registry. Use "podman pull docker.io/library/nginx" or simply "podman pull nginx".',
    
    faq2q: 'Does Podman support Docker Compose?',
    faq2a: 'Yes, Podman supports Docker Compose through podman-compose, a compatibility layer. You can also convert compose files to Kubernetes YAML using podman-play-kube for native pod support.',
    
    faq3q: 'Is Podman slower than Docker?',
    faq3a: 'No, performance is comparable. Podman\'s fork-exec model can actually be faster for short-lived containers since there\'s no daemon overhead. For long-running services, performance is virtually identical.',
    
    faq4q: 'Can I use Docker CLI commands with Podman?',
    faq4a: 'Yes, add "alias docker=podman" to your shell configuration. Podman was designed to be CLI-compatible with Docker, so most commands work identically.',
    
    faq5q: 'Does Podman work on macOS and Windows?',
    faq5a: 'Yes, Podman Desktop provides GUI support for macOS and Windows. It uses a Linux VM under the hood, similar to Docker Desktop, but with Podman\'s security benefits.',
    
    faq6q: 'What about Kubernetes integration?',
    faq6a: 'Podman has native Kubernetes YAML support with "podman play kube". You can generate Kubernetes manifests from running containers using "podman generate kube". Docker requires additional tooling.',
    
    faq7q: 'Is rootless Podman fully functional?',
    faq7a: 'Almost. Rootless Podman supports most features, but some operations like binding to ports below 1024 require additional configuration. For most applications, rootless mode works perfectly.',
    
    faq8q: 'Which is better for CI/CD?',
    faq8a: 'Docker has broader CI/CD platform support and more mature tooling. However, Podman\'s rootless mode is ideal for secure CI environments. GitLab CI, GitHub Actions, and Jenkins all support Podman.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Docker vs Podman 2025：容器技术对比',
    intro: 'Docker 十多年来一直是容器化的事实标准，但 Podman 作为无守护进程、无根的替代方案出现了，解决了许多安全问题。本全面比较考察架构、安全性、性能和真实用例，帮助您为 2025 年选择合适的容器技术。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Podman 通过无根容器和无守护进程架构提供卓越的安全性，而 Docker 提供更好的工具成熟度和生态系统。对于 2025 年优先考虑安全性的生产环境，推荐使用 Podman。对于开发工作流程和广泛的第三方集成，Docker 仍然是实用的选择。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Podman 默认运行无根容器，消除主要安全风险',
    takeaway2: 'Docker 需要守护进程；Podman 采用 fork-exec 模型',
    takeaway3: '两者都使用 OCI 兼容容器，可以运行彼此的镜像',
    takeaway4: 'Podman 与 Docker CLI 兼容（alias docker=podman）',
    takeaway5: 'Docker Desktop 提供更好的 GUI 和开发体验',
    takeaway6: 'Kubernetes YAML 原生支持 Podman pods',
    
    whatIsDockerTitle: '什么是 Docker？',
    whatIsDockerContent: 'Docker 于 2013 年发布，通过普及容器化彻底改变了软件部署。它使用客户端-服务器架构，通过守护进程（dockerd）管理容器。Docker Desktop 为 macOS 和 Windows 提供了精美的 GUI，使其成为全球开发者的首选。',
    
    whatIsPodmanTitle: '什么是 Podman？',
    whatIsPodmanContent: 'Podman 由 Red Hat 开发并于 2019 年发布，是一个无守护进程的容器引擎，将容器作为直接进程运行。它开箱即用地支持无根容器，显著提高了安全性。Podman 与 Docker CLI 和 OCI 容器标准完全兼容。',
    
    architectureTitle: '架构对比',
    architectureIntro: '根本区别在于每个工具如何管理容器：',
    
    securityTitle: '安全性对比',
    securityIntro: '安全性是 Podman 的明显优势：',
    
    performanceTitle: '性能对比',
    performanceIntro: '容器化工作负载的基准测试结果：',
    
    featuresTitle: '功能对比',
    featuresIntro: '并列功能比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: 'CLI 命令几乎相同：',
    
    dockerExampleTitle: 'Docker 命令',
    podmanExampleTitle: 'Podman 命令',
    
    podsTitle: 'Podman Pods vs Docker Compose',
    podsIntro: 'Podman 提供原生 pod 支持：',
    
    rootlessTitle: '无根容器',
    rootlessIntro: '在没有 root 权限的情况下运行容器：',
    
    migrationTitle: '迁移指南',
    migrationIntro: '从 Docker 迁移到 Podman：',
    
    whenToUseTitle: '何时使用',
    podmanBestFor: '使用 Podman 的场景：',
    dockerBestFor: '使用 Docker 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在 2025 年，对于安全性至关重要的生产环境，Podman 是更优的选择。其无根架构和无守护进程设计消除了整类漏洞。Docker 仍然是开发工作流程、CI/CD 管道和投资于 Docker 生态系统的团队的优秀选择。两种工具可以共存——如果需要，可以在生产中使用 Podman，在开发中使用 Docker。',
    
    faq1q: 'Podman 可以运行 Docker 镜像吗？',
    faq1a: '是的，Podman 完全符合 OCI 标准，可以从 Docker Hub 和任何容器注册表拉取和运行镜像。使用 "podman pull docker.io/library/nginx" 或简单地使用 "podman pull nginx"。',
    
    faq2q: 'Podman 支持 Docker Compose 吗？',
    faq2a: '是的，Podman 通过 podman-compose（一个兼容层）支持 Docker Compose。您也可以使用 podman-play-kube 将 compose 文件转换为 Kubernetes YAML 以获得原生 pod 支持。',
    
    faq3q: 'Podman 比 Docker 慢吗？',
    faq3a: '不，性能相当。对于短期容器，Podman 的 fork-exec 模型实际上可能更快，因为没有守护进程开销。对于长期运行的服务，性能几乎相同。',
    
    faq4q: '我可以在 Podman 中使用 Docker CLI 命令吗？',
    faq4a: '是的，在 shell 配置中添加 "alias docker=podman"。Podman 设计为与 Docker CLI 兼容，因此大多数命令的工作方式相同。',
    
    faq5q: 'Podman 可以在 macOS 和 Windows 上运行吗？',
    faq5a: '是的，Podman Desktop 为 macOS 和 Windows 提供 GUI 支持。它在底层使用 Linux VM，类似于 Docker Desktop，但具有 Podman 的安全优势。',
    
    faq6q: 'Kubernetes 集成怎么样？',
    faq6a: 'Podman 通过 "podman play kube" 原生支持 Kubernetes YAML。您可以使用 "podman generate kube" 从运行中的容器生成 Kubernetes 清单。Docker 需要额外的工具。',
    
    faq7q: '无根 Podman 完全可用吗？',
    faq7a: '几乎。无根 Podman 支持大多数功能，但某些操作（如绑定到 1024 以下的端口）需要额外配置。对于大多数应用程序，无根模式完美运行。',
    
    faq8q: '哪个更适合 CI/CD？',
    faq8a: 'Docker 在 CI/CD 平台上有更广泛的支持和更成熟的工具。但是，Podman 的无根模式非常适合安全的 CI 环境。GitLab CI、GitHub Actions 和 Jenkins 都支持 Podman。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function DockerVsPodman2025({ lang }: { lang: string }) {
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
      
      <h3 style={h3Style}>{ct.whatIsDockerTitle}</h3>
      <p style={pStyle}>{ct.whatIsDockerContent}</p>

      <h3 style={h3Style}>{ct.whatIsPodmanTitle}</h3>
      <p style={pStyle}>{ct.whatIsPodmanContent}</p>

      <h2 style={h2Style}>{ct.architectureTitle}</h2>
      <p style={pStyle}>{ct.architectureIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Docker</th>
              <th style={thStyle}>Podman</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '架构' : 'Architecture', 'Client-Server (Daemon)', 'Daemonless (Fork-Exec)'],
              [isZh ? '默认用户' : 'Default User', 'Root', 'Rootless'],
              [isZh ? '守护进程' : 'Daemon', 'Required (dockerd)', 'Not Required'],
              [isZh ? '安全模型' : 'Security Model', 'Root + Daemon', 'User Namespace'],
              [isZh ? 'Pods支持' : 'Pods Support', isZh ? '需 Docker Compose' : 'Requires Compose', 'Native'],
              [isZh ? 'Kubernetes YAML' : 'Kubernetes YAML', isZh ? '需转换' : 'Requires conversion', 'Native Support'],
              [isZh ? 'Systemd集成' : 'Systemd Integration', isZh ? '手动配置' : 'Manual config', 'Built-in'],
              [isZh ? '镜像格式' : 'Image Format', 'OCI', 'OCI'],
            ].map(([feature, docker, podman], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{docker}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{podman}</td>
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
              <th style={thStyle}>Docker</th>
              <th style={thStyle}>Podman</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '无根容器' : 'Rootless Containers', isZh ? '需要配置' : 'Requires setup', isZh ? '默认启用' : 'Default'],
              [isZh ? '用户命名空间' : 'User Namespaces', isZh ? '支持' : 'Supported', isZh ? '默认启用' : 'Default'],
              [isZh ? '守护进程攻击面' : 'Daemon Attack Surface', isZh ? '有风险' : 'Present', isZh ? '无' : 'None'],
              [isZh ? '容器逃逸风险' : 'Container Escape Risk', isZh ? '较高' : 'Higher', isZh ? '较低' : 'Lower'],
              [isZh ? 'SELinux支持' : 'SELinux Support', '✓', '✓'],
              [isZh ? 'AppArmor支持' : 'AppArmor Support', '✓', '✓'],
              [isZh ? '特权模式' : 'Privileged Mode', isZh ? '默认可用' : 'Available by default', isZh ? '需要--privileged' : 'Requires --privileged'],
            ].map(([feature, docker, podman], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{docker}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{podman}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Docker</th>
              <th style={thStyle}>Podman</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '镜像拉取时间' : 'Image Pull Time', '~8s (nginx)', '~7.5s (nginx)'],
              [isZh ? '容器启动时间' : 'Container Startup', '~0.5s', '~0.3s'],
              [isZh ? '内存占用(空闲)' : 'Memory (Idle)', '~150MB (daemon)', '~20MB'],
              [isZh ? 'CPU开销(空闲)' : 'CPU Overhead (Idle)', '~2%', '<0.5%'],
              [isZh ? '网络吞吐' : 'Network Throughput', '~9.5 Gbps', '~9.5 Gbps'],
              [isZh ? '磁盘I/O' : 'Disk I/O', isZh ? '相同' : 'Equivalent', isZh ? '相同' : 'Equivalent'],
            ].map(([metric, docker, podman], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{docker}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{podman}</td>
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
              <th style={thStyle}>Docker</th>
              <th style={thStyle}>Podman</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'CLI兼容性' : 'CLI Compatibility', 'Native', 'Docker-compatible'],
              [isZh ? 'GUI工具' : 'GUI Tool', 'Docker Desktop', 'Podman Desktop'],
              [isZh ? '镜像构建' : 'Image Building', 'docker build', 'podman build (Buildah)'],
              [isZh ? '多阶段构建' : 'Multi-stage Builds', '✓', '✓'],
              [isZh ? 'Docker Compose' : 'Docker Compose', '✓', 'podman-compose'],
              [isZh ? 'Kubernetes YAML' : 'Kubernetes YAML', isZh ? '需转换' : 'Needs conversion', 'podman play kube'],
              [isZh ? '卷管理' : 'Volume Management', '✓', '✓'],
              [isZh ? '网络管理' : 'Network Management', '✓', '✓'],
              [isZh ? '镜像签名' : 'Image Signing', 'Docker Content Trust', 'sigstore/cosign'],
              [isZh ? '注册表支持' : 'Registry Support', isZh ? '所有' : 'All', isZh ? '所有' : 'All'],
            ].map(([feature, docker, podman], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{docker}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{podman}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.dockerExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Docker commands
# Pull image
docker pull nginx:latest

# Run container
docker run -d -p 8080:80 --name webserver nginx

# List containers
docker ps -a

# Build image
docker build -t myapp:v1 .

# View logs
docker logs webserver

# Execute in container
docker exec -it webserver bash

# Docker Compose
docker-compose up -d

# Stop and remove
docker stop webserver
docker rm webserver`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.podmanExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Podman commands (identical syntax)
# Pull image
podman pull nginx:latest

# Run container (rootless by default)
podman run -d -p 8080:80 --name webserver nginx

# List containers
podman ps -a

# Build image
podman build -t myapp:v1 .

# View logs
podman logs webserver

# Execute in container
podman exec -it webserver bash

# Podman Compose
podman-compose up -d

# Stop and remove
podman stop webserver
podman rm webserver

# Generate systemd service
podman generate systemd --name webserver --files`}</code></pre>

      <h2 style={h2Style}>{ct.podsTitle}</h2>
      <p style={pStyle}>{ct.podsIntro}</p>

      <pre style={codeStyle}><code>{`# Podman Pod - Kubernetes-style container grouping
# Create a pod with shared network namespace
podman pod create --name mypod -p 8080:80

# Add containers to the pod
podman run -d --pod mypod --name app myapplication
podman run -d --pod mypod --name db postgres

# List pods
podman pod list

# Generate Kubernetes YAML from pod
podman generate kube mypod > mypod.yaml

# Play Kubernetes YAML (create pod from YAML)
podman play kube mypod.yaml

# Docker Compose equivalent (podman-compose.yml)
# version: "3"
# services:
#   app:
#     image: myapplication
#     ports:
#       - "8080:80"
#   db:
#     image: postgres`}</code></pre>

      <h2 style={h2Style}>{ct.rootlessTitle}</h2>
      <p style={pStyle}>{ct.rootlessIntro}</p>

      <pre style={codeStyle}><code>{`# Podman Rootless Setup (Linux)
# 1. Enable cgroup v2 (if not already)
# Edit /etc/default/grub:
# GRUB_CMDLINE_LINUX="systemd.unified_cgroup_hierarchy=1"
# sudo update-grub && sudo reboot

# 2. Configure subuid/subgid
sudo usermod --add-subuids 100000-165535 --add-subgids 100000-165535 $USER

# 3. Enable lingering
sudo loginctl enable-linger $USER

# 4. Configure sysctl for ping
echo "net.ipv4.ping_group_range = 0 2000000" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# 5. Run containers rootless
podman run -d --name webserver -p 8080:80 nginx

# Check user namespace
podman inspect webserver | grep -i uidmap

# Docker rootless (more complex setup)
# dockerd-rootless-setuptool.sh install
# export DOCKER_HOST=unix:///run/user/1000/docker.sock`}</code></pre>

      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`# Migration from Docker to Podman

# 1. Add alias (bashrc or zshrc)
echo 'alias docker=podman' >> ~/.bashrc
echo 'alias docker-compose=podman-compose' >> ~/.bashrc
source ~/.bashrc

# 2. Transfer images
docker save myimage:v1 | podman load

# 3. Convert Docker Compose to Podman
# Option A: Use podman-compose directly
podman-compose up -d

# Option B: Convert to Kubernetes YAML
podman-compose -f docker-compose.yml kube > kube-deployment.yaml
podman play kube kube-deployment.yaml

# 4. Migrate volumes
# Copy data from Docker volumes
docker run --rm -v mydata:/from -v /tmp/backup:/to alpine cp -r /from /to
podman volume create mydata
podman run --rm -v mydata:/to -v /tmp/backup:/from alpine cp -r /from /to

# 5. Systemd service (for production)
podman generate systemd --name mycontainer --files --new
sudo cp container-mycontainer.service /etc/systemd/system/
sudo systemctl enable --now container-mycontainer`}</code></pre>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.podmanBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '生产环境' : 'Production environments'}</li>
            <li>{isZh ? '安全优先场景' : 'Security-first scenarios'}</li>
            <li>{isZh ? '多租户环境' : 'Multi-tenant environments'}</li>
            <li>{isZh ? 'Kubernetes部署' : 'Kubernetes deployments'}</li>
            <li>{isZh ? 'Red Hat生态系统' : 'Red Hat ecosystem'}</li>
            <li>{isZh ? '无根容器需求' : 'Rootless requirements'}</li>
            <li>{isZh ? 'Systemd集成' : 'Systemd integration'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.dockerBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '开发环境' : 'Development environments'}</li>
            <li>{isZh ? 'CI/CD管道' : 'CI/CD pipelines'}</li>
            <li>{isZh ? '团队协作' : 'Team collaboration'}</li>
            <li>{isZh ? '广泛生态工具' : 'Extensive ecosystem'}</li>
            <li>{isZh ? 'macOS/Windows开发' : 'macOS/Windows dev'}</li>
            <li>{isZh ? '遗留项目维护' : 'Legacy projects'}</li>
            <li>{isZh ? 'Docker Swarm' : 'Docker Swarm'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/yaml-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>YAML Formatter</a> • {' '}
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
