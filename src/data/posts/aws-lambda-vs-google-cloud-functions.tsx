'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'AWS Lambda vs Google Cloud Functions: Serverless Showdown',
    intro: 'AWS Lambda and Google Cloud Functions are two major serverless platforms that revolutionized cloud computing. Both offer event-driven, auto-scaling compute without infrastructure management. This comparison analyzes their features, performance characteristics, pricing models, and ecosystem integrations to help you make an informed decision.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose AWS Lambda for mature ecosystem, deeper AWS integration, and enterprise features. Choose Google Cloud Functions for simpler pricing, superior build experience, and tight GCP/GKE integration. Lambda has more features and longer track record; Cloud Functions offers faster deployments and cleaner developer experience.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'AWS Lambda supports more languages and runtimes than Google Cloud Functions',
    takeaway2: 'Google Cloud Functions offers simpler, more transparent pricing',
    takeaway3: 'Lambda has 15-minute timeout; Cloud Functions has 9-60 minutes depending on version',
    takeaway4: 'Both support container images for custom runtimes',
    takeaway5: 'Cloud Functions integrates seamlessly with Firebase and GKE',
    takeaway6: 'Lambda has more extensive trigger options and AWS service integrations',
    
    whatIsLambdaTitle: 'What is AWS Lambda?',
    whatIsLambdaContent: 'AWS Lambda, launched in 2014, pioneered the serverless computing paradigm. It executes code in response to triggers from over 200 AWS services, automatically scaling from a few requests to thousands per second. Lambda supports Node.js, Python, Java, Go, .NET, Ruby, PowerShell, and custom runtimes via container images.',
    
    whatIsGcfTitle: 'What is Google Cloud Functions?',
    whatIsGcfContent: 'Google Cloud Functions, launched in 2017, is Google Cloud\'s event-driven serverless platform. It provides a simpler, more streamlined experience compared to Lambda, with tight integration to Google Cloud services like Pub/Sub, Cloud Storage, Firestore, and Firebase. It supports Node.js, Python, Go, Java, .NET, Ruby, and PHP.',
    
    performanceTitle: 'Core Comparison',
    performanceIntro: 'Comparing fundamental capabilities:',
    
    featuresTitle: 'Feature Matrix',
    featuresIntro: 'Detailed feature comparison:',
    
    codeExampleTitle: 'Function Examples',
    codeExampleIntro: 'Code samples for both platforms:',
    
    lambdaExampleTitle: 'AWS Lambda Function',
    gcfExampleTitle: 'Google Cloud Function',
    
    pricingTitle: 'Pricing Analysis',
    pricingIntro: 'Understanding the cost structure:',
    
    triggersTitle: 'Event Triggers',
    triggersIntro: 'Trigger and binding support:',
    
    useCasesTitle: 'Best Use Cases',
    lambdaBestFor: 'AWS Lambda is Best For:',
    gcfBestFor: 'Google Cloud Functions is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'AWS Lambda and Google Cloud Functions both deliver excellent serverless experiences with different strengths. Choose AWS Lambda for mature features, extensive AWS ecosystem integration, and enterprise workloads requiring advanced capabilities. Choose Google Cloud Functions for simpler operations, faster iteration cycles, Firebase integration, and GCP-native applications. Many organizations adopt multi-cloud strategies using both platforms for different use cases.',
    
    faq1q: 'Which platform has better cold start performance?',
    faq1a: 'Cold start performance varies by runtime, memory allocation, and platform version. Google Cloud Functions (2nd gen) generally shows competitive cold start times with Cloud Run infrastructure. AWS Lambda offers Provisioned Concurrency to eliminate cold starts entirely. For latency-sensitive applications, both platforms require tuning and optimization.',
    
    faq2q: 'Can I migrate functions between platforms?',
    faq2a: 'Basic functions can be migrated with code changes, but triggers, bindings, and service integrations require significant refactoring. Consider using abstraction layers or frameworks like Serverless Framework to reduce vendor lock-in and simplify multi-cloud deployments.',
    
    faq3q: 'How do build and deployment compare?',
    faq3a: 'AWS Lambda offers multiple deployment methods including zip uploads, container images, and SAM/CDK. Google Cloud Functions provides simpler build experience with Cloud Build integration and source-based deployments. GCF deployments are typically faster, while Lambda offers more deployment options.',
    
    faq4q: 'What about security and compliance?',
    faq4a: 'Both platforms offer enterprise-grade security. AWS Lambda integrates with IAM, supports VPC, and has numerous compliance certifications. Google Cloud Functions integrates with Cloud IAM, supports VPC Service Controls, and meets major compliance standards. Choice depends on your existing security infrastructure.',
    
    faq5q: 'How do they handle long-running processes?',
    faq5a: 'AWS Lambda has a 15-minute maximum timeout. Google Cloud Functions 1st gen has 9 minutes, while 2nd gen supports up to 60 minutes. For longer processes, use AWS Step Functions or Google Cloud Workflows to orchestrate multiple function invocations.',
    
    faq6q: 'Which has better Firebase integration?',
    faq6a: 'Google Cloud Functions has superior Firebase integration with direct triggers for Firestore, Realtime Database, Authentication, and Analytics. AWS Lambda can work with Firebase via HTTP triggers or EventBridge but requires more setup and doesn\'t offer native Firebase triggers.',
    
    faq7q: 'How do local development experiences compare?',
    faq7a: 'AWS offers SAM CLI for local Lambda development and testing. Google provides Functions Framework for local development. Both integrate with major IDEs. AWS has more comprehensive tooling, while Google offers a simpler, more streamlined experience.',
    
    faq8q: 'What about monitoring and debugging?',
    faq8a: 'AWS Lambda uses CloudWatch for logs and X-Ray for tracing. Google Cloud Functions uses Cloud Logging and Cloud Trace. Both provide comprehensive monitoring. Google\'s tools are more integrated, while AWS offers more granular control and customization.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'AWS Lambda vs Google Cloud Functions：Serverless 对决',
    intro: 'AWS Lambda 和 Google Cloud Functions 是两个革命性的 serverless 平台。两者都提供事件驱动、自动扩展的计算能力，无需管理基础设施。本比较分析它们的功能、性能特点、定价模型和生态系统集成，帮助您做出明智的决定。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '选择 AWS Lambda 以获得成熟的生态系统、更深入的 AWS 集成和企业功能。选择 Google Cloud Functions 以获得更简单的定价、卓越的构建体验和紧密的 GCP/GKE 集成。Lambda 有更多功能和更长的实践历史；Cloud Functions 提供更快的部署和更清晰的开发者体验。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'AWS Lambda 比 Google Cloud Functions 支持更多语言和运行时',
    takeaway2: 'Google Cloud Functions 提供更简单、更透明的定价',
    takeaway3: 'Lambda 超时为 15 分钟；Cloud Functions 根据版本为 9-60 分钟',
    takeaway4: '两者都支持容器镜像用于自定义运行时',
    takeaway5: 'Cloud Functions 与 Firebase 和 GKE 无缝集成',
    takeaway6: 'Lambda 有更广泛的触发器选项和 AWS 服务集成',
    
    whatIsLambdaTitle: '什么是 AWS Lambda？',
    whatIsLambdaContent: 'AWS Lambda 于 2014 年推出，开创了 serverless 计算范式。它响应来自 200 多个 AWS 服务的触发器执行代码，自动从每秒几次请求扩展到数千次。Lambda 支持 Node.js、Python、Java、Go、.NET、Ruby、PowerShell 和通过容器镜像的自定义运行时。',
    
    whatIsGcfTitle: '什么是 Google Cloud Functions？',
    whatIsGcfContent: 'Google Cloud Functions 于 2017 年推出，是 Google Cloud 的事件驱动 serverless 平台。与 Lambda 相比，它提供更简单、更精简的体验，与 Pub/Sub、Cloud Storage、Firestore 和 Firebase 等 Google Cloud 服务紧密集成。它支持 Node.js、Python、Go、Java、.NET、Ruby 和 PHP。',
    
    performanceTitle: '核心对比',
    performanceIntro: '比较基本能力：',
    
    featuresTitle: '功能矩阵',
    featuresIntro: '详细功能比较：',
    
    codeExampleTitle: '函数示例',
    codeExampleIntro: '两个平台的代码示例：',
    
    lambdaExampleTitle: 'AWS Lambda 函数',
    gcfExampleTitle: 'Google Cloud Function',
    
    pricingTitle: '定价分析',
    pricingIntro: '了解成本结构：',
    
    triggersTitle: '事件触发器',
    triggersIntro: '触发器和绑定支持：',
    
    useCasesTitle: '最佳用例',
    lambdaBestFor: 'AWS Lambda 最适合：',
    gcfBestFor: 'Google Cloud Functions 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'AWS Lambda 和 Google Cloud Functions 都提供出色的 serverless 体验，各有优势。选择 AWS Lambda 以获得成熟的功能、广泛的 AWS 生态系统集成和需要高级能力的企业工作负载。选择 Google Cloud Functions 以获得更简单的操作、更快的迭代周期、Firebase 集成和 GCP 原生应用。许多组织采用多云策略，在不同用例中使用两个平台。',
    
    faq1q: '哪个平台的冷启动性能更好？',
    faq1a: '冷启动性能因运行时、内存分配和平台版本而异。Google Cloud Functions（第 2 代）通常在 Cloud Run 基础设施上显示出有竞争力的冷启动时间。AWS Lambda 提供预置并发以完全消除冷启动。对于延迟敏感的应用，两个平台都需要调优和优化。',
    
    faq2q: '我可以在平台之间迁移函数吗？',
    faq2a: '基本函数可以通过代码更改迁移，但触发器、绑定和服务集成需要大量重构。考虑使用抽象层或 Serverless Framework 等框架来减少供应商锁定并简化多云部署。',
    
    faq3q: '构建和部署如何比较？',
    faq3a: 'AWS Lambda 提供多种部署方法，包括 zip 上传、容器镜像和 SAM/CDK。Google Cloud Functions 通过 Cloud Build 集成和基于源的部署提供更简单的构建体验。GCF 部署通常更快，而 Lambda 提供更多部署选项。',
    
    faq4q: '安全和合规性如何？',
    faq4a: '两个平台都提供企业级安全。AWS Lambda 与 IAM 集成，支持 VPC，拥有众多合规认证。Google Cloud Functions 与 Cloud IAM 集成，支持 VPC Service Controls，符合主要合规标准。选择取决于您现有的安全基础设施。',
    
    faq5q: '它们如何处理长时间运行的进程？',
    faq5a: 'AWS Lambda 最大超时为 15 分钟。Google Cloud Functions 第 1 代为 9 分钟，第 2 代支持最长 60 分钟。对于更长的进程，使用 AWS Step Functions 或 Google Cloud Workflows 来编排多个函数调用。',
    
    faq6q: '哪个有更好的 Firebase 集成？',
    faq6a: 'Google Cloud Functions 具有卓越的 Firebase 集成，可直接触发 Firestore、Realtime Database、Authentication 和 Analytics。AWS Lambda 可以通过 HTTP 触发器或 EventBridge 与 Firebase 配合使用，但需要更多设置，不提供原生 Firebase 触发器。',
    
    faq7q: '本地开发体验如何比较？',
    faq7a: 'AWS 提供 SAM CLI 用于本地 Lambda 开发和测试。Google 提供 Functions Framework 用于本地开发。两者都与主要 IDE 集成。AWS 有更全面的工具，而 Google 提供更简单、更精简的体验。',
    
    faq8q: '监控和调试如何？',
    faq8a: 'AWS Lambda 使用 CloudWatch 进行日志记录和 X-Ray 进行追踪。Google Cloud Functions 使用 Cloud Logging 和 Cloud Trace。两者都提供全面的监控。Google 的工具更集成，而 AWS 提供更细粒度的控制和自定义。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function AwsLambdaVsGoogleCloudFunctions({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsGcfTitle}</h3>
      <p style={pStyle}>{ct.whatIsGcfContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>AWS Lambda</th>
              <th style={thStyle}>Cloud Functions</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '最大执行时间' : 'Max Timeout', '15 minutes', '9 min (1st) / 60 min (2nd)'],
              [isZh ? '内存范围' : 'Memory Range', '128 MB - 10 GB', '128 MB - 32 GB'],
              [isZh ? '语言支持' : 'Languages', '8+ runtimes', '7 runtimes'],
              [isZh ? '容器支持' : 'Container Support', 'Up to 10 GB', 'Up to 32 GB (2nd gen)'],
              [isZh ? '并发限制' : 'Concurrency Limit', '1,000 (adjustable)', '1,000 (adjustable)'],
              [isZh ? '冷启动优化' : 'Cold Start Opt', 'Provisioned Concurrency', 'Min Instances (2nd gen)'],
              [isZh ? '发布年份' : 'Launch Year', '2014', '2017'],
              [isZh ? 'VPC/网络' : 'VPC/Networking', isZh ? '原生 VPC' : 'Native VPC', isZh ? 'VPC 连接器' : 'VPC Connector'],
            ].map(([feature, aws, gcp], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{aws}</td>
                <td style={tdStyle}>{gcp}</td>
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
              <th style={thStyle}>Cloud Functions</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '版本/别名' : 'Versions/Aliases', isZh ? '完整支持' : 'Full support', isZh ? '第 2 代支持' : '2nd gen support'],
              [isZh ? '层/依赖' : 'Layers/Dependencies', isZh ? 'Lambda Layers' : 'Lambda Layers', isZh ? '内置构建' : 'Built-in build'],
              [isZh ? '源码控制' : 'Source Control', 'CodeCommit, GitHub', 'Cloud Source Repos'],
              [isZh ? 'CI/CD' : 'CI/CD', 'CodePipeline', 'Cloud Build'],
              [isZh ? '调试' : 'Debugging', 'X-Ray', 'Cloud Trace'],
              [isZh ? '日志' : 'Logging', 'CloudWatch', 'Cloud Logging'],
              [isZh ? '密钥管理' : 'Secrets', 'Secrets Manager', 'Secret Manager'],
              [isZh ? '框架支持' : 'Frameworks', 'SAM, CDK, Serverless', 'Serverless, Terraform'],
            ].map(([cap, aws, gcp], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{aws}</td>
                <td style={tdStyle}>{gcp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f46800' }}>{ct.lambdaExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// AWS Lambda - Python Handler
import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

def lambda_handler(event, context):
    """
    Lambda handler for processing API requests
    """
    # Log incoming event
    print(f"Received event: {json.dumps(event)}")
    
    http_method = event.get('httpMethod', 'GET')
    
    if http_method == 'GET':
        return handle_get(event)
    elif http_method == 'POST':
        return handle_post(event)
    else:
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'Method not allowed'})
        }

def handle_get(event):
    """Handle GET requests"""
    try:
        item_id = event['queryStringParameters'].get('id')
        response = table.get_item(Key={'id': item_id})
        
        if 'Item' in response:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(response['Item'])
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'Item not found'})
            }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

def handle_post(event):
    """Handle POST requests"""
    try:
        body = json.loads(event['body'])
        body['id'] = str(uuid.uuid4())
        body['createdAt'] = datetime.now().isoformat()
        
        table.put_item(Item=body)
        
        return {
            'statusCode': 201,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps(body)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

# CloudFormation template snippet
/*
Resources:
  MyFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: my-api-function
      Runtime: python3.11
      Handler: index.lambda_handler
      Code:
        S3Bucket: my-bucket
        S3Key: function.zip
      Role: !GetAtt FunctionRole.Arn
      Environment:
        Variables:
          TABLE_NAME: !Ref MyTable
      MemorySize: 256
      Timeout: 30
*/`}</code></pre>

      <h3 style={{ ...h3Style, color: '#4285f4' }}>{ct.gcfExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Google Cloud Functions (2nd gen) - Node.js
const functions = require('@google-cloud/functions-framework');
const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore();
const collection = firestore.collection('items');

// HTTP function
functions.http('apiHandler', async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).send('');
    return;
  }
  
  console.log('Received request:', req.method, req.path);
  
  try {
    if (req.method === 'GET') {
      await handleGet(req, res);
    } else if (req.method === 'POST') {
      await handlePost(req, res);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

async function handleGet(req, res) {
  const id = req.query.id;
  
  if (!id) {
    // List all items
    const snapshot = await collection.limit(100).get();
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(items);
    return;
  }
  
  const doc = await collection.doc(id).get();
  
  if (doc.exists) {
    res.json({ id: doc.id, ...doc.data() });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
}

async function handlePost(req, res) {
  const data = req.body;
  data.createdAt = new Date().toISOString();
  
  const docRef = await collection.add(data);
  const doc = await docRef.get();
  
  res.status(201).json({
    id: doc.id,
    ...doc.data()
  });
}

// CloudEvent function (for Pub/Sub, Storage triggers)
functions.cloudEvent('processEvent', async (cloudEvent) => {
  console.log('Received event:', cloudEvent.type);
  
  const data = cloudEvent.data;
  // Process the event...
  
  return { success: true };
});

// Deploy with gcloud
// gcloud functions deploy apiHandler \\
//   --gen2 \\
//   --runtime=nodejs18 \\
//   --region=us-central1 \\
//   --source=. \\
//   --entry-point=apiHandler \\
//   --trigger-http \\
//   --allow-unauthenticated`}</code></pre>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '定价项' : 'Pricing'}</th>
              <th style={thStyle}>AWS Lambda</th>
              <th style={thStyle}>Cloud Functions</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费层请求' : 'Free Tier Requests', '1M/month', '2M/month'],
              [isZh ? '免费层计算' : 'Free Tier Compute', '400K GB-s', '400K GB-s'],
              [isZh ? '请求费用' : 'Request Cost', '$0.20/1M', '$0.10/1M (1st), $0.40/1M (2nd)'],
              [isZh ? '计算费用' : 'Compute Cost', '$0.0000166667/GB-s', '$0.0000165/GB-s'],
              [isZh ? '最小计费' : 'Min Billing', '1 ms', '1 ms'],
              [isZh ? '闲置费用' : 'Idle Cost', 'Provisioned: $0.015/GB-hr', 'Min instances: varies'],
            ].map(([pricing, aws, gcp], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{pricing}</td>
                <td style={tdStyle}>{aws}</td>
                <td style={tdStyle}>{gcp}</td>
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
            <li>API Gateway / HTTP API</li>
            <li>S3 (object events)</li>
            <li>DynamoDB Streams</li>
            <li>Kinesis Data Streams</li>
            <li>SQS / SNS</li>
            <li>EventBridge</li>
            <li>CloudWatch Logs/Events</li>
            <li>Cognito / Alexa Skills</li>
            <li>ALB / CloudFront</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #4285f4' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#4285f4' }}>Cloud Functions Triggers</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>HTTP / HTTPS</li>
            <li>Cloud Storage</li>
            <li>Pub/Sub</li>
            <li>Firestore</li>
            <li>Cloud Scheduler</li>
            <li>Eventarc</li>
            <li>Firebase (Auth, Analytics)</li>
            <li>Cloud Tasks</li>
            <li>Cloud Audit Logs</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f46800' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f46800' }}>{ct.lambdaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'AWS 生态系统深度集成' : 'Deep AWS ecosystem integration'}</li>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '复杂事件处理' : 'Complex event processing'}</li>
            <li>{isZh ? '微服务后端' : 'Microservice backends'}</li>
            <li>{isZh ? '数据处理管道' : 'Data processing pipelines'}</li>
            <li>{isZh ? 'Alexa 技能和聊天机器人' : 'Alexa skills and chatbots'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #4285f4' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#4285f4' }}>{ct.gcfBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Firebase 应用' : 'Firebase applications'}</li>
            <li>{isZh ? 'GCP 原生服务' : 'GCP-native services'}</li>
            <li>{isZh ? '移动应用后端' : 'Mobile app backends'}</li>
            <li>{isZh ? '实时通知' : 'Real-time notifications'}</li>
            <li>{isZh ? 'GKE/Kubernetes 集成' : 'GKE/Kubernetes integration'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={"/" + lang + "/tools/hash-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a>
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
