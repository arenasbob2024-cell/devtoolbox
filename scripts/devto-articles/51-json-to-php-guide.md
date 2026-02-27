---
title: "JSON to PHP Class: Complete Guide with Constructor Promotion and Typed Properties"
tags: php, json, backend, webdev
canonical_url: https://viadreams.cc/en/blog/json-to-php-online-guide
published: true
---

Convert JSON to PHP classes with modern typed properties. Here's the complete guide.

## json_decode() Basics

```php
// Returns stdClass by default
$obj = json_decode($json);
echo $obj->name;

// Returns associative array
$arr = json_decode($json, true);
echo $arr['name'];

// Error handling
$data = json_decode($json);
if (json_last_error() !== JSON_ERROR_NONE) {
    throw new \InvalidArgumentException('Invalid JSON: ' . json_last_error_msg());
}
```

## PHP 7.4+ Typed Properties

```php
class User {
    public int $id;
    public string $name;
    public string $email;
    public bool $active;
    public ?string $bio;  // nullable

    public static function fromArray(array $data): self {
        $user = new self();
        $user->id = $data['id'];
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->active = $data['active'] ?? true;
        $user->bio = $data['bio'] ?? null;
        return $user;
    }
}

$user = User::fromArray(json_decode($json, true));
```

## PHP 8.0 Constructor Promotion

```php
class User {
    public function __construct(
        public readonly int $id,
        public readonly string $name,
        public readonly string $email,
        public readonly bool $active = true,
        public readonly ?string $bio = null,
    ) {}

    public static function fromJson(string $json): self {
        $data = json_decode($json, true, 512, JSON_THROW_ON_ERROR);
        return new self(
            id: $data['id'],
            name: $data['name'],
            email: $data['email'],
            active: $data['active'] ?? true,
            bio: $data['bio'] ?? null,
        );
    }
}
```

## PHP 8.2 Readonly Classes

```php
readonly class UserDTO {
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public ?string $bio,
    ) {}
}

// Immutable — all properties are readonly
$user = new UserDTO(id: 1, name: 'Alice', email: 'alice@example.com', bio: null);
```

## PHP 8.1 Enums

```php
enum Status: string {
    case Active = 'active';
    case Inactive = 'inactive';
    case Pending = 'pending';
}

class User {
    public function __construct(
        public int $id,
        public string $name,
        public Status $status,
    ) {}

    public static function fromArray(array $data): self {
        return new self(
            id: $data['id'],
            name: $data['name'],
            status: Status::from($data['status']),  // throws ValueError if invalid
        );
    }
}
```

## Spatie Laravel Data

```php
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapInputName;

class UserData extends Data {
    public function __construct(
        public int $id,
        public string $name,
        #[MapInputName('first_name')]
        public string $firstName,
        public ?string $bio,
    ) {}
}

// Auto-maps JSON → DTO with validation
$user = UserData::from(['id' => 1, 'name' => 'Alice', 'first_name' => 'Alice']);
```

## Quick Tool

For automatic PHP class generation from JSON, use **[DevToolBox JSON to PHP converter](https://viadreams.cc/en/tools/json-to-php)** — paste JSON, get PHP classes with typed properties instantly.

---

*Generate PHP classes from JSON instantly with [DevToolBox's free JSON to PHP tool](https://viadreams.cc/en/tools/json-to-php).*
