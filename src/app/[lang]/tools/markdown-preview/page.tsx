'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Markdown Preview',
    description: 'Write Markdown and see rendered preview side by side. Real-time rendering with support for headings, bold, italic, links, images, code blocks, tables, and more.',
    markdown: 'MARKDOWN',
    preview: 'PREVIEW',
    copyHtml: 'Copy HTML',
    loadSample: 'Load Sample',
    clear: 'Clear',
    placeholder: 'Type your Markdown here...',
    templateLabel: 'Templates',
    templateReadme: 'README',
    templateBlog: 'Blog Post',
    templateApi: 'API Docs',
    introTitle: 'Free Online Markdown Preview Editor',
    introText: 'This Markdown preview tool renders your Markdown in real-time as you type, with a side-by-side editor and preview layout. It supports standard Markdown syntax including headings, bold, italic, links, images, code blocks, tables, blockquotes, lists, and horizontal rules. Start with a template or write your own Markdown from scratch.',
    howTitle: 'How to Use Markdown Preview',
    step1: 'Type or paste Markdown in the left editor panel',
    step2: 'See the rendered HTML preview instantly on the right',
    step3: 'Use templates to start with a pre-built Markdown structure',
    step4: 'Click Copy HTML to use the rendered output in your project',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is Markdown?',
    faq1a: 'Markdown is a lightweight markup language created by John Gruber in 2004. It uses simple text formatting syntax (like # for headings, ** for bold, * for italic) to create formatted documents. It is widely used for README files, documentation, blogs, forums, and note-taking applications.',
    faq2q: 'What Markdown syntax is supported?',
    faq2a: 'This tool supports standard Markdown: headings (# to ######), bold (**text**), italic (*text*), links ([text](url)), images (![alt](url)), code blocks (```code```), inline code (`code`), unordered lists (- item), ordered lists (1. item), blockquotes (> text), tables, and horizontal rules (---).',
    faq3q: 'Can I export the rendered HTML?',
    faq3a: 'Yes. Click the Copy HTML button to copy the rendered HTML output to your clipboard. You can then paste it directly into any HTML file, web page, or content management system.',
    faq4q: 'Does it support tables?',
    faq4a: 'Yes. Use the standard Markdown table syntax with pipes (|) and dashes (-) to create tables. The header row is separated from data rows by a line of dashes. Tables are rendered with proper formatting and borders.',
    faq5q: 'Is my content saved anywhere?',
    faq5a: 'No. All Markdown processing happens entirely in your browser. No data is sent to any server or stored anywhere. Your content is completely private and disappears when you close the page.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Markdown 预览',
    description: '编写 Markdown 并排查看渲染预览。实时渲染支持标题、粗体、斜体、链接、图片、代码块、表格等。',
    markdown: 'MARKDOWN', preview: '预览', copyHtml: '复制 HTML',
    loadSample: '加载示例', clear: '清除', placeholder: '在此输入 Markdown...',
    templateLabel: '模板', templateReadme: 'README', templateBlog: '博客文章', templateApi: 'API 文档',
    introTitle: '免费在线 Markdown 预览编辑器',
    introText: '此 Markdown 预览工具在您输入时实时渲染，支持标准 Markdown 语法。可从模板开始或从头编写。',
    howTitle: '如何使用 Markdown 预览',
    step1: '在左侧面板输入 Markdown', step2: '右侧即时查看渲染预览', step3: '使用模板快速开始', step4: '点击复制 HTML 使用渲染输出',
    faqTitle: '常见问题',
    faq1q: '什么是 Markdown？', faq1a: 'Markdown 是一种轻量级标记语言，使用简单的文本格式语法创建格式化文档，广泛用于 README 文件、文档和博客。',
    faq2q: '支持哪些 Markdown 语法？', faq2a: '支持标题、粗体、斜体、链接、图片、代码块、行内代码、列表、引用、表格和水平线。',
    faq3q: '可以导出 HTML 吗？', faq3a: '可以。点击复制 HTML 按钮将渲染的 HTML 复制到剪贴板。',
    faq4q: '支持表格吗？', faq4a: '支持。使用标准 Markdown 表格语法（管道符和短横线）创建表格。',
    faq5q: '内容会被保存吗？', faq5a: '不会。所有处理在浏览器中完成，不会向服务器发送或存储任何数据。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Apercu Markdown',
    description: 'Ecrivez du Markdown et voyez l\'apercu rendu cote a cote. Rendu en temps reel.',
    markdown: 'MARKDOWN', preview: 'APERCU', copyHtml: 'Copier HTML',
    loadSample: 'Charger exemple', clear: 'Effacer', placeholder: 'Tapez votre Markdown ici...',
    templateLabel: 'Modeles', templateReadme: 'README', templateBlog: 'Article de blog', templateApi: 'Docs API',
    introTitle: 'Editeur Markdown gratuit avec apercu',
    introText: 'Cet outil rend votre Markdown en temps reel. Commencez avec un modele ou ecrivez le votre.',
    howTitle: 'Comment utiliser l\'apercu Markdown',
    step1: 'Tapez du Markdown dans l\'editeur gauche', step2: 'Voyez l\'apercu a droite', step3: 'Utilisez les modeles', step4: 'Copiez le HTML',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que Markdown ?', faq1a: 'Markdown est un langage de balisage leger pour creer des documents formates.',
    faq2q: 'Quelle syntaxe est supportee ?', faq2a: 'Titres, gras, italique, liens, images, blocs de code, listes, citations, tableaux.',
    faq3q: 'Puis-je exporter le HTML ?', faq3a: 'Oui, cliquez sur Copier HTML.',
    faq4q: 'Les tableaux sont-ils supportes ?', faq4a: 'Oui, avec la syntaxe standard Markdown.',
    faq5q: 'Mon contenu est-il sauvegarde ?', faq5a: 'Non. Tout le traitement se fait dans votre navigateur.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Markdown Vorschau',
    description: 'Schreiben Sie Markdown und sehen Sie die gerenderte Vorschau nebeneinander.',
    markdown: 'MARKDOWN', preview: 'VORSCHAU', copyHtml: 'HTML kopieren',
    loadSample: 'Beispiel laden', clear: 'Loeschen', placeholder: 'Markdown hier eingeben...',
    templateLabel: 'Vorlagen', templateReadme: 'README', templateBlog: 'Blogbeitrag', templateApi: 'API Doku',
    introTitle: 'Kostenloser Online Markdown-Editor mit Vorschau',
    introText: 'Dieses Tool rendert Ihr Markdown in Echtzeit. Starten Sie mit einer Vorlage oder schreiben Sie eigenes.',
    howTitle: 'Wie man die Markdown-Vorschau verwendet',
    step1: 'Markdown im linken Editor eingeben', step2: 'Vorschau rechts ansehen', step3: 'Vorlagen verwenden', step4: 'HTML kopieren',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist Markdown?', faq1a: 'Markdown ist eine leichtgewichtige Auszeichnungssprache zum Erstellen formatierter Dokumente.',
    faq2q: 'Welche Syntax wird unterstuetzt?', faq2a: 'Ueberschriften, fett, kursiv, Links, Bilder, Codebloecke, Listen, Zitate, Tabellen.',
    faq3q: 'Kann ich HTML exportieren?', faq3a: 'Ja, klicken Sie auf HTML kopieren.',
    faq4q: 'Werden Tabellen unterstuetzt?', faq4a: 'Ja, mit Standard-Markdown-Syntax.',
    faq5q: 'Wird mein Inhalt gespeichert?', faq5a: 'Nein. Alle Verarbeitung erfolgt in Ihrem Browser.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Vista Previa de Markdown',
    description: 'Escribe Markdown y ve la vista previa renderizada lado a lado. Renderizado en tiempo real.',
    markdown: 'MARKDOWN', preview: 'VISTA PREVIA', copyHtml: 'Copiar HTML',
    loadSample: 'Cargar ejemplo', clear: 'Limpiar', placeholder: 'Escribe tu Markdown aqui...',
    templateLabel: 'Plantillas', templateReadme: 'README', templateBlog: 'Publicacion de blog', templateApi: 'Docs API',
    introTitle: 'Editor Markdown gratuito con vista previa',
    introText: 'Esta herramienta renderiza tu Markdown en tiempo real. Comienza con una plantilla o escribe el tuyo.',
    howTitle: 'Como usar la vista previa de Markdown',
    step1: 'Escribe Markdown en el editor izquierdo', step2: 'Ve la vista previa a la derecha', step3: 'Usa las plantillas', step4: 'Copia el HTML',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es Markdown?', faq1a: 'Markdown es un lenguaje de marcado ligero para crear documentos con formato.',
    faq2q: 'Que sintaxis se soporta?', faq2a: 'Encabezados, negrita, cursiva, enlaces, imagenes, bloques de codigo, listas, citas, tablas.',
    faq3q: 'Puedo exportar el HTML?', faq3a: 'Si, haz clic en Copiar HTML.',
    faq4q: 'Se soportan tablas?', faq4a: 'Si, con la sintaxis Markdown estandar.',
    faq5q: 'Mi contenido se guarda?', faq5a: 'No. Todo el procesamiento ocurre en tu navegador.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'Markdown プレビュー',
    description: 'Markdownを書いて並べてレンダリングプレビューを確認。リアルタイムレンダリング対応。',
    markdown: 'MARKDOWN', preview: 'プレビュー', copyHtml: 'HTML をコピー',
    loadSample: 'サンプル読込', clear: 'クリア', placeholder: 'Markdownをここに入力...',
    templateLabel: 'テンプレート', templateReadme: 'README', templateBlog: 'ブログ記事', templateApi: 'APIドキュメント',
    introTitle: '無料オンライン Markdown プレビューエディタ',
    introText: 'このツールはMarkdownをリアルタイムでレンダリングします。テンプレートから始めるか、自分で書いてください。',
    howTitle: 'Markdownプレビューの使い方',
    step1: '左のエディタにMarkdownを入力', step2: '右でプレビューを確認', step3: 'テンプレートを使用', step4: 'HTMLをコピー',
    faqTitle: 'よくある質問',
    faq1q: 'Markdownとは？', faq1a: 'Markdownはフォーマットされたドキュメントを作成するための軽量マークアップ言語です。',
    faq2q: '対応する構文は？', faq2a: '見出し、太字、斜体、リンク、画像、コードブロック、リスト、引用、テーブル。',
    faq3q: 'HTMLをエクスポートできる？', faq3a: 'はい。HTMLコピーボタンをクリックしてください。',
    faq4q: 'テーブルに対応？', faq4a: 'はい。標準Markdownテーブル構文で対応しています。',
    faq5q: 'コンテンツは保存される？', faq5a: 'いいえ。すべての処理はブラウザ内で行われます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Markdown 미리보기',
    description: 'Markdown을 작성하고 렌더링된 미리보기를 나란히 확인. 실시간 렌더링 지원.',
    markdown: 'MARKDOWN', preview: '미리보기', copyHtml: 'HTML 복사',
    loadSample: '샘플 로드', clear: '지우기', placeholder: '여기에 Markdown을 입력하세요...',
    templateLabel: '템플릿', templateReadme: 'README', templateBlog: '블로그 글', templateApi: 'API 문서',
    introTitle: '무료 온라인 Markdown 미리보기 에디터',
    introText: '이 도구는 Markdown을 실시간으로 렌더링합니다. 템플릿으로 시작하거나 직접 작성하세요.',
    howTitle: 'Markdown 미리보기 사용법',
    step1: '왼쪽 에디터에 Markdown 입력', step2: '오른쪽에서 미리보기 확인', step3: '템플릿 사용', step4: 'HTML 복사',
    faqTitle: '자주 묻는 질문',
    faq1q: 'Markdown이란?', faq1a: 'Markdown은 서식 있는 문서를 만들기 위한 경량 마크업 언어입니다.',
    faq2q: '지원되는 구문은?', faq2a: '제목, 볼드, 이탤릭, 링크, 이미지, 코드 블록, 목록, 인용, 테이블.',
    faq3q: 'HTML을 내보낼 수 있나요?', faq3a: '네. HTML 복사 버튼을 클릭하세요.',
    faq4q: '테이블을 지원하나요?', faq4a: '네. 표준 Markdown 테이블 구문을 지원합니다.',
    faq5q: '콘텐츠가 저장되나요?', faq5a: '아니요. 모든 처리는 브라우저에서 이루어집니다.',
    relatedTitle: '관련 도구',
  },
};

function parseMarkdown(md: string): string {
  let html = md;

  // Code blocks (fenced)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre style="background:#1e1e2e;border-radius:8px;padding:12px;overflow-x:auto;font-size:13px;border:1px solid #2a2a4a"><code>$2</code></pre>');

  // Tables
  html = html.replace(/^(\|.+\|)\n(\|[-:| ]+\|)\n((?:\|.+\|\n?)+)/gm, (_match, header, _sep, body) => {
    const hCells = header.split('|').filter((c: string) => c.trim());
    const headerRow = '<tr>' + hCells.map((c: string) => `<th style="padding:8px 12px;border:1px solid #2a2a4a;font-weight:600">${c.trim()}</th>`).join('') + '</tr>';
    const bodyRows = body.trim().split('\n').map((row: string) => {
      const cells = row.split('|').filter((c: string) => c.trim());
      return '<tr>' + cells.map((c: string) => `<td style="padding:8px 12px;border:1px solid #2a2a4a">${c.trim()}</td>`).join('') + '</tr>';
    }).join('');
    return `<table style="border-collapse:collapse;width:100%;margin:12px 0">${headerRow}${bodyRows}</table>`;
  });

  // Headings
  html = html.replace(/^###### (.+)$/gm, '<h6 style="font-size:14px;font-weight:700;margin:12px 0 6px">$1</h6>');
  html = html.replace(/^##### (.+)$/gm, '<h5 style="font-size:15px;font-weight:700;margin:14px 0 7px">$1</h5>');
  html = html.replace(/^#### (.+)$/gm, '<h4 style="font-size:16px;font-weight:700;margin:16px 0 8px">$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3 style="font-size:18px;font-weight:700;margin:16px 0 8px">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 style="font-size:22px;font-weight:700;margin:20px 0 10px">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 style="font-size:28px;font-weight:800;margin:24px 0 12px">$1</h1>');

  // Bold & Italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code style="background:#1e1e2e;padding:2px 6px;border-radius:4px;font-size:13px">$1</code>');

  // Images (before links)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px" />');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#3b82f6" target="_blank">$1</a>');

  // Unordered lists
  html = html.replace(/^[*-] (.+)$/gm, '<li style="margin:4px 0;margin-left:20px">$1</li>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li style="margin:4px 0;margin-left:20px">$1</li>');

  // Blockquote
  html = html.replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid #3b82f6;padding-left:16px;margin:12px 0;color:#94a3b8;font-style:italic">$1</blockquote>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #2a2a4a;margin:20px 0" />');

  // Checkbox
  html = html.replace(/\[x\]/g, '<input type="checkbox" checked disabled style="margin-right:6px" />');
  html = html.replace(/\[ \]/g, '<input type="checkbox" disabled style="margin-right:6px" />');

  // Line breaks (double newline = paragraph)
  html = html.replace(/\n\n/g, '</p><p style="margin:8px 0;line-height:1.7">');
  html = '<p style="margin:8px 0;line-height:1.7">' + html + '</p>';

  return html;
}

const templates: Record<string, string> = {
  readme: `# Project Name

A brief description of your project.

## Installation

\`\`\`bash
npm install my-project
\`\`\`

## Usage

\`\`\`javascript
import { myFunction } from 'my-project';

const result = myFunction('hello');
console.log(result);
\`\`\`

## Features

- Feature one with **bold** description
- Feature two with *italic* emphasis
- Feature three with \`inline code\`

## API Reference

| Method | Parameters | Returns |
| --- | --- | --- |
| getData() | id: string | Promise<Data> |
| setData() | data: object | void |
| deleteData() | id: string | boolean |

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.
`,
  blog: `# How to Build a REST API with Node.js

*Published on February 22, 2026 by DevToolBox Team*

---

## Introduction

Building a REST API is one of the most fundamental skills for backend developers. In this guide, we will walk through creating a **complete REST API** using Node.js and Express.

## Prerequisites

- [x] Node.js 18+ installed
- [x] Basic JavaScript knowledge
- [ ] MongoDB (optional)

## Getting Started

First, initialize your project:

\`\`\`bash
mkdir my-api && cd my-api
npm init -y
npm install express
\`\`\`

## Creating the Server

\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
\`\`\`

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/items | List all items |
| POST | /api/items | Create new item |
| PUT | /api/items/:id | Update item |
| DELETE | /api/items/:id | Delete item |

> **Tip:** Always validate request bodies before processing them.

## Conclusion

You now have a working REST API! For the full source code, visit our [GitHub repository](https://github.com).

---

*Enjoyed this article? Share it with your developer friends!*
`,
  api: `# API Documentation

## Base URL

\`\`\`
https://api.example.com/v1
\`\`\`

## Authentication

All API requests require a Bearer token:

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### GET /users

Returns a list of users.

**Parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Items per page (default: 20) |
| search | string | No | Search by name or email |

**Response:**

\`\`\`json
{
  "data": [
    {
      "id": "usr_123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 20
  }
}
\`\`\`

### POST /users

Create a new user.

**Request Body:**

\`\`\`json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "admin"
}
\`\`\`

### Error Codes

| Code | Description |
| --- | --- |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid API key |
| 404 | Not Found - Resource doesn't exist |
| 429 | Rate Limited - Too many requests |
| 500 | Server Error - Internal error |

> **Rate Limiting:** API is limited to 100 requests per minute per API key.
`,
};

const defaultMd = `# Hello World

This is a **Markdown Preview** tool by *DevToolBox*.

## Features

- Real-time preview
- **Bold**, *italic*, and ***bold italic*** text
- Code blocks with syntax highlighting
- Links, images, tables, and more

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Table Example

| Feature | Supported |
| --- | --- |
| Headings | Yes |
| Bold/Italic | Yes |
| Tables | Yes |
| Code blocks | Yes |

> Markdown is a lightweight markup language for creating formatted text.

Visit [DevToolBox](https://viadreams.cc) for more tools!

---

**Enjoy writing Markdown!**
`;

export default function MarkdownPreview() {
  const { lang, dict } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState(defaultMd);
  const html = useMemo(() => parseMarkdown(input), [input]);

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

  return (
    <ToolLayout title={t.title} description={t.description} toolId="markdown-preview">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{t.templateLabel}:</span>
        <button onClick={() => setInput(templates.readme)} className="btn btn-secondary" style={{ fontSize: 12 }}>{t.templateReadme}</button>
        <button onClick={() => setInput(templates.blog)} className="btn btn-secondary" style={{ fontSize: 12 }}>{t.templateBlog}</button>
        <button onClick={() => setInput(templates.api)} className="btn btn-secondary" style={{ fontSize: 12 }}>{t.templateApi}</button>
        <div style={{ flex: 1 }} />
        <button onClick={() => setInput(defaultMd)} className="btn btn-secondary" style={{ fontSize: 12 }}>{t.loadSample}</button>
        <button onClick={() => setInput('')} className="btn btn-secondary" style={{ fontSize: 12 }}>{t.clear}</button>
        <CopyButton text={html} label={t.copyHtml} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, minHeight: 500 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--text-secondary)' }}>{t.markdown}</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.placeholder}
            style={{ minHeight: 500, height: '100%', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--text-secondary)' }}>{t.preview}</label>
          <div
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: '16px 20px',
              minHeight: 500,
              fontSize: 14,
              lineHeight: 1.7,
              overflow: 'auto',
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li><li>{t.step4}</li>
        </ol>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/markdown-to-html`, label: 'Markdown to HTML' },
            { href: `/${lang}/tools/html-to-markdown`, label: 'HTML to Markdown' },
            { href: `/${lang}/tools/word-counter`, label: 'Word Counter' },
            { href: `/${lang}/tools/text-diff`, label: 'Text Diff Checker' },
          ].map((link) => (
            <Link key={link.href} href={link.href}
              style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>Additional FAQ</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <div style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>What is GitHub Flavored Markdown?</div>
            <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>GitHub Flavored Markdown (GFM) extends standard Markdown with additional features like strikethrough (~~text~~), task lists (- [ ] task), and mentions (@username). This tool supports standard Markdown syntax, so most GFM will render correctly.</div>
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <div style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Can I use HTML inside Markdown?</div>
            <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>Standard Markdown is just text formatting, not HTML rendering. This tool converts Markdown to HTML for display. For advanced HTML styling, use a <a href={`/${lang}/tools/html-to-markdown`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>full HTML editor</a>.</div>
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <div style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Is Markdown better than rich text editors?</div>
            <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>Markdown is lightweight, version-control friendly, and works anywhere plain text is supported. Rich text editors are easier for beginners but produce bloated HTML. Use Markdown for content, code documentation, and APIs. Use rich text for printed documents or complex layouts.</div>
          </div>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is GitHub Flavored Markdown?", "acceptedAnswer": { "@type": "Answer", "text": "GitHub Flavored Markdown (GFM) extends standard Markdown with features like strikethrough, task lists, and mentions. Most GFM renders correctly in this tool." } },
            { "@type": "Question", "name": "Can I use HTML inside Markdown?", "acceptedAnswer": { "@type": "Answer", "text": "Standard Markdown is text formatting, not HTML rendering. This tool converts Markdown to HTML for display. For advanced HTML styling, use a full HTML editor." } },
            { "@type": "Question", "name": "Is Markdown better than rich text editors?", "acceptedAnswer": { "@type": "Answer", "text": "Markdown is lightweight and version-control friendly. Rich text editors are easier for beginners but produce bloated HTML. Use Markdown for content and APIs." } }
          ]
        }) }} />
      </div>
    </ToolLayout>
  );
}
