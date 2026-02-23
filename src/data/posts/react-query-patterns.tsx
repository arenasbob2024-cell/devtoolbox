'use client';
import React from 'react';

const codeUseQuery = `import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Setup: wrap your app
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,  // 5 minutes
            gcTime: 1000 * 60 * 30,     // 30 minutes (formerly cacheTime)
            retry: 3,
            refetchOnWindowFocus: true,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MyApp />
        </QueryClientProvider>
    );
}

// Basic query
interface User {
    id: number;
    name: string;
    email: string;
}

function useUser(userId: number) {
    return useQuery<User>({
        queryKey: ['user', userId],      // cache key — must be unique
        queryFn: async () => {
            const res = await fetch(\`/api/users/\${userId}\`);
            if (!res.ok) throw new Error('Failed to fetch user');
            return res.json();
        },
        enabled: userId > 0,            // only run if userId is valid
        staleTime: 1000 * 60 * 10,     // override global default
    });
}

function UserProfile({ userId }: { userId: number }) {
    const { data, isLoading, isError, error } = useUser(userId);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return <div>{data.name} — {data.email}</div>;
}`;

const codeUseMutation = `import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreatePostInput {
    title: string;
    body: string;
    userId: number;
}

function useCreatePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (input: CreatePostInput) => {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input),
            });
            if (!res.ok) throw new Error('Failed to create post');
            return res.json();
        },
        onSuccess: (newPost) => {
            // Invalidate and refetch posts list
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            // Or add directly to cache (no refetch needed)
            queryClient.setQueryData(['post', newPost.id], newPost);
        },
        onError: (error) => {
            console.error('Failed to create post:', error);
        },
    });
}

function CreatePostForm() {
    const mutation = useCreatePost();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ title: 'New Post', body: 'Content', userId: 1 });
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Creating...' : 'Create Post'}
            </button>
            {mutation.isError && <p>Error: {mutation.error.message}</p>}
            {mutation.isSuccess && <p>Post created!</p>}
        </form>
    );
}`;

const codeOptimistic = `import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

function useToggleTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (todo: Todo) =>
            fetch(\`/api/todos/\${todo.id}\`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !todo.completed }),
            }).then(r => r.json()),

        // Optimistic update — runs BEFORE the mutation
        onMutate: async (updatedTodo) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['todos'] });

            // Snapshot current data for rollback
            const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

            // Optimistically update the cache
            queryClient.setQueryData<Todo[]>(['todos'], (old) =>
                old?.map(todo =>
                    todo.id === updatedTodo.id
                        ? { ...todo, completed: !todo.completed }
                        : todo
                )
            );

            return { previousTodos }; // context for onError
        },

        // If mutation fails, roll back to snapshot
        onError: (_err, _variables, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData(['todos'], context.previousTodos);
            }
        },

        // Always refetch after error or success
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });
}`;

const codeInfiniteQuery = `import { useInfiniteQuery } from '@tanstack/react-query';

interface Page {
    items: Post[];
    nextCursor?: string;
}

function useInfinitePosts() {
    return useInfiniteQuery<Page>({
        queryKey: ['posts', 'infinite'],
        queryFn: async ({ pageParam }) => {
            const url = pageParam
                ? \`/api/posts?cursor=\${pageParam}\`
                : '/api/posts';
            return fetch(url).then(r => r.json());
        },
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
}

function InfinitePostList() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfinitePosts();

    return (
        <div>
            {data?.pages.flatMap(page => page.items).map(post => (
                <div key={post.id}>{post.title}</div>
            ))}
            {hasNextPage && (
                <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                    {isFetchingNextPage ? 'Loading...' : 'Load more'}
                </button>
            )}
        </div>
    );
}`;

const codeQueryKeys = `// Query key patterns — factory functions for consistency
const queryKeys = {
    all: ['posts'] as const,
    lists: () => [...queryKeys.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.lists(), { filters }] as const,
    details: () => [...queryKeys.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.details(), id] as const,
};

// Usage:
useQuery({ queryKey: queryKeys.detail(1), queryFn: ... });

// Invalidate all posts:
queryClient.invalidateQueries({ queryKey: queryKeys.all });

// Invalidate only lists:
queryClient.invalidateQueries({ queryKey: queryKeys.lists() });

// Prefetching for better UX
async function prefetchUser(userId: number) {
    await queryClient.prefetchQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId),
        staleTime: 10 * 60 * 1000, // only prefetch if > 10 min stale
    });
}

// On hover: prefetch before click
<link onMouseEnter={() => prefetchUser(userId)} href={\`/users/\${userId}\`}>
    View Profile
</link>`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'React Query (TanStack Query) Patterns: Caching, Mutations, and Optimistic Updates',
    intro: 'TanStack Query (formerly React Query) is the standard solution for server state management in React applications. It handles caching, background refetching, deduplication, pagination, and infinite queries — all with a simple hooks-based API. In 2026, TanStack Query v5 is the industry standard, replacing manual useEffect+useState patterns for data fetching.',
    useQueryTitle: 'useQuery: Fetching and Caching Data',
    useQueryDesc: 'useQuery subscribes to a server state. The queryKey is the cache key — any array that uniquely identifies the data. staleTime controls when data is considered stale and refetched.',
    mutationTitle: 'useMutation: Creating, Updating, Deleting',
    mutationDesc: 'useMutation handles create/update/delete operations. onSuccess callbacks let you invalidate related queries or directly update the cache without a refetch.',
    optimisticTitle: 'Optimistic Updates for Instant UI',
    optimisticDesc: 'Optimistic updates apply changes to the UI immediately before the server responds. If the request fails, the onError callback rolls back to the previous state.',
    infiniteTitle: 'Infinite Queries for Pagination',
    infiniteDesc: 'useInfiniteQuery handles cursor-based and offset-based pagination. getNextPageParam extracts the next page cursor from each page response.',
    keysTitle: 'Query Key Patterns and Prefetching',
    keysDesc: 'Consistent query key factories prevent cache mismatches. Prefetching on hover creates instant page transitions — the data is already in cache when the user clicks.',
    comparisonTitle: 'TanStack Query vs Other Solutions',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Use query key factories (objects with functions) to ensure consistency and enable surgical cache invalidation.',
    bp2: 'Set staleTime based on data freshness requirements. User profiles: 10 minutes. Stock prices: 0 seconds. Reference data: 1 hour.',
    bp3: 'Always provide loading and error states. Use React Suspense mode for cleaner code with Suspense boundaries.',
    bp4: 'Use optimistic updates for toggle operations, likes, and other quick mutations — it makes apps feel instant.',
    bp5: 'Prefetch data on hover or route transitions. TanStack Query\'s prefetchQuery is idempotent — safe to call multiple times.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the difference between staleTime and gcTime?',
    faq1a: 'staleTime controls how long cached data is considered fresh (no refetch needed). gcTime (formerly cacheTime) controls how long inactive cache entries are kept in memory before garbage collection. A query with staleTime=5m and gcTime=30m: fresh for 5 minutes, then background-refetched, but kept in memory for 30 minutes even when no components subscribe to it.',
    faq2q: 'How does TanStack Query handle race conditions?',
    faq2a: 'TanStack Query deduplicates identical requests automatically — if 10 components request the same query key simultaneously, only 1 network request fires. Responses are shared. For mutations, use onSettled to always invalidate after completion, regardless of success or failure.',
    faq3q: 'Should I use TanStack Query with Redux or Zustand?',
    faq3a: 'TanStack Query handles server state (remote data); Redux/Zustand handles client state (UI state, selections, form drafts). They complement each other — use TanStack Query for API calls and Zustand for local UI state. Most apps don\'t need Redux when using TanStack Query.',
    faq4q: 'How do I handle authentication errors globally?',
    faq4a: 'Use the QueryClient\'s global onError callback or a custom query function wrapper. For 401s, redirect to login: queryClient.setDefaultOptions({ queries: { onError: (err) => { if (err.status === 401) router.push("/login"); } } })',
    faq5q: 'What changed in TanStack Query v5?',
    faq5a: 'v5 (released 2023) renamed cacheTime to gcTime, made the query function parameter an object (queryKey and signal), removed the success/error/settle callbacks from useQuery (use separate useEffect), added support for SSR with React Server Components, and improved TypeScript inference.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'React Query（TanStack Query）模式：缓存、Mutations 和乐观更新',
    intro: 'TanStack Query（前身为 React Query）是 React 应用中服务端状态管理的标准解决方案。它处理缓存、后台重新获取、去重、分页和无限查询——所有这些都通过简单的基于 hooks 的 API 实现。',
    useQueryTitle: 'useQuery：获取和缓存数据',
    useQueryDesc: 'useQuery 订阅服务端状态。queryKey 是缓存键——唯一标识数据的任何数组。staleTime 控制数据何时被视为过期并重新获取。',
    mutationTitle: 'useMutation：创建、更新、删除',
    mutationDesc: 'useMutation 处理创建/更新/删除操作。onSuccess 回调让你无效化相关查询或直接更新缓存而无需重新获取。',
    optimisticTitle: '乐观更新实现即时 UI',
    optimisticDesc: '乐观更新在服务器响应之前立即将更改应用于 UI。如果请求失败，onError 回调会回滚到之前的状态。',
    infiniteTitle: '分页的无限查询',
    infiniteDesc: 'useInfiniteQuery 处理基于游标和偏移量的分页。getNextPageParam 从每个页面响应中提取下一页游标。',
    keysTitle: '查询键模式和预获取',
    keysDesc: '一致的查询键工厂防止缓存不匹配。悬停时预获取创造即时页面转换——用户点击时数据已在缓存中。',
    comparisonTitle: 'TanStack Query vs 其他解决方案',
    bestPracticesTitle: '最佳实践',
    bp1: '使用查询键工厂（带函数的对象）确保一致性并实现精确缓存失效。',
    bp2: '根据数据新鲜度需求设置 staleTime。用户资料：10 分钟。股票价格：0 秒。参考数据：1 小时。',
    bp3: '始终提供加载和错误状态。使用 React Suspense 模式配合 Suspense 边界编写更简洁的代码。',
    bp4: '对切换操作、点赞等快速 mutations 使用乐观更新——使应用感觉即时响应。',
    bp5: '在悬停或路由切换时预获取数据。TanStack Query 的 prefetchQuery 是幂等的——可以多次安全调用。',
    faqTitle: '常见问题',
    faq1q: 'staleTime 和 gcTime 有什么区别？',
    faq1a: 'staleTime 控制缓存数据被认为是新鲜的时长（不需要重新获取）。gcTime 控制非活动缓存条目在垃圾回收前在内存中保存多长时间。',
    faq2q: 'TanStack Query 如何处理竞态条件？',
    faq2a: 'TanStack Query 自动去重相同的请求——如果 10 个组件同时请求同一查询键，只会触发 1 个网络请求。响应是共享的。',
    faq3q: '我应该将 TanStack Query 与 Redux 或 Zustand 一起使用吗？',
    faq3a: 'TanStack Query 处理服务端状态（远程数据）；Redux/Zustand 处理客户端状态（UI 状态、选择、表单草稿）。它们相互补充。',
    faq4q: '如何全局处理认证错误？',
    faq4a: '使用 QueryClient 的全局 onError 回调或自定义查询函数包装器。对于 401 错误，重定向到登录。',
    faq5q: 'TanStack Query v5 有什么变化？',
    faq5a: 'v5 将 cacheTime 重命名为 gcTime，使查询函数参数变为对象，删除了 useQuery 中的成功/错误/结算回调，并添加了对 React Server Components 的 SSR 支持。',
    relatedTitle: '相关工具',
  },
  fr: { title: 'Patterns React Query (TanStack Query) : cache, mutations et mises à jour optimistes', intro: 'TanStack Query est la solution standard pour la gestion d\'état serveur dans les applications React.', useQueryTitle: 'useQuery : récupérer et mettre en cache les données', useQueryDesc: 'useQuery s\'abonne à un état serveur avec un queryKey comme clé de cache.', mutationTitle: 'useMutation : créer, mettre à jour, supprimer', mutationDesc: 'useMutation gère les opérations CRUD avec des callbacks onSuccess pour invalider le cache.', optimisticTitle: 'Mises à jour optimistes pour une UI instantanée', optimisticDesc: 'Les mises à jour optimistes appliquent les changements avant la réponse du serveur.', infiniteTitle: 'Requêtes infinies pour la pagination', infiniteDesc: 'useInfiniteQuery gère la pagination basée sur le curseur.', keysTitle: 'Patterns de clés de requête et prefetching', keysDesc: 'Les factories de clés garantissent la cohérence du cache.', comparisonTitle: 'TanStack Query vs autres solutions', bestPracticesTitle: 'Bonnes pratiques', bp1: 'Utiliser des factories de clés de requête pour la cohérence.', bp2: 'Définir staleTime selon les besoins de fraîcheur des données.', bp3: 'Toujours fournir des états de chargement et d\'erreur.', bp4: 'Utiliser les mises à jour optimistes pour les actions rapides.', bp5: 'Précharger les données au survol ou lors des transitions de route.', faqTitle: 'FAQ', faq1q: 'Différence entre staleTime et gcTime ?', faq1a: 'staleTime contrôle quand les données sont obsolètes, gcTime contrôle la durée de conservation en mémoire.', faq2q: 'Comment TanStack Query gère les race conditions ?', faq2a: 'Il déduplique automatiquement les requêtes identiques.', faq3q: 'TanStack Query avec Redux ou Zustand ?', faq3a: 'Complémentaires : TanStack Query pour l\'état serveur, Zustand pour l\'état client.', faq4q: 'Gérer les erreurs d\'authentification globalement ?', faq4a: 'Utiliser le callback onError global du QueryClient.', faq5q: 'Changements dans TanStack Query v5 ?', faq5a: 'cacheTime renommé en gcTime, paramètre de queryFn en objet, support RSC amélioré.', relatedTitle: 'Outils associés' },
  de: { title: 'React Query (TanStack Query) Muster: Caching, Mutations und optimistische Updates', intro: 'TanStack Query ist die Standardlösung für Server-Zustandsverwaltung in React-Anwendungen.', useQueryTitle: 'useQuery: Daten abrufen und cachen', useQueryDesc: 'useQuery abonniert einen Server-Zustand mit queryKey als Cache-Schlüssel.', mutationTitle: 'useMutation: Erstellen, Aktualisieren, Löschen', mutationDesc: 'useMutation verarbeitet CRUD-Operationen mit onSuccess-Callbacks.', optimisticTitle: 'Optimistische Updates für sofortige UI', optimisticDesc: 'Optimistische Updates wenden Änderungen vor der Serverantwort an.', infiniteTitle: 'Infinite Queries für Paginierung', infiniteDesc: 'useInfiniteQuery verarbeitet cursor-basierte Paginierung.', keysTitle: 'Query-Key-Muster und Prefetching', keysDesc: 'Konsistente Key-Factories verhindern Cache-Fehler.', comparisonTitle: 'TanStack Query vs andere Lösungen', bestPracticesTitle: 'Best Practices', bp1: 'Query-Key-Factories für Konsistenz verwenden.', bp2: 'staleTime je nach Daten-Frische-Anforderungen setzen.', bp3: 'Immer Lade- und Fehlerzustände bereitstellen.', bp4: 'Optimistische Updates für schnelle Operationen verwenden.', bp5: 'Daten bei Hover oder Route-Wechsel vorabrufen.', faqTitle: 'FAQ', faq1q: 'Unterschied zwischen staleTime und gcTime?', faq1a: 'staleTime kontrolliert, wann Daten veraltet sind; gcTime, wie lange sie im Speicher bleiben.', faq2q: 'Wie behandelt TanStack Query Race Conditions?', faq2a: 'Es dedupliziert automatisch identische Anfragen.', faq3q: 'TanStack Query mit Redux oder Zustand?', faq3a: 'Ergänzend: TanStack Query für Server-Zustand, Zustand für Client-Zustand.', faq4q: 'Authentifizierungsfehler global behandeln?', faq4a: 'Globalen onError-Callback des QueryClient verwenden.', faq5q: 'Änderungen in TanStack Query v5?', faq5a: 'cacheTime in gcTime umbenannt, queryFn-Parameter als Objekt, RSC-Unterstützung.', relatedTitle: 'Verwandte Tools' },
  es: { title: 'Patrones de React Query (TanStack Query): caché, mutaciones y actualizaciones optimistas', intro: 'TanStack Query es la solución estándar para la gestión de estado del servidor en aplicaciones React.', useQueryTitle: 'useQuery: obtener y cachear datos', useQueryDesc: 'useQuery se suscribe a un estado del servidor con queryKey como clave de caché.', mutationTitle: 'useMutation: crear, actualizar, eliminar', mutationDesc: 'useMutation maneja operaciones CRUD con callbacks onSuccess.', optimisticTitle: 'Actualizaciones optimistas para UI instantánea', optimisticDesc: 'Las actualizaciones optimistas aplican cambios antes de la respuesta del servidor.', infiniteTitle: 'Consultas infinitas para paginación', infiniteDesc: 'useInfiniteQuery maneja paginación basada en cursor.', keysTitle: 'Patrones de claves de consulta y prefetching', keysDesc: 'Las factories de claves consistentes previenen errores de caché.', comparisonTitle: 'TanStack Query vs otras soluciones', bestPracticesTitle: 'Mejores prácticas', bp1: 'Usar factories de claves de consulta para consistencia.', bp2: 'Establecer staleTime según los requisitos de frescura de datos.', bp3: 'Siempre proporcionar estados de carga y error.', bp4: 'Usar actualizaciones optimistas para operaciones rápidas.', bp5: 'Precargar datos en hover o transiciones de ruta.', faqTitle: 'FAQ', faq1q: '¿Diferencia entre staleTime y gcTime?', faq1a: 'staleTime controla cuándo los datos son obsoletos, gcTime cuánto tiempo se mantienen en memoria.', faq2q: '¿Cómo maneja TanStack Query las condiciones de carrera?', faq2a: 'Deduplica automáticamente las solicitudes idénticas.', faq3q: '¿TanStack Query con Redux o Zustand?', faq3a: 'Complementarios: TanStack Query para estado del servidor, Zustand para estado del cliente.', faq4q: '¿Manejar errores de autenticación globalmente?', faq4a: 'Usar el callback onError global del QueryClient.', faq5q: '¿Cambios en TanStack Query v5?', faq5a: 'cacheTime renombrado a gcTime, parámetro queryFn como objeto, soporte RSC mejorado.', relatedTitle: 'Herramientas relacionadas' },
  ja: { title: 'React Query（TanStack Query）パターン：キャッシュ、Mutations、楽観的更新', intro: 'TanStack QueryはReactアプリでのサーバー状態管理の標準ソリューションです。', useQueryTitle: 'useQuery：データの取得とキャッシュ', useQueryDesc: 'useQueryはqueryKeyをキャッシュキーとしてサーバー状態をサブスクライブします。', mutationTitle: 'useMutation：作成・更新・削除', mutationDesc: 'useMutationはonSuccessコールバックを使ってCRUD操作を処理します。', optimisticTitle: '即時UIのための楽観的更新', optimisticDesc: '楽観的更新はサーバーの応答前に変更をUIに適用します。', infiniteTitle: 'ページネーションのための無限クエリ', infiniteDesc: 'useInfiniteQueryはカーソルベースのページネーションを処理します。', keysTitle: 'クエリキーパターンとプリフェッチ', keysDesc: '一貫したキーファクトリがキャッシュの不整合を防ぎます。', comparisonTitle: 'TanStack Query vs その他のソリューション', bestPracticesTitle: 'ベストプラクティス', bp1: 'クエリキーファクトリを一貫性のために使用。', bp2: 'データの新鮮さに応じてstaleTimeを設定。', bp3: '常にローディングとエラー状態を提供。', bp4: 'クイック操作に楽観的更新を使用。', bp5: 'ホバー時やルート遷移時にデータをプリフェッチ。', faqTitle: 'よくある質問', faq1q: 'staleTimeとgcTimeの違いは？', faq1a: 'staleTimeはデータが古くなるタイミング、gcTimeはメモリに保持する期間を制御します。', faq2q: 'TanStack Queryは競合状態をどう処理する？', faq2a: '同じリクエストを自動で重複排除します。', faq3q: 'ReduxやZustandと併用すべき？', faq3a: '補完的：TanStack Queryはサーバー状態、Zustandはクライアント状態に。', faq4q: '認証エラーをグローバルに処理するには？', faq4a: 'QueryClientのグローバルonErrorコールバックを使用。', faq5q: 'TanStack Query v5の変更点は？', faq5a: 'cacheTimeをgcTimeに改名、queryFnパラメータをオブジェクト化、RSCサポート追加。', relatedTitle: '関連ツール' },
  ko: { title: 'React Query (TanStack Query) 패턴: 캐싱, Mutations, 낙관적 업데이트', intro: 'TanStack Query는 React 애플리케이션에서 서버 상태 관리를 위한 표준 솔루션입니다.', useQueryTitle: 'useQuery: 데이터 가져오기 및 캐싱', useQueryDesc: 'useQuery는 queryKey를 캐시 키로 사용하여 서버 상태를 구독합니다.', mutationTitle: 'useMutation: 생성, 업데이트, 삭제', mutationDesc: 'useMutation은 onSuccess 콜백으로 CRUD 작업을 처리합니다.', optimisticTitle: '즉시 UI를 위한 낙관적 업데이트', optimisticDesc: '낙관적 업데이트는 서버 응답 전에 UI에 변경을 적용합니다.', infiniteTitle: '페이지네이션을 위한 무한 쿼리', infiniteDesc: 'useInfiniteQuery는 커서 기반 페이지네이션을 처리합니다.', keysTitle: '쿼리 키 패턴과 프리페칭', keysDesc: '일관된 키 팩토리가 캐시 불일치를 방지합니다.', comparisonTitle: 'TanStack Query vs 다른 솔루션', bestPracticesTitle: '모범 사례', bp1: '일관성을 위해 쿼리 키 팩토리를 사용하세요.', bp2: '데이터 신선도 요구사항에 따라 staleTime을 설정하세요.', bp3: '항상 로딩 및 오류 상태를 제공하세요.', bp4: '빠른 작업에 낙관적 업데이트를 사용하세요.', bp5: '호버 또는 라우트 전환 시 데이터를 프리페치하세요.', faqTitle: '자주 묻는 질문', faq1q: 'staleTime과 gcTime의 차이는?', faq1a: 'staleTime은 데이터가 오래됨을 판단하는 시간, gcTime은 메모리에 유지되는 시간입니다.', faq2q: 'TanStack Query는 경쟁 상태를 어떻게 처리하나요?', faq2a: '동일한 요청을 자동으로 중복 제거합니다.', faq3q: 'Redux나 Zustand와 함께 사용해야 하나요?', faq3a: '보완적 사용: TanStack Query는 서버 상태, Zustand는 클라이언트 상태에.', faq4q: '인증 오류를 전역으로 처리하려면?', faq4a: 'QueryClient의 전역 onError 콜백을 사용하세요.', faq5q: 'TanStack Query v5의 변경 사항은?', faq5a: 'cacheTime이 gcTime으로 변경, queryFn 매개변수를 객체로, RSC 지원 추가.', relatedTitle: '관련 도구' },
  pt: { title: 'Padrões de React Query (TanStack Query): cache, mutações e atualizações otimistas', intro: 'TanStack Query é a solução padrão para gerenciamento de estado do servidor em aplicações React.', useQueryTitle: 'useQuery: buscar e cachear dados', useQueryDesc: 'useQuery assina um estado do servidor com queryKey como chave de cache.', mutationTitle: 'useMutation: criar, atualizar, excluir', mutationDesc: 'useMutation trata operações CRUD com callbacks onSuccess.', optimisticTitle: 'Atualizações otimistas para UI instantânea', optimisticDesc: 'Atualizações otimistas aplicam mudanças antes da resposta do servidor.', infiniteTitle: 'Consultas infinitas para paginação', infiniteDesc: 'useInfiniteQuery trata paginação baseada em cursor.', keysTitle: 'Padrões de chave de consulta e pré-busca', keysDesc: 'Factories de chave consistentes evitam erros de cache.', comparisonTitle: 'TanStack Query vs outras soluções', bestPracticesTitle: 'Boas práticas', bp1: 'Usar factories de chave de consulta para consistência.', bp2: 'Definir staleTime de acordo com os requisitos de frescura dos dados.', bp3: 'Sempre fornecer estados de carregamento e erro.', bp4: 'Usar atualizações otimistas para ações rápidas.', bp5: 'Pré-buscar dados em hover ou transições de rota.', faqTitle: 'FAQ', faq1q: 'Diferença entre staleTime e gcTime?', faq1a: 'staleTime controla quando os dados ficam obsoletos, gcTime quanto tempo ficam na memória.', faq2q: 'Como TanStack Query lida com condições de corrida?', faq2a: 'Deduplica automaticamente requisições idênticas.', faq3q: 'TanStack Query com Redux ou Zustand?', faq3a: 'Complementares: TanStack Query para estado do servidor, Zustand para estado do cliente.', faq4q: 'Tratar erros de autenticação globalmente?', faq4a: 'Usar o callback onError global do QueryClient.', faq5q: 'Mudanças no TanStack Query v5?', faq5a: 'cacheTime renomeado para gcTime, parâmetro queryFn como objeto, suporte RSC.', relatedTitle: 'Ferramentas relacionadas' },
  it: { title: 'Pattern React Query (TanStack Query): caching, mutazioni e aggiornamenti ottimistici', intro: 'TanStack Query è la soluzione standard per la gestione dello stato server nelle applicazioni React.', useQueryTitle: 'useQuery: recuperare e memorizzare nella cache i dati', useQueryDesc: 'useQuery si iscrive a uno stato server con queryKey come chiave cache.', mutationTitle: 'useMutation: creare, aggiornare, eliminare', mutationDesc: 'useMutation gestisce le operazioni CRUD con callback onSuccess.', optimisticTitle: 'Aggiornamenti ottimistici per UI istantanea', optimisticDesc: 'Gli aggiornamenti ottimistici applicano i cambiamenti prima della risposta del server.', infiniteTitle: 'Query infinite per la paginazione', infiniteDesc: 'useInfiniteQuery gestisce la paginazione basata su cursore.', keysTitle: 'Pattern di chiavi di query e prefetching', keysDesc: 'Le factory di chiavi coerenti prevengono i disallineamenti nella cache.', comparisonTitle: 'TanStack Query vs altre soluzioni', bestPracticesTitle: 'Best practice', bp1: 'Usare factory di chiavi di query per la coerenza.', bp2: 'Impostare staleTime in base ai requisiti di freschezza dei dati.', bp3: 'Fornire sempre stati di caricamento e di errore.', bp4: 'Usare aggiornamenti ottimistici per azioni rapide.', bp5: 'Prefetchare i dati al hover o alle transizioni di route.', faqTitle: 'FAQ', faq1q: 'Differenza tra staleTime e gcTime?', faq1a: 'staleTime controlla quando i dati diventano obsoleti, gcTime quanto rimangono in memoria.', faq2q: 'Come TanStack Query gestisce le race condition?', faq2a: 'Deduplica automaticamente le richieste identiche.', faq3q: 'TanStack Query con Redux o Zustand?', faq3a: 'Complementari: TanStack Query per lo stato server, Zustand per lo stato client.', faq4q: 'Gestire gli errori di autenticazione globalmente?', faq4a: 'Usare il callback onError globale del QueryClient.', faq5q: 'Modifiche in TanStack Query v5?', faq5a: 'cacheTime rinominato in gcTime, parametro queryFn come oggetto, supporto RSC.', relatedTitle: 'Strumenti correlati' },
  nl: { title: 'React Query (TanStack Query) patronen: caching, mutaties en optimistische updates', intro: 'TanStack Query is de standaardoplossing voor server-staatsbeheer in React-applicaties.', useQueryTitle: 'useQuery: gegevens ophalen en cachen', useQueryDesc: 'useQuery abonneert zich op een serverstatus met queryKey als cachesleutel.', mutationTitle: 'useMutation: aanmaken, bijwerken, verwijderen', mutationDesc: 'useMutation verwerkt CRUD-bewerkingen met onSuccess-callbacks.', optimisticTitle: 'Optimistische updates voor directe UI', optimisticDesc: 'Optimistische updates passen wijzigingen toe vóór de serverrespons.', infiniteTitle: 'Oneindige queries voor paginering', infiniteDesc: 'useInfiniteQuery verwerkt cursor-gebaseerde paginering.', keysTitle: 'Query-sleutelpatronen en prefetchen', keysDesc: 'Consistente sleutelfactories voorkomen cache-conflicten.', comparisonTitle: 'TanStack Query vs andere oplossingen', bestPracticesTitle: 'Best practices', bp1: 'Query-sleutelfactories gebruiken voor consistentie.', bp2: 'staleTime instellen op basis van vereisten voor gegevensversheid.', bp3: 'Altijd laad- en fouttoestanden bieden.', bp4: 'Optimistische updates gebruiken voor snelle acties.', bp5: 'Gegevens vooraf laden bij hover of routeovergangen.', faqTitle: 'Veelgestelde vragen', faq1q: 'Verschil tussen staleTime en gcTime?', faq1a: 'staleTime bepaalt wanneer gegevens verouderd zijn, gcTime hoe lang ze in geheugen worden bewaard.', faq2q: 'Hoe verwerkt TanStack Query race conditions?', faq2a: 'Het dedupliceert identieke verzoeken automatisch.', faq3q: 'TanStack Query met Redux of Zustand?', faq3a: 'Complementair: TanStack Query voor serverstatus, Zustand voor clientstatus.', faq4q: 'Authenticatiefouten globaal verwerken?', faq4a: 'Globale onError-callback van QueryClient gebruiken.', faq5q: 'Wijzigingen in TanStack Query v5?', faq5a: 'cacheTime hernoemd naar gcTime, queryFn-parameter als object, RSC-ondersteuning.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Wzorce React Query (TanStack Query): cachowanie, mutacje i optymistyczne aktualizacje', intro: 'TanStack Query jest standardowym rozwiązaniem do zarządzania stanem serwera w aplikacjach React.', useQueryTitle: 'useQuery: pobieranie i cachowanie danych', useQueryDesc: 'useQuery subskrybuje stan serwera z queryKey jako kluczem cache.', mutationTitle: 'useMutation: tworzenie, aktualizacja, usuwanie', mutationDesc: 'useMutation obsługuje operacje CRUD z callbackami onSuccess.', optimisticTitle: 'Optymistyczne aktualizacje dla natychmiastowego UI', optimisticDesc: 'Optymistyczne aktualizacje stosują zmiany przed odpowiedzią serwera.', infiniteTitle: 'Nieskończone zapytania dla paginacji', infiniteDesc: 'useInfiniteQuery obsługuje paginację opartą na kursorze.', keysTitle: 'Wzorce kluczy zapytań i prefetching', keysDesc: 'Spójne factory kluczy zapobiegają błędom cache.', comparisonTitle: 'TanStack Query vs inne rozwiązania', bestPracticesTitle: 'Najlepsze praktyki', bp1: 'Używać factory kluczy zapytań dla spójności.', bp2: 'Ustawiać staleTime zgodnie z wymaganiami świeżości danych.', bp3: 'Zawsze dostarczać stany ładowania i błędu.', bp4: 'Używać optymistycznych aktualizacji dla szybkich akcji.', bp5: 'Pobierać dane z wyprzedzeniem przy hover lub przejściach tras.', faqTitle: 'FAQ', faq1q: 'Różnica między staleTime a gcTime?', faq1a: 'staleTime kontroluje, kiedy dane są przestarzałe; gcTime jak długo pozostają w pamięci.', faq2q: 'Jak TanStack Query obsługuje race conditions?', faq2a: 'Automatycznie deduplikuje identyczne żądania.', faq3q: 'TanStack Query z Redux czy Zustand?', faq3a: 'Uzupełniające: TanStack Query dla stanu serwera, Zustand dla stanu klienta.', faq4q: 'Globalna obsługa błędów uwierzytelniania?', faq4a: 'Użyć globalnego callbacka onError QueryClient.', faq5q: 'Zmiany w TanStack Query v5?', faq5a: 'cacheTime przemianowany na gcTime, parametr queryFn jako obiekt, wsparcie RSC.', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'React Query (TanStack Query) mönster: cachning, mutationer och optimistiska uppdateringar', intro: 'TanStack Query är standardlösningen för server-tillståndshantering i React-applikationer.', useQueryTitle: 'useQuery: hämta och cacha data', useQueryDesc: 'useQuery prenumererar på ett server-tillstånd med queryKey som cachenyckel.', mutationTitle: 'useMutation: skapa, uppdatera, ta bort', mutationDesc: 'useMutation hanterar CRUD-operationer med onSuccess-callbacks.', optimisticTitle: 'Optimistiska uppdateringar för direkt UI', optimisticDesc: 'Optimistiska uppdateringar tillämpar ändringar före serversvaret.', infiniteTitle: 'Oändliga frågor för paginering', infiniteDesc: 'useInfiniteQuery hanterar markörbaserad paginering.', keysTitle: 'Frågenyckel-mönster och förhämtning', keysDesc: 'Konsekventa nyckelfabriker förhindrar cache-konflikter.', comparisonTitle: 'TanStack Query vs andra lösningar', bestPracticesTitle: 'Bästa praxis', bp1: 'Använda frågenyckel-fabriker för konsekvens.', bp2: 'Ange staleTime baserat på datans färskhetskrav.', bp3: 'Alltid tillhandahålla laddnings- och feltillstånd.', bp4: 'Använda optimistiska uppdateringar för snabba åtgärder.', bp5: 'Förhämta data vid hovring eller routeövergångar.', faqTitle: 'Vanliga frågor', faq1q: 'Skillnad mellan staleTime och gcTime?', faq1a: 'staleTime styr när data är föråldrad, gcTime hur länge det stannar i minnet.', faq2q: 'Hur hanterar TanStack Query race conditions?', faq2a: 'Det deduplicerar automatiskt identiska förfrågningar.', faq3q: 'TanStack Query med Redux eller Zustand?', faq3a: 'Kompletterande: TanStack Query för server-tillstånd, Zustand för klient-tillstånd.', faq4q: 'Hantera autentiseringsfel globalt?', faq4a: 'Använda den globala onError-callbacken för QueryClient.', faq5q: 'Ändringar i TanStack Query v5?', faq5a: 'cacheTime omdöpt till gcTime, queryFn-parameter som objekt, RSC-stöd.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'React Query (TanStack Query) m\u00f8nstre: cachning, mutasjoner og optimistiske oppdateringer', intro: 'TanStack Query er standardl\u00f8sningen for server-tilstandsadministrasjon i React-applikasjoner.', useQueryTitle: 'useQuery: hente og cache data', useQueryDesc: 'useQuery abonnerer p\u00e5 en servertilstand med queryKey som cachenokkel.', mutationTitle: 'useMutation: opprette, oppdatere, slette', mutationDesc: 'useMutation h\u00e5ndterer CRUD-operasjoner med onSuccess-callbacks.', optimisticTitle: 'Optimistiske oppdateringer for umiddelbar UI', optimisticDesc: 'Optimistiske oppdateringer bruker endringer f\u00f8r serversvaret.', infiniteTitle: 'Uendelige sp\u00f8rringer for paginering', infiniteDesc: 'useInfiniteQuery h\u00e5ndterer markørbasert paginering.', keysTitle: 'Sp\u00f8rringsnokkelm\u00f8nstre og forhåndshenting', keysDesc: 'Konsekvente n\u00f8kkelfabrikker forhindrer cache-konflikter.', comparisonTitle: 'TanStack Query vs andre l\u00f8sninger', bestPracticesTitle: 'Beste praksis', bp1: 'Bruke sp\u00f8rringsnokkel-fabrikker for konsistens.', bp2: 'Angi staleTime basert p\u00e5 dataferskhetskrav.', bp3: 'Alltid gi laste- og feiltilstander.', bp4: 'Bruke optimistiske oppdateringer for raske handlinger.', bp5: 'Forhåndshente data ved hover eller rute\u00f8verg\u00e5nger.', faqTitle: 'Ofte stilte sp\u00f8rsm\u00e5l', faq1q: 'Forskjell mellom staleTime og gcTime?', faq1a: 'staleTime kontrollerer n\u00e5r data er foreldet, gcTime hvor lenge de er i minnet.', faq2q: 'Hvordan h\u00e5ndterer TanStack Query race conditions?', faq2a: 'Det dedupliserer automatisk identiske foresp\u00f8rsler.', faq3q: 'TanStack Query med Redux eller Zustand?', faq3a: 'Supplerende: TanStack Query for server-tilstand, Zustand for klient-tilstand.', faq4q: 'H\u00e5ndtere autentiseringsfeil globalt?', faq4a: 'Bruke den globale onError-callback til QueryClient.', faq5q: 'Endringer i TanStack Query v5?', faq5a: 'cacheTime omd\u00f8pt til gcTime, queryFn-parameter som objekt, RSC-st\u00f8tte.', relatedTitle: 'Relaterte verkt\u00f8y' },
  id: { title: 'Pola React Query (TanStack Query): Caching, Mutasi, dan Pembaruan Optimistis', intro: 'TanStack Query adalah solusi standar untuk manajemen status server dalam aplikasi React.', useQueryTitle: 'useQuery: Mengambil dan Menyimpan Data', useQueryDesc: 'useQuery berlangganan status server dengan queryKey sebagai kunci cache.', mutationTitle: 'useMutation: Membuat, Memperbarui, Menghapus', mutationDesc: 'useMutation menangani operasi CRUD dengan callback onSuccess.', optimisticTitle: 'Pembaruan Optimistis untuk UI Instan', optimisticDesc: 'Pembaruan optimistis menerapkan perubahan sebelum respons server.', infiniteTitle: 'Kueri Tak Terbatas untuk Paginasi', infiniteDesc: 'useInfiniteQuery menangani paginasi berbasis kursor.', keysTitle: 'Pola Kunci Kueri dan Prefetching', keysDesc: 'Factory kunci yang konsisten mencegah ketidakcocokan cache.', comparisonTitle: 'TanStack Query vs Solusi Lain', bestPracticesTitle: 'Praktik Terbaik', bp1: 'Gunakan factory kunci kueri untuk konsistensi.', bp2: 'Setel staleTime berdasarkan persyaratan kesegaran data.', bp3: 'Selalu sediakan status loading dan error.', bp4: 'Gunakan pembaruan optimistis untuk tindakan cepat.', bp5: 'Prefetch data saat hover atau transisi rute.', faqTitle: 'FAQ', faq1q: 'Perbedaan antara staleTime dan gcTime?', faq1a: 'staleTime mengontrol kapan data dianggap basi, gcTime berapa lama tersimpan di memori.', faq2q: 'Bagaimana TanStack Query menangani race conditions?', faq2a: 'Secara otomatis mendeduplikasi permintaan yang identik.', faq3q: 'TanStack Query dengan Redux atau Zustand?', faq3a: 'Komplementer: TanStack Query untuk status server, Zustand untuk status klien.', faq4q: 'Menangani kesalahan autentikasi secara global?', faq4a: 'Gunakan callback onError global dari QueryClient.', faq5q: 'Perubahan di TanStack Query v5?', faq5a: 'cacheTime diubah nama menjadi gcTime, parameter queryFn sebagai objek, dukungan RSC.', relatedTitle: 'Alat Terkait' },
  th: { title: 'รูปแบบ React Query (TanStack Query): Caching, Mutations และการอัพเดตแบบ Optimistic', intro: 'TanStack Query คือโซลูชันมาตรฐานสำหรับการจัดการ server state ใน React applications', useQueryTitle: 'useQuery: การดึงและ Cache ข้อมูล', useQueryDesc: 'useQuery subscribe server state โดยใช้ queryKey เป็น cache key', mutationTitle: 'useMutation: สร้าง อัพเดต ลบ', mutationDesc: 'useMutation จัดการ CRUD operations ด้วย onSuccess callbacks', optimisticTitle: 'Optimistic Updates สำหรับ UI แบบ Instant', optimisticDesc: 'Optimistic updates ใช้การเปลี่ยนแปลงกับ UI ก่อนที่ server จะตอบกลับ', infiniteTitle: 'Infinite Queries สำหรับ Pagination', infiniteDesc: 'useInfiniteQuery จัดการ pagination แบบ cursor-based', keysTitle: 'รูปแบบ Query Key และ Prefetching', keysDesc: 'Query key factories ที่สม่ำเสมอป้องกัน cache mismatches', comparisonTitle: 'TanStack Query vs โซลูชันอื่นๆ', bestPracticesTitle: 'แนวปฏิบัติที่ดีที่สุด', bp1: 'ใช้ query key factories เพื่อความสม่ำเสมอ', bp2: 'ตั้งค่า staleTime ตามความต้องการด้านความใหม่ของข้อมูล', bp3: 'ให้ loading และ error states เสมอ', bp4: 'ใช้ optimistic updates สำหรับ actions ที่รวดเร็ว', bp5: 'Prefetch ข้อมูลเมื่อ hover หรือ route transitions', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'staleTime กับ gcTime ต่างกันอย่างไร?', faq1a: 'staleTime ควบคุมว่าข้อมูลจะถือว่าเก่าเมื่อใด gcTime ควบคุมว่าจะเก็บใน memory นานแค่ไหน', faq2q: 'TanStack Query จัดการ race conditions อย่างไร?', faq2a: 'จะ deduplicate requests ที่เหมือนกันโดยอัตโนมัติ', faq3q: 'ควรใช้ TanStack Query กับ Redux หรือ Zustand ไหม?', faq3a: 'เสริมกัน: TanStack Query สำหรับ server state, Zustand สำหรับ client state', faq4q: 'จะจัดการ authentication errors แบบ global ได้อย่างไร?', faq4a: 'ใช้ global onError callback ของ QueryClient', faq5q: 'TanStack Query v5 มีการเปลี่ยนแปลงอะไรบ้าง?', faq5a: 'cacheTime เปลี่ยนชื่อเป็น gcTime, queryFn parameter เป็น object, รองรับ RSC', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

export default function ReactQueryPatterns({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  const compRows = [
    { feature: 'Caching', tanstack: 'Built-in (staleTime, gcTime)', redux: 'Manual', swr: 'Built-in', apollo: 'Built-in (Apollo-only)' },
    { feature: 'Optimistic updates', tanstack: 'First-class', redux: 'Manual', swr: 'Basic', apollo: 'First-class' },
    { feature: 'Infinite query', tanstack: 'useInfiniteQuery', redux: 'Manual', swr: 'useSWRInfinite', apollo: 'fetchMore' },
    { feature: 'Mutations', tanstack: 'useMutation', redux: 'RTK Query', swr: 'No (use fetch)', apollo: 'useMutation' },
    { feature: 'DevTools', tanstack: 'Excellent', redux: 'Excellent', swr: 'Basic', apollo: 'Good' },
    { feature: 'REST + GraphQL', tanstack: 'Both', redux: 'Both', swr: 'REST focused', apollo: 'GraphQL only' },
  ];

  const preStyle: React.CSSProperties = { background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <h2>{t.useQueryTitle}</h2>
      <p>{t.useQueryDesc}</p>
      <pre style={preStyle}><code>{codeUseQuery}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.mutationTitle}</h2>
      <p>{t.mutationDesc}</p>
      <pre style={preStyle}><code>{codeUseMutation}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.optimisticTitle}</h2>
      <p>{t.optimisticDesc}</p>
      <pre style={preStyle}><code>{codeOptimistic}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.infiniteTitle}</h2>
      <p>{t.infiniteDesc}</p>
      <pre style={preStyle}><code>{codeInfiniteQuery}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.keysTitle}</h2>
      <p>{t.keysDesc}</p>
      <pre style={preStyle}><code>{codeQueryKeys}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.comparisonTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['Feature', 'TanStack Query', 'Redux Toolkit', 'SWR', 'Apollo'].map(h => (
                <th key={h} style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 500 }}>{row.feature}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', color: '#38a169' }}>{row.tanstack}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.redux}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.swr}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.apollo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.bestPracticesTitle}</h2>
      <ul style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
      </ul>

      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[[t.faq1q, t.faq1a],[t.faq2q, t.faq2a],[t.faq3q, t.faq3a],[t.faq4q, t.faq4a],[t.faq5q, t.faq5a]].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #48bb78' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><a href="/en/tools/json-formatter" style={{ color: '#3182ce' }}>JSON Formatter</a></li>
          <li><a href="/en/tools/jwt-decoder" style={{ color: '#3182ce' }}>JWT Decoder</a></li>
          <li><a href="/en/tools/api-tester" style={{ color: '#3182ce' }}>API Tester</a></li>
        </ul>
      </div>
    </article>
  );
}
