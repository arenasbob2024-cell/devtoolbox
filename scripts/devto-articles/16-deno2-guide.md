---
title: "Deno 2 is Here: What Developers Need to Know"
tags: deno, javascript, nodejs, webdev
canonical_url: https://viadreams.cc/en/blog/deno-2-guide
published: true
---

Deno 2 dropped in October 2024 with full Node.js and npm compatibility. After years of being the "Node killer that nobody uses", Deno 2 is finally ready for production. Here's what changed.

## The Big News: npm Compatibility

The original Deno had a fundamental problem: you couldn't use npm packages. Deno 2 fixes this completely.

```typescript
// Deno 2 - npm packages work directly
import express from "npm:express@4";
import { z } from "npm:zod";

const app = express();
app.get("/", (req, res) => res.json({ hello: "Deno 2" }));
app.listen(3000);
```

No `node_modules`, no `package.json` required. Just import.

## Node.js API Compatibility

Deno 2 implements most Node.js built-ins:

```typescript
// These Node.js-style imports now work in Deno 2
import fs from "node:fs/promises";
import path from "node:path";
import { createServer } from "node:http";

const data = await fs.readFile("./config.json", "utf-8");
console.log(path.resolve("./output"));
```

This means most Node.js packages work without modification.

## The Permission System Still Rocks

Deno's security model is still its killer feature:

```bash
# Explicit permissions - no more accidental file access
deno run --allow-net --allow-read=./data script.ts

# Deny specific things even if others are allowed
deno run --allow-net --deny-net=evil.com script.ts
```

## Workspaces and Monorepos

Deno 2 adds workspace support via `deno.json`:

```json
{
  "workspace": ["./packages/core", "./packages/api", "./packages/ui"]
}
```

Each package has its own `deno.json` with imports and tasks.

## Deno Deploy: Serverless at the Edge

Deploy to 35+ regions with zero config:

```bash
deno install -g jsr:@deno/deployctl
deployctl deploy --project=my-app --entrypoint=main.ts
```

Cold starts under 1ms. No containers, no Lambda cold starts.

## Should You Switch?

**Use Deno 2 if:**
- Starting a new project (TypeScript-first experience is excellent)
- Building edge functions (fastest cold starts available)
- Tired of npm/node_modules complexity

**Stick with Node.js if:**
- Large existing codebase with complex dependencies
- Team not ready to change tooling
- Need specific npm packages that use native addons

## Try It Now

Use the [TypeScript Playground on DevToolBox](https://viadreams.cc/en/tools/typescript-playground) to test TypeScript code before running it with Deno.

The future is serverless and edge-first. Deno 2 is ready for it.

---

*Full Deno 2 guide at [viadreams.cc/en/blog/deno-2-guide](https://viadreams.cc/en/blog/deno-2-guide)*
