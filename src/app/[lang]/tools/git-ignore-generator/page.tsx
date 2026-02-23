'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: '.gitignore Generator',
    description: 'Generate .gitignore files for your project. Select from popular presets: Node.js, Python, Java, Go, Rust, React, Next.js, Vue, macOS, Windows, Linux, and IDE templates.',
    presetsLabel: 'Select Templates',
    generateBtn: 'Generate .gitignore',
    clear: 'Clear Selection',
    copyBtn: 'Copy .gitignore',
    downloadHint: 'Save as .gitignore in your project root',
    outputLabel: '.gitignore Output',
    selected: 'selected',
    introTitle: 'Free .gitignore Generator',
    introText: 'The .gitignore file tells Git which files and directories to ignore in your project. This generator combines multiple templates for different languages, frameworks, and operating systems to create a comprehensive .gitignore for your project. Select the relevant templates and copy the output to your project root.',
    tipTitle: '.gitignore Tips',
    tip1: 'Place .gitignore in the root directory of your repository',
    tip2: 'Use # to add comments in your .gitignore file',
    tip3: 'Use ! to negate a pattern (force-include files normally ignored)',
    tip4: 'A trailing / matches directories only, not files',
    tip5: 'Patterns with / in the middle only match from the repo root',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a .gitignore file?',
    faq1a: 'A .gitignore file specifies intentionally untracked files that Git should ignore. Files already tracked by Git are not affected. Each line specifies a pattern — files matching these patterns will be excluded from Git tracking, keeping your repository clean of build artifacts, dependencies, IDE files, and OS-specific files.',
    faq2q: 'Why should I ignore node_modules?',
    faq2a: 'The node_modules directory can contain thousands of files and should not be committed to Git. Instead, commit the package.json and package-lock.json (or yarn.lock) files, which allow anyone to restore dependencies by running npm install. This keeps the repository size manageable.',
    faq3q: 'Can .gitignore patterns use wildcards?',
    faq3a: 'Yes, .gitignore supports glob pattern matching. * matches any sequence of characters except /. ** matches any number of directories. ? matches any single character except /. [] matches any character in the bracket range. These wildcards give you powerful pattern matching for excluding files.',
    faq4q: 'What if I already committed files I want to ignore?',
    faq4a: 'Adding files to .gitignore does not remove them from Git tracking if they were already committed. You need to untrack them first: git rm --cached <filename> (for files) or git rm -r --cached <dirname> (for directories). Then commit the removal. Future changes to those files will be ignored.',
    faq5q: 'Should I commit my .gitignore file?',
    faq5a: 'Yes, always commit your .gitignore file. It helps all contributors know which files to ignore and keeps the repository clean. You can also create a global .gitignore in your home directory (~/.gitignore_global) for personal IDE or OS files that you want to ignore across all repositories.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: '.gitignore 生成器',
    description: '为您的项目生成 .gitignore 文件。从流行预设中选择：Node.js、Python、Java、Go、Rust、React、Next.js、Vue、macOS、Windows、Linux 和 IDE 模板。',
    presetsLabel: '选择模板', generateBtn: '生成 .gitignore', clear: '清除选择',
    copyBtn: '复制 .gitignore', downloadHint: '保存为项目根目录中的 .gitignore', outputLabel: '.gitignore 输出', selected: '已选择',
    introTitle: '免费 .gitignore 生成器',
    introText: '.gitignore 文件告诉 Git 在项目中忽略哪些文件和目录。此生成器为不同语言、框架和操作系统组合多个模板。',
    tipTitle: '.gitignore 提示', tip1: '将 .gitignore 放在仓库的根目录', tip2: '使用 # 在 .gitignore 文件中添加注释',
    tip3: '使用 ! 取反模式（强制包含通常被忽略的文件）', tip4: '末尾的 / 仅匹配目录，不匹配文件', tip5: '中间有 / 的模式只从仓库根目录匹配',
    faqTitle: '常见问题',
    faq1q: '什么是 .gitignore 文件？', faq1a: '.gitignore 文件指定 Git 应忽略的未跟踪文件。每行指定一个模式，匹配这些模式的文件将从 Git 跟踪中排除，使仓库保持干净。',
    faq2q: '为什么要忽略 node_modules？', faq2a: 'node_modules 目录可能包含数千个文件，不应提交到 Git。应提交 package.json 和 package-lock.json，允许任何人通过 npm install 恢复依赖。',
    faq3q: '.gitignore 模式可以使用通配符吗？', faq3a: '是的，支持 glob 模式匹配。* 匹配任何字符序列（除/外）。** 匹配任意数量的目录。? 匹配任意单个字符。[] 匹配括号范围内的任何字符。',
    faq4q: '如果我已经提交了想忽略的文件怎么办？', faq4a: '将文件添加到 .gitignore 不会影响已跟踪的文件。需要先取消跟踪：git rm --cached <文件名>。然后提交删除。之后对这些文件的更改将被忽略。',
    faq5q: '应该提交 .gitignore 文件吗？', faq5a: '是的，始终提交 .gitignore 文件。它帮助所有贡献者了解要忽略哪些文件，保持仓库整洁。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: '.gitignore ジェネレーター',
    description: 'プロジェクトの .gitignore ファイルを生成します。Node.js、Python、Java、Go、Rust など人気のプリセットを選択。',
    presetsLabel: 'テンプレート選択', generateBtn: '.gitignore を生成', clear: '選択クリア',
    copyBtn: '.gitignore をコピー', downloadHint: 'プロジェクトルートに .gitignore として保存', outputLabel: '.gitignore 出力', selected: '選択済み',
    introTitle: '無料 .gitignore ジェネレーター', introText: '.gitignore ファイルはGitが無視するファイルを指定します。複数のテンプレートを組み合わせて包括的な .gitignore を作成できます。',
    tipTitle: 'ヒント', tip1: '.gitignore はリポジトリのルートディレクトリに配置', tip2: '# はコメントに使用',
    tip3: '! でパターンを否定（通常無視されるファイルを含める）', tip4: '末尾の / はディレクトリのみにマッチ', tip5: '中間に / があるパターンはリポジトリルートからのみマッチ',
    faqTitle: 'よくある質問',
    faq1q: '.gitignore ファイルとは？', faq1a: '.gitignore ファイルはGitが無視する意図的に追跡されないファイルを指定します。各行はパターンを指定します。',
    faq2q: 'node_modules を無視すべき理由は？', faq2a: 'node_modules は数千のファイルを含む可能性があり、Gitにコミットすべきではありません。代わりに package.json をコミットします。',
    faq3q: 'ワイルドカードは使えますか？', faq3a: 'glob パターンマッチをサポート。* は / 以外の文字列にマッチ。** は任意のディレクトリ数にマッチ。',
    faq4q: '既にコミットしたファイルを無視するには？', faq4a: 'git rm --cached <ファイル名> で追跡を解除し、コミットします。',
    faq5q: '.gitignore をコミットすべきですか？', faq5a: 'はい、常にコミットしてください。全貢献者が無視するファイルを把握できます。',
    relatedTitle: '関連ツール',
  },
};

type Preset = { id: string; label: string; category: string; content: string };

const PRESETS: Preset[] = [
  { id: 'nodejs', label: 'Node.js', category: 'Language', content: `# Node.js\nnode_modules/\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n.npm\n.yarn-integrity\n.node_repl_history\n*.tgz\n.env\n.env.local\n.env.*.local\ndist/\nbuild/` },
  { id: 'python', label: 'Python', category: 'Language', content: `# Python\n__pycache__/\n*.py[cod]\n*$py.class\n*.so\n.Python\nbuild/\ndevelop-eggs/\ndist/\ndownloads/\neggs/\n.eggs/\nlib/\nlib64/\nparts/\nsdist/\nvar/\nwheels/\n*.egg-info/\n.installed.cfg\n*.egg\n.env\nvenv/\nenv/\n.venv\n.pytest_cache/\n.mypy_cache/` },
  { id: 'java', label: 'Java', category: 'Language', content: `# Java\n*.class\n*.log\n*.ctxt\n.mtj.tmp/\n*.jar\n*.war\n*.nar\n*.ear\n*.zip\n*.tar.gz\n*.rar\nhs_err_pid*\ntarget/\n.settings/\n.classpath\n.project` },
  { id: 'go', label: 'Go', category: 'Language', content: `# Go\n*.exe\n*.exe~\n*.dll\n*.so\n*.dylib\n*.test\n*.out\ngo.sum\nvendor/` },
  { id: 'rust', label: 'Rust', category: 'Language', content: `# Rust\n/target\n**/*.rs.bk\nCargo.lock` },
  { id: 'react', label: 'React', category: 'Framework', content: `# React\nnode_modules/\n.env\n.env.local\nbuild/\n.DS_Store\n*.log\nnpm-debug.log*\nyarn-debug.log*` },
  { id: 'nextjs', label: 'Next.js', category: 'Framework', content: `# Next.js\n.next/\nout/\nbuild/\nnode_modules/\n.env\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*` },
  { id: 'vue', label: 'Vue', category: 'Framework', content: `# Vue\nnode_modules/\n.DS_Store\ndist/\ndist-ssr/\n*.local\n.env\nnpm-debug.log*\nyarn-debug.log*` },
  { id: 'macos', label: 'macOS', category: 'OS', content: `# macOS\n.DS_Store\n.AppleDouble\n.LSOverride\nIcon\n._*\n.DocumentRevisions-V100\n.fseventsd\n.Spotlight-V100\n.TemporaryItems\n.Trashes\n.VolumeIcon.icns\n.com.apple.timemachine.donotpresent` },
  { id: 'windows', label: 'Windows', category: 'OS', content: `# Windows\nThumbs.db\nThumbs.db:encryptable\nehthumbs.db\nehthumbs_vista.db\n*.stackdump\n[Dd]esktop.ini\n$RECYCLE.BIN/\n*.cab\n*.msi\n*.msix\n*.msm\n*.msp\n*.lnk` },
  { id: 'linux', label: 'Linux', category: 'OS', content: `# Linux\n*~\n.fuse_hidden*\n.directory\n.Trash-*\n.nfs*` },
  { id: 'vscode', label: 'VS Code', category: 'IDE', content: `# VS Code\n.vscode/*\n!.vscode/settings.json\n!.vscode/tasks.json\n!.vscode/launch.json\n!.vscode/extensions.json\n*.code-workspace\n.history/` },
  { id: 'intellij', label: 'IntelliJ IDEA', category: 'IDE', content: `# IntelliJ IDEA\n.idea/\n*.iws\n*.iml\n*.ipr\nout/\n!**/src/main/**/out/\n!**/src/test/**/out/` },
  { id: 'vim', label: 'Vim', category: 'IDE', content: `# Vim\n[._]*.s[a-v][a-z]\n!*.svg  # comment out if you don't need vector files tracked\n[._]*.sw[a-p]\n[._]s[a-rt-v][a-z]\n[._]ss[a-gi-z]\n[._]sw[a-p]\n[!-.]\n*.un~\nSession.vim\n.netrwhist` },
];

const CATEGORIES = ['Language', 'Framework', 'OS', 'IDE'];

export default function GitIgnoreGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const output = useMemo(() => {
    const parts = PRESETS.filter(p => selected.has(p.id)).map(p => p.content);
    if (parts.length === 0) return '';
    return `# Generated by DevToolBox .gitignore Generator\n# https://viadreams.cc\n\n${parts.join('\n\n')}`;
  }, [selected]);

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
    <ToolLayout title={t.title} description={t.description} toolId="git-ignore-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Template selector */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.presetsLabel} ({selected.size} {t.selected})</label>
          <button onClick={() => setSelected(new Set())} className="btn btn-ghost" style={{ fontSize: 12 }}>{t.clear}</button>
        </div>
        {CATEGORIES.map(cat => (
          <div key={cat} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{cat}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {PRESETS.filter(p => p.category === cat).map(p => {
                const isSelected = selected.has(p.id);
                return (
                  <button key={p.id} onClick={() => toggle(p.id)}
                    style={{
                      padding: '6px 16px', borderRadius: 100, fontSize: 13, cursor: 'pointer', fontWeight: isSelected ? 700 : 400,
                      border: isSelected ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                      background: isSelected ? 'rgba(59,130,246,0.12)' : 'var(--bg-input)',
                      color: isSelected ? 'var(--accent-blue)' : 'var(--text-primary)', transition: 'all 0.15s',
                    }}>
                    {isSelected ? '✓ ' : ''}{p.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Output */}
      {output && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.downloadHint}</span>
              <CopyButton text={output} label={t.copyBtn} />
            </div>
          </div>
          <pre style={{ background: '#0a0a0a', color: '#22c55e', padding: 16, borderRadius: 8, fontSize: 12, fontFamily: 'monospace', overflow: 'auto', maxHeight: 500, border: '1px solid var(--border-color)', margin: 0, lineHeight: 1.6 }}>
            {output}
          </pre>
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li><li>{t.tip2}</li><li>{t.tip3}</li><li>{t.tip4}</li><li>{t.tip5}</li>
        </ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/chmod-calculator`, label: 'Chmod Calculator' },
            { href: `/${lang}/tools/crontab-validator`, label: 'Crontab Validator' },
            { href: `/${lang}/tools/markdown-preview`, label: 'Markdown Preview' },
            { href: `/${lang}/tools/ascii-table-generator`, label: 'ASCII Table Generator' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
