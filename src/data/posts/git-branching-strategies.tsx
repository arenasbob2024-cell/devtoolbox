'use client';

import Link from 'next/link';

export default function GitBranchingStrategies({ lang }: { lang: string }) {
  return (
    <>
      <h2>Why Git Branching Strategies Matter</h2>
      <p>
        A <strong>Git branching strategy</strong> defines how your team creates, names, merges, and deletes branches throughout the software development lifecycle. Without a clear strategy, teams face merge conflicts, broken builds, inconsistent releases, and deployment nightmares. The right branching model depends on your team size, release cadence, and deployment infrastructure.
      </p>
      <p>
        This guide covers the three most popular branching strategies -- GitFlow, Trunk-Based Development, and GitHub Flow -- with practical examples, comparison tables, and guidelines for choosing the right one for your team.
      </p>

      <h2>GitFlow: The Classic Model</h2>
      <p>
        <strong>GitFlow</strong>, introduced by Vincent Driessen in 2010, is the most structured branching model. It uses long-lived branches with specific purposes and strict merge rules. While some consider it complex, it provides excellent control for teams with scheduled releases.
      </p>

      <h3>GitFlow Branch Structure</h3>
      <pre><code className="language-text">{`Main Branches (permanent):
├── main          # Production-ready code (tagged releases)
└── develop       # Integration branch for features

Supporting Branches (temporary):
├── feature/*     # New features (from develop, merge to develop)
├── release/*     # Release preparation (from develop, merge to main + develop)
├── hotfix/*      # Production fixes (from main, merge to main + develop)
└── bugfix/*      # Bug fixes (from develop, merge to develop)`}</code></pre>

      <h3>GitFlow Workflow</h3>
      <pre><code className="language-bash">{`# 1. Start a new feature
git checkout develop
git checkout -b feature/user-authentication

# Work on feature...
git add .
git commit -m "feat: add login form component"
git commit -m "feat: implement JWT validation"

# 2. Finish feature (merge to develop)
git checkout develop
git merge --no-ff feature/user-authentication
git branch -d feature/user-authentication

# 3. Create release branch
git checkout develop
git checkout -b release/2.1.0

# Bump version, fix last-minute bugs
git commit -m "chore: bump version to 2.1.0"
git commit -m "fix: correct validation message typo"

# 4. Finish release (merge to both main and develop)
git checkout main
git merge --no-ff release/2.1.0
git tag -a v2.1.0 -m "Release 2.1.0"

git checkout develop
git merge --no-ff release/2.1.0
git branch -d release/2.1.0

# 5. Hotfix for production bug
git checkout main
git checkout -b hotfix/2.1.1

git commit -m "fix: critical payment processing bug"

git checkout main
git merge --no-ff hotfix/2.1.1
git tag -a v2.1.1 -m "Hotfix 2.1.1"

git checkout develop
git merge --no-ff hotfix/2.1.1
git branch -d hotfix/2.1.1`}</code></pre>

      <h3>GitFlow Pros and Cons</h3>
      <table>
        <thead>
          <tr><th>Pros</th><th>Cons</th></tr>
        </thead>
        <tbody>
          <tr><td>Clear separation of concerns</td><td>Complex for small teams</td></tr>
          <tr><td>Supports parallel development</td><td>Long-lived branches cause merge conflicts</td></tr>
          <tr><td>Well-suited for versioned releases</td><td>Slow release cycle</td></tr>
          <tr><td>Strict structure prevents mistakes</td><td>Feature branches can become stale</td></tr>
          <tr><td>Good for regulated industries</td><td>Overhead for continuous deployment</td></tr>
        </tbody>
      </table>

      <h2>Trunk-Based Development</h2>
      <p>
        <strong>Trunk-Based Development (TBD)</strong> is the strategy favored by high-performing engineering teams at Google, Facebook, and Netflix. Developers commit directly to a single trunk branch (usually <code>main</code>) or use very short-lived feature branches that live for at most a day or two.
      </p>

      <h3>Trunk-Based Development Structure</h3>
      <pre><code className="language-text">{`Branches:
├── main (trunk)          # The single source of truth
├── feat/login-123        # Short-lived (hours to 1-2 days max)
└── release/2.1           # Optional: release branch cut from trunk

Key Rules:
- Feature branches live < 2 days
- All code merges to trunk daily
- Feature flags hide incomplete work
- Trunk is always deployable
- No long-lived develop branch`}</code></pre>

      <h3>Trunk-Based Workflow</h3>
      <pre><code className="language-bash">{`# 1. Start small, focused work
git checkout main
git pull origin main
git checkout -b feat/add-search-bar

# 2. Make small commits (1-2 days max)
git add .
git commit -m "feat: add search input component"
git push origin feat/add-search-bar

# 3. Create pull request, get review, merge same day
# After PR approval:
git checkout main
git pull origin main
git merge feat/add-search-bar
git push origin main
git branch -d feat/add-search-bar

# 4. Use feature flags for incomplete features
# config/features.ts
# export const FEATURES = {
#   NEW_SEARCH: process.env.ENABLE_NEW_SEARCH === 'true',
#   DARK_MODE: process.env.ENABLE_DARK_MODE === 'true',
# };`}</code></pre>

      <h3>Feature Flags Pattern</h3>
      <pre><code className="language-typescript">{`// Feature flag implementation for trunk-based development
interface FeatureFlags {
  newCheckout: boolean;
  aiSearch: boolean;
  darkMode: boolean;
}

const defaultFlags: FeatureFlags = {
  newCheckout: false,
  aiSearch: false,
  darkMode: true,
};

// Environment-based flags
function getFeatureFlags(): FeatureFlags {
  return {
    newCheckout: process.env.FF_NEW_CHECKOUT === 'true',
    aiSearch: process.env.FF_AI_SEARCH === 'true',
    darkMode: process.env.FF_DARK_MODE !== 'false',
  };
}

// Usage in components
function CheckoutPage() {
  const flags = getFeatureFlags();

  if (flags.newCheckout) {
    return <NewCheckoutFlow />;
  }
  return <LegacyCheckoutFlow />;
}

// Gradual rollout with percentage
function shouldEnableForUser(userId: string, percentage: number): boolean {
  const hash = hashString(userId);
  return (hash % 100) < percentage;
}`}</code></pre>

      <h3>Trunk-Based Pros and Cons</h3>
      <table>
        <thead>
          <tr><th>Pros</th><th>Cons</th></tr>
        </thead>
        <tbody>
          <tr><td>Fewer merge conflicts</td><td>Requires strong CI/CD</td></tr>
          <tr><td>Faster feedback loops</td><td>Feature flags add complexity</td></tr>
          <tr><td>Always deployable trunk</td><td>Requires disciplined team</td></tr>
          <tr><td>Continuous integration</td><td>Code review must be fast</td></tr>
          <tr><td>DORA metrics correlation</td><td>Not ideal for open source</td></tr>
        </tbody>
      </table>

      <h2>GitHub Flow: The Simple Middle Ground</h2>
      <p>
        <strong>GitHub Flow</strong> is a lightweight, branch-based workflow created by GitHub. It is simpler than GitFlow but more structured than pure trunk-based development. It works well for teams practicing continuous deployment with a single production branch.
      </p>

      <h3>GitHub Flow Structure</h3>
      <pre><code className="language-text">{`Branches:
├── main                  # Always deployable to production
├── feature/user-profile  # Feature work
├── fix/login-bug         # Bug fixes
└── docs/api-reference    # Documentation

Rules:
1. main is always deployable
2. Branch off main for any work
3. Open a pull request early
4. Request reviews and discuss
5. Merge to main after approval
6. Deploy immediately after merge`}</code></pre>

      <h3>GitHub Flow Workflow</h3>
      <pre><code className="language-bash">{`# 1. Create a branch from main
git checkout main
git pull origin main
git checkout -b feature/user-profile

# 2. Make commits with descriptive messages
git add .
git commit -m "feat: add profile page layout"
git commit -m "feat: implement avatar upload"
git commit -m "test: add profile page tests"

# 3. Push and create pull request
git push -u origin feature/user-profile
# Create PR on GitHub with description and reviewers

# 4. Discuss and review
# Team reviews code, CI runs tests
# Make additional commits if needed
git commit -m "fix: address review feedback on avatar sizing"
git push

# 5. Merge after approval
# Use squash merge or merge commit on GitHub
# PR is merged to main

# 6. Deploy
# Automatic deployment triggers after merge to main
# Delete the feature branch
git checkout main
git pull origin main
git branch -d feature/user-profile`}</code></pre>

      <h3>GitHub Flow Pros and Cons</h3>
      <table>
        <thead>
          <tr><th>Pros</th><th>Cons</th></tr>
        </thead>
        <tbody>
          <tr><td>Simple to understand</td><td>No release branch concept</td></tr>
          <tr><td>Great for continuous deployment</td><td>Less control over releases</td></tr>
          <tr><td>Pull request culture</td><td>Main must always be stable</td></tr>
          <tr><td>Works for any team size</td><td>No version separation</td></tr>
          <tr><td>Good for SaaS products</td><td>Hotfixes go through same process</td></tr>
        </tbody>
      </table>

      <h2>Comparison: All Three Strategies</h2>
      <table>
        <thead>
          <tr><th>Aspect</th><th>GitFlow</th><th>Trunk-Based</th><th>GitHub Flow</th></tr>
        </thead>
        <tbody>
          <tr><td>Complexity</td><td>High</td><td>Low</td><td>Low</td></tr>
          <tr><td>Main Branches</td><td>main + develop</td><td>main only</td><td>main only</td></tr>
          <tr><td>Feature Branch Life</td><td>Days to weeks</td><td>Hours to 1-2 days</td><td>Days to a week</td></tr>
          <tr><td>Release Process</td><td>Release branches</td><td>Feature flags + deploy</td><td>Merge to main = release</td></tr>
          <tr><td>Merge Conflicts</td><td>Frequent</td><td>Rare</td><td>Moderate</td></tr>
          <tr><td>CI/CD Required</td><td>Optional</td><td>Essential</td><td>Recommended</td></tr>
          <tr><td>Best For</td><td>Versioned products</td><td>SaaS, web apps</td><td>SaaS, small teams</td></tr>
          <tr><td>Team Size</td><td>Large teams</td><td>Any (with discipline)</td><td>Small to medium</td></tr>
          <tr><td>Learning Curve</td><td>Steep</td><td>Moderate</td><td>Easy</td></tr>
          <tr><td>Deployment Freq</td><td>Scheduled</td><td>Multiple per day</td><td>Per merge</td></tr>
        </tbody>
      </table>

      <h2>Branch Naming Conventions</h2>
      <pre><code className="language-text">{`# Recommended naming patterns
feature/TICKET-123-add-user-auth     # Feature with ticket number
fix/TICKET-456-login-redirect        # Bug fix
hotfix/TICKET-789-payment-crash      # Production hotfix
docs/update-api-reference            # Documentation
chore/upgrade-dependencies           # Maintenance
refactor/simplify-auth-flow          # Code improvement
test/add-integration-tests           # Test coverage

# Commit message convention (Conventional Commits)
feat: add user authentication module
fix: resolve login redirect loop
docs: update API authentication guide
chore: upgrade React to 19.1
refactor: simplify payment processing logic
test: add e2e tests for checkout flow
perf: optimize image loading pipeline
ci: add staging deployment workflow`}</code></pre>

      <h2>CI/CD Pipeline Configuration</h2>
      <pre><code className="language-yaml">{`# .github/workflows/ci.yml - Works with any branching strategy
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - run: npx vercel --yes --token \${{ secrets.VERCEL_TOKEN }}

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - run: npx vercel --prod --yes --token \${{ secrets.VERCEL_TOKEN }}`}</code></pre>

      <h2>Choosing the Right Strategy</h2>

      <h3>Choose GitFlow If:</h3>
      <ul>
        <li>You ship versioned software (mobile apps, desktop apps, libraries)</li>
        <li>You have scheduled release cycles (monthly, quarterly)</li>
        <li>Multiple versions need to be maintained in parallel</li>
        <li>Your team is large (10+ developers) and needs structure</li>
        <li>You work in regulated industries requiring audit trails</li>
      </ul>

      <h3>Choose Trunk-Based If:</h3>
      <ul>
        <li>You deploy to production multiple times per day</li>
        <li>Your team has strong CI/CD infrastructure</li>
        <li>You are building a web application or SaaS product</li>
        <li>Your team is experienced and disciplined</li>
        <li>You want to optimize for DORA metrics</li>
      </ul>

      <h3>Choose GitHub Flow If:</h3>
      <ul>
        <li>You want simplicity without sacrificing structure</li>
        <li>Your team is small to medium (2-15 developers)</li>
        <li>You practice continuous deployment</li>
        <li>You work on a single production version</li>
        <li>You are new to branching strategies and want a good starting point</li>
      </ul>

      <h2>Common Pitfalls to Avoid</h2>
      <ul>
        <li><strong>Long-lived feature branches</strong>: Merge daily or use feature flags to avoid painful merge conflicts</li>
        <li><strong>No branch protection</strong>: Always require PR reviews and passing CI checks before merging to main</li>
        <li><strong>Inconsistent naming</strong>: Enforce branch naming conventions with git hooks or CI checks</li>
        <li><strong>Skipping tests</strong>: Every branch should pass the full test suite before merging</li>
        <li><strong>Not deleting merged branches</strong>: Clean up merged branches to keep the repository tidy</li>
        <li><strong>Force-pushing to shared branches</strong>: Never force-push to main or develop</li>
        <li><strong>Cherry-picking between branches</strong>: Prefer merging to avoid lost commits and inconsistencies</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        The best branching strategy is the one your team consistently follows. Start with <strong>GitHub Flow</strong> if you are unsure -- it is simple, effective, and easy to adopt. Move to <strong>trunk-based development</strong> as your CI/CD matures and your team grows more disciplined. Reserve <strong>GitFlow</strong> for projects that genuinely need versioned releases and parallel version maintenance.
      </p>
      <p>
        Whatever strategy you choose, invest in automation: branch protection rules, CI/CD pipelines, automated testing, and consistent naming conventions. These practices matter more than the specific branching model you follow.
      </p>
      <p>
        Practice your Git commands with our <Link href={`/${lang}/tools/hash-generator`}>Hash Generator</Link> and explore other <Link href={`/${lang}/blog/git-commands-cheat-sheet`}>Git commands cheat sheet</Link> to improve your workflow.
      </p>
    </>
  );
}
