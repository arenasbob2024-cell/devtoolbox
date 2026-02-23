'use client';
import React from 'react';

const codeUrlVersioning = `# URL Path Versioning — the most common approach

# Endpoints
GET  /api/v1/users
POST /api/v1/users
GET  /api/v1/users/123
GET  /api/v2/users
GET  /api/v2/users/123

# Express.js implementation
const express = require('express');
const app = express();

// v1 routes
const v1Router = express.Router();
v1Router.get('/users', (req, res) => {
  res.json({ version: 'v1', users: [{ id: 1, name: 'Alice' }] });
});
v1Router.get('/users/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'Alice', email: 'alice@example.com' });
});

// v2 routes (different response shape)
const v2Router = express.Router();
v2Router.get('/users', (req, res) => {
  res.json({
    version: 'v2',
    data: [{ id: 1, firstName: 'Alice', lastName: 'Smith' }],  // different field names
    meta: { total: 1, page: 1 }
  });
});
v2Router.get('/users/:id', (req, res) => {
  res.json({
    id: req.params.id,
    firstName: 'Alice',   // renamed from 'name'
    lastName: 'Smith',
    contact: { email: 'alice@example.com' }  // nested structure
  });
});

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// Catch-all: redirect unversioned to latest
app.use('/api/users', (req, res) => {
  res.redirect(308, \`/api/v2/users\${req.path}\`);
});`;

const codeHeaderVersioning = `# Header-Based Versioning — cleaner URLs, more complex clients

# Using a custom header
GET /api/users
API-Version: 2

# Or using Accept header (media type versioning)
GET /api/users
Accept: application/vnd.myapi.v2+json

# Or using content negotiation per GitHub's approach
GET /api/users
Accept: application/vnd.github.v3+json

# Express.js implementation
const express = require('express');
const app = express();

// Version middleware — extracts version from header
function versionMiddleware(req, res, next) {
  const version = req.headers['api-version'] ||
                  extractVersionFromAccept(req.headers['accept']) ||
                  '1';  // default to v1

  req.apiVersion = parseInt(version, 10);
  next();
}

function extractVersionFromAccept(accept) {
  // Parse: application/vnd.myapi.v2+json → 2
  const match = accept && accept.match(/vnd\\.myapi\\.v(\\d+)\\+json/);
  return match ? match[1] : null;
}

app.use(versionMiddleware);

app.get('/api/users', (req, res) => {
  if (req.apiVersion >= 2) {
    return res.json({
      data: [{ id: 1, firstName: 'Alice', lastName: 'Smith' }],
      meta: { total: 1 }
    });
  }
  // v1 response
  res.json([{ id: 1, name: 'Alice Smith' }]);
});`;

const codeQueryParam = `# Query Parameter Versioning — simple but often considered messy

GET /api/users?version=2
GET /api/users?v=2
GET /api/users?api-version=2  # Azure REST API style

# Python FastAPI implementation
from fastapi import FastAPI, Query
from typing import Optional

app = FastAPI()

@app.get("/api/users")
async def get_users(version: Optional[int] = Query(default=1, ge=1, le=2)):
    if version == 2:
        return {
            "data": [{"id": 1, "firstName": "Alice", "lastName": "Smith"}],
            "meta": {"total": 1}
        }
    # Default v1
    return [{"id": 1, "name": "Alice Smith"}]

# Azure REST API uses api-version query param universally
# GET https://management.azure.com/subscriptions/{id}/resourceGroups?api-version=2024-01-01`;

const codeSunsetStrategy = `# Deprecation and Sunset Strategy
# Critical for managing API lifecycle

# Response headers indicating deprecation
HTTP/1.1 200 OK
Deprecation: true
Sunset: Sat, 31 Dec 2026 23:59:59 GMT
Link: <https://api.example.com/v2/users>; rel="successor-version"
Warning: 299 - "API v1 is deprecated. Migrate to v2 by 2026-12-31."

# Express.js deprecation middleware
function deprecationMiddleware(sunsetDate, successorPath) {
  return (req, res, next) => {
    res.set({
      'Deprecation': 'true',
      'Sunset': new Date(sunsetDate).toUTCString(),
      'Link': \`<https://api.example.com\${successorPath}>; rel="successor-version"\`,
      'Warning': \`299 - "This API version is deprecated. Please migrate by \${sunsetDate}"\`
    });
    next();
  };
}

// Apply to all v1 routes
app.use('/api/v1',
  deprecationMiddleware('2026-12-31', '/api/v2'),
  v1Router
);

# Versioning in OpenAPI/Swagger
openapi: "3.1.0"
info:
  title: My API
  version: "2.0.0"   # API version (not OpenAPI spec version)
servers:
  - url: https://api.example.com/v2
    description: Production v2
  - url: https://api.example.com/v1
    description: v1 (deprecated, sunset 2026-12-31)`;

const codeGraphQLVersioning = `# GraphQL: versioning via schema evolution (no versions needed)

# GraphQL avoids versioning by:
# 1. Adding new fields (backwards compatible)
# 2. Deprecating old fields with @deprecated directive
# 3. Never removing fields until usage is zero

type User {
  id: ID!
  name: String @deprecated(reason: "Use firstName and lastName instead")
  firstName: String!    # new field
  lastName: String!     # new field
  email: String!
  contact: Contact      # new nested type
}

type Contact {
  email: String!
  phone: String
}

# Query: clients using old 'name' field still work
query GetUser {
  user(id: "123") {
    name          # deprecated but still works
    firstName     # new
    email
  }
}

# Monitoring: track deprecated field usage before removal
# Use Apollo Studio or schema field usage analytics`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'REST API Versioning Strategies: URL, Header, Query Parameter Approaches',
    intro: 'API versioning is one of the most important architectural decisions in API design. Once clients depend on your API, you can never break backward compatibility without a migration plan. Versioning gives you a way to evolve your API while keeping existing clients functional. This guide covers all major versioning strategies with implementation examples, trade-offs, and deprecation best practices.',
    whyTitle: 'Why Version Your API?',
    whyItems: 'Breaking changes (renaming fields, changing response shapes) require a new version|Adding new required parameters or changing authentication schemes|Different clients (mobile, web, third-party) may need to migrate at different times|Service SLAs may require months of notice before deprecating endpoints',
    urlTitle: 'URL Path Versioning',
    urlDesc: 'The version number is embedded directly in the URL path. This is the most widely used approach and is the most visible — you can see the version in every request.',
    headerTitle: 'Header-Based Versioning',
    headerDesc: 'The version is specified in a request header (custom header or Accept header). URLs remain stable across versions.',
    queryTitle: 'Query Parameter Versioning',
    queryDesc: 'The version is passed as a query parameter. Simple but generally less recommended for production APIs.',
    sunsetTitle: 'Deprecation and Sunset Strategy',
    sunsetDesc: 'The most important part of versioning is a clear deprecation lifecycle. Clients need time to migrate.',
    graphqlTitle: 'GraphQL: Schema Evolution Instead of Versions',
    graphqlDesc: 'GraphQL takes a different approach — instead of versioning the entire API, individual fields are deprecated while new fields are added. This is why GraphQL APIs rarely need explicit versions.',
    comparisonTitle: 'Versioning Strategy Comparison',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Never break an existing versioned API without a migration window of at least 6 months (12+ for enterprise APIs).',
    bp2: 'Use Sunset headers to communicate the end-of-life date to API clients programmatically.',
    bp3: 'Maintain changelogs for each API version documenting what changed and why.',
    bp4: 'Consider semantic versioning: only increment the major version for breaking changes. Minor versions can add new endpoints without incrementing the URL version.',
    bp5: 'Provide a migration guide with code examples when releasing a new major version.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Which API versioning strategy is best?',
    faq1a: 'URL path versioning (/api/v2/resource) is the most widely recommended for public APIs because it is explicit, cache-friendly, and easy to test in browsers and curl. Header versioning is preferred when you want clean URLs and don\'t mind requiring clients to set headers. Query params are acceptable for internal APIs.',
    faq2q: 'What counts as a breaking change?',
    faq2a: 'Breaking changes include: removing or renaming fields, changing field types (string to integer), making an optional field required, removing endpoints, changing authentication schemes, altering pagination behavior, and changing error response formats. Non-breaking changes: adding new optional fields, adding new endpoints, adding new optional query parameters, adding new HTTP methods to existing endpoints.',
    faq3q: 'Should I version from v0 or v1?',
    faq3a: 'Start at v1 for public APIs. v0 implies instability and discourages adoption. Use a private beta or pre-release flag for truly unstable APIs. If you need to signal a major architectural rethink, go directly to v2. Semantic versioning (v1.2.3) is useful for communicating the extent of changes within a major version.',
    faq4q: 'How long should I maintain deprecated API versions?',
    faq4a: 'For public/third-party APIs: minimum 12 months, preferably 18-24 months. For mobile apps: longer periods because users may not update their apps. For internal APIs: 3-6 months is common. Use analytics to track actual usage — when usage drops to near zero, you can sunset with minimal disruption. Never retire an API that still has significant traffic.',
    faq5q: 'How do I handle versioning for breaking changes in GraphQL?',
    faq5a: 'GraphQL recommends schema evolution over versioning: (1) Add new fields alongside old ones, (2) Mark old fields with @deprecated, (3) Monitor usage of deprecated fields via Apollo Studio or custom metrics, (4) Remove deprecated fields only after usage reaches zero. For truly incompatible changes, run parallel schemas at /graphql/v1 and /graphql/v2.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'REST API 版本控制策略：URL、请求头、查询参数方法',
    intro: 'API 版本控制是 API 设计中最重要的架构决策之一。一旦客户端依赖你的 API，在没有迁移计划的情况下，你永远不能破坏向后兼容性。版本控制让你可以在保持现有客户端功能的同时演进 API。本指南涵盖所有主要版本控制策略，包括实现示例、权衡取舍和弃用最佳实践。',
    whyTitle: '为什么要版本化 API？',
    whyItems: '破坏性更改（重命名字段、更改响应结构）需要新版本|添加新的必需参数或更改认证方案|不同客户端（移动端、Web、第三方）可能需要在不同时间迁移|服务 SLA 可能要求在弃用端点前提前几个月通知',
    urlTitle: 'URL 路径版本控制',
    urlDesc: '版本号直接嵌入 URL 路径中。这是最广泛使用的方法，也是最明显的——你可以在每个请求中看到版本。',
    headerTitle: '基于请求头的版本控制',
    headerDesc: '版本在请求头（自定义头或 Accept 头）中指定。URL 在版本之间保持稳定。',
    queryTitle: '查询参数版本控制',
    queryDesc: '版本作为查询参数传递。简单，但通常不推荐用于生产 API。',
    sunsetTitle: '弃用和日落策略',
    sunsetDesc: '版本控制最重要的部分是清晰的弃用生命周期。客户端需要时间来迁移。',
    graphqlTitle: 'GraphQL：模式演进而非版本',
    graphqlDesc: 'GraphQL 采用不同的方法——不是对整个 API 进行版本控制，而是在添加新字段的同时弃用单个字段。这就是为什么 GraphQL API 很少需要显式版本。',
    comparisonTitle: '版本控制策略对比',
    bestPracticesTitle: '最佳实践',
    bp1: '绝不在没有至少 6 个月迁移窗口（企业 API 12 个月以上）的情况下破坏现有版本化 API。',
    bp2: '使用 Sunset 请求头以编程方式向 API 客户端传达生命周期结束日期。',
    bp3: '为每个 API 版本维护变更日志，记录更改内容和原因。',
    bp4: '考虑语义版本控制：只针对破坏性更改递增主版本。次要版本可以添加新端点而不递增 URL 版本。',
    bp5: '发布新主版本时，提供包含代码示例的迁移指南。',
    faqTitle: '常见问题',
    faq1q: '哪种 API 版本控制策略最好？',
    faq1a: 'URL 路径版本控制（/api/v2/resource）是公共 API 中最广泛推荐的，因为它明确、对缓存友好，并且易于在浏览器和 curl 中测试。当你想要简洁的 URL 且不介意要求客户端设置请求头时，首选请求头版本控制。查询参数对内部 API 是可以接受的。',
    faq2q: '什么算作破坏性更改？',
    faq2a: '破坏性更改包括：删除或重命名字段、更改字段类型（字符串到整数）、使可选字段变为必需、删除端点、更改认证方案、改变分页行为、更改错误响应格式。非破坏性更改：添加新的可选字段、添加新端点、添加新的可选查询参数、向现有端点添加新 HTTP 方法。',
    faq3q: '我应该从 v0 还是 v1 开始版本控制？',
    faq3a: '公共 API 从 v1 开始。v0 暗示不稳定，会阻止采用。对于真正不稳定的 API，使用私有测试版或预发布标志。如果你需要表示重大架构重构，直接跳到 v2。语义版本控制（v1.2.3）对于在主版本内传达更改范围很有用。',
    faq4q: '我应该维护弃用的 API 版本多长时间？',
    faq4a: '对于公共/第三方 API：最少 12 个月，最好 18-24 个月。对于移动应用：更长时间，因为用户可能不更新应用。对于内部 API：3-6 个月很常见。使用分析追踪实际使用情况——当使用率降至接近零时，你可以以最小干扰停用。绝不退役仍有大量流量的 API。',
    faq5q: '如何在 GraphQL 中处理破坏性更改的版本控制？',
    faq5a: 'GraphQL 建议模式演进而非版本控制：(1) 在旧字段旁添加新字段，(2) 用 @deprecated 标记旧字段，(3) 通过 Apollo Studio 或自定义指标监控弃用字段的使用，(4) 只有在使用率达到零后才删除弃用字段。对于真正不兼容的更改，在 /graphql/v1 和 /graphql/v2 上并行运行模式。',
    relatedTitle: '相关工具',
  },
};

export default function ApiVersioningStrategies({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  const comparisonRows = [
    { strategy: 'URL Path (/v2/)', pros: 'Explicit, cacheable, bookmarkable, easy to test', cons: 'Version in URL feels "dirty" to REST purists', example: '/api/v2/users', bestFor: 'Public APIs, open source' },
    { strategy: 'Custom Header', pros: 'Clean URLs, explicit versioning', cons: 'Less visible, harder to test in browsers', example: 'API-Version: 2', bestFor: 'Enterprise internal APIs' },
    { strategy: 'Accept Header', pros: 'HTTP standard, content negotiation', cons: 'Complex to implement and test', example: 'Accept: vnd.api.v2+json', bestFor: 'RESTful purists' },
    { strategy: 'Query Parameter', pros: 'Simple, no path changes', cons: 'Breaks REST semantics, bad for caching', example: '/api/users?v=2', bestFor: 'Internal tools, prototypes' },
    { strategy: 'No versioning (GraphQL)', pros: 'Single endpoint, schema evolution', cons: 'Complex schema management', example: 'POST /graphql', bestFor: 'GraphQL APIs' },
  ];

  const preStyle: React.CSSProperties = { background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <h2>{t.whyTitle}</h2>
      <ul style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        {t.whyItems.split('|').map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      <h2 style={{ marginTop: '2.5rem' }}>{t.urlTitle}</h2>
      <p>{t.urlDesc}</p>
      <pre style={preStyle}><code>{codeUrlVersioning}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.headerTitle}</h2>
      <p>{t.headerDesc}</p>
      <pre style={preStyle}><code>{codeHeaderVersioning}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.queryTitle}</h2>
      <p>{t.queryDesc}</p>
      <pre style={preStyle}><code>{codeQueryParam}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.sunsetTitle}</h2>
      <p>{t.sunsetDesc}</p>
      <pre style={preStyle}><code>{codeSunsetStrategy}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.graphqlTitle}</h2>
      <p>{t.graphqlDesc}</p>
      <pre style={preStyle}><code>{codeGraphQLVersioning}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.comparisonTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['Strategy', 'Pros', 'Cons', 'Example', 'Best For'].map(h => (
                <th key={h} style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 600 }}>{row.strategy}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', color: '#276749' }}>{row.pros}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', color: '#c53030' }}>{row.cons}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace', fontSize: '0.8rem' }}>{row.example}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.bestPracticesTitle}</h2>
      <ol style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
      </ol>

      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #3182ce' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><a href="/en/tools/json-formatter" style={{ color: '#3182ce' }}>JSON Formatter</a></li>
          <li><a href="/en/tools/curl-to-code" style={{ color: '#3182ce' }}>cURL to Code Converter</a></li>
          <li><a href="/en/tools/json-to-typescript" style={{ color: '#3182ce' }}>JSON to TypeScript</a></li>
        </ul>
      </div>
    </article>
  );
}
