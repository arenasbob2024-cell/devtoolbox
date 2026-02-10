import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Regular expressions (regex) are one of the most powerful tools in a developer\'s arsenal. Whether you are validating user input, parsing log files, or performing complex search-and-replace operations, regex gives you unmatched precision. This <strong>complete regex cheat sheet</strong> covers every major concept: anchors, character classes, quantifiers, groups, lookarounds, flags, and cross-language usage. Bookmark this page and refer to it whenever you need a quick refresher.',
    link_test: 'Try every pattern live in our Regex Tester ->',
    h2_basics: 'Basic Syntax: Anchors & Character Classes',
    p_basics_intro: 'Anchors and character classes form the foundation of every regex pattern. Anchors specify <em>where</em> in the string a match should occur. Character classes define <em>what</em> characters to match.',
    h3_anchors: 'Anchors',
    p_anchors: 'Anchors do not match characters themselves; they match <em>positions</em> within the string.',
    h3_char_classes: 'Character Classes',
    p_char_classes: 'Character classes let you match a set of characters in a single position.',
    h3_special_chars: 'Special Characters (Metacharacters)',
    p_special_chars: 'These characters have special meaning in regex. To match them literally, escape them with a backslash.',
    h2_quantifiers: 'Quantifiers: How Many Times to Match',
    p_quantifiers_intro: 'Quantifiers control how many times a preceding element must appear for a match. By default, quantifiers are <strong>greedy</strong> -- they match as much as possible. Appending <code>?</code> makes them <strong>lazy</strong> (match as little as possible).',
    h3_greedy_vs_lazy: 'Greedy vs. Lazy Quantifiers',
    p_greedy_lazy: 'Consider the string <code>&lt;b&gt;bold&lt;/b&gt; and &lt;i&gt;italic&lt;/i&gt;</code>. A greedy pattern <code>&lt;.*&gt;</code> matches the entire string from the first <code>&lt;</code> to the last <code>&gt;</code>. The lazy version <code>&lt;.*?&gt;</code> matches only <code>&lt;b&gt;</code>, stopping at the first <code>&gt;</code>.',
    h2_groups: 'Groups & Capturing',
    p_groups_intro: 'Groups let you treat multiple characters as a single unit, apply quantifiers to sub-expressions, and extract matched portions.',
    h3_capturing: 'Capturing Groups',
    p_capturing: 'Wrap a sub-expression in parentheses <code>(...)</code> to capture its match. You can reference captured groups with backreferences like <code>\\1</code>, <code>\\2</code>, etc.',
    h3_named_groups: 'Named Groups',
    p_named_groups: 'Named groups improve readability. In JavaScript and Python, use <code>(?&lt;name&gt;...)</code> syntax.',
    h3_non_capturing: 'Non-Capturing Groups',
    p_non_capturing: 'Use <code>(?:...)</code> when you need grouping but do not need to capture the match. This is more efficient for complex patterns.',
    h3_alternation: 'Alternation (OR)',
    p_alternation: 'Use the pipe <code>|</code> inside a group to match one of several alternatives.',
    h2_lookaround: 'Lookahead & Lookbehind (Zero-Width Assertions)',
    p_lookaround_intro: 'Lookarounds assert that a certain pattern exists (or does not exist) ahead of or behind the current position, <em>without consuming characters</em>. This makes them incredibly powerful for complex matching conditions.',
    h3_pos_lookahead: 'Positive Lookahead (?=...)',
    p_pos_lookahead: 'Matches a position that is <em>followed by</em> the specified pattern.',
    h3_neg_lookahead: 'Negative Lookahead (?!...)',
    p_neg_lookahead: 'Matches a position that is <em>not followed by</em> the specified pattern.',
    h3_pos_lookbehind: 'Positive Lookbehind (?<=...)',
    p_pos_lookbehind: 'Matches a position that is <em>preceded by</em> the specified pattern.',
    h3_neg_lookbehind: 'Negative Lookbehind (?<!...)',
    p_neg_lookbehind: 'Matches a position that is <em>not preceded by</em> the specified pattern.',
    p_lookbehind_note: '<strong>Note:</strong> Lookbehinds have limited support in some regex engines. JavaScript (ES2018+) supports them, but older engines may not. Python and Go support lookbehinds with fixed-length patterns.',
    h2_flags: 'Regex Flags (Modifiers)',
    p_flags_intro: 'Flags modify how the regex engine interprets the pattern. They are placed after the closing delimiter (e.g., <code>/pattern/gi</code> in JavaScript) or passed as arguments in functions.',
    h2_common: 'Common Patterns Quick Reference',
    p_common_intro: 'Here are the most frequently needed regex patterns. Test any of them in our regex tester tool.',
    link_validate: 'Test all these patterns live with our Regex Tester ->',
    h2_langs: 'Regex in Different Programming Languages',
    p_langs_intro: 'While regex syntax is largely universal, each language has its own API for creating, testing, and applying patterns. Here are the key differences.',
    h3_js: 'JavaScript',
    h3_python: 'Python',
    h3_go: 'Go (Golang)',
    p_go_note: 'Go uses the RE2 engine, which does <strong>not</strong> support lookaheads, lookbehinds, or backreferences. This is a deliberate design decision for guaranteed linear-time matching.',
    h2_tips: 'Performance Tips & Best Practices',
    p_tip1: '<strong>Be specific:</strong> Use <code>[a-zA-Z]</code> instead of <code>.</code> when you know what characters to expect. Specific patterns are faster and less error-prone.',
    p_tip2: '<strong>Avoid catastrophic backtracking:</strong> Nested quantifiers like <code>(a+)+</code> can cause exponential time complexity. Use atomic groups or possessive quantifiers where available.',
    p_tip3: '<strong>Use non-capturing groups:</strong> When you do not need to extract matched text, use <code>(?:...)</code> instead of <code>(...)</code> to improve performance.',
    p_tip4: '<strong>Compile once, use many:</strong> In languages like Python and Go, compile your regex once and reuse the compiled object for better performance.',
    p_tip5: '<strong>Test incrementally:</strong> Build complex patterns step by step. Test each part individually before combining them.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is a regex cheat sheet and why do I need one?',
    faq1_a: 'A regex cheat sheet is a quick-reference guide that lists regex syntax, metacharacters, quantifiers, flags, and common patterns in one place. Even experienced developers cannot memorize every regex construct. Having a cheat sheet saves time and reduces errors when writing regular expressions for tasks like input validation, text extraction, and log parsing.',
    faq2_q: 'What is the difference between .* and .*? in regex?',
    faq2_a: 'The pattern .* is a greedy quantifier that matches as many characters as possible (the longest match), while .*? is a lazy (or non-greedy) quantifier that matches as few characters as possible (the shortest match). For example, given the string "<b>hello</b>", the pattern <.*> matches the entire string, but <.*?> matches only "<b>". Use lazy quantifiers when you want to stop at the first occurrence of a delimiter.',
    faq3_q: 'Do all programming languages support the same regex syntax?',
    faq3_a: 'Most languages support PCRE (Perl Compatible Regular Expressions) or a close variant, so core features like character classes, quantifiers, and groups work everywhere. However, advanced features differ: JavaScript added lookbehinds in ES2018, Go (RE2 engine) does not support lookbehinds or backreferences at all, and Python supports all major features through the re module. Always check your language documentation for supported features.',
    faq4_q: 'How can I test and debug regex patterns?',
    faq4_a: 'The best way to test regex patterns is to use an interactive regex tester that shows matches in real time. Our Regex Tester tool at DevToolBox lets you enter a pattern and test string, see matches highlighted, and view captured groups. Build your pattern step by step, testing each part individually. This approach catches mistakes early and helps you understand how the engine processes your pattern.',
    faq5_q: 'What is catastrophic backtracking and how do I avoid it?',
    faq5_a: 'Catastrophic backtracking occurs when a regex engine takes exponentially long to determine that a string does not match a pattern. It typically happens with nested quantifiers like (a+)+ or overlapping alternatives. To avoid it: be as specific as possible with character classes, avoid nested repetition, use atomic groups or possessive quantifiers (if your engine supports them), and test your patterns against long non-matching strings to catch performance issues.',
  },
  fr: {
    intro: 'Les expressions regulieres (regex) sont un outil puissant pour tout developpeur. Que vous validiez des saisies utilisateur, analysiez des logs ou effectuiez des operations de recherche-remplacement, les regex offrent une precision inegalee. Cette <strong>aide-memoire regex complete</strong> couvre tous les concepts majeurs : ancres, classes de caracteres, quantificateurs, groupes, assertions et flags.',
    link_test: 'Testez chaque motif en direct dans notre Regex Tester ->',
    h2_basics: 'Syntaxe de base : Ancres et classes de caracteres',
    p_basics_intro: 'Les ancres et classes de caracteres forment la base de tout motif regex. Les ancres specifient <em>ou</em> dans la chaine une correspondance doit se produire. Les classes definissent <em>quels</em> caracteres correspondre.',
    h3_anchors: 'Ancres',
    p_anchors: 'Les ancres ne correspondent pas a des caracteres, mais a des <em>positions</em> dans la chaine.',
    h3_char_classes: 'Classes de caracteres',
    p_char_classes: 'Les classes de caracteres permettent de correspondre a un ensemble de caracteres a une position donnee.',
    h3_special_chars: 'Caracteres speciaux (metacaracteres)',
    p_special_chars: 'Ces caracteres ont une signification speciale en regex. Pour les correspondre litteralement, echappez-les avec un antislash.',
    h2_quantifiers: 'Quantificateurs : combien de fois correspondre',
    p_quantifiers_intro: 'Les quantificateurs controlent le nombre de repetitions. Par defaut, ils sont <strong>gourmands</strong>. Ajouter <code>?</code> les rend <strong>paresseux</strong>.',
    h3_greedy_vs_lazy: 'Gourmand vs. Paresseux',
    p_greedy_lazy: 'Le motif gourmand <code>&lt;.*&gt;</code> correspond a la chaine entiere, tandis que <code>&lt;.*?&gt;</code> ne correspond qu\'a la premiere balise.',
    h2_groups: 'Groupes et capture',
    p_groups_intro: 'Les groupes permettent de traiter plusieurs caracteres comme une unite et d\'extraire des portions correspondantes.',
    h3_capturing: 'Groupes de capture',
    p_capturing: 'Encadrez une sous-expression avec <code>(...)</code> pour capturer sa correspondance.',
    h3_named_groups: 'Groupes nommes',
    p_named_groups: 'Les groupes nommes ameliorent la lisibilite avec la syntaxe <code>(?&lt;nom&gt;...)</code>.',
    h3_non_capturing: 'Groupes non capturants',
    p_non_capturing: 'Utilisez <code>(?:...)</code> quand le groupement est necessaire sans capture.',
    h3_alternation: 'Alternance (OU)',
    p_alternation: 'Utilisez le pipe <code>|</code> dans un groupe pour correspondre a une alternative.',
    h2_lookaround: 'Lookahead et Lookbehind (assertions de largeur zero)',
    p_lookaround_intro: 'Les assertions verifient qu\'un motif existe (ou non) avant ou apres la position actuelle, <em>sans consommer de caracteres</em>.',
    h3_pos_lookahead: 'Lookahead positif (?=...)',
    p_pos_lookahead: 'Correspond a une position <em>suivie par</em> le motif specifie.',
    h3_neg_lookahead: 'Lookahead negatif (?!...)',
    p_neg_lookahead: 'Correspond a une position <em>non suivie par</em> le motif specifie.',
    h3_pos_lookbehind: 'Lookbehind positif (?<=...)',
    p_pos_lookbehind: 'Correspond a une position <em>precedee par</em> le motif specifie.',
    h3_neg_lookbehind: 'Lookbehind negatif (?<!...)',
    p_neg_lookbehind: 'Correspond a une position <em>non precedee par</em> le motif specifie.',
    p_lookbehind_note: '<strong>Note :</strong> Les lookbehinds ne sont pas supportes par tous les moteurs regex.',
    h2_flags: 'Flags Regex (modificateurs)',
    p_flags_intro: 'Les flags modifient l\'interpretation du motif par le moteur regex.',
    h2_common: 'Motifs courants - Reference rapide',
    p_common_intro: 'Voici les motifs regex les plus frequemment utilises.',
    link_validate: 'Testez tous ces motifs avec notre Regex Tester ->',
    h2_langs: 'Regex dans differents langages de programmation',
    p_langs_intro: 'Bien que la syntaxe soit largement universelle, chaque langage a sa propre API.',
    h3_js: 'JavaScript',
    h3_python: 'Python',
    h3_go: 'Go (Golang)',
    p_go_note: 'Go utilise RE2, qui ne supporte <strong>pas</strong> les lookaheads, lookbehinds ou references arriere.',
    h2_tips: 'Conseils de performance et bonnes pratiques',
    p_tip1: '<strong>Soyez specifique :</strong> Utilisez <code>[a-zA-Z]</code> plutot que <code>.</code> quand possible.',
    p_tip2: '<strong>Evitez le backtracking catastrophique :</strong> Les quantificateurs imbriques comme <code>(a+)+</code> peuvent causer une complexite exponentielle.',
    p_tip3: '<strong>Utilisez les groupes non capturants :</strong> <code>(?:...)</code> est plus efficace quand la capture n\'est pas necessaire.',
    p_tip4: '<strong>Compilez une fois :</strong> En Python et Go, compilez votre regex une fois et reutilisez l\'objet compile.',
    p_tip5: '<strong>Testez incrementalement :</strong> Construisez les motifs complexes etape par etape.',
    h2_faq: 'Questions frequentes',
    faq1_q: 'Qu\'est-ce qu\'une aide-memoire regex et pourquoi en ai-je besoin ?',
    faq1_a: 'Une aide-memoire regex est un guide de reference rapide listant la syntaxe, les metacaracteres, les quantificateurs, les flags et les motifs courants. Meme les developpeurs experimentes ne peuvent pas tout memoriser.',
    faq2_q: 'Quelle est la difference entre .* et .*? en regex ?',
    faq2_a: '.* est un quantificateur gourmand (correspondance la plus longue), tandis que .*? est paresseux (correspondance la plus courte). Utilisez le mode paresseux pour s\'arreter au premier delimiteur.',
    faq3_q: 'Tous les langages supportent-ils la meme syntaxe regex ?',
    faq3_a: 'La plupart supportent PCRE ou une variante proche. Mais les fonctionnalites avancees different : JavaScript a ajoute les lookbehinds en ES2018, Go (RE2) ne supporte pas les lookbehinds.',
    faq4_q: 'Comment tester et deboguer les motifs regex ?',
    faq4_a: 'Utilisez un testeur regex interactif comme notre outil Regex Tester qui montre les correspondances en temps reel. Construisez votre motif etape par etape.',
    faq5_q: 'Qu\'est-ce que le backtracking catastrophique ?',
    faq5_a: 'Il se produit quand le moteur prend un temps exponentiel pour determiner qu\'une chaine ne correspond pas. Evitez les quantificateurs imbriques et soyez specifique avec les classes de caracteres.',
  },
  de: {
    intro: 'Regulare Ausdrucke (Regex) gehoren zu den machtigsten Werkzeugen eines Entwicklers. Ob Sie Benutzereingaben validieren, Logdateien parsen oder komplexe Suchen-und-Ersetzen-Operationen durchfuhren -- Regex bietet unerreichte Prazision. Dieses <strong>vollstandige Regex-Cheat-Sheet</strong> deckt alle wichtigen Konzepte ab.',
    link_test: 'Testen Sie jedes Muster live in unserem Regex Tester ->',
    h2_basics: 'Grundsyntax: Anker und Zeichenklassen',
    p_basics_intro: 'Anker und Zeichenklassen bilden die Grundlage. Anker geben <em>wo</em> in der Zeichenkette an. Zeichenklassen definieren <em>welche</em> Zeichen passen.',
    h3_anchors: 'Anker',
    p_anchors: 'Anker entsprechen keinen Zeichen, sondern <em>Positionen</em> in der Zeichenkette.',
    h3_char_classes: 'Zeichenklassen',
    p_char_classes: 'Zeichenklassen matchen eine Menge von Zeichen an einer Position.',
    h3_special_chars: 'Sonderzeichen (Metazeichen)',
    p_special_chars: 'Diese Zeichen haben spezielle Bedeutung. Zum wortlichen Matchen mit Backslash escapen.',
    h2_quantifiers: 'Quantifikatoren: Wie oft matchen',
    p_quantifiers_intro: 'Quantifikatoren steuern die Wiederholungen. Standard ist <strong>gierig</strong>. Mit <code>?</code> werden sie <strong>faul</strong>.',
    h3_greedy_vs_lazy: 'Gierig vs. Faul',
    p_greedy_lazy: 'Das gierige Muster <code>&lt;.*&gt;</code> matcht die gesamte Zeichenkette, wahrend <code>&lt;.*?&gt;</code> nur das erste Tag matcht.',
    h2_groups: 'Gruppen und Erfassung',
    p_groups_intro: 'Gruppen behandeln mehrere Zeichen als Einheit und ermoglichen die Extraktion.',
    h3_capturing: 'Erfassungsgruppen',
    p_capturing: 'Klammern <code>(...)</code> erfassen den Match. Ruckreferenzen: <code>\\1</code>, <code>\\2</code>.',
    h3_named_groups: 'Benannte Gruppen',
    p_named_groups: 'Benannte Gruppen mit <code>(?&lt;name&gt;...)</code> verbessern die Lesbarkeit.',
    h3_non_capturing: 'Nicht-erfassende Gruppen',
    p_non_capturing: '<code>(?:...)</code> fur Gruppierung ohne Erfassung.',
    h3_alternation: 'Alternation (ODER)',
    p_alternation: 'Der Pipe <code>|</code> fur Alternativen.',
    h2_lookaround: 'Lookahead und Lookbehind',
    p_lookaround_intro: 'Lookarounds prufen, ob ein Muster vor oder nach der Position existiert, <em>ohne Zeichen zu verbrauchen</em>.',
    h3_pos_lookahead: 'Positiver Lookahead (?=...)',
    p_pos_lookahead: 'Position <em>gefolgt von</em> dem Muster.',
    h3_neg_lookahead: 'Negativer Lookahead (?!...)',
    p_neg_lookahead: 'Position <em>nicht gefolgt von</em> dem Muster.',
    h3_pos_lookbehind: 'Positiver Lookbehind (?<=...)',
    p_pos_lookbehind: 'Position <em>vorausgegangen von</em> dem Muster.',
    h3_neg_lookbehind: 'Negativer Lookbehind (?<!...)',
    p_neg_lookbehind: 'Position <em>nicht vorausgegangen von</em> dem Muster.',
    p_lookbehind_note: '<strong>Hinweis:</strong> Lookbehinds werden nicht von allen Engines unterstutzt.',
    h2_flags: 'Regex-Flags (Modifikatoren)',
    p_flags_intro: 'Flags andern die Interpretation des Musters.',
    h2_common: 'Haufige Muster - Kurzreferenz',
    p_common_intro: 'Die am haufigsten benotigten Regex-Muster auf einen Blick.',
    link_validate: 'Alle Muster mit unserem Regex Tester testen ->',
    h2_langs: 'Regex in verschiedenen Programmiersprachen',
    p_langs_intro: 'Die Syntax ist grosstenteils universell, aber jede Sprache hat ihre eigene API.',
    h3_js: 'JavaScript',
    h3_python: 'Python',
    h3_go: 'Go (Golang)',
    p_go_note: 'Go verwendet RE2, das Lookaheads, Lookbehinds und Ruckreferenzen <strong>nicht</strong> unterstutzt.',
    h2_tips: 'Performance-Tipps und Best Practices',
    p_tip1: '<strong>Seien Sie spezifisch:</strong> <code>[a-zA-Z]</code> statt <code>.</code> verwenden.',
    p_tip2: '<strong>Katastrophales Backtracking vermeiden:</strong> Verschachtelte Quantifikatoren wie <code>(a+)+</code> vermeiden.',
    p_tip3: '<strong>Nicht-erfassende Gruppen nutzen:</strong> <code>(?:...)</code> wenn keine Erfassung noetig ist.',
    p_tip4: '<strong>Einmal kompilieren:</strong> In Python und Go die Regex einmal kompilieren und wiederverwenden.',
    p_tip5: '<strong>Inkrementell testen:</strong> Komplexe Muster schrittweise aufbauen.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Was ist ein Regex-Cheat-Sheet und warum brauche ich eins?',
    faq1_a: 'Ein Regex-Cheat-Sheet ist eine Kurzreferenz mit Syntax, Metazeichen, Quantifikatoren, Flags und haufigen Mustern. Auch erfahrene Entwickler konnen nicht alles auswendig.',
    faq2_q: 'Was ist der Unterschied zwischen .* und .*? in Regex?',
    faq2_a: '.* ist gierig (langster Match), .*? ist faul (kurzester Match). Verwenden Sie faul, um beim ersten Begrenzer zu stoppen.',
    faq3_q: 'Unterstutzen alle Programmiersprachen dieselbe Regex-Syntax?',
    faq3_a: 'Die meisten unterstutzen PCRE. Erweiterte Features unterscheiden sich: JavaScript hat Lookbehinds seit ES2018, Go (RE2) unterstutzt sie nicht.',
    faq4_q: 'Wie kann ich Regex-Muster testen und debuggen?',
    faq4_a: 'Verwenden Sie einen interaktiven Regex-Tester wie unser Tool, das Matches in Echtzeit anzeigt.',
    faq5_q: 'Was ist katastrophales Backtracking?',
    faq5_a: 'Es tritt auf, wenn der Engine exponentiell lange braucht. Vermeiden Sie verschachtelte Quantifikatoren und seien Sie spezifisch.',
  },
  es: {
    intro: 'Las expresiones regulares (regex) son una de las herramientas mas poderosas de un desarrollador. Ya sea que estes validando entradas de usuario, analizando archivos de log o realizando operaciones complejas de buscar-y-reemplazar, regex ofrece una precision incomparable. Esta <strong>hoja de referencia regex completa</strong> cubre todos los conceptos principales.',
    link_test: 'Prueba cada patron en vivo en nuestro Regex Tester ->',
    h2_basics: 'Sintaxis basica: Anclas y clases de caracteres',
    p_basics_intro: 'Las anclas y clases de caracteres son la base de cada patron regex. Las anclas especifican <em>donde</em> debe ocurrir la coincidencia. Las clases definen <em>que</em> caracteres coincidir.',
    h3_anchors: 'Anclas',
    p_anchors: 'Las anclas no coinciden con caracteres, sino con <em>posiciones</em> en la cadena.',
    h3_char_classes: 'Clases de caracteres',
    p_char_classes: 'Las clases de caracteres permiten coincidir un conjunto de caracteres en una posicion.',
    h3_special_chars: 'Caracteres especiales (metacaracteres)',
    p_special_chars: 'Estos caracteres tienen significado especial. Para coincidir literalmente, escapalos con barra invertida.',
    h2_quantifiers: 'Cuantificadores: cuantas veces coincidir',
    p_quantifiers_intro: 'Los cuantificadores controlan las repeticiones. Por defecto son <strong>codiciosos</strong>. Agregar <code>?</code> los hace <strong>perezosos</strong>.',
    h3_greedy_vs_lazy: 'Codicioso vs. Perezoso',
    p_greedy_lazy: 'El patron codicioso <code>&lt;.*&gt;</code> coincide con toda la cadena, mientras que <code>&lt;.*?&gt;</code> coincide solo con la primera etiqueta.',
    h2_groups: 'Grupos y captura',
    p_groups_intro: 'Los grupos permiten tratar multiples caracteres como una unidad y extraer porciones coincidentes.',
    h3_capturing: 'Grupos de captura',
    p_capturing: 'Envuelve una subexpresion con <code>(...)</code> para capturar su coincidencia.',
    h3_named_groups: 'Grupos con nombre',
    p_named_groups: 'Los grupos con nombre mejoran la legibilidad con <code>(?&lt;nombre&gt;...)</code>.',
    h3_non_capturing: 'Grupos sin captura',
    p_non_capturing: 'Usa <code>(?:...)</code> cuando necesites agrupar sin capturar.',
    h3_alternation: 'Alternancia (O)',
    p_alternation: 'Usa el pipe <code>|</code> para coincidir con una de varias alternativas.',
    h2_lookaround: 'Lookahead y Lookbehind',
    p_lookaround_intro: 'Los lookarounds verifican si un patron existe antes o despues de la posicion actual, <em>sin consumir caracteres</em>.',
    h3_pos_lookahead: 'Lookahead positivo (?=...)',
    p_pos_lookahead: 'Coincide con una posicion <em>seguida por</em> el patron especificado.',
    h3_neg_lookahead: 'Lookahead negativo (?!...)',
    p_neg_lookahead: 'Coincide con una posicion <em>no seguida por</em> el patron especificado.',
    h3_pos_lookbehind: 'Lookbehind positivo (?<=...)',
    p_pos_lookbehind: 'Coincide con una posicion <em>precedida por</em> el patron especificado.',
    h3_neg_lookbehind: 'Lookbehind negativo (?<!...)',
    p_neg_lookbehind: 'Coincide con una posicion <em>no precedida por</em> el patron especificado.',
    p_lookbehind_note: '<strong>Nota:</strong> Los lookbehinds no estan soportados en todos los motores regex.',
    h2_flags: 'Flags de Regex (modificadores)',
    p_flags_intro: 'Los flags modifican como el motor regex interpreta el patron.',
    h2_common: 'Patrones comunes - Referencia rapida',
    p_common_intro: 'Los patrones regex mas utilizados en un vistazo.',
    link_validate: 'Prueba todos estos patrones con nuestro Regex Tester ->',
    h2_langs: 'Regex en diferentes lenguajes de programacion',
    p_langs_intro: 'La sintaxis es mayormente universal, pero cada lenguaje tiene su propia API.',
    h3_js: 'JavaScript',
    h3_python: 'Python',
    h3_go: 'Go (Golang)',
    p_go_note: 'Go usa RE2, que <strong>no</strong> soporta lookaheads, lookbehinds ni backreferences.',
    h2_tips: 'Consejos de rendimiento y buenas practicas',
    p_tip1: '<strong>Se especifico:</strong> Usa <code>[a-zA-Z]</code> en lugar de <code>.</code> cuando sea posible.',
    p_tip2: '<strong>Evita el backtracking catastrofico:</strong> Cuantificadores anidados como <code>(a+)+</code> pueden causar complejidad exponencial.',
    p_tip3: '<strong>Usa grupos sin captura:</strong> <code>(?:...)</code> es mas eficiente cuando no necesitas capturar.',
    p_tip4: '<strong>Compila una vez:</strong> En Python y Go, compila tu regex una vez y reutiliza el objeto.',
    p_tip5: '<strong>Prueba incrementalmente:</strong> Construye patrones complejos paso a paso.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Que es una hoja de referencia regex y por que la necesito?',
    faq1_a: 'Es una guia de referencia rapida con sintaxis, metacaracteres, cuantificadores, flags y patrones comunes. Incluso los desarrolladores experimentados no pueden memorizar todo.',
    faq2_q: 'Cual es la diferencia entre .* y .*? en regex?',
    faq2_a: '.* es codicioso (coincidencia mas larga), .*? es perezoso (coincidencia mas corta). Usa perezoso para detenerte en el primer delimitador.',
    faq3_q: 'Todos los lenguajes soportan la misma sintaxis regex?',
    faq3_a: 'La mayoria soporta PCRE. Las funciones avanzadas varian: JavaScript agrego lookbehinds en ES2018, Go (RE2) no los soporta.',
    faq4_q: 'Como puedo probar y depurar patrones regex?',
    faq4_a: 'Usa un probador regex interactivo como nuestra herramienta Regex Tester que muestra coincidencias en tiempo real.',
    faq5_q: 'Que es el backtracking catastrofico?',
    faq5_a: 'Ocurre cuando el motor toma un tiempo exponencial. Evita cuantificadores anidados y se especifico con las clases de caracteres.',
  },
  zh: {
    intro: '正则表达式 (regex) 是开发者工具箱中最强大的工具之一。无论是验证用户输入、解析日志文件，还是执行复杂的搜索替换操作，正则表达式都能提供无与伦比的精确度。本 <strong>正则表达式完全速查表</strong> 涵盖所有核心概念：锚点、字符类、量词、分组、环视断言和标志位。',
    link_test: '在我们的 Regex 测试器中实时测试每个模式 ->',
    h2_basics: '基础语法：锚点与字符类',
    p_basics_intro: '锚点和字符类构成了每个正则模式的基础。锚点指定匹配在字符串中 <em>何处</em> 发生。字符类定义匹配 <em>哪些</em> 字符。',
    h3_anchors: '锚点',
    p_anchors: '锚点不匹配字符本身，而是匹配字符串中的 <em>位置</em>。',
    h3_char_classes: '字符类',
    p_char_classes: '字符类允许在单个位置匹配一组字符。',
    h3_special_chars: '特殊字符（元字符）',
    p_special_chars: '这些字符在正则中有特殊含义。要按字面意义匹配，需要用反斜杠转义。',
    h2_quantifiers: '量词：匹配次数',
    p_quantifiers_intro: '量词控制前置元素必须出现的次数。默认情况下，量词是 <strong>贪婪的</strong>——尽可能多地匹配。追加 <code>?</code> 使其变为 <strong>懒惰</strong>（尽可能少地匹配）。',
    h3_greedy_vs_lazy: '贪婪 vs. 懒惰量词',
    p_greedy_lazy: '贪婪模式 <code>&lt;.*&gt;</code> 匹配整个字符串，而懒惰模式 <code>&lt;.*?&gt;</code> 只匹配第一个标签。',
    h2_groups: '分组与捕获',
    p_groups_intro: '分组允许将多个字符视为一个单元，对子表达式应用量词，并提取匹配的部分。',
    h3_capturing: '捕获组',
    p_capturing: '将子表达式用括号 <code>(...)</code> 包裹以捕获匹配。可用反向引用 <code>\\1</code>、<code>\\2</code> 等引用捕获组。',
    h3_named_groups: '命名组',
    p_named_groups: '命名组通过 <code>(?&lt;name&gt;...)</code> 语法提高可读性。',
    h3_non_capturing: '非捕获组',
    p_non_capturing: '当需要分组但不需要捕获时使用 <code>(?:...)</code>。',
    h3_alternation: '交替（OR）',
    p_alternation: '在分组中使用管道符 <code>|</code> 匹配多个选项之一。',
    h2_lookaround: '环视断言（零宽断言）',
    p_lookaround_intro: '环视断言检查当前位置的前面或后面是否存在特定模式，<em>而不消耗字符</em>。这使它们在处理复杂匹配条件时非常强大。',
    h3_pos_lookahead: '正向前瞻 (?=...)',
    p_pos_lookahead: '匹配 <em>后面跟着</em> 指定模式的位置。',
    h3_neg_lookahead: '负向前瞻 (?!...)',
    p_neg_lookahead: '匹配 <em>后面没有</em> 指定模式的位置。',
    h3_pos_lookbehind: '正向后顾 (?<=...)',
    p_pos_lookbehind: '匹配 <em>前面是</em> 指定模式的位置。',
    h3_neg_lookbehind: '负向后顾 (?<!...)',
    p_neg_lookbehind: '匹配 <em>前面不是</em> 指定模式的位置。',
    p_lookbehind_note: '<strong>注意：</strong>后顾断言在某些正则引擎中支持有限。JavaScript (ES2018+) 支持，但较旧的引擎可能不支持。Go 的 RE2 引擎不支持任何环视断言。',
    h2_flags: '正则标志位（修饰符）',
    p_flags_intro: '标志位修改正则引擎解释模式的方式。',
    h2_common: '常用模式速查',
    p_common_intro: '以下是最常用的正则模式。在我们的正则测试器中测试任意模式。',
    link_validate: '使用我们的 Regex 测试器测试所有模式 ->',
    h2_langs: '不同编程语言中的正则',
    p_langs_intro: '虽然正则语法基本通用，但每种语言有自己的 API 来创建、测试和应用模式。',
    h3_js: 'JavaScript',
    h3_python: 'Python',
    h3_go: 'Go (Golang)',
    p_go_note: 'Go 使用 RE2 引擎，<strong>不</strong>支持前瞻、后顾和反向引用。这是为了保证线性时间匹配的设计决策。',
    h2_tips: '性能技巧与最佳实践',
    p_tip1: '<strong>精确匹配：</strong>当你知道要匹配什么字符时，使用 <code>[a-zA-Z]</code> 而不是 <code>.</code>。精确的模式更快且不易出错。',
    p_tip2: '<strong>避免灾难性回溯：</strong>嵌套量词如 <code>(a+)+</code> 可能导致指数级时间复杂度。',
    p_tip3: '<strong>使用非捕获组：</strong>当不需要提取匹配文本时，使用 <code>(?:...)</code> 以提高性能。',
    p_tip4: '<strong>编译一次，多次使用：</strong>在 Python 和 Go 中，编译一次正则并重复使用编译后的对象。',
    p_tip5: '<strong>增量测试：</strong>逐步构建复杂模式，单独测试每个部分后再组合。',
    h2_faq: '常见问题',
    faq1_q: '什么是正则表达式速查表？为什么需要它？',
    faq1_a: '正则表达式速查表是将语法、元字符、量词、标志位和常用模式汇集在一处的快速参考指南。即使是有经验的开发者也无法记住所有正则构造。速查表节省时间，减少编写正则时的错误。',
    faq2_q: '正则中 .* 和 .*? 有什么区别？',
    faq2_a: '.* 是贪婪量词，匹配尽可能多的字符（最长匹配）；.*? 是懒惰量词，匹配尽可能少的字符（最短匹配）。当你需要在第一个分隔符处停止时，使用懒惰量词。',
    faq3_q: '所有编程语言都支持相同的正则语法吗？',
    faq3_a: '大多数语言支持 PCRE 或其变体，核心特性如字符类、量词和分组在所有语言中都可用。但高级特性有差异：JavaScript 在 ES2018 才添加后顾断言，Go (RE2) 完全不支持环视断言和反向引用。',
    faq4_q: '如何测试和调试正则模式？',
    faq4_a: '最好的方式是使用交互式正则测试器，实时显示匹配结果。DevToolBox 的 Regex 测试器可以输入模式和测试字符串，高亮显示匹配并查看捕获组。逐步构建模式，单独测试每部分。',
    faq5_q: '什么是灾难性回溯？如何避免？',
    faq5_a: '灾难性回溯发生在正则引擎需要指数级时间来确定字符串不匹配时。通常由嵌套量词如 (a+)+ 导致。避免方法：使用精确的字符类，避免嵌套重复，使用原子组，对长的不匹配字符串测试性能。',
  },
  ja: {
    intro: '正規表現（regex）は開発者のツールボックスで最も強力なツールの一つです。ユーザー入力の検証、ログファイルの解析、複雑な検索置換操作など、regexは比類のない精度を提供します。この<strong>正規表現完全チートシート</strong>は、アンカー、文字クラス、量指定子、グループ、先読み/後読み、フラグなど全ての主要概念をカバーしています。',
    link_test: 'Regex テスターですべてのパターンをテスト ->',
    h2_basics: '基本構文：アンカーと文字クラス',
    p_basics_intro: 'アンカーと文字クラスはregexパターンの基礎です。アンカーはマッチが<em>どこで</em>起こるかを指定し、文字クラスは<em>どの</em>文字をマッチするかを定義します。',
    h3_anchors: 'アンカー',
    p_anchors: 'アンカーは文字ではなく、文字列内の<em>位置</em>にマッチします。',
    h3_char_classes: '文字クラス',
    p_char_classes: '文字クラスは単一の位置で文字セットにマッチします。',
    h3_special_chars: '特殊文字（メタ文字）',
    p_special_chars: 'これらの文字はregexで特別な意味を持ちます。リテラルとしてマッチするにはバックスラッシュでエスケープします。',
    h2_quantifiers: '量指定子：マッチ回数',
    p_quantifiers_intro: '量指定子は繰り返し回数を制御します。デフォルトは<strong>貪欲</strong>で、<code>?</code>を付けると<strong>控えめ</strong>になります。',
    h3_greedy_vs_lazy: '貪欲 vs. 控えめ',
    p_greedy_lazy: '貪欲な<code>&lt;.*&gt;</code>は文字列全体にマッチし、<code>&lt;.*?&gt;</code>は最初のタグのみにマッチします。',
    h2_groups: 'グループとキャプチャ',
    p_groups_intro: 'グループは複数の文字を一つの単位として扱い、マッチした部分を抽出できます。',
    h3_capturing: 'キャプチャグループ',
    p_capturing: '<code>(...)</code>でマッチをキャプチャ。<code>\\1</code>、<code>\\2</code>で後方参照。',
    h3_named_groups: '名前付きグループ',
    p_named_groups: '<code>(?&lt;name&gt;...)</code>で可読性が向上します。',
    h3_non_capturing: '非キャプチャグループ',
    p_non_capturing: 'キャプチャ不要な場合は<code>(?:...)</code>を使用します。',
    h3_alternation: '選択（OR）',
    p_alternation: 'パイプ<code>|</code>で複数の選択肢をマッチします。',
    h2_lookaround: '先読みと後読み（ゼロ幅アサーション）',
    p_lookaround_intro: '先読み/後読みは現在位置の前後にパターンが存在するかを<em>文字を消費せずに</em>確認します。',
    h3_pos_lookahead: '肯定先読み (?=...)',
    p_pos_lookahead: '指定パターンが<em>後に続く</em>位置にマッチ。',
    h3_neg_lookahead: '否定先読み (?!...)',
    p_neg_lookahead: '指定パターンが<em>後に続かない</em>位置にマッチ。',
    h3_pos_lookbehind: '肯定後読み (?<=...)',
    p_pos_lookbehind: '指定パターンが<em>前にある</em>位置にマッチ。',
    h3_neg_lookbehind: '否定後読み (?<!...)',
    p_neg_lookbehind: '指定パターンが<em>前にない</em>位置にマッチ。',
    p_lookbehind_note: '<strong>注意：</strong>後読みは一部のエンジンでサポートが限定的です。GoのRE2エンジンは先読み/後読みをサポートしません。',
    h2_flags: 'Regexフラグ（修飾子）',
    p_flags_intro: 'フラグはregexエンジンのパターン解釈方法を変更します。',
    h2_common: '一般的なパターン早見表',
    p_common_intro: '最もよく使われるregexパターンの一覧です。',
    link_validate: 'Regex テスターですべてのパターンをテスト ->',
    h2_langs: '各プログラミング言語でのRegex',
    p_langs_intro: '構文は概ね共通ですが、各言語に固有のAPIがあります。',
    h3_js: 'JavaScript',
    h3_python: 'Python',
    h3_go: 'Go (Golang)',
    p_go_note: 'GoはRE2エンジンを使用し、先読み、後読み、後方参照を<strong>サポートしません</strong>。',
    h2_tips: 'パフォーマンスのヒントとベストプラクティス',
    p_tip1: '<strong>具体的に：</strong><code>.</code>の代わりに<code>[a-zA-Z]</code>を使用。',
    p_tip2: '<strong>壊滅的バックトラッキングを避ける：</strong><code>(a+)+</code>のようなネストした量指定子を避ける。',
    p_tip3: '<strong>非キャプチャグループを使う：</strong>キャプチャ不要なら<code>(?:...)</code>を使用。',
    p_tip4: '<strong>一度コンパイル：</strong>PythonやGoではコンパイル済みオブジェクトを再利用。',
    p_tip5: '<strong>段階的にテスト：</strong>複雑なパターンはステップバイステップで構築。',
    h2_faq: 'よくある質問',
    faq1_q: '正規表現チートシートとは何ですか？なぜ必要ですか？',
    faq1_a: '構文、メタ文字、量指定子、フラグ、一般的なパターンを一か所にまとめたクイックリファレンスです。経験豊富な開発者でもすべてを暗記することはできません。',
    faq2_q: 'regexの .* と .*? の違いは何ですか？',
    faq2_a: '.*は貪欲（最長マッチ）、.*?は控えめ（最短マッチ）。最初の区切り文字で止めたい場合は控えめを使います。',
    faq3_q: 'すべてのプログラミング言語で同じregex構文が使えますか？',
    faq3_a: 'ほとんどがPCREをサポートしますが、高度な機能は異なります。JavaScriptはES2018で後読みを追加、Go（RE2）は後読みをサポートしません。',
    faq4_q: 'regexパターンのテストとデバッグ方法は？',
    faq4_a: 'リアルタイムでマッチを表示するインタラクティブなRegexテスターを使用してください。パターンを段階的に構築しましょう。',
    faq5_q: '壊滅的バックトラッキングとは？',
    faq5_a: 'regexエンジンが文字列の不一致を判断するのに指数的な時間がかかる現象です。ネストした量指定子を避け、文字クラスを具体的にしましょう。',
  },
  ko: {
    intro: '정규 표현식(regex)은 개발자 도구 중 가장 강력한 도구 중 하나입니다. 사용자 입력 검증, 로그 파일 파싱, 복잡한 검색-치환 작업 등 regex는 비할 데 없는 정밀도를 제공합니다. 이 <strong>정규식 완전 치트시트</strong>는 앵커, 문자 클래스, 수량자, 그룹, 전후방 탐색, 플래그 등 모든 주요 개념을 다룹니다.',
    link_test: 'Regex 테스터에서 모든 패턴을 실시간으로 테스트하세요 ->',
    h2_basics: '기본 문법: 앵커와 문자 클래스',
    p_basics_intro: '앵커와 문자 클래스는 모든 regex 패턴의 기초입니다. 앵커는 매칭이 <em>어디서</em> 발생하는지를, 문자 클래스는 <em>어떤</em> 문자를 매칭할지 정의합니다.',
    h3_anchors: '앵커',
    p_anchors: '앵커는 문자가 아닌 문자열 내의 <em>위치</em>에 매칭됩니다.',
    h3_char_classes: '문자 클래스',
    p_char_classes: '문자 클래스는 단일 위치에서 문자 집합을 매칭합니다.',
    h3_special_chars: '특수 문자 (메타문자)',
    p_special_chars: '이 문자들은 regex에서 특별한 의미를 가집니다. 리터럴 매칭을 위해 백슬래시로 이스케이프하세요.',
    h2_quantifiers: '수량자: 매칭 횟수',
    p_quantifiers_intro: '수량자는 반복 횟수를 제어합니다. 기본적으로 <strong>탐욕적</strong>이며, <code>?</code>를 추가하면 <strong>게으른</strong> 모드가 됩니다.',
    h3_greedy_vs_lazy: '탐욕적 vs. 게으른',
    p_greedy_lazy: '탐욕적 <code>&lt;.*&gt;</code>는 전체 문자열과 매칭되고, <code>&lt;.*?&gt;</code>는 첫 번째 태그만 매칭합니다.',
    h2_groups: '그룹과 캡처',
    p_groups_intro: '그룹은 여러 문자를 하나의 단위로 취급하고 매칭된 부분을 추출할 수 있습니다.',
    h3_capturing: '캡처 그룹',
    p_capturing: '<code>(...)</code>로 매칭을 캡처합니다. <code>\\1</code>, <code>\\2</code> 등으로 역참조합니다.',
    h3_named_groups: '명명된 그룹',
    p_named_groups: '<code>(?&lt;name&gt;...)</code>으로 가독성을 향상시킵니다.',
    h3_non_capturing: '비캡처 그룹',
    p_non_capturing: '캡처가 필요 없을 때 <code>(?:...)</code>를 사용합니다.',
    h3_alternation: '대안 (OR)',
    p_alternation: '파이프 <code>|</code>로 여러 대안 중 하나를 매칭합니다.',
    h2_lookaround: '전방탐색과 후방탐색 (제로 너비 어서션)',
    p_lookaround_intro: '전후방 탐색은 현재 위치 앞뒤에 패턴이 존재하는지를 <em>문자를 소비하지 않고</em> 확인합니다.',
    h3_pos_lookahead: '긍정 전방탐색 (?=...)',
    p_pos_lookahead: '지정 패턴이 <em>뒤따르는</em> 위치에 매칭.',
    h3_neg_lookahead: '부정 전방탐색 (?!...)',
    p_neg_lookahead: '지정 패턴이 <em>뒤따르지 않는</em> 위치에 매칭.',
    h3_pos_lookbehind: '긍정 후방탐색 (?<=...)',
    p_pos_lookbehind: '지정 패턴이 <em>앞에 있는</em> 위치에 매칭.',
    h3_neg_lookbehind: '부정 후방탐색 (?<!...)',
    p_neg_lookbehind: '지정 패턴이 <em>앞에 없는</em> 위치에 매칭.',
    p_lookbehind_note: '<strong>참고:</strong> 후방탐색은 일부 엔진에서 제한적입니다. Go의 RE2 엔진은 전후방 탐색을 지원하지 않습니다.',
    h2_flags: 'Regex 플래그 (수정자)',
    p_flags_intro: '플래그는 regex 엔진의 패턴 해석 방식을 변경합니다.',
    h2_common: '자주 쓰는 패턴 빠른 참조',
    p_common_intro: '가장 자주 필요한 regex 패턴 모음입니다.',
    link_validate: 'Regex 테스터에서 모든 패턴 테스트하기 ->',
    h2_langs: '프로그래밍 언어별 Regex',
    p_langs_intro: '문법은 대부분 공통이지만 각 언어마다 고유한 API가 있습니다.',
    h3_js: 'JavaScript',
    h3_python: 'Python',
    h3_go: 'Go (Golang)',
    p_go_note: 'Go는 RE2 엔진을 사용하며 전방탐색, 후방탐색, 역참조를 <strong>지원하지 않습니다</strong>.',
    h2_tips: '성능 팁과 모범 사례',
    p_tip1: '<strong>구체적으로:</strong> <code>.</code> 대신 <code>[a-zA-Z]</code>를 사용하세요.',
    p_tip2: '<strong>치명적 백트래킹 방지:</strong> <code>(a+)+</code> 같은 중첩 수량자를 피하세요.',
    p_tip3: '<strong>비캡처 그룹 사용:</strong> 캡처가 불필요하면 <code>(?:...)</code>를 사용하세요.',
    p_tip4: '<strong>한 번 컴파일:</strong> Python과 Go에서는 컴파일된 regex 객체를 재사용하세요.',
    p_tip5: '<strong>점진적 테스트:</strong> 복잡한 패턴은 단계별로 구축하세요.',
    h2_faq: '자주 묻는 질문',
    faq1_q: '정규식 치트시트란 무엇이고 왜 필요한가요?',
    faq1_a: '문법, 메타문자, 수량자, 플래그, 일반 패턴을 한 곳에 모은 빠른 참조 가이드입니다. 숙련된 개발자도 모든 것을 외울 수 없습니다.',
    faq2_q: 'regex에서 .*와 .*?의 차이는 무엇인가요?',
    faq2_a: '.*는 탐욕적(가장 긴 매칭), .*?는 게으른(가장 짧은 매칭). 첫 번째 구분자에서 멈추려면 게으른 수량자를 사용하세요.',
    faq3_q: '모든 프로그래밍 언어가 같은 regex 문법을 지원하나요?',
    faq3_a: '대부분 PCRE를 지원하지만 고급 기능은 다릅니다. JavaScript는 ES2018에서 후방탐색 추가, Go(RE2)는 지원하지 않습니다.',
    faq4_q: 'regex 패턴을 어떻게 테스트하고 디버그하나요?',
    faq4_a: '실시간 매칭을 보여주는 인터랙티브 Regex 테스터를 사용하세요. 패턴을 단계별로 구축하세요.',
    faq5_q: '치명적 백트래킹이란 무엇인가요?',
    faq5_a: 'regex 엔진이 문자열 불일치를 판단하는 데 기하급수적 시간이 걸리는 현상입니다. 중첩 수량자를 피하고 문자 클래스를 구체적으로 지정하세요.',
  },
};

export default function RegexCheatSheet({ lang }: { lang: string }) {
  const r = t[lang] || t['en'];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: r.faq1_q, acceptedAnswer: { '@type': 'Answer', text: r.faq1_a } },
      { '@type': 'Question', name: r.faq2_q, acceptedAnswer: { '@type': 'Answer', text: r.faq2_a } },
      { '@type': 'Question', name: r.faq3_q, acceptedAnswer: { '@type': 'Answer', text: r.faq3_a } },
      { '@type': 'Question', name: r.faq4_q, acceptedAnswer: { '@type': 'Answer', text: r.faq4_a } },
      { '@type': 'Question', name: r.faq5_q, acceptedAnswer: { '@type': 'Answer', text: r.faq5_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: r.intro }} />

      <p>
        <Link href={`/${lang}/tools/regex-tester`} style={{ fontWeight: 600 }}>
          {r.link_test}
        </Link>
      </p>

      {/* ── Section 1: Basic Syntax ── */}
      <h2>{r.h2_basics}</h2>
      <p dangerouslySetInnerHTML={{ __html: r.p_basics_intro }} />

      <h3>{r.h3_anchors}</h3>
      <p dangerouslySetInnerHTML={{ __html: r.p_anchors }} />
      <table>
        <thead>
          <tr><th>Pattern</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td><code>^</code></td><td>Start of string (or line with <code>m</code> flag)</td><td><code>^Hello</code> matches &quot;Hello World&quot;</td></tr>
          <tr><td><code>$</code></td><td>End of string (or line with <code>m</code> flag)</td><td><code>world$</code> matches &quot;Hello world&quot;</td></tr>
          <tr><td><code>\b</code></td><td>Word boundary</td><td><code>\bcat\b</code> matches &quot;cat&quot; but not &quot;catch&quot;</td></tr>
          <tr><td><code>\B</code></td><td>Non-word boundary</td><td><code>\Bcat\B</code> matches &quot;concatenate&quot;</td></tr>
          <tr><td><code>\A</code></td><td>Absolute start of string (Python, Ruby)</td><td><code>\AHello</code></td></tr>
          <tr><td><code>\Z</code></td><td>Absolute end of string (Python, Ruby)</td><td><code>bye\Z</code></td></tr>
        </tbody>
      </table>

      <h3>{r.h3_char_classes}</h3>
      <p dangerouslySetInnerHTML={{ __html: r.p_char_classes }} />
      <table>
        <thead>
          <tr><th>Pattern</th><th>Description</th><th>Equivalent</th></tr>
        </thead>
        <tbody>
          <tr><td><code>[abc]</code></td><td>Match a, b, or c</td><td>--</td></tr>
          <tr><td><code>[^abc]</code></td><td>Match anything except a, b, c</td><td>--</td></tr>
          <tr><td><code>[a-z]</code></td><td>Match any lowercase letter</td><td>--</td></tr>
          <tr><td><code>[A-Z]</code></td><td>Match any uppercase letter</td><td>--</td></tr>
          <tr><td><code>[0-9]</code></td><td>Match any digit</td><td><code>\d</code></td></tr>
          <tr><td><code>.</code></td><td>Match any character (except newline by default)</td><td>--</td></tr>
          <tr><td><code>\d</code></td><td>Digit</td><td><code>[0-9]</code></td></tr>
          <tr><td><code>\D</code></td><td>Non-digit</td><td><code>[^0-9]</code></td></tr>
          <tr><td><code>\w</code></td><td>Word character</td><td><code>[a-zA-Z0-9_]</code></td></tr>
          <tr><td><code>\W</code></td><td>Non-word character</td><td><code>[^a-zA-Z0-9_]</code></td></tr>
          <tr><td><code>\s</code></td><td>Whitespace (space, tab, newline)</td><td><code>[ \t\n\r\f\v]</code></td></tr>
          <tr><td><code>\S</code></td><td>Non-whitespace</td><td><code>[^ \t\n\r\f\v]</code></td></tr>
        </tbody>
      </table>

      <h3>{r.h3_special_chars}</h3>
      <p dangerouslySetInnerHTML={{ __html: r.p_special_chars }} />
      <pre><code>{`Special characters that need escaping:
.  ^  $  *  +  ?  {  }  [  ]  \\  |  (  )

To match a literal dot:   \\.
To match a literal star:  \\*
To match a literal pipe:  \\|
To match a backslash:     \\\\`}</code></pre>

      {/* ── Section 2: Quantifiers ── */}
      <h2>{r.h2_quantifiers}</h2>
      <p dangerouslySetInnerHTML={{ __html: r.p_quantifiers_intro }} />
      <table>
        <thead>
          <tr><th>Greedy</th><th>Lazy</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>*</code></td><td><code>*?</code></td><td>0 or more times</td></tr>
          <tr><td><code>+</code></td><td><code>+?</code></td><td>1 or more times</td></tr>
          <tr><td><code>?</code></td><td><code>??</code></td><td>0 or 1 time (optional)</td></tr>
          <tr><td><code>{'{n}'}</code></td><td><code>{'{n}?'}</code></td><td>Exactly n times</td></tr>
          <tr><td><code>{'{n,}'}</code></td><td><code>{'{n,}?'}</code></td><td>n or more times</td></tr>
          <tr><td><code>{'{n,m}'}</code></td><td><code>{'{n,m}?'}</code></td><td>Between n and m times</td></tr>
        </tbody>
      </table>

      <h3>{r.h3_greedy_vs_lazy}</h3>
      <p dangerouslySetInnerHTML={{ __html: r.p_greedy_lazy }} />
      <pre><code>{`// Input string:
const str = '<b>bold</b> and <i>italic</i>';

// Greedy: matches from first < to LAST >
str.match(/<.*>/);
// Result: '<b>bold</b> and <i>italic</i>'

// Lazy: matches from first < to FIRST >
str.match(/<.*?>/);
// Result: '<b>'`}</code></pre>

      {/* ── Section 3: Groups ── */}
      <h2>{r.h2_groups}</h2>
      <p dangerouslySetInnerHTML={{ __html: r.p_groups_intro }} />

      <h3>{r.h3_capturing}</h3>
      <p dangerouslySetInnerHTML={{ __html: r.p_capturing }} />
      <pre><code>{`// Capturing group example
const dateRegex = /^(\\d{4})-(\\d{2})-(\\d{2})$/;
const match = '2026-02-10'.match(dateRegex);
// match[0] = '2026-02-10'  (full match)
// match[1] = '2026'        (year)
// match[2] = '02'          (month)
// match[3] = '10'          (day)

// Backreference: match repeated words
const repeated = /\\b(\\w+)\\s+\\1\\b/;
repeated.test('the the');  // true
repeated.test('the cat');  // false`}</code></pre>

      <h3>{r.h3_named_groups}</h3>
      <p dangerouslySetInnerHTML={{ __html: r.p_named_groups }} />
      <pre><code>{`// Named groups in JavaScript
const dateRegex = /^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$/;
const match = '2026-02-10'.match(dateRegex);
// match.groups.year  = '2026'
// match.groups.month = '02'
// match.groups.day   = '10'`}</code></pre>
      <pre><code>{`# Named groups in Python
import re
pattern = r'^(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})$'
m = re.match(pattern, '2026-02-10')
# m.group('year')  = '2026'
# m.group('month') = '02'
# m.group('day')   = '10'`}</code></pre>

      <h3>{r.h3_non_capturing}</h3>
      <p dangerouslySetInnerHTML={{ __html: r.p_non_capturing }} />
      <pre><code>{`// Non-capturing group
const regex = /(?:https?|ftp):\\/\\/[^\\s]+/;
// Groups the protocol options without capturing them
// Only the full URL is in match[0]`}</code></pre>

      <h3>{r.h3_alternation}</h3>
      <p dangerouslySetInnerHTML={{ __html: r.p_alternation }} />
      <pre><code>{`// Alternation examples
/cat|dog/           // Match "cat" or "dog"
/(red|blue) car/    // Match "red car" or "blue car"
/^(GET|POST|PUT|DELETE)\\s/  // Match HTTP methods`}</code></pre>

      {/* ── Section 4: Lookaround ── */}
      <h2>{r.h2_lookaround}</h2>
      <p dangerouslySetInnerHTML={{ __html: r.p_lookaround_intro }} />

      <table>
        <thead>
          <tr><th>Syntax</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>(?=...)</code></td><td>Positive lookahead</td><td>What follows must match</td></tr>
          <tr><td><code>(?!...)</code></td><td>Negative lookahead</td><td>What follows must NOT match</td></tr>
          <tr><td><code>(?&lt;=...)</code></td><td>Positive lookbehind</td><td>What precedes must match</td></tr>
          <tr><td><code>(?&lt;!...)</code></td><td>Negative lookbehind</td><td>What precedes must NOT match</td></tr>
        </tbody>
      </table>

      <h3>{r.h3_pos_lookahead}</h3>
      <p dangerouslySetInnerHTML={{ __html: r.p_pos_lookahead }} />
      <pre><code>{`// Match a number followed by "px"
/\\d+(?=px)/
// "20px 30em 40px" → matches "20" and "40" (not "30")

// Password: must contain at least one digit
/^(?=.*\\d).{8,}$/`}</code></pre>

      <h3>{r.h3_neg_lookahead}</h3>
      <p dangerouslySetInnerHTML={{ __html: r.p_neg_lookahead }} />
      <pre><code>{`// Match "cat" NOT followed by "fish"
/cat(?!fish)/
// "catfish catdog" → matches "cat" in "catdog" only

// Match numbers NOT followed by a unit
/\\d+(?!\\s*(px|em|rem|%))/`}</code></pre>

      <h3>{r.h3_pos_lookbehind}</h3>
      <p dangerouslySetInnerHTML={{ __html: r.p_pos_lookbehind }} />
      <pre><code>{`// Match a number preceded by "$"
/(?<=\\$)\\d+(\\.\\d{2})?/
// "$49.99 and €29.99" → matches "49.99" only

// Extract value after "price:"
/(?<=price:\\s*)\\d+/`}</code></pre>

      <h3>{r.h3_neg_lookbehind}</h3>
      <p dangerouslySetInnerHTML={{ __html: r.p_neg_lookbehind }} />
      <pre><code>{`// Match "cat" NOT preceded by "wild"
/(?<!wild)cat/
// "wildcat housecat" → matches "cat" in "housecat" only

// Match digits not preceded by a minus sign
/(?<!-)\\b\\d+\\b/`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: r.p_lookbehind_note }} />

      {/* ── Section 5: Flags ── */}
      <h2>{r.h2_flags}</h2>
      <p dangerouslySetInnerHTML={{ __html: r.p_flags_intro }} />
      <table>
        <thead>
          <tr><th>Flag</th><th>Name</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td><code>g</code></td><td>Global</td><td>Find all matches, not just the first</td><td><code>/cat/g</code> finds all &quot;cat&quot; occurrences</td></tr>
          <tr><td><code>i</code></td><td>Case-insensitive</td><td>Match upper and lowercase interchangeably</td><td><code>/hello/i</code> matches &quot;Hello&quot;, &quot;HELLO&quot;</td></tr>
          <tr><td><code>m</code></td><td>Multiline</td><td><code>^</code> and <code>$</code> match line starts/ends</td><td><code>/^start/m</code> matches at each line start</td></tr>
          <tr><td><code>s</code></td><td>Dotall (Single-line)</td><td><code>.</code> matches newline characters too</td><td><code>/a.b/s</code> matches {'"a\\nb"'}</td></tr>
          <tr><td><code>u</code></td><td>Unicode</td><td>Enable full Unicode matching</td><td><code>{'\/\\u{1F600}\/u'}</code> matches emoji</td></tr>
          <tr><td><code>y</code></td><td>Sticky</td><td>Match only at <code>lastIndex</code> position</td><td>Used for tokenizing / lexing</td></tr>
        </tbody>
      </table>
      <pre><code>{`// Combining flags
const regex = /^hello world$/gim;

// In Python, flags are constants:
import re
pattern = re.compile(r'^hello world$', re.IGNORECASE | re.MULTILINE)

// In Go, use inline flags:
// (?i) for case-insensitive, (?m) for multiline, (?s) for dotall
regexp.MustCompile("(?im)^hello world$")`}</code></pre>

      {/* ── Section 6: Common Patterns ── */}
      <h2>{r.h2_common}</h2>
      <p dangerouslySetInnerHTML={{ __html: r.p_common_intro }} />
      <table>
        <thead>
          <tr><th>Use Case</th><th>Pattern</th></tr>
        </thead>
        <tbody>
          <tr><td>Email</td><td><code>{`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`}</code></td></tr>
          <tr><td>URL (HTTP/S)</td><td><code>{`^https?:\\/\\/[^\\s]+$`}</code></td></tr>
          <tr><td>IPv4 Address</td><td><code>{`^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.?\\b){4}$`}</code></td></tr>
          <tr><td>Date (YYYY-MM-DD)</td><td><code>{`^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$`}</code></td></tr>
          <tr><td>Time (HH:MM:SS)</td><td><code>{`^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$`}</code></td></tr>
          <tr><td>Hex Color</td><td><code>{`^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$`}</code></td></tr>
          <tr><td>Strong Password</td><td><code>{`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$`}</code></td></tr>
          <tr><td>Phone (E.164)</td><td><code>{`^\\+[1-9]\\d{1,14}$`}</code></td></tr>
          <tr><td>UUID</td><td><code>{`^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$`}</code></td></tr>
          <tr><td>Semantic Version</td><td><code>{`^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(-[\\w.]+)?(\\+[\\w.]+)?$`}</code></td></tr>
          <tr><td>HTML Tag</td><td><code>{`<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>(.*?)<\\/\\1>`}</code></td></tr>
          <tr><td>Trim Whitespace</td><td><code>{`^\\s+|\\s+$`}</code></td></tr>
        </tbody>
      </table>

      <p>
        <Link href={`/${lang}/tools/regex-tester`} style={{ fontWeight: 600 }}>
          {r.link_validate}
        </Link>
      </p>

      {/* ── Section 7: Different Languages ── */}
      <h2>{r.h2_langs}</h2>
      <p dangerouslySetInnerHTML={{ __html: r.p_langs_intro }} />

      <h3>{r.h3_js}</h3>
      <pre><code>{`// Creating regex in JavaScript
const regex1 = /^\\d+$/;             // Literal syntax
const regex2 = new RegExp('^\\\\d+$'); // Constructor (needs double-escape)

// Testing
regex1.test('12345');                // true

// Matching
'hello world'.match(/\\w+/g);        // ['hello', 'world']

// Replacing
'2026-02-10'.replace(
  /^(\\d{4})-(\\d{2})-(\\d{2})$/,
  '$2/$3/$1'
);  // '02/10/2026'

// matchAll (ES2020) - get all matches with groups
const text = 'Price: $10, Tax: $2';
for (const m of text.matchAll(/\\$(\\d+)/g)) {
  console.log(m[0], m[1]);
  // '$10' '10', then '$2' '2'
}

// Named groups (ES2018+)
const { groups } = '2026-02-10'.match(
  /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/
);
console.log(groups.year);  // '2026'`}</code></pre>

      <h3>{r.h3_python}</h3>
      <pre><code>{`import re

# Compile for reuse (recommended)
pattern = re.compile(r'^\\d+$')

# Test if the entire string matches
pattern.match('12345')      # Match object (truthy)
pattern.match('abc')        # None (falsy)

# Search anywhere in the string
re.search(r'\\d+', 'abc 123 def')  # Finds '123'

# Find all matches
re.findall(r'\\w+', 'hello world')  # ['hello', 'world']

# Replace
re.sub(
    r'^(\\d{4})-(\\d{2})-(\\d{2})$',
    r'\\2/\\3/\\1',
    '2026-02-10'
)  # '02/10/2026'

# Named groups
m = re.match(
    r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})',
    '2026-02-10'
)
m.group('year')   # '2026'
m.group('month')  # '02'

# Flags
re.findall(r'^start', text, re.MULTILINE | re.IGNORECASE)

# Split by pattern
re.split(r'[,;\\s]+', 'a, b; c  d')  # ['a', 'b', 'c', 'd']`}</code></pre>

      <h3>{r.h3_go}</h3>
      <pre><code>{`package main

import (
    "fmt"
    "regexp"
)

func main() {
    // Compile (panics on invalid pattern)
    re := regexp.MustCompile(\`^\\d+$\`)

    // Test
    fmt.Println(re.MatchString("12345"))  // true
    fmt.Println(re.MatchString("abc"))    // false

    // Find first match
    re2 := regexp.MustCompile(\`\\d+\`)
    fmt.Println(re2.FindString("abc 123 def"))  // "123"

    // Find all matches
    fmt.Println(re2.FindAllString("10 cats and 20 dogs", -1))
    // ["10", "20"]

    // Replace
    re3 := regexp.MustCompile(\`(\\d{4})-(\\d{2})-(\\d{2})\`)
    result := re3.ReplaceAllString("2026-02-10", "$2/$3/$1")
    fmt.Println(result)  // "02/10/2026"

    // Named groups
    re4 := regexp.MustCompile(\`(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})\`)
    match := re4.FindStringSubmatch("2026-02-10")
    for i, name := range re4.SubexpNames() {
        if name != "" {
            fmt.Printf("%s: %s\\n", name, match[i])
        }
    }
    // year: 2026, month: 02, day: 10

    // Inline flags: (?i) case-insensitive, (?m) multiline, (?s) dotall
    re5 := regexp.MustCompile(\`(?i)hello\`)
    fmt.Println(re5.MatchString("HELLO"))  // true
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: r.p_go_note }} />

      {/* ── Section 8: Tips ── */}
      <h2>{r.h2_tips}</h2>
      <p dangerouslySetInnerHTML={{ __html: r.p_tip1 }} />
      <p dangerouslySetInnerHTML={{ __html: r.p_tip2 }} />
      <pre><code>{`// BAD: Catastrophic backtracking risk
const bad = /^(a+)+$/;
bad.test('aaaaaaaaaaaaaaaaaaaaa!');  // Extremely slow!

// GOOD: Flatten nested quantifiers
const good = /^a+$/;
good.test('aaaaaaaaaaaaaaaaaaaaa!'); // Instant: false`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: r.p_tip3 }} />
      <p dangerouslySetInnerHTML={{ __html: r.p_tip4 }} />
      <pre><code>{`# Python: compile once, reuse many times
import re
email_re = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')

# Fast: uses pre-compiled pattern
for addr in addresses:
    if email_re.match(addr):
        print(f"Valid: {addr}")`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: r.p_tip5 }} />

      <p>
        <Link href={`/${lang}/tools/regex-tester`} style={{ fontWeight: 600 }}>
          {r.link_test}
        </Link>
      </p>

      {/* ── Section 9: FAQ ── */}
      <div className="faq-section">
        <h2>{r.h2_faq}</h2>
        <h3>{r.faq1_q}</h3>
        <p>{r.faq1_a}</p>
        <h3>{r.faq2_q}</h3>
        <p>{r.faq2_a}</p>
        <h3>{r.faq3_q}</h3>
        <p>{r.faq3_a}</p>
        <h3>{r.faq4_q}</h3>
        <p>{r.faq4_a}</p>
        <h3>{r.faq5_q}</h3>
        <p>{r.faq5_a}</p>
      </div>
    </>
  );
}
