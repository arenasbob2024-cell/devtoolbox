'use client';
import React from 'react';

const codeNodeBasic = `# Single-stage build (bad — ships with devDependencies and build tools)
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install          # includes devDependencies
COPY . .
RUN npm run build
# Final image: ~1.2 GB (includes all node_modules, source, build tools)

---

# Multi-stage build (good — minimal production image)
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci               # clean install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Only copy what's needed
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production   # only production deps

COPY --from=builder /app/dist ./dist

EXPOSE 3000
USER node                # run as non-root
CMD ["node", "dist/server.js"]

# Final image: ~150 MB (85% reduction!)`;

const codeGoPattern = `# Go: the ultimate multi-stage build
# Go compiles to a static binary — final image can be FROM scratch

# Stage 1: Build
FROM golang:1.22-alpine AS builder
WORKDIR /app

# Download dependencies first (better cache)
COPY go.mod go.sum ./
RUN go mod download

# Build the binary
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main ./cmd/server

# Stage 2: Ultra-minimal runtime (zero OS!)
FROM scratch AS production
# Copy SSL certificates for HTTPS calls
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
# Copy just the binary
COPY --from=builder /app/main /main

EXPOSE 8080
ENTRYPOINT ["/main"]
# Final image: ~10 MB (just the binary + CA certs)`;

const codePythonPattern = `# Python: multi-stage with dependency caching
# Stage 1: Build wheels (compiled dependencies)
FROM python:3.12-slim AS builder
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
# Build wheels so Stage 2 doesn't need gcc
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

# Stage 2: Runtime
FROM python:3.12-slim AS production
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Only install runtime deps (no gcc needed)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Install pre-built wheels
COPY --from=builder /app/wheels /wheels
RUN pip install --no-cache /wheels/*

COPY . .

# Create non-root user
RUN addgroup --system app && adduser --system --group app
USER app

CMD ["gunicorn", "myapp.wsgi:application", "--bind", "0.0.0.0:8000"]`;

const codeTestingStage = `# Multi-stage with test stage
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build stage
FROM deps AS builder
COPY . .
RUN npm run build

# Test stage (run in CI, skip in production builds)
FROM builder AS test
RUN npm run test
RUN npm run lint

# Production stage (the default target)
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules  # share deps
EXPOSE 3000
USER node
CMD ["node", "dist/index.js"]

# Build commands:
# docker build .                          # builds production (default)
# docker build --target test .            # runs tests only
# docker build --target builder .         # build artifacts only`;

const codeBuildArgs = `# Using ARG and ENV across stages
# Build arguments (available at build time)
ARG NODE_VERSION=20
ARG APP_VERSION=1.0.0

FROM node:\${NODE_VERSION}-alpine AS builder
WORKDIR /app

ARG APP_VERSION
# Bake version into the binary at build time
ENV APP_VERSION=\${APP_VERSION}

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:\${NODE_VERSION}-alpine AS production
WORKDIR /app

# ARG must be redeclared in each stage where you use it
ARG APP_VERSION
LABEL version="\${APP_VERSION}"
ENV NODE_ENV=production
ENV APP_VERSION=\${APP_VERSION}

COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production

EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]

# Build with:
# docker build --build-arg NODE_VERSION=22 --build-arg APP_VERSION=2.1.0 .`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Docker Multi-Stage Builds: Patterns, Optimization, and Security',
    intro: 'Docker multi-stage builds allow you to use multiple FROM statements in a single Dockerfile. Each stage is a fresh environment — you compile, test, and package your application in separate stages, then copy only the final artifacts into a minimal production image. The result: dramatically smaller images, better security, and cleaner build processes.',
    whyTitle: 'Why Multi-Stage Builds?',
    whyDesc: 'Traditional Dockerfiles ship everything used during the build — compilers, dev dependencies, test frameworks. Multi-stage builds isolate the build environment from the runtime environment.',
    benefitsItems: 'Image size reduction: a Node.js app can go from 1.2 GB to 150 MB|Security: fewer packages = smaller attack surface. No compiler, no build tools in production|Build caching: each stage caches independently, speeding up subsequent builds|Separation of concerns: build, test, and runtime are clearly separated',
    nodeTitle: 'Node.js: The Classic Pattern',
    nodeDesc: 'The most common use case: compile TypeScript or bundle with webpack, then copy only the dist folder and production dependencies.',
    goTitle: 'Go: Static Binary (FROM scratch)',
    goDesc: 'Go produces static binaries that can run in a FROM scratch container — just the binary, no OS, no shell. The smallest possible images.',
    pythonTitle: 'Python: Compiled Wheels Pattern',
    pythonDesc: 'Python often needs system libraries (gcc, libpq) to compile C extensions. Build the wheels in Stage 1, install pre-built wheels in Stage 2 without build tools.',
    testingTitle: 'Including a Test Stage',
    testingDesc: 'Add a dedicated test stage that runs your test suite. Use --target to build only specific stages in CI.',
    argsTitle: 'Build Arguments Across Stages',
    argsDesc: 'ARG values must be re-declared in each stage where they are used. ENV variables do not carry across stages either.',
    bestPracticesTitle: 'Optimization Best Practices',
    bp1: 'Order instructions from least to most frequently changed. COPY package.json before COPY . . to maximize cache hits.',
    bp2: 'Use alpine or slim base images to reduce size and attack surface.',
    bp3: 'Always run as a non-root user in production stages.',
    bp4: 'Combine RUN commands with && to reduce layers: RUN apt-get update && apt-get install -y pkg && rm -rf /var/lib/apt/lists/*',
    bp5: 'Use .dockerignore to exclude node_modules, .git, tests, and docs from the build context.',
    bp6: 'Name your stages (AS builder) so you can reference them explicitly and use --target in CI.',
    comparisonTitle: 'Size Comparison by Language',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Can I cache multi-stage builds in CI?',
    faq1a: 'Yes. Use Docker BuildKit with cache-from: docker buildx build --cache-from type=gha --cache-to type=gha,mode=max. GitHub Actions has native BuildKit cache support via actions/cache and docker/build-push-action. Each stage caches independently so only changed stages rebuild.',
    faq2q: 'How do I share data between stages?',
    faq2a: 'Use COPY --from=stage_name to copy files from a named stage. You can only copy files, not environment variables or build cache. For sharing between unrelated images, use build volumes (docker build --mount) with BuildKit.',
    faq3q: 'Does --target skip unused stages?',
    faq3a: 'Yes. When you specify --target builder, Docker only builds stages up to and including the target. Subsequent stages are skipped entirely. This makes CI faster when you only need to run tests without building the final production image.',
    faq4q: 'Can I have multiple final stages (different deployment targets)?',
    faq4a: 'Yes. You can have multiple "final" stages that share a common builder stage. Use --target to build the one you need. Common pattern: a production stage with Node.js and a migration stage that runs database migrations, both built from the same compiled output.',
    faq5q: 'How do I use a private registry image in a FROM scratch stage?',
    faq5a: 'FROM scratch literally creates an empty image — no OS, no shell, no package manager. You must copy everything your binary needs: the binary itself, SSL certificates (for HTTPS), timezone data (if needed), and any dynamic libraries. For Go, compile with CGO_ENABLED=0 to get a static binary that needs nothing else.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Docker 多阶段构建：模式、优化和安全',
    intro: 'Docker 多阶段构建允许你在单个 Dockerfile 中使用多个 FROM 语句。每个阶段都是全新的环境——你在独立阶段中编译、测试和打包应用程序，然后只将最终工件复制到最小化的生产镜像中。结果：镜像大小显著减小、安全性更好、构建过程更清晰。',
    whyTitle: '为什么使用多阶段构建？',
    whyDesc: '传统 Dockerfile 会将构建过程中使用的所有内容都打包进去——编译器、开发依赖、测试框架。多阶段构建将构建环境与运行时环境隔离。',
    benefitsItems: '镜像大小减小：Node.js 应用可以从 1.2 GB 缩减到 150 MB|安全性：更少的包 = 更小的攻击面。生产环境中无编译器、无构建工具|构建缓存：每个阶段独立缓存，加速后续构建|关注点分离：构建、测试和运行时清晰分离',
    nodeTitle: 'Node.js：经典模式',
    nodeDesc: '最常见的用例：编译 TypeScript 或用 webpack 打包，然后只复制 dist 文件夹和生产依赖。',
    goTitle: 'Go：静态二进制文件（FROM scratch）',
    goDesc: 'Go 生成可在 FROM scratch 容器中运行的静态二进制文件——只有二进制文件，没有操作系统，没有 shell。这是最小的可能镜像。',
    pythonTitle: 'Python：编译 Wheels 模式',
    pythonDesc: 'Python 通常需要系统库（gcc、libpq）来编译 C 扩展。在第一阶段构建 wheels，在第二阶段安装预构建的 wheels，无需构建工具。',
    testingTitle: '包含测试阶段',
    testingDesc: '添加一个专门的测试阶段来运行你的测试套件。在 CI 中使用 --target 只构建特定阶段。',
    argsTitle: '跨阶段的构建参数',
    argsDesc: 'ARG 值必须在使用它们的每个阶段重新声明。ENV 变量也不会跨阶段传递。',
    bestPracticesTitle: '优化最佳实践',
    bp1: '按最少到最频繁更改的顺序排列指令。在 COPY . . 之前先 COPY package.json 以最大化缓存命中率。',
    bp2: '使用 alpine 或 slim 基础镜像来减小大小和攻击面。',
    bp3: '在生产阶段始终以非 root 用户运行。',
    bp4: '用 && 组合 RUN 命令以减少层数：RUN apt-get update && apt-get install -y pkg && rm -rf /var/lib/apt/lists/*',
    bp5: '使用 .dockerignore 从构建上下文中排除 node_modules、.git、测试和文档。',
    bp6: '命名你的阶段（AS builder），以便可以显式引用它们，并在 CI 中使用 --target。',
    comparisonTitle: '按语言的大小对比',
    faqTitle: '常见问题',
    faq1q: '我可以在 CI 中缓存多阶段构建吗？',
    faq1a: '可以。使用 Docker BuildKit 与 cache-from：docker buildx build --cache-from type=gha --cache-to type=gha,mode=max。GitHub Actions 通过 actions/cache 和 docker/build-push-action 具有原生 BuildKit 缓存支持。每个阶段独立缓存，因此只有已更改的阶段才会重建。',
    faq2q: '如何在阶段之间共享数据？',
    faq2a: '使用 COPY --from=stage_name 从命名阶段复制文件。你只能复制文件，不能复制环境变量或构建缓存。对于在不相关镜像之间共享，使用带有 BuildKit 的构建卷（docker build --mount）。',
    faq3q: '--target 会跳过未使用的阶段吗？',
    faq3a: '是的。当你指定 --target builder 时，Docker 只构建到目标阶段（包含目标阶段）。后续阶段完全被跳过。当你只需要运行测试而无需构建最终生产镜像时，这可以加快 CI 速度。',
    faq4q: '我可以有多个最终阶段（不同的部署目标）吗？',
    faq4a: '可以。你可以有多个共享公共构建器阶段的"最终"阶段。使用 --target 构建你需要的那个。常见模式：一个带有 Node.js 的生产阶段和一个运行数据库迁移的迁移阶段，两者都从相同的编译输出构建。',
    faq5q: '如何在 FROM scratch 阶段使用私有注册表镜像？',
    faq5a: 'FROM scratch 实际上创建了一个空镜像——没有操作系统、没有 shell、没有包管理器。你必须复制二进制文件所需的一切：二进制文件本身、SSL 证书（用于 HTTPS）、时区数据（如果需要）和任何动态库。对于 Go，使用 CGO_ENABLED=0 编译以获得不需要任何其他内容的静态二进制文件。',
    relatedTitle: '相关工具',
  },
};

export default function DockerMultiStageBuilds({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

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

  const sizeRows = [
    { lang: 'Node.js (React app)', naive: '1.2 GB', optimized: '~150 MB', savings: '87%' },
    { lang: 'Go (REST API)', naive: '800 MB', optimized: '~10 MB', savings: '99%' },
    { lang: 'Python (Django)', naive: '900 MB', optimized: '~200 MB', savings: '78%' },
    { lang: 'Java (Spring Boot)', naive: '1.5 GB', optimized: '~250 MB', savings: '83%' },
    { lang: 'Rust (binary)', naive: '2 GB', optimized: '~15 MB', savings: '99%' },
  ];

  const preStyle: React.CSSProperties = { background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <h2>{t.whyTitle}</h2>
      <p>{t.whyDesc}</p>
      <ul style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        {t.benefitsItems.split('|').map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      <h2 style={{ marginTop: '2.5rem' }}>{t.nodeTitle}</h2>
      <p>{t.nodeDesc}</p>
      <pre style={preStyle}><code>{codeNodeBasic}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.goTitle}</h2>
      <p>{t.goDesc}</p>
      <pre style={preStyle}><code>{codeGoPattern}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.pythonTitle}</h2>
      <p>{t.pythonDesc}</p>
      <pre style={preStyle}><code>{codePythonPattern}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.testingTitle}</h2>
      <p>{t.testingDesc}</p>
      <pre style={preStyle}><code>{codeTestingStage}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.argsTitle}</h2>
      <p>{t.argsDesc}</p>
      <pre style={preStyle}><code>{codeBuildArgs}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.comparisonTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Language / Framework</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Single-Stage Size</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Multi-Stage Size</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Savings</th>
            </tr>
          </thead>
          <tbody>
            {sizeRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 500 }}>{row.lang}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', color: '#c53030' }}>{row.naive}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', color: '#276749', fontWeight: 600 }}>{row.optimized}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 700, color: '#2b6cb0' }}>{row.savings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.bestPracticesTitle}</h2>
      <ol style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
        <li>{t.bp6}</li>
      </ol>

      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #0bc5ea' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><a href="/en/tools/docker-compose-generator" style={{ color: '#3182ce' }}>Docker Compose Generator</a></li>
          <li><a href="/en/tools/docker-run-to-compose" style={{ color: '#3182ce' }}>Docker Run to Compose</a></li>
          <li><a href="/en/tools/json-formatter" style={{ color: '#3182ce' }}>JSON Formatter</a></li>
        </ul>
      </div>
    </article>
  );
}
