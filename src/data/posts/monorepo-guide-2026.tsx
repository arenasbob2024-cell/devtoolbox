export default function MonorepoGuide2026() {
  return (
    <>
      <h2>Monorepo Guide 2026: Setting Up Turborepo and Nx for Modern JavaScript Projects</h2>
      <p>
        Monorepos — single repositories containing multiple related packages or applications — have become
        the standard architecture for medium and large JavaScript projects. Companies like Google, Meta,
        Vercel, and Microsoft manage enormous codebases in monorepos. The tooling in 2026 has matured
        dramatically: Turborepo and Nx are the two leading solutions, each with a distinct philosophy.
        This guide covers both tools, helps you choose between them, and provides practical setup
        instructions for real-world project structures.
      </p>

      <h2>Why Use a Monorepo?</h2>
      <p>
        Before picking a tool, understand the benefits and trade-offs that make monorepos compelling.
      </p>
      <ul>
        <li><strong>Atomic cross-package changes</strong> — Change a shared utility and the consuming apps in one commit, with one PR</li>
        <li><strong>Shared tooling</strong> — One ESLint config, one TypeScript base config, one testing setup</li>
        <li><strong>Simplified dependency management</strong> — No version mismatch between internal packages</li>
        <li><strong>Faster CI with caching</strong> — Only rebuild and retest what actually changed</li>
        <li><strong>Code sharing without publishing</strong> — Share code between apps without npm publish cycles</li>
        <li><strong>Unified developer experience</strong> — One place to clone, one <code>npm install</code>, consistent commands</li>
      </ul>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Turborepo</th>
            <th>Nx</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Learning curve</td><td>Low</td><td>Medium-High</td></tr>
          <tr><td>Config overhead</td><td>Minimal</td><td>Moderate</td></tr>
          <tr><td>Build caching</td><td>Excellent (local + remote)</td><td>Excellent (local + remote)</td></tr>
          <tr><td>Task orchestration</td><td>Pipeline-based</td><td>Graph-based (more powerful)</td></tr>
          <tr><td>Code generation</td><td>Basic generators</td><td>Full generator system</td></tr>
          <tr><td>IDE integration</td><td>Good</td><td>Excellent (Nx Console)</td></tr>
          <tr><td>Best for</td><td>Frontend/fullstack, Next.js shops</td><td>Enterprise, Angular, mixed stacks</td></tr>
        </tbody>
      </table>

      <h2>Turborepo Setup</h2>
      <p>
        Turborepo (from Vercel) is the simpler of the two. It focuses on task running and caching with
        minimal configuration. It integrates naturally with npm/yarn/pnpm workspaces.
      </p>

      <h3>Initial Setup</h3>
      <pre><code className="language-bash">{`# Create a new Turborepo project
npx create-turbo@latest my-monorepo

# Or add Turborepo to an existing workspace
npm install turbo --save-dev --workspace-root

# Recommended: use pnpm for best workspace performance
pnpm dlx create-turbo@latest my-monorepo --package-manager pnpm`}</code></pre>

      <h3>Project Structure</h3>
      <pre><code className="language-text">{`my-monorepo/
├── apps/
│   ├── web/                    # Next.js app
│   │   ├── package.json
│   │   └── ...
│   ├── admin/                  # Another Next.js app
│   │   ├── package.json
│   │   └── ...
│   └── api/                    # Express/Fastify API
│       ├── package.json
│       └── ...
├── packages/
│   ├── ui/                     # Shared React component library
│   │   ├── package.json        # name: "@acme/ui"
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   └── tsconfig.json
│   ├── config/                 # Shared configs
│   │   ├── package.json        # name: "@acme/config"
│   │   ├── eslint/
│   │   │   └── index.js
│   │   └── typescript/
│   │       ├── base.json
│   │       ├── nextjs.json
│   │       └── react-library.json
│   └── utils/                  # Shared utilities
│       ├── package.json        # name: "@acme/utils"
│       └── src/
│           ├── format.ts
│           └── validate.ts
├── turbo.json                  # Turborepo config
├── package.json                # Root workspace config
└── pnpm-workspace.yaml`}</code></pre>

      <h3>turbo.json Configuration</h3>
      <pre><code className="language-json">{`{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"],
      "cache": true
    },
    "dev": {
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"]
    },
    "lint": {
      "outputs": [],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "*.json", ".eslintrc.*"]
    },
    "type-check": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "clean": {
      "cache": false
    }
  }
}`}</code></pre>
      <p>
        The <code>^build</code> syntax means "run <code>build</code> in all dependencies first." This
        ensures <code>@acme/ui</code> is built before the apps that depend on it.
      </p>

      <h3>Root package.json</h3>
      <pre><code className="language-json">{`{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "clean": "turbo run clean && rm -rf node_modules",
    "format": "prettier --write \"**/*.{ts,tsx,md,json}\" --ignore-path .gitignore"
  },
  "devDependencies": {
    "turbo": "latest",
    "prettier": "^3.0.0",
    "typescript": "^5.4.0"
  },
  "packageManager": "pnpm@9.0.0"
}`}</code></pre>

      <h3>pnpm-workspace.yaml</h3>
      <pre><code className="language-yaml">{`packages:
  - 'apps/*'
  - 'packages/*'`}</code></pre>

      <h3>Shared TypeScript Configuration</h3>
      <pre><code className="language-json">{`// packages/config/typescript/base.json
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
    "exactOptionalPropertyTypes": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}

// packages/config/typescript/nextjs.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
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

      <h3>Internal Package Setup</h3>
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
      "default": "./src/index.ts"
    }
  },
  "scripts": {
    "lint": "eslint src/ --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "@acme/config": "workspace:*",
    "@types/react": "^18.3.0",
    "typescript": "^5.4.0"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0"
  }
}`}</code></pre>
      <pre><code className="language-typescript">{`// packages/ui/src/Button.tsx
import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={\`\${variantClasses[variant]} \${sizeClasses[size]} rounded-lg font-medium transition-colors \${className}\`}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}

// packages/ui/src/index.ts — barrel export
export { Button } from './Button';
export { Card } from './Card';
export type { ButtonProps } from './Button';`}</code></pre>

      <h2>Remote Caching</h2>
      <p>
        Remote caching is one of Turborepo's most powerful features. Build artifacts are shared across
        all developers and CI machines, so if a colleague already built the same commit, you get an
        instant cache hit instead of rebuilding.
      </p>
      <pre><code className="language-bash">{`# Vercel Remote Cache (free for Vercel users)
npx turbo login
npx turbo link

# Self-hosted remote cache (Turborepo supports any S3-compatible store)
# Set these environment variables:
# TURBO_API=https://your-cache-server.com
# TURBO_TOKEN=your-token
# TURBO_TEAM=your-team-slug

# GitHub Actions with remote cache
# .github/workflows/ci.yml
# env:
#   TURBO_TOKEN: ${'${{ secrets.TURBO_TOKEN }}'}
#   TURBO_TEAM: ${'${{ vars.TURBO_TEAM }}'}`}</code></pre>

      <h2>Nx Setup</h2>
      <p>
        Nx provides a more structured and feature-rich monorepo experience. It shines in large teams,
        enterprise environments, and projects with multiple frameworks (React, Angular, Node.js, etc.).
      </p>
      <pre><code className="language-bash">{`# Create new Nx workspace
npx create-nx-workspace@latest my-workspace

# Add to existing project
npx nx@latest init

# Add Next.js app
nx generate @nx/next:application web --directory=apps/web

# Add a shared library
nx generate @nx/react:library ui --directory=packages/ui --bundler=vite

# Add an Express API
nx generate @nx/express:application api --directory=apps/api

# Run affected tasks only (most powerful Nx feature)
# Only tests packages changed since last commit
nx affected --target=test

# Visualize the project dependency graph
nx graph`}</code></pre>

      <h3>nx.json Configuration</h3>
      <pre><code className="language-json">{`{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "defaultBase": "main",
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "production": [
      "default",
      "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
      "!{projectRoot}/tsconfig.spec.json",
      "!{projectRoot}/.eslintrc.json"
    ],
    "sharedGlobals": ["{workspaceRoot}/.github/workflows/ci.yml"]
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"],
      "cache": true
    },
    "test": {
      "inputs": ["default", "^production", "{workspaceRoot}/jest.preset.js"],
      "cache": true
    },
    "lint": {
      "inputs": ["default", "{workspaceRoot}/.eslintrc.json"],
      "cache": true
    }
  },
  "plugins": [
    "@nx/next/plugin",
    "@nx/eslint/plugin",
    "@nx/vite/plugin"
  ]
}`}</code></pre>

      <h2>CI/CD Pipeline</h2>
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
          fetch-depth: 0  # Required for Nx affected commands

      - uses: pnpm/action-setup@v3
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      # For Turborepo
      - name: Build
        run: pnpm turbo build --filter="...[origin/main]"
        env:
          TURBO_TOKEN: \${{ secrets.TURBO_TOKEN }}
          TURBO_TEAM: \${{ vars.TURBO_TEAM }}

      - name: Test
        run: pnpm turbo test --filter="...[origin/main]"
        env:
          TURBO_TOKEN: \${{ secrets.TURBO_TOKEN }}
          TURBO_TEAM: \${{ vars.TURBO_TEAM }}

      # For Nx (alternative)
      # - name: Build affected
      #   run: npx nx affected --target=build --base=origin/main
      # - name: Test affected
      #   run: npx nx affected --target=test --base=origin/main`}</code></pre>

      <h2>Choosing: Turborepo vs Nx</h2>
      <ul>
        <li>
          <strong>Choose Turborepo</strong> if you want minimal config, are already using Vercel, your
          stack is primarily Next.js, or you want to get started in under an hour.
        </li>
        <li>
          <strong>Choose Nx</strong> if you need code generation, have a large team that benefits from
          enforced project boundaries, work with multiple frameworks, or need the project graph visualization
          to understand dependency relationships.
        </li>
        <li>
          <strong>Both are excellent choices</strong> for remote caching and affected task running, which
          are the core features that make monorepos fast in CI.
        </li>
      </ul>

      <p>
        When working with your monorepo packages, our <a href="/en/tools/json-formatter">JSON Formatter</a>{" "}
        tool can help validate <code>package.json</code> and <code>turbo.json</code> files. For generating
        unique IDs across your packages, try our <a href="/en/tools/uuid-generator">UUID Generator</a>.
        You can also read our <a href="/en/blog/git-branching-strategies">Git Branching Strategies</a> guide
        for branch management patterns that work well with monorepo workflows.
      </p>
    </>
  );
}
