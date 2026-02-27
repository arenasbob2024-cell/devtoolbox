'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'The Ultimate Linux Command Guide: 100+ Essential Commands for Developers',
    metaDesc: 'Master Linux with this comprehensive guide covering 100+ essential commands. From file operations and text processing to networking, security, and shell scripting with practical examples.',
    intro: 'Linux powers over 96% of the world\'s top web servers, and mastering the command line is a non-negotiable skill for every developer, DevOps engineer, and sysadmin. This comprehensive guide covers <strong>100+ essential Linux commands</strong> organized into 13 categories with real-world examples you can copy and use immediately.',
    tldr: 'TL;DR',
    tldrText: 'This guide covers 100+ Linux commands across 13 categories: file navigation, file operations, text processing, process management, networking, disk management, user management, package management, shell scripting, I/O redirection, compression, system monitoring, and security. Each section includes practical examples with explanations.',
    keyTakeaways: 'Key Takeaways',
    takeaway1: 'Master file navigation (ls, cd, find) and operations (cp, mv, chmod) for daily workflow efficiency',
    takeaway2: 'Learn text processing tools (grep, sed, awk) to manipulate data streams like a pro',
    takeaway3: 'Understand process management (ps, systemctl) and networking (curl, ssh, rsync) for server administration',
    takeaway4: 'Use shell scripting to automate repetitive tasks with variables, loops, and functions',
    takeaway5: 'Secure your systems with iptables/ufw, fail2ban, and SSH key-based authentication',
    h2_filesystem: '1. File System Navigation',
    p_filesystem: 'Navigating the Linux file system is the most fundamental skill. These commands help you move around directories, list contents, and find files efficiently.',
    h2_fileops: '2. File Operations',
    p_fileops: 'File manipulation commands are the bread and butter of daily Linux work. From copying files to changing permissions, these commands handle all file operations.',
    h2_text: '3. Text Processing',
    p_text: 'Linux excels at text processing. These powerful commands let you search, transform, filter, and analyze text data — essential for log analysis, data extraction, and automation.',
    h2_process: '4. Process Management',
    p_process: 'Managing running processes is critical for server administration. These commands help you monitor, control, and manage system services.',
    h2_network: '5. Networking',
    p_network: 'Networking commands are essential for server management, API testing, file transfer, and debugging connectivity issues.',
    h2_disk: '6. Disk & Storage',
    p_disk: 'Monitoring and managing disk space prevents outages and ensures your servers run smoothly. These commands help you track usage and manage storage devices.',
    h2_user: '7. User Management',
    p_user: 'User and permission management is fundamental to Linux security. These commands control who can access what on your system.',
    h2_package: '8. Package Management',
    p_package: 'Different Linux distributions use different package managers. Here is a comparison of the most common ones with equivalent commands.',
    h2_shell: '9. Shell Scripting Essentials',
    p_shell: 'Shell scripting automates repetitive tasks and creates powerful workflows. Master these fundamentals to write effective Bash scripts.',
    h2_io: '10. I/O Redirection & Pipes',
    p_io: 'Redirection and pipes are what make the Linux command line truly powerful. They let you chain commands together and control where data flows.',
    h2_compression: '11. Compression & Archives',
    p_compression: 'Compressing files saves disk space and speeds up file transfers. These are the most commonly used archiving and compression tools.',
    h2_monitoring: '12. System Monitoring',
    p_monitoring: 'Proactive system monitoring helps you identify performance bottlenecks, memory leaks, and hardware issues before they cause outages.',
    h2_security: '13. Security Commands',
    p_security: 'Security is not optional. These commands help you configure firewalls, manage SSH keys, and protect your systems from unauthorized access.',
    h2_faq: 'Frequently Asked Questions',
    faq1q: 'What is the most important Linux command to learn first?',
    faq1a: 'Start with navigation commands: ls, cd, and pwd. Then learn file operations: cp, mv, rm, and mkdir. These form the foundation for everything else. Once comfortable, move to grep and pipes (|) which dramatically increase your productivity.',
    faq2q: 'What is the difference between apt and yum?',
    faq2a: 'apt is the package manager for Debian-based distributions (Ubuntu, Debian, Linux Mint), while yum (and its successor dnf) is used on Red Hat-based distributions (RHEL, CentOS, Fedora). They serve the same purpose but have different syntax. For example, "apt install nginx" vs "yum install nginx".',
    faq3q: 'How do I find which process is using a specific port?',
    faq3a: 'Use "ss -tlnp | grep :PORT" or "lsof -i :PORT" to find which process is listening on a specific port. For example, "ss -tlnp | grep :80" shows which process is using port 80. You can also use "netstat -tlnp | grep :PORT" on older systems.',
    faq4q: 'What is the difference between grep, sed, and awk?',
    faq4a: 'grep searches for patterns and prints matching lines. sed is a stream editor that transforms text (find and replace, delete lines, insert text). awk is a full programming language for text processing that excels at working with columnar data. Use grep to find, sed to replace, and awk to extract and compute.',
    faq5q: 'How do I run a command in the background that survives logout?',
    faq5a: 'Use nohup with &: "nohup ./script.sh &". This redirects output to nohup.out and detaches from the terminal. For more control, use screen or tmux sessions, or create a systemd service for production workloads.',
    faq6q: 'What is the safest way to delete files in Linux?',
    faq6a: 'Always use "rm -i" for interactive deletion that asks for confirmation. Never use "rm -rf /" or "rm -rf *" without double-checking your current directory with pwd first. Consider using trash-cli instead of rm for recoverable deletions. For scripts, use absolute paths to avoid accidents.',
    faq7q: 'How do I check disk space usage on Linux?',
    faq7a: 'Use "df -h" to see filesystem-level disk usage in human-readable format. Use "du -sh /path" to check the size of a specific directory. To find the largest files, use "du -ah /path | sort -rh | head -20". The ncdu tool provides an interactive disk usage analyzer.',
    faq8q: 'How do I set up SSH key-based authentication?',
    faq8a: 'Generate a key pair with "ssh-keygen -t ed25519". Copy the public key to the server with "ssh-copy-id user@server". Then disable password authentication in /etc/ssh/sshd_config by setting "PasswordAuthentication no" and restart sshd. This is more secure than password-based login.',
    conclusion: 'This guide covers the essential Linux commands every developer needs. Bookmark it as a reference and practice these commands regularly. The more you use the command line, the more efficient you become. For hands-on practice, set up a virtual machine or use our online tools to experiment safely.',
    command: 'Command',
    description: 'Description',
    action: 'Action',
    distro: 'Distribution',
    equivalent: 'Equivalent',
  },
  zh: {
    title: 'Linux 命令终极指南：开发者必备的 100+ 个核心命令',
    metaDesc: '通过这份全面指南掌握 Linux，涵盖 100+ 个核心命令。从文件操作、文本处理到网络、安全和 Shell 脚本，包含实用示例。',
    intro: 'Linux 驱动着全球超过 96% 的顶级 Web 服务器，掌握命令行是每个开发者、DevOps 工程师和系统管理员不可或缺的技能。这份全面指南涵盖 <strong>100+ 个核心 Linux 命令</strong>，分为 13 个类别，附带可立即复制使用的实际示例。',
    tldr: 'TL;DR',
    tldrText: '本指南涵盖 13 个类别中的 100+ 个 Linux 命令：文件导航、文件操作、文本处理、进程管理、网络、磁盘管理、用户管理、包管理、Shell 脚本、I/O 重定向、压缩、系统监控和安全。每个章节都包含带解释的实用示例。',
    keyTakeaways: '要点总结',
    takeaway1: '掌握文件导航（ls、cd、find）和操作（cp、mv、chmod）以提高日常工作效率',
    takeaway2: '学习文本处理工具（grep、sed、awk）像专家一样处理数据流',
    takeaway3: '理解进程管理（ps、systemctl）和网络（curl、ssh、rsync）以进行服务器管理',
    takeaway4: '使用 Shell 脚本通过变量、循环和函数自动化重复性任务',
    takeaway5: '使用 iptables/ufw、fail2ban 和 SSH 密钥认证来保护系统安全',
    h2_filesystem: '1. 文件系统导航',
    p_filesystem: '导航 Linux 文件系统是最基本的技能。这些命令帮助你在目录间移动、列出内容并高效查找文件。',
    h2_fileops: '2. 文件操作',
    p_fileops: '文件操作命令是日常 Linux 工作的基础。从复制文件到更改权限，这些命令处理所有文件操作。',
    h2_text: '3. 文本处理',
    p_text: 'Linux 在文本处理方面表现出色。这些强大的命令让你搜索、转换、过滤和分析文本数据——对日志分析、数据提取和自动化至关重要。',
    h2_process: '4. 进程管理',
    p_process: '管理运行中的进程对服务器管理至关重要。这些命令帮助你监控、控制和管理系统服务。',
    h2_network: '5. 网络',
    p_network: '网络命令对于服务器管理、API 测试、文件传输和调试连接问题必不可少。',
    h2_disk: '6. 磁盘与存储',
    p_disk: '监控和管理磁盘空间可防止中断并确保服务器平稳运行。这些命令帮助你跟踪使用情况和管理存储设备。',
    h2_user: '7. 用户管理',
    p_user: '用户和权限管理是 Linux 安全的基础。这些命令控制谁可以访问系统上的什么资源。',
    h2_package: '8. 包管理',
    p_package: '不同的 Linux 发行版使用不同的包管理器。以下是最常用包管理器的命令对比。',
    h2_shell: '9. Shell 脚本基础',
    p_shell: 'Shell 脚本自动化重复性任务并创建强大的工作流。掌握这些基础知识来编写高效的 Bash 脚本。',
    h2_io: '10. I/O 重定向与管道',
    p_io: '重定向和管道是让 Linux 命令行真正强大的关键。它们让你将命令链接在一起并控制数据流向。',
    h2_compression: '11. 压缩与归档',
    p_compression: '压缩文件可节省磁盘空间并加快文件传输速度。这些是最常用的归档和压缩工具。',
    h2_monitoring: '12. 系统监控',
    p_monitoring: '主动的系统监控帮助你在性能瓶颈、内存泄漏和硬件问题导致中断之前识别它们。',
    h2_security: '13. 安全命令',
    p_security: '安全不是可选项。这些命令帮助你配置防火墙、管理 SSH 密钥并保护系统免受未授权访问。',
    h2_faq: '常见问题',
    faq1q: '最先应该学习哪个 Linux 命令？',
    faq1a: '从导航命令开始：ls、cd 和 pwd。然后学习文件操作：cp、mv、rm 和 mkdir。这些构成了其他一切的基础。熟练后，学习 grep 和管道（|），它们会显著提高你的生产力。',
    faq2q: 'apt 和 yum 有什么区别？',
    faq2a: 'apt 是基于 Debian 的发行版（Ubuntu、Debian、Linux Mint）的包管理器，而 yum（及其后继者 dnf）用于基于 Red Hat 的发行版（RHEL、CentOS、Fedora）。它们的功能相同但语法不同。例如，"apt install nginx" 对应 "yum install nginx"。',
    faq3q: '如何查找哪个进程在使用特定端口？',
    faq3a: '使用 "ss -tlnp | grep :端口号" 或 "lsof -i :端口号" 来查找监听特定端口的进程。例如，"ss -tlnp | grep :80" 显示使用 80 端口的进程。在较旧的系统上也可以使用 "netstat -tlnp | grep :端口号"。',
    faq4q: 'grep、sed 和 awk 有什么区别？',
    faq4a: 'grep 搜索模式并打印匹配行。sed 是流编辑器，用于转换文本（查找替换、删除行、插入文本）。awk 是用于文本处理的完整编程语言，擅长处理列式数据。用 grep 查找，用 sed 替换，用 awk 提取和计算。',
    faq5q: '如何在后台运行命令并在退出登录后继续运行？',
    faq5a: '使用 nohup 加 &："nohup ./script.sh &"。这会将输出重定向到 nohup.out 并脱离终端。如需更多控制，使用 screen 或 tmux 会话，或为生产工作负载创建 systemd 服务。',
    faq6q: '在 Linux 中删除文件最安全的方式是什么？',
    faq6a: '始终使用 "rm -i" 进行交互式删除，它会要求确认。永远不要在没有先用 pwd 确认当前目录的情况下使用 "rm -rf /" 或 "rm -rf *"。考虑使用 trash-cli 代替 rm 以实现可恢复删除。在脚本中使用绝对路径以避免意外。',
    faq7q: '如何检查 Linux 上的磁盘空间使用情况？',
    faq7a: '使用 "df -h" 以人类可读格式查看文件系统级磁盘使用情况。使用 "du -sh /路径" 检查特定目录的大小。要查找最大的文件，使用 "du -ah /路径 | sort -rh | head -20"。ncdu 工具提供交互式磁盘使用分析器。',
    faq8q: '如何设置 SSH 密钥认证？',
    faq8a: '使用 "ssh-keygen -t ed25519" 生成密钥对。使用 "ssh-copy-id user@server" 将公钥复制到服务器。然后在 /etc/ssh/sshd_config 中设置 "PasswordAuthentication no" 禁用密码认证并重启 sshd。这比基于密码的登录更安全。',
    conclusion: '本指南涵盖了每个开发者需要的核心 Linux 命令。将其收藏为参考并定期练习这些命令。你使用命令行越多，效率就越高。对于动手练习，可以搭建虚拟机或使用我们的在线工具安全地进行实验。',
    command: '命令',
    description: '描述',
    action: '操作',
    distro: '发行版',
    equivalent: '等价命令',
  },
};

export default function LinuxCommandGuide({ lang }: { lang: string }) {
  const isZh = lang === 'zh';
  const t = translations[lang] || translations.en;

  const containerStyle: React.CSSProperties = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 16px',
    lineHeight: '1.8',
    color: '#1e293b',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.6rem',
    fontWeight: 700,
    marginTop: '2.5rem',
    marginBottom: '1rem',
    color: '#0f172a',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '0.5rem',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginTop: '1.8rem',
    marginBottom: '0.75rem',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    marginBottom: '1rem',
    fontSize: '1.05rem',
    color: '#334155',
  };

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '16px 20px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    marginBottom: '1.2rem',
  };

  const tldrStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '16px 20px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '1.5rem',
  };

  const takeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '16px 20px',
    borderRadius: '8px',
    marginBottom: '1.5rem',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1.5rem',
    fontSize: '0.95rem',
  };

  const thStyle: React.CSSProperties = {
    background: '#f1f5f9',
    padding: '10px 12px',
    textAlign: 'left',
    fontWeight: 600,
    borderBottom: '2px solid #e2e8f0',
    color: '#0f172a',
  };

  const tdStyle: React.CSSProperties = {
    padding: '10px 12px',
    borderBottom: '1px solid #f1f5f9',
    verticalAlign: 'top',
  };

  const codeInlineStyle: React.CSSProperties = {
    background: '#f1f5f9',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.9em',
    fontFamily: 'monospace',
    color: '#e11d48',
  };

  const tipStyle: React.CSSProperties = {
    background: '#fefce8',
    borderLeft: '4px solid #eab308',
    padding: '12px 16px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '1.2rem',
    fontSize: '0.95rem',
  };

  const ulStyle: React.CSSProperties = {
    paddingLeft: '1.5rem',
    marginBottom: '1rem',
  };

  const liStyle: React.CSSProperties = {
    marginBottom: '0.5rem',
    color: '#334155',
  };

  const faqItemStyle: React.CSSProperties = {
    marginBottom: '1.5rem',
  };

  const faqQStyle: React.CSSProperties = {
    fontWeight: 600,
    fontSize: '1.05rem',
    color: '#0f172a',
    marginBottom: '0.5rem',
  };

  const faqAStyle: React.CSSProperties = {
    color: '#475569',
    lineHeight: '1.7',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
      { '@type': 'Question', name: t.faq6q, acceptedAnswer: { '@type': 'Answer', text: t.faq6a } },
      { '@type': 'Question', name: t.faq7q, acceptedAnswer: { '@type': 'Answer', text: t.faq7a } },
      { '@type': 'Question', name: t.faq8q, acceptedAnswer: { '@type': 'Answer', text: t.faq8a } },
    ],
  };

  return (
    <div style={containerStyle}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Introduction */}
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* TL;DR */}
      <div style={tldrStyle}>
        <strong>{t.tldr}: </strong>
        {t.tldrText}
      </div>

      {/* Key Takeaways */}
      <div style={takeawaysStyle}>
        <strong style={{ fontSize: '1.1rem', display: 'block', marginBottom: '0.75rem' }}>{t.keyTakeaways}</strong>
        <ul style={ulStyle}>
          <li style={liStyle}>{t.takeaway1}</li>
          <li style={liStyle}>{t.takeaway2}</li>
          <li style={liStyle}>{t.takeaway3}</li>
          <li style={liStyle}>{t.takeaway4}</li>
          <li style={liStyle}>{t.takeaway5}</li>
        </ul>
      </div>

      {/* ======================= SECTION 1: File System Navigation ======================= */}
      <h2 style={h2Style}>{t.h2_filesystem}</h2>
      <p style={pStyle}>{t.p_filesystem}</p>

      <h3 style={h3Style}>{isZh ? '列出文件和目录 — ls' : 'Listing Files and Directories — ls'}</h3>
      <pre style={preStyle}><code>{'# Basic listing\nls\n\n# Long format with permissions, size, date\nls -la\n\n# Sort by modification time (newest first)\nls -lt\n\n# Sort by file size (largest first)\nls -lS\n\n# Human-readable file sizes\nls -lh\n\n# List only directories\nls -d */\n\n# Recursive listing\nls -R /var/log/'}</code></pre>

      <h3 style={h3Style}>{isZh ? '改变目录 — cd' : 'Changing Directories — cd'}</h3>
      <pre style={preStyle}><code>{'# Go to home directory\ncd ~\ncd\n\n# Go to previous directory\ncd -\n\n# Go up one level\ncd ..\n\n# Go up two levels\ncd ../..\n\n# Absolute path\ncd /var/log/nginx\n\n# Relative path\ncd projects/myapp'}</code></pre>

      <h3 style={h3Style}>{isZh ? '查找文件 — find 和 locate' : 'Finding Files — find and locate'}</h3>
      <pre style={preStyle}><code>{'# Find files by name\nfind /home -name "*.log"\n\n# Case-insensitive search\nfind / -iname "readme.md"\n\n# Find files modified in last 24 hours\nfind /var/log -mtime -1\n\n# Find files larger than 100MB\nfind / -size +100M\n\n# Find and delete empty directories\nfind /tmp -type d -empty -delete\n\n# Find files by permission\nfind /home -perm 777\n\n# Find and execute a command\nfind . -name "*.tmp" -exec rm {} \\;\n\n# Fast locate (uses database, run updatedb first)\nsudo updatedb\nlocate nginx.conf'}</code></pre>

      <h3 style={h3Style}>{isZh ? '目录树 — tree 和 pwd' : 'Directory Tree — tree and pwd'}</h3>
      <pre style={preStyle}><code>{'# Print current working directory\npwd\n\n# Display directory tree\ntree\n\n# Limit depth to 2 levels\ntree -L 2\n\n# Show only directories\ntree -d\n\n# Show tree with file sizes\ntree -sh\n\n# Exclude node_modules and .git\ntree -I "node_modules|.git"'}</code></pre>

      <h3 style={h3Style}>{isZh ? '重要的 Linux 目录结构' : 'Important Linux Directory Structure'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '路径' : 'Path'}</th>
            <th style={thStyle}>{t.description}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>/</code></td><td style={tdStyle}>{isZh ? '根目录 — 文件系统的顶层' : 'Root directory — top of the filesystem'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>/home</code></td><td style={tdStyle}>{isZh ? '用户主目录' : 'User home directories'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>/etc</code></td><td style={tdStyle}>{isZh ? '系统配置文件' : 'System configuration files'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>/var</code></td><td style={tdStyle}>{isZh ? '可变数据（日志、缓存、邮件）' : 'Variable data (logs, cache, mail)'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>/var/log</code></td><td style={tdStyle}>{isZh ? '系统和应用程序日志' : 'System and application logs'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>/tmp</code></td><td style={tdStyle}>{isZh ? '临时文件（重启时清除）' : 'Temporary files (cleared on reboot)'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>/usr</code></td><td style={tdStyle}>{isZh ? '用户程序和数据' : 'User programs and data'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>/usr/local</code></td><td style={tdStyle}>{isZh ? '本地安装的软件' : 'Locally installed software'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>/opt</code></td><td style={tdStyle}>{isZh ? '可选应用软件包' : 'Optional application software'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>/proc</code></td><td style={tdStyle}>{isZh ? '虚拟文件系统 — 进程和内核信息' : 'Virtual filesystem — process and kernel info'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>/dev</code></td><td style={tdStyle}>{isZh ? '设备文件' : 'Device files'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>/mnt</code></td><td style={tdStyle}>{isZh ? '临时挂载点' : 'Temporary mount points'}</td></tr>
        </tbody>
      </table>

      {/* ======================= SECTION 2: File Operations ======================= */}
      <h2 style={h2Style}>{t.h2_fileops}</h2>
      <p style={pStyle}>{t.p_fileops}</p>

      <h3 style={h3Style}>{isZh ? '复制、移动和删除' : 'Copy, Move, and Delete'}</h3>
      <pre style={preStyle}><code>{'# Copy a file\ncp source.txt destination.txt\n\n# Copy directory recursively\ncp -r /src/project /backup/project\n\n# Copy preserving attributes (timestamps, permissions)\ncp -a /src /dest\n\n# Move / rename a file\nmv oldname.txt newname.txt\n\n# Move multiple files to a directory\nmv *.log /var/archive/\n\n# Remove a file\nrm unwanted.txt\n\n# Remove with confirmation prompt\nrm -i important.txt\n\n# Remove directory recursively (DANGEROUS — double check!)\nrm -rf /tmp/build-cache\n\n# Create directories (including parents)\nmkdir -p /var/www/mysite/assets/images'}</code></pre>

      <h3 style={h3Style}>{isZh ? '权限与所有权 — chmod 和 chown' : 'Permissions & Ownership — chmod and chown'}</h3>
      <pre style={preStyle}><code>{'# Set file to readable/writable by owner only\nchmod 600 ~/.ssh/id_rsa\n\n# Standard permissions: owner=rwx, group/others=rx\nchmod 755 deploy.sh\n\n# Standard permissions for regular files\nchmod 644 index.html\n\n# Add execute permission for owner\nchmod u+x script.sh\n\n# Remove write permission for group and others\nchmod go-w config.yml\n\n# Recursive permission change\nchmod -R 755 /var/www/html\n\n# Change file owner\nchown www-data:www-data /var/www/html\n\n# Change owner recursively\nchown -R deploy:deploy /opt/app'}</code></pre>

      <h3 style={h3Style}>{isZh ? '符号链接 — ln' : 'Symbolic Links — ln'}</h3>
      <pre style={preStyle}><code>{'# Create a symbolic (soft) link\nln -s /etc/nginx/sites-available/mysite /etc/nginx/sites-enabled/mysite\n\n# Create a hard link\nln original.txt hardlink.txt\n\n# Verify a symlink target\nreadlink -f /usr/bin/python3\n\n# Find broken symlinks\nfind /usr/local/bin -type l ! -exec test -e {} \\; -print'}</code></pre>

      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {isZh
          ? '使用 ln -sf 强制覆盖已存在的符号链接，避免先删除再创建的两步操作。'
          : 'Use ln -sf to force-overwrite an existing symlink instead of deleting and recreating it in two steps.'}
      </div>

      <h3 style={h3Style}>{isZh ? '文件内容查看' : 'Viewing File Contents'}</h3>
      <pre style={preStyle}><code>{'# Display entire file\ncat file.txt\n\n# Display with line numbers\ncat -n file.txt\n\n# View first 20 lines\nhead -20 file.txt\n\n# View last 20 lines\ntail -20 file.txt\n\n# Follow file in real time (great for logs)\ntail -f /var/log/syslog\n\n# Follow with line count\ntail -f -n 100 /var/log/nginx/access.log\n\n# Page through a file (scrollable)\nless /var/log/syslog\n# Press / to search, q to quit, G to go to end\n\n# Display file with line numbers and non-printing chars\ncat -An file.txt\n\n# Concatenate multiple files\ncat part1.txt part2.txt part3.txt > combined.txt\n\n# Create file from stdin (Ctrl+D to end)\ncat > notes.txt'}</code></pre>

      <h3 style={h3Style}>{isZh ? '文件比较和校验' : 'File Comparison and Checksums'}</h3>
      <pre style={preStyle}><code>{'# Compare two files\ndiff file1.txt file2.txt\n\n# Side-by-side comparison\ndiff -y file1.txt file2.txt\n\n# Unified diff format (like git)\ndiff -u old.conf new.conf\n\n# Compare directories\ndiff -r dir1/ dir2/\n\n# Generate MD5 checksum\nmd5sum file.tar.gz\n\n# Generate SHA256 checksum\nsha256sum file.tar.gz\n\n# Verify checksum file\nsha256sum -c checksums.sha256\n\n# Get file type information\nfile unknown-file\nfile /usr/bin/python3\n\n# Show file statistics\nstat file.txt'}</code></pre>

      {/* ======================= SECTION 3: Text Processing ======================= */}
      <h2 style={h2Style}>{t.h2_text}</h2>
      <p style={pStyle}>{t.p_text}</p>

      <h3 style={h3Style}>{isZh ? '搜索文本 — grep' : 'Searching Text — grep'}</h3>
      <pre style={preStyle}><code>{'# Search for a pattern in a file\ngrep "error" /var/log/syslog\n\n# Case-insensitive search\ngrep -i "warning" app.log\n\n# Recursive search in directories\ngrep -r "TODO" ./src\n\n# Show line numbers\ngrep -n "function" app.js\n\n# Show 3 lines of context around matches\ngrep -C 3 "Exception" error.log\n\n# Invert match (show lines NOT matching)\ngrep -v "DEBUG" app.log\n\n# Count matching lines\ngrep -c "error" /var/log/syslog\n\n# Search with regex\ngrep -E "^[0-9]{4}-[0-9]{2}" access.log\n\n# Show only matching filenames\ngrep -rl "API_KEY" /etc/'}</code></pre>

      <h3 style={h3Style}>{isZh ? '流编辑器 — sed' : 'Stream Editor — sed'}</h3>
      <pre style={preStyle}><code>{'# Find and replace (first occurrence per line)\nsed \'s/old/new/\' file.txt\n\n# Global replace (all occurrences)\nsed \'s/old/new/g\' file.txt\n\n# Edit file in place\nsed -i \'s/http:/https:/g\' config.yml\n\n# Delete lines matching a pattern\nsed \'/^#/d\' config.conf\n\n# Delete empty lines\nsed \'/^$/d\' file.txt\n\n# Print only lines 10-20\nsed -n \'10,20p\' file.txt\n\n# Insert text before line 5\nsed \'5i\\New line inserted here\' file.txt\n\n# Replace only on lines containing "server"\nsed \'/server/s/80/443/g\' nginx.conf'}</code></pre>

      <h3 style={h3Style}>{isZh ? '文本处理 — awk' : 'Text Processing — awk'}</h3>
      <pre style={preStyle}><code>{'# Print specific columns (space-delimited)\nawk \'{print $1, $3}\' access.log\n\n# Use custom field separator\nawk -F: \'{print $1, $7}\' /etc/passwd\n\n# Filter rows by condition\nawk \'$3 > 500 {print $1, $3}\' data.txt\n\n# Sum a column\nawk \'{sum += $5} END {print "Total:", sum}\' sales.csv\n\n# Count unique values\nawk -F, \'{count[$2]++} END {for (k in count) print k, count[k]}\' data.csv\n\n# Format output\nawk \'{printf "%-20s %10d\\n", $1, $3}\' report.txt'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'sed 高级用法' : 'Advanced sed Patterns'}</h3>
      <pre style={preStyle}><code>{'# Multiple replacements in one pass\nsed -e \'s/foo/bar/g\' -e \'s/baz/qux/g\' file.txt\n\n# Replace only on line range\nsed \'10,20s/old/new/g\' file.txt\n\n# Add line after match\nsed \'/^server {/a\\    include /etc/nginx/security.conf;\' nginx.conf\n\n# Delete lines between two patterns\nsed \'/START_BLOCK/,/END_BLOCK/d\' config.txt\n\n# Extract text between patterns\nsed -n \'/BEGIN/,/END/p\' file.txt\n\n# Remove trailing whitespace\nsed \'s/[[:space:]]*$//\' file.txt\n\n# Convert Windows line endings to Unix\nsed -i \'s/\\r$//\' script.sh\n\n# Number all non-empty lines\nsed \'/./=\' file.txt | sed \'N; s/\\n/\\t/\''}</code></pre>

      <h3 style={h3Style}>{isZh ? 'awk 实用示例' : 'Practical awk Examples'}</h3>
      <pre style={preStyle}><code>{'# Print lines longer than 80 characters\nawk \'length > 80\' file.txt\n\n# Calculate average of a column\nawk \'{sum += $3; count++} END {print "Average:", sum/count}\' data.txt\n\n# Print between two patterns\nawk \'/START/,/END/\' file.txt\n\n# CSV processing with header\nawk -F, \'NR==1 {for(i=1;i<=NF;i++) header[i]=$i; next}\n{print header[1] "=" $1, header[3] "=" $3}\' data.csv\n\n# Group by and count\nawk \'{status[$NF]++} END {for (s in status) print s, status[s]}\' access.log\n\n# Multi-file processing\nawk \'FNR==1 {print "--- " FILENAME " ---"} {print}\' file1.txt file2.txt\n\n# Replace column value conditionally\nawk -F, \'BEGIN{OFS=","} $3 > 100 {$3 = "HIGH"} {print}\' data.csv'}</code></pre>

      <h3 style={h3Style}>{isZh ? '其他文本工具' : 'Additional Text Tools'}</h3>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.command}</th>
            <th style={thStyle}>{t.description}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>cut -d: -f1 /etc/passwd</code></td><td style={tdStyle}>{isZh ? '按分隔符提取特定字段' : 'Extract specific fields by delimiter'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>sort -k2 -n data.txt</code></td><td style={tdStyle}>{isZh ? '按第 2 列数值排序' : 'Sort by column 2 numerically'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>sort -u file.txt</code></td><td style={tdStyle}>{isZh ? '排序并去除重复行' : 'Sort and remove duplicate lines'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>uniq -c</code></td><td style={tdStyle}>{isZh ? '计算连续重复行的次数' : 'Count consecutive duplicate lines'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>wc -l file.txt</code></td><td style={tdStyle}>{isZh ? '统计行数' : 'Count number of lines'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>wc -w file.txt</code></td><td style={tdStyle}>{isZh ? '统计单词数' : 'Count number of words'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>{'tr \'[:lower:]\' \'[:upper:]\''}</code></td><td style={tdStyle}>{isZh ? '将小写转换为大写' : 'Convert lowercase to uppercase'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>{'tr -d \'\\n\''}</code></td><td style={tdStyle}>{isZh ? '删除所有换行符' : 'Delete all newline characters'}</td></tr>
        </tbody>
      </table>

      <pre style={preStyle}><code>{'# Practical pipeline: find top 10 IP addresses in access log\nawk \'{print $1}\' access.log | sort | uniq -c | sort -rn | head -10\n\n# Count lines in all Python files\nfind . -name "*.py" -exec wc -l {} + | sort -n\n\n# Extract unique error messages\ngrep "ERROR" app.log | awk -F\'] \' \'{print $2}\' | sort -u'}</code></pre>

      {/* ======================= SECTION 4: Process Management ======================= */}
      <h2 style={h2Style}>{t.h2_process}</h2>
      <p style={pStyle}>{t.p_process}</p>

      <h3 style={h3Style}>{isZh ? '进程管理概览' : 'Process Management Overview'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.command}</th>
            <th style={thStyle}>{t.description}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>ps aux</code></td><td style={tdStyle}>{isZh ? '列出所有运行中的进程' : 'List all running processes'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>top / htop</code></td><td style={tdStyle}>{isZh ? '交互式进程监控' : 'Interactive process monitor'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>kill PID</code></td><td style={tdStyle}>{isZh ? '向进程发送终止信号' : 'Send termination signal to process'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>kill -9 PID</code></td><td style={tdStyle}>{isZh ? '强制终止进程' : 'Force kill a process'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>killall name</code></td><td style={tdStyle}>{isZh ? '按名称终止所有匹配进程' : 'Kill all processes by name'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>nohup cmd &</code></td><td style={tdStyle}>{isZh ? '在后台运行，不受终端关闭影响' : 'Run in background, immune to hangup'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>systemctl status</code></td><td style={tdStyle}>{isZh ? '检查 systemd 服务状态' : 'Check systemd service status'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>journalctl -u svc</code></td><td style={tdStyle}>{isZh ? '查看服务日志' : 'View service logs'}</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? '查看进程 — ps 和 top' : 'Viewing Processes — ps and top'}</h3>
      <pre style={preStyle}><code>{'# List all processes (full format)\nps aux\n\n# Filter by process name\nps aux | grep nginx\n\n# Show process tree\nps auxf\n\n# Show processes for a specific user\nps -u www-data\n\n# Interactive process viewer\ntop\n\n# Better interactive viewer (install: apt install htop)\nhtop\n\n# Sort by memory usage in top\n# Press M inside top\n\n# Sort by CPU usage in top\n# Press P inside top'}</code></pre>

      <h3 style={h3Style}>{isZh ? '终止和控制进程' : 'Killing and Controlling Processes'}</h3>
      <pre style={preStyle}><code>{'# Graceful terminate (SIGTERM)\nkill 12345\n\n# Force kill (SIGKILL) — use as last resort\nkill -9 12345\n\n# Kill by process name\nkillall nginx\npkill -f "python app.py"\n\n# Run process in background\n./long-task.sh &\n\n# Run process immune to hangups (survives logout)\nnohup ./server.sh &\nnohup ./server.sh > output.log 2>&1 &\n\n# List background jobs\njobs\n\n# Bring job to foreground\nfg %1\n\n# Send running process to background\n# Press Ctrl+Z first, then:\nbg %1'}</code></pre>

      <h3 style={h3Style}>{isZh ? '资源限制和优先级' : 'Resource Limits and Priority'}</h3>
      <pre style={preStyle}><code>{'# Run command with lower CPU priority\nnice -n 19 ./heavy-computation.sh\n\n# Change priority of running process\nrenice -n 10 -p 12345\n\n# Limit CPU usage (install: apt install cpulimit)\ncpulimit -l 50 -p 12345\n\n# Run command with memory limit\nsystemd-run --scope -p MemoryMax=512M ./my-app\n\n# Show resource limits\nulimit -a\n\n# Set max open files for current session\nulimit -n 65535\n\n# Show process resource usage\n/usr/bin/time -v ./my-script.sh\n\n# View per-process memory map\npmap -x 12345'}</code></pre>

      <h3 style={h3Style}>{isZh ? '系统服务 — systemctl 和 journalctl' : 'System Services — systemctl and journalctl'}</h3>
      <pre style={preStyle}><code>{'# Start / stop / restart a service\nsudo systemctl start nginx\nsudo systemctl stop nginx\nsudo systemctl restart nginx\n\n# Reload config without restart\nsudo systemctl reload nginx\n\n# Check service status\nsystemctl status nginx\n\n# Enable service on boot\nsudo systemctl enable nginx\n\n# Disable service on boot\nsudo systemctl disable nginx\n\n# List all active services\nsystemctl list-units --type=service --state=active\n\n# View logs for a service\njournalctl -u nginx\n\n# Follow logs in real time\njournalctl -u nginx -f\n\n# View logs since last boot\njournalctl -b\n\n# View logs from the last hour\njournalctl --since "1 hour ago"'}</code></pre>

      {/* ======================= SECTION 5: Networking ======================= */}
      <h2 style={h2Style}>{t.h2_network}</h2>
      <p style={pStyle}>{t.p_network}</p>

      <h3 style={h3Style}>{isZh ? 'HTTP 请求 — curl 和 wget' : 'HTTP Requests — curl and wget'}</h3>
      <pre style={preStyle}><code>{'# Simple GET request\ncurl https://api.example.com/data\n\n# POST with JSON body\ncurl -X POST -H "Content-Type: application/json" \\\n  -d \'{"name":"test"}\' https://api.example.com/users\n\n# Download file with progress\ncurl -O https://example.com/file.tar.gz\n\n# Follow redirects\ncurl -L https://short.url/abc\n\n# Show response headers\ncurl -I https://example.com\n\n# Download file with wget\nwget https://example.com/file.tar.gz\n\n# Resume interrupted download\nwget -c https://example.com/large-file.iso\n\n# Mirror a website\nwget --mirror --convert-links https://example.com'}</code></pre>

      <h3 style={h3Style}>{isZh ? '网络命令速查表' : 'Networking Commands Quick Reference'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.command}</th>
            <th style={thStyle}>{t.description}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>curl URL</code></td><td style={tdStyle}>{isZh ? '发送 HTTP 请求' : 'Send HTTP request'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>wget URL</code></td><td style={tdStyle}>{isZh ? '下载文件' : 'Download a file'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>ssh user@host</code></td><td style={tdStyle}>{isZh ? '安全远程登录' : 'Secure remote login'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>scp src user@host:dst</code></td><td style={tdStyle}>{isZh ? '安全复制文件到远程' : 'Securely copy file to remote'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>rsync -avz src dst</code></td><td style={tdStyle}>{isZh ? '增量文件同步' : 'Incremental file synchronization'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>ss -tlnp</code></td><td style={tdStyle}>{isZh ? '显示 TCP 监听端口和进程' : 'Show TCP listening ports with processes'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>dig domain</code></td><td style={tdStyle}>{isZh ? 'DNS 查询' : 'DNS lookup'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>ip addr show</code></td><td style={tdStyle}>{isZh ? '显示网络接口和 IP' : 'Show network interfaces and IPs'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>ping host</code></td><td style={tdStyle}>{isZh ? '测试网络连通性' : 'Test network connectivity'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>traceroute host</code></td><td style={tdStyle}>{isZh ? '跟踪网络路由路径' : 'Trace network route path'}</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? '远程连接 — ssh 和文件传输' : 'Remote Access — ssh and File Transfer'}</h3>
      <pre style={preStyle}><code>{'# SSH into a remote server\nssh user@192.168.1.100\n\n# SSH with specific key\nssh -i ~/.ssh/mykey user@server.com\n\n# SSH with port forwarding (local)\nssh -L 8080:localhost:3000 user@server.com\n\n# Copy file to remote server\nscp file.txt user@server:/home/user/\n\n# Copy directory from remote\nscp -r user@server:/var/log/app ./logs\n\n# Sync files with rsync (fast, incremental)\nrsync -avz ./deploy/ user@server:/var/www/html/\n\n# Rsync with delete (mirror source to destination)\nrsync -avz --delete ./src/ user@server:/opt/app/\n\n# Rsync over SSH with specific port\nrsync -avz -e "ssh -p 2222" ./data/ user@server:/backup/'}</code></pre>

      <h3 style={h3Style}>{isZh ? '网络诊断' : 'Network Diagnostics'}</h3>
      <pre style={preStyle}><code>{'# Show listening ports\nss -tlnp\n\n# Show all connections\nss -tunap\n\n# Display network interfaces and IPs\nip addr show\n\n# Show routing table\nip route show\n\n# DNS lookup\ndig example.com\ndig example.com MX\nnslookup example.com\n\n# Test network connectivity\nping -c 4 google.com\n\n# Trace route to host\ntraceroute google.com\n\n# Check if a port is open\nnc -zv server.com 443\n\n# Monitor network traffic (requires root)\nsudo tcpdump -i eth0 port 80'}</code></pre>

      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {isZh
          ? 'ss 命令是 netstat 的现代替代品，速度更快且输出更清晰。在新系统上优先使用 ss。'
          : 'The ss command is the modern replacement for netstat. It is faster and produces cleaner output. Prefer ss on newer systems.'}
      </div>

      <h3 style={h3Style}>{isZh ? '网络配置与防火墙快速检查' : 'Network Configuration Quick Checks'}</h3>
      <pre style={preStyle}><code>{'# Show all IP addresses\nhostname -I\n\n# Show public IP address\ncurl -s ifconfig.me\ncurl -s ipinfo.io/ip\n\n# Test HTTP response code\ncurl -o /dev/null -s -w "%{http_code}" https://example.com\n\n# Check DNS resolution time\ndig +stats example.com | grep "Query time"\n\n# Show active connections by state\nss -s\n\n# Monitor bandwidth in real time (install: apt install iftop)\nsudo iftop -i eth0\n\n# Test port connectivity with timeout\ntimeout 5 bash -c \'echo > /dev/tcp/server.com/443\' && echo "Open" || echo "Closed"\n\n# Download with speed limit\ncurl --limit-rate 1M -O https://example.com/large-file.zip\n\n# Send email via command line\necho "Server is down" | mail -s "ALERT" admin@example.com'}</code></pre>

      {/* ======================= SECTION 6: Disk & Storage ======================= */}
      <h2 style={h2Style}>{t.h2_disk}</h2>
      <p style={pStyle}>{t.p_disk}</p>

      <pre style={preStyle}><code>{'# Show filesystem disk usage (human-readable)\ndf -h\n\n# Show inode usage\ndf -i\n\n# Show directory size\ndu -sh /var/log\n\n# Show top-level directory sizes\ndu -h --max-depth=1 /var\n\n# Find largest files and directories\ndu -ah / | sort -rh | head -20\n\n# List block devices\nlsblk\n\n# Show detailed disk information\nsudo fdisk -l\n\n# Mount a filesystem\nsudo mount /dev/sdb1 /mnt/data\n\n# Unmount a filesystem\nsudo umount /mnt/data\n\n# Show mounted filesystems\nmount | column -t\n\n# Create ext4 filesystem\nsudo mkfs.ext4 /dev/sdb1\n\n# Check and repair filesystem\nsudo fsck /dev/sdb1\n\n# Add permanent mount to fstab\n# Edit /etc/fstab:\n# /dev/sdb1  /mnt/data  ext4  defaults  0  2'}</code></pre>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.command}</th>
            <th style={thStyle}>{t.description}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>df -h</code></td><td style={tdStyle}>{isZh ? '显示文件系统磁盘空间使用情况' : 'Show filesystem disk space usage'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>du -sh /path</code></td><td style={tdStyle}>{isZh ? '显示目录总大小' : 'Show total directory size'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>lsblk</code></td><td style={tdStyle}>{isZh ? '列出所有块设备（磁盘、分区）' : 'List all block devices (disks, partitions)'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>mount / umount</code></td><td style={tdStyle}>{isZh ? '挂载或卸载文件系统' : 'Mount or unmount a filesystem'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>mkfs.ext4</code></td><td style={tdStyle}>{isZh ? '创建 ext4 文件系统' : 'Create ext4 filesystem on a partition'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>fsck</code></td><td style={tdStyle}>{isZh ? '检查和修复文件系统' : 'Check and repair a filesystem'}</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? '磁盘性能和 SMART 监控' : 'Disk Performance and SMART Monitoring'}</h3>
      <pre style={preStyle}><code>{'# Test disk write speed\ndd if=/dev/zero of=/tmp/testfile bs=1M count=1024 conv=fdatasync\n\n# Test disk read speed\ndd if=/tmp/testfile of=/dev/null bs=1M\n\n# Show disk SMART status (install: apt install smartmontools)\nsudo smartctl -a /dev/sda\n\n# Check disk health\nsudo smartctl -H /dev/sda\n\n# Show partition UUID\nblkid\n\n# Resize a partition (with LVM)\nsudo lvextend -L +10G /dev/mapper/vg0-root\nsudo resize2fs /dev/mapper/vg0-root\n\n# Check disk usage by file type\nfind / -type f -name "*.log" -exec du -ch {} + 2>/dev/null | tail -1\n\n# Clean package manager cache\nsudo apt clean           # Debian/Ubuntu\nsudo dnf clean all       # RHEL/Fedora'}</code></pre>

      {/* ======================= SECTION 7: User Management ======================= */}
      <h2 style={h2Style}>{t.h2_user}</h2>
      <p style={pStyle}>{t.p_user}</p>

      <pre style={preStyle}><code>{'# Add a new user\nsudo useradd -m -s /bin/bash johndoe\n\n# Add user with home dir and default shell\nsudo useradd -m -s /bin/bash -G sudo,docker devuser\n\n# Set password for user\nsudo passwd johndoe\n\n# Modify user (add to docker group)\nsudo usermod -aG docker johndoe\n\n# Delete user and home directory\nsudo userdel -r johndoe\n\n# View user groups\ngroups johndoe\nid johndoe\n\n# Switch to another user\nsu - johndoe\n\n# Run command as another user\nsudo -u www-data whoami\n\n# Edit sudoers file safely\nsudo visudo\n\n# Add user to sudoers (append to /etc/sudoers)\n# johndoe ALL=(ALL:ALL) NOPASSWD: ALL\n\n# List currently logged in users\nwho\nw\n\n# Show last login history\nlast'}</code></pre>

      <div style={tipStyle}>
        <strong>{isZh ? '安全提示：' : 'Security Tip:'}</strong> {isZh
          ? '始终使用 visudo 而不是直接编辑 /etc/sudoers。visudo 在保存前会验证语法，防止配置错误导致无法使用 sudo。'
          : 'Always use visudo instead of directly editing /etc/sudoers. visudo validates syntax before saving, preventing misconfigurations that could lock you out of sudo access.'}
      </div>

      {/* ======================= SECTION 8: Package Management ======================= */}
      <h2 style={h2Style}>{t.h2_package}</h2>
      <p style={pStyle}>{t.p_package}</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.action}</th>
            <th style={thStyle}>apt (Debian/Ubuntu)</th>
            <th style={thStyle}>dnf/yum (RHEL/Fedora)</th>
            <th style={thStyle}>pacman (Arch)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '更新包列表' : 'Update package list'}</td><td style={tdStyle}><code style={codeInlineStyle}>apt update</code></td><td style={tdStyle}><code style={codeInlineStyle}>dnf check-update</code></td><td style={tdStyle}><code style={codeInlineStyle}>pacman -Sy</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '升级所有包' : 'Upgrade all packages'}</td><td style={tdStyle}><code style={codeInlineStyle}>apt upgrade</code></td><td style={tdStyle}><code style={codeInlineStyle}>dnf upgrade</code></td><td style={tdStyle}><code style={codeInlineStyle}>pacman -Syu</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '安装包' : 'Install package'}</td><td style={tdStyle}><code style={codeInlineStyle}>apt install nginx</code></td><td style={tdStyle}><code style={codeInlineStyle}>dnf install nginx</code></td><td style={tdStyle}><code style={codeInlineStyle}>pacman -S nginx</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '删除包' : 'Remove package'}</td><td style={tdStyle}><code style={codeInlineStyle}>apt remove nginx</code></td><td style={tdStyle}><code style={codeInlineStyle}>dnf remove nginx</code></td><td style={tdStyle}><code style={codeInlineStyle}>pacman -R nginx</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '搜索包' : 'Search packages'}</td><td style={tdStyle}><code style={codeInlineStyle}>apt search nginx</code></td><td style={tdStyle}><code style={codeInlineStyle}>dnf search nginx</code></td><td style={tdStyle}><code style={codeInlineStyle}>pacman -Ss nginx</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '显示包信息' : 'Show package info'}</td><td style={tdStyle}><code style={codeInlineStyle}>apt show nginx</code></td><td style={tdStyle}><code style={codeInlineStyle}>dnf info nginx</code></td><td style={tdStyle}><code style={codeInlineStyle}>pacman -Si nginx</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '列出已安装包' : 'List installed'}</td><td style={tdStyle}><code style={codeInlineStyle}>apt list --installed</code></td><td style={tdStyle}><code style={codeInlineStyle}>dnf list installed</code></td><td style={tdStyle}><code style={codeInlineStyle}>pacman -Q</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '清理缓存' : 'Clean cache'}</td><td style={tdStyle}><code style={codeInlineStyle}>apt autoremove</code></td><td style={tdStyle}><code style={codeInlineStyle}>dnf autoremove</code></td><td style={tdStyle}><code style={codeInlineStyle}>pacman -Sc</code></td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? 'apt 详细用法 (Debian/Ubuntu)' : 'apt Detailed Usage (Debian/Ubuntu)'}</h3>
      <pre style={preStyle}><code>{'# Update and upgrade in one step\nsudo apt update && sudo apt upgrade -y\n\n# Install specific version\nsudo apt install nginx=1.24.0-1\n\n# Hold package (prevent upgrades)\nsudo apt-mark hold nginx\nsudo apt-mark unhold nginx\n\n# Show installed package version\napt list --installed | grep nginx\n\n# Show package dependencies\napt depends nginx\n\n# Show reverse dependencies\napt rdepends nginx\n\n# Remove package and its config files\nsudo apt purge nginx\n\n# Remove unused dependencies\nsudo apt autoremove -y\n\n# List upgradable packages\napt list --upgradable\n\n# Download .deb without installing\napt download nginx\n\n# Install local .deb file\nsudo dpkg -i package.deb\nsudo apt install -f   # Fix broken dependencies\n\n# Add a PPA repository\nsudo add-apt-repository ppa:ondrej/php\nsudo apt update'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'dnf 详细用法 (RHEL/Fedora)' : 'dnf Detailed Usage (RHEL/Fedora)'}</h3>
      <pre style={preStyle}><code>{'# Check for updates\nsudo dnf check-update\n\n# Install package group\nsudo dnf groupinstall "Development Tools"\n\n# Show package history\nsudo dnf history\nsudo dnf history info 15\n\n# Undo last transaction\nsudo dnf history undo last\n\n# List enabled repositories\ndnf repolist\n\n# Add a repository\nsudo dnf config-manager --add-repo https://repo.example.com/repo.repo\n\n# Install from specific repo\nsudo dnf install --repo=epel nginx\n\n# List all files in a package\nrpm -ql nginx\n\n# Which package provides a file\ndnf provides /usr/bin/curl'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Snap 通用包管理' : 'Snap Universal Packages'}</h3>
      <pre style={preStyle}><code>{'# Install a snap package\nsudo snap install code --classic\n\n# List installed snaps\nsnap list\n\n# Update all snaps\nsudo snap refresh\n\n# Remove a snap\nsudo snap remove code\n\n# Find snaps\nsnap find "text editor"'}</code></pre>

      {/* ======================= SECTION 9: Shell Scripting ======================= */}
      <h2 style={h2Style}>{t.h2_shell}</h2>
      <p style={pStyle}>{t.p_shell}</p>

      <h3 style={h3Style}>{isZh ? 'Bash 特殊变量' : 'Bash Special Variables'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '变量' : 'Variable'}</th>
            <th style={thStyle}>{t.description}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>$0</code></td><td style={tdStyle}>{isZh ? '脚本名称' : 'Script name'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>$1, $2, ...</code></td><td style={tdStyle}>{isZh ? '位置参数（传入的参数）' : 'Positional parameters (arguments passed)'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>$#</code></td><td style={tdStyle}>{isZh ? '参数个数' : 'Number of arguments'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>$@</code></td><td style={tdStyle}>{isZh ? '所有参数（作为独立单词）' : 'All arguments (as separate words)'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>$*</code></td><td style={tdStyle}>{isZh ? '所有参数（作为单个字符串）' : 'All arguments (as single string)'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>$?</code></td><td style={tdStyle}>{isZh ? '上一个命令的退出码' : 'Exit code of last command'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>$$</code></td><td style={tdStyle}>{isZh ? '当前 Shell 的 PID' : 'PID of current shell'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>$!</code></td><td style={tdStyle}>{isZh ? '最后一个后台进程的 PID' : 'PID of last background process'}</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? '变量和字符串' : 'Variables and Strings'}</h3>
      <pre style={preStyle}><code>{'#!/bin/bash\n\n# Variable assignment (no spaces around =)\nNAME="Linux"\nVERSION=6\nDATE=$(date +%Y-%m-%d)\n\n# Using variables\necho "Welcome to \\$NAME version \\$VERSION"\necho "Today is \\$DATE"\n\n# String operations\nSTR="Hello World"\necho "Length: \\${#STR}"        # 11\necho "Substr: \\${STR:0:5}"     # Hello\necho "Replace: \\${STR/World/Linux}"  # Hello Linux\n\n# Default values\necho "\\${UNSET_VAR:-default_value}"   # uses default if unset\necho "\\${UNSET_VAR:=default_value}"   # sets and uses default if unset'}</code></pre>

      <h3 style={h3Style}>{isZh ? '条件判断' : 'Conditionals'}</h3>
      <pre style={preStyle}><code>{'#!/bin/bash\n\n# If-else\nif [ -f "/etc/nginx/nginx.conf" ]; then\n    echo "Nginx config exists"\nelif [ -f "/etc/apache2/apache2.conf" ]; then\n    echo "Apache config exists"\nelse\n    echo "No web server config found"\nfi\n\n# Numeric comparison\nCOUNT=$(wc -l < access.log)\nif [ "\\$COUNT" -gt 1000 ]; then\n    echo "High traffic: \\$COUNT requests"\nfi\n\n# String comparison\nENV="production"\nif [[ "\\$ENV" == "production" ]]; then\n    echo "Running in production mode"\nfi\n\n# File test operators\n# -f  file exists and is regular file\n# -d  directory exists\n# -r  file is readable\n# -w  file is writable\n# -x  file is executable\n# -s  file exists and is not empty'}</code></pre>

      <h3 style={h3Style}>{isZh ? '循环' : 'Loops'}</h3>
      <pre style={preStyle}><code>{'#!/bin/bash\n\n# For loop — iterate over list\nfor SERVER in web1 web2 web3 db1; do\n    echo "Checking \\$SERVER..."\n    ping -c 1 "\\$SERVER" > /dev/null 2>&1 && echo "  UP" || echo "  DOWN"\ndone\n\n# For loop — C-style\nfor ((i=1; i<=10; i++)); do\n    echo "Iteration \\$i"\ndone\n\n# For loop — iterate over files\nfor FILE in /var/log/*.log; do\n    echo "Processing \\$FILE ($(wc -l < "\\$FILE") lines)"\ndone\n\n# While loop\nCOUNTER=0\nwhile [ "\\$COUNTER" -lt 5 ]; do\n    echo "Count: \\$COUNTER"\n    COUNTER=$((COUNTER + 1))\ndone\n\n# Read file line by line\nwhile IFS= read -r LINE; do\n    echo "Processing: \\$LINE"\ndone < input.txt'}</code></pre>

      <h3 style={h3Style}>{isZh ? '函数和数组' : 'Functions and Arrays'}</h3>
      <pre style={preStyle}><code>{'#!/bin/bash\n\n# Define a function\ncheck_service() {\n    local SERVICE_NAME="\\$1"\n    if systemctl is-active --quiet "\\$SERVICE_NAME"; then\n        echo "\\$SERVICE_NAME is running"\n        return 0\n    else\n        echo "\\$SERVICE_NAME is NOT running"\n        return 1\n    fi\n}\n\n# Call function\ncheck_service nginx\ncheck_service postgresql\n\n# Arrays\nSERVERS=("web1" "web2" "web3" "db1")\n\n# Array length\necho "Total servers: \\${#SERVERS[@]}"\n\n# Iterate array\nfor SERVER in "\\${SERVERS[@]}"; do\n    echo "Server: \\$SERVER"\ndone\n\n# Access by index\necho "First: \\${SERVERS[0]}"\necho "Last: \\${SERVERS[-1]}"\n\n# Append to array\nSERVERS+=("cache1")\n\n# Associative array (Bash 4+)\ndeclare -A PORTS\nPORTS[nginx]=80\nPORTS[ssh]=22\nPORTS[postgres]=5432\n\nfor SERVICE in "\\${!PORTS[@]}"; do\n    echo "\\$SERVICE -> port \\${PORTS[\\$SERVICE]}"\ndone'}</code></pre>

      <h3 style={h3Style}>{isZh ? '错误处理和调试' : 'Error Handling and Debugging'}</h3>
      <pre style={preStyle}><code>{'#!/bin/bash\n\n# Exit on first error\nset -e\n\n# Exit on undefined variable\nset -u\n\n# Fail on pipe errors\nset -o pipefail\n\n# Combined (recommended for all scripts)\nset -euo pipefail\n\n# Trap errors and run cleanup\ncleanup() {\n    echo "Cleaning up temp files..."\n    rm -f /tmp/myapp_*\n}\ntrap cleanup EXIT ERR\n\n# Debug mode — print each command before executing\nset -x\n\n# Debug specific section only\nset -x\n# ... commands to debug ...\nset +x\n\n# Validate required arguments\nif [ $# -lt 2 ]; then\n    echo "Usage: \\$0 <source> <destination>"\n    exit 1\nfi\n\n# Check if command exists\nif ! command -v docker &> /dev/null; then\n    echo "Docker is not installed"\n    exit 1\nfi'}</code></pre>

      <h3 style={h3Style}>{isZh ? '实用脚本模板' : 'Practical Script Template'}</h3>
      <pre style={preStyle}><code>{'#!/bin/bash\nset -euo pipefail\n\n# ---- Configuration ----\nLOG_DIR="/var/log/myapp"\nBACKUP_DIR="/backup/db"\nRETENTION_DAYS=7\nDATE=$(date +%Y%m%d_%H%M%S)\n\n# ---- Functions ----\nlog() {\n    echo "[$(date +\"%Y-%m-%d %H:%M:%S\")] \\$1" | tee -a "\\$LOG_DIR/backup.log"\n}\n\ndie() {\n    log "ERROR: \\$1"\n    exit 1\n}\n\n# ---- Main ----\nlog "Starting database backup..."\n\n# Create backup directory if missing\nmkdir -p "\\$BACKUP_DIR" || die "Cannot create backup dir"\n\n# Perform backup\npg_dump mydb > "\\$BACKUP_DIR/mydb_\\$DATE.sql" || die "pg_dump failed"\n\n# Compress backup\ngzip "\\$BACKUP_DIR/mydb_\\$DATE.sql" || die "Compression failed"\nlog "Backup created: mydb_\\$DATE.sql.gz"\n\n# Remove old backups\nfind "\\$BACKUP_DIR" -name "*.sql.gz" -mtime +\\$RETENTION_DAYS -delete\nlog "Removed backups older than \\$RETENTION_DAYS days"\n\nlog "Backup completed successfully"'}</code></pre>

      {/* ======================= SECTION 10: I/O Redirection & Pipes ======================= */}
      <h2 style={h2Style}>{t.h2_io}</h2>
      <p style={pStyle}>{t.p_io}</p>

      <h3 style={h3Style}>{isZh ? '标准流和重定向' : 'Standard Streams and Redirection'}</h3>
      <pre style={preStyle}><code>{'# Redirect stdout to file (overwrite)\necho "Hello" > output.txt\n\n# Redirect stdout to file (append)\necho "World" >> output.txt\n\n# Redirect stderr to file\ncommand_that_fails 2> errors.log\n\n# Redirect both stdout and stderr\ncommand > output.log 2>&1\n\n# Modern syntax (Bash 4+)\ncommand &> output.log\n\n# Discard all output\ncommand > /dev/null 2>&1\n\n# Redirect stdin from file\nsort < unsorted.txt\n\n# Here document\ncat <<EOF\nServer: production\nDate: $(date)\nStatus: running\nEOF\n\n# Here string\ngrep "error" <<< "This is an error message"'}</code></pre>

      <h3 style={h3Style}>{isZh ? '管道和命令链' : 'Pipes and Command Chaining'}</h3>
      <pre style={preStyle}><code>{'# Basic pipe\nls -la | grep ".log"\n\n# Multiple pipes\ncat access.log | awk \'{print $1}\' | sort | uniq -c | sort -rn | head -10\n\n# tee: write to file AND stdout simultaneously\nping google.com | tee ping-results.txt\n\n# tee with append\necho "new log entry" | tee -a app.log\n\n# xargs: convert stdin to command arguments\nfind . -name "*.tmp" | xargs rm\n\n# xargs with placeholder\nfind . -name "*.js" | xargs -I {} cp {} /backup/\n\n# Parallel execution with xargs\nfind . -name "*.png" | xargs -P 4 -I {} convert {} -resize 50% {}\n\n# Command substitution\nKILL_PIDS=$(pgrep -f "old-process")\necho "Killing PIDs: \\$KILL_PIDS"\n\n# Process substitution\ndiff <(sort file1.txt) <(sort file2.txt)'}</code></pre>

      <div style={tipStyle}>
        <strong>{isZh ? '提示：' : 'Tip:'}</strong> {isZh
          ? '使用 set -o pipefail 在脚本中确保管道中任何命令的失败都会导致整个管道失败，而不仅仅是最后一个命令。'
          : 'Use set -o pipefail in scripts to ensure that a failure in any command in a pipeline causes the whole pipeline to fail, not just the last command.'}
      </div>

      <h3 style={h3Style}>{isZh ? '命名管道和文件描述符' : 'Named Pipes and File Descriptors'}</h3>
      <pre style={preStyle}><code>{'# Create a named pipe (FIFO)\nmkfifo /tmp/mypipe\n\n# Writer (in terminal 1)\necho "Hello from writer" > /tmp/mypipe\n\n# Reader (in terminal 2)\ncat < /tmp/mypipe\n\n# Custom file descriptors\nexec 3> /tmp/custom-output.txt   # Open fd 3 for writing\necho "Written to fd 3" >&3\nexec 3>&-                         # Close fd 3\n\n# Read from fd\nexec 4< /etc/hostname\nread HOSTNAME <&4\nexec 4<&-\necho "Hostname: \\$HOSTNAME"\n\n# Swap stdout and stderr\ncommand 3>&1 1>&2 2>&3 3>&-\n\n# Log stdout and stderr separately\ncommand > stdout.log 2> stderr.log\n\n# Append both to same file with timestamps\ncommand 2>&1 | while IFS= read -r line; do\n    echo "$(date +\"%H:%M:%S\") \\$line"\ndone >> app.log'}</code></pre>

      {/* ======================= SECTION 11: Compression & Archives ======================= */}
      <h2 style={h2Style}>{t.h2_compression}</h2>
      <p style={pStyle}>{t.p_compression}</p>

      <h3 style={h3Style}>{isZh ? 'tar — 归档工具' : 'tar — Archive Tool'}</h3>
      <pre style={preStyle}><code>{'# Create tar.gz archive\ntar -czf archive.tar.gz /path/to/directory\n\n# Create tar.bz2 archive (better compression)\ntar -cjf archive.tar.bz2 /path/to/directory\n\n# Extract tar.gz archive\ntar -xzf archive.tar.gz\n\n# Extract to specific directory\ntar -xzf archive.tar.gz -C /opt/\n\n# List contents without extracting\ntar -tzf archive.tar.gz\n\n# Extract specific file from archive\ntar -xzf archive.tar.gz path/to/file.txt\n\n# Create archive excluding patterns\ntar -czf backup.tar.gz --exclude="*.log" --exclude="node_modules" /opt/app'}</code></pre>

      <h3 style={h3Style}>{isZh ? '其他压缩工具' : 'Other Compression Tools'}</h3>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '工具' : 'Tool'}</th>
            <th style={thStyle}>{isZh ? '压缩' : 'Compress'}</th>
            <th style={thStyle}>{isZh ? '解压' : 'Decompress'}</th>
            <th style={thStyle}>{isZh ? '特点' : 'Notes'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><strong>gzip</strong></td><td style={tdStyle}><code style={codeInlineStyle}>gzip file.txt</code></td><td style={tdStyle}><code style={codeInlineStyle}>gunzip file.txt.gz</code></td><td style={tdStyle}>{isZh ? '最常见，速度快' : 'Most common, fast'}</td></tr>
          <tr><td style={tdStyle}><strong>bzip2</strong></td><td style={tdStyle}><code style={codeInlineStyle}>bzip2 file.txt</code></td><td style={tdStyle}><code style={codeInlineStyle}>bunzip2 file.txt.bz2</code></td><td style={tdStyle}>{isZh ? '更好的压缩率，较慢' : 'Better compression, slower'}</td></tr>
          <tr><td style={tdStyle}><strong>xz</strong></td><td style={tdStyle}><code style={codeInlineStyle}>xz file.txt</code></td><td style={tdStyle}><code style={codeInlineStyle}>unxz file.txt.xz</code></td><td style={tdStyle}>{isZh ? '最佳压缩率，最慢' : 'Best compression, slowest'}</td></tr>
          <tr><td style={tdStyle}><strong>zip</strong></td><td style={tdStyle}><code style={codeInlineStyle}>zip -r archive.zip dir/</code></td><td style={tdStyle}><code style={codeInlineStyle}>unzip archive.zip</code></td><td style={tdStyle}>{isZh ? '跨平台兼容' : 'Cross-platform compatible'}</td></tr>
          <tr><td style={tdStyle}><strong>7z</strong></td><td style={tdStyle}><code style={codeInlineStyle}>7z a archive.7z dir/</code></td><td style={tdStyle}><code style={codeInlineStyle}>7z x archive.7z</code></td><td style={tdStyle}>{isZh ? '高压缩率，多格式支持' : 'High compression, multi-format'}</td></tr>
        </tbody>
      </table>

      <pre style={preStyle}><code>{'# Compress keeping original file\ngzip -k large-file.log\n\n# Set compression level (1=fast, 9=best)\ngzip -9 data.csv\n\n# Zip with password protection\nzip -e -r secure.zip /sensitive/data/\n\n# List zip contents\nunzip -l archive.zip'}</code></pre>

      <h3 style={h3Style}>{isZh ? '跨服务器文件传输压缩' : 'Cross-Server Compressed Transfers'}</h3>
      <pre style={preStyle}><code>{'# Compress and transfer in one step (no temp file)\ntar -czf - /var/www/html | ssh user@server "cat > /backup/site.tar.gz"\n\n# Transfer and extract on remote in one step\ntar -czf - /opt/app | ssh user@server "cd /opt && tar -xzf -"\n\n# Split large archives into parts\ntar -czf - /large/data | split -b 100M - backup_part_\n\n# Rejoin split archive\ncat backup_part_* | tar -xzf -\n\n# Compress with parallel processing (install: apt install pigz)\ntar -cf - /data | pigz > data.tar.gz\n\n# Decompress with pigz\npigz -d data.tar.gz'}</code></pre>

      {/* ======================= SECTION 12: System Monitoring ======================= */}
      <h2 style={h2Style}>{t.h2_monitoring}</h2>
      <p style={pStyle}>{t.p_monitoring}</p>

      <pre style={preStyle}><code>{'# System uptime and load averages\nuptime\n\n# Memory usage (human-readable)\nfree -h\n\n# Virtual memory statistics (every 2 seconds)\nvmstat 2 5\n\n# I/O statistics\niostat -x 2 5\n\n# System activity report (CPU, memory, disk, network)\nsar -u 2 5     # CPU usage\nsar -r 2 5     # Memory usage\nsar -d 2 5     # Disk activity\n\n# Kernel ring buffer messages\ndmesg | tail -20\ndmesg -T | grep -i error\n\n# System information\nuname -a\nhostnamectl\n\n# CPU information\nlscpu\ncat /proc/cpuinfo | grep "model name" | head -1\n\n# Memory information\ncat /proc/meminfo | head -5'}</code></pre>

      <h3 style={h3Style}>{isZh ? '实时监控命令' : 'Real-Time Monitoring Commands'}</h3>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.command}</th>
            <th style={thStyle}>{t.description}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>top / htop</code></td><td style={tdStyle}>{isZh ? '交互式进程和资源监控' : 'Interactive process and resource monitor'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>vmstat 1</code></td><td style={tdStyle}>{isZh ? '每秒显示虚拟内存、CPU、I/O 统计' : 'Virtual memory, CPU, and I/O stats every second'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>iostat -x 1</code></td><td style={tdStyle}>{isZh ? '每秒显示扩展磁盘 I/O 统计' : 'Extended disk I/O stats every second'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>sar -n DEV 1</code></td><td style={tdStyle}>{isZh ? '每秒显示网络接口统计' : 'Network interface stats every second'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>watch -n 1 "df -h"</code></td><td style={tdStyle}>{isZh ? '每秒刷新并显示磁盘使用情况' : 'Refresh disk usage display every second'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>dstat</code></td><td style={tdStyle}>{isZh ? '综合系统资源统计工具' : 'Versatile all-in-one resource statistics tool'}</td></tr>
          <tr><td style={tdStyle}><code style={codeInlineStyle}>nmon</code></td><td style={tdStyle}>{isZh ? '性能监控和分析工具' : 'Performance monitoring and analysis tool'}</td></tr>
        </tbody>
      </table>

      <pre style={preStyle}><code>{'# Watch a command output in real time (updates every 2s)\nwatch "ss -tlnp"\n\n# Monitor log file in real time\ntail -f /var/log/syslog\n\n# Monitor multiple log files\ntail -f /var/log/nginx/access.log /var/log/nginx/error.log\n\n# Quick system health check script\necho "=== Uptime ===" && uptime\necho "=== Memory ===" && free -h\necho "=== Disk ===" && df -h /\necho "=== Load ===" && cat /proc/loadavg\necho "=== Top Processes ===" && ps aux --sort=-%cpu | head -5'}</code></pre>

      <h3 style={h3Style}>{isZh ? '性能分析和故障排查' : 'Performance Analysis and Troubleshooting'}</h3>
      <pre style={preStyle}><code>{'# Show top CPU-consuming processes\nps aux --sort=-%cpu | head -10\n\n# Show top memory-consuming processes\nps aux --sort=-%mem | head -10\n\n# Trace system calls of a process\nstrace -p 12345 -e trace=network\nstrace -c ./my-program      # Summary of syscalls\n\n# Trace library calls\nltrace ./my-program\n\n# Show open files for a process\nlsof -p 12345\n\n# Show files opened by a user\nlsof -u www-data\n\n# Find which process is using a file\nlsof /var/log/syslog\n\n# Find processes using deleted files (disk not freed)\nlsof +L1\n\n# Check OOM (Out of Memory) kills\ndmesg | grep -i "out of memory"\ngrep -i "killed process" /var/log/syslog\n\n# Network connections by process\nsudo ss -tnp | awk \'{print $6}\' | sort | uniq -c | sort -rn'}</code></pre>

      <h3 style={h3Style}>{isZh ? '日志管理' : 'Log Management'}</h3>
      <pre style={preStyle}><code>{'# View system log\njournalctl -xe\n\n# View boot messages\njournalctl -b -1    # Previous boot\n\n# Check disk usage of logs\njournalctl --disk-usage\n\n# Vacuum old logs (keep last 500MB)\nsudo journalctl --vacuum-size=500M\n\n# Vacuum old logs (keep last 7 days)\nsudo journalctl --vacuum-time=7d\n\n# Rotate logs manually\nsudo logrotate -f /etc/logrotate.conf\n\n# Monitor multiple logs simultaneously\nmultitail /var/log/nginx/access.log /var/log/nginx/error.log'}</code></pre>

      {/* ======================= SECTION 13: Security Commands ======================= */}
      <h2 style={h2Style}>{t.h2_security}</h2>
      <p style={pStyle}>{t.p_security}</p>

      <h3 style={h3Style}>{isZh ? '防火墙管理' : 'Firewall Management'}</h3>
      <pre style={preStyle}><code>{'# UFW (Uncomplicated Firewall) — Ubuntu/Debian\nsudo ufw enable\nsudo ufw status verbose\nsudo ufw allow 22/tcp\nsudo ufw allow 80/tcp\nsudo ufw allow 443/tcp\nsudo ufw deny 3306/tcp\nsudo ufw allow from 10.0.0.0/8 to any port 22\nsudo ufw delete allow 80/tcp\n\n# iptables — traditional firewall\n# List current rules\nsudo iptables -L -n -v\n\n# Allow incoming SSH\nsudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT\n\n# Allow incoming HTTP/HTTPS\nsudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT\nsudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT\n\n# Drop all other incoming traffic\nsudo iptables -A INPUT -j DROP\n\n# Save iptables rules\nsudo iptables-save > /etc/iptables.rules\n\n# nftables — modern replacement for iptables\nsudo nft list ruleset\nsudo nft add rule inet filter input tcp dport 22 accept'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'SSH 密钥管理' : 'SSH Key Management'}</h3>
      <pre style={preStyle}><code>{'# Generate Ed25519 key (recommended)\nssh-keygen -t ed25519 -C "your@email.com"\n\n# Generate RSA key (4096-bit)\nssh-keygen -t rsa -b 4096 -C "your@email.com"\n\n# Copy public key to server\nssh-copy-id -i ~/.ssh/id_ed25519.pub user@server\n\n# Manual key copy (if ssh-copy-id unavailable)\ncat ~/.ssh/id_ed25519.pub | ssh user@server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"\n\n# Set correct permissions\nchmod 700 ~/.ssh\nchmod 600 ~/.ssh/authorized_keys\nchmod 600 ~/.ssh/id_ed25519\nchmod 644 ~/.ssh/id_ed25519.pub\n\n# Disable password authentication (edit sshd_config)\n# PasswordAuthentication no\n# PubkeyAuthentication yes\n# Then restart: sudo systemctl restart sshd'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'fail2ban 入侵防护' : 'fail2ban Intrusion Prevention'}</h3>
      <pre style={preStyle}><code>{'# Install fail2ban\nsudo apt install fail2ban\n\n# Start and enable\nsudo systemctl start fail2ban\nsudo systemctl enable fail2ban\n\n# Check status\nsudo fail2ban-client status\nsudo fail2ban-client status sshd\n\n# Unban an IP\nsudo fail2ban-client set sshd unbanip 192.168.1.100\n\n# Custom jail configuration (/etc/fail2ban/jail.local)\n# [sshd]\n# enabled = true\n# port = 22\n# filter = sshd\n# logpath = /var/log/auth.log\n# maxretry = 3\n# bantime = 3600\n# findtime = 600'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'GPG 加密' : 'GPG Encryption'}</h3>
      <pre style={preStyle}><code>{'# Generate GPG key pair\ngpg --full-generate-key\n\n# List keys\ngpg --list-keys\ngpg --list-secret-keys\n\n# Export public key\ngpg --armor --export your@email.com > public.key\n\n# Import someone else\'s public key\ngpg --import their-key.pub\n\n# Encrypt a file for a recipient\ngpg --encrypt --recipient their@email.com secret.txt\n\n# Decrypt a file\ngpg --decrypt secret.txt.gpg > secret.txt\n\n# Sign a file\ngpg --sign document.pdf\n\n# Verify a signature\ngpg --verify document.pdf.gpg'}</code></pre>

      <div style={tipStyle}>
        <strong>{isZh ? '安全最佳实践：' : 'Security Best Practices:'}</strong> {isZh
          ? '(1) 始终使用 SSH 密钥而非密码。(2) 配置 fail2ban 防止暴力破解。(3) 使用 ufw/iptables 只开放必要端口。(4) 定期更新系统软件包。(5) 禁用 root SSH 登录。'
          : '(1) Always use SSH keys instead of passwords. (2) Configure fail2ban to prevent brute-force attacks. (3) Use ufw/iptables to only open necessary ports. (4) Keep system packages updated regularly. (5) Disable root SSH login.'}
      </div>

      <h3 style={h3Style}>{isZh ? '系统加固清单' : 'System Hardening Checklist'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.action}</th>
            <th style={thStyle}>{t.command}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '禁用 root SSH 登录' : 'Disable root SSH login'}</td><td style={tdStyle}><code style={codeInlineStyle}>PermitRootLogin no</code> {isZh ? '在 sshd_config 中' : 'in sshd_config'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '更改默认 SSH 端口' : 'Change default SSH port'}</td><td style={tdStyle}><code style={codeInlineStyle}>Port 2222</code> {isZh ? '在 sshd_config 中' : 'in sshd_config'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '启用防火墙' : 'Enable firewall'}</td><td style={tdStyle}><code style={codeInlineStyle}>sudo ufw enable</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '安装 fail2ban' : 'Install fail2ban'}</td><td style={tdStyle}><code style={codeInlineStyle}>sudo apt install fail2ban</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '启用自动安全更新' : 'Enable automatic security updates'}</td><td style={tdStyle}><code style={codeInlineStyle}>sudo apt install unattended-upgrades</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '禁用密码认证' : 'Disable password auth'}</td><td style={tdStyle}><code style={codeInlineStyle}>PasswordAuthentication no</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '设置登录超时' : 'Set login timeout'}</td><td style={tdStyle}><code style={codeInlineStyle}>ClientAliveInterval 300</code></td></tr>
          <tr><td style={tdStyle}>{isZh ? '限制 sudo 用户' : 'Limit sudo users'}</td><td style={tdStyle}><code style={codeInlineStyle}>sudo visudo</code></td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? '安全审计和检查' : 'Security Auditing and Checks'}</h3>
      <pre style={preStyle}><code>{'# Find files with SUID/SGID permissions\nfind / -type f \\( -perm -4000 -o -perm -2000 \\) -ls 2>/dev/null\n\n# Find world-writable files\nfind / -type f -perm -o+w -ls 2>/dev/null\n\n# Find files with no owner\nfind / -nouser -o -nogroup 2>/dev/null\n\n# Check for empty passwords\nsudo awk -F: \'($2 == "" ) {print $1}\' /etc/shadow\n\n# List users with UID 0 (root-equivalent)\nawk -F: \'($3 == 0) {print $1}\' /etc/passwd\n\n# Check open ports\nsudo ss -tlnp\nsudo lsof -i -P -n | grep LISTEN\n\n# View failed login attempts\nsudo lastb | head -20\nsudo grep "Failed password" /var/log/auth.log | tail -20\n\n# Check active SSH sessions\nwho\nw\nsudo ss -tnp | grep :22\n\n# Scan for rootkits (install: apt install rkhunter)\nsudo rkhunter --check\n\n# Check file integrity (install: apt install aide)\nsudo aide --check'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'SSL/TLS 证书管理' : 'SSL/TLS Certificate Management'}</h3>
      <pre style={preStyle}><code>{'# Check SSL certificate of a website\nopenssl s_client -connect example.com:443 -servername example.com < /dev/null 2>/dev/null | openssl x509 -noout -dates\n\n# View certificate details\nopenssl x509 -in cert.pem -text -noout\n\n# Generate self-signed certificate\nopenssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes\n\n# Check certificate expiry with curl\ncurl -vI https://example.com 2>&1 | grep "expire date"\n\n# Let\'s Encrypt with certbot\nsudo certbot --nginx -d example.com -d www.example.com\nsudo certbot renew --dry-run\n\n# Check certificate chain\nopenssl s_client -connect example.com:443 -showcerts'}</code></pre>

      {/* ======================= Bonus: Essential One-Liners ======================= */}
      <h2 style={h2Style}>{isZh ? '附加：必备单行命令' : 'Bonus: Essential One-Liners'}</h2>
      <p style={pStyle}>{isZh
        ? '这些实用的单行命令覆盖了日常管理中最常见的任务场景。'
        : 'These practical one-liners cover the most common scenarios in daily system administration.'}</p>

      <pre style={preStyle}><code>{'# Find and replace in multiple files\nfind . -name "*.conf" -exec sed -i \'s/old-domain/new-domain/g\' {} +\n\n# Kill all processes matching a pattern\npkill -f "pattern"\n\n# Show directory sizes sorted by size\ndu -h --max-depth=1 | sort -rh\n\n# Monitor file changes in real time\ninotifywait -m -r /etc/\n\n# Quick HTTP server (Python 3)\npython3 -m http.server 8080\n\n# Generate random password\nopenssl rand -base64 32\ntr -dc \'A-Za-z0-9!@#$%\' < /dev/urandom | head -c 24\n\n# Show calendar\ncal\ncal 2026\n\n# Convert epoch timestamp to date\ndate -d @1709251200\n\n# Count files in directory\nfind /var/log -type f | wc -l\n\n# List top 10 largest files\nfind / -type f -exec du -h {} + 2>/dev/null | sort -rh | head -10\n\n# Watch disk I/O in real time\nsudo iotop\n\n# Show all cron jobs for all users\nfor user in $(cut -f1 -d: /etc/passwd); do crontab -u $user -l 2>/dev/null; done\n\n# Batch rename files (rename .txt to .md)\nfor f in *.txt; do mv "$f" "${f%.txt}.md"; done\n\n# Create backup with timestamp\ntar -czf "backup_$(date +%Y%m%d_%H%M%S).tar.gz" /var/www/'}</code></pre>

      <h3 style={h3Style}>{isZh ? '环境变量' : 'Environment Variables'}</h3>
      <pre style={preStyle}><code>{'# View all environment variables\nenv\nprintenv\n\n# Set variable for current session\nexport MY_VAR="hello"\n\n# Set variable permanently (add to ~/.bashrc or ~/.profile)\necho \'export MY_VAR="hello"\' >> ~/.bashrc\nsource ~/.bashrc\n\n# Unset a variable\nunset MY_VAR\n\n# Common environment variables\necho \\$HOME        # User home directory\necho \\$USER        # Current username\necho \\$PATH        # Executable search path\necho \\$SHELL       # Current shell\necho \\$PWD         # Current directory\necho \\$EDITOR      # Default text editor\n\n# Add to PATH\nexport PATH="\\$HOME/.local/bin:\\$PATH"'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Cron 定时任务' : 'Cron Scheduled Tasks'}</h3>
      <pre style={preStyle}><code>{'# Edit crontab for current user\ncrontab -e\n\n# List crontab entries\ncrontab -l\n\n# Cron expression format:\n# MIN  HOUR  DAY  MONTH  WEEKDAY  COMMAND\n# 0-59 0-23  1-31 1-12   0-7\n\n# Every day at 2:30 AM\n# 30 2 * * * /opt/scripts/backup.sh\n\n# Every 15 minutes\n# */15 * * * * /opt/scripts/health-check.sh\n\n# Every Monday at 9 AM\n# 0 9 * * 1 /opt/scripts/weekly-report.sh\n\n# First day of every month at midnight\n# 0 0 1 * * /opt/scripts/monthly-cleanup.sh\n\n# Log cron output\n# 0 3 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'tmux 终端复用' : 'tmux Terminal Multiplexer'}</h3>
      <pre style={preStyle}><code>{'# Start new session\ntmux new -s mysession\n\n# Detach from session: Ctrl+B then D\n\n# List sessions\ntmux ls\n\n# Attach to session\ntmux attach -t mysession\n\n# Kill session\ntmux kill-session -t mysession\n\n# Split pane horizontally: Ctrl+B then "\n# Split pane vertically: Ctrl+B then %\n# Switch pane: Ctrl+B then arrow key\n# Resize pane: Ctrl+B then hold arrow key\n# Close pane: exit or Ctrl+D\n\n# Create new window: Ctrl+B then C\n# Switch window: Ctrl+B then window number\n# Rename window: Ctrl+B then ,\n\n# Scroll mode: Ctrl+B then [ (use arrows, q to exit)'}</code></pre>

      {/* ======================= Quick Reference Table ======================= */}
      <h2 style={h2Style}>{isZh ? '快速参考表' : 'Quick Reference Table'}</h2>
      <p style={pStyle}>{isZh
        ? '按类别分组的最常用命令速查表。'
        : 'Most frequently used commands grouped by category.'}</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '类别' : 'Category'}</th>
            <th style={thStyle}>{t.command}</th>
            <th style={thStyle}>{t.description}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '导航' : 'Navigation'}</td><td style={tdStyle}><code style={codeInlineStyle}>ls -la</code></td><td style={tdStyle}>{isZh ? '列出所有文件（含隐藏文件）的详细信息' : 'List all files with details including hidden'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '导航' : 'Navigation'}</td><td style={tdStyle}><code style={codeInlineStyle}>find . -name "*.log"</code></td><td style={tdStyle}>{isZh ? '递归搜索匹配的文件' : 'Recursively search for matching files'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '文件' : 'Files'}</td><td style={tdStyle}><code style={codeInlineStyle}>chmod 755 script.sh</code></td><td style={tdStyle}>{isZh ? '设置文件权限' : 'Set file permissions'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '文件' : 'Files'}</td><td style={tdStyle}><code style={codeInlineStyle}>chown user:group file</code></td><td style={tdStyle}>{isZh ? '更改文件所有者' : 'Change file ownership'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '文本' : 'Text'}</td><td style={tdStyle}><code style={codeInlineStyle}>grep -rn "pattern" .</code></td><td style={tdStyle}>{isZh ? '递归搜索并显示行号' : 'Recursive search with line numbers'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '文本' : 'Text'}</td><td style={tdStyle}><code style={codeInlineStyle}>{'awk \'{print $1}\''}</code></td><td style={tdStyle}>{isZh ? '提取第一列' : 'Extract first column'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '进程' : 'Process'}</td><td style={tdStyle}><code style={codeInlineStyle}>ps aux | grep name</code></td><td style={tdStyle}>{isZh ? '查找进程' : 'Find a process by name'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '进程' : 'Process'}</td><td style={tdStyle}><code style={codeInlineStyle}>systemctl restart svc</code></td><td style={tdStyle}>{isZh ? '重启系统服务' : 'Restart a system service'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '网络' : 'Network'}</td><td style={tdStyle}><code style={codeInlineStyle}>ss -tlnp</code></td><td style={tdStyle}>{isZh ? '显示监听端口' : 'Show listening ports'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '网络' : 'Network'}</td><td style={tdStyle}><code style={codeInlineStyle}>rsync -avz src/ dst/</code></td><td style={tdStyle}>{isZh ? '增量同步文件' : 'Incrementally sync files'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '磁盘' : 'Disk'}</td><td style={tdStyle}><code style={codeInlineStyle}>df -h</code></td><td style={tdStyle}>{isZh ? '显示磁盘使用情况' : 'Show disk usage'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '安全' : 'Security'}</td><td style={tdStyle}><code style={codeInlineStyle}>ufw allow 22/tcp</code></td><td style={tdStyle}>{isZh ? '允许 SSH 端口通过防火墙' : 'Allow SSH through firewall'}</td></tr>
        </tbody>
      </table>

      {/* ======================= Conclusion ======================= */}
      <h2 style={h2Style}>{isZh ? '总结' : 'Conclusion'}</h2>
      <p style={pStyle}>{t.conclusion}</p>

      {/* ======================= FAQ ======================= */}
      <h2 style={h2Style}>{t.h2_faq}</h2>
      <div>
        <div style={faqItemStyle}><div style={faqQStyle}>{t.faq1q}</div><div style={faqAStyle}>{t.faq1a}</div></div>
        <div style={faqItemStyle}><div style={faqQStyle}>{t.faq2q}</div><div style={faqAStyle}>{t.faq2a}</div></div>
        <div style={faqItemStyle}><div style={faqQStyle}>{t.faq3q}</div><div style={faqAStyle}>{t.faq3a}</div></div>
        <div style={faqItemStyle}><div style={faqQStyle}>{t.faq4q}</div><div style={faqAStyle}>{t.faq4a}</div></div>
        <div style={faqItemStyle}><div style={faqQStyle}>{t.faq5q}</div><div style={faqAStyle}>{t.faq5a}</div></div>
        <div style={faqItemStyle}><div style={faqQStyle}>{t.faq6q}</div><div style={faqAStyle}>{t.faq6a}</div></div>
        <div style={faqItemStyle}><div style={faqQStyle}>{t.faq7q}</div><div style={faqAStyle}>{t.faq7a}</div></div>
        <div style={faqItemStyle}><div style={faqQStyle}>{t.faq8q}</div><div style={faqAStyle}>{t.faq8a}</div></div>
      </div>
    </div>
  );
}
