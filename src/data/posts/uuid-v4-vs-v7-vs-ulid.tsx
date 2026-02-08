import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Choosing the right unique identifier format for your application is a decision that affects database performance, scalability, and developer experience. With <strong>UUID v7</strong> now an official standard (RFC 9562, published 2024), the landscape of ID generation has changed significantly. This guide compares the four most popular options.',
    h2QuickComparison: 'Quick Comparison Table',
    thFeature: 'Feature',
    rowSizeBytes: 'Size (bytes)',
    rowStringLength: 'String length',
    rowTimeOrdered: 'Time-ordered',
    rowStandard: 'Standard',
    rowDbIndex: 'DB index friendly',
    rowCollisionResistance: 'Collision resistance',
    rowUrlSafe: 'URL-safe',
    rowLanguageSupport: 'Language support',
    h2Uuidv4: 'UUID v4: The Established Standard',
    uuidv4Desc: 'UUID v4 has been the default choice for over a decade. It generates 128-bit identifiers using 122 bits of randomness, producing the familiar <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code> format.',
    strengths: 'Strengths:',
    weaknesses: 'Weaknesses:',
    uuidv4Str1: 'Universal library support in every programming language',
    uuidv4Str2: 'No coordination needed — generate anywhere, anytime',
    uuidv4Str3: 'Simple and well-understood',
    uuidv4Weak1: 'Random distribution causes B-tree index fragmentation in databases',
    uuidv4Weak2: 'No time information — cannot sort by creation order',
    uuidv4Weak3: 'At scale (millions of rows), insert performance degrades significantly',
    tryGenerator: 'Try our UUID Generator tool \u2192',
    h2Uuidv7: 'UUID v7: The New Standard (RFC 9562)',
    uuidv7Desc: 'UUID v7, finalized in RFC 9562 (2024), is designed specifically for use as database keys. It combines a <strong>48-bit Unix timestamp (millisecond precision)</strong> with 74 bits of randomness, producing time-ordered UUIDs that are fully compatible with existing UUID infrastructure.',
    uuidv7Str1: 'Time-ordered — naturally sorts by creation time',
    uuidv7Str2: 'Excellent database insert performance (no index fragmentation)',
    uuidv7Str3: 'Compatible with all existing UUID columns and tools',
    uuidv7Str4: 'Native support in PostgreSQL 17+',
    uuidv7Weak1: 'Fewer random bits (74 vs 122) — still astronomically collision-resistant',
    uuidv7Weak2: 'Timestamp is embedded — reveals approximate creation time',
    uuidv7Weak3: 'Library support still growing (but rapidly)',
    h2Ulid: 'ULID: Lexicographically Sortable',
    ulidDesc: 'ULID (Universally Unique Lexicographically Sortable Identifier) predates UUID v7 and shares a similar design: 48-bit timestamp + 80 bits of randomness. The key difference is its encoding: <strong>Crockford Base32</strong>, producing compact 26-character strings like <code>01ARZ3NDEKTSV4RRFFQ69G5FAV</code>.',
    ulidStr1: "Compact string representation (26 chars vs UUID's 36)",
    ulidStr2: 'Built-in monotonicity — IDs generated in the same millisecond are still ordered',
    ulidStr3: 'Lexicographically sortable as strings (no special comparison needed)',
    ulidStr4: 'Case-insensitive and URL-safe',
    ulidWeak1: 'Not an RFC standard — community specification only',
    ulidWeak2: 'Not compatible with UUID columns without conversion',
    ulidWeak3: 'Less library support than UUID',
    h2Nanoid: 'NanoID: Compact and Customizable',
    nanoidDesc: 'NanoID takes a different approach: instead of a fixed format, it generates compact, URL-safe random strings with a <strong>configurable alphabet and length</strong>. The default is 21 characters using <code>A-Za-z0-9_-</code>.',
    nanoidStr1: 'Very compact (21 chars default, customizable)',
    nanoidStr2: 'URL-safe by default',
    nanoidStr3: 'Customizable alphabet and length',
    nanoidStr4: 'Tiny library (~130 bytes gzipped) — perfect for frontend',
    nanoidStr5: 'Cryptographically strong (uses crypto.getRandomValues)',
    nanoidWeak1: 'No time-ordering — same B-tree fragmentation issues as UUID v4',
    nanoidWeak2: 'No standard specification',
    nanoidWeak3: 'Not compatible with UUID infrastructure',
    h2DecisionGuide: 'Decision Guide: Which Should You Choose?',
    h3UseV7: 'Use UUID v7 when:',
    guideV7_1: 'Building a new application with a relational database',
    guideV7_2: 'You need time-ordered IDs for efficient indexing',
    guideV7_3: 'Your system expects standard UUID format (PostgreSQL, MySQL, etc.)',
    guideV7_4: 'You want the best balance of compatibility and performance',
    h3UseV4: 'Use UUID v4 when:',
    guideV4_1: 'Working with systems that only support UUID v4',
    guideV4_2: 'You need maximum randomness with no timestamp leakage',
    guideV4_3: 'Database scale is small-to-medium (< 1M rows)',
    h3UseUlid: 'Use ULID when:',
    guideUlid1: 'You need shorter string representations',
    guideUlid2: 'Working with systems that sort strings lexicographically',
    guideUlid3: 'Monotonicity within the same millisecond is important',
    guideUlid4: "You don't need UUID column compatibility",
    h3UseNanoid: 'Use NanoID when:',
    guideNanoid1: 'Generating IDs in the browser or frontend',
    guideNanoid2: 'Bundle size matters (NanoID is 130 bytes)',
    guideNanoid3: 'You need short, URL-friendly identifiers',
    guideNanoid4: 'Building URL shorteners, invite codes, or session tokens',
    h2PerfBenchmark: 'Performance Benchmark: Database Inserts',
    perfDesc: 'The most impactful difference between these formats is database insert performance. Time-ordered IDs (UUID v7, ULID) maintain sequential B-tree inserts, while random IDs (UUID v4, NanoID) cause random page splits:',
    thIdFormat: 'ID Format',
    th1MInserts: '1M Inserts (PostgreSQL)',
    thIndexSize: 'Index Size',
    thInsertPattern: 'Insert Pattern',
    rowAutoIncrement: 'Auto-increment',
    perfNote: 'Benchmark data is approximate and varies by hardware, database version, and table structure. The relative difference is consistent across environments.',
    h2Migration: 'Migration Path: UUID v4 to UUID v7',
    migrationDesc: "If you're considering migrating from UUID v4 to UUID v7, the good news is they share the same 128-bit format and string representation. In most databases, you can start generating UUID v7 values for new rows while existing UUID v4 values remain valid:",
    h2Faq: 'Frequently Asked Questions',
    faqQ1: 'Should I migrate from UUID v4 to UUID v7?',
    faqA1: 'If your application uses UUIDs as database primary keys and you experience index fragmentation or slow inserts at scale, migrating to UUID v7 is worth considering. For small-to-medium apps, UUID v4 works fine.',
    faqQ2: 'Is NanoID safe for database primary keys?',
    faqA2: 'NanoID is cryptographically secure and has a configurable length, but it lacks time-ordering. For database primary keys where insert performance matters, UUID v7 or ULID are better choices. NanoID shines in frontend applications and URL shorteners.',
    faqQ3: 'What is the difference between UUID v7 and ULID?',
    faqA3: 'Both are time-ordered unique identifiers. UUID v7 follows RFC 9562 and is compatible with existing UUID infrastructure (128-bit, standard format). ULID uses Crockford Base32 encoding (26 characters) and has built-in monotonicity within the same millisecond. UUID v7 is better for systems expecting UUID format; ULID is more compact as a string.',
  },
  fr: {
    intro: "Choisir le bon format d'identifiant unique pour votre application est une décision qui affecte les performances de la base de données, la scalabilité et l'expérience développeur. Avec <strong>UUID v7</strong> désormais un standard officiel (RFC 9562, publié en 2024), le paysage de la génération d'identifiants a considérablement changé. Ce guide compare les quatre options les plus populaires.",
    h2QuickComparison: 'Tableau comparatif rapide',
    thFeature: 'Fonctionnalité',
    rowSizeBytes: 'Taille (octets)',
    rowStringLength: 'Longueur de chaîne',
    rowTimeOrdered: 'Ordonné par temps',
    rowStandard: 'Standard',
    rowDbIndex: 'Compatible index DB',
    rowCollisionResistance: 'Résistance aux collisions',
    rowUrlSafe: 'Compatible URL',
    rowLanguageSupport: 'Support des langages',
    h2Uuidv4: 'UUID v4 : Le standard établi',
    uuidv4Desc: "UUID v4 est le choix par défaut depuis plus d'une décennie. Il génère des identifiants de 128 bits utilisant 122 bits d'aléatoire, produisant le format familier <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>.",
    strengths: 'Points forts :',
    weaknesses: 'Points faibles :',
    uuidv4Str1: 'Support universel des bibliothèques dans tous les langages de programmation',
    uuidv4Str2: "Aucune coordination nécessaire — générez n'importe où, n'importe quand",
    uuidv4Str3: 'Simple et bien compris',
    uuidv4Weak1: "La distribution aléatoire provoque une fragmentation de l'index B-tree dans les bases de données",
    uuidv4Weak2: 'Aucune information temporelle — impossible de trier par ordre de création',
    uuidv4Weak3: "À grande échelle (millions de lignes), les performances d'insertion se dégradent significativement",
    tryGenerator: 'Essayez notre outil Générateur UUID \u2192',
    h2Uuidv7: 'UUID v7 : Le nouveau standard (RFC 9562)',
    uuidv7Desc: "UUID v7, finalisé dans la RFC 9562 (2024), est conçu spécifiquement pour être utilisé comme clés de base de données. Il combine un <strong>horodatage Unix de 48 bits (précision à la milliseconde)</strong> avec 74 bits d'aléatoire, produisant des UUID ordonnés par temps, entièrement compatibles avec l'infrastructure UUID existante.",
    uuidv7Str1: 'Ordonné par temps — trie naturellement par date de création',
    uuidv7Str2: "Excellentes performances d'insertion en base de données (pas de fragmentation d'index)",
    uuidv7Str3: 'Compatible avec toutes les colonnes et outils UUID existants',
    uuidv7Str4: 'Support natif dans PostgreSQL 17+',
    uuidv7Weak1: 'Moins de bits aléatoires (74 vs 122) — toujours astronomiquement résistant aux collisions',
    uuidv7Weak2: "L'horodatage est intégré — révèle l'heure approximative de création",
    uuidv7Weak3: 'Le support des bibliothèques est encore en croissance (mais rapide)',
    h2Ulid: 'ULID : Triable lexicographiquement',
    ulidDesc: "ULID (Universally Unique Lexicographically Sortable Identifier) est antérieur à UUID v7 et partage une conception similaire : horodatage de 48 bits + 80 bits d'aléatoire. La différence clé est son encodage : <strong>Crockford Base32</strong>, produisant des chaînes compactes de 26 caractères comme <code>01ARZ3NDEKTSV4RRFFQ69G5FAV</code>.",
    ulidStr1: 'Représentation compacte en chaîne (26 caractères vs 36 pour UUID)',
    ulidStr2: 'Monotonie intégrée — les ID générés dans la même milliseconde restent ordonnés',
    ulidStr3: 'Triable lexicographiquement en tant que chaîne (pas de comparaison spéciale nécessaire)',
    ulidStr4: 'Insensible à la casse et compatible URL',
    ulidWeak1: 'Pas un standard RFC — spécification communautaire uniquement',
    ulidWeak2: 'Non compatible avec les colonnes UUID sans conversion',
    ulidWeak3: 'Moins de support de bibliothèques que UUID',
    h2Nanoid: 'NanoID : Compact et personnalisable',
    nanoidDesc: "NanoID adopte une approche différente : au lieu d'un format fixe, il génère des chaînes aléatoires compactes et compatibles URL avec un <strong>alphabet et une longueur configurables</strong>. La valeur par défaut est de 21 caractères utilisant <code>A-Za-z0-9_-</code>.",
    nanoidStr1: 'Très compact (21 caractères par défaut, personnalisable)',
    nanoidStr2: 'Compatible URL par défaut',
    nanoidStr3: 'Alphabet et longueur personnalisables',
    nanoidStr4: 'Bibliothèque minuscule (~130 octets gzippés) — parfait pour le frontend',
    nanoidStr5: 'Cryptographiquement robuste (utilise crypto.getRandomValues)',
    nanoidWeak1: 'Pas d\'ordonnancement temporel — mêmes problèmes de fragmentation B-tree que UUID v4',
    nanoidWeak2: 'Aucune spécification standard',
    nanoidWeak3: "Non compatible avec l'infrastructure UUID",
    h2DecisionGuide: 'Guide de décision : Lequel choisir ?',
    h3UseV7: 'Utilisez UUID v7 quand :',
    guideV7_1: 'Vous construisez une nouvelle application avec une base de données relationnelle',
    guideV7_2: "Vous avez besoin d'identifiants ordonnés par temps pour un indexage efficace",
    guideV7_3: 'Votre système attend le format UUID standard (PostgreSQL, MySQL, etc.)',
    guideV7_4: 'Vous voulez le meilleur équilibre entre compatibilité et performance',
    h3UseV4: 'Utilisez UUID v4 quand :',
    guideV4_1: 'Vous travaillez avec des systèmes qui ne supportent que UUID v4',
    guideV4_2: "Vous avez besoin d'un maximum d'aléatoire sans fuite d'horodatage",
    guideV4_3: 'L\'échelle de la base de données est petite à moyenne (< 1M lignes)',
    h3UseUlid: 'Utilisez ULID quand :',
    guideUlid1: 'Vous avez besoin de représentations de chaînes plus courtes',
    guideUlid2: 'Vous travaillez avec des systèmes qui trient les chaînes lexicographiquement',
    guideUlid3: 'La monotonie dans la même milliseconde est importante',
    guideUlid4: "Vous n'avez pas besoin de compatibilité avec les colonnes UUID",
    h3UseNanoid: 'Utilisez NanoID quand :',
    guideNanoid1: 'Vous générez des identifiants dans le navigateur ou le frontend',
    guideNanoid2: 'La taille du bundle compte (NanoID fait 130 octets)',
    guideNanoid3: "Vous avez besoin d'identifiants courts et compatibles URL",
    guideNanoid4: "Vous construisez des raccourcisseurs d'URL, des codes d'invitation ou des jetons de session",
    h2PerfBenchmark: 'Benchmark de performance : Insertions en base de données',
    perfDesc: "La différence la plus significative entre ces formats est la performance d'insertion en base de données. Les identifiants ordonnés par temps (UUID v7, ULID) maintiennent des insertions B-tree séquentielles, tandis que les identifiants aléatoires (UUID v4, NanoID) provoquent des divisions de pages aléatoires :",
    thIdFormat: "Format d'ID",
    th1MInserts: '1M insertions (PostgreSQL)',
    thIndexSize: "Taille de l'index",
    thInsertPattern: "Modèle d'insertion",
    rowAutoIncrement: 'Auto-incrémentation',
    perfNote: 'Les données de benchmark sont approximatives et varient selon le matériel, la version de la base de données et la structure des tables. La différence relative est cohérente dans tous les environnements.',
    h2Migration: 'Chemin de migration : UUID v4 vers UUID v7',
    migrationDesc: "Si vous envisagez de migrer de UUID v4 vers UUID v7, la bonne nouvelle est qu'ils partagent le même format 128 bits et la même représentation en chaîne. Dans la plupart des bases de données, vous pouvez commencer à générer des valeurs UUID v7 pour les nouvelles lignes tandis que les valeurs UUID v4 existantes restent valides :",
    h2Faq: 'Questions fréquemment posées',
    faqQ1: 'Devrais-je migrer de UUID v4 vers UUID v7 ?',
    faqA1: "Si votre application utilise des UUID comme clés primaires de base de données et que vous rencontrez une fragmentation d'index ou des insertions lentes à grande échelle, la migration vers UUID v7 vaut la peine d'être envisagée. Pour les applications de taille petite à moyenne, UUID v4 fonctionne très bien.",
    faqQ2: 'NanoID est-il sûr pour les clés primaires de base de données ?',
    faqA2: "NanoID est cryptographiquement sécurisé et a une longueur configurable, mais il manque d'ordonnancement temporel. Pour les clés primaires de base de données où les performances d'insertion comptent, UUID v7 ou ULID sont de meilleurs choix. NanoID excelle dans les applications frontend et les raccourcisseurs d'URL.",
    faqQ3: 'Quelle est la différence entre UUID v7 et ULID ?',
    faqA3: "Les deux sont des identifiants uniques ordonnés par temps. UUID v7 suit la RFC 9562 et est compatible avec l'infrastructure UUID existante (128 bits, format standard). ULID utilise l'encodage Crockford Base32 (26 caractères) et possède une monotonie intégrée dans la même milliseconde. UUID v7 est meilleur pour les systèmes attendant le format UUID ; ULID est plus compact en tant que chaîne.",
  },
  de: {
    intro: 'Die Wahl des richtigen Formats für eindeutige Bezeichner für Ihre Anwendung ist eine Entscheidung, die die Datenbankleistung, Skalierbarkeit und Entwicklererfahrung beeinflusst. Mit <strong>UUID v7</strong> als offiziellem Standard (RFC 9562, veröffentlicht 2024) hat sich die Landschaft der ID-Generierung erheblich verändert. Dieser Leitfaden vergleicht die vier beliebtesten Optionen.',
    h2QuickComparison: 'Schnelle Vergleichstabelle',
    thFeature: 'Merkmal',
    rowSizeBytes: 'Größe (Bytes)',
    rowStringLength: 'String-Länge',
    rowTimeOrdered: 'Zeitgeordnet',
    rowStandard: 'Standard',
    rowDbIndex: 'DB-Index-freundlich',
    rowCollisionResistance: 'Kollisionsresistenz',
    rowUrlSafe: 'URL-sicher',
    rowLanguageSupport: 'Sprachunterstützung',
    h2Uuidv4: 'UUID v4: Der etablierte Standard',
    uuidv4Desc: 'UUID v4 ist seit über einem Jahrzehnt die Standardwahl. Es generiert 128-Bit-Bezeichner mit 122 Bits Zufälligkeit und erzeugt das vertraute Format <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>.',
    strengths: 'Stärken:',
    weaknesses: 'Schwächen:',
    uuidv4Str1: 'Universelle Bibliotheksunterstützung in jeder Programmiersprache',
    uuidv4Str2: 'Keine Koordination erforderlich — überall und jederzeit generieren',
    uuidv4Str3: 'Einfach und gut verstanden',
    uuidv4Weak1: 'Zufällige Verteilung verursacht B-Tree-Index-Fragmentierung in Datenbanken',
    uuidv4Weak2: 'Keine Zeitinformation — Sortierung nach Erstellungsreihenfolge nicht möglich',
    uuidv4Weak3: 'Bei großem Umfang (Millionen von Zeilen) verschlechtert sich die Insert-Leistung erheblich',
    tryGenerator: 'Probieren Sie unser UUID-Generator-Tool aus \u2192',
    h2Uuidv7: 'UUID v7: Der neue Standard (RFC 9562)',
    uuidv7Desc: 'UUID v7, finalisiert in RFC 9562 (2024), ist speziell für den Einsatz als Datenbankschlüssel konzipiert. Es kombiniert einen <strong>48-Bit-Unix-Zeitstempel (Millisekundengenauigkeit)</strong> mit 74 Bits Zufälligkeit und erzeugt zeitgeordnete UUIDs, die vollständig mit bestehender UUID-Infrastruktur kompatibel sind.',
    uuidv7Str1: 'Zeitgeordnet — sortiert natürlich nach Erstellungszeit',
    uuidv7Str2: 'Hervorragende Datenbank-Insert-Leistung (keine Index-Fragmentierung)',
    uuidv7Str3: 'Kompatibel mit allen bestehenden UUID-Spalten und -Tools',
    uuidv7Str4: 'Native Unterstützung in PostgreSQL 17+',
    uuidv7Weak1: 'Weniger zufällige Bits (74 vs 122) — immer noch astronomisch kollisionsresistent',
    uuidv7Weak2: 'Zeitstempel ist eingebettet — zeigt ungefähre Erstellungszeit',
    uuidv7Weak3: 'Bibliotheksunterstützung wächst noch (aber schnell)',
    h2Ulid: 'ULID: Lexikographisch sortierbar',
    ulidDesc: 'ULID (Universally Unique Lexicographically Sortable Identifier) ist älter als UUID v7 und teilt ein ähnliches Design: 48-Bit-Zeitstempel + 80 Bits Zufälligkeit. Der Hauptunterschied ist die Kodierung: <strong>Crockford Base32</strong>, die kompakte 26-Zeichen-Strings wie <code>01ARZ3NDEKTSV4RRFFQ69G5FAV</code> erzeugt.',
    ulidStr1: 'Kompakte String-Darstellung (26 Zeichen vs 36 bei UUID)',
    ulidStr2: 'Eingebaute Monotonie — IDs, die in derselben Millisekunde generiert werden, sind trotzdem geordnet',
    ulidStr3: 'Lexikographisch sortierbar als Strings (kein spezieller Vergleich nötig)',
    ulidStr4: 'Groß-/Kleinschreibung-unabhängig und URL-sicher',
    ulidWeak1: 'Kein RFC-Standard — nur Community-Spezifikation',
    ulidWeak2: 'Nicht kompatibel mit UUID-Spalten ohne Konvertierung',
    ulidWeak3: 'Weniger Bibliotheksunterstützung als UUID',
    h2Nanoid: 'NanoID: Kompakt und anpassbar',
    nanoidDesc: 'NanoID verfolgt einen anderen Ansatz: Anstelle eines festen Formats generiert es kompakte, URL-sichere Zufallsstrings mit einem <strong>konfigurierbaren Alphabet und konfigurierbarer Länge</strong>. Der Standard ist 21 Zeichen mit <code>A-Za-z0-9_-</code>.',
    nanoidStr1: 'Sehr kompakt (standardmäßig 21 Zeichen, anpassbar)',
    nanoidStr2: 'Standardmäßig URL-sicher',
    nanoidStr3: 'Anpassbares Alphabet und Länge',
    nanoidStr4: 'Winzige Bibliothek (~130 Bytes gzipped) — perfekt für das Frontend',
    nanoidStr5: 'Kryptographisch stark (verwendet crypto.getRandomValues)',
    nanoidWeak1: 'Keine Zeitordnung — gleiche B-Tree-Fragmentierungsprobleme wie UUID v4',
    nanoidWeak2: 'Keine Standardspezifikation',
    nanoidWeak3: 'Nicht kompatibel mit UUID-Infrastruktur',
    h2DecisionGuide: 'Entscheidungshilfe: Welchen sollten Sie wählen?',
    h3UseV7: 'Verwenden Sie UUID v7, wenn:',
    guideV7_1: 'Sie eine neue Anwendung mit einer relationalen Datenbank erstellen',
    guideV7_2: 'Sie zeitgeordnete IDs für effiziente Indizierung benötigen',
    guideV7_3: 'Ihr System das Standard-UUID-Format erwartet (PostgreSQL, MySQL usw.)',
    guideV7_4: 'Sie das beste Gleichgewicht zwischen Kompatibilität und Leistung wünschen',
    h3UseV4: 'Verwenden Sie UUID v4, wenn:',
    guideV4_1: 'Sie mit Systemen arbeiten, die nur UUID v4 unterstützen',
    guideV4_2: 'Sie maximale Zufälligkeit ohne Zeitstempel-Leck benötigen',
    guideV4_3: 'Die Datenbankgröße klein bis mittel ist (< 1M Zeilen)',
    h3UseUlid: 'Verwenden Sie ULID, wenn:',
    guideUlid1: 'Sie kürzere String-Darstellungen benötigen',
    guideUlid2: 'Sie mit Systemen arbeiten, die Strings lexikographisch sortieren',
    guideUlid3: 'Monotonie innerhalb derselben Millisekunde wichtig ist',
    guideUlid4: 'Sie keine UUID-Spaltenkompatibilität benötigen',
    h3UseNanoid: 'Verwenden Sie NanoID, wenn:',
    guideNanoid1: 'Sie IDs im Browser oder Frontend generieren',
    guideNanoid2: 'Die Bundle-Größe wichtig ist (NanoID hat 130 Bytes)',
    guideNanoid3: 'Sie kurze, URL-freundliche Bezeichner benötigen',
    guideNanoid4: 'Sie URL-Shortener, Einladungscodes oder Session-Tokens erstellen',
    h2PerfBenchmark: 'Leistungs-Benchmark: Datenbank-Inserts',
    perfDesc: 'Der wirkungsvollste Unterschied zwischen diesen Formaten ist die Datenbank-Insert-Leistung. Zeitgeordnete IDs (UUID v7, ULID) ermöglichen sequentielle B-Tree-Inserts, während zufällige IDs (UUID v4, NanoID) zufällige Seitenspaltungen verursachen:',
    thIdFormat: 'ID-Format',
    th1MInserts: '1M Inserts (PostgreSQL)',
    thIndexSize: 'Indexgröße',
    thInsertPattern: 'Insert-Muster',
    rowAutoIncrement: 'Auto-Inkrement',
    perfNote: 'Die Benchmark-Daten sind ungefähr und variieren je nach Hardware, Datenbankversion und Tabellenstruktur. Der relative Unterschied ist in allen Umgebungen konsistent.',
    h2Migration: 'Migrationspfad: UUID v4 zu UUID v7',
    migrationDesc: 'Wenn Sie eine Migration von UUID v4 zu UUID v7 in Betracht ziehen, ist die gute Nachricht, dass beide dasselbe 128-Bit-Format und dieselbe String-Darstellung teilen. In den meisten Datenbanken können Sie beginnen, UUID v7-Werte für neue Zeilen zu generieren, während bestehende UUID v4-Werte gültig bleiben:',
    h2Faq: 'Häufig gestellte Fragen',
    faqQ1: 'Sollte ich von UUID v4 zu UUID v7 migrieren?',
    faqA1: 'Wenn Ihre Anwendung UUIDs als Datenbank-Primärschlüssel verwendet und Sie Index-Fragmentierung oder langsame Inserts bei großem Umfang erleben, lohnt sich die Migration zu UUID v7. Für kleine bis mittlere Anwendungen funktioniert UUID v4 problemlos.',
    faqQ2: 'Ist NanoID sicher für Datenbank-Primärschlüssel?',
    faqA2: 'NanoID ist kryptographisch sicher und hat eine konfigurierbare Länge, aber es fehlt die Zeitordnung. Für Datenbank-Primärschlüssel, bei denen die Insert-Leistung wichtig ist, sind UUID v7 oder ULID die bessere Wahl. NanoID glänzt in Frontend-Anwendungen und URL-Shortenern.',
    faqQ3: 'Was ist der Unterschied zwischen UUID v7 und ULID?',
    faqA3: 'Beide sind zeitgeordnete eindeutige Bezeichner. UUID v7 folgt RFC 9562 und ist mit bestehender UUID-Infrastruktur kompatibel (128 Bit, Standardformat). ULID verwendet Crockford-Base32-Kodierung (26 Zeichen) und hat eine eingebaute Monotonie innerhalb derselben Millisekunde. UUID v7 ist besser für Systeme, die das UUID-Format erwarten; ULID ist als String kompakter.',
  },
  it: {
    intro: "Scegliere il formato giusto per gli identificatori univoci della propria applicazione è una decisione che influisce sulle prestazioni del database, sulla scalabilità e sull'esperienza dello sviluppatore. Con <strong>UUID v7</strong> ora standard ufficiale (RFC 9562, pubblicato nel 2024), il panorama della generazione di ID è cambiato significativamente. Questa guida confronta le quattro opzioni più popolari.",
    h2QuickComparison: 'Tabella di confronto rapido',
    thFeature: 'Caratteristica',
    rowSizeBytes: 'Dimensione (byte)',
    rowStringLength: 'Lunghezza stringa',
    rowTimeOrdered: 'Ordinato nel tempo',
    rowStandard: 'Standard',
    rowDbIndex: 'Compatibile con indici DB',
    rowCollisionResistance: 'Resistenza alle collisioni',
    rowUrlSafe: 'Sicuro per URL',
    rowLanguageSupport: 'Supporto linguaggi',
    h2Uuidv4: 'UUID v4: Lo standard consolidato',
    uuidv4Desc: 'UUID v4 è stata la scelta predefinita per oltre un decennio. Genera identificatori a 128 bit utilizzando 122 bit di casualità, producendo il formato familiare <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>.',
    strengths: 'Punti di forza:',
    weaknesses: 'Punti deboli:',
    uuidv4Str1: 'Supporto universale delle librerie in ogni linguaggio di programmazione',
    uuidv4Str2: 'Nessun coordinamento necessario — genera ovunque, in qualsiasi momento',
    uuidv4Str3: 'Semplice e ben compreso',
    uuidv4Weak1: "La distribuzione casuale causa frammentazione dell'indice B-tree nei database",
    uuidv4Weak2: 'Nessuna informazione temporale — impossibile ordinare per ordine di creazione',
    uuidv4Weak3: 'Su larga scala (milioni di righe), le prestazioni di inserimento si degradano significativamente',
    tryGenerator: 'Prova il nostro strumento Generatore UUID \u2192',
    h2Uuidv7: 'UUID v7: Il nuovo standard (RFC 9562)',
    uuidv7Desc: "UUID v7, finalizzato nella RFC 9562 (2024), è progettato specificamente per l'uso come chiavi di database. Combina un <strong>timestamp Unix a 48 bit (precisione al millisecondo)</strong> con 74 bit di casualità, producendo UUID ordinati nel tempo completamente compatibili con l'infrastruttura UUID esistente.",
    uuidv7Str1: 'Ordinato nel tempo — ordina naturalmente per data di creazione',
    uuidv7Str2: "Eccellenti prestazioni di inserimento nel database (nessuna frammentazione dell'indice)",
    uuidv7Str3: 'Compatibile con tutte le colonne e gli strumenti UUID esistenti',
    uuidv7Str4: 'Supporto nativo in PostgreSQL 17+',
    uuidv7Weak1: 'Meno bit casuali (74 vs 122) — comunque astronomicamente resistente alle collisioni',
    uuidv7Weak2: "Il timestamp è incorporato — rivela l'ora approssimativa di creazione",
    uuidv7Weak3: 'Il supporto delle librerie è ancora in crescita (ma rapidamente)',
    h2Ulid: 'ULID: Ordinabile lessicograficamente',
    ulidDesc: "ULID (Universally Unique Lexicographically Sortable Identifier) precede UUID v7 e condivide un design simile: timestamp a 48 bit + 80 bit di casualità. La differenza chiave è la codifica: <strong>Crockford Base32</strong>, che produce stringhe compatte di 26 caratteri come <code>01ARZ3NDEKTSV4RRFFQ69G5FAV</code>.",
    ulidStr1: 'Rappresentazione compatta in stringa (26 caratteri vs 36 di UUID)',
    ulidStr2: 'Monotonia integrata — gli ID generati nello stesso millisecondo sono comunque ordinati',
    ulidStr3: 'Ordinabile lessicograficamente come stringa (nessun confronto speciale necessario)',
    ulidStr4: 'Insensibile alle maiuscole e sicuro per URL',
    ulidWeak1: 'Non è uno standard RFC — solo specifica della community',
    ulidWeak2: 'Non compatibile con le colonne UUID senza conversione',
    ulidWeak3: 'Meno supporto di librerie rispetto a UUID',
    h2Nanoid: 'NanoID: Compatto e personalizzabile',
    nanoidDesc: "NanoID adotta un approccio diverso: invece di un formato fisso, genera stringhe casuali compatte e sicure per URL con un <strong>alfabeto e una lunghezza configurabili</strong>. Il valore predefinito è di 21 caratteri usando <code>A-Za-z0-9_-</code>.",
    nanoidStr1: 'Molto compatto (21 caratteri predefiniti, personalizzabile)',
    nanoidStr2: 'Sicuro per URL di default',
    nanoidStr3: 'Alfabeto e lunghezza personalizzabili',
    nanoidStr4: 'Libreria minuscola (~130 byte gzippati) — perfetta per il frontend',
    nanoidStr5: 'Crittograficamente robusto (usa crypto.getRandomValues)',
    nanoidWeak1: 'Nessun ordinamento temporale — stessi problemi di frammentazione B-tree di UUID v4',
    nanoidWeak2: 'Nessuna specifica standard',
    nanoidWeak3: "Non compatibile con l'infrastruttura UUID",
    h2DecisionGuide: 'Guida alla decisione: Quale scegliere?',
    h3UseV7: 'Usa UUID v7 quando:',
    guideV7_1: 'Stai costruendo una nuova applicazione con un database relazionale',
    guideV7_2: "Hai bisogno di ID ordinati nel tempo per un'indicizzazione efficiente",
    guideV7_3: 'Il tuo sistema si aspetta il formato UUID standard (PostgreSQL, MySQL, ecc.)',
    guideV7_4: 'Vuoi il miglior equilibrio tra compatibilità e prestazioni',
    h3UseV4: 'Usa UUID v4 quando:',
    guideV4_1: 'Lavori con sistemi che supportano solo UUID v4',
    guideV4_2: 'Hai bisogno della massima casualità senza perdita di timestamp',
    guideV4_3: 'La scala del database è da piccola a media (< 1M righe)',
    h3UseUlid: 'Usa ULID quando:',
    guideUlid1: 'Hai bisogno di rappresentazioni stringa più brevi',
    guideUlid2: 'Lavori con sistemi che ordinano le stringhe lessicograficamente',
    guideUlid3: "La monotonia all'interno dello stesso millisecondo è importante",
    guideUlid4: 'Non hai bisogno della compatibilità con le colonne UUID',
    h3UseNanoid: 'Usa NanoID quando:',
    guideNanoid1: 'Generi ID nel browser o nel frontend',
    guideNanoid2: 'La dimensione del bundle conta (NanoID è 130 byte)',
    guideNanoid3: 'Hai bisogno di identificatori brevi e compatibili con URL',
    guideNanoid4: 'Stai costruendo accorciatori di URL, codici di invito o token di sessione',
    h2PerfBenchmark: 'Benchmark delle prestazioni: Inserimenti nel database',
    perfDesc: 'La differenza più significativa tra questi formati è la prestazione di inserimento nel database. Gli ID ordinati nel tempo (UUID v7, ULID) mantengono inserimenti B-tree sequenziali, mentre gli ID casuali (UUID v4, NanoID) causano divisioni casuali delle pagine:',
    thIdFormat: 'Formato ID',
    th1MInserts: '1M inserimenti (PostgreSQL)',
    thIndexSize: 'Dimensione indice',
    thInsertPattern: 'Modello di inserimento',
    rowAutoIncrement: 'Auto-incremento',
    perfNote: "I dati del benchmark sono approssimativi e variano in base all'hardware, alla versione del database e alla struttura delle tabelle. La differenza relativa è coerente in tutti gli ambienti.",
    h2Migration: 'Percorso di migrazione: UUID v4 a UUID v7',
    migrationDesc: 'Se stai considerando la migrazione da UUID v4 a UUID v7, la buona notizia è che condividono lo stesso formato a 128 bit e la stessa rappresentazione stringa. Nella maggior parte dei database, puoi iniziare a generare valori UUID v7 per le nuove righe mentre i valori UUID v4 esistenti rimangono validi:',
    h2Faq: 'Domande frequenti',
    faqQ1: 'Dovrei migrare da UUID v4 a UUID v7?',
    faqA1: "Se la tua applicazione utilizza UUID come chiavi primarie del database e riscontri frammentazione dell'indice o inserimenti lenti su larga scala, la migrazione a UUID v7 vale la pena. Per applicazioni di dimensioni piccole-medie, UUID v4 funziona bene.",
    faqQ2: 'NanoID è sicuro per le chiavi primarie del database?',
    faqA2: "NanoID è crittograficamente sicuro e ha una lunghezza configurabile, ma manca di ordinamento temporale. Per le chiavi primarie del database dove le prestazioni di inserimento contano, UUID v7 o ULID sono scelte migliori. NanoID eccelle nelle applicazioni frontend e negli accorciatori di URL.",
    faqQ3: 'Qual è la differenza tra UUID v7 e ULID?',
    faqA3: "Entrambi sono identificatori univoci ordinati nel tempo. UUID v7 segue la RFC 9562 ed è compatibile con l'infrastruttura UUID esistente (128 bit, formato standard). ULID usa la codifica Crockford Base32 (26 caratteri) e ha una monotonia integrata all'interno dello stesso millisecondo. UUID v7 è migliore per sistemi che si aspettano il formato UUID; ULID è più compatto come stringa.",
  },
  es: {
    intro: 'Elegir el formato correcto de identificador único para tu aplicación es una decisión que afecta el rendimiento de la base de datos, la escalabilidad y la experiencia del desarrollador. Con <strong>UUID v7</strong> ahora como estándar oficial (RFC 9562, publicado en 2024), el panorama de la generación de IDs ha cambiado significativamente. Esta guía compara las cuatro opciones más populares.',
    h2QuickComparison: 'Tabla de comparación rápida',
    thFeature: 'Característica',
    rowSizeBytes: 'Tamaño (bytes)',
    rowStringLength: 'Longitud de cadena',
    rowTimeOrdered: 'Ordenado por tiempo',
    rowStandard: 'Estándar',
    rowDbIndex: 'Compatible con índices DB',
    rowCollisionResistance: 'Resistencia a colisiones',
    rowUrlSafe: 'Seguro para URL',
    rowLanguageSupport: 'Soporte de lenguajes',
    h2Uuidv4: 'UUID v4: El estándar establecido',
    uuidv4Desc: 'UUID v4 ha sido la opción predeterminada durante más de una década. Genera identificadores de 128 bits utilizando 122 bits de aleatoriedad, produciendo el formato familiar <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>.',
    strengths: 'Fortalezas:',
    weaknesses: 'Debilidades:',
    uuidv4Str1: 'Soporte universal de bibliotecas en todos los lenguajes de programación',
    uuidv4Str2: 'No se necesita coordinación — genera en cualquier lugar, en cualquier momento',
    uuidv4Str3: 'Simple y bien comprendido',
    uuidv4Weak1: 'La distribución aleatoria causa fragmentación del índice B-tree en las bases de datos',
    uuidv4Weak2: 'Sin información temporal — no se puede ordenar por orden de creación',
    uuidv4Weak3: 'A gran escala (millones de filas), el rendimiento de inserción se degrada significativamente',
    tryGenerator: 'Prueba nuestra herramienta Generador de UUID \u2192',
    h2Uuidv7: 'UUID v7: El nuevo estándar (RFC 9562)',
    uuidv7Desc: 'UUID v7, finalizado en RFC 9562 (2024), está diseñado específicamente para su uso como claves de base de datos. Combina una <strong>marca de tiempo Unix de 48 bits (precisión de milisegundos)</strong> con 74 bits de aleatoriedad, produciendo UUIDs ordenados por tiempo totalmente compatibles con la infraestructura UUID existente.',
    uuidv7Str1: 'Ordenado por tiempo — ordena naturalmente por fecha de creación',
    uuidv7Str2: 'Excelente rendimiento de inserción en base de datos (sin fragmentación de índice)',
    uuidv7Str3: 'Compatible con todas las columnas y herramientas UUID existentes',
    uuidv7Str4: 'Soporte nativo en PostgreSQL 17+',
    uuidv7Weak1: 'Menos bits aleatorios (74 vs 122) — aún astronómicamente resistente a colisiones',
    uuidv7Weak2: 'La marca de tiempo está incrustada — revela la hora aproximada de creación',
    uuidv7Weak3: 'El soporte de bibliotecas aún está creciendo (pero rápidamente)',
    h2Ulid: 'ULID: Ordenable lexicográficamente',
    ulidDesc: 'ULID (Universally Unique Lexicographically Sortable Identifier) es anterior a UUID v7 y comparte un diseño similar: marca de tiempo de 48 bits + 80 bits de aleatoriedad. La diferencia clave es su codificación: <strong>Crockford Base32</strong>, que produce cadenas compactas de 26 caracteres como <code>01ARZ3NDEKTSV4RRFFQ69G5FAV</code>.',
    ulidStr1: 'Representación compacta en cadena (26 caracteres vs 36 de UUID)',
    ulidStr2: 'Monotonía incorporada — los IDs generados en el mismo milisegundo siguen ordenados',
    ulidStr3: 'Ordenable lexicográficamente como cadena (sin comparación especial necesaria)',
    ulidStr4: 'Insensible a mayúsculas y seguro para URL',
    ulidWeak1: 'No es un estándar RFC — solo especificación de la comunidad',
    ulidWeak2: 'No compatible con columnas UUID sin conversión',
    ulidWeak3: 'Menos soporte de bibliotecas que UUID',
    h2Nanoid: 'NanoID: Compacto y personalizable',
    nanoidDesc: 'NanoID adopta un enfoque diferente: en lugar de un formato fijo, genera cadenas aleatorias compactas y seguras para URL con un <strong>alfabeto y longitud configurables</strong>. El valor predeterminado es de 21 caracteres usando <code>A-Za-z0-9_-</code>.',
    nanoidStr1: 'Muy compacto (21 caracteres por defecto, personalizable)',
    nanoidStr2: 'Seguro para URL por defecto',
    nanoidStr3: 'Alfabeto y longitud personalizables',
    nanoidStr4: 'Biblioteca diminuta (~130 bytes gzipped) — perfecta para el frontend',
    nanoidStr5: 'Criptográficamente fuerte (usa crypto.getRandomValues)',
    nanoidWeak1: 'Sin ordenamiento temporal — mismos problemas de fragmentación B-tree que UUID v4',
    nanoidWeak2: 'Sin especificación estándar',
    nanoidWeak3: 'No compatible con la infraestructura UUID',
    h2DecisionGuide: 'Guía de decisión: ¿Cuál deberías elegir?',
    h3UseV7: 'Usa UUID v7 cuando:',
    guideV7_1: 'Estés construyendo una nueva aplicación con una base de datos relacional',
    guideV7_2: 'Necesites IDs ordenados por tiempo para indexación eficiente',
    guideV7_3: 'Tu sistema espera el formato UUID estándar (PostgreSQL, MySQL, etc.)',
    guideV7_4: 'Quieras el mejor equilibrio entre compatibilidad y rendimiento',
    h3UseV4: 'Usa UUID v4 cuando:',
    guideV4_1: 'Trabajes con sistemas que solo soportan UUID v4',
    guideV4_2: 'Necesites máxima aleatoriedad sin filtración de marca de tiempo',
    guideV4_3: 'La escala de la base de datos es de pequeña a mediana (< 1M filas)',
    h3UseUlid: 'Usa ULID cuando:',
    guideUlid1: 'Necesites representaciones de cadena más cortas',
    guideUlid2: 'Trabajes con sistemas que ordenan cadenas lexicográficamente',
    guideUlid3: 'La monotonía dentro del mismo milisegundo es importante',
    guideUlid4: 'No necesites compatibilidad con columnas UUID',
    h3UseNanoid: 'Usa NanoID cuando:',
    guideNanoid1: 'Generes IDs en el navegador o frontend',
    guideNanoid2: 'El tamaño del bundle importa (NanoID tiene 130 bytes)',
    guideNanoid3: 'Necesites identificadores cortos y compatibles con URL',
    guideNanoid4: 'Estés construyendo acortadores de URL, códigos de invitación o tokens de sesión',
    h2PerfBenchmark: 'Benchmark de rendimiento: Inserciones en base de datos',
    perfDesc: 'La diferencia más impactante entre estos formatos es el rendimiento de inserción en base de datos. Los IDs ordenados por tiempo (UUID v7, ULID) mantienen inserciones B-tree secuenciales, mientras que los IDs aleatorios (UUID v4, NanoID) causan divisiones de páginas aleatorias:',
    thIdFormat: 'Formato de ID',
    th1MInserts: '1M inserciones (PostgreSQL)',
    thIndexSize: 'Tamaño del índice',
    thInsertPattern: 'Patrón de inserción',
    rowAutoIncrement: 'Auto-incremento',
    perfNote: 'Los datos del benchmark son aproximados y varían según el hardware, la versión de la base de datos y la estructura de las tablas. La diferencia relativa es consistente en todos los entornos.',
    h2Migration: 'Ruta de migración: UUID v4 a UUID v7',
    migrationDesc: 'Si estás considerando migrar de UUID v4 a UUID v7, la buena noticia es que comparten el mismo formato de 128 bits y la misma representación en cadena. En la mayoría de las bases de datos, puedes comenzar a generar valores UUID v7 para nuevas filas mientras los valores UUID v4 existentes siguen siendo válidos:',
    h2Faq: 'Preguntas frecuentes',
    faqQ1: '¿Debería migrar de UUID v4 a UUID v7?',
    faqA1: 'Si tu aplicación utiliza UUIDs como claves primarias de base de datos y experimentas fragmentación de índice o inserciones lentas a gran escala, vale la pena considerar la migración a UUID v7. Para aplicaciones de tamaño pequeño a mediano, UUID v4 funciona bien.',
    faqQ2: '¿Es NanoID seguro para claves primarias de base de datos?',
    faqA2: 'NanoID es criptográficamente seguro y tiene una longitud configurable, pero carece de ordenamiento temporal. Para claves primarias de base de datos donde el rendimiento de inserción importa, UUID v7 o ULID son mejores opciones. NanoID destaca en aplicaciones frontend y acortadores de URL.',
    faqQ3: '¿Cuál es la diferencia entre UUID v7 y ULID?',
    faqA3: 'Ambos son identificadores únicos ordenados por tiempo. UUID v7 sigue RFC 9562 y es compatible con la infraestructura UUID existente (128 bits, formato estándar). ULID usa codificación Crockford Base32 (26 caracteres) y tiene monotonía incorporada dentro del mismo milisegundo. UUID v7 es mejor para sistemas que esperan formato UUID; ULID es más compacto como cadena.',
  },
  zh: {
    intro: '为应用程序选择正确的唯一标识符格式是一个影响数据库性能、可扩展性和开发者体验的决策。随着 <strong>UUID v7</strong> 成为正式标准（RFC 9562，2024 年发布），ID 生成的格局已经发生了重大变化。本指南比较了四种最流行的选项。',
    h2QuickComparison: '快速对比表',
    thFeature: '特性',
    rowSizeBytes: '大小（字节）',
    rowStringLength: '字符串长度',
    rowTimeOrdered: '时间有序',
    rowStandard: '标准',
    rowDbIndex: '数据库索引友好',
    rowCollisionResistance: '抗碰撞性',
    rowUrlSafe: 'URL 安全',
    rowLanguageSupport: '语言支持',
    h2Uuidv4: 'UUID v4：成熟的标准',
    uuidv4Desc: 'UUID v4 十多年来一直是默认选择。它使用 122 位随机数生成 128 位标识符，产生熟悉的 <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code> 格式。',
    strengths: '优势：',
    weaknesses: '劣势：',
    uuidv4Str1: '在所有编程语言中都有通用的库支持',
    uuidv4Str2: '无需协调——随时随地生成',
    uuidv4Str3: '简单且易于理解',
    uuidv4Weak1: '随机分布导致数据库中的 B-tree 索引碎片化',
    uuidv4Weak2: '没有时间信息——无法按创建顺序排序',
    uuidv4Weak3: '在大规模（数百万行）情况下，插入性能显著下降',
    tryGenerator: '试用我们的 UUID 生成器工具 \u2192',
    h2Uuidv7: 'UUID v7：新标准（RFC 9562）',
    uuidv7Desc: 'UUID v7 在 RFC 9562（2024）中最终确定，专门设计用作数据库键。它将 <strong>48 位 Unix 时间戳（毫秒精度）</strong>与 74 位随机数结合，生成与现有 UUID 基础设施完全兼容的时间有序 UUID。',
    uuidv7Str1: '时间有序——自然按创建时间排序',
    uuidv7Str2: '优秀的数据库插入性能（无索引碎片化）',
    uuidv7Str3: '与所有现有的 UUID 列和工具兼容',
    uuidv7Str4: 'PostgreSQL 17+ 原生支持',
    uuidv7Weak1: '随机位更少（74 vs 122）——但仍具有极高的抗碰撞性',
    uuidv7Weak2: '时间戳被嵌入——会暴露大致的创建时间',
    uuidv7Weak3: '库支持仍在增长中（但增速很快）',
    h2Ulid: 'ULID：可字典序排序',
    ulidDesc: 'ULID（Universally Unique Lexicographically Sortable Identifier）早于 UUID v7，并共享类似的设计：48 位时间戳 + 80 位随机数。关键区别在于其编码方式：<strong>Crockford Base32</strong>，生成紧凑的 26 字符字符串，如 <code>01ARZ3NDEKTSV4RRFFQ69G5FAV</code>。',
    ulidStr1: '紧凑的字符串表示（26 个字符 vs UUID 的 36 个）',
    ulidStr2: '内置单调性——在同一毫秒内生成的 ID 仍然有序',
    ulidStr3: '作为字符串可字典序排序（无需特殊比较）',
    ulidStr4: '大小写不敏感且 URL 安全',
    ulidWeak1: '不是 RFC 标准——仅为社区规范',
    ulidWeak2: '不经过转换则与 UUID 列不兼容',
    ulidWeak3: '比 UUID 的库支持更少',
    h2Nanoid: 'NanoID：紧凑且可定制',
    nanoidDesc: 'NanoID 采用了不同的方法：它不使用固定格式，而是生成紧凑的、URL 安全的随机字符串，具有<strong>可配置的字母表和长度</strong>。默认值为 21 个字符，使用 <code>A-Za-z0-9_-</code>。',
    nanoidStr1: '非常紧凑（默认 21 个字符，可定制）',
    nanoidStr2: '默认 URL 安全',
    nanoidStr3: '可定制的字母表和长度',
    nanoidStr4: '极小的库（gzip 后约 130 字节）——非常适合前端',
    nanoidStr5: '加密强度高（使用 crypto.getRandomValues）',
    nanoidWeak1: '无时间排序——与 UUID v4 存在相同的 B-tree 碎片化问题',
    nanoidWeak2: '没有标准规范',
    nanoidWeak3: '与 UUID 基础设施不兼容',
    h2DecisionGuide: '决策指南：你应该选择哪个？',
    h3UseV7: '在以下情况使用 UUID v7：',
    guideV7_1: '使用关系型数据库构建新应用',
    guideV7_2: '需要时间有序的 ID 以实现高效索引',
    guideV7_3: '系统期望标准 UUID 格式（PostgreSQL、MySQL 等）',
    guideV7_4: '希望获得兼容性和性能的最佳平衡',
    h3UseV4: '在以下情况使用 UUID v4：',
    guideV4_1: '使用仅支持 UUID v4 的系统',
    guideV4_2: '需要最大随机性且不泄露时间戳',
    guideV4_3: '数据库规模为中小型（< 100 万行）',
    h3UseUlid: '在以下情况使用 ULID：',
    guideUlid1: '需要更短的字符串表示',
    guideUlid2: '使用按字典序排序字符串的系统',
    guideUlid3: '同一毫秒内的单调性很重要',
    guideUlid4: '不需要 UUID 列兼容性',
    h3UseNanoid: '在以下情况使用 NanoID：',
    guideNanoid1: '在浏览器或前端生成 ID',
    guideNanoid2: '包大小很重要（NanoID 仅 130 字节）',
    guideNanoid3: '需要短小的、URL 友好的标识符',
    guideNanoid4: '构建 URL 缩短器、邀请码或会话令牌',
    h2PerfBenchmark: '性能基准测试：数据库插入',
    perfDesc: '这些格式之间最具影响力的区别是数据库插入性能。时间有序的 ID（UUID v7、ULID）保持顺序 B-tree 插入，而随机 ID（UUID v4、NanoID）导致随机页面分裂：',
    thIdFormat: 'ID 格式',
    th1MInserts: '100 万次插入（PostgreSQL）',
    thIndexSize: '索引大小',
    thInsertPattern: '插入模式',
    rowAutoIncrement: '自增',
    perfNote: '基准测试数据为近似值，会因硬件、数据库版本和表结构而异。相对差异在所有环境中保持一致。',
    h2Migration: '迁移路径：UUID v4 到 UUID v7',
    migrationDesc: '如果你正在考虑从 UUID v4 迁移到 UUID v7，好消息是它们共享相同的 128 位格式和字符串表示。在大多数数据库中，你可以开始为新行生成 UUID v7 值，同时现有的 UUID v4 值保持有效：',
    h2Faq: '常见问题',
    faqQ1: '我应该从 UUID v4 迁移到 UUID v7 吗？',
    faqA1: '如果你的应用使用 UUID 作为数据库主键，并且在大规模情况下遇到索引碎片化或插入缓慢的问题，那么迁移到 UUID v7 值得考虑。对于中小型应用，UUID v4 工作正常。',
    faqQ2: 'NanoID 适合用作数据库主键吗？',
    faqA2: 'NanoID 具有加密安全性和可配置长度，但缺少时间排序。对于插入性能很重要的数据库主键，UUID v7 或 ULID 是更好的选择。NanoID 在前端应用和 URL 缩短器中表现出色。',
    faqQ3: 'UUID v7 和 ULID 之间有什么区别？',
    faqA3: '两者都是时间有序的唯一标识符。UUID v7 遵循 RFC 9562，与现有 UUID 基础设施兼容（128 位，标准格式）。ULID 使用 Crockford Base32 编码（26 个字符），并在同一毫秒内具有内置单调性。UUID v7 更适合期望 UUID 格式的系统；ULID 作为字符串更紧凑。',
  },
  id: {
    intro: 'Memilih format pengidentifikasi unik yang tepat untuk aplikasi Anda adalah keputusan yang mempengaruhi kinerja database, skalabilitas, dan pengalaman pengembang. Dengan <strong>UUID v7</strong> yang kini menjadi standar resmi (RFC 9562, diterbitkan 2024), lanskap pembuatan ID telah berubah secara signifikan. Panduan ini membandingkan empat opsi paling populer.',
    h2QuickComparison: 'Tabel Perbandingan Cepat',
    thFeature: 'Fitur',
    rowSizeBytes: 'Ukuran (byte)',
    rowStringLength: 'Panjang string',
    rowTimeOrdered: 'Terurut waktu',
    rowStandard: 'Standar',
    rowDbIndex: 'Ramah indeks DB',
    rowCollisionResistance: 'Ketahanan terhadap tabrakan',
    rowUrlSafe: 'Aman untuk URL',
    rowLanguageSupport: 'Dukungan bahasa',
    h2Uuidv4: 'UUID v4: Standar yang Mapan',
    uuidv4Desc: 'UUID v4 telah menjadi pilihan default selama lebih dari satu dekade. Ia menghasilkan pengidentifikasi 128-bit menggunakan 122 bit keacakan, menghasilkan format yang familiar <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>.',
    strengths: 'Kekuatan:',
    weaknesses: 'Kelemahan:',
    uuidv4Str1: 'Dukungan pustaka universal di setiap bahasa pemrograman',
    uuidv4Str2: 'Tidak perlu koordinasi — hasilkan di mana saja, kapan saja',
    uuidv4Str3: 'Sederhana dan mudah dipahami',
    uuidv4Weak1: 'Distribusi acak menyebabkan fragmentasi indeks B-tree pada database',
    uuidv4Weak2: 'Tidak ada informasi waktu — tidak dapat mengurutkan berdasarkan urutan pembuatan',
    uuidv4Weak3: 'Pada skala besar (jutaan baris), kinerja penyisipan menurun secara signifikan',
    tryGenerator: 'Coba alat Generator UUID kami \u2192',
    h2Uuidv7: 'UUID v7: Standar Baru (RFC 9562)',
    uuidv7Desc: 'UUID v7, yang diselesaikan dalam RFC 9562 (2024), dirancang khusus untuk digunakan sebagai kunci database. Ia menggabungkan <strong>stempel waktu Unix 48-bit (presisi milidetik)</strong> dengan 74 bit keacakan, menghasilkan UUID terurut waktu yang sepenuhnya kompatibel dengan infrastruktur UUID yang ada.',
    uuidv7Str1: 'Terurut waktu — secara alami mengurutkan berdasarkan waktu pembuatan',
    uuidv7Str2: 'Kinerja penyisipan database yang sangat baik (tanpa fragmentasi indeks)',
    uuidv7Str3: 'Kompatibel dengan semua kolom dan alat UUID yang ada',
    uuidv7Str4: 'Dukungan native di PostgreSQL 17+',
    uuidv7Weak1: 'Bit acak lebih sedikit (74 vs 122) — tetap sangat tahan terhadap tabrakan',
    uuidv7Weak2: 'Stempel waktu tertanam — mengungkapkan perkiraan waktu pembuatan',
    uuidv7Weak3: 'Dukungan pustaka masih berkembang (tapi cepat)',
    h2Ulid: 'ULID: Dapat Diurutkan Secara Leksikografis',
    ulidDesc: 'ULID (Universally Unique Lexicographically Sortable Identifier) mendahului UUID v7 dan berbagi desain serupa: stempel waktu 48-bit + 80 bit keacakan. Perbedaan utamanya adalah pengkodean: <strong>Crockford Base32</strong>, menghasilkan string ringkas 26 karakter seperti <code>01ARZ3NDEKTSV4RRFFQ69G5FAV</code>.',
    ulidStr1: 'Representasi string yang ringkas (26 karakter vs 36 untuk UUID)',
    ulidStr2: 'Monotonisitas bawaan — ID yang dihasilkan dalam milidetik yang sama tetap terurut',
    ulidStr3: 'Dapat diurutkan secara leksikografis sebagai string (tanpa perbandingan khusus)',
    ulidStr4: 'Tidak peka huruf besar-kecil dan aman untuk URL',
    ulidWeak1: 'Bukan standar RFC — hanya spesifikasi komunitas',
    ulidWeak2: 'Tidak kompatibel dengan kolom UUID tanpa konversi',
    ulidWeak3: 'Dukungan pustaka lebih sedikit dibanding UUID',
    h2Nanoid: 'NanoID: Ringkas dan Dapat Disesuaikan',
    nanoidDesc: 'NanoID mengambil pendekatan berbeda: alih-alih format tetap, ia menghasilkan string acak yang ringkas dan aman untuk URL dengan <strong>alfabet dan panjang yang dapat dikonfigurasi</strong>. Default adalah 21 karakter menggunakan <code>A-Za-z0-9_-</code>.',
    nanoidStr1: 'Sangat ringkas (default 21 karakter, dapat disesuaikan)',
    nanoidStr2: 'Aman untuk URL secara default',
    nanoidStr3: 'Alfabet dan panjang yang dapat disesuaikan',
    nanoidStr4: 'Pustaka sangat kecil (~130 byte gzip) — sempurna untuk frontend',
    nanoidStr5: 'Kuat secara kriptografis (menggunakan crypto.getRandomValues)',
    nanoidWeak1: 'Tidak ada pengurutan waktu — masalah fragmentasi B-tree yang sama dengan UUID v4',
    nanoidWeak2: 'Tidak ada spesifikasi standar',
    nanoidWeak3: 'Tidak kompatibel dengan infrastruktur UUID',
    h2DecisionGuide: 'Panduan Keputusan: Mana yang Harus Anda Pilih?',
    h3UseV7: 'Gunakan UUID v7 ketika:',
    guideV7_1: 'Membangun aplikasi baru dengan database relasional',
    guideV7_2: 'Anda membutuhkan ID terurut waktu untuk pengindeksan yang efisien',
    guideV7_3: 'Sistem Anda mengharapkan format UUID standar (PostgreSQL, MySQL, dll.)',
    guideV7_4: 'Anda menginginkan keseimbangan terbaik antara kompatibilitas dan kinerja',
    h3UseV4: 'Gunakan UUID v4 ketika:',
    guideV4_1: 'Bekerja dengan sistem yang hanya mendukung UUID v4',
    guideV4_2: 'Anda membutuhkan keacakan maksimum tanpa kebocoran stempel waktu',
    guideV4_3: 'Skala database kecil hingga menengah (< 1 juta baris)',
    h3UseUlid: 'Gunakan ULID ketika:',
    guideUlid1: 'Anda membutuhkan representasi string yang lebih pendek',
    guideUlid2: 'Bekerja dengan sistem yang mengurutkan string secara leksikografis',
    guideUlid3: 'Monotonisitas dalam milidetik yang sama penting',
    guideUlid4: 'Anda tidak memerlukan kompatibilitas kolom UUID',
    h3UseNanoid: 'Gunakan NanoID ketika:',
    guideNanoid1: 'Menghasilkan ID di browser atau frontend',
    guideNanoid2: 'Ukuran bundle penting (NanoID hanya 130 byte)',
    guideNanoid3: 'Anda membutuhkan pengidentifikasi pendek yang ramah URL',
    guideNanoid4: 'Membangun pemendek URL, kode undangan, atau token sesi',
    h2PerfBenchmark: 'Benchmark Kinerja: Penyisipan Database',
    perfDesc: 'Perbedaan paling berdampak antara format-format ini adalah kinerja penyisipan database. ID terurut waktu (UUID v7, ULID) mempertahankan penyisipan B-tree sekuensial, sementara ID acak (UUID v4, NanoID) menyebabkan pemisahan halaman acak:',
    thIdFormat: 'Format ID',
    th1MInserts: '1 Juta Penyisipan (PostgreSQL)',
    thIndexSize: 'Ukuran Indeks',
    thInsertPattern: 'Pola Penyisipan',
    rowAutoIncrement: 'Auto-increment',
    perfNote: 'Data benchmark bersifat perkiraan dan bervariasi berdasarkan perangkat keras, versi database, dan struktur tabel. Perbedaan relatif konsisten di semua lingkungan.',
    h2Migration: 'Jalur Migrasi: UUID v4 ke UUID v7',
    migrationDesc: 'Jika Anda mempertimbangkan migrasi dari UUID v4 ke UUID v7, kabar baiknya adalah keduanya berbagi format 128-bit dan representasi string yang sama. Di sebagian besar database, Anda dapat mulai menghasilkan nilai UUID v7 untuk baris baru sementara nilai UUID v4 yang ada tetap valid:',
    h2Faq: 'Pertanyaan yang Sering Diajukan',
    faqQ1: 'Haruskah saya bermigrasi dari UUID v4 ke UUID v7?',
    faqA1: 'Jika aplikasi Anda menggunakan UUID sebagai kunci primer database dan Anda mengalami fragmentasi indeks atau penyisipan lambat pada skala besar, migrasi ke UUID v7 patut dipertimbangkan. Untuk aplikasi berukuran kecil hingga menengah, UUID v4 berfungsi dengan baik.',
    faqQ2: 'Apakah NanoID aman untuk kunci primer database?',
    faqA2: 'NanoID aman secara kriptografis dan memiliki panjang yang dapat dikonfigurasi, tetapi tidak memiliki pengurutan waktu. Untuk kunci primer database di mana kinerja penyisipan penting, UUID v7 atau ULID adalah pilihan yang lebih baik. NanoID unggul dalam aplikasi frontend dan pemendek URL.',
    faqQ3: 'Apa perbedaan antara UUID v7 dan ULID?',
    faqA3: 'Keduanya adalah pengidentifikasi unik yang terurut waktu. UUID v7 mengikuti RFC 9562 dan kompatibel dengan infrastruktur UUID yang ada (128-bit, format standar). ULID menggunakan pengkodean Crockford Base32 (26 karakter) dan memiliki monotonisitas bawaan dalam milidetik yang sama. UUID v7 lebih baik untuk sistem yang mengharapkan format UUID; ULID lebih ringkas sebagai string.',
  },
  th: {
    intro: 'การเลือกรูปแบบตัวระบุเฉพาะที่เหมาะสมสำหรับแอปพลิเคชันของคุณเป็นการตัดสินใจที่ส่งผลต่อประสิทธิภาพฐานข้อมูล ความสามารถในการปรับขนาด และประสบการณ์ของนักพัฒนา เมื่อ <strong>UUID v7</strong> กลายเป็นมาตรฐานอย่างเป็นทางการ (RFC 9562 เผยแพร่ในปี 2024) ภูมิทัศน์ของการสร้าง ID ได้เปลี่ยนแปลงไปอย่างมาก คู่มือนี้เปรียบเทียบสี่ตัวเลือกที่ได้รับความนิยมมากที่สุด',
    h2QuickComparison: 'ตารางเปรียบเทียบแบบเร็ว',
    thFeature: 'คุณสมบัติ',
    rowSizeBytes: 'ขนาด (ไบต์)',
    rowStringLength: 'ความยาวสตริง',
    rowTimeOrdered: 'เรียงตามเวลา',
    rowStandard: 'มาตรฐาน',
    rowDbIndex: 'เป็นมิตรกับดัชนี DB',
    rowCollisionResistance: 'ความทนทานต่อการชน',
    rowUrlSafe: 'ปลอดภัยสำหรับ URL',
    rowLanguageSupport: 'การรองรับภาษา',
    h2Uuidv4: 'UUID v4: มาตรฐานที่ยืนยง',
    uuidv4Desc: 'UUID v4 เป็นตัวเลือกเริ่มต้นมานานกว่าทศวรรษ สร้างตัวระบุ 128 บิตโดยใช้ 122 บิตของความสุ่ม สร้างรูปแบบที่คุ้นเคย <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>',
    strengths: 'จุดแข็ง:',
    weaknesses: 'จุดอ่อน:',
    uuidv4Str1: 'การรองรับไลบรารีแบบสากลในทุกภาษาโปรแกรม',
    uuidv4Str2: 'ไม่ต้องประสานงาน — สร้างได้ทุกที่ทุกเวลา',
    uuidv4Str3: 'เรียบง่ายและเข้าใจง่าย',
    uuidv4Weak1: 'การกระจายแบบสุ่มทำให้เกิดการแตกกระจายของดัชนี B-tree ในฐานข้อมูล',
    uuidv4Weak2: 'ไม่มีข้อมูลเวลา — ไม่สามารถเรียงตามลำดับการสร้าง',
    uuidv4Weak3: 'ในระดับขนาดใหญ่ (หลายล้านแถว) ประสิทธิภาพการแทรกจะลดลงอย่างมาก',
    tryGenerator: 'ลองใช้เครื่องมือสร้าง UUID ของเรา \u2192',
    h2Uuidv7: 'UUID v7: มาตรฐานใหม่ (RFC 9562)',
    uuidv7Desc: 'UUID v7 ซึ่งสรุปใน RFC 9562 (2024) ได้รับการออกแบบมาโดยเฉพาะสำหรับใช้เป็นคีย์ฐานข้อมูล มันรวม<strong>ไทม์สแตมป์ Unix 48 บิต (ความแม่นยำระดับมิลลิวินาที)</strong>กับ 74 บิตของความสุ่ม สร้าง UUID ที่เรียงตามเวลาซึ่งเข้ากันได้กับโครงสร้างพื้นฐาน UUID ที่มีอยู่',
    uuidv7Str1: 'เรียงตามเวลา — เรียงตามเวลาสร้างโดยธรรมชาติ',
    uuidv7Str2: 'ประสิทธิภาพการแทรกฐานข้อมูลยอดเยี่ยม (ไม่มีการแตกกระจายของดัชนี)',
    uuidv7Str3: 'เข้ากันได้กับคอลัมน์และเครื่องมือ UUID ที่มีอยู่ทั้งหมด',
    uuidv7Str4: 'รองรับแบบ native ใน PostgreSQL 17+',
    uuidv7Weak1: 'บิตสุ่มน้อยกว่า (74 เทียบกับ 122) — แต่ยังคงทนทานต่อการชนอย่างสูง',
    uuidv7Weak2: 'ไทม์สแตมป์ถูกฝังไว้ — เปิดเผยเวลาสร้างโดยประมาณ',
    uuidv7Weak3: 'การรองรับไลบรารียังคงเติบโต (แต่เร็วมาก)',
    h2Ulid: 'ULID: เรียงลำดับตามพจนานุกรมได้',
    ulidDesc: 'ULID (Universally Unique Lexicographically Sortable Identifier) มีมาก่อน UUID v7 และมีการออกแบบคล้ายกัน: ไทม์สแตมป์ 48 บิต + 80 บิตของความสุ่ม ความแตกต่างหลักคือการเข้ารหัส: <strong>Crockford Base32</strong> สร้างสตริงกระชับ 26 ตัวอักษร เช่น <code>01ARZ3NDEKTSV4RRFFQ69G5FAV</code>',
    ulidStr1: 'การแสดงผลสตริงที่กระชับ (26 ตัวอักษร เทียบกับ 36 ของ UUID)',
    ulidStr2: 'ความเป็นเอกภาพในตัว — ID ที่สร้างในมิลลิวินาทีเดียวกันยังคงเรียงลำดับ',
    ulidStr3: 'เรียงลำดับตามพจนานุกรมเป็นสตริงได้ (ไม่ต้องเปรียบเทียบพิเศษ)',
    ulidStr4: 'ไม่คำนึงถึงตัวพิมพ์เล็กใหญ่และปลอดภัยสำหรับ URL',
    ulidWeak1: 'ไม่ใช่มาตรฐาน RFC — เป็นเพียงข้อกำหนดของชุมชน',
    ulidWeak2: 'ไม่เข้ากันได้กับคอลัมน์ UUID โดยไม่แปลง',
    ulidWeak3: 'การรองรับไลบรารีน้อยกว่า UUID',
    h2Nanoid: 'NanoID: กระชับและปรับแต่งได้',
    nanoidDesc: 'NanoID ใช้แนวทางที่แตกต่าง: แทนที่จะใช้รูปแบบตายตัว มันสร้างสตริงสุ่มที่กระชับและปลอดภัยสำหรับ URL ด้วย<strong>ตัวอักษรและความยาวที่กำหนดเองได้</strong> ค่าเริ่มต้นคือ 21 ตัวอักษรโดยใช้ <code>A-Za-z0-9_-</code>',
    nanoidStr1: 'กระชับมาก (ค่าเริ่มต้น 21 ตัวอักษร ปรับแต่งได้)',
    nanoidStr2: 'ปลอดภัยสำหรับ URL โดยค่าเริ่มต้น',
    nanoidStr3: 'ตัวอักษรและความยาวที่ปรับแต่งได้',
    nanoidStr4: 'ไลบรารีขนาดเล็กมาก (~130 ไบต์ gzip) — เหมาะสำหรับ frontend',
    nanoidStr5: 'แข็งแกร่งทางการเข้ารหัส (ใช้ crypto.getRandomValues)',
    nanoidWeak1: 'ไม่มีการเรียงตามเวลา — มีปัญหาการแตกกระจาย B-tree เหมือน UUID v4',
    nanoidWeak2: 'ไม่มีข้อกำหนดมาตรฐาน',
    nanoidWeak3: 'ไม่เข้ากันได้กับโครงสร้างพื้นฐาน UUID',
    h2DecisionGuide: 'คู่มือการตัดสินใจ: คุณควรเลือกอันไหน?',
    h3UseV7: 'ใช้ UUID v7 เมื่อ:',
    guideV7_1: 'สร้างแอปพลิเคชันใหม่ด้วยฐานข้อมูลเชิงสัมพันธ์',
    guideV7_2: 'คุณต้องการ ID ที่เรียงตามเวลาสำหรับการจัดทำดัชนีที่มีประสิทธิภาพ',
    guideV7_3: 'ระบบของคุณคาดหวังรูปแบบ UUID มาตรฐาน (PostgreSQL, MySQL ฯลฯ)',
    guideV7_4: 'คุณต้องการความสมดุลที่ดีที่สุดระหว่างความเข้ากันได้และประสิทธิภาพ',
    h3UseV4: 'ใช้ UUID v4 เมื่อ:',
    guideV4_1: 'ทำงานกับระบบที่รองรับเฉพาะ UUID v4',
    guideV4_2: 'คุณต้องการความสุ่มสูงสุดโดยไม่รั่วไหลไทม์สแตมป์',
    guideV4_3: 'ขนาดฐานข้อมูลเล็กถึงกลาง (< 1 ล้านแถว)',
    h3UseUlid: 'ใช้ ULID เมื่อ:',
    guideUlid1: 'คุณต้องการการแสดงผลสตริงที่สั้นกว่า',
    guideUlid2: 'ทำงานกับระบบที่เรียงสตริงตามพจนานุกรม',
    guideUlid3: 'ความเป็นเอกภาพในมิลลิวินาทีเดียวกันมีความสำคัญ',
    guideUlid4: 'คุณไม่ต้องการความเข้ากันได้กับคอลัมน์ UUID',
    h3UseNanoid: 'ใช้ NanoID เมื่อ:',
    guideNanoid1: 'สร้าง ID ในเบราว์เซอร์หรือ frontend',
    guideNanoid2: 'ขนาดบันเดิลมีความสำคัญ (NanoID มีขนาด 130 ไบต์)',
    guideNanoid3: 'คุณต้องการตัวระบุสั้นที่เป็นมิตรกับ URL',
    guideNanoid4: 'สร้างตัวย่อ URL โค้ดเชิญ หรือโทเค็นเซสชัน',
    h2PerfBenchmark: 'เกณฑ์มาตรฐานประสิทธิภาพ: การแทรกฐานข้อมูล',
    perfDesc: 'ความแตกต่างที่มีผลกระทบมากที่สุดระหว่างรูปแบบเหล่านี้คือประสิทธิภาพการแทรกฐานข้อมูล ID ที่เรียงตามเวลา (UUID v7, ULID) รักษาการแทรก B-tree แบบลำดับ ในขณะที่ ID สุ่ม (UUID v4, NanoID) ทำให้เกิดการแบ่งหน้าแบบสุ่ม:',
    thIdFormat: 'รูปแบบ ID',
    th1MInserts: '1 ล้านการแทรก (PostgreSQL)',
    thIndexSize: 'ขนาดดัชนี',
    thInsertPattern: 'รูปแบบการแทรก',
    rowAutoIncrement: 'เพิ่มอัตโนมัติ',
    perfNote: 'ข้อมูลเกณฑ์มาตรฐานเป็นค่าประมาณและแตกต่างกันตามฮาร์ดแวร์ เวอร์ชันฐานข้อมูล และโครงสร้างตาราง ความแตกต่างสัมพัทธ์มีความสอดคล้องกันในทุกสภาพแวดล้อม',
    h2Migration: 'เส้นทางการโยกย้าย: UUID v4 ไปยัง UUID v7',
    migrationDesc: 'หากคุณกำลังพิจารณาโยกย้ายจาก UUID v4 ไปยัง UUID v7 ข่าวดีคือทั้งสองใช้รูปแบบ 128 บิตและการแสดงผลสตริงเดียวกัน ในฐานข้อมูลส่วนใหญ่ คุณสามารถเริ่มสร้างค่า UUID v7 สำหรับแถวใหม่ในขณะที่ค่า UUID v4 ที่มีอยู่ยังคงใช้ได้:',
    h2Faq: 'คำถามที่พบบ่อย',
    faqQ1: 'ฉันควรโยกย้ายจาก UUID v4 ไปยัง UUID v7 หรือไม่?',
    faqA1: 'หากแอปพลิเคชันของคุณใช้ UUID เป็นคีย์หลักของฐานข้อมูลและคุณพบปัญหาการแตกกระจายของดัชนีหรือการแทรกช้าในระดับขนาดใหญ่ การโยกย้ายไปยัง UUID v7 ก็คุ้มค่าที่จะพิจารณา สำหรับแอปขนาดเล็กถึงกลาง UUID v4 ทำงานได้ดี',
    faqQ2: 'NanoID ปลอดภัยสำหรับคีย์หลักของฐานข้อมูลหรือไม่?',
    faqA2: 'NanoID มีความปลอดภัยทางการเข้ารหัสและมีความยาวที่กำหนดเองได้ แต่ขาดการเรียงตามเวลา สำหรับคีย์หลักของฐานข้อมูลที่ประสิทธิภาพการแทรกมีความสำคัญ UUID v7 หรือ ULID เป็นตัวเลือกที่ดีกว่า NanoID โดดเด่นในแอปพลิเคชัน frontend และตัวย่อ URL',
    faqQ3: 'ความแตกต่างระหว่าง UUID v7 และ ULID คืออะไร?',
    faqA3: 'ทั้งสองเป็นตัวระบุเฉพาะที่เรียงตามเวลา UUID v7 ปฏิบัติตาม RFC 9562 และเข้ากันได้กับโครงสร้างพื้นฐาน UUID ที่มีอยู่ (128 บิต รูปแบบมาตรฐาน) ULID ใช้การเข้ารหัส Crockford Base32 (26 ตัวอักษร) และมีความเป็นเอกภาพในตัวภายในมิลลิวินาทีเดียวกัน UUID v7 ดีกว่าสำหรับระบบที่คาดหวังรูปแบบ UUID ส่วน ULID กระชับกว่าในฐานะสตริง',
  },
};

export default function UuidComparison({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: s.faqQ1,
        acceptedAnswer: { '@type': 'Answer', text: s.faqA1 },
      },
      {
        '@type': 'Question',
        name: s.faqQ2,
        acceptedAnswer: { '@type': 'Answer', text: s.faqA2 },
      },
      {
        '@type': 'Question',
        name: s.faqQ3,
        acceptedAnswer: { '@type': 'Answer', text: s.faqA3 },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <h2>{s.h2QuickComparison}</h2>
      <table>
        <thead>
          <tr>
            <th>{s.thFeature}</th>
            <th>UUID v4</th>
            <th>UUID v7</th>
            <th>ULID</th>
            <th>NanoID</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>{s.rowSizeBytes}</td><td>16</td><td>16</td><td>16</td><td>Configurable (default 21 chars)</td></tr>
          <tr><td>{s.rowStringLength}</td><td>36 chars</td><td>36 chars</td><td>26 chars</td><td>21 chars (default)</td></tr>
          <tr><td>{s.rowTimeOrdered}</td><td>No</td><td>Yes (ms precision)</td><td>Yes (ms precision)</td><td>No</td></tr>
          <tr><td>{s.rowStandard}</td><td>RFC 9562</td><td>RFC 9562</td><td>Community spec</td><td>Community spec</td></tr>
          <tr><td>{s.rowDbIndex}</td><td>Poor</td><td>Excellent</td><td>Excellent</td><td>Poor</td></tr>
          <tr><td>{s.rowCollisionResistance}</td><td>122 random bits</td><td>74 random bits + timestamp</td><td>80 random bits + timestamp</td><td>Configurable</td></tr>
          <tr><td>{s.rowUrlSafe}</td><td>Yes (with encoding)</td><td>Yes (with encoding)</td><td>Yes (native)</td><td>Yes (native)</td></tr>
          <tr><td>{s.rowLanguageSupport}</td><td>Universal</td><td>Growing rapidly</td><td>Good</td><td>Excellent (JS/TS)</td></tr>
        </tbody>
      </table>

      <h2>{s.h2Uuidv4}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.uuidv4Desc }} />
      <p><strong>{s.strengths}</strong></p>
      <ul>
        <li>{s.uuidv4Str1}</li>
        <li>{s.uuidv4Str2}</li>
        <li>{s.uuidv4Str3}</li>
      </ul>
      <p><strong>{s.weaknesses}</strong></p>
      <ul>
        <li>{s.uuidv4Weak1}</li>
        <li>{s.uuidv4Weak2}</li>
        <li>{s.uuidv4Weak3}</li>
      </ul>
      <pre><code>{`// JavaScript
crypto.randomUUID();
// → "f47ac10b-58cc-4372-a567-0e02b2c3d479"`}</code></pre>

      <p>
        <Link href={`/${lang}/tools/uuid-generator`} style={{ fontWeight: 600 }}>
          {s.tryGenerator}
        </Link>
      </p>

      <h2>{s.h2Uuidv7}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.uuidv7Desc }} />
      <p><strong>{s.strengths}</strong></p>
      <ul>
        <li>{s.uuidv7Str1}</li>
        <li>{s.uuidv7Str2}</li>
        <li>{s.uuidv7Str3}</li>
        <li>{s.uuidv7Str4}</li>
      </ul>
      <p><strong>{s.weaknesses}</strong></p>
      <ul>
        <li>{s.uuidv7Weak1}</li>
        <li>{s.uuidv7Weak2}</li>
        <li>{s.uuidv7Weak3}</li>
      </ul>
      <pre><code>{`// Node.js (uuid library v9+)
import { v7 as uuidv7 } from 'uuid';
uuidv7();
// → "018e4f5c-6a7b-7000-8000-1234abcd5678"
//    ^^^^^^^^^^^^^^^^ timestamp portion`}</code></pre>

      <h2>{s.h2Ulid}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.ulidDesc }} />
      <p><strong>{s.strengths}</strong></p>
      <ul>
        <li>{s.ulidStr1}</li>
        <li>{s.ulidStr2}</li>
        <li>{s.ulidStr3}</li>
        <li>{s.ulidStr4}</li>
      </ul>
      <p><strong>{s.weaknesses}</strong></p>
      <ul>
        <li>{s.ulidWeak1}</li>
        <li>{s.ulidWeak2}</li>
        <li>{s.ulidWeak3}</li>
      </ul>
      <pre><code>{`// JavaScript
import { ulid } from 'ulid';
ulid();
// → "01ARZ3NDEKTSV4RRFFQ69G5FAV"`}</code></pre>

      <h2>{s.h2Nanoid}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.nanoidDesc }} />
      <p><strong>{s.strengths}</strong></p>
      <ul>
        <li>{s.nanoidStr1}</li>
        <li>{s.nanoidStr2}</li>
        <li>{s.nanoidStr3}</li>
        <li>{s.nanoidStr4}</li>
        <li>{s.nanoidStr5}</li>
      </ul>
      <p><strong>{s.weaknesses}</strong></p>
      <ul>
        <li>{s.nanoidWeak1}</li>
        <li>{s.nanoidWeak2}</li>
        <li>{s.nanoidWeak3}</li>
      </ul>
      <pre><code>{`// JavaScript
import { nanoid } from 'nanoid';
nanoid();
// → "V1StGXR8_Z5jdHi6B-myT"`}</code></pre>

      <h2>{s.h2DecisionGuide}</h2>

      <h3>{s.h3UseV7}</h3>
      <ul>
        <li>{s.guideV7_1}</li>
        <li>{s.guideV7_2}</li>
        <li>{s.guideV7_3}</li>
        <li>{s.guideV7_4}</li>
      </ul>

      <h3>{s.h3UseV4}</h3>
      <ul>
        <li>{s.guideV4_1}</li>
        <li>{s.guideV4_2}</li>
        <li>{s.guideV4_3}</li>
      </ul>

      <h3>{s.h3UseUlid}</h3>
      <ul>
        <li>{s.guideUlid1}</li>
        <li>{s.guideUlid2}</li>
        <li>{s.guideUlid3}</li>
        <li>{s.guideUlid4}</li>
      </ul>

      <h3>{s.h3UseNanoid}</h3>
      <ul>
        <li>{s.guideNanoid1}</li>
        <li>{s.guideNanoid2}</li>
        <li>{s.guideNanoid3}</li>
        <li>{s.guideNanoid4}</li>
      </ul>

      <h2>{s.h2PerfBenchmark}</h2>
      <p>{s.perfDesc}</p>
      <table>
        <thead>
          <tr>
            <th>{s.thIdFormat}</th>
            <th>{s.th1MInserts}</th>
            <th>{s.thIndexSize}</th>
            <th>{s.thInsertPattern}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>{s.rowAutoIncrement}</td><td>~12s (baseline)</td><td>21 MB</td><td>Sequential</td></tr>
          <tr><td>UUID v7</td><td>~15s (+25%)</td><td>56 MB</td><td>Nearly sequential</td></tr>
          <tr><td>ULID</td><td>~15s (+25%)</td><td>56 MB</td><td>Nearly sequential</td></tr>
          <tr><td>UUID v4</td><td>~28s (+133%)</td><td>56 MB</td><td>Random</td></tr>
          <tr><td>NanoID (21 chars)</td><td>~30s (+150%)</td><td>62 MB</td><td>Random</td></tr>
        </tbody>
      </table>
      <p>
        <em>{s.perfNote}</em>
      </p>

      <h2>{s.h2Migration}</h2>
      <p>{s.migrationDesc}</p>
      <pre><code>{`-- PostgreSQL 17+
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid_v7() PRIMARY KEY,
  name TEXT NOT NULL
);

-- Older PostgreSQL with uuid-ossp or pgcrypto
-- Use application-level UUID v7 generation`}</code></pre>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>{s.h2Faq}</h2>

        <h3>{s.faqQ1}</h3>
        <p>{s.faqA1}</p>

        <h3>{s.faqQ2}</h3>
        <p>{s.faqA2}</p>

        <h3>{s.faqQ3}</h3>
        <p>{s.faqA3}</p>
      </div>
    </>
  );
}
