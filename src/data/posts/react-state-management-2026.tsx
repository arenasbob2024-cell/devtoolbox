export default function ReactStateManagement2026() {
  return (
    <>
      <h2>React State Management in 2026: useState, useReducer, Zustand, and Jotai Compared</h2>
      <p>
        State management remains one of the most debated topics in React development. In 2026, the ecosystem
        has matured significantly: React itself has grown more capable, Redux has faded from most new projects,
        and a new generation of lightweight libraries like Zustand and Jotai has taken its place. This guide
        compares the four most important approaches — <code>useState</code>, <code>useReducer</code>, Zustand,
        and Jotai — with practical examples and clear guidance on when to use each.
      </p>

      <h2>The State Management Landscape in 2026</h2>
      <p>
        Before diving in, here is a quick orientation of the current ecosystem. React Server Components
        have shifted some state to the server, React Query and SWR own async/server state, and client-side
        state libraries focus purely on synchronous UI state.
      </p>
      <table>
        <thead>
          <tr>
            <th>Solution</th>
            <th>Scope</th>
            <th>Bundle Size</th>
            <th>Boilerplate</th>
            <th>DevTools</th>
            <th>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>useState</td><td>Component</td><td>0 KB (built-in)</td><td>None</td><td>React DevTools</td><td>Simple local state</td></tr>
          <tr><td>useReducer</td><td>Component/subtree</td><td>0 KB (built-in)</td><td>Low</td><td>React DevTools</td><td>Complex local state</td></tr>
          <tr><td>Zustand</td><td>Global</td><td>~1 KB</td><td>Very low</td><td>Redux DevTools</td><td>Global app state</td></tr>
          <tr><td>Jotai</td><td>Global / atomic</td><td>~3 KB</td><td>Minimal</td><td>Jotai DevTools</td><td>Fine-grained reactivity</td></tr>
        </tbody>
      </table>

      <h2>useState: Simple and Effective for Local State</h2>
      <p>
        <code>useState</code> is the right choice for any state that lives within a single component and
        does not need to be shared. Do not prematurely reach for global state management when a simple
        hook will do.
      </p>
      <pre><code className="language-tsx">{`import { useState } from 'react';

// Simple counter
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Object state — spread to preserve other fields
function UserForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'user' as 'user' | 'admin',
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form>
      <input
        value={form.name}
        onChange={e => updateField('name', e.target.value)}
        placeholder="Name"
      />
      <input
        value={form.email}
        onChange={e => updateField('email', e.target.value)}
        placeholder="Email"
      />
    </form>
  );
}

// Lazy initialization for expensive initial state
function ExpensiveComponent() {
  const [data, setData] = useState(() => {
    // This function runs only once on mount
    return computeExpensiveInitialValue();
  });
  return <div>{data}</div>;
}

function computeExpensiveInitialValue() {
  return 'expensive result';
}`}</code></pre>
      <p>
        <strong>When to use useState:</strong> Local UI toggles (open/closed, active tab), form field values
        in a single component, pagination state scoped to one list, any state that only one component needs.
      </p>

      <h2>useReducer: Managing Complex State Logic</h2>
      <p>
        <code>useReducer</code> is the right upgrade from <code>useState</code> when your state logic
        becomes complex: multiple sub-values that change together, when next state depends on previous
        state in non-trivial ways, or when you want to separate state logic from component rendering.
      </p>
      <pre><code className="language-tsx">{`import { useReducer } from 'react';

// Define state shape and actions
type Status = 'idle' | 'loading' | 'success' | 'error';

interface FetchState<T> {
  status: Status;
  data: T | null;
  error: string | null;
}

type FetchAction<T> =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: T }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'RESET' };

// Pure reducer function — easy to test
function fetchReducer<T>(
  state: FetchState<T>,
  action: FetchAction<T>
): FetchState<T> {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading', data: null, error: null };
    case 'FETCH_SUCCESS':
      return { status: 'success', data: action.payload, error: null };
    case 'FETCH_ERROR':
      return { status: 'error', data: null, error: action.payload };
    case 'RESET':
      return { status: 'idle', data: null, error: null };
    default:
      return state;
  }
}

const initialState: FetchState<never> = {
  status: 'idle',
  data: null,
  error: null,
};

// Component using the reducer
function UserProfile({ userId }: { userId: string }) {
  const [state, dispatch] = useReducer(fetchReducer<User>, initialState);

  async function loadUser() {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      if (!response.ok) throw new Error('Failed to load user');
      const user = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: user });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: (err as Error).message });
    }
  }

  if (state.status === 'loading') return <p>Loading...</p>;
  if (state.status === 'error') return <p>Error: {state.error}</p>;
  if (state.status === 'success') return <div>{state.data?.name}</div>;
  return <button onClick={loadUser}>Load User</button>;
}

// Shopping cart — classic useReducer use case
interface CartItem { id: string; name: string; price: number; qty: number; }
type CartAction =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE_QTY'; id: string; qty: number }
  | { type: 'CLEAR' };

function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const existing = items.find(i => i.id === action.item.id);
      if (existing) {
        return items.map(i =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...items, { ...action.item, qty: 1 }];
    }
    case 'REMOVE':
      return items.filter(i => i.id !== action.id);
    case 'UPDATE_QTY':
      return items.map(i =>
        i.id === action.id ? { ...i, qty: action.qty } : i
      );
    case 'CLEAR':
      return [];
    default:
      return items;
  }
}`}</code></pre>
      <p>
        <strong>When to use useReducer:</strong> State with multiple sub-values that update together,
        complex transition logic (loading/error/success states), when you want to write unit tests for
        your state logic in isolation, or when actions have names that communicate intent clearly.
      </p>

      <h2>Zustand: Lightweight Global State</h2>
      <p>
        Zustand is currently the most popular lightweight global state library for React. Its API is
        remarkably simple — a single <code>create</code> function produces a hook. There is no Provider,
        no boilerplate, and the store is outside React entirely.
      </p>
      <pre><code className="language-tsx">{`// Install: npm install zustand
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// --- Basic store ---
interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterStore>()((set) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

// Use in any component — no Provider needed
function Counter() {
  const { count, increment, decrement } = useCounterStore();
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

// --- Production store with DevTools and localStorage persistence ---
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

interface User { id: string; name: string; email: string; role: string; }

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        login: (user, token) =>
          set({ user, token, isAuthenticated: true }, false, 'auth/login'),

        logout: () =>
          set({ user: null, token: null, isAuthenticated: false }, false, 'auth/logout'),

        updateUser: (updates) =>
          set(
            state => ({ user: state.user ? { ...state.user, ...updates } : null }),
            false,
            'auth/updateUser'
          ),
      }),
      {
        name: 'auth-storage',           // localStorage key
        partialize: (state) => ({        // Only persist user and token
          user: state.user,
          token: state.token,
        }),
      }
    ),
    { name: 'AuthStore' }              // DevTools display name
  )
);

// Selector pattern — subscribe to only what you need
function UserAvatar() {
  // Component only re-renders when user.name changes
  const userName = useAuthStore(state => state.user?.name);
  return <span>{userName ?? 'Guest'}</span>;
}

// Async actions in Zustand
interface ProductStore {
  products: Product[];
  isLoading: boolean;
  fetchProducts: (category: string) => Promise<void>;
}

interface Product { id: string; name: string; price: number; }

const useProductStore = create<ProductStore>()((set) => ({
  products: [],
  isLoading: false,

  fetchProducts: async (category: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch(\`/api/products?category=\${category}\`);
      const products = await response.json();
      set({ products, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));`}</code></pre>
      <p>
        <strong>When to use Zustand:</strong> Global state that multiple unrelated components need access to,
        replacing Redux in existing apps (the API is familiar but far simpler), stores that need persistence
        or DevTools integration, or whenever you need state outside of the React component tree (e.g., in
        utility functions or event listeners).
      </p>

      <h2>Jotai: Atomic State for Fine-Grained Reactivity</h2>
      <p>
        Jotai takes an atomic approach inspired by Recoil. Instead of a single store, state is split into
        small atoms that components subscribe to individually. This enables extremely fine-grained re-renders —
        components only update when the specific atoms they use change.
      </p>
      <pre><code className="language-tsx">{`// Install: npm install jotai
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage, atomWithReset } from 'jotai/utils';

// --- Basic atoms ---
const countAtom = atom(0);
const nameAtom = atom('Alice');

// Read-only derived atom
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// Writable derived atom
const uppercaseNameAtom = atom(
  (get) => get(nameAtom).toUpperCase(),
  (_get, set, newName: string) => set(nameAtom, newName.toLowerCase())
);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const doubleCount = useAtomValue(doubleCountAtom); // Read-only

  return (
    <div>
      <p>Count: {count} (double: {doubleCount})</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

// Separate read and write to prevent unnecessary re-renders
function DisplayCount() {
  const count = useAtomValue(countAtom); // Only re-renders on count change
  return <p>{count}</p>;
}

function IncrementButton() {
  const setCount = useSetAtom(countAtom); // Never re-renders
  return <button onClick={() => setCount(c => c + 1)}>+</button>;
}

// --- Persistence with atomWithStorage ---
const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'light');

function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom);
  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

// --- Async atoms ---
const userIdAtom = atom<string | null>(null);

const userAtom = atom(async (get) => {
  const id = get(userIdAtom);
  if (!id) return null;
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
});

// Use with React Suspense
function UserProfile() {
  const user = useAtomValue(userAtom); // Suspends while loading
  if (!user) return null;
  return <div>{user.name}</div>;
}

// --- Atom families for collections ---
import { atomFamily } from 'jotai/utils';

const todoAtomFamily = atomFamily((id: string) =>
  atom({ id, text: '', completed: false })
);

const todoIdsAtom = atom<string[]>([]);

function TodoItem({ id }: { id: string }) {
  const [todo, setTodo] = useAtom(todoAtomFamily(id));
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => setTodo(t => ({ ...t, completed: !t.completed }))}
      />
      {todo.text}
    </li>
  );
}`}</code></pre>
      <p>
        <strong>When to use Jotai:</strong> Applications with many independent pieces of state that different
        parts of the UI subscribe to, when you want to avoid over-rendering from a large monolithic store,
        applications that use Suspense for async data fetching, or when you want derived/computed state with
        automatic dependency tracking.
      </p>

      <h2>Choosing the Right Tool: A Decision Framework</h2>
      <p>
        Apply this decision tree for each piece of state in your application:
      </p>
      <ul>
        <li>
          <strong>Is the state local to one component?</strong> Use <code>useState</code>. If the update
          logic is complex, upgrade to <code>useReducer</code>.
        </li>
        <li>
          <strong>Do a few nearby components share this state?</strong> Lift state up with <code>useState</code>
          {" "}or <code>useReducer</code> and pass it via props or a small Context. Do not reach for a global
          store for a shopping cart that only the cart page and header need.
        </li>
        <li>
          <strong>Is it global state used across many unrelated components?</strong> Use Zustand. It is
          simpler than Redux and handles 95% of global state needs.
        </li>
        <li>
          <strong>Do you need fine-grained reactivity and atom composition?</strong> Use Jotai. It excels
          when you have many small independent atoms that different components subscribe to.
        </li>
        <li>
          <strong>Is it async/server data?</strong> Use TanStack Query (React Query) or SWR instead of any
          of the above. Do not put fetched data in Zustand or Jotai — use a dedicated cache layer.
        </li>
      </ul>

      <h2>Common Patterns and Anti-Patterns</h2>
      <pre><code className="language-tsx">{`// ANTI-PATTERN: Global store for local state
// Don't put form values in Zustand — they are component-local
const useFormStore = create<{ email: string; setEmail: (e: string) => void }>()(
  (set) => ({ email: '', setEmail: (email) => set({ email }) })
); // This is overkill for a single form

// GOOD: Use useState for form fields
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // ...
}

// ANTI-PATTERN: Zustand selector that always returns new object
function BadComponent() {
  // This object is recreated on every render, causing infinite re-renders
  const { user, token } = useAuthStore(state => ({
    user: state.user,
    token: state.token,
  }));
}

// GOOD: Use separate selectors or a shallow equality check
import { useShallow } from 'zustand/react/shallow';
function GoodComponent() {
  const { user, token } = useAuthStore(
    useShallow(state => ({ user: state.user, token: state.token }))
  );
}

// PATTERN: Combining Zustand with React Query
import { useQuery } from '@tanstack/react-query';

function Dashboard() {
  const token = useAuthStore(state => state.token);

  // Server state with React Query
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => fetch('/api/orders', {
      headers: { Authorization: \`Bearer \${token}\` }
    }).then(r => r.json()),
    enabled: !!token,
  });

  // UI state with Zustand
  const activeTab = useDashboardStore(state => state.activeTab);

  return <div>...</div>;
}`}</code></pre>

      <h2>Performance Tips</h2>
      <ul>
        <li>
          <strong>Use selectors in Zustand</strong> — pass a selector function to subscribe to only the
          slice you need: <code>useStore(state =&gt; state.count)</code>. Without a selector, the component
          re-renders on every store change.
        </li>
        <li>
          <strong>Split Jotai atoms granularly</strong> — one atom per independent value. This way, updating
          one atom does not re-render components that use other atoms.
        </li>
        <li>
          <strong>Memoize derived values</strong> — use <code>useMemo</code> for expensive computations
          derived from state, or use derived atoms in Jotai / computed values in Zustand middleware.
        </li>
        <li>
          <strong>Do not store server data in client state</strong> — use React Query or SWR for anything
          that comes from an API. These libraries handle caching, refetching, and stale state far better
          than any general-purpose state manager.
        </li>
      </ul>

      <p>
        To validate and inspect the JSON responses your state interacts with, use our{" "}
        <a href="/en/tools/json-formatter">JSON Formatter</a>. For debugging JWT tokens in your auth store,
        try our <a href="/en/tools/jwt-decoder">JWT Decoder</a> tool. You may also find our{" "}
        <a href="/en/blog/typescript-type-guards">TypeScript Type Guards</a> guide helpful for typing
        your state management code.
      </p>
    </>
  );
}
