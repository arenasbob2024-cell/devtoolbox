'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Let\'s Encrypt vs ZeroSSL: SSL Certificate Provider Comparison',
    intro: 'Let\'s Encrypt and ZeroSSL are two major providers of free SSL/TLS certificates. Both offer automated certificate issuance through ACME protocol, but differ in features, quotas, and ecosystem support. This comparison examines their capabilities, limitations, and ideal use cases for securing your websites.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Let\'s Encrypt is the industry standard with massive ecosystem support and unlimited certificates. ZeroSSL offers a web interface, better rate limit handling, and 90-day certificates. Choose Let\'s Encrypt for maximum compatibility and automation. Choose ZeroSSL for web UI management and easier rate limit recovery.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Let\'s Encrypt issues billions of certificates and has the largest ecosystem',
    takeaway2: 'ZeroSSL provides a web UI for manual certificate management',
    takeaway3: 'Both offer free 90-day certificates via ACME protocol',
    takeaway4: 'Let\'s Encrypt has stricter rate limits but higher quotas',
    takeaway5: 'ZeroSSL offers paid plans with extended validation options',
    takeaway6: 'Both support wildcard certificates and multi-domain SANs',
    
    whatIsLetsEncryptTitle: 'What is Let\'s Encrypt?',
    whatIsLetsEncryptContent: 'Let\'s Encrypt is a non-profit certificate authority launched in 2016 by ISRG. It provides free, automated SSL/TLS certificates through the ACME protocol. With over 300 million certificates issued, it is the largest certificate authority in the world. Supported by major tech companies, it has become the default choice for automated SSL.',
    
    whatIsZeroSSLTitle: 'What is ZeroSSL?',
    whatIsZeroSSLContent: 'ZeroSSL is a commercial certificate authority offering free and paid SSL certificates. Founded in 2016, it provides an ACME-compatible API along with a web interface for certificate management. ZeroSSL differentiates with easier rate limit handling, business verification options, and paid plans for extended validation certificates.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'ACME client configuration for both providers:',
    
    letsencryptExampleTitle: 'Let\'s Encrypt with Certbot',
    zerosslExampleTitle: 'ZeroSSL with Certbot/ACME',
    
    rateLimitsTitle: 'Rate Limits & Quotas',
    rateLimitsIntro: 'Understanding the limitations:',
    
    useCasesTitle: 'Best Use Cases',
    letsencryptBestFor: 'Let\'s Encrypt is Best For:',
    zerosslBestFor: 'ZeroSSL is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Let\'s Encrypt remains the gold standard for free SSL certificates with unmatched ecosystem support and reliability. ZeroSSL offers a compelling alternative with its web UI and more lenient rate limits. For most users, Let\'s Encrypt with automated renewal is the best choice. Consider ZeroSSL if you need manual management, hit Let\'s Encrypt rate limits, or require business validation. Many organizations use both: Let\'s Encrypt for primary domains and ZeroSSL as a backup.',
    
    faq1q: 'Are certificates from both providers trusted by browsers?',
    faq1a: 'Yes, certificates from both Let\'s Encrypt and ZeroSSL are trusted by all major browsers and operating systems. Both use root CAs that are included in major trust stores. There is no difference in browser compatibility or trust level.',
    
    faq2q: 'Which has better automation support?',
    faq2a: 'Let\'s Encrypt has better automation support with Certbot, Caddy, Traefik, and countless integrations. ZeroSSL supports ACME protocol but has fewer third-party integrations. If automation is your priority, Let\'s Encrypt is the clear winner.',
    
    faq3q: 'What are the rate limits for each provider?',
    faq3a: 'Let\'s Encrypt: 50 certificates per registered domain per week, 100 names per certificate, 300 new orders per account per 3 hours. ZeroSSL: 3 certificates per domain per 90 days on free tier (higher on paid), with more lenient retry policies. Let\'s Encrypt has higher overall quotas but stricter enforcement.',
    
    faq4q: 'Can I use both providers for the same domain?',
    faq4a: 'Yes, you can use both providers for the same domain. This provides redundancy if one CA has issues. You can use different certificates on different servers or rotate between them. Some organizations use Let\'s Encrypt for production and ZeroSSL for staging.',
    
    faq5q: 'Do both support wildcard certificates?',
    faq5a: 'Yes, both Let\'s Encrypt and ZeroSSL support wildcard certificates (*.example.com). Wildcard certificates require DNS-01 challenge validation, which proves you control the domain DNS. Both providers support this challenge type.',
    
    faq6q: 'What happens if I hit rate limits?',
    faq6a: 'With Let\'s Encrypt, you must wait for the rate limit window to reset (usually 7 days). You can request a rate limit increase for legitimate needs. ZeroSSL offers paid plans to bypass free tier limits and has a more forgiving approach to rate limiting.',
    
    faq7q: 'Which is better for enterprise use?',
    faq7a: 'For enterprises, ZeroSSL offers paid plans with business validation, dedicated support, and SLAs. Let\'s Encrypt works well for enterprises with strong automation but lacks paid support options. Many enterprises use both: Let\'s Encrypt for most certificates and ZeroSSL for specific needs.',
    
    faq8q: 'How long are certificates valid?',
    faq8a: 'Both providers issue 90-day certificates. This short validity improves security by limiting exposure from compromised keys and ensures regular validation. Automated renewal is strongly recommended for both providers to avoid expiration.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Let\'s Encrypt vs ZeroSSL：SSL 证书提供商对比',
    intro: 'Let\'s Encrypt 和 ZeroSSL 是两个主要的免费 SSL/TLS 证书提供商。两者都通过 ACME 协议提供自动证书颁发，但在功能、配额和生态系统支持方面有所不同。本比较将考察它们的能力、限制和保护网站的理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Let\'s Encrypt 是行业标准，拥有巨大的生态系统支持和无限证书。ZeroSSL 提供网络界面、更好的速率限制处理和 90 天证书。为最大兼容性和自动化选择 Let\'s Encrypt。为 Web UI 管理和更轻松的速率限制恢复选择 ZeroSSL。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Let\'s Encrypt 颁发数十亿证书，拥有最大生态系统',
    takeaway2: 'ZeroSSL 提供用于手动证书管理的 Web UI',
    takeaway3: '两者都通过 ACME 协议提供免费 90 天证书',
    takeaway4: 'Let\'s Encrypt 有更严格的速率限制但更高的配额',
    takeaway5: 'ZeroSSL 提供具有扩展验证选项的付费计划',
    takeaway6: '两者都支持通配符证书和多域名 SAN',
    
    whatIsLetsEncryptTitle: '什么是 Let\'s Encrypt？',
    whatIsLetsEncryptContent: 'Let\'s Encrypt 是由 ISRG 于 2016 年推出的非营利证书颁发机构。它通过 ACME 协议提供免费、自动化的 SSL/TLS 证书。已颁发超过 3 亿张证书，是世界上最大的证书颁发机构。得到主要科技公司支持，它已成为自动化 SSL 的默认选择。',
    
    whatIsZeroSSLTitle: '什么是 ZeroSSL？',
    whatIsZeroSSLContent: 'ZeroSSL 是一家商业证书颁发机构，提供免费和付费 SSL 证书。成立于 2016 年，它提供与 ACME 兼容的 API 以及用于证书管理的网络界面。ZeroSSL 以更轻松的速率限制处理、商业验证选项和扩展验证证书的付费计划为特色。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '两个提供商的 ACME 客户端配置：',
    
    letsencryptExampleTitle: 'Let\'s Encrypt 与 Certbot',
    zerosslExampleTitle: 'ZeroSSL 与 Certbot/ACME',
    
    rateLimitsTitle: '速率限制与配额',
    rateLimitsIntro: '了解限制：',
    
    useCasesTitle: '最佳用例',
    letsencryptBestFor: 'Let\'s Encrypt 最适合：',
    zerosslBestFor: 'ZeroSSL 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Let\'s Encrypt 仍然是免费 SSL 证书的黄金标准，拥有无与伦比的生态系统支持和可靠性。ZeroSSL 通过其 Web UI 和更宽松的速率限制提供了有吸引力的替代方案。对于大多数用户，Let\'s Encrypt 与自动续订是最佳选择。如果需要手动管理、遇到 Let\'s Encrypt 速率限制或需要商业验证，考虑 ZeroSSL。许多组织同时使用两者：Let\'s Encrypt 用于主域名，ZeroSSL 作为备用。',
    
    faq1q: '两个提供商的证书都被浏览器信任吗？',
    faq1a: '是的，Let\'s Encrypt 和 ZeroSSL 的证书都被所有主要浏览器和操作系统信任。两者都使用包含在主要信任存储中的根 CA。浏览器兼容性或信任级别没有差异。',
    
    faq2q: '哪个有更好的自动化支持？',
    faq2a: 'Let\'s Encrypt 通过 Certbot、Caddy、Traefik 和无数集成具有更好的自动化支持。ZeroSSL 支持 ACME 协议但第三方集成较少。如果自动化是你的优先事项，Let\'s Encrypt 是明显的赢家。',
    
    faq3q: '每个提供商的速率限制是什么？',
    faq3a: 'Let\'s Encrypt：每周每个注册域名 50 张证书，每张证书 100 个名称，每 3 小时每账户 300 个新订单。ZeroSSL：免费层每 90 天每个域名 3 张证书（付费更高），重试策略更宽松。Let\'s Encrypt 总体配额更高但执行更严格。',
    
    faq4q: '我可以为同一域名使用两个提供商吗？',
    faq4a: '是的，你可以为同一域名使用两个提供商。如果一个 CA 出现问题，这提供了冗余。你可以在不同服务器上使用不同证书或在它们之间轮换。一些组织使用 Let\'s Encrypt 用于生产，ZeroSSL 用于暂存。',
    
    faq5q: '两者都支持通配符证书吗？',
    faq5a: '是的，Let\'s Encrypt 和 ZeroSSL 都支持通配符证书（*.example.com）。通配符证书需要 DNS-01 挑战验证，证明你控制域 DNS。两个提供商都支持这种挑战类型。',
    
    faq6q: '如果我达到速率限制会怎样？',
    faq6a: '使用 Let\'s Encrypt，你必须等待速率限制窗口重置（通常 7 天）。你可以为合法需求请求速率限制增加。ZeroSSL 提供付费计划以绕过免费层限制，并且对速率限制采取更宽容的方法。',
    
    faq7q: '哪个更适合企业使用？',
    faq7a: '对于企业，ZeroSSL 提供具有商业验证、专门支持和 SLA 的付费计划。Let\'s Encrypt 对具有强大自动化的企业效果很好，但缺乏付费支持选项。许多企业使用两者：Let\'s Encrypt 用于大多数证书，ZeroSSL 用于特定需求。',
    
    faq8q: '证书有效期多长？',
    faq8a: '两个提供商都颁发 90 天证书。这种短有效期通过限制受损密钥的暴露来提高安全性，并确保定期验证。强烈建议为两个提供商使用自动续订以避免过期。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function LetsEncryptVsZeroSSL({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsLetsEncryptTitle}</h3>
      <p style={pStyle}>{ct.whatIsLetsEncryptContent}</p>

      <h3 style={h3Style}>{ct.whatIsZeroSSLTitle}</h3>
      <p style={pStyle}>{ct.whatIsZeroSSLContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Let&apos;s Encrypt</th>
              <th style={thStyle}>ZeroSSL</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '类型' : 'Type', isZh ? '非营利' : 'Non-profit', isZh ? '商业' : 'Commercial'],
              [isZh ? '证书有效期' : 'Certificate Validity', '90 天', '90 天'],
              [isZh ? '通配符证书' : 'Wildcard Certs', '✅', '✅'],
              [isZh ? 'Web UI' : 'Web UI', '❌', '✅'],
              [isZh ? 'ACME 支持' : 'ACME Support', '✅', '✅'],
              [isZh ? '免费层配额' : 'Free Tier Quota', isZh ? '高' : 'High', isZh ? '中等' : 'Medium'],
              [isZh ? '付费计划' : 'Paid Plans', '❌', '✅'],
              [isZh ? '生态系统' : 'Ecosystem', isZh ? '最广泛' : 'Widest', isZh ? '增长中' : 'Growing'],
            ].map(([feature, letsencrypt, zerossl], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{letsencrypt}</td>
                <td style={tdStyle}>{zerossl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f1a42b' }}>{ct.letsencryptExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Install Certbot (Ubuntu/Debian)
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain certificate for Nginx
sudo certbot --nginx -d example.com -d www.example.com

# Obtain wildcard certificate (requires DNS plugin)
sudo apt install python3-certbot-dns-cloudflare
sudo certbot certonly \\
  --dns-cloudflare \\
  --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini \\
  -d "*.example.com" \\
  -d example.com

# Configuration file for Cloudflare DNS
# /etc/letsencrypt/cloudflare.ini
dns_cloudflare_api_token = your_cloudflare_api_token

# Auto-renewal (Certbot sets up cron/systemd timer)
sudo certbot renew --dry-run

# Check certificate status
sudo certbot certificates

# Nginx configuration with Let's Encrypt
server {
    listen 443 ssl http2;
    server_name example.com www.example.com;
    
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;
    
    # Enable HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    location / {
        proxy_pass http://localhost:3000;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$server_name$request_uri;
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.zerosslExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# ZeroSSL with Certbot ACME
# Generate ZeroSSL EAB credentials from ZeroSSL dashboard

# Register ZeroSSL account
certbot register \\
  --server https://acme.zerossl.com/v2/DV90 \\
  --eab-kid YOUR_KID \\
  --eab-hmac-key YOUR_HMAC_KEY \\
  --email your-email@example.com

# Obtain certificate
certbot certonly \\
  --server https://acme.zerossl.com/v2/DV90 \\
  --nginx \\
  -d example.com -d www.example.com

# Or using DNS validation
certbot certonly \\
  --server https://acme.zerossl.com/v2/DV90 \\
  --dns-cloudflare \\
  --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini \\
  -d "*.example.com" -d example.com

# Using acme.sh with ZeroSSL
curl https://get.acme.sh | sh -s email=your-email@example.com

# Set ZeroSSL as default CA
acme.sh --set-default-ca --server zerossl

# Issue certificate
acme.sh --issue -d example.com -d www.example.com --nginx

# Install certificate to Nginx
acme.sh --install-cert -d example.com \\
  --key-file       /etc/nginx/ssl/example.com/key.pem  \\
  --fullchain-file /etc/nginx/ssl/example.com/cert.pem \\
  --reloadcmd     "nginx -s reload"

# ZeroSSL also provides REST API for direct integration
# Get API key from ZeroSSL dashboard
API_KEY="your_api_key"

# Create certificate via API
curl -X POST \\
  "https://api.zerossl.com/certificates?access_key=$\\u0060{API_KEY}\\u0060" \\
  -d "csr_data=YOUR_CSR" \\
  -d "product=ssl_basic"

# Download certificate
curl "https://api.zerossl.com/certificates/\\u0060{CERT_ID}\\u0060/download?access_key=$\\u0060{API_KEY}\\u0060"`}</code></pre>

      <h2 style={h2Style}>{ct.rateLimitsTitle}</h2>
      <p style={pStyle}>{ct.rateLimitsIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '限制类型' : 'Limit Type'}</th>
              <th style={thStyle}>Let&apos;s Encrypt</th>
              <th style={thStyle}>ZeroSSL</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '每域名证书数' : 'Certs per Domain', '50/周', '3/90天（免费层）'],
              [isZh ? '每证书域名数' : 'Domains per Cert', '100', '100'],
              [isZh ? '新订单' : 'New Orders', '300/3小时', isZh ? '按计划' : 'Plan-based'],
              [isZh ? '失败验证' : 'Failed Validations', '60/小时', isZh ? '更宽松' : 'More lenient'],
              [isZh ? '账户限制' : 'Account Limits', isZh ? '严格' : 'Strict', isZh ? '灵活' : 'Flexible'],
              [isZh ? '速率限制增加' : 'Rate Limit Increase', isZh ? '可申请' : 'Available', isZh ? '付费计划' : 'Paid plans'],
            ].map(([limit, letsencrypt, zerossl], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{limit}</td>
                <td style={tdStyle}>{letsencrypt}</td>
                <td style={tdStyle}>{zerossl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f1a42b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f1a42b' }}>{ct.letsencryptBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '自动化环境' : 'Automated environments'}</li>
            <li>{isZh ? 'DevOps 和 CI/CD' : 'DevOps and CI/CD'}</li>
            <li>{isZh ? 'Kubernetes 和容器' : 'Kubernetes and containers'}</li>
            <li>{isZh ? '大规模部署' : 'Large-scale deployments'}</li>
            <li>{isZh ? '开源项目' : 'Open-source projects'}</li>
            <li>{isZh ? '需要广泛兼容性' : 'Need broad compatibility'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.zerosslBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '需要 Web UI 管理' : 'Need Web UI management'}</li>
            <li>{isZh ? 'Let\'s Encrypt 速率限制' : 'Hit Let\'s Encrypt rate limits'}</li>
            <li>{isZh ? '商业验证需求' : 'Business validation needs'}</li>
            <li>{isZh ? '手动证书管理' : 'Manual certificate management'}</li>
            <li>{isZh ? '企业级支持' : 'Enterprise support'}</li>
            <li>{isZh ? '需要备份 CA' : 'Need backup CA'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={"/" + lang + "/tools/hash-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a> • {' '}
        <a href={"/" + lang + "/tools/jwt-decoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
