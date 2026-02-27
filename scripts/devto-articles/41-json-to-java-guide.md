---
title: "JSON to Java Class: Complete POJO Generation Guide with Jackson"
tags: java, json, programming, backend
canonical_url: https://viadreams.cc/en/blog/json-to-java-online-guide
published: true
---

Converting JSON to Java classes is essential for every Java backend developer. Here's what you need.

## Java POJO from JSON

For this JSON:
```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "active": true
}
```

Generated Java POJO with Jackson:
```java
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
    @JsonProperty("id")
    private int id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("email")
    private String email;

    @JsonProperty("active")
    private boolean active;

    // getters and setters
}
```

## Jackson ObjectMapper

```java
// Maven: com.fasterxml.jackson.core:jackson-databind:2.17.0
ObjectMapper mapper = new ObjectMapper();

// Deserialize
User user = mapper.readValue(jsonString, User.class);

// Serialize
String json = mapper.writeValueAsString(user);

// Pretty print
String pretty = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(user);
```

## Lombok Integration

```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
    @JsonProperty("id")
    private int id;

    @JsonProperty("name")
    private String name;

    // No boilerplate needed — @Data generates getters, setters, equals, hashCode, toString
}
```

## Java Records (Java 16+)

```java
public record UserRecord(
    @JsonProperty("id") int id,
    @JsonProperty("name") String name,
    @JsonProperty("email") String email
) {}

// Deserialization requires @JsonCreator
public record ProductRecord(int id, String name, double price) {
    @JsonCreator
    public ProductRecord(
        @JsonProperty("id") int id,
        @JsonProperty("name") String name,
        @JsonProperty("price") double price
    ) {
        this(id, name, price);
    }
}
```

## Nested Objects and Arrays

```java
public class Order {
    @JsonProperty("order_id")
    private String orderId;

    @JsonProperty("customer")
    private Customer customer;        // nested object

    @JsonProperty("items")
    private List<OrderItem> items;   // array of objects

    @JsonProperty("tags")
    private List<String> tags;       // array of primitives
}

// Deserialize with generics
List<User> users = mapper.readValue(
    jsonArray,
    new TypeReference<List<User>>() {}
);
```

## Nullable Fields

```java
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {
    private Integer id;      // Integer (boxed) for nullable int
    private String name;
    private String bio;      // null if absent from JSON

    @JsonSetter(nulls = Nulls.SKIP)
    public void setBio(String bio) {
        this.bio = bio;
    }
}
```

## Handling Unknown Fields

```java
// Ignore all unknown fields globally
@JsonIgnoreProperties(ignoreUnknown = true)
public class User { ... }

// Or capture them
public class FlexibleUser {
    private String name;
    private Map<String, Object> extra = new HashMap<>();

    @JsonAnySetter
    public void setExtra(String key, Object value) {
        extra.put(key, value);
    }

    @JsonAnyGetter
    public Map<String, Object> getExtra() {
        return extra;
    }
}
```

## Enum Handling

```java
public enum Status {
    @JsonProperty("active") ACTIVE,
    @JsonProperty("inactive") INACTIVE,
    @JsonProperty("pending") PENDING;
}

// Or with @JsonValue
public enum Priority {
    LOW(1), MEDIUM(2), HIGH(3);

    private final int value;
    Priority(int value) { this.value = value; }

    @JsonValue
    public int getValue() { return value; }
}
```

## Date and Time (Java 8+)

```java
// Register JavaTimeModule
ObjectMapper mapper = new ObjectMapper();
mapper.registerModule(new JavaTimeModule());
mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

public class Event {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate date;

    private Instant createdAt;        // ISO-8601
    private ZonedDateTime updatedAt;  // with timezone
}
```

## Bean Validation (Spring Boot)

```java
public class CreateUserRequest {
    @NotBlank(message = "Name is required")
    @JsonProperty("name")
    private String name;

    @Email(message = "Invalid email format")
    @JsonProperty("email")
    private String email;

    @Min(value = 0, message = "Age must be non-negative")
    @Max(value = 150)
    @JsonProperty("age")
    private int age;
}

// Spring controller
@PostMapping("/users")
public ResponseEntity<User> createUser(@Valid @RequestBody CreateUserRequest req) {
    // validation runs automatically
}
```

## Quick Tool

For automatic class generation, use **[DevToolBox JSON to Java converter](https://viadreams.cc/en/tools/json-to-java)** — paste JSON, get Java POJO or Record instantly.

---

*Generate Java classes from JSON instantly with [DevToolBox's free JSON to Java tool](https://viadreams.cc/en/tools/json-to-java).*
