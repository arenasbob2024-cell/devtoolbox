'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'TypeScript Utility Types: Partial, Pick, Omit, Record, and Mapped Types Guide',
    intro: `TypeScript utility types are built-in generic types that transform existing types into new ones. Instead of rewriting type definitions, you can use Partial, Pick, Omit, Record, Required, Readonly, ReturnType, and more to create precise types with minimal code. This guide explains every essential utility type with real-world examples.`,
    s1Title: 'Partial, Required, and Readonly',
    s2Title: 'Pick, Omit, and Extract',
    s3Title: 'Record and Mapped Types',
    s4Title: 'ReturnType, Parameters, and Function Utilities',
    s5Title: 'Conditional Types and Infer',
    s6Title: 'Combining Utility Types',
    faqTitle: 'Frequently Asked Questions',
    conclusionTitle: 'Conclusion',
    relatedTitle: 'Related Tools',
  },
  fr: { title: 'Types utilitaires TypeScript', intro: 'Les types utilitaires TypeScript transforment les types existants en nouveaux types.', s1Title: 'Partial, Required et Readonly', s2Title: 'Pick, Omit et Extract', s3Title: 'Record et types mappés', s4Title: 'ReturnType et utilitaires de fonctions', s5Title: 'Types conditionnels et Infer', s6Title: 'Combiner les types utilitaires', faqTitle: 'Questions fréquentes', conclusionTitle: 'Conclusion', relatedTitle: 'Outils associés' },
  de: { title: 'TypeScript Utility Types Leitfaden', intro: 'TypeScript Utility Types transformieren bestehende Typen in neue Typen.', s1Title: 'Partial, Required und Readonly', s2Title: 'Pick, Omit und Extract', s3Title: 'Record und Mapped Types', s4Title: 'ReturnType und Funktions-Utilities', s5Title: 'Bedingte Typen und Infer', s6Title: 'Utility Types kombinieren', faqTitle: 'Häufig gestellte Fragen', conclusionTitle: 'Fazit', relatedTitle: 'Verwandte Tools' },
  es: { title: 'Tipos de utilidad de TypeScript: guía completa', intro: 'Los tipos de utilidad de TypeScript transforman tipos existentes en nuevos tipos.', s1Title: 'Partial, Required y Readonly', s2Title: 'Pick, Omit y Extract', s3Title: 'Record y tipos mapeados', s4Title: 'ReturnType y utilidades de funciones', s5Title: 'Tipos condicionales e Infer', s6Title: 'Combinando tipos de utilidad', faqTitle: 'Preguntas frecuentes', conclusionTitle: 'Conclusión', relatedTitle: 'Herramientas relacionadas' },
  it: { title: 'Tipi di utilità TypeScript', intro: 'I tipi di utilità TypeScript trasformano i tipi esistenti in nuovi tipi.', s1Title: 'Partial, Required e Readonly', s2Title: 'Pick, Omit ed Extract', s3Title: 'Record e tipi mappati', s4Title: 'ReturnType e utilità per funzioni', s5Title: 'Tipi condizionali e Infer', s6Title: 'Combinare i tipi di utilità', faqTitle: 'Domande frequenti', conclusionTitle: 'Conclusione', relatedTitle: 'Strumenti correlati' },
  pt: { title: 'Tipos utilitários do TypeScript', intro: 'Os tipos utilitários do TypeScript transformam tipos existentes em novos tipos.', s1Title: 'Partial, Required e Readonly', s2Title: 'Pick, Omit e Extract', s3Title: 'Record e tipos mapeados', s4Title: 'ReturnType e utilitários de função', s5Title: 'Tipos condicionais e Infer', s6Title: 'Combinando tipos utilitários', faqTitle: 'Perguntas frequentes', conclusionTitle: 'Conclusão', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'TypeScript utility types gids', intro: 'TypeScript utility types transformeren bestaande typen in nieuwe typen.', s1Title: 'Partial, Required en Readonly', s2Title: 'Pick, Omit en Extract', s3Title: 'Record en mapped types', s4Title: 'ReturnType en functie-utilities', s5Title: 'Voorwaardelijke typen en Infer', s6Title: 'Utility types combineren', faqTitle: 'Veelgestelde vragen', conclusionTitle: 'Conclusie', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Typy narzędziowe TypeScript', intro: 'Typy narzędziowe TypeScript przekształcają istniejące typy w nowe typy.', s1Title: 'Partial, Required i Readonly', s2Title: 'Pick, Omit i Extract', s3Title: 'Record i typy mapowane', s4Title: 'ReturnType i narzędzia funkcji', s5Title: 'Typy warunkowe i Infer', s6Title: 'Łączenie typów narzędziowych', faqTitle: 'Często zadawane pytania', conclusionTitle: 'Podsumowanie', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'TypeScript utility types guide', intro: 'TypeScript utility types omvandlar befintliga typer till nya typer.', s1Title: 'Partial, Required och Readonly', s2Title: 'Pick, Omit och Extract', s3Title: 'Record och mappade typer', s4Title: 'ReturnType och funktionsverktyg', s5Title: 'Villkorliga typer och Infer', s6Title: 'Kombinera utility types', faqTitle: 'Vanliga frågor', conclusionTitle: 'Slutsats', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'TypeScript utility types guide', intro: 'TypeScript utility types transformerer eksisterende typer til nye typer.', s1Title: 'Partial, Required og Readonly', s2Title: 'Pick, Omit og Extract', s3Title: 'Record og kartlagte typer', s4Title: 'ReturnType og funksjonsverktøy', s5Title: 'Betingede typer og Infer', s6Title: 'Kombinere utility types', faqTitle: 'Ofte stilte spørsmål', conclusionTitle: 'Konklusjon', relatedTitle: 'Relaterte verktøy' },
  zh: { title: 'TypeScript 工具类型完整指南：Partial、Pick、Omit、Record 和映射类型', intro: 'TypeScript 工具类型是内置的泛型类型，可将现有类型转换为新类型。', s1Title: 'Partial、Required 和 Readonly', s2Title: 'Pick、Omit 和 Extract', s3Title: 'Record 和映射类型', s4Title: 'ReturnType、Parameters 和函数工具', s5Title: '条件类型和 Infer', s6Title: '组合工具类型', faqTitle: '常见问题', conclusionTitle: '总结', relatedTitle: '相关工具' },
  ja: { title: 'TypeScript ユーティリティ型完全ガイド', intro: 'TypeScript ユーティリティ型は、既存の型を新しい型に変換する組み込みのジェネリック型です。', s1Title: 'Partial、Required、Readonly', s2Title: 'Pick、Omit、Extract', s3Title: 'Record とマップ型', s4Title: 'ReturnType と関数ユーティリティ', s5Title: '条件型と Infer', s6Title: 'ユーティリティ型の組み合わせ', faqTitle: 'よくある質問', conclusionTitle: 'まとめ', relatedTitle: '関連ツール' },
  ko: { title: 'TypeScript 유틸리티 타입 완벽 가이드', intro: 'TypeScript 유틸리티 타입은 기존 타입을 새로운 타입으로 변환하는 내장 제네릭 타입입니다.', s1Title: 'Partial, Required 및 Readonly', s2Title: 'Pick, Omit 및 Extract', s3Title: 'Record 및 매핑된 타입', s4Title: 'ReturnType 및 함수 유틸리티', s5Title: '조건부 타입과 Infer', s6Title: '유틸리티 타입 조합', faqTitle: '자주 묻는 질문', conclusionTitle: '결론', relatedTitle: '관련 도구' },
  id: { title: 'Panduan Lengkap TypeScript Utility Types', intro: 'Tipe utilitas TypeScript adalah tipe generik bawaan yang mengubah tipe yang ada menjadi tipe baru.', s1Title: 'Partial, Required, dan Readonly', s2Title: 'Pick, Omit, dan Extract', s3Title: 'Record dan Mapped Types', s4Title: 'ReturnType dan Utilitas Fungsi', s5Title: 'Tipe Kondisional dan Infer', s6Title: 'Menggabungkan Utility Types', faqTitle: 'Pertanyaan yang Sering Diajukan', conclusionTitle: 'Kesimpulan', relatedTitle: 'Alat Terkait' },
  th: { title: 'คู่มือ TypeScript Utility Types ฉบับสมบูรณ์', intro: 'TypeScript utility types เป็นประเภทเจเนอริกในตัวที่แปลงประเภทที่มีอยู่เป็นประเภทใหม่', s1Title: 'Partial, Required และ Readonly', s2Title: 'Pick, Omit และ Extract', s3Title: 'Record และ Mapped Types', s4Title: 'ReturnType และ Function Utilities', s5Title: 'Conditional Types และ Infer', s6Title: 'การรวม Utility Types', faqTitle: 'คำถามที่พบบ่อย', conclusionTitle: 'สรุป', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

export default function TypescriptUtilityTypes({ lang = 'en' }: { lang?: string }) {
  const s = t[lang] || t['en'];

  const partialRequiredReadonly = `interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial<T> - makes all properties optional
type UserUpdate = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number }

function updateUser(id: number, data: Partial<User>): User {
  return { ...getCurrentUser(id), ...data };
}
updateUser(1, { name: 'Alice' }); // OK - only update name

// Required<T> - makes all properties required
interface Config {
  host?: string;
  port?: number;
  timeout?: number;
}
type StrictConfig = Required<Config>;
// { host: string; port: number; timeout: number }

// Readonly<T> - makes all properties readonly
type ImmutableUser = Readonly<User>;
const user: ImmutableUser = { id: 1, name: 'Alice', email: 'a@b.com', age: 30 };
// user.name = 'Bob'; // Error: Cannot assign to 'name' because it is read-only

// Deep Readonly (custom utility)
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};`;

  const pickOmitExtract = `interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
}

// Pick<T, K> - select only the specified keys
type ProductCard = Pick<Product, 'id' | 'name' | 'price'>;
// { id: number; name: string; price: number }

// Useful for API response shaping
function getProductCard(p: Product): ProductCard {
  return { id: p.id, name: p.name, price: p.price };
}

// Omit<T, K> - remove specified keys
type ProductForm = Omit<Product, 'id' | 'stock'>;
// { name: string; price: number; category: string; description: string }

// Exclude<T, U> - from union type, exclude assignable to U
type Direction = 'north' | 'south' | 'east' | 'west';
type Horizontal = Exclude<Direction, 'north' | 'south'>;
// 'east' | 'west'

// Extract<T, U> - from union type, keep only assignable to U
type Vertical = Extract<Direction, 'north' | 'south'>;
// 'north' | 'south'

// NonNullable<T> - removes null and undefined
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string`;

  const recordMapped = `// Record<K, V> - create object type with known keys
type Role = 'admin' | 'user' | 'guest';
type Permissions = Record<Role, string[]>;

const permissions: Permissions = {
  admin: ['read', 'write', 'delete'],
  user:  ['read', 'write'],
  guest: ['read'],
};

// Record with nested types
type ApiResponse<T> = Record<string, T>;
type UserMap = Record<number, User>;

// Mapped Types - transform every property
type Nullable<T> = { [K in keyof T]: T[K] | null };
type Optional<T> = { [K in keyof T]?: T[K] };
type Stringify<T> = { [K in keyof T]: string };

// Mapped types with modifiers
type Mutable<T> = { -readonly [K in keyof T]: T[K] }; // remove readonly
type Complete<T> = { [K in keyof T]-?: T[K] };         // remove optional

// Remapping keys with 'as'
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
type UserGetters = Getters<User>;
// { getId: () => number; getName: () => string; ... }`;

  const functionUtilities = `// ReturnType<T> - extract return type of a function
function createUser(name: string, email: string) {
  return { id: Math.random(), name, email, createdAt: new Date() };
}
type CreatedUser = ReturnType<typeof createUser>;
// { id: number; name: string; email: string; createdAt: Date }

// Parameters<T> - extract parameter types as tuple
type CreateUserParams = Parameters<typeof createUser>;
// [name: string, email: string]

// ConstructorParameters<T> - for class constructors
class Server {
  constructor(public host: string, public port: number) {}
}
type ServerArgs = ConstructorParameters<typeof Server>;
// [host: string, port: number]

// InstanceType<T> - get instance type from constructor
type ServerInstance = InstanceType<typeof Server>;
// Server

// Awaited<T> - unwrap Promise types
type UserPromise = Promise<User>;
type ResolvedUser = Awaited<UserPromise>;
// User

async function fetchUser(): Promise<User> { /* ... */ return {} as User; }
type FetchResult = Awaited<ReturnType<typeof fetchUser>>;
// User`;

  const conditionalInfer = `// Conditional Types
type IsArray<T> = T extends any[] ? true : false;
type CheckString = IsArray<string>;  // false
type CheckArray  = IsArray<string[]>; // true

// infer - extract type from generic
type UnpackArray<T> = T extends (infer U)[] ? U : T;
type StringItem = UnpackArray<string[]>; // string
type NumberItem  = UnpackArray<number>;  // number

// Extract Promise value
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
type PromiseValue = UnpackPromise<Promise<number>>; // number

// Get first element of tuple
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
type Head = First<[string, number, boolean]>; // string

// Distributive conditional types
type Flatten<T> = T extends Array<infer U> ? U : T;
type Mixed = Flatten<string[] | number | boolean[]>;
// string | number | boolean`;

  const combining = `// Real-world example: API layer with combined utility types

interface ApiUser {
  id: number;
  username: string;
  email: string;
  password: string;   // should never leave server
  createdAt: string;
  updatedAt: string;
}

// Safe user for frontend (strip sensitive fields)
type SafeUser = Omit<ApiUser, 'password'>;

// User creation form (no server-generated fields)
type CreateUserDto = Omit<ApiUser, 'id' | 'createdAt' | 'updatedAt'>;

// Patch request - all fields optional except id
type PatchUserDto = Partial<Omit<ApiUser, 'id'>> & Pick<ApiUser, 'id'>;

// Validation errors map
type ValidationErrors<T> = Partial<Record<keyof T, string>>;
type UserErrors = ValidationErrors<CreateUserDto>;
// { username?: string; email?: string; password?: string }

// Generic API response wrapper
type ApiResult<T, E = string> =
  | { success: true; data: T }
  | { success: false; error: E };

type UserResult = ApiResult<SafeUser>;`;

  const faqs = [
    {
      q: 'What is the difference between Partial<T> and Optional<T>?',
      a: 'Partial<T> is a built-in TypeScript utility type that makes all properties of T optional. Optional<T> is not built-in — it\'s a common name for custom mapped types that do the same thing. You should always prefer the built-in Partial<T> over writing your own.'
    },
    {
      q: 'When should I use Pick vs Omit?',
      a: 'Use Pick when you want to select a small subset of properties from a large type (you know what you WANT). Use Omit when you want most properties but need to exclude a few (you know what you DON\'T WANT). For removing 1-2 properties, Omit is cleaner. For selecting 1-2 properties, Pick is cleaner.'
    },
    {
      q: 'What is the difference between Record<string, T> and { [key: string]: T }?',
      a: 'They are nearly identical in behavior, but Record<string, T> is more readable and the idiomatic TypeScript style. Record<string, T> also plays better with other utility types. One subtle difference: Record<never, T> produces an empty object type {}, while the index signature always allows any string key.'
    },
    {
      q: 'How do I create a deep Partial type?',
      a: 'TypeScript\'s built-in Partial<T> is shallow — it only makes the top level optional. For deep partial, create a recursive utility type: type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] }. Libraries like ts-toolbelt provide this and many more deep utility types.'
    },
    {
      q: 'What are template literal types and how do they relate to mapped types?',
      a: 'Template literal types (introduced in TS 4.1) let you create string types with embedded type expressions: type EventName<T extends string> = `on${Capitalize<T>}`. Combined with mapped types, you can generate entire interfaces of event handlers, getters, setters, etc., from a single source-of-truth type.'
    },
    {
      q: 'Can I use utility types with interfaces and type aliases both?',
      a: 'Yes. TypeScript utility types work with both interface and type alias definitions interchangeably. Partial<MyInterface> and Partial<MyType> both work the same way. The choice between interface and type alias is mostly stylistic, though interfaces support declaration merging while type aliases do not.'
    },
  ];

  return (
    <article className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold mb-4">{s.title}</h1>
      <p className="text-lg text-gray-700 mb-8">{s.intro}</p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s1Title}</h2>
        <p className="mb-4">
          These three utility types transform the mutability and optionality of every property at once. They are the most commonly used utility types in TypeScript codebases.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{partialRequiredReadonly}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s2Title}</h2>
        <p className="mb-4">
          Pick and Omit let you create new types by selecting or removing properties. Extract and Exclude operate on union types. These are essential for creating DTOs (Data Transfer Objects) and API shapes.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{pickOmitExtract}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s3Title}</h2>
        <p className="mb-4">
          Record creates object types with a fixed set of keys. Mapped types iterate over union types or object keys to transform every property systematically.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{recordMapped}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s4Title}</h2>
        <p className="mb-4">
          Function utility types let you extract type information from functions and classes without duplicating type definitions. They're especially useful when working with third-party libraries that don't export their types.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{functionUtilities}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s5Title}</h2>
        <p className="mb-4">
          Conditional types express if-else logic at the type level. The <code>infer</code> keyword lets you capture and name types within conditional expressions, enabling powerful type extraction patterns.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{conditionalInfer}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s6Title}</h2>
        <p className="mb-4">
          The real power of utility types comes from combining them. Here's a real-world example showing how to build a complete API type system from a single source type:
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{combining}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.faqTitle}</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.conclusionTitle}</h2>
        <p className="mb-4">
          TypeScript utility types are force multipliers for your type system. Instead of maintaining dozens of similar interfaces that drift out of sync, define one source-of-truth type and derive all variants with Partial, Pick, Omit, and friends. Your codebase becomes easier to maintain and refactor as requirements change.
        </p>
        <p>
          Start by auditing your codebase for interfaces that are near-duplicates of each other — those are prime candidates for utility type refactoring. Tools like the viadreams.cc JSON formatter and diff tool can help you compare complex type structures visually.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">{s.relatedTitle}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Link href="/tools/json-formatter" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">JSON Formatter</Link>
          <Link href="/tools/json-diff-tool" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">JSON Diff Tool</Link>
          <Link href="/tools/yaml-validator" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">YAML Validator</Link>
          <Link href="/tools/regex-tester" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">Regex Tester</Link>
          <Link href="/tools/jwt-decoder" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">JWT Decoder</Link>
          <Link href="/tools/base64-decoder" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">Base64 Decoder</Link>
        </div>
      </section>
    </article>
  );
}
