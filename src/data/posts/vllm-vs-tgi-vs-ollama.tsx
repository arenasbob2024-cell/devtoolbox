'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'vLLM vs TGI vs Ollama: LLM Inference Engine Comparison',
    intro: 'vLLM, TGI (Text Generation Inference), and Ollama are three popular solutions for running large language models locally or on-premise. vLLM focuses on high-throughput serving, TGI is Hugging Face\'s production-ready inference server, while Ollama emphasizes simplicity for local development. This comparison examines their performance, features, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose vLLM for maximum throughput and production serving with PagedAttention optimization. Choose TGI for Hugging Face ecosystem integration and production deployment with robust features. Choose Ollama for simple local development and experimentation with minimal setup. All three enable running LLMs without cloud API dependencies.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'vLLM achieves highest throughput with PagedAttention',
    takeaway2: 'TGI offers production-ready serving from Hugging Face',
    takeaway3: 'Ollama provides simplest setup for local LLMs',
    takeaway4: 'All three support popular open-source models',
    takeaway5: 'vLLM and TGI excel at production serving',
    takeaway6: 'Ollama is ideal for development and experimentation',
    
    whatIsVLLMTitle: 'What is vLLM?',
    whatIsVLLMContent: 'vLLM is a high-throughput LLM serving engine developed by UC Berkeley researchers. Released in 2023, it introduces PagedAttention algorithm for efficient memory management, achieving near-optimal GPU utilization. vLLM is designed for production workloads requiring high throughput and low latency, supporting continuous batching and efficient KV cache management.',
    
    whatIsTGITitle: 'What is TGI (Text Generation Inference)?',
    whatIsTGIContent: 'Text Generation Inference (TGI) is Hugging Face\'s production-ready inference server for LLMs. Designed for deploying models from Hugging Face Hub, TGI supports quantization, tensor parallelism, and continuous batching. It powers Hugging Face Inference Endpoints and is used in production by many organizations for reliable LLM serving.',
    
    whatIsOllamaTitle: 'What is Ollama?',
    whatIsOllamaContent: 'Ollama is a simplified tool for running large language models locally. Released in 2023, it provides a Docker-like experience for LLMs with a simple CLI and REST API. Ollama bundles model weights, configuration, and runtime into a single package, making it extremely easy to run models like Llama 2, Mistral, and others on local machines.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Comparing inference performance and capabilities:',
    
    featuresTitle: 'Feature Matrix',
    featuresIntro: 'Detailed feature comparison:',
    
    codeExampleTitle: 'Usage Examples',
    codeExampleIntro: 'How to run and serve models:',
    
    vllmExampleTitle: 'vLLM Example',
    tgiExampleTitle: 'TGI Example',
    ollamaExampleTitle: 'Ollama Example',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'How to deploy and scale:',
    
    useCasesTitle: 'Best Use Cases',
    vllmBestFor: 'vLLM is Best For:',
    tgiBestFor: 'TGI is Best For:',
    ollamaBestFor: 'Ollama is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'vLLM, TGI, and Ollama serve different needs in the LLM inference landscape. vLLM is the choice for high-throughput production serving where performance is critical. TGI is ideal for organizations invested in the Hugging Face ecosystem needing production-ready deployment. Ollama excels for developers wanting simple local LLM development without infrastructure complexity. Many teams use Ollama for development and testing, then deploy with vLLM or TGI for production.',
    
    faq1q: 'Which has the best performance?',
    faq1a: 'vLLM generally achieves the highest throughput due to PagedAttention optimization, often 2-4x faster than other engines. TGI also offers excellent performance with continuous batching. Ollama is optimized for single-user scenarios rather than throughput. For production serving benchmarks, vLLM typically leads.',
    
    faq2q: 'Which is easiest to set up?',
    faq2a: 'Ollama is by far the easiest with a single command installation (curl or download). It handles model downloading and setup automatically. TGI requires Docker and some configuration. vLLM needs Python environment setup and more configuration. For beginners, Ollama is the recommended starting point.',
    
    faq3q: 'Can they run the same models?',
    faq3a: 'Yes, all three support popular models like Llama 2, Mistral, Falcon, and others in GGUF, safetensors, or other formats. TGI has best integration with Hugging Face Hub models. Ollama has a curated model library with easy pull commands. vLLM supports most Hugging Face models with some configuration.',
    
    faq4q: 'What about GPU requirements?',
    faq4a: 'All three support NVIDIA GPUs (CUDA). vLLM and TGI also support AMD GPUs. Ollama supports NVIDIA and AMD on Linux, Apple Silicon on macOS. vLLM requires more VRAM for optimal performance. Ollama with quantization can run on smaller GPUs. All support CPU-only mode for testing.',
    
    faq5q: 'Which is best for production?',
    faq5a: 'vLLM and TGI are both production-ready. vLLM excels at high-throughput scenarios with many concurrent requests. TGI offers more production features like monitoring, token streaming, and Hugging Face ecosystem integration. Ollama is more suited for development and personal use, though it can be used in production for lighter workloads.',
    
    faq6q: 'Do they support quantization?',
    faq6a: 'Yes, all three support quantization for running larger models on smaller GPUs. vLLM supports AWQ, GPTQ, and FP8 quantization. TGI supports bitsandbytes, GPTQ, and AWQ. Ollama uses GGUF quantization with various quantization levels (Q4, Q5, Q8, etc.). Quantization significantly reduces memory requirements.',
    
    faq7q: 'What about API compatibility?',
    faq7a: 'All three provide OpenAI-compatible APIs. vLLM offers an OpenAI-compatible server. TGI provides a REST API with OpenAI-compatible endpoints. Ollama has its own REST API and also an OpenAI-compatible endpoint. This makes switching between them and integrating with existing tools easier.',
    
    faq8q: 'Can I use them with LangChain or LlamaIndex?',
    faq8a: 'Yes, all three integrate with LangChain and LlamaIndex. LangChain has dedicated integrations for vLLM, TGI, and Ollama. LlamaIndex supports them through local LLM integrations. This makes it easy to build applications using any of these inference engines with popular frameworks.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'vLLM vs TGI vs Ollama：LLM 推理引擎对比',
    intro: 'vLLM、TGI（Text Generation Inference）和 Ollama 是在本地或本地部署运行大型语言模型的三个流行解决方案。vLLM 专注于高吞吐量服务，TGI 是 Hugging Face 的生产就绪推理服务器，而 Ollama 强调本地开发的简单性。本比较考察它们的性能、功能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为最大吞吐量和带有 PagedAttention 优化的生产服务选择 vLLM。为 Hugging Face 生态系统集成和具有强大功能的生产部署选择 TGI。为简单的本地开发和最小设置的实验选择 Ollama。这三者都能够在不依赖云 API 的情况下运行 LLM。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'vLLM 通过 PagedAttention 实现最高吞吐量',
    takeaway2: 'TGI 提供 Hugging Face 的生产就绪服务',
    takeaway3: 'Ollama 为本地 LLM 提供最简单的设置',
    takeaway4: '三者都支持流行的开源模型',
    takeaway5: 'vLLM 和 TGI 在生产服务方面表现出色',
    takeaway6: 'Ollama 适合开发和实验',
    
    whatIsVLLMTitle: '什么是 vLLM？',
    whatIsVLLMContent: 'vLLM 是由 UC Berkeley 研究人员开发的高吞吐量 LLM 服务引擎。2023 年发布，它引入了 PagedAttention 算法用于高效内存管理，实现接近最佳的 GPU 利用率。vLLM 为需要高吞吐量和低延迟的生产工作负载而设计，支持连续批处理和高效的 KV 缓存管理。',
    
    whatIsTGITitle: '什么是 TGI（Text Generation Inference）？',
    whatIsTGIContent: 'Text Generation Inference（TGI）是 Hugging Face 的生产就绪 LLM 推理服务器。专为从 Hugging Face Hub 部署模型而设计，TGI 支持量化、张量并行和连续批处理。它为 Hugging Face Inference Endpoints 提供支持，并被许多组织用于生产中的可靠 LLM 服务。',
    
    whatIsOllamaTitle: '什么是 Ollama？',
    whatIsOllamaContent: 'Ollama 是一个用于本地运行大型语言模型的简化工具。2023 年发布，它为 LLM 提供类似 Docker 的体验，具有简单的 CLI 和 REST API。Ollama 将模型权重、配置和运行时打包成一个包，使得在本地机器上运行 Llama 2、Mistral 等模型变得极其容易。',
    
    performanceTitle: '性能对比',
    performanceIntro: '比较推理性能和能力：',
    
    featuresTitle: '功能矩阵',
    featuresIntro: '详细功能比较：',
    
    codeExampleTitle: '使用示例',
    codeExampleIntro: '如何运行和服务模型：',
    
    vllmExampleTitle: 'vLLM 示例',
    tgiExampleTitle: 'TGI 示例',
    ollamaExampleTitle: 'Ollama 示例',
    
    deploymentTitle: '部署选项',
    deploymentIntro: '如何部署和扩展：',
    
    useCasesTitle: '最佳用例',
    vllmBestFor: 'vLLM 最适合：',
    tgiBestFor: 'TGI 最适合：',
    ollamaBestFor: 'Ollama 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'vLLM、TGI 和 Ollama 在 LLM 推理领域中服务于不同的需求。vLLM 是性能关键的高吞吐量生产服务的选择。TGI 是投入 Hugging Face 生态系统并需要生产就绪部署的组织的理想选择。Ollama 为希望进行简单本地 LLM 开发而无基础设施复杂性的开发者提供了出色的解决方案。许多团队使用 Ollama 进行开发和测试，然后使用 vLLM 或 TGI 进行生产部署。',
    
    faq1q: '哪个性能最好？',
    faq1a: '由于 PagedAttention 优化，vLLM 通常实现最高吞吐量，通常比其他引擎快 2-4 倍。TGI 通过连续批处理也提供出色的性能。Ollama 针对单用户场景而非吞吐量进行了优化。对于生产服务基准测试，vLLM 通常领先。',
    
    faq2q: '哪个最容易设置？',
    faq2a: 'Ollama 是最简单的，只需一个命令安装（curl 或下载）。它自动处理模型下载和设置。TGI 需要 Docker 和一些配置。vLLM 需要 Python 环境设置和更多配置。对于初学者，Ollama 是推荐的起点。',
    
    faq3q: '它们可以运行相同的模型吗？',
    faq3a: '是的，三者都支持 GGUF、safetensors 或其他格式的流行模型，如 Llama 2、Mistral、Falcon 等。TGI 与 Hugging Face Hub 模型集成最好。Ollama 有精选的模型库和简单的拉取命令。vLLM 通过一些配置支持大多数 Hugging Face 模型。',
    
    faq4q: 'GPU 要求如何？',
    faq4a: '三者都支持 NVIDIA GPU（CUDA）。vLLM 和 TGI 也支持 AMD GPU。Ollama 在 Linux 上支持 NVIDIA 和 AMD，在 macOS 上支持 Apple Silicon。vLLM 需要更多 VRAM 以获得最佳性能。带量化的 Ollama 可以在较小的 GPU 上运行。所有都支持仅 CPU 模式用于测试。',
    
    faq5q: '哪个最适合生产？',
    faq5a: 'vLLM 和 TGI 都是生产就绪的。vLLM 在具有许多并发请求的高吞吐量场景中表现出色。TGI 提供更多生产功能，如监控、token 流式传输和 Hugging Face 生态系统集成。Ollama 更适合开发和个人使用，尽管可以用于较轻工作负载的生产。',
    
    faq6q: '它们支持量化吗？',
    faq6a: '是的，三者都支持量化以便在较小的 GPU 上运行较大的模型。vLLM 支持 AWQ、GPTQ 和 FP8 量化。TGI 支持 bitsandbytes、GPTQ 和 AWQ。Ollama 使用 GGUF 量化，具有各种量化级别（Q4、Q5、Q8 等）。量化显著减少内存需求。',
    
    faq7q: 'API 兼容性如何？',
    faq7a: '三者都提供 OpenAI 兼容的 API。vLLM 提供 OpenAI 兼容的服务器。TGI 提供 REST API 和 OpenAI 兼容的端点。Ollama 有自己的 REST API 和 OpenAI 兼容的端点。这使得在它们之间切换和与现有工具集成更容易。',
    
    faq8q: '我可以将它们与 LangChain 或 LlamaIndex 一起使用吗？',
    faq8a: '是的，三者都与 LangChain 和 LlamaIndex 集成。LangChain 有针对 vLLM、TGI 和 Ollama 的专门集成。LlamaIndex 通过本地 LLM 集成支持它们。这使得使用任何这些推理引擎与流行框架构建应用变得容易。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function VLLMVsTGIVsOllama({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsVLLMTitle}</h3>
      <p style={pStyle}>{ct.whatIsVLLMContent}</p>

      <h3 style={h3Style}>{ct.whatIsTGITitle}</h3>
      <p style={pStyle}>{ct.whatIsTGIContent}</p>

      <h3 style={h3Style}>{ct.whatIsOllamaTitle}</h3>
      <p style={pStyle}>{ct.whatIsOllamaContent}</p>

      {/* Performance Comparison */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>vLLM</th>
              <th style={thStyle}>TGI</th>
              <th style={thStyle}>Ollama</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心优势' : 'Core Strength', isZh ? '高吞吐量' : 'High throughput', isZh ? '生产就绪' : 'Production-ready', isZh ? '简单易用' : 'Simplicity'],
              [isZh ? '关键算法' : 'Key Algorithm', 'PagedAttention', isZh ? '连续批处理' : 'Continuous batching', isZh ? 'GGUF 量化' : 'GGUF quantization'],
              [isZh ? '吞吐量' : 'Throughput', isZh ? '最高' : 'Highest', isZh ? '高' : 'High', isZh ? '中等' : 'Moderate'],
              [isZh ? '设置复杂度' : 'Setup Complexity', isZh ? '中等' : 'Medium', isZh ? '中等' : 'Medium', isZh ? '低' : 'Low'],
              [isZh ? '生产就绪' : 'Production Ready', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes', isZh ? '有限' : 'Limited'],
              [isZh ? 'GPU 支持' : 'GPU Support', 'NVIDIA, AMD', 'NVIDIA, AMD', 'NVIDIA, AMD, Apple'],
              [isZh ? '量化支持' : 'Quantization', 'AWQ, GPTQ, FP8', 'bitsandbytes, GPTQ, AWQ', 'GGUF (Q4-Q8)'],
            ].map(([feature, vllm, tgi, ollama], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{vllm}</td>
                <td style={tdStyle}>{tgi}</td>
                <td style={tdStyle}>{ollama}</td>
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
              <th style={thStyle}>vLLM</th>
              <th style={thStyle}>TGI</th>
              <th style={thStyle}>Ollama</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'OpenAI API 兼容' : 'OpenAI API Compatible', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '流式输出' : 'Streaming', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '张量并行' : 'Tensor Parallelism', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes', isZh ? '否' : 'No'],
              [isZh ? '流水线并行' : 'Pipeline Parallelism', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes', isZh ? '否' : 'No'],
              [isZh ? '连续批处理' : 'Continuous Batching', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes', isZh ? '否' : 'No'],
              [isZh ? '模型格式' : 'Model Formats', 'safetensors', 'safetensors, GGUF', 'GGUF'],
              [isZh ? '分布式' : 'Distributed', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported', isZh ? '否' : 'No'],
              [isZh ? '监控' : 'Monitoring', 'Prometheus', 'Prometheus', isZh ? '基础' : 'Basic'],
            ].map(([cap, vllm, tgi, ollama], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{vllm}</td>
                <td style={tdStyle}>{tgi}</td>
                <td style={tdStyle}>{ollama}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#06b6d4' }}>{ct.vllmExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# vLLM: High-Throughput Serving

# Install vLLM
pip install vllm

# Start OpenAI-compatible server
python -m vllm.entrypoints.openai.api_server \\
    --model meta-llama/Llama-2-7b-chat-hf \\
    --host 0.0.0.0 \\
    --port 8000 \\
    --tensor-parallel-size 2

# Python client
from vllm import LLM, SamplingParams

# Initialize vLLM engine
llm = LLM(
    model="meta-llama/Llama-2-7b-chat-hf",
    tensor_parallel_size=2,  # Multi-GPU
    gpu_memory_utilization=0.9,
)

# Batch inference with vLLM
prompts = [
    "Hello, my name is",
    "The president of the United States is",
    "The capital of France is",
]

sampling_params = SamplingParams(
    temperature=0.7,
    top_p=0.9,
    max_tokens=100,
)

outputs = llm.generate(prompts, sampling_params)

for output in outputs:
    print(f"Prompt: \\{output.prompt\\}")
    print(f"Generated: \\{output.outputs[0].text\\}")

# Using OpenAI-compatible API
import openai

client = openai.OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="dummy",
)

response = client.chat.completions.create(
    model="meta-llama/Llama-2-7b-chat-hf",
    messages=[
        \\{"role": "user", "content": "Write a haiku about coding"\\}
    ],
    stream=True,
)

for chunk in response:
    print(chunk.choices[0].delta.content, end="")`}</code></pre>

      <h3 style={{ ...h3Style, color: '#fbbf24' }}>{ct.tgiExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# TGI: Production Serving with Docker

# Launch TGI container
docker run --gpus all --shm-size 1g -p 8080:80 \\
  ghcr.io/huggingface/text-generation-inference:latest \\
  --model-id meta-llama/Llama-2-7b-chat-hf \\
  --quantize bitsandbytes-nf4

# Or with multiple GPUs
docker run --gpus '"device=0,1"' --shm-size 1g -p 8080:80 \\
  ghcr.io/huggingface/text-generation-inference:latest \\
  --model-id meta-llama/Llama-2-70b-chat-hf \\
  --num-shard 2

# Python client
import requests

# Generate text
response = requests.post(
    "http://localhost:8080/generate",
    json={
        "inputs": "What is deep learning?",
        "parameters": {
            "max_new_tokens": 200,
            "temperature": 0.7,
            "top_p": 0.9,
            "do_sample": True,
        },
    },
)

print(response.json())

# Streaming with SSE
import sseclient

stream_response = requests.post(
    "http://localhost:8080/generate_stream",
    json={
        "inputs": "Tell me a story",
        "parameters": \\{"max_new_tokens": 500\\},
    },
    stream=True,
)

client = sseclient.SSEClient(stream_response)
for event in client.events():
    print(event.data, end="", flush=True)

# OpenAI-compatible endpoint
import openai

client = openai.OpenAI(
    base_url="http://localhost:8080/v1",
    api_key="dummy",
)

response = client.chat.completions.create(
    model="tgi",
    messages=[
        \\{"role": "user", "content": "Explain quantum computing"\\}
    ],
    stream=True,
)`}</code></pre>

      <h3 style={{ ...h3Style, color: '#6366f1' }}>{ct.ollamaExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Ollama: Simple Local LLMs

# Install (macOS/Linux)
curl -fsSL https://ollama.com/install.sh | sh

# Or download from ollama.com

# Pull and run a model
ollama pull llama2
ollama run llama2

# Pull other models
ollama pull mistral
ollama pull codellama
ollama pull llava  # Multimodal

# CLI interaction
\\$ ollama run llama2
>>> Write a haiku about programming
Lines of code cascade,
Logic flows through midnight hours,
Bugs become features.

# REST API
curl http://localhost:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "Why is the sky blue?"
}'

# Streaming API
curl http://localhost:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "Tell me a joke",
  "stream": true
}'

# Python client
import requests

response = requests.post(
    "http://localhost:11434/api/chat",
    json={
        "model": "llama2",
        "messages": [
            \\{"role": "user", "content": "Hello!"\\}
        ],
        "stream": False,
    },
)

print(response.json()["message"]["content"])

# With LangChain
from langchain_community.llms import Ollama

llm = Ollama(model="llama2")
response = llm.invoke("What is the meaning of life?")

# OpenAI-compatible endpoint (port 11434/v1)
import openai

client = openai.OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",
)

response = client.chat.completions.create(
    model="llama2",
    messages=[
        \\{"role": "user", "content": "Hello!"\\}
    ],
)`}</code></pre>

      {/* Deployment */}
      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #06b6d4' }}>
          <strong style={{ color: '#06b6d4' }}>vLLM</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '通过 pip 安装，可以作为独立服务器运行或嵌入 Python 应用。支持 Kubernetes 部署，与 Ray 集成用于分布式推理。适合需要自定义部署和高性能的生产环境。' : 'Install via pip, run as standalone server or embed in Python apps. Supports Kubernetes deployment, integrates with Ray for distributed inference. Ideal for production requiring custom deployment and high performance.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #fbbf24' }}>
          <strong style={{ color: '#fbbf24' }}>TGI</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '主要作为 Docker 容器部署。与 Kubernetes 良好集成，支持 Hugging Face Hub 模型自动下载。企业级部署选项，包括监控和日志。Hugging Face Inference Endpoints 的核心引擎。' : 'Primarily deployed as Docker container. Integrates well with Kubernetes, supports automatic Hugging Face Hub model download. Enterprise deployment options including monitoring and logging. Powers Hugging Face Inference Endpoints.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #6366f1' }}>
          <strong style={{ color: '#6366f1' }}>Ollama</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '通过脚本或应用安装，作为系统服务运行。模型存储在本地，通过简单命令管理。适合个人开发、原型和轻量生产部署。支持 macOS、Linux 和 Windows（预览）。' : 'Install via script or app, runs as system service. Models stored locally, managed via simple commands. Perfect for personal development, prototyping, and light production. Supports macOS, Linux, and Windows (preview).'}
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #06b6d4' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#06b6d4' }}>{ct.vllmBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '高并发生产服务' : 'High-concurrency production serving'}</li>
            <li>{isZh ? '批量推理任务' : 'Batch inference tasks'}</li>
            <li>{isZh ? '需要最大吞吐量' : 'Maximum throughput needs'}</li>
            <li>{isZh ? '多 GPU 部署' : 'Multi-GPU deployments'}</li>
            <li>{isZh ? '自定义推理管道' : 'Custom inference pipelines'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #fbbf24' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#fbbf24' }}>{ct.tgiBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Hugging Face 生态系统' : 'Hugging Face ecosystem'}</li>
            <li>{isZh ? '企业生产部署' : 'Enterprise production'}</li>
            <li>{isZh ? '容器化环境' : 'Containerized environments'}</li>
            <li>{isZh ? '需要监控和日志' : 'Monitoring and logging needs'}</li>
            <li>{isZh ? 'Kubernetes 部署' : 'Kubernetes deployments'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #6366f1' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#6366f1' }}>{ct.ollamaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '本地开发和测试' : 'Local development & testing'}</li>
            <li>{isZh ? '个人项目和实验' : 'Personal projects & experimentation'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '离线 LLM 使用' : 'Offline LLM usage'}</li>
            <li>{isZh ? '学习和教育' : 'Learning and education'}</li>
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
