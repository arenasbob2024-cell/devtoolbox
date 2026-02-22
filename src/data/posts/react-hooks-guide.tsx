'use client';

import Link from 'next/link';

export default function ReactHooksGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Are React Hooks?</h2>
      <p>
        <strong>React Hooks</strong> are functions that let you use state and other React features in functional components. Introduced in React 16.8, Hooks replaced the need for class components in most scenarios, making code simpler, more reusable, and easier to test. Today, Hooks are the standard way to write React components.
      </p>
      <p>
        Before Hooks, you needed class components to manage state and lifecycle methods. With Hooks, you can do everything in functional components, leading to cleaner code and better composition patterns. This guide covers every built-in Hook, common patterns, and best practices for building production-ready React applications.
      </p>

      <h2>useState: Managing Component State</h2>
      <p>
        The <code>useState</code> Hook is the most fundamental Hook. It lets you add state variables to functional components. It returns a pair: the current state value and a function to update it.
      </p>
      <pre><code className="language-typescript">{`import { useState } from 'react';

// Basic usage
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
    </div>
  );
}

// With objects
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: 'viewer',
  });

  const updateField = (field: string, value: string) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form>
      <input
        value={user.name}
        onChange={e => updateField('name', e.target.value)}
        placeholder="Name"
      />
      <input
        value={user.email}
        onChange={e => updateField('email', e.target.value)}
        placeholder="Email"
      />
    </form>
  );
}

// Lazy initialization (expensive computations)
function ExpensiveComponent() {
  // This function only runs once on mount
  const [data, setData] = useState(() => {
    return computeExpensiveInitialValue();
  });
  return <div>{data}</div>;
}`}</code></pre>

      <h3>useState Best Practices</h3>
      <ul>
        <li>Use the functional updater form (<code>prev =&gt; prev + 1</code>) when the new state depends on the previous state</li>
        <li>Keep state as flat as possible -- avoid deeply nested objects</li>
        <li>Split unrelated state into multiple <code>useState</code> calls</li>
        <li>Use lazy initialization for expensive computations</li>
      </ul>

      <h2>useEffect: Side Effects and Lifecycle</h2>
      <p>
        The <code>useEffect</code> Hook handles side effects in functional components. It replaces <code>componentDidMount</code>, <code>componentDidUpdate</code>, and <code>componentWillUnmount</code> from class components.
      </p>
      <pre><code className="language-typescript">{`import { useState, useEffect } from 'react';

// Runs after every render
useEffect(() => {
  document.title = \`Count: \${count}\`;
});

// Runs only on mount (empty dependency array)
useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Component unmounted'); // cleanup
}, []);

// Runs when specific dependencies change
useEffect(() => {
  const controller = new AbortController();

  async function fetchUser() {
    try {
      const res = await fetch(\`/api/users/\${userId}\`, {
        signal: controller.signal,
      });
      const data = await res.json();
      setUser(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    }
  }

  fetchUser();

  // Cleanup: cancel pending request on unmount or userId change
  return () => controller.abort();
}, [userId]);

// Event listener with cleanup
useEffect(() => {
  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);`}</code></pre>

      <h3>useEffect Dependency Array Rules</h3>
      <pre><code className="language-text">{`Dependency Array Behavior:

  useEffect(() => {})          // Runs after EVERY render
  useEffect(() => {}, [])      // Runs ONCE on mount
  useEffect(() => {}, [a, b])  // Runs when 'a' or 'b' changes

Common Mistakes:
  - Missing dependencies -> stale closures, bugs
  - Object/array in deps -> infinite re-renders (use useMemo)
  - Async function directly in useEffect -> use inner async function
  - Missing cleanup -> memory leaks, race conditions`}</code></pre>

      <h2>useContext: Sharing State Without Prop Drilling</h2>
      <p>
        The <code>useContext</code> Hook lets you subscribe to React context without nesting Consumer components. It solves the prop drilling problem elegantly.
      </p>
      <pre><code className="language-typescript">{`import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Create context with type
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

// 2. Create provider component
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook for type-safe usage
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 4. Use in components
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={theme}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
}`}</code></pre>

      <h2>useRef: Mutable References and DOM Access</h2>
      <p>
        The <code>useRef</code> Hook creates a mutable reference that persists across renders without causing re-renders when changed. It is commonly used for DOM element access and storing mutable values.
      </p>
      <pre><code className="language-typescript">{`import { useRef, useEffect } from 'react';

// DOM reference
function AutoFocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} placeholder="Auto-focused" />;
}

// Storing previous value
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Timer reference (mutable value that doesn't trigger re-render)
function StopWatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div>
      <p>Time: {time}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}`}</code></pre>

      <h2>useMemo and useCallback: Performance Optimization</h2>
      <p>
        <code>useMemo</code> memoizes expensive computed values, and <code>useCallback</code> memoizes function references. Both prevent unnecessary recalculations and re-renders.
      </p>
      <pre><code className="language-typescript">{`import { useMemo, useCallback, useState } from 'react';

function ProductList({ products, filter }: Props) {
  // useMemo: Recompute only when products or filter change
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(p =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  // useCallback: Stable function reference for child components
  const handleSelect = useCallback((id: string) => {
    setSelected(prev => [...prev, id]);
  }, []);  // empty deps = stable reference

  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={handleSelect}  // won't cause unnecessary re-renders
        />
      ))}
    </div>
  );
}

// When to use useMemo/useCallback:
//   - Expensive computations (sorting, filtering large lists)
//   - Passing callbacks to optimized child components (React.memo)
//   - Values used in other hooks' dependency arrays
//
// When NOT to use:
//   - Simple calculations (a + b)
//   - Components that are cheap to re-render
//   - Premature optimization`}</code></pre>

      <h2>useReducer: Complex State Logic</h2>
      <p>
        The <code>useReducer</code> Hook is an alternative to <code>useState</code> for managing complex state logic. It is particularly useful when state transitions depend on the previous state or when multiple sub-values are related.
      </p>
      <pre><code className="language-typescript">{`import { useReducer } from 'react';

// Define types
interface State {
  items: string[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: string[] }
  | { type: 'FETCH_ERROR'; error: string }
  | { type: 'ADD_ITEM'; payload: string }
  | { type: 'REMOVE_ITEM'; payload: number };

const initialState: State = {
  items: [],
  loading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((_, i) => i !== action.payload) };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (text: string) => {
    dispatch({ type: 'ADD_ITEM', payload: text });
  };

  const removeItem = (index: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: index });
  };

  return (
    <div>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error}</p>}
      {state.items.map((item, i) => (
        <div key={i}>
          {item} <button onClick={() => removeItem(i)}>Remove</button>
        </div>
      ))}
    </div>
  );
}`}</code></pre>

      <h2>Building Custom Hooks</h2>
      <p>
        Custom Hooks let you extract component logic into reusable functions. A custom Hook is simply a function whose name starts with <code>use</code> that calls other Hooks.
      </p>
      <pre><code className="language-typescript">{`// useLocalStorage - Persist state to localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue] as const;
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme}</button>;
}

// useDebounce - Debounce rapidly changing values
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery);
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}

// useFetch - Generic data fetching hook
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}`}</code></pre>

      <h2>React 18+ Hooks: useTransition and useDeferredValue</h2>
      <p>
        React 18 introduced concurrent rendering Hooks that let you mark certain state updates as non-urgent, keeping the UI responsive during expensive operations.
      </p>
      <pre><code className="language-typescript">{`import { useState, useTransition, useDeferredValue } from 'react';

// useTransition: Mark state updates as non-urgent
function SearchWithTransition() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Urgent: update the input value immediately
    setQuery(e.target.value);

    // Non-urgent: search can be deferred
    startTransition(() => {
      setResults(performExpensiveSearch(e.target.value));
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <span>Searching...</span>}
      <ul>
        {results.map(r => <li key={r}>{r}</li>)}
      </ul>
    </div>
  );
}

// useDeferredValue: Defer rendering of expensive content
function DeferredList({ items }: { items: string[] }) {
  const deferredItems = useDeferredValue(items);
  const isStale = items !== deferredItems;

  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      {deferredItems.map(item => (
        <ExpensiveListItem key={item} text={item} />
      ))}
    </div>
  );
}`}</code></pre>

      <h2>Hooks Rules and Common Pitfalls</h2>
      <pre><code className="language-text">{`Rules of Hooks:

  1. Only call Hooks at the top level
     - Never inside loops, conditions, or nested functions
     - React relies on call order to track state

  2. Only call Hooks from React functions
     - Functional components
     - Custom Hooks (functions starting with "use")

Common Pitfalls:

  // BAD: Conditional Hook call
  if (loggedIn) {
    const [user, setUser] = useState(null);  // Error!
  }

  // GOOD: Always call, conditionally use
  const [user, setUser] = useState(null);
  if (loggedIn) { /* use user */ }

  // BAD: Missing cleanup in useEffect
  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = handleMessage;
    // Missing: return () => ws.close();
  }, [url]);

  // BAD: Object in dependency array (infinite loop)
  const options = { page: 1, limit: 10 };
  useEffect(() => {
    fetchData(options);
  }, [options]);  // New object every render!

  // GOOD: Use useMemo or primitive values
  const options = useMemo(() => ({ page: 1, limit: 10 }), []);
  useEffect(() => {
    fetchData(options);
  }, [options]);`}</code></pre>

      <h2>Quick Reference: All Built-in Hooks</h2>
      <pre><code className="language-text">{`Hook                   Purpose                          When to Use
----                   -------                          -----------
useState               Local state                      Simple state values
useEffect              Side effects                     API calls, subscriptions, DOM
useContext             Consume context                  Theme, auth, global state
useReducer             Complex state                    Multiple related values, actions
useCallback            Memoize functions                Passing callbacks to children
useMemo                Memoize values                   Expensive computations
useRef                 Mutable ref / DOM access         Timers, DOM elements, prev values
useLayoutEffect        Sync DOM measurements            Measure before browser paint
useImperativeHandle    Customize ref exposure           Library components
useDebugValue          DevTools label                   Custom hook debugging
useId                  Generate unique IDs              SSR-safe form label IDs
useTransition          Non-urgent state updates         Expensive UI updates
useDeferredValue       Defer expensive rendering        Large list filtering
useSyncExternalStore   Subscribe to external stores     Non-React state libraries`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>When should I use useReducer instead of useState?</h3>
      <p>
        Use <code>useReducer</code> when you have complex state logic involving multiple sub-values, when the next state depends on the previous state in non-trivial ways, or when you want to centralize state transition logic for testability. For simple independent values, <code>useState</code> is perfectly fine.
      </p>

      <h3>Do Hooks replace Redux?</h3>
      <p>
        Hooks like <code>useReducer</code> and <code>useContext</code> can replace Redux for simpler applications. However, Redux still provides advantages for large-scale apps: middleware support, time-travel debugging, DevTools, and standardized patterns. For many projects, a combination of built-in Hooks is sufficient.
      </p>

      <h3>Can I call a Hook inside a loop or condition?</h3>
      <p>
        No. Hooks must be called in the same order on every render. Calling them inside loops, conditions, or nested functions would change the call order between renders, causing bugs. Always call Hooks at the top level of your component or custom Hook function.
      </p>

      <h3>How do I avoid infinite loops with useEffect?</h3>
      <p>
        Infinite loops typically occur when you update state inside <code>useEffect</code> without proper dependencies, or when you include objects and arrays in the dependency array that get recreated on every render. Use <code>useMemo</code> to stabilize reference types, and make sure your dependency array only includes the specific values you actually depend on.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript Converter</Link> - Generate TypeScript interfaces from JSON</li>
        <li><Link href={`/${lang}/tools/html-to-jsx`}>HTML to JSX Converter</Link> - Convert HTML to React JSX</li>
        <li><Link href={`/${lang}/blog/typescript-generics-explained`}>TypeScript Generics Explained</Link> - Master TypeScript generics</li>
        <li><Link href={`/${lang}/blog/javascript-array-methods-cheat-sheet`}>JavaScript Array Methods Cheat Sheet</Link> - Essential array methods reference</li>
      </ul>
    </>
  );
}
