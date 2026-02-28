'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Podman Complete Guide 2026: Daemonless Containers, Rootless Security, and Kubernetes Integration',
    description: 'Master Podman — daemonless container engine, rootless containers, pods, Kubernetes YAML generation, Buildah integration, Podman Compose, systemd Quadlet, multi-arch builds, and production deployment.',
    tldr: 'Podman is a daemonless, rootless container engine that provides a Docker-compatible CLI without requiring a persistent background daemon. Developed by Red Hat, Podman runs containers as regular user processes using user namespaces, dramatically reducing the attack surface compared to Docker. Podman natively supports pods (groups of containers sharing namespaces), can generate and consume Kubernetes YAML, integrates with systemd via Quadlet for production services, and uses Buildah for OCI-compliant image building. In 2026, Podman 5.x is the default container runtime on Fedora, RHEL, and CentOS Stream, and Podman Desktop provides a cross-platform GUI. For teams prioritizing security, Kubernetes alignment, and daemon-free operation, Podman is the leading container engine.',
    takeaway1: 'Podman is daemonless — no root daemon process, containers run as child processes of the user',
    takeaway2: 'Rootless containers use user namespaces for superior security without requiring root privileges',
    takeaway3: 'Docker-compatible CLI — alias docker=podman works for most workflows',
    takeaway4: 'Native pod support groups containers sharing network and IPC namespaces, matching Kubernetes pod concepts',
    takeaway5: 'podman generate kube and podman play kube bridge local development to Kubernetes deployment',
    takeaway6: 'Systemd integration via Quadlet turns containers into native Linux services with auto-update capabilities',
    intro: 'Podman (Pod Manager) is an open-source container engine developed by Red Hat that has become the default container tool on RHEL, Fedora, and CentOS Stream. Unlike Docker, Podman operates without a central daemon process — each container runs as a direct child process of the user who started it. This architecture eliminates the single-point-of-failure daemon and enables true rootless container execution. With over 25,000 GitHub stars, a Docker-compatible CLI, native pod support, and deep Kubernetes integration, Podman has matured into a production-grade container platform. This guide covers everything from installation to production deployment.',
    h2What: 'What Is Podman and Why Daemonless Containers Matter',
    whatP1: 'Podman is an OCI-compliant container engine that manages containers, pods, and images. The critical difference from Docker is architecture: Docker uses a client-server model where the Docker CLI communicates with a long-running dockerd daemon (typically running as root). Podman eliminates this daemon entirely — when you run podman run, the container process is forked directly as a child process.',
    whatP2: 'This daemonless design has profound security implications. There is no privileged daemon that, if compromised, grants root access to the host. Containers are isolated within the user\'s process tree. There is no single point of failure — one crashing container cannot bring down a daemon that manages all others.',
    whatList1: 'No daemon — containers are forked as direct child processes', whatList2: 'Rootless by default via user namespaces', whatList3: 'Docker-compatible CLI — drop-in replacement', whatList4: 'Native pod concept — shared network/IPC/PID namespaces', whatList5: 'Kubernetes YAML generation and consumption', whatList6: 'Buildah integration for OCI image building', whatList7: 'Systemd Quadlet integration for production services',
    h2Comparison: 'Podman vs Docker vs containerd vs nerdctl',
    compIntro: 'Understanding the container tool landscape helps you choose the right engine for your infrastructure.',
    thFeature: 'Feature', thPodman: 'Podman', thDocker: 'Docker', thContainerd: 'containerd', thNerdctl: 'nerdctl',
    compDaemon: 'Daemon required', compRootless: 'Rootless support', compCLI: 'CLI compatibility', compPods: 'Pod support', compK8sYAML: 'K8s YAML generation', compCompose: 'Compose support', compBuild: 'Image building', compSystemd: 'Systemd integration', compDesktop: 'Desktop GUI', compLicense: 'License',
    valPodmanDaemon: 'No (daemonless)', valDockerDaemon: 'Yes (dockerd)', valContainerdDaemon: 'Yes (containerd)', valNerdctlDaemon: 'Uses containerd',
    valPodmanRootless: 'Native (default)', valDockerRootless: 'Experimental', valContainerdRootless: 'Via rootlesskit', valNerdctlRootless: 'Via rootlesskit',
    valPodmanCLI: 'Docker-compatible', valDockerCLI: 'docker CLI', valContainerdCLI: 'ctr (low-level)', valNerdctlCLI: 'Docker-compatible',
    valPodmanPods: 'Native pods', valDockerPods: 'No', valContainerdPods: 'No', valNerdctlPods: 'No',
    valPodmanK8s: 'generate/play kube', valDockerK8s: 'No', valContainerdK8s: 'No', valNerdctlK8s: 'No',
    valPodmanCompose: 'podman-compose / docker-compose', valDockerCompose: 'docker compose (built-in)', valContainerdCompose: 'No', valNerdctlCompose: 'nerdctl compose',
    valPodmanBuild: 'Buildah (integrated)', valDockerBuild: 'BuildKit (built-in)', valContainerdBuild: 'No (needs buildkit)', valNerdctlBuild: 'BuildKit',
    valPodmanSystemd: 'Quadlet (native)', valDockerSystemd: 'Manual unit files', valContainerdSystemd: 'Manual', valNerdctlSystemd: 'Manual',
    valPodmanDesktop: 'Podman Desktop', valDockerDesktop: 'Docker Desktop', valContainerdDesktop: 'No', valNerdctlDesktop: 'No',
    valPodmanLicense: 'Apache 2.0', valDockerLicense: 'Apache 2.0 (Engine)', valContainerdLicense: 'Apache 2.0', valNerdctlLicense: 'Apache 2.0',
    h2Install: 'Installation',
    installIntro: 'Podman is available on all major platforms and pre-installed on Fedora, RHEL 8+, and CentOS Stream.',
    h3InstallFedora: 'Fedora / RHEL / CentOS', h3InstallUbuntu: 'Ubuntu / Debian', h3InstallMac: 'macOS (Homebrew)', h3InstallWindows: 'Windows',
    h2Basics: 'Podman Basics: Docker-Compatible CLI',
    basicsP: 'Podman intentionally mirrors Docker\'s CLI. If you know Docker, you already know Podman. You can even alias docker=podman.',
    h3BasicRun: 'Running Containers', h3BasicManage: 'Managing Containers and Images',
    h2Rootless: 'Rootless Containers: Security Without Root',
    rootlessP1: 'Rootless containers are Podman\'s flagship feature. They run entirely without root privileges using Linux user namespaces. The container sees itself as root (UID 0) inside, but on the host it maps to an unprivileged user ID.',
    rootlessP2: 'Even if an attacker escapes the container, they land as an unprivileged user — not root. Combined with SELinux, seccomp, and capabilities dropping, rootless Podman provides defense in depth.',
    h2Compose: 'Podman Compose vs Docker Compose',
    composeP: 'Podman supports two Compose approaches: podman-compose (standalone Python tool) or Docker Compose v2 via Podman\'s compatibility socket.',
    h2Pods: 'Pod Management',
    podsP: 'Pods are Podman\'s unique feature — they group containers sharing network, IPC, and optionally PID namespaces, mirroring Kubernetes pods.',
    h2Kube: 'Kubernetes YAML Generation',
    kubeP: 'Podman can generate Kubernetes YAML from running containers or pods, and deploy Kubernetes YAML locally — bridging local development and production.',
    h2Build: 'Building Images: Buildah Integration',
    buildP: 'Podman uses Buildah under the hood for image building. Buildah supports Dockerfiles (Containerfiles) and a scriptable shell interface for fine-grained layer control.',
    h2Desktop: 'Podman Desktop and Podman Machine',
    desktopP: 'Podman Desktop is an open-source cross-platform GUI for managing containers, pods, images, and Kubernetes clusters. On macOS and Windows, Podman Machine manages a lightweight Linux VM transparently so the experience feels native.',
    h2Network: 'Networking: Netavark and DNS',
    networkP: 'Podman 4+ uses Netavark as its default networking stack with Aardvark-dns for built-in DNS resolution, replacing CNI plugins with better performance and simpler configuration.',
    h2Volumes: 'Volume Management and Bind Mounts',
    volumesP: 'Podman supports named volumes, bind mounts, and tmpfs mounts for persistent and temporary data storage.',
    h2Registry: 'Registry Management',
    registryP: 'Podman supports multiple registries via registries.conf. Unlike Docker defaulting to Docker Hub only, Podman searches and pulls from multiple registries in priority order.',
    h2Systemd: 'Systemd Integration: Quadlet',
    systemdP: 'Quadlet is Podman\'s native systemd integration — place a .container file in the systemd directory and systemd manages the container lifecycle including start, stop, restart, and auto-update.',
    h2Secrets: 'Podman Secrets Management',
    secretsP: 'Podman secrets securely pass sensitive data to containers without embedding them in images or environment variables.',
    h2MultiArch: 'Multi-Architecture Builds',
    multiArchP: 'Podman supports multi-architecture images using podman manifest and QEMU emulation for cross-platform builds.',
    h2CICD: 'CI/CD with Podman',
    cicdP: 'Podman\'s daemonless and rootless architecture makes it ideal for shared CI runners where Docker\'s privileged daemon is a security concern.',
    h3CICDGitHub: 'GitHub Actions', h3CICDGitLab: 'GitLab CI',
    h2Migration: 'Migration from Docker to Podman',
    migrationP: 'Migrating from Docker to Podman is straightforward. The CLI is compatible, and only a few areas require adjustments.',
    migL1: 'Install Podman and alias docker=podman', migL2: 'Replace Docker socket: /run/user/\\$(id -u)/podman/podman.sock', migL3: 'Use podman-compose or docker-compose with Podman socket', migL4: 'Replace Docker Desktop with Podman Desktop', migL5: 'Convert systemd units to Quadlet .container files', migL6: 'Update CI/CD pipelines to use podman commands', migL7: 'Test docker-compose.yml — most work unchanged',
    h2Performance: 'Performance: Podman vs Docker',
    perfP: 'Podman and Docker deliver comparable performance. The daemonless architecture adds minimal startup overhead, while rootless mode incurs ~2-5% penalty from user namespace and pasta/slirp4netns networking.',
    perfL1: 'Container startup: Podman slightly faster (no daemon IPC)', perfL2: 'Image pull: Nearly identical', perfL3: 'Runtime: Identical (same OCI runtime crun/runc)', perfL4: 'Memory: Podman uses less (no daemon)', perfL5: 'Rootless overhead: ~2-5%', perfL6: 'Build: Comparable (Buildah vs BuildKit)',
    h2Security: 'Security Best Practices',
    secIntro: 'Podman provides strong security defaults, but additional hardening ensures defense in depth.',
    secL1: 'Always run rootless — Podman\'s default and strongest security feature', secL2: 'SELinux labels on volumes with :Z (private) or :z (shared)', secL3: 'Use seccomp profiles to restrict syscalls', secL4: 'Drop all caps, add back only needed: --cap-drop=all --cap-add=NET_BIND_SERVICE', secL5: 'Read-only root filesystem: --read-only', secL6: 'Sign images with cosign and verify on pull', secL7: 'Scan images with Trivy before deployment', secL8: 'Set --security-opt=no-new-privileges',
    h2Production: 'Production Deployment Patterns',
    prodP: 'Podman excels in production with systemd. Quadlet, auto-updates, and health checks create a robust deployment model without an orchestrator.',
    h2Troubleshooting: 'Troubleshooting Common Issues',
    trL1: 'Permission denied: Check subuid/subgid — run podman system migrate.', trL2: 'Rootless network unreachable: Install pasta or slirp4netns.', trL3: 'Port <1024: Use sysctl net.ipv4.ip_unprivileged_port_start=80 or rootful.', trL4: 'Pull fails: Check registries.conf. Run podman info.', trL5: 'Container not starting: Check podman logs and podman events.', trL6: 'SELinux denial on volume: Add :Z or :z suffix.', trL7: 'Machine not starting (macOS): podman machine rm && podman machine init.', trL8: 'Compose incompatibility: Use podman-compose 1.1+ or docker-compose with socket.',
    h2FAQ: 'Frequently Asked Questions',
    faq1Q: 'Can I use Podman as a drop-in replacement for Docker?',
    faq1A: 'Yes, for the vast majority of use cases. Podman\'s CLI is Docker-compatible, and alias docker=podman works for most workflows. Docker Compose files work with podman-compose or docker-compose via Podman\'s socket. The main differences are the lack of Docker Swarm support and some Docker Desktop-specific features.',
    faq2Q: 'Is Podman really more secure than Docker?',
    faq2A: 'Yes, by architecture. Podman eliminates the root daemon (Docker\'s biggest attack surface), runs rootless by default using user namespaces, and integrates natively with SELinux. Even if a container escape occurs, the attacker lands as an unprivileged user.',
    faq3Q: 'How do rootless containers work?',
    faq3A: 'Rootless containers use Linux user namespaces to map the container\'s root (UID 0) to an unprivileged user on the host. The subuid/subgid files define available UID/GID ranges. Inside the container processes appear to run as root, but on the host they have no special privileges.',
    faq4Q: 'What is the difference between Podman pods and Kubernetes pods?',
    faq4A: 'Podman pods are directly inspired by Kubernetes pods. Both group containers sharing network and IPC namespaces. Podman pods include an infra container (like Kubernetes\' pause container) that holds the namespace. You can generate Kubernetes YAML from Podman pods using podman generate kube.',
    faq5Q: 'Should I use podman-compose or docker-compose?',
    faq5A: 'Both work. podman-compose is a lightweight Python tool that translates Compose files into Podman commands. docker-compose v2 works with Podman via the compatibility socket. For simple stacks, podman-compose is sufficient. For complex Compose files, docker-compose may have better compatibility.',
    faq6Q: 'What is Quadlet and how does it replace docker-compose for production?',
    faq6A: 'Quadlet is Podman\'s native systemd integration. Instead of docker-compose up -d, you place .container files in systemd directories. Systemd manages container lifecycle, restart policies, ordering, and dependencies, integrating containers into the same model as other Linux services.',
    faq7Q: 'Can Podman run Docker images?',
    faq7A: 'Yes. Podman runs any OCI-compliant or Docker-format container image from Docker Hub, GHCR, Quay.io, or any OCI registry without modification.',
    faq8Q: 'How does Podman Machine work on macOS?',
    faq8A: 'Since containers require a Linux kernel, Podman Machine creates a lightweight Fedora CoreOS VM on macOS using Apple Virtualization or QEMU. The CLI transparently communicates with the VM, files are shared via virtiofs, and ports are forwarded automatically.',
    relatedTitle: 'Related Tools and Guides',
  },
  zh: {
    title: 'Podman 完全指南 2026：无守护进程容器、Rootless 安全与 Kubernetes 集成',
    description: '掌握 Podman — 无守护进程容器引擎、Rootless 容器、Pod 管理、Kubernetes YAML 生成、Buildah 集成、Podman Compose、systemd Quadlet、多架构构建及生产部署。',
    tldr: 'Podman 是无守护进程、默认 Rootless 的容器引擎，提供 Docker 兼容 CLI 而无需后台守护进程。由 Red Hat 开发，使用用户命名空间将容器作为普通用户进程运行。原生支持 Pod、Kubernetes YAML、Quadlet systemd 集成和 Buildah OCI 镜像构建。2026 年 Podman 5.x 是 Fedora/RHEL/CentOS Stream 默认运行时。',
    takeaway1: '无守护进程 — 容器作为用户子进程运行', takeaway2: 'Rootless 使用用户命名空间，无需 root', takeaway3: 'Docker 兼容 CLI — alias docker=podman', takeaway4: '原生 Pod 支持，共享网络/IPC 命名空间', takeaway5: 'podman generate/play kube 连接本地与 K8s', takeaway6: 'Quadlet systemd 集成，容器即服务',
    intro: 'Podman 是 Red Hat 开发的开源容器引擎，已成为 RHEL、Fedora 和 CentOS Stream 的默认容器工具。与 Docker 不同，无需中央守护进程——每个容器直接作为用户子进程运行。拥有 25,000+ GitHub 星标、Docker 兼容 CLI、原生 Pod 支持和深度 Kubernetes 集成。',
    h2What: '什么是 Podman 及为什么无守护进程很重要',
    whatP1: 'Podman 是 OCI 兼容的容器引擎。与 Docker 关键区别：Docker CLI 与 root dockerd 守护进程通信，Podman 完全消除守护进程——容器进程直接 fork 为子进程。',
    whatP2: '无守护进程设计意味着没有特权进程被攻破的风险。容器隔离在用户进程树中，没有单点故障。',
    whatList1: '无守护进程', whatList2: '默认 Rootless', whatList3: 'Docker 兼容 CLI', whatList4: '原生 Pod', whatList5: 'K8s 集成', whatList6: 'Buildah 镜像构建', whatList7: 'systemd Quadlet',
    h2Comparison: 'Podman vs Docker vs containerd vs nerdctl', compIntro: '了解容器工具生态有助于选择。',
    thFeature: '特性', thPodman: 'Podman', thDocker: 'Docker', thContainerd: 'containerd', thNerdctl: 'nerdctl',
    compDaemon: '守护进程', compRootless: 'Rootless', compCLI: 'CLI', compPods: 'Pod', compK8sYAML: 'K8s YAML', compCompose: 'Compose', compBuild: '构建', compSystemd: 'Systemd', compDesktop: 'GUI', compLicense: '许可证',
    valPodmanDaemon: '否', valDockerDaemon: '是', valContainerdDaemon: '是', valNerdctlDaemon: '用containerd',
    valPodmanRootless: '原生', valDockerRootless: '实验性', valContainerdRootless: 'rootlesskit', valNerdctlRootless: 'rootlesskit',
    valPodmanCLI: 'Docker兼容', valDockerCLI: 'docker', valContainerdCLI: 'ctr', valNerdctlCLI: 'Docker兼容',
    valPodmanPods: '原生', valDockerPods: '否', valContainerdPods: '否', valNerdctlPods: '否',
    valPodmanK8s: 'generate/play', valDockerK8s: '否', valContainerdK8s: '否', valNerdctlK8s: '否',
    valPodmanCompose: 'podman-compose', valDockerCompose: 'docker compose', valContainerdCompose: '否', valNerdctlCompose: 'nerdctl compose',
    valPodmanBuild: 'Buildah', valDockerBuild: 'BuildKit', valContainerdBuild: '需buildkit', valNerdctlBuild: 'BuildKit',
    valPodmanSystemd: 'Quadlet', valDockerSystemd: '手动', valContainerdSystemd: '手动', valNerdctlSystemd: '手动',
    valPodmanDesktop: 'Podman Desktop', valDockerDesktop: 'Docker Desktop', valContainerdDesktop: '无', valNerdctlDesktop: '无',
    valPodmanLicense: 'Apache 2.0', valDockerLicense: 'Apache 2.0', valContainerdLicense: 'Apache 2.0', valNerdctlLicense: 'Apache 2.0',
    h2Install: '安装', installIntro: 'Fedora/RHEL/CentOS Stream 已预装，其他平台可安装。',
    h3InstallFedora: 'Fedora / RHEL / CentOS', h3InstallUbuntu: 'Ubuntu / Debian', h3InstallMac: 'macOS', h3InstallWindows: 'Windows',
    h2Basics: 'Podman 基础', basicsP: '会 Docker 就会 Podman，可 alias docker=podman。',
    h3BasicRun: '运行容器', h3BasicManage: '管理容器和镜像',
    h2Rootless: 'Rootless 容器',
    rootlessP1: 'Rootless 是核心特性。使用用户命名空间，容器内是 root 但主机上是非特权用户。',
    rootlessP2: '即使逃逸也只是非特权用户，结合 SELinux/seccomp 提供纵深防御。',
    h2Compose: 'Podman Compose vs Docker Compose', composeP: '支持 podman-compose 或通过兼容套接字使用 docker-compose。',
    h2Pods: 'Pod 管理', podsP: 'Pod 将容器分组共享命名空间，与 Kubernetes Pod 一致。',
    h2Kube: 'Kubernetes YAML', kubeP: '可生成和部署 Kubernetes YAML，连接本地开发与生产。',
    h2Build: '构建镜像：Buildah', buildP: '底层用 Buildah，支持 Containerfile 和脚本化接口。',
    h2Desktop: 'Podman Desktop 和 Machine', desktopP: '跨平台 GUI 管理容器。macOS/Windows 通过 Podman Machine 运行轻量 VM。',
    h2Network: '网络：Netavark', networkP: 'Podman 4+ 用 Netavark + Aardvark-dns，自动 DNS 解析。',
    h2Volumes: '卷管理', volumesP: '支持命名卷、绑定挂载和 tmpfs。',
    h2Registry: '注册表管理', registryP: '通过 registries.conf 支持多注册表优先级搜索。',
    h2Systemd: 'Quadlet', systemdP: '.container 文件放入 systemd 目录即可管理容器生命周期。',
    h2Secrets: '密钥管理', secretsP: '安全传递敏感数据，不包含在镜像或环境变量中。',
    h2MultiArch: '多架构构建', multiArchP: '通过 podman manifest 和 QEMU 支持跨平台构建。',
    h2CICD: 'CI/CD', cicdP: '无守护进程架构适合共享 CI 运行器。',
    h3CICDGitHub: 'GitHub Actions', h3CICDGitLab: 'GitLab CI',
    h2Migration: '从 Docker 迁移', migrationP: '大多数工作流迁移简单，CLI 兼容。',
    migL1: '安装并别名 docker=podman', migL2: '替换 socket 路径', migL3: '用 podman-compose 或配置套接字', migL4: '用 Podman Desktop', migL5: '转 Quadlet', migL6: '更新 CI/CD', migL7: '测试 Compose 兼容性',
    h2Performance: '性能对比', perfP: '性能相当，无守护进程略快，Rootless 约 2-5% 开销。',
    perfL1: '启动略快', perfL2: '拉取相同', perfL3: '运行时相同', perfL4: '内存更少', perfL5: 'Rootless ~2-5%', perfL6: '构建相当',
    h2Security: '安全最佳实践', secIntro: '强安全默认值，额外加固确保纵深防御。',
    secL1: '始终 Rootless', secL2: 'SELinux :Z/:z', secL3: 'seccomp 限制', secL4: 'cap-drop=all', secL5: '只读根文件系统', secL6: 'cosign 签名', secL7: 'Trivy 扫描', secL8: 'no-new-privileges',
    h2Production: '生产部署', prodP: 'Quadlet + 自动更新 + 健康检查，无需编排器。',
    h2Troubleshooting: '故障排查',
    trL1: '权限拒绝：检查 subuid/subgid', trL2: '网络不通：安装 pasta', trL3: '低端口：设 sysctl', trL4: '拉取失败：检查 registries.conf', trL5: '不启动：查 podman logs', trL6: 'SELinux：加 :Z', trL7: 'Machine 故障：重建 VM', trL8: 'Compose：用 1.1+',
    h2FAQ: '常见问题',
    faq1Q: '能替代 Docker 吗？', faq1A: '绝大多数场景可以，CLI 兼容，Compose 兼容，主要缺少 Swarm。',
    faq2Q: '比 Docker 安全吗？', faq2A: '是，无 root 守护进程、默认 Rootless、SELinux 集成。',
    faq3Q: 'Rootless 原理？', faq3A: '用户命名空间映射容器 root 到主机非特权用户。',
    faq4Q: 'Pod vs K8s Pod？', faq4A: '直接对应，共享命名空间，可 generate kube 导出。',
    faq5Q: 'podman-compose 还是 docker-compose？', faq5A: '简单栈用前者，复杂文件用后者通过套接字。',
    faq6Q: 'Quadlet 是什么？', faq6A: 'systemd 原生集成，.container 文件替代 docker-compose 用于生产。',
    faq7Q: '能运行 Docker 镜像吗？', faq7A: '能，任何 OCI/Docker 格式镜像。',
    faq8Q: 'macOS Machine 原理？', faq8A: '创建 Fedora CoreOS VM，CLI 透明通信，virtiofs 共享文件。',
    relatedTitle: '相关工具和指南',
  },
};

export default function PodmanGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
      { '@type': 'Question', name: t.faq6Q, acceptedAnswer: { '@type': 'Answer', text: t.faq6A } },
      { '@type': 'Question', name: t.faq7Q, acceptedAnswer: { '@type': 'Answer', text: t.faq7A } },
      { '@type': 'Question', name: t.faq8Q, acceptedAnswer: { '@type': 'Answer', text: t.faq8A } },
    ],
  };

  const codeStyle = { backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' as const, fontSize: '0.875rem', marginBottom: '1.5rem' };
  const h2Style = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' };
  const h3Style = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' };
  const pStyle = { marginBottom: '1rem', lineHeight: '1.75' };
  const thStyle = { padding: '0.75rem', textAlign: 'left' as const, borderBottom: '2px solid #374151', fontWeight: 600 };
  const tdStyle = { padding: '0.75rem', borderBottom: '1px solid #374151' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0c4a6e', fontSize: '1.1rem' }}>TL;DR</p>
        <p style={{ color: '#0c4a6e', lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: '0.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Key Takeaways</p>
        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
          {[t.takeaway1, t.takeaway2, t.takeaway3, t.takeaway4, t.takeaway5, t.takeaway6].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
          ))}
        </ul>
      </div>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* What Is Podman */}
      <h2 style={h2Style}>{t.h2What}</h2>
      <p style={pStyle}>{t.whatP1}</p>
      <p style={pStyle}>{t.whatP2}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.whatList1, t.whatList2, t.whatList3, t.whatList4, t.whatList5, t.whatList6, t.whatList7].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>

      {/* Comparison Table */}
      <h2 style={h2Style}>{t.h2Comparison}</h2>
      <p style={pStyle}>{t.compIntro}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#1f2937' }}>
              {[t.thFeature, t.thPodman, t.thDocker, t.thContainerd, t.thNerdctl].map((h, i) => (
                <th key={i} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              [t.compDaemon, t.valPodmanDaemon, t.valDockerDaemon, t.valContainerdDaemon, t.valNerdctlDaemon],
              [t.compRootless, t.valPodmanRootless, t.valDockerRootless, t.valContainerdRootless, t.valNerdctlRootless],
              [t.compCLI, t.valPodmanCLI, t.valDockerCLI, t.valContainerdCLI, t.valNerdctlCLI],
              [t.compPods, t.valPodmanPods, t.valDockerPods, t.valContainerdPods, t.valNerdctlPods],
              [t.compK8sYAML, t.valPodmanK8s, t.valDockerK8s, t.valContainerdK8s, t.valNerdctlK8s],
              [t.compCompose, t.valPodmanCompose, t.valDockerCompose, t.valContainerdCompose, t.valNerdctlCompose],
              [t.compBuild, t.valPodmanBuild, t.valDockerBuild, t.valContainerdBuild, t.valNerdctlBuild],
              [t.compSystemd, t.valPodmanSystemd, t.valDockerSystemd, t.valContainerdSystemd, t.valNerdctlSystemd],
              [t.compDesktop, t.valPodmanDesktop, t.valDockerDesktop, t.valContainerdDesktop, t.valNerdctlDesktop],
              [t.compLicense, t.valPodmanLicense, t.valDockerLicense, t.valContainerdLicense, t.valNerdctlLicense],
            ].map((row, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#111827' : 'transparent' }}>
                {row.map((cell, j) => (
                  <td key={j} style={tdStyle}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Installation */}
      <h2 style={h2Style}>{t.h2Install}</h2>
      <p style={pStyle}>{t.installIntro}</p>

      <h3 style={h3Style}>{t.h3InstallFedora}</h3>
      <pre style={codeStyle}><code>{'# Pre-installed on Fedora/RHEL 8+/CentOS Stream\n'
        + 'podman --version\n'
        + '\n'
        + '# If not installed\n'
        + 'sudo dnf install -y podman podman-compose buildah skopeo'}</code></pre>

      <h3 style={h3Style}>{t.h3InstallUbuntu}</h3>
      <pre style={codeStyle}><code>{'# Ubuntu 22.04+ / Debian 12+\n'
        + 'sudo apt update && sudo apt install -y podman\n'
        + '\n'
        + '# For older Ubuntu, add the Kubic repository\n'
        + 'sudo mkdir -p /etc/apt/keyrings\n'
        + 'curl -fsSL https://download.opensuse.org/repositories/\\\n'
        + '  devel:kubic:libcontainers:unstable/xUbuntu_22.04/Release.key \\\n'
        + '  | gpg --dearmor | sudo tee /etc/apt/keyrings/devel_kubic.gpg > /dev/null\n'
        + 'sudo apt update && sudo apt install -y podman'}</code></pre>

      <h3 style={h3Style}>{t.h3InstallMac}</h3>
      <pre style={codeStyle}><code>{'# Install Podman via Homebrew\n'
        + 'brew install podman\n'
        + '\n'
        + '# Initialize and start the Linux VM\n'
        + 'podman machine init\n'
        + 'podman machine start\n'
        + '\n'
        + '# Verify installation\n'
        + 'podman info\n'
        + 'podman run hello-world\n'
        + '\n'
        + '# Optional: Install Podman Desktop GUI\n'
        + 'brew install --cask podman-desktop'}</code></pre>

      <h3 style={h3Style}>{t.h3InstallWindows}</h3>
      <pre style={codeStyle}><code>{'# Install via winget\n'
        + 'winget install RedHat.Podman\n'
        + '\n'
        + '# Initialize and start the machine\n'
        + 'podman machine init\n'
        + 'podman machine start\n'
        + '\n'
        + '# Install Podman Desktop\n'
        + 'winget install RedHat.Podman-Desktop'}</code></pre>

      {/* Podman Basics */}
      <h2 style={h2Style}>{t.h2Basics}</h2>
      <p style={pStyle}>{t.basicsP}</p>

      <h3 style={h3Style}>{t.h3BasicRun}</h3>
      <pre style={codeStyle}><code>{'# Run a container (identical to Docker syntax)\n'
        + 'podman run -d --name webserver -p 8080:80 nginx:alpine\n'
        + '\n'
        + '# Run interactively\n'
        + 'podman run -it --rm ubuntu:24.04 bash\n'
        + '\n'
        + '# With environment variables and volume\n'
        + 'podman run -d --name postgres \\\n'
        + '  -e POSTGRES_PASSWORD=secret \\\n'
        + '  -e POSTGRES_DB=myapp \\\n'
        + '  -v pgdata:/var/lib/postgresql/data \\\n'
        + '  -p 5432:5432 \\\n'
        + '  postgres:16-alpine\n'
        + '\n'
        + '# With resource limits\n'
        + 'podman run -d --name app \\\n'
        + '  --memory=512m --cpus=1.5 \\\n'
        + '  --restart=always \\\n'
        + '  myapp:latest'}</code></pre>

      <h3 style={h3Style}>{t.h3BasicManage}</h3>
      <pre style={codeStyle}><code>{'# Container management\n'
        + 'podman ps                      # list running\n'
        + 'podman ps -a                   # list all\n'
        + 'podman stop/start/restart webserver\n'
        + 'podman logs -f webserver       # follow logs\n'
        + 'podman exec -it webserver sh   # shell into container\n'
        + 'podman inspect webserver\n'
        + 'podman rm -f webserver\n'
        + 'podman container prune\n'
        + '\n'
        + '# Image management\n'
        + 'podman pull docker.io/library/nginx:alpine\n'
        + 'podman images\n'
        + 'podman search nginx\n'
        + 'podman tag nginx:alpine myregistry.io/nginx:v1\n'
        + 'podman push myregistry.io/nginx:v1\n'
        + 'podman rmi nginx:alpine\n'
        + 'podman image prune -a'}</code></pre>

      {/* Rootless */}
      <h2 style={h2Style}>{t.h2Rootless}</h2>
      <p style={pStyle}>{t.rootlessP1}</p>
      <p style={pStyle}>{t.rootlessP2}</p>
      <pre style={codeStyle}><code>{'# Verify rootless setup\n'
        + 'podman unshare cat /proc/self/uid_map\n'
        + '\n'
        + '# Check subuid/subgid allocation\n'
        + 'cat /etc/subuid   # username:100000:65536\n'
        + 'cat /etc/subgid   # username:100000:65536\n'
        + '\n'
        + '# If missing, add entries\n'
        + 'sudo usermod --add-subuids 100000-165535 --add-subgids 100000-165535 $USER\n'
        + 'podman system migrate\n'
        + '\n'
        + '# User namespace mapping:\n'
        + '# Host UID 1000    -> Container UID 0 (root)\n'
        + '# Host UID 100000  -> Container UID 1\n'
        + '# Host UID 165535  -> Container UID 65536\n'
        + '\n'
        + '# Verify: container sees root, host sees your UID\n'
        + 'podman run --rm alpine id          # uid=0(root)\n'
        + 'podman top <ctr> user huser        # root -> 1000'}</code></pre>

      {/* Compose */}
      <h2 style={h2Style}>{t.h2Compose}</h2>
      <p style={pStyle}>{t.composeP}</p>
      <pre style={codeStyle}><code>{'# Option 1: Install and use podman-compose\n'
        + 'pip install podman-compose\n'
        + 'podman-compose up -d\n'
        + 'podman-compose logs -f\n'
        + 'podman-compose down\n'
        + '\n'
        + '# Option 2: Use docker-compose with Podman socket\n'
        + 'systemctl --user enable --now podman.socket\n'
        + 'export DOCKER_HOST=unix:///run/user/\\$(id -u)/podman/podman.sock\n'
        + '\n'
        + '# Now docker-compose works with Podman backend\n'
        + 'docker-compose up -d\n'
        + 'docker-compose ps\n'
        + 'docker-compose down'}</code></pre>
      <pre style={codeStyle}><code>{'# docker-compose.yml (works with both)\n'
        + 'version: "3.9"\n'
        + 'services:\n'
        + '  app:\n'
        + '    image: node:20-alpine\n'
        + '    ports: ["3000:3000"]\n'
        + '    environment:\n'
        + '      - DATABASE_URL=postgresql://user:pass@db:5432/mydb\n'
        + '    depends_on: [db, redis]\n'
        + '  db:\n'
        + '    image: postgres:16-alpine\n'
        + '    environment:\n'
        + '      POSTGRES_USER: user\n'
        + '      POSTGRES_PASSWORD: pass\n'
        + '    volumes: [pgdata:/var/lib/postgresql/data]\n'
        + '  redis:\n'
        + '    image: redis:7-alpine\n'
        + 'volumes:\n'
        + '  pgdata:'}</code></pre>

      {/* Pods */}
      <h2 style={h2Style}>{t.h2Pods}</h2>
      <p style={pStyle}>{t.podsP}</p>
      <pre style={codeStyle}><code>{'# Create a pod with port mapping\n'
        + 'podman pod create --name webapp -p 8080:80 -p 5432:5432\n'
        + '\n'
        + '# Add containers to the pod\n'
        + 'podman run -d --pod webapp --name webapp-nginx nginx:alpine\n'
        + 'podman run -d --pod webapp --name webapp-db \\\n'
        + '  -e POSTGRES_PASSWORD=secret postgres:16-alpine\n'
        + '\n'
        + '# Containers in a pod share localhost\n'
        + '# nginx reaches postgres at localhost:5432\n'
        + 'podman run -d --pod webapp --name webapp-app \\\n'
        + '  -e DATABASE_URL=postgresql://user:pass@localhost:5432/mydb myapp:latest\n'
        + '\n'
        + '# Manage pods\n'
        + 'podman pod ls\n'
        + 'podman pod inspect webapp\n'
        + 'podman ps --pod --filter pod=webapp\n'
        + 'podman pod stop webapp && podman pod rm webapp'}</code></pre>

      {/* Kubernetes YAML */}
      <h2 style={h2Style}>{t.h2Kube}</h2>
      <p style={pStyle}>{t.kubeP}</p>
      <pre style={codeStyle}><code>{'# Generate Kubernetes YAML from a pod\n'
        + 'podman generate kube webapp > webapp.yaml\n'
        + 'podman generate kube webapp -s > webapp-with-service.yaml\n'
        + '\n'
        + '# Deploy Kubernetes YAML locally\n'
        + 'podman play kube webapp.yaml\n'
        + 'podman play kube --down webapp.yaml    # tear down\n'
        + 'podman play kube --replace webapp.yaml  # update\n'
        + '\n'
        + '# Deploy with configmap\n'
        + 'podman play kube webapp.yaml --configmap=config.yaml\n'
        + '\n'
        + '# Workflow: develop locally -> export -> test -> deploy\n'
        + '# 1. podman pod create / podman run --pod ...\n'
        + '# 2. podman generate kube webapp > webapp.yaml\n'
        + '# 3. podman play kube webapp.yaml  (local test)\n'
        + '# 4. kubectl apply -f webapp.yaml   (deploy to K8s cluster)'}</code></pre>

      {/* Building Images */}
      <h2 style={h2Style}>{t.h2Build}</h2>
      <p style={pStyle}>{t.buildP}</p>
      <pre style={codeStyle}><code>{'# Containerfile (identical to Dockerfile syntax)\n'
        + 'FROM node:20-alpine AS builder\n'
        + 'WORKDIR /app\n'
        + 'COPY package*.json ./\n'
        + 'RUN npm ci\n'
        + 'COPY . .\n'
        + 'RUN npm run build\n'
        + '\n'
        + 'FROM node:20-alpine\n'
        + 'WORKDIR /app\n'
        + 'COPY --from=builder /app/dist ./dist\n'
        + 'COPY --from=builder /app/node_modules ./node_modules\n'
        + 'RUN addgroup -S app && adduser -S app -G app\n'
        + 'USER app\n'
        + 'EXPOSE 3000\n'
        + 'CMD ["node", "dist/index.js"]'}</code></pre>
      <pre style={codeStyle}><code>{'# Build commands\n'
        + 'podman build -t myapp:latest .\n'
        + 'podman build -t myapp:prod -f Containerfile.prod .\n'
        + 'podman build --build-arg NODE_ENV=production -t myapp:prod .\n'
        + 'podman build --no-cache -t myapp:latest .'}</code></pre>

      <pre style={codeStyle}><code>{'# Go application — multi-stage with scratch\n'
        + 'FROM golang:1.23-alpine AS build\n'
        + 'WORKDIR /src\n'
        + 'COPY go.mod go.sum ./\n'
        + 'RUN go mod download\n'
        + 'COPY . .\n'
        + 'RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server ./cmd/server\n'
        + '\n'
        + 'FROM scratch\n'
        + 'COPY --from=build /app/server /server\n'
        + 'COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/\n'
        + 'EXPOSE 8080\n'
        + 'ENTRYPOINT ["/server"]'}</code></pre>

      {/* Desktop & Machine */}
      <h2 style={h2Style}>{t.h2Desktop}</h2>
      <p style={pStyle}>{t.desktopP}</p>
      <pre style={codeStyle}><code>{'# Install Podman Desktop\n'
        + 'brew install --cask podman-desktop        # macOS\n'
        + 'winget install RedHat.Podman-Desktop      # Windows\n'
        + 'flatpak install flathub io.podman_desktop.PodmanDesktop  # Linux\n'
        + '\n'
        + '# Features: container/pod management, image building,\n'
        + '# Kubernetes cluster connection, extension ecosystem\n'
        + '# (Kind, Minikube, OpenShift), Docker Desktop migration'}</code></pre>
      <pre style={codeStyle}><code>{'# Podman Machine — VM management for macOS/Windows\n'
        + 'podman machine init --cpus 4 --memory 4096 --disk-size 60\n'
        + 'podman machine start\n'
        + 'podman machine ls\n'
        + 'podman machine ssh               # SSH into the VM\n'
        + 'podman machine set --rootful     # enable rootful mode\n'
        + 'podman machine stop\n'
        + 'podman machine rm                # remove and recreate if issues\n'
        + 'podman machine init && podman machine start'}</code></pre>

      {/* Networking */}
      <h2 style={h2Style}>{t.h2Network}</h2>
      <p style={pStyle}>{t.networkP}</p>
      <pre style={codeStyle}><code>{'# Create custom network\n'
        + 'podman network create mynet\n'
        + 'podman network create --subnet 10.89.0.0/24 --gateway 10.89.0.1 mynet\n'
        + '\n'
        + '# Run containers on custom network\n'
        + 'podman run -d --name db --network mynet postgres:16-alpine\n'
        + 'podman run -d --name app --network mynet myapp:latest\n'
        + '\n'
        + '# Aardvark-dns provides automatic DNS resolution by container name\n'
        + '# Inside "app" container:\n'
        + 'podman exec app ping db\n'
        + '# PING db (10.89.0.2): 56 data bytes\n'
        + '# 64 bytes from 10.89.0.2: seq=0 ttl=64 time=0.089 ms\n'
        + '\n'
        + '# Port mapping for external access\n'
        + 'podman run -d --name web --network mynet -p 8080:80 nginx:alpine\n'
        + '\n'
        + '# Network management\n'
        + 'podman network ls\n'
        + 'podman network inspect mynet\n'
        + 'podman network connect mynet existing-container\n'
        + 'podman network disconnect mynet existing-container\n'
        + 'podman network rm mynet'}</code></pre>

      {/* Volumes */}
      <h2 style={h2Style}>{t.h2Volumes}</h2>
      <p style={pStyle}>{t.volumesP}</p>
      <pre style={codeStyle}><code>{'# Create and use named volume\n'
        + 'podman volume create mydata\n'
        + 'podman run -d --name db \\\n'
        + '  -v mydata:/var/lib/postgresql/data \\\n'
        + '  postgres:16-alpine\n'
        + '\n'
        + '# Bind mount (host directory) with SELinux labels\n'
        + 'podman run -d --name web \\\n'
        + '  -v ./html:/usr/share/nginx/html:Z \\\n'
        + '  nginx:alpine\n'
        + '# :Z = SELinux private label (single container access)\n'
        + '# :z = SELinux shared label (multiple containers)\n'
        + '# :ro = read-only mount\n'
        + '\n'
        + '# tmpfs mount (in-memory, no persistence)\n'
        + 'podman run -d --tmpfs /tmp:size=100m myapp:latest\n'
        + '\n'
        + '# Volume management\n'
        + 'podman volume ls\n'
        + 'podman volume inspect mydata\n'
        + 'podman volume rm mydata\n'
        + 'podman volume prune  # remove all unused volumes'}</code></pre>

      {/* Registry */}
      <h2 style={h2Style}>{t.h2Registry}</h2>
      <p style={pStyle}>{t.registryP}</p>
      <pre style={codeStyle}><code>{'# /etc/containers/registries.conf\n'
        + '# Podman searches these registries in order for unqualified images\n'
        + '[registries.search]\n'
        + 'registries = ["docker.io", "quay.io", "ghcr.io"]\n'
        + '\n'
        + '# Login to multiple registries\n'
        + 'podman login docker.io\n'
        + 'podman login quay.io\n'
        + 'podman login ghcr.io\n'
        + '# Credentials stored in: \\${XDG_RUNTIME_DIR}/containers/auth.json\n'
        + '\n'
        + '# Pull from specific registry\n'
        + 'podman pull docker.io/library/nginx:alpine\n'
        + 'podman pull quay.io/podman/stable\n'
        + 'podman pull ghcr.io/owner/image:tag\n'
        + '\n'
        + '# Use skopeo for advanced registry operations\n'
        + 'skopeo inspect docker://docker.io/library/nginx:alpine\n'
        + 'skopeo copy docker://src-registry/img docker://dst-registry/img'}</code></pre>

      {/* Systemd / Quadlet */}
      <h2 style={h2Style}>{t.h2Systemd}</h2>
      <p style={pStyle}>{t.systemdP}</p>
      <pre style={codeStyle}><code>{'# ~/.config/containers/systemd/webapp.container\n'
        + '[Unit]\n'
        + 'Description=Web Application\n'
        + 'After=network-online.target\n'
        + '\n'
        + '[Container]\n'
        + 'Image=docker.io/library/nginx:alpine\n'
        + 'PublishPort=8080:80\n'
        + 'Volume=./html:/usr/share/nginx/html:Z\n'
        + 'AutoUpdate=registry\n'
        + 'HealthCmd=curl -f http://localhost/ || exit 1\n'
        + 'HealthInterval=30s\n'
        + '\n'
        + '[Service]\n'
        + 'Restart=always\n'
        + '\n'
        + '[Install]\n'
        + 'WantedBy=default.target'}</code></pre>
      <pre style={codeStyle}><code>{'# Enable and manage\n'
        + 'systemctl --user daemon-reload\n'
        + 'systemctl --user enable --now webapp.service\n'
        + 'journalctl --user -u webapp.service -f\n'
        + '\n'
        + '# Auto-update (checks registry for new digests)\n'
        + 'systemctl --user enable --now podman-auto-update.timer\n'
        + 'podman auto-update --dry-run\n'
        + 'podman auto-update'}</code></pre>

      {/* Secrets */}
      <h2 style={h2Style}>{t.h2Secrets}</h2>
      <p style={pStyle}>{t.secretsP}</p>
      <pre style={codeStyle}><code>{'# Create a secret from stdin\n'
        + 'echo "my-database-password" | podman secret create db-password -\n'
        + '\n'
        + '# Create from file\n'
        + 'podman secret create tls-cert ./server.crt\n'
        + 'podman secret create tls-key ./server.key\n'
        + '\n'
        + '# List secrets\n'
        + 'podman secret ls\n'
        + '\n'
        + '# Use as file (mounted at /run/secrets/)\n'
        + 'podman run -d --name db \\\n'
        + '  --secret db-password \\\n'
        + '  -e POSTGRES_PASSWORD_FILE=/run/secrets/db-password \\\n'
        + '  postgres:16-alpine\n'
        + '\n'
        + '# Use as environment variable\n'
        + 'podman run -d --name app \\\n'
        + '  --secret db-password,type=env,target=DB_PASS \\\n'
        + '  myapp:latest\n'
        + '\n'
        + '# Inspect and remove\n'
        + 'podman secret inspect db-password\n'
        + 'podman secret rm db-password'}</code></pre>

      {/* Multi-arch */}
      <h2 style={h2Style}>{t.h2MultiArch}</h2>
      <p style={pStyle}>{t.multiArchP}</p>
      <pre style={codeStyle}><code>{'# Create a manifest list for multi-arch image\n'
        + 'podman manifest create myapp:latest\n'
        + '\n'
        + '# Build for each architecture\n'
        + 'podman build --platform linux/amd64 -t myapp:amd64 .\n'
        + 'podman build --platform linux/arm64 -t myapp:arm64 .\n'
        + '\n'
        + '# Add platform images to manifest\n'
        + 'podman manifest add myapp:latest myapp:amd64\n'
        + 'podman manifest add myapp:latest myapp:arm64\n'
        + '\n'
        + '# Inspect and push\n'
        + 'podman manifest inspect myapp:latest\n'
        + 'podman manifest push myapp:latest docker://registry.io/myapp:latest\n'
        + '\n'
        + '# Or build all platforms in one command\n'
        + 'podman build --platform linux/amd64,linux/arm64 \\\n'
        + '  --manifest myapp:latest .'}</code></pre>

      {/* CI/CD */}
      <h2 style={h2Style}>{t.h2CICD}</h2>
      <p style={pStyle}>{t.cicdP}</p>

      <h3 style={h3Style}>{t.h3CICDGitHub}</h3>
      <pre style={codeStyle}><code>{'# .github/workflows/build.yml\n'
        + 'name: Build with Podman\n'
        + 'on: { push: { branches: [main] } }\n'
        + 'jobs:\n'
        + '  build:\n'
        + '    runs-on: ubuntu-latest\n'
        + '    steps:\n'
        + '      - uses: actions/checkout@v4\n'
        + '      - run: podman build -t myapp:latest .\n'
        + '      - run: podman run --rm myapp:latest npm test\n'
        + '      - run: |\n'
        + '          echo \\${{ secrets.GITHUB_TOKEN }} | \\\n'
        + '            podman login ghcr.io -u \\${{ github.actor }} --password-stdin\n'
        + '          podman tag myapp:latest ghcr.io/\\${{ github.repository }}:latest\n'
        + '          podman push ghcr.io/\\${{ github.repository }}:latest'}</code></pre>

      <h3 style={h3Style}>{t.h3CICDGitLab}</h3>
      <pre style={codeStyle}><code>{'# .gitlab-ci.yml\n'
        + 'build:\n'
        + '  image: quay.io/podman/stable\n'
        + '  script:\n'
        + '    - podman build -t \\$CI_REGISTRY_IMAGE:\\$CI_COMMIT_SHA .\n'
        + '    - podman login -u \\$CI_REGISTRY_USER -p \\$CI_REGISTRY_PASSWORD \\$CI_REGISTRY\n'
        + '    - podman push \\$CI_REGISTRY_IMAGE:\\$CI_COMMIT_SHA'}</code></pre>

      {/* Migration */}
      <h2 style={h2Style}>{t.h2Migration}</h2>
      <p style={pStyle}>{t.migrationP}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.migL1, t.migL2, t.migL3, t.migL4, t.migL5, t.migL6, t.migL7].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>
      <pre style={codeStyle}><code>{'# Step 1: Install Podman and compatibility layer\n'
        + 'sudo dnf install podman podman-docker  # provides /usr/bin/docker\n'
        + '\n'
        + '# Step 2: Create Docker alias\n'
        + 'echo "alias docker=podman" >> ~/.bashrc\n'
        + 'source ~/.bashrc\n'
        + '\n'
        + '# Step 3: Enable Podman socket for Docker Compose\n'
        + 'systemctl --user enable --now podman.socket\n'
        + 'export DOCKER_HOST=unix:///run/user/\\$(id -u)/podman/podman.sock\n'
        + '\n'
        + '# Step 4: Test with existing Docker workflows\n'
        + 'docker run hello-world          # uses Podman\n'
        + 'docker-compose up -d            # uses Podman backend\n'
        + 'docker build -t myapp .         # uses Buildah'}</code></pre>

      {/* Performance */}
      <h2 style={h2Style}>{t.h2Performance}</h2>
      <p style={pStyle}>{t.perfP}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.perfL1, t.perfL2, t.perfL3, t.perfL4, t.perfL5, t.perfL6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>

      {/* Security */}
      <h2 style={h2Style}>{t.h2Security}</h2>
      <p style={pStyle}>{t.secIntro}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.secL1, t.secL2, t.secL3, t.secL4, t.secL5, t.secL6, t.secL7, t.secL8].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>
      <pre style={codeStyle}><code>{'# Security-hardened container\n'
        + 'podman run -d --name secure-app \\\n'
        + '  --cap-drop=all --cap-add=NET_BIND_SERVICE \\\n'
        + '  --read-only --tmpfs /tmp:size=50m \\\n'
        + '  --security-opt=no-new-privileges \\\n'
        + '  --security-opt label=type:container_t \\\n'
        + '  --user 1000:1000 --memory=256m --cpus=0.5 \\\n'
        + '  -v ./data:/app/data:Z,ro myapp:latest\n'
        + '\n'
        + '# Verify image and scan\n'
        + 'cosign verify --key cosign.pub myregistry.io/myapp:latest\n'
        + 'podman run --rm aquasec/trivy image myapp:latest'}</code></pre>

      {/* Production */}
      <h2 style={h2Style}>{t.h2Production}</h2>
      <p style={pStyle}>{t.prodP}</p>
      <pre style={codeStyle}><code>{'# /etc/containers/systemd/myapp.container\n'
        + '[Unit]\n'
        + 'Description=Production App\n'
        + 'After=network-online.target myapp-db.service\n'
        + 'Requires=myapp-db.service\n'
        + '\n'
        + '[Container]\n'
        + 'Image=ghcr.io/myorg/myapp:latest\n'
        + 'PublishPort=443:8443\n'
        + 'Network=myapp.network\n'
        + 'Secret=db-password,type=env,target=DATABASE_PASSWORD\n'
        + 'Secret=tls-cert,target=/etc/ssl/server.crt\n'
        + 'Volume=app-data:/app/data:Z\n'
        + 'Environment=NODE_ENV=production\n'
        + 'AutoUpdate=registry\n'
        + 'HealthCmd=curl -fk https://localhost:8443/health || exit 1\n'
        + 'HealthInterval=15s\n'
        + 'HealthRetries=5\n'
        + '\n'
        + '[Service]\n'
        + 'Restart=always\n'
        + 'RestartSec=5\n'
        + '\n'
        + '[Install]\n'
        + 'WantedBy=multi-user.target'}</code></pre>
      <pre style={codeStyle}><code>{'# /etc/containers/systemd/myapp-db.container\n'
        + '[Unit]\n'
        + 'Description=Production Database\n'
        + 'After=network-online.target\n'
        + '\n'
        + '[Container]\n'
        + 'Image=docker.io/library/postgres:16-alpine\n'
        + 'Network=myapp.network\n'
        + 'Secret=db-password,type=env,target=POSTGRES_PASSWORD\n'
        + 'Volume=pgdata:/var/lib/postgresql/data:Z\n'
        + 'Environment=POSTGRES_DB=myapp\n'
        + 'HealthCmd=pg_isready -U postgres\n'
        + 'HealthInterval=10s\n'
        + '\n'
        + '[Service]\n'
        + 'Restart=always\n'
        + '\n'
        + '[Install]\n'
        + 'WantedBy=multi-user.target'}</code></pre>
      <pre style={codeStyle}><code>{'# /etc/containers/systemd/myapp.network\n'
        + '[Network]\n'
        + 'Subnet=10.89.1.0/24\n'
        + 'Gateway=10.89.1.1\n'
        + '\n'
        + '# Deploy the full production stack\n'
        + 'sudo systemctl daemon-reload\n'
        + 'sudo systemctl enable --now myapp-db.service\n'
        + 'sudo systemctl enable --now myapp.service\n'
        + 'sudo systemctl enable --now podman-auto-update.timer\n'
        + '\n'
        + '# Monitor\n'
        + 'systemctl status myapp.service\n'
        + 'journalctl -u myapp.service -f'}</code></pre>

      {/* Troubleshooting */}
      <h2 style={h2Style}>{t.h2Troubleshooting}</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.trL1, t.trL2, t.trL3, t.trL4, t.trL5, t.trL6, t.trL7, t.trL8].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.75rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>
      <pre style={codeStyle}><code>{'# Debugging commands\n'
        + 'podman info                    # system info\n'
        + 'podman system check            # storage consistency\n'
        + 'podman events                  # real-time events\n'
        + 'podman logs -f <container>     # container logs\n'
        + 'podman healthcheck run <ctr>   # manual health check\n'
        + 'podman system df               # disk usage\n'
        + 'podman system prune -a         # clean everything\n'
        + 'podman system reset            # nuclear reset\n'
        + 'podman info --format "{{.Host.NetworkBackend}}"'}</code></pre>

      {/* FAQ */}
      <h2 style={h2Style}>{t.h2FAQ}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A], [t.faq4Q, t.faq4A],
          [t.faq5Q, t.faq5A], [t.faq6Q, t.faq6A], [t.faq7Q, t.faq7A], [t.faq8Q, t.faq8A],
        ].map(([q, a], i) => (
          <div key={i} style={{ border: '1px solid #374151', borderRadius: '0.5rem', padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
