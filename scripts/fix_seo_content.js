const fs = require('fs');
const path = require('path');

const DICT_DIR = '/var/www/devtoolbox/src/i18n/dictionaries';

// All 21 new tools with complete SEO content
const seoData = {
  'mermaid-editor': {
    name: 'Mermaid Diagram Editor',
    description: 'Create and preview Mermaid diagrams with live rendering',
    pageTitle: 'Mermaid Diagram Editor Online – Live Preview & Export',
    pageDescription: 'Free online Mermaid editor with live preview. Create flowcharts, sequence diagrams, class diagrams, and more using Mermaid.js syntax.',
    seoTitle: 'What is Mermaid Diagram Editor?',
    seoContent: 'Mermaid is a JavaScript-based diagramming tool that renders Markdown-inspired text definitions to create diagrams and flowcharts. This online editor lets you write Mermaid syntax and see the rendered diagram instantly, making it perfect for documentation, README files, and technical specifications.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is Mermaid.js?', a: 'Mermaid.js is a JavaScript library that generates diagrams from text-based definitions. It supports flowcharts, sequence diagrams, Gantt charts, class diagrams, state diagrams, and more.' },
      { q: 'Can I use Mermaid diagrams in GitHub?', a: 'Yes! GitHub natively supports Mermaid diagrams in Markdown files. Just wrap your Mermaid code in a ```mermaid code block.' },
      { q: 'Is this editor free?', a: 'Yes, this Mermaid editor is completely free with no signup required. All processing happens in your browser.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Type or paste Mermaid syntax in the editor', 'See the live diagram preview update in real-time', 'Adjust your diagram code to refine the output', 'Copy the code or export the diagram for use in your project'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Creating flowcharts for technical documentation', 'Adding sequence diagrams to README files', 'Designing database entity-relationship diagrams', 'Visualizing CI/CD pipeline workflows']
  },
  'kubernetes-yaml-validator': {
    name: 'Kubernetes YAML Validator', description: 'Validate Kubernetes manifest YAML files',
    pageTitle: 'Kubernetes YAML Validator Online – K8s Manifest Checker',
    pageDescription: 'Free Kubernetes YAML validator. Check K8s manifests for errors, missing required fields, and best practices before deploying.',
    seoTitle: 'What is Kubernetes YAML Validator?',
    seoContent: 'Kubernetes uses YAML manifests to define deployments, services, pods, and other resources. This validator checks your K8s YAML files for common errors like missing apiVersion, kind, or metadata fields, helping you catch issues before deploying to your cluster.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What does this validator check?', a: 'It validates YAML syntax, required Kubernetes fields (apiVersion, kind, metadata), and common structural issues in manifests.' },
      { q: 'Does it support all Kubernetes resource types?', a: 'It validates the core structure common to all K8s resources. For resource-specific validation, use kubectl --dry-run.' },
      { q: 'Is my YAML data safe?', a: 'Yes, all validation happens entirely in your browser. No data is sent to any server.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Paste your Kubernetes YAML manifest', 'Click validate to check for errors', 'Review any warnings or errors found', 'Fix issues and re-validate before deploying'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Validating Deployment manifests before applying', 'Checking Service and Ingress configurations', 'Reviewing ConfigMap and Secret structures', 'Pre-flight checks for CI/CD pipelines']
  },
  'openapi-validator': {
    name: 'OpenAPI Validator', description: 'Validate OpenAPI/Swagger specification files',
    pageTitle: 'OpenAPI Validator Online – Swagger Spec Checker',
    pageDescription: 'Free OpenAPI/Swagger validator. Check your API spec for errors, missing fields, and compliance with OpenAPI 3.0/3.1 standards.',
    seoTitle: 'What is OpenAPI Validator?',
    seoContent: 'OpenAPI (formerly Swagger) is the industry standard for describing REST APIs. This validator checks your OpenAPI specification for structural errors, missing required fields, and compliance with the OpenAPI 3.0/3.1 standard.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What OpenAPI versions are supported?', a: 'This validator supports OpenAPI 3.0.x and 3.1.x specifications, as well as Swagger 2.0.' },
      { q: 'Can I validate YAML specs?', a: 'Yes, both JSON and YAML formatted OpenAPI specifications are supported.' },
      { q: 'Does it check for best practices?', a: 'It validates structural correctness and required fields. For style/convention checking, consider using spectral or similar linting tools.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Paste your OpenAPI specification (JSON or YAML)', 'The validator automatically checks for errors', 'Review warnings and fix any issues', 'Copy the validated spec for use in your project'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Validating API specs before code generation', 'Checking specs for API documentation tools', 'CI/CD pipeline spec validation', 'Reviewing third-party API specifications']
  },
  'github-actions-validator': {
    name: 'GitHub Actions Validator', description: 'Validate GitHub Actions workflow YAML files',
    pageTitle: 'GitHub Actions Validator – Workflow YAML Checker Online',
    pageDescription: 'Free GitHub Actions workflow validator. Check your .github/workflows YAML for syntax errors, missing fields, and common mistakes.',
    seoTitle: 'What is GitHub Actions Validator?',
    seoContent: 'GitHub Actions uses YAML workflow files to automate CI/CD pipelines. This validator checks your workflow files for syntax errors, missing required fields like "on" triggers and "jobs", and common configuration mistakes.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What does this validator check?', a: 'It validates YAML syntax, required fields (name, on, jobs), step structure, and common GitHub Actions patterns.' },
      { q: 'Does it validate action versions?', a: 'It checks the structure of uses: references but does not verify if specific action versions exist on the marketplace.' },
      { q: 'Can I validate reusable workflows?', a: 'Yes, both standard workflows and reusable workflow files can be validated.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Paste your GitHub Actions workflow YAML', 'Review validation results for errors and warnings', 'Fix any issues highlighted by the validator', 'Copy the corrected workflow to your repository'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Debugging CI/CD workflow failures', 'Validating new workflows before committing', 'Checking matrix strategy configurations', 'Reviewing workflow trigger conditions']
  },
  'csv-viewer': {
    name: 'CSV Viewer', description: 'View and explore CSV data in an interactive table',
    pageTitle: 'CSV Viewer Online – Interactive Table Display',
    pageDescription: 'Free online CSV viewer. Upload or paste CSV data to view it in a sortable, searchable interactive table with column detection.',
    seoTitle: 'What is CSV Viewer?',
    seoContent: 'CSV (Comma-Separated Values) is a common format for storing tabular data. This viewer parses your CSV data and displays it in a clean, interactive table with automatic column detection, sorting, and searching capabilities.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What delimiters are supported?', a: 'The viewer automatically detects commas, semicolons, tabs, and pipe characters as delimiters.' },
      { q: 'Is there a file size limit?', a: 'Since processing happens in your browser, it depends on your device memory. Files up to 10MB typically work well.' },
      { q: 'Can I edit the CSV data?', a: 'This tool is focused on viewing. For editing, try our JSON to CSV converter or a spreadsheet application.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Paste CSV data or upload a .csv file', 'The table renders automatically with detected columns', 'Click column headers to sort data', 'Use the search to filter rows'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Previewing CSV exports from databases', 'Reviewing data files before importing', 'Debugging data pipeline outputs', 'Quick exploration of CSV datasets']
  },
  'htpasswd-generator': {
    name: 'htpasswd Generator', description: 'Generate Apache htpasswd entries for basic auth',
    pageTitle: 'htpasswd Generator Online – Apache Password Hash Tool',
    pageDescription: 'Free htpasswd generator. Create Apache-compatible password hashes for basic authentication. Supports bcrypt, MD5, and SHA1 algorithms.',
    seoTitle: 'What is htpasswd Generator?',
    seoContent: 'htpasswd is a utility for creating password files used by Apache HTTP Server for basic authentication. This tool generates htpasswd-compatible password hashes without needing command-line access.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'Which hash algorithm should I use?', a: 'bcrypt is recommended for the strongest security. MD5 (apr1) is widely compatible. SHA1 and plain text should be avoided in production.' },
      { q: 'How do I use the generated hash?', a: 'Add the output line to your .htpasswd file, then configure Apache to use it with AuthType Basic and AuthUserFile directives.' },
      { q: 'Is this secure?', a: 'Yes, all hashing happens in your browser. Your password is never transmitted to any server.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Enter a username', 'Enter a password', 'Select the hash algorithm (bcrypt recommended)', 'Copy the generated htpasswd entry to your .htpasswd file'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Setting up Apache basic authentication', 'Creating password-protected directories', 'Generating credentials for Nginx auth_basic', 'Managing htpasswd files for staging environments']
  },
  'json-patch-tool': {
    name: 'JSON Patch Tool', description: 'Apply and test JSON Patch operations (RFC 6902)',
    pageTitle: 'JSON Patch Tool Online – RFC 6902 Operations',
    pageDescription: 'Free JSON Patch tool. Apply RFC 6902 patch operations (add, remove, replace, move, copy, test) to JSON documents.',
    seoTitle: 'What is JSON Patch?',
    seoContent: 'JSON Patch (RFC 6902) is a format for describing changes to a JSON document. It uses an array of operations (add, remove, replace, move, copy, test) to modify JSON data, commonly used in REST APIs for partial updates.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What operations does JSON Patch support?', a: 'RFC 6902 defines six operations: add, remove, replace, move, copy, and test.' },
      { q: 'How is JSON Patch different from JSON Merge Patch?', a: 'JSON Patch uses explicit operations for precise control, while JSON Merge Patch uses a simpler merge strategy. JSON Patch can handle array operations that Merge Patch cannot.' },
      { q: 'Where is JSON Patch commonly used?', a: 'It is used in REST APIs (HTTP PATCH method), configuration management, and collaborative editing systems.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Paste your original JSON document', 'Define patch operations in JSON Patch format', 'Click apply to see the patched result', 'Review the changes and copy the output'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Testing REST API PATCH endpoints', 'Debugging JSON Patch operations', 'Learning RFC 6902 patch syntax', 'Generating patch documents for APIs']
  },
  'graphql-playground': {
    name: 'GraphQL Playground', description: 'Test and explore GraphQL queries with syntax highlighting',
    pageTitle: 'GraphQL Playground Online – Query Tester & Explorer',
    pageDescription: 'Free online GraphQL playground. Write queries, test mutations, explore schemas with syntax highlighting and auto-completion.',
    seoTitle: 'What is GraphQL Playground?',
    seoContent: 'GraphQL is a query language for APIs that gives clients the power to ask for exactly what they need. This playground lets you write and test GraphQL queries, mutations, and subscriptions with syntax highlighting.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'Can I connect to my own GraphQL endpoint?', a: 'This playground is for syntax testing and learning. For live endpoint testing, you need a running GraphQL server.' },
      { q: 'Does it support variables?', a: 'Yes, you can define GraphQL variables in the variables panel and reference them in your queries.' },
      { q: 'What is the difference between a query and a mutation?', a: 'Queries are for reading data (GET equivalent), while mutations are for writing/modifying data (POST/PUT/DELETE equivalent).' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Write your GraphQL query in the editor', 'Add variables if needed', 'Review the query structure and syntax', 'Copy the query for use in your application'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Learning GraphQL query syntax', 'Drafting queries before integrating into apps', 'Testing query structure and variables', 'Sharing GraphQL examples with team members']
  },
  'code-to-image': {
    name: 'Code to Image', description: 'Convert code snippets to beautiful images',
    pageTitle: 'Code to Image – Beautiful Code Screenshots Online',
    pageDescription: 'Free code to image converter. Create beautiful screenshots of your code with syntax highlighting, themes, and customizable backgrounds.',
    seoTitle: 'What is Code to Image?',
    seoContent: 'Code to Image tools convert source code into visually appealing images with syntax highlighting, custom themes, and styled backgrounds. Perfect for sharing code on social media, presentations, and documentation.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What programming languages are supported?', a: 'Most popular languages are supported including JavaScript, Python, TypeScript, Go, Rust, Java, C++, and many more.' },
      { q: 'Can I customize the output?', a: 'Yes, you can choose themes, font sizes, padding, background colors, and window styles.' },
      { q: 'Is the image high resolution?', a: 'Yes, images are generated at 2x resolution for crisp display on retina screens.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Paste your code snippet into the editor', 'Select the programming language for syntax highlighting', 'Customize theme, font size, and background', 'Export the image or copy to clipboard'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Sharing code on Twitter/X and social media', 'Adding code screenshots to presentations', 'Creating visual documentation', 'Making code examples for blog posts']
  },
  'docker-compose-validator': {
    name: 'Docker Compose Validator', description: 'Validate Docker Compose YAML files',
    pageTitle: 'Docker Compose Validator Online – YAML Checker',
    pageDescription: 'Free Docker Compose validator. Check your docker-compose.yml for syntax errors, missing fields, and configuration issues.',
    seoTitle: 'What is Docker Compose Validator?',
    seoContent: 'Docker Compose uses YAML files to define multi-container applications. This validator checks your docker-compose.yml for YAML syntax errors, required fields, service configuration issues, and common mistakes.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'Which Compose versions are supported?', a: 'Both Compose V1 (with version field) and V2+ (without version field) formats are validated.' },
      { q: 'Does it check port conflicts?', a: 'It validates port mapping syntax and warns about common port configuration issues.' },
      { q: 'Can I validate docker-compose.override.yml?', a: 'Yes, any valid Docker Compose YAML file can be validated.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Paste your docker-compose.yml content', 'Review validation results', 'Fix any errors or warnings', 'Copy the validated configuration'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Validating compose files before deployment', 'Debugging container startup issues', 'Reviewing multi-service configurations', 'CI/CD pipeline compose validation']
  },
  'terraform-formatter': {
    name: 'Terraform Formatter', description: 'Format and beautify Terraform HCL configuration files',
    pageTitle: 'Terraform Formatter Online – HCL Code Beautifier',
    pageDescription: 'Free Terraform HCL formatter. Format and beautify your Terraform configuration files online with proper indentation and syntax.',
    seoTitle: 'What is Terraform Formatter?',
    seoContent: 'Terraform uses HCL (HashiCorp Configuration Language) to define infrastructure as code. This formatter applies consistent indentation and styling to your Terraform files, similar to running terraform fmt locally.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'Is this the same as terraform fmt?', a: 'This tool applies similar formatting rules to terraform fmt, ensuring consistent indentation and alignment of your HCL code.' },
      { q: 'Does it support Terraform modules?', a: 'Yes, any valid HCL/Terraform syntax can be formatted, including modules, variables, and outputs.' },
      { q: 'Can I format .tfvars files?', a: 'Yes, .tfvars files use the same HCL syntax and can be formatted with this tool.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Paste your Terraform HCL code', 'Click format to apply consistent styling', 'Review the formatted output', 'Copy the formatted code back to your project'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Formatting Terraform configs before committing', 'Cleaning up auto-generated HCL code', 'Standardizing code style across teams', 'Reviewing Terraform plan outputs']
  },
  'websocket-tester': {
    name: 'WebSocket Tester', description: 'Test WebSocket connections with real-time message sending and receiving',
    pageTitle: 'WebSocket Tester Online – Real-time Connection Debug Tool',
    pageDescription: 'Free online WebSocket tester. Connect to WS/WSS endpoints, send and receive messages in real-time, track latency and connection status.',
    seoTitle: 'What is WebSocket Tester?',
    seoContent: 'WebSocket is a communication protocol that provides full-duplex communication channels over a single TCP connection. This tester lets you connect to any WebSocket endpoint, send messages, and view responses in real-time, making it essential for debugging real-time applications.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is the difference between WS and WSS?', a: 'WS (ws://) is unencrypted WebSocket, while WSS (wss://) is encrypted with TLS/SSL, similar to HTTP vs HTTPS. Always use WSS in production.' },
      { q: 'Can I test binary WebSocket messages?', a: 'This tool focuses on text-based messages. Binary messages will be shown as [Binary data] indicators.' },
      { q: 'Why does my connection fail?', a: 'Common reasons include CORS restrictions, invalid URLs, server not running, or firewall blocking WebSocket connections.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Enter your WebSocket URL (ws:// or wss://)', 'Click Connect to establish the connection', 'Type a message and click Send', 'View received messages in the log panel'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Debugging real-time chat applications', 'Testing WebSocket API endpoints', 'Monitoring live data feeds', 'Validating WebSocket server implementations']
  },
  'totp-generator': {
    name: 'TOTP Generator', description: 'Generate Time-based One-Time Passwords for two-factor authentication testing',
    pageTitle: 'TOTP Generator Online – 2FA Code Generator & Tester',
    pageDescription: 'Free TOTP generator for testing 2FA. Generate time-based one-time passwords with custom secrets, periods, and digit counts.',
    seoTitle: 'What is TOTP Generator?',
    seoContent: 'TOTP (Time-based One-Time Password) is the algorithm behind apps like Google Authenticator and Authy. This generator creates TOTP codes from a shared secret, allowing developers to test two-factor authentication implementations.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is TOTP?', a: 'TOTP (RFC 6238) generates a unique password based on a shared secret and the current time. Codes typically refresh every 30 seconds.' },
      { q: 'Is this tool safe for production secrets?', a: 'All computation happens in your browser. However, for production use, always generate and store secrets securely on your server.' },
      { q: 'Can I use this with Google Authenticator?', a: 'Yes, the generated OTPAuth URI is compatible with Google Authenticator, Authy, and other TOTP apps.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Generate or enter a Base32 secret key', 'Configure the period (default 30s) and digits (6 or 8)', 'Watch the live TOTP code update with countdown', 'Copy the OTPAuth URI for QR code generation'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Testing 2FA implementations in web apps', 'Generating test TOTP codes for QA', 'Debugging authenticator app integrations', 'Learning how TOTP algorithm works']
  },
  'connection-string-builder': {
    name: 'DB Connection String Builder', description: 'Build database connection strings for popular databases',
    pageTitle: 'Database Connection String Builder – MySQL, PostgreSQL, MongoDB',
    pageDescription: 'Free connection string builder. Generate database connection strings for PostgreSQL, MySQL, MongoDB, Redis, SQL Server with one click.',
    seoTitle: 'What is Connection String Builder?',
    seoContent: 'A database connection string contains all the information needed to connect to a database: host, port, credentials, and options. This builder generates properly formatted connection strings for popular databases, eliminating syntax errors.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'Which databases are supported?', a: 'PostgreSQL, MySQL, MongoDB, Redis, and SQL Server. Each generates the correct connection string format.' },
      { q: 'Does it generate Prisma DATABASE_URL?', a: 'Yes, for PostgreSQL and MySQL it also generates Prisma-compatible DATABASE_URL strings.' },
      { q: 'Is my password safe?', a: 'Yes, everything runs in your browser. No data is transmitted to any server. Never commit connection strings with real passwords to version control.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Select your database type', 'Fill in host, port, username, password, and database name', 'Toggle SSL if needed', 'Copy the generated connection string'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Setting up .env files for new projects', 'Configuring ORM connection strings (Prisma, TypeORM)', 'Connecting to cloud database services', 'Switching between development and production databases']
  },
  'systemd-unit-validator': {
    name: 'Systemd Unit Validator', description: 'Validate Linux systemd service unit files',
    pageTitle: 'Systemd Unit File Validator Online – Service File Checker',
    pageDescription: 'Free systemd unit file validator. Check .service files for syntax errors, missing sections, and best practices before deployment.',
    seoTitle: 'What is Systemd Unit Validator?',
    seoContent: 'Systemd is the init system used by most modern Linux distributions to manage services. This validator checks your .service unit files for common errors like missing sections, invalid directives, and security concerns.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What does this validator check?', a: 'It validates [Unit], [Service], and [Install] sections, required fields like ExecStart, and warns about security issues like running as root.' },
      { q: 'Does it support timer and socket units?', a: 'It primarily focuses on .service units but can validate basic structure of timer and socket files.' },
      { q: 'How do I apply the validated unit?', a: 'Save the file to /etc/systemd/system/, then run systemctl daemon-reload and systemctl enable --now your-service.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Paste your systemd unit file content', 'Review validation results for errors and warnings', 'Fix highlighted issues', 'Copy the corrected unit file to your server'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Validating service files before deployment', 'Debugging systemd service startup failures', 'Learning systemd unit file syntax', 'Reviewing third-party service configurations']
  },
  'api-rate-limit-calculator': {
    name: 'API Rate Limit Calculator', description: 'Calculate API usage costs and rate limits for LLM and REST APIs',
    pageTitle: 'API Rate Limit Calculator – LLM Cost Estimator Online',
    pageDescription: 'Free API rate limit calculator. Compare costs across GPT-4o, Claude, Gemini and other LLM APIs. Plan usage and estimate monthly bills.',
    seoTitle: 'What is API Rate Limit Calculator?',
    seoContent: 'API rate limits determine how many requests you can make per minute, hour, or day. This calculator helps you plan API usage, estimate costs across different LLM providers (OpenAI, Anthropic, Google), and check if your usage fits within rate limits.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How are LLM API costs calculated?', a: 'LLM APIs charge per token (roughly 4 characters per token). Input tokens and output tokens often have different pricing.' },
      { q: 'What is RPM?', a: 'RPM stands for Requests Per Minute, the maximum number of API calls you can make in a minute. Exceeding this results in 429 rate limit errors.' },
      { q: 'Are the prices up to date?', a: 'Prices shown are approximate as of 2026. Always check the official provider documentation for current rates.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Enter your expected daily request volume', 'Set average input and output token counts', 'Compare costs across different LLM models', 'Check if your usage fits within RPM limits'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Estimating monthly LLM API costs for a project', 'Comparing pricing across AI providers', 'Planning API usage within rate limits', 'Budgeting for production AI applications']
  },
  'oauth-debugger': {
    name: 'OAuth 2.0 Debugger', description: 'Debug OAuth 2.0 authorization flows and generate auth URLs',
    pageTitle: 'OAuth 2.0 Debugger Online – Authorization Flow Tester',
    pageDescription: 'Free OAuth 2.0 debugger. Build authorization URLs, test PKCE flows, and debug OAuth token exchanges for your applications.',
    seoTitle: 'What is OAuth 2.0 Debugger?',
    seoContent: 'OAuth 2.0 is the industry standard protocol for authorization. This debugger helps you construct authorization URLs, configure PKCE parameters, and test different OAuth flows (Authorization Code, Implicit, Client Credentials) without writing code.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is PKCE?', a: 'PKCE (Proof Key for Code Exchange) is a security extension for OAuth 2.0 that prevents authorization code interception attacks. Recommended for all public clients.' },
      { q: 'Which OAuth flow should I use?', a: 'Authorization Code + PKCE for web/mobile apps, Client Credentials for machine-to-machine, and avoid Implicit flow (deprecated).' },
      { q: 'Does this tool actually perform authentication?', a: 'This tool builds the authorization URL and parameters. You would then use the generated URL in your browser to start the actual OAuth flow.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Select your OAuth flow type', 'Configure authorization and token endpoints', 'Enter client ID, redirect URI, and scopes', 'Copy the generated authorization URL'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Debugging OAuth integration issues', 'Testing PKCE flow parameters', 'Building authorization URLs for different providers', 'Learning OAuth 2.0 flow mechanics']
  },
  'dockerfile-linter': {
    name: 'Dockerfile Linter', description: 'Lint Dockerfiles for best practices, security issues, and common mistakes',
    pageTitle: 'Dockerfile Linter Online – Best Practices & Security Checker',
    pageDescription: 'Free Dockerfile linter. Check for best practices, security vulnerabilities, and common mistakes. Get actionable recommendations.',
    seoTitle: 'What is Dockerfile Linter?',
    seoContent: 'A Dockerfile linter analyzes your Docker build instructions for common mistakes, security issues, and deviations from best practices. This tool checks for issues like using :latest tags, running as root, missing HEALTHCHECK, and inefficient layer caching.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What rules does it check?', a: 'It checks for pinned base image versions, efficient RUN commands, COPY vs ADD usage, exec form CMD, security concerns, and more.' },
      { q: 'Is this like Hadolint?', a: 'It applies similar best practice rules to Hadolint but runs entirely in your browser with no installation required.' },
      { q: 'Should I fix all warnings?', a: 'Errors should always be fixed. Warnings are recommendations that improve security and performance but may not apply to every situation.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Paste your Dockerfile content', 'Review errors, warnings, and info messages', 'Fix critical issues first (red), then warnings (yellow)', 'Re-lint to verify all issues are resolved'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Reviewing Dockerfiles before building images', 'Enforcing best practices in CI/CD pipelines', 'Optimizing Docker image sizes', 'Security auditing container configurations']
  },
  'ssl-certificate-decoder': {
    name: 'SSL Certificate Decoder', description: 'Decode and inspect SSL/TLS X.509 certificates',
    pageTitle: 'SSL Certificate Decoder Online – X.509 Certificate Inspector',
    pageDescription: 'Free SSL certificate decoder. Inspect PEM certificates, check expiry dates, view subject details, and analyze certificate chains.',
    seoTitle: 'What is SSL Certificate Decoder?',
    seoContent: 'SSL/TLS certificates (X.509) are used to encrypt web traffic and verify server identity. This decoder parses PEM-encoded certificates to show the subject, issuer, validity dates, and other details without using command-line tools.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What certificate formats are supported?', a: 'PEM-encoded certificates (Base64 with -----BEGIN CERTIFICATE----- headers) are supported. DER format needs to be converted first.' },
      { q: 'Can it decode private keys?', a: 'It detects private keys and shows their type, but does not expose key material for security reasons.' },
      { q: 'How do I get my certificate in PEM format?', a: 'Use openssl s_client -connect domain:443 to download a site certificate, or check your certificate provider dashboard.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Paste your PEM-encoded certificate', 'View decoded certificate details', 'Check validity dates and subject information', 'Review the certificate type and format'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Inspecting SSL certificates before installation', 'Debugging HTTPS connection issues', 'Verifying certificate expiry dates', 'Analyzing certificate chains']
  },
  'font-pairing-tool': {
    name: 'Font Pairing Tool', description: 'Find beautiful font combinations with live preview',
    pageTitle: 'Font Pairing Tool – Google Fonts Typography Combinations',
    pageDescription: 'Free font pairing tool with 10 curated combinations. Preview heading and body font pairs with live text rendering using Google Fonts.',
    seoTitle: 'What is Font Pairing Tool?',
    seoContent: 'Font pairing is the art of combining complementary typefaces for headings and body text. Good font pairs create visual hierarchy and readability. This tool provides curated Google Fonts combinations with live preview so you can find the perfect typography for your project.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'How do I choose good font pairs?', a: 'Pair a distinctive heading font (serif or display) with a clean body font (sans-serif). Contrast in style while maintaining harmony is key.' },
      { q: 'Are these Google Fonts free?', a: 'Yes, all fonts shown are from Google Fonts and are free for personal and commercial use.' },
      { q: 'Can I use custom fonts?', a: 'Yes, type any Google Font name in the custom fields to preview it with your text.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Browse the curated font pairings on the left', 'Click a pairing to see the live preview', 'Customize the preview text to match your content', 'Copy the Google Fonts @import CSS for your project'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Choosing typography for web design projects', 'Finding heading and body font combinations', 'Previewing fonts before adding to CSS', 'Creating consistent typography systems']
  },
  'helm-chart-validator': {
    name: 'Helm Chart Validator', description: 'Validate Helm chart Chart.yaml and values.yaml files',
    pageTitle: 'Helm Chart Validator Online – K8s Chart.yaml Checker',
    pageDescription: 'Free Helm chart validator. Check Chart.yaml and values.yaml for errors, missing required fields, and Kubernetes best practices.',
    seoTitle: 'What is Helm Chart Validator?',
    seoContent: 'Helm is the package manager for Kubernetes, using Charts to define, install, and manage K8s applications. This validator checks your Chart.yaml for required fields (apiVersion, name, version) and values.yaml for common configuration issues.',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What Chart.yaml fields are required?', a: 'apiVersion (v2 recommended), name, and version are required. description, type, and appVersion are strongly recommended.' },
      { q: 'Does it validate templates?', a: 'This tool focuses on Chart.yaml and values.yaml validation. Template rendering requires helm template command locally.' },
      { q: 'What Helm version is supported?', a: 'Both Helm v2 (apiVersion: v1) and Helm v3+ (apiVersion: v2) chart formats are validated, with v2 recommended.' }
    ],
    howToUseTitle: 'How to Use',
    howToUseSteps: ['Paste your Chart.yaml on the left', 'Paste your values.yaml on the right', 'Review validation results for both files', 'Fix any errors before packaging the chart'],
    useCasesTitle: 'Common Use Cases',
    useCases: ['Validating charts before helm install', 'Reviewing values.yaml for production readiness', 'Checking chart structure in CI/CD pipelines', 'Auditing third-party Helm charts']
  }
};

console.log('=== Adding SEO content to tool dictionaries ===\n');

// Find all tool dictionary files
const files = fs.readdirSync(DICT_DIR).filter(f => f.endsWith('-tools.json'));
console.log('Dict files found:', files.join(', '));

for (const file of files) {
  const lang = file.replace('-tools.json', '');
  const fp = path.join(DICT_DIR, file);
  const dict = JSON.parse(fs.readFileSync(fp, 'utf8'));
  let updated = 0;
  
  for (const [toolId, data] of Object.entries(seoData)) {
    // Add all SEO fields (use English for all languages as base - translations can be done later)
    if (!dict[toolId]) {
      dict[toolId] = data;
      updated++;
    } else {
      // Add missing SEO fields to existing entries
      let fieldsAdded = 0;
      for (const [key, value] of Object.entries(data)) {
        if (!dict[toolId][key]) {
          dict[toolId][key] = value;
          fieldsAdded++;
        }
      }
      if (fieldsAdded > 0) updated++;
    }
  }
  
  fs.writeFileSync(fp, JSON.stringify(dict, null, 2));
  console.log(`  ✓ ${file} (${updated} tools updated)`);
}

console.log('\n=== Done! ===');
