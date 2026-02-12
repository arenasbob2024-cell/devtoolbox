'use client';
import React from 'react';
import Link from 'next/link';

export default function IpSubnetCidr({ lang }: { lang: string }) {
  const t: Record<string, Record<string, string>> = {
    en: {
      title: 'IP Subnet Mask & CIDR Notation Explained: /24, /16, /8 and Beyond',
      intro: 'Subnet masks and CIDR notation are fundamental to IP networking. Whether you are designing a cloud VPC, configuring a home router, or preparing for a networking exam, understanding how subnet masks divide IP addresses into network and host portions is essential. This guide covers everything from binary basics to a complete CIDR reference table.',

      subnetTitle: '1. What Is a Subnet Mask?',
      subnetDesc: 'A subnet mask is a 32-bit number that separates an IP address into a network portion and a host portion. The network bits are set to 1, and the host bits are set to 0.',
      subnetBinaryLabel: 'Binary breakdown of 255.255.255.0:',
      subnetExplain: 'The subnet mask is applied via a bitwise AND operation with the IP address. The result is the network address. Bits set to 1 in the mask identify the network; bits set to 0 identify host addresses within that network.',
      subnetExampleLabel: 'Example: IP 192.168.1.100 with mask 255.255.255.0',

      cidrTitle: '2. CIDR Notation: /24, /16, /8',
      cidrDesc: 'CIDR (Classless Inter-Domain Routing) notation appends a slash and the number of network bits to the IP address. It replaced the old classful addressing system (Class A, B, C) in 1993.',
      cidrSlash24: '/24 = 255.255.255.0 — 24 network bits, 8 host bits, 254 usable hosts',
      cidrSlash16: '/16 = 255.255.0.0 — 16 network bits, 16 host bits, 65,534 usable hosts',
      cidrSlash8: '/8 = 255.0.0.0 — 8 network bits, 24 host bits, 16,777,214 usable hosts',
      cidrNote: 'The /number indicates how many leading bits of the 32-bit address are the network prefix. The remaining bits are for host addresses.',

      tableTitle: '3. Complete CIDR Reference Table: /8 to /32',
      tableDesc: 'This table shows every CIDR prefix from /8 to /32 with the corresponding subnet mask, wildcard mask, total addresses, and usable host count.',
      thCidr: 'CIDR',
      thMask: 'Subnet Mask',
      thWildcard: 'Wildcard',
      thTotal: 'Total IPs',
      thUsable: 'Usable Hosts',
      thNote: 'Typical Use',

      howTitle: '4. How Subnetting Works',
      howDesc: 'An IPv4 address is 32 bits. The subnet mask determines which bits belong to the network and which to the host. Visualizing this in binary makes it clear:',
      howNetworkBits: 'Network bits (1s in mask)',
      howHostBits: 'Host bits (0s in mask)',
      howRules: 'Key rules:',
      howRule1: 'The first address (all host bits = 0) is the network address.',
      howRule2: 'The last address (all host bits = 1) is the broadcast address.',
      howRule3: 'Usable hosts = 2^(host bits) - 2 (subtract network and broadcast).',
      howRule4: 'For /31 and /32, special rules apply (point-to-point links and single hosts).',

      calcTitle: '5. Calculating Subnets: Step-by-Step',
      calcDesc: 'Given 10.0.0.0/22, find the network details:',
      calcStep1: 'Step 1: /22 means 22 network bits, 10 host bits',
      calcStep2: 'Step 2: Subnet mask = 11111111.11111111.11111100.00000000 = 255.255.252.0',
      calcStep3: 'Step 3: Total addresses = 2^10 = 1,024',
      calcStep4: 'Step 4: Usable hosts = 1,024 - 2 = 1,022',
      calcStep5: 'Step 5: Network address = 10.0.0.0, Broadcast = 10.0.3.255',
      calcStep6: 'Step 6: Usable range = 10.0.0.1 to 10.0.3.254',

      privateTitle: '6. Private IP Ranges (RFC 1918)',
      privateDesc: 'These three IP ranges are reserved for private networks and are not routable on the public internet:',
      private10: '10.0.0.0/8 — 16,777,216 addresses — Large enterprise networks',
      private172: '172.16.0.0/12 — 1,048,576 addresses — Medium networks',
      private192: '192.168.0.0/16 — 65,536 addresses — Home and small office networks',
      privateNote: 'Additionally, 169.254.0.0/16 is used for link-local (APIPA) and 127.0.0.0/8 is the loopback range.',

      commonTitle: '7. Common Subnets in Practice',
      commonDesc: 'Different environments use different subnet sizes:',
      commonHome: '/24 (256 IPs) — Home networks: Most routers default to 192.168.1.0/24',
      commonSmall: '/23 (512 IPs) — Small office: When a single /24 is not enough',
      commonVpc: '/16 (65,536 IPs) — Cloud VPC: AWS, GCP, and Azure default VPC sizes',
      commonPtp: '/30 (4 IPs) or /31 (2 IPs) — Point-to-point links between routers',
      commonHost: '/32 (1 IP) — Single host route, used in firewalls and routing tables',
      commonK8s: '/12 or /16 — Kubernetes pod and service CIDR ranges',

      ipv6Title: '8. IPv6 CIDR Basics',
      ipv6Desc: 'IPv6 addresses are 128 bits long, giving vastly larger address spaces. CIDR notation works the same way:',
      ipv6Slash64: '/64 — Standard subnet size. 2^64 host addresses per subnet (the most common assignment).',
      ipv6Slash48: '/48 — Typical site allocation. Contains 65,536 /64 subnets.',
      ipv6Slash128: '/128 — Single host address (equivalent to IPv4 /32).',
      ipv6Slash32: '/32 — ISP allocation. Contains 4 billion /64 subnets.',
      ipv6Note: 'Unlike IPv4, IPv6 does not use broadcast addresses. The /64 boundary is significant because Stateless Address Autoconfiguration (SLAAC) requires it.',

      superTitle: '9. Supernetting (Route Aggregation)',
      superDesc: 'Supernetting combines multiple smaller subnets into a single larger prefix to reduce routing table entries. This is also called route summarization or aggregation.',
      superExample: 'Example: Combining four /24 networks into one /22:',
      superBenefit: 'Benefits: Smaller routing tables, faster lookups, reduced BGP announcements, and simpler ACLs.',
      superRule: 'Rule: Subnets must be contiguous and aligned to the supernet boundary. You cannot aggregate 192.168.1.0/24 and 192.168.5.0/24 into a single prefix.',

      toolsTitle: '10. Subnet Calculation Tools',
      toolsDesc: 'These tools help you calculate subnets quickly:',
      toolIpcalc: 'ipcalc — CLI tool for Linux. Install with apt install ipcalc. Shows network, broadcast, host range, and wildcard.',
      toolSipcalc: 'sipcalc — Advanced CLI tool with IPv6 support. Install with apt install sipcalc.',
      toolOnline: 'Online calculators — Our IP Calculator tool lets you compute subnets directly in the browser.',
      toolPython: 'Python ipaddress module — Built-in library for subnet math in scripts.',
      tryTool: 'Try our IP Calculator tool',

      faq1q: 'What is the difference between a subnet mask and CIDR notation?',
      faq1a: 'They represent the same information in different formats. A subnet mask like 255.255.255.0 is equivalent to /24 in CIDR notation. CIDR is more compact and is the modern standard.',
      faq2q: 'How many usable hosts are in a /24 subnet?',
      faq2a: 'A /24 subnet has 256 total addresses (2^8). Subtract the network address and broadcast address, leaving 254 usable host addresses.',
      faq3q: 'What does /32 mean?',
      faq3a: 'A /32 represents a single IP address with no host bits. It is used in routing tables, firewall rules, and ACLs to specify an exact host.',
      faq4q: 'Can I subnet a /24 into smaller subnets?',
      faq4a: 'Yes. A /24 can be split into two /25s (126 hosts each), four /26s (62 hosts each), eight /27s (30 hosts each), and so on. Each additional bit doubles the number of subnets while halving the hosts.',
      faq5q: 'What is a wildcard mask?',
      faq5a: 'A wildcard mask is the inverse of a subnet mask. For 255.255.255.0, the wildcard is 0.0.0.255. Wildcard masks are used in Cisco ACLs and OSPF configurations to match IP address ranges.',
      faq6q: 'Why do cloud providers recommend /16 for VPCs?',
      faq6a: 'A /16 provides 65,534 usable IPs, which is enough to accommodate multiple subnets for different availability zones, services, and future growth without renumbering. AWS, GCP, and Azure all recommend /16 as the default VPC size.',
    },
    zh: {
      title: 'IP 子网掩码与 CIDR 表示法详解：/24、/16、/8 及更多',
      intro: '子网掩码和 CIDR 表示法是 IP 网络的基础。无论你是设计云 VPC、配置家庭路由器还是准备网络考试，理解子网掩码如何将 IP 地址分为网络部分和主机部分都至关重要。本指南涵盖从二进制基础到完整 CIDR 参考表的所有内容。',

      subnetTitle: '1. 什么是子网掩码？',
      subnetDesc: '子网掩码是一个 32 位数字，用于将 IP 地址分为网络部分和主机部分。网络位设为 1，主机位设为 0。',
      subnetBinaryLabel: '255.255.255.0 的二进制分解：',
      subnetExplain: '子网掩码通过与 IP 地址进行按位 AND 运算来应用。运算结果就是网络地址。掩码中设为 1 的位标识网络；设为 0 的位标识该网络中的主机地址。',
      subnetExampleLabel: '示例：IP 192.168.1.100，掩码 255.255.255.0',

      cidrTitle: '2. CIDR 表示法：/24、/16、/8',
      cidrDesc: 'CIDR（无类别域间路由）表示法在 IP 地址后加斜杠和网络位数。它于 1993 年取代了旧的有类地址系统（A、B、C 类）。',
      cidrSlash24: '/24 = 255.255.255.0 — 24 位网络位，8 位主机位，254 个可用主机',
      cidrSlash16: '/16 = 255.255.0.0 — 16 位网络位，16 位主机位，65,534 个可用主机',
      cidrSlash8: '/8 = 255.0.0.0 — 8 位网络位，24 位主机位，16,777,214 个可用主机',
      cidrNote: '/后的数字表示 32 位地址中有多少个前导位是网络前缀。剩余的位用于主机地址。',

      tableTitle: '3. 完整 CIDR 参考表：/8 到 /32',
      tableDesc: '此表显示从 /8 到 /32 的每个 CIDR 前缀及对应的子网掩码、通配符掩码、总地址数和可用主机数。',
      thCidr: 'CIDR',
      thMask: '子网掩码',
      thWildcard: '通配符',
      thTotal: '总 IP 数',
      thUsable: '可用主机',
      thNote: '典型用途',

      howTitle: '4. 子网划分原理',
      howDesc: 'IPv4 地址为 32 位。子网掩码决定哪些位属于网络、哪些属于主机。用二进制来可视化：',
      howNetworkBits: '网络位（掩码中的 1）',
      howHostBits: '主机位（掩码中的 0）',
      howRules: '关键规则：',
      howRule1: '第一个地址（所有主机位 = 0）是网络地址。',
      howRule2: '最后一个地址（所有主机位 = 1）是广播地址。',
      howRule3: '可用主机 = 2^(主机位) - 2（减去网络地址和广播地址）。',
      howRule4: '对于 /31 和 /32，有特殊规则（点对点链路和单主机）。',

      calcTitle: '5. 子网计算：分步示例',
      calcDesc: '给定 10.0.0.0/22，计算网络详情：',
      calcStep1: '步骤 1：/22 表示 22 个网络位，10 个主机位',
      calcStep2: '步骤 2：子网掩码 = 11111111.11111111.11111100.00000000 = 255.255.252.0',
      calcStep3: '步骤 3：总地址数 = 2^10 = 1,024',
      calcStep4: '步骤 4：可用主机 = 1,024 - 2 = 1,022',
      calcStep5: '步骤 5：网络地址 = 10.0.0.0，广播地址 = 10.0.3.255',
      calcStep6: '步骤 6：可用范围 = 10.0.0.1 到 10.0.3.254',

      privateTitle: '6. 私有 IP 地址范围（RFC 1918）',
      privateDesc: '以下三个 IP 范围保留给私有网络，不会在公网上路由：',
      private10: '10.0.0.0/8 — 16,777,216 个地址 — 大型企业网络',
      private172: '172.16.0.0/12 — 1,048,576 个地址 — 中型网络',
      private192: '192.168.0.0/16 — 65,536 个地址 — 家庭和小型办公网络',
      privateNote: '此外，169.254.0.0/16 用于链路本地（APIPA），127.0.0.0/8 是环回地址范围。',

      commonTitle: '7. 实际常用子网',
      commonDesc: '不同环境使用不同的子网大小：',
      commonHome: '/24（256 个 IP）— 家庭网络：大多数路由器默认 192.168.1.0/24',
      commonSmall: '/23（512 个 IP）— 小型办公室：当一个 /24 不够用时',
      commonVpc: '/16（65,536 个 IP）— 云 VPC：AWS、GCP 和 Azure 默认 VPC 大小',
      commonPtp: '/30（4 个 IP）或 /31（2 个 IP）— 路由器间点对点链路',
      commonHost: '/32（1 个 IP）— 单主机路由，用于防火墙和路由表',
      commonK8s: '/12 或 /16 — Kubernetes Pod 和 Service CIDR 范围',

      ipv6Title: '8. IPv6 CIDR 基础',
      ipv6Desc: 'IPv6 地址为 128 位，提供极其庞大的地址空间。CIDR 表示法的工作方式相同：',
      ipv6Slash64: '/64 — 标准子网大小。每个子网有 2^64 个主机地址（最常见的分配）。',
      ipv6Slash48: '/48 — 典型站点分配。包含 65,536 个 /64 子网。',
      ipv6Slash128: '/128 — 单主机地址（相当于 IPv4 的 /32）。',
      ipv6Slash32: '/32 — ISP 分配。包含 40 亿个 /64 子网。',
      ipv6Note: '与 IPv4 不同，IPv6 不使用广播地址。/64 边界很重要，因为无状态地址自动配置（SLAAC）需要它。',

      superTitle: '9. 超网（路由聚合）',
      superDesc: '超网将多个较小的子网合并为一个更大的前缀，以减少路由表条目。这也称为路由汇总或聚合。',
      superExample: '示例：将四个 /24 网络合并为一个 /22：',
      superBenefit: '好处：更小的路由表、更快的查找、更少的 BGP 通告和更简单的 ACL。',
      superRule: '规则：子网必须连续且与超网边界对齐。不能将 192.168.1.0/24 和 192.168.5.0/24 聚合为单个前缀。',

      toolsTitle: '10. 子网计算工具',
      toolsDesc: '这些工具可以帮助你快速计算子网：',
      toolIpcalc: 'ipcalc — Linux CLI 工具。使用 apt install ipcalc 安装。显示网络、广播、主机范围和通配符。',
      toolSipcalc: 'sipcalc — 支持 IPv6 的高级 CLI 工具。使用 apt install sipcalc 安装。',
      toolOnline: '在线计算器 — 我们的 IP 计算器工具可直接在浏览器中计算子网。',
      toolPython: 'Python ipaddress 模块 — 用于脚本中子网计算的内置库。',
      tryTool: '试试我们的 IP 计算器工具',

      faq1q: '子网掩码和 CIDR 表示法有什么区别？',
      faq1a: '它们以不同格式表示相同的信息。子网掩码 255.255.255.0 等同于 CIDR 表示法中的 /24。CIDR 更紧凑，是现代标准。',
      faq2q: '/24 子网有多少个可用主机？',
      faq2a: '/24 子网有 256 个总地址（2^8）。减去网络地址和广播地址，剩余 254 个可用主机地址。',
      faq3q: '/32 是什么意思？',
      faq3a: '/32 表示没有主机位的单个 IP 地址。它用于路由表、防火墙规则和 ACL 中指定精确的主机。',
      faq4q: '可以将 /24 划分为更小的子网吗？',
      faq4a: '可以。/24 可以分成两个 /25（各 126 个主机）、四个 /26（各 62 个主机）、八个 /27（各 30 个主机），依此类推。每增加一位网络位，子网数翻倍，主机数减半。',
      faq5q: '什么是通配符掩码？',
      faq5a: '通配符掩码是子网掩码的反码。对于 255.255.255.0，通配符是 0.0.0.255。通配符掩码用于 Cisco ACL 和 OSPF 配置中匹配 IP 地址范围。',
      faq6q: '为什么云提供商建议 VPC 使用 /16？',
      faq6a: '/16 提供 65,534 个可用 IP，足以容纳不同可用区、服务和未来增长的多个子网，无需重新编号。AWS、GCP 和 Azure 都推荐 /16 作为默认 VPC 大小。',
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
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 13 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px' };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };

  // Complete CIDR table data: [CIDR, Mask, Wildcard, Total IPs, Usable Hosts, Typical Use]
  const cidrData: [string, string, string, string, string, string][] = [
    ['/8',  '255.0.0.0',       '0.255.255.255',   '16,777,216', '16,777,214', 'Class A'],
    ['/9',  '255.128.0.0',     '0.127.255.255',   '8,388,608',  '8,388,606',  ''],
    ['/10', '255.192.0.0',     '0.63.255.255',    '4,194,304',  '4,194,302',  ''],
    ['/11', '255.224.0.0',     '0.31.255.255',    '2,097,152',  '2,097,150',  ''],
    ['/12', '255.240.0.0',     '0.15.255.255',    '1,048,576',  '1,048,574',  '172.16.0.0/12'],
    ['/13', '255.248.0.0',     '0.7.255.255',     '524,288',    '524,286',    ''],
    ['/14', '255.252.0.0',     '0.3.255.255',     '262,144',    '262,142',    ''],
    ['/15', '255.254.0.0',     '0.1.255.255',     '131,072',    '131,070',    ''],
    ['/16', '255.255.0.0',     '0.0.255.255',     '65,536',     '65,534',     'Class B / VPC'],
    ['/17', '255.255.128.0',   '0.0.127.255',     '32,768',     '32,766',     ''],
    ['/18', '255.255.192.0',   '0.0.63.255',      '16,384',     '16,382',     ''],
    ['/19', '255.255.224.0',   '0.0.31.255',      '8,192',      '8,190',      ''],
    ['/20', '255.255.240.0',   '0.0.15.255',      '4,096',      '4,094',      'Large subnet'],
    ['/21', '255.255.248.0',   '0.0.7.255',       '2,048',      '2,046',      ''],
    ['/22', '255.255.252.0',   '0.0.3.255',       '1,024',      '1,022',      ''],
    ['/23', '255.255.254.0',   '0.0.1.255',       '512',        '510',        'Small office'],
    ['/24', '255.255.255.0',   '0.0.0.255',       '256',        '254',        'Class C / LAN'],
    ['/25', '255.255.255.128', '0.0.0.127',       '128',        '126',        ''],
    ['/26', '255.255.255.192', '0.0.0.63',        '64',         '62',         ''],
    ['/27', '255.255.255.224', '0.0.0.31',        '32',         '30',         'Small segment'],
    ['/28', '255.255.255.240', '0.0.0.15',        '16',         '14',         'Tiny subnet'],
    ['/29', '255.255.255.248', '0.0.0.7',         '8',          '6',          'Point-to-point'],
    ['/30', '255.255.255.252', '0.0.0.3',         '4',          '2',          'Router link'],
    ['/31', '255.255.255.254', '0.0.0.1',         '2',          '2*',         'RFC 3021 P2P'],
    ['/32', '255.255.255.255', '0.0.0.0',         '1',          '1*',         'Host route'],
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* Section 1: What Is a Subnet Mask */}
      <h2 style={h2Style}>{ct.subnetTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.subnetDesc}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{ct.subnetBinaryLabel}</p>
      <pre style={codeStyle}><code>{`255  .  255  .  255  .  0
11111111.11111111.11111111.00000000
|-------- Network --------|- Host-|
        24 bits               8 bits`}</code></pre>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 16, marginBottom: 16 }}>{ct.subnetExplain}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{ct.subnetExampleLabel}</p>
      <pre style={codeStyle}><code>{`IP Address:    192.168.1.100   = 11000000.10101000.00000001.01100100
Subnet Mask:   255.255.255.0   = 11111111.11111111.11111111.00000000
               ─────────────────────────────────────────────────────
Network (AND): 192.168.1.0     = 11000000.10101000.00000001.00000000
Broadcast:     192.168.1.255   = 11000000.10101000.00000001.11111111
Host Range:    192.168.1.1 — 192.168.1.254  (254 usable hosts)`}</code></pre>

      {/* Section 2: CIDR Notation */}
      <h2 style={h2Style}>{ct.cidrTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.cidrDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {[
          { prefix: '/24', color: '#22c55e', desc: ct.cidrSlash24 },
          { prefix: '/16', color: '#3b82f6', desc: ct.cidrSlash16 },
          { prefix: '/8', color: '#f59e0b', desc: ct.cidrSlash8 },
        ].map(item => (
          <div key={item.prefix} style={{ display: 'flex', gap: 16, padding: 14, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', alignItems: 'center' }}>
            <code style={{ fontSize: 20, fontWeight: 800, color: item.color, minWidth: 50 }}>{item.prefix}</code>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</span>
          </div>
        ))}
      </div>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.cidrNote}</p>
      <pre style={codeStyle}><code>{`192.168.1.0/24
│           │
│           └── 24 network bits (slash notation)
└── Network prefix

Binary view:
11000000.10101000.00000001 . 00000000
|---- 24 network bits ----| |8 host |`}</code></pre>

      {/* Section 3: Complete CIDR Reference Table */}
      <h2 style={h2Style}>{ct.tableTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.tableDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 12 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{ct.thCidr}</th>
              <th style={thStyle}>{ct.thMask}</th>
              <th style={thStyle}>{ct.thWildcard}</th>
              <th style={thStyle}>{ct.thTotal}</th>
              <th style={thStyle}>{ct.thUsable}</th>
              <th style={thStyle}>{ct.thNote}</th>
            </tr>
          </thead>
          <tbody>
            {cidrData.map(([cidr, mask, wildcard, total, usable, note]) => (
              <tr key={cidr} style={['/8', '/16', '/24', '/32'].includes(cidr) ? { background: 'rgba(59,130,246,0.06)' } : {}}>
                <td style={{ ...tdStyle, fontWeight: 700 }}><code>{cidr}</code></td>
                <td style={tdStyle}><code>{mask}</code></td>
                <td style={tdStyle}><code>{wildcard}</code></td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{total}</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>{usable}</td>
                <td style={{ ...tdStyle, fontSize: 12, color: 'var(--text-secondary)' }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: 24 }}>
        * /31 uses both addresses per RFC 3021 (point-to-point). /32 is a single host route.
      </p>

      {/* Section 4: How Subnetting Works */}
      <h2 style={h2Style}>{ct.howTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.howDesc}</p>
      <pre style={codeStyle}><code>{`Example: 172.16.10.0/20

IP:   10101100.00010000.00001010.00000000
Mask: 11111111.11111111.11110000.00000000
      |---- ${ct.howNetworkBits} ----|--- ${ct.howHostBits} ---|
      |<-------- 20 bits -------->|<- 12 bits ->|

Network:   172.16.0.0     (host bits all 0)
Broadcast: 172.16.15.255  (host bits all 1)
Range:     172.16.0.1 — 172.16.15.254
Hosts:     2^12 - 2 = 4,094`}</code></pre>
      <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: 20, marginBottom: 8 }}>{ct.howRules}</p>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{ct.howRule1}</li>
        <li>{ct.howRule2}</li>
        <li>{ct.howRule3}</li>
        <li>{ct.howRule4}</li>
      </ul>

      {/* Section 5: Calculating Subnets */}
      <h2 style={h2Style}>{ct.calcTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.calcDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {[ct.calcStep1, ct.calcStep2, ct.calcStep3, ct.calcStep4, ct.calcStep5, ct.calcStep6].map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#3b82f6', minWidth: 24 }}>{i + 1}</span>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step}</span>
          </div>
        ))}
      </div>
      <pre style={codeStyle}><code>{`10.0.0.0/22

Binary mask: 11111111.11111111.11111100.00000000 = 255.255.252.0
Wildcard:    00000000.00000000.00000011.11111111 = 0.0.3.255

Network:     10.0.0.0
First host:  10.0.0.1
Last host:   10.0.3.254
Broadcast:   10.0.3.255
Total:       1,024 addresses
Usable:      1,022 hosts`}</code></pre>

      {/* Section 6: Private IP Ranges */}
      <h2 style={h2Style}>{ct.privateTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.privateDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {[
          { range: '10.0.0.0/8', color: '#f59e0b', desc: ct.private10 },
          { range: '172.16.0.0/12', color: '#3b82f6', desc: ct.private172 },
          { range: '192.168.0.0/16', color: '#22c55e', desc: ct.private192 },
        ].map(item => (
          <div key={item.range} style={{ display: 'flex', gap: 16, padding: 14, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', alignItems: 'center' }}>
            <code style={{ fontSize: 14, fontWeight: 700, color: item.color, minWidth: 130 }}>{item.range}</code>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</span>
          </div>
        ))}
      </div>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24 }}>{ct.privateNote}</p>
      <pre style={codeStyle}><code>{`Private Ranges (RFC 1918):
┌─────────────────┬───────────────────────────┬──────────────┐
│  10.0.0.0/8     │  10.0.0.0 – 10.255.255.255│ 16,777,216   │
│ 172.16.0.0/12   │ 172.16.0.0 – 172.31.255.255│  1,048,576   │
│ 192.168.0.0/16  │ 192.168.0.0 – 192.168.255.255│     65,536 │
└─────────────────┴───────────────────────────┴──────────────┘

Other reserved:
127.0.0.0/8       Loopback
169.254.0.0/16    Link-local (APIPA)
100.64.0.0/10     Carrier-grade NAT (RFC 6598)`}</code></pre>

      {/* Section 7: Common Subnets in Practice */}
      <h2 style={h2Style}>{ct.commonTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.commonDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {[
          { label: ct.commonHome, icon: '/24' },
          { label: ct.commonSmall, icon: '/23' },
          { label: ct.commonVpc, icon: '/16' },
          { label: ct.commonPtp, icon: '/30' },
          { label: ct.commonHost, icon: '/32' },
          { label: ct.commonK8s, icon: 'K8s' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', alignItems: 'center' }}>
            <code style={{ fontSize: 14, fontWeight: 800, color: '#8b5cf6', minWidth: 40, textAlign: 'center' }}>{item.icon}</code>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.label}</span>
          </div>
        ))}
      </div>
      <pre style={codeStyle}><code>{`# AWS VPC example
VPC:            10.0.0.0/16     (65,536 IPs)
├── Public-1a:  10.0.1.0/24     (256 IPs)
├── Public-1b:  10.0.2.0/24     (256 IPs)
├── Private-1a: 10.0.10.0/24    (256 IPs)
├── Private-1b: 10.0.11.0/24    (256 IPs)
├── DB-1a:      10.0.20.0/24    (256 IPs)
└── DB-1b:      10.0.21.0/24    (256 IPs)

# Kubernetes (default)
Pod CIDR:       10.244.0.0/16
Service CIDR:   10.96.0.0/12`}</code></pre>

      {/* Section 8: IPv6 CIDR Basics */}
      <h2 style={h2Style}>{ct.ipv6Title}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.ipv6Desc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {[
          { prefix: '/64', color: '#22c55e', desc: ct.ipv6Slash64 },
          { prefix: '/48', color: '#3b82f6', desc: ct.ipv6Slash48 },
          { prefix: '/128', color: '#ef4444', desc: ct.ipv6Slash128 },
          { prefix: '/32', color: '#f59e0b', desc: ct.ipv6Slash32 },
        ].map(item => (
          <div key={item.prefix} style={{ display: 'flex', gap: 16, padding: 14, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', alignItems: 'center' }}>
            <code style={{ fontSize: 18, fontWeight: 800, color: item.color, minWidth: 55 }}>{item.prefix}</code>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</span>
          </div>
        ))}
      </div>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.ipv6Note}</p>
      <pre style={codeStyle}><code>{`IPv6 Address: 2001:0db8:85a3:0000:0000:8a2e:0370:7334/64

|---- 64-bit Network Prefix ----|---- 64-bit Interface ID ----|
2001:0db8:85a3:0000              :0000:8a2e:0370:7334

Common allocations:
/32  →  ISP allocation       (65,536 × /48 sites)
/48  →  Site allocation      (65,536 × /64 subnets)
/64  →  Single subnet        (18,446,744,073,709,551,616 hosts)
/128 →  Single host          (loopback, host routes)`}</code></pre>

      {/* Section 9: Supernetting */}
      <h2 style={h2Style}>{ct.superTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.superDesc}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{ct.superExample}</p>
      <pre style={codeStyle}><code>{`Before (4 routes):
192.168.0.0/24   →  192.168.0.0   – 192.168.0.255
192.168.1.0/24   →  192.168.1.0   – 192.168.1.255
192.168.2.0/24   →  192.168.2.0   – 192.168.2.255
192.168.3.0/24   →  192.168.3.0   – 192.168.3.255

After (1 route):
192.168.0.0/22   →  192.168.0.0   – 192.168.3.255

Binary proof:
192.168.0.0 = 11000000.10101000.000000|00.00000000
192.168.1.0 = 11000000.10101000.000000|01.00000000
192.168.2.0 = 11000000.10101000.000000|10.00000000
192.168.3.0 = 11000000.10101000.000000|11.00000000
                                 ^^^^^^
                            22 common bits → /22`}</code></pre>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 16, marginBottom: 8 }}>{ct.superBenefit}</p>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24 }}>{ct.superRule}</p>

      {/* Section 10: Tools */}
      <h2 style={h2Style}>{ct.toolsTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.toolsDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {[
          { name: 'ipcalc', desc: ct.toolIpcalc },
          { name: 'sipcalc', desc: ct.toolSipcalc },
          { name: 'Online', desc: ct.toolOnline },
          { name: 'Python', desc: ct.toolPython },
        ].map(item => (
          <div key={item.name} style={{ padding: 14, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <strong style={{ color: '#3b82f6', fontSize: 14 }}>{item.name}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
      <pre style={codeStyle}><code>{`# ipcalc example
$ ipcalc 192.168.1.0/24
Address:   192.168.1.0          11000000.10101000.00000001. 00000000
Netmask:   255.255.255.0 = 24   11111111.11111111.11111111. 00000000
Wildcard:  0.0.0.255            00000000.00000000.00000000. 11111111
Network:   192.168.1.0/24
HostMin:   192.168.1.1
HostMax:   192.168.1.254
Broadcast: 192.168.1.255
Hosts/Net: 254

# Python ipaddress
import ipaddress
net = ipaddress.ip_network('10.0.0.0/22')
print(net.network_address)   # 10.0.0.0
print(net.broadcast_address) # 10.0.3.255
print(net.num_addresses)     # 1024
print(list(net.subnets()))   # [10.0.0.0/23, 10.0.2.0/23]`}</code></pre>

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
        [ct.faq6q, ct.faq6a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
