'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Midjourney vs Dify: AI Image Generation Platform Comparison',
    intro: 'Midjourney and Dify represent two different approaches to AI-powered visual creation. Midjourney is a specialized AI image generator accessed through Discord, while Dify is an open-source LLM application development platform that includes image generation capabilities. This comparison examines their strengths for different use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Midjourney for artistic, high-quality image generation with minimal setup. Choose Dify for building customizable AI applications with integrated image generation, LLM features, and complete workflow control. Midjourney excels at creative visuals; Dify at application development.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Midjourney produces superior artistic quality images',
    takeaway2: 'Dify offers open-source, self-hosted solution',
    takeaway3: 'Midjourney uses Discord-based interface',
    takeaway4: 'Dify integrates multiple AI models and providers',
    takeaway5: 'Dify provides complete workflow orchestration',
    takeaway6: 'Midjourney requires subscription, Dify is free to self-host',
    
    whatIsMidjourneyTitle: 'What is Midjourney?',
    whatIsMidjourneyContent: 'Midjourney is an independent research lab producing a proprietary AI image generator. Launched in 2022, it creates high-quality artistic images from text prompts through a Discord-based interface. Midjourney is known for distinctive artistic styles and consistent high-quality output, popular among artists and designers.',
    
    whatIsDifyTitle: 'What is Dify?',
    whatIsDifyContent: 'Dify is an open-source LLM application development platform founded in 2023. It provides a visual interface for building AI applications with integrated support for multiple LLM providers, image generation models (DALL-E, Stable Diffusion), RAG pipelines, and workflow orchestration. Dify enables self-hosted AI solutions.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Usage Examples',
    codeExampleIntro: 'Examples for both platforms:',
    
    midjourneyExampleTitle: 'Midjourney Prompt Examples',
    difyExampleTitle: 'Dify Workflow Configuration',
    
    useCasesTitle: 'Best Use Cases',
    midjourneyBestFor: 'Midjourney is Best For:',
    difyBestFor: 'Dify is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Midjourney and Dify serve fundamentally different needs in the AI space. Midjourney is the choice for artists and creators seeking stunning, artistic image generation with minimal complexity. Its Discord interface and subscription model work well for creative professionals. Dify is ideal for developers and organizations building custom AI applications with complete control over their infrastructure. Dify\'s open-source nature, multi-model support, and workflow capabilities make it a comprehensive platform for AI application development. Many teams use both: Midjourney for creative assets and Dify for building the underlying AI applications.',
    
    faq1q: 'Can Dify generate images like Midjourney?',
    faq1a: 'Dify integrates with Stable Diffusion and DALL-E for image generation. While capable, Midjourney generally produces more artistic and stylistically distinctive images. Dify\'s strength is in workflow integration and customization rather than pure image quality.',
    
    faq2q: 'Is Midjourney free to use?',
    faq2a: 'No, Midjourney requires a paid subscription. Plans start at $10/month for basic access. Dify is free to self-host, though you pay for underlying model API costs or compute for local models.',
    
    faq3q: 'Can I use Midjourney images commercially?',
    faq3a: 'Yes, paid Midjourney subscribers own the images they create and can use them commercially. However, review the latest terms as policies may evolve. Free trial users do not have commercial rights.',
    
    faq4q: 'What AI models does Dify support?',
    faq4a: 'Dify supports OpenAI (GPT-4, DALL-E), Anthropic Claude, Cohere, Hugging Face models, local LLMs via Ollama, and various Stable Diffusion implementations. This flexibility is a key advantage.',
    
    faq5q: 'How does the interface differ?',
    faq5a: 'Midjourney uses Discord for all interactions—you type prompts in Discord channels. Dify provides a web-based visual interface with drag-and-drop workflow building, API access, and team collaboration features.',
    
    faq6q: 'Can I integrate Midjourney into my application?',
    faq6a: 'Midjourney does not offer a public API. Unofficial integrations exist but violate terms of service. Dify provides full API access and is designed for application integration from the ground up.',
    
    faq7q: 'What about image consistency and style control?',
    faq7a: 'Midjourney offers style parameters, image prompts, and character references for consistency. Dify\'s image generation depends on the underlying model used (Stable Diffusion with LoRA, DALL-E, etc.).',
    
    faq8q: 'Which is better for enterprises?',
    faq8a: 'Dify is better for enterprises requiring self-hosted solutions, data privacy, and custom workflows. Midjourney works for creative teams but lacks enterprise features like SSO, audit logs, and private deployment.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Midjourney vs Dify：AI 图像生成平台对比',
    intro: 'Midjourney 和 Dify 代表了 AI 驱动视觉创作的两种不同方法。Midjourney 是通过 Discord 访问的专业 AI 图像生成器，而 Dify 是一个开源的 LLM 应用开发平台，包含图像生成能力。本比较从不同用例角度考察它们的优势。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为具有最少设置的艺术、高质量图像生成选择 Midjourney。为构建可定制的 AI 应用（集成图像生成、LLM 功能和完整工作流控制）选择 Dify。Midjourney 擅长创意视觉；Dify 擅长应用开发。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Midjourney 产生卓越的艺术质量图像',
    takeaway2: 'Dify 提供开源、自托管解决方案',
    takeaway3: 'Midjourney 使用基于 Discord 的界面',
    takeaway4: 'Dify 集成多个 AI 模型和提供商',
    takeaway5: 'Dify 提供完整的工作流编排',
    takeaway6: 'Midjourney 需要订阅，Dify 自托管免费',
    
    whatIsMidjourneyTitle: '什么是 Midjourney？',
    whatIsMidjourneyContent: 'Midjourney 是一个独立研究实验室，开发专有 AI 图像生成器。2022 年推出，通过基于 Discord 的界面从文本提示创建高质量艺术图像。Midjourney 以独特的艺术风格和一致的高质量输出而闻名，在艺术家和设计师中很受欢迎。',
    
    whatIsDifyTitle: '什么是 Dify？',
    whatIsDifyContent: 'Dify 是一个开源 LLM 应用开发平台，2023 年成立。它提供可视化界面构建 AI 应用，集成支持多个 LLM 提供商、图像生成模型（DALL-E、Stable Diffusion）、RAG 管道和工作流编排。Dify 支持自托管 AI 解决方案。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '使用示例',
    codeExampleIntro: '两个平台的示例：',
    
    midjourneyExampleTitle: 'Midjourney 提示示例',
    difyExampleTitle: 'Dify 工作流配置',
    
    useCasesTitle: '最佳用例',
    midjourneyBestFor: 'Midjourney 最适合：',
    difyBestFor: 'Dify 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Midjourney 和 Dify 在 AI 领域服务于根本不同的需求。Midjourney 是艺术家和创作者寻求惊艳、艺术性图像生成的选择，只需最少的复杂性。其 Discord 界面和订阅模式适合创意专业人士。Dify 是开发者和组织构建自定义 AI 应用并完全控制基础设施的理想选择。Dify 的开源性质、多模型支持和工作流能力使其成为 AI 应用开发的综合平台。许多团队同时使用两者：Midjourney 用于创意资产，Dify 用于构建底层 AI 应用。',
    
    faq1q: 'Dify 能生成像 Midjourney 一样的图像吗？',
    faq1a: 'Dify 集成 Stable Diffusion 和 DALL-E 进行图像生成。虽然有能力，但 Midjourney 通常产生更具艺术性和风格独特的图像。Dify 的优势在于工作流集成和定制，而非纯粹的图像质量。',
    
    faq2q: 'Midjourney 免费使用吗？',
    faq2a: '不，Midjourney 需要付费订阅。基本访问计划从 $10/月起。Dify 自托管免费，但你需支付底层模型 API 费用或本地模型的计算成本。',
    
    faq3q: '我可以商业使用 Midjourney 图像吗？',
    faq3a: '是的，付费 Midjourney 订阅者拥有他们创建的图像，可以商业使用。但是，请查看最新条款，因为政策可能会演变。免费试用用户没有商业权利。',
    
    faq4q: 'Dify 支持哪些 AI 模型？',
    faq4a: 'Dify 支持 OpenAI（GPT-4、DALL-E）、Anthropic Claude、Cohere、Hugging Face 模型、通过 Ollama 的本地 LLM，以及各种 Stable Diffusion 实现。这种灵活性是一个关键优势。',
    
    faq5q: '界面有什么不同？',
    faq5a: 'Midjourney 使用 Discord 进行所有交互——你在 Discord 频道中输入提示。Dify 提供基于 Web 的可视化界面，支持拖放式工作流构建、API 访问和团队协作功能。',
    
    faq6q: '我可以将 Midjourney 集成到我的应用中吗？',
    faq6a: 'Midjourney 不提供公共 API。存在非官方集成但违反服务条款。Dify 提供完整的 API 访问，并从一开始就为应用集成而设计。',
    
    faq7q: '图像一致性和风格控制怎么样？',
    faq7a: 'Midjourney 提供风格参数、图像提示和角色参考以保持一致性。Dify 的图像生成取决于使用的底层模型（带 LoRA 的 Stable Diffusion、DALL-E 等）。',
    
    faq8q: '哪个更适合企业？',
    faq8a: 'Dify 更适合需要自托管解决方案、数据隐私和自定义工作流的企业。Midjourney 适合创意团队，但缺乏 SSO、审计日志和私有部署等企业功能。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function MidjourneyVsDify({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsMidjourneyTitle}</h3>
      <p style={pStyle}>{ct.whatIsMidjourneyContent}</p>

      <h3 style={h3Style}>{ct.whatIsDifyTitle}</h3>
      <p style={pStyle}>{ct.whatIsDifyContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Midjourney</th>
              <th style={thStyle}>Dify</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心功能' : 'Core Function', isZh ? 'AI图像生成' : 'AI Image Generation', isZh ? 'LLM应用平台' : 'LLM App Platform'],
              [isZh ? '图像质量' : 'Image Quality', isZh ? '卓越艺术性' : 'Excellent artistic', isZh ? '取决于模型' : 'Depends on model'],
              [isZh ? '访问方式' : 'Access Method', 'Discord', isZh ? 'Web界面/API' : 'Web/API'],
              [isZh ? '开源性' : 'Open Source', isZh ? '否' : 'No', isZh ? '是' : 'Yes'],
              [isZh ? '自托管' : 'Self-hosted', isZh ? '不支持' : 'No', isZh ? '支持' : 'Yes'],
              [isZh ? 'API访问' : 'API Access', isZh ? '无官方API' : 'No official API', isZh ? '完整API' : 'Full API'],
              [isZh ? '多模型支持' : 'Multi-model', isZh ? '仅Midjourney' : 'Midjourney only', isZh ? '多个提供商' : 'Multiple providers'],
              [isZh ? '工作流编排' : 'Workflows', isZh ? '基础' : 'Basic', isZh ? '高级' : 'Advanced'],
            ].map(([feat, mj, dify], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feat}</td>
                <td style={tdStyle}>{mj}</td>
                <td style={tdStyle}>{dify}</td>
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
              <th style={thStyle}>Midjourney</th>
              <th style={thStyle}>Dify</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '文生图' : 'Text to Image', isZh ? '优秀' : 'Excellent', isZh ? '良好（依赖模型）' : 'Good (model dependent)'],
              [isZh ? '图生图' : 'Image to Image', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '风格一致性' : 'Style Consistency', isZh ? '强大（角色参考）' : 'Strong (character ref)', isZh ? '需要配置' : 'Needs config'],
              [isZh ? '批量生成' : 'Batch Generation', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '文本理解' : 'LLM Integration', isZh ? '有限' : 'Limited', isZh ? '核心功能' : 'Core feature'],
              [isZh ? 'RAG支持' : 'RAG Support', isZh ? '无' : 'No', isZh ? '内置' : 'Built-in'],
              [isZh ? '团队协作' : 'Team Collab', 'Discord', isZh ? '完整团队功能' : 'Full team features'],
              [isZh ? '部署控制' : 'Deployment', isZh ? '仅云端' : 'Cloud only', isZh ? '灵活' : 'Flexible'],
            ].map(([cap, mj, dify], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{mj}</td>
                <td style={tdStyle}>{dify}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#ff6b35' }}>{ct.midjourneyExampleTitle}</h3>
      <pre style={codeStyle}><code>{'# Midjourney Prompt Examples (Discord commands)\n\n# Basic generation\n/imagine prompt: A serene Japanese garden at sunset, \\\n  soft golden light filtering through maple trees, \\\n  koi pond with reflections, photorealistic, 8k\n\n# With aspect ratio and style\n/imagine prompt: Futuristic city skyline at night, \\\n  neon lights, cyberpunk aesthetic --ar 16:9 --v 6\n\n# Using image reference\n/imagine prompt: https://example.com/reference.jpg \\\n  Transform this into watercolor style --iw 0.8\n\n# Character reference for consistency\n/imagine prompt: Portrait of a warrior woman, \\\n  detailed armor --cref https://example.com/char.png\n\n# Style reference\n/imagine prompt: Mountain landscape --sref \\\n  https://example.com/style.jpg --sw 0.5\n\n# Advanced parameters\n/imagine prompt: Abstract geometric patterns, \\\n  bold colors --chaos 20 --stylize 750 --weird 500\n\n# Tileable pattern\n/imagine prompt: Seamless floral pattern, \\\n  art nouveau style --tile\n\n# Multi-prompt with weights\n/imagine prompt: forest::2 mist::1 mysterious::1.5 \\\n  ethereal lighting'}</code></pre>

      <h3 style={{ ...h3Style, color: '#155799' }}>{ct.difyExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// Dify Workflow Configuration (YAML)\n\n# Image Generation Workflow\nname: "content_generation_pipeline"\nversion: "1.0"\n\nvariables:\n  user_prompt:\n    type: string\n    description: "User input prompt"\n\nnodes:\n  # Step 1: Enhance prompt with LLM\n  - id: prompt_enhancer\n    type: llm\n    model: gpt-4\n    prompt: |\n      Enhance this image generation prompt for better results.\n      Original: {{user_prompt}}\n      Enhanced prompt:\n\n  # Step 2: Generate image\n  - id: image_generator\n    type: image-generation\n    model: dalle-3\n    input:\n      prompt: "{{prompt_enhancer.output}}"\n      size: "1024x1024"\n      quality: "hd"\n\n  # Step 3: Generate description\n  - id: image_description\n    type: llm\n    model: gpt-4\n    prompt: |\n      Describe this image in detail for accessibility:\n      Image: {{image_generator.output}}\n\noutputs:\n  - image: "{{image_generator.output}}"\n  - description: "{{image_description.output}}"\n  - enhanced_prompt: "{{prompt_enhancer.output}}"\n\n# API Integration Example\nconst response = await fetch(\'https://your-dify-instance/v1/workflows/run\', {\n  method: \'POST\',\n  headers: {\n    \'Authorization\': \'Bearer YOUR_API_KEY\',\n    \'Content-Type\': \'application/json\'\n  },\n  body: JSON.stringify({\n    inputs: {\n      user_prompt: \'A magical forest with glowing mushrooms\'\n    },\n    response_mode: \'blocking\'\n  })\n});'}</code></pre>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ff6b35' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ff6b35' }}>{ct.midjourneyBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '概念艺术和插画' : 'Concept art and illustrations'}</li>
            <li>{isZh ? '营销视觉素材' : 'Marketing visual assets'}</li>
            <li>{isZh ? '社交媒体内容' : 'Social media content'}</li>
            <li>{isZh ? '角色设计' : 'Character design'}</li>
            <li>{isZh ? '建筑可视化' : 'Architectural visualization'}</li>
            <li>{isZh ? '产品概念图' : 'Product concepts'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #155799' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#155799' }}>{ct.difyBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'AI应用开发' : 'AI application development'}</li>
            <li>{isZh ? '企业知识库' : 'Enterprise knowledge bases'}</li>
            <li>{isZh ? '多步骤工作流' : 'Multi-step workflows'}</li>
            <li>{isZh ? '需要数据隐私' : 'Data privacy required'}</li>
            <li>{isZh ? '自定义AI解决方案' : 'Custom AI solutions'}</li>
            <li>{isZh ? 'API集成项目' : 'API integration projects'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/image-base64"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Image to Base64</a> • {' '}
        <a href={"/" + lang + "/tools/svg-to-jsx"} style={{ color: '#3b82f6', textDecoration: 'none' }}>SVG to JSX</a> • {' '}
        <a href={"/" + lang + "/tools/color-converter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Color Converter</a>
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
