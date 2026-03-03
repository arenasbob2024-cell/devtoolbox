'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Cloudflare R2 vs AWS S3: Object Storage Comparison 2025',
    intro: 'Cloudflare R2 and Amazon S3 are two leading object storage solutions, but they differ significantly in pricing and egress costs. AWS S3 has been the industry standard for over 15 years, while R2 offers S3-compatible storage with zero egress fees. This comparison examines pricing, performance, features, and real-world use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Cloudflare R2 if you want to eliminate egress fees and serve content globally with Cloudflare CDN. Choose AWS S3 if you need the most comprehensive feature set, deep AWS ecosystem integration, and compliance certifications. For most web applications with significant data transfer, R2 offers substantial cost savings.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'R2 charges zero egress fees, S3 charges $0.09/GB+ for data transfer',
    takeaway2: 'S3 has more storage classes and advanced features like Glacier',
    takeaway3: 'R2 includes global CDN, S3 requires CloudFront for CDN',
    takeaway4: 'Both are S3-compatible, migration is straightforward',
    takeaway5: 'S3 has more compliance certifications (SOC, HIPAA, etc.)',
    takeaway6: 'R2 storage is slightly more expensive ($0.015 vs $0.023/GB)',
    
    whatIsR2Title: 'What is Cloudflare R2?',
    whatIsR2Content: 'Cloudflare R2 is an S3-compatible object storage service that eliminates egress fees. Launched in 2022, R2 allows developers to store large amounts of unstructured data without the unpredictable costs of data transfer. Integrated with Cloudflare global network, R2 provides fast content delivery worldwide without additional CDN costs.',
    
    whatIsS3Title: 'What is Amazon S3?',
    whatIsS3Content: 'Amazon Simple Storage Service (S3), launched in 2006, is the industry-standard object storage service. S3 offers industry-leading scalability, data availability, security, and performance. With multiple storage classes, lifecycle policies, and deep integration with AWS services, S3 powers everything from websites to data lakes.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Understanding the true cost difference:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities and storage options:',
    
    performanceTitle: 'Performance & Latency',
    performanceIntro: 'Global performance characteristics:',
    
    useCasesTitle: 'Common Use Cases',
    useCasesIntro: 'Where each service excels:',
    
    migrationTitle: 'Migration Between Platforms',
    migrationIntro: 'How to switch between services:',
    
    whenToUseTitle: 'When to Use Each Service',
    r2BestFor: 'Use R2 When:',
    s3BestFor: 'Use S3 When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, the choice between R2 and S3 often comes down to egress costs and AWS ecosystem needs. For applications serving significant data to users globally, R2 egress-free model can save thousands per month. However, S3 remains the choice for enterprises requiring advanced features, compliance certifications, or deep AWS integration. Many organizations use both: S3 for archival and compliance, R2 for user-facing content.',
    
    faq1q: 'Is R2 really free for egress?',
    faq1a: 'Yes, R2 includes free egress with no data transfer fees. This applies to both public and private buckets. The only costs are storage ($0.015/GB) and Class A/B operations.',
    
    faq2q: 'Can I use AWS SDK with R2?',
    faq2a: 'Yes, R2 is fully S3-compatible. You can use AWS SDK, boto3, or any S3-compatible tool by changing the endpoint URL to your R2 bucket endpoint.',
    
    faq3q: 'Does R2 support Glacier-like archival storage?',
    faq3a: 'No, R2 currently offers a single storage tier. S3 Glacier and Glacier Deep Archive are unique to AWS for long-term archival with retrieval delays.',
    
    faq4q: 'Which has better global performance?',
    faq4a: 'R2 has built-in global distribution via Cloudflare network. S3 requires CloudFront CDN for similar global performance. With CloudFront, both can achieve similar results.',
    
    faq5q: 'Can I host a static website on R2?',
    faq5a: 'Yes, R2 supports static website hosting with custom domains. Combined with Cloudflare Pages or Workers, you can build full static sites with R2 storage.',
    
    faq6q: 'What about data durability?',
    faq6a: 'Both offer excellent durability. S3 provides 99.999999999% (11 9s) durability. R2 claims similar durability with automatic replication across multiple locations.',
    
    faq7q: 'Does R2 support lifecycle policies?',
    faq7a: 'R2 supports basic lifecycle rules for object expiration. S3 offers more comprehensive lifecycle management including transition rules between storage classes.',
    
    faq8q: 'Which is better for video streaming?',
    faq8a: 'R2 is excellent for video streaming due to free egress and global CDN. For live streaming, Cloudflare Stream (separate product) or AWS CloudFront + S3 may be more appropriate.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Cloudflare R2 vs AWS S3：2025年对象存储对比',
    intro: 'Cloudflare R2和Amazon S3是两个领先的对象存储解决方案，但在定价和出口费用上有显著差异。AWS S3已成为行业标准超过15年，而R2提供兼容S3的存储且零出口费用。本比较 examines 定价、性能、功能和实际用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '如果你想消除出口费用并使用Cloudflare CDN在全球提供内容，选择Cloudflare R2。如果你需要最全面的功能集、深度AWS生态系统集成和合规认证，选择AWS S3。对于有大量数据传输的Web应用，R2提供显著的成本节省。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'R2不收取出口费用，S3对数据传输收费$0.09/GB+',
    takeaway2: 'S3有更多存储类别和高级功能如Glacier',
    takeaway3: 'R2包含全球CDN，S3需要CloudFront才能使用CDN',
    takeaway4: '两者都兼容S3，迁移很简单',
    takeaway5: 'S3有更多合规认证(SOC, HIPAA等)',
    takeaway6: 'R2存储略贵($0.015 vs $0.023/GB)',
    
    whatIsR2Title: '什么是Cloudflare R2？',
    whatIsR2Content: 'Cloudflare R2是兼容S3的对象存储服务，消除了出口费用。R2于2022年推出，允许开发者存储大量非结构化数据而无需承担不可预测的数据传输成本。与Cloudflare全球网络集成，R2无需额外CDN成本即可在全球范围内快速交付内容。',
    
    whatIsS3Title: '什么是Amazon S3？',
    whatIsS3Content: 'Amazon Simple Storage Service (S3)于2006年推出，是行业标准的对象存储服务。S3提供业界领先的扩展性、数据可用性、安全性和性能。凭借多种存储类别、生命周期策略和与AWS服务的深度集成，S3为从网站到数据湖的一切提供动力。',
    
    pricingTitle: '定价对比',
    pricingIntro: '了解真实的成本差异：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较能力和存储选项：',
    
    performanceTitle: '性能与延迟',
    performanceIntro: '全球性能特征：',
    
    useCasesTitle: '常见用例',
    useCasesIntro: '每个服务擅长的场景：',
    
    migrationTitle: '平台间迁移',
    migrationIntro: '如何在服务之间切换：',
    
    whenToUseTitle: '何时使用每个服务',
    r2BestFor: '使用R2的场景：',
    s3BestFor: '使用S3的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，R2和S3的选择通常取决于出口成本和AWS生态系统需求。对于向全球用户提供大量数据的应用，R2的无出口模式每月可节省数千美元。但是，对于需要高级功能、合规认证或深度AWS集成的企业，S3仍然是选择。许多组织同时使用两者：S3用于归档和合规，R2用于面向用户的内容。',
    
    faq1q: 'R2真的免费出口吗？',
    faq1a: '是的，R2包含免费出口，没有数据传输费用。这适用于公开和私有存储桶。唯一的成本是存储($0.015/GB)和Class A/B操作。',
    
    faq2q: '我可以在R2上使用AWS SDK吗？',
    faq2a: '可以，R2完全兼容S3。你可以使用AWS SDK、boto3或任何兼容S3的工具，只需将端点URL更改为你的R2存储桶端点。',
    
    faq3q: 'R2支持类似Glacier的归档存储吗？',
    faq3a: '不支持，R2目前提供单一存储层级。S3 Glacier和Glacier Deep Archive是AWS独有的，用于有检索延迟的长期归档。',
    
    faq4q: '哪个全球性能更好？',
    faq4a: 'R2通过Cloudflare网络内置全球分发。S3需要CloudFront CDN才能实现类似的全球性能。使用CloudFront，两者可以达到类似效果。',
    
    faq5q: '我可以在R2上托管静态网站吗？',
    faq5a: '可以，R2支持自定义域名的静态网站托管。结合Cloudflare Pages或Workers，你可以构建使用R2存储的完整静态网站。',
    
    faq6q: '数据持久性如何？',
    faq6a: '两者都提供出色的持久性。S3提供99.999999999%(11个9)持久性。R2声称类似的持久性，并在多个位置自动复制。',
    
    faq7q: 'R2支持生命周期策略吗？',
    faq7a: 'R2支持对象过期的基本生命周期规则。S3提供更全面的生命周期管理，包括存储类别之间的转换规则。',
    
    faq8q: '哪个更适合视频流媒体？',
    faq8a: '由于免费出口和全球CDN，R2非常适合视频流媒体。对于直播，Cloudflare Stream(独立产品)或AWS CloudFront + S3可能更合适。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function CloudflareR2VsAwsS3({ lang }: { lang: string }) {
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

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #f6821f', background: 'linear-gradient(135deg, rgba(246,130,31,0.1), rgba(255,217,61,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#f6821f' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsR2Title}</h3>
      <p style={pStyle}>{ct.whatIsR2Content}</p>

      <h3 style={h3Style}>{ct.whatIsS3Title}</h3>
      <p style={pStyle}>{ct.whatIsS3Content}</p>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '成本项' : 'Cost Item'}</th>
              <th style={thStyle}>Cloudflare R2</th>
              <th style={thStyle}>AWS S3</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '存储费用' : 'Storage', '$0.015/GB/mo', '$0.023/GB/mo (Standard)'],
              [isZh ? '出口费用' : 'Egress', isZh ? '免费' : 'FREE', '$0.09/GB (first 10TB)'],
              [isZh ? 'Class A操作' : 'Class A Ops', '$4.50/million', '$0.005/1000'],
              [isZh ? 'Class B操作' : 'Class B Ops', '$0.36/million', '$0.0004/1000'],
              [isZh ? 'CDN集成' : 'CDN Integration', isZh ? '内置Cloudflare CDN' : 'Built-in CF CDN', '+$0.02-0.17/GB (CloudFront)'],
              [isZh ? '免费层' : 'Free Tier', '10GB storage, 1M Class A', '5GB storage, 20K GET'],
              [isZh ? '最低费用' : 'Minimum Charge', isZh ? '无' : 'None', isZh ? '无' : 'None'],
            ].map(([item, r2, s3], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{item}</td>
                <td style={{ ...tdStyle, color: '#f6821f' }}>{r2}</td>
                <td style={tdStyle}>{s3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ ...h3Style, color: '#f6821f' }}>{isZh ? '成本示例：每月100TB出口' : 'Cost Example: 100TB Egress/Month'}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '项目' : 'Item'}</th>
              <th style={thStyle}>Cloudflare R2</th>
              <th style={thStyle}>AWS S3 + CloudFront</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['1TB Storage', '$15', '$23'],
              ['100TB Egress', '$0', '$9,000+'],
              ['Operations', '~$50', '~$100'],
              [isZh ? '月总成本' : 'Monthly Total', '~$65', '~$9,123'],
              [isZh ? '年节省' : 'Annual Savings', '-', '$108,696'],
            ].map(([item, r2, s3], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{item}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{r2}</td>
                <td style={tdStyle}>{s3}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Cloudflare R2</th>
              <th style={thStyle}>AWS S3</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '存储类别' : 'Storage Classes', '1 (Standard)', '7 (Standard, IA, Glacier...)'],
              [isZh ? 'S3兼容API' : 'S3-Compatible API', isZh ? '是' : 'Yes', isZh ? '原生' : 'Native'],
              [isZh ? '全球CDN' : 'Global CDN', isZh ? '内置' : 'Built-in', 'CloudFront (额外费用)'],
              [isZh ? '生命周期策略' : 'Lifecycle Policies', isZh ? '基本' : 'Basic', isZh ? '高级' : 'Advanced'],
              [isZh ? '对象锁定' : 'Object Lock', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '版本控制' : 'Versioning', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '静态网站托管' : 'Static Hosting', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '预签名URL' : 'Presigned URLs', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '事件通知' : 'Event Notifications', isZh ? '有限' : 'Limited', 'SNS, SQS, Lambda'],
              [isZh ? '复制' : 'Replication', isZh ? '是' : 'Yes', 'CRR, Same-Region'],
            ].map(([feature, r2, s3], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{r2}</td>
                <td style={{ ...tdStyle, color: '#ff9900' }}>{s3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f6821f' }}>
          <strong style={{ color: '#f6821f' }}>Cloudflare R2</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '内置Cloudflare全球CDN，310+数据中心。平均延迟：全球20-50ms。无需额外配置即可获得全球加速。适合需要全球低延迟访问的场景。' : 'Built-in Cloudflare global CDN, 310+ data centers. Average latency: 20-50ms globally. Automatic global acceleration without additional configuration. Ideal for scenarios requiring low global latency.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ff9900' }}>
          <strong style={{ color: '#ff9900' }}>AWS S3</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '区域性存储，需要CloudFront实现全球分发。S3区域延迟：10-30ms(同区域)。加上CloudFront后可达到类似R2的全球性能。' : 'Regional storage, requires CloudFront for global distribution. S3 regional latency: 10-30ms (same region). With CloudFront, can achieve similar global performance to R2.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>
      <p style={pStyle}>{ct.useCasesIntro}</p>

      <pre style={codeStyle}><code>{`// Use Case Examples

// CLOUDFLARE R2 - Best For:

// 1. Static Asset Delivery (Images, Videos, CSS, JS)
// Zero egress means unlimited bandwidth for user assets
const imageUrl = "https://pub-xxx.r2.dev/images/photo.jpg";

// 2. User-Generated Content
// Perfect for social media, forums, file sharing
await r2.putObject({
  Bucket: "user-uploads",
  Key: "users/123/avatar.jpg",
  Body: imageBuffer,
  ContentType: "image/jpeg"
});

// 3. Software Distribution
// Downloadable files without bandwidth costs
const downloadUrl = "https://releases.myapp.com/v2.0/app.dmg";

// 4. Video/Audio Streaming
// HLS/DASH streaming without CDN costs
const hlsManifest = "https://stream.myapp.com/video.m3u8";

// AWS S3 - Best For:

// 1. Data Lakes & Analytics
// Integration with Athena, Redshift, EMR
// Query data directly with SQL
SELECT * FROM s3://my-data-lake/events/

// 2. Long-term Archival
// Glacier Deep Archive: $0.00099/GB/month
// 10-year retention at minimal cost

// 3. Backup & Disaster Recovery
// Cross-region replication
// Point-in-time recovery

// 4. Compliance Requirements
// WORM storage, audit logging
// HIPAA, SOC2, FedRAMP certified`}</code></pre>

      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`// Migration: S3 to R2 (or vice versa)

// Option 1: Use R2 S3-compatible API
const S3 = require("aws-sdk/clients/s3");

// AWS S3 client
const s3 = new S3({
  region: "us-east-1",
  credentials: awsCredentials
});

// R2 client (same SDK, different endpoint)
const r2 = new S3({
  region: "auto",
  endpoint: "https://[account-id].r2.cloudflarestorage.com",
  credentials: r2Credentials
});

// Simple copy script
async function migrateObject(key) {
  const obj = await s3.getObject({ Bucket: "my-bucket", Key: key }).promise();
  
  await r2.putObject({
    Bucket: "my-r2-bucket",
    Key: key,
    Body: obj.Body,
    ContentType: obj.ContentType
  }).promise();
}

// Option 2: Use R2 Migrations API
// Cloudflare provides managed migration from S3
// - Automatic sync
// - Incremental updates
// - Cutover management

// Option 3: rclone
// rclone sync s3:my-bucket r2:my-bucket`}</code></pre>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f6821f' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f6821f' }}>{ct.r2BestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '高带宽静态资源' : 'High-bandwidth static assets'}</li>
            <li>{isZh ? '用户生成内容' : 'User-generated content'}</li>
            <li>{isZh ? '视频/音频流媒体' : 'Video/audio streaming'}</li>
            <li>{isZh ? '软件分发' : 'Software distribution'}</li>
            <li>{isZh ? '预算敏感项目' : 'Budget-conscious projects'}</li>
            <li>{isZh ? '全球用户群' : 'Global user base'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ff9900' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ff9900' }}>{ct.s3BestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '数据湖/分析' : 'Data lakes/analytics'}</li>
            <li>{isZh ? '长期归档' : 'Long-term archival'}</li>
            <li>{isZh ? '合规要求' : 'Compliance requirements'}</li>
            <li>{isZh ? 'AWS生态系统深度集成' : 'Deep AWS ecosystem'}</li>
            <li>{isZh ? '企业备份/DR' : 'Enterprise backup/DR'}</li>
            <li>{isZh ? '需要高级存储类别' : 'Need advanced storage tiers'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(246,130,31,0.1), rgba(255,153,0,0.1))', borderRadius: 12, border: '1px solid rgba(246,130,31,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#f6821f', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#f6821f', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/hash-generator'} style={{ color: '#f6821f', textDecoration: 'none' }}>Hash Generator</a>
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
