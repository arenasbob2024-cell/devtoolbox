'use client';

import Link from 'next/link';

export default function CurlCommandGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Is curl?</h2>
      <p>
        <strong>curl</strong> (Client URL) is a command-line tool for transferring data with URLs. It supports HTTP, HTTPS, FTP, SFTP, and many other protocols. curl is pre-installed on macOS, most Linux distributions, and Windows 10+, making it the universal tool for testing APIs, downloading files, and debugging network requests.
      </p>
      <p>
        Whether you are testing a REST API, downloading files, debugging authentication issues, or automating HTTP requests in scripts, curl is the tool you reach for first. This comprehensive guide covers everything from basic GET requests to advanced features like authentication, file uploads, cookies, and converting curl commands to code.
      </p>
      <p>
        <Link href={`/${lang}/tools/curl-converter`} style={{ fontWeight: 600 }}>Convert curl commands to JavaScript, Python, Go, and more with our free tool.</Link>
      </p>

      <h2>Basic curl Syntax</h2>
      <p>
        The basic curl syntax is simple: <code>curl [options] URL</code>. By default, curl makes a GET request and prints the response body to stdout.
      </p>
      <pre><code className="language-bash">{`# Basic GET request
curl https://api.example.com/users

# Save output to a file
curl -o output.json https://api.example.com/users

# Follow redirects (3xx)
curl -L https://example.com/old-page

# Show response headers along with body
curl -i https://api.example.com/users

# Show only response headers
curl -I https://api.example.com/users

# Silent mode (no progress bar)
curl -s https://api.example.com/users

# Verbose output (for debugging)
curl -v https://api.example.com/users`}</code></pre>

      <h2>HTTP Methods: GET, POST, PUT, PATCH, DELETE</h2>
      <p>
        curl supports all HTTP methods. Use the <code>-X</code> flag to specify the method (though POST can be inferred from <code>-d</code>).
      </p>

      <h3>GET Request</h3>
      <pre><code className="language-bash">{`# Simple GET
curl https://api.example.com/users

# GET with query parameters
curl "https://api.example.com/users?page=2&limit=10"

# GET with custom headers
curl -H "Accept: application/json" \\
     -H "X-API-Key: your-api-key" \\
     https://api.example.com/users`}</code></pre>

      <h3>POST Request</h3>
      <pre><code className="language-bash">{`# POST with JSON body
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Alice", "email": "alice@example.com"}'

# POST with form data (application/x-www-form-urlencoded)
curl -X POST https://api.example.com/login \\
  -d "username=alice&password=secret123"

# POST with data from a file
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d @user.json

# POST with multipart form data (file upload)
curl -X POST https://api.example.com/upload \\
  -F "file=@photo.jpg" \\
  -F "description=Profile photo"`}</code></pre>

      <h3>PUT and PATCH Requests</h3>
      <pre><code className="language-bash">{`# PUT - replace entire resource
curl -X PUT https://api.example.com/users/123 \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Alice Updated", "email": "alice-new@example.com"}'

# PATCH - partial update
curl -X PATCH https://api.example.com/users/123 \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Alice Updated"}'`}</code></pre>

      <h3>DELETE Request</h3>
      <pre><code className="language-bash">{`# DELETE
curl -X DELETE https://api.example.com/users/123

# DELETE with authentication
curl -X DELETE https://api.example.com/users/123 \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."`}</code></pre>

      <h2>Request Headers</h2>
      <p>
        Headers are essential for API communication. Use <code>-H</code> to add custom headers:
      </p>
      <pre><code className="language-bash">{`# Single header
curl -H "Content-Type: application/json" https://api.example.com/data

# Multiple headers
curl -H "Content-Type: application/json" \\
     -H "Authorization: Bearer your-token" \\
     -H "Accept: application/json" \\
     -H "X-Request-ID: abc-123" \\
     https://api.example.com/data

# Common headers reference:
# Content-Type: application/json          (sending JSON)
# Content-Type: multipart/form-data       (file upload)
# Accept: application/json                (expect JSON response)
# Authorization: Bearer <token>           (JWT auth)
# Authorization: Basic <base64>           (Basic auth)
# X-API-Key: <key>                        (API key auth)
# User-Agent: MyApp/1.0                   (custom user agent)
# Cache-Control: no-cache                 (bypass cache)`}</code></pre>

      <h2>Authentication Methods</h2>
      <p>
        curl supports all common authentication methods:
      </p>
      <pre><code className="language-bash">{`# ========== Basic Authentication ==========
# Using -u flag (curl encodes to Base64 automatically)
curl -u username:password https://api.example.com/data

# Equivalent manual header
curl -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" \\
     https://api.example.com/data

# ========== Bearer Token (JWT) ==========
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \\
     https://api.example.com/data

# ========== API Key ==========
# In header
curl -H "X-API-Key: your-api-key-here" \\
     https://api.example.com/data

# In query parameter
curl "https://api.example.com/data?api_key=your-api-key-here"

# ========== OAuth 2.0 Token Request ==========
curl -X POST https://auth.example.com/oauth/token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=client_credentials" \\
  -d "client_id=your-client-id" \\
  -d "client_secret=your-client-secret"

# ========== Digest Authentication ==========
curl --digest -u username:password https://api.example.com/data`}</code></pre>

      <h2>File Upload and Download</h2>
      <pre><code className="language-bash">{`# ========== File Upload ==========

# Single file upload
curl -X POST https://api.example.com/upload \\
  -F "file=@/path/to/document.pdf"

# Multiple file upload
curl -X POST https://api.example.com/upload \\
  -F "files=@photo1.jpg" \\
  -F "files=@photo2.jpg" \\
  -F "description=Vacation photos"

# Upload with specific content type
curl -X POST https://api.example.com/upload \\
  -F "file=@data.csv;type=text/csv"

# Upload raw binary data
curl -X POST https://api.example.com/upload \\
  -H "Content-Type: application/octet-stream" \\
  --data-binary @image.png

# ========== File Download ==========

# Save with specific filename
curl -o myfile.zip https://example.com/download/file.zip

# Save with server-provided filename
curl -O https://example.com/download/file.zip

# Download with progress bar
curl -# -O https://example.com/large-file.tar.gz

# Resume interrupted download
curl -C - -O https://example.com/large-file.tar.gz

# Download multiple files
curl -O https://example.com/file1.zip -O https://example.com/file2.zip`}</code></pre>

      <h2>Working with Cookies</h2>
      <pre><code className="language-bash">{`# Send cookies with request
curl -b "session=abc123; theme=dark" https://example.com/dashboard

# Save cookies from response to a file
curl -c cookies.txt https://example.com/login \\
  -d "username=alice&password=secret"

# Load cookies from file in subsequent request
curl -b cookies.txt https://example.com/dashboard

# Full session flow: login then access protected page
curl -c cookies.txt -X POST https://example.com/login \\
  -d "username=alice&password=secret"

curl -b cookies.txt https://example.com/api/profile`}</code></pre>

      <h2>SSL/TLS Options</h2>
      <pre><code className="language-bash">{`# Skip SSL certificate verification (development only!)
curl -k https://self-signed.example.com/api

# Specify CA certificate
curl --cacert /path/to/ca-cert.pem https://api.example.com

# Client certificate authentication (mTLS)
curl --cert client-cert.pem \\
     --key client-key.pem \\
     https://api.example.com

# Show SSL certificate details
curl -vI https://example.com 2>&1 | grep -A 20 "Server certificate"

# Force specific TLS version
curl --tlsv1.3 https://api.example.com`}</code></pre>

      <h2>Debugging with curl -v</h2>
      <p>
        The <code>-v</code> (verbose) flag is essential for debugging HTTP requests. It shows the complete request/response including headers, TLS handshake, and connection details.
      </p>
      <pre><code className="language-bash">{`# Verbose output shows everything
curl -v https://api.example.com/users

# Output explanation:
# *  = connection info (DNS, TLS handshake)
# >  = request sent to server (method, headers)
# <  = response from server (status, headers)
# {} = data transferred

# Example verbose output:
# *   Trying 93.184.216.34:443...
# * Connected to api.example.com (93.184.216.34) port 443
# * TLS handshake complete
# > GET /users HTTP/2
# > Host: api.example.com
# > User-Agent: curl/8.4.0
# > Accept: */*
# >
# < HTTP/2 200
# < content-type: application/json
# < content-length: 1234
# <
# [response body]

# Write debug output to file (keep stdout clean)
curl -v https://api.example.com/users 2>debug.log

# Even more detail with --trace
curl --trace trace.log https://api.example.com/users

# Timing information
curl -w "\\nDNS: %{time_namelookup}s\\nConnect: %{time_connect}s\\nTLS: %{time_appconnect}s\\nTotal: %{time_total}s\\nHTTP Code: %{http_code}\\n" \\
  -s -o /dev/null https://api.example.com`}</code></pre>

      <h2>Timeout and Retry Options</h2>
      <pre><code className="language-bash">{`# Connection timeout (seconds)
curl --connect-timeout 5 https://api.example.com

# Maximum time for entire operation
curl --max-time 30 https://api.example.com

# Retry on failure
curl --retry 3 \\
     --retry-delay 2 \\
     --retry-max-time 60 \\
     https://api.example.com/data

# Retry on specific HTTP codes
curl --retry 3 \\
     --retry-all-errors \\
     https://api.example.com/data`}</code></pre>

      <h2>Useful curl One-Liners</h2>
      <pre><code className="language-bash">{`# Check if a URL is reachable
curl -Is https://example.com | head -1

# Get your public IP address
curl ifconfig.me
curl ipinfo.io/ip

# Check HTTP response code only
curl -o /dev/null -s -w "%{http_code}\\n" https://example.com

# Pretty-print JSON response (with jq)
curl -s https://api.example.com/users | jq .

# Test API latency
curl -s -o /dev/null -w "Total: %{time_total}s\\n" https://api.example.com

# Download and extract in one step
curl -sL https://example.com/archive.tar.gz | tar xz

# POST JSON and pretty-print response
curl -s -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "test"}' | jq .

# Parallel requests with xargs
echo "url1 url2 url3" | tr ' ' '\\n' | xargs -P 3 -I {} curl -s {}

# Send webhook
curl -X POST https://hooks.slack.com/services/xxx \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Deployment complete!"}'`}</code></pre>

      <h2>Converting curl to Code</h2>
      <p>
        After testing an API with curl, you often need to convert the command to your programming language. Here are equivalent examples:
      </p>

      <h3>curl to JavaScript (fetch)</h3>
      <pre><code className="language-javascript">{`// curl command:
// curl -X POST https://api.example.com/users \\
//   -H "Content-Type: application/json" \\
//   -H "Authorization: Bearer token123" \\
//   -d '{"name": "Alice", "email": "alice@example.com"}'

// JavaScript fetch equivalent:
const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123',
  },
  body: JSON.stringify({
    name: 'Alice',
    email: 'alice@example.com',
  }),
});
const data = await response.json();`}</code></pre>

      <h3>curl to Python (requests)</h3>
      <pre><code className="language-python">{`# curl command:
# curl -X POST https://api.example.com/users \\
#   -H "Content-Type: application/json" \\
#   -H "Authorization: Bearer token123" \\
#   -d '{"name": "Alice", "email": "alice@example.com"}'

# Python requests equivalent:
import requests

response = requests.post(
    'https://api.example.com/users',
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123',
    },
    json={
        'name': 'Alice',
        'email': 'alice@example.com',
    },
)
data = response.json()`}</code></pre>

      <h3>curl to Go</h3>
      <pre><code className="language-go">{`// curl command:
// curl -X POST https://api.example.com/users \\
//   -H "Content-Type: application/json" \\
//   -d '{"name": "Alice"}'

package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

func main() {
    body := map[string]string{"name": "Alice"}
    jsonBody, _ := json.Marshal(body)

    req, _ := http.NewRequest("POST",
        "https://api.example.com/users",
        bytes.NewBuffer(jsonBody))

    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Authorization", "Bearer token123")

    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
}`}</code></pre>

      <h2>curl Options Quick Reference</h2>
      <pre><code className="language-text">{`curl Options Cheat Sheet:

Request Control:
  -X METHOD          Set HTTP method (GET, POST, PUT, DELETE, PATCH)
  -d DATA            Send data in request body (implies POST)
  -F KEY=VALUE       Multipart form data / file upload
  -H "Key: Value"    Add request header
  -b "cookies"       Send cookies
  -c FILE            Save response cookies to file

Output Control:
  -o FILE            Write output to file
  -O                 Save with original filename
  -s                 Silent mode (no progress)
  -S                 Show errors in silent mode
  -v                 Verbose (show full request/response)
  -i                 Include response headers in output
  -I                 Show response headers only (HEAD request)
  -w FORMAT          Custom output format

Authentication:
  -u USER:PASS       HTTP Basic authentication
  --digest           Use digest authentication
  -E CERT            Client SSL certificate

Connection:
  -L                 Follow redirects
  -k                 Skip SSL verification (insecure!)
  --connect-timeout  Connection timeout (seconds)
  --max-time         Maximum operation time (seconds)
  --retry N          Retry N times on failure
  -x PROXY           Use HTTP proxy
  --http2            Force HTTP/2

Data:
  -d @file           Send file contents as body
  --data-binary @f   Send binary data
  --data-urlencode   URL-encode the data
  -T FILE            Upload file via PUT
  -C -               Resume interrupted transfer`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>What is the difference between curl and wget?</h3>
      <p>
        curl and wget are both command-line download tools, but they serve different purposes. curl supports more protocols (not just HTTP), can send data (POST, PUT, etc.), and writes to stdout by default. wget is focused on downloading files, supports recursive downloads, and saves to files by default. For API testing, curl is the standard tool. For mirroring websites or downloading multiple files, wget is often more convenient.
      </p>

      <h3>How do I send a curl POST request with JSON?</h3>
      <p>
        Use: <code>curl -X POST URL -H &quot;Content-Type: application/json&quot; -d &apos;&#123;&quot;key&quot;: &quot;value&quot;&#125;&apos;</code>. The <code>-H</code> flag sets the Content-Type header, and <code>-d</code> provides the JSON body. You can also read the body from a file with <code>-d @file.json</code>.
      </p>

      <h3>How do I see the full request and response in curl?</h3>
      <p>
        Use the <code>-v</code> flag for verbose output. This shows the complete request (method, headers, body), the TLS handshake, and the full response (status code, headers, body). For even more detail, use <code>--trace filename</code> which shows raw bytes.
      </p>

      <h3>How do I handle authentication in curl?</h3>
      <p>
        For Basic auth: <code>curl -u username:password URL</code>. For Bearer token: <code>curl -H &quot;Authorization: Bearer TOKEN&quot; URL</code>. For API key: <code>curl -H &quot;X-API-Key: KEY&quot; URL</code>. curl also supports digest, NTLM, and client certificate authentication.
      </p>

      <h3>Can I use curl in scripts?</h3>
      <p>
        Yes, curl is designed for scripting. Use <code>-s</code> for silent mode, <code>-w</code> for custom output format (e.g., HTTP status code), <code>-o /dev/null</code> to suppress output, and <code>--fail</code> to return a non-zero exit code on HTTP errors. Combine with <code>jq</code> for JSON processing.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/curl-converter`}>curl Converter</Link> - Convert curl to JavaScript, Python, Go, and more</li>
        <li><Link href={`/${lang}/tools/curl-to-javascript`}>curl to JavaScript</Link> - Convert curl commands to fetch/axios</li>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format API response JSON data</li>
        <li><Link href={`/${lang}/blog/curl-command-cheat-sheet-examples`}>curl Cheat Sheet</Link> - Quick reference for curl commands</li>
        <li><Link href={`/${lang}/blog/curl-to-code-guide`}>curl to Code Guide</Link> - Convert curl to any programming language</li>
        <li><Link href={`/${lang}/blog/rest-api-best-practices-guide`}>REST API Best Practices</Link> - Design better APIs</li>
        <li><Link href={`/${lang}/blog/api-authentication-oauth-jwt-apikey`}>API Authentication Guide</Link> - OAuth, JWT, and API keys</li>
        <li><Link href={`/${lang}/blog/http-status-codes-reference`}>HTTP Status Codes</Link> - Complete HTTP status code reference</li>
      </ul>
    </>
  );
}
