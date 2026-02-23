'use client';
import React from 'react';

const codeBasicSecret = `# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to server
        env:
          # Reference a repository secret
          DEPLOY_KEY: \${{ secrets.DEPLOY_KEY }}
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
          API_TOKEN: \${{ secrets.API_TOKEN }}
        run: |
          echo "Deploying with secure credentials..."
          ./deploy.sh`;

const codeEnvironmentSecrets = `# Environment-specific secrets (staging vs production)
name: Deploy

on:
  push:
    branches: [main, staging]

jobs:
  deploy:
    runs-on: ubuntu-latest
    # Pick environment based on branch
    environment: \${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}

    steps:
      - uses: actions/checkout@v4

      - name: Deploy
        env:
          # These come from the selected environment's secrets
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: ./deploy.sh --env \${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}`;

const codeOIDC = `# OIDC: No long-lived credentials needed!
name: Deploy to AWS (OIDC)

on:
  push:
    branches: [main]

permissions:
  id-token: write   # Required for OIDC
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsRole
          aws-region: us-east-1
          # No ACCESS_KEY or SECRET_KEY secrets needed!

      - name: Deploy to S3
        run: aws s3 sync ./dist s3://my-bucket --delete`;

const codeSecretMasking = `# Secrets are automatically masked in logs
# But be careful with derived values!

jobs:
  careful:
    runs-on: ubuntu-latest
    steps:
      - name: Use secret safely
        env:
          MY_SECRET: \${{ secrets.MY_SECRET }}
        run: |
          # This output will be masked: ***
          echo "Secret value: $MY_SECRET"

          # DANGER: This may expose the secret!
          # If MY_SECRET="abc", base64 gives "YWJj" which is NOT masked
          echo \$MY_SECRET | base64

          # Safe: always use secrets directly, not derived forms
          curl -H "Authorization: Bearer $MY_SECRET" https://api.example.com/endpoint

      - name: Add to mask (for dynamic secrets)
        run: |
          # Manually mask a dynamically generated value
          TOKEN=$(generate-token.sh)
          echo "::add-mask::\${TOKEN}"
          echo "TOKEN=\${TOKEN}" >> \$GITHUB_ENV`;

const codeReusableWorkflow = `# .github/workflows/reusable-deploy.yml
name: Reusable Deploy Workflow

on:
  workflow_call:
    secrets:
      DEPLOY_KEY:
        required: true
      DATABASE_URL:
        required: true
      SLACK_WEBHOOK:
        required: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy
        env:
          DEPLOY_KEY: \${{ secrets.DEPLOY_KEY }}
          DATABASE_URL: \${{ secrets.DATABASE_URL }}
        run: ./deploy.sh

      - name: Notify Slack
        if: \${{ secrets.SLACK_WEBHOOK != '' }}
        run: |
          curl -X POST -H 'Content-type: application/json' \\
            --data '{"text":"Deployment complete!"}' \\
            \${{ secrets.SLACK_WEBHOOK }}

# .github/workflows/production.yml — caller
name: Production Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    uses: ./.github/workflows/reusable-deploy.yml
    secrets:
      DEPLOY_KEY: \${{ secrets.DEPLOY_KEY }}
      DATABASE_URL: \${{ secrets.PROD_DATABASE_URL }}
      SLACK_WEBHOOK: \${{ secrets.SLACK_WEBHOOK }}`;

const codeSecretRotation = `# Automated secret rotation pattern
name: Rotate API Token

on:
  schedule:
    - cron: '0 0 1 * *'  # Monthly rotation
  workflow_dispatch:       # Manual trigger

jobs:
  rotate:
    runs-on: ubuntu-latest
    steps:
      - name: Generate new token
        id: generate
        env:
          OLD_TOKEN: \${{ secrets.API_TOKEN }}
        run: |
          # Call API to generate new token using old token
          NEW_TOKEN=$(curl -s -X POST \\
            -H "Authorization: Bearer $OLD_TOKEN" \\
            https://api.example.com/tokens/rotate | jq -r '.token')
          echo "::add-mask::\${NEW_TOKEN}"
          echo "new_token=\${NEW_TOKEN}" >> \$GITHUB_OUTPUT

      - name: Update GitHub secret
        uses: gliech/create-github-secret-action@v1
        with:
          name: API_TOKEN
          value: \${{ steps.generate.outputs.new_token }}
          github_token: \${{ secrets.PERSONAL_ACCESS_TOKEN }}`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'GitHub Actions Secrets Management: Best Practices Guide',
    intro: 'GitHub Actions secrets allow you to store sensitive data — API keys, passwords, tokens, certificates — securely in your repository settings and use them in workflows without exposing them in your code. This guide covers everything from basic secret usage to advanced patterns like OIDC federation, environment-scoped secrets, and automated rotation.',
    basicTitle: 'Basic Secret Usage',
    basicDesc: 'Secrets are defined in your repository settings (Settings > Secrets and variables > Actions) and referenced in workflows using the secrets context. They are automatically masked in workflow logs.',
    envTitle: 'Environment-Scoped Secrets',
    envDesc: 'GitHub Environments let you define secrets that are specific to a deployment environment (staging, production) and add protection rules like required reviewers.',
    oidcTitle: 'OIDC Federation: No Long-Lived Secrets',
    oidcDesc: 'The best practice in 2026 is to use OIDC (OpenID Connect) federation to authenticate with cloud providers instead of storing long-lived access keys. GitHub Actions can exchange a JWT token for temporary cloud credentials.',
    maskingTitle: 'Secret Masking and Safe Usage',
    maskingDesc: 'GitHub automatically masks secret values in logs, but there are important caveats to understand to avoid accidental exposure.',
    reusableTitle: 'Secrets in Reusable Workflows',
    reusableDesc: 'When using reusable workflows (workflow_call), secrets must be explicitly passed through. They are not inherited automatically.',
    rotationTitle: 'Automated Secret Rotation',
    rotationDesc: 'Long-lived secrets are a security risk. Set up automated rotation using scheduled workflows.',
    bestPracticesTitle: 'Security Best Practices',
    bp1: 'Use OIDC federation for cloud providers (AWS, GCP, Azure) instead of static access keys whenever possible.',
    bp2: 'Scope secrets to environments. Production secrets should require environment protection rules (required reviewers, deployment branches).',
    bp3: 'Never print secrets in workflow steps, even for debugging. GitHub masks the exact string, but encoding/transformations bypass masking.',
    bp4: 'Rotate secrets regularly. Set calendar reminders or use automated rotation workflows for API keys.',
    bp5: 'Use the minimum required permissions. Create service accounts with narrow scopes specifically for GitHub Actions.',
    bp6: 'Audit secret access via GitHub\'s audit log. Review which workflows are using which secrets.',
    comparisonTitle: 'Secret Storage Options Comparison',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Can forked repositories access secrets?',
    faq1a: 'No. By default, secrets are not passed to workflows triggered by pull requests from forks. This prevents forked repos from exfiltrating your secrets. For public repos, you can configure which events allow secrets for external contributors, but this requires explicit approval.',
    faq2q: 'What is the difference between repository secrets and organization secrets?',
    faq2a: 'Repository secrets are only available to workflows in that specific repository. Organization secrets can be shared across multiple repositories and have a policy setting that controls which repos can access them (all repos, selected repos, or only private repos).',
    faq3q: 'How many secrets can I store?',
    faq3a: 'GitHub allows up to 100 secrets per repository and 1,000 per organization. Each secret can be at most 64 KB in size. For larger secrets (like certificates), consider storing a base64-encoded version and decoding it in the workflow.',
    faq4q: 'Can I read a secret value after it is stored?',
    faq4a: 'No. Once a secret is created, its value cannot be read through the GitHub UI or API. You can only update or delete it. This is by design — if you lose track of a secret, create a new one and rotate the credentials.',
    faq5q: 'How do I pass secrets between jobs in a workflow?',
    faq5a: 'Secrets cannot be directly passed between jobs as job outputs (outputs are visible in logs). Instead, re-reference the secret in each job that needs it using secrets.MY_SECRET, or generate a temporary credential in one job and pass it through encrypted artifact storage using GPG.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'GitHub Actions 密钥管理：最佳实践指南',
    intro: 'GitHub Actions 密钥允许你在仓库设置中安全存储敏感数据——API 密钥、密码、令牌、证书——并在工作流中使用它们，而无需在代码中暴露。本指南涵盖从基本密钥使用到高级模式（如 OIDC 联合认证、环境范围密钥和自动轮换）的所有内容。',
    basicTitle: '基本密钥使用',
    basicDesc: '密钥在仓库设置（Settings > Secrets and variables > Actions）中定义，并在工作流中使用 secrets 上下文引用。它们在工作流日志中自动被遮蔽。',
    envTitle: '环境范围的密钥',
    envDesc: 'GitHub Environments 允许你定义特定于部署环境（staging、production）的密钥，并添加保护规则，如必要的审查者。',
    oidcTitle: 'OIDC 联合认证：无需长期密钥',
    oidcDesc: '2026 年的最佳实践是使用 OIDC（OpenID Connect）联合认证来与云提供商进行身份验证，而不是存储长期访问密钥。GitHub Actions 可以将 JWT 令牌交换为临时云凭证。',
    maskingTitle: '密钥遮蔽和安全使用',
    maskingDesc: 'GitHub 自动在日志中遮蔽密钥值，但有一些重要的注意事项需要了解以避免意外暴露。',
    reusableTitle: '可复用工作流中的密钥',
    reusableDesc: '使用可复用工作流（workflow_call）时，密钥必须显式传递。它们不会自动继承。',
    rotationTitle: '自动密钥轮换',
    rotationDesc: '长期密钥是安全风险。使用计划工作流设置自动轮换。',
    bestPracticesTitle: '安全最佳实践',
    bp1: '尽可能对云提供商（AWS、GCP、Azure）使用 OIDC 联合认证，而不是静态访问密钥。',
    bp2: '将密钥限定在环境范围内。生产密钥应需要环境保护规则（必要的审查者、部署分支）。',
    bp3: '永远不要在工作流步骤中打印密钥，即使是用于调试。GitHub 遮蔽确切的字符串，但编码/转换会绕过遮蔽。',
    bp4: '定期轮换密钥。为 API 密钥设置日历提醒或使用自动轮换工作流。',
    bp5: '使用所需的最小权限。专门为 GitHub Actions 创建具有狭窄范围的服务账户。',
    bp6: '通过 GitHub 的审计日志审计密钥访问。检查哪些工作流在使用哪些密钥。',
    comparisonTitle: '密钥存储选项对比',
    faqTitle: '常见问题',
    faq1q: '分叉的仓库可以访问密钥吗？',
    faq1a: '不能。默认情况下，密钥不会传递给由分叉触发的拉取请求工作流。这可以防止分叉仓库窃取你的密钥。对于公共仓库，你可以配置哪些事件允许外部贡献者使用密钥，但这需要明确批准。',
    faq2q: '仓库密钥和组织密钥有什么区别？',
    faq2a: '仓库密钥只对该特定仓库中的工作流可用。组织密钥可以在多个仓库之间共享，并有策略设置来控制哪些仓库可以访问它们（所有仓库、选定仓库或仅私有仓库）。',
    faq3q: '我可以存储多少密钥？',
    faq3a: 'GitHub 允许每个仓库最多 100 个密钥，每个组织最多 1,000 个。每个密钥最大 64 KB。对于较大的密钥（如证书），可以考虑存储 base64 编码版本并在工作流中解码。',
    faq4q: '存储后我可以读取密钥值吗？',
    faq4a: '不能。一旦创建密钥，其值就无法通过 GitHub UI 或 API 读取。你只能更新或删除它。这是设计使然——如果你丢失了密钥，创建新的并轮换凭证。',
    faq5q: '如何在工作流中的作业之间传递密钥？',
    faq5a: '密钥不能直接作为作业输出在作业之间传递（输出在日志中可见）。相反，在每个需要它的作业中使用 secrets.MY_SECRET 重新引用密钥，或者在一个作业中生成临时凭证，并通过使用 GPG 的加密构件存储传递。',
    relatedTitle: '相关工具',
  },
};

export default function GithubActionsSecretsGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  const comparisonRows = [
    { option: 'Repository Secrets', scope: 'Single repo', visibility: 'Repo admins', rotation: 'Manual', cost: 'Free', bestFor: 'Simple projects' },
    { option: 'Environment Secrets', scope: 'Single repo + env', visibility: 'Repo admins', rotation: 'Manual', cost: 'Free', bestFor: 'Multi-stage deploys' },
    { option: 'Organization Secrets', scope: 'Multiple repos', visibility: 'Org admins', rotation: 'Manual', cost: 'Free', bestFor: 'Shared credentials' },
    { option: 'OIDC Federation', scope: 'Single repo', visibility: 'No stored secret', rotation: 'Automatic', cost: 'Free', bestFor: 'Cloud deployments' },
    { option: 'HashiCorp Vault', scope: 'Any', visibility: 'Configurable', rotation: 'Automatic', cost: 'Paid', bestFor: 'Enterprise' },
  ];

  const preStyle: React.CSSProperties = { background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <h2>{t.basicTitle}</h2>
      <p>{t.basicDesc}</p>
      <pre style={preStyle}><code>{codeBasicSecret}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.envTitle}</h2>
      <p>{t.envDesc}</p>
      <pre style={preStyle}><code>{codeEnvironmentSecrets}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.oidcTitle}</h2>
      <p>{t.oidcDesc}</p>
      <pre style={preStyle}><code>{codeOIDC}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.maskingTitle}</h2>
      <p>{t.maskingDesc}</p>
      <pre style={preStyle}><code>{codeSecretMasking}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.reusableTitle}</h2>
      <p>{t.reusableDesc}</p>
      <pre style={preStyle}><code>{codeReusableWorkflow}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.rotationTitle}</h2>
      <p>{t.rotationDesc}</p>
      <pre style={preStyle}><code>{codeSecretRotation}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.comparisonTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['Option', 'Scope', 'Visibility', 'Rotation', 'Cost', 'Best For'].map(h => (
                <th key={h} style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 600 }}>{row.option}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.scope}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.visibility}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.rotation}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.cost}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.bestPracticesTitle}</h2>
      <ol style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
        <li>{t.bp6}</li>
      </ol>

      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #ed8936' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><a href="/en/tools/hash-generator" style={{ color: '#3182ce' }}>Hash Generator (MD5/SHA256)</a></li>
          <li><a href="/en/tools/base64-encoder-decoder" style={{ color: '#3182ce' }}>Base64 Encoder/Decoder</a></li>
          <li><a href="/en/tools/json-formatter" style={{ color: '#3182ce' }}>JSON Formatter</a></li>
        </ul>
      </div>
    </article>
  );
}
