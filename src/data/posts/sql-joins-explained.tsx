export default function SqlJoinsExplained() {
  return (
    <>
      <h2>SQL Joins Explained with Visual Examples</h2>
      <p>
        SQL Joins are the backbone of relational database queries. They allow you to combine rows from two or
        more tables based on a related column. Understanding how different join types work is essential for
        writing efficient queries, building reports, and working with normalized databases. This guide explains
        each join type with clear visual diagrams, practical examples, and performance tips.
      </p>

      <h2>Sample Tables</h2>
      <p>
        All examples in this guide use these two tables. The <code>department_id</code> column connects
        employees to their departments.
      </p>
      <pre><code>{`-- employees table
+----+----------+---------------+
| id | name     | department_id |
+----+----------+---------------+
| 1  | Alice    | 1             |
| 2  | Bob      | 1             |
| 3  | Carol    | 2             |
| 4  | Dave     | 3             |
| 5  | Eve      | NULL          |
+----+----------+---------------+

-- departments table
+----+-------------+
| id | name        |
+----+-------------+
| 1  | Engineering |
| 2  | Marketing   |
| 3  | Sales       |
| 4  | HR          |
+----+-------------+

-- Notice: Eve has no department (NULL)
-- Notice: HR department has no employees`}</code></pre>

      <h2>INNER JOIN</h2>
      <p>
        <strong>Returns only matching rows from both tables.</strong> If a row in either table has no match
        in the other, it is excluded from the result. This is the most common and default join type.
      </p>
      <pre><code>{`--  Visual:
--  employees       departments
--  ┌─────────┐     ┌────────────┐
--  │ Alice  1│─────│1 Engineering│
--  │ Bob    1│─────│             │
--  │ Carol  2│─────│2 Marketing  │
--  │ Dave   3│─────│3 Sales      │
--  │ Eve NULL│     │4 HR         │  ← No match
--  └─────────┘     └────────────┘
--     ↑ No match

SELECT e.name AS employee, d.name AS department
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- Result:
-- +----------+-------------+
-- | employee | department  |
-- +----------+-------------+
-- | Alice    | Engineering |
-- | Bob      | Engineering |
-- | Carol    | Marketing   |
-- | Dave     | Sales       |
-- +----------+-------------+
-- Eve is excluded (no department_id)
-- HR is excluded (no employees)`}</code></pre>

      <h2>LEFT JOIN (LEFT OUTER JOIN)</h2>
      <p>
        <strong>Returns all rows from the left table</strong> and matching rows from the right table. Where
        there is no match, the right side columns contain NULL. Use this when you want to keep all records
        from the primary table even if they have no related data.
      </p>
      <pre><code>{`--  Visual:
--  employees       departments
--  ┌─────────┐     ┌────────────┐
--  │ Alice  1│─────│1 Engineering│
--  │ Bob    1│─────│             │
--  │ Carol  2│─────│2 Marketing  │
--  │ Dave   3│─────│3 Sales      │
--  │ Eve NULL│     │4 HR         │  ← Not included
--  └─────────┘     └────────────┘
--  All left rows    Only matches

SELECT e.name AS employee, d.name AS department
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;

-- Result:
-- +----------+-------------+
-- | employee | department  |
-- +----------+-------------+
-- | Alice    | Engineering |
-- | Bob      | Engineering |
-- | Carol    | Marketing   |
-- | Dave     | Sales       |
-- | Eve      | NULL        |  ← Included with NULL
-- +----------+-------------+`}</code></pre>

      <h3>Finding Rows with No Match</h3>
      <pre><code>{`-- Find employees without a department
SELECT e.name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
WHERE d.id IS NULL;

-- Result: Eve`}</code></pre>

      <h2>RIGHT JOIN (RIGHT OUTER JOIN)</h2>
      <p>
        <strong>Returns all rows from the right table</strong> and matching rows from the left table. This
        is the mirror of LEFT JOIN. In practice, LEFT JOIN is used more often because most people read
        queries left to right.
      </p>
      <pre><code>{`--  Visual:
--  employees       departments
--  ┌─────────┐     ┌────────────┐
--  │ Alice  1│─────│1 Engineering│
--  │ Bob    1│─────│             │
--  │ Carol  2│─────│2 Marketing  │
--  │ Dave   3│─────│3 Sales      │
--  │ Eve NULL│     │4 HR         │  ← Included with NULL
--  └─────────┘     └────────────┘
--  Only matches    All right rows

SELECT e.name AS employee, d.name AS department
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;

-- Result:
-- +----------+-------------+
-- | employee | department  |
-- +----------+-------------+
-- | Alice    | Engineering |
-- | Bob      | Engineering |
-- | Carol    | Marketing   |
-- | Dave     | Sales       |
-- | NULL     | HR          |  ← HR included with NULL employee
-- +----------+-------------+`}</code></pre>

      <h2>FULL OUTER JOIN</h2>
      <p>
        <strong>Returns all rows from both tables.</strong> Where there is no match, the missing side contains
        NULL. This combines LEFT JOIN and RIGHT JOIN to give you the complete picture.
      </p>
      <pre><code>{`--  Visual:
--  employees       departments
--  ┌─────────┐     ┌────────────┐
--  │ Alice  1│─────│1 Engineering│
--  │ Bob    1│─────│             │
--  │ Carol  2│─────│2 Marketing  │
--  │ Dave   3│─────│3 Sales      │
--  │ Eve NULL│     │4 HR         │  ← Included
--  └─────────┘     └────────────┘
--  All rows        All rows

SELECT e.name AS employee, d.name AS department
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;

-- Result:
-- +----------+-------------+
-- | employee | department  |
-- +----------+-------------+
-- | Alice    | Engineering |
-- | Bob      | Engineering |
-- | Carol    | Marketing   |
-- | Dave     | Sales       |
-- | Eve      | NULL        |  ← No department
-- | NULL     | HR          |  ← No employees
-- +----------+-------------+

-- Note: MySQL does not support FULL OUTER JOIN directly.
-- Workaround using UNION:
SELECT e.name AS employee, d.name AS department
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
UNION
SELECT e.name AS employee, d.name AS department
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;`}</code></pre>

      <h2>CROSS JOIN</h2>
      <p>
        <strong>Returns the Cartesian product</strong> of both tables — every row from the left table paired
        with every row from the right table. With 5 employees and 4 departments, you get 20 rows.
      </p>
      <pre><code>{`SELECT e.name AS employee, d.name AS department
FROM employees e
CROSS JOIN departments d;

-- Returns 5 x 4 = 20 rows (every possible combination)
-- Alice-Engineering, Alice-Marketing, Alice-Sales, Alice-HR,
-- Bob-Engineering, Bob-Marketing, ...

-- Practical use case: Generate a calendar matrix
SELECT months.name, years.year
FROM (SELECT 'Jan' AS name UNION SELECT 'Feb' UNION SELECT 'Mar') months
CROSS JOIN (SELECT 2025 AS year UNION SELECT 2026) years;`}</code></pre>

      <h2>SELF JOIN</h2>
      <p>
        A self join joins a table with itself. This is useful for hierarchical data like org charts, category
        trees, or finding related records within the same table.
      </p>
      <pre><code>{`-- employees table with manager_id
-- +----+--------+------------+
-- | id | name   | manager_id |
-- +----+--------+------------+
-- | 1  | Alice  | NULL       |  ← CEO, no manager
-- | 2  | Bob    | 1          |
-- | 3  | Carol  | 1          |
-- | 4  | Dave   | 2          |
-- | 5  | Eve    | 2          |
-- +----+--------+------------+

-- Find each employee's manager
SELECT
  e.name AS employee,
  m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Result:
-- +----------+---------+
-- | employee | manager |
-- +----------+---------+
-- | Alice    | NULL    |
-- | Bob      | Alice   |
-- | Carol    | Alice   |
-- | Dave     | Bob     |
-- | Eve      | Bob     |
-- +----------+---------+`}</code></pre>

      <h2>NATURAL JOIN</h2>
      <p>
        Automatically joins on columns with the same name in both tables. While convenient, it can produce
        unexpected results if column names change. Explicit joins are preferred in production code.
      </p>
      <pre><code>{`-- If both tables have a column named "department_id"
SELECT *
FROM employees
NATURAL JOIN departments;

-- Equivalent to:
SELECT *
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- Warning: If tables share multiple column names,
-- NATURAL JOIN matches ALL of them, which may not be intended.`}</code></pre>

      <h2>Multiple Table Joins</h2>
      <p>
        You can chain multiple joins to combine data from three or more tables. Each join adds another table
        to the result set.
      </p>
      <pre><code>{`-- Three tables: employees, departments, projects
SELECT
  e.name AS employee,
  d.name AS department,
  p.name AS project
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
INNER JOIN projects p ON e.id = p.lead_id;

-- You can mix join types
SELECT
  d.name AS department,
  e.name AS employee,
  p.name AS project
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
LEFT JOIN projects p ON e.id = p.lead_id
ORDER BY d.name, e.name;`}</code></pre>

      <h2>Join Conditions: ON vs WHERE vs USING</h2>
      <pre><code>{`-- ON clause: defines the join condition
SELECT * FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- USING clause: shorthand when column names match
SELECT * FROM employees
INNER JOIN departments USING (department_id);
-- Only works when the join column has the same name in both tables

-- WHERE clause: filters AFTER the join
SELECT e.name, d.name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
WHERE d.name = 'Engineering';
-- Warning: with LEFT JOIN, a WHERE on the right table
-- effectively converts it to an INNER JOIN!

-- Correct way to filter with LEFT JOIN:
SELECT e.name, d.name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id AND d.name = 'Engineering';
-- Keeps all employees, only shows department for Engineering`}</code></pre>

      <h2>Join Performance Tips</h2>
      <ul>
        <li><strong>Index join columns</strong> - Always create indexes on columns used in ON clauses. This is the single most impactful optimization.</li>
        <li><strong>Use INNER JOIN when possible</strong> - INNER JOIN is typically faster than OUTER JOIN because the optimizer has more flexibility.</li>
        <li><strong>Filter early</strong> - Move conditions from WHERE to ON when using LEFT JOIN, or use subqueries to reduce the dataset before joining.</li>
        <li><strong>Avoid SELECT *</strong> - Only select the columns you need. This reduces memory usage and network transfer.</li>
        <li><strong>Check EXPLAIN output</strong> - Use <code>EXPLAIN</code> or <code>EXPLAIN ANALYZE</code> to understand the query execution plan.</li>
        <li><strong>Consider join order</strong> - Most optimizers handle this automatically, but for complex queries, start with the smallest table.</li>
        <li><strong>Use EXISTS instead of IN for subqueries</strong> - <code>EXISTS</code> stops at the first match, while <code>IN</code> materializes the entire subquery result.</li>
      </ul>

      <h2>Common Join Patterns</h2>
      <h3>Find Records That Exist in Both Tables</h3>
      <pre><code>{`-- Using INNER JOIN
SELECT a.* FROM table_a a
INNER JOIN table_b b ON a.id = b.a_id;

-- Using EXISTS (often faster for large datasets)
SELECT * FROM table_a a
WHERE EXISTS (SELECT 1 FROM table_b b WHERE b.a_id = a.id);`}</code></pre>

      <h3>Find Records Missing from Another Table</h3>
      <pre><code>{`-- Using LEFT JOIN + IS NULL (anti-join)
SELECT a.* FROM table_a a
LEFT JOIN table_b b ON a.id = b.a_id
WHERE b.a_id IS NULL;

-- Using NOT EXISTS
SELECT * FROM table_a a
WHERE NOT EXISTS (SELECT 1 FROM table_b b WHERE b.a_id = a.id);

-- Using NOT IN (careful with NULLs!)
SELECT * FROM table_a
WHERE id NOT IN (SELECT a_id FROM table_b WHERE a_id IS NOT NULL);`}</code></pre>

      <h3>Get Latest Record Per Group</h3>
      <pre><code>{`-- Find the most recent order for each customer
SELECT c.name, o.order_date, o.total
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
INNER JOIN (
  SELECT customer_id, MAX(order_date) AS max_date
  FROM orders
  GROUP BY customer_id
) latest ON o.customer_id = latest.customer_id
  AND o.order_date = latest.max_date;

-- Using window functions (modern SQL)
SELECT name, order_date, total
FROM (
  SELECT c.name, o.order_date, o.total,
    ROW_NUMBER() OVER (PARTITION BY c.id ORDER BY o.order_date DESC) AS rn
  FROM customers c
  INNER JOIN orders o ON c.id = o.customer_id
) ranked
WHERE rn = 1;`}</code></pre>

      <h2>Join Types Quick Reference</h2>
      <table>
        <thead>
          <tr>
            <th>Join Type</th>
            <th>Left Unmatched</th>
            <th>Right Unmatched</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>INNER JOIN</td><td>Excluded</td><td>Excluded</td><td>Only matching records</td></tr>
          <tr><td>LEFT JOIN</td><td>Included (NULL)</td><td>Excluded</td><td>All from left + matches</td></tr>
          <tr><td>RIGHT JOIN</td><td>Excluded</td><td>Included (NULL)</td><td>All from right + matches</td></tr>
          <tr><td>FULL OUTER JOIN</td><td>Included (NULL)</td><td>Included (NULL)</td><td>All from both tables</td></tr>
          <tr><td>CROSS JOIN</td><td>All combinations</td><td>All combinations</td><td>Cartesian product</td></tr>
          <tr><td>SELF JOIN</td><td>Depends on join type</td><td>Same table</td><td>Hierarchical data</td></tr>
        </tbody>
      </table>

      <h2>Frequently Asked Questions</h2>
      <h3>What is the difference between INNER JOIN and LEFT JOIN?</h3>
      <p>
        INNER JOIN returns only rows that have a match in both tables. LEFT JOIN returns all rows from the
        left table, filling in NULL for columns from the right table when there is no match. Use INNER JOIN
        when you only need complete records, and LEFT JOIN when you need all records from the primary table
        regardless of whether related data exists.
      </p>

      <h3>Does the order of tables in a JOIN matter?</h3>
      <p>
        For INNER JOIN and CROSS JOIN, the order does not affect the result (only column order in SELECT).
        For LEFT JOIN and RIGHT JOIN, order matters because it determines which table keeps all its rows.
        Modern query optimizers rearrange INNER JOINs automatically for best performance.
      </p>

      <h3>When should I use JOIN vs a subquery?</h3>
      <p>
        Use JOIN when you need columns from multiple tables in the result. Use subqueries for existence checks
        (<code>EXISTS</code>, <code>IN</code>) or when you need to aggregate before joining. In most databases,
        the optimizer converts between them automatically, but joins are generally more readable.
      </p>

      <h3>Why does my LEFT JOIN act like an INNER JOIN?</h3>
      <p>
        This happens when you add a WHERE condition on the right table. Filtering on a right-table column in
        WHERE eliminates the NULL rows, converting the LEFT JOIN into an INNER JOIN. Move the condition to
        the ON clause instead to preserve the LEFT JOIN behavior.
      </p>

      <h3>How do I join on multiple conditions?</h3>
      <p>
        Use AND in the ON clause: <code>ON a.id = b.a_id AND a.type = b.type</code>. You can add as many
        conditions as needed. Each condition narrows the match criteria.
      </p>

      <h3>Is FULL OUTER JOIN supported in MySQL?</h3>
      <p>
        MySQL does not support FULL OUTER JOIN directly. The workaround is to UNION a LEFT JOIN with a
        RIGHT JOIN. PostgreSQL, SQL Server, and Oracle all support FULL OUTER JOIN natively.
      </p>
    </>
  );
}
