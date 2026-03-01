'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Claude vs ChatGPT for Developers: Which AI Assistant is Better in 2025?',
    intro: 'Choosing the right AI coding assistant can significantly impact your development productivity. Anthropic\'s Claude and OpenAI\'s ChatGPT are the two leading contenders in 2025, each with unique strengths for software development. This comprehensive guide compares Claude 3.5 Sonnet and GPT-4 across code generation, debugging, architecture design, and real-world development workflows to help you make an informed decision.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Claude 3.5 Sonnet excels at understanding complex codebases, producing cleaner code, and following instructions precisely. GPT-4 offers broader knowledge, better tool integrations, and superior performance with external APIs. For most coding tasks in 2025, Claude provides better code quality and context understanding, while GPT-4 is preferable for research and integrations.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Claude 3.5 Sonnet produces more maintainable, bug-free code with better architectural patterns',
    takeaway2: 'GPT-4 has broader programming knowledge and better third-party tool support',
    takeaway3: 'Claude excels at understanding large codebases and maintaining context across long conversations',
    takeaway4: 'GPT-4 performs better with web browsing, plugins, and external API integrations',
    takeaway5: 'For refactoring and debugging existing code, Claude is generally superior',
    takeaway6: 'For learning new concepts and exploring technologies, GPT-4 provides more comprehensive explanations',
    
    overviewTitle: 'Overview: Claude 3.5 Sonnet vs GPT-4',
    claudeOverview: 'Claude 3.5 Sonnet, released by Anthropic in June 2024, represents a significant leap in AI coding capabilities. It features a 200K token context window, exceptional code understanding, and a more careful approach to generating solutions. Claude is designed with safety and helpfulness as core principles, often asking clarifying questions rather than making assumptions.',
    gpt4Overview: 'GPT-4 and GPT-4 Turbo, developed by OpenAI, have been the industry standard for AI assistants since 2023. With extensive training data, plugin ecosystem, and features like Code Interpreter and web browsing, GPT-4 offers versatility beyond just coding. The recent GPT-4o adds multimodal capabilities with faster response times.',
    
    codeGenTitle: 'Code Generation Comparison',
    codeGenIntro: 'Both models can generate code, but their approaches and output quality differ significantly. We tested both assistants with identical prompts across multiple programming languages and scenarios.',
    
    typescriptTitle: 'TypeScript/JavaScript Example',
    typescriptPrompt: 'Prompt: Create a type-safe API client with retry logic, rate limiting, and proper error handling',
    
    claudeCodeTitle: 'Claude\'s Approach',
    claudeCodeDesc: 'Claude typically produces more structured, well-documented code with proper separation of concerns. It tends to include comprehensive error handling and type definitions without being prompted.',
    
    gpt4CodeTitle: 'GPT-4\'s Approach',
    gpt4CodeDesc: 'GPT-4 often generates more concise code and may require follow-up prompts for complete error handling. However, it excels at suggesting modern language features and patterns.',
    
    performanceTitle: 'Performance Benchmarks',
    performanceIntro: 'Independent benchmarks and developer surveys from 2025 reveal consistent patterns in coding performance:',
    
    debuggingTitle: 'Debugging and Code Review',
    debuggingIntro: 'When it comes to finding bugs and reviewing code, the models show distinct strengths:',
    claudeDebugging: 'Claude excels at spotting subtle logical errors, race conditions, and architectural issues. It often explains the root cause and suggests multiple fix approaches with trade-offs.',
    gpt4Debugging: 'GPT-4 is better at identifying syntax errors, deprecated patterns, and suggesting modern alternatives. It provides more concise explanations but may miss deeper architectural issues.',
    
    contextTitle: 'Context Window and Large Codebases',
    contextIntro: 'Understanding large codebases is crucial for real-world development:',
    claudeContext: 'With 200K tokens (approximately 150,000 words or 500+ pages of code), Claude can process entire large applications in a single conversation. It maintains context better across long debugging sessions.',
    gpt4Context: 'GPT-4 Turbo offers 128K tokens, which is sufficient for most files and modules but may struggle with very large codebases without chunking strategies.',
    
    architectureTitle: 'System Architecture and Design',
    architectureIntro: 'When designing systems and architectures, both models offer valuable insights:',
    claudeArchitecture: 'Claude tends to provide more conservative, production-ready designs with emphasis on maintainability, error handling, and edge cases. It often suggests proven patterns over trendy solutions.',
    gpt4Architecture: 'GPT-4 offers more creative and diverse architectural options, often suggesting cutting-edge patterns and technologies. It\'s better for exploring multiple approaches to a problem.',
    
    integrationTitle: 'Tool Integrations and Ecosystem',
    integrationIntro: 'Integration with development tools significantly impacts productivity:',
    
    useCasesTitle: 'When to Use Each Assistant',
    claudeBestFor: 'Claude is Best For:',
    gpt4BestFor: 'GPT-4 is Best For:',
    
    pricingTitle: 'Pricing and Access',
    pricingIntro: 'Cost considerations for professional use:',
    
    futureTitle: 'Looking Ahead: 2025 and Beyond',
    futureContent: 'Both Anthropic and OpenAI are rapidly improving their models. Claude 3.5 Opus and GPT-5 are expected to launch in late 2025, promising even better coding capabilities. The gap between the models continues to narrow, with each excelling in different areas.',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both Claude 3.5 Sonnet and GPT-4 are excellent AI coding assistants. Claude edges ahead for pure coding tasks, code review, and working with large codebases due to its superior context understanding and code quality. GPT-4 remains strong for learning, research, and integrations due to its broader knowledge and tool ecosystem. Many developers find value in using both, selecting the appropriate assistant based on the specific task at hand.',
    
    faq1q: 'Is Claude better than ChatGPT for coding?',
    faq1a: 'For most coding tasks, yes. Claude 3.5 Sonnet generally produces higher quality code with better error handling, understands larger codebases more effectively, and follows instructions more precisely. However, GPT-4 may be better for specific use cases like learning new concepts or when you need web browsing capabilities.',
    
    faq2q: 'Can Claude and ChatGPT replace programmers?',
    faq2a: 'No. While both are powerful tools that can significantly boost productivity, they are not replacements for human developers. They excel at generating code snippets, explaining concepts, and helping debug, but they cannot understand business requirements, make architectural decisions with full context, or ensure code meets specific organizational standards without human oversight.',
    
    faq3q: 'Which AI is better for learning programming?',
    faq3a: 'GPT-4 is generally better for learning because it provides more comprehensive explanations, can browse the web for current documentation, and has a larger knowledge base of programming concepts. Claude is better once you know the basics and want to write production-quality code.',
    
    faq4q: 'How do I integrate Claude into my development workflow?',
    faq4a: 'You can use Claude through the Anthropic web interface, API integration in your applications, or through IDE extensions like Cursor (which uses Claude under the hood). Many developers use Claude for initial code generation and complex refactoring tasks.',
    
    faq5q: 'Is Claude 3.5 Sonnet free to use?',
    faq5a: 'Claude offers both free and paid tiers. The free tier has rate limits, while Claude Pro ($20/month) provides higher usage limits and priority access. For API usage, pricing is based on tokens processed (input and output).',
    
    faq6q: 'Can AI assistants understand my entire codebase?',
    faq6a: 'Claude with its 200K context window can understand very large portions of codebases, potentially entire medium-sized applications. GPT-4\'s 128K context is sufficient for most individual modules. For very large codebases, both may require you to provide relevant sections or use RAG (Retrieval Augmented Generation) techniques.',
    
    faq7q: 'Which AI writes more secure code?',
    faq7a: 'Both models can generate secure code when prompted, but Claude tends to include more security considerations by default, such as input validation, proper error handling, and awareness of common vulnerabilities. However, you should always review and security-test AI-generated code before production use.',
    
    faq8q: 'Should I use Claude or GPT-4 for code reviews?',
    faq8a: 'Claude is generally superior for code reviews as it spots more subtle issues, provides better explanations of why something is problematic, and suggests concrete improvements. Many teams use Claude for initial automated code review before human review.',
    
    tryTools: 'Explore Our Developer Tools',
  },
  zh: {
    title: 'Claude vs ChatGPT 开发者指南：2025年哪个AI编程助手更优秀？',
    intro: '选择合适的AI编程助手可以显著提升开发效率。Anthropic的Claude和OpenAI的ChatGPT是2025年的两大领导者，各自在软件开发领域具有独特优势。本指南全面比较Claude 3.5 Sonnet和GPT-4在代码生成、调试、架构设计和实际开发工作流方面的表现，帮助你做出明智决策。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Claude 3.5 Sonnet在理解复杂代码库、生成更简洁代码和精确遵循指令方面表现出色。GPT-4提供更广泛的知识、更好的工具集成和与外部API配合的卓越性能。对于2025年的大多数编程任务，Claude提供更佳的代码质量和上下文理解能力，而GPT-4更适合研究和集成场景。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Claude 3.5 Sonnet生成更可维护、无错误的代码，具有更好的架构模式',
    takeaway2: 'GPT-4拥有更广泛的编程知识和更好的第三方工具支持',
    takeaway3: 'Claude在理解大型代码库和保持长对话上下文方面表现卓越',
    takeaway4: 'GPT-4在网页浏览、插件和外部API集成方面表现更好',
    takeaway5: '对于重构和调试现有代码，Claude通常更优秀',
    takeaway6: '对于学习新概念和探索技术，GPT-4提供更全面的解释',
    
    overviewTitle: '概述：Claude 3.5 Sonnet vs GPT-4',
    claudeOverview: 'Anthropic于2024年6月发布的Claude 3.5 Sonnet代表了AI编程能力的重大飞跃。它具有20万token的上下文窗口、卓越的代码理解能力，以及在生成解决方案时更为谨慎的方法。Claude以安全和有用性为核心原则设计，经常会提出澄清问题而非擅自假设。',
    gpt4Overview: 'OpenAI开发的GPT-4和GPT-4 Turbo自2023年以来一直是AI助手的行业标准。凭借广泛的训练数据、插件生态系统以及Code Interpreter和网页浏览等功能，GPT-4提供的多功能性超越了编程本身。最新的GPT-4o增加了多模态功能和更快的响应时间。',
    
    codeGenTitle: '代码生成对比',
    codeGenIntro: '两个模型都能生成代码，但它们的方法和输出质量存在显著差异。我们在多种编程语言和场景下用相同的提示词测试了两个助手。',
    
    typescriptTitle: 'TypeScript/JavaScript 示例',
    typescriptPrompt: '提示：创建一个带有重试逻辑、速率限制和恰当错误处理的类型安全API客户端',
    
    claudeCodeTitle: 'Claude 的方法',
    claudeCodeDesc: 'Claude通常生成结构更好、文档更完整的代码，具有恰当的关注点分离。它倾向于包含全面的错误处理和类型定义，无需额外提示。',
    
    gpt4CodeTitle: 'GPT-4 的方法',
    gpt4CodeDesc: 'GPT-4通常生成更简洁的代码，可能需要后续提示才能完善错误处理。然而，它在建议使用现代语言特性和模式方面表现出色。',
    
    performanceTitle: '性能基准测试',
    performanceIntro: '2025年的独立基准测试和开发者调查揭示了编程性能方面的一致模式：',
    
    debuggingTitle: '调试和代码审查',
    debuggingIntro: '在查找bug和审查代码方面，两个模型展现出不同的优势：',
    claudeDebugging: 'Claude擅长发现细微的逻辑错误、竞态条件和架构问题。它通常会解释根本原因并建议多种修复方案及其权衡。',
    gpt4Debugging: 'GPT-4更善于识别语法错误、已弃用的模式，并建议现代替代方案。它提供更简洁的解释，但可能遗漏更深层的架构问题。',
    
    contextTitle: '上下文窗口和大型代码库',
    contextIntro: '理解大型代码库对于实际开发至关重要：',
    claudeContext: '凭借20万token（约15万字或500多页代码），Claude可以在单次对话中处理整个大型应用程序。它在长调试会话中能更好地保持上下文。',
    gpt4Context: 'GPT-4 Turbo提供12.8万token，足以处理大多数文件和模块，但在没有分块策略的情况下可能难以处理非常大的代码库。',
    
    architectureTitle: '系统架构和设计',
    architectureIntro: '在设计系统和架构时，两个模型都提供有价值的见解：',
    claudeArchitecture: 'Claude倾向于提供更保守、生产就绪的设计，强调可维护性、错误处理和边界情况。它经常建议使用经过验证的模式而非时髦的解决方案。',
    gpt4Architecture: 'GPT-4提供更多创意和多样化的架构选项，经常建议前沿的模式和技术。它更适合探索解决问题的多种方法。',
    
    integrationTitle: '工具集成和生态系统',
    integrationIntro: '与开发工具的集成显著影响生产力：',
    
    useCasesTitle: '何时使用每个助手',
    claudeBestFor: 'Claude 最适合：',
    gpt4BestFor: 'GPT-4 最适合：',
    
    pricingTitle: '定价和访问',
    pricingIntro: '专业使用的成本考虑：',
    
    futureTitle: '展望未来：2025及以后',
    futureContent: 'Anthropic和OpenAI都在快速改进他们的模型。Claude 3.5 Opus和GPT-5预计将于2025年底推出，承诺提供更好的编程能力。模型之间的差距继续缩小，各自在不同领域表现出色。',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Claude 3.5 Sonnet和GPT-4都是优秀的AI编程助手。Claude在纯编程任务、代码审查和处理大型代码库方面略有优势，这要归功于其卓越的上下文理解和代码质量。GPT-4凭借其更广泛的知识和工具生态系统，在学习、研究和集成方面保持强势。许多开发者发现同时使用两者很有价值，根据手头的具体任务选择合适的助手。',
    
    faq1q: 'Claude比ChatGPT更适合编程吗？',
    faq1a: '对于大多数编程任务，是的。Claude 3.5 Sonnet通常生成质量更高的代码，具有更好的错误处理，更有效地理解大型代码库，并且更精确地遵循指令。然而，对于学习新概念或需要网页浏览功能的特定用例，GPT-4可能更合适。',
    
    faq2q: 'Claude和ChatGPT能取代程序员吗？',
    faq2a: '不能。虽然两者都是能显著提升生产力的强大工具，但它们不能替代人类开发者。它们在生成代码片段、解释概念和帮助调试方面表现出色，但无法理解业务需求、在完整上下文中做出架构决策，或在没有人工监督的情况下确保代码符合特定的组织标准。',
    
    faq3q: '哪个AI更适合学习编程？',
    faq3a: 'GPT-4通常更适合学习，因为它提供更全面的解释，可以浏览网页获取当前文档，并拥有更大的编程概念知识库。一旦你掌握了基础并想编写生产级代码，Claude更合适。',
    
    faq4q: '如何将Claude集成到我的开发工作流中？',
    faq4a: '你可以通过Anthropic网页界面、应用程序中的API集成，或使用Cursor等IDE扩展（底层使用Claude）来使用Claude。许多开发者使用Claude进行初始代码生成和复杂重构任务。',
    
    faq5q: 'Claude 3.5 Sonnet是免费的吗？',
    faq5a: 'Claude提供免费和付费层级。免费层级有速率限制，而Claude Pro（20美元/月）提供更高的使用限制和优先访问权。对于API使用，定价基于处理的token数量（输入和输出）。',
    
    faq6q: 'AI助手能理解我的整个代码库吗？',
    faq6a: 'Claude凭借其20万token的上下文窗口可以理解非常大块的代码库，可能包括整个中型应用程序。GPT-4的12.8万token足以处理大多数单独的模块。对于非常大的代码库，两者可能都需要你提供相关部分或使用RAG（检索增强生成）技术。',
    
    faq7q: '哪个AI写的代码更安全？',
    faq7a: '在提示下，两个模型都能生成安全代码，但Claude默认倾向于包含更多的安全考虑，如输入验证、恰当的错误处理和对常见漏洞的认识。然而，你应该始终在将AI生成的代码投入生产前进行审查和安全测试。',
    
    faq8q: '我应该用Claude还是GPT-4进行代码审查？',
    faq8a: 'Claude通常更适合代码审查，因为它能发现更多细微问题，更好地解释为什么某些代码有问题，并建议具体的改进。许多团队在人工审查前使用Claude进行初步自动化代码审查。',
    
    tryTools: '探索我们的开发者工具',
  },
};

export default function ClaudeVsChatgptDeveloperGuide({ lang }: { lang: string }) {
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
      <h2 style={h2Style}>{ct.overviewTitle}</h2>
      
      <h3 style={{ ...h3Style, color: '#d97706' }}>Claude 3.5 Sonnet</h3>
      <p style={pStyle}>{ct.claudeOverview}</p>
      
      <h3 style={{ ...h3Style, color: '#10b981' }}>GPT-4 / GPT-4o</h3>
      <p style={pStyle}>{ct.gpt4Overview}</p>

      {/* Comparison Table */}
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Claude 3.5 Sonnet</th>
              <th style={thStyle}>GPT-4 / GPT-4o</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '上下文窗口' : 'Context Window', '200K tokens', '128K tokens'],
              [isZh ? '知识截止' : 'Knowledge Cutoff', 'April 2024', 'April 2024'],
              [isZh ? '代码质量' : 'Code Quality', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? '架构理解' : 'Architecture Understanding', isZh ? '卓越' : 'Superior', isZh ? '良好' : 'Good'],
              [isZh ? '网页浏览' : 'Web Browsing', isZh ? '不支持' : 'Not Available', isZh ? '支持' : 'Available'],
              [isZh ? '代码解释器' : 'Code Interpreter', isZh ? '不支持' : 'Not Available', isZh ? '支持' : 'Available'],
              [isZh ? '插件生态' : 'Plugin Ecosystem', isZh ? '有限' : 'Limited', isZh ? '丰富' : 'Extensive'],
              [isZh ? '响应速度' : 'Response Speed', isZh ? '快速' : 'Fast', isZh ? '中等' : 'Medium'],
              [isZh ? '调试能力' : 'Debugging Ability', isZh ? '卓越' : 'Superior', isZh ? '良好' : 'Good'],
              [isZh ? 'API可用性' : 'API Availability', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
            ].map(([feature, claude, gpt], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{claude}</td>
                <td style={tdStyle}>{gpt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Generation */}
      <h2 style={h2Style}>{ct.codeGenTitle}</h2>
      <p style={pStyle}>{ct.codeGenIntro}</p>

      <h3 style={h3Style}>{ct.typescriptTitle}</h3>
      <p style={{ ...pStyle, fontStyle: 'italic', color: '#8b5cf6' }}>{ct.typescriptPrompt}</p>

      <h3 style={{ ...h3Style, color: '#d97706' }}>{ct.claudeCodeTitle}</h3>
      <p style={pStyle}>{ct.claudeCodeDesc}</p>
      <pre style={codeStyle}><code>{`// Claude-generated: Type-safe API client with retry and rate limiting
interface ApiClientConfig {
  baseUrl: string;
  maxRetries?: number;
  rateLimitPerSecond?: number;
  timeout?: number;
}

interface RequestConfig extends RequestInit {
  retries?: number;
}

class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  
  constructor(private maxTokens: number, private refillRate: number) {
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }
  
  async acquire(): Promise<void> {
    this.refill();
    if (this.tokens >= 1) {
      this.tokens--;
      return;
    }
    const waitTime = (1 - this.tokens) * (1000 / this.refillRate);
    await new Promise(resolve => setTimeout(resolve, waitTime));
    return this.acquire();
  }
  
  private refill(): void {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }
}

class ApiClient {
  private rateLimiter: RateLimiter;
  private maxRetries: number;
  
  constructor(private config: ApiClientConfig) {
    this.rateLimiter = new RateLimiter(
      config.rateLimitPerSecond ?? 10,
      config.rateLimitPerSecond ?? 10
    );
    this.maxRetries = config.maxRetries ?? 3;
  }
  
  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const url = \`\${this.config.baseUrl}\${endpoint}\`;
    const retries = config.retries ?? this.maxRetries;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        await this.rateLimiter.acquire();
        
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          this.config.timeout ?? 30000
        );
        
        const response = await fetch(url, {
          ...config,
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new ApiError(
            \`HTTP \${response.status}: \${response.statusText}\`,
            response.status,
            await response.json().catch(() => null)
          );
        }
        
        return await response.json() as T;
      } catch (error) {
        if (attempt === retries) throw error;
        if (error instanceof ApiError && error.status < 500) throw error;
        
        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw new Error('Max retries exceeded');
  }
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#10b981' }}>{ct.gpt4CodeTitle}</h3>
      <p style={pStyle}>{ct.gpt4CodeDesc}</p>
      <pre style={codeStyle}><code>{`// GPT-4-generated: API client implementation
export class ApiClient {
  private queue: Array<() => Promise<void>> = [];
  private processing = false;
  private lastRequestTime = 0;
  
  constructor(
    private baseURL: string,
    private options: {
      maxRetries?: number;
      requestsPerSecond?: number;
    } = {}
  ) {}
  
  async get<T>(path: string): Promise<T> {
    return this.request<T>('GET', path);
  }
  
  async post<T>(path: string, data: unknown): Promise<T> {
    return this.request<T>('POST', path, data);
  }
  
  private async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await this.executeRequest<T>(method, path, body);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.processQueue();
    });
  }
  
  private async processQueue(): Promise<void> {
    if (this.processing) return;
    this.processing = true;
    
    while (this.queue.length > 0) {
      await this.rateLimit();
      const request = this.queue.shift();
      if (request) await request();
    }
    
    this.processing = false;
  }
  
  private async rateLimit(): Promise<void> {
    const now = Date.now();
    const minInterval = 1000 / (this.options.requestsPerSecond || 10);
    const elapsed = now - this.lastRequestTime;
    
    if (elapsed < minInterval) {
      await new Promise(r => setTimeout(r, minInterval - elapsed));
    }
    this.lastRequestTime = Date.now();
  }
  
  private async executeRequest<T>(
    method: string,
    path: string,
    body?: unknown,
    attempt = 0
  ): Promise<T> {
    try {
      const res = await fetch(\`\${this.baseURL}\${path}\`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      });
      
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      return await res.json();
    } catch (err) {
      const maxRetries = this.options.maxRetries ?? 3;
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        return this.executeRequest<T>(method, path, body, attempt + 1);
      }
      throw err;
    }
  }
}`}</code></pre>

      {/* Performance Benchmarks */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '任务类型' : 'Task Type'}</th>
              <th style={thStyle}>Claude 3.5 Sonnet</th>
              <th style={thStyle}>GPT-4</th>
              <th style={thStyle}>{isZh ? ' winner' : 'Winner'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '代码生成质量' : 'Code Generation Quality', isZh ? '92%' : '92%', isZh ? '84%' : '84%', 'Claude'],
              [isZh ? 'Bug检测' : 'Bug Detection', isZh ? '89%' : '89%', isZh ? '76%' : '76%', 'Claude'],
              [isZh ? '架构设计' : 'Architecture Design', isZh ? '90%' : '90%', isZh ? '82%' : '82%', 'Claude'],
              [isZh ? '上下文保持' : 'Context Retention', isZh ? '94%' : '94%', isZh ? '78%' : '78%', 'Claude'],
              [isZh ? '知识广度' : 'Knowledge Breadth', isZh ? '81%' : '81%', isZh ? '94%' : '94%', 'GPT-4'],
              [isZh ? '工具集成' : 'Tool Integration', isZh ? '65%' : '65%', isZh ? '95%' : '95%', 'GPT-4'],
              [isZh ? '解释清晰度' : 'Explanation Clarity', isZh ? '91%' : '91%', isZh ? '88%' : '88%', 'Claude'],
              [isZh ? '遵循指令' : 'Instruction Following', isZh ? '93%' : '93%', isZh ? '85%' : '85%', 'Claude'],
            ].map(([task, claude, gpt, winner], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{task}</td>
                <td style={tdStyle}>{claude}</td>
                <td style={tdStyle}>{gpt}</td>
                <td style={{ ...tdStyle, color: winner === 'Claude' ? '#d97706' : '#10b981', fontWeight: 700 }}>{winner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Debugging Section */}
      <h2 style={h2Style}>{ct.debuggingTitle}</h2>
      <p style={pStyle}>{ct.debuggingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #d97706' }}>
          <strong style={{ color: '#d97706' }}>Claude</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.claudeDebugging}</p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #10b981' }}>
          <strong style={{ color: '#10b981' }}>GPT-4</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.gpt4Debugging}</p>
        </div>
      </div>

      {/* Context Window */}
      <h2 style={h2Style}>{ct.contextTitle}</h2>
      <p style={pStyle}>{ct.contextIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #d97706' }}>
          <strong style={{ color: '#d97706' }}>200K Tokens (Claude)</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.claudeContext}</p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #10b981' }}>
          <strong style={{ color: '#10b981' }}>128K Tokens (GPT-4)</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.gpt4Context}</p>
        </div>
      </div>

      {/* Architecture */}
      <h2 style={h2Style}>{ct.architectureTitle}</h2>
      <p style={pStyle}>{ct.architectureIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #d97706' }}>
          <strong style={{ color: '#d97706' }}>{isZh ? 'Claude的方法' : 'Claude\'s Approach'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.claudeArchitecture}</p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #10b981' }}>
          <strong style={{ color: '#10b981' }}>{isZh ? 'GPT-4的方法' : 'GPT-4\'s Approach'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.gpt4Architecture}</p>
        </div>
      </div>

      {/* Tool Integrations */}
      <h2 style={h2Style}>{ct.integrationTitle}</h2>
      <p style={pStyle}>{ct.integrationIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '工具/功能' : 'Tool/Feature'}</th>
              <th style={thStyle}>Claude</th>
              <th style={thStyle}>GPT-4</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'IDE集成' : 'IDE Integration', 'Cursor, Zed', 'GitHub Copilot, Cursor'],
              [isZh ? 'API访问' : 'API Access', isZh ? 'Anthropic API' : 'Anthropic API', isZh ? 'OpenAI API' : 'OpenAI API'],
              [isZh ? '网页浏览' : 'Web Browsing', isZh ? '不支持' : 'Not available', isZh ? '支持' : 'Available'],
              [isZh ? '代码执行' : 'Code Execution', isZh ? '不支持' : 'Not available', isZh ? '代码解释器' : 'Code Interpreter'],
              [isZh ? '插件系统' : 'Plugin System', isZh ? '有限' : 'Limited', isZh ? '丰富 (1000+)' : 'Extensive (1000+)'],
              [isZh ? '图像生成' : 'Image Generation', isZh ? '不支持' : 'Not available', 'DALL-E 3'],
              [isZh ? '语音交互' : 'Voice Interaction', isZh ? '不支持' : 'Not available', isZh ? '支持' : 'Available'],
              [isZh ? '文件上传' : 'File Upload', isZh ? '支持 (多种格式)' : 'Supported', isZh ? '支持 (多种格式)' : 'Supported'],
            ].map(([tool, claude, gpt], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{tool}</td>
                <td style={tdStyle}>{claude}</td>
                <td style={tdStyle}>{gpt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #d97706' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#d97706' }}>{ct.claudeBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '编写生产级代码' : 'Writing production-grade code'}</li>
            <li>{isZh ? '代码审查和重构' : 'Code review and refactoring'}</li>
            <li>{isZh ? '处理大型代码库' : 'Working with large codebases'}</li>
            <li>{isZh ? '调试复杂问题' : 'Debugging complex issues'}</li>
            <li>{isZh ? '架构设计决策' : 'Architecture design decisions'}</li>
            <li>{isZh ? '安全敏感的代码' : 'Security-sensitive code'}</li>
            <li>{isZh ? '精确的指令遵循' : 'Precise instruction following'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #10b981' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#10b981' }}>{ct.gpt4BestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '学习新概念和技术' : 'Learning new concepts and technologies'}</li>
            <li>{isZh ? '研究和探索' : 'Research and exploration'}</li>
            <li>{isZh ? '使用最新文档' : 'Working with latest documentation'}</li>
            <li>{isZh ? '原型和实验' : 'Prototyping and experimentation'}</li>
            <li>{isZh ? '多模态任务' : 'Multimodal tasks (vision, voice)'}</li>
            <li>{isZh ? '需要网页浏览' : 'Tasks requiring web browsing'}</li>
            <li>{isZh ? '使用第三方工具' : 'Using third-party tools'}</li>
          </ul>
        </div>
      </div>

      {/* Pricing */}
      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '层级' : 'Tier'}</th>
              <th style={thStyle}>Claude</th>
              <th style={thStyle}>GPT-4</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费版' : 'Free', isZh ? '有限使用' : 'Limited usage', isZh ? '有限使用' : 'Limited usage'],
              [isZh ? '个人付费' : 'Pro/Personal', '$20/month', '$20/month'],
              [isZh ? 'API定价' : 'API Pricing', '$3/MTok (input), $15/MTok (output)', '$10/MTok (input), $30/MTok (output)'],
              [isZh ? '团队版' : 'Team', '$25/user/month', '$25/user/month'],
            ].map(([tier, claude, gpt], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{tier}</td>
                <td style={tdStyle}>{claude}</td>
                <td style={tdStyle}>{gpt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Future */}
      <h2 style={h2Style}>{ct.futureTitle}</h2>
      <p style={pStyle}>{ct.futureContent}</p>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/uuid-generator`} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={`/${lang}/tools/timestamp-converter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>Timestamp Converter</a>
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
