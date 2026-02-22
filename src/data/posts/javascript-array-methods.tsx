export default function JavascriptArrayMethods() {
  return (
    <>
      <h2>JavaScript Array Methods: The Complete Cheat Sheet</h2>
      <p>
        JavaScript arrays come with dozens of built-in methods that make data manipulation concise and expressive.
        Whether you are filtering, transforming, searching, or sorting data, there is a method for it. This
        comprehensive cheat sheet covers <strong>every commonly used array method</strong> with clear examples,
        return values, and use cases so you can write cleaner, more efficient JavaScript.
      </p>

      <h2>Creating Arrays</h2>
      <p>
        Before diving into methods, here are the common ways to create arrays in JavaScript:
      </p>
      <pre><code>{`// Array literal (most common)
const fruits = ["apple", "banana", "cherry"];

// Array constructor
const empty = new Array(3);       // [empty x 3]
const filled = new Array(1, 2, 3); // [1, 2, 3]

// Array.from — convert iterables and array-like objects
const chars = Array.from("hello");           // ["h", "e", "l", "l", "o"]
const range = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]

// Array.of — create from arguments (no special behavior for single number)
const single = Array.of(3); // [3] — not [empty x 3]

// Spread operator
const copy = [...fruits];
const merged = [...fruits, ...["date", "elderberry"]];`}</code></pre>

      <h2>Transformation Methods (Return New Array)</h2>
      <p>
        These methods create and return a new array without modifying the original. They are the foundation of
        functional programming patterns in JavaScript.
      </p>

      <h3>map() - Transform Every Element</h3>
      <p>
        Creates a new array by applying a function to each element. The original array is not modified.
      </p>
      <pre><code>{`const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
];
const names = users.map(user => user.name);
// ["Alice", "Bob"]

// With index parameter
const indexed = numbers.map((n, i) => \`\${i}: \${n}\`);
// ["0: 1", "1: 2", "2: 3", "3: 4", "4: 5"]`}</code></pre>

      <h3>filter() - Select Matching Elements</h3>
      <p>
        Creates a new array with only the elements that pass a test function. Elements where the callback
        returns <code>true</code> are included.
      </p>
      <pre><code>{`const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = numbers.filter(n => n % 2 === 0);
// [2, 4, 6, 8, 10]

const adults = users.filter(user => user.age >= 18);

// Remove falsy values
const mixed = [0, "hello", "", null, 42, undefined, "world"];
const truthy = mixed.filter(Boolean);
// ["hello", 42, "world"]

// Remove duplicates (simple values)
const unique = numbers.filter((v, i, arr) => arr.indexOf(v) === i);`}</code></pre>

      <h3>reduce() - Accumulate into Single Value</h3>
      <p>
        Reduces an array to a single value by applying a function against an accumulator and each element.
        This is the most versatile array method.
      </p>
      <pre><code>{`const numbers = [1, 2, 3, 4, 5];

// Sum
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// Max value
const max = numbers.reduce((a, b) => Math.max(a, b));
// 5

// Group by property
const people = [
  { name: "Alice", dept: "Engineering" },
  { name: "Bob", dept: "Marketing" },
  { name: "Carol", dept: "Engineering" },
];

const grouped = people.reduce((acc, person) => {
  const key = person.dept;
  acc[key] = acc[key] || [];
  acc[key].push(person);
  return acc;
}, {} as Record<string, typeof people>);
// { Engineering: [...], Marketing: [...] }

// Count occurrences
const words = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const counts = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
// { apple: 3, banana: 2, cherry: 1 }

// Flatten nested arrays (prefer flat() for simple cases)
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, arr) => [...acc, ...arr], [] as number[]);
// [1, 2, 3, 4, 5, 6]`}</code></pre>

      <h3>flatMap() - Map Then Flatten</h3>
      <p>
        Combines <code>map()</code> and <code>flat(1)</code> in a single step. Useful when your mapping function
        returns arrays that should be flattened into the result.
      </p>
      <pre><code>{`const sentences = ["Hello world", "How are you"];

const words = sentences.flatMap(s => s.split(" "));
// ["Hello", "world", "How", "are", "you"]

// Filter and transform in one step
const nums = [1, 2, 3, 4, 5];
const evenDoubled = nums.flatMap(n => n % 2 === 0 ? [n * 2] : []);
// [4, 8]`}</code></pre>

      <h3>flat() - Flatten Nested Arrays</h3>
      <pre><code>{`const nested = [1, [2, 3], [4, [5, 6]]];

nested.flat();    // [1, 2, 3, 4, [5, 6]]  — depth 1
nested.flat(2);   // [1, 2, 3, 4, 5, 6]    — depth 2
nested.flat(Infinity); // flattens all levels`}</code></pre>

      <h3>slice() - Extract a Portion</h3>
      <pre><code>{`const arr = [1, 2, 3, 4, 5];

arr.slice(1, 3);   // [2, 3]     — from index 1 to 3 (exclusive)
arr.slice(2);      // [3, 4, 5]  — from index 2 to end
arr.slice(-2);     // [4, 5]     — last 2 elements
arr.slice();       // [1, 2, 3, 4, 5] — shallow copy`}</code></pre>

      <h3>concat() - Merge Arrays</h3>
      <pre><code>{`const a = [1, 2];
const b = [3, 4];
const c = [5, 6];

a.concat(b);        // [1, 2, 3, 4]
a.concat(b, c);     // [1, 2, 3, 4, 5, 6]
[...a, ...b, ...c]; // [1, 2, 3, 4, 5, 6] — spread alternative`}</code></pre>

      <h2>Searching Methods</h2>
      <p>
        These methods help you find elements or check whether certain conditions are met within an array.
      </p>

      <h3>find() and findIndex()</h3>
      <pre><code>{`const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Carol", role: "user" },
];

// find — returns first matching element or undefined
const admin = users.find(u => u.role === "admin");
// { id: 1, name: "Alice", role: "admin" }

// findIndex — returns index of first match or -1
const index = users.findIndex(u => u.name === "Bob");
// 1

// findLast and findLastIndex (ES2023)
const lastUser = users.findLast(u => u.role === "user");
// { id: 3, name: "Carol", role: "user" }`}</code></pre>

      <h3>includes(), indexOf(), lastIndexOf()</h3>
      <pre><code>{`const fruits = ["apple", "banana", "cherry", "banana"];

fruits.includes("banana");   // true
fruits.includes("grape");    // false

fruits.indexOf("banana");    // 1 (first occurrence)
fruits.lastIndexOf("banana"); // 3 (last occurrence)
fruits.indexOf("grape");     // -1 (not found)`}</code></pre>

      <h3>some() and every()</h3>
      <pre><code>{`const numbers = [1, 2, 3, 4, 5];

// some — at least one passes the test
numbers.some(n => n > 4);   // true
numbers.some(n => n > 10);  // false

// every — all must pass the test
numbers.every(n => n > 0);  // true
numbers.every(n => n > 3);  // false

// Practical: validate form fields
const fields = [
  { name: "email", value: "test@test.com", valid: true },
  { name: "name", value: "", valid: false },
];
const allValid = fields.every(f => f.valid); // false`}</code></pre>

      <h2>Mutation Methods (Modify Original Array)</h2>
      <p>
        These methods change the original array in place. Use them when you intentionally want to modify the
        existing array rather than create a new one.
      </p>

      <h3>push(), pop(), unshift(), shift()</h3>
      <pre><code>{`const arr = [1, 2, 3];

// Add to end — returns new length
arr.push(4);       // arr = [1, 2, 3, 4], returns 4
arr.push(5, 6);    // arr = [1, 2, 3, 4, 5, 6], returns 6

// Remove from end — returns removed element
arr.pop();         // arr = [1, 2, 3, 4, 5], returns 6

// Add to beginning — returns new length
arr.unshift(0);    // arr = [0, 1, 2, 3, 4, 5], returns 6

// Remove from beginning — returns removed element
arr.shift();       // arr = [1, 2, 3, 4, 5], returns 0`}</code></pre>

      <h3>splice() - Add, Remove, or Replace</h3>
      <pre><code>{`const arr = [1, 2, 3, 4, 5];

// Remove 2 elements starting at index 1
arr.splice(1, 2);  // returns [2, 3], arr = [1, 4, 5]

// Insert at index 1 without removing
arr.splice(1, 0, 2, 3); // arr = [1, 2, 3, 4, 5]

// Replace 1 element at index 2
arr.splice(2, 1, 99);   // returns [3], arr = [1, 2, 99, 4, 5]`}</code></pre>

      <h3>sort() and reverse()</h3>
      <pre><code>{`// sort modifies in place — returns the same array
const nums = [3, 1, 4, 1, 5, 9, 2, 6];

// Default sort converts to strings (careful with numbers!)
nums.sort();               // [1, 1, 2, 3, 4, 5, 6, 9]

// Numeric sort
nums.sort((a, b) => a - b); // ascending
nums.sort((a, b) => b - a); // descending

// Sort objects by property
const users = [
  { name: "Charlie", age: 35 },
  { name: "Alice", age: 28 },
  { name: "Bob", age: 32 },
];
users.sort((a, b) => a.age - b.age);
// Sorted by age ascending

// reverse — reverses in place
const arr = [1, 2, 3];
arr.reverse(); // [3, 2, 1]

// Non-mutating alternatives (ES2023)
const sorted = nums.toSorted((a, b) => a - b);
const reversed = arr.toReversed();
const spliced = arr.toSpliced(1, 1, 99);`}</code></pre>

      <h3>fill() and copyWithin()</h3>
      <pre><code>{`// fill — fill with a value
const arr = new Array(5).fill(0);  // [0, 0, 0, 0, 0]
arr.fill(7, 2, 4);                  // [0, 0, 7, 7, 0]

// copyWithin — copy part of array to another location
const arr2 = [1, 2, 3, 4, 5];
arr2.copyWithin(0, 3);  // [4, 5, 3, 4, 5] — copy from index 3 to index 0`}</code></pre>

      <h2>Iteration Methods</h2>
      <pre><code>{`const fruits = ["apple", "banana", "cherry"];

// forEach — execute for each element (returns undefined)
fruits.forEach((fruit, index) => {
  console.log(\`\${index}: \${fruit}\`);
});

// for...of — modern loop with break/continue support
for (const fruit of fruits) {
  if (fruit === "banana") continue;
  console.log(fruit);
}

// entries(), keys(), values()
for (const [index, fruit] of fruits.entries()) {
  console.log(\`\${index}: \${fruit}\`);
}

for (const key of fruits.keys()) {
  console.log(key); // 0, 1, 2
}

for (const value of fruits.values()) {
  console.log(value); // "apple", "banana", "cherry"
}`}</code></pre>

      <h2>Conversion Methods</h2>
      <pre><code>{`const arr = [1, 2, 3, 4, 5];

// join — convert to string with separator
arr.join(", ");  // "1, 2, 3, 4, 5"
arr.join("-");   // "1-2-3-4-5"
arr.join("");    // "12345"

// toString
arr.toString();  // "1,2,3,4,5"

// Array.isArray — check if value is an array
Array.isArray([1, 2, 3]);    // true
Array.isArray("hello");      // false
Array.isArray({ length: 3 }); // false`}</code></pre>

      <h2>ES2023+ New Array Methods</h2>
      <p>
        Recent JavaScript versions added several non-mutating alternatives to existing mutation methods.
        These return new arrays instead of modifying the original.
      </p>
      <pre><code>{`const original = [3, 1, 4, 1, 5];

// toSorted — non-mutating sort
const sorted = original.toSorted((a, b) => a - b);
// sorted = [1, 1, 3, 4, 5], original unchanged

// toReversed — non-mutating reverse
const reversed = original.toReversed();
// reversed = [5, 1, 4, 1, 3], original unchanged

// toSpliced — non-mutating splice
const spliced = original.toSpliced(1, 2, 9, 8);
// spliced = [3, 9, 8, 1, 5], original unchanged

// with — non-mutating index assignment
const updated = original.with(2, 99);
// updated = [3, 1, 99, 1, 5], original unchanged

// Object.groupBy (ES2024) — group by callback result
const items = [
  { name: "Apple", type: "fruit" },
  { name: "Carrot", type: "vegetable" },
  { name: "Banana", type: "fruit" },
];

const groups = Object.groupBy(items, item => item.type);
// { fruit: [{...}, {...}], vegetable: [{...}] }`}</code></pre>

      <h2>Quick Reference Table</h2>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Mutates?</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>map()</code></td><td>New array</td><td>No</td><td>Transform each element</td></tr>
          <tr><td><code>filter()</code></td><td>New array</td><td>No</td><td>Select matching elements</td></tr>
          <tr><td><code>reduce()</code></td><td>Any value</td><td>No</td><td>Accumulate to single value</td></tr>
          <tr><td><code>find()</code></td><td>Element or undefined</td><td>No</td><td>First match</td></tr>
          <tr><td><code>findIndex()</code></td><td>Number</td><td>No</td><td>Index of first match</td></tr>
          <tr><td><code>some()</code></td><td>Boolean</td><td>No</td><td>At least one passes</td></tr>
          <tr><td><code>every()</code></td><td>Boolean</td><td>No</td><td>All pass</td></tr>
          <tr><td><code>includes()</code></td><td>Boolean</td><td>No</td><td>Contains value</td></tr>
          <tr><td><code>flat()</code></td><td>New array</td><td>No</td><td>Flatten nested arrays</td></tr>
          <tr><td><code>flatMap()</code></td><td>New array</td><td>No</td><td>Map then flatten</td></tr>
          <tr><td><code>slice()</code></td><td>New array</td><td>No</td><td>Extract portion</td></tr>
          <tr><td><code>concat()</code></td><td>New array</td><td>No</td><td>Merge arrays</td></tr>
          <tr><td><code>sort()</code></td><td>Same array</td><td>Yes</td><td>Sort in place</td></tr>
          <tr><td><code>reverse()</code></td><td>Same array</td><td>Yes</td><td>Reverse in place</td></tr>
          <tr><td><code>push()</code></td><td>New length</td><td>Yes</td><td>Add to end</td></tr>
          <tr><td><code>pop()</code></td><td>Removed element</td><td>Yes</td><td>Remove from end</td></tr>
          <tr><td><code>splice()</code></td><td>Removed elements</td><td>Yes</td><td>Add/remove/replace</td></tr>
          <tr><td><code>forEach()</code></td><td>undefined</td><td>No</td><td>Side effects loop</td></tr>
        </tbody>
      </table>

      <h2>Frequently Asked Questions</h2>
      <h3>What is the difference between map() and forEach()?</h3>
      <p>
        <code>map()</code> returns a new array with the transformed values, while <code>forEach()</code> returns
        <code>undefined</code> and is used only for side effects like logging or DOM manipulation. If you need
        the result, use <code>map()</code>. If you just need to do something with each element, use <code>forEach()</code>.
      </p>

      <h3>When should I use reduce() vs a for loop?</h3>
      <p>
        Use <code>reduce()</code> when the operation naturally accumulates into a single value (sum, grouping,
        counting). Use a <code>for</code> loop when the logic is complex, involves multiple accumulators, or
        needs early termination. Readability should be the deciding factor.
      </p>

      <h3>How do I remove duplicates from an array?</h3>
      <p>
        For primitive values, use <code>[...new Set(array)]</code>. For objects, use <code>filter()</code> with a
        <code>Set</code> tracking seen keys, or use <code>reduce()</code> to build a map and extract values.
      </p>

      <h3>What is the performance of find() vs filter()?</h3>
      <p>
        <code>find()</code> stops at the first match and returns immediately, making it O(1) in the best case.
        <code>filter()</code> always iterates through the entire array. When you only need one result, always
        prefer <code>find()</code>.
      </p>

      <h3>Are toSorted() and toReversed() supported in all browsers?</h3>
      <p>
        These ES2023 methods are supported in Chrome 110+, Firefox 115+, Safari 16+, and Node.js 20+. For older
        environments, use <code>[...arr].sort()</code> and <code>[...arr].reverse()</code> as non-mutating alternatives.
      </p>
    </>
  );
}
