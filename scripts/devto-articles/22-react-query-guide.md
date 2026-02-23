---
title: "TanStack Query (React Query) v5: The Data Fetching Library You Need"
tags: react, javascript, typescript, webdev
canonical_url: https://viadreams.cc/en/blog/react-query-patterns
published: true
---

Server state is not the same as UI state. TanStack Query (formerly React Query) manages server state so you don't have to.

## The Problem It Solves

```typescript
// Without React Query: you write this EVERY TIME
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  setLoading(true);
  fetch('/api/users')
    .then(r => r.json())
    .then(d => { setData(d); setLoading(false); })
    .catch(e => { setError(e); setLoading(false); });
}, []);
// No caching, no refetch, no background updates...
```

With React Query, this is:

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(r => r.json()),
});
```

## Core Concepts

### useQuery

```typescript
const { data, isLoading, isError, isFetching, refetch } = useQuery({
  queryKey: ['user', userId],        // Cache key (array)
  queryFn: () => getUser(userId),    // Async function
  staleTime: 5 * 60 * 1000,        // Fresh for 5 minutes
  gcTime: 10 * 60 * 1000,          // Keep in cache 10 minutes after unmount
  retry: 2,                          // Retry failed requests twice
  enabled: !!userId,                 // Only run if userId exists
});
```

### useMutation

```typescript
const mutation = useMutation({
  mutationFn: (newUser: User) => createUser(newUser),
  onSuccess: (data) => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['users'] });
    toast.success('User created!');
  },
  onError: (error) => {
    toast.error(error.message);
  },
});

// Usage
mutation.mutate({ name: 'Alice', email: 'alice@example.com' });
```

## Optimistic Updates

Update the UI immediately, roll back on error:

```typescript
const updateTodo = useMutation({
  mutationFn: (todo: Todo) => updateTodoAPI(todo),

  onMutate: async (newTodo) => {
    // Cancel in-flight queries
    await queryClient.cancelQueries({ queryKey: ['todos'] });

    // Save current state for rollback
    const previousTodos = queryClient.getQueryData(['todos']);

    // Optimistically update
    queryClient.setQueryData(['todos'], (old: Todo[]) =>
      old.map(t => t.id === newTodo.id ? newTodo : t)
    );

    return { previousTodos }; // Context for onError
  },

  onError: (err, newTodo, context) => {
    // Rollback on error
    queryClient.setQueryData(['todos'], context?.previousTodos);
  },

  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

## Infinite Queries

```typescript
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ({ pageParam }) => fetchPosts({ page: pageParam, limit: 10 }),
  initialPageParam: 1,
  getNextPageParam: (lastPage, pages) =>
    lastPage.hasMore ? pages.length + 1 : undefined,
});

// Render all pages
data.pages.flatMap(page => page.posts).map(post => <Post key={post.id} {...post} />)
```

## Dependent Queries

```typescript
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => getUser(userId),
});

// Only runs after user is loaded
const { data: orders } = useQuery({
  queryKey: ['orders', user?.id],
  queryFn: () => getOrders(user!.id),
  enabled: !!user?.id,
});
```

## Prefetching

```typescript
// Prefetch on hover before navigation
const queryClient = useQueryClient();

<Link
  onMouseEnter={() =>
    queryClient.prefetchQuery({
      queryKey: ['user', userId],
      queryFn: () => getUser(userId),
    })
  }
  href={`/users/${userId}`}
>
  View Profile
</Link>
```

TanStack Query also supports Vue, Solid, Svelte, and Angular. The concepts are the same.

Use [JSON Formatter](https://viadreams.cc/en/tools/json-formatter) to inspect your API responses while debugging.

---

*Full React Query guide at [viadreams.cc/en/blog/react-query-patterns](https://viadreams.cc/en/blog/react-query-patterns)*
