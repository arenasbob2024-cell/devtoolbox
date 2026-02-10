const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Content Security Policy (CSP) Complete Guide',
    intro: 'Content Security Policy (CSP) is one of the most effective defenses against Cross-Site Scripting (XSS) attacks. By telling the browser exactly which resources are allowed to load, CSP can prevent malicious code injection even when your application has vulnerabilities.',
    whatTitle: 'What is CSP and Why Does It Matter?',
    whatDesc: 'CSP is an HTTP response header that controls which resources the browser is allowed to load for a given page. Without CSP, a single XSS vulnerability could allow attackers to inject scripts, steal cookies, redirect users, or deface your site.',
    howTitle: 'How CSP Works',
    howDesc: 'When a browser receives a CSP header, it enforces the policy by blocking any resource that violates the rules:',
    directivesTitle: 'All CSP Directives',
    directive: 'Directive',
    controls: 'Controls',
    example: 'Example',
    sourcesTitle: 'Source Values Explained',
    source: 'Source',
    meaning: 'Meaning',
    implTitle: 'Step-by-Step Implementation',
    step1: 'Step 1: Start with Report-Only Mode',
    step1Desc: 'Deploy CSP in report-only mode first to identify violations without breaking your site:',
    step2: 'Step 2: Analyze Violation Reports',
    step2Desc: 'Review the reports to understand what your site needs:',
    step3: 'Step 3: Build Your Policy',
    step3Desc: 'Create a policy based on your findings. Start strict and relax as needed:',
    step4: 'Step 4: Switch to Enforcement',
    step4Desc: 'Replace Content-Security-Policy-Report-Only with Content-Security-Policy:',
    configTitle: 'Common CSP Configurations',
    strictTitle: 'Strict Policy (Maximum Security)',
    moderateTitle: 'Moderate (Typical SPA)',
    gaTitle: 'With Google Analytics',
    deployTitle: 'Implementation Methods',
    nginxTitle: 'Nginx',
    apacheTitle: 'Apache',
    expressTitle: 'Express.js',
    metaTitle: 'HTML Meta Tag',
    reportingTitle: 'CSP Reporting',
    reportingDesc: 'CSP can send violation reports to a specified endpoint:',
    mistakesTitle: 'Common CSP Mistakes',
    mistake: 'Mistake',
    impact: 'Impact',
    fix: 'Fix',
    m1: 'Using unsafe-inline for scripts', m1i: 'Defeats XSS protection', m1f: 'Use nonces or hashes instead',
    m2: 'Using unsafe-eval', m2i: 'Allows eval() and similar', m2f: 'Refactor code to avoid eval()',
    m3: 'Wildcard (*) in script-src', m3i: 'Allows scripts from any domain', m3f: 'Whitelist specific domains',
    m4: 'Forgetting about inline styles', m4i: 'Blocks CSS-in-JS libraries', m4f: 'Add unsafe-inline to style-src or use nonces',
    m5: 'Not testing in report-only first', m5i: 'Breaks site functionality', m5f: 'Always start with report-only mode',
    m6: 'Missing base-uri directive', m6i: 'Allows base tag injection', m6f: 'Add base-uri \'self\'',
    faqTitle: 'FAQ',
    faq1q: 'What attacks does CSP prevent?',
    faq1a: 'CSP primarily prevents Cross-Site Scripting (XSS) attacks by controlling which scripts can execute. It also helps prevent clickjacking (via frame-ancestors), data injection, and mixed content issues.',
    faq2q: 'Does CSP replace input validation?',
    faq2a: 'No. CSP is a defense-in-depth measure. You should still validate and sanitize all user input. CSP acts as a safety net when other defenses fail.',
    faq3q: 'How do I use CSP with inline scripts?',
    faq3a: 'Use nonces (random tokens added to both the CSP header and script tags) or hashes (SHA-256 of the script content). Avoid unsafe-inline as it defeats the purpose of CSP.',
    faq4q: 'Will CSP slow down my website?',
    faq4a: 'No. CSP is enforced by the browser with negligible performance impact. The header itself is tiny. The only overhead is generating nonces if you use them, which is minimal.',
  },
  zh: {
    title: '内容安全策略 (CSP) 完全指南',
    intro: '内容安全策略 (CSP) 是防御跨站脚本 (XSS) 攻击最有效的手段之一。通过告诉浏览器哪些资源可以加载，CSP 即使在应用存在漏洞时也能阻止恶意代码注入。',
    whatTitle: '什么是 CSP，为什么重要？',
    whatDesc: 'CSP 是一个 HTTP 响应头，控制浏览器可以为给定页面加载哪些资源。没有 CSP，一个 XSS 漏洞就可能让攻击者注入脚本、窃取 Cookie、重定向用户或篡改网站。',
    howTitle: 'CSP 工作原理', howDesc: '当浏览器收到 CSP 头时，会通过阻止违规资源来执行策略：',
    directivesTitle: '所有 CSP 指令', directive: '指令', controls: '控制', example: '示例',
    sourcesTitle: '来源值说明', source: '来源', meaning: '含义',
    implTitle: '分步实施',
    step1: '步骤 1：从仅报告模式开始', step1Desc: '先以仅报告模式部署 CSP，在不破坏网站的情况下识别违规：',
    step2: '步骤 2：分析违规报告', step2Desc: '审查报告以了解网站需要什么：',
    step3: '步骤 3：构建策略', step3Desc: '根据分析结果创建策略。从严格开始，按需放宽：',
    step4: '步骤 4：切换到强制模式', step4Desc: '将 Report-Only 替换为 Content-Security-Policy：',
    configTitle: '常见 CSP 配置',
    strictTitle: '严格策略（最高安全性）', moderateTitle: '中等（典型 SPA）', gaTitle: '带 Google Analytics',
    deployTitle: '实现方法', nginxTitle: 'Nginx', apacheTitle: 'Apache', expressTitle: 'Express.js', metaTitle: 'HTML Meta 标签',
    reportingTitle: 'CSP 报告', reportingDesc: 'CSP 可以将违规报告发送到指定端点：',
    mistakesTitle: '常见 CSP 错误', mistake: '错误', impact: '影响', fix: '修复',
    m1: '脚本使用 unsafe-inline', m1i: '破坏 XSS 防护', m1f: '改用 nonce 或 hash',
    m2: '使用 unsafe-eval', m2i: '允许 eval() 等函数', m2f: '重构代码避免 eval()',
    m3: 'script-src 使用通配符 (*)', m3i: '允许任何域的脚本', m3f: '白名单指定域名',
    m4: '忘记处理内联样式', m4i: '阻止 CSS-in-JS 库', m4f: 'style-src 添加 unsafe-inline 或使用 nonce',
    m5: '未先在仅报告模式测试', m5i: '破坏网站功能', m5f: '始终先从仅报告模式开始',
    m6: '缺少 base-uri 指令', m6i: '允许 base 标签注入', m6f: '添加 base-uri \'self\'',
    faqTitle: '常见问题',
    faq1q: 'CSP 能防止哪些攻击？', faq1a: 'CSP 主要通过控制脚本执行来防止 XSS 攻击。还能防止点击劫持（frame-ancestors）、数据注入和混合内容问题。',
    faq2q: 'CSP 能替代输入验证吗？', faq2a: '不能。CSP 是深度防御措施。仍需验证和清理所有用户输入。CSP 是其他防御失败时的安全网。',
    faq3q: '如何在内联脚本中使用 CSP？', faq3a: '使用 nonce（添加到 CSP 头和 script 标签的随机令牌）或 hash（脚本内容的 SHA-256）。避免使用 unsafe-inline。',
    faq4q: 'CSP 会拖慢网站吗？', faq4a: '不会。CSP 由浏览器执行，性能影响可以忽略。头本身很小。唯一的开销是生成 nonce（如果使用的话），这也是极小的。',
  },
  ja: {
    title: 'Content Security Policy (CSP) 完全ガイド',
    intro: 'CSPはXSS攻撃に対する最も効果的な防御手段の一つです。ブラウザにどのリソースの読み込みを許可するかを指示することで、脆弱性があっても悪意のあるコード注入を防ぎます。',
    whatTitle: 'CSPとは？なぜ重要？', whatDesc: 'CSPはHTTPレスポンスヘッダーで、ブラウザが読み込み可能なリソースを制御します。',
    howTitle: 'CSPの仕組み', howDesc: 'ブラウザがCSPヘッダーを受信すると、ルールに違反するリソースをブロックします：',
    directivesTitle: 'CSPディレクティブ一覧', directive: 'ディレクティブ', controls: '制御対象', example: '例',
    sourcesTitle: 'ソース値の説明', source: 'ソース', meaning: '意味',
    implTitle: '段階的な実装',
    step1: 'ステップ1: レポートオンリーモードで開始', step1Desc: 'サイトを壊さずに違反を特定：',
    step2: 'ステップ2: 違反レポートを分析', step2Desc: 'レポートを確認：',
    step3: 'ステップ3: ポリシーを構築', step3Desc: '結果に基づいてポリシーを作成：',
    step4: 'ステップ4: 強制モードに切替', step4Desc: 'Report-OnlyをContent-Security-Policyに変更：',
    configTitle: '一般的なCSP設定', strictTitle: '厳格なポリシー', moderateTitle: '中程度（典型的なSPA）', gaTitle: 'Google Analytics付き',
    deployTitle: '実装方法', nginxTitle: 'Nginx', apacheTitle: 'Apache', expressTitle: 'Express.js', metaTitle: 'HTMLメタタグ',
    reportingTitle: 'CSPレポーティング', reportingDesc: 'CSPは違反レポートを指定のエンドポイントに送信できます：',
    mistakesTitle: 'よくある間違い', mistake: '間違い', impact: '影響', fix: '修正',
    m1: 'スクリプトにunsafe-inline使用', m1i: 'XSS保護が無効に', m1f: 'nonceまたはhashを使用',
    m2: 'unsafe-eval使用', m2i: 'eval()を許可', m2f: 'eval()を避けるよう改修',
    m3: 'script-srcにワイルドカード', m3i: '任意ドメインのスクリプト許可', m3f: '特定ドメインをホワイトリスト',
    m4: 'インラインスタイルの考慮漏れ', m4i: 'CSS-in-JSがブロック', m4f: 'style-srcにunsafe-inlineかnonce',
    m5: 'レポートオンリーでのテスト省略', m5i: 'サイト機能が壊れる', m5f: '必ずレポートオンリーから開始',
    m6: 'base-uri未設定', m6i: 'baseタグ注入を許可', m6f: 'base-uri \'self\'を追加',
    faqTitle: 'FAQ',
    faq1q: 'CSPはどんな攻撃を防ぎますか？', faq1a: '主にXSS攻撃を防ぎます。また、クリックジャッキング、データ注入、混合コンテンツ問題も防ぎます。',
    faq2q: 'CSPは入力検証の代わりになりますか？', faq2a: 'いいえ。CSPは多層防御の一つです。入力の検証とサニタイズは引き続き必要です。',
    faq3q: 'インラインスクリプトでCSPを使うには？', faq3a: 'nonce（ランダムトークン）またはhash（SHA-256）を使用します。unsafe-inlineは避けてください。',
    faq4q: 'CSPはサイトを遅くしますか？', faq4a: 'いいえ。CSPはブラウザが実行し、パフォーマンスへの影響は無視できる程度です。',
  },
  ko: {
    title: 'Content Security Policy (CSP) 완전 가이드',
    intro: 'CSP는 XSS 공격에 대한 가장 효과적인 방어 수단 중 하나입니다. 브라우저에 어떤 리소스를 로드할 수 있는지 알려줌으로써 취약점이 있어도 악성 코드 주입을 방지합니다.',
    whatTitle: 'CSP란? 왜 중요한가?', whatDesc: 'CSP는 브라우저가 로드할 수 있는 리소스를 제어하는 HTTP 응답 헤더입니다.',
    howTitle: 'CSP 작동 원리', howDesc: '브라우저가 CSP 헤더를 받으면 규칙을 위반하는 리소스를 차단합니다:',
    directivesTitle: 'CSP 디렉티브 전체', directive: '디렉티브', controls: '제어 대상', example: '예시',
    sourcesTitle: '소스 값 설명', source: '소스', meaning: '의미',
    implTitle: '단계별 구현',
    step1: '1단계: 리포트 전용 모드로 시작', step1Desc: '사이트를 깨뜨리지 않고 위반 사항을 식별:',
    step2: '2단계: 위반 보고서 분석', step2Desc: '보고서를 검토:',
    step3: '3단계: 정책 구축', step3Desc: '분석 결과를 바탕으로 정책 생성:',
    step4: '4단계: 강제 모드로 전환', step4Desc: 'Report-Only를 Content-Security-Policy로 변경:',
    configTitle: '일반적인 CSP 설정', strictTitle: '엄격한 정책', moderateTitle: '중간 (일반 SPA)', gaTitle: 'Google Analytics 포함',
    deployTitle: '구현 방법', nginxTitle: 'Nginx', apacheTitle: 'Apache', expressTitle: 'Express.js', metaTitle: 'HTML Meta 태그',
    reportingTitle: 'CSP 리포팅', reportingDesc: 'CSP는 위반 보고서를 지정된 엔드포인트로 전송할 수 있습니다:',
    mistakesTitle: '일반적인 실수', mistake: '실수', impact: '영향', fix: '해결',
    m1: '스크립트에 unsafe-inline 사용', m1i: 'XSS 보호 무효화', m1f: 'nonce 또는 hash 사용',
    m2: 'unsafe-eval 사용', m2i: 'eval() 허용', m2f: 'eval() 없이 코드 리팩토링',
    m3: 'script-src에 와일드카드(*)', m3i: '모든 도메인 스크립트 허용', m3f: '특정 도메인만 화이트리스트',
    m4: '인라인 스타일 미고려', m4i: 'CSS-in-JS 차단', m4f: 'style-src에 unsafe-inline 또는 nonce',
    m5: '리포트 전용 테스트 생략', m5i: '사이트 기능 중단', m5f: '항상 리포트 전용부터 시작',
    m6: 'base-uri 미설정', m6i: 'base 태그 주입 허용', m6f: 'base-uri \'self\' 추가',
    faqTitle: 'FAQ',
    faq1q: 'CSP는 어떤 공격을 방지하나요?', faq1a: '주로 XSS 공격을 방지합니다. 클릭재킹, 데이터 주입, 혼합 콘텐츠 문제도 방지합니다.',
    faq2q: 'CSP가 입력 검증을 대체하나요?', faq2a: '아니요. CSP는 심층 방어 수단입니다. 모든 사용자 입력의 검증과 새니타이즈는 여전히 필요합니다.',
    faq3q: '인라인 스크립트에서 CSP를 사용하려면?', faq3a: 'nonce(랜덤 토큰) 또는 hash(SHA-256)를 사용합니다. unsafe-inline은 피하세요.',
    faq4q: 'CSP가 웹사이트를 느리게 하나요?', faq4a: '아니요. CSP는 브라우저가 실행하며 성능 영향은 무시할 수 있습니다.',
  },
  fr: {
    title: 'Guide complet Content Security Policy (CSP)',
    intro: 'Le CSP est l\'une des défenses les plus efficaces contre les attaques XSS. En indiquant au navigateur quelles ressources peuvent être chargées, le CSP prévient l\'injection de code malveillant.',
    whatTitle: 'Qu\'est-ce que le CSP ?', whatDesc: 'Le CSP est un en-tête HTTP qui contrôle les ressources que le navigateur peut charger.',
    howTitle: 'Comment fonctionne le CSP', howDesc: 'Le navigateur bloque les ressources qui violent la politique :',
    directivesTitle: 'Toutes les directives CSP', directive: 'Directive', controls: 'Contrôle', example: 'Exemple',
    sourcesTitle: 'Valeurs sources', source: 'Source', meaning: 'Signification',
    implTitle: 'Implémentation étape par étape',
    step1: 'Étape 1 : Mode rapport uniquement', step1Desc: 'Déployer d\'abord en mode rapport :',
    step2: 'Étape 2 : Analyser les rapports', step2Desc: 'Examiner les rapports :', step3: 'Étape 3 : Construire la politique', step3Desc: 'Créer la politique :',
    step4: 'Étape 4 : Activer l\'application', step4Desc: 'Remplacer Report-Only :',
    configTitle: 'Configurations courantes', strictTitle: 'Politique stricte', moderateTitle: 'Modérée (SPA typique)', gaTitle: 'Avec Google Analytics',
    deployTitle: 'Méthodes d\'implémentation', nginxTitle: 'Nginx', apacheTitle: 'Apache', expressTitle: 'Express.js', metaTitle: 'Balise Meta HTML',
    reportingTitle: 'Rapports CSP', reportingDesc: 'Le CSP peut envoyer des rapports de violation :',
    mistakesTitle: 'Erreurs courantes', mistake: 'Erreur', impact: 'Impact', fix: 'Solution',
    m1: 'unsafe-inline pour les scripts', m1i: 'Protection XSS désactivée', m1f: 'Utiliser nonces ou hashes',
    m2: 'unsafe-eval', m2i: 'Permet eval()', m2f: 'Refactorer sans eval()',
    m3: 'Wildcard dans script-src', m3i: 'Scripts de n\'importe quel domaine', m3f: 'Lister les domaines spécifiques',
    m4: 'Oublier les styles inline', m4i: 'Bloque CSS-in-JS', m4f: 'Ajouter unsafe-inline à style-src',
    m5: 'Ne pas tester en report-only', m5i: 'Casse le site', m5f: 'Toujours commencer en report-only',
    m6: 'base-uri manquant', m6i: 'Injection de balise base', m6f: 'Ajouter base-uri \'self\'',
    faqTitle: 'FAQ',
    faq1q: 'Quelles attaques le CSP prévient-il ?', faq1a: 'Principalement les attaques XSS. Aussi le clickjacking et l\'injection de données.',
    faq2q: 'Le CSP remplace-t-il la validation d\'entrée ?', faq2a: 'Non. C\'est une défense en profondeur.',
    faq3q: 'Comment utiliser le CSP avec des scripts inline ?', faq3a: 'Utiliser des nonces ou des hashes. Éviter unsafe-inline.',
    faq4q: 'Le CSP ralentit-il le site ?', faq4a: 'Non. L\'impact sur les performances est négligeable.',
  },
  de: {
    title: 'Content Security Policy (CSP) Komplett-Guide',
    intro: 'CSP ist eine der effektivsten Verteidigungen gegen XSS-Angriffe. Durch die Kontrolle, welche Ressourcen geladen werden dürfen, kann CSP böswillige Code-Injektion verhindern.',
    whatTitle: 'Was ist CSP?', whatDesc: 'CSP ist ein HTTP-Response-Header, der kontrolliert, welche Ressourcen der Browser laden darf.',
    howTitle: 'Wie CSP funktioniert', howDesc: 'Der Browser blockiert Ressourcen, die gegen die Richtlinie verstoßen:',
    directivesTitle: 'Alle CSP-Direktiven', directive: 'Direktive', controls: 'Steuert', example: 'Beispiel',
    sourcesTitle: 'Quellwerte erklärt', source: 'Quelle', meaning: 'Bedeutung',
    implTitle: 'Schrittweise Implementierung',
    step1: 'Schritt 1: Report-Only-Modus', step1Desc: 'Zuerst im Report-Only-Modus bereitstellen:',
    step2: 'Schritt 2: Berichte analysieren', step2Desc: 'Berichte prüfen:', step3: 'Schritt 3: Richtlinie erstellen', step3Desc: 'Richtlinie basierend auf Ergebnissen:',
    step4: 'Schritt 4: Durchsetzung aktivieren', step4Desc: 'Report-Only ersetzen:',
    configTitle: 'Häufige Konfigurationen', strictTitle: 'Strenge Richtlinie', moderateTitle: 'Moderat (typische SPA)', gaTitle: 'Mit Google Analytics',
    deployTitle: 'Implementierungsmethoden', nginxTitle: 'Nginx', apacheTitle: 'Apache', expressTitle: 'Express.js', metaTitle: 'HTML Meta Tag',
    reportingTitle: 'CSP-Reporting', reportingDesc: 'CSP kann Verletzungsberichte senden:',
    mistakesTitle: 'Häufige Fehler', mistake: 'Fehler', impact: 'Auswirkung', fix: 'Lösung',
    m1: 'unsafe-inline für Skripte', m1i: 'XSS-Schutz aufgehoben', m1f: 'Nonces oder Hashes verwenden',
    m2: 'unsafe-eval', m2i: 'Erlaubt eval()', m2f: 'Code ohne eval() refaktorieren',
    m3: 'Wildcard in script-src', m3i: 'Skripte von allen Domains', m3f: 'Spezifische Domains whitelisten',
    m4: 'Inline-Styles vergessen', m4i: 'Blockiert CSS-in-JS', m4f: 'unsafe-inline oder Nonces für style-src',
    m5: 'Kein Report-Only-Test', m5i: 'Site-Funktionalität bricht', m5f: 'Immer mit Report-Only starten',
    m6: 'base-uri fehlt', m6i: 'Base-Tag-Injection möglich', m6f: 'base-uri \'self\' hinzufügen',
    faqTitle: 'FAQ',
    faq1q: 'Welche Angriffe verhindert CSP?', faq1a: 'Hauptsächlich XSS. Auch Clickjacking und Dateninjection.',
    faq2q: 'Ersetzt CSP Input-Validierung?', faq2a: 'Nein. CSP ist Defense-in-Depth.',
    faq3q: 'CSP mit Inline-Skripten?', faq3a: 'Nonces oder Hashes verwenden. unsafe-inline vermeiden.',
    faq4q: 'Verlangsamt CSP die Website?', faq4a: 'Nein. Der Performance-Einfluss ist vernachlässigbar.',
  },
  es: {
    title: 'Guía completa Content Security Policy (CSP)',
    intro: 'CSP es una de las defensas más efectivas contra ataques XSS. Al indicar al navegador qué recursos pueden cargarse, CSP previene la inyección de código malicioso.',
    whatTitle: '¿Qué es CSP?', whatDesc: 'CSP es una cabecera HTTP que controla qué recursos puede cargar el navegador.',
    howTitle: 'Cómo funciona CSP', howDesc: 'El navegador bloquea recursos que violan la política:',
    directivesTitle: 'Todas las directivas CSP', directive: 'Directiva', controls: 'Controla', example: 'Ejemplo',
    sourcesTitle: 'Valores de origen', source: 'Origen', meaning: 'Significado',
    implTitle: 'Implementación paso a paso',
    step1: 'Paso 1: Modo solo reporte', step1Desc: 'Desplegar primero en modo reporte:',
    step2: 'Paso 2: Analizar reportes', step2Desc: 'Revisar reportes:', step3: 'Paso 3: Construir política', step3Desc: 'Crear política:',
    step4: 'Paso 4: Activar aplicación', step4Desc: 'Reemplazar Report-Only:',
    configTitle: 'Configuraciones comunes', strictTitle: 'Política estricta', moderateTitle: 'Moderada (SPA típica)', gaTitle: 'Con Google Analytics',
    deployTitle: 'Métodos de implementación', nginxTitle: 'Nginx', apacheTitle: 'Apache', expressTitle: 'Express.js', metaTitle: 'Meta tag HTML',
    reportingTitle: 'Reportes CSP', reportingDesc: 'CSP puede enviar reportes de violación:',
    mistakesTitle: 'Errores comunes', mistake: 'Error', impact: 'Impacto', fix: 'Solución',
    m1: 'unsafe-inline para scripts', m1i: 'Protección XSS desactivada', m1f: 'Usar nonces o hashes',
    m2: 'unsafe-eval', m2i: 'Permite eval()', m2f: 'Refactorizar sin eval()',
    m3: 'Wildcard en script-src', m3i: 'Scripts de cualquier dominio', m3f: 'Listar dominios específicos',
    m4: 'Olvidar estilos inline', m4i: 'Bloquea CSS-in-JS', m4f: 'Agregar unsafe-inline a style-src',
    m5: 'No probar en report-only', m5i: 'Rompe el sitio', m5f: 'Siempre empezar en report-only',
    m6: 'Falta base-uri', m6i: 'Inyección de tag base', m6f: 'Agregar base-uri \'self\'',
    faqTitle: 'FAQ',
    faq1q: '¿Qué ataques previene CSP?', faq1a: 'Principalmente XSS. También clickjacking e inyección de datos.',
    faq2q: '¿CSP reemplaza la validación de entrada?', faq2a: 'No. CSP es defensa en profundidad.',
    faq3q: '¿Cómo usar CSP con scripts inline?', faq3a: 'Usar nonces o hashes. Evitar unsafe-inline.',
    faq4q: '¿CSP ralentiza el sitio?', faq4a: 'No. El impacto en rendimiento es despreciable.',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };

export default function CspHeaderGuide({ lang }: { lang: string }) {
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

      <h2 style={h2Style}>{t.whatTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.whatDesc}</p>

      <h2 style={h2Style}>{t.howTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.howDesc}</p>
      <pre style={codeStyle}><code>{`Browser receives HTTP response:
  Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.example.com

Browser allows:
  ✅ <script src="/app.js">              (same origin = 'self')
  ✅ <script src="https://cdn.example.com/lib.js">

Browser blocks:
  ❌ <script src="https://evil.com/steal.js">
  ❌ <script>alert('XSS')</script>       (inline = not allowed)`}</code></pre>

      <h2 style={h2Style}>{t.directivesTitle}</h2>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>{t.directive}</th><th style={thStyle}>{t.controls}</th><th style={thStyle}>{t.example}</th></tr></thead>
        <tbody>
          {[
            ['default-src', 'Fallback for all resource types', "'self'"],
            ['script-src', 'JavaScript files and inline scripts', "'self' https://cdn.example.com"],
            ['style-src', 'CSS stylesheets and inline styles', "'self' 'unsafe-inline'"],
            ['img-src', 'Images (img, favicon, CSS background)', "'self' data: https:"],
            ['font-src', 'Web fonts (@font-face)', "'self' https://fonts.gstatic.com"],
            ['connect-src', 'XHR, fetch, WebSocket, EventSource', "'self' https://api.example.com"],
            ['media-src', 'Audio and video elements', "'self'"],
            ['frame-src', 'Iframes and embedded frames', "'self' https://www.youtube.com"],
            ['object-src', 'Plugins (Flash, Java applets)', "'none'"],
            ['base-uri', 'Base element URLs', "'self'"],
            ['form-action', 'Form submission targets', "'self'"],
            ['frame-ancestors', 'Who can embed this page (anti-clickjacking)', "'self'"],
            ['upgrade-insecure-requests', 'Upgrade HTTP requests to HTTPS', '(no value needed)'],
          ].map(([dir, ctrl, ex], i) => (
            <tr key={i}>
              <td style={{...tdStyle, fontFamily: 'monospace', fontWeight: 600}}>{dir}</td>
              <td style={tdStyle}>{ctrl}</td>
              <td style={{...tdStyle, fontFamily: 'monospace', fontSize: 12}}>{ex}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={h2Style}>{t.sourcesTitle}</h2>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>{t.source}</th><th style={thStyle}>{t.meaning}</th></tr></thead>
        <tbody>
          {[
            ["'self'", 'Same origin (protocol + host + port)'],
            ["'none'", 'Block all resources of this type'],
            ["'unsafe-inline'", 'Allow inline scripts/styles (reduces security!)'],
            ["'unsafe-eval'", 'Allow eval(), Function(), setTimeout(string)'],
            ["'strict-dynamic'", 'Trust scripts loaded by already-trusted scripts'],
            ["'nonce-abc123'", 'Allow specific inline script with matching nonce attribute'],
            ["'sha256-...'", 'Allow inline script matching this hash'],
            ['https:', 'Allow any HTTPS resource'],
            ['data:', 'Allow data: URIs (e.g., inline images)'],
            ['blob:', 'Allow blob: URIs'],
            ['*.example.com', 'Allow all subdomains of example.com'],
          ].map(([src, meaning], i) => (
            <tr key={i}>
              <td style={{...tdStyle, fontFamily: 'monospace', fontWeight: 600}}>{src}</td>
              <td style={tdStyle}>{meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={h2Style}>{t.implTitle}</h2>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--accent-blue)' }}>{t.step1}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.step1Desc}</p>
      <pre style={codeStyle}><code>{`Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-report`}</code></pre>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--accent-blue)' }}>{t.step3}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.step3Desc}</p>
      <pre style={codeStyle}><code>{`Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.example.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'self';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
  upgrade-insecure-requests`}</code></pre>

      <h2 style={h2Style}>{t.configTitle}</h2>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' }}>{t.strictTitle}</h3>
      <pre style={codeStyle}><code>{`Content-Security-Policy:
  default-src 'none';
  script-src 'self';
  style-src 'self';
  img-src 'self';
  font-src 'self';
  connect-src 'self';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  object-src 'none';
  upgrade-insecure-requests`}</code></pre>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' }}>{t.moderateTitle}</h3>
      <pre style={codeStyle}><code>{`Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.example.com wss://ws.example.com;
  frame-ancestors 'self'`}</code></pre>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' }}>{t.gaTitle}</h3>
      <pre style={codeStyle}><code>{`Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com;
  img-src 'self' https://www.google-analytics.com https://www.googletagmanager.com;
  connect-src 'self' https://www.google-analytics.com https://analytics.google.com`}</code></pre>

      <h2 style={h2Style}>{t.deployTitle}</h2>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' }}>{t.nginxTitle}</h3>
      <pre style={codeStyle}><code>{`add_header Content-Security-Policy "default-src 'self'; script-src 'self'" always;`}</code></pre>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' }}>{t.apacheTitle}</h3>
      <pre style={codeStyle}><code>{`Header set Content-Security-Policy "default-src 'self'; script-src 'self'"`}</code></pre>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' }}>{t.expressTitle}</h3>
      <pre style={codeStyle}><code>{`// Using helmet middleware (recommended)
const helmet = require('helmet');
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://cdn.example.com"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
  }
}));

// Or manually
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; script-src 'self'");
  next();
});`}</code></pre>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' }}>{t.metaTitle}</h3>
      <pre style={codeStyle}><code>{`<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'">`}</code></pre>

      <h2 style={h2Style}>{t.mistakesTitle}</h2>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>{t.mistake}</th><th style={thStyle}>{t.impact}</th><th style={thStyle}>{t.fix}</th></tr></thead>
        <tbody>
          {[[t.m1,t.m1i,t.m1f],[t.m2,t.m2i,t.m2f],[t.m3,t.m3i,t.m3f],[t.m4,t.m4i,t.m4f],[t.m5,t.m5i,t.m5f],[t.m6,t.m6i,t.m6f]].map(([m,imp,f],i) => (
            <tr key={i}><td style={tdStyle}>{m}</td><td style={tdStyle}>{imp}</td><td style={tdStyle}>{f}</td></tr>
          ))}
        </tbody>
      </table>

      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[{q:t.faq1q,a:t.faq1a},{q:t.faq2q,a:t.faq2a},{q:t.faq3q,a:t.faq3a},{q:t.faq4q,a:t.faq4a}].map((faq,i) => (
        <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>{faq.q}</summary>
          <p style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
