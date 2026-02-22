'use client';

import Link from 'next/link';

export default function GithubActionsTutorial({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Are GitHub Actions?</h2>
      <p>
        <strong>GitHub Actions</strong> is a CI/CD and workflow automation platform built directly into GitHub. It allows you to automate building, testing, and deploying your code whenever events occur in your repository -- such as pushes, pull requests, issue creation, or scheduled triggers. Since its launch, GitHub Actions has become one of the most popular CI/CD solutions due to its tight integration with GitHub and generous free tier.
      </p>
      <p>
        This tutorial covers everything from writing your first workflow to advanced patterns including matrix builds, reusable workflows, self-hosted runners, caching, secrets management, and deployment strategies. By the end, you will be able to set up production-grade CI/CD pipelines for any project.
      </p>

      <h2>Core Concepts</h2>
      <pre><code className="language-text">{`GitHub Actions Hierarchy:

  Workflow (.yml file)
    └── Job (runs on a runner)
        └── Step (individual task)
            └── Action (reusable unit)

Key Terms:
  Workflow   - Automated process defined in YAML
  Event      - Trigger that starts a workflow (push, PR, schedule)
  Job        - Set of steps that run on the same runner
  Step       - Individual task (run command or use action)
  Action     - Reusable unit of code (from Marketplace or custom)
  Runner     - Server that executes jobs (GitHub-hosted or self-hosted)
  Artifact   - Files produced by a workflow (build output, logs)
  Secret     - Encrypted environment variable`}</code></pre>

      <h2>Your First Workflow</h2>
      <p>
        Workflows are defined as YAML files in the <code>.github/workflows/</code> directory of your repository. Here is a complete CI workflow for a Node.js project that runs tests on every push and pull request.
      </p>
      <pre><code className="language-yaml">{`# .github/workflows/ci.yml
name: CI

# Triggers
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

# Cancel in-progress runs for the same ref
concurrency:
  group: ci-$\{github.ref}
  cancel-in-progress: true

jobs:
  test:
    name: Test
    runs-on: ubuntu-latest

    steps:
      # 1. Check out code
      - name: Checkout repository
        uses: actions/checkout@v4

      # 2. Set up Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      # 3. Install dependencies
      - name: Install dependencies
        run: npm ci

      # 4. Run linter
      - name: Lint
        run: npm run lint

      # 5. Run tests
      - name: Run tests
        run: npm test

      # 6. Build
      - name: Build
        run: npm run build`}</code></pre>

      <h2>Workflow Triggers (Events)</h2>
      <p>
        GitHub Actions supports dozens of event triggers. Understanding when and how workflows run is essential for efficient CI/CD pipelines.
      </p>
      <pre><code className="language-yaml">{`# Common triggers

# Push to specific branches
on:
  push:
    branches: [main, 'release/**']
    paths:
      - 'src/**'          # Only run when source code changes
      - '!docs/**'        # Ignore docs changes
    tags:
      - 'v*'              # Run on version tags

# Pull request events
on:
  pull_request:
    types: [opened, synchronize, reopened]
    branches: [main]

# Scheduled (cron)
on:
  schedule:
    - cron: '0 6 * * 1'   # Every Monday at 6:00 UTC

# Manual trigger with inputs
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Deploy environment'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production
      dry_run:
        description: 'Dry run (no actual deploy)'
        type: boolean
        default: false

# Multiple triggers
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:    # Also allow manual runs`}</code></pre>

      <h2>Matrix Builds</h2>
      <p>
        Matrix strategies let you run the same job across multiple configurations -- different operating systems, language versions, or any custom parameter. This is essential for testing cross-platform compatibility.
      </p>
      <pre><code className="language-yaml">{`jobs:
  test:
    name: Test ($\{matrix.os}, Node $\{matrix.node-version})
    runs-on: $\{matrix.os}

    strategy:
      fail-fast: false    # Don't cancel other jobs if one fails
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [18, 20, 22]
        exclude:
          - os: windows-latest
            node-version: 18     # Skip Node 18 on Windows
        include:
          - os: ubuntu-latest
            node-version: 22
            experimental: true   # Extra variable for this combo

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: $\{matrix.node-version}
      - run: npm ci
      - run: npm test
        continue-on-error: $\{matrix.experimental == true}`}</code></pre>

      <h2>Caching and Performance</h2>
      <p>
        Caching dependencies significantly speeds up workflow execution. GitHub provides built-in caching actions that work across workflow runs.
      </p>
      <pre><code className="language-yaml">{`jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Node.js with built-in caching
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'           # Auto-caches ~/.npm

      # Custom cache for build output
      - name: Cache Next.js build
        uses: actions/cache@v4
        with:
          path: |
            .next/cache
            node_modules/.cache
          key: nextjs-$\{runner.os}-$\{hashFiles('package-lock.json')}-$\{hashFiles('src/**')}
          restore-keys: |
            nextjs-$\{runner.os}-$\{hashFiles('package-lock.json')}-
            nextjs-$\{runner.os}-

      - run: npm ci
      - run: npm run build

      # Upload build artifacts
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: .next/
          retention-days: 7`}</code></pre>

      <h2>Secrets and Environment Variables</h2>
      <p>
        GitHub Actions provides encrypted secrets for sensitive data like API keys, tokens, and passwords. Secrets are never exposed in logs and can be scoped to repositories, environments, or organizations.
      </p>
      <pre><code className="language-yaml">{`jobs:
  deploy:
    runs-on: ubuntu-latest

    # Environment with protection rules
    environment:
      name: production
      url: https://example.com

    # Environment variables
    env:
      NODE_ENV: production
      API_BASE_URL: https://api.example.com

    steps:
      - uses: actions/checkout@v4

      # Access secrets
      - name: Deploy
        env:
          AWS_ACCESS_KEY_ID: $\{secrets.AWS_ACCESS_KEY_ID}
          AWS_SECRET_ACCESS_KEY: $\{secrets.AWS_SECRET_ACCESS_KEY}
          DEPLOY_TOKEN: $\{secrets.DEPLOY_TOKEN}
        run: |
          echo "Deploying to production..."
          # Secrets are automatically masked in logs
          aws s3 sync ./dist s3://my-bucket

      # Using GITHUB_TOKEN (automatically provided)
      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: $\{secrets.GITHUB_TOKEN}
        with:
          tag_name: $\{github.ref_name}
          release_name: Release $\{github.ref_name}`}</code></pre>

      <h2>Reusable Workflows</h2>
      <p>
        Reusable workflows let you define a workflow once and call it from other workflows. This eliminates duplication across repositories and ensures consistent CI/CD practices.
      </p>
      <pre><code className="language-yaml">{`# .github/workflows/reusable-deploy.yml (called workflow)
name: Reusable Deploy

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
      node-version:
        required: false
        type: string
        default: '20'
    secrets:
      deploy-token:
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: $\{inputs.environment}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: $\{inputs.node-version}
      - run: npm ci && npm run build
      - name: Deploy
        env:
          TOKEN: $\{secrets.deploy-token}
        run: ./deploy.sh $\{inputs.environment}`}</code></pre>

      <pre><code className="language-yaml">{`# .github/workflows/production.yml (caller workflow)
name: Production Deploy

on:
  push:
    tags: ['v*']

jobs:
  deploy:
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment: production
    secrets:
      deploy-token: $\{secrets.DEPLOY_TOKEN}`}</code></pre>

      <h2>Common CI/CD Patterns</h2>
      <pre><code className="language-yaml">{`# Pattern: Test -> Build -> Deploy pipeline
name: Full Pipeline

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm test -- --coverage
      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/

  build:
    needs: test           # Depends on test job
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  deploy-staging:
    needs: build          # Depends on build job
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/download-artifact@v4
        with: { name: dist }
      - run: echo "Deploy to staging..."

  deploy-production:
    needs: deploy-staging  # Depends on staging deploy
    runs-on: ubuntu-latest
    environment: production
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/download-artifact@v4
        with: { name: dist }
      - run: echo "Deploy to production..."`}</code></pre>

      <h2>Docker and Container Workflows</h2>
      <pre><code className="language-yaml">{`name: Docker Build & Push

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  docker:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: $\{github.actor}
          password: $\{secrets.GITHUB_TOKEN}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/$\{github.repository}
          tags: |
            type=sha
            type=ref,event=branch
            type=semver,pattern={{version}}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: $\{steps.meta.outputs.tags}
          cache-from: type=gha
          cache-to: type=gha,mode=max`}</code></pre>

      <h2>Debugging Workflows</h2>
      <pre><code className="language-yaml">{`# Enable debug logging
# Set repository secret: ACTIONS_RUNNER_DEBUG = true

steps:
  # Print useful context information
  - name: Debug info
    run: |
      echo "Event: $GITHUB_EVENT_NAME"
      echo "Ref: $GITHUB_REF"
      echo "SHA: $GITHUB_SHA"
      echo "Actor: $GITHUB_ACTOR"
      echo "Runner OS: $RUNNER_OS"

  # Conditional step for debugging
  - name: Debug on failure
    if: failure()
    run: |
      echo "Previous step failed!"
      cat logs/error.log || true

  # SSH into runner for debugging (tmate)
  - name: Setup tmate session
    if: failure()
    uses: mxschmitt/action-tmate@v3
    timeout-minutes: 15`}</code></pre>

      <h2>Best Practices</h2>
      <pre><code className="language-text">{`GitHub Actions Best Practices:

Security:
  - Never hardcode secrets in workflow files
  - Pin actions to full commit SHA, not just version tags
  - Use environment protection rules for production deploys
  - Limit GITHUB_TOKEN permissions with 'permissions' key
  - Audit third-party actions before using them

Performance:
  - Use caching for dependencies and build artifacts
  - Enable concurrency groups to cancel stale runs
  - Use matrix strategies wisely (avoid unnecessary combos)
  - Prefer npm ci over npm install
  - Use path filters to skip irrelevant workflows

Maintainability:
  - Use reusable workflows to eliminate duplication
  - Keep workflows focused (separate CI, deploy, release)
  - Use meaningful job and step names
  - Document complex workflows with comments
  - Store common configurations in composite actions

Cost Management:
  - Cancel redundant workflow runs with concurrency groups
  - Use path filters to avoid running on non-code changes
  - Cache aggressively to reduce build times
  - Use self-hosted runners for heavy workloads`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>Is GitHub Actions free?</h3>
      <p>
        GitHub Actions is free for public repositories with unlimited minutes. For private repositories, the free tier includes 2,000 minutes per month for GitHub Free accounts and 3,000 minutes for Pro accounts. Linux runners consume 1x minutes, Windows runners 2x, and macOS runners 10x. Self-hosted runners do not count against your quota.
      </p>

      <h3>How do I run workflows only when specific files change?</h3>
      <p>
        Use the <code>paths</code> filter in your trigger configuration. For example, <code>paths: ['src/**', 'package.json']</code> will only trigger the workflow when files in the <code>src/</code> directory or <code>package.json</code> change. You can also use <code>paths-ignore</code> to exclude specific paths like documentation files.
      </p>

      <h3>Can I run GitHub Actions locally?</h3>
      <p>
        Yes. The <code>act</code> tool (github.com/nektos/act) lets you run GitHub Actions locally using Docker. It supports most workflow features and is invaluable for debugging. Install it with <code>brew install act</code> on macOS or download the binary for your platform.
      </p>

      <h3>How do I pass data between jobs?</h3>
      <p>
        Use artifacts (<code>actions/upload-artifact</code> and <code>actions/download-artifact</code>) to pass files between jobs. For small values, use job outputs: set an output in one job with <code>echo "key=value" &gt;&gt; $GITHUB_OUTPUT</code> and reference it in dependent jobs with <code>needs.job_name.outputs.key</code>.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format and validate your workflow YAML as JSON</li>
        <li><Link href={`/${lang}/tools/yaml-validator`}>YAML Validator</Link> - Validate workflow YAML syntax</li>
        <li><Link href={`/${lang}/blog/docker-compose-yaml-errors`}>Docker Compose YAML Errors</Link> - Fix common YAML syntax mistakes</li>
        <li><Link href={`/${lang}/blog/git-branching-strategies`}>Git Branching Strategies</Link> - Branch strategies that work with CI/CD</li>
      </ul>
    </>
  );
}
