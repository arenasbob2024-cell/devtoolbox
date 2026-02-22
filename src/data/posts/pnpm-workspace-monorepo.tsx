export default function PnpmWorkspaceMonorepo() {
  return (
    <>
      <h2>pnpm Workspace Monorepo Setup: The Complete Guide</h2>
      <p>
        pnpm workspaces provide the fastest, most disk-efficient way to manage a JavaScript/TypeScript
        monorepo. Unlike npm and yarn, pnpm uses a content-addressable store and hard links, meaning
        shared dependencies are stored only once on disk regardless of how many packages use them. This
        guide walks through setting up a production-ready pnpm monorepo from scratch, including shared
        configs, internal packages, and CI/CD pipelines.
      </p>

      <h2>Why pnpm for Monorepos?</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>npm workspaces</th>
            <th>yarn workspaces</th>
            <th>pnpm workspaces</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Disk usage (500 deps)</td><td>~800 MB</td><td>~700 MB</td><td>~400 MB</td></tr>
          <tr><td>Install speed (cold)</td><td>~25s</td><td>~18s</td><td>~12s</td></tr>
          <tr><td>Install speed (warm)</td><td>~10s</td><td>~6s</td><td>~2s</td></tr>
          <tr><td>Strict node_modules</td><td>No (hoisted)</td><td>Partial (PnP)</td><td>Yes (isolated by default)</td></tr>
          <tr><td>Phantom deps prevention</td><td>No</td><td>With PnP</td><td>Yes (strict by default)</td></tr>
          <tr><td>Filtering commands</td><td>Basic (-w flag)</td><td>Good (foreach)</td><td>Excellent (--filter)</td></tr>
          <tr><td>Content-addressable store</td><td>No</td><td>No</td><td>Yes</td></tr>
          <tr><td>Side effects cache</td><td>No</td><td>No</td><td>Yes</td></tr>
        </tbody>
      </table>

      <h2>Initial Setup</h2>
      <pre><code className="language-bash">{`# Install pnpm globally
npm install -g pnpm@latest
# Or use corepack (Node.js 16+)
corepack enable
corepack prepare pnpm@latest --activate

# Create project directory
mkdir my-monorepo && cd my-monorepo

# Initialize root package.json
pnpm init

# Create the workspace configuration
touch pnpm-workspace.yaml`}</code></pre>

      <h3>pnpm-workspace.yaml</h3>
      <pre><code className="language-yaml">{`# pnpm-workspace.yaml
packages:
  - 'apps/*'        # Applications (web, api, admin, etc.)
  - 'packages/*'    # Shared libraries and configs
  - 'tools/*'       # Build tools, scripts, generators`}</code></pre>

      <h3>Root package.json</h3>
      <pre><code className="language-json">{`{
  "name": "my-monorepo",
  "private": true,
  "packageManager": "pnpm@9.5.0",
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  },
  "scripts": {
    "dev": "pnpm -r --parallel run dev",
    "build": "pnpm -r run build",
    "test": "pnpm -r run test",
    "lint": "pnpm -r run lint",
    "type-check": "pnpm -r run type-check",
    "clean": "pnpm -r run clean && rm -rf node_modules",
    "format": "prettier --write '**/*.{ts,tsx,js,json,md,yaml}' --ignore-path .gitignore",
    "prepare": "husky"
  },
  "devDependencies": {
    "prettier": "^3.3.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "typescript": "^5.5.0"
  },
  "lint-staged": {
    "*.{ts,tsx,js}": ["prettier --write", "eslint --fix"],
    "*.{json,md,yaml}": ["prettier --write"]
  }
}`}</code></pre>

      <h3>.npmrc Configuration</h3>
      <pre><code className="language-ini">{`# .npmrc — pnpm-specific settings

# Hoist only these packages to the root (needed for some tools)
public-hoist-pattern[]=*prettier*
public-hoist-pattern[]=*eslint*

# Strict mode — prevent importing undeclared dependencies
strict-peer-dependencies=false
auto-install-peers=true

# Performance
prefer-frozen-lockfile=true

# Save exact versions
save-exact=true`}</code></pre>

      <h2>Project Structure</h2>
      <pre><code className="language-text">{`my-monorepo/
├── apps/
│   ├── web/                       # Next.js web application
│   │   ├── package.json           # name: "@acme/web"
│   │   ├── tsconfig.json
│   │   ├── next.config.ts
│   │   └── src/
│   ├── api/                       # Express/Fastify API server
│   │   ├── package.json           # name: "@acme/api"
│   │   ├── tsconfig.json
│   │   └── src/
│   └── admin/                     # Admin dashboard
│       ├── package.json           # name: "@acme/admin"
│       └── src/
├── packages/
│   ├── ui/                        # Shared React component library
│   │   ├── package.json           # name: "@acme/ui"
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── components/
│   │       │   ├── Button.tsx
│   │       │   ├── Input.tsx
│   │       │   └── Modal.tsx
│   │       └── index.ts
│   ├── shared/                    # Shared types and utilities
│   │   ├── package.json           # name: "@acme/shared"
│   │   └── src/
│   │       ├── types.ts
│   │       ├── validators.ts
│   │       └── index.ts
│   ├── config-eslint/             # Shared ESLint config
│   │   ├── package.json           # name: "@acme/eslint-config"
│   │   └── index.js
│   └── config-typescript/         # Shared TypeScript configs
│       ├── package.json           # name: "@acme/typescript-config"
│       ├── base.json
│       ├── nextjs.json
│       └── node.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── package.json
├── .npmrc
├── .gitignore
└── turbo.json                     # Optional: Turborepo for task caching`}</code></pre>

      <h2>Creating Internal Packages</h2>
      <h3>Shared UI Library</h3>
      <pre><code className="language-json">{`// packages/ui/package.json
{
  "name": "@acme/ui",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "import": "./src/index.ts"
    },
    "./components/*": {
      "types": "./src/components/*.tsx",
      "import": "./src/components/*.tsx"
    }
  },
  "scripts": {
    "lint": "eslint src/",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "@acme/typescript-config": "workspace:*",
    "@types/react": "^18.3.0",
    "typescript": "^5.5.0"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}`}</code></pre>
      <pre><code className="language-typescript">{`// packages/ui/src/components/Button.tsx
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children, className, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
            'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
            'bg-transparent hover:bg-gray-100': variant === 'ghost',
            'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
            'opacity-50 cursor-not-allowed': disabled || isLoading,
          },
          className
        )}
        {...props}
      >
        {isLoading ? 'Loading...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// packages/ui/src/index.ts
export { Button, type ButtonProps } from './components/Button';
export { Input, type InputProps } from './components/Input';
export { Modal, type ModalProps } from './components/Modal';`}</code></pre>

      <h3>Shared TypeScript Config</h3>
      <pre><code className="language-json">{`// packages/config-typescript/base.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "exclude": ["node_modules", "dist", ".next"]
}

// packages/config-typescript/nextjs.json
{
  "extends": "./base.json",
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  }
}`}</code></pre>

      <h2>Essential pnpm Commands</h2>
      <pre><code className="language-bash">{`# Install all dependencies
pnpm install

# Add a dependency to a specific package
pnpm add zod --filter @acme/api
pnpm add -D vitest --filter @acme/shared

# Add a workspace dependency (internal package)
pnpm add @acme/shared --filter @acme/api --workspace
pnpm add @acme/ui --filter @acme/web --workspace

# Run a script in a specific package
pnpm --filter @acme/web dev
pnpm --filter @acme/api test

# Run across all packages
pnpm -r run build          # Run build in all packages
pnpm -r --parallel run dev # Run dev in parallel

# Filter by directory
pnpm --filter ./apps/* run build
pnpm --filter ./packages/* run type-check

# Filter by dependency graph
pnpm --filter @acme/web... run build    # web and all its deps
pnpm --filter ...@acme/shared run test  # shared and all dependents

# Filter by changed files (great for CI)
pnpm --filter "...[origin/main]" run test  # Test changed packages

# List all workspace packages
pnpm ls -r --depth -1

# Why is a package installed?
pnpm why react --filter @acme/web

# Update dependencies across workspace
pnpm -r update typescript
pnpm -r update --latest     # Update to latest major versions`}</code></pre>

      <h2>Consuming Internal Packages</h2>
      <pre><code className="language-json">{`// apps/web/package.json
{
  "name": "@acme/web",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@acme/ui": "workspace:*",
    "@acme/shared": "workspace:*",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@acme/eslint-config": "workspace:*",
    "@acme/typescript-config": "workspace:*",
    "@types/react": "^18.3.0",
    "typescript": "^5.5.0"
  }
}`}</code></pre>
      <pre><code className="language-typescript">{`// apps/web/src/app/page.tsx
import { Button } from '@acme/ui';
import { formatDate, type User } from '@acme/shared';

export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </main>
  );
}`}</code></pre>

      <h2>CI/CD with pnpm</h2>
      <pre><code className="language-yaml">{`# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Type check
        run: pnpm -r run type-check

      - name: Lint
        run: pnpm -r run lint

      - name: Test changed packages
        run: pnpm --filter "...[origin/main]" run test

      - name: Build
        run: pnpm -r run build`}</code></pre>

      <h2>Integrating with Turborepo</h2>
      <pre><code className="language-json">{`// turbo.json — optional but recommended for caching
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "lint": { "outputs": [] },
    "type-check": { "dependsOn": ["^build"], "outputs": [] }
  }
}`}</code></pre>
      <pre><code className="language-bash">{`# Install Turborepo as a dev dependency
pnpm add -D turbo -w

# Use turbo instead of pnpm -r for task running
pnpm turbo build      # Builds with caching and correct order
pnpm turbo test       # Only re-tests changed packages
pnpm turbo dev        # Starts all dev servers in parallel`}</code></pre>

      <h2>Best Practices</h2>
      <ul>
        <li><strong>Use workspace:* protocol</strong> — always reference internal packages with <code>workspace:*</code></li>
        <li><strong>Pin pnpm version</strong> — set <code>packageManager</code> in root package.json for reproducible installs</li>
        <li><strong>Enable strict mode</strong> — pnpm prevents phantom dependencies by default; do not disable this</li>
        <li><strong>Use --frozen-lockfile in CI</strong> — never let CI modify the lockfile</li>
        <li><strong>Scope dev dependencies</strong> — shared tools (prettier, husky) go in root; package-specific tools go in the package</li>
        <li><strong>Add Turborepo for caching</strong> — pnpm handles dependencies, Turborepo handles task orchestration</li>
        <li><strong>Use filter for CI</strong> — only build/test packages affected by the PR</li>
      </ul>

      <p>
        Validate your package.json and turbo.json files with our <a href="/en/tools/json-formatter">JSON Formatter</a>.
        For a broader look at monorepo tooling, read our{" "}
        <a href="/en/blog/monorepo-guide-2026">Monorepo Guide 2026</a> covering Turborepo and Nx.
        For comparing pnpm with other package managers, see our{" "}
        <a href="/en/blog/npm-vs-yarn-vs-pnpm-vs-bun-comparison">npm vs yarn vs pnpm vs Bun</a> comparison.
      </p>
    </>
  );
}
