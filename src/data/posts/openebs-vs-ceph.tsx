'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'OpenEBS vs Ceph: Kubernetes Storage Comparison',
    intro: 'OpenEBS and Ceph are two leading storage solutions for Kubernetes. OpenEBS provides container-attached storage designed for cloud-native environments, while Ceph is a mature distributed storage system adapted for Kubernetes via Rook. This comparison examines their architectures, features, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose OpenEBS for simplicity, ease of management, and stateful workloads requiring fast local or replicated storage. Choose Ceph (via Rook) for enterprise-grade object, block, and file storage with proven scalability. OpenEBS excels in Kubernetes-native simplicity; Ceph excels in comprehensive storage features.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'OpenEBS is Kubernetes-native with per-PVC storage engines',
    takeaway2: 'Ceph provides unified object, block, and file storage',
    takeaway3: 'Rook-Ceph simplifies Ceph deployment on Kubernetes',
    takeaway4: 'OpenEBS has lower operational complexity',
    takeaway5: 'Ceph has proven enterprise track record at scale',
    takeaway6: 'Both support replication and high availability',
    
    whatIsOpenEbsTitle: 'What is OpenEBS?',
    whatIsOpenEbsContent: 'OpenEBS is an open-source container-attached storage (CAS) solution developed by the CNCF. Released in 2016, it implements storage using containers, with each PVC getting its own storage engine. OpenEBS supports multiple storage engines (Mayastor, cStor, Jiva, LocalPV) for different performance and feature requirements.',
    
    whatIsCephTitle: 'What is Ceph?',
    whatIsCephContent: 'Ceph is an open-source distributed storage system developed since 2004 and now maintained by Red Hat. It provides object (RADOSGW), block (RBD), and file (CephFS) storage from a unified cluster. Ceph is deployed on Kubernetes primarily through Rook, which manages Ceph as a Kubernetes operator.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core storage capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Storage class configuration:',
    
    openEbsExampleTitle: 'OpenEBS Configuration',
    cephExampleTitle: 'Ceph/Rook Configuration',
    
    dataSourceTitle: 'Storage Types Support',
    dataSourceIntro: 'Supported storage protocols and access modes:',
    
    alertingTitle: 'Performance Characteristics',
    alertingIntro: 'Performance and scalability comparison:',
    
    useCasesTitle: 'Best Use Cases',
    openEbsBestFor: 'OpenEBS is Best For:',
    cephBestFor: 'Ceph is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'OpenEBS and Ceph serve different storage needs in the Kubernetes ecosystem. OpenEBS provides Kubernetes-native storage with simplicity and flexibility, ideal for stateful workloads requiring container-attached storage. Ceph via Rook delivers enterprise-grade unified storage for organizations needing comprehensive object, block, and file services. Choose OpenEBS for simplicity and Kubernetes-native experience; choose Ceph for proven scalability and comprehensive storage services.',
    
    faq1q: 'Can OpenEBS and Ceph coexist in the same cluster?',
    faq1a: 'Yes, they can coexist using different StorageClasses. You can use OpenEBS for some workloads (databases, message queues) and Ceph for others (object storage, shared filesystems). Each PVC can select its preferred storage solution.',
    
    faq2q: 'Which is easier to operate?',
    faq2a: 'OpenEBS is generally easier to operate, especially for teams already familiar with Kubernetes. Ceph has more complexity but Rook simplifies management. For storage novices, OpenEBS has lower operational overhead.',
    
    faq3q: 'What about performance?',
    faq3a: 'OpenEBS with Mayastor or LocalPV provides excellent performance, especially for low-latency workloads. Ceph performance depends on configuration and network but scales well. For raw performance, OpenEBS local storage is fastest; for distributed storage, both perform well.',
    
    faq4q: 'How do they handle data durability?',
    faq4a: 'Both support replication for durability. OpenEBS cStor and Mayastor support synchronous replication. Ceph provides multiple replicas with CRUSH algorithm for data distribution. Both can survive node failures with proper configuration.',
    
    faq5q: 'Which supports object storage?',
    faq5a: 'Ceph has built-in object storage (RADOSGW) compatible with S3 and Swift APIs. OpenEBS does not provide object storage natively but works well with MinIO or other object storage solutions deployed on Kubernetes.',
    
    faq6q: 'What about backup and disaster recovery?',
    faq6a: 'OpenEBS integrates with Velero for backup. Ceph has built-in snapshot and mirroring capabilities. Both support PV snapshots. For enterprise DR, Ceph has more mature features; for K8s-native backup, OpenEBS integrates easily.',
    
    faq7q: 'How do they scale?',
    faq7a: 'Ceph is proven at petabyte scale and handles thousands of OSDs. OpenEBS scales horizontally by adding nodes but is typically used at smaller scales. For massive storage clusters, Ceph is more battle-tested.',
    
    faq8q: 'Which is better for databases?',
    faq8a: 'OpenEBS with Mayastor or LocalPV is often better for databases requiring low latency. The dedicated storage engine per PVC provides predictable performance. Ceph works well for databases but may have higher latency due to its distributed nature.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'OpenEBS vs Ceph：Kubernetes 存储对比',
    intro: 'OpenEBS 和 Ceph 是两个领先的 Kubernetes 存储解决方案。OpenEBS 提供专为云原生环境设计的容器附加存储，而 Ceph 是一个成熟的分布式存储系统，通过 Rook 适配到 Kubernetes。本比较考察它们的架构、功能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为简单性、易于管理和需要快速本地或复制存储的有状态工作负载选择 OpenEBS。为企业级对象、块和文件存储以及经过验证的可扩展性选择 Ceph（通过 Rook）。OpenEBS 在 Kubernetes 原生简单性方面出色；Ceph 在全面存储功能方面出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'OpenEBS 是 Kubernetes 原生的，每个 PVC 有独立存储引擎',
    takeaway2: 'Ceph 提供统一的对象、块和文件存储',
    takeaway3: 'Rook-Ceph 简化了 Ceph 在 Kubernetes 上的部署',
    takeaway4: 'OpenEBS 运维复杂度更低',
    takeaway5: 'Ceph 在大规模下有经过验证的企业级记录',
    takeaway6: '两者都支持复制和高可用性',
    
    whatIsOpenEbsTitle: '什么是 OpenEBS？',
    whatIsOpenEbsContent: 'OpenEBS 是由 CNCF 开发的开源容器附加存储（CAS）解决方案。2016 年发布，它使用容器实现存储，每个 PVC 获得自己的存储引擎。OpenEBS 支持多种存储引擎（Mayastor、cStor、Jiva、LocalPV）以满足不同的性能和功能需求。',
    
    whatIsCephTitle: '什么是 Ceph？',
    whatIsCephContent: 'Ceph 是自 2004 年开发的开源分布式存储系统，现在由 Red Hat 维护。它从统一集群提供对象（RADOSGW）、块（RBD）和文件（CephFS）存储。Ceph 主要通过 Rook 部署在 Kubernetes 上，Rook 作为 Kubernetes operator 管理 Ceph。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心存储功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '存储类配置：',
    
    openEbsExampleTitle: 'OpenEBS 配置',
    cephExampleTitle: 'Ceph/Rook 配置',
    
    dataSourceTitle: '存储类型支持',
    dataSourceIntro: '支持的存储协议和访问模式：',
    
    alertingTitle: '性能特征',
    alertingIntro: '性能和可扩展性比较：',
    
    useCasesTitle: '最佳用例',
    openEbsBestFor: 'OpenEBS 最适合：',
    cephBestFor: 'Ceph 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'OpenEBS 和 Ceph 在 Kubernetes 生态系统中服务于不同的存储需求。OpenEBS 提供简单灵活的 Kubernetes 原生存储，非常适合需要容器附加存储的有状态工作负载。通过 Rook 部署的 Ceph 为需要全面对象、块和文件服务的组织提供企业级统一存储。为简单性和 Kubernetes 原生体验选择 OpenEBS；为经过验证的可扩展性和全面存储服务选择 Ceph。',
    
    faq1q: 'OpenEBS 和 Ceph 可以在同一个集群中共存吗？',
    faq1a: '是的，它们可以使用不同的 StorageClass 共存。你可以对某些工作负载（数据库、消息队列）使用 OpenEBS，对其他工作负载（对象存储、共享文件系统）使用 Ceph。每个 PVC 可以选择其首选的存储解决方案。',
    
    faq2q: '哪个更容易运维？',
    faq2a: 'OpenEBS 通常更容易运维，特别是对于已经熟悉 Kubernetes 的团队。Ceph 有更多复杂性，但 Rook 简化了管理。对于存储新手，OpenEBS 的运维开销更低。',
    
    faq3q: '性能怎么样？',
    faq3a: 'OpenEBS 使用 Mayastor 或 LocalPV 提供出色的性能，特别是对于低延迟工作负载。Ceph 性能取决于配置和网络，但扩展性良好。对于原始性能，OpenEBS 本地存储最快；对于分布式存储，两者都表现良好。',
    
    faq4q: '它们如何处理数据持久性？',
    faq4a: '两者都支持复制以保证持久性。OpenEBS cStor 和 Mayastor 支持同步复制。Ceph 通过 CRUSH 算法提供多个副本进行数据分布。通过适当配置，两者都可以在节点故障中存活。',
    
    faq5q: '哪个支持对象存储？',
    faq5a: 'Ceph 有内置对象存储（RADOSGW），与 S3 和 Swift API 兼容。OpenEBS 原生不提供对象存储，但与部署在 Kubernetes 上的 MinIO 或其他对象存储解决方案配合良好。',
    
    faq6q: '备份和灾难恢复怎么样？',
    faq6a: 'OpenEBS 与 Velero 集成进行备份。Ceph 有内置快照和镜像功能。两者都支持 PV 快照。对于企业 DR，Ceph 有更成熟的功能；对于 K8s 原生备份，OpenEBS 易于集成。',
    
    faq7q: '它们如何扩展？',
    faq7a: 'Ceph 在 PB 级规模下经过验证，可以处理数千个 OSD。OpenEBS 通过添加节点水平扩展，但通常在较小规模下使用。对于大规模存储集群，Ceph 更加经过实战测试。',
    
    faq8q: '哪个更适合数据库？',
    faq8a: 'OpenEBS 使用 Mayastor 或 LocalPV 通常更适合需要低延迟的数据库。每个 PVC 的专用存储引擎提供可预测的性能。Ceph 对数据库工作良好，但可能由于其分布式特性而有更高的延迟。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function OpenEbsVsCeph({ lang }: { lang: string }) {
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
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#f97316' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #f97316', background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(239,68,68,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#f97316' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsOpenEbsTitle}</h3>
      <p style={pStyle}>{ct.whatIsOpenEbsContent}</p>

      <h3 style={{ ...h3Style, color: '#ef4444' }}>{ct.whatIsCephTitle}</h3>
      <p style={pStyle}>{ct.whatIsCephContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>OpenEBS</th>
              <th style={thStyle}>Ceph</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '架构' : 'Architecture', 'CAS (Container-Attached)', 'Distributed (RADOS)'],
              [isZh ? '部署方式' : 'Deployment', 'Native K8s', 'Rook Operator'],
              [isZh ? '存储类型' : 'Storage Types', isZh ? '仅块存储' : 'Block only', 'Object + Block + File'],
              [isZh ? '存储引擎' : 'Storage Engines', 'Mayastor, cStor, Jiva, LocalPV', 'BlueStore, FileStore'],
              [isZh ? '运维复杂度' : 'Ops Complexity', isZh ? '低' : 'Low', isZh ? '中等' : 'Medium'],
              [isZh ? 'K8s 集成' : 'K8s Integration', isZh ? '原生' : 'Native', isZh ? '通过 Rook' : 'Via Rook'],
              [isZh ? '成熟度' : 'Maturity', 'CNCF Incubating', 'Production-proven'],
            ].map(([feature, openebs, ceph], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{openebs}</td>
                <td style={tdStyle}>{ceph}</td>
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
              <th style={thStyle}>OpenEBS</th>
              <th style={thStyle}>Ceph</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '复制' : 'Replication', isZh ? '同步复制' : 'Sync replication', isZh ? '同步/异步' : 'Sync/Async'],
              [isZh ? '快照' : 'Snapshots', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '克隆' : 'Cloning', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '加密' : 'Encryption', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '压缩' : 'Compression', isZh ? '部分引擎' : 'Some engines', isZh ? '支持' : 'Supported'],
              [isZh ? '去重' : 'Deduplication', isZh ? '不支持' : 'No', isZh ? '不支持' : 'No'],
              [isZh ? '对象存储' : 'Object Storage', isZh ? '不支持' : 'No', 'RADOSGW (S3/Swift)'],
              [isZh ? '共享文件系统' : 'Shared FS', isZh ? '不支持' : 'No', 'CephFS'],
            ].map(([cap, openebs, ceph], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{openebs}</td>
                <td style={tdStyle}>{ceph}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f97316' }}>{ct.openEbsExampleTitle}</h3>
      <pre style={codeStyle}><code>{'# OpenEBS StorageClass (Mayastor)\napiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: mayastor-replicated\nprovisioner: openebs.io/mayastor\nparameters:\n  repl: "3"\n  protocol: nvmf\nallowVolumeExpansion: true\nvolumeBindingMode: WaitForFirstConsumer\n\n---\n# OpenEBS LocalPV StorageClass\napiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: openebs-local\nprovisioner: openebs.io/local\nvolumeBindingMode: WaitForFirstConsumer\nreclaimPolicy: Delete\n\n---\n# PVC using OpenEBS\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: postgres-pvc\nspec:\n  storageClassName: mayastor-replicated\n  accessModes:\n  - ReadWriteOnce\n  resources:\n    requests:\n      storage: 100Gi'}</code></pre>

      <h3 style={{ ...h3Style, color: '#ef4444' }}>{ct.cephExampleTitle}</h3>
      <pre style={codeStyle}><code>{'# Ceph Rook Cluster\napiVersion: ceph.rook.io/v1\nkind: CephCluster\nmetadata:\n  name: rook-ceph\n  namespace: rook-ceph\nspec:\n  cephVersion:\n    image: quay.io/ceph/ceph:v17.2.6\n  dataDirHostPath: /var/lib/rook\n  mon:\n    count: 3\n    allowMultiplePerNode: false\n  storage:\n    useAllNodes: true\n    useAllDevices: true\n\n---\n# Ceph Block Pool\napiVersion: ceph.rook.io/v1\nkind: CephBlockPool\nmetadata:\n  name: replicapool\n  namespace: rook-ceph\nspec:\n  failureDomain: host\n  replicated:\n    size: 3\n\n---\n# Ceph StorageClass\napiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: rook-ceph-block\nprovisioner: rook-ceph.rbd.csi.ceph.com\nparameters:\n  clusterID: rook-ceph\n  pool: replicapool\n  imageFormat: "2"\n  imageFeatures: layering\ncsi.storage.k8s.io/provisioner-secret-name: rook-csi-rbd-provisioner\ncsi.storage.k8s.io/node-stage-secret-name: rook-csi-rbd-node\nreclaimPolicy: Delete\nallowVolumeExpansion: true'}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '存储类型' : 'Storage Type'}</th>
              <th style={thStyle}>OpenEBS</th>
              <th style={thStyle}>Ceph</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '块存储' : 'Block Storage', isZh ? '支持' : 'Supported', 'RBD'],
              [isZh ? '对象存储' : 'Object Storage', isZh ? '不支持' : 'No', 'RADOSGW (S3/Swift)'],
              [isZh ? '文件系统' : 'Filesystem', isZh ? '不支持' : 'No', 'CephFS'],
              [isZh ? '本地存储' : 'Local Storage', 'LocalPV', isZh ? '不适用' : 'N/A'],
              [isZh ? '共享访问' : 'Shared Access', isZh ? 'RWO only' : 'RWO only', 'RWO, RWX'],
              [isZh ? '动态配置' : 'Dynamic Provisioning', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
            ].map(([type, openebs, ceph], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{type}</td>
                <td style={tdStyle}>{openebs}</td>
                <td style={tdStyle}>{ceph}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f97316' }}>
          <strong style={{ color: '#f97316' }}>OpenEBS Performance</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Mayastor 使用 NVMe-over-TCP 提供低延迟。LocalPV 提供最高性能（直通磁盘）。cStor 提供良好的性能和功能平衡。适合中等到大型部署。' : 'Mayastor uses NVMe-over-TCP for low latency. LocalPV provides highest performance (passthrough disks). cStor offers good balance of performance and features. Suitable for medium to large deployments.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ef4444' }}>
          <strong style={{ color: '#ef4444' }}>Ceph Performance</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '在 PB 级规模下经过验证。CRUSH 算法高效分布数据。BlueStore 提供优化性能。需要仔细调优以获得最佳性能。网络带宽对性能至关重要。' : 'Proven at PB-scale. CRUSH algorithm efficiently distributes data. BlueStore provides optimized performance. Requires careful tuning for best results. Network bandwidth critical for performance.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f97316' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f97316' }}>{ct.openEbsBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '云原生应用' : 'Cloud-native applications'}</li>
            <li>{isZh ? '数据库（PostgreSQL、MySQL）' : 'Databases (PostgreSQL, MySQL)'}</li>
            <li>{isZh ? '消息队列（Kafka、RabbitMQ）' : 'Message queues (Kafka, RabbitMQ)'}</li>
            <li>{isZh ? '开发/测试环境' : 'Dev/test environments'}</li>
            <li>{isZh ? '低延迟要求' : 'Low-latency requirements'}</li>
            <li>{isZh ? '简单运维' : 'Simple operations'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ef4444' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ef4444' }}>{ct.cephBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业级存储' : 'Enterprise storage'}</li>
            <li>{isZh ? '对象存储需求' : 'Object storage needs'}</li>
            <li>{isZh ? '共享文件系统' : 'Shared filesystems'}</li>
            <li>{isZh ? 'PB 级规模' : 'PB-scale deployments'}</li>
            <li>{isZh ? '混合工作负载' : 'Mixed workloads'}</li>
            <li>{isZh ? '灾难恢复' : 'Disaster recovery'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(239,68,68,0.1))', borderRadius: 12, border: '1px solid rgba(249,115,22,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#f97316', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/yaml-formatter'} style={{ color: '#f97316', textDecoration: 'none' }}>YAML Formatter</a>
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
