---
title: "OpenAPI to TypeScript: Generate Types from Swagger with openapi-typescript"
tags: typescript, openapi, swagger, webdev
canonical_url: https://viadreams.cc/en/blog/openapi-to-typescript-online-guide
published: true
---

Generate TypeScript types from OpenAPI/Swagger specs automatically. Here's the complete workflow.

## openapi-typescript CLI

```bash
# Install
npm install -D openapi-typescript typescript

# Generate from URL
npx openapi-typescript https://petstore3.swagger.io/api/v3/openapi.json -o ./src/types/api.d.ts

# Generate from local file
npx openapi-typescript ./openapi.yaml -o ./src/types/api.d.ts
```

## Generated Type Structure

```typescript
// Generated api.d.ts
export interface paths {
  "/users/{id}": {
    get: operations["getUser"];
    put: operations["updateUser"];
  };
  "/users": {
    post: operations["createUser"];
    get: operations["listUsers"];
  };
}

export interface components {
  schemas: {
    User: {
      id: number;
      name: string;
      email: string;
      createdAt: string;
    };
    CreateUserRequest: {
      name: string;
      email: string;
      password: string;
    };
  };
}

export interface operations {
  getUser: {
    parameters: { path: { id: number } };
    responses: {
      200: { content: { "application/json": components["schemas"]["User"] } };
      404: { content: { "application/json": { message: string } } };
    };
  };
}
```

## openapi-fetch — Type-Safe Client

```typescript
import createClient from "openapi-fetch";
import type { paths } from "./types/api.d.ts";

const client = createClient<paths>({ baseUrl: "https://api.example.com" });

// Fully typed request and response
const { data, error } = await client.GET("/users/{id}", {
  params: { path: { id: 1 } },
});

if (data) {
  console.log(data.name);  // TypeScript knows: string
  console.log(data.email); // TypeScript knows: string
}
```

## Extract Component Types

```typescript
import type { components } from "./types/api.d.ts";

// Use schema types directly
type User = components["schemas"]["User"];
type CreateUserRequest = components["schemas"]["CreateUserRequest"];

// Function with proper typing
function displayUser(user: User): string {
  return `${user.name} <${user.email}>`;
}
```

## Fetch with Type Safety

```typescript
import type { paths } from "./types/api.d.ts";

type GetUserResponse =
  paths["/users/{id}"]["get"]["responses"][200]["content"]["application/json"];

async function getUser(id: number): Promise<GetUserResponse> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<GetUserResponse>;
}
```

## OpenAPI YAML → Types Workflow

```yaml
# openapi.yaml
openapi: "3.0.3"
info:
  title: My API
  version: "1.0.0"
paths:
  /products:
    get:
      operationId: listProducts
      responses:
        "200":
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Product"
components:
  schemas:
    Product:
      type: object
      required: [id, name, price]
      properties:
        id: { type: integer }
        name: { type: string }
        price: { type: number }
        description: { type: string }
```

```typescript
// After running openapi-typescript:
type Product = components["schemas"]["Product"];
// { id: number; name: string; price: number; description?: string }
```

## Quick Tool

For generating TypeScript types from OpenAPI specs, use **[DevToolBox OpenAPI to TypeScript converter](https://viadreams.cc/en/tools/openapi-to-typescript)** — paste your OpenAPI YAML or JSON, get TypeScript interfaces instantly.

---

*Generate TypeScript types from OpenAPI specs with [DevToolBox's free OpenAPI to TypeScript tool](https://viadreams.cc/en/tools/openapi-to-typescript).*
