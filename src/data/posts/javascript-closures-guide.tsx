'use client';
import React from 'react';

const codeBasicClosure = `// What is a closure?
// A closure is a function that has access to variables
// from its outer (enclosing) lexical scope, even after
// that scope has returned.

function makeCounter() {
  let count = 0;    // private variable in the outer scope

  return function() {
    count++;        // inner function accesses outer variable
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// count is NOT accessible from outside:
// console.log(count); // ReferenceError!

// Each call to makeCounter() creates a NEW closure
const counter2 = makeCounter();
console.log(counter2()); // 1 (independent state)
console.log(counter());  // 4 (original counter continues)`;

const codeScopeChain = `// Closure captures the ENTIRE scope chain, not just one level
const globalVar = 'global';

function outer() {
  const outerVar = 'outer';

  function middle() {
    const middleVar = 'middle';

    function inner() {
      // Has access to ALL enclosing scopes
      console.log(globalVar);  // 'global'
      console.log(outerVar);   // 'outer'
      console.log(middleVar);  // 'middle'
    }

    inner();
  }

  middle();
}

outer();

// Variables are captured by REFERENCE, not by value
function makeAdder(x) {
  // x is captured by reference
  return function(y) {
    return x + y;   // x is still accessible
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(3));   // 8
console.log(add10(3));  // 13`;

const codeClassicBug = `// CLASSIC BUG: var in loops (before let/const existed)

// Wrong: all callbacks share the same i variable
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);   // prints 3, 3, 3 (not 0, 1, 2!)
  }, 100);
}
// Reason: var is function-scoped, one shared i that becomes 3

// Fix 1: use let (creates a new binding per iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);   // prints 0, 1, 2 ✓
  }, 100);
}

// Fix 2: IIFE (Immediately Invoked Function Expression) — old school
for (var i = 0; i < 3; i++) {
  (function(capturedI) {
    setTimeout(function() {
      console.log(capturedI);  // prints 0, 1, 2 ✓
    }, 100);
  })(i);
}

// Fix 3: factory function
function makeTimeout(index) {
  return function() {
    console.log(index);  // captured by value in this scope
  };
}

for (var i = 0; i < 3; i++) {
  setTimeout(makeTimeout(i), 100);   // 0, 1, 2 ✓
}`;

const codePatterns = `// CLOSURE PATTERNS

// 1. Module Pattern — private state with public API
const bankAccount = (function() {
  let balance = 0;    // private

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error('Insufficient funds');
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    },
  };
})();

bankAccount.deposit(100);
bankAccount.withdraw(30);
console.log(bankAccount.getBalance());  // 70
// console.log(balance); // ReferenceError

// 2. Memoization — cache expensive computations
function memoize(fn) {
  const cache = new Map();   // cache lives in the closure

  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log('cache hit');
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const slowFibonacci = (n) => n <= 1 ? n : slowFibonacci(n - 1) + slowFibonacci(n - 2);
const fastFibonacci = memoize(slowFibonacci);

// 3. Partial application
function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

const multiply = (a, b) => a * b;
const double = partial(multiply, 2);
const triple = partial(multiply, 3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// 4. Once — run a function only one time
function once(fn) {
  let called = false;
  let result;

  return function(...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const initialize = once(() => {
  console.log('Initialized!');
  return { status: 'ready' };
});

initialize();  // Initialized!
initialize();  // (nothing logged)
initialize();  // (nothing logged)`;

const codeMemory = `// MEMORY CONSIDERATIONS

// Closures keep references alive — potential memory leaks

// BAD: Large object kept alive by closure
function processData(hugeArray) {
  // processedResult only needs a small piece of hugeArray
  const processedResult = hugeArray[0].value;

  // But this closure keeps hugeArray alive in memory
  return function getResult() {
    return processedResult;  // only uses processedResult
    // However, the closure scope contains hugeArray!
  };
}

// BETTER: Narrow the scope so hugeArray can be GC'd
function processDataFixed(hugeArray) {
  const processedResult = hugeArray[0].value;
  hugeArray = null;  // allow GC (if no other references)

  return function getResult() {
    return processedResult;
  };
}

// REAL-WORLD: Event listener leaks
class Component {
  constructor() {
    this.data = new Array(1000000).fill('x');  // large data
    this.handler = (event) => {
      console.log(this.data.length);  // closure over 'this'
    };
    document.addEventListener('click', this.handler);
  }

  // MUST clean up to prevent memory leak
  destroy() {
    document.removeEventListener('click', this.handler);
  }
}`;

const codeReactClosures = `// Closures in React — the stale closure problem

import { useState, useEffect, useCallback, useRef } from 'react';

// PROBLEM: stale closure
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // count is captured at the time the effect runs (= 0)
      console.log(count);  // always logs 0! (stale closure)
    }, 1000);

    return () => clearInterval(interval);
  }, []);  // empty deps = runs once = captures count=0

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// FIX 1: Add count to dependency array
useEffect(() => {
  const interval = setInterval(() => {
    console.log(count);  // fresh value (but re-creates interval)
  }, 1000);
  return () => clearInterval(interval);
}, [count]);

// FIX 2: Use a ref (mutable, doesn't trigger re-render)
function CounterWithRef() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count;  // always up to date

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(countRef.current);  // always fresh!
    }, 1000);
    return () => clearInterval(interval);
  }, []);  // no deps needed

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'JavaScript Closures Deep Dive: Scope, Memory, Use Cases, and Patterns',
    intro: 'Closures are one of the most fundamental and powerful features in JavaScript. A closure is created when a function is defined inside another function and retains access to the outer function\'s variables even after the outer function has returned. Understanding closures deeply will change how you architect JavaScript code — from module patterns to React hooks.',
    basicTitle: 'What is a Closure?',
    basicDesc: 'Every time a function is created in JavaScript, a closure is formed. The function "closes over" its surrounding lexical environment — the variables in scope at the time of the function\'s definition.',
    scopeTitle: 'Scope Chain and Variable Capture',
    scopeDesc: 'Closures capture variables by reference, not by value. This is a source of both power and common bugs.',
    bugTitle: 'The Classic Loop Bug (and Fixes)',
    bugDesc: 'The most infamous closure bug: using var in a loop with asynchronous callbacks. Understanding this reveals exactly how closures capture variables.',
    patternsTitle: 'Practical Closure Patterns',
    patternsDesc: 'Closures enable several powerful programming patterns: the module pattern, memoization, partial application, and more.',
    memoryTitle: 'Memory Management with Closures',
    memoryDesc: 'Closures keep references to their enclosing scope alive. This is necessary for them to work, but can cause memory leaks if not managed carefully.',
    reactTitle: 'Closures in React: The Stale Closure Problem',
    reactDesc: 'React hooks rely heavily on closures, which can lead to the "stale closure" problem where event handlers or effects capture outdated state.',
    comparisonTitle: 'Closure vs Class: When to Use Which',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Are closures the same as IIFE (Immediately Invoked Function Expressions)?',
    faq1a: 'No, but they are related. An IIFE is a function that is defined and immediately called. It creates a new scope, and any functions returned from it will form closures over that scope. IIFEs were the primary way to create private scope before ES modules and block-scoped let/const. Today, ES modules provide better encapsulation.',
    faq2q: 'Do arrow functions create closures?',
    faq2a: 'Yes. Arrow functions are not special in terms of closures — they capture variables from their surrounding lexical scope just like regular functions. The key difference is that arrow functions do not have their own this binding, so they capture this from the surrounding scope too.',
    faq3q: 'What is the difference between a closure and a class?',
    faq3a: 'Both can maintain private state, but differ in approach. Closures use function scope to encapsulate state — private variables are simply local variables in the factory function. Classes use class fields (with # prefix for private fields in modern JS). Closures are more memory-efficient when creating one instance; classes (using prototypes) are more memory-efficient for multiple instances since methods are shared on the prototype.',
    faq4q: 'How do closures relate to garbage collection?',
    faq4a: 'A closure keeps its enclosing scope alive as long as the closure itself is reachable. If you create a closure that references a large object, that object will not be garbage collected as long as the closure exists. This is the primary source of closure-related memory leaks. Always remove event listeners and clear timers when they are no longer needed.',
    faq5q: 'Why do React hooks depend on closures?',
    faq5a: 'React hooks like useState and useEffect return functions that close over the component\'s state and props at the time of rendering. Each render creates a new closure with a snapshot of the current state. This is why useEffect dependencies are important — including stale values in the dependency array ensures React re-runs the effect with fresh closures when those values change.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JavaScript 闭包深度解析：作用域、内存、使用场景和模式',
    intro: '闭包是 JavaScript 中最基础、最强大的特性之一。当函数在另一个函数内部定义，并且即使在外部函数返回后仍然保留对外部函数变量的访问权限时，就会创建闭包。深入理解闭包将改变你构建 JavaScript 代码的方式——从模块模式到 React hooks。',
    basicTitle: '什么是闭包？',
    basicDesc: '每次在 JavaScript 中创建函数时，都会形成一个闭包。函数"关闭"了其周围的词法环境——函数定义时作用域内的变量。',
    scopeTitle: '作用域链和变量捕获',
    scopeDesc: '闭包通过引用捕获变量，而非按值捕获。这既是力量的来源，也是常见错误的根源。',
    bugTitle: '经典循环错误（及修复方法）',
    bugDesc: '最臭名昭著的闭包错误：在循环中使用 var 配合异步回调。理解这个问题能揭示闭包如何捕获变量。',
    patternsTitle: '实用的闭包模式',
    patternsDesc: '闭包支持几种强大的编程模式：模块模式、记忆化、偏应用等。',
    memoryTitle: '闭包的内存管理',
    memoryDesc: '闭包保持对其封闭作用域的引用。这是闭包工作的必要条件，但如果不仔细管理，可能会导致内存泄漏。',
    reactTitle: 'React 中的闭包：陈旧闭包问题',
    reactDesc: 'React hooks 严重依赖闭包，这可能导致"陈旧闭包"问题，即事件处理器或副作用捕获了过时的状态。',
    comparisonTitle: '闭包 vs 类：何时使用哪个',
    faqTitle: '常见问题',
    faq1q: '闭包和 IIFE（立即调用函数表达式）一样吗？',
    faq1a: '不一样，但有关联。IIFE 是定义后立即调用的函数。它创建一个新作用域，从它返回的任何函数都会对该作用域形成闭包。在 ES 模块和块作用域 let/const 之前，IIFE 是创建私有作用域的主要方式。今天，ES 模块提供了更好的封装。',
    faq2q: '箭头函数会创建闭包吗？',
    faq2a: '是的。就闭包而言，箭头函数没有什么特别之处——它们像普通函数一样从周围的词法作用域捕获变量。关键区别在于箭头函数没有自己的 this 绑定，所以它们也从周围作用域捕获 this。',
    faq3q: '闭包和类有什么区别？',
    faq3a: '两者都可以维护私有状态，但方法不同。闭包使用函数作用域封装状态——私有变量只是工厂函数中的局部变量。类使用类字段（现代 JS 中私有字段用 # 前缀）。创建一个实例时，闭包更节省内存；对于多个实例，类（使用原型）更节省内存，因为方法在原型上共享。',
    faq4q: '闭包与垃圾回收有什么关系？',
    faq4a: '只要闭包本身可以被访问，它就会保持其封闭作用域。如果你创建了一个引用大型对象的闭包，只要闭包存在，该对象就不会被垃圾回收。这是闭包相关内存泄漏的主要来源。当事件监听器和定时器不再需要时，始终移除它们。',
    faq5q: '为什么 React hooks 依赖闭包？',
    faq5a: 'useState 和 useEffect 等 React hooks 返回的函数会关闭组件在渲染时的状态和 props。每次渲染都会创建一个包含当前状态快照的新闭包。这就是为什么 useEffect 依赖项很重要——在依赖数组中包含陈旧值确保 React 在这些值改变时使用新鲜闭包重新运行副作用。',
    relatedTitle: '相关工具',
  },
};

export default function JavascriptClosuresGuide({ lang }: { lang: string }) {
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

  const comparisonRows = [
    { aspect: 'Private state', closure: 'Local variables in factory function', cls: 'Private class fields (#field)' },
    { aspect: 'Memory (single instance)', closure: 'More efficient (no prototype)', cls: 'Less efficient (prototype overhead)' },
    { aspect: 'Memory (many instances)', closure: 'Less efficient (each has own methods)', cls: 'More efficient (shared prototype methods)' },
    { aspect: 'Inheritance', closure: 'Via composition / Object.assign', cls: 'Via extends keyword' },
    { aspect: 'this binding', closure: 'No this issues (functional style)', cls: 'Requires careful this management' },
    { aspect: 'Readability', closure: 'Functional, compact', cls: 'OOP, familiar to Java/C# devs' },
    { aspect: 'Performance', closure: 'Slightly faster for closures', cls: 'Slightly faster method calls' },
  ];

  const preStyle: React.CSSProperties = { background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <h2>{t.basicTitle}</h2>
      <p>{t.basicDesc}</p>
      <pre style={preStyle}><code>{codeBasicClosure}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.scopeTitle}</h2>
      <p>{t.scopeDesc}</p>
      <pre style={preStyle}><code>{codeScopeChain}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.bugTitle}</h2>
      <p>{t.bugDesc}</p>
      <pre style={preStyle}><code>{codeClassicBug}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.patternsTitle}</h2>
      <p>{t.patternsDesc}</p>
      <pre style={preStyle}><code>{codePatterns}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.memoryTitle}</h2>
      <p>{t.memoryDesc}</p>
      <pre style={preStyle}><code>{codeMemory}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.reactTitle}</h2>
      <p>{t.reactDesc}</p>
      <pre style={preStyle}><code>{codeReactClosures}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.comparisonTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Aspect</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Closure</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Class</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 500 }}>{row.aspect}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.closure}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.cls}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #f6ad55' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><a href="/en/tools/javascript-minifier" style={{ color: '#3182ce' }}>JavaScript Minifier</a></li>
          <li><a href="/en/tools/regex-tester" style={{ color: '#3182ce' }}>Regex Tester</a></li>
          <li><a href="/en/tools/json-formatter" style={{ color: '#3182ce' }}>JSON Formatter</a></li>
        </ul>
      </div>
    </article>
  );
}
