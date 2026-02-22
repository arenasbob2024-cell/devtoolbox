'use client';

import Link from 'next/link';

export default function CiCdPipelineBestPractices({ lang }: { lang: string }) {
  return (
    <>
      <h2>CI/CD Pipeline Best Practices: GitHub Actions, GitLab CI, Testing Strategies, and Deployment Patterns</h2>
      <p>
        Continuous Integration and Continuous Deployment (CI/CD) pipelines are the backbone of modern software delivery. A well-designed pipeline catches bugs early, enforces code quality standards, and deploys changes to production with confidence. A poorly designed pipeline becomes a bottleneck: slow builds, flaky tests, manual intervention, and deployment anxiety. This guide covers the principles and practices that separate reliable, fast pipelines from fragile ones, with concrete examples for GitHub Actions and GitLab CI.
      </p>
      <p>
        The practices described here apply whether you are deploying a monolith, microservices, serverless functions, or static sites. The tooling changes, but the underlying principles of fast feedback, reproducibility, and progressive delivery remain constant.
      </p>

      <h2>Pipeline Architecture: Stages and Flow</h2>
      <p>
        A production-grade CI/CD pipeline should have clearly defined stages that progress from fast, cheap checks to slow, expensive ones. Fail fast: if a linting error can be caught in 10 seconds, do not wait for a 20-minute integration test suite to find it.
      </p>

      <h3>Recommended Stage Order</h3>
      <table>
        <thead>
          <tr><th>Stage</th><th>Purpose</th><th>Target Duration</th><th>Failure Rate</th></tr>
        </thead>
        <tbody>
          <tr><td>1. Lint & Format</td><td>Code style, syntax errors</td><td>&lt; 30 seconds</td><td>Low</td></tr>
          <tr><td>2. Type Check</td><td>Type safety validation</td><td>&lt; 1 minute</td><td>Low</td></tr>
          <tr><td>3. Unit Tests</td><td>Business logic correctness</td><td>&lt; 3 minutes</td><td>Medium</td></tr>
          <tr><td>4. Build</td><td>Compilation, bundling</td><td>&lt; 5 minutes</td><td>Low</td></tr>
          <tr><td>5. Integration Tests</td><td>Service interaction</td><td>&lt; 10 minutes</td><td>Medium</td></tr>
          <tr><td>6. E2E Tests</td><td>User workflow validation</td><td>&lt; 15 minutes</td><td>Higher</td></tr>
          <tr><td>7. Security Scan</td><td>Vulnerability detection</td><td>&lt; 5 minutes</td><td>Low</td></tr>
          <tr><td>8. Deploy to Staging</td><td>Pre-production validation</td><td>&lt; 5 minutes</td><td>Low</td></tr>
          <tr><td>9. Deploy to Production</td><td>Release</td><td>&lt; 5 minutes</td><td>Low</td></tr>
        </tbody>
      </table>

      <h2>GitHub Actions: Complete Pipeline Example</h2>
      <p>
        GitHub Actions uses YAML workflow files stored in the .github/workflows directory. Each workflow can be triggered by events like pushes, pull requests, schedules, or manual dispatches. The following example demonstrates a comprehensive pipeline for a TypeScript application.
      </p>

      <h3>CI Workflow</h3>
      <pre><code className="language-yaml">{`# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

# Cancel in-progress runs for the same branch/PR
concurrency:
  group: ci-\${{ github.ref }}
  cancel-in-progress: true

env:
  NODE_VERSION: '22'
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  # Stage 1: Fast checks (lint, format, type check)
  quality:
    name: Code Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'

      - run: npm ci

      # Run all quality checks in parallel using npm-run-all
      - name: Lint
        run: npm run lint

      - name: Type Check
        run: npx tsc --noEmit

      - name: Format Check
        run: npx prettier --check .

  # Stage 2: Unit Tests (with coverage)
  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'

      - run: npm ci

      - name: Run Unit Tests
        run: npm run test -- --coverage --ci

      - name: Upload Coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: false

  # Stage 3: Build
  build:
    name: Build
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'

      - run: npm ci
      - run: npm run build

      # Cache build output for later stages
      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: dist/
          retention-days: 1

  # Stage 4: Integration Tests (with services)
  integration-tests:
    name: Integration Tests
    runs-on: ubuntu-latest
    needs: build

    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'

      - run: npm ci

      - name: Run Migrations
        run: npm run db:migrate
        env:
          DATABASE_URL: postgres://test:test@localhost:5432/testdb

      - name: Run Integration Tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgres://test:test@localhost:5432/testdb
          REDIS_URL: redis://localhost:6379

  # Stage 5: Security Scanning
  security:
    name: Security Scan
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - uses: actions/checkout@v4

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          severity: 'CRITICAL,HIGH'

      - name: Check for secrets
        uses: trufflesecurity/trufflehog@main
        with:
          extra_args: --only-verified`}</code></pre>

      <h3>CD Workflow: Deployment</h3>
      <pre><code className="language-yaml">{`# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Target environment'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

jobs:
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.example.com
    steps:
      - uses: actions/checkout@v4

      - name: Build Docker image
        run: |
          docker build -t \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:staging-\${{ github.sha }} .

      - name: Push to registry
        run: |
          echo "\${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u \${{ github.actor }} --password-stdin
          docker push \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:staging-\${{ github.sha }}

      - name: Deploy to staging
        run: |
          # Example: Kubernetes deployment
          kubectl set image deployment/myapp \\
            myapp=\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:staging-\${{ github.sha }} \\
            --namespace=staging

      - name: Run smoke tests
        run: |
          npm run test:smoke -- --base-url=https://staging.example.com

  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: deploy-staging
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://example.com
    steps:
      - uses: actions/checkout@v4

      - name: Tag release image
        run: |
          docker pull \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:staging-\${{ github.sha }}
          docker tag \\
            \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:staging-\${{ github.sha }} \\
            \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:prod-\${{ github.sha }}
          docker push \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:prod-\${{ github.sha }}

      - name: Deploy with rolling update
        run: |
          kubectl set image deployment/myapp \\
            myapp=\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:prod-\${{ github.sha }} \\
            --namespace=production
          kubectl rollout status deployment/myapp --namespace=production --timeout=300s`}</code></pre>

      <h2>GitLab CI: Equivalent Pipeline</h2>
      <p>
        GitLab CI uses a single .gitlab-ci.yml file at the repository root. It has built-in support for environments, artifacts, caching, and Docker-in-Docker, making it a fully integrated CI/CD platform without third-party actions.
      </p>
      <pre><code className="language-yaml">{`# .gitlab-ci.yml
stages:
  - quality
  - test
  - build
  - security
  - deploy

variables:
  NODE_VERSION: "22"
  POSTGRES_USER: test
  POSTGRES_PASSWORD: test
  POSTGRES_DB: testdb

# Cache node_modules across all jobs
cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/

# Quality checks
lint:
  stage: quality
  image: node:\${NODE_VERSION}-alpine
  script:
    - npm ci --cache .npm
    - npm run lint
    - npx tsc --noEmit
    - npx prettier --check .
  rules:
    - if: \$CI_PIPELINE_SOURCE == "merge_request_event"
    - if: \$CI_COMMIT_BRANCH == "main"

# Unit tests with coverage
unit-tests:
  stage: test
  image: node:\${NODE_VERSION}-alpine
  script:
    - npm ci
    - npm run test -- --coverage --ci
  coverage: '/Lines\\s*:\\s*(\\d+\\.?\\d*)%/'
  artifacts:
    reports:
      junit: junit-report.xml
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

# Integration tests with services
integration-tests:
  stage: test
  image: node:\${NODE_VERSION}
  services:
    - postgres:16-alpine
    - redis:7-alpine
  variables:
    DATABASE_URL: "postgres://test:test@postgres:5432/testdb"
    REDIS_URL: "redis://redis:6379"
  script:
    - npm ci
    - npm run db:migrate
    - npm run test:integration

# Build Docker image
build:
  stage: build
  image: docker:24-dind
  services:
    - docker:24-dind
  script:
    - docker build -t \$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA .
    - docker login -u \$CI_REGISTRY_USER -p \$CI_REGISTRY_PASSWORD \$CI_REGISTRY
    - docker push \$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA
  rules:
    - if: \$CI_COMMIT_BRANCH == "main"

# Deploy to production
deploy-production:
  stage: deploy
  image: bitnami/kubectl:latest
  environment:
    name: production
    url: https://example.com
  script:
    - kubectl set image deployment/myapp myapp=\$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA
    - kubectl rollout status deployment/myapp --timeout=300s
  rules:
    - if: \$CI_COMMIT_BRANCH == "main"
      when: manual`}</code></pre>

      <h2>Testing Strategies in CI/CD</h2>
      <p>
        The testing pyramid remains the most effective model for structuring tests in a CI/CD pipeline: many fast unit tests at the base, fewer integration tests in the middle, and a small number of end-to-end tests at the top. Each layer serves a different purpose and has different reliability characteristics.
      </p>

      <h3>Test Categorization</h3>
      <table>
        <thead>
          <tr><th>Test Type</th><th>Scope</th><th>Speed</th><th>Reliability</th><th>When to Run</th></tr>
        </thead>
        <tbody>
          <tr><td>Unit</td><td>Single function/class</td><td>Milliseconds</td><td>Very high</td><td>Every push</td></tr>
          <tr><td>Integration</td><td>Multiple components</td><td>Seconds</td><td>High</td><td>Every push</td></tr>
          <tr><td>E2E</td><td>Full user workflow</td><td>Minutes</td><td>Medium</td><td>PR merge, pre-deploy</td></tr>
          <tr><td>Performance</td><td>Latency, throughput</td><td>Minutes</td><td>Medium</td><td>Nightly or pre-release</td></tr>
          <tr><td>Security</td><td>Vulnerabilities, SAST</td><td>Minutes</td><td>High</td><td>Every push</td></tr>
          <tr><td>Smoke</td><td>Critical paths only</td><td>Seconds</td><td>Very high</td><td>Post-deploy</td></tr>
        </tbody>
      </table>

      <h3>Handling Flaky Tests</h3>
      <p>
        Flaky tests are the number one enemy of CI/CD reliability. A test that passes 95% of the time will fail approximately once in every 20 runs, eroding team confidence in the pipeline. Here are strategies for dealing with them.
      </p>
      <pre><code className="language-typescript">{`// Strategy 1: Retry flaky tests with exponential backoff
// jest.config.ts
export default {
  // Retry failed tests up to 2 times
  retryTimes: process.env.CI ? 2 : 0,

  // Use a longer timeout in CI environments
  testTimeout: process.env.CI ? 30000 : 10000,
};

// Strategy 2: Quarantine flaky tests
// Move flaky tests to a separate suite that doesn't block the pipeline
// jest.config.ts
export default {
  projects: [
    {
      displayName: 'stable',
      testMatch: ['<rootDir>/tests/**/*.test.ts'],
      testPathIgnorePatterns: ['<rootDir>/tests/quarantine/'],
    },
    {
      displayName: 'quarantine',
      testMatch: ['<rootDir>/tests/quarantine/**/*.test.ts'],
    },
  ],
};

// Strategy 3: Deterministic test data
// Instead of depending on external services or random data:
function createTestUser(overrides: Partial<User> = {}): User {
  return {
    id: 'test-user-fixed-id',
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date('2026-01-01T00:00:00Z'), // Fixed date
    ...overrides,
  };
}`}</code></pre>

      <h2>Deployment Patterns</h2>
      <p>
        How you deploy is as important as what you deploy. Different deployment strategies offer different trade-offs between speed, safety, and resource requirements.
      </p>

      <h3>Blue-Green Deployment</h3>
      <p>
        Blue-green deployment maintains two identical production environments. At any time, one (blue) serves live traffic while the other (green) receives the new deployment. After verification, traffic is switched to green. Rollback is instant: switch traffic back to blue.
      </p>
      <pre><code className="language-yaml">{`# Kubernetes blue-green with service switching
# Deploy to green environment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-green
  labels:
    app: myapp
    version: green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      version: green
  template:
    metadata:
      labels:
        app: myapp
        version: green
    spec:
      containers:
        - name: myapp
          image: registry.example.com/myapp:v2.1.0
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 5
---
# Switch traffic by updating the service selector
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp
    version: green  # Change from "blue" to "green"
  ports:
    - port: 80
      targetPort: 3000`}</code></pre>

      <h3>Canary Deployment</h3>
      <p>
        Canary deployment gradually shifts traffic from the old version to the new version, monitoring error rates and latency at each step. If metrics degrade, the rollout is automatically halted and rolled back.
      </p>
      <pre><code className="language-yaml">{`# Argo Rollouts canary strategy
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: myapp
spec:
  replicas: 10
  strategy:
    canary:
      steps:
        - setWeight: 5       # Send 5% of traffic to canary
        - pause:
            duration: 5m     # Wait 5 minutes
        - setWeight: 20      # Increase to 20%
        - pause:
            duration: 5m
        - setWeight: 50      # Increase to 50%
        - pause:
            duration: 10m
        - setWeight: 100     # Full rollout
      analysis:
        templates:
          - templateName: success-rate
        startingStep: 1      # Start analysis after first traffic shift
        args:
          - name: service-name
            value: myapp
---
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate
spec:
  metrics:
    - name: success-rate
      interval: 60s
      successCondition: result[0] >= 0.99
      provider:
        prometheus:
          address: http://prometheus:9090
          query: |
            sum(rate(http_requests_total{service="{{args.service-name}}",status=~"2.."}[5m]))
            /
            sum(rate(http_requests_total{service="{{args.service-name}}"}[5m]))`}</code></pre>

      <h2>Pipeline Optimization: Speed and Cost</h2>
      <p>
        A fast pipeline is a productive pipeline. Developers waiting 30 minutes for CI feedback lose context and productivity. Target a total pipeline time of under 15 minutes for the critical path (push to deploy-ready).
      </p>

      <h3>Optimization Techniques</h3>
      <ul>
        <li><strong>Parallelize everything possible</strong>: Run lint, unit tests, and security scans concurrently instead of sequentially.</li>
        <li><strong>Cache aggressively</strong>: Cache package manager artifacts (node_modules, pip cache), build outputs, and Docker layers.</li>
        <li><strong>Use incremental builds</strong>: Tools like Nx, Turborepo, and Bazel only rebuild what changed.</li>
        <li><strong>Split test suites</strong>: Run test shards in parallel across multiple runners.</li>
        <li><strong>Minimize Docker image layers</strong>: Combine RUN commands, use multi-stage builds, order layers by change frequency.</li>
        <li><strong>Use larger runners for bottleneck jobs</strong>: A 4x runner that finishes in 3 minutes is cheaper than a 1x runner that takes 15 minutes.</li>
        <li><strong>Skip unnecessary work</strong>: Use path filters to skip backend tests when only frontend code changed.</li>
        <li><strong>Cancel redundant runs</strong>: Use concurrency groups to cancel outdated pipeline runs.</li>
      </ul>

      <pre><code className="language-yaml">{`# GitHub Actions: Path-based filtering and test sharding
jobs:
  backend-tests:
    if: |
      github.event_name == 'push' ||
      contains(github.event.pull_request.changed_files, 'src/api/') ||
      contains(github.event.pull_request.changed_files, 'src/services/')
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - run: npm run test -- --shard=\${{ matrix.shard }}/4`}</code></pre>

      <h2>Secrets Management in Pipelines</h2>
      <p>
        Secrets in CI/CD pipelines require careful handling. Never hardcode secrets in pipeline files, log them, or pass them as command-line arguments (which appear in process lists). Use your platform's built-in secrets management.
      </p>
      <pre><code className="language-yaml">{`# GitHub Actions: Using secrets and OIDC
jobs:
  deploy:
    permissions:
      id-token: write  # Required for OIDC
      contents: read

    steps:
      # OIDC authentication (no long-lived credentials)
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/github-actions
          aws-region: us-east-1

      # Environment-scoped secrets
      - name: Deploy
        env:
          API_KEY: \${{ secrets.PRODUCTION_API_KEY }}
        run: deploy.sh

      # NEVER do this:
      # - run: echo \${{ secrets.API_KEY }}  # Secrets in logs!
      # - run: curl -H "Authorization: \${{ secrets.TOKEN }}" ...  # In process list!`}</code></pre>

      <h2>Pipeline as Code: Best Practices Summary</h2>
      <ul>
        <li><strong>Version control your pipeline</strong>: Pipeline configuration is code. Review it in PRs like any other code change.</li>
        <li><strong>Use reusable workflows</strong>: Extract common patterns into shared workflows or templates.</li>
        <li><strong>Pin action versions</strong>: Use exact SHA references, not floating tags, for third-party actions.</li>
        <li><strong>Set timeouts on every job</strong>: Prevent runaway jobs from consuming resources indefinitely.</li>
        <li><strong>Monitor pipeline metrics</strong>: Track build duration, success rate, and flaky test frequency over time.</li>
        <li><strong>Require status checks</strong>: Configure branch protection rules to require all CI checks to pass before merging.</li>
        <li><strong>Document pipeline architecture</strong>: New team members should understand the pipeline without reading every YAML file.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        A well-architected CI/CD pipeline is a force multiplier for your engineering team. It provides fast feedback, enforces quality gates, and enables confident deployments. Start with the basics -- lint, test, build, deploy -- and incrementally add sophistication as your needs grow. Focus on keeping the pipeline fast (under 15 minutes), reliable (eliminate flaky tests), and secure (use OIDC, never hardcode secrets). The investment in pipeline infrastructure pays dividends in developer productivity and software quality.
      </p>
      <p>
        For more on GitHub Actions, read our <Link href={`/${lang}/blog/github-actions-ci-cd`}>GitHub Actions CI/CD Guide</Link> and <Link href={`/${lang}/blog/github-actions-advanced`}>Advanced GitHub Actions</Link> articles. Explore our <Link href={`/${lang}/tools/git-command-generator`}>Git Command Generator</Link> and <Link href={`/${lang}/blog/docker-security-best-practices`}>Docker Security Best Practices</Link> for related topics.
      </p>
    </>
  );
}
