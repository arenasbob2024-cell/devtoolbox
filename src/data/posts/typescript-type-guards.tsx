const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'TypeScript Type Guards: Complete Guide to Runtime Type Checking',
    intro: 'TypeScript provides a powerful type system, but types are erased at runtime. Type guards bridge this gap by allowing you to narrow types at runtime while keeping full type safety at compile time. This comprehensive guide covers every type guard technique, from basic typeof checks to advanced discriminated unions and assertion functions, with practical examples you can use in production code.',
    whatTitle: 'What Are Type Guards?',
    whatDesc: 'A type guard is a runtime check that narrows the type of a variable within a conditional block. TypeScript understands these checks and refines the type automatically, giving you precise autocompletion and type checking inside the guarded block.',
    typeofTitle: 'typeof Type Guards',
    typeofDesc: 'The typeof operator is the simplest type guard. It checks the JavaScript runtime type and TypeScript narrows the type accordingly. typeof works for primitive types: string, number, bigint, boolean, symbol, undefined, object, and function.',
    instanceofTitle: 'instanceof Type Guards',
    instanceofDesc: 'The instanceof operator checks whether an object is an instance of a class. TypeScript narrows the type to the class within the truthy branch. This is particularly useful for error handling and working with class hierarchies.',
    inTitle: 'The "in" Operator Type Guard',
    inDesc: 'The in operator checks whether a property exists on an object. TypeScript narrows the type based on which properties are present. This is especially useful for discriminating between object types that share some but not all properties.',
    customTitle: 'Custom Type Guard Functions',
    customDesc: 'Custom type guards are functions that return a type predicate (paramName is Type). They let you encapsulate complex type-checking logic in reusable functions. The compiler trusts your assertion, so ensure the check is correct.',
    discriminatedTitle: 'Discriminated Unions',
    discriminatedDesc: 'Discriminated unions (also called tagged unions) use a common literal property to distinguish between union members. TypeScript narrows the type when you check the discriminant property. This is one of the most powerful and type-safe patterns in TypeScript.',
    assertionTitle: 'Assertion Functions',
    assertionDesc: 'Assertion functions narrow types by throwing an error if the assertion fails. Unlike type predicates that return a boolean, assertion functions use asserts paramName is Type to indicate they throw rather than return false. This pattern is ideal for validation at the boundaries of your application.',
    narrowingTitle: 'Type Narrowing with Control Flow',
    narrowingDesc: 'TypeScript performs control flow analysis to narrow types based on assignments, equality checks, and truthiness. Understanding how TypeScript narrows types helps you write cleaner code without explicit type guards.',
    truthyTitle: 'Truthiness Narrowing',
    truthyDesc: 'TypeScript narrows types based on truthiness checks, filtering out null, undefined, 0, empty strings, and false.',
    equalityTitle: 'Equality Narrowing',
    equalityDesc: 'TypeScript narrows types when you compare values with ===, !==, ==, or != operators.',
    advancedTitle: 'Advanced Type Guard Patterns',
    exhaustiveTitle: 'Exhaustive Checks with never',
    exhaustiveDesc: 'Use the never type to ensure all union cases are handled. If you add a new case to the union, TypeScript will error at the exhaustive check location, forcing you to handle it.',
    genericTitle: 'Generic Type Guards',
    genericDesc: 'You can create generic type guards that work with any type, making your type-checking utilities reusable across your codebase.',
    arrayTitle: 'Array Type Guards',
    arrayDesc: 'TypeScript provides special narrowing for arrays. Use Array.isArray() and type-safe filter patterns to work with arrays of union types.',
    realWorldTitle: 'Real-World Examples',
    apiTitle: 'API Response Handling',
    apiDesc: 'Type guards are essential for validating API responses at runtime, ensuring type safety when dealing with external data.',
    eventTitle: 'Event Handling',
    eventDesc: 'Use type guards to narrow DOM event types for type-safe event handling.',
    errorTitle: 'Error Handling',
    errorDesc: 'Type guards help you handle different error types with proper type safety.',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Prefer discriminated unions over type predicates when possible — they are inherently type-safe.',
    bp2: 'Keep type guard functions simple and focused on a single type check.',
    bp3: 'Use assertion functions for validation at application boundaries (API handlers, form submissions).',
    bp4: 'Always handle the else case or use exhaustive checking with never.',
    bp5: 'Use Array.isArray() before accessing array methods on union types.',
    bp6: 'Combine multiple type guards with logical operators for complex narrowing.',
    bp7: 'Test your custom type guards thoroughly — TypeScript trusts your predicate.',
    conclusionTitle: 'Conclusion',
    conclusionText: 'TypeScript type guards are essential tools for bridging the gap between compile-time type safety and runtime behavior. Start with simple typeof and instanceof guards for primitive and class types, use the in operator and discriminated unions for object types, and create custom type guard functions for complex validation logic. Assertion functions are powerful for input validation at application boundaries. By mastering these patterns, you can write TypeScript code that is both type-safe at compile time and robust at runtime, eliminating entire categories of bugs from your applications.',
    faqTitle: 'FAQ',
    faq1q: 'What is the difference between a type predicate and an assertion function?',
    faq1a: 'A type predicate (param is Type) returns a boolean and narrows the type in the truthy branch. An assertion function (asserts param is Type) narrows the type after the function call by throwing an error if the assertion fails, rather than returning false.',
    faq2q: 'When should I use discriminated unions vs custom type guards?',
    faq2a: 'Use discriminated unions when you control the types and can add a discriminant property. They are inherently type-safe because TypeScript checks them structurally. Use custom type guards when working with external data or types you do not control.',
    faq3q: 'Can type guards cause runtime errors?',
    faq3a: 'Custom type guard functions can be incorrect if the predicate logic does not match the declared type. TypeScript trusts your assertion, so if your check is wrong, you can get runtime errors. Always test type guards thoroughly.',
    faq4q: 'How do I narrow types in arrays?',
    faq4a: 'Use Array.isArray() to narrow to an array type. Use .filter() with a type predicate to narrow array element types. For example: arr.filter((x): x is string => typeof x === "string") returns a string[] from a mixed array.',
  },
  zh: {
    title: 'TypeScript 类型守卫：运行时类型检查完整指南',
    intro: 'TypeScript 提供了强大的类型系统，但类型在运行时会被擦除。类型守卫通过在运行时缩窄类型来弥补这一差距。本指南涵盖了从基本的 typeof 检查到高级判别联合和断言函数的所有类型守卫技术。',
    whatTitle: '什么是类型守卫？',
    whatDesc: '类型守卫是一种运行时检查，可以在条件块中缩窄变量的类型。TypeScript 理解这些检查并自动细化类型。',
    typeofTitle: 'typeof 类型守卫',
    typeofDesc: 'typeof 运算符是最简单的类型守卫。它检查 JavaScript 运行时类型，TypeScript 会相应地缩窄类型。',
    instanceofTitle: 'instanceof 类型守卫',
    instanceofDesc: 'instanceof 运算符检查对象是否是某个类的实例。这对于错误处理和类层次结构特别有用。',
    inTitle: '"in" 运算符类型守卫',
    inDesc: 'in 运算符检查属性是否存在于对象上。这对于区分共享部分属性的对象类型特别有用。',
    customTitle: '自定义类型守卫函数',
    customDesc: '自定义类型守卫是返回类型谓词的函数，让你将复杂的类型检查逻辑封装在可重用函数中。',
    discriminatedTitle: '判别联合',
    discriminatedDesc: '判别联合使用共同的字面量属性来区分联合成员。这是 TypeScript 中最强大和类型安全的模式之一。',
    assertionTitle: '断言函数',
    assertionDesc: '断言函数通过在断言失败时抛出错误来缩窄类型。这种模式非常适合应用程序边界的验证。',
    narrowingTitle: '控制流类型缩窄',
    narrowingDesc: 'TypeScript 执行控制流分析，根据赋值、相等性检查和真值性来缩窄类型。',
    truthyTitle: '真值缩窄', truthyDesc: 'TypeScript 根据真值检查缩窄类型，过滤掉 null、undefined、0、空字符串和 false。',
    equalityTitle: '相等性缩窄', equalityDesc: 'TypeScript 在使用 ===、!==、== 或 != 比较值时缩窄类型。',
    advancedTitle: '高级类型守卫模式',
    exhaustiveTitle: '使用 never 的穷举检查', exhaustiveDesc: '使用 never 类型确保处理了所有联合情况。',
    genericTitle: '泛型类型守卫', genericDesc: '可以创建适用于任何类型的泛型类型守卫。',
    arrayTitle: '数组类型守卫', arrayDesc: '使用 Array.isArray() 和类型安全的 filter 模式。',
    realWorldTitle: '实际示例',
    apiTitle: 'API 响应处理', apiDesc: '类型守卫对于在运行时验证 API 响应至关重要。',
    eventTitle: '事件处理', eventDesc: '使用类型守卫缩窄 DOM 事件类型。',
    errorTitle: '错误处理', errorDesc: '类型守卫帮助你以类型安全的方式处理不同的错误类型。',
    bestPracticesTitle: '最佳实践',
    bp1: '尽可能优先使用判别联合。', bp2: '保持类型守卫函数简单。', bp3: '在应用边界使用断言函数。',
    bp4: '始终处理 else 情况或使用穷举检查。', bp5: '在联合类型上使用 Array.isArray()。',
    bp6: '组合多个类型守卫进行复杂缩窄。', bp7: '彻底测试自定义类型守卫。',
    conclusionTitle: '总结',
    conclusionText: 'TypeScript 类型守卫是连接编译时类型安全和运行时行为的必备工具。掌握这些模式，你可以编写既在编译时类型安全又在运行时健壮的代码。',
    faqTitle: '常见问题',
    faq1q: '类型谓词和断言函数有什么区别？', faq1a: '类型谓词返回布尔值并在真值分支中缩窄类型。断言函数通过抛出错误来缩窄类型。',
    faq2q: '何时使用判别联合 vs 自定义类型守卫？', faq2a: '当你控制类型时使用判别联合。处理外部数据时使用自定义类型守卫。',
    faq3q: '类型守卫会导致运行时错误吗？', faq3a: '自定义类型守卫函数如果谓词逻辑与声明的类型不匹配，可能导致错误。',
    faq4q: '如何在数组中缩窄类型？', faq4a: '使用 Array.isArray() 和带类型谓词的 .filter()。',
  },
  ja: {
    title: 'TypeScript 型ガード：ランタイム型チェック完全ガイド',
    intro: 'TypeScript の型システムは強力ですが、型はランタイムで消去されます。型ガードはこのギャップを埋め、ランタイムで型を絞り込みながらコンパイル時の型安全性を維持します。',
    whatTitle: '型ガードとは？', whatDesc: '型ガードは条件ブロック内で変数の型を絞り込むランタイムチェックです。',
    typeofTitle: 'typeof 型ガード', typeofDesc: 'typeof 演算子は最もシンプルな型ガードです。',
    instanceofTitle: 'instanceof 型ガード', instanceofDesc: 'instanceof はオブジェクトがクラスのインスタンスかチェックします。',
    inTitle: '"in" 演算子型ガード', inDesc: 'in 演算子はプロパティの存在をチェックします。',
    customTitle: 'カスタム型ガード関数', customDesc: '型述語を返す関数で複雑なチェックをカプセル化します。',
    discriminatedTitle: '判別ユニオン', discriminatedDesc: '共通のリテラルプロパティでユニオンメンバーを区別します。',
    assertionTitle: 'アサーション関数', assertionDesc: 'アサーション失敗時にエラーをスローして型を絞り込みます。',
    narrowingTitle: '制御フロー型絞り込み', narrowingDesc: 'TypeScript は制御フロー分析で型を絞り込みます。',
    truthyTitle: '真偽値の絞り込み', truthyDesc: '真偽値チェックに基づいて型を絞り込みます。',
    equalityTitle: '等価性の絞り込み', equalityDesc: '値の比較で型を絞り込みます。',
    advancedTitle: '高度な型ガードパターン',
    exhaustiveTitle: 'never による網羅チェック', exhaustiveDesc: 'never 型ですべてのケースの処理を保証します。',
    genericTitle: 'ジェネリック型ガード', genericDesc: '任意の型で動作するジェネリック型ガードを作成できます。',
    arrayTitle: '配列型ガード', arrayDesc: 'Array.isArray() と型安全な filter パターンを使用します。',
    realWorldTitle: '実践例',
    apiTitle: 'API レスポンス処理', apiDesc: 'API レスポンスのランタイム検証に不可欠です。',
    eventTitle: 'イベント処理', eventDesc: 'DOM イベント型を絞り込みます。',
    errorTitle: 'エラー処理', errorDesc: '異なるエラー型を型安全に処理します。',
    bestPracticesTitle: 'ベストプラクティス',
    bp1: '可能な限り判別ユニオンを優先。', bp2: '型ガード関数をシンプルに。', bp3: 'アプリ境界でアサーション関数を使用。',
    bp4: 'else ケースを常に処理。', bp5: 'ユニオン型で Array.isArray() を使用。',
    bp6: '複数の型ガードを組み合わせ。', bp7: 'カスタム型ガードを徹底テスト。',
    conclusionTitle: '結論',
    conclusionText: 'TypeScript 型ガードはコンパイル時の型安全性とランタイムの動作のギャップを埋める必須ツールです。これらのパターンをマスターして、型安全で堅牢なコードを書きましょう。',
    faqTitle: 'FAQ',
    faq1q: '型述語とアサーション関数の違いは？', faq1a: '型述語は boolean を返し、アサーション関数はエラーをスローして型を絞り込みます。',
    faq2q: '判別ユニオンとカスタム型ガードの使い分けは？', faq2a: '型を制御できる場合は判別ユニオン。外部データには型ガード。',
    faq3q: '型ガードはランタイムエラーを起こす？', faq3a: 'カスタム型ガードのロジックが不正確な場合、エラーが発生する可能性があります。',
    faq4q: '配列内の型をどう絞り込む？', faq4a: 'Array.isArray() と型述語付き .filter() を使用します。',
  },
  ko: {
    title: 'TypeScript 타입 가드: 런타임 타입 체크 완전 가이드',
    intro: 'TypeScript는 강력한 타입 시스템을 제공하지만, 타입은 런타임에 제거됩니다. 타입 가드는 런타임에서 타입을 좁히면서 컴파일 타임의 타입 안전성을 유지합니다.',
    whatTitle: '타입 가드란?', whatDesc: '타입 가드는 조건 블록 내에서 변수의 타입을 좁히는 런타임 체크입니다.',
    typeofTitle: 'typeof 타입 가드', typeofDesc: 'typeof 연산자는 가장 간단한 타입 가드입니다.',
    instanceofTitle: 'instanceof 타입 가드', instanceofDesc: 'instanceof는 객체가 클래스의 인스턴스인지 확인합니다.',
    inTitle: '"in" 연산자 타입 가드', inDesc: 'in 연산자는 속성의 존재를 확인합니다.',
    customTitle: '커스텀 타입 가드 함수', customDesc: '타입 술어를 반환하는 함수로 복잡한 체크를 캡슐화합니다.',
    discriminatedTitle: '판별 유니온', discriminatedDesc: '공통 리터럴 속성으로 유니온 멤버를 구별합니다.',
    assertionTitle: '어설션 함수', assertionDesc: '어설션 실패 시 에러를 던져 타입을 좁힙니다.',
    narrowingTitle: '제어 흐름 타입 좁히기', narrowingDesc: 'TypeScript는 제어 흐름 분석으로 타입을 좁힙니다.',
    truthyTitle: '참/거짓 좁히기', truthyDesc: '참/거짓 체크에 기반하여 타입을 좁힙니다.',
    equalityTitle: '동등성 좁히기', equalityDesc: '값 비교로 타입을 좁힙니다.',
    advancedTitle: '고급 타입 가드 패턴',
    exhaustiveTitle: 'never를 이용한 완전성 검사', exhaustiveDesc: 'never 타입으로 모든 케이스 처리를 보장합니다.',
    genericTitle: '제네릭 타입 가드', genericDesc: '모든 타입에 작동하는 제네릭 타입 가드를 만들 수 있습니다.',
    arrayTitle: '배열 타입 가드', arrayDesc: 'Array.isArray()와 타입 안전한 filter 패턴을 사용합니다.',
    realWorldTitle: '실제 예제',
    apiTitle: 'API 응답 처리', apiDesc: 'API 응답의 런타임 검증에 필수적입니다.',
    eventTitle: '이벤트 처리', eventDesc: 'DOM 이벤트 타입을 좁힙니다.',
    errorTitle: '에러 처리', errorDesc: '다양한 에러 타입을 타입 안전하게 처리합니다.',
    bestPracticesTitle: '모범 사례',
    bp1: '가능하면 판별 유니온 우선.', bp2: '타입 가드 함수를 단순하게.', bp3: '앱 경계에서 어설션 함수 사용.',
    bp4: 'else 케이스를 항상 처리.', bp5: '유니온 타입에서 Array.isArray() 사용.',
    bp6: '여러 타입 가드를 조합.', bp7: '커스텀 타입 가드를 철저히 테스트.',
    conclusionTitle: '결론',
    conclusionText: 'TypeScript 타입 가드는 컴파일 타임 타입 안전성과 런타임 동작의 격차를 메우는 필수 도구입니다. 이러한 패턴을 마스터하여 타입 안전하고 견고한 코드를 작성하세요.',
    faqTitle: 'FAQ',
    faq1q: '타입 술어와 어설션 함수의 차이는?', faq1a: '타입 술어는 boolean을 반환하고, 어설션 함수는 에러를 던져 타입을 좁힙니다.',
    faq2q: '판별 유니온과 커스텀 타입 가드는 언제 사용하나요?', faq2a: '타입을 제어할 수 있을 때는 판별 유니온, 외부 데이터에는 타입 가드.',
    faq3q: '타입 가드가 런타임 에러를 일으킬 수 있나요?', faq3a: '커스텀 타입 가드의 로직이 부정확하면 에러가 발생할 수 있습니다.',
    faq4q: '배열 내 타입을 어떻게 좁히나요?', faq4a: 'Array.isArray()와 타입 술어가 있는 .filter()를 사용합니다.',
  },
  fr: {
    title: 'TypeScript Type Guards : Guide complet de la vérification de types au runtime',
    intro: 'TypeScript offre un système de types puissant, mais les types sont effacés au runtime. Les type guards comblent ce fossé en permettant de réduire les types au runtime tout en conservant la sécurité des types à la compilation.',
    whatTitle: 'Qu\'est-ce qu\'un Type Guard ?', whatDesc: 'Un type guard est une vérification au runtime qui réduit le type d\'une variable dans un bloc conditionnel.',
    typeofTitle: 'Type Guards typeof', typeofDesc: 'L\'opérateur typeof est le type guard le plus simple.',
    instanceofTitle: 'Type Guards instanceof', instanceofDesc: 'instanceof vérifie si un objet est une instance d\'une classe.',
    inTitle: 'Type Guard "in"', inDesc: 'L\'opérateur in vérifie l\'existence d\'une propriété.',
    customTitle: 'Fonctions Type Guard personnalisées', customDesc: 'Les fonctions avec prédicat de type encapsulent une logique complexe.',
    discriminatedTitle: 'Unions discriminées', discriminatedDesc: 'Utilisent une propriété littérale commune pour distinguer les membres.',
    assertionTitle: 'Fonctions d\'assertion', assertionDesc: 'Réduisent les types en lançant une erreur si l\'assertion échoue.',
    narrowingTitle: 'Réduction de types par flux de contrôle', narrowingDesc: 'TypeScript analyse le flux de contrôle pour réduire les types.',
    truthyTitle: 'Réduction par véracité', truthyDesc: 'Réduit les types selon les vérifications de véracité.',
    equalityTitle: 'Réduction par égalité', equalityDesc: 'Réduit les types lors de comparaisons de valeurs.',
    advancedTitle: 'Modèles avancés',
    exhaustiveTitle: 'Vérification exhaustive avec never', exhaustiveDesc: 'Assure que tous les cas sont traités.',
    genericTitle: 'Type Guards génériques', genericDesc: 'Créez des type guards réutilisables.',
    arrayTitle: 'Type Guards pour tableaux', arrayDesc: 'Utilisez Array.isArray() et filter avec prédicat.',
    realWorldTitle: 'Exemples concrets',
    apiTitle: 'Traitement des réponses API', apiDesc: 'Essentiel pour valider les réponses API.',
    eventTitle: 'Gestion des événements', eventDesc: 'Réduisez les types d\'événements DOM.',
    errorTitle: 'Gestion des erreurs', errorDesc: 'Gérez les erreurs de manière type-safe.',
    bestPracticesTitle: 'Bonnes pratiques',
    bp1: 'Préférez les unions discriminées.', bp2: 'Gardez les fonctions simples.', bp3: 'Utilisez les assertions aux limites.',
    bp4: 'Gérez toujours le cas else.', bp5: 'Utilisez Array.isArray() sur les unions.', bp6: 'Combinez les type guards.', bp7: 'Testez vos type guards personnalisés.',
    conclusionTitle: 'Conclusion',
    conclusionText: 'Les type guards TypeScript sont des outils essentiels pour combler le fossé entre la sécurité des types à la compilation et le comportement au runtime.',
    faqTitle: 'FAQ',
    faq1q: 'Différence entre prédicat et assertion ?', faq1a: 'Un prédicat retourne un boolean, une assertion lance une erreur.',
    faq2q: 'Quand utiliser unions discriminées vs type guards ?', faq2a: 'Unions discriminées quand vous contrôlez les types, type guards pour les données externes.',
    faq3q: 'Les type guards peuvent-ils causer des erreurs ?', faq3a: 'Oui, si la logique du prédicat ne correspond pas au type déclaré.',
    faq4q: 'Comment réduire les types dans les tableaux ?', faq4a: 'Utilisez Array.isArray() et .filter() avec un prédicat de type.',
  },
  de: {
    title: 'TypeScript Type Guards: Vollständiger Leitfaden zur Laufzeit-Typprüfung',
    intro: 'TypeScript bietet ein leistungsstarkes Typsystem, aber Typen werden zur Laufzeit gelöscht. Type Guards schließen diese Lücke, indem sie Typen zur Laufzeit einschränken.',
    whatTitle: 'Was sind Type Guards?', whatDesc: 'Ein Type Guard ist eine Laufzeitprüfung, die den Typ einer Variable einschränkt.',
    typeofTitle: 'typeof Type Guards', typeofDesc: 'Der typeof-Operator ist der einfachste Type Guard.',
    instanceofTitle: 'instanceof Type Guards', instanceofDesc: 'instanceof prüft, ob ein Objekt eine Klasseninstanz ist.',
    inTitle: '"in" Operator Type Guard', inDesc: 'Der in-Operator prüft die Existenz einer Eigenschaft.',
    customTitle: 'Benutzerdefinierte Type Guards', customDesc: 'Funktionen mit Typprädikat kapseln komplexe Logik.',
    discriminatedTitle: 'Diskriminierte Unions', discriminatedDesc: 'Verwenden eine gemeinsame Literal-Eigenschaft zur Unterscheidung.',
    assertionTitle: 'Assertionsfunktionen', assertionDesc: 'Schränken Typen durch Werfen eines Fehlers ein.',
    narrowingTitle: 'Typ-Einschränkung durch Kontrollfluss', narrowingDesc: 'TypeScript analysiert den Kontrollfluss zur Typeinschränkung.',
    truthyTitle: 'Wahrheitswert-Einschränkung', truthyDesc: 'Schränkt Typen basierend auf Wahrheitswert-Prüfungen ein.',
    equalityTitle: 'Gleichheits-Einschränkung', equalityDesc: 'Schränkt Typen bei Wertevergleichen ein.',
    advancedTitle: 'Erweiterte Muster',
    exhaustiveTitle: 'Vollständigkeitsprüfung mit never', exhaustiveDesc: 'Stellt sicher, dass alle Fälle behandelt werden.',
    genericTitle: 'Generische Type Guards', genericDesc: 'Erstellen Sie wiederverwendbare generische Type Guards.',
    arrayTitle: 'Array Type Guards', arrayDesc: 'Verwenden Sie Array.isArray() und typsicheres Filtern.',
    realWorldTitle: 'Praxisbeispiele',
    apiTitle: 'API-Antwortverarbeitung', apiDesc: 'Unverzichtbar für die Validierung von API-Antworten.',
    eventTitle: 'Event-Behandlung', eventDesc: 'DOM-Eventtypen einschränken.',
    errorTitle: 'Fehlerbehandlung', errorDesc: 'Verschiedene Fehlertypen typsicher behandeln.',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Bevorzugen Sie diskriminierte Unions.', bp2: 'Halten Sie Type Guards einfach.', bp3: 'Assertionsfunktionen an App-Grenzen.',
    bp4: 'Behandeln Sie immer den else-Fall.', bp5: 'Array.isArray() bei Union-Typen.', bp6: 'Type Guards kombinieren.', bp7: 'Benutzerdefinierte Type Guards testen.',
    conclusionTitle: 'Fazit',
    conclusionText: 'TypeScript Type Guards sind wesentliche Werkzeuge. Meistern Sie diese Muster für typsicheren und robusten Code.',
    faqTitle: 'FAQ',
    faq1q: 'Unterschied zwischen Typprädikat und Assertionsfunktion?', faq1a: 'Typprädikate geben boolean zurück, Assertionen werfen Fehler.',
    faq2q: 'Wann diskriminierte Unions vs Type Guards?', faq2a: 'Diskriminierte Unions wenn Sie die Typen kontrollieren, Type Guards für externe Daten.',
    faq3q: 'Können Type Guards Laufzeitfehler verursachen?', faq3a: 'Ja, wenn die Prädikatlogik nicht zum deklarierten Typ passt.',
    faq4q: 'Wie Typen in Arrays einschränken?', faq4a: 'Array.isArray() und .filter() mit Typprädikat verwenden.',
  },
  es: {
    title: 'TypeScript Type Guards: Guía completa de verificación de tipos en tiempo de ejecución',
    intro: 'TypeScript proporciona un sistema de tipos poderoso, pero los tipos se eliminan en tiempo de ejecución. Los type guards cierran esta brecha permitiendo estrechar tipos en tiempo de ejecución.',
    whatTitle: '¿Qué son los Type Guards?', whatDesc: 'Un type guard es una verificación en tiempo de ejecución que estrecha el tipo de una variable.',
    typeofTitle: 'Type Guards typeof', typeofDesc: 'El operador typeof es el type guard más simple.',
    instanceofTitle: 'Type Guards instanceof', instanceofDesc: 'instanceof verifica si un objeto es instancia de una clase.',
    inTitle: 'Type Guard "in"', inDesc: 'El operador in verifica la existencia de una propiedad.',
    customTitle: 'Funciones Type Guard personalizadas', customDesc: 'Funciones con predicado de tipo encapsulan lógica compleja.',
    discriminatedTitle: 'Uniones discriminadas', discriminatedDesc: 'Usan una propiedad literal común para distinguir miembros.',
    assertionTitle: 'Funciones de aserción', assertionDesc: 'Estrechan tipos lanzando un error si la aserción falla.',
    narrowingTitle: 'Estrechamiento por flujo de control', narrowingDesc: 'TypeScript analiza el flujo de control para estrechar tipos.',
    truthyTitle: 'Estrechamiento por veracidad', truthyDesc: 'Estrecha tipos según verificaciones de veracidad.',
    equalityTitle: 'Estrechamiento por igualdad', equalityDesc: 'Estrecha tipos al comparar valores.',
    advancedTitle: 'Patrones avanzados',
    exhaustiveTitle: 'Verificación exhaustiva con never', exhaustiveDesc: 'Asegura que todos los casos están manejados.',
    genericTitle: 'Type Guards genéricos', genericDesc: 'Cree type guards reutilizables.',
    arrayTitle: 'Type Guards para arrays', arrayDesc: 'Use Array.isArray() y filter con predicado.',
    realWorldTitle: 'Ejemplos del mundo real',
    apiTitle: 'Manejo de respuestas API', apiDesc: 'Esencial para validar respuestas API.',
    eventTitle: 'Manejo de eventos', eventDesc: 'Estreche tipos de eventos DOM.',
    errorTitle: 'Manejo de errores', errorDesc: 'Maneje errores de forma type-safe.',
    bestPracticesTitle: 'Mejores prácticas',
    bp1: 'Prefiera uniones discriminadas.', bp2: 'Mantenga las funciones simples.', bp3: 'Use aserciones en los límites.',
    bp4: 'Maneje siempre el caso else.', bp5: 'Array.isArray() en tipos union.', bp6: 'Combine type guards.', bp7: 'Pruebe sus type guards.',
    conclusionTitle: 'Conclusión',
    conclusionText: 'Los type guards de TypeScript son herramientas esenciales. Domine estos patrones para código type-safe y robusto.',
    faqTitle: 'FAQ',
    faq1q: '¿Diferencia entre predicado y función de aserción?', faq1a: 'Un predicado retorna boolean, una aserción lanza un error.',
    faq2q: '¿Cuándo usar uniones discriminadas vs type guards?', faq2a: 'Uniones discriminadas cuando controla los tipos, type guards para datos externos.',
    faq3q: '¿Pueden los type guards causar errores?', faq3a: 'Sí, si la lógica del predicado no corresponde al tipo declarado.',
    faq4q: '¿Cómo estrechar tipos en arrays?', faq4a: 'Use Array.isArray() y .filter() con predicado de tipo.',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 12 };

export default function TypeScriptTypeGuards({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    ],
  };

  return (
    <article style={{ maxWidth: 800, margin: '0 auto', lineHeight: 1.8 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={pStyle}>{t.intro}</p>

      {/* What Are Type Guards */}
      <h2 style={h2Style}>{t.whatTitle}</h2>
      <p style={pStyle}>{t.whatDesc}</p>
      <pre style={codeStyle}><code>{`// Without type guard — TypeScript only knows 'value' is string | number
function process(value: string | number) {
  // value.toUpperCase(); // Error: Property 'toUpperCase' does not exist on type 'number'

  // With type guard — TypeScript narrows the type
  if (typeof value === 'string') {
    console.log(value.toUpperCase()); // OK: value is string here
  } else {
    console.log(value.toFixed(2));    // OK: value is number here
  }
}`}</code></pre>

      {/* typeof */}
      <h2 style={h2Style}>{t.typeofTitle}</h2>
      <p style={pStyle}>{t.typeofDesc}</p>
      <pre style={codeStyle}><code>{`function formatValue(value: string | number | boolean): string {
  if (typeof value === 'string') {
    // TypeScript knows: value is string
    return value.trim().toLowerCase();
  }
  if (typeof value === 'number') {
    // TypeScript knows: value is number
    return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  // TypeScript knows: value is boolean
  return value ? 'Yes' : 'No';
}

// typeof works for these primitive types:
// 'string' | 'number' | 'bigint' | 'boolean'
// 'symbol' | 'undefined' | 'object' | 'function'

// Caveat: typeof null === 'object'
function processNullable(value: string | null) {
  if (typeof value === 'object') {
    // value could be null here!  typeof null === 'object'
  }
  if (value !== null && typeof value === 'object') {
    // Safe: value is not null
  }
}`}</code></pre>

      {/* instanceof */}
      <h2 style={h2Style}>{t.instanceofTitle}</h2>
      <p style={pStyle}>{t.instanceofDesc}</p>
      <pre style={codeStyle}><code>{`class HttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'HttpError';
  }
}

class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

function handleError(error: Error) {
  if (error instanceof HttpError) {
    // TypeScript knows: error is HttpError
    console.log(\`HTTP \${error.statusCode}: \${error.message}\`);
    if (error.statusCode === 401) {
      redirectToLogin();
    }
  } else if (error instanceof ValidationError) {
    // TypeScript knows: error is ValidationError
    console.log(\`Validation failed on field: \${error.field}\`);
    highlightField(error.field);
  } else {
    // TypeScript knows: error is Error
    console.log(\`Unexpected error: \${error.message}\`);
  }
}

// instanceof with Date
function formatDate(input: string | Date): string {
  if (input instanceof Date) {
    return input.toISOString();
  }
  return new Date(input).toISOString();
}`}</code></pre>

      {/* in operator */}
      <h2 style={h2Style}>{t.inTitle}</h2>
      <p style={pStyle}>{t.inDesc}</p>
      <pre style={codeStyle}><code>{`interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function move(animal: Bird | Fish) {
  if ('fly' in animal) {
    // TypeScript knows: animal is Bird
    animal.fly();
  } else {
    // TypeScript knows: animal is Fish
    animal.swim();
  }
}

// Practical example: API responses
interface SuccessResponse {
  data: unknown;
  status: 'ok';
}

interface ErrorResponse {
  error: string;
  code: number;
}

function handleResponse(res: SuccessResponse | ErrorResponse) {
  if ('error' in res) {
    // TypeScript knows: res is ErrorResponse
    console.error(\`Error \${res.code}: \${res.error}\`);
  } else {
    // TypeScript knows: res is SuccessResponse
    processData(res.data);
  }
}`}</code></pre>

      {/* Custom Type Guards */}
      <h2 style={h2Style}>{t.customTitle}</h2>
      <p style={pStyle}>{t.customDesc}</p>
      <pre style={codeStyle}><code>{`// Type predicate syntax: paramName is Type
interface User {
  id: string;
  name: string;
  email: string;
}

interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

// Custom type guard function
function isAdmin(user: User): user is Admin {
  return 'role' in user && (user as Admin).role === 'admin';
}

function showDashboard(user: User) {
  if (isAdmin(user)) {
    // TypeScript knows: user is Admin
    console.log(\`Admin: \${user.name}, Permissions: \${user.permissions.join(', ')}\`);
    renderAdminPanel(user.permissions);
  } else {
    // TypeScript knows: user is User (not Admin)
    console.log(\`User: \${user.name}\`);
    renderUserDashboard();
  }
}

// Type guard for checking non-null
function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

// Use with .filter() to narrow array types
const items: (string | null)[] = ['hello', null, 'world', null];
const strings: string[] = items.filter(isNotNull);
// strings is string[] — no more nulls!

// Type guard for object shapes
function isValidUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'email' in data &&
    typeof (data as User).id === 'string' &&
    typeof (data as User).name === 'string' &&
    typeof (data as User).email === 'string'
  );
}`}</code></pre>

      {/* Discriminated Unions */}
      <h2 style={h2Style}>{t.discriminatedTitle}</h2>
      <p style={pStyle}>{t.discriminatedDesc}</p>
      <pre style={codeStyle}><code>{`// The discriminant property: 'type'
interface Circle {
  type: 'circle';
  radius: number;
}

interface Rectangle {
  type: 'rectangle';
  width: number;
  height: number;
}

interface Triangle {
  type: 'triangle';
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;

function calculateArea(shape: Shape): number {
  switch (shape.type) {
    case 'circle':
      // TypeScript knows: shape is Circle
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      // TypeScript knows: shape is Rectangle
      return shape.width * shape.height;
    case 'triangle':
      // TypeScript knows: shape is Triangle
      return (shape.base * shape.height) / 2;
  }
}

// Real-world: Redux actions
type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: User[] }
  | { type: 'FETCH_ERROR'; error: string }
  | { type: 'SET_FILTER'; filter: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      // TypeScript knows: action.payload exists and is User[]
      return { ...state, loading: false, users: action.payload };
    case 'FETCH_ERROR':
      // TypeScript knows: action.error exists and is string
      return { ...state, loading: false, error: action.error };
    case 'SET_FILTER':
      return { ...state, filter: action.filter };
  }
}`}</code></pre>

      {/* Assertion Functions */}
      <h2 style={h2Style}>{t.assertionTitle}</h2>
      <p style={pStyle}>{t.assertionDesc}</p>
      <pre style={codeStyle}><code>{`// Assertion function syntax: asserts paramName is Type
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new TypeError(\`Expected string, got \${typeof value}\`);
  }
}

// Usage: type narrows AFTER the assertion call
function processInput(input: unknown) {
  assertIsString(input);
  // TypeScript knows: input is string from here on
  console.log(input.toUpperCase());
}

// Assert non-null
function assertDefined<T>(
  value: T | null | undefined,
  name: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(\`\${name} must be defined\`);
  }
}

// Practical: Form validation
interface FormData {
  name: unknown;
  email: unknown;
  age: unknown;
}

function assertValidForm(data: FormData): asserts data is {
  name: string;
  email: string;
  age: number;
} {
  if (typeof data.name !== 'string' || data.name.length === 0) {
    throw new ValidationError('name', 'Name is required');
  }
  if (typeof data.email !== 'string' || !data.email.includes('@')) {
    throw new ValidationError('email', 'Valid email is required');
  }
  if (typeof data.age !== 'number' || data.age < 0 || data.age > 150) {
    throw new ValidationError('age', 'Valid age is required');
  }
}

function handleSubmit(data: FormData) {
  assertValidForm(data);
  // TypeScript knows all fields are properly typed here
  console.log(\`Name: \${data.name}, Email: \${data.email}, Age: \${data.age}\`);
}`}</code></pre>

      {/* Control Flow Narrowing */}
      <h2 style={h2Style}>{t.narrowingTitle}</h2>
      <p style={pStyle}>{t.narrowingDesc}</p>

      <h3 style={h3Style}>{t.truthyTitle}</h3>
      <p style={pStyle}>{t.truthyDesc}</p>
      <pre style={codeStyle}><code>{`function greet(name: string | null | undefined) {
  if (name) {
    // TypeScript knows: name is string (not null/undefined)
    console.log(\`Hello, \${name.toUpperCase()}!\`);
  }
}

// Truthy narrowing with arrays
function processItems(items?: string[]) {
  if (items && items.length > 0) {
    // TypeScript knows: items is string[] (defined and non-empty)
    const first = items[0]; // string
  }
}

// Logical operators for narrowing
function getValue(a: string | null, b: string | null): string {
  // || narrows: returns first truthy value
  return a || b || 'default';
}

// Nullish coalescing for narrowing
function getConfig(config?: { timeout: number }) {
  const timeout = config?.timeout ?? 3000;
  // timeout is number (never undefined)
}`}</code></pre>

      <h3 style={h3Style}>{t.equalityTitle}</h3>
      <p style={pStyle}>{t.equalityDesc}</p>
      <pre style={codeStyle}><code>{`function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // TypeScript knows: both x and y are string
    // (the only common type)
    console.log(x.toUpperCase());
    console.log(y.toUpperCase());
  }
}

// Equality narrowing with null
function process(value: string | null) {
  if (value !== null) {
    // TypeScript knows: value is string
    console.log(value.length);
  }
}

// Switch statement narrowing
function handleStatus(status: 'loading' | 'success' | 'error') {
  switch (status) {
    case 'loading':
      showSpinner();
      break;
    case 'success':
      hideSpinner();
      break;
    case 'error':
      showError();
      break;
  }
}`}</code></pre>

      {/* Advanced Patterns */}
      <h2 style={h2Style}>{t.advancedTitle}</h2>

      <h3 style={h3Style}>{t.exhaustiveTitle}</h3>
      <p style={pStyle}>{t.exhaustiveDesc}</p>
      <pre style={codeStyle}><code>{`type Shape = Circle | Rectangle | Triangle;

function assertNever(x: never): never {
  throw new Error(\`Unexpected value: \${x}\`);
}

function getArea(shape: Shape): number {
  switch (shape.type) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    case 'triangle':
      return (shape.base * shape.height) / 2;
    default:
      // If you add a new Shape variant and forget to handle it,
      // TypeScript will error here because shape won't be 'never'
      return assertNever(shape);
  }
}

// Alternative: satisfies + exhaustive check
function describeShape(shape: Shape): string {
  switch (shape.type) {
    case 'circle':    return \`Circle with radius \${shape.radius}\`;
    case 'rectangle': return \`\${shape.width}x\${shape.height} rectangle\`;
    case 'triangle':  return \`Triangle with base \${shape.base}\`;
    default: {
      const _exhaustive: never = shape;
      return _exhaustive;
    }
  }
}`}</code></pre>

      <h3 style={h3Style}>{t.genericTitle}</h3>
      <p style={pStyle}>{t.genericDesc}</p>
      <pre style={codeStyle}><code>{`// Generic type guard for checking object keys
function hasProperty<K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return typeof obj === 'object' && obj !== null && key in obj;
}

// Usage
function processData(data: unknown) {
  if (hasProperty(data, 'name') && hasProperty(data, 'age')) {
    console.log(data.name, data.age); // both are 'unknown' but accessible
  }
}

// Generic type guard for arrays
function isArrayOf<T>(
  arr: unknown,
  guard: (item: unknown) => item is T
): arr is T[] {
  return Array.isArray(arr) && arr.every(guard);
}

const isString = (value: unknown): value is string =>
  typeof value === 'string';

function handleInput(data: unknown) {
  if (isArrayOf(data, isString)) {
    // data is string[]
    data.forEach(s => console.log(s.toUpperCase()));
  }
}`}</code></pre>

      <h3 style={h3Style}>{t.arrayTitle}</h3>
      <p style={pStyle}>{t.arrayDesc}</p>
      <pre style={codeStyle}><code>{`// Filtering with type guards
const mixed: (string | number | null)[] = ['a', 1, null, 'b', 2, null];

// Filter nulls with type predicate
const nonNull = mixed.filter(
  (item): item is string | number => item !== null
);
// nonNull: (string | number)[]

// Filter to specific type
const stringsOnly = mixed.filter(
  (item): item is string => typeof item === 'string'
);
// stringsOnly: string[]

// Type-safe .find()
const found = mixed.find(
  (item): item is string => typeof item === 'string'
);
// found: string | undefined

// Array.isArray() type guard
function flatten(input: string | string[]): string[] {
  if (Array.isArray(input)) {
    return input; // string[]
  }
  return [input]; // wrap single string in array
}`}</code></pre>

      {/* Real-World Examples */}
      <h2 style={h2Style}>{t.realWorldTitle}</h2>

      <h3 style={h3Style}>{t.apiTitle}</h3>
      <p style={pStyle}>{t.apiDesc}</p>
      <pre style={codeStyle}><code>{`// API response types
interface ApiSuccess<T> {
  success: true;
  data: T;
}

interface ApiError {
  success: false;
  error: { message: string; code: string };
}

type ApiResponse<T> = ApiSuccess<T> | ApiError;

// Type guard based on discriminant
function isApiSuccess<T>(res: ApiResponse<T>): res is ApiSuccess<T> {
  return res.success === true;
}

// Usage with fetch
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  const json: ApiResponse<User> = await response.json();

  if (isApiSuccess(json)) {
    return json.data; // TypeScript knows: json.data is User
  } else {
    throw new Error(json.error.message);
  }
}

// Validate unknown API data
function isUser(data: unknown): data is User {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string'
  );
}`}</code></pre>

      <h3 style={h3Style}>{t.eventTitle}</h3>
      <p style={pStyle}>{t.eventDesc}</p>
      <pre style={codeStyle}><code>{`function handleEvent(event: Event) {
  if (event instanceof MouseEvent) {
    console.log(\`Mouse at (\${event.clientX}, \${event.clientY})\`);
  } else if (event instanceof KeyboardEvent) {
    console.log(\`Key pressed: \${event.key}\`);
  } else if (event instanceof TouchEvent) {
    console.log(\`Touch points: \${event.touches.length}\`);
  }
}

// Input element type narrowing
function handleInput(event: Event) {
  const target = event.target;
  if (target instanceof HTMLInputElement) {
    console.log(target.value); // string
  } else if (target instanceof HTMLSelectElement) {
    console.log(target.selectedIndex); // number
  }
}`}</code></pre>

      <h3 style={h3Style}>{t.errorTitle}</h3>
      <p style={pStyle}>{t.errorDesc}</p>
      <pre style={codeStyle}><code>{`// Type guard for unknown caught errors
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

function getErrorMessage(error: unknown): string {
  if (isError(error)) return error.message;
  if (typeof error === 'string') return error;
  return 'An unknown error occurred';
}

// Safe error handling in async code
async function safeFetch(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new HttpError(res.status, res.statusText);
    return await res.json();
  } catch (error) {
    if (error instanceof HttpError) {
      handleHttpError(error); // error.statusCode available
    } else if (error instanceof TypeError) {
      handleNetworkError(error); // Network failure
    } else {
      handleUnknownError(getErrorMessage(error));
    }
  }
}`}</code></pre>

      {/* Best Practices */}
      <h2 style={h2Style}>{t.bestPracticesTitle}</h2>
      <ol style={{ color: 'var(--text-secondary)', lineHeight: 2.2, paddingLeft: 24 }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
        <li>{t.bp6}</li>
        <li>{t.bp7}</li>
      </ol>

      {/* Conclusion */}
      <h2 style={h2Style}>{t.conclusionTitle}</h2>
      <p style={pStyle}>{t.conclusionText}</p>

      {/* FAQ */}
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
    </article>
  );
}
