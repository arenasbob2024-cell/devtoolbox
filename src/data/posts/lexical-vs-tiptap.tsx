'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Lexical vs Tiptap: Rich Text Editor Comparison 2025',
    intro: 'Rich text editors are crucial for modern web applications, and Lexical and Tiptap represent two different approaches. Lexical, from Meta, offers a framework-like architecture, while Tiptap provides a headless editor with extensive extensions. This comparison helps you choose the right editor for your project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Lexical is ideal for developers who want a modern, framework-like editor with excellent performance and accessibility. Tiptap excels for teams needing extensive out-of-the-box features and a modular extension system. Choose Lexical for custom, performant editors; Tiptap for feature-rich, quickly-deployed solutions.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Lexical is developed by Meta (Facebook) for modern needs',
    takeaway2: 'Tiptap is headless and works with any framework',
    takeaway3: 'Both offer excellent TypeScript support',
    takeaway4: 'Lexical has better performance for complex documents',
    takeaway5: 'Tiptap has more extensions available out of the box',
    takeaway6: 'Both support collaborative editing',
    
    whatIsLexicalTitle: 'What is Lexical?',
    whatIsLexicalContent: 'Lexical is an extensible text editor framework developed by Meta. Created as a successor to Draft.js, it prioritizes accessibility, performance, and reliability. Lexical provides a clean architecture with a double-buffered state system, making it ideal for complex applications like Facebook and Instagram.',
    
    whatIsTiptapTitle: 'What is Tiptap?',
    whatIsTiptapContent: 'Tiptap is a headless rich text editor built on ProseMirror. It offers a modular architecture where you pick and choose extensions to build your perfect editor. Tiptap is framework-agnostic and provides 50+ extensions for features like tables, collaboration, and drag-and-drop.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmark results for typical editor operations:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Detailed comparison of editor capabilities:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Basic setup and usage comparison:',
    
    lexicalExampleTitle: 'Lexical Editor',
    tiptapExampleTitle: 'Tiptap Editor',
    
    extensionsTitle: 'Extension Ecosystem',
    extensionsIntro: 'Available extensions and plugins:',
    
    collaborationTitle: 'Collaboration Features',
    collaborationIntro: 'Real-time collaboration support:',
    
    whenToUseTitle: 'When to Use Each',
    lexicalBestFor: 'Use Lexical When:',
    tiptapBestFor: 'Use Tiptap When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both Lexical and Tiptap are excellent choices with distinct strengths. Lexical offers superior performance and a modern architecture backed by Meta, making it ideal for large-scale applications with custom requirements. Tiptap provides a faster path to feature-rich editors with its extensive extension library and headless design. For teams wanting quick deployment with standard features, Tiptap is the better choice. For applications requiring high performance and custom behavior, Lexical excels.',
    
    faq1q: 'Is Lexical production-ready?',
    faq1a: 'Yes, Lexical is production-ready and powers editors at Meta including Facebook and Instagram. It reached stable status and has a growing community with regular updates.',
    
    faq2q: 'Can I use Tiptap with React?',
    faq2a: 'Yes, Tiptap has official React bindings with hooks and components. It also supports Vue, Svelte, and vanilla JavaScript through its headless architecture.',
    
    faq3q: 'Which editor is more accessible?',
    faq3a: 'Both prioritize accessibility, but Lexical was built with screen readers and keyboard navigation as core requirements. It follows WAI-ARIA standards closely and is tested with assistive technologies.',
    
    faq4q: 'How do migrations work?',
    faq4a: 'Tiptap has migration guides for moving from other editors like Quill, Slate, and Draft.js. Lexical provides Draft.js migration tools since it was designed as a successor. Both support importing from JSON.',
    
    faq5q: 'Can I customize the UI completely?',
    faq5a: 'Yes, both are headless. Tiptap is fully headless by design. Lexical provides a default UI but can be fully customized. You have complete control over rendering in both.',
    
    faq6q: 'What about mobile support?',
    faq6a: 'Both work on mobile browsers. Lexical has specific optimizations for mobile and is used in Instagram. Tiptap works well on mobile but may need additional styling for optimal touch experience.',
    
    faq7q: 'How does collaboration work?',
    faq7a: 'Both support Y.js for real-time collaboration. Tiptap has official Y.js extensions. Lexical supports collaboration through its own sync system or Y.js integration. Both can connect to WebSocket servers.',
    
    faq8q: 'Which has better documentation?',
    faq8a: 'Tiptap has more comprehensive documentation with examples and guides. Lexical\'s docs are good but less extensive. Both have active communities and Discord servers for support.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Lexical vs Tiptap：富文本编辑器对比 2025',
    intro: '富文本编辑器对现代Web应用至关重要，Lexical和Tiptap代表两种不同的方法。来自Meta的Lexical提供类似框架的架构，而Tiptap提供带有广泛扩展的无头编辑器。本比较帮助你为项目选择合适的编辑器。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Lexical是希望获得现代、类似框架编辑器的开发者的理想选择，具有出色的性能和可访问性。Tiptap适合需要开箱即用功能和模块化扩展系统的团队。追求自定义和性能选Lexical；追求功能丰富和快速部署选Tiptap。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Lexical由Meta（Facebook）开发，面向现代需求',
    takeaway2: 'Tiptap是无头的，可与任何框架配合使用',
    takeaway3: '两者都提供出色的TypeScript支持',
    takeaway4: 'Lexical在复杂文档上有更好的性能',
    takeaway5: 'Tiptap开箱即用有更多可用扩展',
    takeaway6: '两者都支持协作编辑',
    
    whatIsLexicalTitle: '什么是Lexical？',
    whatIsLexicalContent: 'Lexical是由Meta开发的可扩展文本编辑器框架。作为Draft.js的继任者创建，它优先考虑可访问性、性能和可靠性。Lexical提供干净的架构和双缓冲状态系统，使其成为Facebook和Instagram等复杂应用的理想选择。',
    
    whatIsTiptapTitle: '什么是Tiptap？',
    whatIsTiptapContent: 'Tiptap是基于ProseMirror构建的无头富文本编辑器。它提供模块化架构，你可以挑选扩展来构建完美的编辑器。Tiptap与框架无关，提供50多个扩展，支持表格、协作和拖放等功能。',
    
    performanceTitle: '性能对比',
    performanceIntro: '典型编辑器操作的基准测试结果：',
    
    featuresTitle: '功能对比',
    featuresIntro: '编辑器能力详细比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '基本设置和用法比较：',
    
    lexicalExampleTitle: 'Lexical编辑器',
    tiptapExampleTitle: 'Tiptap编辑器',
    
    extensionsTitle: '扩展生态系统',
    extensionsIntro: '可用的扩展和插件：',
    
    collaborationTitle: '协作功能',
    collaborationIntro: '实时协作支持：',
    
    whenToUseTitle: '何时使用哪个',
    lexicalBestFor: '使用Lexical的场景：',
    tiptapBestFor: '使用Tiptap的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Lexical和Tiptap都是优秀的选择，各有优势。Lexical提供卓越的性能和Meta支持的现代架构，非常适合有自定义需求的大规模应用。Tiptap凭借其丰富的扩展库和无头设计，为功能丰富的编辑器提供更快的实现路径。对于希望快速部署标准功能的团队，Tiptap是更好的选择。对于需要高性能和自定义行为的应用，Lexical表现出色。',
    
    faq1q: 'Lexical已经可以用于生产了吗？',
    faq1a: '是的，Lexical已经可以用于生产，为Meta的编辑器提供支持，包括Facebook和Instagram。它已达到稳定状态，社区不断增长，定期更新。',
    
    faq2q: '我可以在React中使用Tiptap吗？',
    faq2a: '可以，Tiptap有官方React绑定，提供hooks和组件。它还通过其无头架构支持Vue、Svelte和原生JavaScript。',
    
    faq3q: '哪个编辑器更易于访问？',
    faq3a: '两者都优先考虑可访问性，但Lexical将屏幕阅读器和键盘导航作为核心需求构建。它紧密遵循WAI-ARIA标准，并经过辅助技术测试。',
    
    faq4q: '迁移如何工作？',
    faq4a: 'Tiptap有从Quill、Slate和Draft.js等其他编辑器迁移的指南。Lexical提供Draft.js迁移工具，因为它是作为继任者设计的。两者都支持从JSON导入。',
    
    faq5q: '我可以完全自定义UI吗？',
    faq5a: '可以，两者都是无头的。Tiptap在设计上完全无头。Lexical提供默认UI但可以完全自定义。两者都让你完全控制渲染。',
    
    faq6q: '移动端支持如何？',
    faq6a: '两者都在移动浏览器上工作。Lexical针对移动端有特定优化，在Instagram中使用。Tiptap在移动端工作良好，但可能需要额外样式以获得最佳触控体验。',
    
    faq7q: '协作如何工作？',
    faq7a: '两者都支持Y.js进行实时协作。Tiptap有官方Y.js扩展。Lexical通过自己的同步系统或Y.js集成支持协作。两者都可以连接到WebSocket服务器。',
    
    faq8q: '哪个文档更好？',
    faq8a: 'Tiptap有更全面的文档，包括示例和指南。Lexical的文档很好但不够广泛。两者都有活跃的社区和Discord服务器提供支持。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function LexicalVsTiptap({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsLexicalTitle}</h3>
      <p style={pStyle}>{ct.whatIsLexicalContent}</p>

      <h3 style={h3Style}>{ct.whatIsTiptapTitle}</h3>
      <p style={pStyle}>{ct.whatIsTiptapContent}</p>

      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Lexical</th>
              <th style={thStyle}>Tiptap</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '开发者' : 'Developer', 'Meta', 'Tiptap GmbH'],
              [isZh ? '基础技术' : 'Based On', isZh ? '自定义引擎' : 'Custom engine', 'ProseMirror'],
              [isZh ? '首次发布' : 'First Release', '2022', '2017'],
              [isZh ? '框架支持' : 'Framework Support', 'React优先', isZh ? '框架无关' : 'Framework-agnostic'],
              [isZh ? 'TypeScript' : 'TypeScript', isZh ? '原生支持' : 'Native', isZh ? '原生支持' : 'Native'],
              [isZh ? '包大小' : 'Bundle Size', '~100KB', '~150KB'],
              [isZh ? '状态管理' : 'State Management', isZh ? '双缓冲' : 'Double-buffered', isZh ? '不可变' : 'Immutable'],
            ].map(([feature, lexical, tiptap], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{lexical}</td>
                <td style={{ ...tdStyle, color: '#8b5cf6' }}>{tiptap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '操作' : 'Operation'}</th>
              <th style={thStyle}>Lexical</th>
              <th style={thStyle}>Tiptap</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '初始化时间' : 'Initialization', '~15ms', '~25ms'],
              [isZh ? '输入延迟' : 'Typing Latency', '<1ms', '<2ms'],
              [isZh ? '大文档渲染（10000段）' : 'Large Doc (10k paragraphs)', '~150ms', '~280ms'],
              [isZh ? '内存占用' : 'Memory Usage', '~15MB', '~25MB'],
              [isZh ? '撤销/重做' : 'Undo/Redo', '<5ms', '<10ms'],
              [isZh ? '复杂格式变更' : 'Complex Formatting', '~3ms', '~8ms'],
            ].map(([op, lexical, tiptap], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{op}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{lexical}</td>
                <td style={tdStyle}>{tiptap}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Lexical</th>
              <th style={thStyle}>Tiptap</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '基本格式' : 'Basic Formatting', isZh ? '内置' : 'Built-in', isZh ? '扩展' : 'Extension'],
              [isZh ? '表格' : 'Tables', '@lexical/table', '@tiptap/extension-table'],
              [isZh ? '代码块' : 'Code Blocks', '@lexical/code', '@tiptap/extension-code-block'],
              [isZh ? '图片' : 'Images', '@lexical/rich-text', '@tiptap/extension-image'],
              [isZh ? '链接' : 'Links', '@lexical/link', '@tiptap/extension-link'],
              [isZh ? 'Markdown' : 'Markdown', '@lexical/markdown', '@tiptap/extension-markdown'],
              [isZh ? '协作' : 'Collaboration', '@lexical/collaboration', '@tiptap/extension-collaboration'],
              [isZh ? '历史记录' : 'History', isZh ? '内置' : 'Built-in', '@tiptap/extension-history'],
              [isZh ? '拖放' : 'Drag & Drop', isZh ? '支持' : 'Yes', '@tiptap-pro/extension-drag-handle'],
              [isZh ? '提及' : 'Mentions', '@lexical/mention', '@tiptap/extension-mention'],
            ].map(([feature, lexical, tiptap], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{lexical}</td>
                <td style={{ ...tdStyle, color: '#8b5cf6' }}>{tiptap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.lexicalExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Lexical Editor Setup
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { LinkNode, AutoLinkNode } from '@lexical/link';

// Editor configuration
const editorConfig = {
  namespace: 'MyEditor',
  theme: {
    paragraph: 'editor-paragraph',
    quote: 'editor-quote',
    heading: {
      h1: 'editor-heading-h1',
      h2: 'editor-heading-h2',
    },
  },
  onError: (error) => console.error(error),
  nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, AutoLinkNode],
};

function Editor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<div className="editor-placeholder">Start writing...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </div>
    </LexicalComposer>
  );
}

// Custom plugin example
function MyCustomPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        // Handle custom Enter behavior
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  return null;
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.tiptapExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Tiptap Editor Setup
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Collaboration from '@tiptap/extension-collaboration';
import * as Y from 'yjs';

function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
    ],
    content: '<p>Initial content</p>',
    editorProps: {
      attributes: {
        class: 'editor-input',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log('Content updated:', html);
    },
  });

  return (
    <div className="editor-container">
      <EditorContent editor={editor} />
    </div>
  );
}

// Custom extension example
import { Extension } from '@tiptap/core';

const CustomExtension = Extension.create({
  name: 'customExtension',

  addCommands() {
    return {
      toggleCustom:
        () =>
        ({ commands }) => {
          return commands.toggleMark('customMark');
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Enter': () => this.editor.commands.toggleCustom(),
    };
  },
});

// Toolbar component
function Toolbar({ editor }) {
  if (!editor) return null;

  return (
    <div className="toolbar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'active' : ''}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'active' : ''}
      >
        Italic
      </button>
    </div>
  );
}`}</code></pre>

      <h2 style={h2Style}>{ct.extensionsTitle}</h2>
      <p style={pStyle}>{ct.extensionsIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Lexical Extensions</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '官方包覆盖常见需求：表格、列表、代码、链接、Markdown。社区扩展正在增长。需要自己构建更多自定义功能。' : 'Official packages cover common needs: tables, lists, code, links, markdown. Community extensions growing. More custom functionality needs to be built yourself.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8b5cf6' }}>
          <strong style={{ color: '#8b5cf6' }}>Tiptap Extensions</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '50+官方扩展，包括表格、拖放、表情符号、字符统计、占位符等。还有Pro版本的AI写作、拼写检查等高级功能。' : '50+ official extensions including tables, drag-handle, emoji, character count, placeholder, and more. Pro version adds AI writing, spell checking, and advanced features.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.collaborationTitle}</h2>
      <p style={pStyle}>{ct.collaborationIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Lexical</th>
              <th style={thStyle}>Tiptap</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Y.js支持', isZh ? '支持' : 'Yes', isZh ? '官方扩展' : 'Official extension'],
              [isZh ? 'WebSocket' : 'WebSocket', isZh ? '需配置' : 'Setup required', isZh ? '官方指南' : 'Official guide'],
              [isZh ? '离线支持' : 'Offline Support', isZh ? '通过Y.js' : 'Via Y.js', isZh ? '通过Y.js' : 'Via Y.js'],
              [isZh ? '光标感知' : 'Cursor Awareness', isZh ? '内置' : 'Built-in', isZh ? '扩展支持' : 'Extension'],
              [isZh ? '版本历史' : 'Version History', isZh ? '需实现' : 'Implement needed', isZh ? 'Pro功能' : 'Pro feature'],
            ].map(([feature, lexical, tiptap], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{lexical}</td>
                <td style={tdStyle}>{tiptap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.lexicalBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '大规模应用' : 'Large-scale applications'}</li>
            <li>{isZh ? '需要高性能' : 'Need high performance'}</li>
            <li>{isZh ? '自定义编辑器行为' : 'Custom editor behavior'}</li>
            <li>{isZh ? '优先考虑可访问性' : 'Accessibility priority'}</li>
            <li>{isZh ? 'React技术栈' : 'React stack'}</li>
            <li>{isZh ? '复杂状态管理' : 'Complex state management'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8b5cf6' }}>{ct.tiptapBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '快速开发' : 'Rapid development'}</li>
            <li>{isZh ? '需要丰富功能' : 'Need rich features'}</li>
            <li>{isZh ? '多框架支持' : 'Multi-framework support'}</li>
            <li>{isZh ? '模块化需求' : 'Modular needs'}</li>
            <li>{isZh ? '扩展生态系统' : 'Extension ecosystem'}</li>
            <li>{isZh ? 'Vue/Svelte项目' : 'Vue/Svelte projects'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/markdown-editor'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Markdown Editor</a>
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
