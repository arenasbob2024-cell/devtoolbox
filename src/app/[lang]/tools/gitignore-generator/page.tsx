'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type TemplateCategory = 'language' | 'ide' | 'os';

interface Templates {
  language: { [key: string]: string };
  ide: { [key: string]: string };
  os: { [key: string]: string };
}

const gitignoreTemplates: Templates = {
  language: {
    nodejs: `# Node.js dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json
yarn.lock
pnpm-lock.yaml
.npm
.eslintcache
dist/
build/`,
    python: `# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
.pytest_cache/`,
    java: `# Java
*.class
*.jar
*.war
*.nar
/target/
.classpath
.project
.settings/
*.swp
*.swo
*~
.DS_Store
.gradle/
build/`,
    go: `# Go
*.exe
*.exe~
*.dll
*.so
*.dylib
*.test
*.out
/bin/
/vendor/
go.sum
.idea/`,
    rust: `# Rust
/target/
Cargo.lock
**/*.rs.bk
*.pdb
.idea/`,
    ruby: `# Ruby
*.gem
*.rbc
/.config
/.idea
/coverage/
/InstalledFiles
/pkg/
/rdoc/
/spec/reports/
/test/tmp/
/test/version_tmp/
/tmp/
*.bundle
*.so
*.o
Gemfile.lock`,
    php: `# PHP
vendor/
composer.lock
*.log
.env
.env.local
/storage/
/bootstrap/cache/`,
    'c/c++': `# C/C++
*.o
*.a
*.so
*.out
CMakeFiles/
cmake_install.cmake
Makefile
*.swp
*.swo`,
    swift: `# Swift
build/
*.xcodeproj/
*.xcworkspace/
.DS_Store
DerivedData/
xcuserdata/`,
    kotlin: `# Kotlin
out/
*.iml
.idea/
build/`,
  },
  ide: {
    vscode: `# VS Code
.vscode/
*.code-workspace
.history/`,
    intellij: `# IntelliJ
.idea/
*.iml
*.iws
*.ipr
out/`,
    vim: `# Vim
*.swp
*.swo
*~
.vim/
.vimrc`,
    sublime: `# Sublime Text
*.sublime-project
*.sublime-workspace
.subversion`,
  },
  os: {
    macos: `# macOS
.DS_Store
.AppleDouble
.LSOverride
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db`,
    windows: `# Windows
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/`,
    linux: `# Linux
*~
.directory
.Trash-*`,
  },
};

export default function GitignoreGenerator() {
  const { dict } = useLang();
  const t = dict.tools['gitignore-generator'];

  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [customPatterns, setCustomPatterns] = useState('');

  const generateGitignore = () => {
    let content = `# Generated .gitignore
# Created on ${new Date().toISOString().split('T')[0]}

`;

    selectedTemplates.forEach((templateKey) => {
      let templateContent = '';
      for (const cat of Object.values(gitignoreTemplates)) {
        if (templateKey in cat) {
          templateContent = cat[templateKey as keyof typeof cat];
          break;
        }
      }
      if (templateContent) {
        content += `# ${templateKey.charAt(0).toUpperCase() + templateKey.slice(1)}\n`;
        content += templateContent + '\n\n';
      }
    });

    if (customPatterns.trim()) {
      content += `# Custom patterns\n${customPatterns}\n`;
    }

    return content || '# .gitignore\n';
  };

  const toggleTemplate = (templateKey: string) => {
    setSelectedTemplates((prev) =>
      prev.includes(templateKey)
        ? prev.filter((t) => t !== templateKey)
        : [...prev, templateKey]
    );
  };

  const clearAll = () => {
    setSelectedTemplates([]);
    setCustomPatterns('');
  };

  const selectCategory = (category: TemplateCategory) => {
    const categoryTemplates = Object.keys(gitignoreTemplates[category]);
    setSelectedTemplates((prev) => {
      const newTemplates = new Set(prev);
      categoryTemplates.forEach((t) => {
        if (newTemplates.has(t)) {
          newTemplates.delete(t);
        } else {
          newTemplates.add(t);
        }
      });
      return Array.from(newTemplates);
    });
  };

  const output = generateGitignore();

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="gitignore-generator"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Templates Panel */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>
            {t.templatesLabel || 'Select Templates'}
          </h3>

          {/* Language Templates */}
          <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                {t.languagesLabel || 'Programming Languages'}
              </h4>
              <button
                onClick={() => selectCategory('language')}
                className="btn btn-secondary"
                style={{ fontSize: 11, padding: '4px 8px' }}
              >
                {t.toggleAllLabel || 'Toggle All'}
              </button>
            </div>
            {Object.keys(gitignoreTemplates.language).map((key) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontSize: 13 }}>
                <input
                  type="checkbox"
                  checked={selectedTemplates.includes(key)}
                  onChange={() => toggleTemplate(key)}
                  style={{ cursor: 'pointer' }}
                />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            ))}
          </div>

          {/* IDE Templates */}
          <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                {t.ideLabel || 'IDEs & Editors'}
              </h4>
              <button
                onClick={() => selectCategory('ide')}
                className="btn btn-secondary"
                style={{ fontSize: 11, padding: '4px 8px' }}
              >
                {t.toggleAllLabel || 'Toggle All'}
              </button>
            </div>
            {Object.keys(gitignoreTemplates.ide).map((key) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontSize: 13 }}>
                <input
                  type="checkbox"
                  checked={selectedTemplates.includes(key)}
                  onChange={() => toggleTemplate(key)}
                  style={{ cursor: 'pointer' }}
                />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            ))}
          </div>

          {/* OS Templates */}
          <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                {t.osLabel || 'Operating Systems'}
              </h4>
              <button
                onClick={() => selectCategory('os')}
                className="btn btn-secondary"
                style={{ fontSize: 11, padding: '4px 8px' }}
              >
                {t.toggleAllLabel || 'Toggle All'}
              </button>
            </div>
            {Object.keys(gitignoreTemplates.os).map((key) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontSize: 13 }}>
                <input
                  type="checkbox"
                  checked={selectedTemplates.includes(key)}
                  onChange={() => toggleTemplate(key)}
                  style={{ cursor: 'pointer' }}
                />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Output Panel */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
              {t.outputLabel || 'Generated .gitignore'}
            </h3>
            <CopyButton text={output} />
          </div>

          {/* Custom Patterns Input */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8, color: 'var(--text-primary)' }}>
              {t.customPatternsLabel || 'Custom Patterns'}
            </label>
            <textarea
              value={customPatterns}
              onChange={(e) => setCustomPatterns(e.target.value)}
              placeholder={t.customPlaceholder || 'Add custom patterns, one per line\n.env\n.DS_Store\nbuild/'}
              style={{ minHeight: 80, marginBottom: 12 }}
            />
          </div>

          {/* Generated Output */}
          <textarea
            value={output}
            readOnly
            style={{ minHeight: 'calc(100vh - 500px)', fontFamily: 'monospace', fontSize: 12 }}
          />

          {/* Clear Button */}
          <button onClick={clearAll} className="btn btn-secondary" style={{ marginTop: 12, width: '100%' }}>
            {t.clearLabel || 'Clear All'}
          </button>
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'About .gitignore Generator'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
          {t.seoContent || 'Create optimized .gitignore files for your project. Choose from predefined templates for programming languages, IDEs, and operating systems. Combine multiple templates or add custom patterns.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle || 'Key Features'}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 || 'Support for 10+ programming languages (Node.js, Python, Java, Go, Rust, Ruby, PHP, C/C++, Swift, Kotlin)'}</li>
          <li>{t.seoFeature2 || 'IDE templates for VS Code, IntelliJ, Vim, and Sublime Text'}</li>
          <li>{t.seoFeature3 || 'Operating system templates for macOS, Windows, and Linux'}</li>
          <li>{t.seoFeature4 || 'Combine multiple templates and add custom patterns'}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
