---
title: "TypeScript 5 Features You Should Start Using Today"
tags: typescript, javascript, programming, webdev
canonical_url: https://viadreams.cc/en/blog/typescript-5-features
published: true
---

TypeScript 5 shipped major features that change how you write TypeScript. Here are the ones worth adopting immediately.

## Decorators Are Finally Standard

After years of experimental decorators, TypeScript 5 implements the Stage 3 ECMAScript decorator proposal:

```typescript
// New standard decorators
function log(target: any, context: ClassMethodDecoratorContext) {
  return function(this: any, ...args: any[]) {
    console.log(`Calling ${String(context.name)}`);
    return target.call(this, ...args);
  };
}

class UserService {
  @log
  async getUser(id: string) {
    return fetch(`/api/users/${id}`).then(r => r.json());
  }
}
```

The new syntax is cleaner and no longer needs `experimentalDecorators` in tsconfig.

## const Type Parameters

Preserve literal types in generic functions:

```typescript
// Before TS 5: type is string[]
function getValues<T>(arr: T[]) { return arr; }
const v1 = getValues(['a', 'b']); // string[]

// TS 5: type is ['a', 'b']  
function getValues<const T>(arr: T[]) { return arr; }
const v2 = getValues(['a', 'b']); // readonly ['a', 'b']
```

Extremely useful for builder patterns and config objects.

## The satisfies Operator

Validate types without losing specificity:

```typescript
type Colors = Record<string, [number, number, number]>;

// Old way: loses the specific key types
const colors: Colors = {
  red: [255, 0, 0],
  green: [0, 255, 0],
};
// colors.red is [number, number, number] - lost literal position info

// New way: validates AND preserves types
const colors = {
  red: [255, 0, 0],
  green: [0, 255, 0],
} satisfies Colors;
// colors.red is [number, number, number] - specific tuple type preserved
```

## Improved Module Resolution

TypeScript 5 adds `bundler` as a module resolution option, perfect for Vite/esbuild:

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

No more fighting with `.js` extensions in imports.

## Multiple Config Files (extends Array)

```json
{
  "extends": ["@tsconfig/strictest", "@tsconfig/next"]
}
```

Stack multiple base configs instead of one.

Try the [TypeScript to JavaScript Converter](https://viadreams.cc/en/tools/typescript-to-javascript-converter) to see how TS 5 code strips to clean JS.

---

*Full TS 5 guide at [viadreams.cc/en/blog/typescript-5-features](https://viadreams.cc/en/blog/typescript-5-features)*
