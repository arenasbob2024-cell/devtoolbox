'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'SSH Key Generator: Generate and Manage SSH Keys — Complete Guide',
    description: 'Complete guide to SSH key generation and management. Covers RSA/Ed25519/ECDSA key types, ssh-keygen, SSH config file, copying public keys, Node.js/Python automation, Git SSH setup, tunneling, certificate-based auth, and security best practices.',
  },
  zh: {
    title: 'SSH密钥生成器：生成和管理SSH密钥完整指南',
    description: '完整的SSH密钥生成和管理指南。涵盖RSA/Ed25519/ECDSA密钥类型、ssh-keygen、SSH配置文件、复制公钥、Node.js/Python自动化、Git SSH设置、隧道、基于证书的认证和安全最佳实践。',
  },
};

export default function SshKeyGeneratorOnlineGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best SSH key type to use in 2024?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ed25519 is the recommended SSH key type for most use cases. It offers the best combination of security and performance: 256-bit security (equivalent to RSA-3072 or better), extremely fast signing and verification, small key and signature sizes (68-byte public key vs 604 bytes for RSA-4096), and resistance to various side-channel attacks. Use RSA-4096 only when connecting to legacy systems that do not support Ed25519 (older OpenSSH versions, some embedded devices). ECDSA with P-256 is a good middle ground but is less preferred than Ed25519 due to potential NIST curve concerns.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I generate an SSH key pair?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Run: ssh-keygen -t ed25519 -C "your_email@example.com" in your terminal. This creates ~/.ssh/id_ed25519 (private key) and ~/.ssh/id_ed25519.pub (public key). For RSA: ssh-keygen -t rsa -b 4096 -C "your_email@example.com". Always set a passphrase for private keys stored on disk — it encrypts the key with AES-256, so if someone steals the file they cannot use it without the passphrase. Use ssh-add to load the decrypted key into ssh-agent so you only need to enter the passphrase once per session.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a public key and a private key?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In SSH asymmetric cryptography: the private key (~/.ssh/id_ed25519) is your secret identity — never share it, never copy it to servers, and always protect it with a passphrase. The public key (~/.ssh/id_ed25519.pub) is safe to share freely — you copy it to servers in ~/.ssh/authorized_keys. When you connect, the server encrypts a challenge with your public key; only your private key can decrypt it, proving your identity without transmitting the private key over the network.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I add my SSH key to GitHub?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Copy your public key with: cat ~/.ssh/id_ed25519.pub | pbcopy (macOS) or xclip -sel clip < ~/.ssh/id_ed25519.pub (Linux). Then go to GitHub Settings → SSH and GPG keys → New SSH key, paste the key, and save. Test the connection with: ssh -T git@github.com. You should see: "Hi username! You\'ve successfully authenticated." Then configure Git to use SSH instead of HTTPS: git remote set-url origin git@github.com:username/repo.git',
        },
      },
      {
        '@type': 'Question',
        name: 'What does the SSH config file do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The ~/.ssh/config file lets you define connection profiles (Host blocks) with settings like hostname, username, port, and key file. Instead of typing: ssh -i ~/.ssh/mykey -p 2222 -l admin server.example.com, you define a Host entry and just type: ssh myserver. It supports wildcard patterns (Host *.example.com), ProxyJump for bastion host connections, IdentityFile for per-host keys, ServerAliveInterval to prevent timeouts, and ControlMaster for connection multiplexing.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does SSH tunneling work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SSH tunneling forwards TCP traffic through an encrypted SSH connection. Local forwarding (-L local_port:destination:dest_port) forwards a port on your local machine through the SSH server to a remote destination — useful for accessing internal databases. Remote forwarding (-R remote_port:local:local_port) exposes a local service on the remote server — useful for making localhost services accessible. Dynamic forwarding (-D port) creates a SOCKS5 proxy on your local machine, routing all traffic through the SSH server — useful as a secure proxy. Use -N (no command) and -f (background) for tunnel-only connections.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is certificate-based SSH authentication?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Certificate-based SSH uses a Certificate Authority (CA) to sign user and host keys, rather than distributing individual public keys to each server. Instead of copying your public key to every server\'s authorized_keys, you get your key signed by the CA: ssh-keygen -s ca_key -I user@host -n username -V +52w id_ed25519.pub. Servers trust certificates signed by the CA by setting TrustedUserCAKeys in sshd_config. Benefits: centralized key management, automatic expiry (no orphaned keys), and no per-server authorized_keys management. Ideal for organizations with many servers.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I disable password authentication in SSH for better security?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Edit /etc/ssh/sshd_config and set: PasswordAuthentication no, ChallengeResponseAuthentication no, UsePAM no. Ensure you have at least one working SSH key loaded in authorized_keys BEFORE restarting sshd, or you will lock yourself out. Restart: systemctl restart sshd. Also configure fail2ban to block brute-force attempts, set AllowUsers or AllowGroups to restrict which accounts can log in via SSH, change the default port (Port 2222) to reduce automated scanning, and set LoginGraceTime 30 to reduce the time window for authentication.',
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

      <link rel="canonical" href="https://viadreams.cc/en/blog/ssh-key-generator-online-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          Use <strong>Ed25519</strong> for new SSH keys: <code>ssh-keygen -t ed25519 -C &quot;you@email.com&quot;</code>.
          Always set a <strong>passphrase</strong>, use <strong>ssh-agent</strong> for convenience, and
          copy the public key with <strong>ssh-copy-id</strong>. Store SSH config in{' '}
          <code>~/.ssh/config</code> for multi-server management. Disable password auth in{' '}
          <code>sshd_config</code> once keys are working. Use our{' '}
          <Link href={`/${lang}/tools/ssh-keygen`} style={{ color: '#0284c7' }}>online SSH key generator</Link>{' '}
          or visit <a href="https://viadreams.cc/en/tools/ssh-keygen" style={{ color: '#0284c7' }}>viadreams.cc/en/tools/ssh-keygen</a> to generate keys instantly in your browser.
        </p>
      </div>

      {/* Section 1: SSH Key Types */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        SSH Key Types — RSA vs Ed25519 vs ECDSA Comparison
      </h2>
      <p>
        SSH supports several public-key algorithms. Choosing the right one matters for security, performance,
        and compatibility. Here is a comprehensive comparison of the three main types:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Property</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>RSA-2048</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>RSA-4096</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>ECDSA P-256</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Ed25519</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Security bits</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>112</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>140</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>128</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a', fontWeight: 600 }}>128 (stronger curves)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Public key size</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>381 bytes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>604 bytes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>136 bytes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a', fontWeight: 600 }}>68 bytes</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Sign speed</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Moderate</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Slow</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Fast</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a', fontWeight: 600 }}>Fastest</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Side-channel resistance</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Vulnerable</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Vulnerable</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#f59e0b' }}>Moderate</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a', fontWeight: 600 }}>Excellent</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>OpenSSH support since</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>v1.0 (1999)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>v1.0 (1999)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>v5.7 (2011)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>v6.5 (2014)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Recommendation</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#f59e0b' }}>Legacy only</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#f59e0b' }}>Legacy fallback</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#f59e0b' }}>Acceptable</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a', fontWeight: 600 }}>Preferred</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Ed25519</strong> uses the Curve25519 elliptic curve designed by Daniel Bernstein specifically
        to avoid the weaknesses of NIST curves (which ECDSA uses). It is deterministic — the same message and
        key always produce the same signature — which eliminates the risk of nonce reuse vulnerabilities that
        have broken ECDSA implementations (the PlayStation 3 hack was a nonce reuse attack).
      </p>
      <p>
        Use <strong>RSA-4096</strong> only when you must connect to systems running OpenSSH older than 6.5
        (released in 2014), some embedded devices (routers, IoT), or environments with strict FIPS-140-2
        compliance requirements that mandate RSA or ECDSA.
      </p>

      {/* Section 2: Generating SSH Keys */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Generating SSH Keys with ssh-keygen — All Options Explained
      </h2>
      <p>
        The <code>ssh-keygen</code> command is the standard tool for generating, managing, and converting
        SSH authentication keys. It is included with OpenSSH on macOS, Linux, and Windows 10+.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Generate an Ed25519 Key (Recommended)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Generate Ed25519 key (recommended for new keys)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Prompts:
# Enter file in which to save the key (/home/user/.ssh/id_ed25519): [Enter or custom path]
# Enter passphrase (empty for no passphrase): [use a strong passphrase!]
# Enter same passphrase again: [confirm]

# Result:
# Your identification has been saved in /home/user/.ssh/id_ed25519
# Your public key has been saved in /home/user/.ssh/id_ed25519.pub
# The key fingerprint is:
#   SHA256:abc123.../your_email@example.com
# The key's randomart image is:
# +--[ED25519 256]--+
# |        .  o..   |
# ...

# View your public key (safe to share / copy to servers)
cat ~/.ssh/id_ed25519.pub
# ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... your_email@example.com`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Generate an RSA-4096 Key (Legacy Systems)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# RSA-4096 for legacy compatibility
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Custom filename — useful for multiple keys
ssh-keygen -t ed25519 -C "work@company.com" -f ~/.ssh/id_ed25519_work
ssh-keygen -t ed25519 -C "personal@gmail.com" -f ~/.ssh/id_ed25519_personal

# Key with no passphrase (for automation/scripts only — less secure)
ssh-keygen -t ed25519 -C "deploy-bot@ci.example.com" -f ~/.ssh/id_ed25519_deploy -N ""

# Change passphrase on existing key
ssh-keygen -p -f ~/.ssh/id_ed25519

# Show fingerprint of existing key
ssh-keygen -l -f ~/.ssh/id_ed25519.pub
# 256 SHA256:abc123... your_email@example.com (ED25519)

# Show fingerprint in MD5 format (for GitHub key matching)
ssh-keygen -l -E md5 -f ~/.ssh/id_ed25519.pub
# 256 MD5:xx:xx:xx:xx:... your_email@example.com (ED25519)

# Convert OpenSSH private key to PEM format (for legacy tools)
ssh-keygen -p -m PEM -f ~/.ssh/id_rsa`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Using ssh-agent to Manage Passphrases
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Start ssh-agent (if not already running)
eval "$(ssh-agent -s)"
# Agent pid 12345

# Add your key to the agent (enter passphrase once)
ssh-add ~/.ssh/id_ed25519

# Add with timeout (key removed from agent after 4 hours)
ssh-add -t 14400 ~/.ssh/id_ed25519

# List loaded keys
ssh-add -l
# 256 SHA256:abc123... your_email@example.com (ED25519)

# Remove a specific key from agent
ssh-add -d ~/.ssh/id_ed25519

# Remove ALL keys from agent
ssh-add -D

# macOS: add to Keychain so key persists across reboots
ssh-add --apple-use-keychain ~/.ssh/id_ed25519`}</code></pre>

      {/* Section 3: SSH Config File */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        SSH Config File — ~/.ssh/config Host Blocks and Advanced Options
      </h2>
      <p>
        The <code>~/.ssh/config</code> file is the most powerful tool for managing SSH connections to multiple
        servers. Instead of memorizing long <code>ssh</code> commands with flags, you define named profiles
        and connect with a short alias.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# ~/.ssh/config

# ============================================================
# GLOBAL DEFAULTS (apply to all hosts unless overridden)
# ============================================================
Host *
  ServerAliveInterval 60        # Send keepalive every 60 seconds
  ServerAliveCountMax 3         # Disconnect after 3 failed keepalives
  AddKeysToAgent yes            # Automatically add keys to ssh-agent
  IdentitiesOnly yes            # Only use specified identity files
  HashKnownHosts yes            # Hash hostnames in known_hosts for privacy

# ============================================================
# PRODUCTION SERVER
# ============================================================
Host prod
  HostName 203.0.113.10
  User ubuntu
  Port 22
  IdentityFile ~/.ssh/id_ed25519_work
  ForwardAgent no               # Never forward agent to prod (security risk)

# ============================================================
# STAGING SERVER (custom port)
# ============================================================
Host staging
  HostName staging.example.com
  User deploy
  Port 2222
  IdentityFile ~/.ssh/id_ed25519_work

# ============================================================
# BASTION / JUMP HOST
# ============================================================
Host bastion
  HostName bastion.example.com
  User admin
  IdentityFile ~/.ssh/id_ed25519_work
  ForwardAgent yes              # Allow agent forwarding for jump

# Connect to internal server THROUGH bastion (ProxyJump)
Host internal-db
  HostName 10.0.0.50
  User dbadmin
  IdentityFile ~/.ssh/id_ed25519_work
  ProxyJump bastion             # Tunnel through bastion first

# ============================================================
# MULTIPLE GITHUB ACCOUNTS
# ============================================================
Host github-personal
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal

Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_work

# ============================================================
# WILDCARD FOR ALL EXAMPLE.COM SUBDOMAINS
# ============================================================
Host *.example.com
  User ubuntu
  IdentityFile ~/.ssh/id_ed25519_work
  StrictHostKeyChecking accept-new  # Auto-accept new host keys once

# Usage examples:
# ssh prod                          # connects to 203.0.113.10 as ubuntu
# ssh staging                       # connects to staging.example.com:2222
# ssh internal-db                   # tunnels through bastion automatically
# git clone git@github-personal:user/repo.git  # uses personal key`}</code></pre>
      <p>
        Set correct permissions on the config file — SSH will refuse to use it if permissions are too open:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`chmod 700 ~/.ssh
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/id_ed25519        # private key: owner read/write only
chmod 644 ~/.ssh/id_ed25519.pub   # public key: readable by all`}</code></pre>

      {/* Section 4: Copy Public Key */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Copy Public Key to Server — ssh-copy-id and Manual Methods
      </h2>
      <p>
        To authenticate with SSH keys, your public key must be added to <code>~/.ssh/authorized_keys</code> on
        the remote server. There are several methods to do this.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Method 1: ssh-copy-id (Easiest)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Copy default key to server (using password auth for the last time)
ssh-copy-id user@server.example.com

# Copy specific key
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server.example.com

# Copy to non-standard port
ssh-copy-id -i ~/.ssh/id_ed25519.pub -p 2222 user@server.example.com

# What ssh-copy-id does internally:
# 1. Reads the public key from the .pub file
# 2. SSH into the server using password auth
# 3. Creates ~/.ssh/authorized_keys if it does not exist
# 4. Appends the public key if not already present
# 5. Sets correct permissions automatically`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Method 2: Manual (When ssh-copy-id Is Not Available)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Option A: Pipe through ssh
cat ~/.ssh/id_ed25519.pub | ssh user@server.example.com \
  "mkdir -p ~/.ssh && chmod 700 ~/.ssh && \
   cat >> ~/.ssh/authorized_keys && \
   chmod 600 ~/.ssh/authorized_keys"

# Option B: Manual steps on the server
# 1. Copy the public key content (from your local machine)
cat ~/.ssh/id_ed25519.pub
# Copy the output line

# 2. On the remote server:
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... you@email.com" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# 3. Verify correct permissions (critical — SSH won't work with wrong perms)
ls -la ~/.ssh/
# drwx------  2 user user 4096 Jan 1 12:00 .         (700)
# -rw-------  1 user user  571 Jan 1 12:00 authorized_keys  (600)
# -rw-------  1 user user  387 Jan 1 12:00 id_ed25519       (600)
# -rw-r--r--  1 user user   96 Jan 1 12:00 id_ed25519.pub   (644)

# 4. Test connection (should NOT ask for password)
ssh user@server.example.com
# If it asks for password, check:
#   - Permissions on ~/.ssh and authorized_keys
#   - PubkeyAuthentication yes in /etc/ssh/sshd_config
#   - AuthorizedKeysFile .ssh/authorized_keys in sshd_config`}</code></pre>

      {/* Section 5: Node.js node-forge */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Generate SSH Keys Programmatically with Node.js (node-forge / ssh2)
      </h2>
      <p>
        For server-side key generation, automation scripts, or web applications that need to generate SSH keys
        programmatically, Node.js offers two main libraries: <strong>node-forge</strong> for RSA/PEM operations
        and <strong>ssh2</strong> for SSH-specific functionality.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        node-forge: Generate RSA Key Pair and Export PEM
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`npm install node-forge`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`// generate-ssh-key.js
const forge = require('node-forge');

async function generateRSAKeyPair(bits = 4096, comment = 'user@host') {
  return new Promise((resolve, reject) => {
    console.log(\`Generating RSA-\${bits} key pair...\`);

    forge.pki.rsa.generateKeyPair({ bits, workers: -1 }, (err, keypair) => {
      if (err) return reject(err);

      // Export private key as PKCS#1 PEM
      const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);

      // Export private key as PKCS#8 PEM (preferred modern format)
      const privateKeyPkcs8 = forge.pki.privateKeyInfoToPem(
        forge.pki.wrapRsaPrivateKey(
          forge.pki.privateKeyToAsn1(keypair.privateKey)
        )
      );

      // Export public key as PEM (PKCS#8 SubjectPublicKeyInfo)
      const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);

      // Export as OpenSSH authorized_keys format
      const sshPublicKey = forge.ssh.publicKeyToOpenSSH(keypair.publicKey, comment);

      // Export private key as OpenSSH format
      const sshPrivateKey = forge.ssh.privateKeyToOpenSSH(keypair.privateKey);

      resolve({
        privateKeyPem,
        privateKeyPkcs8,
        publicKeyPem,
        sshPublicKey,   // goes in ~/.ssh/authorized_keys
        sshPrivateKey,  // goes in ~/.ssh/id_rsa
      });
    });
  });
}

// Encrypt private key with passphrase
function encryptPrivateKey(privateKeyPem, passphrase) {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  return forge.pki.encryptRsaPrivateKey(privateKey, passphrase, {
    algorithm: 'aes256',
  });
}

// Usage
(async () => {
  const keys = await generateRSAKeyPair(4096, 'deploy@example.com');

  console.log('=== OpenSSH Public Key (for authorized_keys) ===');
  console.log(keys.sshPublicKey);

  console.log('\\n=== OpenSSH Private Key (for ~/.ssh/id_rsa) ===');
  console.log(keys.sshPrivateKey);

  // Save to files
  const fs = require('fs');
  fs.writeFileSync('./id_rsa', keys.sshPrivateKey, { mode: 0o600 });
  fs.writeFileSync('./id_rsa.pub', keys.sshPublicKey, { mode: 0o644 });
  console.log('\\nKeys saved to ./id_rsa and ./id_rsa.pub');
})();`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Using Node.js Built-in crypto Module (No Dependencies)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`// Node.js 15+ has built-in key generation via crypto module
const { generateKeyPair } = require('crypto');
const { promisify } = require('util');
const fs = require('fs');

const generateKeyPairAsync = promisify(generateKeyPair);

async function generateRSAKeys() {
  const { publicKey, privateKey } = await generateKeyPairAsync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',   // Encrypt with passphrase
      passphrase: 'my-passphrase',
    },
  });

  fs.writeFileSync('private_key.pem', privateKey, { mode: 0o600 });
  fs.writeFileSync('public_key.pem', publicKey, { mode: 0o644 });

  console.log('RSA key pair generated successfully');
  return { publicKey, privateKey };
}

// Ed25519 generation (Node.js 12+)
async function generateEd25519Keys() {
  const { publicKey, privateKey } = await generateKeyPairAsync('ed25519', {
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });
  return { publicKey, privateKey };
}

generateRSAKeys().then(() => console.log('Done'));`}</code></pre>

      {/* Section 6: Python paramiko */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        SSH in Python with Paramiko — Connect, Execute Commands, SFTP
      </h2>
      <p>
        <strong>Paramiko</strong> is the most widely used Python SSH library. It implements the SSHv2 protocol
        directly in Python and supports key-based authentication, command execution, and SFTP file transfer.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`pip install paramiko`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import paramiko
import os

# ============================================================
# 1. CONNECT WITH EXISTING KEY FILE
# ============================================================
def ssh_connect_with_key(hostname, username, key_path, passphrase=None):
    client = paramiko.SSHClient()

    # Automatically add server's host key (use RejectPolicy in production)
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    # Load private key
    private_key = paramiko.Ed25519Key.from_private_key_file(
        key_path,
        password=passphrase  # Pass passphrase if key is encrypted
    )
    # For RSA: paramiko.RSAKey.from_private_key_file(key_path, password=passphrase)

    client.connect(
        hostname=hostname,
        username=username,
        pkey=private_key,
        timeout=10,
        banner_timeout=30,
    )
    return client

# ============================================================
# 2. EXECUTE REMOTE COMMANDS
# ============================================================
def run_remote_command(client, command, timeout=30):
    stdin, stdout, stderr = client.exec_command(command, timeout=timeout)

    exit_code = stdout.channel.recv_exit_status()  # Wait for completion
    output = stdout.read().decode('utf-8').strip()
    error = stderr.read().decode('utf-8').strip()

    return exit_code, output, error

# ============================================================
# 3. SFTP FILE TRANSFER
# ============================================================
def sftp_upload(client, local_path, remote_path):
    sftp = client.open_sftp()
    try:
        sftp.put(local_path, remote_path)
        print(f"Uploaded {local_path} → {remote_path}")
    finally:
        sftp.close()

def sftp_download(client, remote_path, local_path):
    sftp = client.open_sftp()
    try:
        sftp.get(remote_path, local_path)
        print(f"Downloaded {remote_path} → {local_path}")
    finally:
        sftp.close()

# ============================================================
# 4. GENERATE RSA KEY PAIR PROGRAMMATICALLY
# ============================================================
def generate_rsa_key(bits=4096, passphrase=None):
    from io import StringIO

    key = paramiko.RSAKey.generate(bits=bits)

    # Export private key to string
    private_key_str = StringIO()
    key.write_private_key(private_key_str, password=passphrase)

    # Get public key in authorized_keys format
    public_key_str = f"ssh-rsa {key.get_base64()} generated-by-paramiko"

    return private_key_str.getvalue(), public_key_str

# ============================================================
# USAGE EXAMPLE
# ============================================================
if __name__ == "__main__":
    # Connect to server
    client = ssh_connect_with_key(
        hostname="server.example.com",
        username="ubuntu",
        key_path=os.path.expanduser("~/.ssh/id_ed25519"),
        passphrase=None  # or "your-passphrase"
    )

    try:
        # Run command
        exit_code, output, error = run_remote_command(client, "df -h /")
        print(f"Exit code: {exit_code}")
        print(f"Output:\\n{output}")

        # Upload a file
        sftp_upload(client, "/local/config.json", "/remote/config.json")

        # Download a file
        sftp_download(client, "/remote/log.txt", "/local/log.txt")

    finally:
        client.close()`}</code></pre>

      {/* Section 7: Git SSH Setup */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Git SSH Setup — GitHub, GitLab, and Bitbucket
      </h2>
      <p>
        SSH is the recommended authentication method for Git operations. Unlike HTTPS (which requires tokens
        or passwords), SSH keys authenticate without prompting every time you push or pull.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# ============================================================
# STEP 1: Generate key if you don't have one
# ============================================================
ssh-keygen -t ed25519 -C "your_email@example.com"

# ============================================================
# STEP 2: Start agent and add key
# ============================================================
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# macOS: persist across reboots via Keychain
# Add to ~/.ssh/config:
# Host github.com
#   AddKeysToAgent yes
#   UseKeychain yes          # macOS only
#   IdentityFile ~/.ssh/id_ed25519

# ============================================================
# STEP 3: Copy public key to clipboard
# ============================================================
# macOS
cat ~/.ssh/id_ed25519.pub | pbcopy

# Linux (xclip)
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard

# Linux (xsel)
cat ~/.ssh/id_ed25519.pub | xsel --clipboard --input

# Windows (PowerShell)
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard

# ============================================================
# STEP 4: Add key to Git hosting service
# ============================================================
# GitHub: Settings → SSH and GPG keys → New SSH key
# GitLab: User Settings → SSH Keys
# Bitbucket: Personal settings → SSH keys

# ============================================================
# STEP 5: Test connection
# ============================================================
ssh -T git@github.com
# Hi username! You've successfully authenticated, but GitHub
# does not provide shell access.

ssh -T git@gitlab.com
# Welcome to GitLab, @username!

ssh -T git@bitbucket.org
# logged in as username.

# ============================================================
# STEP 6: Use SSH URLs for repos
# ============================================================
# Clone with SSH
git clone git@github.com:username/repo.git

# Switch existing repo from HTTPS to SSH
git remote -v
# origin  https://github.com/username/repo.git (fetch)
git remote set-url origin git@github.com:username/repo.git
git remote -v
# origin  git@github.com:username/repo.git (fetch)

# ============================================================
# MULTIPLE GITHUB ACCOUNTS (work + personal)
# ============================================================
# ~/.ssh/config
# Host github-work
#   HostName github.com
#   User git
#   IdentityFile ~/.ssh/id_ed25519_work
#
# Host github-personal
#   HostName github.com
#   User git
#   IdentityFile ~/.ssh/id_ed25519_personal

# Clone using the alias
git clone git@github-work:company/project.git
git clone git@github-personal:myusername/side-project.git`}</code></pre>

      {/* Section 8: SSH Tunneling */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        SSH Tunneling — Local, Remote, and Dynamic Port Forwarding
      </h2>
      <p>
        SSH tunnels encrypt TCP traffic through an SSH connection. They are used to securely access internal
        services, bypass firewalls, and create secure proxies.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Type</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Flag</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Direction</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Local</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>-L</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Local → Remote</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Access internal DB, admin panel</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Remote</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>-R</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Remote → Local</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Expose localhost to internet</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Dynamic</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>-D</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>SOCKS5 proxy</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Browse web through SSH server</td>
            </tr>
          </tbody>
        </table>
      </div>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# ============================================================
# LOCAL PORT FORWARDING: -L [local_addr:]local_port:dest_host:dest_port
# ============================================================

# Access a remote PostgreSQL database locally
# Traffic: localhost:5433 → SSH server → internal-db:5432
ssh -L 5433:internal-db.private:5432 user@bastion.example.com
# Then connect: psql -h localhost -p 5433 -U dbuser mydb

# Access a web app behind a firewall
ssh -L 8080:internal-app.private:80 user@bastion.example.com
# Then open: http://localhost:8080

# Multiple tunnels in one command
ssh -L 5433:db.private:5432 -L 8080:app.private:80 user@bastion.example.com

# ============================================================
# REMOTE PORT FORWARDING: -R [remote_addr:]remote_port:dest_host:dest_port
# ============================================================

# Expose local development server to the internet via VPS
# Traffic: vps-public:3000 → SSH connection → localhost:3000
ssh -R 3000:localhost:3000 user@vps.example.com
# Now anyone can access http://vps.example.com:3000 to see your local app

# Make accessible on all remote interfaces (requires GatewayPorts yes in sshd_config)
ssh -R 0.0.0.0:3000:localhost:3000 user@vps.example.com

# ============================================================
# DYNAMIC PORT FORWARDING (SOCKS5 PROXY): -D
# ============================================================

# Create SOCKS5 proxy on local port 1080 through SSH server
ssh -D 1080 user@ssh-server.example.com
# Configure browser proxy: SOCKS5 localhost:1080
# All browser traffic now routes through ssh-server.example.com

# ============================================================
# BACKGROUND / PERSISTENT TUNNELS
# ============================================================

# -N: do not execute remote command (tunnel only)
# -f: fork to background before command execution
# -C: enable compression (useful for slow connections)

# Start tunnel in background
ssh -N -f -L 5433:db.private:5432 user@bastion.example.com

# Persistent tunnel with autossh (auto-reconnect on failure)
# brew install autossh
autossh -M 20000 -N -f -L 5433:db.private:5432 user@bastion.example.com

# ============================================================
# SSH JUMP HOST (newer alternative to tunnels)
# ============================================================

# Connect to internal server through bastion in one command
ssh -J user@bastion.example.com user@internal.private

# With custom ports
ssh -J admin@bastion.example.com:2222 deploy@10.0.0.50`}</code></pre>

      {/* Section 9: Certificate-based SSH */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Certificate-Based SSH — ssh-keygen -s, CA, authorized_principals, Expiry
      </h2>
      <p>
        Certificate-based SSH authentication replaces per-server <code>authorized_keys</code> management with
        a centralized Certificate Authority (CA). This scales to hundreds of servers and provides automatic
        key expiry, making it ideal for larger organizations.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Setting Up a Certificate Authority
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# ============================================================
# STEP 1: Create the CA key pair (keep PRIVATE KEY very secure)
# ============================================================
ssh-keygen -t ed25519 -f /etc/ssh/ssh_ca -C "SSH Certificate Authority"
# This creates:
#   /etc/ssh/ssh_ca      (CA private key — guard this!)
#   /etc/ssh/ssh_ca.pub  (CA public key — distribute to servers)

# ============================================================
# STEP 2: Configure servers to trust the CA
# ============================================================
# On each server, add to /etc/ssh/sshd_config:
# TrustedUserCAKeys /etc/ssh/ssh_ca.pub
# systemctl restart sshd

# Distribute CA public key to all servers (Ansible/Chef/Puppet automation)
ansible all -m copy -a "src=/etc/ssh/ssh_ca.pub dest=/etc/ssh/ssh_ca.pub mode=0644"
ansible all -m lineinfile -a \
  "path=/etc/ssh/sshd_config line='TrustedUserCAKeys /etc/ssh/ssh_ca.pub'"
ansible all -m service -a "name=sshd state=restarted"

# ============================================================
# STEP 3: Sign a user's public key to create a certificate
# ============================================================
# -s: CA private key
# -I: key identity (appears in auth logs)
# -n: authorized principals (comma-separated usernames allowed)
# -V: validity period (+52w = 52 weeks, +1d = 1 day, -5m:+1h = 5 min ago to 1 hour)
# -z: serial number (for auditing/revocation)

ssh-keygen -s /etc/ssh/ssh_ca \
  -I "alice@example.com" \
  -n ubuntu,admin \
  -V +52w \
  -z 1001 \
  ~/.ssh/id_ed25519.pub

# Creates: ~/.ssh/id_ed25519-cert.pub
# The certificate is automatically used when the matching private key is used

# View certificate details
ssh-keygen -L -f ~/.ssh/id_ed25519-cert.pub
# Type: ssh-ed25519-cert-v01@openssh.com user certificate
# Public key: ED25519-CERT SHA256:abc...
# Signing CA: ED25519 SHA256:xyz... (ssh_ca)
# Key ID: "alice@example.com"
# Serial: 1001
# Valid: from 2024-01-01T00:00:00 to 2025-01-01T00:00:00
# Principals: ubuntu, admin
# Critical Options: (none)
# Extensions: permit-pty, permit-user-rc, permit-X11-forwarding, ...

# ============================================================
# STEP 4: Restrict with authorized_principals (optional)
# ============================================================
# Instead of authorized_keys, use authorized_principals to map
# certificates to allowed usernames per server:
# /etc/ssh/sshd_config:
# AuthorizedPrincipalsFile /etc/ssh/auth_principals/%u

# /etc/ssh/auth_principals/ubuntu (lists principals allowed to log in as ubuntu)
# alice@example.com
# bob@example.com

# ============================================================
# CERTIFICATE REVOCATION
# ============================================================
# Revoke a specific key or certificate serial:
ssh-keygen -k -f /etc/ssh/revoked_keys -z 1001 /etc/ssh/ssh_ca.pub

# Server config: RevokedKeys /etc/ssh/revoked_keys`}</code></pre>

      {/* Section 10: Security Best Practices */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        SSH Security Best Practices — sshd_config, fail2ban, known_hosts, HSM
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Hardened sshd_config
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# /etc/ssh/sshd_config — Hardened configuration

# ============================================================
# DISABLE PASSWORD AUTHENTICATION (use keys only)
# ============================================================
PasswordAuthentication no
ChallengeResponseAuthentication no
KbdInteractiveAuthentication no
UsePAM no
PermitEmptyPasswords no

# ============================================================
# DISABLE ROOT LOGIN
# ============================================================
PermitRootLogin no
# Or if you must allow root key login:
# PermitRootLogin prohibit-password

# ============================================================
# RESTRICT ALGORITHMS TO MODERN CRYPTOGRAPHY
# ============================================================
HostKeyAlgorithms ssh-ed25519,rsa-sha2-256,rsa-sha2-512
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org,diffie-hellman-group16-sha512
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com
MACs hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com

# ============================================================
# REDUCE ATTACK SURFACE
# ============================================================
Port 2222                     # Non-default port (reduces bot scans)
AddressFamily inet            # IPv4 only (or inet6 for IPv6 only)
ListenAddress 0.0.0.0
LoginGraceTime 30             # 30 seconds to authenticate
MaxAuthTries 3                # 3 attempts before disconnect
MaxSessions 5                 # Max concurrent sessions per connection
ClientAliveInterval 300       # Server-side keepalive every 5 min
ClientAliveCountMax 2         # Disconnect after 2 missed keepalives

# ============================================================
# RESTRICT WHO CAN LOG IN
# ============================================================
AllowUsers alice bob deploy   # Whitelist specific users
# Or whitelist groups:
# AllowGroups sshusers admins

# ============================================================
# DISABLE UNUSED FEATURES
# ============================================================
X11Forwarding no
AllowAgentForwarding no       # Disable unless you need jump hosts
AllowTcpForwarding no         # Disable unless you need tunneling
GatewayPorts no
PermitTunnel no
Banner /etc/ssh/banner.txt    # Display legal warning on connect

# Apply changes:
# sshd -t   (test configuration before restart)
# systemctl restart sshd`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        fail2ban Configuration for SSH
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Install fail2ban
apt install fail2ban

# /etc/fail2ban/jail.local
[DEFAULT]
bantime  = 3600        # Ban for 1 hour
findtime  = 600        # Count failures within 10 minutes
maxretry = 3           # Ban after 3 failures

[sshd]
enabled = true
port    = 2222         # Match your SSH port
logpath = %(sshd_log)s
backend = %(sshd_backend)s
maxretry = 3
bantime = 86400        # Ban for 24 hours

# Check banned IPs
fail2ban-client status sshd
# Status for the jail: sshd
# |- Filter
# |  |- Currently failed: 2
# |  |- Total failed: 15
# |  \`- File list: /var/log/auth.log
# \`- Actions
#    |- Currently banned: 1
#    |- Total banned: 3
#    \`- Banned IP list: 192.168.1.100

# Unban an IP
fail2ban-client set sshd unbanip 192.168.1.100`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        known_hosts Management
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# ~/.ssh/known_hosts stores server public keys to prevent MITM attacks

# Verify a server's host key fingerprint (first connection)
ssh -o FingerprintHash=sha256 user@server.example.com
# The authenticity of host 'server.example.com' can't be established.
# ED25519 key fingerprint is SHA256:abc123...
# Are you sure you want to continue connecting (yes/no)?
# ALWAYS verify this fingerprint out-of-band (e.g., in server console) before accepting!

# View host keys in known_hosts
cat ~/.ssh/known_hosts

# Remove a specific host (e.g., after server rebuild)
ssh-keygen -R server.example.com
ssh-keygen -R 203.0.113.10   # Also remove by IP

# Hash known_hosts for privacy (hides hostnames from local attackers)
ssh-keygen -H -f ~/.ssh/known_hosts

# Scan server host key in advance (to add before first connection)
ssh-keyscan -t ed25519 server.example.com >> ~/.ssh/known_hosts

# In CI/CD: disable strict host checking (ONLY for known/controlled targets)
# WARNING: disabling StrictHostKeyChecking defeats MITM protection
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null user@server.example.com

# Better CI/CD approach: pre-populate known_hosts with verified fingerprint
ssh-keyscan -H server.example.com >> ~/.ssh/known_hosts
ssh user@server.example.com   # Now it will verify against known fingerprint`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Hardware Security Module (HSM) and SSH Keys
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# YubiKey / FIDO2 Hardware Keys for SSH (OpenSSH 8.2+)
# The private key never leaves the hardware device

# Generate a resident FIDO2 key (stored on YubiKey)
ssh-keygen -t ed25519-sk -O resident -C "hardware-key@example.com"
# -sk suffix: Security Key variant
# -O resident: store key handle on the device (survives device reset)

# Generate non-resident key (requires key handle file)
ssh-keygen -t ed25519-sk -C "yubikey@example.com"

# Retrieve resident keys from YubiKey
ssh-keygen -K
# Writes id_ed25519_sk_rk and id_ed25519_sk_rk.pub

# PIN/touch verification for each signature
ssh-keygen -t ed25519-sk -O verify-required -C "high-security@example.com"

# PKCS#11 module for HSM (for enterprise HSMs, smart cards)
ssh -I /usr/lib/opensc-pkcs11.so user@server.example.com

# In ~/.ssh/config:
# Host secure-server
#   PKCS11Provider /usr/lib/opensc-pkcs11.so
#   IdentityFile /path/to/certificate.pem

# HashiCorp Vault SSH Secrets Engine
# Vault acts as a CA and signs SSH certificates on demand
vault write ssh/sign/my-role \
  public_key=@$HOME/.ssh/id_ed25519.pub
# Returns a signed certificate valid for TTL duration`}</code></pre>

      {/* Quick Tool CTA */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem 1.25rem', margin: '2rem 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1d4ed8' }}>Generate SSH Keys Online</p>
        <p style={{ margin: '0 0 0.75rem 0' }}>
          Need to generate SSH keys without installing tools? Use our online SSH key generator —
          all cryptography runs in your browser, keys are never sent to any server.
        </p>
        <a
          href="https://viadreams.cc/en/tools/ssh-keygen"
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
          Open SSH Key Generator →
        </a>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem 1.25rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>Use Ed25519 for new keys</strong>: fastest, smallest, most secure, and resistant to side-channel attacks. Use RSA-4096 only for legacy compatibility.</li>
          <li><strong>Always set a passphrase</strong> on private keys stored on disk. Use <code>ssh-agent</code> to avoid entering it repeatedly.</li>
          <li><strong>Correct permissions are mandatory</strong>: <code>700</code> on <code>~/.ssh/</code>, <code>600</code> on private keys and <code>authorized_keys</code>, <code>644</code> on public keys.</li>
          <li><strong>Use ~/.ssh/config</strong> to manage multiple servers, keys, and jump hosts without memorizing long commands.</li>
          <li><strong>Disable password auth in sshd_config</strong> (<code>PasswordAuthentication no</code>) once SSH keys are working. Add fail2ban as a defense-in-depth measure.</li>
          <li><strong>For Git</strong>: use SSH URLs (<code>git@github.com:user/repo.git</code>) instead of HTTPS. For multiple accounts, define per-host aliases in <code>~/.ssh/config</code>.</li>
          <li><strong>SSH tunneling</strong> with <code>-L</code> (local), <code>-R</code> (remote), and <code>-D</code> (dynamic/SOCKS5) provides encrypted access to internal services. Use <code>-N -f</code> for background tunnels.</li>
          <li><strong>Certificate-based SSH</strong> eliminates per-server authorized_keys management at scale. Certificates support automatic expiry and centralized revocation.</li>
          <li><strong>FIDO2/YubiKey SSH keys</strong> (ed25519-sk) store the private key in hardware — the key never touches the filesystem and requires physical presence to sign.</li>
          <li><strong>Validate host keys</strong>: always verify the fingerprint of a new server before accepting. Never use <code>StrictHostKeyChecking=no</code> in production.</li>
        </ul>
      </div>
    </article>
  );
}
