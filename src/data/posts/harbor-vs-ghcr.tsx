'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Harbor vs GitHub Container Registry: Container Registry Comparison',
    intro: 'Harbor and GitHub Container Registry (GHCR) are two popular solutions for storing and managing container images. Harbor is an open-source, self-hosted registry with enterprise features, while GHCR is GitHub\'s managed container registry integrated with GitHub Packages. This comparison examines their capabilities, security features, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Harbor for self-hosted control, enterprise-grade security, multi-tenant environments, and air-gapped deployments. Choose GHCR for seamless GitHub integration, simplicity, CI/CD workflows with GitHub Actions, and teams already invested in the GitHub ecosystem.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Harbor is open-source and self-hosted; GHCR is fully managed by GitHub',
    takeaway2: 'Harbor offers advanced security scanning with Trivy, Clair, and Notary',
    takeaway3: 'GHCR provides native GitHub Actions and Packages integration',
    takeaway4: 'Harbor supports multi-tenant and role-based access control',
    takeaway5: 'GHCR has simpler pricing tied to GitHub storage and bandwidth',
    takeaway6: 'Harbor is ideal for air-gapped and compliance-heavy environments',
    
    whatIsHarborTitle: 'What is Harbor?',
    whatIsHarborContent: 'Harbor is an open-source container registry developed by VMware (now CNCF graduated project). Released in 2016, it provides enterprise-grade features including vulnerability scanning, content trust, RBAC, replication, and notary support. Harbor can be deployed on-premises or in any cloud environment.',
    
    whatIsGhcrTitle: 'What is GitHub Container Registry?',
    whatIsGhcrContent: 'GitHub Container Registry (GHCR) is GitHub\'s managed container registry launched in 2020. It integrates seamlessly with GitHub Packages, GitHub Actions, and repository permissions. GHCR supports public and private images, fine-grained access control, and is fully managed without infrastructure overhead.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Registry configuration and usage:',
    
    harborExampleTitle: 'Harbor Configuration',
    ghcrExampleTitle: 'GHCR Configuration',
    
    dataSourceTitle: 'Integration Support',
    dataSourceIntro: 'Supported platforms and integrations:',
    
    alertingTitle: 'Security Features',
    alertingIntro: 'Security and compliance capabilities:',
    
    useCasesTitle: 'Best Use Cases',
    harborBestFor: 'Harbor is Best For:',
    ghcrBestFor: 'GHCR is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Harbor and GHCR serve different needs in the container registry landscape. Harbor excels in self-hosted, enterprise, and compliance-heavy environments requiring full control over infrastructure and advanced security features. GHCR is ideal for teams deeply integrated with GitHub, seeking simplicity and seamless CI/CD workflows. Many organizations use both: Harbor for internal, regulated workloads and GHCR for open-source or public projects.',
    
    faq1q: 'Can I migrate from GHCR to Harbor?',
    faq1a: 'Yes, you can migrate images using docker pull and push commands or tools like skopeo. Harbor also supports importing images from external registries including GHCR through its replication features.',
    
    faq2q: 'Which is better for Kubernetes deployments?',
    faq2a: 'Both work well with Kubernetes. Harbor integrates with Helm charts and offers better enterprise features for Kubernetes. GHCR works seamlessly with GitHub Actions for CI/CD. Choose based on your existing infrastructure and compliance needs.',
    
    faq3q: 'How do they compare on pricing?',
    faq3a: 'Harbor is free and open-source but requires infrastructure costs. GHCR charges for storage and bandwidth, with free tier for public images and GitHub packages limits. For large-scale operations, Harbor may be more cost-effective long-term.',
    
    faq4q: 'Does Harbor support OCI artifacts?',
    faq4a: 'Yes, Harbor supports OCI artifacts including Helm charts, CNAB, and other OCI-compliant content. GHCR also supports OCI artifacts and Helm charts through OCI registries.',
    
    faq5q: 'Which has better security scanning?',
    faq5a: 'Harbor has more comprehensive security scanning with built-in Trivy and Clair integration, vulnerability DB management, and CVE policies. GHCR relies on external scanning tools or GitHub Advanced Security for container scanning.',
    
    faq6q: 'Can I use GHCR without GitHub Actions?',
    faq6a: 'Yes, GHCR can be used with any CI/CD system. You can push and pull images using standard Docker commands with GitHub token authentication. However, the tightest integration is with GitHub Actions.',
    
    faq7q: 'What about high availability?',
    faq7a: 'GHCR is fully managed with built-in high availability by GitHub. Harbor requires manual HA setup with database and Redis clustering, though it supports multi-instance deployments and geo-replication.',
    
    faq8q: 'Which is better for open source projects?',
    faq8a: 'GHCR is excellent for open source with free public image hosting and seamless GitHub integration. Harbor can also host public images but is more commonly used for private, enterprise registries.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Harbor vs GitHub Container Registry：容器镜像仓库对比',
    intro: 'Harbor 和 GitHub Container Registry (GHCR) 是两个流行的容器镜像存储和管理解决方案。Harbor 是开源的自托管仓库，具有企业级功能；GHCR 是 GitHub 的托管容器仓库，与 GitHub Packages 深度集成。本比较分析它们的功能、安全特性和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为自托管控制、企业级安全、多租户环境和隔离网络部署选择 Harbor。为无缝 GitHub 集成、简单性、GitHub Actions CI/CD 工作流和已投入 GitHub 生态的团队选择 GHCR。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Harbor 是开源且自托管的；GHCR 由 GitHub 完全托管',
    takeaway2: 'Harbor 提供高级安全扫描（Trivy、Clair、Notary）',
    takeaway3: 'GHCR 提供原生 GitHub Actions 和 Packages 集成',
    takeaway4: 'Harbor 支持多租户和基于角色的访问控制',
    takeaway5: 'GHCR 定价与 GitHub 存储和带宽绑定',
    takeaway6: 'Harbor 非常适合隔离网络和合规要求高的环境',
    
    whatIsHarborTitle: '什么是 Harbor？',
    whatIsHarborContent: 'Harbor 是由 VMware 开发的开源容器镜像仓库（现为 CNCF 毕业项目）。2016 年发布，提供企业级功能，包括漏洞扫描、内容信任、RBAC、复制和 Notary 支持。Harbor 可部署在本地或任何云环境。',
    
    whatIsGhcrTitle: '什么是 GitHub Container Registry？',
    whatIsGhcrContent: 'GitHub Container Registry (GHCR) 是 GitHub 于 2020 年推出的托管容器仓库。它与 GitHub Packages、GitHub Actions 和仓库权限无缝集成。GHCR 支持公开和私有镜像，细粒度访问控制，无需基础设施维护。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '仓库配置和使用：',
    
    harborExampleTitle: 'Harbor 配置',
    ghcrExampleTitle: 'GHCR 配置',
    
    dataSourceTitle: '集成支持',
    dataSourceIntro: '支持的平台和集成：',
    
    alertingTitle: '安全功能',
    alertingIntro: '安全和合规能力：',
    
    useCasesTitle: '最佳用例',
    harborBestFor: 'Harbor 最适合：',
    ghcrBestFor: 'GHCR 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Harbor 和 GHCR 在容器镜像仓库领域满足不同需求。Harbor 在自托管、企业和合规要求高的环境中表现出色，需要完全控制基础设施和高级安全功能。GHCR 非常适合与 GitHub 深度集成的团队，追求简单和无缝 CI/CD 工作流。许多组织同时使用两者：Harbor 用于内部、受监管的工作负载，GHCR 用于开源或公共项目。',
    
    faq1q: '可以从 GHCR 迁移到 Harbor 吗？',
    faq1a: '是的，可以使用 docker pull 和 push 命令或 skopeo 等工具迁移镜像。Harbor 还支持通过复制功能从包括 GHCR 在内的外部仓库导入镜像。',
    
    faq2q: '哪个更适合 Kubernetes 部署？',
    faq2a: '两者都与 Kubernetes 配合良好。Harbor 与 Helm charts 集成，为 Kubernetes 提供更好的企业功能。GHCR 与 GitHub Actions 无缝配合用于 CI/CD。根据现有基础设施和合规需求选择。',
    
    faq3q: '定价方面如何比较？',
    faq3a: 'Harbor 免费开源但需要基础设施成本。GHCR 对存储和带宽收费，公开镜像免费，有 GitHub packages 限制。对于大规模运营，Harbor 长期可能更具成本效益。',
    
    faq4q: 'Harbor 支持 OCI artifacts 吗？',
    faq4a: '是的，Harbor 支持 OCI artifacts，包括 Helm charts、CNAB 和其他 OCI 兼容内容。GHCR 也支持 OCI artifacts 和通过 OCI registries 的 Helm charts。',
    
    faq5q: '哪个安全扫描更好？',
    faq5a: 'Harbor 具有更全面的安全扫描，内置 Trivy 和 Clair 集成、漏洞数据库管理和 CVE 策略。GHCR 依赖外部扫描工具或 GitHub Advanced Security 进行容器扫描。',
    
    faq6q: '可以不用 GitHub Actions 使用 GHCR 吗？',
    faq6a: '是的，GHCR 可与任何 CI/CD 系统一起使用。可以使用标准 Docker 命令和 GitHub token 认证推送和拉取镜像。但最紧密的集成是与 GitHub Actions。',
    
    faq7q: '高可用性如何？',
    faq7a: 'GHCR 由 GitHub 完全托管，内置高可用性。Harbor 需要手动 HA 设置，包括数据库和 Redis 集群，但支持多实例部署和地理复制。',
    
    faq8q: '哪个更适合开源项目？',
    faq8a: 'GHCR 对开源项目非常出色，免费公开镜像托管和无缝 GitHub 集成。Harbor 也可以托管公开镜像，但更常用于私有、企业仓库。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function HarborVsGhcr({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4q } },
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

  const harborCode = '// Harbor docker-compose.yml configuration\n' +
    'version: \'2.3\'\n' +
    'services:\n' +
    '  core:\n' +
    '    image: goharbor/harbor-core:v2.8.0\n' +
    '    container_name: harbor-core\n' +
    '    env_file:\n' +
    '      - ./common/config/core/env\n' +
    '    volumes:\n' +
    '      - ./common/config/core/app.conf:/etc/core/app.conf\n' +
    '      - /data/secretkey:/etc/core/key\n' +
    '      - /data/ca_download:/etc/core/ca\n' +
    '    networks:\n' +
    '      - harbor\n' +
    '    depends_on:\n' +
    '      - redis\n' +
    '      - postgresql\n' +
    '      - registry\n' +
    '\n' +
    '  registry:\n' +
    '    image: goharbor/registry-photon:v2.8.0\n' +
    '    container_name: registry\n' +
    '    volumes:\n' +
    '      - /data/registry:/storage\n' +
    '      - ./common/config/registry/:/etc/registry/\n' +
    '    networks:\n' +
    '      - harbor\n' +
    '\n' +
    '  portal:\n' +
    '    image: goharbor/harbor-portal:v2.8.0\n' +
    '    container_name: harbor-portal\n' +
    '    networks:\n' +
    '      - harbor\n' +
    '\n' +
    '// Docker login to Harbor\n' +
    'docker login harbor.example.com\n' +
    '// Username: admin\n' +
    '// Password: Harbor12345\n' +
    '\n' +
    '// Push image to Harbor\n' +
    'docker tag myapp:v1.0 harbor.example.com/project/myapp:v1.0\n' +
    'docker push harbor.example.com/project/myapp:v1.0';

  const ghcrCode = '// GitHub Actions workflow for GHCR\n' +
    'name: Build and Push to GHCR\n' +
    '\n' +
    'on:\n' +
    '  push:\n' +
    '    branches: [main]\n' +
    '\n' +
    'jobs:\n' +
    '  build:\n' +
    '    runs-on: ubuntu-latest\n' +
    '    permissions:\n' +
    '      contents: read\n' +
    '      packages: write\n' +
    '\n' +
    '    steps:\n' +
    '      - uses: actions/checkout@v4\n' +
    '\n' +
    '      - name: Log in to GHCR\n' +
    '        uses: docker/login-action@v3\n' +
    '        with:\n' +
    '          registry: ghcr.io\n' +
    '          username: ${{ github.actor }}\n' +
    '          password: ${{ secrets.GITHUB_TOKEN }}\n' +
    '\n' +
    '      - name: Build and push\n' +
    '        uses: docker/build-push-action@v5\n' +
    '        with:\n' +
    '          context: .\n' +
    '          push: true\n' +
    '          tags: |\n' +
    '            ghcr.io/${{ github.repository }}:latest\n' +
    '            ghcr.io/${{ github.repository }}:${{ github.sha }}\n' +
    '\n' +
    '// Pull from GHCR\n' +
    'docker pull ghcr.io/owner/repo:latest\n' +
    '\n' +
    '// Login to GHCR with Personal Access Token\n' +
    'echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin';

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

      <h3 style={h3Style}>{ct.whatIsHarborTitle}</h3>
      <p style={pStyle}>{ct.whatIsHarborContent}</p>

      <h3 style={h3Style}>{ct.whatIsGhcrTitle}</h3>
      <p style={pStyle}>{ct.whatIsGhcrContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Harbor</th>
              <th style={thStyle}>GHCR</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '部署方式' : 'Deployment', isZh ? '自托管' : 'Self-hosted', isZh ? '完全托管' : 'Fully managed'],
              [isZh ? '开源' : 'Open Source', isZh ? '是 (CNCF)' : 'Yes (CNCF)', isZh ? '否' : 'No'],
              [isZh ? '安全扫描' : 'Security Scanning', isZh ? '内置 Trivy/Clair' : 'Built-in Trivy/Clair', isZh ? '外部工具' : 'External tools'],
              [isZh ? '访问控制' : 'Access Control', isZh ? 'RBAC 细粒度' : 'Fine-grained RBAC', isZh ? 'GitHub 权限' : 'GitHub permissions'],
              [isZh ? '高可用' : 'High Availability', isZh ? '手动配置' : 'Manual setup', isZh ? '内置' : 'Built-in'],
              [isZh ? 'Helm Charts' : 'Helm Charts', isZh ? '支持' : 'Supported', isZh ? 'OCI 支持' : 'OCI support'],
              [isZh ? '复制' : 'Replication', isZh ? '跨区域复制' : 'Cross-region', isZh ? '无' : 'None'],
              [isZh ? 'Notary 签名' : 'Notary Signing', isZh ? '支持' : 'Supported', isZh ? '不支持' : 'Not supported'],
            ].map(([feature, harbor, ghcr], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{harbor}</td>
                <td style={tdStyle}>{ghcr}</td>
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
              <th style={thStyle}>Harbor</th>
              <th style={thStyle}>GHCR</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '垃圾回收' : 'Garbage Collection', isZh ? '自动/手动' : 'Auto/Manual', isZh ? '自动' : 'Automatic'],
              [isZh ? 'Webhook' : 'Webhooks', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? 'API' : 'API', isZh ? 'RESTful 完整' : 'Full RESTful', isZh ? 'GraphQL/REST' : 'GraphQL/REST'],
              [isZh ? '配额管理' : 'Quota Management', isZh ? '支持' : 'Supported', isZh ? '限制' : 'Limited'],
              [isZh ? '标签保留' : 'Tag Retention', isZh ? '策略支持' : 'Policy support', isZh ? '限制' : 'Limited'],
              [isZh ? '代理缓存' : 'Proxy Cache', isZh ? '支持' : 'Supported', isZh ? '不支持' : 'Not supported'],
              [isZh ? '多架构镜像' : 'Multi-arch Images', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? 'SBOM' : 'SBOM', isZh ? '支持' : 'Supported', isZh ? 'GitHub 依赖图' : 'GitHub dependency graph'],
            ].map(([cap, harbor, ghcr], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{harbor}</td>
                <td style={tdStyle}>{ghcr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#60a5fa' }}>{ct.harborExampleTitle}</h3>
      <pre style={codeStyle}><code>{harborCode}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.ghcrExampleTitle}</h3>
      <pre style={codeStyle}><code>{ghcrCode}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '类别' : 'Category'}</th>
              <th style={thStyle}>Harbor</th>
              <th style={thStyle}>GHCR</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'CI/CD 集成' : 'CI/CD Integration', isZh ? 'Jenkins, GitLab, Tekton' : 'Jenkins, GitLab, Tekton', isZh ? 'GitHub Actions 原生' : 'GitHub Actions native'],
              [isZh ? 'Kubernetes' : 'Kubernetes', isZh ? 'Helm, Operator' : 'Helm, Operator', isZh ? 'Helm, kubectl' : 'Helm, kubectl'],
              [isZh ? '云平台' : 'Cloud Platforms', isZh ? 'AWS, Azure, GCP, vSphere' : 'AWS, Azure, GCP, vSphere', isZh ? 'Azure (GitHub)' : 'Azure (GitHub)'],
              [isZh ? '安全工具' : 'Security Tools', isZh ? 'Trivy, Clair, Notary, Sysdig' : 'Trivy, Clair, Notary, Sysdig', isZh ? 'Dependabot, CodeQL' : 'Dependabot, CodeQL'],
              [isZh ? '镜像签名' : 'Image Signing', isZh ? 'Notary, Cosign' : 'Notary, Cosign', isZh ? 'Cosign, Sigstore' : 'Cosign, Sigstore'],
            ].map(([cat, harbor, ghcr], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{harbor}</td>
                <td style={tdStyle}>{ghcr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #60a5fa' }}>
          <strong style={{ color: '#60a5fa' }}>Harbor Security</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '内置 Trivy 和 Clair 漏洞扫描，Notary 内容信任，镜像签名验证，CVE 策略阻止，漏洞数据库自动更新，合规报告生成。' : 'Built-in Trivy and Clair vulnerability scanning, Notary content trust, image signature verification, CVE blocking policies, automatic vulnerability DB updates, compliance report generation.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>GHCR Security</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'GitHub Advanced Security 集成，Dependabot 告警，细粒度访问控制，Token 权限管理，与 GitHub 安全功能联动。' : 'GitHub Advanced Security integration, Dependabot alerts, fine-grained access control, token permission management, integration with GitHub security features.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #60a5fa' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#60a5fa' }}>{ct.harborBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业级私有云' : 'Enterprise private cloud'}</li>
            <li>{isZh ? '隔离/气隙环境' : 'Air-gapped environments'}</li>
            <li>{isZh ? '多租户场景' : 'Multi-tenant scenarios'}</li>
            <li>{isZh ? '合规要求高' : 'High compliance requirements'}</li>
            <li>{isZh ? '跨区域复制' : 'Cross-region replication'}</li>
            <li>{isZh ? '镜像代理缓存' : 'Image proxy caching'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{ct.ghcrBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'GitHub Actions CI/CD' : 'GitHub Actions CI/CD'}</li>
            <li>{isZh ? '开源项目' : 'Open source projects'}</li>
            <li>{isZh ? '小型团队' : 'Small teams'}</li>
            <li>{isZh ? '快速部署' : 'Quick deployment'}</li>
            <li>{isZh ? 'GitHub 生态集成' : 'GitHub ecosystem integration'}</li>
            <li>{isZh ? '无需运维' : 'Zero maintenance'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/docker-compose-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Docker Compose Generator</a> • {' '}
        <a href={"/" + lang + "/tools/json-yaml"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON to YAML</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
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
