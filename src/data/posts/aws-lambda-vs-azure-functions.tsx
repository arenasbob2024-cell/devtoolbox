'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'AWS Lambda vs Azure Functions: Serverless Computing Comparison',
    intro: 'AWS Lambda and Azure Functions are the two leading serverless computing platforms, enabling developers to run code without managing infrastructure. Both offer event-driven execution, automatic scaling, and pay-per-use pricing. This comprehensive comparison examines their features, performance, pricing, and ideal use cases to help you choose the right platform.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose AWS Lambda for deeper AWS ecosystem integration, longer track record, and mature tooling. Choose Azure Functions for seamless Microsoft/Azure integration, flexible hosting options, and superior enterprise Active Directory support. Both excel at event-driven workloads with similar core capabilities.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Both support multiple languages (Node.js, Python, Java, C#, Go, etc.)',
    takeaway2: 'AWS Lambda has 15-minute max execution time; Azure Functions offers up to 60 minutes',
    takeaway3: 'Azure Functions provides flexible hosting: consumption, premium, and dedicated plans',
    takeaway4: 'AWS Lambda integrates deeply with 200+ AWS services',
    takeaway5: 'Azure Functions has superior Visual Studio and VS Code integration',
    takeaway6: 'Cold start performance varies by language and configuration',
    
    whatIsLambdaTitle: 'What is AWS Lambda?',
    whatIsLambdaContent: 'AWS Lambda is a serverless compute service introduced by Amazon in 2014. It runs code in response to events from AWS services like S3, DynamoDB, Kinesis, SNS, and API Gateway. Lambda automatically manages compute resources, scales from a few requests to thousands per second, and charges only for execution time. It supports Node.js, Python, Java, Go, .NET, Ruby, and custom runtimes.',
    
    whatIsAzureFunctionsTitle: 'What is Azure Functions?',
    whatIsAzureFunctionsContent: 'Azure Functions is Microsoft\'s serverless compute platform launched in 2016. It enables event-driven code execution triggered by Azure services, HTTP requests, timers, and third-party services. Azure Functions offers flexible hosting options including consumption, premium, and dedicated plans. It integrates seamlessly with Visual Studio, VS Code, and Azure DevOps.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core serverless capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Function Examples',
    codeExampleIntro: 'Code samples for both platforms:',
    
    lambdaExampleTitle: 'AWS Lambda Function',
    azureExampleTitle: 'Azure Function',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Understanding the cost structure:',
    
    triggersTitle: 'Trigger Support',
    triggersIntro: 'Event sources and triggers:',
    
    useCasesTitle: 'Best Use Cases',
    lambdaBestFor: 'AWS Lambda is Best For:',
    azureBestFor: 'Azure Functions is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'AWS Lambda and Azure Functions are both excellent serverless platforms with similar core capabilities. Choose AWS Lambda if you are invested in the AWS ecosystem, need deep integration with AWS services, or prefer a more mature platform. Choose Azure Functions if you use Microsoft technologies, need flexible hosting options, or require enterprise Active Directory integration. Many organizations use both platforms for different workloads based on their cloud strategy.',
    
    faq1q: 'Which platform has better cold start performance?',
    faq1a: 'Cold start performance varies by runtime, memory allocation, and platform optimizations. AWS Lambda generally has faster cold starts for Node.js and Python. Azure Functions Premium plan offers pre-warmed instances to eliminate cold starts. Both platforms have improved significantly with provisioned concurrency features.',
    
    faq2q: 'Can I run Docker containers on both platforms?',
    faq2a: 'Yes. AWS Lambda supports container images up to 10GB through Lambda Container Images. Azure Functions supports containerized functions on Premium and Dedicated plans, and Azure Container Apps for more complex scenarios. Both allow custom runtimes via containers.',
    
    faq3q: 'How do they compare for long-running tasks?',
    faq3a: 'AWS Lambda has a 15-minute maximum execution time. Azure Functions Consumption plan allows up to 10 minutes (default 5), Premium plan up to 60 minutes, and Dedicated plan unlimited. For longer tasks, consider AWS Step Functions or Azure Durable Functions.',
    
    faq4q: 'Which is better for enterprise integration?',
    faq4a: 'Azure Functions has superior enterprise integration through Azure Active Directory, hybrid connectivity with Azure Arc, and Visual Studio tooling. AWS Lambda integrates well with AWS Organizations and IAM but requires more setup for enterprise identity management.',
    
    faq5q: 'How do local development experiences compare?',
    faq5a: 'Both offer excellent local development tools. AWS provides SAM CLI and AWS Toolkit for IDEs. Azure offers Azure Functions Core Tools with superior VS Code integration through the Azure Functions extension. Azure\'s tooling feels more integrated for Microsoft-stack developers.',
    
    faq6q: 'What about monitoring and observability?',
    faq6a: 'AWS Lambda uses CloudWatch for logs, metrics, and tracing (X-Ray). Azure Functions uses Application Insights for comprehensive monitoring. Both provide detailed metrics, distributed tracing, and log aggregation. Application Insights offers more built-in analytics capabilities.',
    
    faq7q: 'Can I use both platforms together?',
    faq7a: 'Yes, many enterprises use multi-cloud strategies with both platforms. Use API Management, message queues, or event bridges to connect functions across clouds. Consider latency, data transfer costs, and operational complexity when designing multi-cloud architectures.',
    
    faq8q: 'Which has better free tier?',
    faq8a: 'AWS Lambda offers 1 million free requests and 400,000 GB-seconds per month. Azure Functions offers 1 million free requests and 400,000 GB-seconds on Consumption plan. Both free tiers are generous for development and small workloads. Pricing becomes important at scale.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'AWS Lambda vs Azure Functions：Serverless 计算对比',
    intro: 'AWS Lambda 和 Azure Functions 是两个领先的 serverless 计算平台，让开发者无需管理基础设施即可运行代码。两者都提供事件驱动执行、自动扩展和按使用量计费。本综合比较分析它们的功能、性能、定价和理想用例，帮助您选择合适的平台。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '选择 AWS Lambda 以获得更深入的 AWS 生态集成、更长的实践历史和成熟的工具。选择 Azure Functions 以获得无缝的 Microsoft/Azure 集成、灵活的托管选项和卓越的企业 Active Directory 支持。两者都擅长事件驱动工作负载，核心能力相似。',
    
    takeawaysTitle: '核心要点',
    takeaway1: '两者都支持多种语言（Node.js、Python、Java、C#、Go 等）',
    takeaway2: 'AWS Lambda 最大执行时间为 15 分钟；Azure Functions 提供长达 60 分钟',
    takeaway3: 'Azure Functions 提供灵活托管：消费、高级和专用计划',
    takeaway4: 'AWS Lambda 与 200+ AWS 服务深度集成',
    takeaway5: 'Azure Functions 具有卓越的 Visual Studio 和 VS Code 集成',
    takeaway6: '冷启动性能因语言和配置而异',
    
    whatIsLambdaTitle: '什么是 AWS Lambda？',
    whatIsLambdaContent: 'AWS Lambda 是亚马逊于 2014 年推出的 serverless 计算服务。它响应来自 S3、DynamoDB、Kinesis、SNS 和 API Gateway 等 AWS 服务的事件运行代码。Lambda 自动管理计算资源，从每秒几次请求扩展到数千次，仅按执行时间收费。它支持 Node.js、Python、Java、Go、.NET、Ruby 和自定义运行时。',
    
    whatIsAzureFunctionsTitle: '什么是 Azure Functions？',
    whatIsAzureFunctionsContent: 'Azure Functions 是微软于 2016 年推出的 serverless 计算平台。它支持由 Azure 服务、HTTP 请求、定时器和第三方服务触发的事件驱动代码执行。Azure Functions 提供灵活的托管选项，包括消费、高级和专用计划。它与 Visual Studio、VS Code 和 Azure DevOps 无缝集成。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心 serverless 能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '函数示例',
    codeExampleIntro: '两个平台的代码示例：',
    
    lambdaExampleTitle: 'AWS Lambda 函数',
    azureExampleTitle: 'Azure Function',
    
    pricingTitle: '定价对比',
    pricingIntro: '了解成本结构：',
    
    triggersTitle: '触发器支持',
    triggersIntro: '事件源和触发器：',
    
    useCasesTitle: '最佳用例',
    lambdaBestFor: 'AWS Lambda 最适合：',
    azureBestFor: 'Azure Functions 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'AWS Lambda 和 Azure Functions 都是优秀的 serverless 平台，具有相似的核心能力。如果您已投入 AWS 生态系统、需要与 AWS 服务深度集成或更喜欢成熟的平台，选择 AWS Lambda。如果您使用 Microsoft 技术、需要灵活的托管选项或需要企业 Active Directory 集成，选择 Azure Functions。许多组织根据其云策略在不同工作负载上使用两个平台。',
    
    faq1q: '哪个平台的冷启动性能更好？',
    faq1a: '冷启动性能因运行时、内存分配和平台优化而异。AWS Lambda 对 Node.js 和 Python 通常有更快的冷启动。Azure Functions 高级计划提供预温实例以消除冷启动。两个平台通过预置并发功能都有显著改进。',
    
    faq2q: '我可以在两个平台上运行 Docker 容器吗？',
    faq2a: '是的。AWS Lambda 通过 Lambda Container Images 支持高达 10GB 的容器镜像。Azure Functions 在高级和专用计划上支持容器化函数，Azure Container Apps 用于更复杂的场景。两者都允许通过容器使用自定义运行时。',
    
    faq3q: '它们在长时间运行任务方面如何比较？',
    faq3a: 'AWS Lambda 最大执行时间为 15 分钟。Azure Functions 消费计划允许最长 10 分钟（默认 5 分钟），高级计划最长 60 分钟，专用计划无限制。对于更长的任务，考虑 AWS Step Functions 或 Azure Durable Functions。',
    
    faq4q: '哪个更适合企业集成？',
    faq4a: 'Azure Functions 通过 Azure Active Directory、Azure Arc 混合连接和 Visual Studio 工具具有卓越的企业集成。AWS Lambda 与 AWS Organizations 和 IAM 集成良好，但企业身份管理需要更多设置。',
    
    faq5q: '本地开发体验如何比较？',
    faq5a: '两者都提供出色的本地开发工具。AWS 提供 SAM CLI 和 IDE 的 AWS Toolkit。Azure 提供 Azure Functions Core Tools，通过 Azure Functions 扩展具有卓越的 VS Code 集成。对于 Microsoft 技术栈开发者，Azure 的工具感觉更集成。',
    
    faq6q: '监控和可观测性如何？',
    faq6a: 'AWS Lambda 使用 CloudWatch 进行日志、指标和追踪（X-Ray）。Azure Functions 使用 Application Insights 进行全面监控。两者都提供详细的指标、分布式追踪和日志聚合。Application Insights 提供更多内置分析能力。',
    
    faq7q: '我可以同时使用两个平台吗？',
    faq7a: '是的，许多企业使用多云策略同时使用两个平台。使用 API 管理、消息队列或事件桥接来连接跨云函数。在设计多云架构时考虑延迟、数据传输成本和运营复杂性。',
    
    faq8q: '哪个免费层更好？',
    faq8a: 'AWS Lambda 每月提供 100 万次免费请求和 400,000 GB-秒。Azure Functions 在消费计划上每月提供 100 万次免费请求和 400,000 GB-秒。两个免费层对于开发和小型工作负载都很慷慨。规模扩大时定价变得重要。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function AwsLambdaVsAzureFunctions({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsLambdaTitle}</h3>
      <p style={pStyle}>{ct.whatIsLambdaContent}</p>

      <h3 style={h3Style}>{ct.whatIsAzureFunctionsTitle}</h3>
      <p style={pStyle}>{ct.whatIsAzureFunctionsContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>AWS Lambda</th>
              <th style={thStyle}>Azure Functions</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '最大执行时间' : 'Max Execution Time', '15 minutes', '60 minutes (Premium)'],
              [isZh ? '内存配置' : 'Memory Config', '128 MB - 10 GB', '128 MB - 14 GB'],
              [isZh ? '冷启动' : 'Cold Start', isZh ? '优化中' : 'Optimized', isZh ? '可预热' : 'Pre-warmed (Premium)'],
              [isZh ? '部署包大小' : 'Deployment Size', '250 MB (50 GB container)', '250 MB (1536 MB Premium)'],
              [isZh ? '并发执行' : 'Concurrent Executions', '1,000 (adjustable)', '1,000 (adjustable)'],
              [isZh ? 'VPC 支持' : 'VPC Support', isZh ? '原生' : 'Native', isZh ? 'VNet 集成' : 'VNet Integration'],
              [isZh ? '语言支持' : 'Language Support', '8+ languages', '7+ languages'],
              [isZh ? '容器支持' : 'Container Support', '10 GB image', 'Premium/Dedicated'],
            ].map(([feature, aws, azure], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{aws}</td>
                <td style={tdStyle}>{azure}</td>
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
              <th style={thStyle}>AWS Lambda</th>
              <th style={thStyle}>Azure Functions</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '版本控制' : 'Versioning', isZh ? '内置' : 'Built-in', isZh ? '部署槽' : 'Deployment Slots'],
              [isZh ? '层/共享代码' : 'Layers/Shared Code', isZh ? 'Lambda Layers' : 'Lambda Layers', isZh ? 'NuGet/引用' : 'NuGet/References'],
              [isZh ? '本地开发' : 'Local Development', 'SAM CLI', 'Core Tools + VS Code'],
              [isZh ? 'CI/CD' : 'CI/CD', 'CodePipeline, GitHub', 'Azure DevOps, GitHub'],
              [isZh ? '监控' : 'Monitoring', 'CloudWatch, X-Ray', 'Application Insights'],
              [isZh ? '身份认证' : 'Authentication', 'Cognito, IAM', 'Azure AD, Easy Auth'],
              [isZh ? '状态管理' : 'State Management', 'Step Functions', 'Durable Functions'],
              [isZh ? '预留容量' : 'Reserved Capacity', 'Provisioned Concurrency', 'Premium Plan'],
            ].map(([cap, aws, azure], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{aws}</td>
                <td style={tdStyle}>{azure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f46800' }}>{ct.lambdaExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// AWS Lambda - Node.js Handler
exports.handler = async (event, context) => {
  // Parse incoming event
  const { httpMethod, body, queryStringParameters } = event;
  
  // Log to CloudWatch
  console.log('Received event:', JSON.stringify(event, null, 2));
  
  // Process request
  let response;
  try {
    const data = JSON.parse(body || '{}');
    
    // Business logic here
    const result = await processData(data);
    
    response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        data: result,
        requestId: context.awsRequestId
      })
    };
  } catch (error) {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
  
  return response;
};

// Using with DynamoDB
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

async function processData(data) {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    }
  };
  
  await dynamo.put(params).promise();
  return params.Item;
}

// SAM template.yaml for deployment
/*
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Resources:
  MyFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: src/
      Handler: app.handler
      Runtime: nodejs18.x
      Events:
        ApiEvent:
          Type: HttpApi
          Properties:
            Path: /api
            Method: post
      Environment:
        Variables:
          TABLE_NAME: !Ref MyTable
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref MyTable
*/`}</code></pre>

      <h3 style={{ ...h3Style, color: '#00bfb3' }}>{ct.azureExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Azure Function - Node.js (v4 programming model)
const { app } = require('@azure/functions');
const { TableClient } = require('@azure/data-tables');

app.http('processData', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log('Processing request...');
    
    try {
      const body = await request.json();
      
      // Business logic here
      const result = await saveToTable(body);
      
      return {
        status: 200,
        jsonBody: {
          success: true,
          data: result
        },
        headers: {
          'Content-Type': 'application/json'
        }
      };
    } catch (error) {
      return {
        status: 500,
        jsonBody: {
          success: false,
          error: error.message
        }
      };
    }
  }
});

// Using Azure Table Storage
async function saveToTable(data) {
  const tableClient = TableClient.fromConnectionString(
    process.env.AzureWebJobsStorage,
    'MyTable'
  );
  
  const entity = {
    partitionKey: 'data',
    rowKey: Date.now().toString(),
    ...data
  };
  
  await tableClient.createEntity(entity);
  return entity;
}

// host.json configuration
/*
{
  "version": "2.0",
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "excludedTypes": "Request"
      }
    }
  },
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle",
    "version": "[4.*, 5.0.0)"
  }
}
*/

// local.settings.json
/*
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  }
}
*/`}</code></pre>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '定价项' : 'Pricing Aspect'}</th>
              <th style={thStyle}>AWS Lambda</th>
              <th style={thStyle}>Azure Functions</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费层' : 'Free Tier', '1M requests + 400K GB-s', '1M requests + 400K GB-s'],
              [isZh ? '请求费用' : 'Request Cost', '$0.20 per 1M requests', '$0.20 per 1M requests'],
              [isZh ? '计算费用' : 'Compute Cost', '$0.0000166667/GB-s', '$0.000016/GB-s'],
              [isZh ? '预留容量' : 'Reserved Capacity', '$0.015/GB-hour', 'Premium: ~$150/month'],
              [isZh ? '最小计费单位' : 'Billing Granularity', '1 ms', '1 ms'],
              [isZh ? '存储费用' : 'Storage', 'EBS + S3', 'Azure Storage'],
            ].map(([aspect, aws, azure], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={tdStyle}>{aws}</td>
                <td style={tdStyle}>{azure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.triggersTitle}</h2>
      <p style={pStyle}>{ct.triggersIntro}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f46800' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f46800' }}>AWS Lambda Triggers</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>API Gateway</li>
            <li>S3 (object events)</li>
            <li>DynamoDB Streams</li>
            <li>Kinesis Streams</li>
            <li>SNS / SQS</li>
            <li>EventBridge</li>
            <li>CloudWatch Events</li>
            <li>ALB / Lambda@Edge</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #00bfb3' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#00bfb3' }}>Azure Functions Triggers</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>HTTP / API Management</li>
            <li>Blob Storage</li>
            <li>Cosmos DB</li>
            <li>Event Hubs</li>
            <li>Service Bus / Queue</li>
            <li>Event Grid</li>
            <li>Timer / Schedule</li>
            <li>SignalR / Webhooks</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f46800' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f46800' }}>{ct.lambdaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'AWS 生态系统原生应用' : 'AWS-native applications'}</li>
            <li>{isZh ? 'API 后端和微服务' : 'API backends and microservices'}</li>
            <li>{isZh ? '实时数据处理' : 'Real-time data processing'}</li>
            <li>{isZh ? '文件处理管道' : 'File processing pipelines'}</li>
            <li>{isZh ? '聊天机器人和 Alexa 技能' : 'Chatbots and Alexa skills'}</li>
            <li>{isZh ? '计划任务' : 'Scheduled tasks'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #00bfb3' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#00bfb3' }}>{ct.azureBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Microsoft 技术栈集成' : 'Microsoft stack integration'}</li>
            <li>{isZh ? '企业 Active Directory 应用' : 'Enterprise AD applications'}</li>
            <li>{isZh ? '混合云场景' : 'Hybrid cloud scenarios'}</li>
            <li>{isZh ? 'Dynamics 365 / Office 365 集成' : 'Dynamics 365 / Office 365 integration'}</li>
            <li>{isZh ? 'IoT 数据处理' : 'IoT data processing'}</li>
            <li>{isZh ? '长时间运行工作流' : 'Long-running workflows'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={"/" + lang + "/tools/jwt-decoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
