'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'MERN Stack in 2025: Modern Setup with TypeScript and Best Practices',
    intro: 'The MERN stack (MongoDB, Express, React, Node.js) remains one of the most popular choices for full-stack JavaScript development. In 2025, the stack has evolved with TypeScript becoming standard, new tools improving the developer experience, and best practices maturing. This comprehensive guide covers setting up a modern, production-ready MERN application.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Modern MERN stack in 2025 uses TypeScript throughout, Vite for frontend tooling, modern React patterns (Server Components, hooks), Express with async handlers, and MongoDB with Mongoose or Prisma. Key additions include Zod for validation, Vitest for testing, and Docker for development environment consistency.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'TypeScript is now essential for production MERN applications',
    takeaway2: 'Vite has replaced Create React App as the standard React build tool',
    takeaway3: 'React Server Components and Server Actions are changing data fetching patterns',
    takeaway4: 'MongoDB Atlas with Prisma or Mongoose provides the best developer experience',
    takeaway5: 'Zod or Valibot should be used for runtime validation',
    takeaway6: 'Containerization with Docker is recommended for team development',
    
    whatIsMernTitle: 'What is the MERN Stack?',
    whatIsMernContent: 'MERN is a full-stack JavaScript solution comprising MongoDB (database), Express.js (backend framework), React (frontend library), and Node.js (runtime). This stack allows developers to use a single language (JavaScript/TypeScript) across the entire application, enabling code sharing and faster development cycles.',
    
    modernStackTitle: 'Modern MERN Architecture 2025',
    modernStackIntro: 'The 2025 MERN stack has evolved significantly from its origins:',
    
    frontendTitle: 'Frontend (React + TypeScript)',
    frontendContent: 'Modern React applications use Vite for fast development and building. The frontend architecture includes React Router for client-side routing, Zustand or React Query for state management, and Tailwind CSS for styling. React Server Components (with frameworks like Next.js or Remix) are becoming the standard for production apps.',
    
    backendTitle: 'Backend (Node.js + Express + TypeScript)',
    backendContent: 'The backend uses Express.js with TypeScript, implementing proper error handling, validation middleware with Zod, and structured logging. Modern practices include separating controllers, services, and data access layers for better testability and maintainability.',
    
    databaseTitle: 'Database (MongoDB + ODM)',
    databaseContent: 'MongoDB Atlas provides managed database hosting with automatic scaling and backups. Mongoose remains popular for schema validation and query building, while Prisma with MongoDB connector offers type-safe database access and migrations.',
    
    projectStructureTitle: 'Project Structure',
    projectStructureIntro: 'A well-organized monorepo structure for MERN applications:',
    
    setupGuideTitle: 'Step-by-Step Setup Guide',
    setupGuideIntro: 'Complete setup from scratch:',
    
    step1Title: 'Step 1: Initialize Monorepo with pnpm',
    step2Title: 'Step 2: Backend Setup (Express + TypeScript)',
    step3Title: 'Step 3: Frontend Setup (React + Vite)',
    step4Title: 'Step 4: Database Setup (MongoDB + Mongoose)',
    step5Title: 'Step 5: Shared Types Package',
    
    bestPracticesTitle: 'Best Practices',
    bestPracticesIntro: 'Essential practices for production MERN applications:',
    
    securityTitle: 'Security Checklist',
    securityIntro: 'Critical security measures for MERN apps:',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'Modern deployment strategies for MERN applications:',
    
    testingTitle: 'Testing Strategy',
    testingIntro: 'Comprehensive testing approach for MERN stack:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'The MERN stack continues to be a powerful choice for full-stack JavaScript development in 2025. By embracing TypeScript, modern tooling like Vite, and best practices around security and testing, you can build production-ready applications that scale. The evolution of React with Server Components and the maturity of the MongoDB ecosystem make the MERN stack more compelling than ever for modern web development.',
    
    faq1q: 'Is MERN stack still relevant in 2025?',
    faq1a: 'Yes, the MERN stack remains highly relevant. With TypeScript adoption, modern React patterns, and improved tooling, it\'s a solid choice for many applications. The JavaScript ecosystem continues to improve, making MERN development more productive than ever.',
    
    faq2q: 'Should I use Next.js instead of React with Express?',
    faq2a: 'Next.js is a great option that combines frontend and backend, but the traditional MERN stack (separate React frontend + Express backend) still has advantages: clearer separation of concerns, easier scaling of frontend/backend independently, and flexibility to use different backend technologies if needed.',
    
    faq3q: 'MongoDB vs PostgreSQL for MERN?',
    faq3a: 'MongoDB is the traditional choice for MERN and works well for document-based data, rapid prototyping, and flexible schemas. PostgreSQL with Prisma is a good alternative if you need relational data, complex queries, or strict schema enforcement. The "PERN" stack is becoming increasingly popular.',
    
    faq4q: 'How do I handle authentication in MERN?',
    faq4a: 'JWT tokens stored in httpOnly cookies is the standard approach. Use libraries like jsonwebtoken on the backend and store user context in React. For production, consider OAuth providers (Google, GitHub) via Passport.js or Auth0/Clerk for easier implementation.',
    
    faq5q: 'What\'s the best way to handle file uploads?',
    faq5a: 'Use multer for handling multipart/form-data on the backend, then store files in cloud storage (AWS S3, Cloudinary, or Supabase Storage). Never store uploaded files directly on your server. For images, consider processing with Sharp before storage.',
    
    faq6q: 'How do I deploy a MERN application?',
    faq6a: 'Deploy the frontend to Vercel, Netlify, or AWS S3+CloudFront. Deploy the backend to Railway, Render, Fly.io, or AWS ECS. Use MongoDB Atlas for the database. Set up environment variables for API URLs and database connections. Consider using Docker for consistent deployments.',
    
    faq7q: 'Should I use Redux or Zustand for state management?',
    faq7a: 'For most applications, Zustand is simpler and sufficient. Redux Toolkit is still relevant for complex applications with many interconnected states. React Query (TanStack Query) handles server state excellently, reducing the need for global state management.',
    
    faq8q: 'How do I scale a MERN application?',
    faq8a: 'Scale horizontally by running multiple Node.js instances behind a load balancer. Use MongoDB replica sets and sharding for database scaling. Implement caching with Redis. Consider moving to a microservices architecture as you grow. Use CDN for static assets.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'MERN技术栈2025指南：TypeScript现代设置和最佳实践',
    intro: 'MERN技术栈（MongoDB、Express、React、Node.js）仍然是全栈JavaScript开发最受欢迎的选择之一。在2025年，该技术栈已经发展，TypeScript成为标准，新工具改善了开发者体验，最佳实践日趋成熟。本综合指南涵盖设置现代、生产就绪的MERN应用。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '2025年的现代MERN技术栈全程使用TypeScript，前端使用Vite，现代React模式（Server Components、hooks），Express配合异步处理器，以及使用Mongoose或Prisma的MongoDB。关键新增包括用于验证的Zod、用于测试的Vitest，以及用于开发环境一致性的Docker。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'TypeScript现在对生产MERN应用至关重要',
    takeaway2: 'Vite已取代Create React App成为标准React构建工具',
    takeaway3: 'React Server Components和Server Actions正在改变数据获取模式',
    takeaway4: '使用Prisma或Mongoose的MongoDB Atlas提供最佳的开发者体验',
    takeaway5: '应该使用Zod或Valibot进行运行时验证',
    takeaway6: '推荐使用Docker容器化进行团队开发',
    
    whatIsMernTitle: '什么是MERN技术栈？',
    whatIsMernContent: 'MERN是一个全栈JavaScript解决方案，包括MongoDB（数据库）、Express.js（后端框架）、React（前端库）和Node.js（运行时）。该技术栈允许开发者在整个应用中使用单一语言（JavaScript/TypeScript），实现代码共享和更快的开发周期。',
    
    modernStackTitle: '现代MERN架构2025',
    modernStackIntro: '2025年的MERN技术栈已从其起源显著发展：',
    
    frontendTitle: '前端（React + TypeScript）',
    frontendContent: '现代React应用使用Vite进行快速开发和构建。前端架构包括用于客户端路由的React Router、用于状态管理的Zustand或React Query，以及用于样式的Tailwind CSS。React Server Components（使用Next.js或Remix等框架）正在成为生产应用的标准。',
    
    backendTitle: '后端（Node.js + Express + TypeScript）',
    backendContent: '后端使用TypeScript的Express.js，实现适当的错误处理、使用Zod的验证中间件和结构化日志记录。现代实践包括分离控制器、服务和数据访问层，以提高可测试性和可维护性。',
    
    databaseTitle: '数据库（MongoDB + ODM）',
    databaseContent: 'MongoDB Atlas提供托管数据库托管，具有自动扩展和备份功能。Mongoose仍然是模式验证和查询构建的流行选择，而使用MongoDB连接器的Prisma提供类型安全的数据库访问和迁移。',
    
    projectStructureTitle: '项目结构',
    projectStructureIntro: 'MERN应用的组织良好的monorepo结构：',
    
    setupGuideTitle: '分步设置指南',
    setupGuideIntro: '从零开始的完整设置：',
    
    step1Title: '步骤1：使用pnpm初始化Monorepo',
    step2Title: '步骤2：后端设置（Express + TypeScript）',
    step3Title: '步骤3：前端设置（React + Vite）',
    step4Title: '步骤4：数据库设置（MongoDB + Mongoose）',
    step5Title: '步骤5：共享类型包',
    
    bestPracticesTitle: '最佳实践',
    bestPracticesIntro: '生产MERN应用的基本实践：',
    
    securityTitle: '安全清单',
    securityIntro: 'MERN应用的关键安全措施：',
    
    deploymentTitle: '部署选项',
    deploymentIntro: 'MERN应用的现代部署策略：',
    
    testingTitle: '测试策略',
    testingIntro: 'MERN技术栈的综合测试方法：',
    
    conclusionTitle: '结论',
    conclusionContent: 'MERN技术栈在2025年继续成为全栈JavaScript开发的强大选择。通过拥抱TypeScript、Vite等现代工具以及围绕安全和测试的最佳实践，你可以构建可扩展的生产就绪应用。React的演进、Server Components以及MongoDB生态系统的成熟使MERN技术栈对现代Web开发比以往更具吸引力。',
    
    faq1q: 'MERN技术栈在2025年仍然相关吗？',
    faq1a: '是的，MERN技术栈仍然高度相关。随着TypeScript的采用、现代React模式和改进的工具，它是许多应用的可靠选择。JavaScript生态系统继续改进，使MERN开发比以往更具生产力。',
    
    faq2q: '我应该使用Next.js而不是React配合Express吗？',
    faq2a: 'Next.js是一个很好的选择，结合了前端和后端，但传统的MERN技术栈（单独的React前端 + Express后端）仍然有优势：关注点分离更清晰、前后端独立扩展更容易，以及在需要时灵活使用不同后端技术的能力。',
    
    faq3q: 'MERN中MongoDB vs PostgreSQL？',
    faq3a: 'MongoDB是MERN的传统选择，适用于基于文档的数据、快速原型设计和灵活的模式。如果使用Prisma的PostgreSQL是不错的替代方案，如果你需要关系数据、复杂查询或严格的模式执行。"PERN"技术栈正变得越来越受欢迎。',
    
    faq4q: '如何在MERN中处理认证？',
    faq4a: '存储在httpOnly cookie中的JWT令牌是标准方法。在后端使用jsonwebtoken等库，并将用户上下文存储在React中。对于生产环境，考虑通过Passport.js或Auth0/Clerk使用OAuth提供商（Google、GitHub）以便更容易实现。',
    
    faq5q: '处理文件上传的最佳方式是什么？',
    faq5a: '使用multer在后端处理multipart/form-data，然后将文件存储在云存储中（AWS S3、Cloudinary或Supabase Storage）。切勿将上传的文件直接存储在服务器上。对于图像，考虑在存储前使用Sharp进行处理。',
    
    faq6q: '如何部署MERN应用？',
    faq6a: '将前端部署到Vercel、Netlify或AWS S3+CloudFront。将后端部署到Railway、Render、Fly.io或AWS ECS。使用MongoDB Atlas作为数据库。为API URL和数据库连接设置环境变量。考虑使用Docker进行一致的部署。',
    
    faq7q: '我应该使用Redux还是Zustand进行状态管理？',
    faq7a: '对于大多数应用，Zustand更简单且足够。Redux Toolkit仍然适用于具有许多相互连接状态的复杂应用。React Query（TanStack Query）出色地处理服务器状态，减少了对全局状态管理的需求。',
    
    faq8q: '如何扩展MERN应用？',
    faq8a: '通过在负载均衡器后面运行多个Node.js实例来水平扩展。使用MongoDB副本集和分片进行数据库扩展。使用Redis实现缓存。随着增长，考虑迁移到微服务架构。为静态资源使用CDN。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function MernStack2025Guide({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      {/* Key Takeaways */}
      <h2 style={h2Style}>{ct.takeawaysTitle}</h2>
      <div style={{ ...boxStyle, borderLeft: '4px solid #22c55e' }}>
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{ct.takeaway1}</li>
          <li>{ct.takeaway2}</li>
          <li>{ct.takeaway3}</li>
          <li>{ct.takeaway4}</li>
          <li>{ct.takeaway5}</li>
          <li>{ct.takeaway6}</li>
        </ul>
      </div>

      {/* Overview */}
      <h2 style={h2Style}>{ct.whatIsMernTitle}</h2>
      <p style={pStyle}>{ct.whatIsMernContent}</p>

      {/* Modern Architecture */}
      <h2 style={h2Style}>{ct.modernStackTitle}</h2>
      <p style={pStyle}>{ct.modernStackIntro}</p>

      <h3 style={{ ...h3Style, color: '#61dafb' }}>{ct.frontendTitle}</h3>
      <p style={pStyle}>{ct.frontendContent}</p>

      <h3 style={{ ...h3Style, color: '#68a063' }}>{ct.backendTitle}</h3>
      <p style={pStyle}>{ct.backendContent}</p>

      <h3 style={{ ...h3Style, color: '#47a248' }}>{ct.databaseTitle}</h3>
      <p style={pStyle}>{ct.databaseContent}</p>

      {/* Project Structure */}
      <h2 style={h2Style}>{ct.projectStructureTitle}</h2>
      <p style={pStyle}>{ct.projectStructureIntro}</p>

      <pre style={codeStyle}><code>{`my-mern-app/
├── apps/
│   ├── web/                    # React frontend (Vite)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   ├── api/
│   │   │   └── types/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── api/                    # Express backend
│       ├── src/
│       │   ├── controllers/
│       │   ├── services/
│       │   ├── models/
│       │   ├── middleware/
│       │   ├── routes/
│       │   ├── utils/
│       │   └── types/
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   └── shared-types/           # Shared TypeScript types
│       ├── src/
│       └── package.json
├── package.json                # Root package.json
├── pnpm-workspace.yaml         # pnpm workspace config
├── turbo.json                  # Turborepo config
└── docker-compose.yml          # Development services`}</code></pre>

      {/* Setup Guide */}
      <h2 style={h2Style}>{ct.setupGuideTitle}</h2>
      <p style={pStyle}>{ct.setupGuideIntro}</p>

      <h3 style={h3Style}>{ct.step1Title}</h3>
      <pre style={codeStyle}><code>{`# Create project directory
mkdir my-mern-app && cd my-mern-app

# Initialize pnpm workspace
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'apps/*'
  - 'packages/*'
EOF

# Root package.json
cat > package.json << 'EOF'
{
  "name": "my-mern-app",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  }
}
EOF

# Install dependencies
pnpm install`}</code></pre>

      <h3 style={h3Style}>{ct.step2Title}</h3>
      <pre style={codeStyle}><code>{`# Create backend app
mkdir -p apps/api/src/{controllers,services,models,middleware,routes,utils}

# Backend package.json
cat > apps/api/package.json << 'EOF'
{
  "name": "@myapp/api",
  "version": "1.0.0",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.0",
    "mongoose": "^8.0.0",
    "zod": "^3.22.0",
    "helmet": "^7.1.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.16",
    "@types/node": "^20.9.0",
    "tsx": "^4.1.0",
    "typescript": "^5.2.0"
  }
}
EOF`}</code></pre>

      <h3 style={h3Style}>{ct.step3Title}</h3>
      <pre style={codeStyle}><code>{`# Create frontend with Vite
mkdir -p apps/web
cd apps/web
pnpm create vite . --template react-ts

# Install additional dependencies
pnpm add react-router-dom zustand @tanstack/react-query axios
pnpm add -D tailwindcss postcss autoprefixer

# Setup Tailwind
npx tailwindcss init -p

# Update tailwind.config.js
# content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]`}</code></pre>

      {/* Best Practices */}
      <h2 style={h2Style}>{ct.bestPracticesTitle}</h2>
      <p style={pStyle}>{ct.bestPracticesIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>{isZh ? '错误处理' : 'Error Handling'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '使用集中的错误处理中间件。为API响应创建一致的格式。使用Zod验证输入。永远不要向客户端暴露堆栈跟踪。' : 'Use centralized error handling middleware. Create consistent format for API responses. Use Zod for input validation. Never expose stack traces to clients.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>{isZh ? '环境变量' : 'Environment Variables'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '使用dotenv管理环境变量。永远不要提交.env文件。对不同环境使用不同的.env文件。验证必需的环境变量。' : 'Use dotenv for environment variables. Never commit .env files. Use separate .env files for different environments. Validate required environment variables.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>{isZh ? '日志记录' : 'Logging'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '使用结构化日志（Winston或Pino）。包含请求ID进行追踪。为生产环境配置适当的日志级别。集中化日志收集。' : 'Use structured logging (Winston or Pino). Include request IDs for tracing. Configure appropriate log levels for production. Centralize log aggregation.'}
          </p>
        </div>
      </div>

      {/* Security */}
      <h2 style={h2Style}>{ct.securityTitle}</h2>
      <p style={pStyle}>{ct.securityIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '安全措施' : 'Security Measure'}</th>
              <th style={thStyle}>{isZh ? '实现' : 'Implementation'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Helmet安全头' : 'Helmet Security Headers', 'app.use(helmet())'],
              [isZh ? 'CORS配置' : 'CORS Configuration', 'app.use(cors({ origin: config.allowedOrigins }))'],
              [isZh ? '速率限制' : 'Rate Limiting', 'express-rate-limit'],
              [isZh ? '输入验证' : 'Input Validation', 'Zod schemas'],
              [isZh ? 'XSS防护' : 'XSS Protection', 'helmet + 输入清理'],
              [isZh ? 'NoSQL注入防护' : 'NoSQL Injection', 'mongoose schemas + 参数化查询'],
              [isZh ? '认证' : 'Authentication', 'JWT + httpOnly cookies'],
            ].map(([measure, impl], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{measure}</td>
                <td style={tdStyle}>{impl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Deployment */}
      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '服务' : 'Service'}</th>
              <th style={thStyle}>{isZh ? '前端' : 'Frontend'}</th>
              <th style={thStyle}>{isZh ? '后端' : 'Backend'}</th>
              <th style={thStyle}>Database</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Vercel + Railway', 'Vercel', 'Railway', 'MongoDB Atlas'],
              ['Netlify + Render', 'Netlify', 'Render', 'MongoDB Atlas'],
              ['AWS', 'S3+CloudFront', 'ECS/EC2', 'MongoDB Atlas'],
              ['Full Platform', 'Vercel', 'Vercel Serverless', 'MongoDB Atlas'],
            ].map(([service, frontend, backend, db], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{service}</td>
                <td style={tdStyle}>{frontend}</td>
                <td style={tdStyle}>{backend}</td>
                <td style={tdStyle}>{db}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(97,218,251,0.1), rgba(104,160,99,0.1))', borderRadius: 12, border: '1px solid rgba(97,218,251,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#61dafb', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/uuid-generator`} style={{ color: '#61dafb', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#61dafb', textDecoration: 'none' }}>JWT Decoder</a>
      </div>

      {/* FAQ */}
      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
        [ct.faq7q, ct.faq7a],
        [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
