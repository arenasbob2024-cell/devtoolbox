---
title: "React Hooks Complete Guide 2026: useState, useEffect, useRef, useMemo and Custom Hooks"
tags: react, javascript, webdev, frontend
canonical_url: https://viadreams.cc/en/blog/react-hooks-guide
published: true
---

React Hooks transformed how we write React components. In 2026, hooks are the standard. Here's everything you need to know.

## useState — The Foundation

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### Functional Updates

Always use functional updates when new state depends on old state:

```jsx
// Wrong - may use stale closure
setCount(count + 1);

// Correct - always uses latest state
setCount(prevCount => prevCount + 1);
```

### Object State

```jsx
const [user, setUser] = useState({
  name: '',
  email: '',
  age: 0
});

// Merge updates (like setState in class components)
const updateName = (name) => {
  setUser(prev => ({ ...prev, name }));
};
```

## useEffect — Side Effects

```jsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let cancelled = false;
    
    async function fetchUser() {
      setLoading(true);
      const data = await fetch(`/api/users/${userId}`).then(r => r.json());
      if (!cancelled) {
        setUser(data);
        setLoading(false);
      }
    }
    
    fetchUser();
    
    // Cleanup function — runs before next effect or unmount
    return () => { cancelled = true; };
  }, [userId]); // Re-run when userId changes
  
  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}
```

### Effect Dependency Rules

```jsx
// Run once on mount (empty array)
useEffect(() => {
  document.title = 'My App';
}, []);

// Run on every render (no array — usually wrong)
useEffect(() => {
  console.log('render');
});

// Run when specific values change
useEffect(() => {
  console.log(`User ${userId} changed`);
}, [userId]);
```

### Cleanup Patterns

```jsx
// Event listeners
useEffect(() => {
  const handler = (e) => console.log(e.key);
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, []);

// Timers
useEffect(() => {
  const timer = setInterval(() => setTime(Date.now()), 1000);
  return () => clearInterval(timer);
}, []);

// WebSocket
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com');
  ws.onmessage = (e) => setMessages(m => [...m, JSON.parse(e.data)]);
  return () => ws.close();
}, []);
```

## useRef — Mutable Values Without Re-renders

```jsx
import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  return <input ref={inputRef} />;
}
```

### Storing Previous Values

```jsx
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Component({ count }) {
  const prevCount = usePrevious(count);
  return <p>Changed from {prevCount} to {count}</p>;
}
```

### Interval without Stale Closures

```jsx
function useInterval(callback, delay) {
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  useEffect(() => {
    const id = setInterval(() => callbackRef.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

## useMemo — Expensive Computations

```jsx
import { useMemo } from 'react';

function ProductList({ products, searchTerm, sortBy }) {
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        return a.name.localeCompare(b.name);
      });
  }, [products, searchTerm, sortBy]); // Only recompute when these change
  
  return filteredProducts.map(p => <ProductCard key={p.id} product={p} />);
}
```

**Only use `useMemo` for genuinely expensive operations.** Don't over-optimize.

## useCallback — Stable Function References

```jsx
import { useCallback, useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  
  const handleSearch = useCallback(() => {
    onSearch(query);
  }, [query, onSearch]);
  
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
```

## useContext — Shared State

```jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be inside ThemeProvider');
  return context;
}

// Usage
function NavBar() {
  const { theme, setTheme } = useTheme();
  return (
    <nav className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </nav>
  );
}
```

## Custom Hooks — Reusable Logic

### useLocalStorage

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  
  const setStoredValue = useCallback((newValue) => {
    const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
    setValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  }, [key, value]);
  
  return [value, setStoredValue];
}

// Usage
function Settings() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  return <button onClick={() => setDarkMode(d => !d)}>Toggle</button>;
}
```

### useFetch

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!url) return;
    
    const controller = new AbortController();
    
    fetch(url, { signal: controller.signal })
      .then(r => r.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setLoading(false));
    
    return () => controller.abort();
  }, [url]);
  
  return { data, loading, error };
}
```

### useDebounce

```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}

function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  
  useEffect(() => {
    if (debouncedQuery) {
      // Only fires 300ms after user stops typing
      searchAPI(debouncedQuery);
    }
  }, [debouncedQuery]);
  
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

## Rules of Hooks

1. **Only call hooks at the top level** — not inside loops, conditions, or nested functions
2. **Only call hooks from React functions** — function components or custom hooks
3. **Custom hook names must start with `use`**

Use ESLint's `eslint-plugin-react-hooks` to automatically catch violations.

React Hooks enable clean, composable code. Combine them with [DevToolBox tools](https://viadreams.cc/en/tools/json-formatter) for your development workflow.
