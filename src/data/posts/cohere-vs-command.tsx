'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Cohere vs Command: Enterprise AI Model Comparison',
    intro: 'Cohere offers Command and Command-R models optimized for enterprise applications. While "Command" is Cohere\'s flagship model series, this comparison examines Command against other Cohere models (Embed, Rerank) and competitive enterprise AI solutions for business use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Cohere Command for enterprise-focused LLMs with strong multilingual support and RAG optimization. Command-R excels at retrieval-augmented generation with built-in citation support. Cohere differentiates with enterprise-first features like deployment flexibility, fine-tuning, and privacy controls.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Command-R optimized for RAG with 128K context',
    takeaway2: 'Strong multilingual support across 10+ languages',
    takeaway3: 'Enterprise deployment options (cloud, VPC, on-premise)',
    takeaway4: 'Native citation and grounding features',
    takeaway5: 'Competitive pricing for enterprise workloads',
    takeaway6: 'Fine-tuning available for custom use cases',
    
    whatIsCohereTitle: 'What is Cohere?',
    whatIsCohereContent: 'Cohere is an enterprise AI company founded in 2019 by former Google Brain researchers. They specialize in large language models for business applications, offering the Command series for text generation, Embed for semantic search, and Rerank for search optimization. Cohere focuses on enterprise-grade AI with deployment flexibility and privacy.',
    
    whatIsCommandTitle: 'What is Command?',
    whatIsCommandContent: 'Command is Cohere\'s flagship text generation model family. Command-R and Command-R+ are optimized for RAG applications with 128K context and built-in citation support. The models excel at instruction following, multilingual tasks, and business applications requiring grounded responses.',
    
    performanceTitle: 'Model Comparison',
    performanceIntro: 'Comparing Cohere model capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'API Usage Examples',
    codeExampleIntro: 'Code examples for Cohere API:',
    
    cohereExampleTitle: 'Cohere Command API Example',
    embedExampleTitle: 'Cohere Embed API Example',
    
    useCasesTitle: 'Best Use Cases',
    commandBestFor: 'Command is Best For:',
    embedBestFor: 'Embed/Rerank is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Cohere Command stands out for enterprise applications requiring RAG, multilingual support, and deployment flexibility. The built-in citation feature and 128K context make it ideal for knowledge-based applications. Cohere\'s focus on enterprise needs—privacy, fine-tuning, and various deployment options—makes it a strong choice for businesses with specific compliance and integration requirements. For pure general-purpose chat, other providers may offer more options, but for enterprise RAG and search applications, Cohere provides a compelling, business-focused solution.',
    
    faq1q: 'What is the context window for Command-R?',
    faq1a: 'Command-R and Command-R+ support 128K tokens of context, making them suitable for processing long documents and large codebases while maintaining conversation history.',
    
    faq2q: 'Does Cohere support fine-tuning?',
    faq2a: 'Yes, Cohere offers fine-tuning capabilities for enterprises. You can customize Command models on your data for specific domains, terminology, and output formats. Custom models are available through their enterprise plans.',
    
    faq3q: 'What deployment options are available?',
    faq3a: 'Cohere offers multiple deployment options: their managed cloud API, private deployments on AWS and other clouds, VPC deployments, and on-premise solutions for organizations with strict data residency requirements.',
    
    faq4q: 'How does Command compare to GPT-4?',
    faq4a: 'Command is competitive with GPT-4 on many benchmarks, particularly excelling at RAG tasks with native citation support. GPT-4 has a larger ecosystem, but Command offers better enterprise features and deployment flexibility.',
    
    faq5q: 'What languages does Cohere support?',
    faq5a: 'Cohere models support 10+ languages including English, Spanish, French, German, Portuguese, Italian, Japanese, Korean, Chinese, and Arabic. The multilingual capabilities are built into the core models.',
    
    faq6q: 'How does the citation feature work?',
    faq6a: 'Command-R can automatically cite sources from retrieved documents. When using RAG, it generates grounded responses with inline citations linking back to source documents, improving trust and verifiability.',
    
    faq7q: 'What is Rerank and when should I use it?',
    faq7a: 'Rerank is Cohere\'s search optimization model that reorders search results by relevance. Use it when you need to improve the quality of retrieved documents before passing them to Command-R for generation.',
    
    faq8q: 'Is Cohere suitable for startups?',
    faq8a: 'Yes, Cohere offers accessible pricing for startups through their API. The free tier allows experimentation, and pricing scales reasonably. For production use, their enterprise features become valuable.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Cohere vs Command：企业级 AI 模型对比',
    intro: 'Cohere 提供 Command 和 Command-R 模型，专为企业应用优化。虽然"Command"是 Cohere 的旗舰模型系列，本比较从企业用例角度考察 Command 与其他 Cohere 模型（Embed、Rerank）及竞争企业 AI 解决方案。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为具有强大多语言支持和 RAG 优化的企业级 LLM 选择 Cohere Command。Command-R 擅长检索增强生成，内置引用支持。Cohere 以企业优先的功能如部署灵活性、微调和隐私控制脱颖而出。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Command-R 针对RAG优化，支持128K上下文',
    takeaway2: '强大的多语言支持，覆盖10+种语言',
    takeaway3: '企业部署选项（云、VPC、本地）',
    takeaway4: '原生引用和基础支撑功能',
    takeaway5: '企业工作负载的竞争性定价',
    takeaway6: '支持针对自定义用例的微调',
    
    whatIsCohereTitle: '什么是 Cohere？',
    whatIsCohereContent: 'Cohere 是一家企业 AI 公司，由前 Google Brain 研究员于 2019 年创立。他们专注于商业应用的大语言模型，提供 Command 系列用于文本生成、Embed 用于语义搜索、Rerank 用于搜索优化。Cohere 专注于部署灵活性和隐私的企业级 AI。',
    
    whatIsCommandTitle: '什么是 Command？',
    whatIsCommandContent: 'Command 是 Cohere 的旗舰文本生成模型系列。Command-R 和 Command-R+ 针对RAG应用优化，具有 128K 上下文和内置引用支持。这些模型擅长指令遵循、多语言任务和需要基础响应的商业应用。',
    
    performanceTitle: '模型对比',
    performanceIntro: '比较 Cohere 模型能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: 'API 使用示例',
    codeExampleIntro: 'Cohere API 的代码示例：',
    
    cohereExampleTitle: 'Cohere Command API 示例',
    embedExampleTitle: 'Cohere Embed API 示例',
    
    useCasesTitle: '最佳用例',
    commandBestFor: 'Command 最适合：',
    embedBestFor: 'Embed/Rerank 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Cohere Command 在需要 RAG、多语言支持和部署灵活性的企业应用中脱颖而出。内置引用功能和 128K 上下文使其成为知识型应用的理想选择。Cohere 对企业需求的关注——隐私、微调和各种部署选项——使其成为有特定合规和集成要求的企业的强力选择。对于纯通用聊天，其他提供商可能提供更多选择，但对于企业 RAG 和搜索应用，Cohere 提供了一个引人注目的、以业务为中心的解决方案。',
    
    faq1q: 'Command-R 的上下文窗口是多少？',
    faq1a: 'Command-R 和 Command-R+ 支持 128K tokens 的上下文，适合在保持对话历史的同时处理长文档和大型代码库。',
    
    faq2q: 'Cohere 支持微调吗？',
    faq2a: '是的，Cohere 为企业提供微调能力。你可以在自己的数据上定制 Command 模型，针对特定领域、术语和输出格式。自定义模型通过其企业计划提供。',
    
    faq3q: '有哪些部署选项？',
    faq3a: 'Cohere 提供多种部署选项：托管云 API、AWS 和其他云上的私有部署、VPC 部署，以及为有严格数据驻留要求的组织提供的本地解决方案。',
    
    faq4q: 'Command 与 GPT-4 相比如何？',
    faq4a: 'Command 在许多基准测试上与 GPT-4 竞争，特别是在带有原生引用支持的 RAG 任务上表现出色。GPT-4 有更大的生态系统，但 Command 提供更好的企业功能和部署灵活性。',
    
    faq5q: 'Cohere 支持哪些语言？',
    faq5a: 'Cohere 模型支持 10+ 种语言，包括英语、西班牙语、法语、德语、葡萄牙语、意大利语、日语、韩语、中文和阿拉伯语。多语言能力内置于核心模型中。',
    
    faq6q: '引用功能如何工作？',
    faq6a: 'Command-R 可以自动引用检索文档中的来源。使用 RAG 时，它生成带有内联引用的基础响应，链接回源文档，提高可信度和可验证性。',
    
    faq7q: '什么是 Rerank，什么时候应该使用？',
    faq7a: 'Rerank 是 Cohere 的搜索优化模型，通过相关性重新排序搜索结果。当你需要在将检索到的文档传递给 Command-R 进行生成之前提高其质量时使用它。',
    
    faq8q: 'Cohere 适合初创公司吗？',
    faq8a: '是的，Cohere 通过其 API 为初创公司提供可访问的定价。免费层允许实验，定价扩展合理。对于生产使用，其企业功能变得有价值。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function CohereVsCommand({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsCohereTitle}</h3>
      <p style={pStyle}>{ct.whatIsCohereContent}</p>

      <h3 style={h3Style}>{ct.whatIsCommandTitle}</h3>
      <p style={pStyle}>{ct.whatIsCommandContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '模型' : 'Model'}</th>
              <th style={thStyle}>{isZh ? '用途' : 'Use Case'}</th>
              <th style={thStyle}>{isZh ? '上下文' : 'Context'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Command-R+', isZh ? '高级RAG、复杂推理' : 'Advanced RAG, Complex reasoning', '128K'],
              ['Command-R', isZh ? 'RAG应用、对话' : 'RAG applications, Chat', '128K'],
              ['Command', isZh ? '通用文本生成' : 'General text generation', '4K'],
              ['Embed v3', isZh ? '语义搜索、嵌入' : 'Semantic search, Embeddings', '512'],
              ['Rerank v3', isZh ? '搜索结果重排' : 'Search result reranking', 'N/A'],
            ].map(([model, use, ctx], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{model}</td>
                <td style={tdStyle}>{use}</td>
                <td style={tdStyle}>{ctx}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Command-R</th>
              <th style={thStyle}>{isZh ? '传统 LLM' : 'Traditional LLM'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'RAG 优化' : 'RAG Optimized', isZh ? '原生支持' : 'Native', isZh ? '需要自建' : 'DIY needed'],
              [isZh ? '引用生成' : 'Citation Generation', isZh ? '内置' : 'Built-in', isZh ? '需要额外处理' : 'Extra processing'],
              [isZh ? '多语言' : 'Multilingual', isZh ? '10+ 语言' : '10+ languages', isZh ? '各异' : 'Varies'],
              [isZh ? '工具使用' : 'Tool Use', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '流式输出' : 'Streaming', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '部署选项' : 'Deployment', isZh ? '云/VPC/本地' : 'Cloud/VPC/On-prem', isZh ? '通常仅云' : 'Usually cloud only'],
              [isZh ? '微调' : 'Fine-tuning', isZh ? '企业支持' : 'Enterprise', isZh ? '各异' : 'Varies'],
              [isZh ? '隐私控制' : 'Privacy Controls', isZh ? '全面' : 'Comprehensive', isZh ? '各异' : 'Varies'],
            ].map(([feat, cmd, trad], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feat}</td>
                <td style={tdStyle}>{cmd}</td>
                <td style={tdStyle}>{trad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#39594d' }}>{ct.cohereExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// Cohere Command-R API Example\nimport Cohere from "cohere-ai";\n\nCohere.init(process.env.COHERE_API_KEY);\n\nasync function generateWithRAG(query, documents) {\n  const response = await Cohere.Generate.chat({\n    model: "command-r",\n    message: query,\n    documents: documents.map(doc => ({\n      title: doc.title,\n      snippet: doc.content\n    })),\n    citation_quality: "accurate",\n    max_tokens: 1000\n  });\n  \n  return {\n    text: response.text,\n    citations: response.citations\n  };\n}\n\n// Example with citations\nconst docs = [\n  { title: "Product Manual", content: "The device requires 5V power..." },\n  { title: "FAQ", content: "Common issues include..." }\n];\n\nconst result = await generateWithRAG(\n  "How do I power on the device?",\n  docs\n);\n\nconsole.log(result.text);\n// Output includes inline citations like [1]\nconsole.log(result.citations);\n// Shows which document was cited\n\n// Tool use example\nasync function withTools(query) {\n  const response = await Cohere.Generate.chat({\n    model: "command-r",\n    message: query,\n    tools: [{\n      name: "search_inventory",\n      description: "Search product inventory",\n      parameter_definitions: {\n        query: { type: "string", description: "Search term" }\n      }\n    }]\n  });\n  \n  return response;\n}'}</code></pre>

      <h3 style={{ ...h3Style, color: '#6366f1' }}>{ct.embedExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// Cohere Embed API Example\nimport Cohere from "cohere-ai";\n\nCohere.init(process.env.COHERE_API_KEY);\n\nasync function createEmbeddings(texts) {\n  const response = await Cohere.Embed.embed({\n    texts: texts,\n    model: "embed-english-v3.0",\n    input_type: "search_document",\n    truncate: "END"\n  });\n  \n  return response.embeddings;\n}\n\n// Rerank example for search optimization\nasync function rerankResults(query, results) {\n  const response = await Cohere.Rerank.rerank({\n    model: "rerank-english-v3.0",\n    query: query,\n    documents: results.map(r => ({\n      text: r.content\n    })),\n    top_n: 5\n  });\n  \n  return response.results.map(r => ({\n    document: results[r.index],\n    relevance_score: r.relevance_score\n  }));\n}\n\n// Complete RAG pipeline\nasync function ragPipeline(query, knowledgeBase) {\n  // 1. Create embeddings for query\n  const queryEmbedding = await Cohere.Embed.embed({\n    texts: [query],\n    model: "embed-english-v3.0",\n    input_type: "search_query"\n  });\n  \n  // 2. Search vector database (pseudo-code)\n  const searchResults = await vectorDB.search(queryEmbedding);\n  \n  // 3. Rerank results\n  const reranked = await rerankResults(query, searchResults);\n  \n  // 4. Generate with citations\n  const answer = await generateWithRAG(query, reranked);\n  \n  return answer;\n}'}</code></pre>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #39594d' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#39594d' }}>{ct.commandBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业知识库问答' : 'Enterprise knowledge base Q&A'}</li>
            <li>{isZh ? '客户支持自动化' : 'Customer support automation'}</li>
            <li>{isZh ? '多语言内容生成' : 'Multilingual content generation'}</li>
            <li>{isZh ? '合规敏感应用' : 'Compliance-sensitive applications'}</li>
            <li>{isZh ? '需要引用的RAG' : 'RAG with citations'}</li>
            <li>{isZh ? '私有部署需求' : 'Private deployment needs'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #6366f1' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#6366f1' }}>{ct.embedBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '语义搜索引擎' : 'Semantic search engines'}</li>
            <li>{isZh ? '文档相似度匹配' : 'Document similarity matching'}</li>
            <li>{isZh ? '推荐系统' : 'Recommendation systems'}</li>
            <li>{isZh ? '聚类和分类' : 'Clustering and classification'}</li>
            <li>{isZh ? '搜索结果优化' : 'Search result optimization'}</li>
            <li>{isZh ? '向量数据库集成' : 'Vector database integration'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
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
