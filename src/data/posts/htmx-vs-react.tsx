'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'HTMX vs React: Hypermedia vs SPA Architecture in 2025',
    intro: 'React has dominated frontend development for a decade, but HTMX challenges the SPA paradigm by bringing interactivity back to HTML. This comparison examines when hypermedia-driven development beats client-side JavaScript, and where React still reigns supreme.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'HTMX offers simpler architecture with HTML-first development, smaller bundles (14KB vs 150KB+), and no build step. React provides richer interactivity, better complex state management, and larger ecosystem. Choose HTMX for content-driven sites and simple CRUD apps; choose React for highly interactive applications and complex client-side logic.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'HTMX is 10x smaller than React (14KB vs 150KB+ minified)',
    takeaway2: 'HTMX requires no build step - works with any backend language',
    takeaway3: 'React excels at complex client-side state and instant interactions',
    takeaway4: 'HTMX leverages existing HTML/CSS skills - lower learning curve',
    takeaway5: 'Both can coexist: HTMX for pages, React for complex widgets',
    takeaway6: 'HTMX follows HATEOAS principles for better REST architecture',
    
    whatIsHtmxTitle: 'What is HTMX?',
    whatIsHtmxContent: 'HTMX extends HTML with attributes that enable AJAX, CSS transitions, WebSockets, and server-sent events directly in markup. Created by Carson Gross in 2020, it follows the original web vision where servers return HTML, not JSON. HTMX lets you build modern UIs with simple HTML attributes like hx-get, hx-post, and hx-swap.',
    
    whatIsReactTitle: 'What is React?',
    whatIsReactContent: 'React, created by Facebook in 2013, revolutionized frontend development with its component-based architecture and virtual DOM. It treats the UI as a function of state, enabling declarative rendering and efficient updates. React has become the foundation of modern frontend development with a massive ecosystem of libraries and tools.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Real-world metrics for a typical CRUD application:',
    
    loadBenchmarkTitle: 'Initial Load Performance',
    loadBenchmarkIntro: 'Time to first meaningful paint:',
    
    interactivityTitle: 'Interactivity Patterns',
    interactivityIntro: 'How each handles user interactions:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Capabilities and architectural differences:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'The same feature implemented differently:',
    
    htmxExampleTitle: 'HTMX',
    reactExampleTitle: 'React',
    
    architectureTitle: 'Architecture Patterns',
    architectureIntro: 'How data flows in each approach:',
    
    ecosystemTitle: 'Ecosystem & Tooling',
    ecosystemIntro: 'Libraries, frameworks, and developer tools:',
    
    whenToUseTitle: 'When to Use Each Approach',
    htmxBestFor: 'Use HTMX When:',
    reactBestFor: 'Use React When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, the choice between HTMX and React isn\'t binary - they serve different needs. HTMX excels for content-driven sites, admin panels, and teams wanting simplicity. React remains superior for highly interactive apps, real-time collaboration, and complex state management. Consider your team\'s skills, project complexity, and performance requirements. Many successful projects use both: HTMX for page structure and React for interactive widgets.',
    
    faq1q: 'Can HTMX replace React entirely?',
    faq1a: 'Yes for many applications. CRUD apps, content sites, admin panels, and dashboards work great with HTMX alone. However, highly interactive apps like games, real-time collaborative editors, or complex drag-and-drop interfaces still benefit from React\'s client-side capabilities.',
    
    faq2q: 'Does HTMX work with any backend?',
    faq2a: 'Yes! HTMX is backend-agnostic. It works with Python (Django/Flask), Ruby on Rails, Go, PHP, Node.js, Java, .NET, and any language that can return HTML. This is one of HTMX\'s biggest advantages.',
    
    faq3q: 'Is HTMX slower than React?',
    faq3a: 'For interactions, HTMX makes network requests while React updates locally. However, HTMX\'s approach often feels faster due to smaller initial load and simpler mental model. With proper caching and optimistic updates, HTMX can match perceived React performance.',
    
    faq4q: 'Can I use React and HTMX together?',
    faq4a: 'Absolutely! Many teams use HTMX for page navigation and structure, embedding React components for complex interactive widgets. This gives you HTMX\'s simplicity for most pages with React\'s power where needed.',
    
    faq5q: 'What about SEO with React vs HTMX?',
    faq5a: 'HTMX pages are server-rendered HTML, so SEO works out of the box. React requires SSR (Next.js) or pre-rendering for optimal SEO. For SEO-critical sites, HTMX or React SSR are both good choices.',
    
    faq6q: 'How does state management compare?',
    faq6a: 'React has sophisticated state management (Redux, Zustand, Jotai) for complex client-side state. HTMX keeps state on the server, returning to classic web architecture. Each approach has merits depending on your use case.',
    
    faq7q: 'What\'s the learning curve for HTMX?',
    faq7a: 'HTMX is much easier to learn. If you know HTML and any backend language, you can be productive in hours. React requires learning JSX, hooks, state management, build tools, and the broader ecosystem.',
    
    faq8q: 'Does HTMX support animations and transitions?',
    faq8a: 'Yes! HTMX integrates with CSS transitions and the View Transitions API. You can add smooth animations with simple CSS classes. While React has more animation libraries, HTMX covers most common transition needs.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'HTMX vs React：2025年超媒体与SPA架构对比',
    intro: 'React主导前端开发已十年，但HTMX通过将交互性带回HTML，挑战了SPA范式。本比较探讨了超媒体驱动开发何时胜过客户端JavaScript，以及React仍在何处占主导地位。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'HTMX提供更简单的架构，采用HTML优先开发，包更小（14KB vs 150KB+），无需构建步骤。React提供更丰富的交互性、更好的复杂状态管理和更大的生态系统。内容驱动网站和简单CRUD应用选择HTMX；高度交互应用和复杂客户端逻辑选择React。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'HTMX比React小10倍（压缩后14KB vs 150KB+）',
    takeaway2: 'HTMX无需构建步骤——可与任何后端语言配合',
    takeaway3: 'React擅长复杂客户端状态和即时交互',
    takeaway4: 'HTMX利用现有HTML/CSS技能——学习曲线更低',
    takeaway5: '两者可以共存：HTMX用于页面，React用于复杂小部件',
    takeaway6: 'HTMX遵循HATEOAS原则，实现更好的REST架构',
    
    whatIsHtmxTitle: '什么是HTMX？',
    whatIsHtmxContent: 'HTMX通过属性扩展HTML，直接在标记中启用AJAX、CSS过渡、WebSocket和服务器发送事件。由Carson Gross于2020年创建，它遵循原始网络愿景：服务器返回HTML而非JSON。HTMX让你用简单的HTML属性（如hx-get、hx-post和hx-swap）构建现代UI。',
    
    whatIsReactTitle: '什么是React？',
    whatIsReactContent: 'React由Facebook于2013年创建，以其基于组件的架构和虚拟DOM革新了前端开发。它将UI视为状态的函数，实现声明式渲染和高效更新。React已成为现代前端开发的基础，拥有庞大的库和工具生态系统。',
    
    performanceTitle: '性能对比',
    performanceIntro: '典型CRUD应用的真实指标：',
    
    loadBenchmarkTitle: '初始加载性能',
    loadBenchmarkIntro: '首次有意义绘制时间：',
    
    interactivityTitle: '交互模式',
    interactivityIntro: '每种方式如何处理用户交互：',
    
    featuresTitle: '功能对比',
    featuresIntro: '功能和架构差异：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '相同功能的不同实现：',
    
    htmxExampleTitle: 'HTMX',
    reactExampleTitle: 'React',
    
    architectureTitle: '架构模式',
    architectureIntro: '数据如何在每种方法中流动：',
    
    ecosystemTitle: '生态系统和工具',
    ecosystemIntro: '库、框架和开发者工具：',
    
    whenToUseTitle: '何时使用每种方法',
    htmxBestFor: '使用HTMX的场景：',
    reactBestFor: '使用React的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，HTMX和React之间的选择不是二元的——它们服务于不同的需求。HTMX在内容驱动网站、管理面板和追求简单性的团队中表现出色。React在高度交互应用、实时协作和复杂状态管理方面仍然更优。考虑你团队的技能、项目复杂性和性能需求。许多成功的项目同时使用两者：HTMX用于页面结构，React用于交互小部件。',
    
    faq1q: 'HTMX可以完全取代React吗？',
    faq1a: '对于许多应用可以。CRUD应用、内容网站、管理面板和仪表板单独使用HTMX效果很好。然而，高度交互的应用如游戏、实时协作编辑器或复杂的拖放界面仍然受益于React的客户端能力。',
    
    faq2q: 'HTMX可以与任何后端配合吗？',
    faq2a: '可以！HTMX与后端无关。它可以与Python（Django/Flask）、Ruby on Rails、Go、PHP、Node.js、Java、.NET以及任何可以返回HTML的语言配合。这是HTMX最大的优势之一。',
    
    faq3q: 'HTMX比React慢吗？',
    faq3a: '对于交互，HTMX进行网络请求而React本地更新。然而，由于更小的初始加载和更简单的心智模型，HTMX的方法通常感觉更快。通过适当的缓存和乐观更新，HTMX可以匹配感知到的React性能。',
    
    faq4q: '我可以同时使用React和HTMX吗？',
    faq4a: '当然可以！许多团队使用HTMX进行页面导航和结构，为复杂的交互小部件嵌入React组件。这为你提供了大多数页面的HTMX简单性和需要时的React强大功能。',
    
    faq5q: 'React与HTMX的SEO如何？',
    faq5a: 'HTMX页面是服务器渲染的HTML，所以SEO开箱即用。React需要SSR（Next.js）或预渲染以获得最佳SEO。对于SEO关键网站，HTMX或React SSR都是不错的选择。',
    
    faq6q: '状态管理如何比较？',
    faq6a: 'React有复杂的状态管理（Redux、Zustand、Jotai）用于复杂的客户端状态。HTMX将状态保持在服务器上，回归经典网络架构。每种方法根据你的用例都有优点。',
    
    faq7q: 'HTMX的学习曲线如何？',
    faq7a: 'HTMX更容易学习。如果你知道HTML和任何后端语言，你可以在几小时内变得高效。React需要学习JSX、hooks、状态管理、构建工具和更广泛的生态系统。',
    
    faq8q: 'HTMX支持动画和过渡吗？',
    faq8a: '支持！HTMX与CSS过渡和View Transitions API集成。你可以用简单的CSS类添加平滑动画。虽然React有更多动画库，但HTMX涵盖了大多数常见的过渡需求。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function HtmxVsReact({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsHtmxTitle}</h3>
      <p style={pStyle}>{ct.whatIsHtmxContent}</p>

      <h3 style={h3Style}>{ct.whatIsReactTitle}</h3>
      <p style={pStyle}>{ct.whatIsReactContent}</p>

      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>HTMX</th>
              <th style={thStyle}>React</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '范式' : 'Paradigm', isZh ? '超媒体驱动' : 'Hypermedia-driven', isZh ? '客户端SPA' : 'Client-side SPA'],
              [isZh ? '渲染位置' : 'Rendering', isZh ? '服务器' : 'Server', isZh ? '客户端（可SSR）' : 'Client (SSR optional)'],
              [isZh ? '状态管理' : 'State Management', isZh ? '服务器端' : 'Server-side', isZh ? '客户端' : 'Client-side'],
              [isZh ? '构建步骤' : 'Build Step', isZh ? '无' : 'None', isZh ? '需要' : 'Required'],
              [isZh ? '包大小' : 'Bundle Size', '14KB', '150KB+'],
              [isZh ? '数据格式' : 'Data Format', 'HTML', 'JSON'],
              [isZh ? '路由' : 'Routing', isZh ? '服务器端' : 'Server-side', isZh ? '客户端' : 'Client-side'],
            ].map(([feature, htmx, react], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#3b82f6' }}>{htmx}</td>
                <td style={{ ...tdStyle, color: '#61dafb' }}>{react}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.loadBenchmarkTitle}</h3>
      <p style={pStyle}>{ct.loadBenchmarkIntro}</p>

      <pre style={codeStyle}><code>{`<!-- HTMX - Server renders HTML -->
<div hx-get="/users" hx-trigger="load">
  Loading users...
</div>

<!-- React - Client fetches JSON, renders locally -->
function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);
  
  return users.map(u => <UserCard user={u} />);
}`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>HTMX</th>
              <th style={thStyle}>React SPA</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次内容绘制' : 'First Contentful Paint', '0.4s', '1.2s'],
              [isZh ? '可交互时间' : 'Time to Interactive', '0.5s', '2.5s'],
              [isZh ? '总阻塞时间' : 'Total Blocking Time', '50ms', '350ms'],
              [isZh ? 'JavaScript大小' : 'JavaScript Size', '14KB', '180KB'],
              [isZh ? '首次输入延迟' : 'First Input Delay', '10ms', '80ms'],
            ].map(([metric, htmx, react], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{htmx}</td>
                <td style={tdStyle}>{react}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.interactivityTitle}</h3>
      <p style={pStyle}>{ct.interactivityIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>HTMX</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '每次交互都向服务器请求HTML片段。服务器渲染部分HTML，HTMX将其交换到DOM中。适合大多数CRUD操作，感觉即时，有适当的指示器和乐观更新。' : 'Each interaction requests HTML fragment from server. Server renders partial HTML, HTMX swaps it into DOM. Great for most CRUD operations, feels instant with proper indicators and optimistic updates.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #61dafb' }}>
          <strong style={{ color: '#61dafb' }}>React</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '交互立即更新本地状态，然后与服务器同步。无需网络往返即可即时反馈。更适合实时协作、拖放和复杂动画。' : 'Interactions update local state immediately, then sync with server. Instant feedback without network round-trip. Better for real-time collaboration, drag-and-drop, and complex animations.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>HTMX</th>
              <th style={thStyle}>React</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'AJAX请求' : 'AJAX Requests', 'hx-get/post/put/delete', 'fetch/axios'],
              [isZh ? '部分更新' : 'Partial Updates', 'hx-swap', isZh ? '虚拟DOM' : 'Virtual DOM'],
              [isZh ? 'CSS过渡' : 'CSS Transitions', 'hx-swap-oob', isZh ? 'CSS/动画库' : 'CSS/Animation libs'],
              [isZh ? 'WebSocket' : 'WebSocket', 'hx-ext="ws"', isZh ? '原生或库' : 'Native or libs'],
              [isZh ? '表单验证' : 'Form Validation', 'hx-validate', isZh ? '受控组件' : 'Controlled components'],
              [isZh ? '无限滚动' : 'Infinite Scroll', 'hx-trigger="revealed"', isZh ? '自定义逻辑' : 'Custom logic'],
              [isZh ? '懒加载' : 'Lazy Loading', 'hx-trigger="load delay:1s"', 'React.lazy/Suspense'],
              [isZh ? '本地状态' : 'Local State', isZh ? '有限（hx-on）' : 'Limited (hx-on)', 'useState/useReducer'],
              [isZh ? '复杂动画' : 'Complex Animations', isZh ? 'CSS为主' : 'CSS-based', isZh ? '丰富的库' : 'Rich libraries'],
              [isZh ? '离线支持' : 'Offline Support', isZh ? '需要Service Worker' : 'Needs Service Worker', isZh ? '需要额外设置' : 'Needs setup'],
            ].map(([feature, htmx, react], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{htmx}</td>
                <td style={tdStyle}>{react}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.htmxExampleTitle}</h3>
      <pre style={codeStyle}><code>{`<!-- HTMX - Todo List with Search -->
<!-- No JavaScript required! -->

<div id="todo-app">
  <!-- Search with live results -->
  <input 
    type="search" 
    name="q"
    hx-get="/todos/search"
    hx-trigger="input changed delay:300ms"
    hx-target="#todo-list"
    placeholder="Search todos..."
  >
  
  <!-- Todo list loaded on page load -->
  <ul id="todo-list" hx-get="/todos" hx-trigger="load">
    <li>Loading...</li>
  </ul>
  
  <!-- Add new todo form -->
  <form hx-post="/todos" hx-target="#todo-list" hx-swap="beforeend">
    <input type="text" name="title" placeholder="New todo" required>
    <button type="submit">Add</button>
  </form>
</div>

<!-- Server returns HTML partials -->
<!-- GET /todos/search?q=test returns: -->
<li>
  <input type="checkbox" hx-post="/todos/1/toggle" hx-target="closest li">
  <span>Test the feature</span>
  <button hx-delete="/todos/1" hx-target="closest li" hx-swap="outerHTML">
    Delete
  </button>
</li>

<!-- Backend (Python Flask example) -->
@app.route('/todos')
def get_todos():
    todos = db.query("SELECT * FROM todos")
    return render_template('todos/_list.html', todos=todos)

@app.route('/todos', methods=['POST'])
def create_todo():
    todo = db.insert_todo(request.form['title'])
    return render_template('todos/_item.html', todo=todo)`}</code></pre>

      <h3 style={{ ...h3Style, color: '#61dafb' }}>{ct.reactExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// React - Todo List with Search
// Requires: react, state management, API client

import { useState, useEffect } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch todos on mount and when search changes
  useEffect(() => {
    setLoading(true);
    fetch(\`/api/todos?q=\${search}\`)
      .then(res => res.json())
      .then(data => {
        setTodos(data);
        setLoading(false);
      });
  }, [search]);

  // Add new todo
  const addTodo = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }),
    });
    const todo = await res.json();
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  // Toggle todo
  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    const res = await fetch(\`/api/todos/\${id}\`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    const updated = await res.json();
    setTodos(todos.map(t => t.id === id ? updated : t));
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(\`/api/todos/\${id}\`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search todos..."
      />
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.title}</span>
              <button onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

// Backend API (Express.js example)
app.get('/api/todos', (req, res) => {
  const todos = db.query('SELECT * FROM todos WHERE title LIKE ?', 
    [\`%\${req.query.q || ''}%\`]);
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const todo = db.insertTodo(req.body.title);
  res.json(todo);
});`}</code></pre>

      <h2 style={h2Style}>{ct.architectureTitle}</h2>
      <p style={pStyle}>{ct.architectureIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '模式' : 'Pattern'}</th>
              <th style={thStyle}>HTMX</th>
              <th style={thStyle}>React</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '数据流' : 'Data Flow', isZh ? '服务器→HTML→浏览器' : 'Server→HTML→Browser', isZh ? '服务器→JSON→客户端→渲染' : 'Server→JSON→Client→Render'],
              [isZh ? '状态位置' : 'State Location', isZh ? '服务器（数据库）' : 'Server (database)', isZh ? '客户端+服务器' : 'Client + Server'],
              [isZh ? 'API类型' : 'API Type', isZh ? 'HTML端点' : 'HTML endpoints', isZh ? 'REST/GraphQL JSON' : 'REST/GraphQL JSON'],
              [isZh ? '缓存策略' : 'Caching', isZh ? 'HTTP缓存头' : 'HTTP cache headers', isZh ? '客户端缓存+HTTP' : 'Client cache + HTTP'],
              [isZh ? 'HATEOAS' : 'HATEOAS', '✓ Native', isZh ? '需要额外工作' : 'Extra work needed'],
            ].map(([pattern, htmx, react], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{pattern}</td>
                <td style={tdStyle}>{htmx}</td>
                <td style={tdStyle}>{react}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.ecosystemTitle}</h2>
      <p style={pStyle}>{ct.ecosystemIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>HTMX</th>
              <th style={thStyle}>React</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'GitHub Stars' : 'GitHub Stars', '~40K', '~220K'],
              [isZh ? 'npm周下载' : 'npm weekly downloads', '~150K', '~25M'],
              [isZh ? 'UI库' : 'UI Libraries', isZh ? '使用任何CSS框架' : 'Use any CSS framework', 'MUI, Chakra, Radix, etc.'],
              [isZh ? '后端框架' : 'Backend Frameworks', isZh ? '任何后端语言' : 'Any backend language', isZh ? 'Node.js优先' : 'Node.js preferred'],
              [isZh ? '测试工具' : 'Testing Tools', isZh ? '服务端测试' : 'Server-side testing', 'Jest, RTL, Cypress'],
              [isZh ? 'IDE支持' : 'IDE Support', isZh ? 'HTML属性补全' : 'HTML attr completion', isZh ? '完整TS/JSX支持' : 'Full TS/JSX support'],
              [isZh ? '学习资源' : 'Learning Resources', 'htmx.org, hypermedia.systems', isZh ? '广泛' : 'Extensive'],
            ].map(([aspect, htmx, react], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={tdStyle}>{htmx}</td>
                <td style={tdStyle}>{react}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.htmxBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '内容驱动网站' : 'Content-driven websites'}</li>
            <li>{isZh ? 'CRUD应用' : 'CRUD applications'}</li>
            <li>{isZh ? '管理面板' : 'Admin panels'}</li>
            <li>{isZh ? '非JS后端团队' : 'Non-JS backend teams'}</li>
            <li>{isZh ? '简单架构需求' : 'Simple architecture needs'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '渐进增强' : 'Progressive enhancement'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #61dafb' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#61dafb' }}>{ct.reactBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '高度交互应用' : 'Highly interactive apps'}</li>
            <li>{isZh ? '实时协作' : 'Real-time collaboration'}</li>
            <li>{isZh ? '复杂状态管理' : 'Complex state management'}</li>
            <li>{isZh ? '离线优先应用' : 'Offline-first apps'}</li>
            <li>{isZh ? '富文本编辑器' : 'Rich text editors'}</li>
            <li>{isZh ? '游戏/Canvas' : 'Games/Canvas'}</li>
            <li>{isZh ? '移动应用(RN)' : 'Mobile apps (RN)'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/uuid-generator`} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
