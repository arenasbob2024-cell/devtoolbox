'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'JavaScript\'s <strong>map()</strong>, <strong>filter()</strong>, and <strong>reduce()</strong> are the three pillars of functional array processing. They enable you to transform, select, and aggregate data without mutating the original array. Combined with <strong>method chaining</strong>, they create expressive data pipelines that are easier to read, test, and maintain than imperative loops. This guide covers every method in depth with runnable examples showing input and output.',
    link_json: 'Format and inspect your JSON data with our JSON Formatter \u2192',
    link_js: 'Beautify your JavaScript code with our JS/HTML Formatter \u2192',

    h2_overview: '1. Overview \u2014 Functional Programming in JavaScript',
    p_overview: 'Functional programming in JavaScript revolves around <strong>pure functions</strong>, <strong>immutability</strong>, and <strong>declarative</strong> data transformations. The three array methods \u2014 <code>map()</code>, <code>filter()</code>, and <code>reduce()</code> \u2014 embody these principles: they never mutate the source array, always return a new value, and can be chained together to build complex operations from simple building blocks.',
    p_overview2: 'Why use them instead of <code>for</code> loops? They separate the <em>what</em> from the <em>how</em>. When you see <code>.filter()</code>, you immediately know the intent is to select elements. When you see <code>.map()</code>, you know the intent is to transform each element. This makes code self-documenting and reduces bugs caused by off-by-one errors or accidental mutations.',

    h2_map_basics: '2. map() Basics \u2014 Syntax and Callback Parameters',
    p_map_basics: '<code>Array.prototype.map()</code> creates a <strong>new array</strong> by calling a callback function on every element of the original array. It always returns an array of the <strong>same length</strong>. The callback receives three arguments: the current <code>value</code>, the <code>index</code>, and the entire <code>array</code>.',

    h2_map_examples: '3. map() Real-World Examples',
    p_map_examples: 'Below are production-ready patterns for <code>map()</code>: transforming objects, extracting fields, formatting data, and using TypeScript generics for type safety.',

    h2_filter_basics: '4. filter() Basics \u2014 Truthy/Falsy and Immutability',
    p_filter_basics: '<code>Array.prototype.filter()</code> creates a new array containing only the elements for which the callback returns a <strong>truthy</strong> value. It does <strong>not</strong> mutate the original array, and the returned array may be shorter (or even empty).',

    h2_filter_examples: '5. filter() Real-World Examples',
    p_filter_examples: 'Common patterns: removing nulls/undefined, searching arrays, filtering objects by property, and extracting unique values.',

    h2_reduce_basics: '6. reduce() Basics \u2014 Accumulator, CurrentValue, Initial Value',
    p_reduce_basics: '<code>Array.prototype.reduce()</code> executes a callback on each element, passing the return value from the previous call as the <strong>accumulator</strong>. The second argument to <code>reduce()</code> is the <strong>initial value</strong> \u2014 always provide it to avoid unexpected behavior with empty arrays.',

    h2_reduce_patterns: '7. reduce() Patterns \u2014 Sum, GroupBy, Flatten, Pipeline',
    p_reduce_patterns: '<code>reduce()</code> is the most versatile array method. It can implement virtually any array operation: sum, average, groupBy, flatten, count occurrences, and even function composition pipelines.',

    h2_chaining: '8. Chaining map + filter + reduce \u2014 Data Processing Pipelines',
    p_chaining: 'The real power of functional array methods emerges when you chain them together. Each method in the chain receives the output of the previous one, creating a clean, readable data pipeline.',

    h2_flatmap: '9. flatMap() \u2014 Map + Flatten in One Step',
    p_flatmap: '<code>Array.prototype.flatMap()</code> (ES2019) is equivalent to calling <code>map()</code> followed by <code>flat(1)</code>. It is useful when your mapping function returns an array for each element and you want the results flattened into a single array.',

    h2_comparison: '10. for...of vs forEach vs map/filter/reduce',
    p_comparison: 'Each iteration approach has trade-offs in performance, readability, and capabilities. Here is a comprehensive comparison to help you choose the right tool.',

    h2_typescript: '11. TypeScript with map/filter/reduce',
    p_typescript: 'TypeScript enhances these methods with <strong>type narrowing</strong>, <strong>generics</strong>, and <strong>type guards</strong> that catch errors at compile time instead of runtime.',

    h2_mistakes: '12. Common Mistakes and How to Fix Them',
    p_mistakes: 'Even experienced developers fall into these traps. Here are the most common mistakes with <code>map()</code>, <code>filter()</code>, and <code>reduce()</code> and how to fix each one.',

    h2_faq: '13. Frequently Asked Questions',
    faq1_q: 'What is the difference between map() and forEach() in JavaScript?',
    faq1_a: 'map() returns a new array with the transformed elements, while forEach() returns undefined and is used only for side effects. Use map() when you need the result array; use forEach() when you only need to perform actions (like logging or DOM updates) without collecting results. map() is chainable; forEach() is not.',
    faq2_q: 'When should I use reduce() instead of a for loop?',
    faq2_a: 'Use reduce() when you need to aggregate an array into a single value (sum, object, string, etc.) and the logic is concise. For complex multi-step logic with early exits, side effects, or async operations, a for loop may be clearer. reduce() shines for patterns like groupBy, counting, flattening, and function composition.',
    faq3_q: 'Does filter() modify the original array?',
    faq3_a: 'No. filter() always returns a new array and leaves the original array unchanged. However, if the array contains objects, the new array holds references to the same objects \u2014 so mutating an object inside the filtered array will also affect the original. To avoid this, combine filter() with map() and spread/Object.assign to create shallow copies.',
    faq4_q: 'What happens if I forget the initial value in reduce()?',
    faq4_a: 'If you omit the initial value, reduce() uses the first element as the initial accumulator and starts iteration from the second element. This works for simple numeric sums but causes a TypeError on empty arrays and produces wrong results when the accumulator type differs from the element type (e.g., reducing to an object). Always provide an initial value.',
    faq5_q: 'Can I use map(), filter(), and reduce() with async/await?',
    faq5_a: 'map() with async callbacks returns an array of Promises \u2014 use Promise.all(arr.map(async fn)) to await all results. filter() does not work directly with async callbacks because a Promise is always truthy; instead, map to get boolean results first, then filter. reduce() can chain async operations using await on the accumulator: arr.reduce(async (accP, item) => { const acc = await accP; ... }, Promise.resolve(initial)).',

    p_conclusion: 'Master these three methods and you will write cleaner, more maintainable JavaScript. For quick data inspection, try our tools below.',
    link_json_bottom: 'Try the JSON Formatter \u2192',
    link_js_bottom: 'Try the JS/HTML Formatter \u2192',
  },
  zh: {
    intro: 'JavaScript 的 <strong>map()</strong>、<strong>filter()</strong> 和 <strong>reduce()</strong> 是函数式数组处理的三大支柱。它们让你在不修改原数组的情况下进行数据转换、筛选和聚合。结合<strong>方法链式调用</strong>，它们能构建出比命令式循环更易读、易测试、易维护的数据处理管道。本指南深入讲解每个方法，配有可运行的代码示例，展示输入和输出结果。',
    link_json: '使用我们的 JSON 格式化工具检查和格式化你的 JSON 数据 \u2192',
    link_js: '使用我们的 JS/HTML 格式化工具美化你的代码 \u2192',

    h2_overview: '1. 概述 \u2014 JavaScript 中的函数式编程',
    p_overview: 'JavaScript 中的函数式编程围绕<strong>纯函数</strong>、<strong>不可变性</strong>和<strong>声明式</strong>数据转换展开。三大数组方法 \u2014 <code>map()</code>、<code>filter()</code> 和 <code>reduce()</code> \u2014 体现了这些原则：它们从不修改源数组，总是返回新值，并且可以链式调用以从简单的构建块组合出复杂操作。',
    p_overview2: '为什么要用它们代替 <code>for</code> 循环？因为它们将"做什么"和"怎么做"分离。当你看到 <code>.filter()</code>，你立刻知道意图是筛选元素。当你看到 <code>.map()</code>，你知道意图是转换每个元素。这使代码自文档化，减少了越界错误或意外修改导致的 bug。',

    h2_map_basics: '2. map() 基础 \u2014 语法和回调参数',
    p_map_basics: '<code>Array.prototype.map()</code> 通过对原数组的每个元素调用回调函数来创建一个<strong>新数组</strong>。它总是返回一个<strong>相同长度</strong>的数组。回调接收三个参数：当前<code>值</code>、<code>索引</code>和整个<code>数组</code>。',

    h2_map_examples: '3. map() 实战示例',
    p_map_examples: '以下是 <code>map()</code> 的生产级模式：转换对象、提取字段、格式化数据，以及使用 TypeScript 泛型确保类型安全。',

    h2_filter_basics: '4. filter() 基础 \u2014 真值/假值与不可变性',
    p_filter_basics: '<code>Array.prototype.filter()</code> 创建一个新数组，仅包含回调返回<strong>真值</strong>的元素。它<strong>不会</strong>修改原数组，返回的数组可能更短（甚至为空）。',

    h2_filter_examples: '5. filter() 实战示例',
    p_filter_examples: '常见模式：移除 null/undefined、搜索数组、按属性过滤对象、提取唯一值。',

    h2_reduce_basics: '6. reduce() 基础 \u2014 累加器、当前值与初始值',
    p_reduce_basics: '<code>Array.prototype.reduce()</code> 对每个元素执行回调，将上一次调用的返回值作为<strong>累加器</strong>传递。<code>reduce()</code> 的第二个参数是<strong>初始值</strong> \u2014 务必提供它以避免空数组上的异常行为。',

    h2_reduce_patterns: '7. reduce() 模式 \u2014 求和、分组、展平、管道',
    p_reduce_patterns: '<code>reduce()</code> 是最通用的数组方法。它几乎可以实现任何数组操作：求和、平均值、分组（groupBy）、展平（flatten）、计数和函数组合管道。',

    h2_chaining: '8. 链式调用 map + filter + reduce \u2014 数据处理管道',
    p_chaining: '函数式数组方法的真正威力在于链式调用。链中的每个方法接收上一个方法的输出，形成清晰、可读的数据处理管道。',

    h2_flatmap: '9. flatMap() \u2014 一步完成映射和展平',
    p_flatmap: '<code>Array.prototype.flatMap()</code>（ES2019）等同于先调用 <code>map()</code> 再调用 <code>flat(1)</code>。当你的映射函数为每个元素返回数组，并且你希望将结果展平为单个数组时非常有用。',

    h2_comparison: '10. for...of vs forEach vs map/filter/reduce 对比',
    p_comparison: '每种迭代方式在性能、可读性和能力上都有取舍。以下是全面的对比，帮助你选择合适的工具。',

    h2_typescript: '11. TypeScript 中使用 map/filter/reduce',
    p_typescript: 'TypeScript 通过<strong>类型收窄</strong>、<strong>泛型</strong>和<strong>类型守卫</strong>增强了这些方法，在编译时而非运行时捕获错误。',

    h2_mistakes: '12. 常见错误及修复方法',
    p_mistakes: '即使是经验丰富的开发者也会掉入这些陷阱。以下是 <code>map()</code>、<code>filter()</code> 和 <code>reduce()</code> 最常见的错误及修复方法。',

    h2_faq: '13. 常见问题',
    faq1_q: 'JavaScript 中 map() 和 forEach() 有什么区别？',
    faq1_a: 'map() 返回一个包含转换后元素的新数组，而 forEach() 返回 undefined，仅用于执行副作用。当你需要结果数组时使用 map()；当你只需要执行操作（如日志记录或 DOM 更新）而不收集结果时使用 forEach()。map() 可以链式调用，forEach() 不行。',
    faq2_q: '什么时候应该用 reduce() 而不是 for 循环？',
    faq2_a: '当你需要将数组聚合为单个值（求和、对象、字符串等）且逻辑简洁时，使用 reduce()。对于需要提前退出、副作用或异步操作的复杂多步逻辑，for 循环可能更清晰。reduce() 在 groupBy、计数、展平和函数组合等模式中表现出色。',
    faq3_q: 'filter() 会修改原数组吗？',
    faq3_a: '不会。filter() 总是返回新数组，原数组保持不变。但如果数组包含对象，新数组持有对相同对象的引用 \u2014 因此修改过滤后数组中的对象也会影响原数组。要避免这种情况，可以将 filter() 与 map() 和展开运算符/Object.assign 结合使用来创建浅拷贝。',
    faq4_q: '如果忘记给 reduce() 提供初始值会怎样？',
    faq4_a: '如果省略初始值，reduce() 将第一个元素作为初始累加器，从第二个元素开始迭代。这对简单的数值求和有效，但在空数组上会抛出 TypeError，且当累加器类型与元素类型不同时（如归约为对象）会产生错误结果。务必提供初始值。',
    faq5_q: '可以将 map()、filter() 和 reduce() 与 async/await 一起使用吗？',
    faq5_a: '带 async 回调的 map() 返回 Promise 数组 \u2014 使用 Promise.all(arr.map(async fn)) 来等待所有结果。filter() 不能直接与 async 回调配合，因为 Promise 总是真值；需要先 map 获取布尔结果，然后再 filter。reduce() 可以通过在累加器上使用 await 来链式处理异步操作：arr.reduce(async (accP, item) => { const acc = await accP; ... }, Promise.resolve(initial))。',

    p_conclusion: '掌握这三个方法，你将写出更简洁、更易维护的 JavaScript 代码。要快速检查数据，试试下面的工具。',
    link_json_bottom: '试试 JSON 格式化工具 \u2192',
    link_js_bottom: '试试 JS/HTML 格式化工具 \u2192',
  },
};

export default function JavaScriptMapFilterReduceExamples({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
    ],
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      <p>
        <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_json}
        </Link>
      </p>
      <p>
        <Link href={`/${lang}/tools/js-html-formatter`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_js}
        </Link>
      </p>

      {/* ============================================================ */}
      {/* 1. Overview */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_overview}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_overview }} />
      <p dangerouslySetInnerHTML={{ __html: t.p_overview2 }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Imperative (for loop) vs Declarative (map/filter/reduce)

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Imperative: get sum of squares of even numbers
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    sum += numbers[i] ** 2;
  }
}
console.log(sum); // 220

// Declarative: same result, but reads like a sentence
const result = numbers
  .filter(n => n % 2 === 0)       // [2, 4, 6, 8, 10]
  .map(n => n ** 2)                // [4, 16, 36, 64, 100]
  .reduce((acc, n) => acc + n, 0); // 220

console.log(result); // 220

// Key principle: the original array is NEVER modified
console.log(numbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] — unchanged`}</code></pre>

      {/* ============================================================ */}
      {/* 2. map() Basics */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_map_basics}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_map_basics }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Syntax:
// array.map(callback(currentValue, index, array), thisArg?)

// Basic: double every number
const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);
console.log(doubled);
// Output: [2, 4, 6, 8, 10]

// Using all three callback parameters
const indexed = ['a', 'b', 'c'].map((value, index, array) => {
  return \`\${index}/\${array.length}: \${value}\`;
});
console.log(indexed);
// Output: ["0/3: a", "1/3: b", "2/3: c"]

// map() ALWAYS returns a new array of the same length
const original = [10, 20, 30];
const mapped = original.map(x => x);
console.log(mapped === original); // false (different reference)
console.log(mapped.length === original.length); // true

// Common gotcha: map() with parseInt
console.log(['1', '2', '3'].map(Number));     // [1, 2, 3] ✅
console.log(['1', '2', '3'].map(parseInt));    // [1, NaN, NaN] ❌
// Because parseInt receives (value, index) → parseInt('2', 1) is NaN
// Fix: wrap in arrow function
console.log(['1', '2', '3'].map(s => parseInt(s, 10))); // [1, 2, 3] ✅`}</code></pre>

      {/* ============================================================ */}
      {/* 3. map() Real Examples */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_map_examples}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_map_examples }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 3a. Transform objects — add computed fields
const users = [
  { firstName: 'Alice', lastName: 'Smith', age: 30 },
  { firstName: 'Bob', lastName: 'Jones', age: 25 },
  { firstName: 'Charlie', lastName: 'Brown', age: 35 },
];

const enriched = users.map(user => ({
  ...user,
  fullName: \`\${user.firstName} \${user.lastName}\`,
  isAdult: user.age >= 18,
}));

console.log(enriched);
// Output:
// [
//   { firstName: 'Alice', lastName: 'Smith', age: 30, fullName: 'Alice Smith', isAdult: true },
//   { firstName: 'Bob', lastName: 'Jones', age: 25, fullName: 'Bob Jones', isAdult: true },
//   { firstName: 'Charlie', lastName: 'Brown', age: 35, fullName: 'Charlie Brown', isAdult: true },
// ]`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 3b. Extract specific fields (projection)
const products = [
  { id: 1, name: 'Laptop', price: 999, stock: 50 },
  { id: 2, name: 'Phone', price: 699, stock: 120 },
  { id: 3, name: 'Tablet', price: 499, stock: 80 },
];

const names = products.map(p => p.name);
console.log(names);
// Output: ["Laptop", "Phone", "Tablet"]

// Extract id-name pairs for a dropdown
const options = products.map(({ id, name }) => ({ value: id, label: name }));
console.log(options);
// Output: [{ value: 1, label: 'Laptop' }, { value: 2, label: 'Phone' }, { value: 3, label: 'Tablet' }]`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 3c. Format data for display
const prices = [1299.5, 49.99, 0.5, 1000];

const formatted = prices.map(p =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p)
);
console.log(formatted);
// Output: ["$1,299.50", "$49.99", "$0.50", "$1,000.00"]

// Format dates
const timestamps = [1700000000000, 1710000000000, 1720000000000];
const dates = timestamps.map(ts =>
  new Date(ts).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
);
console.log(dates);
// Output: ["Nov 14, 2023", "Mar 9, 2024", "Jul 3, 2024"]`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 3d. TypeScript typing with map()
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserDTO {
  id: number;
  displayName: string;
}

const usersData: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// TypeScript infers the return type as UserDTO[]
const dtos: UserDTO[] = usersData.map((user): UserDTO => ({
  id: user.id,
  displayName: user.name.toUpperCase(),
}));

console.log(dtos);
// Output: [{ id: 1, displayName: 'ALICE' }, { id: 2, displayName: 'BOB' }]`}</code></pre>

      {/* ============================================================ */}
      {/* 4. filter() Basics */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_filter_basics}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_filter_basics }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Syntax:
// array.filter(callback(element, index, array), thisArg?)

// Basic: keep only even numbers
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens);
// Output: [2, 4, 6, 8, 10]

// The callback must return a truthy or falsy value
// These are FALSY in JavaScript: false, 0, '', null, undefined, NaN
const mixed = [0, 1, '', 'hello', null, undefined, false, true, NaN, 42];
const truthy = mixed.filter(Boolean);
console.log(truthy);
// Output: [1, "hello", true, 42]

// filter() does NOT mutate the original
const original = [10, 20, 30, 40, 50];
const filtered = original.filter(n => n > 25);
console.log(filtered);  // [30, 40, 50]
console.log(original);  // [10, 20, 30, 40, 50] — unchanged

// filter() can return an empty array
const empty = [1, 2, 3].filter(n => n > 100);
console.log(empty); // []`}</code></pre>

      {/* ============================================================ */}
      {/* 5. filter() Real Examples */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_filter_examples}</h2>
      <p>{t.p_filter_examples}</p>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 5a. Remove nulls and undefined (type-safe)
const data = ['Alice', null, 'Bob', undefined, 'Charlie', null];

const clean = data.filter((item): item is string => item != null);
console.log(clean);
// Output: ["Alice", "Bob", "Charlie"]

// Without type guard (still works at runtime)
const clean2 = data.filter(Boolean);
console.log(clean2);
// Output: ["Alice", "Bob", "Charlie"]`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 5b. Search / text matching
const fruits = ['Apple', 'Banana', 'Avocado', 'Blueberry', 'Apricot', 'Cherry'];

const startsWithA = fruits.filter(f => f.startsWith('A'));
console.log(startsWithA);
// Output: ["Apple", "Avocado", "Apricot"]

// Case-insensitive search
function search(items: string[], query: string): string[] {
  const q = query.toLowerCase();
  return items.filter(item => item.toLowerCase().includes(q));
}

console.log(search(fruits, 'berry'));
// Output: ["Blueberry"]

console.log(search(fruits, 'an'));
// Output: ["Banana"]`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 5c. Filter objects by property
const products = [
  { name: 'Laptop', price: 999, inStock: true },
  { name: 'Phone', price: 699, inStock: false },
  { name: 'Tablet', price: 499, inStock: true },
  { name: 'Watch', price: 299, inStock: true },
  { name: 'Headphones', price: 199, inStock: false },
];

// In stock and under $500
const affordable = products.filter(p => p.inStock && p.price < 500);
console.log(affordable);
// Output: [{ name: 'Tablet', price: 499, inStock: true }, { name: 'Watch', price: 299, inStock: true }]

// Multiple conditions with a predicate builder
function createFilter(minPrice: number, maxPrice: number, mustBeInStock: boolean) {
  return (p: typeof products[0]) =>
    p.price >= minPrice &&
    p.price <= maxPrice &&
    (!mustBeInStock || p.inStock);
}

const filtered = products.filter(createFilter(200, 700, true));
console.log(filtered.map(p => p.name));
// Output: ["Tablet", "Watch"]`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 5d. Extract unique values
const tags = ['js', 'ts', 'react', 'js', 'node', 'ts', 'react', 'vue'];

// Method 1: filter with indexOf
const unique1 = tags.filter((tag, index) => tags.indexOf(tag) === index);
console.log(unique1);
// Output: ["js", "ts", "react", "node", "vue"]

// Method 2: Set (preferred for performance)
const unique2 = [...new Set(tags)];
console.log(unique2);
// Output: ["js", "ts", "react", "node", "vue"]

// Unique objects by property
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice (duplicate)' },
  { id: 3, name: 'Charlie' },
];

const seen = new Set();
const uniqueUsers = users.filter(u => {
  if (seen.has(u.id)) return false;
  seen.add(u.id);
  return true;
});
console.log(uniqueUsers);
// Output: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]`}</code></pre>

      {/* ============================================================ */}
      {/* 6. reduce() Basics */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_reduce_basics}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_reduce_basics }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Syntax:
// array.reduce(callback(accumulator, currentValue, index, array), initialValue)

// Basic: sum of numbers
const nums = [10, 20, 30, 40, 50];
const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum);
// Output: 150

// Step-by-step trace:
// Step 0: acc = 0 (initial),  curr = 10 → return 10
// Step 1: acc = 10,           curr = 20 → return 30
// Step 2: acc = 30,           curr = 30 → return 60
// Step 3: acc = 60,           curr = 40 → return 100
// Step 4: acc = 100,          curr = 50 → return 150

// ⚠️ Without initial value — risky!
const sum2 = [10, 20, 30].reduce((acc, curr) => acc + curr);
console.log(sum2); // 60 — works, but...

// Empty array WITHOUT initial value → TypeError!
try {
  [].reduce((acc, curr) => acc + curr);
} catch (e) {
  console.log(e.message);
  // "Reduce of empty array with no initial value"
}

// Empty array WITH initial value → safe
const sum3 = [].reduce((acc, curr) => acc + curr, 0);
console.log(sum3); // 0`}</code></pre>

      {/* ============================================================ */}
      {/* 7. reduce() Patterns */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_reduce_patterns}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_reduce_patterns }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 7a. Sum and Average
const scores = [85, 92, 78, 96, 88];

const total = scores.reduce((acc, s) => acc + s, 0);
const average = total / scores.length;

console.log(\`Total: \${total}, Average: \${average}\`);
// Output: "Total: 439, Average: 87.8"

// One-liner average
const avg = scores.reduce((a, b, i, arr) => a + b / arr.length, 0);
console.log(avg); // 87.8`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 7b. groupBy — group objects by a key
const people = [
  { name: 'Alice', department: 'Engineering' },
  { name: 'Bob', department: 'Marketing' },
  { name: 'Charlie', department: 'Engineering' },
  { name: 'Diana', department: 'Marketing' },
  { name: 'Eve', department: 'Design' },
];

const grouped = people.reduce((acc, person) => {
  const key = person.department;
  if (!acc[key]) acc[key] = [];
  acc[key].push(person.name);
  return acc;
}, {} as Record<string, string[]>);

console.log(grouped);
// Output:
// {
//   Engineering: ['Alice', 'Charlie'],
//   Marketing: ['Bob', 'Diana'],
//   Design: ['Eve']
// }

// ES2024+ alternative: Object.groupBy()
// const grouped2 = Object.groupBy(people, p => p.department);`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 7c. Flatten nested arrays
const nested = [[1, 2], [3, 4], [5, [6, 7]]];

// Flatten one level
const flat1 = nested.reduce((acc, curr) => acc.concat(curr), []);
console.log(flat1);
// Output: [1, 2, 3, 4, 5, [6, 7]]

// Modern alternative: Array.flat()
const flat2 = nested.flat(1);
console.log(flat2);
// Output: [1, 2, 3, 4, 5, [6, 7]]

// Deep flatten with reduce (recursive)
function deepFlatten(arr) {
  return arr.reduce((acc, val) =>
    Array.isArray(val) ? acc.concat(deepFlatten(val)) : acc.concat(val),
    []
  );
}

console.log(deepFlatten([[1, [2, [3, [4]]]], [5]]));
// Output: [1, 2, 3, 4, 5]`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 7d. Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

const counts = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log(counts);
// Output: { apple: 3, banana: 2, orange: 1 }

// Find the most common element
const mostCommon = Object.entries(counts)
  .reduce((max, [key, val]) => val > max[1] ? [key, val] : max, ['', 0]);

console.log(mostCommon);
// Output: ["apple", 3]`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 7e. Function composition pipeline
const pipeline = [
  (s: string) => s.trim(),
  (s: string) => s.toLowerCase(),
  (s: string) => s.replace(/\\s+/g, '-'),
  (s: string) => s.replace(/[^a-z0-9-]/g, ''),
];

const slugify = (input: string) =>
  pipeline.reduce((acc, fn) => fn(acc), input);

console.log(slugify('  Hello World! @2024  '));
// Output: "hello-world-2024"

console.log(slugify('  JavaScript Map, Filter & Reduce  '));
// Output: "javascript-map-filter--reduce"

// Generic pipe function
function pipe<T>(...fns: ((arg: T) => T)[]): (arg: T) => T {
  return (input: T) => fns.reduce((acc, fn) => fn(acc), input);
}

const process = pipe(
  (n: number) => n * 2,
  (n: number) => n + 10,
  (n: number) => n / 3,
);

console.log(process(5));  // (5 * 2 + 10) / 3 = 6.666...
console.log(process(10)); // (10 * 2 + 10) / 3 = 10`}</code></pre>

      {/* ============================================================ */}
      {/* 8. Chaining */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_chaining}</h2>
      <p>{t.p_chaining}</p>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Real-world example: process e-commerce order data
const orders = [
  { id: 1, customer: 'Alice', total: 250, status: 'completed', date: '2024-01-15' },
  { id: 2, customer: 'Bob', total: 120, status: 'cancelled', date: '2024-01-16' },
  { id: 3, customer: 'Alice', total: 350, status: 'completed', date: '2024-02-01' },
  { id: 4, customer: 'Charlie', total: 80, status: 'completed', date: '2024-02-10' },
  { id: 5, customer: 'Alice', total: 500, status: 'completed', date: '2024-03-05' },
  { id: 6, customer: 'Bob', total: 200, status: 'completed', date: '2024-03-15' },
  { id: 7, customer: 'Diana', total: 150, status: 'refunded', date: '2024-03-20' },
];

// Pipeline: completed orders → calculate revenue per customer → sort by revenue
const revenueByCustomer = orders
  .filter(order => order.status === 'completed')
  .map(order => ({ customer: order.customer, total: order.total }))
  .reduce((acc, { customer, total }) => {
    acc[customer] = (acc[customer] || 0) + total;
    return acc;
  }, {} as Record<string, number>);

console.log(revenueByCustomer);
// Output: { Alice: 1100, Charlie: 80, Bob: 200 }

// Convert to sorted array
const ranked = Object.entries(revenueByCustomer)
  .map(([customer, revenue]) => ({ customer, revenue }))
  .sort((a, b) => b.revenue - a.revenue);

console.log(ranked);
// Output:
// [
//   { customer: 'Alice', revenue: 1100 },
//   { customer: 'Bob', revenue: 200 },
//   { customer: 'Charlie', revenue: 80 },
// ]`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Another pipeline: process API response data
const apiResponse = [
  { id: 1, title: '  Hello World  ', tags: ['js', 'tutorial'], views: 1500 },
  { id: 2, title: '  Advanced TypeScript  ', tags: ['ts', 'advanced'], views: 800 },
  { id: 3, title: '  React Hooks Guide  ', tags: ['react', 'hooks'], views: 3200 },
  { id: 4, title: '  CSS Grid Tutorial  ', tags: ['css', 'layout'], views: 200 },
  { id: 5, title: '  Node.js Best Practices  ', tags: ['node', 'backend'], views: 2100 },
];

const result = apiResponse
  .filter(post => post.views >= 500)            // popular posts only
  .map(post => ({
    ...post,
    title: post.title.trim(),                    // clean up titles
    slug: post.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    isViral: post.views > 2000,
  }))
  .reduce((acc, post) => {
    const category = post.isViral ? 'viral' : 'popular';
    if (!acc[category]) acc[category] = [];
    acc[category].push(post.title);
    return acc;
  }, {} as Record<string, string[]>);

console.log(result);
// Output:
// {
//   popular: ["Hello World", "Advanced TypeScript"],
//   viral: ["React Hooks Guide", "Node.js Best Practices"]
// }`}</code></pre>

      {/* ============================================================ */}
      {/* 9. flatMap() */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_flatmap}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_flatmap }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// flatMap() = map() + flat(1)

// Split sentences into words
const sentences = ['Hello World', 'Foo Bar Baz', 'One Two'];
const words = sentences.flatMap(s => s.split(' '));
console.log(words);
// Output: ["Hello", "World", "Foo", "Bar", "Baz", "One", "Two"]

// Without flatMap (two steps):
const words2 = sentences.map(s => s.split(' ')).flat();
console.log(words2);
// Output: ["Hello", "World", "Foo", "Bar", "Baz", "One", "Two"]

// Use flatMap to conditionally expand or remove items
const nums = [1, 2, 3, 4, 5];

// Double even numbers, remove odd numbers
const result = nums.flatMap(n => n % 2 === 0 ? [n, n] : []);
console.log(result);
// Output: [2, 2, 4, 4]

// Expand ranges
const ranges = [[1, 3], [5, 7], [10, 12]];
const expanded = ranges.flatMap(([start, end]) => {
  const arr = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
});
console.log(expanded);
// Output: [1, 2, 3, 5, 6, 7, 10, 11, 12]

// Extract all tags from posts
const posts = [
  { title: 'Post A', tags: ['js', 'react'] },
  { title: 'Post B', tags: ['ts', 'node'] },
  { title: 'Post C', tags: ['js', 'vue', 'css'] },
];

const allTags = posts.flatMap(p => p.tags);
console.log(allTags);
// Output: ["js", "react", "ts", "node", "js", "vue", "css"]

const uniqueTags = [...new Set(allTags)];
console.log(uniqueTags);
// Output: ["js", "react", "ts", "node", "vue", "css"]`}</code></pre>

      {/* ============================================================ */}
      {/* 10. Comparison */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_comparison}</h2>
      <p>{t.p_comparison}</p>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Comparison table:
// ┌─────────────────────┬───────────┬──────────┬───────────┬──────────────┐
// │ Feature             │ for...of  │ forEach  │ map       │ filter/reduce│
// ├─────────────────────┼───────────┼──────────┼───────────┼──────────────┤
// │ Returns value       │ No        │ No       │ Yes       │ Yes          │
// │ Chainable           │ No        │ No       │ Yes       │ Yes          │
// │ break/continue      │ Yes       │ No*      │ No        │ No           │
// │ async/await         │ Yes       │ No**     │ No**      │ No**         │
// │ Performance         │ Fastest   │ Fast     │ Fast      │ Fast         │
// │ Readability (intent)│ Low       │ Medium   │ High      │ High         │
// │ Mutates original    │ Can       │ Can      │ No        │ No           │
// └─────────────────────┴───────────┴──────────┴───────────┴──────────────┘
// * forEach: throwing is the only way to "break" — not recommended
// ** These work but require Promise.all() or special patterns

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. for...of — best when you need break/continue or async/await
let firstOver5: number | undefined;
for (const n of data) {
  if (n > 5) {
    firstOver5 = n;
    break; // early exit — impossible with map/filter/forEach
  }
}
console.log(firstOver5); // 6

// 2. forEach — for side effects only (logging, DOM updates)
data.forEach(n => console.log(n));
// Prints 1-10, returns undefined

// 3. map — when you want to TRANSFORM each element
const squares = data.map(n => n ** 2);
console.log(squares); // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

// 4. filter — when you want to SELECT elements
const bigNums = data.filter(n => n > 7);
console.log(bigNums); // [8, 9, 10]

// 5. reduce — when you want to AGGREGATE into a single value
const sum = data.reduce((a, b) => a + b, 0);
console.log(sum); // 55

// 6. find() — like filter but returns only the FIRST match
const found = data.find(n => n > 5);
console.log(found); // 6

// 7. some() / every() — boolean checks
console.log(data.some(n => n > 9));  // true
console.log(data.every(n => n > 0)); // true`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Performance benchmark (rough comparison)
const bigArray = Array.from({ length: 1_000_000 }, (_, i) => i);

console.time('for...of');
let sum1 = 0;
for (const n of bigArray) sum1 += n;
console.timeEnd('for...of');
// ~3-5ms

console.time('forEach');
let sum2 = 0;
bigArray.forEach(n => { sum2 += n; });
console.timeEnd('forEach');
// ~5-8ms

console.time('reduce');
const sum3 = bigArray.reduce((a, b) => a + b, 0);
console.timeEnd('reduce');
// ~5-8ms

// Takeaway: the performance difference is negligible for most applications.
// Choose based on readability and intent, not micro-optimization.`}</code></pre>

      {/* ============================================================ */}
      {/* 11. TypeScript */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_typescript}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_typescript }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 11a. Type narrowing with filter()
// Problem: filter doesn't narrow types by default
const mixed: (string | number | null)[] = ['hello', 42, null, 'world', null, 7];

// ❌ TypeScript still thinks result is (string | number | null)[]
const noNulls = mixed.filter(x => x !== null);

// ✅ Use a type predicate (type guard) to narrow the type
const strings = mixed.filter((x): x is string => typeof x === 'string');
// TypeScript knows: strings is string[]
console.log(strings); // ["hello", "world"]

const numbers = mixed.filter((x): x is number => typeof x === 'number');
// TypeScript knows: numbers is number[]
console.log(numbers); // [42, 7]

// Reusable type guard
function isNotNull<T>(value: T | null | undefined): value is T {
  return value != null;
}

const cleaned = mixed.filter(isNotNull);
// TypeScript knows: cleaned is (string | number)[]
console.log(cleaned); // ["hello", 42, "world", 7]`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 11b. Generic reduce with proper types
interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

const cart: CartItem[] = [
  { name: 'Laptop', price: 999, quantity: 1 },
  { name: 'Mouse', price: 29, quantity: 2 },
  { name: 'Cable', price: 15, quantity: 3 },
];

// TypeScript infers accumulator type from initial value
const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
console.log(totalPrice); // 1102

// Reduce to a different type — initial value determines type
interface Summary {
  itemCount: number;
  totalPrice: number;
  items: string[];
}

const summary = cart.reduce<Summary>(
  (acc, item) => ({
    itemCount: acc.itemCount + item.quantity,
    totalPrice: acc.totalPrice + item.price * item.quantity,
    items: [...acc.items, item.name],
  }),
  { itemCount: 0, totalPrice: 0, items: [] }
);

console.log(summary);
// Output: { itemCount: 6, totalPrice: 1102, items: ["Laptop", "Mouse", "Cable"] }`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// 11c. Generic map utility with TypeScript
function mapBy<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map(item => item[key]);
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'A', price: 10 },
  { id: 2, name: 'B', price: 20 },
];

const ids = mapBy(products, 'id');       // number[]
const names = mapBy(products, 'name');   // string[]
const prices = mapBy(products, 'price'); // number[]

console.log(ids);    // [1, 2]
console.log(names);  // ["A", "B"]
console.log(prices); // [10, 20]

// Generic groupBy with TypeScript
function groupBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const key = keyFn(item);
    (acc[key] ??= []).push(item);
    return acc;
  }, {});
}

const byPrice = groupBy(products, p => p.price >= 15 ? 'expensive' : 'cheap');
console.log(byPrice);
// Output: { cheap: [{ id: 1, name: 'A', price: 10 }], expensive: [{ id: 2, name: 'B', price: 20 }] }`}</code></pre>

      {/* ============================================================ */}
      {/* 12. Common Mistakes */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_mistakes}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_mistakes }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Mistake 1: Forgetting to return in map() with curly braces
const nums = [1, 2, 3];

// ❌ WRONG: curly braces without return → returns undefined
const bad = nums.map(n => { n * 2 });
console.log(bad);
// Output: [undefined, undefined, undefined]

// ✅ FIX: add return statement
const good1 = nums.map(n => { return n * 2; });
console.log(good1); // [2, 4, 6]

// ✅ FIX: use concise arrow body (no curly braces)
const good2 = nums.map(n => n * 2);
console.log(good2); // [2, 4, 6]

// ⚠️ Returning an object literal? Wrap in parentheses!
// ❌ WRONG: JS thinks {} is a block
const bad2 = nums.map(n => { value: n });
// Output: [undefined, undefined, undefined]

// ✅ FIX: parentheses around the object
const good3 = nums.map(n => ({ value: n }));
console.log(good3); // [{ value: 1 }, { value: 2 }, { value: 3 }]`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Mistake 2: Missing initial value in reduce()

// ❌ Works but dangerous with empty arrays
const sum = [1, 2, 3].reduce((a, b) => a + b); // 6 — OK
// [].reduce((a, b) => a + b); // TypeError!

// ❌ Wrong type: accumulator starts as first element (number), not object
const items = [{ price: 10 }, { price: 20 }];
// items.reduce((acc, item) => acc + item.price); // NaN!
// Because acc starts as { price: 10 }, and { price: 10 } + 20 = NaN

// ✅ FIX: always provide initial value
const total = items.reduce((acc, item) => acc + item.price, 0);
console.log(total); // 30`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Mistake 3: Accidentally mutating objects inside map/filter

const users = [
  { name: 'Alice', score: 85 },
  { name: 'Bob', score: 92 },
];

// ❌ WRONG: mutating the original objects!
const bad = users.map(user => {
  user.grade = user.score >= 90 ? 'A' : 'B';  // mutates original!
  return user;
});
console.log(users[0]); // { name: 'Alice', score: 85, grade: 'B' } — MUTATED!

// ✅ FIX: create new objects with spread
const users2 = [
  { name: 'Alice', score: 85 },
  { name: 'Bob', score: 92 },
];
const good = users2.map(user => ({
  ...user,
  grade: user.score >= 90 ? 'A' : 'B',
}));
console.log(users2[0]); // { name: 'Alice', score: 85 } — unchanged
console.log(good[0]);   // { name: 'Alice', score: 85, grade: 'B' }`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Mistake 4: Using map() when you don't need the result

// ❌ WRONG: using map just for side effects, wasting memory
const data = [1, 2, 3, 4, 5];
data.map(n => console.log(n)); // creates an unused array of undefineds

// ✅ FIX: use forEach for side effects
data.forEach(n => console.log(n));

// Mistake 5: Chaining filter().map() when you can use reduce()
const nums2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ❌ Creates an intermediate array (wastes memory for large arrays)
const result1 = nums2
  .filter(n => n % 2 === 0)
  .map(n => n ** 2);

// ✅ Single pass with reduce (better for very large arrays)
const result2 = nums2.reduce<number[]>((acc, n) => {
  if (n % 2 === 0) acc.push(n ** 2);
  return acc;
}, []);

console.log(result1); // [4, 16, 36, 64, 100]
console.log(result2); // [4, 16, 36, 64, 100]
// Note: filter+map is more readable; use reduce only if performance matters`}</code></pre>

      {/* ============================================================ */}
      {/* 13. FAQ */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_faq}</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq1_q}</h3>
      <p>{t.faq1_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq2_q}</h3>
      <p>{t.faq2_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq3_q}</h3>
      <p>{t.faq3_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq4_q}</h3>
      <p>{t.faq4_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq5_q}</h3>
      <p>{t.faq5_a}</p>

      {/* ============================================================ */}
      {/* CONCLUSION */}
      {/* ============================================================ */}
      <p className="mt-8">{t.p_conclusion}</p>
      <p>
        <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_json_bottom}
        </Link>
      </p>
      <p>
        <Link href={`/${lang}/tools/js-html-formatter`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_js_bottom}
        </Link>
      </p>
    </article>
  );
}
