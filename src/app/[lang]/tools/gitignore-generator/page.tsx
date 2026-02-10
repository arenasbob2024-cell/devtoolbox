'use client';

import { useState, useMemo, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface TemplateItem {
  id: string;
  label: string;
  patterns: string;
}

interface TemplateCategory {
  key: string;
  label: string;
  items: TemplateItem[];
}

const categories: TemplateCategory[] = [
  {
    key: 'languages',
    label: 'Languages',
    items: [
      {
        id: 'nodejs',
        label: 'Node.js',
        patterns: `# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*
.npm
.yarn/cache
.yarn/unplugged
.yarn/install-state.gz
.env
.env.local
.env.*.local
dist/
build/`,
      },
      {
        id: 'python',
        label: 'Python',
        patterns: `# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
.venv/
pip-log.txt
pip-delete-this-directory.txt
*.egg-info/
.eggs/
dist/
build/
.mypy_cache/
.pytest_cache/
.tox/
.coverage
htmlcov/`,
      },
      {
        id: 'java',
        label: 'Java',
        patterns: `# Java
*.class
*.jar
*.war
*.ear
*.log
target/
.settings/
.project
.classpath
hs_err_pid*
replay_pid*`,
      },
      {
        id: 'go',
        label: 'Go',
        patterns: `# Go
*.exe
*.exe~
*.dll
*.so
*.dylib
*.test
*.out
vendor/
go.work`,
      },
      {
        id: 'rust',
        label: 'Rust',
        patterns: `# Rust
/target/
Cargo.lock
**/*.rs.bk`,
      },
      {
        id: 'c-cpp',
        label: 'C/C++',
        patterns: `# C/C++
*.o
*.obj
*.so
*.dylib
*.dll
*.a
*.lib
*.exe
*.out
*.app
*.dSYM/
build/
cmake-build-*/`,
      },
      {
        id: 'ruby',
        label: 'Ruby',
        patterns: `# Ruby
*.gem
*.rbc
/.config
/coverage/
/InstalledFiles
/pkg/
/spec/reports/
/test/tmp/
/test/version_tmp/
/tmp/
.bundle/
vendor/bundle
.byebug_history`,
      },
      {
        id: 'php',
        label: 'PHP',
        patterns: `# PHP
/vendor/
composer.phar
composer.lock
*.cache
*.log
.env
.phpunit.result.cache`,
      },
      {
        id: 'swift',
        label: 'Swift',
        patterns: `# Swift
.build/
Packages/
xcuserdata/
*.xcscmblueprint
*.xccheckout
DerivedData/
.swiftpm/
Package.resolved`,
      },
      {
        id: 'kotlin',
        label: 'Kotlin',
        patterns: `# Kotlin
*.class
*.jar
*.war
*.ear
.gradle/
build/
out/
.kotlin/`,
      },
    ],
  },
  {
    key: 'frameworks',
    label: 'Frameworks',
    items: [
      {
        id: 'react-nextjs',
        label: 'React / Next.js',
        patterns: `# React / Next.js
.next/
out/
build/
node_modules/
.env.local
.env.development.local
.env.test.local
.env.production.local
.vercel
.turbo`,
      },
      {
        id: 'vue-nuxt',
        label: 'Vue / Nuxt',
        patterns: `# Vue / Nuxt
.nuxt/
.output/
dist/
node_modules/
*.local
.env
.env.*`,
      },
      {
        id: 'angular',
        label: 'Angular',
        patterns: `# Angular
/dist/
/tmp/
/out-tsc/
/bazel-out
node_modules/
/e2e/*.js
/e2e/*.map
.angular/cache`,
      },
      {
        id: 'django',
        label: 'Django',
        patterns: `# Django
*.log
local_settings.py
db.sqlite3
db.sqlite3-journal
media/
staticfiles/
*.pot
*.pyc
__pycache__/`,
      },
      {
        id: 'flask',
        label: 'Flask',
        patterns: `# Flask
instance/
.webassets-cache
*.pyc
__pycache__/
*.db
*.sqlite
.env`,
      },
      {
        id: 'spring-boot',
        label: 'Spring Boot',
        patterns: `# Spring Boot
HELP.md
target/
!.mvn/wrapper/maven-wrapper.jar
!**/src/main/**/target/
!**/src/test/**/target/
.gradle
build/
!gradle/wrapper/gradle-wrapper.jar
*.log`,
      },
      {
        id: 'laravel',
        label: 'Laravel',
        patterns: `# Laravel
/vendor/
node_modules/
.env
.env.backup
.env.production
Homestead.json
Homestead.yaml
/public/hot
/public/storage
/storage/*.key
npm-debug.log
yarn-error.log`,
      },
      {
        id: 'rails',
        label: 'Rails',
        patterns: `# Rails
*.rbc
capybara-*.html
.rspec
/db/*.sqlite3
/db/*.sqlite3-journal
/public/system
/coverage/
/spec/tmp
/log/*
/tmp/*
.byebug_history
config/master.key
config/credentials/*.key`,
      },
    ],
  },
  {
    key: 'ides',
    label: 'IDEs / Editors',
    items: [
      {
        id: 'vscode',
        label: 'VS Code',
        patterns: `# VS Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
*.code-workspace
.history/`,
      },
      {
        id: 'intellij',
        label: 'IntelliJ / JetBrains',
        patterns: `# IntelliJ / JetBrains
.idea/
*.iml
*.iws
*.ipr
out/
.idea_modules/
atlassian-ide-plugin.xml
com_crashlytics_export_strings.xml`,
      },
      {
        id: 'vim',
        label: 'Vim',
        patterns: `# Vim
[._]*.s[a-v][a-z]
!*.svg
[._]*.sw[a-p]
[._]s[a-rt-v][a-z]
[._]ss[a-gi-z]
[._]sw[a-p]
Session.vim
Sessionx.vim
.netrwhist
*~
tags`,
      },
      {
        id: 'emacs',
        label: 'Emacs',
        patterns: `# Emacs
*~
\\#*\\#
/.emacs.desktop
/.emacs.desktop.lock
*.elc
auto-save-list
tramp
.\\#*
.org-id-locations
*_archive
*.rel`,
      },
      {
        id: 'sublime',
        label: 'Sublime Text',
        patterns: `# Sublime Text
*.tmlanguage.cache
*.tmPreferences.cache
*.stTheme.cache
*.sublime-workspace
*.sublime-project
sftp-config.json
sftp-config-alt*.json
Package Control.last-run
Package Control.ca-list
Package Control.ca-bundle`,
      },
      {
        id: 'eclipse',
        label: 'Eclipse',
        patterns: `# Eclipse
.metadata
bin/
tmp/
*.tmp
*.bak
*.swp
*~.nib
local.properties
.settings/
.loadpath
.recommenders
.externalToolBuilders/
*.launch`,
      },
    ],
  },
  {
    key: 'os',
    label: 'OS',
    items: [
      {
        id: 'macos',
        label: 'macOS',
        patterns: `# macOS
.DS_Store
.AppleDouble
.LSOverride
Icon
._*
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent
.AppleDB
.AppleDesktop`,
      },
      {
        id: 'windows',
        label: 'Windows',
        patterns: `# Windows
Thumbs.db
Thumbs.db:encryptable
ehthumbs.db
ehthumbs_vista.db
*.stackdump
[Dd]esktop.ini
$RECYCLE.BIN/
*.cab
*.msi
*.msix
*.msm
*.msp
*.lnk`,
      },
      {
        id: 'linux',
        label: 'Linux',
        patterns: `# Linux
*~
.fuse_hidden*
.directory
.Trash-*
.nfs*`,
      },
    ],
  },
  {
    key: 'build',
    label: 'Build Tools',
    items: [
      {
        id: 'npm',
        label: 'npm',
        patterns: `# npm
node_modules/
npm-debug.log*
.npm
package-lock.json`,
      },
      {
        id: 'yarn',
        label: 'yarn',
        patterns: `# yarn
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
.pnp.*
yarn-debug.log*
yarn-error.log*`,
      },
      {
        id: 'pnpm',
        label: 'pnpm',
        patterns: `# pnpm
node_modules/
.pnpm-debug.log*
.pnpm-store/`,
      },
      {
        id: 'maven',
        label: 'Maven',
        patterns: `# Maven
target/
pom.xml.tag
pom.xml.releaseBackup
pom.xml.versionsBackup
pom.xml.next
release.properties
dependency-reduced-pom.xml
buildNumber.properties
.mvn/timing.properties
.mvn/wrapper/maven-wrapper.jar`,
      },
      {
        id: 'gradle',
        label: 'Gradle',
        patterns: `# Gradle
.gradle/
build/
!gradle/wrapper/gradle-wrapper.jar
!gradle/wrapper/gradle-wrapper.properties
gradle-app.setting
!*.java.hsp
.gradletasknamecache`,
      },
      {
        id: 'cmake',
        label: 'CMake',
        patterns: `# CMake
CMakeLists.txt.user
CMakeCache.txt
CMakeFiles/
CMakeScripts/
Testing/
Makefile
cmake_install.cmake
install_manifest.txt
compile_commands.json
CTestTestfile.cmake
_deps/
build/`,
      },
    ],
  },
];

export default function GitignoreGenerator() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['gitignore-generator'];

  const [activeCategory, setActiveCategory] = useState('languages');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [customRules, setCustomRules] = useState('');

  const toggleTemplate = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelected(new Set());
    setCustomRules('');
  }, []);

  const output = useMemo(() => {
    const sections: string[] = [];

    for (const category of categories) {
      for (const item of category.items) {
        if (selected.has(item.id)) {
          sections.push(item.patterns);
        }
      }
    }

    if (customRules.trim()) {
      sections.push(`# Custom rules\n${customRules.trim()}`);
    }

    return sections.join('\n\n');
  }, [selected, customRules]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.gitignore';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output]);

  const activeItems = categories.find(c => c.key === activeCategory)?.items || [];

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="gitignore-generator"
    >
      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: 'none',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              background: activeCategory === cat.key
                ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))'
                : 'var(--bg-input)',
              color: activeCategory === cat.key ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Template chips */}
      <div style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {activeItems.map(item => {
            const isSelected = selected.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleTemplate(item.id)}
                style={{
                  padding: '7px 16px',
                  borderRadius: 20,
                  border: `1px solid ${isSelected ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(59,130,246,0.15)' : 'var(--bg-card)',
                  color: isSelected ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  transition: 'all 0.2s',
                }}
              >
                {isSelected ? '\u2713 ' : ''}{item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected summary */}
      {selected.size > 0 && (
        <div style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: 16,
          fontSize: 12,
          color: 'var(--text-secondary)',
        }}>
          <span style={{ fontWeight: 600 }}>Selected ({selected.size}):</span>
          {Array.from(selected).map(id => {
            const item = categories.flatMap(c => c.items).find(i => i.id === id);
            return item ? (
              <span
                key={id}
                style={{
                  padding: '3px 10px',
                  borderRadius: 12,
                  background: 'rgba(59,130,246,0.1)',
                  color: 'var(--accent-blue)',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {item.label}
              </span>
            ) : null;
          })}
        </div>
      )}

      {/* Custom rules textarea */}
      <div style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
      }}>
        <label style={{
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--accent-blue)',
          display: 'block',
          marginBottom: 8,
        }}>
          Custom Rules
        </label>
        <textarea
          value={customRules}
          onChange={e => setCustomRules(e.target.value)}
          placeholder={'# Add your own patterns here\n*.secret\nmy-local-config/\n.env.production'}
          rows={4}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 6,
            color: 'var(--text-primary)',
            outline: 'none',
            resize: 'vertical',
            lineHeight: 1.6,
          }}
        />
      </div>

      {/* Output preview */}
      <div style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
            Generated .gitignore
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={clearAll}
              className="btn btn-ghost"
              style={{ fontSize: 12, padding: '6px 12px' }}
            >
              {dict.common.clear}
            </button>
            <CopyButton text={output} label={dict.common.copy} />
            <button
              onClick={handleDownload}
              className="btn btn-primary"
              style={{ fontSize: 12, padding: '6px 12px' }}
              disabled={!output}
            >
              Download .gitignore
            </button>
          </div>
        </div>
        <pre style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: 8,
          padding: 16,
          fontSize: 13,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          color: 'var(--accent-emerald)',
          lineHeight: 1.6,
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          margin: 0,
          minHeight: 100,
          maxHeight: 500,
        }}>
          {output || '# Select templates above to generate your .gitignore file...'}
        </pre>
      </div>

      {/* SEO Section */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
