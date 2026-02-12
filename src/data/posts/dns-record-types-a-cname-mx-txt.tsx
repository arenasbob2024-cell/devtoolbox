'use client';
import React from 'react';
import Link from 'next/link';

export default function DnsRecordTypes({ lang }: { lang: string }) {
  const t: Record<string, Record<string, string | string[]>> = {
    en: {
      title: 'DNS Record Types Explained: A, CNAME, MX, TXT & More',
      intro: 'The Domain Name System (DNS) is the backbone of the internet, translating human-readable domain names into machine-readable IP addresses and routing information. Understanding DNS record types is essential for web developers, system administrators, and anyone managing domains. This comprehensive guide covers every major DNS record type with real-world examples, dig/nslookup commands, and practical configuration tips.',

      howTitle: '1. How DNS Works',
      howDesc: 'When you type a domain name like example.com into your browser, a complex resolution process occurs behind the scenes. Understanding this flow is key to diagnosing DNS issues.',
      howStep1: 'Step 1: Your browser checks its local cache for a previously resolved IP address.',
      howStep2: 'Step 2: If not cached, the OS queries the configured recursive resolver (usually your ISP or a public resolver like 8.8.8.8).',
      howStep3: 'Step 3: The recursive resolver checks its cache. If the record is not cached, it starts the resolution chain.',
      howStep4: 'Step 4: The resolver queries a root nameserver (e.g., a.root-servers.net) which responds with the TLD nameserver for .com.',
      howStep5: 'Step 5: The resolver queries the .com TLD nameserver, which responds with the authoritative nameserver for example.com.',
      howStep6: 'Step 6: The resolver queries the authoritative nameserver, which returns the actual DNS record (e.g., A record with IP 93.184.216.34).',
      howStep7: 'Step 7: The resolver caches the result (respecting TTL) and returns it to your browser.',
      howRecursive: 'Recursive Resolver: Performs the full lookup on behalf of the client. Examples: Google Public DNS (8.8.8.8), Cloudflare (1.1.1.1), your ISP DNS.',
      howAuthoritative: 'Authoritative Nameserver: Holds the actual DNS records for a domain. It is the source of truth. Examples: ns1.example.com, Cloudflare nameservers, AWS Route 53.',
      howNote: 'The entire process typically completes in under 100ms. Caching at every level (browser, OS, resolver) dramatically reduces lookup times for subsequent requests.',

      aTitle: '2. A Record (Address Record)',
      aDesc: 'The A record is the most fundamental DNS record type. It maps a domain name directly to an IPv4 address. Every website needs at least one A record (or AAAA record for IPv6).',
      aFormat: 'Format: <domain> <TTL> IN A <IPv4-address>',
      aExample1: 'example.com.     300    IN    A    93.184.216.34',
      aExample2: 'www.example.com. 300    IN    A    93.184.216.34',
      aExample3: 'api.example.com. 60     IN    A    203.0.113.50',
      aTtl: 'TTL (Time to Live): Measured in seconds. A TTL of 300 means resolvers cache this record for 5 minutes. Lower TTLs (60-300) allow faster changes but increase DNS query load. Higher TTLs (3600-86400) reduce load but make changes slower to propagate.',
      aMultiple: 'You can set multiple A records for the same domain for round-robin load balancing. DNS resolvers will rotate through the addresses.',
      aTip: 'Tip: Before migrating servers, lower your A record TTL to 60 seconds 24-48 hours in advance. After migration, you can raise it back to 3600 or higher.',

      aaaaTitle: '3. AAAA Record (IPv6 Address Record)',
      aaaaDesc: 'The AAAA record (pronounced "quad-A") is the IPv6 equivalent of the A record. As IPv6 adoption grows, AAAA records become increasingly important.',
      aaaaFormat: 'Format: <domain> <TTL> IN AAAA <IPv6-address>',
      aaaaExample1: 'example.com.     300    IN    AAAA    2606:2800:0220:0001:0248:1893:25c8:1946',
      aaaaExample2: 'www.example.com. 300    IN    AAAA    2606:2800:0220:0001:0248:1893:25c8:1946',
      aaaaNote: 'IPv6 addresses are 128 bits long, written as eight groups of four hexadecimal digits separated by colons. Leading zeros can be omitted, and consecutive groups of zeros can be replaced with ::.',
      aaaaDual: 'Best practice: Configure both A and AAAA records (dual-stack) so your domain is accessible over both IPv4 and IPv6. Most modern CDNs and hosting providers support dual-stack configurations automatically.',

      cnameTitle: '4. CNAME Record (Canonical Name)',
      cnameDesc: 'A CNAME record creates an alias from one domain name to another (the "canonical" name). When a resolver encounters a CNAME, it restarts the lookup using the target domain name.',
      cnameFormat: 'Format: <alias> <TTL> IN CNAME <canonical-name>',
      cnameExample1: 'www.example.com.     300    IN    CNAME    example.com.',
      cnameExample2: 'blog.example.com.    300    IN    CNAME    mysite.wordpress.com.',
      cnameExample3: 'shop.example.com.    300    IN    CNAME    shops.myshopify.com.',
      cnameWhen: 'When to use CNAME: Point subdomains to third-party services (CDNs, SaaS platforms, hosting providers). Point www to the apex domain. Create convenient aliases for long hostnames.',
      cnameLimit1: 'Limitation 1 (Root Domain): A CNAME record CANNOT be set on the zone apex (root domain). For example, you cannot create a CNAME for example.com — only for subdomains like www.example.com. This is because CNAME records cannot coexist with other record types, and the root domain must have SOA and NS records.',
      cnameLimit2: 'Limitation 2 (No Coexistence): A CNAME record cannot coexist with any other record type for the same name. If blog.example.com has a CNAME, you cannot also add an MX or TXT record for blog.example.com.',
      cnameAlias: 'Workaround: Some DNS providers offer ALIAS or ANAME records (non-standard) that function like CNAME at the zone apex. Cloudflare calls this "CNAME flattening." AWS Route 53 uses "Alias" records.',

      mxTitle: '5. MX Record (Mail Exchange)',
      mxDesc: 'MX records specify which mail servers accept email for a domain. They are essential for email delivery. Each MX record includes a priority value — lower numbers indicate higher preference.',
      mxFormat: 'Format: <domain> <TTL> IN MX <priority> <mail-server>',
      mxExample1: 'example.com.  3600  IN  MX  10  mail1.example.com.',
      mxExample2: 'example.com.  3600  IN  MX  20  mail2.example.com.',
      mxExample3: 'example.com.  3600  IN  MX  30  mail3.example.com.',
      mxPriority: 'Priority: Mail servers try to deliver to the lowest-priority (highest-preference) server first. If it is unavailable, they fall back to the next. In this example, mail1 is tried first, then mail2, then mail3.',
      mxGoogle: 'Google Workspace MX records:',
      mxOutlook: 'Microsoft 365 MX records:',
      mxNote: 'Important: MX records must point to a hostname (A/AAAA record), NEVER to an IP address or CNAME. The target hostname must have its own A record.',

      txtTitle: '6. TXT Record (Text Record)',
      txtDesc: 'TXT records store arbitrary text data associated with a domain. They are widely used for email authentication (SPF, DKIM, DMARC), domain ownership verification, and security policies.',
      txtFormat: 'Format: <domain> <TTL> IN TXT "<text-string>"',
      txtSpfTitle: 'SPF (Sender Policy Framework):',
      txtSpfDesc: 'SPF specifies which mail servers are authorized to send email on behalf of your domain. It helps prevent email spoofing.',
      txtSpfExample: 'example.com. 3600 IN TXT "v=spf1 include:_spf.google.com include:sendgrid.net -all"',
      txtSpfExplain: 'v=spf1 — SPF version 1. include: — authorize these third-party senders. -all — reject (hard fail) all other senders. ~all — soft fail (mark as suspicious). ?all — neutral.',
      txtDkimTitle: 'DKIM (DomainKeys Identified Mail):',
      txtDkimDesc: 'DKIM adds a digital signature to outgoing emails. The receiving server verifies the signature using a public key published in DNS.',
      txtDkimExample: 'google._domainkey.example.com. 3600 IN TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqh..."',
      txtDmarcTitle: 'DMARC (Domain-based Message Authentication):',
      txtDmarcDesc: 'DMARC tells receiving mail servers what to do when SPF and DKIM checks fail. It also enables reporting.',
      txtDmarcExample: '_dmarc.example.com. 3600 IN TXT "v=DMARC1; p=reject; rua=mailto:dmarc-reports@example.com; pct=100"',
      txtVerifyTitle: 'Domain Verification:',
      txtVerifyDesc: 'Many services require you to add a TXT record to prove domain ownership:',
      txtVerifyGoogle: 'Google: google-site-verification=xxxxxxxxxxxx',
      txtVerifyLe: 'Let\'s Encrypt: _acme-challenge.example.com TXT "random-token-string"',
      txtVerifyMs: 'Microsoft 365: MS=ms12345678',
      txtVerifyFb: 'Facebook: facebook-domain-verification=xxxxxxxxxxxx',

      nsTitle: '7. NS Record (Nameserver)',
      nsDesc: 'NS records specify which nameservers are authoritative for a domain. They delegate DNS resolution to the designated servers. Every domain must have at least two NS records for redundancy.',
      nsFormat: 'Format: <domain> <TTL> IN NS <nameserver>',
      nsExample1: 'example.com.  86400  IN  NS  ns1.example.com.',
      nsExample2: 'example.com.  86400  IN  NS  ns2.example.com.',
      nsDelegate: 'NS records are also used for subdomain delegation. You can delegate a subdomain to different nameservers:',
      nsDelegateExample: 'dev.example.com.  86400  IN  NS  ns1.dev-team.com.',
      nsNote: 'NS records typically have high TTLs (86400 = 24 hours) because nameserver changes are infrequent. When migrating DNS providers, the registrar-level NS records must also be updated.',

      soaTitle: '8. SOA Record (Start of Authority)',
      soaDesc: 'Every DNS zone has exactly one SOA record. It contains administrative information about the zone, including the primary nameserver, responsible person\'s email, and timing parameters for zone transfers.',
      soaFormat: 'Format: <domain> <TTL> IN SOA <primary-ns> <admin-email> (<serial> <refresh> <retry> <expire> <minimum-ttl>)',
      soaSerial: 'Serial Number: A version number for the zone. Increment it every time you make a change. Common format: YYYYMMDDNN (e.g., 2024121501). Secondary nameservers compare serial numbers to decide whether to perform a zone transfer.',
      soaRefresh: 'Refresh (7200 = 2 hours): How often secondary nameservers check the primary for updates.',
      soaRetry: 'Retry (3600 = 1 hour): How long a secondary waits before retrying a failed refresh.',
      soaExpire: 'Expire (1209600 = 14 days): How long a secondary continues serving the zone if it cannot contact the primary. After this, it stops responding.',
      soaMinTtl: 'Minimum TTL (300 = 5 minutes): The default TTL for negative caching (NXDOMAIN responses). This tells resolvers how long to cache the fact that a record does not exist.',

      srvTitle: '9. SRV Record (Service Record)',
      srvDesc: 'SRV records specify the location of services. They include protocol, priority, weight, port, and target host information. SRV records enable service discovery without hardcoding ports or hostnames.',
      srvFormat: 'Format: _service._protocol.<domain> <TTL> IN SRV <priority> <weight> <port> <target>',
      srvExample1: '_sip._tcp.example.com.     3600  IN  SRV  10  60  5060  sipserver.example.com.',
      srvExample2: '_xmpp-client._tcp.example.com.  3600  IN  SRV  5  0  5222  xmpp.example.com.',
      srvExample3: '_minecraft._tcp.mc.example.com. 3600  IN  SRV  0  5  25565  mc.example.com.',
      srvFields: 'Fields: Priority (lower = preferred), Weight (for load balancing among same-priority servers), Port (the service port number), Target (the hostname providing the service).',
      srvUseCases: 'Common uses: Microsoft Active Directory, SIP/VoIP, XMPP/Jabber, Minecraft servers, CalDAV/CardDAV, LDAP.',
      srvNote: 'SRV records are queried by applications that support the protocol. Web browsers do not use SRV records for HTTP — that is handled by A/AAAA/CNAME records.',

      ptrTitle: '10. PTR Record (Pointer / Reverse DNS)',
      ptrDesc: 'PTR records map an IP address back to a domain name — the reverse of an A record. They are stored in a special zone under in-addr.arpa (IPv4) or ip6.arpa (IPv6). Reverse DNS is critical for email deliverability and network diagnostics.',
      ptrFormat: 'Format: <reversed-IP>.in-addr.arpa. <TTL> IN PTR <domain>',
      ptrExample1: '34.216.184.93.in-addr.arpa.  3600  IN  PTR  example.com.',
      ptrExample2: '8.8.8.8: 8.8.8.8.in-addr.arpa.  IN  PTR  dns.google.',
      ptrEmail: 'Email and PTR: Most mail servers perform a reverse DNS lookup on the connecting server\'s IP. If no PTR record exists, or it does not match the forward (A record) lookup, the email may be rejected or flagged as spam.',
      ptrNote: 'PTR records are managed by the owner of the IP address block (usually your hosting provider or ISP). To set a PTR record, you typically need to contact them or use their control panel.',

      caaTitle: '11. CAA Record (Certificate Authority Authorization)',
      caaDesc: 'CAA records specify which Certificate Authorities (CAs) are allowed to issue SSL/TLS certificates for a domain. They provide an additional layer of security against mis-issuance.',
      caaFormat: 'Format: <domain> <TTL> IN CAA <flags> <tag> <value>',
      caaExample1: 'example.com.  3600  IN  CAA  0  issue  "letsencrypt.org"',
      caaExample2: 'example.com.  3600  IN  CAA  0  issuewild  "letsencrypt.org"',
      caaExample3: 'example.com.  3600  IN  CAA  0  iodef  "mailto:security@example.com"',
      caaTags: 'Tags: issue — authorize a CA to issue certificates for this domain. issuewild — authorize a CA to issue wildcard certificates. iodef — specify a URL or email to receive violation reports.',
      caaNote: 'If no CAA records exist, any CA can issue a certificate for the domain. CAs are required to check CAA records before issuance (per RFC 8659). Setting CAA records is a recommended security best practice.',

      tableTitle: '12. DNS Record Types Comparison Table',
      tableDesc: 'This table summarizes all major DNS record types, their purposes, example values, and typical TTL settings.',
      thType: 'Record Type',
      thPurpose: 'Purpose',
      thExample: 'Example Value',
      thTtl: 'Typical TTL',

      lookupTitle: '13. DNS Lookup Tools & Commands',
      lookupDesc: 'These command-line tools help you query and debug DNS records. Every system administrator should be familiar with them.',
      lookupDigTitle: 'dig (Domain Information Groper):',
      lookupDigDesc: 'The most powerful DNS lookup tool. Available on Linux/macOS. Install on Windows via BIND tools.',
      lookupNslookupTitle: 'nslookup:',
      lookupNslookupDesc: 'Available on all platforms (Windows, Linux, macOS). Simpler than dig but less detailed.',
      lookupHostTitle: 'host:',
      lookupHostDesc: 'A simplified DNS lookup tool available on Linux/macOS. Good for quick lookups.',
      lookupOnline: 'Online tools: Our IP Calculator tool can help you understand network configurations alongside your DNS setup.',
      tryTool: 'Try our IP Calculator tool for network analysis',

      faq1q: 'What is the difference between an A record and a CNAME record?',
      faq1a: 'An A record maps a domain directly to an IPv4 address (e.g., 93.184.216.34), while a CNAME record maps a domain to another domain name (an alias). A records are used for the final destination, while CNAMEs are used to point one name to another. CNAMEs cannot be used on the root domain (zone apex).',
      faq2q: 'Can I use a CNAME record for my root domain (example.com)?',
      faq2a: 'No. Per the DNS specification (RFC 1034), a CNAME cannot coexist with other record types, and the root domain must have SOA and NS records. Some DNS providers offer proprietary workarounds like ALIAS records (DNS Made Easy), ANAME records (Route 53), or CNAME flattening (Cloudflare) that achieve a similar effect.',
      faq3q: 'What MX records do I need for Google Workspace?',
      faq3a: 'Google Workspace requires five MX records: ASPMX.L.GOOGLE.COM (priority 1), ALT1.ASPMX.L.GOOGLE.COM (priority 5), ALT2.ASPMX.L.GOOGLE.COM (priority 5), ALT3.ASPMX.L.GOOGLE.COM (priority 10), and ALT4.ASPMX.L.GOOGLE.COM (priority 10). These provide redundancy across multiple Google mail servers.',
      faq4q: 'How do SPF, DKIM, and DMARC work together?',
      faq4a: 'SPF specifies which servers can send email for your domain. DKIM adds a cryptographic signature to emails that recipients can verify via a DNS-published public key. DMARC ties SPF and DKIM together by telling receivers what to do when checks fail (none, quarantine, or reject) and where to send reports. All three should be configured for proper email authentication.',
      faq5q: 'How long does it take for DNS changes to propagate?',
      faq5a: 'DNS propagation depends on the TTL (Time to Live) of the record being changed. If the old record had a TTL of 3600 (1 hour), it may take up to 1 hour for all resolvers to pick up the change. In practice, most changes propagate within 1-48 hours globally due to caching at various levels. To speed up propagation, lower the TTL well in advance of making changes.',
    },
    zh: {
      title: 'DNS 记录类型详解：A、CNAME、MX、TXT 及更多',
      intro: '域名系统（DNS）是互联网的骨干，将人类可读的域名转换为机器可读的 IP 地址和路由信息。理解 DNS 记录类型对于 Web 开发人员、系统管理员和任何管理域名的人来说都是必不可少的。本综合指南涵盖了每种主要的 DNS 记录类型，包括真实示例、dig/nslookup 命令和实用配置技巧。',

      howTitle: '1. DNS 工作原理',
      howDesc: '当你在浏览器中输入 example.com 这样的域名时，背后会发生一个复杂的解析过程。理解这个流程是诊断 DNS 问题的关键。',
      howStep1: '步骤 1：浏览器检查其本地缓存中是否有之前解析过的 IP 地址。',
      howStep2: '步骤 2：如果没有缓存，操作系统查询配置的递归解析器（通常是你的 ISP 或公共解析器如 8.8.8.8）。',
      howStep3: '步骤 3：递归解析器检查其缓存。如果没有缓存记录，则开始解析链。',
      howStep4: '步骤 4：解析器查询根域名服务器（如 a.root-servers.net），根服务器返回 .com 的 TLD 域名服务器地址。',
      howStep5: '步骤 5：解析器查询 .com TLD 域名服务器，TLD 服务器返回 example.com 的权威域名服务器地址。',
      howStep6: '步骤 6：解析器查询权威域名服务器，权威服务器返回实际的 DNS 记录（例如 A 记录，IP 为 93.184.216.34）。',
      howStep7: '步骤 7：解析器缓存结果（遵循 TTL）并返回给浏览器。',
      howRecursive: '递归解析器：代表客户端执行完整查询。示例：Google Public DNS（8.8.8.8）、Cloudflare（1.1.1.1）、你的 ISP DNS。',
      howAuthoritative: '权威域名服务器：持有域名的实际 DNS 记录，是真实数据源。示例：ns1.example.com、Cloudflare 域名服务器、AWS Route 53。',
      howNote: '整个过程通常在 100 毫秒内完成。各级缓存（浏览器、操作系统、解析器）大大减少了后续请求的查询时间。',

      aTitle: '2. A 记录（地址记录）',
      aDesc: 'A 记录是最基本的 DNS 记录类型。它将域名直接映射到 IPv4 地址。每个网站至少需要一个 A 记录（或用于 IPv6 的 AAAA 记录）。',
      aFormat: '格式：<域名> <TTL> IN A <IPv4 地址>',
      aExample1: 'example.com.     300    IN    A    93.184.216.34',
      aExample2: 'www.example.com. 300    IN    A    93.184.216.34',
      aExample3: 'api.example.com. 60     IN    A    203.0.113.50',
      aTtl: 'TTL（生存时间）：以秒为单位。TTL 为 300 意味着解析器缓存此记录 5 分钟。较低的 TTL（60-300）允许更快的更改但增加 DNS 查询负载。较高的 TTL（3600-86400）减少负载但使更改传播更慢。',
      aMultiple: '你可以为同一个域名设置多个 A 记录，用于轮询（round-robin）负载均衡。DNS 解析器会轮流返回各个地址。',
      aTip: '提示：在迁移服务器之前，提前 24-48 小时将 A 记录的 TTL 降低到 60 秒。迁移完成后，可以将其恢复到 3600 或更高。',

      aaaaTitle: '3. AAAA 记录（IPv6 地址记录）',
      aaaaDesc: 'AAAA 记录（读作"四 A"）是 A 记录的 IPv6 等价物。随着 IPv6 的普及，AAAA 记录变得越来越重要。',
      aaaaFormat: '格式：<域名> <TTL> IN AAAA <IPv6 地址>',
      aaaaExample1: 'example.com.     300    IN    AAAA    2606:2800:0220:0001:0248:1893:25c8:1946',
      aaaaExample2: 'www.example.com. 300    IN    AAAA    2606:2800:0220:0001:0248:1893:25c8:1946',
      aaaaNote: 'IPv6 地址为 128 位长，以八组四位十六进制数字书写，各组用冒号分隔。前导零可以省略，连续的零组可以用 :: 替代。',
      aaaaDual: '最佳实践：同时配置 A 和 AAAA 记录（双栈），使你的域名可以通过 IPv4 和 IPv6 访问。大多数现代 CDN 和托管服务商自动支持双栈配置。',

      cnameTitle: '4. CNAME 记录（规范名称）',
      cnameDesc: 'CNAME 记录创建从一个域名到另一个域名（"规范"名称）的别名。当解析器遇到 CNAME 时，它会使用目标域名重新开始查询。',
      cnameFormat: '格式：<别名> <TTL> IN CNAME <规范名称>',
      cnameExample1: 'www.example.com.     300    IN    CNAME    example.com.',
      cnameExample2: 'blog.example.com.    300    IN    CNAME    mysite.wordpress.com.',
      cnameExample3: 'shop.example.com.    300    IN    CNAME    shops.myshopify.com.',
      cnameWhen: '使用场景：将子域名指向第三方服务（CDN、SaaS 平台、托管服务商）。将 www 指向裸域。为长主机名创建便捷别名。',
      cnameLimit1: '限制 1（根域名）：CNAME 记录不能设置在区域顶点（根域名）上。例如，你不能为 example.com 创建 CNAME —— 只能为子域名如 www.example.com。这是因为 CNAME 记录不能与其他记录类型共存，而根域名必须有 SOA 和 NS 记录。',
      cnameLimit2: '限制 2（不可共存）：CNAME 记录不能与同一名称下的任何其他记录类型共存。如果 blog.example.com 有 CNAME，你不能同时为 blog.example.com 添加 MX 或 TXT 记录。',
      cnameAlias: '变通方案：某些 DNS 提供商提供 ALIAS 或 ANAME 记录（非标准），在区域顶点实现类似 CNAME 的功能。Cloudflare 称之为"CNAME 扁平化"。AWS Route 53 使用"Alias"记录。',

      mxTitle: '5. MX 记录（邮件交换）',
      mxDesc: 'MX 记录指定哪些邮件服务器接受域名的电子邮件。它们对邮件投递至关重要。每个 MX 记录包含一个优先级值 —— 数字越低表示优先级越高。',
      mxFormat: '格式：<域名> <TTL> IN MX <优先级> <邮件服务器>',
      mxExample1: 'example.com.  3600  IN  MX  10  mail1.example.com.',
      mxExample2: 'example.com.  3600  IN  MX  20  mail2.example.com.',
      mxExample3: 'example.com.  3600  IN  MX  30  mail3.example.com.',
      mxPriority: '优先级：邮件服务器首先尝试投递到优先级最低（最优先）的服务器。如果不可用，则回退到下一个。在此示例中，先尝试 mail1，然后 mail2，最后 mail3。',
      mxGoogle: 'Google Workspace MX 记录：',
      mxOutlook: 'Microsoft 365 MX 记录：',
      mxNote: '重要提示：MX 记录必须指向主机名（A/AAAA 记录），绝不能指向 IP 地址或 CNAME。目标主机名必须有自己的 A 记录。',

      txtTitle: '6. TXT 记录（文本记录）',
      txtDesc: 'TXT 记录存储与域名关联的任意文本数据。它们广泛用于邮件认证（SPF、DKIM、DMARC）、域名所有权验证和安全策略。',
      txtFormat: '格式：<域名> <TTL> IN TXT "<文本字符串>"',
      txtSpfTitle: 'SPF（发送方策略框架）：',
      txtSpfDesc: 'SPF 指定哪些邮件服务器被授权代表你的域名发送邮件。它有助于防止邮件伪造。',
      txtSpfExample: 'example.com. 3600 IN TXT "v=spf1 include:_spf.google.com include:sendgrid.net -all"',
      txtSpfExplain: 'v=spf1 — SPF 版本 1。include: — 授权这些第三方发送者。-all — 拒绝（硬失败）所有其他发送者。~all — 软失败（标记为可疑）。?all — 中性。',
      txtDkimTitle: 'DKIM（域名密钥识别邮件）：',
      txtDkimDesc: 'DKIM 为外发邮件添加数字签名。接收服务器使用 DNS 中发布的公钥验证签名。',
      txtDkimExample: 'google._domainkey.example.com. 3600 IN TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqh..."',
      txtDmarcTitle: 'DMARC（基于域的消息认证）：',
      txtDmarcDesc: 'DMARC 告诉接收邮件服务器在 SPF 和 DKIM 检查失败时该怎么做。它还支持报告功能。',
      txtDmarcExample: '_dmarc.example.com. 3600 IN TXT "v=DMARC1; p=reject; rua=mailto:dmarc-reports@example.com; pct=100"',
      txtVerifyTitle: '域名验证：',
      txtVerifyDesc: '许多服务要求你添加 TXT 记录来证明域名所有权：',
      txtVerifyGoogle: 'Google：google-site-verification=xxxxxxxxxxxx',
      txtVerifyLe: 'Let\'s Encrypt：_acme-challenge.example.com TXT "random-token-string"',
      txtVerifyMs: 'Microsoft 365：MS=ms12345678',
      txtVerifyFb: 'Facebook：facebook-domain-verification=xxxxxxxxxxxx',

      nsTitle: '7. NS 记录（域名服务器）',
      nsDesc: 'NS 记录指定哪些域名服务器对某个域名具有权威性。它们将 DNS 解析委托给指定的服务器。每个域名必须至少有两个 NS 记录以实现冗余。',
      nsFormat: '格式：<域名> <TTL> IN NS <域名服务器>',
      nsExample1: 'example.com.  86400  IN  NS  ns1.example.com.',
      nsExample2: 'example.com.  86400  IN  NS  ns2.example.com.',
      nsDelegate: 'NS 记录也用于子域名委托。你可以将子域名委托给不同的域名服务器：',
      nsDelegateExample: 'dev.example.com.  86400  IN  NS  ns1.dev-team.com.',
      nsNote: 'NS 记录通常有较高的 TTL（86400 = 24 小时），因为域名服务器变更不频繁。迁移 DNS 提供商时，还必须更新注册商级别的 NS 记录。',

      soaTitle: '8. SOA 记录（权威起始）',
      soaDesc: '每个 DNS 区域都有且仅有一个 SOA 记录。它包含区域的管理信息，包括主域名服务器、负责人邮箱以及区域传输的时间参数。',
      soaFormat: '格式：<域名> <TTL> IN SOA <主 NS> <管理邮箱> (<序列号> <刷新> <重试> <过期> <最小 TTL>)',
      soaSerial: '序列号：区域的版本号。每次更改时递增。常用格式：YYYYMMDDNN（例如 2024121501）。辅助域名服务器比较序列号来决定是否执行区域传输。',
      soaRefresh: '刷新（7200 = 2 小时）：辅助域名服务器多久检查一次主服务器的更新。',
      soaRetry: '重试（3600 = 1 小时）：刷新失败后辅助服务器等待多久再重试。',
      soaExpire: '过期（1209600 = 14 天）：如果辅助服务器无法联系主服务器，它继续提供区域服务的时长。超过此时间后，它将停止响应。',
      soaMinTtl: '最小 TTL（300 = 5 分钟）：否定缓存（NXDOMAIN 响应）的默认 TTL。它告诉解析器缓存"记录不存在"这一事实的时长。',

      srvTitle: '9. SRV 记录（服务记录）',
      srvDesc: 'SRV 记录指定服务的位置。它们包含协议、优先级、权重、端口和目标主机信息。SRV 记录支持服务发现，无需硬编码端口或主机名。',
      srvFormat: '格式：_service._protocol.<域名> <TTL> IN SRV <优先级> <权重> <端口> <目标>',
      srvExample1: '_sip._tcp.example.com.     3600  IN  SRV  10  60  5060  sipserver.example.com.',
      srvExample2: '_xmpp-client._tcp.example.com.  3600  IN  SRV  5  0  5222  xmpp.example.com.',
      srvExample3: '_minecraft._tcp.mc.example.com. 3600  IN  SRV  0  5  25565  mc.example.com.',
      srvFields: '字段说明：Priority（优先级，越低越优先）、Weight（权重，用于相同优先级服务器间的负载均衡）、Port（服务端口号）、Target（提供服务的主机名）。',
      srvUseCases: '常见用途：Microsoft Active Directory、SIP/VoIP、XMPP/Jabber、Minecraft 服务器、CalDAV/CardDAV、LDAP。',
      srvNote: 'SRV 记录由支持该协议的应用程序查询。Web 浏览器不使用 SRV 记录来处理 HTTP —— 那是通过 A/AAAA/CNAME 记录处理的。',

      ptrTitle: '10. PTR 记录（指针 / 反向 DNS）',
      ptrDesc: 'PTR 记录将 IP 地址映射回域名 —— 是 A 记录的反向操作。它们存储在 in-addr.arpa（IPv4）或 ip6.arpa（IPv6）下的特殊区域中。反向 DNS 对邮件投递能力和网络诊断至关重要。',
      ptrFormat: '格式：<反转 IP>.in-addr.arpa. <TTL> IN PTR <域名>',
      ptrExample1: '34.216.184.93.in-addr.arpa.  3600  IN  PTR  example.com.',
      ptrExample2: '8.8.8.8: 8.8.8.8.in-addr.arpa.  IN  PTR  dns.google.',
      ptrEmail: '邮件与 PTR：大多数邮件服务器会对连接服务器的 IP 执行反向 DNS 查询。如果没有 PTR 记录，或者它与正向（A 记录）查询不匹配，邮件可能会被拒绝或标记为垃圾邮件。',
      ptrNote: 'PTR 记录由 IP 地址块的所有者（通常是你的托管提供商或 ISP）管理。要设置 PTR 记录，你通常需要联系他们或使用他们的控制面板。',

      caaTitle: '11. CAA 记录（证书颁发机构授权）',
      caaDesc: 'CAA 记录指定哪些证书颁发机构（CA）被允许为域名颁发 SSL/TLS 证书。它们提供了额外的安全层来防止证书误发。',
      caaFormat: '格式：<域名> <TTL> IN CAA <标志> <标签> <值>',
      caaExample1: 'example.com.  3600  IN  CAA  0  issue  "letsencrypt.org"',
      caaExample2: 'example.com.  3600  IN  CAA  0  issuewild  "letsencrypt.org"',
      caaExample3: 'example.com.  3600  IN  CAA  0  iodef  "mailto:security@example.com"',
      caaTags: '标签说明：issue — 授权 CA 为此域名颁发证书。issuewild — 授权 CA 颁发通配符证书。iodef — 指定接收违规报告的 URL 或邮箱。',
      caaNote: '如果没有 CAA 记录，任何 CA 都可以为该域名颁发证书。CA 在颁发前必须检查 CAA 记录（根据 RFC 8659）。设置 CAA 记录是推荐的安全最佳实践。',

      tableTitle: '12. DNS 记录类型对比表',
      tableDesc: '此表总结了所有主要 DNS 记录类型、用途、示例值和典型 TTL 设置。',
      thType: '记录类型',
      thPurpose: '用途',
      thExample: '示例值',
      thTtl: '典型 TTL',

      lookupTitle: '13. DNS 查询工具与命令',
      lookupDesc: '这些命令行工具帮助你查询和调试 DNS 记录。每个系统管理员都应该熟悉它们。',
      lookupDigTitle: 'dig（域信息搜索器）：',
      lookupDigDesc: '最强大的 DNS 查询工具。在 Linux/macOS 上可用。在 Windows 上通过 BIND 工具安装。',
      lookupNslookupTitle: 'nslookup：',
      lookupNslookupDesc: '在所有平台上可用（Windows、Linux、macOS）。比 dig 简单但细节较少。',
      lookupHostTitle: 'host：',
      lookupHostDesc: '简化的 DNS 查询工具，在 Linux/macOS 上可用。适合快速查询。',
      lookupOnline: '在线工具：我们的 IP 计算器工具可以帮助你在 DNS 设置的同时理解网络配置。',
      tryTool: '试试我们的 IP 计算器进行网络分析',

      faq1q: 'A 记录和 CNAME 记录有什么区别？',
      faq1a: 'A 记录将域名直接映射到 IPv4 地址（如 93.184.216.34），而 CNAME 记录将域名映射到另一个域名（别名）。A 记录用于最终目的地，而 CNAME 用于将一个名称指向另一个。CNAME 不能用于根域名（区域顶点）。',
      faq2q: '我可以为根域名（example.com）使用 CNAME 记录吗？',
      faq2a: '不可以。根据 DNS 规范（RFC 1034），CNAME 不能与其他记录类型共存，而根域名必须有 SOA 和 NS 记录。一些 DNS 提供商提供专有的变通方案，如 ALIAS 记录（DNS Made Easy）、ANAME 记录（Route 53）或 CNAME 扁平化（Cloudflare），可以实现类似效果。',
      faq3q: 'Google Workspace 需要哪些 MX 记录？',
      faq3a: 'Google Workspace 需要五个 MX 记录：ASPMX.L.GOOGLE.COM（优先级 1）、ALT1.ASPMX.L.GOOGLE.COM（优先级 5）、ALT2.ASPMX.L.GOOGLE.COM（优先级 5）、ALT3.ASPMX.L.GOOGLE.COM（优先级 10）和 ALT4.ASPMX.L.GOOGLE.COM（优先级 10）。这些在多个 Google 邮件服务器之间提供冗余。',
      faq4q: 'SPF、DKIM 和 DMARC 如何协同工作？',
      faq4a: 'SPF 指定哪些服务器可以为你的域名发送邮件。DKIM 为邮件添加加密签名，收件方可以通过 DNS 发布的公钥验证。DMARC 将 SPF 和 DKIM 结合在一起，告诉接收者在检查失败时该怎么做（无操作、隔离或拒绝）以及将报告发送到哪里。三者都应配置以实现完整的邮件认证。',
      faq5q: 'DNS 更改需要多长时间才能传播？',
      faq5a: 'DNS 传播取决于被更改记录的 TTL（生存时间）。如果旧记录的 TTL 为 3600（1 小时），所有解析器可能需要最多 1 小时才能获取更改。实际上，由于各级缓存，大多数更改在全球范围内 1-48 小时内传播。要加速传播，请在更改之前提前降低 TTL。',
    },
  };
  const ct = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 13 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px' };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };

  // DNS record comparison table data: [Type, Purpose, Example Value, Typical TTL]
  const dnsTableData: [string, string, string, string][] = lang === 'zh' ? [
    ['A', '将域名映射到 IPv4 地址', '93.184.216.34', '300-3600'],
    ['AAAA', '将域名映射到 IPv6 地址', '2606:2800:220:1:248:1893:25c8:1946', '300-3600'],
    ['CNAME', '创建域名别名', 'www.example.com -> example.com', '300-3600'],
    ['MX', '指定邮件服务器', '10 mail.example.com.', '3600'],
    ['TXT', '存储文本数据（SPF、DKIM 等）', '"v=spf1 include:_spf.google.com -all"', '3600'],
    ['NS', '委托域名服务器', 'ns1.example.com.', '86400'],
    ['SOA', '区域权威信息', 'ns1.example.com. admin.example.com. 2024121501 ...', '86400'],
    ['SRV', '服务发现（端口和协议）', '10 60 5060 sipserver.example.com.', '3600'],
    ['PTR', '反向 DNS 查询（IP 到域名）', 'example.com.', '3600'],
    ['CAA', '证书颁发机构授权', '0 issue "letsencrypt.org"', '3600'],
  ] : [
    ['A', 'Maps domain to IPv4 address', '93.184.216.34', '300-3600'],
    ['AAAA', 'Maps domain to IPv6 address', '2606:2800:220:1:248:1893:25c8:1946', '300-3600'],
    ['CNAME', 'Creates domain alias', 'www.example.com -> example.com', '300-3600'],
    ['MX', 'Specifies mail servers', '10 mail.example.com.', '3600'],
    ['TXT', 'Stores text data (SPF, DKIM, etc.)', '"v=spf1 include:_spf.google.com -all"', '3600'],
    ['NS', 'Delegates nameservers', 'ns1.example.com.', '86400'],
    ['SOA', 'Zone authority information', 'ns1.example.com. admin.example.com. 2024121501 ...', '86400'],
    ['SRV', 'Service discovery (port & protocol)', '10 60 5060 sipserver.example.com.', '3600'],
    ['PTR', 'Reverse DNS lookup (IP to domain)', 'example.com.', '3600'],
    ['CAA', 'Certificate Authority authorization', '0 issue "letsencrypt.org"', '3600'],
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* Section 1: How DNS Works */}
      <h2 style={h2Style}>{ct.howTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.howDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {[ct.howStep1, ct.howStep2, ct.howStep3, ct.howStep4, ct.howStep5, ct.howStep6, ct.howStep7].map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#3b82f6', minWidth: 24 }}>{i + 1}</span>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step as string}</span>
          </div>
        ))}
      </div>
      <pre style={codeStyle}><code>{`DNS Resolution Flow:

Browser Cache → OS Cache → Recursive Resolver → Root Server → TLD Server → Authoritative Server
                                                    │              │              │
                                               "Ask .com"    "Ask ns1.         "Here is
                                                TLD server"   example.com"      93.184.216.34"

Example: Resolving www.example.com
┌──────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────┐     ┌──────────────┐
│  Browser  │────>│   Recursive  │────>│    Root      │     │  .com    │     │ Authoritative│
│  (client) │     │   Resolver   │     │   Server     │     │  TLD NS  │     │   NS         │
│           │<────│  (8.8.8.8)   │<────│(.root-servers│────>│(gtld-    │────>│(ns1.example  │
│           │     │              │     │  .net)       │     │servers)  │     │  .com)       │
└──────────┘     └──────────────┘     └─────────────┘     └──────────┘     └──────────────┘
  A: 93.184.216.34   Caches result         "Go ask         "Go ask         "A 93.184.216.34
   (TTL: 300s)       (TTL-based)          .com TLD"      ns1.example.com"   TTL 300"`}</code></pre>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16, marginBottom: 16 }}>
        {[
          { label: ct.howRecursive as string, color: '#22c55e' },
          { label: ct.howAuthoritative as string, color: '#3b82f6' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 14, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}` }}>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.label}</p>
          </div>
        ))}
      </div>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24 }}>{ct.howNote}</p>

      {/* Section 2: A Record */}
      <h2 style={h2Style}>{ct.aTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.aDesc}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{ct.aFormat}</p>
      <pre style={codeStyle}><code>{`${ct.aExample1}
${ct.aExample2}
${ct.aExample3}

# Multiple A records for load balancing:
example.com.     300    IN    A    93.184.216.34
example.com.     300    IN    A    93.184.216.35
example.com.     300    IN    A    93.184.216.36`}</code></pre>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 16, marginBottom: 8 }}>{ct.aTtl}</p>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8 }}>{ct.aMultiple}</p>
      <div style={{ padding: 14, background: 'rgba(245, 158, 11, 0.1)', borderRadius: 8, border: '1px solid rgba(245, 158, 11, 0.3)', marginBottom: 24 }}>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.aTip}</p>
      </div>

      {/* Section 3: AAAA Record */}
      <h2 style={h2Style}>{ct.aaaaTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.aaaaDesc}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{ct.aaaaFormat}</p>
      <pre style={codeStyle}><code>{`${ct.aaaaExample1}
${ct.aaaaExample2}

# Shortened IPv6 notation:
example.com.     300    IN    AAAA    2606:2800:220:1:248:1893:25c8:1946
# Full form:     2606:2800:0220:0001:0248:1893:25c8:1946

# Dual-stack configuration (A + AAAA):
example.com.     300    IN    A       93.184.216.34
example.com.     300    IN    AAAA    2606:2800:220:1:248:1893:25c8:1946`}</code></pre>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 16, marginBottom: 8 }}>{ct.aaaaNote}</p>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24 }}>{ct.aaaaDual}</p>

      {/* Section 4: CNAME Record */}
      <h2 style={h2Style}>{ct.cnameTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.cnameDesc}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{ct.cnameFormat}</p>
      <pre style={codeStyle}><code>{`${ct.cnameExample1}
${ct.cnameExample2}
${ct.cnameExample3}

# Resolution chain:
# Query: blog.example.com
#   → CNAME: mysite.wordpress.com
#     → A: 192.0.78.12  (WordPress resolves the final IP)`}</code></pre>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 16, marginBottom: 8 }}>{ct.cnameWhen}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {[
          { text: ct.cnameLimit1 as string, color: '#ef4444' },
          { text: ct.cnameLimit2 as string, color: '#ef4444' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 14, background: 'rgba(239, 68, 68, 0.06)', borderRadius: 8, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.text}</p>
          </div>
        ))}
      </div>
      <div style={{ padding: 14, background: 'rgba(34, 197, 94, 0.06)', borderRadius: 8, border: '1px solid rgba(34, 197, 94, 0.2)', marginBottom: 24 }}>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.cnameAlias}</p>
      </div>

      {/* Section 5: MX Record */}
      <h2 style={h2Style}>{ct.mxTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.mxDesc}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{ct.mxFormat}</p>
      <pre style={codeStyle}><code>{`${ct.mxExample1}
${ct.mxExample2}
${ct.mxExample3}`}</code></pre>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 16, marginBottom: 16 }}>{ct.mxPriority}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{ct.mxGoogle}</p>
      <pre style={codeStyle}><code>{`example.com.  3600  IN  MX  1   ASPMX.L.GOOGLE.COM.
example.com.  3600  IN  MX  5   ALT1.ASPMX.L.GOOGLE.COM.
example.com.  3600  IN  MX  5   ALT2.ASPMX.L.GOOGLE.COM.
example.com.  3600  IN  MX  10  ALT3.ASPMX.L.GOOGLE.COM.
example.com.  3600  IN  MX  10  ALT4.ASPMX.L.GOOGLE.COM.`}</code></pre>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginTop: 16, marginBottom: 8 }}>{ct.mxOutlook}</p>
      <pre style={codeStyle}><code>{`example.com.  3600  IN  MX  0   example-com.mail.protection.outlook.com.`}</code></pre>
      <div style={{ padding: 14, background: 'rgba(245, 158, 11, 0.1)', borderRadius: 8, border: '1px solid rgba(245, 158, 11, 0.3)', marginTop: 16, marginBottom: 24 }}>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.mxNote}</p>
      </div>

      {/* Section 6: TXT Record */}
      <h2 style={h2Style}>{ct.txtTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.txtDesc}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{ct.txtFormat}</p>

      <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8, color: 'var(--text-primary)' }}>{ct.txtSpfTitle}</h3>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8 }}>{ct.txtSpfDesc}</p>
      <pre style={codeStyle}><code>{ct.txtSpfExample}</code></pre>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 8, marginBottom: 16 }}>{ct.txtSpfExplain}</p>

      <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8, color: 'var(--text-primary)' }}>{ct.txtDkimTitle}</h3>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8 }}>{ct.txtDkimDesc}</p>
      <pre style={codeStyle}><code>{ct.txtDkimExample}</code></pre>

      <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8, color: 'var(--text-primary)' }}>{ct.txtDmarcTitle}</h3>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8 }}>{ct.txtDmarcDesc}</p>
      <pre style={codeStyle}><code>{ct.txtDmarcExample}</code></pre>

      <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8, color: 'var(--text-primary)' }}>{ct.txtVerifyTitle}</h3>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8 }}>{ct.txtVerifyDesc}</p>
      <pre style={codeStyle}><code>{`# ${ct.txtVerifyGoogle}
example.com.  3600  IN  TXT  "google-site-verification=Abc123XyZ..."

# ${ct.txtVerifyLe}
_acme-challenge.example.com.  300  IN  TXT  "gfj9Xq...Rg85nM"

# ${ct.txtVerifyMs}
example.com.  3600  IN  TXT  "MS=ms12345678"

# ${ct.txtVerifyFb}
example.com.  3600  IN  TXT  "facebook-domain-verification=abc123def456"`}</code></pre>

      {/* Section 7: NS Record */}
      <h2 style={h2Style}>{ct.nsTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.nsDesc}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{ct.nsFormat}</p>
      <pre style={codeStyle}><code>{`${ct.nsExample1}
${ct.nsExample2}

# Common DNS provider nameservers:
# Cloudflare:  anna.ns.cloudflare.com, bob.ns.cloudflare.com
# AWS Route53: ns-123.awsdns-45.com, ns-678.awsdns-90.net
# Google:      ns-cloud-a1.googledomains.com, ns-cloud-a2.googledomains.com`}</code></pre>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 16, marginBottom: 8 }}>{ct.nsDelegate}</p>
      <pre style={codeStyle}><code>{`# Subdomain delegation:
${ct.nsDelegateExample}
dev.example.com.  86400  IN  NS  ns2.dev-team.com.

# This means all DNS queries for *.dev.example.com
# will be handled by ns1/ns2.dev-team.com`}</code></pre>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 16, marginBottom: 24 }}>{ct.nsNote}</p>

      {/* Section 8: SOA Record */}
      <h2 style={h2Style}>{ct.soaTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.soaDesc}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{ct.soaFormat}</p>
      <pre style={codeStyle}><code>{`example.com.  86400  IN  SOA  ns1.example.com. admin.example.com. (
    2024121501  ; Serial number  (YYYYMMDDNN)
    7200        ; Refresh         (2 hours)
    3600        ; Retry           (1 hour)
    1209600     ; Expire          (14 days)
    300         ; Minimum TTL     (5 minutes, negative caching)
)

# Note: admin.example.com. means admin@example.com
# (the first dot replaces the @ symbol)`}</code></pre>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16, marginBottom: 24 }}>
        {[ct.soaSerial, ct.soaRefresh, ct.soaRetry, ct.soaExpire, ct.soaMinTtl].map((item, i) => (
          <div key={i} style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item as string}</p>
          </div>
        ))}
      </div>

      {/* Section 9: SRV Record */}
      <h2 style={h2Style}>{ct.srvTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.srvDesc}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{ct.srvFormat}</p>
      <pre style={codeStyle}><code>{`# SIP service over TCP:
${ct.srvExample1}

# XMPP client service:
${ct.srvExample2}

# Minecraft server:
${ct.srvExample3}

# Format breakdown:
# _sip._tcp.example.com.  3600  IN  SRV  10    60     5060   sipserver.example.com.
#  |     |                              priority weight  port   target
#  |     └── Protocol (TCP/UDP)
#  └── Service name`}</code></pre>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 16, marginBottom: 8 }}>{ct.srvFields}</p>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8 }}>{ct.srvUseCases}</p>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24 }}>{ct.srvNote}</p>

      {/* Section 10: PTR Record */}
      <h2 style={h2Style}>{ct.ptrTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.ptrDesc}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{ct.ptrFormat}</p>
      <pre style={codeStyle}><code>{`# IPv4 reverse DNS:
${ct.ptrExample1}

# How the IP is reversed:
# IP: 93.184.216.34
# Reversed: 34.216.184.93
# Full PTR name: 34.216.184.93.in-addr.arpa.

# IPv6 reverse DNS (each hex digit is separated):
# IP: 2001:0db8::1
# PTR: 1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa.

# Real-world example:
# $ dig -x 8.8.8.8
# 8.8.8.8.in-addr.arpa.  IN  PTR  dns.google.`}</code></pre>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 16, marginBottom: 8 }}>{ct.ptrEmail}</p>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24 }}>{ct.ptrNote}</p>

      {/* Section 11: CAA Record */}
      <h2 style={h2Style}>{ct.caaTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.caaDesc}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{ct.caaFormat}</p>
      <pre style={codeStyle}><code>{`# Allow only Let's Encrypt to issue certificates:
${ct.caaExample1}

# Allow Let's Encrypt to issue wildcard certificates:
${ct.caaExample2}

# Report violations via email:
${ct.caaExample3}

# Allow multiple CAs:
example.com.  3600  IN  CAA  0  issue  "letsencrypt.org"
example.com.  3600  IN  CAA  0  issue  "amazon.com"
example.com.  3600  IN  CAA  0  issue  "digicert.com"`}</code></pre>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 16, marginBottom: 8 }}>{ct.caaTags}</p>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24 }}>{ct.caaNote}</p>

      {/* Section 12: Comparison Table */}
      <h2 style={h2Style}>{ct.tableTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.tableDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{ct.thType}</th>
              <th style={thStyle}>{ct.thPurpose}</th>
              <th style={thStyle}>{ct.thExample}</th>
              <th style={thStyle}>{ct.thTtl}</th>
            </tr>
          </thead>
          <tbody>
            {dnsTableData.map(([type, purpose, example, ttl]) => (
              <tr key={type} style={['A', 'CNAME', 'MX', 'TXT'].includes(type) ? { background: 'rgba(59,130,246,0.06)' } : {}}>
                <td style={{ ...tdStyle, fontWeight: 700 }}><code>{type}</code></td>
                <td style={tdStyle}>{purpose}</td>
                <td style={{ ...tdStyle, fontSize: 12 }}><code>{example}</code></td>
                <td style={{ ...tdStyle, textAlign: 'center' }}>{ttl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 13: Lookup Tools */}
      <h2 style={h2Style}>{ct.lookupTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.lookupDesc}</p>

      <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8, color: 'var(--text-primary)' }}>{ct.lookupDigTitle}</h3>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8 }}>{ct.lookupDigDesc}</p>
      <pre style={codeStyle}><code>{`# Query A record
$ dig example.com A
;; ANSWER SECTION:
example.com.        300     IN      A       93.184.216.34

# Query MX records
$ dig example.com MX
;; ANSWER SECTION:
example.com.        3600    IN      MX      10 mail.example.com.

# Query TXT records (SPF, DKIM, DMARC)
$ dig example.com TXT
;; ANSWER SECTION:
example.com.        3600    IN      TXT     "v=spf1 include:_spf.google.com -all"

# Query specific nameserver
$ dig @8.8.8.8 example.com A

# Query all record types
$ dig example.com ANY

# Short output (just the answer)
$ dig +short example.com A
93.184.216.34

# Trace the full resolution path
$ dig +trace example.com A

# Query CNAME
$ dig www.example.com CNAME
;; ANSWER SECTION:
www.example.com.    300     IN      CNAME   example.com.

# Reverse DNS lookup
$ dig -x 93.184.216.34`}</code></pre>

      <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 24, marginBottom: 8, color: 'var(--text-primary)' }}>{ct.lookupNslookupTitle}</h3>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8 }}>{ct.lookupNslookupDesc}</p>
      <pre style={codeStyle}><code>{`# Basic A record lookup
$ nslookup example.com
Server:  8.8.8.8
Address: 8.8.8.8#53

Non-authoritative answer:
Name:    example.com
Address: 93.184.216.34

# Query specific record type
$ nslookup -type=MX example.com
example.com     mail exchanger = 10 mail.example.com.

$ nslookup -type=TXT example.com
example.com     text = "v=spf1 include:_spf.google.com -all"

# Use specific DNS server
$ nslookup example.com 1.1.1.1

# Query NS records
$ nslookup -type=NS example.com
example.com     nameserver = ns1.example.com.
example.com     nameserver = ns2.example.com.`}</code></pre>

      <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 24, marginBottom: 8, color: 'var(--text-primary)' }}>{ct.lookupHostTitle}</h3>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 8 }}>{ct.lookupHostDesc}</p>
      <pre style={codeStyle}><code>{`# Basic lookup
$ host example.com
example.com has address 93.184.216.34
example.com has IPv6 address 2606:2800:220:1:248:1893:25c8:1946
example.com mail is handled by 10 mail.example.com.

# Query specific type
$ host -t MX example.com
example.com mail is handled by 10 mail.example.com.

$ host -t TXT example.com
example.com descriptive text "v=spf1 include:_spf.google.com -all"

# Reverse lookup
$ host 93.184.216.34
34.216.184.93.in-addr.arpa domain name pointer example.com.

# Verbose output
$ host -v example.com`}</code></pre>

      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 16, marginBottom: 16 }}>{ct.lookupOnline}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 24, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTool}</p>
        <Link href={`/${lang}/tools/ip-calculator`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          IP Calculator →
        </Link>
      </div>

      {/* FAQ Section */}
      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
