'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Crossplane vs Terraform: Infrastructure as Code Comparison',
    intro: 'Crossplane and Terraform are leading Infrastructure as Code (IaC) solutions. Terraform is the established standard for infrastructure provisioning, while Crossplane brings GitOps and Kubernetes-native resource management. This comparison examines their approaches, strengths, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Terraform for mature ecosystem, broad provider support, and declarative HCL syntax. Choose Crossplane for Kubernetes-native infrastructure, GitOps workflows, and composite resources. Terraform excels in traditional IaC; Crossplane excels in cloud-native and Kubernetes environments.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Terraform has 3000+ providers; Crossplane focuses on cloud-native',
    takeaway2: 'Crossplane uses Kubernetes CRDs for infrastructure',
    takeaway3: 'Terraform uses HCL; Crossplane uses YAML',
    takeaway4: 'Crossplane enables self-service infrastructure via Kubernetes',
    takeaway5: 'Terraform has larger community and mature tooling',
    takeaway6: 'Crossplane integrates natively with GitOps (ArgoCD, Flux)',
    
    whatIsCrossplaneTitle: 'What is Crossplane?',
    whatIsCrossplaneContent: 'Crossplane is an open-source infrastructure as code platform developed by Upbound. Released in 2018, it extends Kubernetes to manage cloud infrastructure, services, and applications using native Kubernetes APIs. Crossplane enables infrastructure management through Custom Resource Definitions (CRDs) and supports composition of complex infrastructure patterns.',
    
    whatIsTerraformTitle: 'What is Terraform?',
    whatIsTerraformContent: 'Terraform is an open-source IaC tool developed by HashiCorp. Released in 2014, it uses HashiCorp Configuration Language (HCL) to define infrastructure across 3000+ providers. Terraform manages infrastructure lifecycle through state files and provides robust plan/apply workflow for infrastructure changes.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Infrastructure provisioning examples:',
    
    crossplaneExampleTitle: 'Crossplane Configuration',
    terraformExampleTitle: 'Terraform Configuration',
    
    dataSourceTitle: 'Provider & Resource Support',
    dataSourceIntro: 'Supported cloud providers and resources:',
    
    alertingTitle: 'State Management',
    alertingIntro: 'How infrastructure state is managed:',
    
    useCasesTitle: 'Best Use Cases',
    crossplaneBestFor: 'Crossplane is Best For:',
    terraformBestFor: 'Terraform is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Terraform and Crossplane represent different paradigms. Terraform is the mature choice for traditional IaC with its vast provider ecosystem and proven workflows. Crossplane is ideal for Kubernetes-native environments where infrastructure is managed alongside applications using GitOps. Many organizations use both: Terraform for initial cloud setup and Crossplane for ongoing application infrastructure.',
    
    faq1q: 'Can I use both Terraform and Crossplane together?',
    faq1a: 'Yes, many organizations do. Terraform can provision initial cloud infrastructure (VPCs, IAM), while Crossplane manages application-level resources (databases, caches, buckets). The terraform-provider-crossplane allows Terraform to manage Crossplane resources.',
    
    faq2q: 'Which is better for GitOps?',
    faq2a: 'Crossplane is better suited for GitOps as it uses Kubernetes-native resources that integrate seamlessly with ArgoCD and Flux. Terraform requires additional tooling (Atlantis, Terraform Cloud) for GitOps workflows.',
    
    faq3q: 'How do they handle state?',
    faq3a: 'Terraform uses state files (local or remote) to track infrastructure. Crossplane stores state in Kubernetes etcd as custom resources. Crossplane state is always consistent with the cluster; Terraform state can drift.',
    
    faq4q: 'Which has better provider support?',
    faq4a: 'Terraform has broader provider support with 3000+ providers. Crossplane has fewer official providers but can use Terraform providers via XRDs (Crossplane Terraform Provider). For niche services, Terraform often has better coverage.',
    
    faq5q: 'What about drift detection?',
    faq5a: 'Both support drift detection. Terraform detects drift during plan/apply. Crossplane continuously reconciles resources and auto-remediates drift. Crossplane\'s approach is more proactive.',
    
    faq6q: 'Which is easier to learn?',
    faq6a: 'Terraform is generally easier for infrastructure teams familiar with IaC. Crossplane requires Kubernetes knowledge. For teams already using Kubernetes, Crossplane is natural; for traditional ops, Terraform is easier.',
    
    faq7q: 'How do they handle secrets?',
    faq7a: 'Terraform can use HashiCorp Vault, AWS Secrets Manager, or encrypted state. Crossplane integrates with Kubernetes secrets and external secret stores via External Secrets Operator. Both have good secrets management.',
    
    faq8q: 'What about enterprise features?',
    faq8a: 'Terraform Enterprise/Cloud offers collaboration, policy as code, and private registry. Crossplane has Upbound for managed control planes, RBAC, and composition templates. Both have strong enterprise offerings.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Crossplane vs Terraform：基础设施即代码对比',
    intro: 'Crossplane 和 Terraform 是领先的基础设施即代码（IaC）解决方案。Terraform 是基础设施配置的既定标准，而 Crossplane 带来 GitOps 和 Kubernetes 原生资源管理。本比较考察它们的方法、优势和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为成熟生态系统、广泛提供者支持和声明式 HCL 语法选择 Terraform。为 Kubernetes 原生基础设施、GitOps 工作流和组合资源选择 Crossplane。Terraform 在传统 IaC 方面出色；Crossplane 在云原生和 Kubernetes 环境方面出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Terraform 有 3000+ 提供者；Crossplane 专注于云原生',
    takeaway2: 'Crossplane 使用 Kubernetes CRD 管理基础设施',
    takeaway3: 'Terraform 使用 HCL；Crossplane 使用 YAML',
    takeaway4: 'Crossplane 通过 Kubernetes 实现自助服务基础设施',
    takeaway5: 'Terraform 拥有更大的社区和成熟工具',
    takeaway6: 'Crossplane 与 GitOps（ArgoCD、Flux）原生集成',
    
    whatIsCrossplaneTitle: '什么是 Crossplane？',
    whatIsCrossplaneContent: 'Crossplane 是由 Upbound 开发的开源基础设施即代码平台。2018 年发布，它扩展 Kubernetes 以使用原生 Kubernetes API 管理云基础设施、服务和应用。Crossplane 通过自定义资源定义（CRD）实现基础设施管理，支持复杂基础设施模式的组合。',
    
    whatIsTerraformTitle: '什么是 Terraform？',
    whatIsTerraformContent: 'Terraform 是由 HashiCorp 开发的开源 IaC 工具。2014 年发布，它使用 HashiCorp 配置语言（HCL）跨 3000+ 提供者定义基础设施。Terraform 通过状态文件管理基础设施生命周期，为基础设施变更提供强大的 plan/apply 工作流。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '基础设施配置示例：',
    
    crossplaneExampleTitle: 'Crossplane 配置',
    terraformExampleTitle: 'Terraform 配置',
    
    dataSourceTitle: '提供者与资源支持',
    dataSourceIntro: '支持的云提供者和资源：',
    
    alertingTitle: '状态管理',
    alertingIntro: '基础设施状态如何管理：',
    
    useCasesTitle: '最佳用例',
    crossplaneBestFor: 'Crossplane 最适合：',
    terraformBestFor: 'Terraform 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Terraform 和 Crossplane 代表不同的范式。Terraform 是传统 IaC 的成熟选择，拥有广泛的提供者生态系统和经过验证的工作流。Crossplane 适合 Kubernetes 原生环境，基础设施与应用一起通过 GitOps 管理。许多组织同时使用两者：Terraform 用于初始云设置，Crossplane 用于持续的应用基础设施。',
    
    faq1q: '我可以同时使用 Terraform 和 Crossplane 吗？',
    faq1a: '可以，许多组织这样做。Terraform 可以配置初始云基础设施（VPC、IAM），而 Crossplane 管理应用级资源（数据库、缓存、存储桶）。terraform-provider-crossplane 允许 Terraform 管理 Crossplane 资源。',
    
    faq2q: '哪个更适合 GitOps？',
    faq2a: 'Crossplane 更适合 GitOps，因为它使用与 ArgoCD 和 Flux 无缝集成的 Kubernetes 原生资源。Terraform 需要 Atlanti 或 Terraform Cloud 等额外工具实现 GitOps 工作流。',
    
    faq3q: '它们如何处理状态？',
    faq3a: 'Terraform 使用状态文件（本地或远程）跟踪基础设施。Crossplane 将状态作为自定义资源存储在 Kubernetes etcd 中。Crossplane 状态始终与集群一致；Terraform 状态可能漂移。',
    
    faq4q: '哪个提供者支持更好？',
    faq4a: 'Terraform 有更广泛的提供者支持，3000+ 提供者。Crossplane 官方提供者较少，但可以通过 XRDs（Crossplane Terraform Provider）使用 Terraform 提供者。对于小众服务，Terraform 通常有更好的覆盖。',
    
    faq5q: '漂移检测怎么样？',
    faq5a: '两者都支持漂移检测。Terraform 在 plan/apply 期间检测漂移。Crossplane 持续协调资源并自动修复漂移。Crossplane 的方法更主动。',
    
    faq6q: '哪个更容易学习？',
    faq6a: '对于熟悉 IaC 的基础设施团队，Terraform 通常更容易。Crossplane 需要 Kubernetes 知识。对于已经使用 Kubernetes 的团队，Crossplane 很自然；对于传统运维，Terraform 更容易。',
    
    faq7q: '它们如何处理密钥？',
    faq7a: 'Terraform 可以使用 HashiCorp Vault、AWS Secrets Manager 或加密状态。Crossplane 通过 External Secrets Operator 与 Kubernetes secrets 和外部密钥存储集成。两者都有良好的密钥管理。',
    
    faq8q: '企业功能怎么样？',
    faq8a: 'Terraform Enterprise/Cloud 提供协作、策略即代码和私有注册表。Crossplane 有 Upbound 用于托管控制平面、RBAC 和组合模板。两者都有强大的企业产品。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function CrossplaneVsTerraform({ lang }: { lang: string }) {
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
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#8c4bff' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #8c4bff', background: 'linear-gradient(135deg, rgba(140,75,255,0.1), rgba(255,100,100,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#8c4bff' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsCrossplaneTitle}</h3>
      <p style={pStyle}>{ct.whatIsCrossplaneContent}</p>

      <h3 style={{ ...h3Style, color: '#7b42bc' }}>{ct.whatIsTerraformTitle}</h3>
      <p style={pStyle}>{ct.whatIsTerraformContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Crossplane</th>
              <th style={thStyle}>Terraform</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心定位' : 'Core Focus', 'K8s-native IaC', 'Traditional IaC'],
              [isZh ? '配置语言' : 'Config Language', 'YAML (CRDs)', 'HCL'],
              [isZh ? '状态存储' : 'State Storage', 'Kubernetes etcd', 'State file (local/remote)'],
              [isZh ? 'GitOps 集成' : 'GitOps Integration', isZh ? '原生' : 'Native', isZh ? '需要工具' : 'Requires tooling'],
              [isZh ? '提供者数量' : 'Providers', '~100 official', '3000+'],
              [isZh ? '漂移检测' : 'Drift Detection', isZh ? '持续协调' : 'Continuous reconcile', isZh ? '计划时检测' : 'Plan-time'],
              [isZh ? 'RBAC' : 'RBAC', isZh ? 'Kubernetes 原生' : 'K8s native', isZh ? '企业版' : 'Enterprise'],
              [isZh ? '自服务' : 'Self-service', isZh ? '内置' : 'Built-in', isZh ? '需要模块' : 'Requires modules'],
            ].map(([feature, crossplane, terraform], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{crossplane}</td>
                <td style={tdStyle}>{terraform}</td>
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
              <th style={thStyle}>Crossplane</th>
              <th style={thStyle}>Terraform</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '组合资源' : 'Compositions', isZh ? '强大' : 'Powerful', isZh ? '模块' : 'Modules'],
              [isZh ? '依赖管理' : 'Dependency Mgmt', isZh ? 'K8s 控制器' : 'K8s controller', isZh ? '内置' : 'Built-in'],
              [isZh ? '密钥管理' : 'Secrets Mgmt', isZh ? 'K8s secrets' : 'K8s secrets', 'Vault, Cloud secrets'],
              [isZh ? '计划/预览' : 'Plan/Preview', isZh ? '有限' : 'Limited', isZh ? '强大' : 'Powerful'],
              [isZh ? '导入资源' : 'Import Resources', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '多团队' : 'Multi-team', isZh ? '优秀' : 'Excellent', isZh ? '企业版' : 'Enterprise'],
              [isZh ? '策略即代码' : 'Policy as Code', 'OPA/Gatekeeper', 'Sentinel/OPA'],
              [isZh ? '市场' : 'Marketplace', 'Upbound Marketplace', 'Terraform Registry'],
            ].map(([cap, crossplane, terraform], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{crossplane}</td>
                <td style={tdStyle}>{terraform}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#8c4bff' }}>{ct.crossplaneExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Crossplane AWS S3 Bucket
apiVersion: s3.aws.crossplane.io/v1beta1
kind: Bucket
metadata:
  name: app-bucket
  annotations:
    crossplane.io/external-name: my-app-bucket
spec:
  forProvider:
    acl: private
    locationConstraint: us-west-2
    versioningConfiguration:
      status: Enabled
    serverSideEncryptionConfiguration:
      rules:
      - applyServerSideEncryptionByDefault:
          sseAlgorithm: AES256
    tags:
      Environment: production
      ManagedBy: crossplane
  providerConfigRef:
    name: aws-provider-config
  deletionPolicy: Delete

---
# Crossplane Composition (Reusable Template)
apiVersion: apiextensions.crossplane.io/v1
kind: Composition
metadata:
  name: standard-postgres
spec:
  compositeTypeRef:
    apiVersion: example.org/v1alpha1
    kind: XPostgreSQLInstance
  resources:
  - name: rdsinstance
    base:
      apiVersion: database.aws.crossplane.io/v1beta1
      kind: DBInstance
      spec:
        forProvider:
          engine: postgres
          engineVersion: "13.7"
          dbInstanceClass: db.t3.micro
          masterUsername: admin
        writeConnectionSecretToRef:
          namespace: crossplane-system
    patches:
    - fromFieldPath: spec.parameters.storageGB
      toFieldPath: spec.forProvider.allocatedStorage`}</code></pre>

      <h3 style={{ ...h3Style, color: '#7b42bc' }}>{ct.terraformExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Terraform AWS S3 Bucket
resource "aws_s3_bucket" "app_bucket" {
  bucket = "my-app-bucket"
  
  tags = {
    Environment = "production"
    ManagedBy   = "terraform"
  }
}

resource "aws_s3_bucket_versioning" "app_bucket" {
  bucket = aws_s3_bucket.app_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "app_bucket" {
  bucket = aws_s3_bucket.app_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Terraform Module (Reusable)
module "postgres" {
  source = "./modules/postgres"
  
  engine_version    = "13.7"
  instance_class    = "db.t3.micro"
  allocated_storage = var.storage_gb
  database_name     = var.db_name
  
  tags = {
    Environment = var.environment
  }
}

# Terraform Plan Workflow
# 1. terraform init
# 2. terraform plan -out=tfplan
# 3. terraform apply tfplan

# Remote State Configuration
terraform {
  backend "s3" {
    bucket         = "terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '云提供商' : 'Cloud Provider'}</th>
              <th style={thStyle}>Crossplane</th>
              <th style={thStyle}>Terraform</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['AWS', isZh ? '官方提供者' : 'Official provider', isZh ? '官方提供者' : 'Official provider'],
              ['Azure', isZh ? '官方提供者' : 'Official provider', isZh ? '官方提供者' : 'Official provider'],
              ['GCP', isZh ? '官方提供者' : 'Official provider', isZh ? '官方提供者' : 'Official provider'],
              [isZh ? '其他云' : 'Other Clouds', isZh ? '社区提供者' : 'Community providers', '3000+ providers'],
              [isZh ? 'Kubernetes' : 'Kubernetes', isZh ? '原生支持' : 'Native support', isZh ? '提供者' : 'Provider'],
              [isZh ? 'SaaS 服务' : 'SaaS Services', isZh ? '有限' : 'Limited', isZh ? '广泛' : 'Extensive'],
            ].map(([provider, crossplane, terraform], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{provider}</td>
                <td style={tdStyle}>{crossplane}</td>
                <td style={tdStyle}>{terraform}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8c4bff' }}>
          <strong style={{ color: '#8c4bff' }}>Crossplane State</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '状态存储在 Kubernetes etcd 中作为自定义资源。持续协调确保实际资源与期望状态一致。无需单独状态文件管理。支持多个控制平面隔离。' : 'State stored in Kubernetes etcd as custom resources. Continuous reconciliation ensures actual resources match desired state. No separate state file management. Supports multiple isolated control planes.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #7b42bc' }}>
          <strong style={{ color: '#7b42bc' }}>Terraform State</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '状态存储在本地或远程后端（S3、Consul、Terraform Cloud）。需要手动管理状态锁定和一致性。状态漂移可能导致问题。支持状态导入和迁移。' : 'State stored locally or in remote backends (S3, Consul, Terraform Cloud). Manual state locking and consistency management required. State drift can cause issues. Supports state import and migration.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8c4bff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8c4bff' }}>{ct.crossplaneBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Kubernetes 原生环境' : 'Kubernetes-native environments'}</li>
            <li>{isZh ? 'GitOps 工作流' : 'GitOps workflows'}</li>
            <li>{isZh ? '自服务基础设施' : 'Self-service infrastructure'}</li>
            <li>{isZh ? '平台团队' : 'Platform teams'}</li>
            <li>{isZh ? '持续状态协调' : 'Continuous state reconciliation'}</li>
            <li>{isZh ? '多租户基础设施' : 'Multi-tenant infrastructure'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #7b42bc' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#7b42bc' }}>{ct.terraformBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '传统 IaC 工作流' : 'Traditional IaC workflows'}</li>
            <li>{isZh ? '广泛云服务支持' : 'Broad cloud service support'}</li>
            <li>{isZh ? '成熟团队和流程' : 'Mature teams and processes'}</li>
            <li>{isZh ? '复杂依赖管理' : 'Complex dependency management'}</li>
            <li>{isZh ? '计划/预览工作流' : 'Plan/preview workflows'}</li>
            <li>{isZh ? '非 K8s 环境' : 'Non-K8s environments'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(140,75,255,0.1), rgba(123,66,188,0.1))', borderRadius: 12, border: '1px solid rgba(140,75,255,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#8c4bff', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/yaml-formatter"} style={{ color: '#8c4bff', textDecoration: 'none' }}>YAML Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#8c4bff', textDecoration: 'none' }}>Base64 Encoder</a>
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