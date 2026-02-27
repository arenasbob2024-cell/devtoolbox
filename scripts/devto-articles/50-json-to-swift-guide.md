---
title: "JSON to Swift Struct: Complete Guide with Codable and JSONDecoder"
tags: swift, ios, json, programming
canonical_url: https://viadreams.cc/en/blog/json-to-swift-online-guide
published: true
---

Convert JSON to Swift structs with the Codable protocol. Here's everything iOS/macOS developers need.

## Basic Codable Struct

```swift
import Foundation

struct User: Codable {
    let id: Int
    let name: String
    let email: String
    let active: Bool
}

// Decode
let json = """{"id":1,"name":"Alice","email":"alice@example.com","active":true}"""
let user = try JSONDecoder().decode(User.self, from: json.data(using: .utf8)!)

// Encode
let encoded = try JSONEncoder().encode(user)
let jsonString = String(data: encoded, encoding: .utf8)!
```

## CodingKeys — Snake Case to Camel Case

```swift
struct ApiResponse: Codable {
    let userId: Int
    let firstName: String
    let avatarUrl: String

    enum CodingKeys: String, CodingKey {
        case userId = "user_id"
        case firstName = "first_name"
        case avatarUrl = "avatar_url"
    }
}

// Or use keyDecodingStrategy (simpler for all fields)
let decoder = JSONDecoder()
decoder.keyDecodingStrategy = .convertFromSnakeCase
let response = try decoder.decode(ApiResponse.self, from: data)
```

## Optional Properties

```swift
struct User: Codable {
    let id: Int
    let name: String
    let bio: String?          // nil if absent or null
    let avatarUrl: String?    // nil if absent or null

    enum CodingKeys: String, CodingKey {
        case id, name, bio
        case avatarUrl = "avatar_url"
    }
}

// Default values with custom init
struct Config: Codable {
    let timeout: Int
    let retries: Int

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        timeout = try container.decodeIfPresent(Int.self, forKey: .timeout) ?? 30
        retries = try container.decodeIfPresent(Int.self, forKey: .retries) ?? 3
    }
}
```

## Nested Structs and Arrays

```swift
struct Order: Codable {
    let orderId: String
    let customer: Customer
    let items: [OrderItem]
    let tags: [String]

    enum CodingKeys: String, CodingKey {
        case orderId = "order_id"
        case customer, items, tags
    }
}

// Decode array
let orders = try JSONDecoder().decode([Order].self, from: data)
```

## Enums with RawRepresentable

```swift
enum Status: String, Codable {
    case active = "active"
    case inactive = "inactive"
    case pending = "pending"
}

struct User: Codable {
    let id: Int
    let name: String
    let status: Status  // decodes "active" → .active
}
```

## Date Handling

```swift
let decoder = JSONDecoder()

// ISO 8601 strings: "2024-01-15T10:30:00Z"
decoder.dateDecodingStrategy = .iso8601

// Unix timestamps: 1705312200
decoder.dateDecodingStrategy = .secondsSince1970

// Custom format
let formatter = DateFormatter()
formatter.dateFormat = "yyyy-MM-dd"
decoder.dateDecodingStrategy = .formatted(formatter)

struct Event: Codable {
    let id: Int
    let name: String
    let startDate: Date
}
```

## async/await with URLSession

```swift
struct APIClient {
    let decoder: JSONDecoder = {
        let d = JSONDecoder()
        d.keyDecodingStrategy = .convertFromSnakeCase
        d.dateDecodingStrategy = .iso8601
        return d
    }()

    func fetchUser(id: Int) async throws -> User {
        let url = URL(string: "https://api.example.com/users/\(id)")!
        let (data, response) = try await URLSession.shared.data(from: url)

        guard let http = response as? HTTPURLResponse, http.statusCode == 200 else {
            throw URLError(.badServerResponse)
        }

        return try decoder.decode(User.self, from: data)
    }
}
```

## Quick Tool

For automatic Swift struct generation from JSON, use **[DevToolBox JSON to Swift converter](https://viadreams.cc/en/tools/json-to-swift)** — paste JSON, get Swift structs with Codable instantly.

---

*Generate Swift structs from JSON instantly with [DevToolBox's free JSON to Swift tool](https://viadreams.cc/en/tools/json-to-swift).*
