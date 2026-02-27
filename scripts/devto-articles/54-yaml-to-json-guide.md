---
title: "YAML to JSON: Convert Online with JavaScript, Python, and CLI Tools"
tags: yaml, json, devtools, webdev
canonical_url: https://viadreams.cc/en/blog/yaml-to-json-online-guide
published: true
---

Convert YAML to JSON with code or online tools. Here's the complete guide.

## YAML vs JSON — Key Differences

| Feature | YAML | JSON |
|---------|------|------|
| Readability | Human-friendly, indented | Machine-friendly, compact |
| Comments | `#` comments supported | No comments |
| Data Types | Rich (dates, binary, null aliases) | Limited (string, number, bool, null) |
| Use Case | Config files, k8s manifests | APIs, data exchange |

## JavaScript with js-yaml

```javascript
const yaml = require('js-yaml');
const fs = require('fs');

// String conversion
const yamlStr = `
name: Alice
age: 30
active: true
tags:
  - admin
  - user
`;

const obj = yaml.load(yamlStr);
const json = JSON.stringify(obj, null, 2);
console.log(json);
// {"name":"Alice","age":30,"active":true,"tags":["admin","user"]}

// File conversion
const fileContent = fs.readFileSync('config.yaml', 'utf8');
const data = yaml.load(fileContent);
fs.writeFileSync('config.json', JSON.stringify(data, null, 2));
```

## Python with PyYAML

```python
import yaml, json

yaml_str = """
name: Alice
age: 30
address:
  city: Portland
  zip: "97201"
"""

data = yaml.safe_load(yaml_str)
print(json.dumps(data, indent=2))

# File conversion
with open('config.yaml') as f:
    data = yaml.safe_load(f)
with open('config.json', 'w') as f:
    json.dump(data, f, indent=2)

# Multi-document YAML (--- separator)
docs = list(yaml.safe_load_all(multi_yaml))
print(json.dumps(docs, indent=2))
```

## CLI Tools

```bash
# yq (most powerful)
yq -o json config.yaml

# Python one-liner
cat config.yaml | python3 -c "import yaml,json,sys; print(json.dumps(yaml.safe_load(sys.stdin), indent=2))"

# Ruby one-liner
ruby -ryaml -rjson -e 'puts JSON.pretty_generate(YAML.safe_load($stdin.read))' < config.yaml
```

## YAML Data Type Mapping

```yaml
# YAML → JSON behavior to watch out for:
null_val: ~          # → null
bool_trap: yes       # → true (YAML 1.1 boolean)
octal: 0777          # → 511 (parsed as octal!)
date: 2024-01-15     # → "2024-01-15" in some parsers, Date object in others
```

## YAML Anchors → JSON Expansion

```yaml
# YAML with anchors
defaults: &defaults
  timeout: 30
  retries: 3

production:
  <<: *defaults      # merge key
  host: prod.example.com
```

```json
// Expands to:
{
  "defaults": {"timeout": 30, "retries": 3},
  "production": {"timeout": 30, "retries": 3, "host": "prod.example.com"}
}
```

## Common Pitfalls

```yaml
# YAML boolean trap (YAML 1.1)
enabled: yes    # true
disabled: no    # false
flag: on        # true
toggle: off     # false

# Fix: quote string values
flag: "on"      # stays as string "on"
country: "NO"   # stays as "NO", not false
```

## Quick Tool

For instant YAML to JSON conversion, use **[DevToolBox YAML to JSON converter](https://viadreams.cc/en/tools/yaml-to-json)** — paste YAML, get formatted JSON instantly.

---

*Convert YAML to JSON online with [DevToolBox's free YAML to JSON tool](https://viadreams.cc/en/tools/yaml-to-json).*
