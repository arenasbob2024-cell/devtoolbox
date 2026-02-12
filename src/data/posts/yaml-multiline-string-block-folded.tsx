'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'YAML Multiline Strings: Block Scalar, Folded, and Literal Styles Explained',
    intro: 'YAML multiline strings are one of the most confusing parts of the YAML specification. With 6 block scalar combinations, 3 chomping indicators, indentation controls, and flow scalars, it is easy to get lost. This guide covers every multiline string style with practical examples from Docker Compose, Kubernetes, GitHub Actions, and Ansible.',

    confusingTitle: '1. Why YAML Multiline Strings Are Confusing',
    confusingP1: 'YAML offers at least 9 different ways to write a string that spans multiple lines. Unlike JSON (which only has \\n inside double quotes) or TOML (which has triple-quoted strings), YAML gives you fine-grained control over how newlines and trailing whitespace are handled. This power comes at the cost of complexity.',
    confusingP2: 'The two main block scalar styles are Literal (|) and Folded (>). Each can be combined with three chomping indicators (clip, strip, keep), resulting in 6 core combinations. On top of that, you can specify explicit indentation levels. Let us break it all down.',
    confusingR1: '6 block scalar combinations (|, |-, |+, >, >-, >+)',
    confusingR2: 'Indentation indicators (|2, >2, etc.)',
    confusingR3: '3 flow scalar styles (plain, single-quoted, double-quoted)',
    confusingR4: 'Subtle differences in trailing newline behavior',
    confusingR5: 'Interaction with YAML parsers (PyYAML, js-yaml, SnakeYAML)',

    literalTitle: '2. Literal Style (|): Preserves Newlines',
    literalDesc: 'The literal block scalar (|) preserves every newline in your text exactly as written. Each line break in the YAML source becomes a literal \\n in the parsed value. A single trailing newline is added by default (clip behavior).',
    literalWhen: 'When to use: shell scripts, code blocks, pre-formatted text, SQL queries, any content where line breaks matter.',
    literalResult: 'Parsed result:',
    literalResultVal: '"Line one\\nLine two\\nLine three\\n"',
    literalNote: 'Key points: Indentation is stripped (relative to the block). Leading spaces beyond the indent level are preserved. A trailing newline is added by default.',

    foldedTitle: '3. Folded Style (>): Folds Newlines to Spaces',
    foldedDesc: 'The folded block scalar (>) replaces single newlines with spaces, effectively joining consecutive lines into a single long line. However, blank lines and "more-indented" lines still create real newlines. A single trailing newline is added by default.',
    foldedWhen: 'When to use: long descriptions, paragraphs of text, any string that you want to wrap for readability but parse as a single line.',
    foldedResult: 'Parsed result:',
    foldedResultVal: '"This is a very long string that I want to wrap across multiple lines for readability.\\n"',
    foldedBlankTitle: 'Blank lines create real newlines in folded style:',
    foldedBlankResult: '"Paragraph one.\\nParagraph two.\\nParagraph three.\\n"',
    foldedIndentTitle: 'More-indented lines also preserve newlines:',
    foldedIndentResult: '"Regular text\\n  indented line\\n  another indented\\nback to normal\\n"',

    chompTitle: '4. Chomping Indicators: Strip (-), Keep (+), Clip (default)',
    chompDesc: 'Chomping controls what happens to the trailing newlines at the end of a block scalar. This is one of the most misunderstood features of YAML.',
    chompClipTitle: 'Clip (default, no indicator)',
    chompClipDesc: 'Keeps a single trailing newline. Any additional trailing newlines are removed.',
    chompStripTitle: 'Strip (- indicator)',
    chompStripDesc: 'Removes ALL trailing newlines. The string ends with the last non-empty line.',
    chompKeepTitle: 'Keep (+ indicator)',
    chompKeepDesc: 'Preserves ALL trailing newlines exactly as written.',
    chompClipResult: '"hello world\\n"  (one trailing newline)',
    chompStripResult: '"hello world"  (no trailing newline)',
    chompKeepResult: '"hello world\\n\\n\\n"  (all three trailing newlines kept)',

    comboTitle: '5. All 6 Block Scalar Combinations',
    comboDesc: 'Here is a comprehensive reference table showing how each combination of style and chomping indicator behaves:',
    comboSyntax: 'Syntax',
    comboName: 'Name',
    comboNewlines: 'Internal Newlines',
    comboTrailing: 'Trailing Newlines',
    comboUseCase: 'Use Case',
    comboLiteralClip: 'Literal Clip',
    comboLiteralStrip: 'Literal Strip',
    comboLiteralKeep: 'Literal Keep',
    comboFoldedClip: 'Folded Clip',
    comboFoldedStrip: 'Folded Strip',
    comboFoldedKeep: 'Folded Keep',
    comboPreserved: 'Preserved',
    comboFolded: 'Folded to spaces',
    comboSingleNL: 'Single \\n added',
    comboAllRemoved: 'All removed',
    comboAllKept: 'All kept',
    comboUC1: 'Shell scripts, code',
    comboUC2: 'Inline values, no trailing NL',
    comboUC3: 'Preserving exact whitespace',
    comboUC4: 'Long descriptions',
    comboUC5: 'Clean single-line values',
    comboUC6: 'Paragraphs with trailing space',

    comboExTitle: 'Side-by-side examples with parsed results:',

    indentTitle: '6. Indentation Control: |2, >2',
    indentDesc: 'By default, YAML determines the indentation level of a block scalar from the first non-empty line. Sometimes you need to override this, especially when content starts with spaces.',
    indentWhy: 'Why you might need explicit indentation:',
    indentR1: 'Content that starts with spaces (e.g., indented code)',
    indentR2: 'YAML parsers that get confused by leading spaces',
    indentR3: 'Ensuring consistent parsing across different YAML libraries',
    indentEx1Title: 'Without indentation indicator (auto-detect):',
    indentEx2Title: 'With explicit indentation indicator:',
    indentNote: 'The number after | or > specifies how many spaces of indentation to strip. |2 means "strip 2 spaces of indentation from each line."',
    indentCombo: 'You can combine indentation with chomping: |2-, >2+, |4+, etc.',

    realWorldTitle: '7. Real-World Examples',

    rwDockerTitle: 'Docker Compose',
    rwDockerDesc: 'Multiline commands in Docker Compose services:',

    rwK8sTitle: 'Kubernetes ConfigMap & Pod',
    rwK8sDesc: 'Storing configuration files and scripts in ConfigMaps:',

    rwGHATitle: 'GitHub Actions',
    rwGHADesc: 'Multi-step shell scripts in workflow steps:',

    rwAnsibleTitle: 'Ansible Playbooks',
    rwAnsibleDesc: 'Shell commands and templates in Ansible tasks:',

    flowTitle: '8. Flow Scalars: Plain, Single-Quoted, Double-Quoted',
    flowDesc: 'Besides block scalars (| and >), YAML also has flow scalars that handle multiline strings differently. These are important to understand for completeness.',
    flowPlainTitle: 'Plain Scalars (no quotes)',
    flowPlainDesc: 'Unquoted strings. Newlines are folded to spaces (like > style). Cannot contain special characters at the start (: # [ ] { } etc.).',
    flowSingleTitle: 'Single-Quoted Scalars',
    flowSingleDesc: 'Enclosed in single quotes. Newlines are folded to spaces. No escape sequences (\\n is literal). Use \'\' to include a literal single quote.',
    flowDoubleTitle: 'Double-Quoted Scalars',
    flowDoubleDesc: 'Enclosed in double quotes. Newlines are folded to spaces. Supports escape sequences (\\n, \\t, \\\\, \\", \\uXXXX). Use \\\\ for literal backslash.',
    flowCompTitle: 'Flow scalar comparison:',
    flowStyle: 'Style',
    flowEscapes: 'Escape Sequences',
    flowNLHandling: 'Newline Handling',
    flowSpecialChars: 'Special Characters',
    flowPlain: 'Plain',
    flowSingle: 'Single-quoted',
    flowDouble: 'Double-quoted',
    flowNo: 'No',
    flowYes: 'Yes',
    flowFoldedToSpace: 'Folded to spaces',
    flowLimited: 'Limited (no : # at start)',
    flowAll: 'All allowed',
    flowAllAllowed: 'All allowed (use \\\'\\\')',

    decisionTitle: '9. Decision Flowchart: Which Style to Use',
    decisionDesc: 'Use this quick reference to pick the right multiline string style:',
    decisionQ1: 'Does your string contain literal newlines that must be preserved?',
    decisionA1Yes: 'Yes -> Use literal style |',
    decisionA1No: 'No -> Continue to next question',
    decisionQ2: 'Is it a long paragraph that you want to wrap for readability?',
    decisionA2Yes: 'Yes -> Use folded style >',
    decisionA2No: 'No -> Use a flow scalar (plain, single, or double quoted)',
    decisionQ3: 'Do you need a trailing newline?',
    decisionA3Yes: 'Yes -> Use clip (default) or keep (+)',
    decisionA3No: 'No -> Use strip (-)',
    decisionQ4: 'Does your content start with spaces?',
    decisionA4Yes: 'Yes -> Add explicit indentation: |2 or >2',
    decisionA4No: 'No -> Let YAML auto-detect indentation',
    decisionQ5: 'Do you need escape sequences (\\n, \\t)?',
    decisionA5Yes: 'Yes -> Use double-quoted flow scalar',
    decisionA5No: 'No -> Use plain or single-quoted scalar',
    decisionSummary: 'Quick summary:',
    decisionSum1: 'Shell scripts / code blocks -> | (literal)',
    decisionSum2: 'Long descriptions / paragraphs -> > (folded)',
    decisionSum3: 'Single-line with no special chars -> plain scalar',
    decisionSum4: 'String with special characters -> "double quoted"',
    decisionSum5: 'No trailing newline needed -> add - (strip)',

    faqTitle: '10. FAQ',
    faq1q: 'What is the difference between | and > in YAML?',
    faq1a: '| (literal) preserves all newlines exactly as written. > (folded) replaces single newlines with spaces, joining lines into a paragraph. Both add a single trailing newline by default. Use | for scripts and code; use > for long descriptions.',
    faq2q: 'How do I remove the trailing newline from a YAML block scalar?',
    faq2a: 'Add a strip indicator (-) after the style character: |- or >-. This removes ALL trailing newlines from the parsed string. For example, "message: |-\\n  Hello world" parses to "Hello world" (no trailing \\n).',
    faq3q: 'Can I mix | and > styles in the same YAML file?',
    faq3a: 'Yes, absolutely. Each key can use a different scalar style. For example, you might use | for a shell script and > for a description in the same Kubernetes manifest or Docker Compose file.',
    faq4q: 'What does the number mean in |2 or >2?',
    faq4a: 'The number is an explicit indentation indicator. It tells the YAML parser how many spaces of indentation to strip from each line. This is useful when your content starts with spaces. For example, |2 means strip 2 spaces of leading indentation.',
    faq5q: 'Why does my YAML multiline string have extra spaces or newlines?',
    faq5a: 'Common causes: (1) Using > when you meant | (newlines get folded to spaces). (2) Forgetting the chomping indicator (default clip adds one trailing \\n). (3) Inconsistent indentation within the block. (4) Extra blank lines at the end of the block. Use a YAML parser or validator to see exactly how your string is being interpreted.',
  },
  zh: {
    title: 'YAML 多行字符串详解：块标量、折叠和字面量样式',
    intro: 'YAML 多行字符串是 YAML 规范中最令人困惑的部分之一。有 6 种块标量组合、3 种裁剪指示符、缩进控制和流标量，很容易迷失方向。本指南通过 Docker Compose、Kubernetes、GitHub Actions 和 Ansible 的实际示例，覆盖所有多行字符串样式。',

    confusingTitle: '1. 为什么 YAML 多行字符串令人困惑',
    confusingP1: 'YAML 提供了至少 9 种不同的方式来编写跨多行的字符串。与 JSON（只能在双引号内使用 \\n）或 TOML（使用三引号字符串）不同，YAML 让你精细控制换行符和尾部空白的处理方式。这种强大功能的代价是复杂性。',
    confusingP2: '两种主要的块标量样式是字面量（|）和折叠（>）。每种都可以与三种裁剪指示符（clip、strip、keep）组合，产生 6 种核心组合。此外，你还可以指定显式缩进级别。让我们逐一分解。',
    confusingR1: '6 种块标量组合（|、|-、|+、>、>-、>+）',
    confusingR2: '缩进指示符（|2、>2 等）',
    confusingR3: '3 种流标量样式（纯文本、单引号、双引号）',
    confusingR4: '尾部换行行为的微妙差异',
    confusingR5: '与 YAML 解析器的交互（PyYAML、js-yaml、SnakeYAML）',

    literalTitle: '2. 字面量样式（|）：保留换行符',
    literalDesc: '字面量块标量（|）完全按原样保留文本中的每个换行符。YAML 源代码中的每个换行都变成解析值中的字面 \\n。默认会添加一个尾部换行符（clip 行为）。',
    literalWhen: '适用场景：Shell 脚本、代码块、预格式化文本、SQL 查询、任何换行符有意义的内容。',
    literalResult: '解析结果：',
    literalResultVal: '"Line one\\nLine two\\nLine three\\n"',
    literalNote: '要点：缩进会被去除（相对于块）。超出缩进级别的前导空格会被保留。默认添加尾部换行符。',

    foldedTitle: '3. 折叠样式（>）：将换行符折叠为空格',
    foldedDesc: '折叠块标量（>）将单个换行符替换为空格，有效地将连续行合并为一个长行。但是，空行和"更多缩进"的行仍然会创建真正的换行符。默认添加一个尾部换行符。',
    foldedWhen: '适用场景：长描述、文本段落、任何你想为了可读性而换行但解析为单行的字符串。',
    foldedResult: '解析结果：',
    foldedResultVal: '"This is a very long string that I want to wrap across multiple lines for readability.\\n"',
    foldedBlankTitle: '空行在折叠样式中创建真正的换行符：',
    foldedBlankResult: '"Paragraph one.\\nParagraph two.\\nParagraph three.\\n"',
    foldedIndentTitle: '更多缩进的行也会保留换行符：',
    foldedIndentResult: '"Regular text\\n  indented line\\n  another indented\\nback to normal\\n"',

    chompTitle: '4. 裁剪指示符：strip（-）、keep（+）、clip（默认）',
    chompDesc: '裁剪控制块标量末尾的尾部换行符如何处理。这是 YAML 中最容易被误解的特性之一。',
    chompClipTitle: 'Clip（默认，无指示符）',
    chompClipDesc: '保留一个尾部换行符。额外的尾部换行符被移除。',
    chompStripTitle: 'Strip（- 指示符）',
    chompStripDesc: '移除所有尾部换行符。字符串以最后一个非空行结束。',
    chompKeepTitle: 'Keep（+ 指示符）',
    chompKeepDesc: '完全按原样保留所有尾部换行符。',
    chompClipResult: '"hello world\\n"（一个尾部换行符）',
    chompStripResult: '"hello world"（无尾部换行符）',
    chompKeepResult: '"hello world\\n\\n\\n"（保留所有三个尾部换行符）',

    comboTitle: '5. 全部 6 种块标量组合',
    comboDesc: '以下是一个综合参考表，展示每种样式和裁剪指示符组合的行为：',
    comboSyntax: '语法',
    comboName: '名称',
    comboNewlines: '内部换行',
    comboTrailing: '尾部换行',
    comboUseCase: '使用场景',
    comboLiteralClip: '字面量 Clip',
    comboLiteralStrip: '字面量 Strip',
    comboLiteralKeep: '字面量 Keep',
    comboFoldedClip: '折叠 Clip',
    comboFoldedStrip: '折叠 Strip',
    comboFoldedKeep: '折叠 Keep',
    comboPreserved: '保留',
    comboFolded: '折叠为空格',
    comboSingleNL: '添加单个 \\n',
    comboAllRemoved: '全部移除',
    comboAllKept: '全部保留',
    comboUC1: 'Shell 脚本、代码',
    comboUC2: '内联值、无尾部换行',
    comboUC3: '保留精确的空白',
    comboUC4: '长描述文本',
    comboUC5: '干净的单行值',
    comboUC6: '带尾部空格的段落',

    comboExTitle: '并排示例与解析结果：',

    indentTitle: '6. 缩进控制：|2、>2',
    indentDesc: '默认情况下，YAML 从第一个非空行确定块标量的缩进级别。有时你需要覆盖此行为，特别是当内容以空格开头时。',
    indentWhy: '为什么可能需要显式缩进：',
    indentR1: '内容以空格开头（如缩进的代码）',
    indentR2: 'YAML 解析器被前导空格困惑',
    indentR3: '确保跨不同 YAML 库的一致解析',
    indentEx1Title: '无缩进指示符（自动检测）：',
    indentEx2Title: '带显式缩进指示符：',
    indentNote: '| 或 > 后面的数字指定要去除多少个空格的缩进。|2 表示"从每行去除 2 个空格的缩进"。',
    indentCombo: '你可以将缩进与裁剪组合使用：|2-、>2+、|4+ 等。',

    realWorldTitle: '7. 实际应用示例',

    rwDockerTitle: 'Docker Compose',
    rwDockerDesc: 'Docker Compose 服务中的多行命令：',

    rwK8sTitle: 'Kubernetes ConfigMap 和 Pod',
    rwK8sDesc: '在 ConfigMap 中存储配置文件和脚本：',

    rwGHATitle: 'GitHub Actions',
    rwGHADesc: '工作流步骤中的多步骤 Shell 脚本：',

    rwAnsibleTitle: 'Ansible Playbooks',
    rwAnsibleDesc: 'Ansible 任务中的 Shell 命令和模板：',

    flowTitle: '8. 流标量：纯文本、单引号、双引号',
    flowDesc: '除了块标量（| 和 >），YAML 还有流标量来以不同方式处理多行字符串。为了完整性，理解这些很重要。',
    flowPlainTitle: '纯文本标量（无引号）',
    flowPlainDesc: '无引号字符串。换行符被折叠为空格（类似 > 样式）。不能以特殊字符开头（: # [ ] { } 等）。',
    flowSingleTitle: '单引号标量',
    flowSingleDesc: '用单引号包围。换行符被折叠为空格。无转义序列（\\n 是字面值）。使用 \'\' 包含字面单引号。',
    flowDoubleTitle: '双引号标量',
    flowDoubleDesc: '用双引号包围。换行符被折叠为空格。支持转义序列（\\n、\\t、\\\\、\\"、\\uXXXX）。使用 \\\\ 表示字面反斜杠。',
    flowCompTitle: '流标量比较：',
    flowStyle: '样式',
    flowEscapes: '转义序列',
    flowNLHandling: '换行处理',
    flowSpecialChars: '特殊字符',
    flowPlain: '纯文本',
    flowSingle: '单引号',
    flowDouble: '双引号',
    flowNo: '否',
    flowYes: '是',
    flowFoldedToSpace: '折叠为空格',
    flowLimited: '受限（开头不能用 : #）',
    flowAll: '全部允许',
    flowAllAllowed: '全部允许（用 \'\'）',

    decisionTitle: '9. 决策流程图：何时使用哪种样式',
    decisionDesc: '使用此快速参考来选择正确的多行字符串样式：',
    decisionQ1: '你的字符串是否包含必须保留的字面换行符？',
    decisionA1Yes: '是 -> 使用字面量样式 |',
    decisionA1No: '否 -> 继续下一个问题',
    decisionQ2: '它是否是一个你想为了可读性而换行的长段落？',
    decisionA2Yes: '是 -> 使用折叠样式 >',
    decisionA2No: '否 -> 使用流标量（纯文本、单引号或双引号）',
    decisionQ3: '你需要尾部换行符吗？',
    decisionA3Yes: '是 -> 使用 clip（默认）或 keep（+）',
    decisionA3No: '否 -> 使用 strip（-）',
    decisionQ4: '你的内容是否以空格开头？',
    decisionA4Yes: '是 -> 添加显式缩进：|2 或 >2',
    decisionA4No: '否 -> 让 YAML 自动检测缩进',
    decisionQ5: '你需要转义序列（\\n、\\t）吗？',
    decisionA5Yes: '是 -> 使用双引号流标量',
    decisionA5No: '否 -> 使用纯文本或单引号标量',
    decisionSummary: '快速总结：',
    decisionSum1: 'Shell 脚本 / 代码块 -> |（字面量）',
    decisionSum2: '长描述 / 段落 -> >（折叠）',
    decisionSum3: '无特殊字符的单行 -> 纯文本标量',
    decisionSum4: '含特殊字符的字符串 -> "双引号"',
    decisionSum5: '不需要尾部换行 -> 添加 -（strip）',

    faqTitle: '10. 常见问题',
    faq1q: 'YAML 中 | 和 > 的区别是什么？',
    faq1a: '|（字面量）完全按原样保留所有换行符。>（折叠）将单个换行符替换为空格，将行合并为段落。两者默认都添加一个尾部换行符。脚本和代码使用 |；长描述使用 >。',
    faq2q: '如何移除 YAML 块标量的尾部换行符？',
    faq2a: '在样式字符后添加 strip 指示符（-）：|- 或 >-。这会移除解析字符串中的所有尾部换行符。例如，"message: |-\\n  Hello world" 解析为 "Hello world"（无尾部 \\n）。',
    faq3q: '可以在同一个 YAML 文件中混合使用 | 和 > 吗？',
    faq3a: '完全可以。每个键都可以使用不同的标量样式。例如，你可以在同一个 Kubernetes 清单或 Docker Compose 文件中对 Shell 脚本使用 | 而对描述使用 >。',
    faq4q: '|2 或 >2 中的数字是什么意思？',
    faq4a: '数字是显式缩进指示符。它告诉 YAML 解析器从每行去除多少个空格的缩进。当你的内容以空格开头时这很有用。例如，|2 表示去除 2 个空格的前导缩进。',
    faq5q: '为什么我的 YAML 多行字符串有多余的空格或换行符？',
    faq5a: '常见原因：(1) 使用 > 但实际想用 |（换行被折叠为空格）。(2) 忘记裁剪指示符（默认 clip 添加一个尾部 \\n）。(3) 块内缩进不一致。(4) 块末尾有多余的空行。使用 YAML 解析器或验证器来查看字符串的精确解析方式。',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.7 };
const ulStyle: React.CSSProperties = { lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 24 };
const tipStyle: React.CSSProperties = { background: 'var(--bg-input)', borderLeft: '4px solid var(--accent-blue)', padding: '12px 16px', borderRadius: '0 8px 8px 0', margin: '16px 0', color: 'var(--text-secondary)', lineHeight: 1.7 };
const warnStyle: React.CSSProperties = { background: 'var(--bg-input)', borderLeft: '4px solid var(--accent-rose)', padding: '12px 16px', borderRadius: '0 8px 8px 0', margin: '16px 0', color: 'var(--text-secondary)', lineHeight: 1.7 };

export default function YamlMultilineString({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
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

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{t.intro}</p>

      {/* Section 1: Why Confusing */}
      <h2 style={h2Style}>{t.confusingTitle}</h2>
      <p style={pStyle}>{t.confusingP1}</p>
      <p style={{ ...pStyle, marginTop: 12 }}>{t.confusingP2}</p>
      <ul style={ulStyle}>
        <li>{t.confusingR1}</li>
        <li>{t.confusingR2}</li>
        <li>{t.confusingR3}</li>
        <li>{t.confusingR4}</li>
        <li>{t.confusingR5}</li>
      </ul>

      {/* Section 2: Literal Style */}
      <h2 style={h2Style}>{t.literalTitle}</h2>
      <p style={pStyle}>{t.literalDesc}</p>
      <div style={tipStyle}>{t.literalWhen}</div>
      <pre style={codeStyle}><code>{`# Literal style (|) — preserves newlines exactly
message: |
  Line one.
  Line two.
  Line three.`}</code></pre>
      <p style={{ ...pStyle, marginTop: 8 }}><strong>{t.literalResult}</strong></p>
      <pre style={codeStyle}><code>{t.literalResultVal}</code></pre>

      <pre style={codeStyle}><code>{`# Preserves indentation beyond the block indent level
script: |
  #!/bin/bash
  if [ "$ENV" = "prod" ]; then
    echo "Production mode"
    npm run build
  else
    echo "Development mode"
    npm run dev
  fi`}</code></pre>

      <pre style={codeStyle}><code>{`# SQL query — newlines preserved for readability
query: |
  SELECT u.id, u.name, u.email
  FROM users u
  JOIN orders o ON u.id = o.user_id
  WHERE o.created_at > '2025-01-01'
  ORDER BY u.name ASC
  LIMIT 100;`}</code></pre>

      <div style={tipStyle}>{t.literalNote}</div>

      {/* Section 3: Folded Style */}
      <h2 style={h2Style}>{t.foldedTitle}</h2>
      <p style={pStyle}>{t.foldedDesc}</p>
      <div style={tipStyle}>{t.foldedWhen}</div>
      <pre style={codeStyle}><code>{`# Folded style (>) — joins lines with spaces
description: >
  This is a very long string
  that I want to wrap across
  multiple lines for readability.`}</code></pre>
      <p style={{ ...pStyle, marginTop: 8 }}><strong>{t.foldedResult}</strong></p>
      <pre style={codeStyle}><code>{t.foldedResultVal}</code></pre>

      <h3 style={h3Style}>{t.foldedBlankTitle}</h3>
      <pre style={codeStyle}><code>{`# Blank lines create real newlines in folded style
content: >
  Paragraph one.

  Paragraph two.

  Paragraph three.`}</code></pre>
      <p style={{ ...pStyle, marginTop: 8 }}><strong>{t.foldedResult}</strong></p>
      <pre style={codeStyle}><code>{t.foldedBlankResult}</code></pre>

      <h3 style={h3Style}>{t.foldedIndentTitle}</h3>
      <pre style={codeStyle}><code>{`# More-indented lines preserve newlines
content: >
  Regular text
    indented line
    another indented
  back to normal`}</code></pre>
      <p style={{ ...pStyle, marginTop: 8 }}><strong>{t.foldedResult}</strong></p>
      <pre style={codeStyle}><code>{t.foldedIndentResult}</code></pre>

      {/* Section 4: Chomping */}
      <h2 style={h2Style}>{t.chompTitle}</h2>
      <p style={pStyle}>{t.chompDesc}</p>

      <h3 style={h3Style}>{t.chompClipTitle}</h3>
      <p style={pStyle}>{t.chompClipDesc}</p>
      <pre style={codeStyle}><code>{`# Clip (default) — single trailing newline
message: |
  hello world


# (two blank lines at end)`}</code></pre>
      <pre style={codeStyle}><code>{`# Result: ${t.chompClipResult}`}</code></pre>

      <h3 style={h3Style}>{t.chompStripTitle}</h3>
      <p style={pStyle}>{t.chompStripDesc}</p>
      <pre style={codeStyle}><code>{`# Strip (-) — no trailing newline
message: |-
  hello world


# (two blank lines at end, all removed)`}</code></pre>
      <pre style={codeStyle}><code>{`# Result: ${t.chompStripResult}`}</code></pre>

      <h3 style={h3Style}>{t.chompKeepTitle}</h3>
      <p style={pStyle}>{t.chompKeepDesc}</p>
      <pre style={codeStyle}><code>{`# Keep (+) — all trailing newlines preserved
message: |+
  hello world


# (two blank lines at end, all kept)`}</code></pre>
      <pre style={codeStyle}><code>{`# Result: ${t.chompKeepResult}`}</code></pre>

      {/* Section 5: All 6 Combinations */}
      <h2 style={h2Style}>{t.comboTitle}</h2>
      <p style={pStyle}>{t.comboDesc}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.comboSyntax}</th>
              <th style={thStyle}>{t.comboName}</th>
              <th style={thStyle}>{t.comboNewlines}</th>
              <th style={thStyle}>{t.comboTrailing}</th>
              <th style={thStyle}>{t.comboUseCase}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 700 }}>|</td>
              <td style={tdStyle}>{t.comboLiteralClip}</td>
              <td style={tdStyle}>{t.comboPreserved}</td>
              <td style={tdStyle}>{t.comboSingleNL}</td>
              <td style={tdStyle}>{t.comboUC1}</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 700 }}>|-</td>
              <td style={tdStyle}>{t.comboLiteralStrip}</td>
              <td style={tdStyle}>{t.comboPreserved}</td>
              <td style={tdStyle}>{t.comboAllRemoved}</td>
              <td style={tdStyle}>{t.comboUC2}</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 700 }}>|+</td>
              <td style={tdStyle}>{t.comboLiteralKeep}</td>
              <td style={tdStyle}>{t.comboPreserved}</td>
              <td style={tdStyle}>{t.comboAllKept}</td>
              <td style={tdStyle}>{t.comboUC3}</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 700 }}>&gt;</td>
              <td style={tdStyle}>{t.comboFoldedClip}</td>
              <td style={tdStyle}>{t.comboFolded}</td>
              <td style={tdStyle}>{t.comboSingleNL}</td>
              <td style={tdStyle}>{t.comboUC4}</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 700 }}>&gt;-</td>
              <td style={tdStyle}>{t.comboFoldedStrip}</td>
              <td style={tdStyle}>{t.comboFolded}</td>
              <td style={tdStyle}>{t.comboAllRemoved}</td>
              <td style={tdStyle}>{t.comboUC5}</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 700 }}>&gt;+</td>
              <td style={tdStyle}>{t.comboFoldedKeep}</td>
              <td style={tdStyle}>{t.comboFolded}</td>
              <td style={tdStyle}>{t.comboAllKept}</td>
              <td style={tdStyle}>{t.comboUC6}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{t.comboExTitle}</h3>
      <pre style={codeStyle}><code>{`# |  (literal clip) — preserves newlines, adds single trailing \\n
a: |
  one
  two

# Result: "one\\ntwo\\n"

# |- (literal strip) — preserves newlines, no trailing \\n
b: |-
  one
  two

# Result: "one\\ntwo"

# |+ (literal keep) — preserves newlines, keeps ALL trailing \\n
c: |+
  one
  two


# Result: "one\\ntwo\\n\\n"

# >  (folded clip) — folds newlines, adds single trailing \\n
d: >
  one
  two

# Result: "one two\\n"

# >- (folded strip) — folds newlines, no trailing \\n
e: >-
  one
  two

# Result: "one two"

# >+ (folded keep) — folds newlines, keeps ALL trailing \\n
f: >+
  one
  two


# Result: "one two\\n\\n"`}</code></pre>

      {/* Section 6: Indentation Control */}
      <h2 style={h2Style}>{t.indentTitle}</h2>
      <p style={pStyle}>{t.indentDesc}</p>
      <p style={{ ...pStyle, fontWeight: 600, marginTop: 12 }}>{t.indentWhy}</p>
      <ul style={ulStyle}>
        <li>{t.indentR1}</li>
        <li>{t.indentR2}</li>
        <li>{t.indentR3}</li>
      </ul>

      <h3 style={h3Style}>{t.indentEx1Title}</h3>
      <pre style={codeStyle}><code>{`# Auto-detect indentation (default behavior)
# YAML detects 2-space indent from first non-empty line
content: |
  normal text
  more text`}</code></pre>

      <h3 style={h3Style}>{t.indentEx2Title}</h3>
      <pre style={codeStyle}><code>{`# Explicit indentation: |2 means "strip 2 spaces"
# Useful when content starts with spaces
content: |2
    This line has 2 leading spaces after stripping
    This also has 2 leading spaces
  This has 0 leading spaces after stripping

# Result: "  This line has 2 leading spaces after stripping\\n  This also has 2 leading spaces\\nThis has 0 leading spaces after stripping\\n"`}</code></pre>

      <pre style={codeStyle}><code>{`# Folded with explicit indentation
description: >2
    This paragraph starts with
    two extra spaces that are
    preserved in the output.

# Result: "  This paragraph starts with two extra spaces that are preserved in the output.\\n"`}</code></pre>

      <div style={tipStyle}>{t.indentNote}</div>

      <pre style={codeStyle}><code>{`# Combining indentation with chomping indicators
script: |2-
    #!/usr/bin/env python
    def main():
        print("Hello")

# Result: "  #!/usr/bin/env python\\n  def main():\\n      print(\\"Hello\\")"
# (2 spaces stripped, no trailing newline due to -)

config: >2+
    This is indented content
    that will be folded
    with trailing newlines kept.


# Result: "  This is indented content that will be folded with trailing newlines kept.\\n\\n"
# (2 spaces stripped, newlines kept due to +)`}</code></pre>
      <div style={warnStyle}>{t.indentCombo}</div>

      {/* Section 7: Real-World Examples */}
      <h2 style={h2Style}>{t.realWorldTitle}</h2>

      <h3 style={h3Style}>{t.rwDockerTitle}</h3>
      <p style={pStyle}>{t.rwDockerDesc}</p>
      <pre style={codeStyle}><code>{`# docker-compose.yml
version: "3.8"

services:
  web:
    image: node:20-alpine
    # Literal style — each command on its own line
    command: |
      sh -c "
        npm install &&
        npm run migrate &&
        npm run start
      "
    environment:
      # Folded strip — long value on one line, no trailing newline
      DATABASE_URL: >-
        postgresql://user:password@db:5432/myapp
        ?sslmode=require
        &connect_timeout=10
    healthcheck:
      # Literal strip — script without trailing newline
      test: |-
        curl -f http://localhost:3000/health || exit 1
      interval: 30s
      timeout: 10s

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    # Folded style — long description for documentation
    labels:
      description: >
        This is the reverse proxy service that handles
        SSL termination, load balancing, and static file
        serving for the web application.`}</code></pre>

      <h3 style={h3Style}>{t.rwK8sTitle}</h3>
      <p style={pStyle}>{t.rwK8sDesc}</p>
      <pre style={codeStyle}><code>{`# ConfigMap with embedded configuration files
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  # Literal style — preserve the entire nginx config as-is
  nginx.conf: |
    server {
        listen 80;
        server_name example.com;

        location / {
            proxy_pass http://app:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        location /static {
            root /var/www;
            expires 30d;
        }
    }

  # Literal style — init script
  init.sh: |
    #!/bin/bash
    set -euo pipefail
    echo "Initializing database..."
    psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" <<'SQL'
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE
      );
    SQL
    echo "Database initialized."

---
# Pod with multiline command
apiVersion: v1
kind: Pod
metadata:
  name: debug-pod
  annotations:
    # Folded style — long description
    description: >
      This pod is used for debugging network
      connectivity issues in the cluster. It
      includes curl, nslookup, and ping tools.
spec:
  containers:
    - name: debug
      image: busybox
      # Literal strip — command without trailing newline
      command: ["sh", "-c"]
      args:
        - |-
          echo "Starting diagnostics..."
          nslookup kubernetes.default
          curl -s -o /dev/null -w "%{http_code}" http://app-service:8080/health
          echo "Diagnostics complete."`}</code></pre>

      <h3 style={h3Style}>{t.rwGHATitle}</h3>
      <p style={pStyle}>{t.rwGHADesc}</p>
      <pre style={codeStyle}><code>{`# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup and Test
        # Literal style — multi-line shell script
        run: |
          echo "Installing dependencies..."
          npm ci
          echo "Running linter..."
          npm run lint
          echo "Running tests..."
          npm test -- --coverage
          echo "All checks passed!"

      - name: Build Docker Image
        run: |
          docker build \\
            --build-arg NODE_ENV=production \\
            --build-arg VERSION=\${{ github.sha }} \\
            -t myapp:\${{ github.sha }} \\
            -t myapp:latest \\
            .

      - name: Set environment variables
        # Literal style — setting multi-line env vars
        run: |
          echo "DEPLOY_MESSAGE<<EOF" >> $GITHUB_ENV
          echo "Deployed commit \${{ github.sha }}" >> $GITHUB_ENV
          echo "Branch: \${{ github.ref_name }}" >> $GITHUB_ENV
          echo "Author: \${{ github.actor }}" >> $GITHUB_ENV
          echo "EOF" >> $GITHUB_ENV

      - name: Notify
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          # Folded strip — JSON payload on one line
          payload: >-
            {
              "text": "CI failed for \${{ github.repository }}",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "Build failed on \${{ github.ref_name }}"
                  }
                }
              ]
            }`}</code></pre>

      <h3 style={h3Style}>{t.rwAnsibleTitle}</h3>
      <p style={pStyle}>{t.rwAnsibleDesc}</p>
      <pre style={codeStyle}><code>{`# playbook.yml
---
- name: Deploy application
  hosts: webservers
  become: yes
  tasks:
    - name: Create deployment script
      # Literal style — shell script content
      copy:
        dest: /opt/deploy.sh
        mode: '0755'
        content: |
          #!/bin/bash
          set -euo pipefail

          APP_DIR="/opt/myapp"
          BACKUP_DIR="/opt/backups"

          echo "[$(date)] Starting deployment..."

          # Backup current version
          if [ -d "$APP_DIR" ]; then
            cp -r "$APP_DIR" "$BACKUP_DIR/$(date +%Y%m%d_%H%M%S)"
          fi

          # Pull and restart
          cd "$APP_DIR"
          git pull origin main
          docker compose down
          docker compose up -d --build

          echo "[$(date)] Deployment complete."

    - name: Configure systemd service
      copy:
        dest: /etc/systemd/system/myapp.service
        content: |
          [Unit]
          Description=My Application
          After=docker.service
          Requires=docker.service

          [Service]
          Type=oneshot
          RemainAfterExit=yes
          WorkingDirectory=/opt/myapp
          ExecStart=/usr/bin/docker compose up -d
          ExecStop=/usr/bin/docker compose down

          [Install]
          WantedBy=multi-user.target

    - name: Display deployment summary
      debug:
        # Folded style — long message
        msg: >
          Deployment completed successfully on
          {{ inventory_hostname }}. The application
          is now running on port {{ app_port }}.
          Check the logs at /var/log/myapp.log
          for any issues.`}</code></pre>

      {/* Section 8: Flow Scalars */}
      <h2 style={h2Style}>{t.flowTitle}</h2>
      <p style={pStyle}>{t.flowDesc}</p>

      <h3 style={h3Style}>{t.flowPlainTitle}</h3>
      <p style={pStyle}>{t.flowPlainDesc}</p>
      <pre style={codeStyle}><code>{`# Plain scalar — no quotes, newlines folded to spaces
description: This is a long
  string that spans multiple
  lines in the YAML source.

# Result: "This is a long string that spans multiple lines in the YAML source."`}</code></pre>

      <h3 style={h3Style}>{t.flowSingleTitle}</h3>
      <p style={pStyle}>{t.flowSingleDesc}</p>
      <pre style={codeStyle}><code>{`# Single-quoted — no escape sequences, newlines folded
message: 'This is a long
  string with ''escaped'' single
  quotes inside it.'

# Result: "This is a long string with 'escaped' single quotes inside it."
# Note: \\n is NOT interpreted — it stays as literal characters
path: 'C:\\Users\\name\\docs'
# Result: "C:\\Users\\name\\docs" (backslashes are literal)`}</code></pre>

      <h3 style={h3Style}>{t.flowDoubleTitle}</h3>
      <p style={pStyle}>{t.flowDoubleDesc}</p>
      <pre style={codeStyle}><code>{`# Double-quoted — supports escape sequences
message: "Line one\\nLine two\\nLine three"
# Result: "Line one\\nLine two\\nLine three" (real newlines!)

# Newlines in source are folded to spaces
long_message: "This is a long
  string that wraps across
  lines in the source."
# Result: "This is a long string that wraps across lines in the source."

# Use \\\\ for literal backslash
path: "C:\\\\Users\\\\name\\\\docs"
# Result: "C:\\Users\\name\\docs"

# Unicode escapes
emoji: "\\u2764 \\u2728"
# Result: "heart sparkles" (actual unicode characters)`}</code></pre>

      <h3 style={h3Style}>{t.flowCompTitle}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.flowStyle}</th>
              <th style={thStyle}>{t.flowEscapes}</th>
              <th style={thStyle}>{t.flowNLHandling}</th>
              <th style={thStyle}>{t.flowSpecialChars}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{t.flowPlain}</td>
              <td style={tdStyle}>{t.flowNo}</td>
              <td style={tdStyle}>{t.flowFoldedToSpace}</td>
              <td style={tdStyle}>{t.flowLimited}</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{t.flowSingle}</td>
              <td style={tdStyle}>{t.flowNo}</td>
              <td style={tdStyle}>{t.flowFoldedToSpace}</td>
              <td style={tdStyle}>{t.flowAllAllowed}</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{t.flowDouble}</td>
              <td style={tdStyle}>{t.flowYes}</td>
              <td style={tdStyle}>{t.flowFoldedToSpace}</td>
              <td style={tdStyle}>{t.flowAll}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 9: Decision Flowchart */}
      <h2 style={h2Style}>{t.decisionTitle}</h2>
      <p style={pStyle}>{t.decisionDesc}</p>

      <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 20, border: '1px solid var(--border-color)', margin: '16px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Q1: {t.decisionQ1}</p>
          <p style={{ color: 'var(--accent-blue)', paddingLeft: 20 }}>{t.decisionA1Yes}</p>
          <p style={{ color: 'var(--text-secondary)', paddingLeft: 20 }}>{t.decisionA1No}</p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Q2: {t.decisionQ2}</p>
          <p style={{ color: 'var(--accent-blue)', paddingLeft: 20 }}>{t.decisionA2Yes}</p>
          <p style={{ color: 'var(--text-secondary)', paddingLeft: 20 }}>{t.decisionA2No}</p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Q3: {t.decisionQ3}</p>
          <p style={{ color: 'var(--accent-blue)', paddingLeft: 20 }}>{t.decisionA3Yes}</p>
          <p style={{ color: 'var(--text-secondary)', paddingLeft: 20 }}>{t.decisionA3No}</p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Q4: {t.decisionQ4}</p>
          <p style={{ color: 'var(--accent-blue)', paddingLeft: 20 }}>{t.decisionA4Yes}</p>
          <p style={{ color: 'var(--text-secondary)', paddingLeft: 20 }}>{t.decisionA4No}</p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Q5: {t.decisionQ5}</p>
          <p style={{ color: 'var(--accent-blue)', paddingLeft: 20 }}>{t.decisionA5Yes}</p>
          <p style={{ color: 'var(--text-secondary)', paddingLeft: 20 }}>{t.decisionA5No}</p>
        </div>
      </div>

      <p style={{ ...pStyle, fontWeight: 700, marginTop: 16 }}>{t.decisionSummary}</p>
      <pre style={codeStyle}><code>{`# Shell scripts / code blocks       ->  | (literal)
# Long descriptions / paragraphs    ->  > (folded)
# No trailing newline needed         ->  add - (strip)
# Keep all trailing newlines         ->  add + (keep)
# Content starts with spaces         ->  add N (e.g., |2, >2)
# Single-line, no special chars      ->  plain scalar
# Need escape sequences (\\n, \\t)    ->  "double quoted"
# String with special YAML chars     ->  'single quoted' or "double"`}</code></pre>
      <ul style={ulStyle}>
        <li>{t.decisionSum1}</li>
        <li>{t.decisionSum2}</li>
        <li>{t.decisionSum3}</li>
        <li>{t.decisionSum4}</li>
        <li>{t.decisionSum5}</li>
      </ul>

      {/* Section 10: FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        { q: t.faq1q, a: t.faq1a },
        { q: t.faq2q, a: t.faq2a },
        { q: t.faq3q, a: t.faq3a },
        { q: t.faq4q, a: t.faq4a },
        { q: t.faq5q, a: t.faq5a },
      ].map((faq, i) => (
        <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>{faq.q}</summary>
          <p style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
