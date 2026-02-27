---
title: "JSON to Go Struct: The Complete Conversion Guide for 2026"
tags: go, golang, json, programming
canonical_url: https://viadreams.cc/en/blog/json-to-go-online-guide
published: true
---

Converting JSON to Go structs is a daily task for Go backend developers. Here's everything you need to know.

## Basic Struct Generation

For this JSON:
```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "active": true
}
```

Generated Go struct:
```go
type User struct {
    ID     int    `json:"id"`
    Name   string `json:"name"`
    Email  string `json:"email"`
    Active bool   `json:"active"`
}
```

## JSON Tags Explained

```go
type Product struct {
    // "json" tag maps field to JSON key
    ProductID   int     `json:"product_id"`

    // omitempty: skip field if zero value
    Description string  `json:"description,omitempty"`

    // "-": always skip this field
    Internal    string  `json:"-"`

    // string: marshal number as JSON string
    Price       float64 `json:"price,string"`
}
```

## Nested Structs and Arrays

```go
type Order struct {
    OrderID  string    `json:"order_id"`
    Customer Customer  `json:"customer"`  // nested struct
    Items    []Item    `json:"items"`     // array of structs
    Tags     []string  `json:"tags"`      // array of primitives
    Meta     map[string]interface{} `json:"meta"` // dynamic object
}

type Customer struct {
    Name    string `json:"name"`
    Email   string `json:"email"`
    Address Address `json:"address"`
}

type Address struct {
    Street string `json:"street"`
    City   string `json:"city"`
    Zip    string `json:"zip"`
}
```

## Nullable and Optional Fields

```go
// Use pointers for nullable/optional fields
type User struct {
    ID        int     `json:"id"`
    Name      string  `json:"name"`
    Bio       *string `json:"bio"`       // null or string
    AvatarURL *string `json:"avatar_url,omitempty"` // may be absent
}

// Decoding
var user User
json.Unmarshal(data, &user)

if user.Bio != nil {
    fmt.Println("Bio:", *user.Bio)
}
```

## Decoding JSON

```go
import (
    "encoding/json"
    "net/http"
)

// From bytes
var user User
if err := json.Unmarshal(data, &user); err != nil {
    return fmt.Errorf("parse user: %w", err)
}

// From HTTP response
resp, err := http.Get("https://api.example.com/users/1")
if err != nil { /* handle */ }
defer resp.Body.Close()

var user User
if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
    return fmt.Errorf("decode user: %w", err)
}
```

## Encoding JSON

```go
user := User{ID: 1, Name: "Alice", Email: "alice@example.com"}

// To bytes
data, err := json.Marshal(user)

// Pretty print
data, err := json.MarshalIndent(user, "", "  ")

// To writer (e.g., http.ResponseWriter)
w.Header().Set("Content-Type", "application/json")
json.NewEncoder(w).Encode(user)
```

## Dynamic JSON with map[string]interface{}

```go
// When structure is unknown
var result map[string]interface{}
json.Unmarshal(data, &result)

// Type assertions needed for nested access
if name, ok := result["name"].(string); ok {
    fmt.Println(name)
}

// Better: json.RawMessage for delayed decoding
type Response struct {
    Status string          `json:"status"`
    Data   json.RawMessage `json:"data"` // decode later based on status
}
```

## Custom Marshaling

```go
// Custom time format
type Event struct {
    Name      string    `json:"name"`
    CreatedAt time.Time `json:"created_at"`
}

// time.Time marshals to RFC3339 by default: "2026-02-27T10:00:00Z"

// Custom format: implement json.Marshaler
type CustomDate struct {
    time.Time
}

func (d CustomDate) MarshalJSON() ([]byte, error) {
    return json.Marshal(d.Format("2006-01-02"))
}

func (d *CustomDate) UnmarshalJSON(data []byte) error {
    var s string
    if err := json.Unmarshal(data, &s); err != nil {
        return err
    }
    t, err := time.Parse("2006-01-02", s)
    d.Time = t
    return err
}
```

## Tools: json-to-go and quicktype

For automatic struct generation from JSON:

1. **[DevToolBox JSON to Go converter](https://viadreams.cc/en/tools/json-to-go)** — paste JSON, get Go struct instantly

2. **quicktype CLI**:
```bash
npm install -g quicktype
quicktype --lang go --out types.go data.json
```

3. **json-to-go** (classic web tool): josefpihrt/json-to-go

## Common Pitfalls

1. **Unexported fields are ignored** — start struct field names with uppercase
2. **Integers vs floats** — JSON numbers decode as `float64` in `interface{}`
3. **Missing omitempty** — zero values (0, "", false) get marshaled unless omitempty
4. **Nil vs empty slice** — `var s []int` marshals as `null`, `s := []int{}` marshals as `[]`

```go
// To always marshal as [] not null:
type User struct {
    Tags []string `json:"tags"`
}

user := User{} // Tags is nil
data, _ := json.Marshal(user) // {"tags": null}

user.Tags = make([]string, 0) // empty slice
data, _ = json.Marshal(user)  // {"tags": []}
```

---

*Convert JSON to Go structs instantly with [DevToolBox's free JSON to Go tool](https://viadreams.cc/en/tools/json-to-go) — handles nested objects, arrays, nullable fields, and Go naming conventions.*
