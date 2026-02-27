'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'String Case Converter: Convert camelCase, snake_case, kebab-case Online — Complete Guide',
    description: 'Convert between camelCase, PascalCase, snake_case, kebab-case, and more. Complete guide with JavaScript change-case library, Python humps, regex patterns, and TypeScript template literal types.',
  },
  zh: {
    title: '字符串大小写转换器：在线转换 camelCase、snake_case、kebab-case — 完整指南',
    description: '在线转换 camelCase、PascalCase、snake_case、kebab-case 等命名风格。含 JavaScript change-case 库、Python humps、正则表达式和 TypeScript 模板字面量类型。',
  },
};

export default function StringCaseConverterOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between camelCase and PascalCase?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'camelCase starts with a lowercase letter and capitalizes the first letter of each subsequent word (e.g., myVariableName). PascalCase (also called UpperCamelCase) capitalizes the first letter of every word including the first (e.g., MyClassName). In JavaScript, camelCase is used for variables and functions, while PascalCase is used for classes, React components, and constructor functions.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I use snake_case vs kebab-case?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'snake_case uses underscores between words (my_variable_name) and is the standard in Python (PEP 8), Ruby, PostgreSQL column names, and Rust. kebab-case uses hyphens between words (my-variable-name) and is standard for CSS class names, HTML data attributes, URL slugs, CLI flags, and npm package names. In JavaScript, hyphens are not valid in identifiers, so snake_case or camelCase is used instead.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is SCREAMING_SNAKE_CASE used for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SCREAMING_SNAKE_CASE (also called CONSTANT_CASE or UPPER_SNAKE_CASE) uses all uppercase letters with underscores between words (MAX_RETRY_COUNT, API_BASE_URL). It is universally used for constants, environment variables, and macros across languages: const MAX_SIZE = 100 in JavaScript/TypeScript, MAX_CONNECTIONS = 10 in Python, #define BUFFER_SIZE 4096 in C, and enum values in many languages.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert snake_case to camelCase in JavaScript without a library?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can convert snake_case to camelCase with a single regex: str.replace(/_([a-z])/g, (_, c) => c.toUpperCase()). For example, "hello_world" becomes "helloWorld". To handle leading underscores or multiple underscores, use: str.replace(/_+([a-z])/g, (_, c) => c.toUpperCase()). The change-case npm library (npm install change-case) provides camelCase(), snakeCase(), kebabCase(), and more for production use.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert API snake_case responses to camelCase in JavaScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use an axios request interceptor to automatically convert all response keys from snake_case to camelCase: axios.interceptors.response.use(response => { response.data = camelizeKeys(response.data); return response; }). The camelizeKeys function recursively converts all object keys. The humps library (npm install humps) provides camelizeKeys() and decamelizeKeys() for this exact purpose. For fetch(), create a middleware wrapper that transforms the JSON before returning.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert Python dict keys from camelCase to snake_case?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Install the humps library (pip install pyhumps) and use humps.decamelize() to convert camelCase keys to snake_case, or humps.camelize() to go the other direction. For manual conversion, use re.sub(r"(?<!^)(?=[A-Z])", "_", name).lower() to convert camelCase to snake_case. FastAPI and Pydantic support automatic case conversion via model_config with alias_generator=to_camel.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are TypeScript template literal types for case conversion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TypeScript 4.1+ introduced template literal types that enable type-level string manipulation. You can define types like type CamelCase<S extends string> that transform string literal types at the type level. TypeScript also has built-in utility types: Uppercase<T>, Lowercase<T>, Capitalize<T>, and Uncapitalize<T>. These let the type system enforce naming conventions: a function typed as (key: KebabCase<T>) => void will only accept kebab-case string literals.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I handle acronyms like "XMLParser" or "HTTPSRequest" when converting case?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Acronym handling is the most common edge case in case conversion. "XMLParser" can become "xml-parser" or "xml_parser" depending on the strategy. The change-case library treats consecutive uppercase letters as a single word by default: camelCase("XMLParser") => "xmlParser", snakeCase("XMLParser") => "xml_parser". For acronyms you want to preserve, some libraries offer a split function option. Common convention: in snake_case use xml_parser (fully lowercase), in camelCase use xmlParser (treat XML as one word boundary), in PascalCase use XmlParser.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Canonical meta */}
      <link rel="canonical" href="https://viadreams.cc/en/blog/string-case-converter-online-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A <strong>string case converter</strong> transforms identifiers between naming conventions.
          Use <strong>camelCase</strong> for JS variables and functions, <strong>PascalCase</strong> for React
          components and classes, <strong>snake_case</strong> for Python and PostgreSQL, <strong>kebab-case</strong> for
          CSS and URLs, and <strong>SCREAMING_SNAKE_CASE</strong> for constants. Install the{' '}
          <code>change-case</code> npm library for JavaScript or <code>humps</code> for Python to handle all
          conversions reliably. Try our free{' '}
          <Link href={`/${lang}/tools/string-case`} style={{ color: '#0284c7' }}>online string case converter</Link> for
          instant transformations, or follow the code examples below for manual implementations.
        </p>
      </div>

      {/* Section 1: Case Types Overview */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        The 9 Most Common String Case Types — With Examples
      </h2>
      <p>
        Every programming language and ecosystem has its own conventions for naming variables, functions, classes, files,
        and database columns. Understanding which case to use and when prevents naming conflicts, improves readability,
        and integrates seamlessly with existing codebases and tooling.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Case Type</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Example</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Pattern</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Primary Use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>camelCase</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>myVariableName</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Lowercase start, uppercase word boundaries</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>JS/TS variables, Java fields, JSON keys</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>PascalCase</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>MyClassName</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Uppercase every word boundary including first</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>React components, TypeScript classes, C# types</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>snake_case</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>my_variable_name</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Lowercase, underscores between words</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Python, Ruby, PostgreSQL, Rust, PHP</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>kebab-case</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>my-variable-name</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Lowercase, hyphens between words</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>CSS classes, HTML attributes, URLs, npm packages</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>SCREAMING_SNAKE</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>MY_CONSTANT_NAME</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Uppercase, underscores between words</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Constants, environment variables, macros</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>dot.case</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>my.config.key</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Lowercase, dots between words</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Config keys (Spring, .properties files)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Title Case</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>My Variable Name</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Capitalize first letter of each word</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>UI headings, article titles, menu items</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>UPPERCASE</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>MYVARIABLENAME</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>All uppercase, no separators</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>SQL keywords, short acronyms (HTML, CSS, JSON)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>lowercase</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>myvariablename</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>All lowercase, no separators</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Single-word identifiers, simple keys</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 2: When to Use Each Case */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        When to Use Each Case — Conventions by Language and Framework
      </h2>
      <p>
        Using the wrong naming convention is not just a style issue — it causes real problems. Python linters flag
        camelCase variables, PostgreSQL lowercases unquoted identifiers making camelCase columns invisible,
        and CSS parsers reject underscore-separated class names in some contexts. Here is the definitive guide
        to which case belongs where.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        JavaScript and TypeScript
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// camelCase: variables, functions, method names, object properties
const userName = 'alice';
const maxRetryCount = 3;
function getUserProfile(userId: string) { ... }
const apiResponse = { firstName: 'Alice', lastName: 'Smith' };

// PascalCase: classes, React components, TypeScript interfaces, enums
class UserService { ... }
function ProfileCard({ user }: { user: User }) { ... }
interface HttpResponse { statusCode: number; body: string; }
enum Direction { North, South, East, West }

// SCREAMING_SNAKE_CASE: constants (module-level or readonly)
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
const DEFAULT_TIMEOUT_MS = 5000;

// kebab-case: NOT valid as JS identifiers, but used in:
// - CSS module class names: styles['card-header']
// - HTML element IDs: document.getElementById('main-nav')
// - npm package names: import('change-case')
// - CLI flags: --output-dir, --max-connections`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Python (PEP 8)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# snake_case: variables, functions, methods, module names
user_name = 'alice'
max_retry_count = 3

def get_user_profile(user_id: str) -> dict:
    ...

# PascalCase: classes (the only exception to snake_case in Python)
class UserService:
    def get_user(self, user_id: str): ...

class HttpError(Exception):
    pass

# SCREAMING_SNAKE_CASE: module-level constants
MAX_FILE_SIZE = 10 * 1024 * 1024
API_BASE_URL = os.environ['API_BASE_URL']
DEFAULT_TIMEOUT_MS = 5000

# _single_leading_underscore: "internal use" convention
_cache = {}

# __double_leading_underscore: name mangling in classes
class MyClass:
    __private_attr = 'cannot easily access from subclass'`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        CSS and HTML
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* kebab-case is the universal CSS convention */
.nav-bar { display: flex; }
.card-header { font-weight: bold; }
.btn-primary { background: blue; }

/* HTML attributes: kebab-case */
<div data-user-id="123" aria-label="Close dialog">
<button class="btn-primary" id="submit-form">Submit</button>

/* CSS Custom Properties (variables) — also kebab-case */
:root {
  --color-primary: #3b82f6;
  --font-size-base: 16px;
  --border-radius-lg: 8px;
}

/* BEM methodology: block__element--modifier */
.card { }               /* block */
.card__header { }       /* element */
.card__header--sticky { } /* modifier */
.card--featured { }     /* block modifier */

/* Tailwind utility classes — all kebab-case */
/* text-gray-500, bg-blue-600, rounded-lg, flex-col, px-4 */`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Databases — PostgreSQL, MySQL, SQLite
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-- PostgreSQL: snake_case is mandatory for unquoted identifiers
-- PostgreSQL lowercases ALL unquoted identifiers
CREATE TABLE user_accounts (
    user_id       SERIAL PRIMARY KEY,
    email_address VARCHAR(255) UNIQUE NOT NULL,
    created_at    TIMESTAMP DEFAULT NOW(),
    is_active     BOOLEAN DEFAULT TRUE
);

-- WRONG: This looks like camelCase but PostgreSQL treats it as lowercase
-- SELECT userId FROM users;  -- actually selects "userid" column!
-- You must quote to preserve case:
-- SELECT "userId" FROM users;  -- preserved, but ugly

-- MySQL: case-insensitive on most platforms (Windows), case-sensitive on Linux
-- Best practice: always use snake_case to avoid cross-platform issues
SELECT user_name, email_address FROM user_accounts WHERE is_active = 1;

-- SQL keywords: UPPERCASE (convention, not required)
SELECT, FROM, WHERE, JOIN, ON, GROUP BY, HAVING, ORDER BY, LIMIT`}</code></pre>

      {/* Section 3: JavaScript Manual Conversion */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JavaScript — Manual Case Conversion Functions
      </h2>
      <p>
        Sometimes you need lightweight conversions without installing a library. These battle-tested functions handle
        the most common scenarios including acronyms, numbers, and edge cases.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Core Conversion Functions
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/**
 * Splits any cased string into individual words.
 * Handles camelCase, PascalCase, snake_case, kebab-case, spaces, dots.
 */
function splitWords(str: string): string[] {
  return str
    // Insert space before uppercase letters that follow lowercase letters or digits
    // Handles camelCase: "helloWorld" => "hello World"
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    // Insert space before uppercase letters followed by lowercase (handles acronyms)
    // "XMLParser" => "XML Parser"
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    // Replace all non-alphanumeric characters with spaces
    .replace(/[\s_\-\.]+/g, ' ')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean); // remove empty strings
}

// camelCase: "hello-world_foo" => "helloWorldFoo"
function toCamelCase(str: string): string {
  const words = splitWords(str);
  return words[0] + words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

// PascalCase: "hello-world_foo" => "HelloWorldFoo"
function toPascalCase(str: string): string {
  return splitWords(str).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

// snake_case: "helloWorldFoo" => "hello_world_foo"
function toSnakeCase(str: string): string {
  return splitWords(str).join('_');
}

// kebab-case: "helloWorldFoo" => "hello-world-foo"
function toKebabCase(str: string): string {
  return splitWords(str).join('-');
}

// SCREAMING_SNAKE_CASE: "helloWorldFoo" => "HELLO_WORLD_FOO"
function toConstantCase(str: string): string {
  return splitWords(str).join('_').toUpperCase();
}

// dot.case: "helloWorldFoo" => "hello.world.foo"
function toDotCase(str: string): string {
  return splitWords(str).join('.');
}

// Title Case: "hello-world" => "Hello World"
function toTitleCase(str: string): string {
  return splitWords(str).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Sentence case: "HELLO_WORLD" => "Hello world"
function toSentenceCase(str: string): string {
  const words = splitWords(str);
  return words[0].charAt(0).toUpperCase() + words[0].slice(1) + ' ' + words.slice(1).join(' ');
}

// Test all conversions
const input = 'XMLParser_config-KEY';
console.log(toCamelCase(input));    // => "xmlParserConfigKey"
console.log(toPascalCase(input));   // => "XmlParserConfigKey"
console.log(toSnakeCase(input));    // => "xml_parser_config_key"
console.log(toKebabCase(input));    // => "xml-parser-config-key"
console.log(toConstantCase(input)); // => "XML_PARSER_CONFIG_KEY"
console.log(toDotCase(input));      // => "xml.parser.config.key"
console.log(toTitleCase(input));    // => "Xml Parser Config Key"
console.log(toSentenceCase(input)); // => "Xml parser config key"`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Regex Explanation — How Case Detection Works
      </h3>
      <p>
        The key to reliable case conversion is the <code>splitWords</code> function. Let&apos;s break down each regex step:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Step 1: Handle camelCase boundaries
// Pattern: ([a-z\d])([A-Z])
// Matches a lowercase letter or digit followed by an uppercase letter
// "helloWorld" => "hello World", "getHTTP" stays (handled in step 2)
.replace(/([a-z\d])([A-Z])/g, '$1 $2')

// Step 2: Handle acronyms (consecutive uppercase letters)
// Pattern: ([A-Z]+)([A-Z][a-z])
// Matches: one or more uppercase + uppercase followed by lowercase
// "XMLParser" => "XML Parser" (split before the "Pa" in Parser)
// "HTTPSRequest" => "HTTPS Request"
.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')

// Step 3: Replace non-word characters
// Pattern: [\s_\-\.]+
// Handles: underscores, hyphens, dots, spaces, and combinations
// "hello__world" => "hello world", "foo.bar-baz" => "foo bar baz"
.replace(/[\s_\-\.]+/g, ' ')

// Why filter(Boolean)?
// After splitting, empty strings can appear at the start/end
// "  hello  world  ".split(/\s+/) => ['', 'hello', 'world', '']
.filter(Boolean)

// Digit boundary handling:
// "base64Encoder" => ["base", "64", "encoder"] — keep digits with adjacent word
// Current pattern: ([a-z\d])([A-Z]) treats digits like lowercase letters
// So "base64Encoder" => "base64 Encoder" => ["base64", "encoder"]`}</code></pre>

      {/* Section 4: change-case Library */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JavaScript — The change-case Library (npm)
      </h2>
      <p>
        For production use, the <code>change-case</code> library is the gold standard. It handles all edge cases including
        acronyms, unicode characters, locale-specific casing, and digit boundaries — and it is fully typed for TypeScript.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Install the library
npm install change-case

# TypeScript types are included — no @types package needed`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import {
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase,
  constantCase,
  dotCase,
  pathCase,
  titleCase,
  sentenceCase,
  capitalCase,
  noCase,
} from 'change-case';

const input = 'hello world foo-bar';

// Core cases
console.log(camelCase(input));     // "helloWorldFooBar"
console.log(pascalCase(input));    // "HelloWorldFooBar"
console.log(snakeCase(input));     // "hello_world_foo_bar"
console.log(kebabCase(input));     // "hello-world-foo-bar"
console.log(constantCase(input));  // "HELLO_WORLD_FOO_BAR"

// Less common cases
console.log(dotCase(input));       // "hello.world.foo.bar"
console.log(pathCase(input));      // "hello/world/foo/bar"
console.log(titleCase(input));     // "Hello World Foo Bar"
console.log(sentenceCase(input));  // "Hello world foo bar"
console.log(capitalCase(input));   // "Hello World Foo Bar" (same as title)
console.log(noCase(input));        // "hello world foo bar" (just lowercased, space-separated)

// Handles mixed input flawlessly
console.log(snakeCase('XMLParser'));      // "xml_parser"
console.log(camelCase('HTTPSRequest'));   // "httpsRequest"
console.log(kebabCase('base64Encode'));   // "base-64-encode"
console.log(pascalCase('MY_CONSTANT'));  // "MyConstant"

// Custom split function for special behavior
import { camelCase, Options } from 'change-case';

const opts: Options = {
  // Preserve acronyms as-is
  splitRegexp: /([a-z])([A-Z])/g,
};
console.log(camelCase('XMLParser', opts)); // "xmlParser" vs "xMLParser" without custom split`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Practical change-case Patterns
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import { camelCase, snakeCase, kebabCase, pascalCase } from 'change-case';

// Convert object keys recursively
function camelizeKeys<T>(obj: unknown): T {
  if (Array.isArray(obj)) {
    return obj.map(camelizeKeys) as T;
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
        camelCase(key),
        camelizeKeys(value),
      ])
    ) as T;
  }
  return obj as T;
}

// Convert object keys to snake_case (for sending to Python API)
function snakelizeKeys<T>(obj: unknown): T {
  if (Array.isArray(obj)) {
    return obj.map(snakelizeKeys) as T;
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
        snakeCase(key),
        snakelizeKeys(value),
      ])
    ) as T;
  }
  return obj as T;
}

// Usage: API returns snake_case, convert to camelCase for React state
const apiData = {
  user_name: 'alice',
  email_address: 'alice@example.com',
  profile_settings: { theme_color: '#3b82f6', font_size: 14 }
};

const normalized = camelizeKeys(apiData);
// { userName: 'alice', emailAddress: 'alice@example.com', profileSettings: { themeColor: '#3b82f6', fontSize: 14 } }

// Form data to API (camelCase UI -> snake_case for server)
const formData = { firstName: 'Alice', emailAddress: 'alice@example.com' };
const apiPayload = snakelizeKeys(formData);
// { first_name: 'Alice', email_address: 'alice@example.com' }`}</code></pre>

      {/* Section 5: Python */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python — String Methods and Case Conversion
      </h2>
      <p>
        Python&apos;s built-in string methods handle the simple cases. For complex conversions involving mixed input,
        the <code>re</code> module and the third-party <code>humps</code> library cover all scenarios.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Built-in String Methods
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python built-in string methods for basic case changes
text = "hello world"

# Basic transformations
print(text.lower())       # "hello world"
print(text.upper())       # "HELLO WORLD"
print(text.title())       # "Hello World"
print(text.capitalize())  # "Hello world" (only first letter)
print(text.swapcase())    # "HELLO WORLD" -> "hello world" (inverts case)

# title() has a quirk: capitalizes after ANY non-letter
print("it's a trap".title())    # "It'S A Trap" (apostrophe triggers cap)
print("don't panic".title())    # "Don'T Panic" -- WRONG

# Better title case with str.capwords()
import string
print(string.capwords("it's a trap"))  # "It's A Trap"
print(string.capwords("don't panic"))  # "Don't Panic"

# Check case type
print("helloWorld".islower())    # True
print("HELLO".isupper())         # True
print("Hello World".istitle())   # True`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Custom Conversion Functions with re module
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import re

def camel_to_snake(name: str) -> str:
    """Convert camelCase or PascalCase to snake_case."""
    # Insert underscore before uppercase letters that follow lowercase/digits
    # "helloWorld" => "hello_World" => "hello_world"
    s1 = re.sub(r'(.)([A-Z][a-z]+)', r'\\1_\\2', name)
    # Insert underscore before uppercase letters that follow lowercase (handles acronyms)
    # "XMLParser" => "XML_Parser" => "xml_parser"
    return re.sub(r'([a-z0-9])([A-Z])', r'\\1_\\2', s1).lower()

def snake_to_camel(name: str) -> str:
    """Convert snake_case to camelCase."""
    components = name.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])

def snake_to_pascal(name: str) -> str:
    """Convert snake_case to PascalCase."""
    return ''.join(x.title() for x in name.split('_'))

def to_kebab(name: str) -> str:
    """Convert any case to kebab-case."""
    # First convert to snake_case, then replace underscores with hyphens
    snake = camel_to_snake(name)
    return snake.replace('_', '-')

def to_constant(name: str) -> str:
    """Convert any case to SCREAMING_SNAKE_CASE."""
    return camel_to_snake(name).upper()

# Test
print(camel_to_snake('helloWorld'))        # "hello_world"
print(camel_to_snake('XMLParser'))         # "xml_parser"
print(camel_to_snake('HTTPSConnection'))   # "https_connection"
print(camel_to_snake('getHTTPResponse'))   # "get_http_response"

print(snake_to_camel('hello_world'))       # "helloWorld"
print(snake_to_camel('xml_parser_config')) # "xmlParserConfig"

print(snake_to_pascal('user_profile'))     # "UserProfile"
print(to_kebab('helloWorldFoo'))           # "hello-world-foo"
print(to_constant('apiBaseUrl'))           # "API_BASE_URL" (approximate)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Python — humps Library for Dict Key Conversion
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Install: pip install pyhumps
import humps

# Single string conversions
print(humps.camelize('hello_world'))        # "helloWorld"
print(humps.decamelize('helloWorld'))       # "hello_world"
print(humps.pascalize('hello_world'))       # "HelloWorld"
print(humps.kebabize('hello_world'))        # "hello-world"

# Recursive dict key conversion — the killer feature
snake_dict = {
    'user_name': 'alice',
    'email_address': 'alice@example.com',
    'profile_settings': {
        'theme_color': '#3b82f6',
        'font_size': 14
    },
    'recent_posts': [
        {'post_title': 'Hello World', 'created_at': '2026-02-27'}
    ]
}

camel_dict = humps.camelize(snake_dict)
# {
#   'userName': 'alice',
#   'emailAddress': 'alice@example.com',
#   'profileSettings': { 'themeColor': '#3b82f6', 'fontSize': 14 },
#   'recentPosts': [{ 'postTitle': 'Hello World', 'createdAt': '2026-02-27' }]
# }

# Convert back to snake_case
back_to_snake = humps.decamelize(camel_dict)
# Exactly matches original snake_dict

# FastAPI + Pydantic v2 with automatic camelCase conversion
from pydantic import BaseModel, ConfigDict
from humps import camelize

class UserProfile(BaseModel):
    model_config = ConfigDict(alias_generator=camelize, populate_by_name=True)
    user_name: str
    email_address: str

# Now accepts both:
# { "user_name": "alice" }  (snake_case)
# { "userName": "alice" }   (camelCase alias)
profile = UserProfile.model_validate({'userName': 'alice', 'emailAddress': 'a@b.com'})
print(profile.user_name)  # "alice"
print(profile.model_dump(by_alias=True))  # { 'userName': ..., 'emailAddress': ... }`}</code></pre>

      {/* Section 6: Go cases package */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Go — Unicode-Aware Case Conversion
      </h2>
      <p>
        Go&apos;s standard library provides basic string case operations. For more sophisticated unicode-aware conversions,
        the <code>golang.org/x/text/cases</code> package handles locale-specific casing rules correctly.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`package main

import (
    "strings"
    "unicode"
    "fmt"
    "regexp"
    "golang.org/x/text/cases"
    "golang.org/x/text/language"
)

// Basic Go string case operations (standard library)
func basicCases() {
    s := "Hello World"
    fmt.Println(strings.ToLower(s))  // "hello world"
    fmt.Println(strings.ToUpper(s))  // "HELLO WORLD"
    fmt.Println(strings.Title(s))    // "Hello World" (deprecated, use cases package)
}

// Unicode-aware title case (golang.org/x/text/cases)
// go get golang.org/x/text
func unicodeTitleCase(s string, lang language.Tag) string {
    caser := cases.Title(lang)
    return caser.String(s)
}

// camelCase to snake_case conversion in Go
var matchFirstCap = regexp.MustCompile("(.)([A-Z][a-z]+)")
var matchAllCap   = regexp.MustCompile("([a-z0-9])([A-Z])")

func toSnakeCase(str string) string {
    snake := matchFirstCap.ReplaceAllString(str, "${1}_${2}")
    snake  = matchAllCap.ReplaceAllString(snake, "${1}_${2}")
    return strings.ToLower(snake)
}

// snake_case to camelCase
func toCamelCase(str string) string {
    parts := strings.Split(str, "_")
    result := parts[0] // keep first part as-is (lowercase start)
    for _, part := range parts[1:] {
        if len(part) > 0 {
            result += strings.ToUpper(part[:1]) + part[1:]
        }
    }
    return result
}

// snake_case to PascalCase
func toPascalCase(str string) string {
    parts := strings.Split(str, "_")
    result := ""
    for _, part := range parts {
        if len(part) > 0 {
            result += strings.ToUpper(part[:1]) + part[1:]
        }
    }
    return result
}

// Check if rune is uppercase
func isUpper(r rune) bool {
    return unicode.IsUpper(r)
}

func main() {
    fmt.Println(toSnakeCase("CamelCaseString"))     // "camel_case_string"
    fmt.Println(toSnakeCase("HTMLParser"))           // "html_parser"
    fmt.Println(toCamelCase("hello_world"))          // "helloWorld"
    fmt.Println(toPascalCase("user_profile"))        // "UserProfile"

    // Unicode title case (English)
    enCaser := cases.Title(language.English)
    fmt.Println(enCaser.String("hello world"))       // "Hello World"

    // Turkish locale handles ı/İ correctly
    trCaser := cases.Title(language.Turkish)
    fmt.Println(trCaser.String("istanbul"))          // "İstanbul" (dotted I)
}`}</code></pre>

      {/* Section 7: Database Column Naming */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Database Column Naming — ORM Case Conversion
      </h2>
      <p>
        The mismatch between database snake_case column names and application camelCase variables is one of the most
        common sources of friction in backend development. ORMs handle this automatically with proper configuration.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        SQLAlchemy (Python)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# SQLAlchemy with snake_case column names (Python convention)
from sqlalchemy import Column, String, Integer, DateTime, Boolean
from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped
from datetime import datetime

class Base(DeclarativeBase):
    pass

class UserAccount(Base):
    __tablename__ = 'user_accounts'

    user_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email_address: Mapped[str] = mapped_column(String(255), unique=True)
    display_name: Mapped[str] = mapped_column(String(100))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

# Pydantic schema for API serialization (camelCase for JSON output)
from pydantic import BaseModel, ConfigDict
from humps import camelize

class UserAccountResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,  # Allow ORM object -> Pydantic
        alias_generator=camelize,
        populate_by_name=True,
    )
    user_id: int
    email_address: str
    display_name: str
    is_active: bool
    created_at: datetime

# SQLAlchemy model -> Pydantic schema -> JSON output
user = db.query(UserAccount).first()
response = UserAccountResponse.model_validate(user)
print(response.model_dump(by_alias=True))
# { "userId": 1, "emailAddress": "alice@example.com", "displayName": "Alice", ... }`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Prisma ORM (TypeScript)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Prisma schema: snake_case in database, camelCase in TypeScript
// schema.prisma
model UserAccount {
  user_id       Int      @id @default(autoincrement()) @map("user_id")
  email_address String   @unique @map("email_address")
  display_name  String   @map("display_name")
  is_active     Boolean  @default(true) @map("is_active")
  created_at    DateTime @default(now()) @map("created_at")

  @@map("user_accounts")
}

// Prisma auto-generates TypeScript types with camelCase:
// { userId: number; emailAddress: string; displayName: string; ... }

// Usage in TypeScript — automatically camelCase
const user = await prisma.userAccount.findFirst({
  where: { isActive: true },  // camelCase in TypeScript
  select: {
    userId: true,
    emailAddress: true,
    displayName: true,
  }
});
// Generated SQL: SELECT user_id, email_address, display_name FROM user_accounts WHERE is_active = true

// Drizzle ORM — explicit column naming
import { pgTable, serial, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';

export const userAccounts = pgTable('user_accounts', {
  userId: serial('user_id').primaryKey(),         // TS field: userId, DB column: user_id
  emailAddress: varchar('email_address', { length: 255 }).unique(),
  displayName: varchar('display_name', { length: 100 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});`}</code></pre>

      {/* Section 8: API Response Case Conversion */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        API Response Case Conversion — Axios Interceptors and Fetch Middleware
      </h2>
      <p>
        The most common real-world case conversion challenge: a Python or Ruby backend sends JSON with <code>snake_case</code>{' '}
        keys, but your JavaScript/TypeScript frontend expects <code>camelCase</code>. Handle this systematically with
        interceptors instead of converting keys ad-hoc throughout your codebase.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Axios Interceptors
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { camelCase, snakeCase } from 'change-case';

// Generic recursive key transformer
function transformKeys(
  obj: unknown,
  transform: (key: string) => string
): unknown {
  if (Array.isArray(obj)) {
    return obj.map(item => transformKeys(item, transform));
  }
  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
        transform(key),
        transformKeys(value, transform),
      ])
    );
  }
  return obj;
}

const camelizeKeys = (obj: unknown) => transformKeys(obj, camelCase);
const snakelizeKeys = (obj: unknown) => transformKeys(obj, snakeCase);

// Create axios instance with automatic case conversion
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor: snake_case -> camelCase
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data && typeof response.data === 'object') {
      response.data = camelizeKeys(response.data);
    }
    return response;
  },
  error => Promise.reject(error)
);

// Request interceptor: camelCase -> snake_case
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.data && typeof config.data === 'object') {
      config.data = snakelizeKeys(config.data);
    }
    return config;
  },
  error => Promise.reject(error)
);

// Now all requests/responses automatically handle case conversion
const { data } = await api.get<UserProfile>('/api/users/123');
// data.userName, data.emailAddress — already camelCase

await api.post('/api/users', { firstName: 'Alice', emailAddress: 'a@b.com' });
// Sends: { first_name: 'Alice', email_address: 'a@b.com' }`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Fetch API Middleware
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import { camelCase, snakeCase } from 'change-case';

// Re-use key transformers from above
function transformKeys(obj: unknown, fn: (k: string) => string): unknown { ... }
const camelizeKeys = (obj: unknown) => transformKeys(obj, camelCase);
const snakelizeKeys = (obj: unknown) => transformKeys(obj, snakeCase);

// fetch wrapper with automatic case conversion
async function fetchApi<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  // Convert request body keys to snake_case
  if (options.body && typeof options.body === 'string') {
    try {
      const parsed = JSON.parse(options.body);
      options.body = JSON.stringify(snakelizeKeys(parsed));
    } catch { /* not JSON, leave as-is */ }
  }

  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });

  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
  }

  const json = await response.json();
  return camelizeKeys(json) as T;
}

// Usage — fully typed, automatic case conversion
interface UserProfile {
  userId: number;
  userName: string;
  emailAddress: string;
}

const user = await fetchApi<UserProfile>('/api/users/123');
console.log(user.userName); // camelCase, regardless of what server sent`}</code></pre>

      {/* Section 9: File Naming Conventions */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        File Naming Conventions — By Language and Ecosystem
      </h2>
      <p>
        File naming conventions are enforced by linters, build tools, and team conventions. Using the wrong convention
        can cause case-sensitive import failures on Linux servers even when the code works on macOS.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Ecosystem</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Convention</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>React components</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>PascalCase.tsx</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>UserProfile.tsx</code>, <code>NavBar.tsx</code>, <code>ProductCard.tsx</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>React hooks</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>camelCase.ts</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>useAuth.ts</code>, <code>useDebounce.ts</code>, <code>useLocalStorage.ts</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>CSS Modules</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>kebab-case.module.css</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>user-profile.module.css</code>, <code>nav-bar.module.css</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Next.js routes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>kebab-case/</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>app/user-profile/page.tsx</code>, <code>app/blog-posts/[slug]/page.tsx</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Python modules</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>snake_case.py</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>user_service.py</code>, <code>auth_middleware.py</code>, <code>db_models.py</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Java classes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>PascalCase.java</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>UserService.java</code>, <code>HttpController.java</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Go packages</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>lowercase</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>userservice.go</code>, <code>httphandler.go</code> (single word preferred)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Rust files</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>snake_case.rs</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>user_service.rs</code>, <code>http_client.rs</code>, <code>lib.rs</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>npm packages</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>kebab-case</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>change-case</code>, <code>react-router-dom</code>, <code>next-auth</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# ESLint rule to enforce file naming conventions
# .eslintrc.json
{
  "rules": {
    // Enforce PascalCase for React component files
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "default",
        "format": ["camelCase"]
      },
      {
        "selector": "typeLike",
        "format": ["PascalCase"]
      },
      {
        "selector": "enumMember",
        "format": ["UPPER_CASE"]
      }
    ]
  }
}

# Case-sensitivity trap on macOS vs Linux:
# macOS: case-insensitive by default (HFS+)
# Linux: case-sensitive (ext4)

# These import successfully on macOS but FAIL on Linux:
import UserProfile from './userprofile';  // Wrong case
import NavBar from './Navbar';            // Wrong case

# Always match the exact filename case:
import UserProfile from './UserProfile';  // Correct
import NavBar from './NavBar';            // Correct`}</code></pre>

      {/* Section 10: CSS Class Naming — BEM */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CSS Class Naming — BEM, Tailwind, SMACSS Patterns
      </h2>
      <p>
        CSS class naming methodologies provide structure and predictability. The naming convention you choose
        determines how readable and maintainable your stylesheets remain as the project grows.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        BEM — Block Element Modifier
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* BEM naming: block__element--modifier */
/* All lowercase, kebab-case for multi-word segments */

/* Block — standalone component */
.card { }
.nav-bar { }
.search-form { }

/* Element — part of a block, separated by double underscore */
.card__title { }
.card__body { }
.card__footer { }
.nav-bar__logo { }
.nav-bar__menu-item { }  /* multi-word element: kebab within segment */
.search-form__input { }
.search-form__submit-btn { }

/* Modifier — variant of block or element, separated by double hyphen */
.card--featured { }           /* block modifier */
.card--dark-theme { }         /* multi-word modifier */
.card__title--large { }       /* element modifier */
.nav-bar__menu-item--active { }  /* element + modifier */
.btn--primary { }
.btn--sm { }
.btn--disabled { }

/* Usage in HTML */
<div class="card card--featured">
  <h2 class="card__title card__title--large">Featured Article</h2>
  <div class="card__body">Content here</div>
  <footer class="card__footer">
    <button class="btn btn--primary">Read More</button>
  </footer>
</div>`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Tailwind CSS — Utility-First (All kebab-case)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Tailwind uses kebab-case for all utilities */
/* Pattern: {property}-{value} or {breakpoint}:{property}-{value} */

/* Spacing: p-4 = padding: 1rem, mx-auto = margin-left/right: auto */
/* Typography: text-xl, font-bold, text-gray-500, tracking-wide */
/* Layout: flex, grid, grid-cols-3, gap-4, flex-col */
/* Responsive: sm:text-lg md:grid-cols-2 lg:max-w-4xl */
/* State: hover:bg-blue-600 focus:ring-2 active:scale-95 */
/* Dark mode: dark:bg-gray-800 dark:text-white */

/* Component example using Tailwind */
<div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
  <h2 className="mb-2 text-xl font-bold text-gray-900">Card Title</h2>
  <p className="text-gray-500">Card body text</p>
  <button className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
    Action
  </button>
</div>

/* Custom Tailwind utilities — still kebab-case */
/* tailwind.config.ts */
theme: {
  extend: {
    colors: {
      'brand-primary': '#3b82f6',       /* class: text-brand-primary */
      'brand-secondary': '#8b5cf6',     /* class: bg-brand-secondary */
    },
    spacing: {
      '18': '4.5rem',    /* class: p-18, m-18 */
      '128': '32rem',    /* class: max-w-128 */
    }
  }
}`}</code></pre>

      {/* Section 11: URL Slug Generation */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        URL Slug Generation — Handling Unicode, Accents, and Edge Cases
      </h2>
      <p>
        A <strong>URL slug</strong> is a URL-safe string representation of a title or name. Slugs must be lowercase,
        hyphen-separated, and contain only ASCII-safe characters. This requires handling accented characters,
        special symbols, apostrophes, and leading/trailing hyphens.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Manual slug generation — handles common cases
function slugify(str: string): string {
  return str
    .toLowerCase()
    // Normalize unicode: decompose accents (é -> e + combining accent)
    .normalize('NFD')
    // Remove combining diacritical marks (accents, umlauts, etc.)
    .replace(/[\u0300-\u036f]/g, '')
    // Replace & with 'and'
    .replace(/&/g, '-and-')
    // Replace remaining non-alphanumeric with hyphens
    .replace(/[^a-z0-9\s-]/g, '')
    // Replace spaces and multiple hyphens with single hyphen
    .replace(/[\s_-]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}

slugify('Hello World')                   // "hello-world"
slugify("What's New in React 19?")       // "whats-new-in-react-19"
slugify('Café & Restaurant Review')      // "cafe-and-restaurant-review"
slugify('Ñoño español')                  // "nono-espanol"
slugify('  --Leading Hyphens--  ')       // "leading-hyphens"
slugify('C++ Programming Guide')         // "c-programming-guide"
slugify('Node.js vs Deno vs Bun 2026')   // "nodejs-vs-deno-vs-bun-2026"`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# npm install slugify — handles even more edge cases
import { default as slugifyFn } from 'slugify';

slugifyFn('Hello World', { lower: true })
// "hello-world"

slugifyFn('Ñoño español', { lower: true, locale: 'es' })
// "nonno-espanol" (locale-aware transliteration)

slugifyFn('Üniversität München', { lower: true, locale: 'de' })
// "universitaet-muenchen" (ü -> ue in German)

slugifyFn('日本語タイトル', { lower: true })
// "" — non-Latin scripts need romanization first

# Python: pip install python-slugify
from slugify import slugify

slugify('Hello World')                  # "hello-world"
slugify('Café & Restaurant')           # "cafe-restaurant"
slugify('Ñoño español')                # "nono-espanol"

# With custom separator
slugify('hello world', separator='_')  # "hello_world"

# Preserve unicode (for non-Latin scripts)
slugify('日本語', allow_unicode=True)   # "日本語"

# Max length for database columns
slugify('Very Long Title That Exceeds The Limit', max_length=30)
# "very-long-title-that-exceeds"`}</code></pre>

      {/* Section 12: Advanced Regex for Case Conversion */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Regular Expressions for Case Conversion — Deep Dive
      </h2>
      <p>
        Understanding the regex patterns behind case conversion helps you handle edge cases correctly and debug
        unexpected behavior in existing tools. The key challenges are word boundary detection, acronym handling,
        and digit boundaries.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Word Boundary Patterns
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Pattern 1: Detect camelCase boundaries
// Matches: lowercase or digit immediately followed by uppercase
// "helloWorld" => positions: [5] (between 'o' and 'W')
const camelBoundary = /([a-z\d])([A-Z])/g;

// Pattern 2: Detect acronym boundaries
// Matches: sequence of uppercase followed by uppercase+lowercase
// "XMLParser" => "XML" + "Parser"
// "HTTPSRequest" => "HTTPS" + "Request"
const acronymBoundary = /([A-Z]+)([A-Z][a-z])/g;

// Pattern 3: Non-word separators (underscores, hyphens, dots, spaces)
const separators = /[\s_\-\.]+/g;

// Combining all three for complete word splitting:
function getWordBoundaries(str: string): string[] {
  return str
    .replace(camelBoundary, '$1 $2')    // Step 1: camelCase
    .replace(acronymBoundary, '$1 $2')  // Step 2: acronyms
    .replace(separators, ' ')           // Step 3: separators
    .trim()
    .toLowerCase()
    .split(' ')
    .filter(Boolean);
}

// Walkthrough with "getHTTPSResponse":
// After step 1: "get H T T P S Response"? No — let's trace carefully
// Input: "getHTTPSResponse"
// Step 1 (camelBoundary): matches 't' followed by 'H' => "get HTTPSResponse"
//   Also matches 'S' followed by 'R'? No — 'S' is uppercase, not matched by [a-z\d]
// After step 1: "get HTTPSResponse"
// Step 2 (acronymBoundary): matches "HTTPS" followed by "Re" (R is uppercase, e is lowercase)
//   => "get HTTPS Response"
// After step 2: "get HTTPS Response"
// Step 3: no separators to replace
// Lowercase + split: ["get", "https", "response"]
// Result: getHTTPSResponse => ["get", "https", "response"]

console.log(getWordBoundaries('getHTTPSResponse'));  // ["get", "https", "response"]
console.log(getWordBoundaries('XMLParser'));          // ["xml", "parser"]
console.log(getWordBoundaries('base64Encode'));       // ["base64", "encode"]
console.log(getWordBoundaries('user_name-v2'));       // ["user", "name", "v2"]`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Acronym Handling Strategies
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Different teams handle acronyms differently. Know your team's convention:

// Strategy 1: Always lowercase (most common, what change-case does)
// "XMLParser" => "xml_parser" (snake), "xmlParser" (camel), "XmlParser" (pascal)
// "HTTPSRequest" => "https_request", "httpsRequest", "HttpsRequest"

// Strategy 2: Preserve acronym in UPPER (uncommon, harder to implement)
// "XMLParser" => "XML_Parser" (snake), "XMLParser" (camel), "XMLParser" (pascal)
// This requires knowing which words are acronyms

// Strategy 3: Minimal split (split only on case transitions)
// "XMLParser" is kept as one word if no transition detected

// The change-case library uses Strategy 1 by default:
import { snakeCase, camelCase, pascalCase } from 'change-case';

console.log(snakeCase('XMLParser'));      // "xml_parser"
console.log(snakeCase('HTTPSRequest'));   // "https_request"
console.log(snakeCase('getHTTPSResponse')); // "get_https_response"
console.log(camelCase('xml_parser'));     // "xmlParser"
console.log(pascalCase('xml_parser'));    // "XmlParser"

// Custom acronym list (if you need Strategy 2):
const KNOWN_ACRONYMS = new Set(['xml', 'http', 'https', 'api', 'url', 'id', 'uuid', 'html', 'css', 'sql']);

function toSnakeCaseWithAcronyms(str: string): string {
  const words = getWordBoundaries(str);
  return words.map(w => KNOWN_ACRONYMS.has(w) ? w.toUpperCase() : w).join('_');
}

console.log(toSnakeCaseWithAcronyms('getHTTPSResponse')); // "get_HTTPS_response"
console.log(toSnakeCaseWithAcronyms('parseXMLData'));     // "parse_XML_data"`}</code></pre>

      {/* Section 13: TypeScript Template Literal Types */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        TypeScript — Template Literal Types for Case Conversion
      </h2>
      <p>
        TypeScript 4.1 introduced <strong>template literal types</strong> and built-in intrinsic string types
        that enable type-level case manipulation. This lets you build APIs that enforce naming conventions at
        compile time — catching case errors before runtime.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Built-in Intrinsic String Types
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// TypeScript 4.1+ built-in intrinsic string manipulation types
type Upper = Uppercase<'hello world'>;   // "HELLO WORLD"
type Lower = Lowercase<'HELLO WORLD'>;   // "hello world"
type Cap = Capitalize<'hello world'>;    // "Hello world"
type Uncap = Uncapitalize<'Hello'>;      // "hello"

// Practical use: type-safe event names
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ClickEvent = EventName<'click'>;    // "onClick"
type ChangeEvent = EventName<'change'>;  // "onChange"
type FocusEvent = EventName<'focus'>;    // "onFocus"

// Build a typed event handler map
type EventHandlers<Events extends string> = {
  [E in Events as EventName<E>]?: (e: Event) => void;
};

type MyHandlers = EventHandlers<'click' | 'focus' | 'blur'>;
// { onClick?: (e: Event) => void; onFocus?: ...; onBlur?: ...; }

// CSS property transformation: camelCase JS -> kebab-case CSS property
// TypeScript can enforce this at the type level
function cssVar<T extends string>(name: T): \`var(--\${T})\` {
  return \`var(--\${name})\` as \`var(--\${T})\`;
}
const color = cssVar('primary-color');  // type: "var(--primary-color)"
// cssVar('primaryColor') is valid too, but the type reflects what you pass`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Advanced Template Literal Types — CamelCase and KebabCase
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Type-level snake_case to camelCase conversion
// Works with TypeScript's type inference for simple cases

// KebabCase type: converts snake_case to kebab-case
type KebabCase<S extends string> =
  S extends \`\${infer Head}_\${infer Tail}\`
    ? \`\${Head}-\${KebabCase<Tail>}\`
    : S;

type Test1 = KebabCase<'hello_world_foo'>;  // "hello-world-foo"
type Test2 = KebabCase<'user_name'>;        // "user-name"
type Test3 = KebabCase<'my_api_key'>;       // "my-api-key"

// SnakeCase type: converts camelCase to snake_case using conditional types
// (Simplified version — TypeScript can't do regex at type level)
// For full camelCase -> snake_case, you need recursive types with infer

// CamelCase type: converts snake_case to camelCase
type CamelCase<S extends string> =
  S extends \`\${infer Head}_\${infer Tail}\`
    ? \`\${Head}\${Capitalize<CamelCase<Tail>>}\`
    : S;

type Test4 = CamelCase<'hello_world'>;      // "helloWorld"
type Test5 = CamelCase<'user_api_key'>;     // "userApiKey"
type Test6 = CamelCase<'get_http_response'>; // "getHttpResponse"

// Practical: type-safe object key transformer
type CamelizeKeys<T extends Record<string, unknown>> = {
  [K in keyof T as CamelCase<K & string>]: T[K] extends Record<string, unknown>
    ? CamelizeKeys<T[K]>
    : T[K];
};

type ApiResponse = {
  user_name: string;
  email_address: string;
  profile_data: {
    theme_color: string;
    font_size: number;
  };
};

type Normalized = CamelizeKeys<ApiResponse>;
// {
//   userName: string;
//   emailAddress: string;
//   profileData: { themeColor: string; fontSize: number; }
// }

// The type checker now enforces correct key names
function normalize(data: ApiResponse): Normalized {
  return {
    userName: data.user_name,
    emailAddress: data.email_address,
    profileData: {
      themeColor: data.profile_data.theme_color,
      fontSize: data.profile_data.font_size,
    }
  };
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Type-Safe Configuration Keys
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Enforce env var naming convention at type level
type EnvVarName = \`\${Uppercase<string>}_\${Uppercase<string>}\`;

// Type-safe CSS custom property access
type CssVariable<T extends string> = \`--\${KebabCase<T>}\`;

type ButtonVars = CssVariable<'primary_color' | 'border_radius' | 'font_size'>;
// "--primary-color" | "--border-radius" | "--font-size"

// Typed path case for file system operations
type PathCase<S extends string> = KebabCase<Lowercase<S>>;

type ComponentPath<Name extends string> = \`/components/\${PathCase<Name>}/index.tsx\`;

type ButtonPath = ComponentPath<'NavBar'>;      // "/components/nav-bar/index.tsx"
type CardPath = ComponentPath<'ProductCard'>;   // "/components/product-card/index.tsx"

// Zod schema with type-safe key validation
import { z } from 'zod';

// Validate that all keys in a submitted form are camelCase
const camelCaseKey = z.string().regex(/^[a-z][a-zA-Z0-9]*$/, 'Must be camelCase');

const dynamicFormSchema = z.record(camelCaseKey, z.unknown());
// Accepts: { userName: 'alice', emailAddress: 'a@b.com' }
// Rejects: { user_name: 'alice' } -- TS/Zod will catch this`}</code></pre>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li>Use <strong>camelCase</strong> for JS/TS variables and functions, <strong>PascalCase</strong> for classes and React components.</li>
          <li><strong>snake_case</strong> is required for Python (PEP 8), PostgreSQL columns, and Rust; <strong>kebab-case</strong> for CSS, HTML, and URLs.</li>
          <li>Use <strong>SCREAMING_SNAKE_CASE</strong> universally for constants and environment variables across all languages.</li>
          <li>The <strong>change-case npm library</strong> handles all JS/TS case conversion with correct acronym and unicode support.</li>
          <li>The <strong>humps Python library</strong> (<code>pip install pyhumps</code>) provides recursive dict key conversion for API payloads.</li>
          <li>Use <strong>Axios interceptors</strong> or fetch middleware to automatically convert API keys between snake_case and camelCase.</li>
          <li>ORMs like <strong>Prisma and SQLAlchemy</strong> handle the snake_case database to camelCase application mapping automatically.</li>
          <li><strong>URL slugs</strong> require unicode normalization (NFD decomposition) to correctly handle accented characters before slugifying.</li>
          <li>TypeScript <strong>template literal types</strong> (<code>Uppercase&lt;T&gt;</code>, <code>Capitalize&lt;T&gt;</code>) enable compile-time case enforcement for API contracts.</li>
          <li>File naming case matters on case-sensitive Linux servers — always use consistent PascalCase for React components and snake_case for Python modules.</li>
        </ul>
      </div>
    </article>
  );
}
