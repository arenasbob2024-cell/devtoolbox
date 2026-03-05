'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'OpenAI vs Claude: LLM Comparison for Developers',
    intro: 'OpenAI and Claude (Anthropic) are two leading large language model providers. OpenAI offers GPT-4 and GPT-3.5, while Anthropic provides Claude 3 and Claude 3.5 models. This comparison examines their capabilities, pricing, context windows, and ideal use cases for developers.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose OpenAI for mature ecosystem, function calling, and image analysis with GPT-4 Vision. Choose Claude for longer context (200K tokens), better instruction following, and safer outputs. Both excel at coding tasks, but Claude handles longer documents while OpenAI has broader tooling support.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Claude offers 200K token context vs GPT-4\'s 128K',
    takeaway2: 'OpenAI has more mature function calling and tool use',
    takeaway3: 'Claude excels at following complex, detailed instructions',
    takeaway4: 'OpenAI\'s GPT-4 Vision handles image analysis natively',
    takeaway5: 'Claude is generally more cost-effective for large contexts',
    takeaway6: 'Both models perform similarly on coding benchmarks',
    
    whatIsOpenaiTitle: 'What is OpenAI?',
    whatIsOpenaiContent: 'OpenAI is an AI research company founded in 2015. Their GPT (Generative Pre-trained Transformer) models, including GPT-4, GPT-4 Turbo, and GPT-3.5, power ChatGPT and are available via API. OpenAI focuses on general-purpose AI with strong capabilities in reasoning, coding, and multimodal tasks.',
    
    whatIsClaudeTitle: 'What is Claude?',
    whatIsClaudeContent: 'Claude is an AI assistant developed by Anthropic, founded by former OpenAI researchers. Claude 3 and Claude 3.5 models (Opus, Sonnet, Haiku) emphasize safety, helpfulness, and honesty. Claude is known for handling very long contexts and following detailed instructions precisely.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'API Usage Examples',
    codeExampleIntro: 'Code examples for both APIs:',
    
    openaiExampleTitle: 'OpenAI API Example',
    claudeExampleTitle: 'Claude API Example',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Cost analysis for different usage patterns:',
    
    useCasesTitle: 'Best Use Cases',
    openaiBestFor: 'OpenAI is Best For:',
    claudeBestFor: 'Claude is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'OpenAI and Claude serve complementary needs in the LLM ecosystem. OpenAI excels with its mature tooling ecosystem, function calling capabilities, and multimodal features. Claude shines with its massive context window, precise instruction following, and cost-effective long-document processing. Many developers use both: Claude for document analysis and complex reasoning tasks, OpenAI for tool-augmented applications and image analysis.',
    
    faq1q: 'Which model is better for coding?',
    faq1a: 'Both perform excellently on coding tasks. GPT-4 and Claude 3.5 Sonnet score similarly on coding benchmarks. Claude may have an edge with large codebases due to its longer context window, while OpenAI\'s function calling makes it easier to build coding assistants with tool access.',
    
    faq2q: 'What is the context window difference?',
    faq2a: 'Claude 3 and 3.5 models support up to 200K tokens of context. GPT-4 Turbo supports 128K tokens. This makes Claude better for processing long documents, large codebases, or extended conversations.',
    
    faq3q: 'Which is more cost-effective?',
    faq3a: 'For short prompts, pricing is similar. For long contexts, Claude is often more cost-effective due to efficient processing of large contexts. GPT-4 Turbo offers competitive pricing for high-volume applications.',
    
    faq4q: 'Can I use both in my application?',
    faq4a: 'Yes, many production applications use multiple LLM providers. You can route different tasks to different models based on their strengths. Frameworks like LangChain make it easy to switch between providers.',
    
    faq5q: 'Which has better function calling?',
    faq5a: 'OpenAI has more mature function calling with structured outputs and parallel function calls. Claude supports tool use but OpenAI\'s implementation is more battle-tested and widely documented.',
    
    faq6q: 'How do they compare on safety?',
    faq6a: 'Claude is designed with Constitutional AI principles for safer outputs. OpenAI has implemented various safety measures including content filters. Both have made significant safety investments but take different approaches.',
    
    faq7q: 'Which is better for RAG applications?',
    faq7a: 'Claude\'s longer context window can reduce the need for chunking in RAG systems. OpenAI has better integration with vector databases and RAG frameworks. Both work well, with the choice depending on your specific architecture.',
    
    faq8q: 'What about latency and speed?',
    faq8a: 'GPT-4 Turbo and Claude 3.5 Sonnet offer similar response speeds. Claude 3 Haiku is optimized for fast responses. Latency varies by model tier and prompt complexity.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'OpenAI vs Claude：开发者 LLM 对比指南',
    intro: 'OpenAI 和 Claude（Anthropic）是两个领先的大语言模型提供商。OpenAI 提供 GPT-4 和 GPT-3.5，而 Anthropic 提供 Claude 3 和 Claude 3.5 系列模型。本比较从开发者角度考察它们的能力、定价、上下文窗口和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为成熟生态系统、函数调用和 GPT-4 Vision 图像分析选择 OpenAI。为更长上下文（200K tokens）、更好的指令遵循和更安全的输出选择 Claude。两者都擅长编程任务，但 Claude 能处理更长文档，而 OpenAI 有更广泛的工具支持。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Claude 提供 200K token 上下文，GPT-4 为 128K',
    takeaway2: 'OpenAI 有更成熟的函数调用和工具使用',
    takeaway3: 'Claude 擅长遵循复杂、详细的指令',
    takeaway4: 'OpenAI 的 GPT-4 Vision 原生处理图像分析',
    takeaway5: 'Claude 在大上下文场景通常更具成本效益',
    takeaway6: '两个模型在编程基准测试上表现相似',
    
    whatIsOpenaiTitle: '什么是 OpenAI？',
    whatIsOpenaiContent: 'OpenAI 是 2015 年成立的 AI 研究公司。他们的 GPT（生成式预训练变换器）模型，包括 GPT-4、GPT-4 Turbo 和 GPT-3.5，驱动 ChatGPT 并通过 API 提供。OpenAI 专注于具有强大推理、编程和多模态能力的通用 AI。',
    
    whatIsClaudeTitle: '什么是 Claude？',
    whatIsClaudeContent: 'Claude 是由前 OpenAI 研究员创立的 Anthropic 开发的 AI 助手。Claude 3 和 Claude 3.5 模型（Opus、Sonnet、Haiku）强调安全性、帮助性和诚实性。Claude 以处理极长上下文和精确遵循详细指令而闻名。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: 'API 使用示例',
    codeExampleIntro: '两个 API 的代码示例：',
    
    openaiExampleTitle: 'OpenAI API 示例',
    claudeExampleTitle: 'Claude API 示例',
    
    pricingTitle: '定价对比',
    pricingIntro: '不同使用模式的成本分析：',
    
    useCasesTitle: '最佳用例',
    openaiBestFor: 'OpenAI 最适合：',
    claudeBestFor: 'Claude 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'OpenAI 和 Claude 在 LLM 生态系统中服务于互补需求。OpenAI 以其成熟的工具生态系统、函数调用能力和多模态功能脱颖而出。Claude 以其巨大的上下文窗口、精确的指令遵循和成本效益高的长文档处理而闪耀。许多开发者同时使用两者：Claude 用于文档分析和复杂推理任务，OpenAI 用于工具增强应用和图像分析。',
    
    faq1q: '哪个模型更适合编程？',
    faq1a: '两者在编程任务上都表现出色。GPT-4 和 Claude 3.5 Sonnet 在编程基准测试上得分相似。Claude 可能因更长的上下文窗口在大型代码库上有优势，而 OpenAI 的函数调用使构建带工具访问的编程助手更容易。',
    
    faq2q: '上下文窗口有什么区别？',
    faq2a: 'Claude 3 和 3.5 模型支持高达 200K tokens 的上下文。GPT-4 Turbo 支持 128K tokens。这使 Claude 更适合处理长文档、大型代码库或扩展对话。',
    
    faq3q: '哪个更具成本效益？',
    faq3a: '对于短提示，定价相似。对于长上下文，Claude 通常更具成本效益，因为能高效处理大上下文。GPT-4 Turbo 为高容量应用提供有竞争力的定价。',
    
    faq4q: '我可以在应用中同时使用两者吗？',
    faq4a: '是的，许多生产应用使用多个 LLM 提供商。你可以根据不同的任务优势将不同任务路由到不同模型。LangChain 等框架使在提供商之间切换变得容易。',
    
    faq5q: '哪个函数调用更好？',
    faq5a: 'OpenAI 有更成熟的函数调用，支持结构化输出和并行函数调用。Claude 支持工具使用，但 OpenAI 的实现更经过实战检验和广泛文档化。',
    
    faq6q: '它们在安全方面如何比较？',
    faq6a: 'Claude 采用 Constitutional AI 原则设计，输出更安全。OpenAI 已实施各种安全措施，包括内容过滤器。两者都在安全方面进行了重大投资，但采取了不同的方法。',
    
    faq7q: '哪个更适合 RAG 应用？',
    faq7a: 'Claude 更长的上下文窗口可以减少 RAG 系统中对分块的需求。OpenAI 与向量数据库和 RAG 框架的集成更好。两者都能很好地工作，选择取决于你的具体架构。',
    
    faq8q: '延迟和速度怎么样？',
    faq8a: 'GPT-4 Turbo 和 Claude 3.5 Sonnet 提供相似的响应速度。Claude 3 Haiku 针对快速响应进行了优化。延迟因模型层级和提示复杂性而异。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function OpenaiVsClaude({ lang }: { lang: string }) {
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

      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

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

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsOpenaiTitle}</h3>
      <p style={pStyle}>{ct.whatIsOpenaiContent}</p>

      <h3 style={h3Style}>{ct.whatIsClaudeTitle}</h3>
      <p style={pStyle}>{ct.whatIsClaudeContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>OpenAI (GPT-4)</th>
              <th style={thStyle}>Claude 3.5</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '上下文窗口' : 'Context Window', '128K tokens', '200K tokens'],
              [isZh ? '多模态' : 'Multimodal', isZh ? '文本、图像、音频' : 'Text, Image, Audio', isZh ? '文本、图像' : 'Text, Image'],
              [isZh ? '函数调用' : 'Function Calling', isZh ? '成熟、并行调用' : 'Mature, parallel calls', isZh ? '支持工具使用' : 'Tool use support'],
              [isZh ? '代码能力' : 'Coding', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent'],
              [isZh ? '长文档处理' : 'Long Documents', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              [isZh ? '推理能力' : 'Reasoning', isZh ? '强大' : 'Strong', isZh ? '强大' : 'Strong'],
              [isZh ? 'API 成熟度' : 'API Maturity', isZh ? '非常成熟' : 'Very mature', isZh ? '成熟' : 'Mature'],
              [isZh ? '生态系统' : 'Ecosystem', isZh ? '广泛' : 'Extensive', isZh ? '快速增长' : 'Growing fast'],
            ].map(([feature, openai, claude], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{openai}</td>
                <td style={tdStyle}>{claude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '能力' : 'Capability'}</th>
              <th style={thStyle}>OpenAI</th>
              <th style={thStyle}>Claude</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '结构化输出' : 'Structured Output', 'JSON mode, function calls', 'JSON mode, tool use'],
              [isZh ? '流式响应' : 'Streaming', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '系统提示' : 'System Prompt', isZh ? '支持' : 'Yes', isZh ? '支持（更灵活）' : 'Yes (more flexible)'],
              [isZh ? '图像分析' : 'Vision', 'GPT-4 Vision', 'Claude 3 Vision'],
              [isZh ? 'Fine-tuning' : 'Fine-tuning', isZh ? '支持' : 'Yes', isZh ? '部分支持' : 'Limited'],
              [isZh ? '嵌入模型' : 'Embeddings', 'text-embedding-3', isZh ? '无独立嵌入' : 'No separate API'],
              [isZh ? '助手 API' : 'Assistants API', isZh ? '内置' : 'Built-in', isZh ? '需要自建' : 'DIY needed'],
              [isZh ? '批处理' : 'Batch API', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
            ].map(([cap, openai, claude], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{openai}</td>
                <td style={tdStyle}>{claude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#10a37f' }}>{ct.openaiExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// OpenAI API Example (Node.js)\nimport OpenAI from "openai";\n\nconst openai = new OpenAI({\n  apiKey: process.env.OPENAI_API_KEY\n});\n\nasync function chat(prompt) {\n  const response = await openai.chat.completions.create({\n    model: "gpt-4-turbo",\n    messages: [\n      { role: "system", content: "You are a helpful assistant." },\n      { role: "user", content: prompt }\n    ],\n    temperature: 0.7,\n    max_tokens: 1000\n  });\n  \n  return response.choices[0].message.content;\n}\n\n// Function calling example\nasync function analyzeWithTools(text) {\n  const response = await openai.chat.completions.create({\n    model: "gpt-4-turbo",\n    messages: [{ role: "user", content: text }],\n    tools: [{\n      type: "function",\n      function: {\n        name: "get_weather",\n        description: "Get current weather",\n        parameters: {\n          type: "object",\n          properties: {\n            location: { type: "string" }\n          },\n          required: ["location"]\n        }\n      }\n    }]\n  });\n  \n  return response;\n}'}</code></pre>

      <h3 style={{ ...h3Style, color: '#d97706' }}>{ct.claudeExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// Claude API Example (Node.js)\nimport Anthropic from "@anthropic-ai/sdk";\n\nconst anthropic = new Anthropic({\n  apiKey: process.env.ANTHROPIC_API_KEY\n});\n\nasync function chat(prompt) {\n  const message = await anthropic.messages.create({\n    model: "claude-3-5-sonnet-20241022",\n    max_tokens: 1000,\n    system: "You are a helpful assistant.",\n    messages: [\n      { role: "user", content: prompt }\n    ]\n  });\n  \n  return message.content[0].text;\n}\n\n// Long context example (200K tokens)\nasync function analyzeLongDocument(document) {\n  const message = await anthropic.messages.create({\n    model: "claude-3-5-sonnet-20241022",\n    max_tokens: 4096,\n    messages: [{\n      role: "user",\n      content: "Analyze this document: " + document\n    }]\n  });\n  \n  return message.content[0].text;\n}'}</code></pre>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '模型' : 'Model'}</th>
              <th style={thStyle}>{isZh ? '输入价格' : 'Input Price'}</th>
              <th style={thStyle}>{isZh ? '输出价格' : 'Output Price'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['GPT-4 Turbo', '$10 / 1M tokens', '$30 / 1M tokens'],
              ['GPT-4o', '$5 / 1M tokens', '$15 / 1M tokens'],
              ['Claude 3.5 Sonnet', '$3 / 1M tokens', '$15 / 1M tokens'],
              ['Claude 3 Opus', '$15 / 1M tokens', '$75 / 1M tokens'],
              ['Claude 3 Haiku', '$0.25 / 1M tokens', '$1.25 / 1M tokens'],
              ['GPT-3.5 Turbo', '$0.50 / 1M tokens', '$1.50 / 1M tokens'],
            ].map(([model, input, output], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{model}</td>
                <td style={tdStyle}>{input}</td>
                <td style={tdStyle}>{output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #10a37f' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#10a37f' }}>{ct.openaiBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '函数调用和工具使用' : 'Function calling and tool use'}</li>
            <li>{isZh ? '多模态应用（图像+文本）' : 'Multimodal apps (image + text)'}</li>
            <li>{isZh ? '成熟生态系统集成' : 'Mature ecosystem integrations'}</li>
            <li>{isZh ? '助手和 Agent 应用' : 'Assistants and Agent apps'}</li>
            <li>{isZh ? '音频转写和分析' : 'Audio transcription and analysis'}</li>
            <li>{isZh ? '嵌入和向量搜索' : 'Embeddings and vector search'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #d97706' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#d97706' }}>{ct.claudeBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '长文档分析和总结' : 'Long document analysis'}</li>
            <li>{isZh ? '大型代码库理解' : 'Large codebase understanding'}</li>
            <li>{isZh ? '复杂指令遵循' : 'Complex instruction following'}</li>
            <li>{isZh ? '安全敏感应用' : 'Safety-sensitive applications'}</li>
            <li>{isZh ? '成本敏感的大上下文场景' : 'Cost-sensitive long context'}</li>
            <li>{isZh ? '研究和分析任务' : 'Research and analysis tasks'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/jwt-decoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a> • {' '}
        <a href={"/" + lang + "/tools/hash-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a>
      </div>

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
