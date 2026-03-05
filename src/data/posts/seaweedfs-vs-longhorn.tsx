'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'SeaweedFS vs Longhorn: Distributed Storage Comparison',
    intro: 'SeaweedFS and Longhorn are two popular distributed storage solutions for cloud-native environments. SeaweedFS is a fast distributed storage system for blobs, objects, and files, while Longhorn is a Kubernetes-native distributed block storage system. This comparison examines their architecture, performance, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose SeaweedFS for high-performance object/blob storage, large file handling, and S3-compatible storage needs. Choose Longhorn for Kubernetes-native block storage, persistent volumes, and stateful workloads requiring CSI integration.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'SeaweedFS excels at object/blob storage with S3 compatibility',
    takeaway2: 'Longhorn is built specifically for Kubernetes CSI block storage',
    takeaway3: 'SeaweedFS supports billions of files with fast access',
    takeaway4: 'Longhorn provides built-in backup, snapshot, and disaster recovery',
    takeaway5: 'SeaweedFS offers better performance for large-scale file storage',
    takeaway6: 'Longhorn integrates natively with Kubernetes storage primitives',
    
    whatIsSeaweedfsTitle: 'What is SeaweedFS?',
    whatIsSeaweedfsContent: 'SeaweedFS is an open-source distributed storage system originally created by Chris Lu. It is designed to store and serve billions of files efficiently. SeaweedFS supports multiple storage backends including local disk, S3, and cloud storage. It provides S3-compatible API, FUSE mount, and Hadoop-compatible interface.',
    
    whatIsLonghornTitle: 'What is Longhorn?',
    whatIsLonghornContent: 'Longhorn is a Kubernetes-native distributed block storage system developed by Rancher Labs (now SUSE). It provides persistent storage for Kubernetes clusters using local disks. Longhorn offers built-in backup to S3/NFS, snapshots, disaster recovery, and automatic replication. It implements the CSI (Container Storage Interface) specification.',
    
    performanceTitle: 'Architecture Comparison',
    performanceIntro: 'Comparing core architecture and capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Storage configuration and deployment:',
    
    seaweedfsExampleTitle: 'SeaweedFS Configuration',
    longhornExampleTitle: 'Longhorn Configuration',
    
    dataSourceTitle: 'Protocol Support',
    dataSourceIntro: 'Supported protocols and interfaces:',
    
    alertingTitle: 'Data Management',
    alertingIntro: 'Data protection and management capabilities:',
    
    useCasesTitle: 'Best Use Cases',
    seaweedfsBestFor: 'SeaweedFS is Best For:',
    longhornBestFor: 'Longhorn is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'SeaweedFS and Longhorn serve different storage needs in cloud-native environments. SeaweedFS excels at object and blob storage with S3 compatibility, ideal for media files, backups, and large-scale file storage. Longhorn is purpose-built for Kubernetes block storage, perfect for databases, stateful applications, and persistent volumes. Many organizations use both: SeaweedFS for object storage and Longhorn for Kubernetes persistent storage.',
    
    faq1q: 'Can I use SeaweedFS as PersistentVolume in Kubernetes?',
    faq1a: 'Yes, SeaweedFS can be used as Kubernetes storage through its CSI driver or FUSE mount. However, it is optimized for object/blob storage rather than block storage. For databases and stateful applications, Longhorn or other block storage solutions may be more appropriate.',
    
    faq2q: 'Which is better for databases?',
    faq2a: 'Longhorn is better for databases and stateful applications requiring block storage with low latency and consistent I/O performance. SeaweedFS is optimized for object storage and may not provide the consistency guarantees needed for database workloads.',
    
    faq3q: 'How do they compare on scalability?',
    faq3a: 'SeaweedFS is designed for billions of files and can scale horizontally with multiple volume servers. Longhorn scales with Kubernetes nodes and is limited by the number of available nodes and their storage capacity. SeaweedFS generally handles larger file counts better.',
    
    faq4q: 'Does Longhorn support object storage?',
    faq4a: 'No, Longhorn is specifically a block storage solution. It does not provide object storage or S3 compatibility. For object storage needs alongside Longhorn, you would need a separate solution like SeaweedFS, MinIO, or S3.',
    
    faq5q: 'What about backup and disaster recovery?',
    faq5a: 'Both support backup to S3. Longhorn has built-in backup and disaster recovery features with scheduled backups and cross-cluster replication. SeaweedFS supports replication and can replicate to cloud storage but has less sophisticated disaster recovery orchestration.',
    
    faq6q: 'Which is easier to operate?',
    faq6a: 'Longhorn is easier for Kubernetes-native operations with a built-in UI and Kubernetes integration. SeaweedFS requires more manual configuration but offers more flexibility for non-Kubernetes environments. Both have good documentation and community support.',
    
    faq7q: 'How do they handle node failures?',
    faq7a: 'Longhorn replicates volumes across nodes and automatically rebuilds replicas when nodes fail. SeaweedFS uses replication at the volume level and can continue serving data from surviving replicas. Both provide good fault tolerance.',
    
    faq8q: 'Can they be used together?',
    faq8a: 'Yes, many organizations use both together. Use Longhorn for Kubernetes persistent volumes (databases, application data) and SeaweedFS for object storage (images, videos, backups, logs). They complement each other well in a comprehensive storage strategy.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'SeaweedFS vs Longhorn：分布式存储对比',
    intro: 'SeaweedFS 和 Longhorn 是云原生环境中两个流行的分布式存储解决方案。SeaweedFS 是快速的分布式存储系统，用于 blob、对象和文件；Longhorn 是 Kubernetes 原生的分布式块存储系统。本比较分析它们的架构、性能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为高性能对象/blob 存储、大文件处理和 S3 兼容存储需求选择 SeaweedFS。为 Kubernetes 原生块存储、持久卷和需要 CSI 集成的有状态工作负载选择 Longhorn。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'SeaweedFS 在对象/blob 存储和 S3 兼容性方面表现出色',
    takeaway2: 'Longhorn 专为 Kubernetes CSI 块存储构建',
    takeaway3: 'SeaweedFS 支持数十亿文件的快速访问',
    takeaway4: 'Longhorn 提供内置备份、快照和灾难恢复',
    takeaway5: 'SeaweedFS 为大规模文件存储提供更好的性能',
    takeaway6: 'Longhorn 与 Kubernetes 存储原语原生集成',
    
    whatIsSeaweedfsTitle: '什么是 SeaweedFS？',
    whatIsSeaweedfsContent: 'SeaweedFS 是由 Chris Lu 创建的开源分布式存储系统。它设计用于高效存储和提供数十亿文件。SeaweedFS 支持多种存储后端，包括本地磁盘、S3 和云存储。它提供 S3 兼容 API、FUSE 挂载和 Hadoop 兼容接口。',
    
    whatIsLonghornTitle: '什么是 Longhorn？',
    whatIsLonghornContent: 'Longhorn 是由 Rancher Labs（现为 SUSE）开发的 Kubernetes 原生分布式块存储系统。它使用本地磁盘为 Kubernetes 集群提供持久存储。Longhorn 提供内置备份到 S3/NFS、快照、灾难恢复和自动复制功能。它实现了 CSI（容器存储接口）规范。',
    
    performanceTitle: '架构对比',
    performanceIntro: '比较核心架构和功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '存储配置和部署：',
    
    seaweedfsExampleTitle: 'SeaweedFS 配置',
    longhornExampleTitle: 'Longhorn 配置',
    
    dataSourceTitle: '协议支持',
    dataSourceIntro: '支持的协议和接口：',
    
    alertingTitle: '数据管理',
    alertingIntro: '数据保护和管理能力：',
    
    useCasesTitle: '最佳用例',
    seaweedfsBestFor: 'SeaweedFS 最适合：',
    longhornBestFor: 'Longhorn 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'SeaweedFS 和 Longhorn 在云原生环境中满足不同的存储需求。SeaweedFS 在对象和 blob 存储方面表现出色，具有 S3 兼容性，非常适合媒体文件、备份和大规模文件存储。Longhorn 专为 Kubernetes 块存储构建，非常适合数据库、有状态应用和持久卷。许多组织同时使用两者：SeaweedFS 用于对象存储，Longhorn 用于 Kubernetes 持久存储。',
    
    faq1q: '可以在 Kubernetes 中将 SeaweedFS 用作 PersistentVolume 吗？',
    faq1a: '是的，SeaweedFS 可以通过其 CSI 驱动或 FUSE 挂载用作 Kubernetes 存储。但是，它针对对象/blob 存储而非块存储进行了优化。对于数据库和有状态应用，Longhorn 或其他块存储解决方案可能更合适。',
    
    faq2q: '哪个更适合数据库？',
    faq2a: 'Longhorn 更适合需要块存储、低延迟和一致 I/O 性能的数据库和有状态应用。SeaweedFS 针对对象存储进行了优化，可能无法提供数据库工作负载所需的一致性保证。',
    
    faq3q: '可扩展性如何比较？',
    faq3a: 'SeaweedFS 设计用于数十亿文件，可以通过多个卷服务器水平扩展。Longhorn 随 Kubernetes 节点扩展，受可用节点数量及其存储容量限制。SeaweedFS 通常更好地处理更大的文件数量。',
    
    faq4q: 'Longhorn 支持对象存储吗？',
    faq4a: '不，Longhorn 专门是块存储解决方案。它不提供对象存储或 S3 兼容性。对于 Longhorn 之外的对象存储需求，需要单独的解决方案，如 SeaweedFS、MinIO 或 S3。',
    
    faq5q: '备份和灾难恢复如何？',
    faq5a: '两者都支持备份到 S3。Longhorn 具有内置备份和灾难恢复功能，支持计划备份和跨集群复制。SeaweedFS 支持复制并可以复制到云存储，但灾难恢复编排不那么复杂。',
    
    faq6q: '哪个更容易运维？',
    faq6a: 'Longhorn 对 Kubernetes 原生操作更容易，具有内置 UI 和 Kubernetes 集成。SeaweedFS 需要更多手动配置，但为非 Kubernetes 环境提供更多灵活性。两者都有良好的文档和社区支持。',
    
    faq7q: '它们如何处理节点故障？',
    faq7a: 'Longhorn 在节点间复制卷，并在节点故障时自动重建副本。SeaweedFS 在卷级别使用复制，可以从存活的副本继续提供数据。两者都提供良好的容错能力。',
    
    faq8q: '可以一起使用吗？',
    faq8a: '是的，许多组织同时使用两者。使用 Longhorn 进行 Kubernetes 持久卷（数据库、应用数据），使用 SeaweedFS 进行对象存储（图像、视频、备份、日志）。它们在综合存储策略中相互补充得很好。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function SeaweedfsVsLonghorn({ lang }: { lang: string }) {
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

  const seaweedfsCode = '// SeaweedFS Docker Compose deployment\n' +
    'version: \'3\'\n' +
    'services:\n' +
    '  master:\n' +
    '    image: chrislusf/seaweedfs:latest\n' +
    '    command: master -ip=master -port=9333\n' +
    '    ports:\n' +
    '      - "9333:9333"\n' +
    '    volumes:\n' +
    '      - ./data/master:/data\n' +
    '\n' +
    '  volume:\n' +
    '    image: chrislusf/seaweedfs:latest\n' +
    '    command: volume -mserver=master:9333 -port=8080 -dir=/data\n' +
    '    ports:\n' +
    '      - "8080:8080"\n' +
    '    volumes:\n' +
    '      - ./data/volume:/data\n' +
    '    depends_on:\n' +
    '      - master\n' +
    '\n' +
    '  filer:\n' +
    '    image: chrislusf/seaweedfs:latest\n' +
    '    command: filer -master=master:9333 -port=8888\n' +
    '    ports:\n' +
    '      - "8888:8888"\n' +
    '    depends_on:\n' +
    '      - master\n' +
    '\n' +
    '  s3:\n' +
    '    image: chrislusf/seaweedfs:latest\n' +
    '    command: s3 -filer=filer:8888 -port=8333\n' +
    '    ports:\n' +
    '      - "8333:8333"\n' +
    '    depends_on:\n' +
    '      - filer\n' +
    '\n' +
    '// AWS CLI with SeaweedFS S3\n' +
    'aws --endpoint-url http://localhost:8333 s3 ls\n' +
    'aws --endpoint-url http://localhost:8333 s3 mb s3://mybucket\n' +
    'aws --endpoint-url http://localhost:8333 s3 cp file.txt s3://mybucket/';

  const longhornCode = '// Longhorn Kubernetes deployment\n' +
    'kubectl apply -f https://raw.githubusercontent.com/longhorn/longhorn/v1.5.0/deploy/longhorn.yaml\n' +
    '\n' +
    '// Check Longhorn pods\n' +
    'kubectl -n longhorn-system get pods\n' +
    '\n' +
    '// StorageClass for Longhorn\n' +
    'apiVersion: storage.k8s.io/v1\n' +
    'kind: StorageClass\n' +
    'metadata:\n' +
    '  name: longhorn\n' +
    'provisioner: driver.longhorn.io\n' +
    'allowVolumeExpansion: true\n' +
    'parameters:\n' +
    '  numberOfReplicas: "3"\n' +
    '  staleReplicaTimeout: "2880"\n' +
    '  fromBackup: ""\n' +
    '\n' +
    '// PersistentVolumeClaim\n' +
    'apiVersion: v1\n' +
    'kind: PersistentVolumeClaim\n' +
    'metadata:\n' +
    '  name: mysql-pvc\n' +
    'spec:\n' +
    '  accessModes:\n' +
    '    - ReadWriteOnce\n' +
    '  storageClassName: longhorn\n' +
    '  resources:\n' +
    '    requests:\n' +
    '      storage: 10Gi\n' +
    '\n' +
    '// Backup configuration\n' +
    'apiVersion: longhorn.io/v1beta2\n' +
    'kind: BackupTarget\n' +
    'metadata:\n' +
    '  name: s3-backup\n' +
    '  namespace: longhorn-system\n' +
    'spec:\n' +
    '  backupTargetURL: "s3://backup-bucket@region/"\n' +
    '  credentialSecret: s3-credentials';

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

      <h3 style={h3Style}>{ct.whatIsSeaweedfsTitle}</h3>
      <p style={pStyle}>{ct.whatIsSeaweedfsContent}</p>

      <h3 style={h3Style}>{ct.whatIsLonghornTitle}</h3>
      <p style={pStyle}>{ct.whatIsLonghornContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>SeaweedFS</th>
              <th style={thStyle}>Longhorn</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '存储类型' : 'Storage Type', isZh ? '对象/Blob' : 'Object/Blob', isZh ? '块存储' : 'Block'],
              [isZh ? 'Kubernetes 原生' : 'Kubernetes Native', isZh ? '支持' : 'Supported', isZh ? '原生' : 'Native'],
              [isZh ? 'CSI 驱动' : 'CSI Driver', isZh ? '支持' : 'Supported', isZh ? '原生' : 'Native'],
              [isZh ? 'S3 API' : 'S3 API', isZh ? '完全兼容' : 'Full compatible', isZh ? '仅备份' : 'Backup only'],
              [isZh ? '分布式架构' : 'Distributed', isZh ? 'Master-Volume' : 'Master-Volume', isZh ? '分布式副本' : 'Distributed replicas'],
              [isZh ? '文件数量' : 'File Count', isZh ? '数十亿' : 'Billions', isZh ? '受限于卷大小' : 'Limited by volume size'],
              [isZh ? '复制' : 'Replication', isZh ? '可配置' : 'Configurable', isZh ? '自动副本' : 'Auto replicas'],
              [isZh ? '快照' : 'Snapshots', isZh ? '支持' : 'Supported', isZh ? '内置定时' : 'Built-in scheduled'],
            ].map(([feature, seaweedfs, longhorn], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{seaweedfs}</td>
                <td style={tdStyle}>{longhorn}</td>
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
              <th style={thStyle}>SeaweedFS</th>
              <th style={thStyle}>Longhorn</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Web UI' : 'Web UI', isZh ? 'Filer UI' : 'Filer UI', isZh ? '完整仪表盘' : 'Full dashboard'],
              [isZh ? '备份' : 'Backup', isZh ? '复制到云' : 'Replicate to cloud', isZh ? 'S3/NFS 定时' : 'S3/NFS scheduled'],
              [isZh ? '灾难恢复' : 'Disaster Recovery', isZh ? '手动' : 'Manual', isZh ? '内置' : 'Built-in'],
              [isZh ? '加密' : 'Encryption', isZh ? '传输加密' : 'Transit encryption', isZh ? '静态+传输' : 'At-rest + transit'],
              [isZh ? '压缩' : 'Compression', isZh ? '支持' : 'Supported', isZh ? '否' : 'No'],
              [isZh ? '去重' : 'Deduplication', isZh ? '支持' : 'Supported', isZh ? '否' : 'No'],
              [isZh ? '多租户' : 'Multi-tenancy', isZh ? '有限' : 'Limited', isZh ? '命名空间隔离' : 'Namespace isolated'],
              [isZh ? '卷扩展' : 'Volume Expansion', isZh ? '动态' : 'Dynamic', isZh ? '在线扩展' : 'Online expansion'],
            ].map(([cap, seaweedfs, longhorn], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{seaweedfs}</td>
                <td style={tdStyle}>{longhorn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#10b981' }}>{ct.seaweedfsExampleTitle}</h3>
      <pre style={codeStyle}><code>{seaweedfsCode}</code></pre>

      <h3 style={{ ...h3Style, color: '#6366f1' }}>{ct.longhornExampleTitle}</h3>
      <pre style={codeStyle}><code>{longhornCode}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '类别' : 'Category'}</th>
              <th style={thStyle}>SeaweedFS</th>
              <th style={thStyle}>Longhorn</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'S3 API' : 'S3 API', isZh ? '完全兼容' : 'Full compatible', isZh ? '仅备份目标' : 'Backup target only'],
              [isZh ? 'FUSE 挂载' : 'FUSE Mount', isZh ? '支持' : 'Supported', isZh ? '不支持' : 'Not supported'],
              [isZh ? 'HDFS' : 'HDFS', isZh ? '兼容' : 'Compatible', isZh ? '不支持' : 'Not supported'],
              [isZh ? 'CSI' : 'CSI', isZh ? '有驱动' : 'Driver available', isZh ? '原生实现' : 'Native implementation'],
              [isZh ? 'NFS' : 'NFS', isZh ? '通过 Filer' : 'Via Filer', isZh ? '不支持' : 'Not supported'],
              [isZh ? 'WebDAV' : 'WebDAV', isZh ? '支持' : 'Supported', isZh ? '不支持' : 'Not supported'],
            ].map(([cat, seaweedfs, longhorn], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{seaweedfs}</td>
                <td style={tdStyle}>{longhorn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #10b981' }}>
          <strong style={{ color: '#10b981' }}>SeaweedFS Data Management</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '可配置复制因子，支持纠删码，云存储分层，自动容量平衡，跨集群复制，数据压缩和去重。' : 'Configurable replication factor, erasure coding support, cloud storage tiering, automatic capacity balancing, cross-cluster replication, data compression and deduplication.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #6366f1' }}>
          <strong style={{ color: '#6366f1' }}>Longhorn Data Management</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '自动副本重建，定时快照，备份到 S3/NFS，灾难恢复编排，卷加密，存储超额配置，自动扩容。' : 'Automatic replica rebuilding, scheduled snapshots, backup to S3/NFS, disaster recovery orchestration, volume encryption, storage over-provisioning, auto-expansion.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #10b981' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#10b981' }}>{ct.seaweedfsBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '对象/图片存储' : 'Object/image storage'}</li>
            <li>{isZh ? '视频流媒体' : 'Video streaming'}</li>
            <li>{isZh ? '大规模文件' : 'Large-scale files'}</li>
            <li>{isZh ? 'S3 兼容需求' : 'S3 compatibility needs'}</li>
            <li>{isZh ? 'Hadoop 集成' : 'Hadoop integration'}</li>
            <li>{isZh ? 'CDN 源站' : 'CDN origin'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #6366f1' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#6366f1' }}>{ct.longhornBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '数据库 PV' : 'Database PVs'}</li>
            <li>{isZh ? '有状态应用' : 'Stateful apps'}</li>
            <li>{isZh ? 'Kubernetes 原生' : 'Kubernetes native'}</li>
            <li>{isZh ? '持久卷管理' : 'PV management'}</li>
            <li>{isZh ? '灾难恢复' : 'Disaster recovery'}</li>
            <li>{isZh ? '开发/测试环境' : 'Dev/test environments'}</li>
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
