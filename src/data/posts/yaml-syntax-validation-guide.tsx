const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'YAML Syntax & Validation: Common Errors and How to Fix Them',
    intro: 'YAML (YAML Ain\'t Markup Language) is the go-to configuration format for Docker, Kubernetes, CI/CD pipelines, and countless other tools. Despite its human-friendly syntax, YAML is surprisingly easy to get wrong. This guide covers the most common YAML errors and how to fix them.',
    whereTitle: 'Where YAML Is Used',
    where1: 'Docker Compose (docker-compose.yml)',
    where2: 'Kubernetes manifests',
    where3: 'GitHub Actions / GitLab CI workflows',
    where4: 'Ansible playbooks',
    where5: 'Configuration files (Prettier, ESLint, etc.)',
    syntaxTitle: 'Basic YAML Syntax Rules',
    indentTitle: 'Indentation',
    indentDesc: 'YAML uses spaces (never tabs) for indentation. The number of spaces must be consistent within the same level:',
    kvTitle: 'Key-Value Pairs',
    kvDesc: 'Keys and values are separated by a colon followed by a space:',
    commentTitle: 'Comments',
    commentDesc: 'Comments start with # and continue to the end of the line:',
    multilineTitle: 'Multi-line Strings',
    multilineDesc: 'YAML offers two block scalar styles for multi-line strings:',
    typesTitle: 'YAML Data Types',
    type: 'Type',
    syntax: 'Syntax',
    example: 'Example',
    note: 'Note',
    norwayTitle: 'The "Norway Problem"',
    norwayDesc: 'In YAML 1.1, `NO` (as in the country code for Norway) is interpreted as boolean `false`. This is because YAML 1.1 treats yes/no, on/off, true/false as booleans. Always quote country codes and similar values:',
    collectionsTitle: 'Collections: Lists and Maps',
    listTitle: 'Lists (Sequences)',
    mapTitle: 'Nested Maps',
    inlineTitle: 'Inline / Flow Style',
    errorsTitle: 'Top 10 Common YAML Errors',
    errorNum: '#',
    error: 'Error',
    cause: 'Cause',
    fix: 'Fix',
    e1: 'TabCharacterError', e1c: 'Using tab characters for indentation', e1f: 'Replace all tabs with spaces (2 or 4)',
    e2: 'Inconsistent indentation', e2c: 'Mixing 2-space and 4-space indentation', e2f: 'Use consistent indentation throughout the file',
    e3: 'Missing space after colon', e3c: 'Writing `key:value` instead of `key: value`', e3f: 'Always add a space after the colon',
    e4: 'Unquoted special characters', e4c: 'Values containing : or # without quotes', e4f: 'Quote strings containing special characters',
    e5: 'Boolean coercion', e5c: 'yes/no/on/off/NO interpreted as boolean', e5f: 'Quote values that look like booleans: `"yes"`, `"NO"`',
    e6: 'Strings with colons', e6c: '`url: http://example.com` breaks at second colon', e6f: 'Quote the entire value: `url: "http://example.com"`',
    e7: 'Duplicate keys', e7c: 'Same key appears twice in a mapping', e7f: 'Remove duplicate keys (last one wins but this is error-prone)',
    e8: 'Trailing whitespace', e8c: 'Invisible spaces after values', e8f: 'Configure editor to trim trailing whitespace',
    e9: 'Wrong list indentation', e9c: 'List items not aligned with parent key', e9f: 'Align `-` with child indentation level',
    e10: 'Missing document separator', e10c: 'Multiple documents without `---` separator', e10f: 'Add `---` between YAML documents',
    comparisonTitle: 'YAML vs JSON vs TOML',
    feature: 'Feature',
    bestPracticesTitle: 'Validation Best Practices',
    bp1: 'Always use a YAML linter in your CI/CD pipeline',
    bp2: 'Configure your editor to show whitespace characters',
    bp3: 'Use 2-space indentation (most common convention)',
    bp4: 'Quote strings that could be misinterpreted (booleans, numbers with leading zeros)',
    bp5: 'Use YAML schema validation for complex configurations',
    bp6: 'Keep YAML files small and modular when possible',
    faqTitle: 'FAQ',
    faq1q: 'Can I use tabs in YAML?',
    faq1a: 'No. YAML strictly forbids tab characters for indentation. You must use spaces. Most editors can be configured to insert spaces when you press the Tab key.',
    faq2q: 'What\'s the difference between single and double quotes in YAML?',
    faq2a: 'Single quotes preserve literal strings (no escape sequences). Double quotes allow escape sequences like \\n, \\t, and Unicode escapes \\uXXXX. Use single quotes for simple strings and double quotes when you need escape characters.',
    faq3q: 'How do I represent null in YAML?',
    faq3a: 'You can use `null`, `~`, or simply leave the value empty. All three are equivalent: `key: null`, `key: ~`, and `key:` (with nothing after colon+space).',
    faq4q: 'Why does YAML treat "NO" as false?',
    faq4a: 'YAML 1.1 specification treats yes/no, on/off, true/false (case-insensitive) as boolean values. YAML 1.2 fixed this to only recognize true/false. To be safe, always quote strings that could be interpreted as booleans.',
  },
  zh: {
    title: 'YAML 语法与验证：常见错误及修复方法',
    intro: 'YAML 是 Docker、Kubernetes、CI/CD 流水线和无数其他工具的首选配置格式。尽管语法对人类友好，但 YAML 出错却出奇地容易。本指南涵盖最常见的 YAML 错误及修复方法。',
    whereTitle: 'YAML 的使用场景',
    where1: 'Docker Compose (docker-compose.yml)',
    where2: 'Kubernetes 清单文件',
    where3: 'GitHub Actions / GitLab CI 工作流',
    where4: 'Ansible 剧本',
    where5: '配置文件（Prettier、ESLint 等）',
    syntaxTitle: '基本 YAML 语法规则',
    indentTitle: '缩进',
    indentDesc: 'YAML 使用空格（不能用制表符）进行缩进。同一层级的空格数必须一致：',
    kvTitle: '键值对',
    kvDesc: '键和值之间用冒号加空格分隔：',
    commentTitle: '注释',
    commentDesc: '注释以 # 开头，延续到行末：',
    multilineTitle: '多行字符串',
    multilineDesc: 'YAML 提供两种块标量样式来处理多行字符串：',
    typesTitle: 'YAML 数据类型',
    type: '类型', syntax: '语法', example: '示例', note: '注意',
    norwayTitle: '"挪威问题"',
    norwayDesc: '在 YAML 1.1 中，`NO`（如挪威的国家代码）会被解释为布尔值 `false`。因为 YAML 1.1 将 yes/no、on/off、true/false 视为布尔值。务必给国家代码等类似值加引号：',
    collectionsTitle: '集合：列表和映射',
    listTitle: '列表（序列）', mapTitle: '嵌套映射', inlineTitle: '内联/流式语法',
    errorsTitle: '十大常见 YAML 错误',
    errorNum: '#', error: '错误', cause: '原因', fix: '修复',
    e1: 'Tab 字符错误', e1c: '使用制表符缩进', e1f: '将所有制表符替换为空格（2或4个）',
    e2: '不一致的缩进', e2c: '混用 2 空格和 4 空格缩进', e2f: '在整个文件中使用一致的缩进',
    e3: '冒号后缺少空格', e3c: '写成 `key:value` 而非 `key: value`', e3f: '冒号后始终加一个空格',
    e4: '未引用的特殊字符', e4c: '值包含 : 或 # 但未加引号', e4f: '给包含特殊字符的字符串加引号',
    e5: '布尔值强制转换', e5c: 'yes/no/on/off/NO 被解释为布尔值', e5f: '给看起来像布尔值的值加引号：`"yes"`、`"NO"`',
    e6: '包含冒号的字符串', e6c: '`url: http://example.com` 在第二个冒号处断开', e6f: '给整个值加引号：`url: "http://example.com"`',
    e7: '重复的键', e7c: '同一个映射中出现两次相同的键', e7f: '删除重复的键（最后一个生效，但容易出错）',
    e8: '尾部空白', e8c: '值后面有不可见的空格', e8f: '配置编辑器自动删除尾部空白',
    e9: '列表缩进错误', e9c: '列表项与父键未对齐', e9f: '将 `-` 与子缩进层级对齐',
    e10: '缺少文档分隔符', e10c: '多个文档之间没有 `---` 分隔', e10f: '在 YAML 文档之间添加 `---`',
    comparisonTitle: 'YAML vs JSON vs TOML',
    feature: '特性',
    bestPracticesTitle: '验证最佳实践',
    bp1: '始终在 CI/CD 流水线中使用 YAML 校验器',
    bp2: '配置编辑器显示空白字符',
    bp3: '使用 2 空格缩进（最常见约定）',
    bp4: '给可能被误解的字符串加引号（布尔值、前导零的数字）',
    bp5: '对复杂配置使用 YAML 模式验证',
    bp6: '尽可能保持 YAML 文件小而模块化',
    faqTitle: '常见问题',
    faq1q: 'YAML 中可以使用制表符吗？',
    faq1a: '不可以。YAML 严格禁止使用制表符缩进，必须使用空格。大多数编辑器可以配置为按 Tab 键时插入空格。',
    faq2q: 'YAML 中单引号和双引号的区别？',
    faq2a: '单引号保留字面字符串（无转义序列）。双引号允许转义序列如 \\n、\\t 和 Unicode 转义。简单字符串用单引号，需要转义字符时用双引号。',
    faq3q: '如何在 YAML 中表示 null？',
    faq3a: '可以使用 `null`、`~` 或直接留空。三种方式等价：`key: null`、`key: ~` 和 `key:`。',
    faq4q: '为什么 YAML 将 "NO" 视为 false？',
    faq4a: 'YAML 1.1 规范将 yes/no、on/off、true/false（不区分大小写）视为布尔值。YAML 1.2 修复了此问题，仅识别 true/false。为安全起见，始终给可能被解释为布尔值的字符串加引号。',
  },
  ja: {
    title: 'YAML構文と検証：よくあるエラーと修正方法',
    intro: 'YAMLはDocker、Kubernetes、CI/CDパイプラインなど多くのツールで使用される設定フォーマットです。人間に優しい構文にもかかわらず、間違いやすい部分があります。',
    whereTitle: 'YAMLの使用場所', where1: 'Docker Compose', where2: 'Kubernetesマニフェスト', where3: 'GitHub Actions / GitLab CI', where4: 'Ansible Playbook', where5: '設定ファイル',
    syntaxTitle: '基本構文ルール', indentTitle: 'インデント', indentDesc: 'YAMLはスペース（タブは不可）でインデントします：',
    kvTitle: 'キー・バリューペア', kvDesc: 'コロンとスペースで区切ります：',
    commentTitle: 'コメント', commentDesc: '#で始まり行末まで続きます：',
    multilineTitle: '複数行文字列', multilineDesc: 'YAMLは2つのブロックスカラースタイルを提供します：',
    typesTitle: 'データ型', type: '型', syntax: '構文', example: '例', note: '注意',
    norwayTitle: '「ノルウェー問題」', norwayDesc: 'YAML 1.1では`NO`がboolean `false`として解釈されます。引用符を使いましょう：',
    collectionsTitle: 'コレクション', listTitle: 'リスト', mapTitle: 'ネストマップ', inlineTitle: 'インラインスタイル',
    errorsTitle: 'よくある10のエラー', errorNum: '#', error: 'エラー', cause: '原因', fix: '修正',
    e1: 'タブ文字エラー', e1c: 'タブ文字でインデント', e1f: 'スペースに置換',
    e2: '不統一なインデント', e2c: '2スペースと4スペースの混在', e2f: '統一したインデントを使用',
    e3: 'コロン後のスペース欠落', e3c: '`key:value`と書く', e3f: 'コロン後にスペースを入れる',
    e4: '引用符なしの特殊文字', e4c: ':や#を含む値に引用符なし', e4f: '特殊文字を含む文字列を引用',
    e5: 'ブール値の暗黙変換', e5c: 'yes/no/on/offがブール値に', e5f: '引用符で囲む',
    e6: 'コロンを含む文字列', e6c: 'URLの2番目のコロンで切れる', e6f: '値全体を引用',
    e7: '重複キー', e7c: '同じキーが2回出現', e7f: '重複キーを削除',
    e8: '末尾の空白', e8c: '値の後に不可視のスペース', e8f: 'エディタで末尾空白を削除',
    e9: 'リストインデントエラー', e9c: 'リスト項目が親キーと揃っていない', e9f: 'インデントレベルを揃える',
    e10: 'ドキュメント区切り欠落', e10c: '複数ドキュメントに`---`なし', e10f: '`---`を追加',
    comparisonTitle: 'YAML vs JSON vs TOML', feature: '機能',
    bestPracticesTitle: 'ベストプラクティス',
    bp1: 'CI/CDでYAMLリンターを使用', bp2: 'エディタで空白文字を表示', bp3: '2スペースインデントを使用',
    bp4: '誤解される可能性のある文字列を引用', bp5: 'スキーマバリデーションを使用', bp6: 'ファイルを小さくモジュラーに',
    faqTitle: 'FAQ',
    faq1q: 'YAMLでタブは使えますか？', faq1a: 'いいえ。YAMLはインデントにタブ文字を厳格に禁止しています。',
    faq2q: 'シングルクォートとダブルクォートの違いは？', faq2a: 'シングルクォートはリテラル文字列、ダブルクォートはエスケープシーケンスを許可します。',
    faq3q: 'YAMLでnullを表現するには？', faq3a: '`null`、`~`、または空の値を使用します。',
    faq4q: 'なぜYAMLは"NO"をfalseとして扱うのですか？', faq4a: 'YAML 1.1仕様がyes/no等をブール値として扱うためです。YAML 1.2ではtrue/falseのみ認識します。',
  },
  ko: {
    title: 'YAML 문법 & 검증: 일반적인 오류와 해결 방법',
    intro: 'YAML은 Docker, Kubernetes, CI/CD 파이프라인 등 수많은 도구의 설정 포맷입니다. 사람에게 친화적인 문법이지만 놀라울 정도로 실수하기 쉽습니다.',
    whereTitle: 'YAML 사용처', where1: 'Docker Compose', where2: 'Kubernetes 매니페스트', where3: 'GitHub Actions / GitLab CI', where4: 'Ansible 플레이북', where5: '설정 파일',
    syntaxTitle: '기본 문법 규칙', indentTitle: '들여쓰기', indentDesc: 'YAML은 공백(탭 불가)으로 들여쓰기합니다:',
    kvTitle: '키-값 쌍', kvDesc: '콜론과 공백으로 구분합니다:', commentTitle: '주석', commentDesc: '#으로 시작하여 줄 끝까지:',
    multilineTitle: '여러 줄 문자열', multilineDesc: 'YAML은 두 가지 블록 스칼라 스타일을 제공합니다:',
    typesTitle: '데이터 타입', type: '타입', syntax: '문법', example: '예시', note: '참고',
    norwayTitle: '"노르웨이 문제"', norwayDesc: 'YAML 1.1에서 `NO`는 boolean `false`로 해석됩니다. 따옴표를 사용하세요:',
    collectionsTitle: '컬렉션', listTitle: '리스트', mapTitle: '중첩 맵', inlineTitle: '인라인 스타일',
    errorsTitle: '흔한 10가지 YAML 오류', errorNum: '#', error: '오류', cause: '원인', fix: '해결',
    e1: '탭 문자 오류', e1c: '탭으로 들여쓰기', e1f: '공백으로 교체',
    e2: '일관성 없는 들여쓰기', e2c: '2칸과 4칸 혼용', e2f: '일관된 들여쓰기 사용',
    e3: '콜론 뒤 공백 누락', e3c: '`key:value`로 작성', e3f: '콜론 뒤에 공백 추가',
    e4: '따옴표 없는 특수문자', e4c: ':나 #을 포함한 값에 따옴표 없음', e4f: '특수문자 포함 문자열에 따옴표',
    e5: '불리언 강제 변환', e5c: 'yes/no가 불리언으로', e5f: '따옴표로 감싸기',
    e6: '콜론 포함 문자열', e6c: 'URL의 두 번째 콜론에서 끊김', e6f: '전체 값을 따옴표로',
    e7: '중복 키', e7c: '같은 키가 두 번 등장', e7f: '중복 키 제거',
    e8: '후행 공백', e8c: '값 뒤의 보이지 않는 공백', e8f: '편집기에서 후행 공백 제거',
    e9: '리스트 들여쓰기 오류', e9c: '리스트 항목이 부모 키와 정렬 안 됨', e9f: '들여쓰기 수준 맞추기',
    e10: '문서 구분자 누락', e10c: '여러 문서에 `---` 없음', e10f: '`---` 추가',
    comparisonTitle: 'YAML vs JSON vs TOML', feature: '기능',
    bestPracticesTitle: '모범 사례',
    bp1: 'CI/CD에서 YAML 린터 사용', bp2: '편집기에서 공백 문자 표시', bp3: '2칸 들여쓰기 사용',
    bp4: '오해될 수 있는 문자열에 따옴표', bp5: '스키마 검증 사용', bp6: '파일을 작고 모듈화',
    faqTitle: 'FAQ',
    faq1q: 'YAML에서 탭을 사용할 수 있나요?', faq1a: '아니요. YAML은 들여쓰기에 탭 문자를 엄격히 금지합니다.',
    faq2q: '작은따옴표와 큰따옴표의 차이는?', faq2a: '작은따옴표는 리터럴 문자열, 큰따옴표는 이스케이프 시퀀스를 허용합니다.',
    faq3q: 'YAML에서 null을 표현하려면?', faq3a: '`null`, `~`, 또는 빈 값을 사용합니다.',
    faq4q: '왜 YAML은 "NO"를 false로 처리하나요?', faq4a: 'YAML 1.1 사양이 yes/no 등을 불리언으로 처리하기 때문입니다. YAML 1.2에서는 true/false만 인식합니다.',
  },
  fr: {
    title: 'Syntaxe YAML et validation : Erreurs courantes et solutions',
    intro: 'YAML est le format de configuration incontournable pour Docker, Kubernetes et les pipelines CI/CD. Malgré sa syntaxe lisible, il est étonnamment facile de se tromper.',
    whereTitle: 'Où YAML est utilisé', where1: 'Docker Compose', where2: 'Manifestes Kubernetes', where3: 'GitHub Actions / GitLab CI', where4: 'Playbooks Ansible', where5: 'Fichiers de configuration',
    syntaxTitle: 'Règles de syntaxe de base', indentTitle: 'Indentation', indentDesc: 'YAML utilise des espaces (jamais de tabulations) :',
    kvTitle: 'Paires clé-valeur', kvDesc: 'Séparées par deux-points et espace :', commentTitle: 'Commentaires', commentDesc: 'Commencent par # :',
    multilineTitle: 'Chaînes multi-lignes', multilineDesc: 'YAML offre deux styles de scalaires bloc :',
    typesTitle: 'Types de données', type: 'Type', syntax: 'Syntaxe', example: 'Exemple', note: 'Note',
    norwayTitle: 'Le "problème norvégien"', norwayDesc: 'En YAML 1.1, `NO` est interprété comme `false`. Mettez les codes pays entre guillemets :',
    collectionsTitle: 'Collections', listTitle: 'Listes', mapTitle: 'Maps imbriquées', inlineTitle: 'Style inline',
    errorsTitle: 'Top 10 des erreurs YAML', errorNum: '#', error: 'Erreur', cause: 'Cause', fix: 'Solution',
    e1: 'Erreur de tabulation', e1c: 'Tabulations pour l\'indentation', e1f: 'Remplacer par des espaces',
    e2: 'Indentation incohérente', e2c: 'Mélange 2 et 4 espaces', e2f: 'Utiliser une indentation cohérente',
    e3: 'Espace manquant après deux-points', e3c: '`key:value`', e3f: 'Ajouter un espace après `:`',
    e4: 'Caractères spéciaux non quotés', e4c: 'Valeurs avec : ou # sans guillemets', e4f: 'Mettre entre guillemets',
    e5: 'Coercition booléenne', e5c: 'yes/no interprétés comme booléens', e5f: 'Mettre entre guillemets',
    e6: 'Chaînes avec deux-points', e6c: 'URLs cassées au 2e deux-points', e6f: 'Quoter la valeur entière',
    e7: 'Clés dupliquées', e7c: 'Même clé deux fois', e7f: 'Supprimer les doublons',
    e8: 'Espaces en fin de ligne', e8c: 'Espaces invisibles', e8f: 'Configurer l\'éditeur',
    e9: 'Indentation de liste erronée', e9c: 'Items non alignés', e9f: 'Aligner les `-`',
    e10: 'Séparateur de document manquant', e10c: 'Documents multiples sans `---`', e10f: 'Ajouter `---`',
    comparisonTitle: 'YAML vs JSON vs TOML', feature: 'Fonctionnalité',
    bestPracticesTitle: 'Bonnes pratiques',
    bp1: 'Utiliser un linter YAML en CI/CD', bp2: 'Afficher les espaces dans l\'éditeur', bp3: 'Utiliser 2 espaces',
    bp4: 'Quoter les chaînes ambiguës', bp5: 'Utiliser la validation de schéma', bp6: 'Garder les fichiers petits',
    faqTitle: 'FAQ',
    faq1q: 'Peut-on utiliser des tabulations en YAML ?', faq1a: 'Non. YAML interdit strictement les tabulations pour l\'indentation.',
    faq2q: 'Différence entre guillemets simples et doubles ?', faq2a: 'Simples : chaîne littérale. Doubles : séquences d\'échappement autorisées.',
    faq3q: 'Comment représenter null ?', faq3a: 'Utilisez `null`, `~`, ou laissez la valeur vide.',
    faq4q: 'Pourquoi YAML traite "NO" comme false ?', faq4a: 'YAML 1.1 traite yes/no comme booléens. YAML 1.2 ne reconnaît que true/false.',
  },
  de: {
    title: 'YAML Syntax & Validierung: Häufige Fehler und Lösungen',
    intro: 'YAML ist das Standard-Konfigurationsformat für Docker, Kubernetes und CI/CD-Pipelines. Trotz der menschenfreundlichen Syntax ist es überraschend fehleranfällig.',
    whereTitle: 'Wo YAML verwendet wird', where1: 'Docker Compose', where2: 'Kubernetes Manifeste', where3: 'GitHub Actions / GitLab CI', where4: 'Ansible Playbooks', where5: 'Konfigurationsdateien',
    syntaxTitle: 'Grundlegende Syntaxregeln', indentTitle: 'Einrückung', indentDesc: 'YAML verwendet Leerzeichen (keine Tabs):',
    kvTitle: 'Schlüssel-Wert-Paare', kvDesc: 'Durch Doppelpunkt und Leerzeichen getrennt:', commentTitle: 'Kommentare', commentDesc: 'Beginnen mit #:',
    multilineTitle: 'Mehrzeilige Strings', multilineDesc: 'YAML bietet zwei Block-Skalar-Stile:',
    typesTitle: 'Datentypen', type: 'Typ', syntax: 'Syntax', example: 'Beispiel', note: 'Hinweis',
    norwayTitle: 'Das "Norwegen-Problem"', norwayDesc: 'In YAML 1.1 wird `NO` als boolean `false` interpretiert:',
    collectionsTitle: 'Sammlungen', listTitle: 'Listen', mapTitle: 'Verschachtelte Maps', inlineTitle: 'Inline-Stil',
    errorsTitle: 'Top 10 YAML-Fehler', errorNum: '#', error: 'Fehler', cause: 'Ursache', fix: 'Lösung',
    e1: 'Tab-Zeichen', e1c: 'Tabs für Einrückung', e1f: 'Durch Leerzeichen ersetzen',
    e2: 'Inkonsistente Einrückung', e2c: '2 und 4 Leerzeichen gemischt', e2f: 'Einheitlich einrücken',
    e3: 'Fehlendes Leerzeichen', e3c: '`key:value`', e3f: 'Leerzeichen nach `:` einfügen',
    e4: 'Ungequotete Sonderzeichen', e4c: 'Werte mit : oder # ohne Anführungszeichen', e4f: 'In Anführungszeichen setzen',
    e5: 'Boolean-Konvertierung', e5c: 'yes/no als Boolean', e5f: 'Anführungszeichen verwenden',
    e6: 'Strings mit Doppelpunkt', e6c: 'URLs brechen', e6f: 'Gesamten Wert quoten',
    e7: 'Doppelte Schlüssel', e7c: 'Gleicher Schlüssel zweimal', e7f: 'Duplikate entfernen',
    e8: 'Nachfolgende Leerzeichen', e8c: 'Unsichtbare Leerzeichen', e8f: 'Editor konfigurieren',
    e9: 'Listen-Einrückungsfehler', e9c: 'Items nicht ausgerichtet', e9f: '`-` ausrichten',
    e10: 'Fehlender Dokumenttrenner', e10c: 'Mehrere Dokumente ohne `---`', e10f: '`---` hinzufügen',
    comparisonTitle: 'YAML vs JSON vs TOML', feature: 'Funktion',
    bestPracticesTitle: 'Best Practices',
    bp1: 'YAML-Linter in CI/CD verwenden', bp2: 'Leerzeichen im Editor anzeigen', bp3: '2 Leerzeichen verwenden',
    bp4: 'Mehrdeutige Strings quoten', bp5: 'Schema-Validierung nutzen', bp6: 'Dateien klein und modular halten',
    faqTitle: 'FAQ',
    faq1q: 'Kann man Tabs in YAML verwenden?', faq1a: 'Nein. YAML verbietet strikt Tab-Zeichen für die Einrückung.',
    faq2q: 'Unterschied zwischen einfachen und doppelten Anführungszeichen?', faq2a: 'Einfache: literale Strings. Doppelte: Escape-Sequenzen erlaubt.',
    faq3q: 'Wie stellt man null dar?', faq3a: '`null`, `~`, oder leerer Wert.',
    faq4q: 'Warum behandelt YAML "NO" als false?', faq4a: 'YAML 1.1 behandelt yes/no als Boolean. YAML 1.2 erkennt nur true/false.',
  },
  es: {
    title: 'Sintaxis YAML y validación: Errores comunes y cómo solucionarlos',
    intro: 'YAML es el formato de configuración preferido para Docker, Kubernetes y pipelines CI/CD. A pesar de su sintaxis amigable, es sorprendentemente fácil cometer errores.',
    whereTitle: 'Dónde se usa YAML', where1: 'Docker Compose', where2: 'Manifiestos Kubernetes', where3: 'GitHub Actions / GitLab CI', where4: 'Playbooks Ansible', where5: 'Archivos de configuración',
    syntaxTitle: 'Reglas de sintaxis básicas', indentTitle: 'Indentación', indentDesc: 'YAML usa espacios (nunca tabulaciones):',
    kvTitle: 'Pares clave-valor', kvDesc: 'Separados por dos puntos y espacio:', commentTitle: 'Comentarios', commentDesc: 'Empiezan con #:',
    multilineTitle: 'Strings multilínea', multilineDesc: 'YAML ofrece dos estilos para strings multilínea:',
    typesTitle: 'Tipos de datos', type: 'Tipo', syntax: 'Sintaxis', example: 'Ejemplo', note: 'Nota',
    norwayTitle: 'El "problema Noruega"', norwayDesc: 'En YAML 1.1, `NO` se interpreta como `false`. Use comillas:',
    collectionsTitle: 'Colecciones', listTitle: 'Listas', mapTitle: 'Maps anidados', inlineTitle: 'Estilo inline',
    errorsTitle: 'Top 10 errores YAML', errorNum: '#', error: 'Error', cause: 'Causa', fix: 'Solución',
    e1: 'Error de tabulación', e1c: 'Tabs para indentar', e1f: 'Reemplazar con espacios',
    e2: 'Indentación inconsistente', e2c: 'Mezcla de 2 y 4 espacios', e2f: 'Usar indentación consistente',
    e3: 'Espacio faltante', e3c: '`key:value`', e3f: 'Agregar espacio después de `:`',
    e4: 'Caracteres especiales sin comillas', e4c: 'Valores con : o # sin comillas', e4f: 'Poner entre comillas',
    e5: 'Coerción booleana', e5c: 'yes/no como booleanos', e5f: 'Usar comillas',
    e6: 'Strings con dos puntos', e6c: 'URLs rotas', e6f: 'Citar el valor completo',
    e7: 'Claves duplicadas', e7c: 'Misma clave dos veces', e7f: 'Eliminar duplicados',
    e8: 'Espacios al final', e8c: 'Espacios invisibles', e8f: 'Configurar editor',
    e9: 'Error de indentación de lista', e9c: 'Items no alineados', e9f: 'Alinear `-`',
    e10: 'Separador de documento faltante', e10c: 'Múltiples documentos sin `---`', e10f: 'Agregar `---`',
    comparisonTitle: 'YAML vs JSON vs TOML', feature: 'Característica',
    bestPracticesTitle: 'Mejores prácticas',
    bp1: 'Usar linter YAML en CI/CD', bp2: 'Mostrar espacios en el editor', bp3: 'Usar 2 espacios',
    bp4: 'Citar strings ambiguos', bp5: 'Usar validación de esquema', bp6: 'Mantener archivos pequeños y modulares',
    faqTitle: 'FAQ',
    faq1q: '¿Se pueden usar tabulaciones en YAML?', faq1a: 'No. YAML prohíbe estrictamente las tabulaciones para la indentación.',
    faq2q: '¿Diferencia entre comillas simples y dobles?', faq2a: 'Simples: string literal. Dobles: permiten secuencias de escape.',
    faq3q: '¿Cómo representar null?', faq3a: '`null`, `~`, o valor vacío.',
    faq4q: '¿Por qué YAML trata "NO" como false?', faq4a: 'YAML 1.1 trata yes/no como booleanos. YAML 1.2 solo reconoce true/false.',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };

export default function YamlSyntaxValidationGuide({ lang }: { lang: string }) {
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
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{t.intro}</p>

      <h2 style={h2Style}>{t.whereTitle}</h2>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 24 }}>
        <li>{t.where1}</li><li>{t.where2}</li><li>{t.where3}</li><li>{t.where4}</li><li>{t.where5}</li>
      </ul>

      <h2 style={h2Style}>{t.syntaxTitle}</h2>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' }}>{t.indentTitle}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.indentDesc}</p>
      <pre style={codeStyle}><code>{`# ✅ Correct (2-space indentation)
server:
  host: localhost
  port: 8080
  database:
    name: myapp
    pool: 10

# ❌ Wrong (tab characters or inconsistent spaces)
server:
\thost: localhost    # Tab character - INVALID!
   port: 8080        # 3 spaces - inconsistent!`}</code></pre>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' }}>{t.kvTitle}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.kvDesc}</p>
      <pre style={codeStyle}><code>{`# ✅ Correct
name: John Doe
port: 8080

# ❌ Wrong - missing space after colon
name:John Doe`}</code></pre>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' }}>{t.multilineTitle}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.multilineDesc}</p>
      <pre style={codeStyle}><code>{`# | (literal block) - preserves newlines
description: |
  This is line one.
  This is line two.
  Each newline is preserved.

# > (folded block) - folds newlines to spaces
description: >
  This is a long paragraph
  that will be joined into
  a single line.`}</code></pre>

      <h2 style={h2Style}>{t.typesTitle}</h2>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>{t.type}</th><th style={thStyle}>{t.syntax}</th><th style={thStyle}>{t.example}</th></tr></thead>
        <tbody>
          <tr><td style={tdStyle}>String</td><td style={{...tdStyle, fontFamily: 'monospace'}}>plain, &quot;quoted&quot;, &apos;quoted&apos;</td><td style={{...tdStyle, fontFamily: 'monospace'}}>name: John</td></tr>
          <tr><td style={tdStyle}>Integer</td><td style={{...tdStyle, fontFamily: 'monospace'}}>42, 0xFF, 0o77</td><td style={{...tdStyle, fontFamily: 'monospace'}}>port: 8080</td></tr>
          <tr><td style={tdStyle}>Float</td><td style={{...tdStyle, fontFamily: 'monospace'}}>3.14, .inf, .nan</td><td style={{...tdStyle, fontFamily: 'monospace'}}>pi: 3.14159</td></tr>
          <tr><td style={tdStyle}>Boolean</td><td style={{...tdStyle, fontFamily: 'monospace'}}>true/false</td><td style={{...tdStyle, fontFamily: 'monospace'}}>debug: true</td></tr>
          <tr><td style={tdStyle}>Null</td><td style={{...tdStyle, fontFamily: 'monospace'}}>null, ~, (empty)</td><td style={{...tdStyle, fontFamily: 'monospace'}}>value: null</td></tr>
          <tr><td style={tdStyle}>Date</td><td style={{...tdStyle, fontFamily: 'monospace'}}>YYYY-MM-DD</td><td style={{...tdStyle, fontFamily: 'monospace'}}>date: 2026-02-10</td></tr>
        </tbody>
      </table>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--accent-rose)' }}>{t.norwayTitle}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.norwayDesc}</p>
      <pre style={codeStyle}><code>{`# ❌ YAML 1.1 interprets these as booleans!
country: NO        # → false
answer: yes        # → true
switch: on         # → true

# ✅ Fix: quote the values
country: "NO"      # → string "NO"
answer: "yes"      # → string "yes"
switch: "on"       # → string "on"`}</code></pre>

      <h2 style={h2Style}>{t.collectionsTitle}</h2>
      <pre style={codeStyle}><code>{`# List (sequence)
fruits:
  - apple
  - banana
  - cherry

# Nested map
database:
  host: localhost
  port: 5432
  credentials:
    user: admin
    password: secret

# Inline / Flow style
fruits: [apple, banana, cherry]
point: {x: 10, y: 20}`}</code></pre>

      <h2 style={h2Style}>{t.errorsTitle}</h2>
      <table style={tableStyle}>
        <thead><tr><th style={{...thStyle, width: 40}}>{t.errorNum}</th><th style={thStyle}>{t.error}</th><th style={thStyle}>{t.cause}</th><th style={thStyle}>{t.fix}</th></tr></thead>
        <tbody>
          {[
            [t.e1, t.e1c, t.e1f], [t.e2, t.e2c, t.e2f], [t.e3, t.e3c, t.e3f],
            [t.e4, t.e4c, t.e4f], [t.e5, t.e5c, t.e5f], [t.e6, t.e6c, t.e6f],
            [t.e7, t.e7c, t.e7f], [t.e8, t.e8c, t.e8f], [t.e9, t.e9c, t.e9f],
            [t.e10, t.e10c, t.e10f],
          ].map((row, i) => (
            <tr key={i}>
              <td style={{...tdStyle, fontWeight: 700}}>{i + 1}</td>
              <td style={{...tdStyle, fontWeight: 600}}>{row[0]}</td>
              <td style={tdStyle}>{row[1]}</td>
              <td style={tdStyle}>{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={h2Style}>{t.comparisonTitle}</h2>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>{t.feature}</th><th style={thStyle}>YAML</th><th style={thStyle}>JSON</th><th style={thStyle}>TOML</th></tr></thead>
        <tbody>
          <tr><td style={{...tdStyle, fontWeight: 600}}>Comments</td><td style={tdStyle}># support</td><td style={tdStyle}>None</td><td style={tdStyle}># support</td></tr>
          <tr><td style={{...tdStyle, fontWeight: 600}}>Multi-line strings</td><td style={tdStyle}>| and &gt;</td><td style={tdStyle}>\\n only</td><td style={tdStyle}>&quot;&quot;&quot; triple quotes</td></tr>
          <tr><td style={{...tdStyle, fontWeight: 600}}>Data types</td><td style={tdStyle}>Rich (dates, etc.)</td><td style={tdStyle}>Basic (6 types)</td><td style={tdStyle}>Rich (dates, etc.)</td></tr>
          <tr><td style={{...tdStyle, fontWeight: 600}}>Readability</td><td style={tdStyle}>High</td><td style={tdStyle}>Medium</td><td style={tdStyle}>High</td></tr>
          <tr><td style={{...tdStyle, fontWeight: 600}}>Machine parsing</td><td style={tdStyle}>Complex</td><td style={tdStyle}>Simple</td><td style={tdStyle}>Medium</td></tr>
          <tr><td style={{...tdStyle, fontWeight: 600}}>Best for</td><td style={tdStyle}>Config files</td><td style={tdStyle}>APIs, data exchange</td><td style={tdStyle}>App config</td></tr>
        </tbody>
      </table>

      <h2 style={h2Style}>{t.bestPracticesTitle}</h2>
      <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 24 }}>
        <li>{t.bp1}</li><li>{t.bp2}</li><li>{t.bp3}</li><li>{t.bp4}</li><li>{t.bp5}</li><li>{t.bp6}</li>
      </ul>

      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        { q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a },
        { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a },
      ].map((faq, i) => (
        <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>{faq.q}</summary>
          <p style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
