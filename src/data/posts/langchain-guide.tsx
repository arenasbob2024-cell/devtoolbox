'use client';
import React from 'react';

const translations = {
  en: {
    title: 'LangChain Complete Guide 2026: Build AI Applications with LLMs — Chains, Agents, RAG & Production Tips',
    description:
      'Master LangChain from basics to production: ecosystem (LangSmith, LangGraph, LangServe), core concepts (models, prompts, chains, agents, memory, retrieval), RAG pipelines, ReAct agents, custom tools, LangGraph state machines, LangSmith tracing, deployment with FastAPI, and comparison with LlamaIndex and Haystack.',
  },
  zh: {
    title: 'LangChain 完全指南 2026：用 LLM 构建 AI 应用 — 链、Agent、RAG 与生产实践',
    description:
      '从基础到生产环境全面掌握 LangChain：生态系统（LangSmith、LangGraph、LangServe）、核心概念（模型、提示词、链、Agent、记忆、检索）、RAG 管道、ReAct Agent、自定义工具、LangGraph 状态机、LangSmith 追踪、FastAPI 部署，以及与 LlamaIndex 和 Haystack 的对比。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is LangChain and what is it used for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LangChain is an open-source framework for building applications powered by large language models (LLMs). It provides composable abstractions for prompt management, chain orchestration, retrieval-augmented generation (RAG), agents with tool use, and memory. LangChain supports Python and JavaScript and integrates with 100+ LLM providers, vector stores, and external tools.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I install LangChain in Python?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Install LangChain with pip: pip install langchain langchain-openai langchain-community. For specific integrations, install additional packages like langchain-anthropic for Claude, langchain-google-genai for Gemini, or langchain-chroma for ChromaDB vector store. LangChain uses a modular package structure where each integration is a separate package.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between LangChain, LangSmith, LangGraph, and LangServe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LangChain is the core framework for building LLM applications with chains and agents. LangSmith is a platform for tracing, evaluating, monitoring, and debugging LLM applications. LangGraph extends LangChain for building stateful, multi-actor applications with graph-based workflows and cycles. LangServe deploys LangChain runnables as production REST APIs using FastAPI.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is RAG (Retrieval-Augmented Generation) in LangChain?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RAG in LangChain is a pipeline that combines document retrieval with LLM generation. The pipeline consists of: document loading (PDF, web pages, databases), text splitting (RecursiveCharacterTextSplitter), embedding generation (OpenAI, HuggingFace), vector storage (Chroma, Pinecone, FAISS), retrieval (similarity search), and LLM generation with retrieved context. This enables LLMs to answer questions about your private data.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do LangChain agents work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LangChain agents use LLMs as reasoning engines to decide which tools to call and in what order. The agent receives a query, reasons about which tool to use (following patterns like ReAct), executes the tool, observes the result, and iterates until it has a final answer. You can create custom tools with the @tool decorator and use built-in tools for web search, code execution, APIs, and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'What memory types does LangChain support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LangChain supports several memory types: ConversationBufferMemory (stores full conversation history), ConversationBufferWindowMemory (keeps last K exchanges), ConversationSummaryMemory (LLM-generated summary of conversation), ConversationTokenBufferMemory (truncates by token count), and VectorStoreMemory (stores memories in a vector database for semantic retrieval). Choose based on your context window and cost constraints.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is LangGraph and when should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LangGraph is a library for building stateful, multi-step AI workflows as graphs. Use it when you need cycles (agent loops), branching logic, human-in-the-loop patterns, persistent state across steps, or multi-agent collaboration. It extends LangChain with StateGraph for defining nodes (functions) and edges (transitions), with built-in support for checkpointing and streaming.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does LangChain compare to LlamaIndex and Haystack?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LangChain is a general-purpose framework best for diverse LLM applications, agents, and complex chains. LlamaIndex specializes in data indexing and RAG, offering superior document handling and query engines for knowledge-intensive applications. Haystack focuses on production NLP pipelines with strong enterprise features. Choose LangChain for flexibility, LlamaIndex for RAG-heavy workloads, or Haystack for production NLP systems.',
      },
    },
  ],
};

export default function LangchainGuide({ lang }: { lang: string }) {
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

  const ulStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
    paddingLeft: '24px',
  };

  const tldrBoxStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '16px 20px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: '#0c4a6e',
  };

  const keyTakeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '20px 24px',
    borderRadius: '8px',
    marginBottom: '24px',
  };

  const strongLabelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#0f172a',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '24px',
    fontSize: '0.9rem',
  };

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '10px 14px',
    background: '#f1f5f9',
    borderBottom: '2px solid #e2e8f0',
    fontWeight: '600',
    color: '#1e293b',
  };

  const tdStyle: React.CSSProperties = {
    padding: '10px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
  };

  return (
    <article style={{ maxWidth: '100%' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR */}
      <div style={tldrBoxStyle}>
        <strong style={strongLabelStyle}>TL;DR</strong>
        {isZh
          ? 'LangChain 是构建 LLM 应用的主流开源框架，提供模型抽象、提示词模板、链式编排、RAG 检索增强生成、Agent 工具调用和对话记忆等核心能力。配合 LangSmith（追踪调试）、LangGraph（复杂工作流）和 LangServe（API 部署），可覆盖从原型到生产的完整 AI 应用开发周期。'
          : 'LangChain is the leading open-source framework for building LLM-powered applications. It provides model abstractions, prompt templates, chain orchestration, RAG (retrieval-augmented generation), agent tool calling, and conversation memory. Combined with LangSmith (tracing/debugging), LangGraph (complex workflows), and LangServe (API deployment), it covers the full lifecycle from prototype to production.'}
      </div>

      {/* Key Takeaways */}
      <div style={keyTakeawaysStyle}>
        <strong style={strongLabelStyle}>{isZh ? '核心要点' : 'Key Takeaways'}</strong>
        <ul style={{ ...ulStyle, marginBottom: 0 }}>
          <li>{isZh ? 'LangChain 生态包含四大组件：LangChain（核心）、LangSmith（可观测）、LangGraph（状态图）、LangServe（部署）' : 'The LangChain ecosystem has four pillars: LangChain (core), LangSmith (observability), LangGraph (stateful graphs), LangServe (deployment)'}</li>
          <li>{isZh ? 'LCEL（LangChain 表达式语言）用管道符 | 组合 Runnable，支持流式、批处理和异步' : 'LCEL (LangChain Expression Language) composes Runnables with the | pipe operator, supporting streaming, batching, and async'}</li>
          <li>{isZh ? 'RAG 管道五步：加载文档 → 拆分 → 嵌入 → 向量存储 → 检索生成' : 'RAG pipeline in five steps: load documents, split, embed, store in vector DB, retrieve and generate'}</li>
          <li>{isZh ? 'Agent 使用 ReAct 模式让 LLM 推理选择工具，支持自定义工具和多步推理' : 'Agents use the ReAct pattern for LLM-driven tool selection, supporting custom tools and multi-step reasoning'}</li>
          <li>{isZh ? 'LangGraph 处理需要循环、分支、人工干预的复杂工作流' : 'LangGraph handles complex workflows requiring cycles, branching, and human-in-the-loop patterns'}</li>
          <li>{isZh ? 'LangSmith 提供全链路追踪，是生产调试的必备工具' : 'LangSmith provides full-stack tracing and is essential for production debugging'}</li>
        </ul>
      </div>

      {/* 1. What is LangChain */}
      <h2 style={h2Style}>{isZh ? '什么是 LangChain？' : 'What Is LangChain?'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'LangChain 是一个开源框架，用于构建由大语言模型（LLM）驱动的应用。它将 LLM 调用、提示词管理、外部数据检索、工具使用和对话记忆等能力抽象为可组合的模块，让开发者专注于应用逻辑而非底层对接。LangChain 支持 Python 和 JavaScript，集成了 100+ 个 LLM 提供商和工具。'
          : 'LangChain is an open-source framework for building applications powered by large language models (LLMs). It abstracts LLM calls, prompt management, external data retrieval, tool use, and conversation memory into composable modules so developers can focus on application logic instead of low-level integrations. LangChain supports Python and JavaScript, integrating with 100+ LLM providers and tools.'}
      </p>

      {/* Ecosystem */}
      <h3 style={h3Style}>{isZh ? 'LangChain 生态系统' : 'The LangChain Ecosystem'}</h3>
      <pre style={preStyle}><code>{`# LangChain Ecosystem Architecture
#
# +-------------------+     +-------------------+
# |    LangChain      |     |    LangGraph      |
# |  (Core Framework) |     | (Stateful Graphs) |
# |  Models, Prompts, |     | Cycles, Branching |
# |  Chains, Agents,  |<--->| Multi-Agent,      |
# |  Memory, RAG      |     | Human-in-the-Loop |
# +-------------------+     +-------------------+
#          |                          |
#          v                          v
# +-------------------+     +-------------------+
# |    LangSmith      |     |    LangServe      |
# |  (Observability)  |     |   (Deployment)    |
# |  Tracing, Evals,  |     |  FastAPI, REST,   |
# |  Monitoring, Debug|     |  Playground, Docs |
# +-------------------+     +-------------------+`}</code></pre>

      {/* 2. Installation */}
      <h2 style={h2Style}>{isZh ? '安装与配置' : 'Installation & Setup'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'LangChain 采用模块化包结构，核心包与各集成包分离安装。'
          : 'LangChain uses a modular package structure with the core package and integrations installed separately.'}
      </p>
      <pre style={preStyle}><code>{`# Core installation
pip install langchain langchain-core

# LLM provider integrations
pip install langchain-openai        # ChatGPT / GPT-4
pip install langchain-anthropic     # Claude
pip install langchain-google-genai  # Gemini
pip install langchain-community     # 100+ community integrations

# Vector stores & embeddings
pip install langchain-chroma        # ChromaDB
pip install langchain-pinecone      # Pinecone
pip install faiss-cpu               # FAISS (CPU)

# Additional ecosystem tools
pip install langgraph               # Stateful workflows
pip install langserve               # API deployment
pip install langsmith               # Tracing & evaluation

# Environment variables
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."
export LANGCHAIN_TRACING_V2="true"
export LANGCHAIN_API_KEY="ls__..."   # LangSmith`}</code></pre>

      {/* 3. Core Concepts */}
      <h2 style={h2Style}>{isZh ? '核心概念' : 'Core Concepts'}</h2>

      <h3 style={h3Style}>{isZh ? '聊天模型（Chat Models）' : 'Chat Models'}</h3>
      <p style={pStyle}>
        {isZh
          ? '聊天模型是 LangChain 的基础组件，提供统一接口调用 OpenAI、Anthropic、Ollama 等各种 LLM。所有模型实现相同的 BaseChatModel 接口，支持流式输出、异步调用和结构化输出。'
          : 'Chat models are the foundation of LangChain, providing a unified interface to call OpenAI, Anthropic, Ollama, and other LLMs. All models implement the same BaseChatModel interface with support for streaming, async calls, and structured output.'}
      </p>
      <pre style={preStyle}><code>{`from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from langchain_community.chat_models import ChatOllama
from langchain_core.messages import HumanMessage, SystemMessage

# OpenAI GPT-4o
llm_openai = ChatOpenAI(model="gpt-4o", temperature=0.7)

# Anthropic Claude
llm_claude = ChatAnthropic(model="claude-sonnet-4-20250514", temperature=0)

# Local model via Ollama
llm_local = ChatOllama(model="llama3.1:8b")

# All models share the same interface
messages = [
    SystemMessage(content="You are a helpful coding assistant."),
    HumanMessage(content="Write a Python function to merge two sorted lists."),
]
response = llm_openai.invoke(messages)
print(response.content)

# Streaming output
for chunk in llm_openai.stream(messages):
    print(chunk.content, end="", flush=True)`}</code></pre>

      <h3 style={h3Style}>{isZh ? '提示词模板与输出解析' : 'Prompt Templates & Output Parsers'}</h3>
      <p style={pStyle}>
        {isZh
          ? '提示词模板将可复用的提示词参数化，输出解析器将 LLM 文本输出转为结构化数据。两者配合 LCEL 管道使用，构成类型安全的 LLM 调用链。'
          : 'Prompt templates parameterize reusable prompts, while output parsers convert LLM text responses into structured data. Together with LCEL pipelines, they form type-safe LLM call chains.'}
      </p>
      <pre style={preStyle}><code>{`from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from pydantic import BaseModel, Field

# Simple prompt template
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a {role} expert."),
    ("human", "{question}"),
])

# String output parser (most common)
chain = prompt | llm_openai | StrOutputParser()
result = chain.invoke({"role": "Python", "question": "Explain decorators"})

# Structured output with Pydantic
class CodeReview(BaseModel):
    issues: list[str] = Field(description="List of code issues found")
    score: int = Field(description="Code quality score 1-10")
    suggestion: str = Field(description="Main improvement suggestion")

structured_llm = llm_openai.with_structured_output(CodeReview)
review = structured_llm.invoke("Review this code: def f(x): return x+1")
print(review.score, review.issues)`}</code></pre>

      <h3 style={h3Style}>{isZh ? 'LCEL — LangChain 表达式语言' : 'LCEL — LangChain Expression Language'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'LCEL 是 LangChain 的声明式组合语言，用管道符 | 将 Runnable 组件串联成链。每个组件实现 invoke、stream、batch、ainvoke 等方法。LCEL 链自动支持流式输出、并发批处理和 LangSmith 追踪。'
          : 'LCEL is LangChain\'s declarative composition language that chains Runnable components with the | pipe operator. Every component implements invoke, stream, batch, and ainvoke methods. LCEL chains automatically support streaming, concurrent batching, and LangSmith tracing.'}
      </p>
      <pre style={preStyle}><code>{`from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableParallel

# Basic LCEL chain: prompt | model | parser
chain = (
    ChatPromptTemplate.from_template("Summarize this text: {text}")
    | llm_openai
    | StrOutputParser()
)

# Invoke, stream, or batch
result = chain.invoke({"text": "LangChain is a framework..."})
for chunk in chain.stream({"text": "LangChain is a framework..."}):
    print(chunk, end="")
results = chain.batch([{"text": t} for t in texts])  # parallel

# Parallel branches with RunnableParallel
analysis = RunnableParallel(
    summary=ChatPromptTemplate.from_template("Summarize: {text}") | llm_openai | StrOutputParser(),
    sentiment=ChatPromptTemplate.from_template("Sentiment of: {text}") | llm_openai | StrOutputParser(),
    keywords=ChatPromptTemplate.from_template("Keywords from: {text}") | llm_openai | StrOutputParser(),
)
output = analysis.invoke({"text": "Great product, fast shipping!"})`}</code></pre>

      {/* 4. RAG Pipeline */}
      <h2 style={h2Style}>{isZh ? 'RAG 检索增强生成' : 'RAG — Retrieval-Augmented Generation'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'RAG 让 LLM 基于你的私有数据回答问题。管道分为索引阶段（离线）和查询阶段（在线），涵盖文档加载、拆分、嵌入、存储和检索生成五个步骤。'
          : 'RAG enables LLMs to answer questions based on your private data. The pipeline has an indexing phase (offline) and a query phase (online), covering five steps: load, split, embed, store, and retrieve-then-generate.'}
      </p>
      <pre style={preStyle}><code>{`# RAG Pipeline Architecture
#
# INDEXING (offline):
#   Documents --> Loader --> Splitter --> Embeddings --> Vector Store
#   (PDF/Web/DB)  (chunks)  (RecursiveChar) (OpenAI)    (Chroma/FAISS)
#
# QUERYING (online):
#   User Query --> Embedding --> Similarity Search --> Context + Query --> LLM --> Answer
#                                (top-k chunks)       (prompt template)

from langchain_community.document_loaders import (
    PyPDFLoader, WebBaseLoader, TextLoader
)
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# Step 1: Load documents
loader = PyPDFLoader("company_handbook.pdf")
docs = loader.load()  # List[Document]

# Step 2: Split into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\\n\\n", "\\n", ". ", " ", ""],
)
chunks = splitter.split_documents(docs)

# Step 3-4: Embed and store
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vectorstore = Chroma.from_documents(chunks, embeddings, persist_directory="./db")
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# Step 5: Retrieve and generate
rag_prompt = ChatPromptTemplate.from_template(
    """Answer based on the following context only.
Context: {context}
Question: {question}
Answer:"""
)

def format_docs(docs):
    return "\\n\\n".join(doc.page_content for doc in docs)

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | rag_prompt
    | llm_openai
    | StrOutputParser()
)

answer = rag_chain.invoke("What is the vacation policy?")`}</code></pre>

      {/* 5. Agents & Tools */}
      <h2 style={h2Style}>{isZh ? 'Agent 与工具' : 'Agents & Tools'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Agent 让 LLM 成为推理引擎，自主决定调用哪些工具、以什么顺序执行。LangChain 使用 ReAct（Reasoning + Acting）模式：LLM 思考 → 选择工具 → 执行 → 观察结果 → 继续推理，直到得出最终答案。'
          : 'Agents turn LLMs into reasoning engines that autonomously decide which tools to call and in what order. LangChain uses the ReAct (Reasoning + Acting) pattern: the LLM thinks, selects a tool, executes it, observes the result, and continues reasoning until it reaches a final answer.'}
      </p>
      <pre style={preStyle}><code>{`from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent

# Define custom tools with the @tool decorator
@tool
def search_web(query: str) -> str:
    """Search the web for current information."""
    # Replace with actual search API (Tavily, SerpAPI, etc.)
    return f"Search results for: {query}"

@tool
def calculate(expression: str) -> str:
    """Evaluate a math expression. Input should be a valid Python expression."""
    try:
        return str(eval(expression))
    except Exception as e:
        return f"Error: {e}"

@tool
def get_weather(city: str) -> str:
    """Get current weather for a city."""
    # Replace with actual weather API
    return f"Weather in {city}: 22C, sunny"

# Create a ReAct agent
llm = ChatOpenAI(model="gpt-4o", temperature=0)
tools = [search_web, calculate, get_weather]
agent = create_react_agent(llm, tools)

# Run the agent
result = agent.invoke(
    {"messages": [("human", "What is the weather in Tokyo and convert 72F to Celsius?")]}
)
print(result["messages"][-1].content)

# Agent reasoning flow (ReAct pattern):
# Thought: I need to get Tokyo weather and convert 72F to C
# Action: get_weather("Tokyo")
# Observation: Weather in Tokyo: 22C, sunny
# Thought: Now convert 72F to Celsius: (72 - 32) * 5/9
# Action: calculate("(72 - 32) * 5 / 9")
# Observation: 22.22
# Final Answer: Tokyo is 22C and sunny. 72F = 22.22C`}</code></pre>

      {/* 6. Memory */}
      <h2 style={h2Style}>{isZh ? '对话记忆' : 'Conversation Memory'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'LangChain 提供多种记忆类型来维持对话上下文。选择取决于上下文窗口限制、成本和语义检索需求。在 LCEL 和 LangGraph 中，推荐使用消息历史管理而非传统 Memory 类。'
          : 'LangChain provides multiple memory types to maintain conversation context. The choice depends on context window limits, cost, and semantic retrieval needs. In LCEL and LangGraph, message history management is preferred over legacy Memory classes.'}
      </p>
      <pre style={preStyle}><code>{`from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

# Modern approach: RunnableWithMessageHistory
store = {}  # session_id -> ChatMessageHistory

def get_session_history(session_id: str):
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]

chain_with_history = RunnableWithMessageHistory(
    chain,  # your LCEL chain
    get_session_history,
    input_messages_key="question",
    history_messages_key="history",
)

# Each session maintains its own conversation history
config = {"configurable": {"session_id": "user-123"}}
chain_with_history.invoke({"question": "My name is Alice"}, config=config)
chain_with_history.invoke({"question": "What is my name?"}, config=config)
# -> "Your name is Alice"

# Memory types comparison:
# | Type                         | Strategy            | Best For            |
# |------------------------------|---------------------|---------------------|
# | ConversationBufferMemory     | Store everything    | Short conversations |
# | ConversationWindowMemory     | Keep last K turns   | Cost-sensitive apps |
# | ConversationSummaryMemory    | LLM summarizes      | Long conversations  |
# | ConversationTokenBufferMemory| Truncate by tokens  | Fixed-budget calls  |
# | VectorStoreMemory            | Semantic retrieval  | Large knowledge base|`}</code></pre>

      {/* 7. LangGraph */}
      <h2 style={h2Style}>{isZh ? 'LangGraph：复杂工作流与状态机' : 'LangGraph: Complex Workflows & State Machines'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'LangGraph 将 AI 工作流建模为有状态的图。节点是函数，边是转换条件。它支持循环（agent 迭代）、条件分支、持久化检查点和人工干预，适合构建多步骤、多角色的复杂 AI 应用。'
          : 'LangGraph models AI workflows as stateful graphs. Nodes are functions, edges are transition conditions. It supports cycles (agent loops), conditional branching, persistent checkpoints, and human-in-the-loop, making it ideal for multi-step, multi-actor AI applications.'}
      </p>
      <pre style={preStyle}><code>{`from langgraph.graph import StateGraph, START, END
from typing import TypedDict, Annotated
from langgraph.graph.message import add_messages

# Define the state schema
class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    next_step: str

# Define node functions
def classifier(state: AgentState) -> AgentState:
    """Classify the user query into a category."""
    last_msg = state["messages"][-1].content
    # LLM classifies the query
    category = llm.invoke(f"Classify this query: {last_msg}")
    return {"next_step": category.content}

def handle_technical(state: AgentState) -> AgentState:
    response = llm.invoke(state["messages"] + [("system", "You are a tech expert.")])
    return {"messages": [response]}

def handle_general(state: AgentState) -> AgentState:
    response = llm.invoke(state["messages"] + [("system", "You are a helpful assistant.")])
    return {"messages": [response]}

def route(state: AgentState) -> str:
    if "technical" in state["next_step"].lower():
        return "technical"
    return "general"

# Build the graph
graph = StateGraph(AgentState)
graph.add_node("classifier", classifier)
graph.add_node("technical", handle_technical)
graph.add_node("general", handle_general)

graph.add_edge(START, "classifier")
graph.add_conditional_edges("classifier", route, {
    "technical": "technical",
    "general": "general",
})
graph.add_edge("technical", END)
graph.add_edge("general", END)

# Compile and run
app = graph.compile()
result = app.invoke({"messages": [("human", "How do I fix a segfault in C?")]})`}</code></pre>

      {/* 8. LangSmith */}
      <h2 style={h2Style}>{isZh ? 'LangSmith：追踪、评估与调试' : 'LangSmith: Tracing, Evaluation & Debugging'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'LangSmith 是 LangChain 的配套可观测性平台，提供全链路追踪、自动化评估、数据集管理和提示词版本控制。开启追踪只需设置环境变量，所有 LangChain 调用自动上报。'
          : 'LangSmith is LangChain\'s companion observability platform providing end-to-end tracing, automated evaluation, dataset management, and prompt versioning. Enable tracing by setting environment variables and all LangChain calls are reported automatically.'}
      </p>
      <pre style={preStyle}><code>{`# Enable LangSmith tracing (set in environment)
# export LANGCHAIN_TRACING_V2="true"
# export LANGCHAIN_API_KEY="ls__..."
# export LANGCHAIN_PROJECT="my-project"

# All LangChain calls are now traced automatically!
# View traces at https://smith.langchain.com

# Programmatic evaluation with LangSmith
from langsmith import Client
from langsmith.evaluation import evaluate

client = Client()

# Create a dataset for evaluation
dataset = client.create_dataset("qa-test")
client.create_examples(
    inputs=[
        {"question": "What is LangChain?"},
        {"question": "How does RAG work?"},
    ],
    outputs=[
        {"answer": "LangChain is an LLM framework"},
        {"answer": "RAG combines retrieval with generation"},
    ],
    dataset_id=dataset.id,
)

# Define your target function and evaluator
def predict(inputs: dict) -> dict:
    return {"answer": chain.invoke(inputs["question"])}

# Run evaluation
results = evaluate(
    predict,
    data="qa-test",
    evaluators=["qa"],  # built-in QA correctness evaluator
    experiment_prefix="v1",
)`}</code></pre>

      {/* 9. Deployment with LangServe */}
      <h2 style={h2Style}>{isZh ? '部署：LangServe + FastAPI' : 'Deployment: LangServe + FastAPI'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'LangServe 将 LangChain Runnable 部署为 REST API，自动生成 OpenAPI 文档、交互式 Playground，并支持流式响应。底层基于 FastAPI，可与现有 Python Web 基础设施无缝集成。'
          : 'LangServe deploys LangChain Runnables as REST APIs with auto-generated OpenAPI docs, an interactive Playground, and streaming support. Built on FastAPI, it integrates seamlessly with existing Python web infrastructure.'}
      </p>
      <pre style={preStyle}><code>{`# server.py — Deploy a chain as an API
from fastapi import FastAPI
from langserve import add_routes
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

app = FastAPI(title="My LLM API", version="1.0")

# Define your chain
chain = (
    ChatPromptTemplate.from_template("Translate to {language}: {text}")
    | ChatOpenAI(model="gpt-4o-mini")
    | StrOutputParser()
)

# Add routes (creates /translate/invoke, /translate/stream, etc.)
add_routes(app, chain, path="/translate")

# Run: uvicorn server:app --host 0.0.0.0 --port 8000
# Playground: http://localhost:8000/translate/playground
# Docs: http://localhost:8000/docs

# --- Client-side usage ---
from langserve import RemoteRunnable

remote_chain = RemoteRunnable("http://localhost:8000/translate")
result = remote_chain.invoke({"language": "French", "text": "Hello world"})

# Streaming from client
for chunk in remote_chain.stream({"language": "Spanish", "text": "Good morning"}):
    print(chunk, end="")`}</code></pre>

      {/* 10. Advanced RAG Techniques */}
      <h2 style={h2Style}>{isZh ? '高级 RAG 技巧' : 'Advanced RAG Techniques'}</h2>
      <p style={pStyle}>
        {isZh
          ? '基础 RAG 管道在简单场景下效果不错，但生产环境需要更精细的技术来提高检索质量和答案准确性。以下是五种关键优化策略。'
          : 'A basic RAG pipeline works for simple use cases, but production environments need more refined techniques to improve retrieval quality and answer accuracy. Here are five key optimization strategies.'}
      </p>

      <h3 style={h3Style}>{isZh ? '多查询检索器（MultiQuery Retriever）' : 'Multi-Query Retriever'}</h3>
      <p style={pStyle}>
        {isZh
          ? '用 LLM 将用户问题改写为多个不同角度的查询，合并检索结果以提高召回率。'
          : 'Use an LLM to rewrite the user question from multiple angles, then merge retrieval results to improve recall.'}
      </p>
      <pre style={preStyle}><code>{`from langchain.retrievers.multi_query import MultiQueryRetriever

# Generates 3 variations of the query for broader retrieval
multi_retriever = MultiQueryRetriever.from_llm(
    retriever=vectorstore.as_retriever(),
    llm=ChatOpenAI(model="gpt-4o-mini", temperature=0.3),
)
# "What is the refund policy?" generates:
#   - "How do I get a refund?"
#   - "What are the return and refund rules?"
#   - "Refund process and eligibility requirements"
docs = multi_retriever.invoke("What is the refund policy?")`}</code></pre>

      <h3 style={h3Style}>{isZh ? '上下文压缩与重排序' : 'Contextual Compression & Re-ranking'}</h3>
      <p style={pStyle}>
        {isZh
          ? '检索后对文档进行压缩和重排序，只保留与查询最相关的段落，减少噪音传入 LLM。'
          : 'After retrieval, compress and re-rank documents to keep only the most relevant passages, reducing noise sent to the LLM.'}
      </p>
      <pre style={preStyle}><code>{`from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
from langchain_community.document_compressors import CohereRerank

# Option 1: LLM-based extraction (keeps only relevant sentences)
compressor = LLMChainExtractor.from_llm(llm)
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=vectorstore.as_retriever(search_kwargs={"k": 10}),
)

# Option 2: Cohere Re-rank (fast, production-grade)
reranker = CohereRerank(model="rerank-v3.5", top_n=4)
rerank_retriever = ContextualCompressionRetriever(
    base_compressor=reranker,
    base_retriever=vectorstore.as_retriever(search_kwargs={"k": 20}),
)`}</code></pre>

      <h3 style={h3Style}>{isZh ? '父文档检索器与混合搜索' : 'Parent Document Retriever & Hybrid Search'}</h3>
      <p style={pStyle}>
        {isZh
          ? '父文档检索器用小块索引、大块返回，解决分块过小丢失上下文的问题。混合搜索结合向量相似性和关键词 BM25 检索，同时捕获语义和精确匹配。'
          : 'The parent document retriever indexes small chunks but returns larger parent chunks, solving the context loss problem. Hybrid search combines vector similarity with BM25 keyword retrieval to capture both semantic and exact matches.'}
      </p>
      <pre style={preStyle}><code>{`from langchain.retrievers import ParentDocumentRetriever
from langchain.storage import InMemoryStore
from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever

# Parent Document Retriever: index small, return big
child_splitter = RecursiveCharacterTextSplitter(chunk_size=200)
parent_splitter = RecursiveCharacterTextSplitter(chunk_size=1000)
parent_retriever = ParentDocumentRetriever(
    vectorstore=vectorstore,
    docstore=InMemoryStore(),
    child_splitter=child_splitter,
    parent_splitter=parent_splitter,
)
parent_retriever.add_documents(docs)

# Hybrid Search: combine vector + BM25 keyword search
bm25 = BM25Retriever.from_documents(chunks, k=4)
vector_ret = vectorstore.as_retriever(search_kwargs={"k": 4})
hybrid = EnsembleRetriever(
    retrievers=[bm25, vector_ret],
    weights=[0.4, 0.6],  # keyword 40%, semantic 60%
)`}</code></pre>

      {/* 11. Production Architecture */}
      <h2 style={h2Style}>{isZh ? '生产架构参考' : 'Production Architecture Reference'}</h2>
      <p style={pStyle}>
        {isZh
          ? '将 LangChain 应用部署到生产环境需要考虑缓存、限流、监控和容错。以下是一个典型的生产级架构示意和关键配置。'
          : 'Deploying LangChain applications to production requires caching, rate limiting, monitoring, and fault tolerance. Below is a typical production architecture overview and key configurations.'}
      </p>
      <pre style={preStyle}><code>{`# Production Architecture
#
# +----------+     +-------------+     +--------------+     +----------+
# |  Client  | --> |  FastAPI /   | --> |  LangChain   | --> |  LLM API |
# | (Web/App)|     |  LangServe  |     |  Chain/Agent |     | (OpenAI) |
# +----------+     +-------------+     +--------------+     +----------+
#                        |                    |                    |
#                        v                    v                    v
#                  +----------+        +-----------+        +----------+
#                  |  Redis   |        | LangSmith |        |  Vector  |
#                  |  Cache   |        |  Tracing  |        |   Store  |
#                  +----------+        +-----------+        +----------+

# Caching: avoid repeated LLM calls for identical inputs
from langchain_core.globals import set_llm_cache
from langchain_community.cache import RedisCache
import redis

set_llm_cache(RedisCache(redis_=redis.Redis(host="localhost", port=6379)))

# Fallback chain: switch providers on failure
main_chain = prompt | ChatOpenAI(model="gpt-4o")
fallback_chain = prompt | ChatAnthropic(model="claude-sonnet-4-20250514")
robust_chain = main_chain.with_fallbacks([fallback_chain])

# Retry with exponential backoff
from langchain_core.runnables import RunnableConfig
config = RunnableConfig(max_concurrency=5)
results = await chain.abatch(inputs, config=config)

# Token counting callback for cost monitoring
from langchain_community.callbacks import get_openai_callback
with get_openai_callback() as cb:
    result = chain.invoke({"question": "What is LangChain?"})
    print(f"Tokens: {cb.total_tokens}, Cost: \${cb.total_cost:.4f}")`}</code></pre>

      {/* 12. Comparison Table */}
      <h2 style={h2Style}>{isZh ? 'LangChain vs LlamaIndex vs Haystack' : 'LangChain vs LlamaIndex vs Haystack'}</h2>
      <p style={pStyle}>
        {isZh
          ? '三大 LLM 框架各有侧重。选择取决于你的核心需求：通用 Agent 和链式编排选 LangChain，RAG 和数据索引选 LlamaIndex，企业级 NLP 管道选 Haystack。'
          : 'The three major LLM frameworks each have distinct strengths. Your choice depends on core needs: LangChain for general agents and chain orchestration, LlamaIndex for RAG and data indexing, Haystack for enterprise NLP pipelines.'}
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '维度' : 'Criteria'}</th>
            <th style={thStyle}>LangChain</th>
            <th style={thStyle}>LlamaIndex</th>
            <th style={thStyle}>Haystack</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...tdStyle, fontWeight: '600' }}>{isZh ? '核心定位' : 'Focus'}</td>
            <td style={tdStyle}>{isZh ? '通用 LLM 应用框架' : 'General LLM application framework'}</td>
            <td style={tdStyle}>{isZh ? '数据索引与 RAG' : 'Data indexing & RAG'}</td>
            <td style={tdStyle}>{isZh ? '生产级 NLP 管道' : 'Production NLP pipelines'}</td>
          </tr>
          <tr>
            <td style={{ ...tdStyle, fontWeight: '600' }}>{isZh ? 'Agent 支持' : 'Agent Support'}</td>
            <td style={tdStyle}>{isZh ? '强 — ReAct、工具调用、LangGraph' : 'Strong — ReAct, tool calling, LangGraph'}</td>
            <td style={tdStyle}>{isZh ? '中等 — 基础 Agent 模式' : 'Moderate — basic agent patterns'}</td>
            <td style={tdStyle}>{isZh ? '中等 — Agent 组件' : 'Moderate — agent components'}</td>
          </tr>
          <tr>
            <td style={{ ...tdStyle, fontWeight: '600' }}>RAG</td>
            <td style={tdStyle}>{isZh ? '良好 — 灵活但需手动组合' : 'Good — flexible but manual assembly'}</td>
            <td style={tdStyle}>{isZh ? '优秀 — 开箱即用的索引和查询引擎' : 'Excellent — out-of-box indexing & query engines'}</td>
            <td style={tdStyle}>{isZh ? '良好 — 管道式 RAG' : 'Good — pipeline-based RAG'}</td>
          </tr>
          <tr>
            <td style={{ ...tdStyle, fontWeight: '600' }}>{isZh ? '可观测性' : 'Observability'}</td>
            <td style={tdStyle}>LangSmith</td>
            <td style={tdStyle}>LlamaTrace / Arize</td>
            <td style={tdStyle}>Haystack Tracing</td>
          </tr>
          <tr>
            <td style={{ ...tdStyle, fontWeight: '600' }}>{isZh ? '学习曲线' : 'Learning Curve'}</td>
            <td style={tdStyle}>{isZh ? '中高 — 概念多、变化快' : 'Medium-High — many concepts, fast-changing'}</td>
            <td style={tdStyle}>{isZh ? '中等 — 聚焦 RAG 更直观' : 'Medium — focused on RAG, more intuitive'}</td>
            <td style={tdStyle}>{isZh ? '中等 — Pipeline 模式清晰' : 'Medium — clear Pipeline pattern'}</td>
          </tr>
          <tr>
            <td style={{ ...tdStyle, fontWeight: '600' }}>{isZh ? '适合场景' : 'Best For'}</td>
            <td style={tdStyle}>{isZh ? '多样化 AI 应用、Agent、复杂链' : 'Diverse AI apps, agents, complex chains'}</td>
            <td style={tdStyle}>{isZh ? '知识库问答、文档搜索' : 'Knowledge QA, document search'}</td>
            <td style={tdStyle}>{isZh ? '企业搜索、NLP 管道' : 'Enterprise search, NLP pipelines'}</td>
          </tr>
        </tbody>
      </table>

      {/* 11. Best Practices */}
      <h2 style={h2Style}>{isZh ? '最佳实践与常见陷阱' : 'Best Practices & Common Pitfalls'}</h2>
      <ul style={ulStyle}>
        <li><strong>{isZh ? '从简单开始' : 'Start simple'}:</strong> {isZh ? '先用单个 LLM 调用验证想法，再引入链、Agent 和 RAG 的复杂性' : 'Validate your idea with a single LLM call before introducing chains, agents, and RAG complexity'}</li>
        <li><strong>{isZh ? '始终开启 LangSmith 追踪' : 'Always enable LangSmith tracing'}:</strong> {isZh ? '在开发阶段就开启追踪，调试 LLM 应用的成本会大幅降低' : 'Enable tracing during development; debugging LLM applications becomes dramatically easier'}</li>
        <li><strong>{isZh ? '优化提示词而非代码' : 'Optimize prompts, not code'}:</strong> {isZh ? 'LLM 应用中 80% 的改进来自更好的提示词，而非更复杂的架构' : '80% of improvements in LLM apps come from better prompts, not more complex architectures'}</li>
        <li><strong>{isZh ? '控制 RAG 分块大小' : 'Tune RAG chunk size'}:</strong> {isZh ? '分块过大导致噪音多，过小则丢失上下文。通常 500-1500 字符 + 10-20% 重叠是好的起点' : 'Chunks too large introduce noise; too small lose context. 500-1500 chars with 10-20% overlap is a good starting point'}</li>
        <li><strong>{isZh ? '使用结构化输出' : 'Use structured output'}:</strong> {isZh ? '用 with_structured_output() 替代手动解析 LLM 输出，更可靠且类型安全' : 'Use with_structured_output() instead of manually parsing LLM output for reliability and type safety'}</li>
        <li><strong>{isZh ? '实现回退机制' : 'Implement fallbacks'}:</strong> {isZh ? '使用 chain.with_fallbacks([fallback_chain]) 处理 LLM 提供商故障' : 'Use chain.with_fallbacks([fallback_chain]) to handle LLM provider failures gracefully'}</li>
        <li><strong>{isZh ? '避免过度使用 Agent' : 'Avoid over-agentifying'}:</strong> {isZh ? '如果流程是确定性的，用链或 LangGraph 图代替 Agent。Agent 的不确定性会增加调试难度和成本' : 'If the workflow is deterministic, use chains or LangGraph instead. Agent non-determinism increases debugging difficulty and cost'}</li>
        <li><strong>{isZh ? '版本控制提示词' : 'Version your prompts'}:</strong> {isZh ? '用 LangSmith Hub 或代码仓库管理提示词版本，便于 A/B 测试和回滚' : 'Use LangSmith Hub or your repository to version prompts for A/B testing and rollbacks'}</li>
        <li><strong>{isZh ? '评估驱动开发' : 'Evaluation-driven development'}:</strong> {isZh ? '建立自动化评估数据集，每次修改后运行评估，防止回归' : 'Build automated evaluation datasets and run them after every change to prevent regressions'}</li>
        <li><strong>{isZh ? '注意 token 用量' : 'Monitor token usage'}:</strong> {isZh ? 'Agent 循环可能消耗大量 token。设置 max_iterations 限制并使用回调追踪成本' : 'Agent loops can consume many tokens. Set max_iterations limits and use callbacks to track costs'}</li>
      </ul>

      {/* Common pitfalls */}
      <h3 style={h3Style}>{isZh ? '常见陷阱' : 'Common Pitfalls'}</h3>
      <pre style={preStyle}><code>{`# Pitfall 1: Not handling rate limits
from langchain_core.rate_limiters import InMemoryRateLimiter
rate_limiter = InMemoryRateLimiter(requests_per_second=1, max_bucket_size=10)
llm = ChatOpenAI(model="gpt-4o", rate_limiter=rate_limiter)

# Pitfall 2: Ignoring document metadata in RAG
# Always include metadata for filtering and source attribution
chunks = splitter.split_documents(docs)
for chunk in chunks:
    chunk.metadata["source"] = "handbook_v2"
    chunk.metadata["date"] = "2026-01"

# Pitfall 3: Not using async for I/O-bound workloads
import asyncio
async def process_queries(queries):
    tasks = [chain.ainvoke({"question": q}) for q in queries]
    return await asyncio.gather(*tasks)

# Pitfall 4: Forgetting to set temperature=0 for deterministic tasks
# Use temperature=0 for extraction, classification, structured output
# Use temperature=0.7-1.0 for creative tasks`}</code></pre>

      {/* FAQ */}
      <h2 style={h2Style}>{isZh ? '常见问题' : 'Frequently Asked Questions'}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqSchema.mainEntity.map((item, i) => (
          <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '8px', color: '#1e293b' }}>
              {item.name}
            </h3>
            <p style={{ color: '#374151', lineHeight: '1.7', margin: 0 }}>
              {item.acceptedAnswer.text}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
