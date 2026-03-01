'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'CapRover vs Dokku: Self-Hosted PaaS Comparison 2025',
    intro: 'Self-hosted Platform-as-a-Service solutions offer Heroku-like simplicity without vendor lock-in. CapRover and Dokku lead this space, each with distinct approaches. This comparison covers features, deployment workflows, scalability, and real-world use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'CapRover offers a modern web UI, built-in container orchestration, and multi-node clustering. Dokku provides a minimalist, Git-driven workflow with extensive plugin ecosystem. Choose CapRover for teams needing visual management; choose Dokku for developers preferring command-line simplicity.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'CapRover has a web dashboard; Dokku is CLI-only',
    takeaway2: 'Both support Docker containers and Heroku-style deployments',
    takeaway3: 'CapRover supports multi-node clustering out of the box',
    takeaway4: 'Dokku has more plugins for databases and services',
    takeaway5: 'Both are free and open source with active communities',
    takeaway6: 'Dokku is lighter weight; CapRover has more built-in features',
    
    whatIsCapRoverTitle: 'What is CapRover?',
    whatIsCapRoverContent: 'CapRover is an easy-to-use container deployment platform built on Docker Swarm. It provides a web-based dashboard, one-click app deployment, free SSL certificates, and automatic load balancing. Think of it as "self-hosted Heroku with a GUI."',
    
    whatIsDokkuTitle: 'What is Dokku?',
    whatIsDokkuContent: 'Dokku is a Docker-powered mini-Heroku that implements the same Git push deployment workflow. It is designed to be extensible through plugins and runs on a single server. Think of it as "the smallest PaaS implementation."',
    
    performanceTitle: 'Deployment Comparison',
    performanceIntro: 'How deployments work in each platform:',
    
    setupTitle: 'Initial Setup',
    setupIntro: 'Getting started with each platform:',
    
    resourceTitle: 'Resource Usage',
    resourceIntro: 'System requirements and overhead:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing built-in capabilities:',
    
    codeExampleTitle: 'Deployment Examples',
    codeExampleIntro: 'How to deploy applications:',
    
    capRoverExampleTitle: 'CapRover Deployment',
    dokkuExampleTitle: 'Dokku Deployment',
    
    databasesTitle: 'Database Support',
    databasesIntro: 'Managed database options:',
    
    sslTitle: 'SSL Certificates',
    sslIntro: 'HTTPS configuration:',
    
    typescriptTitle: 'CI/CD Integration',
    typescriptIntro: 'Automated deployment pipelines:',
    
    deploymentTitle: 'Scaling Options',
    deploymentIntro: 'Horizontal and vertical scaling:',
    
    migrationTitle: 'Migration Guide',
    migrationIntro: 'Moving between platforms:',
    
    whenToUseTitle: 'When to Use Each Platform',
    capRoverBestFor: 'Use CapRover When:',
    dokkuBestFor: 'Use Dokku When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both CapRover and Dokku are excellent self-hosted PaaS options. CapRover wins for teams that prefer visual management, need clustering, or are deploying many services. Dokku excels for solo developers, smaller projects, or those who love the command line. Both eliminate vendor lock-in while providing Heroku-like developer experience.',
    
    faq1q: 'Can CapRover run on a single server?',
    faq1a: 'Yes, CapRover works great on a single VPS. The clustering is optional - you can start with one node and add more later as needed. For most small to medium workloads, a single server is sufficient.',
    
    faq2q: 'Is Dokku production-ready?',
    faq2a: 'Absolutely. Companies like Sensible Weather and many others run production workloads on Dokku. It handles SSL, zero-downtime deploys, and database management reliably.',
    
    faq3q: 'Can I deploy Docker Compose apps?',
    faq3a: 'CapRover has native docker-compose support. Dokku can deploy multi-container apps but requires additional configuration. Both handle single-container apps excellently.',
    
    faq4q: 'What about database backups?',
    faq4a: 'CapRover has built-in backup scheduling in the dashboard. Dokku plugins like dokku-postgres include backup commands. Both integrate with external backup solutions like S3.',
    
    faq5q: 'Can I use custom domains?',
    faq5a: 'Yes, both platforms support custom domains with automatic SSL. CapRover handles this through the web UI; Dokku uses CLI commands like "dokku domains:add app-name example.com".',
    
    faq6q: 'How do they compare to Heroku?',
    faq6a: 'Both provide Heroku-like deployment (git push) but run on your own servers. This gives you full control and potentially significant cost savings. You manage the underlying infrastructure.',
    
    faq7q: 'Can I run background workers?',
    faq7a: 'Yes, both support background workers. CapRover uses a Captain Definition file; Dokku supports Procfiles with worker processes. Both scale workers independently from web processes.',
    
    faq8q: 'What is the minimum server requirement?',
    faq8a: 'Dokku runs on 512MB RAM; CapRover recommends 1GB+ due to its additional services. For production, 2GB+ is recommended for either platform to handle containers and databases.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'CapRover vs Dokku：2025自托管PaaS对比',
    intro: '自托管平台即服务解决方案提供类似Heroku的简单性，同时避免供应商锁定。CapRover和Dokku在这个领域处于领先地位，各有特色。本比较涵盖功能、部署工作流、可扩展性和实际用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'CapRover提供现代Web UI、内置容器编排和多节点集群。Dokku提供极简的Git驱动工作流和丰富的插件生态系统。需要可视化管理的选择CapRover；喜欢命令行简洁性的选择Dokku。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'CapRover有Web仪表板；Dokku只有CLI',
    takeaway2: '两者都支持Docker容器和Heroku风格部署',
    takeaway3: 'CapRover开箱即用支持多节点集群',
    takeaway4: 'Dokku有更多数据库和服务插件',
    takeaway5: '两者都是免费开源的，有活跃社区',
    takeaway6: 'Dokku更轻量；CapRover有更多内置功能',
    
    whatIsCapRoverTitle: '什么是CapRover？',
    whatIsCapRoverContent: 'CapRover是一个基于Docker Swarm构建的易用容器部署平台。它提供基于Web的仪表板、一键应用部署、免费SSL证书和自动负载均衡。可以把它想象成"带GUI的自托管Heroku"。',
    
    whatIsDokkuTitle: '什么是Dokku？',
    whatIsDokkuContent: 'Dokku是一个Docker驱动的小型Heroku，实现了相同的Git推送部署工作流。它设计为可通过插件扩展，运行在单台服务器上。可以把它想象成"最小的PaaS实现"。',
    
    performanceTitle: '部署对比',
    performanceIntro: '每个平台的部署方式：',
    
    setupTitle: '初始设置',
    setupIntro: '开始使用每个平台：',
    
    resourceTitle: '资源使用',
    resourceIntro: '系统需求和开销：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较内置能力：',
    
    codeExampleTitle: '部署示例',
    codeExampleIntro: '如何部署应用：',
    
    capRoverExampleTitle: 'CapRover部署',
    dokkuExampleTitle: 'Dokku部署',
    
    databasesTitle: '数据库支持',
    databasesIntro: '托管数据库选项：',
    
    sslTitle: 'SSL证书',
    sslIntro: 'HTTPS配置：',
    
    typescriptTitle: 'CI/CD集成',
    typescriptIntro: '自动化部署流水线：',
    
    deploymentTitle: '扩展选项',
    deploymentIntro: '水平和垂直扩展：',
    
    migrationTitle: '迁移指南',
    migrationIntro: '平台间迁移：',
    
    whenToUseTitle: '何时使用每个平台',
    capRoverBestFor: '使用CapRover的场景：',
    dokkuBestFor: '使用Dokku的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，CapRover和Dokku都是优秀的自托管PaaS选择。CapRover适合需要可视化管理、集群或部署多个服务的团队。Dokku非常适合独立开发者、小型项目或喜欢命令行的人。两者都消除了供应商锁定，同时提供类Heroku的开发者体验。',
    
    faq1q: 'CapRover可以在单台服务器上运行吗？',
    faq1a: '可以，CapRover在单个VPS上运行良好。集群是可选的——你可以从一个节点开始，以后根据需要添加更多。对于大多数中小型工作负载，单台服务器就足够了。',
    
    faq2q: 'Dokku可以用于生产环境吗？',
    faq2a: '当然可以。Sensible Weather等公司和许多其他公司在Dokku上运行生产工作负载。它可靠地处理SSL、零停机部署和数据库管理。',
    
    faq3q: '我可以部署Docker Compose应用吗？',
    faq3a: 'CapRover原生支持docker-compose。Dokku可以部署多容器应用，但需要额外配置。两者都能很好地处理单容器应用。',
    
    faq4q: '数据库备份呢？',
    faq4a: 'CapRover在仪表板中有内置备份调度。Dokku插件如dokku-postgres包含备份命令。两者都与S3等外部备份解决方案集成。',
    
    faq5q: '我可以使用自定义域名吗？',
    faq5a: '可以，两个平台都支持带自动SSL的自定义域名。CapRover通过Web UI处理；Dokku使用CLI命令如"dokku domains:add app-name example.com"。',
    
    faq6q: '它们与Heroku相比如何？',
    faq6a: '两者都提供类Heroku部署（git push），但在你自己的服务器上运行。这给你完全控制权和潜在的成本节约。你需要管理底层基础设施。',
    
    faq7q: '我可以运行后台工作进程吗？',
    faq7a: '可以，两者都支持后台工作进程。CapRover使用Captain Definition文件；Dokku支持带工作进程的Procfile。两者都可以独立于Web进程扩展工作进程。',
    
    faq8q: '最低服务器要求是什么？',
    faq8a: 'Dokku在512MB内存上运行；CapRover建议1GB+因为其额外服务。对于生产环境，建议任一平台2GB+以处理容器和数据库。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function CapRoverVsDokku({ lang }: { lang: string }) {
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

      <div style={{ ...boxStyle, borderLeft: '4px solid #f59e0b', background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(16,185,129,0.1))' }}>
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

      <h3 style={h3Style}>{ct.whatIsCapRoverTitle}</h3>
      <p style={pStyle}>{ct.whatIsCapRoverContent}</p>

      <h3 style={h3Style}>{ct.whatIsDokkuTitle}</h3>
      <p style={pStyle}>{ct.whatIsDokkuContent}</p>

      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>CapRover</th>
              <th style={thStyle}>Dokku</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '用户界面' : 'User Interface', 'Web Dashboard + CLI', 'CLI Only'],
              [isZh ? '容器编排' : 'Container Orchestration', 'Docker Swarm', 'Docker'],
              [isZh ? '集群支持' : 'Clustering', isZh ? '原生支持' : 'Native', isZh ? '不支持' : 'No'],
              [isZh ? '部署方式' : 'Deployment', 'CLI/Git/Web', 'Git Push'],
              [isZh ? '插件系统' : 'Plugin System', 'Limited', 'Extensive'],
              [isZh ? '负载均衡' : 'Load Balancing', isZh ? '内置' : 'Built-in', 'Nginx (manual)'],
              [isZh ? '最小内存' : 'Min Memory', '1GB', '512MB'],
            ].map(([feature, caprover, dokku], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{caprover}</td>
                <td style={tdStyle}>{dokku}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.setupTitle}</h2>
      <p style={pStyle}>{ct.setupIntro}</p>

      <pre style={codeStyle}><code>{`# CapRover Setup (One-liner)
docker run -p 80:80 -p 443:443 -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /captain:/captain \
  caprover/caprover

# Then visit http://your-server:3000
# Default: captain42

# Dokku Setup (Bootstrap)
wget https://dokku.com/install/v0.34.4/bootstrap.sh
sudo bash bootstrap.sh

# Or via package manager
sudo apt-get install dokku

# Initial setup via web UI
# Visit http://your-server for SSH key setup`}</code></pre>

      <h2 style={h2Style}>{ct.resourceTitle}</h2>
      <p style={pStyle}>{ct.resourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '资源' : 'Resource'}</th>
              <th style={thStyle}>CapRover</th>
              <th style={thStyle}>Dokku</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '最低内存' : 'Minimum RAM', '1 GB', '512 MB'],
              [isZh ? '推荐内存' : 'Recommended RAM', '2 GB+', '1 GB+'],
              [isZh ? '磁盘空间' : 'Disk Space', '10 GB+', '5 GB+'],
              [isZh ? 'CPU开销' : 'CPU Overhead', isZh ? '中等' : 'Medium', isZh ? '低' : 'Low'],
              [isZh ? '启动时间' : 'Startup Time', '30-60s', '10-20s'],
            ].map(([resource, caprover, dokku], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{resource}</td>
                <td style={tdStyle}>{caprover}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{dokku}</td>
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
              <th style={thStyle}>CapRover</th>
              <th style={thStyle}>Dokku</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Git推送部署' : 'Git Push Deploy', '✓', '✓'],
              [isZh ? 'Docker镜像部署' : 'Docker Image Deploy', '✓', '✓'],
              [isZh ? 'Web仪表板' : 'Web Dashboard', '✓', '✗'],
              [isZh ? '自动SSL' : 'Auto SSL', '✓ (Let\'s Encrypt)', '✓ (Let\'s Encrypt)'],
              [isZh ? '多节点集群' : 'Multi-node Cluster', '✓', '✗'],
              [isZh ? '滚动更新' : 'Rolling Updates', '✓', '✓'],
              [isZh ? '数据库插件' : 'Database Plugins', 'Basic', 'Extensive'],
              [isZh ? '健康检查' : 'Health Checks', '✓', '✓ (via plugin)'],
              [isZh ? '日志聚合' : 'Log Aggregation', 'Basic', '✓ (via plugin)'],
              [isZh ? '监控' : 'Monitoring', 'Basic', '✓ (via plugin)'],
            ].map(([feature, caprover, dokku], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{caprover}</td>
                <td style={tdStyle}>{dokku}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.capRoverExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# CapRover Deployment Options

# Option 1: Captain Definition File (captain-definition)
{
  "schemaVersion": 2,
  "dockerfilePath": "./Dockerfile"
}

# Option 2: Deploy via CLI
npm install -g caprover
caprover login
caprover deploy

# Option 3: Git Push (setup remote)
caprover serversetup
git remote add caprover captain@your-server:22
git push caprover main

# Option 4: Deploy from Web Dashboard
# Upload tarball or connect GitHub

# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]

# One-click apps available:
# MongoDB, PostgreSQL, MySQL, Redis, etc.`}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.dokkuExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Dokku Deployment

# Create app
dokku apps:create myapp

# Add remote
git remote add dokku dokku@your-server:myapp

# Deploy
git push dokku main

# Procfile (required for buildpacks)
web: node server.js
worker: node worker.js

# Or use Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "server.js"]

# Database setup
dokku plugin:install https://github.com/dokku/dokku-postgres.git
dokku postgres:create mydb
dokku postgres:link mydb myapp

# SSL
dokku letsencrypt:enable myapp

# Environment variables
dokku config:set myapp NODE_ENV=production
dokku config:set myapp DATABASE_URL=postgres://...

# Scaling
dokku ps:scale myapp web=2 worker=1`}</code></pre>

      <h2 style={h2Style}>{ct.databasesTitle}</h2>
      <p style={pStyle}>{ct.databasesIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '数据库' : 'Database'}</th>
              <th style={thStyle}>CapRover</th>
              <th style={thStyle}>Dokku</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['PostgreSQL', 'One-click', 'Plugin (dokku-postgres)'],
              ['MySQL', 'One-click', 'Plugin (dokku-mysql)'],
              ['MongoDB', 'One-click', 'Plugin (dokku-mongo)'],
              ['Redis', 'One-click', 'Plugin (dokku-redis)'],
              ['MariaDB', 'One-click', 'Plugin (dokku-mariadb)'],
              ['CouchDB', 'One-click', 'Plugin'],
              ['RethinkDB', 'One-click', 'Plugin'],
            ].map(([db, caprover, dokku], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{db}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{caprover}</td>
                <td style={tdStyle}>{dokku}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.sslTitle}</h2>
      <p style={pStyle}>{ct.sslIntro}</p>

      <pre style={codeStyle}><code>{`# CapRover SSL (Web Dashboard)
# Navigate to Apps > Your App > HTTP Settings
# Enable "Force HTTPS" and "Enable Custom SSL"
# Or use automatic Let's Encrypt

# CapRover SSL (CLI)
caprover deploy --enableSsl

# Dokku SSL
# Install Let's Encrypt plugin
dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git

# Enable for app
dokku letsencrypt:enable myapp

# Auto-renewal
dokku letsencrypt:cron-job --add

# Custom certificate
dokku certs:add myapp < cert.pem`}</code></pre>

      <h2 style={h2Style}>{ct.typescriptTitle}</h2>
      <p style={pStyle}>{ct.typescriptIntro}</p>

      <pre style={codeStyle}><code>{`# CapRover CI/CD (GitHub Actions)
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: caprover/deploy-action@v1
        with:
          server: 'https://captain.your-server.com'
          password: 'your-password'
          app: 'myapp'

# Dokku CI/CD (GitHub Actions)
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: dokku/github-action@master
        with:
          git_remote_url: 'ssh://dokku@your-server:22/myapp'
          ssh_private_key: 'your-ssh-key'`}</code></pre>

      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>CapRover Scaling</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '通过Docker Swarm支持多节点集群。在仪表板中调整实例数量。内置负载均衡分发流量到所有实例。' : 'Multi-node clustering via Docker Swarm. Scale instances in dashboard. Built-in load balancer distributes traffic across all instances.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>Dokku Scaling</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '单服务器垂直扩展。通过dokku ps:scale命令调整进程数量。需要外部负载均衡器进行多服务器部署。' : 'Single server vertical scaling. Scale processes via dokku ps:scale command. Requires external load balancer for multi-server.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.capRoverBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '需要可视化管理' : 'Need visual management'}</li>
            <li>{isZh ? '多节点集群需求' : 'Multi-node clustering needs'}</li>
            <li>{isZh ? '部署多个服务' : 'Deploying multiple services'}</li>
            <li>{isZh ? '团队协作开发' : 'Team collaboration'}</li>
            <li>{isZh ? '快速设置一键应用' : 'Quick one-click app setup'}</li>
            <li>{isZh ? '需要内置负载均衡' : 'Need built-in load balancing'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{ct.dokkuBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '喜欢命令行' : 'Prefer command line'}</li>
            <li>{isZh ? '单服务器部署' : 'Single server deployment'}</li>
            <li>{isZh ? '最小化开销' : 'Minimal overhead'}</li>
            <li>{isZh ? '需要丰富插件生态' : 'Need rich plugin ecosystem'}</li>
            <li>{isZh ? 'Git驱动工作流' : 'Git-driven workflow'}</li>
            <li>{isZh ? '独立开发者' : 'Solo developers'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(16,185,129,0.1))', borderRadius: 12, border: '1px solid rgba(245,158,11,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#f59e0b', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/docker-compose-generator'} style={{ color: '#f59e0b', textDecoration: 'none' }}>Docker Compose Generator</a> • {' '}
        <a href={'/' + lang + '/tools/yaml-formatter'} style={{ color: '#f59e0b', textDecoration: 'none' }}>YAML Formatter</a>
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
