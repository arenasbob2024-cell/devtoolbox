'use client';
import React from 'react';

export default function GithubActionsAdvanced({ lang }: { lang: string }) {
  return (
    <article>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        GitHub Actions Advanced: Matrix Builds, Reusable Workflows, and Custom Actions
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        GitHub Actions is the CI/CD platform built directly into GitHub. While basic workflows for
        running tests and deploying code are straightforward, mastering advanced features transforms
        GitHub Actions from a simple CI runner into a powerful automation platform. Matrix builds
        let you test across multiple environments in parallel. Reusable workflows eliminate
        duplication across repositories. Custom actions encapsulate complex logic into shareable
        building blocks. Together, these features enable enterprise-grade CI/CD pipelines that
        scale across hundreds of repositories.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        This guide covers advanced GitHub Actions techniques for 2026, including dynamic matrices,
        composite and Docker actions, reusable workflow patterns, caching strategies, security
        hardening, and performance optimization. Every example is production-tested and ready to
        use in your repositories.
      </p>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Matrix Builds: Testing Across Multiple Environments
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Matrix strategies create multiple job instances from a single job definition, each with a
        different combination of variables. This is essential for testing libraries across multiple
        Node.js versions, operating systems, database versions, or any other dimension. Each
        combination runs in parallel, providing fast feedback across your entire support matrix.
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
        Basic Matrix Configuration
      </h3>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`# .github/workflows/test-matrix.yml
name: Test Matrix

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: \${{ matrix.os }}
    strategy:
      # Do not cancel all jobs if one fails
      fail-fast: false
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        node-version: [18, 20, 22]
        # Exclude specific combinations
        exclude:
          - os: windows-latest
            node-version: 18  # Drop Windows + Node 18 support
        # Add specific combinations with extra variables
        include:
          - os: ubuntu-latest
            node-version: 22
            coverage: true  # Only run coverage on one combination

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - run: npm ci
      - run: npm test

      # Conditional step based on matrix include
      - name: Upload coverage
        if: matrix.coverage
        uses: codecov/codecov-action@v4
        with:
          token: \${{ secrets.CODECOV_TOKEN }}`}</code>
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
        Dynamic Matrix Generation
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Static matrices work for simple cases, but real-world projects often need dynamic matrices
        computed from the repository state. For example, a monorepo might need to test only the
        packages that changed, or a multi-service project might need to build only affected
        services. You can generate a matrix dynamically using a setup job.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`# Dynamic matrix — only test changed packages in a monorepo
name: Monorepo CI

on:
  pull_request:
    branches: [main]

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      matrix: \${{ steps.set-matrix.outputs.matrix }}
      has-changes: \${{ steps.set-matrix.outputs.has-changes }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for diff

      - name: Detect changed packages
        id: set-matrix
        run: |
          # Find packages with changes
          CHANGED_PACKAGES=$(git diff --name-only origin/main...HEAD | \\
            grep '^packages/' | \\
            cut -d'/' -f2 | \\
            sort -u | \\
            jq -R -s -c 'split("\\n") | map(select(length > 0))')

          if [ "$CHANGED_PACKAGES" = "[]" ]; then
            echo "has-changes=false" >> $GITHUB_OUTPUT
            echo "matrix={}" >> $GITHUB_OUTPUT
          else
            echo "has-changes=true" >> $GITHUB_OUTPUT
            echo "matrix={\"package\": $CHANGED_PACKAGES}" >> $GITHUB_OUTPUT
          fi

          echo "Changed packages: $CHANGED_PACKAGES"

  test:
    needs: detect-changes
    if: needs.detect-changes.outputs.has-changes == 'true'
    runs-on: ubuntu-latest
    strategy:
      matrix: \${{ fromJson(needs.detect-changes.outputs.matrix) }}
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Test package \${{ matrix.package }}
        run: npm test --workspace=packages/\${{ matrix.package }}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Reusable Workflows
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Reusable workflows allow you to define a workflow once and call it from other workflows,
        even across repositories. This is the primary mechanism for standardizing CI/CD patterns
        across an organization. A reusable workflow is defined with the
        <code style={{ fontFamily: 'monospace' }}> workflow_call</code> trigger and can accept inputs, secrets, and produce
        outputs.
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
        Defining a Reusable Workflow
      </h3>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`# .github/workflows/reusable-node-ci.yml
# This is the REUSABLE workflow (called by other workflows)
name: Node.js CI (Reusable)

on:
  workflow_call:
    inputs:
      node-version:
        description: 'Node.js version to use'
        required: false
        type: string
        default: '22'
      working-directory:
        description: 'Working directory for npm commands'
        required: false
        type: string
        default: '.'
      run-lint:
        description: 'Whether to run linting'
        required: false
        type: boolean
        default: true
      run-e2e:
        description: 'Whether to run E2E tests'
        required: false
        type: boolean
        default: false
    secrets:
      NPM_TOKEN:
        description: 'NPM auth token for private packages'
        required: false
      CODECOV_TOKEN:
        description: 'Codecov upload token'
        required: false
    outputs:
      test-result:
        description: 'Test result (pass/fail)'
        value: \${{ jobs.test.outputs.result }}

jobs:
  lint:
    if: inputs.run-lint
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: \${{ inputs.working-directory }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ inputs.node-version }}
          cache: 'npm'
          cache-dependency-path: \${{ inputs.working-directory }}/package-lock.json
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  test:
    runs-on: ubuntu-latest
    outputs:
      result: \${{ steps.test.outcome }}
    defaults:
      run:
        working-directory: \${{ inputs.working-directory }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ inputs.node-version }}
          cache: 'npm'
          cache-dependency-path: \${{ inputs.working-directory }}/package-lock.json
      - run: npm ci
      - name: Run tests
        id: test
        run: npm test -- --coverage
      - name: Upload coverage
        if: secrets.CODECOV_TOKEN
        uses: codecov/codecov-action@v4
        with:
          token: \${{ secrets.CODECOV_TOKEN }}

  e2e:
    if: inputs.run-e2e
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: \${{ inputs.working-directory }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ inputs.node-version }}
          cache: 'npm'
      - run: npm ci
      - name: Run E2E tests
        run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/`}</code>
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
        Calling a Reusable Workflow
      </h3>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`# .github/workflows/ci.yml — CALLER workflow
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  # Call reusable workflow from the same repo
  ci:
    uses: ./.github/workflows/reusable-node-ci.yml
    with:
      node-version: '22'
      run-lint: true
      run-e2e: \${{ github.event_name == 'push' && github.ref == 'refs/heads/main' }}
    secrets:
      NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
      CODECOV_TOKEN: \${{ secrets.CODECOV_TOKEN }}

  # Call reusable workflow from another repository
  shared-ci:
    uses: my-org/shared-workflows/.github/workflows/reusable-node-ci.yml@v2
    with:
      node-version: '22'
    secrets: inherit  # Pass all secrets from the caller

  deploy:
    needs: ci
    if: github.ref == 'refs/heads/main'
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment: production
    secrets: inherit`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Custom Actions
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Custom actions encapsulate reusable automation logic into shareable steps. There are three
        types: JavaScript actions (run Node.js code), Docker container actions (run any language in
        a container), and composite actions (combine multiple steps into one). Composite actions are
        the most practical for most use cases because they do not require compiling or building.
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
        Composite Action Example
      </h3>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`# .github/actions/setup-project/action.yml
# Composite action that sets up the entire project environment
name: 'Setup Project'
description: 'Install dependencies, setup caches, and prepare environment'

inputs:
  node-version:
    description: 'Node.js version'
    required: false
    default: '22'
  install-playwright:
    description: 'Install Playwright browsers'
    required: false
    default: 'false'

outputs:
  cache-hit:
    description: 'Whether npm cache was hit'
    value: \${{ steps.cache.outputs.cache-hit }}

runs:
  using: 'composite'
  steps:
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: \${{ inputs.node-version }}

    - name: Cache node_modules
      id: cache
      uses: actions/cache@v4
      with:
        path: node_modules
        key: node-modules-\${{ runner.os }}-\${{ hashFiles('package-lock.json') }}
        restore-keys: |
          node-modules-\${{ runner.os }}-

    - name: Install dependencies
      if: steps.cache.outputs.cache-hit != 'true'
      shell: bash
      run: npm ci

    - name: Cache Playwright browsers
      if: inputs.install-playwright == 'true'
      uses: actions/cache@v4
      with:
        path: ~/.cache/ms-playwright
        key: playwright-\${{ runner.os }}-\${{ hashFiles('package-lock.json') }}

    - name: Install Playwright
      if: inputs.install-playwright == 'true'
      shell: bash
      run: npx playwright install --with-deps chromium`}</code>
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
        Using the Composite Action
      </h3>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # One step replaces multiple setup steps
      - name: Setup project
        uses: ./.github/actions/setup-project
        with:
          node-version: '22'
          install-playwright: 'true'

      - run: npm test
      - run: npx playwright test`}</code>
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
        JavaScript Action Example
      </h3>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// .github/actions/pr-size-label/index.js
// Custom action that labels PRs by size (S, M, L, XL)
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('github-token', { required: true });
    const octokit = github.getOctokit(token);
    const { pull_request } = github.context.payload;

    if (!pull_request) {
      core.setFailed('This action only works on pull_request events');
      return;
    }

    // Get the diff stats
    const { data: pr } = await octokit.rest.pulls.get({
      ...github.context.repo,
      pull_number: pull_request.number,
    });

    const totalChanges = pr.additions + pr.deletions;

    // Determine size label
    let sizeLabel;
    if (totalChanges < 10) sizeLabel = 'size/XS';
    else if (totalChanges < 50) sizeLabel = 'size/S';
    else if (totalChanges < 200) sizeLabel = 'size/M';
    else if (totalChanges < 500) sizeLabel = 'size/L';
    else sizeLabel = 'size/XL';

    // Remove existing size labels
    const existingLabels = pr.labels
      .filter(l => l.name.startsWith('size/'))
      .map(l => l.name);

    for (const label of existingLabels) {
      await octokit.rest.issues.removeLabel({
        ...github.context.repo,
        issue_number: pull_request.number,
        name: label,
      });
    }

    // Add new size label
    await octokit.rest.issues.addLabels({
      ...github.context.repo,
      issue_number: pull_request.number,
      labels: [sizeLabel],
    });

    core.setOutput('size', sizeLabel);
    core.setOutput('changes', totalChanges);
    core.info(\`PR #\${pull_request.number}: \${totalChanges} changes -> \${sizeLabel}\`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();`}</code>
      </pre>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`# .github/actions/pr-size-label/action.yml
name: 'PR Size Label'
description: 'Automatically label pull requests by size'
inputs:
  github-token:
    description: 'GitHub token'
    required: true
    default: \${{ github.token }}
outputs:
  size:
    description: 'Size label applied'
  changes:
    description: 'Total number of changes'
runs:
  using: 'node20'
  main: 'index.js'`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Advanced Caching Strategies
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Effective caching can cut your CI time in half or more. Beyond the basic dependency cache,
        there are several advanced caching patterns that optimize different stages of your pipeline.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`# Advanced caching patterns
name: Build with Advanced Caching

on: push

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22

      # Layer 1: npm dependency cache
      - name: Cache node_modules
        uses: actions/cache@v4
        with:
          path: node_modules
          key: deps-\${{ runner.os }}-\${{ hashFiles('package-lock.json') }}

      # Layer 2: Build output cache (Next.js example)
      - name: Cache Next.js build
        uses: actions/cache@v4
        with:
          path: |
            .next/cache
          key: nextjs-\${{ runner.os }}-\${{ hashFiles('package-lock.json') }}-\${{ hashFiles('src/**/*') }}
          restore-keys: |
            nextjs-\${{ runner.os }}-\${{ hashFiles('package-lock.json') }}-
            nextjs-\${{ runner.os }}-

      # Layer 3: TypeScript compilation cache
      - name: Cache TypeScript
        uses: actions/cache@v4
        with:
          path: tsconfig.tsbuildinfo
          key: tsc-\${{ runner.os }}-\${{ hashFiles('tsconfig.json') }}-\${{ hashFiles('src/**/*.ts', 'src/**/*.tsx') }}

      # Layer 4: ESLint cache
      - name: Cache ESLint
        uses: actions/cache@v4
        with:
          path: .eslintcache
          key: eslint-\${{ runner.os }}-\${{ hashFiles('.eslintrc*') }}-\${{ hashFiles('src/**/*') }}

      - run: npm ci
      - run: npm run lint -- --cache --cache-location .eslintcache
      - run: npm run build
      - run: npm test`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Security Hardening
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        GitHub Actions workflows can be a security attack surface if not properly configured.
        Follow these practices to harden your pipelines against supply chain attacks, secret
        exposure, and privilege escalation.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`# Security-hardened workflow
name: Secure CI

on:
  pull_request:
    branches: [main]

# Restrict default permissions to minimum required
permissions:
  contents: read
  pull-requests: write  # Only if needed for PR comments

jobs:
  build:
    runs-on: ubuntu-latest
    # Restrict permissions at job level
    permissions:
      contents: read

    steps:
      - uses: actions/checkout@v4
        with:
          # Prevent script injection via PR title/body
          persist-credentials: false

      # Pin actions to full commit SHA, not tags
      # Tags can be moved; commit SHAs are immutable
      - uses: actions/setup-node@60edb5dd545a775178f52524783378180af0d1f8  # v4.0.2
        with:
          node-version: 22

      # Never use user-controlled input directly in run commands
      # BAD:  run: echo "$\{{ github.event.pull_request.title }}"
      # GOOD: Use environment variables
      - name: Process PR info
        env:
          PR_TITLE: \${{ github.event.pull_request.title }}
          PR_BODY: \${{ github.event.pull_request.body }}
        run: |
          # Input is sanitized through env vars, not interpolated into shell
          echo "Processing PR: $PR_TITLE"

      - run: npm ci
      - run: npm test

      # Use OIDC tokens instead of long-lived secrets for cloud deployments
      # This eliminates the need to store AWS/GCP/Azure credentials as secrets

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write  # Required for OIDC

    steps:
      - uses: actions/checkout@v4

      # OIDC authentication — no stored secrets
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/github-actions-deploy
          aws-region: us-east-1

      - run: npm ci && npm run build
      - run: aws s3 sync ./dist s3://my-bucket/`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Workflow Performance Optimization
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Slow CI pipelines hurt developer productivity. Here are proven techniques to reduce workflow
        execution time.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Run independent jobs in parallel.</strong> Split your pipeline into separate jobs for
        linting, unit tests, integration tests, and builds. Jobs in the same workflow run in
        parallel by default unless you add <code style={{ fontFamily: 'monospace' }}>needs:</code> dependencies.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Use path filters to skip unnecessary runs.</strong> If only documentation changed,
        there is no need to run the full test suite. Use the <code style={{ fontFamily: 'monospace' }}>paths</code> filter or
        a change detection step.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Cancel redundant runs.</strong> When you push multiple commits in quick succession,
        use <code style={{ fontFamily: 'monospace' }}>concurrency</code> to cancel in-progress runs for the same branch.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`# Optimized workflow with parallelism and cancellation
name: Optimized CI

on:
  push:
    branches: [main]
    # Skip CI for doc-only changes
    paths-ignore:
      - '**/*.md'
      - 'docs/**'
      - '.vscode/**'
  pull_request:
    paths-ignore:
      - '**/*.md'
      - 'docs/**'

# Cancel in-progress runs for the same branch
concurrency:
  group: ci-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  # Fast checks run first
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  # Unit tests and build run in parallel with lint
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: 'npm' }
      - run: npm ci
      - run: npm test

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: 'npm' }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: dist/
          retention-days: 1

  # E2E tests depend on build
  e2e:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: 'npm' }
      - run: npm ci
      - uses: actions/download-artifact@v4
        with:
          name: build-output
          path: dist/
      - run: npx playwright test

  # Deploy only after all checks pass
  deploy:
    needs: [lint, test, build, e2e]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/download-artifact@v4
        with: { name: build-output, path: dist/ }
      - run: echo "Deploying to production..."

  # Timeout protection
  long-running-test:
    runs-on: ubuntu-latest
    timeout-minutes: 15  # Kill if takes longer than 15 minutes
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:integration`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Environment Protection Rules
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        GitHub Environments provide deployment protection rules, required reviewers, and
        environment-specific secrets. This is essential for controlling deployments to production
        and staging environments.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`# Multi-environment deployment pipeline
name: Deploy

on:
  push:
    branches: [main, staging]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/upload-artifact@v4
        with: { name: dist, path: dist/ }

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.myapp.com
    steps:
      - uses: actions/download-artifact@v4
        with: { name: dist, path: dist/ }
      - name: Deploy to staging
        env:
          DEPLOY_KEY: \${{ secrets.STAGING_DEPLOY_KEY }}
        run: |
          echo "Deploying to staging..."
          # Your deployment command here

  deploy-production:
    needs: deploy-staging
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment:
      name: production  # Requires manual approval
      url: https://myapp.com
    steps:
      - uses: actions/download-artifact@v4
        with: { name: dist, path: dist/ }
      - name: Deploy to production
        env:
          DEPLOY_KEY: \${{ secrets.PRODUCTION_DEPLOY_KEY }}
        run: |
          echo "Deploying to production..."
          # Your deployment command here`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Summary and Best Practices
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        GitHub Actions becomes a powerful automation platform when you leverage its advanced
        features. Use matrix builds to validate across environments in parallel. Extract common
        patterns into reusable workflows that can be shared across your organization. Build
        composite actions for frequently used setup sequences. Implement layered caching to
        minimize redundant work. Harden your workflows with minimal permissions, pinned action
        versions, and OIDC authentication. Optimize execution time with parallelism, path filters,
        and concurrency cancellation.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The key principle is to treat your CI/CD configuration as production code. Version it,
        review it, test it, and refactor it. A well-designed GitHub Actions pipeline accelerates
        your entire engineering organization by providing fast, reliable, and secure automation
        for every code change.
      </p>
    </article>
  );
}
