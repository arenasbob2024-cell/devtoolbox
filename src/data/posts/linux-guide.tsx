'use client';

const translations = {
  en: {
    title: 'Linux Complete Guide for Developers: File System, Permissions, Networking, Shell Scripting & More',
    description:
      'Master Linux for development: file system hierarchy, permissions and ownership, process management, networking commands, systemd services, cron jobs, shell scripting, package management, SSH, iptables/firewall, disk management, and system monitoring.',
  },
  zh: {
    title: 'Linux 开发者完整指南：文件系统、权限、网络、Shell 脚本等',
    description:
      '全面掌握 Linux 开发技能：文件系统层次结构、权限与所有权、进程管理、网络命令、systemd 服务、cron 定时任务、Shell 脚本编程、包管理、SSH、iptables/防火墙、磁盘管理和系统监控。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Linux file system hierarchy and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Linux Filesystem Hierarchy Standard (FHS) organizes files into directories like /bin (essential binaries), /etc (configuration files), /home (user directories), /var (variable data like logs), /tmp (temporary files), and /usr (user programs). Understanding this layout is essential because every tool, service, and config follows these conventions, making system administration predictable.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Linux file permissions work with chmod and chown?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Linux permissions are defined for three entities: owner, group, and others. Each can have read (r=4), write (w=2), and execute (x=1) permissions. chmod changes permissions using octal (chmod 755 file) or symbolic (chmod u+x file) notation. chown changes ownership (chown user:group file). Special permissions include setuid (4xxx), setgid (2xxx), and sticky bit (1xxx).',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I manage processes in Linux with ps, top, and kill?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use ps aux to list all running processes, top or htop for real-time monitoring, and kill to send signals. kill -15 PID sends SIGTERM for graceful shutdown, kill -9 PID sends SIGKILL for forced termination. Use bg/fg to manage background jobs, and nohup or disown to keep processes running after logout.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is systemd and how do I create a service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'systemd is the init system and service manager for most modern Linux distributions. It manages services (daemons), handles boot order, and provides logging via journalctl. Create a .service unit file in /etc/systemd/system/, define ExecStart, then run systemctl daemon-reload, systemctl enable, and systemctl start to activate it.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do cron jobs work in Linux?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cron is a time-based job scheduler. Edit your crontab with crontab -e. The syntax is: minute hour day-of-month month day-of-week command. For example, 0 2 * * * /scripts/backup.sh runs at 2:00 AM daily. Use @reboot for startup tasks, @hourly, @daily, @weekly for convenience. Check logs at /var/log/cron or via journalctl -u cron.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I configure SSH for secure remote access?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Generate an SSH key pair with ssh-keygen -t ed25519. Copy the public key to the server with ssh-copy-id user@host. Harden security by editing /etc/ssh/sshd_config: disable root login (PermitRootLogin no), disable password auth (PasswordAuthentication no), and change the default port. Use ssh-agent for key management and ~/.ssh/config for host aliases.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use iptables or firewalld to configure a Linux firewall?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'iptables uses chains (INPUT, OUTPUT, FORWARD) and rules to filter packets. Example: iptables -A INPUT -p tcp --dport 22 -j ACCEPT allows SSH. For persistence, use iptables-save/iptables-restore or install iptables-persistent. firewalld (on RHEL/CentOS) uses zones and provides firewall-cmd for dynamic management. ufw (on Ubuntu) offers a simpler frontend.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best Linux system monitoring tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For real-time monitoring: top/htop for processes, vmstat/sar for CPU/memory/IO, iotop for disk IO, nethogs/iftop for network. For disk usage: df -h for filesystem usage, du -sh for directory sizes, lsblk for block devices. For logs: journalctl for systemd logs, dmesg for kernel messages. Production setups often use Prometheus + Grafana, Netdata, or Zabbix.',
      },
    },
  ],
};

export default function LinuxGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    marginBottom: '24px',
  };

  const thStyle: React.CSSProperties = {
    padding: '10px 14px',
    textAlign: 'left',
    background: '#1e293b',
    color: '#f1f5f9',
    fontWeight: '600',
  };

  const tdStyle: React.CSSProperties = {
    padding: '9px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
    verticalAlign: 'top',
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', marginBottom: '16px' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.7' }}>
          {t.description}
        </p>
      </header>

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '20px 24px', marginBottom: '32px', borderRadius: '0 8px 8px 0' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '10px', color: '#0369a1' }}>TL;DR</h2>
        <p style={{ color: '#334155', lineHeight: '1.7', margin: '0' }}>
          {isZh
            ? 'Linux 是每个开发者的基础技能。掌握文件系统层次结构（/etc、/var、/home）、权限模型（chmod/chown）、进程管理（ps/top/kill）、systemd 服务、cron 定时任务、Shell 脚本编程、SSH 安全配置、iptables 防火墙、磁盘管理（df/du/lvm）和系统监控工具，将让你在服务器运维和 DevOps 中游刃有余。'
            : 'Linux is a foundational skill for every developer. Master the filesystem hierarchy (/etc, /var, /home), the permission model (chmod/chown), process management (ps/top/kill), systemd services, cron scheduling, shell scripting, SSH hardening, iptables firewalls, disk management (df/du/lvm), and system monitoring tools to become proficient in server administration and DevOps.'}
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px 24px', marginBottom: '32px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '12px', color: '#1e293b' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </h2>
        <ul style={{ margin: '0', paddingLeft: '20px', color: '#334155', lineHeight: '1.8' }}>
          <li>{isZh ? 'FHS 标准定义了所有 Linux 目录的用途——/bin、/etc、/var、/home 等' : 'The FHS standard defines every Linux directory — /bin, /etc, /var, /home, and more'}</li>
          <li>{isZh ? '权限由 owner/group/others 三元组和 rwx 位组成，setuid/setgid/sticky 提供特殊控制' : 'Permissions use owner/group/others triplets with rwx bits; setuid/setgid/sticky provide special control'}</li>
          <li>{isZh ? '使用 systemctl 管理 systemd 服务，journalctl 查看日志' : 'Manage systemd services with systemctl, view logs with journalctl'}</li>
          <li>{isZh ? 'cron 五字段语法控制定时任务：分 时 日 月 周' : 'Cron five-field syntax controls scheduled tasks: min hour day month weekday'}</li>
          <li>{isZh ? 'Shell 脚本中始终用双引号包裹变量，使用 set -euo pipefail 提高健壮性' : 'Always double-quote variables in shell scripts and use set -euo pipefail for robustness'}</li>
          <li>{isZh ? 'SSH 使用 ed25519 密钥、禁用密码认证、禁止 root 登录' : 'Use ed25519 SSH keys, disable password auth, and prohibit root login'}</li>
          <li>{isZh ? 'iptables 使用链（INPUT/OUTPUT/FORWARD）过滤数据包，ufw 是更友好的前端' : 'iptables filters packets using chains (INPUT/OUTPUT/FORWARD); ufw is a friendlier frontend'}</li>
          <li>{isZh ? '组合 top/htop、vmstat、iotop、nethogs 进行全面系统监控' : 'Combine top/htop, vmstat, iotop, and nethogs for comprehensive system monitoring'}</li>
        </ul>
      </div>

      {/* ===== Section 1: File System Hierarchy ===== */}
      <h2 style={h2Style}>
        {isZh ? '1. Linux 文件系统层次结构' : '1. Linux File System Hierarchy'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Linux 遵循文件系统层次标准 (FHS)。理解每个顶层目录的用途是有效管理系统的基础。'
          : 'Linux follows the Filesystem Hierarchy Standard (FHS). Understanding each top-level directory is foundational for effective system management.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '目录' : 'Directory'}</th>
            <th style={thStyle}>{isZh ? '用途' : 'Purpose'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code>/</code></td><td style={tdStyle}>{isZh ? '根目录，所有文件的起点' : 'Root directory, the starting point of all files'}</td></tr>
          <tr><td style={tdStyle}><code>/bin</code></td><td style={tdStyle}>{isZh ? '基本用户命令（ls, cp, cat）' : 'Essential user commands (ls, cp, cat)'}</td></tr>
          <tr><td style={tdStyle}><code>/sbin</code></td><td style={tdStyle}>{isZh ? '系统管理命令（fdisk, iptables, reboot）' : 'System admin commands (fdisk, iptables, reboot)'}</td></tr>
          <tr><td style={tdStyle}><code>/etc</code></td><td style={tdStyle}>{isZh ? '系统配置文件' : 'System configuration files'}</td></tr>
          <tr><td style={tdStyle}><code>/home</code></td><td style={tdStyle}>{isZh ? '用户家目录' : 'User home directories'}</td></tr>
          <tr><td style={tdStyle}><code>/var</code></td><td style={tdStyle}>{isZh ? '可变数据（日志、缓存、邮件）' : 'Variable data (logs, caches, mail)'}</td></tr>
          <tr><td style={tdStyle}><code>/tmp</code></td><td style={tdStyle}>{isZh ? '临时文件（重启后可清除）' : 'Temporary files (cleared on reboot)'}</td></tr>
          <tr><td style={tdStyle}><code>/usr</code></td><td style={tdStyle}>{isZh ? '用户程序和库' : 'User programs and libraries'}</td></tr>
          <tr><td style={tdStyle}><code>/opt</code></td><td style={tdStyle}>{isZh ? '第三方可选软件' : 'Optional third-party software'}</td></tr>
          <tr><td style={tdStyle}><code>/proc</code></td><td style={tdStyle}>{isZh ? '虚拟文件系统，暴露进程和内核信息' : 'Virtual filesystem exposing process/kernel info'}</td></tr>
          <tr><td style={tdStyle}><code>/dev</code></td><td style={tdStyle}>{isZh ? '设备文件节点' : 'Device file nodes'}</td></tr>
          <tr><td style={tdStyle}><code>/mnt</code>, <code>/media</code></td><td style={tdStyle}>{isZh ? '挂载点（临时挂载和可移动设备）' : 'Mount points (temp mounts & removable devices)'}</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>
        {isZh ? '常用文件操作命令' : 'Essential File Operations'}
      </h3>
      <pre style={preStyle}><code>{'# Navigate and list\n' +
'cd /var/log          # change directory\n' +
'ls -lah              # list all files with sizes (human-readable)\n' +
'pwd                  # print working directory\n' +
'\n' +
'# Create, copy, move, remove\n' +
'mkdir -p /opt/myapp/config   # create nested directories\n' +
'cp -r src/ dest/             # recursive copy\n' +
'mv oldname newname           # move / rename\n' +
'rm -rf /tmp/build-*          # force recursive remove (use with caution!)\n' +
'\n' +
'# Search for files\n' +
'find / -name "*.conf" -type f             # find all .conf files\n' +
'find /var/log -mtime -1 -name "*.log"     # logs modified in last 24h\n' +
'locate nginx.conf                          # fast search (needs updatedb)\n' +
'\n' +
'# View file contents\n' +
'cat /etc/hostname            # print entire file\n' +
'head -n 20 /var/log/syslog   # first 20 lines\n' +
'tail -f /var/log/syslog      # follow new lines in real time\n' +
'less /etc/passwd             # paginated viewer\n' +
'\n' +
'# Disk usage of a directory\n' +
'du -sh /var/log/*            # summarize each sub-item\n' +
'du -d 1 -h /home             # depth-1 summary'}</code></pre>

      {/* ===== Section 2: Permissions ===== */}
      <h2 style={h2Style}>
        {isZh ? '2. 文件权限与所有权' : '2. File Permissions & Ownership'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Linux 权限模型基于三组实体（所有者、组、其他人），每组拥有读(r)、写(w)、执行(x)三种权限。'
          : 'The Linux permission model is based on three entities (owner, group, others), each with read (r), write (w), and execute (x) privileges.'}
      </p>

      <pre style={preStyle}><code>{'# Understanding ls -l output\n' +
'# -rwxr-xr-- 1 deploy www-data 4096 Feb 10 08:30 app.sh\n' +
'# │└┬┘└┬┘└┬┘   owner  group    size date          name\n' +
'# │ │   │   └── others: r-- (4) = read only\n' +
'# │ │   └────── group:  r-x (5) = read + execute\n' +
'# │ └────────── owner:  rwx (7) = read + write + execute\n' +
'# └──────────── file type: - = regular, d = directory, l = symlink\n' +
'\n' +
'# Octal notation\n' +
'chmod 755 deploy.sh     # owner=rwx, group=r-x, others=r-x\n' +
'chmod 644 config.yml    # owner=rw-, group=r--, others=r--\n' +
'chmod 700 ~/.ssh        # owner=rwx, no access for others\n' +
'\n' +
'# Symbolic notation\n' +
'chmod u+x script.sh     # add execute for owner\n' +
'chmod g-w secret.key     # remove write from group\n' +
'chmod o= shared/         # remove all permissions for others\n' +
'chmod a+r readme.txt     # add read for all (a = all)\n' +
'\n' +
'# Ownership\n' +
'chown deploy:www-data /var/www/html    # change owner and group\n' +
'chown -R deploy: /opt/myapp            # recursive, group unchanged\n' +
'chgrp docker /var/run/docker.sock      # change group only\n' +
'\n' +
'# Special permissions\n' +
'chmod 4755 /usr/bin/passwd    # setuid — runs as file owner\n' +
'chmod 2755 /shared/project    # setgid — new files inherit group\n' +
'chmod 1777 /tmp               # sticky bit — only owner can delete\n' +
'\n' +
'# Default permissions for new files\n' +
'umask 022     # new files: 644, new dirs: 755\n' +
'umask 077     # new files: 600, new dirs: 700 (private)'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? 'ACL 扩展权限' : 'ACL Extended Permissions'}
      </h3>
      <pre style={preStyle}><code>{'# When standard owner/group/others is not enough\n' +
'# Install: apt install acl\n' +
'\n' +
'# Grant user "ci" read+execute on /opt/deploy\n' +
'setfacl -m u:ci:rx /opt/deploy\n' +
'\n' +
'# Grant group "devs" full access recursively\n' +
'setfacl -R -m g:devs:rwx /srv/project\n' +
'\n' +
'# View ACLs\n' +
'getfacl /opt/deploy\n' +
'\n' +
'# Remove specific ACL entry\n' +
'setfacl -x u:ci /opt/deploy'}</code></pre>

      {/* ===== Section 3: Process Management ===== */}
      <h2 style={h2Style}>
        {isZh ? '3. 进程管理' : '3. Process Management'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Linux 中每个运行的程序都是一个进程，由 PID（进程ID）标识。进程管理包括查看、控制和终止进程。'
          : 'Every running program in Linux is a process, identified by a PID (process ID). Process management involves viewing, controlling, and terminating processes.'}
      </p>

      <pre style={preStyle}><code>{'# List all processes\n' +
'ps aux                     # all processes, full format\n' +
'ps aux | grep nginx        # filter by name\n' +
'ps -ef --forest            # tree view of process hierarchy\n' +
'\n' +
'# Real-time monitoring\n' +
'top                        # classic process monitor\n' +
'htop                       # interactive, colorized (install: apt install htop)\n' +
'\n' +
'# Signals\n' +
'kill -15 1234              # SIGTERM — graceful shutdown (default)\n' +
'kill -9 1234               # SIGKILL — force kill (cannot be caught)\n' +
'kill -1 1234               # SIGHUP — reload configuration\n' +
'killall nginx              # kill all processes by name\n' +
'pkill -f "node server.js"  # kill by command pattern\n' +
'\n' +
'# Background and foreground jobs\n' +
'./build.sh &               # run in background\n' +
'jobs                       # list background jobs\n' +
'fg %1                      # bring job 1 to foreground\n' +
'bg %1                      # resume job 1 in background\n' +
'Ctrl+Z                     # suspend current process\n' +
'\n' +
'# Keep process alive after logout\n' +
'nohup ./server.sh &        # nohup + background\n' +
'disown %1                  # detach job from shell\n' +
'\n' +
'# Process resource limits\n' +
'ulimit -a                  # show all limits\n' +
'ulimit -n 65536            # set max open files for this session\n' +
'\n' +
'# Which process uses a port?\n' +
'lsof -i :8080              # list processes on port 8080\n' +
'ss -tlnp | grep 8080       # socket statistics (faster)\n' +
'fuser -k 8080/tcp          # kill whatever is on port 8080'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '进程优先级与 nice' : 'Process Priority & nice'}
      </h3>
      <pre style={preStyle}><code>{'# Nice values: -20 (highest priority) to 19 (lowest)\n' +
'nice -n 10 ./heavy-task.sh      # start with lower priority\n' +
'renice -5 -p 1234               # change running process priority\n' +
'\n' +
'# Real-time scheduling (use with caution)\n' +
'chrt -f 99 ./realtime-app       # FIFO real-time priority 99'}</code></pre>

      {/* ===== Section 4: Networking ===== */}
      <h2 style={h2Style}>
        {isZh ? '4. 网络管理' : '4. Networking'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Linux 提供了强大的网络工具集，用于配置接口、诊断连接、传输文件和调试网络问题。'
          : 'Linux provides a powerful set of networking tools for configuring interfaces, diagnosing connections, transferring files, and debugging network issues.'}
      </p>

      <pre style={preStyle}><code>{'# Interface configuration (modern: ip, legacy: ifconfig)\n' +
'ip addr show                       # list all interfaces and IPs\n' +
'ip addr add 10.0.0.5/24 dev eth0   # assign IP\n' +
'ip link set eth0 up                # bring interface up\n' +
'ip route show                      # show routing table\n' +
'ip route add default via 10.0.0.1  # add default gateway\n' +
'\n' +
'# DNS resolution\n' +
'cat /etc/resolv.conf               # current DNS servers\n' +
'dig google.com                     # detailed DNS lookup\n' +
'nslookup google.com                # simpler DNS lookup\n' +
'host google.com                    # quick A record lookup\n' +
'\n' +
'# Connectivity testing\n' +
'ping -c 4 8.8.8.8                  # send 4 ICMP packets\n' +
'traceroute google.com              # trace packet route\n' +
'mtr google.com                     # real-time traceroute (ping + trace)\n' +
'\n' +
'# Port scanning and connectivity\n' +
'nc -zv host 22                     # check if port is open\n' +
'nc -l 9999                         # listen on port 9999\n' +
'telnet host 80                     # test TCP connection\n' +
'\n' +
'# Download and transfer\n' +
'curl -O https://example.com/file.tar.gz    # download file\n' +
'curl -X POST -H "Content-Type: application/json" \\\n' +
'     -d \'{"key":"val"}\' https://api.example.com/data\n' +
'wget -r --no-parent https://example.com/docs/  # recursive download\n' +
'scp file.txt user@host:/remote/path            # secure copy\n' +
'rsync -avz /local/ user@host:/remote/          # incremental sync\n' +
'\n' +
'# Socket statistics\n' +
'ss -tlnp                  # listening TCP sockets with process info\n' +
'ss -s                     # summary statistics\n' +
'netstat -tuln             # legacy equivalent of ss -tlnp'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '网络诊断示例' : 'Network Diagnostic Example'}
      </h3>
      <pre style={preStyle}><code>{'# Full diagnostic workflow for a connectivity issue:\n' +
'\n' +
'# 1. Check if interface is up\n' +
'ip link show eth0\n' +
'\n' +
'# 2. Check IP assignment\n' +
'ip addr show eth0\n' +
'\n' +
'# 3. Check gateway reachability\n' +
'ping -c 2 $(ip route | awk \'/default/{print $3}\')\n' +
'\n' +
'# 4. Check DNS resolution\n' +
'dig +short google.com\n' +
'\n' +
'# 5. Check specific port on remote host\n' +
'nc -w 3 -zv api.example.com 443\n' +
'\n' +
'# 6. Capture packets for deep debugging\n' +
'tcpdump -i eth0 -n port 443 -c 50 -w capture.pcap'}</code></pre>

      {/* ===== Section 5: systemd ===== */}
      <h2 style={h2Style}>
        {isZh ? '5. systemd 服务管理' : '5. systemd Service Management'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'systemd 是现代 Linux 发行版的初始化系统和服务管理器。它控制服务的启动、停止、重启，处理依赖关系，并通过 journalctl 提供集中日志。'
          : 'systemd is the init system and service manager for modern Linux distributions. It controls starting, stopping, and restarting services, handles dependencies, and provides centralized logging through journalctl.'}
      </p>

      <pre style={preStyle}><code>{'# Service management\n' +
'systemctl start nginx        # start a service\n' +
'systemctl stop nginx         # stop a service\n' +
'systemctl restart nginx      # restart\n' +
'systemctl reload nginx       # reload config without restart\n' +
'systemctl status nginx       # check status and recent logs\n' +
'systemctl enable nginx       # start on boot\n' +
'systemctl disable nginx      # do not start on boot\n' +
'systemctl is-active nginx    # check if running (for scripts)\n' +
'systemctl list-units --type=service --state=running  # all running\n' +
'\n' +
'# Logs with journalctl\n' +
'journalctl -u nginx                # all logs for nginx\n' +
'journalctl -u nginx --since today  # today only\n' +
'journalctl -u nginx -f             # follow (like tail -f)\n' +
'journalctl -p err                  # only errors and above\n' +
'journalctl --disk-usage            # how much disk logs use\n' +
'journalctl --vacuum-size=500M      # shrink logs to 500MB'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '创建自定义 systemd 服务' : 'Creating a Custom systemd Service'}
      </h3>
      <pre style={preStyle}><code>{'# /etc/systemd/system/myapp.service\n' +
'[Unit]\n' +
'Description=My Node.js Application\n' +
'After=network.target\n' +
'Wants=network-online.target\n' +
'\n' +
'[Service]\n' +
'Type=simple\n' +
'User=deploy\n' +
'Group=deploy\n' +
'WorkingDirectory=/opt/myapp\n' +
'ExecStart=/usr/bin/node /opt/myapp/server.js\n' +
'ExecReload=/bin/kill -HUP $MAINPID\n' +
'Restart=on-failure\n' +
'RestartSec=5\n' +
'StandardOutput=journal\n' +
'StandardError=journal\n' +
'Environment=NODE_ENV=production\n' +
'Environment=PORT=3000\n' +
'# Security hardening\n' +
'NoNewPrivileges=true\n' +
'ProtectSystem=strict\n' +
'ProtectHome=true\n' +
'ReadWritePaths=/opt/myapp/data\n' +
'\n' +
'[Install]\n' +
'WantedBy=multi-user.target\n' +
'\n' +
'# Activate the service\n' +
'# sudo systemctl daemon-reload\n' +
'# sudo systemctl enable --now myapp\n' +
'# sudo systemctl status myapp'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? 'systemd Timer（替代 cron）' : 'systemd Timers (cron Alternative)'}
      </h3>
      <pre style={preStyle}><code>{'# /etc/systemd/system/backup.timer\n' +
'[Unit]\n' +
'Description=Run backup every day at 2 AM\n' +
'\n' +
'[Timer]\n' +
'OnCalendar=*-*-* 02:00:00\n' +
'Persistent=true\n' +
'\n' +
'[Install]\n' +
'WantedBy=timers.target\n' +
'\n' +
'# /etc/systemd/system/backup.service\n' +
'[Unit]\n' +
'Description=Backup script\n' +
'\n' +
'[Service]\n' +
'Type=oneshot\n' +
'ExecStart=/opt/scripts/backup.sh\n' +
'\n' +
'# Enable: systemctl enable --now backup.timer\n' +
'# Check:  systemctl list-timers'}</code></pre>

      {/* ===== Section 6: Cron ===== */}
      <h2 style={h2Style}>
        {isZh ? '6. Cron 定时任务' : '6. Cron Job Scheduling'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'cron 是 Linux 中最经典的定时任务工具。通过 crontab 文件，你可以按照精确的时间计划自动执行命令和脚本。'
          : 'cron is the classic scheduling tool in Linux. Through crontab files, you can automatically execute commands and scripts on precise time schedules.'}
      </p>

      <pre style={preStyle}><code>{'# Crontab syntax:\n' +
'# ┌───────── minute (0-59)\n' +
'# │ ┌─────── hour (0-23)\n' +
'# │ │ ┌───── day of month (1-31)\n' +
'# │ │ │ ┌─── month (1-12)\n' +
'# │ │ │ │ ┌─ day of week (0-7, 0 and 7 = Sunday)\n' +
'# │ │ │ │ │\n' +
'# * * * * * command\n' +
'\n' +
'# Edit your crontab\n' +
'crontab -e\n' +
'\n' +
'# List current crontab\n' +
'crontab -l\n' +
'\n' +
'# Examples\n' +
'0 2 * * *     /opt/scripts/backup.sh          # daily at 2:00 AM\n' +
'*/5 * * * *   /opt/scripts/health-check.sh     # every 5 minutes\n' +
'0 0 * * 0     /opt/scripts/weekly-report.sh    # Sunday midnight\n' +
'30 8 1 * *    /opt/scripts/monthly-audit.sh    # 1st of month, 8:30 AM\n' +
'0 */6 * * *   /opt/scripts/sync.sh             # every 6 hours\n' +
'\n' +
'# Special strings\n' +
'@reboot       /opt/scripts/on-startup.sh       # run once at boot\n' +
'@hourly       /opt/scripts/heartbeat.sh        # every hour (0 * * * *)\n' +
'@daily        /opt/scripts/cleanup.sh          # once per day\n' +
'@weekly       /opt/scripts/digest.sh           # once per week\n' +
'@monthly      /opt/scripts/invoice.sh          # once per month\n' +
'\n' +
'# Redirect output for debugging\n' +
'0 3 * * * /opt/scripts/etl.sh >> /var/log/etl.log 2>&1\n' +
'\n' +
'# Use a MAILTO to get notified on errors\n' +
'MAILTO=admin@example.com\n' +
'0 4 * * * /opt/scripts/critical-job.sh\n' +
'\n' +
'# System-wide cron directories\n' +
'# /etc/cron.d/        custom cron files\n' +
'# /etc/cron.daily/    scripts run daily by anacron\n' +
'# /etc/cron.hourly/   scripts run hourly\n' +
'# /etc/cron.weekly/   scripts run weekly\n' +
'# /etc/cron.monthly/  scripts run monthly'}</code></pre>

      {/* ===== Section 7: Shell Scripting ===== */}
      <h2 style={h2Style}>
        {isZh ? '7. Shell 脚本编程' : '7. Shell Scripting'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Shell 脚本是 Linux 自动化的基础。Bash 是最常用的 shell，理解变量、条件、循环、函数和最佳实践将大幅提升你的生产力。'
          : 'Shell scripting is the foundation of Linux automation. Bash is the most common shell — understanding variables, conditionals, loops, functions, and best practices will dramatically boost your productivity.'}
      </p>

      <h3 style={h3Style}>
        {isZh ? '脚本基础与最佳实践' : 'Script Basics & Best Practices'}
      </h3>
      <pre style={preStyle}><code>{'#!/usr/bin/env bash\n' +
'# Always start with a robust preamble:\n' +
'set -euo pipefail\n' +
'# -e  exit on error\n' +
'# -u  treat unset variables as errors\n' +
'# -o pipefail  catch errors in piped commands\n' +
'\n' +
'# Variables (no spaces around =)\n' +
'APP_NAME="myapp"\n' +
'VERSION="1.2.3"\n' +
'DEPLOY_DIR="/opt/\\${APP_NAME}"\n' +
'\n' +
'# Always quote variables to handle spaces/special chars\n' +
'echo "Deploying \\${APP_NAME} v\\${VERSION} to \\${DEPLOY_DIR}"\n' +
'\n' +
'# Command substitution\n' +
'CURRENT_DATE="\\$(date +%Y-%m-%d)"\n' +
'GIT_HASH="\\$(git rev-parse --short HEAD)"\n' +
'FILE_COUNT="\\$(find /var/log -name \'*.log\' | wc -l)"\n' +
'\n' +
'# Arithmetic\n' +
'COUNT=5\n' +
'NEXT=\\$((COUNT + 1))\n' +
'echo "Next: \\${NEXT}"'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '条件判断' : 'Conditionals'}
      </h3>
      <pre style={preStyle}><code>{'#!/usr/bin/env bash\n' +
'set -euo pipefail\n' +
'\n' +
'# String comparison\n' +
'if [[ "\\${ENV}" == "production" ]]; then\n' +
'  echo "Running in production mode"\n' +
'elif [[ "\\${ENV}" == "staging" ]]; then\n' +
'  echo "Running in staging mode"\n' +
'else\n' +
'  echo "Running in development mode"\n' +
'fi\n' +
'\n' +
'# File tests\n' +
'if [[ -f "/etc/nginx/nginx.conf" ]]; then\n' +
'  echo "Nginx config exists"\n' +
'fi\n' +
'\n' +
'if [[ -d "/opt/myapp" ]]; then\n' +
'  echo "Directory exists"\n' +
'fi\n' +
'\n' +
'if [[ ! -x "/usr/bin/docker" ]]; then\n' +
'  echo "Docker not installed or not executable"\n' +
'  exit 1\n' +
'fi\n' +
'\n' +
'# Numeric comparison\n' +
'DISK_USAGE=85\n' +
'if (( DISK_USAGE > 80 )); then\n' +
'  echo "WARNING: Disk usage at \\${DISK_USAGE}%"\n' +
'fi\n' +
'\n' +
'# Logical operators\n' +
'if [[ -f "app.js" ]] && [[ -f "package.json" ]]; then\n' +
'  echo "Node.js project detected"\n' +
'fi'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '循环与函数' : 'Loops & Functions'}
      </h3>
      <pre style={preStyle}><code>{'#!/usr/bin/env bash\n' +
'set -euo pipefail\n' +
'\n' +
'# For loop\n' +
'for server in web-01 web-02 web-03; do\n' +
'  echo "Deploying to \\${server}..."\n' +
'  ssh "deploy@\\${server}" "bash /opt/deploy.sh"\n' +
'done\n' +
'\n' +
'# C-style for loop\n' +
'for ((i = 1; i <= 5; i++)); do\n' +
'  echo "Attempt \\${i}"\n' +
'done\n' +
'\n' +
'# While loop (read lines from file)\n' +
'while IFS= read -r line; do\n' +
'  echo "Processing: \\${line}"\n' +
'done < "servers.txt"\n' +
'\n' +
'# While loop with counter\n' +
'RETRIES=0\n' +
'MAX_RETRIES=5\n' +
'while (( RETRIES < MAX_RETRIES )); do\n' +
'  if curl -sf http://localhost:3000/health; then\n' +
'    echo "Service is up!"\n' +
'    break\n' +
'  fi\n' +
'  RETRIES=\\$((RETRIES + 1))\n' +
'  echo "Retry \\${RETRIES}/\\${MAX_RETRIES}..."\n' +
'  sleep 2\n' +
'done\n' +
'\n' +
'# Functions\n' +
'log() {\n' +
'  local level="\\$1"\n' +
'  local message="\\$2"\n' +
'  echo "[\\$(date +\'%Y-%m-%d %H:%M:%S\')] [\\${level}] \\${message}"\n' +
'}\n' +
'\n' +
'deploy() {\n' +
'  local target="\\$1"\n' +
'  log "INFO" "Starting deployment to \\${target}"\n' +
'\n' +
'  if ! ssh "deploy@\\${target}" "bash /opt/deploy.sh"; then\n' +
'    log "ERROR" "Deployment to \\${target} failed"\n' +
'    return 1\n' +
'  fi\n' +
'\n' +
'  log "INFO" "Deployment to \\${target} succeeded"\n' +
'}\n' +
'\n' +
'# Use the function\n' +
'deploy "web-01" || log "WARN" "Continuing despite failure"'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '实用脚本模式' : 'Practical Script Patterns'}
      </h3>
      <pre style={preStyle}><code>{'#!/usr/bin/env bash\n' +
'set -euo pipefail\n' +
'\n' +
'# Trap for cleanup on exit\n' +
'TMPDIR="\\$(mktemp -d)"\n' +
'trap \'rm -rf "\\${TMPDIR}"\' EXIT\n' +
'\n' +
'# Argument parsing\n' +
'usage() {\n' +
'  echo "Usage: \\$0 [-e environment] [-v version] [-h]"\n' +
'  exit 1\n' +
'}\n' +
'\n' +
'ENV="production"\n' +
'VER="latest"\n' +
'\n' +
'while getopts "e:v:h" opt; do\n' +
'  case "\\${opt}" in\n' +
'    e) ENV="\\${OPTARG}" ;;\n' +
'    v) VER="\\${OPTARG}" ;;\n' +
'    h) usage ;;\n' +
'    *) usage ;;\n' +
'  esac\n' +
'done\n' +
'\n' +
'echo "Deploying version \\${VER} to \\${ENV}"\n' +
'\n' +
'# Here document (heredoc)\n' +
'cat > "\\${TMPDIR}/config.yml" <<EOF\n' +
'environment: \\${ENV}\n' +
'version: \\${VER}\n' +
'timestamp: \\$(date -u +%Y-%m-%dT%H:%M:%SZ)\n' +
'EOF\n' +
'\n' +
'# Arrays\n' +
'SERVERS=("web-01" "web-02" "web-03")\n' +
'echo "Server count: \\${#SERVERS[@]}"\n' +
'for s in "\\${SERVERS[@]}"; do\n' +
'  echo "  -> \\${s}"\n' +
'done\n' +
'\n' +
'# String manipulation\n' +
'FILENAME="backup-2026-02-27.tar.gz"\n' +
'echo "\\${FILENAME%.tar.gz}"      # remove suffix: backup-2026-02-27\n' +
'echo "\\${FILENAME##*-}"          # remove prefix: 27.tar.gz\n' +
'echo "\\${FILENAME/backup/archive}" # replace: archive-2026-02-27.tar.gz'}</code></pre>

      {/* ===== Section 8: Package Management ===== */}
      <h2 style={h2Style}>
        {isZh ? '8. 包管理' : '8. Package Management'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Linux 发行版使用不同的包管理系统。Debian/Ubuntu 使用 APT，RHEL/CentOS/Fedora 使用 DNF/YUM，Arch 使用 pacman。'
          : 'Linux distributions use different package management systems. Debian/Ubuntu uses APT, RHEL/CentOS/Fedora uses DNF/YUM, and Arch uses pacman.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '操作' : 'Action'}</th>
            <th style={thStyle}>APT (Debian/Ubuntu)</th>
            <th style={thStyle}>DNF (RHEL/Fedora)</th>
            <th style={thStyle}>pacman (Arch)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '更新索引' : 'Update index'}</td><td style={tdStyle}><code>apt update</code></td><td style={tdStyle}><code>dnf check-update</code></td><td style={tdStyle}><code>pacman -Sy</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '升级所有包' : 'Upgrade all'}</td><td style={tdStyle}><code>apt upgrade</code></td><td style={tdStyle}><code>dnf upgrade</code></td><td style={tdStyle}><code>pacman -Syu</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '安装包' : 'Install'}</td><td style={tdStyle}><code>apt install nginx</code></td><td style={tdStyle}><code>dnf install nginx</code></td><td style={tdStyle}><code>pacman -S nginx</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '卸载包' : 'Remove'}</td><td style={tdStyle}><code>apt remove nginx</code></td><td style={tdStyle}><code>dnf remove nginx</code></td><td style={tdStyle}><code>pacman -R nginx</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '搜索包' : 'Search'}</td><td style={tdStyle}><code>apt search keyword</code></td><td style={tdStyle}><code>dnf search keyword</code></td><td style={tdStyle}><code>pacman -Ss keyword</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '包信息' : 'Info'}</td><td style={tdStyle}><code>apt show nginx</code></td><td style={tdStyle}><code>dnf info nginx</code></td><td style={tdStyle}><code>pacman -Si nginx</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '清理缓存' : 'Clean cache'}</td><td style={tdStyle}><code>apt autoremove</code></td><td style={tdStyle}><code>dnf autoremove</code></td><td style={tdStyle}><code>pacman -Sc</code></td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>
        {isZh ? '通用包管理技巧' : 'Universal Package Tips'}
      </h3>
      <pre style={preStyle}><code>{'# Check which package provides a file\n' +
'dpkg -S /usr/bin/curl       # Debian/Ubuntu\n' +
'rpm -qf /usr/bin/curl       # RHEL/Fedora\n' +
'\n' +
'# List installed packages\n' +
'dpkg -l | grep nginx        # Debian/Ubuntu\n' +
'rpm -qa | grep nginx        # RHEL/Fedora\n' +
'\n' +
'# Hold a package (prevent upgrades)\n' +
'apt-mark hold linux-image-generic    # Debian/Ubuntu\n' +
'dnf versionlock add kernel           # RHEL (needs plugin)\n' +
'\n' +
'# Snap and Flatpak (cross-distro)\n' +
'snap install code --classic          # VS Code via Snap\n' +
'flatpak install flathub org.gimp.GIMP  # GIMP via Flatpak'}</code></pre>

      {/* ===== Section 9: SSH ===== */}
      <h2 style={h2Style}>
        {isZh ? '9. SSH 安全远程访问' : '9. SSH Secure Remote Access'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'SSH (Secure Shell) 是远程管理 Linux 服务器的标准协议。正确配置 SSH 是服务器安全的第一道防线。'
          : 'SSH (Secure Shell) is the standard protocol for remote Linux server management. Proper SSH configuration is the first line of server security.'}
      </p>

      <pre style={preStyle}><code>{'# Generate SSH key pair (Ed25519 recommended)\n' +
'ssh-keygen -t ed25519 -C "dev@example.com"\n' +
'# Generates:\n' +
'#   ~/.ssh/id_ed25519       (private key — NEVER share)\n' +
'#   ~/.ssh/id_ed25519.pub   (public key — copy to servers)\n' +
'\n' +
'# Copy public key to server\n' +
'ssh-copy-id -i ~/.ssh/id_ed25519.pub user@192.168.1.100\n' +
'\n' +
'# Connect\n' +
'ssh user@192.168.1.100\n' +
'ssh -p 2222 user@host       # custom port\n' +
'ssh -i ~/.ssh/mykey user@host  # specific key\n' +
'\n' +
'# SSH agent (avoid typing passphrase repeatedly)\n' +
'eval "\\$(ssh-agent -s)"\n' +
'ssh-add ~/.ssh/id_ed25519\n' +
'ssh-add -l                   # list loaded keys'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? 'SSH 配置文件' : 'SSH Config File'}
      </h3>
      <pre style={preStyle}><code>{'# ~/.ssh/config — host aliases for convenience\n' +
'\n' +
'Host prod\n' +
'  HostName 10.0.1.50\n' +
'  User deploy\n' +
'  Port 2222\n' +
'  IdentityFile ~/.ssh/id_ed25519\n' +
'  ForwardAgent yes\n' +
'\n' +
'Host staging\n' +
'  HostName 10.0.1.51\n' +
'  User deploy\n' +
'  Port 2222\n' +
'  IdentityFile ~/.ssh/id_ed25519\n' +
'\n' +
'Host bastion\n' +
'  HostName bastion.example.com\n' +
'  User admin\n' +
'  IdentityFile ~/.ssh/bastion_key\n' +
'\n' +
'# Jump through bastion to reach internal servers\n' +
'Host internal-*\n' +
'  ProxyJump bastion\n' +
'  User deploy\n' +
'\n' +
'# Usage: ssh prod  (instead of ssh -p 2222 deploy@10.0.1.50)'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? 'SSH 服务端安全加固' : 'SSH Server Hardening'}
      </h3>
      <pre style={preStyle}><code>{'# /etc/ssh/sshd_config — security hardening\n' +
'\n' +
'Port 2222                         # change from default 22\n' +
'PermitRootLogin no                # disable root SSH login\n' +
'PasswordAuthentication no         # keys only, no passwords\n' +
'PubkeyAuthentication yes          # enable key-based auth\n' +
'MaxAuthTries 3                    # limit failed attempts\n' +
'ClientAliveInterval 300           # timeout idle connections\n' +
'ClientAliveCountMax 2             # disconnect after 2 missed keepalives\n' +
'AllowUsers deploy admin           # whitelist specific users\n' +
'X11Forwarding no                  # disable X11 forwarding\n' +
'AllowTcpForwarding no             # disable TCP forwarding\n' +
'\n' +
'# Apply changes\n' +
'# sudo sshd -t          # test config syntax\n' +
'# sudo systemctl restart sshd\n' +
'\n' +
'# Additional: fail2ban for brute-force protection\n' +
'# apt install fail2ban\n' +
'# systemctl enable --now fail2ban'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? 'SSH 隧道与端口转发' : 'SSH Tunneling & Port Forwarding'}
      </h3>
      <pre style={preStyle}><code>{'# Local port forwarding: access remote service on local port\n' +
'# Forwards localhost:5432 → remote-db-host:5432 through ssh-server\n' +
'ssh -L 5432:remote-db-host:5432 user@ssh-server\n' +
'\n' +
'# Remote port forwarding: expose local service to remote\n' +
'# Makes local:3000 available as remote:8080\n' +
'ssh -R 8080:localhost:3000 user@remote-server\n' +
'\n' +
'# Dynamic SOCKS proxy\n' +
'ssh -D 1080 user@proxy-server\n' +
'# Then configure browser to use SOCKS5 proxy at localhost:1080\n' +
'\n' +
'# Persistent tunnel with autossh\n' +
'autossh -M 20000 -f -N -L 5432:db:5432 user@bastion'}</code></pre>

      {/* ===== Section 10: Firewall ===== */}
      <h2 style={h2Style}>
        {isZh ? '10. 防火墙配置（iptables / ufw / firewalld）' : '10. Firewall Configuration (iptables / ufw / firewalld)'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Linux 防火墙是服务器安全的核心。iptables 是底层工具，ufw (Ubuntu) 和 firewalld (RHEL) 是更友好的前端。'
          : 'The Linux firewall is central to server security. iptables is the low-level tool; ufw (Ubuntu) and firewalld (RHEL) are friendlier frontends.'}
      </p>

      <h3 style={h3Style}>iptables</h3>
      <pre style={preStyle}><code>{'# View current rules\n' +
'iptables -L -n -v               # list all rules with numbers\n' +
'iptables -L -n --line-numbers   # with line numbers for deletion\n' +
'\n' +
'# Default policy: drop everything, allow only what we specify\n' +
'iptables -P INPUT DROP\n' +
'iptables -P FORWARD DROP\n' +
'iptables -P OUTPUT ACCEPT\n' +
'\n' +
'# Allow loopback\n' +
'iptables -A INPUT -i lo -j ACCEPT\n' +
'\n' +
'# Allow established connections\n' +
'iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT\n' +
'\n' +
'# Allow SSH (port 2222)\n' +
'iptables -A INPUT -p tcp --dport 2222 -j ACCEPT\n' +
'\n' +
'# Allow HTTP and HTTPS\n' +
'iptables -A INPUT -p tcp --dport 80 -j ACCEPT\n' +
'iptables -A INPUT -p tcp --dport 443 -j ACCEPT\n' +
'\n' +
'# Rate limit SSH to prevent brute force\n' +
'iptables -A INPUT -p tcp --dport 2222 -m limit --limit 3/min \\\n' +
'  --limit-burst 5 -j ACCEPT\n' +
'\n' +
'# Block a specific IP\n' +
'iptables -A INPUT -s 203.0.113.42 -j DROP\n' +
'\n' +
'# Delete a rule by line number\n' +
'iptables -D INPUT 3\n' +
'\n' +
'# Save rules (persist across reboot)\n' +
'iptables-save > /etc/iptables/rules.v4\n' +
'# Restore\n' +
'iptables-restore < /etc/iptables/rules.v4\n' +
'# Or install: apt install iptables-persistent'}</code></pre>

      <h3 style={h3Style}>ufw (Ubuntu)</h3>
      <pre style={preStyle}><code>{'# Enable/disable\n' +
'ufw enable\n' +
'ufw disable\n' +
'ufw status verbose\n' +
'\n' +
'# Default policies\n' +
'ufw default deny incoming\n' +
'ufw default allow outgoing\n' +
'\n' +
'# Allow services\n' +
'ufw allow ssh               # port 22\n' +
'ufw allow 2222/tcp           # custom SSH port\n' +
'ufw allow http               # port 80\n' +
'ufw allow https              # port 443\n' +
'ufw allow from 10.0.0.0/24   # allow entire subnet\n' +
'\n' +
'# Allow port range\n' +
'ufw allow 3000:3010/tcp\n' +
'\n' +
'# Remove a rule\n' +
'ufw delete allow http\n' +
'ufw status numbered          # show rule numbers\n' +
'ufw delete 3                 # delete by number\n' +
'\n' +
'# Application profiles\n' +
'ufw app list                 # list known apps\n' +
'ufw allow "Nginx Full"       # allow both HTTP and HTTPS'}</code></pre>

      <h3 style={h3Style}>firewalld (RHEL/CentOS)</h3>
      <pre style={preStyle}><code>{'# Check status\n' +
'firewall-cmd --state\n' +
'firewall-cmd --list-all\n' +
'\n' +
'# Add services permanently\n' +
'firewall-cmd --permanent --add-service=http\n' +
'firewall-cmd --permanent --add-service=https\n' +
'firewall-cmd --permanent --add-port=3000/tcp\n' +
'\n' +
'# Remove a service\n' +
'firewall-cmd --permanent --remove-service=ftp\n' +
'\n' +
'# Reload to apply\n' +
'firewall-cmd --reload\n' +
'\n' +
'# Zone management\n' +
'firewall-cmd --get-active-zones\n' +
'firewall-cmd --zone=public --list-all'}</code></pre>

      {/* ===== Section 11: Disk Management ===== */}
      <h2 style={h2Style}>
        {isZh ? '11. 磁盘管理' : '11. Disk Management'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '磁盘管理涉及分区、文件系统创建、挂载和逻辑卷管理 (LVM)。理解这些对于服务器管理至关重要。'
          : 'Disk management involves partitioning, filesystem creation, mounting, and Logical Volume Management (LVM). Understanding these is critical for server administration.'}
      </p>

      <pre style={preStyle}><code>{'# View disk usage\n' +
'df -h                       # filesystem usage (human-readable)\n' +
'df -ih                      # inode usage\n' +
'du -sh /var/log              # total size of a directory\n' +
'du -h --max-depth=1 /       # size of each top-level directory\n' +
'\n' +
'# Block devices and partitions\n' +
'lsblk                        # tree view of block devices\n' +
'lsblk -f                     # show filesystem types\n' +
'fdisk -l                     # list all disks and partitions\n' +
'blkid                        # show UUIDs and labels\n' +
'\n' +
'# Partition a new disk (GPT)\n' +
'gdisk /dev/sdb               # interactive GPT partitioning\n' +
'# Or use parted for scriptable partitioning:\n' +
'parted /dev/sdb mklabel gpt\n' +
'parted /dev/sdb mkpart primary ext4 0% 100%\n' +
'\n' +
'# Create filesystem\n' +
'mkfs.ext4 /dev/sdb1          # ext4 filesystem\n' +
'mkfs.xfs /dev/sdb1           # XFS filesystem\n' +
'\n' +
'# Mount\n' +
'mount /dev/sdb1 /mnt/data\n' +
'umount /mnt/data\n' +
'\n' +
'# Persistent mount via /etc/fstab\n' +
'# UUID=xxxx-xxxx  /mnt/data  ext4  defaults,noatime  0  2\n' +
'# Always test: mount -a  (mounts all fstab entries)'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? 'LVM 逻辑卷管理' : 'LVM (Logical Volume Manager)'}
      </h3>
      <pre style={preStyle}><code>{'# LVM layers: Physical Volume (PV) → Volume Group (VG) → Logical Volume (LV)\n' +
'\n' +
'# Create physical volume\n' +
'pvcreate /dev/sdb1 /dev/sdc1\n' +
'\n' +
'# Create volume group\n' +
'vgcreate data-vg /dev/sdb1 /dev/sdc1\n' +
'\n' +
'# Create logical volume (50GB)\n' +
'lvcreate -L 50G -n app-lv data-vg\n' +
'\n' +
'# Create filesystem and mount\n' +
'mkfs.ext4 /dev/data-vg/app-lv\n' +
'mount /dev/data-vg/app-lv /opt/app\n' +
'\n' +
'# Extend logical volume (add 20GB)\n' +
'lvextend -L +20G /dev/data-vg/app-lv\n' +
'resize2fs /dev/data-vg/app-lv     # resize ext4\n' +
'# xfs_growfs /opt/app              # resize XFS\n' +
'\n' +
'# View LVM status\n' +
'pvs     # physical volumes\n' +
'vgs     # volume groups\n' +
'lvs     # logical volumes\n' +
'lsblk   # verify layout'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? 'SWAP 管理' : 'Swap Management'}
      </h3>
      <pre style={preStyle}><code>{'# Check current swap\n' +
'swapon --show\n' +
'free -h\n' +
'\n' +
'# Create a swap file (4GB)\n' +
'fallocate -l 4G /swapfile\n' +
'chmod 600 /swapfile\n' +
'mkswap /swapfile\n' +
'swapon /swapfile\n' +
'\n' +
'# Persist in /etc/fstab\n' +
'# /swapfile  none  swap  sw  0  0\n' +
'\n' +
'# Tune swappiness (0-100, lower = prefer RAM)\n' +
'cat /proc/sys/vm/swappiness        # check current\n' +
'sysctl vm.swappiness=10            # set temporarily\n' +
'# Persist: echo "vm.swappiness=10" >> /etc/sysctl.conf'}</code></pre>

      {/* ===== Section 12: System Monitoring ===== */}
      <h2 style={h2Style}>
        {isZh ? '12. 系统监控' : '12. System Monitoring'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '有效的系统监控可以帮助你在问题变成事故之前发现它们。Linux 提供了丰富的内置和第三方监控工具。'
          : 'Effective system monitoring helps you catch problems before they become incidents. Linux provides a rich set of built-in and third-party monitoring tools.'}
      </p>

      <h3 style={h3Style}>
        {isZh ? 'CPU 与内存监控' : 'CPU & Memory Monitoring'}
      </h3>
      <pre style={preStyle}><code>{'# CPU info\n' +
'nproc                        # number of CPUs\n' +
'lscpu                        # detailed CPU info\n' +
'cat /proc/cpuinfo            # raw CPU details\n' +
'\n' +
'# Memory\n' +
'free -h                      # memory usage (human-readable)\n' +
'cat /proc/meminfo            # detailed memory info\n' +
'\n' +
'# Real-time: top / htop\n' +
'top -bn1 | head -20          # batch mode, one snapshot\n' +
'htop                         # interactive (install: apt install htop)\n' +
'\n' +
'# vmstat: CPU, memory, IO at intervals\n' +
'vmstat 2 5                   # every 2 seconds, 5 iterations\n' +
'# Output columns:\n' +
'# r  = runnable processes\n' +
'# b  = blocked processes\n' +
'# si = swap in, so = swap out (non-zero = memory pressure)\n' +
'# us = user CPU, sy = system CPU, id = idle, wa = IO wait\n' +
'\n' +
'# mpstat: per-CPU usage\n' +
'mpstat -P ALL 2              # all CPUs every 2 seconds\n' +
'\n' +
'# sar: historical performance data\n' +
'sar -u 2 10                  # CPU usage every 2s, 10 times\n' +
'sar -r 2 10                  # memory usage\n' +
'sar -b 2 10                  # IO activity'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '磁盘 I/O 监控' : 'Disk I/O Monitoring'}
      </h3>
      <pre style={preStyle}><code>{'# iostat: disk throughput and latency\n' +
'iostat -xz 2                 # extended stats every 2 seconds\n' +
'# Key columns:\n' +
'# %util   = how busy the device is (>80% = bottleneck)\n' +
'# await   = avg IO wait time in ms\n' +
'# r/s,w/s = reads/writes per second\n' +
'\n' +
'# iotop: per-process IO usage (needs root)\n' +
'iotop -o                     # only show processes doing IO\n' +
'\n' +
'# Check for disk errors\n' +
'dmesg | grep -i error\n' +
'smartctl -a /dev/sda         # SMART data (install: smartmontools)'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '网络监控' : 'Network Monitoring'}
      </h3>
      <pre style={preStyle}><code>{'# Per-process network usage\n' +
'nethogs                      # like top for network (install: apt install nethogs)\n' +
'\n' +
'# Per-interface bandwidth\n' +
'iftop -i eth0                # real-time bandwidth by connection\n' +
'nload                        # simple bandwidth graph per interface\n' +
'\n' +
'# Connection statistics\n' +
'ss -s                        # summary: total, TCP, UDP connections\n' +
'ss -tnp state established    # all established TCP with process info\n' +
'\n' +
'# Packet capture\n' +
'tcpdump -i eth0 -n port 80 -c 100    # capture 100 HTTP packets\n' +
'tcpdump -i any -w trace.pcap         # write to file for Wireshark'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '日志分析' : 'Log Analysis'}
      </h3>
      <pre style={preStyle}><code>{'# System logs\n' +
'journalctl -p err --since "1 hour ago"    # errors in last hour\n' +
'journalctl -u nginx --since today -f      # follow nginx logs today\n' +
'dmesg -T --level=err,warn                 # kernel errors/warnings\n' +
'\n' +
'# Traditional log files\n' +
'tail -f /var/log/syslog          # follow system log\n' +
'tail -f /var/log/auth.log        # authentication events\n' +
'tail -f /var/log/nginx/error.log # web server errors\n' +
'\n' +
'# Useful log analysis one-liners\n' +
'# Top 10 IPs hitting the server\n' +
'awk \'{print $1}\' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head\n' +
'\n' +
'# Failed SSH login attempts\n' +
'grep "Failed password" /var/log/auth.log | awk \'{print $11}\' | sort | uniq -c | sort -rn\n' +
'\n' +
'# Log rotation config\n' +
'# /etc/logrotate.d/myapp\n' +
'# /var/log/myapp/*.log {\n' +
'#   daily\n' +
'#   rotate 14\n' +
'#   compress\n' +
'#   delaycompress\n' +
'#   missingok\n' +
'#   notifempty\n' +
'#   create 0640 deploy deploy\n' +
'#   postrotate\n' +
'#     systemctl reload myapp\n' +
'#   endscript\n' +
'# }'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '一体化监控脚本' : 'All-in-One Monitoring Script'}
      </h3>
      <pre style={preStyle}><code>{'#!/usr/bin/env bash\n' +
'# Quick server health check\n' +
'set -euo pipefail\n' +
'\n' +
'echo "=== System Info ==="\n' +
'hostname\n' +
'uptime\n' +
'uname -r\n' +
'\n' +
'echo ""\n' +
'echo "=== CPU Load ==="\n' +
'cat /proc/loadavg\n' +
'echo "CPUs: \\$(nproc)"\n' +
'\n' +
'echo ""\n' +
'echo "=== Memory ==="\n' +
'free -h | head -2\n' +
'\n' +
'echo ""\n' +
'echo "=== Disk Usage (>80%) ==="\n' +
'df -h | awk \'NR==1 || int(\\$5)>80\'\n' +
'\n' +
'echo ""\n' +
'echo "=== Top 5 CPU Consumers ==="\n' +
'ps aux --sort=-%cpu | head -6\n' +
'\n' +
'echo ""\n' +
'echo "=== Top 5 Memory Consumers ==="\n' +
'ps aux --sort=-%mem | head -6\n' +
'\n' +
'echo ""\n' +
'echo "=== Failed Services ==="\n' +
'systemctl --failed --no-pager\n' +
'\n' +
'echo ""\n' +
'echo "=== Recent Errors (last 30 min) ==="\n' +
'journalctl -p err --since "30 minutes ago" --no-pager | tail -10'}</code></pre>

      {/* ===== Section 13: Bonus Tips ===== */}
      <h2 style={h2Style}>
        {isZh ? '13. 实用技巧与速查' : '13. Practical Tips & Quick Reference'}
      </h2>

      <h3 style={h3Style}>
        {isZh ? '文本处理三剑客' : 'Text Processing Triad'}
      </h3>
      <pre style={preStyle}><code>{'# grep — search text\n' +
'grep -rn "TODO" src/            # recursive search with line numbers\n' +
'grep -E "error|fail" app.log    # extended regex (OR)\n' +
'grep -c "200" access.log        # count matches\n' +
'grep -v "^#" config.conf        # exclude comment lines\n' +
'\n' +
'# sed — stream editor\n' +
'sed -i \'s/old/new/g\' file.txt   # in-place global replace\n' +
'sed -n \'10,20p\' file.txt        # print lines 10-20\n' +
'sed \'/^$/d\' file.txt            # delete empty lines\n' +
'\n' +
'# awk — columnar data processing\n' +
'awk \'{print $1, $3}\' data.txt           # print columns 1 and 3\n' +
'awk -F: \'{print $1}\' /etc/passwd        # colon delimiter, usernames\n' +
'awk \'$3 > 1000\' data.txt               # filter rows where col3 > 1000\n' +
'awk \'{sum += $2} END {print sum}\' data  # sum column 2'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? 'I/O 重定向与管道' : 'I/O Redirection & Pipes'}
      </h3>
      <pre style={preStyle}><code>{'# Standard streams: stdin(0), stdout(1), stderr(2)\n' +
'command > file.txt       # redirect stdout (overwrite)\n' +
'command >> file.txt      # redirect stdout (append)\n' +
'command 2> error.log     # redirect stderr\n' +
'command &> all.log       # redirect both stdout and stderr\n' +
'command 2>&1             # merge stderr into stdout\n' +
'\n' +
'# Pipes: connect stdout of one command to stdin of next\n' +
'cat access.log | grep "POST" | awk \'{print $1}\' | sort -u | wc -l\n' +
'\n' +
'# Process substitution\n' +
'diff <(sort file1.txt) <(sort file2.txt)\n' +
'\n' +
'# tee: write to file AND stdout simultaneously\n' +
'command | tee output.log          # display and save\n' +
'command | tee -a output.log       # display and append'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '环境变量与 Shell 配置' : 'Environment Variables & Shell Config'}
      </h3>
      <pre style={preStyle}><code>{'# View and set environment variables\n' +
'env                          # list all env vars\n' +
'echo "\\${PATH}"               # print specific variable\n' +
'export MY_VAR="hello"        # set for this session + child processes\n' +
'\n' +
'# Persist across sessions\n' +
'# ~/.bashrc      — interactive non-login shells\n' +
'# ~/.bash_profile — login shells (SSH, new terminal)\n' +
'# ~/.profile      — POSIX, read by many shells\n' +
'# /etc/environment — system-wide variables\n' +
'\n' +
'# Common PATH modification\n' +
'export PATH="\\${HOME}/.local/bin:\\${PATH}"\n' +
'\n' +
'# Useful aliases (add to ~/.bashrc)\n' +
'alias ll="ls -lah"\n' +
'alias gs="git status"\n' +
'alias dc="docker compose"\n' +
'alias k="kubectl"\n' +
'\n' +
'# Reload after editing\n' +
'source ~/.bashrc'}</code></pre>

      {/* Conclusion */}
      <h2 style={h2Style}>
        {isZh ? '总结' : 'Conclusion'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Linux 是每个开发者工具箱中不可或缺的一部分。从文件系统层次结构到权限管理、从进程控制到 systemd 服务、从 Shell 脚本编程到防火墙配置——掌握这些核心技能将让你在日常开发、部署和运维中事半功倍。'
          : 'Linux is an indispensable part of every developer\'s toolkit. From the filesystem hierarchy to permission management, from process control to systemd services, from shell scripting to firewall configuration — mastering these core skills will make your daily development, deployment, and operations work dramatically more efficient.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '建议从基础命令开始，逐步深入各个专题。在实际服务器上练习是最好的学习方式——搭建一个虚拟机或云实例，动手操作本文中的每个命令，你将很快建立起扎实的 Linux 运维能力。'
          : 'Start with the basics and gradually dig deeper into each topic. Practicing on real servers is the best way to learn — spin up a virtual machine or cloud instance, hands-on every command in this guide, and you will quickly build solid Linux administration skills.'}
      </p>

      {/* FAQ */}
      <h2 style={h2Style}>
        {isZh ? '常见问题' : 'Frequently Asked Questions'}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqSchema.mainEntity.map((faq, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '20px 24px',
              background: '#ffffff',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b', margin: '0 0 10px 0' }}>
              {faq.name}
            </h3>
            <p style={{ color: '#475569', lineHeight: '1.7', margin: '0' }}>
              {faq.acceptedAnswer.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
