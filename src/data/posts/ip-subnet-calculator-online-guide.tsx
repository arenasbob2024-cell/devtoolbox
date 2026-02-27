'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'IP Subnet Calculator: CIDR Notation & Subnetting — Complete Guide',
    description: 'Master IP subnetting and CIDR notation. Complete guide covering subnet masks, network/broadcast addresses, JavaScript/Python/Go calculators, IPv6, VLSM, AWS VPC subnetting, Docker networking, and Kubernetes pod CIDR.',
  },
  zh: {
    title: 'IP子网计算器：CIDR表示法与子网划分完整指南',
    description: '掌握IP子网划分和CIDR表示法。完整指南涵盖子网掩码、网络/广播地址、JavaScript/Python/Go计算器、IPv6、VLSM、AWS VPC子网划分、Docker网络和Kubernetes Pod CIDR。',
  },
};

export default function IpSubnetCalculatorOnlineGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is CIDR notation and how do you read it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CIDR (Classless Inter-Domain Routing) notation represents an IP address combined with its prefix length, separated by a slash. For example, 192.168.1.0/24 means the first 24 bits are the network portion and the remaining 8 bits are the host portion. A /24 network has 256 total addresses (2^8), with 254 usable hosts (subtracting network address and broadcast address). The prefix length can range from /0 (the entire internet) to /32 (a single host). CIDR replaced the older classful IP addressing (Class A /8, Class B /16, Class C /24) to allow more efficient allocation of IP address space.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a network address and a broadcast address?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In any subnet, the network address (also called the network ID) is the first address where all host bits are set to 0. It identifies the subnet itself and cannot be assigned to a host. The broadcast address is the last address where all host bits are set to 1. Packets sent to the broadcast address are delivered to all hosts on the subnet. For 192.168.1.0/24: the network address is 192.168.1.0, the broadcast address is 192.168.1.255, and usable host addresses are 192.168.1.1 through 192.168.1.254 (254 hosts). For a /30 subnet (common for point-to-point links): only 2 usable hosts exist between the network and broadcast addresses.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you calculate the number of hosts in a subnet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The formula is: usable hosts = 2^(32 - prefix_length) - 2. The subtraction of 2 accounts for the network address and broadcast address. Examples: /24 = 2^8 - 2 = 254 hosts; /25 = 2^7 - 2 = 126 hosts; /26 = 2^6 - 2 = 62 hosts; /27 = 2^5 - 2 = 30 hosts; /28 = 2^4 - 2 = 14 hosts; /29 = 2^3 - 2 = 6 hosts; /30 = 2^2 - 2 = 2 hosts (used for point-to-point links); /31 = 2 hosts with no network/broadcast (RFC 3021, used for point-to-point); /32 = single host route.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is VLSM and why is it used?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'VLSM (Variable Length Subnet Masking) allows a single network to be divided into subnets of different sizes, rather than all subnets being the same size. This is critical for efficient IP address utilization. For example, a WAN link between two routers only needs 2 usable hosts (/30), while a data center LAN might need 500 hosts (/23). Without VLSM, you would waste addresses by assigning the same large subnet to the WAN link. VLSM requires a routing protocol that carries subnet mask information (like OSPF or EIGRP), rather than classful protocols that assume fixed masks based on the IP class.',
        },
      },
      {
        '@type': 'Question',
        name: 'What IP ranges are private and cannot be routed on the internet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RFC 1918 defines three private IP ranges reserved for internal use: 10.0.0.0/8 (Class A, 16,777,214 hosts), 172.16.0.0/12 (Class B range, 172.16.0.0 to 172.31.255.255, 1,048,574 hosts), and 192.168.0.0/16 (Class C range, 65,534 hosts). Additionally, 169.254.0.0/16 is used for APIPA (Automatic Private IP Addressing) when DHCP fails. 127.0.0.0/8 is the loopback range (127.0.0.1 is localhost). 100.64.0.0/10 is the shared address space for ISP carrier-grade NAT (RFC 6598). None of these ranges are routable on the public internet.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does AWS reserve IP addresses in a VPC subnet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AWS reserves 5 IP addresses in every VPC subnet, not just the standard 2 (network + broadcast). For a 10.0.1.0/24 subnet: 10.0.1.0 is the network address, 10.0.1.1 is reserved for the VPC router, 10.0.1.2 is reserved for AWS DNS, 10.0.1.3 is reserved for future use, and 10.0.1.255 is the broadcast address. This means a /24 in AWS has 251 usable addresses (not 254). For a /28 (the minimum VPC subnet size), you get 16 - 5 = 11 usable addresses. This is an important consideration when sizing AWS subnets for your workloads.',
        },
      },
      {
        '@type': 'Question',
        name: 'What prefix length should I use for Docker and Kubernetes networking?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Docker by default uses 172.17.0.0/16 for the bridge network, giving 65,534 container addresses. For Docker Swarm, it uses 10.0.0.0/8 for overlay networks. Kubernetes typically uses 10.244.0.0/16 or 192.168.0.0/16 for pod CIDR depending on the CNI plugin (Flannel uses 10.244.0.0/16, Calico commonly uses 192.168.0.0/16). Each node gets a /24 subnet carved from the pod CIDR, allowing 254 pods per node. The service CIDR (ClusterIP range) is typically 10.96.0.0/12. These ranges must not overlap with your VPC or on-premises networks.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is IPv6 subnetting different from IPv4?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'IPv6 uses 128-bit addresses instead of 32-bit, making the address space astronomically larger. Standard IPv6 allocation sizes are: /48 for an organization (ISPs typically allocate this to customers), /64 for a single LAN segment (required for SLAAC auto-configuration), /128 for a single host. A /64 IPv6 network contains 2^64 = 18,446,744,073,709,551,616 addresses — enough for every device ever made. IPv6 does not use broadcast; instead it uses multicast and anycast. The loopback address is ::1/128. Link-local addresses use fe80::/10. Private (ULA) addresses use fc00::/7 (typically fd00::/8 in practice).',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/ip-subnet-calculator-online-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A <strong>subnet</strong> divides an IP network into smaller segments. CIDR notation like{' '}
          <code>192.168.1.0/24</code> means 24 bits for the network, 8 bits for hosts = 254 usable addresses.
          Calculate usable hosts with <code>2^(32 - prefix) - 2</code>. Use{' '}
          <strong>VLSM</strong> to allocate different-sized subnets for different needs. AWS reserves 5 IPs per
          subnet (not 2). Docker uses <code>172.17.0.0/16</code>, Kubernetes pods use <code>10.244.0.0/16</code>.
          Try our{' '}
          <Link href={`/${lang}/tools/ip-calculator`} style={{ color: '#0284c7' }}>online IP subnet calculator</Link>{' '}
          to compute any CIDR block instantly.
        </p>
      </div>

      {/* Section 1: CIDR Notation Basics */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CIDR Notation Basics — IP Classes, Subnet Masks, and Address Structure
      </h2>
      <p>
        <strong>CIDR (Classless Inter-Domain Routing)</strong> is the modern standard for IP address allocation
        and routing. Before CIDR, IP addresses were divided into fixed classes — Class A, B, and C — which caused
        massive waste of address space. CIDR allows any prefix length from /0 to /32, enabling precise allocation.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        The Original IP Classes (Pre-CIDR)
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Class</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>First Octet</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>CIDR Equiv.</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Default Mask</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Max Hosts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>A</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>1–126</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>/8</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>255.0.0.0</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>16,777,214</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>B</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>128–191</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>/16</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>255.255.0.0</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>65,534</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>C</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>192–223</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>/24</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>255.255.255.0</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>254</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>D</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>224–239</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>—</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>—</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Multicast only</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>E</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>240–255</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>—</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>—</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Reserved/Experimental</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        How CIDR Notation Works — Bit-Level Breakdown
      </h3>
      <p>
        A subnet mask is a 32-bit number where network bits are <code>1</code> and host bits are <code>0</code>.
        The prefix length in CIDR notation is simply the count of consecutive <code>1</code> bits from the left:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# 192.168.1.0/24 — breakdown:
IP Address:  192.168.1.0   = 11000000.10101000.00000001.00000000
Subnet Mask: 255.255.255.0 = 11111111.11111111.11111111.00000000
                              |<--- 24 network bits --->|<8 host->|

Network Address  = IP AND Mask = 192.168.1.0   (all host bits = 0)
Broadcast Address              = 192.168.1.255  (all host bits = 1)
First Usable Host              = 192.168.1.1
Last Usable Host               = 192.168.1.254
Usable Hosts                   = 2^8 - 2 = 254

# 10.0.0.0/8 — breakdown:
IP Address:  10.0.0.0      = 00001010.00000000.00000000.00000000
Subnet Mask: 255.0.0.0     = 11111111.00000000.00000000.00000000
                              |< 8 >|  |<------- 24 host bits ------->|
Usable Hosts = 2^24 - 2 = 16,777,214

# Converting prefix to mask in Python:
import ipaddress
net = ipaddress.IPv4Network('192.168.1.0/24')
print(net.netmask)         # 255.255.255.0
print(net.hostmask)        # 0.0.0.255
print(net.num_addresses)   # 256
print(net.network_address) # 192.168.1.0
print(net.broadcast_address) # 192.168.1.255`}</code></pre>

      {/* Section 2: JavaScript IP Subnet Calculator */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JavaScript IP Subnet Calculator — Pure JS Implementation
      </h2>
      <p>
        Here is a complete, dependency-free JavaScript function that parses any CIDR block and returns all subnet
        details: network address, broadcast address, first/last usable host, host count, subnet mask, and wildcard mask.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/**
 * Parse a CIDR string and compute subnet details.
 * @param {string} cidr - e.g. "192.168.1.0/24" or "10.0.0.5/16"
 * @returns {object} Subnet calculation results
 */
function calculateSubnet(cidr) {
  const [ipStr, prefixStr] = cidr.split('/');
  const prefix = parseInt(prefixStr, 10);

  if (prefix < 0 || prefix > 32) {
    throw new Error('Prefix length must be between 0 and 32');
  }

  // Convert IP string to a 32-bit integer
  const ipToInt = (ip) =>
    ip.split('.').reduce((acc, octet) => (acc << 8) | parseInt(octet, 10), 0) >>> 0;

  // Convert 32-bit integer back to dotted-decimal string
  const intToIp = (n) =>
    [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');

  const ipInt = ipToInt(ipStr);

  // Build mask: prefix 1-bits followed by (32-prefix) 0-bits
  const maskInt = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
  const wildcardInt = (~maskInt) >>> 0;

  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;

  const totalAddresses = Math.pow(2, 32 - prefix);
  const usableHosts = prefix >= 31 ? totalAddresses : totalAddresses - 2;

  return {
    cidr,
    ipAddress:        ipStr,
    prefix,
    subnetMask:       intToIp(maskInt),
    wildcardMask:     intToIp(wildcardInt),
    networkAddress:   intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    firstUsableHost:  prefix >= 31 ? intToIp(networkInt) : intToIp(networkInt + 1),
    lastUsableHost:   prefix >= 31 ? intToIp(broadcastInt) : intToIp(broadcastInt - 1),
    totalAddresses,
    usableHosts,
    ipClass: (() => {
      const firstOctet = (networkInt >>> 24) & 255;
      if (firstOctet < 128) return 'A';
      if (firstOctet < 192) return 'B';
      if (firstOctet < 224) return 'C';
      if (firstOctet < 240) return 'D (Multicast)';
      return 'E (Reserved)';
    })(),
    isPrivate: (() => {
      const a = (networkInt >>> 24) & 255;
      const b = (networkInt >>> 16) & 255;
      return (a === 10) ||
             (a === 172 && b >= 16 && b <= 31) ||
             (a === 192 && b === 168) ||
             (a === 127);
    })(),
  };
}

// Example usage:
const result = calculateSubnet('192.168.1.0/24');
console.log(result);
/* Output:
{
  cidr: '192.168.1.0/24',
  ipAddress: '192.168.1.0',
  prefix: 24,
  subnetMask: '255.255.255.0',
  wildcardMask: '0.0.0.255',
  networkAddress: '192.168.1.0',
  broadcastAddress: '192.168.1.255',
  firstUsableHost: '192.168.1.1',
  lastUsableHost: '192.168.1.254',
  totalAddresses: 256,
  usableHosts: 254,
  ipClass: 'C',
  isPrivate: true
}
*/

// Check if an IP is within a subnet
function isIpInSubnet(ip, cidr) {
  const { networkAddress, broadcastAddress } = calculateSubnet(cidr);
  const ipToInt = (s) => s.split('.').reduce((a, o) => (a << 8) | +o, 0) >>> 0;
  const ipInt = ipToInt(ip);
  return ipInt >= ipToInt(networkAddress) && ipInt <= ipToInt(broadcastAddress);
}

console.log(isIpInSubnet('192.168.1.100', '192.168.1.0/24')); // true
console.log(isIpInSubnet('192.168.2.1',   '192.168.1.0/24')); // false

// Split a subnet into smaller subnets
function splitSubnet(cidr, newPrefix) {
  const { networkAddress, prefix } = calculateSubnet(cidr);
  if (newPrefix <= prefix) throw new Error('New prefix must be larger than original');
  const count = Math.pow(2, newPrefix - prefix);
  const blockSize = Math.pow(2, 32 - newPrefix);

  const ipToInt = (s) => s.split('.').reduce((a, o) => (a << 8) | +o, 0) >>> 0;
  const intToIp = (n) => [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.');

  const baseInt = ipToInt(networkAddress);
  return Array.from({ length: count }, (_, i) =>
    \`\${intToIp((baseInt + i * blockSize) >>> 0)}/\${newPrefix}\`
  );
}

console.log(splitSubnet('192.168.1.0/24', 26));
// ['192.168.1.0/26', '192.168.1.64/26', '192.168.1.128/26', '192.168.1.192/26']`}</code></pre>

      {/* Section 3: Python ipaddress module */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python <code>ipaddress</code> Module — Complete Subnet Calculation
      </h2>
      <p>
        Python&apos;s built-in <code>ipaddress</code> module (Python 3.3+) provides comprehensive IP networking
        capabilities with no external dependencies. It handles both IPv4 and IPv6 natively.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import ipaddress

# ── IPv4 Network ──────────────────────────────────────────────────────────────
# strict=False allows host bits to be set (e.g., 192.168.1.5/24 → 192.168.1.0/24)
net = ipaddress.IPv4Network('192.168.1.0/24', strict=True)

print(net.network_address)   # 192.168.1.0
print(net.broadcast_address) # 192.168.1.255
print(net.netmask)           # 255.255.255.0
print(net.hostmask)          # 0.0.0.255
print(net.prefixlen)         # 24
print(net.num_addresses)     # 256
print(net.max_prefixlen)     # 32

# Usable hosts (excludes network + broadcast)
hosts = list(net.hosts())
print(f"First host: {hosts[0]}")   # 192.168.1.1
print(f"Last host:  {hosts[-1]}")  # 192.168.1.254
print(f"Host count: {len(hosts)}") # 254

# Network properties
print(net.is_private)   # True  (RFC 1918)
print(net.is_global)    # False
print(net.is_loopback)  # False
print(net.is_multicast) # False

# ── IPv4 Interface (IP + network context) ────────────────────────────────────
iface = ipaddress.IPv4Interface('192.168.1.5/24')
print(iface.ip)          # 192.168.1.5  (the specific host IP)
print(iface.network)     # 192.168.1.0/24 (the network it belongs to)
print(iface.netmask)     # 255.255.255.0

# ── Subnets — splitting into smaller blocks ───────────────────────────────────
net = ipaddress.IPv4Network('10.0.0.0/16')

# Split /16 into /18 subnets (4 subnets)
subnets = list(net.subnets(new_prefix=18))
for s in subnets:
    print(s)
# 10.0.0.0/18
# 10.0.64.0/18
# 10.0.128.0/18
# 10.0.192.0/18

# Split by specifying number of additional bits (prefixlen_diff)
# Split /24 into /26 (2 additional bits = 4 subnets)
net24 = ipaddress.IPv4Network('192.168.1.0/24')
for sub in net24.subnets(prefixlen_diff=2):
    hosts = net24.num_addresses // 4 - 2
    print(f"{sub}  →  {list(sub.hosts())[0]} – {list(sub.hosts())[-1]}  ({hosts} hosts)")
# 192.168.1.0/26  →  192.168.1.1 – 192.168.1.62   (62 hosts)
# 192.168.1.64/26 →  192.168.1.65 – 192.168.1.126  (62 hosts)
# 192.168.1.128/26→  192.168.1.129 – 192.168.1.190 (62 hosts)
# 192.168.1.192/26→  192.168.1.193 – 192.168.1.254 (62 hosts)

# ── Supernet — aggregating into a larger block ────────────────────────────────
small = ipaddress.IPv4Network('192.168.1.0/25')
print(small.supernet())   # 192.168.1.0/24
print(small.supernet(new_prefix=22))  # 192.168.0.0/22

# ── Containment check ────────────────────────────────────────────────────────
net = ipaddress.IPv4Network('10.0.0.0/8')
ip = ipaddress.IPv4Address('10.5.6.7')
print(ip in net)  # True

# ── Summarize a range into CIDR blocks (reverse lookup) ─────────────────────
first = ipaddress.IPv4Address('192.168.1.0')
last  = ipaddress.IPv4Address('192.168.1.255')
summary = list(ipaddress.summarize_address_range(first, last))
print(summary)  # [IPv4Network('192.168.1.0/24')]

# Collapse overlapping networks
networks = [
    ipaddress.IPv4Network('10.0.0.0/24'),
    ipaddress.IPv4Network('10.0.1.0/24'),
    ipaddress.IPv4Network('10.0.0.0/23'),  # overlaps with both above
]
collapsed = list(ipaddress.collapse_addresses(networks))
print(collapsed)  # [IPv4Network('10.0.0.0/23')]`}</code></pre>

      {/* Section 4: Subnet Table */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Subnet Reference Table — /8 to /32 with Host Counts and Masks
      </h2>
      <p>
        The table below covers every practically significant prefix length, from large backbone blocks to single-host
        routes. Bookmark this as a quick reference when designing network architectures.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#e2e8f0' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #334155' }}>Prefix</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #334155' }}>Subnet Mask</th>
              <th style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '2px solid #334155' }}>Total IPs</th>
              <th style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '2px solid #334155' }}>Usable Hosts</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #334155' }}>Common Use</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['/8',  '255.0.0.0',         '16,777,216', '16,777,214', 'Large ISP / Class A private (10.0.0.0/8)'],
              ['/12', '255.240.0.0',        '1,048,576',  '1,048,574',  'RFC 1918 172.16.0.0/12 private range'],
              ['/16', '255.255.0.0',        '65,536',     '65,534',     'Large org LAN / AWS VPC typical size'],
              ['/20', '255.255.240.0',      '4,096',      '4,094',      'Medium data center segment'],
              ['/21', '255.255.248.0',      '2,048',      '2,046',      'Campus network block'],
              ['/22', '255.255.252.0',      '1,024',      '1,022',      'Large office LAN'],
              ['/23', '255.255.254.0',      '512',        '510',        'Medium office / Kubernetes node block'],
              ['/24', '255.255.255.0',      '256',        '254',        'Standard LAN / AWS subnet typical'],
              ['/25', '255.255.255.128',    '128',        '126',        'Half of /24, split LAN'],
              ['/26', '255.255.255.192',    '64',         '62',         'Small department LAN'],
              ['/27', '255.255.255.224',    '32',         '30',         'Small office segment'],
              ['/28', '255.255.255.240',    '16',         '14',         'AWS minimum subnet size'],
              ['/29', '255.255.255.248',    '8',          '6',          'Small cluster / management network'],
              ['/30', '255.255.255.252',    '4',          '2',          'Point-to-point link (router↔router)'],
              ['/31', '255.255.255.254',    '2',          '2',          'P2P link, no network/broadcast (RFC 3021)'],
              ['/32', '255.255.255.255',    '1',          '1',          'Single host route / loopback'],
            ].map(([prefix, mask, total, usable, use], i) => (
              <tr key={prefix} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace', fontWeight: 700, color: '#0369a1' }}>{prefix}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontFamily: 'monospace' }}>{mask}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'right', fontFamily: 'monospace' }}>{total}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'right', fontFamily: 'monospace', color: '#16a34a' }}>{usable}</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#475569' }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 5: IPv6 Subnetting */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        IPv6 Subnetting — /48, /64, /128, and Prefix Length
      </h2>
      <p>
        IPv6 uses 128-bit addresses written as eight groups of four hexadecimal digits separated by colons, such as{' '}
        <code>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>. Consecutive groups of zeros can be replaced with{' '}
        <code>::</code> once per address. The standard allocation hierarchy is:
      </p>
      <ul>
        <li><strong>/32</strong> — ISP allocation from Regional Internet Registry (RIR)</li>
        <li><strong>/48</strong> — Typical allocation to a single organization or site</li>
        <li><strong>/56</strong> — Sometimes given to home users by ISPs</li>
        <li><strong>/64</strong> — A single LAN segment; required for SLAAC (Stateless Address Autoconfiguration)</li>
        <li><strong>/128</strong> — A single host (like /32 in IPv4)</li>
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import ipaddress

# ── IPv6 Network ──────────────────────────────────────────────────────────────
net6 = ipaddress.IPv6Network('2001:db8::/32')
print(net6.network_address)   # 2001:db8::
print(net6.prefixlen)         # 32
print(net6.num_addresses)     # 79228162514264337593543950336 (2^96)

# A /48 — typical organization block
org = ipaddress.IPv6Network('2001:db8:abcd::/48')
print(f"Subnets available (/64): {2**(64-48):,}")  # 65,536 LANs

# Split /48 into /64 subnets (each LAN segment)
subnets_64 = list(org.subnets(new_prefix=64))
print(f"First LAN: {subnets_64[0]}")   # 2001:db8:abcd::/64
print(f"Second LAN: {subnets_64[1]}")  # 2001:db8:abcd:1::/64
print(f"Total /64 subnets: {len(subnets_64)}")  # 65536

# A /64 LAN segment — how many addresses?
lan = ipaddress.IPv6Network('2001:db8:abcd:1::/64')
print(f"Addresses in /64: {lan.num_addresses:,}")
# 18,446,744,073,709,551,616 (2^64)

# Special IPv6 addresses
loopback  = ipaddress.IPv6Address('::1')
link_local = ipaddress.IPv6Network('fe80::/10')
ula        = ipaddress.IPv6Network('fc00::/7')  # Unique Local (private)

print(loopback.is_loopback)               # True
print(ipaddress.IPv6Address('fe80::1').is_link_local)  # True
print(ipaddress.IPv6Address('fd00::1') in ula)         # True

# IPv6 address types
addr = ipaddress.IPv6Address('2001:db8::1')
print(addr.is_global)       # True (public routable)
print(addr.is_private)      # False
print(addr.is_multicast)    # False
print(addr.is_unspecified)  # False (:: is unspecified)

# EUI-64: IPv6 auto-configuration from MAC address
# Given MAC: 00:1A:2B:3C:4D:5E
# 1. Split at middle: 00:1A:2B | 3C:4D:5E
# 2. Insert FF:FE: 00:1A:2B:FF:FE:3C:4D:5E
# 3. Flip 7th bit of first byte: 02:1A:2B:FF:FE:3C:4D:5E
# 4. Combine with prefix fe80::/64:
# Result: fe80::021a:2bff:fe3c:4d5e

def mac_to_eui64(mac, prefix='fe80::'):
    parts = mac.lower().replace('-', ':').split(':')
    parts[0] = format(int(parts[0], 16) ^ 0x02, '02x')  # flip bit 7
    eui64 = parts[:3] + ['ff', 'fe'] + parts[3:]
    groups = [''.join(eui64[i:i+2]) for i in range(0, 8, 2)]
    return f"{prefix}{':'.join(groups)}"

print(mac_to_eui64('00:1A:2B:3C:4D:5E'))
# fe80::021a:2bff:fe3c:4d5e`}</code></pre>

      {/* Section 6: VLSM */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        VLSM — Split 192.168.1.0/24 into Multiple Subnets of Different Sizes
      </h2>
      <p>
        <strong>Variable Length Subnet Masking (VLSM)</strong> lets you carve a single IP block into subnets
        of different sizes to avoid wasting addresses. The key rule: <em>always allocate the largest subnet first,
        work down in size.</em>
      </p>
      <p>
        Scenario: You have <code>192.168.1.0/24</code> (254 usable hosts) and need to create:
      </p>
      <ul>
        <li>Department A: 100 hosts needed</li>
        <li>Department B: 50 hosts needed</li>
        <li>Department C: 25 hosts needed</li>
        <li>WAN Link 1: 2 hosts (router point-to-point)</li>
        <li>WAN Link 2: 2 hosts (router point-to-point)</li>
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# VLSM Allocation for 192.168.1.0/24
# Rule: sort requirements largest-first, allocate sequentially

# Step 1 — Dept A needs 100 hosts → smallest subnet that fits ≥ 102 total
# 2^7 = 128 addresses → /25 (126 usable hosts) ✓
Dept A: 192.168.1.0/25
  Network:    192.168.1.0
  Broadcast:  192.168.1.127
  Usable:     192.168.1.1 – 192.168.1.126  (126 hosts)
  Remaining:  192.168.1.128/25

# Step 2 — Dept B needs 50 hosts → /26 (62 usable hosts) ✓
Dept B: 192.168.1.128/26
  Network:    192.168.1.128
  Broadcast:  192.168.1.191
  Usable:     192.168.1.129 – 192.168.1.190  (62 hosts)
  Remaining:  192.168.1.192/26

# Step 3 — Dept C needs 25 hosts → /27 (30 usable hosts) ✓
Dept C: 192.168.1.192/27
  Network:    192.168.1.192
  Broadcast:  192.168.1.223
  Usable:     192.168.1.193 – 192.168.1.222  (30 hosts)
  Remaining:  192.168.1.224/27

# Step 4 — WAN Link 1 needs 2 hosts → /30 (2 usable hosts) ✓
WAN1: 192.168.1.224/30
  Network:    192.168.1.224
  Broadcast:  192.168.1.227
  Usable:     192.168.1.225 – 192.168.1.226  (2 hosts)
  Remaining:  192.168.1.228/30 + 192.168.1.232/29 + ...

# Step 5 — WAN Link 2 needs 2 hosts → /30
WAN2: 192.168.1.228/30
  Network:    192.168.1.228
  Broadcast:  192.168.1.231
  Usable:     192.168.1.229 – 192.168.1.230  (2 hosts)
  Remaining:  192.168.1.232/29 (unused, available for future)

# ── Python VLSM allocator ──────────────────────────────────────────────────
import ipaddress

def vlsm_allocate(base_cidr, requirements):
    """
    Allocate subnets using VLSM.
    requirements: list of (name, min_hosts) sorted largest-first
    """
    pool = ipaddress.IPv4Network(base_cidr, strict=False)
    available = [pool]
    allocations = []

    for name, min_hosts in sorted(requirements, key=lambda x: x[1], reverse=True):
        # Find the smallest prefix that provides enough hosts
        needed_prefix = 32
        for prefix in range(30, -1, -1):
            if (2 ** (32 - prefix) - 2) >= min_hosts:
                needed_prefix = prefix
            else:
                break

        # Find first available block that can fit this prefix
        for i, block in enumerate(available):
            if block.prefixlen <= needed_prefix:
                # Carve the subnet from this block
                subnet = list(block.subnets(new_prefix=needed_prefix))[0]
                allocations.append((name, subnet, min_hosts))
                available.pop(i)
                # Return remaining space to pool
                remaining = list(block.address_exclude(subnet))
                available = remaining + available[i:]
                break

    return allocations

reqs = [
    ('Dept A', 100),
    ('Dept B', 50),
    ('Dept C', 25),
    ('WAN 1', 2),
    ('WAN 2', 2),
]

results = vlsm_allocate('192.168.1.0/24', reqs)
for name, subnet, needed in results:
    hosts = list(subnet.hosts())
    print(f"{name:8} → {str(subnet):20} usable: {len(hosts):3}  needed: {needed}")

# Dept A   → 192.168.1.0/25        usable: 126  needed: 100
# Dept B   → 192.168.1.128/26      usable:  62  needed:  50
# Dept C   → 192.168.1.192/27      usable:  30  needed:  25
# WAN 1    → 192.168.1.224/30      usable:   2  needed:   2
# WAN 2    → 192.168.1.228/30      usable:   2  needed:   2`}</code></pre>

      {/* Section 7: Node.js ip-cidr library */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Node.js <code>ip-cidr</code> Library — npm Install and Usage
      </h2>
      <p>
        The <code>ip-cidr</code> npm package provides a clean API for working with CIDR blocks in Node.js
        applications. It supports both IPv4 and IPv6 and is useful for backend validation, firewall rule engines,
        and IP address management tools.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Install the package
npm install ip-cidr

# Also useful: the 'cidr-tools' package for set operations
npm install cidr-tools

# ── Basic ip-cidr usage ───────────────────────────────────────────────────────
const IPCIDR = require('ip-cidr');

const cidr = new IPCIDR('192.168.1.0/24');

// Validation
console.log(IPCIDR.isValidCIDR('192.168.1.0/24')); // true
console.log(IPCIDR.isValidCIDR('256.0.0.0/24'));   // false

// Network info
console.log(cidr.start());    // '192.168.1.0'  (network address)
console.log(cidr.end());      // '192.168.1.255' (broadcast)
console.log(cidr.toString()); // '192.168.1.0/24'

// Get specific addresses
const options = { type: 'addressObject' };
console.log(cidr.start(options)); // { address: '192.168.1.0', subnet: '/24' }

// Containment check
const cidr2 = new IPCIDR('10.0.0.0/8');
const isContained = new IPCIDR('10.5.0.0/16');
// Manual containment: compare integer ranges

// Iterate over IPs (be careful with large ranges!)
const smallCidr = new IPCIDR('192.168.1.248/29');
smallCidr.loop((ip) => {
  console.log(ip);
});
// 192.168.1.248
// 192.168.1.249
// ...
// 192.168.1.255

// Get array of all IPs in range
const ips = smallCidr.toArray();
console.log(ips); // ['192.168.1.248', ..., '192.168.1.255']

// Get start/end as integers for comparison
const startInt = smallCidr.start({ type: 'bigInteger' });
const endInt   = smallCidr.end({ type: 'bigInteger' });

// ── cidr-tools: set operations ────────────────────────────────────────────────
const { merge, exclude, contains, overlap, expand } = require('cidr-tools');

// Merge overlapping/adjacent CIDRs
const merged = merge(['10.0.0.0/24', '10.0.1.0/24']);
console.log(merged); // ['10.0.0.0/23']

// Exclude a subnet from a block
const remaining = exclude(['10.0.0.0/24'], ['10.0.0.0/26']);
console.log(remaining); // ['10.0.0.64/26', '10.0.0.128/25']

// Check containment
console.log(contains('10.0.0.0/8', '10.5.6.0/24')); // true
console.log(contains('10.0.0.0/8', '192.168.1.0/24')); // false

// Check overlap between two CIDR blocks
console.log(overlap('10.0.0.0/8', '10.5.0.0/16')); // true
console.log(overlap('10.0.0.0/8', '192.168.1.0/24')); // false

// ── Express.js IP allowlist middleware ─────────────────────────────────────────
const express = require('express');
const app = express();

const ALLOWED_CIDRS = ['10.0.0.0/8', '192.168.0.0/16', '172.16.0.0/12'];

function isPrivateIP(ip) {
  // Remove IPv6 prefix if present (e.g., ::ffff:192.168.1.1)
  const cleanIp = ip.replace(/^::ffff:/, '');
  return ALLOWED_CIDRS.some((cidrStr) => {
    const cidrObj = new IPCIDR(cidrStr);
    // Simplified containment via range check
    return cidrObj.contains ? cidrObj.contains(cleanIp) : false;
  });
}

app.use((req, res, next) => {
  const clientIp = req.ip || req.connection.remoteAddress;
  if (!isPrivateIP(clientIp)) {
    return res.status(403).json({ error: 'Access denied: IP not in allowlist' });
  }
  next();
});`}</code></pre>

      {/* Section 8: Go net package */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Go <code>net</code> Package — ParseCIDR, Contains, and Subnet Ops
      </h2>
      <p>
        Go&apos;s standard library <code>net</code> package provides robust IP and CIDR handling with zero
        dependencies. It is the foundation for Go-based network tools like Kubernetes, Docker, and Terraform.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`package main

import (
    "encoding/binary"
    "fmt"
    "math"
    "net"
)

func main() {
    // ── net.ParseCIDR ───────────────────────────────────────────────────────────
    // Returns the IP address (with host bits) AND the network
    ip, ipNet, err := net.ParseCIDR("192.168.1.42/24")
    if err != nil {
        panic(err)
    }

    fmt.Println(ip)              // 192.168.1.42  (the original IP)
    fmt.Println(ipNet.IP)        // 192.168.1.0   (network address)
    fmt.Println(ipNet.Mask)      // ffffff00       (hex mask)

    ones, bits := ipNet.Mask.Size()
    fmt.Printf("/%d of %d bits\n", ones, bits) // /24 of 32 bits

    // Human-readable subnet mask
    mask := net.IP(ipNet.Mask)
    fmt.Println(mask.String()) // 255.255.255.0 (trick: treat mask as IPv4)

    // ── Containment: IPNet.Contains ───────────────────────────────────────────
    _, subnet, _ := net.ParseCIDR("10.0.0.0/8")

    testIPs := []string{"10.5.6.7", "192.168.1.1", "10.255.255.255"}
    for _, testIP := range testIPs {
        fmt.Printf("%s in %s: %v\n", testIP, subnet, subnet.Contains(net.ParseIP(testIP)))
    }
    // 10.5.6.7       in 10.0.0.0/8: true
    // 192.168.1.1    in 10.0.0.0/8: false
    // 10.255.255.255 in 10.0.0.0/8: true

    // ── Manual subnet arithmetic ──────────────────────────────────────────────
    _, network, _ := net.ParseCIDR("192.168.1.0/24")

    netIP := network.IP.To4()
    netInt := binary.BigEndian.Uint32(netIP)

    ones2, _ := network.Mask.Size()
    hostBits := 32 - ones2
    totalAddrs := uint32(math.Pow(2, float64(hostBits)))

    networkAddr := netInt
    broadcastAddr := netInt | (totalAddrs - 1)
    firstHost := networkAddr + 1
    lastHost := broadcastAddr - 1
    usableHosts := totalAddrs - 2

    intToIP := func(n uint32) net.IP {
        ip := make(net.IP, 4)
        binary.BigEndian.PutUint32(ip, n)
        return ip
    }

    fmt.Printf("Network:   %s\n", intToIP(networkAddr))   // 192.168.1.0
    fmt.Printf("Broadcast: %s\n", intToIP(broadcastAddr)) // 192.168.1.255
    fmt.Printf("First:     %s\n", intToIP(firstHost))     // 192.168.1.1
    fmt.Printf("Last:      %s\n", intToIP(lastHost))      // 192.168.1.254
    fmt.Printf("Hosts:     %d\n", usableHosts)            // 254

    // ── Split subnet into smaller blocks ──────────────────────────────────────
    _, base, _ := net.ParseCIDR("10.0.0.0/16")
    splitPrefix := 18 // split into /18 blocks

    baseMaskOnes, _ := base.Mask.Size()
    count := int(math.Pow(2, float64(splitPrefix-baseMaskOnes)))

    blockSize := uint32(math.Pow(2, float64(32-splitPrefix)))
    baseInt := binary.BigEndian.Uint32(base.IP.To4())

    fmt.Printf("\nSplitting %s into /%d subnets:\n", base, splitPrefix)
    for i := 0; i < count; i++ {
        startInt := baseInt + uint32(i)*blockSize
        subnet := &net.IPNet{
            IP:   intToIP(startInt),
            Mask: net.CIDRMask(splitPrefix, 32),
        }
        fmt.Printf("  %s\n", subnet)
    }
    // 10.0.0.0/18
    // 10.0.64.0/18
    // 10.0.128.0/18
    // 10.0.192.0/18

    // ── Check if IP is private (RFC 1918) ────────────────────────────────────
    privateRanges := []*net.IPNet{}
    for _, cidr := range []string{"10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "127.0.0.0/8"} {
        _, network, _ := net.ParseCIDR(cidr)
        privateRanges = append(privateRanges, network)
    }

    isPrivate := func(ip net.IP) bool {
        for _, network := range privateRanges {
            if network.Contains(ip) {
                return true
            }
        }
        return false
    }

    fmt.Println(isPrivate(net.ParseIP("192.168.1.1"))) // true
    fmt.Println(isPrivate(net.ParseIP("8.8.8.8")))     // false
}`}</code></pre>

      {/* Section 9: AWS/Cloud Subnetting */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        AWS and Cloud Subnetting — VPC Design and Reserved Addresses
      </h2>
      <p>
        Cloud VPC networking follows the same CIDR principles but with platform-specific constraints. Understanding
        these is critical when designing production AWS, GCP, or Azure network architectures.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        AWS VPC Subnetting Rules
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# AWS VPC CIDR constraints:
# - VPC CIDR: /16 to /28 (16 to 65,536 addresses)
# - Subnet CIDR: /16 to /28
# - Subnet must be a subset of VPC CIDR
# - AWS ALWAYS reserves 5 IPs per subnet (not the standard 2)

# Example: VPC 10.0.0.0/16 → subnet 10.0.1.0/24
Reserved addresses in 10.0.1.0/24:
  10.0.1.0   → Network address (standard)
  10.0.1.1   → AWS VPC router (gateway)
  10.0.1.2   → AWS DNS server (always VPC_CIDR_BASE + 2)
  10.0.1.3   → AWS future use (reserved)
  10.0.1.255 → Broadcast address (standard)

Usable for EC2 instances: 10.0.1.4 – 10.0.1.254 = 251 addresses (not 254!)

# For /28 (minimum subnet size): 16 - 5 = 11 usable addresses
# For /24: 256 - 5 = 251 usable addresses

# ── Typical 3-tier AWS VPC architecture (10.0.0.0/16) ─────────────────────────
VPC: 10.0.0.0/16  (65,536 addresses)

# Public subnets (one per AZ) — for ALB, NAT Gateway, Bastion
10.0.1.0/24   (us-east-1a public)  → 251 usable
10.0.2.0/24   (us-east-1b public)  → 251 usable
10.0.3.0/24   (us-east-1c public)  → 251 usable

# Private subnets (one per AZ) — for EC2, ECS, RDS
10.0.11.0/24  (us-east-1a private) → 251 usable
10.0.12.0/24  (us-east-1b private) → 251 usable
10.0.13.0/24  (us-east-1c private) → 251 usable

# Database subnets (one per AZ) — for RDS Multi-AZ
10.0.21.0/24  (us-east-1a db)      → 251 usable
10.0.22.0/24  (us-east-1b db)      → 251 usable
10.0.23.0/24  (us-east-1c db)      → 251 usable

# Reserved for future expansion
10.0.100.0/22 (future use)         → 1,019 usable

# ── AWS CloudFormation CIDR helper function ────────────────────────────────────
# Fn::Cidr splits a CIDR block into smaller subnets
Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16

  PublicSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      # Fn::Cidr: [cidr, count, hostBits]
      # Split 10.0.0.0/16 into 256 subnets of /24 (8 host bits), take first
      CidrBlock: !Select [0, !Cidr [!GetAtt VPC.CidrBlock, 256, 8]]
      AvailabilityZone: !Select [0, !GetAZs '']

  PrivateSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: !Select [10, !Cidr [!GetAtt VPC.CidrBlock, 256, 8]]
      AvailabilityZone: !Select [0, !GetAZs '']

# ── Terraform AWS VPC subnetting ──────────────────────────────────────────────
# main.tf
variable "vpc_cidr" {
  default = "10.0.0.0/16"
}

variable "availability_zones" {
  default = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true
}

resource "aws_subnet" "public" {
  count             = length(var.availability_zones)
  vpc_id            = aws_vpc.main.id
  # cidrsubnet(prefix, newbits, netnum)
  # cidrsubnet("10.0.0.0/16", 8, count.index) → 10.0.0.0/24, 10.0.1.0/24, ...
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index)
  availability_zone = var.availability_zones[count.index]
  map_public_ip_on_launch = true
}

resource "aws_subnet" "private" {
  count             = length(var.availability_zones)
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index + 10)
  availability_zone = var.availability_zones[count.index]
}

# ── GCP and Azure equivalents ─────────────────────────────────────────────────
# GCP VPC: /8 to /29 subnets, only 4 reserved IPs (not 5 like AWS)
#   .0 = network, .1 = gateway, .2 = DNS, .255 = broadcast

# Azure VNet: /8 to /29, 5 reserved IPs like AWS:
#   .0 = network, .1 = gateway, .2-.3 = Azure DNS, .255 = broadcast`}</code></pre>

      {/* Section 10: Common Use Cases */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Common Use Cases — Firewalls, Docker, Kubernetes, and More
      </h2>
      <p>
        Subnetting knowledge applies across every layer of modern infrastructure. Here are the most practical
        scenarios you&apos;ll encounter as a developer or DevOps engineer:
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Firewall Rules — CIDR-Based Access Control
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# ── iptables (Linux) ─────────────────────────────────────────────────────────
# Allow SSH only from your office IP range (203.0.113.0/24)
iptables -A INPUT -p tcp --dport 22 -s 203.0.113.0/24 -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j DROP

# Allow all traffic from private networks, block public
iptables -A INPUT -s 10.0.0.0/8     -j ACCEPT
iptables -A INPUT -s 172.16.0.0/12  -j ACCEPT
iptables -A INPUT -s 192.168.0.0/16 -j ACCEPT
iptables -A INPUT -j DROP

# Allow HTTP/HTTPS from anywhere, restrict admin port to VPN
iptables -A INPUT -p tcp --dport 80  -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -p tcp --dport 8080 -s 10.8.0.0/24 -j ACCEPT  # VPN subnet
iptables -A INPUT -p tcp --dport 8080 -j DROP

# ── nginx — restrict admin endpoints by CIDR ─────────────────────────────────
server {
    listen 443 ssl;
    server_name app.example.com;

    location / {
        proxy_pass http://app:3000;
    }

    location /admin {
        # Only allow from office IP range and VPN
        allow 203.0.113.0/24;  # Office
        allow 10.8.0.0/16;     # VPN
        allow 127.0.0.1;       # Localhost
        deny all;
        proxy_pass http://app:3000;
    }
}

# ── AWS Security Group rules ──────────────────────────────────────────────────
# Terraform: allow MySQL only from app subnet
resource "aws_security_group_rule" "mysql_from_app" {
  type              = "ingress"
  from_port         = 3306
  to_port           = 3306
  protocol          = "tcp"
  cidr_blocks       = ["10.0.11.0/24", "10.0.12.0/24", "10.0.13.0/24"]
  security_group_id = aws_security_group.database.id
}

# ── UFW (Uncomplicated Firewall) ──────────────────────────────────────────────
ufw allow from 192.168.1.0/24 to any port 22   # SSH from LAN
ufw allow from 10.0.0.0/8 to any port 5432      # PostgreSQL from private
ufw deny 22   # Block SSH from everywhere else
ufw enable`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Docker Networking — Bridge, Overlay, and Custom Networks
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# ── Docker default networks ───────────────────────────────────────────────────
# bridge (docker0): 172.17.0.0/16  — default for single-host containers
# host: shares host network (no isolation)
# none: no networking

# Inspect the default bridge
docker network inspect bridge
# "Subnet": "172.17.0.0/16"
# "Gateway": "172.17.0.1"
# Each container gets an IP from 172.17.0.2 onwards

# ── Create a custom bridge network with specific CIDR ─────────────────────────
docker network create \
  --driver bridge \
  --subnet 172.20.0.0/16 \
  --ip-range 172.20.240.0/20 \
  --gateway 172.20.0.1 \
  myapp-network

# Assign a static IP to a container
docker run -d \
  --name mysql \
  --network myapp-network \
  --ip 172.20.240.10 \
  mysql:8.0

docker run -d \
  --name app \
  --network myapp-network \
  --ip 172.20.240.11 \
  myapp:latest

# ── docker-compose.yml: custom subnets ────────────────────────────────────────
version: '3.8'

services:
  app:
    image: myapp:latest
    networks:
      frontend:
        ipv4_address: 172.28.1.10
      backend:
        ipv4_address: 172.29.1.10

  db:
    image: postgres:15
    networks:
      backend:
        ipv4_address: 172.29.1.20

  nginx:
    image: nginx:alpine
    networks:
      frontend:
        ipv4_address: 172.28.1.5

networks:
  frontend:
    driver: bridge
    ipam:
      config:
        - subnet: 172.28.0.0/16
          ip_range: 172.28.1.0/24
          gateway: 172.28.0.1

  backend:
    driver: bridge
    ipam:
      config:
        - subnet: 172.29.0.0/16
          ip_range: 172.29.1.0/24
          gateway: 172.29.0.1

# ── Docker Swarm overlay networks ─────────────────────────────────────────────
# Default overlay for Swarm: 10.0.0.0/24 (ingress)
# Ingress network: 10.0.0.0/24 (load balancing)

docker network create \
  --driver overlay \
  --subnet 10.20.0.0/16 \
  --gateway 10.20.0.1 \
  swarm-overlay

# ── Check container IP addresses ──────────────────────────────────────────────
docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name

# List all Docker networks and their subnets
docker network ls --format '{{.Name}}' | while read net; do
  echo -n "$net: "
  docker network inspect "$net" --format '{{range .IPAM.Config}}{{.Subnet}}{{end}}'
done`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Kubernetes Pod CIDR and Service CIDR
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# ── Kubernetes CIDR ranges ───────────────────────────────────────────────────
# Pod CIDR:       10.244.0.0/16  (Flannel default)
# Service CIDR:   10.96.0.0/12   (ClusterIP services)
# Node gets /24:  10.244.0.0/24, 10.244.1.0/24, ...

# kubeadm init with custom CIDRs
kubeadm init \
  --pod-network-cidr=10.244.0.0/16 \
  --service-cidr=10.96.0.0/12 \
  --apiserver-advertise-address=192.168.1.10

# ── CNI plugin CIDR defaults ──────────────────────────────────────────────────
# Flannel:  10.244.0.0/16  (each node gets /24 = 254 pods max)
# Calico:   192.168.0.0/16 (configurable, supports BGP)
# Weave:    10.32.0.0/12
# Cilium:   10.0.0.0/8     (highly configurable)

# View pod CIDRs per node
kubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.spec.podCIDR}{"\n"}{end}'
# node-1    10.244.0.0/24
# node-2    10.244.1.0/24
# node-3    10.244.2.0/24

# ── Service types and IPs ─────────────────────────────────────────────────────
# ClusterIP: virtual IP from service CIDR (10.96.0.0/12)
#   - Only reachable within the cluster
#   - kube-proxy programs iptables/IPVS rules

# NodePort: exposes on all nodes at static port (30000-32767)
# LoadBalancer: cloud provider assigns external IP

# Get all services and their ClusterIPs
kubectl get svc --all-namespaces -o wide

# ── NetworkPolicy: restrict pod-to-pod traffic with CIDR ─────────────────────
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: restrict-db-access
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: postgres
  policyTypes:
    - Ingress
  ingress:
    # Only allow from app pods in the same namespace
    - from:
        - podSelector:
            matchLabels:
              app: backend
        - namespaceSelector:
            matchLabels:
              name: production
      ports:
        - port: 5432

    # Also allow from monitoring subnet
    - from:
        - ipBlock:
            cidr: 10.0.20.0/24    # monitoring subnet
            except:
              - 10.0.20.100/32    # exclude specific IP
      ports:
        - port: 9187  # postgres_exporter

# ── Kubernetes IPVS vs iptables ───────────────────────────────────────────────
# iptables mode: O(n) rules, degrades with many services
# IPVS mode: O(1) hash table, better for large clusters

# Enable IPVS in kube-proxy
# In kube-proxy configmap:
mode: "ipvs"
ipvs:
  scheduler: "rr"  # round-robin

# Check current mode
kubectl logs -n kube-system kube-proxy-xxx | grep "Using"
# I0101 Using ipvs Proxier.`}</code></pre>

      {/* Quick Tool CTA */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem 1.25rem', marginTop: '2rem', marginBottom: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e40af' }}>Try Our IP Subnet Calculator</p>
        <p style={{ margin: '0 0 0.75rem 0', color: '#334155' }}>
          Compute network address, broadcast, usable host range, subnet mask, wildcard mask, and more for any
          CIDR block — instantly, with no installation required.
        </p>
        <Link
          href="https://viadreams.cc/en/tools/ip-calculator"
          style={{
            display: 'inline-block',
            background: '#2563eb',
            color: '#ffffff',
            padding: '0.5rem 1.25rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          Open IP Subnet Calculator →
        </Link>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem 1.25rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>CIDR notation</strong>: <code>IP/prefix</code> where prefix = count of network bits. <code>/24</code> = 256 total, 254 usable hosts.</li>
          <li><strong>Host count formula</strong>: <code>2^(32 - prefix) - 2</code>. The <code>-2</code> removes network address and broadcast address.</li>
          <li><strong>Network address</strong>: all host bits = 0. <strong>Broadcast address</strong>: all host bits = 1. Neither can be assigned to a host.</li>
          <li><strong>Private ranges</strong> (RFC 1918): <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code>. Not routable on the public internet.</li>
          <li><strong>VLSM</strong>: allocate largest subnet first, work down. Avoids wasting addresses by assigning right-sized blocks to each segment.</li>
          <li><strong>AWS reserves 5 IPs</strong> per subnet (not 2): network, router, DNS, future, broadcast. A <code>/28</code> gives only 11 usable addresses.</li>
          <li><strong>Docker default</strong>: <code>172.17.0.0/16</code> for bridge. Use custom subnets in production to avoid conflicts with your VPC.</li>
          <li><strong>Kubernetes pod CIDR</strong>: <code>10.244.0.0/16</code> (Flannel). Each node gets a <code>/24</code> = max 254 pods per node.</li>
          <li><strong>IPv6 /64</strong>: required for SLAAC. One /64 contains 2^64 ≈ 18 quintillion addresses — always use /64 for LAN segments.</li>
          <li><strong>Python <code>ipaddress</code></strong> and <strong>Go <code>net</code></strong> handle all subnet math natively — no external dependencies needed.</li>
        </ul>
      </div>
    </article>
  );
}
