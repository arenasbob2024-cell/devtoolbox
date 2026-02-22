'use client';

import Link from 'next/link';

export default function GithubActionsGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>GitHub Actions Complete CI/CD Guide</h2>
      <p>
        <strong>GitHub Actions</strong> is GitHub's built-in CI/CD and automation platform that lets
        you automate software workflows directly in your repository. Since its 2019 launch, it has
        become the most widely-used CI/CD system for open-source projects and is increasingly
        dominant in private codebases. This complete guide covers everything from basic workflow
        syntax to advanced patterns like matrix builds, reusable workflows, and deployment pipelines.
      </p>
      <p>
        For cron-based scheduling patterns in GitHub Actions, see our{' '}
        <Link href={`/${lang}/blog/cron-expression-examples`}>Cron Expression Examples</Link> guide.
      </p>

      <h2>Core Concepts</h2>
      <p>
        GitHub Actions is built around four key concepts:
      </p>
      <ul>
        <li>
          <strong>Workflow</strong>: A YAML file in <code>.github/workflows/</code> that defines an
          automated process. A repo can have multiple workflows.
        </li>
        <li>
          <strong>Event</strong>: A trigger that starts a workflow — push, pull_request, schedule,
          workflow_dispatch, etc.
        </li>
        <li>
          <strong>Job</strong>: A set of steps that run on the same runner. Jobs can run in parallel
          or sequentially using <code>needs</code>.
        </li>
        <li>
          <strong>Step</strong>: An individual task — either a shell command or an Action
          (reusable unit from the Marketplace).
        </li>
      </ul>
      <pre><code className="language-yaml">{`# .github/workflows/example.yml
name: CI Pipeline           # Display name
on:                         # Event triggers
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:                     # Job ID
    runs-on: ubuntu-latest  # Runner environment
    steps:
      - uses: actions/checkout@v4           # Action from Marketplace
      - uses: actions/setup-node@v4         # Setup Node.js
        with:
          node-version: '20'
      - run: npm ci                         # Shell command
      - run: npm test`}</code></pre>

      <h2>Workflow Triggers (on:)</h2>
      <p>
        GitHub Actions supports many event types. Here are the most commonly used:
      </p>
      <pre><code className="language-yaml">{`on:
  # Push to specific branches or tags
  push:
    branches: [main, develop]
    tags: ['v*']
    paths-ignore: ['**.md', 'docs/**']

  # Pull request events
  pull_request:
    types: [opened, synchronize, reopened]
    branches: [main]

  # Manual trigger with inputs
  workflow_dispatch:
    inputs:
      environment:
        description: 'Deploy environment'
        required: true
        default: 'staging'
        type: choice
        options: [staging, production]

  # Scheduled (cron)
  schedule:
    - cron: '0 2 * * *'  # Every day at 2 AM UTC

  # When another workflow completes
  workflow_run:
    workflows: ['CI']
    types: [completed]
    branches: [main]

  # Repository dispatch (external trigger via API)
  repository_dispatch:
    types: [deploy-command]`}</code></pre>

      <h2>Complete Node.js CI Workflow</h2>
      <p>
        A production-ready CI workflow for a Node.js project with testing, linting, and type checking:
      </p>
      <pre><code className="language-yaml">{`name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  quality:
    name: Code Quality
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'              # Cache node_modules

      - name: Install dependencies
        run: npm ci                 # Clean install (respects package-lock.json)

      - name: Run linter
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/
          retention-days: 7

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: quality            # Only run if quality passes

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'

      - run: npm ci
      - run: npm run build

      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/`}</code></pre>

      <h2>Matrix Builds: Testing Across Environments</h2>
      <p>
        Matrix builds let you run the same job with different configurations in parallel — ideal for
        cross-platform testing:
      </p>
      <pre><code className="language-yaml">{`jobs:
  test-matrix:
    runs-on: \${{ matrix.os }}
    strategy:
      fail-fast: false          # Don't cancel all jobs if one fails
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node: ['18', '20', '22']
        exclude:
          - os: macos-latest
            node: '18'          # Skip this combination

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node }}

      - run: npm ci
      - run: npm test

  # Matrix with include for custom variables
  deploy-matrix:
    strategy:
      matrix:
        include:
          - environment: staging
            url: https://staging.example.com
            branch: develop
          - environment: production
            url: https://example.com
            branch: main
    steps:
      - name: Deploy to \${{ matrix.environment }}
        run: echo "Deploying to \${{ matrix.url }}"`}</code></pre>

      <h2>Secrets and Environment Variables</h2>
      <p>
        GitHub Actions provides a secure way to store and use sensitive data:
      </p>
      <pre><code className="language-yaml">{`# Reference secrets configured in Settings > Secrets
steps:
  - name: Deploy
    env:
      API_KEY: \${{ secrets.API_KEY }}
      DATABASE_URL: \${{ secrets.DATABASE_URL }}
    run: |
      echo "Deploying with API key..."
      ./deploy.sh

# Environment-specific secrets
jobs:
  deploy:
    environment: production   # References environment secrets
    steps:
      - run: echo \${{ secrets.PROD_API_KEY }}

# GitHub-provided automatic variables
steps:
  - run: |
      echo "Repo: \${{ github.repository }}"
      echo "SHA: \${{ github.sha }}"
      echo "Branch: \${{ github.ref_name }}"
      echo "Actor: \${{ github.actor }}"
      echo "Event: \${{ github.event_name }}"

# Set environment variables dynamically
  - name: Set deployment URL
    run: echo "DEPLOY_URL=https://\${{ github.sha }}.preview.example.com" >> \$GITHUB_ENV

  - name: Use the variable
    run: echo "Deployed to \$DEPLOY_URL"`}</code></pre>

      <h2>Caching Dependencies</h2>
      <p>
        Proper caching dramatically speeds up workflows. Use the built-in cache from setup actions or
        the <code>actions/cache</code> action directly:
      </p>
      <pre><code className="language-yaml">{`# Automatic caching via setup-node (recommended)
- uses: actions/setup-node@v4
  with:
    cache: 'npm'     # or 'yarn', 'pnpm'

# Manual cache with actions/cache
- name: Cache node modules
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-node-

# Cache for Python pip
- uses: actions/cache@v4
  with:
    path: ~/.cache/pip
    key: \${{ runner.os }}-pip-\${{ hashFiles('requirements.txt') }}

# Cache for Docker layers
- name: Cache Docker layers
  uses: actions/cache@v4
  with:
    path: /tmp/.buildx-cache
    key: \${{ runner.os }}-buildx-\${{ github.sha }}
    restore-keys: |
      \${{ runner.os }}-buildx-`}</code></pre>

      <h2>Docker Build and Push</h2>
      <p>
        Build and push Docker images to Docker Hub or GitHub Container Registry:
      </p>
      <pre><code className="language-yaml">{`name: Docker Build & Push

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  docker:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Docker meta
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: |
            myorg/myapp
            ghcr.io/myorg/myapp
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=sha

      - name: Set up QEMU (multi-platform)
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: \${{ secrets.DOCKERHUB_USERNAME }}
          password: \${{ secrets.DOCKERHUB_TOKEN }}

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max`}</code></pre>

      <h2>Reusable Workflows</h2>
      <p>
        Reusable workflows eliminate duplication across multiple repositories. Define once, call from
        anywhere:
      </p>
      <pre><code className="language-yaml">{`# .github/workflows/reusable-deploy.yml (in shared repo or same repo)
name: Reusable Deploy

on:
  workflow_call:           # Makes this workflow reusable
    inputs:
      environment:
        required: true
        type: string
      image-tag:
        required: true
        type: string
    secrets:
      DEPLOY_KEY:
        required: true
    outputs:
      deploy-url:
        description: 'Deployed URL'
        value: \${{ jobs.deploy.outputs.url }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: \${{ inputs.environment }}
    outputs:
      url: \${{ steps.deploy.outputs.url }}
    steps:
      - name: Deploy
        id: deploy
        run: |
          echo "Deploying \${{ inputs.image-tag }} to \${{ inputs.environment }}"
          echo "url=https://\${{ inputs.environment }}.example.com" >> \$GITHUB_OUTPUT

---

# Calling the reusable workflow
name: CI/CD Pipeline
on:
  push:
    branches: [main]

jobs:
  ci:
    uses: ./.github/workflows/ci.yml  # or owner/repo/.github/workflows/ci.yml@main

  deploy-staging:
    needs: ci
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment: staging
      image-tag: \${{ github.sha }}
    secrets:
      DEPLOY_KEY: \${{ secrets.STAGING_DEPLOY_KEY }}`}</code></pre>

      <h2>Conditional Execution and Expressions</h2>
      <pre><code className="language-yaml">{`jobs:
  deploy:
    # Only run on main branch push (not PRs)
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest

    steps:
      # Conditional steps
      - name: Deploy to production
        if: github.ref == 'refs/heads/main'
        run: ./deploy-production.sh

      - name: Deploy to staging
        if: startsWith(github.ref, 'refs/heads/feature/')
        run: ./deploy-staging.sh

      # Always run even if previous steps fail
      - name: Notify on failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: '{"text": "Deployment failed!"}'

      # Run on success or failure (not cancelled)
      - name: Cleanup
        if: always()
        run: ./cleanup.sh

      # Complex expressions
      - name: Tag release
        if: |
          github.event_name == 'push' &&
          startsWith(github.ref, 'refs/tags/v') &&
          !contains(github.ref, 'beta')
        run: ./tag-release.sh`}</code></pre>

      <h2>GitHub Actions Security Best Practices</h2>
      <pre><code className="language-yaml">{`# Pin actions to specific commit SHA (not just tag)
# BAD: Tag can be moved to malicious commit
- uses: actions/checkout@v4

# GOOD: Pin to specific SHA
- uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2

# Minimal permissions (principle of least privilege)
permissions:
  contents: read
  packages: write
  # Don't request permissions you don't need

# Restrict secret access with environments
jobs:
  deploy:
    environment: production    # Require approval before accessing secrets

# Prevent command injection in run steps
# BAD: Interpolating untrusted input directly
- run: echo "\${{ github.event.issue.title }}"

# GOOD: Set as env var and reference that
- env:
    TITLE: \${{ github.event.issue.title }}
  run: echo "\$TITLE"

# Use CODEOWNERS to protect workflow files
# .github/CODEOWNERS
# /.github/workflows/ @security-team`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>What are GitHub Actions runner minutes limits?</h3>
      <p>
        Free accounts get 2,000 minutes/month for private repos (public repos are free). Ubuntu
        runners use 1x multiplier, Windows 2x, macOS 10x. Self-hosted runners are free and have no
        minutes limit.
      </p>

      <h3>How do I debug a failing workflow?</h3>
      <p>
        Enable debug logging by setting secret <code>ACTIONS_RUNNER_DEBUG</code> to <code>true</code>
        . You can also use <code>tmate</code> action to get an SSH session into the runner for
        interactive debugging.
      </p>

      <h3>How do I pass data between jobs?</h3>
      <p>
        Use <code>outputs</code> to pass small values between jobs, and{' '}
        <code>actions/upload-artifact</code> + <code>actions/download-artifact</code> to pass files.
        Jobs can't directly share the filesystem since they run on different machines.
      </p>

      <h3>Can I run GitHub Actions locally?</h3>
      <p>
        Yes, use <code>act</code> (github.com/nektos/act). It runs GitHub Actions locally using
        Docker, which is useful for faster iteration without committing and pushing.
      </p>

      <p>
        Use our <Link href={`/${lang}/tools/cron-parser`}>Cron Expression Parser</Link> to validate
        your schedule triggers, and the{' '}
        <Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> to debug webhook payloads.
      </p>
    </>
  );
}
