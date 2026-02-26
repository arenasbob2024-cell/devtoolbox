'use client';

import Link from 'next/link';

export default function SqlFormatterOnlineGuide({ lang }: { lang: string }) {
  return (
    <>
      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A <strong>SQL formatter</strong> (also called a SQL beautifier or SQL pretty printer) transforms messy, unindented SQL queries into clean, consistently styled code that is easy to read, review, and debug. Whether you are working with simple SELECT statements or complex multi-table JOINs with subqueries and CTEs, formatting your SQL dramatically improves code quality and team collaboration. Use our free <Link href={`/${lang}/tools/sql-formatter`}>SQL formatter online</Link> to instantly beautify any SQL query in your browser, with support for MySQL, PostgreSQL, SQLite, and SQL Server dialects.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>SQL formatting</strong> adds consistent indentation, line breaks, and keyword casing to make queries readable and maintainable.</li>
          <li>Use a <Link href={`/${lang}/tools/sql-formatter`}>SQL formatter online</Link> for instant, zero-install query beautification directly in your browser.</li>
          <li>Uppercase SQL keywords (SELECT, FROM, WHERE, JOIN) is the most widely adopted convention for visual distinction.</li>
          <li>Always place each major clause (SELECT, FROM, WHERE, GROUP BY, ORDER BY) on its own line for clarity.</li>
          <li>Format JOINs with the join type, table, and ON condition each clearly visible, using indentation to show relationships.</li>
          <li>Use Common Table Expressions (CTEs) instead of deeply nested subqueries to improve readability and testability.</li>
          <li>Different SQL dialects (MySQL, PostgreSQL, SQLite, SQL Server) have distinct syntax nuances that formatters should handle.</li>
          <li>Integrate SQL linting tools like <strong>sqlfluff</strong> into your CI/CD pipeline to enforce consistent formatting across your team.</li>
        </ul>
      </div>

      <h2>Why SQL Formatting Matters</h2>
      <p>
        SQL is one of the most widely used programming languages in the world. Every application that interacts with a relational database relies on SQL queries to read, write, and transform data. Yet SQL is also one of the most commonly written in an unformatted, inconsistent style. Developers frequently write quick one-liner queries during debugging, copy SQL from ORMs or query builders, or inherit legacy queries that were never properly formatted.
      </p>
      <p>
        Unformatted SQL creates real problems. A 200-character single-line query with multiple JOINs and conditions is extremely difficult to understand at a glance. When a bug appears in production, the developer who needs to diagnose the issue must first mentally parse the query structure before they can even begin to identify the problem. This wastes time and increases the risk of introducing new errors during fixes.
      </p>
      <p>
        <strong>SQL formatting</strong> solves these problems by applying consistent indentation, line breaks, keyword casing, and alignment rules to your queries. The semantic meaning of the query remains identical, but the visual structure becomes immediately clear. You can see at a glance which tables are joined, what conditions filter the results, how data is grouped and sorted, and where subqueries or CTEs add complexity.
      </p>
      <p>
        Studies on code readability consistently show that well-formatted code is reviewed faster, contains fewer bugs, and is easier to maintain over time. This applies to SQL just as much as it does to Python, JavaScript, or any other language. If your team does code reviews on SQL queries (and you should), formatting is not optional.
      </p>

      <h2>SQL Formatter Online: Instant Query Beautification</h2>
      <p>
        The fastest way to format SQL is with a browser-based tool. No installation, no configuration, no editor plugins required. Just paste your SQL and get perfectly formatted output. Our <Link href={`/${lang}/tools/sql-formatter`}>SQL formatter online tool</Link> provides:
      </p>
      <ul>
        <li><strong>Instant formatting:</strong> Paste raw SQL on the left, see beautified output on the right in real time.</li>
        <li><strong>Dialect support:</strong> Choose between MySQL, PostgreSQL, SQLite, SQL Server, and standard SQL formatting rules.</li>
        <li><strong>Keyword casing:</strong> Automatically uppercase SQL keywords while preserving the case of table and column names.</li>
        <li><strong>Customizable indentation:</strong> Select 2-space, 4-space, or tab-based indentation to match your team conventions.</li>
        <li><strong>One-click copy:</strong> Copy the formatted result to your clipboard instantly.</li>
        <li><strong>Privacy first:</strong> All processing happens client-side in your browser. No data is sent to any server.</li>
      </ul>
      <p>
        This is ideal when you extract a query from application logs, receive SQL from a colleague, export queries from a database GUI, or need to clean up SQL generated by an ORM. Instead of manually adding line breaks and indentation, paste the query and get clean output in milliseconds. Try it now: <Link href={`/${lang}/tools/sql-formatter`}>format SQL online</Link>.
      </p>

      <h2>SQL Formatting Best Practices</h2>
      <p>
        While there is no single universal SQL style guide (unlike Python's PEP 8 or JavaScript's Prettier defaults), the following conventions are widely adopted by database teams, open-source projects, and major tech companies. Applying these consistently will make your SQL immediately more readable.
      </p>

      <h3>1. Uppercase SQL Keywords</h3>
      <p>
        The most universally adopted SQL convention is to write reserved keywords in uppercase. This creates a clear visual distinction between the query structure and the data-specific elements (table names, column names, aliases).
      </p>
      <pre><code className="language-sql">{`-- Good: Keywords in uppercase
SELECT
  u.id,
  u.name,
  u.email,
  COUNT(o.id) AS order_count
FROM users u
INNER JOIN orders o ON o.user_id = u.id
WHERE u.status = 'active'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 5
ORDER BY order_count DESC
LIMIT 20;

-- Avoid: Mixed case or all lowercase keywords
select u.id, u.name, u.email, count(o.id) as order_count
from users u inner join orders o on o.user_id = u.id
where u.status = 'active' group by u.id, u.name, u.email
having count(o.id) > 5 order by order_count desc limit 20;`}</code></pre>
      <p>
        When keywords are uppercase, you can scan a query vertically and instantly identify the SELECT, FROM, WHERE, GROUP BY, and ORDER BY clauses. This is especially valuable in long queries with many conditions.
      </p>

      <h3>2. One Clause Per Line</h3>
      <p>
        Each major SQL clause should start on its own line. This is the single most impactful formatting rule. It transforms a wall of text into a structured document.
      </p>
      <pre><code className="language-sql">{`-- Good: Each clause on its own line
SELECT
  p.product_name,
  p.category,
  p.price,
  s.quantity_in_stock
FROM products p
LEFT JOIN stock s
  ON s.product_id = p.id
WHERE p.price > 50.00
  AND p.category IN ('electronics', 'software')
  AND s.quantity_in_stock > 0
ORDER BY p.price DESC;`}</code></pre>
      <p>
        Notice how the WHERE conditions are indented under the WHERE keyword. This makes it clear that all three conditions belong to the same filtering clause. The same pattern applies to JOIN conditions indented under the JOIN keyword.
      </p>

      <h3>3. Indent Selected Columns</h3>
      <p>
        When a SELECT statement retrieves more than two or three columns, list each column on its own line with consistent indentation. This makes it easy to count columns, add or remove columns, and spot typos.
      </p>
      <pre><code className="language-sql">{`-- Good: Each column on its own line
SELECT
  e.employee_id,
  e.first_name,
  e.last_name,
  e.department,
  e.hire_date,
  e.salary,
  m.first_name AS manager_name
FROM employees e
LEFT JOIN employees m
  ON m.employee_id = e.manager_id;

-- Acceptable for short queries
SELECT id, name, email
FROM users
WHERE id = 42;`}</code></pre>

      <h3>4. Consistent Naming Conventions</h3>
      <p>
        While formatting handles the visual layout, naming conventions handle the semantic clarity. These two work together to produce truly readable SQL.
      </p>
      <ul>
        <li><strong>Table names:</strong> Use <code>snake_case</code> and plural nouns: <code>users</code>, <code>order_items</code>, <code>product_categories</code>.</li>
        <li><strong>Column names:</strong> Use <code>snake_case</code>: <code>first_name</code>, <code>created_at</code>, <code>is_active</code>.</li>
        <li><strong>Aliases:</strong> Use meaningful short aliases: <code>users u</code>, <code>orders o</code>, <code>order_items oi</code>. Avoid single arbitrary letters like <code>a</code>, <code>b</code>, <code>c</code> that reveal nothing about the table.</li>
        <li><strong>Boolean columns:</strong> Prefix with <code>is_</code>, <code>has_</code>, or <code>can_</code>: <code>is_active</code>, <code>has_subscription</code>, <code>can_edit</code>.</li>
        <li><strong>Timestamp columns:</strong> Use <code>_at</code> suffix: <code>created_at</code>, <code>updated_at</code>, <code>deleted_at</code>.</li>
        <li><strong>Foreign keys:</strong> Use <code>[referenced_table_singular]_id</code>: <code>user_id</code>, <code>order_id</code>, <code>category_id</code>.</li>
      </ul>

      <h2>Formatting JOINs Properly</h2>
      <p>
        JOINs are where SQL formatting pays the biggest dividends. A poorly formatted multi-join query is one of the hardest things to read in all of programming. A well-formatted one is immediately clear.
      </p>

      <h3>Basic JOIN Formatting</h3>
      <pre><code className="language-sql">{`-- Good: JOIN type, table, and condition clearly separated
SELECT
  c.customer_name,
  o.order_date,
  o.total_amount,
  p.product_name,
  oi.quantity
FROM customers c
INNER JOIN orders o
  ON o.customer_id = c.id
INNER JOIN order_items oi
  ON oi.order_id = o.id
INNER JOIN products p
  ON p.id = oi.product_id
WHERE o.order_date >= '2025-01-01'
  AND o.status = 'completed'
ORDER BY o.order_date DESC;`}</code></pre>
      <p>
        Each JOIN starts on a new line at the same indentation level as FROM. The ON condition is indented beneath the JOIN. This vertical alignment makes it trivial to trace the join chain from customers through orders to order items to products.
      </p>

      <h3>Multi-Condition JOINs</h3>
      <p>
        When a JOIN has multiple conditions, indent each condition and use AND/OR alignment:
      </p>
      <pre><code className="language-sql">{`SELECT
  e.employee_name,
  d.department_name,
  r.role_name
FROM employees e
INNER JOIN department_assignments da
  ON da.employee_id = e.id
  AND da.is_primary = TRUE
  AND da.effective_date <= CURRENT_DATE
INNER JOIN departments d
  ON d.id = da.department_id
LEFT JOIN roles r
  ON r.id = e.role_id;`}</code></pre>

      <h3>Self-Joins</h3>
      <p>
        Self-joins are inherently confusing because the same table appears multiple times. Clear aliases are essential:
      </p>
      <pre><code className="language-sql">{`-- Employee hierarchy with self-join
SELECT
  emp.first_name AS employee_name,
  mgr.first_name AS manager_name,
  dir.first_name AS director_name
FROM employees emp
LEFT JOIN employees mgr
  ON mgr.id = emp.manager_id
LEFT JOIN employees dir
  ON dir.id = mgr.manager_id
WHERE emp.department = 'Engineering';`}</code></pre>

      <h2>Formatting Subqueries</h2>
      <p>
        Subqueries add nesting complexity that makes formatting critical. Without proper indentation, a subquery buried inside a WHERE clause or FROM clause can be almost impossible to parse visually.
      </p>

      <h3>Subqueries in WHERE Clauses</h3>
      <pre><code className="language-sql">{`-- Subquery in WHERE with proper indentation
SELECT
  p.product_name,
  p.price,
  p.category
FROM products p
WHERE p.price > (
  SELECT AVG(p2.price)
  FROM products p2
  WHERE p2.category = p.category
)
ORDER BY p.price DESC;`}</code></pre>

      <h3>Subqueries in FROM Clauses (Derived Tables)</h3>
      <pre><code className="language-sql">{`-- Derived table with clear indentation
SELECT
  dept_stats.department,
  dept_stats.avg_salary,
  dept_stats.employee_count
FROM (
  SELECT
    e.department,
    AVG(e.salary) AS avg_salary,
    COUNT(*) AS employee_count
  FROM employees e
  WHERE e.status = 'active'
  GROUP BY e.department
) dept_stats
WHERE dept_stats.employee_count >= 5
ORDER BY dept_stats.avg_salary DESC;`}</code></pre>

      <h3>EXISTS Subqueries</h3>
      <pre><code className="language-sql">{`-- EXISTS with formatted subquery
SELECT
  c.customer_name,
  c.email
FROM customers c
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id
    AND o.order_date >= '2025-01-01'
    AND o.total_amount > 100.00
)
AND NOT EXISTS (
  SELECT 1
  FROM complaints comp
  WHERE comp.customer_id = c.id
    AND comp.status = 'unresolved'
);`}</code></pre>

      <h2>Formatting Common Table Expressions (CTEs)</h2>
      <p>
        CTEs (the WITH clause) are one of the most powerful features of modern SQL. They allow you to break complex queries into named, reusable building blocks. Properly formatted CTEs are dramatically more readable than equivalent nested subqueries.
      </p>

      <h3>Basic CTE Structure</h3>
      <pre><code className="language-sql">{`WITH active_customers AS (
  SELECT
    c.id,
    c.name,
    c.email,
    c.signup_date
  FROM customers c
  WHERE c.status = 'active'
    AND c.last_login >= CURRENT_DATE - INTERVAL '90 days'
),
customer_orders AS (
  SELECT
    ac.id AS customer_id,
    ac.name AS customer_name,
    COUNT(o.id) AS order_count,
    SUM(o.total_amount) AS total_spent,
    MAX(o.order_date) AS last_order_date
  FROM active_customers ac
  INNER JOIN orders o
    ON o.customer_id = ac.id
  WHERE o.status = 'completed'
  GROUP BY ac.id, ac.name
)
SELECT
  co.customer_name,
  co.order_count,
  co.total_spent,
  co.last_order_date,
  ROUND(co.total_spent / co.order_count, 2) AS avg_order_value
FROM customer_orders co
WHERE co.order_count >= 3
ORDER BY co.total_spent DESC
LIMIT 50;`}</code></pre>
      <p>
        Notice the formatting pattern: each CTE is named on its own line with AS and an opening parenthesis, the CTE body is indented, and the closing parenthesis aligns with the CTE name. Multiple CTEs are separated by commas. The final SELECT references the CTEs like regular tables.
      </p>

      <h3>Recursive CTEs</h3>
      <pre><code className="language-sql">{`-- Recursive CTE for organizational hierarchy
WITH RECURSIVE org_hierarchy AS (
  -- Base case: top-level managers
  SELECT
    e.id,
    e.name,
    e.manager_id,
    e.department,
    1 AS level,
    e.name AS path
  FROM employees e
  WHERE e.manager_id IS NULL

  UNION ALL

  -- Recursive case: employees under managers
  SELECT
    e.id,
    e.name,
    e.manager_id,
    e.department,
    oh.level + 1,
    oh.path || ' > ' || e.name
  FROM employees e
  INNER JOIN org_hierarchy oh
    ON oh.id = e.manager_id
)
SELECT
  id,
  name,
  department,
  level,
  path
FROM org_hierarchy
ORDER BY path;`}</code></pre>

      <h2>Formatting Window Functions</h2>
      <p>
        Window functions (OVER clause) add significant complexity to SELECT statements. Proper formatting prevents them from becoming unreadable.
      </p>
      <pre><code className="language-sql">{`SELECT
  e.department,
  e.name,
  e.salary,
  AVG(e.salary) OVER (
    PARTITION BY e.department
  ) AS dept_avg_salary,
  RANK() OVER (
    PARTITION BY e.department
    ORDER BY e.salary DESC
  ) AS salary_rank,
  SUM(e.salary) OVER (
    PARTITION BY e.department
    ORDER BY e.hire_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM employees e
WHERE e.status = 'active'
ORDER BY e.department, e.salary DESC;`}</code></pre>
      <p>
        When the OVER clause has both PARTITION BY and ORDER BY (and optionally a frame specification), place each on its own line inside the parentheses. For simple window functions with just a PARTITION BY, a single line is acceptable: <code>AVG(salary) OVER (PARTITION BY department)</code>.
      </p>

      <h2>SQL Dialects: Formatting Differences</h2>
      <p>
        While core SQL syntax is standardized (SQL:2016, SQL:2023), each database engine adds its own extensions, functions, and syntax variations. A good SQL formatter needs to handle these differences. Here is how formatting varies across the most popular databases.
      </p>

      <h3>MySQL</h3>
      <p>
        MySQL uses backtick quoting for identifiers, has its own LIMIT syntax, and supports specific functions and data types:
      </p>
      <pre><code className="language-sql">{`-- MySQL-specific formatting
SELECT
  \`user\`.\`id\`,
  \`user\`.\`name\`,
  DATE_FORMAT(\`user\`.\`created_at\`, '%Y-%m-%d') AS signup_date,
  IFNULL(\`user\`.\`nickname\`, 'Anonymous') AS display_name
FROM \`users\` AS \`user\`
WHERE \`user\`.\`status\` = 'active'
ORDER BY \`user\`.\`created_at\` DESC
LIMIT 20 OFFSET 40;`}</code></pre>

      <h3>PostgreSQL</h3>
      <p>
        PostgreSQL uses double-quote quoting, supports advanced features like DISTINCT ON, array operations, JSONB, and rich type casting:
      </p>
      <pre><code className="language-sql">{`-- PostgreSQL-specific formatting
SELECT DISTINCT ON (u.department)
  u.id,
  u.name,
  u.department,
  u.salary,
  u.metadata->>'role' AS role,
  ARRAY_AGG(s.skill_name) AS skills
FROM users u
LEFT JOIN user_skills us
  ON us.user_id = u.id
LEFT JOIN skills s
  ON s.id = us.skill_id
WHERE u.salary > 50000
  AND u.metadata @> '{"active": true}'::jsonb
GROUP BY u.id, u.name, u.department, u.salary, u.metadata
ORDER BY u.department, u.salary DESC;`}</code></pre>

      <h3>SQLite</h3>
      <p>
        SQLite has a more limited feature set but includes some unique behaviors. It uses dynamic typing and has specific pragma statements:
      </p>
      <pre><code className="language-sql">{`-- SQLite-specific formatting
SELECT
  t.id,
  t.title,
  t.completed,
  COALESCE(t.priority, 'normal') AS priority,
  strftime('%Y-%m-%d', t.created_at) AS created_date
FROM todos t
WHERE t.completed = 0
  AND t.created_at >= datetime('now', '-30 days')
ORDER BY
  CASE t.priority
    WHEN 'high' THEN 1
    WHEN 'normal' THEN 2
    WHEN 'low' THEN 3
    ELSE 4
  END,
  t.created_at DESC
LIMIT 50;`}</code></pre>

      <h3>SQL Server (T-SQL)</h3>
      <p>
        SQL Server uses square bracket quoting, TOP instead of LIMIT, and has its own string functions and date operations:
      </p>
      <pre><code className="language-sql">{`-- SQL Server (T-SQL) specific formatting
SELECT TOP 20
  [u].[id],
  [u].[name],
  [u].[email],
  FORMAT([u].[created_at], 'yyyy-MM-dd') AS signup_date,
  ISNULL([u].[nickname], 'Anonymous') AS display_name,
  STRING_AGG([r].[role_name], ', ') AS roles
FROM [dbo].[users] [u]
LEFT JOIN [dbo].[user_roles] [ur]
  ON [ur].[user_id] = [u].[id]
LEFT JOIN [dbo].[roles] [r]
  ON [r].[id] = [ur].[role_id]
WHERE [u].[status] = 'active'
GROUP BY [u].[id], [u].[name], [u].[email],
  [u].[created_at], [u].[nickname]
ORDER BY [u].[created_at] DESC;`}</code></pre>

      <h2>SQL Linting and Automated Formatting Tools</h2>
      <p>
        Manual formatting works for individual queries, but for teams working with hundreds or thousands of SQL files, automated tools are essential. Here are the most popular SQL linting and formatting tools available today.
      </p>

      <h3>sqlfluff</h3>
      <p>
        <strong>sqlfluff</strong> is the most popular open-source SQL linter and formatter. It supports multiple dialects and can be integrated into CI/CD pipelines:
      </p>
      <pre><code className="language-bash">{`# Install sqlfluff
pip install sqlfluff

# Lint a SQL file (report violations)
sqlfluff lint query.sql --dialect postgres

# Fix formatting violations automatically
sqlfluff fix query.sql --dialect postgres

# Check specific rules
sqlfluff lint query.sql --rules L010,L014,L030

# Lint all SQL files in a directory
sqlfluff lint ./sql/ --dialect mysql`}</code></pre>
      <p>
        Configure sqlfluff with a <code>.sqlfluff</code> file in your project root:
      </p>
      <pre><code className="language-ini">{`[sqlfluff]
dialect = postgres
templater = raw
max_line_length = 120

[sqlfluff:indentation]
indent_unit = space
tab_space_size = 4

[sqlfluff:rules:capitalisation.keywords]
capitalisation_policy = upper

[sqlfluff:rules:capitalisation.identifiers]
capitalisation_policy = lower

[sqlfluff:rules:capitalisation.functions]
capitalisation_policy = upper`}</code></pre>

      <h3>sql-formatter (npm package)</h3>
      <p>
        For JavaScript/TypeScript projects, the <code>sql-formatter</code> npm package provides programmatic SQL formatting:
      </p>
      <pre><code className="language-javascript">{`import { format } from 'sql-formatter';

const formatted = format(
  'SELECT id, name, email FROM users WHERE status = "active" ORDER BY name',
  {
    language: 'postgresql',
    tabWidth: 2,
    keywordCase: 'upper',
    linesBetweenQueries: 2,
  }
);

console.log(formatted);
// SELECT
//   id,
//   name,
//   email
// FROM
//   users
// WHERE
//   status = "active"
// ORDER BY
//   name`}</code></pre>

      <h3>IDE Integration</h3>
      <p>
        Most popular IDEs and editors have SQL formatting support:
      </p>
      <ul>
        <li><strong>VS Code:</strong> Install the SQL Formatter extension or use the SQLTools extension which includes formatting. Configure keyboard shortcuts for one-click formatting.</li>
        <li><strong>JetBrains IDEs (DataGrip, IntelliJ, PyCharm):</strong> Built-in SQL formatter with extensive configuration. Access via Code &gt; Reformat Code or <code>Ctrl+Alt+L</code> / <code>Cmd+Option+L</code>.</li>
        <li><strong>DBeaver:</strong> Built-in SQL formatter accessible from the SQL Editor toolbar. Supports custom formatting profiles.</li>
        <li><strong>pgAdmin:</strong> Includes a query formatter for PostgreSQL queries in the query tool.</li>
      </ul>

      <h3>Git Pre-Commit Hooks</h3>
      <p>
        Enforce SQL formatting automatically before code is committed:
      </p>
      <pre><code className="language-yaml">{`# .pre-commit-config.yaml
repos:
  - repo: https://github.com/sqlfluff/sqlfluff
    rev: 3.0.0
    hooks:
      - id: sqlfluff-lint
        args: [--dialect, postgres]
      - id: sqlfluff-fix
        args: [--dialect, postgres, --force]`}</code></pre>

      <h2>Common SQL Formatting Mistakes</h2>
      <p>
        Even experienced developers make formatting mistakes that reduce SQL readability. Here are the most common ones and how to fix them.
      </p>

      <h3>1. Everything on One Line</h3>
      <pre><code className="language-sql">{`-- Bad: Impossible to read
SELECT u.id, u.name, u.email, COUNT(o.id) AS order_count FROM users u INNER JOIN orders o ON o.user_id = u.id WHERE u.status = 'active' AND u.created_at >= '2025-01-01' GROUP BY u.id, u.name, u.email HAVING COUNT(o.id) > 3 ORDER BY order_count DESC LIMIT 10;

-- Good: Each clause on its own line
SELECT
  u.id,
  u.name,
  u.email,
  COUNT(o.id) AS order_count
FROM users u
INNER JOIN orders o
  ON o.user_id = u.id
WHERE u.status = 'active'
  AND u.created_at >= '2025-01-01'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 3
ORDER BY order_count DESC
LIMIT 10;`}</code></pre>

      <h3>2. Inconsistent Keyword Casing</h3>
      <pre><code className="language-sql">{`-- Bad: Mixed keyword casing
Select u.name, u.email
From users u
where u.status = 'active'
ORDER by u.name
Limit 20;

-- Good: Consistent uppercase keywords
SELECT u.name, u.email
FROM users u
WHERE u.status = 'active'
ORDER BY u.name
LIMIT 20;`}</code></pre>

      <h3>3. Using SELECT * in Production Code</h3>
      <pre><code className="language-sql">{`-- Bad: SELECT * hides what data you actually need
SELECT * FROM users WHERE status = 'active';

-- Good: Explicit column list
SELECT
  id,
  name,
  email,
  status,
  created_at
FROM users
WHERE status = 'active';`}</code></pre>
      <p>
        Using <code>SELECT *</code> is acceptable for quick ad-hoc queries during debugging, but production code should always list columns explicitly. This makes the query self-documenting, prevents breaking changes when columns are added or reordered, and allows the database to optimize the query plan.
      </p>

      <h3>4. Missing Table Aliases in JOINs</h3>
      <pre><code className="language-sql">{`-- Bad: Ambiguous column references without aliases
SELECT
  name,
  email,
  order_date,
  total_amount
FROM users
INNER JOIN orders ON orders.user_id = users.id;

-- Good: Clear aliases resolve ambiguity
SELECT
  u.name,
  u.email,
  o.order_date,
  o.total_amount
FROM users u
INNER JOIN orders o
  ON o.user_id = u.id;`}</code></pre>

      <h3>5. Deeply Nested Subqueries</h3>
      <pre><code className="language-sql">{`-- Bad: Triple-nested subquery
SELECT * FROM (
  SELECT * FROM (
    SELECT id, name, (
      SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id
    ) AS cnt FROM users
  ) sub WHERE cnt > 5
) final WHERE name LIKE 'A%';

-- Good: CTEs make the logic clear
WITH user_order_counts AS (
  SELECT
    u.id,
    u.name,
    COUNT(o.id) AS order_count
  FROM users u
  LEFT JOIN orders o
    ON o.user_id = u.id
  GROUP BY u.id, u.name
),
frequent_buyers AS (
  SELECT id, name, order_count
  FROM user_order_counts
  WHERE order_count > 5
)
SELECT id, name, order_count
FROM frequent_buyers
WHERE name LIKE 'A%';`}</code></pre>

      <h2>Formatting INSERT, UPDATE, and DELETE Statements</h2>
      <p>
        Formatting is not just for SELECT queries. INSERT, UPDATE, and DELETE statements also benefit from consistent structure.
      </p>

      <h3>INSERT Statements</h3>
      <pre><code className="language-sql">{`-- Single row insert
INSERT INTO users (name, email, status, created_at)
VALUES ('Alice Johnson', 'alice@example.com', 'active', NOW());

-- Multi-row insert
INSERT INTO products (name, category, price, stock)
VALUES
  ('Keyboard', 'electronics', 79.99, 150),
  ('Mouse', 'electronics', 29.99, 300),
  ('Monitor', 'electronics', 499.99, 50),
  ('Desk Lamp', 'office', 34.99, 200);

-- INSERT from SELECT
INSERT INTO order_archive (
  order_id,
  customer_id,
  order_date,
  total_amount
)
SELECT
  o.id,
  o.customer_id,
  o.order_date,
  o.total_amount
FROM orders o
WHERE o.order_date < '2024-01-01'
  AND o.status = 'completed';`}</code></pre>

      <h3>UPDATE Statements</h3>
      <pre><code className="language-sql">{`-- Simple update
UPDATE users
SET
  status = 'inactive',
  updated_at = NOW()
WHERE last_login < CURRENT_DATE - INTERVAL '365 days'
  AND status = 'active';

-- Update with JOIN (PostgreSQL)
UPDATE order_items oi
SET
  price = p.current_price,
  updated_at = NOW()
FROM products p
WHERE p.id = oi.product_id
  AND oi.price <> p.current_price;`}</code></pre>

      <h3>DELETE Statements</h3>
      <pre><code className="language-sql">{`-- Delete with conditions
DELETE FROM session_tokens
WHERE expires_at < NOW()
  AND user_id IN (
    SELECT id
    FROM users
    WHERE status = 'deleted'
  );`}</code></pre>

      <h2>Formatting CASE Expressions</h2>
      <p>
        CASE expressions add conditional logic to SQL queries. Proper formatting makes the branches clear:
      </p>
      <pre><code className="language-sql">{`SELECT
  o.id,
  o.total_amount,
  CASE
    WHEN o.total_amount >= 1000 THEN 'premium'
    WHEN o.total_amount >= 500 THEN 'standard'
    WHEN o.total_amount >= 100 THEN 'basic'
    ELSE 'micro'
  END AS order_tier,
  CASE o.status
    WHEN 'completed' THEN 'Delivered'
    WHEN 'shipped' THEN 'In Transit'
    WHEN 'processing' THEN 'Being Prepared'
    WHEN 'cancelled' THEN 'Cancelled'
    ELSE 'Unknown'
  END AS status_label
FROM orders o
ORDER BY o.total_amount DESC;`}</code></pre>
      <p>
        Each WHEN clause goes on its own line, indented under CASE. The ELSE and END align with CASE or are indented one level. Both the searched CASE (with conditions) and the simple CASE (with a reference value) follow the same pattern.
      </p>

      <h2>SQL Formatting in Team Environments</h2>
      <p>
        Individual formatting preferences matter less than team consistency. Here is how to establish and enforce SQL formatting standards across a development team.
      </p>

      <h3>Create a SQL Style Guide</h3>
      <p>
        Document your team's SQL conventions in a shared style guide. Key decisions to make:
      </p>
      <ul>
        <li><strong>Keyword casing:</strong> UPPER, lower, or Title Case (UPPER is the most common)</li>
        <li><strong>Indentation:</strong> 2 spaces, 4 spaces, or tabs</li>
        <li><strong>Comma placement:</strong> Leading (comma at start of line) or trailing (comma at end of line)</li>
        <li><strong>Join style:</strong> Whether to write <code>JOIN</code> or <code>INNER JOIN</code> explicitly</li>
        <li><strong>Alias style:</strong> Whether to use <code>AS</code> keyword (<code>users AS u</code> vs <code>users u</code>)</li>
        <li><strong>Maximum line length:</strong> 80, 100, or 120 characters</li>
      </ul>

      <h3>Automate Enforcement</h3>
      <p>
        Once conventions are defined, automate them:
      </p>
      <ol>
        <li><strong>Pre-commit hooks:</strong> Use sqlfluff with pre-commit to check formatting before code is committed.</li>
        <li><strong>CI/CD pipeline:</strong> Add a sqlfluff lint step to your CI pipeline that fails the build on formatting violations.</li>
        <li><strong>Editor configuration:</strong> Share editor settings (<code>.editorconfig</code>, VS Code workspace settings) that apply SQL formatting rules automatically.</li>
        <li><strong>Code review:</strong> Include SQL formatting in code review checklists, but rely on automated tools for enforcement rather than manual checks.</li>
      </ol>

      <h2>Performance Considerations: Formatting vs. Optimization</h2>
      <p>
        It is important to understand that SQL formatting is purely cosmetic. It does not affect query performance. The database query planner receives the same logical query regardless of whether it is on one line or a hundred lines with perfect indentation. Whitespace and casing are stripped during parsing.
      </p>
      <p>
        However, well-formatted SQL makes it much easier to identify performance problems. When a query is clearly structured, you can quickly spot:
      </p>
      <ul>
        <li><strong>Missing indexes:</strong> WHERE and JOIN conditions on unindexed columns are visible at a glance.</li>
        <li><strong>Unnecessary JOINs:</strong> Tables joined but never referenced in SELECT or WHERE clauses stand out.</li>
        <li><strong>Suboptimal patterns:</strong> Correlated subqueries that could be JOINs, or N+1 query patterns, become obvious.</li>
        <li><strong>Cartesian products:</strong> Missing JOIN conditions are much easier to spot when each JOIN is on its own line.</li>
        <li><strong>Redundant conditions:</strong> Duplicate WHERE clauses or contradictory conditions are visible in formatted code.</li>
      </ul>
      <p>
        For query optimization beyond formatting, check out our guide on <Link href={`/${lang}/blog/sql-query-optimization`}>SQL query optimization techniques</Link>.
      </p>

      {/* FAQ with Schema.org FAQPage JSON-LD */}
      <h2>Frequently Asked Questions</h2>
      <div itemScope itemType="https://schema.org/FAQPage">
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>What is a SQL formatter and why should I use one?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              A SQL formatter (also called a SQL beautifier or SQL pretty printer) is a tool that transforms unstructured, hard-to-read SQL queries into clean, consistently indented code. It adds line breaks between clauses, indents nested elements, and standardizes keyword casing. You should use one because formatted SQL is dramatically easier to read, debug, and review. It reduces bugs, speeds up code reviews, and improves team collaboration. Our <Link href={`/${lang}/tools/sql-formatter`}>SQL formatter online</Link> processes everything in your browser with no data sent to any server.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>Does formatting affect SQL query performance?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              No. SQL formatting is purely cosmetic and has zero impact on query performance. The database engine strips all whitespace, line breaks, and casing during query parsing. The query planner receives the same logical query regardless of how it is formatted. Formatting only affects human readability. However, well-formatted SQL makes it much easier to identify performance issues like missing indexes, unnecessary JOINs, or suboptimal subqueries.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>Should SQL keywords be uppercase or lowercase?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              The most widely adopted convention is to write SQL keywords in UPPERCASE (SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY). This creates a clear visual distinction between the query structure (keywords) and the data-specific elements (table names, column names, aliases). While lowercase keywords work identically, uppercase is the industry standard used by most style guides, books, documentation, and professional teams. Pick one convention and apply it consistently across your entire codebase.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>What is the difference between SQL formatting and SQL linting?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              SQL formatting reorganizes the visual layout of a query (indentation, line breaks, casing) without changing its meaning. SQL linting goes further by analyzing the query for potential issues, anti-patterns, and style violations. A linter like sqlfluff can detect problems such as using SELECT *, implicit JOINs, missing table aliases, inconsistent naming conventions, and overly complex subqueries. Formatting is a subset of what linters do. For best results, use both: a formatter for instant beautification and a linter in your CI/CD pipeline for comprehensive code quality checks.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>How do I format SQL for different database dialects?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Different databases have distinct syntax: MySQL uses backtick quoting and LIMIT/OFFSET, PostgreSQL uses double-quote quoting and supports DISTINCT ON and JSONB operators, SQL Server uses square brackets and TOP, and SQLite has its own function set. A good SQL formatter handles these differences by letting you select the target dialect. Our <Link href={`/${lang}/tools/sql-formatter`}>online SQL formatter</Link> supports MySQL, PostgreSQL, SQLite, and SQL Server. When using command-line tools like sqlfluff, specify the dialect with the <code>--dialect</code> flag.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>When should I use CTEs instead of subqueries?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Use Common Table Expressions (CTEs) whenever a subquery is more than a few lines long, when the same subquery logic is referenced multiple times, when the query has more than two levels of nesting, or when you need to build up a complex result step by step. CTEs make queries self-documenting because each CTE has a descriptive name. They are also easier to test individually and debug. The main exception is simple, single-use subqueries in WHERE clauses (like <code>WHERE id IN (SELECT ...)</code>) where the subquery is short and clear. In those cases, a subquery is perfectly fine.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>What are the best tools for automated SQL formatting?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              The best tools depend on your workflow. For browser-based formatting, use our <Link href={`/${lang}/tools/sql-formatter`}>SQL formatter online</Link>. For Python projects, sqlfluff is the industry standard linter and formatter with CI/CD integration. For JavaScript/TypeScript projects, the sql-formatter npm package provides programmatic formatting. For IDE users, DataGrip has the best built-in SQL formatter, while VS Code users can install the SQL Formatter extension. For team enforcement, combine sqlfluff with pre-commit hooks and CI pipeline checks.
            </p>
          </div>
        </div>

      </div>

      {/* Related Tools and Resources */}
      <h2>Related Tools and Resources</h2>
      <p>Explore more SQL and formatting tools on DevToolBox:</p>
      <ul>
        <li><Link href={`/${lang}/tools/sql-formatter`}>SQL Formatter Online</Link> - Format and beautify SQL queries instantly in your browser</li>
        <li><Link href={`/${lang}/tools/sql-to-prisma`}>SQL to Prisma Converter</Link> - Convert SQL schemas to Prisma models</li>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format and validate JSON data</li>
        <li><Link href={`/${lang}/tools/xml-formatter`}>XML Formatter</Link> - Beautify XML documents</li>
        <li><Link href={`/${lang}/tools/csv-json`}>CSV to JSON Converter</Link> - Transform CSV data into JSON</li>
        <li><Link href={`/${lang}/blog/sql-joins-explained-visual-guide`}>SQL JOINs Explained: Visual Guide</Link> - Understand all SQL JOIN types with diagrams</li>
        <li><Link href={`/${lang}/blog/sql-query-optimization`}>SQL Query Optimization</Link> - Speed up slow SQL queries</li>
        <li><Link href={`/${lang}/blog/sql-formatting-best-practices`}>SQL Formatting Best Practices</Link> - Deep dive into SQL style conventions</li>
        <li><Link href={`/${lang}/blog/postgresql-vs-mysql`}>PostgreSQL vs MySQL</Link> - Compare the two most popular open-source databases</li>
        <li><Link href={`/${lang}/blog/prisma-schema-relations-guide`}>Prisma Schema Guide</Link> - Model database relations with Prisma ORM</li>
      </ul>
    </>
  );
}
