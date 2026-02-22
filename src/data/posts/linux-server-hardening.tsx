'use client';

import Link from 'next/link';

export default function LinuxServerHardening({ lang }: { lang: string }) {
  return (
    <>
      <h2>Linux Server Security Hardening Guide</h2>
      <p>
        Securing a Linux server is one of the most critical tasks in systems administration. A fresh
        Linux installation is often configured for ease of use rather than security, leaving many
        attack surfaces open. This guide covers a systematic approach to hardening a Linux server —
        whether it is a VPS, dedicated server, or cloud instance — against the most common threats.
      </p>
      <p>
        For permission management fundamentals, see our{' '}
        <Link href={`/${lang}/blog/linux-chmod-chown-permissions-guide`}>
          Linux chmod and chown Guide
        </Link>
        .
      </p>

      <h2>1. Initial System Updates</h2>
      <p>
        The first step after any fresh installation is to update all packages to their latest versions
        to patch known vulnerabilities:
      </p>
      <pre><code className="language-bash">{`# Debian/Ubuntu
apt update && apt upgrade -y
apt autoremove -y
apt autoclean

# CentOS/RHEL/Rocky Linux
dnf update -y
dnf autoremove -y

# Enable automatic security updates (Ubuntu)
apt install unattended-upgrades -y
dpkg-reconfigure --priority=low unattended-upgrades

# /etc/apt/apt.conf.d/50unattended-upgrades
Unattended-Upgrade::Allowed-Origins {
  "\${distro_id}:\${distro_codename}-security";
  "\${distro_id}ESMApps:\${distro_codename}-apps-security";
};
Unattended-Upgrade::Automatic-Reboot "false";
Unattended-Upgrade::Mail "admin@example.com";`}</code></pre>

      <h2>2. SSH Hardening</h2>
      <p>
        SSH is the primary remote access method and the most frequently targeted service. These
        settings significantly reduce the attack surface:
      </p>
      <pre><code className="language-bash">{`# Generate a strong SSH key pair on your LOCAL machine
ssh-keygen -t ed25519 -C "your-email@example.com" -f ~/.ssh/id_ed25519

# Copy public key to server
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server-ip

# Verify key-based login works BEFORE disabling password auth
ssh -i ~/.ssh/id_ed25519 user@server-ip`}</code></pre>
      <pre><code className="language-bash">{`# /etc/ssh/sshd_config - SSH daemon configuration
Port 2222                           # Change default port (security by obscurity)
Protocol 2                          # SSH protocol version 2 only

# Authentication
PermitRootLogin no                  # Never allow direct root login
PasswordAuthentication no           # Keys only
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys

ChallengeResponseAuthentication no
UsePAM yes
KbdInteractiveAuthentication no

# Session limits
MaxAuthTries 3                      # Lock after 3 failed attempts
MaxSessions 3
LoginGraceTime 30s                  # 30s to authenticate

# Restrict users/groups
AllowUsers deploy admin             # Only these users can SSH
# AllowGroups sshusers

# Disable unused features
X11Forwarding no
AllowTcpForwarding no               # Disable SSH tunneling
AllowAgentForwarding no
PermitTunnel no

# Timeouts (disconnect idle sessions)
ClientAliveInterval 300             # Send keepalive every 5 min
ClientAliveCountMax 2               # Disconnect after 2 missed keepalives

# Strong ciphers only
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com
KexAlgorithms curve25519-sha256,diffie-hellman-group16-sha512`}</code></pre>
      <pre><code className="language-bash">{`# Apply changes
systemctl restart sshd

# Test in a NEW session before closing the current one!
ssh -p 2222 -i ~/.ssh/id_ed25519 user@server-ip`}</code></pre>

      <h2>3. Firewall Configuration</h2>
      <p>
        A properly configured firewall is your first line of defense. Block everything by default and
        allow only necessary traffic:
      </p>
      <pre><code className="language-bash">{`# UFW (Ubuntu Firewall) - simple interface for iptables
ufw default deny incoming
ufw default allow outgoing

# Allow essential services
ufw allow 2222/tcp comment 'SSH (custom port)'
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'

# Allow specific IPs for admin access
ufw allow from 203.0.113.0/24 to any port 2222 comment 'Admin IP range'

# Enable firewall
ufw enable
ufw status verbose

# Block specific country (using ipset + iptables for scale)
# ufw allows simple rules; use nftables/iptables for advanced geo-blocking`}</code></pre>
      <pre><code className="language-bash">{`# nftables (modern iptables replacement)
# /etc/nftables.conf
table inet filter {
    chain input {
        type filter hook input priority 0; policy drop;

        # Accept established/related connections
        ct state established,related accept

        # Accept loopback
        iif lo accept

        # ICMP (ping)
        ip protocol icmp icmp type { echo-request } limit rate 10/second accept
        ip6 nexthdr icmpv6 accept

        # SSH (rate limited)
        tcp dport 2222 ct state new limit rate 5/minute accept

        # Web
        tcp dport { 80, 443 } accept

        # Drop everything else
        counter drop
    }

    chain forward { type filter hook forward priority 0; policy drop; }
    chain output { type filter hook output priority 0; policy accept; }
}`}</code></pre>

      <h2>4. Fail2Ban: Brute Force Protection</h2>
      <pre><code className="language-bash">{`# Install fail2ban
apt install fail2ban -y

# /etc/fail2ban/jail.local
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5
ignoreip = 127.0.0.1/8 ::1 your-home-ip

[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 24h

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 5

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
logpath = /var/log/nginx/error.log
maxretry = 10`}</code></pre>
      <pre><code className="language-bash">{`systemctl enable fail2ban
systemctl start fail2ban

# Check status
fail2ban-client status
fail2ban-client status sshd

# Unban an IP
fail2ban-client set sshd unbanip 1.2.3.4`}</code></pre>

      <h2>5. User Account Security</h2>
      <pre><code className="language-bash">{`# Create a dedicated deploy user (don't use root)
adduser deploy
usermod -aG sudo deploy

# Set password policy
# /etc/security/pwquality.conf
minlen = 14
dcredit = -1            # At least 1 digit
ucredit = -1            # At least 1 uppercase
lcredit = -1            # At least 1 lowercase
ocredit = -1            # At least 1 special character

# Lock inactive accounts
useradd -D -f 30        # Lock accounts 30 days after password expiry

# Check for accounts with empty passwords
awk -F: '($2 == "" ) { print $1 }' /etc/shadow

# List users with sudo privileges
grep -Po '^sudo.+:\K.*$' /etc/group

# Disable root login (after creating sudo user)
passwd -l root          # Lock root password`}</code></pre>

      <h2>6. System Audit and Intrusion Detection</h2>
      <pre><code className="language-bash">{`# Install and configure auditd
apt install auditd audispd-plugins -y

# /etc/audit/rules.d/audit.rules
# Monitor authentication
-w /etc/passwd -p wa -k identity
-w /etc/shadow -p wa -k identity
-w /etc/group -p wa -k identity
-w /etc/sudoers -p wa -k sudoers

# Monitor SSH
-w /etc/ssh/sshd_config -p wa -k sshd_config

# Monitor privilege escalation
-a always,exit -F arch=b64 -S setuid -k privilege_esc
-a always,exit -F arch=b64 -S setgid -k privilege_esc

# Monitor network connections
-a always,exit -F arch=b64 -S connect -k network

# Monitor file creation in /tmp
-w /tmp -p wxa -k tmp_writes

# Load rules
auditctl -R /etc/audit/rules.d/audit.rules
systemctl restart auditd

# Query audit log
ausearch -k identity -ts today
ausearch -k privilege_esc`}</code></pre>
      <pre><code className="language-bash">{`# AIDE: File integrity monitoring
apt install aide -y

# Initialize database (after hardening, before going live)
aideinit

# Run check
aide --check

# Schedule daily checks
echo "0 3 * * * root aide --check 2>&1 | mail -s 'AIDE Report' admin@example.com" \
  >> /etc/crontab`}</code></pre>

      <h2>7. Kernel Hardening with sysctl</h2>
      <pre><code className="language-bash">{`# /etc/sysctl.d/99-hardening.conf

# Network: Disable IP source routing
net.ipv4.conf.all.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0

# Network: Disable ICMP redirects
net.ipv4.conf.all.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0

# Network: Enable SYN cookies (SYN flood protection)
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_syn_retries = 5
net.ipv4.tcp_synack_retries = 2

# Network: Log suspicious packets
net.ipv4.conf.all.log_martians = 1

# Network: Disable IPv6 if not needed
net.ipv6.conf.all.disable_ipv6 = 1

# Memory: Enable ASLR (Address Space Layout Randomization)
kernel.randomize_va_space = 2

# Kernel: Restrict kernel pointer exposure
kernel.kptr_restrict = 2
kernel.dmesg_restrict = 1

# Kernel: Disable core dumps
fs.suid_dumpable = 0
kernel.core_pattern = /dev/null

# Apply
sysctl -p /etc/sysctl.d/99-hardening.conf`}</code></pre>

      <h2>8. Disable Unnecessary Services</h2>
      <pre><code className="language-bash">{`# List all running services
systemctl list-units --type=service --state=running

# Common services to disable if not needed
systemctl disable --now avahi-daemon    # mDNS/zero-conf
systemctl disable --now cups            # Printing
systemctl disable --now rpcbind         # NFS/RPC
systemctl disable --now bluetooth       # Bluetooth
systemctl disable --now isc-dhcp-server # DHCP server
systemctl disable --now postfix         # Mail server (if unused)

# Remove unnecessary packages
apt purge telnet rsh-client rsh-redone-client nis -y

# Check for listening services
ss -tlnp                    # TCP listening ports
ss -ulnp                    # UDP listening ports
netstat -tulpn              # Alternative

# For each unexpected listening port, identify and stop the service
lsof -i :port_number`}</code></pre>

      <h2>9. Log Management and Monitoring</h2>
      <pre><code className="language-bash">{`# Configure rsyslog to send logs to remote server
# /etc/rsyslog.conf
*.* @@logs.example.com:514    # TCP to remote syslog

# Key log files to monitor
tail -f /var/log/auth.log     # Authentication (SSH, sudo)
tail -f /var/log/syslog       # System events
tail -f /var/log/kern.log     # Kernel messages
tail -f /var/log/fail2ban.log # Fail2ban bans

# logwatch: Daily log digest
apt install logwatch -y
logwatch --detail medium --mailto admin@example.com --range today

# Set log rotation
# /etc/logrotate.d/custom
/var/log/myapp/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    sharedscripts
    postrotate
        systemctl reload myapp
    endscript
}`}</code></pre>

      <h2>10. SSL/TLS Configuration</h2>
      <pre><code className="language-bash">{`# Install Certbot for Let's Encrypt
snap install certbot --classic

# Obtain certificate
certbot --nginx -d example.com -d www.example.com

# Test renewal
certbot renew --dry-run

# Nginx SSL configuration (add to server block)
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers off;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 1d;
ssl_session_tickets off;

# HSTS (HTTP Strict Transport Security)
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";

# OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4;`}</code></pre>

      <h2>Security Hardening Checklist</h2>
      <pre><code className="language-text">{`Initial Setup
  [ ] System fully updated (apt upgrade / dnf update)
  [ ] Automatic security updates enabled
  [ ] Non-root sudo user created

SSH
  [ ] Key-based authentication only (PasswordAuthentication no)
  [ ] Root login disabled (PermitRootLogin no)
  [ ] SSH port changed from 22
  [ ] AllowUsers or AllowGroups restricting access
  [ ] Idle session timeout set

Firewall
  [ ] Default deny incoming policy
  [ ] Only necessary ports open
  [ ] fail2ban installed and configured
  [ ] Rate limiting on SSH

System Security
  [ ] Unnecessary services disabled and removed
  [ ] sysctl kernel parameters hardened
  [ ] Core dumps disabled
  [ ] ASLR enabled (kernel.randomize_va_space=2)

Monitoring
  [ ] auditd configured with rules
  [ ] AIDE file integrity baseline created
  [ ] Log forwarding to remote server
  [ ] Logwatch or equivalent configured

Network
  [ ] SSL/TLS with modern ciphers
  [ ] HSTS header enabled
  [ ] Security headers in Nginx/Apache`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>Should I disable IPv6 for security?</h3>
      <p>
        Only if you don't use IPv6. Disabling it can reduce your attack surface slightly, but many
        modern services rely on IPv6. If you disable it, make sure your firewall rules also cover
        IPv6 (<code>ip6tables</code> or <code>nftables</code>) even if you're not using it.
      </p>

      <h3>Is changing the SSH port worth it?</h3>
      <p>
        It's security through obscurity, not a real security measure. However, it dramatically reduces
        automated bot attacks in your logs, making it easier to spot real intrusion attempts. Always
        combine with key-based auth and fail2ban.
      </p>

      <h3>How often should I run security audits?</h3>
      <p>
        Run automated checks daily (AIDE, logwatch, fail2ban status). Do manual reviews monthly.
        After any system change, re-run relevant checks. Subscribe to your distribution's security
        announcements (Ubuntu Security Notices, RedHat Security Advisories).
      </p>

      <p>
        Use our <Link href={`/${lang}/tools/hash-generator`}>Hash Generator</Link> to create checksums
        for verifying file integrity, or the{' '}
        <Link href={`/${lang}/tools/cron-parser`}>Cron Expression Parser</Link> to schedule your
        automated security checks.
      </p>
    </>
  );
}
