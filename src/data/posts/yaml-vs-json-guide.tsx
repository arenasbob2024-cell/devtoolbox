'use client';

import Link from 'next/link';

export default function YamlVsJsonGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>YAML vs JSON: Quick Overview</h2>
      <p>
        <strong>YAML</strong> (YAML Ain't Markup Language) and <strong>JSON</strong> (JavaScript Object Notation) are two of the most widely used data serialization formats in software development. Both represent structured data as human-readable text, but they differ significantly in syntax, readability, features, and typical use cases. This guide provides a thorough comparison to help you choose the right format for your project.
      </p>
      <p>
        <Link href={`/${lang}/tools/yaml-json-converter`} style={{ fontWeight: 600 }}>Convert between YAML and JSON instantly with our free online converter.</Link>
      </p>

      <h2>Syntax Comparison</h2>
      <p>
        The most obvious difference between YAML and JSON is their syntax. JSON uses braces and brackets with explicit quoting, while YAML uses indentation and a more human-friendly format.
      </p>
      <pre><code className="language-json">{`// JSON - explicit, strict syntax
{
  "server": {
    "host": "0.0.0.0",
    "port": 8080,
    "ssl": true,
    "allowed_origins": [
      "https://example.com",
      "https://api.example.com"
    ]
  },
  "database": {
    "driver": "postgresql",
    "host": "db.example.com",
    "port": 5432,
    "name": "myapp_production",
    "pool_size": 20,
    "ssl_mode": "require"
  },
  "logging": {
    "level": "info",
    "format": "json",
    "output": ["stdout", "file"]
  }
}`}</code></pre>

      <pre><code className="language-yaml">{`# YAML - clean, indentation-based syntax
server:
  host: "0.0.0.0"
  port: 8080
  ssl: true
  allowed_origins:
    - https://example.com
    - https://api.example.com

database:
  driver: postgresql
  host: db.example.com
  port: 5432
  name: myapp_production
  pool_size: 20
  ssl_mode: require

logging:
  level: info
  format: json
  output:
    - stdout
    - file`}</code></pre>

      <h2>Feature-by-Feature Comparison</h2>
      <pre><code className="language-text">{`YAML vs JSON Feature Comparison:

Feature               YAML                          JSON
--------------------  ----------------------------  ----------------------------
File extensions       .yml, .yaml                   .json
Comments              Yes (# comment)               No
Multiline strings     Yes (| and > blocks)          No (use \\n escape)
Data types            Auto-detected                 Explicit (string, number, etc.)
Anchors/References    Yes (&anchor, *alias)         No
Merge keys            Yes (<<: *base)               No
Multiple documents    Yes (--- separator)            No
Trailing commas       Not applicable                Not allowed
Quoting               Optional for most strings     Required for all keys/strings
Nesting               Indentation (2 spaces)        Braces and brackets
Parsing speed         Slower                        Faster
File size             Smaller (no braces/quotes)    Larger (verbose)
Language support      Broad (most languages)        Universal (all languages)
Browser native        No                            Yes (JSON.parse)
API standard          No                            Yes (REST APIs, GraphQL)`}</code></pre>

      <h2>When to Use JSON</h2>
      <p>
        JSON is the better choice in several key scenarios:
      </p>
      <p>
        <strong>APIs and web services:</strong> JSON is the universal standard for REST APIs, GraphQL responses, and WebSocket messages. Every programming language has built-in JSON support, and browsers can parse it natively with <code>JSON.parse()</code>.
      </p>
      <p>
        <strong>Configuration that needs strictness:</strong> JSON's strict syntax prevents ambiguity. There is exactly one way to represent each value, which makes automated tooling more reliable.
      </p>
      <p>
        <strong>Data exchange between systems:</strong> When sending data between microservices, databases, or third-party services, JSON is the safest choice because of its universal support and well-defined specification.
      </p>
      <pre><code className="language-javascript">{`// JSON in JavaScript - native support
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// JSON in APIs
const response = await fetch('/api/users');
const users = await response.json();

// package.json, tsconfig.json, .eslintrc.json
// All major JS/TS tooling uses JSON`}</code></pre>

      <h2>When to Use YAML</h2>
      <p>
        YAML excels in human-facing configuration scenarios:
      </p>
      <p>
        <strong>Docker and Kubernetes:</strong> Docker Compose files, Kubernetes manifests, and Helm charts all use YAML. The clean syntax makes complex infrastructure configurations readable.
      </p>
      <p>
        <strong>CI/CD pipelines:</strong> GitHub Actions, GitLab CI, CircleCI, and most CI/CD platforms use YAML for workflow definitions.
      </p>
      <p>
        <strong>Configuration files that humans edit frequently:</strong> YAML's comment support, cleaner syntax, and multiline strings make it ideal for files that developers edit by hand.
      </p>
      <pre><code className="language-yaml">{`# docker-compose.yml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://db:5432/myapp
    depends_on:
      - db
      - redis

  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret

  redis:
    image: redis:7-alpine

volumes:
  pgdata:`}</code></pre>

      <pre><code className="language-yaml">{`# .github/workflows/ci.yml
name: CI Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
      - run: npm run build`}</code></pre>

      <h2>YAML Anchors and Aliases</h2>
      <p>
        One of YAML's most powerful features is anchors and aliases, which let you define reusable blocks and reference them throughout the document. This eliminates duplication in large configuration files.
      </p>
      <pre><code className="language-yaml">{`# Define anchors with & and reference with *
defaults: &defaults
  adapter: postgres
  host: localhost
  pool: 5

development:
  <<: *defaults          # Merge all keys from defaults
  database: myapp_dev

test:
  <<: *defaults
  database: myapp_test

production:
  <<: *defaults
  host: db.production.com
  pool: 25
  database: myapp_prod
  ssl: true

# This is equivalent to writing:
# production:
#   adapter: postgres
#   host: db.production.com
#   pool: 25
#   database: myapp_prod
#   ssl: true`}</code></pre>

      <pre><code className="language-yaml">{`# Anchors for CI/CD shared steps
.setup: &setup
  - checkout
  - restore_cache:
      keys: [deps-v1]
  - run: npm ci
  - save_cache:
      key: deps-v1
      paths: [node_modules]

jobs:
  test:
    steps:
      <<: *setup
      - run: npm test

  lint:
    steps:
      <<: *setup
      - run: npm run lint`}</code></pre>

      <h2>YAML Multiline Strings</h2>
      <p>
        YAML supports two types of multiline strings that JSON cannot express natively:
      </p>
      <pre><code className="language-yaml">{`# Literal block (|) - preserves line breaks
description: |
  This is a multiline string.
  Each line break is preserved exactly
  as written in the YAML file.

  Empty lines become real line breaks.

# Folded block (>) - joins lines with spaces
summary: >
  This is a long paragraph that
  will be folded into a single line
  with spaces between each segment.

  A blank line starts a new paragraph.

# With chomping indicators
keep_trailing: |+
  This keeps trailing newlines

strip_trailing: |-
  This strips all trailing newlines

# JSON equivalent requires escape sequences:
# { "description": "This is a multiline string.\\nEach line break..." }`}</code></pre>

      <h2>Converting Between YAML and JSON</h2>
      <p>
        Since YAML is a superset of JSON (every valid JSON document is also valid YAML), conversion between formats is straightforward:
      </p>
      <pre><code className="language-javascript">{`// Node.js - using js-yaml
const yaml = require('js-yaml');
const fs = require('fs');

// YAML to JSON
const yamlContent = fs.readFileSync('config.yml', 'utf8');
const jsonObj = yaml.load(yamlContent);
fs.writeFileSync('config.json', JSON.stringify(jsonObj, null, 2));

// JSON to YAML
const jsonContent = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const yamlStr = yaml.dump(jsonContent, {
  indent: 2,
  lineWidth: 120,
  noRefs: true,
});
fs.writeFileSync('config.yml', yamlStr);`}</code></pre>

      <pre><code className="language-python">{`# Python - using PyYAML
import yaml
import json

# YAML to JSON
with open('config.yml') as f:
    data = yaml.safe_load(f)
with open('config.json', 'w') as f:
    json.dump(data, f, indent=2)

# JSON to YAML
with open('config.json') as f:
    data = json.load(f)
with open('config.yml', 'w') as f:
    yaml.dump(data, f, default_flow_style=False, indent=2)`}</code></pre>

      <pre><code className="language-bash">{`# Command line conversion
# Using yq (https://github.com/mikefarah/yq)
yq -o=json config.yml > config.json    # YAML to JSON
yq -P config.json > config.yml          # JSON to YAML

# Using Python one-liner
python3 -c "import sys,yaml,json; json.dump(yaml.safe_load(open(sys.argv[1])),sys.stdout,indent=2)" config.yml`}</code></pre>

      <h2>JSON Schema vs YAML Schema Validation</h2>
      <p>
        Both JSON and YAML benefit from schema validation to ensure data correctness. JSON Schema is the established standard, and it works for YAML too since YAML data is parsed into the same data structures.
      </p>
      <pre><code className="language-json">{`// JSON Schema works for both JSON and YAML validation
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "server": {
      "type": "object",
      "properties": {
        "host": { "type": "string" },
        "port": { "type": "integer", "minimum": 1, "maximum": 65535 },
        "ssl": { "type": "boolean" }
      },
      "required": ["host", "port"]
    }
  },
  "required": ["server"]
}`}</code></pre>

      <h2>Common YAML Pitfalls</h2>
      <p>
        YAML's flexible syntax can lead to surprising behavior. Here are the most common gotchas:
      </p>
      <pre><code className="language-yaml">{`# Pitfall 1: Unquoted strings interpreted as other types
country: NO          # Parsed as boolean false!
country: "NO"        # Correct: string "NO"
version: 1.0         # Parsed as float 1.0
version: "1.0"       # Correct: string "1.0"
port: 0800           # Parsed as octal 512!
port: "0800"         # Correct: string "0800"

# Pitfall 2: Indentation errors (tabs are NOT allowed)
server:
  host: localhost     # 2-space indent (correct)
\tport: 8080         # TAB indent (YAML parse error!)

# Pitfall 3: Colon in values
message: Error: file not found    # Parse error!
message: "Error: file not found"  # Correct

# Pitfall 4: The Norway Problem
# These are all boolean false in YAML 1.1:
# no, No, NO, off, Off, OFF, false, False, FALSE
# Fixed in YAML 1.2 (only true/false are booleans)`}</code></pre>

      <h2>Use Case Summary</h2>
      <pre><code className="language-text">{`Format Decision Guide:

Use Case                          Recommended Format
----------------------------------  ------------------
REST API request/response           JSON
GraphQL response                    JSON
package.json / tsconfig.json        JSON (standard)
Docker Compose                      YAML
Kubernetes manifests                YAML
GitHub Actions workflows            YAML
CI/CD configuration                 YAML
Application config (human-edited)   YAML
Data exchange between services      JSON
Browser/frontend data               JSON
Ansible playbooks                   YAML
Swagger/OpenAPI spec                YAML (or JSON)
Cloud infrastructure (AWS SAM, etc) YAML`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>Is YAML a superset of JSON?</h3>
      <p>
        Yes, starting from YAML 1.2, every valid JSON document is also valid YAML. This means you can paste JSON into a YAML file and it will parse correctly. However, YAML 1.1 (which some older parsers use) has minor incompatibilities with JSON, such as different boolean handling.
      </p>

      <h3>Which is faster to parse, YAML or JSON?</h3>
      <p>
        JSON is significantly faster to parse because its grammar is simpler and more constrained. YAML parsers need to handle indentation, type inference, anchors, and multiline strings, which adds overhead. For large files or performance-critical applications, JSON is the better choice.
      </p>

      <h3>Can I use comments in JSON?</h3>
      <p>
        Standard JSON (RFC 8259) does not support comments. Some tools like VS Code support JSONC (JSON with Comments), and some parsers offer a relaxed mode that strips comments. If you need comments, YAML or JSONC are better choices.
      </p>

      <h3>Should I use .yml or .yaml file extension?</h3>
      <p>
        Both are valid. The YAML FAQ recommends <code>.yaml</code> as the official extension, but <code>.yml</code> is equally common in practice. Docker uses <code>.yml</code> by default, while Kubernetes documentation uses <code>.yaml</code>. Pick one and be consistent.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/yaml-json-converter`}>YAML to JSON Converter</Link> - Convert between YAML and JSON online</li>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format and validate JSON data</li>
        <li><Link href={`/${lang}/tools/yaml-validator`}>YAML Validator</Link> - Validate YAML syntax online</li>
        <li><Link href={`/${lang}/blog/json-vs-yaml-vs-toml`}>JSON vs YAML vs TOML</Link> - Three-way format comparison</li>
        <li><Link href={`/${lang}/blog/yaml-syntax-validation-guide`}>YAML Syntax Guide</Link> - Complete YAML syntax reference</li>
        <li><Link href={`/${lang}/blog/yaml-multiline-string-block-folded`}>YAML Multiline Strings</Link> - Block and folded scalar reference</li>
        <li><Link href={`/${lang}/blog/yaml-anchors-aliases-merge-keys`}>YAML Anchors and Aliases</Link> - Reuse data with anchors</li>
        <li><Link href={`/${lang}/blog/docker-compose-yaml-errors`}>Docker Compose YAML Errors</Link> - Common YAML mistakes in Docker</li>
      </ul>
    </>
  );
}
