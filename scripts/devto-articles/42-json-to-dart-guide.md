---
title: "JSON to Dart: Complete Guide to Flutter Class Generation with Null Safety"
tags: dart, flutter, json, mobile
canonical_url: https://viadreams.cc/en/blog/json-to-dart-online-guide
published: true
---

Converting JSON to Dart classes for Flutter with null safety — everything you need.

## Manual fromJson/toJson

```dart
class User {
  final int id;
  final String name;
  final String? bio;  // nullable

  User({required this.id, required this.name, this.bio});

  factory User.fromJson(Map<String, dynamic> json) => User(
    id: json['id'] as int,
    name: json['name'] as String,
    bio: json['bio'] as String?,
  );

  Map<String, dynamic> toJson() => {
    'id': id,
    'name': name,
    if (bio != null) 'bio': bio,
  };
}

// Usage
final user = User.fromJson(jsonDecode(response.body));
final json = jsonEncode(user.toJson());
```

## json_serializable (Code Generation)

```yaml
# pubspec.yaml
dependencies:
  json_annotation: ^4.9.0

dev_dependencies:
  build_runner: ^2.4.0
  json_serializable: ^6.8.0
```

```dart
import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';

@JsonSerializable()
class User {
  final int id;
  final String name;

  @JsonKey(name: 'avatar_url')
  final String? avatarUrl;

  User({required this.id, required this.name, this.avatarUrl});

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}

// Generate: dart run build_runner build
```

## freezed (Immutable Classes)

```dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'user.freezed.dart';
part 'user.g.dart';

@freezed
class User with _$User {
  const factory User({
    required int id,
    required String name,
    String? bio,
  }) = _User;

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
}

// Benefits: copyWith, pattern matching, immutability, union types
final updated = user.copyWith(name: 'Bob');
```

## Nested Objects and Lists

```dart
@JsonSerializable()
class Order {
  final String orderId;
  final Customer customer;
  final List<OrderItem> items;
  final List<String> tags;

  Order({
    required this.orderId,
    required this.customer,
    required this.items,
    required this.tags,
  });

  factory Order.fromJson(Map<String, dynamic> json) => _$OrderFromJson(json);
  Map<String, dynamic> toJson() => _$OrderToJson(this);
}
```

## Enum Handling

```dart
@JsonEnum(valueField: 'value')
enum Status {
  active('active'),
  inactive('inactive'),
  pending('pending');

  const Status(this.value);
  final String value;
}

// Or with @JsonValue
enum Priority {
  @JsonValue(1) low,
  @JsonValue(2) medium,
  @JsonValue(3) high,
}
```

## Date/Time Handling

```dart
// Custom converter for DateTime
class DateTimeConverter implements JsonConverter<DateTime, String> {
  const DateTimeConverter();

  @override
  DateTime fromJson(String json) => DateTime.parse(json);

  @override
  String toJson(DateTime object) => object.toIso8601String();
}

@JsonSerializable()
class Event {
  final String name;

  @DateTimeConverter()
  final DateTime createdAt;
}
```

## Hive Local Storage

```dart
@HiveType(typeId: 0)
class CachedUser extends HiveObject {
  @HiveField(0)
  late int id;

  @HiveField(1)
  late String name;

  // Convert from API model
  factory CachedUser.fromUser(User user) => CachedUser()
    ..id = user.id
    ..name = user.name;
}
```

## Quick Tool

For automatic Dart class generation, use **[DevToolBox JSON to Dart converter](https://viadreams.cc/en/tools/json-to-dart)** — paste JSON, get Flutter-ready Dart class with null safety.

---

*Generate Dart classes from JSON instantly with [DevToolBox's free JSON to Dart tool](https://viadreams.cc/en/tools/json-to-dart).*
