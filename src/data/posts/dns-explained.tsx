'use client';

import Link from 'next/link';

export default function DnsExplained({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Is DNS?</h2>
      <p>
        The <strong>Domain Name System (DNS)</strong> is the internet&apos;s phonebook. It translates human-readable domain names like <code>example.com</code> into machine-readable IP addresses like <code>93.184.216.34</code>. Without DNS, you would need to memorize numerical addresses for every website you visit. DNS is one of the most critical infrastructure components of the internet, handling billions of queries every day.
      </p>
      <p>
        This guide explains how DNS works from the ground up, covering the resolution process, record types, caching behavior, security extensions, and practical debugging techniques. Understanding DNS is essential for every developer -- it affects application performance, reliability, deployment, and security.
      </p>

      <h2>How DNS Resolution Works</h2>
      <p>
        When you type a URL into your browser, a multi-step resolution process occurs behind the scenes. This process involves several types of DNS servers working together to find the IP address for the requested domain.
      </p>
      <pre><code className="language-text">{`DNS Resolution Flow (simplified):

  You type: www.example.com
  ─────────────────────────────────────────────

  1. Browser Cache
     └── "Do I already know this IP?"
          → Yes: Use cached IP
          → No: Ask OS resolver

  2. Operating System Resolver
     └── Check /etc/hosts and local DNS cache
          → Found: Return IP
          → Not found: Query recursive resolver

  3. Recursive Resolver (e.g., 8.8.8.8)
     └── Check its cache
          → Found: Return IP
          → Not found: Start recursive query

  4. Root Nameserver (.)
     └── "I don't know example.com, but
          .com is handled by these TLD servers"
          → Returns TLD nameserver addresses

  5. TLD Nameserver (.com)
     └── "I don't know www.example.com, but
          example.com uses these authoritative nameservers"
          → Returns authoritative NS addresses

  6. Authoritative Nameserver (ns1.example.com)
     └── "www.example.com = 93.184.216.34"
          → Returns the actual IP address

  7. Response flows back through the chain
     └── Each server caches the result
          → Browser connects to 93.184.216.34`}</code></pre>

      <h3>DNS Server Types</h3>
      <pre><code className="language-text">{`Server Type           Role                              Examples
──────────────────────────────────────────────────────────────────
Recursive Resolver    Performs lookups on your behalf    8.8.8.8, 1.1.1.1
Root Nameserver       Directs to TLD servers            13 root server clusters (a-m)
TLD Nameserver        Manages top-level domains         Verisign (.com), PIR (.org)
Authoritative NS      Holds actual DNS records          ns1.example.com
Forwarding DNS        Forwards queries to another       Router, Pi-hole, corporate DNS

Popular Public Resolvers:
  Google:       8.8.8.8 / 8.8.4.4
  Cloudflare:   1.1.1.1 / 1.0.0.1
  Quad9:        9.9.9.9 / 149.112.112.112
  OpenDNS:      208.67.222.222 / 208.67.220.220`}</code></pre>

      <h2>DNS Record Types</h2>
      <p>
        DNS records are instructions stored on authoritative nameservers. Each record type serves a specific purpose. Understanding the common record types is essential for configuring domains, setting up email, and managing infrastructure.
      </p>
      <pre><code className="language-text">{`Record   Purpose                     Example Value
─────────────────────────────────────────────────────────────
A        IPv4 address                93.184.216.34
AAAA     IPv6 address                2606:2800:220:1:248:1893:25c8:1946
CNAME    Alias to another domain     www -> example.com
MX       Mail server                 10 mail.example.com
TXT      Text data (SPF, DKIM, etc)  "v=spf1 include:_spf.google.com ~all"
NS       Nameserver delegation       ns1.example.com
SOA      Zone authority info         ns1.example.com admin.example.com
SRV      Service location            _sip._tcp 10 60 5060 sip.example.com
CAA      Certificate authority       0 issue "letsencrypt.org"
PTR      Reverse DNS (IP -> name)    34.216.184.93 -> example.com`}</code></pre>

      <h3>A and AAAA Records</h3>
      <p>
        The A record maps a domain name to an IPv4 address, and the AAAA record maps to an IPv6 address. These are the most fundamental DNS records and are required for any domain that serves web content.
      </p>
      <pre><code className="language-bash">{`# Example DNS zone file entries
example.com.     IN  A     93.184.216.34
example.com.     IN  AAAA  2606:2800:220:1:248:1893:25c8:1946
www.example.com. IN  A     93.184.216.34

# Multiple A records for load balancing (round-robin)
api.example.com. IN  A     10.0.1.1
api.example.com. IN  A     10.0.1.2
api.example.com. IN  A     10.0.1.3`}</code></pre>

      <h3>CNAME Records</h3>
      <p>
        CNAME (Canonical Name) records create aliases from one domain to another. When a resolver encounters a CNAME, it restarts the lookup using the target domain. Important: CNAME records cannot coexist with other record types for the same name, and you cannot use a CNAME at the zone apex (e.g., <code>example.com</code>).
      </p>
      <pre><code className="language-bash">{`# CNAME examples
www.example.com.    IN  CNAME  example.com.
blog.example.com.   IN  CNAME  mysite.wordpress.com.
docs.example.com.   IN  CNAME  org.readthedocs.io.
shop.example.com.   IN  CNAME  shops.myshopify.com.

# Common mistake: CNAME at zone apex
# example.com.  IN  CNAME  other.com.     # INVALID!
# Use ALIAS/ANAME (provider-specific) or A record instead`}</code></pre>

      <h3>MX Records (Email)</h3>
      <pre><code className="language-bash">{`# MX records with priority (lower = preferred)
example.com.  IN  MX  10 mail1.example.com.
example.com.  IN  MX  20 mail2.example.com.    # Backup
example.com.  IN  MX  30 mail3.example.com.    # Second backup

# Google Workspace MX records
example.com.  IN  MX  1  ASPMX.L.GOOGLE.COM.
example.com.  IN  MX  5  ALT1.ASPMX.L.GOOGLE.COM.
example.com.  IN  MX  5  ALT2.ASPMX.L.GOOGLE.COM.
example.com.  IN  MX  10 ALT3.ASPMX.L.GOOGLE.COM.
example.com.  IN  MX  10 ALT4.ASPMX.L.GOOGLE.COM.`}</code></pre>

      <h3>TXT Records (SPF, DKIM, DMARC)</h3>
      <p>
        TXT records store arbitrary text data and are heavily used for email authentication and domain ownership verification.
      </p>
      <pre><code className="language-bash">{`# SPF - Specifies which servers can send email for your domain
example.com.  IN  TXT  "v=spf1 include:_spf.google.com ~all"

# DKIM - Email signing verification
google._domainkey.example.com.  IN  TXT  "v=DKIM1; k=rsa; p=MIGf..."

# DMARC - Email authentication policy
_dmarc.example.com.  IN  TXT  "v=DMARC1; p=reject; rua=mailto:dmarc@example.com"

# Domain verification
example.com.  IN  TXT  "google-site-verification=abc123..."
example.com.  IN  TXT  "v=verifydns verify=abcdef12345"`}</code></pre>

      <h2>TTL (Time to Live) and Caching</h2>
      <p>
        Every DNS record has a TTL value that specifies how long resolvers should cache the record before requesting a fresh copy. Understanding TTL is critical for DNS migrations and updates.
      </p>
      <pre><code className="language-text">{`TTL Strategy:

  High TTL (86400 = 24 hours):
    + Faster resolution for repeat visitors
    + Less load on authoritative nameservers
    - Slow propagation when you change records
    Best for: Stable records that rarely change

  Low TTL (300 = 5 minutes):
    + Fast propagation of changes
    + Quick failover in disaster scenarios
    - More DNS queries (slightly slower)
    - Higher load on nameservers
    Best for: Records that change frequently, pre-migration

  Migration Strategy:
    1. Days before migration: Lower TTL to 300 seconds
    2. Wait for old TTL to expire (24+ hours)
    3. Make the DNS change
    4. Wait for new records to propagate (~5-30 min)
    5. Verify everything works
    6. Raise TTL back to normal (3600-86400)

  Common TTL Values:
    60      = 1 minute  (aggressive, for failover)
    300     = 5 minutes (good for dynamic records)
    3600    = 1 hour    (standard default)
    86400   = 24 hours  (stable records)
    604800  = 1 week    (very stable, NS records)`}</code></pre>

      <h2>DNS Debugging Tools</h2>
      <p>
        Every developer should know how to diagnose DNS issues. These command-line tools help you trace resolution paths, check record configurations, and identify propagation problems.
      </p>
      <pre><code className="language-bash">{`# dig - The gold standard for DNS queries
dig example.com                    # Default A record query
dig example.com AAAA               # IPv6 address
dig example.com MX                 # Mail servers
dig example.com TXT                # TXT records
dig example.com ANY                # All records
dig @8.8.8.8 example.com          # Query specific resolver
dig +short example.com             # Brief output
dig +trace example.com             # Full resolution path

# nslookup - Simple DNS lookup
nslookup example.com
nslookup -type=MX example.com
nslookup example.com 8.8.8.8

# host - Simplified DNS lookup
host example.com
host -t MX example.com

# Check DNS propagation from multiple locations
# Use online tools: dnschecker.org, whatsmydns.net

# Reverse DNS lookup
dig -x 93.184.216.34
host 93.184.216.34

# Check DNSSEC
dig example.com +dnssec
dig example.com DNSKEY`}</code></pre>

      <h3>Reading dig Output</h3>
      <pre><code className="language-text">{`$ dig example.com

;; QUESTION SECTION:
;example.com.                   IN      A       ← What we asked

;; ANSWER SECTION:
example.com.            3600    IN      A       93.184.216.34
                        ↑ TTL   ↑ Class ↑ Type  ↑ Value

;; AUTHORITY SECTION:
example.com.            86400   IN      NS      a.iana-servers.net.
                                                ← Authoritative nameserver

;; Query time: 23 msec                          ← Response time
;; SERVER: 192.168.1.1#53(192.168.1.1)         ← Resolver used
;; WHEN: Sat Feb 22 10:30:00 UTC 2026
;; MSG SIZE  rcvd: 56                           ← Response size`}</code></pre>

      <h2>DNS for Modern Applications</h2>
      <pre><code className="language-text">{`Modern DNS Patterns:

  CDN Integration:
    CNAME www.example.com -> d1234.cloudfront.net
    CNAME www.example.com -> example.com.cdn.cloudflare.net

  Vercel/Netlify Deployment:
    A     example.com     -> 76.76.21.21
    CNAME www.example.com -> cname.vercel-dns.com

  Multi-Region with GeoDNS:
    US users  -> us-east.example.com  (10.0.1.1)
    EU users  -> eu-west.example.com  (10.0.2.1)
    Asia users -> ap-east.example.com (10.0.3.1)

  Service Discovery (SRV records):
    _http._tcp.example.com  IN SRV 10 60 80 web1.example.com.
    _http._tcp.example.com  IN SRV 20 60 80 web2.example.com.

  Wildcard Records:
    *.example.com  IN  A  93.184.216.34
    (Matches any subdomain not explicitly defined)`}</code></pre>

      <h2>DNS Security (DNSSEC)</h2>
      <p>
        DNSSEC adds cryptographic signatures to DNS records to prevent tampering and cache poisoning attacks. It creates a chain of trust from the root zone down to individual records.
      </p>
      <pre><code className="language-text">{`DNSSEC Chain of Trust:

  Root Zone (.)
    └── Signs .com zone key
         └── Signs example.com zone key
              └── Signs individual records

  Record Types for DNSSEC:
    RRSIG   - Cryptographic signature for a record set
    DNSKEY  - Public key for the zone
    DS      - Delegation Signer (links parent to child zone)
    NSEC    - Proves non-existence of a record

  Common DNS Security Threats:
    DNS Spoofing/Cache Poisoning - Injecting false records
    DNS Hijacking - Redirecting queries to malicious servers
    DNS Amplification - Using DNS for DDoS attacks
    DNS Tunneling - Exfiltrating data through DNS queries

  Protection Measures:
    - Enable DNSSEC on your domain
    - Use DoH (DNS over HTTPS) or DoT (DNS over TLS)
    - Monitor for unauthorized DNS changes
    - Use CAA records to restrict certificate issuance`}</code></pre>

      <h2>Common DNS Problems and Solutions</h2>
      <pre><code className="language-text">{`Problem                          Solution
─────────────────────────────────────────────────────────────
DNS not propagating              Lower TTL before changes, wait
CNAME at zone apex               Use ALIAS/ANAME or A record
Email not working                Check MX, SPF, DKIM, DMARC records
SSL certificate fails            Verify CAA records allow your CA
"Server not found"               Check NS delegation, A records exist
Intermittent resolution           Multiple A records, one server down
Slow DNS resolution              Use faster resolver (1.1.1.1, 8.8.8.8)
NXDOMAIN for valid domain        Check NS records, zone delegation
Wrong IP returned                Check TTL, flush local DNS cache
Subdomain not working            Verify record exists, no conflicting CNAME`}</code></pre>

      <h3>Flush DNS Cache</h3>
      <pre><code className="language-bash">{`# macOS
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Windows
ipconfig /flushdns

# Linux (systemd-resolved)
sudo systemd-resolve --flush-caches

# Chrome browser
# Navigate to: chrome://net-internals/#dns -> Clear host cache`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>How long does DNS propagation take?</h3>
      <p>
        DNS propagation typically takes between 5 minutes and 48 hours, depending on the TTL of the old records. If the previous TTL was 86400 (24 hours), some resolvers may cache the old record for up to 24 hours. To speed up propagation, lower the TTL well before making changes. In practice, most users see updates within 1-4 hours.
      </p>

      <h3>What happens if my DNS server goes down?</h3>
      <p>
        If your authoritative nameserver goes down, existing cached records continue to work until their TTL expires. After that, domains hosted on that server become unreachable. This is why you should always have at least two authoritative nameservers in different networks and use a reputable DNS hosting provider with built-in redundancy.
      </p>

      <h3>Can I use a CNAME for my root domain?</h3>
      <p>
        The DNS specification does not allow CNAME records at the zone apex (root domain like <code>example.com</code>). However, many DNS providers offer proprietary solutions: Cloudflare uses CNAME flattening, AWS Route53 uses ALIAS records, and other providers have similar features. These resolve the CNAME at the DNS server level and return A records to clients, working around the technical limitation.
      </p>

      <h3>What is the difference between DNS over HTTPS and DNS over TLS?</h3>
      <p>
        Both encrypt DNS queries to prevent eavesdropping, but they use different transport protocols. DNS over HTTPS (DoH) wraps queries in HTTPS traffic on port 443, making it indistinguishable from normal web traffic. DNS over TLS (DoT) uses a dedicated port (853), making it easier to manage at the network level but also easier to block. Both provide equivalent privacy protection.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/ip-calculator`}>IP Calculator</Link> - Calculate subnets, CIDR ranges, and IP addresses</li>
        <li><Link href={`/${lang}/blog/dns-record-types-a-cname-mx-txt`}>DNS Record Types: A, CNAME, MX, TXT</Link> - Detailed record type reference</li>
        <li><Link href={`/${lang}/blog/ip-subnet-mask-cidr-explained`}>IP Subnet and CIDR Explained</Link> - Understanding IP addressing</li>
        <li><Link href={`/${lang}/blog/nginx-configuration-guide`}>Nginx Configuration Guide</Link> - Configure your web server for your domain</li>
      </ul>
    </>
  );
}
