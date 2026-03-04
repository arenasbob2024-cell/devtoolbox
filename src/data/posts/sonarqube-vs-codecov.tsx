'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'SonarQube vs Codecov: Code Quality Platform Comparison',
    intro: 'SonarQube and Codecov are two popular platforms for code quality and test coverage analysis. While both help improve code quality, they focus on different aspects: SonarQube on static analysis and code quality, Codecov on test coverage visualization. This comparison examines their features, integration capabilities, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose SonarQube for comprehensive static code analysis, security vulnerabilities, and code smells detection. Choose Codecov for detailed test coverage visualization, coverage trends, and pull request analysis. Many teams use both: SonarQube for code quality and Codecov for coverage tracking.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'SonarQube provides comprehensive static code analysis and quality gates',
    takeaway2: 'Codecov specializes in test coverage visualization and trends',
    takeaway3: 'SonarQube supports 29+ programming languages with deep analysis',
    takeaway4: 'Codecov offers excellent pull request integration and coverage diffs',
    takeaway5: 'SonarQube can be self-hosted or used as cloud service (SonarCloud)',
    takeaway6: 'Codecov is cloud-native with GitHub/GitLab/Bitbucket integration',
    
    whatIsSonarQubeTitle: 'What is SonarQube?',
    whatIsSonarQubeContent: 'SonarQube is an open-source platform for continuous inspection of code quality created in 2007. It performs automatic reviews with static analysis to detect bugs, code smells, and security vulnerabilities. SonarQube supports 29+ programming languages and integrates with CI/CD tools. It offers both self-hosted and cloud (SonarCloud) versions.',
    
    whatIsCodecovTitle: 'What is Codecov?',
    whatIsCodecovContent: 'Codecov is a cloud-based code coverage service founded in 2014. It specializes in visualizing test coverage reports, tracking coverage trends over time, and providing coverage analysis in pull requests. Codecov supports all major coverage formats and integrates with GitHub, GitLab, and Bitbucket. It helps teams maintain and improve test coverage.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'How to integrate each platform:',
    
    sonarqubeExampleTitle: 'SonarQube Configuration',
    codecovExampleTitle: 'Codecov Configuration',
    
    integrationTitle: 'CI/CD Integration',
    integrationIntro: 'Integration capabilities:',
    
    useCasesTitle: 'Best Use Cases',
    sonarqubeBestFor: 'SonarQube is Best For:',
    codecovBestFor: 'Codecov is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'SonarQube and Codecov serve complementary purposes in the quality assurance process. SonarQube is your choice for comprehensive code analysis including bugs, vulnerabilities, and code smells. Codecov excels at test coverage visualization and tracking. Using both provides complete visibility into code quality: SonarQube for code health and Codecov for testing thoroughness. Your choice depends on whether you need static analysis or coverage tracking, or both.',
    
    faq1q: 'Can SonarQube measure test coverage?',
    faq1a: 'Yes, SonarQube can display test coverage but requires coverage reports from external tools (JaCoCo, Cobertura, etc.). It shows coverage metrics alongside code quality issues. However, Codecov provides more detailed coverage visualization, trends, and PR analysis specifically for coverage.',
    
    faq2q: 'Is Codecov free to use?',
    faq2a: 'Codecov offers free tier for open-source projects and public repositories. For private repositories, they have paid plans. The free tier includes basic coverage visualization and PR integration. Enterprise features require paid plans.',
    
    faq3q: 'Which is better for security analysis?',
    faq3a: 'SonarQube is significantly better for security analysis. It detects security vulnerabilities (SQL injection, XSS, etc.), security hotspots, and OWASP Top 10 issues. Codecov does not perform security analysis as it focuses solely on test coverage.',
    
    faq4q: 'Can I use both tools together?',
    faq4a: 'Yes, and this is recommended. Use SonarQube for static code analysis and Codecov for detailed coverage tracking. Both integrate with CI/CD pipelines and can run in parallel. Many teams use SonarQube quality gates alongside Codecov coverage requirements.',
    
    faq5q: 'What about self-hosting options?',
    faq5a: 'SonarQube offers robust self-hosting with the Community Edition (free) and commercial editions. Codecov has limited self-hosting options through their enterprise plan. If self-hosting is a requirement, SonarQube is the clear winner.',
    
    faq6q: 'Which has better pull request integration?',
    faq6a: 'Both have excellent PR integration. SonarQube shows code quality issues and coverage in PRs. Codecov specializes in coverage diffs, showing exactly which lines are covered in new code. Codecov PR checks are more coverage-focused while SonarQube provides broader quality feedback.',
    
    faq7q: 'What languages are supported?',
    faq7a: 'SonarQube supports 29+ languages including Java, JavaScript, TypeScript, Python, C#, Go, and more with deep analysis. Codecov is language-agnostic and works with any coverage format (JaCoCo, Cobertura, lcov, etc.) regardless of the programming language.',
    
    faq8q: 'How do quality gates work?',
    faq8a: 'SonarQube quality gates define pass/fail criteria based on metrics (new bugs, coverage, duplications, etc.). PRs can be blocked if quality gates fail. Codecov has coverage gates that can fail PRs if coverage drops below thresholds or if new code lacks coverage. Both can enforce quality standards.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'SonarQube vs Codecov：代码质量平台对比',
    intro: 'SonarQube 和 Codecov 是两个流行的代码质量和测试覆盖率分析平台。虽然两者都帮助提高代码质量，但它们专注于不同方面：SonarQube 专注于静态分析和代码质量，Codecov 专注于测试覆盖率可视化。本比较将考察它们的功能、集成能力和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为全面的静态代码分析、安全漏洞和代码异味检测选择 SonarQube。为详细的测试覆盖率可视化、覆盖率趋势和拉取请求分析选择 Codecov。许多团队同时使用两者：SonarQube 用于代码质量，Codecov 用于覆盖率跟踪。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'SonarQube 提供全面的静态代码分析和质量门禁',
    takeaway2: 'Codecov 专注于测试覆盖率可视化和趋势',
    takeaway3: 'SonarQube 支持 29+ 编程语言的深度分析',
    takeaway4: 'Codecov 提供出色的拉取请求集成和覆盖率差异',
    takeaway5: 'SonarQube 可以自托管或作为云服务（SonarCloud）使用',
    takeaway6: 'Codecov 是云原生的，与 GitHub/GitLab/Bitbucket 集成',
    
    whatIsSonarQubeTitle: '什么是 SonarQube？',
    whatIsSonarQubeContent: 'SonarQube 是一个开源平台，用于持续检查代码质量，创建于 2007 年。它通过静态分析执行自动审查，以检测错误、代码异味和安全漏洞。SonarQube 支持 29+ 编程语言，并与 CI/CD 工具集成。它提供自托管和云（SonarCloud）版本。',
    
    whatIsCodecovTitle: '什么是 Codecov？',
    whatIsCodecovContent: 'Codecov 是一个基于云的代码覆盖率服务，成立于 2014 年。它专注于可视化测试覆盖率报告、跟踪覆盖率趋势并在拉取请求中提供覆盖率分析。Codecov 支持所有主要的覆盖率格式，并与 GitHub、GitLab 和 Bitbucket 集成。它帮助团队维护和提高测试覆盖率。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '如何集成每个平台：',
    
    sonarqubeExampleTitle: 'SonarQube 配置',
    codecovExampleTitle: 'Codecov 配置',
    
    integrationTitle: 'CI/CD 集成',
    integrationIntro: '集成能力：',
    
    useCasesTitle: '最佳用例',
    sonarqubeBestFor: 'SonarQube 最适合：',
    codecovBestFor: 'Codecov 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'SonarQube 和 Codecov 在质量保证过程中服务于互补目的。SonarQube 是全面代码分析的选择，包括错误、漏洞和代码异味。Codecov 在测试覆盖率可视化和跟踪方面表现出色。同时使用两者提供对代码质量的完整可见性：SonarQube 用于代码健康，Codecov 用于测试彻底性。选择取决于你需要静态分析还是覆盖率跟踪，或两者都需要。',
    
    faq1q: 'SonarQube 可以测量测试覆盖率吗？',
    faq1a: '是的，SonarQube 可以显示测试覆盖率，但需要来自外部工具（JaCoCo、Cobertura 等）的覆盖率报告。它与代码质量问题一起显示覆盖率指标。然而，Codecov 专门为覆盖率提供更详细的覆盖率可视化、趋势和 PR 分析。',
    
    faq2q: 'Codecov 免费使用吗？',
    faq2a: 'Codecov 为开源项目和公共仓库提供免费层。对于私有仓库，它们有付费计划。免费层包括基本覆盖率可视化和 PR 集成。企业功能需要付费计划。',
    
    faq3q: '哪个更适合安全分析？',
    faq3a: 'SonarQube 在安全分析方面明显更好。它检测安全漏洞（SQL 注入、XSS 等）、安全热点和 OWASP Top 10 问题。Codecov 不执行安全分析，因为它专注于测试覆盖率。',
    
    faq4q: '我可以同时使用两个工具吗？',
    faq4a: '是的，这是推荐的。使用 SonarQube 进行静态代码分析，使用 Codecov 进行详细覆盖率跟踪。两者都与 CI/CD 管道集成，可以并行运行。许多团队使用 SonarQube 质量门禁和 Codecov 覆盖率要求。',
    
    faq5q: '自托管选项怎么样？',
    faq5a: 'SonarQube 通过社区版（免费）和商业版提供强大的自托管功能。Codecov 通过其企业计划提供有限的自托管选项。如果自托管是要求，SonarQube 是明显的赢家。',
    
    faq6q: '哪个有更好的拉取请求集成？',
    faq6a: '两者都有出色的 PR 集成。SonarQube 在 PR 中显示代码质量问题和覆盖率。Codecov 专注于覆盖率差异，准确显示新代码中哪些行被覆盖。Codecov PR 检查更专注于覆盖率，而 SonarQube 提供更广泛的质量反馈。',
    
    faq7q: '支持哪些语言？',
    faq7a: 'SonarQube 支持 29+ 语言，包括 Java、JavaScript、TypeScript、Python、C#、Go 等，具有深度分析。Codecov 与语言无关，适用于任何覆盖率格式（JaCoCo、Cobertura、lcov 等），无论编程语言如何。',
    
    faq8q: '质量门禁如何工作？',
    faq8a: 'SonarQube 质量门禁基于指标（新错误、覆盖率、重复等）定义通过/失败标准。如果质量门禁失败，PR 可以被阻止。Codecov 有覆盖率门禁，如果覆盖率降至阈值以下或新代码缺乏覆盖率，可以失败 PR。两者都可以执行质量标准。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function SonarQubeVsCodecov({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsSonarQubeTitle}</h3>
      <p style={pStyle}>{ct.whatIsSonarQubeContent}</p>

      <h3 style={h3Style}>{ct.whatIsCodecovTitle}</h3>
      <p style={pStyle}>{ct.whatIsCodecovContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>SonarQube</th>
              <th style={thStyle}>Codecov</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心功能' : 'Core Function', isZh ? '静态代码分析' : 'Static code analysis', isZh ? '测试覆盖率' : 'Test coverage'],
              [isZh ? '开源' : 'Open Source', isZh ? '社区版' : 'Community edition', isZh ? 'OS 免费' : 'Free for OS'],
              [isZh ? '自托管' : 'Self-hosted', '✅', isZh ? '有限' : 'Limited'],
              [isZh ? '安全分析' : 'Security Analysis', '✅', '❌'],
              [isZh ? '覆盖率可视化' : 'Coverage Visualization', isZh ? '基础' : 'Basic', isZh ? '优秀' : 'Excellent'],
              [isZh ? 'PR 集成' : 'PR Integration', '✅', '✅'],
              [isZh ? '支持语言' : 'Languages', '29+', isZh ? '语言无关' : 'Language-agnostic'],
              [isZh ? '趋势分析' : 'Trend Analysis', '✅', '✅'],
            ].map(([feature, sonarqube, codecov], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{sonarqube}</td>
                <td style={tdStyle}>{codecov}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#4e9a06' }}>{ct.sonarqubeExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# SonarQube configuration (sonar-project.properties)
sonar.projectKey=my-project
sonar.projectName=My Project
sonar.projectVersion=1.0

# Source code location
sonar.sources=src
sonar.tests=tests
sonar.test.inclusions=**/*.test.js,**/*.spec.js

# Coverage report paths
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.coverage.exclusions=**/*.test.js,**/*.spec.js

# Language-specific settings
sonar.typescript.tsconfigPath=tsconfig.json
sonar.python.coverage.reportPaths=coverage.xml

# Quality gate settings
sonar.qualitygate.wait=true
sonar.qualitygate.timeout=300

# SonarQube with GitHub Actions
name: SonarQube Analysis
on: [push, pull_request]
jobs:
  sonarqube:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: SonarQube Scan
        uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: $\\u0060{{ secrets.SONAR_TOKEN }}\\u0060
          SONAR_HOST_URL: $\\u0060{{ secrets.SONAR_HOST_URL }}\\u0060

# SonarCloud (cloud version) configuration
name: SonarCloud
on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize, reopened]
jobs:
  sonarcloud:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: SonarCloud Scan
        uses: sonarsource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: $\\u0060{{ secrets.GITHUB_TOKEN }}\\u0060
          SONAR_TOKEN: $\\u0060{{ secrets.SONAR_TOKEN }}\\u0060

# Maven configuration
<plugin>
  <groupId>org.sonarsource.scanner.maven</groupId>
  <artifactId>sonar-maven-plugin</artifactId>
  <version>3.9.1.2184</version>
</plugin>

# Run with Maven
mvn clean verify sonar:sonar \\
  -Dsonar.projectKey=my-project \\
  -Dsonar.host.url=http://localhost:9000 \\
  -Dsonar.login=your-token`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f01f7a' }}>{ct.codecovExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Codecov configuration (codecov.yml)
codecov:
  require_ci_to_pass: yes

coverage:
  precision: 2
  round: down
  range: "70...100"
  status:
    project:
      default:
        target: 80%
        threshold: 5%
        if_ci_failed: error
    patch:
      default:
        target: 80%
        threshold: 5%

parsers:
  gcov:
    branch_detection:
      conditional: yes
      loop: yes
      method: no
      macro: no

comment:
  layout: "reach,diff,flags,files,footer"
  behavior: default
  require_changes: no
  require_base: no
  require_head: yes

ignore:
  - "**/*.test.js"
  - "**/*.spec.js"
  - "tests/**"

# Codecov with GitHub Actions
name: Codecov
on: [push, pull_request]
jobs:
  coverage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run tests with coverage
        run: |
          npm ci
          npm test -- --coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          token: $\\u0060{{ secrets.CODECOV_TOKEN }}\\u0060
          files: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella
          fail_ci_if_error: true
          verbose: true

# Python coverage
- name: Generate coverage
  run: |
    pip install pytest pytest-cov
    pytest --cov=./ --cov-report=xml

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    file: ./coverage.xml
    flags: python

# Multiple coverage reports
- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    token: $\\u0060{{ secrets.CODECOV_TOKEN }}\\u0060
    files: |
      ./coverage/lcov.info
      ./coverage/cobertura.xml
      ./coverage/jacoco.xml
    flags: integration,unit
    fail_ci_if_error: true`}</code></pre>

      <h2 style={h2Style}>{ct.integrationTitle}</h2>
      <p style={pStyle}>{ct.integrationIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '集成' : 'Integration'}</th>
              <th style={thStyle}>SonarQube</th>
              <th style={thStyle}>Codecov</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['GitHub', '✅', '✅'],
              ['GitLab', '✅', '✅'],
              ['Bitbucket', '✅', '✅'],
              ['Azure DevOps', '✅', '✅'],
              ['Jenkins', '✅', '✅'],
              ['CircleCI', '✅', '✅'],
              ['GitHub Actions', '✅', '✅'],
              ['GitLab CI', '✅', '✅'],
            ].map(([integration, sonarqube, codecov], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{integration}</td>
                <td style={tdStyle}>{sonarqube}</td>
                <td style={tdStyle}>{codecov}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #4e9a06' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#4e9a06' }}>{ct.sonarqubeBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '静态代码分析' : 'Static code analysis'}</li>
            <li>{isZh ? '安全漏洞检测' : 'Security vulnerability detection'}</li>
            <li>{isZh ? '代码异味识别' : 'Code smell identification'}</li>
            <li>{isZh ? '质量门禁执行' : 'Quality gate enforcement'}</li>
            <li>{isZh ? '技术债务管理' : 'Technical debt management'}</li>
            <li>{isZh ? '需要自托管' : 'Self-hosting required'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f01f7a' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f01f7a' }}>{ct.codecovBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '测试覆盖率可视化' : 'Test coverage visualization'}</li>
            <li>{isZh ? '覆盖率趋势跟踪' : 'Coverage trend tracking'}</li>
            <li>{isZh ? 'PR 覆盖率差异' : 'PR coverage diffs'}</li>
            <li>{isZh ? '覆盖率目标执行' : 'Coverage target enforcement'}</li>
            <li>{isZh ? '开源项目' : 'Open-source projects'}</li>
            <li>{isZh ? '云原生团队' : 'Cloud-native teams'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/regex-tester"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
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
