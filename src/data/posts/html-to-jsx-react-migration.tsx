import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Migrating HTML templates to React means rewriting your markup as JSX. While JSX looks similar to HTML, there are <strong>critical differences</strong> that will cause compilation errors if overlooked. This guide covers every change you need to make.',
    linkTool: 'Convert HTML to JSX automatically with our free tool \u2192',
    h2Why: 'Why JSX Is Different from HTML',
    whyDesc: 'JSX is <strong>not HTML</strong>. It\'s a syntax extension for JavaScript that compiles to <code>React.createElement()</code> calls. Because JSX lives inside JavaScript, it follows JavaScript rules \u2014 and several HTML attribute names clash with JavaScript reserved words.',
    whyNote: 'The compiler will throw errors if you use standard HTML attributes like <code>class</code> or <code>for</code> in JSX. Understanding these differences is essential for any React migration.',
    h2Key: 'Key Attribute Differences',
    keyDesc: 'These are the most common attributes that must change when converting HTML to JSX:',
    keyTable: '<table><thead><tr><th>HTML</th><th>JSX</th><th>Reason</th></tr></thead><tbody><tr><td><code>class</code></td><td><code>className</code></td><td><code>class</code> is a reserved JS keyword</td></tr><tr><td><code>for</code></td><td><code>htmlFor</code></td><td><code>for</code> is a reserved JS keyword</td></tr><tr><td><code>tabindex</code></td><td><code>tabIndex</code></td><td>JSX uses camelCase</td></tr><tr><td><code>readonly</code></td><td><code>readOnly</code></td><td>JSX uses camelCase</td></tr><tr><td><code>maxlength</code></td><td><code>maxLength</code></td><td>JSX uses camelCase</td></tr><tr><td><code>onclick</code></td><td><code>onClick</code></td><td>JSX uses camelCase</td></tr><tr><td><code>style="color: red"</code></td><td><code>style=&#123;&#123; color: &quot;red&quot; &#125;&#125;</code></td><td>JSX style is an object</td></tr></tbody></table>',
    h2Style: 'The Style Attribute',
    styleDesc: 'In HTML, <code>style</code> is a string. In JSX, it\'s a <strong>JavaScript object</strong> with camelCase property names:',
    styleNote: 'All CSS property names must be camelCased: <code>background-color</code> becomes <code>backgroundColor</code>, <code>font-size</code> becomes <code>fontSize</code>, <code>z-index</code> becomes <code>zIndex</code>.',
    h2Self: 'Self-Closing Tags',
    selfDesc: 'HTML allows some tags to be unclosed (void elements). In JSX, <strong>every tag must be explicitly closed</strong>:',
    selfList: '<ul><li><code>&lt;br&gt;</code> \u2192 <code>&lt;br /&gt;</code></li><li><code>&lt;hr&gt;</code> \u2192 <code>&lt;hr /&gt;</code></li><li><code>&lt;img src="..."&gt;</code> \u2192 <code>&lt;img src="..." /&gt;</code></li><li><code>&lt;input type="text"&gt;</code> \u2192 <code>&lt;input type="text" /&gt;</code></li><li><code>&lt;meta charset="utf-8"&gt;</code> \u2192 <code>&lt;meta charSet="utf-8" /&gt;</code></li></ul>',
    h2Events: 'Event Handlers',
    eventsDesc: 'HTML uses lowercase event attributes as strings. JSX uses camelCase with function references:',
    eventsNote: 'In JSX, event handlers receive a <code>SyntheticEvent</code>, not a native DOM event. React normalizes events across browsers for consistent behavior.',
    h2Comments: 'Comments in JSX',
    commentsDesc: 'HTML comments (<code>&lt;!-- ... --&gt;</code>) are <strong>not valid</strong> in JSX. Use JavaScript block comments wrapped in curly braces:',
    h2Pitfalls: 'Common Pitfalls',
    pitfallsList: '<ul><li><strong>Forgotten <code>className</code></strong> \u2014 the most common migration error. Search and replace all <code>class=</code> with <code>className=</code></li><li><strong>Inline styles as strings</strong> \u2014 <code>style="margin: 10px"</code> will throw an error; use an object instead</li><li><strong>Unclosed tags</strong> \u2014 <code>&lt;img&gt;</code> or <code>&lt;br&gt;</code> without self-closing slash will fail</li><li><strong>Adjacent elements</strong> \u2014 JSX must return a single root element; wrap siblings in <code>&lt;&gt;...&lt;/&gt;</code> (Fragment)</li><li><strong>Boolean attributes</strong> \u2014 HTML <code>disabled</code> becomes JSX <code>disabled</code> (same) or explicitly <code>disabled=&#123;true&#125;</code></li><li><strong>Curly braces in text</strong> \u2014 literal <code>&#123;</code> and <code>&#125;</code> must be expressed as <code>&#123;\'&#123;\'&#125;</code> and <code>&#123;\'&#125;\'&#125;</code></li></ul>',
    h2Tool: 'Automate Your Migration',
    toolDesc: 'Manually converting large HTML files to JSX is error-prone. Our <strong>HTML to JSX</strong> converter handles all the transformations automatically \u2014 class to className, style strings to objects, self-closing tags, and more.',
    linkToolBottom: 'Try the HTML to JSX converter now \u2192',
  },
  zh: {
    intro: '将 HTML 模板迁移到 React 意味着将标记重写为 JSX。虽然 JSX 看起来类似 HTML，但有<strong>关键差异</strong>，如果忽略这些差异会导致编译错误。本指南涵盖了你需要做的所有更改。',
    linkTool: '使用我们的免费工具自动将 HTML 转换为 JSX \u2192',
    h2Why: '为什么 JSX 与 HTML 不同',
    whyDesc: 'JSX <strong>不是 HTML</strong>。它是 JavaScript 的语法扩展，编译为 <code>React.createElement()</code> 调用。因为 JSX 存在于 JavaScript 中，它遵循 JavaScript 规则——一些 HTML 属性名与 JavaScript 保留字冲突。',
    whyNote: '如果在 JSX 中使用标准的 HTML 属性如 <code>class</code> 或 <code>for</code>，编译器会抛出错误。理解这些差异对于任何 React 迁移都至关重要。',
    h2Key: '关键属性差异',
    keyDesc: '以下是从 HTML 转换为 JSX 时最常见的需要更改的属性：',
    keyTable: '<table><thead><tr><th>HTML</th><th>JSX</th><th>原因</th></tr></thead><tbody><tr><td><code>class</code></td><td><code>className</code></td><td><code>class</code> 是 JS 保留字</td></tr><tr><td><code>for</code></td><td><code>htmlFor</code></td><td><code>for</code> 是 JS 保留字</td></tr><tr><td><code>tabindex</code></td><td><code>tabIndex</code></td><td>JSX 使用 camelCase</td></tr><tr><td><code>readonly</code></td><td><code>readOnly</code></td><td>JSX 使用 camelCase</td></tr><tr><td><code>maxlength</code></td><td><code>maxLength</code></td><td>JSX 使用 camelCase</td></tr><tr><td><code>onclick</code></td><td><code>onClick</code></td><td>JSX 使用 camelCase</td></tr><tr><td><code>style="color: red"</code></td><td><code>style={{\'{\'}color: "red"{\'}\'}</code></td><td>JSX 的 style 是对象</td></tr></tbody></table>',
    h2Style: 'Style 属性',
    styleDesc: '在 HTML 中，<code>style</code> 是字符串。在 JSX 中，它是一个 <strong>JavaScript 对象</strong>，属性名使用 camelCase：',
    styleNote: '所有 CSS 属性名必须使用 camelCase：<code>background-color</code> 变为 <code>backgroundColor</code>，<code>font-size</code> 变为 <code>fontSize</code>，<code>z-index</code> 变为 <code>zIndex</code>。',
    h2Self: '自闭合标签',
    selfDesc: 'HTML 允许某些标签不闭合（空元素）。在 JSX 中，<strong>每个标签都必须显式关闭</strong>：',
    selfList: '<ul><li><code>&lt;br&gt;</code> \u2192 <code>&lt;br /&gt;</code></li><li><code>&lt;hr&gt;</code> \u2192 <code>&lt;hr /&gt;</code></li><li><code>&lt;img src="..."&gt;</code> \u2192 <code>&lt;img src="..." /&gt;</code></li><li><code>&lt;input type="text"&gt;</code> \u2192 <code>&lt;input type="text" /&gt;</code></li><li><code>&lt;meta charset="utf-8"&gt;</code> \u2192 <code>&lt;meta charSet="utf-8" /&gt;</code></li></ul>',
    h2Events: '事件处理器',
    eventsDesc: 'HTML 使用小写事件属性作为字符串。JSX 使用 camelCase 并传入函数引用：',
    eventsNote: '在 JSX 中，事件处理器接收的是 <code>SyntheticEvent</code>，而不是原生 DOM 事件。React 会跨浏览器规范化事件以保持一致行为。',
    h2Comments: 'JSX 中的注释',
    commentsDesc: 'HTML 注释（<code>&lt;!-- ... --&gt;</code>）在 JSX 中<strong>无效</strong>。需要使用 JavaScript 块注释包裹在花括号中：',
    h2Pitfalls: '常见陷阱',
    pitfallsList: '<ul><li><strong>忘记 <code>className</code></strong>——最常见的迁移错误。搜索替换所有 <code>class=</code> 为 <code>className=</code></li><li><strong>内联样式使用字符串</strong>——<code>style="margin: 10px"</code> 会抛出错误；需要使用对象</li><li><strong>未闭合标签</strong>——没有自闭合斜杠的 <code>&lt;img&gt;</code> 或 <code>&lt;br&gt;</code> 会报错</li><li><strong>相邻元素</strong>——JSX 必须返回单个根元素；用 <code>&lt;&gt;...&lt;/&gt;</code>（Fragment）包裹兄弟元素</li><li><strong>布尔属性</strong>——HTML 的 <code>disabled</code> 在 JSX 中相同，或显式写为 <code>disabled=&#123;true&#125;</code></li><li><strong>文本中的花括号</strong>——字面量 <code>&#123;</code> 和 <code>&#125;</code> 必须使用 <code>&#123;\'&#123;\'&#125;</code> 和 <code>&#123;\'&#125;\'&#125;</code> 表示</li></ul>',
    h2Tool: '自动化迁移',
    toolDesc: '手动将大型 HTML 文件转换为 JSX 容易出错。我们的 <strong>HTML to JSX</strong> 转换器自动处理所有转换——class 到 className、style 字符串到对象、自闭合标签等。',
    linkToolBottom: '立即试用 HTML to JSX 转换器 \u2192',
  },
};

export default function HtmlToJsxReactMigration({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <p>
        <Link href={`/${lang}/tools/html-to-jsx`} style={{ fontWeight: 600 }}>
          {s.linkTool}
        </Link>
      </p>

      <h2 dangerouslySetInnerHTML={{ __html: s.h2Why }} />
      <p dangerouslySetInnerHTML={{ __html: s.whyDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.whyNote }} />

      <h2>{s.h2Key}</h2>
      <p>{s.keyDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: s.keyTable }} />

      <h2 dangerouslySetInnerHTML={{ __html: s.h2Style }} />
      <p dangerouslySetInnerHTML={{ __html: s.styleDesc }} />

      <pre><code>{`<!-- HTML -->
<div style="background-color: #f0f0f0; font-size: 14px; margin-top: 20px;">
  Hello
</div>

// JSX
<div style={{ backgroundColor: "#f0f0f0", fontSize: "14px", marginTop: "20px" }}>
  Hello
</div>`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.styleNote }} />

      <h2>{s.h2Self}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.selfDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.selfList }} />

      <pre><code>{`<!-- HTML -->
<img src="photo.jpg" alt="Photo">
<input type="email" placeholder="Email">
<br>

// JSX
<img src="photo.jpg" alt="Photo" />
<input type="email" placeholder="Email" />
<br />`}</code></pre>

      <h2>{s.h2Events}</h2>
      <p>{s.eventsDesc}</p>

      <pre><code>{`<!-- HTML -->
<button onclick="handleClick()">Click me</button>
<input onchange="handleChange()" onfocus="handleFocus()">

// JSX
<button onClick={handleClick}>Click me</button>
<input onChange={handleChange} onFocus={handleFocus} />`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.eventsNote }} />

      <h2>{s.h2Comments}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.commentsDesc }} />

      <pre><code>{`<!-- HTML comment -->
<div>Hello</div>

// JSX comment
<div>
  {/* This is a JSX comment */}
  Hello
</div>`}</code></pre>

      <h2>{s.h2Pitfalls}</h2>
      <div dangerouslySetInnerHTML={{ __html: s.pitfallsList }} />

      <pre><code>{`// Fragment wrapper for multiple elements
function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}`}</code></pre>

      <h2>{s.h2Tool}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.toolDesc }} />

      <p>
        <Link href={`/${lang}/tools/html-to-jsx`} style={{ fontWeight: 600 }}>
          {s.linkToolBottom}
        </Link>
      </p>
    </>
  );
}
