'use client';
import React from 'react';

const translations: Record<string, {
  title: string; description: string; toc: string[]; tldr: string; takeaways: string[];
  intro: string; whatIsTitle: string; whatIsDesc: string; whyTitle: string; whyItems: string[];
  compTitle: string; compDesc: string; specTitle: string; specDesc: string;
  vscodeTitle: string; vscodeDesc: string; codespacesTitle: string; codespacesDesc: string;
  prebuiltTitle: string; prebuiltDesc: string; dockerfileTitle: string; dockerfileDesc: string;
  featuresTitle: string; featuresDesc: string; composeTitle: string; composeDesc: string;
  portTitle: string; portDesc: string; envTitle: string; envDesc: string;
  extTitle: string; extDesc: string; lifecycleTitle: string; lifecycleDesc: string;
  volumesTitle: string; volumesDesc: string; gpuTitle: string; gpuDesc: string;
  multiRootTitle: string; multiRootDesc: string; templatesTitle: string; templatesDesc: string;
  jetbrainsTitle: string; jetbrainsDesc: string; perfTitle: string; perfDesc: string; perfTips: string[];
  onboardTitle: string; onboardDesc: string; cicdTitle: string; cicdDesc: string;
  secTitle: string; secDesc: string; secTips: string[];
  patternsTitle: string; patternsDesc: string; troubleTitle: string; troubleDesc: string;
  faqTitle: string;
  faq1Q: string; faq1A: string; faq2Q: string; faq2A: string;
  faq3Q: string; faq3A: string; faq4Q: string; faq4A: string;
  faq5Q: string; faq5A: string; faq6Q: string; faq6A: string;
  faq7Q: string; faq7A: string; faq8Q: string; faq8A: string;
  conclusionTitle: string; conclusionDesc: string;
}> = {
  en: {
    title: 'Dev Containers Complete Guide 2026: Reproducible Development Environments with devcontainer.json',
    description: 'Master Dev Containers in 2026. Learn devcontainer.json, VS Code integration, GitHub Codespaces, Dockerfiles, Features, Docker Compose, GPU support, CI/CD, and team onboarding.',
    toc: ['What Are Dev Containers','Dev Containers vs Docker Compose vs Vagrant vs Nix','devcontainer.json Specification','VS Code Setup','GitHub Codespaces','Pre-built Images','Custom Dockerfile','Features System','Docker Compose Multi-Service','Port Forwarding','Environment Variables and Secrets','VS Code Extensions and Settings','Lifecycle Commands','Volumes and Mounts','GPU Support for ML/AI','Multi-Root Workspaces','Templates and Community Features','JetBrains Support','Performance Optimization','Team Onboarding','CI/CD Integration','Security Best Practices','Common Language Patterns','Troubleshooting'],
    tldr: 'Dev Containers define your entire development environment as code using a devcontainer.json file, ensuring every developer gets an identical, reproducible setup with a single click. In 2026, Dev Containers are natively supported in VS Code, JetBrains IDEs, GitHub Codespaces, and CI/CD pipelines. They eliminate "works on my machine" issues by containerizing editor settings, extensions, tools, runtimes, databases, and services into a portable, version-controlled configuration.',
    takeaways: ['devcontainer.json is an open specification supported by VS Code, JetBrains, GitHub Codespaces, and CLI tools','Pre-built images from mcr.microsoft.com/devcontainers cover most languages out of the box','The Features system lets you compose tools without writing Dockerfiles','Docker Compose integration enables multi-service dev environments with databases and caches','GitHub Codespaces provides cloud-hosted dev containers accessible from any browser','Lifecycle commands automate dependency installation and service startup','GPU passthrough enables ML/AI development inside containers with CUDA support','The devcontainer CLI enables CI/CD pipelines to use the same environment developers use locally'],
    intro: 'The "works on my machine" problem has plagued software teams for decades. Different operating systems, tool versions, and system configurations cause builds to fail and onboarding to take days. Dev Containers solve this by defining your entire development environment as a single JSON file in your repository. In 2026, the specification has matured into an open standard supported by every major editor and cloud platform.',
    whatIsTitle: 'What Are Dev Containers and Why They Matter',
    whatIsDesc: 'A Dev Container is a Docker container specifically configured for development. Unlike production containers, dev containers include editors, debuggers, language runtimes, linters, and every tool a developer needs. The configuration lives in .devcontainer/devcontainer.json, making it version-controlled and shared across the team.',
    whyTitle: 'Why Dev Containers Matter in 2026',
    whyItems: ['Zero onboarding friction: new team members get a working environment in minutes','Reproducible builds: everyone runs the exact same tools and versions','OS independence: same devcontainer.json works on macOS, Windows, and Linux','Cloud-ready: runs locally or instantly in GitHub Codespaces from a browser','Open specification: supported by VS Code, JetBrains, DevPod, and CLI tools','CI/CD parity: test and build inside the same container developers use'],
    compTitle: 'Dev Containers vs Docker Compose vs Vagrant vs Nix',
    compDesc: 'Dev Containers are not the only solution for reproducible environments. Here is how they compare to other popular approaches.',
    specTitle: 'devcontainer.json Specification and Structure',
    specDesc: 'The devcontainer.json file is the heart of every Dev Container. It follows the open specification at containers.dev and lives in .devcontainer/devcontainer.json.',
    vscodeTitle: 'VS Code Dev Containers Extension Setup',
    vscodeDesc: 'VS Code provides first-class support through the Dev Containers extension. After installing it, VS Code detects .devcontainer/devcontainer.json and offers to reopen the folder inside a container.',
    codespacesTitle: 'GitHub Codespaces Integration',
    codespacesDesc: 'GitHub Codespaces provides cloud-hosted dev containers that launch from any GitHub repository. It reads your devcontainer.json and builds the environment on a cloud VM, accessible via browser or local VS Code.',
    prebuiltTitle: 'Pre-built Dev Container Images',
    prebuiltDesc: 'Microsoft provides pre-built images at mcr.microsoft.com/devcontainers, optimized for dev container use with common tools and regular security updates.',
    dockerfileTitle: 'Custom Dockerfile for Dev Containers',
    dockerfileDesc: 'When pre-built images do not cover your needs, provide a custom Dockerfile. The devcontainer.json references it and VS Code builds the image before starting the container.',
    featuresTitle: 'Features System: Installing Tools and Languages',
    featuresDesc: 'Dev Container Features are composable units of installation code. Instead of writing Dockerfile RUN commands, add Features to devcontainer.json. They handle installation, version pinning, and cross-platform compatibility.',
    composeTitle: 'Docker Compose Multi-Service Setup',
    composeDesc: 'For applications needing databases, caches, or other services, Dev Containers integrate with Docker Compose. Define services in docker-compose.yml and reference it from devcontainer.json.',
    portTitle: 'Port Forwarding and Networking',
    portDesc: 'Dev containers automatically forward ports from container to host. Configure forwarding behavior in devcontainer.json to control which ports are forwarded, their labels, and visibility.',
    envTitle: 'Environment Variables and Secrets',
    envDesc: 'Dev containers support multiple ways to inject environment variables: inline in devcontainer.json, from .env files, or via GitHub Codespaces secrets for sensitive values.',
    extTitle: 'VS Code Extensions and Settings in devcontainer.json',
    extDesc: 'Specify which VS Code extensions to install and what editor settings to apply, ensuring every developer has the same linter rules, formatter, and language support.',
    lifecycleTitle: 'Post-Create and Post-Start Commands',
    lifecycleDesc: 'Lifecycle commands run at specific points during container setup, automating dependency installation, database seeding, or background service startup.',
    volumesTitle: 'Volumes and Mounts for Persistence',
    volumesDesc: 'The workspace folder is bind-mounted by default. Add additional mounts for caches, credentials, or data that should persist across container rebuilds.',
    gpuTitle: 'GPU Support for ML/AI Development',
    gpuDesc: 'Dev containers support GPU passthrough for ML/AI work. With NVIDIA Container Toolkit on the host, expose GPUs for training models or running CUDA kernels.',
    multiRootTitle: 'Multi-Root Workspaces',
    multiRootDesc: 'Dev containers support multi-root workspaces where multiple repositories open in a single VS Code window, useful for microservice architectures.',
    templatesTitle: 'Dev Container Templates and Community Features',
    templatesDesc: 'The specification includes a Templates system providing starter configs for common scenarios, available from official and community repositories.',
    jetbrainsTitle: 'JetBrains Dev Container Support',
    jetbrainsDesc: 'JetBrains IDEs support Dev Containers through the remote development gateway. The IDE reads devcontainer.json, builds the container, and connects via SSH with the full IDE backend inside.',
    perfTitle: 'Performance Optimization',
    perfDesc: 'Dev containers can feel slow if misconfigured, especially on macOS where Docker runs in a Linux VM. Here are the most impactful optimizations.',
    perfTips: ['Use named Docker volumes for node_modules and dependency directories instead of bind mounts','Enable Docker BuildKit for faster builds with better layer caching','Use pre-built images instead of building from Dockerfile every time','Configure Codespaces prebuilds to pre-compute your dev container image','Mount .gitconfig and SSH keys from host instead of regenerating inside the container','Set updateContentCommand for incremental dependency updates on rebuild','Use the cacheFrom property to leverage Docker registry layer caching'],
    onboardTitle: 'Team Onboarding with Dev Containers',
    onboardDesc: 'Dev containers transform onboarding from a multi-day ordeal into a single-click operation. Combined with GitHub Codespaces, onboarding requires zero local setup.',
    cicdTitle: 'CI/CD with Dev Containers',
    cicdDesc: 'The devcontainer CLI and GitHub Actions let you build and test inside the exact same environment developers use locally, eliminating CI/CD environment drift.',
    secTitle: 'Security Best Practices',
    secDesc: 'Dev containers run arbitrary code on your machine, so security matters. Follow these practices.',
    secTips: ['Never run containers as root — use the remoteUser field','Pin image versions with SHA digests in critical environments','Store secrets in Codespaces secrets or local env vars, never in devcontainer.json','Audit third-party Features before adding them','Use Docker Content Trust to verify image signatures','Avoid --privileged unless absolutely necessary','Keep base images updated with regular rebuilds','Use .env files in .gitignore to prevent secret commits'],
    patternsTitle: 'Common Patterns by Language',
    patternsDesc: 'Production-ready devcontainer.json examples for the most popular languages in 2026.',
    troubleTitle: 'Troubleshooting Guide',
    troubleDesc: 'Here are the most common Dev Container issues and solutions.',
    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'What is the difference between Dev Containers and Docker Compose?',
    faq1A: 'Docker Compose defines multi-container stacks, while Dev Containers define development environments with editor settings, extensions, and tools on top. Dev Containers can use Docker Compose under the hood for multi-service setups.',
    faq2Q: 'Do Dev Containers work without VS Code?',
    faq2A: 'Yes. JetBrains IDEs support devcontainer.json natively. The devcontainer CLI works from any terminal. DevPod and GitHub Codespaces also support the specification.',
    faq3Q: 'How do Dev Containers affect build performance?',
    faq3A: 'Initial build can take minutes depending on image and Features. Subsequent starts are fast due to Docker layer caching. On macOS, use named volumes for dependencies to avoid file system bottlenecks.',
    faq4Q: 'Can I use Dev Containers for monorepos?',
    faq4A: 'Yes. Place devcontainer.json at the repo root. For multi-repo projects, use Docker Compose to define all services and attach VS Code to the primary service.',
    faq5Q: 'How do I share SSH keys and Git config with the container?',
    faq5A: 'VS Code automatically forwards your local SSH agent. Git credentials are forwarded via the built-in credential helper. For additional credentials, use mounts or environment variables.',
    faq6Q: 'Are Dev Containers free?',
    faq6A: 'The specification, VS Code, and extension are free. Local containers use your Docker installation at no cost. GitHub Codespaces has a free tier (120 core-hours/month) with paid tiers for heavier usage.',
    faq7Q: 'Can Dev Containers access the host file system?',
    faq7A: 'The workspace folder is mounted by default. Add mounts in devcontainer.json for other directories. Ports are forwarded between container and host automatically.',
    faq8Q: 'How do I update a Dev Container after changes?',
    faq8A: 'Run Dev Containers: Rebuild Container in VS Code. For clean rebuilds, use Rebuild Without Cache. In Codespaces, rebuild from the command palette or create a new Codespace.',
    conclusionTitle: 'Conclusion',
    conclusionDesc: 'Dev Containers are the most practical solution to reproducible development environments in 2026. By defining your setup as a devcontainer.json committed to your repository, you ensure every team member, CI pipeline, and cloud workspace runs the identical environment. Start with a pre-built image, add Features for your tools, and iterate from there.',
  },
  zh: {
    title: 'Dev Containers 完全指南 2026：使用 devcontainer.json 构建可复现的开发环境',
    description: '掌握 2026 年的 Dev Containers。学习 devcontainer.json 配置、VS Code 集成、GitHub Codespaces、自定义 Dockerfile、Features、Docker Compose、GPU 支持、CI/CD 和团队入职最佳实践。',
    toc: ['什么是 Dev Containers','Dev Containers vs Docker Compose vs Vagrant vs Nix','devcontainer.json 规范','VS Code 设置','GitHub Codespaces','预构建镜像','自定义 Dockerfile','Features 系统','Docker Compose 多服务','端口转发','环境变量和密钥','VS Code 扩展和设置','生命周期命令','卷和挂载','GPU 支持 ML/AI','多根工作区','模板和社区 Features','JetBrains 支持','性能优化','团队入职','CI/CD 集成','安全最佳实践','常见语言模式','故障排查'],
    tldr: 'Dev Containers 使用 devcontainer.json 文件将整个开发环境定义为代码，确保每个开发者一键获得完全相同的可复现环境。2026 年已被 VS Code、JetBrains、GitHub Codespaces 和 CI/CD 流水线原生支持，通过容器化编辑器设置、扩展、工具、运行时和服务来消除"在我机器上能跑"的问题。',
    takeaways: ['devcontainer.json 是被 VS Code、JetBrains、GitHub Codespaces 和 CLI 工具支持的开放规范','mcr.microsoft.com/devcontainers 的预构建镜像覆盖大多数语言','Features 系统让你无需编写 Dockerfile 即可组合工具','Docker Compose 集成支持包含数据库和缓存的多服务开发环境','GitHub Codespaces 提供可从浏览器访问的云端开发容器','生命周期命令自动化依赖安装和服务启动','GPU 直通支持在容器内进行 ML/AI 开发','devcontainer CLI 让 CI/CD 流水线使用与开发者本地相同的环境'],
    intro: '"在我机器上能跑"的问题困扰软件团队数十年。不同的操作系统、工具版本和系统配置导致构建失败和入职耗时数天。Dev Containers 通过将整个开发环境定义为仓库中的单个 JSON 文件来解决这个问题。2026 年，该规范已成为被每个主要编辑器和云平台支持的开放标准。',
    whatIsTitle: '什么是 Dev Containers 以及为什么重要',
    whatIsDesc: 'Dev Container 是专为开发配置的 Docker 容器。与生产容器不同，它包含编辑器、调试器、语言运行时和所有开发工具。配置在 .devcontainer/devcontainer.json 中，可版本控制并在团队中共享。',
    whyTitle: '为什么 Dev Containers 在 2026 年很重要',
    whyItems: ['零入职摩擦：新成员几分钟内获得可工作的环境','可复现构建：所有人运行相同的工具和版本','操作系统独立：相同配置在 macOS、Windows 和 Linux 上工作','云端就绪：本地运行或在 GitHub Codespaces 中即时启动','开放规范：被 VS Code、JetBrains、DevPod 等支持','CI/CD 一致性：在与开发者相同的容器中测试和构建'],
    compTitle: 'Dev Containers vs Docker Compose vs Vagrant vs Nix',
    compDesc: 'Dev Containers 不是唯一的可复现环境方案。以下是 2026 年的对比。',
    specTitle: 'devcontainer.json 规范和结构',
    specDesc: 'devcontainer.json 是每个 Dev Container 的核心，遵循 containers.dev 的开放规范，位于 .devcontainer/devcontainer.json。',
    vscodeTitle: 'VS Code Dev Containers 扩展设置',
    vscodeDesc: 'VS Code 通过 Dev Containers 扩展提供一流支持。安装后可检测项目中的 devcontainer.json 并提供在容器内重新打开的选项。',
    codespacesTitle: 'GitHub Codespaces 集成',
    codespacesDesc: 'GitHub Codespaces 提供可从任何仓库启动的云端开发容器，读取 devcontainer.json 在云端构建环境，通过浏览器或本地 VS Code 访问。',
    prebuiltTitle: '预构建的 Dev Container 镜像',
    prebuiltDesc: 'Microsoft 在 mcr.microsoft.com/devcontainers 提供预构建镜像，针对开发容器优化，包含常用工具并定期安全更新。',
    dockerfileTitle: '自定义 Dockerfile',
    dockerfileDesc: '当预构建镜像不满足需求时，提供自定义 Dockerfile。devcontainer.json 引用它，VS Code 在启动前构建镜像。',
    featuresTitle: 'Features 系统：安装工具和语言',
    featuresDesc: 'Features 是可组合的安装代码单元。无需编写 Dockerfile RUN 命令，在 devcontainer.json 中添加 Features 即可自动处理安装和版本固定。',
    composeTitle: 'Docker Compose 多服务设置',
    composeDesc: '对于需要数据库和缓存的应用，Dev Containers 与 Docker Compose 集成。在 docker-compose.yml 中定义服务并从 devcontainer.json 引用。',
    portTitle: '端口转发和网络',
    portDesc: '开发容器自动将端口从容器转发到主机。在 devcontainer.json 中配置转发行为。',
    envTitle: '环境变量和密钥',
    envDesc: '支持多种注入环境变量的方式：devcontainer.json 内联、.env 文件、或 GitHub Codespaces 密钥。',
    extTitle: 'VS Code 扩展和设置',
    extDesc: '指定容器内安装的扩展和编辑器设置，确保每个开发者有相同的工具配置。',
    lifecycleTitle: 'Post-Create 和 Post-Start 命令',
    lifecycleDesc: '生命周期命令在容器设置的特定时间点运行，自动化依赖安装和服务启动。',
    volumesTitle: '卷和挂载持久化',
    volumesDesc: '工作区默认绑定挂载。可为缓存和数据添加持久化挂载。',
    gpuTitle: 'GPU 支持 ML/AI 开发',
    gpuDesc: '支持 GPU 直通。在主机安装 NVIDIA Container Toolkit 后，可将 GPU 暴露给容器。',
    multiRootTitle: '多根工作区',
    multiRootDesc: '支持在单个 VS Code 窗口中打开多个仓库，适用于微服务架构。',
    templatesTitle: 'Dev Container 模板和社区 Features',
    templatesDesc: '规范包含模板系统，为常见场景提供入门配置，可从官方和社区仓库获取。',
    jetbrainsTitle: 'JetBrains Dev Container 支持',
    jetbrainsDesc: 'JetBrains IDE 通过远程开发网关支持 Dev Containers，读取 devcontainer.json 并通过 SSH 连接。',
    perfTitle: '性能优化',
    perfDesc: '配置不当时开发容器可能很慢，尤其在 macOS 上。以下是最有效的优化。',
    perfTips: ['对 node_modules 等使用命名卷而非绑定挂载','启用 Docker BuildKit 加速构建','使用预构建镜像而非每次从 Dockerfile 构建','配置 Codespaces 预构建','从主机挂载 .gitconfig 和 SSH 密钥','设置 updateContentCommand 增量更新依赖','使用 cacheFrom 利用注册表层缓存'],
    onboardTitle: '团队入职与 Dev Containers',
    onboardDesc: '开发容器将入职从数天变成一键操作。结合 GitHub Codespaces，零本地设置。',
    cicdTitle: 'CI/CD 与 Dev Containers',
    cicdDesc: 'devcontainer CLI 和 GitHub Actions 让你在与开发者本地相同的环境中构建和测试。',
    secTitle: '安全最佳实践',
    secDesc: '开发容器运行任意代码，安全很重要。遵循以下实践。',
    secTips: ['不要以 root 运行——使用 remoteUser','用 SHA 摘要固定镜像版本','密钥存储在 Codespaces 密钥中，不要放在 devcontainer.json','审计第三方 Features','使用 Docker Content Trust 验证签名','避免 --privileged','定期重建更新基础镜像','.env 文件加入 .gitignore'],
    patternsTitle: '常见语言模式',
    patternsDesc: '2026 年最流行语言的生产级 devcontainer.json 示例。',
    troubleTitle: '故障排查指南',
    troubleDesc: '最常见的 Dev Container 问题及解决方案。',
    faqTitle: '常见问题',
    faq1Q: 'Dev Containers 和 Docker Compose 有什么区别？',
    faq1A: 'Docker Compose 定义多容器栈，Dev Containers 定义开发环境（包含编辑器设置和扩展）。Dev Containers 可在底层使用 Docker Compose。',
    faq2Q: '不用 VS Code 能用 Dev Containers 吗？',
    faq2A: '可以。JetBrains IDE 原生支持 devcontainer.json。devcontainer CLI 可从任何终端使用。DevPod 和 Codespaces 也支持。',
    faq3Q: 'Dev Containers 影响性能吗？',
    faq3A: '首次构建需几分钟。后续启动因 Docker 缓存而很快。macOS 上对依赖目录使用命名卷可消除文件系统瓶颈。',
    faq4Q: '可以在 monorepo 中使用吗？',
    faq4A: '可以。将 devcontainer.json 放在仓库根目录。多仓库项目用 Docker Compose 定义所有服务。',
    faq5Q: '如何共享 SSH 密钥和 Git 配置？',
    faq5A: 'VS Code 自动转发本地 SSH 代理。Git 凭据通过内置助手转发。额外凭据可用挂载或环境变量。',
    faq6Q: 'Dev Containers 免费吗？',
    faq6A: '规范、VS Code 和扩展免费。本地容器无额外费用。Codespaces 有免费层（120 核心小时/月）。',
    faq7Q: '能访问主机文件系统吗？',
    faq7A: '工作区默认挂载。可在 devcontainer.json 中添加额外挂载。端口自动转发。',
    faq8Q: '修改配置后如何更新？',
    faq8A: '在 VS Code 中运行 Rebuild Container。需要全新构建用 Rebuild Without Cache。Codespaces 中从命令面板重建。',
    conclusionTitle: '总结',
    conclusionDesc: 'Dev Containers 是 2026 年可复现开发环境最实用的方案。通过将开发设置定义为 devcontainer.json 提交到仓库，确保每个团队成员和 CI 流水线运行相同环境。从预构建镜像开始，添加 Features，逐步迭代。',
  },
};

export default function DevcontainerGuide({ lang }: { lang: string }) {
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

  const cb = { backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' as const, fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' };
  const h2S = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' };
  const h3S = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' };
  const pS = { marginBottom: '1rem', lineHeight: '1.75' };
  const ulS = { paddingLeft: '1.5rem', marginBottom: '1.5rem' };
  const liS = { marginBottom: '0.5rem', lineHeight: '1.75' };
  const tblS = { width: '100%', borderCollapse: 'collapse' as const, marginBottom: '1.5rem', fontSize: '0.875rem' };
  const thS = { border: '1px solid #e2e8f0', padding: '0.75rem', backgroundColor: '#f8fafc', fontWeight: 600, textAlign: 'left' as const };
  const tdS = { border: '1px solid #e2e8f0', padding: '0.75rem', textAlign: 'left' as const };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.25rem 1.5rem', margin: '1.5rem 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.1rem' }}>TL;DR</p>
        <p style={{ margin: 0, lineHeight: '1.75' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: '0.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Key Takeaways</p>
        <ul style={ulS}>{t.takeaways.map((item, i) => <li key={i} style={liS}>{item}</li>)}</ul>
      </div>

      {/* Table of Contents */}
      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: '0.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Table of Contents</p>
        <ol style={{ paddingLeft: '1.5rem', margin: 0 }}>{t.toc.map((item, i) => <li key={i} style={{ marginBottom: '0.35rem', lineHeight: '1.6' }}>{item}</li>)}</ol>
      </div>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* What Are Dev Containers */}
      <h2 style={h2S}>{t.whatIsTitle}</h2>
      <p style={pS}>{t.whatIsDesc}</p>
      <h3 style={h3S}>{t.whyTitle}</h3>
      <ul style={ulS}>{t.whyItems.map((item, i) => <li key={i} style={liS}>{item}</li>)}</ul>

      {/* Comparison Table */}
      <h2 style={h2S}>{t.compTitle}</h2>
      <p style={pS}>{t.compDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tblS}>
          <thead><tr><th style={thS}>Feature</th><th style={thS}>Dev Containers</th><th style={thS}>Docker Compose</th><th style={thS}>Vagrant</th><th style={thS}>Nix</th></tr></thead>
          <tbody>
            <tr><td style={tdS}>Purpose</td><td style={tdS}>Dev environment as code</td><td style={tdS}>Multi-container orchestration</td><td style={tdS}>VM-based dev environments</td><td style={tdS}>Reproducible packages</td></tr>
            <tr><td style={tdS}>Editor Integration</td><td style={tdS}>VS Code, JetBrains native</td><td style={tdS}>None</td><td style={tdS}>SSH only</td><td style={tdS}>direnv + plugins</td></tr>
            <tr><td style={tdS}>Cloud Support</td><td style={tdS}>Codespaces, DevPod</td><td style={tdS}>None</td><td style={tdS}>None</td><td style={tdS}>None</td></tr>
            <tr><td style={tdS}>Startup Speed</td><td style={tdS}>Seconds (cached)</td><td style={tdS}>Seconds</td><td style={tdS}>Minutes (VM)</td><td style={tdS}>Seconds (cached)</td></tr>
            <tr><td style={tdS}>Resource Usage</td><td style={tdS}>Low (containers)</td><td style={tdS}>Low (containers)</td><td style={tdS}>High (full VM)</td><td style={tdS}>Minimal (host)</td></tr>
            <tr><td style={tdS}>Learning Curve</td><td style={tdS}>Low-Medium</td><td style={tdS}>Medium</td><td style={tdS}>Medium</td><td style={tdS}>High</td></tr>
            <tr><td style={tdS}>Multi-Service</td><td style={tdS}>Via Docker Compose</td><td style={tdS}>Native</td><td style={tdS}>Multiple VMs</td><td style={tdS}>NixOS containers</td></tr>
            <tr><td style={tdS}>OS Isolation</td><td style={tdS}>Linux container</td><td style={tdS}>Linux container</td><td style={tdS}>Full VM (any OS)</td><td style={tdS}>None (host)</td></tr>
          </tbody>
        </table>
      </div>

      {/* devcontainer.json Specification */}
      <h2 style={h2S}>{t.specTitle}</h2>
      <p style={pS}>{t.specDesc}</p>
      <pre style={cb}><code>{'// .devcontainer/devcontainer.json — full reference\n{\n' +
        '  "image": "mcr.microsoft.com/devcontainers/typescript-node:20",\n' +
        '  // OR: "build": { "dockerfile": "Dockerfile", "context": ".." },\n' +
        '  // OR: "dockerComposeFile": "docker-compose.yml", "service": "app",\n\n' +
        '  "name": "My Project Dev",\n\n' +
        '  "features": {\n' +
        '    "ghcr.io/devcontainers/features/node:1": { "version": "20" },\n' +
        '    "ghcr.io/devcontainers/features/python:1": { "version": "3.12" },\n' +
        '    "ghcr.io/devcontainers/features/docker-in-docker:2": {}\n' +
        '  },\n\n' +
        '  "forwardPorts": [3000, 5432, 6379],\n' +
        '  "portsAttributes": {\n' +
        '    "3000": { "label": "App", "onAutoForward": "notify" },\n' +
        '    "5432": { "label": "PostgreSQL", "onAutoForward": "silent" }\n' +
        '  },\n\n' +
        '  "customizations": {\n' +
        '    "vscode": {\n' +
        '      "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"],\n' +
        '      "settings": { "editor.formatOnSave": true }\n' +
        '    }\n' +
        '  },\n\n' +
        '  "containerEnv": { "NODE_ENV": "development" },\n' +
        '  "remoteEnv": { "LOCAL_USER": "\\${localEnv:USER}" },\n\n' +
        '  "postCreateCommand": "npm install && npx prisma migrate dev",\n' +
        '  "postStartCommand": "npm run dev",\n' +
        '  "remoteUser": "node",\n\n' +
        '  "mounts": [\n' +
        '    "source=node-modules,target=/workspace/node_modules,type=volume",\n' +
        '    "source=\\${localEnv:HOME}/.ssh,target=/home/node/.ssh,type=bind,readonly"\n' +
        '  ],\n' +
        '  "runArgs": ["--memory=4g", "--cpus=2"]\n' +
        '}'}</code></pre>

      {/* VS Code Setup */}
      <h2 style={h2S}>{t.vscodeTitle}</h2>
      <p style={pS}>{t.vscodeDesc}</p>
      <p style={pS}>The extension requires Docker Desktop (or Docker Engine on Linux) to be installed and running. On macOS and Windows, Docker Desktop provides the Docker daemon and a Linux VM for running containers. On Linux, Docker Engine runs natively with the best performance.</p>
      <pre style={cb}><code>{'# Step 1: Install prerequisites\n' +
        '# macOS/Windows: Install Docker Desktop from docker.com\n' +
        '# Linux: Install Docker Engine\n' +
        'curl -fsSL https://get.docker.com | sh\n' +
        'sudo usermod -aG docker $USER\n\n' +
        '# Step 2: Install the Dev Containers extension\n' +
        'code --install-extension ms-vscode-remote.remote-containers\n\n' +
        '# Step 3: Verify Docker is running\n' +
        'docker --version    # Docker 24+ recommended\n' +
        'docker info          # Verify Docker daemon is active\n\n' +
        '# Step 4: Open project — VS Code detects devcontainer.json\n' +
        'code /path/to/project\n' +
        '# Click "Reopen in Container" notification\n' +
        '# Or: Ctrl+Shift+P > "Dev Containers: Reopen in Container"\n\n' +
        '# Key commands (Command Palette):\n' +
        '# Dev Containers: Rebuild Container         — after config changes\n' +
        '# Dev Containers: Rebuild Without Cache     — force clean build\n' +
        '# Dev Containers: Reopen Folder Locally     — exit container mode\n' +
        '# Dev Containers: Show Container Log        — debug build issues\n' +
        '# Dev Containers: Open Folder in Container  — open any folder\n' +
        '# Dev Containers: Clone Repository in Container Volume — faster I/O'}</code></pre>

      {/* GitHub Codespaces */}
      <h2 style={h2S}>{t.codespacesTitle}</h2>
      <p style={pS}>{t.codespacesDesc}</p>
      <pre style={cb}><code>{'# Create a Codespace:\n# 1. Go to repo on GitHub > Code > Codespaces > Create codespace\n\n' +
        '# Machine types (2026):\n# 2-core / 8GB   — free tier (120 hrs/month)\n' +
        '# 4-core / 16GB  — \\$0.36/hr\n# 8-core / 32GB  — \\$0.72/hr\n' +
        '# 16-core / 64GB — \\$1.44/hr\n# 32-core / 128GB — \\$2.88/hr (GPU available)\n\n' +
        '# Prebuilds: Settings > Codespaces > Set up prebuild\n# Reduces Codespace startup to seconds\n\n' +
        '# Secrets: GitHub > Settings > Codespaces > Secrets\n# Available as env vars, never committed to source'}</code></pre>

      {/* Pre-built Images */}
      <h2 style={h2S}>{t.prebuiltTitle}</h2>
      <p style={pS}>{t.prebuiltDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tblS}>
          <thead><tr><th style={thS}>Image</th><th style={thS}>Includes</th><th style={thS}>Size</th></tr></thead>
          <tbody>
            <tr><td style={tdS}>devcontainers/base:ubuntu</td><td style={tdS}>Git, curl, zsh, utilities</td><td style={tdS}>~350MB</td></tr>
            <tr><td style={tdS}>devcontainers/typescript-node:20</td><td style={tdS}>Node.js 20, npm, yarn, TypeScript</td><td style={tdS}>~650MB</td></tr>
            <tr><td style={tdS}>devcontainers/python:3.12</td><td style={tdS}>Python 3.12, pip, venv</td><td style={tdS}>~600MB</td></tr>
            <tr><td style={tdS}>devcontainers/go:1.22</td><td style={tdS}>Go 1.22, gopls, delve</td><td style={tdS}>~800MB</td></tr>
            <tr><td style={tdS}>devcontainers/rust:1</td><td style={tdS}>Rust, cargo, clippy</td><td style={tdS}>~1.2GB</td></tr>
            <tr><td style={tdS}>devcontainers/java:21</td><td style={tdS}>JDK 21, Maven, Gradle</td><td style={tdS}>~900MB</td></tr>
            <tr><td style={tdS}>devcontainers/universal:2</td><td style={tdS}>Node, Python, Java, Go, .NET, PHP, Ruby</td><td style={tdS}>~6GB</td></tr>
          </tbody>
        </table>
      </div>

      {/* Custom Dockerfile */}
      <h2 style={h2S}>{t.dockerfileTitle}</h2>
      <p style={pS}>{t.dockerfileDesc}</p>
      <p style={pS}>When writing a Dockerfile for dev containers, start from a devcontainers base image whenever possible. These images already include common utilities like git, curl, sudo, and zsh. Then add your project-specific system packages, language runtimes, and global tools. Keep the image focused on development needs, not production requirements.</p>
      <pre style={cb}><code>{'# .devcontainer/Dockerfile\n' +
        'FROM mcr.microsoft.com/devcontainers/base:ubuntu\n\n' +
        '# Install system dependencies for native compilation\n' +
        'RUN apt-get update && apt-get install -y \\\n' +
        '    build-essential \\\n' +
        '    libpq-dev \\\n' +
        '    libssl-dev \\\n' +
        '    pkg-config \\\n' +
        '    protobuf-compiler \\\n' +
        '    graphviz \\\n' +
        '    && rm -rf /var/lib/apt/lists/*\n\n' +
        '# Install Node.js 20\n' +
        'RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \\\n' +
        '    && apt-get install -y nodejs\n\n' +
        '# Install global npm packages\n' +
        'RUN npm install -g pnpm@9 turbo@2 tsx\n\n' +
        '# Install Rust toolchain (optional for projects using native modules)\n' +
        'RUN curl --proto "=https" --tlsv1.2 -sSf https://sh.rustup.rs | \\\n' +
        '    sh -s -- -y --default-toolchain stable\n' +
        'ENV PATH="/root/.cargo/bin:\\${PATH}"\n\n' +
        '# Create non-root user workspace\n' +
        'WORKDIR /workspace'}</code></pre>
      <pre style={cb}><code>{'// .devcontainer/devcontainer.json with custom Dockerfile\n' +
        '{\n' +
        '  "name": "Custom Dev Environment",\n' +
        '  "build": {\n' +
        '    "dockerfile": "Dockerfile",\n' +
        '    "context": "..",\n' +
        '    "args": {\n' +
        '      "NODE_VERSION": "20",\n' +
        '      "VARIANT": "bookworm"\n' +
        '    },\n' +
        '    "cacheFrom": "ghcr.io/myorg/devcontainer:latest"\n' +
        '  },\n' +
        '  "remoteUser": "vscode",\n' +
        '  "postCreateCommand": "npm install"\n' +
        '}'}</code></pre>

      {/* Features */}
      <h2 style={h2S}>{t.featuresTitle}</h2>
      <p style={pS}>{t.featuresDesc}</p>
      <p style={pS}>Features are distributed as OCI artifacts (container images) and follow a well-defined installation protocol. Each Feature includes a devcontainer-feature.json manifest and an install.sh script. The official Features repository at github.com/devcontainers/features covers the most common tools, while community Features at github.com/devcontainers-contrib/features extend coverage to hundreds of additional tools.</p>
      <pre style={cb}><code>{'// Popular Dev Container Features (2026)\n' +
        '{\n' +
        '  "features": {\n' +
        '    // Language runtimes\n' +
        '    "ghcr.io/devcontainers/features/node:1": { "version": "20" },\n' +
        '    "ghcr.io/devcontainers/features/python:1": { "version": "3.12" },\n' +
        '    "ghcr.io/devcontainers/features/go:1": { "version": "1.22" },\n' +
        '    "ghcr.io/devcontainers/features/rust:1": { "version": "stable" },\n' +
        '    "ghcr.io/devcontainers/features/java:1": { "version": "21" },\n\n' +
        '    // Container and orchestration tools\n' +
        '    "ghcr.io/devcontainers/features/docker-in-docker:2": {},\n' +
        '    "ghcr.io/devcontainers/features/docker-outside-of-docker:1": {},\n' +
        '    "ghcr.io/devcontainers/features/kubectl-helm-minikube:1": {},\n\n' +
        '    // Cloud CLIs\n' +
        '    "ghcr.io/devcontainers/features/aws-cli:1": {},\n' +
        '    "ghcr.io/devcontainers/features/azure-cli:1": {},\n' +
        '    "ghcr.io/devcontainers/features/github-cli:1": {},\n\n' +
        '    // Database clients\n' +
        '    "ghcr.io/devcontainers/features/postgresql-client:1": {},\n\n' +
        '    // Shell and utilities\n' +
        '    "ghcr.io/devcontainers/features/common-utils:2": {\n' +
        '      "installZsh": true,\n' +
        '      "installOhMyZsh": true\n' +
        '    },\n' +
        '    "ghcr.io/devcontainers/features/sshd:1": {},\n' +
        '    "ghcr.io/devcontainers/features/git-lfs:1": {}\n' +
        '  }\n' +
        '}'}</code></pre>

      {/* Docker Compose */}
      <h2 style={h2S}>{t.composeTitle}</h2>
      <p style={pS}>{t.composeDesc}</p>
      <p style={pS}>The key pattern is to use <code>sleep infinity</code> as the command for the main development service. This keeps the container running so VS Code can attach to it. The actual development server is started by the developer or by postStartCommand, not by Docker Compose directly. Other services like databases run their normal entrypoints.</p>
      <pre style={cb}><code>{'# .devcontainer/docker-compose.yml\n' +
        'services:\n' +
        '  app:\n' +
        '    build:\n' +
        '      context: ..\n' +
        '      dockerfile: .devcontainer/Dockerfile\n' +
        '    volumes:\n' +
        '      - ..:/workspace:cached\n' +
        '      - node-modules:/workspace/node_modules\n' +
        '    command: sleep infinity\n' +
        '    ports:\n' +
        '      - "3000:3000"\n' +
        '      - "9229:9229"   # Node.js debugger\n' +
        '    environment:\n' +
        '      DATABASE_URL: postgresql://postgres:postgres@db:5432/myapp\n' +
        '      REDIS_URL: redis://redis:6379\n' +
        '      NODE_ENV: development\n' +
        '    depends_on:\n' +
        '      db:\n' +
        '        condition: service_healthy\n' +
        '      redis:\n' +
        '        condition: service_started\n\n' +
        '  db:\n' +
        '    image: postgres:16-alpine\n' +
        '    environment:\n' +
        '      POSTGRES_USER: postgres\n' +
        '      POSTGRES_PASSWORD: postgres\n' +
        '      POSTGRES_DB: myapp\n' +
        '    volumes:\n' +
        '      - postgres-data:/var/lib/postgresql/data\n' +
        '      - ./init.sql:/docker-entrypoint-initdb.d/init.sql\n' +
        '    ports:\n' +
        '      - "5432:5432"\n' +
        '    healthcheck:\n' +
        '      test: ["CMD-SHELL", "pg_isready -U postgres"]\n' +
        '      interval: 5s\n' +
        '      timeout: 5s\n' +
        '      retries: 5\n\n' +
        '  redis:\n' +
        '    image: redis:7-alpine\n' +
        '    ports:\n' +
        '      - "6379:6379"\n' +
        '    volumes:\n' +
        '      - redis-data:/data\n\n' +
        'volumes:\n' +
        '  node-modules:\n' +
        '  postgres-data:\n' +
        '  redis-data:'}</code></pre>
      <pre style={cb}><code>{'// devcontainer.json with Docker Compose\n{\n' +
        '  "name": "Full Stack Dev",\n  "dockerComposeFile": "docker-compose.yml",\n' +
        '  "service": "app",\n  "workspaceFolder": "/workspace",\n' +
        '  "forwardPorts": [3000, 5432, 6379],\n' +
        '  "postCreateCommand": "npm install && npx prisma migrate dev --name init",\n' +
        '  "customizations": { "vscode": {\n' +
        '    "extensions": ["prisma.prisma", "dbaeumer.vscode-eslint"]\n  }}\n}'}</code></pre>

      {/* Port Forwarding */}
      <h2 style={h2S}>{t.portTitle}</h2>
      <p style={pS}>{t.portDesc}</p>
      <pre style={cb}><code>{'{\n  "forwardPorts": [3000, 5432, 6379, 8080],\n  "portsAttributes": {\n' +
        '    "3000": { "label": "Frontend", "onAutoForward": "openBrowser" },\n' +
        '    "5432": { "label": "PostgreSQL", "onAutoForward": "silent" },\n' +
        '    "6379": { "label": "Redis", "onAutoForward": "ignore" },\n' +
        '    "8080": { "label": "API", "onAutoForward": "notify", "requireLocalPort": true }\n' +
        '  },\n  "otherPortsAttributes": { "onAutoForward": "silent" }\n}'}</code></pre>

      {/* Environment Variables */}
      <h2 style={h2S}>{t.envTitle}</h2>
      <p style={pS}>{t.envDesc}</p>
      <pre style={cb}><code>{'// Method 1: Inline\n{ "containerEnv": { "NODE_ENV": "development", "LOG_LEVEL": "debug" },\n' +
        '  "remoteEnv": { "LOCAL_USER": "\\${localEnv:USER}" } }\n\n' +
        '// Method 2: .env file (add to .gitignore!)\n// { "runArgs": ["--env-file", ".devcontainer/.env"] }\n' +
        '// .devcontainer/.env:\n// DATABASE_URL=postgresql://user:pass@db:5432/myapp\n' +
        '// AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE\n\n' +
        '// Method 3: GitHub Codespaces secrets\n// GitHub > Settings > Codespaces > Secrets\n// Available as env vars, never committed'}</code></pre>

      {/* Extensions and Settings */}
      <h2 style={h2S}>{t.extTitle}</h2>
      <p style={pS}>{t.extDesc}</p>
      <p style={pS}>Extensions listed in the customizations block are installed inside the container, not on the host VS Code. This distinction matters because some extensions need access to language servers, runtimes, or tools that only exist inside the container. Extensions like ESLint need Node.js, Python extensions need the Python interpreter, and database extensions need database clients. By installing them in the container, they automatically have access to everything they need.</p>
      <pre style={cb}><code>{'// VS Code customizations in devcontainer.json\n' +
        '{\n' +
        '  "customizations": {\n' +
        '    "vscode": {\n' +
        '      "extensions": [\n' +
        '        // Linting and formatting\n' +
        '        "dbaeumer.vscode-eslint",\n' +
        '        "esbenp.prettier-vscode",\n' +
        '        "stylelint.vscode-stylelint",\n\n' +
        '        // Language support\n' +
        '        "ms-python.python",\n' +
        '        "golang.go",\n' +
        '        "rust-lang.rust-analyzer",\n\n' +
        '        // Database and API tools\n' +
        '        "prisma.prisma",\n' +
        '        "humao.rest-client",\n\n' +
        '        // Git and collaboration\n' +
        '        "eamodio.gitlens",\n' +
        '        "github.copilot",\n\n' +
        '        // Testing\n' +
        '        "vitest.explorer"\n' +
        '      ],\n' +
        '      "settings": {\n' +
        '        "editor.formatOnSave": true,\n' +
        '        "editor.defaultFormatter": "esbenp.prettier-vscode",\n' +
        '        "editor.tabSize": 2,\n' +
        '        "editor.rulers": [80, 120],\n' +
        '        "typescript.preferences.importModuleSpecifier": "relative",\n' +
        '        "files.trimTrailingWhitespace": true,\n' +
        '        "files.insertFinalNewline": true\n' +
        '      }\n' +
        '    }\n' +
        '  }\n' +
        '}'}</code></pre>

      {/* Lifecycle Commands */}
      <h2 style={h2S}>{t.lifecycleTitle}</h2>
      <p style={pS}>{t.lifecycleDesc}</p>
      <p style={pS}>Understanding the lifecycle order is critical for efficient container setup. Commands that should only run once (like initial dependency installation) belong in postCreateCommand, while commands that should run on every restart (like database migrations) belong in postStartCommand. The object syntax allows running multiple commands in parallel, which speeds up container initialization significantly.</p>
      <pre style={cb}><code>{'{\n' +
        '  // Runs once after the container is first created\n' +
        '  "postCreateCommand": "npm install && npx prisma generate",\n\n' +
        '  // Runs every time the container starts\n' +
        '  "postStartCommand": "npm run db:migrate",\n\n' +
        '  // Runs every time VS Code attaches to the container\n' +
        '  "postAttachCommand": "git fetch --all",\n\n' +
        '  // Runs on rebuild to update dependencies incrementally\n' +
        '  "updateContentCommand": "npm install",\n\n' +
        '  // Parallel commands (object syntax — runs simultaneously):\n' +
        '  "postCreateCommand": {\n' +
        '    "deps": "npm install",\n' +
        '    "db": "npx prisma migrate dev",\n' +
        '    "seed": "npx prisma db seed",\n' +
        '    "codegen": "npm run codegen"\n' +
        '  },\n\n' +
        '  // Runs on HOST before the container is built\n' +
        '  "initializeCommand": "echo Starting dev container setup..."\n' +
        '}\n\n' +
        '// Complete lifecycle order:\n' +
        '// 1. initializeCommand   — runs on HOST before build\n' +
        '// 2. onCreateCommand     — once when container is created\n' +
        '// 3. updateContentCommand — on create and rebuild\n' +
        '// 4. postCreateCommand   — once after container is created\n' +
        '// 5. postStartCommand    — every time container starts\n' +
        '// 6. postAttachCommand   — every time editor attaches'}</code></pre>

      {/* Volumes */}
      <h2 style={h2S}>{t.volumesTitle}</h2>
      <p style={pS}>{t.volumesDesc}</p>
      <pre style={cb}><code>{'{\n  "mounts": [\n' +
        '    "source=myproject-node-modules,target=/workspace/node_modules,type=volume",\n' +
        '    "source=\\${localEnv:HOME}/.ssh,target=/home/node/.ssh,type=bind,readonly",\n' +
        '    "source=\\${localEnv:HOME}/.gitconfig,target=/home/node/.gitconfig,type=bind,readonly",\n' +
        '    "source=\\${localEnv:HOME}/.aws,target=/home/node/.aws,type=bind,readonly",\n' +
        '    "target=/tmp,type=tmpfs"\n  ],\n' +
        '  "workspaceMount": "source=\\${localWorkspaceFolder},target=/workspace,type=bind,consistency=cached",\n' +
        '  "workspaceFolder": "/workspace"\n}'}</code></pre>

      {/* GPU Support */}
      <h2 style={h2S}>{t.gpuTitle}</h2>
      <p style={pS}>{t.gpuDesc}</p>
      <p style={pS}>GPU support is particularly valuable for teams working on machine learning models, computer vision, natural language processing, or any CUDA-accelerated workload. The hostRequirements field with gpu set to optional allows the same devcontainer.json to work on both GPU and non-GPU machines, making it versatile across team members with different hardware.</p>
      <pre style={cb}><code>{'// GPU-enabled dev container for ML/AI development\n' +
        '{\n' +
        '  "image": "mcr.microsoft.com/devcontainers/python:3.12",\n' +
        '  "features": {\n' +
        '    "ghcr.io/devcontainers/features/nvidia-cuda:1": {\n' +
        '      "installCudnn": true,\n' +
        '      "cudaVersion": "12.4",\n' +
        '      "cudnnVersion": "9"\n' +
        '    },\n' +
        '    "ghcr.io/devcontainers/features/python:1": { "version": "3.12" }\n' +
        '  },\n' +
        '  "runArgs": [\n' +
        '    "--gpus", "all"              // Pass all GPUs to container\n' +
        '    // "--gpus", "device=0"      // Or pass a specific GPU\n' +
        '  ],\n' +
        '  "hostRequirements": {\n' +
        '    "gpu": "optional"            // Works without GPU too\n' +
        '  },\n' +
        '  "postCreateCommand": "pip install torch torchvision transformers datasets",\n' +
        '  "customizations": {\n' +
        '    "vscode": {\n' +
        '      "extensions": [\n' +
        '        "ms-python.python",\n' +
        '        "ms-toolsai.jupyter",\n' +
        '        "ms-toolsai.vscode-jupyter-slideshow"\n' +
        '      ]\n' +
        '    }\n' +
        '  }\n' +
        '}\n\n' +
        '// Host prerequisites:\n' +
        '// 1. NVIDIA driver installed on the host machine\n' +
        '// 2. Install NVIDIA Container Toolkit:\n' +
        '//    sudo apt install nvidia-container-toolkit\n' +
        '//    sudo systemctl restart docker\n' +
        '// 3. Verify setup:\n' +
        '//    docker run --gpus all nvidia/cuda:12.4-base nvidia-smi'}</code></pre>

      {/* Multi-Root */}
      <h2 style={h2S}>{t.multiRootTitle}</h2>
      <p style={pS}>{t.multiRootDesc}</p>
      <pre style={cb}><code>{'{\n  "name": "Microservices Dev",\n' +
        '  "dockerComposeFile": "docker-compose.yml",\n  "service": "workspace",\n' +
        '  "workspaceFolder": "/workspaces",\n' +
        '  "postCreateCommand": {\n' +
        '    "frontend": "cd /workspaces && git clone https://github.com/org/frontend.git",\n' +
        '    "backend": "cd /workspaces && git clone https://github.com/org/backend-api.git"\n  }\n}\n\n' +
        '// Or use workspace file .devcontainer/workspace.code-workspace:\n' +
        '// { "folders": [\n' +
        '//   { "path": "/workspaces/frontend", "name": "Frontend" },\n' +
        '//   { "path": "/workspaces/backend-api", "name": "Backend" }\n// ]}'}</code></pre>

      {/* Templates */}
      <h2 style={h2S}>{t.templatesTitle}</h2>
      <p style={pS}>{t.templatesDesc}</p>
      <pre style={cb}><code>{'# Install devcontainer CLI\nnpm install -g @devcontainers/cli\n\n' +
        '# Apply a template:\ndevcontainer templates apply \\\n' +
        '  --template-id ghcr.io/devcontainers/templates/typescript-node\n\n' +
        '# Or via VS Code: Dev Containers: Add Dev Container Configuration Files...\n\n' +
        '# Community Features (add to "features" in devcontainer.json):\n' +
        '# ghcr.io/devcontainers-contrib/features/bun:1\n' +
        '# ghcr.io/devcontainers-contrib/features/pnpm:2\n' +
        '# ghcr.io/devcontainers-contrib/features/turbo-cli:1\n' +
        '# ghcr.io/devcontainers-contrib/features/act:1        (GitHub Actions local)\n' +
        '# ghcr.io/devcontainers-contrib/features/mkcert:1     (local HTTPS)'}</code></pre>

      {/* JetBrains */}
      <h2 style={h2S}>{t.jetbrainsTitle}</h2>
      <p style={pS}>{t.jetbrainsDesc}</p>
      <pre style={cb}><code>{'{\n  "customizations": {\n    "jetbrains": {\n      "backend": {\n' +
        '        "productCode": "IU",        // IntelliJ IDEA Ultimate\n' +
        '        // "PS" PhpStorm, "WS" WebStorm, "PY" PyCharm, "GO" GoLand, "CL" CLion\n' +
        '        "plugins": ["org.jetbrains.plugins.go", "com.intellij.database"]\n' +
        '      }\n    },\n    "vscode": { "extensions": ["dbaeumer.vscode-eslint"] }\n  }\n}\n\n' +
        '// Steps: Install JetBrains Gateway > Select "Dev Containers"\n' +
        '// > Choose project > Gateway builds container and connects IDE'}</code></pre>

      {/* Performance */}
      <h2 style={h2S}>{t.perfTitle}</h2>
      <p style={pS}>{t.perfDesc}</p>
      <ul style={ulS}>{t.perfTips.map((item, i) => <li key={i} style={liS}>{item}</li>)}</ul>
      <pre style={cb}><code>{'// Performance-optimized devcontainer.json\n{\n' +
        '  "image": "mcr.microsoft.com/devcontainers/typescript-node:20",\n' +
        '  "mounts": ["source=proj-nm,target=/workspace/node_modules,type=volume"],\n' +
        '  "workspaceMount": "source=\\${localWorkspaceFolder},target=/workspace,type=bind,consistency=cached",\n' +
        '  "workspaceFolder": "/workspace",\n' +
        '  "cacheFrom": "ghcr.io/myorg/devcontainer-cache:latest",\n' +
        '  "updateContentCommand": "npm install",\n' +
        '  "runArgs": ["--memory=8g", "--cpus=4"],\n' +
        '  "hostRequirements": { "cpus": 4, "memory": "8gb", "storage": "32gb" }\n}'}</code></pre>

      {/* Team Onboarding */}
      <h2 style={h2S}>{t.onboardTitle}</h2>
      <p style={pS}>{t.onboardDesc}</p>
      <p style={pS}>The traditional onboarding process involves installing the correct versions of multiple language runtimes, setting up databases, configuring environment variables, installing editor plugins, and troubleshooting platform-specific issues. With Dev Containers, all of this is encoded in the repository. The onboarding documentation reduces from pages of instructions to a single step: open the project in VS Code and accept the container prompt.</p>
      <pre style={cb}><code>{'# Option A: Local development (VS Code)\n' +
        '# 1. Install Docker Desktop and VS Code\n' +
        '# 2. Install Dev Containers extension\n' +
        '# 3. Clone the repository and open in VS Code:\n' +
        'git clone https://github.com/myorg/myproject.git\n' +
        'code myproject\n' +
        '# 4. Click "Reopen in Container" when prompted\n' +
        '# 5. Done — full environment ready in 2-5 minutes\n\n' +
        '# Option B: Cloud development (GitHub Codespaces)\n' +
        '# 1. Go to github.com/myorg/myproject\n' +
        '# 2. Click Code > Codespaces > Create codespace\n' +
        '# 3. Done — browser-based VS Code, zero local install needed\n\n' +
        '# What devcontainer.json provides automatically:\n' +
        '# - Correct Node.js / Python / Go / Rust version\n' +
        '# - All required VS Code extensions pre-installed\n' +
        '# - Database (PostgreSQL) running and seeded\n' +
        '# - Redis cache running\n' +
        '# - Environment variables configured\n' +
        '# - Git hooks and linters configured\n' +
        '# - All dependencies installed (npm/pip/cargo)\n' +
        '# - Ports forwarded for local testing\n' +
        '# - Shared editor settings (formatting, tab size, rulers)'}</code></pre>

      {/* CI/CD */}
      <h2 style={h2S}>{t.cicdTitle}</h2>
      <p style={pS}>{t.cicdDesc}</p>
      <p style={pS}>The devcontainers/ci GitHub Action handles building the dev container image, starting the container, running your commands inside it, and optionally pushing the built image to a container registry for caching. This means your CI pipeline uses the exact same Node.js version, Python packages, system libraries, and tooling that developers use locally. No more debugging CI-only failures caused by environment differences.</p>
      <pre style={cb}><code>{'# .github/workflows/ci.yml — Dev Container CI/CD\n' +
        'name: CI\n' +
        'on:\n' +
        '  push:\n' +
        '    branches: [main]\n' +
        '  pull_request:\n' +
        '    branches: [main]\n\n' +
        'jobs:\n' +
        '  build-and-test:\n' +
        '    runs-on: ubuntu-latest\n' +
        '    steps:\n' +
        '      - uses: actions/checkout@v4\n\n' +
        '      - name: Build and run dev container\n' +
        '        uses: devcontainers/ci@v0.3\n' +
        '        with:\n' +
        '          # Run all checks inside the dev container\n' +
        '          runCmd: |\n' +
        '            npm run lint\n' +
        '            npm run type-check\n' +
        '            npm run test\n' +
        '            npm run build\n\n' +
        '          # Cache the built image in a container registry\n' +
        '          imageName: ghcr.io/myorg/devcontainer-cache\n' +
        '          cacheFrom: ghcr.io/myorg/devcontainer-cache\n' +
        '          push: filter\n' +
        '          refFilterForPush: refs/heads/main\n\n' +
        '# Standalone CLI usage (local or any CI system):\n' +
        '# npm install -g @devcontainers/cli\n' +
        '# devcontainer build --workspace-folder .\n' +
        '# devcontainer up --workspace-folder .\n' +
        '# devcontainer exec --workspace-folder . npm test\n' +
        '# devcontainer exec --workspace-folder . npm run build'}</code></pre>

      {/* Security */}
      <h2 style={h2S}>{t.secTitle}</h2>
      <p style={pS}>{t.secDesc}</p>
      <ul style={ulS}>{t.secTips.map((item, i) => <li key={i} style={liS}>{item}</li>)}</ul>

      {/* Language Patterns */}
      <h2 style={h2S}>{t.patternsTitle}</h2>
      <p style={pS}>{t.patternsDesc}</p>
      <h3 style={h3S}>Node.js / TypeScript</h3>
      <pre style={cb}><code>{'{\n  "image": "mcr.microsoft.com/devcontainers/typescript-node:20",\n' +
        '  "features": { "ghcr.io/devcontainers-contrib/features/pnpm:2": {} },\n' +
        '  "forwardPorts": [3000, 5173],\n  "postCreateCommand": "pnpm install",\n' +
        '  "mounts": ["source=nm,target=/workspace/node_modules,type=volume"],\n' +
        '  "customizations": { "vscode": {\n    "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]\n  }}\n}'}</code></pre>
      <h3 style={h3S}>Python</h3>
      <pre style={cb}><code>{'{\n  "image": "mcr.microsoft.com/devcontainers/python:3.12",\n' +
        '  "forwardPorts": [8000],\n  "postCreateCommand": "pip install -r requirements.txt",\n' +
        '  "customizations": { "vscode": {\n' +
        '    "extensions": ["ms-python.python", "charliermarsh.ruff"],\n' +
        '    "settings": { "python.defaultInterpreterPath": "/usr/local/bin/python" }\n  }}\n}'}</code></pre>
      <h3 style={h3S}>Go</h3>
      <pre style={cb}><code>{'{\n  "image": "mcr.microsoft.com/devcontainers/go:1.22",\n' +
        '  "features": { "ghcr.io/devcontainers/features/docker-in-docker:2": {} },\n' +
        '  "forwardPorts": [8080],\n  "postCreateCommand": "go mod download",\n' +
        '  "mounts": ["source=gomod,target=/go/pkg/mod,type=volume"],\n' +
        '  "customizations": { "vscode": { "extensions": ["golang.go"] }}\n}'}</code></pre>
      <h3 style={h3S}>Rust</h3>
      <pre style={cb}><code>{'{\n  "image": "mcr.microsoft.com/devcontainers/rust:1",\n' +
        '  "forwardPorts": [8080],\n  "postCreateCommand": "cargo build",\n' +
        '  "mounts": [\n    "source=cargo-reg,target=/usr/local/cargo/registry,type=volume",\n' +
        '    "source=cargo-target,target=/workspace/target,type=volume"\n  ],\n' +
        '  "customizations": { "vscode": {\n' +
        '    "extensions": ["rust-lang.rust-analyzer", "vadimcn.vscode-lldb"],\n' +
        '    "settings": { "rust-analyzer.checkOnSave.command": "clippy" }\n  }}\n}'}</code></pre>
      <h3 style={h3S}>Java</h3>
      <pre style={cb}><code>{'{\n  "image": "mcr.microsoft.com/devcontainers/java:21",\n' +
        '  "features": { "ghcr.io/devcontainers/features/java:1": {\n' +
        '    "version": "21", "installMaven": true, "installGradle": true } },\n' +
        '  "forwardPorts": [8080, 5005],\n  "postCreateCommand": "./mvnw dependency:resolve",\n' +
        '  "mounts": ["source=m2,target=/home/vscode/.m2/repository,type=volume"],\n' +
        '  "customizations": { "vscode": {\n' +
        '    "extensions": ["vscjava.vscode-java-pack", "vmware.vscode-spring-boot"]\n  }}\n}'}</code></pre>

      {/* Troubleshooting */}
      <h2 style={h2S}>{t.troubleTitle}</h2>
      <p style={pS}>{t.troubleDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tblS}>
          <thead><tr><th style={thS}>Issue</th><th style={thS}>Cause</th><th style={thS}>Solution</th></tr></thead>
          <tbody>
            <tr><td style={tdS}>Container fails to build</td><td style={tdS}>Dockerfile error or missing image</td><td style={tdS}>Check Container Log via Command Palette. Verify image name.</td></tr>
            <tr><td style={tdS}>Slow file I/O on macOS</td><td style={tdS}>Bind mounts through Linux VM</td><td style={tdS}>Use named volumes for node_modules. Set consistency: cached.</td></tr>
            <tr><td style={tdS}>Port already in use</td><td style={tdS}>Host port conflict</td><td style={tdS}>Stop conflicting service or change port in devcontainer.json.</td></tr>
            <tr><td style={tdS}>Extensions not installing</td><td style={tdS}>Platform/architecture mismatch</td><td style={tdS}>Check extension supports Linux containers.</td></tr>
            <tr><td style={tdS}>Git SSH auth fails</td><td style={tdS}>SSH agent not forwarded</td><td style={tdS}>Run ssh-add on host. VS Code forwards agent automatically.</td></tr>
            <tr><td style={tdS}>Out of disk space</td><td style={tdS}>Docker images and cache</td><td style={tdS}>Run docker system prune. Increase Docker disk allocation.</td></tr>
            <tr><td style={tdS}>Features fail to install</td><td style={tdS}>Network issues or version conflict</td><td style={tdS}>Check connectivity. Pin Feature versions.</td></tr>
            <tr><td style={tdS}>Container keeps restarting</td><td style={tdS}>postStartCommand exits with error</td><td style={tdS}>Check terminal output. Use background execution for long commands.</td></tr>
          </tbody>
        </table>
      </div>
      <pre style={cb}><code>{'# Common troubleshooting commands:\n\n' +
        '# View dev container build logs\n' +
        '# VS Code: Command Palette > Dev Containers: Show Container Log\n\n' +
        '# List running dev containers\n' +
        'docker ps --filter "label=devcontainer.local_folder"\n\n' +
        '# Inspect container configuration\n' +
        'docker inspect <container-id> | jq ".[0].Config"\n\n' +
        '# Check Docker resource usage\n' +
        'docker system df\n\n' +
        '# Clean up unused images, containers, and volumes\n' +
        'docker system prune -a --volumes\n\n' +
        '# Force rebuild without cache\n' +
        '# VS Code: Command Palette > Dev Containers: Rebuild Without Cache\n\n' +
        '# Test devcontainer.json validity with CLI:\n' +
        'npm install -g @devcontainers/cli\n' +
        'devcontainer build --workspace-folder .\n' +
        'devcontainer up --workspace-folder .\n\n' +
        '# Check container logs for errors:\n' +
        'docker logs <container-id> --tail 100\n\n' +
        '# Enter the container manually for debugging:\n' +
        'docker exec -it <container-id> /bin/bash'}</code></pre>

      {/* FAQ */}
      <h2 style={h2S}>{t.faqTitle}</h2>
      {[
        { q: t.faq1Q, a: t.faq1A }, { q: t.faq2Q, a: t.faq2A },
        { q: t.faq3Q, a: t.faq3A }, { q: t.faq4Q, a: t.faq4A },
        { q: t.faq5Q, a: t.faq5A }, { q: t.faq6Q, a: t.faq6A },
        { q: t.faq7Q, a: t.faq7A }, { q: t.faq8Q, a: t.faq8A },
      ].map((faq, i) => (
        <div key={i} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{faq.q}</h3>
          <p style={{ lineHeight: '1.75', margin: 0 }}>{faq.a}</p>
        </div>
      ))}

      {/* Conclusion */}
      <h2 style={h2S}>{t.conclusionTitle}</h2>
      <p style={pS}>{t.conclusionDesc}</p>
      <h3 style={h3S}>Getting Started Checklist</h3>
      <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={liS}>Install Docker Desktop and VS Code with the Dev Containers extension</li>
        <li style={liS}>Create a .devcontainer folder in your repository root</li>
        <li style={liS}>Add a devcontainer.json with a pre-built image matching your language</li>
        <li style={liS}>Add Features for additional tools (Docker-in-Docker, AWS CLI, database clients)</li>
        <li style={liS}>Configure VS Code extensions and settings in the customizations block</li>
        <li style={liS}>Set up lifecycle commands for dependency installation and service startup</li>
        <li style={liS}>Add Docker Compose if you need databases or other services</li>
        <li style={liS}>Use named volumes for dependency directories to improve macOS performance</li>
        <li style={liS}>Configure GitHub Codespaces prebuilds for instant cloud environments</li>
        <li style={liS}>Set up CI/CD with the devcontainer CLI or GitHub Actions integration</li>
      </ol>
      <p style={pS}>For additional resources, visit the official Dev Container specification at containers.dev, explore the pre-built images and Features at github.com/devcontainers, and check the VS Code remote development documentation. The ecosystem is growing rapidly with community Features and Templates covering nearly every development scenario.</p>
    </article>
  );
}
