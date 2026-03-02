'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Framer Motion vs React Spring: Animation Libraries Comparison',
    intro: 'Animation is crucial for creating engaging React applications, and Framer Motion and React Spring are the two leading animation libraries. This comprehensive comparison examines API design, performance, learning curve, and real-world use cases to help you choose the right animation library for your next project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Framer Motion offers a simpler declarative API, better documentation, and excellent for component-based animations. React Spring provides physics-based animations with more control and smaller bundle size. For most projects in 2025, Framer Motion is recommended for ease of use, while React Spring excels in complex physics-based scenarios.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Framer Motion uses declarative props, React Spring uses spring physics hooks',
    takeaway2: 'React Spring is smaller: 25KB vs Framer Motion\'s 40KB gzipped',
    takeaway3: 'Framer Motion has better documentation and learning resources',
    takeaway4: 'React Spring provides more granular control over animation physics',
    takeaway5: 'Both integrate well with gesture libraries and UI frameworks',
    takeaway6: 'Framer Motion includes built-in layout animations and variants',
    
    whatIsFramerTitle: 'What is Framer Motion?',
    whatIsFramerContent: 'Framer Motion, created by the Framer team, is a production-ready motion library for React. It provides a simple declarative API that makes animations feel like a natural extension of React components. With over 3 million weekly downloads, it has become the go-to choice for many React developers. It powers animations in Framer, the popular design and prototyping tool.',
    
    whatIsSpringTitle: 'What is React Spring?',
    whatIsSpringContent: 'React Spring is a spring-physics based animation library that builds upon the concept of springs rather than duration-based animations. Created by Paul Henschel, it provides a more natural feel to animations with physics-based motion. With over 1 million weekly downloads, it is favored by developers who need fine-grained control over animation behavior.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance benchmarks testing animations with 100 elements:',
    
    renderTitle: 'Animation Performance',
    renderIntro: 'Testing smooth 60fps animations:',
    
    bundleTitle: 'Bundle Size Comparison',
    bundleIntro: 'Impact on your application bundle:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing built-in capabilities and ecosystem:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Both libraries provide powerful animation APIs:',
    
    springExampleTitle: 'React Spring',
    framerExampleTitle: 'Framer Motion',
    
    gesturesTitle: 'Gesture Support',
    gesturesIntro: 'Both libraries support drag, hover, and other gestures:',
    
    typescriptTitle: 'TypeScript Experience',
    typescriptIntro: 'TypeScript support comparison:',
    
    migrationTitle: 'Migration from React Spring to Framer Motion',
    migrationIntro: 'Step-by-step migration guide:',
    
    whenToUseTitle: 'When to Use Each Library',
    framerBestFor: 'Use Framer Motion When:',
    springBestFor: 'Use React Spring When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both Framer Motion and React Spring are excellent choices for React animations. Framer Motion wins on developer experience, documentation, and ease of use, making it ideal for most applications. React Spring excels in physics-based animations and scenarios requiring granular control. For new projects, choose Framer Motion for simplicity or React Spring for physics precision. Many teams use both: Framer Motion for UI transitions and React Spring for complex physics.',
    
    faq1q: 'Can I use Framer Motion with Next.js?',
    faq1a: 'Yes, Framer Motion works perfectly with Next.js. For App Router, use the "use client" directive. For SSR issues, you can use LazyMotion to reduce bundle size and handle server-side rendering properly.',
    
    faq2q: 'Which is better for mobile animations?',
    faq2a: 'Both work well on mobile. React Spring has slightly better performance on lower-end devices due to smaller size. Framer Motion has excellent touch gesture support with built-in drag and hover states.',
    
    faq3q: 'How do layout animations work?',
    faq3a: 'Framer Motion has built-in layout animations via the "layout" prop that automatically animates position changes. React Spring requires manual tracking with useSpring and animated.div for similar effects.',
    
    faq4q: 'Can I animate SVGs?',
    faq4a: 'Yes, both libraries support SVG animations. Framer Motion uses the motion.svg component. React Spring uses the animated.svg element. Both handle path morphing, stroke animations, and other SVG-specific features.',
    
    faq5q: 'What about animation performance tools?',
    faq5a: 'Framer Motion includes DevTools for debugging animations. React Spring has useTrail, useChain, and other hooks for orchestrating complex sequences. Both support will-change and GPU acceleration.',
    
    faq6q: 'Which has better variant support?',
    faq6a: 'Framer Motion has superior variant support with propagate variants to children, orchestration, and automatic state management. React Spring achieves similar results with hooks but requires more setup.',
    
    faq7q: 'Can they work together?',
    faq7a: 'Yes, you can use both in the same project. They do not conflict and can be used for different animation needs. This is common in larger applications with varied animation requirements.',
    
    faq8q: 'What about server-side rendering?',
    faq8a: 'Both support SSR. Framer Motion handles SSR automatically but may cause hydration warnings. React Spring works with SSR through its animated components. For Next.js App Router, both require "use client" for interactive animations.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Framer Motion vs React Spring：动画库对比',
    intro: '动画对于创建引人入胜的React应用至关重要，Framer Motion和React Spring是两大领先的动画库。本全面比较考察API设计、性能、学习曲线和真实用例，帮助你为下一个项目选择合适的动画库。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Framer Motion提供更简单的声明式API、更好的文档，非常适合基于组件的动画。React Spring提供基于物理的动画，控制更精细，包大小更小。对于2025年的大多数项目，Framer Motion因易用性而被推荐，而React Spring在复杂的基于物理的场景中表现出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Framer Motion使用声明式props，React Spring使用spring物理hooks',
    takeaway2: 'React Spring更小：25KB vs Framer Motion的40KB（gzip后）',
    takeaway3: 'Framer Motion有更好的文档和学习资源',
    takeaway4: 'React Spring提供对动画物理更精细的控制',
    takeaway5: '两者都能很好地与手势库和UI框架集成',
    takeaway6: 'Framer Motion包含内置布局动画和变体',
    
    whatIsFramerTitle: '什么是Framer Motion？',
    whatIsFramerContent: 'Framer Motion由Framer团队创建，是一个生产就绪的React动画库。它提供简洁的声明式API，使动画感觉像是React组件的自然扩展。每周超过300万次下载，它已成为许多React开发者的首选。它为流行的设计和原型工具Framer提供动画支持。',
    
    whatIsSpringTitle: '什么是React Spring？',
    whatIsSpringContent: 'React Spring是一个基于弹簧物理的动画库，建立在弹簧概念而非基于持续时间的动画之上。由Paul Henschel创建，它通过基于物理的运动为动画提供更自然的感觉。每周超过100万次下载，它受到需要对动画行为进行精细控制的开发者的青睐。',
    
    performanceTitle: '性能对比',
    performanceIntro: '测试100个元素的动画性能基准：',
    
    renderTitle: '动画性能',
    renderIntro: '测试流畅的60fps动画：',
    
    bundleTitle: '包大小对比',
    bundleIntro: '对应用程序包的影响：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较内置功能和生态系统：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '两个库都提供强大的动画API：',
    
    springExampleTitle: 'React Spring',
    framerExampleTitle: 'Framer Motion',
    
    gesturesTitle: '手势支持',
    gesturesIntro: '两个库都支持拖拽、悬停和其他手势：',
    
    typescriptTitle: 'TypeScript体验',
    typescriptIntro: 'TypeScript支持对比：',
    
    migrationTitle: '从React Spring迁移到Framer Motion',
    migrationIntro: '分步迁移指南：',
    
    whenToUseTitle: '何时使用每个库',
    framerBestFor: '使用Framer Motion的场景：',
    springBestFor: '使用React Spring的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Framer Motion和React Spring都是React动画的优秀选择。Framer Motion在开发者体验、文档和易用性方面胜出，使其成为大多数应用的理想选择。React Spring在基于物理的动画和需要精细控制的场景中表现出色。对于新项目，为简单性选择Framer Motion，或为物理精度选择React Spring。许多团队两者都用：Framer Motion用于UI过渡，React Spring用于复杂物理效果。',
    
    faq1q: '我可以在Next.js中使用Framer Motion吗？',
    faq1a: '是的，Framer Motion与Next.js完美配合。对于App Router，使用"use client"指令。对于SSR问题，可以使用LazyMotion来减小包大小并正确处理服务器端渲染。',
    
    faq2q: '哪个更适合移动端动画？',
    faq2a: '两者在移动端都表现良好。React Spring由于更小的大小在低端设备上有稍好的性能。Framer Motion有出色的触摸手势支持，内置拖拽和悬停状态。',
    
    faq3q: '布局动画如何工作？',
    faq3a: 'Framer Motion通过"layout" prop内置布局动画，自动动画化位置变化。React Spring需要使用useSpring和animated.div手动跟踪才能实现类似效果。',
    
    faq4q: '我可以动画化SVG吗？',
    faq4a: '是的，两个库都支持SVG动画。Framer Motion使用motion.svg组件。React Spring使用animated.svg元素。两者都处理路径变形、描边动画和其他SVG特定功能。',
    
    faq5q: '动画性能工具呢？',
    faq5a: 'Framer Motion包含DevTools用于调试动画。React Spring有useTrail、useChain等hooks用于编排复杂序列。两者都支持will-change和GPU加速。',
    
    faq6q: '哪个有更好的变体支持？',
    faq6a: 'Framer Motion有卓越的变体支持，可以将变体传播到子组件、编排和自动状态管理。React Spring通过hooks实现类似结果，但需要更多设置。',
    
    faq7q: '它们可以一起工作吗？',
    faq7a: '是的，你可以在同一个项目中使用两者。它们不会冲突，可以用于不同的动画需求。这在有各种动画需求的大型应用中很常见。',
    
    faq8q: '服务器端渲染呢？',
    faq8a: '两者都支持SSR。Framer Motion自动处理SSR但可能引起hydration警告。React Spring通过其animated组件与SSR配合。对于Next.js App Router，两者都需要"use client"进行交互式动画。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function FramerMotionVsReactSpring({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsFramerTitle}</h3>
      <p style={pStyle}>{ct.whatIsFramerContent}</p>

      <h3 style={h3Style}>{ct.whatIsSpringTitle}</h3>
      <p style={pStyle}>{ct.whatIsSpringContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Framer Motion</th>
              <th style={thStyle}>React Spring</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2019', '2018'],
              [isZh ? '动画模型' : 'Animation Model', isZh ? '基于帧/时间' : 'Frame/Time-based', isZh ? '基于弹簧物理' : 'Spring physics-based'],
              [isZh ? '核心API' : 'Core API', 'motion components', 'useSpring hook'],
              [isZh ? '包大小 (gzip)' : 'Bundle Size (gzip)', '~40KB', '~25KB'],
              [isZh ? 'API风格' : 'API Style', isZh ? '声明式props' : 'Declarative props', isZh ? 'Hooks + animated' : 'Hooks + animated'],
              [isZh ? 'TypeScript支持' : 'TypeScript', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '较低' : 'Lower', isZh ? '中等' : 'Medium'],
            ].map(([feature, framer, spring], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{framer}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{spring}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.renderTitle}</h3>
      <p style={pStyle}>{ct.renderIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Framer Motion</th>
              <th style={thStyle}>React Spring</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '60fps保持率 (100元素)' : '60fps Maintenance (100 elements)', '98%', '99%'],
              [isZh ? '初始化时间' : 'Initialization Time', '~15ms', '~10ms'],
              [isZh ? '内存使用 (动画中)' : 'Memory Usage (animating)', '~12MB', '~8MB'],
              [isZh ? 'CPU使用率 (持续动画)' : 'CPU Usage (continuous)', '12-18%', '10-15%'],
            ].map(([metric, framer, spring], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{framer}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{spring}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.bundleTitle}</h3>
      <p style={pStyle}>{ct.bundleIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '包' : 'Package'}</th>
              <th style={thStyle}>Framer Motion</th>
              <th style={thStyle}>React Spring</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心库' : 'Core Library', '40KB', '25KB'],
              [isZh ? '核心 + 手势' : 'Core + Gestures', '45KB', '32KB'],
              [isZh ? 'Tree-shakeable' : 'Tree-shakeable', isZh ? '部分' : 'Partial', isZh ? '完全' : 'Full'],
              [isZh ? 'LazyMotion支持' : 'LazyMotion Support', isZh ? '是' : 'Yes', isZh ? '使用动态导入' : 'Dynamic import'],
            ].map(([pkg, framer, spring], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{pkg}</td>
                <td style={tdStyle}>{framer}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{spring}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Framer Motion</th>
              <th style={thStyle}>React Spring</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'CSS属性动画' : 'CSS Property Animation', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? 'SVG动画' : 'SVG Animation', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? '手势 (拖拽/悬停)' : 'Gestures (Drag/Hover)', isZh ? '内置' : 'Built-in', '@use-gesture'],
              [isZh ? '布局动画' : 'Layout Animation', 'layout prop', isZh ? '手动' : 'Manual'],
              [isZh ? '变体' : 'Variants', isZh ? '强大' : 'Powerful', isZh ? '基础' : 'Basic'],
              [isZh ? '编排' : 'Orchestration', 'staggerChildren', 'useTrail/useChain'],
              [isZh ? '滚动动画' : 'Scroll Animation', isZh ? '内置' : 'Built-in', '@react-spring/parallax'],
              [isZh ? '路径变形' : 'Path Morphing', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? '3D变换' : '3D Transforms', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? '退出动画' : 'Exit Animations', 'AnimatePresence', isZh ? '手动' : 'Manual'],
            ].map(([feature, framer, spring], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{framer}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{spring}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.framerExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Framer Motion - Animated Card Component
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function AnimatedCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      style={{
        width: isOpen ? '100%' : '300px',
        height: isOpen ? '400px' : '200px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        cursor: 'pointer',
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <motion.h2
        layout
        style={{ color: 'white', padding: '20px' }}
      >
        Click to {isOpen ? 'collapse' : 'expand'}
      </motion.h2>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ padding: '0 20px', color: 'white' }}
          >
            Expanded content here
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.springExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// React Spring - Animated Card Component
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useState } from 'react';

function AnimatedCard() {
  const [isOpen, setIsOpen] = useState(false);

  const [styles, api] = useSpring(() => ({
    opacity: 1,
    y: 0,
    scale: 1,
    width: '300px',
    height: '200px',
    config: { mass: 1, tension: 280, friction: 60 },
  }));

  const bind = useDrag(({ down, movement: [, my] }) => {
    api.start({
      y: down ? my : 0,
      scale: down ? 1.02 : 1,
    });
  });

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    api.start({
      width: !isOpen ? '100%' : '300px',
      height: !isOpen ? '400px' : '200px',
    });
  };

  return (
    <animated.div
      {...bind()}
      style={{
        ...styles,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        cursor: 'pointer',
      }}
      onClick={toggleOpen}
    >
      <animated.h2 style={{ color: 'white', padding: '20px' }}>
        Click to {isOpen ? 'collapse' : 'expand'}
      </animated.h2>
    </animated.div>
  );
}`}</code></pre>

      {/* Gestures */}
      <h2 style={h2Style}>{ct.gesturesTitle}</h2>
      <p style={pStyle}>{ct.gesturesIntro}</p>

      <pre style={codeStyle}><code>{`// Framer Motion - Built-in Gestures
import { motion } from 'framer-motion';

function DraggableCard() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.1, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Drag me!
    </motion.div>
  );
}

// React Spring - with @use-gesture
import { useSpring, animated } from '@react-spring/web';
import { useDrag, useHover } from '@use-gesture/react';

function DraggableCard() {
  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
  }));

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start({
      x: down ? mx : 0,
      y: down ? my : 0,
      scale: down ? 1.1 : 1,
    });
  });

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        scale,
        cursor: 'grab',
      }}
    >
      Drag me!
    </animated.div>
  );
}`}</code></pre>

      {/* TypeScript */}
      <h2 style={h2Style}>{ct.typescriptTitle}</h2>
      <p style={pStyle}>{ct.typescriptIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Framer Motion</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '优秀的TypeScript支持，motion组件完全类型化。Variants、transition和所有动画属性都有完整的类型定义。与自定义组件集成时类型推断准确。' : 'Excellent TypeScript support with fully typed motion components. Variants, transitions, and all animation properties have complete type definitions. Accurate type inference when integrating with custom components.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>React Spring</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '良好的TypeScript支持，animated组件类型化。useSpring返回值类型推断正确。某些高级配置选项可能需要显式类型注解。' : 'Good TypeScript support with typed animated components. useSpring return values are correctly inferred. Some advanced configuration options may require explicit type annotations.'}
          </p>
        </div>
      </div>

      <pre style={codeStyle}><code>{`// Framer Motion - TypeScript
import { motion, Variants } from 'framer-motion';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
  exit: { opacity: 0, scale: 0.9 },
};

function TypedCard() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      Content
    </motion.div>
  );
}

// React Spring - TypeScript
import { useSpring, animated, SpringConfig } from '@react-spring/web';

interface CardStyles {
  opacity: number;
  y: number;
  scale: number;
}

function TypedCard() {
  const [styles, api] = useSpring<CardStyles>(() => ({
    opacity: 0,
    y: 20,
    scale: 1,
    config: { tension: 280, friction: 60 } as SpringConfig,
  }));

  return (
    <animated.div style={styles}>
      Content
    </animated.div>
  );
}`}</code></pre>

      {/* Migration */}
      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`// Migration: React Spring to Framer Motion

// 1. Replace imports
// Before:
import { useSpring, animated } from '@react-spring/web';

// After:
import { motion } from 'framer-motion';

// 2. Replace animated components
// Before:
const [styles, api] = useSpring(() => ({ opacity: 0 }));
<animated.div style={styles}>Content</animated.div>

// After:
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  Content
</motion.div>

// 3. Replace useSpring with motion props
// Before:
const [styles] = useSpring(() => ({
  from: { opacity: 0, y: 20 },
  to: { opacity: 1, y: 0 },
}));

// After:
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
/>

// 4. Replace gesture handling
// Before (React Spring + @use-gesture):
const bind = useDrag(({ down }) => {...});
<animated.div {...bind()} />

// After (Framer Motion):
<motion.div drag whileDrag={{ scale: 1.1 }} />

// 5. Replace config with transition
// Before:
config: { mass: 1, tension: 280, friction: 60 }

// After:
transition: { type: 'spring', stiffness: 280, damping: 60 }

// 6. Replace useTrail with variants
// Before:
const trail = useTrail(3, {...});

// After:
<motion.div variants={containerVariants}>
  {items.map(item => (
    <motion.div variants={itemVariants} />
  ))}
</motion.div>`}</code></pre>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.framerBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '快速开发' : 'Rapid development'}</li>
            <li>{isZh ? 'UI过渡动画' : 'UI transitions'}</li>
            <li>{isZh ? '布局动画' : 'Layout animations'}</li>
            <li>{isZh ? '团队协作项目' : 'Team collaboration projects'}</li>
            <li>{isZh ? '需要优秀文档' : 'Need great documentation'}</li>
            <li>{isZh ? '组件库集成' : 'Component library integration'}</li>
            <li>{isZh ? '复杂变体动画' : 'Complex variant animations'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.springBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '物理精确动画' : 'Physics-precise animations'}</li>
            <li>{isZh ? '包大小敏感' : 'Bundle-size conscious'}</li>
            <li>{isZh ? '复杂手势交互' : 'Complex gesture interactions'}</li>
            <li>{isZh ? '数据驱动动画' : 'Data-driven animations'}</li>
            <li>{isZh ? '需要细粒度控制' : 'Need granular control'}</li>
            <li>{isZh ? '3D/Canvas动画' : '3D/Canvas animations'}</li>
            <li>{isZh ? '游戏化UI' : 'Gamified UIs'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/color-converter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Color Converter</a> • {' '}
        <a href={'/' + lang + '/tools/css-minifier'} style={{ color: '#3b82f6', textDecoration: 'none' }}>CSS Minifier</a>
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
