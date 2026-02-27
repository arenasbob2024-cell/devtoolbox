'use client';
import Link from 'next/link';
import React from 'react';

/* ------------------------------------------------------------------ */
/*  JSON to Dart Online Guide                                           */
/* ------------------------------------------------------------------ */

export default function JsonToDartOnlineGuide({ lang }: { lang: string }) {
  const l = lang || 'en';
  const toolLink = `/${l}/tools/json-to-dart`;

  /* ------------------------------------------------------------------ */
  /*  Translations                                                        */
  /* ------------------------------------------------------------------ */
  const t: Record<string, Record<string, string>> = {
    en: {
      tldr_title: 'TL;DR',
      tldr: 'Converting JSON to Dart classes with null safety is essential for robust Flutter apps. Use our free online tool for instant generation, or the json_serializable package for production codebases. Always distinguish between required fields, optional fields (?), and nullable fields (Type?). The freezed package adds immutability and copyWith(). Run `flutter pub run build_runner build` after using annotations.',
      takeaways_title: 'Key Takeaways',
      takeaway1: 'Dart null safety requires you to mark nullable fields with ? and use the required keyword for mandatory constructor parameters.',
      takeaway2: 'json_serializable + build_runner eliminates fromJson/toJson boilerplate — annotate with @JsonSerializable() and run code generation.',
      takeaway3: 'freezed creates immutable data classes with copyWith(), == overrides, and pattern matching on top of json_serializable.',
      takeaway4: 'Nested objects need their own fromJson factories; use List<T>.from(json[\'key\'].map((x) => T.fromJson(x))) for typed lists.',
      takeaway5: 'DateTime parsing uses DateTime.parse() in fromJson and .toIso8601String() in toJson.',
      takeaway6: 'For enums, use @JsonKey(unknownEnumValue: EnumType.unknown) to handle values not yet in your enum definition.',
      takeaway7: 'Always write a roundtrip unit test: expect(User.fromJson(user.toJson()), equals(user)) to catch serialization bugs early.',
      link_tool: 'Try our free JSON to Dart converter',

      h2_why: 'Why Convert JSON to Dart Classes?',
      why_p1: 'Flutter apps communicate with REST APIs, WebSockets, and local storage using JSON. Without strongly typed Dart classes, you work with dynamic maps — no autocomplete, no compile-time checks, and runtime exceptions waiting to happen. Dart\'s sound null safety makes this even more important: the compiler enforces correct handling of nullable values.',
      why_p2: 'Generating Dart model classes from JSON gives you:',
      why_li1: '<strong>Compile-time type safety</strong>: Access a missing property and the analyzer catches it immediately.',
      why_li2: '<strong>IDE autocomplete</strong>: Every field, method, and nested object is discoverable via IntelliSense.',
      why_li3: '<strong>Null safety enforcement</strong>: Dart separates nullable (String?) from non-nullable (String) at the language level.',
      why_li4: '<strong>Refactoring confidence</strong>: Rename a field in your class and the analyzer flags every usage site.',
      why_li5: '<strong>Testability</strong>: Immutable value objects are easy to construct, compare, and assert in unit tests.',

      h2_anatomy: 'Dart Class Anatomy: fromJson and toJson',
      anatomy_p1: 'A canonical Dart model class has three parts: fields (with null safety annotations), a factory constructor for deserialization, and a method for serialization:',
      anatomy_code: `class User {
  final int id;
  final String name;
  final String? email;       // nullable — may be null
  final DateTime createdAt;

  const User({
    required this.id,
    required this.name,
    this.email,              // optional parameter, defaults to null
    required this.createdAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as int,
      name: json['name'] as String,
      email: json['email'] as String?,
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'created_at': createdAt.toIso8601String(),
    };
  }
}`,
      anatomy_p2: 'Key design decisions in this class:',
      anatomy_li1: '<code>final</code> fields make the class effectively immutable after construction.',
      anatomy_li2: '<code>required</code> in the constructor enforces that callers always provide non-nullable fields.',
      anatomy_li3: 'The factory constructor casts each JSON value to its Dart type, converting snake_case keys to camelCase fields.',
      anatomy_li4: '<code>String?</code> (nullable String) maps to JSON values that can be null or absent.',

      h2_null_safety: 'Null Safety in Generated Classes',
      null_p1: 'Dart 2.12+ enforces sound null safety. This means the type system tracks which values can be null and which cannot. When generating classes from JSON, you must correctly identify nullable vs non-nullable fields:',
      null_code1: `// Non-nullable: field is always present and never null
final String name;           // json['name'] is always a String

// Nullable: field may be absent or explicitly null
final String? bio;           // json['bio'] can be null

// Null assertion: you're sure the value isn't null at runtime
final String admin = json['role']!;  // throws if null!

// Null coalescing: provide a default when the value is null
final int age = json['age'] ?? 0;    // defaults to 0 if absent`,
      null_p2: 'Best practice: prefer providing explicit defaults over using the null assertion operator (!). The assertion can throw a Null check operator used on a null value exception at runtime.',
      null_code2: `factory UserProfile.fromJson(Map<String, dynamic> json) {
  return UserProfile(
    id: json['id'] as int,
    username: json['username'] as String,
    // Nullable field — may be null or missing
    avatarUrl: json['avatar_url'] as String?,
    // Default value instead of null assertion
    followersCount: (json['followers_count'] as int?) ?? 0,
    // Boolean with default
    isVerified: (json['is_verified'] as bool?) ?? false,
  );
}`,

      h2_json_serializable: 'json_serializable Package',
      jser_p1: 'For projects with many models, the json_serializable package eliminates repetitive fromJson/toJson boilerplate through code generation. Setup involves three steps:',
      jser_h3_setup: 'Step 1: pubspec.yaml Setup',
      jser_code_pubspec: `dependencies:
  flutter:
    sdk: flutter
  json_annotation: ^4.8.1

dev_dependencies:
  build_runner: ^2.4.0
  json_serializable: ^6.7.0`,
      jser_h3_model: 'Step 2: Annotate Your Model',
      jser_code_model: `import 'package:json_annotation/json_annotation.dart';

part 'product.g.dart';     // generated file

@JsonSerializable()
class Product {
  final int id;
  final String name;
  @JsonKey(name: 'unit_price')
  final double unitPrice;
  @JsonKey(defaultValue: true)
  final bool inStock;

  const Product({
    required this.id,
    required this.name,
    required this.unitPrice,
    required this.inStock,
  });

  // Generated code lives in product.g.dart:
  factory Product.fromJson(Map<String, dynamic> json) =>
      _$ProductFromJson(json);

  Map<String, dynamic> toJson() => _$ProductToJson(this);
}`,
      jser_h3_build: 'Step 3: Run Build Runner',
      jser_code_build: `# One-time generation
flutter pub run build_runner build

# Watch mode — regenerates on file save
flutter pub run build_runner watch --delete-conflicting-outputs`,
      jser_p2: 'After running build_runner, a product.g.dart file is created with the full fromJson and toJson implementations. You never edit this file — always edit the annotated class and regenerate.',
      jser_p3: 'Useful @JsonKey options:',
      jser_li1: '<code>@JsonKey(name: \'snake_key\')</code> — maps a JSON key to a differently-named Dart field.',
      jser_li2: '<code>@JsonKey(defaultValue: 0)</code> — provides a default when the key is absent.',
      jser_li3: '<code>@JsonKey(ignore: true)</code> — excludes a field from serialization.',
      jser_li4: '<code>@JsonKey(fromJson: _parseDate, toJson: _formatDate)</code> — custom conversion functions.',

      h2_freezed: 'freezed Package: Immutable Data Classes',
      freezed_p1: 'The freezed package builds on json_serializable to create fully immutable Dart classes with value equality, copyWith(), and sealed class support. It\'s the preferred choice for state management models in Riverpod and BLoC:',
      freezed_code_pubspec: `dev_dependencies:
  build_runner: ^2.4.0
  json_serializable: ^6.7.0
  freezed: ^2.4.0

dependencies:
  freezed_annotation: ^2.4.0
  json_annotation: ^4.8.1`,
      freezed_code_model: `import 'package:freezed_annotation/freezed_annotation.dart';

part 'order.freezed.dart';
part 'order.g.dart';

@freezed
class Order with _$Order {
  const factory Order({
    required int id,
    required String status,
    required List<OrderItem> items,
    double? discount,
    @Default(false) bool isPriority,
  }) = _Order;

  factory Order.fromJson(Map<String, dynamic> json) =>
      _$OrderFromJson(json);
}`,
      freezed_p2: 'Benefits of freezed:',
      freezed_li1: '<strong>Value equality</strong>: Two Order objects with the same fields are == without writing hashCode or ==.',
      freezed_li2: '<strong>copyWith()</strong>: Create modified copies easily — <code>order.copyWith(status: \'shipped\')</code>.',
      freezed_li3: '<strong>@Default</strong>: Declare default field values inline.',
      freezed_li4: '<strong>Sealed classes / Union types</strong>: Model states like Loading | Data | Error with pattern matching.',
      freezed_code_union: `@freezed
sealed class ApiState<T> with _$ApiState<T> {
  const factory ApiState.loading() = _Loading;
  const factory ApiState.data(T value) = _Data;
  const factory ApiState.error(String message) = _Error;
}

// Pattern matching usage:
Widget build(BuildContext context, ApiState<User> state) {
  return state.when(
    loading: () => const CircularProgressIndicator(),
    data: (user) => Text(user.name),
    error: (msg) => Text('Error: \$msg'),
  );
}`,

      h2_manual: 'Manual fromJson/toJson Patterns',
      manual_p1: 'Sometimes you need full control over deserialization. Here are common manual patterns:',
      manual_h3_datetime: 'DateTime Parsing',
      manual_code_datetime: `factory Event.fromJson(Map<String, dynamic> json) {
  return Event(
    id: json['id'] as int,
    title: json['title'] as String,
    // ISO 8601 string to DateTime
    startTime: DateTime.parse(json['start_time'] as String),
    // Nullable DateTime
    endTime: json['end_time'] != null
        ? DateTime.parse(json['end_time'] as String)
        : null,
    // Unix timestamp to DateTime
    updatedAt: DateTime.fromMillisecondsSinceEpoch(
      (json['updated_at'] as int) * 1000,
    ),
  );
}

Map<String, dynamic> toJson() => {
  'id': id,
  'title': title,
  'start_time': startTime.toIso8601String(),
  'end_time': endTime?.toIso8601String(),
  'updated_at': updatedAt.millisecondsSinceEpoch ~/ 1000,
};`,
      manual_h3_map: 'Map Fields',
      manual_code_map: `factory Config.fromJson(Map<String, dynamic> json) {
  return Config(
    settings: (json['settings'] as Map<String, dynamic>)
        .map((k, v) => MapEntry(k, v as String)),
    metadata: json['metadata'] as Map<String, dynamic>? ?? {},
  );
}`,

      h2_nested: 'Nested Objects and Lists',
      nested_p1: 'Most real-world JSON has nested objects and arrays. Here\'s how to handle them correctly:',
      nested_code1: `// JSON structure:
// { "post": { "id": 1, "tags": ["dart", "flutter"], "author": { "id": 10, "name": "Alice" } } }

class Author {
  final int id;
  final String name;

  Author({required this.id, required this.name});

  factory Author.fromJson(Map<String, dynamic> json) =>
      Author(id: json['id'] as int, name: json['name'] as String);

  Map<String, dynamic> toJson() => {'id': id, 'name': name};
}

class Post {
  final int id;
  final List<String> tags;
  final Author author;

  Post({required this.id, required this.tags, required this.author});

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'] as int,
      // List<String> from JSON array
      tags: List<String>.from(json['tags'] as List),
      // Nested object
      author: Author.fromJson(json['author'] as Map<String, dynamic>),
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'tags': tags,
    'author': author.toJson(),
  };
}`,
      nested_p2: 'For lists of complex objects:',
      nested_code2: `factory Cart.fromJson(Map<String, dynamic> json) {
  return Cart(
    id: json['id'] as int,
    // List of complex objects
    items: (json['items'] as List)
        .map((item) => CartItem.fromJson(item as Map<String, dynamic>))
        .toList(),
    // Nullable list
    discounts: json['discounts'] != null
        ? (json['discounts'] as List)
            .map((d) => Discount.fromJson(d as Map<String, dynamic>))
            .toList()
        : null,
  );
}`,

      h2_enum: 'Enum Serialization',
      enum_p1: 'Serializing Dart enums to and from JSON strings requires care — especially when the API may return values you haven\'t defined yet:',
      enum_code1: `enum OrderStatus {
  @JsonValue('pending')
  pending,
  @JsonValue('processing')
  processing,
  @JsonValue('shipped')
  shipped,
  @JsonValue('delivered')
  delivered,
  @JsonValue('cancelled')
  cancelled,
}`,
      enum_p2: 'With json_serializable, use @JsonKey(unknownEnumValue:) to handle unknown values gracefully:',
      enum_code2: `@JsonSerializable()
class Order {
  final int id;
  @JsonKey(unknownEnumValue: OrderStatus.pending)
  final OrderStatus status;

  Order({required this.id, required this.status});
  factory Order.fromJson(Map<String, dynamic> json) =>
      _$OrderFromJson(json);
  Map<String, dynamic> toJson() => _$OrderToJson(this);
}`,
      enum_p3: 'For manual serialization, a helper extension works well:',
      enum_code3: `extension OrderStatusExtension on String {
  OrderStatus toOrderStatus() {
    switch (this) {
      case 'processing': return OrderStatus.processing;
      case 'shipped': return OrderStatus.shipped;
      case 'delivered': return OrderStatus.delivered;
      case 'cancelled': return OrderStatus.cancelled;
      default: return OrderStatus.pending;
    }
  }
}

// Usage in fromJson:
status: (json['status'] as String).toOrderStatus(),`,

      h2_datetime: 'Date and Time Handling',
      dt_p1: 'DateTime handling is one of the trickiest parts of JSON serialization. Here are common patterns and a reusable custom converter:',
      dt_code1: `// Custom JsonConverter for DateTime
class DateTimeConverter implements JsonConverter<DateTime, String> {
  const DateTimeConverter();

  @override
  DateTime fromJson(String json) => DateTime.parse(json);

  @override
  String toJson(DateTime object) => object.toIso8601String();
}

// Custom converter for Unix timestamps
class TimestampConverter implements JsonConverter<DateTime, int> {
  const TimestampConverter();

  @override
  DateTime fromJson(int json) =>
      DateTime.fromMillisecondsSinceEpoch(json * 1000);

  @override
  int toJson(DateTime object) =>
      object.millisecondsSinceEpoch ~/ 1000;
}

// Apply to your model:
@JsonSerializable()
class Article {
  final int id;
  @DateTimeConverter()
  final DateTime publishedAt;
  @TimestampConverter()
  final DateTime updatedAt;

  Article({
    required this.id,
    required this.publishedAt,
    required this.updatedAt,
  });

  factory Article.fromJson(Map<String, dynamic> json) =>
      _$ArticleFromJson(json);
  Map<String, dynamic> toJson() => _$ArticleToJson(this);
}`,

      h2_network: 'Network Requests with Dio and http',
      net_p1: 'Combining JSON parsing with HTTP clients is the most common Flutter use case. Here\'s how to fetch and parse JSON safely:',
      net_h3_http: 'Using the http Package',
      net_code_http: `import 'dart:convert';
import 'package:http/http.dart' as http;

Future<User> fetchUser(int id) async {
  final response = await http.get(
    Uri.parse('https://api.example.com/users/\$id'),
    headers: {'Content-Type': 'application/json'},
  );

  if (response.statusCode == 200) {
    final json = jsonDecode(response.body) as Map<String, dynamic>;
    return User.fromJson(json);
  } else {
    throw Exception('Failed to load user: \${response.statusCode}');
  }
}

Future<List<Post>> fetchPosts() async {
  final response = await http.get(
    Uri.parse('https://api.example.com/posts'),
  );
  if (response.statusCode == 200) {
    final list = jsonDecode(response.body) as List;
    return list
        .map((item) => Post.fromJson(item as Map<String, dynamic>))
        .toList();
  }
  throw Exception('HTTP \${response.statusCode}');
}`,
      net_h3_dio: 'Using Dio',
      net_code_dio: `import 'package:dio/dio.dart';

final _dio = Dio(BaseOptions(
  baseUrl: 'https://api.example.com',
  connectTimeout: const Duration(seconds: 10),
  receiveTimeout: const Duration(seconds: 10),
));

Future<User> fetchUser(int id) async {
  try {
    final response = await _dio.get<Map<String, dynamic>>('/users/\$id');
    return User.fromJson(response.data!);
  } on DioException catch (e) {
    throw Exception('Network error: \${e.message}');
  }
}

// Dio interceptor for global error handling
_dio.interceptors.add(
  InterceptorsWrapper(
    onError: (error, handler) {
      // Log, refresh tokens, or redirect to login
      handler.next(error);
    },
  ),
);`,

      h2_state: 'State Management Integration',
      state_p1: 'Generated Dart models integrate naturally with Riverpod and BLoC — the two most popular state management solutions for Flutter.',
      state_h3_riverpod: 'Riverpod with AsyncNotifier',
      state_code_riverpod: `import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'user_provider.g.dart';

@riverpod
class UserNotifier extends _$UserNotifier {
  @override
  Future<User> build(int userId) => _fetchUser(userId);

  Future<User> _fetchUser(int id) async {
    final response = await http.get(
      Uri.parse('https://api.example.com/users/\$id'),
    );
    return User.fromJson(
      jsonDecode(response.body) as Map<String, dynamic>,
    );
  }

  Future<void> updateName(String newName) async {
    final current = await future;
    state = AsyncData(current.copyWith(name: newName));
  }
}

// Usage in a widget:
class UserCard extends ConsumerWidget {
  final int userId;
  const UserCard({required this.userId, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userAsync = ref.watch(userNotifierProvider(userId));
    return userAsync.when(
      data: (user) => Text(user.name),
      loading: () => const CircularProgressIndicator(),
      error: (e, _) => Text('Error: \$e'),
    );
  }
}`,
      state_h3_bloc: 'BLoC Pattern',
      state_code_bloc: `// Event
abstract class UserEvent {}
class FetchUser extends UserEvent { final int id; FetchUser(this.id); }

// State (using freezed)
@freezed
sealed class UserState with _$UserState {
  const factory UserState.initial() = _Initial;
  const factory UserState.loading() = _Loading;
  const factory UserState.loaded(User user) = _Loaded;
  const factory UserState.error(String message) = _Error;
}

// BLoC
class UserBloc extends Bloc<UserEvent, UserState> {
  UserBloc() : super(const UserState.initial()) {
    on<FetchUser>(_onFetchUser);
  }

  Future<void> _onFetchUser(
    FetchUser event,
    Emitter<UserState> emit,
  ) async {
    emit(const UserState.loading());
    try {
      final response = await http.get(
        Uri.parse('https://api.example.com/users/\${event.id}'),
      );
      final user = User.fromJson(
        jsonDecode(response.body) as Map<String, dynamic>,
      );
      emit(UserState.loaded(user));
    } catch (e) {
      emit(UserState.error(e.toString()));
    }
  }
}`,

      h2_hive: 'Hive Local Storage',
      hive_p1: 'Hive is a fast, lightweight local database for Flutter. You can persist your JSON-derived models using HiveObject and TypeAdapters:',
      hive_code1: `import 'package:hive/hive.dart';

part 'cached_user.g.dart';

@HiveType(typeId: 0)
class CachedUser extends HiveObject {
  @HiveField(0)
  final int id;

  @HiveField(1)
  final String name;

  @HiveField(2)
  final String? email;

  CachedUser({required this.id, required this.name, this.email});

  // Convert from network model to cache model
  factory CachedUser.fromUser(User user) =>
      CachedUser(id: user.id, name: user.name, email: user.email);

  // Convert back to network model
  User toUser() => User(id: id, name: name, email: email,
      createdAt: DateTime.now()); // restore from cache
}`,
      hive_code2: `// Initialize Hive
void main() async {
  await Hive.initFlutter();
  Hive.registerAdapter(CachedUserAdapter()); // generated
  await Hive.openBox<CachedUser>('users');
  runApp(const MyApp());
}

// Persist a model
Future<void> cacheUser(User user) async {
  final box = Hive.box<CachedUser>('users');
  await box.put(user.id, CachedUser.fromUser(user));
}

// Read from cache
CachedUser? getUser(int id) {
  return Hive.box<CachedUser>('users').get(id);
}`,

      h2_testing: 'Testing JSON Models',
      test_p1: 'A roundtrip test ensures that serialization and deserialization are inverses of each other. Write one for every model:',
      test_code1: `import 'package:test/test.dart';
import 'dart:convert';

void main() {
  group('User model', () {
    final sampleJson = {
      'id': 1,
      'name': 'Alice',
      'email': 'alice@example.com',
      'created_at': '2024-01-15T10:30:00.000Z',
    };

    test('fromJson creates correct User', () {
      final user = User.fromJson(sampleJson);
      expect(user.id, equals(1));
      expect(user.name, equals('Alice'));
      expect(user.email, equals('alice@example.com'));
      expect(user.createdAt.year, equals(2024));
    });

    test('toJson produces correct map', () {
      final user = User.fromJson(sampleJson);
      final json = user.toJson();
      expect(json['id'], equals(1));
      expect(json['name'], equals('Alice'));
    });

    test('roundtrip preserves all fields', () {
      final user = User.fromJson(sampleJson);
      final restored = User.fromJson(user.toJson());
      expect(restored.id, equals(user.id));
      expect(restored.name, equals(user.name));
      expect(restored.email, equals(user.email));
    });

    test('handles null email', () {
      final jsonWithoutEmail = {...sampleJson}..remove('email');
      final user = User.fromJson(jsonWithoutEmail);
      expect(user.email, isNull);
    });

    test('fromJson with raw JSON string', () {
      final jsonString = jsonEncode(sampleJson);
      final user = User.fromJson(
        jsonDecode(jsonString) as Map<String, dynamic>,
      );
      expect(user.id, equals(1));
    });
  });
}`,

      h2_mistakes: 'Common Mistakes to Avoid',
      mistakes_p1: 'These are the most frequent errors Flutter developers encounter when working with JSON serialization:',
      mistake1_title: '1. Forgetting to run build_runner',
      mistake1: 'After adding or modifying @JsonSerializable() classes, always run `flutter pub run build_runner build --delete-conflicting-outputs`. The .g.dart file is not updated automatically.',
      mistake2_title: '2. Using dynamic instead of typed casts',
      mistake2_bad: `// Bad — silently passes wrong types at runtime
final name = json['name'];            // dynamic
final count = json['count'];          // dynamic, may be int or String`,
      mistake2_good: `// Good — fails fast with a clear cast error
final name = json['name'] as String;
final count = json['count'] as int;`,
      mistake3_title: '3. Treating missing keys as null',
      mistake3: `// Bad — throws if key is missing
final value = json['maybe_missing'] as String?; // still throws if key absent

// Good — safely handle absent keys
final value = json['maybe_missing'] as String?;  // ok if key present with null
// OR
final value = (json['maybe_missing'] ?? '') as String; // default value`,
      mistake4_title: '4. Not handling List type erasure',
      mistake4_bad: `// Bad — List<dynamic>, not List<String>
final tags = json['tags'] as List<String>; // ClassCastException at runtime`,
      mistake4_good: `// Good — explicit cast
final tags = List<String>.from(json['tags'] as List);`,
      mistake5_title: '5. Missing part directives',
      mistake5: 'Both json_serializable and freezed require part directives. For json_serializable: `part \'filename.g.dart\';`. For freezed: both `part \'filename.freezed.dart\';` AND `part \'filename.g.dart\';`.',

      h2_faq: 'Frequently Asked Questions',

      faq1_q: 'What is the difference between json_serializable and freezed?',
      faq1_a: 'json_serializable generates fromJson and toJson methods for mutable classes. freezed builds on top of json_serializable to create immutable classes with value equality (== and hashCode), copyWith(), and sealed union types. Use json_serializable for simple models and freezed when you need immutability or union types for state management.',

      faq2_q: 'Do I need to run build_runner every time I change a model?',
      faq2_a: 'Yes, but you can use watch mode to avoid manual runs: `flutter pub run build_runner watch --delete-conflicting-outputs`. This monitors your files and regenerates code automatically when you save. The --delete-conflicting-outputs flag handles stale generated files.',

      faq3_q: 'How do I handle JSON with snake_case keys and camelCase Dart fields?',
      faq3_a: 'With json_serializable, add @JsonSerializable(fieldRename: FieldRename.snake) to your class. This automatically maps snake_case JSON keys to camelCase Dart field names without needing individual @JsonKey(name:) annotations on every field.',

      faq4_q: 'How do I parse a JSON array at the top level?',
      faq4_a: 'When the API returns a JSON array (not an object) at the root level, decode it as a List and map each element: `final list = jsonDecode(response.body) as List; return list.map((e) => User.fromJson(e as Map<String, dynamic>)).toList();`',

      faq5_q: 'What happens if a required field is missing from the JSON?',
      faq5_a: 'If you cast with `json[\'field\'] as String` and the key is absent, json[\'field\'] returns null and the cast throws a type cast error at runtime. Always use null-safe casts (`as String?`) for fields that might be absent, or provide defaults with `?? defaultValue`.',

      faq6_q: 'Can I use json_serializable with Flutter Web?',
      faq6_a: 'Yes, json_serializable is platform-independent and works identically on Flutter Mobile, Web, and Desktop. The generated code uses only dart:core types.',

      faq7_q: 'How do I serialize a class that extends another class?',
      faq7_a: 'Use the explicitToJson: true option on @JsonSerializable and call super.toJson() manually, or restructure using composition instead of inheritance. json_serializable does not automatically include superclass fields, so explicitly add them in toJson() or use @JsonSerializable on the base class too.',

      faq8_q: 'Should I generate Dart models from every API response or only some?',
      faq8_a: 'Generate models for any JSON structure you access more than once, pass between functions, or store in state. For one-off API calls where you only read one or two fields, `jsonDecode` and direct map access is acceptable. As a project grows, typed models almost always pay off in maintainability.',
    },
    zh: {
      tldr_title: 'TL;DR',
      tldr: '将 JSON 转换为具有空安全的 Dart 类对于健壮的 Flutter 应用至关重要。使用我们的免费在线工具可即时生成，或在生产代码库中使用 json_serializable 包。始终区分 required 字段、可选字段(?) 和可为 null 的字段(Type?)。freezed 包添加了不可变性和 copyWith()。使用注解后需运行 `flutter pub run build_runner build`。',
      takeaways_title: '核心要点',
      takeaway1: 'Dart 空安全要求用 ? 标记可为 null 的字段，并对必填构造函数参数使用 required 关键字。',
      takeaway2: 'json_serializable + build_runner 消除了 fromJson/toJson 样板代码——用 @JsonSerializable() 注解并运行代码生成。',
      takeaway3: 'freezed 在 json_serializable 基础上创建不可变数据类，具有 copyWith()、== 重写和模式匹配功能。',
      takeaway4: '嵌套对象需要自己的 fromJson 工厂方法；对类型化列表使用 List<T>.from(json[\'key\'].map((x) => T.fromJson(x)))。',
      takeaway5: 'DateTime 解析在 fromJson 中使用 DateTime.parse()，在 toJson 中使用 .toIso8601String()。',
      takeaway6: '对于枚举，使用 @JsonKey(unknownEnumValue: EnumType.unknown) 处理枚举定义中尚未包含的值。',
      takeaway7: '始终编写往返单元测试：expect(User.fromJson(user.toJson()), equals(user)) 以尽早发现序列化错误。',
      link_tool: '试用我们的免费 JSON 转 Dart 工具',

      h2_why: '为什么要将 JSON 转换为 Dart 类？',
      why_p1: 'Flutter 应用使用 JSON 与 REST API、WebSocket 和本地存储进行通信。没有强类型的 Dart 类，你只能使用动态 Map——没有自动补全、没有编译时检查，运行时异常随时可能发生。Dart 的健全空安全使这一点更加重要：编译器强制正确处理可为 null 的值。',
      why_p2: '从 JSON 生成 Dart 模型类带来以下好处：',
      why_li1: '<strong>编译时类型安全</strong>：访问不存在的属性，分析器会立即捕获。',
      why_li2: '<strong>IDE 自动补全</strong>：每个字段、方法和嵌套对象都可通过 IntelliSense 发现。',
      why_li3: '<strong>空安全强制执行</strong>：Dart 在语言级别将可为 null (String?) 与不可为 null (String) 分离。',
      why_li4: '<strong>重构信心</strong>：重命名类中的字段，分析器会标记所有需要更新的使用位置。',
      why_li5: '<strong>可测试性</strong>：不可变值对象易于构建、比较和在单元测试中断言。',

      h2_anatomy: 'Dart 类剖析：fromJson 和 toJson',
      anatomy_p1: '规范的 Dart 模型类有三个部分：字段（带空安全注解）、用于反序列化的工厂构造函数以及用于序列化的方法：',
      anatomy_code: `class User {
  final int id;
  final String name;
  final String? email;       // 可为 null
  final DateTime createdAt;

  const User({
    required this.id,
    required this.name,
    this.email,
    required this.createdAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as int,
      name: json['name'] as String,
      email: json['email'] as String?,
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'created_at': createdAt.toIso8601String(),
    };
  }
}`,
      anatomy_p2: '该类的关键设计决策：',
      anatomy_li1: '<code>final</code> 字段使类在构造后实际上不可变。',
      anatomy_li2: '<code>required</code> 在构造函数中强制调用者始终提供非 null 字段。',
      anatomy_li3: '工厂构造函数将每个 JSON 值转换为其 Dart 类型，将 snake_case 键转换为 camelCase 字段。',
      anatomy_li4: '<code>String?</code>（可为 null 的 String）映射到可以为 null 或缺失的 JSON 值。',

      h2_null_safety: '生成类中的空安全',
      null_p1: 'Dart 2.12+ 强制执行健全空安全。这意味着类型系统跟踪哪些值可以为 null，哪些不能。从 JSON 生成类时，必须正确识别可为 null 与不可为 null 的字段：',
      null_code1: `// 非 null：字段始终存在且不为 null
final String name;           // json['name'] 始终是 String

// 可为 null：字段可能缺失或显式为 null
final String? bio;           // json['bio'] 可以为 null

// 空断言：你确定运行时值不为 null
final String admin = json['role']!;  // 若为 null 则抛出异常！

// 空合并：值为 null 时提供默认值
final int age = json['age'] ?? 0;    // 缺失时默认为 0`,
      null_p2: '最佳实践：优先提供显式默认值，而不是使用空断言运算符(!)。断言可能在运行时抛出"对 null 值使用了空值检查运算符"异常。',
      null_code2: `factory UserProfile.fromJson(Map<String, dynamic> json) {
  return UserProfile(
    id: json['id'] as int,
    username: json['username'] as String,
    avatarUrl: json['avatar_url'] as String?,
    followersCount: (json['followers_count'] as int?) ?? 0,
    isVerified: (json['is_verified'] as bool?) ?? false,
  );
}`,

      h2_json_serializable: 'json_serializable 包',
      jser_p1: '对于有许多模型的项目，json_serializable 包通过代码生成消除了重复的 fromJson/toJson 样板代码。设置包括三个步骤：',
      jser_h3_setup: '步骤 1：pubspec.yaml 设置',
      jser_code_pubspec: `dependencies:
  flutter:
    sdk: flutter
  json_annotation: ^4.8.1

dev_dependencies:
  build_runner: ^2.4.0
  json_serializable: ^6.7.0`,
      jser_h3_model: '步骤 2：为模型添加注解',
      jser_code_model: `import 'package:json_annotation/json_annotation.dart';

part 'product.g.dart';

@JsonSerializable()
class Product {
  final int id;
  final String name;
  @JsonKey(name: 'unit_price')
  final double unitPrice;
  @JsonKey(defaultValue: true)
  final bool inStock;

  const Product({
    required this.id,
    required this.name,
    required this.unitPrice,
    required this.inStock,
  });

  factory Product.fromJson(Map<String, dynamic> json) =>
      _$ProductFromJson(json);

  Map<String, dynamic> toJson() => _$ProductToJson(this);
}`,
      jser_h3_build: '步骤 3：运行 Build Runner',
      jser_code_build: `# 一次性生成
flutter pub run build_runner build

# 监视模式——文件保存时自动重新生成
flutter pub run build_runner watch --delete-conflicting-outputs`,
      jser_p2: '运行 build_runner 后，会创建包含完整 fromJson 和 toJson 实现的 product.g.dart 文件。永远不要编辑此文件——始终编辑带注解的类并重新生成。',
      jser_p3: '常用 @JsonKey 选项：',
      jser_li1: '<code>@JsonKey(name: \'snake_key\')</code>——将 JSON 键映射到名称不同的 Dart 字段。',
      jser_li2: '<code>@JsonKey(defaultValue: 0)</code>——键缺失时提供默认值。',
      jser_li3: '<code>@JsonKey(ignore: true)</code>——从序列化中排除字段。',
      jser_li4: '<code>@JsonKey(fromJson: _parseDate, toJson: _formatDate)</code>——自定义转换函数。',

      h2_freezed: 'freezed 包：不可变数据类',
      freezed_p1: 'freezed 包构建在 json_serializable 之上，创建具有值相等性、copyWith() 和密封类支持的完全不可变 Dart 类。它是 Riverpod 和 BLoC 状态管理模型的首选：',
      freezed_code_pubspec: `dev_dependencies:
  build_runner: ^2.4.0
  json_serializable: ^6.7.0
  freezed: ^2.4.0

dependencies:
  freezed_annotation: ^2.4.0
  json_annotation: ^4.8.1`,
      freezed_code_model: `import 'package:freezed_annotation/freezed_annotation.dart';

part 'order.freezed.dart';
part 'order.g.dart';

@freezed
class Order with _$Order {
  const factory Order({
    required int id,
    required String status,
    required List<OrderItem> items,
    double? discount,
    @Default(false) bool isPriority,
  }) = _Order;

  factory Order.fromJson(Map<String, dynamic> json) =>
      _$OrderFromJson(json);
}`,
      freezed_p2: 'freezed 的优势：',
      freezed_li1: '<strong>值相等性</strong>：具有相同字段的两个 Order 对象无需编写 hashCode 或 == 即可相等。',
      freezed_li2: '<strong>copyWith()</strong>：轻松创建修改后的副本——<code>order.copyWith(status: \'shipped\')</code>。',
      freezed_li3: '<strong>@Default</strong>：内联声明默认字段值。',
      freezed_li4: '<strong>密封类/联合类型</strong>：用模式匹配对 Loading | Data | Error 等状态建模。',
      freezed_code_union: `@freezed
sealed class ApiState<T> with _$ApiState<T> {
  const factory ApiState.loading() = _Loading;
  const factory ApiState.data(T value) = _Data;
  const factory ApiState.error(String message) = _Error;
}`,

      h2_manual: '手动 fromJson/toJson 模式',
      manual_p1: '有时你需要完全控制反序列化。以下是常见的手动模式：',
      manual_h3_datetime: 'DateTime 解析',
      manual_code_datetime: `factory Event.fromJson(Map<String, dynamic> json) {
  return Event(
    id: json['id'] as int,
    title: json['title'] as String,
    startTime: DateTime.parse(json['start_time'] as String),
    endTime: json['end_time'] != null
        ? DateTime.parse(json['end_time'] as String)
        : null,
    updatedAt: DateTime.fromMillisecondsSinceEpoch(
      (json['updated_at'] as int) * 1000,
    ),
  );
}

Map<String, dynamic> toJson() => {
  'id': id,
  'title': title,
  'start_time': startTime.toIso8601String(),
  'end_time': endTime?.toIso8601String(),
  'updated_at': updatedAt.millisecondsSinceEpoch ~/ 1000,
};`,
      manual_h3_map: 'Map 字段',
      manual_code_map: `factory Config.fromJson(Map<String, dynamic> json) {
  return Config(
    settings: (json['settings'] as Map<String, dynamic>)
        .map((k, v) => MapEntry(k, v as String)),
    metadata: json['metadata'] as Map<String, dynamic>? ?? {},
  );
}`,

      h2_nested: '嵌套对象和列表',
      nested_p1: '大多数真实世界的 JSON 都有嵌套对象和数组。以下是正确处理它们的方法：',
      nested_code1: `class Author {
  final int id;
  final String name;

  Author({required this.id, required this.name});

  factory Author.fromJson(Map<String, dynamic> json) =>
      Author(id: json['id'] as int, name: json['name'] as String);

  Map<String, dynamic> toJson() => {'id': id, 'name': name};
}

class Post {
  final int id;
  final List<String> tags;
  final Author author;

  Post({required this.id, required this.tags, required this.author});

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'] as int,
      tags: List<String>.from(json['tags'] as List),
      author: Author.fromJson(json['author'] as Map<String, dynamic>),
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'tags': tags,
    'author': author.toJson(),
  };
}`,
      nested_p2: '对于复杂对象列表：',
      nested_code2: `factory Cart.fromJson(Map<String, dynamic> json) {
  return Cart(
    id: json['id'] as int,
    items: (json['items'] as List)
        .map((item) => CartItem.fromJson(item as Map<String, dynamic>))
        .toList(),
    discounts: json['discounts'] != null
        ? (json['discounts'] as List)
            .map((d) => Discount.fromJson(d as Map<String, dynamic>))
            .toList()
        : null,
  );
}`,

      h2_enum: '枚举序列化',
      enum_p1: '将 Dart 枚举序列化为 JSON 字符串并反序列化需要谨慎——特别是当 API 可能返回尚未定义的值时：',
      enum_code1: `enum OrderStatus {
  @JsonValue('pending') pending,
  @JsonValue('processing') processing,
  @JsonValue('shipped') shipped,
  @JsonValue('delivered') delivered,
  @JsonValue('cancelled') cancelled,
}`,
      enum_p2: '使用 json_serializable 时，用 @JsonKey(unknownEnumValue:) 优雅地处理未知值：',
      enum_code2: `@JsonSerializable()
class Order {
  final int id;
  @JsonKey(unknownEnumValue: OrderStatus.pending)
  final OrderStatus status;

  Order({required this.id, required this.status});
  factory Order.fromJson(Map<String, dynamic> json) =>
      _$OrderFromJson(json);
  Map<String, dynamic> toJson() => _$OrderToJson(this);
}`,
      enum_p3: '对于手动序列化，扩展方法效果很好：',
      enum_code3: `extension OrderStatusExtension on String {
  OrderStatus toOrderStatus() {
    switch (this) {
      case 'processing': return OrderStatus.processing;
      case 'shipped': return OrderStatus.shipped;
      case 'delivered': return OrderStatus.delivered;
      case 'cancelled': return OrderStatus.cancelled;
      default: return OrderStatus.pending;
    }
  }
}

status: (json['status'] as String).toOrderStatus(),`,

      h2_datetime: '日期和时间处理',
      dt_p1: 'DateTime 处理是 JSON 序列化中最复杂的部分之一。以下是常见模式和可复用的自定义转换器：',
      dt_code1: `class DateTimeConverter implements JsonConverter<DateTime, String> {
  const DateTimeConverter();

  @override
  DateTime fromJson(String json) => DateTime.parse(json);

  @override
  String toJson(DateTime object) => object.toIso8601String();
}

@JsonSerializable()
class Article {
  final int id;
  @DateTimeConverter()
  final DateTime publishedAt;

  Article({required this.id, required this.publishedAt});

  factory Article.fromJson(Map<String, dynamic> json) =>
      _$ArticleFromJson(json);
  Map<String, dynamic> toJson() => _$ArticleToJson(this);
}`,

      h2_network: '使用 Dio 和 http 进行网络请求',
      net_p1: '将 JSON 解析与 HTTP 客户端结合是最常见的 Flutter 使用场景。以下是安全获取和解析 JSON 的方法：',
      net_h3_http: '使用 http 包',
      net_code_http: `Future<User> fetchUser(int id) async {
  final response = await http.get(
    Uri.parse('https://api.example.com/users/\$id'),
  );
  if (response.statusCode == 200) {
    return User.fromJson(
      jsonDecode(response.body) as Map<String, dynamic>,
    );
  }
  throw Exception('HTTP \${response.statusCode}');
}`,
      net_h3_dio: '使用 Dio',
      net_code_dio: `Future<User> fetchUser(int id) async {
  try {
    final response = await _dio.get<Map<String, dynamic>>('/users/\$id');
    return User.fromJson(response.data!);
  } on DioException catch (e) {
    throw Exception('网络错误: \${e.message}');
  }
}`,

      h2_state: '状态管理集成',
      state_p1: '生成的 Dart 模型与 Riverpod 和 BLoC 自然集成——这是 Flutter 最流行的两个状态管理解决方案。',
      state_h3_riverpod: '带 AsyncNotifier 的 Riverpod',
      state_code_riverpod: `@riverpod
class UserNotifier extends _$UserNotifier {
  @override
  Future<User> build(int userId) => _fetchUser(userId);

  Future<User> _fetchUser(int id) async {
    final response = await http.get(
      Uri.parse('https://api.example.com/users/\$id'),
    );
    return User.fromJson(
      jsonDecode(response.body) as Map<String, dynamic>,
    );
  }
}`,
      state_h3_bloc: 'BLoC 模式',
      state_code_bloc: `class UserBloc extends Bloc<UserEvent, UserState> {
  UserBloc() : super(const UserState.initial()) {
    on<FetchUser>(_onFetchUser);
  }

  Future<void> _onFetchUser(
    FetchUser event, Emitter<UserState> emit,
  ) async {
    emit(const UserState.loading());
    try {
      final response = await http.get(
        Uri.parse('https://api.example.com/users/\${event.id}'),
      );
      final user = User.fromJson(
        jsonDecode(response.body) as Map<String, dynamic>,
      );
      emit(UserState.loaded(user));
    } catch (e) {
      emit(UserState.error(e.toString()));
    }
  }
}`,

      h2_hive: 'Hive 本地存储',
      hive_p1: 'Hive 是 Flutter 的快速轻量级本地数据库。你可以使用 HiveObject 和 TypeAdapter 持久化 JSON 派生的模型：',
      hive_code1: `@HiveType(typeId: 0)
class CachedUser extends HiveObject {
  @HiveField(0) final int id;
  @HiveField(1) final String name;
  @HiveField(2) final String? email;

  CachedUser({required this.id, required this.name, this.email});

  factory CachedUser.fromUser(User user) =>
      CachedUser(id: user.id, name: user.name, email: user.email);
}`,
      hive_code2: `Future<void> cacheUser(User user) async {
  final box = Hive.box<CachedUser>('users');
  await box.put(user.id, CachedUser.fromUser(user));
}

CachedUser? getUser(int id) =>
    Hive.box<CachedUser>('users').get(id);`,

      h2_testing: '测试 JSON 模型',
      test_p1: '往返测试确保序列化和反序列化互为逆操作。为每个模型编写一个：',
      test_code1: `void main() {
  group('User model', () {
    final sampleJson = {
      'id': 1,
      'name': 'Alice',
      'email': 'alice@example.com',
      'created_at': '2024-01-15T10:30:00.000Z',
    };

    test('fromJson 创建正确的 User', () {
      final user = User.fromJson(sampleJson);
      expect(user.id, equals(1));
      expect(user.name, equals('Alice'));
    });

    test('往返保留所有字段', () {
      final user = User.fromJson(sampleJson);
      final restored = User.fromJson(user.toJson());
      expect(restored.id, equals(user.id));
      expect(restored.name, equals(user.name));
    });

    test('处理 null email', () {
      final jsonWithoutEmail = {...sampleJson}..remove('email');
      expect(User.fromJson(jsonWithoutEmail).email, isNull);
    });
  });
}`,

      h2_mistakes: '常见错误',
      mistakes_p1: '以下是 Flutter 开发者在 JSON 序列化中最常见的错误：',
      mistake1_title: '1. 忘记运行 build_runner',
      mistake1: '添加或修改 @JsonSerializable() 类后，始终运行 `flutter pub run build_runner build --delete-conflicting-outputs`。.g.dart 文件不会自动更新。',
      mistake2_title: '2. 使用 dynamic 而非类型转换',
      mistake2_bad: `// 不好——运行时静默传递错误类型
final name = json['name'];   // dynamic`,
      mistake2_good: `// 好——用清晰的转换错误快速失败
final name = json['name'] as String;`,
      mistake3_title: '3. 将缺失键视为 null',
      mistake3: `// 安全处理缺失键
final value = (json['maybe_missing'] ?? '') as String;`,
      mistake4_title: '4. 列表类型擦除',
      mistake4_bad: `// 不好——List<dynamic>，不是 List<String>
final tags = json['tags'] as List<String>; // 运行时 ClassCastException`,
      mistake4_good: `// 好——显式转换
final tags = List<String>.from(json['tags'] as List);`,
      mistake5_title: '5. 缺少 part 指令',
      mistake5: 'json_serializable 和 freezed 都需要 part 指令。json_serializable：`part \'filename.g.dart\';`。freezed 需要两个：`part \'filename.freezed.dart\';` 和 `part \'filename.g.dart\';`。',

      h2_faq: '常见问题',

      faq1_q: 'json_serializable 和 freezed 有什么区别？',
      faq1_a: 'json_serializable 为可变类生成 fromJson 和 toJson 方法。freezed 构建在 json_serializable 之上，创建具有值相等性(== 和 hashCode)、copyWith() 和密封联合类型的不可变类。简单模型用 json_serializable，需要不可变性或状态管理联合类型时用 freezed。',

      faq2_q: '每次修改模型都需要运行 build_runner 吗？',
      faq2_a: '是的，但你可以使用监视模式避免手动运行：`flutter pub run build_runner watch --delete-conflicting-outputs`。这会监视文件并在保存时自动重新生成代码。',

      faq3_q: '如何处理 JSON snake_case 键和 Dart camelCase 字段？',
      faq3_a: '使用 json_serializable 时，在类上添加 @JsonSerializable(fieldRename: FieldRename.snake)。这会自动将 snake_case JSON 键映射到 camelCase Dart 字段名，无需在每个字段上单独使用 @JsonKey(name:) 注解。',

      faq4_q: '如何解析顶层 JSON 数组？',
      faq4_a: '当 API 在根级别返回 JSON 数组时，将其解码为 List 并映射每个元素：`final list = jsonDecode(response.body) as List; return list.map((e) => User.fromJson(e as Map<String, dynamic>)).toList();`',

      faq5_q: 'JSON 中缺少必填字段会发生什么？',
      faq5_a: '如果用 `json[\'field\'] as String` 转换，而键不存在，json[\'field\'] 返回 null，转换会在运行时抛出类型转换错误。对可能缺失的字段始终使用空安全转换 (`as String?`)，或用 `?? defaultValue` 提供默认值。',

      faq6_q: '能在 Flutter Web 中使用 json_serializable 吗？',
      faq6_a: '可以，json_serializable 与平台无关，在 Flutter Mobile、Web 和 Desktop 上的工作方式完全相同。生成的代码只使用 dart:core 类型。',

      faq7_q: '如何序列化继承自另一个类的类？',
      faq7_a: '在 @JsonSerializable 上使用 explicitToJson: true 选项并手动调用 super.toJson()，或者改用组合而非继承。json_serializable 不会自动包含父类字段，因此需要在 toJson() 中显式添加，或在父类上也使用 @JsonSerializable。',

      faq8_q: '我应该为每个 API 响应生成 Dart 模型吗？',
      faq8_a: '对于多次访问、在函数间传递或存储在状态中的任何 JSON 结构，都应生成模型。对于只读取一两个字段的一次性 API 调用，直接使用 jsonDecode 和 Map 访问是可以的。随着项目增长，类型化模型几乎总是值得的。',
    },
  };

  const tx = t[l] || t['en'];

  /* ------------------------------------------------------------------ */
  /*  Shared styles                                                       */
  /* ------------------------------------------------------------------ */
  const sectionStyle: React.CSSProperties = {
    marginBottom: '2.5rem',
  };
  const h2Style: React.CSSProperties = {
    fontSize: '1.6rem',
    fontWeight: 700,
    marginBottom: '1rem',
    marginTop: '2rem',
    color: 'var(--text-primary, #1a202c)',
  };
  const h3Style: React.CSSProperties = {
    fontSize: '1.2rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
    marginTop: '1.5rem',
    color: 'var(--text-primary, #1a202c)',
  };
  const pStyle: React.CSSProperties = {
    lineHeight: 1.75,
    marginBottom: '1rem',
    color: 'var(--text-secondary, #4a5568)',
  };
  const codeBlockStyle: React.CSSProperties = {
    background: '#1e1e2e',
    color: '#cdd6f4',
    borderRadius: '0.5rem',
    padding: '1.25rem 1.5rem',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: 1.65,
    marginBottom: '1.25rem',
    fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", Consolas, monospace',
    whiteSpace: 'pre',
  };
  const inlineCodeStyle: React.CSSProperties = {
    background: 'var(--code-bg, #f1f5f9)',
    color: 'var(--code-color, #0f172a)',
    borderRadius: '0.25rem',
    padding: '0.1em 0.4em',
    fontSize: '0.875em',
    fontFamily: '"Fira Code", Consolas, monospace',
  };
  const ulStyle: React.CSSProperties = {
    paddingLeft: '1.5rem',
    marginBottom: '1rem',
    color: 'var(--text-secondary, #4a5568)',
  };
  const liStyle: React.CSSProperties = {
    marginBottom: '0.5rem',
    lineHeight: 1.7,
  };

  /* ------------------------------------------------------------------ */
  /*  FAQ schema                                                          */
  /* ------------------------------------------------------------------ */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t['en'].faq1_q, acceptedAnswer: { '@type': 'Answer', text: t['en'].faq1_a } },
      { '@type': 'Question', name: t['en'].faq2_q, acceptedAnswer: { '@type': 'Answer', text: t['en'].faq2_a } },
      { '@type': 'Question', name: t['en'].faq3_q, acceptedAnswer: { '@type': 'Answer', text: t['en'].faq3_a } },
      { '@type': 'Question', name: t['en'].faq4_q, acceptedAnswer: { '@type': 'Answer', text: t['en'].faq4_a } },
      { '@type': 'Question', name: t['en'].faq5_q, acceptedAnswer: { '@type': 'Answer', text: t['en'].faq5_a } },
      { '@type': 'Question', name: t['en'].faq6_q, acceptedAnswer: { '@type': 'Answer', text: t['en'].faq6_a } },
      { '@type': 'Question', name: t['en'].faq7_q, acceptedAnswer: { '@type': 'Answer', text: t['en'].faq7_a } },
      { '@type': 'Question', name: t['en'].faq8_q, acceptedAnswer: { '@type': 'Answer', text: t['en'].faq8_a } },
    ],
  };

  /* ------------------------------------------------------------------ */
  /*  Render                                                              */
  /* ------------------------------------------------------------------ */
  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem' }}>
      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR box */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: '0.75rem',
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
      }}>
        <strong style={{ fontSize: '1rem', color: '#0369a1' }}>{tx.tldr_title}</strong>
        <p style={{ margin: '0.5rem 0 0', color: '#0c4a6e', lineHeight: 1.7 }}>{tx.tldr}</p>
      </div>

      {/* Key Takeaways box */}
      <div style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '0.75rem',
        padding: '1.25rem 1.5rem',
        marginBottom: '2.5rem',
      }}>
        <strong style={{ fontSize: '1rem', color: '#334155' }}>{tx.takeaways_title}</strong>
        <ul style={{ ...ulStyle, marginTop: '0.75rem', marginBottom: 0 }}>
          <li style={liStyle}>{tx.takeaway1}</li>
          <li style={liStyle}>{tx.takeaway2}</li>
          <li style={liStyle}>{tx.takeaway3}</li>
          <li style={liStyle}>{tx.takeaway4}</li>
          <li style={liStyle}>{tx.takeaway5}</li>
          <li style={liStyle}>{tx.takeaway6}</li>
          <li style={liStyle}>{tx.takeaway7}</li>
        </ul>
      </div>

      {/* Tool CTA */}
      <div style={{ marginBottom: '2rem' }}>
        <Link href={toolLink} style={{
          display: 'inline-block',
          background: 'var(--accent-blue, #3b82f6)',
          color: '#fff',
          borderRadius: '0.5rem',
          padding: '0.6rem 1.25rem',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
        }}>
          {tx.link_tool} →
        </Link>
      </div>

      {/* ---- Section 1: Why ---- */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{tx.h2_why}</h2>
        <p style={pStyle}>{tx.why_p1}</p>
        <p style={pStyle}>{tx.why_p2}</p>
        <ul style={ulStyle}>
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.why_li1 }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.why_li2 }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.why_li3 }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.why_li4 }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.why_li5 }} />
        </ul>
      </section>

      {/* ---- Section 2: Dart Class Anatomy ---- */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{tx.h2_anatomy}</h2>
        <p style={pStyle}>{tx.anatomy_p1}</p>
        <pre style={codeBlockStyle}><code>{tx.anatomy_code}</code></pre>
        <p style={pStyle}>{tx.anatomy_p2}</p>
        <ul style={ulStyle}>
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.anatomy_li1 }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.anatomy_li2 }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.anatomy_li3 }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.anatomy_li4 }} />
        </ul>
      </section>

      {/* ---- Section 3: Null Safety ---- */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{tx.h2_null_safety}</h2>
        <p style={pStyle}>{tx.null_p1}</p>
        <pre style={codeBlockStyle}><code>{tx.null_code1}</code></pre>
        <p style={pStyle}>{tx.null_p2}</p>
        <pre style={codeBlockStyle}><code>{tx.null_code2}</code></pre>
      </section>

      {/* ---- Section 4: json_serializable ---- */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{tx.h2_json_serializable}</h2>
        <p style={pStyle}>{tx.jser_p1}</p>
        <h3 style={h3Style}>{tx.jser_h3_setup}</h3>
        <pre style={codeBlockStyle}><code>{tx.jser_code_pubspec}</code></pre>
        <h3 style={h3Style}>{tx.jser_h3_model}</h3>
        <pre style={codeBlockStyle}><code>{tx.jser_code_model}</code></pre>
        <h3 style={h3Style}>{tx.jser_h3_build}</h3>
        <pre style={codeBlockStyle}><code>{tx.jser_code_build}</code></pre>
        <p style={pStyle}>{tx.jser_p2}</p>
        <p style={pStyle}>{tx.jser_p3}</p>
        <ul style={ulStyle}>
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.jser_li1 }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.jser_li2 }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.jser_li3 }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.jser_li4 }} />
        </ul>
      </section>

      {/* ---- Section 5: freezed ---- */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{tx.h2_freezed}</h2>
        <p style={pStyle}>{tx.freezed_p1}</p>
        <pre style={codeBlockStyle}><code>{tx.freezed_code_pubspec}</code></pre>
        <pre style={codeBlockStyle}><code>{tx.freezed_code_model}</code></pre>
        <p style={pStyle}>{tx.freezed_p2}</p>
        <ul style={ulStyle}>
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.freezed_li1 }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.freezed_li2 }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.freezed_li3 }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: tx.freezed_li4 }} />
        </ul>
        <pre style={codeBlockStyle}><code>{tx.freezed_code_union}</code></pre>
      </section>

      {/* ---- Section 6: Manual fromJson/toJson ---- */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{tx.h2_manual}</h2>
        <p style={pStyle}>{tx.manual_p1}</p>
        <h3 style={h3Style}>{tx.manual_h3_datetime}</h3>
        <pre style={codeBlockStyle}><code>{tx.manual_code_datetime}</code></pre>
        <h3 style={h3Style}>{tx.manual_h3_map}</h3>
        <pre style={codeBlockStyle}><code>{tx.manual_code_map}</code></pre>
      </section>

      {/* ---- Section 7: Nested Objects and Lists ---- */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{tx.h2_nested}</h2>
        <p style={pStyle}>{tx.nested_p1}</p>
        <pre style={codeBlockStyle}><code>{tx.nested_code1}</code></pre>
        <p style={pStyle}>{tx.nested_p2}</p>
        <pre style={codeBlockStyle}><code>{tx.nested_code2}</code></pre>
      </section>

      {/* ---- Section 8: Enum Serialization ---- */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{tx.h2_enum}</h2>
        <p style={pStyle}>{tx.enum_p1}</p>
        <pre style={codeBlockStyle}><code>{tx.enum_code1}</code></pre>
        <p style={pStyle}>{tx.enum_p2}</p>
        <pre style={codeBlockStyle}><code>{tx.enum_code2}</code></pre>
        <p style={pStyle}>{tx.enum_p3}</p>
        <pre style={codeBlockStyle}><code>{tx.enum_code3}</code></pre>
      </section>

      {/* ---- Section 9: DateTime ---- */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{tx.h2_datetime}</h2>
        <p style={pStyle}>{tx.dt_p1}</p>
        <pre style={codeBlockStyle}><code>{tx.dt_code1}</code></pre>
      </section>

      {/* ---- Section 10: Network ---- */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{tx.h2_network}</h2>
        <p style={pStyle}>{tx.net_p1}</p>
        <h3 style={h3Style}>{tx.net_h3_http}</h3>
        <pre style={codeBlockStyle}><code>{tx.net_code_http}</code></pre>
        <h3 style={h3Style}>{tx.net_h3_dio}</h3>
        <pre style={codeBlockStyle}><code>{tx.net_code_dio}</code></pre>
      </section>

      {/* ---- Section 11: State Management ---- */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{tx.h2_state}</h2>
        <p style={pStyle}>{tx.state_p1}</p>
        <h3 style={h3Style}>{tx.state_h3_riverpod}</h3>
        <pre style={codeBlockStyle}><code>{tx.state_code_riverpod}</code></pre>
        <h3 style={h3Style}>{tx.state_h3_bloc}</h3>
        <pre style={codeBlockStyle}><code>{tx.state_code_bloc}</code></pre>
      </section>

      {/* ---- Section 12: Hive ---- */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{tx.h2_hive}</h2>
        <p style={pStyle}>{tx.hive_p1}</p>
        <pre style={codeBlockStyle}><code>{tx.hive_code1}</code></pre>
        <pre style={codeBlockStyle}><code>{tx.hive_code2}</code></pre>
      </section>

      {/* ---- Section 13: Testing ---- */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{tx.h2_testing}</h2>
        <p style={pStyle}>{tx.test_p1}</p>
        <pre style={codeBlockStyle}><code>{tx.test_code1}</code></pre>
      </section>

      {/* ---- Section 14: Common Mistakes ---- */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{tx.h2_mistakes}</h2>
        <p style={pStyle}>{tx.mistakes_p1}</p>

        <h3 style={h3Style}>{tx.mistake1_title}</h3>
        <p style={pStyle}>{tx.mistake1}</p>

        <h3 style={h3Style}>{tx.mistake2_title}</h3>
        <pre style={codeBlockStyle}><code>{tx.mistake2_bad}</code></pre>
        <pre style={codeBlockStyle}><code>{tx.mistake2_good}</code></pre>

        <h3 style={h3Style}>{tx.mistake3_title}</h3>
        <pre style={codeBlockStyle}><code>{tx.mistake3}</code></pre>

        <h3 style={h3Style}>{tx.mistake4_title}</h3>
        <pre style={codeBlockStyle}><code>{tx.mistake4_bad}</code></pre>
        <pre style={codeBlockStyle}><code>{tx.mistake4_good}</code></pre>

        <h3 style={h3Style}>{tx.mistake5_title}</h3>
        <p style={pStyle}>{tx.mistake5}</p>
      </section>

      {/* ---- Section 15: FAQ ---- */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{tx.h2_faq}</h2>

        {[
          { q: tx.faq1_q, a: tx.faq1_a },
          { q: tx.faq2_q, a: tx.faq2_a },
          { q: tx.faq3_q, a: tx.faq3_a },
          { q: tx.faq4_q, a: tx.faq4_a },
          { q: tx.faq5_q, a: tx.faq5_a },
          { q: tx.faq6_q, a: tx.faq6_a },
          { q: tx.faq7_q, a: tx.faq7_a },
          { q: tx.faq8_q, a: tx.faq8_a },
        ].map(({ q, a }, i) => (
          <div key={i} style={{
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '1.25rem',
            marginBottom: '1.25rem',
          }}>
            <h3 style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'var(--text-primary, #1a202c)',
              marginBottom: '0.5rem',
            }}>{q}</h3>
            <p style={{ ...pStyle, marginBottom: 0 }}>{a}</p>
          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <div style={{
        background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        textAlign: 'center',
        marginTop: '2rem',
      }}>
        <p style={{ margin: '0 0 1rem', fontWeight: 600, color: '#1e40af', fontSize: '1.05rem' }}>
          {tx.link_tool}
        </p>
        <Link href={toolLink} style={{
          display: 'inline-block',
          background: '#3b82f6',
          color: '#fff',
          borderRadius: '0.5rem',
          padding: '0.65rem 1.5rem',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
        }}>
          JSON to Dart →
        </Link>
      </div>

      {/* suppress unused style warning */}
      {false && <span style={inlineCodeStyle} />}
    </article>
  );
}
