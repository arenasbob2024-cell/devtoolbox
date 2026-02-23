'use client';
import React from 'react';

const codeReactState = `// React: useState hook
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [doubled, setDoubled] = useState(0);

  useEffect(() => {
    setDoubled(count * 2);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}`;

const codeVueState = `<!-- Vue 3: Composition API with reactive refs -->
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>`;

const codeReactComponent = `// React: Component with props and TypeScript
interface UserCardProps {
  name: string;
  role: string;
  avatar?: string;
}

export function UserCard({ name, role, avatar }: UserCardProps) {
  return (
    <div className="card">
      {avatar && <img src={avatar} alt={name} />}
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}`;

const codeVueComponent = `<!-- Vue 3: Component with props and TypeScript -->
<script setup lang="ts">
interface Props {
  name: string;
  role: string;
  avatar?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="card">
    <img v-if="avatar" :src="avatar" :alt="name" />
    <h2>{{ name }}</h2>
    <p>{{ role }}</p>
  </div>
</template>`;

const codeReactPerf = `// React: memo and useMemo for performance
import { memo, useMemo, useCallback } from 'react';

const ExpensiveList = memo(({ items, onSelect }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onSelect(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});

function Parent({ rawData }) {
  const processed = useMemo(
    () => rawData.filter(x => x.active).sort((a, b) => a.name.localeCompare(b.name)),
    [rawData]
  );
  const handleSelect = useCallback((id) => {
    console.log('selected', id);
  }, []);
  return <ExpensiveList items={processed} onSelect={handleSelect} />;
}`;

const codeVuePerf = `<!-- Vue 3: built-in reactivity is fine-grained -->
<script setup>
import { computed } from 'vue';

const props = defineProps(['rawData']);

// Vue tracks dependencies automatically — no memo needed
const processed = computed(() =>
  props.rawData
    .filter(x => x.active)
    .sort((a, b) => a.name.localeCompare(b.name))
);
</script>

<template>
  <!-- Vue only re-renders components whose reactive deps changed -->
  <ul>
    <li v-for="item in processed" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
</template>`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Vue vs React 2026: Which Framework Should You Choose?',
    intro: 'Vue and React are the two most popular JavaScript UI frameworks in 2026. Both are production-proven, have massive ecosystems, and can build virtually anything. The choice comes down to team preferences, project requirements, and specific trade-offs. This guide provides an honest, detailed comparison covering reactivity models, ecosystem size, performance, learning curve, and the job market.',
    reactivityTitle: 'Reactivity Models: A Fundamental Difference',
    reactivityDesc: 'The biggest conceptual difference between Vue and React is how they handle reactive state. Vue uses a fine-grained reactive system where the framework tracks exactly which components depend on which data. React uses a virtual DOM diffing approach where you explicitly tell React when state changes.',
    reactReactivity: 'React: Explicit State Updates',
    vueReactivity: 'Vue 3: Fine-Grained Reactivity',
    reactivityNote: 'Vue\'s reactivity is automatic — you rarely need to think about optimization. React requires manual memoization (useMemo, useCallback, React.memo) to prevent unnecessary re-renders, which adds cognitive overhead.',
    componentsTitle: 'Component Model Comparison',
    componentsDesc: 'Both frameworks use a component-based architecture, but the syntax and mental model differ significantly.',
    reactComponent: 'React: JSX Components',
    vueComponent: 'Vue: Single File Components (SFCs)',
    svcNote: 'Vue\'s Single File Components (SFCs) co-locate template, script, and style in one .vue file. React uses JSX — JavaScript with HTML-like syntax. Many developers find Vue\'s SFCs more intuitive; React developers prefer the uniformity of "it\'s all JavaScript".',
    perfTitle: 'Performance in 2026',
    perfDesc: 'Raw performance is no longer a meaningful differentiator — both frameworks are fast enough for virtually all applications. The differences matter only at extreme scales.',
    perfReact: 'React Performance Patterns',
    perfVue: 'Vue Performance',
    perfNote: 'Benchmark: Vue 3\'s fine-grained reactivity gives it a slight edge in update performance for large lists. React 18\'s concurrent rendering (Suspense, transitions) makes it better for apps with heavy CPU work. For most apps, the difference is imperceptible.',
    ecosystemTitle: 'Ecosystem & Tooling Comparison',
    ecosystemDesc: 'Ecosystem size affects how quickly you can build features, how many third-party components exist, and how easy it is to find help.',
    jobsTitle: 'Job Market 2026',
    jobsDesc: 'React dominates the job market by a significant margin. This matters if you\'re hiring or looking for work.',
    learningTitle: 'Learning Curve',
    learningDesc: 'Vue is widely regarded as easier to learn, especially for developers coming from traditional HTML/CSS/JS backgrounds.',
    whenReact: 'Choose React When...',
    whenReactItems: 'You need maximum hiring pool|You\'re building a large-scale enterprise app|You want React Native for mobile|Your team is already experienced with React|You need the bleeding-edge concurrent features|You\'re using a meta-framework like Next.js',
    whenVue: 'Choose Vue When...',
    whenVueItems: 'You want faster onboarding for new developers|You prefer more opinionated, structured code|You\'re building with Nuxt.js|You value the SFC format and built-in CSS scoping|Your team has a background in traditional web dev|You want cleaner templates without JSX',
    conclusionTitle: 'Conclusion',
    conclusion: 'In 2026, both Vue and React are excellent choices. React wins on ecosystem size and job market. Vue wins on developer experience, learning curve, and template clarity. Neither will be wrong for most projects. If you\'re starting fresh with no team constraints, Vue 3 + Nuxt.js delivers a more cohesive developer experience. If you\'re optimizing for hiring and ecosystem breadth, React + Next.js is the safer choice.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Is Vue or React faster in 2026?',
    faq1a: 'Both are extremely fast for typical applications. Vue 3\'s fine-grained reactivity gives it a slight edge for frequent small updates. React 18\'s concurrent rendering is better for CPU-intensive work. For 99% of apps, the difference is negligible.',
    faq2q: 'Is Vue dying? Should I still learn it?',
    faq2a: 'Vue is not dying. It has over 200K GitHub stars, millions of npm weekly downloads, and a thriving ecosystem with Nuxt 3, Vite, and Pinia. Vue is especially dominant in Asia (China, Japan) and in the PHP/Laravel ecosystem. It is a very solid career choice.',
    faq3q: 'Can I use TypeScript with both Vue and React?',
    faq3a: 'Yes. Both have first-class TypeScript support. Vue 3\'s Composition API with defineProps<T>() and TypeScript is excellent. React with TypeScript is the industry standard for large codebases. Vue 3 was rewritten in TypeScript, so its internal types are very accurate.',
    faq4q: 'What are the best meta-frameworks for each?',
    faq4a: 'For React: Next.js (the dominant choice), Remix, or Gatsby. For Vue: Nuxt.js (the de facto standard), or Quasar for desktop/mobile. Both meta-frameworks offer SSR, SSG, and file-based routing out of the box.',
    faq5q: 'Should a beginner learn Vue or React first?',
    faq5a: 'Vue is generally easier for beginners because it separates HTML, JavaScript, and CSS more clearly in Single File Components. However, React has more learning resources, tutorials, and job opportunities. If your goal is employment, learn React. If your goal is understanding web frameworks, start with Vue.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Vue vs React 2026：应该选择哪个框架？',
    intro: 'Vue 和 React 是 2026 年最流行的两个 JavaScript UI 框架。两者都经过生产验证，拥有庞大的生态系统，几乎可以构建任何应用。选择哪个取决于团队偏好、项目需求和具体的权衡取舍。本指南对响应性模型、生态系统规模、性能、学习曲线和就业市场进行了详细的对比分析。',
    reactivityTitle: '响应性模型：根本性的差异',
    reactivityDesc: 'Vue 和 React 之间最大的概念差异在于如何处理响应式状态。Vue 使用细粒度响应式系统，框架自动追踪哪些组件依赖哪些数据。React 使用虚拟 DOM 差分方法，需要显式告诉 React 状态何时变化。',
    reactReactivity: 'React：显式状态更新',
    vueReactivity: 'Vue 3：细粒度响应性',
    reactivityNote: 'Vue 的响应性是自动的——你几乎不需要考虑优化。React 需要手动记忆化（useMemo、useCallback、React.memo）来防止不必要的重渲染，增加了认知负担。',
    componentsTitle: '组件模型对比',
    componentsDesc: '两个框架都使用基于组件的架构，但语法和心智模型有显著差异。',
    reactComponent: 'React：JSX 组件',
    vueComponent: 'Vue：单文件组件（SFC）',
    svcNote: 'Vue 的单文件组件（SFC）将模板、脚本和样式整合在一个 .vue 文件中。React 使用 JSX——带有类 HTML 语法的 JavaScript。许多开发者觉得 Vue 的 SFC 更直观；React 开发者则更喜欢"一切都是 JavaScript"的统一性。',
    perfTitle: '2026 年的性能',
    perfDesc: '原始性能不再是有意义的差异化因素——两个框架对于几乎所有应用来说都足够快。差异只在极端规模下才有意义。',
    perfReact: 'React 性能模式',
    perfVue: 'Vue 性能',
    perfNote: '基准测试：Vue 3 的细粒度响应性在大列表的更新性能上略有优势。React 18 的并发渲染（Suspense、transitions）对于 CPU 密集型工作的应用更好。对于大多数应用，差异几乎感知不到。',
    ecosystemTitle: '生态系统和工具对比',
    ecosystemDesc: '生态系统规模影响你构建功能的速度、第三方组件的数量以及寻求帮助的难易程度。',
    jobsTitle: '2026 年就业市场',
    jobsDesc: 'React 以显著优势主导就业市场。如果你在招聘或求职，这很重要。',
    learningTitle: '学习曲线',
    learningDesc: 'Vue 被广泛认为更易学，特别是对于有传统 HTML/CSS/JS 背景的开发者。',
    whenReact: '选择 React 的场景...',
    whenReactItems: '需要最大的招聘池|构建大型企业应用|需要 React Native 开发移动端|团队已有 React 经验|需要最前沿的并发特性|使用 Next.js 等元框架',
    whenVue: '选择 Vue 的场景...',
    whenVueItems: '希望新开发者更快上手|偏好更有规范、结构化的代码|使用 Nuxt.js 构建|重视 SFC 格式和内置 CSS 作用域|团队有传统 Web 开发背景|想要更简洁的模板而不是 JSX',
    conclusionTitle: '结论',
    conclusion: '在 2026 年，Vue 和 React 都是优秀的选择。React 在生态系统规模和就业市场上胜出。Vue 在开发者体验、学习曲线和模板清晰度上胜出。对于大多数项目，两者都不会是错误的选择。如果你在没有团队限制的情况下重新开始，Vue 3 + Nuxt.js 提供了更统一的开发体验。如果你在优化招聘和生态系统广度，React + Next.js 是更安全的选择。',
    faqTitle: '常见问题',
    faq1q: '2026 年 Vue 还是 React 更快？',
    faq1a: '对于典型应用，两者都极快。Vue 3 的细粒度响应性在频繁小更新方面略有优势。React 18 的并发渲染在 CPU 密集型工作上更好。对于 99% 的应用，差异可以忽略不计。',
    faq2q: 'Vue 是否在走下坡路？还值得学习吗？',
    faq2a: 'Vue 并没有走下坡路。它拥有超过 20 万 GitHub star、数百万 npm 周下载量，以及包含 Nuxt 3、Vite 和 Pinia 的繁荣生态系统。Vue 在亚洲（中国、日本）和 PHP/Laravel 生态中尤为主导。它是非常可靠的职业选择。',
    faq3q: 'Vue 和 React 都支持 TypeScript 吗？',
    faq3a: '是的，两者都有一流的 TypeScript 支持。Vue 3 的 Composition API 配合 defineProps<T>() 和 TypeScript 非常出色。React 配合 TypeScript 是大型代码库的行业标准。Vue 3 用 TypeScript 重写，其内部类型非常精确。',
    faq4q: '各自最好的元框架是什么？',
    faq4a: 'React 方面：Next.js（主流选择）、Remix 或 Gatsby。Vue 方面：Nuxt.js（事实标准），或用于桌面/移动的 Quasar。两个元框架都开箱提供 SSR、SSG 和基于文件的路由。',
    faq5q: '初学者应该先学 Vue 还是 React？',
    faq5a: 'Vue 通常对初学者更友好，因为单文件组件更清晰地分离了 HTML、JavaScript 和 CSS。然而 React 有更多学习资源、教程和就业机会。如果你的目标是就业，学 React。如果你的目标是理解 Web 框架，从 Vue 开始。',
    relatedTitle: '相关工具',
  },
};

export default function VueVsReact2026({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  const ecosystemRows = [
    { aspect: 'GitHub Stars', react: '~220K', vue: '~207K' },
    { aspect: 'npm weekly downloads', react: '~25M', vue: '~5M' },
    { aspect: 'Stack Overflow questions', react: '~400K', vue: '~90K' },
    { aspect: 'Official meta-framework', react: 'Next.js', vue: 'Nuxt.js' },
    { aspect: 'State management', react: 'Redux / Zustand / Jotai', vue: 'Pinia (official)' },
    { aspect: 'UI component libraries', react: 'MUI, Ant Design, shadcn', vue: 'Vuetify, PrimeVue, Quasar' },
    { aspect: 'Mobile', react: 'React Native', vue: 'Quasar / Capacitor' },
    { aspect: 'Build tool', react: 'Vite / webpack', vue: 'Vite (default)' },
    { aspect: 'Testing', react: 'Jest + RTL', vue: 'Vitest + Vue Test Utils' },
    { aspect: 'DevTools', react: 'React DevTools', vue: 'Vue DevTools' },
  ];

  const learningRows = [
    { aspect: 'Initial setup', react: 'Medium', vue: 'Easy' },
    { aspect: 'Template syntax', react: 'JSX (JS knowledge required)', vue: 'HTML-like (familiar)' },
    { aspect: 'State management', react: 'useState + useEffect (confusing)', vue: 'ref + computed (intuitive)' },
    { aspect: 'Documentation', react: 'Good', vue: 'Excellent' },
    { aspect: 'Community resources', react: 'Vast', vue: 'Very good' },
    { aspect: 'Time to first app', react: '2-3 days', vue: '1-2 days' },
  ];

  const jobsRows = [
    { metric: 'Indeed job listings (US)', react: '~18,000', vue: '~3,500' },
    { metric: 'LinkedIn job postings', react: '~45,000', vue: '~8,000' },
    { metric: 'Average salary (US)', react: '$135K', vue: '$128K' },
    { metric: 'Freelance demand', react: 'Very high', vue: 'High' },
    { metric: 'Enterprise adoption', react: 'Dominant', vue: 'Strong in Asia & EU' },
  ];

  return (
    <article style={{ maxWidth: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <h2>{t.reactivityTitle}</h2>
      <p>{t.reactivityDesc}</p>

      <h3>{t.reactReactivity}</h3>
      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{codeReactState}</code>
      </pre>

      <h3 style={{ marginTop: '1.5rem' }}>{t.vueReactivity}</h3>
      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{codeVueState}</code>
      </pre>
      <p style={{ background: '#fff3cd', border: '1px solid #ffc107', padding: '0.75rem 1rem', borderRadius: '6px', marginTop: '1rem' }}>{t.reactivityNote}</p>

      <h2 style={{ marginTop: '2.5rem' }}>{t.componentsTitle}</h2>
      <p>{t.componentsDesc}</p>

      <h3>{t.reactComponent}</h3>
      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{codeReactComponent}</code>
      </pre>

      <h3 style={{ marginTop: '1.5rem' }}>{t.vueComponent}</h3>
      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{codeVueComponent}</code>
      </pre>
      <p style={{ color: '#6c757d', fontStyle: 'italic' }}>{t.svcNote}</p>

      <h2 style={{ marginTop: '2.5rem' }}>{t.perfTitle}</h2>
      <p>{t.perfDesc}</p>

      <h3>{t.perfReact}</h3>
      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{codeReactPerf}</code>
      </pre>

      <h3 style={{ marginTop: '1.5rem' }}>{t.perfVue}</h3>
      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{codeVuePerf}</code>
      </pre>
      <p style={{ color: '#6c757d', fontStyle: 'italic' }}>{t.perfNote}</p>

      <h2 style={{ marginTop: '2.5rem' }}>{t.ecosystemTitle}</h2>
      <p>{t.ecosystemDesc}</p>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Aspect</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>React</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Vue 3</th>
            </tr>
          </thead>
          <tbody>
            {ecosystemRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 500 }}>{row.aspect}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.react}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.vue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.jobsTitle}</h2>
      <p>{t.jobsDesc}</p>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Metric</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>React</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Vue</th>
            </tr>
          </thead>
          <tbody>
            {jobsRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 500 }}>{row.metric}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.react}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.vue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.learningTitle}</h2>
      <p>{t.learningDesc}</p>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Aspect</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>React</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Vue 3</th>
            </tr>
          </thead>
          <tbody>
            {learningRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 500 }}>{row.aspect}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.react}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.vue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
        <div style={{ background: '#e8f4fd', padding: '1.25rem', borderRadius: '8px', border: '1px solid #bee3f8' }}>
          <h3 style={{ marginTop: 0, color: '#2b6cb0' }}>{t.whenReact}</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8' }}>
            {t.whenReactItems.split('|').map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div style={{ background: '#e6ffed', padding: '1.25rem', borderRadius: '8px', border: '1px solid #9ae6b4' }}>
          <h3 style={{ marginTop: 0, color: '#276749' }}>{t.whenVue}</h3>
          <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8' }}>
            {t.whenVueItems.split('|').map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.conclusionTitle}</h2>
      <p>{t.conclusion}</p>

      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #4299e1' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><a href="/en/tools/javascript-minifier" style={{ color: '#3182ce' }}>JavaScript Minifier</a></li>
          <li><a href="/en/tools/json-formatter" style={{ color: '#3182ce' }}>JSON Formatter</a></li>
          <li><a href="/en/tools/regex-tester" style={{ color: '#3182ce' }}>Regex Tester</a></li>
        </ul>
      </div>
    </article>
  );
}
