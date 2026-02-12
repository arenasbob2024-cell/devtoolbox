'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Dockerfile Best Practices & Multi-Stage Builds',
    intro: 'A well-written Dockerfile is the foundation of efficient, secure, and reproducible container images. This comprehensive guide covers <strong>Dockerfile best practices</strong> — from basic instruction syntax and layer caching to multi-stage builds, security hardening, and production-ready examples for Node.js, Python, Go, and Java.',
    relatedTool: 'Generate docker-compose.yml for your Dockerized apps',

    h2_basics: 'Dockerfile Basics',
    basics_desc: 'A Dockerfile is a text file containing instructions that Docker reads to build an image. Each instruction creates a new layer in the image. Here are the most important instructions:',
    h3_from: 'FROM — Base Image',
    from_desc: 'Every Dockerfile starts with FROM. It sets the base image for subsequent instructions.',
    h3_run: 'RUN — Execute Commands',
    run_desc: 'RUN executes commands during the image build process. Each RUN creates a new layer.',
    h3_copy: 'COPY — Copy Files',
    copy_desc: 'COPY transfers files and directories from the build context into the image.',
    h3_cmd: 'CMD — Default Command',
    cmd_desc: 'CMD sets the default command that runs when a container starts. Only the last CMD takes effect.',
    h3_entrypoint: 'ENTRYPOINT — Fixed Command',
    entrypoint_desc: 'ENTRYPOINT sets a command that always runs. CMD arguments are appended to ENTRYPOINT.',
    h3_workdir: 'WORKDIR — Working Directory',
    workdir_desc: 'WORKDIR sets the working directory for RUN, CMD, ENTRYPOINT, COPY, and ADD instructions.',
    h3_expose: 'EXPOSE — Document Ports',
    expose_desc: 'EXPOSE documents which ports the container listens on. It does not actually publish the port.',

    h2_caching: 'Layer Caching — Order Matters',
    caching_desc: 'Docker caches each layer. If a layer has not changed, Docker reuses the cached version. This means <strong>the order of instructions dramatically affects build speed</strong>. Put instructions that change less frequently at the top.',
    caching_rule: 'Golden rule: Copy dependency files first, install dependencies, then copy source code. This way, dependency installation is cached unless package files change.',
    h3_bad_cache: 'Bad — Cache busted on every code change',
    h3_good_cache: 'Good — Dependencies cached separately',
    caching_tip: 'With this structure, changing your source code does not trigger a reinstall of all dependencies. Only the final COPY layer and beyond are rebuilt.',

    h2_multistage: 'Multi-Stage Builds',
    multistage_desc: 'Multi-stage builds let you use multiple FROM statements in a single Dockerfile. Each FROM starts a new build stage. You can copy artifacts from one stage to another, leaving behind everything you do not need in the final image.',
    multistage_benefits: 'Benefits: smaller final images, no build tools in production, better security, cleaner separation of concerns.',
    h3_node_multistage: 'Node.js Multi-Stage Example',
    node_multistage_desc: 'Build stage compiles TypeScript, production stage runs only the compiled JavaScript:',
    h3_size_comparison: 'Size Comparison',
    size_header_approach: 'Approach',
    size_header_size: 'Image Size',
    size_single: 'Single stage (node:20)',
    size_single_alpine: 'Single stage (node:20-alpine)',
    size_multi: 'Multi-stage (build + alpine)',
    size_distroless: 'Multi-stage (distroless)',

    h2_dockerignore: '.dockerignore',
    dockerignore_desc: 'The .dockerignore file excludes files from the build context, reducing build time and preventing sensitive files from being included in images.',
    dockerignore_why: 'Without .dockerignore, Docker sends every file in your project to the daemon — including node_modules, .git history, .env secrets, and build artifacts.',

    h2_base_image: 'Base Image Selection',
    base_desc: 'Choosing the right base image affects image size, security, and compatibility. Here is a comparison of common base image variants:',
    base_header_variant: 'Variant',
    base_header_size: 'Size',
    base_header_packages: 'Packages',
    base_header_usecase: 'Use Case',
    base_full: 'Full Debian, all common packages',
    base_slim: 'Minimal Debian, essential packages',
    base_alpine: 'Musl libc, BusyBox — smallest',
    base_distroless: 'No shell, no package manager',
    base_full_use: 'Development, debugging',
    base_slim_use: 'Production (good balance)',
    base_alpine_use: 'Production (smallest size)',
    base_distroless_use: 'Production (maximum security)',
    base_recommendation: 'Recommendation: Start with alpine or slim for most applications. Use distroless for maximum security when you do not need shell access for debugging.',

    h2_security: 'Security Best Practices',
    security_desc: 'Container security starts with the Dockerfile. Follow these practices to minimize the attack surface.',
    h3_nonroot: 'Run as Non-Root User',
    nonroot_desc: 'By default, containers run as root. Always create and switch to a non-root user:',
    h3_no_secrets: 'Never Put Secrets in Build Args',
    no_secrets_desc: 'Build args are visible in the image history. Use runtime environment variables or Docker secrets instead.',
    h3_scan: 'Scan Images for Vulnerabilities',
    scan_desc: 'Use tools like Trivy, Snyk, or Docker Scout to scan your images:',

    h2_run_optimization: 'RUN Optimization',
    run_opt_desc: 'Each RUN instruction creates a new layer. Combine commands and clean up in the same layer to reduce image size.',
    h3_combine_run: 'Combine RUN Commands',
    combine_desc: 'Combine related commands with && and clean up package manager caches:',
    h3_bad_run: 'Bad — 3 layers, cache remains',
    h3_good_run: 'Good — 1 layer, cache cleaned',

    h2_copy_vs_add: 'COPY vs ADD',
    copy_add_desc: 'Both COPY and ADD transfer files into the image, but they behave differently:',
    copy_add_header_instruction: 'Instruction',
    copy_add_header_behavior: 'Behavior',
    copy_add_header_when: 'When to Use',
    copy_behavior: 'Simple file/directory copy',
    add_behavior: 'Copy + URL download + tar extraction',
    copy_when: 'Default choice — use for most cases',
    add_when: 'Only when you need tar auto-extraction',
    copy_add_recommendation: 'Best practice: Always use COPY unless you specifically need ADD\'s tar extraction feature. For downloading files, use RUN with curl or wget instead — this gives you better control over caching and error handling.',

    h2_healthcheck: 'HEALTHCHECK',
    healthcheck_desc: 'HEALTHCHECK tells Docker how to test whether the container is still working. Docker uses this to determine if the container needs to be restarted.',
    h3_http_health: 'HTTP Health Check',
    h3_health_options: 'Options Explained',
    health_interval: 'interval — Time between checks (default: 30s)',
    health_timeout: 'timeout — Maximum time to wait for a check (default: 30s)',
    health_retries: 'retries — Consecutive failures before marking unhealthy (default: 3)',
    health_start: 'start_period — Grace period for container startup (default: 0s)',

    h2_arg_vs_env: 'ARG vs ENV',
    arg_env_desc: 'ARG and ENV both define variables, but they are available at different times and have different lifetimes:',
    arg_env_header_feature: 'Feature',
    arg_env_header_arg: 'ARG',
    arg_env_header_env: 'ENV',
    arg_env_available: 'Available',
    arg_env_arg_available: 'Build time only',
    arg_env_env_available: 'Build time + runtime',
    arg_env_in_image: 'In final image',
    arg_env_arg_in_image: 'No',
    arg_env_env_in_image: 'Yes',
    arg_env_override: 'Override',
    arg_env_arg_override: '--build-arg flag',
    arg_env_env_override: '-e flag or .env file',
    arg_env_default: 'Default value',
    arg_env_arg_default: 'ARG NAME=default',
    arg_env_env_default: 'ENV NAME=default',

    h2_examples: 'Real-World Multi-Stage Dockerfiles',
    h3_nodejs_example: 'Node.js (Express/NestJS)',
    h3_python_example: 'Python (FastAPI/Django)',
    h3_go_example: 'Go (Gin/Fiber)',
    h3_java_example: 'Java (Spring Boot)',
    go_note: 'Go compiles to a single static binary, making it perfect for distroless or scratch base images. The final image is typically under 20MB.',
    java_note: 'For Java, the JRE base image is required at runtime. Using jlink to create a custom JRE can reduce the image size further.',

    h2_faq: 'Frequently Asked Questions',
    faq1q: 'What is a multi-stage Docker build?',
    faq1a: 'A multi-stage build uses multiple FROM statements in a single Dockerfile. Each FROM starts a new stage. You can selectively copy artifacts from one stage to another, leaving behind build tools, source code, and dependencies that are not needed at runtime. This results in much smaller, more secure production images.',
    faq2q: 'How do I reduce Docker image size?',
    faq2a: 'Use multi-stage builds to separate build and runtime environments. Choose smaller base images (alpine, slim, or distroless). Combine RUN commands and clean up caches in the same layer. Use .dockerignore to exclude unnecessary files. Remove development dependencies from the final image.',
    faq3q: 'Should I use Alpine or Debian slim as a base image?',
    faq3a: 'Alpine is smaller (about 5MB vs 80MB for slim) and has a smaller attack surface. However, Alpine uses musl libc instead of glibc, which can cause compatibility issues with some native Node.js modules or Python packages. If you encounter issues, switch to slim. For Go, Alpine works perfectly since Go compiles to static binaries.',
    faq4q: 'Why should I not run containers as root?',
    faq4a: 'Running as root inside a container means that if an attacker exploits a vulnerability, they have root privileges within the container. Combined with a container escape vulnerability, this could give them root access to the host. Running as a non-root user limits the damage of any exploit.',
    faq5q: 'What is the difference between CMD and ENTRYPOINT?',
    faq5a: 'CMD sets a default command that can be overridden when running the container (docker run myimage /bin/sh replaces CMD). ENTRYPOINT sets a fixed command that always runs — arguments passed to docker run are appended to ENTRYPOINT. Use ENTRYPOINT when the container should always run a specific executable, and CMD for default arguments that users might override.',
  },
  zh: {
    title: 'Dockerfile 最佳实践与多阶段构建',
    intro: '一份写得好的 Dockerfile 是高效、安全且可重复构建容器镜像的基础。本指南全面介绍 <strong>Dockerfile 最佳实践</strong>——从基础指令语法、层缓存到多阶段构建、安全加固，以及 Node.js、Python、Go 和 Java 的生产级示例。',
    relatedTool: '为你的 Docker 化应用生成 docker-compose.yml',

    h2_basics: 'Dockerfile 基础',
    basics_desc: 'Dockerfile 是一个包含指令的文本文件，Docker 读取它来构建镜像。每条指令会在镜像中创建一个新层。以下是最重要的指令：',
    h3_from: 'FROM — 基础镜像',
    from_desc: '每个 Dockerfile 都以 FROM 开头，它设置后续指令的基础镜像。',
    h3_run: 'RUN — 执行命令',
    run_desc: 'RUN 在镜像构建过程中执行命令，每个 RUN 都会创建一个新层。',
    h3_copy: 'COPY — 复制文件',
    copy_desc: 'COPY 将文件和目录从构建上下文传输到镜像中。',
    h3_cmd: 'CMD — 默认命令',
    cmd_desc: 'CMD 设置容器启动时运行的默认命令。只有最后一个 CMD 生效。',
    h3_entrypoint: 'ENTRYPOINT — 固定命令',
    entrypoint_desc: 'ENTRYPOINT 设置一个始终运行的命令。CMD 的参数会追加到 ENTRYPOINT 后面。',
    h3_workdir: 'WORKDIR — 工作目录',
    workdir_desc: 'WORKDIR 为 RUN、CMD、ENTRYPOINT、COPY 和 ADD 指令设置工作目录。',
    h3_expose: 'EXPOSE — 声明端口',
    expose_desc: 'EXPOSE 声明容器监听的端口。它实际上并不发布端口。',

    h2_caching: '层缓存——顺序很重要',
    caching_desc: 'Docker 会缓存每一层。如果某层没有变化，Docker 会重用缓存版本。这意味着<strong>指令的顺序会极大地影响构建速度</strong>。将不常变化的指令放在前面。',
    caching_rule: '黄金规则：先复制依赖文件，再安装依赖，最后复制源代码。这样，除非包文件发生变化，依赖安装都会被缓存。',
    h3_bad_cache: '错误示例——每次代码变更都会破坏缓存',
    h3_good_cache: '正确示例——依赖单独缓存',
    caching_tip: '使用这种结构，修改源代码不会触发所有依赖的重新安装。只有最后的 COPY 层及后续层会被重新构建。',

    h2_multistage: '多阶段构建',
    multistage_desc: '多阶段构建允许在单个 Dockerfile 中使用多个 FROM 语句。每个 FROM 开始一个新的构建阶段。你可以将制品从一个阶段复制到另一个阶段，在最终镜像中省去不需要的内容。',
    multistage_benefits: '优点：更小的最终镜像、生产环境无构建工具、更好的安全性、更清晰的关注点分离。',
    h3_node_multistage: 'Node.js 多阶段示例',
    node_multistage_desc: '构建阶段编译 TypeScript，生产阶段只运行编译后的 JavaScript：',
    h3_size_comparison: '镜像大小对比',
    size_header_approach: '方案',
    size_header_size: '镜像大小',
    size_single: '单阶段 (node:20)',
    size_single_alpine: '单阶段 (node:20-alpine)',
    size_multi: '多阶段 (构建 + alpine)',
    size_distroless: '多阶段 (distroless)',

    h2_dockerignore: '.dockerignore',
    dockerignore_desc: '.dockerignore 文件将文件排除在构建上下文之外，减少构建时间并防止敏感文件被包含在镜像中。',
    dockerignore_why: '没有 .dockerignore，Docker 会将项目中的所有文件发送到守护进程——包括 node_modules、.git 历史、.env 密钥和构建产物。',

    h2_base_image: '基础镜像选择',
    base_desc: '选择合适的基础镜像会影响镜像大小、安全性和兼容性。以下是常见基础镜像变体的对比：',
    base_header_variant: '变体',
    base_header_size: '大小',
    base_header_packages: '软件包',
    base_header_usecase: '使用场景',
    base_full: '完整 Debian，所有常用软件包',
    base_slim: '最小 Debian，基础软件包',
    base_alpine: 'Musl libc，BusyBox——最小',
    base_distroless: '无 shell，无包管理器',
    base_full_use: '开发、调试',
    base_slim_use: '生产（良好平衡）',
    base_alpine_use: '生产（最小体积）',
    base_distroless_use: '生产（最高安全性）',
    base_recommendation: '建议：大多数应用使用 alpine 或 slim。当不需要 shell 调试时，使用 distroless 获得最高安全性。',

    h2_security: '安全最佳实践',
    security_desc: '容器安全从 Dockerfile 开始。遵循以下实践来最小化攻击面。',
    h3_nonroot: '以非 root 用户运行',
    nonroot_desc: '默认情况下，容器以 root 身份运行。始终创建并切换到非 root 用户：',
    h3_no_secrets: '永远不要在构建参数中放置密钥',
    no_secrets_desc: '构建参数在镜像历史中可见。请使用运行时环境变量或 Docker secrets。',
    h3_scan: '扫描镜像漏洞',
    scan_desc: '使用 Trivy、Snyk 或 Docker Scout 等工具扫描镜像：',

    h2_run_optimization: 'RUN 优化',
    run_opt_desc: '每条 RUN 指令都会创建一个新层。在同一层中合并命令并清理，可以减小镜像大小。',
    h3_combine_run: '合并 RUN 命令',
    combine_desc: '使用 && 合并相关命令，并清理包管理器缓存：',
    h3_bad_run: '不好——3 层，缓存残留',
    h3_good_run: '好——1 层，缓存已清理',

    h2_copy_vs_add: 'COPY 与 ADD 对比',
    copy_add_desc: 'COPY 和 ADD 都可以将文件传输到镜像中，但行为不同：',
    copy_add_header_instruction: '指令',
    copy_add_header_behavior: '行为',
    copy_add_header_when: '使用场景',
    copy_behavior: '简单的文件/目录复制',
    add_behavior: '复制 + URL 下载 + tar 解压',
    copy_when: '默认选择——大多数情况使用',
    add_when: '仅在需要 tar 自动解压时使用',
    copy_add_recommendation: '最佳实践：始终使用 COPY，除非你特别需要 ADD 的 tar 解压功能。下载文件时，使用 RUN 配合 curl 或 wget——这样可以更好地控制缓存和错误处理。',

    h2_healthcheck: 'HEALTHCHECK 健康检查',
    healthcheck_desc: 'HEALTHCHECK 告诉 Docker 如何测试容器是否仍在正常工作。Docker 使用这个信息来判断容器是否需要重启。',
    h3_http_health: 'HTTP 健康检查',
    h3_health_options: '选项说明',
    health_interval: 'interval — 检查间隔（默认：30s）',
    health_timeout: 'timeout — 检查最大等待时间（默认：30s）',
    health_retries: 'retries — 标记为不健康前的连续失败次数（默认：3）',
    health_start: 'start_period — 容器启动的宽限期（默认：0s）',

    h2_arg_vs_env: 'ARG 与 ENV 对比',
    arg_env_desc: 'ARG 和 ENV 都定义变量，但它们在不同时间可用，生命周期也不同：',
    arg_env_header_feature: '特性',
    arg_env_header_arg: 'ARG',
    arg_env_header_env: 'ENV',
    arg_env_available: '可用时间',
    arg_env_arg_available: '仅构建时',
    arg_env_env_available: '构建时 + 运行时',
    arg_env_in_image: '在最终镜像中',
    arg_env_arg_in_image: '否',
    arg_env_env_in_image: '是',
    arg_env_override: '覆盖方式',
    arg_env_arg_override: '--build-arg 标志',
    arg_env_env_override: '-e 标志或 .env 文件',
    arg_env_default: '默认值',
    arg_env_arg_default: 'ARG NAME=default',
    arg_env_env_default: 'ENV NAME=default',

    h2_examples: '真实多阶段 Dockerfile 示例',
    h3_nodejs_example: 'Node.js (Express/NestJS)',
    h3_python_example: 'Python (FastAPI/Django)',
    h3_go_example: 'Go (Gin/Fiber)',
    h3_java_example: 'Java (Spring Boot)',
    go_note: 'Go 编译为单个静态二进制文件，非常适合 distroless 或 scratch 基础镜像。最终镜像通常不到 20MB。',
    java_note: '对于 Java，运行时需要 JRE 基础镜像。使用 jlink 创建自定义 JRE 可以进一步减小镜像大小。',

    h2_faq: '常见问题',
    faq1q: '什么是多阶段 Docker 构建？',
    faq1a: '多阶段构建在单个 Dockerfile 中使用多个 FROM 语句。每个 FROM 开始一个新阶段。你可以有选择地将制品从一个阶段复制到另一个阶段，在最终镜像中省去构建工具、源代码和运行时不需要的依赖。这样可以生成更小、更安全的生产镜像。',
    faq2q: '如何减小 Docker 镜像大小？',
    faq2a: '使用多阶段构建分离构建和运行时环境。选择更小的基础镜像（alpine、slim 或 distroless）。在同一层中合并 RUN 命令并清理缓存。使用 .dockerignore 排除不必要的文件。从最终镜像中移除开发依赖。',
    faq3q: '基础镜像应该选 Alpine 还是 Debian slim？',
    faq3a: 'Alpine 更小（约 5MB，而 slim 约 80MB），攻击面也更小。但 Alpine 使用 musl libc 而非 glibc，可能导致某些原生 Node.js 模块或 Python 包出现兼容性问题。遇到问题时可以切换到 slim。对于 Go，Alpine 完美适用，因为 Go 编译为静态二进制文件。',
    faq4q: '为什么不应该以 root 身份运行容器？',
    faq4a: '在容器内以 root 运行意味着如果攻击者利用了漏洞，他们在容器内拥有 root 权限。结合容器逃逸漏洞，这可能让他们获得主机的 root 访问权。以非 root 用户运行可以限制任何漏洞利用的损害。',
    faq5q: 'CMD 和 ENTRYPOINT 有什么区别？',
    faq5a: 'CMD 设置可以在运行容器时被覆盖的默认命令（docker run myimage /bin/sh 会替换 CMD）。ENTRYPOINT 设置一个始终运行的固定命令——传递给 docker run 的参数会追加到 ENTRYPOINT 后面。当容器应该始终运行特定可执行文件时使用 ENTRYPOINT，CMD 用于用户可能覆盖的默认参数。',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' };

export default function DockerfileBestPracticesMultiStage({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: t.intro }} />

      <p style={{ marginTop: 16 }}>
        <Link href={`/${lang}/tools/docker-compose-generator`} style={{ fontWeight: 600 }}>
          {t.relatedTool} &rarr;
        </Link>
      </p>

      {/* ===== 1. Dockerfile Basics ===== */}
      <h2 style={h2Style}>{t.h2_basics}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.basics_desc}</p>

      <h3 style={h3Style}>{t.h3_from}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.from_desc}</p>
      <pre style={codeStyle}><code>{`# Use an official base image
FROM node:20-alpine

# Use a specific digest for reproducibility
FROM node:20-alpine@sha256:abcdef...

# Use a version alias
FROM python:3.12-slim`}</code></pre>

      <h3 style={h3Style}>{t.h3_run}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.run_desc}</p>
      <pre style={codeStyle}><code>{`# Shell form (runs in /bin/sh -c)
RUN apt-get update && apt-get install -y curl

# Exec form (no shell processing)
RUN ["apt-get", "install", "-y", "curl"]`}</code></pre>

      <h3 style={h3Style}>{t.h3_copy}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.copy_desc}</p>
      <pre style={codeStyle}><code>{`# Copy a single file
COPY package.json /app/

# Copy a directory
COPY src/ /app/src/

# Copy with ownership (avoids extra chown layer)
COPY --chown=node:node . /app/`}</code></pre>

      <h3 style={h3Style}>{t.h3_cmd}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.cmd_desc}</p>
      <pre style={codeStyle}><code>{`# Exec form (preferred)
CMD ["node", "server.js"]

# Shell form
CMD node server.js`}</code></pre>

      <h3 style={h3Style}>{t.h3_entrypoint}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.entrypoint_desc}</p>
      <pre style={codeStyle}><code>{`# ENTRYPOINT + CMD pattern
ENTRYPOINT ["python", "manage.py"]
CMD ["runserver", "0.0.0.0:8000"]

# docker run myapp migrate   → python manage.py migrate
# docker run myapp            → python manage.py runserver 0.0.0.0:8000`}</code></pre>

      <h3 style={h3Style}>{t.h3_workdir}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.workdir_desc}</p>
      <pre style={codeStyle}><code>{`WORKDIR /app

# All subsequent commands run in /app
COPY package.json .
RUN npm install
COPY . .`}</code></pre>

      <h3 style={h3Style}>{t.h3_expose}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.expose_desc}</p>
      <pre style={codeStyle}><code>{`EXPOSE 3000
EXPOSE 8080/tcp
EXPOSE 8125/udp`}</code></pre>

      {/* ===== 2. Layer Caching ===== */}
      <h2 style={h2Style}>{t.h2_caching}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.caching_desc }} />
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 600 }}>{t.caching_rule}</p>

      <h3 style={{ ...h3Style, color: '#e74c3c' }}>{t.h3_bad_cache}</h3>
      <pre style={codeStyle}><code>{`FROM node:20-alpine
WORKDIR /app

# BAD: Copying everything first means ANY file change
# invalidates the npm install cache
COPY . .
RUN npm install
CMD ["node", "server.js"]`}</code></pre>

      <h3 style={{ ...h3Style, color: '#27ae60' }}>{t.h3_good_cache}</h3>
      <pre style={codeStyle}><code>{`FROM node:20-alpine
WORKDIR /app

# GOOD: Copy only dependency files first
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Then copy source code (this layer changes often)
COPY . .
CMD ["node", "server.js"]`}</code></pre>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic' }}>{t.caching_tip}</p>

      {/* ===== 3. Multi-Stage Builds ===== */}
      <h2 style={h2Style}>{t.h2_multistage}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.multistage_desc}</p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 600 }}>{t.multistage_benefits}</p>

      <h3 style={h3Style}>{t.h3_node_multistage}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.node_multistage_desc}</p>
      <pre style={codeStyle}><code>{`# ===== Stage 1: Build =====
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

# ===== Stage 2: Production =====
FROM node:20-alpine AS production
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Security: run as non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
CMD ["node", "dist/server.js"]`}</code></pre>

      <h3 style={h3Style}>{t.h3_size_comparison}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.size_header_approach}</th>
            <th style={thStyle}>{t.size_header_size}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{t.size_single}</td><td style={tdStyle}>~1.1 GB</td></tr>
          <tr><td style={tdStyle}>{t.size_single_alpine}</td><td style={tdStyle}>~400 MB</td></tr>
          <tr><td style={tdStyle}>{t.size_multi}</td><td style={tdStyle}>~150 MB</td></tr>
          <tr><td style={tdStyle}>{t.size_distroless}</td><td style={tdStyle}>~120 MB</td></tr>
        </tbody>
      </table>

      {/* ===== 4. .dockerignore ===== */}
      <h2 style={h2Style}>{t.h2_dockerignore}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.dockerignore_desc}</p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.dockerignore_why}</p>
      <pre style={codeStyle}><code>{`# .dockerignore

# Dependencies (will be installed in container)
node_modules
npm-debug.log*

# Version control
.git
.gitignore

# Environment / secrets
.env
.env.*
*.pem

# IDE and OS files
.vscode
.idea
.DS_Store
Thumbs.db

# Build output
dist
build
coverage

# Docker files (not needed inside container)
Dockerfile*
docker-compose*
.dockerignore

# Documentation
README.md
CHANGELOG.md
docs/`}</code></pre>

      {/* ===== 5. Base Image Selection ===== */}
      <h2 style={h2Style}>{t.h2_base_image}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.base_desc}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.base_header_variant}</th>
            <th style={thStyle}>{t.base_header_size}</th>
            <th style={thStyle}>{t.base_header_packages}</th>
            <th style={thStyle}>{t.base_header_usecase}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>node:20</td>
            <td style={tdStyle}>~1.1 GB</td>
            <td style={tdStyle}>{t.base_full}</td>
            <td style={tdStyle}>{t.base_full_use}</td>
          </tr>
          <tr>
            <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>node:20-slim</td>
            <td style={tdStyle}>~200 MB</td>
            <td style={tdStyle}>{t.base_slim}</td>
            <td style={tdStyle}>{t.base_slim_use}</td>
          </tr>
          <tr>
            <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>node:20-alpine</td>
            <td style={tdStyle}>~130 MB</td>
            <td style={tdStyle}>{t.base_alpine}</td>
            <td style={tdStyle}>{t.base_alpine_use}</td>
          </tr>
          <tr>
            <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>gcr.io/distroless/nodejs20</td>
            <td style={tdStyle}>~120 MB</td>
            <td style={tdStyle}>{t.base_distroless}</td>
            <td style={tdStyle}>{t.base_distroless_use}</td>
          </tr>
        </tbody>
      </table>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic' }}>{t.base_recommendation}</p>

      {/* ===== 6. Security ===== */}
      <h2 style={h2Style}>{t.h2_security}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.security_desc}</p>

      <h3 style={h3Style}>{t.h3_nonroot}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.nonroot_desc}</p>
      <pre style={codeStyle}><code>{`FROM node:20-alpine
WORKDIR /app

COPY --chown=node:node . .
RUN npm ci --only=production

# Switch to the built-in non-root user
USER node

CMD ["node", "server.js"]`}</code></pre>
      <pre style={codeStyle}><code>{`# For Debian-based images, create a user explicitly
FROM python:3.12-slim
WORKDIR /app

RUN groupadd -r appgroup && useradd -r -g appgroup -d /app appuser
COPY --chown=appuser:appgroup . .
RUN pip install --no-cache-dir -r requirements.txt

USER appuser
CMD ["python", "app.py"]`}</code></pre>

      <h3 style={h3Style}>{t.h3_no_secrets}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.no_secrets_desc}</p>
      <pre style={codeStyle}><code>{`# BAD — secret visible in image history
ARG DB_PASSWORD
RUN echo "db_pass=$DB_PASSWORD" > /app/config

# GOOD — use runtime environment variables
ENV DB_PASSWORD=""
# Set at runtime: docker run -e DB_PASSWORD=secret myapp

# BEST — use Docker BuildKit secrets (not stored in layers)
RUN --mount=type=secret,id=db_pass \\
    cat /run/secrets/db_pass > /app/config
# Build: docker build --secret id=db_pass,src=./password.txt .`}</code></pre>

      <h3 style={h3Style}>{t.h3_scan}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.scan_desc}</p>
      <pre style={codeStyle}><code>{`# Trivy — popular open-source scanner
trivy image myapp:latest

# Docker Scout (built into Docker Desktop)
docker scout cves myapp:latest

# Snyk
snyk container test myapp:latest

# Scan during CI/CD pipeline
# GitHub Actions example:
# - name: Scan image
#   uses: aquasecurity/trivy-action@master
#   with:
#     image-ref: myapp:latest
#     severity: CRITICAL,HIGH`}</code></pre>

      {/* ===== 7. RUN Optimization ===== */}
      <h2 style={h2Style}>{t.h2_run_optimization}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.run_opt_desc}</p>

      <h3 style={h3Style}>{t.h3_combine_run}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.combine_desc}</p>

      <h3 style={{ ...h3Style, color: '#e74c3c' }}>{t.h3_bad_run}</h3>
      <pre style={codeStyle}><code>{`# Each RUN = new layer; apt cache stays in first layer
RUN apt-get update
RUN apt-get install -y curl wget git
RUN rm -rf /var/lib/apt/lists/*`}</code></pre>

      <h3 style={{ ...h3Style, color: '#27ae60' }}>{t.h3_good_run}</h3>
      <pre style={codeStyle}><code>{`# Single layer, cache cleaned in same layer
RUN apt-get update \\
    && apt-get install -y --no-install-recommends \\
       curl \\
       wget \\
       git \\
    && rm -rf /var/lib/apt/lists/* \\
    && apt-get purge -y --auto-remove`}</code></pre>

      {/* ===== 8. COPY vs ADD ===== */}
      <h2 style={h2Style}>{t.h2_copy_vs_add}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.copy_add_desc}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.copy_add_header_instruction}</th>
            <th style={thStyle}>{t.copy_add_header_behavior}</th>
            <th style={thStyle}>{t.copy_add_header_when}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>COPY</td>
            <td style={tdStyle}>{t.copy_behavior}</td>
            <td style={tdStyle}>{t.copy_when}</td>
          </tr>
          <tr>
            <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>ADD</td>
            <td style={tdStyle}>{t.add_behavior}</td>
            <td style={tdStyle}>{t.add_when}</td>
          </tr>
        </tbody>
      </table>
      <pre style={codeStyle}><code>{`# COPY — simple and predictable
COPY ./config /app/config

# ADD — auto-extracts tar archives
ADD app.tar.gz /app/

# For downloading files, prefer RUN + curl
RUN curl -fsSL https://example.com/file.tar.gz | tar xz -C /app/`}</code></pre>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic' }}>{t.copy_add_recommendation}</p>

      {/* ===== 9. HEALTHCHECK ===== */}
      <h2 style={h2Style}>{t.h2_healthcheck}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.healthcheck_desc}</p>

      <h3 style={h3Style}>{t.h3_http_health}</h3>
      <pre style={codeStyle}><code>{`# HTTP health check using curl
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# HTTP health check using wget (for Alpine without curl)
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# TCP port check (no HTTP endpoint needed)
HEALTHCHECK --interval=15s --timeout=3s --retries=5 \\
  CMD nc -z localhost 3000 || exit 1

# Database health check
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \\
  CMD pg_isready -U postgres || exit 1`}</code></pre>

      <h3 style={h3Style}>{t.h3_health_options}</h3>
      <ul style={{ color: 'var(--text-secondary)', lineHeight: 2 }}>
        <li><code>--interval</code> — {t.health_interval}</li>
        <li><code>--timeout</code> — {t.health_timeout}</li>
        <li><code>--retries</code> — {t.health_retries}</li>
        <li><code>--start-period</code> — {t.health_start}</li>
      </ul>

      {/* ===== 10. ARG vs ENV ===== */}
      <h2 style={h2Style}>{t.h2_arg_vs_env}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.arg_env_desc}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.arg_env_header_feature}</th>
            <th style={thStyle}>{t.arg_env_header_arg}</th>
            <th style={thStyle}>{t.arg_env_header_env}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...tdStyle, fontWeight: 600 }}>{t.arg_env_available}</td>
            <td style={tdStyle}>{t.arg_env_arg_available}</td>
            <td style={tdStyle}>{t.arg_env_env_available}</td>
          </tr>
          <tr>
            <td style={{ ...tdStyle, fontWeight: 600 }}>{t.arg_env_in_image}</td>
            <td style={tdStyle}>{t.arg_env_arg_in_image}</td>
            <td style={tdStyle}>{t.arg_env_env_in_image}</td>
          </tr>
          <tr>
            <td style={{ ...tdStyle, fontWeight: 600 }}>{t.arg_env_override}</td>
            <td style={tdStyle}>{t.arg_env_arg_override}</td>
            <td style={tdStyle}>{t.arg_env_env_override}</td>
          </tr>
          <tr>
            <td style={{ ...tdStyle, fontWeight: 600 }}>{t.arg_env_default}</td>
            <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{t.arg_env_arg_default}</td>
            <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{t.arg_env_env_default}</td>
          </tr>
        </tbody>
      </table>
      <pre style={codeStyle}><code>{`# ARG — only available during build
ARG NODE_VERSION=20
FROM node:\${NODE_VERSION}-alpine

# ARG after FROM must be re-declared
ARG APP_VERSION=1.0.0
RUN echo "Building version $APP_VERSION"

# ENV — available during build AND in running container
ENV NODE_ENV=production
ENV PORT=3000

# Common pattern: ARG → ENV (build-time default, runtime override)
ARG DEFAULT_PORT=3000
ENV PORT=\${DEFAULT_PORT}
# Override at build: docker build --build-arg DEFAULT_PORT=8080 .
# Override at run:   docker run -e PORT=8080 myapp`}</code></pre>

      {/* ===== 11. Real-World Examples ===== */}
      <h2 style={h2Style}>{t.h2_examples}</h2>

      <h3 style={{ ...h3Style, color: 'var(--accent-blue)' }}>{t.h3_nodejs_example}</h3>
      <pre style={codeStyle}><code>{`# ===== Build Stage =====
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src/ ./src/
COPY public/ ./public/
RUN npm run build

# ===== Production Stage =====
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --only=production \\
    && npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/server.js"]`}</code></pre>

      <h3 style={{ ...h3Style, color: 'var(--accent-blue)' }}>{t.h3_python_example}</h3>
      <pre style={codeStyle}><code>{`# ===== Build Stage =====
FROM python:3.12-slim AS builder
WORKDIR /app

# Install build dependencies
RUN apt-get update \\
    && apt-get install -y --no-install-recommends gcc libpq-dev \\
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ===== Production Stage =====
FROM python:3.12-slim
WORKDIR /app

# Install runtime dependencies only
RUN apt-get update \\
    && apt-get install -y --no-install-recommends libpq5 \\
    && rm -rf /var/lib/apt/lists/*

# Copy installed packages from builder
COPY --from=builder /install /usr/local

COPY . .

RUN groupadd -r app && useradd -r -g app -d /app app \\
    && chown -R app:app /app
USER app

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \\
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1

CMD ["gunicorn", "app.main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]`}</code></pre>

      <h3 style={{ ...h3Style, color: 'var(--accent-blue)' }}>{t.h3_go_example}</h3>
      <pre style={codeStyle}><code>{`# ===== Build Stage =====
FROM golang:1.22-alpine AS builder
WORKDIR /app

# Cache dependencies
COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Build static binary with CGO disabled
RUN CGO_ENABLED=0 GOOS=linux go build \\
    -ldflags="-w -s" \\
    -o /app/server ./cmd/server

# ===== Production Stage =====
FROM gcr.io/distroless/static-debian12
WORKDIR /app

COPY --from=builder /app/server .
COPY --from=builder /app/config ./config

EXPOSE 8080
USER nonroot:nonroot

ENTRYPOINT ["/app/server"]`}</code></pre>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic' }}>{t.go_note}</p>

      <h3 style={{ ...h3Style, color: 'var(--accent-blue)' }}>{t.h3_java_example}</h3>
      <pre style={codeStyle}><code>{`# ===== Build Stage =====
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Cache Gradle/Maven dependencies
COPY build.gradle settings.gradle gradlew ./
COPY gradle/ ./gradle/
RUN ./gradlew dependencies --no-daemon

COPY src/ ./src/
RUN ./gradlew bootJar --no-daemon

# ===== Production Stage =====
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Extract Spring Boot layers for better caching
COPY --from=builder /app/build/libs/*.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]`}</code></pre>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic' }}>{t.java_note}</p>

      {/* ===== 12. FAQ ===== */}
      <h2 style={h2Style}>{t.h2_faq}</h2>
      {[
        { q: t.faq1q, a: t.faq1a },
        { q: t.faq2q, a: t.faq2a },
        { q: t.faq3q, a: t.faq3a },
        { q: t.faq4q, a: t.faq4a },
        { q: t.faq5q, a: t.faq5a },
      ].map((faq, i) => (
        <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>{faq.q}</summary>
          <p style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
