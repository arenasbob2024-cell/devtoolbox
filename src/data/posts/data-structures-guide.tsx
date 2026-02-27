'use client';

const translations = {
  en: {
    title: 'Data Structures and Algorithms: The Complete Developer Guide with Code Examples',
    description:
      'Master arrays, linked lists, trees, graphs, hash tables, heaps, stacks, queues, Big O notation, sorting, and searching algorithms with practical code examples in JavaScript/TypeScript and Python.',
  },
  zh: {
    title: '数据结构与算法：开发者完全指南（含代码示例）',
    description:
      '掌握数组、链表、树、图、哈希表、堆、栈、队列、Big O 表示法、排序与搜索算法，包含 JavaScript/TypeScript 和 Python 的实际代码示例。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between an array and a linked list?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Arrays store elements contiguously in memory, providing O(1) random access by index but O(n) insertion/deletion in the middle. Linked lists store elements as nodes with pointers, offering O(1) insertion/deletion at known positions but O(n) access since you must traverse from the head. Use arrays when you need fast lookups and linked lists when you need frequent insertions and deletions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Big O notation and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Big O notation describes the upper bound of an algorithm\'s time or space complexity as input size grows. It matters because it lets you predict how an algorithm scales — O(1) is constant time, O(log n) is logarithmic, O(n) is linear, O(n log n) is linearithmic, and O(n^2) is quadratic. Choosing the right algorithm can mean the difference between milliseconds and hours for large datasets.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use a hash table versus a binary search tree?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hash tables (Map/Object in JS, dict in Python) provide average O(1) lookup, insert, and delete, making them ideal for fast key-value access. Binary search trees maintain sorted order and support O(log n) range queries, finding min/max, and in-order traversal. Use hash tables for fast lookups when order does not matter, and BSTs when you need sorted data or range queries.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best sorting algorithm for general use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For general-purpose sorting, merge sort and quicksort are the most common choices with O(n log n) average time complexity. Merge sort guarantees O(n log n) worst-case and is stable but uses O(n) extra space. Quicksort is typically faster in practice due to cache locality but has O(n^2) worst-case. Most language standard libraries use Timsort (a hybrid of merge sort and insertion sort) which is stable and optimized for real-world data.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do stacks and queues differ and when should I use each?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A stack follows LIFO (Last In, First Out) — the last element added is the first removed, like a stack of plates. A queue follows FIFO (First In, First Out) — the first element added is the first removed, like a line at a store. Use stacks for undo operations, expression parsing, DFS traversal, and function call management. Use queues for BFS traversal, task scheduling, and buffering.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a heap and how is it used in priority queues?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A heap is a complete binary tree where each parent node satisfies the heap property — in a min-heap, every parent is smaller than its children; in a max-heap, every parent is larger. Heaps are the standard implementation for priority queues, supporting O(log n) insert and O(log n) extract-min/max, with O(1) peek at the min/max element. They are used in Dijkstra\'s algorithm, median finding, and task scheduling.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between BFS and DFS for graph traversal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BFS (Breadth-First Search) explores all neighbors at the current depth before moving deeper, using a queue. It finds the shortest path in unweighted graphs. DFS (Depth-First Search) explores as far as possible along each branch before backtracking, using a stack or recursion. DFS uses less memory for deep graphs and is useful for topological sorting, cycle detection, and finding connected components.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I choose the right data structure for my problem?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Consider these factors: (1) What operations do you need most — lookups, insertions, deletions, or ordered traversal? (2) What are the time complexity requirements? (3) How much memory can you use? For fast lookups use hash tables; for sorted data use BSTs or sorted arrays with binary search; for FIFO processing use queues; for LIFO use stacks; for priority-based processing use heaps; for relationships between entities use graphs.',
      },
    },
  ],
};

export default function DataStructuresGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    marginBottom: '24px',
  };

  const thStyle: React.CSSProperties = {
    padding: '10px 14px',
    textAlign: 'left',
    background: '#1e293b',
    color: '#f1f5f9',
    fontWeight: '600',
  };

  const tdStyle: React.CSSProperties = {
    padding: '9px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
    verticalAlign: 'top',
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', marginBottom: '16px' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: '1.7', margin: '0' }}>
          {t.description}
        </p>
      </header>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          {isZh ? 'TL;DR — 数据结构与算法 60 秒速览' : 'TL;DR — Data Structures & Algorithms in 60 Seconds'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.9' }}>
          <li>{isZh ? '数组 O(1) 随机访问，链表 O(1) 插入/删除——根据操作频率选择' : 'Arrays give O(1) random access, linked lists give O(1) insert/delete — choose based on your dominant operation'}</li>
          <li>{isZh ? '哈希表是最常用的数据结构：平均 O(1) 查找、插入、删除' : 'Hash tables are the most-used data structure: average O(1) lookup, insert, and delete'}</li>
          <li>{isZh ? '栈(LIFO)用于撤销/DFS/解析，队列(FIFO)用于BFS/调度/缓冲' : 'Stacks (LIFO) for undo/DFS/parsing, queues (FIFO) for BFS/scheduling/buffering'}</li>
          <li>{isZh ? '二叉搜索树保持有序数据，支持 O(log n) 范围查询' : 'Binary search trees maintain sorted data with O(log n) range queries'}</li>
          <li>{isZh ? '堆实现优先队列：O(log n) 插入，O(1) 查看最小/最大值' : 'Heaps implement priority queues: O(log n) insert, O(1) peek at min/max'}</li>
          <li>{isZh ? '图用邻接表或邻接矩阵表示，BFS 求最短路径，DFS 求连通分量' : 'Graphs use adjacency lists or matrices; BFS finds shortest paths, DFS finds connected components'}</li>
          <li>{isZh ? '掌握 Big O：O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)' : 'Master Big O: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)'}</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <strong style={{ fontSize: '1rem', color: '#334155', display: 'block', marginBottom: '10px' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.9' }}>
          <li>{isZh ? '没有"最好的"数据结构——只有最适合当前问题的数据结构' : 'There is no "best" data structure — only the best one for your specific problem'}</li>
          <li>{isZh ? 'Big O 分析帮助你在代码运行前预测性能瓶颈' : 'Big O analysis lets you predict performance bottlenecks before your code runs'}</li>
          <li>{isZh ? '排序是许多算法的基础：排序后可用二分搜索将 O(n) 降至 O(log n)' : 'Sorting unlocks faster algorithms: a sorted array enables binary search, turning O(n) into O(log n)'}</li>
          <li>{isZh ? '递归和迭代通常可以互相转换——栈是连接两者的桥梁' : 'Recursion and iteration are often interchangeable — a stack bridges the two'}</li>
          <li>{isZh ? '面试和生产代码都需要数据结构知识：选对结构，代码更快更简洁' : 'Data structure knowledge matters for interviews and production code: the right choice makes code faster and cleaner'}</li>
          <li>{isZh ? '空间和时间通常是权衡关系——哈希表用空间换时间就是经典例子' : 'Space and time are often a trade-off — hash tables trading space for speed is a classic example'}</li>
        </ul>
      </div>

      {/* Section 1: Big O Notation */}
      <h2 style={h2Style}>
        {isZh ? '1. Big O 表示法：算法复杂度分析' : '1. Big O Notation: Analyzing Algorithm Complexity'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Big O 表示法描述算法的时间或空间复杂度如何随输入规模增长。它关注的是增长趋势，忽略常数因子和低阶项。理解 Big O 是选择正确数据结构和算法的基础。'
          : 'Big O notation describes how an algorithm\'s time or space requirements grow as the input size increases. It focuses on the growth rate, ignoring constant factors and lower-order terms. Understanding Big O is the foundation for choosing the right data structures and algorithms.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '复杂度' : 'Complexity'}</th>
            <th style={thStyle}>{isZh ? '名称' : 'Name'}</th>
            <th style={thStyle}>{isZh ? '示例' : 'Example'}</th>
            <th style={thStyle}>n=1000</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>O(1)</td><td style={tdStyle}>{isZh ? '常数' : 'Constant'}</td><td style={tdStyle}>{isZh ? '数组索引访问' : 'Array index access'}</td><td style={tdStyle}>1</td></tr>
          <tr><td style={tdStyle}>O(log n)</td><td style={tdStyle}>{isZh ? '对数' : 'Logarithmic'}</td><td style={tdStyle}>{isZh ? '二分搜索' : 'Binary search'}</td><td style={tdStyle}>~10</td></tr>
          <tr><td style={tdStyle}>O(n)</td><td style={tdStyle}>{isZh ? '线性' : 'Linear'}</td><td style={tdStyle}>{isZh ? '遍历数组' : 'Array traversal'}</td><td style={tdStyle}>1,000</td></tr>
          <tr><td style={tdStyle}>O(n log n)</td><td style={tdStyle}>{isZh ? '线性对数' : 'Linearithmic'}</td><td style={tdStyle}>{isZh ? '归并排序' : 'Merge sort'}</td><td style={tdStyle}>~10,000</td></tr>
          <tr><td style={tdStyle}>O(n²)</td><td style={tdStyle}>{isZh ? '平方' : 'Quadratic'}</td><td style={tdStyle}>{isZh ? '冒泡排序' : 'Bubble sort'}</td><td style={tdStyle}>1,000,000</td></tr>
          <tr><td style={tdStyle}>O(2ⁿ)</td><td style={tdStyle}>{isZh ? '指数' : 'Exponential'}</td><td style={tdStyle}>{isZh ? '递归斐波那契' : 'Recursive Fibonacci'}</td><td style={tdStyle}>{isZh ? '天文数字' : 'Astronomical'}</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? 'Big O 实际示例' : 'Big O in Practice'}</h3>
      <pre style={preStyle}><code>{
'// O(1) — Constant time: same speed regardless of input size\n' +
'function getFirst(arr: number[]): number {\n' +
'  return arr[0]; // always one operation\n' +
'}\n\n' +
'// O(log n) — Logarithmic: halves the search space each step\n' +
'function binarySearch(arr: number[], target: number): number {\n' +
'  let left = 0, right = arr.length - 1;\n' +
'  while (left <= right) {\n' +
'    const mid = Math.floor((left + right) / 2);\n' +
'    if (arr[mid] === target) return mid;\n' +
'    if (arr[mid] < target) left = mid + 1;\n' +
'    else right = mid - 1;\n' +
'  }\n' +
'  return -1;\n' +
'}\n\n' +
'// O(n) — Linear: visits every element once\n' +
'function findMax(arr: number[]): number {\n' +
'  let max = arr[0];\n' +
'  for (let i = 1; i < arr.length; i++) {\n' +
'    if (arr[i] > max) max = arr[i];\n' +
'  }\n' +
'  return max;\n' +
'}\n\n' +
'// O(n²) — Quadratic: nested loops over the same data\n' +
'function hasDuplicate(arr: number[]): boolean {\n' +
'  for (let i = 0; i < arr.length; i++) {\n' +
'    for (let j = i + 1; j < arr.length; j++) {\n' +
'      if (arr[i] === arr[j]) return true;\n' +
'    }\n' +
'  }\n' +
'  return false;\n' +
'}\n\n' +
'// O(n) with hash set — optimized duplicate check\n' +
'function hasDuplicateOptimized(arr: number[]): boolean {\n' +
'  const seen = new Set<number>();\n' +
'  for (const num of arr) {\n' +
'    if (seen.has(num)) return true;\n' +
'    seen.add(num);\n' +
'  }\n' +
'  return false;\n' +
'}'
      }</code></pre>

      {/* Section 2: Arrays */}
      <h2 style={h2Style}>
        {isZh ? '2. 数组：最基础的数据结构' : '2. Arrays: The Fundamental Data Structure'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '数组在连续内存中存储元素，提供 O(1) 的索引访问。它们是大多数编程语言中最常用的数据结构。JavaScript 的数组是动态的，Python 的 list 也是动态数组的实现。'
          : 'Arrays store elements contiguously in memory, providing O(1) index-based access. They are the most commonly used data structure in most programming languages. JavaScript arrays are dynamic, and Python lists are also implemented as dynamic arrays.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '操作' : 'Operation'}</th>
            <th style={thStyle}>{isZh ? '时间复杂度' : 'Time Complexity'}</th>
            <th style={thStyle}>{isZh ? '说明' : 'Notes'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '按索引访问' : 'Access by index'}</td><td style={tdStyle}>O(1)</td><td style={tdStyle}>{isZh ? '直接计算内存地址' : 'Direct memory address calculation'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '搜索（无序）' : 'Search (unsorted)'}</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>{isZh ? '线性扫描' : 'Linear scan'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '搜索（有序）' : 'Search (sorted)'}</td><td style={tdStyle}>O(log n)</td><td style={tdStyle}>{isZh ? '二分搜索' : 'Binary search'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '末尾插入' : 'Insert at end'}</td><td style={tdStyle}>{isZh ? '均摊 O(1)' : 'Amortized O(1)'}</td><td style={tdStyle}>{isZh ? '可能触发扩容' : 'May trigger resize'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '中间插入' : 'Insert at middle'}</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>{isZh ? '需要移动元素' : 'Elements must shift'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '删除' : 'Delete'}</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>{isZh ? '需要移动元素填补空位' : 'Elements shift to fill gap'}</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? '常用数组技巧' : 'Essential Array Techniques'}</h3>
      <pre style={preStyle}><code>{
'// Two-pointer technique — find pair that sums to target\n' +
'function twoSum(sorted: number[], target: number): [number, number] | null {\n' +
'  let left = 0, right = sorted.length - 1;\n' +
'  while (left < right) {\n' +
'    const sum = sorted[left] + sorted[right];\n' +
'    if (sum === target) return [left, right];\n' +
'    if (sum < target) left++;\n' +
'    else right--;\n' +
'  }\n' +
'  return null;\n' +
'}\n\n' +
'// Sliding window — max sum subarray of size k\n' +
'function maxSumSubarray(arr: number[], k: number): number {\n' +
'  let windowSum = 0;\n' +
'  for (let i = 0; i < k; i++) windowSum += arr[i];\n' +
'  let maxSum = windowSum;\n' +
'  for (let i = k; i < arr.length; i++) {\n' +
'    windowSum += arr[i] - arr[i - k]; // slide the window\n' +
'    maxSum = Math.max(maxSum, windowSum);\n' +
'  }\n' +
'  return maxSum;\n' +
'}\n\n' +
'// Prefix sum — range sum queries in O(1)\n' +
'function buildPrefixSum(arr: number[]): number[] {\n' +
'  const prefix = [0];\n' +
'  for (let i = 0; i < arr.length; i++) {\n' +
'    prefix.push(prefix[i] + arr[i]);\n' +
'  }\n' +
'  return prefix;\n' +
'}\n' +
'function rangeSum(prefix: number[], left: number, right: number): number {\n' +
'  return prefix[right + 1] - prefix[left];\n' +
'}\n\n' +
'// Example usage:\n' +
'const arr = [1, 3, 5, 2, 8, 4];\n' +
'const prefix = buildPrefixSum(arr);\n' +
'console.log(rangeSum(prefix, 1, 3)); // 3+5+2 = 10'
      }</code></pre>

      {/* Section 3: Linked Lists */}
      <h2 style={h2Style}>
        {isZh ? '3. 链表：动态数据的灵活存储' : '3. Linked Lists: Flexible Storage for Dynamic Data'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '链表由节点组成，每个节点包含数据和指向下一个节点的指针。单链表只能向前遍历，双链表可以双向遍历。链表的优势在于 O(1) 的插入和删除（已知位置），但访问需要 O(n) 遍历。'
          : 'A linked list consists of nodes, each containing data and a pointer to the next node. Singly linked lists traverse forward only; doubly linked lists traverse in both directions. Their strength is O(1) insertion and deletion at known positions, but access requires O(n) traversal.'}
      </p>

      <pre style={preStyle}><code>{
'// Singly Linked List implementation\n' +
'class ListNode<T> {\n' +
'  val: T;\n' +
'  next: ListNode<T> | null = null;\n' +
'  constructor(val: T) { this.val = val; }\n' +
'}\n\n' +
'class SinglyLinkedList<T> {\n' +
'  head: ListNode<T> | null = null;\n' +
'  size: number = 0;\n\n' +
'  // O(1) — prepend to head\n' +
'  prepend(val: T): void {\n' +
'    const node = new ListNode(val);\n' +
'    node.next = this.head;\n' +
'    this.head = node;\n' +
'    this.size++;\n' +
'  }\n\n' +
'  // O(n) — append to tail\n' +
'  append(val: T): void {\n' +
'    const node = new ListNode(val);\n' +
'    if (!this.head) { this.head = node; }\n' +
'    else {\n' +
'      let curr = this.head;\n' +
'      while (curr.next) curr = curr.next;\n' +
'      curr.next = node;\n' +
'    }\n' +
'    this.size++;\n' +
'  }\n\n' +
'  // O(n) — delete first occurrence\n' +
'  delete(val: T): boolean {\n' +
'    if (!this.head) return false;\n' +
'    if (this.head.val === val) {\n' +
'      this.head = this.head.next;\n' +
'      this.size--;\n' +
'      return true;\n' +
'    }\n' +
'    let curr = this.head;\n' +
'    while (curr.next) {\n' +
'      if (curr.next.val === val) {\n' +
'        curr.next = curr.next.next;\n' +
'        this.size--;\n' +
'        return true;\n' +
'      }\n' +
'      curr = curr.next;\n' +
'    }\n' +
'    return false;\n' +
'  }\n\n' +
'  // O(n) — convert to array for display\n' +
'  toArray(): T[] {\n' +
'    const result: T[] = [];\n' +
'    let curr = this.head;\n' +
'    while (curr) {\n' +
'      result.push(curr.val);\n' +
'      curr = curr.next;\n' +
'    }\n' +
'    return result;\n' +
'  }\n' +
'}\n\n' +
'// Classic interview problem: reverse a linked list\n' +
'function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {\n' +
'  let prev: ListNode<T> | null = null;\n' +
'  let curr = head;\n' +
'  while (curr) {\n' +
'    const next = curr.next;\n' +
'    curr.next = prev;\n' +
'    prev = curr;\n' +
'    curr = next;\n' +
'  }\n' +
'  return prev;\n' +
'}\n\n' +
'// Detect cycle with Floyd\'s algorithm (fast/slow pointers)\n' +
'function hasCycle<T>(head: ListNode<T> | null): boolean {\n' +
'  let slow = head, fast = head;\n' +
'  while (fast && fast.next) {\n' +
'    slow = slow!.next;\n' +
'    fast = fast.next.next;\n' +
'    if (slow === fast) return true;\n' +
'  }\n' +
'  return false;\n' +
'}'
      }</code></pre>

      {/* Section 4: Stacks and Queues */}
      <h2 style={h2Style}>
        {isZh ? '4. 栈与队列：受限但强大的线性结构' : '4. Stacks & Queues: Constrained but Powerful Linear Structures'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '栈和队列是带有访问限制的线性数据结构。栈遵循 LIFO（后进先出），队列遵循 FIFO（先进先出）。这些限制反而使它们在特定场景中极其高效和有用。'
          : 'Stacks and queues are linear data structures with access restrictions. Stacks follow LIFO (Last In, First Out), queues follow FIFO (First In, First Out). These constraints make them extremely efficient and useful for specific scenarios.'}
      </p>

      <h3 style={h3Style}>{isZh ? '栈的实现与应用' : 'Stack Implementation and Applications'}</h3>
      <pre style={preStyle}><code>{
'// Stack implementation\n' +
'class Stack<T> {\n' +
'  private items: T[] = [];\n\n' +
'  push(item: T): void { this.items.push(item); }     // O(1)\n' +
'  pop(): T | undefined { return this.items.pop(); }   // O(1)\n' +
'  peek(): T | undefined { return this.items[this.items.length - 1]; }\n' +
'  isEmpty(): boolean { return this.items.length === 0; }\n' +
'  get size(): number { return this.items.length; }\n' +
'}\n\n' +
'// Application: validate balanced parentheses\n' +
'function isValidParentheses(s: string): boolean {\n' +
'  const stack = new Stack<string>();\n' +
'  const pairs: Record<string, string> = {\n' +
'    ")": "(", "]": "[", "}": "{"\n' +
'  };\n' +
'  for (const char of s) {\n' +
'    if ("([{".includes(char)) {\n' +
'      stack.push(char);\n' +
'    } else if (pairs[char]) {\n' +
'      if (stack.isEmpty() || stack.pop() !== pairs[char]) {\n' +
'        return false;\n' +
'      }\n' +
'    }\n' +
'  }\n' +
'  return stack.isEmpty();\n' +
'}\n\n' +
'console.log(isValidParentheses("({[]})")); // true\n' +
'console.log(isValidParentheses("({[}])"));  // false\n\n' +
'// Application: evaluate Reverse Polish Notation (postfix)\n' +
'function evalRPN(tokens: string[]): number {\n' +
'  const stack = new Stack<number>();\n' +
'  for (const token of tokens) {\n' +
'    if ("+-*/".includes(token)) {\n' +
'      const b = stack.pop()!, a = stack.pop()!;\n' +
'      switch (token) {\n' +
'        case "+": stack.push(a + b); break;\n' +
'        case "-": stack.push(a - b); break;\n' +
'        case "*": stack.push(a * b); break;\n' +
'        case "/": stack.push(Math.trunc(a / b)); break;\n' +
'      }\n' +
'    } else {\n' +
'      stack.push(Number(token));\n' +
'    }\n' +
'  }\n' +
'  return stack.pop()!;\n' +
'}\n' +
'// "3 4 + 2 *" = (3 + 4) * 2 = 14\n' +
'console.log(evalRPN(["3", "4", "+", "2", "*"])); // 14'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? '队列的实现与应用' : 'Queue Implementation and Applications'}</h3>
      <pre style={preStyle}><code>{
'// Queue implementation (using linked list for O(1) dequeue)\n' +
'class Queue<T> {\n' +
'  private head: ListNode<T> | null = null;\n' +
'  private tail: ListNode<T> | null = null;\n' +
'  private _size = 0;\n\n' +
'  enqueue(val: T): void {\n' +
'    const node = new ListNode(val);\n' +
'    if (this.tail) { this.tail.next = node; }\n' +
'    else { this.head = node; }\n' +
'    this.tail = node;\n' +
'    this._size++;\n' +
'  }\n\n' +
'  dequeue(): T | undefined {\n' +
'    if (!this.head) return undefined;\n' +
'    const val = this.head.val;\n' +
'    this.head = this.head.next;\n' +
'    if (!this.head) this.tail = null;\n' +
'    this._size--;\n' +
'    return val;\n' +
'  }\n\n' +
'  peek(): T | undefined { return this.head?.val; }\n' +
'  isEmpty(): boolean { return this._size === 0; }\n' +
'  get size(): number { return this._size; }\n' +
'}\n\n' +
'// Application: recent counter (sliding window with queue)\n' +
'class RecentCounter {\n' +
'  private queue = new Queue<number>();\n\n' +
'  ping(t: number): number {\n' +
'    this.queue.enqueue(t);\n' +
'    while (this.queue.peek()! < t - 3000) {\n' +
'      this.queue.dequeue();\n' +
'    }\n' +
'    return this.queue.size;\n' +
'  }\n' +
'}'
      }</code></pre>

      {/* Section 5: Hash Tables */}
      <h2 style={h2Style}>
        {isZh ? '5. 哈希表：最实用的数据结构' : '5. Hash Tables: The Most Practical Data Structure'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '哈希表通过哈希函数将键映射到桶（数组索引），实现平均 O(1) 的查找、插入和删除。JavaScript 中的 Map/Object 和 Python 中的 dict 都是哈希表实现。冲突处理是哈希表设计的关键——常见方法有链地址法和开放地址法。'
          : 'Hash tables map keys to buckets (array indices) via a hash function, achieving average O(1) lookup, insert, and delete. JavaScript\'s Map/Object and Python\'s dict are hash table implementations. Collision handling is central to hash table design — common approaches include chaining and open addressing.'}
      </p>

      <pre style={preStyle}><code>{
'// Hash table implementation with chaining\n' +
'class HashTable<K, V> {\n' +
'  private buckets: Array<Array<[K, V]>>;\n' +
'  private count = 0;\n\n' +
'  constructor(private capacity = 16) {\n' +
'    this.buckets = new Array(capacity).fill(null).map(() => []);\n' +
'  }\n\n' +
'  private hash(key: K): number {\n' +
'    const str = String(key);\n' +
'    let hash = 0;\n' +
'    for (let i = 0; i < str.length; i++) {\n' +
'      hash = (hash * 31 + str.charCodeAt(i)) | 0;\n' +
'    }\n' +
'    return Math.abs(hash) % this.capacity;\n' +
'  }\n\n' +
'  set(key: K, value: V): void {\n' +
'    const idx = this.hash(key);\n' +
'    const bucket = this.buckets[idx];\n' +
'    const existing = bucket.findIndex(([k]) => k === key);\n' +
'    if (existing >= 0) {\n' +
'      bucket[existing] = [key, value]; // update\n' +
'    } else {\n' +
'      bucket.push([key, value]);\n' +
'      this.count++;\n' +
'      if (this.count / this.capacity > 0.75) this.resize();\n' +
'    }\n' +
'  }\n\n' +
'  get(key: K): V | undefined {\n' +
'    const idx = this.hash(key);\n' +
'    const pair = this.buckets[idx].find(([k]) => k === key);\n' +
'    return pair ? pair[1] : undefined;\n' +
'  }\n\n' +
'  delete(key: K): boolean {\n' +
'    const idx = this.hash(key);\n' +
'    const bucket = this.buckets[idx];\n' +
'    const i = bucket.findIndex(([k]) => k === key);\n' +
'    if (i === -1) return false;\n' +
'    bucket.splice(i, 1);\n' +
'    this.count--;\n' +
'    return true;\n' +
'  }\n\n' +
'  private resize(): void {\n' +
'    const old = this.buckets;\n' +
'    this.capacity *= 2;\n' +
'    this.buckets = new Array(this.capacity).fill(null).map(() => []);\n' +
'    this.count = 0;\n' +
'    for (const bucket of old) {\n' +
'      for (const [k, v] of bucket) this.set(k, v);\n' +
'    }\n' +
'  }\n' +
'}\n\n' +
'// Common hash table patterns\n\n' +
'// 1. Frequency counter\n' +
'function charFrequency(s: string): Map<string, number> {\n' +
'  const freq = new Map<string, number>();\n' +
'  for (const ch of s) {\n' +
'    freq.set(ch, (freq.get(ch) || 0) + 1);\n' +
'  }\n' +
'  return freq;\n' +
'}\n\n' +
'// 2. Two-sum using hash map — O(n) vs O(n²) brute force\n' +
'function twoSumHash(nums: number[], target: number): [number, number] | null {\n' +
'  const map = new Map<number, number>(); // value -> index\n' +
'  for (let i = 0; i < nums.length; i++) {\n' +
'    const complement = target - nums[i];\n' +
'    if (map.has(complement)) {\n' +
'      return [map.get(complement)!, i];\n' +
'    }\n' +
'    map.set(nums[i], i);\n' +
'  }\n' +
'  return null;\n' +
'}\n\n' +
'// 3. Group anagrams\n' +
'function groupAnagrams(strs: string[]): string[][] {\n' +
'  const map = new Map<string, string[]>();\n' +
'  for (const s of strs) {\n' +
'    const key = s.split("").sort().join("");\n' +
'    if (!map.has(key)) map.set(key, []);\n' +
'    map.get(key)!.push(s);\n' +
'  }\n' +
'  return Array.from(map.values());\n' +
'}'
      }</code></pre>

      {/* Section 6: Trees */}
      <h2 style={h2Style}>
        {isZh ? '6. 树：层次化数据的自然表示' : '6. Trees: Natural Representation of Hierarchical Data'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '树是一种非线性数据结构，由节点通过边连接，有一个根节点，每个节点最多有一个父节点。二叉搜索树（BST）是最常用的树结构，它的每个节点的左子树值都小于该节点，右子树值都大于该节点，支持 O(log n) 的搜索、插入和删除（平衡时）。'
          : 'A tree is a non-linear data structure where nodes are connected by edges, with a single root and each node having at most one parent. The Binary Search Tree (BST) is the most common tree, where each node\'s left subtree contains smaller values and right subtree contains larger values, supporting O(log n) search, insert, and delete when balanced.'}
      </p>

      <h3 style={h3Style}>{isZh ? '二叉搜索树实现' : 'Binary Search Tree Implementation'}</h3>
      <pre style={preStyle}><code>{
'class TreeNode<T> {\n' +
'  val: T;\n' +
'  left: TreeNode<T> | null = null;\n' +
'  right: TreeNode<T> | null = null;\n' +
'  constructor(val: T) { this.val = val; }\n' +
'}\n\n' +
'class BST<T> {\n' +
'  root: TreeNode<T> | null = null;\n\n' +
'  // O(log n) average, O(n) worst (unbalanced)\n' +
'  insert(val: T): void {\n' +
'    const node = new TreeNode(val);\n' +
'    if (!this.root) { this.root = node; return; }\n' +
'    let curr = this.root;\n' +
'    while (true) {\n' +
'      if (val < curr.val) {\n' +
'        if (!curr.left) { curr.left = node; return; }\n' +
'        curr = curr.left;\n' +
'      } else {\n' +
'        if (!curr.right) { curr.right = node; return; }\n' +
'        curr = curr.right;\n' +
'      }\n' +
'    }\n' +
'  }\n\n' +
'  // O(log n) average\n' +
'  search(val: T): boolean {\n' +
'    let curr = this.root;\n' +
'    while (curr) {\n' +
'      if (val === curr.val) return true;\n' +
'      curr = val < curr.val ? curr.left : curr.right;\n' +
'    }\n' +
'    return false;\n' +
'  }\n\n' +
'  // In-order traversal: left -> root -> right (sorted output)\n' +
'  inOrder(node: TreeNode<T> | null = this.root): T[] {\n' +
'    if (!node) return [];\n' +
'    return [\n' +
'      ...this.inOrder(node.left),\n' +
'      node.val,\n' +
'      ...this.inOrder(node.right)\n' +
'    ];\n' +
'  }\n\n' +
'  // Pre-order: root -> left -> right (copy/serialize)\n' +
'  preOrder(node: TreeNode<T> | null = this.root): T[] {\n' +
'    if (!node) return [];\n' +
'    return [\n' +
'      node.val,\n' +
'      ...this.preOrder(node.left),\n' +
'      ...this.preOrder(node.right)\n' +
'    ];\n' +
'  }\n\n' +
'  // Post-order: left -> right -> root (delete/free)\n' +
'  postOrder(node: TreeNode<T> | null = this.root): T[] {\n' +
'    if (!node) return [];\n' +
'    return [\n' +
'      ...this.postOrder(node.left),\n' +
'      ...this.postOrder(node.right),\n' +
'      node.val\n' +
'    ];\n' +
'  }\n' +
'}\n\n' +
'// Level-order traversal (BFS) using a queue\n' +
'function levelOrder<T>(root: TreeNode<T> | null): T[][] {\n' +
'  if (!root) return [];\n' +
'  const result: T[][] = [];\n' +
'  const queue: TreeNode<T>[] = [root];\n' +
'  while (queue.length > 0) {\n' +
'    const levelSize = queue.length;\n' +
'    const level: T[] = [];\n' +
'    for (let i = 0; i < levelSize; i++) {\n' +
'      const node = queue.shift()!;\n' +
'      level.push(node.val);\n' +
'      if (node.left) queue.push(node.left);\n' +
'      if (node.right) queue.push(node.right);\n' +
'    }\n' +
'    result.push(level);\n' +
'  }\n' +
'  return result;\n' +
'}\n\n' +
'// Maximum depth of binary tree (DFS)\n' +
'function maxDepth<T>(root: TreeNode<T> | null): number {\n' +
'  if (!root) return 0;\n' +
'  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n' +
'}'
      }</code></pre>

      {/* Section 7: Heaps and Priority Queues */}
      <h2 style={h2Style}>
        {isZh ? '7. 堆与优先队列' : '7. Heaps and Priority Queues'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '堆是一种特殊的完全二叉树，满足堆属性：最小堆中父节点总是小于或等于子节点，最大堆则相反。堆通常用数组实现，是优先队列的标准底层结构。它在 Dijkstra 最短路径、中位数维护、Top-K 问题中至关重要。'
          : 'A heap is a special complete binary tree satisfying the heap property: in a min-heap, each parent is less than or equal to its children; a max-heap is the reverse. Heaps are typically implemented with arrays and serve as the standard backing structure for priority queues. They are essential for Dijkstra\'s shortest path, median maintenance, and Top-K problems.'}
      </p>

      <pre style={preStyle}><code>{
'// Min-Heap implementation (array-based)\n' +
'class MinHeap {\n' +
'  private heap: number[] = [];\n\n' +
'  private parent(i: number) { return Math.floor((i - 1) / 2); }\n' +
'  private leftChild(i: number) { return 2 * i + 1; }\n' +
'  private rightChild(i: number) { return 2 * i + 2; }\n\n' +
'  private swap(i: number, j: number) {\n' +
'    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];\n' +
'  }\n\n' +
'  // O(log n) — insert and bubble up\n' +
'  insert(val: number): void {\n' +
'    this.heap.push(val);\n' +
'    let i = this.heap.length - 1;\n' +
'    while (i > 0 && this.heap[i] < this.heap[this.parent(i)]) {\n' +
'      this.swap(i, this.parent(i));\n' +
'      i = this.parent(i);\n' +
'    }\n' +
'  }\n\n' +
'  // O(log n) — extract min and bubble down\n' +
'  extractMin(): number | undefined {\n' +
'    if (this.heap.length === 0) return undefined;\n' +
'    const min = this.heap[0];\n' +
'    const last = this.heap.pop()!;\n' +
'    if (this.heap.length > 0) {\n' +
'      this.heap[0] = last;\n' +
'      this.bubbleDown(0);\n' +
'    }\n' +
'    return min;\n' +
'  }\n\n' +
'  private bubbleDown(i: number): void {\n' +
'    const n = this.heap.length;\n' +
'    while (true) {\n' +
'      let smallest = i;\n' +
'      const left = this.leftChild(i);\n' +
'      const right = this.rightChild(i);\n' +
'      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;\n' +
'      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;\n' +
'      if (smallest === i) break;\n' +
'      this.swap(i, smallest);\n' +
'      i = smallest;\n' +
'    }\n' +
'  }\n\n' +
'  peek(): number | undefined { return this.heap[0]; } // O(1)\n' +
'  get size(): number { return this.heap.length; }\n' +
'}\n\n' +
'// Application: find K largest elements\n' +
'function kLargest(arr: number[], k: number): number[] {\n' +
'  const minHeap = new MinHeap();\n' +
'  for (const num of arr) {\n' +
'    minHeap.insert(num);\n' +
'    if (minHeap.size > k) minHeap.extractMin();\n' +
'  }\n' +
'  const result: number[] = [];\n' +
'  while (minHeap.size > 0) result.push(minHeap.extractMin()!);\n' +
'  return result;\n' +
'}\n' +
'console.log(kLargest([3, 1, 5, 12, 2, 11], 3)); // [5, 11, 12]'
      }</code></pre>

      {/* Section 8: Graphs */}
      <h2 style={h2Style}>
        {isZh ? '8. 图：关系与网络建模' : '8. Graphs: Modeling Relationships and Networks'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '图由顶点（节点）和边组成，用于表示实体之间的关系。社交网络、路线规划、依赖管理都是图的应用。图可以是有向或无向的，加权或无权的。两种主要表示方法是邻接表（稀疏图高效）和邻接矩阵（密集图高效）。'
          : 'A graph consists of vertices (nodes) and edges, representing relationships between entities. Social networks, route planning, and dependency management are all graph applications. Graphs can be directed or undirected, weighted or unweighted. The two main representations are adjacency lists (efficient for sparse graphs) and adjacency matrices (efficient for dense graphs).'}
      </p>

      <h3 style={h3Style}>{isZh ? '图的实现与遍历' : 'Graph Implementation and Traversal'}</h3>
      <pre style={preStyle}><code>{
'// Adjacency List representation\n' +
'class Graph {\n' +
'  private adjacencyList = new Map<string, string[]>();\n\n' +
'  addVertex(v: string): void {\n' +
'    if (!this.adjacencyList.has(v)) {\n' +
'      this.adjacencyList.set(v, []);\n' +
'    }\n' +
'  }\n\n' +
'  addEdge(v1: string, v2: string): void {\n' +
'    this.addVertex(v1);\n' +
'    this.addVertex(v2);\n' +
'    this.adjacencyList.get(v1)!.push(v2);\n' +
'    this.adjacencyList.get(v2)!.push(v1); // undirected\n' +
'  }\n\n' +
'  // BFS — finds shortest path in unweighted graph\n' +
'  bfs(start: string): string[] {\n' +
'    const visited = new Set<string>();\n' +
'    const queue: string[] = [start];\n' +
'    const result: string[] = [];\n' +
'    visited.add(start);\n\n' +
'    while (queue.length > 0) {\n' +
'      const vertex = queue.shift()!;\n' +
'      result.push(vertex);\n' +
'      for (const neighbor of this.adjacencyList.get(vertex) || []) {\n' +
'        if (!visited.has(neighbor)) {\n' +
'          visited.add(neighbor);\n' +
'          queue.push(neighbor);\n' +
'        }\n' +
'      }\n' +
'    }\n' +
'    return result;\n' +
'  }\n\n' +
'  // DFS — recursive\n' +
'  dfs(start: string): string[] {\n' +
'    const visited = new Set<string>();\n' +
'    const result: string[] = [];\n\n' +
'    const traverse = (vertex: string) => {\n' +
'      visited.add(vertex);\n' +
'      result.push(vertex);\n' +
'      for (const neighbor of this.adjacencyList.get(vertex) || []) {\n' +
'        if (!visited.has(neighbor)) traverse(neighbor);\n' +
'      }\n' +
'    };\n\n' +
'    traverse(start);\n' +
'    return result;\n' +
'  }\n\n' +
'  // DFS — iterative with explicit stack\n' +
'  dfsIterative(start: string): string[] {\n' +
'    const visited = new Set<string>();\n' +
'    const stack: string[] = [start];\n' +
'    const result: string[] = [];\n\n' +
'    while (stack.length > 0) {\n' +
'      const vertex = stack.pop()!;\n' +
'      if (visited.has(vertex)) continue;\n' +
'      visited.add(vertex);\n' +
'      result.push(vertex);\n' +
'      for (const neighbor of this.adjacencyList.get(vertex) || []) {\n' +
'        if (!visited.has(neighbor)) stack.push(neighbor);\n' +
'      }\n' +
'    }\n' +
'    return result;\n' +
'  }\n\n' +
'  // Shortest path (BFS) between two nodes\n' +
'  shortestPath(start: string, end: string): string[] | null {\n' +
'    const visited = new Set<string>();\n' +
'    const queue: string[][] = [[start]];\n' +
'    visited.add(start);\n\n' +
'    while (queue.length > 0) {\n' +
'      const path = queue.shift()!;\n' +
'      const vertex = path[path.length - 1];\n' +
'      if (vertex === end) return path;\n' +
'      for (const neighbor of this.adjacencyList.get(vertex) || []) {\n' +
'        if (!visited.has(neighbor)) {\n' +
'          visited.add(neighbor);\n' +
'          queue.push([...path, neighbor]);\n' +
'        }\n' +
'      }\n' +
'    }\n' +
'    return null;\n' +
'  }\n' +
'}\n\n' +
'// Usage\n' +
'const g = new Graph();\n' +
'g.addEdge("A", "B");\n' +
'g.addEdge("A", "C");\n' +
'g.addEdge("B", "D");\n' +
'g.addEdge("C", "D");\n' +
'g.addEdge("D", "E");\n' +
'console.log(g.bfs("A"));            // [A, B, C, D, E]\n' +
'console.log(g.shortestPath("A", "E")); // [A, B, D, E]'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? '拓扑排序（有向无环图）' : 'Topological Sort (Directed Acyclic Graph)'}</h3>
      <pre style={preStyle}><code>{
'// Topological sort using Kahn\'s algorithm (BFS)\n' +
'// Used for: build systems, task scheduling, course prerequisites\n' +
'function topologicalSort(\n' +
'  numNodes: number,\n' +
'  edges: [number, number][]\n' +
'): number[] {\n' +
'  const adjList: number[][] = Array.from({ length: numNodes }, () => []);\n' +
'  const inDegree = new Array(numNodes).fill(0);\n\n' +
'  for (const [from, to] of edges) {\n' +
'    adjList[from].push(to);\n' +
'    inDegree[to]++;\n' +
'  }\n\n' +
'  // Start with nodes that have no incoming edges\n' +
'  const queue: number[] = [];\n' +
'  for (let i = 0; i < numNodes; i++) {\n' +
'    if (inDegree[i] === 0) queue.push(i);\n' +
'  }\n\n' +
'  const result: number[] = [];\n' +
'  while (queue.length > 0) {\n' +
'    const node = queue.shift()!;\n' +
'    result.push(node);\n' +
'    for (const neighbor of adjList[node]) {\n' +
'      inDegree[neighbor]--;\n' +
'      if (inDegree[neighbor] === 0) queue.push(neighbor);\n' +
'    }\n' +
'  }\n\n' +
'  // If result doesn\'t include all nodes, there\'s a cycle\n' +
'  if (result.length !== numNodes) {\n' +
'    throw new Error("Graph has a cycle — no valid topological order");\n' +
'  }\n' +
'  return result;\n' +
'}\n\n' +
'// Example: course prerequisites\n' +
'// 0=Math, 1=Physics, 2=CS101, 3=CS201, 4=ML\n' +
'const order = topologicalSort(5, [\n' +
'  [0, 1], // Math -> Physics\n' +
'  [0, 2], // Math -> CS101\n' +
'  [2, 3], // CS101 -> CS201\n' +
'  [1, 4], // Physics -> ML\n' +
'  [3, 4], // CS201 -> ML\n' +
']);\n' +
'console.log(order); // [0, 1, 2, 3, 4] or [0, 2, 1, 3, 4]'
      }</code></pre>

      {/* Section 9: Sorting Algorithms */}
      <h2 style={h2Style}>
        {isZh ? '9. 排序算法：从基础到高级' : '9. Sorting Algorithms: From Basic to Advanced'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '排序是最基本的算法操作之一。理解不同排序算法的特性——时间复杂度、空间复杂度、稳定性——有助于根据场景选择最佳方案。大多数语言内置的排序使用 Timsort（归并排序和插入排序的混合），它在实际数据上表现优异。'
          : 'Sorting is one of the most fundamental algorithmic operations. Understanding the characteristics of different sorting algorithms — time complexity, space complexity, stability — helps you choose the best approach for your scenario. Most language built-in sorts use Timsort (a hybrid of merge sort and insertion sort) which excels on real-world data.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '算法' : 'Algorithm'}</th>
            <th style={thStyle}>{isZh ? '最优' : 'Best'}</th>
            <th style={thStyle}>{isZh ? '平均' : 'Average'}</th>
            <th style={thStyle}>{isZh ? '最差' : 'Worst'}</th>
            <th style={thStyle}>{isZh ? '空间' : 'Space'}</th>
            <th style={thStyle}>{isZh ? '稳定' : 'Stable'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Bubble Sort</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>O(n²)</td><td style={tdStyle}>O(n²)</td><td style={tdStyle}>O(1)</td><td style={tdStyle}>{isZh ? '是' : 'Yes'}</td></tr>
          <tr><td style={tdStyle}>Insertion Sort</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>O(n²)</td><td style={tdStyle}>O(n²)</td><td style={tdStyle}>O(1)</td><td style={tdStyle}>{isZh ? '是' : 'Yes'}</td></tr>
          <tr><td style={tdStyle}>Selection Sort</td><td style={tdStyle}>O(n²)</td><td style={tdStyle}>O(n²)</td><td style={tdStyle}>O(n²)</td><td style={tdStyle}>O(1)</td><td style={tdStyle}>{isZh ? '否' : 'No'}</td></tr>
          <tr><td style={tdStyle}>Merge Sort</td><td style={tdStyle}>O(n log n)</td><td style={tdStyle}>O(n log n)</td><td style={tdStyle}>O(n log n)</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>{isZh ? '是' : 'Yes'}</td></tr>
          <tr><td style={tdStyle}>Quick Sort</td><td style={tdStyle}>O(n log n)</td><td style={tdStyle}>O(n log n)</td><td style={tdStyle}>O(n²)</td><td style={tdStyle}>O(log n)</td><td style={tdStyle}>{isZh ? '否' : 'No'}</td></tr>
          <tr><td style={tdStyle}>Heap Sort</td><td style={tdStyle}>O(n log n)</td><td style={tdStyle}>O(n log n)</td><td style={tdStyle}>O(n log n)</td><td style={tdStyle}>O(1)</td><td style={tdStyle}>{isZh ? '否' : 'No'}</td></tr>
          <tr><td style={tdStyle}>Counting Sort</td><td style={tdStyle}>O(n+k)</td><td style={tdStyle}>O(n+k)</td><td style={tdStyle}>O(n+k)</td><td style={tdStyle}>O(k)</td><td style={tdStyle}>{isZh ? '是' : 'Yes'}</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? '归并排序（分治法）' : 'Merge Sort (Divide and Conquer)'}</h3>
      <pre style={preStyle}><code>{
'// Merge Sort — O(n log n) guaranteed, stable, O(n) space\n' +
'function mergeSort(arr: number[]): number[] {\n' +
'  if (arr.length <= 1) return arr;\n\n' +
'  const mid = Math.floor(arr.length / 2);\n' +
'  const left = mergeSort(arr.slice(0, mid));\n' +
'  const right = mergeSort(arr.slice(mid));\n\n' +
'  return merge(left, right);\n' +
'}\n\n' +
'function merge(left: number[], right: number[]): number[] {\n' +
'  const result: number[] = [];\n' +
'  let i = 0, j = 0;\n\n' +
'  while (i < left.length && j < right.length) {\n' +
'    if (left[i] <= right[j]) {\n' +
'      result.push(left[i++]);\n' +
'    } else {\n' +
'      result.push(right[j++]);\n' +
'    }\n' +
'  }\n\n' +
'  return result.concat(left.slice(i)).concat(right.slice(j));\n' +
'}\n\n' +
'console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));\n' +
'// [3, 9, 10, 27, 38, 43, 82]'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? '快速排序（原地排序）' : 'Quick Sort (In-Place)'}</h3>
      <pre style={preStyle}><code>{
'// Quick Sort — O(n log n) average, O(n²) worst, in-place\n' +
'function quickSort(\n' +
'  arr: number[],\n' +
'  low = 0,\n' +
'  high = arr.length - 1\n' +
'): number[] {\n' +
'  if (low < high) {\n' +
'    const pivotIdx = partition(arr, low, high);\n' +
'    quickSort(arr, low, pivotIdx - 1);\n' +
'    quickSort(arr, pivotIdx + 1, high);\n' +
'  }\n' +
'  return arr;\n' +
'}\n\n' +
'function partition(\n' +
'  arr: number[],\n' +
'  low: number,\n' +
'  high: number\n' +
'): number {\n' +
'  // Median-of-three pivot selection for better performance\n' +
'  const mid = Math.floor((low + high) / 2);\n' +
'  if (arr[mid] < arr[low]) [arr[low], arr[mid]] = [arr[mid], arr[low]];\n' +
'  if (arr[high] < arr[low]) [arr[low], arr[high]] = [arr[high], arr[low]];\n' +
'  if (arr[mid] < arr[high]) [arr[mid], arr[high]] = [arr[high], arr[mid]];\n\n' +
'  const pivot = arr[high];\n' +
'  let i = low - 1;\n\n' +
'  for (let j = low; j < high; j++) {\n' +
'    if (arr[j] <= pivot) {\n' +
'      i++;\n' +
'      [arr[i], arr[j]] = [arr[j], arr[i]];\n' +
'    }\n' +
'  }\n' +
'  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n' +
'  return i + 1;\n' +
'}\n\n' +
'const data = [10, 7, 8, 9, 1, 5];\n' +
'console.log(quickSort([...data])); // [1, 5, 7, 8, 9, 10]'
      }</code></pre>

      {/* Section 10: Searching Algorithms */}
      <h2 style={h2Style}>
        {isZh ? '10. 搜索算法：高效查找数据' : '10. Searching Algorithms: Finding Data Efficiently'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '搜索是编程中最常见的操作。线性搜索适用于无序数据（O(n)），二分搜索适用于有序数据（O(log n)）。掌握二分搜索的变体——查找左边界、右边界、旋转数组搜索——是技术面试的核心技能。'
          : 'Searching is one of the most common operations in programming. Linear search works on unsorted data (O(n)), binary search works on sorted data (O(log n)). Mastering binary search variants — finding left bounds, right bounds, searching rotated arrays — is a core technical interview skill.'}
      </p>

      <h3 style={h3Style}>{isZh ? '二分搜索变体' : 'Binary Search Variants'}</h3>
      <pre style={preStyle}><code>{
'// Standard binary search\n' +
'function binarySearch(arr: number[], target: number): number {\n' +
'  let left = 0, right = arr.length - 1;\n' +
'  while (left <= right) {\n' +
'    const mid = left + Math.floor((right - left) / 2); // avoid overflow\n' +
'    if (arr[mid] === target) return mid;\n' +
'    if (arr[mid] < target) left = mid + 1;\n' +
'    else right = mid - 1;\n' +
'  }\n' +
'  return -1;\n' +
'}\n\n' +
'// Find leftmost (first) occurrence\n' +
'function lowerBound(arr: number[], target: number): number {\n' +
'  let left = 0, right = arr.length;\n' +
'  while (left < right) {\n' +
'    const mid = left + Math.floor((right - left) / 2);\n' +
'    if (arr[mid] < target) left = mid + 1;\n' +
'    else right = mid;\n' +
'  }\n' +
'  return left; // first index where arr[i] >= target\n' +
'}\n\n' +
'// Find rightmost (last) occurrence\n' +
'function upperBound(arr: number[], target: number): number {\n' +
'  let left = 0, right = arr.length;\n' +
'  while (left < right) {\n' +
'    const mid = left + Math.floor((right - left) / 2);\n' +
'    if (arr[mid] <= target) left = mid + 1;\n' +
'    else right = mid;\n' +
'  }\n' +
'  return left - 1; // last index where arr[i] <= target\n' +
'}\n\n' +
'// Search in rotated sorted array\n' +
'function searchRotated(arr: number[], target: number): number {\n' +
'  let left = 0, right = arr.length - 1;\n' +
'  while (left <= right) {\n' +
'    const mid = left + Math.floor((right - left) / 2);\n' +
'    if (arr[mid] === target) return mid;\n\n' +
'    // Left half is sorted\n' +
'    if (arr[left] <= arr[mid]) {\n' +
'      if (arr[left] <= target && target < arr[mid]) {\n' +
'        right = mid - 1;\n' +
'      } else {\n' +
'        left = mid + 1;\n' +
'      }\n' +
'    }\n' +
'    // Right half is sorted\n' +
'    else {\n' +
'      if (arr[mid] < target && target <= arr[right]) {\n' +
'        left = mid + 1;\n' +
'      } else {\n' +
'        right = mid - 1;\n' +
'      }\n' +
'    }\n' +
'  }\n' +
'  return -1;\n' +
'}\n\n' +
'// Example\n' +
'console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // 4\n' +
'console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)); // -1'
      }</code></pre>

      {/* Section 11: Python equivalents */}
      <h2 style={h2Style}>
        {isZh ? '11. Python 中的数据结构实战' : '11. Data Structures in Practice: Python Examples'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Python 内置了丰富的数据结构支持。list 是动态数组，dict 是哈希表，set 是哈希集合，collections 模块提供 deque（双端队列）、Counter（频率计数器）、defaultdict（默认字典）等高级结构，heapq 模块提供堆操作。'
          : 'Python has rich built-in data structure support. list is a dynamic array, dict is a hash table, set is a hash set, the collections module provides deque (double-ended queue), Counter (frequency counter), defaultdict, and the heapq module provides heap operations.'}
      </p>

      <pre style={preStyle}><code>{
'# Python data structure essentials\n\n' +
'from collections import deque, Counter, defaultdict\n' +
'import heapq\n\n' +
'# ---- list (dynamic array) ----\n' +
'arr = [3, 1, 4, 1, 5, 9]\n' +
'arr.sort()                  # in-place sort: [1, 1, 3, 4, 5, 9]\n' +
'sorted_arr = sorted(arr)    # returns new sorted list\n' +
'arr.append(2)               # O(1) amortized\n' +
'arr.pop()                   # O(1) remove last\n' +
'arr.insert(0, 99)           # O(n) insert at index\n\n' +
'# List comprehension (Pythonic way)\n' +
'squares = [x**2 for x in range(10)]          # [0, 1, 4, 9, ..., 81]\n' +
'evens = [x for x in arr if x % 2 == 0]      # filter even numbers\n\n' +
'# ---- dict (hash table) ----\n' +
'graph = {"A": ["B", "C"], "B": ["D"], "C": ["D"]}\n' +
'graph.get("X", [])          # safe access with default\n\n' +
'# ---- set (hash set) ----\n' +
'seen = set()\n' +
'seen.add(1)                 # O(1)\n' +
'print(1 in seen)            # O(1) membership test: True\n\n' +
'# ---- deque (double-ended queue) ----\n' +
'q = deque([1, 2, 3])\n' +
'q.append(4)                 # O(1) right\n' +
'q.appendleft(0)             # O(1) left\n' +
'q.pop()                     # O(1) right\n' +
'q.popleft()                 # O(1) left — unlike list.pop(0) which is O(n)\n\n' +
'# ---- Counter (frequency counting) ----\n' +
'text = "hello world"\n' +
'freq = Counter(text)\n' +
'print(freq.most_common(3))  # [(\'l\', 3), (\'o\', 2), (\'h\', 1)]\n\n' +
'# ---- defaultdict ----\n' +
'adj = defaultdict(list)\n' +
'adj["A"].append("B")        # no KeyError if key missing\n' +
'adj["A"].append("C")\n\n' +
'# ---- heapq (min-heap) ----\n' +
'heap = []\n' +
'heapq.heappush(heap, 5)\n' +
'heapq.heappush(heap, 1)\n' +
'heapq.heappush(heap, 3)\n' +
'print(heapq.heappop(heap))  # 1 (min element)\n\n' +
'# Top-K largest\n' +
'nums = [3, 1, 5, 12, 2, 11]\n' +
'print(heapq.nlargest(3, nums))   # [12, 11, 5]\n' +
'print(heapq.nsmallest(3, nums))  # [1, 2, 3]\n\n' +
'# ---- BFS in Python ----\n' +
'def bfs(graph, start):\n' +
'    visited = set()\n' +
'    queue = deque([start])\n' +
'    visited.add(start)\n' +
'    result = []\n' +
'    while queue:\n' +
'        vertex = queue.popleft()\n' +
'        result.append(vertex)\n' +
'        for neighbor in graph.get(vertex, []):\n' +
'            if neighbor not in visited:\n' +
'                visited.add(neighbor)\n' +
'                queue.append(neighbor)\n' +
'    return result'
      }</code></pre>

      {/* Section 12: Choosing the right data structure */}
      <h2 style={h2Style}>
        {isZh ? '12. 如何选择正确的数据结构' : '12. How to Choose the Right Data Structure'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '选择数据结构时，要考虑你最频繁的操作、数据量大小、是否需要排序、空间限制等因素。下面的对比表可以帮助你快速做出决策。'
          : 'When choosing a data structure, consider your most frequent operations, data volume, whether ordering is needed, and space constraints. The comparison table below helps you make quick decisions.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '需求' : 'Need'}</th>
            <th style={thStyle}>{isZh ? '推荐结构' : 'Recommended'}</th>
            <th style={thStyle}>{isZh ? '原因' : 'Reason'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '快速查找（键→值）' : 'Fast lookup (key→value)'}</td><td style={tdStyle}>Hash Table</td><td style={tdStyle}>O(1) {isZh ? '平均查找' : 'average lookup'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '有序数据 + 范围查询' : 'Ordered data + range queries'}</td><td style={tdStyle}>BST / TreeMap</td><td style={tdStyle}>O(log n) {isZh ? '有序操作' : 'ordered operations'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? 'FIFO 处理' : 'FIFO processing'}</td><td style={tdStyle}>Queue / Deque</td><td style={tdStyle}>O(1) {isZh ? '两端操作' : 'enqueue/dequeue'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? 'LIFO / 撤销' : 'LIFO / Undo'}</td><td style={tdStyle}>Stack</td><td style={tdStyle}>O(1) push/pop</td></tr>
          <tr><td style={tdStyle}>{isZh ? '优先级处理' : 'Priority processing'}</td><td style={tdStyle}>Heap</td><td style={tdStyle}>O(log n) {isZh ? '插入/提取' : 'insert/extract'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '去重' : 'Deduplication'}</td><td style={tdStyle}>Set</td><td style={tdStyle}>O(1) {isZh ? '成员测试' : 'membership test'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '关系/网络建模' : 'Relationship/network modeling'}</td><td style={tdStyle}>Graph</td><td style={tdStyle}>{isZh ? '灵活表示实体关系' : 'Flexible entity relationships'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '频繁中间插入/删除' : 'Frequent mid-insert/delete'}</td><td style={tdStyle}>Linked List</td><td style={tdStyle}>O(1) {isZh ? '已知位置操作' : 'at known position'}</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? '数据结构复杂度速查表' : 'Data Structure Complexity Cheat Sheet'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '数据结构' : 'Data Structure'}</th>
            <th style={thStyle}>{isZh ? '访问' : 'Access'}</th>
            <th style={thStyle}>{isZh ? '搜索' : 'Search'}</th>
            <th style={thStyle}>{isZh ? '插入' : 'Insert'}</th>
            <th style={thStyle}>{isZh ? '删除' : 'Delete'}</th>
            <th style={thStyle}>{isZh ? '空间' : 'Space'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Array</td><td style={tdStyle}>O(1)</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>O(n)</td></tr>
          <tr><td style={tdStyle}>Linked List</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>O(1)*</td><td style={tdStyle}>O(1)*</td><td style={tdStyle}>O(n)</td></tr>
          <tr><td style={tdStyle}>Hash Table</td><td style={tdStyle}>N/A</td><td style={tdStyle}>O(1)</td><td style={tdStyle}>O(1)</td><td style={tdStyle}>O(1)</td><td style={tdStyle}>O(n)</td></tr>
          <tr><td style={tdStyle}>BST ({isZh ? '平衡' : 'balanced'})</td><td style={tdStyle}>O(log n)</td><td style={tdStyle}>O(log n)</td><td style={tdStyle}>O(log n)</td><td style={tdStyle}>O(log n)</td><td style={tdStyle}>O(n)</td></tr>
          <tr><td style={tdStyle}>Heap</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>O(log n)</td><td style={tdStyle}>O(log n)</td><td style={tdStyle}>O(n)</td></tr>
          <tr><td style={tdStyle}>Stack</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>O(1)</td><td style={tdStyle}>O(1)</td><td style={tdStyle}>O(n)</td></tr>
          <tr><td style={tdStyle}>Queue</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>O(n)</td><td style={tdStyle}>O(1)</td><td style={tdStyle}>O(1)</td><td style={tdStyle}>O(n)</td></tr>
        </tbody>
      </table>
      <p style={{ ...pStyle, fontSize: '0.85rem', color: '#64748b' }}>
        {isZh ? '* 链表的 O(1) 插入/删除需要已知节点位置；查找位置需 O(n)。所有哈希表复杂度为平均情况。' : '* Linked list O(1) insert/delete requires a known node reference; finding the position is O(n). All hash table complexities are average case.'}
      </p>

      {/* Conclusion */}
      <h2 style={h2Style}>
        {isZh ? '总结' : 'Conclusion'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '数据结构和算法是每个开发者的核心技能。数组和哈希表覆盖了大部分日常需求，栈和队列解决特定的访问模式问题，树和图处理层次化和网络关系数据。掌握 Big O 分析让你能在编码前预判性能，选择排序和搜索算法时考虑数据特征。记住：没有万能的数据结构，只有最适合当前问题的数据结构。'
          : 'Data structures and algorithms are core skills for every developer. Arrays and hash tables cover most daily needs, stacks and queues solve specific access pattern problems, and trees and graphs handle hierarchical and network relationship data. Mastering Big O analysis lets you predict performance before writing code, and choosing sorting and searching algorithms should consider data characteristics. Remember: there is no one-size-fits-all data structure — only the best one for your current problem.'}
      </p>

      {/* FAQ */}
      <h2 style={h2Style}>
        {isZh ? '常见问题' : 'Frequently Asked Questions'}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqSchema.mainEntity.map((faq, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '20px 24px',
              background: '#ffffff',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b', margin: '0 0 10px 0' }}>
              {faq.name}
            </h3>
            <p style={{ color: '#475569', lineHeight: '1.7', margin: '0' }}>
              {faq.acceptedAnswer.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
