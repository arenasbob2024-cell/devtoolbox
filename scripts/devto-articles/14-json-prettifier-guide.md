---
title: "JSON Prettifier: Format Minified JSON for Readability"
tags: json, webdev, javascript, productivity
canonical_url: https://viadreams.cc/en/tools/json-prettifier
published: true
---

Working with minified JSON from APIs? Here's how to quickly format it for readability.

## Why Prettify JSON?

API responses and config files are often minified to save bandwidth:

```
{"name":"John","age":30,"address":{"city":"NYC","zip":"10001"},"tags":["dev","js"]}
```

Prettified JSON is much easier to read and debug:

```json
{
  "name": "John",
  "age": 30,
  "address": {
    "city": "NYC",
    "zip": "10001"
  },
  "tags": [
    "dev",
    "js"
  ]
}
```

## Quick Methods

### Command Line
```bash
echo '{"a":1}' | python -m json.tool
echo '{"a":1}' | jq .
```

### JavaScript
```javascript
const formatted = JSON.stringify(data, null, 2);
```

### Online Tool
Use the free [JSON Prettifier](https://viadreams.cc/en/tools/json-prettifier) for instant formatting with:
- Syntax validation
- 2-space indentation
- Copy to clipboard
- No data sent to servers

## Related Tools

- [JSON Formatter](https://viadreams.cc/en/tools/json-formatter) - Full-featured JSON formatter
- [JSON Validator](https://viadreams.cc/en/tools/json-validator) - Validate JSON syntax
- [JSON Minifier](https://viadreams.cc/en/tools/json-minify-online) - Minify JSON for production
- [JSON to YAML](https://viadreams.cc/en/tools/json-to-yaml) - Convert JSON to YAML
