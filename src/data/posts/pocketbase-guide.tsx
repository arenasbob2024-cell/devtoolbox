'use client';
import React from 'react';

const translations = {
  en: {
    title: 'PocketBase: Open-Source Backend in a Single File — Complete Guide',
    description:
      'Master PocketBase from setup to production: collections and schema design, CRUD via REST API, JavaScript SDK, realtime subscriptions, authentication (email/password, OAuth2), file storage, hooks and event handlers, extending with Go, admin dashboard, deployment (Docker, fly.io, Railway), backup and migration, comparison with Supabase and Firebase, and security best practices.',
    tldr: 'PocketBase is a portable open-source backend that ships as a single executable file. It bundles an embedded SQLite database, realtime subscriptions, built-in authentication (email/password and OAuth2), file storage, and a full admin dashboard UI. Install by downloading one binary, run it, and you have a complete backend with REST API, SDK support, and an admin panel at /_/. Extend PocketBase with JavaScript hooks or as a Go framework. Deploy anywhere: Docker, fly.io, Railway, or a plain VPS. Ideal for MVPs, side projects, and small-to-medium applications.',
    tldrZh: 'PocketBase 是一个可移植的开源后端，只需单个可执行文件。它内置 SQLite 数据库、实时订阅、内置认证（邮箱/密码和 OAuth2）、文件存储和完整的管理面板。下载一个二进制文件并运行，即可获得完整后端。可使用 JavaScript hooks 或 Go 框架扩展。可部署到 Docker、fly.io、Railway 或普通 VPS。',
  },
  zh: {
    title: 'PocketBase：单文件开源后端完全指南',
    description:
      '从安装到生产全面掌握 PocketBase：集合与数据模式设计、REST API CRUD 操作、JavaScript SDK、实时订阅、认证（邮箱/密码、OAuth2）、文件存储、钩子与事件处理、Go 扩展、管理面板、部署（Docker、fly.io、Railway）、备份与迁移、与 Supabase/Firebase 对比、以及安全最佳实践。',
    tldr: 'PocketBase 是一个可移植的开源后端，只需单个可执行文件。它内置 SQLite 数据库、实时订阅、内置认证（邮箱/密码和 OAuth2）、文件存储和完整的管理面板 UI。下载一个二进制文件并运行，即可获得完整的后端，支持 REST API、SDK 和管理面板。可使用 JavaScript hooks 或 Go 框架扩展。可部署到 Docker、fly.io、Railway 或普通 VPS。非常适合 MVP、个人项目和中小型应用。',
    tldrZh: 'PocketBase 是一个可移植的开源后端，只需单个可执行文件。它内置 SQLite 数据库、实时订阅、内置认证（邮箱/密码和 OAuth2）、文件存储和完整的管理面板 UI。下载一个二进制文件并运行，即可获得完整的后端。可使用 JavaScript hooks 或 Go 框架扩展。可部署到 Docker、fly.io、Railway 或普通 VPS。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is PocketBase and what are its primary use cases?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PocketBase is an open-source backend that ships as a single executable file. It includes an embedded SQLite database, built-in authentication, file storage, realtime subscriptions, and an admin dashboard. Primary use cases include MVPs, side projects, internal tools, mobile app backends, and small-to-medium web applications. It is written in Go and can be extended as a Go framework or with JavaScript hooks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does PocketBase compare to Supabase and Firebase?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PocketBase is self-hosted and runs as a single binary with zero dependencies, while Supabase and Firebase are cloud-hosted platforms. PocketBase uses SQLite, Supabase uses PostgreSQL, and Firebase uses a proprietary NoSQL database. PocketBase is free and open-source with no usage limits. Supabase offers a generous free tier but charges for scaling. Firebase has pay-as-you-go pricing. PocketBase is ideal for smaller applications and full control, while Supabase and Firebase are better for teams needing managed infrastructure and global scaling.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can PocketBase handle production workloads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, PocketBase can handle production workloads for small-to-medium applications. SQLite can handle thousands of concurrent readers and many writes per second. PocketBase supports WAL mode for better concurrency. For high-traffic applications, you can deploy PocketBase behind a reverse proxy like Nginx or Caddy, enable gzip compression, and use a CDN for static assets. However, PocketBase does not support horizontal scaling or multi-server clustering, so it is not suitable for applications requiring millions of concurrent users.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I set up authentication in PocketBase?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PocketBase provides built-in authentication for both email/password and OAuth2 providers. Create an auth collection in the admin dashboard, then use the JavaScript SDK to register and login users. For OAuth2, enable providers like Google, GitHub, or Discord in the admin panel and configure client IDs and secrets. PocketBase handles token generation, session management, and password hashing automatically. You can also customize auth rules per collection for fine-grained access control.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does PocketBase support realtime subscriptions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, PocketBase has built-in realtime support via Server-Sent Events (SSE). You can subscribe to changes on any collection and receive create, update, and delete events in real time. The JavaScript SDK provides a simple subscribe method that handles reconnection automatically. Realtime subscriptions respect collection API rules, so users only receive events for records they have permission to access.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I deploy PocketBase to production?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PocketBase can be deployed anywhere that runs a single binary. Common deployment options include: Docker (using a minimal Dockerfile with the PocketBase binary), fly.io (using a Dockerfile and fly.toml with a persistent volume), Railway (connecting your GitHub repo), or a plain VPS with systemd for process management. Always mount a persistent volume for the pb_data directory, set up regular backups, and use a reverse proxy with TLS termination.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I extend PocketBase with custom logic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, PocketBase can be extended in two ways. First, you can use JavaScript hooks by placing .pb.js files in the pb_hooks directory. These hooks intercept events like record creation, update, and deletion, and can add custom API routes. Second, you can use PocketBase as a Go framework by importing it into your own Go project and registering custom routes, middleware, and event handlers. The Go approach gives full access to the PocketBase internals and the Go standard library.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I back up and migrate a PocketBase database?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PocketBase stores all data in the pb_data directory, which contains the SQLite database, uploaded files, and configuration. To back up, copy the entire pb_data directory or use the built-in backup API endpoint. For automated backups, use a cron job with sqlite3 .backup command or the PocketBase admin API. To migrate, copy pb_data to a new server and start PocketBase. Schema migrations can be managed through the admin UI or by exporting and importing collection schemas as JSON.',
      },
    },
  ],
};

export default function PocketbaseGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const ulStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
    paddingLeft: '24px',
  };

  const tldrBoxStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '16px 20px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: '#0c4a6e',
  };

  const keyTakeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '20px 24px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    marginBottom: '24px',
  };

  const thStyle: React.CSSProperties = {
    padding: '10px 14px',
    textAlign: 'left',
    background: '#1e293b',
    color: '#f1f5f9',
    fontWeight: '600',
  };

  const tdStyle: React.CSSProperties = {
    padding: '9px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
    verticalAlign: 'top',
  };

  const inlineCodeStyle: React.CSSProperties = {
    background: '#f1f5f9',
    color: '#dc2626',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.85em',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR */}
      <div style={tldrBoxStyle}>
        <strong>{isZh ? 'TL;DR' : 'TL;DR'}</strong>
        <p style={{ margin: '8px 0 0 0' }}>{isZh ? t.tldrZh : t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={keyTakeawaysStyle}>
        <strong style={{ color: '#0f172a', display: 'block', marginBottom: '8px' }}>
          {isZh ? '关键要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#374151' }}>
          <li>{isZh ? 'PocketBase 是一个单文件可执行的开源后端，零依赖' : 'PocketBase is a single-file executable backend with zero external dependencies'}</li>
          <li>{isZh ? '内置 SQLite 数据库、REST API、实时订阅和管理面板' : 'Built-in SQLite database, REST API, realtime subscriptions, and admin dashboard'}</li>
          <li>{isZh ? '支持邮箱/密码和 OAuth2 认证，开箱即用' : 'Email/password and OAuth2 authentication work out of the box'}</li>
          <li>{isZh ? '通过 JavaScript hooks 或 Go 框架模式扩展' : 'Extend via JavaScript hooks or use as a Go framework'}</li>
          <li>{isZh ? '部署到 Docker、fly.io、Railway 或任何 VPS' : 'Deploy to Docker, fly.io, Railway, or any VPS'}</li>
          <li>{isZh ? '适合 MVP、个人项目和中小型应用' : 'Ideal for MVPs, side projects, and small-to-medium apps'}</li>
        </ul>
      </div>

      {/* What is PocketBase */}
      <h2 style={h2Style}>{isZh ? '什么是 PocketBase？' : 'What Is PocketBase?'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 是一个开源的后端应用，整个后端打包在单个可执行文件中。它由 Go 语言编写，内置 SQLite 数据库、实时订阅、用户认证、文件存储和一个完整的管理面板。你只需下载一个二进制文件并运行，就能获得功能完备的后端服务。'
          : 'PocketBase is an open-source backend application packaged in a single executable file. Written in Go, it bundles an embedded SQLite database, realtime subscriptions, user authentication, file storage, and a complete admin dashboard. Download one binary, run it, and you have a fully functional backend service ready to use.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 的核心理念是简单性。没有复杂的依赖管理，没有数据库服务器配置，没有微服务架构。一个文件就是你的整个后端。'
          : 'The core philosophy of PocketBase is simplicity. No complex dependency management, no database server configuration, no microservices architecture. One file is your entire backend.'}
      </p>

      {/* Installation & Setup */}
      <h2 style={h2Style}>{isZh ? '安装与设置' : 'Installation & Setup'}</h2>
      <p style={pStyle}>
        {isZh
          ? '安装 PocketBase 非常简单。从 GitHub Releases 页面下载适合你操作系统的二进制文件，解压并运行即可。'
          : 'Installing PocketBase is straightforward. Download the binary for your operating system from the GitHub Releases page, extract it, and run it.'}
      </p>
      <pre style={preStyle}><code>{'# Download PocketBase (Linux/macOS)\n' +
        'wget https://github.com/pocketbase/pocketbase/releases/download/v0.25.0/pocketbase_0.25.0_linux_amd64.zip\n' +
        'unzip pocketbase_0.25.0_linux_amd64.zip\n\n' +
        '# Run PocketBase\n' +
        './pocketbase serve\n\n' +
        '# Output:\n' +
        '# Server started at http://127.0.0.1:8090\n' +
        '# - REST API: http://127.0.0.1:8090/api/\n' +
        '# - Admin UI: http://127.0.0.1:8090/_/\n\n' +
        '# Specify a custom host and port\n' +
        './pocketbase serve --http="0.0.0.0:8080"\n\n' +
        '# Enable HTTPS with auto TLS (Let\'s Encrypt)\n' +
        './pocketbase serve --https="yourdomain.com"'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '首次访问管理面板时，系统会提示你创建管理员账户。PocketBase 将所有数据存储在 pb_data 目录中。'
          : 'The first time you visit the admin panel, you will be prompted to create an admin account. PocketBase stores all data in the pb_data directory.'}
      </p>

      {/* Collections & Schema */}
      <h2 style={h2Style}>{isZh ? '集合与数据模式' : 'Collections & Schema'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 使用"集合"（Collections）来组织数据，类似于数据库表。集合有三种类型：Base（普通数据）、Auth（用户认证数据）和 View（只读视图）。你可以通过管理面板或 API 来创建和管理集合。'
          : 'PocketBase uses Collections to organize data, similar to database tables. There are three collection types: Base (regular data), Auth (user authentication data), and View (read-only views). You can create and manage collections through the admin dashboard or the API.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '每个集合自动包含 id、created 和 updated 字段。支持的字段类型包括：text、number、bool、email、url、date、select、relation、file、json 和 editor。'
          : 'Each collection automatically includes id, created, and updated fields. Supported field types include: text, number, bool, email, url, date, select, relation, file, json, and editor.'}
      </p>
      <pre style={preStyle}><code>{'// Collection schema example (as defined in admin UI or via API)\n' +
        '// Collection: "posts"\n' +
        '{\n' +
        '  "name": "posts",\n' +
        '  "type": "base",\n' +
        '  "schema": [\n' +
        '    { "name": "title",    "type": "text",     "required": true },\n' +
        '    { "name": "content",  "type": "editor",   "required": true },\n' +
        '    { "name": "slug",     "type": "text",     "unique": true },\n' +
        '    { "name": "tags",     "type": "select",   "options": {\n' +
        '        "values": ["tech", "tutorial", "news"],\n' +
        '        "maxSelect": 5\n' +
        '    }},\n' +
        '    { "name": "author",   "type": "relation", "options": {\n' +
        '        "collectionId": "users",\n' +
        '        "maxSelect": 1\n' +
        '    }},\n' +
        '    { "name": "cover",    "type": "file",     "options": {\n' +
        '        "maxSelect": 1,\n' +
        '        "maxSize": 5242880,\n' +
        '        "mimeTypes": ["image/jpeg", "image/png", "image/webp"]\n' +
        '    }},\n' +
        '    { "name": "published","type": "bool",     "default": false },\n' +
        '    { "name": "views",    "type": "number",   "default": 0 }\n' +
        '  ]\n' +
        '}'}</code></pre>

      {/* CRUD via REST API */}
      <h2 style={h2Style}>{isZh ? '通过 REST API 进行 CRUD 操作' : 'CRUD Operations via REST API'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 自动为每个集合生成完整的 REST API。你可以使用标准的 HTTP 方法来创建、读取、更新和删除记录。'
          : 'PocketBase automatically generates a complete REST API for every collection. You can use standard HTTP methods to create, read, update, and delete records.'}
      </p>
      <pre style={preStyle}><code>{'# List records with filtering, sorting, and pagination\n' +
        'curl "http://127.0.0.1:8090/api/collections/posts/records?\\\n' +
        '  filter=(published=true)&\\\n' +
        '  sort=-created&\\\n' +
        '  page=1&\\\n' +
        '  perPage=20&\\\n' +
        '  expand=author"\n\n' +
        '# Get a single record by ID\n' +
        'curl "http://127.0.0.1:8090/api/collections/posts/records/RECORD_ID"\n\n' +
        '# Create a record\n' +
        'curl -X POST "http://127.0.0.1:8090/api/collections/posts/records" \\\n' +
        '  -H "Content-Type: application/json" \\\n' +
        '  -H "Authorization: Bearer USER_TOKEN" \\\n' +
        '  -d \'{"title":"My Post","content":"Hello world","published":true}\'\n\n' +
        '# Update a record\n' +
        'curl -X PATCH "http://127.0.0.1:8090/api/collections/posts/records/RECORD_ID" \\\n' +
        '  -H "Content-Type: application/json" \\\n' +
        '  -H "Authorization: Bearer USER_TOKEN" \\\n' +
        '  -d \'{"title":"Updated Title"}\'\n\n' +
        '# Delete a record\n' +
        'curl -X DELETE "http://127.0.0.1:8090/api/collections/posts/records/RECORD_ID" \\\n' +
        '  -H "Authorization: Bearer USER_TOKEN"'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 的过滤语法支持各种操作符：=, !=, >, >=, <, <=, ~（模糊匹配）, !~（模糊不匹配）。你可以用 && 和 || 组合条件。'
          : 'The PocketBase filter syntax supports various operators: =, !=, >, >=, <, <=, ~ (like), !~ (not like). Combine conditions with && and ||.'}
      </p>

      {/* JavaScript SDK */}
      <h2 style={h2Style}>{isZh ? 'JavaScript SDK' : 'JavaScript SDK'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 官方提供 JavaScript SDK，支持浏览器和 Node.js 环境。SDK 封装了 REST API，提供类型安全的接口。'
          : 'PocketBase provides an official JavaScript SDK that works in both browser and Node.js environments. The SDK wraps the REST API with a type-safe interface.'}
      </p>
      <pre style={preStyle}><code>{'// Install the SDK\n' +
        '// npm install pocketbase\n\n' +
        'import PocketBase from \'pocketbase\';\n\n' +
        'const pb = new PocketBase(\'http://127.0.0.1:8090\');\n\n' +
        '// --- List records with filtering ---\n' +
        'const posts = await pb.collection(\'posts\').getList(1, 20, {\n' +
        '  filter: \'published = true\',\n' +
        '  sort: \'-created\',\n' +
        '  expand: \'author\',\n' +
        '});\n' +
        'console.log(posts.items);\n' +
        'console.log(posts.totalItems);\n\n' +
        '// --- Get a single record ---\n' +
        'const post = await pb.collection(\'posts\').getOne(\'RECORD_ID\', {\n' +
        '  expand: \'author\',\n' +
        '});\n\n' +
        '// --- Get first matching record ---\n' +
        'const featured = await pb.collection(\'posts\').getFirstListItem(\n' +
        '  \'slug = "hello-world"\'\n' +
        ');\n\n' +
        '// --- Create a record ---\n' +
        'const newPost = await pb.collection(\'posts\').create({\n' +
        '  title: \'My First Post\',\n' +
        '  content: \'<p>Hello PocketBase!</p>\',\n' +
        '  published: true,\n' +
        '  author: pb.authStore.record?.id,\n' +
        '});\n\n' +
        '// --- Update a record ---\n' +
        'await pb.collection(\'posts\').update(\'RECORD_ID\', {\n' +
        '  title: \'Updated Title\',\n' +
        '  views: post.views + 1,\n' +
        '});\n\n' +
        '// --- Delete a record ---\n' +
        'await pb.collection(\'posts\').delete(\'RECORD_ID\');'}</code></pre>

      {/* Realtime Subscriptions */}
      <h2 style={h2Style}>{isZh ? '实时订阅' : 'Realtime Subscriptions'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 内置实时功能，基于 Server-Sent Events (SSE)。你可以订阅集合变更，实时接收创建、更新和删除事件。'
          : 'PocketBase has built-in realtime functionality based on Server-Sent Events (SSE). You can subscribe to collection changes and receive create, update, and delete events in real time.'}
      </p>
      <pre style={preStyle}><code>{'import PocketBase from \'pocketbase\';\n\n' +
        'const pb = new PocketBase(\'http://127.0.0.1:8090\');\n\n' +
        '// Subscribe to all changes in the "posts" collection\n' +
        'pb.collection(\'posts\').subscribe(\'*\', (e) => {\n' +
        '  console.log(e.action); // "create", "update", or "delete"\n' +
        '  console.log(e.record); // the changed record\n' +
        '});\n\n' +
        '// Subscribe to changes on a specific record\n' +
        'pb.collection(\'posts\').subscribe(\'RECORD_ID\', (e) => {\n' +
        '  console.log(\'Record changed:\', e.record);\n' +
        '});\n\n' +
        '// Unsubscribe from a specific collection\n' +
        'pb.collection(\'posts\').unsubscribe(\'*\');\n\n' +
        '// Unsubscribe from all subscriptions\n' +
        'pb.collection(\'posts\').unsubscribe();\n\n' +
        '// React example: realtime chat messages\n' +
        '// useEffect(() => {\n' +
        '//   pb.collection(\'messages\').subscribe(\'*\', (e) => {\n' +
        '//     if (e.action === \'create\') {\n' +
        '//       setMessages(prev => [...prev, e.record]);\n' +
        '//     }\n' +
        '//   });\n' +
        '//   return () => pb.collection(\'messages\').unsubscribe();\n' +
        '// }, []);'}</code></pre>

      {/* Authentication */}
      <h2 style={h2Style}>{isZh ? '认证' : 'Authentication'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 内置认证系统，支持邮箱/密码登录和 OAuth2 社交登录。认证集合自动处理密码哈希、Token 生成和会话管理。'
          : 'PocketBase has a built-in authentication system supporting email/password login and OAuth2 social login. Auth collections automatically handle password hashing, token generation, and session management.'}
      </p>

      <h3 style={h3Style}>{isZh ? '邮箱/密码认证' : 'Email/Password Authentication'}</h3>
      <pre style={preStyle}><code>{'import PocketBase from \'pocketbase\';\n\n' +
        'const pb = new PocketBase(\'http://127.0.0.1:8090\');\n\n' +
        '// --- Register a new user ---\n' +
        'const user = await pb.collection(\'users\').create({\n' +
        '  email: \'user@example.com\',\n' +
        '  password: \'securepassword123\',\n' +
        '  passwordConfirm: \'securepassword123\',\n' +
        '  name: \'John Doe\',\n' +
        '});\n\n' +
        '// --- Login with email/password ---\n' +
        'const authData = await pb.collection(\'users\').authWithPassword(\n' +
        '  \'user@example.com\',\n' +
        '  \'securepassword123\'\n' +
        ');\n' +
        'console.log(authData.token);\n' +
        'console.log(authData.record.id);\n\n' +
        '// --- Check auth state ---\n' +
        'console.log(pb.authStore.isValid);\n' +
        'console.log(pb.authStore.token);\n' +
        'console.log(pb.authStore.record);\n\n' +
        '// --- Refresh auth token ---\n' +
        'await pb.collection(\'users\').authRefresh();\n\n' +
        '// --- Logout ---\n' +
        'pb.authStore.clear();\n\n' +
        '// --- Request password reset ---\n' +
        'await pb.collection(\'users\').requestPasswordReset(\'user@example.com\');\n\n' +
        '// --- Request email verification ---\n' +
        'await pb.collection(\'users\').requestVerification(\'user@example.com\');'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'OAuth2 社交登录' : 'OAuth2 Social Login'}</h3>
      <pre style={preStyle}><code>{'// OAuth2 login (Google, GitHub, Discord, etc.)\n' +
        '// First, configure OAuth2 providers in Admin UI > Auth collection > Options\n\n' +
        '// Browser-based OAuth2 login\n' +
        'const authData = await pb.collection(\'users\').authWithOAuth2({\n' +
        '  provider: \'google\',\n' +
        '});\n\n' +
        'console.log(authData.token);\n' +
        'console.log(authData.record);\n' +
        'console.log(authData.meta?.avatarURL);\n\n' +
        '// Supported OAuth2 providers:\n' +
        '// Google, GitHub, GitLab, Discord, Microsoft, Apple,\n' +
        '// Facebook, Twitter, Spotify, Twitch, Kakao, and more'}</code></pre>

      {/* File Storage */}
      <h2 style={h2Style}>{isZh ? '文件存储' : 'File Storage'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 内置文件存储功能。你可以在集合中添加 file 类型字段来处理文件上传。文件存储在 pb_data/storage 目录中，并自动生成缩略图。'
          : 'PocketBase has built-in file storage. Add file-type fields to collections to handle file uploads. Files are stored in the pb_data/storage directory with automatic thumbnail generation.'}
      </p>
      <pre style={preStyle}><code>{'// Upload a file with a record\n' +
        'const formData = new FormData();\n' +
        'formData.append(\'title\', \'My Photo\');\n' +
        'formData.append(\'image\', fileInput.files[0]);\n\n' +
        'const record = await pb.collection(\'photos\').create(formData);\n\n' +
        '// Get the file URL\n' +
        'const url = pb.files.getURL(record, record.image);\n' +
        '// => http://127.0.0.1:8090/api/files/photos/RECORD_ID/filename.jpg\n\n' +
        '// Get a thumbnail (auto-generated)\n' +
        'const thumb = pb.files.getURL(record, record.image, {\n' +
        '  thumb: \'100x100\',\n' +
        '});\n\n' +
        '// Upload multiple files\n' +
        'const multi = new FormData();\n' +
        'multi.append(\'title\', \'Gallery\');\n' +
        'multi.append(\'images\', file1);\n' +
        'multi.append(\'images\', file2);\n' +
        'multi.append(\'images\', file3);\n' +
        'const gallery = await pb.collection(\'galleries\').create(multi);\n\n' +
        '// Delete a file by setting it to empty\n' +
        'await pb.collection(\'photos\').update(record.id, {\n' +
        '  image: null,\n' +
        '});'}</code></pre>

      {/* Hooks & Event Handlers */}
      <h2 style={h2Style}>{isZh ? '钩子与事件处理' : 'Hooks & Event Handlers'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 支持 JavaScript 钩子，你可以在 pb_hooks 目录中放置 .pb.js 文件来拦截事件和添加自定义逻辑。钩子在记录创建、更新、删除前后触发。'
          : 'PocketBase supports JavaScript hooks. Place .pb.js files in the pb_hooks directory to intercept events and add custom logic. Hooks fire before and after record creation, update, and deletion.'}
      </p>
      <pre style={preStyle}><code>{'// pb_hooks/main.pb.js\n\n' +
        '// Before creating a record - validate and modify data\n' +
        'onRecordCreate((e) => {\n' +
        '  // Auto-generate a slug from the title\n' +
        '  if (e.record.get(\'title\')) {\n' +
        '    const slug = e.record.get(\'title\')\n' +
        '      .toLowerCase()\n' +
        '      .replace(/[^a-z0-9]+/g, \'-\')\n' +
        '      .replace(/^-|-$/g, \'\');\n' +
        '    e.record.set(\'slug\', slug);\n' +
        '  }\n' +
        '  e.next();\n' +
        '}, \'posts\');\n\n' +
        '// After creating a record - send notification\n' +
        'onRecordAfterCreateSuccess((e) => {\n' +
        '  console.log(\'New post created:\', e.record.get(\'title\'));\n' +
        '  // Send email, webhook, etc.\n' +
        '  e.next();\n' +
        '}, \'posts\');\n\n' +
        '// Add a custom API route\n' +
        'routerAdd(\'GET\', \'/api/stats\', (e) => {\n' +
        '  const posts = arrayOf(new Record());\n' +
        '  $app.recordQuery(\'posts\').all(posts);\n' +
        '  return e.json(200, {\n' +
        '    totalPosts: posts.length,\n' +
        '    timestamp: new Date().toISOString(),\n' +
        '  });\n' +
        '});\n\n' +
        '// Cron job: run cleanup daily at midnight\n' +
        'cronAdd(\'daily-cleanup\', \'0 0 * * *\', () => {\n' +
        '  const cutoff = new Date();\n' +
        '  cutoff.setDate(cutoff.getDate() - 30);\n' +
        '  $app.dao().deleteRecordsByFilter(\n' +
        '    \'temp_files\',\n' +
        '    \'created < "' + '\' + cutoff.toISOString() + \'"' + '\'\n' +
        '  );\n' +
        '});'}</code></pre>

      {/* Extending with Go */}
      <h2 style={h2Style}>{isZh ? '使用 Go 扩展' : 'Extending with Go'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 可以作为 Go 框架使用。将 PocketBase 导入你的 Go 项目，你可以访问所有内部 API，注册自定义路由、中间件和事件处理器。'
          : 'PocketBase can be used as a Go framework. Import PocketBase into your own Go project to access all internal APIs, register custom routes, middleware, and event handlers.'}
      </p>
      <pre style={preStyle}><code>{'// main.go\n' +
        'package main\n\n' +
        'import (\n' +
        '    "log"\n' +
        '    "net/http"\n\n' +
        '    "github.com/pocketbase/pocketbase"\n' +
        '    "github.com/pocketbase/pocketbase/core"\n' +
        ')\n\n' +
        'func main() {\n' +
        '    app := pocketbase.New()\n\n' +
        '    // Add a custom route\n' +
        '    app.OnServe().BindFunc(func(se *core.ServeEvent) error {\n' +
        '        se.Router.GET("/api/hello", func(e *core.RequestEvent) error {\n' +
        '            return e.JSON(http.StatusOK, map[string]string{\n' +
        '                "message": "Hello from custom Go route!",\n' +
        '            })\n' +
        '        })\n' +
        '        return se.Next()\n' +
        '    })\n\n' +
        '    // Hook into record events\n' +
        '    app.OnRecordCreate("posts").BindFunc(func(e *core.RecordEvent) error {\n' +
        '        log.Println("Creating post:", e.Record.GetString("title"))\n' +
        '        return e.Next()\n' +
        '    })\n\n' +
        '    if err := app.Start(); err != nil {\n' +
        '        log.Fatal(err)\n' +
        '    }\n' +
        '}'}</code></pre>
      <pre style={preStyle}><code>{'# Initialize Go module and run\n' +
        'go mod init myapp\n' +
        'go mod tidy\n' +
        'go run main.go serve'}</code></pre>

      {/* Admin Dashboard */}
      <h2 style={h2Style}>{isZh ? '管理面板' : 'Admin Dashboard'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 自带一个美观的管理面板，访问 /_/ 路径即可使用。管理面板让你可以可视化地管理集合、浏览记录、配置认证、设置 API 规则等。'
          : 'PocketBase includes a beautiful admin dashboard accessible at the /_/ path. The dashboard lets you visually manage collections, browse records, configure authentication, set API rules, and more.'}
      </p>
      <ul style={ulStyle}>
        <li>{isZh ? '创建、编辑和删除集合与字段' : 'Create, edit, and delete collections and fields'}</li>
        <li>{isZh ? '浏览、搜索和过滤记录' : 'Browse, search, and filter records'}</li>
        <li>{isZh ? '配置 API 规则（列表、查看、创建、更新、删除）' : 'Configure API rules (list, view, create, update, delete)'}</li>
        <li>{isZh ? '管理 OAuth2 提供商和邮件模板' : 'Manage OAuth2 providers and email templates'}</li>
        <li>{isZh ? '查看日志和系统信息' : 'View logs and system information'}</li>
        <li>{isZh ? '导入/导出集合模式' : 'Import and export collection schemas'}</li>
        <li>{isZh ? '管理管理员账户' : 'Manage admin accounts'}</li>
      </ul>

      {/* API Rules */}
      <h2 style={h2Style}>{isZh ? 'API 规则与访问控制' : 'API Rules & Access Control'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 使用基于规则的访问控制系统。每个集合的每个 API 操作都可以设置独立的规则。空规则表示禁止访问，@request 开头的规则可以引用当前请求上下文。'
          : 'PocketBase uses a rule-based access control system. Each API operation on every collection can have its own rule. An empty rule means access is denied. Rules starting with @request reference the current request context.'}
      </p>
      <pre style={preStyle}><code>{'// API Rules examples (set in Admin UI for each collection)\n\n' +
        '// List/View: anyone can read published posts\n' +
        '// Rule: published = true\n\n' +
        '// List/View: only authenticated users\n' +
        '// Rule: @request.auth.id != ""\n\n' +
        '// Create: only authenticated users\n' +
        '// Rule: @request.auth.id != ""\n\n' +
        '// Update: only the author can update\n' +
        '// Rule: author = @request.auth.id\n\n' +
        '// Delete: only admins (leave blank to deny, or use admin-only)\n' +
        '// Rule: @request.auth.role = "admin"\n\n' +
        '// Combined: author or admin can update\n' +
        '// Rule: author = @request.auth.id || @request.auth.role = "admin"\n\n' +
        '// Access related records\n' +
        '// Rule: @request.auth.id = team.members.id'}</code></pre>

      {/* Deployment */}
      <h2 style={h2Style}>{isZh ? '部署' : 'Deployment'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 可以部署到任何能运行单个二进制文件的环境。以下是常见的部署方式。'
          : 'PocketBase can be deployed to any environment that can run a single binary. Here are common deployment options.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Docker 部署' : 'Docker Deployment'}</h3>
      <pre style={preStyle}><code>{'# Dockerfile\n' +
        'FROM alpine:latest\n\n' +
        'ARG PB_VERSION=0.25.0\n\n' +
        'RUN apk add --no-cache \\\n' +
        '    unzip \\\n' +
        '    ca-certificates\n\n' +
        'ADD https://github.com/pocketbase/pocketbase/releases/download/' +
        'v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip\n' +
        'RUN unzip /tmp/pb.zip -d /pb/\n\n' +
        'EXPOSE 8090\n\n' +
        'CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090"]'}</code></pre>
      <pre style={preStyle}><code>{'# docker-compose.yml\n' +
        'version: "3.8"\n' +
        'services:\n' +
        '  pocketbase:\n' +
        '    build: .\n' +
        '    ports:\n' +
        '      - "8090:8090"\n' +
        '    volumes:\n' +
        '      - pb_data:/pb/pb_data\n' +
        '      - ./pb_hooks:/pb/pb_hooks\n' +
        '    restart: unless-stopped\n\n' +
        'volumes:\n' +
        '  pb_data:'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'fly.io 部署' : 'fly.io Deployment'}</h3>
      <pre style={preStyle}><code>{'# fly.toml\n' +
        'app = "my-pocketbase-app"\n' +
        'primary_region = "ord"\n\n' +
        '[build]\n' +
        '  dockerfile = "Dockerfile"\n\n' +
        '[mounts]\n' +
        '  source = "pb_data"\n' +
        '  destination = "/pb/pb_data"\n\n' +
        '[http_service]\n' +
        '  internal_port = 8090\n' +
        '  force_https = true\n\n' +
        '# Deploy commands:\n' +
        '# fly launch\n' +
        '# fly volumes create pb_data --size 1 --region ord\n' +
        '# fly deploy'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Railway 部署' : 'Railway Deployment'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Railway 支持直接从 GitHub 仓库部署 Dockerfile。只需连接你的仓库，Railway 会自动构建和部署。确保添加持久化卷来挂载 pb_data 目录。'
          : 'Railway supports deploying directly from a GitHub repository with a Dockerfile. Connect your repo and Railway will automatically build and deploy. Make sure to add a persistent volume mounted to the pb_data directory.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'VPS + systemd 部署' : 'VPS + systemd Deployment'}</h3>
      <pre style={preStyle}><code>{'# /etc/systemd/system/pocketbase.service\n' +
        '[Unit]\n' +
        'Description=PocketBase\n' +
        'After=network.target\n\n' +
        '[Service]\n' +
        'Type=simple\n' +
        'User=pocketbase\n' +
        'Group=pocketbase\n' +
        'WorkingDirectory=/opt/pocketbase\n' +
        'ExecStart=/opt/pocketbase/pocketbase serve --http=127.0.0.1:8090\n' +
        'Restart=on-failure\n' +
        'RestartSec=5\n\n' +
        '[Install]\n' +
        'WantedBy=multi-user.target\n\n' +
        '# Enable and start\n' +
        '# sudo systemctl enable pocketbase\n' +
        '# sudo systemctl start pocketbase'}</code></pre>

      {/* Backup & Migration */}
      <h2 style={h2Style}>{isZh ? '备份与迁移' : 'Backup & Migration'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 将所有数据存储在 pb_data 目录中。备份只需复制该目录。你也可以使用 API 或 SQLite 工具进行备份。'
          : 'PocketBase stores all data in the pb_data directory. Backing up is as simple as copying that directory. You can also use the API or SQLite tools for backups.'}
      </p>
      <pre style={preStyle}><code>{'# Manual backup: copy pb_data directory\n' +
        'cp -r /opt/pocketbase/pb_data /backup/pb_data_$(date +%Y%m%d)\n\n' +
        '# SQLite online backup (safe while running)\n' +
        'sqlite3 /opt/pocketbase/pb_data/data.db ".backup /backup/data_backup.db"\n\n' +
        '# Automated backup via cron (daily at 2 AM)\n' +
        '# crontab -e\n' +
        '0 2 * * * cp -r /opt/pocketbase/pb_data /backup/pb_data_$(date +\\%Y\\%m\\%d)\n\n' +
        '# Use the admin API for backup\n' +
        'curl -X POST "http://127.0.0.1:8090/api/backups" \\\n' +
        '  -H "Authorization: Bearer ADMIN_TOKEN"\n\n' +
        '# List existing backups\n' +
        'curl "http://127.0.0.1:8090/api/backups" \\\n' +
        '  -H "Authorization: Bearer ADMIN_TOKEN"\n\n' +
        '# Migrate: copy pb_data to new server and start PocketBase\n' +
        'scp -r /opt/pocketbase/pb_data user@newserver:/opt/pocketbase/\n' +
        'ssh user@newserver "/opt/pocketbase/pocketbase serve"'}</code></pre>

      {/* Comparison Table */}
      <h2 style={h2Style}>{isZh ? 'PocketBase vs Supabase vs Firebase' : 'PocketBase vs Supabase vs Firebase'}</h2>
      <p style={pStyle}>
        {isZh
          ? '以下是 PocketBase 与其他流行 BaaS（后端即服务）平台的对比。'
          : 'Here is a comparison of PocketBase with other popular BaaS (Backend-as-a-Service) platforms.'}
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>PocketBase</th>
              <th style={thStyle}>Supabase</th>
              <th style={thStyle}>Firebase</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}><strong>{isZh ? '数据库' : 'Database'}</strong></td>
              <td style={tdStyle}>SQLite ({isZh ? '嵌入式' : 'embedded'})</td>
              <td style={tdStyle}>PostgreSQL</td>
              <td style={tdStyle}>Firestore (NoSQL)</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>{isZh ? '托管' : 'Hosting'}</strong></td>
              <td style={tdStyle}>{isZh ? '自托管' : 'Self-hosted'}</td>
              <td style={tdStyle}>{isZh ? '云托管 / 自托管' : 'Cloud / Self-hosted'}</td>
              <td style={tdStyle}>{isZh ? '仅云托管' : 'Cloud only'}</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>{isZh ? '价格' : 'Pricing'}</strong></td>
              <td style={tdStyle}>{isZh ? '免费（开源）' : 'Free (open-source)'}</td>
              <td style={tdStyle}>{isZh ? '免费层 + 付费' : 'Free tier + paid'}</td>
              <td style={tdStyle}>{isZh ? '免费层 + 按用量付费' : 'Free tier + pay-as-you-go'}</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>{isZh ? '实时' : 'Realtime'}</strong></td>
              <td style={tdStyle}>SSE</td>
              <td style={tdStyle}>WebSocket (Postgres Changes)</td>
              <td style={tdStyle}>WebSocket</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>{isZh ? '认证' : 'Auth'}</strong></td>
              <td style={tdStyle}>{isZh ? '内置（邮箱 + OAuth2）' : 'Built-in (email + OAuth2)'}</td>
              <td style={tdStyle}>{isZh ? '内置（邮箱 + OAuth2 + 更多）' : 'Built-in (email + OAuth2 + more)'}</td>
              <td style={tdStyle}>{isZh ? '内置（邮箱 + OAuth2 + 手机）' : 'Built-in (email + OAuth2 + phone)'}</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>{isZh ? '文件存储' : 'File Storage'}</strong></td>
              <td style={tdStyle}>{isZh ? '本地 / S3' : 'Local / S3'}</td>
              <td style={tdStyle}>S3 {isZh ? '兼容' : 'compatible'}</td>
              <td style={tdStyle}>Cloud Storage</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>{isZh ? '扩展性' : 'Scalability'}</strong></td>
              <td style={tdStyle}>{isZh ? '单服务器（垂直扩展）' : 'Single server (vertical)'}</td>
              <td style={tdStyle}>{isZh ? '水平扩展' : 'Horizontal scaling'}</td>
              <td style={tdStyle}>{isZh ? '自动扩展' : 'Auto-scaling'}</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>{isZh ? '语言' : 'Language'}</strong></td>
              <td style={tdStyle}>Go</td>
              <td style={tdStyle}>TypeScript / Elixir</td>
              <td style={tdStyle}>{isZh ? '专有' : 'Proprietary'}</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>{isZh ? '最适合' : 'Best For'}</strong></td>
              <td style={tdStyle}>{isZh ? 'MVP、个人项目、中小型应用' : 'MVPs, side projects, small-medium apps'}</td>
              <td style={tdStyle}>{isZh ? '生产应用、团队协作' : 'Production apps, team collaboration'}</td>
              <td style={tdStyle}>{isZh ? '移动应用、快速原型' : 'Mobile apps, rapid prototyping'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Security Best Practices */}
      <h2 style={h2Style}>{isZh ? '安全最佳实践' : 'Security Best Practices'}</h2>
      <ul style={ulStyle}>
        <li><strong>{isZh ? '使用 HTTPS' : 'Use HTTPS'}:</strong> {isZh ? '始终在生产环境中使用 TLS。PocketBase 支持自动 Let\'s Encrypt 证书，或者放在 Nginx/Caddy 反向代理后面。' : 'Always use TLS in production. PocketBase supports automatic Let\'s Encrypt certificates, or place it behind an Nginx or Caddy reverse proxy.'}</li>
        <li><strong>{isZh ? '设置 API 规则' : 'Configure API Rules'}:</strong> {isZh ? '不要让集合的 API 规则留空。默认空规则表示拒绝访问，但请明确为每个操作设置规则。' : 'Never leave collection API rules unset without intention. Default empty rules mean deny access, but explicitly set rules for every operation.'}</li>
        <li><strong>{isZh ? '限制管理面板访问' : 'Restrict Admin Panel Access'}:</strong> {isZh ? '在生产环境中，将管理面板绑定到内部网络或使用防火墙限制 /_/ 路径的访问。' : 'In production, bind the admin panel to an internal network or use a firewall to restrict access to the /_/ path.'}</li>
        <li><strong>{isZh ? '定期备份' : 'Regular Backups'}:</strong> {isZh ? '设置自动备份策略，定期备份 pb_data 目录。' : 'Set up automated backup schedules and regularly back up the pb_data directory.'}</li>
        <li><strong>{isZh ? '使用强密码' : 'Use Strong Passwords'}:</strong> {isZh ? '为管理员账户设置强密码，并设置最小密码长度要求。' : 'Set strong passwords for admin accounts and configure minimum password length requirements.'}</li>
        <li><strong>{isZh ? '保持更新' : 'Keep Updated'}:</strong> {isZh ? '定期更新 PocketBase 到最新版本以获取安全补丁。' : 'Regularly update PocketBase to the latest version to get security patches.'}</li>
        <li><strong>{isZh ? '速率限制' : 'Rate Limiting'}:</strong> {isZh ? '使用反向代理（Nginx、Caddy）添加速率限制来防止暴力攻击。' : 'Use a reverse proxy (Nginx, Caddy) to add rate limiting and prevent brute-force attacks.'}</li>
        <li><strong>{isZh ? 'S3 存储' : 'S3 Storage'}:</strong> {isZh ? '对于重要的文件存储，配置 S3 兼容的外部存储（如 AWS S3、Backblaze B2）而不是本地磁盘。' : 'For important file storage, configure S3-compatible external storage (AWS S3, Backblaze B2) instead of local disk.'}</li>
      </ul>
      <pre style={preStyle}><code>{'# Nginx reverse proxy with rate limiting\n' +
        'upstream pocketbase {\n' +
        '    server 127.0.0.1:8090;\n' +
        '}\n\n' +
        'limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;\n\n' +
        'server {\n' +
        '    listen 443 ssl http2;\n' +
        '    server_name api.example.com;\n\n' +
        '    ssl_certificate /etc/letsencrypt/live/api.example.com/fullchain.pem;\n' +
        '    ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;\n\n' +
        '    # Rate limiting\n' +
        '    location /api/ {\n' +
        '        limit_req zone=api burst=20 nodelay;\n' +
        '        proxy_pass http://pocketbase;\n' +
        '        proxy_set_header Host $host;\n' +
        '        proxy_set_header X-Real-IP $remote_addr;\n' +
        '        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n' +
        '        proxy_set_header X-Forwarded-Proto $scheme;\n' +
        '    }\n\n' +
        '    # Restrict admin panel to specific IPs\n' +
        '    location /_/ {\n' +
        '        allow 10.0.0.0/8;\n' +
        '        deny all;\n' +
        '        proxy_pass http://pocketbase;\n' +
        '        proxy_set_header Host $host;\n' +
        '    }\n\n' +
        '    # SSE for realtime (long-lived connections)\n' +
        '    location /api/realtime {\n' +
        '        proxy_pass http://pocketbase;\n' +
        '        proxy_set_header Host $host;\n' +
        '        proxy_buffering off;\n' +
        '        proxy_cache off;\n' +
        '        proxy_read_timeout 3600s;\n' +
        '    }\n' +
        '}'}</code></pre>

      {/* S3 Storage Configuration */}
      <h3 style={h3Style}>{isZh ? 'S3 兼容存储配置' : 'S3-Compatible Storage Configuration'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'PocketBase 支持将文件存储到 S3 兼容的服务中，在管理面板的 Settings > Files storage 中配置。'
          : 'PocketBase supports storing files in S3-compatible services. Configure this in the Admin panel under Settings > Files storage.'}
      </p>
      <pre style={preStyle}><code>{'// S3 configuration in Admin UI > Settings > Files storage\n' +
        '// Endpoint:   s3.us-east-1.amazonaws.com (AWS)\n' +
        '//             s3.us-west-004.backblazeb2.com (Backblaze B2)\n' +
        '// Bucket:     my-pocketbase-files\n' +
        '// Region:     us-east-1\n' +
        '// Access Key: your-access-key\n' +
        '// Secret:     your-secret-key\n' +
        '// Force path style: true (for non-AWS providers)'}</code></pre>

      {/* Full-Stack Example */}
      <h2 style={h2Style}>{isZh ? '完整示例：React + PocketBase' : 'Full-Stack Example: React + PocketBase'}</h2>
      <p style={pStyle}>
        {isZh
          ? '以下是一个使用 React 和 PocketBase 构建的完整 CRUD 应用示例。'
          : 'Here is a complete CRUD application example built with React and PocketBase.'}
      </p>
      <pre style={preStyle}><code>{'// src/lib/pocketbase.ts\n' +
        'import PocketBase from \'pocketbase\';\n\n' +
        'export const pb = new PocketBase(\'http://127.0.0.1:8090\');\n\n' +
        '// src/hooks/usePosts.ts\n' +
        'import { useState, useEffect } from \'react\';\n' +
        'import { pb } from \'../lib/pocketbase\';\n\n' +
        'export function usePosts() {\n' +
        '  const [posts, setPosts] = useState([]);\n' +
        '  const [loading, setLoading] = useState(true);\n\n' +
        '  useEffect(() => {\n' +
        '    // Fetch initial data\n' +
        '    pb.collection(\'posts\')\n' +
        '      .getList(1, 50, { sort: \'-created\', expand: \'author\' })\n' +
        '      .then((result) => {\n' +
        '        setPosts(result.items);\n' +
        '        setLoading(false);\n' +
        '      });\n\n' +
        '    // Subscribe to realtime changes\n' +
        '    pb.collection(\'posts\').subscribe(\'*\', (e) => {\n' +
        '      if (e.action === \'create\') {\n' +
        '        setPosts((prev) => [e.record, ...prev]);\n' +
        '      } else if (e.action === \'update\') {\n' +
        '        setPosts((prev) =>\n' +
        '          prev.map((p) => (p.id === e.record.id ? e.record : p))\n' +
        '        );\n' +
        '      } else if (e.action === \'delete\') {\n' +
        '        setPosts((prev) => prev.filter((p) => p.id !== e.record.id));\n' +
        '      }\n' +
        '    });\n\n' +
        '    return () => {\n' +
        '      pb.collection(\'posts\').unsubscribe();\n' +
        '    };\n' +
        '  }, []);\n\n' +
        '  const createPost = async (data) => {\n' +
        '    return pb.collection(\'posts\').create(data);\n' +
        '  };\n\n' +
        '  const deletePost = async (id) => {\n' +
        '    return pb.collection(\'posts\').delete(id);\n' +
        '  };\n\n' +
        '  return { posts, loading, createPost, deletePost };\n' +
        '}'}</code></pre>

      {/* FAQ */}
      <h2 style={h2Style}>{isZh ? '常见问题' : 'Frequently Asked Questions'}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqSchema.mainEntity.map((item, i) => (
          <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '8px', color: '#1e293b' }}>
              {item.name}
            </h3>
            <p style={{ color: '#374151', lineHeight: '1.7', margin: 0 }}>
              {item.acceptedAnswer.text}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
