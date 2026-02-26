'use client';

import Link from 'next/link';

export default function JsonFormatterBeautifierGuide({ lang }: { lang: string }) {
  return (
    <>
      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A <strong>JSON formatter</strong> (also called a JSON beautifier or JSON prettifier) transforms compact, minified JSON into human-readable, indented text. Whether you are debugging an API response, reviewing a config file, or collaborating with teammates, formatted JSON saves time and prevents errors. You can format JSON in your browser with our <Link href={`/${lang}/tools/json-formatter`}>free JSON formatter online</Link>, in VS Code with a single shortcut, on the command line with <code>jq</code>, or programmatically in JavaScript and Python. This guide covers every method, plus validation, minification, viewers, common errors, and a comparison of JSON vs YAML vs TOML.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>JSON formatting</strong> adds indentation and line breaks so that nested objects and arrays are immediately visible.</li>
          <li>Use a <Link href={`/${lang}/tools/json-formatter`}>JSON formatter online</Link> for quick, zero-install formatting and validation in the browser.</li>
          <li>VS Code formats JSON with <code>Shift+Alt+F</code> (Windows/Linux) or <code>Shift+Option+F</code> (macOS) using the built-in formatter or Prettier.</li>
          <li>On the command line, <code>jq .</code> and <code>python -m json.tool</code> format JSON from pipes or files instantly.</li>
          <li>In code, <code>JSON.stringify(obj, null, 2)</code> (JavaScript) and <code>json.dumps(obj, indent=2)</code> (Python) produce formatted output.</li>
          <li>Minification reverses the process, stripping whitespace to reduce payload size for production APIs and storage.</li>
          <li>Always <strong>validate</strong> JSON before using it in production to catch trailing commas, unquoted keys, and encoding errors.</li>
          <li>For configuration files, consider <Link href={`/${lang}/blog/json-vs-yaml-vs-toml`}>YAML or TOML</Link> when you need comments or more human-friendly syntax.</li>
        </ul>
      </div>

      <h2>What Is JSON and Why Format It?</h2>
      <p>
        JSON (JavaScript Object Notation) is the most widely used data interchange format on the web. APIs, configuration files, NoSQL databases, log systems, and message queues all rely on JSON to transmit structured data between services. A typical REST API response might return thousands of characters of tightly packed JSON on a single line. While machines parse this without issue, developers need to read, understand, and debug that data.
      </p>
      <p>
        <strong>JSON formatting</strong> (also known as JSON beautifying or JSON pretty-printing) is the process of adding consistent indentation, line breaks, and spacing to raw JSON text. An unformatted payload like <code>{'{\"name\":\"Alice\",\"roles\":[\"admin\",\"dev\"],\"settings\":{\"theme\":\"dark\"}}'}</code> becomes a clearly structured document where every key, value, nested object, and array element occupies its own line with proper indentation.
      </p>
      <p>
        Formatting JSON is not about changing the data. The semantic content remains identical. What changes is the visual representation, making it possible to quickly identify nesting levels, spot missing commas, find mismatched brackets, and verify that the structure matches what your application expects. Whether you call it a <strong>JSON formatter</strong>, <strong>JSON beautifier</strong>, <strong>JSON prettifier</strong>, or <strong>JSON pretty printer</strong>, the underlying operation is the same: parse the JSON string into a data structure, then serialize it back with whitespace and indentation.
      </p>

      <h2>JSON Formatter Online — Paste and Beautify</h2>
      <p>
        The fastest way to format JSON is to use a browser-based tool. No installation, no configuration, no dependencies. Just paste your JSON and get formatted output instantly. Our <Link href={`/${lang}/tools/json-formatter`}>JSON formatter online tool</Link> provides:
      </p>
      <ul>
        <li><strong>Instant formatting:</strong> Paste raw JSON on the left, see beautified output on the right in real time.</li>
        <li><strong>Syntax validation:</strong> Errors are highlighted with line numbers so you can fix issues immediately.</li>
        <li><strong>Customizable indentation:</strong> Choose between 2 spaces, 4 spaces, or tab-based indentation.</li>
        <li><strong>One-click copy:</strong> Copy the formatted result to your clipboard with a single button.</li>
        <li><strong>Minification mode:</strong> Switch to compact mode to strip all whitespace for production payloads.</li>
        <li><strong>No data leaves your browser:</strong> All processing happens client-side in JavaScript.</li>
      </ul>
      <p>
        This is ideal when you receive a JSON response from <code>curl</code>, an API testing tool like Postman, or a log aggregation system and need to quickly inspect the structure. Instead of squinting at a wall of text, you get a clean tree of key-value pairs. Try it now: <Link href={`/${lang}/tools/json-formatter`}>format JSON online</Link>.
      </p>
      <p>
        If you also need to convert between formats, check out our <Link href={`/${lang}/tools/json-yaml`}>JSON to YAML converter</Link> and <Link href={`/${lang}/tools/csv-json`}>CSV to JSON converter</Link>.
      </p>

      <h2>JSON Formatting in VS Code</h2>
      <p>
        Visual Studio Code is the most popular editor for web developers, and it includes built-in JSON formatting support. Here are the primary methods to format JSON in VS Code:
      </p>
      <h3>Built-in Formatter</h3>
      <p>
        VS Code ships with a JSON language service that can format any <code>.json</code> file or JSON content in other file types:
      </p>
      <ol>
        <li>Open a <code>.json</code> file (or paste JSON into a new file and set the language mode to JSON).</li>
        <li>Press <code>Shift+Alt+F</code> (Windows/Linux) or <code>Shift+Option+F</code> (macOS).</li>
        <li>Alternatively, right-click and select <strong>Format Document</strong> from the context menu.</li>
        <li>The JSON is instantly reformatted with the configured indentation (default: 4 spaces).</li>
      </ol>
      <p>
        To change the default indentation size, open VS Code Settings and search for <code>editor.tabSize</code>. You can also set language-specific formatting preferences:
      </p>
      <pre><code className="language-json">{`// settings.json
{
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features",
    "editor.tabSize": 2,
    "editor.formatOnSave": true
  }
}`}</code></pre>
      <h3>Prettier Extension</h3>
      <p>
        For more consistent formatting across your entire project, install the <strong>Prettier - Code formatter</strong> extension. Prettier enforces a single formatting style for JSON (and many other file types) across all team members:
      </p>
      <pre><code className="language-json">{`// .prettierrc
{
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 80
}`}</code></pre>
      <p>
        Once installed, set Prettier as the default formatter for JSON files in your VS Code settings:
      </p>
      <pre><code className="language-json">{`{
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}`}</code></pre>
      <p>
        With <code>editor.formatOnSave</code> enabled, every time you save a JSON file, Prettier will automatically format it. This is particularly useful for config files like <code>package.json</code>, <code>tsconfig.json</code>, and <code>.eslintrc.json</code>.
      </p>

      <h2>JSON Formatting in the Command Line</h2>
      <p>
        When you are working in a terminal, SSH session, or CI/CD pipeline, you need command-line tools to format JSON. Two tools dominate this space: <code>jq</code> and Python&apos;s built-in <code>json.tool</code> module.
      </p>
      <h3>Using jq</h3>
      <p>
        <code>jq</code> is a lightweight, portable JSON processor. The simplest formatting command is:
      </p>
      <pre><code className="language-bash">{`# Format JSON from a file
jq . data.json

# Format JSON from a curl response
curl -s https://api.example.com/users | jq .

# Format with 4-space indentation
jq --indent 4 . data.json

# Format and sort keys alphabetically
jq -S . data.json

# Format with color output (default in terminal)
jq . data.json

# Extract and format a specific field
curl -s https://api.example.com/users | jq '.data[] | {name, email}'`}</code></pre>
      <p>
        <code>jq</code> is available via <code>brew install jq</code> (macOS), <code>apt install jq</code> (Debian/Ubuntu), or <code>choco install jq</code> (Windows). It goes far beyond formatting: you can filter, transform, and query JSON data with its powerful expression language. Learn more in our <Link href={`/${lang}/blog/jq-command-tutorial-examples`}>jq command tutorial</Link>.
      </p>
      <h3>Using python -m json.tool</h3>
      <p>
        If Python is installed (it comes preinstalled on most systems), you can format JSON without installing anything extra:
      </p>
      <pre><code className="language-bash">{`# Format JSON from a file
python3 -m json.tool data.json

# Format JSON from stdin (pipe)
echo '{"name":"Alice","age":30}' | python3 -m json.tool

# Format with sorted keys
python3 -m json.tool --sort-keys data.json

# Format with custom indentation (Python 3.9+)
python3 -m json.tool --indent 4 data.json

# Format a curl response
curl -s https://api.example.com/users | python3 -m json.tool`}</code></pre>
      <p>
        The <code>json.tool</code> module also validates the JSON and returns a non-zero exit code if the input is invalid, making it useful in shell scripts and CI checks.
      </p>

      <h2>JSON Formatting in JavaScript</h2>
      <p>
        JavaScript provides built-in JSON formatting through <code>JSON.stringify()</code>. The third parameter controls indentation:
      </p>
      <pre><code className="language-javascript">{`// Basic formatting with 2-space indentation
const data = { name: "Alice", age: 30, roles: ["admin", "developer"], settings: { theme: "dark", notifications: true } };

const formatted = JSON.stringify(data, null, 2);
console.log(formatted);
// Output:
// {
//   "name": "Alice",
//   "age": 30,
//   "roles": [
//     "admin",
//     "developer"
//   ],
//   "settings": {
//     "theme": "dark",
//     "notifications": true
//   }
// }

// Using tab indentation
const tabFormatted = JSON.stringify(data, null, "\\t");

// Using a replacer function to filter fields
const filtered = JSON.stringify(data, ["name", "age"], 2);
// Output:
// {
//   "name": "Alice",
//   "age": 30
// }

// Format a JSON string (parse first, then stringify)
const raw = '{"name":"Alice","age":30}';
const pretty = JSON.stringify(JSON.parse(raw), null, 2);
console.log(pretty);`}</code></pre>
      <p>
        In Node.js, you can create a simple command-line formatter:
      </p>
      <pre><code className="language-javascript">{`// format-json.mjs
import { readFileSync } from 'fs';

const input = readFileSync(process.argv[2] || '/dev/stdin', 'utf8');
try {
  const parsed = JSON.parse(input);
  console.log(JSON.stringify(parsed, null, 2));
} catch (err) {
  console.error('Invalid JSON:', err.message);
  process.exit(1);
}`}</code></pre>
      <p>
        Run it with <code>node format-json.mjs data.json</code> or <code>{'cat data.json | node format-json.mjs'}</code>. This pattern is used in many build tools and linters that need to read, modify, and write JSON files.
      </p>

      <h2>JSON Formatting in Python</h2>
      <p>
        Python&apos;s <code>json</code> module provides comprehensive JSON formatting capabilities:
      </p>
      <pre><code className="language-python">{`import json

data = {
    "name": "Alice",
    "age": 30,
    "roles": ["admin", "developer"],
    "settings": {
        "theme": "dark",
        "notifications": True
    }
}

# Format with 2-space indentation
formatted = json.dumps(data, indent=2)
print(formatted)

# Format with sorted keys
formatted_sorted = json.dumps(data, indent=2, sort_keys=True)
print(formatted_sorted)

# Format with custom separators (compact but readable)
compact = json.dumps(data, separators=(',', ':'))
print(compact)  # No extra whitespace

# Pretty-print with ensure_ascii=False (preserve Unicode)
data_unicode = {"name": "Alice", "city": "Zurich"}
print(json.dumps(data_unicode, indent=2, ensure_ascii=False))

# Read from file, format, and write back
with open('data.json', 'r') as f:
    raw = json.load(f)

with open('data_formatted.json', 'w') as f:
    json.dump(raw, f, indent=2, ensure_ascii=False)
    f.write('\\n')  # Trailing newline

# One-liner to format a JSON string
raw_str = '{"name":"Alice","age":30}'
pretty = json.dumps(json.loads(raw_str), indent=2)
print(pretty)`}</code></pre>
      <p>
        For large JSON files, Python&apos;s <code>json</code> module handles them efficiently. For extremely large files (hundreds of MB), consider streaming parsers like <code>ijson</code> or <code>orjson</code> for better performance.
      </p>

      <h2>JSON Minification: When and How</h2>
      <p>
        Minification is the opposite of formatting: it removes all unnecessary whitespace, newlines, and indentation from JSON to produce the smallest possible payload. While formatted JSON is essential for development and debugging, minified JSON is preferred for:
      </p>
      <ul>
        <li><strong>API responses:</strong> Reducing bandwidth usage, especially for mobile clients.</li>
        <li><strong>Local storage:</strong> Fitting more data into browser <code>localStorage</code> or <code>sessionStorage</code> (limited to 5-10 MB).</li>
        <li><strong>Log files:</strong> Storing more records per line when using structured logging (one JSON object per line).</li>
        <li><strong>Message queues:</strong> Reducing message size in Kafka, RabbitMQ, or SQS.</li>
        <li><strong>Database storage:</strong> Saving disk space in NoSQL databases like MongoDB or DynamoDB.</li>
      </ul>
      <h3>Minification Examples</h3>
      <pre><code className="language-javascript">{`// JavaScript: minify JSON
const data = { name: "Alice", age: 30, roles: ["admin"] };
const minified = JSON.stringify(data);
// Output: {"name":"Alice","age":30,"roles":["admin"]}

// Minify a formatted JSON string
const formatted = \`{
  "name": "Alice",
  "age": 30
}\`;
const min = JSON.stringify(JSON.parse(formatted));`}</code></pre>
      <pre><code className="language-python">{`# Python: minify JSON
import json

data = {"name": "Alice", "age": 30, "roles": ["admin"]}
minified = json.dumps(data, separators=(',', ':'))
# Output: {"name":"Alice","age":30,"roles":["admin"]}`}</code></pre>
      <pre><code className="language-bash">{`# Command line: minify with jq
jq -c . data.json

# Minify with Python
python3 -c "import json,sys; print(json.dumps(json.load(sys.stdin), separators=(',',':')))" < data.json`}</code></pre>
      <p>
        You can also use our <Link href={`/${lang}/tools/json-formatter`}>JSON formatter tool</Link> which includes a minification toggle to switch between formatted and minified output.
      </p>

      <h2>JSON Validation: Catch Errors Before They Break Production</h2>
      <p>
        JSON formatting tools often double as validators. When you paste invalid JSON, the formatter will report an error with details about what went wrong and where. Common JSON validation errors include:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Error</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Invalid JSON</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Trailing comma</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{`{"a": 1, "b": 2,}`}</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Remove the trailing comma after the last value</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Single quotes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{`{'name': 'Alice'}`}</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Replace single quotes with double quotes</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Unquoted keys</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{`{name: "Alice"}`}</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Wrap all keys in double quotes</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Comments</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{`{"a": 1 // comment}`}</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Remove comments (JSON does not support them)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Missing comma</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{`{"a": 1 "b": 2}`}</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Add a comma between key-value pairs</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Undefined / NaN</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{`{"value": undefined}`}</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Use <code>null</code> instead of <code>undefined</code> or <code>NaN</code></td>
          </tr>
        </tbody>
      </table>
      <p>
        For a deep dive into parsing errors, see our guide on <Link href={`/${lang}/blog/json-parse-error-unexpected-token`}>JSON parse error: unexpected token</Link>. For schema-level validation (ensuring the data structure matches what your application expects), check out our <Link href={`/${lang}/blog/json-schema-validation-guide`}>JSON Schema validation guide</Link>.
      </p>
      <p>
        You can validate JSON programmatically in JavaScript with a simple try-catch block:
      </p>
      <pre><code className="language-javascript">{`function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

console.log(isValidJSON('{"name": "Alice"}')); // true
console.log(isValidJSON('{name: "Alice"}'));     // false
console.log(isValidJSON(''));                     // false`}</code></pre>

      <h2>JSON Viewer: Exploring Nested Data</h2>
      <p>
        For deeply nested JSON with hundreds or thousands of fields, a flat text view (even when formatted) can be overwhelming. A <strong>JSON viewer</strong> provides an interactive, tree-based interface where you can expand and collapse nodes, search for specific keys or values, and navigate complex structures efficiently.
      </p>
      <p>
        Key features of a good JSON viewer:
      </p>
      <ul>
        <li><strong>Collapsible tree view:</strong> Expand only the sections you need. Hide everything else to reduce visual noise.</li>
        <li><strong>Search and filter:</strong> Find a specific key or value across the entire JSON document instantly.</li>
        <li><strong>Type indicators:</strong> Visually distinguish strings, numbers, booleans, arrays, and objects with color coding.</li>
        <li><strong>Path display:</strong> See the full JSONPath (e.g., <code>$.data.users[0].name</code>) for any selected node.</li>
        <li><strong>Copy path/value:</strong> Copy the path or value of any node to use in code or API queries.</li>
        <li><strong>Array length display:</strong> See how many items are in each array without expanding it.</li>
      </ul>
      <p>
        Our <Link href={`/${lang}/tools/json-formatter`}>JSON formatter</Link> includes a viewer mode that renders the document as an expandable tree. This is especially useful when exploring API responses from services like Elasticsearch, MongoDB, or GraphQL endpoints that return deeply nested data.
      </p>
      <p>
        For browser-based debugging, the Chrome DevTools Network tab and Firefox Developer Tools both include built-in JSON viewers that automatically format API responses. You can also install browser extensions like JSONView to automatically format any JSON response displayed in the browser.
      </p>

      <h2>Common JSON Syntax Errors and How to Fix Them</h2>
      <p>
        Even experienced developers encounter JSON syntax errors regularly. Here are the most common mistakes and how to fix them:
      </p>
      <h3>1. Trailing Commas</h3>
      <p>
        Unlike JavaScript objects, JSON does not allow trailing commas after the last element in an object or array:
      </p>
      <pre><code className="language-json">{`// INVALID - trailing comma
{
  "name": "Alice",
  "age": 30,
}

// VALID
{
  "name": "Alice",
  "age": 30
}`}</code></pre>

      <h3>2. Single Quotes Instead of Double Quotes</h3>
      <p>
        JSON requires double quotes for all strings and keys. Single quotes are not valid:
      </p>
      <pre><code className="language-json">{`// INVALID - single quotes
{'name': 'Alice'}

// VALID - double quotes only
{"name": "Alice"}`}</code></pre>

      <h3>3. Unescaped Special Characters in Strings</h3>
      <p>
        Backslashes, double quotes, and control characters inside strings must be escaped:
      </p>
      <pre><code className="language-json">{`// INVALID - unescaped characters
{"path": "C:\\Users\\Alice"}
{"message": "She said "hello""}

// VALID - escaped
{"path": "C:\\\\Users\\\\Alice"}
{"message": "She said \\"hello\\""}`}</code></pre>

      <h3>4. Comments in JSON</h3>
      <p>
        JSON does not support comments. If you need comments in configuration files, consider using JSONC (JSON with Comments, supported by VS Code), JSON5, or switch to <Link href={`/${lang}/blog/json-vs-yaml-vs-toml`}>YAML or TOML</Link>:
      </p>
      <pre><code className="language-json">{`// INVALID - comments not allowed
{
  "port": 3000, // server port
  "debug": true  /* enable debug mode */
}

// VALID - no comments
{
  "port": 3000,
  "debug": true
}`}</code></pre>

      <h3>5. Numbers with Leading Zeros</h3>
      <pre><code className="language-json">{`// INVALID - leading zeros
{"port": 08080}

// VALID
{"port": 8080}`}</code></pre>

      <h3>6. Using undefined, NaN, or Infinity</h3>
      <pre><code className="language-json">{`// INVALID - not valid JSON values
{"value": undefined, "ratio": NaN, "max": Infinity}

// VALID - use null for missing values
{"value": null, "ratio": 0, "max": 999999}`}</code></pre>
      <p>
        For a comprehensive list of JSON parsing errors and solutions, see our detailed guide: <Link href={`/${lang}/blog/json-parse-error-unexpected-token`}>JSON.parse() Unexpected Token Error: Complete Fix Guide</Link>.
      </p>

      <h2>JSON vs YAML vs TOML: When to Use What</h2>
      <p>
        JSON is not the only structured data format. YAML and TOML are popular alternatives, each with distinct strengths. Understanding when to use each format helps you choose the right tool for the job:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Feature</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>JSON</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>YAML</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>TOML</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Comments</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Not supported</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Supported (<code>#</code>)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Supported (<code>#</code>)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Human readability</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Good (when formatted)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Excellent</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Excellent</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Machine parsing speed</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Fast</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Slower</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Fast</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Nested data</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Excellent</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Good (indentation-sensitive)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Moderate (tables syntax)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Best for</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>APIs, data exchange</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Config files (Docker, K8s)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>App config (Cargo, pyproject)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Native date/time</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No (strings only)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Multiline strings</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>No (use <code>\n</code>)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes (block scalars)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Yes (triple quotes)</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Use JSON when:</strong> Building REST APIs, transmitting data between microservices, storing structured data in databases, or working with JavaScript/TypeScript applications.
      </p>
      <p>
        <strong>Use YAML when:</strong> Writing configuration files for Docker Compose, Kubernetes, GitHub Actions, or other DevOps tools that expect YAML.
      </p>
      <p>
        <strong>Use TOML when:</strong> Configuring Rust (Cargo.toml), Python (pyproject.toml), or other tools where a flat, INI-like structure with comments is preferred.
      </p>
      <p>
        For a detailed comparison, read our full guide: <Link href={`/${lang}/blog/json-vs-yaml-vs-toml`}>JSON vs YAML vs TOML: When to Use What</Link>. You can also convert between these formats using our <Link href={`/${lang}/tools/json-yaml`}>JSON to YAML converter</Link>.
      </p>

      <h2>Advanced JSON Formatting Tips</h2>
      <p>
        Beyond basic pretty-printing, there are several advanced techniques that can make your JSON workflow more efficient:
      </p>
      <h3>Sort Keys Alphabetically</h3>
      <p>
        Sorting keys makes JSON diffs cleaner in version control. When two developers modify the same config file, unsorted keys can create unnecessary merge conflicts.
      </p>
      <pre><code className="language-bash">{`# Sort keys with jq
jq -S . config.json > config_sorted.json

# Sort keys in Python
python3 -c "import json,sys; d=json.load(sys.stdin); print(json.dumps(d, indent=2, sort_keys=True))" < config.json`}</code></pre>
      <pre><code className="language-javascript">{`// Sort keys in JavaScript
function sortKeys(obj) {
  if (Array.isArray(obj)) return obj.map(sortKeys);
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).sort().reduce((acc, key) => {
      acc[key] = sortKeys(obj[key]);
      return acc;
    }, {});
  }
  return obj;
}

const sorted = JSON.stringify(sortKeys(data), null, 2);`}</code></pre>

      <h3>Format JSON in Git Hooks</h3>
      <p>
        Automate JSON formatting by adding a pre-commit hook that formats all JSON files before they are committed:
      </p>
      <pre><code className="language-bash">{`#!/bin/sh
# .git/hooks/pre-commit
for file in $(git diff --cached --name-only --diff-filter=ACM | grep '\\.json$'); do
  jq -S . "$file" > "$file.tmp" && mv "$file.tmp" "$file"
  git add "$file"
done`}</code></pre>

      <h3>Handle Large JSON Files</h3>
      <p>
        For JSON files exceeding 100 MB, standard tools may run out of memory. Use streaming approaches:
      </p>
      <pre><code className="language-bash">{`# Stream large JSON with jq (memory efficient for arrays)
jq -c '.[]' large-file.json | head -10

# Use Python's ijson for streaming
pip install ijson
python3 -c "
import ijson, sys
for item in ijson.items(open('large-file.json','rb'), 'item'):
    print(item)
"`}</code></pre>

      <h2>JSON Formatting in Different Programming Languages</h2>
      <p>
        Beyond JavaScript and Python, here is how to format JSON in other popular languages:
      </p>
      <h3>Go</h3>
      <pre><code className="language-go">{`package main

import (
    "encoding/json"
    "fmt"
    "os"
)

func main() {
    raw := []byte(\`{"name":"Alice","age":30}\`)
    var data interface{}
    json.Unmarshal(raw, &data)
    formatted, _ := json.MarshalIndent(data, "", "  ")
    fmt.Println(string(formatted))
    // Or write to stdout
    enc := json.NewEncoder(os.Stdout)
    enc.SetIndent("", "  ")
    enc.Encode(data)
}`}</code></pre>

      <h3>Java</h3>
      <pre><code className="language-java">{`// Using Jackson
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

ObjectMapper mapper = new ObjectMapper();
mapper.enable(SerializationFeature.INDENT_OUTPUT);
Object json = mapper.readValue(rawJsonString, Object.class);
String formatted = mapper.writeValueAsString(json);

// Using Gson
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

Gson gson = new GsonBuilder().setPrettyPrinting().create();
JsonElement el = JsonParser.parseString(rawJsonString);
String formatted = gson.toJson(el);`}</code></pre>

      <h3>PHP</h3>
      <pre><code className="language-php">{`<?php
$raw = '{"name":"Alice","age":30}';
$data = json_decode($raw);
$formatted = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
echo $formatted;`}</code></pre>

      <h3>Ruby</h3>
      <pre><code className="language-ruby">{`require 'json'
raw = '{"name":"Alice","age":30}'
parsed = JSON.parse(raw)
puts JSON.pretty_generate(parsed)`}</code></pre>

      <h3>Rust</h3>
      <pre><code className="language-rust">{`use serde_json::Value;

fn main() {
    let raw = r#"{"name":"Alice","age":30}"#;
    let v: Value = serde_json::from_str(raw).unwrap();
    let formatted = serde_json::to_string_pretty(&v).unwrap();
    println!("{}", formatted);
}`}</code></pre>
      <p>
        If you need to convert JSON into strongly typed code for these languages, check out our dedicated converter tools: <Link href={`/${lang}/tools/json-to-go`}>JSON to Go</Link>, <Link href={`/${lang}/tools/json-to-java`}>JSON to Java</Link>, <Link href={`/${lang}/tools/json-to-kotlin`}>JSON to Kotlin</Link>, and <Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript</Link>.
      </p>

      <h2>JSON Formatter vs JSON Validator vs JSON Viewer: What Is the Difference?</h2>
      <p>
        These three terms are often used interchangeably, but they serve different purposes:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Tool</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Purpose</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><strong>JSON Formatter</strong></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Add indentation and line breaks for readability</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Pretty-printed text</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><strong>JSON Validator</strong></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Check if JSON is syntactically correct per RFC 8259</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Valid/invalid + error details</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><strong>JSON Viewer</strong></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Interactively explore JSON with collapsible tree navigation</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Tree UI with expand/collapse</td>
          </tr>
        </tbody>
      </table>
      <p>
        Most modern JSON tools combine all three functions. Our <Link href={`/${lang}/tools/json-formatter`}>JSON formatter</Link> formats, validates, and provides a viewer in a single interface. Use it whenever you need to quickly inspect or debug JSON data.
      </p>

      {/* FAQ Section with Schema.org markup */}
      <h2>Frequently Asked Questions</h2>
      <div itemScope itemType="https://schema.org/FAQPage">
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>What is a JSON formatter?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              A JSON formatter (also called a JSON beautifier or JSON prettifier) is a tool that takes raw, minified, or poorly indented JSON and transforms it into a clean, human-readable format with consistent indentation and line breaks. It does not change the data itself, only the visual presentation.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>How do I format JSON in VS Code?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Open a JSON file in VS Code and press <code>Shift+Alt+F</code> (Windows/Linux) or <code>Shift+Option+F</code> (macOS) to format the entire document. You can also right-click and select &quot;Format Document.&quot; For automatic formatting, enable <code>editor.formatOnSave</code> in your settings. Install the Prettier extension for more consistent cross-project formatting.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>How do I format JSON in the terminal?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Use <code>jq . file.json</code> to format a JSON file with jq (install via <code>brew install jq</code> or <code>apt install jq</code>). Alternatively, use <code>python3 -m json.tool file.json</code> which is available on any system with Python installed. Both commands also accept piped input, so you can use <code>{'curl -s url | jq .'}</code>.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>What is the difference between JSON formatting and JSON validation?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              JSON formatting changes the visual layout (adding indentation and line breaks) without modifying data. JSON validation checks whether the JSON is syntactically correct according to the JSON specification (RFC 8259). Most JSON formatters also validate the input and will report errors if the JSON is malformed. Schema validation goes further by checking whether the data structure matches a predefined schema.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>Is there a keyboard shortcut to format JSON?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              In VS Code: <code>Shift+Alt+F</code> (Windows/Linux) or <code>Shift+Option+F</code> (macOS). In IntelliJ IDEA / WebStorm: <code>Ctrl+Alt+L</code> (Windows/Linux) or <code>Cmd+Option+L</code> (macOS). In Sublime Text: install the Pretty JSON package and use <code>Ctrl+Alt+J</code>. In Vim: use <code>:%!jq .</code> to format the entire buffer.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>Can I format JSON with JavaScript?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Yes. Use <code>JSON.stringify(data, null, 2)</code> to format a JavaScript object with 2-space indentation. To format a JSON string, first parse it: <code>JSON.stringify(JSON.parse(jsonString), null, 2)</code>. The third parameter can be a number (spaces) or a string (e.g., <code>&quot;\t&quot;</code> for tabs).
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>How do I minify JSON?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              In JavaScript, use <code>JSON.stringify(data)</code> without the third parameter. In Python, use <code>{'json.dumps(data, separators=(\',\', \':\'))'}</code>. On the command line, use <code>jq -c . file.json</code>. Minification removes all whitespace and line breaks to produce the smallest possible JSON payload.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>Does JSON support comments?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              No. Standard JSON (RFC 8259) does not support comments. If you need comments, use JSONC (JSON with Comments, supported by VS Code for settings files), JSON5, YAML, or TOML instead. Some tools strip comments as a preprocessing step before parsing.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>Why is my JSON not formatting correctly?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              The most common reasons are: (1) the JSON is invalid (trailing commas, single quotes, unquoted keys, comments), (2) the file has a BOM (byte order mark) at the beginning, (3) the encoding is not UTF-8, or (4) the JSON is actually a JavaScript object literal (not valid JSON). Try pasting your JSON into a validator to see the exact error.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: '16px' }}>
          <h3 itemProp="name" style={{ fontSize: '1.1em', marginBottom: '4px' }}>What is the best free JSON formatter online?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              A good online JSON formatter should be fast, handle large files, validate syntax, support customizable indentation, and process everything client-side for privacy. Our <Link href={`/${lang}/tools/json-formatter`}>DevToolBox JSON formatter</Link> meets all these criteria and is completely free with no sign-up required.
            </p>
          </div>
        </div>
      </div>

      {/* Related tools and articles */}
      <h2>Related Tools and Resources</h2>
      <p>Explore more JSON tools and guides on DevToolBox:</p>
      <ul>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter & Validator Online</Link> - Format, validate, and view JSON in your browser</li>
        <li><Link href={`/${lang}/tools/json-yaml`}>JSON to YAML Converter</Link> - Convert between JSON and YAML formats</li>
        <li><Link href={`/${lang}/tools/json-validator`}>JSON Validator</Link> - Validate JSON syntax and structure</li>
        <li><Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript</Link> - Generate TypeScript interfaces from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-go`}>JSON to Go Struct</Link> - Convert JSON to Go struct definitions</li>
        <li><Link href={`/${lang}/tools/csv-json`}>CSV to JSON Converter</Link> - Transform CSV data into JSON</li>
        <li><Link href={`/${lang}/blog/json-vs-yaml-vs-toml`}>JSON vs YAML vs TOML</Link> - Detailed format comparison</li>
        <li><Link href={`/${lang}/blog/json-parse-error-unexpected-token`}>JSON Parse Error Fix Guide</Link> - Resolve common parsing issues</li>
        <li><Link href={`/${lang}/blog/json-formatter-validator-guide`}>JSON Formatter & Validator Guide</Link> - In-depth formatting guide</li>
        <li><Link href={`/${lang}/blog/jq-command-tutorial-examples`}>jq Command Tutorial</Link> - Master the jq command-line tool</li>
      </ul>
    </>
  );
}
