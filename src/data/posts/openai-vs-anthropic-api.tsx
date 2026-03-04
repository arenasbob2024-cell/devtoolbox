'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'OpenAI vs Anthropic API: LLM API Comparison',
    intro: 'OpenAI and Anthropic are two leading providers of large language model APIs. OpenAI offers GPT-4, GPT-3.5, and DALL-E models, while Anthropic provides Claude models with a focus on safety and honesty. This comparison examines their APIs, pricing, capabilities, and ideal use cases for developers building AI applications.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose OpenAI for mature ecosystem, extensive documentation, and multimodal capabilities (text, images, code). Choose Anthropic for longer context windows (200K tokens), superior safety features, and nuanced understanding. Both offer powerful models with different strengths in reasoning, creativity, and reliability.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'OpenAI has larger ecosystem and more integrations',
    takeaway2: 'Anthropic offers 200K token context vs OpenAI\'s 128K',
    takeaway3: 'Claude excels at following complex instructions',
    takeaway4: 'GPT-4 has multimodal capabilities (vision)',
    takeaway5: 'Both provide function calling and structured outputs',
    takeaway6: 'Anthropic focuses more on safety and honesty',
    
    whatIsOpenAITitle: 'What is OpenAI API?',
    whatIsOpenAIContent: 'OpenAI API provides access to GPT-4, GPT-3.5, DALL-E, and other AI models. Founded in 2015, OpenAI pioneered large language model APIs. The platform offers text generation, code completion, image generation, embeddings, and speech services. OpenAI is known for its mature API, extensive documentation, and large developer community.',
    
    whatIsAnthropicTitle: 'What is Anthropic API?',
    whatIsAnthropicContent: 'Anthropic API provides access to Claude models, designed with a focus on safety, honesty, and helpfulness. Founded in 2021 by former OpenAI researchers, Anthropic emphasizes constitutional AI and responsible development. Claude models excel at following complex instructions, nuanced analysis, and maintaining context over long conversations.',
    
    performanceTitle: 'Model Comparison',
    performanceIntro: 'Comparing available models and capabilities:',
    
    featuresTitle: 'API Feature Matrix',
    featuresIntro: 'Side-by-side comparison of API features:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'API usage patterns:',
    
    openaiExampleTitle: 'OpenAI API Example',
    anthropicExampleTitle: 'Anthropic API Example',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Cost analysis for different use cases:',
    
    useCasesTitle: 'Best Use Cases',
    openaiBestFor: 'OpenAI is Best For:',
    anthropicBestFor: 'Anthropic is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'OpenAI and Anthropic offer complementary strengths. OpenAI is ideal for developers needing multimodal capabilities, extensive ecosystem integrations, and mature tooling. Anthropic excels in applications requiring long context, complex instruction following, and safety-conscious deployments. Many teams use both: OpenAI for general tasks and multimodal features, Anthropic for nuanced reasoning and long-document processing.',
    
    faq1q: 'Which has better pricing?',
    faq1a: 'Pricing is competitive and use-case dependent. OpenAI GPT-4 Turbo is cheaper than Claude 3 Opus but more expensive than Claude 3 Sonnet. For high-volume applications, Claude 3 Haiku is very cost-effective. Calculate costs based on your specific token usage and context requirements.',
    
    faq2q: 'Which is better for coding?',
    faq2a: 'Both excel at coding. OpenAI GPT-4 is widely used in coding assistants (GitHub Copilot). Claude 3.5 Sonnet shows excellent performance on coding benchmarks. Both support function calling for structured code generation. Try both with your specific coding tasks to determine the best fit.',
    
    faq3q: 'What about context window size?',
    faq3a: 'Anthropic leads with 200K token context (Claude 3). OpenAI GPT-4 Turbo offers 128K tokens. For most applications, both are sufficient. For analyzing very long documents (books, codebases), Claude\'s larger context is advantageous.',
    
    faq4q: 'Which has better safety features?',
    faq4a: 'Anthropic has built a reputation for safety-first development with constitutional AI. Claude models are designed to be helpful, harmless, and honest. OpenAI has robust content filtering and moderation. Both take safety seriously but with different philosophical approaches.',
    
    faq5q: 'Can I use both APIs together?',
    faq5a: 'Yes, many applications use both APIs. You can use LangChain or LlamaIndex to abstract provider differences, allowing easy switching or parallel usage. Some teams use Claude for complex reasoning and GPT-4 for multimodal tasks.',
    
    faq6q: 'Which has better streaming support?',
    faq6a: 'Both offer excellent streaming support. OpenAI and Anthropic provide server-sent events (SSE) for real-time token streaming. Both work well with modern web frameworks and support streaming in all major SDK languages.',
    
    faq7q: 'What about rate limits and availability?',
    faq7a: 'Both have rate limits based on your tier. OpenAI has usage tiers with increasing limits. Anthropic offers similar tiered access. Both maintain high availability (99.9%+ SLA for enterprise). Consider implementing fallbacks between providers for critical applications.',
    
    faq8q: 'Which has better function calling?',
    faq8a: 'Both support function calling/tool use. OpenAI has mature function calling with JSON Schema validation. Anthropic\'s tool use is equally capable with structured outputs. Both allow complex multi-step tool interactions. The choice depends on your specific integration needs.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'OpenAI vs Anthropic API：LLM API 对比',
    intro: 'OpenAI 和 Anthropic 是大语言模型 API 的两个领先提供商。OpenAI 提供 GPT-4、GPT-3.5 和 DALL-E 模型，而 Anthropic 提供 Claude 模型，专注于安全性和诚实性。本比较考察它们的 API、定价、功能和开发者构建 AI 应用的理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为成熟的生态系统、广泛的文档和多模态能力（文本、图像、代码）选择 OpenAI。为更长的上下文窗口（200K tokens）、卓越的安全特性和细致的理解选择 Anthropic。两者都提供在推理、创造力和可靠性方面各有优势的强大模型。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'OpenAI 拥有更大的生态系统和更多集成',
    takeaway2: 'Anthropic 提供 200K token 上下文 vs OpenAI 的 128K',
    takeaway3: 'Claude 在遵循复杂指令方面表现出色',
    takeaway4: 'GPT-4 具有多模态能力（视觉）',
    takeaway5: '两者都提供函数调用和结构化输出',
    takeaway6: 'Anthropic 更专注于安全性和诚实性',
    
    whatIsOpenAITitle: '什么是 OpenAI API？',
    whatIsOpenAIContent: 'OpenAI API 提供对 GPT-4、GPT-3.5、DALL-E 和其他 AI 模型的访问。成立于 2015 年，OpenAI 开创了大语言模型 API。该平台提供文本生成、代码补全、图像生成、嵌入和语音服务。OpenAI 以其成熟的 API、广泛的文档和大型开发者社区而闻名。',
    
    whatIsAnthropicTitle: '什么是 Anthropic API？',
    whatIsAnthropicContent: 'Anthropic API 提供对 Claude 模型的访问，专注于安全性、诚实性和有用性。由前 OpenAI 研究人员于 2021 年创立，Anthropic 强调宪法 AI 和负责任的开发。Claude 模型在遵循复杂指令、细致分析和在长对话中保持上下文方面表现出色。',
    
    performanceTitle: '模型对比',
    performanceIntro: '比较可用模型和能力：',
    
    featuresTitle: 'API 功能矩阵',
    featuresIntro: 'API 功能的并排比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: 'API 使用模式：',
    
    openaiExampleTitle: 'OpenAI API 示例',
    anthropicExampleTitle: 'Anthropic API 示例',
    
    pricingTitle: '定价对比',
    pricingIntro: '不同用例的成本分析：',
    
    useCasesTitle: '最佳用例',
    openaiBestFor: 'OpenAI 最适合：',
    anthropicBestFor: 'Anthropic 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'OpenAI 和 Anthropic 提供互补的优势。OpenAI 适合需要多模态能力、广泛生态系统集成和成熟工具的开发者。Anthropic 在需要长上下文、复杂指令遵循和安全意识部署的应用中表现出色。许多团队同时使用两者：OpenAI 用于一般任务和多模态功能，Anthropic 用于细致推理和长文档处理。',
    
    faq1q: '哪个定价更好？',
    faq1a: '定价具有竞争力且取决于用例。OpenAI GPT-4 Turbo 比 Claude 3 Opus 便宜，但比 Claude 3 Sonnet 贵。对于高容量应用，Claude 3 Haiku 非常具有成本效益。根据你的特定 token 使用量和上下文要求计算成本。',
    
    faq2q: '哪个更适合编程？',
    faq2a: '两者都在编程方面表现出色。OpenAI GPT-4 广泛用于编程助手（GitHub Copilot）。Claude 3.5 Sonnet 在编程基准测试中表现出色。两者都支持用于结构化代码生成的函数调用。使用你的特定编程任务测试两者以确定最佳选择。',
    
    faq3q: '上下文窗口大小如何？',
    faq3a: 'Anthropic 以 200K token 上下文（Claude 3）领先。OpenAI GPT-4 Turbo 提供 128K tokens。对于大多数应用，两者都足够。对于分析非常长的文档（书籍、代码库），Claude 的更大上下文具有优势。',
    
    faq4q: '哪个安全特性更好？',
    faq4a: 'Anthropic 通过宪法 AI 建立了安全优先开发的声誉。Claude 模型旨在成为有帮助的、无害的和诚实的。OpenAI 有强大的内容过滤和审核。两者都认真对待安全，但有不同的哲学方法。',
    
    faq5q: '我可以同时使用两个 API 吗？',
    faq5a: '是的，许多应用同时使用两个 API。你可以使用 LangChain 或 LlamaIndex 抽象提供商差异，允许轻松切换或并行使用。一些团队使用 Claude 进行复杂推理，使用 GPT-4 进行多模态任务。',
    
    faq6q: '哪个流式支持更好？',
    faq6a: '两者都提供出色的流式支持。OpenAI 和 Anthropic 为实时 token 流式传输提供服务器发送事件（SSE）。两者都与现代 Web 框架良好配合，并支持所有主要 SDK 语言的流式传输。',
    
    faq7q: '速率限制和可用性如何？',
    faq7a: '两者都有基于你的层级的速率限制。OpenAI 有使用层级，限制递增。Anthropic 提供类似的分层访问。两者都保持高可用性（企业 SLA 99.9%+）。考虑在关键应用的提供商之间实施回退。',
    
    faq8q: '哪个函数调用更好？',
    faq8a: '两者都支持函数调用/工具使用。OpenAI 有成熟的函数调用和 JSON Schema 验证。Anthropic 的工具使用同样具有结构化输出的能力。两者都允许复杂的多步工具交互。选择取决于你的特定集成需求。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function OpenAIVsAnthropicAPI({ lang }: { lang: string }) {
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
      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsOpenAITitle}</h3>
      <p style={pStyle}>{ct.whatIsOpenAIContent}</p>

      <h3 style={h3Style}>{ct.whatIsAnthropicTitle}</h3>
      <p style={pStyle}>{ct.whatIsAnthropicContent}</p>

      {/* Model Comparison */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '模型' : 'Model'}</th>
              <th style={thStyle}>OpenAI</th>
              <th style={thStyle}>Anthropic</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '旗舰模型' : 'Flagship Model', 'GPT-4 Turbo', 'Claude 3.5 Sonnet'],
              [isZh ? '快速模型' : 'Fast Model', 'GPT-3.5 Turbo', 'Claude 3 Haiku'],
              [isZh ? '强大模型' : 'Powerful Model', 'GPT-4', 'Claude 3 Opus'],
              [isZh ? '最大上下文' : 'Max Context', '128K tokens', '200K tokens'],
              [isZh ? '多模态' : 'Multimodal', isZh ? '文本、图像' : 'Text, Vision', isZh ? '文本、图像' : 'Text, Vision'],
              [isZh ? '函数调用' : 'Function Calling', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '流式输出' : 'Streaming', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
            ].map(([feature, openai, anthropic], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{openai}</td>
                <td style={tdStyle}>{anthropic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>OpenAI</th>
              <th style={thStyle}>Anthropic</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '文本生成' : 'Text Generation', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent'],
              [isZh ? '代码生成' : 'Code Generation', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent'],
              [isZh ? '图像理解' : 'Vision', 'GPT-4 Vision', 'Claude 3 Vision'],
              [isZh ? '图像生成' : 'Image Generation', 'DALL-E 3', isZh ? '无' : 'No'],
              [isZh ? '嵌入' : 'Embeddings', 'text-embedding-3', isZh ? '无' : 'No'],
              [isZh ? '语音' : 'Speech', 'Whisper, TTS', isZh ? '无' : 'No'],
              [isZh ? '微调' : 'Fine-tuning', isZh ? '支持' : 'Supported', isZh ? '有限' : 'Limited'],
              [isZh ? 'Assistants API' : 'Assistants API', isZh ? '是' : 'Yes', isZh ? '否' : 'No'],
            ].map(([cap, openai, anthropic], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{openai}</td>
                <td style={tdStyle}>{anthropic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#10a37f' }}>{ct.openaiExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// OpenAI API: Chat Completion with Function Calling
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define function tools
const tools = [
  {
    type: 'function',
    function: {
      name: 'get_weather',
      description: 'Get current weather for a location',
      parameters: {
        type: 'object',
        properties: {
          location: {
            type: 'string',
            description: 'City and country',
          },
          unit: {
            type: 'string',
            enum: ['celsius', 'fahrenheit'],
          },
        },
        required: ['location'],
      },
    },
  },
];

// Chat completion with function calling
const response = await openai.chat.completions.create({
  model: 'gpt-4-turbo-preview',
  messages: [
    {
      role: 'system',
      content: 'You are a helpful weather assistant.',
    },
    {
      role: 'user',
      content: 'What is the weather like in Tokyo?',
    },
  ],
  tools: tools,
  tool_choice: 'auto',
});

// Handle function call
const message = response.choices[0].message;
if (message.tool_calls) {
  const toolCall = message.tool_calls[0];
  console.log('Function to call:', toolCall.function.name);
  console.log('Arguments:', toolCall.function.arguments);
}

// Streaming example
const stream = await openai.chat.completions.create({
  model: 'gpt-4-turbo-preview',
  messages: [{ role: 'user', content: 'Tell me a story' }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#d97706' }}>{ct.anthropicExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Anthropic API: Claude with Tool Use
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Define tools
const tools = [
  {
    name: 'get_weather',
    description: 'Get current weather for a location',
    input_schema: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'City and country',
        },
        unit: {
          type: 'string',
          enum: ['celsius', 'fahrenheit'],
        },
      },
      required: ['location'],
    },
  },
];

// Create message with tool use
const response = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: 'What is the weather like in Tokyo?',
    },
  ],
  tools: tools,
});

// Handle tool use
for (const block of response.content) {
  if (block.type === 'tool_use') {
    console.log('Tool:', block.name);
    console.log('Input:', block.input);
  }
}

// Streaming example
const stream = anthropic.messages.stream({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: 'Tell me a story',
    },
  ],
});

stream.on('text', (text) => {
  process.stdout.write(text);
});

await stream.finalMessage();

// Long context example (200K tokens)
const longDocResponse = await anthropic.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 4096,
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Analyze this document...',
        },
        {
          type: 'text', 
          text: largeDocumentText, // Can be up to 200K tokens
        },
      ],
    },
  ],
});`}</code></pre>

      {/* Pricing */}
      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '模型' : 'Model'}</th>
              <th style={thStyle}>{isZh ? '输入（每 1M tokens）' : 'Input (per 1M tokens)'}</th>
              <th style={thStyle}>{isZh ? '输出（每 1M tokens）' : 'Output (per 1M tokens)'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['GPT-4 Turbo', '\\$10.00', '\\$30.00'],
              ['GPT-3.5 Turbo', '\\$0.50', '\\$1.50'],
              ['Claude 3.5 Sonnet', '\\$3.00', '\\$15.00'],
              ['Claude 3 Opus', '\\$15.00', '\\$75.00'],
              ['Claude 3 Haiku', '\\$0.25', '\\$1.25'],
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

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #10a37f' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#10a37f' }}>{ct.openaiBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '多模态应用' : 'Multimodal applications'}</li>
            <li>{isZh ? '图像生成' : 'Image generation (DALL-E)'}</li>
            <li>{isZh ? '语音处理' : 'Speech processing'}</li>
            <li>{isZh ? '嵌入向量' : 'Text embeddings'}</li>
            <li>{isZh ? '成熟生态系统' : 'Mature ecosystem'}</li>
            <li>{isZh ? 'Assistants 工作流' : 'Assistants workflows'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #d97706' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#d97706' }}>{ct.anthropicBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '长文档分析' : 'Long document analysis'}</li>
            <li>{isZh ? '复杂指令遵循' : 'Complex instruction following'}</li>
            <li>{isZh ? '安全关键应用' : 'Safety-critical applications'}</li>
            <li>{isZh ? '细致推理' : 'Nuanced reasoning'}</li>
            <li>{isZh ? '对话系统' : 'Conversational systems'}</li>
            <li>{isZh ? '内容审核' : 'Content moderation'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/regex-tester"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
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
