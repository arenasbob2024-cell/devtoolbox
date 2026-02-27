---
title: "JSON to Kotlin Data Class: Complete Guide with kotlinx.serialization, Gson and Moshi"
tags: kotlin, android, json, mobile
canonical_url: https://viadreams.cc/en/blog/json-to-kotlin-online-guide
published: true
---

Converting JSON to Kotlin data classes for Android and multiplatform apps. Here's everything you need.

## Basic Data Class

```kotlin
import kotlinx.serialization.Serializable
import kotlinx.serialization.SerialName

@Serializable
data class User(
    val id: Int,
    val name: String,
    val email: String,
    val active: Boolean,
    @SerialName("avatar_url")
    val avatarUrl: String? = null
)

// Deserialize
val user = Json.decodeFromString<User>(jsonString)

// Serialize
val json = Json.encodeToString(user)
```

## Gson Alternative

```kotlin
// build.gradle: implementation 'com.google.code.gson:gson:2.11.0'
data class User(
    val id: Int,
    val name: String,
    @SerializedName("avatar_url")
    val avatarUrl: String?
)

val gson = Gson()
val user = gson.fromJson(jsonString, User::class.java)
val serialized = gson.toJson(user)
```

## Moshi Alternative

```kotlin
// build.gradle: implementation 'com.squareup.moshi:moshi-kotlin:1.15.1'
@JsonClass(generateAdapter = true)
data class User(
    val id: Int,
    val name: String,
    @Json(name = "avatar_url")
    val avatarUrl: String?
)

val moshi = Moshi.Builder().add(KotlinJsonAdapterFactory()).build()
val adapter = moshi.adapter(User::class.java)
val user = adapter.fromJson(jsonString)
```

## Nested Objects and Lists

```kotlin
@Serializable
data class Order(
    @SerialName("order_id") val orderId: String,
    val customer: Customer,
    val items: List<OrderItem>,
    val tags: List<String>
)

// Deserialize with List
val orders = Json.decodeFromString<List<Order>>(jsonArray)
```

## Nullable Fields and Default Values

```kotlin
@Serializable
data class Profile(
    val id: Int,
    val name: String,
    val bio: String? = null,           // null if absent in JSON
    val age: Int = 0,                   // default if absent
    val preferences: List<String> = emptyList()
)
```

## Sealed Classes for Union Types

```kotlin
@Serializable
sealed class ApiResponse {
    @Serializable
    data class Success(val data: User) : ApiResponse()

    @Serializable
    data class Error(val message: String, val code: Int) : ApiResponse()
}

// With type discriminator
@Serializable
@JsonClassDiscriminator("type")
sealed class Event {
    @Serializable
    @SerialName("click")
    data class ClickEvent(val x: Int, val y: Int) : Event()

    @Serializable
    @SerialName("scroll")
    data class ScrollEvent(val delta: Float) : Event()
}
```

## Coroutines + Ktor Client

```kotlin
// build.gradle: implementation 'io.ktor:ktor-client-serialization:2.3.7'
val client = HttpClient(CIO) {
    install(ContentNegotiation) {
        json(Json { ignoreUnknownKeys = true })
    }
}

suspend fun getUser(id: Int): User {
    return client.get("https://api.example.com/users/$id").body()
}

// Usage in coroutine scope
viewModelScope.launch {
    val user = getUser(1)
    _uiState.value = UiState.Success(user)
}
```

## Android / Retrofit Integration

```kotlin
// With Gson
interface ApiService {
    @GET("users/{id}")
    suspend fun getUser(@Path("id") id: Int): User

    @POST("users")
    suspend fun createUser(@Body user: CreateUserRequest): User
}

val retrofit = Retrofit.Builder()
    .baseUrl("https://api.example.com/")
    .addConverterFactory(GsonConverterFactory.create())
    .build()
```

## Quick Tool

For automatic Kotlin class generation, use **[DevToolBox JSON to Kotlin converter](https://viadreams.cc/en/tools/json-to-kotlin)** — paste JSON, get Kotlin data class with kotlinx.serialization or Gson annotations instantly.

---

*Generate Kotlin data classes from JSON instantly with [DevToolBox's free JSON to Kotlin tool](https://viadreams.cc/en/tools/json-to-kotlin).*
