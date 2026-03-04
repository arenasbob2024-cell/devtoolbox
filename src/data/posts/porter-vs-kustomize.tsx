'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Porter vs Kustomize: Kubernetes Package Management Comparison',
    intro: 'Porter and Kustomize are tools for managing Kubernetes deployments, but with different philosophies. Porter focuses on CNAB (Cloud Native Application Bundles) for portable application packages, while Kustomize provides template-free customization of Kubernetes manifests. This comparison examines their approaches and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Porter for portable application bundles with dependency management and multi-environment support. Choose Kustomize for native kubectl integration and declarative manifest customization. Porter excels in bundle distribution; Kustomize excels in environment-specific configuration.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Porter uses CNAB spec for portable bundles',
    takeaway2: 'Kustomize is built into kubectl (1.14+)',
    takeaway3: 'Porter manages dependencies and invocation images',
    takeaway4: 'Kustomize uses overlays for environment customization',
    takeaway5: 'Porter supports multiple infrastructure targets',
    takeaway6: 'Kustomize has no templating language',
    
    whatIsPorterTitle: 'What is Porter?',
    whatIsPorterContent: 'Porter is an open-source tool developed by Microsoft and the CNCF that implements the Cloud Native Application Bundle (CNAB) specification. Released in 2019, it packages applications and their dependencies into portable bundles that can be deployed across different clouds and environments. Porter uses invocation images and supports mixins for various tools.',
    
    whatIsKustomizeTitle: 'What is Kustomize?',
    whatIsKustomizeContent: 'Kustomize is a Kubernetes native configuration management tool, now built into kubectl. Released in 2018 and acquired by Google, it provides template-free customization of Kubernetes YAML manifests using overlays and patches. Kustomize follows the declarative Kubernetes philosophy and integrates seamlessly with existing workflows.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Package and deployment configuration:',
    
    porterExampleTitle: 'Porter Bundle Configuration',
    kustomizeExampleTitle: 'Kustomize Configuration',
    
    dataSourceTitle: 'Package Structure',
    dataSourceIntro: 'How packages are structured:',
    
    alertingTitle: 'Dependency Management',
    alertingIntro: 'Managing dependencies and integrations:',
    
    useCasesTitle: 'Best Use Cases',
    porterBestFor: 'Porter is Best For:',
    kustomizeBestFor: 'Kustomize is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Porter and Kustomize serve different needs in the Kubernetes ecosystem. Porter is ideal for distributing complete application bundles with dependencies across clouds and teams. Kustomize excels at environment-specific customization of Kubernetes manifests with native kubectl integration. Many teams use Kustomize for day-to-day configuration and Porter for distributing packaged applications.',
    
    faq1q: 'Can I use both Porter and Kustomize together?',
    faq1a: 'Yes, Porter can use Kustomize as a mixin. You can package Kustomize-managed manifests into Porter bundles for distribution while using Kustomize overlays for customization within the bundle.',
    
    faq2q: 'Which is easier to learn?',
    faq2a: 'Kustomize is easier for teams already using kubectl. It has no new syntax and follows Kubernetes patterns. Porter requires learning the CNAB spec, Porter manifest syntax, and mixins, but provides more powerful packaging capabilities.',
    
    faq3q: 'How do they compare to Helm?',
    faq3a: 'Helm is a package manager with templating. Kustomize is a customization tool without templating. Porter is a bundle tool that can include Helm charts. Porter is most different, focusing on portable bundles rather than just Kubernetes manifests.',
    
    faq4q: 'What about CI/CD integration?',
    faq4a: 'Both integrate well with CI/CD. Kustomize works with any pipeline using kubectl. Porter has dedicated CI/CD actions and can be run in containers. Kustomize has broader native support; Porter requires Porter CLI installation.',
    
    faq5q: 'Can Porter deploy to non-Kubernetes targets?',
    faq5a: 'Yes, Porter bundles can include deployments to Azure, AWS, Terraform, and other targets. This is a key advantage over Kustomize which is Kubernetes-only. Porter\'s CNAB spec is infrastructure-agnostic.',
    
    faq6q: 'How do they handle secrets?',
    faq6a: 'Kustomize can use Kustomize secret generators and integrates with external secret tools. Porter supports parameterized bundles with credential sets for secure credential injection. Both can work with external secret managers.',
    
    faq7q: 'Which is better for multi-environment deployments?',
    faq7a: 'Kustomize excels with overlays for dev/staging/prod. Porter handles multiple environments through parameterized bundles and credential sets. Kustomize is simpler for K8s-only; Porter is better for complex multi-cloud scenarios.',
    
    faq8q: 'What about version control and audit?',
    faq8a: 'Kustomize manifests are plain YAML, easy to version control and diff. Porter bundles are versioned container images with SHA digests. Both provide good audit trails, but Kustomize integrates more naturally with Git workflows.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Porter vs Kustomize：Kubernetes 包管理对比',
    intro: 'Porter 和 Kustomize 是管理 Kubernetes 部署的工具，但理念不同。Porter 专注于 CNAB（云原生应用包）实现可移植应用包，而 Kustomize 提供无模板的 Kubernetes 清单定制。本比较考察它们的方法和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为具有依赖管理和多环境支持的可移植应用包选择 Porter。为原生 kubectl 集成和声明式清单定制选择 Kustomize。Porter 在包分发方面出色；Kustomize 在环境特定配置方面出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Porter 使用 CNAB 规范实现可移植包',
    takeaway2: 'Kustomize 内置于 kubectl（1.14+）',
    takeaway3: 'Porter 管理依赖和调用镜像',
    takeaway4: 'Kustomize 使用 overlay 进行环境定制',
    takeaway5: 'Porter 支持多个基础设施目标',
    takeaway6: 'Kustomize 没有模板语言',
    
    whatIsPorterTitle: '什么是 Porter？',
    whatIsPorterContent: 'Porter 是由 Microsoft 和 CNCF 开发的开源工具，实现云原生应用包（CNAB）规范。2019 年发布，它将应用及其依赖打包成可跨不同云和环境部署的可移植包。Porter 使用调用镜像并支持各种工具的 mixin。',
    
    whatIsKustomizeTitle: '什么是 Kustomize？',
    whatIsKustomizeContent: 'Kustomize 是 Kubernetes 原生配置管理工具，现已内置于 kubectl。2018 年发布并被 Google 收购，它使用 overlay 和 patch 提供无模板的 Kubernetes YAML 清单定制。Kustomize 遵循声明式 Kubernetes 理念，与现有工作流无缝集成。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '包和部署配置：',
    
    porterExampleTitle: 'Porter 包配置',
    kustomizeExampleTitle: 'Kustomize 配置',
    
    dataSourceTitle: '包结构',
    dataSourceIntro: '包如何结构化：',
    
    alertingTitle: '依赖管理',
    alertingIntro: '管理依赖和集成：',
    
    useCasesTitle: '最佳用例',
    porterBestFor: 'Porter 最适合：',
    kustomizeBestFor: 'Kustomize 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Porter 和 Kustomize 在 Kubernetes 生态系统中服务于不同需求。Porter 适合跨云和团队分发带有依赖的完整应用包。Kustomize 在环境特定的 Kubernetes 清单定制和原生 kubectl 集成方面出色。许多团队日常配置使用 Kustomize，分发打包应用使用 Porter。',
    
    faq1q: '我可以同时使用 Porter 和 Kustomize 吗？',
    faq1a: '可以，Porter 可以使用 Kustomize 作为 mixin。你可以将 Kustomize 管理的清单打包到 Porter 包中分发，同时在包内使用 Kustomize overlay 进行定制。',
    
    faq2q: '哪个更容易学习？',
    faq2a: '对于已经使用 kubectl 的团队，Kustomize 更容易。它没有新语法，遵循 Kubernetes 模式。Porter 需要学习 CNAB 规范、Porter 清单语法和 mixin，但提供更强大的打包能力。',
    
    faq3q: '它们与 Helm 相比如何？',
    faq3a: 'Helm 是带有模板的包管理器。Kustomize 是无模板的定制工具。Porter 是可以包含 Helm chart 的打包工具。Porter 最不同，专注于可移植包而不仅是 Kubernetes 清单。',
    
    faq4q: 'CI/CD 集成怎么样？',
    faq4a: '两者都与 CI/CD 很好集成。Kustomize 使用 kubectl 与任何管道配合工作。Porter 有专门的 CI/CD 操作，可以在容器中运行。Kustomize 有更广泛的原生支持；Porter 需要安装 Porter CLI。',
    
    faq5q: 'Porter 可以部署到非 Kubernetes 目标吗？',
    faq5a: '可以，Porter 包可以包括对 Azure、AWS、Terraform 和其他目标的部署。这是相对于仅支持 Kubernetes 的 Kustomize 的关键优势。Porter 的 CNAB 规范是基础设施无关的。',
    
    faq6q: '它们如何处理密钥？',
    faq6a: 'Kustomize 可以使用 Kustomize 密钥生成器并与外部密钥工具集成。Porter 支持参数化包和凭据集以安全注入凭据。两者都可以与外部密钥管理器配合工作。',
    
    faq7q: '哪个更适合多环境部署？',
    faq7a: 'Kustomize 通过 overlay 处理 dev/staging/prod 出色。Porter 通过参数化包和凭据集处理多环境。Kustomize 对仅 K8s 更简单；Porter 对复杂多云场景更好。',
    
    faq8q: '版本控制和审计怎么样？',
    faq8a: 'Kustomize 清单是纯 YAML，易于版本控制和比较。Porter 包是带有 SHA 摘要的版本化容器镜像。两者都提供良好的审计跟踪，但 Kustomize 与 Git 工作流集成更自然。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PorterVsKustomize({ lang }: { lang: string }) {
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
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#5d3fd3' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #5d3fd3', background: 'linear-gradient(135deg, rgba(93,63,211,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#5d3fd3' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsPorterTitle}</h3>
      <p style={pStyle}>{ct.whatIsPorterContent}</p>

      <h3 style={{ ...h3Style, color: '#326ce5' }}>{ct.whatIsKustomizeTitle}</h3>
      <p style={pStyle}>{ct.whatIsKustomizeContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Porter</th>
              <th style={thStyle}>Kustomize</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心定位' : 'Core Focus', 'CNAB bundles', 'Manifest customization'],
              [isZh ? 'Kubectl 集成' : 'Kubectl Integration', isZh ? '独立工具' : 'Standalone tool', isZh ? '内置（1.14+）' : 'Built-in (1.14+)'],
              [isZh ? '模板语言' : 'Templating', isZh ? '使用 mixin' : 'Uses mixins', isZh ? '无' : 'None'],
              [isZh ? '依赖管理' : 'Dependency Mgmt', isZh ? '内置' : 'Built-in', isZh ? '手动' : 'Manual'],
              [isZh ? '多环境' : 'Multi-environment', isZh ? '参数化包' : 'Parameterized bundles', 'Overlays'],
              [isZh ? '基础设施' : 'Infrastructure', isZh ? '多云支持' : 'Multi-cloud', 'Kubernetes only'],
              [isZh ? '分发' : 'Distribution', 'OCI registry', isZh ? 'Git 仓库' : 'Git repository'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '中等' : 'Medium', isZh ? '低' : 'Low'],
            ].map(([feature, porter, kustomize], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{porter}</td>
                <td style={tdStyle}>{kustomize}</td>
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
              <th style={thStyle}>Porter</th>
              <th style={thStyle}>Kustomize</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '安装/卸载' : 'Install/Uninstall', isZh ? '内置生命周期' : 'Built-in lifecycle', isZh ? '手动' : 'Manual'],
              [isZh ? '升级/回滚' : 'Upgrade/Rollback', isZh ? '支持' : 'Supported', isZh ? '手动/GitOps' : 'Manual/GitOps'],
              [isZh ? '凭据管理' : 'Credential Mgmt', isZh ? '凭据集' : 'Credential sets', isZh ? '外部工具' : 'External tools'],
              [isZh ? '输出/状态' : 'Outputs/State', isZh ? '内置' : 'Built-in', isZh ? '无' : 'None'],
              [isZh ? 'Patch 支持' : 'Patching', isZh ? '有限' : 'Limited', 'Strategic merge patches'],
              [isZh ? '组件组合' : 'Composition', isZh ? '依赖' : 'Dependencies', 'Bases + Overlays'],
              [isZh ? '验证' : 'Validation', isZh ? '内置' : 'Built-in', isZh ? 'kubectl 验证' : 'kubectl validation'],
              [isZh ? '可移植性' : 'Portability', isZh ? '高（CNAB）' : 'High (CNAB)', isZh ? '中等' : 'Medium'],
            ].map(([cap, porter, kustomize], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{porter}</td>
                <td style={tdStyle}>{kustomize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#5d3fd3' }}>{ct.porterExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Porter Manifest (porter.yaml)
schemaVersion: 1.0.0
name: my-app-bundle
version: 1.0.0
description: A sample application bundle
registry: ghcr.io/myorg

mixins:
  - kustomize
  - helm
  - exec

credentials:
  - name: kubeconfig
    path: /root/.kube/config

parameters:
  - name: namespace
    type: string
    default: default
  - name: replicas
    type: integer
    default: 3

dependencies:
  - name: mysql
    bundle:
      reference: ghcr.io/getporter/mysql:v0.1.0

install:
  - kustomize:
      description: "Deploy application"
      source: ./kustomize
      kubeconfig: \\${ credentials.kubeconfig }
      namespace: \\${ parameters.namespace }

upgrade:
  - kustomize:
      description: "Upgrade application"
      source: ./kustomize
      kubeconfig: \\${ credentials.kubeconfig }

uninstall:
  - kustomize:
      description: "Remove application"
      kubeconfig: \\${ credentials.kubeconfig }
      namespace: \\${ parameters.namespace }

# Build and Install Commands:
# porter build
# porter install --param namespace=prod --cred kubeconfig

# Generate Bundle Definition:
# porter explain`}</code></pre>

      <h3 style={{ ...h3Style, color: '#326ce5' }}>{ct.kustomizeExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Base kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - deployment.yaml
  - service.yaml
  - configmap.yaml

commonLabels:
  app: my-app
  version: v1

configMapGenerator:
  - name: app-config
    literals:
      - LOG_LEVEL=info
      - DB_HOST=localhost

---
# Overlays/Production/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - ../../base

patchesStrategicMerge:
  - deployment-replicas.yaml

configMapGenerator:
  - name: app-config
    behavior: merge
    literals:
      - LOG_LEVEL=warn
      - DB_HOST=prod-db.example.com

images:
  - name: my-app
    newTag: v1.2.3

---
# deployment-replicas.yaml (Patch)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 5
  template:
    spec:
      containers:
      - name: app
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"

# Usage Commands:
# kubectl kustomize overlays/production
# kubectl apply -k overlays/production
# kubectl diff -k overlays/staging`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '组件' : 'Component'}</th>
              <th style={thStyle}>Porter</th>
              <th style={thStyle}>Kustomize</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '包定义' : 'Package Definition', 'porter.yaml + CNAB', 'kustomization.yaml'],
              [isZh ? '分发格式' : 'Distribution Format', 'OCI image (bundle)', 'YAML files in Git'],
              [isZh ? '配置文件' : 'Config Files', isZh ? '任意文件' : 'Arbitrary files', 'YAML manifests'],
              [isZh ? '调用镜像' : 'Invocation Image', isZh ? '必须' : 'Required', isZh ? '不适用' : 'N/A'],
              [isZh ? '输出' : 'Outputs', isZh ? 'JSON 输出' : 'JSON outputs', isZh ? '无' : 'None'],
              [isZh ? '版本控制' : 'Versioning', isZh ? '镜像标签' : 'Image tags', isZh ? 'Git 历史' : 'Git history'],
            ].map(([comp, porter, kustomize], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{comp}</td>
                <td style={tdStyle}>{porter}</td>
                <td style={tdStyle}>{kustomize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #5d3fd3' }}>
          <strong style={{ color: '#5d3fd3' }}>Porter Dependencies</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '内置依赖管理，可以声明依赖其他 Porter 包。支持依赖版本约束。自动按顺序安装依赖。可以将 Helm chart、Terraform 模块等作为依赖。' : 'Built-in dependency management can declare dependencies on other Porter bundles. Supports dependency version constraints. Automatically installs dependencies in order. Can include Helm charts, Terraform modules as dependencies.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #326ce5' }}>
          <strong style={{ color: '#326ce5' }}>Kustomize Dependencies</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '没有内置依赖管理。通过 base 和 overlay 组织资源。可以引用远程 base（Git 仓库）。依赖关系通过目录结构和 resources 字段管理。' : 'No built-in dependency management. Organizes resources through bases and overlays. Can reference remote bases (Git repos). Dependencies managed through directory structure and resources field.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #5d3fd3' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#5d3fd3' }}>{ct.porterBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '可移植应用包分发' : 'Portable app bundle distribution'}</li>
            <li>{isZh ? '多云部署场景' : 'Multi-cloud deployments'}</li>
            <li>{isZh ? 'ISV 和软件供应商' : 'ISVs and software vendors'}</li>
            <li>{isZh ? '复杂依赖管理' : 'Complex dependency management'}</li>
            <li>{isZh ? '跨团队应用共享' : 'Cross-team app sharing'}</li>
            <li>{isZh ? '混合基础设施部署' : 'Hybrid infrastructure deployment'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #326ce5' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#326ce5' }}>{ct.kustomizeBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '环境特定配置' : 'Environment-specific config'}</li>
            <li>{isZh ? 'GitOps 工作流' : 'GitOps workflows'}</li>
            <li>{isZh ? '原生 kubectl 集成' : 'Native kubectl integration'}</li>
            <li>{isZh ? '简单清单定制' : 'Simple manifest customization'}</li>
            <li>{isZh ? '团队内部部署' : 'Internal team deployments'}</li>
            <li>{isZh ? '声明式配置管理' : 'Declarative config management'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(93,63,211,0.1), rgba(50,108,229,0.1))', borderRadius: 12, border: '1px solid rgba(93,63,211,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#5d3fd3', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/yaml-formatter"} style={{ color: '#5d3fd3', textDecoration: 'none' }}>YAML Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#5d3fd3', textDecoration: 'none' }}>Base64 Encoder</a>
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