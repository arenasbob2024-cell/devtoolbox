---
title: "JSON to Rust Struct: Complete Guide with Serde and serde_json"
tags: rust, json, serde, backend
canonical_url: https://viadreams.cc/en/blog/json-to-rust-online-guide
published: true
---

Convert JSON to Rust structs with Serde. Here's everything Rust developers need.

## Serde Setup

```toml
# Cargo.toml
[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

```rust
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct User {
    id: u32,
    name: String,
    email: String,
    active: bool,
}

fn main() -> Result<(), serde_json::Error> {
    let json = r#"{"id":1,"name":"Alice","email":"alice@example.com","active":true}"#;
    let user: User = serde_json::from_str(json)?;
    println!("{}", user.name); // Alice

    let encoded = serde_json::to_string(&user)?;
    println!("{}", encoded);
    Ok(())
}
```

## Serde Field Attributes

```rust
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]  // camelCase ↔ snake_case
struct ApiResponse {
    user_id: u32,       // maps to/from "userId"
    first_name: String, // maps to/from "firstName"

    #[serde(rename = "avatar")]
    avatar_url: String, // explicit rename

    #[serde(skip)]
    internal_ref: String, // never serialize/deserialize

    #[serde(default)]
    active: bool, // use Default::default() if missing

    #[serde(skip_serializing_if = "Option::is_none")]
    bio: Option<String>, // omit null from output
}
```

## Optional and Default Fields

```rust
#[derive(Deserialize)]
struct Config {
    host: String,

    #[serde(default = "default_port")]
    port: u16,  // uses 8080 if missing

    timeout: Option<u64>,  // None if absent or null
}

fn default_port() -> u16 { 8080 }
```

## Nested Structs and Arrays

```rust
#[derive(Deserialize)]
struct Order {
    order_id: String,
    customer: Customer,       // nested struct
    items: Vec<OrderItem>,    // array
    tags: Vec<String>,

    #[serde(default)]
    metadata: std::collections::HashMap<String, String>,
}

// Decode array
let orders: Vec<Order> = serde_json::from_str(json)?;
```

## Enums with Serde

```rust
// String enum
#[derive(Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
enum Status {
    Active,    // "active"
    Inactive,  // "inactive"
    Pending,   // "pending"
}

// Tagged union (common API pattern)
#[derive(Deserialize)]
#[serde(tag = "type")]
enum Event {
    #[serde(rename = "user_created")]
    UserCreated { user_id: u32, email: String },
    #[serde(rename = "order_placed")]
    OrderPlaced { order_id: String, amount: f64 },
}
```

## Custom Deserialize — Dates with Chrono

```toml
chrono = { version = "0.4", features = ["serde"] }
```

```rust
use chrono::{DateTime, Utc, NaiveDate};
use serde::{Deserialize, Deserializer};

#[derive(Deserialize)]
struct Event {
    id: u32,
    name: String,

    #[serde(with = "chrono::serde::ts_seconds")]
    created_at: DateTime<Utc>,  // Unix timestamp

    #[serde(deserialize_with = "deserialize_date")]
    date: NaiveDate,  // "2024-01-15"
}

fn deserialize_date<'de, D>(d: D) -> Result<NaiveDate, D::Error>
where D: Deserializer<'de> {
    let s = String::deserialize(d)?;
    NaiveDate::parse_from_str(&s, "%Y-%m-%d").map_err(serde::de::Error::custom)
}
```

## Dynamic JSON with serde_json::Value

```rust
use serde_json::Value;

let v: Value = serde_json::from_str(r#"{"name":"Alice","scores":[10,20]}"#)?;

// Navigate
println!("{}", v["name"]);           // "Alice"
println!("{}", v["scores"][0]);      // 10
println!("{}", v["name"].as_str().unwrap_or(""));

// Build JSON with json! macro
let payload = serde_json::json!({
    "user": { "id": 1, "name": "Alice" },
    "active": true
});
```

## Axum Integration

```rust
use axum::{extract::Json, routing::post, Router};

#[derive(Deserialize)]
struct CreateUser { name: String, email: String }

#[derive(Serialize)]
struct UserResponse { id: u32, name: String }

async fn create_user(Json(payload): Json<CreateUser>) -> Json<UserResponse> {
    Json(UserResponse { id: 1, name: payload.name })
}
```

## Quick Tool

For automatic Rust struct generation from JSON, use **[DevToolBox JSON to Rust converter](https://viadreams.cc/en/tools/json-to-rust)** — paste JSON, get Rust structs with Serde derives instantly.

---

*Generate Rust structs from JSON instantly with [DevToolBox's free JSON to Rust tool](https://viadreams.cc/en/tools/json-to-rust).*
