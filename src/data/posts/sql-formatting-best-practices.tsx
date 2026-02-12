'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'SQL Formatting Best Practices: Style Guide for Readable Queries',
    intro: 'Messy SQL is hard to debug, painful to review, and a nightmare to maintain. Whether you work solo or on a team, consistent SQL formatting transforms unreadable walls of text into clear, logical statements. This guide covers every aspect of SQL style -- from keyword casing and indentation to CTE formatting and naming conventions -- with before/after examples you can apply immediately.',

    whyTitle: '1. Why SQL Formatting Matters',
    whyDesc: 'SQL is often treated as a "write-once" language, but production queries get read dozens of times. Proper formatting pays dividends in three key areas:',
    whyReadability: 'Readability -- Well-formatted SQL lets you scan the query structure at a glance. You can instantly see which tables are joined, what filters apply, and what columns are selected.',
    whyCodeReview: 'Code Review -- Reviewers can focus on logic instead of deciphering structure. Diff views become meaningful when each clause occupies its own line.',
    whyDebugging: 'Debugging -- When a query returns wrong results, formatted SQL lets you isolate each clause and test it independently. Finding a misplaced AND or a wrong JOIN condition takes seconds instead of minutes.',
    whyMaintenance: 'Maintenance -- Six months from now, you (or your teammate) will need to modify that query. Formatted SQL makes modifications safe and predictable.',

    keywordsTitle: '2. Keywords: UPPERCASE vs lowercase',
    keywordsDesc: 'The two most common conventions for SQL keywords:',
    keywordsUpperTitle: 'Style A: UPPERCASE Keywords (Most Common)',
    keywordsUpperDesc: 'Uppercase keywords visually separate SQL structure from data identifiers. This is the most widely adopted convention and recommended for teams.',
    keywordsLowerTitle: 'Style B: lowercase Keywords',
    keywordsLowerDesc: 'Some developers prefer lowercase for a more modern feel. This works well with syntax highlighting in modern editors.',
    keywordsVerdict: 'Verdict: Pick one and enforce it across your team. UPPERCASE is the industry default and works best in plain-text contexts (logs, Slack, emails) where syntax highlighting is unavailable.',

    indentTitle: '3. Indentation: Tabs vs Spaces, One Clause Per Line',
    indentDesc: 'The golden rule: one major clause per line. This makes diffs clean and clauses easy to comment out.',
    indentRule1: 'Use consistent indentation (2 or 4 spaces; avoid tabs for portability).',
    indentRule2: 'Each major keyword (SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT) starts on a new line at the same indentation level.',
    indentRule3: 'Sub-clauses (JOIN conditions, AND/OR filters) are indented one level deeper.',
    indentRule4: 'Align related elements vertically when it improves readability.',

    selectTitle: '4. SELECT: One Column Per Line, Trailing vs Leading Commas',
    selectDesc: 'Listing one column per line makes it trivial to add, remove, or reorder columns. The comma placement debate has two camps:',
    selectTrailingTitle: 'Trailing Commas (More Common)',
    selectLeadingTitle: 'Leading Commas',
    selectLeadingDesc: 'Leading commas make it easier to spot missing commas and to comment out the last column. However, trailing commas are more natural to read and are the more common choice.',
    selectTip: 'Tip: Whichever you choose, always put each column on its own line in production queries. Never cram multiple columns onto one line.',

    joinTitle: '5. JOIN: Formatting Multi-Table Queries',
    joinDesc: 'JOINs are where formatting pays the biggest dividends. A well-formatted JOIN block clearly shows the relationship between tables.',
    joinRule1: 'Each JOIN starts on a new line at the same level as FROM.',
    joinRule2: 'The ON clause is indented under its JOIN.',
    joinRule3: 'Multi-condition ON clauses use AND on separate indented lines.',
    joinRule4: 'Always use explicit JOIN syntax (never comma-separated tables in FROM).',

    whereTitle: '6. WHERE: AND/OR Alignment, Subquery Indentation',
    whereDesc: 'WHERE clauses can grow complex quickly. Proper formatting keeps the logic tree visible.',
    whereRule1: 'Each AND/OR starts on a new line, aligned with the first condition or indented under WHERE.',
    whereRule2: 'Use parentheses explicitly for mixed AND/OR logic.',
    whereRule3: 'Indent subqueries as a nested block.',
    whereRule4: 'Place the operator (AND/OR) at the beginning of the line, not the end.',

    cteTitle: '7. CTEs (WITH): Formatting Common Table Expressions',
    cteDesc: 'CTEs are one of the best tools for query readability. Formatting them well amplifies their benefit.',
    cteRule1: 'WITH starts at the top level.',
    cteRule2: 'Each CTE name and AS is on the same line.',
    cteRule3: 'The CTE body is indented inside parentheses.',
    cteRule4: 'Separate multiple CTEs with a blank line for visual grouping.',
    cteRule5: 'The final SELECT starts at the same level as WITH.',

    namingTitle: '8. Naming Conventions',
    namingDesc: 'Consistent naming eliminates guesswork and reduces errors.',
    namingTable: 'Tables -- Use snake_case, plural nouns: users, order_items, product_categories.',
    namingColumn: 'Columns -- Use snake_case, descriptive names: created_at, is_active, total_amount.',
    namingAlias: 'Aliases -- Use meaningful short aliases, not single letters: ord instead of o, usr instead of u. Exception: simple two-table JOINs where single letters are obvious.',
    namingPrefix: 'Avoid prefixes -- Do not prefix columns with table abbreviations (tbl_users, col_name). The table context is already clear from the query.',
    namingBool: 'Booleans -- Prefix with is_, has_, or can_: is_active, has_subscription, can_edit.',
    namingPK: 'Primary Keys -- Use id for the primary key. Foreign keys should be table_singular_id: user_id, order_id.',

    examplesTitle: '9. Bad vs Good: 5 Before/After Comparisons',
    example1Title: 'Example 1: Simple SELECT',
    example2Title: 'Example 2: Multi-Table JOIN',
    example3Title: 'Example 3: Complex WHERE',
    example4Title: 'Example 4: Subquery',
    example5Title: 'Example 5: CTE with Aggregation',
    badLabel: 'Bad',
    goodLabel: 'Good',

    lintersTitle: '10. SQL Linters & Formatters',
    lintersDesc: 'Automate formatting to eliminate style debates and ensure consistency.',
    lintersToolName: 'Tool',
    lintersToolType: 'Type',
    lintersToolBest: 'Best For',
    sqlfluffDesc: 'Python-based linter/formatter. The most comprehensive option with 60+ configurable rules. Supports multiple SQL dialects (PostgreSQL, MySQL, BigQuery, Snowflake).',
    pgformatterDesc: 'Perl-based formatter focused on PostgreSQL. Fast, simple, and produces clean output. Available as a CLI tool and web interface.',
    sqlformatterDesc: 'JavaScript/npm package. Easy to integrate into Node.js projects, CI pipelines, and web applications. Supports multiple dialects.',
    sqlfluffExample: 'sqlfluff usage:',
    pgformatterExample: 'pgFormatter usage:',
    sqlformatterExample: 'sql-formatter (npm) usage:',

    ideTitle: '11. IDE Settings',
    ideDesc: 'Configure your editor to format SQL automatically.',
    vscodeTitle: 'VS Code',
    vscodeDesc: 'Install the "SQL Formatter" extension (adpyke.vscode-sql-formatter). Add to settings.json:',
    datagripTitle: 'DataGrip / JetBrains',
    datagripDesc: 'DataGrip has built-in SQL formatting. Go to Settings > Editor > Code Style > SQL and configure. Key settings:',
    dbeaverTitle: 'DBeaver',
    dbeaverDesc: 'DBeaver uses its own formatter. Go to Window > Preferences > SQL Editor > SQL Formatting. Enable "Insert spaces for tabs" and set keyword case to UPPER.',

    templateTitle: '12. Team Style Guide Template',
    templateDesc: 'Copy and adapt this template for your team. Store it in your repository as SQL_STYLE_GUIDE.md.',

    faqTitle: 'FAQ',
    faq1q: 'Does SQL formatting affect query performance?',
    faq1a: 'No. SQL formatting is purely cosmetic. The database engine parses and optimizes the query the same way regardless of whitespace, line breaks, or keyword casing. Format for humans, not for machines.',
    faq2q: 'Should I use trailing or leading commas?',
    faq2a: 'Both are valid. Trailing commas (column1, column2,) are more natural to read and more widely adopted. Leading commas (,column1 ,column2) make it easier to comment out columns. Choose one and enforce consistency.',
    faq3q: 'How do I enforce SQL formatting in a team?',
    faq3a: 'Use an automated tool like sqlfluff in your CI/CD pipeline. Add a pre-commit hook that runs the formatter. Document your style guide and link to it in your repository README. Automated enforcement is far more effective than code review comments.',
    faq4q: 'UPPERCASE or lowercase keywords -- which is more professional?',
    faq4a: 'UPPERCASE keywords are the traditional industry standard and work best in contexts without syntax highlighting (plain text, emails, documentation). Lowercase is gaining popularity in modern development environments with good syntax highlighting. Neither is "more professional" -- consistency matters more than the specific choice.',
    faq5q: 'How do I format dynamic SQL or ORM-generated queries?',
    faq5a: 'For dynamic SQL, format the template string as you would a normal query. For ORM-generated queries, most ORMs have a .toSQL() or .toString() method -- pipe the output through a formatter for debugging. In logs, use a formatter like sqlfluff fix --stdin to auto-format captured queries.',
  },
  zh: {
    title: 'SQL 格式化最佳实践：编写可读查询的风格指南',
    intro: '混乱的 SQL 难以调试、审查痛苦、维护更是噩梦。无论你是独立开发还是团队协作，一致的 SQL 格式化都能将难以阅读的文本墙转变为清晰、有逻辑的语句。本指南涵盖 SQL 风格的方方面面——从关键字大小写和缩进到 CTE 格式化和命名约定——附有即学即用的前后对比示例。',

    whyTitle: '1. 为什么 SQL 格式化很重要',
    whyDesc: 'SQL 常被当作"写一次"的语言对待，但生产环境的查询会被阅读几十次。良好的格式化在三个关键领域带来回报：',
    whyReadability: '可读性——格式良好的 SQL 让你一眼就能扫描查询结构。你可以立即看到连接了哪些表、应用了什么过滤条件以及选择了哪些列。',
    whyCodeReview: '代码审查——审查者可以专注于逻辑而不是解读结构。当每个子句占据独立的行时，diff 视图才有意义。',
    whyDebugging: '调试——当查询返回错误结果时，格式化的 SQL 让你可以隔离每个子句并独立测试。找到放错位置的 AND 或错误的 JOIN 条件只需几秒而不是几分钟。',
    whyMaintenance: '可维护性——六个月后，你（或你的队友）需要修改那个查询。格式化的 SQL 使修改安全且可预测。',

    keywordsTitle: '2. 关键字：大写 vs 小写',
    keywordsDesc: 'SQL 关键字最常见的两种约定：',
    keywordsUpperTitle: '风格 A：大写关键字（最常见）',
    keywordsUpperDesc: '大写关键字在视觉上将 SQL 结构与数据标识符分开。这是最广泛采用的约定，推荐团队使用。',
    keywordsLowerTitle: '风格 B：小写关键字',
    keywordsLowerDesc: '一些开发者偏好小写以获得更现代的感觉。这在现代编辑器的语法高亮下效果很好。',
    keywordsVerdict: '结论：选择一种并在团队中强制执行。大写是行业默认标准，在纯文本环境（日志、Slack、邮件）中没有语法高亮时效果最佳。',

    indentTitle: '3. 缩进：Tab vs 空格，一行一个子句',
    indentDesc: '黄金法则：每行一个主要子句。这使 diff 保持干净，子句易于注释。',
    indentRule1: '使用一致的缩进（2 或 4 个空格；避免使用 Tab 以确保可移植性）。',
    indentRule2: '每个主要关键字（SELECT、FROM、WHERE、GROUP BY、HAVING、ORDER BY、LIMIT）在同一缩进级别的新行开始。',
    indentRule3: '子子句（JOIN 条件、AND/OR 过滤器）缩进一级。',
    indentRule4: '当能提高可读性时，垂直对齐相关元素。',

    selectTitle: '4. SELECT：一行一列，尾部逗号 vs 前导逗号',
    selectDesc: '每行列出一列使添加、删除或重新排序列变得轻而易举。逗号位置的争论分为两个阵营：',
    selectTrailingTitle: '尾部逗号（更常见）',
    selectLeadingTitle: '前导逗号',
    selectLeadingDesc: '前导逗号更容易发现缺失的逗号，也更容易注释掉最后一列。但尾部逗号更自然，也是更常见的选择。',
    selectTip: '提示：无论选择哪种，在生产查询中始终将每列放在独立的行上。不要在一行中挤入多列。',

    joinTitle: '5. JOIN：格式化多表查询',
    joinDesc: 'JOIN 是格式化回报最大的地方。格式良好的 JOIN 块清楚地展示了表之间的关系。',
    joinRule1: '每个 JOIN 在与 FROM 相同级别的新行开始。',
    joinRule2: 'ON 子句缩进在其 JOIN 下方。',
    joinRule3: '多条件 ON 子句在单独缩进的行上使用 AND。',
    joinRule4: '始终使用显式 JOIN 语法（永远不要在 FROM 中使用逗号分隔的表）。',

    whereTitle: '6. WHERE：AND/OR 对齐，子查询缩进',
    whereDesc: 'WHERE 子句可能很快变得复杂。适当的格式化保持逻辑树可见。',
    whereRule1: '每个 AND/OR 在新行开始，与第一个条件对齐或缩进在 WHERE 下方。',
    whereRule2: '对混合的 AND/OR 逻辑显式使用括号。',
    whereRule3: '将子查询缩进为嵌套块。',
    whereRule4: '将运算符（AND/OR）放在行首，而不是行尾。',

    cteTitle: '7. CTE（WITH）：格式化公共表表达式',
    cteDesc: 'CTE 是提高查询可读性的最佳工具之一。良好的格式化会放大其好处。',
    cteRule1: 'WITH 在顶层开始。',
    cteRule2: '每个 CTE 名称和 AS 在同一行。',
    cteRule3: 'CTE 主体在括号内缩进。',
    cteRule4: '用空行分隔多个 CTE 以便视觉分组。',
    cteRule5: '最终的 SELECT 与 WITH 在同一级别开始。',

    namingTitle: '8. 命名约定',
    namingDesc: '一致的命名消除猜测并减少错误。',
    namingTable: '表——使用 snake_case，复数名词：users、order_items、product_categories。',
    namingColumn: '列——使用 snake_case，描述性名称：created_at、is_active、total_amount。',
    namingAlias: '别名——使用有意义的短别名，而不是单个字母：ord 而不是 o，usr 而不是 u。例外：单字母在简单的两表 JOIN 中显而易见时。',
    namingPrefix: '避免前缀——不要用表缩写前缀列名（tbl_users、col_name）。表上下文在查询中已经很清楚。',
    namingBool: '布尔值——前缀使用 is_、has_ 或 can_：is_active、has_subscription、can_edit。',
    namingPK: '主键——主键使用 id。外键应为 table_singular_id：user_id、order_id。',

    examplesTitle: '9. 差 vs 好：5 个前后对比',
    example1Title: '示例 1：简单 SELECT',
    example2Title: '示例 2：多表 JOIN',
    example3Title: '示例 3：复杂 WHERE',
    example4Title: '示例 4：子查询',
    example5Title: '示例 5：带聚合的 CTE',
    badLabel: '差',
    goodLabel: '好',

    lintersTitle: '10. SQL 代码检查器与格式化工具',
    lintersDesc: '自动化格式化以消除风格争论并确保一致性。',
    lintersToolName: '工具',
    lintersToolType: '类型',
    lintersToolBest: '最适合',
    sqlfluffDesc: '基于 Python 的代码检查/格式化工具。最全面的选项，有 60+ 可配置规则。支持多种 SQL 方言（PostgreSQL、MySQL、BigQuery、Snowflake）。',
    pgformatterDesc: '基于 Perl 的格式化器，专注于 PostgreSQL。快速、简单，输出整洁。可作为 CLI 工具和 Web 界面使用。',
    sqlformatterDesc: 'JavaScript/npm 包。易于集成到 Node.js 项目、CI 管道和 Web 应用中。支持多种方言。',
    sqlfluffExample: 'sqlfluff 用法：',
    pgformatterExample: 'pgFormatter 用法：',
    sqlformatterExample: 'sql-formatter (npm) 用法：',

    ideTitle: '11. IDE 设置',
    ideDesc: '配置编辑器以自动格式化 SQL。',
    vscodeTitle: 'VS Code',
    vscodeDesc: '安装 "SQL Formatter" 扩展（adpyke.vscode-sql-formatter）。添加到 settings.json：',
    datagripTitle: 'DataGrip / JetBrains',
    datagripDesc: 'DataGrip 有内置的 SQL 格式化。进入 Settings > Editor > Code Style > SQL 进行配置。关键设置：',
    dbeaverTitle: 'DBeaver',
    dbeaverDesc: 'DBeaver 使用自己的格式化器。进入 Window > Preferences > SQL Editor > SQL Formatting。启用 "Insert spaces for tabs" 并将关键字大小写设为 UPPER。',

    templateTitle: '12. 团队风格指南模板',
    templateDesc: '复制并调整此模板以适合你的团队。将其作为 SQL_STYLE_GUIDE.md 存储在你的代码仓库中。',

    faqTitle: '常见问题',
    faq1q: 'SQL 格式化会影响查询性能吗？',
    faq1a: '不会。SQL 格式化纯粹是视觉上的。无论空格、换行或关键字大小写如何，数据库引擎都以相同方式解析和优化查询。为人类格式化，而不是为机器。',
    faq2q: '应该使用尾部逗号还是前导逗号？',
    faq2a: '两者都有效。尾部逗号（column1, column2,）更自然，更广泛采用。前导逗号（,column1 ,column2）更容易注释列。选择一种并保持一致。',
    faq3q: '如何在团队中强制执行 SQL 格式化？',
    faq3a: '在 CI/CD 管道中使用 sqlfluff 等自动化工具。添加运行格式化器的 pre-commit 钩子。记录你的风格指南并在仓库 README 中链接。自动化执行远比代码审查评论有效。',
    faq4q: '大写还是小写关键字——哪个更专业？',
    faq4a: '大写关键字是传统的行业标准，在没有语法高亮的环境（纯文本、邮件、文档）中效果最佳。小写在有良好语法高亮的现代开发环境中越来越流行。两者都不"更专业"——一致性比具体选择更重要。',
    faq5q: '如何格式化动态 SQL 或 ORM 生成的查询？',
    faq5a: '对于动态 SQL，像格式化普通查询一样格式化模板字符串。对于 ORM 生成的查询，大多数 ORM 有 .toSQL() 或 .toString() 方法——将输出通过格式化器处理以便调试。在日志中，使用 sqlfluff fix --stdin 等格式化器自动格式化捕获的查询。',
  },
};

export default function SqlFormattingBestPractices({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p className="text-lg leading-relaxed mb-8">{t.intro}</p>

      {/* 1. Why SQL Formatting Matters */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.whyTitle}</h2>
      <p className="mb-4">{t.whyDesc}</p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>{t.whyReadability}</li>
        <li>{t.whyCodeReview}</li>
        <li>{t.whyDebugging}</li>
        <li>{t.whyMaintenance}</li>
      </ul>

      {/* 2. Keywords: UPPERCASE vs lowercase */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.keywordsTitle}</h2>
      <p className="mb-4">{t.keywordsDesc}</p>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.keywordsUpperTitle}</h3>
      <p className="mb-3">{t.keywordsUpperDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`SELECT
    user_id,
    first_name,
    last_name,
    email
FROM users
WHERE is_active = TRUE
ORDER BY created_at DESC
LIMIT 100;`}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.keywordsLowerTitle}</h3>
      <p className="mb-3">{t.keywordsLowerDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`select
    user_id,
    first_name,
    last_name,
    email
from users
where is_active = true
order by created_at desc
limit 100;`}</code></pre>

      <p className="text-sm text-gray-400 mt-4 mb-6">{t.keywordsVerdict}</p>

      {/* 3. Indentation */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.indentTitle}</h2>
      <p className="mb-4">{t.indentDesc}</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>{t.indentRule1}</li>
        <li>{t.indentRule2}</li>
        <li>{t.indentRule3}</li>
        <li>{t.indentRule4}</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`-- Each major clause on its own line, sub-clauses indented
SELECT
    u.user_id,
    u.email,
    COUNT(o.order_id) AS order_count
FROM users AS u
LEFT JOIN orders AS o
    ON u.user_id = o.user_id
WHERE u.is_active = TRUE
    AND u.created_at >= '2024-01-01'
GROUP BY
    u.user_id,
    u.email
HAVING COUNT(o.order_id) > 5
ORDER BY order_count DESC
LIMIT 20;`}</code></pre>

      {/* 4. SELECT: One Column Per Line */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.selectTitle}</h2>
      <p className="mb-4">{t.selectDesc}</p>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.selectTrailingTitle}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`SELECT
    user_id,
    first_name,
    last_name,
    email,
    created_at
FROM users;`}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.selectLeadingTitle}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`SELECT
    user_id
    , first_name
    , last_name
    , email
    , created_at
FROM users;`}</code></pre>
      <p className="text-sm text-gray-400 mt-2 mb-2">{t.selectLeadingDesc}</p>
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mt-4">
        <p className="text-blue-300 text-sm">{t.selectTip}</p>
      </div>

      {/* 5. JOIN Formatting */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.joinTitle}</h2>
      <p className="mb-4">{t.joinDesc}</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>{t.joinRule1}</li>
        <li>{t.joinRule2}</li>
        <li>{t.joinRule3}</li>
        <li>{t.joinRule4}</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`SELECT
    o.order_id,
    o.order_date,
    c.customer_name,
    p.product_name,
    oi.quantity,
    oi.unit_price
FROM orders AS o
INNER JOIN customers AS c
    ON o.customer_id = c.customer_id
INNER JOIN order_items AS oi
    ON o.order_id = oi.order_id
INNER JOIN products AS p
    ON oi.product_id = p.product_id
    AND p.is_active = TRUE
WHERE o.order_date >= '2024-01-01'
ORDER BY o.order_date DESC;`}</code></pre>

      {/* 6. WHERE Formatting */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.whereTitle}</h2>
      <p className="mb-4">{t.whereDesc}</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>{t.whereRule1}</li>
        <li>{t.whereRule2}</li>
        <li>{t.whereRule3}</li>
        <li>{t.whereRule4}</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`-- Simple WHERE with AND
WHERE u.is_active = TRUE
    AND u.email_verified = TRUE
    AND u.created_at >= '2024-01-01'

-- Mixed AND/OR with explicit parentheses
WHERE u.is_active = TRUE
    AND (
        u.role = 'admin'
        OR u.role = 'moderator'
    )
    AND u.last_login >= '2024-06-01'

-- Subquery in WHERE
WHERE u.user_id IN (
    SELECT o.user_id
    FROM orders AS o
    WHERE o.total_amount > 1000
        AND o.order_date >= '2024-01-01'
    GROUP BY o.user_id
    HAVING COUNT(*) >= 3
)`}</code></pre>

      {/* 7. CTEs */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.cteTitle}</h2>
      <p className="mb-4">{t.cteDesc}</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>{t.cteRule1}</li>
        <li>{t.cteRule2}</li>
        <li>{t.cteRule3}</li>
        <li>{t.cteRule4}</li>
        <li>{t.cteRule5}</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`WITH monthly_revenue AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(total_amount) AS revenue
    FROM orders
    WHERE order_date >= '2024-01-01'
    GROUP BY DATE_TRUNC('month', order_date)
),

revenue_growth AS (
    SELECT
        month,
        revenue,
        LAG(revenue) OVER (ORDER BY month) AS prev_revenue,
        ROUND(
            (revenue - LAG(revenue) OVER (ORDER BY month))
            / LAG(revenue) OVER (ORDER BY month) * 100,
            2
        ) AS growth_pct
    FROM monthly_revenue
)

SELECT
    month,
    revenue,
    prev_revenue,
    growth_pct
FROM revenue_growth
ORDER BY month;`}</code></pre>

      {/* 8. Naming Conventions */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.namingTitle}</h2>
      <p className="mb-4">{t.namingDesc}</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>{t.namingTable}</li>
        <li>{t.namingColumn}</li>
        <li>{t.namingAlias}</li>
        <li>{t.namingPrefix}</li>
        <li>{t.namingBool}</li>
        <li>{t.namingPK}</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`-- Good naming example
SELECT
    usr.user_id,
    usr.first_name,
    usr.is_active,
    ord.order_id,
    ord.total_amount,
    ord.created_at AS order_date
FROM users AS usr
INNER JOIN orders AS ord
    ON usr.user_id = ord.user_id
WHERE usr.is_active = TRUE
    AND usr.has_subscription = TRUE;`}</code></pre>

      {/* 9. Bad vs Good: 5 Before/After Comparisons */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.examplesTitle}</h2>

      {/* Example 1 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.example1Title}</h3>
      <p className="text-red-400 font-semibold mb-2">{t.badLabel}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm border-l-4 border-red-500"><code>{`select id,name,email,created_at from users where is_active=1 and role='admin' order by created_at desc limit 50;`}</code></pre>
      <p className="text-green-400 font-semibold mt-4 mb-2">{t.goodLabel}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm border-l-4 border-green-500"><code>{`SELECT
    id,
    name,
    email,
    created_at
FROM users
WHERE is_active = 1
    AND role = 'admin'
ORDER BY created_at DESC
LIMIT 50;`}</code></pre>

      {/* Example 2 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.example2Title}</h3>
      <p className="text-red-400 font-semibold mb-2">{t.badLabel}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm border-l-4 border-red-500"><code>{`select o.id,c.name,p.title,oi.qty,oi.price from orders o join customers c on o.customer_id=c.id join order_items oi on o.id=oi.order_id join products p on oi.product_id=p.id where o.status='completed' and o.created_at>='2024-01-01';`}</code></pre>
      <p className="text-green-400 font-semibold mt-4 mb-2">{t.goodLabel}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm border-l-4 border-green-500"><code>{`SELECT
    o.id AS order_id,
    c.name AS customer_name,
    p.title AS product_title,
    oi.qty,
    oi.price
FROM orders AS o
INNER JOIN customers AS c
    ON o.customer_id = c.id
INNER JOIN order_items AS oi
    ON o.id = oi.order_id
INNER JOIN products AS p
    ON oi.product_id = p.id
WHERE o.status = 'completed'
    AND o.created_at >= '2024-01-01';`}</code></pre>

      {/* Example 3 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.example3Title}</h3>
      <p className="text-red-400 font-semibold mb-2">{t.badLabel}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm border-l-4 border-red-500"><code>{`select * from users where (role='admin' or role='moderator') and is_active=1 and (last_login>='2024-01-01' or created_at>='2024-06-01') and email like '%@company.com' order by last_login desc;`}</code></pre>
      <p className="text-green-400 font-semibold mt-4 mb-2">{t.goodLabel}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm border-l-4 border-green-500"><code>{`SELECT
    user_id,
    email,
    role,
    last_login,
    created_at
FROM users
WHERE (
        role = 'admin'
        OR role = 'moderator'
    )
    AND is_active = 1
    AND (
        last_login >= '2024-01-01'
        OR created_at >= '2024-06-01'
    )
    AND email LIKE '%@company.com'
ORDER BY last_login DESC;`}</code></pre>

      {/* Example 4 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.example4Title}</h3>
      <p className="text-red-400 font-semibold mb-2">{t.badLabel}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm border-l-4 border-red-500"><code>{`select u.name,u.email from users u where u.id in (select o.user_id from orders o where o.total>500 group by o.user_id having count(*)>3) and u.is_active=1;`}</code></pre>
      <p className="text-green-400 font-semibold mt-4 mb-2">{t.goodLabel}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm border-l-4 border-green-500"><code>{`SELECT
    u.name,
    u.email
FROM users AS u
WHERE u.id IN (
    SELECT o.user_id
    FROM orders AS o
    WHERE o.total > 500
    GROUP BY o.user_id
    HAVING COUNT(*) > 3
)
    AND u.is_active = 1;`}</code></pre>

      {/* Example 5 */}
      <h3 className="text-xl font-semibold mt-8 mb-3">{t.example5Title}</h3>
      <p className="text-red-400 font-semibold mb-2">{t.badLabel}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm border-l-4 border-red-500"><code>{`with user_totals as (select user_id,sum(amount) as total from payments where status='completed' group by user_id), user_ranks as (select user_id,total,rank() over (order by total desc) as rnk from user_totals) select u.name,ur.total,ur.rnk from user_ranks ur join users u on ur.user_id=u.id where ur.rnk<=10;`}</code></pre>
      <p className="text-green-400 font-semibold mt-4 mb-2">{t.goodLabel}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm border-l-4 border-green-500"><code>{`WITH user_totals AS (
    SELECT
        user_id,
        SUM(amount) AS total
    FROM payments
    WHERE status = 'completed'
    GROUP BY user_id
),

user_ranks AS (
    SELECT
        user_id,
        total,
        RANK() OVER (ORDER BY total DESC) AS rnk
    FROM user_totals
)

SELECT
    u.name,
    ur.total,
    ur.rnk
FROM user_ranks AS ur
INNER JOIN users AS u
    ON ur.user_id = u.id
WHERE ur.rnk <= 10;`}</code></pre>

      {/* 10. SQL Linters & Formatters */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.lintersTitle}</h2>
      <p className="mb-4">{t.lintersDesc}</p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.lintersToolName}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.lintersToolType}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.lintersToolBest}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-sm">sqlfluff</td>
              <td className="border border-gray-700 px-4 py-2">Python CLI</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? 'CI/CD 管道、团队标准化' : 'CI/CD pipelines, team standardization'}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-sm">pgFormatter</td>
              <td className="border border-gray-700 px-4 py-2">Perl CLI / Web</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? 'PostgreSQL 项目' : 'PostgreSQL projects'}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-mono text-sm">sql-formatter</td>
              <td className="border border-gray-700 px-4 py-2">npm package</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? 'Node.js / Web 应用' : 'Node.js / Web apps'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mb-3">{t.sqlfluffDesc}</p>
      <p className="text-sm text-gray-400 mb-2">{t.sqlfluffExample}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Install
pip install sqlfluff

# Lint a file
sqlfluff lint query.sql --dialect postgres

# Auto-fix formatting
sqlfluff fix query.sql --dialect postgres

# Configuration (.sqlfluff in project root)
[sqlfluff]
dialect = postgres
templater = raw
max_line_length = 120

[sqlfluff:rules:capitalisation.keywords]
capitalisation_policy = upper

[sqlfluff:rules:capitalisation.identifiers]
capitalisation_policy = lower

[sqlfluff:indentation]
indent_unit = space
tab_space_size = 4`}</code></pre>

      <p className="mt-6 mb-3">{t.pgformatterDesc}</p>
      <p className="text-sm text-gray-400 mb-2">{t.pgformatterExample}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Install (macOS)
brew install pgformatter

# Format a file
pg_format -u 1 -s 4 query.sql -o formatted.sql

# Options:
#   -u 1    : uppercase keywords
#   -s 4    : 4-space indent
#   -f 1    : function-style formatting
#   -W 5    : wrap after 5 columns in SELECT`}</code></pre>

      <p className="mt-6 mb-3">{t.sqlformatterDesc}</p>
      <p className="text-sm text-gray-400 mb-2">{t.sqlformatterExample}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Install
npm install sql-formatter

// Usage in JavaScript/TypeScript
import { format } from 'sql-formatter';

const formatted = format(
  'select id,name from users where active=1',
  {
    language: 'postgresql',
    keywordCase: 'upper',
    tabWidth: 4,
    linesBetweenQueries: 2,
  }
);

console.log(formatted);
// SELECT
//     id,
//     name
// FROM
//     users
// WHERE
//     active = 1`}</code></pre>

      {/* 11. IDE Settings */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.ideTitle}</h2>
      <p className="mb-4">{t.ideDesc}</p>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.vscodeTitle}</h3>
      <p className="mb-3">{t.vscodeDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// .vscode/settings.json
{
  "sql-formatter.uppercase": true,
  "sql-formatter.indent": "    ",
  "sql-formatter.linesBetweenQueries": 2,
  "[sql]": {
    "editor.defaultFormatter": "adpyke.vscode-sql-formatter",
    "editor.formatOnSave": true,
    "editor.tabSize": 4,
    "editor.insertSpaces": true
  }
}`}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.datagripTitle}</h3>
      <p className="mb-3">{t.datagripDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`Settings > Editor > Code Style > SQL:
  - Word Case: Keywords = UPPER
  - Word Case: Identifiers = lower
  - Tabs and Indents:
    - Use tab character: OFF
    - Tab size: 4
    - Indent size: 4
  - Wrapping:
    - Wrap long lines: ON
    - Place commas: After item (trailing)
  - Clauses:
    - Place SELECT on new line: ON
    - Place FROM on new line: ON
    - Place ON in JOIN on new line: ON`}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.dbeaverTitle}</h3>
      <p className="mb-3">{t.dbeaverDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`Window > Preferences > SQL Editor > SQL Formatting:
  - Keyword case: UPPER
  - Indent type: Spaces
  - Indent size: 4
  - SELECT: Column list on new line
  - JOIN: ON clause on new line

Shortcut: Ctrl+Shift+F (format selected SQL)`}</code></pre>

      {/* 12. Team Style Guide Template */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.templateTitle}</h2>
      <p className="mb-4">{t.templateDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# SQL Style Guide

## Keywords
- UPPERCASE for all SQL keywords (SELECT, FROM, WHERE, JOIN, etc.)

## Indentation
- 4 spaces (no tabs)
- One clause per line (SELECT, FROM, WHERE, GROUP BY, ORDER BY)
- Sub-clauses indented one level (JOIN ON, AND, OR)

## SELECT
- One column per line
- Trailing commas
- Always alias computed columns

## FROM / JOIN
- Explicit JOIN syntax (never comma joins)
- Always use AS for table aliases
- ON clause indented under its JOIN
- Multi-condition ON: each AND on its own line

## WHERE
- AND/OR at the beginning of lines (not the end)
- Explicit parentheses for mixed AND/OR
- Subqueries indented as nested blocks

## CTEs
- Preferred over subqueries for readability
- Blank line between CTEs
- Final SELECT at the same level as WITH

## Naming
- Tables: snake_case, plural (users, order_items)
- Columns: snake_case, descriptive (created_at, is_active)
- Aliases: meaningful abbreviations (ord, usr, prod)
- Booleans: is_, has_, can_ prefix
- Primary keys: id
- Foreign keys: {table_singular}_id

## Enforcement
- Pre-commit hook: sqlfluff lint
- CI check: sqlfluff lint --dialect postgres
- Config: .sqlfluff in repo root`}</code></pre>

      {/* FAQ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.faqTitle}</h2>
      <div className="space-y-6">
        {[
          [t.faq1q, t.faq1a],
          [t.faq2q, t.faq2a],
          [t.faq3q, t.faq3a],
          [t.faq4q, t.faq4a],
          [t.faq5q, t.faq5a],
        ].map(([q, a], i) => (
          <div key={i} className="border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">{q}</h3>
            <p className="text-gray-300">{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
