'use client';
import Link from 'next/link';
import React from 'react';

const translations: Record<string, Record<string, string | string[]>> = {
  en: {
    title: 'cURL to Code Online Guide: Convert cURL Commands to JavaScript, Python, Go, PHP, Ruby & Rust',
    intro: 'cURL is the universal language of HTTP requests. Every API documentation you encounter, every Stack Overflow answer about HTTP calls, and every debugging session with a backend service eventually involves a cURL command. But cURL commands are meant for the terminal, not your application code. This comprehensive guide shows you how to convert cURL commands to production-ready code in JavaScript (fetch and axios), Python (requests and httpx), Go, PHP, Ruby, and Rust. You will learn every major cURL flag and its equivalent in each programming language, how to handle authentication patterns including Bearer tokens, Basic auth, and API keys, how to upload files with multipart/form-data, manage cookies and custom headers, and automate cURL conversion in your CI/CD pipeline. Whether you are integrating a third-party API, debugging a microservice, or building an API client library, mastering cURL-to-code conversion is an essential developer skill.',

    tldrTitle: 'TL;DR',
    tldr1: 'cURL is a command-line tool for HTTP requests. Converting cURL to code means mapping flags like -X, -H, -d, -u, and -F to your language HTTP client.',
    tldr2: 'JavaScript: Use fetch() for browser/Node.js 18+ or axios for richer features like interceptors and automatic JSON parsing.',
    tldr3: 'Python: The requests library provides the cleanest mapping from cURL. httpx adds async support and HTTP/2.',
    tldr4: 'Go, PHP, Ruby, Rust all have standard library HTTP clients. Each maps cURL flags differently but follows the same pattern.',
    tldr5: 'Always use environment variables for API keys and tokens. Never hardcode secrets in converted code.',
    tldr6: 'Use our free online cURL to Code converter to instantly generate production-ready code from any cURL command.',

    keyTitle: 'Key Takeaways',
    key1: 'cURL flags map predictably to HTTP client options: -X sets the method, -H sets headers, -d sets the body, -u sets Basic auth, -F sets multipart form data.',
    key2: 'fetch() is the modern standard for JavaScript HTTP requests, built into browsers and Node.js 18+. axios remains popular for its interceptors, automatic transforms, and cleaner error handling.',
    key3: 'Python requests is the gold standard for simplicity. httpx extends it with async/await and HTTP/2 support for high-performance applications.',
    key4: 'Go net/http is verbose but gives complete control. PHP has both the native curl extension and the modern Guzzle library. Ruby has Net::HTTP and Faraday. Rust uses reqwest.',
    key5: 'Authentication patterns (Bearer, Basic, API key) translate consistently across all languages. Always store credentials in environment variables.',
    key6: 'Multipart file uploads (-F flag) require FormData in JavaScript, files parameter in Python, multipart.Writer in Go, and CURLFile in PHP.',
    key7: 'Automated cURL conversion in CI/CD pipelines helps maintain API client libraries and integration tests across polyglot codebases.',

    whatTitle: '1. What Is cURL and Why Convert to Code?',
    whatP1: 'cURL (Client URL) is a command-line tool and library for transferring data with URLs. Created by Daniel Stenberg in 1998, it supports over 25 protocols including HTTP, HTTPS, FTP, SFTP, SMTP, and more. It is installed by default on macOS, most Linux distributions, and Windows 10+, making it the most universally available HTTP client in existence.',
    whatP2: 'API documentation almost always provides examples in cURL format because it is language-agnostic and universally understood. When you test an API endpoint in the terminal with cURL and confirm it works, the next step is translating that working command into your application programming language.',
    whatP3: 'Converting cURL to code involves mapping each cURL flag and option to the equivalent construct in your target language HTTP client library. The URL becomes the request target, -X becomes the method, -H entries become headers, -d becomes the request body, and authentication flags become auth configuration.',
    whatP4: 'This conversion process is mechanical but error-prone when done manually. Missing a header, misformatting the body, or incorrectly encoding authentication credentials can cause subtle bugs that are hard to diagnose. That is why automated conversion tools save significant development time.',
    whatCta: 'Try our free cURL to Code converter',

    flagsTitle: '2. cURL Flags Reference: The Complete Mapping',
    flagsDesc: 'Understanding cURL flags is the foundation of accurate conversion. Here is every commonly used flag, what it does, and how it maps to code.',
    flagX: '-X / --request: Sets the HTTP method (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS). If omitted, cURL defaults to GET. When -d is present without -X, cURL uses POST automatically. In code, this maps to the method parameter or option in every HTTP client.',
    flagH: '-H / --header: Adds a request header. Can be specified multiple times for multiple headers. Format: -H "Name: Value". In code, headers are typically collected into a key-value object or map. Common headers: Content-Type, Authorization, Accept, User-Agent.',
    flagD: '-d / --data: Sends request body data. Implies POST method if -X is not set. Sends as application/x-www-form-urlencoded by default. For JSON payloads, always pair with -H "Content-Type: application/json". In code, this maps to the body or data parameter.',
    flagDataRaw: '--data-raw: Same as -d but does not interpret @ as a file reference. Use this when your data literally starts with @. In most code conversions, -d and --data-raw are treated identically since HTTP clients do not have the @ file convention.',
    flagF: '-F / --form: Sends multipart/form-data. Used for file uploads and mixed content. Format: -F "field=value" or -F "file=@/path/to/file". In code, this maps to FormData (JavaScript), files parameter (Python), multipart.Writer (Go), or CURLFile (PHP).',
    flagU: '-u / --user: Sets Basic HTTP authentication. Format: -u username:password. cURL Base64-encodes the credentials and adds the Authorization: Basic header. In code, most libraries have a dedicated auth parameter that handles encoding automatically.',
    flagB: '-b / --cookie: Sends cookies with the request. Format: -b "name=value; name2=value2". In code, cookies are typically set via a Cookie header or a dedicated cookie jar. Some libraries like Python requests have a cookies parameter.',
    flagK: '-k / --insecure: Skips TLS certificate verification. Useful for testing against self-signed certificates but dangerous in production. In code, this maps to verify=False (Python), rejectUnauthorized: false (Node.js), or TLSClientConfig with InsecureSkipVerify (Go). Never use in production.',
    flagL: '-L / --location: Follows HTTP redirects (3xx responses). Most HTTP client libraries follow redirects by default, so this flag often requires no code equivalent. In Python requests, set allow_redirects=True (already the default). In Go, the default client follows redirects.',
    flagO: '-o / --output: Saves the response body to a file. In code, this means writing the response body to a file using fs.writeFile (Node.js), open().write() (Python), os.Create (Go), or file_put_contents (PHP).',
    flagV: '-v / --verbose: Shows detailed request and response information including headers. In code, enable logging or use request/response interceptors for equivalent debugging output.',
    flagConnect: '--connect-timeout: Maximum time to wait for the connection to be established. In code, set connection timeout via the HTTP client configuration. Always set timeouts to avoid hanging requests.',
    flagMaxTime: '--max-time / -m: Maximum total time for the operation including transfer. Maps to total request timeout in code. Combined with --connect-timeout, this gives you fine-grained timeout control.',
    flagCompressed: '--compressed: Requests compressed response (gzip, deflate, br) and automatically decompresses. Most modern HTTP clients handle compression automatically, but you may need to set Accept-Encoding headers explicitly in some cases.',

    jsTitle: '3. Converting cURL to JavaScript (fetch & axios)',
    jsFetchSubtitle: 'Using the fetch API',
    jsFetchP1: 'The fetch API is the modern standard for making HTTP requests in JavaScript. It is built into all modern browsers, Node.js 18+, Deno, and Bun. fetch is Promise-based and provides a clean, low-level interface for HTTP requests.',
    jsFetchGetExample: 'A simple GET request with headers. cURL: curl -H "Authorization: Bearer TOKEN" -H "Accept: application/json" https://api.example.com/users',
    jsFetchGetCode: 'const response = await fetch("https://api.example.com/users", {\n  headers: {\n    "Authorization": "Bearer " + process.env.API_TOKEN,\n    "Accept": "application/json"\n  }\n});\nconst data = await response.json();',
    jsFetchPostExample: 'A POST request with JSON body. cURL: curl -X POST -H "Content-Type: application/json" -d \'{"name":"John","email":"john@example.com"}\' https://api.example.com/users',
    jsFetchPostCode: 'const response = await fetch("https://api.example.com/users", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json"\n  },\n  body: JSON.stringify({\n    name: "John",\n    email: "john@example.com"\n  })\n});\nconst data = await response.json();',
    jsFetchUploadExample: 'A file upload with multipart/form-data. cURL: curl -F "file=@photo.jpg" -F "description=Profile photo" https://api.example.com/upload',
    jsFetchUploadCode: 'const formData = new FormData();\nformData.append("file", fileBlob, "photo.jpg");\nformData.append("description", "Profile photo");\n\nconst response = await fetch("https://api.example.com/upload", {\n  method: "POST",\n  body: formData\n  // Note: Do NOT set Content-Type header manually.\n  // fetch sets it automatically with the correct boundary.\n});',
    jsFetchBasicAuthCode: '// Basic auth: curl -u user:password https://api.example.com/data\nconst credentials = btoa("user:password");\nconst response = await fetch("https://api.example.com/data", {\n  headers: {\n    "Authorization": "Basic " + credentials\n  }\n});',

    jsAxiosSubtitle: 'Using axios',
    jsAxiosP1: 'axios is a popular HTTP client library that works in both browsers and Node.js. It provides automatic JSON parsing, request/response interceptors, request cancellation, and a cleaner API for common patterns. Install with npm install axios.',
    jsAxiosGetCode: '// GET with auth header\nconst { data } = await axios.get("https://api.example.com/users", {\n  headers: {\n    "Authorization": "Bearer " + process.env.API_TOKEN\n  }\n});',
    jsAxiosPostCode: '// POST with JSON body\nconst { data } = await axios.post("https://api.example.com/users", {\n  name: "John",\n  email: "john@example.com"\n});\n// axios automatically sets Content-Type: application/json\n// and serializes the object to JSON',
    jsAxiosUploadCode: '// File upload with FormData\nconst formData = new FormData();\nformData.append("file", fs.createReadStream("photo.jpg"));\nformData.append("description", "Profile photo");\n\nconst { data } = await axios.post("https://api.example.com/upload", formData, {\n  headers: formData.getHeaders()\n});',
    jsAxiosBasicAuthCode: '// Basic auth with axios built-in support\nconst { data } = await axios.get("https://api.example.com/data", {\n  auth: {\n    username: "user",\n    password: "password"\n  }\n});',

    pyTitle: '4. Converting cURL to Python (requests & httpx)',
    pyRequestsSubtitle: 'Using the requests library',
    pyRequestsP1: 'Python requests is the most popular HTTP client in the Python ecosystem. Its API maps almost perfectly to cURL flags, making conversion straightforward. Install with pip install requests.',
    pyGetCode: '# GET with auth header\n# curl -H "Authorization: Bearer TOKEN" https://api.example.com/users\nimport requests\nimport os\n\nresponse = requests.get(\n    "https://api.example.com/users",\n    headers={"Authorization": f"Bearer {os.environ[\'API_TOKEN\']}"},\n)\ndata = response.json()',
    pyPostCode: '# POST with JSON body\n# curl -X POST -H "Content-Type: application/json" \\\n#   -d \'{"name":"John"}\' https://api.example.com/users\nresponse = requests.post(\n    "https://api.example.com/users",\n    json={"name": "John", "email": "john@example.com"},\n)\ndata = response.json()',
    pyUploadCode: '# File upload (multipart/form-data)\n# curl -F "file=@photo.jpg" -F "desc=Profile" https://api.example.com/upload\nwith open("photo.jpg", "rb") as f:\n    response = requests.post(\n        "https://api.example.com/upload",\n        files={"file": ("photo.jpg", f, "image/jpeg")},\n        data={"desc": "Profile"},\n    )',
    pyBasicAuthCode: '# Basic auth\n# curl -u user:password https://api.example.com/data\nresponse = requests.get(\n    "https://api.example.com/data",\n    auth=("user", "password"),\n)',
    pyCookiesCode: '# Cookies\n# curl -b "session=abc123; theme=dark" https://api.example.com/me\nresponse = requests.get(\n    "https://api.example.com/me",\n    cookies={"session": "abc123", "theme": "dark"},\n)',

    pyHttpxSubtitle: 'Using httpx (async + HTTP/2)',
    pyHttpxP1: 'httpx is a next-generation Python HTTP client that supports async/await and HTTP/2. Its API is nearly identical to requests, making migration simple. Install with pip install httpx.',
    pyHttpxCode: 'import httpx\n\n# Synchronous (drop-in replacement for requests)\nresponse = httpx.get("https://api.example.com/users",\n    headers={"Authorization": "Bearer TOKEN"})\n\n# Asynchronous\nasync with httpx.AsyncClient() as client:\n    response = await client.get("https://api.example.com/users",\n        headers={"Authorization": "Bearer TOKEN"})\n    data = response.json()\n\n# HTTP/2 support\nclient = httpx.Client(http2=True)\nresponse = client.get("https://api.example.com/users")',

    goTitle: '5. Converting cURL to Go',
    goP1: 'Go standard library net/http package provides a complete HTTP client. Go code is more verbose than Python or JavaScript, but gives you full control over the request lifecycle including timeouts, connection pooling, and TLS configuration.',
    goGetCode: '// GET with auth header\n// curl -H "Authorization: Bearer TOKEN" https://api.example.com/users\npackage main\n\nimport (\n    "fmt"\n    "io"\n    "net/http"\n    "os"\n    "time"\n)\n\nfunc main() {\n    client := &http.Client{Timeout: 30 * time.Second}\n\n    req, err := http.NewRequest("GET", "https://api.example.com/users", nil)\n    if err != nil {\n        panic(err)\n    }\n    req.Header.Set("Authorization", "Bearer "+os.Getenv("API_TOKEN"))\n    req.Header.Set("Accept", "application/json")\n\n    resp, err := client.Do(req)\n    if err != nil {\n        panic(err)\n    }\n    defer resp.Body.Close()\n\n    body, _ := io.ReadAll(resp.Body)\n    fmt.Println(string(body))\n}',
    goPostCode: '// POST with JSON body\n// curl -X POST -H "Content-Type: application/json" \\\n//   -d \'{"name":"John"}\' https://api.example.com/users\npayload := strings.NewReader(`{"name":"John","email":"john@example.com"}`)\n\nreq, err := http.NewRequest("POST", "https://api.example.com/users", payload)\nif err != nil {\n    panic(err)\n}\nreq.Header.Set("Content-Type", "application/json")\n\nresp, err := client.Do(req)\nif err != nil {\n    panic(err)\n}\ndefer resp.Body.Close()',
    goUploadCode: '// File upload (multipart/form-data)\n// curl -F "file=@photo.jpg" https://api.example.com/upload\nvar buf bytes.Buffer\nwriter := multipart.NewWriter(&buf)\n\npart, err := writer.CreateFormFile("file", "photo.jpg")\nif err != nil {\n    panic(err)\n}\nfile, _ := os.Open("photo.jpg")\nio.Copy(part, file)\nwriter.Close()\n\nreq, _ := http.NewRequest("POST", "https://api.example.com/upload", &buf)\nreq.Header.Set("Content-Type", writer.FormDataContentType())\nresp, _ := client.Do(req)',
    goBasicAuthCode: '// Basic auth\n// curl -u user:password https://api.example.com/data\nreq, _ := http.NewRequest("GET", "https://api.example.com/data", nil)\nreq.SetBasicAuth("user", "password")\nresp, _ := client.Do(req)',

    phpTitle: '6. Converting cURL to PHP',
    phpP1: 'PHP has a built-in cURL extension (php-curl) that mirrors the command-line tool closely. For modern PHP projects, the Guzzle HTTP client provides a more developer-friendly API. Both approaches are shown below.',
    phpCurlCode: '// PHP cURL extension - GET with auth\n// curl -H "Authorization: Bearer TOKEN" https://api.example.com/users\n$ch = curl_init();\ncurl_setopt($ch, CURLOPT_URL, "https://api.example.com/users");\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, [\n    "Authorization: Bearer " . getenv("API_TOKEN"),\n    "Accept: application/json"\n]);\n$response = curl_exec($ch);\n$data = json_decode($response, true);\ncurl_close($ch);',
    phpPostCode: '// PHP cURL extension - POST with JSON\n$ch = curl_init();\ncurl_setopt($ch, CURLOPT_URL, "https://api.example.com/users");\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([\n    "name" => "John",\n    "email" => "john@example.com"\n]));\ncurl_setopt($ch, CURLOPT_HTTPHEADER, [\n    "Content-Type: application/json"\n]);\n$response = curl_exec($ch);\ncurl_close($ch);',
    phpGuzzleCode: '// Guzzle HTTP client (composer require guzzlehttp/guzzle)\nuse GuzzleHttp\\Client;\n\n$client = new Client(["base_uri" => "https://api.example.com"]);\n\n// GET with Bearer auth\n$response = $client->get("/users", [\n    "headers" => ["Authorization" => "Bearer " . getenv("API_TOKEN")]\n]);\n$data = json_decode($response->getBody(), true);\n\n// POST with JSON\n$response = $client->post("/users", [\n    "json" => ["name" => "John", "email" => "john@example.com"]\n]);\n\n// File upload\n$response = $client->post("/upload", [\n    "multipart" => [\n        ["name" => "file", "contents" => fopen("photo.jpg", "r"),\n         "filename" => "photo.jpg"],\n        ["name" => "description", "contents" => "Profile photo"]\n    ]\n]);',

    rubyTitle: '7. Converting cURL to Ruby',
    rubyP1: 'Ruby provides Net::HTTP in the standard library and Faraday as a popular third-party alternative. Net::HTTP is verbose but requires no additional dependencies. Faraday provides middleware support and a cleaner API.',
    rubyNetHttpCode: '# Ruby Net::HTTP - GET with auth\n# curl -H "Authorization: Bearer TOKEN" https://api.example.com/users\nrequire "net/http"\nrequire "json"\nrequire "uri"\n\nuri = URI("https://api.example.com/users")\nreq = Net::HTTP::Get.new(uri)\nreq["Authorization"] = "Bearer #{ENV[\'API_TOKEN\']}"\nreq["Accept"] = "application/json"\n\nhttp = Net::HTTP.new(uri.host, uri.port)\nhttp.use_ssl = true\nresponse = http.request(req)\ndata = JSON.parse(response.body)',
    rubyPostCode: '# Ruby Net::HTTP - POST with JSON\nuri = URI("https://api.example.com/users")\nreq = Net::HTTP::Post.new(uri)\nreq["Content-Type"] = "application/json"\nreq.body = { name: "John", email: "john@example.com" }.to_json\n\nhttp = Net::HTTP.new(uri.host, uri.port)\nhttp.use_ssl = true\nresponse = http.request(req)',
    rubyFaradayCode: '# Faraday (gem install faraday)\nrequire "faraday"\n\nconn = Faraday.new(url: "https://api.example.com") do |f|\n  f.request :json\n  f.response :json\nend\n\n# GET with auth\nresponse = conn.get("/users") do |req|\n  req.headers["Authorization"] = "Bearer #{ENV[\'API_TOKEN\']}"\nend\n\n# POST with JSON\nresponse = conn.post("/users", { name: "John", email: "john@example.com" })',

    rustTitle: '8. Converting cURL to Rust',
    rustP1: 'Rust uses the reqwest crate as the de facto HTTP client. It provides both blocking and async APIs, automatic JSON serialization with serde, and robust TLS support. Add to Cargo.toml: reqwest = { version = "0.12", features = ["json"] }.',
    rustGetCode: '// Rust reqwest - GET with auth\n// curl -H "Authorization: Bearer TOKEN" https://api.example.com/users\nuse reqwest;\nuse std::env;\n\n#[tokio::main]\nasync fn main() -> Result<(), reqwest::Error> {\n    let token = env::var("API_TOKEN").expect("API_TOKEN not set");\n\n    let client = reqwest::Client::new();\n    let response = client\n        .get("https://api.example.com/users")\n        .header("Authorization", format!("Bearer {}", token))\n        .header("Accept", "application/json")\n        .send()\n        .await?;\n\n    let data: serde_json::Value = response.json().await?;\n    println!("{:?}", data);\n    Ok(())\n}',
    rustPostCode: '// Rust reqwest - POST with JSON\nuse serde_json::json;\n\nlet response = client\n    .post("https://api.example.com/users")\n    .json(&json!({\n        "name": "John",\n        "email": "john@example.com"\n    }))\n    .send()\n    .await?;',
    rustUploadCode: '// Rust reqwest - File upload (multipart)\nlet file_bytes = std::fs::read("photo.jpg")?;\nlet part = reqwest::multipart::Part::bytes(file_bytes)\n    .file_name("photo.jpg")\n    .mime_str("image/jpeg")?;\n\nlet form = reqwest::multipart::Form::new()\n    .part("file", part)\n    .text("description", "Profile photo");\n\nlet response = client\n    .post("https://api.example.com/upload")\n    .multipart(form)\n    .send()\n    .await?;',

    authTitle: '9. Handling Authentication Patterns',
    authP1: 'Authentication is one of the most common aspects of cURL-to-code conversion. Here are the three major patterns and how they translate across languages.',
    authBearerTitle: 'Bearer Token (OAuth 2.0, JWT)',
    authBearerP: 'Bearer tokens are the most common authentication method for modern APIs. The cURL command uses -H "Authorization: Bearer TOKEN". In every language, this translates to setting the Authorization header with the value "Bearer " followed by the token string. Always load tokens from environment variables or a secure vault.',
    authBasicTitle: 'Basic Authentication',
    authBasicP: 'Basic auth sends username:password Base64-encoded in the Authorization header. cURL handles this with -u username:password. Most HTTP client libraries provide a dedicated auth parameter that handles encoding automatically: auth parameter in requests (Python), auth option in axios (JavaScript), SetBasicAuth method in Go, and CURLOPT_USERPWD in PHP cURL.',
    authApiKeyTitle: 'API Key Authentication',
    authApiKeyP: 'API keys can be sent as a header (X-API-Key: KEY), query parameter (?api_key=KEY), or in the request body. The cURL command varies: -H "X-API-Key: KEY" for header-based, or the key is appended to the URL for query parameter-based. In code, header-based keys are added to the headers object, while query parameter keys are appended to the URL or added to a params object.',

    multipartTitle: '10. Multipart/Form-Data and File Uploads',
    multipartP1: 'File uploads use the -F flag in cURL, which sends multipart/form-data. This is more complex to convert than simple JSON requests because each language constructs multipart bodies differently.',
    multipartP2: 'Key points for multipart conversion: Do not set the Content-Type header manually. The HTTP client must set it automatically to include the multipart boundary string. Mix file fields and text fields freely. The -F flag supports both -F "file=@path" for files and -F "field=value" for text. Multiple files can be uploaded with multiple -F flags.',
    multipartP3: 'In JavaScript, use the FormData API and append files and text fields. In Python, use the files parameter for file fields and data parameter for text fields. In Go, use multipart.Writer to construct the body. In PHP, use CURLFile for file fields.',

    cookiesTitle: '11. Converting Complex cURL with Cookies and Headers',
    cookiesP1: 'Real-world API calls often involve multiple headers, cookies, and complex request bodies. Here is how to handle these complex scenarios.',
    cookiesP2: 'When a cURL command has many -H flags, collect all headers into a single object or map in your target language. When -b sends cookies, either add them as a Cookie header or use the language dedicated cookie handling mechanism.',
    cookiesExample: 'A complex cURL command with multiple headers and cookies:',
    cookiesCode: 'curl -X PUT \\\n  -H "Authorization: Bearer TOKEN" \\\n  -H "Content-Type: application/json" \\\n  -H "X-Request-ID: req-123" \\\n  -H "Accept-Language: en-US" \\\n  -b "session=abc123; csrf=xyz789" \\\n  -d \'{"status":"active","role":"admin"}\' \\\n  https://api.example.com/users/42',
    cookiesPyCode: '# Python equivalent of the complex cURL above\nresponse = requests.put(\n    "https://api.example.com/users/42",\n    headers={\n        "Authorization": "Bearer TOKEN",\n        "Content-Type": "application/json",\n        "X-Request-ID": "req-123",\n        "Accept-Language": "en-US",\n    },\n    cookies={"session": "abc123", "csrf": "xyz789"},\n    json={"status": "active", "role": "admin"},\n)',
    cookiesJsCode: '// JavaScript fetch equivalent\nconst response = await fetch("https://api.example.com/users/42", {\n  method: "PUT",\n  headers: {\n    "Authorization": "Bearer TOKEN",\n    "Content-Type": "application/json",\n    "X-Request-ID": "req-123",\n    "Accept-Language": "en-US",\n    "Cookie": "session=abc123; csrf=xyz789"\n  },\n  body: JSON.stringify({ status: "active", role: "admin" })\n});',

    cicdTitle: '12. Automating cURL Conversion in CI/CD',
    cicdP1: 'In polyglot codebases and microservice architectures, maintaining API client code across multiple languages is a recurring challenge. Automating cURL conversion can streamline this process.',
    cicdP2: 'Approach 1: Store canonical cURL commands in a central API specification file (alongside OpenAPI/Swagger docs). Run a conversion script during CI to generate client code for each target language. This ensures all language clients stay in sync.',
    cicdP3: 'Approach 2: Use cURL commands as integration test definitions. Write your API tests as cURL commands, then convert them to language-specific test scripts. This gives you a single source of truth for API behavior that is easy to test from the command line.',
    cicdP4: 'Approach 3: Generate API client libraries from cURL examples in documentation. Parse API docs for cURL code blocks, convert to target languages, and package as reusable client libraries. This is especially useful for internal APIs where you control the documentation.',
    cicdShellCode: '#!/bin/bash\n# Example: Convert cURL to multiple languages in CI\n\nCURL_CMD=\'curl -X POST -H "Content-Type: application/json" \\\n  -d \'\'\'\'{"query": "test"}\'\'\'\' https://api.example.com/search\'\n\n# Generate code for each target language\nfor lang in javascript python go php ruby rust; do\n  echo "=== $lang ==="\n  convert_curl_to_code "$CURL_CMD" --language "$lang" \\\n    > "clients/$lang/api_client.generated"\ndone',

    vsTitle: '13. When to Use cURL vs Native HTTP Libraries',
    vsP1: 'While cURL is invaluable for testing and prototyping, there are situations where you should use native HTTP libraries directly instead of converting from cURL.',
    vsUseCurl: 'Use cURL when: Testing API endpoints quickly from the terminal. Sharing reproducible API examples in documentation. Debugging network issues with -v verbose output. Scripting simple one-off HTTP requests in bash. Demonstrating API usage in language-agnostic tutorials.',
    vsUseNative: 'Use native HTTP libraries when: Building production API clients with retry logic, circuit breakers, and connection pooling. Implementing complex authentication flows like OAuth 2.0 with token refresh. Handling streaming responses or WebSocket upgrades. Managing request middleware, interceptors, and transforms. Working with typed response objects and SDK-generated clients.',
    vsP2: 'The ideal workflow is: prototype with cURL, convert to code using an automated tool, then enhance the generated code with production patterns like error handling, retries, logging, and monitoring.',

    bestTitle: '14. Best Practices for Production cURL-to-Code Conversion',
    bestP1: 'Converting cURL to code is just the first step. Here are essential best practices for production-ready API client code.',
    best1: 'Never hardcode secrets: Replace -u credentials and -H "Authorization: Bearer ..." tokens with environment variables. Use a secrets manager (AWS Secrets Manager, HashiCorp Vault, Doppler) in production.',
    best2: 'Always set timeouts: cURL has --connect-timeout and --max-time. Set equivalent timeouts in your HTTP client to prevent hanging requests. A request without a timeout is a resource leak waiting to happen.',
    best3: 'Handle errors properly: Check HTTP status codes (4xx, 5xx) and implement retry logic with exponential backoff for transient failures (429 Too Many Requests, 503 Service Unavailable).',
    best4: 'Set Content-Type explicitly: cURL with -d defaults to application/x-www-form-urlencoded. Most APIs expect application/json. Always include the Content-Type header in your converted code.',
    best5: 'Use HTTPS in production: Never convert -k (insecure) to production code. Configure proper TLS certificates and certificate verification.',
    best6: 'Implement rate limiting: Respect Retry-After headers and implement client-side rate limiting to avoid being throttled or banned by the API.',
    best7: 'Log requests for debugging: Add structured logging for request URL, method, status code, and duration. This is the code equivalent of cURL verbose mode.',
    best8: 'Use connection pooling: For high-volume API calls, reuse HTTP client instances instead of creating new ones per request. Most libraries support persistent connections.',

    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'How do I convert a cURL command to JavaScript fetch?',
    faq1A: 'Map cURL flags to fetch options: -X POST becomes method: "POST", each -H becomes an entry in the headers object, -d becomes the body parameter (use JSON.stringify() for JSON), and -u user:pass becomes a Base64-encoded Authorization: Basic header using btoa(). Use our free online cURL to Code converter to automate this process instantly.',
    faq2Q: 'What is the difference between -d and -F in cURL?',
    faq2A: '-d (--data) sends data as application/x-www-form-urlencoded or raw text. It is used for JSON payloads when combined with -H "Content-Type: application/json". -F (--form) sends data as multipart/form-data, which is required for file uploads. In code, -d maps to setting the request body directly, while -F maps to FormData construction in JavaScript, files parameter in Python requests, or multipart.Writer in Go.',
    faq3Q: 'How do I handle Basic auth from cURL in Python?',
    faq3A: 'The cURL flag -u user:password maps directly to the auth parameter in Python requests: requests.get(url, auth=("user", "password")). The library handles Base64 encoding and the Authorization header automatically. For Bearer tokens, use headers={"Authorization": "Bearer TOKEN"}. For API keys, add them as a header: headers={"X-API-Key": "YOUR_KEY"}.',
    faq4Q: 'Can I convert cURL to multiple programming languages at once?',
    faq4A: 'Yes. Our free cURL to Code converter at DevToolBox parses any cURL command and generates equivalent code in JavaScript (fetch and axios), Python (requests), Go (net/http), PHP (cURL extension and Guzzle), Ruby (Net::HTTP), and Rust (reqwest). Paste your cURL command and select your target language to get production-ready code instantly.',
    faq5Q: 'How do I convert a cURL file upload command to code?',
    faq5A: 'cURL file uploads use -F "file=@filename.jpg". In JavaScript, create a FormData object and append the file. In Python, use requests.post(url, files={"file": open("filename.jpg", "rb")}). In Go, use multipart.NewWriter to construct the form body. In PHP, use new CURLFile("filename.jpg"). Each language handles the multipart boundary and Content-Type header automatically.',
    faq6Q: 'Why does my converted code return a different response than cURL?',
    faq6A: 'Common causes: Missing Content-Type header (cURL with -d defaults to application/x-www-form-urlencoded, but your API may expect application/json). Missing User-Agent header (some APIs block requests without one). Different redirect behavior (cURL with -L follows redirects, but some libraries do not by default). TLS issues (cURL may use different certificate stores). Always compare headers and body between cURL -v output and your code.',
    faq7Q: 'How do I handle cookies when converting cURL to code?',
    faq7A: 'The cURL flag -b sends cookies in the format -b "name=value; name2=value2". In Python requests, use the cookies parameter: requests.get(url, cookies={"name": "value"}). In JavaScript fetch, add a Cookie header: headers: {"Cookie": "name=value"}. In Go, create http.Cookie objects and add them to the request. For complex cookie management, use a cookie jar or session object.',
    faq8Q: 'Is it safe to paste cURL commands into online converters?',
    faq8A: 'Be cautious with cURL commands containing real API keys, tokens, or passwords. Our DevToolBox converter processes everything client-side in your browser, so your data never leaves your machine. However, always replace real credentials with placeholders before sharing cURL commands in documentation, bug reports, or online tools that may process server-side.',

    conclusionTitle: 'Conclusion',
    conclusionP: 'Converting cURL to code is a fundamental skill for every developer who works with APIs. By understanding how cURL flags map to HTTP client options in JavaScript, Python, Go, PHP, Ruby, and Rust, you can quickly translate any API example into production-ready code. Use our free online cURL to Code converter to automate the conversion, and follow the best practices in this guide to build robust, secure, and maintainable API client code.',
    conclusionCta: 'Convert cURL commands to any programming language with our free tool.',
  },
  zh: {
    title: 'cURL 转代码在线指南：将 cURL 命令转换为 JavaScript、Python、Go、PHP、Ruby 和 Rust',
    intro: 'cURL 是 HTTP 请求的通用语言。每份 API 文档、每个关于 HTTP 调用的 Stack Overflow 答案，以及每次后端服务调试最终都会涉及 cURL 命令。本综合指南展示如何将 cURL 命令转换为 JavaScript（fetch 和 axios）、Python（requests 和 httpx）、Go、PHP、Ruby 和 Rust 的生产级代码。您将学习每个主要 cURL 标志及其在各编程语言中的等价物，如何处理包括 Bearer 令牌、Basic 认证和 API 密钥在内的身份验证模式，如何使用 multipart/form-data 上传文件，管理 cookies 和自定义头部，以及在 CI/CD 管道中自动化 cURL 转换。',

    tldrTitle: 'TL;DR',
    tldr1: 'cURL 是 HTTP 请求的命令行工具。转换 cURL 到代码意味着将 -X、-H、-d、-u 和 -F 等标志映射到您的语言 HTTP 客户端。',
    tldr2: 'JavaScript：使用 fetch() 用于浏览器/Node.js 18+，或使用 axios 获得拦截器和自动 JSON 解析等更丰富的功能。',
    tldr3: 'Python：requests 库提供了从 cURL 最清晰的映射。httpx 添加了异步支持和 HTTP/2。',
    tldr4: 'Go、PHP、Ruby、Rust 都有标准库 HTTP 客户端。每种语言映射 cURL 标志的方式不同但遵循相同模式。',
    tldr5: 'API 密钥和令牌始终使用环境变量。绝不要在转换后的代码中硬编码密钥。',
    tldr6: '使用我们的免费在线 cURL 转代码转换器，从任何 cURL 命令即时生成生产级代码。',

    keyTitle: '关键要点',
    key1: 'cURL 标志可预测地映射到 HTTP 客户端选项：-X 设置方法，-H 设置头部，-d 设置请求体，-u 设置 Basic 认证，-F 设置多部分表单数据。',
    key2: 'fetch() 是 JavaScript HTTP 请求的现代标准。axios 因其拦截器、自动转换和更清晰的错误处理仍然很受欢迎。',
    key3: 'Python requests 是简单性的黄金标准。httpx 扩展了异步/await 和 HTTP/2 支持。',
    key4: 'Go net/http 冗长但提供完全控制。PHP 有原生 curl 扩展和 Guzzle。Ruby 有 Net::HTTP 和 Faraday。Rust 使用 reqwest。',
    key5: '认证模式（Bearer、Basic、API 密钥）在所有语言中一致转换。始终将凭据存储在环境变量中。',
    key6: '多部分文件上传（-F 标志）在 JavaScript 中需要 FormData，Python 中使用 files 参数，Go 中使用 multipart.Writer，PHP 中使用 CURLFile。',
    key7: 'CI/CD 管道中的自动 cURL 转换有助于跨多语言代码库维护 API 客户端库和集成测试。',

    whatTitle: '1. 什么是 cURL？为什么要转换为代码？',
    whatP1: 'cURL（Client URL）是使用 URL 传输数据的命令行工具和库。它支持 HTTP、HTTPS、FTP 等 25 种以上协议，默认安装在 macOS、大多数 Linux 发行版和 Windows 10+ 上。',
    whatP2: 'API 文档几乎总是以 cURL 格式提供示例，因为它与语言无关且被普遍理解。当您在终端中用 cURL 测试 API 端点并确认其工作后，下一步就是将该命令转换为您的应用程序编程语言。',
    whatP3: '将 cURL 转换为代码涉及将每个 cURL 标志和选项映射到目标语言 HTTP 客户端库中的等效构造。',
    whatP4: '这个转换过程虽然是机械性的，但手动操作时容易出错。遗漏头部、错误格式化请求体或不正确编码认证凭据会导致难以诊断的隐微错误。',
    whatCta: '试用我们的免费 cURL 转代码转换器',

    flagsTitle: '2. cURL 标志参考：完整映射',
    flagsDesc: '理解 cURL 标志是准确转换的基础。以下是每个常用标志、它的作用以及如何映射到代码。',
    flagX: '-X / --request：设置 HTTP 方法（GET、POST、PUT、PATCH、DELETE）。省略时默认为 GET。有 -d 且无 -X 时自动使用 POST。',
    flagH: '-H / --header：添加请求头。可多次指定。格式：-H "Name: Value"。在代码中，头部通常收集到键值对象或映射中。',
    flagD: '-d / --data：发送请求体数据。默认为 application/x-www-form-urlencoded。对于 JSON，始终配合 -H "Content-Type: application/json"。',
    flagDataRaw: '--data-raw：与 -d 相同但不将 @ 解释为文件引用。',
    flagF: '-F / --form：发送 multipart/form-data。用于文件上传。格式：-F "file=@/path/to/file"。',
    flagU: '-u / --user：设置 Basic HTTP 认证。格式：-u username:password。',
    flagB: '-b / --cookie：发送 cookies。格式：-b "name=value; name2=value2"。',
    flagK: '-k / --insecure：跳过 TLS 证书验证。生产环境中绝不使用。',
    flagL: '-L / --location：跟随 HTTP 重定向。大多数 HTTP 客户端库默认跟随重定向。',
    flagO: '-o / --output：将响应体保存到文件。',
    flagV: '-v / --verbose：显示详细的请求和响应信息。',
    flagConnect: '--connect-timeout：等待连接建立的最大时间。',
    flagMaxTime: '--max-time / -m：操作的最大总时间。',
    flagCompressed: '--compressed：请求压缩响应并自动解压。',

    jsTitle: '3. cURL 转 JavaScript（fetch 和 axios）',
    jsFetchSubtitle: '使用 fetch API',
    jsFetchP1: 'fetch API 是 JavaScript 中发起 HTTP 请求的现代标准，内置于所有现代浏览器、Node.js 18+、Deno 和 Bun。',
    jsFetchGetExample: '带头部的简单 GET 请求：',
    jsFetchGetCode: 'const response = await fetch("https://api.example.com/users", {\n  headers: {\n    "Authorization": "Bearer " + process.env.API_TOKEN,\n    "Accept": "application/json"\n  }\n});\nconst data = await response.json();',
    jsFetchPostExample: '带 JSON 请求体的 POST 请求：',
    jsFetchPostCode: 'const response = await fetch("https://api.example.com/users", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ name: "John", email: "john@example.com" })\n});\nconst data = await response.json();',
    jsFetchUploadExample: '使用 multipart/form-data 上传文件：',
    jsFetchUploadCode: 'const formData = new FormData();\nformData.append("file", fileBlob, "photo.jpg");\nformData.append("description", "Profile photo");\nconst response = await fetch("https://api.example.com/upload", {\n  method: "POST",\n  body: formData\n});',
    jsFetchBasicAuthCode: '// Basic 认证\nconst credentials = btoa("user:password");\nconst response = await fetch("https://api.example.com/data", {\n  headers: { "Authorization": "Basic " + credentials }\n});',
    jsAxiosSubtitle: '使用 axios',
    jsAxiosP1: 'axios 是流行的 HTTP 客户端库，提供自动 JSON 解析、请求/响应拦截器和请求取消功能。',
    jsAxiosGetCode: 'const { data } = await axios.get("https://api.example.com/users", {\n  headers: { "Authorization": "Bearer " + process.env.API_TOKEN }\n});',
    jsAxiosPostCode: 'const { data } = await axios.post("https://api.example.com/users", {\n  name: "John", email: "john@example.com"\n});',
    jsAxiosUploadCode: 'const formData = new FormData();\nformData.append("file", fs.createReadStream("photo.jpg"));\nconst { data } = await axios.post("https://api.example.com/upload", formData);',
    jsAxiosBasicAuthCode: 'const { data } = await axios.get("https://api.example.com/data", {\n  auth: { username: "user", password: "password" }\n});',

    pyTitle: '4. cURL 转 Python（requests 和 httpx）',
    pyRequestsSubtitle: '使用 requests 库',
    pyRequestsP1: 'Python requests 是 Python 生态系统中最流行的 HTTP 客户端，其 API 几乎完美映射 cURL 标志。',
    pyGetCode: 'import requests\nimport os\nresponse = requests.get("https://api.example.com/users",\n    headers={"Authorization": f"Bearer {os.environ[\'API_TOKEN\']}"})\ndata = response.json()',
    pyPostCode: 'response = requests.post("https://api.example.com/users",\n    json={"name": "John", "email": "john@example.com"})\ndata = response.json()',
    pyUploadCode: 'with open("photo.jpg", "rb") as f:\n    response = requests.post("https://api.example.com/upload",\n        files={"file": ("photo.jpg", f, "image/jpeg")},\n        data={"desc": "Profile"})',
    pyBasicAuthCode: 'response = requests.get("https://api.example.com/data",\n    auth=("user", "password"))',
    pyCookiesCode: 'response = requests.get("https://api.example.com/me",\n    cookies={"session": "abc123", "theme": "dark"})',
    pyHttpxSubtitle: '使用 httpx（异步 + HTTP/2）',
    pyHttpxP1: 'httpx 是下一代 Python HTTP 客户端，支持 async/await 和 HTTP/2。',
    pyHttpxCode: 'import httpx\n# 同步\nresponse = httpx.get("https://api.example.com/users",\n    headers={"Authorization": "Bearer TOKEN"})\n# 异步\nasync with httpx.AsyncClient() as client:\n    response = await client.get("https://api.example.com/users")',

    goTitle: '5. cURL 转 Go',
    goP1: 'Go 标准库 net/http 包提供完整的 HTTP 客户端。代码较冗长但提供对请求生命周期的完全控制。',
    goGetCode: '// GET with auth header\nclient := &http.Client{Timeout: 30 * time.Second}\nreq, _ := http.NewRequest("GET", "https://api.example.com/users", nil)\nreq.Header.Set("Authorization", "Bearer "+os.Getenv("API_TOKEN"))\nresp, _ := client.Do(req)',
    goPostCode: '// POST with JSON body\npayload := strings.NewReader(`{"name":"John"}`)\nreq, _ := http.NewRequest("POST", "https://api.example.com/users", payload)\nreq.Header.Set("Content-Type", "application/json")\nresp, _ := client.Do(req)',
    goUploadCode: '// File upload\nvar buf bytes.Buffer\nwriter := multipart.NewWriter(&buf)\npart, _ := writer.CreateFormFile("file", "photo.jpg")\nfile, _ := os.Open("photo.jpg")\nio.Copy(part, file)\nwriter.Close()\nreq, _ := http.NewRequest("POST", url, &buf)\nreq.Header.Set("Content-Type", writer.FormDataContentType())',
    goBasicAuthCode: '// Basic auth\nreq, _ := http.NewRequest("GET", "https://api.example.com/data", nil)\nreq.SetBasicAuth("user", "password")',

    phpTitle: '6. cURL 转 PHP',
    phpP1: 'PHP 内置 cURL 扩展，还有现代 Guzzle HTTP 客户端。',
    phpCurlCode: '$ch = curl_init();\ncurl_setopt($ch, CURLOPT_URL, "https://api.example.com/users");\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, [\n    "Authorization: Bearer " . getenv("API_TOKEN")\n]);\n$response = curl_exec($ch);\ncurl_close($ch);',
    phpPostCode: '$ch = curl_init();\ncurl_setopt($ch, CURLOPT_URL, "https://api.example.com/users");\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(["name" => "John"]));\ncurl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);\n$response = curl_exec($ch);',
    phpGuzzleCode: '// Guzzle\n$client = new Client(["base_uri" => "https://api.example.com"]);\n$response = $client->post("/users", [\n    "json" => ["name" => "John"]\n]);',

    rubyTitle: '7. cURL 转 Ruby',
    rubyP1: 'Ruby 标准库提供 Net::HTTP，Faraday 是流行的第三方替代品。',
    rubyNetHttpCode: 'require "net/http"\nuri = URI("https://api.example.com/users")\nreq = Net::HTTP::Get.new(uri)\nreq["Authorization"] = "Bearer #{ENV[\'API_TOKEN\']}"\nhttp = Net::HTTP.new(uri.host, uri.port)\nhttp.use_ssl = true\nresponse = http.request(req)',
    rubyPostCode: 'req = Net::HTTP::Post.new(uri)\nreq["Content-Type"] = "application/json"\nreq.body = { name: "John" }.to_json\nresponse = http.request(req)',
    rubyFaradayCode: 'conn = Faraday.new(url: "https://api.example.com") do |f|\n  f.request :json\n  f.response :json\nend\nresponse = conn.get("/users") { |r| r.headers["Authorization"] = "Bearer TOKEN" }',

    rustTitle: '8. cURL 转 Rust',
    rustP1: 'Rust 使用 reqwest crate 作为事实上的 HTTP 客户端，提供阻塞和异步 API。',
    rustGetCode: 'let client = reqwest::Client::new();\nlet response = client\n    .get("https://api.example.com/users")\n    .header("Authorization", format!("Bearer {}", token))\n    .send()\n    .await?;',
    rustPostCode: 'let response = client\n    .post("https://api.example.com/users")\n    .json(&json!({"name": "John"}))\n    .send()\n    .await?;',
    rustUploadCode: 'let form = reqwest::multipart::Form::new()\n    .part("file", part)\n    .text("description", "Profile photo");\nlet response = client.post(url).multipart(form).send().await?;',

    authTitle: '9. 处理身份验证模式',
    authP1: '身份验证是 cURL 转代码转换中最常见的方面之一。',
    authBearerTitle: 'Bearer 令牌（OAuth 2.0、JWT）',
    authBearerP: 'Bearer 令牌是现代 API 最常见的认证方法。在每种语言中都转换为设置 Authorization 头部。始终从环境变量加载令牌。',
    authBasicTitle: 'Basic 认证',
    authBasicP: 'Basic 认证将 username:password Base64 编码后放入 Authorization 头部。大多数 HTTP 客户端库提供专用的 auth 参数自动处理编码。',
    authApiKeyTitle: 'API 密钥认证',
    authApiKeyP: 'API 密钥可以通过头部、查询参数或请求体发送。',

    multipartTitle: '10. Multipart/Form-Data 和文件上传',
    multipartP1: '文件上传在 cURL 中使用 -F 标志，发送 multipart/form-data。每种语言构建多部分请求体的方式不同。',
    multipartP2: '关键点：不要手动设置 Content-Type 头部。HTTP 客户端必须自动设置以包含多部分边界字符串。',
    multipartP3: 'JavaScript 使用 FormData API，Python 使用 files 参数，Go 使用 multipart.Writer，PHP 使用 CURLFile。',

    cookiesTitle: '11. 转换包含 Cookies 和头部的复杂 cURL',
    cookiesP1: '实际的 API 调用通常涉及多个头部、cookies 和复杂的请求体。',
    cookiesP2: '当 cURL 命令有多个 -H 标志时，将所有头部收集到单个对象中。-b 发送的 cookies 可以添加为 Cookie 头部或使用语言专用的 cookie 处理机制。',
    cookiesExample: '包含多个头部和 cookies 的复杂 cURL 命令：',
    cookiesCode: 'curl -X PUT \\\n  -H "Authorization: Bearer TOKEN" \\\n  -H "Content-Type: application/json" \\\n  -H "X-Request-ID: req-123" \\\n  -b "session=abc123; csrf=xyz789" \\\n  -d \'{"status":"active"}\' \\\n  https://api.example.com/users/42',
    cookiesPyCode: 'response = requests.put(\n    "https://api.example.com/users/42",\n    headers={"Authorization": "Bearer TOKEN", "X-Request-ID": "req-123"},\n    cookies={"session": "abc123", "csrf": "xyz789"},\n    json={"status": "active", "role": "admin"})',
    cookiesJsCode: 'const response = await fetch("https://api.example.com/users/42", {\n  method: "PUT",\n  headers: {\n    "Authorization": "Bearer TOKEN",\n    "Content-Type": "application/json",\n    "Cookie": "session=abc123; csrf=xyz789"\n  },\n  body: JSON.stringify({ status: "active", role: "admin" })\n});',

    cicdTitle: '12. 在 CI/CD 中自动化 cURL 转换',
    cicdP1: '在多语言代码库和微服务架构中，跨多种语言维护 API 客户端代码是反复出现的挑战。',
    cicdP2: '方法一：将规范的 cURL 命令存储在中央 API 规范文件中。在 CI 期间运行转换脚本为每种目标语言生成客户端代码。',
    cicdP3: '方法二：使用 cURL 命令作为集成测试定义。将 API 测试编写为 cURL 命令，然后转换为特定语言的测试脚本。',
    cicdP4: '方法三：从文档中的 cURL 示例生成 API 客户端库。',
    cicdShellCode: '#!/bin/bash\n# 示例：在 CI 中将 cURL 转换为多种语言\nfor lang in javascript python go php ruby rust; do\n  convert_curl_to_code "$CURL_CMD" --language "$lang"\ndone',

    vsTitle: '13. 何时使用 cURL vs 原生 HTTP 库',
    vsP1: '虽然 cURL 对于测试和原型设计非常有价值，但有些情况下应该直接使用原生 HTTP 库。',
    vsUseCurl: '使用 cURL 的场景：从终端快速测试 API 端点。在文档中分享可复现的 API 示例。使用 -v 调试网络问题。',
    vsUseNative: '使用原生 HTTP 库的场景：构建包含重试逻辑、断路器和连接池的生产 API 客户端。实现复杂的 OAuth 2.0 流程。处理流式响应。',
    vsP2: '理想的工作流程是：用 cURL 原型设计，用自动化工具转换为代码，然后增强生成的代码以适应生产环境。',

    bestTitle: '14. 生产级 cURL 转代码最佳实践',
    bestP1: '将 cURL 转换为代码只是第一步。以下是生产级 API 客户端代码的基本最佳实践。',
    best1: '绝不硬编码密钥：使用环境变量替换 -u 凭据和 Authorization 令牌。',
    best2: '始终设置超时：防止请求挂起。',
    best3: '正确处理错误：检查 HTTP 状态码，实现指数退避重试。',
    best4: '显式设置 Content-Type：cURL -d 默认为 application/x-www-form-urlencoded。',
    best5: '生产环境使用 HTTPS：绝不将 -k 转换到生产代码中。',
    best6: '实现速率限制：尊重 Retry-After 头部。',
    best7: '添加请求日志：记录 URL、方法、状态码和持续时间。',
    best8: '使用连接池：重用 HTTP 客户端实例。',

    faqTitle: '常见问题',
    faq1Q: '如何将 cURL 命令转换为 JavaScript fetch？',
    faq1A: '将 cURL 标志映射到 fetch 选项：-X POST 变为 method: "POST"，-H 变为 headers 对象条目，-d 变为 body 参数（JSON 使用 JSON.stringify()），-u user:pass 变为 Base64 编码的 Authorization: Basic 头部。使用我们的免费在线工具可以自动完成转换。',
    faq2Q: 'cURL 中 -d 和 -F 有什么区别？',
    faq2A: '-d 发送 application/x-www-form-urlencoded 或原始文本数据，用于 JSON 请求。-F 发送 multipart/form-data，用于文件上传。',
    faq3Q: '如何在 Python 中处理 cURL 的 Basic 认证？',
    faq3A: 'cURL 的 -u user:password 直接映射到 Python requests 的 auth 参数：requests.get(url, auth=("user", "password"))。库自动处理 Base64 编码。',
    faq4Q: '能同时转换 cURL 到多种编程语言吗？',
    faq4A: '可以。我们的 DevToolBox cURL 转代码转换器支持 JavaScript、Python、Go、PHP、Ruby 和 Rust。粘贴您的 cURL 命令并选择目标语言即可。',
    faq5Q: '如何将 cURL 文件上传命令转换为代码？',
    faq5A: 'JavaScript 使用 FormData，Python 使用 files 参数，Go 使用 multipart.NewWriter，PHP 使用 CURLFile。每种语言自动处理多部分边界和 Content-Type 头部。',
    faq6Q: '为什么转换后的代码返回与 cURL 不同的响应？',
    faq6A: '常见原因：缺少 Content-Type 头部、缺少 User-Agent 头部、重定向行为不同、TLS 问题。请比较 cURL -v 输出和您代码的请求。',
    faq7Q: '转换 cURL 时如何处理 cookies？',
    faq7A: 'Python 使用 cookies 参数，JavaScript fetch 添加 Cookie 头部，Go 创建 http.Cookie 对象。对于复杂的 cookie 管理，使用 cookie jar 或 session 对象。',
    faq8Q: '将 cURL 命令粘贴到在线转换器安全吗？',
    faq8A: '对包含真实 API 密钥的 cURL 命令要谨慎。我们的 DevToolBox 转换器在浏览器端处理一切，数据不会离开您的机器。但分享前始终用占位符替换真实凭据。',

    conclusionTitle: '总结',
    conclusionP: '将 cURL 转换为代码是每个使用 API 的开发者的基本技能。通过理解 cURL 标志如何映射到各语言的 HTTP 客户端选项，您可以快速将任何 API 示例转换为生产级代码。',
    conclusionCta: '使用我们的免费工具将 cURL 命令转换为任何编程语言。',
  },
};

function g(t: Record<string, string | string[]>, key: string): string {
  return (t[key] as string) || '';
}

export default function CurlToCodeOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: g(t, 'faq1Q'), acceptedAnswer: { '@type': 'Answer', text: g(t, 'faq1A') } },
      { '@type': 'Question', name: g(t, 'faq2Q'), acceptedAnswer: { '@type': 'Answer', text: g(t, 'faq2A') } },
      { '@type': 'Question', name: g(t, 'faq3Q'), acceptedAnswer: { '@type': 'Answer', text: g(t, 'faq3A') } },
      { '@type': 'Question', name: g(t, 'faq4Q'), acceptedAnswer: { '@type': 'Answer', text: g(t, 'faq4A') } },
      { '@type': 'Question', name: g(t, 'faq5Q'), acceptedAnswer: { '@type': 'Answer', text: g(t, 'faq5A') } },
      { '@type': 'Question', name: g(t, 'faq6Q'), acceptedAnswer: { '@type': 'Answer', text: g(t, 'faq6A') } },
      { '@type': 'Question', name: g(t, 'faq7Q'), acceptedAnswer: { '@type': 'Answer', text: g(t, 'faq7A') } },
      { '@type': 'Question', name: g(t, 'faq8Q'), acceptedAnswer: { '@type': 'Answer', text: g(t, 'faq8A') } },
    ],
  };

  const sectionTitle: React.CSSProperties = { fontSize: 26, fontWeight: 700, marginTop: 48, marginBottom: 16, color: '#0f172a', lineHeight: 1.3 };
  const subTitle: React.CSSProperties = { fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12, color: '#1e293b' };
  const para: React.CSSProperties = { fontSize: 16, lineHeight: 1.8, color: '#334155', marginBottom: 16 };
  const codeBlock: React.CSSProperties = { background: '#1e293b', color: '#e2e8f0', padding: '16px 20px', borderRadius: 8, fontSize: 13, lineHeight: 1.6, overflowX: 'auto' as const, marginBottom: 20, fontFamily: 'Consolas, Monaco, "Courier New", monospace', whiteSpace: 'pre' as const, display: 'block' };
  const listItem: React.CSSProperties = { fontSize: 16, lineHeight: 1.8, color: '#334155', marginBottom: 10, paddingLeft: 8 };
  const ctaBox: React.CSSProperties = { display: 'block', background: '#2563eb', color: '#fff', textAlign: 'center' as const, padding: '14px 24px', borderRadius: 8, fontSize: 16, fontWeight: 600, textDecoration: 'none', marginTop: 20, marginBottom: 20 };
  const flagLabel: React.CSSProperties = { fontSize: 15, fontWeight: 600, color: '#1e293b', marginBottom: 4 };

  return (
    <article style={{ maxWidth: 820, margin: '0 auto' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Intro */}
      <p style={para} dangerouslySetInnerHTML={{ __html: g(t, 'intro') }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '20px 24px', marginBottom: 28 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0369a1', marginBottom: 12, marginTop: 0 }}>{g(t, 'tldrTitle')}</h2>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li style={listItem}>{g(t, 'tldr1')}</li>
          <li style={listItem}>{g(t, 'tldr2')}</li>
          <li style={listItem}>{g(t, 'tldr3')}</li>
          <li style={listItem}>{g(t, 'tldr4')}</li>
          <li style={listItem}>{g(t, 'tldr5')}</li>
          <li style={listItem}>{g(t, 'tldr6')}</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '20px 24px', marginBottom: 28 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginBottom: 12, marginTop: 0 }}>{g(t, 'keyTitle')}</h2>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li style={listItem}>{g(t, 'key1')}</li>
          <li style={listItem}>{g(t, 'key2')}</li>
          <li style={listItem}>{g(t, 'key3')}</li>
          <li style={listItem}>{g(t, 'key4')}</li>
          <li style={listItem}>{g(t, 'key5')}</li>
          <li style={listItem}>{g(t, 'key6')}</li>
          <li style={listItem}>{g(t, 'key7')}</li>
        </ul>
      </div>

      <Link href={`/${lang}/tools/curl-to-code`} style={ctaBox}>{g(t, 'whatCta')}</Link>

      {/* Section 1: What is cURL */}
      <h2 style={sectionTitle}>{g(t, 'whatTitle')}</h2>
      <p style={para}>{g(t, 'whatP1')}</p>
      <p style={para}>{g(t, 'whatP2')}</p>
      <p style={para}>{g(t, 'whatP3')}</p>
      <p style={para}>{g(t, 'whatP4')}</p>

      {/* Section 2: Flags Reference */}
      <h2 style={sectionTitle}>{g(t, 'flagsTitle')}</h2>
      <p style={para}>{g(t, 'flagsDesc')}</p>

      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <p style={{ ...flagLabel, marginTop: 0 }}>-X / --request</p>
        <p style={{ ...para, marginBottom: 16 }}>{g(t, 'flagX')}</p>
        <p style={flagLabel}>-H / --header</p>
        <p style={{ ...para, marginBottom: 16 }}>{g(t, 'flagH')}</p>
        <p style={flagLabel}>-d / --data</p>
        <p style={{ ...para, marginBottom: 16 }}>{g(t, 'flagD')}</p>
        <p style={flagLabel}>--data-raw</p>
        <p style={{ ...para, marginBottom: 16 }}>{g(t, 'flagDataRaw')}</p>
        <p style={flagLabel}>-F / --form</p>
        <p style={{ ...para, marginBottom: 16 }}>{g(t, 'flagF')}</p>
        <p style={flagLabel}>-u / --user</p>
        <p style={{ ...para, marginBottom: 16 }}>{g(t, 'flagU')}</p>
        <p style={flagLabel}>-b / --cookie</p>
        <p style={{ ...para, marginBottom: 16 }}>{g(t, 'flagB')}</p>
        <p style={flagLabel}>-k / --insecure</p>
        <p style={{ ...para, marginBottom: 16 }}>{g(t, 'flagK')}</p>
        <p style={flagLabel}>-L / --location</p>
        <p style={{ ...para, marginBottom: 16 }}>{g(t, 'flagL')}</p>
        <p style={flagLabel}>-o / --output</p>
        <p style={{ ...para, marginBottom: 16 }}>{g(t, 'flagO')}</p>
        <p style={flagLabel}>-v / --verbose</p>
        <p style={{ ...para, marginBottom: 16 }}>{g(t, 'flagV')}</p>
        <p style={flagLabel}>--connect-timeout</p>
        <p style={{ ...para, marginBottom: 16 }}>{g(t, 'flagConnect')}</p>
        <p style={flagLabel}>--max-time / -m</p>
        <p style={{ ...para, marginBottom: 16 }}>{g(t, 'flagMaxTime')}</p>
        <p style={flagLabel}>--compressed</p>
        <p style={{ ...para, marginBottom: 0 }}>{g(t, 'flagCompressed')}</p>
      </div>

      {/* Section 3: JavaScript */}
      <h2 style={sectionTitle}>{g(t, 'jsTitle')}</h2>

      <h3 style={subTitle}>{g(t, 'jsFetchSubtitle')}</h3>
      <p style={para}>{g(t, 'jsFetchP1')}</p>
      <p style={{ ...para, fontWeight: 600 }}>{g(t, 'jsFetchGetExample')}</p>
      <pre style={codeBlock}>{g(t, 'jsFetchGetCode')}</pre>
      <p style={{ ...para, fontWeight: 600 }}>{g(t, 'jsFetchPostExample')}</p>
      <pre style={codeBlock}>{g(t, 'jsFetchPostCode')}</pre>
      <p style={{ ...para, fontWeight: 600 }}>{g(t, 'jsFetchUploadExample')}</p>
      <pre style={codeBlock}>{g(t, 'jsFetchUploadCode')}</pre>
      <pre style={codeBlock}>{g(t, 'jsFetchBasicAuthCode')}</pre>

      <h3 style={subTitle}>{g(t, 'jsAxiosSubtitle')}</h3>
      <p style={para}>{g(t, 'jsAxiosP1')}</p>
      <pre style={codeBlock}>{g(t, 'jsAxiosGetCode')}</pre>
      <pre style={codeBlock}>{g(t, 'jsAxiosPostCode')}</pre>
      <pre style={codeBlock}>{g(t, 'jsAxiosUploadCode')}</pre>
      <pre style={codeBlock}>{g(t, 'jsAxiosBasicAuthCode')}</pre>

      {/* Section 4: Python */}
      <h2 style={sectionTitle}>{g(t, 'pyTitle')}</h2>

      <h3 style={subTitle}>{g(t, 'pyRequestsSubtitle')}</h3>
      <p style={para}>{g(t, 'pyRequestsP1')}</p>
      <pre style={codeBlock}>{g(t, 'pyGetCode')}</pre>
      <pre style={codeBlock}>{g(t, 'pyPostCode')}</pre>
      <pre style={codeBlock}>{g(t, 'pyUploadCode')}</pre>
      <pre style={codeBlock}>{g(t, 'pyBasicAuthCode')}</pre>
      <pre style={codeBlock}>{g(t, 'pyCookiesCode')}</pre>

      <h3 style={subTitle}>{g(t, 'pyHttpxSubtitle')}</h3>
      <p style={para}>{g(t, 'pyHttpxP1')}</p>
      <pre style={codeBlock}>{g(t, 'pyHttpxCode')}</pre>

      {/* Section 5: Go */}
      <h2 style={sectionTitle}>{g(t, 'goTitle')}</h2>
      <p style={para}>{g(t, 'goP1')}</p>
      <pre style={codeBlock}>{g(t, 'goGetCode')}</pre>
      <pre style={codeBlock}>{g(t, 'goPostCode')}</pre>
      <pre style={codeBlock}>{g(t, 'goUploadCode')}</pre>
      <pre style={codeBlock}>{g(t, 'goBasicAuthCode')}</pre>

      {/* Section 6: PHP */}
      <h2 style={sectionTitle}>{g(t, 'phpTitle')}</h2>
      <p style={para}>{g(t, 'phpP1')}</p>
      <pre style={codeBlock}>{g(t, 'phpCurlCode')}</pre>
      <pre style={codeBlock}>{g(t, 'phpPostCode')}</pre>
      <pre style={codeBlock}>{g(t, 'phpGuzzleCode')}</pre>

      {/* Section 7: Ruby */}
      <h2 style={sectionTitle}>{g(t, 'rubyTitle')}</h2>
      <p style={para}>{g(t, 'rubyP1')}</p>
      <pre style={codeBlock}>{g(t, 'rubyNetHttpCode')}</pre>
      <pre style={codeBlock}>{g(t, 'rubyPostCode')}</pre>
      <pre style={codeBlock}>{g(t, 'rubyFaradayCode')}</pre>

      {/* Section 8: Rust */}
      <h2 style={sectionTitle}>{g(t, 'rustTitle')}</h2>
      <p style={para}>{g(t, 'rustP1')}</p>
      <pre style={codeBlock}>{g(t, 'rustGetCode')}</pre>
      <pre style={codeBlock}>{g(t, 'rustPostCode')}</pre>
      <pre style={codeBlock}>{g(t, 'rustUploadCode')}</pre>

      {/* Section 9: Authentication */}
      <h2 style={sectionTitle}>{g(t, 'authTitle')}</h2>
      <p style={para}>{g(t, 'authP1')}</p>
      <h3 style={subTitle}>{g(t, 'authBearerTitle')}</h3>
      <p style={para}>{g(t, 'authBearerP')}</p>
      <h3 style={subTitle}>{g(t, 'authBasicTitle')}</h3>
      <p style={para}>{g(t, 'authBasicP')}</p>
      <h3 style={subTitle}>{g(t, 'authApiKeyTitle')}</h3>
      <p style={para}>{g(t, 'authApiKeyP')}</p>

      {/* Section 10: Multipart */}
      <h2 style={sectionTitle}>{g(t, 'multipartTitle')}</h2>
      <p style={para}>{g(t, 'multipartP1')}</p>
      <p style={para}>{g(t, 'multipartP2')}</p>
      <p style={para}>{g(t, 'multipartP3')}</p>

      {/* Section 11: Cookies & Headers */}
      <h2 style={sectionTitle}>{g(t, 'cookiesTitle')}</h2>
      <p style={para}>{g(t, 'cookiesP1')}</p>
      <p style={para}>{g(t, 'cookiesP2')}</p>
      <p style={{ ...para, fontWeight: 600 }}>{g(t, 'cookiesExample')}</p>
      <pre style={codeBlock}>{g(t, 'cookiesCode')}</pre>
      <pre style={codeBlock}>{g(t, 'cookiesPyCode')}</pre>
      <pre style={codeBlock}>{g(t, 'cookiesJsCode')}</pre>

      {/* Section 12: CI/CD */}
      <h2 style={sectionTitle}>{g(t, 'cicdTitle')}</h2>
      <p style={para}>{g(t, 'cicdP1')}</p>
      <p style={para}>{g(t, 'cicdP2')}</p>
      <p style={para}>{g(t, 'cicdP3')}</p>
      <p style={para}>{g(t, 'cicdP4')}</p>
      <pre style={codeBlock}>{g(t, 'cicdShellCode')}</pre>

      {/* Section 13: cURL vs Native */}
      <h2 style={sectionTitle}>{g(t, 'vsTitle')}</h2>
      <p style={para}>{g(t, 'vsP1')}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '16px 20px' }}>
          <p style={{ fontWeight: 700, color: '#166534', marginTop: 0, marginBottom: 8 }}>Use cURL</p>
          <p style={{ ...para, fontSize: 14, marginBottom: 0 }}>{g(t, 'vsUseCurl')}</p>
        </div>
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '16px 20px' }}>
          <p style={{ fontWeight: 700, color: '#1e40af', marginTop: 0, marginBottom: 8 }}>Use Native Libraries</p>
          <p style={{ ...para, fontSize: 14, marginBottom: 0 }}>{g(t, 'vsUseNative')}</p>
        </div>
      </div>
      <p style={para}>{g(t, 'vsP2')}</p>

      {/* Section 14: Best Practices */}
      <h2 style={sectionTitle}>{g(t, 'bestTitle')}</h2>
      <p style={para}>{g(t, 'bestP1')}</p>
      <p style={{ marginTop: 12, fontSize: 15 }}>{lang === 'zh' ? '另请参阅：' : 'See also: '}<Link href={`/${lang}/blog/json-formatter-online-guide`} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>JSON Formatter</Link></p>
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li style={listItem} dangerouslySetInnerHTML={{ __html: g(t, 'best1') }} />
          <li style={listItem} dangerouslySetInnerHTML={{ __html: g(t, 'best2') }} />
          <li style={listItem} dangerouslySetInnerHTML={{ __html: g(t, 'best3') }} />
          <li style={listItem} dangerouslySetInnerHTML={{ __html: g(t, 'best4') }} />
          <li style={listItem} dangerouslySetInnerHTML={{ __html: g(t, 'best5') }} />
          <li style={listItem} dangerouslySetInnerHTML={{ __html: g(t, 'best6') }} />
          <li style={listItem} dangerouslySetInnerHTML={{ __html: g(t, 'best7') }} />
          <li style={listItem} dangerouslySetInnerHTML={{ __html: g(t, 'best8') }} />
        </ol>
      </div>

      {/* FAQ */}
      <h2 style={sectionTitle}>{g(t, 'faqTitle')}</h2>
      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <div key={i} style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 17, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>{g(t, `faq${i}Q`)}</h3>
          <p style={para}>{g(t, `faq${i}A`)}</p>
        </div>
      ))}

      {/* Conclusion */}
      <h2 style={sectionTitle}>{g(t, 'conclusionTitle')}</h2>
      <p style={para}>{g(t, 'conclusionP')}</p>

      <Link href={`/${lang}/tools/curl-to-code`} style={ctaBox}>{g(t, 'conclusionCta')}</Link>
    </article>
  );
}
