'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Velero vs K8up: Kubernetes Backup Tools Comparison',
    intro: 'Velero and K8up are two prominent Kubernetes backup solutions. Velero is the established standard from VMware, while K8up (from VSHN) focuses on cloud-native backup using Restic. This comparison examines their approaches, features, and ideal use cases for protecting Kubernetes workloads.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Velero for comprehensive cluster backup including etcd snapshots, broad cloud provider support, and disaster recovery. Choose K8up for application-native backups, Restic-based deduplication, and simple S3 storage. Velero is feature-complete; K8up excels at application backups.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Velero supports etcd snapshots and full cluster backup',
    takeaway2: 'K8up uses Restic for efficient incremental backups',
    takeaway3: 'Velero has broader cloud provider integration',
    takeaway4: 'K8up is simpler for application-level backups',
    takeaway5: 'Velero handles namespaces and cluster resources',
    takeaway6: 'K8up focuses on PVC and application data',
    
    whatIsVeleroTitle: 'What is Velero?',
    whatIsVeleroContent: 'Velero (formerly Heptio Ark) is an open-source backup and disaster recovery tool developed by VMware. Released in 2017, it provides backup, restore, and migration capabilities for Kubernetes clusters. Velero supports etcd snapshots, PVC backups, and can backup entire namespaces including all resources. It integrates with major cloud providers for storage.',
    
    whatIsK8upTitle: 'What is K8up?',
    whatIsK8upContent: 'K8up is a cloud-native backup operator developed by VSHN (now part of Appuio). Released in 2019, it implements backup using Restic and provides a Kubernetes-native way to backup PVCs and application data. K8up focuses on simplicity, efficiency with deduplication, and seamless integration with S3-compatible storage.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core backup capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Backup configuration and scheduling:',
    
    veleroExampleTitle: 'Velero Configuration',
    k8upExampleTitle: 'K8up Configuration',
    
    dataSourceTitle: 'Storage Support',
    dataSourceIntro: 'Supported backup storage backends:',
    
    alertingTitle: 'Backup Scope',
    alertingIntro: 'What can be backed up:',
    
    useCasesTitle: 'Best Use Cases',
    veleroBestFor: 'Velero is Best For:',
    k8upBestFor: 'K8up is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Velero and K8up serve complementary but overlapping needs. Velero is the comprehensive solution for full cluster backups, disaster recovery, and migration scenarios with broad cloud provider support. K8up excels at efficient, application-level backups with Restic deduplication for cost-effective long-term storage. Many organizations use Velero for cluster-level DR and K8up for frequent application data backups.',
    
    faq1q: 'Can I use both Velero and K8up together?',
    faq1a: 'Yes, they can coexist. Use Velero for cluster-level disaster recovery and etcd snapshots. Use K8up for frequent application data backups. They backup different scopes and don\'t conflict.',
    
    faq2q: 'Which is better for disaster recovery?',
    faq2a: 'Velero is better for full disaster recovery as it can backup entire clusters, etcd, and all Kubernetes resources. K8up focuses on application data and PVCs, requiring more setup for full cluster recovery.',
    
    faq3q: 'How do they handle large PVCs?',
    faq3a: 'Velero uses restic or cloud provider snapshots for PVCs. K8up uses Restic with deduplication, making it efficient for large datasets with incremental changes. Both can handle large PVCs but K8up may be more storage-efficient.',
    
    faq4q: 'What about backup scheduling?',
    faq4a: 'Velero supports cron-based schedules with retention policies. K8up uses Kubernetes Schedule CRDs with more flexible scheduling options. Both support automated daily/weekly/monthly backups.',
    
    faq5q: 'How do they compare on restore speed?',
    faq5a: 'Velero restores are straightforward for cluster resources. For PVCs, speed depends on storage backend. K8up restores require Restic operations, which can be slower for large datasets but benefit from deduplication during backup.',
    
    faq6q: 'Which has better cloud provider support?',
    faq6a: 'Velero has native plugins for AWS, Azure, GCP, and vSphere with snapshot support. K8up works with any S3-compatible storage. Velero has broader enterprise cloud integration.',
    
    faq7q: 'What about backup encryption?',
    faq7a: 'Both support encryption. Velero encrypts using restic or cloud provider features. K8up uses Restic\'s built-in encryption with password-based keys. Both provide secure backup storage.',
    
    faq8q: 'Which is easier to operate?',
    faq8a: 'K8up is simpler for basic PVC backups with minimal configuration. Velero requires more setup but provides more features. For simple backup needs, K8up has lower operational complexity.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Velero vs K8up：Kubernetes 备份工具对比',
    intro: 'Velero 和 K8up 是两个突出的 Kubernetes 备份解决方案。Velero 是 VMware 的既定标准，而 K8up（来自 VSHN）专注于使用 Restic 的云原生备份。本比较考察它们保护 Kubernetes 工作负载的方法、功能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为包括 etcd 快照、广泛云提供者支持和灾难恢复的综合集群备份选择 Velero。为应用原生备份、基于 Restic 的去重和简单 S3 存储选择 K8up。Velero 功能完整；K8up 在应用备份方面出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Velero 支持 etcd 快照和完整集群备份',
    takeaway2: 'K8up 使用 Restic 实现高效增量备份',
    takeaway3: 'Velero 有更广泛的云提供者集成',
    takeaway4: 'K8up 对应用级备份更简单',
    takeaway5: 'Velero 处理命名空间和集群资源',
    takeaway6: 'K8up 专注于 PVC 和应用数据',
    
    whatIsVeleroTitle: '什么是 Velero？',
    whatIsVeleroContent: 'Velero（原名 Heptio Ark）是由 VMware 开发的开源备份和灾难恢复工具。2017 年发布，它为 Kubernetes 集群提供备份、恢复和迁移功能。Velero 支持 etcd 快照、PVC 备份，可以备份整个命名空间包括所有资源。它与主要云提供者集成用于存储。',
    
    whatIsK8upTitle: '什么是 K8up？',
    whatIsK8upContent: 'K8up 是由 VSHN（现为 Appuio 的一部分）开发的云原生备份操作器。2019 年发布，它使用 Restic 实现备份，提供 Kubernetes 原生方式备份 PVC 和应用数据。K8up 专注于简单性、去重效率和与 S3 兼容存储的无缝集成。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心备份功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '备份配置和调度：',
    
    veleroExampleTitle: 'Velero 配置',
    k8upExampleTitle: 'K8up 配置',
    
    dataSourceTitle: '存储支持',
    dataSourceIntro: '支持的备份存储后端：',
    
    alertingTitle: '备份范围',
    alertingIntro: '可以备份什么：',
    
    useCasesTitle: '最佳用例',
    veleroBestFor: 'Velero 最适合：',
    k8upBestFor: 'K8up 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Velero 和 K8up 服务于互补但有重叠的需求。Velero 是完整集群备份、灾难恢复和迁移场景的综合解决方案，具有广泛的云提供者支持。K8up 在高效、应用级备份方面出色，使用 Restic 去重实现成本效益的长期存储。许多组织使用 Velero 进行集群级 DR，使用 K8up 进行频繁的应用数据备份。',
    
    faq1q: '我可以同时使用 Velero 和 K8up 吗？',
    faq1a: '可以，它们可以共存。使用 Velero 进行集群级灾难恢复和 etcd 快照。使用 K8up 进行频繁的应用数据备份。它们备份不同的范围，不会冲突。',
    
    faq2q: '哪个更适合灾难恢复？',
    faq2a: 'Velero 更适合完整灾难恢复，因为它可以备份整个集群、etcd 和所有 Kubernetes 资源。K8up 专注于应用数据和 PVC，完整集群恢复需要更多设置。',
    
    faq3q: '它们如何处理大型 PVC？',
    faq3a: 'Velero 使用 restic 或云提供者快照处理 PVC。K8up 使用带去重的 Restic，对于有增量变化的大型数据集很高效。两者都可以处理大型 PVC，但 K8up 可能更节省存储。',
    
    faq4q: '备份调度怎么样？',
    faq4a: 'Velero 支持基于 cron 的调度和保留策略。K8up 使用 Kubernetes Schedule CRD 提供更灵活的调度选项。两者都支持自动日/周/月备份。',
    
    faq5q: '它们在恢复速度方面如何比较？',
    faq5a: 'Velero 对集群资源的恢复很简单。对于 PVC，速度取决于存储后端。K8up 恢复需要 Restic 操作，对于大型数据集可能较慢，但在备份期间受益于去重。',
    
    faq6q: '哪个云提供者支持更好？',
    faq6a: 'Velero 有 AWS、Azure、GCP 和 vSphere 的原生插件支持快照。K8up 与任何 S3 兼容存储配合工作。Velero 有更广泛的企业云集成。',
    
    faq7q: '备份加密怎么样？',
    faq7a: '两者都支持加密。Velero 使用 restic 或云提供者功能加密。K8up 使用 Restic 内置的基于密码的加密。两者都提供安全的备份存储。',
    
    faq8q: '哪个更容易运维？',
    faq8a: 'K8up 对于基本 PVC 备份更简单，配置最少。Velero 需要更多设置但提供更多功能。对于简单备份需求，K8up 运维复杂性更低。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function VeleroVsK8up({ lang }: { lang: string }) {
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
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#f59e0b' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #f59e0b', background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(34,197,94,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsVeleroTitle}</h3>
      <p style={pStyle}>{ct.whatIsVeleroContent}</p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.whatIsK8upTitle}</h3>
      <p style={pStyle}>{ct.whatIsK8upContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Velero</th>
              <th style={thStyle}>K8up</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '开发者' : 'Developer', 'VMware', 'VSHN/Appuio'],
              [isZh ? '备份引擎' : 'Backup Engine', 'Restic + Cloud snapshots', 'Restic'],
              [isZh ? '集群资源备份' : 'Cluster Resources', isZh ? '支持' : 'Supported', isZh ? '有限' : 'Limited'],
              [isZh ? 'PVC 备份' : 'PVC Backup', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? 'etcd 快照' : 'etcd Snapshots', isZh ? '支持' : 'Supported', isZh ? '不支持' : 'No'],
              [isZh ? '去重' : 'Deduplication', isZh ? '通过 Restic' : 'Via Restic', isZh ? '内置（Restic）' : 'Built-in (Restic)'],
              [isZh ? '迁移支持' : 'Migration', isZh ? '完整支持' : 'Full support', isZh ? '不支持' : 'No'],
              [isZh ? '云集成' : 'Cloud Integration', isZh ? '广泛' : 'Extensive', isZh ? 'S3 兼容' : 'S3-compatible'],
            ].map(([feature, velero, k8up], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{velero}</td>
                <td style={tdStyle}>{k8up}</td>
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
              <th style={thStyle}>Velero</th>
              <th style={thStyle}>K8up</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '命名空间备份' : 'Namespace Backup', isZh ? '支持' : 'Supported', isZh ? '不支持' : 'No'],
              [isZh ? '选择性备份' : 'Selective Backup', isZh ? '标签选择器' : 'Label selectors', isZh ? '注解' : 'Annotations'],
              [isZh ? '调度' : 'Scheduling', 'Cron schedules', 'Schedule CRD'],
              [isZh ? '保留策略' : 'Retention', 'TTL-based', isZh ? '可配置' : 'Configurable'],
              [isZh ? '钩子' : 'Hooks', 'Pre/post hooks', 'Pre/post commands'],
              [isZh ? '加密' : 'Encryption', isZh ? '支持' : 'Supported', isZh ? 'Restic 加密' : 'Restic encryption'],
              [isZh ? '压缩' : 'Compression', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '状态监控' : 'Status Monitoring', isZh ? 'CRD 状态' : 'CRD status', isZh ? 'Prometheus 指标' : 'Prometheus metrics'],
            ].map(([cap, velero, k8up], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{velero}</td>
                <td style={tdStyle}>{k8up}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.veleroExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Velero Installation
velero install \\
  --provider aws \\
  --plugins velero/velero-plugin-for-aws:v1.7.0 \\
  --bucket velero-backups \\
  --secret-file ./credentials-velero \\
  --backup-location-config region=us-west-2 \\
  --snapshot-location-config region=us-west-2

# Velero Backup Schedule
apiVersion: velero.io/v1
kind: Schedule
metadata:
  name: daily-backup
  namespace: velero
spec:
  schedule: "0 2 * * *"
  template:
    includedNamespaces:
    - production
    - staging
    excludedResources:
    - events
    - pods
    storageLocation: default
    volumeSnapshotLocations:
    - aws-snapshots
    ttl: 720h  # 30 days
    hooks:
      resources:
      - name: pre-backup-hook
        includedNamespaces:
        - production
        labelSelector:
          matchLabels:
            app: database
        pre:
        - exec:
            container: postgres
            command:
            - /bin/bash
            - -c
            - "pg_dump -U postgres > /backup/dump.sql"
            onError: Continue

# Velero On-Demand Backup
velero backup create prod-backup \\
  --include-namespaces production \\
  --snapshot-volumes

# Velero Restore
velero restore create --from-backup prod-backup

# Velero Backup for Migration
velero backup create migration-backup \\
  --include-namespaces app1,app2 \\
  --snapshot-volumes=false

# Restore to different cluster
velero restore create --from-backup migration-backup \\
  --namespace-mappings app1:app1-new`}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.k8upExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# K8up Installation (using Helm)
helm repo add appuio https://charts.appuio.ch
helm install k8up appuio/k8up \\
  --namespace k8up \\
  --create-namespace \\
  --set image.tag=v0.2.0

# K8up Schedule (Global)
apiVersion: backup.appuio.ch/v1alpha1
kind: Schedule
metadata:
  name: daily-backup
  namespace: production
spec:
  backend:
    s3:
      endpoint: https://s3.amazonaws.com
      bucket: k8up-backups
      accessKeyIDSecretRef:
        name: backup-credentials
        key: AWS_ACCESS_KEY_ID
      secretAccessKeySecretRef:
        name: backup-credentials
        key: AWS_SECRET_ACCESS_KEY
  backup:
    schedule: '0 2 * * *'
    keepJobs: 4
    promURL: http://prometheus:9090
  check:
    schedule: '0 4 * * 0'  # Weekly check
  prune:
    schedule: '0 3 * * *'
    retention:
      keepLast: 5
      keepDaily: 14
      keepWeekly: 8
      keepMonthly: 12

# K8up Backup for specific PVC
apiVersion: backup.appuio.ch/v1alpha1
kind: Backup
metadata:
  name: manual-backup
  namespace: production
spec:
  backend:
    s3:
      endpoint: https://s3.amazonaws.com
      bucket: k8up-backups
  promURL: http://prometheus:9090

# K8up Restore
apiVersion: backup.appuio.ch/v1alpha1
kind: Restore
metadata:
  name: restore-app
  namespace: production
spec:
  backend:
    s3:
      endpoint: https://s3.amazonaws.com
      bucket: k8up-backups
  restoreMethod:
    s3:
      endpoint: https://s3.amazonaws.com
      bucket: k8up-restored
  snapshot: latest

# Archive Backup (long-term storage)
apiVersion: backup.appuio.ch/v1alpha1
kind: Archive
metadata:
  name: monthly-archive
spec:
  backend:
    s3:
      endpoint: https://s3.amazonaws.com
      bucket: k8up-archives
  schedule: '0 0 1 * *'  # Monthly`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '存储后端' : 'Storage Backend'}</th>
              <th style={thStyle}>Velero</th>
              <th style={thStyle}>K8up</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['AWS S3', isZh ? '原生支持 + 快照' : 'Native + snapshots', isZh ? 'S3 兼容' : 'S3-compatible'],
              ['Azure Blob', isZh ? '原生支持 + 快照' : 'Native + snapshots', isZh ? 'S3 兼容' : 'S3-compatible'],
              ['GCP Storage', isZh ? '原生支持 + 快照' : 'Native + snapshots', isZh ? 'S3 兼容' : 'S3-compatible'],
              ['vSphere', isZh ? '原生支持' : 'Native support', isZh ? '不支持' : 'No'],
              ['MinIO', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              ['Local/ NFS', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
            ].map(([backend, velero, k8up], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{backend}</td>
                <td style={tdStyle}>{velero}</td>
                <td style={tdStyle}>{k8up}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Velero Backup Scope</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '完整集群备份：包括 etcd 快照、所有 Kubernetes 资源（Deployments、Services、ConfigMaps、Secrets 等）、PVC、命名空间。支持跨集群迁移。适合灾难恢复场景。' : 'Full cluster backup: includes etcd snapshots, all Kubernetes resources (Deployments, Services, ConfigMaps, Secrets, etc.), PVCs, namespaces. Supports cross-cluster migration. Ideal for disaster recovery scenarios.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>K8up Backup Scope</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '应用级备份：专注于 PVC 数据和应用文件。使用注解选择要备份的 PVC。Restic 去重减少存储成本。不备份 Kubernetes 元数据。适合频繁数据备份。' : 'Application-level backup: focuses on PVC data and application files. Uses annotations to select PVCs for backup. Restic deduplication reduces storage costs. Does not backup Kubernetes metadata. Ideal for frequent data backups.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.veleroBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '完整集群灾难恢复' : 'Full cluster disaster recovery'}</li>
            <li>{isZh ? '跨集群迁移' : 'Cross-cluster migration'}</li>
            <li>{isZh ? 'etcd 备份' : 'etcd backup'}</li>
            <li>{isZh ? '多云环境' : 'Multi-cloud environments'}</li>
            <li>{isZh ? '企业级需求' : 'Enterprise requirements'}</li>
            <li>{isZh ? '命名空间级备份' : 'Namespace-level backup'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{ct.k8upBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '应用数据备份' : 'Application data backup'}</li>
            <li>{isZh ? '频繁 PVC 备份' : 'Frequent PVC backups'}</li>
            <li>{isZh ? '成本敏感存储' : 'Cost-sensitive storage'}</li>
            <li>{isZh ? '简单备份需求' : 'Simple backup needs'}</li>
            <li>{isZh ? 'Restic 用户' : 'Restic users'}</li>
            <li>{isZh ? 'S3 兼容存储' : 'S3-compatible storage'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(34,197,94,0.1))', borderRadius: 12, border: '1px solid rgba(245,158,11,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#f59e0b', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/yaml-formatter"} style={{ color: '#f59e0b', textDecoration: 'none' }}>YAML Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#f59e0b', textDecoration: 'none' }}>Base64 Encoder</a>
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