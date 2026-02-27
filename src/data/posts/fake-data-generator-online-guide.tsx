'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Fake Data Generator: Generate Mock Data Online — Complete Guide',
    description: 'Generate realistic fake data for testing and development. Complete guide with Faker.js, Python Faker, Factory Boy, database seeding, data masking, and TypeScript type-safe mocks.',
  },
  zh: {
    title: '假数据生成器：在线生成模拟数据 — 完整指南',
    description: '为测试和开发生成真实的假数据。含 Faker.js、Python Faker、Factory Boy、数据库数据填充、数据脱敏和 TypeScript 类型安全 Mock 的完整指南。',
  },
};

export default function FakeDataGeneratorOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why should I use fake data instead of real production data for testing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Using real production data in development and testing environments violates privacy regulations like GDPR, CCPA, and HIPAA — exposing sensitive customer data to developers who do not need it. Fake data eliminates compliance risks, lets you create any edge case on demand (e.g., a user with 10,000 orders), enables deterministic tests that always produce the same result, allows sharing test datasets across teams without legal concerns, and is faster to generate than anonymizing production dumps. Tools like Faker.js (JavaScript) and the Faker library (Python) generate hundreds of realistic records per second.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Faker.js and how do I install it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Faker.js (npm package @faker-js/faker) is the most popular JavaScript library for generating fake data. It provides generators for names, emails, phone numbers, addresses, UUIDs, dates, lorem ipsum text, colors, URLs, credit card numbers, and much more in 60+ locales. Install it with: npm install --save-dev @faker-js/faker. Then import with: import { faker } from \'@faker-js/faker\'. For a specific locale: import { fakerZH_CN as faker } from \'@faker-js/faker\'. The library is tree-shakeable, TypeScript-native, and supports deterministic output via faker.seed(42).',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I generate deterministic (reproducible) fake data?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use faker.seed(number) to initialize the random number generator with a fixed seed. With the same seed, faker will always produce the exact same sequence of values — essential for reproducible tests and consistent test fixtures. Example: faker.seed(42); const name = faker.person.fullName(); // Always "John Doe" (or whatever it produces for seed 42). In Python, use fake = Faker(); fake.seed_instance(42) or Faker.seed(42) for the class-level seed. Factory Boy uses factory.Sequence for unique sequential values across test runs.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I seed a database with fake data using Node.js and Prisma?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Create a prisma/seed.ts file, generate fake records with @faker-js/faker, and use prisma.$transaction([...]) to insert them atomically. In package.json, add: "prisma": { "seed": "ts-node prisma/seed.ts" }. Then run npx prisma db seed. For referential integrity (users before orders), insert parent records first, collect their IDs, then use those IDs when creating child records. Use faker.seed(42) at the top of the file for reproducible data.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Factory Boy in Python and how does it differ from Faker?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Factory Boy is a Python fixtures library for generating model instances (Django ORM, SQLAlchemy, Pydantic). While Faker generates primitive values (strings, dates), Factory Boy builds complete model objects with proper relationships. Key concepts: factory.DjangoModelFactory creates and saves Django model instances; factory.SubFactory creates related objects; factory.Sequence generates unique sequential values; factory.LazyAttribute computes derived fields from other fields. Combine them: class UserFactory(DjangoModelFactory): email = factory.LazyAttribute(lambda o: f\'{o.first_name.lower()}@example.com\'). Factory Boy is ideal for Django test setUp and pytest fixtures.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I generate type-safe fake data in TypeScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use @faker-js/faker which is written in TypeScript and ships full type definitions. For Zod schemas, use the zod-mock package (npm install zod-mock @faker-js/faker) to auto-generate mocks: import { generateMock } from \'zod-mock\'; const mockUser = generateMock(UserSchema); This creates values matching your exact schema shape including union types and refinements. For more control, write typed factory functions: function createUser(overrides?: Partial<User>): User { return { id: faker.string.uuid(), name: faker.person.fullName(), ...overrides }; }',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I mask or anonymize production data for development use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Data masking replaces real values with fake but realistic ones while preserving data structure and referential integrity. Techniques: (1) Consistent substitution — use a deterministic seed based on the original value (sha256(email) → same fake email every run, so foreign key references stay valid). (2) Format-preserving — replace SSN "123-45-6789" with fake SSN "987-65-4321" preserving format. (3) Partial masking — "john.doe@example.com" → "jo**.***@example.com". (4) Nullification — replace sensitive fields with NULL or a constant placeholder. Never copy production PII to dev without masking. Tools: PostgreSQL anonymizer, Faker-based scripts, or ARX (open-source anonymization software).',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I generate millions of fake records efficiently without running out of memory?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use a streaming/batching approach instead of generating all records in memory at once. In Node.js: generate records in batches of 1000–10000, insert each batch, then GC. In Python: use session.bulk_insert_mappings() which is 10-100x faster than individual inserts, or use COPY FROM STDIN for PostgreSQL bulk loads. For CSV generation: use Python\'s csv.writer with a streaming generator, writing row-by-row to avoid memory spikes. Set faker.seed(42) for reproducibility. For 10M+ rows, consider generating CSV files and loading with database COPY commands (psql \\copy, MySQL LOAD DATA INFILE) for maximum throughput.',
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

      <link rel="canonical" href="https://viadreams.cc/en/blog/fake-data-generator-online-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A <strong>fake data generator</strong> creates realistic test data without exposing real user information.
          Use <strong>Faker.js</strong> (<code>@faker-js/faker</code>) for JavaScript/TypeScript and the <strong>Faker</strong> library
          for Python. Use <strong>Factory Boy</strong> for Django/SQLAlchemy model factories with relationships.
          Set <code>faker.seed(42)</code> for reproducible data. Never use production PII in dev — mask it first.
          Try our free{' '}
          <Link href={`/${lang}/tools/fake-data`} style={{ color: '#0284c7' }}>online fake data generator</Link> for
          instant JSON, CSV, and SQL output, or follow the code examples below.
        </p>
      </div>

      {/* Section 1: Why Fake Data Matters */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Why Fake Data Matters: Testing Without Production Data
      </h2>
      <p>
        Using real customer data in your development and staging environments is a compliance disaster waiting to happen.
        Under <strong>GDPR</strong>, every developer who touches a production database with customer PII becomes a data
        processor — subject to breach notifications, data subject access requests, and potential fines. Under{' '}
        <strong>HIPAA</strong>, exposing protected health information in a non-production environment can trigger
        mandatory audits and six-figure penalties.
      </p>
      <p>Beyond compliance, fake data offers real development advantages:</p>
      <ul>
        <li><strong>Edge case control</strong>: Create a user with 50,000 orders, a product with a 500-character name, or a date from 1899 — impossible with real data.</li>
        <li><strong>Reproducible tests</strong>: Seed your random generator and get the exact same data every run, making CI pipelines deterministic.</li>
        <li><strong>Team sharing</strong>: Commit seed scripts to Git and every developer gets identical starting data without legal concerns.</li>
        <li><strong>Performance testing</strong>: Generate 10 million rows on demand for load testing without waiting for production data exports.</li>
        <li><strong>Locale testing</strong>: Generate names, addresses, and phone numbers in Chinese, Arabic, Japanese, or Korean to test your rendering pipeline.</li>
        <li><strong>Development speed</strong>: No more waiting for anonymized production dumps — spin up fresh data in seconds.</li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        GDPR Compliance Quick Reference
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Data Type</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Risk Level</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Names, emails, phone numbers</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>High</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Replace with fake equivalents</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Credit card numbers</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Critical (PCI-DSS)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Never copy to dev; use test card numbers</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>IP addresses, device IDs</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#d97706' }}>Medium</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Randomize or nullify</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Order IDs, product SKUs</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Low</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Can use real values (not PII)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Aggregated statistics</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>None</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Safe to use as-is</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 2: Faker.js */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Faker.js (JavaScript/TypeScript) — Installation and Core APIs
      </h2>
      <p>
        <strong>@faker-js/faker</strong> is the community-maintained successor to the original faker.js library.
        It is written in TypeScript, ships full type definitions, is tree-shakeable, and supports 60+ locales.
        Install it as a dev dependency since it is only needed for tests and seed scripts:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install --save-dev @faker-js/faker
# or
yarn add --dev @faker-js/faker
# or
pnpm add -D @faker-js/faker`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Generating Core Data Types
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import { faker } from '@faker-js/faker';

// --- Person ---
faker.person.fullName();           // "John Doe"
faker.person.firstName('male');    // "James"
faker.person.lastName();           // "Smith"
faker.person.prefix();             // "Dr."
faker.person.suffix();             // "Jr."
faker.person.jobTitle();           // "Senior Software Engineer"
faker.person.bio();                // "I live in the moment."

// --- Internet ---
faker.internet.email();            // "john.doe@example.com"
faker.internet.username();         // "johndoe42"
faker.internet.password({ length: 16, memorable: false }); // "xK7mZp2QrNvBwLfA"
faker.internet.url();              // "https://www.example.org/path"
faker.internet.ip();               // "192.168.1.100"
faker.internet.ipv6();             // "2001:db8::1"
faker.internet.userAgent();        // "Mozilla/5.0..."

// --- Phone ---
faker.phone.number();              // "+1 (555) 123-4567"
faker.phone.number('(###) ###-####'); // "(555) 123-4567"

// --- Location (formerly Address) ---
faker.location.streetAddress();    // "123 Main St"
faker.location.city();             // "San Francisco"
faker.location.state();            // "California"
faker.location.stateAbbr();        // "CA"
faker.location.zipCode();          // "94102"
faker.location.country();          // "United States"
faker.location.countryCode();      // "US"
faker.location.latitude();         // 37.7749
faker.location.longitude();        // -122.4194

// --- Identifiers ---
faker.string.uuid();               // "550e8400-e29b-41d4-a716-446655440000"
faker.string.nanoid();             // "V1StGXR8_Z5jdHi6B-myT"
faker.string.alphanumeric(10);     // "aBcDeFgHiJ"

// --- Numbers ---
faker.number.int({ min: 1, max: 100 });       // 42
faker.number.float({ min: 0, max: 1, multipleOf: 0.01 }); // 0.73
faker.number.bigInt({ min: 1n, max: 1000000n }); // 738291n

// --- Dates ---
faker.date.past({ years: 2 });          // Date object 0-2 years ago
faker.date.future({ years: 1 });        // Date object 0-1 years from now
faker.date.between({ from: '2020-01-01', to: '2024-12-31' });
faker.date.recent({ days: 30 });        // Date in the last 30 days
faker.date.birthdate({ mode: 'age', min: 18, max: 65 }); // realistic birthdate

// --- Lorem ---
faker.lorem.word();                // "lorem"
faker.lorem.sentence();            // "Lorem ipsum dolor sit amet."
faker.lorem.sentences(3);         // three sentences
faker.lorem.paragraph();           // ~4 sentences
faker.lorem.paragraphs(2);         // two paragraphs

// --- Commerce ---
faker.commerce.productName();      // "Awesome Granite Shoes"
faker.commerce.price({ min: 10, max: 500, dec: 2 }); // "149.99"
faker.commerce.department();       // "Electronics"

// --- Company ---
faker.company.name();              // "Acme Corp"
faker.company.catchPhrase();       // "Synergistic real-time matrices"
faker.company.buzzPhrase();        // "streamline B2B solutions"

// --- Finance ---
faker.finance.accountNumber();     // "12345678"
faker.finance.amount({ min: 100, max: 10000, dec: 2, symbol: '$' }); // "$4,231.67"
faker.finance.currencyCode();      // "USD"
faker.finance.creditCardNumber();  // "4111 1111 1111 1111" (Luhn-valid)
faker.finance.creditCardCVV();     // "123"
faker.finance.iban();              // "GB29NWBK60161331926819"

// --- Color ---
faker.color.human();               // "blue"
faker.color.rgb();                 // "rgb(100, 200, 50)"
faker.color.hsl();                 // "hsl(200, 80%, 60%)"
faker.color.css();                 // "#3d82c4"

// --- Image ---
faker.image.url();                 // "https://picsum.photos/640/480"
faker.image.avatar();              // "https://avatars.githubusercontent.com/u/..."

// --- System ---
faker.system.fileName();           // "report_2024.pdf"
faker.system.mimeType();           // "application/json"
faker.system.fileExt('image');     // "png"`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Locale Support — Generating Localized Data
      </h3>
      <p>
        Faker.js supports 60+ locales. You can either set the locale globally or import a locale-specific faker instance:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import { fakerZH_CN, fakerJA, fakerDE, fakerAR, fakerFR } from '@faker-js/faker';

// Chinese (Simplified)
fakerZH_CN.person.fullName();      // "王伟"
fakerZH_CN.location.city();        // "北京市"
fakerZH_CN.phone.number();         // "138-0013-8000"

// Japanese
fakerJA.person.fullName();         // "田中 太郎"
fakerJA.location.city();           // "東京都"

// German
fakerDE.person.fullName();         // "Hans Müller"
fakerDE.location.city();           // "Berlin"
fakerDE.internet.email();          // "hans.mueller@example.de"

// Arabic
fakerAR.person.fullName();         // "محمد الأحمد"
fakerAR.location.city();           // "الرياض"

// French
fakerFR.person.fullName();         // "Pierre Dupont"
fakerFR.location.city();           // "Paris"

// Fallback to English for missing translations
import { Faker, zh_CN, en } from '@faker-js/faker';
const faker = new Faker({ locale: [zh_CN, en] }); // zh_CN with en fallback`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Deterministic Data with faker.seed()
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import { faker } from '@faker-js/faker';

// Set seed ONCE at the start — same seed = same data every run
faker.seed(42);

const user1 = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
};

const user2 = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
};

// Running this script again with seed(42) produces IDENTICAL output
// Perfect for: CI fixtures, snapshot tests, reproducible seed scripts

// Per-entity seed (reset seed for each entity)
function createDeterministicUser(index: number) {
  faker.seed(index); // different seed per index
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };
}
// createDeterministicUser(1) always returns the same user
// createDeterministicUser(2) always returns a different but consistent user`}</code></pre>

      {/* Section 3: Structured Fake Data Objects */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Structured Fake Data — User, Product, and Order Objects
      </h2>
      <p>
        Real applications deal with structured objects, not individual values. Here are complete factory functions
        for common data shapes used in e-commerce, SaaS, and API testing:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import { faker } from '@faker-js/faker';

// --- User ---
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  role: 'admin' | 'user' | 'moderator';
  createdAt: string;
  isVerified: boolean;
}

function createUser(overrides: Partial<User> = {}): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      country: faker.location.country(),
    },
    role: faker.helpers.arrayElement(['admin', 'user', 'user', 'user', 'moderator']),
    createdAt: faker.date.past({ years: 2 }).toISOString(),
    isVerified: faker.datatype.boolean({ probability: 0.8 }),
    ...overrides,
  };
}

// --- Product ---
interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
}

function createProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: faker.string.uuid(),
    sku: faker.string.alphanumeric(8).toUpperCase(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 5, max: 2000 })),
    category: faker.commerce.department(),
    stock: faker.number.int({ min: 0, max: 500 }),
    images: Array.from({ length: 3 }, () => faker.image.url({ width: 640, height: 480 })),
    rating: faker.number.float({ min: 1, max: 5, multipleOf: 0.1 }),
    reviewCount: faker.number.int({ min: 0, max: 5000 }),
    tags: faker.helpers.arrayElements(
      ['sale', 'new', 'popular', 'limited', 'eco', 'premium'],
      { min: 0, max: 3 }
    ),
    ...overrides,
  };
}

// --- Order ---
interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  shippingAddress: string;
  createdAt: string;
  deliveredAt: string | null;
}

function createOrder(userId: string, overrides: Partial<Order> = {}): Order {
  const itemCount = faker.number.int({ min: 1, max: 6 });
  const items: OrderItem[] = Array.from({ length: itemCount }, () => {
    const quantity = faker.number.int({ min: 1, max: 5 });
    const unitPrice = parseFloat(faker.commerce.price({ min: 5, max: 500 }));
    return {
      productId: faker.string.uuid(),
      productName: faker.commerce.productName(),
      quantity,
      unitPrice,
      total: parseFloat((quantity * unitPrice).toFixed(2)),
    };
  });
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const status = faker.helpers.arrayElement([
    'pending', 'processing', 'shipped', 'delivered', 'delivered', 'delivered'
  ] as const);

  return {
    id: faker.string.uuid(),
    userId,
    status,
    items,
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax,
    total: parseFloat((subtotal + tax).toFixed(2)),
    shippingAddress: faker.location.streetAddress(true),
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    deliveredAt: status === 'delivered' ? faker.date.recent({ days: 30 }).toISOString() : null,
    ...overrides,
  };
}

// --- Generate arrays of records ---
const users = Array.from({ length: 100 }, () => createUser());
const products = Array.from({ length: 50 }, () => createProduct());
const orders = users.flatMap(u =>
  Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => createOrder(u.id))
);

console.log(\`Generated \${users.length} users, \${products.length} products, \${orders.length} orders\`);`}</code></pre>

      {/* Section 4: Database Seeding with Node.js and Prisma */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Database Seeding — Node.js with Prisma
      </h2>
      <p>
        Prisma provides a first-class seeding mechanism. Create a seed file, run it with{' '}
        <code>npx prisma db seed</code>, and it populates your database from scratch:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  faker.seed(42); // Reproducible — always generates same data

  // Cleanup existing data (order matters for FK constraints)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create users first (no FK dependencies)
  const users = await Promise.all(
    Array.from({ length: 20 }, () =>
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          phone: faker.phone.number(),
          createdAt: faker.date.past({ years: 2 }),
        },
      })
    )
  );

  // Create products
  const products = await Promise.all(
    Array.from({ length: 50 }, () =>
      prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
          stock: faker.number.int({ min: 0, max: 200 }),
          category: faker.commerce.department(),
        },
      })
    )
  );

  // Create orders with items — uses IDs from users and products above
  for (const user of users) {
    const orderCount = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < orderCount; i++) {
      const selectedProducts = faker.helpers.arrayElements(products, { min: 1, max: 4 });
      await prisma.order.create({
        data: {
          userId: user.id,
          status: faker.helpers.arrayElement(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED']),
          total: 0, // will be calculated
          items: {
            create: selectedProducts.map(product => ({
              productId: product.id,
              quantity: faker.number.int({ min: 1, max: 3 }),
              price: product.price,
            })),
          },
        },
      });
    }
  }

  console.log('Database seeded successfully!');
  console.log(\`  Users: \${users.length}\`);
  console.log(\`  Products: \${products.length}\`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// package.json — register the seed command
{
  "prisma": {
    "seed": "ts-node --compiler-options '{\"module\":\"CommonJS\"}' prisma/seed.ts"
  }
}

// Run seeding:
npx prisma db seed

// Reset database + reseed:
npx prisma migrate reset  // drops, re-creates schema, runs seed automatically`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Seeding with Sequelize
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// seeders/20240101-demo-users.js (Sequelize CLI seeder)
const { faker } = require('@faker-js/faker');
faker.seed(42);

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = Array.from({ length: 50 }, () => ({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password_hash: '$2b$12$placeholder', // use real bcrypt in actual seed
      created_at: faker.date.past({ years: 1 }),
      updated_at: new Date(),
    }));

    // bulkInsert is much faster than individual inserts
    await queryInterface.bulkInsert('users', users);

    // Insert related records using returned IDs
    const insertedUsers = await queryInterface.sequelize.query(
      'SELECT id FROM users ORDER BY created_at LIMIT 50',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const posts = insertedUsers.flatMap(user =>
      Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () => ({
        user_id: user.id,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(2),
        created_at: faker.date.recent({ days: 90 }),
        updated_at: new Date(),
      }))
    );

    await queryInterface.bulkInsert('posts', posts);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('posts', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};

// Run: npx sequelize-cli db:seed:all`}</code></pre>

      {/* Section 5: Python Faker */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python — Faker Library: Providers and Locale Support
      </h2>
      <p>
        The <strong>Faker</strong> Python library is the go-to solution for generating fake data in Python projects.
        It ships with dozens of providers covering every common data type.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`pip install faker`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`from faker import Faker
import random

fake = Faker('en_US')  # English locale

# --- Person ---
fake.name()                    # "John Doe"
fake.first_name()              # "John"
fake.last_name()               # "Doe"
fake.prefix()                  # "Mr."
fake.suffix()                  # "Jr."
fake.job()                     # "Software Engineer"
fake.name_male()               # male name
fake.name_female()             # female name

# --- Internet ---
fake.email()                   # "john.doe@example.com"
fake.user_name()               # "john_doe42"
fake.password(length=16)       # random password string
fake.url()                     # "https://www.example.com"
fake.domain_name()             # "example.com"
fake.ipv4()                    # "192.168.1.100"
fake.ipv6()                    # "2001:db8::1"
fake.user_agent()              # browser user agent string
fake.slug()                    # "lorem-ipsum-dolor"

# --- Address ---
fake.address()                 # full multi-line address
fake.street_address()          # "123 Main St"
fake.city()                    # "San Francisco"
fake.state()                   # "California"
fake.state_abbr()              # "CA"
fake.postcode()                # "94102"
fake.country()                 # "United States"
fake.latitude()                # 37.7749 (float)
fake.longitude()               # -122.4194 (float)

# --- Phone ---
fake.phone_number()            # "+1-555-123-4567"

# --- Company ---
fake.company()                 # "Acme Corp"
fake.catch_phrase()            # "Synergistic real-time matrices"
fake.company_suffix()          # "LLC"

# --- Date & Time ---
fake.date_of_birth(minimum_age=18, maximum_age=90)  # date object
fake.date_this_year()          # date object
fake.date_between(start_date='-2y', end_date='today')
fake.date_time_this_month()    # datetime object
fake.future_datetime()         # datetime in the future
fake.past_datetime()           # datetime in the past
fake.time()                    # "14:30:00"
fake.timezone()                # "America/New_York"
fake.unix_time()               # 1706745600 (int)
fake.iso8601()                 # "2024-02-01T00:00:00"

# --- Text ---
fake.word()                    # "lorem"
fake.sentence()                # "Lorem ipsum dolor sit amet."
fake.paragraph()               # ~4 sentences
fake.text(max_nb_chars=200)    # text of specific length
fake.bs()                      # business buzzword phrase

# --- Numbers ---
fake.random_int(min=1, max=1000)  # 42
fake.random_number(digits=6)       # 638291
fake.pydecimal(left_digits=5, right_digits=2, positive=True)  # Decimal('12345.67')
fake.pyfloat(min_value=0, max_value=100)  # 73.42

# --- Miscellaneous ---
fake.uuid4()                   # "550e8400-e29b-41d4-a716-446655440000"
fake.boolean()                 # True / False
fake.null_boolean()            # True / False / None
fake.color_name()              # "blue"
fake.hex_color()               # "#3d82c4"
fake.md5()                     # "5d41402abc4b2a76b9719d911017c592"
fake.sha256()                  # sha256 hex string
fake.file_name()               # "report.pdf"
fake.file_extension()          # "png"
fake.mime_type()               # "application/json"
fake.binary(length=16)         # bytes object`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Python Faker Locale Support
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`from faker import Faker

# Single locale
fake_cn = Faker('zh_CN')
fake_cn.name()           # "王伟"
fake_cn.address()        # "北京市朝阳区..."
fake_cn.phone_number()   # "138-0013-8000"

fake_ja = Faker('ja_JP')
fake_ja.name()           # "田中 太郎"
fake_ja.address()        # "東京都渋谷区..."

fake_de = Faker('de_DE')
fake_de.name()           # "Hans Müller"
fake_de.phone_number()   # "+49 30 1234567"

fake_ar = Faker('ar_AA')
fake_ar.name()           # "محمد الأحمد"

# Multiple locales — randomly selects from each
fake_multi = Faker(['en_US', 'de_DE', 'fr_FR', 'zh_CN'])
for _ in range(10):
    print(fake_multi.name())  # mix of English, German, French, Chinese names

# Deterministic seed
Faker.seed(42)            # class-level seed (affects all instances)
fake = Faker()
print(fake.name())        # Always the same name for seed 42

# Or instance-level seed (affects only this instance)
fake2 = Faker()
fake2.seed_instance(42)
print(fake2.name())       # Same name, reproducible`}</code></pre>

      {/* Section 6: Python SQLAlchemy Seeding */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python Database Seeding — SQLAlchemy and pytest Fixtures
      </h2>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# seed.py — SQLAlchemy bulk seeding
from faker import Faker
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from models import User, Product, Order, OrderItem, Base

fake = Faker()
Faker.seed(42)

engine = create_engine('postgresql://localhost/myapp_dev')
Base.metadata.create_all(engine)

def seed_users(session: Session, count: int = 100) -> list[User]:
    users = [
        User(
            email=fake.email(),
            name=fake.name(),
            phone=fake.phone_number(),
            is_active=fake.boolean(chance_of_getting_true=90),
            created_at=fake.date_time_this_year(),
        )
        for _ in range(count)
    ]
    session.bulk_save_objects(users)
    session.flush()  # flush to get DB-assigned IDs
    return session.query(User).all()

def seed_products(session: Session, count: int = 50) -> list[Product]:
    products = [
        Product(
            name=fake.catch_phrase(),
            description=fake.text(max_nb_chars=300),
            price=round(fake.pyfloat(min_value=5, max_value=1000), 2),
            stock=fake.random_int(min=0, max=500),
        )
        for _ in range(count)
    ]
    session.bulk_save_objects(products)
    session.flush()
    return session.query(Product).all()

def seed_orders(session: Session, users: list[User], products: list[Product]):
    for user in users[:50]:  # seed orders for first 50 users
        order_count = fake.random_int(min=0, max=5)
        for _ in range(order_count):
            order = Order(user_id=user.id, status=fake.random_element(['pending', 'completed']))
            session.add(order)
            session.flush()

            item_products = fake.random_elements(products, length=fake.random_int(1, 4), unique=True)
            for product in item_products:
                qty = fake.random_int(1, 5)
                session.add(OrderItem(
                    order_id=order.id,
                    product_id=product.id,
                    quantity=qty,
                    price=product.price,
                ))

with Session(engine) as session:
    with session.begin():
        users = seed_users(session, 100)
        products = seed_products(session, 50)
        seed_orders(session, users, products)
    print('Seeding complete!')`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        pytest Fixtures with Fake Data
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# conftest.py
import pytest
from faker import Faker
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from models import User, Product, Base

fake = Faker()

@pytest.fixture(scope='session')
def engine():
    engine = create_engine('sqlite:///:memory:')
    Base.metadata.create_all(engine)
    return engine

@pytest.fixture(scope='function')
def db_session(engine):
    """Each test gets a fresh rolled-back session."""
    connection = engine.connect()
    transaction = connection.begin()
    session = Session(bind=connection)
    yield session
    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture
def fake_user(db_session) -> User:
    user = User(
        email=fake.email(),
        name=fake.name(),
        is_active=True,
    )
    db_session.add(user)
    db_session.flush()
    return user

@pytest.fixture
def fake_product(db_session) -> Product:
    product = Product(
        name=fake.catch_phrase(),
        price=round(fake.pyfloat(min_value=10, max_value=500), 2),
        stock=100,
    )
    db_session.add(product)
    db_session.flush()
    return product

# Usage in tests:
def test_place_order(db_session, fake_user, fake_product):
    order = place_order(user_id=fake_user.id, product_id=fake_product.id, quantity=2)
    assert order.total == fake_product.price * 2
    assert order.user_id == fake_user.id`}</code></pre>

      {/* Section 7: Factory Boy */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Factory Boy — Model Factories for Django and SQLAlchemy
      </h2>
      <p>
        <strong>Factory Boy</strong> is a Python fixtures replacement library that integrates with Django ORM,
        SQLAlchemy, Pydantic, and plain Python classes. Unlike raw Faker, Factory Boy understands model
        relationships and generates complete, valid object graphs:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`pip install factory-boy`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# factories.py — Django example
import factory
import factory.django
from faker import Faker
from .models import User, Profile, Post, Comment

fake = Faker()

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    # Basic fields
    username = factory.Sequence(lambda n: f'user_{n}')  # user_0, user_1, user_2...
    email = factory.LazyAttribute(lambda obj: f'{obj.username}@example.com')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    is_active = True
    is_staff = False

    # Set password correctly (uses Django's set_password)
    @factory.post_generation
    def password(self, create, extracted, **kwargs):
        password = extracted or 'testpassword123'
        self.set_password(password)
        if create:
            self.save()

class ProfileFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Profile

    # SubFactory creates the related User automatically
    user = factory.SubFactory(UserFactory)
    bio = factory.Faker('paragraph')
    avatar_url = factory.Faker('image_url')
    location = factory.Faker('city')
    website = factory.Faker('url')
    birth_date = factory.Faker('date_of_birth', minimum_age=18, maximum_age=65)

class PostFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Post

    author = factory.SubFactory(UserFactory)
    title = factory.Faker('sentence', nb_words=6)
    content = factory.Faker('paragraphs', nb=3, as_text=True)
    published = True
    # LazyAttribute computes value from other fields
    slug = factory.LazyAttribute(lambda obj: obj.title.lower().replace(' ', '-')[:50])
    published_at = factory.Faker('past_datetime', start_date='-1y')

class CommentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Comment

    post = factory.SubFactory(PostFactory)
    author = factory.SubFactory(UserFactory)
    body = factory.Faker('paragraph')
    is_approved = factory.Faker('boolean', chance_of_getting_true=85)

# --- Usage ---
# Create a single user (saved to DB)
user = UserFactory()

# Create without saving to DB
user = UserFactory.build()

# Override specific fields
admin_user = UserFactory(is_staff=True, is_superuser=True)

# Create with related objects automatically
comment = CommentFactory()
# This creates: Comment → Post → User (for post author) + User (for comment author)

# Create multiple instances
users = UserFactory.create_batch(10)

# Create user with multiple posts
user = UserFactory()
posts = PostFactory.create_batch(5, author=user)

# Create with overridden SubFactory
existing_user = UserFactory()
post = PostFactory(author=existing_user)

# Stub (no DB, no validation, fastest)
user_stub = UserFactory.stub()`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Advanced Factory Boy Patterns
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import factory
from decimal import Decimal
from .models import Order, OrderItem, Product

class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product

    name = factory.Faker('catch_phrase')
    # LazyFunction for complex logic
    price = factory.LazyFunction(
        lambda: Decimal(str(round(fake.pyfloat(min_value=5, max_value=500), 2)))
    )
    stock = factory.Faker('random_int', min=0, max=200)
    category = factory.Faker('random_element', elements=['Electronics', 'Clothing', 'Books'])

class OrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Order

    user = factory.SubFactory(UserFactory)
    status = factory.Faker('random_element', elements=['pending', 'shipped', 'delivered'])
    # Computed from items — use @factory.post_generation
    total = Decimal('0.00')

    @factory.post_generation
    def items(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for item in extracted:
                self.items.add(item)
        else:
            # Generate 1-4 random items
            count = fake.random_int(min=1, max=4)
            for _ in range(count):
                product = ProductFactory()
                qty = fake.random_int(min=1, max=3)
                OrderItemFactory(order=self, product=product, quantity=qty)
            self.total = sum(i.price * i.quantity for i in self.order_items.all())
            self.save()

# Traits for specialized variants
class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f'user_{n}')
    email = factory.LazyAttribute(lambda obj: f'{obj.username}@example.com')

    class Params:
        # Traits — activate with UserFactory(admin=True)
        admin = factory.Trait(
            is_staff=True,
            is_superuser=True,
            username=factory.Sequence(lambda n: f'admin_{n}'),
        )
        inactive = factory.Trait(is_active=False)
        premium = factory.Trait(
            subscription_tier='premium',
        )

# Usage of traits:
admin = UserFactory(admin=True)
inactive = UserFactory(inactive=True)
premium_admin = UserFactory(admin=True, premium=True)`}</code></pre>

      {/* Section 8: JSON Fake Data */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JSON Fake Data — Schemas, Nested Objects, and Array Fields
      </h2>
      <p>
        Generating fake JSON data is common for API mocking, Postman collections, frontend development,
        and integration testing. Here are patterns for creating realistic JSON schemas:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import { faker } from '@faker-js/faker';
import fs from 'fs';

// --- E-commerce API response ---
function generateApiResponse(count: number) {
  return {
    data: Array.from({ length: count }, () => ({
      id: faker.string.uuid(),
      type: 'product',
      attributes: {
        name: faker.commerce.productName(),
        slug: faker.helpers.slugify(faker.commerce.productName()).toLowerCase(),
        price: parseFloat(faker.commerce.price()),
        currency: 'USD',
        description: faker.commerce.productDescription(),
        status: faker.helpers.arrayElement(['active', 'inactive', 'draft']),
        inventory: {
          available: faker.number.int({ min: 0, max: 500 }),
          reserved: faker.number.int({ min: 0, max: 50 }),
          reorderPoint: 10,
        },
        images: Array.from(
          { length: faker.number.int({ min: 1, max: 5 }) },
          (_, i) => ({
            id: faker.string.uuid(),
            url: faker.image.url({ width: 800, height: 600 }),
            alt: faker.commerce.productName(),
            isPrimary: i === 0,
          })
        ),
        categories: faker.helpers.arrayElements(
          ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'],
          { min: 1, max: 3 }
        ),
        tags: faker.helpers.arrayElements(
          ['sale', 'new-arrival', 'bestseller', 'eco', 'premium', 'limited'],
          { min: 0, max: 4 }
        ),
        metadata: {
          weight: faker.number.float({ min: 0.1, max: 10, multipleOf: 0.1 }),
          dimensions: {
            length: faker.number.int({ min: 5, max: 100 }),
            width: faker.number.int({ min: 5, max: 100 }),
            height: faker.number.int({ min: 1, max: 50 }),
            unit: 'cm',
          },
          sku: faker.string.alphanumeric(8).toUpperCase(),
          barcode: faker.string.numeric(13),
        },
      },
      relationships: {
        vendor: {
          data: { id: faker.string.uuid(), type: 'vendor' },
        },
      },
      links: {
        self: \`https://api.example.com/products/\${faker.string.uuid()}\`,
      },
    })),
    meta: {
      total: count,
      page: 1,
      perPage: count,
      lastPage: 1,
    },
    links: {
      first: 'https://api.example.com/products?page=1',
      last: 'https://api.example.com/products?page=1',
      prev: null,
      next: null,
    },
  };
}

// Write to file
const data = generateApiResponse(25);
fs.writeFileSync('mock-products.json', JSON.stringify(data, null, 2));
console.log('Generated mock-products.json with 25 products');`}</code></pre>

      {/* Section 9: CSV Fake Data */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CSV Fake Data — Generating Test Datasets for Spreadsheets and DBs
      </h2>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# generate_fake_csv.py
import csv
import sys
from faker import Faker
from datetime import datetime

fake = Faker()
Faker.seed(42)

def generate_users_csv(filename: str, count: int = 1000):
    """Generate realistic user data as CSV."""
    fields = [
        'id', 'first_name', 'last_name', 'email', 'phone',
        'address', 'city', 'state', 'zip_code', 'country',
        'date_of_birth', 'created_at', 'subscription_tier', 'is_active'
    ]

    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()

        for i in range(1, count + 1):
            writer.writerow({
                'id': i,
                'first_name': fake.first_name(),
                'last_name': fake.last_name(),
                'email': fake.email(),
                'phone': fake.phone_number(),
                'address': fake.street_address(),
                'city': fake.city(),
                'state': fake.state(),
                'zip_code': fake.postcode(),
                'country': fake.country_code(),
                'date_of_birth': fake.date_of_birth(minimum_age=18, maximum_age=80).isoformat(),
                'created_at': fake.date_time_this_year().isoformat(),
                'subscription_tier': fake.random_element(['free', 'basic', 'pro', 'enterprise']),
                'is_active': fake.boolean(chance_of_getting_true=85),
            })

    print(f'Generated {count} users → {filename}')

def generate_transactions_csv(filename: str, count: int = 5000):
    """Generate transaction data with realistic amounts and categories."""
    categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Healthcare',
                  'Utilities', 'Travel', 'Education', 'Subscriptions', 'Other']

    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=[
            'transaction_id', 'user_id', 'date', 'amount', 'currency',
            'category', 'merchant', 'description', 'type', 'status'
        ])
        writer.writeheader()

        for _ in range(count):
            tx_type = fake.random_element(['debit', 'credit'])
            writer.writerow({
                'transaction_id': fake.uuid4(),
                'user_id': fake.random_int(min=1, max=1000),
                'date': fake.date_between(start_date='-1y', end_date='today').isoformat(),
                'amount': round(fake.pyfloat(min_value=1, max_value=500), 2),
                'currency': fake.random_element(['USD', 'EUR', 'GBP', 'CAD']),
                'category': fake.random_element(categories),
                'merchant': fake.company(),
                'description': fake.sentence(nb_words=5),
                'type': tx_type,
                'status': fake.random_element(['completed', 'pending', 'failed', 'refunded']),
            })

    print(f'Generated {count} transactions → {filename}')

if __name__ == '__main__':
    generate_users_csv('fake_users.csv', count=1000)
    generate_transactions_csv('fake_transactions.csv', count=5000)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Load CSV into a Database
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`-- PostgreSQL: COPY is the fastest way to load CSV
COPY users (id, first_name, last_name, email, phone, created_at)
FROM '/tmp/fake_users.csv'
WITH (FORMAT csv, HEADER true, NULL '');

-- MySQL: LOAD DATA INFILE
LOAD DATA INFILE '/tmp/fake_users.csv'
INTO TABLE users
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\\n'
IGNORE 1 ROWS;

-- SQLite (Python + pandas)
import pandas as pd
import sqlite3

df = pd.read_csv('fake_users.csv')
conn = sqlite3.connect('dev.db')
df.to_sql('users', conn, if_exists='append', index=False)
print(f'Loaded {len(df)} users')

# Generate DataFrame directly with fake data (no CSV intermediate)
import pandas as pd
from faker import Faker

fake = Faker()
Faker.seed(42)

data = {
    'name': [fake.name() for _ in range(1000)],
    'email': [fake.email() for _ in range(1000)],
    'age': [fake.random_int(min=18, max=80) for _ in range(1000)],
    'salary': [round(fake.pyfloat(min_value=30000, max_value=200000), 2) for _ in range(1000)],
    'department': [fake.random_element(['Engineering', 'Sales', 'HR', 'Finance']) for _ in range(1000)],
}
df = pd.DataFrame(data)
print(df.describe())`}</code></pre>

      {/* Section 10: TypeScript Type-Safe Fake Data */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        TypeScript — Type-Safe Fake Data with Zod and Factory Functions
      </h2>
      <p>
        TypeScript users can generate fake data that is guaranteed to match their type definitions.
        Two main approaches: typed factory functions and Zod schema-driven generation with <code>zod-mock</code>:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Approach 1: Typed factory functions
import { faker } from '@faker-js/faker';

interface ApiUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'moderator';
  metadata: {
    loginCount: number;
    lastLogin: string | null;
    preferences: {
      theme: 'light' | 'dark';
      notifications: boolean;
      language: string;
    };
  };
}

// TypeScript enforces the return type shape
function createApiUser(overrides: Partial<ApiUser> = {}): ApiUser {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    role: faker.helpers.arrayElement(['admin', 'user', 'user', 'user', 'moderator'] as const),
    metadata: {
      loginCount: faker.number.int({ min: 0, max: 10000 }),
      lastLogin: faker.datatype.boolean({ probability: 0.9 })
        ? faker.date.recent({ days: 30 }).toISOString()
        : null,
      preferences: {
        theme: faker.helpers.arrayElement(['light', 'dark'] as const),
        notifications: faker.datatype.boolean(),
        language: faker.helpers.arrayElement(['en', 'fr', 'de', 'zh', 'ja']),
      },
    },
    ...overrides,
  };
}

// Fully type-safe — TS will error if shape doesn't match ApiUser
const user: ApiUser = createApiUser({ role: 'admin' });
const users: ApiUser[] = Array.from({ length: 20 }, () => createApiUser());`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Approach 2: Zod schema-driven mock generation
// npm install zod zod-mock @faker-js/faker
import { z } from 'zod';
import { generateMock } from 'zod-mock';

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().int().min(18).max(120),
  role: z.enum(['admin', 'user', 'moderator']),
  tags: z.array(z.string()).min(0).max(5),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string().length(2),
  }).optional(),
});

type User = z.infer<typeof UserSchema>;

// Automatically generates values matching the schema
const mockUser: User = generateMock(UserSchema);

// Generate array of mocks
const mockUsers: User[] = Array.from({ length: 10 }, () =>
  generateMock(UserSchema, {
    stringMap: {
      email: () => faker.internet.email(),
      country: () => faker.location.countryCode('alpha-2'),
    },
  })
);

// Validate generated data (optional sanity check)
UserSchema.parse(mockUser); // throws if invalid`}</code></pre>

      {/* Section 11: Performance Testing Data */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Performance Testing — Generating Millions of Records Efficiently
      </h2>
      <p>
        Generating 10M+ records requires a streaming approach to avoid exhausting memory. Never accumulate
        all records in an array before writing — process them in batches:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Node.js — streaming insert with batches
import { faker } from '@faker-js/faker';
import { Pool } from 'pg';

faker.seed(42);

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const TOTAL_ROWS = 10_000_000;
const BATCH_SIZE = 10_000;

async function generateLargeDataset() {
  let inserted = 0;
  const startTime = Date.now();

  while (inserted < TOTAL_ROWS) {
    const batch = Array.from({ length: BATCH_SIZE }, () => [
      faker.string.uuid(),
      faker.internet.email(),
      faker.person.fullName(),
      faker.date.past({ years: 3 }).toISOString(),
    ]);

    // Use parameterized bulk insert
    const values = batch.map((_, i) => \`($\${i * 4 + 1}, $\${i * 4 + 2}, $\${i * 4 + 3}, $\${i * 4 + 4})\`).join(', ');
    const params = batch.flat();

    await pool.query(
      \`INSERT INTO users (id, email, name, created_at) VALUES \${values}\`,
      params
    );

    inserted += BATCH_SIZE;
    const elapsed = (Date.now() - startTime) / 1000;
    const rate = Math.round(inserted / elapsed);
    process.stdout.write(\`\\r  Inserted \${inserted.toLocaleString()} / \${TOTAL_ROWS.toLocaleString()} (\${rate.toLocaleString()} rows/sec)\`);
  }

  console.log(\`\\nDone! \${TOTAL_ROWS.toLocaleString()} rows in \${((Date.now() - startTime) / 1000).toFixed(1)}s\`);
  await pool.end();
}

generateLargeDataset();`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python — streaming to PostgreSQL COPY (fastest possible method)
import io
import csv
import psycopg2
from faker import Faker

fake = Faker()
Faker.seed(42)

def generate_rows_stream(total: int, batch_size: int = 10_000):
    """Generator that yields CSV batches as file-like objects."""
    count = 0
    while count < total:
        buf = io.StringIO()
        writer = csv.writer(buf)
        for _ in range(min(batch_size, total - count)):
            writer.writerow([
                fake.uuid4(),
                fake.email(),
                fake.name(),
                fake.phone_number(),
                fake.date_time_this_year().isoformat(),
            ])
        buf.seek(0)
        yield buf
        count += batch_size
        print(f'\\r  Inserted {count:,} / {total:,}', end='', flush=True)

conn = psycopg2.connect(dsn='postgresql://localhost/myapp_dev')
cur = conn.cursor()

total = 1_000_000
for batch in generate_rows_stream(total):
    cur.copy_expert(
        "COPY users (id, email, name, phone, created_at) FROM STDIN WITH CSV",
        batch
    )
    conn.commit()

print(f'\\nDone! {total:,} rows inserted')
cur.close()
conn.close()`}</code></pre>

      {/* Section 12: Data Masking */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Data Masking and Anonymization — Production Data for Dev Environments
      </h2>
      <p>
        When you must use production data shape (not fully synthetic), <strong>data masking</strong> replaces
        real PII with fake values while preserving the database structure, row counts, and data relationships.
        The critical requirement: if <code>user_id=42</code> appears in 10 tables, every table must map it
        to the same fake identity — ensuring referential integrity.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# data_masking.py — Consistent replacement with deterministic seeding
import hashlib
from faker import Faker
from sqlalchemy import create_engine, text

fake = Faker()

def get_deterministic_faker(original_value: str) -> Faker:
    """Returns a Faker instance seeded by the hash of the original value.
    Same original_value → always the same fake replacement."""
    seed = int(hashlib.sha256(str(original_value).encode()).hexdigest(), 16) % (2**32)
    f = Faker()
    f.seed_instance(seed)
    return f

def mask_email(original_email: str) -> str:
    """Consistently mask email — same input always gives same output."""
    f = get_deterministic_faker(original_email)
    return f.email()

def mask_name(original_name: str) -> str:
    f = get_deterministic_faker(original_name)
    return f.name()

def mask_phone(original_phone: str) -> str:
    f = get_deterministic_faker(original_phone)
    return f.phone_number()

def mask_credit_card(original_cc: str) -> str:
    """Replace with valid-format (Luhn-valid) fake card number."""
    f = get_deterministic_faker(original_cc)
    return f.credit_card_number()

# Masking script
engine = create_engine('postgresql://localhost/production_clone')

with engine.connect() as conn:
    users = conn.execute(text('SELECT id, email, name, phone FROM users')).fetchall()

    for user in users:
        masked_email = mask_email(user.email)
        masked_name = mask_name(user.name)
        masked_phone = mask_phone(user.phone)

        conn.execute(
            text('UPDATE users SET email=:e, name=:n, phone=:p WHERE id=:id'),
            {'e': masked_email, 'n': masked_name, 'p': masked_phone, 'id': user.id}
        )

    conn.commit()
    print(f'Masked {len(users)} users')`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Partial Masking and Format Preservation
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Partial masking — preserve format while hiding the real value
def partial_mask_email(email: str) -> str:
    """john.doe@company.com → jo**.***@company.com"""
    local, domain = email.split('@', 1)
    masked_local = local[:2] + '*' * (len(local) - 2)
    return f'{masked_local}@{domain}'

def partial_mask_name(name: str) -> str:
    """John Doe → J*** D**"""
    return ' '.join(
        part[0] + '*' * (len(part) - 1) for part in name.split()
    )

def partial_mask_phone(phone: str) -> str:
    """(555) 123-4567 → (555) ***-4567"""
    digits = ''.join(c for c in phone if c.isdigit())
    if len(digits) >= 10:
        return f'({digits[:3]}) ***-{digits[-4:]}'
    return phone[:4] + '****' + phone[-2:]

def mask_credit_card_preserve_format(cc: str) -> str:
    """4111 1111 1111 1111 → **** **** **** 1111 (show last 4)"""
    clean = cc.replace(' ', '').replace('-', '')
    return f'**** **** **** {clean[-4:]}'

# Examples
print(partial_mask_email('john.doe@company.com'))   # jo*.***@company.com
print(partial_mask_name('John Doe'))                # J*** D**
print(partial_mask_phone('(555) 123-4567'))         # (555) ***-4567
print(mask_credit_card_preserve_format('4111 1111 1111 1111'))  # **** **** **** 1111`}</code></pre>

      {/* Section 13: Realistic Data Patterns */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Realistic Data Patterns — Credit Cards, Phone Numbers, and Consistent Gender
      </h2>
      <p>
        Faker generates data that passes realistic validation rules. Here are the key patterns to understand:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import { faker } from '@faker-js/faker';

// --- Credit Cards (Luhn algorithm valid) ---
faker.finance.creditCardNumber();              // Any valid card
faker.finance.creditCardNumber('visa');        // Visa (starts with 4)
faker.finance.creditCardNumber('mastercard'); // Mastercard (starts with 5)
faker.finance.creditCardNumber('amex');       // Amex (starts with 34 or 37, 15 digits)
faker.finance.creditCardCVV();                 // 3-4 digit CVV

// These card numbers PASS Luhn checksum validation but are NOT real cards
// Use them in test payment systems that validate format but not charge

// Luhn algorithm verification:
function isValidLuhn(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\\D/g, '').split('').map(Number);
  let sum = 0;
  let isEven = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

const fakeCard = faker.finance.creditCardNumber('visa');
console.log(isValidLuhn(fakeCard)); // => true

// --- Consistent Male/Female Names ---
// Generate names consistent with a gender field
function createPersonWithGender() {
  const sex = faker.person.sexType(); // 'male' | 'female'
  return {
    sex,
    firstName: faker.person.firstName(sex),
    lastName: faker.person.lastName(),
    // Avoid mixing: don't generate firstName('male') with a female prefix
    prefix: sex === 'male'
      ? faker.helpers.arrayElement(['Mr.', 'Dr.', 'Prof.'])
      : faker.helpers.arrayElement(['Ms.', 'Mrs.', 'Dr.', 'Prof.']),
  };
}

// --- Phone Numbers by Country ---
import { fakerUS, fakerDE, fakerGB, fakerJP } from '@faker-js/faker';

fakerUS.phone.number();  // +1 (555) 123-4567
fakerDE.phone.number();  // +49 30 12345678
fakerGB.phone.number();  // +44 20 7123 4567
fakerJP.phone.number();  // 03-1234-5678

// E.164 format (international standard for phone fields):
function toE164(localNumber: string, countryCode: string): string {
  const digits = localNumber.replace(/\\D/g, '');
  return \`+\${countryCode}\${digits}\`;
}

// --- Realistic Age Distribution ---
function generateRealisticAge(): number {
  // Adults: normal distribution centered around 35
  const mean = 35;
  const stdDev = 15;
  const u = 1 - Math.random();
  const v = Math.random();
  const normalRandom = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  const age = Math.round(mean + stdDev * normalRandom);
  return Math.max(18, Math.min(90, age)); // clamp to 18-90
}

// --- IP Addresses (IPv4 and IPv6) ---
faker.internet.ip();           // "192.168.1.100" (any IPv4)
faker.internet.ipv4();         // same
faker.internet.ipv6();         // "2001:db8::1" (any IPv6)

// Private range IP for local dev testing:
function privateIp(): string {
  const ranges = [
    () => \`10.\${faker.number.int(255)}.\${faker.number.int(255)}.\${faker.number.int(255)}\`,
    () => \`172.\${faker.number.int({ min: 16, max: 31 })}.\${faker.number.int(255)}.\${faker.number.int(255)}\`,
    () => \`192.168.\${faker.number.int(255)}.\${faker.number.int(255)}\`,
  ];
  return faker.helpers.arrayElement(ranges)();
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Generating Realistic Time-Series Data
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import { faker } from '@faker-js/faker';

// Realistic event stream — pageviews, clicks, signups over time
function generateEventStream(days: number, eventsPerDay: number) {
  const events = [];
  const now = new Date();

  for (let d = days; d >= 0; d--) {
    const date = new Date(now);
    date.setDate(date.getDate() - d);

    // More events on weekdays (Monday=1 through Friday=5)
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const count = isWeekend
      ? Math.round(eventsPerDay * 0.4)
      : eventsPerDay;

    // Simulate daily traffic pattern: low at night, peak at 10am-2pm
    for (let i = 0; i < count; i++) {
      const hour = faker.helpers.weightedArrayElement([
        { weight: 1, value: 0 },   // midnight - low traffic
        { weight: 2, value: 8 },   // 8am
        { weight: 5, value: 10 },  // 10am - peak
        { weight: 6, value: 12 },  // noon - peak
        { weight: 4, value: 14 },  // 2pm
        { weight: 3, value: 16 },  // 4pm
        { weight: 2, value: 18 },  // 6pm
        { weight: 1, value: 22 },  // 10pm
      ]);

      const eventTime = new Date(date);
      eventTime.setHours(hour, faker.number.int(59), faker.number.int(59));

      events.push({
        timestamp: eventTime.toISOString(),
        event_type: faker.helpers.arrayElement(['pageview', 'click', 'scroll', 'conversion']),
        user_id: faker.number.int({ min: 1, max: 10000 }),
        session_id: faker.string.uuid(),
        page: faker.helpers.arrayElement(['/', '/pricing', '/features', '/blog', '/docs']),
        country: faker.location.countryCode('alpha-2'),
        device: faker.helpers.arrayElement(['desktop', 'mobile', 'tablet']),
      });
    }
  }

  return events.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

const events = generateEventStream(30, 500); // 30 days, 500 events/day
console.log(\`Generated \${events.length} events\`);`}</code></pre>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>Never use production PII</strong> in development — fake data is GDPR-compliant, flexible, and faster to generate.</li>
          <li>Use <strong>@faker-js/faker</strong> (JavaScript/TypeScript) or the <strong>Faker</strong> library (Python) for generating individual values.</li>
          <li>Call <strong>faker.seed(42)</strong> or <strong>Faker.seed(42)</strong> at the top of seed scripts for fully reproducible, deterministic output.</li>
          <li><strong>Factory Boy</strong> (Python) generates complete model objects with proper relationships — essential for Django and SQLAlchemy projects.</li>
          <li>Use <strong>Prisma db seed</strong> or <strong>Sequelize CLI seeders</strong> to register seed scripts as part of your database workflow.</li>
          <li>For bulk inserts, use <strong>bulk_save_objects()</strong> (SQLAlchemy) or <strong>PostgreSQL COPY</strong> — 10-100x faster than individual inserts.</li>
          <li><strong>Data masking</strong> with deterministic seeding (hash of original value) ensures consistent replacements across related tables.</li>
          <li>Faker generates <strong>Luhn-valid credit card numbers</strong> and locale-appropriate phone formats — realistic enough to pass format validation.</li>
          <li>For TypeScript, combine <strong>faker with Zod schemas</strong> (zod-mock) to automatically generate values that match your exact type definitions.</li>
          <li>Generate large datasets using <strong>streaming batches</strong> (process 10K rows at a time) to avoid out-of-memory errors with millions of records.</li>
        </ul>
      </div>
    </article>
  );
}
