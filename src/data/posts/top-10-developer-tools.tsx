import Link from 'next/link';

const translations: Record<string, Record<string, string | string[]>> = {
  en: {
    title: 'Top 10 Online Developer Tools Every Programmer Should Know',
    intro: 'The right tools can dramatically improve your productivity as a developer. From formatting code to generating secure passwords, online developer tools save time and reduce errors. This article introduces 10 essential online tools available on DevToolBox that every programmer should bookmark for daily use.',
    h2_tools: '10 Essential Developer Tools',
    tool1Title: '1. JSON Formatter & Validator',
    tool1Desc: 'Working with JSON APIs is a daily task for most developers. A JSON formatter takes messy, minified JSON and transforms it into readable, indented format with syntax highlighting. The validator catches syntax errors before they cause runtime issues.',
    tool1Use: 'Use it when: Debugging API responses, reading configuration files, or sharing JSON data with teammates.',
    tool2Title: '2. Cron Expression Generator',
    tool2Desc: 'Scheduling tasks with cron expressions is powerful but syntax can be confusing. A cron generator provides a visual interface to create schedules like "every 5 minutes" or "every Monday at 9 AM" without memorizing the cryptic syntax.',
    tool2Use: 'Use it when: Setting up automated backups, scheduling server maintenance, or configuring CI/CD pipelines.',
    tool3Title: '3. Strong Password Generator',
    tool3Desc: 'Security starts with strong credentials. A password generator creates cryptographically secure, random passwords that resist brute-force attacks. Most generators let you specify length and character types.',
    tool3Use: 'Use it when: Creating database passwords, setting up service accounts, or generating API keys.',
    tool4Title: '4. Hash Generator (MD5, SHA256, SHA512)',
    tool4Desc: 'Hash functions are essential for verifying file integrity and implementing security features. A multi-hash generator computes MD5, SHA1, SHA256, and SHA512 simultaneously for your input.',
    tool4Use: 'Use it when: Verifying downloaded files, testing password hashing implementations, or checking data integrity.',
    tool5Title: '5. Base64 Encoder/Decoder',
    tool5Desc: 'Base64 encoding is everywhere — from embedding images in HTML to encoding authentication tokens. An encoder/decoder tool handles the conversion instantly and can process text or binary files.',
    tool5Use: 'Use it when: Embedding images in CSS/HTML, debugging JWT tokens, or encoding binary data for JSON APIs.',
    tool6Title: '6. URL Encoder/Decoder',
    tool6Desc: 'Special characters in URLs must be percent-encoded to work correctly. A URL encoder converts spaces to %20, & to %26, and other special characters to their encoded equivalents.',
    tool6Use: 'Use it when: Constructing API URLs manually, debugging query parameters, or handling international characters in URLs.',
    tool7Title: '7. JWT Decoder',
    tool7Desc: 'JSON Web Tokens are the standard for API authentication. A JWT decoder reveals the header and payload without verifying the signature, making it invaluable for debugging authentication issues.',
    tool7Use: 'Use it when: Debugging OAuth flows, inspecting API tokens, or learning how JWTs work.',
    tool8Title: '8. Regular Expression Tester',
    tool8Desc: 'Regex is powerful but notoriously tricky to get right. A regex tester lets you write patterns and see real-time matches against test data, with explanations of what each part does.',
    tool8Use: 'Use it when: Validating email formats, parsing log files, or extracting data from strings.',
    tool9Title: '9. SQL Formatter',
    tool9Desc: 'Long SQL queries become unreadable quickly. An SQL formatter beautifies your queries with proper indentation, keyword capitalization, and consistent spacing.',
    tool9Use: 'Use it when: Reviewing complex queries, sharing SQL with teammates, or documenting database procedures.',
    tool10Title: '10. Text Diff Checker',
    tool10Desc: 'Comparing two versions of code or configuration files is a common task. A diff checker highlights additions, deletions, and modifications side by side.',
    tool10Use: 'Use it when: Reviewing code changes, comparing config files, or checking what changed between versions.',
    h2_comparison: 'Tool Comparison by Use Case',
    comparisonIntro: 'Quick reference for which tool to use:',
    catSecurity: 'Security Tasks',
    catSecurityTools: 'Password Generator, Hash Generator, JWT Decoder',
    catData: 'Data Formatting',
    catDataTools: 'JSON Formatter, SQL Formatter, Base64 Encoder',
    catWeb: 'Web Development',
    catWebTools: 'URL Encoder, JWT Decoder, Regex Tester',
    catDevOps: 'DevOps & Automation',
    catDevOpsTools: 'Cron Generator, Text Diff, Hash Generator',
    h2_bestPractices: 'How to Use Developer Tools Effectively',
    bp1Title: 'Bookmark Your Most-Used Tools',
    bp1Desc: 'Create a browser folder with your essential tools for quick access. DevToolBox provides all these tools in one place with a clean, fast interface.',
    bp2Title: 'Learn Keyboard Shortcuts',
    bp2Desc: 'Many tools support keyboard shortcuts for common actions like format, copy, and clear. Learning these saves significant time over repeated use.',
    bp3Title: 'Understand the Output',
    bp3Desc: 'Do not just copy-paste results. Take time to understand what the tool is doing — this improves your skills and helps debug issues when they arise.',
    bp4Title: 'Validate Critical Data',
    bp4Desc: 'For security-sensitive operations like password generation or hashing, double-check your inputs and outputs to ensure accuracy.',
    h2_integrating: 'Integrating Tools into Your Workflow',
    workflowIntro: 'Here is how to integrate these tools into your daily development workflow:',
    wf1: 'Morning: Check cron jobs with the Cron Expression Generator',
    wf2: 'Development: Format JSON responses and SQL queries as you work',
    wf3: 'Code Review: Use Text Diff to compare changes',
    wf4: 'Testing: Validate regex patterns and encode test data',
    wf5: 'Deployment: Generate secure passwords and verify file hashes',
    h2_conclusion: 'Conclusion',
    conclusion: 'These 10 online developer tools cover the most common tasks you will encounter in daily development work. By mastering these tools and integrating them into your workflow, you will save time, reduce errors, and produce better code. Bookmark DevToolBox for quick access to all these tools and more.',
    ctaText: 'All these tools and more — free and fast',
    ctaButton: 'Explore All DevToolBox Tools →',
  },
  zh: {
    title: '开发者必备的10个在线工具：每个程序员都应该知道',
    intro: '合适的工具可以显著提高开发者的生产力。从格式化代码到生成安全密码，在线开发者工具可以节省时间并减少错误。本文介绍了 DevToolBox 上提供的10个基本在线工具，每个程序员都应该将其添加为书签以供日常使用。',
    h2_tools: '10个必备开发者工具',
    tool1Title: '1. JSON 格式化器和验证器',
    tool1Desc: '对于大多数开发者来说，使用 JSON API 是日常任务。JSON 格式化器将混乱的、压缩的 JSON 转换为可读的、带缩进的格式，并带有语法高亮。验证器在运行时问题发生之前捕获语法错误。',
    tool1Use: '使用场景：调试 API 响应、阅读配置文件或与团队成员共享 JSON 数据时。',
    tool2Title: '2. Cron 表达式生成器',
    tool2Desc: '使用 cron 表达式调度任务功能强大，但语法可能令人困惑。Cron 生成器提供可视化界面来创建"每5分钟"或"每周一上午9点"等调度，无需记忆晦涩的语法。',
    tool2Use: '使用场景：设置自动备份、安排服务器维护或配置 CI/CD 流水线时。',
    tool3Title: '3. 强密码生成器',
    tool3Desc: '安全始于强凭据。密码生成器创建加密安全的随机密码，能够抵抗暴力破解攻击。大多数生成器允许您指定长度和字符类型。',
    tool3Use: '使用场景：创建数据库密码、设置服务账户或生成 API 密钥时。',
    tool4Title: '4. 哈希生成器（MD5、SHA256、SHA512）',
    tool4Desc: '哈希函数对于验证文件完整性和实现安全功能至关重要。多哈希生成器同时为输入计算 MD5、SHA1、SHA256 和 SHA512。',
    tool4Use: '使用场景：验证下载文件、测试密码哈希实现或检查数据完整性时。',
    tool5Title: '5. Base64 编码器/解码器',
    tool5Desc: 'Base64 编码无处不在 —— 从在 HTML 中嵌入图片到编码认证令牌。编码器/解码器工具即时处理转换，可以处理文本或二进制文件。',
    tool5Use: '使用场景：在 CSS/HTML 中嵌入图片、调试 JWT 令牌或为 JSON API 编码二进制数据时。',
    tool6Title: '6. URL 编码器/解码器',
    tool6Desc: 'URL 中的特殊字符必须进行百分号编码才能正常工作。URL 编码器将空格转换为 %20，& 转换为 %26，其他特殊字符转换为相应的编码。',
    tool6Use: '使用场景：手动构建 API URL、调试查询参数或处理 URL 中的国际字符时。',
    tool7Title: '7. JWT 解码器',
    tool7Desc: 'JSON Web Token 是 API 认证的标准。JWT 解码器可以在不验证签名的情况下显示头部和载荷，使其成为调试认证问题的宝贵工具。',
    tool7Use: '使用场景：调试 OAuth 流程、检查 API 令牌或了解 JWT 工作原理时。',
    tool8Title: '8. 正则表达式测试器',
    tool8Desc: '正则表达式功能强大，但 notoriously 难以正确使用。正则测试器让您编写模式并在测试数据上查看实时匹配，同时解释每个部分的作用。',
    tool8Use: '使用场景：验证邮箱格式、解析日志文件或从字符串中提取数据时。',
    tool9Title: '9. SQL 格式化器',
    tool9Desc: '长 SQL 查询很快变得难以阅读。SQL 格式化器通过适当的缩进、关键字大写和一致的间距美化您的查询。',
    tool9Use: '使用场景：审查复杂查询、与团队成员共享 SQL 或记录数据库过程时。',
    tool10Title: '10. 文本差异检查器',
    tool10Desc: '比较代码或配置文件的两个版本是常见任务。差异检查器并排显示添加、删除和修改。',
    tool10Use: '使用场景：审查代码更改、比较配置文件或检查版本之间的变化时。',
    h2_comparison: '按用例的工具对比',
    comparisonIntro: '快速参考应该使用哪个工具：',
    catSecurity: '安全任务',
    catSecurityTools: '密码生成器、哈希生成器、JWT 解码器',
    catData: '数据格式化',
    catDataTools: 'JSON 格式化器、SQL 格式化器、Base64 编码器',
    catWeb: 'Web 开发',
    catWebTools: 'URL 编码器、JWT 解码器、正则测试器',
    catDevOps: 'DevOps 和自动化',
    catDevOpsTools: 'Cron 生成器、文本差异、哈希生成器',
    h2_bestPractices: '如何有效使用开发者工具',
    bp1Title: '收藏最常用的工具',
    bp1Desc: '创建一个浏览器文件夹存放您的必备工具以便快速访问。DevToolBox 在一个地方提供所有这些工具，界面简洁快速。',
    bp2Title: '学习键盘快捷键',
    bp2Desc: '许多工具支持常见操作的键盘快捷键，如格式化、复制和清除。学习这些可以在重复使用中节省大量时间。',
    bp3Title: '理解输出',
    bp3Desc: '不要只是复制粘贴结果。花时间了解工具在做什么 —— 这可以提高您的技能并帮助在问题出现时进行调试。',
    bp4Title: '验证关键数据',
    bp4Desc: '对于密码生成或哈希等安全敏感操作，仔细检查输入和输出以确保准确性。',
    h2_integrating: '将工具集成到您的工作流',
    workflowIntro: '以下是如何将这些工具集成到您的日常开发工作流程中：',
    wf1: '早上：使用 Cron 表达式生成器检查 cron 任务',
    wf2: '开发：工作时格式化 JSON 响应和 SQL 查询',
    wf3: '代码审查：使用文本差异比较更改',
    wf4: '测试：验证正则模式并编码测试数据',
    wf5: '部署：生成安全密码并验证文件哈希',
    h2_conclusion: '结论',
    conclusion: '这10个在线开发者工具涵盖了您在日常开发工作中遇到的最常见任务。通过掌握这些工具并将它们集成到您的工作流程中，您将节省时间、减少错误并产出更好的代码。将 DevToolBox 添加为书签以便快速访问所有这些工具及更多。',
    ctaText: '所有这些工具及更多 —— 免费且快速',
    ctaButton: '探索所有 DevToolBox 工具 →',
  },
};

const h2Style: React.CSSProperties = { 
  fontSize: 22, 
  fontWeight: 700, 
  marginTop: 40, 
  marginBottom: 16, 
  color: 'var(--text-primary)' 
};

export default function Top10DeveloperTools({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const tools = [
    { title: t.tool1Title, desc: t.tool1Desc, use: t.tool1Use, link: 'json-formatter' },
    { title: t.tool2Title, desc: t.tool2Desc, use: t.tool2Use, link: 'cron-generator' },
    { title: t.tool3Title, desc: t.tool3Desc, use: t.tool3Use, link: 'password-generator' },
    { title: t.tool4Title, desc: t.tool4Desc, use: t.tool4Use, link: 'hash-generator' },
    { title: t.tool5Title, desc: t.tool5Desc, use: t.tool5Use, link: 'base64' },
    { title: t.tool6Title, desc: t.tool6Desc, use: t.tool6Use, link: 'url-encoder' },
    { title: t.tool7Title, desc: t.tool7Desc, use: t.tool7Use, link: 'jwt-decoder' },
    { title: t.tool8Title, desc: t.tool8Desc, use: t.tool8Use, link: 'regex-tester' },
    { title: t.tool9Title, desc: t.tool9Desc, use: t.tool9Use, link: 'sql-formatter' },
    { title: t.tool10Title, desc: t.tool10Desc, use: t.tool10Use, link: 'text-diff' },
  ];

  return (
    <div>
      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{t.intro}</p>

      <h2 style={h2Style}>{t.h2_tools}</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 30 }}>
        {tools.map((tool, i) => (
          <div key={i} style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
              <Link href={`/${lang}/tools/${tool.link}`} style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>
                {(tool.title as string).split(':')[0]}
              </Link>
              <span style={{ color: 'var(--text-primary)' }}>: {(tool.title as string).split(':')[1]}</span>
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 8 }}>{tool.desc}</p>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>{tool.use}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.ctaText}</p>
        <Link href={`/${lang}/tools`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          {t.ctaButton}
        </Link>
      </div>

      <h2 style={h2Style}>{t.h2_comparison}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.comparisonIntro}</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { cat: t.catSecurity, tools: t.catSecurityTools },
          { cat: t.catData, tools: t.catDataTools },
          { cat: t.catWeb, tools: t.catWebTools },
          { cat: t.catDevOps, tools: t.catDevOpsTools },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: 'var(--accent-blue)' }}>{item.cat}</h4>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{item.tools}</p>
          </div>
        ))}
      </div>

      <h2 style={h2Style}>{t.h2_bestPractices}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {[
          { title: t.bp1Title, desc: t.bp1Desc },
          { title: t.bp2Title, desc: t.bp2Desc },
          { title: t.bp3Title, desc: t.bp3Desc },
          { title: t.bp4Title, desc: t.bp4Desc },
        ].map((bp, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid var(--accent-green)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>{bp.title}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{bp.desc}</p>
          </div>
        ))}
      </div>

      <h2 style={h2Style}>{t.h2_integrating}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.workflowIntro}</p>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{t.wf1}</li>
        <li>{t.wf2}</li>
        <li>{t.wf3}</li>
        <li>{t.wf4}</li>
        <li>{t.wf5}</li>
      </ul>

      <h2 style={h2Style}>{t.h2_conclusion}</h2>
      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{t.conclusion}</p>
    </div>
  );
}
