import Link from 'next/link';

export default function ChmodPermissionsExplained({ lang }: { lang: string }) {
  const t: Record<string, Record<string, string>> = {
    en: {
      title: 'Linux File Permissions Explained: chmod 777, 755, 644 and More',
      intro: 'Linux file permissions control who can read, write, and execute files. Understanding chmod and permission notation is essential for every developer working with servers, Docker, or CI/CD pipelines.',
      whatTitle: 'Understanding the Permission System',
      whatDesc: 'Every file and directory in Linux has three permission sets: one for the owner (user), one for the group, and one for others (everyone else). Each set can grant three types of access:',
      readPerm: 'Read (r) — View file contents or list directory entries',
      writePerm: 'Write (w) — Modify file contents or create/delete files in a directory',
      execPerm: 'Execute (x) — Run a file as a program or enter a directory',
      octalTitle: 'Octal Notation Explained',
      octalDesc: 'Each permission set can be represented as a single digit from 0 to 7. The digit is the sum of the permission values:',
      octalRead: 'Read = 4',
      octalWrite: 'Write = 2',
      octalExec: 'Execute = 1',
      octalNone: 'No permission = 0',
      octalTable: 'Octal Reference Table',
      commonTitle: 'Common Permission Values',
      perm777: '777 — Full access for everyone (owner + group + others). Avoid in production! Only use for temporary debugging.',
      perm755: '755 — Owner can do everything; group and others can read and execute. Standard for directories and executables.',
      perm644: '644 — Owner can read and write; group and others can only read. Standard for regular files.',
      perm600: '600 — Owner can read and write; no one else has access. Use for private config files and SSH keys.',
      perm400: '400 — Owner can only read. Use for sensitive read-only files like certificates.',
      syntaxTitle: 'chmod Command Syntax',
      numericDesc: 'Numeric mode sets all permissions at once:',
      symbolicDesc: 'Symbolic mode modifies specific permissions:',
      symbolicExamples: 'Symbolic examples:',
      examplesTitle: 'Practical Examples',
      specialTitle: 'Special Permissions: SUID, SGID, Sticky Bit',
      suidDesc: 'SUID (4xxx) — Run file as the file owner. Example: /usr/bin/passwd runs as root.',
      sgidDesc: 'SGID (2xxx) — Run file as the file group, or new files in directory inherit group.',
      stickyDesc: 'Sticky Bit (1xxx) — Only file owner can delete files in directory. Example: /tmp.',
      mistakesTitle: 'Common Mistakes and Security Tips',
      mistake1: 'Never use chmod 777 in production — it gives everyone full access.',
      mistake2: 'SSH keys must be 600 or 400 — SSH refuses to use keys with group/other access.',
      mistake3: 'Web server files should be 644 (files) and 755 (directories).',
      mistake4: 'Use chmod -R carefully — recursive changes can break things.',
      mistake5: 'Check permissions with ls -la before and after changes.',
      tryTool: 'Try our interactive Chmod Calculator',
      faq1q: 'What does chmod 777 mean?',
      faq1a: 'chmod 777 gives read (4), write (2), and execute (1) permissions to the owner, group, and others — total access for everyone. This is a security risk and should be avoided in production.',
      faq2q: 'What is the difference between 755 and 644?',
      faq2a: '755 allows the owner full access and others read+execute (used for directories and scripts). 644 allows the owner read+write and others read-only (used for regular files).',
      faq3q: 'Why does SSH reject my key file?',
      faq3a: 'SSH requires private key files to have permissions 600 or stricter. Run: chmod 600 ~/.ssh/id_rsa',
      faq4q: 'What is the sticky bit?',
      faq4a: 'The sticky bit (chmod 1xxx or chmod +t) prevents users from deleting files they do not own in a shared directory. The /tmp directory uses this.',
      faq5q: 'How do I check current file permissions?',
      faq5a: 'Run ls -la to see permissions in rwx format. The first column shows the permission string like -rwxr-xr-x (which equals 755).',
    },
    zh: {
      title: 'Linux 文件权限详解：chmod 777、755、644 的含义',
      intro: 'Linux 文件权限控制谁可以读取、写入和执行文件。理解 chmod 和权限表示法对于使用服务器、Docker 或 CI/CD 的开发者至关重要。',
      whatTitle: '理解权限系统',
      whatDesc: 'Linux 中每个文件和目录都有三组权限：所有者（user）、所属组（group）和其他人（others）。每组可授予三种访问权限：',
      readPerm: '读取 (r) — 查看文件内容或列出目录条目',
      writePerm: '写入 (w) — 修改文件内容或在目录中创建/删除文件',
      execPerm: '执行 (x) — 以程序方式运行文件或进入目录',
      octalTitle: '八进制表示法详解',
      octalDesc: '每组权限可以用 0-7 的单个数字表示，数字是权限值的总和：',
      octalRead: '读取 = 4', octalWrite: '写入 = 2', octalExec: '执行 = 1', octalNone: '无权限 = 0',
      octalTable: '八进制参考表',
      commonTitle: '常用权限值',
      perm777: '777 — 所有人完全访问。生产环境中避免使用！仅用于临时调试。',
      perm755: '755 — 所有者完全权限；组和其他人可读取和执行。目录和可执行文件的标准权限。',
      perm644: '644 — 所有者可读写；组和其他人只读。普通文件的标准权限。',
      perm600: '600 — 仅所有者可读写。用于私密配置文件和 SSH 密钥。',
      perm400: '400 — 仅所有者只读。用于证书等敏感只读文件。',
      syntaxTitle: 'chmod 命令语法',
      numericDesc: '数字模式一次设置所有权限：',
      symbolicDesc: '符号模式修改特定权限：',
      symbolicExamples: '符号模式示例：',
      examplesTitle: '实用示例',
      specialTitle: '特殊权限：SUID、SGID、Sticky Bit',
      suidDesc: 'SUID (4xxx) — 以文件所有者身份运行。例如 /usr/bin/passwd 以 root 运行。',
      sgidDesc: 'SGID (2xxx) — 以文件组身份运行，或目录中新文件继承组。',
      stickyDesc: 'Sticky Bit (1xxx) — 仅文件所有者可删除目录中的文件。例如 /tmp。',
      mistakesTitle: '常见错误和安全提示',
      mistake1: '生产环境中不要使用 chmod 777 — 它给所有人完全访问权限。',
      mistake2: 'SSH 密钥必须是 600 或 400 — SSH 拒绝使用组/其他人可访问的密钥。',
      mistake3: 'Web 服务器文件应为 644（文件）和 755（目录）。',
      mistake4: '谨慎使用 chmod -R — 递归更改可能破坏系统。',
      mistake5: '更改前后用 ls -la 检查权限。',
      tryTool: '试试我们的交互式 Chmod 计算器',
      faq1q: 'chmod 777 是什么意思？', faq1a: 'chmod 777 给所有者、组和其他人读取(4)、写入(2)和执行(1)权限 — 所有人完全访问。这是安全风险，应在生产环境中避免。',
      faq2q: '755 和 644 有什么区别？', faq2a: '755 给所有者完全权限，其他人读取+执行（用于目录和脚本）。644 给所有者读写，其他人只读（用于普通文件）。',
      faq3q: '为什么 SSH 拒绝我的密钥文件？', faq3a: 'SSH 要求私钥文件权限为 600 或更严格。运行：chmod 600 ~/.ssh/id_rsa',
      faq4q: '什么是 Sticky Bit？', faq4a: 'Sticky bit (chmod 1xxx 或 chmod +t) 防止用户删除共享目录中非自己所有的文件。/tmp 目录使用此功能。',
      faq5q: '如何查看当前文件权限？', faq5a: '运行 ls -la 查看 rwx 格式的权限。第一列显示如 -rwxr-xr-x（等于 755）的权限字符串。',
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

  const octalData = [
    ['0', '---', 'No permission'],
    ['1', '--x', 'Execute only'],
    ['2', '-w-', 'Write only'],
    ['3', '-wx', 'Write + Execute'],
    ['4', 'r--', 'Read only'],
    ['5', 'r-x', 'Read + Execute'],
    ['6', 'rw-', 'Read + Write'],
    ['7', 'rwx', 'Read + Write + Execute'],
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <h2 style={h2Style}>{ct.whatTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.whatDesc}</p>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20 }}>
        <li><strong>r</strong> — {ct.readPerm}</li>
        <li><strong>w</strong> — {ct.writePerm}</li>
        <li><strong>x</strong> — {ct.execPerm}</li>
      </ul>

      <pre style={codeStyle}><code>{`-rwxr-xr-x  1 user group  4096 Feb 10 file.sh
 │││ │││ │││
 │││ │││ └── Others: r-x (read + execute = 5)
 │││ └──── Group:  r-x (read + execute = 5)
 └────── Owner:  rwx (read + write + execute = 7)

 Result: 755`}</code></pre>

      <h2 style={h2Style}>{ct.octalTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.octalDesc}</p>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20 }}>
        <li><code style={{ color: 'var(--accent-blue)' }}>4</code> — {ct.octalRead}</li>
        <li><code style={{ color: 'var(--accent-blue)' }}>2</code> — {ct.octalWrite}</li>
        <li><code style={{ color: 'var(--accent-blue)' }}>1</code> — {ct.octalExec}</li>
        <li><code style={{ color: 'var(--accent-blue)' }}>0</code> — {ct.octalNone}</li>
      </ul>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 12 }}>{ct.octalTable}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead><tr><th style={thStyle}>Octal</th><th style={thStyle}>rwx</th><th style={thStyle}>Meaning</th></tr></thead>
          <tbody>
            {octalData.map(([octal, rwx, meaning]) => (
              <tr key={octal}><td style={tdStyle}><code>{octal}</code></td><td style={tdStyle}><code>{rwx}</code></td><td style={tdStyle}>{meaning}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.commonTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { code: '777', color: '#ef4444', desc: ct.perm777 },
          { code: '755', color: '#3b82f6', desc: ct.perm755 },
          { code: '644', color: '#22c55e', desc: ct.perm644 },
          { code: '600', color: '#f59e0b', desc: ct.perm600 },
          { code: '400', color: '#8b5cf6', desc: ct.perm400 },
        ].map(p => (
          <div key={p.code} style={{ display: 'flex', gap: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', alignItems: 'center' }}>
            <code style={{ fontSize: 20, fontWeight: 800, color: p.color, minWidth: 50 }}>{p.code}</code>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.desc}</span>
          </div>
        ))}
      </div>

      <h2 style={h2Style}>{ct.syntaxTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 12 }}>{ct.numericDesc}</p>
      <pre style={codeStyle}><code>{`chmod 755 script.sh        # rwxr-xr-x
chmod 644 config.json      # rw-r--r--
chmod 600 id_rsa           # rw-------
chmod -R 755 /var/www/html # Recursive`}</code></pre>

      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 20, marginBottom: 12 }}>{ct.symbolicDesc}</p>
      <pre style={codeStyle}><code>{`chmod u+x script.sh        # Add execute for owner
chmod g-w file.txt         # Remove write from group
chmod o+r file.txt         # Add read for others
chmod a+x script.sh        # Add execute for all (a = all)
chmod u=rwx,go=rx dir/     # Set owner=rwx, group+others=rx`}</code></pre>

      <h2 style={h2Style}>{ct.examplesTitle}</h2>
      <pre style={codeStyle}><code>{`# Web server setup
chmod 755 /var/www/html
chmod 644 /var/www/html/index.html
chmod 644 /var/www/html/style.css

# SSH key permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
chmod 600 ~/.ssh/authorized_keys

# Script permissions
chmod +x deploy.sh
chmod 755 /usr/local/bin/my-tool

# Docker volume permissions
chmod -R 777 /tmp/build    # Temporary build dir only!`}</code></pre>

      <h2 style={h2Style}>{ct.specialTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <strong style={{ color: '#f59e0b' }}>SUID (4xxx)</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.suidDesc}</p>
          <pre style={{ ...codeStyle, marginTop: 8, padding: '8px 12px' }}><code>chmod 4755 /usr/bin/passwd</code></pre>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <strong style={{ color: '#3b82f6' }}>SGID (2xxx)</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.sgidDesc}</p>
          <pre style={{ ...codeStyle, marginTop: 8, padding: '8px 12px' }}><code>chmod 2755 /shared/project</code></pre>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <strong style={{ color: '#22c55e' }}>Sticky Bit (1xxx)</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.stickyDesc}</p>
          <pre style={{ ...codeStyle, marginTop: 8, padding: '8px 12px' }}><code>chmod 1777 /tmp</code></pre>
        </div>
      </div>

      <h2 style={h2Style}>{ct.mistakesTitle}</h2>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{ct.mistake1}</li>
        <li>{ct.mistake2}</li>
        <li>{ct.mistake3}</li>
        <li>{ct.mistake4}</li>
        <li>{ct.mistake5}</li>
      </ul>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTool}</p>
        <Link href={`/${lang}/tools/chmod-calculator`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          Chmod Calculator →
        </Link>
      </div>

      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a], [ct.faq2q, ct.faq2a], [ct.faq3q, ct.faq3a], [ct.faq4q, ct.faq4a], [ct.faq5q, ct.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
