export default function GitHubActionsCiCd() {
  return (
    <>
      <h2>GitHub Actions CI/CD: Complete Setup Guide</h2>
      <p>
        GitHub Actions is a powerful CI/CD platform built directly into GitHub that allows you to automate
        your build, test, and deployment workflows. With its deep integration into the GitHub ecosystem,
        extensive marketplace of reusable actions, and generous free tier, GitHub Actions has become the
        preferred choice for automating software delivery pipelines in 2026. This guide walks you through
        setting up production-ready CI/CD workflows from scratch.
      </p>

      <h2>Understanding GitHub Actions Concepts</h2>
      <p>
        Before writing your first workflow, you need to understand the core building blocks:
      </p>
      <ul>
        <li><strong>Workflow</strong> - An automated process defined in a YAML file that runs one or more jobs. Stored in <code>.github/workflows/</code></li>
        <li><strong>Event</strong> - A trigger that starts a workflow (push, pull request, schedule, manual dispatch, etc.)</li>
        <li><strong>Job</strong> - A set of steps that execute on the same runner. Jobs run in parallel by default</li>
        <li><strong>Step</strong> - An individual task within a job. Can be a shell command or a reusable action</li>
        <li><strong>Action</strong> - A reusable unit of code that performs a specific task (checkout code, set up Node.js, deploy, etc.)</li>
        <li><strong>Runner</strong> - A server that executes your workflows. GitHub provides hosted runners (Ubuntu, macOS, Windows) or you can use self-hosted runners</li>
        <li><strong>Artifact</strong> - Files produced by a workflow that can be shared between jobs or downloaded after completion</li>
      </ul>

      <h2>Your First CI Workflow</h2>
      <p>
        Let us start with a basic CI workflow for a Node.js project that runs on every push and pull request.
        Create a file at <code>.github/workflows/ci.yml</code> in your repository:
      </p>
      <pre><code>{`# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Test
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18, 20, 22]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type checking
        run: npm run type-check

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage report
        if: matrix.node-version == 20
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/
          retention-days: 7`}</code></pre>
      <p>
        This workflow checks out your code, installs dependencies with caching, and runs linting, type
        checking, and tests across three Node.js versions in parallel. The matrix strategy automatically
        creates three separate job runs.
      </p>

      <h2>Build and Deploy Workflow</h2>
      <p>
        A complete CI/CD pipeline typically includes build, test, and deploy stages. Here is a workflow
        that builds a Docker image and deploys to different environments based on the branch:
      </p>
      <pre><code>{`# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main, staging]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Target environment'
        required: true
        type: choice
        options:
          - staging
          - production

concurrency:
  group: deploy-\${{ github.ref }}
  cancel-in-progress: true

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  build:
    name: Build and Push Docker Image
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    outputs:
      image-tag: \${{ steps.meta.outputs.tags }}
      image-digest: \${{ steps.build.outputs.digest }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to GitHub Container Registry
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
            type=sha,prefix=
            type=ref,event=branch

      - name: Build and push
        id: build
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy-staging:
    name: Deploy to Staging
    needs: build
    if: github.ref == 'refs/heads/staging' || github.event.inputs.environment == 'staging'
    runs-on: ubuntu-latest
    environment: staging

    steps:
      - name: Deploy to staging
        run: |
          echo "Deploying \${{ needs.build.outputs.image-tag }} to staging"
          # Add your deployment commands here
          # e.g., kubectl set image, aws ecs update-service, etc.

  deploy-production:
    name: Deploy to Production
    needs: build
    if: github.ref == 'refs/heads/main' || github.event.inputs.environment == 'production'
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://myapp.example.com

    steps:
      - name: Deploy to production
        run: |
          echo "Deploying \${{ needs.build.outputs.image-tag }} to production"
          # Add your deployment commands here`}</code></pre>

      <h2>Caching Dependencies</h2>
      <p>
        Caching is essential for fast CI pipelines. GitHub Actions provides built-in caching for most
        package managers. Here are caching strategies for popular ecosystems:
      </p>
      <pre><code>{`# Node.js - npm/pnpm/yarn caching
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'npm'              # or 'pnpm' or 'yarn'

# Python - pip caching
- uses: actions/setup-python@v5
  with:
    python-version: '3.12'
    cache: 'pip'

# Go - module caching
- uses: actions/setup-go@v5
  with:
    go-version: '1.22'
    cache: true

# Rust - cargo caching
- uses: actions/cache@v4
  with:
    path: |
      ~/.cargo/bin/
      ~/.cargo/registry/index/
      ~/.cargo/registry/cache/
      ~/.cargo/git/db/
      target/
    key: \${{ runner.os }}-cargo-\${{ hashFiles('**/Cargo.lock') }}
    restore-keys: |
      \${{ runner.os }}-cargo-

# Generic caching (any directory)
- uses: actions/cache@v4
  with:
    path: .build-cache
    key: build-\${{ runner.os }}-\${{ hashFiles('src/**') }}
    restore-keys: |
      build-\${{ runner.os }}-`}</code></pre>

      <h2>Secrets and Environment Variables</h2>
      <p>
        Sensitive data like API keys, deployment credentials, and tokens should never be stored in your
        workflow files. GitHub provides encrypted secrets at the repository, environment, and organization
        level.
      </p>
      <pre><code>{`# Setting secrets in GitHub:
# Repository Settings > Secrets and variables > Actions > New repository secret

# Using secrets in workflows
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production    # Uses environment-specific secrets
    steps:
      - name: Deploy
        env:
          API_KEY: \${{ secrets.API_KEY }}
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          echo "Deploying with environment-specific credentials"

# Environment variables at different levels
env:                          # Workflow-level: available to all jobs
  NODE_ENV: production

jobs:
  build:
    env:                      # Job-level: available to all steps in this job
      BUILD_TARGET: linux
    steps:
      - name: Build
        env:                  # Step-level: available only in this step
          VERBOSE: true
        run: npm run build`}</code></pre>

      <h2>Reusable Workflows</h2>
      <p>
        As your CI/CD pipelines grow, you can extract common patterns into reusable workflows. This
        follows the DRY principle and makes maintenance easier across multiple repositories.
      </p>
      <pre><code>{`# .github/workflows/reusable-test.yml
name: Reusable Test Workflow

on:
  workflow_call:
    inputs:
      node-version:
        description: 'Node.js version'
        required: false
        type: string
        default: '20'
      run-e2e:
        description: 'Run E2E tests'
        required: false
        type: boolean
        default: false
    secrets:
      CODECOV_TOKEN:
        required: false

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ inputs.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --coverage
      - name: E2E tests
        if: inputs.run-e2e
        run: npm run test:e2e

---
# .github/workflows/ci.yml - Calling the reusable workflow
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    uses: ./.github/workflows/reusable-test.yml
    with:
      node-version: '20'
      run-e2e: false

  full-tests:
    uses: ./.github/workflows/reusable-test.yml
    with:
      node-version: '20'
      run-e2e: true
    secrets:
      CODECOV_TOKEN: \${{ secrets.CODECOV_TOKEN }}`}</code></pre>

      <h2>Pull Request Automation</h2>
      <p>
        GitHub Actions excels at automating pull request workflows. Here is a workflow that runs checks,
        adds labels, and posts comments on PRs:
      </p>
      <pre><code>{`# .github/workflows/pr-checks.yml
name: PR Checks

on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  contents: read
  pull-requests: write

jobs:
  size-label:
    name: PR Size Label
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Calculate PR size
        id: size
        run: |
          ADDITIONS=\$(git diff --numstat origin/main...HEAD | awk '{s+=$1} END {print s}')
          DELETIONS=\$(git diff --numstat origin/main...HEAD | awk '{s+=$2} END {print s}')
          TOTAL=\$((ADDITIONS + DELETIONS))
          echo "total=\$TOTAL" >> \$GITHUB_OUTPUT
          if [ \$TOTAL -lt 50 ]; then echo "label=size/S" >> \$GITHUB_OUTPUT
          elif [ \$TOTAL -lt 200 ]; then echo "label=size/M" >> \$GITHUB_OUTPUT
          elif [ \$TOTAL -lt 500 ]; then echo "label=size/L" >> \$GITHUB_OUTPUT
          else echo "label=size/XL" >> \$GITHUB_OUTPUT
          fi

  lint-commit:
    name: Lint Commit Messages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Check conventional commits
        run: |
          git log --format=%s origin/main..HEAD | while read msg; do
            if ! echo "\$msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore|ci|build|perf)(\\(.+\\))?: .+"; then
              echo "Invalid commit message: \$msg"
              echo "Expected format: type(scope): description"
              exit 1
            fi
          done`}</code></pre>

      <h2>Scheduled Workflows</h2>
      <p>
        GitHub Actions supports cron-based scheduling for tasks like dependency updates, nightly builds,
        stale issue cleanup, and periodic health checks.
      </p>
      <pre><code>{`# .github/workflows/scheduled.yml
name: Scheduled Tasks

on:
  schedule:
    - cron: '0 2 * * 1'     # Every Monday at 2:00 AM UTC
  workflow_dispatch:          # Allow manual trigger

jobs:
  dependency-audit:
    name: Security Audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - name: Run security audit
        run: npm audit --production
        continue-on-error: true

  stale-issues:
    name: Close Stale Issues
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write
    steps:
      - uses: actions/stale@v9
        with:
          stale-issue-message: >
            This issue has been automatically marked as stale
            because it has not had activity in 60 days.
          days-before-stale: 60
          days-before-close: 14`}</code></pre>

      <h2>Deploying to Vercel, Netlify, and AWS</h2>
      <p>
        Here are deployment steps for popular hosting platforms:
      </p>
      <pre><code>{`# Deploy to Vercel
- name: Deploy to Vercel
  env:
    VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}
    VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
    VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}
  run: |
    npm i -g vercel
    vercel pull --yes --token=\$VERCEL_TOKEN
    vercel build --prod --token=\$VERCEL_TOKEN
    vercel deploy --prebuilt --prod --token=\$VERCEL_TOKEN

# Deploy to AWS S3 + CloudFront
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1

- name: Deploy to S3
  run: aws s3 sync ./dist s3://my-bucket --delete

- name: Invalidate CloudFront
  run: |
    aws cloudfront create-invalidation \\
      --distribution-id \${{ secrets.CF_DISTRIBUTION_ID }} \\
      --paths "/*"

# Deploy to AWS ECS
- name: Deploy to ECS
  run: |
    aws ecs update-service \\
      --cluster my-cluster \\
      --service my-service \\
      --force-new-deployment`}</code></pre>

      <h2>Workflow Security Best Practices</h2>
      <ul>
        <li><strong>Pin action versions to SHA</strong> - Use <code>uses: actions/checkout@abc123</code> instead of <code>@v4</code> to prevent supply chain attacks</li>
        <li><strong>Set minimum permissions</strong> - Use <code>permissions</code> to grant only the access each job needs</li>
        <li><strong>Use environment protection rules</strong> - Require manual approval for production deployments</li>
        <li><strong>Never echo secrets</strong> - GitHub masks secrets in logs, but avoid printing them in commands</li>
        <li><strong>Audit third-party actions</strong> - Review the source code of actions before using them, especially for sensitive operations</li>
        <li><strong>Use OIDC for cloud providers</strong> - Use OpenID Connect instead of long-lived access keys for AWS, GCP, and Azure</li>
        <li><strong>Limit workflow triggers</strong> - Be cautious with <code>pull_request_target</code> as it runs with write access on forked PRs</li>
        <li><strong>Set concurrency groups</strong> - Prevent parallel deployments that can cause race conditions</li>
      </ul>

      <h2>Debugging Failed Workflows</h2>
      <p>
        When workflows fail, use these techniques to diagnose and fix issues:
      </p>
      <pre><code>{`# Enable debug logging
# Set repository secret: ACTIONS_RUNNER_DEBUG = true
# Set repository secret: ACTIONS_STEP_DEBUG = true

# Add debug output in steps
- name: Debug info
  run: |
    echo "GitHub ref: \${{ github.ref }}"
    echo "GitHub event: \${{ github.event_name }}"
    echo "Runner OS: \${{ runner.os }}"
    echo "Working directory: \$(pwd)"
    ls -la

# Use tmate for interactive debugging (SSH into runner)
- name: Setup tmate session
  if: failure()
  uses: mxschmitt/action-tmate@v3
  timeout-minutes: 15

# Retry flaky steps
- name: Flaky E2E test
  uses: nick-fields/retry@v3
  with:
    timeout_minutes: 10
    max_attempts: 3
    command: npm run test:e2e`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>How much does GitHub Actions cost?</h3>
      <p>
        GitHub Actions is free for public repositories with unlimited minutes. For private repositories,
        free accounts get 2,000 minutes per month, Pro gets 3,000, and Team gets 3,000. Minutes are
        multiplied for macOS (10x) and Windows (2x) runners. Self-hosted runners are always free
        regardless of repository visibility.
      </p>

      <h3>What is the difference between <code>push</code> and <code>pull_request</code> triggers?</h3>
      <p>
        The <code>push</code> event triggers when commits are pushed to a branch. The <code>pull_request</code> event
        triggers when a PR is opened, updated, or reopened. For CI, use <code>pull_request</code> to validate
        changes before merge. For CD, use <code>push</code> to the main branch to trigger deployments after
        merge.
      </p>

      <h3>How do I pass data between jobs?</h3>
      <p>
        Use <code>outputs</code> for small values (strings, IDs, flags) and <code>artifacts</code> for files
        (build outputs, test reports, Docker images). Outputs are set with <code>echo &quot;key=value&quot; &gt;&gt;
        $GITHUB_OUTPUT</code> and referenced with <code>needs.job-name.outputs.key</code>. Artifacts are
        uploaded with <code>actions/upload-artifact</code> and downloaded with <code>actions/download-artifact</code>.
      </p>

      <h3>Can I run workflows locally for testing?</h3>
      <p>
        Yes, use the <code>act</code> tool (github.com/nektos/act) to run GitHub Actions workflows locally
        in Docker containers. It supports most features including secrets, matrix builds, and artifacts.
        Install with <code>brew install act</code> and run with <code>act push</code> or <code>act pull_request</code>.
      </p>

      <h3>How do I trigger a workflow manually?</h3>
      <p>
        Add <code>workflow_dispatch</code> to your workflow&apos;s <code>on</code> section. You can define
        inputs with types (string, choice, boolean) that appear in the GitHub UI. Trigger from the
        Actions tab, the GitHub CLI (<code>gh workflow run</code>), or the REST API.
      </p>
    </>
  );
}
