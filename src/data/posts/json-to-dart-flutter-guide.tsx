const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON to Dart: Complete Flutter Model Class Guide',
    intro: 'Converting JSON to Dart model classes is one of the most common tasks in Flutter development. Whether you\'re fetching data from a REST API or reading local configuration, you need well-structured Dart classes to safely parse and use your JSON data.',
    whyTitle: 'Why You Need Model Classes',
    why1: 'Type safety — catch errors at compile time instead of runtime',
    why2: 'IDE autocompletion and refactoring support',
    why3: 'Clear data contracts between frontend and backend',
    why4: 'Easier testing and maintenance',
    basicTitle: 'Basic JSON to Dart Type Mapping',
    jsonType: 'JSON Type',
    dartType: 'Dart Type',
    example: 'Example',
    manualTitle: 'Manual Model Class (fromJson / toJson)',
    manualDesc: 'The most straightforward approach is writing model classes by hand. Here\'s a complete example:',
    nestedTitle: 'Handling Nested Objects',
    nestedDesc: 'When your JSON contains nested objects, create separate Dart classes for each level:',
    listsTitle: 'Handling Lists and Arrays',
    listsDesc: 'JSON arrays map to Dart List types. Handle both simple and complex arrays:',
    nullSafetyTitle: 'Null Safety Best Practices',
    nullSafetyDesc: 'With Dart\'s sound null safety, you need to handle nullable fields properly:',
    nullTip1: 'Use `required` keyword for fields that must always be present',
    nullTip2: 'Use `?` suffix for nullable types (e.g., `String?`)',
    nullTip3: 'Provide default values with `??` operator in fromJson',
    nullTip4: 'Use `late` keyword only when you\'re certain the value will be initialized',
    serializableTitle: 'Using json_serializable Package',
    serializableDesc: 'For larger projects, the json_serializable package automates the boilerplate:',
    step1: 'Step 1: Add Dependencies',
    step2: 'Step 2: Create Model with Annotations',
    step3: 'Step 3: Run Build Runner',
    freezedTitle: 'Using Freezed for Immutable Models',
    freezedDesc: 'The freezed package generates immutable classes with copyWith, equality, and JSON serialization:',
    mistakesTitle: 'Common Mistakes and Fixes',
    mistake: 'Mistake',
    fix: 'Fix',
    m1: 'Using `json[\'key\']` without null check',
    f1: 'Use `json[\'key\'] as String? ?? \'\'` or handle null',
    m2: 'Forgetting to convert nested objects',
    f2: 'Call `NestedClass.fromJson(json[\'key\'])` for objects',
    m3: 'Using `int` for all numbers',
    f3: 'Use `num` and convert: `(json[\'price\'] as num).toDouble()`',
    m4: 'Not handling missing keys',
    f4: 'Use `json.containsKey(\'key\')` or provide defaults',
    m5: 'Returning wrong type in toJson',
    f5: 'Ensure nested objects call their own `.toJson()`',
    faqTitle: 'FAQ',
    faq1q: 'What is the best way to convert JSON to Dart classes?',
    faq1a: 'For small projects, manual conversion works well. For larger projects, use json_serializable or freezed packages to auto-generate the boilerplate code. Online tools like our JSON to Dart Converter can help generate the initial code.',
    faq2q: 'How do I handle dynamic JSON keys in Dart?',
    faq2a: 'Use Map<String, dynamic> for objects with unknown keys. For example: final Map<String, dynamic> metadata = json[\'metadata\'] as Map<String, dynamic>;',
    faq3q: 'Should I use json_serializable or freezed?',
    faq3a: 'Use json_serializable for simple JSON serialization needs. Use freezed when you also want immutability, copyWith, union types, and sealed classes. Freezed internally uses json_serializable for JSON support.',
    faq4q: 'How do I handle dates in JSON to Dart conversion?',
    faq4a: 'JSON doesn\'t have a native date type. Parse ISO 8601 strings with DateTime.parse(json[\'date\']). In toJson, use dateTime.toIso8601String(). With json_serializable, use @JsonKey(fromJson: DateTime.parse, toJson: _dateToString).',
  },
  zh: {
    title: 'JSON 转 Dart：Flutter 模型类完全指南',
    intro: '将 JSON 转换为 Dart 模型类是 Flutter 开发中最常见的任务之一。无论是从 REST API 获取数据还是读取本地配置，你都需要结构良好的 Dart 类来安全地解析和使用 JSON 数据。',
    whyTitle: '为什么需要模型类',
    why1: '类型安全 — 在编译时而非运行时捕获错误',
    why2: 'IDE 自动补全和重构支持',
    why3: '前后端之间清晰的数据契约',
    why4: '更容易测试和维护',
    basicTitle: '基本 JSON 到 Dart 类型映射',
    jsonType: 'JSON 类型',
    dartType: 'Dart 类型',
    example: '示例',
    manualTitle: '手动模型类（fromJson / toJson）',
    manualDesc: '最直接的方法是手写模型类。以下是完整示例：',
    nestedTitle: '处理嵌套对象',
    nestedDesc: '当 JSON 包含嵌套对象时，为每一层创建单独的 Dart 类：',
    listsTitle: '处理列表和数组',
    listsDesc: 'JSON 数组映射为 Dart 的 List 类型。处理简单和复杂数组：',
    nullSafetyTitle: '空安全最佳实践',
    nullSafetyDesc: '使用 Dart 的健全空安全，你需要正确处理可空字段：',
    nullTip1: '对必须存在的字段使用 `required` 关键字',
    nullTip2: '对可空类型使用 `?` 后缀（如 `String?`）',
    nullTip3: '在 fromJson 中使用 `??` 运算符提供默认值',
    nullTip4: '仅在确定值会被初始化时使用 `late` 关键字',
    serializableTitle: '使用 json_serializable 包',
    serializableDesc: '对于大型项目，json_serializable 包可以自动化模板代码：',
    step1: '步骤 1：添加依赖',
    step2: '步骤 2：创建带注解的模型',
    step3: '步骤 3：运行 Build Runner',
    freezedTitle: '使用 Freezed 创建不可变模型',
    freezedDesc: 'freezed 包生成带有 copyWith、相等性和 JSON 序列化的不可变类：',
    mistakesTitle: '常见错误与修复',
    mistake: '错误',
    fix: '修复',
    m1: '使用 `json[\'key\']` 但不检查 null',
    f1: '使用 `json[\'key\'] as String? ?? \'\'` 或处理 null',
    m2: '忘记转换嵌套对象',
    f2: '对对象调用 `NestedClass.fromJson(json[\'key\'])`',
    m3: '所有数字都使用 `int`',
    f3: '使用 `num` 并转换：`(json[\'price\'] as num).toDouble()`',
    m4: '不处理缺失的键',
    f4: '使用 `json.containsKey(\'key\')` 或提供默认值',
    m5: 'toJson 返回错误类型',
    f5: '确保嵌套对象调用自己的 `.toJson()`',
    faqTitle: '常见问题',
    faq1q: '将 JSON 转换为 Dart 类的最佳方法是什么？',
    faq1a: '小项目手动转换即可。大型项目使用 json_serializable 或 freezed 包自动生成模板代码。在线工具如我们的 JSON to Dart 转换器可以帮助生成初始代码。',
    faq2q: '如何处理 Dart 中的动态 JSON 键？',
    faq2a: '对未知键的对象使用 Map<String, dynamic>。例如：final Map<String, dynamic> metadata = json[\'metadata\'] as Map<String, dynamic>;',
    faq3q: '应该使用 json_serializable 还是 freezed？',
    faq3a: '简单 JSON 序列化用 json_serializable。如果还需要不可变性、copyWith、联合类型和密封类，用 freezed。Freezed 内部使用 json_serializable 进行 JSON 支持。',
    faq4q: '如何处理 JSON 到 Dart 转换中的日期？',
    faq4a: 'JSON 没有原生日期类型。用 DateTime.parse(json[\'date\']) 解析 ISO 8601 字符串。在 toJson 中使用 dateTime.toIso8601String()。',
  },
  ja: {
    title: 'JSON to Dart: Flutter モデルクラス完全ガイド',
    intro: 'JSONをDartモデルクラスに変換することは、Flutter開発で最も一般的なタスクの一つです。REST APIからデータを取得する場合でも、ローカル設定を読み取る場合でも、JSONデータを安全に解析して使用するためには、適切に構造化されたDartクラスが必要です。',
    whyTitle: 'モデルクラスが必要な理由',
    why1: '型安全性 — ランタイムではなくコンパイル時にエラーをキャッチ',
    why2: 'IDEの自動補完とリファクタリングサポート',
    why3: 'フロントエンドとバックエンド間の明確なデータ契約',
    why4: 'テストとメンテナンスが容易に',
    basicTitle: '基本的なJSONからDartへの型マッピング',
    jsonType: 'JSON型',
    dartType: 'Dart型',
    example: '例',
    manualTitle: '手動モデルクラス（fromJson / toJson）',
    manualDesc: '最も簡単なアプローチは、モデルクラスを手動で書くことです。完全な例：',
    nestedTitle: 'ネストされたオブジェクトの処理',
    nestedDesc: 'JSONにネストされたオブジェクトが含まれる場合、各レベルに個別のDartクラスを作成します：',
    listsTitle: 'リストと配列の処理',
    listsDesc: 'JSON配列はDartのList型にマッピングされます：',
    nullSafetyTitle: 'Null Safetyのベストプラクティス',
    nullSafetyDesc: 'Dartのサウンドnull safetyでは、nullable フィールドを適切に処理する必要があります：',
    nullTip1: '必ず存在するフィールドには `required` キーワードを使用',
    nullTip2: 'nullable型には `?` サフィックスを使用（例: `String?`）',
    nullTip3: 'fromJsonで `??` 演算子でデフォルト値を提供',
    nullTip4: '値が初期化されることが確実な場合のみ `late` を使用',
    serializableTitle: 'json_serializableパッケージの使用',
    serializableDesc: '大規模プロジェクトでは、json_serializableパッケージがボイラープレートを自動化します：',
    step1: 'ステップ1: 依存関係を追加',
    step2: 'ステップ2: アノテーション付きモデルを作成',
    step3: 'ステップ3: Build Runnerを実行',
    freezedTitle: 'Freezedで不変モデルを作成',
    freezedDesc: 'freezedパッケージはcopyWith、等価性、JSON シリアライゼーション付きの不変クラスを生成します：',
    mistakesTitle: 'よくある間違いと修正方法',
    mistake: '間違い',
    fix: '修正',
    m1: 'nullチェックなしで `json[\'key\']` を使用',
    f1: '`json[\'key\'] as String? ?? \'\'` を使用するかnullを処理',
    m2: 'ネストされたオブジェクトの変換を忘れる',
    f2: 'オブジェクトには `NestedClass.fromJson(json[\'key\'])` を呼ぶ',
    m3: 'すべての数値に `int` を使用',
    f3: '`num` を使い変換: `(json[\'price\'] as num).toDouble()`',
    m4: '欠けているキーを処理しない',
    f4: '`json.containsKey(\'key\')` を使うかデフォルト値を提供',
    m5: 'toJsonで誤った型を返す',
    f5: 'ネストされたオブジェクトが自身の `.toJson()` を呼ぶことを確認',
    faqTitle: 'よくある質問',
    faq1q: 'JSONをDartクラスに変換する最良の方法は？',
    faq1a: '小規模プロジェクトでは手動変換が有効です。大規模プロジェクトではjson_serializableまたはfreezedパッケージでボイラープレートコードを自動生成します。',
    faq2q: 'Dartで動的なJSONキーをどう処理しますか？',
    faq2a: '未知のキーを持つオブジェクトにはMap<String, dynamic>を使用します。',
    faq3q: 'json_serializableとfreezedのどちらを使うべき？',
    faq3a: 'シンプルなJSONシリアライゼーションにはjson_serializable。不変性、copyWith、union型も必要ならfreezedを使います。',
    faq4q: 'JSON to Dart変換で日付をどう処理しますか？',
    faq4a: 'DateTime.parse(json[\'date\'])でISO 8601文字列を解析します。toJsonではdateTime.toIso8601String()を使います。',
  },
  ko: {
    title: 'JSON to Dart: Flutter 모델 클래스 완전 가이드',
    intro: 'JSON을 Dart 모델 클래스로 변환하는 것은 Flutter 개발에서 가장 일반적인 작업 중 하나입니다. REST API에서 데이터를 가져오든 로컬 설정을 읽든, JSON 데이터를 안전하게 파싱하고 사용하려면 잘 구조화된 Dart 클래스가 필요합니다.',
    whyTitle: '모델 클래스가 필요한 이유',
    why1: '타입 안전성 — 런타임이 아닌 컴파일 타임에 오류 포착',
    why2: 'IDE 자동완성 및 리팩토링 지원',
    why3: '프론트엔드와 백엔드 간의 명확한 데이터 계약',
    why4: '쉬운 테스트 및 유지보수',
    basicTitle: '기본 JSON-Dart 타입 매핑',
    jsonType: 'JSON 타입',
    dartType: 'Dart 타입',
    example: '예시',
    manualTitle: '수동 모델 클래스 (fromJson / toJson)',
    manualDesc: '가장 직접적인 방법은 모델 클래스를 수동으로 작성하는 것입니다:',
    nestedTitle: '중첩 객체 처리',
    nestedDesc: 'JSON에 중첩 객체가 포함된 경우 각 레벨에 별도의 Dart 클래스를 만듭니다:',
    listsTitle: '리스트와 배열 처리',
    listsDesc: 'JSON 배열은 Dart List 타입에 매핑됩니다:',
    nullSafetyTitle: 'Null Safety 모범 사례',
    nullSafetyDesc: 'Dart의 sound null safety에서는 nullable 필드를 올바르게 처리해야 합니다:',
    nullTip1: '항상 존재해야 하는 필드에는 `required` 키워드 사용',
    nullTip2: 'nullable 타입에는 `?` 접미사 사용 (예: `String?`)',
    nullTip3: 'fromJson에서 `??` 연산자로 기본값 제공',
    nullTip4: '값이 초기화될 것이 확실한 경우에만 `late` 키워드 사용',
    serializableTitle: 'json_serializable 패키지 사용',
    serializableDesc: '대규모 프로젝트에서는 json_serializable 패키지가 보일러플레이트를 자동화합니다:',
    step1: '단계 1: 의존성 추가',
    step2: '단계 2: 어노테이션이 있는 모델 생성',
    step3: '단계 3: Build Runner 실행',
    freezedTitle: 'Freezed로 불변 모델 만들기',
    freezedDesc: 'freezed 패키지는 copyWith, 동등성, JSON 직렬화가 포함된 불변 클래스를 생성합니다:',
    mistakesTitle: '일반적인 실수와 해결법',
    mistake: '실수',
    fix: '해결법',
    m1: 'null 체크 없이 `json[\'key\']` 사용',
    f1: '`json[\'key\'] as String? ?? \'\'` 사용 또는 null 처리',
    m2: '중첩 객체 변환을 잊음',
    f2: '객체에는 `NestedClass.fromJson(json[\'key\'])` 호출',
    m3: '모든 숫자에 `int` 사용',
    f3: '`num` 사용 후 변환: `(json[\'price\'] as num).toDouble()`',
    m4: '누락된 키를 처리하지 않음',
    f4: '`json.containsKey(\'key\')` 사용 또는 기본값 제공',
    m5: 'toJson에서 잘못된 타입 반환',
    f5: '중첩 객체가 자체 `.toJson()` 호출을 확인',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JSON을 Dart 클래스로 변환하는 가장 좋은 방법은?',
    faq1a: '소규모 프로젝트에서는 수동 변환이 효과적입니다. 대규모 프로젝트에서는 json_serializable 또는 freezed 패키지로 보일러플레이트 코드를 자동 생성합니다.',
    faq2q: 'Dart에서 동적 JSON 키를 어떻게 처리하나요?',
    faq2a: '알 수 없는 키가 있는 객체에는 Map<String, dynamic>을 사용합니다.',
    faq3q: 'json_serializable과 freezed 중 어떤 것을 사용해야 하나요?',
    faq3a: '간단한 JSON 직렬화에는 json_serializable. 불변성, copyWith, union 타입도 필요하면 freezed를 사용합니다.',
    faq4q: 'JSON-Dart 변환에서 날짜를 어떻게 처리하나요?',
    faq4a: 'DateTime.parse(json[\'date\'])로 ISO 8601 문자열을 파싱합니다. toJson에서는 dateTime.toIso8601String()을 사용합니다.',
  },
  fr: {
    title: 'JSON vers Dart : Guide complet des classes modèles Flutter',
    intro: 'La conversion de JSON en classes Dart est l\'une des tâches les plus courantes en développement Flutter. Que vous récupériez des données depuis une API REST ou lisiez une configuration locale, vous avez besoin de classes Dart bien structurées.',
    whyTitle: 'Pourquoi les classes modèles',
    basicTitle: 'Correspondance des types JSON vers Dart',
    jsonType: 'Type JSON', dartType: 'Type Dart', example: 'Exemple',
    manualTitle: 'Classe modèle manuelle (fromJson / toJson)',
    manualDesc: 'L\'approche la plus directe est d\'écrire les classes à la main :',
    nestedTitle: 'Gestion des objets imbriqués',
    nestedDesc: 'Créez des classes Dart séparées pour chaque niveau d\'imbrication :',
    listsTitle: 'Gestion des listes',
    listsDesc: 'Les tableaux JSON correspondent au type List de Dart :',
    nullSafetyTitle: 'Bonnes pratiques Null Safety',
    nullSafetyDesc: 'Avec le null safety de Dart, gérez correctement les champs nullable :',
    nullTip1: 'Utilisez `required` pour les champs obligatoires',
    nullTip2: 'Utilisez le suffixe `?` pour les types nullable',
    nullTip3: 'Fournissez des valeurs par défaut avec `??`',
    nullTip4: 'Utilisez `late` uniquement quand la valeur sera initialisée',
    serializableTitle: 'Utiliser json_serializable',
    serializableDesc: 'Pour les grands projets, json_serializable automatise le code répétitif :',
    step1: 'Étape 1 : Ajouter les dépendances',
    step2: 'Étape 2 : Créer le modèle avec annotations',
    step3: 'Étape 3 : Exécuter Build Runner',
    freezedTitle: 'Utiliser Freezed pour les modèles immuables',
    freezedDesc: 'Le package freezed génère des classes immuables avec copyWith et sérialisation JSON :',
    mistakesTitle: 'Erreurs courantes et solutions',
    mistake: 'Erreur', fix: 'Solution',
    m1: 'Utiliser `json[\'key\']` sans vérification null', f1: 'Utiliser `json[\'key\'] as String? ?? \'\'`',
    m2: 'Oublier de convertir les objets imbriqués', f2: 'Appeler `NestedClass.fromJson(json[\'key\'])`',
    m3: 'Utiliser `int` pour tous les nombres', f3: 'Utiliser `num` et convertir',
    m4: 'Ne pas gérer les clés manquantes', f4: 'Utiliser `json.containsKey(\'key\')`',
    m5: 'Retourner le mauvais type dans toJson', f5: 'S\'assurer que les objets imbriqués appellent `.toJson()`',
    faqTitle: 'FAQ',
    faq1q: 'Quelle est la meilleure façon de convertir JSON en classes Dart ?',
    faq1a: 'Pour les petits projets, la conversion manuelle suffit. Pour les grands projets, utilisez json_serializable ou freezed.',
    faq2q: 'Comment gérer les clés JSON dynamiques en Dart ?', faq2a: 'Utilisez Map<String, dynamic>.',
    faq3q: 'json_serializable ou freezed ?', faq3a: 'json_serializable pour la sérialisation simple, freezed pour l\'immuabilité et copyWith.',
    faq4q: 'Comment gérer les dates ?', faq4a: 'Utilisez DateTime.parse() pour les chaînes ISO 8601.',
  },
  de: {
    title: 'JSON zu Dart: Vollständiger Flutter Model-Klassen Guide',
    intro: 'Die Konvertierung von JSON in Dart Model-Klassen ist eine der häufigsten Aufgaben in der Flutter-Entwicklung.',
    whyTitle: 'Warum Model-Klassen',
    basicTitle: 'Grundlegende JSON-zu-Dart-Typzuordnung',
    jsonType: 'JSON-Typ', dartType: 'Dart-Typ', example: 'Beispiel',
    manualTitle: 'Manuelle Model-Klasse (fromJson / toJson)',
    manualDesc: 'Der einfachste Ansatz ist, Model-Klassen von Hand zu schreiben:',
    nestedTitle: 'Verschachtelte Objekte behandeln',
    nestedDesc: 'Erstellen Sie separate Dart-Klassen für jede Verschachtelungsebene:',
    listsTitle: 'Listen und Arrays behandeln', listsDesc: 'JSON-Arrays werden zu Dart-List-Typen:',
    nullSafetyTitle: 'Null Safety Best Practices', nullSafetyDesc: 'Mit Darts Null Safety müssen nullable Felder korrekt behandelt werden:',
    nullTip1: 'Verwenden Sie `required` für Pflichtfelder', nullTip2: 'Verwenden Sie `?` für nullable Typen',
    nullTip3: 'Standardwerte mit `??` bereitstellen', nullTip4: '`late` nur verwenden wenn Initialisierung sicher ist',
    serializableTitle: 'json_serializable verwenden', serializableDesc: 'Für größere Projekte automatisiert json_serializable den Boilerplate-Code:',
    step1: 'Schritt 1: Dependencies hinzufügen', step2: 'Schritt 2: Model mit Annotationen erstellen', step3: 'Schritt 3: Build Runner ausführen',
    freezedTitle: 'Freezed für unveränderliche Models', freezedDesc: 'Das freezed-Paket generiert unveränderliche Klassen mit copyWith und JSON-Serialisierung:',
    mistakesTitle: 'Häufige Fehler und Lösungen', mistake: 'Fehler', fix: 'Lösung',
    m1: '`json[\'key\']` ohne Null-Check', f1: '`json[\'key\'] as String? ?? \'\'` verwenden',
    m2: 'Verschachtelte Objekte vergessen', f2: '`NestedClass.fromJson()` aufrufen',
    m3: '`int` für alle Zahlen', f3: '`num` verwenden und konvertieren',
    m4: 'Fehlende Schlüssel nicht behandeln', f4: '`containsKey()` oder Standardwerte verwenden',
    m5: 'Falscher Typ in toJson', f5: 'Verschachtelte Objekte rufen `.toJson()` auf',
    faqTitle: 'FAQ',
    faq1q: 'Was ist der beste Weg JSON in Dart-Klassen umzuwandeln?', faq1a: 'Kleine Projekte: manuell. Große Projekte: json_serializable oder freezed.',
    faq2q: 'Wie behandle ich dynamische JSON-Schlüssel?', faq2a: 'Verwenden Sie Map<String, dynamic>.',
    faq3q: 'json_serializable oder freezed?', faq3a: 'json_serializable für einfache Serialisierung, freezed für Unveränderlichkeit.',
    faq4q: 'Wie behandle ich Datumsangaben?', faq4a: 'DateTime.parse() für ISO 8601-Strings verwenden.',
  },
  es: {
    title: 'JSON a Dart: Guía completa de clases modelo Flutter',
    intro: 'Convertir JSON a clases modelo Dart es una de las tareas más comunes en el desarrollo Flutter.',
    whyTitle: 'Por qué necesitas clases modelo',
    basicTitle: 'Mapeo básico de tipos JSON a Dart',
    jsonType: 'Tipo JSON', dartType: 'Tipo Dart', example: 'Ejemplo',
    manualTitle: 'Clase modelo manual (fromJson / toJson)',
    manualDesc: 'El enfoque más directo es escribir las clases a mano:',
    nestedTitle: 'Manejo de objetos anidados', nestedDesc: 'Crea clases Dart separadas para cada nivel:',
    listsTitle: 'Manejo de listas y arrays', listsDesc: 'Los arrays JSON se mapean a tipos List de Dart:',
    nullSafetyTitle: 'Mejores prácticas de Null Safety', nullSafetyDesc: 'Con el null safety de Dart, maneja correctamente los campos nullable:',
    nullTip1: 'Usa `required` para campos obligatorios', nullTip2: 'Usa `?` para tipos nullable',
    nullTip3: 'Proporciona valores por defecto con `??`', nullTip4: 'Usa `late` solo cuando la inicialización es segura',
    serializableTitle: 'Usando json_serializable', serializableDesc: 'Para proyectos grandes, json_serializable automatiza el código repetitivo:',
    step1: 'Paso 1: Agregar dependencias', step2: 'Paso 2: Crear modelo con anotaciones', step3: 'Paso 3: Ejecutar Build Runner',
    freezedTitle: 'Usando Freezed para modelos inmutables', freezedDesc: 'El paquete freezed genera clases inmutables con copyWith y serialización JSON:',
    mistakesTitle: 'Errores comunes y soluciones', mistake: 'Error', fix: 'Solución',
    m1: 'Usar `json[\'key\']` sin verificar null', f1: 'Usar `json[\'key\'] as String? ?? \'\'`',
    m2: 'Olvidar convertir objetos anidados', f2: 'Llamar `NestedClass.fromJson()`',
    m3: 'Usar `int` para todos los números', f3: 'Usar `num` y convertir',
    m4: 'No manejar claves faltantes', f4: 'Usar `containsKey()` o valores por defecto',
    m5: 'Retornar tipo incorrecto en toJson', f5: 'Asegurar que objetos anidados llamen `.toJson()`',
    faqTitle: 'FAQ',
    faq1q: '¿Cuál es la mejor forma de convertir JSON a clases Dart?', faq1a: 'Proyectos pequeños: conversión manual. Proyectos grandes: json_serializable o freezed.',
    faq2q: '¿Cómo manejo claves JSON dinámicas?', faq2a: 'Usa Map<String, dynamic>.',
    faq3q: '¿json_serializable o freezed?', faq3a: 'json_serializable para serialización simple, freezed para inmutabilidad.',
    faq4q: '¿Cómo manejo las fechas?', faq4a: 'Usa DateTime.parse() para strings ISO 8601.',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };

export default function JsonToDartFlutterGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{t.intro}</p>

      <h2 style={h2Style}>{t.whyTitle}</h2>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 24 }}>
        <li>{t.why1}</li><li>{t.why2}</li><li>{t.why3}</li><li>{t.why4}</li>
      </ul>

      <h2 style={h2Style}>{t.basicTitle}</h2>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>{t.jsonType}</th><th style={thStyle}>{t.dartType}</th><th style={thStyle}>{t.example}</th></tr></thead>
        <tbody>
          <tr><td style={tdStyle}>string</td><td style={tdStyle}>String</td><td style={tdStyle}>{`"hello" → "hello"`}</td></tr>
          <tr><td style={tdStyle}>number (int)</td><td style={tdStyle}>int</td><td style={tdStyle}>{`42 → 42`}</td></tr>
          <tr><td style={tdStyle}>number (float)</td><td style={tdStyle}>double</td><td style={tdStyle}>{`3.14 → 3.14`}</td></tr>
          <tr><td style={tdStyle}>boolean</td><td style={tdStyle}>bool</td><td style={tdStyle}>{`true → true`}</td></tr>
          <tr><td style={tdStyle}>null</td><td style={tdStyle}>Null / dynamic</td><td style={tdStyle}>{`null → null`}</td></tr>
          <tr><td style={tdStyle}>array</td><td style={{...tdStyle, fontFamily: 'monospace'}}>{`List<T>`}</td><td style={tdStyle}>{`[1,2,3] → [1,2,3]`}</td></tr>
          <tr><td style={tdStyle}>object</td><td style={{...tdStyle, fontFamily: 'monospace'}}>{`Map / Class`}</td><td style={tdStyle}>{`{} → User()`}</td></tr>
        </tbody>
      </table>

      <h2 style={h2Style}>{t.manualTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.manualDesc}</p>
      <pre style={codeStyle}><code>{`// JSON input
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "isActive": true,
  "score": 95.5
}

// Dart model class
class User {
  final int id;
  final String name;
  final String email;
  final bool isActive;
  final double score;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.isActive,
    required this.score,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as int,
      name: json['name'] as String,
      email: json['email'] as String,
      isActive: json['isActive'] as bool,
      score: (json['score'] as num).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'isActive': isActive,
      'score': score,
    };
  }
}`}</code></pre>

      <h2 style={h2Style}>{t.nestedTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.nestedDesc}</p>
      <pre style={codeStyle}><code>{`// JSON with nested object
{
  "id": 1,
  "name": "John",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "zipCode": "62701"
  }
}

// Dart classes
class Address {
  final String street;
  final String city;
  final String zipCode;

  Address({required this.street, required this.city, required this.zipCode});

  factory Address.fromJson(Map<String, dynamic> json) {
    return Address(
      street: json['street'] as String,
      city: json['city'] as String,
      zipCode: json['zipCode'] as String,
    );
  }

  Map<String, dynamic> toJson() => {
    'street': street, 'city': city, 'zipCode': zipCode,
  };
}

class User {
  final int id;
  final String name;
  final Address address;

  User({required this.id, required this.name, required this.address});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as int,
      name: json['name'] as String,
      address: Address.fromJson(json['address'] as Map<String, dynamic>),
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id, 'name': name, 'address': address.toJson(),
  };
}`}</code></pre>

      <h2 style={h2Style}>{t.listsTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.listsDesc}</p>
      <pre style={codeStyle}><code>{`// JSON with arrays
{
  "name": "John",
  "hobbies": ["coding", "reading", "gaming"],
  "orders": [
    {"id": 1, "product": "Laptop", "price": 999.99},
    {"id": 2, "product": "Mouse", "price": 29.99}
  ]
}

// Dart
class User {
  final String name;
  final List<String> hobbies;
  final List<Order> orders;

  User({required this.name, required this.hobbies, required this.orders});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'] as String,
      hobbies: List<String>.from(json['hobbies'] as List),
      orders: (json['orders'] as List)
          .map((e) => Order.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }
}`}</code></pre>

      <h2 style={h2Style}>{t.nullSafetyTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.nullSafetyDesc}</p>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 24 }}>
        <li>{t.nullTip1}</li><li>{t.nullTip2}</li><li>{t.nullTip3}</li><li>{t.nullTip4}</li>
      </ul>
      <pre style={codeStyle}><code>{`class User {
  final int id;
  final String name;
  final String? bio;        // nullable
  final String avatarUrl;   // with default

  User({
    required this.id,
    required this.name,
    this.bio,
    this.avatarUrl = 'https://example.com/default-avatar.png',
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as int,
      name: json['name'] as String,
      bio: json['bio'] as String?,
      avatarUrl: json['avatarUrl'] as String? ?? 'https://example.com/default-avatar.png',
    );
  }
}`}</code></pre>

      <h2 style={h2Style}>{t.serializableTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.serializableDesc}</p>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 20, color: 'var(--text-primary)' }}>{t.step1}</h3>
      <pre style={codeStyle}><code>{`# pubspec.yaml
dependencies:
  json_annotation: ^4.8.1

dev_dependencies:
  json_serializable: ^6.7.1
  build_runner: ^2.4.6`}</code></pre>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 20, color: 'var(--text-primary)' }}>{t.step2}</h3>
      <pre style={codeStyle}><code>{`import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';

@JsonSerializable()
class User {
  final int id;
  final String name;
  final String email;

  @JsonKey(name: 'is_active')
  final bool isActive;

  @JsonKey(defaultValue: 0.0)
  final double score;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.isActive,
    required this.score,
  });

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}`}</code></pre>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 20, color: 'var(--text-primary)' }}>{t.step3}</h3>
      <pre style={codeStyle}><code>{`dart run build_runner build --delete-conflicting-outputs`}</code></pre>

      <h2 style={h2Style}>{t.freezedTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.freezedDesc}</p>
      <pre style={codeStyle}><code>{`import 'package:freezed_annotation/freezed_annotation.dart';

part 'user.freezed.dart';
part 'user.g.dart';

@freezed
class User with _$User {
  const factory User({
    required int id,
    required String name,
    required String email,
    @Default(false) bool isActive,
  }) = _User;

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
}`}</code></pre>

      <h2 style={h2Style}>{t.mistakesTitle}</h2>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>{t.mistake}</th><th style={thStyle}>{t.fix}</th></tr></thead>
        <tbody>
          <tr><td style={tdStyle}>{t.m1}</td><td style={tdStyle}>{t.f1}</td></tr>
          <tr><td style={tdStyle}>{t.m2}</td><td style={tdStyle}>{t.f2}</td></tr>
          <tr><td style={tdStyle}>{t.m3}</td><td style={tdStyle}>{t.f3}</td></tr>
          <tr><td style={tdStyle}>{t.m4}</td><td style={tdStyle}>{t.f4}</td></tr>
          <tr><td style={tdStyle}>{t.m5}</td><td style={tdStyle}>{t.f5}</td></tr>
        </tbody>
      </table>

      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        { q: t.faq1q, a: t.faq1a },
        { q: t.faq2q, a: t.faq2a },
        { q: t.faq3q, a: t.faq3a },
        { q: t.faq4q, a: t.faq4a },
      ].map((faq, i) => (
        <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>{faq.q}</summary>
          <p style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
