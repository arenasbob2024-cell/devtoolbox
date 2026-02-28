'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Ollama Complete Guide 2026: Run LLMs Locally — Installation, Models, API & Best Practices',
    intro: 'Ollama is an open-source tool that lets you run large language models (LLMs) locally on your own machine. Whether you care about data privacy, want to eliminate API costs, or need offline AI capabilities, Ollama makes it simple to download, run, and manage models like Llama 3, Mistral, Code Llama, Phi-3, and Gemma 2 with a single command. This guide covers everything from installation to production deployment.',
    tldr: 'TL;DR',
    tldrText: 'Ollama lets you run LLMs locally with one command. Install it on macOS/Linux/Windows, run "ollama run llama3" to start chatting, use the REST API at localhost:11434 for app integration, and create custom models with Modelfiles. It supports GPU acceleration via CUDA, Metal, and ROCm, and works great with LangChain, LlamaIndex, and Open WebUI.',
    keyTakeaways: 'Key Takeaways',
    kt1: 'Ollama supports 100+ models including Llama 3, Mistral, Code Llama, Phi-3, and Gemma 2',
    kt2: 'Installation is a single command on macOS and Linux; Docker available for all platforms',
    kt3: 'REST API at localhost:11434 provides /api/generate, /api/chat, and /api/embeddings endpoints',
    kt4: 'Custom Modelfiles let you tune parameters, set system prompts, and create specialized models',
    kt5: 'GPU acceleration via CUDA (NVIDIA), Metal (Apple Silicon), and ROCm (AMD) dramatically improves performance',
    kt6: '7B models need 8GB RAM, 13B models need 16GB, and 70B models need 64GB minimum',
    h2WhatIs: 'What Is Ollama and Why Run LLMs Locally?',
    whatIsP1: 'Ollama is a lightweight, open-source framework for running large language models on your local machine. It wraps llama.cpp with an easy-to-use CLI and REST API, handling model downloads, quantization, GPU acceleration, and memory management automatically.',
    whatIsP2: 'Running LLMs locally offers three major advantages over cloud APIs. First, complete data privacy — your prompts and outputs never leave your machine, making it safe for proprietary code, legal documents, and medical records. Second, zero API costs — run unlimited queries without per-token billing. Third, low-latency inference — no network round trips means faster responses, especially for interactive use cases.',
    whatIsP3: 'Ollama has become the de facto standard for local LLM inference in 2026, with over 200,000 GitHub stars and integration with every major AI framework. It runs on macOS, Linux, and Windows, and supports NVIDIA, Apple Silicon, and AMD GPUs out of the box.',
    h2Install: 'Installation Guide',
    h3MacOS: 'macOS (Intel & Apple Silicon)',
    macDesc: 'Ollama has first-class support for macOS with automatic Metal GPU acceleration on Apple Silicon. The install takes under a minute.',
    h3Linux: 'Linux',
    linuxDesc: 'On Linux, the official install script handles everything including NVIDIA CUDA driver detection. Ollama runs as a systemd service for automatic startup.',
    h3Windows: 'Windows',
    windowsDesc: 'Ollama now has a native Windows installer with GPU support for NVIDIA and AMD cards. WSL2 is no longer required.',
    h3Docker: 'Docker (All Platforms)',
    dockerInstallDesc: 'Docker is the most portable option and works on macOS, Linux, and Windows. It supports NVIDIA GPU passthrough on Linux with the NVIDIA Container Toolkit.',
    h2Models: 'Running Models',
    modelsDesc: 'Ollama provides a model library with 100+ pre-built models. The ollama run command downloads a model (if needed) and starts an interactive chat session.',
    h3PopularModels: 'Popular Models',
    h3ModelVariants: 'Model Performance Comparison',
    variantsDesc: 'Most models come in multiple sizes. Smaller models are faster but less capable. Larger models produce better output but require more resources. The table below compares performance across popular models.',
    h2Management: 'Model Management',
    managementDesc: 'Ollama provides commands to list, download, remove, and inspect your local models. Efficient model management helps you save disk space and keep your environment organized.',
    h2Api: 'Ollama REST API',
    apiDesc: 'Ollama exposes a REST API on localhost:11434 that you can use to integrate LLMs into any application. The API is compatible with the OpenAI chat completions format, making it a drop-in replacement for many existing tools. All endpoints support streaming responses by default.',
    h3Generate: '/api/generate — Text Generation',
    h3Chat: '/api/chat — Conversational Chat',
    h3Embeddings: '/api/embeddings — Vector Embeddings',
    embeddingsDesc: 'Generate vector embeddings for text, useful for RAG (Retrieval-Augmented Generation), semantic search, and document similarity. Embeddings convert text into numerical vectors that capture semantic meaning.',
    h2Modelfile: 'Custom Modelfile Creation',
    modelfileDesc: 'A Modelfile is like a Dockerfile for LLMs. It defines the base model, parameters, system prompt, and template. This lets you create specialized models for specific use cases like code review, SQL generation, or customer support.',
    h3Directives: 'Modelfile Directives',
    directivesDesc: 'The key directives in a Modelfile are FROM (base model), PARAMETER (inference settings), SYSTEM (system prompt), and TEMPLATE (prompt format). You can also use ADAPTER to apply LoRA weights and LICENSE to include model licensing information.',
    h2Gpu: 'GPU Acceleration',
    gpuDesc: 'Ollama automatically detects and uses available GPUs. GPU acceleration dramatically reduces inference time — a 7B model generates tokens 5-10x faster on GPU compared to CPU-only. Here is how GPU support works on each platform.',
    h3Metal: 'Apple Metal (macOS)',
    metalDesc: 'Apple Silicon Macs (M1/M2/M3/M4) automatically use Metal for GPU acceleration. No additional setup is needed. The unified memory architecture means the GPU can access all system RAM, giving Apple Silicon a unique advantage for running larger models.',
    h3Cuda: 'NVIDIA CUDA (Linux/Windows)',
    cudaDesc: 'NVIDIA GPUs require CUDA drivers (version 11.7 or higher). Ollama automatically detects CUDA and offloads model layers to the GPU. For GPUs with limited VRAM, Ollama can split the model between GPU and CPU memory.',
    h3Rocm: 'AMD ROCm (Linux)',
    rocmDesc: 'AMD GPUs are supported via ROCm 5.7+ on Linux. Supported cards include RX 7900 XTX, RX 7900 XT, RX 6900 XT, RX 6800 XT, and Radeon Pro W6800. Performance is comparable to NVIDIA for most workloads.',
    h2Memory: 'Memory Requirements',
    memoryDesc: 'The amount of RAM (or VRAM) needed depends on the model size and quantization level. As a rule of thumb, you need roughly 1GB of memory per billion parameters for Q4 quantized models. Here are the practical requirements.',
    thModelSize: 'Model Size',
    thMinRam: 'Min RAM',
    thRecRam: 'Recommended RAM',
    thGpuVram: 'GPU VRAM',
    thUseCase: 'Use Case',
    h2Env: 'Environment Variables',
    envDesc: 'Ollama behavior can be customized through environment variables. These are especially useful for server deployments and Docker configurations.',
    h2Integrations: 'Integrations',
    integrationsDesc: 'Ollama works seamlessly with popular AI frameworks and tools. Its OpenAI-compatible API means most libraries that work with OpenAI also work with Ollama by changing the base URL.',
    h3LangChain: 'LangChain',
    langchainDesc: 'LangChain provides a native Ollama integration for building RAG pipelines, agents, and chains with local models.',
    h3LlamaIndex: 'LlamaIndex',
    llamaindexDesc: 'LlamaIndex supports Ollama for building knowledge retrieval systems over your own documents.',
    h3OpenWebUI: 'Open WebUI',
    openwebuiDesc: 'Open WebUI provides a ChatGPT-like web interface for Ollama with multi-model support, conversation history, document upload, and web search integration.',
    h2Comparison: 'Ollama vs Alternatives',
    comparisonDesc: 'Here is how Ollama compares to other popular tools for running LLMs locally. Each tool has different strengths depending on your use case.',
    thFeature: 'Feature',
    thOllama: 'Ollama',
    thLMStudio: 'LM Studio',
    thLlamaCpp: 'llama.cpp',
    thGPT4All: 'GPT4All',
    h2Performance: 'Performance Tuning',
    performanceDesc: 'Fine-tune inference parameters to balance speed, quality, and resource usage. The right settings depend on your use case — code generation needs low temperature for precision, while creative writing benefits from higher randomness.',
    h3Parameters: 'Key Parameters',
    h2Server: 'Running Ollama as a Team Server',
    serverDesc: 'Ollama can serve multiple users on a network by binding to all interfaces instead of just localhost. This turns a single powerful machine into a shared AI inference server for your entire team.',
    h2DockerProd: 'Docker Deployment for Production',
    dockerProdDesc: 'For production environments, use Docker Compose to run Ollama with Open WebUI and proper resource management. This setup provides a self-hosted ChatGPT alternative for your organization.',
    h2Troubleshoot: 'Troubleshooting Common Issues',
    troubleshootDesc: 'Here are solutions to the most common problems when running Ollama.',
    h2BestPractices: 'Best Practices',
    bp1: 'Start with smaller models (7B) for development, scale up for production quality assessment',
    bp2: 'Use quantized models (Q4_K_M) for the best balance of quality and speed',
    bp3: 'Set appropriate context windows — larger contexts use more memory linearly',
    bp4: 'Monitor GPU memory with nvidia-smi or Activity Monitor on macOS',
    bp5: 'Use the keep_alive parameter to control model loading/unloading behavior',
    bp6: 'Create custom Modelfiles for each use case with specific system prompts',
    bp7: 'Pin model versions in production to avoid unexpected behavior changes on updates',
    bp8: 'Use streaming responses in your applications for better perceived latency',
    bp9: 'Implement request queuing for multi-user servers to avoid memory pressure',
    bp10: 'Test with representative workloads before choosing a model for production',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What hardware do I need to run Ollama?',
    faq1A: 'For 7B models, you need at least 8GB RAM. Apple Silicon Macs with 16GB or more are ideal. NVIDIA GPUs with 8GB+ VRAM also work great. For 70B models, you need 64GB RAM or a GPU with 48GB VRAM.',
    faq2Q: 'Is Ollama free to use?',
    faq2A: 'Yes, Ollama is completely free and open-source under the MIT license. There are no usage limits, API costs, or subscription fees. You can use it for personal and commercial projects.',
    faq3Q: 'How does Ollama compare to ChatGPT?',
    faq3A: 'Ollama runs models locally on your machine, while ChatGPT runs on OpenAI servers. Local models are typically less capable than GPT-4 but offer complete privacy, zero cost, and no rate limits. Llama 3 70B approaches GPT-4 quality for many tasks.',
    faq4Q: 'Can I use Ollama for code generation?',
    faq4A: 'Yes. Code Llama, DeepSeek Coder, and StarCoder2 are excellent coding models available through Ollama. They support code completion, explanation, debugging, and generation in dozens of programming languages.',
    faq5Q: 'Does Ollama support fine-tuning?',
    faq5A: 'Ollama does not support fine-tuning directly. However, you can import fine-tuned GGUF models created with other tools like Unsloth or Axolotl. Use Modelfiles to customize behavior through system prompts and parameter tuning.',
    faq6Q: 'Can Ollama run multiple models simultaneously?',
    faq6A: 'Yes, Ollama can load multiple models in memory if you have enough RAM or VRAM. Each model occupies memory independently. Use the keep_alive parameter to control how long models stay loaded after the last request.',
    faq7Q: 'How do I update Ollama and my models?',
    faq7A: 'On macOS, download the latest version from ollama.com. On Linux, re-run the install script: curl -fsSL https://ollama.com/install.sh | sh. For Docker, pull the latest image. Update models with: ollama pull modelname.',
    faq8Q: 'Is my data private when using Ollama?',
    faq8A: 'Yes, completely. All inference happens on your local machine. No data is sent to external servers. No telemetry is collected. This makes Ollama ideal for processing sensitive documents, proprietary code, and confidential business data.',
  },
  zh: {
    title: 'Ollama 完全指南 2026：本地运行大语言模型 — 安装、模型、API 与最佳实践',
    intro: 'Ollama 是一款开源工具，让你在本地机器上运行大语言模型（LLM）。无论你关注数据隐私、想要消除 API 成本，还是需要离线 AI 能力，Ollama 都能让你用一条命令下载和运行 Llama 3、Mistral、Code Llama 等模型。本指南涵盖从安装到生产部署的全部内容。',
    tldr: '概要',
    tldrText: 'Ollama 让你用一条命令在本地运行 LLM。在 macOS/Linux/Windows 上安装后，运行 "ollama run llama3" 即可开始对话，使用 localhost:11434 的 REST API 集成到应用中，通过 Modelfile 创建自定义模型。支持 CUDA、Metal 和 ROCm GPU 加速。',
    keyTakeaways: '核心要点',
    kt1: 'Ollama 支持 100+ 模型，包括 Llama 3、Mistral、Code Llama、Phi-3 和 Gemma 2',
    kt2: '在 macOS 和 Linux 上一条命令安装；所有平台可用 Docker',
    kt3: 'REST API 位于 localhost:11434，提供 /api/generate、/api/chat 和 /api/embeddings 端点',
    kt4: '自定义 Modelfile 可调整参数、设置系统提示词和创建专用模型',
    kt5: 'GPU 加速支持 CUDA（NVIDIA）、Metal（Apple Silicon）和 ROCm（AMD）',
    kt6: '7B 模型需要 8GB 内存，13B 需要 16GB，70B 需要至少 64GB',
    h2WhatIs: '什么是 Ollama？为什么要在本地运行 LLM？',
    whatIsP1: 'Ollama 是一个轻量级开源框架，用于在本地机器上运行大语言模型。它封装了 llama.cpp，提供易用的 CLI 和 REST API，自动处理模型下载、量化、GPU 加速和内存管理。',
    whatIsP2: '本地运行 LLM 有三大优势：数据完全私密不会离开你的机器，零 API 成本无限查询，低延迟推理无需网络往返。',
    whatIsP3: 'Ollama 已成为 2026 年本地 LLM 推理的事实标准，拥有超过 200,000 个 GitHub star，与所有主流 AI 框架集成。支持 macOS、Linux 和 Windows。',
    h2Install: '安装指南',
    h3MacOS: 'macOS（Intel 和 Apple Silicon）',
    macDesc: 'Ollama 对 macOS 有一流支持，Apple Silicon 上自动启用 Metal GPU 加速。安装不到一分钟。',
    h3Linux: 'Linux',
    linuxDesc: '在 Linux 上，官方安装脚本会处理一切，包括 NVIDIA CUDA 驱动检测。Ollama 作为 systemd 服务运行。',
    h3Windows: 'Windows',
    windowsDesc: 'Ollama 现在有原生 Windows 安装程序，支持 NVIDIA 和 AMD 显卡的 GPU 加速。不再需要 WSL2。',
    h3Docker: 'Docker（所有平台）',
    dockerInstallDesc: 'Docker 是最便携的选择，适用于 macOS、Linux 和 Windows。Linux 上支持 NVIDIA GPU 透传。',
    h2Models: '运行模型',
    modelsDesc: 'Ollama 提供包含 100+ 预构建模型的模型库。ollama run 命令会下载模型（如需要）并启动交互式对话。',
    h3PopularModels: '热门模型',
    h3ModelVariants: '模型性能对比',
    variantsDesc: '大多数模型有多种大小。较小的模型更快但能力较弱，较大的模型输出更好但需要更多资源。',
    h2Management: '模型管理',
    managementDesc: 'Ollama 提供命令来列出、下载、删除和检查本地模型。高效的模型管理有助于节省磁盘空间。',
    h2Api: 'Ollama REST API',
    apiDesc: 'Ollama 在 localhost:11434 暴露 REST API，可用于将 LLM 集成到任何应用中。API 兼容 OpenAI 聊天格式，默认支持流式响应。',
    h3Generate: '/api/generate — 文本生成',
    h3Chat: '/api/chat — 对话聊天',
    h3Embeddings: '/api/embeddings — 向量嵌入',
    embeddingsDesc: '生成文本的向量嵌入，用于 RAG（检索增强生成）、语义搜索和文档相似度计算。',
    h2Modelfile: '自定义 Modelfile 创建',
    modelfileDesc: 'Modelfile 类似于 LLM 的 Dockerfile。它定义基础模型、参数、系统提示词和模板，让你为特定用例创建专用模型。',
    h3Directives: 'Modelfile 指令',
    directivesDesc: 'Modelfile 的关键指令包括 FROM（基础模型）、PARAMETER（推理设置）、SYSTEM（系统提示词）和 TEMPLATE（提示词格式）。',
    h2Gpu: 'GPU 加速',
    gpuDesc: 'Ollama 自动检测并使用可用的 GPU。GPU 加速显著减少推理时间，7B 模型在 GPU 上比纯 CPU 快 5-10 倍。',
    h3Metal: 'Apple Metal (macOS)',
    metalDesc: 'Apple Silicon Mac（M1/M2/M3/M4）自动使用 Metal 进行 GPU 加速，无需额外设置。统一内存架构使 GPU 可以访问全部系统内存。',
    h3Cuda: 'NVIDIA CUDA (Linux/Windows)',
    cudaDesc: 'NVIDIA GPU 需要 CUDA 驱动（11.7 或更高版本）。Ollama 自动检测 CUDA 并将模型层卸载到 GPU。',
    h3Rocm: 'AMD ROCm (Linux)',
    rocmDesc: 'AMD GPU 通过 Linux 上的 ROCm 5.7+ 支持。支持的显卡包括 RX 7900 XTX、RX 6900 XT 等。',
    h2Memory: '内存需求',
    memoryDesc: '所需的 RAM（或 VRAM）取决于模型大小和量化级别。经验法则是 Q4 量化模型每十亿参数大约需要 1GB 内存。',
    thModelSize: '模型大小',
    thMinRam: '最低内存',
    thRecRam: '推荐内存',
    thGpuVram: 'GPU 显存',
    thUseCase: '适用场景',
    h2Env: '环境变量',
    envDesc: 'Ollama 的行为可以通过环境变量自定义。这对服务器部署和 Docker 配置特别有用。',
    h2Integrations: '集成',
    integrationsDesc: 'Ollama 与流行的 AI 框架和工具无缝配合。其 OpenAI 兼容 API 意味着大多数支持 OpenAI 的库也可以使用 Ollama。',
    h3LangChain: 'LangChain',
    langchainDesc: 'LangChain 提供原生 Ollama 集成，用于构建 RAG 管道、代理和链。',
    h3LlamaIndex: 'LlamaIndex',
    llamaindexDesc: 'LlamaIndex 支持 Ollama，用于在自有文档上构建知识检索系统。',
    h3OpenWebUI: 'Open WebUI',
    openwebuiDesc: 'Open WebUI 为 Ollama 提供类似 ChatGPT 的网页界面，支持多模型、对话历史、文档上传和网络搜索。',
    h2Comparison: 'Ollama 与替代方案对比',
    comparisonDesc: '以下是 Ollama 与其他本地运行 LLM 工具的对比。每个工具都有不同的优势。',
    thFeature: '特性',
    thOllama: 'Ollama',
    thLMStudio: 'LM Studio',
    thLlamaCpp: 'llama.cpp',
    thGPT4All: 'GPT4All',
    h2Performance: '性能调优',
    performanceDesc: '调整推理参数以平衡速度、质量和资源使用。合适的设置取决于用例 — 代码生成需要低温度以保证精确性。',
    h3Parameters: '关键参数',
    h2Server: '将 Ollama 作为团队服务器运行',
    serverDesc: 'Ollama 可以通过绑定所有网络接口来为网络上的多个用户提供服务，将一台强大的机器变成共享 AI 推理服务器。',
    h2DockerProd: '生产环境 Docker 部署',
    dockerProdDesc: '在生产环境中，使用 Docker Compose 运行 Ollama 和 Open WebUI，提供自托管的 ChatGPT 替代方案。',
    h2Troubleshoot: '常见问题排查',
    troubleshootDesc: '以下是运行 Ollama 时最常见问题的解决方案。',
    h2BestPractices: '最佳实践',
    bp1: '开发时从小模型（7B）开始，生产时扩大规模进行质量评估',
    bp2: '使用量化模型（Q4_K_M）获得质量和速度的最佳平衡',
    bp3: '设置适当的上下文窗口 — 更大的上下文线性增加内存使用',
    bp4: '使用 nvidia-smi 或 macOS 的活动监视器监控 GPU 内存',
    bp5: '使用 keep_alive 参数控制模型加载/卸载行为',
    bp6: '为每个用例创建带有特定系统提示词的自定义 Modelfile',
    bp7: '在生产环境中固定模型版本以避免更新时的意外行为变化',
    bp8: '在应用中使用流式响应以获得更好的感知延迟',
    bp9: '为多用户服务器实现请求队列以避免内存压力',
    bp10: '在选择生产模型之前，使用代表性工作负载进行测试',
    h2Faq: '常见问题',
    faq1Q: '运行 Ollama 需要什么硬件？',
    faq1A: '运行 7B 模型至少需要 8GB 内存。16GB 以上的 Apple Silicon Mac 是理想选择。8GB+ 显存的 NVIDIA GPU 也很好用。70B 模型需要 64GB 内存或 48GB 显存的 GPU。',
    faq2Q: 'Ollama 是免费的吗？',
    faq2A: '是的，Ollama 完全免费且开源（MIT 许可证）。没有使用限制、API 费用或订阅费。可用于个人和商业项目。',
    faq3Q: 'Ollama 与 ChatGPT 相比如何？',
    faq3A: 'Ollama 在本地运行模型，而 ChatGPT 在 OpenAI 服务器上运行。本地模型通常不如 GPT-4，但提供完全隐私、零成本和无速率限制。Llama 3 70B 在许多任务上接近 GPT-4 质量。',
    faq4Q: 'Ollama 能用于代码生成吗？',
    faq4A: '可以。Code Llama、DeepSeek Coder 和 StarCoder2 是通过 Ollama 可用的优秀编程模型，支持代码补全、解释、调试和生成。',
    faq5Q: 'Ollama 支持微调吗？',
    faq5A: 'Ollama 不直接支持微调，但可以导入用 Unsloth 或 Axolotl 等工具创建的微调 GGUF 模型。通过 Modelfile 的系统提示词和参数调整来自定义行为。',
    faq6Q: 'Ollama 能同时运行多个模型吗？',
    faq6A: '可以，只要有足够的 RAM 或 VRAM，Ollama 可以同时加载多个模型。使用 keep_alive 参数控制模型在最后一次请求后保持加载的时间。',
    faq7Q: '如何更新 Ollama 和模型？',
    faq7A: 'macOS 上从 ollama.com 下载最新版本。Linux 上重新运行安装脚本。Docker 用户拉取最新镜像。更新模型：ollama pull 模型名。',
    faq8Q: '使用 Ollama 时数据是私密的吗？',
    faq8A: '完全私密。所有推理都在本地机器上进行，不会发送数据到外部服务器，不收集遥测数据。非常适合处理敏感文档、专有代码和机密业务数据。',
  },
};

export default function OllamaGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
      { '@type': 'Question', name: t.faq6Q, acceptedAnswer: { '@type': 'Answer', text: t.faq6A } },
      { '@type': 'Question', name: t.faq7Q, acceptedAnswer: { '@type': 'Answer', text: t.faq7A } },
      { '@type': 'Question', name: t.faq8Q, acceptedAnswer: { '@type': 'Answer', text: t.faq8A } },
    ],
  };

  const sectionTitle = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' } as const;
  const subTitle = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' } as const;
  const para = { marginBottom: '1rem', lineHeight: '1.7' } as const;
  const codeBlock = { backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' as const, fontSize: '0.875rem', marginBottom: '1.5rem' };
  const tableStyle = { width: '100%', borderCollapse: 'collapse' as const, marginBottom: '1.5rem', fontSize: '0.9rem' };
  const thStyle = { backgroundColor: '#f1f5f9', padding: '0.75rem', textAlign: 'left' as const, borderBottom: '2px solid #e2e8f0', fontWeight: 600 };
  const tdStyle = { padding: '0.75rem', borderBottom: '1px solid #e2e8f0' };
  const boldTd = { ...tdStyle, fontWeight: 600 };
  const noteTxt = { fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.25rem', borderRadius: '0 0.5rem 0.5rem 0', marginBottom: '2rem' }}>
        <strong style={{ fontSize: '1.1rem' }}>{t.tldr}</strong>
        <p style={{ marginTop: '0.5rem', marginBottom: 0, lineHeight: '1.7' }}>{t.tldrText}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <strong style={{ fontSize: '1.1rem' }}>{t.keyTakeaways}</strong>
        <ul style={{ marginTop: '0.75rem', marginBottom: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li>{t.kt1}</li>
          <li>{t.kt2}</li>
          <li>{t.kt3}</li>
          <li>{t.kt4}</li>
          <li>{t.kt5}</li>
          <li>{t.kt6}</li>
        </ul>
      </div>

      {/* What Is Ollama */}
      <h2 style={sectionTitle}>{t.h2WhatIs}</h2>
      <p style={para}>{t.whatIsP1}</p>
      <p style={para}>{t.whatIsP2}</p>
      <p style={para}>{t.whatIsP3}</p>

      {/* Installation */}
      <h2 style={sectionTitle}>{t.h2Install}</h2>

      <h3 style={subTitle}>{t.h3MacOS}</h3>
      <p style={para}>{t.macDesc}</p>
      <pre style={codeBlock}><code>{'# Option 1: Download from ollama.com (recommended)\n' +
        '# Visit https://ollama.com/download and install the .dmg\n\n' +
        '# Option 2: Install via Homebrew\n' +
        'brew install ollama\n\n' +
        '# Start the Ollama service\n' +
        'ollama serve\n\n' +
        '# In a new terminal, run your first model\n' +
        'ollama run llama3\n\n' +
        '# Verify installation\n' +
        'ollama --version\n' +
        '# ollama version 0.6.2'}</code></pre>

      <h3 style={subTitle}>{t.h3Linux}</h3>
      <p style={para}>{t.linuxDesc}</p>
      <pre style={codeBlock}><code>{'# One-line install (detects NVIDIA CUDA automatically)\n' +
        'curl -fsSL https://ollama.com/install.sh | sh\n\n' +
        '# Start Ollama as a systemd service\n' +
        'sudo systemctl enable ollama\n' +
        'sudo systemctl start ollama\n\n' +
        '# Check service status\n' +
        'sudo systemctl status ollama\n\n' +
        '# Run a model\n' +
        'ollama run llama3\n\n' +
        '# View logs for debugging\n' +
        'journalctl -u ollama -f'}</code></pre>

      <h3 style={subTitle}>{t.h3Windows}</h3>
      <p style={para}>{t.windowsDesc}</p>
      <pre style={codeBlock}><code>{'# Download the Windows installer from ollama.com/download\n' +
        '# Run OllamaSetup.exe — it installs as a Windows service\n\n' +
        '# After installation, open PowerShell or Command Prompt\n' +
        'ollama run llama3\n\n' +
        '# The API is available at http://localhost:11434\n' +
        '# Ollama runs in the system tray on Windows'}</code></pre>

      <h3 style={subTitle}>{t.h3Docker}</h3>
      <p style={para}>{t.dockerInstallDesc}</p>
      <pre style={codeBlock}><code>{'# CPU only\n' +
        'docker run -d -v ollama:/root/.ollama -p 11434:11434 \\\n' +
        '  --name ollama ollama/ollama\n\n' +
        '# With NVIDIA GPU support (requires nvidia-container-toolkit)\n' +
        'docker run -d --gpus=all -v ollama:/root/.ollama \\\n' +
        '  -p 11434:11434 --name ollama ollama/ollama\n\n' +
        '# Run a model inside the container\n' +
        'docker exec -it ollama ollama run llama3\n\n' +
        '# Pull a model without interactive session\n' +
        'docker exec ollama ollama pull mistral'}</code></pre>

      {/* Running Models */}
      <h2 style={sectionTitle}>{t.h2Models}</h2>
      <p style={para}>{t.modelsDesc}</p>

      <h3 style={subTitle}>{t.h3PopularModels}</h3>
      <pre style={codeBlock}><code>{'# General purpose — Meta Llama 3 (8B, fast and capable)\n' +
        'ollama run llama3\n\n' +
        '# Mistral 7B — excellent reasoning, multilingual\n' +
        'ollama run mistral\n\n' +
        '# Code Llama — optimized for code generation\n' +
        'ollama run codellama\n\n' +
        '# Microsoft Phi-3 — small but powerful (3.8B)\n' +
        'ollama run phi3\n\n' +
        '# Google Gemma 2 — strong general performance (9B)\n' +
        'ollama run gemma2\n\n' +
        '# DeepSeek Coder V2 — top coding model\n' +
        'ollama run deepseek-coder-v2\n\n' +
        '# Llama 3 70B — near GPT-4 quality (needs 64GB RAM)\n' +
        'ollama run llama3:70b\n\n' +
        '# Multimodal — LLaVA (vision + text)\n' +
        'ollama run llava\n' +
        '# Then provide an image: /path/to/image.jpg What is in this image?'}</code></pre>

      <h3 style={subTitle}>{t.h3ModelVariants}</h3>
      <p style={para}>{t.variantsDesc}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Model</th>
            <th style={thStyle}>Parameters</th>
            <th style={thStyle}>Size (Q4)</th>
            <th style={thStyle}>Speed (tok/s)*</th>
            <th style={thStyle}>Quality</th>
            <th style={thStyle}>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Phi-3 Mini</td><td style={tdStyle}>3.8B</td><td style={tdStyle}>2.3 GB</td><td style={tdStyle}>~65</td><td style={tdStyle}>Good</td><td style={tdStyle}>Edge, mobile, quick tasks</td></tr>
          <tr><td style={tdStyle}>Mistral 7B</td><td style={tdStyle}>7B</td><td style={tdStyle}>4.1 GB</td><td style={tdStyle}>~48</td><td style={tdStyle}>Very Good</td><td style={tdStyle}>General chat, multilingual</td></tr>
          <tr><td style={tdStyle}>Llama 3 8B</td><td style={tdStyle}>8B</td><td style={tdStyle}>4.7 GB</td><td style={tdStyle}>~45</td><td style={tdStyle}>Very Good</td><td style={tdStyle}>All-around, reasoning</td></tr>
          <tr><td style={tdStyle}>Gemma 2 9B</td><td style={tdStyle}>9B</td><td style={tdStyle}>5.4 GB</td><td style={tdStyle}>~38</td><td style={tdStyle}>Excellent</td><td style={tdStyle}>Instruction following</td></tr>
          <tr><td style={tdStyle}>Code Llama 13B</td><td style={tdStyle}>13B</td><td style={tdStyle}>7.4 GB</td><td style={tdStyle}>~28</td><td style={tdStyle}>Excellent</td><td style={tdStyle}>Code generation, review</td></tr>
          <tr><td style={tdStyle}>DeepSeek Coder</td><td style={tdStyle}>33B</td><td style={tdStyle}>19 GB</td><td style={tdStyle}>~14</td><td style={tdStyle}>Outstanding</td><td style={tdStyle}>Advanced coding tasks</td></tr>
          <tr><td style={tdStyle}>Llama 3 70B</td><td style={tdStyle}>70B</td><td style={tdStyle}>39 GB</td><td style={tdStyle}>~8</td><td style={tdStyle}>Outstanding</td><td style={tdStyle}>Complex reasoning, analysis</td></tr>
        </tbody>
      </table>
      <p style={noteTxt}>* Approximate tokens/second on Apple M3 Max 64GB with Metal acceleration. Actual speed varies by hardware and quantization.</p>

      {/* Model Management */}
      <h2 style={sectionTitle}>{t.h2Management}</h2>
      <p style={para}>{t.managementDesc}</p>
      <pre style={codeBlock}><code>{'# List all downloaded models\n' +
        'ollama list\n' +
        '# NAME              ID            SIZE    MODIFIED\n' +
        '# llama3:latest     a6990ed6be41  4.7 GB  2 hours ago\n' +
        '# mistral:latest    61e88e884507  4.1 GB  3 days ago\n\n' +
        '# Download a model without running it\n' +
        'ollama pull codellama:13b\n\n' +
        '# Pull a specific quantization variant\n' +
        'ollama pull llama3:8b-instruct-q5_K_M\n\n' +
        '# Remove a model to free disk space\n' +
        'ollama rm mistral\n\n' +
        '# Show model details (parameters, template, license)\n' +
        'ollama show llama3\n' +
        'ollama show llama3 --modelfile  # view the Modelfile\n\n' +
        '# Copy a model (useful before customizing)\n' +
        'ollama cp llama3 my-llama3\n\n' +
        '# Create a custom model from a Modelfile\n' +
        'ollama create my-assistant -f ./Modelfile\n\n' +
        '# List currently running models and their resource usage\n' +
        'ollama ps\n' +
        '# NAME      ID       SIZE     PROCESSOR  UNTIL\n' +
        '# llama3    a6990e   6.7 GB   100% GPU   4 minutes'}</code></pre>

      {/* REST API */}
      <h2 style={sectionTitle}>{t.h2Api}</h2>
      <p style={para}>{t.apiDesc}</p>

      <h3 style={subTitle}>{t.h3Generate}</h3>
      <pre style={codeBlock}><code>{'# Simple text generation\n' +
        'curl http://localhost:11434/api/generate -d \'{\n' +
        '  "model": "llama3",\n' +
        '  "prompt": "Explain Docker in 3 sentences",\n' +
        '  "stream": false\n' +
        '}\'\n\n' +
        '# With parameters for precise control\n' +
        'curl http://localhost:11434/api/generate -d \'{\n' +
        '  "model": "llama3",\n' +
        '  "prompt": "Write a Python function to merge two sorted lists",\n' +
        '  "stream": false,\n' +
        '  "options": {\n' +
        '    "temperature": 0.2,\n' +
        '    "top_p": 0.9,\n' +
        '    "num_predict": 500\n' +
        '  }\n' +
        '}\'\n\n' +
        '# Response structure\n' +
        '# {\n' +
        '#   "model": "llama3",\n' +
        '#   "response": "Here is a Python function...",\n' +
        '#   "done": true,\n' +
        '#   "total_duration": 1234567890,\n' +
        '#   "eval_count": 142,\n' +
        '#   "eval_duration": 987654321\n' +
        '# }'}</code></pre>

      <h3 style={subTitle}>{t.h3Chat}</h3>
      <pre style={codeBlock}><code>{'# Multi-turn conversation with system prompt\n' +
        'curl http://localhost:11434/api/chat -d \'{\n' +
        '  "model": "llama3",\n' +
        '  "messages": [\n' +
        '    { "role": "system", "content": "You are a senior DevOps engineer." },\n' +
        '    { "role": "user", "content": "How do I set up a CI/CD pipeline?" },\n' +
        '    { "role": "assistant", "content": "A CI/CD pipeline typically..." },\n' +
        '    { "role": "user", "content": "Show me a GitHub Actions example." }\n' +
        '  ],\n' +
        '  "stream": false\n' +
        '}\''}</code></pre>
      <pre style={codeBlock}><code>{'# Node.js / TypeScript streaming client\n' +
        'async function chat(prompt: string): Promise<void> {\n' +
        '  const response = await fetch("http://localhost:11434/api/chat", {\n' +
        '    method: "POST",\n' +
        '    headers: { "Content-Type": "application/json" },\n' +
        '    body: JSON.stringify({\n' +
        '      model: "llama3",\n' +
        '      messages: [{ role: "user", content: prompt }],\n' +
        '    }),\n' +
        '  });\n\n' +
        '  const reader = response.body!.getReader();\n' +
        '  const decoder = new TextDecoder();\n\n' +
        '  while (true) {\n' +
        '    const { done, value } = await reader.read();\n' +
        '    if (done) break;\n' +
        '    const chunk = JSON.parse(decoder.decode(value));\n' +
        '    process.stdout.write(chunk.message.content);\n' +
        '  }\n' +
        '}\n\n' +
        'chat("Explain async/await in TypeScript");'}</code></pre>

      <h3 style={subTitle}>{t.h3Embeddings}</h3>
      <p style={para}>{t.embeddingsDesc}</p>
      <pre style={codeBlock}><code>{'# Generate embeddings for text\n' +
        'curl http://localhost:11434/api/embeddings -d \'{\n' +
        '  "model": "llama3",\n' +
        '  "prompt": "Ollama is a tool for running LLMs locally"\n' +
        '}\'\n' +
        '# Response: { "embedding": [0.123, -0.456, 0.789, ...] }\n\n' +
        '# Python: semantic search with embeddings\n' +
        'import requests\n' +
        'import numpy as np\n\n' +
        'def get_embedding(text: str) -> np.ndarray:\n' +
        '    resp = requests.post("http://localhost:11434/api/embeddings",\n' +
        '        json={"model": "llama3", "prompt": text})\n' +
        '    return np.array(resp.json()["embedding"])\n\n' +
        'def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:\n' +
        '    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))\n\n' +
        '# Compare document similarity\n' +
        'doc_emb = get_embedding("Docker containers isolate applications")\n' +
        'query_emb = get_embedding("How to run apps in isolation?")\n' +
        'score = cosine_similarity(doc_emb, query_emb)\n' +
        'print(f"Similarity: {score:.4f}")  # ~0.85'}</code></pre>

      {/* Custom Modelfile */}
      <h2 style={sectionTitle}>{t.h2Modelfile}</h2>
      <p style={para}>{t.modelfileDesc}</p>

      <h3 style={subTitle}>{t.h3Directives}</h3>
      <p style={para}>{t.directivesDesc}</p>
      <pre style={codeBlock}><code>{'# Modelfile for a code review assistant\n' +
        'FROM codellama:13b\n\n' +
        '# Set inference parameters\n' +
        'PARAMETER temperature 0.3\n' +
        'PARAMETER top_p 0.9\n' +
        'PARAMETER num_ctx 4096\n' +
        'PARAMETER stop "<|end|>"\n' +
        'PARAMETER repeat_penalty 1.1\n\n' +
        '# Define the system prompt\n' +
        'SYSTEM """\n' +
        'You are an expert code reviewer. Analyze code for:\n' +
        '- Bugs and potential errors\n' +
        '- Performance issues and optimization opportunities\n' +
        '- Security vulnerabilities (injection, XSS, etc.)\n' +
        '- Code style and best practices\n' +
        'Provide actionable feedback with specific line references.\n' +
        'Rate severity as: Critical, Warning, or Suggestion.\n' +
        '"""\n\n' +
        '# Custom prompt template (optional)\n' +
        'TEMPLATE """{{ .System }}\n' +
        'User: {{ .Prompt }}\n' +
        'Assistant: """'}</code></pre>
      <pre style={codeBlock}><code>{'# Build and run the custom model\n' +
        'ollama create code-reviewer -f ./Modelfile\n' +
        'ollama run code-reviewer\n\n' +
        '# Another example: a SQL query assistant\n' +
        '# --- sql-helper.Modelfile ---\n' +
        'FROM llama3\n' +
        'PARAMETER temperature 0.1\n' +
        'PARAMETER num_ctx 8192\n' +
        'SYSTEM """\n' +
        'You are a PostgreSQL expert. Generate optimized SQL queries.\n' +
        'Always explain your queries and suggest indexes when beneficial.\n' +
        'Output format: SQL query first, then explanation.\n' +
        'Use CTEs for complex queries. Avoid SELECT *.\n' +
        '"""\n\n' +
        '# Import a GGUF model from HuggingFace\n' +
        '# --- import.Modelfile ---\n' +
        'FROM ./my-finetuned-model.gguf\n' +
        'PARAMETER temperature 0.5\n' +
        'SYSTEM "You are a helpful assistant."\n\n' +
        '# Apply a LoRA adapter to a base model\n' +
        '# FROM llama3\n' +
        '# ADAPTER ./my-lora-adapter.gguf'}</code></pre>

      {/* GPU Acceleration */}
      <h2 style={sectionTitle}>{t.h2Gpu}</h2>
      <p style={para}>{t.gpuDesc}</p>

      <h3 style={subTitle}>{t.h3Metal}</h3>
      <p style={para}>{t.metalDesc}</p>
      <pre style={codeBlock}><code>{'# Check Metal GPU usage on macOS\n' +
        'ollama ps\n' +
        '# NAME      ID        SIZE     PROCESSOR    UNTIL\n' +
        '# llama3    a6990e    6.7 GB   100% GPU     4 minutes from now\n\n' +
        '# Apple Silicon performance reference (M3 Max 64GB):\n' +
        '# Llama 3 8B:   ~45 tokens/sec\n' +
        '# Llama 3 70B:  ~8 tokens/sec\n' +
        '# Phi-3 Mini:   ~65 tokens/sec\n\n' +
        '# Monitor memory pressure in Activity Monitor\n' +
        '# or use: memory_pressure'}</code></pre>

      <h3 style={subTitle}>{t.h3Cuda}</h3>
      <p style={para}>{t.cudaDesc}</p>
      <pre style={codeBlock}><code>{'# Verify NVIDIA GPU detection\n' +
        'nvidia-smi\n\n' +
        '# Check Ollama GPU usage\n' +
        'ollama ps\n' +
        '# NAME      ID        SIZE    PROCESSOR\n' +
        '# llama3    a6990e    6.7 GB  100% GPU\n\n' +
        '# Partial GPU offload (when VRAM is limited)\n' +
        '# Offload only 20 layers to GPU, rest stays on CPU\n' +
        'OLLAMA_NUM_GPU=20 ollama run llama3:70b\n\n' +
        '# Force CPU-only mode\n' +
        'OLLAMA_NUM_GPU=0 ollama run llama3\n\n' +
        '# Monitor GPU memory during inference\n' +
        'watch -n 1 nvidia-smi'}</code></pre>

      <h3 style={subTitle}>{t.h3Rocm}</h3>
      <p style={para}>{t.rocmDesc}</p>
      <pre style={codeBlock}><code>{'# Install ROCm for AMD GPUs (Ubuntu)\n' +
        '# Follow: https://rocm.docs.amd.com/en/latest/deploy/linux/\n\n' +
        '# Run Ollama with ROCm Docker image\n' +
        'docker run -d --device /dev/kfd --device /dev/dri \\\n' +
        '  -v ollama:/root/.ollama -p 11434:11434 \\\n' +
        '  --name ollama ollama/ollama:rocm'}</code></pre>

      {/* Memory Requirements */}
      <h2 style={sectionTitle}>{t.h2Memory}</h2>
      <p style={para}>{t.memoryDesc}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.thModelSize}</th>
            <th style={thStyle}>{t.thMinRam}</th>
            <th style={thStyle}>{t.thRecRam}</th>
            <th style={thStyle}>{t.thGpuVram}</th>
            <th style={thStyle}>{t.thUseCase}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>1-3B (Phi-3 Mini, TinyLlama)</td><td style={tdStyle}>4 GB</td><td style={tdStyle}>8 GB</td><td style={tdStyle}>4 GB</td><td style={tdStyle}>Edge devices, quick prototyping</td></tr>
          <tr><td style={tdStyle}>7-8B (Llama 3, Mistral)</td><td style={tdStyle}>8 GB</td><td style={tdStyle}>16 GB</td><td style={tdStyle}>8 GB</td><td style={tdStyle}>General use, coding, chat</td></tr>
          <tr><td style={tdStyle}>13B (Code Llama 13B)</td><td style={tdStyle}>16 GB</td><td style={tdStyle}>24 GB</td><td style={tdStyle}>12 GB</td><td style={tdStyle}>Complex reasoning, code review</td></tr>
          <tr><td style={tdStyle}>33-34B (DeepSeek, Code Llama 34B)</td><td style={tdStyle}>32 GB</td><td style={tdStyle}>48 GB</td><td style={tdStyle}>24 GB</td><td style={tdStyle}>Advanced analysis, long context</td></tr>
          <tr><td style={tdStyle}>70B (Llama 3 70B)</td><td style={tdStyle}>64 GB</td><td style={tdStyle}>96 GB</td><td style={tdStyle}>48 GB</td><td style={tdStyle}>Near GPT-4 quality tasks</td></tr>
        </tbody>
      </table>
      <p style={noteTxt}>Memory requirements are for Q4_K_M quantization. Higher quantization (Q5, Q8) uses more memory but produces slightly better output. Context window size also adds to memory usage — each 1K tokens of context requires approximately 0.5-1 GB additional memory for 7B models.</p>

      {/* Environment Variables */}
      <h2 style={sectionTitle}>{t.h2Env}</h2>
      <p style={para}>{t.envDesc}</p>
      <pre style={codeBlock}><code>{'# Key Ollama environment variables\n\n' +
        '# OLLAMA_HOST — bind address (default: 127.0.0.1:11434)\n' +
        'OLLAMA_HOST=0.0.0.0:11434          # listen on all interfaces\n\n' +
        '# OLLAMA_MODELS — custom model storage directory\n' +
        'OLLAMA_MODELS=/mnt/ssd/ollama-models  # use a fast SSD\n\n' +
        '# OLLAMA_ORIGINS — allowed CORS origins\n' +
        'OLLAMA_ORIGINS="http://localhost:3000,https://myapp.com"\n\n' +
        '# OLLAMA_NUM_PARALLEL — concurrent request handling\n' +
        'OLLAMA_NUM_PARALLEL=4              # handle 4 requests at once\n\n' +
        '# OLLAMA_MAX_LOADED_MODELS — models kept in memory\n' +
        'OLLAMA_MAX_LOADED_MODELS=2         # keep 2 models loaded\n\n' +
        '# OLLAMA_KEEP_ALIVE — how long models stay loaded\n' +
        'OLLAMA_KEEP_ALIVE=10m              # unload after 10 minutes\n\n' +
        '# OLLAMA_NUM_GPU — GPU layer count\n' +
        'OLLAMA_NUM_GPU=99                  # all layers on GPU (default)\n' +
        'OLLAMA_NUM_GPU=0                   # CPU only\n\n' +
        '# Linux systemd: /etc/systemd/system/ollama.service\n' +
        '# [Service]\n' +
        '# Environment="OLLAMA_HOST=0.0.0.0"\n' +
        '# Environment="OLLAMA_MODELS=/data/models"\n' +
        '# Then: sudo systemctl daemon-reload && sudo systemctl restart ollama'}</code></pre>

      {/* Integrations */}
      <h2 style={sectionTitle}>{t.h2Integrations}</h2>
      <p style={para}>{t.integrationsDesc}</p>

      <h3 style={subTitle}>{t.h3LangChain}</h3>
      <p style={para}>{t.langchainDesc}</p>
      <pre style={codeBlock}><code>{'# pip install langchain-ollama langchain-chroma\n' +
        'from langchain_ollama import OllamaLLM, OllamaEmbeddings\n' +
        'from langchain_community.vectorstores import Chroma\n' +
        'from langchain.text_splitter import RecursiveCharacterTextSplitter\n\n' +
        '# Basic text generation\n' +
        'llm = OllamaLLM(model="llama3")\n' +
        'response = llm.invoke("Explain Kubernetes in simple terms")\n' +
        'print(response)\n\n' +
        '# Build a RAG pipeline with local embeddings\n' +
        'embeddings = OllamaEmbeddings(model="llama3")\n' +
        'splitter = RecursiveCharacterTextSplitter(\n' +
        '    chunk_size=1000, chunk_overlap=200\n' +
        ')\n' +
        'docs = splitter.split_documents(my_documents)\n' +
        'vectorstore = Chroma.from_documents(docs, embeddings)\n\n' +
        '# Query the knowledge base\n' +
        'retriever = vectorstore.as_retriever(search_kwargs={"k": 4})\n' +
        'results = retriever.invoke("How to deploy with Docker?")'}</code></pre>

      <h3 style={subTitle}>{t.h3LlamaIndex}</h3>
      <p style={para}>{t.llamaindexDesc}</p>
      <pre style={codeBlock}><code>{'# pip install llama-index-llms-ollama llama-index-embeddings-ollama\n' +
        'from llama_index.llms.ollama import Ollama\n' +
        'from llama_index.embeddings.ollama import OllamaEmbedding\n' +
        'from llama_index.core import VectorStoreIndex, SimpleDirectoryReader\n' +
        'from llama_index.core import Settings\n\n' +
        '# Configure Ollama as default LLM and embedding model\n' +
        'Settings.llm = Ollama(model="llama3", request_timeout=120)\n' +
        'Settings.embed_model = OllamaEmbedding(model_name="llama3")\n\n' +
        '# Load documents and build index\n' +
        'documents = SimpleDirectoryReader("./docs").load_data()\n' +
        'index = VectorStoreIndex.from_documents(documents)\n\n' +
        '# Query your documents\n' +
        'query_engine = index.as_query_engine()\n' +
        'response = query_engine.query("What are the main API endpoints?")\n' +
        'print(response)'}</code></pre>

      <h3 style={subTitle}>{t.h3OpenWebUI}</h3>
      <p style={para}>{t.openwebuiDesc}</p>
      <pre style={codeBlock}><code>{'# Run Open WebUI with Docker (auto-connects to Ollama)\n' +
        'docker run -d -p 3000:8080 \\\n' +
        '  --add-host=host.docker.internal:host-gateway \\\n' +
        '  -v open-webui:/app/backend/data \\\n' +
        '  --name open-webui \\\n' +
        '  --restart unless-stopped \\\n' +
        '  ghcr.io/open-webui/open-webui:main\n\n' +
        '# Access the web UI at http://localhost:3000\n' +
        '# Features:\n' +
        '#   - Multi-model chat with model switching\n' +
        '#   - Conversation history and search\n' +
        '#   - Document upload for RAG\n' +
        '#   - Web search integration\n' +
        '#   - User accounts and admin panel\n' +
        '#   - Custom model presets and system prompts'}</code></pre>

      {/* Comparison Table */}
      <h2 style={sectionTitle}>{t.h2Comparison}</h2>
      <p style={para}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.thFeature}</th>
              <th style={thStyle}>{t.thOllama}</th>
              <th style={thStyle}>{t.thLMStudio}</th>
              <th style={thStyle}>{t.thLlamaCpp}</th>
              <th style={thStyle}>{t.thGPT4All}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Ease of Use</td><td style={boldTd}>Excellent</td><td style={tdStyle}>Excellent</td><td style={tdStyle}>Advanced</td><td style={tdStyle}>Good</td></tr>
            <tr><td style={tdStyle}>REST API</td><td style={boldTd}>Built-in (OpenAI compat)</td><td style={tdStyle}>Built-in</td><td style={tdStyle}>Optional server</td><td style={tdStyle}>Built-in</td></tr>
            <tr><td style={tdStyle}>GUI</td><td style={tdStyle}>CLI only*</td><td style={boldTd}>Full GUI</td><td style={tdStyle}>None</td><td style={tdStyle}>Full GUI</td></tr>
            <tr><td style={tdStyle}>Docker Support</td><td style={boldTd}>Official images</td><td style={tdStyle}>Community</td><td style={tdStyle}>Community</td><td style={tdStyle}>None</td></tr>
            <tr><td style={tdStyle}>Model Library</td><td style={boldTd}>100+ curated models</td><td style={tdStyle}>HuggingFace browse</td><td style={tdStyle}>Manual GGUF files</td><td style={tdStyle}>Curated list</td></tr>
            <tr><td style={tdStyle}>GPU Support</td><td style={tdStyle}>CUDA/Metal/ROCm</td><td style={tdStyle}>CUDA/Metal</td><td style={boldTd}>CUDA/Metal/ROCm/Vulkan</td><td style={tdStyle}>CUDA/Metal</td></tr>
            <tr><td style={tdStyle}>Customization</td><td style={boldTd}>Modelfile system</td><td style={tdStyle}>UI settings</td><td style={tdStyle}>Full CLI control</td><td style={tdStyle}>Limited</td></tr>
            <tr><td style={tdStyle}>Server / Team Use</td><td style={boldTd}>Native multi-user</td><td style={tdStyle}>Local only</td><td style={tdStyle}>Optional server</td><td style={tdStyle}>Local only</td></tr>
            <tr><td style={tdStyle}>License</td><td style={tdStyle}>MIT</td><td style={tdStyle}>Proprietary</td><td style={tdStyle}>MIT</td><td style={tdStyle}>MIT</td></tr>
            <tr><td style={tdStyle}>Best For</td><td style={boldTd}>Developers, DevOps, teams</td><td style={tdStyle}>Beginners, exploration</td><td style={tdStyle}>Power users, custom builds</td><td style={tdStyle}>Desktop users</td></tr>
          </tbody>
        </table>
      </div>
      <p style={noteTxt}>* Ollama pairs with Open WebUI for a full graphical experience comparable to LM Studio.</p>

      {/* Performance Tuning */}
      <h2 style={sectionTitle}>{t.h2Performance}</h2>
      <p style={para}>{t.performanceDesc}</p>

      <h3 style={subTitle}>{t.h3Parameters}</h3>
      <pre style={codeBlock}><code>{'# Temperature controls randomness (0.0 = deterministic, 2.0 = very random)\n' +
        'curl http://localhost:11434/api/generate -d \'{\n' +
        '  "model": "llama3",\n' +
        '  "prompt": "Write a haiku about programming",\n' +
        '  "options": {\n' +
        '    "temperature": 0.8,\n' +
        '    "top_p": 0.95,\n' +
        '    "top_k": 40,\n' +
        '    "num_predict": 200,\n' +
        '    "num_ctx": 4096,\n' +
        '    "repeat_penalty": 1.1,\n' +
        '    "num_gpu": 99,\n' +
        '    "num_thread": 8\n' +
        '  }\n' +
        '}\'\n\n' +
        '# Parameter reference:\n' +
        '# temperature 0.0-0.3 → factual answers, code generation\n' +
        '# temperature 0.4-0.7 → balanced, general conversation\n' +
        '# temperature 0.8-1.5 → creative writing, brainstorming\n' +
        '#\n' +
        '# num_ctx: context window (default 2048, max depends on model)\n' +
        '#   Higher = more context but more memory and slower\n' +
        '#   Llama 3 supports up to 8192 tokens\n' +
        '#\n' +
        '# num_gpu: GPU layer count (99 = all layers, 0 = CPU only)\n' +
        '# num_thread: CPU threads (default = auto-detect)\n' +
        '# top_p: nucleus sampling (0.9 = consider top 90% probability)\n' +
        '# top_k: limits selection to top K tokens (40 is a good default)\n' +
        '# repeat_penalty: penalize repetition (1.0 = off, 1.1 = moderate)'}</code></pre>

      {/* Team Server */}
      <h2 style={sectionTitle}>{t.h2Server}</h2>
      <p style={para}>{t.serverDesc}</p>
      <pre style={codeBlock}><code>{'# Bind Ollama to all interfaces for network access\n' +
        'OLLAMA_HOST=0.0.0.0 ollama serve\n\n' +
        '# Linux: make it permanent via systemd\n' +
        'sudo systemctl edit ollama\n' +
        '# Add: Environment="OLLAMA_HOST=0.0.0.0"\n' +
        '# Add: Environment="OLLAMA_ORIGINS=*"\n' +
        'sudo systemctl restart ollama\n\n' +
        '# Team members connect from their machines\n' +
        'curl http://your-server-ip:11434/api/chat -d \'{\n' +
        '  "model": "llama3",\n' +
        '  "messages": [{"role": "user", "content": "Hello from remote"}],\n' +
        '  "stream": false\n' +
        '}\'\n\n' +
        '# Nginx reverse proxy with SSL (recommended)\n' +
        '# server {\n' +
        '#     listen 443 ssl;\n' +
        '#     server_name ollama.yourcompany.com;\n' +
        '#     ssl_certificate /etc/letsencrypt/live/ollama.yourcompany.com/fullchain.pem;\n' +
        '#     ssl_certificate_key /etc/letsencrypt/live/ollama.yourcompany.com/privkey.pem;\n' +
        '#     location / {\n' +
        '#         proxy_pass http://localhost:11434;\n' +
        '#         proxy_set_header Host \\$host;\n' +
        '#         proxy_buffering off;\n' +
        '#         proxy_read_timeout 300s;\n' +
        '#     }\n' +
        '# }'}</code></pre>

      {/* Docker Production */}
      <h2 style={sectionTitle}>{t.h2DockerProd}</h2>
      <p style={para}>{t.dockerProdDesc}</p>
      <pre style={codeBlock}><code>{'# docker-compose.yml for production\n' +
        'version: "3.8"\n' +
        'services:\n' +
        '  ollama:\n' +
        '    image: ollama/ollama:latest\n' +
        '    container_name: ollama\n' +
        '    restart: unless-stopped\n' +
        '    ports:\n' +
        '      - "11434:11434"\n' +
        '    volumes:\n' +
        '      - ollama_data:/root/.ollama\n' +
        '    environment:\n' +
        '      - OLLAMA_KEEP_ALIVE=15m\n' +
        '      - OLLAMA_NUM_PARALLEL=4\n' +
        '    deploy:\n' +
        '      resources:\n' +
        '        reservations:\n' +
        '          devices:\n' +
        '            - driver: nvidia\n' +
        '              count: all\n' +
        '              capabilities: [gpu]\n\n' +
        '  open-webui:\n' +
        '    image: ghcr.io/open-webui/open-webui:main\n' +
        '    container_name: open-webui\n' +
        '    restart: unless-stopped\n' +
        '    ports:\n' +
        '      - "3000:8080"\n' +
        '    volumes:\n' +
        '      - webui_data:/app/backend/data\n' +
        '    environment:\n' +
        '      - OLLAMA_BASE_URL=http://ollama:11434\n' +
        '    depends_on:\n' +
        '      - ollama\n\n' +
        'volumes:\n' +
        '  ollama_data:\n' +
        '  webui_data:'}</code></pre>
      <pre style={codeBlock}><code>{'# Deploy and pre-pull models\n' +
        'docker compose up -d\n\n' +
        '# Pull models for the team\n' +
        'docker exec ollama ollama pull llama3\n' +
        'docker exec ollama ollama pull codellama:13b\n' +
        'docker exec ollama ollama pull mistral\n\n' +
        '# Verify everything is running\n' +
        'docker compose ps\n' +
        'curl http://localhost:11434/api/tags  # list available models'}</code></pre>

      {/* Troubleshooting */}
      <h2 style={sectionTitle}>{t.h2Troubleshoot}</h2>
      <p style={para}>{t.troubleshootDesc}</p>
      <pre style={codeBlock}><code>{'# Problem: "Error: model requires more system memory"\n' +
        '# Solution: Use a smaller model or quantization\n' +
        'ollama run llama3:8b-instruct-q4_0  # smallest variant\n\n' +
        '# Problem: "connection refused" on localhost:11434\n' +
        '# Solution: Start the Ollama service\n' +
        'ollama serve              # macOS/Linux (foreground)\n' +
        'sudo systemctl start ollama  # Linux (background)\n\n' +
        '# Problem: Slow generation speed (CPU only)\n' +
        '# Solution: Verify GPU is being used\n' +
        'ollama ps  # check Processor column\n' +
        '# If showing "100% CPU", reinstall GPU drivers\n\n' +
        '# Problem: Model not found\n' +
        '# Solution: Check available models and pull\n' +
        'ollama list              # see downloaded models\n' +
        'ollama pull llama3       # download if missing\n\n' +
        '# Problem: CORS errors from web app\n' +
        '# Solution: Set OLLAMA_ORIGINS\n' +
        'OLLAMA_ORIGINS="http://localhost:3000" ollama serve\n\n' +
        '# Problem: Out of disk space\n' +
        '# Solution: Remove unused models and move storage\n' +
        'ollama rm unused-model\n' +
        'OLLAMA_MODELS=/mnt/large-drive/ollama ollama serve'}</code></pre>

      {/* Best Practices */}
      <h2 style={sectionTitle}>{t.h2BestPractices}</h2>
      <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
        <li>{t.bp6}</li>
        <li>{t.bp7}</li>
        <li>{t.bp8}</li>
        <li>{t.bp9}</li>
        <li>{t.bp10}</li>
      </ul>

      {/* FAQ */}
      <h2 style={sectionTitle}>{t.h2Faq}</h2>
      {[
        [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A], [t.faq4Q, t.faq4A],
        [t.faq5Q, t.faq5A], [t.faq6Q, t.faq6A], [t.faq7Q, t.faq7A], [t.faq8Q, t.faq8A],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
          <p style={{ marginBottom: 0, lineHeight: '1.7', color: '#374151' }}>{a}</p>
        </div>
      ))}
    </article>
  );
}
