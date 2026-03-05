'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Jenkins vs GitHub Actions: CI Tool Comparison',
    intro: 'Jenkins and GitHub Actions represent different generations of CI/CD tools. Jenkins, the veteran open-source automation server, offers unparalleled flexibility through plugins. GitHub Actions provides modern, cloud-native CI/CD tightly integrated with GitHub. This comparison explores their architectures, capabilities, and use cases for continuous integration.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Jenkins for maximum flexibility, self-hosted control, and complex enterprise workflows requiring extensive plugin ecosystem. Choose GitHub Actions for cloud-native simplicity, GitHub integration, and modern container-based workflows. Jenkins requires more maintenance but offers unlimited customization; GitHub Actions provides managed infrastructure with excellent developer experience.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Jenkins: 20+ years mature, 1800+ plugins; GitHub Actions: Modern cloud-native',
    takeaway2: 'Jenkins requires self-hosting; GitHub Actions offers managed runners',
    takeaway3: 'Jenkins uses Groovy; GitHub Actions uses YAML configuration',
    takeaway4: 'GitHub Actions has better GitHub integration; Jenkins is VCS-agnostic',
    takeaway5: 'Jenkins needs more maintenance; GitHub Actions is fully managed',
    takeaway6: 'Both support Docker, matrix builds, and distributed builds',
    
    whatIsJenkinsTitle: 'What is Jenkins?',
    whatIsJenkinsContent: 'Jenkins is an open-source automation server written in Java. Originally released in 2011 as a fork of Hudson, it has become the most widely used CI/CD tool. Jenkins provides hundreds of plugins for building, deploying, and automating projects. It runs as a standalone server or in servlet containers, supporting distributed builds across multiple machines.',
    
    whatIsGitHubActionsTitle: 'What is GitHub Actions?',
    whatIsGitHubActionsContent: 'GitHub Actions is GitHub's native CI/CD platform launched in 2018. It enables automation directly within GitHub repositories using YAML workflow files. Actions provides managed runners for Linux, Windows, and macOS, along with a marketplace of pre-built actions. It integrates seamlessly with pull requests, issues, and other GitHub features.',
    
    performanceTitle: 'Architecture Comparison',
    performanceIntro: 'Comparing architectural approaches:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of capabilities:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Pipeline and workflow definitions:',
    
    jenkinsExampleTitle: 'Jenkins Pipeline (Jenkinsfile)',
    githubActionsExampleTitle: 'GitHub Actions Workflow',
    
    dataSourceTitle: 'Integration Ecosystem',
    dataSourceIntro: 'Supported tools and platforms:',
    
    alertingTitle: 'Operational Aspects',
    alertingIntro: 'Deployment and maintenance considerations:',
    
    useCasesTitle: 'Best Use Cases',
    jenkinsBestFor: 'Jenkins is Best For:',
    githubActionsBestFor: 'GitHub Actions is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Jenkins and GitHub Actions serve different needs and philosophies. Jenkins offers unmatched flexibility with its vast plugin ecosystem, making it ideal for complex enterprise environments and teams needing complete control over their CI/CD infrastructure. However, it requires significant maintenance and expertise. GitHub Actions provides a modern, cloud-native experience with excellent GitHub integration, zero infrastructure management, and fast setup. The choice depends on your priorities: maximum customization and control (Jenkins) vs. simplicity and managed infrastructure (GitHub Actions). Many organizations use both: Jenkins for legacy systems and complex enterprise workflows, GitHub Actions for newer GitHub-based projects.',
    
    faq1q: 'Can Jenkins integrate with GitHub?',
    faq1a: 'Yes, Jenkins has excellent GitHub integration through plugins like GitHub Branch Source, GitHub Pull Request Builder, and GitHub OAuth. Jenkins can trigger builds on GitHub events, report build status to pull requests, and use GitHub for authentication. However, the integration requires more setup compared to GitHub Actions native integration.',
    
    faq2q: 'Which is better for cost optimization?',
    faq2a: 'Jenkins can be more cost-effective for heavy CI/CD usage since you control the infrastructure. GitHub Actions offers 2,000-3,000 free minutes monthly, with additional usage charged per-minute. For teams with existing infrastructure or very high CI usage, self-hosted Jenkins may be more economical. Consider infrastructure costs, maintenance effort, and team expertise when comparing costs.',
    
    faq3q: 'How do they compare for containerized applications?',
    faq3a: 'Both support Docker well. Jenkins has a Docker plugin for building and running containers, and supports Kubernetes via plugins. GitHub Actions has native Docker support with container-based jobs and easy multi-architecture builds. GitHub Actions may be easier for containerized workflows, while Jenkins offers more flexibility for complex container orchestration.',
    
    faq4q: 'What about security and access control?',
    faq4a: 'Jenkins offers fine-grained security through plugins like Role-Based Strategy, Matrix Authorization, and integration with LDAP/SAML. GitHub Actions uses GitHub's built-in security model with repository permissions, environment protection rules, and secrets management. Both support OIDC for cloud provider authentication. Jenkins offers more customization; GitHub Actions provides easier setup with good defaults.',
    
    faq5q: 'Which is easier to maintain?',
    faq5a: 'GitHub Actions requires no infrastructure maintenance as it is fully managed. Jenkins requires server maintenance, plugin updates, security patches, and infrastructure scaling. However, Jenkins offers more control over updates and can be version-locked for stability. Organizations without dedicated DevOps resources often find GitHub Actions easier to maintain.',
    
    faq6q: 'Can I use both together?',
    faq6a: 'Yes, many organizations use both. Common patterns include using Jenkins for complex enterprise builds and deployments while using GitHub Actions for pull request validation, security scanning, and simpler workflows. You can trigger Jenkins jobs from GitHub Actions or vice versa, creating hybrid pipelines that leverage both tools strengths.',
    
    faq7q: 'How do they handle large-scale builds?',
    faq7a: 'Jenkins supports distributed builds with master-agent architecture, allowing unlimited scaling across machines. It can handle thousands of concurrent builds with proper configuration. GitHub Actions supports matrix builds and self-hosted runners for scale. GitHub's hosted runners have concurrent job limits (varies by plan). For massive scale, Jenkins with self-hosted infrastructure offers more control.',
    
    faq8q: 'What about learning resources and community?',
    faq8a: 'Jenkins has a large, mature community with 20+ years of documentation, tutorials, and troubleshooting resources. Its plugin ecosystem has extensive documentation. GitHub Actions, while newer, has excellent official documentation and growing community content. Jenkins has more extensive resources for complex scenarios; GitHub Actions documentation is more approachable for beginners.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Jenkins vs GitHub Actions：CI工具对比',
    intro: 'Jenkins和GitHub Actions代表了不同代次的CI/CD工具。Jenkins，这位老牌开源自动化服务器，通过插件提供无与伦比的灵活性。GitHub Actions提供与GitHub紧密集成的现代云原生CI/CD。本比较探索它们在持续集成中的架构、能力和用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为最大灵活性、自托管控制和需要广泛插件生态系统的复杂企业工作流程选择Jenkins。为云原生简洁性、GitHub集成和现代基于容器的工作流程选择GitHub Actions。Jenkins需要更多维护但提供无限定制；GitHub Actions提供托管基础设施和优秀的开发者体验。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Jenkins：20+年成熟，1800+插件；GitHub Actions：现代云原生',
    takeaway2: 'Jenkins需要自托管；GitHub Actions提供托管运行器',
    takeaway3: 'Jenkins使用Groovy；GitHub Actions使用YAML配置',
    takeaway4: 'GitHub Actions有更好的GitHub集成；Jenkins与VCS无关',
    takeaway5: 'Jenkins需要更多维护；GitHub Actions完全托管',
    takeaway6: '两者都支持Docker、矩阵构建和分布式构建',
    
    whatIsJenkinsTitle: '什么是Jenkins？',
    whatIsJenkinsContent: 'Jenkins是用Java编写的开源自动化服务器。最初于2011年作为Hudson的分支发布，已成为最广泛使用的CI/CD工具。Jenkins提供数百个插件用于构建、部署和自动化项目。它作为独立服务器或在servlet容器中运行，支持跨多台机器的分布式构建。',
    
    whatIsGitHubActionsTitle: '什么是GitHub Actions？',
    whatIsGitHubActionsContent: 'GitHub Actions是GitHub于2018年推出的原生CI/CD平台。它使用YAML工作流程文件在GitHub仓库内直接实现自动化。Actions为Linux、Windows和macOS提供托管运行器，以及预构建操作的市场。它与pull requests、issues和其他GitHub功能无缝集成。',
    
    performanceTitle: '架构对比',
    performanceIntro: '比较架构方法：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '能力的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '流水线和工作流程定义：',
    
    jenkinsExampleTitle: 'Jenkins流水线（Jenkinsfile）',
    githubActionsExampleTitle: 'GitHub Actions工作流程',
    
    dataSourceTitle: '集成生态系统',
    dataSourceIntro: '支持的工具和平台：',
    
    alertingTitle: '运维方面',
    alertingIntro: '部署和维护考虑：',
    
    useCasesTitle: '最佳用例',
    jenkinsBestFor: 'Jenkins最适合：',
    githubActionsBestFor: 'GitHub Actions最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Jenkins和GitHub Actions服务于不同的需求和理念。Jenkins通过其庞大的插件生态系统提供无与伦比的灵活性，非常适合复杂的企业环境和需要完全控制CI/CD基础设施的团队。但是，它需要大量的维护和专业知识。GitHub Actions提供现代云原生体验，具有出色的GitHub集成、零基础设施管理和快速设置。选择取决于你的优先级：最大定制和控制（Jenkins）vs简洁性和托管基础设施（GitHub Actions）。许多组织同时使用两者：Jenkins用于遗留系统和复杂企业工作流程，GitHub Actions用于较新的基于GitHub的项目。',
    
    faq1q: 'Jenkins可以与GitHub集成吗？',
    faq1a: '是的，Jenkins通过GitHub Branch Source、GitHub Pull Request Builder和GitHub OAuth等插件与GitHub有出色的集成。Jenkins可以在GitHub事件上触发构建，向pull requests报告构建状态，并使用GitHub进行身份验证。但是，与GitHub Actions的原生集成相比，这种集成需要更多设置。',
    
    faq2q: '哪个更适合成本优化？',
    faq2a: '对于重度CI/CD使用，Jenkins可能更具成本效益，因为你控制基础设施。GitHub Actions每月提供2,000-3,000免费分钟，额外使用按分钟收费。对于有现有基础设施或非常高CI使用量的团队，自托管Jenkins可能更经济。在比较成本时，考虑基础设施成本、维护工作和团队专业知识。',
    
    faq3q: '它们在容器化应用方面如何比较？',
    faq3a: '两者都很好地支持Docker。Jenkins有Docker插件用于构建和运行容器，并通过插件支持Kubernetes。GitHub Actions有原生Docker支持，包括基于容器的作业和轻松的多架构构建。GitHub Actions可能更容易用于容器化工作流程，而Jenkins为复杂的容器编排提供更多灵活性。',
    
    faq4q: '安全和访问控制怎么样？',
    faq4a: 'Jenkins通过Role-Based Strategy、Matrix Authorization等插件以及与LDAP/SAML集成提供细粒度安全。GitHub Actions使用GitHub的内置安全模型，包括仓库权限、环境保护规则和密钥管理。两者都支持OIDC用于云提供商身份验证。Jenkins提供更多定制；GitHub Actions提供更简单的设置和良好的默认值。',
    
    faq5q: '哪个更容易维护？',
    faq5a: 'GitHub Actions不需要基础设施维护，因为它完全托管。Jenkins需要服务器维护、插件更新、安全补丁和基础设施扩展。但是，Jenkins对更新提供更多控制，可以版本锁定以保持稳定性。没有专门DevOps资源的组织通常发现GitHub Actions更容易维护。',
    
    faq6q: '我可以同时使用两者吗？',
    faq6a: '是的，许多组织同时使用两者。常见模式包括使用Jenkins进行复杂的企业构建和部署，同时使用GitHub Actions进行pull request验证、安全扫描和简单工作流程。你可以从GitHub Actions触发Jenkins作业，反之亦然，创建利用两个工具优势的混合流水线。',
    
    faq7q: '它们如何处理大规模构建？',
    faq7a: 'Jenkins支持主-代理架构的分布式构建，允许跨机器无限扩展。通过适当配置，它可以处理数千个并发构建。GitHub Actions支持矩阵构建和自托管运行器进行扩展。GitHub的托管运行器有并发作业限制（因计划而异）。对于大规模，带有自托管基础设施的Jenkins提供更多控制。',
    
    faq8q: '学习资源和社区怎么样？',
    faq8a: 'Jenkins拥有庞大、成熟的社区，有20多年的文档、教程和故障排除资源。其插件生态系统有广泛的文档。GitHub Actions虽然较新，但有出色的官方文档和不断增长的社区内容。Jenkins对复杂场景有更广泛的资源；GitHub Actions文档对初学者更易接近。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function JenkinsVsGitHubActions({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsJenkinsTitle}</h3>
      <p style={pStyle}>{ct.whatIsJenkinsContent}</p>

      <h3 style={h3Style}>{ct.whatIsGitHubActionsTitle}</h3>
      <p style={pStyle}>{ct.whatIsGitHubActionsContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Jenkins</th>
              <th style={thStyle}>GitHub Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '部署模式' : 'Deployment', isZh ? '自托管服务器' : 'Self-hosted server', isZh ? '云托管+自托管' : 'Cloud + Self-hosted'],
              [isZh ? '配置语言' : 'Configuration', 'Groovy/Jenkinsfile', 'YAML'],
              [isZh ? '插件生态' : 'Plugin Ecosystem', '1800+ plugins', isZh ? '10000+ actions' : '10000+ actions'],
              [isZh ? '基础设施' : 'Infrastructure', isZh ? '需管理' : 'Requires management', isZh ? '完全托管' : 'Fully managed'],
              [isZh ? '版本控制集成' : 'VCS Integration', isZh ? '与VCS无关' : 'VCS-agnostic', isZh ? 'GitHub原生' : 'GitHub native'],
              [isZh ? '扩展性' : 'Scalability', isZh ? '主-代理架构' : 'Master-Agent', isZh ? '矩阵+自托管' : 'Matrix + Self-hosted'],
              [isZh ? '维护需求' : 'Maintenance', isZh ? '高' : 'High', isZh ? '低' : 'Low'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '陡峭' : 'Steep', isZh ? '平缓' : 'Gentle'],
            ].map(([feature, jenkins, github], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{jenkins}</td>
                <td style={tdStyle}>{github}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>Jenkins</th>
              <th style={thStyle}>GitHub Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '声明式流水线' : 'Declarative Pipelines', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '脚本化流水线' : 'Scripted Pipelines', 'Groovy DSL', isZh ? '有限' : 'Limited'],
              [isZh ? '并行执行' : 'Parallel Execution', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '矩阵构建' : 'Matrix Builds', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? 'Docker支持' : 'Docker Support', isZh ? '通过插件' : 'Via plugins', isZh ? '原生' : 'Native'],
              [isZh ? '密钥管理' : 'Secrets Management', isZh ? '凭据插件' : 'Credentials plugin', isZh ? '内置密钥' : 'Built-in secrets'],
              [isZh ? '制品存储' : 'Artifact Storage', isZh ? '内置+外部' : 'Built-in + external', isZh ? '内置' : 'Built-in'],
              [isZh ? '通知' : 'Notifications', isZh ? '多种插件' : 'Multiple plugins', isZh ? '内置+市场' : 'Built-in + marketplace'],
            ].map(([cap, jenkins, github], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{jenkins}</td>
                <td style={tdStyle}>{github}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#d33833' }}>{ct.jenkinsExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Jenkins Pipeline (Declarative)
pipeline {
    agent {
        docker {
            image 'node:18'
            args '-p 3000:3000'
        }
    }
    
    environment {
        NODE_ENV = 'test'
        DOCKER_IMAGE = 'myapp'
        REGISTRY = 'registry.example.com'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm run test:unit -- --coverage'
                    }
                    post {
                        always {
                            junit 'coverage/junit.xml'
                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'coverage',
                                reportFiles: 'index.html',
                                reportName: 'Coverage Report'
                            ])
                        }
                    }
                }
                
                stage('Integration Tests') {
                    steps {
                        sh 'npm run test:integration'
                    }
                }
                
                stage('Lint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    docker.build("\${REGISTRY}/\${DOCKER_IMAGE}:\${BUILD_NUMBER}")
                }
            }
        }
        
        stage('Push to Registry') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.withRegistry('https://' + REGISTRY, 'registry-credentials') {
                        docker.image("\${REGISTRY}/\${DOCKER_IMAGE}:\${BUILD_NUMBER}").push()
                        docker.image("\${REGISTRY}/\${DOCKER_IMAGE}:\${BUILD_NUMBER}").push('latest')
                    }
                }
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh "kubectl set image deployment/myapp myapp=\${REGISTRY}/\${DOCKER_IMAGE}:\${BUILD_NUMBER}"
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            slackSend(
                color: 'good',
                message: "Build Successful: \${env.JOB_NAME} #\${env.BUILD_NUMBER}"
            )
        }
        failure {
            slackSend(
                color: 'danger',
                message: "Build Failed: \${env.JOB_NAME} #\${env.BUILD_NUMBER}"
            )
        }
    }
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#2088ff' }}>{ct.githubActionsExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# GitHub Actions Workflow
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_ENV: test
  DOCKER_IMAGE: myapp
  REGISTRY: registry.example.com

jobs:
  test:
    runs-on: ubuntu-latest
    container: node:18
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run unit tests
        run: npm run test:unit -- --coverage
      
      - name: Run integration tests
        run: npm run test:integration
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          token: \${{ secrets.CODECOV_TOKEN }}
      
      - name: Archive coverage report
        uses: actions/upload-artifact@v3
        with:
          name: coverage-report
          path: coverage/

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'push'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to Registry
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ secrets.REGISTRY_USER }}
          password: \${{ secrets.REGISTRY_PASSWORD }}
      
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            \${{ env.REGISTRY }}/\${{ env.DOCKER_IMAGE }}:\${{ github.sha }}
            \${{ env.REGISTRY }}/\${{ env.DOCKER_IMAGE }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    
    steps:
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/myapp myapp=\${{ env.REGISTRY }}/\${{ env.DOCKER_IMAGE }}:\${{ github.sha }}
      
      - name: Notify Slack on success
        if: success()
        uses: 8398a7/action-slack@v3
        with:
          status: success
          text: 'Build Successful'
          webhook_url: \${{ secrets.SLACK_WEBHOOK }}
      
      - name: Notify Slack on failure
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: failure
          text: 'Build Failed'
          webhook_url: \${{ secrets.SLACK_WEBHOOK }}`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '类别' : 'Category'}</th>
              <th style={thStyle}>Jenkins</th>
              <th style={thStyle}>GitHub Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '版本控制' : 'Version Control', 'Git, SVN, Mercurial, etc.', 'GitHub only'],
              [isZh ? '云平台' : 'Cloud Platforms', 'AWS, Azure, GCP via plugins', 'AWS, Azure, GCP native + marketplace'],
              [isZh ? '容器编排' : 'Container Orchestration', 'Kubernetes, Docker Swarm plugins', 'Native Docker + K8s actions'],
              [isZh ? '测试工具' : 'Testing Tools', 'JUnit, TestNG, Selenium, etc.', 'All via marketplace actions'],
              [isZh ? '部署工具' : 'Deployment', 'Ansible, Chef, Puppet plugins', 'Terraform, Helm, kubectl actions'],
              [isZh ? '通知' : 'Notifications', 'Slack, Email, Hipchat plugins', 'Built-in + marketplace actions'],
            ].map(([cat, jenkins, github], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{jenkins}</td>
                <td style={tdStyle}>{github}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #d33833' }}>
          <strong style={{ color: '#d33833' }}>Jenkins Operational Considerations</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '需要服务器管理和维护、插件更新和兼容性检查、安全补丁管理、主-代理节点配置、备份和恢复策略、性能监控和调优、高可用性设置需要额外配置。' : 'Requires server management and maintenance, plugin updates and compatibility checks, security patch management, master-agent node configuration, backup and recovery strategy, performance monitoring and tuning, high availability setup requires additional configuration.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #2088ff' }}>
          <strong style={{ color: '#2088ff' }}>GitHub Actions Operational Considerations</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '零基础设施管理、自动更新和扩展、内置高可用性、托管运行器有使用限制、自托管运行器需要维护、工作流程文件版本控制、GitHub API速率限制考虑。' : 'Zero infrastructure management, automatic updates and scaling, built-in high availability, usage limits on hosted runners, self-hosted runners require maintenance, workflow files in version control, GitHub API rate limits consideration.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #d33833' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#d33833' }}>{ct.jenkinsBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业级复杂工作流程' : 'Enterprise complex workflows'}</li>
            <li>{isZh ? '需要完全基础设施控制' : 'Need complete infrastructure control'}</li>
            <li>{isZh ? '遗留系统集成' : 'Legacy system integration'}</li>
            <li>{isZh ? '重度定制需求' : 'Heavy customization needs'}</li>
            <li>{isZh ? '大规模并行构建' : 'Large-scale parallel builds'}</li>
            <li>{isZh ? '非Git版本控制' : 'Non-Git version control'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #2088ff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#2088ff' }}>{ct.githubActionsBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'GitHub为中心的团队' : 'GitHub-centric teams'}</li>
            <li>{isZh ? '云原生应用' : 'Cloud-native applications'}</li>
            <li>{isZh ? '快速设置和迭代' : 'Quick setup and iteration'}</li>
            <li>{isZh ? '开源项目' : 'Open source projects'}</li>
            <li>{isZh ? '容器化工作流程' : 'Containerized workflows'}</li>
            <li>{isZh ? '现代开发实践' : 'Modern development practices'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/yaml-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>YAML Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
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
