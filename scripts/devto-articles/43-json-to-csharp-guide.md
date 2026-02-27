---
title: "JSON to C# Class: Complete Guide with System.Text.Json and Json.NET"
tags: csharp, dotnet, json, backend
canonical_url: https://viadreams.cc/en/blog/json-to-csharp-online-guide
published: true
---

Convert JSON to C# classes with the two most popular libraries. Here's everything you need.

## Basic POCO

```csharp
using System.Text.Json.Serialization;

public class User
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;

    [JsonPropertyName("active")]
    public bool Active { get; set; }
}
```

## System.Text.Json (Built-in)

```csharp
using System.Text.Json;

// Deserialize
var user = JsonSerializer.Deserialize<User>(jsonString);

// Serialize
var json = JsonSerializer.Serialize(user);

// With options
var options = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true,
    PropertyNameCaseInsensitive = true  // ignore case on deserialization
};
var user = JsonSerializer.Deserialize<User>(jsonString, options);
```

## Records (C# 9+)

```csharp
// Immutable record
public record User(
    [property: JsonPropertyName("id")] int Id,
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("email")] string Email
);

// Mutable record struct
public record struct Point(double X, double Y);

// with-expressions
var updated = user with { Name = "Bob" };
```

## Nullable Reference Types (C# 8+)

```csharp
#nullable enable

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;    // non-nullable, default empty
    public string? Bio { get; set; }                     // nullable — may be null

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? AvatarUrl { get; set; }               // omit from JSON if null
}
```

## Nested Objects and Collections

```csharp
public class Order
{
    [JsonPropertyName("order_id")]
    public string OrderId { get; set; } = string.Empty;

    [JsonPropertyName("customer")]
    public Customer Customer { get; set; } = new();

    [JsonPropertyName("items")]
    public List<OrderItem> Items { get; set; } = new();

    [JsonPropertyName("tags")]
    public string[] Tags { get; set; } = Array.Empty<string>();
}

// Deserialize list
var orders = JsonSerializer.Deserialize<List<Order>>(json);
```

## Enum Handling

```csharp
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Status
{
    Active,
    Inactive,
    Pending
}

// Or with custom values
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Priority
{
    [EnumMember(Value = "low")] Low,
    [EnumMember(Value = "medium")] Medium,
    [EnumMember(Value = "high")] High
}
```

## Date and Time

```csharp
public class Event
{
    public string Name { get; set; } = string.Empty;

    // ISO 8601 by default
    public DateTime CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }

    // Custom format
    [JsonConverter(typeof(CustomDateConverter))]
    public DateOnly Date { get; set; }
}

// Custom converter for special formats
public class CustomDateConverter : JsonConverter<DateOnly>
{
    private const string Format = "yyyy-MM-dd";

    public override DateOnly Read(ref Utf8JsonReader reader, Type t, JsonSerializerOptions options)
        => DateOnly.ParseExact(reader.GetString()!, Format);

    public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
        => writer.WriteStringValue(value.ToString(Format));
}
```

## Json.NET (Newtonsoft) Alternative

```csharp
// NuGet: Newtonsoft.Json
using Newtonsoft.Json;

public class User
{
    [JsonProperty("id")]
    public int Id { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonIgnore]
    public string InternalField { get; set; }
}

var user = JsonConvert.DeserializeObject<User>(json);
var serialized = JsonConvert.SerializeObject(user, Formatting.Indented);
```

## ASP.NET Core Integration

```csharp
// Program.cs
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

// Controller
[HttpPost]
public async Task<ActionResult<User>> CreateUser([FromBody] CreateUserRequest request)
{
    // request is auto-deserialized from JSON body
    return Ok(newUser);
}

// HttpClient
var user = await httpClient.GetFromJsonAsync<User>("/api/users/1");
await httpClient.PostAsJsonAsync("/api/users", newUser);
```

## Quick Tool

For automatic C# class generation, use **[DevToolBox JSON to C# converter](https://viadreams.cc/en/tools/json-to-csharp)** — paste JSON, get C# POCO or record class instantly.

---

*Generate C# classes from JSON instantly with [DevToolBox's free JSON to C# tool](https://viadreams.cc/en/tools/json-to-csharp).*
