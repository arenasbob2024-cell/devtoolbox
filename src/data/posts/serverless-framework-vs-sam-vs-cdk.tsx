'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Serverless Framework vs SAM vs CDK: IaC Framework Comparison',
    intro: 'Serverless Framework, AWS SAM, and AWS CDK are three popular Infrastructure as Code (IaC) tools for deploying serverless applications. Each takes a different approach to defining and deploying cloud resources. This comparison examines their syntax, features, learning curves, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Serverless Framework for multi-cloud deployments and simplicity. Choose SAM for AWS-focused projects with quick Lambda development. Choose CDK for complex infrastructure requiring full programming language capabilities and type safety. All three can deploy Lambda functions, but differ significantly in abstraction level and flexibility.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Serverless Framework supports AWS, Azure, GCP, and other providers',
    takeaway2: 'SAM is AWS-specific with the simplest YAML syntax for Lambda',
    takeaway3: 'CDK offers full TypeScript/Python/Java programming power',
    takeaway4: 'Serverless Framework has the largest community and plugin ecosystem',
    takeaway5: 'CDK provides best IDE support with autocomplete and type checking',
    takeaway6: 'SAM offers fastest local development and testing workflow',
    
    whatIsServerlessTitle: 'What is Serverless Framework?',
    whatIsServerlessContent: 'Serverless Framework, launched in 2015, is an open-source IaC tool supporting multiple cloud providers. It uses YAML configuration to define functions, events, and resources. With over 40,000 GitHub stars and 1,500+ plugins, it\'s the most popular serverless deployment tool. It supports AWS, Azure, Google Cloud, Knative, and more.',
    
    whatIsSamTitle: 'What is AWS SAM?',
    whatIsSamContent: 'AWS SAM (Serverless Application Model), launched by AWS in 2016, is a specialized IaC tool for AWS serverless applications. It extends CloudFormation with simplified syntax for Lambda, API Gateway, and DynamoDB. SAM includes SAM CLI for local testing, SAM Accelerate for faster deployments, and integrates seamlessly with AWS developer tools.',
    
    whatIsCdkTitle: 'What is AWS CDK?',
    whatIsCdkContent: 'AWS CDK (Cloud Development Kit), launched in 2019, allows infrastructure definition using TypeScript, JavaScript, Python, Java, C#, or Go. It compiles to CloudFormation and provides high-level constructs for common patterns. CDK offers the full power of programming languages including loops, conditionals, and object-oriented patterns.',
    
    performanceTitle: 'Core Comparison',
    performanceIntro: 'Comparing fundamental capabilities:',
    
    featuresTitle: 'Feature Matrix',
    featuresIntro: 'Detailed feature comparison:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Sample configurations for deploying a Lambda function with API Gateway:',
    
    serverlessExampleTitle: 'Serverless Framework',
    samExampleTitle: 'AWS SAM',
    cdkExampleTitle: 'AWS CDK',
    
    multiCloudTitle: 'Multi-Cloud Support',
    multiCloudIntro: 'Cloud provider support:',
    
    useCasesTitle: 'Best Use Cases',
    serverlessBestFor: 'Serverless Framework is Best For:',
    samBestFor: 'AWS SAM is Best For:',
    cdkBestFor: 'AWS CDK is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Choose the right tool based on your needs: Serverless Framework for multi-cloud flexibility and extensive plugin ecosystem; SAM for AWS-focused serverless applications with simple YAML configuration; CDK for complex infrastructure requiring programming language features. Many teams use multiple tools: CDK for core infrastructure, SAM for Lambda development, or Serverless Framework for cross-cloud deployments.',
    
    faq1q: 'Can I use these tools together?',
    faq1a: 'Yes. You can use CDK for core infrastructure and SAM/Serverless for Lambda deployment. SAM supports nested stacks that can include CDK-generated CloudFormation. Serverless Framework plugins can integrate with CDK. Choose the best tool for each layer of your infrastructure.',
    
    faq2q: 'Which has the fastest deployment speed?',
    faq2a: 'SAM Accelerate offers fastest incremental deployments by detecting changed resources. Serverless Framework with deployment optimization plugins is competitive. CDK deployments are slower for simple changes but more efficient for complex infrastructure due to its diff algorithm.',
    
    faq3q: 'What about Terraform? How does it compare?',
    faq3a: 'Terraform is a general-purpose IaC tool supporting 3,000+ providers. It\'s more verbose for serverless but excellent for multi-cloud infrastructure. Use Terraform when you need broad provider support. Use SAM/CDK/Serverless for serverless-focused deployments with better developer experience.',
    
    faq4q: 'Which has better local testing?',
    faq4a: 'SAM CLI provides the best local Lambda testing experience with sam local invoke and sam local start-api. Serverless Framework offers serverless-offline plugin. CDK relies on SAM CLI or custom solutions. For local-first development, SAM is the clear winner.',
    
    faq5q: 'How do they handle secrets and environment variables?',
    faq5a: 'Serverless Framework has extensive plugins for secrets management (AWS Secrets Manager, SSM, etc.). SAM integrates with AWS Systems Manager and Secrets Manager. CDK provides type-safe constructs for secrets. All three support environment variable injection, but CDK offers the most control.',
    
    faq6q: 'Which is easiest to learn?',
    faq6a: 'SAM has the gentlest learning curve with simple YAML syntax. Serverless Framework is also approachable with good documentation. CDK requires programming knowledge but offers better IDE support once learned. For teams familiar with TypeScript/Python, CDK is worth the investment.',
    
    faq7q: 'What about CI/CD integration?',
    faq7a: 'All three integrate well with CI/CD pipelines. Serverless Framework has CI/CD templates for major platforms. SAM integrates with AWS CodePipeline and GitHub Actions. CDK works with any pipeline and has AWS CDK Pipelines for sophisticated deployments. CDK offers the most flexibility.',
    
    faq8q: 'How do they compare for large enterprise projects?',
    faq8a: 'CDK excels in enterprise environments with its type safety, testing capabilities, and construct library sharing. SAM works well for standardized serverless patterns. Serverless Framework suits organizations with multi-cloud strategies. Consider team skills and existing AWS investment when choosing.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Serverless Framework vs SAM vs CDK：IaC 框架对比',
    intro: 'Serverless Framework、AWS SAM 和 AWS CDK 是三个流行的用于部署 serverless 应用的基础设施即代码（IaC）工具。每个工具采用不同的方法来定义和部署云资源。本比较分析它们的语法、功能、学习曲线和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '选择 Serverless Framework 进行多云部署和简单性。选择 SAM 用于 AWS 专注的项目和快速 Lambda 开发。选择 CDK 用于需要完整编程语言能力和类型安全的复杂基础设施。三者都可以部署 Lambda 函数，但在抽象级别和灵活性上差异显著。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Serverless Framework 支持 AWS、Azure、GCP 和其他提供商',
    takeaway2: 'SAM 是 AWS 专用的，具有最简单的 Lambda YAML 语法',
    takeaway3: 'CDK 提供完整的 TypeScript/Python/Java 编程能力',
    takeaway4: 'Serverless Framework 拥有最大的社区和插件生态系统',
    takeaway5: 'CDK 通过自动完成和类型检查提供最佳 IDE 支持',
    takeaway6: 'SAM 提供最快的本地开发和测试工作流',
    
    whatIsServerlessTitle: '什么是 Serverless Framework？',
    whatIsServerlessContent: 'Serverless Framework 于 2015 年推出，是一个支持多个云提供商的开源 IaC 工具。它使用 YAML 配置来定义函数、事件和资源。拥有超过 40,000 个 GitHub 星和 1,500+ 插件，它是最流行的 serverless 部署工具。它支持 AWS、Azure、Google Cloud、Knative 等。',
    
    whatIsSamTitle: '什么是 AWS SAM？',
    whatIsSamContent: 'AWS SAM（Serverless Application Model）由 AWS 于 2016 年推出，是专门用于 AWS serverless 应用的 IaC 工具。它通过简化的语法扩展 CloudFormation，用于 Lambda、API Gateway 和 DynamoDB。SAM 包括 SAM CLI 用于本地测试、SAM Accelerate 用于更快部署，并与 AWS 开发工具无缝集成。',
    
    whatIsCdkTitle: '什么是 AWS CDK？',
    whatIsCdkContent: 'AWS CDK（Cloud Development Kit）于 2019 年推出，允许使用 TypeScript、JavaScript、Python、Java、C# 或 Go 定义基础设施。它编译为 CloudFormation 并为常见模式提供高级构造。CDK 提供编程语言的完整能力，包括循环、条件语句和面向对象模式。',
    
    performanceTitle: '核心对比',
    performanceIntro: '比较基本能力：',
    
    featuresTitle: '功能矩阵',
    featuresIntro: '详细功能比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '部署带有 API Gateway 的 Lambda 函数的示例配置：',
    
    serverlessExampleTitle: 'Serverless Framework',
    samExampleTitle: 'AWS SAM',
    cdkExampleTitle: 'AWS CDK',
    
    multiCloudTitle: '多云支持',
    multiCloudIntro: '云提供商支持：',
    
    useCasesTitle: '最佳用例',
    serverlessBestFor: 'Serverless Framework 最适合：',
    samBestFor: 'AWS SAM 最适合：',
    cdkBestFor: 'AWS CDK 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: '根据您的需求选择合适的工具：Serverless Framework 用于多云灵活性和广泛的插件生态系统；SAM 用于 AWS 专注的 serverless 应用和简单的 YAML 配置；CDK 用于需要编程语言功能的复杂基础设施。许多团队使用多个工具：CDK 用于核心基础设施，SAM 用于 Lambda 开发，或 Serverless Framework 用于跨云部署。',
    
    faq1q: '我可以一起使用这些工具吗？',
    faq1a: '是的。您可以使用 CDK 用于核心基础设施，使用 SAM/Serverless 用于 Lambda 部署。SAM 支持嵌套堆栈，可以包含 CDK 生成的 CloudFormation。Serverless Framework 插件可以与 CDK 集成。为基础设施的每一层选择最佳工具。',
    
    faq2q: '哪个部署速度最快？',
    faq2a: 'SAM Accelerate 通过检测更改的资源提供最快的增量部署。带有部署优化插件的 Serverless Framework 也很有竞争力。CDK 对于简单更改较慢，但由于其差异算法对于复杂基础设施更高效。',
    
    faq3q: 'Terraform 呢？它如何比较？',
    faq3a: 'Terraform 是支持 3,000+ 提供商的通用 IaC 工具。对于 serverless 来说更冗长，但对于多云基础设施非常出色。当您需要广泛的提供商支持时使用 Terraform。使用 SAM/CDK/Serverless 进行 serverless 专注的部署，具有更好的开发者体验。',
    
    faq4q: '哪个本地测试更好？',
    faq4a: 'SAM CLI 通过 sam local invoke 和 sam local start-api 提供最佳的本地 Lambda 测试体验。Serverless Framework 提供 serverless-offline 插件。CDK 依赖 SAM CLI 或自定义解决方案。对于本地优先开发，SAM 是明显的赢家。',
    
    faq5q: '它们如何处理密钥和环境变量？',
    faq5a: 'Serverless Framework 有广泛的密钥管理插件（AWS Secrets Manager、SSM 等）。SAM 与 AWS Systems Manager 和 Secrets Manager 集成。CDK 为密钥提供类型安全的构造。三者都支持环境变量注入，但 CDK 提供最多的控制。',
    
    faq6q: '哪个最容易学习？',
    faq6a: 'SAM 具有最平缓的学习曲线，YAML 语法简单。Serverless Framework 也易于上手，文档良好。CDK 需要编程知识，但一旦学会提供更好的 IDE 支持。对于熟悉 TypeScript/Python 的团队，CDK 值得投资。',
    
    faq7q: 'CI/CD 集成如何？',
    faq7a: '三者都与 CI/CD 管道良好集成。Serverless Framework 有主要平台的 CI/CD 模板。SAM 与 AWS CodePipeline 和 GitHub Actions 集成。CDK 与任何管道配合工作，并有 AWS CDK Pipelines 用于复杂的部署。CDK 提供最多的灵活性。',
    
    faq8q: '对于大型企业项目如何比较？',
    faq8a: 'CDK 在企业环境中表现出色，具有类型安全、测试能力和构造库共享。SAM 适用于标准化的 serverless 模式。Serverless Framework 适合具有多云策略的组织。选择时考虑团队技能和现有的 AWS 投资。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ServerlessFrameworkVsSamVsCdk({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsServerlessTitle}</h3>
      <p style={pStyle}>{ct.whatIsServerlessContent}</p>

      <h3 style={h3Style}>{ct.whatIsSamTitle}</h3>
      <p style={pStyle}>{ct.whatIsSamContent}</p>

      <h3 style={h3Style}>{ct.whatIsCdkTitle}</h3>
      <p style={pStyle}>{ct.whatIsCdkContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Serverless</th>
              <th style={thStyle}>SAM</th>
              <th style={thStyle}>CDK</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '配置语言' : 'Config Language', 'YAML', 'YAML/JSON', 'TS/JS/Python/Go'],
              [isZh ? '云提供商' : 'Cloud Providers', 'Multi-cloud', 'AWS only', 'AWS only'],
              [isZh ? '抽象级别' : 'Abstraction Level', isZh ? '高' : 'High', isZh ? '高' : 'High', isZh ? '中-高' : 'Med-High'],
              [isZh ? '本地测试' : 'Local Testing', 'Plugin-based', 'Built-in CLI', 'Via SAM CLI'],
              [isZh ? '类型安全' : 'Type Safety', isZh ? '无' : 'None', isZh ? '无' : 'None', isZh ? '完整' : 'Full'],
              [isZh ? '插件数量' : 'Plugins', '1,500+', isZh ? '有限' : 'Limited', isZh ? '构造库' : 'Constructs'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '低' : 'Low', isZh ? '低' : 'Low', isZh ? '中' : 'Medium'],
              [isZh ? 'IDE 支持' : 'IDE Support', isZh ? '基础' : 'Basic', isZh ? '基础' : 'Basic', isZh ? '优秀' : 'Excellent'],
            ].map(([feature, sls, sam, cdk], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{sls}</td>
                <td style={tdStyle}>{sam}</td>
                <td style={tdStyle}>{cdk}</td>
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
              <th style={thStyle}>Serverless</th>
              <th style={thStyle}>SAM</th>
              <th style={thStyle}>CDK</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '增量部署' : 'Incremental Deploy', isZh ? '插件支持' : 'Plugin', 'Accelerate', isZh ? '原生支持' : 'Native'],
              [isZh ? '堆栈嵌套' : 'Nested Stacks', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '自定义资源' : 'Custom Resources', isZh ? 'CloudFormation' : 'CloudFormation', isZh ? 'CloudFormation' : 'CloudFormation', isZh ? '编程构造' : 'Programmatic'],
              [isZh ? '变量系统' : 'Variables', isZh ? '丰富' : 'Rich', isZh ? '基础' : 'Basic', isZh ? '编程语言' : 'PL features'],
              [isZh ? '阶段管理' : 'Stage Management', isZh ? '内置' : 'Built-in', isZh ? '参数化' : 'Parameters', isZh ? '编程控制' : 'Programmatic'],
              [isZh ? '单元测试' : 'Unit Testing', isZh ? 'Jest/Mocha' : 'Jest/Mocha', isZh ? 'Jest/Mocha' : 'Jest/Mocha', isZh ? '内置断言' : 'Built-in assertions'],
              [isZh ? '文档生成' : 'Docs Generation', isZh ? '插件' : 'Plugin', isZh ? '有限' : 'Limited', isZh ? '构造文档' : 'Construct docs'],
              [isZh ? '成本估算' : 'Cost Estimation', 'Serverless Cost', isZh ? '有限' : 'Limited', 'cdk-cost'],
            ].map(([cap, sls, sam, cdk], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{sls}</td>
                <td style={tdStyle}>{sam}</td>
                <td style={tdStyle}>{cdk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#fd5750' }}>{ct.serverlessExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# serverless.yml - Serverless Framework
service: my-api
frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  stage: \${opt:stage, 'dev'}
  environment:
    TABLE_NAME: \${self:service}-\${sls:stage}
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:PutItem
        - dynamodb:GetItem
        - dynamodb:Query
      Resource: !GetAtt Table.Arn

functions:
  createItem:
    handler: src/create.handler
    events:
      - httpApi:
          path: /items
          method: post
    environment:
      LOG_LEVEL: info

  getItem:
    handler: src/get.handler
    events:
      - httpApi:
          path: /items/{id}
          method: get

  listItems:
    handler: src/list.handler
    events:
      - httpApi:
          path: /items
          method: get

resources:
  Resources:
    Table:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: \${self:provider.environment.TABLE_NAME}
        BillingMode: PAY_PER_REQUEST
        AttributeDefinitions:
          - AttributeName: pk
            AttributeType: S
          - AttributeName: sk
            AttributeType: S
        KeySchema:
          - AttributeName: pk
            KeyType: HASH
          - AttributeName: sk
            KeyType: RANGE

plugins:
  - serverless-offline
  - serverless-esbuild

custom:
  esbuild:
    bundle: true
    minify: true

# Deploy: serverless deploy --stage prod`}</code></pre>

      <h3 style={{ ...h3Style, color: '#ff9900' }}>{ct.samExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# template.yaml - AWS SAM
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: My Serverless API

Globals:
  Function:
    Runtime: nodejs18.x
    Timeout: 30
    Environment:
      Variables:
        TABLE_NAME: !Ref ItemsTable
    Architectures:
      - x86_64

Resources:
  CreateItemFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: create.handler
      Events:
        CreateItem:
          Type: HttpApi
          Properties:
            Path: /items
            Method: post
      Policies:
        - DynamoDBWritePolicy:
            TableName: !Ref ItemsTable

  GetItemFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: get.handler
      Events:
        GetItem:
          Type: HttpApi
          Properties:
            Path: /items/{id}
            Method: get
      Policies:
        - DynamoDBReadPolicy:
            TableName: !Ref ItemsTable

  ListItemsFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: list.handler
      Events:
        ListItems:
          Type: HttpApi
          Properties:
            Path: /items
            Method: get

  ItemsTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: !Sub '\${AWS::StackName}-items'
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: pk
          AttributeType: S
        - AttributeName: sk
          AttributeType: S
      KeySchema:
        - AttributeName: pk
          KeyType: HASH
        - AttributeName: sk
          KeyType: RANGE

Outputs:
  ApiEndpoint:
    Description: HTTP API endpoint
    Value: !Sub 'https://\${ServerlessHttpApi}.execute-api.\${AWS::Region}.amazonaws.com'

# Deploy: sam deploy --guided
# Local: sam local start-api`}</code></pre>

      <h3 style={{ ...h3Style, color: '#ffac31' }}>{ct.cdkExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// lib/my-api-stack.ts - AWS CDK (TypeScript)
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class MyApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table
    const table = new dynamodb.Table(this, 'ItemsTable', {
      tableName: \`\${id}-items\`,
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda Functions
    const createFunction = new NodejsFunction(this, 'CreateItemFunction', {
      entry: 'src/create.ts',
      handler: 'handler',
      environment: {
        TABLE_NAME: table.tableName,
        LOG_LEVEL: 'info',
      },
    });

    const getFunction = new NodejsFunction(this, 'GetItemFunction', {
      entry: 'src/get.ts',
      handler: 'handler',
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    const listFunction = new NodejsFunction(this, 'ListItemsFunction', {
      entry: 'src/list.ts',
      handler: 'handler',
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    // Grant permissions
    table.grantWriteData(createFunction);
    table.grantReadData(getFunction);
    table.grantReadData(listFunction);

    // HTTP API
    const api = new apigatewayv2.HttpApi(this, 'Api', {
      apiName: \`\${id}-api\`,
    });

    api.addRoutes({
      path: '/items',
      methods: [apigatewayv2.HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration(
        'CreateIntegration',
        createFunction
      ),
    });

    api.addRoutes({
      path: '/items/{id}',
      methods: [apigatewayv2.HttpMethod.GET],
      integration: new integrations.HttpLambdaIntegration(
        'GetIntegration',
        getFunction
      ),
    });

    api.addRoutes({
      path: '/items',
      methods: [apigatewayv2.HttpMethod.GET],
      integration: new integrations.HttpLambdaIntegration(
        'ListIntegration',
        listFunction
      ),
    });

    // Outputs
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: api.apiEndpoint,
    });
  }
}

// Deploy: cdk deploy
// Diff: cdk diff
// Synth: cdk synth`}</code></pre>

      <h2 style={h2Style}>{ct.multiCloudTitle}</h2>
      <p style={pStyle}>{ct.multiCloudIntro}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #fd5750' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#fd5750' }}>Serverless Framework</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>AWS (primary)</li>
            <li>Azure Functions</li>
            <li>Google Cloud Functions</li>
            <li>Cloudflare Workers</li>
            <li>Knative / K8s</li>
            <li>Alibaba / Tencent</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ff9900' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ff9900' }}>AWS SAM</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>AWS only</li>
            <li>{isZh ? '深度 AWS 集成' : 'Deep AWS integration'}</li>
            <li>{isZh ? '所有 AWS 服务' : 'All AWS services'}</li>
            <li>{isZh ? 'CloudFormation 原生' : 'CloudFormation native'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ffac31' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ffac31' }}>AWS CDK</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>AWS only</li>
            <li>cdk8s (Kubernetes)</li>
            <li>cdktf (Terraform)</li>
            <li>{isZh ? '可扩展构造' : 'Extensible constructs'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #fd5750' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#fd5750' }}>{ct.serverlessBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '多云部署' : 'Multi-cloud deployments'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '小到中型项目' : 'Small to medium projects'}</li>
            <li>{isZh ? '需要大量插件' : 'Need extensive plugins'}</li>
            <li>{isZh ? '多云策略' : 'Multi-cloud strategy'}</li>
            <li>{isZh ? '团队熟悉 YAML' : 'Teams comfortable with YAML'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ff9900' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ff9900' }}>{ct.samBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'AWS 专注项目' : 'AWS-focused projects'}</li>
            <li>{isZh ? 'Lambda 优先开发' : 'Lambda-first development'}</li>
            <li>{isZh ? '本地测试需求' : 'Local testing needs'}</li>
            <li>{isZh ? '简单 serverless 应用' : 'Simple serverless apps'}</li>
            <li>{isZh ? 'AWS 初学者' : 'AWS beginners'}</li>
            <li>{isZh ? '快速迭代' : 'Quick iteration'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ffac31' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ffac31' }}>{ct.cdkBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '复杂基础设施' : 'Complex infrastructure'}</li>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '需要类型安全' : 'Need type safety'}</li>
            <li>{isZh ? '可重用构造' : 'Reusable constructs'}</li>
            <li>{isZh ? '大规模部署' : 'Large-scale deployments'}</li>
            <li>{isZh ? '开发团队协作' : 'Dev team collaboration'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/yaml-validator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>YAML Validator</a> • {' '}
        <a href={"/" + lang + "/tools/diff-checker"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Diff Checker</a>
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
