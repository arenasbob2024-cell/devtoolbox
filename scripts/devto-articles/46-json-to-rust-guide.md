---
title: "JSON to Rust Struct: Complete Guide with serde_json and serde Derive"
tags: rust, json, webdev, backend
canonical_url: https://viadreams.cc/en/blog/json-to-rust-online-guide
published: true
---

Convert JSON to Rust structs using serde_json. Here's everything Rust developers need.

## Cargo.toml Setup

```toml
[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

## Basic Struct

```rust
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
struct User {
    id: u32,
    name: String,
    email: String,
    active: bool,
}

// Deserialize
let user: User = serde_json::from_str(json_str)?;

// Serialize
let json = serde_json::to_string(&user)?;
let pretty = serde_json::to_string_pretty(&user)?;
```

## Field Renaming

```rust
use serde::{Serialize, Deserialize};

// camelCase JSON → snake_case Rust
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct ApiResponse {
    user_id: u32,        // maps to "userId"
    first_name: String,  // maps to "firstName"
    avatar_url: String,  // maps to "avatarUrl"
}

// Individual field rename
#[derive(Serialize, Deserialize)]
struct Product {
    #[serde(rename = "product_id")]
    id: u32,
    name: String,
}
```

## Option<T> for Nullable Fields

```rust
#[derive(Serialize, Deserialize)]
struct User {
    id: u32,
    name: String,
    bio: Option<String>,          // null → None

    #[serde(skip_serializing_if = "Option::is_none")]
    avatar_url: Option<String>,   // omit from JSON if None
}

// Deserialize: null or missing → None
let user: User = serde_json::from_str(r#"{"id":1,"name":"Alice","bio":null}"#)?;
assert_eq!(user.bio, None);
```

## Nested Structs and Vec<T>

```rust
#[derive(Serialize, Deserialize)]
struct Order {
    order_id: String,
    customer: Customer,     // nested struct
    items: Vec<OrderItem>,  // array of structs
    tags: Vec<String>,      // array of strings
}

// Deserialize list
let orders: Vec<Order> = serde_json::from_str(json_array)?;
```

## Enums

```rust
// External tagging (default): {"Circle": {"radius": 1.0}}
#[derive(Serialize, Deserialize)]
enum Shape {
    Circle { radius: f64 },
    Rectangle { width: f64, height: f64 },
}

// Internal tagging: {"type": "circle", "radius": 1.0}
#[derive(Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "snake_case")]
enum Event {
    Click { x: i32, y: i32 },
    Scroll { delta: f32 },
}

// Adjacent tagging: {"t": "circle", "c": {"radius": 1.0}}
#[derive(Serialize, Deserialize)]
#[serde(tag = "t", content = "c")]
enum Shape2 {
    Circle { radius: f64 },
}
```

## Default Values

```rust
#[derive(Serialize, Deserialize)]
struct Config {
    #[serde(default = "default_timeout")]
    timeout: u32,           // use function if field missing

    #[serde(default)]
    enabled: bool,          // use Default::default() (false)

    #[serde(default)]
    tags: Vec<String>,      // empty Vec if missing
}

fn default_timeout() -> u32 { 30 }
```

## Error Handling

```rust
use serde_json::Error;

fn parse_user(json: &str) -> Result<User, String> {
    serde_json::from_str(json).map_err(|e| {
        match e.classify() {
            serde_json::error::Category::Syntax => format!("Invalid JSON: {}", e),
            serde_json::error::Category::Data => format!("Type mismatch: {}", e),
            serde_json::error::Category::Eof => "Unexpected end of input".to_string(),
            _ => format!("Parse error: {}", e),
        }
    })
}
```

## Axum Integration

```rust
use axum::{extract::Json, routing::post, Router};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct CreateUser {
    name: String,
    email: String,
}

#[derive(Serialize)]
struct UserResponse {
    id: u32,
    name: String,
}

async fn create_user(Json(payload): Json<CreateUser>) -> Json<UserResponse> {
    Json(UserResponse { id: 1, name: payload.name })
}

let app = Router::new().route("/users", post(create_user));
```

## Quick Tool

For automatic Rust struct generation from JSON, use **[DevToolBox JSON to Rust converter](https://viadreams.cc/en/tools/json-to-rust)** — paste JSON, get Rust struct with serde derive macros instantly.

---

*Generate Rust structs from JSON instantly with [DevToolBox's free JSON to Rust tool](https://viadreams.cc/en/tools/json-to-rust).*
