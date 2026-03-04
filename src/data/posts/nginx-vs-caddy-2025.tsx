'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Nginx vs Caddy 2025: Web Server Comparison',
    intro: 'Nginx and Caddy represent two different approaches to modern web servers. Nginx, the battle-tested veteran, powers over 30% of websites with its high performance and flexibility. Caddy, the modern contender, focuses on simplicity and automatic HTTPS. This 2025 comparison examines their capabilities, performance, and ideal use cases in current infrastructure.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Nginx for maximum performance, extensive features, and when you need fine-grained control. Choose Caddy for simplicity, automatic HTTPS, and when you want a modern configuration experience. Both are excellent, but serve different priorities: Nginx for power users, Caddy for ease of use.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Nginx has 20+ years of production battle-testing',
    takeaway2: 'Caddy provides automatic HTTPS by default with Let\'s Encrypt',
    takeaway3: 'Nginx offers more modules and advanced features',
    takeaway4: 'Caddy uses modern configuration format (Caddyfile)',
    takeaway5: 'Nginx excels at high-traffic, high-concurrency scenarios',
    takeaway6: 'Caddy has built-in HTTP/2 and HTTP/3 support',
    
    whatIsNginxTitle: 'What is Nginx?',
    whatIsNginxContent: 'Nginx is a high-performance web server, reverse proxy, load balancer, and HTTP cache created by Igor Sysoev in 2004. It uses an event-driven, asynchronous architecture that handles tens of thousands of concurrent connections with minimal resource usage. Nginx is known for its stability, rich feature set, and extensive third-party module ecosystem.',
    
    whatIsCaddyTitle: 'What is Caddy?',
    whatIsCaddyContent: 'Caddy is a modern, open-source web server written in Go, created by Matt Holt. First released in 2015, Caddy emphasizes simplicity and security with automatic HTTPS using Let\'s Encrypt. It features a clean configuration syntax, built-in HTTP/2 and HTTP/3 support, and requires zero configuration for many common use cases.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmarks and performance characteristics:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Common configuration patterns:',
    
    nginxExampleTitle: 'Nginx Configuration',
    caddyExampleTitle: 'Caddy Configuration',
    
    dataSourceTitle: 'Modules and Extensibility',
    dataSourceIntro: 'Module ecosystem and extensibility:',
    
    alertingTitle: 'SSL/TLS and Security',
    alertingIntro: 'Security features and HTTPS management:',
    
    useCasesTitle: 'Best Use Cases',
    nginxBestFor: 'Nginx is Best For:',
    caddyBestFor: 'Caddy is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Nginx and Caddy excel in different areas. Nginx remains the choice for high-performance, feature-rich deployments where fine-grained control is essential. Its proven track record and extensive ecosystem make it ideal for complex infrastructure. Caddy shines when simplicity and developer experience are priorities, with automatic HTTPS and clean configuration lowering the barrier to entry. In 2025, both are excellent choices: Nginx for power and scale, Caddy for ease and modernity.',
    
    faq1q: 'Which is faster in 2025?',
    faq1a: 'Nginx typically has higher raw performance in benchmarks, especially for static content and high-concurrency scenarios. Caddy performance is very good for most use cases but Nginx architecture gives it an edge at extreme scale. For most applications, both perform adequately.',
    
    faq2q: 'How easy is SSL/HTTPS setup?',
    faq2a: 'Caddy wins hands down with automatic HTTPS. It automatically provisions and renews Let\'s Encrypt certificates with zero configuration. Nginx requires manual certificate management or additional tools like Certbot. For automatic HTTPS, Caddy is significantly easier.',
    
    faq3q: 'Which has better documentation?',
    faq3a: 'Nginx has extensive documentation built over 20 years, but it can be complex for beginners. Caddy has excellent, modern documentation that\'s easier to navigate. Both have active communities, but Nginx has a larger ecosystem due to its age and market share.',
    
    faq4q: 'Can Caddy replace Nginx?',
    faq4a: 'For many use cases, yes. Caddy can handle reverse proxying, load balancing, and serving static files. However, Nginx offers more advanced features like stream proxying, mail proxying, and complex routing that Caddy may not match. Evaluate based on your specific requirements.',
    
    faq5q: 'What about memory usage?',
    faq5a: 'Nginx is known for very low memory footprint, often using 10-20MB for basic setups. Caddy, being written in Go, uses more memory (typically 30-50MB minimum). For memory-constrained environments, Nginx is more efficient.',
    
    faq6q: 'How do they handle HTTP/3?',
    faq6a: 'Caddy has built-in HTTP/3 (QUIC) support enabled by default. Nginx supports HTTP/3 but requires specific version and compilation flags. Caddy has an edge in HTTP/3 ease of use, while Nginx offers more control over implementation.',
    
    faq7q: 'Which is better for containers?',
    faq7a: 'Both work well in containers. Nginx official images are smaller and more widely used. Caddy images are slightly larger but offer simpler configuration. For Kubernetes ingress, both have excellent controllers. Choice depends on your configuration preferences.',
    
    faq8q: 'What about commercial support?',
    faq8a: 'Nginx offers Nginx Plus with commercial support, advanced features, and monitoring. Caddy offers Caddy Enterprise for commercial use cases. Both have free open-source versions. Nginx commercial ecosystem is more mature due to longer market presence.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Nginx vs Caddy 2025: Web服务器对比',
    intro: 'Nginx和Caddy代表了现代Web服务器的两种不同方法。Nginx作为久经考验的老兵,以其高性能和灵活性为超过30%的网站提供动力。Caddy作为现代竞争者,专注于简单性和自动HTTPS。这个2025年比较考察它们在当前基础设施中的能力、性能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为最大性能、丰富功能和需要细粒度控制选择Nginx。为简单性、自动HTTPS和想要现代配置体验选择Caddy。两者都很出色,但服务于不同的优先级:Nginx为高级用户,Caddy为易用性。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Nginx拥有20+年的生产实战经验',
    takeaway2: 'Caddy默认通过Let\'s Encrypt提供自动HTTPS',
    takeaway3: 'Nginx提供更多模块和高级功能',
    takeaway4: 'Caddy使用现代配置格式(Caddyfile)',
    takeaway5: 'Nginx在高流量、高并发场景中表现出色',
    takeaway6: 'Caddy内置HTTP/2和HTTP/3支持',
    
    whatIsNginxTitle: '什么是Nginx?',
    whatIsNginxContent: 'Nginx是由Igor Sysoev于2004年创建的高性能Web服务器、反向代理、负载均衡器和HTTP缓存。它使用事件驱动的异步架构,能够以最少的资源使用处理数万个并发连接。Nginx以其稳定性、丰富的功能集和广泛的第三方模块生态系统而闻名。',
    
    whatIsCaddyTitle: '什么是Caddy?',
    whatIsCaddyContent: 'Caddy是由Matt Holt创建的现代开源Web服务器,用Go编写。首次发布于2015年,Caddy强调简单性和安全性,使用Let\'s Encrypt自动提供HTTPS。它具有清晰的配置语法、内置HTTP/2和HTTP/3支持,许多常见用例需要零配置。',
    
    performanceTitle: '性能对比',
    performanceIntro: '基准测试和性能特征:',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较:',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '常见配置模式:',
    
    nginxExampleTitle: 'Nginx配置',
    caddyExampleTitle: 'Caddy配置',
    
    dataSourceTitle: '模块和扩展性',
    dataSourceIntro: '模块生态系统和扩展性:',
    
    alertingTitle: 'SSL/TLS和安全',
    alertingIntro: '安全功能和HTTPS管理:',
    
    useCasesTitle: '最佳用例',
    nginxBestFor: 'Nginx最适合:',
    caddyBestFor: 'Caddy最适合:',
    
    conclusionTitle: '结论',
    conclusionContent: 'Nginx和Caddy在不同领域各有优势。Nginx仍然是高性能、功能丰富部署的选择,其中细粒度控制至关重要。其经过验证的记录和广泛的生态系统使其成为复杂基础设施的理想选择。当简单性和开发人员体验是优先事项时,Caddy表现出色,自动HTTPS和清晰的配置降低了入门门槛。在2025年,两者都是优秀的选择:Nginx为强大和规模,Caddy为简单和现代。',
    
    faq1q: '2025年哪个更快?',
    faq1a: 'Nginx在基准测试中通常具有更高的原始性能,特别是对于静态内容和高并发场景。Caddy对于大多数用例性能非常好,但Nginx架构在极端规模下具有优势。对于大多数应用程序,两者都表现良好。',
    
    faq2q: 'SSL/HTTPS设置有多容易?',
    faq2a: 'Caddy凭借自动HTTPS轻松获胜。它自动配置和续订Let\'s Encrypt证书,无需配置。Nginx需要手动证书管理或Certbot等额外工具。对于自动HTTPS,Caddy明显更容易。',
    
    faq3q: '哪个文档更好?',
    faq3a: 'Nginx拥有20年来建立的广泛文档,但对初学者来说可能很复杂。Caddy拥有优秀的现代文档,更容易导航。两者都有活跃的社区,但由于年龄和市场份额,Nginx拥有更大的生态系统。',
    
    faq4q: 'Caddy可以替代Nginx吗?',
    faq4a: '对于许多用例,可以。Caddy可以处理反向代理、负载均衡和提供静态文件。但是,Nginx提供更高级的功能,如流代理、邮件代理和Caddy可能无法匹配的复杂路由。根据你的具体要求进行评估。',
    
    faq5q: '内存使用怎么样?',
    faq5a: 'Nginx以非常低的内存占用著称,基本设置通常使用10-20MB。Caddy用Go编写,使用更多内存(通常最少30-50MB)。对于内存受限的环境,Nginx更高效。',
    
    faq6q: '它们如何处理HTTP/3?',
    faq6a: 'Caddy默认启用内置HTTP/3(QUIC)支持。Nginx支持HTTP/3但需要特定版本和编译标志。Caddy在HTTP/3易用性方面具有优势,而Nginx对实现提供更多控制。',
    
    faq7q: '哪个更适合容器?',
    faq7a: '两者在容器中都工作良好。Nginx官方镜像更小,使用更广泛。Caddy镜像稍大但提供更简单的配置。对于Kubernetes入口,两者都有优秀的控制器。选择取决于你的配置偏好。',
    
    faq8q: '商业支持怎么样?',
    faq8a: 'Nginx提供Nginx Plus,具有商业支持、高级功能和监控。Caddy为商业用例提供Caddy Enterprise。两者都有免费的开源版本。由于市场存在时间更长,Nginx商业生态系统更成熟。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function NginxVsCaddy2025({ lang }: { lang: string }) {
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

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      {/* Key Takeaways */}
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

      {/* Overview */}
      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsNginxTitle}</h3>
      <p style={pStyle}>{ct.whatIsNginxContent}</p>

      <h3 style={h3Style}>{ct.whatIsCaddyTitle}</h3>
      <p style={pStyle}>{ct.whatIsCaddyContent}</p>

      {/* Performance Table */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Nginx</th>
              <th style={thStyle}>Caddy</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '并发连接' : 'Concurrent Connections', '50K+', '10K+'],
              [isZh ? '内存占用' : 'Memory Usage', '10-20 MB', '30-50 MB'],
              [isZh ? '静态文件吞吐' : 'Static File Throughput', isZh ? '极高' : 'Very High', isZh ? '高' : 'High'],
              [isZh ? '代理性能' : 'Proxy Performance', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? '启动时间' : 'Startup Time', isZh ? '快' : 'Fast', isZh ? '中等' : 'Medium'],
              [isZh ? 'CPU效率' : 'CPU Efficiency', isZh ? '极高' : 'Very High', isZh ? '高' : 'High'],
              [isZh ? '基准测试排名' : 'Benchmark Rank', 'Top Tier', 'High Tier'],
              [isZh ? '可扩展性' : 'Scalability', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
            ].map(([metric, nginx, caddy], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{nginx}</td>
                <td style={tdStyle}>{caddy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Nginx</th>
              <th style={thStyle}>Caddy</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '反向代理' : 'Reverse Proxy', '✓', '✓'],
              [isZh ? '负载均衡' : 'Load Balancing', '✓', '✓'],
              [isZh ? 'HTTP/2' : 'HTTP/2', '✓', '✓ (default)'],
              [isZh ? 'HTTP/3 (QUIC)' : 'HTTP/3 (QUIC)', '✓ (1.25+)', '✓ (default)'],
              [isZh ? '自动HTTPS' : 'Auto HTTPS', '✗', '✓'],
              [isZh ? 'WebSocket' : 'WebSocket', '✓', '✓'],
              [isZh ? 'gRPC代理' : 'gRPC Proxy', '✓', '✓'],
              [isZh ? '缓存' : 'Caching', '✓', '✓'],
              [isZh ? '流代理(TCP/UDP)' : 'Stream Proxy', '✓', 'Limited'],
              [isZh ? '邮件代理' : 'Mail Proxy', '✓', '✗'],
              [isZh ? '动态模块' : 'Dynamic Modules', '✓', 'Plugins'],
              [isZh ? '配置热重载' : 'Hot Reload', '✓', '✓'],
              [isZh ? 'API' : 'API', 'Limited', '✓'],
            ].map(([feature, nginx, caddy], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{nginx}</td>
                <td style={tdStyle}>{caddy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#009639' }}>{ct.nginxExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Nginx Configuration Examples

# Basic HTTP server with PHP-FPM
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/html;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \\.php$ {
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\\.ht {
        deny all;
    }
}

# Reverse proxy with load balancing
upstream backend {
    least_conn;
    server backend1.example.com:8000 weight=5;
    server backend2.example.com:8000;
    server backend3.example.com:8000 backup;
    keepalive 32;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Connection reuse
        proxy_set_header Connection "";
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}

# SSL/TLS with manual certificate
server {
    listen 443 ssl http2;
    server_name secure.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    # HSTS
    add_header Strict-Transport-Security "max-age=31536000" always;

    root /var/www/secure;
}

# Rate limiting
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

server {
    location /api/ {
        limit_req zone=api_limit burst=20 nodelay;
        proxy_pass http://backend;
    }
}

# Caching
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m 
                 max_size=1g inactive=60m use_temp_path=off;

server {
    location /static/ {
        proxy_cache my_cache;
        proxy_cache_valid 200 60m;
        proxy_cache_key $scheme$proxy_host$request_uri;
        add_header X-Cache-Status $upstream_cache_status;
        proxy_pass http://backend;
    }
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#1e88e5' }}>{ct.caddyExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Caddy Configuration Examples (Caddyfile)

# Basic site with automatic HTTPS
example.com {
    root * /var/www/html
    file_server
    encode gzip
    
    # PHP handling
    php_fastcgi unix//run/php/php8.2-fpm.sock
}

# Reverse proxy with load balancing
api.example.com {
    reverse_proxy {
        to backend1.example.com:8000
        to backend2.example.com:8000
        to backend3.example.com:8000
        
        # Load balancing policy
        lb_policy least_conn
        lb_try_duration 5s
        
        # Health checks
        health_path /health
        health_interval 10s
        health_timeout 5s
        
        # Headers
        header_up Host {host}
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-For {remote_host}
        header_up X-Forwarded-Proto {scheme}
    }
}

# Multiple backends with different paths
app.example.com {
    # API proxy
    handle /api/* {
        reverse_proxy api-server:8000
    }
    
    # WebSocket proxy
    handle /ws/* {
        reverse_proxy ws-server:9000
    }
    
    # Static files
    handle {
        root * /var/www/app
        file_server
    }
}

# Manual SSL certificate
secure.example.com {
    tls /etc/ssl/cert.pem /etc/ssl/key.pem
    root * /var/www/secure
    file_server
}

# Rate limiting (requires caddy-rate-limit plugin)
{
    order rate_limit before respond
}

api.example.com {
    rate_limit {
        zone api_limit {
            key {remote_host}
            events 100
            window 1m
        }
    }
    reverse_proxy backend:8000
}

# Caching (requires caddy-cache plugin)
cached.example.com {
    cache {
        match_path /static/*
        ttl 1h
    }
    reverse_proxy backend:8000
}

# Advanced configuration with snippets
(snippet) {
    encode gzip zstd
    header {
        # Security headers
        Strict-Transport-Security "max-age=31536000; include-subdomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        X-XSS-Protection "1; mode=block"
        -Server
    }
}

example.com {
    import snippet
    root * /var/www/html
    file_server
}

# gRPC proxy
grpc.example.com {
    reverse_proxy h2c://grpc-server:50051
}

# Global options
{
    # HTTP/3 enabled by default in Caddy 2.6+
    experimental_http3
    
    # Email for ACME account
    email admin@example.com
    
    # Default SNI
    default_sni example.com
    
    # OCSP stapling
    ocsp_stapling off
}

# JSON API configuration (alternative to Caddyfile)
# curl localhost:2019/load -X POST -H "Content-Type: application/json" -d @- <<'EOF'
{
    "apps": {
        "http": {
            "servers": {
                "myserver": {
                    "listen": [":443"],
                    "routes": [
                        {
                            "match": [{"host": ["example.com"]}],
                            "handle": [
                                {
                                    "handler": "file_server",
                                    "root": "/var/www/html"
                                }
                            ]
                        }
                    ],
                    "automatic_https": {
                        "disable": false
                    }
                }
            }
        }
    }
}
EOF`}</code></pre>

      {/* Modules */}
      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>Nginx</th>
              <th style={thStyle}>Caddy</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '官方模块' : 'Official Modules', '50+', 'Built-in'],
              [isZh ? '第三方模块' : 'Third-party Modules', '100+', '20+'],
              [isZh ? '动态加载' : 'Dynamic Loading', isZh ? '支持' : 'Supported', isZh ? '插件系统' : 'Plugin system'],
              [isZh ? '开发语言' : 'Development Language', 'C', 'Go'],
              [isZh ? '模块开发难度' : 'Module Development', isZh ? '中等-高' : 'Medium-High', isZh ? '低-中等' : 'Low-Medium'],
              [isZh ? 'Lua支持' : 'Lua Support', 'OpenResty', isZh ? '无' : 'None'],
              [isZh ? 'WAF模块' : 'WAF Modules', 'ModSecurity, etc.', 'Coraza (plugin)'],
              [isZh ? '监控' : 'Monitoring', 'Stub status, VTS', 'Prometheus (built-in)'],
            ].map(([cat, nginx, caddy], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{nginx}</td>
                <td style={tdStyle}>{caddy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Security */}
      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #009639' }}>
          <strong style={{ color: '#009639' }}>Nginx Security</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '提供全面的安全功能：SSL/TLS终止、速率限制、访问控制、WAF集成、请求过滤。需要手动配置和管理证书。支持OCSP装订、HSTS、CSP等安全头。与ModSecurity等WAF良好集成。' : 'Comprehensive security: SSL/TLS termination, rate limiting, access control, WAF integration, request filtering. Requires manual certificate configuration. Supports OCSP stapling, HSTS, CSP headers. Integrates well with ModSecurity and other WAFs.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #1e88e5' }}>
          <strong style={{ color: '#1e88e5' }}>Caddy Security</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '开箱即用的安全功能：自动HTTPS证书配置和续订、HTTP/2和HTTP/3默认启用、现代TLS配置、自动HTTPS重定向。内置安全头设置。零配置即可获得A+ SSL评级。' : 'Security out-of-the-box: automatic HTTPS certificate provisioning and renewal, HTTP/2 and HTTP/3 enabled by default, modern TLS configuration, automatic HTTPS redirects. Built-in security headers. A+ SSL rating with zero configuration.'}
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #009639' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#009639' }}>{ct.nginxBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '高流量网站' : 'High-traffic websites'}</li>
            <li>{isZh ? '微服务API网关' : 'Microservices API gateway'}</li>
            <li>{isZh ? '复杂路由需求' : 'Complex routing needs'}</li>
            <li>{isZh ? '流媒体服务' : 'Streaming services'}</li>
            <li>{isZh ? '需要特定模块' : 'Specific module requirements'}</li>
            <li>{isZh ? '企业级部署' : 'Enterprise deployments'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #1e88e5' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#1e88e5' }}>{ct.caddyBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '个人项目/博客' : 'Personal projects/blogs'}</li>
            <li>{isZh ? '快速原型开发' : 'Quick prototyping'}</li>
            <li>{isZh ? '中小型应用' : 'Small to medium apps'}</li>
            <li>{isZh ? '需要自动HTTPS' : 'Automatic HTTPS needed'}</li>
            <li>{isZh ? '现代Web应用' : 'Modern web applications'}</li>
            <li>{isZh ? '开发者友好环境' : 'Developer-friendly environments'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={"/" + lang + "/tools/regex-tester"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a>
      </div>

      {/* FAQ */}
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
