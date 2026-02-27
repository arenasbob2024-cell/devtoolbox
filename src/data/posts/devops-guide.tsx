'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'DevOps Complete Guide 2026: CI/CD, Docker, Kubernetes, IaC, and Observability',
    description:
      'Master DevOps end-to-end: Git workflows, GitHub Actions CI/CD, Docker multi-stage builds, Terraform IaC, Kubernetes GitOps, Prometheus monitoring, and DevSecOps security practices.',
    tldr:
      'DevOps bridges development and operations through automation and shared responsibility. Core pillars: CI/CD pipelines (GitHub Actions, GitLab CI) for fast, safe delivery; Docker for portable containerization; Kubernetes + Helm for orchestration and GitOps; Terraform for Infrastructure as Code; Prometheus + Grafana for observability; and DevSecOps (SAST, secrets management, container scanning) for shifting security left. DORA metrics — deployment frequency, lead time, MTTR, and change failure rate — are the gold standard for measuring DevOps maturity.',
  },
  zh: {
    title: 'DevOps 完整指南 2026：CI/CD、Docker、Kubernetes、基础设施即代码与可观测性',
    description:
      '全面掌握 DevOps：Git 工作流、GitHub Actions CI/CD、Docker 多阶段构建、Terraform IaC、Kubernetes GitOps、Prometheus 监控以及 DevSecOps 安全实践。',
    tldr:
      'DevOps 通过自动化和共同责任连接开发与运维。核心支柱：CI/CD 流水线（GitHub Actions、GitLab CI）实现快速安全交付；Docker 实现可移植容器化；Kubernetes + Helm 实现编排与 GitOps；Terraform 实现基础设施即代码；Prometheus + Grafana 实现可观测性；以及 DevSecOps（SAST、密钥管理、容器扫描）将安全左移。DORA 指标——部署频率、变更前置时间、MTTR 和变更失败率——是衡量 DevOps 成熟度的黄金标准。',
  },
};

export default function DevopsGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between DevOps and SRE?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'DevOps is a cultural and organizational philosophy focused on breaking silos between development and operations teams through automation, shared ownership, and continuous delivery. SRE (Site Reliability Engineering), coined by Google, is a specific implementation of DevOps principles using software engineering to solve operations problems. SREs define SLOs (Service Level Objectives), manage error budgets, and own reliability at scale. DevOps is the "what and why"; SRE is one "how". Both share principles: automation, observability, and blameless postmortems.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are DORA metrics and why do they matter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'DORA (DevOps Research and Assessment) metrics are four key measurements of software delivery performance: (1) Deployment Frequency — how often you deploy to production (elite: multiple times/day); (2) Lead Time for Changes — time from commit to production (elite: < 1 hour); (3) Mean Time to Restore (MTTR) — time to recover from failures (elite: < 1 hour); (4) Change Failure Rate — percentage of deployments causing incidents (elite: 0–15%). Elite performers outperform low performers by 208x on deployment frequency and 2604x on lead time. They are the most evidence-based way to measure DevOps maturity.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Infrastructure as Code (IaC) and should I use Terraform or Pulumi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Infrastructure as Code means managing and provisioning cloud resources through machine-readable configuration files rather than manual UI clicks. Benefits: version control, repeatability, drift detection, and peer review. Terraform (HCL language) is the most widely adopted IaC tool with the largest provider ecosystem and community. Pulumi uses real programming languages (TypeScript, Python, Go) — better for teams wanting loops, conditionals, and type safety without learning HCL. Choose Terraform for maximum community resources and job market demand; choose Pulumi if your team prefers general-purpose programming language abstractions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is GitOps and how does ArgoCD implement it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GitOps is an operational framework where Git is the single source of truth for both application code and infrastructure configuration. All changes go through pull requests; the actual cluster state is automatically reconciled to match the Git state. ArgoCD is a declarative GitOps controller for Kubernetes: it watches a Git repository, detects drift between the desired state (Git) and actual state (cluster), and automatically (or manually, with approval) syncs the cluster. Benefits: full audit trail in Git history, easy rollback (revert a commit), and no imperative kubectl commands in CI/CD.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Trunk-Based Development and GitFlow?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GitFlow uses long-lived branches (main, develop, feature/*, release/*, hotfix/*) and is suited for software with infrequent, versioned releases. The branching complexity can slow integration and create merge conflicts. Trunk-Based Development (TBD) has developers commit directly to main (or via short-lived feature branches < 2 days old), using feature flags to hide incomplete work. TBD is required for true continuous integration — if code is not merged daily, it is not CI. High-performing teams use TBD; GitFlow is common in enterprise and embedded software contexts.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I manage secrets in a DevOps pipeline securely?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Never store secrets in Git — not even encrypted. Use these approaches: (1) CI/CD platform secrets (GitHub Actions Secrets, GitLab CI Variables) — encrypted at rest, masked in logs; (2) HashiCorp Vault — dynamic secrets, short-lived tokens, audit logs, secret leasing; (3) Cloud-native solutions — AWS Secrets Manager, GCP Secret Manager, Azure Key Vault — integrate with IAM for fine-grained access; (4) OIDC authentication — let GitHub Actions assume AWS/GCP roles without storing long-lived credentials at all. Rotate secrets regularly, use least-privilege access, and scan commits for accidentally committed secrets with tools like Gitleaks or TruffleHog.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is DevSecOps and what tools implement it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'DevSecOps integrates security practices into every stage of the DevOps lifecycle instead of treating security as a final gate. Key practices: SAST (Static Application Security Testing) — analyze source code for vulnerabilities with Semgrep, SonarQube, or CodeQL; DAST (Dynamic Application Security Testing) — test running applications with OWASP ZAP; SCA (Software Composition Analysis) — scan dependencies for CVEs with Snyk or Dependabot; container image scanning with Trivy or Grype; secrets detection with Gitleaks; and IaC security scanning with Checkov or tfsec. The goal is to catch security issues at the cheapest point — during development — rather than in production.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the role of a DevOps engineer vs a platform engineer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A DevOps engineer typically embeds within product teams, owns the CI/CD pipeline, manages deployments, and bridges dev and ops. The role is broad and varies widely by company. A Platform Engineer builds internal developer platforms (IDPs) — the tools, pipelines, and abstractions that development teams use. Platform engineering treats developers as internal customers and focuses on golden paths (opinionated, paved roads for common tasks), self-service infrastructure, and reducing cognitive load. Platform engineering is DevOps at scale: instead of each team building their own CI/CD, a platform team builds it once and every team uses it.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '0 8px 8px 0',
          padding: '16px 20px',
          marginBottom: '32px',
        }}
      >
        <strong style={{ color: '#0369a1', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          TL;DR
        </strong>
        <p style={{ margin: '8px 0 0', color: '#0c4a6e', lineHeight: '1.6' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '36px',
        }}
      >
        <strong style={{ color: '#1e293b', fontSize: '15px' }}>Key Takeaways</strong>
        <ul style={{ margin: '12px 0 0', paddingLeft: '20px', color: '#334155', lineHeight: '1.8' }}>
          <li>CI/CD pipelines are the backbone of DevOps — automate build, test, and deploy on every commit.</li>
          <li>Docker multi-stage builds shrink image sizes by 60–90% and eliminate build-time secrets from final images.</li>
          <li>Terraform state management and workspaces enable safe, repeatable infrastructure across environments.</li>
          <li>GitOps (ArgoCD/Flux) makes Kubernetes deployments auditable, reversible, and pull-based.</li>
          <li>Prometheus + Grafana is the open-source observability stack for metrics; OpenTelemetry unifies traces and logs.</li>
          <li>DORA metrics — deployment frequency, lead time, MTTR, change failure rate — quantify DevOps maturity.</li>
          <li>DevSecOps shifts security left: SAST, container scanning, and secrets detection run in the CI pipeline.</li>
        </ul>
      </div>

      <h2>1. DevOps Culture and Principles</h2>
      <p>
        <strong>DevOps</strong> is a set of practices, cultural philosophies, and tools that increase an
        organization's ability to deliver applications and services at high velocity. The word is a
        portmanteau of <em>development</em> and <em>operations</em>, but DevOps is fundamentally about
        breaking organizational silos — the wall between the teams that write code and the teams that run
        it in production.
      </p>
      <p>
        The five CALMS pillars define what DevOps looks like in practice:
      </p>
      <ul>
        <li>
          <strong>Culture</strong>: Shared ownership of the full software lifecycle. Developers care about
          production reliability; operations engineers collaborate on software design. Blameless
          postmortems replace blame culture.
        </li>
        <li>
          <strong>Automation</strong>: Automate everything repetitive — builds, tests, deployments,
          infrastructure provisioning, and compliance checks. If a human does it twice, automate it.
        </li>
        <li>
          <strong>Lean</strong>: Apply lean manufacturing principles — minimize work in progress (WIP),
          eliminate waste (toil, manual steps), and optimize for flow through the value stream.
        </li>
        <li>
          <strong>Measurement</strong>: You cannot improve what you do not measure. DORA metrics quantify
          delivery performance; SLOs and error budgets quantify reliability.
        </li>
        <li>
          <strong>Sharing</strong>: Knowledge sharing through documentation, runbooks, internal wikis,
          and post-incident reviews. What one team learns, the whole organization benefits from.
        </li>
      </ul>

      <h3>DORA Metrics: Measuring DevOps Maturity</h3>
      <p>
        The DevOps Research and Assessment (DORA) team identified four metrics that reliably predict
        organizational performance:
      </p>
      <pre><code className="language-text">{`DORA Metrics — Performance Tiers

Metric                    Elite           High           Medium          Low
--------------------      -----           ----           ------          ---
Deployment Frequency      Multiple/day    1/day-1/wk     1/wk-1/mo       < 1/mo
Lead Time for Changes     < 1 hour        1d – 1wk       1wk – 1mo       > 6 months
Change Failure Rate       0–15%           0–15%          16–30%          16–30%
MTTR (recovery time)      < 1 hour        < 1 day        < 1 day         > 6 months

Elite performers deploy 208x more frequently than low performers.
Elite performers have 2,604x shorter lead times.
Elite performers recover from failures 2,604x faster.`}</code></pre>

      <h3>Key DevOps Practices</h3>
      <ul>
        <li>
          <strong>Continuous Integration (CI)</strong>: Developers merge code to a shared branch multiple
          times per day. Automated builds and tests verify every change within minutes.
        </li>
        <li>
          <strong>Continuous Delivery (CD)</strong>: Every passing build is a release candidate. Deployment
          to production is a business decision, not a technical one.
        </li>
        <li>
          <strong>Shift-Left Testing</strong>: Move testing earlier in the development lifecycle. Unit tests
          in the IDE, integration tests in CI, security scans before merge — not after deployment.
        </li>
        <li>
          <strong>Infrastructure as Code (IaC)</strong>: Manage servers, networks, and databases through
          version-controlled configuration files, not manual console clicks.
        </li>
        <li>
          <strong>Observability</strong>: Instrument systems so you can ask arbitrary questions about their
          behavior in production using metrics, logs, and distributed traces.
        </li>
      </ul>

      <h2>2. Git Workflows for DevOps Teams</h2>
      <p>
        The git workflow a team adopts directly affects its deployment frequency and integration pain.
        Two dominant models exist: GitFlow and Trunk-Based Development.
      </p>

      <h3>Trunk-Based Development (TBD)</h3>
      <p>
        TBD is the workflow associated with high-performing teams. Developers integrate into{' '}
        <code>main</code> (the trunk) at least once per day via short-lived feature branches (ideally
        less than 2 days old). Feature flags hide incomplete functionality from users. TBD is a
        prerequisite for true CI — if code is not merged daily, it is not continuous integration.
      </p>
      <pre><code className="language-bash">{`# Trunk-Based Development: typical developer workflow

# 1. Start fresh from trunk
git checkout main && git pull origin main

# 2. Create a short-lived feature branch
git checkout -b feature/add-payment-webhook

# 3. Work in small, focused commits
git add src/webhooks/payment.ts
git commit -m "feat(webhook): add Stripe payment event handler"

# 4. Push and open a PR — CI runs immediately
git push origin feature/add-payment-webhook

# 5. After CI passes and review is done, squash-merge to main
# 6. Delete the feature branch (it lived < 48 hours)
git branch -d feature/add-payment-webhook`}</code></pre>

      <h3>Conventional Commits</h3>
      <p>
        Conventional Commits is a specification for adding human and machine-readable meaning to commit
        messages. It enables automated changelog generation, semantic versioning, and filtered git log.
      </p>
      <pre><code className="language-bash">{`# Conventional Commits format:
# <type>(<scope>): <description>
# [optional body]
# [optional footer(s)]

# Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert

# Examples:
git commit -m "feat(auth): add OAuth2 login with GitHub provider"
git commit -m "fix(api): handle null response from payment gateway"
git commit -m "perf(query): add index on users.email column"
git commit -m "ci(github): add matrix build for Node 20 and 22"
git commit -m "feat!: remove deprecated v1 API endpoints"
# The ! signals a breaking change — triggers a major version bump`}</code></pre>

      <h3>Branch Protection Rules</h3>
      <pre><code className="language-yaml">{`# GitHub branch protection configuration (via GitHub CLI or API)
# Enforce on: main, release/*

Branch Protection Rules for "main":
  require_status_checks_to_pass: true
    required_checks:
      - ci / lint
      - ci / unit-tests
      - ci / build
      - security / trivy-scan
  require_pull_request_reviews:
    required_approving_review_count: 1
    dismiss_stale_reviews: true
    require_code_owner_review: true
  require_linear_history: true       # No merge commits
  require_signed_commits: false       # Optional GPG signing
  allow_force_pushes: false
  allow_deletions: false`}</code></pre>

      <h2>3. CI/CD with GitHub Actions</h2>
      <p>
        GitHub Actions is the most widely used CI/CD platform for open-source and cloud-native projects.
        Workflows are YAML files stored in <code>.github/workflows/</code>. For cron scheduling patterns,
        see our{' '}
        <Link href={`/${lang}/blog/cron-expression-examples`}>Cron Expression Examples</Link> guide.
      </p>

      <h3>Complete CI Pipeline with Caching and Matrix Builds</h3>
      <pre><code className="language-yaml">{`# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ci-\${{ github.ref }}
  cancel-in-progress: true

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  # ── Stage 1: Code Quality (runs in parallel) ──────────────────────
  lint:
    name: Lint & Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npx prettier --check .

  # ── Stage 2: Test Matrix ──────────────────────────────────────────
  test:
    name: Test (Node \${{ matrix.node }})
    runs-on: ubuntu-latest
    needs: lint
    strategy:
      matrix:
        node: ['20', '22']
      fail-fast: false
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node }}
          cache: 'npm'
      - run: npm ci
      - name: Run tests with coverage
        run: npm run test -- --coverage --ci --reporters=junit
      - uses: actions/upload-artifact@v4
        with:
          name: coverage-node-\${{ matrix.node }}
          path: coverage/

  # ── Stage 3: Build Docker image ───────────────────────────────────
  build:
    name: Build & Push Image
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    permissions:
      contents: read
      packages: write
    outputs:
      image-tag: \${{ steps.meta.outputs.tags }}
      image-digest: \${{ steps.push.outputs.digest }}
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=sha-
            type=raw,value=latest,enable=\${{ github.ref == 'refs/heads/main' }}

      - name: Build and push with layer caching
        id: push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          platforms: linux/amd64,linux/arm64

  # ── Stage 4: Security Scanning ────────────────────────────────────
  security:
    name: Security Scan
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - name: Trivy filesystem scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          severity: 'CRITICAL,HIGH'
          format: 'sarif'
          output: 'trivy-results.sarif'
      - uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: trivy-results.sarif
      - name: Detect leaked secrets
        uses: trufflesecurity/trufflehog@main
        with:
          extra_args: --only-verified`}</code></pre>

      <h3>Reusable Workflows and Secrets</h3>
      <pre><code className="language-yaml">{`# .github/workflows/deploy.yml — CD pipeline using OIDC (no long-lived credentials)
name: Deploy

on:
  workflow_run:
    workflows: [CI]
    types: [completed]
    branches: [main]

jobs:
  deploy-production:
    if: \${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://example.com
    permissions:
      id-token: write    # Required for OIDC
      contents: read

    steps:
      - uses: actions/checkout@v4

      # OIDC — no AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY needed
      - name: Authenticate to AWS via OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/github-deploy
          aws-region: us-east-1

      - name: Deploy to ECS
        run: |
          aws ecs update-service \\
            --cluster production \\
            --service myapp \\
            --force-new-deployment

      - name: Wait for deployment to stabilize
        run: |
          aws ecs wait services-stable \\
            --cluster production \\
            --services myapp`}</code></pre>

      <h2>4. Docker in DevOps</h2>
      <p>
        Docker is the foundation of modern CI/CD. Containers provide reproducible, isolated environments
        from development through production. See our{' '}
        <Link href={`/${lang}/blog/docker-multi-stage-builds`}>Docker Multi-Stage Builds</Link> guide
        for deep-dive optimization techniques.
      </p>

      <h3>Production Multi-Stage Dockerfile</h3>
      <pre><code className="language-dockerfile">{`# Multi-stage build for a Node.js application
# Stage 1: Install all dependencies (including devDependencies)
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build the application
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production runtime (smallest possible image)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Run as non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only what is needed for production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000

# Health check for container orchestrators
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \\
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "dist/server.js"]`}</code></pre>

      <h3>Docker Compose for Local Development</h3>
      <pre><code className="language-yaml">{`# docker-compose.yml — Full local development stack
version: '3.9'

services:
  app:
    build:
      context: .
      target: deps             # Stop at deps stage for hot reload
    volumes:
      - .:/app
      - /app/node_modules      # Prevent host node_modules override
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgres://dev:dev@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    command: npm run dev

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./scripts/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dev -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Observability stack in development
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    ports:
      - "3001:3000"
    volumes:
      - grafana-data:/var/lib/grafana

volumes:
  postgres-data:
  grafana-data:`}</code></pre>

      <h3>Container Registry and Image Tagging Strategy</h3>
      <pre><code className="language-bash">{`# Image tagging best practices
# Never use :latest in production — it is mutable and ambiguous

# Tag by git SHA (immutable, traceable)
docker build -t registry.example.com/myapp:sha-a1b2c3d .

# Tag by semantic version for releases
docker build -t registry.example.com/myapp:v2.4.1 .

# Multi-arch build for AMD64 and ARM64
docker buildx build \\
  --platform linux/amd64,linux/arm64 \\
  --tag registry.example.com/myapp:sha-a1b2c3d \\
  --push .

# Scan image for vulnerabilities before pushing
trivy image registry.example.com/myapp:sha-a1b2c3d \\
  --severity CRITICAL,HIGH \\
  --exit-code 1`}</code></pre>

      <h2>5. Infrastructure as Code (IaC)</h2>
      <p>
        Infrastructure as Code eliminates configuration drift, enables disaster recovery, and makes
        infrastructure changes auditable through pull requests. Terraform is the dominant tool; Pulumi
        offers a general-purpose programming language alternative.
      </p>

      <h3>Terraform: VPC and ECS Cluster</h3>
      <pre><code className="language-hcl">{`# main.tf — AWS infrastructure for a containerized application
terraform {
  required_version = ">= 1.7"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "production/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"  # State locking prevents conflicts
  }
}

provider "aws" {
  region = var.aws_region
}

# ── VPC ─────────────────────────────────────────────────────────────
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.5.2"

  name = "\${var.app_name}-\${var.environment}"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  private_subnets = ["10.0.11.0/24", "10.0.12.0/24", "10.0.13.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = var.environment != "production"  # Cost optimization
}

# ── ECS Cluster ─────────────────────────────────────────────────────
resource "aws_ecs_cluster" "main" {
  name = "\${var.app_name}-\${var.environment}"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_ecs_task_definition" "app" {
  family                   = var.app_name
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.task_cpu
  memory                   = var.task_memory
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([{
    name  = var.app_name
    image = "\${var.ecr_repository_url}:\${var.image_tag}"
    portMappings = [{ containerPort = 3000, protocol = "tcp" }]
    environment = [{ name = "NODE_ENV", value = var.environment }]
    secrets = [
      { name = "DATABASE_URL", valueFrom = aws_ssm_parameter.db_url.arn }
    ]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-group         = "/ecs/\${var.app_name}"
        awslogs-region        = var.aws_region
        awslogs-stream-prefix = "ecs"
      }
    }
    healthCheck = {
      command     = ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"]
      interval    = 30
      timeout     = 5
      retries     = 3
      startPeriod = 60
    }
  }])
}

# ── variables.tf ─────────────────────────────────────────────────────
variable "environment" {
  description = "Deployment environment"
  type        = string
  validation {
    condition     = contains(["staging", "production"], var.environment)
    error_message = "Environment must be staging or production."
  }
}`}</code></pre>

      <h3>Terraform Workspace Strategy</h3>
      <pre><code className="language-bash">{`# Use workspaces for environment isolation
terraform workspace new staging
terraform workspace new production

# Deploy to staging
terraform workspace select staging
terraform plan -var="environment=staging" -out=staging.plan
terraform apply staging.plan

# Deploy to production (requires separate approval)
terraform workspace select production
terraform plan -var="environment=production" -out=prod.plan
terraform apply prod.plan

# Check for drift (what's changed outside Terraform)
terraform plan -refresh-only`}</code></pre>

      <h3>Ansible for Configuration Management</h3>
      <pre><code className="language-yaml">{`# playbook.yml — Configure application servers
---
- name: Configure application servers
  hosts: app_servers
  become: true
  vars:
    app_version: "{{ lookup('env', 'APP_VERSION') }}"
    node_version: "22"

  tasks:
    - name: Install Node.js via NVM
      shell: |
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
        . ~/.nvm/nvm.sh && nvm install {{ node_version }}
      args:
        creates: "/root/.nvm/versions/node/v{{ node_version }}"

    - name: Deploy application
      git:
        repo: "https://github.com/org/myapp.git"
        dest: /app
        version: "{{ app_version }}"
        force: true

    - name: Install dependencies
      npm:
        path: /app
        ci: true
        production: true

    - name: Ensure app service is running
      systemd:
        name: myapp
        state: restarted
        enabled: true
        daemon_reload: true`}</code></pre>

      <h2>6. Monitoring and Observability</h2>
      <p>
        Observability is the ability to understand the internal state of a system from its external
        outputs. The three pillars are metrics (numeric time-series), logs (structured event records),
        and distributed traces (request flows across services). The fourth pillar — profiles — enables
        continuous CPU and memory profiling in production.
      </p>

      <h3>Prometheus Configuration</h3>
      <pre><code className="language-yaml">{`# prometheus.yml — Scrape configuration
global:
  scrape_interval: 15s
  evaluation_interval: 15s
  external_labels:
    environment: production
    region: us-east-1

rule_files:
  - "alerts/*.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets: ["alertmanager:9093"]

scrape_configs:
  - job_name: 'myapp'
    static_configs:
      - targets: ['myapp:3000']
    metrics_path: /metrics
    scrape_interval: 10s

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']`}</code></pre>

      <h3>Alerting Rules</h3>
      <pre><code className="language-yaml">{`# alerts/application.yml — Prometheus alerting rules
groups:
  - name: application
    interval: 30s
    rules:
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
          /
          sum(rate(http_requests_total[5m])) > 0.05
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High HTTP error rate: {{ $value | humanizePercentage }}"
          description: "Error rate above 5% for 2 minutes. Investigate immediately."
          runbook: "https://runbooks.example.com/high-error-rate"

      - alert: HighLatency
        expr: |
          histogram_quantile(0.99,
            sum(rate(http_request_duration_seconds_bucket[5m])) by (le, handler)
          ) > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "P99 latency above 2s for {{ $labels.handler }}"

      - alert: ContainerOOMKilled
        expr: kube_pod_container_status_last_terminated_reason{reason="OOMKilled"} == 1
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: "Container OOMKilled: {{ $labels.container }} in {{ $labels.pod }}"
          description: "Increase memory limit or investigate memory leak."

      - alert: PodCrashLooping
        expr: |
          increase(kube_pod_container_status_restarts_total[15m]) > 3
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: "Pod {{ $labels.pod }} is crash-looping"
          description: "Container {{ $labels.container }} restarted 3+ times in 15 minutes."

      - alert: DiskSpaceRunningLow
        expr: |
          (node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100 < 15
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Disk space below 15% on {{ $labels.instance }}"
          description: "Filesystem {{ $labels.mountpoint }} is {{ $value | humanize }}% free."`}</code></pre>

      <h3>Structured Logging and OpenTelemetry</h3>
      <pre><code className="language-typescript">{`// Structured logging with Pino (Node.js)
import pino from 'pino';
import { trace, context } from '@opentelemetry/api';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  // Automatically inject trace context into every log line
  mixin() {
    const span = trace.getActiveSpan();
    if (!span) return {};
    const { traceId, spanId } = span.spanContext();
    return { traceId, spanId };
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

// Usage: structured fields, not string interpolation
logger.info({ userId: '123', action: 'checkout', items: 3 }, 'Cart checkout initiated');
logger.error({ err, orderId: '456', retryCount: 2 }, 'Payment processing failed');

// OpenTelemetry tracing setup (SDK initialization)
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { PgInstrumentation } from '@opentelemetry/instrumentation-pg';

const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'myapp',
    'deployment.environment': process.env.NODE_ENV,
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTLP_ENDPOINT || 'http://otel-collector:4317',
  }),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new PgInstrumentation(),  // Auto-instrument all DB queries
  ],
});

sdk.start();`}</code></pre>

      <h2>7. Kubernetes in Production</h2>
      <p>
        Kubernetes is the industry-standard container orchestration platform. For a complete Kubernetes
        reference, see our{' '}
        <Link href={`/${lang}/blog/kubernetes-guide`}>Kubernetes Complete Guide</Link>. This section
        focuses on production patterns: Helm, GitOps, and horizontal autoscaling.
      </p>

      <h3>Helm Chart Structure</h3>
      <pre><code className="language-text">{`myapp/
├── Chart.yaml              # Chart metadata (name, version, appVersion)
├── values.yaml             # Default configuration values
├── values-staging.yaml     # Staging overrides
├── values-production.yaml  # Production overrides
└── templates/
    ├── _helpers.tpl        # Named templates (labels, selectors)
    ├── deployment.yaml
    ├── service.yaml
    ├── ingress.yaml
    ├── hpa.yaml
    ├── configmap.yaml
    ├── secret.yaml         # External-secrets or sealed-secrets
    ├── serviceaccount.yaml
    └── NOTES.txt           # Post-install instructions`}</code></pre>

      <pre><code className="language-yaml">{`# values.yaml — Default Helm chart values
replicaCount: 2

image:
  repository: registry.example.com/myapp
  tag: latest
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80
  targetPort: 3000

ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
  hosts:
    - host: example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: example-com-tls
      hosts:
        - example.com

resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
  targetMemoryUtilizationPercentage: 80

readinessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 10
  periodSeconds: 5

livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 15
  failureThreshold: 3`}</code></pre>

      <h3>GitOps with ArgoCD</h3>
      <pre><code className="language-yaml">{`# argocd-application.yaml — Deploy via GitOps
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp-production
  namespace: argocd
  annotations:
    # Notify Slack on sync status changes
    notifications.argoproj.io/subscribe.on-sync-failed.slack: devops-alerts
    notifications.argoproj.io/subscribe.on-deployed.slack: deployments
spec:
  project: default
  source:
    repoURL: https://github.com/org/myapp
    targetRevision: main
    path: helm/myapp
    helm:
      valueFiles:
        - values-production.yaml
      parameters:
        - name: image.tag
          value: sha-a1b2c3d    # Set by CI pipeline after push

  destination:
    server: https://kubernetes.default.svc
    namespace: production

  syncPolicy:
    automated:
      prune: true       # Delete resources removed from Git
      selfHeal: true    # Revert manual kubectl changes automatically
    syncOptions:
      - CreateNamespace=true
      - PruneLast=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        maxDuration: 3m
        factor: 2`}</code></pre>

      <h3>Horizontal Pod Autoscaler with Custom Metrics</h3>
      <pre><code className="language-yaml">{`# hpa.yaml — Scale on CPU and custom Prometheus metrics
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
    - type: Pods
      pods:
        metric:
          name: http_requests_per_second   # Custom metric via Prometheus Adapter
        target:
          type: AverageValue
          averageValue: 1000
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60       # Scale up quickly
      policies:
        - type: Pods
          value: 4
          periodSeconds: 60
    scaleDown:
      stabilizationWindowSeconds: 300      # Scale down slowly (5 minutes)
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60`}</code></pre>

      <h2>8. Security in DevOps (DevSecOps)</h2>
      <p>
        DevSecOps integrates security into every phase of the software development lifecycle. The
        principle is simple: security issues caught in a developer's IDE cost orders of magnitude less
        to fix than issues discovered in production. See our{' '}
        <Link href={`/${lang}/blog/docker-security-best-practices`}>Docker Security Best Practices</Link>{' '}
        for container-specific hardening.
      </p>

      <h3>SAST and Dependency Scanning in CI</h3>
      <pre><code className="language-yaml">{`# .github/workflows/security.yml
name: Security

on:
  push:
    branches: [main]
  pull_request:
  schedule:
    - cron: '0 6 * * 1'   # Weekly full scan every Monday at 6am

jobs:
  sast:
    name: Static Analysis
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # CodeQL — GitHub's SAST engine (free for public repos)
      - uses: github/codeql-action/init@v3
        with:
          languages: javascript, typescript
          queries: +security-extended

      - uses: github/codeql-action/autobuild@v3

      - uses: github/codeql-action/analyze@v3
        with:
          category: /language:javascript

      # Semgrep — fast, rule-based SAST
      - uses: returntocorp/semgrep-action@v1
        with:
          config: >-
            p/typescript
            p/nodejs
            p/owasp-top-ten

  dependency-scan:
    name: Dependency Vulnerabilities
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Snyk for npm dependency CVEs
      - name: Snyk dependency check
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

      # Check for known vulnerable packages
      - name: npm audit
        run: npm audit --audit-level=high

  container-scan:
    name: Container Image Scan
    runs-on: ubuntu-latest
    needs: []    # Run in parallel
    steps:
      - uses: actions/checkout@v4

      - name: Build image for scanning
        run: docker build -t scan-target:latest .

      # Trivy — comprehensive container scanner
      - name: Scan with Trivy
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'scan-target:latest'
          format: 'sarif'
          output: 'trivy-container.sarif'
          severity: 'CRITICAL,HIGH'
          exit-code: '1'

      - uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: trivy-container.sarif

  iac-scan:
    name: IaC Security Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # Checkov — Terraform/Kubernetes/Dockerfile security scanning
      - uses: bridgecrewio/checkov-action@master
        with:
          directory: terraform/
          framework: terraform
          output_format: sarif
          output_file_path: checkov.sarif

      - uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: checkov.sarif`}</code></pre>

      <h3>Secrets Management with HashiCorp Vault</h3>
      <pre><code className="language-bash">{`# HashiCorp Vault: dynamic database credentials
# Vault issues short-lived, auto-rotating Postgres credentials

# Configure the database secrets engine
vault secrets enable database

vault write database/config/myapp-postgres \\
  plugin_name=postgresql-database-plugin \\
  allowed_roles="myapp-role" \\
  connection_url="postgresql://{{username}}:{{password}}@postgres:5432/myapp" \\
  username="vault-root" \\
  password="vault-root-password"

# Define a role that creates read/write credentials
vault write database/roles/myapp-role \\
  db_name=myapp-postgres \\
  creation_statements="CREATE ROLE \"{{name}}\" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}'; GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO \"{{name}}\";" \\
  revocation_statements="DROP ROLE IF EXISTS \"{{name}}\";" \\
  default_ttl="1h" \\
  max_ttl="24h"

# Application reads dynamic credentials at startup (rotated automatically)
vault read database/creds/myapp-role
# Key                Value
# lease_id           database/creds/myapp-role/abc123
# lease_duration     1h0m0s
# lease_renewable    true
# password           A1a-8k9j2...  (temporary, auto-expires)
# username           v-myapp-role-xyz123  (temporary)`}</code></pre>

      <h2>9. CI/CD Platform Comparison</h2>
      <p>
        Choosing the right CI/CD platform depends on your hosting model, language ecosystem, and
        existing tool investments. Here is how the four major platforms compare:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Feature</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>GitHub Actions</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>GitLab CI/CD</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Jenkins</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>CircleCI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}><strong>Hosting</strong></td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Cloud (GitHub.com) or self-hosted runners</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Cloud or fully self-hosted</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Self-hosted only</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Cloud or self-hosted</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}><strong>Config Format</strong></td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>YAML (.github/workflows/)</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>YAML (.gitlab-ci.yml)</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Groovy DSL (Jenkinsfile)</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>YAML (.circleci/config.yml)</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}><strong>Free Tier</strong></td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>2,000 min/month (public: unlimited)</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>400 min/month (SaaS)</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Free (self-host costs)</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>6,000 min/month</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}><strong>Ecosystem</strong></td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>21,000+ Actions on Marketplace</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Built-in templates, CI Components</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>1,800+ plugins</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Orbs (reusable packages)</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}><strong>Docker Support</strong></td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Native, BuildKit, QEMU</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Docker-in-Docker (DinD) built-in</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Plugin required</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Native Docker layer caching</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}><strong>Secrets Management</strong></td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Org/repo/environment secrets + OIDC</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Protected CI variables + Vault integration</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Credentials plugin + Vault</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Contexts, environment variables</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}><strong>Matrix Builds</strong></td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Native strategy.matrix</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>parallel keyword</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Matrix plugin</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Native matrix</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}><strong>Reusable Pipelines</strong></td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Reusable workflows, composite actions</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>include, extends, CI components</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Shared libraries</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Orbs</td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}><strong>Best For</strong></td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>GitHub-hosted projects, open source</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Self-hosted, regulated industries</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Legacy enterprise, max customization</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0' }}>Optimized Docker build speed</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '9px 14px' }}><strong>Weaknesses</strong></td>
              <td style={{ padding: '9px 14px' }}>Vendor lock-in to GitHub</td>
              <td style={{ padding: '9px 14px' }}>Complex YAML for large pipelines</td>
              <td style={{ padding: '9px 14px' }}>High maintenance overhead</td>
              <td style={{ padding: '9px 14px' }}>Smaller ecosystem than Actions</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>10. DevOps Toolchain Overview</h2>
      <p>
        A mature DevOps toolchain covers each phase of the software delivery lifecycle. The following
        represents the industry-standard toolkit in 2026:
      </p>
      <pre><code className="language-text">{`DevOps Toolchain by Phase

Phase                   Tools (most popular first)
-----------             ----------------------------------------------
Source Control          Git, GitHub, GitLab, Bitbucket
CI/CD                   GitHub Actions, GitLab CI, Jenkins, CircleCI, Buildkite
Containerization        Docker, Podman, containerd
Orchestration           Kubernetes, Docker Swarm, HashiCorp Nomad
Package Management      Helm, Kustomize, ArgoCD
IaC                     Terraform, Pulumi, Ansible, AWS CDK, Crossplane
Secrets Management      HashiCorp Vault, AWS Secrets Manager, Doppler, Infisical
Artifact Registry       GitHub GHCR, AWS ECR, Google Artifact Registry, JFrog Artifactory
Metrics                 Prometheus, Grafana, Datadog, New Relic, VictoriaMetrics
Logging                 Loki, ELK Stack, Datadog, Splunk, Cloudwatch
Tracing                 Jaeger, Tempo, Honeycomb, Datadog APM
Alerting                PagerDuty, OpsGenie, Grafana Alertmanager, Signoz
SAST                    CodeQL, Semgrep, SonarQube, Snyk Code
Container Scanning      Trivy, Grype, Snyk Container, Anchore
SCA / Deps              Dependabot, Snyk, OWASP Dependency-Check
IaC Security            Checkov, tfsec, Terrascan, Regula
Incident Management     PagerDuty, Incident.io, Grafana Incident
Feature Flags           LaunchDarkly, Unleash, Flagsmith, OpenFeature`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>What is the difference between DevOps and SRE?</h3>
      <p>
        DevOps is a cultural and organizational philosophy focused on breaking silos between development
        and operations teams through automation, shared ownership, and continuous delivery. SRE (Site
        Reliability Engineering), coined by Google, is a specific implementation of DevOps principles
        using software engineering to solve operations problems. SREs define SLOs, manage error budgets,
        and own reliability at scale. DevOps is the "what and why"; SRE is one "how".
      </p>

      <h3>What are DORA metrics and why do they matter?</h3>
      <p>
        DORA metrics — Deployment Frequency, Lead Time for Changes, Mean Time to Restore (MTTR), and
        Change Failure Rate — are the most evidence-based way to measure software delivery performance.
        Elite performers deploy 208x more frequently than low performers and recover from failures
        2,604x faster. They provide objective benchmarks for DevOps maturity conversations with
        leadership and guide where to invest improvement efforts.
      </p>

      <h3>What is Infrastructure as Code and should I use Terraform or Pulumi?</h3>
      <p>
        IaC means managing cloud resources through version-controlled configuration files. Terraform
        (HCL language) has the largest provider ecosystem and community. Pulumi uses TypeScript, Python,
        or Go — better for teams wanting loops, conditionals, and type safety. Choose Terraform for
        maximum community resources; choose Pulumi if your team prefers general-purpose programming
        languages.
      </p>

      <h3>What is GitOps and how does ArgoCD implement it?</h3>
      <p>
        GitOps makes Git the single source of truth for both application code and infrastructure
        configuration. ArgoCD continuously reconciles the actual Kubernetes cluster state to match the
        desired state in Git. All changes go through pull requests, providing a full audit trail and
        easy rollback (just revert a commit).
      </p>

      <h3>Trunk-Based Development vs GitFlow: which should I use?</h3>
      <p>
        Use Trunk-Based Development if you want high deployment frequency — it is the workflow of elite
        performers. Developers integrate into <code>main</code> at least once per day via short-lived
        branches; feature flags hide incomplete work. Use GitFlow only if your software has infrequent,
        versioned releases (firmware, mobile apps with app store cycles).
      </p>

      <h3>How do I manage secrets in a DevOps pipeline securely?</h3>
      <p>
        Never store secrets in Git. Use: CI/CD platform secrets (GitHub Actions Secrets, GitLab CI
        Variables) for simplicity; HashiCorp Vault for dynamic secrets with auto-rotation; cloud-native
        solutions (AWS Secrets Manager, GCP Secret Manager) for IAM-integrated access; and OIDC
        authentication to eliminate long-lived credentials from pipelines entirely.
      </p>

      <h3>What is DevSecOps and which tools implement it?</h3>
      <p>
        DevSecOps integrates security into every SDLC phase. Key tools: CodeQL and Semgrep for SAST;
        Trivy and Grype for container image scanning; Snyk and Dependabot for dependency CVEs;
        Checkov and tfsec for IaC security; Gitleaks and TruffleHog for secrets detection in git
        history. The goal: catch security issues during development, not in production.
      </p>

      <h3>What is the role of a DevOps engineer vs a platform engineer?</h3>
      <p>
        A DevOps engineer embeds within product teams, owns CI/CD, and bridges dev and ops. A Platform
        Engineer builds Internal Developer Platforms (IDPs) — the tools, pipelines, and abstractions
        that every development team uses. Platform engineering is DevOps at scale: instead of each
        team building their own pipeline, the platform team builds it once and everyone benefits.
      </p>

      <h2>Conclusion</h2>
      <p>
        DevOps is not a tool or a job title — it is a continuous journey of improving how software is
        delivered and operated. Start with the fundamentals: version control everything, automate your
        build and test pipeline, containerize your applications, and measure your DORA metrics to
        understand where you stand today. From there, incrementally add sophistication: adopt IaC for
        your infrastructure, implement GitOps for Kubernetes deployments, build out your observability
        stack, and shift security left with DevSecOps practices.
      </p>
      <p>
        The compounding returns of DevOps investment are extraordinary — elite teams deploy hundreds
        of times per day with lower change failure rates than teams deploying monthly. The journey
        starts with a single automated pipeline.
      </p>
      <p>
        Explore these related guides: our{' '}
        <Link href={`/${lang}/blog/docker-compose-tutorial`}>Docker Compose Tutorial</Link>,{' '}
        <Link href={`/${lang}/blog/github-actions-ci-cd`}>GitHub Actions CI/CD Guide</Link>, and{' '}
        <Link href={`/${lang}/blog/kubernetes-guide`}>Kubernetes Complete Guide</Link>. Use our{' '}
        <Link href={`/${lang}/tools/cron-expression-generator`}>Cron Expression Generator</Link> for
        scheduling CI jobs and our{' '}
        <Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> for working with API
        responses and configuration files.
      </p>
    </>
  );
}
