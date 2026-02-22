export default function ReactPerformanceTips() {
  return (
    <>
      <h2>React Performance Optimization: 15 Practical Tips</h2>
      <p>
        React applications can become sluggish as they grow in complexity. Unnecessary re-renders, large
        bundle sizes, inefficient state management, and poorly optimized lists are common performance
        bottlenecks. This guide presents 15 practical, actionable tips that you can apply today to make
        your React applications faster. Each tip includes code examples showing the before and after,
        so you can immediately apply these patterns to your own projects.
      </p>

      <h2>1. Use React.memo to Prevent Unnecessary Re-renders</h2>
      <p>
        When a parent component re-renders, all its children re-render too, even if their props have not
        changed. <code>React.memo</code> wraps a component and skips re-rendering when props remain the same.
      </p>
      <pre><code>{`// Before: UserCard re-renders every time parent re-renders
function UserCard({ name, avatar }: { name: string; avatar: string }) {
  console.log("UserCard rendered"); // Logs on EVERY parent render
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
    </div>
  );
}

// After: Only re-renders when name or avatar actually change
const UserCard = React.memo(function UserCard({
  name,
  avatar,
}: {
  name: string;
  avatar: string;
}) {
  console.log("UserCard rendered"); // Only logs when props change
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
    </div>
  );
});

// Custom comparison for complex props
const ExpensiveList = React.memo(
  function ExpensiveList({ items }: { items: Item[] }) {
    return <>{items.map((item) => <ListItem key={item.id} {...item} />)}</>;
  },
  (prevProps, nextProps) => {
    // Only re-render if item count or IDs changed
    return (
      prevProps.items.length === nextProps.items.length &&
      prevProps.items.every((item, i) => item.id === nextProps.items[i].id)
    );
  }
);`}</code></pre>

      <h2>2. Stabilize Callbacks with useCallback</h2>
      <p>
        Functions created inside a component are re-created on every render. When passed as props to
        memoized children, these new function references break memoization. <code>useCallback</code> returns
        the same function reference between renders.
      </p>
      <pre><code>{`// Before: handleClick is a NEW function every render
function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // New reference every render = memoized children always re-render
  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
  ));
}

// After: handleClick is stable across renders
function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleDelete = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []); // Empty deps = same reference forever

  return todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
  ));
}

// TodoItem stays memoized because onDelete reference is stable
const TodoItem = React.memo(function TodoItem({
  todo,
  onDelete,
}: {
  todo: Todo;
  onDelete: (id: string) => void;
}) {
  return (
    <li>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});`}</code></pre>

      <h2>3. Memoize Expensive Computations with useMemo</h2>
      <p>
        If a component performs expensive calculations on every render, <code>useMemo</code> caches the
        result and only recalculates when dependencies change.
      </p>
      <pre><code>{`// Before: Sorting and filtering runs on EVERY render
function ProductList({ products, query, sortBy }: Props) {
  // This runs even when unrelated state changes
  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a[sortBy] - b[sortBy]);

  return <>{filtered.map((p) => <ProductCard key={p.id} product={p} />)}</>;
}

// After: Only recalculates when products, query, or sortBy change
function ProductList({ products, query, sortBy }: Props) {
  const filtered = useMemo(() => {
    console.log("Recalculating filtered products");
    return products
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a[sortBy] - b[sortBy]);
  }, [products, query, sortBy]);

  return <>{filtered.map((p) => <ProductCard key={p.id} product={p} />)}</>;
}`}</code></pre>

      <h2>4. Virtualize Long Lists</h2>
      <p>
        Rendering thousands of DOM elements kills performance. Virtualization (windowing) renders only
        the items visible in the viewport. Use <code>@tanstack/react-virtual</code> or <code>react-window</code>.
      </p>
      <pre><code>{`// Before: All 10,000 rows rendered in the DOM
function LogViewer({ logs }: { logs: LogEntry[] }) {
  return (
    <div style={{ height: 600, overflow: "auto" }}>
      {logs.map((log) => (
        <div key={log.id} className="log-row">
          <span>{log.timestamp}</span>
          <span>{log.message}</span>
        </div>
      ))}
    </div>
  );
}

// After: Only ~20 visible rows are in the DOM
import { useVirtualizer } from "@tanstack/react-virtual";

function LogViewer({ logs }: { logs: LogEntry[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: logs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40, // row height in px
    overscan: 5, // render 5 extra rows above/below viewport
  });

  return (
    <div ref={parentRef} style={{ height: 600, overflow: "auto" }}>
      <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const log = logs[virtualRow.index];
          return (
            <div
              key={log.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: virtualRow.size,
                transform: \`translateY(\${virtualRow.start}px)\`,
              }}
              className="log-row"
            >
              <span>{log.timestamp}</span>
              <span>{log.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}`}</code></pre>

      <h2>5. Lazy Load Components with React.lazy</h2>
      <p>
        Split your bundle by lazy-loading components that are not immediately needed. This reduces the
        initial JavaScript payload and speeds up first paint.
      </p>
      <pre><code>{`// Before: Everything loaded upfront
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Analytics from "./Analytics";
import AdminPanel from "./AdminPanel";

// After: Components loaded on demand
const Dashboard = lazy(() => import("./Dashboard"));
const Settings = lazy(() => import("./Settings"));
const Analytics = lazy(() => import("./Analytics"));
const AdminPanel = lazy(() => import("./AdminPanel"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Suspense>
  );
}

// Named export lazy loading
const Chart = lazy(() =>
  import("./Chart").then((module) => ({ default: module.Chart }))
);

// Preload on hover for instant navigation
function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const preload = () => {
    if (to === "/analytics") import("./Analytics");
    if (to === "/admin") import("./AdminPanel");
  };

  return (
    <Link to={to} onMouseEnter={preload}>
      {children}
    </Link>
  );
}`}</code></pre>

      <h2>6. Debounce Expensive Operations</h2>
      <p>
        Search inputs, window resize handlers, and scroll listeners can trigger hundreds of updates
        per second. Debouncing delays execution until the user stops typing or scrolling.
      </p>
      <pre><code>{`// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage in search component
function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  // API call only fires 300ms after user stops typing
  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery).then(setResults);
    }
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}`}</code></pre>

      <h2>7. Optimize Context to Avoid Cascading Re-renders</h2>
      <p>
        When a Context value changes, every consumer re-renders. If your context holds multiple values
        that change independently, split them into separate contexts.
      </p>
      <pre><code>{`// Before: ONE context for everything = everything re-renders
const AppContext = createContext<{
  user: User;
  theme: Theme;
  notifications: Notification[];
}>(/* ... */);

// When notifications update, components using only "theme" also re-render

// After: Split into focused contexts
const UserContext = createContext<User>(/* ... */);
const ThemeContext = createContext<Theme>(/* ... */);
const NotificationContext = createContext<Notification[]>(/* ... */);

// Only notification consumers re-render when notifications change
function NotificationBell() {
  const notifications = useContext(NotificationContext);
  return <span>{notifications.length}</span>;
}

// This component is NOT affected by notification changes
function ThemeToggle() {
  const theme = useContext(ThemeContext);
  return <button>{theme === "dark" ? "Light" : "Dark"}</button>;
}

// Alternative: Memoize the context value
function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(initialUser);
  const [theme, setTheme] = useState<Theme>("light");

  // Memoize to prevent unnecessary re-renders of consumers
  const value = useMemo(() => ({ user, theme, setTheme }), [user, theme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}`}</code></pre>

      <h2>8. Use Proper Key Props in Lists</h2>
      <p>
        Using array index as a key causes React to re-render all list items when items are added,
        removed, or reordered. Always use a stable, unique identifier.
      </p>
      <pre><code>{`// Bad: Index keys cause unnecessary DOM mutations on reorder
{items.map((item, index) => (
  <ListItem key={index} item={item} />  // DON'T do this
))}

// Good: Stable unique ID preserves DOM elements correctly
{items.map((item) => (
  <ListItem key={item.id} item={item} />  // Use unique identifier
))}

// If items lack IDs, generate stable keys
const itemsWithKeys = useMemo(
  () => items.map((item) => ({ ...item, _key: generateStableKey(item) })),
  [items]
);`}</code></pre>

      <h2>9. Avoid Inline Object and Array Literals in JSX</h2>
      <p>
        Inline objects and arrays create new references on every render, breaking shallow comparison
        in memoized components and causing unnecessary re-renders.
      </p>
      <pre><code>{`// Before: New object created every render
function Parent() {
  return (
    <Child
      style={{ padding: 16, margin: 8 }}      // New object every render
      options={["a", "b", "c"]}                // New array every render
      config={{ theme: "dark", lang: "en" }}   // New object every render
    />
  );
}

// After: Stable references
const STYLE = { padding: 16, margin: 8 };
const OPTIONS = ["a", "b", "c"];

function Parent() {
  const config = useMemo(() => ({ theme: "dark", lang: "en" }), []);

  return (
    <Child
      style={STYLE}       // Same reference every render
      options={OPTIONS}    // Same reference every render
      config={config}      // Same reference between dependency changes
    />
  );
}`}</code></pre>

      <h2>10. Use CSS Instead of JavaScript for Animations</h2>
      <p>
        CSS animations and transitions run on the compositor thread, separate from JavaScript. This
        means they do not block the main thread and deliver 60fps even under heavy JS load.
      </p>
      <pre><code>{`// Before: JavaScript-driven animation (blocks main thread)
function AnimatedBox() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % 300); // 60 state updates/sec
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return <div style={{ transform: \`translateX(\${position}px)\` }} />;
}

// After: CSS animation (compositor thread, no JS overhead)
function AnimatedBox() {
  return <div className="sliding-box" />;
}

// CSS:
// .sliding-box {
//   animation: slide 2s ease-in-out infinite;
//   will-change: transform;
// }
// @keyframes slide {
//   0%, 100% { transform: translateX(0); }
//   50% { transform: translateX(300px); }
// }

// For dynamic animations, use CSS transitions
function Drawer({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className="drawer"
      style={{
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease",
      }}
    />
  );
}`}</code></pre>

      <h2>11. Optimize Images with Next.js Image or srcSet</h2>
      <p>
        Images are often the largest assets on a page. Use responsive images, lazy loading, and modern
        formats (WebP, AVIF) to reduce load times significantly.
      </p>
      <pre><code>{`// Next.js Image component (automatic optimization)
import Image from "next/image";

function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      loading="lazy"        // Lazy load below-the-fold images
      placeholder="blur"    // Show blur while loading
      sizes="(max-width: 768px) 100vw, 400px"
    />
  );
}

// Native HTML: responsive images with srcSet
function ResponsiveImage({ alt }: { alt: string }) {
  return (
    <img
      srcSet="image-400.webp 400w, image-800.webp 800w, image-1200.webp 1200w"
      sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
      src="image-800.webp"
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}`}</code></pre>

      <h2>12. Use startTransition for Non-Urgent Updates</h2>
      <p>
        React 18 introduced <code>startTransition</code> to mark state updates as non-urgent. This keeps
        the UI responsive during expensive re-renders by allowing React to interrupt the transition
        to handle user input.
      </p>
      <pre><code>{`import { useState, useTransition } from "react";

function FilterableList({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Urgent: Update input immediately
    setQuery(e.target.value);

    // Non-urgent: Filter can be deferred
    startTransition(() => {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredItems(filtered);
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <span>Filtering...</span>}
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}`}</code></pre>

      <h2>13. Avoid Unnecessary State</h2>
      <p>
        Not every value needs to be in state. Derived values should be computed during render, not
        stored in state. Unnecessary state causes extra re-renders and synchronization bugs.
      </p>
      <pre><code>{`// Before: Redundant state that can be derived
function Cart({ items }: { items: CartItem[] }) {
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // BUG-PRONE: Must keep in sync manually
  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + item.price * item.qty, 0));
    setItemCount(items.reduce((sum, item) => sum + item.qty, 0));
  }, [items]);

  return <div>Total: {total} ({itemCount} items)</div>;
}

// After: Derive values directly (no extra state, no sync issues)
function Cart({ items }: { items: CartItem[] }) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  return <div>Total: {total} ({itemCount} items)</div>;
}

// For expensive derivations, use useMemo
function Cart({ items }: { items: CartItem[] }) {
  const { total, itemCount } = useMemo(() => ({
    total: items.reduce((sum, item) => sum + item.price * item.qty, 0),
    itemCount: items.reduce((sum, item) => sum + item.qty, 0),
  }), [items]);

  return <div>Total: {total} ({itemCount} items)</div>;
}`}</code></pre>

      <h2>14. Profile with React DevTools</h2>
      <p>
        The React DevTools Profiler shows exactly which components render, why they rendered, and how
        long each render takes. This is the most effective way to find performance bottlenecks.
      </p>
      <pre><code>{`// Steps to profile your app:
// 1. Install React DevTools browser extension
// 2. Open DevTools > Profiler tab
// 3. Click Record, interact with your app, click Stop
// 4. Analyze the flame chart:
//    - Yellow/red bars = slow renders
//    - "Why did this render?" shows the trigger
//    - Look for components that render but produce no visual change

// Add display names for better profiling
const MemoizedCard = React.memo(function Card(props: CardProps) {
  return <div>{/* ... */}</div>;
});

// Mark custom measurements
import { Profiler } from "react";

function App() {
  const onRender = (
    id: string,
    phase: "mount" | "update",
    actualDuration: number
  ) => {
    if (actualDuration > 16) {
      console.warn(\`Slow render: \${id} took \${actualDuration.toFixed(1)}ms\`);
    }
  };

  return (
    <Profiler id="Dashboard" onRender={onRender}>
      <Dashboard />
    </Profiler>
  );
}`}</code></pre>

      <h2>15. Optimize Bundle Size</h2>
      <p>
        A smaller JavaScript bundle means faster downloads and faster parsing. Analyze your bundle
        and eliminate unnecessary dependencies.
      </p>
      <pre><code>{`# Analyze your bundle
npx webpack-bundle-analyzer stats.json
# or for Next.js
ANALYZE=true npm run build

# Common bundle size wins:

# 1. Import only what you need
// Bad: imports entire library (300KB)
import _ from "lodash";
_.debounce(fn, 300);

// Good: import specific function (4KB)
import debounce from "lodash/debounce";
debounce(fn, 300);

# 2. Replace heavy libraries with lighter alternatives
// date-fns (tree-shakeable) instead of moment.js
// zustand (1KB) instead of redux + redux-toolkit (40KB+)
// preact/compat (3KB) instead of react (40KB) for simple apps

# 3. Dynamic imports for large dependencies
const { marked } = await import("marked");        // Only when needed
const { highlight } = await import("highlight.js"); // Only when needed

# 4. Use next/dynamic for conditional components
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("./RichTextEditor"), {
  loading: () => <div>Loading editor...</div>,
  ssr: false,  // Skip server-side rendering for client-only components
});`}</code></pre>

      <h2>Performance Checklist</h2>
      <p>
        Use this checklist to audit your React application:
      </p>
      <ul>
        <li><strong>Rendering</strong> - Are expensive components wrapped with <code>React.memo</code>? Are callbacks stabilized with <code>useCallback</code>?</li>
        <li><strong>State management</strong> - Is state stored at the lowest necessary level? Are derived values computed, not stored?</li>
        <li><strong>Lists</strong> - Are long lists virtualized? Do list items have stable, unique keys?</li>
        <li><strong>Code splitting</strong> - Are routes lazy-loaded? Are heavy components dynamically imported?</li>
        <li><strong>Images</strong> - Are images lazy-loaded, responsive, and in modern formats (WebP/AVIF)?</li>
        <li><strong>Bundle size</strong> - Are you importing only what you need? Have you audited your dependencies?</li>
        <li><strong>Network</strong> - Are API calls debounced? Is data cached (React Query, SWR)?</li>
        <li><strong>Animations</strong> - Are animations done in CSS? Is <code>will-change</code> used for animated elements?</li>
        <li><strong>Profiling</strong> - Have you used React DevTools Profiler to identify actual bottlenecks?</li>
        <li><strong>Transitions</strong> - Are non-urgent updates wrapped in <code>startTransition</code>?</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>Should I memoize everything?</h3>
      <p>
        No. Memoization has a cost: memory for the cached value and comparison logic on every render.
        Only memoize when you have measured a performance problem. Simple components that render quickly
        do not benefit from <code>React.memo</code>. Use the React DevTools Profiler to identify which
        components actually need optimization.
      </p>

      <h3>Is React slow compared to other frameworks?</h3>
      <p>
        React's virtual DOM diffing is fast enough for the vast majority of applications. When performance
        issues occur, they are almost always caused by application-level problems (unnecessary re-renders,
        unoptimized lists, large bundles) rather than React itself. The tips in this guide address these
        common issues. For extreme performance needs, consider Preact, Solid, or Svelte.
      </p>

      <h3>When should I use useCallback vs useMemo?</h3>
      <p>
        Use <code>useCallback</code> to memoize functions (event handlers, callbacks passed to children).
        Use <code>useMemo</code> to memoize computed values (filtered lists, formatted data, expensive
        calculations). In fact, <code>useCallback(fn, deps)</code> is equivalent to <code>useMemo(() =&gt; fn, deps)</code>.
        Both only help when the memoized result is passed to a memoized child or used as a dependency.
      </p>

      <h3>How do I measure Core Web Vitals for my React app?</h3>
      <p>
        Use Lighthouse in Chrome DevTools for lab data. Use the <code>web-vitals</code> library to measure
        real user metrics (LCP, FID, CLS, INP, TTFB) and send them to your analytics service. Next.js
        includes built-in Web Vitals reporting. Focus on Interaction to Next Paint (INP) as it replaced
        FID as a Core Web Vital in 2024.
      </p>
    </>
  );
}
