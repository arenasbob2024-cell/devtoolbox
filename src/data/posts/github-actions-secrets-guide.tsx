'use client';
import Link from 'next/link';
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

const codeQuickCliSecrets = `# Create or update a repository secret
gh secret set API_TOKEN --body "$API_TOKEN"

# Create an environment-scoped secret for production deploys
gh secret set DATABASE_URL --env production --body "$DATABASE_URL"

# Create an organization secret and limit it to selected repositories
gh secret set SENTRY_AUTH_TOKEN \\
  --org ORG_NAME \\
  --repos web-app,api-service \\
  --body "$SENTRY_AUTH_TOKEN"

# List configured secret names without revealing values
gh secret list
gh secret list --env production
gh secret list --org ORG_NAME`;

const codeGithubTokenPermissions = `# Use the automatic GITHUB_TOKEN with least privilege
permissions:
  contents: read
  pull-requests: write

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v7
        with:
          github-token: \${{ secrets.GITHUB_TOKEN }}
          script: |
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: 'CI completed.'
            })`;

const codeConditionalSecret = `# Secrets cannot be referenced directly in if:
# Move the value into an env var, then test the env var.
jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      HAS_DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN != '' }}
    steps:
      - name: Deploy only when the secret exists
        if: env.HAS_DEPLOY_TOKEN == 'true'
        env:
          DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}
        run: ./deploy.sh`;

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
      SLACK_WEBHOOK: \${{ secrets.SLACK_WEBHOOK }}

  # Alternative for trusted same-organization workflows:
  # deploy:
  #   uses: org/reusable/.github/workflows/deploy.yml@main
  #   secrets: inherit`;

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
    quickTitle: 'Quick Answers: GitHub Actions Secrets, GITHUB_TOKEN, and gh secret set',
    quickIntro: 'Use this short decision guide when you need to configure a secret quickly and safely.',
    quickRepo: 'Repository secrets are available only to workflows in one repository. Create them in Settings > Secrets and variables > Actions, or with gh secret set API_TOKEN.',
    quickEnv: 'Environment secrets are tied to a named environment such as production. A job must select that environment before those secrets are available, and environment protection rules can require reviewers or branch restrictions before release jobs run.',
    quickOrg: 'Organization secrets can be shared across repositories, but organization owners should limit access to selected repositories whenever the credential is not truly global.',
    quickToken: 'GITHUB_TOKEN is created automatically for each workflow run. You can reference it as secrets.GITHUB_TOKEN, but actions can also access github.token, so always set the minimum permissions block your workflow needs.',
    quickIf: 'Secrets cannot be referenced directly in if: conditionals. If a secret is unset, the secrets context returns an empty string; move a boolean or the value into env before testing it.',
    quickForks: 'Secrets other than GITHUB_TOKEN are not passed to workflows triggered from forked repositories. Treat pull_request_target workflows as privileged and never run untrusted fork code with secrets.',
    basicTitle: 'Basic Secret Usage',
    basicDesc: 'Secrets are defined in your repository settings (Settings > Secrets and variables > Actions) and referenced in workflows using the secrets context. They are automatically masked in workflow logs.',
    envTitle: 'Environment-Scoped Secrets',
    envDesc: 'GitHub Environments let you define secrets that are specific to a deployment environment (staging, production) and add protection rules like required reviewers.',
    oidcTitle: 'OIDC Federation: No Long-Lived Secrets',
    oidcDesc: 'The best practice in 2026 is to use OIDC (OpenID Connect) federation to authenticate with cloud providers instead of storing long-lived access keys. GitHub Actions can exchange a JWT token for temporary cloud credentials.',
    maskingTitle: 'Secret Masking and Safe Usage',
    maskingDesc: 'GitHub automatically masks secret values in logs, but there are important caveats to understand to avoid accidental exposure.',
    reusableTitle: 'Secrets in Reusable Workflows',
    reusableDesc: 'When using reusable workflows (workflow_call), secrets must be passed explicitly with a secrets map, or intentionally forwarded with secrets: inherit. Do not assume a called workflow receives credentials unless the caller passes them.',
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
    faq3a: 'GitHub allows up to 100 secrets per repository, 100 secrets per environment, and 1,000 secrets per organization. Each secret is limited to 48 KB. If a repository has access to more than 100 organization secrets, only the first 100 organization secrets sorted alphabetically are available to a workflow.',
    faq4q: 'Can I read a secret value after it is stored?',
    faq4a: 'No. Once a secret is created, its value cannot be read through the GitHub UI or API. You can only update or delete it. This is by design — if you lose track of a secret, create a new one and rotate the credentials.',
    faq5q: 'How do I pass secrets between jobs in a workflow?',
    faq5a: 'Secrets cannot be directly passed between jobs as job outputs (outputs are visible in logs). Instead, re-reference the secret in each job that needs it using secrets.MY_SECRET, or generate a temporary credential in one job and pass it through encrypted artifact storage using GPG.',
    faq6q: 'Is secrets.GITHUB_TOKEN the same as GITHUB_TOKEN?',
    faq6a: 'The automatic GITHUB_TOKEN is generated for each workflow run and can be referenced as secrets.GITHUB_TOKEN. Some actions can also access it through the github.token context even if you do not pass it explicitly, so restrict it with a permissions block.',
    faq7q: 'Why is my GitHub Actions secret empty in an if condition?',
    faq7a: 'GitHub Actions does not allow direct secrets references in if: conditionals. An unset secret resolves to an empty string when referenced in expressions. Put the check or value into an environment variable first, then test env.MY_FLAG or env.MY_SECRET in the conditional.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'GitHub Actions 密钥管理：最佳实践指南',
    intro: 'GitHub Actions 密钥允许你在仓库设置中安全存储敏感数据——API 密钥、密码、令牌、证书——并在工作流中使用它们，而无需在代码中暴露。本指南涵盖从基本密钥使用到高级模式（如 OIDC 联合认证、环境范围密钥和自动轮换）的所有内容。',
    quickTitle: '快速答案：GitHub Actions Secrets、GITHUB_TOKEN 与 gh secret set',
    quickIntro: '当你需要快速、安全地配置 GitHub Actions 密钥时，先按这份简短决策表处理。',
    quickRepo: 'Repository secrets 只对单个仓库的工作流可用。可以在 Settings > Secrets and variables > Actions 中创建，也可以用 gh secret set API_TOKEN 创建。',
    quickEnv: 'Environment secrets 绑定到 production 等命名环境。作业必须选择该 environment 后才能拿到这些密钥，环境保护规则还可以要求审核者或限制部署分支。',
    quickOrg: 'Organization secrets 可以跨仓库共享，但除非凭证确实是全局通用，否则组织管理员应限制到选定仓库。',
    quickToken: 'GITHUB_TOKEN 会为每次 workflow run 自动生成。你可以用 secrets.GITHUB_TOKEN 引用它，但 action 也可能通过 github.token 访问它，因此应始终设置最小化 permissions。',
    quickIf: 'Secrets 不能直接写在 if: 条件中。未设置的 secret 会返回空字符串；需要先把布尔值或 secret 值放到 env，再用 env 判断。',
    quickForks: '除 GITHUB_TOKEN 外，secrets 默认不会传给 fork 仓库触发的工作流。pull_request_target 是特权场景，不能让不可信 fork 代码带着 secrets 运行。',
    basicTitle: '基本密钥使用',
    basicDesc: '密钥在仓库设置（Settings > Secrets and variables > Actions）中定义，并在工作流中使用 secrets 上下文引用。它们在工作流日志中自动被遮蔽。',
    envTitle: '环境范围的密钥',
    envDesc: 'GitHub Environments 允许你定义特定于部署环境（staging、production）的密钥，并添加保护规则，如必要的审查者。',
    oidcTitle: 'OIDC 联合认证：无需长期密钥',
    oidcDesc: '2026 年的最佳实践是使用 OIDC（OpenID Connect）联合认证来与云提供商进行身份验证，而不是存储长期访问密钥。GitHub Actions 可以将 JWT 令牌交换为临时云凭证。',
    maskingTitle: '密钥遮蔽和安全使用',
    maskingDesc: 'GitHub 自动在日志中遮蔽密钥值，但有一些重要的注意事项需要了解以避免意外暴露。',
    reusableTitle: '可复用工作流中的密钥',
    reusableDesc: '使用可复用工作流（workflow_call）时，密钥必须通过 secrets 映射显式传递，或用 secrets: inherit 有意转发。不要假设被调用工作流会自动拿到凭证。',
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
    faq3a: 'GitHub 允许每个仓库最多 100 个 secrets、每个 environment 最多 100 个 secrets、每个组织最多 1,000 个 secrets。每个 secret 大小上限为 48 KB。如果仓库可访问超过 100 个组织级 secrets，workflow 只能使用按名称字母序排列的前 100 个。',
    faq4q: '存储后我可以读取密钥值吗？',
    faq4a: '不能。一旦创建密钥，其值就无法通过 GitHub UI 或 API 读取。你只能更新或删除它。这是设计使然——如果你丢失了密钥，创建新的并轮换凭证。',
    faq5q: '如何在工作流中的作业之间传递密钥？',
    faq5a: '密钥不能直接作为作业输出在作业之间传递（输出在日志中可见）。相反，在每个需要它的作业中使用 secrets.MY_SECRET 重新引用密钥，或者在一个作业中生成临时凭证，并通过使用 GPG 的加密构件存储传递。',
    faq6q: 'secrets.GITHUB_TOKEN 和 GITHUB_TOKEN 是同一个东西吗？',
    faq6a: '自动 GITHUB_TOKEN 会为每次 workflow run 生成，并可通过 secrets.GITHUB_TOKEN 引用。一些 action 即使没有显式传入，也能通过 github.token 上下文访问它，因此要用 permissions 块限制权限。',
    faq7q: '为什么 GitHub Actions secret 在 if 条件里是空的？',
    faq7a: 'GitHub Actions 不允许在 if: 条件中直接引用 secrets。未设置的 secret 在表达式中会解析为空字符串。应先把检查结果或值放入环境变量，再在条件中判断 env.MY_FLAG 或 env.MY_SECRET。',
    relatedTitle: '相关工具',
  },
};

export default function GithubActionsSecretsGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;
  const faqItems = [
    { q: t.faq1q, a: t.faq1a },
    { q: t.faq2q, a: t.faq2a },
    { q: t.faq3q, a: t.faq3a },
    { q: t.faq4q, a: t.faq4a },
    { q: t.faq5q, a: t.faq5a },
    { q: t.faq6q, a: t.faq6a },
    { q: t.faq7q, a: t.faq7a },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const comparisonRows = [
    { option: 'GITHUB_TOKEN', scope: 'Current workflow run', visibility: 'Automatic', rotation: 'Per run', cost: 'Free', bestFor: 'GitHub API automation' },
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

      <section style={{ background: '#fff7ed', border: '1px solid #fed7aa', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0 }}>{t.quickTitle}</h2>
        <p>{t.quickIntro}</p>
        <ul style={{ lineHeight: '1.8', paddingLeft: '1.5rem' }}>
          <li>{t.quickRepo}</li>
          <li>{t.quickEnv}</li>
          <li>{t.quickOrg}</li>
          <li>{t.quickToken}</li>
          <li>{t.quickIf}</li>
          <li>{t.quickForks}</li>
        </ul>
        <pre style={preStyle}><code>{codeQuickCliSecrets}</code></pre>
        <pre style={preStyle}><code>{codeGithubTokenPermissions}</code></pre>
        <pre style={preStyle}><code>{codeConditionalSecret}</code></pre>
      </section>

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
      {faqItems.map(({ q, a }, i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #ed8936' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><Link href={`/${lang}/tools/hash-generator`} style={{ color: '#3182ce' }}>Hash Generator (MD5/SHA256)</Link></li>
          <li><Link href={`/${lang}/tools/base64-encoder-decoder`} style={{ color: '#3182ce' }}>Base64 Encoder/Decoder</Link></li>
          <li><Link href={`/${lang}/tools/json-formatter`} style={{ color: '#3182ce' }}>JSON Formatter</Link></li>
        </ul>
      </div>
    </article>
  );
}
