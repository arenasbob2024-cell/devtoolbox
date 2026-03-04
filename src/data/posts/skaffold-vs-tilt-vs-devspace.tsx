'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Skaffold vs Tilt vs DevSpace: Kubernetes Development Tools Comparison',
    intro: 'Skaffold, Tilt, and DevSpace are popular tools for Kubernetes development workflows. All three handle building, deploying, and synchronizing code to Kubernetes clusters, but differ in features, approach, and developer experience. This comparison examines their capabilities and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Skaffold for simple, Google-native workflows. Choose Tilt for superior developer UX and live updates. Choose DevSpace for feature richness and enterprise needs. Skaffold is minimal; Tilt excels at interactivity; DevSpace offers most features.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Skaffold is the simplest, with minimal configuration',
    takeaway2: 'Tilt provides best-in-class live updates and UI',
    takeaway3: 'DevSpace has most features including reverse port-forwarding',
    takeaway4: 'All support hot reloading and code synchronization',
    takeaway5: 'Tilt and DevSpace have better multi-service support',
    takeaway6: 'Skaffold is best for CI/CD pipelines',
    
    whatIsSkaffoldTitle: 'What is Skaffold?',
    whatIsSkaffoldContent: 'Skaffold is a command-line tool developed by Google for continuous development on Kubernetes. Released in 2018, it automates the build-push-deploy workflow and supports multiple build tools (Docker, Buildpacks, Bazel) and deployers (kubectl, Helm, kustomize). Skaffold focuses on simplicity and works well in CI/CD pipelines.',
    
    whatIsTiltTitle: 'What is Tilt?',
    whatIsTiltContent: 'Tilt is a development tool created by Tilt.dev (formerly Windmill Engineering). Released in 2018, it specializes in multi-service development with excellent live update capabilities. Tilt provides a web UI for monitoring all services, smart rebuilds, and efficient file synchronization. It focuses on developer productivity for complex microservice environments.',
    
    whatIsDevSpaceTitle: 'What is DevSpace?',
    whatIsDevSpaceContent: 'DevSpace is an open-source developer tool developed by Loft Labs. Released in 2019, it provides comprehensive development features including hot reloading, reverse port-forwarding, code synchronization, and interactive terminal access. DevSpace also offers production-ready features like namespace isolation and cluster management.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities across all three tools:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Development workflow configuration:',
    
    skaffoldExampleTitle: 'Skaffold Configuration',
    tiltExampleTitle: 'Tilt Configuration',
    devspaceExampleTitle: 'DevSpace Configuration',
    
    dataSourceTitle: 'Build & Deploy Support',
    dataSourceIntro: 'Supported build and deployment methods:',
    
    alertingTitle: 'Developer Experience',
    alertingIntro: 'Developer productivity features:',
    
    useCasesTitle: 'Best Use Cases',
    skaffoldBestFor: 'Skaffold is Best For:',
    tiltBestFor: 'Tilt is Best For:',
    devspaceBestFor: 'DevSpace is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Skaffold, Tilt, and DevSpace each excel in different scenarios. Skaffold is ideal for simple projects and CI/CD pipelines with its minimal configuration. Tilt shines for microservice development with its excellent UI and live updates. DevSpace offers the most comprehensive feature set for both development and production scenarios. Choose based on your team\'s needs: simplicity (Skaffold), interactivity (Tilt), or feature completeness (DevSpace).',
    
    faq1q: 'Can I use multiple tools together?',
    faq1a: 'While possible, it\'s not recommended as each tool manages its own deployment workflow. However, you can use Skaffold in CI/CD and Tilt/DevSpace for local development on the same project.',
    
    faq2q: 'Which is fastest for development iteration?',
    faq2a: 'Tilt generally provides fastest iteration with its smart file watching and live updates. DevSpace is close second. Skaffold is efficient but does full rebuilds by default unless configured otherwise.',
    
    faq3q: 'How do they handle multi-service development?',
    faq3a: 'Tilt excels at multi-service with its Tiltfile allowing easy service orchestration and a unified UI. DevSpace has good multi-service support. Skaffold supports multiple services but requires more configuration.',
    
    faq4q: 'Which works best with Helm?',
    faq4a: 'All three support Helm deployments. Skaffold has native Helm support. DevSpace can use Helm as a deployment method. Tilt supports Helm through its Tiltfile. All integrate well with existing Helm charts.',
    
    faq5q: 'What about remote cluster development?',
    faq5a: 'DevSpace excels here with namespace isolation, reverse port-forwarding, and remote development features. Tilt works well with remote clusters. Skaffold is cluster-agnostic but has fewer remote-specific features.',
    
    faq6q: 'Which has the best learning curve?',
    faq6a: 'Skaffold has the gentlest learning curve with simple YAML configuration. Tilt\'s Starlark-based Tiltfile is approachable. DevSpace has more concepts to learn but offers extensive documentation.',
    
    faq7q: 'How do they compare in CI/CD?',
    faq7a: 'Skaffold is best suited for CI/CD with its headless mode and simple workflow. DevSpace can run in CI with --no-watch flag. Tilt is primarily for local development and less suited for CI.',
    
    faq8q: 'What about enterprise features?',
    faq8a: 'DevSpace offers most enterprise features including user management, namespace isolation, and Loft integration. Skaffold integrates with Google Cloud Build. Tilt offers Tilt Cloud for team collaboration.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Skaffold vs Tilt vs DevSpace：Kubernetes 开发工具对比',
    intro: 'Skaffold、Tilt 和 DevSpace 是流行的 Kubernetes 开发工作流工具。这三者都处理构建、部署和代码同步到 Kubernetes 集群，但在功能、方法和开发体验方面有所不同。本比较考察它们的能力和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为简单、Google 原生工作流选择 Skaffold。为卓越的开发者体验和实时更新选择 Tilt。为功能丰富和企业需求选择 DevSpace。Skaffold 最小；Tilt 在交互性方面出色；DevSpace 提供最多功能。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Skaffold 最简单，配置最少',
    takeaway2: 'Tilt 提供最佳的实时更新和 UI',
    takeaway3: 'DevSpace 功能最多，包括反向端口转发',
    takeaway4: '所有都支持热重载和代码同步',
    takeaway5: 'Tilt 和 DevSpace 有更好的多服务支持',
    takeaway6: 'Skaffold 最适合 CI/CD 管道',
    
    whatIsSkaffoldTitle: '什么是 Skaffold？',
    whatIsSkaffoldContent: 'Skaffold 是由 Google 开发的命令行工具，用于 Kubernetes 上的持续开发。2018 年发布，它自动化构建-推送-部署工作流，支持多种构建工具（Docker、Buildpacks、Bazel）和部署器（kubectl、Helm、kustomize）。Skaffold 专注于简单性，在 CI/CD 管道中运行良好。',
    
    whatIsTiltTitle: '什么是 Tilt？',
    whatIsTiltContent: 'Tilt 是由 Tilt.dev（前身为 Windmill Engineering）创建的开发工具。2018 年发布，它专注于多服务开发，具有出色的实时更新能力。Tilt 提供用于监控所有服务的 Web UI、智能重建和高效文件同步。它专注于复杂微服务环境的开发人员生产力。',
    
    whatIsDevSpaceTitle: '什么是 DevSpace？',
    whatIsDevSpaceContent: 'DevSpace 是由 Loft Labs 开发的开源开发工具。2019 年发布，它提供全面的开发功能，包括热重载、反向端口转发、代码同步和交互式终端访问。DevSpace 还提供生产就绪的功能，如命名空间隔离和集群管理。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较三个工具的核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '开发工作流配置：',
    
    skaffoldExampleTitle: 'Skaffold 配置',
    tiltExampleTitle: 'Tilt 配置',
    devspaceExampleTitle: 'DevSpace 配置',
    
    dataSourceTitle: '构建与部署支持',
    dataSourceIntro: '支持的构建和部署方法：',
    
    alertingTitle: '开发者体验',
    alertingIntro: '开发人员生产力功能：',
    
    useCasesTitle: '最佳用例',
    skaffoldBestFor: 'Skaffold 最适合：',
    tiltBestFor: 'Tilt 最适合：',
    devspaceBestFor: 'DevSpace 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Skaffold、Tilt 和 DevSpace 在不同场景中各有所长。Skaffold 适合简单项目和 CI/CD 管道，配置最少。Tilt 在微服务开发方面表现出色，具有优秀的 UI 和实时更新。DevSpace 为开发和生产场景提供最全面的功能集。根据团队需求选择：简单性（Skaffold）、交互性（Tilt）或功能完整性（DevSpace）。',
    
    faq1q: '我可以同时使用多个工具吗？',
    faq1a: '虽然可能，但不推荐，因为每个工具管理自己的部署工作流。但是，你可以在 CI/CD 中使用 Skaffold，在同一项目的本地开发中使用 Tilt/DevSpace。',
    
    faq2q: '哪个开发迭代最快？',
    faq2a: 'Tilt 通常通过智能文件监视和实时更新提供最快的迭代。DevSpace 紧随其后。Skaffold 高效但默认进行完整重建，除非另行配置。',
    
    faq3q: '它们如何处理多服务开发？',
    faq3a: 'Tilt 通过其 Tiltfile 轻松实现服务编排和统一 UI，在多服务方面表现出色。DevSpace 有良好的多服务支持。Skaffold 支持多个服务但需要更多配置。',
    
    faq4q: '哪个与 Helm 配合最好？',
    faq4a: '三者都支持 Helm 部署。Skaffold 有原生 Helm 支持。DevSpace 可以使用 Helm 作为部署方法。Tilt 通过 Tiltfile 支持 Helm。都与现有 Helm chart 集成良好。',
    
    faq5q: '远程集群开发怎么样？',
    faq5a: 'DevSpace 在这方面表现出色，具有命名空间隔离、反向端口转发和远程开发功能。Tilt 与远程集群配合良好。Skaffold 是集群无关的，但远程特定功能较少。',
    
    faq6q: '哪个学习曲线最好？',
    faq6a: 'Skaffold 学习曲线最平缓，配置简单。Tilt 基于 Starlark 的 Tiltfile 很容易上手。DevSpace 有更多概念需要学习，但提供广泛的文档。',
    
    faq7q: '它们在 CI/CD 中如何比较？',
    faq7a: 'Skaffold 最适合 CI/CD，具有无头模式和简单工作流。DevSpace 可以在 CI 中使用 --no-watch 标志运行。Tilt 主要用于本地开发，不太适合 CI。',
    
    faq8q: '企业功能怎么样？',
    faq8a: 'DevSpace 提供最多企业功能，包括用户管理、命名空间隔离和 Loft 集成。Skaffold 与 Google Cloud Build 集成。Tilt 提供 Tilt Cloud 用于团队协作。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function SkaffoldVsTiltVsDevSpace({ lang }: { lang: string }) {
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
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#ff6b35' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #ff6b35', background: 'linear-gradient(135deg, rgba(255,107,53,0.1), rgba(99,102,241,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#ff6b35' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsSkaffoldTitle}</h3>
      <p style={pStyle}>{ct.whatIsSkaffoldContent}</p>

      <h3 style={{ ...h3Style, color: '#6366f1' }}>{ct.whatIsTiltTitle}</h3>
      <p style={pStyle}>{ct.whatIsTiltContent}</p>

      <h3 style={{ ...h3Style, color: '#10b981' }}>{ct.whatIsDevSpaceTitle}</h3>
      <p style={pStyle}>{ct.whatIsDevSpaceContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Skaffold</th>
              <th style={thStyle}>Tilt</th>
              <th style={thStyle}>DevSpace</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '开发者' : 'Developer', 'Google', 'Tilt.dev', 'Loft Labs'],
              [isZh ? '配置语言' : 'Config Language', 'YAML', 'Starlark', 'YAML'],
              [isZh ? '实时更新' : 'Live Update', isZh ? '支持' : 'Supported', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? 'Web UI' : 'Web UI', isZh ? '无' : 'None', isZh ? '有' : 'Yes', isZh ? '有' : 'Yes'],
              [isZh ? '多服务支持' : 'Multi-service', isZh ? '支持' : 'Supported', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? 'CI/CD 集成' : 'CI/CD Integration', isZh ? '优秀' : 'Excellent', isZh ? '有限' : 'Limited', isZh ? '良好' : 'Good'],
              [isZh ? '反向端口转发' : 'Reverse Port-Forward', isZh ? '无' : 'No', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '低' : 'Low', isZh ? '中' : 'Medium', isZh ? '中' : 'Medium'],
            ].map(([feature, skaffold, tilt, devspace], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{skaffold}</td>
                <td style={tdStyle}>{tilt}</td>
                <td style={tdStyle}>{devspace}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>Skaffold</th>
              <th style={thStyle}>Tilt</th>
              <th style={thStyle}>DevSpace</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '热重载' : 'Hot Reload', isZh ? '支持' : 'Supported', isZh ? '优秀' : 'Excellent', isZh ? '支持' : 'Supported'],
              [isZh ? '文件同步' : 'File Sync', isZh ? '支持' : 'Supported', 'Smart sync', 'Bi-directional'],
              [isZh ? '终端访问' : 'Terminal Access', isZh ? '无' : 'No', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '命名空间管理' : 'Namespace Mgmt', isZh ? '手动' : 'Manual', isZh ? '自动' : 'Auto', isZh ? '自动' : 'Auto'],
              [isZh ? '依赖管理' : 'Dependency Mgmt', isZh ? '有限' : 'Limited', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '日志流' : 'Log Streaming', isZh ? '支持' : 'Supported', isZh ? '优秀' : 'Excellent', isZh ? '支持' : 'Supported'],
              [isZh ? 'Profile 支持' : 'Profiles', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '企业功能' : 'Enterprise', isZh ? '有限' : 'Limited', 'Tilt Cloud', 'Loft'],
            ].map(([cap, skaffold, tilt, devspace], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{skaffold}</td>
                <td style={tdStyle}>{tilt}</td>
                <td style={tdStyle}>{devspace}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#ff6b35' }}>{ct.skaffoldExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Skaffold Configuration (skaffold.yaml)
apiVersion: skaffold/v4beta5
kind: Config
metadata:
  name: my-app

build:
  artifacts:
  - image: my-app
    context: .
    docker:
      dockerfile: Dockerfile
    sync:
      manual:
      - src: 'src/**/*.js'
        dest: /app
  local:
    push: false

deploy:
  kubectl: {}
  manifests:
  - k8s/*.yaml

profiles:
- name: dev
  activation:
  - command: dev
  build:
    local:
      push: false

- name: prod
  build:
    googleCloudBuild: {}

portForward:
- resourceType: deployment
  resourceName: my-app
  port: 3000
  localPort: 3000

# Commands:
# skaffold dev          # Development mode
# skaffold run          # Single deployment
# skaffold debug        # Debug mode
# skaffold build        # Build only`}</code></pre>

      <h3 style={{ ...h3Style, color: '#6366f1' }}>{ct.tiltExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Tiltfile (Starlark syntax)
# Define services
docker_build('my-app', '.', dockerfile='Dockerfile')

# Kubernetes resources
k8s_yaml('k8s/')
k8s_resource('my-app', port_forwards=3000)

# Live update for fast iteration
docker_build(
    'my-app',
    '.',
    live_update=[
        sync('./src', '/app/src'),
        run('npm install', trigger='./package.json'),
    ]
)

# Multiple services
docker_build('api', './api')
docker_build('frontend', './frontend')
k8s_yaml(['api/k8s/', 'frontend/k8s/'])
k8s_resource('api', port_forwards=8080)
k8s_resource('frontend', port_forwards=3000)

# Custom build command
custom_build(
    'my-app',
    'docker build -t $EXPECTED_REF .',
    ['.'],
)

# Local resource (non-K8s)
local_resource(
    'db-migrate',
    'python migrate.py',
    resource_deps=['postgres']
)

# Commands:
# tilt up              # Start development
# tilt down            # Stop all resources
# tilt ui              # Open web UI`}</code></pre>

      <h3 style={{ ...h3Style, color: '#10b981' }}>{ct.devspaceExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# DevSpace Configuration (devspace.yaml)
version: v2beta11
name: my-app

pipelines:
  dev:
    run: |-
      run_dependencies --all
      ensure_pull_secrets --all
      create_deployments --all
      start_dev --all

images:
  app:
    image: my-app
    context: .
    dockerfile: Dockerfile

deployments:
  app:
    helm:
      componentChart: true
      values:
        containers:
        - image: my-app
          service:
            ports:
            - port: 3000

dev:
  app:
    imageSelector: my-app
    devImage: node:18
    command: ["npm", "run", "dev"]
    sync:
    - path: ./src:/app/src
      excludePaths:
      - node_modules/
    ports:
    - port: 3000
    open:
    - url: http://localhost:3000

    # Reverse port forwarding
    reversePorts:
    - port: 9229
      remotePort: 9229

commands:
  migrate:
    command: |-
      kubectl exec -it deployment/app -- npm run migrate

# Commands:
# devspace dev         # Start development
# devspace deploy      # Deploy to cluster
# devspace enter       # Open terminal in pod
# devspace sync        # Manual sync`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方法' : 'Method'}</th>
              <th style={thStyle}>Skaffold</th>
              <th style={thStyle}>Tilt</th>
              <th style={thStyle}>DevSpace</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Docker', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              ['Buildpacks', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              ['Bazel', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported', isZh ? '不支持' : 'No'],
              ['kubectl', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              ['Helm', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              ['Kustomize', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              ['Cloud Build', 'GCB, ACR', isZh ? '不支持' : 'No', isZh ? '支持' : 'Supported'],
            ].map(([method, skaffold, tilt, devspace], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{method}</td>
                <td style={tdStyle}>{skaffold}</td>
                <td style={tdStyle}>{tilt}</td>
                <td style={tdStyle}>{devspace}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ff6b35' }}>
          <strong style={{ color: '#ff6b35' }}>Skaffold Experience</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '简单直接的 CLI 体验，最小配置。无 UI，所有输出在终端。适合 CI/CD 和简单开发工作流。支持 profile 管理多环境。' : 'Simple, direct CLI experience with minimal configuration. No UI, all output in terminal. Ideal for CI/CD and simple development workflows. Supports profiles for multi-environment management.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #6366f1' }}>
          <strong style={{ color: '#6366f1' }}>Tilt Experience</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '出色的 Web UI 显示所有服务状态、日志和资源。智能文件监视和增量构建。最佳多服务开发体验。实时更新无需重启容器。' : 'Excellent Web UI showing all service status, logs, and resources. Smart file watching and incremental builds. Best multi-service development experience. Live updates without container restarts.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #10b981' }}>
          <strong style={{ color: '#10b981' }}>DevSpace Experience</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '全面功能包括反向端口转发、交互式终端和代码同步。良好的 UI 仪表板。适合远程集群开发。内置命名空间隔离和用户管理。' : 'Comprehensive features including reverse port-forwarding, interactive terminal, and code sync. Good UI dashboard. Excellent for remote cluster development. Built-in namespace isolation and user management.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ff6b35' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ff6b35' }}>{ct.skaffoldBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '简单项目' : 'Simple projects'}</li>
            <li>{isZh ? 'CI/CD 管道' : 'CI/CD pipelines'}</li>
            <li>{isZh ? 'Google Cloud 用户' : 'Google Cloud users'}</li>
            <li>{isZh ? '单服务应用' : 'Single-service apps'}</li>
            <li>{isZh ? '最小配置需求' : 'Minimal config needs'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #6366f1' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#6366f1' }}>{ct.tiltBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '微服务开发' : 'Microservice development'}</li>
            <li>{isZh ? '复杂多服务应用' : 'Complex multi-service apps'}</li>
            <li>{isZh ? '快速迭代需求' : 'Fast iteration needs'}</li>
            <li>{isZh ? '团队协作开发' : 'Team collaboration'}</li>
            <li>{isZh ? '交互式开发' : 'Interactive development'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #10b981' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#10b981' }}>{ct.devspaceBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '远程集群开发' : 'Remote cluster development'}</li>
            <li>{isZh ? '企业团队' : 'Enterprise teams'}</li>
            <li>{isZh ? '需要高级功能' : 'Advanced features needed'}</li>
            <li>{isZh ? '命名空间隔离' : 'Namespace isolation'}</li>
            <li>{isZh ? '调试和终端访问' : 'Debugging & terminal access'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(255,107,53,0.1), rgba(99,102,241,0.1))', borderRadius: 12, border: '1px solid rgba(255,107,53,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#ff6b35', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/yaml-formatter"} style={{ color: '#ff6b35', textDecoration: 'none' }}>YAML Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#ff6b35', textDecoration: 'none' }}>Base64 Encoder</a>
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