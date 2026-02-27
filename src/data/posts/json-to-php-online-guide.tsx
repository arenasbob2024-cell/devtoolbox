'use client';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  JSON to PHP Class Online Guide                                      */
/* ------------------------------------------------------------------ */

export default function JsonToPhpOnlineGuide({ lang }: { lang: string }) {
  const l = lang || 'en';
  const toolLink = `/${l}/tools/json-to-php`;

  /* ---------- translations ---------- */
  const translations: Record<string, {
    tldr: string;
    whyTitle: string;
    takeawaysTitle: string;
    tryTool: string;
    faqTitle: string;
  }> = {
    zh: {
      tldr: 'JSON 转 PHP 类工具可以从任意 JSON 数据生成带有类型化属性、构造函数提升和 readonly 类的 PHP 类，消除手动编码并防止类型错误。',
      whyTitle: '为什么要将 JSON 转换为 PHP 类？',
      takeawaysTitle: '核心要点',
      tryTool: '立即使用免费的 JSON 转 PHP 类工具 \u2192',
      faqTitle: '常见问题',
    },
    en: {
      tldr: 'A JSON to PHP class tool generates typed PHP classes with constructor promotion, readonly properties, and PHP 8.x enums from any JSON — eliminating manual coding and preventing type errors in your Laravel, Symfony, or vanilla PHP projects.',
      whyTitle: 'Why Convert JSON to PHP Classes?',
      takeawaysTitle: 'Key Takeaways',
      tryTool: 'Try our free JSON to PHP Class tool \u2192',
      faqTitle: 'Frequently Asked Questions',
    },
  };

  const t = translations[l] || translations['en'];

  /* ---------- FAQ items ---------- */
  const faqItems = [
    {
      q: 'What is the difference between json_decode returning an array vs stdClass?',
      a: 'When you call json_decode($json) without a second argument, PHP returns a stdClass object where JSON keys become properties. When you call json_decode($json, true), PHP returns an associative array. For typed class mapping, neither is ideal — you should deserialize into a custom class with typed properties for IDE autocompletion, static analysis, and refactoring support. Use stdClass only for quick, one-off scripts where type safety is not a concern.',
    },
    {
      q: 'What are PHP 7.4 typed properties and why are they useful for JSON data?',
      a: 'PHP 7.4 introduced typed property declarations, allowing you to specify the type of a class property directly: public string $name; public int $age; public ?string $bio;. When you deserialize JSON into a class with typed properties, PHP enforces type correctness at runtime, catching mismatches immediately. They also enable IDE autocompletion and PHPStan/Psalm static analysis to detect type errors before your code runs.',
    },
    {
      q: 'How does PHP 8.0 constructor promotion simplify JSON data classes?',
      a: 'Constructor promotion lets you declare, type-hint, and assign class properties directly in the constructor signature, removing the need to repeat declarations: public function __construct(public readonly string $name, public int $age, public ?string $email = null) {}. This reduces a typical data class from 20+ lines of boilerplate to a single constructor. It is especially useful for DTOs (Data Transfer Objects) that map directly to JSON responses from APIs.',
    },
    {
      q: 'What is a readonly class in PHP 8.2 and when should I use it?',
      a: 'PHP 8.2 introduced readonly classes, which automatically make all properties readonly. Declare a class with readonly class User { ... } and all its properties can only be initialized in the constructor, never modified afterward. This is ideal for immutable DTOs that represent API responses — once deserialized from JSON, the data should not change. Readonly classes also signal intent to other developers: this object is a value object, not a mutable entity.',
    },
    {
      q: 'How do I handle nullable fields and optional JSON properties in PHP?',
      a: 'Use nullable types with a ? prefix: public ?string $bio = null;. For optional properties that may be missing entirely from the JSON payload, assign a default value in the constructor: public function __construct(public string $name, public ?string $bio = null, public int $age = 0) {}. When deserializing, check with isset() or array_key_exists() before assigning. Libraries like Symfony Serializer handle this automatically using #[SerializedName] and denormalization context.',
    },
    {
      q: 'How do I use PHP 8.1 BackedEnums with JSON string or integer values?',
      a: 'PHP 8.1 BackedEnums have a string or int backing type: enum Status: string { case Active = "active"; case Inactive = "inactive"; }. To deserialize a JSON string value into an enum, use Status::from($data["status"]) which throws on invalid values, or Status::tryFrom($data["status"]) which returns null. Symfony Serializer automatically handles backed enums during denormalization. This provides exhaustive pattern matching and prevents invalid state.',
    },
    {
      q: 'What is the Symfony Serializer and how does it map JSON to PHP classes automatically?',
      a: 'The Symfony Serializer component provides full-featured JSON-to-PHP deserialization. You configure it with a normalizer stack (ObjectNormalizer, BackedEnumNormalizer, etc.) and a JSON encoder. Then call $serializer->deserialize($json, User::class, "json"). It respects typed properties, handles nullable types, maps snake_case JSON keys to camelCase PHP properties automatically (with a NameConverter), and supports nested objects and arrays of objects without manual mapping code.',
    },
    {
      q: 'How does Spatie Laravel Data differ from plain DTO classes for JSON handling?',
      a: 'Spatie Laravel Data extends the DTO concept with Laravel-specific features: automatic validation using Laravel rules, built-in casting (including Carbon dates and enums), Eloquent model casting via $casts, and transformation pipelines. You declare a data class extending Spatie\\LaravelData\\Data, define typed properties, and call MyDto::from($request->all()) or MyDto::from($jsonArray). It handles nested DTOs, collections, lazy properties, and optional properties out of the box, while plain DTO classes require you to write the mapping logic yourself.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <article style={{ maxWidth: 820, margin: '0 auto', lineHeight: 1.75 }}>
      {/* FAQ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ---- TL;DR Box ---- */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 32,
      }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, marginTop: 0 }}>TL;DR</p>
        <p style={{ margin: 0, fontSize: 15 }}>
          {t.tldr}{' '}
          <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
            {t.tryTool}
          </Link>
        </p>
      </div>

      {/* ---- Key Takeaways ---- */}
      <div style={{
        background: '#f8fafc',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 40,
      }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, marginTop: 0 }}>{t.takeawaysTitle}</p>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li>Use <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>json_decode($json, true)</code> for arrays or <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>json_decode($json)</code> for stdClass; prefer custom typed classes for production.</li>
          <li>PHP 7.4 typed properties (<code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>public string $name;</code>) enforce runtime type correctness and enable static analysis.</li>
          <li>PHP 8.0 constructor promotion collapses property declaration, type-hinting, and assignment into a single line.</li>
          <li>PHP 8.2 <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>readonly class</code> makes all properties immutable — ideal for API response DTOs.</li>
          <li>PHP 8.1 BackedEnums map JSON string/int values to exhaustive enum cases with <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>Status::from()</code> or <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>Status::tryFrom()</code>.</li>
          <li>Symfony Serializer and Spatie Laravel Data handle nested objects, collections, enums, and nullable types automatically.</li>
          <li>Nullable types (<code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>?string</code>, <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: 3 }}>?int</code>) plus default values handle optional JSON fields safely.</li>
        </ul>
      </div>

      {/* ---- Section 1: Why Convert JSON to PHP Classes ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        {t.whyTitle}
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        JSON is the dominant data exchange format for REST APIs, webhooks, configuration files, and microservice
        communication. When you receive a JSON payload in PHP, you have several approaches: decode it into a raw
        associative array, use <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>stdClass</code>,
        or deserialize it into a strongly typed PHP class. The third option provides significant advantages in
        any serious application.
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 24, marginBottom: 10 }}>Approach Comparison</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Approach</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Type Safety</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>IDE Support</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Array (json_decode true)', 'None', 'Minimal', 'Quick scripts, one-offs'],
              ['stdClass', 'None', 'None', 'Dynamic data, prototyping'],
              ['Typed class (PHP 7.4+)', 'Runtime', 'Full', 'APIs, services, DTOs'],
              ['Constructor promotion (PHP 8.0+)', 'Runtime', 'Full', 'Concise DTOs, value objects'],
              ['Readonly class (PHP 8.2+)', 'Runtime + Immutable', 'Full', 'Immutable API responses'],
            ].map(([approach, typeSafety, ideSupport, bestFor], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontWeight: 600 }}>{approach}</td>
                <td style={{ padding: '8px 14px' }}>{typeSafety}</td>
                <td style={{ padding: '8px 14px' }}>{ideSupport}</td>
                <td style={{ padding: '8px 14px' }}>{bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: 15, marginBottom: 20 }}>
        Typed PHP classes give you compile-time (PHPStan/Psalm) and runtime type checking, IDE autocompletion
        via PHPDoc or native types, refactoring support, and self-documenting code. Our tool generates all
        boilerplate automatically.
      </p>
      <p style={{ fontSize: 15, marginBottom: 20 }}>
        <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
          Generate PHP classes from JSON instantly with our free tool &rarr;
        </Link>
      </p>

      {/* ---- Section 2: json_decode Basics ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        json_decode() Basics: Arrays vs stdClass
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Before mapping to typed classes, understand how <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>json_decode()</code> works.
        Given this JSON payload from a REST API:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`{
  "user_id": 42,
  "first_name": "Alice",
  "last_name": "Smith",
  "email": "alice@example.com",
  "is_active": true,
  "bio": null
}`}
      </pre>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`<?php

$json = '{"user_id":42,"first_name":"Alice","last_name":"Smith","email":"alice@example.com","is_active":true,"bio":null}';

// Option 1: stdClass object (default)
$obj = json_decode($json);
echo $obj->first_name;  // "Alice" — but no type safety, no IDE hints

// Option 2: Associative array
$arr = json_decode($json, true);
echo $arr['first_name']; // "Alice" — still no type safety

// Option 3: Typed class (best practice — see sections below)
$user = User::fromJson($json);
echo $user->firstName;  // "Alice" — fully typed, IDE-aware`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Always check for decode errors in production code:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`$data = json_decode($json, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    throw new \\InvalidArgumentException(
        'Invalid JSON: ' . json_last_error_msg()
    );
}

// PHP 8.0+: throws JsonException directly
$data = json_decode($json, true, 512, JSON_THROW_ON_ERROR);`}
      </pre>

      {/* ---- Section 3: Manual Typed Class (PHP 7.4+) ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Manual Typed Class with PHP 7.4 Properties
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        PHP 7.4 introduced typed property declarations. This is the foundation of type-safe JSON deserialization
        without any external library. PHPDoc annotations provide additional metadata for IDEs and static analyzers:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`<?php

declare(strict_types=1);

/**
 * @property-read int    $userId
 * @property-read string $firstName
 * @property-read string $lastName
 * @property-read string $email
 * @property-read bool   $isActive
 * @property-read string|null $bio
 */
class User
{
    public int $userId;
    public string $firstName;
    public string $lastName;
    public string $email;
    public bool $isActive;
    public ?string $bio;

    public static function fromArray(array $data): self
    {
        $user = new self();
        $user->userId    = (int) $data['user_id'];
        $user->firstName = (string) $data['first_name'];
        $user->lastName  = (string) $data['last_name'];
        $user->email     = (string) $data['email'];
        $user->isActive  = (bool) $data['is_active'];
        $user->bio       = isset($data['bio']) ? (string) $data['bio'] : null;
        return $user;
    }

    public static function fromJson(string $json): self
    {
        $data = json_decode($json, true, 512, JSON_THROW_ON_ERROR);
        return self::fromArray($data);
    }
}

// Usage
$user = User::fromJson($json);
echo $user->firstName; // "Alice"
echo $user->userId;    // 42`}
      </pre>

      {/* ---- Section 4: Constructor Promotion (PHP 8.0+) ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Constructor Promotion (PHP 8.0+): Concise Data Classes
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        PHP 8.0 constructor promotion eliminates the repetition of declaring a property, typing it, and assigning
        it in the constructor body. This collapses a typical 20-line data class into a single concise constructor:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`<?php

declare(strict_types=1);

class User
{
    public function __construct(
        public int $userId,
        public string $firstName,
        public string $lastName,
        public string $email,
        public bool $isActive,
        public ?string $bio = null,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            userId:    (int) $data['user_id'],
            firstName: (string) $data['first_name'],
            lastName:  (string) $data['last_name'],
            email:     (string) $data['email'],
            isActive:  (bool) $data['is_active'],
            bio:       isset($data['bio']) ? (string) $data['bio'] : null,
        );
    }

    public static function fromJson(string $json): self
    {
        return self::fromArray(
            json_decode($json, true, 512, JSON_THROW_ON_ERROR)
        );
    }
}

$user = User::fromJson($json);
// Named arguments make the call self-documenting`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        You can mix promoted and non-promoted parameters. Add <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>readonly</code>
        on individual promoted properties to make them immutable while keeping others mutable.
      </p>

      {/* ---- Section 5: Readonly Classes (PHP 8.2+) ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Readonly Classes (PHP 8.2+): Immutable DTOs
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        PHP 8.2 <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>readonly class</code> makes
        all properties readonly automatically. Once created from a JSON payload, the object cannot be mutated —
        perfect for API response objects, event payloads, and configuration DTOs:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`<?php

declare(strict_types=1);

readonly class UserDTO
{
    public function __construct(
        public int $userId,
        public string $firstName,
        public string $lastName,
        public string $email,
        public bool $isActive,
        public ?string $bio = null,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            userId:    (int) $data['user_id'],
            firstName: (string) $data['first_name'],
            lastName:  (string) $data['last_name'],
            email:     (string) $data['email'],
            isActive:  (bool) $data['is_active'],
            bio:       $data['bio'] ?? null,
        );
    }
}

$user = UserDTO::fromArray($data);
// $user->firstName = 'Bob'; // Fatal error: Cannot modify readonly property
echo $user->firstName; // "Alice" — immutable and type-safe`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Readonly classes cannot have non-initialized typed properties and cannot extend non-readonly classes.
        They implement value object semantics: two instances with the same data represent the same value.
      </p>

      {/* ---- Section 6: Nested Objects and Arrays ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Nested Objects and Arrays: Recursive Deserialization
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Real-world JSON often contains nested objects and arrays of objects. Handle them by recursively calling
        the static factory method:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// JSON with nested structure:
// {
//   "order_id": 1001,
//   "customer": { "id": 42, "name": "Alice" },
//   "items": [
//     { "sku": "WIDGET-A", "quantity": 2, "price": 9.99 },
//     { "sku": "GADGET-B", "quantity": 1, "price": 29.99 }
//   ]
// }

readonly class Customer
{
    public function __construct(
        public int $id,
        public string $name,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(id: (int) $data['id'], name: (string) $data['name']);
    }
}

readonly class OrderItem
{
    public function __construct(
        public string $sku,
        public int $quantity,
        public float $price,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            sku:      (string) $data['sku'],
            quantity: (int) $data['quantity'],
            price:    (float) $data['price'],
        );
    }
}

readonly class Order
{
    /** @param OrderItem[] $items */
    public function __construct(
        public int $orderId,
        public Customer $customer,
        public array $items,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            orderId:  (int) $data['order_id'],
            customer: Customer::fromArray($data['customer']),
            items:    array_map(
                static fn(array $item) => OrderItem::fromArray($item),
                $data['items']
            ),
        );
    }
}

$order = Order::fromArray(json_decode($json, true, 512, JSON_THROW_ON_ERROR));
echo $order->customer->name;        // "Alice"
echo $order->items[0]->sku;         // "WIDGET-A"
echo count($order->items);          // 2`}
      </pre>

      {/* ---- Section 7: PHP 8.1 Enums ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        PHP 8.1 BackedEnums for String and Integer JSON Values
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        PHP 8.1 introduced backed enums — enums with a string or integer backing value. They are perfect for
        JSON fields that carry a fixed set of values like status codes, roles, or categories:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`<?php

declare(strict_types=1);

// String-backed enum for JSON "status" field
enum UserStatus: string
{
    case Active   = 'active';
    case Inactive = 'inactive';
    case Banned   = 'banned';
}

// Integer-backed enum for JSON "role" field
enum UserRole: int
{
    case Guest  = 0;
    case Member = 1;
    case Admin  = 2;
}

readonly class User
{
    public function __construct(
        public int $userId,
        public string $name,
        public UserStatus $status,
        public UserRole $role,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            userId: (int) $data['user_id'],
            name:   (string) $data['name'],
            // from() throws ValueError for invalid values
            status: UserStatus::from($data['status']),
            // tryFrom() returns null for invalid values
            role:   UserRole::tryFrom($data['role']) ?? UserRole::Guest,
        );
    }
}

// JSON: {"user_id": 1, "name": "Alice", "status": "active", "role": 2}
$user = User::fromArray($data);
echo $user->status->value; // "active"
echo $user->role->name;    // "Admin"

// Exhaustive match — compiler error if case is missing
$label = match($user->status) {
    UserStatus::Active   => 'Active User',
    UserStatus::Inactive => 'Inactive',
    UserStatus::Banned   => 'Banned',
};`}
      </pre>

      {/* ---- Section 8: Null Safety and Nullable Types ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Null Safety and Nullable Types in PHP
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        JSON fields are frequently null or absent. PHP provides several tools to handle this safely without
        defensive null checks scattered throughout your codebase:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`<?php

declare(strict_types=1);

readonly class UserProfile
{
    public function __construct(
        public int $id,
        public string $username,
        // Nullable — JSON field may be null
        public ?string $displayName = null,
        // Optional — JSON field may be absent entirely
        public ?string $avatarUrl = null,
        public ?int $followerCount = null,
        // Nullable nested object
        public ?Address $address = null,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            id:             (int) $data['id'],
            username:       (string) $data['username'],
            // Null coalescing operator handles absent keys
            displayName:    $data['display_name'] ?? null,
            avatarUrl:      $data['avatar_url'] ?? null,
            followerCount:  isset($data['follower_count'])
                                ? (int) $data['follower_count']
                                : null,
            // Conditional nested deserialization
            address:        isset($data['address'])
                                ? Address::fromArray($data['address'])
                                : null,
        );
    }
}

// PHP 8.0 nullsafe operator — no null check cascade needed
$city = $user->address?->city?->name ?? 'Unknown';`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        The PHP 8.0 nullsafe operator <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 3 }}>?-&gt;</code> lets
        you chain property accesses and method calls on nullable objects without intermediate null checks —
        short-circuiting the chain and returning null if any step is null.
      </p>

      {/* ---- Section 9: Symfony Serializer ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Symfony Serializer: Automatic JSON-to-PHP Mapping
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        The Symfony Serializer component handles all the mapping automatically, including nested objects, enums,
        name conversion, and nullable types. Install it via Composer:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`composer require symfony/serializer symfony/property-access symfony/property-info`}
      </pre>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`<?php

use Symfony\\Component\\Serializer\\Serializer;
use Symfony\\Component\\Serializer\\Encoder\\JsonEncoder;
use Symfony\\Component\\Serializer\\Normalizer\\ObjectNormalizer;
use Symfony\\Component\\Serializer\\Normalizer\\BackedEnumNormalizer;
use Symfony\\Component\\Serializer\\NameConverter\\CamelCaseToSnakeCaseNameConverter;

$serializer = new Serializer(
    [new BackedEnumNormalizer(), new ObjectNormalizer(
        nameConverter: new CamelCaseToSnakeCaseNameConverter()
    )],
    [new JsonEncoder()]
);

// Deserialize JSON → PHP class automatically
$user = $serializer->deserialize($json, User::class, 'json');
echo $user->firstName; // "Alice" — snake_case JSON → camelCase PHP

// Use #[SerializedName] for explicit field name mapping
use Symfony\\Component\\Serializer\\Attribute\\SerializedName;

class Product
{
    #[SerializedName('product_id')]
    public int $id;

    #[SerializedName('product_name')]
    public string $name;

    #[SerializedName('unit_price_usd')]
    public float $price;
}

// Serialize PHP → JSON
$json = $serializer->serialize($user, 'json');`}
      </pre>

      {/* ---- Section 10: Laravel with Spatie Data DTOs ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        Laravel: Eloquent Casts and Spatie Laravel Data DTOs
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Laravel provides native JSON column casting in Eloquent models and the popular Spatie Laravel Data
        package for full DTO support with validation and transformation:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// Eloquent model: cast JSON columns automatically
class Order extends Model
{
    protected $casts = [
        'metadata'   => 'array',       // JSON column → PHP array
        'settings'   => 'json',        // alias for 'array'
        'status'     => OrderStatus::class, // JSON string → PHP enum (Laravel 9+)
        'shipped_at' => 'datetime',    // JSON ISO string → Carbon
    ];
}

$order = Order::find(1);
$order->metadata['tracking_number']; // typed array access
$order->status;                      // OrderStatus enum instance`}
      </pre>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`// Spatie Laravel Data DTO
composer require spatie/laravel-data

use Spatie\\LaravelData\\Data;
use Spatie\\LaravelData\\Attributes\\Validation\\Required;
use Spatie\\LaravelData\\Attributes\\Validation\\Email;

class CreateUserData extends Data
{
    public function __construct(
        #[Required]
        public readonly string $firstName,

        #[Required]
        public readonly string $lastName,

        #[Required, Email]
        public readonly string $email,

        public readonly ?string $bio = null,

        // Automatically casts 'active'/'inactive' string to UserStatus enum
        public readonly UserStatus $status = UserStatus::Active,
    ) {}
}

// Create from request (with automatic validation)
$userData = CreateUserData::from($request->all());

// Create from JSON API response
$userData = CreateUserData::from(
    json_decode($apiResponse, true, 512, JSON_THROW_ON_ERROR)
);

// Nested DTO collections
class OrderData extends Data
{
    /** @param OrderItemData[] $items */
    public function __construct(
        public readonly int $orderId,
        public readonly CustomerData $customer,
        #[DataCollectionOf(OrderItemData::class)]
        public readonly array $items,
    ) {}
}`}
      </pre>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        Spatie Laravel Data automatically handles validation, nested DTOs, enum casting, Carbon date casting,
        and transformation back to JSON or arrays. It is the recommended approach for Laravel APIs.
      </p>

      {/* ---- Section 11: JMS Serializer with #[SerializedName] ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 16 }}>
        JMS Serializer: Annotations and Attribute-Based Mapping
      </h2>
      <p style={{ fontSize: 15, marginBottom: 12 }}>
        JMS Serializer is a powerful alternative to Symfony Serializer, widely used in legacy Symfony projects
        and APIs requiring fine-grained serialization control:
      </p>
      <pre style={{
        background: '#1e293b',
        color: '#e2e8f0',
        padding: '16px 20px',
        borderRadius: 8,
        overflowX: 'auto',
        fontSize: 14,
        lineHeight: 1.6,
        marginBottom: 16,
      }}>
{`composer require jms/serializer

use JMS\\Serializer\\Annotation\\SerializedName;
use JMS\\Serializer\\Annotation\\Type;
use JMS\\Serializer\\Annotation\\Groups;

class User
{
    #[SerializedName('user_id')]
    #[Type('integer')]
    public int $userId;

    #[SerializedName('first_name')]
    #[Type('string')]
    #[Groups(['public', 'admin'])]
    public string $firstName;

    #[SerializedName('created_at')]
    #[Type("DateTime<'Y-m-d H:i:s'>")]
    public \\DateTime $createdAt;

    // Exclude from serialization
    #[Exclude]
    public string $internalSecret;
}

use JMS\\Serializer\\SerializerBuilder;

$serializer = SerializerBuilder::create()->build();

// Deserialize JSON → PHP
$user = $serializer->deserialize($json, User::class, 'json');

// Serialize PHP → JSON with group filtering
$context = SerializationContext::create()->setGroups(['public']);
$json = $serializer->serialize($user, 'json', $context);`}
      </pre>

      {/* ---- CTA ---- */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: 8,
        padding: '20px 24px',
        marginTop: 48,
        marginBottom: 40,
      }}>
        <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, marginTop: 0 }}>
          Generate PHP Classes Instantly
        </p>
        <p style={{ fontSize: 15, marginBottom: 12, marginTop: 0 }}>
          Paste any JSON and our tool generates a typed PHP class with constructor promotion, readonly
          support, nullable types, and PHPDoc comments — ready to copy into your project.
        </p>
        <Link
          href={toolLink}
          style={{
            display: 'inline-block',
            background: '#2563eb',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: 6,
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: 15,
          }}
        >
          Open JSON to PHP Tool &rarr;
        </Link>
      </div>

      {/* ---- FAQ Section ---- */}
      <h2 style={{ fontSize: 26, fontWeight: 800, marginTop: 48, marginBottom: 24 }}>
        {t.faqTitle}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {faqItems.map((item, idx) => (
          <div key={idx} style={{
            borderLeft: '4px solid #2563eb',
            paddingLeft: 16,
          }}>
            <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, marginTop: 0 }}>
              {item.q}
            </p>
            <p style={{ fontSize: 15, marginTop: 0, marginBottom: 0, color: '#374151' }}>
              {item.a}
            </p>
          </div>
        ))}
      </div>

      {/* ---- Footer CTA ---- */}
      <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid #e2e8f0' }}>
        <p style={{ fontSize: 15, marginBottom: 8 }}>
          Ready to convert your JSON to a PHP class?{' '}
          <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
            {t.tryTool}
          </Link>
        </p>
        <p style={{ fontSize: 14, color: '#6b7280', marginTop: 8 }}>
          Supports PHP 7.4+ typed properties, PHP 8.0 constructor promotion, PHP 8.1 enums,
          PHP 8.2 readonly classes, nullable types, nested objects, and PHPDoc annotations.
        </p>
      </div>
    </article>
  );
}
