'use client';
import React from 'react';

const translations = {
  en: {
    title: 'AI Engineering Complete Guide 2026: LLMs, RAG, Agents, Prompt Engineering and Vector Databases',
    description: 'A comprehensive AI engineering guide covering LLM APIs (OpenAI, Claude, Gemini), prompt engineering techniques, RAG architecture, vector databases (Pinecone, Weaviate, pgvector), LangChain and LlamaIndex frameworks, fine-tuning strategies, embedding models, AI agents with tool use, guardrails and safety, cost optimization, and LLM evaluation testing.',
    tldr: 'AI Engineering is the discipline of building production applications on top of large language models. Master prompt engineering first (system prompts, few-shot, chain-of-thought), then add RAG with vector databases when the model needs domain knowledge, and only fine-tune when prompt engineering plus RAG are insufficient. Use LangChain or LlamaIndex to orchestrate chains and agents. Choose between OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Pro, or open-source Llama 3 based on cost, latency, context window, and task requirements. Always implement guardrails, evaluation pipelines, and cost monitoring before going to production.',
  },
  zh: {
    title: 'AI 工程完全指南 2026：大语言模型、RAG、智能体、提示工程与向量数据库',
    description: '全面的 AI 工程指南，涵盖 LLM API（OpenAI、Claude、Gemini）、提示工程技术、RAG 架构、向量数据库（Pinecone、Weaviate、pgvector）、LangChain 和 LlamaIndex 框架、微调策略、嵌入模型、AI 智能体与工具调用、安全护栏、成本优化以及 LLM 评估测试。',
    tldr: 'AI 工程是在大语言模型之上构建生产级应用的学科。首先掌握提示工程（系统提示词、少样本学习、思维链），当模型需要领域知识时添加 RAG 与向量数据库，仅在提示工程加 RAG 不够时才微调。使用 LangChain 或 LlamaIndex 编排链和智能体。根据成本、延迟、上下文窗口和任务需求，在 OpenAI GPT-4o、Anthropic Claude 3.5 Sonnet、Google Gemini 1.5 Pro 或开源 Llama 3 之间选择。上线前务必实现安全护栏、评估管道和成本监控。',
  },
};

export default function AiEngineeringGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const faqData = [
    {
      question: isZh ? 'AI 工程师和 ML 工程师有什么区别？' : 'What is the difference between an AI Engineer and an ML Engineer?',
      answer: isZh
        ? 'ML 工程师专注于从零训练和优化机器学习模型（数据收集、特征工程、模型训练、超参数调优）。AI 工程师专注于利用预训练的大语言模型（LLM）构建应用——通过 API 调用、提示工程、RAG、微调和编排框架将 LLM 集成到产品中。AI 工程师更偏应用层，ML 工程师更偏模型层。'
        : 'ML Engineers focus on training and optimizing machine learning models from scratch — data collection, feature engineering, model training, hyperparameter tuning. AI Engineers focus on building applications using pre-trained LLMs — integrating models via APIs, prompt engineering, RAG, fine-tuning, and orchestration frameworks. AI Engineering is more application-layer; ML Engineering is more model-layer.',
    },
    {
      question: isZh ? 'RAG 和微调应该怎么选择？' : 'When should I use RAG vs fine-tuning?',
      answer: isZh
        ? '优先使用 RAG：当你需要最新信息、需要引用来源、数据频繁更新、需要可解释性时。选择微调：当你需要改变模型的语气/风格/格式、需要学习特定领域的推理模式、RAG 检索质量不够好时。两者可以结合使用——先微调让模型更好地理解领域语言，再用 RAG 提供具体事实。成本方面，RAG 的前期成本更低但每次查询有检索开销，微调需要更高的前期训练成本但推理时更简单。'
        : 'Prefer RAG when: you need up-to-date information, need source citations, data changes frequently, or need explainability. Choose fine-tuning when: you need to change the model tone/style/format, need to learn domain-specific reasoning patterns, or RAG retrieval quality is insufficient. They can be combined — fine-tune to help the model understand domain language better, then use RAG to supply specific facts. Cost-wise, RAG has lower upfront cost but per-query retrieval overhead; fine-tuning requires higher upfront training cost but simpler inference.',
    },
    {
      question: isZh ? '向量数据库怎么选？' : 'How do I choose a vector database?',
      answer: isZh
        ? '选择取决于规模和基础设施。Pinecone：全托管、零运维、适合快速原型和中等规模；Weaviate：开源、支持混合搜索（向量+关键词）、丰富的模块生态；Qdrant：开源、Rust 实现性能出色、过滤功能强大；pgvector：PostgreSQL 扩展，适合已有 PG 基础设施的团队，数据量在百万级以下性能良好；Chroma：轻量级、适合本地开发和原型验证。超大规模（十亿级向量）考虑 Milvus。'
        : 'The choice depends on scale and infrastructure. Pinecone: fully managed, zero ops, good for prototypes and medium scale. Weaviate: open-source, hybrid search (vector + keyword), rich module ecosystem. Qdrant: open-source, Rust-based with excellent performance, powerful filtering. pgvector: PostgreSQL extension, ideal for teams with existing PG infrastructure, performs well under a few million vectors. Chroma: lightweight, great for local development and prototyping. For billion-scale vectors, consider Milvus.',
    },
    {
      question: isZh ? '如何降低 LLM API 成本？' : 'How can I reduce LLM API costs?',
      answer: isZh
        ? '关键策略：1) 语义缓存——缓存相似查询的响应，避免重复调用；2) 模型路由——简单任务用小模型（GPT-4o-mini/Claude Haiku），复杂任务才用大模型；3) 提示词优化——减少不必要的 token（精简系统提示词、压缩上下文）；4) 批量 API——非实时场景使用批量接口可降低 50% 费用；5) 开源模型——对延迟和隐私要求高的场景自部署 Llama 3 或 Mistral；6) 输出长度限制——设置 max_tokens 避免冗长回复。'
        : 'Key strategies: 1) Semantic caching — cache responses for similar queries to avoid redundant calls; 2) Model routing — use smaller models (GPT-4o-mini/Claude Haiku) for simple tasks, large models only for complex ones; 3) Prompt optimization — reduce unnecessary tokens (trim system prompts, compress context); 4) Batch APIs — use batch endpoints for non-realtime scenarios, saving up to 50%; 5) Open-source models — self-host Llama 3 or Mistral for latency-sensitive and privacy-critical workloads; 6) Output length limits — set max_tokens to prevent verbose responses.',
    },
    {
      question: isZh ? 'LangChain 和 LlamaIndex 有什么区别？' : 'What is the difference between LangChain and LlamaIndex?',
      answer: isZh
        ? 'LangChain 是通用的 LLM 应用编排框架，擅长构建复杂的链（Chain）和智能体（Agent），适合多步骤工作流、工具调用、对话管理。LlamaIndex（原 GPT Index）专注于数据索引和检索，擅长连接各种数据源并构建高质量的 RAG 管道。实践中两者经常配合使用：LlamaIndex 处理数据摄取和检索，LangChain 处理链编排和智能体逻辑。如果你的核心需求是 RAG，从 LlamaIndex 开始；如果需要复杂的多步骤工作流，从 LangChain 开始。'
        : 'LangChain is a general-purpose LLM application orchestration framework, excelling at building complex Chains and Agents — ideal for multi-step workflows, tool calling, and conversation management. LlamaIndex (formerly GPT Index) specializes in data indexing and retrieval, connecting diverse data sources and building high-quality RAG pipelines. In practice they are often used together: LlamaIndex handles data ingestion and retrieval while LangChain handles chain orchestration and agent logic. If your core need is RAG, start with LlamaIndex; if you need complex multi-step workflows, start with LangChain.',
    },
    {
      question: isZh ? '什么是 AI 智能体？和普通 LLM 调用有什么区别？' : 'What are AI agents and how do they differ from regular LLM calls?',
      answer: isZh
        ? 'AI 智能体是能够自主规划、使用工具、执行多步骤任务的 LLM 应用。普通 LLM 调用是单轮输入-输出，而智能体可以：1) 分解复杂任务为子步骤；2) 调用外部工具（搜索引擎、数据库、API、代码执行器）；3) 观察工具返回结果并决定下一步行动；4) 迭代直到任务完成。核心模式是 ReAct（Reasoning + Acting）循环：思考 → 行动 → 观察 → 思考。Function Calling 是实现工具调用的主要 API 机制。'
        : 'AI agents are LLM applications that can autonomously plan, use tools, and execute multi-step tasks. A regular LLM call is single-turn input-output, whereas agents can: 1) decompose complex tasks into sub-steps; 2) call external tools (search engines, databases, APIs, code executors); 3) observe tool results and decide the next action; 4) iterate until the task is complete. The core pattern is the ReAct (Reasoning + Acting) loop: Think, Act, Observe, Think. Function Calling is the primary API mechanism for implementing tool use.',
    },
    {
      question: isZh ? '如何评估和测试 LLM 应用？' : 'How do I evaluate and test LLM applications?',
      answer: isZh
        ? '多层评估方法：1) 离线评估——使用标注数据集计算准确率、F1、BLEU/ROUGE 等指标；2) LLM-as-Judge——用一个强大的 LLM（如 GPT-4）评估另一个模型的输出质量；3) RAG 特定指标——检索相关性（Precision@K）、回答忠实度（是否基于检索内容）、回答相关性；4) 人工评估——对关键场景进行人工审核和 A/B 测试；5) 在线监控——追踪延迟、成本、用户反馈、错误率。推荐工具：Ragas（RAG 评估）、DeepEval、LangSmith（追踪和调试）、Phoenix（可观测性）。'
        : 'Multi-layer evaluation approach: 1) Offline evaluation — use labeled datasets to compute accuracy, F1, BLEU/ROUGE metrics; 2) LLM-as-Judge — use a powerful LLM (e.g., GPT-4) to evaluate another model output quality; 3) RAG-specific metrics — retrieval relevance (Precision@K), answer faithfulness (grounded in retrieved content), answer relevance; 4) Human evaluation — manual review and A/B testing for critical scenarios; 5) Online monitoring — track latency, cost, user feedback, error rates. Recommended tools: Ragas (RAG evaluation), DeepEval, LangSmith (tracing and debugging), Phoenix (observability).',
    },
    {
      question: isZh ? '如何处理 LLM 幻觉问题？' : 'How do I handle LLM hallucinations?',
      answer: isZh
        ? '减少幻觉的策略：1) RAG——让模型基于检索到的真实文档回答，而非凭记忆生成；2) 系统提示词约束——明确指示"仅基于提供的上下文回答，如不确定请说不知道"；3) 温度参数——降低 temperature（0.0-0.3）减少随机性；4) 结构化输出——使用 JSON Schema 或 function calling 约束输出格式；5) 自检机制——让模型生成答案后再验证自己的答案是否有依据；6) 事实核查管道——对输出进行自动化的事实验证；7) 引用来源——要求模型引用具体的文档段落。'
        : 'Strategies to reduce hallucinations: 1) RAG — ground the model in retrieved real documents rather than relying on memory; 2) System prompt constraints — explicitly instruct "answer only based on the provided context, say you do not know if unsure"; 3) Temperature parameter — lower temperature (0.0-0.3) to reduce randomness; 4) Structured output — use JSON Schema or function calling to constrain output format; 5) Self-verification — have the model verify its own answer is supported by evidence after generation; 6) Fact-checking pipeline — automated factual verification of outputs; 7) Source citation — require the model to cite specific document passages.',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b', lineHeight: '1.7' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <p style={{ margin: 0, fontWeight: 600, color: '#0369a1', marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</p>
        <p style={{ margin: 0, color: '#0c4a6e', fontSize: '1rem' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#1e293b', fontWeight: 700 }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </h2>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? 'AI 工程专注于在预训练 LLM 之上构建应用，而非从零训练模型；核心技能包括提示工程、RAG、API 集成和编排框架。' : 'AI Engineering focuses on building applications on top of pre-trained LLMs, not training models from scratch; core skills include prompt engineering, RAG, API integration, and orchestration frameworks.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? '决策顺序：先优化提示词，不够则加 RAG，仍不够才微调——90% 的应用用提示工程 + RAG 就能解决。' : 'Decision order: optimize prompts first, add RAG if insufficient, fine-tune only as a last resort — 90% of applications can be solved with prompt engineering + RAG.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? '向量数据库是 RAG 的核心组件；根据规模选择：pgvector（百万级以下）、Pinecone（托管）、Weaviate/Qdrant（开源大规模）。' : 'Vector databases are the core component of RAG; choose by scale: pgvector (under millions), Pinecone (managed), Weaviate/Qdrant (open-source at scale).'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? 'AI 智能体通过 ReAct 循环（推理 + 行动）和 Function Calling 实现自主多步骤任务执行。' : 'AI agents achieve autonomous multi-step task execution through ReAct loops (Reasoning + Acting) and Function Calling.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? '安全护栏必不可少：内容过滤、幻觉检测、输出验证、速率限制和成本监控应在上线前就位。' : 'Guardrails are essential: content filtering, hallucination detection, output validation, rate limiting, and cost monitoring must be in place before production.'}</li>
          <li style={{ marginBottom: '0', color: '#334155' }}>{isZh ? '成本优化关键：语义缓存、模型路由（简单任务用小模型）、提示词压缩和批量 API 可降低 60-80% 费用。' : 'Cost optimization keys: semantic caching, model routing (small models for simple tasks), prompt compression, and batch APIs can reduce costs by 60-80%.'}</li>
        </ul>
      </div>

      {/* Section 1 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '1. 什么是 AI 工程？（对比 ML 工程和数据科学）' : '1. What Is AI Engineering? (vs ML Engineering vs Data Science)'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'AI 工程（AI Engineering）是一个新兴学科，专注于利用预训练的大语言模型（LLM）构建生产级应用。它处于软件工程和机器学习的交叉点，但与传统的 ML 工程和数据科学有明显区别。AI 工程师不需要从零训练模型，而是通过 API 调用、提示工程、检索增强生成（RAG）和编排框架将 LLM 能力集成到产品中。'
          : 'AI Engineering is an emerging discipline focused on building production applications using pre-trained large language models (LLMs). It sits at the intersection of software engineering and machine learning, but differs significantly from traditional ML Engineering and Data Science. AI Engineers do not train models from scratch — instead they integrate LLM capabilities into products through API calls, prompt engineering, Retrieval-Augmented Generation (RAG), and orchestration frameworks.'}
      </p>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '2023-2024 年 LLM 的爆发式发展催生了这个角色。随着 GPT-4、Claude 3、Gemini 等模型变得越来越强大，大量应用场景不再需要自训练模型，而是需要懂得如何高效使用这些模型的工程师。AI 工程师的核心价值在于将 LLM 能力转化为可靠的、可扩展的产品功能。'
          : 'The explosive growth of LLMs in 2023-2024 gave rise to this role. As models like GPT-4, Claude 3, and Gemini became increasingly powerful, many application scenarios no longer require training custom models — instead they need engineers who know how to use these models effectively. The core value of an AI Engineer is transforming LLM capabilities into reliable, scalable product features.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'AI Engineering vs ML Engineering vs Data Science\n' +
          '=================================================\n\n' +
          'Role               Focus                  Key Skills              Output\n' +
          '----               -----                  ----------              ------\n' +
          'Data Scientist     Analysis & insights    Statistics, SQL,        Reports, dashboards,\n' +
          '                                          Python, visualization   predictive models\n\n' +
          'ML Engineer        Model training         PyTorch, TensorFlow,    Trained models,\n' +
          '                   & deployment           MLOps, feature eng.     ML pipelines\n\n' +
          'AI Engineer        LLM application        Prompt eng., RAG,       AI-powered products,\n' +
          '                   development            LangChain, APIs         chatbots, agents\n\n' +
          'Key Differences:\n' +
          '- Data Scientist: "What does the data tell us?"\n' +
          '- ML Engineer:    "How do we train and serve a model?"\n' +
          '- AI Engineer:    "How do we build a product with an LLM?"'
        }</code>
      </pre>

      {/* Section 2 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '2. LLM API：OpenAI、Anthropic Claude、Google Gemini' : '2. LLM APIs: OpenAI, Anthropic Claude, Google Gemini'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'LLM API 是 AI 工程的基础。三大主要提供商各有优势：OpenAI 的 GPT-4o 系列生态最成熟；Anthropic 的 Claude 3.5 Sonnet 在长上下文理解和安全性方面领先；Google 的 Gemini 1.5 Pro 拥有超长上下文窗口（100万 token）且与 Google Cloud 深度集成。'
          : 'LLM APIs are the foundation of AI Engineering. The three major providers each have strengths: OpenAI GPT-4o has the most mature ecosystem; Anthropic Claude 3.5 Sonnet leads in long-context understanding and safety; Google Gemini 1.5 Pro offers an ultra-long context window (1M tokens) with deep Google Cloud integration.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// OpenAI API — Chat Completion\n' +
          'import OpenAI from "openai";\n\n' +
          'const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\n\n' +
          'const response = await openai.chat.completions.create({\n' +
          '  model: "gpt-4o",\n' +
          '  messages: [\n' +
          '    { role: "system", content: "You are a helpful coding assistant." },\n' +
          '    { role: "user", content: "Explain async/await in JavaScript" }\n' +
          '  ],\n' +
          '  temperature: 0.7,\n' +
          '  max_tokens: 1000,\n' +
          '});\n\n' +
          'console.log(response.choices[0].message.content);\n' +
          'console.log("Tokens used:", response.usage.total_tokens);'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Anthropic Claude API\n' +
          'import Anthropic from "@anthropic-ai/sdk";\n\n' +
          'const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });\n\n' +
          'const message = await anthropic.messages.create({\n' +
          '  model: "claude-3-5-sonnet-20241022",\n' +
          '  max_tokens: 1024,\n' +
          '  system: "You are a senior software architect.",\n' +
          '  messages: [\n' +
          '    { role: "user", content: "Design a rate limiter for a REST API" }\n' +
          '  ],\n' +
          '});\n\n' +
          'console.log(message.content[0].text);\n' +
          'console.log("Input tokens:", message.usage.input_tokens);\n' +
          'console.log("Output tokens:", message.usage.output_tokens);'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Google Gemini API\n' +
          'import { GoogleGenerativeAI } from "@google/generative-ai";\n\n' +
          'const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);\n' +
          'const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });\n\n' +
          'const result = await model.generateContent({\n' +
          '  contents: [{\n' +
          '    role: "user",\n' +
          '    parts: [{ text: "Compare microservices vs monolith architecture" }]\n' +
          '  }],\n' +
          '  generationConfig: {\n' +
          '    temperature: 0.7,\n' +
          '    maxOutputTokens: 1000,\n' +
          '  },\n' +
          '});\n\n' +
          'console.log(result.response.text());'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'LLM API Comparison (2026)\n' +
          '==========================\n\n' +
          'Provider     Model               Context    Input Cost     Output Cost    Strengths\n' +
          '--------     -----               -------    ----------     -----------    ---------\n' +
          'OpenAI       GPT-4o              128K       \\$2.50/1M      \\$10.00/1M     Best ecosystem, multimodal\n' +
          'OpenAI       GPT-4o-mini         128K       \\$0.15/1M      \\$0.60/1M      Cheapest smart model\n' +
          'Anthropic    Claude 3.5 Sonnet   200K       \\$3.00/1M      \\$15.00/1M     Long context, safety, coding\n' +
          'Anthropic    Claude 3.5 Haiku    200K       \\$0.25/1M      \\$1.25/1M      Fast and affordable\n' +
          'Google       Gemini 1.5 Pro      1M         \\$1.25/1M      \\$5.00/1M      Longest context window\n' +
          'Google       Gemini 1.5 Flash    1M         \\$0.075/1M     \\$0.30/1M      Ultra fast and cheap\n' +
          'Meta         Llama 3.1 405B      128K       Self-host      Self-host      Open source, no API cost\n' +
          'Meta         Llama 3.1 70B       128K       Self-host      Self-host      Best open-source mid-tier\n' +
          'Mistral      Mixtral 8x22B       64K        \\$2.00/1M      \\$6.00/1M      Strong EU-based option'
        }</code>
      </pre>

      {/* Section 3 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '3. 提示工程技术：少样本学习、思维链与系统提示词' : '3. Prompt Engineering: Few-Shot, Chain-of-Thought, and System Prompts'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '提示工程是 AI 工程师最核心的技能。通过精心设计输入提示词，可以显著改变模型的输出质量，而无需修改模型本身。掌握系统提示词（System Prompt）设定角色和约束、少样本学习（Few-Shot Learning）提供示例引导、思维链（Chain-of-Thought）引导逐步推理，是每个 AI 工程师的必修课。'
          : 'Prompt engineering is the most essential skill for AI Engineers. By carefully designing input prompts, you can dramatically improve model output quality without modifying the model itself. Mastering system prompts (setting roles and constraints), few-shot learning (providing examples for guidance), and chain-of-thought (guiding step-by-step reasoning) is a required course for every AI Engineer.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// 1. System Prompt — Setting Role and Constraints\n' +
          'const messages = [\n' +
          '  {\n' +
          '    role: "system",\n' +
          '    content: `You are a senior TypeScript developer.\n' +
          'Rules:\n' +
          '- Always use strict TypeScript types (no "any")\n' +
          '- Include error handling for all async operations\n' +
          '- Add JSDoc comments for public functions\n' +
          '- If you are unsure, say "I am not certain" rather than guessing\n' +
          '- Format output as markdown code blocks`\n' +
          '  },\n' +
          '  { role: "user", content: "Write a function to fetch user data from an API" }\n' +
          '];'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// 2. Few-Shot Learning — Providing Examples\n' +
          'const fewShotMessages = [\n' +
          '  {\n' +
          '    role: "system",\n' +
          '    content: "You classify customer support tickets into categories."\n' +
          '  },\n' +
          '  // Example 1\n' +
          '  { role: "user", content: "My order hasn\'t arrived yet, it\'s been 2 weeks" },\n' +
          '  { role: "assistant", content: "Category: SHIPPING\\nPriority: HIGH\\nSentiment: FRUSTRATED" },\n' +
          '  // Example 2\n' +
          '  { role: "user", content: "How do I change my password?" },\n' +
          '  { role: "assistant", content: "Category: ACCOUNT\\nPriority: LOW\\nSentiment: NEUTRAL" },\n' +
          '  // Example 3\n' +
          '  { role: "user", content: "Your product is amazing, saved me hours!" },\n' +
          '  { role: "assistant", content: "Category: FEEDBACK\\nPriority: LOW\\nSentiment: POSITIVE" },\n' +
          '  // Actual query\n' +
          '  { role: "user", content: "I was charged twice for my subscription" }\n' +
          '];'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// 3. Chain-of-Thought (CoT) — Step-by-Step Reasoning\n' +
          'const cotPrompt = {\n' +
          '  role: "user",\n' +
          '  content: `Analyze whether this API design follows REST best practices.\n' +
          '\n' +
          'API Endpoint: POST /api/users/123/delete\n' +
          '\n' +
          'Think step by step:\n' +
          '1. Check the HTTP method appropriateness\n' +
          '2. Evaluate the URL structure\n' +
          '3. Assess resource naming conventions\n' +
          '4. Check for idempotency considerations\n' +
          '5. Provide your final assessment with improvements`\n' +
          '};\n\n' +
          '// CoT Variations:\n' +
          '// - "Let\'s think step by step" (zero-shot CoT)\n' +
          '// - "Think through this carefully before answering" (implicit CoT)\n' +
          '// - Provide worked examples with reasoning (few-shot CoT)\n' +
          '// - "First analyze X, then consider Y, finally conclude Z" (structured CoT)'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'Prompt Engineering Techniques — Quick Reference\n' +
          '================================================\n\n' +
          'Technique              When to Use                      Example\n' +
          '---------              -----------                      -------\n' +
          'Zero-shot              Simple, well-defined tasks       "Translate to French: Hello"\n' +
          'Few-shot               Classification, formatting       Provide 3-5 input/output pairs\n' +
          'Chain-of-Thought       Math, logic, complex reasoning   "Think step by step..."\n' +
          'System Prompt          Role, tone, constraints          "You are a legal expert..."\n' +
          'Output Format          Structured data needed           "Respond in JSON format..."\n' +
          'Self-consistency       High-stakes decisions            Generate 5 answers, take majority\n' +
          'Tree of Thought        Complex problem solving          Explore multiple solution paths\n' +
          'ReAct                  Tool use, agents                 Think -> Act -> Observe loop\n' +
          'Retrieval-Augmented    Domain-specific knowledge        Inject relevant docs into context\n\n' +
          'Anti-patterns to Avoid:\n' +
          '- Vague instructions ("make it better")\n' +
          '- Overloading context (irrelevant information)\n' +
          '- No output format specification\n' +
          '- Not handling edge cases in prompt\n' +
          '- Using negation ("don\'t do X") instead of affirmation ("do Y")'
        }</code>
      </pre>

      {/* Section 4 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '4. RAG 架构：检索增强生成' : '4. RAG (Retrieval-Augmented Generation) Architecture'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'RAG 是当前 AI 工程中最重要的架构模式之一。它通过在生成回答前先从外部知识库检索相关文档，解决了 LLM 的两大核心问题：知识截止日期和幻觉。RAG 让模型能够基于最新的、特定领域的真实数据来回答问题，同时提供可追溯的来源引用。'
          : 'RAG is one of the most important architectural patterns in AI Engineering today. By retrieving relevant documents from an external knowledge base before generating answers, it solves two core LLM problems: knowledge cutoff dates and hallucinations. RAG enables models to answer questions grounded in up-to-date, domain-specific real data while providing traceable source citations.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'RAG Architecture — Data Flow\n' +
          '============================\n\n' +
          '  INDEXING PHASE (offline, one-time):\n' +
          '  ┌──────────┐    ┌──────────┐    ┌───────────┐    ┌───────────────┐\n' +
          '  │ Documents │ -> │ Chunking │ -> │ Embedding │ -> │ Vector Store  │\n' +
          '  │ (PDF,Web, │    │ (split   │    │ Model     │    │ (Pinecone,    │\n' +
          '  │  Notion)  │    │  text)   │    │ (ada-002) │    │  pgvector)    │\n' +
          '  └──────────┘    └──────────┘    └───────────┘    └───────────────┘\n\n' +
          '  QUERY PHASE (online, per-request):\n' +
          '  ┌──────────┐    ┌───────────┐    ┌───────────────┐\n' +
          '  │ User      │ -> │ Embed     │ -> │ Vector Search │\n' +
          '  │ Question  │    │ Query     │    │ (top-K docs)  │\n' +
          '  └──────────┘    └───────────┘    └───────┬───────┘\n' +
          '                                          │\n' +
          '                                          v\n' +
          '  ┌──────────┐    ┌───────────────────────────────┐\n' +
          '  │ Answer   │ <- │ LLM (query + retrieved docs)  │\n' +
          '  │ + Sources│    │ "Based on context, answer..."  │\n' +
          '  └──────────┘    └───────────────────────────────┘'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Complete RAG Pipeline in TypeScript\n' +
          'import { OpenAIEmbeddings } from "@langchain/openai";\n' +
          'import { PineconeStore } from "@langchain/pinecone";\n' +
          'import { Pinecone } from "@pinecone-database/pinecone";\n' +
          'import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";\n\n' +
          '// Step 1: Document Chunking\n' +
          'const splitter = new RecursiveCharacterTextSplitter({\n' +
          '  chunkSize: 1000,        // characters per chunk\n' +
          '  chunkOverlap: 200,      // overlap between chunks\n' +
          '  separators: ["\\n\\n", "\\n", ". ", " "],  // split priority\n' +
          '});\n' +
          'const chunks = await splitter.splitDocuments(documents);\n\n' +
          '// Step 2: Generate Embeddings & Store\n' +
          'const embeddings = new OpenAIEmbeddings({\n' +
          '  model: "text-embedding-3-small",  // 1536 dimensions\n' +
          '});\n' +
          'const pinecone = new Pinecone();\n' +
          'const index = pinecone.Index("my-rag-index");\n\n' +
          'const vectorStore = await PineconeStore.fromDocuments(\n' +
          '  chunks,\n' +
          '  embeddings,\n' +
          '  { pineconeIndex: index }\n' +
          ');\n\n' +
          '// Step 3: Query — Retrieve + Generate\n' +
          'async function ragQuery(question: string) {\n' +
          '  // Retrieve top 5 most relevant chunks\n' +
          '  const relevantDocs = await vectorStore.similaritySearch(question, 5);\n\n' +
          '  // Build context from retrieved documents\n' +
          '  const context = relevantDocs\n' +
          '    .map((doc, i) => "Source " + (i + 1) + ": " + doc.pageContent)\n' +
          '    .join("\\n\\n");\n\n' +
          '  // Generate answer with context\n' +
          '  const response = await openai.chat.completions.create({\n' +
          '    model: "gpt-4o",\n' +
          '    messages: [\n' +
          '      {\n' +
          '        role: "system",\n' +
          '        content: "Answer the question based ONLY on the provided context. " +\n' +
          '                 "If the context does not contain the answer, say so. " +\n' +
          '                 "Cite your sources using [Source N] format."\n' +
          '      },\n' +
          '      {\n' +
          '        role: "user",\n' +
          '        content: "Context:\\n" + context + "\\n\\nQuestion: " + question\n' +
          '      }\n' +
          '    ],\n' +
          '    temperature: 0.2,  // low temp for factual answers\n' +
          '  });\n\n' +
          '  return {\n' +
          '    answer: response.choices[0].message.content,\n' +
          '    sources: relevantDocs.map(d => d.metadata),\n' +
          '  };\n' +
          '}'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'Chunking Strategies\n' +
          '====================\n\n' +
          'Strategy                Chunk Size   Overlap   Best For\n' +
          '--------                ----------   -------   --------\n' +
          'Fixed-size              500-1000     100-200   General purpose, simple\n' +
          'Recursive character     500-1500     100-300   Most text documents\n' +
          'Sentence-based          1-5 sent.    1 sent.   FAQ, precise retrieval\n' +
          'Semantic                Varies       N/A       Topic-coherent chunks\n' +
          'Parent-child            Small+Large  N/A       Retrieve small, pass large\n' +
          'Markdown header         By section   N/A       Technical documentation\n' +
          'Code-aware              By function  N/A       Source code files\n\n' +
          'Tips:\n' +
          '- Smaller chunks = more precise retrieval but less context\n' +
          '- Larger chunks = more context but noisier retrieval\n' +
          '- Overlap prevents information loss at chunk boundaries\n' +
          '- Test with your actual data to find optimal size'
        }</code>
      </pre>

      {/* Section 5 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '5. 向量数据库：Pinecone、Weaviate、Qdrant 与 pgvector' : '5. Vector Databases: Pinecone, Weaviate, Qdrant, and pgvector'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '向量数据库是 RAG 架构的核心存储层。它们专门为高维向量的相似性搜索而优化，能够在毫秒级别从数百万个向量中找到最相似的结果。选择合适的向量数据库取决于你的规模、基础设施偏好和功能需求。'
          : 'Vector databases are the core storage layer in RAG architectures. They are purpose-built for similarity search over high-dimensional vectors, capable of finding the most similar results from millions of vectors in milliseconds. Choosing the right vector database depends on your scale, infrastructure preferences, and feature requirements.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Pinecone — Fully Managed Vector Database\n' +
          'import { Pinecone } from "@pinecone-database/pinecone";\n\n' +
          'const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });\n' +
          'const index = pinecone.index("my-index");\n\n' +
          '// Upsert vectors\n' +
          'await index.upsert([\n' +
          '  {\n' +
          '    id: "doc-1",\n' +
          '    values: embedding,           // float array [0.1, -0.2, ...]\n' +
          '    metadata: { source: "docs/api.md", section: "auth" },\n' +
          '  },\n' +
          ']);\n\n' +
          '// Query with metadata filter\n' +
          'const results = await index.query({\n' +
          '  vector: queryEmbedding,\n' +
          '  topK: 5,\n' +
          '  filter: { source: { "\\$eq": "docs/api.md" } },\n' +
          '  includeMetadata: true,\n' +
          '});'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// pgvector — PostgreSQL Extension (great for existing PG users)\n' +
          '// SQL setup:\n' +
          '// CREATE EXTENSION vector;\n' +
          '// CREATE TABLE documents (\n' +
          '//   id SERIAL PRIMARY KEY,\n' +
          '//   content TEXT,\n' +
          '//   metadata JSONB,\n' +
          '//   embedding vector(1536)  -- dimension matches your model\n' +
          '// );\n' +
          '// CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops);\n\n' +
          'import pg from "pg";\n\n' +
          'const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });\n\n' +
          '// Insert document with embedding\n' +
          'await pool.query(\n' +
          '  "INSERT INTO documents (content, metadata, embedding) VALUES (\\$1, \\$2, \\$3)",\n' +
          '  [content, JSON.stringify(metadata), JSON.stringify(embedding)]\n' +
          ');\n\n' +
          '// Similarity search (cosine distance)\n' +
          'const result = await pool.query(\n' +
          '  `SELECT content, metadata,\n' +
          '          1 - (embedding <=> \\$1::vector) AS similarity\n' +
          '   FROM documents\n' +
          '   ORDER BY embedding <=> \\$1::vector\n' +
          '   LIMIT 5`,\n' +
          '  [JSON.stringify(queryEmbedding)]\n' +
          ');'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'Vector Database Comparison\n' +
          '===========================\n\n' +
          'Database     Type        Best For                   Pricing         Max Scale\n' +
          '--------     ----        --------                   -------         ---------\n' +
          'Pinecone     Managed     Zero-ops, quick start      Pay-per-use     Billions\n' +
          'Weaviate     OSS/Cloud   Hybrid search, modules     Free/Managed    Billions\n' +
          'Qdrant       OSS/Cloud   Filtering, performance     Free/Managed    Billions\n' +
          'pgvector     PG Ext.     Existing PG infra          Free (self)     Millions\n' +
          'Chroma       OSS         Local dev, prototyping     Free            Millions\n' +
          'Milvus       OSS         Ultra-large scale          Free/Managed    Trillions\n' +
          'FAISS        Library     In-memory, research        Free            Billions\n\n' +
          'Distance Metrics:\n' +
          '- Cosine similarity: normalized, most common for text embeddings\n' +
          '- Euclidean (L2): absolute distance, good for image features\n' +
          '- Dot product: fastest, works when vectors are normalized'
        }</code>
      </pre>

      {/* Section 6 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '6. LangChain 和 LlamaIndex 框架' : '6. LangChain and LlamaIndex Frameworks'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'LangChain 和 LlamaIndex 是两个最流行的 LLM 应用开发框架。LangChain 是通用的编排框架，适合构建复杂的多步骤工作流和智能体；LlamaIndex 专注于数据连接和检索，是构建 RAG 应用的首选。两者可以互补使用。'
          : 'LangChain and LlamaIndex are the two most popular LLM application development frameworks. LangChain is a general-purpose orchestration framework ideal for complex multi-step workflows and agents; LlamaIndex specializes in data connection and retrieval, making it the top choice for RAG applications. They can be used complementarily.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// LangChain — Chain with Prompt Template\n' +
          'import { ChatOpenAI } from "@langchain/openai";\n' +
          'import { ChatPromptTemplate } from "@langchain/core/prompts";\n' +
          'import { StringOutputParser } from "@langchain/core/output_parsers";\n' +
          'import { RunnableSequence } from "@langchain/core/runnables";\n\n' +
          'const model = new ChatOpenAI({ model: "gpt-4o", temperature: 0 });\n\n' +
          '// Simple chain: prompt -> model -> parser\n' +
          'const prompt = ChatPromptTemplate.fromMessages([\n' +
          '  ["system", "You are a technical writer. Write clear, concise explanations."],\n' +
          '  ["user", "Explain {topic} for {audience}"],\n' +
          ']);\n\n' +
          'const chain = RunnableSequence.from([\n' +
          '  prompt,\n' +
          '  model,\n' +
          '  new StringOutputParser(),\n' +
          ']);\n\n' +
          'const result = await chain.invoke({\n' +
          '  topic: "Kubernetes pods",\n' +
          '  audience: "junior developers",\n' +
          '});\n' +
          'console.log(result);'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// LangChain — RAG Chain with Retriever\n' +
          'import { createRetrievalChain } from "langchain/chains/retrieval";\n' +
          'import { createStuffDocumentsChain } from "langchain/chains/combine_documents";\n\n' +
          'const retriever = vectorStore.asRetriever({ k: 5 });\n\n' +
          'const ragPrompt = ChatPromptTemplate.fromMessages([\n' +
          '  ["system",\n' +
          '   "Answer based on the following context only.\\n" +\n' +
          '   "If the context does not help, say you do not know.\\n" +\n' +
          '   "Context: {context}"],\n' +
          '  ["user", "{input}"],\n' +
          ']);\n\n' +
          'const documentChain = await createStuffDocumentsChain({\n' +
          '  llm: model,\n' +
          '  prompt: ragPrompt,\n' +
          '});\n\n' +
          'const ragChain = await createRetrievalChain({\n' +
          '  retriever,\n' +
          '  combineDocsChain: documentChain,\n' +
          '});\n\n' +
          'const answer = await ragChain.invoke({\n' +
          '  input: "How do I configure SSL in Nginx?",\n' +
          '});\n' +
          'console.log(answer.answer);\n' +
          'console.log("Sources:", answer.context.map(d => d.metadata.source));'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# LlamaIndex — RAG Pipeline (Python)\n' +
          'from llama_index.core import (\n' +
          '    VectorStoreIndex,\n' +
          '    SimpleDirectoryReader,\n' +
          '    Settings,\n' +
          ')\n' +
          'from llama_index.llms.openai import OpenAI\n' +
          'from llama_index.embeddings.openai import OpenAIEmbedding\n\n' +
          '# Configure global settings\n' +
          'Settings.llm = OpenAI(model="gpt-4o", temperature=0)\n' +
          'Settings.embed_model = OpenAIEmbedding(model="text-embedding-3-small")\n\n' +
          '# Load documents and build index\n' +
          'documents = SimpleDirectoryReader("./data").load_data()\n' +
          'index = VectorStoreIndex.from_documents(documents)\n\n' +
          '# Query with RAG\n' +
          'query_engine = index.as_query_engine(\n' +
          '    similarity_top_k=5,\n' +
          '    response_mode="compact",  # "tree_summarize", "refine", "compact"\n' +
          ')\n\n' +
          'response = query_engine.query("How do I set up a CI/CD pipeline?")\n' +
          'print(response.response)\n' +
          'print("Sources:", [n.metadata for n in response.source_nodes])\n\n' +
          '# Chat engine with memory\n' +
          'chat_engine = index.as_chat_engine(\n' +
          '    chat_mode="context",   # "condense_question", "react"\n' +
          '    system_prompt="You are a DevOps expert.",\n' +
          ')\n' +
          'response = chat_engine.chat("What is Kubernetes?")\n' +
          'response = chat_engine.chat("How does it compare to Docker Swarm?")'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'LangChain vs LlamaIndex — When to Use Which\n' +
          '=============================================\n\n' +
          'Feature              LangChain                LlamaIndex\n' +
          '-------              ---------                ----------\n' +
          'Primary Focus        Chain orchestration       Data indexing & retrieval\n' +
          'Best For             Complex workflows,        RAG applications,\n' +
          '                     multi-step agents         knowledge bases\n' +
          'Data Connectors      Via integrations          150+ built-in loaders\n' +
          'Agent Support        Excellent (LCEL, tools)   Good (ReAct, tools)\n' +
          'RAG Quality          Good                      Excellent (advanced chunking)\n' +
          'Learning Curve       Moderate                  Lower for RAG tasks\n' +
          'Language Support      Python, TypeScript/JS    Python (primary), TS\n' +
          'Community            Very large                Large\n\n' +
          'Use LangChain when:\n' +
          '  - Building multi-step agent workflows\n' +
          '  - Need complex chain composition (LCEL)\n' +
          '  - Building chatbots with tool calling\n\n' +
          'Use LlamaIndex when:\n' +
          '  - Primary need is RAG over your data\n' +
          '  - Need advanced indexing strategies\n' +
          '  - Have diverse data sources to connect'
        }</code>
      </pre>

      {/* Section 7 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '7. 微调 vs RAG vs 提示工程：决策树' : '7. Fine-Tuning vs RAG vs Prompt Engineering: Decision Tree'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '这三种技术是 AI 工程师定制 LLM 行为的主要手段。选择正确的方法可以显著降低成本和开发时间。遵循一个简单原则：从最简单的方法开始，只在必要时升级到更复杂的方法。'
          : 'These three techniques are the primary means for AI Engineers to customize LLM behavior. Choosing the right approach can dramatically reduce cost and development time. Follow a simple principle: start with the simplest method and upgrade to more complex ones only when necessary.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'Decision Tree: How to Customize LLM Behavior\n' +
          '=============================================\n\n' +
          'Start here: "What does the model need to learn?"\n' +
          '  |\n' +
          '  |-- Nothing new, just better outputs?\n' +
          '  |   --> PROMPT ENGINEERING\n' +
          '  |   - System prompts, few-shot examples, output formats\n' +
          '  |   - Cost: \\$0, Time: hours, Skill: low\n' +
          '  |\n' +
          '  |-- Needs specific/recent facts or your data?\n' +
          '  |   --> RAG (Retrieval-Augmented Generation)\n' +
          '  |   - Vector DB + retrieval pipeline + prompt\n' +
          '  |   - Cost: \\$100-\\$1K setup, Time: days, Skill: medium\n' +
          '  |\n' +
          '  |-- Needs to change behavior/style/format?\n' +
          '  |   |-- Is the change simple (e.g., always respond in JSON)?\n' +
          '  |   |   --> PROMPT ENGINEERING (with structured output)\n' +
          '  |   |\n' +
          '  |   |-- Is the change complex (domain-specific reasoning)?\n' +
          '  |       --> FINE-TUNING\n' +
          '  |       - Prepare training data, train, evaluate\n' +
          '  |       - Cost: \\$500-\\$10K+, Time: weeks, Skill: high\n' +
          '  |\n' +
          '  |-- Needs both facts AND behavior change?\n' +
          '      --> FINE-TUNING + RAG (combined)\n' +
          '      - Fine-tune for domain language understanding\n' +
          '      - RAG for real-time factual grounding\n' +
          '      - Cost: highest, Time: weeks-months'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// OpenAI Fine-Tuning API Example\n\n' +
          '// Step 1: Prepare training data (JSONL format)\n' +
          '// training_data.jsonl:\n' +
          '// {"messages": [{"role":"system","content":"You are a SQL expert"},\n' +
          '//   {"role":"user","content":"Show all users created today"},\n' +
          '//   {"role":"assistant","content":"SELECT * FROM users WHERE created_at >= CURRENT_DATE;"}]}\n' +
          '// {"messages": [{"role":"system","content":"You are a SQL expert"},\n' +
          '//   {"role":"user","content":"Count active premium users"},\n' +
          '//   {"role":"assistant","content":"SELECT COUNT(*) FROM users WHERE status = \'active\' AND plan = \'premium\';"}]}\n\n' +
          '// Step 2: Upload training file\n' +
          'const file = await openai.files.create({\n' +
          '  file: fs.createReadStream("training_data.jsonl"),\n' +
          '  purpose: "fine-tune",\n' +
          '});\n\n' +
          '// Step 3: Create fine-tuning job\n' +
          'const job = await openai.fineTuning.jobs.create({\n' +
          '  training_file: file.id,\n' +
          '  model: "gpt-4o-mini-2024-07-18",\n' +
          '  hyperparameters: {\n' +
          '    n_epochs: 3,\n' +
          '    batch_size: "auto",\n' +
          '    learning_rate_multiplier: "auto",\n' +
          '  },\n' +
          '});\n\n' +
          '// Step 4: Use fine-tuned model\n' +
          '// const response = await openai.chat.completions.create({\n' +
          '//   model: "ft:gpt-4o-mini-2024-07-18:my-org::abc123",\n' +
          '//   messages: [...]\n' +
          '// });'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'Prompt Engineering vs RAG vs Fine-Tuning\n' +
          '=========================================\n\n' +
          'Dimension            Prompt Eng.       RAG                Fine-Tuning\n' +
          '---------            -----------       ---                -----------\n' +
          'Setup Cost           Free              Low-Medium         High\n' +
          'Time to Implement    Hours             Days               Weeks\n' +
          'Per-Query Cost       Base model cost   +Retrieval cost    -20-50% savings\n' +
          'Knowledge Update     Change prompt     Update vector DB   Retrain model\n' +
          'Factual Accuracy     Model knowledge   High (grounded)    Model knowledge\n' +
          'Style/Format         Good (examples)   Limited            Excellent\n' +
          'Source Citations     No                Yes                No\n' +
          'Data Privacy         Sent to API       Chunks sent        Trained into model\n' +
          'Maintenance          Easy              Medium             Complex\n' +
          'Best Starting Point  YES               Second choice      Last resort'
        }</code>
      </pre>

      {/* Section 8 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '8. 嵌入模型与语义搜索' : '8. Embedding Models and Semantic Search'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '嵌入模型将文本转换为高维向量（通常 768-3072 维），使得语义相似的文本在向量空间中距离更近。嵌入是 RAG、语义搜索、文本分类和聚类等应用的基础。选择合适的嵌入模型直接影响检索质量。'
          : 'Embedding models convert text into high-dimensional vectors (typically 768-3072 dimensions) such that semantically similar texts are closer together in vector space. Embeddings are the foundation of RAG, semantic search, text classification, and clustering applications. Choosing the right embedding model directly impacts retrieval quality.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Generating Embeddings with OpenAI\n' +
          'const response = await openai.embeddings.create({\n' +
          '  model: "text-embedding-3-small",  // or "text-embedding-3-large"\n' +
          '  input: "How do I deploy a Next.js application?",\n' +
          '  dimensions: 1536,  // can reduce for cost savings (e.g., 512)\n' +
          '});\n\n' +
          'const embedding = response.data[0].embedding;\n' +
          '// embedding = [0.0123, -0.0456, 0.0789, ...] (1536 floats)\n\n' +
          '// Batch embeddings (more efficient)\n' +
          'const batchResponse = await openai.embeddings.create({\n' +
          '  model: "text-embedding-3-small",\n' +
          '  input: [\n' +
          '    "How to set up Docker containers",\n' +
          '    "Kubernetes pod configuration guide",\n' +
          '    "CI/CD pipeline with GitHub Actions",\n' +
          '    "AWS Lambda serverless functions",\n' +
          '  ],\n' +
          '});\n' +
          '// batchResponse.data[0].embedding, batchResponse.data[1].embedding, ...'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Semantic Search Implementation\n' +
          'function cosineSimilarity(a: number[], b: number[]): number {\n' +
          '  let dotProduct = 0;\n' +
          '  let normA = 0;\n' +
          '  let normB = 0;\n' +
          '  for (let i = 0; i < a.length; i++) {\n' +
          '    dotProduct += a[i] * b[i];\n' +
          '    normA += a[i] * a[i];\n' +
          '    normB += b[i] * b[i];\n' +
          '  }\n' +
          '  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));\n' +
          '}\n\n' +
          '// Compare semantic similarity\n' +
          'const queries = [\n' +
          '  "How to deploy to production",      // semantically similar\n' +
          '  "Production deployment guide",       // semantically similar\n' +
          '  "Best pizza recipe",                 // semantically different\n' +
          '];\n\n' +
          '// Result: queries[0] and queries[1] will have high similarity (~0.92)\n' +
          '//         queries[0] and queries[2] will have low similarity (~0.15)\n\n' +
          '// Hybrid Search: combine semantic + keyword for best results\n' +
          '// score = alpha * semantic_score + (1 - alpha) * bm25_score\n' +
          '// alpha = 0.7 is a good starting point'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'Embedding Model Comparison\n' +
          '===========================\n\n' +
          'Model                    Provider   Dims    Cost/1M tokens   MTEB Score\n' +
          '-----                    --------   ----    --------------   ----------\n' +
          'text-embedding-3-large   OpenAI     3072    \\$0.13           64.6\n' +
          'text-embedding-3-small   OpenAI     1536    \\$0.02           62.3\n' +
          'voyage-3                 Voyage AI  1024    \\$0.06           67.1\n' +
          'embed-v3.0               Cohere     1024    \\$0.10           64.8\n' +
          'BGE-large-en-v1.5        BAAI       1024    Free (OSS)       63.5\n' +
          'GTE-Qwen2-7B             Alibaba    3584    Free (OSS)       70.2\n' +
          'nomic-embed-text         Nomic      768     Free (OSS)       62.4\n\n' +
          'Tips:\n' +
          '- Start with text-embedding-3-small (best cost/quality ratio)\n' +
          '- Use dimension reduction for cost savings (3072 -> 1024)\n' +
          '- Benchmark on YOUR data, not just MTEB leaderboard\n' +
          '- Open-source models (BGE, GTE) are competitive and free\n' +
          '- Use the same model for indexing and querying'
        }</code>
      </pre>

      {/* Section 9 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '9. AI 智能体与工具调用（Function Calling）' : '9. AI Agents and Tool Use (Function Calling)'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'AI 智能体是能够自主规划、推理和使用工具完成复杂任务的 LLM 应用。与简单的问答不同，智能体可以分解任务、调用外部 API、执行代码、查询数据库，并根据中间结果动态调整策略。Function Calling 是实现智能体工具调用的核心 API 机制。'
          : 'AI agents are LLM applications capable of autonomous planning, reasoning, and using tools to complete complex tasks. Unlike simple Q&A, agents can decompose tasks, call external APIs, execute code, query databases, and dynamically adjust strategies based on intermediate results. Function Calling is the core API mechanism for implementing agent tool use.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// OpenAI Function Calling — Tool Use\n' +
          'const tools = [\n' +
          '  {\n' +
          '    type: "function",\n' +
          '    function: {\n' +
          '      name: "search_documentation",\n' +
          '      description: "Search technical documentation for a given query",\n' +
          '      parameters: {\n' +
          '        type: "object",\n' +
          '        properties: {\n' +
          '          query: { type: "string", description: "Search query" },\n' +
          '          language: {\n' +
          '            type: "string",\n' +
          '            enum: ["javascript", "python", "rust", "go"],\n' +
          '            description: "Programming language filter",\n' +
          '          },\n' +
          '        },\n' +
          '        required: ["query"],\n' +
          '      },\n' +
          '    },\n' +
          '  },\n' +
          '  {\n' +
          '    type: "function",\n' +
          '    function: {\n' +
          '      name: "execute_code",\n' +
          '      description: "Execute a code snippet and return the output",\n' +
          '      parameters: {\n' +
          '        type: "object",\n' +
          '        properties: {\n' +
          '          code: { type: "string", description: "Code to execute" },\n' +
          '          language: { type: "string", enum: ["javascript", "python"] },\n' +
          '        },\n' +
          '        required: ["code", "language"],\n' +
          '      },\n' +
          '    },\n' +
          '  },\n' +
          '];\n\n' +
          '// Agent loop: Think -> Act -> Observe -> Think\n' +
          'async function agentLoop(userMessage: string) {\n' +
          '  const messages: any[] = [\n' +
          '    {\n' +
          '      role: "system",\n' +
          '      content: "You are a helpful coding assistant. Use tools when needed."\n' +
          '    },\n' +
          '    { role: "user", content: userMessage }\n' +
          '  ];\n\n' +
          '  while (true) {\n' +
          '    const response = await openai.chat.completions.create({\n' +
          '      model: "gpt-4o",\n' +
          '      messages,\n' +
          '      tools,\n' +
          '      tool_choice: "auto",\n' +
          '    });\n\n' +
          '    const message = response.choices[0].message;\n' +
          '    messages.push(message);\n\n' +
          '    // If no tool calls, the agent is done\n' +
          '    if (!message.tool_calls || message.tool_calls.length === 0) {\n' +
          '      return message.content;\n' +
          '    }\n\n' +
          '    // Execute each tool call\n' +
          '    for (const toolCall of message.tool_calls) {\n' +
          '      const args = JSON.parse(toolCall.function.arguments);\n' +
          '      let result: string;\n\n' +
          '      if (toolCall.function.name === "search_documentation") {\n' +
          '        result = await searchDocs(args.query, args.language);\n' +
          '      } else if (toolCall.function.name === "execute_code") {\n' +
          '        result = await executeCode(args.code, args.language);\n' +
          '      } else {\n' +
          '        result = "Unknown tool: " + toolCall.function.name;\n' +
          '      }\n\n' +
          '      messages.push({\n' +
          '        role: "tool",\n' +
          '        tool_call_id: toolCall.id,\n' +
          '        content: result,\n' +
          '      });\n' +
          '    }\n' +
          '  }\n' +
          '}'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'Agent Architecture Patterns\n' +
          '============================\n\n' +
          '1. ReAct (Reasoning + Acting):\n' +
          '   Thought: "I need to find the API rate limits"\n' +
          '   Action:  search_documentation("rate limits REST API")\n' +
          '   Observe: "Rate limits: 100 req/min for free tier..."\n' +
          '   Thought: "Now I have the info, I can answer"\n' +
          '   Answer:  "The API allows 100 requests per minute..."\n\n' +
          '2. Plan-and-Execute:\n' +
          '   Plan:    ["Search docs", "Write code", "Test code", "Review"]\n' +
          '   Execute: Run each step, re-plan if needed\n\n' +
          '3. Multi-Agent (Crew/Swarm):\n' +
          '   Agent 1 (Researcher):  Gathers information\n' +
          '   Agent 2 (Developer):   Writes code based on research\n' +
          '   Agent 3 (Reviewer):    Reviews and suggests improvements\n' +
          '   Orchestrator:          Coordinates agent communication\n\n' +
          '4. Tool-Augmented Generation:\n' +
          '   LLM decides WHEN and WHICH tool to call\n' +
          '   Tools: calculator, web search, code exec, DB query, API calls\n' +
          '   LLM synthesizes tool results into final answer'
        }</code>
      </pre>

      {/* Section 10 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '10. 安全护栏：内容过滤、幻觉检测与输出验证' : '10. Guardrails and Safety: Content Filtering, Hallucination Detection'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '生产级 LLM 应用必须有安全护栏。护栏确保模型输出是安全的、准确的、格式正确的，并且符合业务规则。没有护栏的 LLM 应用就像没有验证的 API——迟早会出问题。'
          : 'Production LLM applications must have guardrails. Guardrails ensure model outputs are safe, accurate, properly formatted, and comply with business rules. An LLM application without guardrails is like an API without validation — it will eventually break.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Guardrails Implementation Pattern\n\n' +
          '// 1. Input Validation — Filter malicious/inappropriate inputs\n' +
          'async function validateInput(userMessage: string): Promise<boolean> {\n' +
          '  // Check message length\n' +
          '  if (userMessage.length > 10000) {\n' +
          '    throw new Error("Message too long");\n' +
          '  }\n\n' +
          '  // Prompt injection detection\n' +
          '  const injectionPatterns = [\n' +
          '    /ignore (all |previous |above )?instructions/i,\n' +
          '    /you are now/i,\n' +
          '    /system prompt/i,\n' +
          '    /reveal your/i,\n' +
          '  ];\n' +
          '  if (injectionPatterns.some(p => p.test(userMessage))) {\n' +
          '    throw new Error("Potential prompt injection detected");\n' +
          '  }\n\n' +
          '  // Content moderation (OpenAI Moderation API)\n' +
          '  const moderation = await openai.moderations.create({\n' +
          '    input: userMessage,\n' +
          '  });\n' +
          '  if (moderation.results[0].flagged) {\n' +
          '    throw new Error("Content flagged: " +\n' +
          '      Object.entries(moderation.results[0].categories)\n' +
          '        .filter(([, v]) => v)\n' +
          '        .map(([k]) => k)\n' +
          '        .join(", ")\n' +
          '    );\n' +
          '  }\n\n' +
          '  return true;\n' +
          '}'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// 2. Output Validation — Ensure correct format and content\n' +
          'import { z } from "zod";\n\n' +
          '// Define expected output schema\n' +
          'const ProductRecommendation = z.object({\n' +
          '  products: z.array(z.object({\n' +
          '    name: z.string(),\n' +
          '    reason: z.string().max(200),\n' +
          '    confidence: z.number().min(0).max(1),\n' +
          '    price_range: z.enum(["budget", "mid-range", "premium"]),\n' +
          '  })).min(1).max(5),\n' +
          '  disclaimer: z.string(),\n' +
          '});\n\n' +
          '// Parse and validate LLM output\n' +
          'function validateOutput(llmOutput: string) {\n' +
          '  try {\n' +
          '    const parsed = JSON.parse(llmOutput);\n' +
          '    const validated = ProductRecommendation.parse(parsed);\n' +
          '    return { success: true, data: validated };\n' +
          '  } catch (error) {\n' +
          '    // Retry with corrective prompt or return fallback\n' +
          '    return { success: false, error: String(error) };\n' +
          '  }\n' +
          '}\n\n' +
          '// 3. Hallucination Detection for RAG\n' +
          'async function checkFaithfulness(\n' +
          '  answer: string,\n' +
          '  sources: string[]\n' +
          '): Promise<{ faithful: boolean; issues: string[] }> {\n' +
          '  const response = await openai.chat.completions.create({\n' +
          '    model: "gpt-4o-mini",\n' +
          '    messages: [\n' +
          '      {\n' +
          '        role: "system",\n' +
          '        content:\n' +
          '          "You are a fact-checker. Compare the answer against the source " +\n' +
          '          "documents. Identify any claims NOT supported by the sources. " +\n' +
          '          "Respond in JSON: {faithful: boolean, issues: string[]}"\n' +
          '      },\n' +
          '      {\n' +
          '        role: "user",\n' +
          '        content: "Sources:\\n" + sources.join("\\n---\\n") +\n' +
          '                 "\\n\\nAnswer:\\n" + answer\n' +
          '      }\n' +
          '    ],\n' +
          '    response_format: { type: "json_object" },\n' +
          '    temperature: 0,\n' +
          '  });\n\n' +
          '  return JSON.parse(response.choices[0].message.content || "{}");\n' +
          '}'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'Production Guardrails Checklist\n' +
          '================================\n\n' +
          'Layer              Check                              Priority\n' +
          '-----              -----                              --------\n' +
          'Input              Message length limit                CRITICAL\n' +
          'Input              Prompt injection detection           CRITICAL\n' +
          'Input              Content moderation (toxicity)        CRITICAL\n' +
          'Input              PII detection and redaction          HIGH\n' +
          'Input              Rate limiting per user               HIGH\n' +
          'Output             JSON schema validation               HIGH\n' +
          'Output             Hallucination / faithfulness check   HIGH\n' +
          'Output             Content safety filter                CRITICAL\n' +
          'Output             Max output length enforcement        MEDIUM\n' +
          'Output             Source citation verification         MEDIUM\n' +
          'System             Cost per request monitoring          HIGH\n' +
          'System             Latency tracking (P50, P95, P99)     HIGH\n' +
          'System             Error rate alerting                  CRITICAL\n' +
          'System             Fallback responses for failures      HIGH\n' +
          'System             Audit logging for compliance         MEDIUM'
        }</code>
      </pre>

      {/* Section 11 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '11. LLM API 成本优化' : '11. Cost Optimization for LLM APIs'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'LLM API 成本是生产级应用的主要运营开支之一。未经优化的 LLM 应用每月可能消耗数千到数万美元。通过智能缓存、模型路由、提示词压缩和批量处理，可以将成本降低 60-80%，同时保持输出质量。'
          : 'LLM API costs are one of the primary operational expenses for production applications. Unoptimized LLM applications can consume thousands to tens of thousands of dollars monthly. Through intelligent caching, model routing, prompt compression, and batch processing, costs can be reduced by 60-80% while maintaining output quality.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// 1. Semantic Caching — Avoid redundant API calls\n' +
          'import { createHash } from "crypto";\n\n' +
          'class SemanticCache {\n' +
          '  private cache: Map<string, { response: string; embedding: number[] }> = new Map();\n' +
          '  private similarityThreshold = 0.95;\n\n' +
          '  async get(query: string): Promise<string | null> {\n' +
          '    const queryEmbedding = await getEmbedding(query);\n\n' +
          '    for (const [, entry] of this.cache) {\n' +
          '      const similarity = cosineSimilarity(queryEmbedding, entry.embedding);\n' +
          '      if (similarity >= this.similarityThreshold) {\n' +
          '        return entry.response; // Cache hit\n' +
          '      }\n' +
          '    }\n' +
          '    return null; // Cache miss\n' +
          '  }\n\n' +
          '  async set(query: string, response: string): Promise<void> {\n' +
          '    const embedding = await getEmbedding(query);\n' +
          '    const key = createHash("sha256").update(query).digest("hex");\n' +
          '    this.cache.set(key, { response, embedding });\n' +
          '  }\n' +
          '}'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// 2. Model Routing — Use the cheapest model that works\n' +
          'async function routeToModel(query: string): Promise<string> {\n' +
          '  // Classify query complexity\n' +
          '  const classification = await openai.chat.completions.create({\n' +
          '    model: "gpt-4o-mini",  // cheap classifier\n' +
          '    messages: [{\n' +
          '      role: "system",\n' +
          '      content:\n' +
          '        "Classify the query complexity as SIMPLE, MEDIUM, or COMPLEX. " +\n' +
          '        "SIMPLE: factual lookup, formatting, translation. " +\n' +
          '        "MEDIUM: summarization, code generation, analysis. " +\n' +
          '        "COMPLEX: multi-step reasoning, creative writing, architecture design. " +\n' +
          '        "Respond with only the classification word."\n' +
          '    }, {\n' +
          '      role: "user", content: query\n' +
          '    }],\n' +
          '    max_tokens: 10,\n' +
          '  });\n\n' +
          '  const complexity = classification.choices[0].message.content?.trim();\n\n' +
          '  const modelMap: Record<string, string> = {\n' +
          '    SIMPLE:  "gpt-4o-mini",     // \\$0.15/1M input\n' +
          '    MEDIUM:  "gpt-4o-mini",     // \\$0.15/1M input\n' +
          '    COMPLEX: "gpt-4o",          // \\$2.50/1M input\n' +
          '  };\n\n' +
          '  const model = modelMap[complexity || "MEDIUM"];\n' +
          '  console.log("Routing " + query.slice(0, 50) + "... to " + model);\n' +
          '  return model;\n' +
          '}'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'LLM Cost Optimization Strategies\n' +
          '==================================\n\n' +
          'Strategy                 Savings     Effort    Impact on Quality\n' +
          '--------                 -------     ------    -----------------\n' +
          'Semantic caching         30-60%      Medium    None (exact/similar)\n' +
          'Model routing            40-70%      Medium    Minimal (smart routing)\n' +
          'Prompt compression       10-30%      Low       Minimal\n' +
          'Batch API (OpenAI)       50%         Low       None\n' +
          'Reduce max_tokens        5-20%       Low       None (if set correctly)\n' +
          'Shorter system prompts   5-15%       Low       Minimal\n' +
          'Streaming (early stop)   10-30%      Medium    Variable\n' +
          'Open-source models       80-100%     High      Depends on model\n\n' +
          'Example Monthly Cost Breakdown (100K queries/month):\n' +
          '  Unoptimized (GPT-4o for everything):  \\$5,000\n' +
          '  + Model routing (80% to mini):         \\$1,200  (-76%)\n' +
          '  + Semantic caching (40% hit rate):      \\$720  (-86%)\n' +
          '  + Prompt compression:                   \\$580  (-88%)\n' +
          '  + Batch API for async tasks:            \\$450  (-91%)'
        }</code>
      </pre>

      {/* Section 12 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '12. 模型对比：GPT-4 vs Claude 3 vs Gemini vs Llama 3' : '12. Model Comparison: GPT-4 vs Claude 3 vs Gemini vs Llama 3'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '选择正确的模型是 AI 工程决策中最关键的一步。不同模型在推理能力、上下文窗口、成本、延迟和特定任务表现方面各有优劣。以下是主流模型的详细对比。'
          : 'Choosing the right model is the most critical decision in AI Engineering. Different models have varying strengths in reasoning capability, context window, cost, latency, and task-specific performance. Below is a detailed comparison of the leading models.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'Model Comparison — Detailed Breakdown (2026)\n' +
          '==============================================\n\n' +
          'Category           GPT-4o           Claude 3.5       Gemini 1.5      Llama 3.1\n' +
          '                                    Sonnet           Pro             405B\n' +
          '--------           ------           -----------      -----------     ----------\n' +
          'Provider           OpenAI           Anthropic        Google          Meta (OSS)\n' +
          'Context Window     128K             200K             1M              128K\n' +
          'Multimodal         Text+Image+      Text+Image+      Text+Image+     Text+Image\n' +
          '                   Audio            PDF              Video+Audio\n' +
          'Coding             Excellent        Best             Very Good       Very Good\n' +
          'Reasoning          Excellent        Excellent        Good            Good\n' +
          'Long Context       Good             Excellent        Best            Good\n' +
          'Safety             Good             Best             Good            Good\n' +
          'Speed (TTFT)       Fast             Fast             Fast            Varies\n' +
          'API Ecosystem      Best             Good             Good            N/A\n' +
          'Fine-tuning        Yes              No (yet)         Yes             Full control\n' +
          'Self-hosting       No               No               No              Yes\n' +
          'Data Privacy       API only         API only         API only        Full control\n\n' +
          'Best For:\n' +
          '  GPT-4o:            General purpose, largest ecosystem, best tooling\n' +
          '  Claude 3.5 Sonnet: Coding, long documents, safety-critical apps\n' +
          '  Gemini 1.5 Pro:    Ultra-long context (books, codebases), multimodal\n' +
          '  Llama 3.1 405B:    Self-hosting, data privacy, customization\n\n' +
          'Budget Models:\n' +
          '  GPT-4o-mini:       Best cheap commercial model\n' +
          '  Claude 3.5 Haiku:  Fast and affordable, good quality\n' +
          '  Gemini 1.5 Flash:  Ultra cheap, very fast\n' +
          '  Llama 3.1 70B:     Best open-source mid-tier, self-hostable'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Multi-Model Strategy: Use the Right Model for Each Task\n' +
          'const MODEL_CONFIG = {\n' +
          '  // High-stakes, complex reasoning\n' +
          '  complex: {\n' +
          '    model: "gpt-4o",\n' +
          '    temperature: 0.3,\n' +
          '    useCases: ["architecture design", "code review", "legal analysis"],\n' +
          '  },\n\n' +
          '  // Long document processing\n' +
          '  longContext: {\n' +
          '    model: "gemini-1.5-pro",\n' +
          '    temperature: 0.2,\n' +
          '    useCases: ["codebase analysis", "book summarization", "log analysis"],\n' +
          '  },\n\n' +
          '  // Code generation and debugging\n' +
          '  coding: {\n' +
          '    model: "claude-3-5-sonnet-20241022",\n' +
          '    temperature: 0,\n' +
          '    useCases: ["code generation", "debugging", "refactoring"],\n' +
          '  },\n\n' +
          '  // Simple tasks, high volume\n' +
          '  simple: {\n' +
          '    model: "gpt-4o-mini",\n' +
          '    temperature: 0.5,\n' +
          '    useCases: ["classification", "extraction", "formatting"],\n' +
          '  },\n\n' +
          '  // Privacy-sensitive, self-hosted\n' +
          '  private: {\n' +
          '    model: "meta-llama/Llama-3.1-70B-Instruct",\n' +
          '    temperature: 0.3,\n' +
          '    useCases: ["medical records", "financial data", "internal tools"],\n' +
          '  },\n' +
          '};'
        }</code>
      </pre>

      {/* Section 13 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '13. LLM 应用的评估与测试' : '13. Evaluation and Testing LLM Applications'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '评估和测试是 AI 工程中最容易被忽视但最重要的环节。LLM 输出的非确定性使传统测试方法不完全适用。你需要一套专门的评估框架来衡量模型输出的质量、准确性和安全性，并在迭代中持续改进。'
          : 'Evaluation and testing is the most overlooked yet most important aspect of AI Engineering. The non-deterministic nature of LLM outputs makes traditional testing methods only partially applicable. You need a specialized evaluation framework to measure output quality, accuracy, and safety, continuously improving through iterations.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// LLM Evaluation Framework\n\n' +
          '// 1. LLM-as-Judge — Use a strong model to evaluate outputs\n' +
          'async function llmJudge(\n' +
          '  question: string,\n' +
          '  answer: string,\n' +
          '  criteria: string\n' +
          '): Promise<{ score: number; reasoning: string }> {\n' +
          '  const response = await openai.chat.completions.create({\n' +
          '    model: "gpt-4o",\n' +
          '    messages: [{\n' +
          '      role: "system",\n' +
          '      content:\n' +
          '        "You are an expert evaluator. Score the answer on a scale of " +\n' +
          '        "1-5 based on the given criteria. " +\n' +
          '        "Respond in JSON: {score: number, reasoning: string}"\n' +
          '    }, {\n' +
          '      role: "user",\n' +
          '      content: "Question: " + question + "\\n" +\n' +
          '               "Answer: " + answer + "\\n" +\n' +
          '               "Criteria: " + criteria\n' +
          '    }],\n' +
          '    response_format: { type: "json_object" },\n' +
          '    temperature: 0,\n' +
          '  });\n\n' +
          '  return JSON.parse(response.choices[0].message.content || "{}");\n' +
          '}\n\n' +
          '// Usage:\n' +
          '// await llmJudge(\n' +
          '//   "What is Kubernetes?",\n' +
          '//   generatedAnswer,\n' +
          '//   "Accuracy, completeness, clarity, and conciseness"\n' +
          '// );'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// 2. RAG Evaluation Metrics\n' +
          '// Using Ragas framework concepts\n\n' +
          'interface RAGEvalResult {\n' +
          '  faithfulness: number;      // Is the answer grounded in sources?\n' +
          '  answerRelevancy: number;   // Does it actually answer the question?\n' +
          '  contextPrecision: number;  // Are retrieved docs relevant?\n' +
          '  contextRecall: number;     // Did we retrieve all relevant docs?\n' +
          '}\n\n' +
          'async function evaluateRAG(\n' +
          '  question: string,\n' +
          '  answer: string,\n' +
          '  contexts: string[],\n' +
          '  groundTruth: string\n' +
          '): Promise<RAGEvalResult> {\n' +
          '  // Faithfulness: does the answer use only info from contexts?\n' +
          '  const faithfulness = await llmJudge(\n' +
          '    question,\n' +
          '    answer,\n' +
          '    "Score 1-5: Is every claim in the answer supported by the " +\n' +
          '    "provided context? Penalize any unsupported claims heavily."\n' +
          '  );\n\n' +
          '  // Answer relevancy: does it address the question?\n' +
          '  const relevancy = await llmJudge(\n' +
          '    question,\n' +
          '    answer,\n' +
          '    "Score 1-5: Does the answer directly address the question? " +\n' +
          '    "Penalize off-topic content and missing key points."\n' +
          '  );\n\n' +
          '  return {\n' +
          '    faithfulness: faithfulness.score / 5,\n' +
          '    answerRelevancy: relevancy.score / 5,\n' +
          '    contextPrecision: 0, // computed via retrieval metrics\n' +
          '    contextRecall: 0,    // computed against ground truth\n' +
          '  };\n' +
          '}'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'LLM Testing Strategy\n' +
          '=====================\n\n' +
          'Test Type           What It Tests              Tools\n' +
          '---------           -------------              -----\n' +
          'Unit Tests          Prompt template outputs    pytest, vitest\n' +
          'Integration Tests   Full RAG pipeline          Ragas, DeepEval\n' +
          'Regression Tests    Output consistency         Golden datasets\n' +
          'A/B Tests           Model/prompt comparison    LangSmith, Braintrust\n' +
          'Red Team Tests      Safety, edge cases         Garak, manual\n' +
          'Load Tests          Latency under load         k6, Locust\n' +
          'Cost Tests          Budget compliance          Custom monitoring\n\n' +
          'Evaluation Tools:\n' +
          '  Ragas         - Open-source RAG evaluation framework\n' +
          '  DeepEval      - LLM evaluation with multiple metrics\n' +
          '  LangSmith     - Tracing, debugging, evaluation (LangChain)\n' +
          '  Phoenix       - LLM observability (Arize AI)\n' +
          '  Braintrust    - LLM evaluation and monitoring platform\n' +
          '  Promptfoo     - Open-source prompt testing CLI\n\n' +
          'Golden Rule: Never deploy without:\n' +
          '  1. A golden evaluation dataset (50-200 examples)\n' +
          '  2. Automated regression tests in CI\n' +
          '  3. Production monitoring (latency, cost, errors)\n' +
          '  4. Human review for high-stakes outputs'
        }</code>
      </pre>

      {/* Section 14: FAQ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '常见问题解答' : 'Frequently Asked Questions'}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqData.map((item, index) => (
          <div
            key={index}
            style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem' }}
          >
            <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.05rem', fontWeight: 600, color: '#1e293b' }}>
              {item.question}
            </h3>
            <p style={{ margin: 0, color: '#475569', lineHeight: '1.65' }}>
              {item.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Summary Table */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? 'AI 工程核心概念速查表' : 'AI Engineering Core Concepts Quick Reference'}
      </h2>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'AI Engineering — Quick Reference\n' +
          '=================================\n\n' +
          'Concept                       Description\n' +
          '-------                       -----------\n' +
          'Prompt Engineering            Designing inputs to get desired LLM outputs\n' +
          'System Prompt                 Instructions that set model role and constraints\n' +
          'Few-Shot Learning             Providing examples in the prompt for guidance\n' +
          'Chain-of-Thought (CoT)        Asking the model to reason step-by-step\n' +
          'RAG                           Retrieve relevant docs, then generate answers\n' +
          'Vector Database               Storage optimized for similarity search\n' +
          'Embedding                     Dense vector representation of text meaning\n' +
          'Chunking                      Splitting documents into smaller pieces\n' +
          'Fine-Tuning                   Training a model further on custom data\n' +
          'Function Calling              LLM deciding when and how to call tools\n' +
          'AI Agent                      LLM that can plan, use tools, and iterate\n' +
          'ReAct Pattern                 Think -> Act -> Observe -> Think loop\n' +
          'Guardrails                    Input/output validation and safety filters\n' +
          'Hallucination                 Model generating false or unsupported info\n' +
          'Semantic Caching              Cache responses for semantically similar queries\n' +
          'Model Routing                 Directing queries to the best-fit model\n' +
          'LLM-as-Judge                  Using a strong LLM to evaluate outputs\n' +
          'LCEL (LangChain)              LangChain Expression Language for chains\n' +
          'Temperature                   Controls randomness (0=deterministic, 1=creative)\n' +
          'Token                         Basic unit of text processed by LLMs\n' +
          'Context Window                Maximum tokens a model can process at once\n' +
          'Structured Output             Constraining LLM output to JSON/schema\n' +
          'Batch API                     Processing multiple requests at reduced cost\n' +
          'Multimodal                    Models that process text, image, audio, video'
        }</code>
      </pre>
    </article>
  );
}
