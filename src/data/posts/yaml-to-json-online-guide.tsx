'use client';

const translations = {
  en: {
    title: 'YAML to JSON: Convert Online with JavaScript, Python, and CLI Tools',
    description: 'Convert YAML to JSON online and with code. Complete guide for JavaScript, Python, Go, and command-line YAML-to-JSON conversion.',
  },
  zh: {
    title: 'YAML 转 JSON：在线转换与 JavaScript、Python、CLI 工具指南',
    description: '在线及编程方式将 YAML 转换为 JSON。JavaScript、Python、Go 和命令行 YAML 转 JSON 完整指南。',
  },
};

export default function YamlToJsonOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the easiest way to convert YAML to JSON online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The easiest way is to use an online YAML to JSON converter tool like the one at DevToolBox (viadreams.cc). Paste your YAML, click convert, and get JSON output instantly — no installation required. For programmatic use, js-yaml in JavaScript or PyYAML in Python are the standard libraries.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert YAML to JSON in JavaScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Install js-yaml with npm install js-yaml, then use: const yaml = require("js-yaml"); const obj = yaml.load(yamlString); const json = JSON.stringify(obj, null, 2);. This works in Node.js and browser environments.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert YAML to JSON in Python?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use PyYAML: import yaml, json; data = yaml.safe_load(yaml_string); print(json.dumps(data, indent=2)). Always use yaml.safe_load() instead of yaml.load() to prevent code execution vulnerabilities.',
        },
      },
      {
        '@type': 'Question',
        name: 'What CLI tool converts YAML to JSON?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'yq is the most popular CLI tool: yq -o json file.yaml. Alternatively, use the Python one-liner: cat file.yaml | python3 -c "import yaml,json,sys; print(json.dumps(yaml.safe_load(sys.stdin), indent=2))" without any extra installation beyond Python.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does YAML "yes" or "no" become a boolean in JSON?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In YAML 1.1 (used by many parsers), yes, no, on, off, true, false are all parsed as booleans. So "NO" (Norway country code) becomes false in JSON. The fix: always quote ambiguous strings — use "yes", "no", "on", "off". YAML 1.2 only treats true/false as booleans, but many parsers still default to 1.1.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does YAML handle anchors when converting to JSON?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'YAML anchors (&name) and aliases (*name) are fully dereferenced (expanded inline) during JSON conversion. Merge keys (<<: *base) are also expanded. This means JSON output may be larger than YAML source because all referenced data is duplicated at each alias location.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert multi-document YAML to JSON?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Multi-document YAML (documents separated by ---) converts to a JSON array. In JavaScript: const docs = yaml.loadAll(yamlString) returns an array. In Python: list(yaml.safe_load_all(yaml_string)) returns a list of documents. Then use JSON.stringify(docs) or json.dumps(docs) to serialize.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert YAML to JSON in Go?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use gopkg.in/yaml.v3 and encoding/json: var obj interface{}; yaml.Unmarshal([]byte(yamlBytes), &obj); jsonBytes, _ := json.Marshal(obj). For typed structs, define a struct, unmarshal YAML into it, then marshal to JSON for type safety.',
        },
      },
    ],
  };

  return (
    <article style={{ maxWidth: '820px', margin: '0 auto', padding: '1rem', color: '#1e293b', lineHeight: '1.7', fontFamily: 'system-ui, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', color: '#0f172a' }}>
        {t.title}
      </h1>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '1rem' }}>
        {t.description}
      </p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <strong style={{ color: '#0369a1', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</strong>
        <p style={{ margin: '0.5rem 0 0', color: '#0c4a6e', fontSize: '0.95rem' }}>
          {isZh
            ? 'YAML 是人类可读的配置格式，JSON 是 API 的通用语言。在线转换用 DevToolBox 的免费工具；代码中用 js-yaml（JavaScript）、PyYAML（Python）或 gopkg.in/yaml.v3（Go）；命令行用 yq。注意 YAML 的布尔陷阱（yes/no/on/off）、制表符禁止、锚点展开等常见坑。多文档 YAML（---分隔）转换为 JSON 数组。'
            : 'YAML is the human-readable config format; JSON is the universal language of APIs. Convert online with DevToolBox\'s free tool; use js-yaml (JavaScript), PyYAML (Python), or gopkg.in/yaml.v3 (Go) in code; use yq on the command line. Watch out for YAML boolean traps (yes/no/on/off), forbidden tabs, and anchor expansion. Multi-document YAML (--- separator) converts to a JSON array.'}
        </p>
      </div>

      {/* Section 1: YAML vs JSON */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'YAML 与 JSON — 核心区别' : 'YAML vs JSON — Key Differences'}
      </h2>
      <p style={{ marginBottom: '1rem' }}>
        {isZh
          ? 'YAML（YAML Ain\'t Markup Language）和 JSON（JavaScript Object Notation）都是数据序列化格式，但设计哲学截然不同。YAML 面向人类编辑，以缩进表示层次；JSON 面向机器解析，语法严格无歧义。下表对比两者在实际使用中的关键差异：'
          : 'YAML (YAML Ain\'t Markup Language) and JSON (JavaScript Object Notation) are both data serialization formats, but with fundamentally different design philosophies. YAML is optimized for human editing with indentation-based nesting; JSON is optimized for machine parsing with strict, unambiguous syntax. The table below compares key differences in real-world use:'}
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem', textAlign: 'left', fontWeight: '700' }}>
                {isZh ? '特性' : 'Feature'}
              </th>
              <th style={{ border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem', textAlign: 'left', fontWeight: '700' }}>YAML</th>
              <th style={{ border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem', textAlign: 'left', fontWeight: '700' }}>JSON</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '可读性' : 'Readability', isZh ? '极佳，缩进语法，无多余标点' : 'Excellent — indentation syntax, minimal punctuation', isZh ? '中等，大量引号和括号' : 'Moderate — many quotes and brackets'],
              [isZh ? '注释支持' : 'Comments Support', isZh ? '支持（# 开头）' : 'Yes — lines starting with #', isZh ? '不支持' : 'Not supported'],
              [isZh ? '数据类型' : 'Data Types', isZh ? '字符串、整数、浮点数、布尔、null、日期、二进制' : 'Strings, ints, floats, booleans, null, dates, binary', isZh ? '字符串、数字、布尔、null、数组、对象' : 'Strings, numbers, booleans, null, arrays, objects'],
              [isZh ? '文件大小' : 'File Size', isZh ? '通常更小（无引号和括号）' : 'Generally smaller — no quotes or braces required', isZh ? '稍大（需引号和括号）' : 'Slightly larger due to required syntax characters'],
              [isZh ? '解析速度' : 'Parsing Speed', isZh ? '较慢（缩进敏感解析）' : 'Slower — indentation-sensitive parsing', isZh ? '较快（语法简单）' : 'Faster — simpler grammar, widely optimized'],
              [isZh ? '典型用途' : 'Use Case', isZh ? 'Kubernetes、Docker Compose、CI/CD、Ansible' : 'Kubernetes, Docker Compose, CI/CD, Ansible config', isZh ? 'REST API、数据库、程序间通信' : 'REST APIs, databases, machine-to-machine exchange'],
            ].map(([feature, yaml, json], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem', fontWeight: '600' }}>{feature}</td>
                <td style={{ border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem' }}>{yaml}</td>
                <td style={{ border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem' }}>{json}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 2: Online Conversion */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? '在线转换' : 'Online Conversion'}
      </h2>
      <p style={{ marginBottom: '1rem' }}>
        {isZh
          ? '最快的 YAML 转 JSON 方式是使用在线工具。DevToolBox 的 YAML to JSON 转换器支持实时预览、错误高亮和格式化输出——无需安装任何依赖。适合临时转换、调试配置文件或验证 YAML 语法。'
          : 'The fastest way to convert YAML to JSON is using an online tool. The DevToolBox YAML to JSON converter provides real-time preview, error highlighting, and formatted output — no installation required. It is ideal for one-off conversions, debugging configuration files, or verifying YAML syntax before committing to a repository.'}
      </p>
      <p style={{ marginBottom: '1rem' }}>
        {isZh
          ? '对于需要集成到工程中的场景，请继续阅读以下各语言的代码示例和命令行方法。'
          : 'For scenarios requiring integration into engineering workflows or automation pipelines, continue reading for language-specific code examples and command-line approaches.'}
      </p>

      {/* Section 3: JavaScript/Node.js */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'JavaScript / Node.js — 使用 js-yaml' : 'JavaScript / Node.js — Using js-yaml'}
      </h2>
      <p style={{ marginBottom: '1rem' }}>
        {isZh
          ? 'js-yaml 是 JavaScript 生态中最流行的 YAML 解析库，兼容 Node.js 和浏览器环境。核心 API 是 yaml.load()（解析 YAML → JS 对象）和 JSON.stringify()（序列化为 JSON）。'
          : 'The js-yaml library is the most popular YAML parser in the JavaScript ecosystem, compatible with both Node.js and browser environments. The core API is yaml.load() to parse YAML into a JavaScript object, and JSON.stringify() to serialize it as JSON.'}
      </p>
      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '安装：' : 'Install:'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`npm install js-yaml
# TypeScript types are bundled — no @types needed`}</code></pre>

      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '基本用法：' : 'Basic conversion:'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`const yaml = require('js-yaml');

const yamlString = \`
name: my-app
version: 1.0.0
database:
  host: localhost
  port: 5432
  credentials:
    user: admin
    password: secret
features:
  - auth
  - logging
  - metrics
enabled: true
\`;

// Parse YAML → JavaScript object
const obj = yaml.load(yamlString);

// Serialize to JSON (pretty-printed with 2-space indent)
const json = JSON.stringify(obj, null, 2);
console.log(json);

/* Output:
{
  "name": "my-app",
  "version": "1.0.0",
  "database": {
    "host": "localhost",
    "port": 5432,
    "credentials": {
      "user": "admin",
      "password": "secret"
    }
  },
  "features": ["auth", "logging", "metrics"],
  "enabled": true
}
*/`}</code></pre>

      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '从文件读取并转换：' : 'Converting a YAML file:'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

function yamlFileToJson(inputPath, outputPath) {
  // Read YAML file
  const yamlContent = fs.readFileSync(inputPath, 'utf8');

  // Parse and convert
  const obj = yaml.load(yamlContent);
  const jsonContent = JSON.stringify(obj, null, 2);

  // Write JSON file
  if (outputPath) {
    fs.writeFileSync(outputPath, jsonContent, 'utf8');
    console.log(\`Converted \${inputPath} → \${outputPath}\`);
  }

  return jsonContent;
}

// Usage
yamlFileToJson('config.yaml', 'config.json');
yamlFileToJson('k8s-deployment.yaml', 'k8s-deployment.json');`}</code></pre>

      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '处理多文档 YAML（--- 分隔符）：' : 'Handling multi-document YAML (--- separator):'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`const yaml = require('js-yaml');

const multiDocYaml = \`
---
kind: Deployment
metadata:
  name: api-server
---
kind: Service
metadata:
  name: api-service
---
kind: ConfigMap
metadata:
  name: api-config
\`;

// yaml.load() only parses the FIRST document
// Use yaml.loadAll() for multi-document YAML
const documents = yaml.loadAll(multiDocYaml);

console.log(\`Found \${documents.length} documents\`);
// Convert the document array to JSON
const json = JSON.stringify(documents, null, 2);
console.log(json);

// Or process each document individually
documents.forEach((doc, index) => {
  console.log(\`Document \${index + 1}: \${doc.kind}\`);
});`}</code></pre>

      {/* Section 4: Python */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'Python — 使用 PyYAML' : 'Python — Using PyYAML'}
      </h2>
      <p style={{ marginBottom: '1rem' }}>
        {isZh
          ? 'PyYAML 是 Python 的标准 YAML 库。始终使用 yaml.safe_load() 而非 yaml.load()，以防止来自不可信 YAML 的任意代码执行。'
          : 'PyYAML is the standard YAML library for Python. Always use yaml.safe_load() instead of yaml.load() to prevent arbitrary code execution from untrusted YAML input — yaml.load() with untrusted data is a known security vulnerability.'}
      </p>
      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '安装：' : 'Install:'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`pip install pyyaml`}</code></pre>

      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '基本转换：' : 'Basic conversion:'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import yaml
import json

yaml_string = """
server:
  host: 0.0.0.0
  port: 8080
  timeout: 30
database:
  url: postgres://localhost/mydb
  pool_size: 10
  ssl: true
logging:
  level: info
  format: json
tags:
  - production
  - api
  - v2
"""

# Parse YAML safely (prevents code execution from untrusted YAML)
data = yaml.safe_load(yaml_string)

# Serialize to JSON with indentation
json_output = json.dumps(data, indent=2)
print(json_output)

# Output:
# {
#   "server": { "host": "0.0.0.0", "port": 8080, "timeout": 30 },
#   "database": { "url": "postgres://localhost/mydb", "pool_size": 10, "ssl": true },
#   "logging": { "level": "info", "format": "json" },
#   "tags": ["production", "api", "v2"]
# }`}</code></pre>

      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '转换文件：' : 'Converting files:'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import yaml
import json
import sys
from pathlib import Path

def yaml_to_json(input_path: str, output_path: str = None) -> str:
    """Convert a YAML file to JSON."""
    with open(input_path, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)

    json_str = json.dumps(data, indent=2, ensure_ascii=False)

    if output_path:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(json_str)
        print(f"Converted {input_path} → {output_path}")

    return json_str

# Convert a single file
result = yaml_to_json("config.yaml", "config.json")

# Convert multiple files in a directory
for yaml_file in Path(".").glob("**/*.yaml"):
    json_file = yaml_file.with_suffix(".json")
    yaml_to_json(str(yaml_file), str(json_file))`}</code></pre>

      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '多文档 YAML（yaml.safe_load_all）：' : 'Multi-document YAML with yaml.safe_load_all():'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import yaml
import json

multi_doc_yaml = """
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-api
spec:
  replicas: 3
---
apiVersion: v1
kind: Service
metadata:
  name: web-api-svc
spec:
  type: ClusterIP
  port: 80
"""

# yaml.safe_load() only reads the first document
# yaml.safe_load_all() returns a generator for all documents
documents = list(yaml.safe_load_all(multi_doc_yaml))

print(f"Found {len(documents)} documents")
# Serialize the entire array to JSON
print(json.dumps(documents, indent=2))`}</code></pre>

      {/* Section 5: Command Line Tools */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? '命令行工具' : 'Command Line Tools'}
      </h2>
      <p style={{ marginBottom: '1rem' }}>
        {isZh
          ? '命令行转换适合 Shell 脚本、CI/CD 管道和快速一次性操作。以下是最常用的几种方式：'
          : 'Command-line conversion is ideal for shell scripts, CI/CD pipelines, and quick one-off operations. Here are the most commonly used approaches:'}
      </p>

      <p style={{ marginBottom: '0.5rem' }}><strong>yq {isZh ? '（推荐）' : '(recommended)'}:</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Install yq (macOS)
brew install yq

# Install yq (Linux)
sudo wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64
sudo chmod +x /usr/local/bin/yq

# Convert YAML file to JSON
yq -o json config.yaml

# Convert and save to file
yq -o json config.yaml > config.json

# Pretty-print with indentation
yq -o json -P config.yaml

# Convert from stdin
cat config.yaml | yq -o json

# Process specific keys during conversion
yq -o json '.database' config.yaml

# Convert multiple files
for f in *.yaml; do yq -o json "$f" > "\${f%.yaml}.json"; done`}</code></pre>

      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? 'Python 一行命令（无需额外安装）：' : 'Python one-liner (no extra installation):'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Convert YAML stdin to JSON stdout
cat file.yaml | python3 -c "import yaml,json,sys; print(json.dumps(yaml.safe_load(sys.stdin), indent=2))"

# Convert YAML file to JSON file
python3 -c "
import yaml, json
with open('input.yaml') as f:
    data = yaml.safe_load(f)
with open('output.json', 'w') as f:
    json.dump(data, f, indent=2)
"

# One-liner with file args
python3 -c "import yaml,json,sys; json.dump(yaml.safe_load(open(sys.argv[1])), open(sys.argv[2],'w'), indent=2)" input.yaml output.json`}</code></pre>

      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? 'Ruby 一行命令：' : 'Ruby one-liner:'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Ruby one-liner (available on most Unix systems)
ruby -ryaml -rjson -e 'puts JSON.pretty_generate(YAML.safe_load(STDIN.read))' < file.yaml`}</code></pre>

      {/* Section 6: YAML Data Type Mapping */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'YAML 数据类型映射到 JSON' : 'YAML Data Type Mapping to JSON'}
      </h2>
      <p style={{ marginBottom: '1rem' }}>
        {isZh
          ? '了解 YAML 类型如何映射到 JSON 是避免转换错误的关键。以下表格展示了常见的类型映射：'
          : 'Understanding how YAML types map to JSON types is essential for avoiding conversion surprises. The following table shows common YAML type mappings:'}
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem', textAlign: 'left', fontWeight: '700' }}>
                {isZh ? 'YAML 值' : 'YAML Value'}
              </th>
              <th style={{ border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem', textAlign: 'left', fontWeight: '700' }}>
                {isZh ? 'JSON 输出' : 'JSON Output'}
              </th>
              <th style={{ border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem', textAlign: 'left', fontWeight: '700' }}>
                {isZh ? '说明' : 'Notes'}
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ['null, ~, (empty)', 'null', isZh ? 'YAML 空值' : 'YAML null values'],
              ['true, false', 'true, false', isZh ? 'YAML 1.1/1.2 布尔值' : 'Booleans in YAML 1.1 and 1.2'],
              ['yes, no, on, off', 'true, false', isZh ? '仅 YAML 1.1 视为布尔' : 'Only in YAML 1.1 — always quote these'],
              ['42, -7', '42, -7', isZh ? '整数' : 'Integer numbers'],
              ['3.14, 1.0e10', '3.14, 1.0e10', isZh ? '浮点数' : 'Floating-point numbers'],
              ['0777 (octal)', '511', isZh ? '八进制 → 十进制整数' : 'Octal notation becomes decimal integer'],
              ['0xFF (hex)', '255', isZh ? '十六进制 → 十进制整数' : 'Hex notation becomes decimal integer'],
              ['"hello", \'world\'', '"hello", "world"', isZh ? '字符串（引号可选）' : 'Strings (quotes optional in YAML)'],
              ['!!binary <base64>', '"<base64>"', isZh ? '二进制数据 → base64 字符串' : 'Binary data becomes base64 string'],
              ['&anchor, *alias', isZh ? '展开的值' : 'Expanded value', isZh ? '锚点/别名完全展开' : 'Anchors and aliases fully dereferenced'],
              ['- item1\n- item2', '["item1", "item2"]', isZh ? '序列 → JSON 数组' : 'YAML sequences become JSON arrays'],
              ['key: value', '{"key": "value"}', isZh ? '映射 → JSON 对象' : 'YAML mappings become JSON objects'],
            ].map(([yaml, json, note], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#7c3aed' }}>{yaml}</td>
                <td style={{ border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#059669' }}>{json}</td>
                <td style={{ border: '1px solid #cbd5e1', padding: '0.6rem 0.8rem', color: '#475569' }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 7: YAML Anchors and Aliases */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'YAML 锚点与别名' : 'YAML Anchors and Aliases'}
      </h2>
      <p style={{ marginBottom: '1rem' }}>
        {isZh
          ? 'YAML 锚点（&）允许定义可复用的数据块，别名（*）引用它们。转换为 JSON 时，所有别名都会完全展开（内联替换），没有引用机制。合并键（<<: *base）也会展开，允许重复键以后者为准。'
          : 'YAML anchors (&) define reusable data blocks, and aliases (*) reference them. During JSON conversion, all aliases are fully dereferenced (expanded inline) — JSON has no reference mechanism. Merge keys (<<: *base) are also expanded, with later keys overriding earlier ones.'}
      </p>

      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '转换前（YAML）：' : 'Before conversion (YAML):'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# YAML with anchors and aliases
defaults: &defaults
  timeout: 30
  retries: 3
  log_level: info

production:
  <<: *defaults          # Merge: inherits timeout, retries, log_level
  log_level: warning     # Override: replaces log_level from defaults
  replicas: 5

staging:
  <<: *defaults          # Merge: inherits all defaults
  replicas: 1

# Simple alias (not merge key)
base_image: &img "node:20-alpine"
services:
  web:
    image: *img          # Alias: becomes "node:20-alpine"
  worker:
    image: *img          # Alias: also becomes "node:20-alpine"`}</code></pre>

      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '转换后（JSON）— 锚点完全展开：' : 'After conversion (JSON) — anchors fully expanded:'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`{
  "defaults": { "timeout": 30, "retries": 3, "log_level": "info" },
  "production": {
    "timeout": 30,
    "retries": 3,
    "log_level": "warning",
    "replicas": 5
  },
  "staging": {
    "timeout": 30,
    "retries": 3,
    "log_level": "info",
    "replicas": 1
  },
  "base_image": "node:20-alpine",
  "services": {
    "web": { "image": "node:20-alpine" },
    "worker": { "image": "node:20-alpine" }
  }
}`}</code></pre>
      <p style={{ marginBottom: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
        {isZh
          ? '注意：JSON 文件比 YAML 大，因为每个别名引用的值都被完全复制。在有大量锚点复用的场景下，这可能显著增加 JSON 体积。'
          : 'Note: The JSON output is larger than the YAML source because every aliased value is fully duplicated. In configurations with heavy anchor reuse, this can significantly increase JSON file size.'}
      </p>

      {/* Section 8: Multi-Document YAML */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? '多文档 YAML' : 'Multi-Document YAML'}
      </h2>
      <p style={{ marginBottom: '1rem' }}>
        {isZh
          ? 'YAML 支持在单个文件中包含多个文档，用 --- 分隔。这在 Kubernetes 中极为常见（一个 YAML 文件包含 Deployment + Service）。转换为 JSON 时，多文档变成 JSON 数组。'
          : 'YAML supports multiple documents in a single file, separated by ---. This is extremely common in Kubernetes (one YAML file containing a Deployment + Service + ConfigMap). When converting to JSON, multi-document YAML becomes a JSON array where each element is one document.'}
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Multi-document YAML (common in Kubernetes)
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-svc
spec:
  selector:
    app: nginx
  ports:
    - port: 80
      targetPort: 8080`}</code></pre>
      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? 'JavaScript — yaml.loadAll()：' : 'JavaScript — yaml.loadAll():'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`const yaml = require('js-yaml');
const fs = require('fs');

const content = fs.readFileSync('k8s-manifests.yaml', 'utf8');

// yaml.load() → only parses FIRST document (wrong for multi-doc)
// yaml.loadAll() → parses ALL documents into an array
const documents = yaml.loadAll(content);

console.log(JSON.stringify(documents, null, 2));
// Result: [{ apiVersion: "apps/v1", kind: "Deployment", ... }, { apiVersion: "v1", kind: "Service", ... }]`}</code></pre>
      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? 'yq 命令行：' : 'yq command line:'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# yq automatically handles multi-document YAML
# Outputs as JSON array
yq -o json k8s-manifests.yaml

# Split into individual JSON files
yq -o json '.' k8s-manifests.yaml | jq -c '.[]' | while read doc; do
  kind=$(echo "$doc" | jq -r '.kind')
  echo "$doc" | jq . > "$\{kind,,}.json"
done`}</code></pre>

      {/* Section 9: Go */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'Go — gopkg.in/yaml.v3 + encoding/json' : 'Go — gopkg.in/yaml.v3 + encoding/json'}
      </h2>
      <p style={{ marginBottom: '1rem' }}>
        {isZh
          ? 'Go 使用 gopkg.in/yaml.v3 解析 YAML，encoding/json（标准库）序列化 JSON。强类型使转换显式可控。可用 interface{} 动态处理，也可定义结构体以获得类型安全。'
          : 'Go uses gopkg.in/yaml.v3 to parse YAML and the standard library encoding/json to serialize JSON. Go\'s strong typing makes conversion explicit and controlled. You can use interface{} for dynamic handling or define structs for type safety.'}
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`// go get gopkg.in/yaml.v3

package main

import (
    "encoding/json"
    "fmt"
    "os"

    "gopkg.in/yaml.v3"
)

// Dynamic approach — works for any YAML structure
func yamlToJsonDynamic(yamlBytes []byte) ([]byte, error) {
    // Step 1: Parse YAML into generic interface{}
    var obj interface{}
    if err := yaml.Unmarshal(yamlBytes, &obj); err != nil {
        return nil, fmt.Errorf("yaml parse error: %w", err)
    }

    // Step 2: Serialize to JSON
    jsonBytes, err := json.MarshalIndent(obj, "", "  ")
    if err != nil {
        return nil, fmt.Errorf("json marshal error: %w", err)
    }

    return jsonBytes, nil
}

// Struct-based approach — type-safe, best for known schemas
type Config struct {
    Name    string \`yaml:"name" json:"name"\`
    Version string \`yaml:"version" json:"version"\`
    Server  struct {
        Host string \`yaml:"host" json:"host"\`
        Port int    \`yaml:"port" json:"port"\`
    } \`yaml:"server" json:"server"\`
    Features []string \`yaml:"features" json:"features"\`
}

func main() {
    yamlContent := []byte(\`
name: my-service
version: "2.1.0"
server:
  host: 0.0.0.0
  port: 8080
features:
  - auth
  - rate-limiting
  - tracing
\`)

    // Dynamic approach
    jsonBytes, err := yamlToJsonDynamic(yamlContent)
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error: %v\\n", err)
        os.Exit(1)
    }
    fmt.Println(string(jsonBytes))

    // Struct-based approach
    var cfg Config
    if err := yaml.Unmarshal(yamlContent, &cfg); err != nil {
        panic(err)
    }
    out, _ := json.MarshalIndent(cfg, "", "  ")
    fmt.Println(string(out))
}`}</code></pre>

      {/* Section 10: Kubernetes and CI/CD Use Cases */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? 'Kubernetes 和 CI/CD 使用场景' : 'Kubernetes and CI/CD Use Cases'}
      </h2>
      <p style={{ marginBottom: '1rem' }}>
        {isZh
          ? '将 YAML 转换为 JSON 在 DevOps 工作流中有多种实际应用：'
          : 'Converting YAML to JSON has several practical applications in DevOps workflows:'}
      </p>

      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '1. 通过 Kubernetes API 操作资源：' : '1. Interacting with the Kubernetes API:'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# kubectl can apply both YAML and JSON
# Convert k8s manifest YAML to JSON for API calls
yq -o json deployment.yaml > deployment.json

# Use with curl to call the Kubernetes API directly
curl -X POST \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $TOKEN" \\
  https://$K8S_API/apis/apps/v1/namespaces/default/deployments \\
  -d @deployment.json

# Validate manifest before applying
kubectl apply --dry-run=client -f deployment.yaml
yq -o json deployment.yaml | kubectl apply --dry-run=client -f -`}</code></pre>

      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '2. GitHub Actions 工作流转换：' : '2. GitHub Actions workflow conversion:'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# GitHub Actions step to convert YAML config to JSON for downstream tools
- name: Convert YAML config to JSON
  run: |
    pip install pyyaml
    python3 -c "
    import yaml, json
    with open('config.yaml') as f:
        data = yaml.safe_load(f)
    with open('config.json', 'w') as f:
        json.dump(data, f, indent=2)
    "
    echo "Config converted:"
    cat config.json

# Or using yq in GitHub Actions
- name: Convert with yq
  uses: mikefarah/yq@master
  with:
    cmd: yq -o json config.yaml > config.json`}</code></pre>

      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? '3. Helm values.yaml 转 JSON（用于 Terraform）：' : '3. Helm values.yaml to JSON for Terraform:'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Convert Helm values.yaml to JSON for use in Terraform helm_release
yq -o json values.yaml > values.json

# In Terraform:
# resource "helm_release" "app" {
#   values = [file("values.json")]
# }

# Or generate Terraform variables from YAML config
python3 -c "
import yaml, json
with open('app-config.yaml') as f:
    config = yaml.safe_load(f)

# Write as Terraform tfvars JSON
with open('terraform.tfvars.json', 'w') as f:
    json.dump(config, f, indent=2)
"`}</code></pre>

      {/* Section 11: Common Pitfalls */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? '常见陷阱与注意事项' : 'Common Pitfalls and Edge Cases'}
      </h2>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        {isZh ? '1. 布尔陷阱（YAML 1.1）' : '1. The Boolean Trap (YAML 1.1)'}
      </h3>
      <p style={{ marginBottom: '0.5rem' }}>
        {isZh
          ? 'YAML 1.1 将大量值视为布尔值。这是最常见的转换错误来源：'
          : 'YAML 1.1 treats a surprisingly large set of values as booleans. This is the most common source of conversion bugs:'}
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# YAML 1.1 boolean trap — these all become true or false in JSON!
country: NO           # → false  (Norway country code!)
debug: yes            # → true
feature_flag: on      # → true
cache: off            # → false
verbose: y            # → true  (short form)
quiet: n              # → false (short form)

# Fix: always quote ambiguous strings
country: "NO"         # → "NO"  (string)
debug: "yes"          # → "yes" (string)
feature_flag: "on"    # → "on"  (string)

# YAML 1.2 only treats these as booleans:
# true, false (case-insensitive)
# All other values are strings`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        {isZh ? '2. 八进制数字（0777 → 511）' : '2. Octal Numbers (0777 → 511)'}
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# File permissions as octal numbers become decimal integers!
chmod_value: 0777    # → 511 in JSON (not "0777"!)
umask: 022           # → 22 in JSON

# Fix: quote the value to keep it as a string
chmod_value: "0777"  # → "0777" (string)
umask: "022"         # → "022" (string)

# Or use explicit YAML tag
chmod_value: !!str 0777  # → "0777"`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        {isZh ? '3. 多行字符串（| 字面量 vs > 折叠）' : '3. Multiline Strings (| literal vs > folded)'}
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Literal block (|) — preserves newlines exactly
script: |
  #!/bin/bash
  echo "Starting..."
  npm install
  npm test
# JSON: "#!/bin/bash\necho \"Starting...\"\nnpm install\nnpm test\n"

# Folded block (>) — joins lines with spaces (like HTML)
description: >
  This is a long
  description that
  wraps across lines.
# JSON: "This is a long description that wraps across lines.\n"

# Chomping indicators control trailing newlines:
# | (default) → keeps exactly one trailing newline
# |- → strips all trailing newlines
# |+ → keeps all trailing newlines`}</code></pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        {isZh ? '4. 制表符禁止使用' : '4. Tabs Are Forbidden'}
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# WRONG: tabs cause parse errors
server:
\thost: localhost    # ← tab character → YAML parse error!
\tport: 8080

# CORRECT: always use spaces (2 is the convention)
server:
  host: localhost    # ← 2 spaces
  port: 8080

# Configure your editor to insert spaces (not tabs) for .yaml files
# .editorconfig:
# [*.{yaml,yml}]
# indent_style = space
# indent_size = 2`}</code></pre>

      {/* Section 12: Reverse — JSON to YAML */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        {isZh ? '反向转换：JSON 转 YAML' : 'Reverse: JSON to YAML'}
      </h2>
      <p style={{ marginBottom: '1rem' }}>
        {isZh
          ? '将 JSON 转换为 YAML 同样简单。每个主流 YAML 库都支持此方向。注意：JSON 转 YAML 再转回 JSON 时，注释和格式会丢失。'
          : 'Converting JSON to YAML is equally straightforward. Every major YAML library supports this direction. Keep in mind: comments cannot survive a JSON round-trip since JSON has no comment syntax.'}
      </p>

      <p style={{ marginBottom: '0.5rem' }}><strong>JavaScript (js-yaml):</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`const yaml = require('js-yaml');

const jsonObj = {
  name: "my-app",
  version: "1.0.0",
  server: { host: "0.0.0.0", port: 8080 },
  features: ["auth", "logging"]
};

// yaml.dump() converts JS object → YAML string
const yamlOutput = yaml.dump(jsonObj, {
  indent: 2,        // 2-space indentation
  lineWidth: 120,   // wrap at 120 chars
  noRefs: true,     // don't use aliases in output
});

console.log(yamlOutput);
// name: my-app
// version: 1.0.0
// server:
//   host: 0.0.0.0
//   port: 8080
// features:
//   - auth
//   - logging`}</code></pre>

      <p style={{ marginBottom: '0.5rem' }}><strong>Python (PyYAML):</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import yaml
import json

json_string = '{"name":"my-app","server":{"host":"localhost","port":8080},"tags":["api","v2"]}'
data = json.loads(json_string)

# yaml.dump() serializes Python dict → YAML string
yaml_output = yaml.dump(data, default_flow_style=False, indent=2, allow_unicode=True)
print(yaml_output)
# name: my-app
# server:
#   host: localhost
#   port: 8080
# tags:
# - api
# - v2`}</code></pre>

      <p style={{ marginBottom: '0.5rem' }}><strong>{isZh ? 'yq 反向转换：' : 'yq reverse conversion:'}</strong></p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Convert JSON to YAML with yq
yq -oy config.json            # -o yaml (can also use --output-format=yaml)
yq -oy config.json > config.yaml

# Convert JSON stdin to YAML
echo '{"name":"app","port":3000}' | yq -oy`}</code></pre>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <strong style={{ color: '#1e293b', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: '0.75rem 0 0', paddingLeft: '1.25rem', color: '#374151', fontSize: '0.95rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            {isZh
              ? 'YAML 用于人类编辑的配置文件（Kubernetes、Docker Compose、GitHub Actions）；JSON 用于 API 和机器间通信。'
              : 'YAML is for human-edited config files (Kubernetes, Docker Compose, GitHub Actions); JSON is for APIs and machine-to-machine communication.'}
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            {isZh
              ? '在线转换用 DevToolBox 的免费工具；代码中用 js-yaml (JS)、PyYAML (Python)、gopkg.in/yaml.v3 (Go)；命令行用 yq。'
              : 'Use DevToolBox\'s online tool for quick conversions; js-yaml (JavaScript), PyYAML (Python), gopkg.in/yaml.v3 (Go) for code; yq for the command line.'}
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            {isZh
              ? 'Python 中始终使用 yaml.safe_load() — yaml.load() 对不可信输入存在任意代码执行风险。'
              : 'Always use yaml.safe_load() in Python — yaml.load() is a known code execution vulnerability with untrusted input.'}
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            {isZh
              ? '布尔陷阱：YAML 1.1 中 yes/no/on/off/y/n 都是布尔值。总是引用可能被误读的字符串。'
              : 'Boolean trap: yes/no/on/off/y/n are all booleans in YAML 1.1. Always quote strings that could be misread as booleans.'}
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            {isZh
              ? 'YAML 锚点（&）和别名（*）在 JSON 转换时完全展开，JSON 输出可能比 YAML 源文件大。'
              : 'YAML anchors (&) and aliases (*) are fully expanded in JSON output — the resulting JSON may be larger than the YAML source.'}
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            {isZh
              ? '多文档 YAML（--- 分隔）用 yaml.loadAll() 或 yaml.safe_load_all() 处理，转换为 JSON 数组。'
              : 'Multi-document YAML (--- separator) requires yaml.loadAll() or yaml.safe_load_all() and converts to a JSON array.'}
          </li>
          <li style={{ marginBottom: '0' }}>
            {isZh
              ? 'YAML 禁止使用制表符缩进——总是用空格（2个空格是惯例）。用 .editorconfig 在编辑器中强制执行。'
              : 'YAML forbids tab characters for indentation — always use spaces (2 is the convention). Enforce with .editorconfig in your editor.'}
          </li>
        </ul>
      </div>
    </article>
  );
}
