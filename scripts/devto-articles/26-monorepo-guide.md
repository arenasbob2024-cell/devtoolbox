---
title: "Monorepo in 2026: Turborepo vs Nx vs pnpm Workspaces"
tags: javascript, typescript, programming, devops
canonical_url: https://viadreams.cc/en/blog/monorepo-tools-2026
published: true
---

Managing multiple related packages is painful. Monorepos solve it by putting everything in one repo with shared tooling.

## Why Monorepos?

- **Atomic commits** across multiple packages
- **Shared code** without npm publishing dance
- **Consistent tooling** (ESLint, TypeScript, tests) everywhere
- **Easy refactoring** across package boundaries

## pnpm Workspaces (The Foundation)

Most monorepo tools build on workspace protocols. pnpm's is the best:

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

```json
// packages/ui/package.json
{ "name": "@myapp/ui", "version": "1.0.0" }

// apps/web/package.json
{
  "dependencies": {
    "@myapp/ui": "workspace:*"  // Always uses local version
  }
}
```

```bash
pnpm install           # Install all packages
pnpm -r build          # Build all packages
pnpm -F @myapp/ui dev  # Run dev in specific package
```

## Turborepo: Speed First

Turborepo's killer feature is **remote caching** — build once, share across your team:

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],   // Build deps first
      "outputs": [".next/**", "dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    }
  }
}
```

```bash
turbo run build         # Builds in optimal order, caches results
turbo run build --dry   # Show what would run
turbo run build --graph # Visualize the dependency graph
```

### Remote Caching

```bash
turbo login              # Connect to Vercel (free for personal use)
turbo link               # Link this repo

# Now: if CI built this exact code, turbo downloads the cache
# instead of rebuilding. Zero time builds on unchanged packages.
```

## Nx: Full-Featured Monorepo Framework

Nx goes further with code generation, dependency graph visualization, and affected commands:

```bash
npx create-nx-workspace myapp --preset=next

# Generate components/apps
nx g @nx/react:component Button --project=ui
nx g @nx/next:app dashboard

# Only run tasks affected by changes
nx affected --target=build
nx affected --target=test --base=main

# Visualize the entire dependency graph
nx graph
```

Nx can also enforce module boundaries:

```json
// .eslintrc.json
{
  "rules": {
    "@nx/enforce-module-boundaries": ["error", {
      "depConstraints": [
        { "sourceTag": "scope:app", "onlyDependOnLibsWithTags": ["scope:lib"] },
        { "sourceTag": "type:ui", "onlyDependOnLibsWithTags": ["type:ui", "type:util"] }
      ]
    }]
  }
}
```

## Choosing

| | pnpm workspaces | Turborepo | Nx |
|--|--|--|--|
| Setup | Simple | Easy | More setup |
| Caching | No | Yes (Vercel) | Yes (Nx Cloud) |
| Code gen | No | No | Yes |
| Best for | Small teams | Medium projects | Large orgs |
| Opinionated | No | Low | High |

**Recommendation:** Start with pnpm workspaces. Add Turborepo when builds get slow. Switch to Nx if you need code generation and enforcement.

Use [JSON Validator](https://viadreams.cc/en/tools/json-validator-online) to validate your workspace configuration files.

---

*Full monorepo guide at [viadreams.cc/en/blog/monorepo-tools-2026](https://viadreams.cc/en/blog/monorepo-tools-2026)*
