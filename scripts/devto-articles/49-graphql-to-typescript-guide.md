---
title: "GraphQL to TypeScript: Generate Types with GraphQL Code Generator"
tags: typescript, graphql, codegen, webdev
canonical_url: https://viadreams.cc/en/blog/graphql-to-typescript-online-guide
published: true
---

Generate TypeScript types from GraphQL schemas automatically. Here's how to do it right.

## GraphQL Code Generator Setup

```bash
# Install
npm install -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations

# Initialize
npx graphql-code-generator init
```

```yaml
# codegen.ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://api.example.com/graphql",
  documents: ["src/**/*.graphql", "src/**/*.tsx"],
  generates: {
    "./src/types/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
```

## Generated Types

```typescript
// Auto-generated graphql.ts
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  posts: Array<Post>;
};

export type Query = {
  __typename?: "Query";
  user?: User | null;
  users: Array<User>;
};
```

## Query Types

```graphql
# src/queries/user.graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
  }
}
```

```typescript
// Generated operation types
export type GetUserQueryVariables = Exact<{ id: Scalars["ID"]["input"] }>;

export type GetUserQuery = {
  __typename?: "Query";
  user?: { __typename?: "User"; id: string; name: string; email: string } | null;
};
```

## Apollo Client with Types

```typescript
import { useQuery } from "@apollo/client";
import { GetUserDocument, GetUserQuery, GetUserQueryVariables } from "./graphql";

function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error } = useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    { variables: { id: userId } }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <p>{data?.user?.name}</p>; // Fully typed
}
```

## Fragment Types

```graphql
# src/fragments/user.graphql
fragment UserFields on User {
  id
  name
  email
  createdAt
}
```

```typescript
// Generated fragment type
export type UserFieldsFragment = {
  __typename?: "User";
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

// Use in components
function UserCard({ user }: { user: UserFieldsFragment }) {
  return <div>{user.name}</div>;
}
```

## Mutation Types

```typescript
import { useMutation } from "@apollo/client";
import { CreateUserDocument, CreateUserMutation, CreateUserMutationVariables } from "./graphql";

function CreateUserForm() {
  const [createUser, { loading }] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CreateUserDocument);

  const handleSubmit = async (data: CreateUserMutationVariables["input"]) => {
    const result = await createUser({
      variables: { input: data },
    });
    console.log(result.data?.createUser.id); // Typed
  };
}
```

## Quick Tool

For generating TypeScript types from GraphQL schemas, use **[DevToolBox GraphQL to TypeScript converter](https://viadreams.cc/en/tools/graphql-to-typescript)** — paste your schema or query, get TypeScript types instantly.

---

*Generate TypeScript types from GraphQL with [DevToolBox's free GraphQL to TypeScript tool](https://viadreams.cc/en/tools/graphql-to-typescript).*
