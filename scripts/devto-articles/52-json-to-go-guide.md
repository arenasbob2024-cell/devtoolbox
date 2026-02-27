---
title: "JSON to Go Struct: Complete Guide with encoding/json and Struct Tags"
tags: go, json, golang, backend
canonical_url: https://viadreams.cc/en/blog/json-to-go-online-guide
published: true
---

Convert JSON to Go structs with encoding/json. Here's everything Go developers need.

## Basic json.Unmarshal

```go
package main

import (
    "encoding/json"
    "fmt"
)

type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

func main() {
    data := `{"id":1,"name":"Alice","email":"alice@example.com"}`
    var user User
    if err := json.Unmarshal([]byte(data), &user); err != nil {
        panic(err)
    }
    fmt.Println(user.Name) // Alice
}
```

## JSON Struct Tags

```go
type Product struct {
    ID          int     `json:"id"`
    Name        string  `json:"product_name"`        // rename
    Price       float64 `json:"price,omitempty"`     // omit if zero
    InternalRef string  `json:"-"`                   // never marshal
    StockCount  int     `json:"stock_count,string"`  // number as string
}
```

## Optional Fields with Pointers

```go
type User struct {
    ID       int     `json:"id"`
    Name     string  `json:"name"`
    Bio      *string `json:"bio"`       // nil if absent/null
    AvatarURL *string `json:"avatar_url,omitempty"`
}

func processUser(u User) {
    if u.Bio != nil {
        fmt.Println("Bio:", *u.Bio)
    }
}
```

## Nested Structs and Arrays

```go
type Address struct {
    Street string `json:"street"`
    City   string `json:"city"`
}

type Order struct {
    OrderID  string    `json:"order_id"`
    Customer User      `json:"customer"`  // nested struct
    Items    []Item    `json:"items"`     // array
    Tags     []string  `json:"tags"`
    Meta     map[string]string `json:"meta"` // dynamic keys
}

// Decode array of orders
var orders []Order
json.Unmarshal(data, &orders)
```

## Custom UnmarshalJSON — Date Parsing

```go
type Event struct {
    ID   int       `json:"id"`
    Name string    `json:"name"`
    Date time.Time `json:"date"`
}

// Use json.Decoder with time format
decoder := json.NewDecoder(strings.NewReader(data))
decoder.DisallowUnknownFields()

// Or custom type
type Date time.Time

func (d *Date) UnmarshalJSON(data []byte) error {
    s := strings.Trim(string(data), `"`)
    t, err := time.Parse("2006-01-02", s)
    if err != nil {
        return err
    }
    *d = Date(t)
    return nil
}
```

## json.Decoder for Streaming

```go
// Preferred for HTTP responses and large files
resp, _ := http.Get("https://api.example.com/users")
defer resp.Body.Close()

var users []User
if err := json.NewDecoder(resp.Body).Decode(&users); err != nil {
    log.Fatal(err)
}

// Reject unknown fields
dec := json.NewDecoder(r)
dec.DisallowUnknownFields()
```

## json.Marshal — Encoding to JSON

```go
user := User{ID: 1, Name: "Alice", Email: "alice@example.com"}

// Compact
data, _ := json.Marshal(user)

// Pretty-printed
pretty, _ := json.MarshalIndent(user, "", "  ")
fmt.Println(string(pretty))
```

## HTTP API Pattern

```go
func handler(w http.ResponseWriter, r *http.Request) {
    var req CreateUserRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    // process...
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]any{"id": 1, "created": true})
}
```

## Quick Tool

For automatic Go struct generation from JSON, use **[DevToolBox JSON to Go converter](https://viadreams.cc/en/tools/json-to-go)** — paste JSON, get Go structs with proper tags instantly.

---

*Generate Go structs from JSON instantly with [DevToolBox's free JSON to Go tool](https://viadreams.cc/en/tools/json-to-go).*
