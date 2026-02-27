---
title: "cURL to Code Converter: Convert Any cURL Command to Python, JavaScript, Go, PHP"
tags: curl, python, javascript, webdev
canonical_url: https://viadreams.cc/en/blog/curl-to-code-online-guide
published: true
---

Ever copy a cURL command from your browser's DevTools and need to convert it to Python or JavaScript? You're not alone. Here's the complete guide.

## The Problem with cURL Commands

cURL commands are everywhere:
- Browser DevTools "Copy as cURL"
- API documentation examples
- Stack Overflow answers
- CI/CD scripts

But once you need to put them in your code, manual translation is tedious and error-prone.

## cURL Flag to Code Mapping

### Basic POST with JSON body

```bash
curl -X POST https://api.example.com/data \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```

**Python (requests):**
```python
import requests

response = requests.post(
    'https://api.example.com/data',
    headers={
        'Authorization': 'Bearer TOKEN',
        'Content-Type': 'application/json',
    },
    json={'key': 'value'},
)
print(response.json())
```

**JavaScript (fetch):**
```javascript
const response = await fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer TOKEN',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ key: 'value' }),
});
const data = await response.json();
```

**Go:**
```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    body, _ := json.Marshal(map[string]string{"key": "value"})
    req, _ := http.NewRequest("POST", "https://api.example.com/data", bytes.NewBuffer(body))
    req.Header.Set("Authorization", "Bearer TOKEN")
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    fmt.Println("Status:", resp.Status)
}
```

## cURL Flag Reference

| Flag | Meaning | Code equivalent |
|------|---------|-----------------|
| `-X POST` | HTTP method | `method: 'POST'` |
| `-H "Key: Val"` | Request header | `headers: {'Key': 'Val'}` |
| `-d '...'` | Request body | `body: '...'` or `data=...` |
| `-u user:pass` | Basic auth | `auth=('user', 'pass')` |
| `-F "file=@photo.jpg"` | File upload | `files={'file': open(...)}` |
| `-b "cookie=val"` | Cookie | `cookies={'cookie': 'val'}` |
| `--compressed` | Accept gzip | Handled automatically |
| `-k` or `--insecure` | Skip SSL verify | `verify=False` |
| `-L` | Follow redirects | Default in most libraries |
| `-o file.txt` | Output to file | Write response to file |

## Common Patterns

### File upload (multipart form)

```bash
curl -X POST https://api.example.com/upload \
  -F "file=@photo.jpg" \
  -F "name=My Photo"
```

**Python:**
```python
with open('photo.jpg', 'rb') as f:
    response = requests.post(
        'https://api.example.com/upload',
        files={'file': f},
        data={'name': 'My Photo'},
    )
```

### Basic authentication

```bash
curl -u username:password https://api.example.com/protected
```

**Python:**
```python
response = requests.get(
    'https://api.example.com/protected',
    auth=('username', 'password'),
)
```

### Cookies

```bash
curl -b "session=abc123; token=xyz" https://api.example.com/profile
```

**JavaScript:**
```javascript
const response = await fetch('https://api.example.com/profile', {
  headers: {
    'Cookie': 'session=abc123; token=xyz',
  },
  credentials: 'include',
});
```

## Automate Your Conversions

Manually converting cURL commands gets tedious. For complex commands with many headers, authentication, and special flags, try **[DevToolBox's cURL to Code converter](https://viadreams.cc/en/tools/curl-to-code)** — paste any cURL command and get clean code for Python, JavaScript, Go, PHP, Ruby, and more.

## Tips for Clean Conversions

1. **Use `json=` not `data=` in Python** when the body is JSON — it sets Content-Type automatically
2. **Bearer tokens go in headers** — `Authorization: Bearer TOKEN`
3. **For `-d` with form data** (not JSON), use `data={'key': 'value'}` in Python
4. **Test with httpbin.org** — it echoes back exactly what you sent
5. **Remove `-v` (verbose) flags** before converting — they don't affect the request

The best workflow: copy cURL from DevTools → paste into cURL to Code converter → copy the generated code → done. No more manual translation.

---

*Convert cURL commands instantly with [DevToolBox's free cURL to Code tool](https://viadreams.cc/en/tools/curl-to-code) — supports Python, JavaScript, Go, PHP, Ruby, C#, and more.*
