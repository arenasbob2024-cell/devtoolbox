'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Vault vs AWS Secrets Manager: Secrets Management Comparison',
    intro: 'HashiCorp Vault and AWS Secrets Manager are leading solutions for secrets management and protection. Vault is a comprehensive open-source secrets management tool with advanced features, while AWS Secrets Manager is a managed AWS service tightly integrated with the AWS ecosystem. This comparison examines their capabilities, integration patterns, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Vault for multi-cloud environments, advanced secrets management features, and maximum control over your secrets infrastructure. Choose AWS Secrets Manager for AWS-centric workloads, ease of use, and when you want a fully managed service without operational overhead.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Vault is open-source with enterprise features; AWS Secrets Manager is fully managed',
    takeaway2: 'Vault supports multi-cloud and hybrid environments',
    takeaway3: 'AWS Secrets Manager has native AWS service integration',
    takeaway4: 'Vault offers more secrets engines and advanced features',
    takeaway5: 'AWS Secrets Manager has simpler pricing for AWS workloads',
    takeaway6: 'Vault provides more granular access control and audit logging',
    
    whatIsVaultTitle: 'What is HashiCorp Vault?',
    whatIsVaultContent: 'Vault is an open-source secrets management tool developed by HashiCorp. It provides a unified interface to secrets, encryption as a service, and fine-grained access control. Vault supports multiple secrets engines (KV, database credentials, PKI, transit encryption) and authentication methods. It can be self-hosted or used as a managed cloud service.',
    
    whatIsAWSTitle: 'What is AWS Secrets Manager?',
    whatIsAWSTitleContent: 'AWS Secrets Manager is a fully managed AWS service for secrets management. It helps you protect access to applications, services, and IT resources without upfront investment or ongoing maintenance. Secrets Manager offers automatic rotation for database credentials, tight integration with AWS services, and pay-per-use pricing.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Secrets management and access patterns:',
    
    vaultExampleTitle: 'Vault Secrets Management',
    awsExampleTitle: 'AWS Secrets Manager Operations',
    
    dataSourceTitle: 'Deployment and Operations',
    dataSourceIntro: 'Deployment models and operational considerations:',
    
    alertingTitle: 'Security and Compliance',
    alertingIntro: 'Security features and compliance capabilities:',
    
    useCasesTitle: 'Best Use Cases',
    vaultBestFor: 'Vault is Best For:',
    awsBestFor: 'AWS Secrets Manager is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Vault and AWS Secrets Manager serve different audiences and use cases. Vault is a comprehensive secrets management platform suitable for multi-cloud, hybrid environments, and organizations needing advanced features like encryption as a service, PKI, and custom secrets engines. AWS Secrets Manager excels in AWS-centric environments where ease of use, native integration, and managed operations are priorities. Your choice depends on your cloud strategy, operational preferences, and feature requirements.',
    
    faq1q: 'Can I use Vault with AWS services?',
    faq1a: 'Yes, Vault integrates well with AWS services. You can authenticate to Vault using IAM roles, use DynamoDB as Vault storage backend, and Vault can generate AWS credentials dynamically. Many organizations use Vault alongside AWS services for comprehensive secrets management.',
    
    faq2q: 'Which is more cost-effective?',
    faq2a: 'For small-scale AWS-only deployments, AWS Secrets Manager is often more cost-effective with its pay-per-use model. For large-scale or multi-cloud environments, Vault can be more economical, especially with the open-source version. Consider total cost of ownership including operations, not just service fees.',
    
    faq3q: 'How do they compare for database credential rotation?',
    faq3a: 'Both support automatic credential rotation. AWS Secrets Manager has built-in rotation for RDS, Aurora, and other AWS databases. Vault supports dynamic database credentials with rotation for many database types. Vault offers more flexibility for non-AWS databases and custom rotation logic.',
    
    faq4q: 'What about compliance and audit?',
    faq4a: 'Both provide audit logging. Vault offers more comprehensive audit trails with detailed access logs, integration with SIEM tools, and fine-grained audit capabilities. AWS Secrets Manager integrates with CloudTrail for AWS-native audit. For strict compliance requirements, Vault provides more control.',
    
    faq5q: 'Can I use both together?',
    faq5a: 'Yes, many organizations use both. Use AWS Secrets Manager for AWS-native secrets and database credentials, while using Vault for advanced secrets management, encryption as a service, and non-AWS environments. This hybrid approach leverages the strengths of both.',
    
    faq6q: 'What about high availability?',
    faq6a: 'AWS Secrets Manager is fully managed with built-in high availability across AWS regions. Vault requires setup for HA using storage backends like Consul or integrated storage. For mission-critical deployments, both can achieve high availability but with different operational models.',
    
    faq7q: 'How complex is migration between them?',
    faq7a: 'Migrating from AWS Secrets Manager to Vault requires exporting secrets and setting up Vault infrastructure. Migrating from Vault to AWS Secrets Manager is simpler for AWS environments but may require feature trade-offs. Both support standard secret formats, but automation helps migration.',
    
    faq8q: 'Which should I choose for Kubernetes?',
    faq8a: 'Both work with Kubernetes. Vault has the External Secrets Operator and CSI driver for Kubernetes integration. AWS Secrets Manager works with AWS EKS through service account IAM roles. For multi-cloud Kubernetes, Vault is more flexible. For EKS-only, AWS Secrets Manager is simpler.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Vault vs AWS Secrets Manager: 密钥管理对比',
    intro: 'HashiCorp Vault和AWS Secrets Manager是密钥管理和保护的领先解决方案。Vault是一个具有高级功能的综合开源密钥管理工具,而AWS Secrets Manager是与AWS生态系统紧密集成的托管AWS服务。本比较考察它们的功能、集成模式和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为多云环境、高级密钥管理功能和对密钥基础设施的最大控制选择Vault。为以AWS为中心的工作负载、易用性和想要完全托管服务而无运维开销选择AWS Secrets Manager。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Vault是具有企业功能的开源;AWS Secrets Manager完全托管',
    takeaway2: 'Vault支持多云和混合环境',
    takeaway3: 'AWS Secrets Manager具有原生AWS服务集成',
    takeaway4: 'Vault提供更多密钥引擎和高级功能',
    takeaway5: 'AWS Secrets Manager对AWS工作负载定价更简单',
    takeaway6: 'Vault提供更细粒度的访问控制和审计日志',
    
    whatIsVaultTitle: '什么是HashiCorp Vault?',
    whatIsVaultContent: 'Vault是由HashiCorp开发的开源密钥管理工具。它提供统一的密钥接口、加密即服务和细粒度访问控制。Vault支持多种密钥引擎(KV、数据库凭据、PKI、传输加密)和认证方法。它可以自托管或用作托管云服务。',
    
    whatIsAWSTitle: '什么是AWS Secrets Manager?',
    whatIsAWSTitleContent: 'AWS Secrets Manager是一个完全托管的AWS密钥管理服务。它帮助你保护对应用程序、服务和IT资源的访问,无需前期投资或持续维护。Secrets Manager为数据库凭据提供自动轮换、与AWS服务紧密集成以及按使用付费定价。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能:',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较:',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '密钥管理和访问模式:',
    
    vaultExampleTitle: 'Vault密钥管理',
    awsExampleTitle: 'AWS Secrets Manager操作',
    
    dataSourceTitle: '部署和运维',
    dataSourceIntro: '部署模型和运维考虑:',
    
    alertingTitle: '安全和合规',
    alertingIntro: '安全功能和合规能力:',
    
    useCasesTitle: '最佳用例',
    vaultBestFor: 'Vault最适合:',
    awsBestFor: 'AWS Secrets Manager最适合:',
    
    conclusionTitle: '结论',
    conclusionContent: 'Vault和AWS Secrets Manager服务于不同的受众和用例。Vault是一个综合的密钥管理平台,适用于多云、混合环境以及需要加密即服务、PKI和自定义密钥引擎等高级功能的组织。AWS Secrets Manager在以AWS为中心的环境中表现出色,其中易用性、原生集成和托管操作是优先事项。你的选择取决于你的云策略、运维偏好和功能需求。',
    
    faq1q: '我可以将Vault与AWS服务一起使用吗?',
    faq1a: '是的,Vault与AWS服务集成良好。你可以使用IAM角色对Vault进行身份验证,使用DynamoDB作为Vault存储后端,Vault可以动态生成AWS凭据。许多组织将Vault与AWS服务一起使用以进行全面密钥管理。',
    
    faq2q: '哪个更具成本效益?',
    faq2a: '对于小规模仅AWS部署,AWS Secrets Manager的按使用付费模式通常更具成本效益。对于大规模或多云环境,Vault可能更经济,特别是开源版本。考虑包括运维在内的总拥有成本,而不仅仅是服务费用。',
    
    faq3q: '它们在数据库凭据轮换方面如何比较?',
    faq3a: '两者都支持自动凭据轮换。AWS Secrets Manager为RDS、Aurora和其他AWS数据库内置轮换。Vault支持多种数据库类型的动态数据库凭据和轮换。Vault为非AWS数据库和自定义轮换逻辑提供更多灵活性。',
    
    faq4q: '合规和审计怎么样?',
    faq4a: '两者都提供审计日志。Vault通过详细访问日志、与SIEM工具集成和细粒度审计功能提供更全面的审计跟踪。AWS Secrets Manager与CloudTrail集成进行AWS原生审计。对于严格的合规要求,Vault提供更多控制。',
    
    faq5q: '我可以同时使用两者吗?',
    faq5a: '是的,许多组织同时使用两者。使用AWS Secrets Manager管理AWS原生密钥和数据库凭据,同时使用Vault进行高级密钥管理、加密即服务和非AWS环境。这种混合方法利用了两者的优势。',
    
    faq6q: '高可用性怎么样?',
    faq6a: 'AWS Secrets Manager完全托管,在AWS区域间内置高可用性。Vault需要使用Consul或集成存储等存储后端设置HA。对于关键任务部署,两者都可以实现高可用性,但具有不同的运维模型。',
    
    faq7q: '在它们之间迁移有多复杂?',
    faq7a: '从AWS Secrets Manager迁移到Vault需要导出密钥并设置Vault基础设施。从Vault迁移到AWS Secrets Manager对AWS环境来说更简单,但可能需要功能权衡。两者都支持标准密钥格式,但自动化有助于迁移。',
    
    faq8q: '我应该为Kubernetes选择哪个?',
    faq8a: '两者都适用于Kubernetes。Vault有External Secrets Operator和CSI驱动程序用于Kubernetes集成。AWS Secrets Manager通过服务账户IAM角色与AWS EKS配合使用。对于多云Kubernetes,Vault更灵活。对于仅EKS,AWS Secrets Manager更简单。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function VaultVsAwsSecretsManager({ lang }: { lang: string }) {
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

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      {/* Key Takeaways */}
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

      {/* Overview */}
      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsVaultTitle}</h3>
      <p style={pStyle}>{ct.whatIsVaultContent}</p>

      <h3 style={h3Style}>{ct.whatIsAWSTitle}</h3>
      <p style={pStyle}>{ct.whatIsAWSTitleContent}</p>

      {/* Comparison Table */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Vault</th>
              <th style={thStyle}>AWS Secrets Manager</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '部署模式' : 'Deployment', isZh ? '自托管/托管' : 'Self-hosted/Managed', isZh ? '完全托管' : 'Fully managed'],
              [isZh ? '云支持' : 'Cloud Support', isZh ? '多云/混合' : 'Multi-cloud/Hybrid', 'AWS only'],
              [isZh ? '密钥引擎' : 'Secrets Engines', '10+ 引擎', isZh ? '键值/数据库' : 'KV/Database'],
              [isZh ? '动态凭据' : 'Dynamic Credentials', isZh ? '广泛支持' : 'Broad support', isZh ? 'AWS服务' : 'AWS services'],
              [isZh ? '自动轮换' : 'Auto Rotation', isZh ? '所有引擎' : 'All engines', isZh ? 'AWS数据库' : 'AWS databases'],
              [isZh ? '加密即服务' : 'Encryption Service', 'Transit Engine', isZh ? '无' : 'None'],
              [isZh ? 'PKI/证书' : 'PKI/Certificates', 'PKI Engine', isZh ? 'ACM集成' : 'ACM integration'],
              [isZh ? '访问控制' : 'Access Control', isZh ? '细粒度策略' : 'Fine-grained policies', 'IAM policies'],
            ].map(([feature, vault, aws], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{vault}</td>
                <td style={tdStyle}>{aws}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>Vault</th>
              <th style={thStyle}>AWS Secrets Manager</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '认证方法' : 'Auth Methods', 'Token, AppRole, OIDC, K8s, AWS...', 'IAM roles'],
              [isZh ? '审计日志' : 'Audit Logs', isZh ? '多种后端' : 'Multiple backends', 'CloudTrail'],
              [isZh ? '版本控制' : 'Versioning', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '复制' : 'Replication', isZh ? '多区域/性能复制' : 'Multi-region/Performance', isZh ? '区域复制' : 'Regional replication'],
              [isZh ? '密钥导入' : 'Secret Import', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? 'CLI/API' : 'CLI/API', 'Vault CLI, REST API', 'AWS CLI, SDK, API'],
              [isZh ? 'Web UI' : 'Web UI', isZh ? '内置' : 'Built-in', 'AWS Console'],
              [isZh ? '定价' : 'Pricing', isZh ? '开源/企业' : 'Open-source/Enterprise', isZh ? '按使用付费' : 'Pay-per-use'],
            ].map(([cap, vault, aws], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{vault}</td>
                <td style={tdStyle}>{aws}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#ffec3e' }}>{ct.vaultExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Vault Secrets Management Commands

# Enable KV secrets engine (version 2)
vault secrets enable -path=secret kv-v2

# Store a secret
vault kv put secret/myapp/config \\
  username=admin \\
  password=supersecret \\
  db_host=db.example.com \\
  db_port=5432

# Retrieve a secret
vault kv get secret/myapp/config
# Output shows all key-value pairs

# Get specific field
vault kv get -field=password secret/myapp/config

# Enable database secrets engine
vault secrets enable database

# Configure PostgreSQL dynamic credentials
vault write database/config/postgresql \\
  plugin_name=postgresql-database-plugin \\
  allowed_roles="readonly,readwrite" \\
  connection_url="postgresql://{{username}}:{{password}}@db:5432/mydb?sslmode=disable" \\
  username="vaultadmin" \\
  password="vaultpass"

# Create a role for dynamic credentials
vault write database/roles/readonly \\
  db_name=postgresql \\
  creation_statements="CREATE ROLE \\"{{name}}\\" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}'; GRANT SELECT ON ALL TABLES IN SCHEMA public TO \\"{{name}}\\";" \\
  default_ttl="1h" \\
  max_ttl="24h"

# Generate dynamic credentials
vault read database/creds/readonly
# Returns temporary credentials with 1-hour lease

# Enable Transit engine (encryption as a service)
vault secrets enable transit

# Create encryption key
vault write -f transit/keys/myapp-key

# Encrypt data
vault write transit/encrypt/myapp-key \\
  plaintext=$(echo "my secret data" | base64)
# Returns ciphertext

# Decrypt data
vault write transit/decrypt/myapp-key \\
  ciphertext="vault:v1:..."

# AppRole authentication for applications
vault auth enable approle

vault write auth/approle/role/myapp \\
  secret_id_ttl=0 \\
  token_ttl=1h \\
  token_max_ttl=4h \\
  policies="myapp-policy"

vault read auth/approle/role/myapp/role-id
vault write -f auth/approle/role/myapp/secret-id`}</code></pre>

      <h3 style={{ ...h3Style, color: '#ff9900' }}>{ct.awsExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# AWS Secrets Manager Commands (using AWS CLI)

# Store a secret (plain text)
aws secretsmanager create-secret \\
  --name myapp/database \\
  --description "Database credentials" \\
  --secret-string "username=admin,password=supersecret"

# Store a secret (JSON format)
aws secretsmanager create-secret \\
  --name myapp/config \\
  --secret-string '{
    "username": "admin",
    "password": "supersecret",
    "db_host": "db.example.com",
    "db_port": 5432
  }'

# Retrieve a secret
aws secretsmanager get-secret-value \\
  --secret-id myapp/database
# Returns JSON with SecretString

# Retrieve using jq to parse
aws secretsmanager get-secret-value \\
  --secret-id myapp/config \\
  --query SecretString --output text | jq .

# Update a secret
aws secretsmanager put-secret-value \\
  --secret-id myapp/database \\
  --secret-string "username=admin,password=newsecret"

# Enable automatic rotation for RDS
aws secretsmanager rotate-secret \\
  --secret-id myapp/rds-credentials \\
  --rotation-lambda-arn arn:aws:lambda:us-east-1:123456789012:function:MyRotationFunction \\
  --rotation-rules AutomaticallyAfterDays=30

# Create secret with KMS encryption
aws secretsmanager create-secret \\
  --name myapp/encrypted \\
  --kms-key-id arn:aws:kms:us-east-1:123456789012:key/12345678-1234-1234-1234-123456789012 \\
  --secret-string '{"api_key":"abc123"}'

# List all secrets
aws secretsmanager list-secrets

# Delete a secret (with recovery window)
aws secretsmanager delete-secret \\
  --secret-id myapp/old-secret \\
  --recovery-window-in-days 7

# Restore a deleted secret
aws secretsmanager restore-secret \\
  --secret-id myapp/old-secret

# Python SDK example
import boto3
import json

client = boto3.client('secretsmanager', region_name='us-east-1')

# Get secret value
response = client.get_secret_value(SecretId='myapp/config')
secret = json.loads(response['SecretString'])

print(f"Database host: {secret['db_host']}")
print(f"Username: {secret['username']}")

# Put secret value
new_secret = {
    'username': 'newadmin',
    'password': 'newpassword',
    'db_host': 'newdb.example.com'
}

client.put_secret_value(
    SecretId='myapp/config',
    SecretString=json.dumps(new_secret)
)

# AWS CDK example for secret creation
from aws_cdk import (
    aws_secretsmanager as secretsmanager,
    aws_rds as rds,
    Stack
)

class MyStack(Stack):
    def __init__(self, scope, id, **kwargs):
        super().__init__(scope, id, **kwargs)
        
        # Create secret for database
        db_secret = secretsmanager.Secret(
            self, "DbSecret",
            description="Database credentials",
            generate_secret_string=secretsmanager.SecretStringGenerator(
                secret_string_template=json.dumps({"username": "admin"}),
                generate_string_key="password",
                password_length=32
            )
        )
        
        # Reference secret in RDS instance
        database = rds.DatabaseInstance(
            self, "Database",
            engine=rds.DatabaseInstanceEngine.postgres(
                version=rds.PostgresEngineVersion.VER_14
            ),
            credentials=rds.Credentials.from_secret(db_secret)
        )`}</code></pre>

      {/* Deployment */}
      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>Vault</th>
              <th style={thStyle}>AWS Secrets Manager</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '运维负担' : 'Ops Overhead', isZh ? '中等(自托管)' : 'Medium (self-hosted)', isZh ? '无' : 'None'],
              [isZh ? '高可用性' : 'High Availability', isZh ? '需要配置' : 'Requires setup', isZh ? '内置' : 'Built-in'],
              [isZh ? '灾难恢复' : 'Disaster Recovery', isZh ? '复制功能' : 'Replication', isZh ? 'AWS原生' : 'AWS native'],
              [isZh ? '更新维护' : 'Updates/Maintenance', isZh ? '手动(自托管)' : 'Manual', isZh ? '自动' : 'Automatic'],
              [isZh ? '监控' : 'Monitoring', 'Prometheus, etc.', 'CloudWatch'],
              [isZh ? '备份' : 'Backup', isZh ? '快照' : 'Snapshot', isZh ? 'AWS管理' : 'AWS managed'],
              [isZh ? '扩展性' : 'Scalability', isZh ? '需要规划' : 'Requires planning', isZh ? '自动' : 'Automatic'],
              [isZh ? '区域可用性' : 'Region Availability', isZh ? '任意位置' : 'Anywhere', 'AWS regions'],
            ].map(([cat, vault, aws], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{vault}</td>
                <td style={tdStyle}>{aws}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Security */}
      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ffec3e' }}>
          <strong style={{ color: '#ffec3e' }}>Vault Security</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '提供企业级安全功能：细粒度ACL策略、多种认证方法、完整审计日志、密钥自动过期和撤销、密封/解封机制、HSM支持。符合SOC 2、HIPAA、PCI DSS等合规要求。' : 'Enterprise security: fine-grained ACL policies, multiple auth methods, comprehensive audit logs, automatic secret expiration and revocation, seal/unseal mechanism, HSM support. Compliant with SOC 2, HIPAA, PCI DSS.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ff9900' }}>
          <strong style={{ color: '#ff9900' }}>AWS Secrets Manager Security</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'AWS原生安全集成：IAM策略控制、KMS加密、CloudTrail审计、资源策略、VPC端点。符合AWS合规认证体系。适合已使用AWS安全服务栈的组织。' : 'AWS-native security integration: IAM policy control, KMS encryption, CloudTrail audit, resource policies, VPC endpoints. Compliant with AWS compliance certifications. Ideal for organizations using AWS security stack.'}
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ffec3e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ffec3e' }}>{ct.vaultBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '多云/混合环境' : 'Multi-cloud/Hybrid environments'}</li>
            <li>{isZh ? '加密即服务' : 'Encryption as a service'}</li>
            <li>{isZh ? 'PKI和证书管理' : 'PKI and certificate management'}</li>
            <li>{isZh ? '自定义密钥引擎' : 'Custom secrets engines'}</li>
            <li>{isZh ? '严格合规要求' : 'Strict compliance requirements'}</li>
            <li>{isZh ? '非AWS数据库' : 'Non-AWS databases'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ff9900' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ff9900' }}>{ct.awsBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'AWS原生应用' : 'AWS-native applications'}</li>
            <li>{isZh ? 'RDS/Aurora数据库' : 'RDS/Aurora databases'}</li>
            <li>{isZh ? '快速部署' : 'Quick deployment'}</li>
            <li>{isZh ? '零运维需求' : 'Zero ops requirement'}</li>
            <li>{isZh ? 'AWS服务集成' : 'AWS service integration'}</li>
            <li>{isZh ? '简单密钥管理' : 'Simple secrets management'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={"/" + lang + "/tools/hash-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a> • {' '}
        <a href={"/" + lang + "/tools/jwt-decoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
      </div>

      {/* FAQ */}
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
