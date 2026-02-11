'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'TypeScript Generics Explained: A Practical Guide with Examples',
    intro: 'TypeScript generics are one of the most powerful features of the type system. They allow you to write <strong>flexible, reusable, and type-safe</strong> code by parameterizing types. Instead of duplicating functions or classes for every data type, generics let you write once and use with any type while maintaining full type safety. This guide covers everything from basics to advanced patterns.',
    h2_first: 'Your First Generic Function',
    p_first: 'The classic starting point is the <strong>identity function</strong> — a function that returns exactly what it receives. Without generics, you would either lose type information by using <code>any</code>, or you would have to write separate functions for each type.',
    p_first2: 'With generics, you define a <strong>type parameter</strong> (conventionally named <code>T</code>) that acts as a placeholder. When you call the function, TypeScript infers the actual type automatically.',
    h2_functions: 'Generic Functions',
    p_functions: 'Generic functions can accept <strong>multiple type parameters</strong> and even have <strong>default types</strong>. This makes them incredibly versatile for building utility functions.',
    p_functions2: 'Default type parameters work just like default function parameters — if the caller does not specify a type, the default is used.',
    h2_interfaces: 'Generic Interfaces and Types',
    p_interfaces: 'Generics are not limited to functions. You can parameterize <strong>interfaces</strong> and <strong>type aliases</strong> to create flexible data structures that work with any type.',
    p_interfaces2: 'Generic interfaces are especially useful for defining shapes of API responses, collections, and data containers.',
    h2_classes: 'Generic Classes',
    p_classes: 'Classes can also be generic. This is useful for building <strong>data structures</strong> like stacks, queues, linked lists, or any container that should work with multiple types.',
    p_classes2: 'The type parameter is available throughout the class — in properties, method parameters, and return types.',
    h2_constraints: 'Generic Constraints with extends',
    p_constraints: 'Unconstrained generics accept any type, but sometimes you need to <strong>narrow down</strong> what types are allowed. The <code>extends</code> keyword lets you add constraints.',
    h3_keyof: 'Constraining to Object Keys with keyof',
    p_keyof: 'A very common pattern is constraining a type parameter to be a valid key of another type. This ensures type-safe property access.',
    h3_shapes: 'Constraining to Specific Shapes',
    p_shapes: 'You can require that a type parameter has certain properties by extending an interface or object type.',
    h2_conditional: 'Conditional Types',
    p_conditional: 'Conditional types let you choose between two types based on a condition, using the syntax <code>T extends U ? X : Y</code>. They are the foundation of many advanced type-level computations.',
    p_conditional2: 'Conditional types become especially powerful when combined with <code>infer</code>, which lets you extract types from within other types.',
    h2_mapped: 'Mapped Types',
    p_mapped: 'Mapped types let you transform the properties of an existing type to create a new type. They iterate over keys using <code>[K in keyof T]</code> syntax.',
    p_mapped2: 'You can add or remove modifiers like <code>readonly</code> and <code>?</code> (optional) in mapped types.',
    h2_utility: 'Built-in Utility Types',
    p_utility: 'TypeScript ships with many utility types built using generics. Here are the most commonly used ones:',
    tbl_utility_type: 'Utility Type',
    tbl_utility_desc: 'Description',
    tbl_utility_example: 'Example',
    h2_realworld: 'Real-World Patterns',
    h3_api: 'Generic API Response Wrapper',
    p_api: 'One of the most common uses of generics is wrapping API responses in a consistent structure. This ensures every endpoint returns data in the same format while preserving the specific data type.',
    h3_react: 'Generic React Component Props',
    p_react: 'Generics let you build React components that work with different data types while maintaining type safety on props.',
    h3_repo: 'Generic Repository Pattern',
    p_repo: 'The repository pattern abstracts data access behind a generic interface. This allows you to swap data sources without changing business logic.',
    h3_emitter: 'Generic Event Emitter',
    p_emitter: 'A type-safe event emitter ensures that event names and their payloads are correctly typed. No more string-based events with unknown data.',
    h2_mistakes: 'Common Mistakes',
    p_mistakes: 'Here are the most frequent mistakes developers make with generics, along with corrections:',
    tbl_mistake: 'Mistake',
    tbl_problem: 'Problem',
    tbl_correction: 'Correction',
    mistake1_m: 'Using any instead of generics',
    mistake1_p: 'Loses all type information',
    mistake1_c: 'Use a type parameter T instead of any',
    mistake2_m: 'Over-constraining type params',
    mistake2_p: 'Makes the generic unusable for valid types',
    mistake2_c: 'Only constrain to what you actually need',
    mistake3_m: 'Unnecessary type parameters',
    mistake3_p: 'Adding T that is used only once adds complexity',
    mistake3_c: 'If T appears only in return type, just use the concrete type',
    mistake4_m: 'Not using constraints when accessing properties',
    mistake4_p: 'TypeScript error: Property does not exist on type T',
    mistake4_c: 'Add extends constraint: T extends { prop: type }',
    mistake5_m: 'Confusing generic defaults with constraints',
    mistake5_p: 'Default type does not restrict — callers can still pass other types',
    mistake5_c: 'Use extends for restriction, = for default',
    mistake6_m: 'Not inferring when possible',
    mistake6_p: 'Explicitly passing types when TS can infer them',
    mistake6_c: 'Let TypeScript infer types from arguments when possible',
    mistake7_m: 'Using T[] when you mean readonly T[]',
    mistake7_p: 'Allows mutation of arrays that should be read-only',
    mistake7_c: 'Use readonly T[] for immutable data from APIs',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between generics and the any type?',
    faq1_a: 'Generics preserve type information throughout the function or class, while any discards it. With generics, if you pass a string, TypeScript knows the return type is also string. With any, all type information is lost.',
    faq2_q: 'When should I use generics vs function overloads?',
    faq2_a: 'Use generics when the logic is the same for all types and you just need to preserve type relationships. Use overloads when the implementation differs based on input types, or when you need to map specific input types to specific output types.',
    faq3_q: 'Can I use generics with arrow functions in TSX files?',
    faq3_a: 'Yes, but you need to add a trailing comma to avoid JSX ambiguity: const fn = &lt;T,&gt;(arg: T): T =&gt; arg. The comma tells the parser this is a generic, not a JSX tag.',
    faq4_q: 'How many type parameters should a generic have?',
    faq4_a: 'As few as possible. One or two is common. Three is sometimes necessary. If you need more than three, consider refactoring — your abstraction may be too complex. Each type parameter should serve a clear purpose.',
    faq5_q: 'Do generics affect runtime performance?',
    faq5_a: 'No. Generics are purely a compile-time feature. They are completely erased during compilation and produce no runtime overhead. The generated JavaScript has no trace of generic type parameters.',
    faq6_q: 'What is the naming convention for type parameters?',
    faq6_a: 'Single uppercase letters are conventional: T for type, K for key, V for value, E for element, R for return type. For complex generics with multiple parameters, descriptive names like TData, TError are acceptable and improve readability.',
  },
  zh: {
    title: 'TypeScript 泛型详解：带实例的实用指南',
    intro: 'TypeScript 泛型是类型系统中最强大的特性之一。它允许你通过参数化类型来编写<strong>灵活、可复用且类型安全</strong>的代码。泛型让你无需为每种数据类型重复编写函数或类，只需编写一次即可与任何类型一起使用，同时保持完整的类型安全。本指南涵盖从基础到高级模式的所有内容。',
    h2_first: '你的第一个泛型函数',
    p_first: '经典的起点是<strong>身份函数</strong>——一个返回其接收内容的函数。如果不使用泛型，你要么使用 <code>any</code> 丢失类型信息，要么为每种类型编写单独的函数。',
    p_first2: '使用泛型，你定义一个<strong>类型参数</strong>（通常命名为 <code>T</code>），作为占位符。调用函数时，TypeScript 会自动推断实际类型。',
    h2_functions: '泛型函数',
    p_functions: '泛型函数可以接受<strong>多个类型参数</strong>，甚至可以有<strong>默认类型</strong>。这使它们在构建工具函数时非常灵活。',
    p_functions2: '默认类型参数的工作方式与默认函数参数相同——如果调用者未指定类型，则使用默认类型。',
    h2_interfaces: '泛型接口和类型',
    p_interfaces: '泛型不仅限于函数。你可以参数化<strong>接口</strong>和<strong>类型别名</strong>，创建适用于任何类型的灵活数据结构。',
    p_interfaces2: '泛型接口在定义 API 响应、集合和数据容器的结构时特别有用。',
    h2_classes: '泛型类',
    p_classes: '类也可以是泛型的。这对于构建栈、队列、链表等<strong>数据结构</strong>或任何需要与多种类型一起工作的容器非常有用。',
    p_classes2: '类型参数在整个类中都可用——在属性、方法参数和返回类型中。',
    h2_constraints: '使用 extends 的泛型约束',
    p_constraints: '不受约束的泛型接受任何类型，但有时你需要<strong>缩小</strong>允许的类型范围。<code>extends</code> 关键字让你可以添加约束。',
    h3_keyof: '使用 keyof 约束对象键',
    p_keyof: '一个非常常见的模式是将类型参数约束为另一个类型的有效键。这确保了类型安全的属性访问。',
    h3_shapes: '约束到特定结构',
    p_shapes: '你可以通过扩展接口或对象类型来要求类型参数具有某些属性。',
    h2_conditional: '条件类型',
    p_conditional: '条件类型允许你根据条件在两种类型之间选择，使用 <code>T extends U ? X : Y</code> 语法。它们是许多高级类型计算的基础。',
    p_conditional2: '条件类型与 <code>infer</code> 结合时变得特别强大，后者允许你从其他类型内部提取类型。',
    h2_mapped: '映射类型',
    p_mapped: '映射类型允许你转换现有类型的属性来创建新类型。它们使用 <code>[K in keyof T]</code> 语法遍历键。',
    p_mapped2: '你可以在映射类型中添加或删除 <code>readonly</code> 和 <code>?</code>（可选）等修饰符。',
    h2_utility: '内置工具类型',
    p_utility: 'TypeScript 附带了许多使用泛型构建的工具类型。以下是最常用的：',
    tbl_utility_type: '工具类型',
    tbl_utility_desc: '描述',
    tbl_utility_example: '示例',
    h2_realworld: '真实世界的模式',
    h3_api: '泛型 API 响应包装器',
    p_api: '泛型最常见的用途之一是用一致的结构包装 API 响应。这确保每个端点都以相同的格式返回数据，同时保留特定的数据类型。',
    h3_react: '泛型 React 组件 Props',
    p_react: '泛型让你构建适用于不同数据类型的 React 组件，同时保持 props 的类型安全。',
    h3_repo: '泛型仓储模式',
    p_repo: '仓储模式将数据访问抽象在泛型接口背后。这允许你在不更改业务逻辑的情况下切换数据源。',
    h3_emitter: '泛型事件发射器',
    p_emitter: '类型安全的事件发射器确保事件名称及其负载被正确类型化。不再有未知数据的字符串事件。',
    h2_mistakes: '常见错误',
    p_mistakes: '以下是开发者在使用泛型时最常犯的错误及其修正：',
    tbl_mistake: '错误',
    tbl_problem: '问题',
    tbl_correction: '修正',
    mistake1_m: '使用 any 代替泛型',
    mistake1_p: '丢失所有类型信息',
    mistake1_c: '使用类型参数 T 代替 any',
    mistake2_m: '过度约束类型参数',
    mistake2_p: '使泛型对有效类型不可用',
    mistake2_c: '只约束你实际需要的部分',
    mistake3_m: '不必要的类型参数',
    mistake3_p: '添加只使用一次的 T 增加了复杂性',
    mistake3_c: '如果 T 只出现在返回类型中，直接使用具体类型',
    mistake4_m: '访问属性时不使用约束',
    mistake4_p: 'TypeScript 错误：类型 T 上不存在属性',
    mistake4_c: '添加 extends 约束：T extends { prop: type }',
    mistake5_m: '混淆泛型默认值和约束',
    mistake5_p: '默认类型不限制——调用者仍可传递其他类型',
    mistake5_c: '用 extends 限制，用 = 设置默认值',
    mistake6_m: '没有在可能时进行推断',
    mistake6_p: '在 TS 可以推断时显式传递类型',
    mistake6_c: '尽可能让 TypeScript 从参数推断类型',
    mistake7_m: '使用 T[] 而不是 readonly T[]',
    mistake7_p: '允许修改应为只读的数组',
    mistake7_c: '对来自 API 的不可变数据使用 readonly T[]',
    h2_faq: '常见问题',
    faq1_q: '泛型和 any 类型有什么区别？',
    faq1_a: '泛型在整个函数或类中保留类型信息，而 any 会丢弃它。使用泛型，如果传入字符串，TypeScript 知道返回类型也是字符串。使用 any，所有类型信息都会丢失。',
    faq2_q: '什么时候应该使用泛型而不是函数重载？',
    faq2_a: '当逻辑对所有类型相同且你只需要保留类型关系时使用泛型。当实现因输入类型而异，或需要将特定输入类型映射到特定输出类型时使用重载。',
    faq3_q: '在 TSX 文件中可以将泛型用于箭头函数吗？',
    faq3_a: '可以，但需要添加尾随逗号以避免 JSX 歧义：const fn = &lt;T,&gt;(arg: T): T =&gt; arg。逗号告诉解析器这是泛型，不是 JSX 标签。',
    faq4_q: '泛型应该有多少个类型参数？',
    faq4_a: '越少越好。一到两个很常见。三个有时是必要的。如果需要三个以上，考虑重构——你的抽象可能过于复杂。每个类型参数都应有明确的用途。',
    faq5_q: '泛型会影响运行时性能吗？',
    faq5_a: '不会。泛型纯粹是编译时特性。它们在编译过程中被完全擦除，不会产生运行时开销。生成的 JavaScript 中没有泛型类型参数的痕迹。',
    faq6_q: '类型参数的命名约定是什么？',
    faq6_a: '单个大写字母是惯例：T 表示类型，K 表示键，V 表示值，E 表示元素，R 表示返回类型。对于有多个参数的复杂泛型，TData、TError 等描述性名称也可以接受，并能提高可读性。',
  },
  ja: {
    title: 'TypeScript ジェネリクス解説：実例で学ぶ実践ガイド',
    intro: 'TypeScript のジェネリクスは型システムで最も強力な機能の一つです。型をパラメータ化することで、<strong>柔軟で再利用可能かつ型安全</strong>なコードを書くことができます。ジェネリクスを使えば、すべてのデータ型に対して関数やクラスを複製する必要がなく、一度書けば完全な型安全性を維持しながら任意の型で使用できます。このガイドでは基礎から高度なパターンまですべてカバーします。',
    h2_first: '最初のジェネリック関数',
    p_first: '典型的な出発点は<strong>恒等関数</strong>です。受け取ったものをそのまま返す関数です。ジェネリクスなしでは、<code>any</code> を使って型情報を失うか、各型に別々の関数を書く必要があります。',
    p_first2: 'ジェネリクスでは、プレースホルダーとして機能する<strong>型パラメータ</strong>（慣例的に <code>T</code> と命名）を定義します。関数を呼び出すと、TypeScript が実際の型を自動的に推論します。',
    h2_functions: 'ジェネリック関数',
    p_functions: 'ジェネリック関数は<strong>複数の型パラメータ</strong>を受け取り、<strong>デフォルト型</strong>を持つこともできます。これにより、ユーティリティ関数の構築において非常に汎用的になります。',
    p_functions2: 'デフォルト型パラメータはデフォルト関数パラメータと同じように機能します。呼び出し側が型を指定しない場合、デフォルトが使用されます。',
    h2_interfaces: 'ジェネリックインターフェースと型',
    p_interfaces: 'ジェネリクスは関数に限定されません。<strong>インターフェース</strong>や<strong>型エイリアス</strong>をパラメータ化して、任意の型で動作する柔軟なデータ構造を作成できます。',
    p_interfaces2: 'ジェネリックインターフェースは API レスポンス、コレクション、データコンテナの形状を定義する際に特に便利です。',
    h2_classes: 'ジェネリッククラス',
    p_classes: 'クラスもジェネリックにできます。スタック、キュー、リンクリストなどの<strong>データ構造</strong>や、複数の型で動作する必要があるコンテナの構築に便利です。',
    p_classes2: '型パラメータはクラス全体で利用可能です。プロパティ、メソッドパラメータ、戻り値の型で使えます。',
    h2_constraints: 'extends によるジェネリック制約',
    p_constraints: '制約のないジェネリクスはあらゆる型を受け入れますが、許可される型を<strong>絞り込む</strong>必要がある場合があります。<code>extends</code> キーワードで制約を追加できます。',
    h3_keyof: 'keyof によるオブジェクトキーの制約',
    p_keyof: '非常に一般的なパターンは、型パラメータを別の型の有効なキーに制約することです。これにより型安全なプロパティアクセスが保証されます。',
    h3_shapes: '特定の形状への制約',
    p_shapes: 'インターフェースやオブジェクト型を拡張することで、型パラメータに特定のプロパティを要求できます。',
    h2_conditional: '条件型',
    p_conditional: '条件型は <code>T extends U ? X : Y</code> 構文を使用して、条件に基づいて2つの型から選択できます。多くの高度な型レベルの計算の基盤です。',
    p_conditional2: '条件型は <code>infer</code> と組み合わせると特に強力になります。infer を使うと他の型の中から型を抽出できます。',
    h2_mapped: 'マップ型',
    p_mapped: 'マップ型は既存の型のプロパティを変換して新しい型を作成します。<code>[K in keyof T]</code> 構文でキーを反復します。',
    p_mapped2: 'マップ型では <code>readonly</code> や <code>?</code>（オプション）などの修飾子を追加・削除できます。',
    h2_utility: '組み込みユーティリティ型',
    p_utility: 'TypeScript にはジェネリクスで構築された多くのユーティリティ型が付属しています。最もよく使用されるものを紹介します：',
    tbl_utility_type: 'ユーティリティ型',
    tbl_utility_desc: '説明',
    tbl_utility_example: '例',
    h2_realworld: '実践的なパターン',
    h3_api: 'ジェネリック API レスポンスラッパー',
    p_api: 'ジェネリクスの最も一般的な使用法の一つは、API レスポンスを一貫した構造でラップすることです。各エンドポイントが特定のデータ型を保持しながら同じ形式でデータを返すことを保証します。',
    h3_react: 'ジェネリック React コンポーネント Props',
    p_react: 'ジェネリクスを使えば、props の型安全性を維持しながら、異なるデータ型で動作する React コンポーネントを構築できます。',
    h3_repo: 'ジェネリックリポジトリパターン',
    p_repo: 'リポジトリパターンはジェネリックインターフェースの背後にデータアクセスを抽象化します。ビジネスロジックを変更せずにデータソースを交換できます。',
    h3_emitter: 'ジェネリックイベントエミッター',
    p_emitter: '型安全なイベントエミッターにより、イベント名とペイロードが正しく型付けされます。未知のデータを持つ文字列ベースのイベントは不要になります。',
    h2_mistakes: 'よくある間違い',
    p_mistakes: '開発者がジェネリクスで犯す最も頻繁な間違いとその修正方法：',
    tbl_mistake: '間違い',
    tbl_problem: '問題',
    tbl_correction: '修正',
    mistake1_m: 'ジェネリクスの代わりに any を使用',
    mistake1_p: 'すべての型情報が失われる',
    mistake1_c: 'any の代わりに型パラメータ T を使用',
    mistake2_m: '型パラメータの過度な制約',
    mistake2_p: '有効な型でジェネリクスが使えなくなる',
    mistake2_c: '実際に必要なものだけを制約する',
    mistake3_m: '不要な型パラメータ',
    mistake3_p: '一度しか使わない T を追加すると複雑さが増す',
    mistake3_c: 'T が戻り値の型にのみ現れる場合は具体的な型を使用',
    mistake4_m: 'プロパティアクセス時に制約を使用しない',
    mistake4_p: 'TypeScript エラー：型 T にプロパティが存在しない',
    mistake4_c: 'extends 制約を追加：T extends { prop: type }',
    mistake5_m: 'ジェネリックのデフォルトと制約の混同',
    mistake5_p: 'デフォルト型は制限しない。呼び出し側は他の型を渡せる',
    mistake5_c: '制限には extends を、デフォルトには = を使用',
    mistake6_m: '可能な場合に推論を使わない',
    mistake6_p: 'TS が推論できるのに明示的に型を渡している',
    mistake6_c: '可能な限り TypeScript に引数から型を推論させる',
    mistake7_m: 'readonly T[] の代わりに T[] を使用',
    mistake7_p: '読み取り専用であるべき配列の変更を許可してしまう',
    mistake7_c: 'API からの不変データには readonly T[] を使用',
    h2_faq: 'よくある質問',
    faq1_q: 'ジェネリクスと any 型の違いは何ですか？',
    faq1_a: 'ジェネリクスは関数やクラス全体で型情報を保持しますが、any はそれを破棄します。ジェネリクスでは文字列を渡すと、TypeScript は戻り値の型も文字列であることを知っています。any ではすべての型情報が失われます。',
    faq2_q: 'ジェネリクスと関数オーバーロード、いつどちらを使うべきですか？',
    faq2_a: 'すべての型でロジックが同じで型の関係を保持するだけの場合はジェネリクスを使用します。入力型によって実装が異なる場合や、特定の入力型を特定の出力型にマッピングする必要がある場合はオーバーロードを使用します。',
    faq3_q: 'TSX ファイルでアロー関数にジェネリクスを使えますか？',
    faq3_a: 'はい。ただし JSX の曖昧さを避けるためにトレイリングカンマを追加する必要があります：const fn = &lt;T,&gt;(arg: T): T =&gt; arg。カンマがパーサーにこれが JSX タグではなくジェネリクスであることを伝えます。',
    faq4_q: 'ジェネリクスの型パラメータはいくつにすべきですか？',
    faq4_a: 'できるだけ少なく。1～2個が一般的です。3個が必要な場合もあります。3個以上必要な場合はリファクタリングを検討してください。各型パラメータには明確な目的が必要です。',
    faq5_q: 'ジェネリクスは実行時のパフォーマンスに影響しますか？',
    faq5_a: 'いいえ。ジェネリクスは純粋にコンパイル時の機能です。コンパイル中に完全に消去され、実行時のオーバーヘッドは発生しません。生成された JavaScript にはジェネリック型パラメータの痕跡はありません。',
    faq6_q: '型パラメータの命名規則は何ですか？',
    faq6_a: '単一の大文字が慣例です：T は型、K はキー、V は値、E は要素、R は戻り値の型。複数パラメータの複雑なジェネリクスでは TData、TError などの説明的な名前も許容され、可読性が向上します。',
  },
  ko: {
    title: 'TypeScript 제네릭 설명: 예제로 배우는 실전 가이드',
    intro: 'TypeScript 제네릭은 타입 시스템에서 가장 강력한 기능 중 하나입니다. 타입을 매개변수화하여 <strong>유연하고 재사용 가능하며 타입 안전한</strong> 코드를 작성할 수 있습니다. 모든 데이터 타입에 대해 함수나 클래스를 복제할 필요 없이 한 번 작성하면 완전한 타입 안전성을 유지하면서 모든 타입에 사용할 수 있습니다. 이 가이드는 기초부터 고급 패턴까지 모든 것을 다룹니다.',
    h2_first: '첫 번째 제네릭 함수',
    p_first: '전형적인 시작점은 <strong>항등 함수</strong>입니다. 받은 것을 그대로 반환하는 함수입니다. 제네릭 없이는 <code>any</code>를 사용하여 타입 정보를 잃거나 각 타입에 대해 별도의 함수를 작성해야 합니다.',
    p_first2: '제네릭을 사용하면 플레이스홀더 역할을 하는 <strong>타입 매개변수</strong>(관례적으로 <code>T</code>로 명명)를 정의합니다. 함수를 호출하면 TypeScript가 자동으로 실제 타입을 추론합니다.',
    h2_functions: '제네릭 함수',
    p_functions: '제네릭 함수는 <strong>여러 타입 매개변수</strong>를 받을 수 있으며 <strong>기본 타입</strong>도 가질 수 있습니다. 이를 통해 유틸리티 함수 구축에 매우 다양하게 활용됩니다.',
    p_functions2: '기본 타입 매개변수는 기본 함수 매개변수와 동일하게 작동합니다. 호출자가 타입을 지정하지 않으면 기본값이 사용됩니다.',
    h2_interfaces: '제네릭 인터페이스와 타입',
    p_interfaces: '제네릭은 함수에만 국한되지 않습니다. <strong>인터페이스</strong>와 <strong>타입 별칭</strong>을 매개변수화하여 모든 타입에서 작동하는 유연한 데이터 구조를 만들 수 있습니다.',
    p_interfaces2: '제네릭 인터페이스는 API 응답, 컬렉션, 데이터 컨테이너의 형태를 정의할 때 특히 유용합니다.',
    h2_classes: '제네릭 클래스',
    p_classes: '클래스도 제네릭이 될 수 있습니다. 스택, 큐, 연결 리스트 같은 <strong>데이터 구조</strong>나 여러 타입과 함께 작동해야 하는 컨테이너를 구축할 때 유용합니다.',
    p_classes2: '타입 매개변수는 클래스 전체에서 사용 가능합니다. 속성, 메서드 매개변수, 반환 타입에서 사용할 수 있습니다.',
    h2_constraints: 'extends를 사용한 제네릭 제약',
    p_constraints: '제약 없는 제네릭은 모든 타입을 받지만, 허용되는 타입을 <strong>좁혀야</strong> 할 때가 있습니다. <code>extends</code> 키워드로 제약을 추가할 수 있습니다.',
    h3_keyof: 'keyof로 객체 키 제약',
    p_keyof: '매우 일반적인 패턴은 타입 매개변수를 다른 타입의 유효한 키로 제약하는 것입니다. 이를 통해 타입 안전한 속성 접근이 보장됩니다.',
    h3_shapes: '특정 형태로 제약',
    p_shapes: '인터페이스나 객체 타입을 확장하여 타입 매개변수에 특정 속성을 요구할 수 있습니다.',
    h2_conditional: '조건부 타입',
    p_conditional: '조건부 타입은 <code>T extends U ? X : Y</code> 구문을 사용하여 조건에 따라 두 타입 중 하나를 선택할 수 있습니다. 많은 고급 타입 수준 계산의 기반입니다.',
    p_conditional2: '조건부 타입은 <code>infer</code>와 결합하면 특히 강력해집니다. infer를 사용하면 다른 타입 내부에서 타입을 추출할 수 있습니다.',
    h2_mapped: '매핑된 타입',
    p_mapped: '매핑된 타입은 기존 타입의 속성을 변환하여 새 타입을 만듭니다. <code>[K in keyof T]</code> 구문으로 키를 반복합니다.',
    p_mapped2: '매핑된 타입에서 <code>readonly</code>와 <code>?</code>(선택적) 같은 수정자를 추가하거나 제거할 수 있습니다.',
    h2_utility: '내장 유틸리티 타입',
    p_utility: 'TypeScript에는 제네릭으로 구축된 많은 유틸리티 타입이 포함되어 있습니다. 가장 많이 사용되는 것들을 소개합니다:',
    tbl_utility_type: '유틸리티 타입',
    tbl_utility_desc: '설명',
    tbl_utility_example: '예시',
    h2_realworld: '실전 패턴',
    h3_api: '제네릭 API 응답 래퍼',
    p_api: '제네릭의 가장 일반적인 사용 중 하나는 API 응답을 일관된 구조로 래핑하는 것입니다. 모든 엔드포인트가 특정 데이터 타입을 보존하면서 동일한 형식으로 데이터를 반환하도록 보장합니다.',
    h3_react: '제네릭 React 컴포넌트 Props',
    p_react: '제네릭을 사용하면 props의 타입 안전성을 유지하면서 다양한 데이터 타입에서 작동하는 React 컴포넌트를 구축할 수 있습니다.',
    h3_repo: '제네릭 리포지토리 패턴',
    p_repo: '리포지토리 패턴은 제네릭 인터페이스 뒤에 데이터 접근을 추상화합니다. 비즈니스 로직을 변경하지 않고 데이터 소스를 교체할 수 있습니다.',
    h3_emitter: '제네릭 이벤트 이미터',
    p_emitter: '타입 안전한 이벤트 이미터는 이벤트 이름과 페이로드가 올바르게 타입화되도록 보장합니다. 알 수 없는 데이터가 있는 문자열 기반 이벤트는 더 이상 필요 없습니다.',
    h2_mistakes: '흔한 실수',
    p_mistakes: '개발자가 제네릭에서 가장 자주 범하는 실수와 수정 방법:',
    tbl_mistake: '실수',
    tbl_problem: '문제',
    tbl_correction: '수정',
    mistake1_m: '제네릭 대신 any 사용',
    mistake1_p: '모든 타입 정보 손실',
    mistake1_c: 'any 대신 타입 매개변수 T 사용',
    mistake2_m: '타입 매개변수 과도한 제약',
    mistake2_p: '유효한 타입에 대해 제네릭 사용 불가',
    mistake2_c: '실제로 필요한 것만 제약',
    mistake3_m: '불필요한 타입 매개변수',
    mistake3_p: '한 번만 사용되는 T 추가는 복잡성 증가',
    mistake3_c: 'T가 반환 타입에만 나타나면 구체적 타입 사용',
    mistake4_m: '속성 접근 시 제약 미사용',
    mistake4_p: 'TypeScript 오류: 타입 T에 속성이 존재하지 않음',
    mistake4_c: 'extends 제약 추가: T extends { prop: type }',
    mistake5_m: '제네릭 기본값과 제약 혼동',
    mistake5_p: '기본 타입은 제한하지 않음. 호출자가 다른 타입 전달 가능',
    mistake5_c: '제한에는 extends, 기본값에는 = 사용',
    mistake6_m: '추론 가능할 때 추론 미사용',
    mistake6_p: 'TS가 추론할 수 있는데 명시적으로 타입 전달',
    mistake6_c: '가능하면 TypeScript가 인수에서 타입을 추론하게 하기',
    mistake7_m: 'readonly T[] 대신 T[] 사용',
    mistake7_p: '읽기 전용이어야 할 배열의 변경 허용',
    mistake7_c: 'API의 불변 데이터에는 readonly T[] 사용',
    h2_faq: '자주 묻는 질문',
    faq1_q: '제네릭과 any 타입의 차이점은 무엇인가요?',
    faq1_a: '제네릭은 함수나 클래스 전체에서 타입 정보를 보존하지만, any는 이를 버립니다. 제네릭으로 문자열을 전달하면 TypeScript는 반환 타입도 문자열임을 알지만, any에서는 모든 타입 정보가 손실됩니다.',
    faq2_q: '제네릭과 함수 오버로드 중 언제 어떤 것을 사용해야 하나요?',
    faq2_a: '모든 타입에 대해 로직이 동일하고 타입 관계만 보존하면 되는 경우 제네릭을 사용합니다. 입력 타입에 따라 구현이 다르거나 특정 입력 타입을 특정 출력 타입에 매핑해야 할 때는 오버로드를 사용합니다.',
    faq3_q: 'TSX 파일에서 화살표 함수에 제네릭을 사용할 수 있나요?',
    faq3_a: '네, 하지만 JSX 모호성을 피하기 위해 후행 쉼표를 추가해야 합니다: const fn = &lt;T,&gt;(arg: T): T =&gt; arg. 쉼표가 파서에게 이것이 JSX 태그가 아닌 제네릭임을 알려줍니다.',
    faq4_q: '제네릭에 타입 매개변수가 몇 개여야 하나요?',
    faq4_a: '가능한 적게. 1~2개가 일반적입니다. 3개가 필요한 경우도 있습니다. 3개 이상 필요하면 리팩토링을 고려하세요. 각 타입 매개변수는 명확한 목적이 있어야 합니다.',
    faq5_q: '제네릭이 런타임 성능에 영향을 미치나요?',
    faq5_a: '아닙니다. 제네릭은 순수하게 컴파일 타임 기능입니다. 컴파일 중 완전히 제거되며 런타임 오버헤드가 없습니다. 생성된 JavaScript에는 제네릭 타입 매개변수의 흔적이 없습니다.',
    faq6_q: '타입 매개변수의 명명 규칙은 무엇인가요?',
    faq6_a: '단일 대문자가 관례입니다: T는 타입, K는 키, V는 값, E는 요소, R은 반환 타입. 여러 매개변수가 있는 복잡한 제네릭의 경우 TData, TError 같은 설명적 이름도 허용되며 가독성을 높여줍니다.',
  },
  fr: {
    title: 'Les Generics TypeScript Expliques : Guide Pratique avec Exemples',
    intro: 'Les generics TypeScript sont l\'une des fonctionnalites les plus puissantes du systeme de types. Ils vous permettent d\'ecrire du code <strong>flexible, reutilisable et type-safe</strong> en parametrant les types. Au lieu de dupliquer des fonctions ou des classes pour chaque type de donnees, les generics vous permettent d\'ecrire une seule fois et d\'utiliser avec n\'importe quel type tout en maintenant une securite de type complete. Ce guide couvre tout, des bases aux patterns avances.',
    h2_first: 'Votre Premiere Fonction Generique',
    p_first: 'Le point de depart classique est la <strong>fonction identite</strong> — une fonction qui retourne exactement ce qu\'elle recoit. Sans generics, vous perdriez les informations de type en utilisant <code>any</code>, ou vous devriez ecrire des fonctions separees pour chaque type.',
    p_first2: 'Avec les generics, vous definissez un <strong>parametre de type</strong> (conventionnellement nomme <code>T</code>) qui agit comme un espace reservee. Lorsque vous appelez la fonction, TypeScript infere automatiquement le type reel.',
    h2_functions: 'Fonctions Generiques',
    p_functions: 'Les fonctions generiques peuvent accepter <strong>plusieurs parametres de type</strong> et meme avoir des <strong>types par defaut</strong>. Cela les rend incroyablement polyvalentes pour construire des fonctions utilitaires.',
    p_functions2: 'Les parametres de type par defaut fonctionnent comme les parametres de fonction par defaut — si l\'appelant ne specifie pas de type, le type par defaut est utilise.',
    h2_interfaces: 'Interfaces et Types Generiques',
    p_interfaces: 'Les generics ne se limitent pas aux fonctions. Vous pouvez parametrer des <strong>interfaces</strong> et des <strong>alias de type</strong> pour creer des structures de donnees flexibles.',
    p_interfaces2: 'Les interfaces generiques sont particulierement utiles pour definir la forme des reponses API, des collections et des conteneurs de donnees.',
    h2_classes: 'Classes Generiques',
    p_classes: 'Les classes peuvent aussi etre generiques. C\'est utile pour construire des <strong>structures de donnees</strong> comme les piles, files d\'attente, listes chainees, ou tout conteneur devant fonctionner avec plusieurs types.',
    p_classes2: 'Le parametre de type est disponible dans toute la classe — dans les proprietes, parametres de methode et types de retour.',
    h2_constraints: 'Contraintes Generiques avec extends',
    p_constraints: 'Les generics sans contrainte acceptent n\'importe quel type, mais parfois vous devez <strong>restreindre</strong> les types autorises. Le mot-cle <code>extends</code> permet d\'ajouter des contraintes.',
    h3_keyof: 'Contraindre aux Cles d\'Objet avec keyof',
    p_keyof: 'Un pattern tres courant est de contraindre un parametre de type a etre une cle valide d\'un autre type. Cela garantit un acces aux proprietes type-safe.',
    h3_shapes: 'Contraindre a des Formes Specifiques',
    p_shapes: 'Vous pouvez exiger qu\'un parametre de type possede certaines proprietes en etendant une interface ou un type objet.',
    h2_conditional: 'Types Conditionnels',
    p_conditional: 'Les types conditionnels permettent de choisir entre deux types selon une condition, avec la syntaxe <code>T extends U ? X : Y</code>. Ils sont la base de nombreux calculs avances au niveau des types.',
    p_conditional2: 'Les types conditionnels deviennent particulierement puissants combines avec <code>infer</code>, qui permet d\'extraire des types depuis d\'autres types.',
    h2_mapped: 'Types Mappes',
    p_mapped: 'Les types mappes transforment les proprietes d\'un type existant pour creer un nouveau type. Ils iterent sur les cles avec la syntaxe <code>[K in keyof T]</code>.',
    p_mapped2: 'Vous pouvez ajouter ou supprimer des modificateurs comme <code>readonly</code> et <code>?</code> dans les types mappes.',
    h2_utility: 'Types Utilitaires Integres',
    p_utility: 'TypeScript inclut de nombreux types utilitaires construits avec des generics. Voici les plus couramment utilises :',
    tbl_utility_type: 'Type Utilitaire',
    tbl_utility_desc: 'Description',
    tbl_utility_example: 'Exemple',
    h2_realworld: 'Patterns du Monde Reel',
    h3_api: 'Wrapper de Reponse API Generique',
    p_api: 'L\'une des utilisations les plus courantes des generics est d\'envelopper les reponses API dans une structure coherente.',
    h3_react: 'Props de Composant React Generique',
    p_react: 'Les generics permettent de construire des composants React fonctionnant avec differents types tout en maintenant la securite de type sur les props.',
    h3_repo: 'Pattern Repository Generique',
    p_repo: 'Le pattern repository abstrait l\'acces aux donnees derriere une interface generique, permettant de changer de source de donnees sans modifier la logique metier.',
    h3_emitter: 'Emetteur d\'Evenements Generique',
    p_emitter: 'Un emetteur d\'evenements type-safe garantit que les noms d\'evenements et leurs charges utiles sont correctement types.',
    h2_mistakes: 'Erreurs Courantes',
    p_mistakes: 'Voici les erreurs les plus frequentes avec les generics et leurs corrections :',
    tbl_mistake: 'Erreur',
    tbl_problem: 'Probleme',
    tbl_correction: 'Correction',
    mistake1_m: 'Utiliser any au lieu des generics',
    mistake1_p: 'Perte de toutes les informations de type',
    mistake1_c: 'Utiliser un parametre de type T au lieu de any',
    mistake2_m: 'Sur-contraindre les parametres de type',
    mistake2_p: 'Rend le generique inutilisable pour des types valides',
    mistake2_c: 'Ne contraindre que ce dont vous avez besoin',
    mistake3_m: 'Parametres de type inutiles',
    mistake3_p: 'Ajouter T utilise une seule fois ajoute de la complexite',
    mistake3_c: 'Si T apparait seulement dans le type de retour, utiliser le type concret',
    mistake4_m: 'Ne pas utiliser de contraintes lors de l\'acces aux proprietes',
    mistake4_p: 'Erreur TypeScript : la propriete n\'existe pas sur le type T',
    mistake4_c: 'Ajouter une contrainte extends : T extends { prop: type }',
    mistake5_m: 'Confondre les valeurs par defaut et les contraintes',
    mistake5_p: 'Le type par defaut ne restreint pas — les appelants peuvent passer d\'autres types',
    mistake5_c: 'Utiliser extends pour restreindre, = pour le defaut',
    mistake6_m: 'Ne pas inferer quand c\'est possible',
    mistake6_p: 'Passer explicitement les types quand TS peut les inferer',
    mistake6_c: 'Laisser TypeScript inferer les types depuis les arguments',
    mistake7_m: 'Utiliser T[] au lieu de readonly T[]',
    mistake7_p: 'Permet la mutation de tableaux qui devraient etre en lecture seule',
    mistake7_c: 'Utiliser readonly T[] pour les donnees immuables des APIs',
    h2_faq: 'Questions Frequemment Posees',
    faq1_q: 'Quelle est la difference entre les generics et le type any ?',
    faq1_a: 'Les generics preservent les informations de type tandis que any les supprime. Avec les generics, si vous passez une chaine, TypeScript sait que le retour est aussi une chaine. Avec any, toutes les informations de type sont perdues.',
    faq2_q: 'Quand utiliser les generics vs les surcharges de fonctions ?',
    faq2_a: 'Utilisez les generics quand la logique est identique pour tous les types. Utilisez les surcharges quand l\'implementation differe selon les types d\'entree.',
    faq3_q: 'Peut-on utiliser les generics avec les fonctions flechees dans les fichiers TSX ?',
    faq3_a: 'Oui, mais ajoutez une virgule finale pour eviter l\'ambiguite JSX : const fn = &lt;T,&gt;(arg: T): T =&gt; arg.',
    faq4_q: 'Combien de parametres de type un generique devrait-il avoir ?',
    faq4_a: 'Le moins possible. Un ou deux est courant. Trois est parfois necessaire. Au-dela, envisagez un refactoring.',
    faq5_q: 'Les generics affectent-ils les performances a l\'execution ?',
    faq5_a: 'Non. Les generics sont purement une fonctionnalite de compilation. Ils sont completement effaces et ne generent aucun surcout a l\'execution.',
    faq6_q: 'Quelle est la convention de nommage des parametres de type ?',
    faq6_a: 'Les lettres majuscules uniques sont conventionnelles : T pour type, K pour cle, V pour valeur, E pour element, R pour type de retour. Pour les generics complexes, des noms descriptifs comme TData sont acceptables.',
  },
  de: {
    title: 'TypeScript Generics Erklaert: Ein Praktischer Leitfaden mit Beispielen',
    intro: 'TypeScript Generics gehoeren zu den maechtigsten Funktionen des Typsystems. Sie ermoeglichen es, <strong>flexiblen, wiederverwendbaren und typsicheren</strong> Code zu schreiben, indem Typen parametrisiert werden. Anstatt Funktionen oder Klassen fuer jeden Datentyp zu duplizieren, koennen Sie mit Generics einmal schreiben und mit jedem Typ verwenden. Dieser Leitfaden behandelt alles von den Grundlagen bis zu fortgeschrittenen Mustern.',
    h2_first: 'Ihre Erste Generische Funktion',
    p_first: 'Der klassische Ausgangspunkt ist die <strong>Identitaetsfunktion</strong> — eine Funktion, die genau das zurueckgibt, was sie empfaengt. Ohne Generics wuerden Sie entweder Typinformationen durch <code>any</code> verlieren oder separate Funktionen fuer jeden Typ schreiben muessen.',
    p_first2: 'Mit Generics definieren Sie einen <strong>Typparameter</strong> (konventionell <code>T</code> genannt), der als Platzhalter dient. Beim Aufruf der Funktion leitet TypeScript den tatsaechlichen Typ automatisch ab.',
    h2_functions: 'Generische Funktionen',
    p_functions: 'Generische Funktionen koennen <strong>mehrere Typparameter</strong> akzeptieren und sogar <strong>Standardtypen</strong> haben. Dies macht sie unglaublich vielseitig.',
    p_functions2: 'Standard-Typparameter funktionieren wie Standard-Funktionsparameter — wenn der Aufrufer keinen Typ angibt, wird der Standard verwendet.',
    h2_interfaces: 'Generische Interfaces und Typen',
    p_interfaces: 'Generics sind nicht auf Funktionen beschraenkt. Sie koennen <strong>Interfaces</strong> und <strong>Type-Aliases</strong> parametrisieren, um flexible Datenstrukturen zu erstellen.',
    p_interfaces2: 'Generische Interfaces sind besonders nuetzlich fuer die Definition von API-Antworten, Sammlungen und Datencontainern.',
    h2_classes: 'Generische Klassen',
    p_classes: 'Klassen koennen ebenfalls generisch sein. Dies ist nuetzlich fuer <strong>Datenstrukturen</strong> wie Stacks, Queues, verkettete Listen oder beliebige Container.',
    p_classes2: 'Der Typparameter ist in der gesamten Klasse verfuegbar — in Eigenschaften, Methodenparametern und Rueckgabetypen.',
    h2_constraints: 'Generische Einschraenkungen mit extends',
    p_constraints: 'Uneingeschraenkte Generics akzeptieren jeden Typ, aber manchmal muessen Sie die erlaubten Typen <strong>einschraenken</strong>. Das <code>extends</code>-Schluesselwort ermoeglicht Einschraenkungen.',
    h3_keyof: 'Einschraenkung auf Objektschluessel mit keyof',
    p_keyof: 'Ein haeufiges Muster ist die Einschraenkung eines Typparameters auf gueltige Schluessel eines anderen Typs.',
    h3_shapes: 'Einschraenkung auf bestimmte Formen',
    p_shapes: 'Sie koennen verlangen, dass ein Typparameter bestimmte Eigenschaften hat, indem Sie ein Interface oder einen Objekttyp erweitern.',
    h2_conditional: 'Bedingte Typen',
    p_conditional: 'Bedingte Typen ermoeglichen die Wahl zwischen zwei Typen basierend auf einer Bedingung mit der Syntax <code>T extends U ? X : Y</code>.',
    p_conditional2: 'Bedingte Typen werden besonders maechtig in Kombination mit <code>infer</code>, womit Typen aus anderen Typen extrahiert werden koennen.',
    h2_mapped: 'Mapped Types',
    p_mapped: 'Mapped Types transformieren die Eigenschaften eines bestehenden Typs, um einen neuen Typ zu erstellen. Sie iterieren ueber Schluessel mit der <code>[K in keyof T]</code>-Syntax.',
    p_mapped2: 'Sie koennen Modifikatoren wie <code>readonly</code> und <code>?</code> in Mapped Types hinzufuegen oder entfernen.',
    h2_utility: 'Eingebaute Utility Types',
    p_utility: 'TypeScript liefert viele mit Generics gebaute Utility Types. Hier sind die am haeufigsten verwendeten:',
    tbl_utility_type: 'Utility Type',
    tbl_utility_desc: 'Beschreibung',
    tbl_utility_example: 'Beispiel',
    h2_realworld: 'Praxismuster',
    h3_api: 'Generischer API-Antwort-Wrapper',
    p_api: 'Eine der haeufigsten Verwendungen von Generics ist das Wrappen von API-Antworten in einer konsistenten Struktur.',
    h3_react: 'Generische React-Komponenten-Props',
    p_react: 'Generics ermoeglicht typsichere React-Komponenten, die mit verschiedenen Datentypen arbeiten.',
    h3_repo: 'Generisches Repository-Muster',
    p_repo: 'Das Repository-Muster abstrahiert den Datenzugriff hinter einem generischen Interface.',
    h3_emitter: 'Generischer Event-Emitter',
    p_emitter: 'Ein typsicherer Event-Emitter stellt sicher, dass Eventnamen und Payloads korrekt typisiert sind.',
    h2_mistakes: 'Haeufige Fehler',
    p_mistakes: 'Hier sind die haeufigsten Fehler mit Generics und deren Korrekturen:',
    tbl_mistake: 'Fehler',
    tbl_problem: 'Problem',
    tbl_correction: 'Korrektur',
    mistake1_m: 'any statt Generics verwenden',
    mistake1_p: 'Verlust aller Typinformationen',
    mistake1_c: 'Typparameter T statt any verwenden',
    mistake2_m: 'Typparameter zu stark einschraenken',
    mistake2_p: 'Macht den Generic fuer gueltige Typen unbrauchbar',
    mistake2_c: 'Nur einschraenken, was wirklich benoetigt wird',
    mistake3_m: 'Unnoetige Typparameter',
    mistake3_p: 'Ein nur einmal verwendetes T erhoeht die Komplexitaet',
    mistake3_c: 'Wenn T nur im Rueckgabetyp vorkommt, konkreten Typ verwenden',
    mistake4_m: 'Keine Einschraenkungen beim Eigenschaftszugriff',
    mistake4_p: 'TypeScript-Fehler: Eigenschaft existiert nicht auf Typ T',
    mistake4_c: 'extends-Einschraenkung hinzufuegen',
    mistake5_m: 'Generische Standardwerte und Einschraenkungen verwechseln',
    mistake5_p: 'Der Standardtyp beschraenkt nicht — Aufrufer koennen andere Typen uebergeben',
    mistake5_c: 'extends zum Einschraenken, = fuer Standard',
    mistake6_m: 'Nicht inferieren, wenn moeglich',
    mistake6_p: 'Explizite Typangabe, wenn TS inferieren kann',
    mistake6_c: 'TypeScript aus Argumenten inferieren lassen',
    mistake7_m: 'T[] statt readonly T[] verwenden',
    mistake7_p: 'Erlaubt Mutation von Arrays, die schreibgeschuetzt sein sollten',
    mistake7_c: 'readonly T[] fuer unveraenderliche API-Daten verwenden',
    h2_faq: 'Haeufig Gestellte Fragen',
    faq1_q: 'Was ist der Unterschied zwischen Generics und dem Typ any?',
    faq1_a: 'Generics bewahren Typinformationen, waehrend any sie verwirft. Mit Generics weiss TypeScript, dass der Rueckgabetyp dem Eingabetyp entspricht.',
    faq2_q: 'Wann sollte man Generics vs. Funktionsueberladungen verwenden?',
    faq2_a: 'Verwenden Sie Generics, wenn die Logik fuer alle Typen gleich ist. Verwenden Sie Ueberladungen, wenn sich die Implementierung je nach Eingabetyp unterscheidet.',
    faq3_q: 'Kann man Generics mit Pfeilfunktionen in TSX-Dateien verwenden?',
    faq3_a: 'Ja, aber fuegen Sie ein nachstehendes Komma hinzu: const fn = &lt;T,&gt;(arg: T): T =&gt; arg.',
    faq4_q: 'Wie viele Typparameter sollte ein Generic haben?',
    faq4_a: 'So wenige wie moeglich. Ein oder zwei sind ueblich. Bei mehr als drei sollten Sie ein Refactoring in Betracht ziehen.',
    faq5_q: 'Beeinflussen Generics die Laufzeit-Performance?',
    faq5_a: 'Nein. Generics sind rein ein Compile-Time-Feature und werden vollstaendig entfernt.',
    faq6_q: 'Wie lautet die Namenskonvention fuer Typparameter?',
    faq6_a: 'Einzelne Grossbuchstaben sind ueblich: T fuer Typ, K fuer Key, V fuer Value, E fuer Element, R fuer Rueckgabetyp.',
  },
  es: {
    title: 'Genericos en TypeScript Explicados: Guia Practica con Ejemplos',
    intro: 'Los genericos de TypeScript son una de las caracteristicas mas poderosas del sistema de tipos. Te permiten escribir codigo <strong>flexible, reutilizable y seguro en tipos</strong> parametrizando tipos. En lugar de duplicar funciones o clases para cada tipo de dato, los genericos te permiten escribir una vez y usar con cualquier tipo manteniendo la seguridad de tipos completa. Esta guia cubre todo, desde lo basico hasta patrones avanzados.',
    h2_first: 'Tu Primera Funcion Generica',
    p_first: 'El punto de partida clasico es la <strong>funcion identidad</strong> — una funcion que retorna exactamente lo que recibe. Sin genericos, perderas informacion de tipo usando <code>any</code>, o tendras que escribir funciones separadas para cada tipo.',
    p_first2: 'Con genericos, defines un <strong>parametro de tipo</strong> (convencionalmente llamado <code>T</code>) que actua como marcador de posicion. Al llamar la funcion, TypeScript infiere el tipo real automaticamente.',
    h2_functions: 'Funciones Genericas',
    p_functions: 'Las funciones genericas pueden aceptar <strong>multiples parametros de tipo</strong> e incluso tener <strong>tipos predeterminados</strong>. Esto las hace increiblemente versatiles.',
    p_functions2: 'Los parametros de tipo predeterminados funcionan como los parametros de funcion predeterminados — si el llamador no especifica un tipo, se usa el predeterminado.',
    h2_interfaces: 'Interfaces y Tipos Genericos',
    p_interfaces: 'Los genericos no se limitan a funciones. Puedes parametrizar <strong>interfaces</strong> y <strong>alias de tipo</strong> para crear estructuras de datos flexibles.',
    p_interfaces2: 'Las interfaces genericas son especialmente utiles para definir respuestas de API, colecciones y contenedores de datos.',
    h2_classes: 'Clases Genericas',
    p_classes: 'Las clases tambien pueden ser genericas. Esto es util para construir <strong>estructuras de datos</strong> como pilas, colas, listas enlazadas o cualquier contenedor.',
    p_classes2: 'El parametro de tipo esta disponible en toda la clase — en propiedades, parametros de metodo y tipos de retorno.',
    h2_constraints: 'Restricciones Genericas con extends',
    p_constraints: 'Los genericos sin restriccion aceptan cualquier tipo, pero a veces necesitas <strong>limitar</strong> los tipos permitidos. La palabra clave <code>extends</code> permite agregar restricciones.',
    h3_keyof: 'Restringir a Claves de Objeto con keyof',
    p_keyof: 'Un patron muy comun es restringir un parametro de tipo a ser una clave valida de otro tipo.',
    h3_shapes: 'Restringir a Formas Especificas',
    p_shapes: 'Puedes requerir que un parametro de tipo tenga ciertas propiedades extendiendo una interfaz o tipo objeto.',
    h2_conditional: 'Tipos Condicionales',
    p_conditional: 'Los tipos condicionales permiten elegir entre dos tipos basandose en una condicion, usando la sintaxis <code>T extends U ? X : Y</code>.',
    p_conditional2: 'Los tipos condicionales se vuelven especialmente poderosos combinados con <code>infer</code>, que permite extraer tipos de otros tipos.',
    h2_mapped: 'Tipos Mapeados',
    p_mapped: 'Los tipos mapeados transforman las propiedades de un tipo existente para crear uno nuevo. Iteran sobre claves usando la sintaxis <code>[K in keyof T]</code>.',
    p_mapped2: 'Puedes agregar o eliminar modificadores como <code>readonly</code> y <code>?</code> en tipos mapeados.',
    h2_utility: 'Tipos de Utilidad Incorporados',
    p_utility: 'TypeScript incluye muchos tipos de utilidad construidos con genericos. Aqui estan los mas utilizados:',
    tbl_utility_type: 'Tipo de Utilidad',
    tbl_utility_desc: 'Descripcion',
    tbl_utility_example: 'Ejemplo',
    h2_realworld: 'Patrones del Mundo Real',
    h3_api: 'Wrapper de Respuesta API Generico',
    p_api: 'Uno de los usos mas comunes de genericos es envolver respuestas de API en una estructura consistente.',
    h3_react: 'Props de Componente React Generico',
    p_react: 'Los genericos permiten construir componentes React que funcionan con diferentes tipos de datos manteniendo la seguridad de tipos.',
    h3_repo: 'Patron Repository Generico',
    p_repo: 'El patron repository abstrae el acceso a datos detras de una interfaz generica, permitiendo cambiar fuentes de datos sin modificar la logica de negocio.',
    h3_emitter: 'Emisor de Eventos Generico',
    p_emitter: 'Un emisor de eventos type-safe garantiza que los nombres de eventos y sus payloads esten correctamente tipados.',
    h2_mistakes: 'Errores Comunes',
    p_mistakes: 'Aqui estan los errores mas frecuentes con genericos y sus correcciones:',
    tbl_mistake: 'Error',
    tbl_problem: 'Problema',
    tbl_correction: 'Correccion',
    mistake1_m: 'Usar any en lugar de genericos',
    mistake1_p: 'Pierde toda la informacion de tipo',
    mistake1_c: 'Usar parametro de tipo T en lugar de any',
    mistake2_m: 'Sobre-restringir parametros de tipo',
    mistake2_p: 'Hace el generico inutilizable para tipos validos',
    mistake2_c: 'Solo restringir lo que realmente necesitas',
    mistake3_m: 'Parametros de tipo innecesarios',
    mistake3_p: 'Agregar T usado solo una vez aumenta la complejidad',
    mistake3_c: 'Si T solo aparece en el tipo de retorno, usar el tipo concreto',
    mistake4_m: 'No usar restricciones al acceder a propiedades',
    mistake4_p: 'Error TypeScript: la propiedad no existe en el tipo T',
    mistake4_c: 'Agregar restriccion extends: T extends { prop: type }',
    mistake5_m: 'Confundir valores predeterminados con restricciones',
    mistake5_p: 'El tipo predeterminado no restringe — los llamadores pueden pasar otros tipos',
    mistake5_c: 'Usar extends para restringir, = para predeterminado',
    mistake6_m: 'No inferir cuando es posible',
    mistake6_p: 'Pasar tipos explicitamente cuando TS puede inferirlos',
    mistake6_c: 'Dejar que TypeScript infiera tipos de los argumentos',
    mistake7_m: 'Usar T[] en lugar de readonly T[]',
    mistake7_p: 'Permite mutacion de arrays que deberian ser solo lectura',
    mistake7_c: 'Usar readonly T[] para datos inmutables de APIs',
    h2_faq: 'Preguntas Frecuentes',
    faq1_q: 'Cual es la diferencia entre genericos y el tipo any?',
    faq1_a: 'Los genericos preservan la informacion de tipo mientras que any la descarta. Con genericos, si pasas un string, TypeScript sabe que el retorno tambien es string. Con any, toda la informacion se pierde.',
    faq2_q: 'Cuando usar genericos vs sobrecargas de funciones?',
    faq2_a: 'Usa genericos cuando la logica es la misma para todos los tipos. Usa sobrecargas cuando la implementacion difiere segun el tipo de entrada.',
    faq3_q: 'Se pueden usar genericos con funciones flecha en archivos TSX?',
    faq3_a: 'Si, pero agrega una coma final para evitar ambiguedad JSX: const fn = &lt;T,&gt;(arg: T): T =&gt; arg.',
    faq4_q: 'Cuantos parametros de tipo deberia tener un generico?',
    faq4_a: 'Los menos posibles. Uno o dos es comun. Tres a veces es necesario. Mas de tres, considera refactorizar.',
    faq5_q: 'Los genericos afectan el rendimiento en tiempo de ejecucion?',
    faq5_a: 'No. Los genericos son puramente una caracteristica de tiempo de compilacion. Se eliminan completamente durante la compilacion sin overhead en tiempo de ejecucion.',
    faq6_q: 'Cual es la convencion de nomenclatura para parametros de tipo?',
    faq6_a: 'Las letras mayusculas individuales son convencionales: T para tipo, K para clave, V para valor, E para elemento, R para tipo de retorno.',
  },
};

export default function TypescriptGenericsExplained({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
      { '@type': 'Question', name: t.faq6_q, acceptedAnswer: { '@type': 'Answer', text: t.faq6_a } },
    ],
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Introduction */}
      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* 1. Your First Generic Function */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_first}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_first }} />
      <p dangerouslySetInnerHTML={{ __html: t.p_first2 }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Without generics — loses type info
function identityAny(value: any): any {
  return value;
}
const result1 = identityAny("hello"); // type: any (not string!)

// With generics — preserves type info
function identity<T>(value: T): T {
  return value;
}
const result2 = identity("hello");    // type: string ✓
const result3 = identity(42);         // type: number ✓
const result4 = identity(true);       // type: boolean ✓

// Explicit type argument (rarely needed)
const result5 = identity<string>("hello"); // type: string`}</code></pre>

      {/* 2. Generic Functions */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_functions}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_functions }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}
const p = pair("hello", 42); // type: [string, number]

// Swap function with two type params
function swap<A, B>(tuple: [A, B]): [B, A] {
  return [tuple[1], tuple[0]];
}
const swapped = swap(["hello", 42]); // type: [number, string]

// Default type parameters
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}
const strings = createArray(3, "x");   // T inferred as string
const numbers = createArray(3, 0);     // T inferred as number
const defaults = createArray<>(3, ""); // T defaults to string`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_functions2 }} />

      {/* 3. Generic Interfaces and Types */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_interfaces}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_interfaces }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Generic interface
interface Box<T> {
  value: T;
  label: string;
}

const stringBox: Box<string> = { value: "hello", label: "greeting" };
const numberBox: Box<number> = { value: 42, label: "answer" };

// Generic interface with multiple params
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

// Generic type alias
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

const ok: Result<string> = { success: true, data: "hello" };
const fail: Result<string> = { success: false, error: new Error("oops") };

// Generic type for callbacks
type AsyncCallback<T> = (error: Error | null, data: T | null) => void;

// Generic type for nullable values
type Nullable<T> = T | null | undefined;`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_interfaces2 }} />

      {/* 4. Generic Classes */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_classes}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_classes }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Generic Stack class
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.pop(); // type: number | undefined

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.peek(); // type: string | undefined

// Generic class with multiple type params
class HashMap<K, V> {
  private map = new Map<K, V>();

  set(key: K, value: V): void {
    this.map.set(key, value);
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_classes2 }} />

      {/* 5. Generic Constraints */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_constraints}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_constraints }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_keyof}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_keyof }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// getProperty with keyof constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 30, email: "alice@example.com" };

getProperty(user, "name");  // type: string ✓
getProperty(user, "age");   // type: number ✓
// getProperty(user, "foo"); // Error: "foo" is not assignable to "name" | "age" | "email"

// Pick specific keys from an object
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => { result[key] = obj[key]; });
  return result;
}

const subset = pick(user, ["name", "email"]);
// type: { name: string; email: string }`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_shapes}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_shapes }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Constraint to objects with a length property
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(value: T): T {
  console.log(\`Length: \${value.length}\`);
  return value;
}

logLength("hello");     // OK — string has length
logLength([1, 2, 3]);   // OK — array has length
logLength({ length: 5, name: "test" }); // OK — has length
// logLength(42);       // Error — number has no length property

// Constraint to objects with an id
interface HasId {
  id: number | string;
}

function findById<T extends HasId>(items: T[], id: T["id"]): T | undefined {
  return items.find(item => item.id === id);
}

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const found = findById(users, 1);
// type: { id: number; name: string } | undefined`}</code></pre>

      {/* 6. Conditional Types */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_conditional}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_conditional }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Basic conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
type C = IsString<"hello">; // true

// Flatten arrays, leave other types alone
type Flatten<T> = T extends Array<infer Item> ? Item : T;

type D = Flatten<string[]>;    // string
type E = Flatten<number[][]>;  // number[]
type F = Flatten<string>;      // string (not an array, returned as-is)

// Extract return type (simplified ReturnType)
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type G = MyReturnType<() => string>;           // string
type H = MyReturnType<(x: number) => boolean>; // boolean

// Extract promise value
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type I = UnwrapPromise<Promise<string>>; // string
type J = UnwrapPromise<number>;          // number`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_conditional2 }} />

      {/* 7. Mapped Types */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_mapped}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_mapped }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Make all properties optional (like Partial<T>)
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// Make all properties required (like Required<T>)
type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};

// Make all properties readonly (like Readonly<T>)
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Make all properties nullable
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// Transform property types
type Stringify<T> = {
  [K in keyof T]: string;
};

interface User {
  name: string;
  age: number;
  active: boolean;
}

type StringifiedUser = Stringify<User>;
// { name: string; age: string; active: string }

// Mapped type with conditional
type OptionalNullable<T> = {
  [K in keyof T]: undefined extends T[K] ? T[K] | null : T[K];
};`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p_mapped2 }} />

      {/* 8. Utility Types */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_utility}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_utility }} />

      <table className="w-full border-collapse">
        <thead className="bg-gray-800">
          <tr>
            <th className="border border-gray-700 p-2 text-left">{t.tbl_utility_type}</th>
            <th className="border border-gray-700 p-2 text-left">{t.tbl_utility_desc}</th>
            <th className="border border-gray-700 p-2 text-left">{t.tbl_utility_example}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-700 p-2"><code>{'Partial<T>'}</code></td>
            <td className="border border-gray-700 p-2">{lang === 'zh' ? '使所有属性可选' : lang === 'ja' ? '全プロパティをオプションに' : lang === 'ko' ? '모든 속성을 선택적으로' : lang === 'fr' ? 'Rend toutes les proprietes optionnelles' : lang === 'de' ? 'Macht alle Eigenschaften optional' : lang === 'es' ? 'Hace todas las propiedades opcionales' : 'Makes all properties optional'}</td>
            <td className="border border-gray-700 p-2"><code>{'Partial<User>'}</code></td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2"><code>{'Required<T>'}</code></td>
            <td className="border border-gray-700 p-2">{lang === 'zh' ? '使所有属性必需' : lang === 'ja' ? '全プロパティを必須に' : lang === 'ko' ? '모든 속성을 필수로' : lang === 'fr' ? 'Rend toutes les proprietes obligatoires' : lang === 'de' ? 'Macht alle Eigenschaften erforderlich' : lang === 'es' ? 'Hace todas las propiedades obligatorias' : 'Makes all properties required'}</td>
            <td className="border border-gray-700 p-2"><code>{'Required<Partial<User>>'}</code></td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2"><code>{'Pick<T, K>'}</code></td>
            <td className="border border-gray-700 p-2">{lang === 'zh' ? '选取指定属性' : lang === 'ja' ? '指定プロパティを選択' : lang === 'ko' ? '지정 속성 선택' : lang === 'fr' ? 'Selectionne les proprietes specifiees' : lang === 'de' ? 'Waehlt angegebene Eigenschaften' : lang === 'es' ? 'Selecciona las propiedades especificadas' : 'Picks specified properties'}</td>
            <td className="border border-gray-700 p-2"><code>{`Pick<User, "name" | "email">`}</code></td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2"><code>{'Omit<T, K>'}</code></td>
            <td className="border border-gray-700 p-2">{lang === 'zh' ? '排除指定属性' : lang === 'ja' ? '指定プロパティを除外' : lang === 'ko' ? '지정 속성 제외' : lang === 'fr' ? 'Exclut les proprietes specifiees' : lang === 'de' ? 'Schliesst angegebene Eigenschaften aus' : lang === 'es' ? 'Excluye las propiedades especificadas' : 'Omits specified properties'}</td>
            <td className="border border-gray-700 p-2"><code>{`Omit<User, "password">`}</code></td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2"><code>{'Record<K, V>'}</code></td>
            <td className="border border-gray-700 p-2">{lang === 'zh' ? '创建键值类型映射' : lang === 'ja' ? 'キーと値の型マッピングを作成' : lang === 'ko' ? '키-값 타입 매핑 생성' : lang === 'fr' ? 'Cree un mappage cle-valeur type' : lang === 'de' ? 'Erstellt ein Schluessel-Wert-Typ-Mapping' : lang === 'es' ? 'Crea un mapeo de tipo clave-valor' : 'Creates a key-value type mapping'}</td>
            <td className="border border-gray-700 p-2"><code>{'Record<string, number>'}</code></td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2"><code>{'Readonly<T>'}</code></td>
            <td className="border border-gray-700 p-2">{lang === 'zh' ? '使所有属性只读' : lang === 'ja' ? '全プロパティを読み取り専用に' : lang === 'ko' ? '모든 속성을 읽기 전용으로' : lang === 'fr' ? 'Rend toutes les proprietes en lecture seule' : lang === 'de' ? 'Macht alle Eigenschaften schreibgeschuetzt' : lang === 'es' ? 'Hace todas las propiedades de solo lectura' : 'Makes all properties readonly'}</td>
            <td className="border border-gray-700 p-2"><code>{'Readonly<Config>'}</code></td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2"><code>{'ReturnType<T>'}</code></td>
            <td className="border border-gray-700 p-2">{lang === 'zh' ? '提取函数返回类型' : lang === 'ja' ? '関数の戻り値の型を抽出' : lang === 'ko' ? '함수 반환 타입 추출' : lang === 'fr' ? 'Extrait le type de retour d\'une fonction' : lang === 'de' ? 'Extrahiert den Rueckgabetyp einer Funktion' : lang === 'es' ? 'Extrae el tipo de retorno de una funcion' : 'Extracts function return type'}</td>
            <td className="border border-gray-700 p-2"><code>{'ReturnType<typeof fn>'}</code></td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2"><code>{'Parameters<T>'}</code></td>
            <td className="border border-gray-700 p-2">{lang === 'zh' ? '提取函数参数类型元组' : lang === 'ja' ? '関数パラメータ型のタプルを抽出' : lang === 'ko' ? '함수 매개변수 타입 튜플 추출' : lang === 'fr' ? 'Extrait le tuple des types de parametres' : lang === 'de' ? 'Extrahiert das Tupel der Parametertypen' : lang === 'es' ? 'Extrae la tupla de tipos de parametros' : 'Extracts function parameter types tuple'}</td>
            <td className="border border-gray-700 p-2"><code>{'Parameters<typeof fn>'}</code></td>
          </tr>
        </tbody>
      </table>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4"><code>{`// Utility types in action
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// For update forms — all fields optional
type UpdateUser = Partial<User>;

// Public user — omit password
type PublicUser = Omit<User, "password">;

// User creation — omit auto-generated fields
type CreateUser = Omit<User, "id" | "createdAt">;

// Lookup table
type UserLookup = Record<number, User>;

// Immutable user from API
type FrozenUser = Readonly<User>;

// Extract function types
function fetchUser(id: number): Promise<User> { /* ... */ }
type FetchReturn = ReturnType<typeof fetchUser>;     // Promise<User>
type FetchParams = Parameters<typeof fetchUser>;     // [number]`}</code></pre>

      {/* 9. Real-World Patterns */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_realworld}</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_api}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_api }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Generic API response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

// Usage with specific types
interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url);
  return res.json();
}

// TypeScript knows the exact data type
const userRes = await fetchApi<User>("/api/users/1");
console.log(userRes.data.name); // type: string ✓

const productsRes = await fetchApi<Product[]>("/api/products");
console.log(productsRes.data[0].price); // type: number ✓`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_react}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_react }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Generic list component props
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  onItemClick?: (item: T) => void;
  emptyMessage?: string;
}

function GenericList<T>({
  items,
  renderItem,
  keyExtractor,
  onItemClick,
  emptyMessage = "No items",
}: ListProps<T>) {
  if (items.length === 0) return <p>{emptyMessage}</p>;
  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={keyExtractor(item)}
          onClick={() => onItemClick?.(item)}
        >
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Usage — TypeScript infers T from items
<GenericList
  items={users}
  keyExtractor={(user) => user.id}
  renderItem={(user) => <span>{user.name}</span>}
  onItemClick={(user) => console.log(user.email)}
/>`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_repo}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_repo }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Generic repository interface
interface Entity {
  id: number | string;
}

interface Repository<T extends Entity> {
  findAll(): Promise<T[]>;
  findById(id: T["id"]): Promise<T | null>;
  create(data: Omit<T, "id">): Promise<T>;
  update(id: T["id"], data: Partial<T>): Promise<T>;
  delete(id: T["id"]): Promise<boolean>;
}

// Concrete implementation
class ApiRepository<T extends Entity> implements Repository<T> {
  constructor(private baseUrl: string) {}

  async findAll(): Promise<T[]> {
    const res = await fetch(this.baseUrl);
    return res.json();
  }

  async findById(id: T["id"]): Promise<T | null> {
    const res = await fetch(\`\${this.baseUrl}/\${id}\`);
    if (!res.ok) return null;
    return res.json();
  }

  async create(data: Omit<T, "id">): Promise<T> {
    const res = await fetch(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async update(id: T["id"], data: Partial<T>): Promise<T> {
    const res = await fetch(\`\${this.baseUrl}/\${id}\`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return res.json();
  }

  async delete(id: T["id"]): Promise<boolean> {
    const res = await fetch(\`\${this.baseUrl}/\${id}\`, { method: "DELETE" });
    return res.ok;
  }
}

// Usage
interface User extends Entity { id: number; name: string; email: string; }
const userRepo = new ApiRepository<User>("/api/users");
const users = await userRepo.findAll(); // type: User[]`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_emitter}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_emitter }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Type-safe event emitter
type EventMap = Record<string, any>;
type EventCallback<T> = (payload: T) => void;

class TypedEmitter<Events extends EventMap> {
  private listeners: {
    [K in keyof Events]?: EventCallback<Events[K]>[];
  } = {};

  on<K extends keyof Events>(event: K, callback: EventCallback<Events[K]>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  off<K extends keyof Events>(event: K, callback: EventCallback<Events[K]>): void {
    const cbs = this.listeners[event];
    if (cbs) {
      this.listeners[event] = cbs.filter(cb => cb !== callback);
    }
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    const cbs = this.listeners[event];
    if (cbs) {
      cbs.forEach(cb => cb(payload));
    }
  }
}

// Define your event types
interface AppEvents {
  "user:login": { userId: string; timestamp: number };
  "user:logout": { userId: string };
  "item:added": { itemId: string; quantity: number };
  "error": { message: string; code: number };
}

const emitter = new TypedEmitter<AppEvents>();

// Fully typed — payload type is inferred
emitter.on("user:login", (payload) => {
  console.log(payload.userId);    // type: string ✓
  console.log(payload.timestamp); // type: number ✓
});

// Error: "unknown:event" is not assignable to keyof AppEvents
// emitter.on("unknown:event", () => {});`}</code></pre>

      {/* 10. Common Mistakes Table */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_mistakes}</h2>
      <p>{t.p_mistakes}</p>

      <table className="w-full border-collapse">
        <thead className="bg-gray-800">
          <tr>
            <th className="border border-gray-700 p-2 text-left">{t.tbl_mistake}</th>
            <th className="border border-gray-700 p-2 text-left">{t.tbl_problem}</th>
            <th className="border border-gray-700 p-2 text-left">{t.tbl_correction}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-700 p-2">{t.mistake1_m}</td>
            <td className="border border-gray-700 p-2">{t.mistake1_p}</td>
            <td className="border border-gray-700 p-2">{t.mistake1_c}</td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2">{t.mistake2_m}</td>
            <td className="border border-gray-700 p-2">{t.mistake2_p}</td>
            <td className="border border-gray-700 p-2">{t.mistake2_c}</td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2">{t.mistake3_m}</td>
            <td className="border border-gray-700 p-2">{t.mistake3_p}</td>
            <td className="border border-gray-700 p-2">{t.mistake3_c}</td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2">{t.mistake4_m}</td>
            <td className="border border-gray-700 p-2">{t.mistake4_p}</td>
            <td className="border border-gray-700 p-2">{t.mistake4_c}</td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2">{t.mistake5_m}</td>
            <td className="border border-gray-700 p-2">{t.mistake5_p}</td>
            <td className="border border-gray-700 p-2">{t.mistake5_c}</td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2">{t.mistake6_m}</td>
            <td className="border border-gray-700 p-2">{t.mistake6_p}</td>
            <td className="border border-gray-700 p-2">{t.mistake6_c}</td>
          </tr>
          <tr>
            <td className="border border-gray-700 p-2">{t.mistake7_m}</td>
            <td className="border border-gray-700 p-2">{t.mistake7_p}</td>
            <td className="border border-gray-700 p-2">{t.mistake7_c}</td>
          </tr>
        </tbody>
      </table>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4"><code>{`// ❌ Mistake: Using any
function badParse(json: string): any {
  return JSON.parse(json);
}
const data = badParse('{"name":"Alice"}');
data.whatever; // No error — but might crash at runtime!

// ✓ Correction: Using generics with validation
function safeParse<T>(json: string, validator: (data: unknown) => data is T): T | null {
  try {
    const parsed = JSON.parse(json);
    return validator(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

// ❌ Mistake: Unnecessary type parameter
function badLength<T>(arr: T[]): number {
  return arr.length; // T is never meaningfully used
}

// ✓ Correction: Just use the concrete type
function goodLength(arr: unknown[]): number {
  return arr.length;
}

// ❌ Mistake: Missing constraint
function badGetName<T>(obj: T): string {
  return obj.name; // Error: Property 'name' does not exist on type 'T'
}

// ✓ Correction: Add constraint
function goodGetName<T extends { name: string }>(obj: T): string {
  return obj.name; // OK ✓
}`}</code></pre>

      {/* 11. FAQ Section */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_faq}</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq1_q}</h3>
          <p>{t.faq1_a}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq2_q}</h3>
          <p>{t.faq2_a}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq3_q}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.faq3_a }} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq4_q}</h3>
          <p>{t.faq4_a}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq5_q}</h3>
          <p>{t.faq5_a}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq6_q}</h3>
          <p>{t.faq6_a}</p>
        </div>
      </div>
    </article>
  );
}
