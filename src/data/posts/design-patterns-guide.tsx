'use client';

const translations = {
  en: {
    title: 'Software Design Patterns: A Comprehensive Guide with TypeScript & Python Examples',
    description:
      'Master the 23 Gang of Four design patterns — Creational (Factory, Builder, Singleton), Structural (Adapter, Decorator, Proxy, Facade), and Behavioral (Observer, Strategy, Command, State) — with production-ready TypeScript and Python code examples.',
  },
  zh: {
    title: '软件设计模式完全指南：TypeScript 与 Python 实战示例',
    description:
      '全面掌握 23 种 GoF 设计模式 — 创建型（工厂、建造者、单例）、结构型（适配器、装饰器、代理、外观）和行为型（观察者、策略、命令、状态）— 配合生产级 TypeScript 和 Python 代码示例。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are design patterns and why should I learn them?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Design patterns are reusable solutions to common software design problems. They provide a shared vocabulary for developers, improve code maintainability, and help you avoid reinventing the wheel. Learning them accelerates your ability to architect flexible, scalable systems and makes you a more effective collaborator.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Creational, Structural, and Behavioral patterns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Creational patterns (Factory, Builder, Singleton) deal with object creation mechanisms. Structural patterns (Adapter, Decorator, Proxy, Facade) concern class and object composition. Behavioral patterns (Observer, Strategy, Command, State) focus on communication and responsibility between objects.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use the Factory pattern vs the Builder pattern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use Factory when you need to create objects without specifying the exact class, typically when you have a family of related objects. Use Builder when constructing complex objects step by step, especially when the object has many optional parameters or requires a specific construction order.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Singleton an anti-pattern?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Singleton is sometimes considered an anti-pattern because it introduces global state, makes unit testing harder, and violates the Single Responsibility Principle. However, it is appropriate for genuinely shared resources like configuration managers, connection pools, or logging systems. In modern code, dependency injection often replaces Singleton.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Decorator pattern differ from inheritance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Decorator adds behavior to individual objects at runtime without affecting other instances, while inheritance extends entire classes at compile time. Decorator follows the Open/Closed Principle by allowing new behavior without modifying existing code. It also supports combining multiple behaviors dynamically, which is not possible with single inheritance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Strategy pattern and when should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Strategy pattern defines a family of interchangeable algorithms, encapsulates each one, and makes them interchangeable at runtime. Use it when you have multiple ways to perform an operation (sorting, validation, pricing) and want to switch between them without conditional logic or modifying client code.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do design patterns apply to TypeScript and Python differently?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TypeScript leverages interfaces, generics, and type guards to enforce pattern contracts at compile time. Python uses duck typing, protocols (PEP 544), ABC classes, and decorators. Python first-class functions often simplify patterns like Strategy and Command. TypeScript access modifiers (private, protected) enable stricter encapsulation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which design patterns are most commonly used in modern web development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Observer (event systems, pub/sub, React state), Strategy (middleware, validation), Factory (API clients, component creation), Decorator (Python decorators, TypeScript decorators, higher-order components), Proxy (API gateways, caching layers), and Command (undo/redo, task queues) are the most prevalent in modern web and backend development.',
      },
    },
  ],
};

export default function DesignPatternsGuide({ lang }: { lang: string }) {
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
        <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: '1.7', margin: '0' }}>
          {t.description}
        </p>
      </header>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          {isZh ? 'TL;DR — 60 秒速览设计模式' : 'TL;DR — Design Patterns in 60 Seconds'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.9' }}>
          <li>{isZh ? 'Factory：将对象创建委托给工厂方法，解耦客户端与具体类' : 'Factory: Delegate object creation to factory methods, decoupling clients from concrete classes'}</li>
          <li>{isZh ? 'Builder：分步构建复杂对象，支持链式调用和可选参数' : 'Builder: Construct complex objects step by step with fluent chaining and optional params'}</li>
          <li>{isZh ? 'Singleton：确保全局唯一实例（谨慎使用，优先考虑 DI）' : 'Singleton: Ensure a single global instance (use sparingly — prefer DI)'}</li>
          <li>{isZh ? 'Adapter / Facade：统一不兼容接口 / 为复杂子系统提供简单入口' : 'Adapter / Facade: Unify incompatible interfaces / provide a simple entry to complex subsystems'}</li>
          <li>{isZh ? 'Decorator / Proxy：动态添加行为 / 控制对象访问（缓存、日志、权限）' : 'Decorator / Proxy: Add behavior dynamically / control object access (cache, logging, auth)'}</li>
          <li>{isZh ? 'Observer：一对多通知机制，驱动事件系统和响应式编程' : 'Observer: One-to-many notification driving event systems and reactive programming'}</li>
          <li>{isZh ? 'Strategy / Command / State：可互换算法 / 封装请求为对象 / 基于状态切换行为' : 'Strategy / Command / State: Swappable algorithms / encapsulate requests / state-driven behavior'}</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <strong style={{ fontSize: '1rem', color: '#334155', display: 'block', marginBottom: '10px' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.9' }}>
          <li>{isZh ? '优先组合而非继承 — 大多数模式都体现了这一原则' : 'Favor composition over inheritance — most patterns embody this principle'}</li>
          <li>{isZh ? '面向接口编程，而非面向实现 — 降低耦合度' : 'Program to interfaces, not implementations — reduce coupling'}</li>
          <li>{isZh ? '开闭原则（OCP）：对扩展开放，对修改关闭' : 'Open/Closed Principle (OCP): Open for extension, closed for modification'}</li>
          <li>{isZh ? '不要为了使用模式而使用模式 — 只在真正需要时引入' : 'Do not use patterns for their own sake — introduce them only when genuinely needed'}</li>
          <li>{isZh ? 'TypeScript 接口和 Python Protocol 是类型安全模式的基石' : 'TypeScript interfaces and Python Protocols are keystones for type-safe patterns'}</li>
          <li>{isZh ? '现代框架已内置许多模式（React Context=Observer，Express 中间件=Chain of Responsibility）' : 'Modern frameworks embed many patterns (React Context=Observer, Express middleware=Chain of Responsibility)'}</li>
        </ul>
      </div>

      {/* Overview Table */}
      <h2 style={h2Style}>
        {isZh ? '设计模式概览' : 'Design Patterns Overview'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '设计模式分为三大类。下表列出了本指南涵盖的 11 种最常用模式及其核心意图。'
          : 'Design patterns fall into three categories. The table below lists the 11 most commonly used patterns covered in this guide along with their core intent.'}
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '类别' : 'Category'}</th>
            <th style={thStyle}>{isZh ? '模式' : 'Pattern'}</th>
            <th style={thStyle}>{isZh ? '核心意图' : 'Core Intent'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '创建型' : 'Creational'}</td><td style={tdStyle}>Factory</td><td style={tdStyle}>{isZh ? '将对象创建委托给子类或工厂方法' : 'Delegate object instantiation to subclasses or factory methods'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '创建型' : 'Creational'}</td><td style={tdStyle}>Builder</td><td style={tdStyle}>{isZh ? '分步构建复杂对象' : 'Construct complex objects step by step'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '创建型' : 'Creational'}</td><td style={tdStyle}>Singleton</td><td style={tdStyle}>{isZh ? '保证类只有一个实例' : 'Ensure a class has only one instance'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '结构型' : 'Structural'}</td><td style={tdStyle}>Adapter</td><td style={tdStyle}>{isZh ? '转换不兼容接口为可协作的接口' : 'Convert incompatible interfaces into compatible ones'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '结构型' : 'Structural'}</td><td style={tdStyle}>Decorator</td><td style={tdStyle}>{isZh ? '动态为对象添加新行为' : 'Dynamically attach new behavior to objects'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '结构型' : 'Structural'}</td><td style={tdStyle}>Proxy</td><td style={tdStyle}>{isZh ? '为对象提供替代或占位符以控制访问' : 'Provide a surrogate to control access to an object'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '结构型' : 'Structural'}</td><td style={tdStyle}>Facade</td><td style={tdStyle}>{isZh ? '为复杂子系统提供简化接口' : 'Provide a simplified interface to a complex subsystem'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '行为型' : 'Behavioral'}</td><td style={tdStyle}>Observer</td><td style={tdStyle}>{isZh ? '定义一对多依赖关系，自动通知变更' : 'Define one-to-many dependency with automatic change notification'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '行为型' : 'Behavioral'}</td><td style={tdStyle}>Strategy</td><td style={tdStyle}>{isZh ? '定义可互换的算法族' : 'Define a family of interchangeable algorithms'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '行为型' : 'Behavioral'}</td><td style={tdStyle}>Command</td><td style={tdStyle}>{isZh ? '将请求封装为对象，支持撤销和排队' : 'Encapsulate a request as an object, enabling undo and queuing'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '行为型' : 'Behavioral'}</td><td style={tdStyle}>State</td><td style={tdStyle}>{isZh ? '根据内部状态改变对象行为' : 'Alter object behavior when its internal state changes'}</td></tr>
        </tbody>
      </table>

      {/* ================================================================ */}
      {/* CREATIONAL PATTERNS */}
      {/* ================================================================ */}
      <h2 style={h2Style}>
        {isZh ? '一、创建型模式' : '1. Creational Patterns'}
      </h2>

      {/* Factory */}
      <h3 style={h3Style}>{isZh ? '1.1 工厂方法模式 (Factory Method)' : '1.1 Factory Method Pattern'}</h3>
      <p style={pStyle}>
        {isZh
          ? '工厂方法定义一个创建对象的接口，让子类决定实例化哪个类。它将 new 操作延迟到子类，使代码对扩展开放、对修改关闭。'
          : 'The Factory Method defines an interface for creating an object but lets subclasses decide which class to instantiate. It defers the new operation to subclasses, keeping code open for extension and closed for modification.'}
      </p>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>TypeScript</h3>
      <pre style={preStyle}><code>{
'// Factory Method — TypeScript\n' +
'interface Notification {\n' +
'  send(message: string): void;\n' +
'}\n\n' +
'class EmailNotification implements Notification {\n' +
'  send(message: string): void {\n' +
'    console.log("Email: " + message);\n' +
'  }\n' +
'}\n\n' +
'class SMSNotification implements Notification {\n' +
'  send(message: string): void {\n' +
'    console.log("SMS: " + message);\n' +
'  }\n' +
'}\n\n' +
'class PushNotification implements Notification {\n' +
'  send(message: string): void {\n' +
'    console.log("Push: " + message);\n' +
'  }\n' +
'}\n\n' +
'type Channel = "email" | "sms" | "push";\n\n' +
'function createNotification(channel: Channel): Notification {\n' +
'  const map: Record<Channel, () => Notification> = {\n' +
'    email: () => new EmailNotification(),\n' +
'    sms:   () => new SMSNotification(),\n' +
'    push:  () => new PushNotification(),\n' +
'  };\n' +
'  return map[channel]();\n' +
'}\n\n' +
'// Usage\n' +
'const notifier = createNotification("email");\n' +
'notifier.send("Welcome aboard!");  // Email: Welcome aboard!'
      }</code></pre>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>Python</h3>
      <pre style={preStyle}><code>{
'# Factory Method — Python\n' +
'from abc import ABC, abstractmethod\n\n' +
'class Notification(ABC):\n' +
'    @abstractmethod\n' +
'    def send(self, message: str) -> None: ...\n\n' +
'class EmailNotification(Notification):\n' +
'    def send(self, message: str) -> None:\n' +
'        print(f"Email: {message}")\n\n' +
'class SMSNotification(Notification):\n' +
'    def send(self, message: str) -> None:\n' +
'        print(f"SMS: {message}")\n\n' +
'class PushNotification(Notification):\n' +
'    def send(self, message: str) -> None:\n' +
'        print(f"Push: {message}")\n\n' +
'def create_notification(channel: str) -> Notification:\n' +
'    factories = {\n' +
'        "email": EmailNotification,\n' +
'        "sms":   SMSNotification,\n' +
'        "push":  PushNotification,\n' +
'    }\n' +
'    if channel not in factories:\n' +
'        raise ValueError(f"Unknown channel: {channel}")\n' +
'    return factories[channel]()\n\n' +
'# Usage\n' +
'notifier = create_notification("sms")\n' +
'notifier.send("Your code is 1234")  # SMS: Your code is 1234'
      }</code></pre>

      {/* Builder */}
      <h3 style={h3Style}>{isZh ? '1.2 建造者模式 (Builder)' : '1.2 Builder Pattern'}</h3>
      <p style={pStyle}>
        {isZh
          ? '建造者模式将复杂对象的构建过程与表示分离，使同样的构建过程可以创建不同的表示。当对象具有大量可选参数或需要特定顺序构建时，Builder 比构造函数重载更优雅。'
          : 'The Builder pattern separates the construction of a complex object from its representation. When an object has many optional parameters or requires a specific build order, Builder is more elegant than constructor overloading.'}
      </p>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>TypeScript</h3>
      <pre style={preStyle}><code>{
'// Builder — TypeScript\n' +
'interface QueryConfig {\n' +
'  table: string;\n' +
'  fields: string[];\n' +
'  conditions: string[];\n' +
'  orderBy?: string;\n' +
'  limit?: number;\n' +
'}\n\n' +
'class QueryBuilder {\n' +
'  private config: QueryConfig;\n\n' +
'  constructor(table: string) {\n' +
'    this.config = { table, fields: ["*"], conditions: [] };\n' +
'  }\n\n' +
'  select(...fields: string[]): this {\n' +
'    this.config.fields = fields;\n' +
'    return this;\n' +
'  }\n\n' +
'  where(condition: string): this {\n' +
'    this.config.conditions.push(condition);\n' +
'    return this;\n' +
'  }\n\n' +
'  orderBy(field: string): this {\n' +
'    this.config.orderBy = field;\n' +
'    return this;\n' +
'  }\n\n' +
'  limit(n: number): this {\n' +
'    this.config.limit = n;\n' +
'    return this;\n' +
'  }\n\n' +
'  build(): string {\n' +
'    let sql = "SELECT " + this.config.fields.join(", ");\n' +
'    sql += " FROM " + this.config.table;\n' +
'    if (this.config.conditions.length > 0) {\n' +
'      sql += " WHERE " + this.config.conditions.join(" AND ");\n' +
'    }\n' +
'    if (this.config.orderBy) {\n' +
'      sql += " ORDER BY " + this.config.orderBy;\n' +
'    }\n' +
'    if (this.config.limit !== undefined) {\n' +
'      sql += " LIMIT " + this.config.limit;\n' +
'    }\n' +
'    return sql;\n' +
'  }\n' +
'}\n\n' +
'// Usage — fluent chaining\n' +
'const query = new QueryBuilder("users")\n' +
'  .select("id", "name", "email")\n' +
'  .where("active = true")\n' +
'  .where("age > 18")\n' +
'  .orderBy("name")\n' +
'  .limit(50)\n' +
'  .build();\n\n' +
'console.log(query);\n' +
'// SELECT id, name, email FROM users WHERE active = true AND age > 18 ORDER BY name LIMIT 50'
      }</code></pre>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>Python</h3>
      <pre style={preStyle}><code>{
'# Builder — Python\n' +
'from dataclasses import dataclass, field\n\n' +
'@dataclass\n' +
'class QueryConfig:\n' +
'    table: str\n' +
'    fields: list[str] = field(default_factory=lambda: ["*"])\n' +
'    conditions: list[str] = field(default_factory=list)\n' +
'    order_by: str | None = None\n' +
'    limit: int | None = None\n\n' +
'class QueryBuilder:\n' +
'    def __init__(self, table: str):\n' +
'        self._config = QueryConfig(table=table)\n\n' +
'    def select(self, *fields: str) -> "QueryBuilder":\n' +
'        self._config.fields = list(fields)\n' +
'        return self\n\n' +
'    def where(self, condition: str) -> "QueryBuilder":\n' +
'        self._config.conditions.append(condition)\n' +
'        return self\n\n' +
'    def order_by(self, col: str) -> "QueryBuilder":\n' +
'        self._config.order_by = col\n' +
'        return self\n\n' +
'    def limit(self, n: int) -> "QueryBuilder":\n' +
'        self._config.limit = n\n' +
'        return self\n\n' +
'    def build(self) -> str:\n' +
'        sql = f"SELECT {\', \'.join(self._config.fields)} FROM {self._config.table}"\n' +
'        if self._config.conditions:\n' +
'            sql += f" WHERE {\' AND \'.join(self._config.conditions)}"\n' +
'        if self._config.order_by:\n' +
'            sql += f" ORDER BY {self._config.order_by}"\n' +
'        if self._config.limit is not None:\n' +
'            sql += f" LIMIT {self._config.limit}"\n' +
'        return sql\n\n' +
'# Usage\n' +
'query = (\n' +
'    QueryBuilder("users")\n' +
'    .select("id", "name", "email")\n' +
'    .where("active = true")\n' +
'    .order_by("name")\n' +
'    .limit(50)\n' +
'    .build()\n' +
')\n' +
'print(query)'
      }</code></pre>

      {/* Singleton */}
      <h3 style={h3Style}>{isZh ? '1.3 单例模式 (Singleton)' : '1.3 Singleton Pattern'}</h3>
      <p style={pStyle}>
        {isZh
          ? '单例模式确保一个类只有一个实例，并提供全局访问点。在现代开发中，依赖注入通常是更好的选择，但 Singleton 在管理配置、日志和连接池时仍然有用。'
          : 'Singleton ensures a class has exactly one instance with a global access point. In modern development, dependency injection is often preferred, but Singleton remains useful for managing configuration, logging, and connection pools.'}
      </p>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>TypeScript</h3>
      <pre style={preStyle}><code>{
'// Singleton — TypeScript\n' +
'class Logger {\n' +
'  private static instance: Logger;\n' +
'  private logs: string[] = [];\n\n' +
'  private constructor() {} // prevent external instantiation\n\n' +
'  static getInstance(): Logger {\n' +
'    if (!Logger.instance) {\n' +
'      Logger.instance = new Logger();\n' +
'    }\n' +
'    return Logger.instance;\n' +
'  }\n\n' +
'  log(message: string): void {\n' +
'    const entry = "[" + new Date().toISOString() + "] " + message;\n' +
'    this.logs.push(entry);\n' +
'    console.log(entry);\n' +
'  }\n\n' +
'  getHistory(): string[] {\n' +
'    return [...this.logs];\n' +
'  }\n' +
'}\n\n' +
'// Usage — same instance everywhere\n' +
'const logger1 = Logger.getInstance();\n' +
'const logger2 = Logger.getInstance();\n' +
'console.log(logger1 === logger2);  // true\n\n' +
'logger1.log("App started");\n' +
'logger2.log("User logged in");\n' +
'console.log(logger1.getHistory().length);  // 2'
      }</code></pre>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>Python</h3>
      <pre style={preStyle}><code>{
'# Singleton — Python (using __new__)\n' +
'class Logger:\n' +
'    _instance = None\n' +
'    _logs: list[str] = []\n\n' +
'    def __new__(cls):\n' +
'        if cls._instance is None:\n' +
'            cls._instance = super().__new__(cls)\n' +
'        return cls._instance\n\n' +
'    def log(self, message: str) -> None:\n' +
'        from datetime import datetime\n' +
'        entry = f"[{datetime.now().isoformat()}] {message}"\n' +
'        self._logs.append(entry)\n' +
'        print(entry)\n\n' +
'    def get_history(self) -> list[str]:\n' +
'        return list(self._logs)\n\n' +
'# Usage\n' +
'logger1 = Logger()\n' +
'logger2 = Logger()\n' +
'print(logger1 is logger2)  # True\n\n' +
'# Alternative: module-level singleton (Pythonic approach)\n' +
'# config.py\n' +
'class _Config:\n' +
'    def __init__(self):\n' +
'        self.debug = False\n' +
'        self.db_url = "sqlite:///app.db"\n\n' +
'config = _Config()  # module-level instance acts as singleton'
      }</code></pre>

      {/* ================================================================ */}
      {/* STRUCTURAL PATTERNS */}
      {/* ================================================================ */}
      <h2 style={h2Style}>
        {isZh ? '二、结构型模式' : '2. Structural Patterns'}
      </h2>

      {/* Adapter */}
      <h3 style={h3Style}>{isZh ? '2.1 适配器模式 (Adapter)' : '2.1 Adapter Pattern'}</h3>
      <p style={pStyle}>
        {isZh
          ? '适配器模式将一个类的接口转换成客户端期望的另一个接口。它让原本接口不兼容的类可以协同工作，常用于集成第三方库或遗留系统。'
          : 'The Adapter pattern converts the interface of a class into another interface clients expect. It allows classes with incompatible interfaces to work together, commonly used for integrating third-party libraries or legacy systems.'}
      </p>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>TypeScript</h3>
      <pre style={preStyle}><code>{
'// Adapter — TypeScript\n' +
'// Target interface our app expects\n' +
'interface PaymentProcessor {\n' +
'  charge(amount: number, currency: string): Promise<{ id: string; status: string }>;\n' +
'}\n\n' +
'// Legacy third-party SDK with incompatible interface\n' +
'class LegacyPaymentSDK {\n' +
'  makePayment(cents: number, curr: string, callback: (err: Error | null, txId: string) => void): void {\n' +
'    setTimeout(() => callback(null, "txn_" + Math.random().toString(36).slice(2)), 100);\n' +
'  }\n' +
'}\n\n' +
'// Adapter wraps the legacy SDK to match our interface\n' +
'class LegacyPaymentAdapter implements PaymentProcessor {\n' +
'  constructor(private sdk: LegacyPaymentSDK) {}\n\n' +
'  charge(amount: number, currency: string): Promise<{ id: string; status: string }> {\n' +
'    return new Promise((resolve, reject) => {\n' +
'      const cents = Math.round(amount * 100);\n' +
'      this.sdk.makePayment(cents, currency, (err, txId) => {\n' +
'        if (err) reject(err);\n' +
'        else resolve({ id: txId, status: "success" });\n' +
'      });\n' +
'    });\n' +
'  }\n' +
'}\n\n' +
'// Usage — client only knows PaymentProcessor\n' +
'async function checkout(processor: PaymentProcessor) {\n' +
'  const result = await processor.charge(29.99, "USD");\n' +
'  console.log("Payment " + result.id + ": " + result.status);\n' +
'}\n\n' +
'const adapter = new LegacyPaymentAdapter(new LegacyPaymentSDK());\n' +
'checkout(adapter);'
      }</code></pre>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>Python</h3>
      <pre style={preStyle}><code>{
'# Adapter — Python\n' +
'from typing import Protocol\n\n' +
'class PaymentProcessor(Protocol):\n' +
'    def charge(self, amount: float, currency: str) -> dict: ...\n\n' +
'class LegacyPaymentSDK:\n' +
'    """Third-party SDK with incompatible interface"""\n' +
'    def make_payment(self, cents: int, curr: str) -> str:\n' +
'        import uuid\n' +
'        return f"txn_{uuid.uuid4().hex[:8]}"\n\n' +
'class LegacyPaymentAdapter:\n' +
'    """Adapter wraps legacy SDK to match PaymentProcessor protocol"""\n' +
'    def __init__(self, sdk: LegacyPaymentSDK):\n' +
'        self._sdk = sdk\n\n' +
'    def charge(self, amount: float, currency: str) -> dict:\n' +
'        cents = round(amount * 100)\n' +
'        tx_id = self._sdk.make_payment(cents, currency)\n' +
'        return {"id": tx_id, "status": "success"}\n\n' +
'# Usage\n' +
'adapter = LegacyPaymentAdapter(LegacyPaymentSDK())\n' +
'result = adapter.charge(29.99, "USD")\n' +
'print(f"Payment {result[\'id\']}: {result[\'status\']}")'
      }</code></pre>

      {/* Decorator */}
      <h3 style={h3Style}>{isZh ? '2.2 装饰器模式 (Decorator)' : '2.2 Decorator Pattern'}</h3>
      <p style={pStyle}>
        {isZh
          ? '装饰器模式动态地为对象添加额外职责，而无需修改原始类。相比继承，它更灵活，可以任意组合行为。Python 的 @decorator 语法和 TypeScript 的 Stage 3 装饰器都深受此模式影响。'
          : 'The Decorator pattern dynamically attaches additional responsibilities to an object without modifying the original class. It is more flexible than inheritance and allows combining behaviors freely. Python\'s @decorator syntax and TypeScript Stage 3 decorators are both influenced by this pattern.'}
      </p>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>TypeScript</h3>
      <pre style={preStyle}><code>{
'// Decorator — TypeScript\n' +
'interface HttpClient {\n' +
'  request(url: string, options?: RequestInit): Promise<Response>;\n' +
'}\n\n' +
'// Base implementation\n' +
'class FetchClient implements HttpClient {\n' +
'  async request(url: string, options?: RequestInit): Promise<Response> {\n' +
'    return fetch(url, options);\n' +
'  }\n' +
'}\n\n' +
'// Decorator: adds logging\n' +
'class LoggingDecorator implements HttpClient {\n' +
'  constructor(private client: HttpClient) {}\n\n' +
'  async request(url: string, options?: RequestInit): Promise<Response> {\n' +
'    console.log("[LOG] Request: " + url);\n' +
'    const start = Date.now();\n' +
'    const response = await this.client.request(url, options);\n' +
'    console.log("[LOG] " + response.status + " in " + (Date.now() - start) + "ms");\n' +
'    return response;\n' +
'  }\n' +
'}\n\n' +
'// Decorator: adds retry logic\n' +
'class RetryDecorator implements HttpClient {\n' +
'  constructor(private client: HttpClient, private maxRetries = 3) {}\n\n' +
'  async request(url: string, options?: RequestInit): Promise<Response> {\n' +
'    let lastError: Error | null = null;\n' +
'    for (let i = 0; i <= this.maxRetries; i++) {\n' +
'      try {\n' +
'        return await this.client.request(url, options);\n' +
'      } catch (err) {\n' +
'        lastError = err as Error;\n' +
'        console.log("[RETRY] Attempt " + (i + 1) + " failed");\n' +
'      }\n' +
'    }\n' +
'    throw lastError;\n' +
'  }\n' +
'}\n\n' +
'// Usage: compose decorators\n' +
'const client: HttpClient = new LoggingDecorator(\n' +
'  new RetryDecorator(\n' +
'    new FetchClient(), 3\n' +
'  )\n' +
');\n' +
'// client.request("https://api.example.com/data");'
      }</code></pre>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>Python</h3>
      <pre style={preStyle}><code>{
'# Decorator — Python (both class-based and @decorator syntax)\n' +
'import functools\n' +
'import time\n' +
'from typing import Callable, Any\n\n' +
'# Function decorator for timing\n' +
'def timer(func: Callable) -> Callable:\n' +
'    @functools.wraps(func)\n' +
'    def wrapper(*args: Any, **kwargs: Any) -> Any:\n' +
'        start = time.perf_counter()\n' +
'        result = func(*args, **kwargs)\n' +
'        elapsed = time.perf_counter() - start\n' +
'        print(f"{func.__name__} took {elapsed:.4f}s")\n' +
'        return result\n' +
'    return wrapper\n\n' +
'# Function decorator for retry\n' +
'def retry(max_attempts: int = 3):\n' +
'    def decorator(func: Callable) -> Callable:\n' +
'        @functools.wraps(func)\n' +
'        def wrapper(*args: Any, **kwargs: Any) -> Any:\n' +
'            for attempt in range(1, max_attempts + 1):\n' +
'                try:\n' +
'                    return func(*args, **kwargs)\n' +
'                except Exception as e:\n' +
'                    print(f"Attempt {attempt} failed: {e}")\n' +
'                    if attempt == max_attempts:\n' +
'                        raise\n' +
'        return wrapper\n' +
'    return decorator\n\n' +
'# Usage — stack decorators\n' +
'@timer\n' +
'@retry(max_attempts=3)\n' +
'def fetch_data(url: str) -> str:\n' +
'    import urllib.request\n' +
'    return urllib.request.urlopen(url).read().decode()\n\n' +
'# fetch_data("https://api.example.com/data")'
      }</code></pre>

      {/* Proxy */}
      <h3 style={h3Style}>{isZh ? '2.3 代理模式 (Proxy)' : '2.3 Proxy Pattern'}</h3>
      <p style={pStyle}>
        {isZh
          ? '代理模式为另一个对象提供替代品或占位符以控制对它的访问。常见用途包括延迟初始化（虚拟代理）、访问控制（保护代理）和缓存（智能代理）。'
          : 'The Proxy pattern provides a surrogate or placeholder for another object to control access. Common use cases include lazy initialization (virtual proxy), access control (protection proxy), and caching (smart proxy).'}
      </p>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>TypeScript</h3>
      <pre style={preStyle}><code>{
'// Proxy — TypeScript (Caching Proxy)\n' +
'interface DataService {\n' +
'  fetchData(key: string): Promise<string>;\n' +
'}\n\n' +
'class ApiService implements DataService {\n' +
'  async fetchData(key: string): Promise<string> {\n' +
'    console.log("[API] Fetching " + key + " from server...");\n' +
'    // Simulate network request\n' +
'    return "data_for_" + key;\n' +
'  }\n' +
'}\n\n' +
'class CachingProxy implements DataService {\n' +
'  private cache = new Map<string, { value: string; expiry: number }>();\n\n' +
'  constructor(private service: DataService, private ttlMs = 60000) {}\n\n' +
'  async fetchData(key: string): Promise<string> {\n' +
'    const cached = this.cache.get(key);\n' +
'    if (cached && cached.expiry > Date.now()) {\n' +
'      console.log("[CACHE] Hit for " + key);\n' +
'      return cached.value;\n' +
'    }\n' +
'    console.log("[CACHE] Miss for " + key);\n' +
'    const value = await this.service.fetchData(key);\n' +
'    this.cache.set(key, { value, expiry: Date.now() + this.ttlMs });\n' +
'    return value;\n' +
'  }\n' +
'}\n\n' +
'// Usage\n' +
'const service: DataService = new CachingProxy(new ApiService(), 5000);\n' +
'// First call: cache miss, hits API\n' +
'// Second call: cache hit, returns instantly'
      }</code></pre>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>Python</h3>
      <pre style={preStyle}><code>{
'# Proxy — Python (Caching Proxy)\n' +
'import time\n' +
'from typing import Protocol\n\n' +
'class DataService(Protocol):\n' +
'    def fetch_data(self, key: str) -> str: ...\n\n' +
'class ApiService:\n' +
'    def fetch_data(self, key: str) -> str:\n' +
'        print(f"[API] Fetching {key} from server...")\n' +
'        return f"data_for_{key}"\n\n' +
'class CachingProxy:\n' +
'    def __init__(self, service: DataService, ttl: float = 60.0):\n' +
'        self._service = service\n' +
'        self._ttl = ttl\n' +
'        self._cache: dict[str, tuple[str, float]] = {}\n\n' +
'    def fetch_data(self, key: str) -> str:\n' +
'        if key in self._cache:\n' +
'            value, expiry = self._cache[key]\n' +
'            if time.time() < expiry:\n' +
'                print(f"[CACHE] Hit for {key}")\n' +
'                return value\n' +
'        print(f"[CACHE] Miss for {key}")\n' +
'        value = self._service.fetch_data(key)\n' +
'        self._cache[key] = (value, time.time() + self._ttl)\n' +
'        return value\n\n' +
'# Usage\n' +
'service = CachingProxy(ApiService(), ttl=5.0)\n' +
'print(service.fetch_data("users"))   # [API] Fetching...\n' +
'print(service.fetch_data("users"))   # [CACHE] Hit'
      }</code></pre>

      {/* Facade */}
      <h3 style={h3Style}>{isZh ? '2.4 外观模式 (Facade)' : '2.4 Facade Pattern'}</h3>
      <p style={pStyle}>
        {isZh
          ? '外观模式为复杂的子系统提供一个简化的统一接口。它不添加新功能，而是将多个复杂操作封装在一个高级 API 后面，降低客户端的使用复杂度。'
          : 'The Facade pattern provides a simplified, unified interface to a complex subsystem. It does not add new functionality but wraps multiple complex operations behind a high-level API, reducing usage complexity for clients.'}
      </p>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>TypeScript</h3>
      <pre style={preStyle}><code>{
'// Facade — TypeScript\n' +
'// Complex subsystems\n' +
'class UserService {\n' +
'  createUser(email: string) { return { id: 1, email }; }\n' +
'}\n\n' +
'class EmailService {\n' +
'  sendWelcome(email: string) { console.log("Welcome email sent to " + email); }\n' +
'}\n\n' +
'class AnalyticsService {\n' +
'  trackSignup(userId: number) { console.log("Signup tracked for user " + userId); }\n' +
'}\n\n' +
'class BillingService {\n' +
'  createTrialSubscription(userId: number) {\n' +
'    console.log("14-day trial started for user " + userId);\n' +
'  }\n' +
'}\n\n' +
'// Facade — single method coordinates all subsystems\n' +
'class RegistrationFacade {\n' +
'  private userService = new UserService();\n' +
'  private emailService = new EmailService();\n' +
'  private analytics = new AnalyticsService();\n' +
'  private billing = new BillingService();\n\n' +
'  async registerUser(email: string) {\n' +
'    const user = this.userService.createUser(email);\n' +
'    this.emailService.sendWelcome(email);\n' +
'    this.analytics.trackSignup(user.id);\n' +
'    this.billing.createTrialSubscription(user.id);\n' +
'    return user;\n' +
'  }\n' +
'}\n\n' +
'// Usage — client only interacts with the facade\n' +
'const registration = new RegistrationFacade();\n' +
'registration.registerUser("alice@example.com");'
      }</code></pre>

      {/* ================================================================ */}
      {/* BEHAVIORAL PATTERNS */}
      {/* ================================================================ */}
      <h2 style={h2Style}>
        {isZh ? '三、行为型模式' : '3. Behavioral Patterns'}
      </h2>

      {/* Observer */}
      <h3 style={h3Style}>{isZh ? '3.1 观察者模式 (Observer)' : '3.1 Observer Pattern'}</h3>
      <p style={pStyle}>
        {isZh
          ? '观察者模式定义了对象间的一对多依赖关系：当一个对象（Subject）状态变化时，所有依赖它的对象（Observer）都会收到通知并自动更新。事件总线、发布/订阅系统和 React 状态管理都是观察者模式的体现。'
          : 'The Observer pattern defines a one-to-many dependency between objects: when one object (Subject) changes state, all dependents (Observers) are notified and updated automatically. Event buses, pub/sub systems, and React state management all embody this pattern.'}
      </p>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>TypeScript</h3>
      <pre style={preStyle}><code>{
'// Observer — TypeScript (Type-safe Event Emitter)\n' +
'type EventMap = {\n' +
'  "user:login":    { userId: string; timestamp: number };\n' +
'  "user:logout":   { userId: string };\n' +
'  "cart:update":   { items: number; total: number };\n' +
'};\n\n' +
'class EventBus<T extends Record<string, unknown>> {\n' +
'  private listeners = new Map<keyof T, Set<(data: any) => void>>();\n\n' +
'  on<K extends keyof T>(event: K, callback: (data: T[K]) => void): () => void {\n' +
'    if (!this.listeners.has(event)) {\n' +
'      this.listeners.set(event, new Set());\n' +
'    }\n' +
'    this.listeners.get(event)!.add(callback);\n' +
'    // Return unsubscribe function\n' +
'    return () => { this.listeners.get(event)?.delete(callback); };\n' +
'  }\n\n' +
'  emit<K extends keyof T>(event: K, data: T[K]): void {\n' +
'    this.listeners.get(event)?.forEach((cb) => cb(data));\n' +
'  }\n' +
'}\n\n' +
'// Usage\n' +
'const bus = new EventBus<EventMap>();\n\n' +
'const unsub = bus.on("user:login", (data) => {\n' +
'  console.log("User " + data.userId + " logged in at " + data.timestamp);\n' +
'});\n\n' +
'bus.on("cart:update", (data) => {\n' +
'  console.log("Cart: " + data.items + " items, $" + data.total);\n' +
'});\n\n' +
'bus.emit("user:login", { userId: "u_123", timestamp: Date.now() });\n' +
'bus.emit("cart:update", { items: 3, total: 59.97 });\n\n' +
'unsub(); // unsubscribe from user:login'
      }</code></pre>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>Python</h3>
      <pre style={preStyle}><code>{
'# Observer — Python\n' +
'from typing import Callable, Any\n' +
'from collections import defaultdict\n\n' +
'class EventBus:\n' +
'    def __init__(self):\n' +
'        self._listeners: dict[str, list[Callable]] = defaultdict(list)\n\n' +
'    def on(self, event: str, callback: Callable) -> Callable:\n' +
'        self._listeners[event].append(callback)\n' +
'        def unsubscribe():\n' +
'            self._listeners[event].remove(callback)\n' +
'        return unsubscribe\n\n' +
'    def emit(self, event: str, **data: Any) -> None:\n' +
'        for callback in self._listeners.get(event, []):\n' +
'            callback(**data)\n\n' +
'# Usage\n' +
'bus = EventBus()\n\n' +
'def on_login(user_id: str, timestamp: float):\n' +
'    print(f"User {user_id} logged in at {timestamp}")\n\n' +
'unsub = bus.on("user:login", on_login)\n' +
'bus.emit("user:login", user_id="u_123", timestamp=1709000000)\n' +
'unsub()  # unsubscribe'
      }</code></pre>

      {/* Strategy */}
      <h3 style={h3Style}>{isZh ? '3.2 策略模式 (Strategy)' : '3.2 Strategy Pattern'}</h3>
      <p style={pStyle}>
        {isZh
          ? '策略模式定义一族算法，将每个算法封装起来，并使它们可以互换。客户端可以在运行时选择不同的策略，而不需要修改使用策略的代码。'
          : 'The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Clients can select different strategies at runtime without modifying the code that uses them.'}
      </p>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>TypeScript</h3>
      <pre style={preStyle}><code>{
'// Strategy — TypeScript\n' +
'interface CompressionStrategy {\n' +
'  compress(data: string): string;\n' +
'  name: string;\n' +
'}\n\n' +
'class GzipStrategy implements CompressionStrategy {\n' +
'  name = "gzip";\n' +
'  compress(data: string): string {\n' +
'    // Simulate gzip compression\n' +
'    return "[gzip:" + data.length + "]" + data.slice(0, 10) + "...";\n' +
'  }\n' +
'}\n\n' +
'class BrotliStrategy implements CompressionStrategy {\n' +
'  name = "brotli";\n' +
'  compress(data: string): string {\n' +
'    // Simulate brotli compression (better ratio)\n' +
'    return "[br:" + Math.floor(data.length * 0.8) + "]" + data.slice(0, 8) + "...";\n' +
'  }\n' +
'}\n\n' +
'class NoCompression implements CompressionStrategy {\n' +
'  name = "none";\n' +
'  compress(data: string): string {\n' +
'    return data;\n' +
'  }\n' +
'}\n\n' +
'class FileCompressor {\n' +
'  constructor(private strategy: CompressionStrategy) {}\n\n' +
'  setStrategy(strategy: CompressionStrategy): void {\n' +
'    this.strategy = strategy;\n' +
'  }\n\n' +
'  compressFile(data: string): string {\n' +
'    console.log("Compressing with " + this.strategy.name);\n' +
'    return this.strategy.compress(data);\n' +
'  }\n' +
'}\n\n' +
'// Usage — switch strategies at runtime\n' +
'const compressor = new FileCompressor(new GzipStrategy());\n' +
'console.log(compressor.compressFile("Hello world repeated many times"));\n\n' +
'compressor.setStrategy(new BrotliStrategy());\n' +
'console.log(compressor.compressFile("Hello world repeated many times"));'
      }</code></pre>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>Python</h3>
      <pre style={preStyle}><code>{
'# Strategy — Python (using Protocols and first-class functions)\n' +
'from typing import Protocol, Callable\n\n' +
'# Class-based approach\n' +
'class CompressionStrategy(Protocol):\n' +
'    name: str\n' +
'    def compress(self, data: str) -> str: ...\n\n' +
'class GzipStrategy:\n' +
'    name = "gzip"\n' +
'    def compress(self, data: str) -> str:\n' +
'        return f"[gzip:{len(data)}]{data[:10]}..."\n\n' +
'class BrotliStrategy:\n' +
'    name = "brotli"\n' +
'    def compress(self, data: str) -> str:\n' +
'        return f"[br:{int(len(data)*0.8)}]{data[:8]}..."\n\n' +
'class FileCompressor:\n' +
'    def __init__(self, strategy: CompressionStrategy):\n' +
'        self._strategy = strategy\n\n' +
'    def set_strategy(self, strategy: CompressionStrategy) -> None:\n' +
'        self._strategy = strategy\n\n' +
'    def compress_file(self, data: str) -> str:\n' +
'        print(f"Compressing with {self._strategy.name}")\n' +
'        return self._strategy.compress(data)\n\n' +
'# Functional alternative — even simpler\n' +
'CompressFn = Callable[[str], str]\n\n' +
'def gzip_compress(data: str) -> str:\n' +
'    return f"[gzip:{len(data)}]{data[:10]}..."\n\n' +
'def compress_file(data: str, strategy: CompressFn = gzip_compress) -> str:\n' +
'    return strategy(data)\n\n' +
'print(compress_file("test data", gzip_compress))'
      }</code></pre>

      {/* Command */}
      <h3 style={h3Style}>{isZh ? '3.3 命令模式 (Command)' : '3.3 Command Pattern'}</h3>
      <p style={pStyle}>
        {isZh
          ? '命令模式将请求封装为独立的对象，包含执行请求所需的全部信息。它支持参数化操作、排队执行、日志记录以及可撤销的操作，是实现 undo/redo 系统的基础。'
          : 'The Command pattern encapsulates a request as a standalone object containing all information needed to perform the action. It supports parameterizing operations, queuing execution, logging, and undoable operations, forming the basis for undo/redo systems.'}
      </p>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>TypeScript</h3>
      <pre style={preStyle}><code>{
'// Command — TypeScript (Text Editor with Undo/Redo)\n' +
'interface Command {\n' +
'  execute(): void;\n' +
'  undo(): void;\n' +
'  description: string;\n' +
'}\n\n' +
'class TextEditor {\n' +
'  content = "";\n' +
'  cursorPos = 0;\n' +
'}\n\n' +
'class InsertTextCommand implements Command {\n' +
'  description: string;\n' +
'  private previousContent = "";\n\n' +
'  constructor(private editor: TextEditor, private text: string, private pos: number) {\n' +
'    this.description = "Insert \\"" + text + "\\" at pos " + pos;\n' +
'  }\n\n' +
'  execute(): void {\n' +
'    this.previousContent = this.editor.content;\n' +
'    const before = this.editor.content.slice(0, this.pos);\n' +
'    const after = this.editor.content.slice(this.pos);\n' +
'    this.editor.content = before + this.text + after;\n' +
'    this.editor.cursorPos = this.pos + this.text.length;\n' +
'  }\n\n' +
'  undo(): void {\n' +
'    this.editor.content = this.previousContent;\n' +
'    this.editor.cursorPos = this.pos;\n' +
'  }\n' +
'}\n\n' +
'class DeleteTextCommand implements Command {\n' +
'  description: string;\n' +
'  private deletedText = "";\n\n' +
'  constructor(private editor: TextEditor, private start: number, private end: number) {\n' +
'    this.description = "Delete chars " + start + "-" + end;\n' +
'  }\n\n' +
'  execute(): void {\n' +
'    this.deletedText = this.editor.content.slice(this.start, this.end);\n' +
'    this.editor.content = this.editor.content.slice(0, this.start) + this.editor.content.slice(this.end);\n' +
'    this.editor.cursorPos = this.start;\n' +
'  }\n\n' +
'  undo(): void {\n' +
'    const before = this.editor.content.slice(0, this.start);\n' +
'    const after = this.editor.content.slice(this.start);\n' +
'    this.editor.content = before + this.deletedText + after;\n' +
'    this.editor.cursorPos = this.start + this.deletedText.length;\n' +
'  }\n' +
'}\n\n' +
'class CommandHistory {\n' +
'  private undoStack: Command[] = [];\n' +
'  private redoStack: Command[] = [];\n\n' +
'  execute(command: Command): void {\n' +
'    command.execute();\n' +
'    this.undoStack.push(command);\n' +
'    this.redoStack = []; // clear redo stack on new action\n' +
'  }\n\n' +
'  undo(): void {\n' +
'    const command = this.undoStack.pop();\n' +
'    if (command) {\n' +
'      command.undo();\n' +
'      this.redoStack.push(command);\n' +
'    }\n' +
'  }\n\n' +
'  redo(): void {\n' +
'    const command = this.redoStack.pop();\n' +
'    if (command) {\n' +
'      command.execute();\n' +
'      this.undoStack.push(command);\n' +
'    }\n' +
'  }\n' +
'}\n\n' +
'// Usage\n' +
'const editor = new TextEditor();\n' +
'const history = new CommandHistory();\n\n' +
'history.execute(new InsertTextCommand(editor, "Hello ", 0));\n' +
'history.execute(new InsertTextCommand(editor, "World", 6));\n' +
'console.log(editor.content); // "Hello World"\n\n' +
'history.undo();\n' +
'console.log(editor.content); // "Hello "\n\n' +
'history.redo();\n' +
'console.log(editor.content); // "Hello World"'
      }</code></pre>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>Python</h3>
      <pre style={preStyle}><code>{
'# Command — Python\n' +
'from abc import ABC, abstractmethod\n\n' +
'class Command(ABC):\n' +
'    @abstractmethod\n' +
'    def execute(self) -> None: ...\n' +
'    @abstractmethod\n' +
'    def undo(self) -> None: ...\n\n' +
'class TextEditor:\n' +
'    def __init__(self):\n' +
'        self.content = ""\n\n' +
'class InsertTextCommand(Command):\n' +
'    def __init__(self, editor: TextEditor, text: str, pos: int):\n' +
'        self._editor = editor\n' +
'        self._text = text\n' +
'        self._pos = pos\n' +
'        self._prev = ""\n\n' +
'    def execute(self) -> None:\n' +
'        self._prev = self._editor.content\n' +
'        before = self._editor.content[:self._pos]\n' +
'        after = self._editor.content[self._pos:]\n' +
'        self._editor.content = before + self._text + after\n\n' +
'    def undo(self) -> None:\n' +
'        self._editor.content = self._prev\n\n' +
'class CommandHistory:\n' +
'    def __init__(self):\n' +
'        self._undo_stack: list[Command] = []\n' +
'        self._redo_stack: list[Command] = []\n\n' +
'    def execute(self, cmd: Command) -> None:\n' +
'        cmd.execute()\n' +
'        self._undo_stack.append(cmd)\n' +
'        self._redo_stack.clear()\n\n' +
'    def undo(self) -> None:\n' +
'        if self._undo_stack:\n' +
'            cmd = self._undo_stack.pop()\n' +
'            cmd.undo()\n' +
'            self._redo_stack.append(cmd)\n\n' +
'# Usage\n' +
'editor = TextEditor()\n' +
'history = CommandHistory()\n' +
'history.execute(InsertTextCommand(editor, "Hello ", 0))\n' +
'history.execute(InsertTextCommand(editor, "World", 6))\n' +
'print(editor.content)  # Hello World\n' +
'history.undo()\n' +
'print(editor.content)  # Hello '
      }</code></pre>

      {/* State */}
      <h3 style={h3Style}>{isZh ? '3.4 状态模式 (State)' : '3.4 State Pattern'}</h3>
      <p style={pStyle}>
        {isZh
          ? '状态模式允许对象在内部状态改变时改变其行为，看起来好像修改了它的类。它将状态相关的行为封装在独立的状态对象中，消除了大量的条件判断语句。'
          : 'The State pattern allows an object to alter its behavior when its internal state changes, appearing to modify its class. It encapsulates state-specific behavior in separate state objects, eliminating large conditional statements.'}
      </p>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>TypeScript</h3>
      <pre style={preStyle}><code>{
'// State — TypeScript (Order Processing)\n' +
'interface OrderState {\n' +
'  name: string;\n' +
'  next(order: Order): void;\n' +
'  cancel(order: Order): void;\n' +
'}\n\n' +
'class Order {\n' +
'  state: OrderState;\n' +
'  id: string;\n\n' +
'  constructor(id: string) {\n' +
'    this.id = id;\n' +
'    this.state = new PendingState();\n' +
'    console.log("Order " + id + " created [" + this.state.name + "]");\n' +
'  }\n\n' +
'  next(): void { this.state.next(this); }\n' +
'  cancel(): void { this.state.cancel(this); }\n\n' +
'  transitionTo(state: OrderState): void {\n' +
'    console.log("Order " + this.id + ": " + this.state.name + " -> " + state.name);\n' +
'    this.state = state;\n' +
'  }\n' +
'}\n\n' +
'class PendingState implements OrderState {\n' +
'  name = "Pending";\n' +
'  next(order: Order): void {\n' +
'    order.transitionTo(new PaidState());\n' +
'  }\n' +
'  cancel(order: Order): void {\n' +
'    order.transitionTo(new CancelledState());\n' +
'  }\n' +
'}\n\n' +
'class PaidState implements OrderState {\n' +
'  name = "Paid";\n' +
'  next(order: Order): void {\n' +
'    order.transitionTo(new ShippedState());\n' +
'  }\n' +
'  cancel(order: Order): void {\n' +
'    console.log("Order " + order.id + ": refund initiated");\n' +
'    order.transitionTo(new CancelledState());\n' +
'  }\n' +
'}\n\n' +
'class ShippedState implements OrderState {\n' +
'  name = "Shipped";\n' +
'  next(order: Order): void {\n' +
'    order.transitionTo(new DeliveredState());\n' +
'  }\n' +
'  cancel(order: Order): void {\n' +
'    console.log("Order " + order.id + ": cannot cancel — already shipped");\n' +
'  }\n' +
'}\n\n' +
'class DeliveredState implements OrderState {\n' +
'  name = "Delivered";\n' +
'  next(order: Order): void {\n' +
'    console.log("Order " + order.id + ": already delivered — no further transitions");\n' +
'  }\n' +
'  cancel(order: Order): void {\n' +
'    console.log("Order " + order.id + ": cannot cancel — already delivered");\n' +
'  }\n' +
'}\n\n' +
'class CancelledState implements OrderState {\n' +
'  name = "Cancelled";\n' +
'  next(order: Order): void {\n' +
'    console.log("Order " + order.id + ": cancelled — no transitions allowed");\n' +
'  }\n' +
'  cancel(order: Order): void {\n' +
'    console.log("Order " + order.id + ": already cancelled");\n' +
'  }\n' +
'}\n\n' +
'// Usage\n' +
'const order = new Order("ORD-001");\n' +
'order.next();   // Pending -> Paid\n' +
'order.next();   // Paid -> Shipped\n' +
'order.cancel(); // cannot cancel — already shipped\n' +
'order.next();   // Shipped -> Delivered'
      }</code></pre>

      <h3 style={{ ...h3Style, fontSize: '1.1rem' }}>Python</h3>
      <pre style={preStyle}><code>{
'# State — Python (Order Processing)\n' +
'from abc import ABC, abstractmethod\n\n' +
'class OrderState(ABC):\n' +
'    name: str\n' +
'    @abstractmethod\n' +
'    def next(self, order: "Order") -> None: ...\n' +
'    @abstractmethod\n' +
'    def cancel(self, order: "Order") -> None: ...\n\n' +
'class Order:\n' +
'    def __init__(self, order_id: str):\n' +
'        self.id = order_id\n' +
'        self.state: OrderState = PendingState()\n\n' +
'    def next(self) -> None:\n' +
'        self.state.next(self)\n\n' +
'    def cancel(self) -> None:\n' +
'        self.state.cancel(self)\n\n' +
'    def transition_to(self, state: OrderState) -> None:\n' +
'        print(f"Order {self.id}: {self.state.name} -> {state.name}")\n' +
'        self.state = state\n\n' +
'class PendingState(OrderState):\n' +
'    name = "Pending"\n' +
'    def next(self, order: Order) -> None:\n' +
'        order.transition_to(PaidState())\n' +
'    def cancel(self, order: Order) -> None:\n' +
'        order.transition_to(CancelledState())\n\n' +
'class PaidState(OrderState):\n' +
'    name = "Paid"\n' +
'    def next(self, order: Order) -> None:\n' +
'        order.transition_to(ShippedState())\n' +
'    def cancel(self, order: Order) -> None:\n' +
'        print(f"Order {order.id}: refund initiated")\n' +
'        order.transition_to(CancelledState())\n\n' +
'class ShippedState(OrderState):\n' +
'    name = "Shipped"\n' +
'    def next(self, order: Order) -> None:\n' +
'        order.transition_to(DeliveredState())\n' +
'    def cancel(self, order: Order) -> None:\n' +
'        print(f"Order {order.id}: cannot cancel — already shipped")\n\n' +
'class DeliveredState(OrderState):\n' +
'    name = "Delivered"\n' +
'    def next(self, order: Order) -> None:\n' +
'        print(f"Order {order.id}: already delivered")\n' +
'    def cancel(self, order: Order) -> None:\n' +
'        print(f"Order {order.id}: cannot cancel — delivered")\n\n' +
'class CancelledState(OrderState):\n' +
'    name = "Cancelled"\n' +
'    def next(self, order: Order) -> None:\n' +
'        print(f"Order {order.id}: cancelled — no transitions")\n' +
'    def cancel(self, order: Order) -> None:\n' +
'        print(f"Order {order.id}: already cancelled")\n\n' +
'# Usage\n' +
'order = Order("ORD-001")\n' +
'order.next()    # Pending -> Paid\n' +
'order.next()    # Paid -> Shipped\n' +
'order.next()    # Shipped -> Delivered'
      }</code></pre>

      {/* ================================================================ */}
      {/* PATTERN SELECTION GUIDE */}
      {/* ================================================================ */}
      <h2 style={h2Style}>
        {isZh ? '四、模式选择指南' : '4. Pattern Selection Guide'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '选择正确的设计模式与正确实现一样重要。下表根据常见场景帮助你快速决策。'
          : 'Choosing the right design pattern is as important as implementing it correctly. The table below helps you make quick decisions based on common scenarios.'}
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
            <th style={thStyle}>{isZh ? '推荐模式' : 'Recommended Pattern'}</th>
            <th style={thStyle}>{isZh ? '原因' : 'Why'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '根据配置创建不同对象' : 'Create objects based on config'}</td><td style={tdStyle}>Factory</td><td style={tdStyle}>{isZh ? '解耦创建逻辑，易于扩展' : 'Decouple creation logic, easy to extend'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '构建具有多个可选参数的对象' : 'Build objects with many optional params'}</td><td style={tdStyle}>Builder</td><td style={tdStyle}>{isZh ? '可读性强，避免构造函数膨胀' : 'Readable, avoids constructor bloat'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '集成遗留系统或第三方库' : 'Integrate legacy or third-party libs'}</td><td style={tdStyle}>Adapter</td><td style={tdStyle}>{isZh ? '转换接口而不修改原有代码' : 'Convert interfaces without modifying existing code'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '动态组合行为（日志+重试+缓存）' : 'Combine behaviors dynamically (log+retry+cache)'}</td><td style={tdStyle}>Decorator</td><td style={tdStyle}>{isZh ? '运行时叠加功能，比继承灵活' : 'Stack features at runtime, more flexible than inheritance'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '控制对昂贵资源的访问' : 'Control access to expensive resources'}</td><td style={tdStyle}>Proxy</td><td style={tdStyle}>{isZh ? '懒加载、缓存、权限检查' : 'Lazy loading, caching, permission checks'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '简化复杂 API 或子系统' : 'Simplify complex APIs or subsystems'}</td><td style={tdStyle}>Facade</td><td style={tdStyle}>{isZh ? '提供简洁入口，降低耦合' : 'Provide clean entry point, reduce coupling'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '事件驱动通知机制' : 'Event-driven notification'}</td><td style={tdStyle}>Observer</td><td style={tdStyle}>{isZh ? '解耦发布者和订阅者' : 'Decouple publishers and subscribers'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '运行时切换算法' : 'Switch algorithms at runtime'}</td><td style={tdStyle}>Strategy</td><td style={tdStyle}>{isZh ? '消除条件分支，易于添加新算法' : 'Eliminate conditional branches, easy to add new algorithms'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '撤销/重做 或 任务队列' : 'Undo/redo or task queues'}</td><td style={tdStyle}>Command</td><td style={tdStyle}>{isZh ? '请求对象化，支持日志和回滚' : 'Objectify requests, support logging and rollback'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '对象行为随状态变化' : 'Object behavior varies with state'}</td><td style={tdStyle}>State</td><td style={tdStyle}>{isZh ? '消除状态判断的 if/switch 链' : 'Eliminate if/switch chains for state checks'}</td></tr>
        </tbody>
      </table>

      {/* ================================================================ */}
      {/* SOLID + DESIGN PATTERNS */}
      {/* ================================================================ */}
      <h2 style={h2Style}>
        {isZh ? '五、设计模式与 SOLID 原则' : '5. Design Patterns and SOLID Principles'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '设计模式并非凭空产生，它们与 SOLID 原则紧密关联。理解这种关系有助于你在合适的时机选择合适的模式。'
          : 'Design patterns do not exist in a vacuum — they are closely tied to the SOLID principles. Understanding this relationship helps you choose the right pattern at the right time.'}
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? 'SOLID 原则' : 'SOLID Principle'}</th>
            <th style={thStyle}>{isZh ? '相关模式' : 'Related Patterns'}</th>
            <th style={thStyle}>{isZh ? '关联说明' : 'Connection'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>SRP</td><td style={tdStyle}>Command, Strategy, State</td><td style={tdStyle}>{isZh ? '将职责拆分到独立的类中' : 'Separate responsibilities into individual classes'}</td></tr>
          <tr><td style={tdStyle}>OCP</td><td style={tdStyle}>Decorator, Strategy, Observer</td><td style={tdStyle}>{isZh ? '扩展行为而不修改已有代码' : 'Extend behavior without modifying existing code'}</td></tr>
          <tr><td style={tdStyle}>LSP</td><td style={tdStyle}>Factory, Adapter</td><td style={tdStyle}>{isZh ? '子类/适配器可替换父类/目标接口' : 'Subclasses/adapters can replace parent/target interfaces'}</td></tr>
          <tr><td style={tdStyle}>ISP</td><td style={tdStyle}>Adapter, Facade</td><td style={tdStyle}>{isZh ? '提供精简接口，不强迫实现不需要的方法' : 'Provide lean interfaces without forcing unneeded methods'}</td></tr>
          <tr><td style={tdStyle}>DIP</td><td style={tdStyle}>Factory, Strategy, Observer</td><td style={tdStyle}>{isZh ? '依赖抽象，而非具体实现' : 'Depend on abstractions, not concretions'}</td></tr>
        </tbody>
      </table>

      {/* ================================================================ */}
      {/* ANTI-PATTERNS */}
      {/* ================================================================ */}
      <h2 style={h2Style}>
        {isZh ? '六、常见反模式与陷阱' : '6. Common Anti-Patterns and Pitfalls'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '正确使用设计模式需要判断力。以下是开发者常犯的错误。'
          : 'Using design patterns correctly requires judgment. Here are common mistakes developers make.'}
      </p>
      <ul style={{ paddingLeft: '24px', color: '#374151', lineHeight: '2' }}>
        <li><strong>{isZh ? '过度设计' : 'Over-engineering'}</strong>{isZh ? '：不要在只有一种实现时使用 Factory，或在没有撤销需求时使用 Command' : ': Do not use Factory when there is only one implementation, or Command when undo is not needed'}</li>
        <li><strong>{isZh ? 'Singleton 滥用' : 'Singleton abuse'}</strong>{isZh ? '：全局状态使测试困难，优先使用依赖注入' : ': Global state makes testing hard; prefer dependency injection'}</li>
        <li><strong>{isZh ? '模式叠加' : 'Pattern stacking'}</strong>{isZh ? '：不要在同一个问题上应用三四种模式，保持简单' : ': Do not apply three or four patterns to the same problem; keep it simple'}</li>
        <li><strong>{isZh ? '忽略语言特性' : 'Ignoring language features'}</strong>{isZh ? '：Python 的一等函数可以替代很多 Strategy/Command 类' : ': Python first-class functions can replace many Strategy/Command classes'}</li>
        <li><strong>{isZh ? '过早抽象' : 'Premature abstraction'}</strong>{isZh ? '：在看到重复之前不要引入模式，遵循三次法则（Rule of Three）' : ': Do not introduce patterns before seeing duplication; follow the Rule of Three'}</li>
      </ul>

      {/* ================================================================ */}
      {/* CONCLUSION */}
      {/* ================================================================ */}
      <h2 style={h2Style}>
        {isZh ? '总结' : 'Conclusion'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '设计模式是经过时间检验的解决方案，但它们不是银弹。关键在于理解每种模式解决的问题、适用的场景以及带来的权衡。在 TypeScript 中，接口和类型系统为模式提供了编译时保障；在 Python 中，鸭子类型和 Protocol 让模式实现更简洁。无论使用哪种语言，记住：代码是写给人读的，模式的最大价值在于沟通和可维护性。'
          : 'Design patterns are time-tested solutions, but they are not silver bullets. The key is understanding what problem each pattern solves, when it applies, and what trade-offs it introduces. In TypeScript, interfaces and the type system provide compile-time guarantees for patterns. In Python, duck typing and Protocols make pattern implementations more concise. Regardless of language, remember: code is written for humans to read, and the greatest value of patterns lies in communication and maintainability.'}
      </p>

      {/* FAQ */}
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
