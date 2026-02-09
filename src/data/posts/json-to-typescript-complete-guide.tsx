import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Converting JSON to TypeScript interfaces is one of the most common tasks in modern web development. Whether you\'re consuming REST APIs, working with configuration files, or defining data models, having <strong>proper TypeScript types</strong> ensures type safety and better developer experience.',
    linkTool: 'Convert JSON to TypeScript instantly with our free tool \u2192',
    h2Why: 'Why Convert JSON to TypeScript?',
    whyDesc: 'TypeScript\'s type system catches errors at compile time that would otherwise surface at runtime. When you receive JSON from an API, TypeScript has no idea what shape that data takes \u2014 unless you define interfaces. Without types, you lose autocompletion, refactoring support, and compile-time error checking.',
    whyList: '<ul><li><strong>Autocompletion</strong> \u2014 your editor suggests valid property names</li><li><strong>Compile-time errors</strong> \u2014 catch typos and missing fields before deployment</li><li><strong>Self-documenting code</strong> \u2014 interfaces describe your data shape</li><li><strong>Refactoring safety</strong> \u2014 rename a field and TypeScript finds every usage</li></ul>',
    h2Basic: 'Basic Conversion Rules',
    basicDesc: 'The fundamental mappings from JSON types to TypeScript types are straightforward:',
    basicTable: '<table><thead><tr><th>JSON Type</th><th>TypeScript Type</th><th>Example</th></tr></thead><tbody><tr><td>string</td><td><code>string</code></td><td><code>"hello"</code></td></tr><tr><td>number (int)</td><td><code>number</code></td><td><code>42</code></td></tr><tr><td>number (float)</td><td><code>number</code></td><td><code>3.14</code></td></tr><tr><td>boolean</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td></tr><tr><td>array</td><td><code>T[]</code></td><td><code>[1, 2, 3]</code></td></tr><tr><td>object</td><td><code>interface</code></td><td><code>{"key": "val"}</code></td></tr></tbody></table>',
    h2Nested: 'Handling Nested Objects',
    nestedDesc: 'Real-world JSON is rarely flat. When objects contain other objects, you should create separate interfaces for each level:',
    nestedNote: 'Tip: Use separate interfaces rather than deeply nested inline types. It makes your code more readable and reusable.',
    h2Arrays: 'Array Types',
    arraysDesc: 'Arrays in JSON can contain uniform or mixed types. TypeScript handles both cases:',
    arraysNote: 'When an array contains objects of the same shape, define a dedicated interface. For heterogeneous arrays, use union types.',
    h2Null: 'Null and Optional Fields',
    nullDesc: 'JSON APIs often return <code>null</code> for missing values, or omit fields entirely. TypeScript distinguishes between these two cases:',
    nullNote: '<strong>Key difference:</strong> <code>null</code> means the field exists but has no value. <code>undefined</code> (optional with <code>?</code>) means the field might not be present at all. Use <code>| null</code> for nullable fields and <code>?</code> for optional fields.',
    h2Best: 'Best Practices',
    bestList: '<ul><li><strong>Use <code>interface</code> over <code>type</code></strong> for object shapes \u2014 interfaces are extendable and produce better error messages</li><li><strong>Prefer <code>readonly</code></strong> for data from APIs that you don\'t intend to mutate</li><li><strong>Use <code>unknown</code> instead of <code>any</code></strong> for truly dynamic fields \u2014 it forces you to validate before use</li><li><strong>Name interfaces clearly</strong> \u2014 use <code>User</code>, not <code>IUser</code> or <code>UserInterface</code></li><li><strong>Export shared interfaces</strong> in a central <code>types/</code> directory for reuse across your project</li><li><strong>Validate at runtime</strong> \u2014 TypeScript types disappear at runtime, so use libraries like Zod or io-ts for API boundary validation</li></ul>',
    h2Tool: 'Automate the Conversion',
    toolDesc: 'Manually writing interfaces for large JSON payloads is tedious and error-prone. Use our <strong>JSON to TypeScript</strong> converter to instantly generate accurate interfaces from any JSON input. Paste your JSON, get TypeScript \u2014 it\'s that simple.',
    linkToolBottom: 'Try the JSON to TypeScript converter now \u2192',
  },
  zh: {
    intro: '将 JSON 转换为 TypeScript 接口是现代 Web 开发中最常见的任务之一。无论你是在使用 REST API、处理配置文件还是定义数据模型，拥有<strong>正确的 TypeScript 类型</strong>可以确保类型安全和更好的开发体验。',
    linkTool: '使用我们的免费工具即时将 JSON 转换为 TypeScript \u2192',
    h2Why: '为什么要将 JSON 转换为 TypeScript？',
    whyDesc: 'TypeScript 的类型系统可以在编译时捕获那些本来会在运行时出现的错误。当你从 API 接收 JSON 时，TypeScript 并不知道数据的形状——除非你定义接口。没有类型，你将失去自动补全、重构支持和编译时错误检查。',
    whyList: '<ul><li><strong>自动补全</strong>——编辑器会建议有效的属性名</li><li><strong>编译时错误</strong>——在部署前捕获拼写错误和缺少字段</li><li><strong>自文档化代码</strong>——接口描述你的数据结构</li><li><strong>重构安全</strong>——重命名字段时 TypeScript 会找到每个引用</li></ul>',
    h2Basic: '基本转换规则',
    basicDesc: 'JSON 类型到 TypeScript 类型的基本映射非常直观：',
    basicTable: '<table><thead><tr><th>JSON 类型</th><th>TypeScript 类型</th><th>示例</th></tr></thead><tbody><tr><td>string</td><td><code>string</code></td><td><code>"hello"</code></td></tr><tr><td>number (整数)</td><td><code>number</code></td><td><code>42</code></td></tr><tr><td>number (浮点数)</td><td><code>number</code></td><td><code>3.14</code></td></tr><tr><td>boolean</td><td><code>boolean</code></td><td><code>true</code></td></tr><tr><td>null</td><td><code>null</code></td><td><code>null</code></td></tr><tr><td>array</td><td><code>T[]</code></td><td><code>[1, 2, 3]</code></td></tr><tr><td>object</td><td><code>interface</code></td><td><code>{"key": "val"}</code></td></tr></tbody></table>',
    h2Nested: '处理嵌套对象',
    nestedDesc: '现实世界的 JSON 很少是扁平的。当对象包含其他对象时，应为每个层级创建单独的接口：',
    nestedNote: '提示：使用独立的接口而不是深度嵌套的内联类型。这会使你的代码更可读、更可复用。',
    h2Arrays: '数组类型',
    arraysDesc: 'JSON 中的数组可以包含统一或混合的类型。TypeScript 可以处理这两种情况：',
    arraysNote: '当数组包含相同结构的对象时，定义一个专用接口。对于异构数组，使用联合类型。',
    h2Null: 'Null 和可选字段',
    nullDesc: 'JSON API 通常对缺失值返回 <code>null</code>，或完全省略某些字段。TypeScript 区分这两种情况：',
    nullNote: '<strong>关键区别：</strong><code>null</code> 表示字段存在但没有值。<code>undefined</code>（用 <code>?</code> 标记为可选）表示字段可能根本不存在。对可空字段使用 <code>| null</code>，对可选字段使用 <code>?</code>。',
    h2Best: '最佳实践',
    bestList: '<ul><li><strong>对象类型优先使用 <code>interface</code> 而非 <code>type</code></strong>——接口可扩展且产生更好的错误信息</li><li><strong>对 API 返回的不会修改的数据使用 <code>readonly</code></strong></li><li><strong>对真正动态的字段使用 <code>unknown</code> 而非 <code>any</code></strong>——强制在使用前验证</li><li><strong>清晰命名接口</strong>——使用 <code>User</code>，而不是 <code>IUser</code> 或 <code>UserInterface</code></li><li><strong>在中央 <code>types/</code> 目录导出共享接口</strong>，便于项目中复用</li><li><strong>运行时验证</strong>——TypeScript 类型在运行时会消失，使用 Zod 或 io-ts 等库进行 API 边界验证</li></ul>',
    h2Tool: '自动化转换',
    toolDesc: '为大型 JSON 负载手动编写接口既繁琐又容易出错。使用我们的 <strong>JSON to TypeScript</strong> 转换器，可以从任何 JSON 输入即时生成准确的接口。粘贴 JSON，获得 TypeScript——就是这么简单。',
    linkToolBottom: '立即试用 JSON to TypeScript 转换器 \u2192',
  },
};

export default function JsonToTypescriptCompleteGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <p>
        <Link href={`/${lang}/tools/json-to-typescript`} style={{ fontWeight: 600 }}>
          {s.linkTool}
        </Link>
      </p>

      <h2>{s.h2Why}</h2>
      <p>{s.whyDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: s.whyList }} />

      <h2>{s.h2Basic}</h2>
      <p>{s.basicDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: s.basicTable }} />

      <pre><code>{`// JSON
{
  "name": "Alice",
  "age": 30,
  "active": true
}

// TypeScript
interface User {
  name: string;
  age: number;
  active: boolean;
}`}</code></pre>

      <h2>{s.h2Nested}</h2>
      <p>{s.nestedDesc}</p>

      <pre><code>{`// JSON
{
  "id": 1,
  "name": "Alice",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "coordinates": {
      "lat": 39.7817,
      "lng": -89.6501
    }
  }
}

// TypeScript
interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  street: string;
  city: string;
  coordinates: Coordinates;
}

interface User {
  id: number;
  name: string;
  address: Address;
}`}</code></pre>

      <p><em>{s.nestedNote}</em></p>

      <h2>{s.h2Arrays}</h2>
      <p>{s.arraysDesc}</p>

      <pre><code>{`// Uniform array
{ "tags": ["typescript", "react", "next"] }
// -> tags: string[]

// Array of objects
{
  "users": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}
// -> users: User[]

// Mixed array (rare but possible)
{ "data": [1, "two", true] }
// -> data: (number | string | boolean)[]`}</code></pre>

      <p><em>{s.arraysNote}</em></p>

      <h2>{s.h2Null}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.nullDesc }} />

      <pre><code>{`// JSON with null values
{
  "id": 1,
  "name": "Alice",
  "avatar": null,
  "bio": null
}

// TypeScript — nullable vs optional
interface User {
  id: number;
  name: string;
  avatar: string | null;    // field exists, value can be null
  bio?: string;              // field might not exist at all
  nickname?: string | null;  // might not exist OR might be null
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.nullNote }} />

      <h2>{s.h2Best}</h2>
      <div dangerouslySetInnerHTML={{ __html: s.bestList }} />

      <pre><code>{`// Good: runtime validation with Zod
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().nullable(),
});

type User = z.infer<typeof UserSchema>;

// Validate API response
const user = UserSchema.parse(await res.json());`}</code></pre>

      <h2>{s.h2Tool}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.toolDesc }} />

      <p>
        <Link href={`/${lang}/tools/json-to-typescript`} style={{ fontWeight: 600 }}>
          {s.linkToolBottom}
        </Link>
      </p>
    </>
  );
}
