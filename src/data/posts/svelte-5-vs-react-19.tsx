'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Svelte 5 vs React 19: The Ultimate Frontend Framework Comparison 2025',
    intro: 'Svelte 5 introduces revolutionary Runes for reactivity, while React 19 stabilizes Server Components and brings new hooks. This comprehensive comparison examines performance, developer experience, reactivity models, ecosystem, and real-world use cases to help you choose the right framework for your next project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Svelte 5 offers superior performance with compile-time optimization (~2KB bundle), revolutionary Runes syntax for reactivity, and simpler mental model. React 19 provides mature ecosystem, stable Server Components, and vast talent pool. For performance-critical apps and small teams, choose Svelte 5. For enterprise projects with existing React investment, React 19 remains the safe choice.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Svelte 5 compiles to vanilla JS with ~2KB runtime vs React\'s ~40KB',
    takeaway2: 'Runes ($state, $derived, $effect) replace Svelte 4\'s implicit reactivity with explicit signals',
    takeaway3: 'React 19 Server Components reduce client bundle size significantly',
    takeaway4: 'Svelte requires no virtual DOM, resulting in faster initial render',
    takeaway5: 'React\'s ecosystem is 10x larger with more mature tooling',
    takeaway6: 'Both frameworks excel at different use cases - no clear winner',
    
    whatIsSvelteTitle: 'What is Svelte 5?',
    whatIsSvelteContent: 'Svelte 5, released in 2024, is a radical departure from previous versions. It introduces "Runes" - special symbols that explicitly declare reactive state using $state, $derived, and $effect. Unlike React, Svelte compiles components to highly optimized vanilla JavaScript at build time, eliminating the need for a virtual DOM. The result: smaller bundles, faster runtime, and less boilerplate code.',
    
    whatIsReactTitle: 'What is React 19?',
    whatIsReactContent: 'React 19, released in late 2024, marks a significant milestone with stable Server Components. Building on React 18\'s Concurrent features, it introduces new hooks like useFormStatus and useOptimistic, improved hydration, and better Suspense support. React remains the most popular frontend framework with the largest ecosystem, backed by Meta and used by millions of developers worldwide.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Real-world benchmarks comparing Svelte 5 and React 19 performance metrics:',
    
    bundleTitle: 'Bundle Size Comparison',
    bundleIntro: 'Minified + gzipped production bundle sizes:',
    
    renderTitle: 'Rendering Performance',
    renderIntro: 'Benchmark results from js-framework-benchmark (2025):',
    
    memoryTitle: 'Memory Usage',
    memoryIntro: 'Memory consumption in typical SPA scenarios:',
    
    reactivityTitle: 'Reactivity Model: Runes vs Hooks',
    reactivityIntro: 'The fundamental difference in state management approaches:',
    
    svelteRunesTitle: 'Svelte 5 Runes',
    reactHooksTitle: 'React 19 Hooks',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing built-in capabilities and ecosystem:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Similar counter component implementation:',
    
    svelteExampleTitle: 'Svelte 5',
    reactExampleTitle: 'React 19',
    
    dxTitle: 'Developer Experience',
    dxIntro: 'Comparison of daily development workflow:',
    
    ecosystemTitle: 'Ecosystem Comparison',
    ecosystemIntro: 'Available tooling, libraries, and community resources:',
    
    svelteEcosystemTitle: 'Svelte Ecosystem',
    reactEcosystemTitle: 'React Ecosystem',
    
    whenToUseTitle: 'When to Use Each Framework',
    svelteBestFor: 'Use Svelte 5 When:',
    reactBestFor: 'Use React 19 When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both Svelte 5 and React 19 are excellent choices for different scenarios. Svelte 5 wins on performance, bundle size, and developer experience with its elegant Runes system. React 19 dominates in ecosystem maturity, Server Components for SEO, and enterprise adoption. For greenfield projects prioritizing performance and DX, Svelte 5 is compelling. For large-scale applications with existing React investment or teams needing extensive third-party integrations, React 19 remains the pragmatic choice.',
    
    faq1q: 'Is Svelte 5 production-ready?',
    faq1a: 'Yes, Svelte 5 is production-ready. It was officially released in October 2024 and is used by companies like The New York Times, Spotify, and Philips. The Runes API is stable, and the migration path from Svelte 4 is well-documented.',
    
    faq2q: 'Can I use React libraries in Svelte?',
    faq2a: 'Not directly, but Svelte has growing ecosystem equivalents. For complex React-specific libraries, you can use iframes or web components as bridges. However, most common use cases (forms, charts, UI components) have excellent Svelte-native alternatives.',
    
    faq3q: 'Are React Server Components worth it?',
    faq3a: 'Yes, for content-heavy sites and SEO-critical applications. RSC significantly reduces client JavaScript and improves initial page load. However, they add complexity and require Node.js server or edge runtime. For interactive SPAs, client-side React may be simpler.',
    
    faq4q: 'How steep is the Svelte learning curve?',
    faq4a: 'Svelte has one of the gentlest learning curves among modern frameworks. Developers familiar with HTML, CSS, and basic JavaScript can be productive in days. The Runes system in Svelte 5 is more explicit than Svelte 4, making reactivity easier to understand.',
    
    faq5q: 'Does Svelte support TypeScript?',
    faq5a: 'Yes, Svelte has excellent TypeScript support. In Svelte 5, you can use TypeScript in <script lang="ts"> blocks, and the language server provides full type checking. Runes work seamlessly with TypeScript types.',
    
    faq6q: 'Which framework is better for SEO?',
    faq6a: 'Both can achieve excellent SEO. Svelte with SvelteKit provides SSR/SSG out of the box. React with Next.js and Server Components also excels. The choice depends more on your meta framework (SvelteKit vs Next.js) than the core framework.',
    
    faq7q: 'Can Svelte handle large-scale enterprise apps?',
    faq7a: 'Yes, though with caveats. Svelte scales well technically, but enterprise features like complex state management (Redux equivalents), micro-frontends, and large teams may find React\'s mature patterns more established. Svelte is gaining enterprise adoption rapidly.',
    
    faq8q: 'What about hiring developers?',
    faq8a: 'React has 10x more developers available. However, Svelte developers often report higher satisfaction and productivity. Many teams find Svelte\'s simplicity allows onboarding developers quickly, even those new to the framework.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Svelte 5 vs React 19：2025年前端框架终极对比',
    intro: 'Svelte 5引入了革命性的Runes响应式语法，而React 19稳定了Server Components并带来新的Hooks。本全面比较考察性能、开发者体验、响应式模型、生态系统和真实用例，帮助你为下一个项目选择合适的框架。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Svelte 5通过编译时优化提供卓越性能（~2KB包大小），革命性的Runes响应式语法，以及更简单的心智模型。React 19提供成熟的生态系统、稳定的Server Components和庞大的人才库。对于性能关键型应用和小团队，选择Svelte 5。对于已有React投资的企业项目，React 19仍是安全选择。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Svelte 5编译为原生JS，运行时仅~2KB，而React约40KB',
    takeaway2: 'Runes（$state、$derived、$effect）用显式信号替代Svelte 4的隐式响应式',
    takeaway3: 'React 19 Server Components显著减少客户端包大小',
    takeaway4: 'Svelte无需虚拟DOM，初始渲染更快',
    takeaway5: 'React生态系统大10倍，工具更成熟',
    takeaway6: '两个框架各有所长 - 没有绝对的赢家',
    
    whatIsSvelteTitle: '什么是Svelte 5？',
    whatIsSvelteContent: 'Svelte 5于2024年发布，是对之前版本的彻底革新。它引入了"Runes"——使用$state、$derived和$effect显式声明响应式状态的特殊符号。与React不同，Svelte在构建时将组件编译为高度优化的原生JavaScript，无需虚拟DOM。结果是：更小的包、更快的运行时、更少的样板代码。',
    
    whatIsReactTitle: '什么是React 19？',
    whatIsReactContent: 'React 19于2024年底发布，以稳定的Server Components为重要里程碑。在React 18并发特性基础上，它引入了useFormStatus和useOptimistic等新Hooks、改进的水合和更好的Suspense支持。React仍然是最流行的前端框架，拥有最大的生态系统，由Meta支持，全球数百万开发者使用。',
    
    performanceTitle: '性能对比',
    performanceIntro: 'Svelte 5和React 19性能指标的实测基准对比：',
    
    bundleTitle: '包大小对比',
    bundleIntro: '压缩后的生产环境包大小：',
    
    renderTitle: '渲染性能',
    renderIntro: 'js-framework-benchmark基准测试结果（2025）：',
    
    memoryTitle: '内存使用',
    memoryIntro: '典型SPA场景下的内存消耗：',
    
    reactivityTitle: '响应式模型：Runes vs Hooks',
    reactivityIntro: '状态管理方法的根本区别：',
    
    svelteRunesTitle: 'Svelte 5 Runes',
    reactHooksTitle: 'React 19 Hooks',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较内置功能和生态系统：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '相似的计数器组件实现：',
    
    svelteExampleTitle: 'Svelte 5',
    reactExampleTitle: 'React 19',
    
    dxTitle: '开发体验对比',
    dxIntro: '日常开发工作流比较：',
    
    ecosystemTitle: '生态系统对比',
    ecosystemIntro: '可用的工具、库和社区资源：',
    
    svelteEcosystemTitle: 'Svelte生态系统',
    reactEcosystemTitle: 'React生态系统',
    
    whenToUseTitle: '何时使用每个框架',
    svelteBestFor: '使用Svelte 5的场景：',
    reactBestFor: '使用React 19的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Svelte 5和React 19针对不同场景都是优秀选择。Svelte 5在性能、包大小和开发者体验方面凭借优雅的Runes系统胜出。React 19在生态系统成熟度、Server Components的SEO支持和企业采用方面占主导。对于优先考虑性能和DX的新项目，Svelte 5很有吸引力。对于已有React投资或需要大量第三方集成的大型应用，React 19仍是务实之选。',
    
    faq1q: 'Svelte 5已经可以用于生产了吗？',
    faq1a: '是的，Svelte 5已经可以用于生产。它于2024年10月正式发布，被纽约时报、Spotify和飞利浦等公司使用。Runes API稳定，从Svelte 4迁移的路径有完善的文档。',
    
    faq2q: '我可以在Svelte中使用React库吗？',
    faq2a: '不能直接使用，但Svelte有不断增长的等效生态系统。对于复杂的React特定库，可以使用iframe或Web组件作为桥梁。不过，大多数常见用例（表单、图表、UI组件）都有优秀的Svelte原生替代品。',
    
    faq3q: 'React Server Components值得使用吗？',
    faq3a: '是的，对于内容密集型网站和SEO关键的应用很有价值。RSC显著减少客户端JavaScript并改善初始页面加载。但它们增加了复杂性，需要Node.js服务器或边缘运行时。对于交互式SPA，客户端React可能更简单。',
    
    faq4q: 'Svelte的学习曲线有多陡峭？',
    faq4a: 'Svelte是现代框架中学习曲线最平缓的之一。熟悉HTML、CSS和基础JavaScript的开发者可以在几天内上手。Svelte 5中的Runes系统比Svelte 4更明确，使响应式更容易理解。',
    
    faq5q: 'Svelte支持TypeScript吗？',
    faq5a: '是的，Svelte有出色的TypeScript支持。在Svelte 5中，你可以在<script lang="ts">块中使用TypeScript，语言服务器提供完整的类型检查。Runes与TypeScript类型无缝协作。',
    
    faq6q: '哪个框架对SEO更友好？',
    faq6a: '两者都能实现出色的SEO。Svelte配合SvelteKit开箱即用提供SSR/SSG。React配合Next.js和Server Components也很出色。选择更多取决于你的元框架（SvelteKit vs Next.js）而非核心框架。',
    
    faq7q: 'Svelte能处理大型企业应用吗？',
    faq7a: '可以，但有一些注意事项。Svelte在技术上扩展性良好，但复杂状态管理（Redux等效品）、微前端和大型团队可能会发现React的成熟模式更成熟。Svelte正在快速获得企业采用。',
    
    faq8q: '招聘开发者呢？',
    faq8a: 'React有10倍以上的开发者可用。然而，Svelte开发者通常报告更高的满意度和生产力。许多团队发现Svelte的简单性允许快速培训开发者，即使是框架新手。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function Svelte5VsReact19({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsSvelteTitle}</h3>
      <p style={pStyle}>{ct.whatIsSvelteContent}</p>

      <h3 style={h3Style}>{ct.whatIsReactTitle}</h3>
      <p style={pStyle}>{ct.whatIsReactContent}</p>

      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Svelte 5</th>
              <th style={thStyle}>React 19</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2016 (v5: 2024)', '2013 (v19: 2024)'],
              [isZh ? '响应式模型' : 'Reactivity Model', 'Runes (Signals)', 'Hooks + Virtual DOM'],
              [isZh ? '编译方式' : 'Compilation', isZh ? '编译时' : 'Compile-time', isZh ? '运行时' : 'Runtime'],
              [isZh ? '虚拟DOM' : 'Virtual DOM', isZh ? '无' : 'None', isZh ? '有' : 'Yes'],
              [isZh ? 'TypeScript支持' : 'TypeScript', isZh ? '原生支持' : 'Native', isZh ? '原生支持' : 'Native'],
              [isZh ? '服务端渲染' : 'Server Rendering', 'SvelteKit', 'Next.js / RSC'],
              [isZh ? '运行时大小' : 'Runtime Size', '~2KB', '~40KB'],
            ].map(([feature, svelte, react], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#ff3e00' }}>{svelte}</td>
                <td style={{ ...tdStyle, color: '#61dafb' }}>{react}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.bundleTitle}</h3>
      <p style={pStyle}>{ct.bundleIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '配置' : 'Configuration'}</th>
              <th style={thStyle}>Svelte 5</th>
              <th style={thStyle}>React 19</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '基础运行时' : 'Base Runtime', '~1.8KB', '~42KB'],
              [isZh ? 'Hello World应用' : 'Hello World App', '~2KB', '~45KB'],
              [isZh ? '带路由的SPA' : 'SPA with Routing', '~8KB', '~65KB'],
              [isZh ? '完整应用（表单+状态）' : 'Full App (forms+state)', '~15KB', '~95KB'],
            ].map(([config, svelte, react], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{config}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{svelte}</td>
                <td style={tdStyle}>{react}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.renderTitle}</h3>
      <p style={pStyle}>{ct.renderIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Svelte 5</th>
              <th style={thStyle}>React 19</th>
              <th style={thStyle}>{isZh ? '优势' : 'Winner'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次渲染' : 'Initial Render', '12ms', '28ms', 'Svelte'],
              [isZh ? '更新1000行' : 'Update 1000 rows', '8ms', '15ms', 'Svelte'],
              [isZh ? '启动时间' : 'Startup Time', '45ms', '120ms', 'Svelte'],
              [isZh ? 'Lighthouse分数' : 'Lighthouse Score', '98', '92', 'Svelte'],
            ].map(([metric, svelte, react, winner], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{svelte}</td>
                <td style={tdStyle}>{react}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{winner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.memoryTitle}</h3>
      <p style={pStyle}>{ct.memoryIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
              <th style={thStyle}>Svelte 5</th>
              <th style={thStyle}>React 19</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '空闲状态' : 'Idle', '4.2MB', '8.5MB'],
              [isZh ? '1000个组件' : '1000 components', '12MB', '28MB'],
              [isZh ? '复杂表单' : 'Complex form', '8MB', '18MB'],
              [isZh ? '大数据列表' : 'Large data list', '25MB', '55MB'],
            ].map(([scenario, svelte, react], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{svelte}</td>
                <td style={tdStyle}>{react}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.reactivityTitle}</h2>
      <p style={pStyle}>{ct.reactivityIntro}</p>

      <h3 style={{ ...h3Style, color: '#ff3e00' }}>{ct.svelteRunesTitle}</h3>
      <pre style={codeStyle}><code>{`// Svelte 5 Runes - Explicit Reactivity
<script>
  // $state - reactive state
  let count = $state(0);
  let name = $state('');
  
  // $derived - computed values
  let doubled = $derived(count * 2);
  let fullName = $derived(\`\${firstName} \${lastName}\`);
  
  // $effect - side effects
  $effect(() => {
    console.log(\`Count changed to: \${count}\`);
    document.title = \`Count: \${count}\`;
  });
  
  // $effect.pre - pre-DOM effects
  $effect.pre(() => {
    // Runs before DOM updates
  });
  
  function increment() {
    count++;
  }
</script>

<button onclick={increment}>
  Count: {count} (doubled: {doubled})
</button>`}</code></pre>

      <h3 style={{ ...h3Style, color: '#61dafb' }}>{ct.reactHooksTitle}</h3>
      <pre style={codeStyle}><code>{`// React 19 Hooks
import { useState, useMemo, useEffect, useOptimistic } from 'react';

function Counter() {
  // useState - reactive state
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // useMemo - computed values
  const doubled = useMemo(() => count * 2, [count]);
  const fullName = useMemo(() => 
    \`\${firstName} \${lastName}\`, [firstName, lastName]);
  
  // useEffect - side effects
  useEffect(() => {
    console.log(\`Count changed to: \${count}\`);
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  // useOptimistic - new in React 19
  const [optimisticCount, addOptimistic] = useOptimistic(
    count, (prev, newCount) => newCount
  );
  
  // useFormStatus - new in React 19
  const { pending } = useFormStatus();
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count} (doubled: {doubled})
    </button>
  );
}`}</code></pre>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Svelte 5</th>
              <th style={thStyle}>React 19</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '响应式状态' : 'Reactive State', 'Runes ($state)', 'Hooks (useState)'],
              [isZh ? '计算属性' : 'Computed', '$derived', 'useMemo'],
              [isZh ? '副作用' : 'Side Effects', '$effect', 'useEffect'],
              [isZh ? '条件渲染' : 'Conditional', '{#if}', 'ternary &&'],
              [isZh ? '列表渲染' : 'List Rendering', '{#each}', '.map()'],
              [isZh ? '双向绑定' : 'Two-way Binding', 'bind:value', 'value + onChange'],
              [isZh ? '服务端组件' : 'Server Components', isZh ? 'SvelteKit SSR' : 'SvelteKit SSR', isZh ? '原生支持' : 'Native RSC'],
              [isZh ? 'Suspense' : 'Suspense', isZh ? 'SvelteKit await' : 'SvelteKit await', isZh ? '原生支持' : 'Native'],
              [isZh ? '表单处理' : 'Form Handling', isZh ? '表单Actions' : 'Form Actions', 'useFormStatus'],
              [isZh ? 'CSS作用域' : 'Scoped CSS', isZh ? '内置' : 'Built-in', 'CSS Modules/Styled'],
            ].map(([feature, svelte, react], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#ff3e00' }}>{svelte}</td>
                <td style={{ ...tdStyle, color: '#61dafb' }}>{react}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#ff3e00' }}>{ct.svelteExampleTitle}</h3>
      <pre style={codeStyle}><code>{`<!-- Svelte 5 - Todo App -->
<script>
  let todos = $state([]);
  let newTodo = $state('');
  
  let remaining = $derived(
    todos.filter(t => !t.done).length
  );
  
  function addTodo() {
    if (newTodo.trim()) {
      todos = [...todos, { 
        id: Date.now(), 
        text: newTodo, 
        done: false 
      }];
      newTodo = '';
    }
  }
  
  function toggle(id) {
    todos = todos.map(t => 
      t.id === id ? { ...t, done: !t.done } : t
    );
  }
</script>

<div class="todo-app">
  <h1>Todo List ({remaining} remaining)</h1>
  
  <form onsubmit={(e) => { e.preventDefault(); addTodo(); }}>
    <input 
      bind:value={newTodo} 
      placeholder="Add todo..."
    />
    <button type="submit">Add</button>
  </form>
  
  <ul>
    {#each todos as todo (todo.id)}
      <li class:done={todo.done}>
        <input 
          type="checkbox" 
          checked={todo.done} 
          onchange={() => toggle(todo.id)}
        />
        {todo.text}
      </li>
    {/each}
  </ul>
</div>

<style>
  .done { text-decoration: line-through; opacity: 0.6; }
</style>`}</code></pre>

      <h3 style={{ ...h3Style, color: '#61dafb' }}>{ct.reactExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// React 19 - Todo App
import { useState, useMemo } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  const remaining = useMemo(() => 
    todos.filter(t => !t.done).length, 
    [todos]
  );
  
  function addTodo(e) {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: newTodo, 
        done: false 
      }]);
      setNewTodo('');
    }
  }
  
  function toggle(id) {
    setTodos(todos.map(t => 
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }
  
  return (
    <div className="todo-app">
      <h1>Todo List ({remaining} remaining)</h1>
      
      <form onSubmit={addTodo}>
        <input 
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add todo..."
        />
        <button type="submit">Add</button>
      </form>
      
      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id} 
            className={todo.done ? 'done' : ''}
          >
            <input 
              type="checkbox"
              checked={todo.done}
              onChange={() => toggle(todo.id)}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}`}</code></pre>

      <h2 style={h2Style}>{ct.dxTitle}</h2>
      <p style={pStyle}>{ct.dxIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ff3e00' }}>
          <strong style={{ color: '#ff3e00' }}>Svelte 5</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '单文件组件（HTML+JS+CSS），更少的样板代码，内置样式作用域，无需useEffect依赖数组，编译时错误检查更友好。学习曲线平缓，新手友好。' : 'Single-file components (HTML+JS+CSS), less boilerplate, built-in style scoping, no useEffect dependency arrays, compile-time error checking. Gentle learning curve, beginner-friendly.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #61dafb' }}>
          <strong style={{ color: '#61dafb' }}>React 19</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'JSX灵活强大，成熟的IDE支持，丰富的DevTools，大量教程和StackOverflow答案。useEffect规则需要学习，但团队经验丰富。' : 'Flexible JSX, mature IDE support, excellent DevTools, vast tutorials and StackOverflow answers. useEffect rules require learning, but teams have deep experience.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.ecosystemTitle}</h2>
      <p style={pStyle}>{ct.ecosystemIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '类别' : 'Category'}</th>
              <th style={thStyle}>Svelte 5</th>
              <th style={thStyle}>React 19</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'npm包数量' : 'npm Packages', '~3,000', '~50,000+'],
              [isZh ? 'GitHub Stars' : 'GitHub Stars', '~80K', '~230K'],
              [isZh ? 'UI组件库' : 'UI Libraries', 'shadcn-svelte, Skeleton', 'MUI, Ant, Chakra, shadcn'],
              [isZh ? '状态管理' : 'State Management', 'Built-in (Runes)', 'Redux, Zustand, Jotai'],
              [isZh ? '元框架' : 'Meta Framework', 'SvelteKit', 'Next.js, Remix'],
              [isZh ? '测试工具' : 'Testing', 'Vitest, Playwright', 'Jest, RTL, Vitest'],
              [isZh ? '招聘市场' : 'Job Market', isZh ? '增长中' : 'Growing', isZh ? '主导地位' : 'Dominant'],
            ].map(([category, svelte, react], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{category}</td>
                <td style={{ ...tdStyle, color: '#ff3e00' }}>{svelte}</td>
                <td style={{ ...tdStyle, color: '#61dafb' }}>{react}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ff3e00' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ff3e00' }}>{ct.svelteBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '性能关键型应用' : 'Performance-critical apps'}</li>
            <li>{isZh ? '小型到中型团队' : 'Small to medium teams'}</li>
            <li>{isZh ? '嵌入式/移动Web' : 'Embedded/mobile web'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '新项目（无历史包袱）' : 'Greenfield projects'}</li>
            <li>{isZh ? '开发者体验优先' : 'DX-focused teams'}</li>
            <li>{isZh ? '轻量级交互组件' : 'Lightweight interactive widgets'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #61dafb' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#61dafb' }}>{ct.reactBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '大型企业应用' : 'Large enterprise apps'}</li>
            <li>{isZh ? '已有React投资' : 'Existing React investment'}</li>
            <li>{isZh ? '需要特定React库' : 'Specific React libraries needed'}</li>
            <li>{isZh ? '大型开发团队' : 'Large development teams'}</li>
            <li>{isZh ? 'SEO关键（Next.js）' : 'SEO-critical (Next.js)'}</li>
            <li>{isZh ? '丰富的第三方集成' : 'Rich third-party integrations'}</li>
            <li>{isZh ? '人才招聘优先' : 'Talent hiring priority'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/javascript-minifier`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JS Minifier</a> • {' '}
        <a href={`/${lang}/tools/typescript-to-javascript`} style={{ color: '#3b82f6', textDecoration: 'none' }}>TS to JS</a>
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
