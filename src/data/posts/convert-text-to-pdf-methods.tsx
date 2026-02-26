import Link from 'next/link';

const translations: Record<string, Record<string, string | string[]>> = {
  en: {
    title: 'Convert Text to PDF: 3 Simple Methods Explained',
    intro: 'Converting text to PDF is a common task for students, professionals, and developers. Whether you need to create a formatted document from plain text, convert code to a shareable format, or generate reports, there are multiple ways to convert text to PDF online and offline. This guide covers three effective methods to transform your text into professional PDF documents.',
    h2_method1: 'Method 1: Using an Online Text to PDF Converter',
    method1Intro: 'The easiest way to convert text to PDF is using an online tool. No installation required, works on any device, and produces instant results.',
    method1StepsTitle: 'Steps to convert text to PDF online:',
    m1step1: 'Copy your text content into the input field',
    m1step2: 'Adjust formatting options (font, size, margins)',
    m1step3: 'Preview the output if available',
    m1step4: 'Click "Convert" and download your PDF',
    method1Pros: 'Advantages:',
    m1pro1: 'No software installation needed',
    m1pro2: 'Works on all devices (Windows, Mac, Linux, mobile)',
    m1pro3: 'Fast and convenient',
    m1pro4: 'Usually free for basic use',
    method1Cons: 'Limitations:',
    m1con1: 'Requires internet connection',
    m1con2: 'Privacy concerns with sensitive documents',
    m1con3: 'Limited customization options',
    method1BestFor: 'Best for: Quick conversions, one-time use, users without PDF software installed.',
    h2_method2: 'Method 2: Using Microsoft Word or Google Docs',
    method2Intro: 'Word processors like Microsoft Word and Google Docs offer built-in PDF export functionality with more formatting control than online converters.',
    method2WordTitle: 'Microsoft Word:',
    m2wordStep1: 'Open Word and paste/type your text',
    m2wordStep2: 'Format as needed (fonts, spacing, headers)',
    m2wordStep3: 'Go to File → Save As → PDF',
    m2wordStep4: 'Choose location and save',
    method2DocsTitle: 'Google Docs:',
    m2docsStep1: 'Open Google Docs (docs.google.com)',
    m2docsStep2: 'Create new document and add your text',
    m2docsStep3: 'Go to File → Download → PDF Document',
    method2Pros: 'Advantages:',
    m2pro1: 'Full formatting control',
    m2pro2: 'Add images, tables, and styling',
    m2pro3: 'Professional output quality',
    m2pro4: 'Works offline (Word)',
    method2Cons: 'Limitations:',
    m2con1: 'Requires software installation or Google account',
    m2con2: 'More steps than online converters',
    m2con3: 'Word is not free',
    method2BestFor: 'Best for: Documents requiring formatting, professional reports, resumes.',
    h2_method3: 'Method 3: Using Command Line Tools',
    method3Intro: 'For developers and power users, command line tools offer automated, scriptable text to PDF conversion.',
    method3ToolsTitle: 'Popular command line tools:',
    m3pandocTitle: 'Pandoc (Universal document converter):',
    m3pandocDesc: 'Pandoc can convert between numerous formats including text to PDF.',
    m3pandocInstall: 'Installation: brew install pandoc (macOS) or apt-get install pandoc (Linux)',
    m3pandocUsage: 'Usage: pandoc input.txt -o output.pdf',
    m3wkhtmltopdfTitle: 'wkhtmltopdf (HTML to PDF):',
    m3wkhtmltopdfDesc: 'First convert text to HTML, then to PDF.',
    m3wkhtmltopdfUsage: 'Usage: wkhtmltopdf input.html output.pdf',
    m3libreTitle: 'LibreOffice (Command line):',
    m3libreUsage: 'Usage: libreoffice --headless --convert-to pdf input.txt',
    method3Pros: 'Advantages:',
    m3pro1: 'Automatable and scriptable',
    m3pro2: 'Batch conversion support',
    m3pro3: 'Free and open source',
    m3pro4: 'Integrates with CI/CD pipelines',
    method3Cons: 'Limitations:',
    m3con1: 'Requires technical knowledge',
    m3con2: 'Installation required',
    m3con3: 'Limited formatting options for plain text',
    method3BestFor: 'Best for: Developers, automated workflows, batch processing, server environments.',
    h2_comparison: 'Method Comparison',
    comparisonIntro: 'Choose the method that best fits your needs:',
    colMethod: 'Method',
    colEase: 'Ease of Use',
    colFormat: 'Formatting',
    colPrivacy: 'Privacy',
    colBest: 'Best For',
    row1Method: 'Online Converter',
    row1Ease: '★★★★★',
    row1Format: 'Basic',
    row1Privacy: 'Medium',
    row1Best: 'Quick conversions',
    row2Method: 'Word/Google Docs',
    row2Ease: '★★★★☆',
    row2Format: 'Advanced',
    row2Privacy: 'High (local)',
    row2Best: 'Formatted documents',
    row3Method: 'Command Line',
    row3Ease: '★★☆☆☆',
    row3Format: 'Basic',
    row3Privacy: 'High (local)',
    row3Best: 'Automation/Batch',
    h2_tips: 'Tips for Better Text to PDF Conversion',
    tip1Title: 'Prepare Your Text',
    tip1Desc: 'Clean up your text before conversion. Remove unnecessary line breaks, fix encoding issues, and ensure consistent formatting.',
    tip2Title: 'Check Page Layout',
    tip2Desc: 'Set appropriate page size (A4, Letter), margins, and orientation before converting.',
    tip3Title: 'Font Selection',
    tip3Desc: 'Use standard fonts (Arial, Times New Roman) for maximum compatibility.',
    tip4Title: 'Preview Before Finalizing',
    tip4Desc: 'Always preview the PDF output to catch formatting issues before sharing.',
    h2_faq: 'Frequently Asked Questions',
    faq1q: 'Is it safe to use online text to PDF converters?',
    faq1a: 'Reputable online converters are generally safe for non-sensitive documents. However, avoid uploading confidential information. Look for converters that process files locally in your browser rather than uploading to servers.',
    faq2q: 'Can I convert text to PDF on my phone?',
    faq2a: 'Yes, all three methods work on mobile. Online converters are easiest on phones. Google Docs has excellent mobile apps. For command line, use Termux (Android) or terminal apps.',
    faq3q: 'How do I preserve formatting when converting text to PDF?',
    faq3a: 'Use Markdown syntax or HTML formatting in your text before conversion. Tools like Pandoc support Markdown and will preserve headings, lists, and basic formatting.',
    faq4q: 'Why does my text look different in the PDF?',
    faq4a: 'Font differences, line wrapping, and page breaks can affect appearance. Use a fixed-width font for code, set appropriate margins, and preview before finalizing.',
    faq5q: 'Can I convert multiple text files to PDF at once?',
    faq5a: 'Yes, command line tools like Pandoc support batch conversion. Some online tools also support multiple files. Alternatively, concatenate text files first, then convert.',
    conclusion: 'Converting text to PDF is straightforward with the right tool. Online converters offer convenience, word processors provide formatting control, and command line tools enable automation. Choose the method that best fits your technical skills and requirements.',
    ctaText: 'Convert your text to PDF instantly',
    ctaButton: 'Try Our Free Text to PDF Tool →',
  },
  zh: {
    title: '文本转 PDF：3种简单方法详解',
    intro: '将文本转换为 PDF 是学生、专业人员和开发者的常见任务。无论您需要从纯文本创建格式化的文档、将代码转换为可分享的格式，还是生成报告，都有多种方法可以在线和离线将文本转换为 PDF。本指南介绍三种有效的方法，将您的文本转换为专业的 PDF 文档。',
    h2_method1: '方法1：使用在线文本转 PDF 转换器',
    method1Intro: '将文本转换为 PDF 最简单的方法是使用在线工具。无需安装，适用于任何设备，并能即时生成结果。',
    method1StepsTitle: '在线将文本转换为 PDF 的步骤：',
    m1step1: '将文本内容复制到输入框',
    m1step2: '调整格式选项（字体、大小、边距）',
    m1step3: '如有预览功能，查看输出效果',
    m1step4: '点击"转换"并下载您的 PDF',
    method1Pros: '优点：',
    m1pro1: '无需安装软件',
    m1pro2: '适用于所有设备（Windows、Mac、Linux、手机）',
    m1pro3: '快速便捷',
    m1pro4: '基本使用通常免费',
    method1Cons: '局限性：',
    m1con1: '需要互联网连接',
    m1con2: '敏感文档存在隐私顾虑',
    m1con3: '自定义选项有限',
    method1BestFor: '最适合：快速转换、一次性使用、未安装 PDF 软件的用户。',
    h2_method2: '方法2：使用 Microsoft Word 或 Google Docs',
    method2Intro: 'Microsoft Word 和 Google Docs 等文字处理软件提供内置的 PDF 导出功能，比在线转换器提供更多的格式控制。',
    method2WordTitle: 'Microsoft Word：',
    m2wordStep1: '打开 Word 并粘贴/输入您的文本',
    m2wordStep2: '根据需要设置格式（字体、间距、页眉）',
    m2wordStep3: '转到文件 → 另存为 → PDF',
    m2wordStep4: '选择位置并保存',
    method2DocsTitle: 'Google Docs：',
    m2docsStep1: '打开 Google Docs（docs.google.com）',
    m2docsStep2: '创建新文档并添加您的文本',
    m2docsStep3: '转到文件 → 下载 → PDF 文档',
    method2Pros: '优点：',
    m2pro1: '完整的格式控制',
    m2pro2: '可添加图片、表格和样式',
    m2pro3: '专业输出质量',
    m2pro4: '离线工作（Word）',
    method2Cons: '局限性：',
    m2con1: '需要安装软件或 Google 账户',
    m2con2: '步骤比在线转换器多',
    m2con3: 'Word 不是免费的',
    method2BestFor: '最适合：需要格式的文档、专业报告、简历。',
    h2_method3: '方法3：使用命令行工具',
    method3Intro: '对于开发者和高级用户，命令行工具提供自动化的、可脚本化的文本到 PDF 转换。',
    method3ToolsTitle: '流行的命令行工具：',
    m3pandocTitle: 'Pandoc（通用文档转换器）：',
    m3pandocDesc: 'Pandoc 可以转换多种格式，包括文本到 PDF。',
    m3pandocInstall: '安装：brew install pandoc（macOS）或 apt-get install pandoc（Linux）',
    m3pandocUsage: '用法：pandoc input.txt -o output.pdf',
    m3wkhtmltopdfTitle: 'wkhtmltopdf（HTML 转 PDF）：',
    m3wkhtmltopdfDesc: '首先将文本转换为 HTML，然后转为 PDF。',
    m3wkhtmltopdfUsage: '用法：wkhtmltopdf input.html output.pdf',
    m3libreTitle: 'LibreOffice（命令行）：',
    m3libreUsage: '用法：libreoffice --headless --convert-to pdf input.txt',
    method3Pros: '优点：',
    m3pro1: '可自动化和脚本化',
    m3pro2: '支持批量转换',
    m3pro3: '免费开源',
    m3pro4: '与 CI/CD 流水线集成',
    method3Cons: '局限性：',
    m3con1: '需要技术知识',
    m3con2: '需要安装',
    m3con3: '纯文本的格式选项有限',
    method3BestFor: '最适合：开发者、自动化工作流、批量处理、服务器环境。',
    h2_comparison: '方法对比',
    comparisonIntro: '选择最适合您需求的方法：',
    colMethod: '方法',
    colEase: '易用性',
    colFormat: '格式控制',
    colPrivacy: '隐私性',
    colBest: '最适合',
    row1Method: '在线转换器',
    row1Ease: '★★★★★',
    row1Format: '基础',
    row1Privacy: '中等',
    row1Best: '快速转换',
    row2Method: 'Word/Google Docs',
    row2Ease: '★★★★☆',
    row2Format: '高级',
    row2Privacy: '高（本地）',
    row2Best: '格式化文档',
    row3Method: '命令行',
    row3Ease: '★★☆☆☆',
    row3Format: '基础',
    row3Privacy: '高（本地）',
    row3Best: '自动化/批量',
    h2_tips: '文本转 PDF 的技巧',
    tip1Title: '准备您的文本',
    tip1Desc: '转换前清理文本。删除不必要的换行、修复编码问题，并确保格式一致。',
    tip2Title: '检查页面布局',
    tip2Desc: '转换前设置适当的页面大小（A4、Letter）、边距和方向。',
    tip3Title: '字体选择',
    tip3Desc: '使用标准字体（Arial、Times New Roman）以获得最大兼容性。',
    tip4Title: '最终确定前预览',
    tip4Desc: '始终预览 PDF 输出，以在分享前发现格式问题。',
    h2_faq: '常见问题',
    faq1q: '使用在线文本转 PDF 转换器安全吗？',
    faq1a: '信誉良好的在线转换器对非敏感文档通常是安全的。但是，避免上传机密信息。寻找在浏览器中本地处理文件而不是上传到服务器的转换器。',
    faq2q: '我可以在手机上将文本转换为 PDF 吗？',
    faq2a: '可以，三种方法都适用于手机。在线转换器在手机上最容易使用。Google Docs 有优秀的移动应用。对于命令行，使用 Termux（Android）或终端应用。',
    faq3q: '转换文本为 PDF 时如何保留格式？',
    faq3a: '转换前在文本中使用 Markdown 语法或 HTML 格式。像 Pandoc 这样的工具支持 Markdown，会保留标题、列表和基本格式。',
    faq4q: '为什么我的文本在 PDF 中看起来不同？',
    faq4a: '字体差异、自动换行和分页会影响外观。对代码使用等宽字体，设置适当的边距，并在最终确定前预览。',
    faq5q: '我可以一次将多个文本文件转换为 PDF 吗？',
    faq5a: '可以，Pandoc 等命令行工具支持批量转换。一些在线工具也支持多个文件。或者，先将文本文件合并，然后转换。',
    conclusion: '使用正确的工具，将文本转换为 PDF 非常简单。在线转换器提供便利，文字处理器提供格式控制，命令行工具实现自动化。选择最适合您的技术技能和要求的方法。',
    ctaText: '立即将您的文本转换为 PDF',
    ctaButton: '立即试用我们的免费文本转 PDF 工具 →',
  },
};

const h2Style: React.CSSProperties = { 
  fontSize: 22, 
  fontWeight: 700, 
  marginTop: 40, 
  marginBottom: 16, 
  color: 'var(--text-primary)' 
};

const thStyle: React.CSSProperties = { 
  background: 'var(--bg-input)', 
  border: '1px solid var(--border-color)', 
  padding: '10px 14px', 
  textAlign: 'left', 
  fontWeight: 700 
};

const tdStyle: React.CSSProperties = { 
  border: '1px solid var(--border-color)', 
  padding: '10px 14px', 
  fontSize: 13 
};

export default function ConvertTextToPdfMethods({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

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
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{t.intro}</p>

      <h2 style={h2Style}>{t.h2_method1}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.method1Intro}</p>
      
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.method1StepsTitle}</h3>
      <ol style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li>{t.m1step1}</li>
        <li>{t.m1step2}</li>
        <li>{t.m1step3}</li>
        <li>{t.m1step4}</li>
      </ol>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ padding: 16, background: 'rgba(34, 197, 94, 0.08)', borderRadius: 8, border: '1px solid rgba(34, 197, 94, 0.2)' }}>
          <p style={{ fontWeight: 600, marginBottom: 8, color: '#22c55e' }}>{t.method1Pros}</p>
          <ul style={{ lineHeight: 1.8, color: 'var(--text-secondary)', paddingLeft: 16, margin: 0, fontSize: 13 }}>
            <li>{t.m1pro1}</li>
            <li>{t.m1pro2}</li>
            <li>{t.m1pro3}</li>
            <li>{t.m1pro4}</li>
          </ul>
        </div>
        <div style={{ padding: 16, background: 'rgba(239, 68, 68, 0.08)', borderRadius: 8, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <p style={{ fontWeight: 600, marginBottom: 8, color: '#ef4444' }}>{t.method1Cons}</p>
          <ul style={{ lineHeight: 1.8, color: 'var(--text-secondary)', paddingLeft: 16, margin: 0, fontSize: 13 }}>
            <li>{t.m1con1}</li>
            <li>{t.m1con2}</li>
            <li>{t.m1con3}</li>
          </ul>
        </div>
      </div>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24, fontStyle: 'italic' }}>{t.method1BestFor}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.ctaText}</p>
        <Link href={`/${lang}/tools/text-to-pdf`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
          {t.ctaButton}
        </Link>
      </div>

      <h2 style={h2Style}>{t.h2_method2}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.method2Intro}</p>
      
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.method2WordTitle}</h3>
      <ol style={{ lineHeight: 1.8, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li>{t.m2wordStep1}</li>
        <li>{t.m2wordStep2}</li>
        <li>{t.m2wordStep3}</li>
        <li>{t.m2wordStep4}</li>
      </ol>

      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.method2DocsTitle}</h3>
      <ol style={{ lineHeight: 1.8, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li>{t.m2docsStep1}</li>
        <li>{t.m2docsStep2}</li>
        <li>{t.m2docsStep3}</li>
      </ol>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ padding: 16, background: 'rgba(34, 197, 94, 0.08)', borderRadius: 8, border: '1px solid rgba(34, 197, 94, 0.2)' }}>
          <p style={{ fontWeight: 600, marginBottom: 8, color: '#22c55e' }}>{t.method2Pros}</p>
          <ul style={{ lineHeight: 1.8, color: 'var(--text-secondary)', paddingLeft: 16, margin: 0, fontSize: 13 }}>
            <li>{t.m2pro1}</li>
            <li>{t.m2pro2}</li>
            <li>{t.m2pro3}</li>
            <li>{t.m2pro4}</li>
          </ul>
        </div>
        <div style={{ padding: 16, background: 'rgba(239, 68, 68, 0.08)', borderRadius: 8, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <p style={{ fontWeight: 600, marginBottom: 8, color: '#ef4444' }}>{t.method2Cons}</p>
          <ul style={{ lineHeight: 1.8, color: 'var(--text-secondary)', paddingLeft: 16, margin: 0, fontSize: 13 }}>
            <li>{t.m2con1}</li>
            <li>{t.m2con2}</li>
            <li>{t.m2con3}</li>
          </ul>
        </div>
      </div>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24, fontStyle: 'italic' }}>{t.method2BestFor}</p>

      <h2 style={h2Style}>{t.h2_method3}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.method3Intro}</p>
      
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.method3ToolsTitle}</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>{t.m3pandocTitle}</h4>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>{t.m3pandocDesc}</p>
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 4 }}>{t.m3pandocInstall}</p>
          <code style={{ fontSize: 12, color: 'var(--accent-blue)', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: 4 }}>{t.m3pandocUsage}</code>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>{t.m3wkhtmltopdfTitle}</h4>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>{t.m3wkhtmltopdfDesc}</p>
          <code style={{ fontSize: 12, color: 'var(--accent-blue)', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: 4 }}>{t.m3wkhtmltopdfUsage}</code>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>{t.m3libreTitle}</h4>
          <code style={{ fontSize: 12, color: 'var(--accent-blue)', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: 4 }}>{t.m3libreUsage}</code>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ padding: 16, background: 'rgba(34, 197, 94, 0.08)', borderRadius: 8, border: '1px solid rgba(34, 197, 94, 0.2)' }}>
          <p style={{ fontWeight: 600, marginBottom: 8, color: '#22c55e' }}>{t.method3Pros}</p>
          <ul style={{ lineHeight: 1.8, color: 'var(--text-secondary)', paddingLeft: 16, margin: 0, fontSize: 13 }}>
            <li>{t.m3pro1}</li>
            <li>{t.m3pro2}</li>
            <li>{t.m3pro3}</li>
            <li>{t.m3pro4}</li>
          </ul>
        </div>
        <div style={{ padding: 16, background: 'rgba(239, 68, 68, 0.08)', borderRadius: 8, border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <p style={{ fontWeight: 600, marginBottom: 8, color: '#ef4444' }}>{t.method3Cons}</p>
          <ul style={{ lineHeight: 1.8, color: 'var(--text-secondary)', paddingLeft: 16, margin: 0, fontSize: 13 }}>
            <li>{t.m3con1}</li>
            <li>{t.m3con2}</li>
            <li>{t.m3con3}</li>
          </ul>
        </div>
      </div>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24, fontStyle: 'italic' }}>{t.method3BestFor}</p>

      <h2 style={h2Style}>{t.h2_comparison}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{t.comparisonIntro}</p>
      
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.colMethod}</th>
              <th style={thStyle}>{t.colEase}</th>
              <th style={thStyle}>{t.colFormat}</th>
              <th style={thStyle}>{t.colPrivacy}</th>
              <th style={thStyle}>{t.colBest}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>{t.row1Method}</td>
              <td style={tdStyle}>{t.row1Ease}</td>
              <td style={tdStyle}>{t.row1Format}</td>
              <td style={tdStyle}>{t.row1Privacy}</td>
              <td style={tdStyle}>{t.row1Best}</td>
            </tr>
            <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
              <td style={tdStyle}>{t.row2Method}</td>
              <td style={tdStyle}>{t.row2Ease}</td>
              <td style={tdStyle}>{t.row2Format}</td>
              <td style={tdStyle}>{t.row2Privacy}</td>
              <td style={tdStyle}>{t.row2Best}</td>
            </tr>
            <tr>
              <td style={tdStyle}>{t.row3Method}</td>
              <td style={tdStyle}>{t.row3Ease}</td>
              <td style={tdStyle}>{t.row3Format}</td>
              <td style={tdStyle}>{t.row3Privacy}</td>
              <td style={tdStyle}>{t.row3Best}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{t.h2_tips}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: t.tip1Title, desc: t.tip1Desc },
          { title: t.tip2Title, desc: t.tip2Desc },
          { title: t.tip3Title, desc: t.tip3Desc },
          { title: t.tip4Title, desc: t.tip4Desc },
        ].map((tip, i) => (
          <div key={i} style={{ padding: 12, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid var(--accent-blue)' }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>{tip.title}</h4>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{tip.desc}</p>
          </div>
        ))}
      </div>

      <h2 style={h2Style}>{t.h2_faq}</h2>
      {[
        [t.faq1q, t.faq1a], [t.faq2q, t.faq2a], [t.faq3q, t.faq3a], [t.faq4q, t.faq4a], [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginTop: 30 }}>{t.conclusion}</p>
    </div>
  );
}
