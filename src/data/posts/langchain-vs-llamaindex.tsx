'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'LangChain vs LlamaIndex: LLM Framework Comparison',
    intro: 'LangChain and LlamaIndex are two leading frameworks for building LLM-powered applications. LangChain focuses on chaining LLM calls and building agents, while LlamaIndex specializes in data indexing and retrieval-augmented generation (RAG). This comparison examines their architectures, capabilities, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose LangChain for building complex LLM chains, agents, and multi-step reasoning applications. Choose LlamaIndex for data-intensive applications requiring efficient retrieval, document indexing, and RAG systems. Both can work together: LlamaIndex for data layer, LangChain for orchestration layer.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'LangChain excels at chaining, agents, and workflow orchestration',
    takeaway2: 'LlamaIndex specializes in data indexing and RAG implementations',
    takeaway3: 'LlamaIndex has better out-of-box document processing',
    takeaway4: 'LangChain has larger ecosystem and more integrations',
    takeaway5: 'Both support multiple LLM providers (OpenAI, Anthropic, etc.)',
    takeaway6: 'They can be used together for comprehensive LLM applications',
    
    whatIsLangChainTitle: 'What is LangChain?',
    whatIsLangChainContent: 'LangChain is an open-source framework for developing applications powered by language models. Released in 2022, it provides tools for chaining LLM calls, building agents, memory management, and integrating with external tools. LangChain supports Python and JavaScript, with extensive integrations for various LLM providers and tools.',
    
    whatIsLlamaIndexTitle: 'What is LlamaIndex?',
    whatIsLlamaIndexContent: 'LlamaIndex (formerly GPT Index) is a data framework for LLM applications, specializing in connecting custom data to LLMs. Released in 2022, it focuses on building indices over your data for efficient retrieval. LlamaIndex excels at document processing, embedding generation, and retrieval-augmented generation (RAG) systems.',
    
    performanceTitle: 'Core Comparison',
    performanceIntro: 'Comparing framework capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Basic usage patterns:',
    
    langChainExampleTitle: 'LangChain Chain Example',
    llamaIndexExampleTitle: 'LlamaIndex RAG Example',
    
    dataSourceTitle: 'Data Integration',
    dataSourceIntro: 'Data source and indexing capabilities:',
    
    useCasesTitle: 'Best Use Cases',
    langChainBestFor: 'LangChain is Best For:',
    llamaIndexBestFor: 'LlamaIndex is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'LangChain and LlamaIndex serve complementary purposes in the LLM ecosystem. LangChain is your choice for building complex workflows, agents, and multi-step reasoning applications. LlamaIndex excels when you need to connect and query large amounts of custom data efficiently. Many production applications use both: LlamaIndex for the data layer and retrieval, and LangChain for the orchestration and agent logic.',
    
    faq1q: 'Can I use LangChain and LlamaIndex together?',
    faq1a: 'Yes, they work well together. A common pattern is using LlamaIndex for data indexing and retrieval, then using LangChain for chaining and agent logic. LlamaIndex can be used as a LangChain retriever, and LangChain chains can consume LlamaIndex query results.',
    
    faq2q: 'Which is better for RAG applications?',
    faq2a: 'LlamaIndex is generally better for RAG out-of-the-box with better document processing, chunking strategies, and retrieval optimizations. LangChain can do RAG but requires more setup. For complex RAG with agent workflows, combining both is often optimal.',
    
    faq3q: 'Which has better documentation?',
    faq3a: 'Both have extensive documentation. LangChain has more examples and use cases due to its broader scope. LlamaIndex has excellent documentation specifically for data indexing and RAG patterns. Both communities are active and helpful.',
    
    faq4q: 'What about performance?',
    faq4a: 'LlamaIndex is optimized for retrieval performance with efficient indexing strategies. LangChain performance depends on the complexity of your chains and agent logic. Both can be optimized based on your specific use case and data patterns.',
    
    faq5q: 'Which LLM providers do they support?',
    faq5a: 'Both support major LLM providers including OpenAI, Anthropic, Cohere, Hugging Face, and local models. LangChain has slightly more integrations due to its broader scope. Both allow custom LLM implementations.',
    
    faq6q: 'How do they handle memory and state?',
    faq6a: 'LangChain has built-in memory management with various strategies (conversation buffer, summary, etc.). LlamaIndex focuses more on data state and index management rather than conversation memory. Both can be extended with custom memory implementations.',
    
    faq7q: 'Which is easier to learn?',
    faq7a: 'LlamaIndex may be easier for developers focused on RAG and data querying. LangChain has more concepts to learn (chains, agents, tools) but offers more flexibility. Starting with LlamaIndex for data retrieval and adding LangChain for orchestration is a good learning path.',
    
    faq8q: 'What about production deployment?',
    faq8a: 'Both are production-ready. LangChain offers LangServe for deployment and LangSmith for monitoring. LlamaIndex has LlamaCloud for managed services. Both can be deployed as APIs, integrated into existing applications, or run as standalone services.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'LangChain vs LlamaIndex：LLM 框架对比',
    intro: 'LangChain 和 LlamaIndex 是构建 LLM 应用的两个领先框架。LangChain 专注于链式 LLM 调用和构建智能体，而 LlamaIndex 专注于数据索引和检索增强生成（RAG）。本比较考察它们的架构、功能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为构建复杂的 LLM 链、智能体和多步推理应用选择 LangChain。为需要高效检索、文档索引和 RAG 系统的数据密集型应用选择 LlamaIndex。两者可以协同工作：LlamaIndex 作为数据层，LangChain 作为编排层。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'LangChain 在链式调用、智能体和工作流编排方面表现出色',
    takeaway2: 'LlamaIndex 专注于数据索引和 RAG 实现',
    takeaway3: 'LlamaIndex 具有更好的开箱即用文档处理',
    takeaway4: 'LangChain 拥有更大的生态系统和更多集成',
    takeaway5: '两者都支持多个 LLM 提供商（OpenAI、Anthropic 等）',
    takeaway6: '它们可以一起使用构建全面的 LLM 应用',
    
    whatIsLangChainTitle: '什么是 LangChain？',
    whatIsLangChainContent: 'LangChain 是一个用于开发语言模型驱动应用的开源框架。2022 年发布，它提供了链式 LLM 调用、构建智能体、内存管理和与外部工具集成的工具。LangChain 支持 Python 和 JavaScript，与各种 LLM 提供商和工具有广泛的集成。',
    
    whatIsLlamaIndexTitle: '什么是 LlamaIndex？',
    whatIsLlamaIndexContent: 'LlamaIndex（前身为 GPT Index）是一个用于 LLM 应用的数据框架，专注于将自定义数据连接到 LLM。2022 年发布，它专注于在数据上构建索引以实现高效检索。LlamaIndex 在文档处理、嵌入生成和检索增强生成（RAG）系统方面表现出色。',
    
    performanceTitle: '核心对比',
    performanceIntro: '比较框架能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '基本使用模式：',
    
    langChainExampleTitle: 'LangChain 链式调用示例',
    llamaIndexExampleTitle: 'LlamaIndex RAG 示例',
    
    dataSourceTitle: '数据集成',
    dataSourceIntro: '数据源和索引能力：',
    
    useCasesTitle: '最佳用例',
    langChainBestFor: 'LangChain 最适合：',
    llamaIndexBestFor: 'LlamaIndex 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'LangChain 和 LlamaIndex 在 LLM 生态系统中服务于互补的目的。LangChain 是构建复杂工作流、智能体和多步推理应用的选择。当需要高效连接和查询大量自定义数据时，LlamaIndex 表现出色。许多生产应用同时使用两者：LlamaIndex 用于数据层和检索，LangChain 用于编排和智能体逻辑。',
    
    faq1q: '我可以同时使用 LangChain 和 LlamaIndex 吗？',
    faq1a: '是的，它们可以很好地协同工作。一个常见模式是使用 LlamaIndex 进行数据索引和检索，然后使用 LangChain 进行链式调用和智能体逻辑。LlamaIndex 可以用作 LangChain 的检索器，LangChain 链可以消费 LlamaIndex 查询结果。',
    
    faq2q: '哪个更适合 RAG 应用？',
    faq2a: 'LlamaIndex 通常更适合开箱即用的 RAG，具有更好的文档处理、分块策略和检索优化。LangChain 可以做 RAG 但需要更多设置。对于结合智能体工作流的复杂 RAG，同时使用两者通常是最佳选择。',
    
    faq3q: '哪个有更好的文档？',
    faq3a: '两者都有广泛的文档。由于范围更广，LangChain 有更多示例和用例。LlamaIndex 在数据索引和 RAG 模式方面有出色的文档。两个社区都很活跃和有帮助。',
    
    faq4q: '性能如何？',
    faq4a: 'LlamaIndex 通过高效的索引策略优化了检索性能。LangChain 的性能取决于链和智能体逻辑的复杂性。两者都可以根据特定用例和数据模式进行优化。',
    
    faq5q: '它们支持哪些 LLM 提供商？',
    faq5a: '两者都支持主要 LLM 提供商，包括 OpenAI、Anthropic、Cohere、Hugging Face 和本地模型。由于范围更广，LangChain 有稍多的集成。两者都允许自定义 LLM 实现。',
    
    faq6q: '它们如何处理内存和状态？',
    faq6a: 'LangChain 具有内置的内存管理和各种策略（对话缓冲区、摘要等）。LlamaIndex 更专注于数据状态和索引管理，而不是对话内存。两者都可以通过自定义内存实现进行扩展。',
    
    faq7q: '哪个更容易学习？',
    faq7a: '对于专注于 RAG 和数据查询的开发者，LlamaIndex 可能更容易。LangChain 有更多概念需要学习（链、智能体、工具）但提供更多灵活性。从 LlamaIndex 开始学习数据检索，然后添加 LangChain 进行编排是一个好的学习路径。',
    
    faq8q: '生产部署怎么样？',
    faq8a: '两者都是生产就绪的。LangChain 提供 LangServe 用于部署和 LangSmith 用于监控。LlamaIndex 有 LlamaCloud 提供托管服务。两者都可以作为 API 部署，集成到现有应用中，或作为独立服务运行。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function LangChainVsLlamaIndex({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsLangChainTitle}</h3>
      <p style={pStyle}>{ct.whatIsLangChainContent}</p>

      <h3 style={h3Style}>{ct.whatIsLlamaIndexTitle}</h3>
      <p style={pStyle}>{ct.whatIsLlamaIndexContent}</p>

      {/* Comparison Table */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>LangChain</th>
              <th style={thStyle}>LlamaIndex</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心定位' : 'Core Focus', isZh ? '链式调用和智能体' : 'Chaining & Agents', isZh ? '数据索引和检索' : 'Data Indexing & Retrieval'],
              [isZh ? '主要用例' : 'Primary Use Case', isZh ? '工作流编排' : 'Workflow Orchestration', 'RAG Systems'],
              [isZh ? '数据连接' : 'Data Connection', isZh ? '通过工具集成' : 'Via tool integrations', isZh ? '原生数据连接器' : 'Native data connectors'],
              [isZh ? '内存管理' : 'Memory Management', isZh ? '内置多种策略' : 'Built-in strategies', isZh ? '索引状态管理' : 'Index state management'],
              [isZh ? '智能体支持' : 'Agent Support', isZh ? '强大且灵活' : 'Powerful & flexible', isZh ? '基础支持' : 'Basic support'],
              [isZh ? '文档处理' : 'Document Processing', isZh ? '需要额外设置' : 'Requires setup', isZh ? '开箱即用' : 'Out-of-the-box'],
              [isZh ? '生态系统' : 'Ecosystem', isZh ? '大型且活跃' : 'Large & active', isZh ? '专注增长中' : 'Focused & growing'],
            ].map(([feature, langchain, llamaindex], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{langchain}</td>
                <td style={tdStyle}>{llamaindex}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>LangChain</th>
              <th style={thStyle}>LlamaIndex</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '链式调用' : 'Chains', isZh ? '核心功能' : 'Core feature', isZh ? '基础支持' : 'Basic support'],
              [isZh ? '智能体' : 'Agents', isZh ? '强大' : 'Powerful', isZh ? '有限' : 'Limited'],
              [isZh ? '检索器' : 'Retrievers', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              [isZh ? '工具集成' : 'Tool Integration', isZh ? '丰富' : 'Rich', isZh ? '中等' : 'Moderate'],
              [isZh ? '向量存储' : 'Vector Stores', '50+ 集成', '40+ 集成'],
              [isZh ? '文档加载器' : 'Document Loaders', '100+ 加载器', '160+ 加载器'],
              [isZh ? '嵌入模型' : 'Embedding Models', '25+ 提供商', '20+ 提供商'],
              [isZh ? '评估工具' : 'Evaluation', 'LangSmith', isZh ? '内置评估' : 'Built-in evaluation'],
            ].map(([cap, langchain, llamaindex], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{langchain}</td>
                <td style={tdStyle}>{llamaindex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#10b981' }}>{ct.langChainExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// LangChain Sequential Chain Example
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain, SequentialChain } from "langchain/chains";

const llm = new ChatOpenAI({ temperature: 0.7 });

// First chain: Generate a product name
const productNamePrompt = new PromptTemplate({
  template: "Generate a creative name for a \\{product\\}",
  inputVariables: ["product"],
});
const productNameChain = new LLMChain({
  llm,
  prompt: productNamePrompt,
  outputKey: "product_name",
});

// Second chain: Create a tagline
const taglinePrompt = new PromptTemplate({
  template: "Write a catchy tagline for \\{product_name\\}",
  inputVariables: ["product_name"],
});
const taglineChain = new LLMChain({
  llm,
  prompt: taglinePrompt,
  outputKey: "tagline",
});

// Combine into sequential chain
const overallChain = new SequentialChain({
  chains: [productNameChain, taglineChain],
  inputVariables: ["product"],
  outputVariables: ["product_name", "tagline"],
});

// Execute the chain
const result = await overallChain.call({ product: "smart water bottle" });
console.log(result);
// Output: { product_name: "HydraSmart", tagline: "Stay hydrated, stay smart" }`}</code></pre>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.llamaIndexExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// LlamaIndex RAG Example
import { VectorStoreIndex, SimpleDirectoryReader } from "llamaindex";

// Load documents from directory
const documents = await new SimpleDirectoryReader().loadData("./data");

// Create an index from documents
const index = await VectorStoreIndex.fromDocuments(documents);

// Create a query engine
const queryEngine = index.asQueryEngine();

// Query the index
const response = await queryEngine.query(
  "What are the main features of the product?"
);

console.log(response.toString());

// With custom similarity top-k
const retriever = index.asRetriever({ similarityTopK: 5 });
const queryEngineWithRetriever = index.asQueryEngine({
  retriever,
});

// Streaming response
const streamingEngine = index.asQueryEngine();
const stream = await streamingEngine.query(
  "Summarize the document"
);

for await (const chunk of stream) {
  process.stdout.write(chunk);
}`}</code></pre>

      {/* Data Sources */}
      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '类别' : 'Category'}</th>
              <th style={thStyle}>LangChain</th>
              <th style={thStyle}>LlamaIndex</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '文档格式' : 'Document Formats', 'PDF, DOCX, TXT, Markdown, etc.', 'PDF, DOCX, TXT, Markdown, PPTX, etc.'],
              [isZh ? '数据库' : 'Databases', 'SQL, MongoDB, Redis, etc.', 'SQL, MongoDB, Firestore, etc.'],
              [isZh ? '云存储' : 'Cloud Storage', 'S3, GCS, Azure Blob', 'S3, GCS, Azure, Dropbox'],
              [isZh ? 'API 集成' : 'API Integrations', 'Web tools, REST APIs', 'Notion, Slack, Discord, Jira'],
              [isZh ? '向量数据库' : 'Vector Databases', 'Pinecone, Weaviate, Milvus', 'Pinecone, Weaviate, Chroma'],
            ].map(([cat, langchain, llamaindex], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{langchain}</td>
                <td style={tdStyle}>{llamaindex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #10b981' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#10b981' }}>{ct.langChainBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '多步骤工作流' : 'Multi-step workflows'}</li>
            <li>{isZh ? '智能体应用' : 'Agent applications'}</li>
            <li>{isZh ? '对话系统' : 'Conversational systems'}</li>
            <li>{isZh ? '工具使用和 API 集成' : 'Tool usage & API integration'}</li>
            <li>{isZh ? '复杂推理链' : 'Complex reasoning chains'}</li>
            <li>{isZh ? '多模态应用' : 'Multi-modal applications'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8b5cf6' }}>{ct.llamaIndexBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '文档问答系统' : 'Document Q&A systems'}</li>
            <li>{isZh ? '知识库检索' : 'Knowledge base retrieval'}</li>
            <li>{isZh ? '企业搜索' : 'Enterprise search'}</li>
            <li>{isZh ? 'RAG 应用' : 'RAG applications'}</li>
            <li>{isZh ? '数据索引和分析' : 'Data indexing & analysis'}</li>
            <li>{isZh ? '语义搜索' : 'Semantic search'}</li>
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
