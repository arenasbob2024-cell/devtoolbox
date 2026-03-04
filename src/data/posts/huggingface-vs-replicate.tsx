'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Hugging Face vs Replicate: ML Model Platform Comparison',
    intro: 'Hugging Face and Replicate are two leading platforms for deploying and using machine learning models. Hugging Face focuses on open-source model hosting, datasets, and ML tooling, while Replicate specializes in easy model deployment and API access. This comparison examines their offerings, pricing, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Hugging Face for open-source models, datasets, and ML community resources. Choose Replicate for simple API deployment of ML models without infrastructure management. Both platforms make ML accessible but serve different needs: Hugging Face for experimentation and open-source, Replicate for production deployment.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Hugging Face hosts the largest open-source model repository',
    takeaway2: 'Replicate offers zero-infrastructure model deployment',
    takeaway3: 'Hugging Face provides datasets, demos, and ML tooling',
    takeaway4: 'Replicate focuses on simple, scalable API access',
    takeaway5: 'Both support custom model deployment',
    takeaway6: 'Hugging Face has stronger community and open-source focus',
    
    whatIsHuggingFaceTitle: 'What is Hugging Face?',
    whatIsHuggingFaceContent: 'Hugging Face is an AI community and platform hosting hundreds of thousands of open-source models, datasets, and ML applications. Founded in 2016, it provides Transformers library, model hub, datasets hub, Spaces for demos, and Inference API. Hugging Face is central to the open-source ML ecosystem with strong community engagement.',
    
    whatIsReplicateTitle: 'What is Replicate?',
    whatIsReplicateContent: 'Replicate is a platform for running machine learning models in the cloud without managing infrastructure. Founded in 2019, it allows developers to deploy models as APIs with a single command. Replicate handles scaling, GPU management, and provides a simple pay-per-second pricing model for running ML models.',
    
    performanceTitle: 'Platform Comparison',
    performanceIntro: 'Comparing core platform features:',
    
    featuresTitle: 'Feature Matrix',
    featuresIntro: 'Detailed feature comparison:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'API usage patterns:',
    
    huggingfaceExampleTitle: 'Hugging Face Example',
    replicateExampleTitle: 'Replicate Example',
    
    deploymentTitle: 'Model Deployment',
    deploymentIntro: 'How to deploy and run models:',
    
    useCasesTitle: 'Best Use Cases',
    huggingfaceBestFor: 'Hugging Face is Best For:',
    replicateBestFor: 'Replicate is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Hugging Face and Replicate serve different but complementary roles in the ML ecosystem. Hugging Face is the go-to platform for open-source models, datasets, and ML experimentation with a vibrant community. Replicate excels at making model deployment simple and production-ready with zero infrastructure management. Many teams use both: Hugging Face for discovering and experimenting with models, and Replicate for production deployment.',
    
    faq1q: 'Can I use models from Hugging Face on Replicate?',
    faq1a: 'Yes, you can deploy Hugging Face models on Replicate. Replicate supports importing models from Hugging Face Hub. Many popular Hugging Face models are already available on Replicate, and you can create custom deployments for others.',
    
    faq2q: 'Which is more cost-effective?',
    faq2a: 'Hugging Face offers free tier for inference and competitive pricing for dedicated instances. Replicate charges per-second of GPU time. For light usage, Hugging Face free tier is cost-effective. For production workloads, compare specific model costs. Both offer predictable pricing.',
    
    faq3q: 'What about model variety?',
    faq3a: 'Hugging Face has the largest collection with 500K+ models across all ML domains. Replicate has a curated selection of popular models. If you need cutting-edge or niche models, Hugging Face is better. For production-ready popular models, both platforms have good coverage.',
    
    faq4q: 'How do they handle scaling?',
    faq4a: 'Replicate automatically scales from zero to handle traffic spikes, with cold starts for initial requests. Hugging Face Inference Endpoints provides dedicated, auto-scaling infrastructure with lower latency. Both handle scaling well but with different approaches.',
    
    faq5q: 'Can I deploy custom models?',
    faq5a: 'Both platforms support custom models. Hugging Face allows uploading any model compatible with their libraries. Replicate uses Cog to package models in Docker containers. Hugging Face is easier for standard frameworks, Replicate offers more flexibility for custom setups.',
    
    faq6q: 'What about private models?',
    faq6a: 'Both support private models. Hugging Face Pro accounts offer private model repositories. Replicate allows private models with access control. For enterprise use, both offer dedicated solutions with enhanced security features.',
    
    faq7q: 'Which has better documentation?',
    faq7a: 'Hugging Face has extensive documentation, tutorials, and course materials, benefiting from its large community. Replicate has focused, clear documentation for deployment and API usage. Both are well-documented but serve different audiences.',
    
    faq8q: 'What about GPU options?',
    faq8a: 'Replicate offers various GPU types (T4, A40, A100) with pay-per-second pricing. Hugging Face Inference Endpoints provides GPU choices with dedicated instances. Hugging Face also offers CPU inference for lighter workloads. Both support high-end GPUs for demanding models.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Hugging Face vs Replicate：ML 模型平台对比',
    intro: 'Hugging Face 和 Replicate 是部署和使用机器学习模型的两个领先平台。Hugging Face 专注于开源模型托管、数据集和 ML 工具，而 Replicate 专注于简单的模型部署和 API 访问。本比较考察它们的产品、定价和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为开源模型、数据集和 ML 社区资源选择 Hugging Face。为无需基础设施管理的简单 ML 模型 API 部署选择 Replicate。两个平台都使 ML 变得可访问但服务于不同需求：Hugging Face 用于实验和开源，Replicate 用于生产部署。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Hugging Face 托管最大的开源模型仓库',
    takeaway2: 'Replicate 提供零基础设施模型部署',
    takeaway3: 'Hugging Face 提供数据集、演示和 ML 工具',
    takeaway4: 'Replicate 专注于简单、可扩展的 API 访问',
    takeaway5: '两者都支持自定义模型部署',
    takeaway6: 'Hugging Face 具有更强的社区和开源关注',
    
    whatIsHuggingFaceTitle: '什么是 Hugging Face？',
    whatIsHuggingFaceContent: 'Hugging Face 是一个 AI 社区和平台，托管数十万个开源模型、数据集和 ML 应用。成立于 2016 年，它提供 Transformers 库、模型中心、数据集中心、演示空间和推理 API。Hugging Face 是开源 ML 生态系统的中心，拥有强大的社区参与。',
    
    whatIsReplicateTitle: '什么是 Replicate？',
    whatIsReplicateContent: 'Replicate 是一个在云中运行机器学习模型的平台，无需管理基础设施。成立于 2019 年，它允许开发者通过单个命令将模型部署为 API。Replicate 处理扩展、GPU 管理，并为运行 ML 模型提供简单的按秒计费模式。',
    
    performanceTitle: '平台对比',
    performanceIntro: '比较核心平台功能：',
    
    featuresTitle: '功能矩阵',
    featuresIntro: '详细功能比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: 'API 使用模式：',
    
    huggingfaceExampleTitle: 'Hugging Face 示例',
    replicateExampleTitle: 'Replicate 示例',
    
    deploymentTitle: '模型部署',
    deploymentIntro: '如何部署和运行模型：',
    
    useCasesTitle: '最佳用例',
    huggingfaceBestFor: 'Hugging Face 最适合：',
    replicateBestFor: 'Replicate 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Hugging Face 和 Replicate 在 ML 生态系统中服务于不同但互补的角色。Hugging Face 是开源模型、数据集和 ML 实验的首选平台，拥有活跃的社区。Replicate 在使模型部署简单和生产就绪方面表现出色，零基础设施管理。许多团队同时使用两者：Hugging Face 用于发现和实验模型，Replicate 用于生产部署。',
    
    faq1q: '我可以在 Replicate 上使用 Hugging Face 的模型吗？',
    faq1a: '是的，你可以在 Replicate 上部署 Hugging Face 模型。Replicate 支持从 Hugging Face Hub 导入模型。许多流行的 Hugging Face 模型已经在 Replicate 上可用，你可以为其他模型创建自定义部署。',
    
    faq2q: '哪个更具成本效益？',
    faq2a: 'Hugging Face 为推理提供免费层，专用实例定价有竞争力。Replicate 按 GPU 使用秒数收费。对于轻度使用，Hugging Face 免费层具有成本效益。对于生产工作负载，比较特定模型成本。两者都提供可预测的定价。',
    
    faq3q: '模型种类如何？',
    faq3a: 'Hugging Face 拥有最大的集合，涵盖所有 ML 领域的 50 万+ 模型。Replicate 拥有精选的流行模型。如果你需要前沿或小众模型，Hugging Face 更好。对于生产就绪的流行模型，两个平台都有良好的覆盖。',
    
    faq4q: '它们如何处理扩展？',
    faq4a: 'Replicate 自动从零扩展以处理流量峰值，初始请求有冷启动。Hugging Face Inference Endpoints 提供专用的、自动扩展的基础设施，延迟更低。两者都很好地处理扩展但方法不同。',
    
    faq5q: '我可以部署自定义模型吗？',
    faq5a: '两个平台都支持自定义模型。Hugging Face 允许上传与其库兼容的任何模型。Replicate 使用 Cog 将模型打包在 Docker 容器中。Hugging Face 对标准框架更容易，Replicate 为自定义设置提供更多灵活性。',
    
    faq6q: '私有模型如何？',
    faq6a: '两者都支持私有模型。Hugging Face Pro 帐户提供私有模型仓库。Replicate 允许带访问控制的私有模型。对于企业使用，两者都提供具有增强安全功能的专用解决方案。',
    
    faq7q: '哪个文档更好？',
    faq7a: 'Hugging Face 拥有广泛的文档、教程和课程材料，受益于其庞大的社区。Replicate 有针对部署和 API 使用的专注、清晰的文档。两者都有良好的文档但服务于不同的受众。',
    
    faq8q: 'GPU 选项如何？',
    faq8a: 'Replicate 提供各种 GPU 类型（T4、A40、A100），按秒计费。Hugging Face Inference Endpoints 提供带专用实例的 GPU 选择。Hugging Face 还为较轻的工作负载提供 CPU 推理。两者都支持高端 GPU 用于需求高的模型。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function HuggingFaceVsReplicate({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsHuggingFaceTitle}</h3>
      <p style={pStyle}>{ct.whatIsHuggingFaceContent}</p>

      <h3 style={h3Style}>{ct.whatIsReplicateTitle}</h3>
      <p style={pStyle}>{ct.whatIsReplicateContent}</p>

      {/* Comparison Table */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Hugging Face</th>
              <th style={thStyle}>Replicate</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心定位' : 'Core Focus', isZh ? '开源社区和模型托管' : 'Open-source community & hosting', isZh ? '模型部署和 API' : 'Model deployment & APIs'],
              [isZh ? '模型数量' : 'Model Count', '500K+ models', '100+ curated models'],
              [isZh ? '部署方式' : 'Deployment', isZh ? '托管推理' : 'Hosted inference', isZh ? 'API 部署' : 'API deployment'],
              [isZh ? '基础设施' : 'Infrastructure', isZh ? '共享/专用' : 'Shared/Dedicated', isZh ? '完全托管' : 'Fully managed'],
              [isZh ? '数据集' : 'Datasies', '100K+ datasets', isZh ? '无' : 'No'],
              [isZh ? '社区' : 'Community', isZh ? '大型活跃社区' : 'Large active community', isZh ? '开发者社区' : 'Developer community'],
              [isZh ? '开源重点' : 'Open Source', isZh ? '强' : 'Strong', isZh ? '中等' : 'Moderate'],
            ].map(([feature, hf, replicate], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{hf}</td>
                <td style={tdStyle}>{replicate}</td>
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
              <th style={thStyle}>Hugging Face</th>
              <th style={thStyle}>Replicate</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '模型托管' : 'Model Hosting', isZh ? '免费/付费' : 'Free/Paid', isZh ? '按使用付费' : 'Pay-per-use'],
              [isZh ? '推理 API' : 'Inference API', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '自动扩展' : 'Auto-scaling', 'Endpoints', isZh ? '内置' : 'Built-in'],
              [isZh ? '自定义模型' : 'Custom Models', isZh ? '支持' : 'Supported', isZh ? '支持 (Cog)' : 'Supported (Cog)'],
              [isZh ? '演示空间' : 'Demo Spaces', 'Spaces (Gradio/Streamlit)', isZh ? '无' : 'No'],
              [isZh ? '版本控制' : 'Versioning', 'Git-based', isZh ? '模型版本' : 'Model versions'],
              [isZh ? 'GPU 类型' : 'GPU Types', 'T4, A10G, A100', 'T4, A40, A100'],
              [isZh ? '冷启动' : 'Cold Starts', isZh ? '专用实例无冷启动' : 'No cold starts (dedicated)', '5-60 seconds'],
            ].map(([cap, hf, replicate], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{hf}</td>
                <td style={tdStyle}>{replicate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#ffcc00' }}>{ct.huggingfaceExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Hugging Face Inference API
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HF_API_KEY);

// Text generation
const textResult = await hf.textGeneration({
  model: 'meta-llama/Llama-2-7b-chat-hf',
  inputs: 'Write a poem about AI',
  parameters: {
    max_new_tokens: 200,
    temperature: 0.7,
  },
});

console.log(textResult.generated_text);

// Image generation (Stable Diffusion)
const imageResult = await hf.textToImage({
  model: 'stabilityai/stable-diffusion-2-1',
  inputs: 'A futuristic cityscape at sunset',
});

// Save the image
const blob = imageResult;
const url = URL.createObjectURL(blob);

// Using dedicated Inference Endpoints
const endpoint = await hf.endpointCreation({
  repository: 'meta-llama/Llama-2-70b-chat-hf',
  accelerator: 'gpu',
  instanceType: 'nvidia-a100',
  minReplica: 0, // Scale to zero
  maxReplica: 4,
});

// Custom model with Transformers.js
import { pipeline } from '@xenova/transformers';

const generator = await pipeline(
  'text-generation',
  'Xenova/llama-2-7b-chat.Q4_K_M.gguf'
);

const output = await generator('Hello, world!', {
  max_new_tokens: 50,
});`}</code></pre>

      <h3 style={{ ...h3Style, color: '#000000' }}>{ct.replicateExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Replicate API
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Run a model
const output = await replicate.run(
  'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
  {
    input: {
      prompt: 'A futuristic cityscape at sunset',
      width: 1024,
      height: 1024,
    },
  }
);

console.log(output); // Array of image URLs

// Run with webhook for async processing
const prediction = await replicate.predictions.create({
  version: '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
  input: {
    prompt: 'An astronaut riding a horse',
  },
  webhook: 'https://example.com/webhook',
  webhook_events_filter: ['completed'],
});

// Check prediction status
const result = await replicate.predictions.get(prediction.id);
console.log(result.status); // 'starting', 'processing', 'succeeded', 'failed'

// Stream output for supported models
for await (const event of replicate.stream('replicate/llama-2-70b-chat', {
  input: {
    prompt: 'Write a story about robots',
  },
})) {
  process.stdout.write(event.toString());
}

// Deploy custom model with Cog
// cog.yaml:
/*
build:
  gpu: true
  python_version: "3.10"
  python_packages:
    - "torch==2.0.1"
    - "transformers==4.30.0"
predict: "predict.py:Predictor"
*/

// predict.py:
/*
from cog import BasePredictor, Input
import torch

class Predictor(BasePredictor):
    def setup(self):
        self.model = load_model()
    
    def predict(self, text: str = Input(description="Input text")):
        return self.model.generate(text)
*/`}</code></pre>

      {/* Deployment */}
      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ffcc00' }}>
          <strong style={{ color: '#ffcc00' }}>Hugging Face</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '通过 Hub 上传模型，使用 Inference API 快速测试，或创建 Inference Endpoints 用于生产。支持 AutoTrain 进行自定义训练。Spaces 允许创建交互式演示。' : 'Upload models via Hub, use Inference API for quick testing, or create Inference Endpoints for production. Supports AutoTrain for custom training. Spaces allow interactive demos.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #000000' }}>
          <strong style={{ color: '#000000' }}>Replicate</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '使用 Cog 打包模型为 Docker 容器，通过 push 命令部署。Replicate 自动处理扩展、负载均衡和 GPU 管理。支持 webhook 用于异步处理。' : 'Package models with Cog into Docker containers, deploy via push command. Replicate automatically handles scaling, load balancing, and GPU management. Supports webhooks for async processing.'}
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ffcc00' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ffcc00' }}>{ct.huggingfaceBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '模型发现和实验' : 'Model discovery & experimentation'}</li>
            <li>{isZh ? '开源项目' : 'Open-source projects'}</li>
            <li>{isZh ? '数据集访问' : 'Dataset access'}</li>
            <li>{isZh ? 'ML 研究和原型' : 'ML research & prototyping'}</li>
            <li>{isZh ? '社区协作' : 'Community collaboration'}</li>
            <li>{isZh ? '创建模型演示' : 'Creating model demos'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #000000' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#000000' }}>{ct.replicateBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '生产模型部署' : 'Production model deployment'}</li>
            <li>{isZh ? '简单的 ML API' : 'Simple ML APIs'}</li>
            <li>{isZh ? '无需基础设施管理' : 'No infrastructure management'}</li>
            <li>{isZh ? '快速原型到生产' : 'Rapid prototype to production'}</li>
            <li>{isZh ? '可变工作负载' : 'Variable workloads'}</li>
            <li>{isZh ? '自定义模型托管' : 'Custom model hosting'}</li>
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
