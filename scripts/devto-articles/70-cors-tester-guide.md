---
title: "CORS Tester: Fix CORS Errors and Configure Cross-Origin Requests — Complete Guide"
tags: webdev, javascript, security, api
canonical_url: https://viadreams.cc/en/blog/cors-tester-online-guide
published: true
---

Fix CORS errors and configure cross-origin requests. Complete guide covering CORS headers, preflight requests, Express/Next.js/Nginx/FastAPI, credentials, and debugging.

## What is CORS?

CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts requests between different origins. An **origin** = scheme + host + port.

```
https://app.example.com  ← origin A
https://api.example.com  ← different origin (different subdomain)
http://app.example.com   ← different origin (different scheme)
https://app.example.com:8080  ← different origin (different port)
```

## Simple vs Preflighted Requests

**Simple requests** (no preflight): GET/POST/HEAD with only `Content-Type: application/x-www-form-urlencoded|multipart/form-data|text/plain`

**Preflighted requests**: Everything else — JSON body, custom headers, DELETE/PUT → browser sends OPTIONS first.

```bash
# Preflight example
OPTIONS /api/data HTTP/1.1
Origin: https://app.example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization
```

## CORS Response Headers

| Header | Example | Purpose |
|--------|---------|---------|
| `Access-Control-Allow-Origin` | `https://app.example.com` | Which origins allowed |
| `Access-Control-Allow-Methods` | `GET, POST, PUT` | Which methods allowed |
| `Access-Control-Allow-Headers` | `Content-Type, Authorization` | Which headers allowed |
| `Access-Control-Allow-Credentials` | `true` | Allow cookies/auth |
| `Access-Control-Max-Age` | `86400` | Preflight cache (seconds) |

## Node.js/Express — cors package

```javascript
const cors = require('cors');

// Allow specific origin
app.use(cors({ origin: 'https://app.example.com' }));

// Dynamic origin validation
app.use(cors({
  origin: (origin, callback) => {
    const allowed = ['https://app.example.com', 'https://www.example.com'];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

## Next.js App Router

```typescript
// app/api/data/route.ts
import { NextResponse } from 'next/server';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://app.example.com',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function GET() {
  return NextResponse.json({ data: 'ok' }, {
    headers: { 'Access-Control-Allow-Origin': 'https://app.example.com' }
  });
}
```

## Nginx CORS

```nginx
map $http_origin $cors_origin {
  default "";
  "https://app.example.com" $http_origin;
  "https://www.example.com" $http_origin;
}

server {
  location /api/ {
    add_header 'Access-Control-Allow-Origin' $cors_origin always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
    
    if ($request_method = OPTIONS) {
      add_header 'Access-Control-Max-Age' 86400;
      return 204;
    }
    
    proxy_pass http://backend;
  }
}
```

## Python FastAPI

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://app.example.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Credentials and Cookies

```javascript
// ❌ WRONG: credentials with wildcard
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Credentials: true  ← INVALID!

// ✅ CORRECT: specific origin required
// Access-Control-Allow-Origin: https://app.example.com
// Access-Control-Allow-Credentials: true

// Client must also set credentials
fetch('/api/data', { credentials: 'include' });
// or axios:
axios.get('/api/data', { withCredentials: true });
```

## Security: Never Use Wildcard for APIs

```
❌ Access-Control-Allow-Origin: *  ← dangerous for authenticated APIs
✅ Access-Control-Allow-Origin: https://app.example.com  ← specific origin
✅ Vary: Origin  ← tell caches about origin variation
❌ Reflecting arbitrary Origin back  ← allows any origin attack!
```

## Quick Tool

Use **[DevToolBox CORS Tester](https://viadreams.cc/en/tools/cors-tester)** — test CORS headers and diagnose cross-origin issues instantly online.

---

*Test CORS configurations with [DevToolBox's free CORS Tester](https://viadreams.cc/en/tools/cors-tester).*
