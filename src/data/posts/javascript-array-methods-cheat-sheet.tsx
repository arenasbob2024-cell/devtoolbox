'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'JavaScript arrays come with <strong>30+ built-in methods</strong> that every developer uses daily. Yet it is easy to confuse which methods mutate the original array and which return a new one, or to forget the subtle differences between <code>find</code>, <code>filter</code>, and <code>some</code>. This <strong>JavaScript array methods cheat sheet</strong> is a comprehensive, bookmark-worthy reference covering every method with runnable code examples, input/output, Big-O complexity, and the latest ES2023+ additions.',
    link_tool: 'Format your JavaScript with our JS/HTML Formatter \u2192',
    link_tool2: 'Validate JSON output with our JSON Formatter \u2192',

    h2_1: '1. Mutating vs Non-Mutating Methods',
    p_1: 'The most common source of bugs: some array methods <strong>modify the original array in place</strong> (mutating), while others <strong>return a new array</strong> (non-mutating). ES2023 introduced immutable alternatives (<code>toSorted</code>, <code>toReversed</code>, <code>toSpliced</code>, <code>with</code>) for every mutating method.',

    h2_2: '2. Adding and Removing Elements',
    p_2: 'The core methods for modifying array contents: <code>push</code>, <code>pop</code>, <code>shift</code>, <code>unshift</code>, and the versatile <code>splice</code>. All of these <strong>mutate</strong> the original array.',

    h2_3: '3. Searching Arrays',
    p_3: 'JavaScript provides six methods to search arrays. Choose based on whether you need the <strong>element</strong>, the <strong>index</strong>, or a <strong>boolean</strong> answer.',

    h2_4: '4. Transforming with map and flatMap',
    p_4: '<code>map()</code> creates a new array by applying a function to every element. <code>flatMap()</code> maps and then flattens one level deep \u2014 perfect for one-to-many transformations. Neither mutates the original array.',

    h2_5: '5. Filtering Arrays',
    p_5: '<code>filter()</code> returns a new array with only the elements that pass the test function. It is one of the most commonly chained methods in JavaScript.',

    h2_6: '6. Reducing Arrays',
    p_6: '<code>reduce()</code> is the most versatile array method \u2014 it can implement any other array method. It processes each element and accumulates a single result. <code>reduceRight()</code> works from right to left.',

    h2_7: '7. Sorting Arrays',
    p_7: '<code>sort()</code> sorts the array <strong>in place</strong> and returns it. Without a comparator, elements are converted to strings and sorted by UTF-16 code unit values. ES2023 added <code>toSorted()</code> as the non-mutating alternative.',

    h2_8: '8. Iterating: forEach vs for...of vs map',
    p_8: 'Three common ways to iterate over arrays, each with different use cases. Choosing the right one affects readability, performance, and the ability to use <code>break</code>/<code>continue</code>.',

    h2_9: '9. Creating Arrays',
    p_9: 'Multiple ways to create and initialize arrays in JavaScript, from literals to factory methods.',

    h2_10: '10. New ES2023+ Methods',
    p_10: 'ES2023 (ES14) introduced six new array methods that provide <strong>immutable alternatives</strong> to existing mutating methods. These are supported in all modern browsers and Node.js 20+.',

    h2_11: '11. Chaining Patterns',
    p_11: 'Method chaining is where JavaScript arrays truly shine. Here are real-world patterns that combine multiple methods into clean, readable pipelines.',

    h2_12: '12. Performance Comparison (Big-O)',
    p_12: 'Understanding time complexity helps you choose the right method for large datasets. Below is a reference table for every major array method.',

    h2_faq: '13. Frequently Asked Questions',
    faq1_q: 'What is the difference between map() and forEach() in JavaScript?',
    faq1_a: 'map() returns a new array with the results of calling a function on every element, while forEach() returns undefined and is used for side effects only. Use map() when you need a transformed array; use forEach() when you just need to execute code for each element (e.g., logging, DOM updates). map() is chainable, forEach() is not.',
    faq2_q: 'Which JavaScript array methods mutate the original array?',
    faq2_a: 'The mutating methods are: push(), pop(), shift(), unshift(), splice(), sort(), reverse(), fill(), and copyWithin(). ES2023 introduced non-mutating alternatives: toSorted(), toReversed(), toSpliced(), and with(). Methods like map(), filter(), reduce(), slice(), concat(), flat(), and flatMap() always return new arrays without modifying the original.',
    faq3_q: 'How do I remove duplicates from a JavaScript array?',
    faq3_a: 'The most concise way is [...new Set(array)] or Array.from(new Set(array)). For objects, use filter with a Set tracking a unique key: array.filter((item, i, arr) => arr.findIndex(x => x.id === item.id) === i). For large arrays, the Set approach is O(n) while the findIndex approach is O(n^2).',
    faq4_q: 'What is the difference between find() and filter() in JavaScript?',
    faq4_a: 'find() returns the first element that matches the condition and stops searching (short-circuits), returning undefined if nothing matches. filter() returns a new array of ALL elements that match, returning an empty array if nothing matches. Use find() when you need a single result; use filter() when you need all matches.',
    faq5_q: 'How does reduce() work in JavaScript?',
    faq5_a: 'reduce() takes a callback function and an optional initial value. The callback receives four arguments: accumulator (the running total), currentValue, currentIndex, and the array. It iterates through each element, passing the return value of each callback as the accumulator to the next iteration. Common uses include summing numbers, flattening arrays, grouping objects, and building objects from arrays.',

    p_conclusion: 'Bookmark this cheat sheet for quick reference. For working with JavaScript and JSON data, try our tools below.',
    link_tool_bottom: 'Try the JS/HTML Formatter \u2192',
    link_tool_bottom2: 'Try the JSON Formatter \u2192',
  },
  zh: {
    intro: 'JavaScript 数组自带 <strong>30 多个内置方法</strong>，是每个开发者每天都会用到的。但很容易混淆哪些方法会修改原数组、哪些返回新数组，也容易忘记 <code>find</code>、<code>filter</code> 和 <code>some</code> 之间的微妙区别。这份 <strong>JavaScript 数组方法速查表</strong>是一份全面的、值得收藏的参考，涵盖每个方法的可运行代码示例、输入/输出、Big-O 复杂度以及最新的 ES2023+ 新增方法。',
    link_tool: '使用我们的 JS/HTML 格式化工具格式化你的 JavaScript \u2192',
    link_tool2: '使用我们的 JSON 格式化工具验证 JSON 输出 \u2192',

    h2_1: '1. 变异方法 vs 非变异方法',
    p_1: '最常见的 bug 来源：一些数组方法<strong>会就地修改原数组</strong>（变异方法），而另一些<strong>返回新数组</strong>（非变异方法）。ES2023 为每个变异方法引入了不可变替代方案（<code>toSorted</code>、<code>toReversed</code>、<code>toSpliced</code>、<code>with</code>）。',

    h2_2: '2. 添加和删除元素',
    p_2: '修改数组内容的核心方法：<code>push</code>、<code>pop</code>、<code>shift</code>、<code>unshift</code> 和万能的 <code>splice</code>。这些方法都会<strong>修改</strong>原数组。',

    h2_3: '3. 搜索数组',
    p_3: 'JavaScript 提供了六种搜索数组的方法。根据你需要的是<strong>元素本身</strong>、<strong>索引</strong>还是<strong>布尔值</strong>来选择。',

    h2_4: '4. 使用 map 和 flatMap 转换',
    p_4: '<code>map()</code> 通过对每个元素应用函数来创建新数组。<code>flatMap()</code> 先映射再展平一层——非常适合一对多转换。两者都不会修改原数组。',

    h2_5: '5. 过滤数组',
    p_5: '<code>filter()</code> 返回一个新数组，只包含通过测试函数的元素。它是 JavaScript 中最常被链式调用的方法之一。',

    h2_6: '6. 归并数组',
    p_6: '<code>reduce()</code> 是最通用的数组方法——它可以实现任何其他数组方法。它处理每个元素并累积一个结果。<code>reduceRight()</code> 从右到左工作。',

    h2_7: '7. 排序数组',
    p_7: '<code>sort()</code> <strong>就地</strong>排序数组并返回它。没有比较器时，元素会被转换为字符串并按 UTF-16 码点值排序。ES2023 添加了 <code>toSorted()</code> 作为非变异替代方案。',

    h2_8: '8. 迭代：forEach vs for...of vs map',
    p_8: '三种常见的数组迭代方式，各有不同的使用场景。选择正确的方式会影响可读性、性能以及使用 <code>break</code>/<code>continue</code> 的能力。',

    h2_9: '9. 创建数组',
    p_9: 'JavaScript 中创建和初始化数组的多种方式，从字面量到工厂方法。',

    h2_10: '10. ES2023+ 新方法',
    p_10: 'ES2023（ES14）引入了六个新的数组方法，为现有的变异方法提供<strong>不可变替代方案</strong>。这些方法在所有现代浏览器和 Node.js 20+ 中都已支持。',

    h2_11: '11. 链式调用模式',
    p_11: '方法链式调用是 JavaScript 数组真正闪光的地方。以下是将多个方法组合成干净、可读管道的实际模式。',

    h2_12: '12. 性能对比（Big-O）',
    p_12: '理解时间复杂度有助于为大数据集选择正确的方法。以下是每个主要数组方法的参考表。',

    h2_faq: '13. 常见问题',
    faq1_q: 'JavaScript 中 map() 和 forEach() 有什么区别？',
    faq1_a: 'map() 返回一个新数组，其中包含对每个元素调用函数的结果；而 forEach() 返回 undefined，仅用于副作用操作。当你需要转换后的数组时使用 map()；当你只需要对每个元素执行代码（如日志记录、DOM 更新）时使用 forEach()。map() 可以链式调用，forEach() 不行。',
    faq2_q: '哪些 JavaScript 数组方法会修改原数组？',
    faq2_a: '变异方法有：push()、pop()、shift()、unshift()、splice()、sort()、reverse()、fill() 和 copyWithin()。ES2023 引入了非变异替代方案：toSorted()、toReversed()、toSpliced() 和 with()。map()、filter()、reduce()、slice()、concat()、flat() 和 flatMap() 等方法始终返回新数组，不会修改原数组。',
    faq3_q: '如何去除 JavaScript 数组中的重复元素？',
    faq3_a: '最简洁的方式是 [...new Set(array)] 或 Array.from(new Set(array))。对于对象数组，使用 filter 配合 Set 跟踪唯一键：array.filter((item, i, arr) => arr.findIndex(x => x.id === item.id) === i)。对于大数组，Set 方法是 O(n)，而 findIndex 方法是 O(n^2)。',
    faq4_q: 'JavaScript 中 find() 和 filter() 有什么区别？',
    faq4_a: 'find() 返回第一个匹配条件的元素并停止搜索（短路），如果没有匹配则返回 undefined。filter() 返回所有匹配元素的新数组，如果没有匹配则返回空数组。当你需要单个结果时使用 find()；当你需要所有匹配项时使用 filter()。',
    faq5_q: 'JavaScript 中 reduce() 是如何工作的？',
    faq5_a: 'reduce() 接收一个回调函数和一个可选的初始值。回调接收四个参数：accumulator（累加器）、currentValue（当前值）、currentIndex（当前索引）和数组本身。它遍历每个元素，将每次回调的返回值作为下一次迭代的累加器。常见用途包括求和、展平数组、分组对象以及从数组构建对象。',

    p_conclusion: '收藏此速查表以便快速参考。要处理 JavaScript 和 JSON 数据，请试试下面的工具。',
    link_tool_bottom: '试试 JS/HTML 格式化工具 \u2192',
    link_tool_bottom2: '试试 JSON 格式化工具 \u2192',
  },
};

export default function JavaScriptArrayMethodsCheatSheet({ lang }: { lang: string }) {
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
        <Link href={`/${lang}/tools/js-html-formatter`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_tool}
        </Link>
      </p>
      <p>
        <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_tool2}
        </Link>
      </p>

      {/* ============================================================ */}
      {/* 1. Mutating vs Non-Mutating */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_1}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_1 }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// ========== MUTATING METHODS (modify original array) ==========
// push, pop, shift, unshift, splice, sort, reverse, fill, copyWithin

const arr = [1, 2, 3];
arr.push(4);          // arr is now [1, 2, 3, 4]
arr.reverse();        // arr is now [4, 3, 2, 1]
arr.sort();           // arr is now [1, 2, 3, 4]
console.log(arr);     // [1, 2, 3, 4] — original is modified!

// ========== NON-MUTATING METHODS (return new array) ==========
// map, filter, reduce, slice, concat, flat, flatMap,
// toSorted, toReversed, toSpliced, with (ES2023+)

const nums = [3, 1, 2];
const sorted = nums.toSorted();    // [1, 2, 3] — new array
console.log(nums);                 // [3, 1, 2] — original unchanged!

const doubled = nums.map(n => n * 2);  // [6, 2, 4]
console.log(nums);                      // [3, 1, 2] — still unchanged`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Quick reference table:
// ┌────────────────────┬─────────────────────────────────────────────┐
// │ Mutating           │ Non-Mutating Equivalent                    │
// ├────────────────────┼─────────────────────────────────────────────┤
// │ sort()             │ toSorted()          (ES2023)               │
// │ reverse()          │ toReversed()        (ES2023)               │
// │ splice()           │ toSpliced()         (ES2023)               │
// │ arr[i] = value     │ with(index, value)  (ES2023)               │
// │ push/pop           │ concat / slice(0,-1)                       │
// │ shift/unshift      │ slice(1) / [item, ...arr]                  │
// │ fill()             │ Array.from({length}, () => value)          │
// └────────────────────┴─────────────────────────────────────────────┘`}</code></pre>

      {/* ============================================================ */}
      {/* 2. Adding/Removing */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_2}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_2 }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// push() — add to END, returns new length
const fruits = ['apple', 'banana'];
const len = fruits.push('cherry', 'date');
console.log(fruits); // ['apple', 'banana', 'cherry', 'date']
console.log(len);    // 4

// pop() — remove from END, returns removed element
const last = fruits.pop();
console.log(last);   // 'date'
console.log(fruits); // ['apple', 'banana', 'cherry']

// unshift() — add to START, returns new length
fruits.unshift('avocado');
console.log(fruits); // ['avocado', 'apple', 'banana', 'cherry']

// shift() — remove from START, returns removed element
const first = fruits.shift();
console.log(first);  // 'avocado'
console.log(fruits); // ['apple', 'banana', 'cherry']`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// splice(start, deleteCount, ...items) — the Swiss Army knife
// Returns an array of removed elements

const arr = [1, 2, 3, 4, 5];

// Delete 2 elements starting at index 1
const removed = arr.splice(1, 2);
console.log(removed); // [2, 3]
console.log(arr);     // [1, 4, 5]

// Insert without deleting (deleteCount = 0)
arr.splice(1, 0, 'a', 'b');
console.log(arr);     // [1, 'a', 'b', 4, 5]

// Replace: delete 1 element and insert 2
arr.splice(2, 1, 'x', 'y');
console.log(arr);     // [1, 'a', 'x', 'y', 4, 5]

// Negative index: count from end
const arr2 = [1, 2, 3, 4, 5];
arr2.splice(-2, 1);   // remove element at index 3 (5-2)
console.log(arr2);    // [1, 2, 3, 5]

// Delete everything from index 2 onward
const arr3 = [1, 2, 3, 4, 5];
arr3.splice(2);
console.log(arr3);    // [1, 2]`}</code></pre>

      {/* ============================================================ */}
      {/* 3. Searching */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_3}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_3 }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`const users = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'Diana', age: 28 },
];

// find() — returns FIRST matching element (or undefined)
const bob = users.find(u => u.name === 'Bob');
console.log(bob); // { id: 2, name: 'Bob', age: 25 }

// findIndex() — returns INDEX of first match (or -1)
const idx = users.findIndex(u => u.age > 30);
console.log(idx); // 2 (Charlie)

// indexOf() — for primitives, strict equality (===)
const colors = ['red', 'green', 'blue', 'green'];
console.log(colors.indexOf('green'));      // 1 (first occurrence)
console.log(colors.indexOf('green', 2));   // 3 (search from index 2)
console.log(colors.indexOf('purple'));     // -1 (not found)

// includes() — returns boolean
console.log(colors.includes('blue'));  // true
console.log(colors.includes('pink'));  // false

// some() — returns true if ANY element passes the test
const hasAdult = users.some(u => u.age >= 30);
console.log(hasAdult); // true

// every() — returns true if ALL elements pass the test
const allAdults = users.every(u => u.age >= 18);
console.log(allAdults); // true
const allOver30 = users.every(u => u.age > 30);
console.log(allOver30); // false`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// findLast() and findLastIndex() — ES2023, search from the END
const nums = [1, 5, 3, 8, 2, 7];

const lastOver4 = nums.findLast(n => n > 4);
console.log(lastOver4); // 7 (last element > 4)

const lastIdx = nums.findLastIndex(n => n > 4);
console.log(lastIdx);   // 5 (index of 7)

// Comparison: find vs findLast
console.log(nums.find(n => n > 4));     // 5 (first match)
console.log(nums.findLast(n => n > 4)); // 7 (last match)

// lastIndexOf() — for primitives, search from end
const letters = ['a', 'b', 'c', 'b', 'a'];
console.log(letters.lastIndexOf('b')); // 3
console.log(letters.lastIndexOf('b', 2)); // 1 (search up to index 2)`}</code></pre>

      {/* ============================================================ */}
      {/* 4. Transforming — map, flatMap */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_4}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_4 }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// map() — transform each element, returns new array
const nums = [1, 2, 3, 4, 5];

const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const strings = nums.map(n => \`Item \${n}\`);
console.log(strings); // ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

// map with index
const indexed = nums.map((n, i) => ({ index: i, value: n }));
console.log(indexed);
// [{ index: 0, value: 1 }, { index: 1, value: 2 }, ...]

// Extract a property from objects
const users = [
  { name: 'Alice', score: 90 },
  { name: 'Bob', score: 85 },
  { name: 'Charlie', score: 92 },
];
const names = users.map(u => u.name);
console.log(names); // ['Alice', 'Bob', 'Charlie']

// Parse strings to numbers
const strs = ['1', '2', '3'];
const parsed = strs.map(Number);
console.log(parsed); // [1, 2, 3]
// ⚠️ Caution: ['1','2','3'].map(parseInt) gives [1, NaN, NaN]
// because parseInt receives (value, index) as (string, radix)`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// flatMap() — map + flatten one level (great for 1-to-many)
const sentences = ['Hello World', 'Foo Bar Baz'];
const words = sentences.flatMap(s => s.split(' '));
console.log(words); // ['Hello', 'World', 'Foo', 'Bar', 'Baz']

// vs map + flat:
const wordsAlt = sentences.map(s => s.split(' ')).flat();
console.log(wordsAlt); // same result, but flatMap is more efficient

// Filter and map in one pass
const nums2 = [1, 2, 3, 4, 5, 6];
const evenDoubled = nums2.flatMap(n => n % 2 === 0 ? [n * 2] : []);
console.log(evenDoubled); // [4, 8, 12]

// Duplicate elements conditionally
const items = ['a', 'b', 'c'];
const duplicated = items.flatMap(x => [x, x]);
console.log(duplicated); // ['a', 'a', 'b', 'b', 'c', 'c']

// Expand nested tags
const posts = [
  { title: 'Post 1', tags: ['js', 'react'] },
  { title: 'Post 2', tags: ['css', 'html'] },
];
const allTags = posts.flatMap(p => p.tags);
console.log(allTags); // ['js', 'react', 'css', 'html']`}</code></pre>

      {/* ============================================================ */}
      {/* 5. Filtering */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_5}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_5 }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// filter() — returns new array with elements that pass the test
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

const greaterThan5 = nums.filter(n => n > 5);
console.log(greaterThan5); // [6, 7, 8, 9, 10]

// Filter objects by property
const products = [
  { name: 'Laptop', price: 999, inStock: true },
  { name: 'Phone', price: 699, inStock: false },
  { name: 'Tablet', price: 499, inStock: true },
  { name: 'Watch', price: 299, inStock: true },
];

const available = products.filter(p => p.inStock);
console.log(available.map(p => p.name));
// ['Laptop', 'Tablet', 'Watch']

const affordable = products.filter(p => p.price < 500 && p.inStock);
console.log(affordable);
// [{ name: 'Tablet', price: 499, inStock: true },
//  { name: 'Watch', price: 299, inStock: true }]

// Remove falsy values (null, undefined, 0, '', false, NaN)
const mixed = [0, 1, '', 'hello', null, undefined, false, true, NaN];
const truthy = mixed.filter(Boolean);
console.log(truthy); // [1, 'hello', true]

// Remove duplicates using filter + indexOf
const withDupes = [1, 2, 3, 2, 1, 4, 3, 5];
const unique = withDupes.filter((val, idx, arr) => arr.indexOf(val) === idx);
console.log(unique); // [1, 2, 3, 4, 5]`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Chaining filter with other methods
const orders = [
  { id: 1, total: 150, status: 'shipped' },
  { id: 2, total: 50, status: 'pending' },
  { id: 3, total: 300, status: 'shipped' },
  { id: 4, total: 75, status: 'cancelled' },
  { id: 5, total: 200, status: 'shipped' },
];

// Get total revenue from shipped orders over $100
const revenue = orders
  .filter(o => o.status === 'shipped')
  .filter(o => o.total > 100)
  .reduce((sum, o) => sum + o.total, 0);
console.log(revenue); // 650

// Get sorted names of shipped orders
const shippedIds = orders
  .filter(o => o.status === 'shipped')
  .map(o => o.id)
  .sort((a, b) => a - b);
console.log(shippedIds); // [1, 3, 5]`}</code></pre>

      {/* ============================================================ */}
      {/* 6. Reducing */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_6}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_6 }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// reduce(callback, initialValue)
// callback: (accumulator, currentValue, currentIndex, array) => newAccumulator

// ---- Sum ----
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// ---- Max ----
const max = nums.reduce((acc, n) => Math.max(acc, n), -Infinity);
console.log(max); // 5

// ---- Flatten nested arrays ----
const nested = [[1, 2], [3, 4], [5, [6, 7]]];
const flat = nested.reduce((acc, val) => acc.concat(val), []);
console.log(flat); // [1, 2, 3, 4, 5, [6, 7]]
// Note: for deep flattening, use .flat(Infinity)

// ---- Count occurrences ----
const words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'];
const counts = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
console.log(counts);
// { apple: 3, banana: 2, cherry: 1 }`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// ---- Group by property ----
const people = [
  { name: 'Alice', dept: 'Engineering' },
  { name: 'Bob', dept: 'Marketing' },
  { name: 'Charlie', dept: 'Engineering' },
  { name: 'Diana', dept: 'Marketing' },
  { name: 'Eve', dept: 'Design' },
];

const grouped = people.reduce((acc, person) => {
  const key = person.dept;
  if (!acc[key]) acc[key] = [];
  acc[key].push(person.name);
  return acc;
}, {});
console.log(grouped);
// {
//   Engineering: ['Alice', 'Charlie'],
//   Marketing: ['Bob', 'Diana'],
//   Design: ['Eve']
// }

// Modern alternative: Object.groupBy() (ES2024)
// const grouped = Object.groupBy(people, p => p.dept);

// ---- Build object from entries ----
const pairs = [['name', 'Alice'], ['age', 30], ['city', 'NYC']];
const obj = pairs.reduce((acc, [key, val]) => {
  acc[key] = val;
  return acc;
}, {});
console.log(obj); // { name: 'Alice', age: 30, city: 'NYC' }
// Modern alternative: Object.fromEntries(pairs)

// ---- Pipeline / compose functions ----
const pipeline = [
  (x) => x + 1,
  (x) => x * 2,
  (x) => x - 3,
];
const result = pipeline.reduce((val, fn) => fn(val), 5);
console.log(result); // ((5 + 1) * 2) - 3 = 9

// ---- reduceRight: process from right to left ----
const letters = ['a', 'b', 'c', 'd'];
const reversed = letters.reduceRight((acc, letter) => acc + letter, '');
console.log(reversed); // 'dcba'`}</code></pre>

      {/* ============================================================ */}
      {/* 7. Sorting */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_7}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_7 }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// ⚠️ Default sort converts to strings!
const nums = [10, 9, 2, 21, 3];
nums.sort();
console.log(nums); // [10, 2, 21, 3, 9] — WRONG! String comparison

// ✅ Numeric sort with comparator
const nums2 = [10, 9, 2, 21, 3];
nums2.sort((a, b) => a - b);       // ascending
console.log(nums2); // [2, 3, 9, 10, 21]

nums2.sort((a, b) => b - a);       // descending
console.log(nums2); // [21, 10, 9, 3, 2]

// Sort objects by property
const users = [
  { name: 'Charlie', age: 35 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
];

users.sort((a, b) => a.age - b.age);
console.log(users.map(u => u.name)); // ['Alice', 'Bob', 'Charlie']

// Sort by string property
users.sort((a, b) => a.name.localeCompare(b.name));
console.log(users.map(u => u.name)); // ['Alice', 'Bob', 'Charlie']`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// toSorted() — ES2023, non-mutating sort
const original = [3, 1, 4, 1, 5];
const sorted = original.toSorted((a, b) => a - b);
console.log(sorted);   // [1, 1, 3, 4, 5]
console.log(original); // [3, 1, 4, 1, 5] — unchanged!

// Locale-aware sorting with localeCompare
const cities = ['Zürich', 'Amsterdam', 'Ångström', 'Berlin'];
cities.sort((a, b) => a.localeCompare(b, 'de'));
console.log(cities); // ['Amsterdam', 'Ångström', 'Berlin', 'Zürich']

// Sort with multiple criteria
const students = [
  { name: 'Alice', grade: 'A', score: 95 },
  { name: 'Bob', grade: 'A', score: 90 },
  { name: 'Charlie', grade: 'B', score: 85 },
  { name: 'Diana', grade: 'A', score: 95 },
];

students.sort((a, b) => {
  // First by grade (ascending)
  if (a.grade !== b.grade) return a.grade.localeCompare(b.grade);
  // Then by score (descending)
  if (a.score !== b.score) return b.score - a.score;
  // Then by name (ascending)
  return a.name.localeCompare(b.name);
});
console.log(students.map(s => s.name));
// ['Alice', 'Diana', 'Bob', 'Charlie']

// Stable sort: equal elements keep original order (guaranteed since ES2019)
const items = [
  { name: 'A', priority: 1 },
  { name: 'B', priority: 2 },
  { name: 'C', priority: 1 },
];
items.sort((a, b) => a.priority - b.priority);
// A and C both have priority 1; A stays before C (stable)
console.log(items.map(i => i.name)); // ['A', 'C', 'B']`}</code></pre>

      {/* ============================================================ */}
      {/* 8. Iterating */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_8}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_8 }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`const fruits = ['apple', 'banana', 'cherry'];

// ---- forEach: for side effects, no return value ----
fruits.forEach((fruit, index) => {
  console.log(\`\${index}: \${fruit}\`);
});
// 0: apple
// 1: banana
// 2: cherry
// ⚠️ Cannot use break/continue, returns undefined

// ---- for...of: supports break/continue, cleaner syntax ----
for (const fruit of fruits) {
  if (fruit === 'banana') continue;  // skip banana
  console.log(fruit);
}
// apple
// cherry

// Need index with for...of? Use entries()
for (const [index, fruit] of fruits.entries()) {
  console.log(\`\${index}: \${fruit}\`);
}

// ---- map: when you need a new array ----
const upper = fruits.map(f => f.toUpperCase());
console.log(upper); // ['APPLE', 'BANANA', 'CHERRY']

// ---- Comparison summary ----
// ┌──────────────┬─────────────┬───────────────┬──────────────────┐
// │ Feature      │ forEach     │ for...of      │ map              │
// ├──────────────┼─────────────┼───────────────┼──────────────────┤
// │ Returns      │ undefined   │ N/A           │ new Array        │
// │ break/cont   │ ✗           │ ✓             │ ✗                │
// │ Chainable    │ ✗           │ ✗             │ ✓                │
// │ async/await  │ ✗ (tricky)  │ ✓             │ ✗ (use for...of) │
// │ Performance  │ Medium      │ Fast          │ Medium           │
// │ Use case     │ Side effects│ General loop  │ Transform array  │
// └──────────────┴─────────────┴───────────────┴──────────────────┘`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// ⚠️ forEach does NOT work well with async/await
const urls = ['/api/1', '/api/2', '/api/3'];

// ❌ BAD: forEach fires all fetches in parallel, does not await
urls.forEach(async (url) => {
  const res = await fetch(url);  // Not actually awaited sequentially!
  console.log(res.status);
});

// ✅ GOOD: for...of with await for sequential execution
for (const url of urls) {
  const res = await fetch(url);
  console.log(res.status);  // Each request waits for the previous
}

// ✅ GOOD: Promise.all for parallel execution
const results = await Promise.all(
  urls.map(url => fetch(url).then(r => r.json()))
);
console.log(results);`}</code></pre>

      {/* ============================================================ */}
      {/* 9. Creating Arrays */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_9}</h2>
      <p>{t.p_9}</p>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Array literal (most common)
const arr = [1, 2, 3];

// Array.from() — create from array-like or iterable
const fromString = Array.from('hello');
console.log(fromString); // ['h', 'e', 'l', 'l', 'o']

const fromSet = Array.from(new Set([1, 2, 2, 3]));
console.log(fromSet); // [1, 2, 3]

// Array.from with mapping function (second argument)
const squares = Array.from({ length: 5 }, (_, i) => (i + 1) ** 2);
console.log(squares); // [1, 4, 9, 16, 25]

// Generate range: 0 to 9
const range = Array.from({ length: 10 }, (_, i) => i);
console.log(range); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// Array.of() — creates array from arguments (vs Array constructor)
const a = Array.of(5);      // [5] — single element
const b = Array(5);          // [empty × 5] — 5 empty slots!
console.log(a); // [5]
console.log(b); // [empty × 5]

// fill() — fill all or part of array with a value (mutating)
const zeros = new Array(5).fill(0);
console.log(zeros); // [0, 0, 0, 0, 0]

// ⚠️ fill with objects shares the SAME reference
const bad = new Array(3).fill([]);
bad[0].push('oops');
console.log(bad); // [['oops'], ['oops'], ['oops']] — all same array!

// ✅ Use Array.from for unique objects
const good = Array.from({ length: 3 }, () => []);
good[0].push('ok');
console.log(good); // [['ok'], [], []] — independent arrays

// Spread operator — shallow copy
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] — unchanged
console.log(copy);     // [1, 2, 3, 4]

// structuredClone — deep copy (handles nested objects)
const deep = [{ a: 1 }, { b: [2, 3] }];
const deepCopy = structuredClone(deep);
deepCopy[1].b.push(4);
console.log(deep[1].b);     // [2, 3] — unchanged
console.log(deepCopy[1].b); // [2, 3, 4]`}</code></pre>

      {/* ============================================================ */}
      {/* 10. New ES2023+ Methods */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_10}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_10 }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// toSorted() — non-mutating sort
const nums = [3, 1, 4, 1, 5];
const sorted = nums.toSorted((a, b) => a - b);
console.log(sorted); // [1, 1, 3, 4, 5]
console.log(nums);   // [3, 1, 4, 1, 5] — unchanged

// toReversed() — non-mutating reverse
const arr = [1, 2, 3, 4, 5];
const reversed = arr.toReversed();
console.log(reversed); // [5, 4, 3, 2, 1]
console.log(arr);      // [1, 2, 3, 4, 5] — unchanged

// toSpliced() — non-mutating splice
const colors = ['red', 'green', 'blue'];
const newColors = colors.toSpliced(1, 1, 'yellow', 'purple');
console.log(newColors); // ['red', 'yellow', 'purple', 'blue']
console.log(colors);    // ['red', 'green', 'blue'] — unchanged

// with() — non-mutating index assignment
const letters = ['a', 'b', 'c', 'd'];
const updated = letters.with(2, 'X');
console.log(updated);  // ['a', 'b', 'X', 'd']
console.log(letters);  // ['a', 'b', 'c', 'd'] — unchanged

// with() supports negative indices
const last = letters.with(-1, 'Z');
console.log(last); // ['a', 'b', 'c', 'Z']`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// findLast() — find from the end
const nums = [1, 2, 3, 4, 5, 6];
const lastEven = nums.findLast(n => n % 2 === 0);
console.log(lastEven); // 6

// findLastIndex() — find index from the end
const lastEvenIdx = nums.findLastIndex(n => n % 2 === 0);
console.log(lastEvenIdx); // 5

// Real-world: find last error in log entries
const logs = [
  { level: 'info', msg: 'Started' },
  { level: 'error', msg: 'Connection failed' },
  { level: 'info', msg: 'Retrying' },
  { level: 'error', msg: 'Timeout' },
  { level: 'info', msg: 'Connected' },
];

const lastError = logs.findLast(log => log.level === 'error');
console.log(lastError); // { level: 'error', msg: 'Timeout' }

// Chaining ES2023 methods (fully immutable pipeline)
const scores = [85, 92, 78, 95, 88, 70];
const topThree = scores
  .toSorted((a, b) => b - a)   // sort descending (immutable)
  .toSpliced(3);                // keep only first 3 (immutable)
console.log(topThree); // [95, 92, 88]
console.log(scores);   // [85, 92, 78, 95, 88, 70] — unchanged`}</code></pre>

      {/* ============================================================ */}
      {/* 11. Chaining Patterns */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_11}</h2>
      <p>{t.p_11}</p>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// ---- Extract, transform, aggregate ----
const transactions = [
  { id: 1, type: 'sale', amount: 100, currency: 'USD' },
  { id: 2, type: 'refund', amount: 50, currency: 'USD' },
  { id: 3, type: 'sale', amount: 200, currency: 'EUR' },
  { id: 4, type: 'sale', amount: 150, currency: 'USD' },
  { id: 5, type: 'refund', amount: 30, currency: 'EUR' },
];

// Total USD sales revenue
const usdRevenue = transactions
  .filter(t => t.type === 'sale' && t.currency === 'USD')
  .map(t => t.amount)
  .reduce((sum, amount) => sum + amount, 0);
console.log(usdRevenue); // 250

// ---- Deduplicate, sort, format ----
const rawTags = ['React', 'vue', 'REACT', 'Angular', 'vue', 'Svelte'];
const cleanTags = [...new Set(rawTags.map(t => t.toLowerCase()))]
  .sort()
  .map(t => t.charAt(0).toUpperCase() + t.slice(1));
console.log(cleanTags); // ['Angular', 'React', 'Svelte', 'Vue']`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// ---- Nested data extraction ----
const departments = [
  {
    name: 'Engineering',
    teams: [
      { name: 'Frontend', members: ['Alice', 'Bob'] },
      { name: 'Backend', members: ['Charlie', 'Diana'] },
    ],
  },
  {
    name: 'Design',
    teams: [
      { name: 'UX', members: ['Eve', 'Frank'] },
    ],
  },
];

// Get all member names across all departments and teams
const allMembers = departments
  .flatMap(dept => dept.teams)
  .flatMap(team => team.members)
  .sort();
console.log(allMembers);
// ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']

// ---- Paginate results ----
function paginate(array, page, pageSize) {
  return array.slice((page - 1) * pageSize, page * pageSize);
}

const items = Array.from({ length: 50 }, (_, i) => \`Item \${i + 1}\`);
console.log(paginate(items, 1, 10)); // ['Item 1', ..., 'Item 10']
console.log(paginate(items, 3, 10)); // ['Item 21', ..., 'Item 30']

// ---- Top N by score ----
const players = [
  { name: 'Alice', score: 850 },
  { name: 'Bob', score: 920 },
  { name: 'Charlie', score: 780 },
  { name: 'Diana', score: 950 },
  { name: 'Eve', score: 890 },
];

const topThree = players
  .toSorted((a, b) => b.score - a.score)
  .slice(0, 3)
  .map((p, i) => \`\${i + 1}. \${p.name} (\${p.score})\`);
console.log(topThree);
// ['1. Diana (950)', '2. Bob (920)', '3. Eve (890)']`}</code></pre>

      {/* ============================================================ */}
      {/* 12. Performance Comparison (Big-O) */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_12}</h2>
      <p>{t.p_12}</p>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Performance reference table (n = array length)
//
// ┌──────────────────────┬──────────────┬──────────────────────────────────────┐
// │ Method               │ Time         │ Notes                                │
// ├──────────────────────┼──────────────┼──────────────────────────────────────┤
// │ push()               │ O(1) amort.  │ Occasional resize → O(n)             │
// │ pop()                │ O(1)         │ Fastest removal                      │
// │ unshift()            │ O(n)         │ Must shift all elements right        │
// │ shift()              │ O(n)         │ Must shift all elements left         │
// │ splice(i, k)         │ O(n)         │ Must shift elements after index i    │
// │ concat()             │ O(n + m)     │ n = arr1.length, m = arr2.length     │
// │ slice()              │ O(k)         │ k = number of elements copied        │
// │ indexOf() / includes │ O(n)         │ Linear scan, worst case full array   │
// │ find() / findIndex() │ O(n)         │ Stops at first match (best O(1))     │
// │ some() / every()     │ O(n)         │ Short-circuits on match/failure      │
// │ map()                │ O(n)         │ Visits every element                 │
// │ filter()             │ O(n)         │ Visits every element                 │
// │ reduce()             │ O(n)         │ Visits every element                 │
// │ forEach()            │ O(n)         │ Visits every element                 │
// │ flat(depth)          │ O(n)         │ n = total elements after flattening  │
// │ flatMap()            │ O(n)         │ map + flat(1) in one pass            │
// │ sort()               │ O(n log n)   │ TimSort in V8 (stable)               │
// │ reverse()            │ O(n)         │ In-place swap                        │
// │ fill()               │ O(n)         │ Fills every position                 │
// │ Array.from()         │ O(n)         │ Iterates source + optional map       │
// │ [...spread]          │ O(n)         │ Shallow copy                         │
// │ structuredClone()    │ O(n)         │ Deep copy, handles circular refs     │
// │ toSorted()           │ O(n log n)   │ Copy + sort                          │
// │ toReversed()         │ O(n)         │ Copy + reverse                       │
// │ toSpliced()          │ O(n)         │ Copy + splice                        │
// │ with()               │ O(n)         │ Copy + single index change           │
// └──────────────────────┴──────────────┴──────────────────────────────────────┘
//
// Tips:
// • For frequent add/remove at both ends → use a Deque or linked list
// • For frequent lookups by value → use a Set (O(1) has/add/delete)
// • For frequent lookups by key → use a Map (O(1) get/set/delete)
// • Avoid nested find/filter inside loops → O(n²), use Map for O(n)`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Benchmark: Set vs indexOf for duplicate removal
function benchmarkDedup() {
  const arr = Array.from({ length: 100000 }, () =>
    Math.floor(Math.random() * 10000)
  );

  // Method 1: filter + indexOf — O(n²)
  console.time('filter+indexOf');
  const unique1 = arr.filter((v, i, a) => a.indexOf(v) === i);
  console.timeEnd('filter+indexOf');  // ~200-500ms

  // Method 2: Set — O(n)
  console.time('Set');
  const unique2 = [...new Set(arr)];
  console.timeEnd('Set');  // ~5-10ms

  console.log(unique1.length, unique2.length); // same result
}

// Benchmark: push vs unshift on large arrays
function benchmarkPushVsUnshift() {
  const n = 100000;

  console.time('push');
  const arr1 = [];
  for (let i = 0; i < n; i++) arr1.push(i);
  console.timeEnd('push');  // ~5ms

  console.time('unshift');
  const arr2 = [];
  for (let i = 0; i < n; i++) arr2.unshift(i);
  console.timeEnd('unshift');  // ~1000ms+ (O(n²) total!)
}`}</code></pre>

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
        <Link href={`/${lang}/tools/js-html-formatter`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_tool_bottom}
        </Link>
      </p>
      <p>
        <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_tool_bottom2}
        </Link>
      </p>
    </article>
  );
}
