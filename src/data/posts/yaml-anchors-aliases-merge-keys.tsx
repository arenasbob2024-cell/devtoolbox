'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'YAML Anchors, Aliases & Merge Keys: The Complete DRY Guide',
    intro: 'YAML anchors and aliases let you define a value once and reuse it throughout your document, following the DRY (Don\'t Repeat Yourself) principle. Combined with merge keys (<<), you can build composable, maintainable configuration files for Docker Compose, GitHub Actions, GitLab CI, Kubernetes, and more. This guide covers everything from basic syntax to advanced patterns and common pitfalls.',

    whatTitle: '1. What Are Anchors & Aliases?',
    whatP1: 'In YAML, an anchor is a marker you attach to a node (scalar, mapping, or sequence) using the & character followed by a name. An alias is a reference to that anchor using the * character followed by the same name. When the YAML parser encounters an alias, it substitutes the anchored value in place.',
    whatP2: 'This mechanism is part of the YAML 1.1 and 1.2 specifications, meaning it works with any compliant parser including PyYAML, js-yaml, SnakeYAML, ruamel.yaml, and go-yaml.',
    whatP3: 'Anchors and aliases are the native YAML way to avoid repeating yourself. Instead of copying the same block of configuration multiple times, you define it once and reference it everywhere else.',
    whatR1: '&name creates an anchor on a node',
    whatR2: '*name creates an alias (reference) to that anchor',
    whatR3: 'Anchors must be defined before they are referenced',
    whatR4: 'Anchor names can contain alphanumeric characters, hyphens, and underscores',
    whatR5: 'Aliases produce an identical copy of the anchored node',

    basicTitle: '2. Basic Anchor & Alias Syntax',
    basicDesc: 'The simplest use of anchors and aliases is with scalar values (strings, numbers, booleans). You attach an anchor to a value and then reference it elsewhere in the same document.',
    basicScalarTitle: 'Scalar anchors:',
    basicScalarNote: 'This is useful when you have a value like a database host, port, or version number that appears in multiple places.',
    basicResult: 'After parsing, db_host in both connection_string and backup_host resolves to "postgres.example.com".',
    basicMultiTitle: 'Multiple anchors in the same document:',

    anchorObjTitle: '3. Anchoring Objects (Mappings)',
    anchorObjDesc: 'The real power of anchors comes from anchoring entire mappings (objects). You can define a complete configuration block once and reuse it across your document.',
    anchorObjP1: 'When you anchor a mapping, the alias produces a complete copy of every key-value pair in that mapping.',
    anchorObjNote: 'Both api_server and worker_server will have the identical logging configuration. If you change the anchor, all aliases update automatically.',
    anchorObjOverrideTitle: 'Anchoring nested objects:',
    anchorObjOverrideNote: 'The staging environment gets the exact same database configuration as production. This ensures consistency across environments.',

    mergeTitle: '4. Merge Key (<<): Merging Mappings',
    mergeDesc: 'The merge key (<<) is a YAML extension that lets you merge an anchored mapping into another mapping while allowing you to override specific fields. This is far more useful than plain aliases for configuration files.',
    mergeP1: 'With <<: *alias, all keys from the anchored mapping are inserted into the current mapping. If the current mapping already defines a key that exists in the anchor, the local value wins (local takes precedence).',
    mergeNote: 'The staging service inherits image, environment, and volumes from the defaults, but overrides the ports to use 8081 instead of 8080.',
    mergeOverrideTitle: 'Override precedence:',
    mergeOverrideDesc: 'Local keys always take precedence over merged keys. This is the fundamental rule of merge keys.',

    multiMergeTitle: '5. Multiple Merges & Precedence',
    multiMergeDesc: 'You can merge from multiple anchors at once by passing a list to the << key. When merging multiple anchors, the first anchor in the list has the highest precedence among the merged values, and local keys still override everything.',
    multiMergeP1: 'Precedence order (highest to lowest):',
    multiMergeR1: '1. Local keys defined in the current mapping',
    multiMergeR2: '2. First anchor in the merge list',
    multiMergeR3: '3. Second anchor in the merge list',
    multiMergeR4: '4. Third anchor in the merge list, and so on',
    multiMergeNote: 'In the production service, the port comes from the local definition (9090), the image comes from the first merge (*app_defaults), and any remaining keys come from subsequent merges.',

    anchorArrayTitle: '6. Anchoring Arrays (Sequences)',
    anchorArrayDesc: 'You can anchor entire arrays (sequences) just like scalars and mappings. However, there is an important limitation: you cannot merge arrays the way you merge mappings with <<.',
    anchorArrayP1: 'Array anchors work with simple aliasing:',
    anchorArrayLimit: 'Limitation: There is no native "array merge" in YAML. You cannot use << with sequences to combine two lists. If you need to extend an array, you must repeat the values or use a tool-specific feature.',
    anchorArrayWorkaround: 'Workaround for extending arrays:',
    anchorArrayNote: 'Some tools like Docker Compose handle array merging in their own way, but this is tool-specific behavior, not standard YAML.',

    dockerTitle: '7. Docker Compose: x- Extension Fields',
    dockerDesc: 'Docker Compose is the most popular real-world use case for YAML anchors. Starting with Compose file format 3.4+, you can use x- prefixed top-level keys as extension fields to hold your anchor definitions. Docker Compose ignores any top-level key starting with x-.',
    dockerP1: 'This pattern is the recommended way to share configuration across services:',
    dockerNote: 'The x-defaults key is ignored by Docker Compose but serves as a home for your anchor. Each service merges the defaults and overrides what it needs.',
    dockerAdvTitle: 'Advanced Docker Compose with multiple anchors:',
    dockerAdvNote: 'By combining multiple x- extension fields, you can build a composable configuration where services pick and choose which defaults they inherit.',

    ghaTitle: '8. GitHub Actions: Reusable Steps with Anchors',
    ghaDesc: 'GitHub Actions YAML workflows support anchors and aliases, though with some caveats. Anchors work within a single workflow file but not across files.',
    ghaP1: 'Common patterns include reusing environment variables, step configurations, and matrix definitions:',
    ghaNote: 'Note: GitHub Actions has its own reuse mechanisms (reusable workflows, composite actions) that work across files. Anchors are best for reducing repetition within a single workflow file.',

    gitlabTitle: '9. GitLab CI: Template Jobs with Anchors',
    gitlabDesc: 'GitLab CI has first-class support for hidden jobs (prefixed with a dot) that serve as templates. You can use YAML anchors or GitLab\'s extends keyword to achieve similar results.',
    gitlabP1: 'Using anchors vs extends:',
    gitlabAnchorsTitle: 'Using YAML anchors:',
    gitlabExtendsTitle: 'Using GitLab extends (preferred):',
    gitlabNote: 'GitLab recommends extends over anchors because extends performs a deep merge and is more readable. However, anchors are still useful for sharing individual values or when you need fine-grained control.',
    gitlabCompTitle: 'Comparison:',
    gitlabCompFeature: 'Feature',
    gitlabCompAnchors: 'YAML Anchors',
    gitlabCompExtends: 'GitLab extends',
    gitlabCompMerge: 'Merge type',
    gitlabCompShallow: 'Shallow',
    gitlabCompDeep: 'Deep',
    gitlabCompReadability: 'Readability',
    gitlabCompModerate: 'Moderate',
    gitlabCompHigh: 'High',
    gitlabCompCross: 'Cross-file',
    gitlabCompNo: 'No',
    gitlabCompYes: 'Yes (include)',
    gitlabCompStandard: 'Standard YAML',
    gitlabCompYesStd: 'Yes',
    gitlabCompNoStd: 'No (GitLab-specific)',

    k8sTitle: '10. Kubernetes: Common Labels & Resource Limits',
    k8sDesc: 'Kubernetes YAML manifests often have repetitive metadata, labels, resource limits, and environment variables. While Kubernetes does not process anchors natively (kubectl applies the resolved YAML), you can use anchors in your source files and let the YAML parser resolve them before applying.',
    k8sP1: 'Common patterns for Kubernetes:',
    k8sNote: 'Important: Tools like kustomize and Helm are the recommended way to share configuration across Kubernetes manifests. YAML anchors only work within a single document/file. For cross-file reuse, use kustomize overlays or Helm templates.',

    limitTitle: '11. Limitations & Gotchas',
    limitDesc: 'While anchors and aliases are powerful, they have several important limitations you should be aware of:',
    limitNoXFile: 'No cross-file anchors',
    limitNoXFileDesc: 'Anchors are scoped to a single YAML document (within a single file, or between --- document separators). You cannot reference an anchor defined in a different file.',
    limitJSON: 'No JSON compatibility',
    limitJSONDesc: 'JSON does not support anchors or aliases. If your YAML is converted to JSON (e.g., for an API), anchors are resolved to their values during parsing. The $ref mechanism in JSON Schema is a different feature entirely.',
    limitSecurity: 'YAML bombs (billion laughs)',
    limitSecurityDesc: 'Recursive or deeply nested anchors can create exponentially large data structures, similar to XML billion laughs attacks. This is a known security concern:',
    limitSecurityNote: 'Most modern YAML parsers have safeguards against this, but you should always set parsing limits when processing untrusted YAML input.',
    limitNoModify: 'Cannot partially modify aliases',
    limitNoModifyDesc: 'An alias (*name) produces an exact copy. You cannot modify individual fields of an aliased mapping without using the merge key (<<). And even with <<, you can only override top-level keys, not nested keys.',
    limitParser: 'Parser support varies',
    limitParserDesc: 'The merge key (<<) is defined in the YAML 1.1 specification but was removed from YAML 1.2. However, most parsers still support it for backward compatibility. Check your parser documentation.',
    limitCircular: 'Circular references',
    limitCircularDesc: 'YAML allows circular references in theory, but most parsers reject them or set recursion limits. Avoid creating anchors that reference themselves.',

    altTitle: '12. Alternatives to Anchors & Aliases',
    altDesc: 'When YAML anchors are not sufficient for your needs, consider these alternatives:',
    altInclude: 'YAML includes (non-standard)',
    altIncludeDesc: 'Some tools support custom !include tags to reference external files. This is not part of the YAML specification but is implemented by tools like Home Assistant, Ansible, and custom YAML loaders.',
    altJSONRef: 'JSON $ref',
    altJSONRefDesc: 'JSON Schema and OpenAPI use $ref for cross-document references. This is a separate mechanism from YAML anchors and works across files.',
    altHelm: 'Helm templates',
    altHelmDesc: 'For Kubernetes, Helm provides Go templating with values.yaml, named templates, helpers, and conditional logic. Much more powerful than anchors for complex deployments.',
    altJsonnet: 'Jsonnet',
    altJsonnetDesc: 'A data templating language that compiles to JSON. Supports variables, functions, conditionals, imports, and more. Used by Grafana, Tanka, and other tools.',
    altKustomize: 'Kustomize',
    altKustomizeDesc: 'A Kubernetes-native configuration management tool that supports overlays, patches, and cross-file transformations without templates.',
    altDhall: 'Dhall',
    altDhallDesc: 'A programmable configuration language with a type system, imports, and functions. Compiles to YAML, JSON, or other formats.',
    altCompTitle: 'When to use what:',
    altCompR1: 'Same-file repetition -> YAML anchors & aliases',
    altCompR2: 'Cross-file sharing in GitLab CI -> extends + include',
    altCompR3: 'Kubernetes config management -> Kustomize or Helm',
    altCompR4: 'Complex logic / conditionals -> Jsonnet or Dhall',
    altCompR5: 'API specifications -> JSON $ref (OpenAPI)',

    faqTitle: '13. FAQ',
    faq1q: 'What is the difference between a YAML anchor and an alias?',
    faq1a: 'An anchor (&name) marks a node so it can be referenced later. An alias (*name) is the reference that points back to the anchored node. Think of anchors as "define" and aliases as "use." You must define an anchor before you can use its alias.',
    faq2q: 'Can YAML anchors work across multiple files?',
    faq2a: 'No. YAML anchors are scoped to a single document within a single file. They cannot reference nodes in other files. For cross-file reuse, use tool-specific features like GitLab CI extends with include, Kubernetes Kustomize, Helm templates, or custom YAML loaders with !include tags.',
    faq3q: 'What does <<: *alias do in YAML?',
    faq3a: 'The << is a merge key that inserts all key-value pairs from the aliased mapping into the current mapping. It is similar to object spreading in JavaScript. Local keys take precedence over merged keys, so you can override specific fields while inheriting the rest.',
    faq4q: 'Are YAML anchors a security risk?',
    faq4a: 'They can be. YAML bombs (also called billion laughs attacks) use nested anchors to create exponentially large data structures that exhaust memory. Always set parsing limits when processing untrusted YAML. Most modern parsers (PyYAML SafeLoader, js-yaml safeLoad) have built-in protections against this.',
    faq5q: 'Should I use YAML anchors or GitLab CI extends?',
    faq5a: 'GitLab recommends extends over anchors. extends performs a deep merge (anchors do a shallow merge), works across files when combined with include, and is more readable. Use anchors only when you need to reuse individual scalar values or when extends does not cover your use case.',

    toolLinkYaml: 'Try our JSON to YAML Converter',
    toolLinkValidator: 'Validate your YAML online',
  },
  zh: {
    title: 'YAML 锚点、别名与合并键完全指南：DRY 配置最佳实践',
    intro: 'YAML 锚点和别名让你可以定义一次值并在整个文档中重复使用，遵循 DRY（不要重复自己）原则。结合合并键（<<），你可以构建可组合、可维护的配置文件，适用于 Docker Compose、GitHub Actions、GitLab CI、Kubernetes 等场景。本指南涵盖从基本语法到高级模式和常见陷阱的所有内容。',

    whatTitle: '1. 什么是锚点和别名？',
    whatP1: '在 YAML 中，锚点是使用 & 字符加名称附加到节点（标量、映射或序列）上的标记。别名是使用 * 字符加相同名称来引用该锚点。当 YAML 解析器遇到别名时，它会将锚定的值替换到该位置。',
    whatP2: '这种机制是 YAML 1.1 和 1.2 规范的一部分，意味着它可以与任何兼容的解析器一起使用，包括 PyYAML、js-yaml、SnakeYAML、ruamel.yaml 和 go-yaml。',
    whatP3: '锚点和别名是 YAML 原生的避免重复的方式。与其多次复制相同的配置块，不如定义一次然后在其他地方引用它。',
    whatR1: '&name 在节点上创建锚点',
    whatR2: '*name 创建指向该锚点的别名（引用）',
    whatR3: '锚点必须在被引用之前定义',
    whatR4: '锚点名称可以包含字母数字字符、连字符和下划线',
    whatR5: '别名产生锚定节点的完全相同的副本',

    basicTitle: '2. 基本锚点和别名语法',
    basicDesc: '锚点和别名最简单的用法是用于标量值（字符串、数字、布尔值）。你将锚点附加到一个值上，然后在同一文档的其他位置引用它。',
    basicScalarTitle: '标量锚点：',
    basicScalarNote: '当你有数据库主机名、端口号或版本号等需要在多个位置出现的值时，这非常有用。',
    basicResult: '解析后，connection_string 和 backup_host 中的 db_host 都解析为 "postgres.example.com"。',
    basicMultiTitle: '同一文档中的多个锚点：',

    anchorObjTitle: '3. 锚定对象（映射）',
    anchorObjDesc: '锚点的真正威力来自于锚定整个映射（对象）。你可以定义一次完整的配置块，并在文档中重复使用它。',
    anchorObjP1: '当你锚定一个映射时，别名会产生该映射中每个键值对的完整副本。',
    anchorObjNote: 'api_server 和 worker_server 将具有完全相同的日志配置。如果你更改锚点，所有别名都会自动更新。',
    anchorObjOverrideTitle: '锚定嵌套对象：',
    anchorObjOverrideNote: 'staging 环境获得与 production 完全相同的数据库配置。这确保了跨环境的一致性。',

    mergeTitle: '4. 合并键（<<）：合并映射',
    mergeDesc: '合并键（<<）是一个 YAML 扩展，它允许你将锚定的映射合并到另一个映射中，同时允许你覆盖特定字段。对于配置文件来说，这比普通别名有用得多。',
    mergeP1: '使用 <<: *alias 时，锚定映射中的所有键都会插入到当前映射中。如果当前映射已经定义了锚点中存在的键，则本地值优先（本地覆盖合并）。',
    mergeNote: 'staging 服务从默认值继承 image、environment 和 volumes，但将 ports 覆盖为使用 8081 而不是 8080。',
    mergeOverrideTitle: '覆盖优先级：',
    mergeOverrideDesc: '本地键始终优先于合并的键。这是合并键的基本规则。',

    multiMergeTitle: '5. 多重合并与优先级',
    multiMergeDesc: '你可以通过向 << 键传递列表来同时从多个锚点合并。当合并多个锚点时，列表中的第一个锚点在合并值中具有最高优先级，而本地键仍然覆盖一切。',
    multiMergeP1: '优先级顺序（从高到低）：',
    multiMergeR1: '1. 当前映射中定义的本地键',
    multiMergeR2: '2. 合并列表中的第一个锚点',
    multiMergeR3: '3. 合并列表中的第二个锚点',
    multiMergeR4: '4. 合并列表中的第三个锚点，依此类推',
    multiMergeNote: '在 production 服务中，port 来自本地定义（9090），image 来自第一个合并（*app_defaults），其余键来自后续合并。',

    anchorArrayTitle: '6. 锚定数组（序列）',
    anchorArrayDesc: '你可以像锚定标量和映射一样锚定整个数组（序列）。但有一个重要的限制：你不能像使用 << 合并映射那样合并数组。',
    anchorArrayP1: '数组锚点通过简单别名工作：',
    anchorArrayLimit: '限制：YAML 中没有原生的"数组合并"。你不能对序列使用 << 来合并两个列表。如果你需要扩展数组，必须重复值或使用特定工具的功能。',
    anchorArrayWorkaround: '扩展数组的变通方法：',
    anchorArrayNote: '一些工具（如 Docker Compose）以自己的方式处理数组合并，但这是特定于工具的行为，不是标准 YAML。',

    dockerTitle: '7. Docker Compose：x- 扩展字段',
    dockerDesc: 'Docker Compose 是 YAML 锚点最流行的实际用例。从 Compose 文件格式 3.4+ 开始，你可以使用 x- 前缀的顶级键作为扩展字段来存放锚点定义。Docker Compose 会忽略任何以 x- 开头的顶级键。',
    dockerP1: '这种模式是跨服务共享配置的推荐方式：',
    dockerNote: 'x-defaults 键被 Docker Compose 忽略，但作为锚点的容器。每个服务合并默认值并覆盖它需要的内容。',
    dockerAdvTitle: '使用多个锚点的高级 Docker Compose：',
    dockerAdvNote: '通过组合多个 x- 扩展字段，你可以构建可组合的配置，服务可以选择性地继承哪些默认值。',

    ghaTitle: '8. GitHub Actions：使用锚点复用步骤',
    ghaDesc: 'GitHub Actions YAML 工作流支持锚点和别名，但有一些注意事项。锚点在单个工作流文件内有效，但不能跨文件使用。',
    ghaP1: '常见模式包括复用环境变量、步骤配置和矩阵定义：',
    ghaNote: '注意：GitHub Actions 有自己的复用机制（可复用工作流、复合操作）可以跨文件工作。锚点最适合减少单个工作流文件内的重复。',

    gitlabTitle: '9. GitLab CI：模板作业与锚点',
    gitlabDesc: 'GitLab CI 对以点号（.）前缀的隐藏作业有一流的支持，这些作业可以作为模板。你可以使用 YAML 锚点或 GitLab 的 extends 关键字来实现类似的效果。',
    gitlabP1: '使用锚点 vs extends：',
    gitlabAnchorsTitle: '使用 YAML 锚点：',
    gitlabExtendsTitle: '使用 GitLab extends（推荐）：',
    gitlabNote: 'GitLab 推荐 extends 而不是锚点，因为 extends 执行深度合并且更具可读性。但是，锚点在共享单个值或需要细粒度控制时仍然有用。',
    gitlabCompTitle: '比较：',
    gitlabCompFeature: '特性',
    gitlabCompAnchors: 'YAML 锚点',
    gitlabCompExtends: 'GitLab extends',
    gitlabCompMerge: '合并类型',
    gitlabCompShallow: '浅合并',
    gitlabCompDeep: '深合并',
    gitlabCompReadability: '可读性',
    gitlabCompModerate: '一般',
    gitlabCompHigh: '高',
    gitlabCompCross: '跨文件',
    gitlabCompNo: '否',
    gitlabCompYes: '是（include）',
    gitlabCompStandard: '标准 YAML',
    gitlabCompYesStd: '是',
    gitlabCompNoStd: '否（GitLab 专用）',

    k8sTitle: '10. Kubernetes：通用标签与资源限制',
    k8sDesc: 'Kubernetes YAML 清单经常有重复的元数据、标签、资源限制和环境变量。虽然 Kubernetes 不原生处理锚点（kubectl 应用解析后的 YAML），但你可以在源文件中使用锚点，让 YAML 解析器在应用前解析它们。',
    k8sP1: 'Kubernetes 的常见模式：',
    k8sNote: '重要提示：kustomize 和 Helm 是跨 Kubernetes 清单共享配置的推荐方式。YAML 锚点只在单个文档/文件内有效。对于跨文件复用，请使用 kustomize overlays 或 Helm 模板。',

    limitTitle: '11. 限制与注意事项',
    limitDesc: '虽然锚点和别名功能强大，但它们有几个重要的限制需要注意：',
    limitNoXFile: '没有跨文件锚点',
    limitNoXFileDesc: '锚点的作用域限于单个 YAML 文档（在单个文件内，或在 --- 文档分隔符之间）。你不能引用在不同文件中定义的锚点。',
    limitJSON: '无 JSON 兼容性',
    limitJSONDesc: 'JSON 不支持锚点或别名。如果你的 YAML 被转换为 JSON（例如用于 API），锚点在解析过程中会被解析为它们的值。JSON Schema 中的 $ref 机制是完全不同的特性。',
    limitSecurity: 'YAML 炸弹（十亿笑声攻击）',
    limitSecurityDesc: '递归或深度嵌套的锚点可以创建指数级增长的大型数据结构，类似于 XML 十亿笑声攻击。这是一个已知的安全问题：',
    limitSecurityNote: '大多数现代 YAML 解析器都有针对此问题的保护措施，但在处理不受信任的 YAML 输入时，你应该始终设置解析限制。',
    limitNoModify: '无法部分修改别名',
    limitNoModifyDesc: '别名（*name）产生精确副本。你不能在不使用合并键（<<）的情况下修改别名映射的单个字段。即使使用 <<，你也只能覆盖顶级键，不能覆盖嵌套键。',
    limitParser: '解析器支持不一致',
    limitParserDesc: '合并键（<<）在 YAML 1.1 规范中定义，但已从 YAML 1.2 中移除。不过，大多数解析器仍然为了向后兼容而支持它。请检查你的解析器文档。',
    limitCircular: '循环引用',
    limitCircularDesc: 'YAML 理论上允许循环引用，但大多数解析器会拒绝它们或设置递归限制。避免创建引用自身的锚点。',

    altTitle: '12. 锚点和别名的替代方案',
    altDesc: '当 YAML 锚点不能满足你的需求时，考虑以下替代方案：',
    altInclude: 'YAML includes（非标准）',
    altIncludeDesc: '一些工具支持自定义 !include 标签来引用外部文件。这不是 YAML 规范的一部分，但被 Home Assistant、Ansible 和自定义 YAML 加载器所实现。',
    altJSONRef: 'JSON $ref',
    altJSONRefDesc: 'JSON Schema 和 OpenAPI 使用 $ref 进行跨文档引用。这是与 YAML 锚点不同的机制，可以跨文件工作。',
    altHelm: 'Helm 模板',
    altHelmDesc: '对于 Kubernetes，Helm 提供带有 values.yaml、命名模板、辅助函数和条件逻辑的 Go 模板。对于复杂部署比锚点强大得多。',
    altJsonnet: 'Jsonnet',
    altJsonnetDesc: '一种编译为 JSON 的数据模板语言。支持变量、函数、条件、导入等。被 Grafana、Tanka 和其他工具使用。',
    altKustomize: 'Kustomize',
    altKustomizeDesc: '一个 Kubernetes 原生的配置管理工具，支持 overlays、patches 和跨文件转换，无需模板。',
    altDhall: 'Dhall',
    altDhallDesc: '一种带有类型系统、导入和函数的可编程配置语言。可编译为 YAML、JSON 或其他格式。',
    altCompTitle: '何时使用什么：',
    altCompR1: '同文件重复 -> YAML 锚点和别名',
    altCompR2: 'GitLab CI 跨文件共享 -> extends + include',
    altCompR3: 'Kubernetes 配置管理 -> Kustomize 或 Helm',
    altCompR4: '复杂逻辑/条件 -> Jsonnet 或 Dhall',
    altCompR5: 'API 规范 -> JSON $ref (OpenAPI)',

    faqTitle: '13. 常见问题',
    faq1q: 'YAML 锚点和别名有什么区别？',
    faq1a: '锚点（&name）标记一个节点以便稍后引用。别名（*name）是指向锚定节点的引用。可以将锚点理解为"定义"，别名理解为"使用"。你必须在使用别名之前先定义锚点。',
    faq2q: 'YAML 锚点可以跨多个文件工作吗？',
    faq2a: '不能。YAML 锚点的作用域限于单个文件中的单个文档。它们不能引用其他文件中的节点。对于跨文件复用，请使用特定工具的功能，如 GitLab CI 的 extends 配合 include、Kubernetes 的 Kustomize、Helm 模板或带 !include 标签的自定义 YAML 加载器。',
    faq3q: 'YAML 中 <<: *alias 是什么意思？',
    faq3a: '<< 是合并键，它将别名映射中的所有键值对插入到当前映射中。它类似于 JavaScript 中的对象展开。本地键优先于合并的键，因此你可以在继承其余配置的同时覆盖特定字段。',
    faq4q: 'YAML 锚点存在安全风险吗？',
    faq4a: '可能存在。YAML 炸弹（也称为十亿笑声攻击）使用嵌套锚点创建指数级增长的大型数据结构，耗尽内存。处理不受信任的 YAML 时，请始终设置解析限制。大多数现代解析器（PyYAML SafeLoader、js-yaml safeLoad）都有内置保护。',
    faq5q: '应该使用 YAML 锚点还是 GitLab CI 的 extends？',
    faq5a: 'GitLab 推荐使用 extends 而非锚点。extends 执行深度合并（锚点只做浅合并），配合 include 可以跨文件工作，而且可读性更高。仅在需要复用单个标量值或 extends 无法满足你的用例时才使用锚点。',

    toolLinkYaml: '试试我们的 JSON 转 YAML 转换器',
    toolLinkValidator: '在线验证你的 YAML',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.7 };
const ulStyle: React.CSSProperties = { lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 24 };
const tipStyle: React.CSSProperties = { background: 'var(--bg-input)', borderLeft: '4px solid var(--accent-blue)', padding: '12px 16px', borderRadius: '0 8px 8px 0', margin: '16px 0', color: 'var(--text-secondary)', lineHeight: 1.7 };
const warnStyle: React.CSSProperties = { background: 'var(--bg-input)', borderLeft: '4px solid var(--accent-rose)', padding: '12px 16px', borderRadius: '0 8px 8px 0', margin: '16px 0', color: 'var(--text-secondary)', lineHeight: 1.7 };

export default function YamlAnchorsAliasesMergeKeys({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{t.intro}</p>

      {/* Tool Links */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '16px 0' }}>
        <Link href={`/${lang}/tools/json-yaml`} style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: 15 }}>
          {t.toolLinkYaml}
        </Link>
        <span style={{ color: 'var(--text-secondary)' }}>|</span>
        <Link href={`/${lang}/tools/yaml-validator`} style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: 15 }}>
          {t.toolLinkValidator}
        </Link>
      </div>

      {/* Section 1: What Are Anchors & Aliases */}
      <h2 style={h2Style}>{t.whatTitle}</h2>
      <p style={pStyle}>{t.whatP1}</p>
      <p style={{ ...pStyle, marginTop: 12 }}>{t.whatP2}</p>
      <p style={{ ...pStyle, marginTop: 12 }}>{t.whatP3}</p>
      <pre style={codeStyle}><code>{`# Anchor: &name attaches a label to a value
# Alias: *name references that labeled value

defaults: &default_settings
  timeout: 30
  retries: 3
  verbose: false

# Alias: reuse the entire defaults block
production:
  <<: *default_settings
  verbose: true

# After parsing, production = { timeout: 30, retries: 3, verbose: true }`}</code></pre>
      <ul style={ulStyle}>
        <li>{t.whatR1}</li>
        <li>{t.whatR2}</li>
        <li>{t.whatR3}</li>
        <li>{t.whatR4}</li>
        <li>{t.whatR5}</li>
      </ul>

      {/* Section 2: Basic Anchor & Alias */}
      <h2 style={h2Style}>{t.basicTitle}</h2>
      <p style={pStyle}>{t.basicDesc}</p>

      <h3 style={h3Style}>{t.basicScalarTitle}</h3>
      <pre style={codeStyle}><code>{`# Define a scalar value with an anchor
db_host: &db_host "postgres.example.com"
db_port: &db_port 5432
db_name: &db_name "myapp_production"

# Reference with aliases
connection_string: "postgresql://user:pass@*db_host:*db_port/*db_name"
# Note: aliases work as standalone values, not inside strings!
# Correct usage:
primary:
  host: *db_host
  port: *db_port
  name: *db_name

backup:
  host: *db_host    # Same host as primary
  port: *db_port    # Same port as primary
  name: *db_name    # Same database name`}</code></pre>
      <div style={tipStyle}>{t.basicScalarNote}</div>
      <p style={pStyle}>{t.basicResult}</p>

      <h3 style={h3Style}>{t.basicMultiTitle}</h3>
      <pre style={codeStyle}><code>{`# Multiple anchors for different values
app_version: &version "2.5.0"
node_image: &node_img "node:20-alpine"
python_image: &python_img "python:3.12-slim"
default_replicas: &replicas 3

services:
  api:
    image: *node_img
    replicas: *replicas
    labels:
      version: *version

  worker:
    image: *python_img
    replicas: *replicas
    labels:
      version: *version

  frontend:
    image: *node_img
    replicas: 1           # Override: only 1 replica for frontend
    labels:
      version: *version`}</code></pre>

      {/* Section 3: Anchoring Objects */}
      <h2 style={h2Style}>{t.anchorObjTitle}</h2>
      <p style={pStyle}>{t.anchorObjDesc}</p>
      <p style={{ ...pStyle, marginTop: 12 }}>{t.anchorObjP1}</p>
      <pre style={codeStyle}><code>{`# Anchor an entire mapping (object)
logging: &default_logging
  driver: json-file
  options:
    max-size: "10m"
    max-file: "3"
    tag: "{{.Name}}"

services:
  api_server:
    image: myapp-api:latest
    logging: *default_logging    # Entire logging config reused

  worker_server:
    image: myapp-worker:latest
    logging: *default_logging    # Same logging config

  scheduler:
    image: myapp-scheduler:latest
    logging: *default_logging    # Same logging config`}</code></pre>
      <div style={tipStyle}>{t.anchorObjNote}</div>

      <h3 style={h3Style}>{t.anchorObjOverrideTitle}</h3>
      <pre style={codeStyle}><code>{`# Anchor nested configuration blocks
database_config: &db_config
  host: db.internal.example.com
  port: 5432
  pool_size: 20
  ssl: true
  timeout: 30

cache_config: &cache_config
  host: redis.internal.example.com
  port: 6379
  ttl: 3600

environments:
  production:
    database: *db_config
    cache: *cache_config

  staging:
    database: *db_config      # Exact same DB config
    cache: *cache_config      # Exact same cache config

  # For different config, you'd need merge keys (section 4)
  # or define a new block`}</code></pre>
      <div style={tipStyle}>{t.anchorObjOverrideNote}</div>

      {/* Section 4: Merge Key */}
      <h2 style={h2Style}>{t.mergeTitle}</h2>
      <p style={pStyle}>{t.mergeDesc}</p>
      <p style={{ ...pStyle, marginTop: 12 }}>{t.mergeP1}</p>
      <pre style={codeStyle}><code>{`# Define defaults with an anchor
defaults: &service_defaults
  image: myapp:latest
  restart: always
  environment:
    NODE_ENV: production
    LOG_LEVEL: info
  volumes:
    - /var/log/app:/app/logs
  ports:
    - "8080:3000"

services:
  production:
    <<: *service_defaults       # Merge all defaults
    # production uses everything as-is

  staging:
    <<: *service_defaults       # Merge all defaults
    ports:
      - "8081:3000"             # Override: different port
    environment:
      NODE_ENV: staging         # Override: different NODE_ENV
      LOG_LEVEL: debug          # Override: more verbose logging

  development:
    <<: *service_defaults       # Merge all defaults
    image: myapp:dev            # Override: dev image
    ports:
      - "3000:3000"             # Override: direct port mapping
    environment:
      NODE_ENV: development
      LOG_LEVEL: debug
      DEBUG: "true"`}</code></pre>
      <div style={tipStyle}>{t.mergeNote}</div>

      <h3 style={h3Style}>{t.mergeOverrideTitle}</h3>
      <p style={pStyle}>{t.mergeOverrideDesc}</p>
      <pre style={codeStyle}><code>{`# Override precedence demonstration
base: &base
  name: "default"
  timeout: 30
  retries: 3
  debug: false

service:
  <<: *base
  name: "my-service"    # Overrides "default" -> "my-service"
  debug: true           # Overrides false -> true
  # timeout: 30         <- inherited from base (not overridden)
  # retries: 3          <- inherited from base (not overridden)
  extra_key: "new"      # Added: not in base at all

# Parsed result:
# service:
#   name: "my-service"
#   timeout: 30
#   retries: 3
#   debug: true
#   extra_key: "new"`}</code></pre>

      {/* Section 5: Multiple Merges */}
      <h2 style={h2Style}>{t.multiMergeTitle}</h2>
      <p style={pStyle}>{t.multiMergeDesc}</p>
      <p style={{ ...pStyle, fontWeight: 600, marginTop: 12 }}>{t.multiMergeP1}</p>
      <ul style={ulStyle}>
        <li>{t.multiMergeR1}</li>
        <li>{t.multiMergeR2}</li>
        <li>{t.multiMergeR3}</li>
        <li>{t.multiMergeR4}</li>
      </ul>
      <pre style={codeStyle}><code>{`# Multiple merge sources
app_defaults: &app_defaults
  image: myapp:latest
  restart: always
  replicas: 3

logging_defaults: &logging_defaults
  logging:
    driver: json-file
    options:
      max-size: "10m"

monitoring_defaults: &monitoring_defaults
  labels:
    monitoring: "true"
    team: "platform"
  healthcheck:
    interval: 30s
    timeout: 10s
    retries: 3

services:
  api:
    # Merge from multiple anchors (list syntax)
    <<: [*app_defaults, *logging_defaults, *monitoring_defaults]
    ports:
      - "8080:3000"

  worker:
    <<: [*app_defaults, *logging_defaults, *monitoring_defaults]
    replicas: 5              # Override: more replicas for worker
    command: ["npm", "run", "worker"]

  # If app_defaults and monitoring_defaults both define "labels",
  # app_defaults wins (first in the list)`}</code></pre>

      <pre style={codeStyle}><code>{`# Precedence example with conflicting keys
first: &first
  color: red
  size: large
  weight: heavy

second: &second
  color: blue
  size: medium
  shape: round

result:
  <<: [*first, *second]
  color: green             # Local override

# Parsed result:
# result:
#   color: green           <- local key wins
#   size: large            <- from *first (first in list)
#   weight: heavy          <- from *first (only source)
#   shape: round           <- from *second (only source)`}</code></pre>
      <div style={tipStyle}>{t.multiMergeNote}</div>

      {/* Section 6: Anchoring Arrays */}
      <h2 style={h2Style}>{t.anchorArrayTitle}</h2>
      <p style={pStyle}>{t.anchorArrayDesc}</p>

      <h3 style={h3Style}>{t.anchorArrayP1}</h3>
      <pre style={codeStyle}><code>{`# Anchor an entire array
shared_volumes: &volumes
  - ./config:/app/config:ro
  - ./logs:/app/logs
  - /var/run/docker.sock:/var/run/docker.sock

shared_ports: &ports
  - "8080:3000"
  - "8443:3443"

services:
  web:
    volumes: *volumes      # Reuse entire volume list
    ports: *ports          # Reuse entire port list

  api:
    volumes: *volumes      # Same volumes
    ports:
      - "9090:3000"        # Different ports (cannot merge with *ports)`}</code></pre>

      <div style={warnStyle}>{t.anchorArrayLimit}</div>

      <h3 style={h3Style}>{t.anchorArrayWorkaround}</h3>
      <pre style={codeStyle}><code>{`# YAML does NOT support this (will cause an error):
# combined:
#   <<: [*list_a, *list_b]   # ERROR: << only works with mappings

# Workaround 1: Repeat values manually
all_hosts:
  - host1.example.com
  - host2.example.com
  - host3.example.com        # Additional host
  - host4.example.com        # Additional host

# Workaround 2: Use a mapping with anchor + merge instead
host_group_a: &hosts_a
  host1: host1.example.com
  host2: host2.example.com

host_group_b: &hosts_b
  host3: host3.example.com
  host4: host4.example.com

all_hosts:
  <<: [*hosts_a, *hosts_b]
  # Result: { host1: ..., host2: ..., host3: ..., host4: ... }`}</code></pre>
      <div style={tipStyle}>{t.anchorArrayNote}</div>

      {/* Section 7: Docker Compose */}
      <h2 style={h2Style}>{t.dockerTitle}</h2>
      <p style={pStyle}>{t.dockerDesc}</p>
      <p style={{ ...pStyle, marginTop: 12 }}>{t.dockerP1}</p>
      <pre style={codeStyle}><code>{`# docker-compose.yml
# x- extension fields are ignored by Docker Compose
x-default-service: &default-service
  restart: unless-stopped
  logging:
    driver: json-file
    options:
      max-size: "10m"
      max-file: "3"
  networks:
    - app-network
  deploy:
    resources:
      limits:
        memory: 512M
      reservations:
        memory: 256M

services:
  api:
    <<: *default-service
    image: myapp-api:latest
    ports:
      - "8080:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://db:5432/myapp
    depends_on:
      - postgres
      - redis

  worker:
    <<: *default-service
    image: myapp-worker:latest
    environment:
      - NODE_ENV=production
      - QUEUE_URL=redis://redis:6379
    depends_on:
      - redis

  scheduler:
    <<: *default-service
    image: myapp-scheduler:latest
    environment:
      - NODE_ENV=production
    deploy:
      resources:
        limits:
          memory: 256M        # Less memory for scheduler
        reservations:
          memory: 128M

  postgres:
    <<: *default-service
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=app
      - POSTGRES_PASSWORD_FILE=/run/secrets/db_password

  redis:
    <<: *default-service
    image: redis:7-alpine
    volumes:
      - redisdata:/data

networks:
  app-network:
    driver: bridge

volumes:
  pgdata:
  redisdata:`}</code></pre>
      <div style={tipStyle}>{t.dockerNote}</div>

      <h3 style={h3Style}>{t.dockerAdvTitle}</h3>
      <pre style={codeStyle}><code>{`# Advanced: Multiple x- extension fields for composability
x-logging: &logging
  logging:
    driver: json-file
    options:
      max-size: "10m"
      max-file: "5"

x-healthcheck-http: &healthcheck-http
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
    interval: 30s
    timeout: 10s
    retries: 3
    start_period: 40s

x-healthcheck-tcp: &healthcheck-tcp
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U app || exit 1"]
    interval: 10s
    timeout: 5s
    retries: 5

x-deploy-standard: &deploy-standard
  deploy:
    replicas: 2
    resources:
      limits:
        cpus: "1.0"
        memory: 512M

services:
  api:
    <<: [*logging, *healthcheck-http, *deploy-standard]
    image: myapp-api:latest
    ports:
      - "8080:3000"

  worker:
    <<: [*logging, *deploy-standard]
    image: myapp-worker:latest
    deploy:
      replicas: 4            # More workers needed

  postgres:
    <<: [*logging, *healthcheck-tcp]
    image: postgres:16-alpine`}</code></pre>
      <div style={tipStyle}>{t.dockerAdvNote}</div>

      {/* Section 8: GitHub Actions */}
      <h2 style={h2Style}>{t.ghaTitle}</h2>
      <p style={pStyle}>{t.ghaDesc}</p>
      <p style={{ ...pStyle, marginTop: 12 }}>{t.ghaP1}</p>
      <pre style={codeStyle}><code>{`# .github/workflows/ci.yml
name: CI Pipeline

# Define reusable environment variables
env: &shared-env
  NODE_VERSION: "20"
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    env: *shared-env
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: npm

      - &install-deps
        name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test -- --coverage

  build:
    runs-on: ubuntu-latest
    needs: lint-and-test
    env: *shared-env
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: npm

      - *install-deps    # Reuse the install step

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: dist/`}</code></pre>
      <div style={warnStyle}>{t.ghaNote}</div>

      {/* Section 9: GitLab CI */}
      <h2 style={h2Style}>{t.gitlabTitle}</h2>
      <p style={pStyle}>{t.gitlabDesc}</p>
      <p style={{ ...pStyle, marginTop: 12 }}>{t.gitlabP1}</p>

      <h3 style={h3Style}>{t.gitlabAnchorsTitle}</h3>
      <pre style={codeStyle}><code>{`# .gitlab-ci.yml — Using YAML anchors
stages:
  - test
  - build
  - deploy

# Hidden job as anchor template (dot prefix = hidden)
.default_job: &default_job
  image: node:20-alpine
  before_script:
    - npm ci
  cache:
    key: \$CI_COMMIT_REF_SLUG
    paths:
      - node_modules/
  tags:
    - docker

.deploy_template: &deploy_template
  image: alpine:latest
  before_script:
    - apk add --no-cache curl
  when: manual
  tags:
    - docker

# Jobs using anchors
test:
  <<: *default_job
  stage: test
  script:
    - npm run lint
    - npm test -- --coverage
  coverage: '/Lines\\s*:\\s*(\\d+\\.?\\d*)%/'

build:
  <<: *default_job
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

deploy_staging:
  <<: *deploy_template
  stage: deploy
  script:
    - curl -X POST "https://api.example.com/deploy?env=staging"
  environment:
    name: staging
    url: https://staging.example.com

deploy_production:
  <<: *deploy_template
  stage: deploy
  script:
    - curl -X POST "https://api.example.com/deploy?env=production"
  environment:
    name: production
    url: https://example.com
  only:
    - main`}</code></pre>

      <h3 style={h3Style}>{t.gitlabExtendsTitle}</h3>
      <pre style={codeStyle}><code>{`# .gitlab-ci.yml — Using GitLab extends (preferred)
stages:
  - test
  - build
  - deploy

# Hidden template jobs (no anchors needed)
.default_job:
  image: node:20-alpine
  before_script:
    - npm ci
  cache:
    key: \$CI_COMMIT_REF_SLUG
    paths:
      - node_modules/
  tags:
    - docker

.deploy_template:
  image: alpine:latest
  before_script:
    - apk add --no-cache curl
  when: manual
  tags:
    - docker

# Jobs using extends (deep merge!)
test:
  extends: .default_job
  stage: test
  script:
    - npm run lint
    - npm test

build:
  extends: .default_job
  stage: build
  script:
    - npm run build

deploy_staging:
  extends: .deploy_template
  stage: deploy
  script:
    - curl -X POST "https://api.example.com/deploy?env=staging"
  environment:
    name: staging`}</code></pre>

      <div style={tipStyle}>{t.gitlabNote}</div>

      <h3 style={h3Style}>{t.gitlabCompTitle}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.gitlabCompFeature}</th>
              <th style={thStyle}>{t.gitlabCompAnchors}</th>
              <th style={thStyle}>{t.gitlabCompExtends}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{t.gitlabCompMerge}</td>
              <td style={tdStyle}>{t.gitlabCompShallow}</td>
              <td style={tdStyle}>{t.gitlabCompDeep}</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{t.gitlabCompReadability}</td>
              <td style={tdStyle}>{t.gitlabCompModerate}</td>
              <td style={tdStyle}>{t.gitlabCompHigh}</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{t.gitlabCompCross}</td>
              <td style={tdStyle}>{t.gitlabCompNo}</td>
              <td style={tdStyle}>{t.gitlabCompYes}</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{t.gitlabCompStandard}</td>
              <td style={tdStyle}>{t.gitlabCompYesStd}</td>
              <td style={tdStyle}>{t.gitlabCompNoStd}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 10: Kubernetes */}
      <h2 style={h2Style}>{t.k8sTitle}</h2>
      <p style={pStyle}>{t.k8sDesc}</p>
      <p style={{ ...pStyle, marginTop: 12 }}>{t.k8sP1}</p>
      <pre style={codeStyle}><code>{`# kubernetes-manifests.yaml
# Common definitions (using YAML multi-document with ---)

# Shared labels and metadata
_anchors:
  labels: &common-labels
    app.kubernetes.io/part-of: myapp
    app.kubernetes.io/managed-by: kubectl
    team: backend
    environment: production

  resources: &default-resources
    requests:
      cpu: 100m
      memory: 128Mi
    limits:
      cpu: 500m
      memory: 512Mi

  env: &common-env
    - name: LOG_LEVEL
      value: "info"
    - name: TZ
      value: "UTC"
    - name: OTEL_EXPORTER_ENDPOINT
      value: "http://otel-collector:4317"

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
  labels:
    <<: *common-labels
    app.kubernetes.io/name: api-server
    app.kubernetes.io/component: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app.kubernetes.io/name: api-server
  template:
    metadata:
      labels:
        <<: *common-labels
        app.kubernetes.io/name: api-server
    spec:
      containers:
        - name: api
          image: myapp-api:v2.5.0
          resources: *default-resources
          env:
            *common-env
          ports:
            - containerPort: 3000

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: worker
  labels:
    <<: *common-labels
    app.kubernetes.io/name: worker
    app.kubernetes.io/component: worker
spec:
  replicas: 5
  selector:
    matchLabels:
      app.kubernetes.io/name: worker
  template:
    metadata:
      labels:
        <<: *common-labels
        app.kubernetes.io/name: worker
    spec:
      containers:
        - name: worker
          image: myapp-worker:v2.5.0
          resources:
            requests:
              cpu: 200m
              memory: 256Mi
            limits:
              cpu: "1"
              memory: 1Gi       # Worker needs more memory
          env:
            *common-env`}</code></pre>
      <div style={warnStyle}>{t.k8sNote}</div>

      {/* Section 11: Limitations & Gotchas */}
      <h2 style={h2Style}>{t.limitTitle}</h2>
      <p style={pStyle}>{t.limitDesc}</p>

      <h3 style={h3Style}>{t.limitNoXFile}</h3>
      <p style={pStyle}>{t.limitNoXFileDesc}</p>
      <pre style={codeStyle}><code>{`# file-a.yaml
database: &db_config
  host: localhost
  port: 5432

# file-b.yaml
service:
  db: *db_config    # ERROR: *db_config is not defined in this file!

# Solution: Keep all anchors and aliases in the same file
# Or use tool-specific features (GitLab include, Helm, etc.)`}</code></pre>

      <h3 style={h3Style}>{t.limitJSON}</h3>
      <p style={pStyle}>{t.limitJSONDesc}</p>
      <pre style={codeStyle}><code>{`# YAML with anchors:
defaults: &defaults
  timeout: 30
  retries: 3

service:
  <<: *defaults
  name: api

# Converts to JSON as (anchors resolved):
# {
#   "defaults": { "timeout": 30, "retries": 3 },
#   "service": { "timeout": 30, "retries": 3, "name": "api" }
# }
# No anchor/alias information is preserved in JSON`}</code></pre>

      <h3 style={h3Style}>{t.limitSecurity}</h3>
      <p style={pStyle}>{t.limitSecurityDesc}</p>
      <pre style={codeStyle}><code>{`# YAML bomb / Billion laughs attack
# WARNING: Do NOT parse this with unlimited settings!
a: &a ["lol","lol","lol","lol","lol","lol","lol","lol","lol"]
b: &b [*a,*a,*a,*a,*a,*a,*a,*a,*a]
c: &c [*b,*b,*b,*b,*b,*b,*b,*b,*b]
d: &d [*c,*c,*c,*c,*c,*c,*c,*c,*c]
e: &e [*d,*d,*d,*d,*d,*d,*d,*d,*d]
# Each level multiplies by 9: 9^5 = 59,049 "lol" strings
# More levels = exponential growth = memory exhaustion`}</code></pre>
      <div style={warnStyle}>{t.limitSecurityNote}</div>

      <pre style={codeStyle}><code>{`# Safe parsing examples:

# Python (PyYAML) — use SafeLoader
import yaml
with open('config.yaml') as f:
    data = yaml.safe_load(f)  # SafeLoader prevents code execution

# JavaScript (js-yaml) — default is safe
const yaml = require('js-yaml');
const data = yaml.load(fs.readFileSync('config.yaml', 'utf8'));
// js-yaml has built-in maxAliasCount (default: 100)

# Go (go-yaml) — set limits
decoder := yaml.NewDecoder(reader)
decoder.KnownFields(true)  // Reject unknown fields`}</code></pre>

      <h3 style={h3Style}>{t.limitNoModify}</h3>
      <p style={pStyle}>{t.limitNoModifyDesc}</p>
      <pre style={codeStyle}><code>{`# Cannot partially modify an alias
defaults: &defaults
  database:
    host: localhost
    port: 5432
    pool_size: 10

# This REPLACES the entire database mapping, not just pool_size:
staging:
  <<: *defaults
  database:
    pool_size: 5
    # host and port are LOST! << only merges top-level keys.

# Result (NOT what you might expect):
# staging:
#   database:
#     pool_size: 5          # host and port are gone!

# Solution: Anchor at a finer granularity
db_host: &db_host "localhost"
db_port: &db_port 5432

staging:
  database:
    host: *db_host
    port: *db_port
    pool_size: 5            # Only pool_size is different`}</code></pre>

      <h3 style={h3Style}>{t.limitParser}</h3>
      <p style={pStyle}>{t.limitParserDesc}</p>

      <h3 style={h3Style}>{t.limitCircular}</h3>
      <p style={pStyle}>{t.limitCircularDesc}</p>

      {/* Section 12: Alternatives */}
      <h2 style={h2Style}>{t.altTitle}</h2>
      <p style={pStyle}>{t.altDesc}</p>

      <h3 style={h3Style}>{t.altInclude}</h3>
      <p style={pStyle}>{t.altIncludeDesc}</p>
      <pre style={codeStyle}><code>{`# Non-standard !include (supported by some tools)
# config.yaml
database: !include database.yaml
logging: !include logging.yaml

# database.yaml
host: localhost
port: 5432
name: myapp`}</code></pre>

      <h3 style={h3Style}>{t.altJSONRef}</h3>
      <p style={pStyle}>{t.altJSONRefDesc}</p>
      <pre style={codeStyle}><code>{`# OpenAPI / JSON Schema $ref
paths:
  /users:
    get:
      responses:
        200:
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserList'
        400:
          $ref: '#/components/responses/BadRequest'`}</code></pre>

      <h3 style={h3Style}>{t.altHelm}</h3>
      <p style={pStyle}>{t.altHelmDesc}</p>
      <pre style={codeStyle}><code>{`# Helm template example (templates/deployment.yaml)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "myapp.fullname" . }}
  labels:
    {{- include "myapp.labels" . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          resources:
            {{- toYaml .Values.resources | nindent 12 }}`}</code></pre>

      <h3 style={h3Style}>{t.altJsonnet}</h3>
      <p style={pStyle}>{t.altJsonnetDesc}</p>
      <pre style={codeStyle}><code>{`// Jsonnet example
local defaults = {
  replicas: 3,
  image: 'myapp:latest',
  resources: {
    limits: { cpu: '500m', memory: '512Mi' },
  },
};

{
  api: defaults + {
    name: 'api-server',
    ports: [{ containerPort: 3000 }],
  },
  worker: defaults + {
    name: 'worker',
    replicas: 5,  // Override
  },
}`}</code></pre>

      <h3 style={h3Style}>{t.altKustomize}</h3>
      <p style={pStyle}>{t.altKustomizeDesc}</p>

      <h3 style={h3Style}>{t.altDhall}</h3>
      <p style={pStyle}>{t.altDhallDesc}</p>

      <p style={{ ...pStyle, fontWeight: 700, marginTop: 24 }}>{t.altCompTitle}</p>
      <pre style={codeStyle}><code>{`# When to use what:
# Same-file repetition           -> YAML anchors & aliases
# Cross-file (GitLab CI)         -> extends + include
# Kubernetes config management    -> Kustomize or Helm
# Complex logic / conditionals    -> Jsonnet or Dhall
# API specifications              -> JSON $ref (OpenAPI)`}</code></pre>
      <ul style={ulStyle}>
        <li>{t.altCompR1}</li>
        <li>{t.altCompR2}</li>
        <li>{t.altCompR3}</li>
        <li>{t.altCompR4}</li>
        <li>{t.altCompR5}</li>
      </ul>

      {/* Tool Links */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '24px 0' }}>
        <Link href={`/${lang}/tools/json-yaml`} style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: 15 }}>
          {t.toolLinkYaml}
        </Link>
        <span style={{ color: 'var(--text-secondary)' }}>|</span>
        <Link href={`/${lang}/tools/yaml-validator`} style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: 15 }}>
          {t.toolLinkValidator}
        </Link>
      </div>

      {/* Section 13: FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        { q: t.faq1q, a: t.faq1a },
        { q: t.faq2q, a: t.faq2a },
        { q: t.faq3q, a: t.faq3a },
        { q: t.faq4q, a: t.faq4a },
        { q: t.faq5q, a: t.faq5a },
      ].map((faq, i) => (
        <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>{faq.q}</summary>
          <p style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
