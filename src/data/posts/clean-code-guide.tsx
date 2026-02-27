'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Clean Code: Principles, Practices and Patterns for Writing Maintainable Software',
    description:
      'Master clean code principles: naming conventions, function design (SRP, small functions), code smells and refactoring, SOLID principles, DRY/KISS/YAGNI, comments and documentation, error handling patterns, testing and code quality, code review best practices, design by contract, clean architecture layers, and practical refactoring examples with before/after code.',
  },
  zh: {
    title: '整洁代码：编写可维护软件的原则、实践与模式',
    description:
      '掌握整洁代码原则：命名规范、函数设计（SRP、小函数）、代码异味与重构、SOLID 原则、DRY/KISS/YAGNI、注释与文档、错误处理模式、测试与代码质量、代码审查最佳实践、契约式设计、整洁架构分层，以及包含重构前后对比的实战示例。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is clean code and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Clean code is code that is easy to read, understand, and modify. It matters because developers spend far more time reading code than writing it — studies suggest the ratio is 10:1. Clean code reduces bugs, lowers onboarding time for new team members, decreases maintenance costs, and makes refactoring safer. Writing clean code is a professional discipline that pays dividends throughout the lifetime of a software project.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the SOLID principles in software design?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SOLID is an acronym for five design principles: Single Responsibility Principle (a class should have one reason to change), Open/Closed Principle (open for extension, closed for modification), Liskov Substitution Principle (subtypes must be substitutable for their base types), Interface Segregation Principle (prefer many specific interfaces over one general interface), and Dependency Inversion Principle (depend on abstractions, not concrete implementations). Together they promote loosely coupled, highly cohesive, and maintainable code.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between DRY, KISS, and YAGNI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DRY (Don\'t Repeat Yourself) means every piece of knowledge should have a single authoritative representation — avoid duplicating logic. KISS (Keep It Simple, Stupid) means prefer the simplest solution that works — avoid unnecessary complexity. YAGNI (You Aren\'t Gonna Need It) means don\'t build features or abstractions until you actually need them. These three principles complement each other: DRY eliminates duplication, KISS fights over-engineering, and YAGNI prevents speculative design.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I identify code smells and when should I refactor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Code smells are symptoms of deeper design problems. Common smells include: long methods (over 20 lines), large classes, duplicate code, long parameter lists (more than 3 parameters), feature envy (a method using another class\'s data more than its own), and primitive obsession (overusing primitives instead of domain objects). Refactor when you encounter a smell during development (Boy Scout Rule), before adding new features to affected code, or when bugs cluster in a particular module.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are good naming conventions for variables, functions, and classes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Good names are intention-revealing, pronounceable, and searchable. Variables should describe what they hold (userAge, not x). Functions should describe what they do using verb phrases (calculateTotalPrice, not process). Classes should be nouns describing what they represent (InvoiceGenerator, not Manager). Booleans should read as questions (isActive, hasPermission). Avoid abbreviations, single-letter names (except loop indices), and generic names like data, info, or temp.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should I write functions for clean code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Clean functions should be small (ideally under 20 lines), do exactly one thing (Single Responsibility), operate at one level of abstraction, have descriptive names, take few arguments (0-2 ideal, 3 maximum), have no side effects, and either return a value (query) or change state (command) but not both (Command-Query Separation). Extract nested logic into well-named helper functions. Each function should read like a paragraph in a well-written essay.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best practices for error handling in clean code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prefer exceptions over error codes for cleaner control flow. Write try-catch blocks first when implementing error-prone code. Create custom exception classes for domain-specific errors. Never return null — use Optional/Maybe types or throw exceptions instead. Never pass null as a function argument. Log errors with full context (what, where, why) at appropriate levels. Handle errors at the right level of abstraction — low-level code throws, high-level code catches and handles.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do clean architecture layers work and why are they important?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Clean Architecture organizes code into concentric layers: Entities (core business rules), Use Cases (application-specific logic), Interface Adapters (controllers, presenters, gateways), and Frameworks/Drivers (web frameworks, databases, external services). The dependency rule states that dependencies must point inward — inner layers must not know about outer layers. This structure makes the codebase testable without frameworks, independent of UI and database choices, and resilient to external changes.',
      },
    },
  ],
};

export default function CleanCodeGuide({ lang }: { lang: string }) {
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

  const strongStyle: React.CSSProperties = {
    color: '#1e293b',
    fontWeight: '600',
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', marginBottom: '16px' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7' }}>
          {t.description}
        </p>
      </header>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          {isZh ? 'TL;DR — 60 秒速览整洁代码原则' : 'TL;DR — Clean Code Principles in 60 Seconds'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.9' }}>
          <li>{isZh ? '命名即文档：变量、函数、类的名字应该揭示意图，消除猜测' : 'Names are documentation: variables, functions, and classes should reveal intent and eliminate guessing'}</li>
          <li>{isZh ? '函数要小、只做一件事、保持单一抽象层级' : 'Functions should be small, do one thing, and operate at a single level of abstraction'}</li>
          <li>{isZh ? 'SOLID 原则是面向对象设计的基石：SRP、OCP、LSP、ISP、DIP' : 'SOLID principles are the foundation of OO design: SRP, OCP, LSP, ISP, DIP'}</li>
          <li>{isZh ? 'DRY 消除重复，KISS 抵抗过度工程，YAGNI 防止投机设计' : 'DRY eliminates duplication, KISS fights over-engineering, YAGNI prevents speculative design'}</li>
          <li>{isZh ? '代码异味是深层设计问题的信号——识别并通过重构消除它们' : 'Code smells signal deeper design problems — identify and eliminate them through refactoring'}</li>
          <li>{isZh ? '错误处理优先使用异常而非错误码，永远不要返回或传递 null' : 'Prefer exceptions over error codes for error handling, never return or pass null'}</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <strong style={{ fontSize: '1rem', color: '#334155', display: 'block', marginBottom: '10px' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.9' }}>
          <li>{isZh ? '整洁代码的核心是可读性——代码读写比例约为 10:1' : 'The core of clean code is readability — the read-to-write ratio is roughly 10:1'}</li>
          <li>{isZh ? '好的命名能消除注释的需要：如果你需要注释来解释代码，先尝试重命名' : 'Good naming eliminates the need for comments: if you need a comment, try renaming first'}</li>
          <li>{isZh ? '每个函数应该是一个小故事：一个标题（名字）、一个情节（逻辑）、一个结局（返回值）' : 'Each function should be a short story: a title (name), a plot (logic), and an ending (return value)'}</li>
          <li>{isZh ? 'SOLID 原则帮助创建松耦合、高内聚的系统' : 'SOLID principles help create loosely coupled, highly cohesive systems'}</li>
          <li>{isZh ? '重构是持续的过程，不是一次性事件——遵循童子军规则' : 'Refactoring is a continuous process, not a one-time event — follow the Boy Scout Rule'}</li>
          <li>{isZh ? '代码审查是团队提升代码质量的最有效手段' : 'Code review is the most effective way for teams to improve code quality'}</li>
          <li>{isZh ? '整洁架构让系统可测试、独立于框架，并对变化有弹性' : 'Clean Architecture makes systems testable, framework-independent, and resilient to change'}</li>
        </ul>
      </div>

      {/* --- Section 1: Naming Conventions --- */}
      <h2 style={h2Style}>
        {isZh ? '1. 命名规范：让代码自文档化' : '1. Naming Conventions: Self-Documenting Code'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '命名是编程中最重要也最被低估的技能。一个好的名字可以消除对注释的需要，而一个糟糕的名字会让每个读代码的人浪费时间。名字应该揭示意图、防止误导、并且可以搜索。'
          : 'Naming is the most important and most underrated skill in programming. A good name eliminates the need for comments, while a bad name wastes time for everyone reading the code. Names should reveal intent, prevent disinformation, and be searchable.'}
      </p>

      <h3 style={h3Style}>{isZh ? '变量命名规则' : 'Variable Naming Rules'}</h3>
      <pre style={preStyle}><code>{'// Bad: What does d mean? What are these numbers?\n'
        + 'const d = 86400;\n'
        + 'const x = users.filter(u => u.a > 18);\n'
        + 'let flag = true;\n'
        + '\n'
        + '// Good: Intention-revealing names\n'
        + 'const SECONDS_PER_DAY = 86400;\n'
        + 'const adultUsers = users.filter(user => user.age > 18);\n'
        + 'let isEligibleForDiscount = true;'}</code></pre>

      <h3 style={h3Style}>{isZh ? '函数命名规则' : 'Function Naming Rules'}</h3>
      <pre style={preStyle}><code>{'// Bad: vague verb, unclear purpose\n'
        + 'function process(data) { /* ... */ }\n'
        + 'function handle(req) { /* ... */ }\n'
        + 'function doStuff(items) { /* ... */ }\n'
        + '\n'
        + '// Good: verb + noun, describes action\n'
        + 'function calculateMonthlyRevenue(transactions) { /* ... */ }\n'
        + 'function validateEmailAddress(email) { /* ... */ }\n'
        + 'function sendWelcomeNotification(user) { /* ... */ }'}</code></pre>

      <h3 style={h3Style}>{isZh ? '布尔值与类命名' : 'Boolean & Class Naming'}</h3>
      <pre style={preStyle}><code>{'// Booleans should read as yes/no questions\n'
        + 'const isActive = true;\n'
        + 'const hasPermission = user.roles.includes("admin");\n'
        + 'const canEditDocument = !doc.isLocked && hasPermission;\n'
        + 'const shouldRetry = attempts < MAX_RETRIES;\n'
        + '\n'
        + '// Classes: nouns that describe what they represent\n'
        + 'class InvoiceGenerator { /* ... */ }    // Good\n'
        + 'class UserRepository { /* ... */ }       // Good\n'
        + 'class OrderValidator { /* ... */ }       // Good\n'
        + 'class DataManager { /* ... */ }          // Bad: too generic\n'
        + 'class Utility { /* ... */ }              // Bad: meaningless'}</code></pre>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '规则' : 'Rule'}</th>
            <th style={thStyle}>{isZh ? '差' : 'Bad'}</th>
            <th style={thStyle}>{isZh ? '好' : 'Good'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '揭示意图' : 'Reveal intent'}</td><td style={tdStyle}>d, temp, val</td><td style={tdStyle}>elapsedDays, currentUser</td></tr>
          <tr><td style={tdStyle}>{isZh ? '避免误导' : 'Avoid disinformation'}</td><td style={tdStyle}>accountList (not a List)</td><td style={tdStyle}>accounts, accountGroup</td></tr>
          <tr><td style={tdStyle}>{isZh ? '可搜索' : 'Searchable'}</td><td style={tdStyle}>7, e, t</td><td style={tdStyle}>MAX_RETRIES, error, task</td></tr>
          <tr><td style={tdStyle}>{isZh ? '可发音' : 'Pronounceable'}</td><td style={tdStyle}>genymdhms, modymdhms</td><td style={tdStyle}>generationTimestamp</td></tr>
          <tr><td style={tdStyle}>{isZh ? '一致性' : 'Consistent'}</td><td style={tdStyle}>fetch/get/retrieve mixed</td><td style={tdStyle}>get everywhere</td></tr>
        </tbody>
      </table>

      {/* --- Section 2: Function Design --- */}
      <h2 style={h2Style}>
        {isZh ? '2. 函数设计：小、专注、单一职责' : '2. Function Design: Small, Focused, Single Responsibility'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '函数是代码的基本构建单元。整洁的函数应该很小（理想情况下不超过 20 行），只做一件事，参数尽量少，不产生副作用，并在一个抽象层级上运作。'
          : 'Functions are the fundamental building blocks of code. Clean functions should be small (ideally under 20 lines), do exactly one thing, take few arguments, have no side effects, and operate at a single level of abstraction.'}
      </p>

      <h3 style={h3Style}>{isZh ? '重构前：一个做太多事情的函数' : 'Before: A Function That Does Too Much'}</h3>
      <pre style={preStyle}><code>{'// Bad: This function validates, transforms, saves, AND sends email\n'
        + 'function processOrder(orderData) {\n'
        + '  // Validation\n'
        + '  if (!orderData.items || orderData.items.length === 0) {\n'
        + '    throw new Error("No items");\n'
        + '  }\n'
        + '  if (!orderData.customer.email) {\n'
        + '    throw new Error("No email");\n'
        + '  }\n'
        + '  for (const item of orderData.items) {\n'
        + '    if (item.quantity <= 0) throw new Error("Bad quantity");\n'
        + '    if (item.price < 0) throw new Error("Bad price");\n'
        + '  }\n'
        + '\n'
        + '  // Calculation\n'
        + '  let total = 0;\n'
        + '  for (const item of orderData.items) {\n'
        + '    total += item.price * item.quantity;\n'
        + '  }\n'
        + '  const tax = total * 0.1;\n'
        + '  const finalTotal = total + tax;\n'
        + '\n'
        + '  // Save to database\n'
        + '  const order = db.orders.insert({\n'
        + '    ...orderData,\n'
        + '    total: finalTotal,\n'
        + '    tax,\n'
        + '    status: "pending",\n'
        + '    createdAt: new Date()\n'
        + '  });\n'
        + '\n'
        + '  // Send email\n'
        + '  emailService.send({\n'
        + '    to: orderData.customer.email,\n'
        + '    subject: "Order Confirmation",\n'
        + '    body: "Your order total is " + finalTotal\n'
        + '  });\n'
        + '\n'
        + '  return order;\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{isZh ? '重构后：每个函数只做一件事' : 'After: Each Function Does One Thing'}</h3>
      <pre style={preStyle}><code>{'// Good: Orchestrator function at a high abstraction level\n'
        + 'function processOrder(orderData) {\n'
        + '  validateOrder(orderData);\n'
        + '  const pricing = calculateOrderPricing(orderData.items);\n'
        + '  const order = saveOrder(orderData, pricing);\n'
        + '  sendOrderConfirmation(order);\n'
        + '  return order;\n'
        + '}\n'
        + '\n'
        + '// Each function is small, focused, and testable\n'
        + 'function validateOrder(orderData) {\n'
        + '  if (!orderData.items?.length) {\n'
        + '    throw new InvalidOrderError("Order must contain items");\n'
        + '  }\n'
        + '  if (!orderData.customer?.email) {\n'
        + '    throw new InvalidOrderError("Customer email required");\n'
        + '  }\n'
        + '  orderData.items.forEach(validateLineItem);\n'
        + '}\n'
        + '\n'
        + 'function validateLineItem(item) {\n'
        + '  if (item.quantity <= 0) throw new InvalidOrderError("Quantity must be positive");\n'
        + '  if (item.price < 0) throw new InvalidOrderError("Price cannot be negative");\n'
        + '}\n'
        + '\n'
        + 'function calculateOrderPricing(items) {\n'
        + '  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);\n'
        + '  const tax = subtotal * TAX_RATE;\n'
        + '  return { subtotal, tax, total: subtotal + tax };\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{isZh ? '函数参数：越少越好' : 'Function Arguments: Fewer Is Better'}</h3>
      <pre style={preStyle}><code>{'// Bad: Too many positional arguments\n'
        + 'function createUser(name, email, age, role, department, isActive) {\n'
        + '  /* ... */\n'
        + '}\n'
        + 'createUser("Alice", "a@b.com", 30, "admin", "eng", true);\n'
        + '\n'
        + '// Good: Use an options object for 3+ parameters\n'
        + 'function createUser({ name, email, age, role, department, isActive }) {\n'
        + '  /* ... */\n'
        + '}\n'
        + 'createUser({\n'
        + '  name: "Alice",\n'
        + '  email: "a@b.com",\n'
        + '  age: 30,\n'
        + '  role: "admin",\n'
        + '  department: "eng",\n'
        + '  isActive: true,\n'
        + '});'}</code></pre>

      {/* --- Section 3: Code Smells & Refactoring --- */}
      <h2 style={h2Style}>
        {isZh ? '3. 代码异味与重构' : '3. Code Smells and Refactoring'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '代码异味（Code Smell）是 Martin Fowler 提出的概念，指代码中暗示更深层设计问题的表面迹象。异味本身不是 Bug，但它们增加了 Bug 出现的概率和维护的难度。识别异味是重构的第一步。'
          : 'Code smells, a concept coined by Martin Fowler, are surface-level indicators in code that hint at deeper design problems. Smells are not bugs themselves, but they increase the probability of bugs and the difficulty of maintenance. Identifying smells is the first step toward refactoring.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '异味' : 'Smell'}</th>
            <th style={thStyle}>{isZh ? '症状' : 'Symptom'}</th>
            <th style={thStyle}>{isZh ? '重构方法' : 'Refactoring'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '长方法' : 'Long Method'}</td><td style={tdStyle}>{isZh ? '超过 20 行，多层嵌套' : '>20 lines, deep nesting'}</td><td style={tdStyle}>Extract Method</td></tr>
          <tr><td style={tdStyle}>{isZh ? '大类' : 'Large Class'}</td><td style={tdStyle}>{isZh ? '多个不相关的职责' : 'Multiple unrelated responsibilities'}</td><td style={tdStyle}>Extract Class</td></tr>
          <tr><td style={tdStyle}>{isZh ? '重复代码' : 'Duplicate Code'}</td><td style={tdStyle}>{isZh ? '相似逻辑在多处出现' : 'Similar logic in multiple places'}</td><td style={tdStyle}>Extract Method / Template Method</td></tr>
          <tr><td style={tdStyle}>{isZh ? '长参数列表' : 'Long Parameter List'}</td><td style={tdStyle}>{isZh ? '超过 3 个参数' : 'More than 3 parameters'}</td><td style={tdStyle}>Introduce Parameter Object</td></tr>
          <tr><td style={tdStyle}>{isZh ? '特性依恋' : 'Feature Envy'}</td><td style={tdStyle}>{isZh ? '方法过多使用其他类的数据' : 'Method uses other class data excessively'}</td><td style={tdStyle}>Move Method</td></tr>
          <tr><td style={tdStyle}>{isZh ? '基本类型偏执' : 'Primitive Obsession'}</td><td style={tdStyle}>{isZh ? '用字符串/数字代替领域对象' : 'Strings/numbers instead of domain objects'}</td><td style={tdStyle}>Replace with Value Object</td></tr>
          <tr><td style={tdStyle}>{isZh ? '开关语句' : 'Switch Statements'}</td><td style={tdStyle}>{isZh ? '长 switch/if-else 链' : 'Long switch/if-else chains'}</td><td style={tdStyle}>Replace with Polymorphism</td></tr>
          <tr><td style={tdStyle}>{isZh ? '死代码' : 'Dead Code'}</td><td style={tdStyle}>{isZh ? '永远不会执行的代码' : 'Code that is never executed'}</td><td style={tdStyle}>Delete it</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? '重构示例：消除 Switch 语句' : 'Refactoring Example: Eliminating Switch Statements'}</h3>
      <pre style={preStyle}><code>{'// Before: Switch statement that will grow with each new type\n'
        + 'function calculateShippingCost(order) {\n'
        + '  switch (order.shippingType) {\n'
        + '    case "standard":\n'
        + '      return order.weight * 1.5;\n'
        + '    case "express":\n'
        + '      return order.weight * 3.0 + 5;\n'
        + '    case "overnight":\n'
        + '      return order.weight * 5.0 + 15;\n'
        + '    default:\n'
        + '      throw new Error("Unknown shipping type");\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// After: Strategy pattern — open for extension, closed for modification\n'
        + 'const shippingStrategies = {\n'
        + '  standard:  (weight) => weight * 1.5,\n'
        + '  express:   (weight) => weight * 3.0 + 5,\n'
        + '  overnight: (weight) => weight * 5.0 + 15,\n'
        + '};\n'
        + '\n'
        + 'function calculateShippingCost(order) {\n'
        + '  const strategy = shippingStrategies[order.shippingType];\n'
        + '  if (!strategy) {\n'
        + '    throw new UnknownShippingTypeError(order.shippingType);\n'
        + '  }\n'
        + '  return strategy(order.weight);\n'
        + '}'}</code></pre>

      {/* --- Section 4: SOLID Principles --- */}
      <h2 style={h2Style}>
        {isZh ? '4. SOLID 原则详解' : '4. SOLID Principles Deep Dive'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'SOLID 是面向对象设计的五个核心原则，由 Robert C. Martin 整理推广。这些原则帮助创建松耦合、高内聚、易扩展的系统。即使在函数式编程和现代 JavaScript/TypeScript 中，SOLID 的思想同样适用。'
          : 'SOLID represents five core principles of object-oriented design, popularized by Robert C. Martin. These principles help create loosely coupled, highly cohesive, and extensible systems. Even in functional programming and modern JavaScript/TypeScript, the ideas behind SOLID remain relevant.'}
      </p>

      <h3 style={h3Style}>S — {isZh ? '单一职责原则 (SRP)' : 'Single Responsibility Principle (SRP)'}</h3>
      <p style={pStyle}>
        {isZh
          ? '一个类或模块应该只有一个改变的理由。如果一个类同时处理业务逻辑和数据库访问，它就有两个改变的理由。'
          : 'A class or module should have only one reason to change. If a class handles both business logic and database access, it has two reasons to change.'}
      </p>
      <pre style={preStyle}><code>{'// Violates SRP: Report class does formatting AND data access\n'
        + 'class Report {\n'
        + '  getData() { /* queries database */ }\n'
        + '  formatAsHTML() { /* builds HTML string */ }\n'
        + '  formatAsPDF() { /* generates PDF */ }\n'
        + '  sendEmail() { /* sends report via email */ }\n'
        + '}\n'
        + '\n'
        + '// Follows SRP: Each class has one responsibility\n'
        + 'class ReportDataProvider {\n'
        + '  getData() { /* queries database */ }\n'
        + '}\n'
        + '\n'
        + 'class HTMLReportFormatter {\n'
        + '  format(data) { /* builds HTML string */ }\n'
        + '}\n'
        + '\n'
        + 'class PDFReportFormatter {\n'
        + '  format(data) { /* generates PDF */ }\n'
        + '}\n'
        + '\n'
        + 'class ReportEmailSender {\n'
        + '  send(report, recipient) { /* sends report via email */ }\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>O — {isZh ? '开闭原则 (OCP)' : 'Open/Closed Principle (OCP)'}</h3>
      <p style={pStyle}>
        {isZh
          ? '软件实体应该对扩展开放，对修改关闭。添加新功能时不应该修改已有的、经过测试的代码。'
          : 'Software entities should be open for extension but closed for modification. Adding new features should not require modifying existing, tested code.'}
      </p>
      <pre style={preStyle}><code>{'// Violates OCP: Must modify this function for every new shape\n'
        + 'function calculateArea(shape) {\n'
        + '  if (shape.type === "circle") return Math.PI * shape.radius ** 2;\n'
        + '  if (shape.type === "rectangle") return shape.width * shape.height;\n'
        + '  // Adding triangle requires modifying this function\n'
        + '}\n'
        + '\n'
        + '// Follows OCP: New shapes extend without modifying existing code\n'
        + 'interface Shape {\n'
        + '  area(): number;\n'
        + '}\n'
        + '\n'
        + 'class Circle implements Shape {\n'
        + '  constructor(private radius: number) {}\n'
        + '  area() { return Math.PI * this.radius ** 2; }\n'
        + '}\n'
        + '\n'
        + 'class Rectangle implements Shape {\n'
        + '  constructor(private width: number, private height: number) {}\n'
        + '  area() { return this.width * this.height; }\n'
        + '}\n'
        + '\n'
        + '// Adding Triangle requires zero changes to existing code\n'
        + 'class Triangle implements Shape {\n'
        + '  constructor(private base: number, private height: number) {}\n'
        + '  area() { return 0.5 * this.base * this.height; }\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>L — {isZh ? '里氏替换原则 (LSP)' : 'Liskov Substitution Principle (LSP)'}</h3>
      <p style={pStyle}>
        {isZh
          ? '子类型必须能够替换其基类型而不破坏程序的正确性。经典的反例是 Square 继承 Rectangle——设置宽度不应意外改变高度。'
          : 'Subtypes must be substitutable for their base types without breaking program correctness. The classic violation is Square extending Rectangle — setting width should not unexpectedly change height.'}
      </p>

      <h3 style={h3Style}>I — {isZh ? '接口隔离原则 (ISP)' : 'Interface Segregation Principle (ISP)'}</h3>
      <p style={pStyle}>
        {isZh
          ? '客户端不应该被迫依赖它不使用的接口。宁可有多个专用的小接口，也不要一个大而全的接口。'
          : 'Clients should not be forced to depend on interfaces they do not use. Prefer many specific, small interfaces over one large, general-purpose interface.'}
      </p>
      <pre style={preStyle}><code>{'// Violates ISP: Printer interface forces all implementations\n'
        + '// to implement methods they may not support\n'
        + 'interface Printer {\n'
        + '  print(doc: Document): void;\n'
        + '  scan(doc: Document): void;\n'
        + '  fax(doc: Document): void;\n'
        + '  staple(doc: Document): void;\n'
        + '}\n'
        + '\n'
        + '// Follows ISP: Segregated interfaces\n'
        + 'interface Printable {\n'
        + '  print(doc: Document): void;\n'
        + '}\n'
        + 'interface Scannable {\n'
        + '  scan(doc: Document): void;\n'
        + '}\n'
        + 'interface Faxable {\n'
        + '  fax(doc: Document): void;\n'
        + '}\n'
        + '\n'
        + '// Simple printer only implements what it needs\n'
        + 'class SimplePrinter implements Printable {\n'
        + '  print(doc: Document) { /* ... */ }\n'
        + '}\n'
        + '\n'
        + '// Multi-function device implements multiple interfaces\n'
        + 'class MultiFunctionDevice implements Printable, Scannable, Faxable {\n'
        + '  print(doc: Document) { /* ... */ }\n'
        + '  scan(doc: Document) { /* ... */ }\n'
        + '  fax(doc: Document) { /* ... */ }\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>D — {isZh ? '依赖倒置原则 (DIP)' : 'Dependency Inversion Principle (DIP)'}</h3>
      <p style={pStyle}>
        {isZh
          ? '高层模块不应该依赖低层模块，两者都应该依赖抽象。抽象不应该依赖细节，细节应该依赖抽象。'
          : 'High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.'}
      </p>
      <pre style={preStyle}><code>{'// Violates DIP: High-level OrderService depends on low-level MySQLDatabase\n'
        + 'class OrderService {\n'
        + '  private db = new MySQLDatabase(); // tightly coupled\n'
        + '  save(order) { this.db.query("INSERT INTO ..."); }\n'
        + '}\n'
        + '\n'
        + '// Follows DIP: Depend on abstraction, inject implementation\n'
        + 'interface OrderRepository {\n'
        + '  save(order: Order): Promise<void>;\n'
        + '  findById(id: string): Promise<Order | null>;\n'
        + '}\n'
        + '\n'
        + 'class OrderService {\n'
        + '  constructor(private repo: OrderRepository) {} // injected\n'
        + '  async placeOrder(order: Order) {\n'
        + '    await this.repo.save(order);\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// Now you can swap implementations freely\n'
        + 'class MySQLOrderRepo implements OrderRepository { /* ... */ }\n'
        + 'class MongoOrderRepo implements OrderRepository { /* ... */ }\n'
        + 'class InMemoryOrderRepo implements OrderRepository { /* ... */ } // for tests'}</code></pre>

      {/* --- Section 5: DRY / KISS / YAGNI --- */}
      <h2 style={h2Style}>
        {isZh ? '5. DRY、KISS 与 YAGNI' : '5. DRY, KISS, and YAGNI'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '这三个原则是软件开发的黄金三角。DRY 消除重复，KISS 抵抗复杂性，YAGNI 防止过度设计。它们互相补充，但也需要平衡——过度追求 DRY 可能导致不必要的抽象，违反 KISS。'
          : 'These three principles form the golden triangle of software development. DRY eliminates duplication, KISS fights complexity, and YAGNI prevents over-design. They complement each other, but balance is needed — excessive DRY can lead to unnecessary abstractions that violate KISS.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '原则' : 'Principle'}</th>
            <th style={thStyle}>{isZh ? '含义' : 'Meaning'}</th>
            <th style={thStyle}>{isZh ? '违反的信号' : 'Violation Signal'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong style={strongStyle}>DRY</strong></td>
            <td style={tdStyle}>{isZh ? '每条知识只在一个地方表达' : 'Every piece of knowledge in a single place'}</td>
            <td style={tdStyle}>{isZh ? '改一个逻辑需要改多处' : 'Changing one thing requires changes in many places'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong style={strongStyle}>KISS</strong></td>
            <td style={tdStyle}>{isZh ? '选择最简单的可行方案' : 'Choose the simplest solution that works'}</td>
            <td style={tdStyle}>{isZh ? '团队成员难以理解代码' : 'Team members struggle to understand the code'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong style={strongStyle}>YAGNI</strong></td>
            <td style={tdStyle}>{isZh ? '不到需要时不构建' : 'Do not build until you actually need it'}</td>
            <td style={tdStyle}>{isZh ? '存在未使用的抽象层或功能' : 'Unused abstraction layers or features exist'}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? 'DRY 的正确与过度应用' : 'DRY: Correct vs Excessive Application'}</h3>
      <pre style={preStyle}><code>{'// Good DRY: Extract shared validation logic\n'
        + 'function validateEmail(email: string): boolean {\n'
        + '  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);\n'
        + '}\n'
        + '\n'
        + '// Used in multiple places — single source of truth\n'
        + 'function registerUser(data) { validateEmail(data.email); /* ... */ }\n'
        + 'function updateProfile(data) { validateEmail(data.email); /* ... */ }\n'
        + 'function inviteUser(email) { validateEmail(email); /* ... */ }\n'
        + '\n'
        + '// Bad DRY (over-abstraction): These look similar but serve\n'
        + '// different purposes and will diverge over time\n'
        + '// DO NOT force them into one generic function\n'
        + 'function formatUserForAdmin(user) {\n'
        + '  return { name: user.name, email: user.email, role: user.role };\n'
        + '}\n'
        + 'function formatUserForPublic(user) {\n'
        + '  return { name: user.name, avatar: user.avatar };\n'
        + '}\n'
        + '// These should stay separate — they change for different reasons'}</code></pre>

      {/* --- Section 6: Comments and Documentation --- */}
      <h2 style={h2Style}>
        {isZh ? '6. 注释与文档' : '6. Comments and Documentation'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '好的代码应该是自解释的。注释不是用来解释代码做什么（What），而是解释为什么这样做（Why）。如果你需要注释来解释一段代码做什么，优先考虑重命名变量或提取函数来让代码自文档化。'
          : 'Good code should be self-explanatory. Comments should not explain what code does (that is the job of good naming), but why it does it. If you need a comment to explain what a piece of code does, consider renaming variables or extracting functions to make the code self-documenting first.'}
      </p>

      <h3 style={h3Style}>{isZh ? '好注释 vs 坏注释' : 'Good Comments vs Bad Comments'}</h3>
      <pre style={preStyle}><code>{'// BAD: Restating the code (noise comment)\n'
        + '// Increment counter by one\n'
        + 'counter += 1;\n'
        + '\n'
        + '// BAD: Journal comments (use git log instead)\n'
        + '// 2024-01-15 - Added feature X\n'
        + '// 2024-01-16 - Fixed bug in feature X\n'
        + '\n'
        + '// BAD: Commented-out code (delete it, git has history)\n'
        + '// const oldValue = calculateLegacy(data);\n'
        + '// if (oldValue > threshold) { sendAlert(); }\n'
        + '\n'
        + '// GOOD: Explain WHY, not WHAT\n'
        + '// We use a 30-second timeout because the payment gateway\n'
        + '// occasionally takes 20+ seconds during peak hours\n'
        + 'const PAYMENT_TIMEOUT_MS = 30_000;\n'
        + '\n'
        + '// GOOD: Warn about consequences\n'
        + '// WARNING: This cache is shared across all tenants.\n'
        + '// Flushing it will cause a ~5 second latency spike.\n'
        + 'function flushGlobalCache() { /* ... */ }\n'
        + '\n'
        + '// GOOD: Explain complex business rules\n'
        + '// Tax-exempt if: registered non-profit AND purchase\n'
        + '// is for educational purposes (IRS ruling 2023-47)\n'
        + 'function isTaxExempt(org, purchase) { /* ... */ }\n'
        + '\n'
        + '// GOOD: TODO with context and ownership\n'
        + '// TODO(@alice): Replace with streaming API once backend\n'
        + '// supports SSE (tracked in JIRA-1234, ETA: Q2 2026)'}</code></pre>

      {/* --- Section 7: Error Handling Patterns --- */}
      <h2 style={h2Style}>
        {isZh ? '7. 错误处理模式' : '7. Error Handling Patterns'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '错误处理是整洁代码中经常被忽视的部分。好的错误处理应该使代码更健壮而不是更混乱。核心原则：使用异常而非错误码、永远不要返回或传递 null、在正确的抽象层级处理错误。'
          : 'Error handling is the most frequently overlooked aspect of clean code. Good error handling should make code more robust, not more cluttered. Core principles: prefer exceptions over error codes, never return or pass null, and handle errors at the right level of abstraction.'}
      </p>

      <h3 style={h3Style}>{isZh ? '自定义异常类层次结构' : 'Custom Exception Class Hierarchy'}</h3>
      <pre style={preStyle}><code>{'// Define a domain-specific error hierarchy\n'
        + 'class AppError extends Error {\n'
        + '  constructor(\n'
        + '    message: string,\n'
        + '    public readonly code: string,\n'
        + '    public readonly statusCode: number = 500,\n'
        + '    public readonly isOperational: boolean = true\n'
        + '  ) {\n'
        + '    super(message);\n'
        + '    this.name = this.constructor.name;\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + 'class NotFoundError extends AppError {\n'
        + '  constructor(resource: string, id: string) {\n'
        + '    super(\n'
        + '      `' + '\\${resource} with id \\${id} not found`' + ',\n'
        + '      "RESOURCE_NOT_FOUND",\n'
        + '      404\n'
        + '    );\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + 'class ValidationError extends AppError {\n'
        + '  constructor(public readonly fields: Record<string, string>) {\n'
        + '    super("Validation failed", "VALIDATION_ERROR", 400);\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// Usage: clear, specific, informative\n'
        + 'throw new NotFoundError("User", userId);\n'
        + 'throw new ValidationError({ email: "Invalid format", age: "Must be positive" });'}</code></pre>

      <h3 style={h3Style}>{isZh ? '永远不要返回 null' : 'Never Return Null'}</h3>
      <pre style={preStyle}><code>{'// Bad: Caller must always check for null\n'
        + 'function findUser(id: string): User | null {\n'
        + '  return db.users.find(u => u.id === id) || null;\n'
        + '}\n'
        + '// Every call site needs: if (user === null) { ... }\n'
        + '\n'
        + '// Better: Throw for "must exist" scenarios\n'
        + 'function getUser(id: string): User {\n'
        + '  const user = db.users.find(u => u.id === id);\n'
        + '  if (!user) throw new NotFoundError("User", id);\n'
        + '  return user;\n'
        + '}\n'
        + '\n'
        + '// Better: Return empty collection instead of null\n'
        + 'function getOrdersByUser(userId: string): Order[] {\n'
        + '  return db.orders.filter(o => o.userId === userId); // [] not null\n'
        + '}\n'
        + '\n'
        + '// Better: Use Optional/Result pattern for "may not exist"\n'
        + 'type Result<T, E = Error> =\n'
        + '  | { success: true; data: T }\n'
        + '  | { success: false; error: E };\n'
        + '\n'
        + 'function parseConfig(raw: string): Result<Config> {\n'
        + '  try {\n'
        + '    return { success: true, data: JSON.parse(raw) };\n'
        + '  } catch (e) {\n'
        + '    return { success: false, error: new Error("Invalid config") };\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* --- Section 8: Testing and Code Quality --- */}
      <h2 style={h2Style}>
        {isZh ? '8. 测试与代码质量' : '8. Testing and Code Quality'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '测试是整洁代码的守护者。没有测试的重构是冒险行为。测试代码本身也应该是整洁的——可读、可维护、遵循 AAA（Arrange-Act-Assert）模式。测试不仅验证正确性，还作为代码的活文档。'
          : 'Tests are the guardians of clean code. Refactoring without tests is reckless. Test code itself should also be clean — readable, maintainable, and following the AAA (Arrange-Act-Assert) pattern. Tests not only verify correctness but also serve as living documentation for the code.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'AAA 模式与清晰的测试' : 'AAA Pattern & Clean Tests'}</h3>
      <pre style={preStyle}><code>{'// Clean test: readable, focused, follows AAA\n'
        + 'describe("OrderPricingService", () => {\n'
        + '  describe("calculateTotal", () => {\n'
        + '    it("applies percentage discount to subtotal", () => {\n'
        + '      // Arrange\n'
        + '      const items = [\n'
        + '        { name: "Widget", price: 100, quantity: 2 },\n'
        + '        { name: "Gadget", price: 50, quantity: 1 },\n'
        + '      ];\n'
        + '      const discount = { type: "percentage", value: 10 };\n'
        + '\n'
        + '      // Act\n'
        + '      const total = calculateTotal(items, discount);\n'
        + '\n'
        + '      // Assert\n'
        + '      expect(total).toBe(225); // (200 + 50) * 0.9\n'
        + '    });\n'
        + '\n'
        + '    it("does not allow negative totals from over-discount", () => {\n'
        + '      const items = [{ name: "Widget", price: 10, quantity: 1 }];\n'
        + '      const discount = { type: "fixed", value: 50 };\n'
        + '\n'
        + '      const total = calculateTotal(items, discount);\n'
        + '\n'
        + '      expect(total).toBe(0); // Floor at zero\n'
        + '    });\n'
        + '  });\n'
        + '});'}</code></pre>

      <h3 style={h3Style}>{isZh ? '测试命名规范' : 'Test Naming Conventions'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '模式' : 'Pattern'}</th>
            <th style={thStyle}>{isZh ? '示例' : 'Example'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '应该...当...' : 'should...when...'}</td><td style={tdStyle}>{'"should return 404 when user not found"'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '给定...当...那么...' : 'given...when...then...'}</td><td style={tdStyle}>{'"given empty cart, when checkout, then throws"'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '动词 + 条件' : 'verb + condition'}</td><td style={tdStyle}>{'"rejects invalid email format"'}</td></tr>
        </tbody>
      </table>

      <p style={pStyle}>
        {isZh
          ? '测试覆盖率目标应为 80%，但不要为了数字而测试琐碎代码。聚焦于业务关键路径、边界条件和错误处理。每个 Bug 修复应伴随一个防止回归的测试。'
          : 'Aim for 80% test coverage, but do not test trivial code just for numbers. Focus on business-critical paths, boundary conditions, and error handling. Every bug fix should be accompanied by a regression test that prevents recurrence.'}
      </p>

      {/* --- Section 9: Code Review Best Practices --- */}
      <h2 style={h2Style}>
        {isZh ? '9. 代码审查最佳实践' : '9. Code Review Best Practices'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '代码审查是团队提升代码质量最有效的手段。好的审查关注设计、可读性和正确性，而不是纠结格式问题（那些应该由 linter 和 formatter 自动处理）。'
          : 'Code review is the most effective technique for teams to improve code quality. Good reviews focus on design, readability, and correctness — not formatting issues (those should be handled automatically by linters and formatters).'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '审查者应关注' : 'Reviewer Should Focus On'}</th>
            <th style={thStyle}>{isZh ? '审查者应避免' : 'Reviewer Should Avoid'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '设计和架构选择' : 'Design and architecture choices'}</td>
            <td style={tdStyle}>{isZh ? '缩进和格式（交给工具）' : 'Indentation and formatting (leave to tools)'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '边界条件和错误处理' : 'Edge cases and error handling'}</td>
            <td style={tdStyle}>{isZh ? '个人风格偏好' : 'Personal style preferences'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '命名和可读性' : 'Naming and readability'}</td>
            <td style={tdStyle}>{isZh ? '吹毛求疵的小问题' : 'Nitpicking minor issues'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '测试覆盖和质量' : 'Test coverage and quality'}</td>
            <td style={tdStyle}>{isZh ? '重写他人代码' : 'Rewriting others\' code'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '安全和性能影响' : 'Security and performance implications'}</td>
            <td style={tdStyle}>{isZh ? '情绪化评论' : 'Emotional or personal comments'}</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? '审查者清单' : 'Reviewer Checklist'}</h3>
      <pre style={preStyle}><code>{'# Code Review Checklist\n'
        + '\n'
        + '## Correctness\n'
        + '- [ ] Does the code do what it claims to do?\n'
        + '- [ ] Are edge cases handled (null, empty, negative, overflow)?\n'
        + '- [ ] Are race conditions possible in concurrent code?\n'
        + '\n'
        + '## Design\n'
        + '- [ ] Does it follow SOLID principles?\n'
        + '- [ ] Is the abstraction level appropriate?\n'
        + '- [ ] Could this be simplified without losing functionality?\n'
        + '\n'
        + '## Readability\n'
        + '- [ ] Are names intention-revealing?\n'
        + '- [ ] Can I understand this without asking the author?\n'
        + '- [ ] Are functions small and focused?\n'
        + '\n'
        + '## Testing\n'
        + '- [ ] Are there tests for happy path AND failure cases?\n'
        + '- [ ] Do tests cover the new code adequately?\n'
        + '- [ ] Are tests readable and maintainable?\n'
        + '\n'
        + '## Security\n'
        + '- [ ] Is user input validated and sanitized?\n'
        + '- [ ] Are secrets kept out of code?\n'
        + '- [ ] Are SQL/NoSQL injection risks mitigated?'}</code></pre>

      {/* --- Section 10: Design by Contract --- */}
      <h2 style={h2Style}>
        {isZh ? '10. 契约式设计' : '10. Design by Contract'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '契约式设计（Design by Contract）由 Bertrand Meyer 提出，通过定义前置条件（Preconditions）、后置条件（Postconditions）和不变量（Invariants）来明确函数和类的契约。这让代码行为可预测，Bug 更早被发现。'
          : 'Design by Contract, introduced by Bertrand Meyer, clarifies the contract of functions and classes by defining preconditions (what must be true before calling), postconditions (what is guaranteed after calling), and invariants (what always remains true). This makes behavior predictable and catches bugs earlier.'}
      </p>

      <pre style={preStyle}><code>{'// Design by Contract with runtime assertions\n'
        + 'class BankAccount {\n'
        + '  private balance: number;\n'
        + '\n'
        + '  constructor(initialBalance: number) {\n'
        + '    // Precondition\n'
        + '    assert(initialBalance >= 0, "Initial balance must be non-negative");\n'
        + '    this.balance = initialBalance;\n'
        + '    // Invariant established\n'
        + '    this.checkInvariant();\n'
        + '  }\n'
        + '\n'
        + '  withdraw(amount: number): void {\n'
        + '    // Preconditions\n'
        + '    assert(amount > 0, "Withdrawal amount must be positive");\n'
        + '    assert(amount <= this.balance, "Insufficient funds");\n'
        + '\n'
        + '    const previousBalance = this.balance;\n'
        + '    this.balance -= amount;\n'
        + '\n'
        + '    // Postcondition\n'
        + '    assert(\n'
        + '      this.balance === previousBalance - amount,\n'
        + '      "Balance must decrease by exactly the withdrawal amount"\n'
        + '    );\n'
        + '    // Invariant preserved\n'
        + '    this.checkInvariant();\n'
        + '  }\n'
        + '\n'
        + '  private checkInvariant(): void {\n'
        + '    assert(this.balance >= 0, "Invariant: balance must never be negative");\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + 'function assert(condition: boolean, message: string): asserts condition {\n'
        + '  if (!condition) throw new ContractViolationError(message);\n'
        + '}'}</code></pre>

      <p style={pStyle}>
        {isZh
          ? '在 TypeScript 中，类型系统充当了编译时的契约。结合 Zod 或 io-ts 等库进行运行时验证，可以在系统边界（API 入口、用户输入、外部数据）强制执行契约。'
          : 'In TypeScript, the type system acts as a compile-time contract. Combined with libraries like Zod or io-ts for runtime validation, you can enforce contracts at system boundaries (API entry points, user input, external data).'}
      </p>

      <pre style={preStyle}><code>{'// Zod: Runtime contracts at system boundaries\n'
        + 'import { z } from "zod";\n'
        + '\n'
        + 'const CreateUserSchema = z.object({\n'
        + '  name: z.string().min(1).max(100),\n'
        + '  email: z.string().email(),\n'
        + '  age: z.number().int().min(0).max(150),\n'
        + '});\n'
        + '\n'
        + 'type CreateUserInput = z.infer<typeof CreateUserSchema>;\n'
        + '\n'
        + '// At the API boundary, validate and parse\n'
        + 'function createUserHandler(req: Request) {\n'
        + '  const input = CreateUserSchema.parse(req.body);\n'
        + '  // input is now typed AND validated\n'
        + '  // No null checks needed downstream\n'
        + '  return userService.create(input);\n'
        + '}'}</code></pre>

      {/* --- Section 11: Clean Architecture Layers --- */}
      <h2 style={h2Style}>
        {isZh ? '11. 整洁架构分层' : '11. Clean Architecture Layers'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '整洁架构（Clean Architecture）由 Robert C. Martin 提出，将系统组织为同心圆层级。核心思想是依赖规则：依赖必须指向内部。内层不能知道外层的存在。这让核心业务逻辑独立于框架、数据库和 UI。'
          : 'Clean Architecture, proposed by Robert C. Martin, organizes systems into concentric layers. The core idea is the Dependency Rule: dependencies must point inward. Inner layers must not know about outer layers. This makes core business logic independent of frameworks, databases, and UI.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '层级' : 'Layer'}</th>
            <th style={thStyle}>{isZh ? '内容' : 'Contains'}</th>
            <th style={thStyle}>{isZh ? '示例' : 'Example'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong style={strongStyle}>{isZh ? '实体' : 'Entities'}</strong></td>
            <td style={tdStyle}>{isZh ? '核心业务规则、领域模型' : 'Core business rules, domain models'}</td>
            <td style={tdStyle}>Order, User, Product</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong style={strongStyle}>{isZh ? '用例' : 'Use Cases'}</strong></td>
            <td style={tdStyle}>{isZh ? '应用特定业务逻辑' : 'Application-specific business logic'}</td>
            <td style={tdStyle}>PlaceOrder, RegisterUser</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong style={strongStyle}>{isZh ? '接口适配器' : 'Interface Adapters'}</strong></td>
            <td style={tdStyle}>{isZh ? '控制器、Presenter、网关' : 'Controllers, presenters, gateways'}</td>
            <td style={tdStyle}>OrderController, UserPresenter</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong style={strongStyle}>{isZh ? '框架与驱动' : 'Frameworks & Drivers'}</strong></td>
            <td style={tdStyle}>{isZh ? 'Web 框架、数据库、外部 API' : 'Web frameworks, databases, external APIs'}</td>
            <td style={tdStyle}>Express, PostgreSQL, Stripe API</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? '项目结构示例' : 'Project Structure Example'}</h3>
      <pre style={preStyle}><code>{'src/\n'
        + '  domain/                # Entities & business rules (innermost)\n'
        + '    entities/\n'
        + '      Order.ts           # Pure domain model, no dependencies\n'
        + '      User.ts\n'
        + '    value-objects/\n'
        + '      Money.ts\n'
        + '      EmailAddress.ts\n'
        + '\n'
        + '  application/           # Use cases (depends only on domain)\n'
        + '    use-cases/\n'
        + '      PlaceOrder.ts      # Orchestrates domain logic\n'
        + '      RegisterUser.ts\n'
        + '    ports/               # Interfaces for external dependencies\n'
        + '      OrderRepository.ts # Interface, not implementation\n'
        + '      PaymentGateway.ts\n'
        + '\n'
        + '  infrastructure/        # Adapters & frameworks (outermost)\n'
        + '    persistence/\n'
        + '      PostgresOrderRepo.ts  # Implements OrderRepository\n'
        + '    payment/\n'
        + '      StripeGateway.ts      # Implements PaymentGateway\n'
        + '    web/\n'
        + '      controllers/\n'
        + '        OrderController.ts  # HTTP -> Use Case\n'
        + '      middleware/\n'
        + '        auth.ts'}</code></pre>

      <h3 style={h3Style}>{isZh ? '用例实现示例' : 'Use Case Implementation Example'}</h3>
      <pre style={preStyle}><code>{'// application/use-cases/PlaceOrder.ts\n'
        + '// Depends ONLY on domain entities and port interfaces\n'
        + 'import { Order } from "../domain/entities/Order";\n'
        + 'import { OrderRepository } from "../ports/OrderRepository";\n'
        + 'import { PaymentGateway } from "../ports/PaymentGateway";\n'
        + 'import { NotificationService } from "../ports/NotificationService";\n'
        + '\n'
        + 'export class PlaceOrderUseCase {\n'
        + '  constructor(\n'
        + '    private orderRepo: OrderRepository,\n'
        + '    private payment: PaymentGateway,\n'
        + '    private notifications: NotificationService\n'
        + '  ) {}\n'
        + '\n'
        + '  async execute(input: PlaceOrderInput): Promise<Order> {\n'
        + '    // 1. Create domain entity (validates business rules)\n'
        + '    const order = Order.create(input.items, input.customer);\n'
        + '\n'
        + '    // 2. Process payment through port\n'
        + '    const payment = await this.payment.charge(\n'
        + '      order.total,\n'
        + '      input.paymentMethod\n'
        + '    );\n'
        + '\n'
        + '    // 3. Persist through port\n'
        + '    order.confirmPayment(payment.id);\n'
        + '    await this.orderRepo.save(order);\n'
        + '\n'
        + '    // 4. Notify through port\n'
        + '    await this.notifications.sendOrderConfirmation(order);\n'
        + '\n'
        + '    return order;\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* --- Section 12: Practical Refactoring Examples --- */}
      <h2 style={h2Style}>
        {isZh ? '12. 实战重构示例' : '12. Practical Refactoring Examples'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '以下是三个真实世界的重构场景，展示如何将混乱的代码逐步变成整洁的代码。每个示例都包含重构前后的对比和应用的原则。'
          : 'Here are three real-world refactoring scenarios showing how to gradually transform messy code into clean code. Each example includes before/after comparisons and the principles applied.'}
      </p>

      <h3 style={h3Style}>{isZh ? '示例 1：提取早期返回（守卫子句）' : 'Example 1: Extract Early Returns (Guard Clauses)'}</h3>
      <pre style={preStyle}><code>{'// Before: Deep nesting, hard to follow\n'
        + 'function getDiscount(customer) {\n'
        + '  let discount = 0;\n'
        + '  if (customer !== null) {\n'
        + '    if (customer.isActive) {\n'
        + '      if (customer.orders.length > 10) {\n'
        + '        if (customer.loyaltyYears >= 5) {\n'
        + '          discount = 0.25;\n'
        + '        } else {\n'
        + '          discount = 0.15;\n'
        + '        }\n'
        + '      } else {\n'
        + '        discount = 0.05;\n'
        + '      }\n'
        + '    }\n'
        + '  }\n'
        + '  return discount;\n'
        + '}\n'
        + '\n'
        + '// After: Guard clauses eliminate nesting\n'
        + 'function getDiscount(customer) {\n'
        + '  if (!customer || !customer.isActive) return 0;\n'
        + '  if (customer.orders.length <= 10) return 0.05;\n'
        + '  if (customer.loyaltyYears >= 5) return 0.25;\n'
        + '  return 0.15;\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{isZh ? '示例 2：替换魔法数字和基本类型偏执' : 'Example 2: Replace Magic Numbers and Primitive Obsession'}</h3>
      <pre style={preStyle}><code>{'// Before: Magic numbers, unclear intent\n'
        + 'function calculatePrice(quantity, type) {\n'
        + '  if (type === 1) return quantity * 29.99;\n'
        + '  if (type === 2) return quantity * 49.99;\n'
        + '  if (type === 3) return quantity * 99.99 * 0.9;\n'
        + '  return 0;\n'
        + '}\n'
        + '\n'
        + '// After: Named constants, value objects, clear semantics\n'
        + 'const PricingTier = {\n'
        + '  BASIC:      { name: "Basic",      unitPrice: 29.99, discount: 0 },\n'
        + '  STANDARD:   { name: "Standard",   unitPrice: 49.99, discount: 0 },\n'
        + '  ENTERPRISE: { name: "Enterprise", unitPrice: 99.99, discount: 0.1 },\n'
        + '} as const;\n'
        + '\n'
        + 'type TierKey = keyof typeof PricingTier;\n'
        + '\n'
        + 'function calculatePrice(quantity: number, tier: TierKey): number {\n'
        + '  const { unitPrice, discount } = PricingTier[tier];\n'
        + '  const subtotal = quantity * unitPrice;\n'
        + '  return subtotal * (1 - discount);\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{isZh ? '示例 3：用多态替换条件逻辑' : 'Example 3: Replace Conditional Logic with Polymorphism'}</h3>
      <pre style={preStyle}><code>{'// Before: Growing if-else chain for notification types\n'
        + 'function sendNotification(type, recipient, message) {\n'
        + '  if (type === "email") {\n'
        + '    const html = buildEmailHTML(message);\n'
        + '    smtpClient.send(recipient.email, html);\n'
        + '    logSentEmail(recipient, message);\n'
        + '  } else if (type === "sms") {\n'
        + '    const text = truncate(message, 160);\n'
        + '    twilioClient.send(recipient.phone, text);\n'
        + '    logSentSMS(recipient, message);\n'
        + '  } else if (type === "push") {\n'
        + '    const payload = { title: "New Message", body: message };\n'
        + '    firebaseClient.send(recipient.deviceToken, payload);\n'
        + '    logSentPush(recipient, message);\n'
        + '  }\n'
        + '  // Adding "slack" requires modifying this function\n'
        + '}\n'
        + '\n'
        + '// After: Strategy pattern — each channel is independent\n'
        + 'interface NotificationChannel {\n'
        + '  send(recipient: Recipient, message: string): Promise<void>;\n'
        + '}\n'
        + '\n'
        + 'class EmailChannel implements NotificationChannel {\n'
        + '  async send(recipient, message) {\n'
        + '    const html = buildEmailHTML(message);\n'
        + '    await smtpClient.send(recipient.email, html);\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + 'class SMSChannel implements NotificationChannel {\n'
        + '  async send(recipient, message) {\n'
        + '    await twilioClient.send(recipient.phone, truncate(message, 160));\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// Adding Slack: zero changes to existing code\n'
        + 'class SlackChannel implements NotificationChannel {\n'
        + '  async send(recipient, message) {\n'
        + '    await slackClient.postMessage(recipient.slackId, message);\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// Orchestrator is simple and stable\n'
        + 'class NotificationService {\n'
        + '  constructor(private channels: Map<string, NotificationChannel>) {}\n'
        + '  async send(type: string, recipient: Recipient, message: string) {\n'
        + '    const channel = this.channels.get(type);\n'
        + '    if (!channel) throw new Error(`Unknown channel: \\${type}`);\n'
        + '    await channel.send(recipient, message);\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* --- Conclusion --- */}
      <h2 style={h2Style}>
        {isZh ? '总结' : 'Conclusion'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '整洁代码不是一次性的成就，而是一种持续的纪律。遵循童子军规则——每次离开代码时，让它比你发现时更干净一点。从好的命名开始，保持函数小而专注，应用 SOLID 和 DRY/KISS/YAGNI 原则，编写有意义的测试，并在代码审查中互相提升。'
          : 'Clean code is not a one-time achievement but a continuous discipline. Follow the Boy Scout Rule — always leave the code a little cleaner than you found it. Start with good naming, keep functions small and focused, apply SOLID and DRY/KISS/YAGNI principles, write meaningful tests, and elevate each other through code reviews.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '整洁架构让你的系统可测试、可替换、对变化有弹性。契约式设计让行为可预测。重构是安全的——只要你有测试覆盖。最重要的是，整洁代码是对团队的尊重：你写的每一行代码，都会被其他人（包括未来的你）阅读数十次。'
          : 'Clean Architecture makes your system testable, swappable, and resilient to change. Design by Contract makes behavior predictable. Refactoring is safe — as long as you have test coverage. Most importantly, clean code is respect for your team: every line you write will be read dozens of times by others, including your future self.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '开始行动：选择你代码库中最混乱的一个文件，应用本文中的一个原则进行重构。然后重复。这就是通往整洁代码的道路。'
          : 'Take action now: pick the messiest file in your codebase and apply one principle from this guide to refactor it. Then repeat. That is the path to clean code.'}
      </p>

      {/* FAQ Section */}
      <h2 style={h2Style}>
        {isZh ? '常见问题' : 'Frequently Asked Questions'}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqSchema.mainEntity.map((faq, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '20px 24px',
              background: '#ffffff',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b', margin: '0 0 10px 0' }}>
              {faq.name}
            </h3>
            <p style={{ color: '#475569', lineHeight: '1.7', margin: '0' }}>
              {faq.acceptedAnswer.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
