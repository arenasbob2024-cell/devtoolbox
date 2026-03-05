'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Gemini vs GPT-4: Google vs OpenAI LLM Showdown',
    intro: 'Google Gemini and OpenAI GPT-4 are the two most advanced large language models available. Gemini (formerly Bard) offers native multimodal capabilities and deep Google integration, while GPT-4 powers ChatGPT with mature tooling and extensive ecosystem. This comparison helps developers choose the right model.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose GPT-4 for mature APIs, function calling, and ecosystem support. Choose Gemini for native multimodal (text, image, video, audio), longer context with Gemini 1.5 Pro (1M tokens), and Google Cloud integration. Gemini excels at multimodal reasoning, GPT-4 at tool-augmented applications.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Gemini 1.5 Pro offers 1M token context window',
    takeaway2: 'GPT-4 has more mature function calling and tool use',
    takeaway3: 'Gemini handles video and audio natively',
    takeaway4: 'GPT-4 ecosystem has more third-party integrations',
    takeaway5: 'Both perform similarly on most benchmarks',
    takeaway6: 'Gemini integrates natively with Google Cloud services',
    
    whatIsGeminiTitle: 'What is Google Gemini?',
    whatIsGeminiContent: 'Gemini is Google\'s latest family of multimodal AI models, developed by Google DeepMind. Launched in December 2023, Gemini comes in three sizes: Ultra (most capable), Pro (balanced), and Nano (on-device). Gemini 1.5 Pro introduced context windows up to 1M tokens, revolutionizing long-context processing.',
    
    whatIsGpt4Title: 'What is GPT-4?',
    whatIsGpt4Content: 'GPT-4 is OpenAI\'s flagship large language model, released in March 2023. It powers ChatGPT Plus and is available via API. GPT-4 Turbo offers improved performance and 128K context. GPT-4o (Omni) adds native multimodal capabilities. The model excels at reasoning, coding, and following complex instructions.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'API Usage Examples',
    codeExampleIntro: 'Code examples for both APIs:',
    
    geminiExampleTitle: 'Gemini API Example',
    gpt4ExampleTitle: 'GPT-4 API Example',
    
    multimodalTitle: 'Multimodal Capabilities',
    multimodalIntro: 'Native support for different input types:',
    
    useCasesTitle: 'Best Use Cases',
    geminiBestFor: 'Gemini is Best For:',
    gpt4BestFor: 'GPT-4 is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Gemini and GPT-4 represent the cutting edge of AI capabilities with different strengths. Gemini\'s 1M token context and native multimodal processing make it ideal for video analysis, long document processing, and Google Cloud workflows. GPT-4\'s mature ecosystem, function calling, and extensive integrations make it the choice for production applications requiring tool use and reliability. Many enterprises use both: Gemini for multimodal and long-context tasks, GPT-4 for coding assistants and tool-augmented workflows.',
    
    faq1q: 'Which has the longer context window?',
    faq1a: 'Gemini 1.5 Pro leads with up to 1M tokens, while GPT-4 Turbo supports 128K tokens. This 8x difference makes Gemini better for processing entire codebases, books, or hours of video content.',
    
    faq2q: 'How do they compare on coding tasks?',
    faq2a: 'Both perform excellently on coding benchmarks. GPT-4 has been battle-tested in production coding tools like GitHub Copilot. Gemini shows strong performance but has less real-world coding tool integration currently.',
    
    faq3q: 'Which is better for image analysis?',
    faq3a: 'Both handle images well. Gemini processes images natively as part of its multimodal architecture. GPT-4 Vision (and GPT-4o) also provides excellent image understanding. Performance is comparable for most use cases.',
    
    faq4q: 'Can Gemini process video?',
    faq4a: 'Yes, Gemini can natively process video content along with audio, making it unique among leading LLMs. GPT-4 requires video to be converted to frames and transcriptions first.',
    
    faq5q: 'What about pricing?',
    faq5a: 'Gemini Pro is generally more cost-effective for high-volume use. GPT-4 Turbo and GPT-4o offer competitive pricing. Gemini 1.5 Pro\'s long context comes at a premium but enables previously impossible use cases.',
    
    faq6q: 'Which has better Google integration?',
    faq6a: 'Gemini integrates natively with Google Cloud, Workspace, and Search. This makes it ideal for applications leveraging Google\'s ecosystem. GPT-4 requires custom integrations for Google services.',
    
    faq7q: 'How do they compare for RAG applications?',
    faq7a: 'GPT-4 has more RAG framework integrations and documentation. Gemini\'s ultra-long context can reduce or eliminate chunking needs. Both work well, with the choice depending on your specific architecture.',
    
    faq8q: 'Which is more reliable for production?',
    faq8a: 'GPT-4 has been in production longer with more battle-testing. Gemini is newer but backed by Google\'s infrastructure. Both offer SLAs for enterprise customers.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Gemini vs GPT-4：Google 与 OpenAI 的 LLM 正面对决',
    intro: 'Google Gemini 和 OpenAI GPT-4 是目前最先进的两个大语言模型。Gemini（原 Bard）提供原生多模态能力和深度 Google 集成，而 GPT-4 驱动 ChatGPT，拥有成熟的工具和广泛的生态系统。本比较帮助开发者选择合适的模型。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为成熟 API、函数调用和生态系统支持选择 GPT-4。为原生多模态（文本、图像、视频、音频）、Gemini 1.5 Pro 的超长上下文（100万 tokens）和 Google Cloud 集成选择 Gemini。Gemini 在多模态推理方面出色，GPT-4 在工具增强应用方面领先。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Gemini 1.5 Pro 提供 100万 token 上下文窗口',
    takeaway2: 'GPT-4 有更成熟的函数调用和工具使用',
    takeaway3: 'Gemini 原生处理视频和音频',
    takeaway4: 'GPT-4 生态系统有更多第三方集成',
    takeaway5: '两者在大多数基准测试上表现相似',
    takeaway6: 'Gemini 与 Google Cloud 服务原生集成',
    
    whatIsGeminiTitle: '什么是 Google Gemini？',
    whatIsGeminiContent: 'Gemini 是 Google 最新的多模态 AI 模型系列，由 Google DeepMind 开发。2023 年 12 月发布，Gemini 有三个版本：Ultra（最强）、Pro（均衡）和 Nano（端侧）。Gemini 1.5 Pro 引入了高达 100万 tokens 的上下文窗口，革命性地改变了长上下文处理。',
    
    whatIsGpt4Title: '什么是 GPT-4？',
    whatIsGpt4Content: 'GPT-4 是 OpenAI 的旗舰大语言模型，2023 年 3 月发布。它驱动 ChatGPT Plus 并通过 API 提供。GPT-4 Turbo 提供改进的性能和 128K 上下文。GPT-4o（Omni）增加原生多模态能力。该模型在推理、编程和遵循复杂指令方面表现出色。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: 'API 使用示例',
    codeExampleIntro: '两个 API 的代码示例：',
    
    geminiExampleTitle: 'Gemini API 示例',
    gpt4ExampleTitle: 'GPT-4 API 示例',
    
    multimodalTitle: '多模态能力',
    multimodalIntro: '对不同输入类型的原生支持：',
    
    useCasesTitle: '最佳用例',
    geminiBestFor: 'Gemini 最适合：',
    gpt4BestFor: 'GPT-4 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Gemini 和 GPT-4 代表了 AI 能力的最前沿，各有不同优势。Gemini 的 100万 token 上下文和原生多模态处理使其成为视频分析、长文档处理和 Google Cloud 工作流的理想选择。GPT-4 的成熟生态系统、函数调用和广泛的集成使其成为需要工具使用和可靠性的生产应用的选择。许多企业同时使用两者：Gemini 用于多模态和长上下文任务，GPT-4 用于编程助手和工具增强工作流。',
    
    faq1q: '哪个有更长的上下文窗口？',
    faq1a: 'Gemini 1.5 Pro 领先，支持高达 100万 tokens，而 GPT-4 Turbo 支持 128K tokens。这 8 倍的差异使 Gemini 更适合处理整个代码库、书籍或数小时的视频内容。',
    
    faq2q: '它们在编程任务上如何比较？',
    faq2a: '两者在编程基准测试上都表现出色。GPT-4 已经在 GitHub Copilot 等生产编程工具中经过实战检验。Gemini 显示出强大的性能，但目前在实际编程工具集成方面较少。',
    
    faq3q: '哪个更适合图像分析？',
    faq3a: '两者都能很好地处理图像。Gemini 将图像作为其多模态架构的一部分原生处理。GPT-4 Vision（和 GPT-4o）也提供出色的图像理解。对于大多数用例，性能相当。',
    
    faq4q: 'Gemini 能处理视频吗？',
    faq4a: '是的，Gemini 可以与音频一起原生处理视频内容，这在领先的 LLM 中是独特的。GPT-4 需要先将视频转换为帧和转录文本。',
    
    faq5q: '定价怎么样？',
    faq5a: 'Gemini Pro 对于高容量使用通常更具成本效益。GPT-4 Turbo 和 GPT-4o 提供有竞争力的定价。Gemini 1.5 Pro 的长上下文需要额外费用，但能实现以前不可能的用例。',
    
    faq6q: '哪个有更好的 Google 集成？',
    faq6a: 'Gemini 与 Google Cloud、Workspace 和 Search 原生集成。这使其成为利用 Google 生态系统的应用的理想选择。GPT-4 需要自定义集成才能使用 Google 服务。',
    
    faq7q: '它们在 RAG 应用方面如何比较？',
    faq7a: 'GPT-4 有更多的 RAG 框架集成和文档。Gemini 的超长上下文可以减少或消除分块需求。两者都能很好地工作，选择取决于你的具体架构。',
    
    faq8q: '哪个在生产中更可靠？',
    faq8a: 'GPT-4 已经在生产中使用更长时间，经过更多实战检验。Gemini 较新，但由 Google 的基础设施支持。两者都为企业客户提供 SLA。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function GeminiVsGpt4({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsGeminiTitle}</h3>
      <p style={pStyle}>{ct.whatIsGeminiContent}</p>

      <h3 style={h3Style}>{ct.whatIsGpt4Title}</h3>
      <p style={pStyle}>{ct.whatIsGpt4Content}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Gemini 1.5 Pro</th>
              <th style={thStyle}>GPT-4 Turbo</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '上下文窗口' : 'Context Window', '1M tokens', '128K tokens'],
              [isZh ? '多模态' : 'Multimodal', isZh ? '原生（文本/图像/视频/音频）' : 'Native (text/image/video/audio)', isZh ? '文本/图像（GPT-4o 支持音频）' : 'Text/Image (GPT-4o has audio)'],
              [isZh ? '函数调用' : 'Function Calling', isZh ? '支持' : 'Yes', isZh ? '成熟' : 'Mature'],
              [isZh ? '代码能力' : 'Coding', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent'],
              [isZh ? '推理能力' : 'Reasoning', isZh ? '强大' : 'Strong', isZh ? '强大' : 'Strong'],
              [isZh ? '可用性' : 'Availability', isZh ? 'Google AI Studio, Vertex AI' : 'Google AI Studio, Vertex AI', isZh ? 'OpenAI API, Azure' : 'OpenAI API, Azure'],
              [isZh ? '训练数据' : 'Training Data', isZh ? '截至 2024' : 'Up to 2024', isZh ? '截至 2023' : 'Up to 2023'],
              [isZh ? '响应速度' : 'Response Speed', isZh ? '快' : 'Fast', isZh ? '快' : 'Fast'],
            ].map(([feature, gemini, gpt4], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{gemini}</td>
                <td style={tdStyle}>{gpt4}</td>
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
              <th style={thStyle}>Gemini</th>
              <th style={thStyle}>GPT-4</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '结构化输出' : 'Structured Output', 'JSON mode', 'JSON mode, function calls'],
              [isZh ? '流式响应' : 'Streaming', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '系统指令' : 'System Instructions', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '安全过滤' : 'Safety Filters', isZh ? '可配置' : 'Configurable', isZh ? '内置' : 'Built-in'],
              [isZh ? 'Fine-tuning' : 'Fine-tuning', isZh ? 'Vertex AI 支持' : 'Vertex AI support', isZh ? '支持' : 'Yes'],
              [isZh ? '嵌入模型' : 'Embeddings', isZh ? 'text-embedding-gecko' : 'text-embedding-gecko', isZh ? 'text-embedding-3' : 'text-embedding-3'],
              [isZh ? '评估工具' : 'Evaluation Tools', isZh ? 'Vertex AI Eval' : 'Vertex AI Eval', isZh ? 'Evals API' : 'Evals API'],
              [isZh ? '批量处理' : 'Batch Processing', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
            ].map(([cap, gemini, gpt4], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{gemini}</td>
                <td style={tdStyle}>{gpt4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.multimodalTitle}</h2>
      <p style={pStyle}>{ct.multimodalIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '输入类型' : 'Input Type'}</th>
              <th style={thStyle}>Gemini</th>
              <th style={thStyle}>GPT-4</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '文本' : 'Text', isZh ? '原生支持' : 'Native', isZh ? '原生支持' : 'Native'],
              [isZh ? '图像' : 'Images', isZh ? '原生支持' : 'Native', isZh ? '原生支持' : 'Native'],
              [isZh ? '视频' : 'Video', isZh ? '原生支持' : 'Native', isZh ? '需要预处理' : 'Preprocessing needed'],
              [isZh ? '音频' : 'Audio', isZh ? '原生支持' : 'Native', isZh ? 'GPT-4o 支持' : 'GPT-4o only'],
              [isZh ? 'PDF' : 'PDF', isZh ? '直接处理' : 'Direct', isZh ? '需要解析' : 'Parsing needed'],
              [isZh ? '代码文件' : 'Code Files', isZh ? '直接处理' : 'Direct', isZh ? '直接处理' : 'Direct'],
            ].map(([type, gemini, gpt4], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{type}</td>
                <td style={tdStyle}>{gemini}</td>
                <td style={tdStyle}>{gpt4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#4285f4' }}>{ct.geminiExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// Gemini API Example (Node.js)\nimport { GoogleGenerativeAI } from "@google/generative-ai";\n\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\n\nasync function generateText(prompt) {\n  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });\n  \n  const result = await model.generateContent(prompt);\n  const response = await result.response;\n  return response.text();\n}\n\n// Multimodal example with image\nasync function analyzeImage(imagePath, prompt) {\n  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });\n  \n  const result = await model.generateContent([\n    prompt,\n    {\n      inlineData: {\n        mimeType: "image/jpeg",\n        data: imagePath // base64 encoded\n      }\n    }\n  ]);\n  \n  return result.response.text();\n}\n\n// Long context example\nasync function processLargeDocument(document) {\n  const model = genAI.getGenerativeModel({ \n    model: "gemini-1.5-pro",\n    generationConfig: { maxOutputTokens: 8192 }\n  });\n  \n  // Can handle up to 1M tokens\n  const result = await model.generateContent(document);\n  return result.response.text();\n}'}</code></pre>

      <h3 style={{ ...h3Style, color: '#10a37f' }}>{ct.gpt4ExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// GPT-4 API Example (Node.js)\nimport OpenAI from "openai";\n\nconst openai = new OpenAI({\n  apiKey: process.env.OPENAI_API_KEY\n});\n\nasync function generateText(prompt) {\n  const response = await openai.chat.completions.create({\n    model: "gpt-4-turbo",\n    messages: [{ role: "user", content: prompt }],\n    max_tokens: 1000\n  });\n  \n  return response.choices[0].message.content;\n}\n\n// Vision example\nasync function analyzeImage(imageUrl, prompt) {\n  const response = await openai.chat.completions.create({\n    model: "gpt-4-turbo",\n    messages: [{\n      role: "user",\n      content: [\n        { type: "text", text: prompt },\n        { type: "image_url", image_url: { url: imageUrl } }\n      ]\n    }]\n  });\n  \n  return response.choices[0].message.content;\n}\n\n// Function calling example\nasync function withFunctionCalling(query) {\n  const response = await openai.chat.completions.create({\n    model: "gpt-4-turbo",\n    messages: [{ role: "user", content: query }],\n    tools: [{\n      type: "function",\n      function: {\n        name: "search_web",\n        description: "Search the web for information",\n        parameters: {\n          type: "object",\n          properties: {\n            query: { type: "string" }\n          }\n        }\n      }\n    }]\n  });\n  \n  return response;\n}'}</code></pre>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #4285f4' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#4285f4' }}>{ct.geminiBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '视频内容分析' : 'Video content analysis'}</li>
            <li>{isZh ? '超长文档处理' : 'Ultra-long document processing'}</li>
            <li>{isZh ? 'Google Cloud 集成' : 'Google Cloud integration'}</li>
            <li>{isZh ? '多模态推理任务' : 'Multimodal reasoning tasks'}</li>
            <li>{isZh ? '实时音频处理' : 'Real-time audio processing'}</li>
            <li>{isZh ? '大规模代码库分析' : 'Large-scale codebase analysis'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #10a37f' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#10a37f' }}>{ct.gpt4BestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '工具增强应用' : 'Tool-augmented applications'}</li>
            <li>{isZh ? '生产环境编程助手' : 'Production coding assistants'}</li>
            <li>{isZh ? '成熟生态系统集成' : 'Mature ecosystem integrations'}</li>
            <li>{isZh ? '复杂函数调用' : 'Complex function calling'}</li>
            <li>{isZh ? '企业级可靠性' : 'Enterprise-grade reliability'}</li>
            <li>{isZh ? 'Azure 云集成' : 'Azure cloud integration'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={"/" + lang + "/tools/regex-tester"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a>
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
