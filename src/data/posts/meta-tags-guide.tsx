import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Meta tags are the invisible backbone of every web page. They tell search engines what your page is about, control how your content appears when shared on social media, and influence browser behavior. Yet many developers either skip them entirely or use them incorrectly. This <strong>complete HTML meta tags guide</strong> covers every meta tag your website needs in 2026 — from essential basics to advanced SEO, social sharing, security, and performance tags.',
    linkTool: 'Generate perfect meta tags instantly with our free Meta Tag Generator →',
    h2_essential: 'Essential Meta Tags Every Page Needs',
    essentialDesc: 'These are the absolute minimum meta tags that every HTML page should include. Without them, browsers may render your page incorrectly and search engines will struggle to index it properly.',
    h2_seo: 'SEO Meta Tags',
    seoDesc: 'Search engine optimization meta tags help Google, Bing, and other search engines understand and properly index your content. These tags directly influence your search rankings and how your pages appear in search results.',
    h2_og: 'Open Graph Meta Tags',
    ogDesc: 'Open Graph tags control how your content appears when shared on Facebook, LinkedIn, Discord, Slack, and many other platforms. Without proper Open Graph tags, these platforms will attempt to guess your content — often with poor results.',
    h2_twitter: 'Twitter Card Meta Tags',
    twitterDesc: 'Twitter (X) uses its own set of meta tags for rich link previews. While Twitter can fall back to Open Graph tags, using dedicated Twitter Card tags gives you more control over how your content appears in tweets.',
    h2_security: 'Security Meta Tags',
    securityDesc: 'Security-related meta tags help protect your website and users from common web vulnerabilities. While many security policies are better set via HTTP headers, meta tag equivalents provide a fallback.',
    h2_perf: 'Performance Meta Tags',
    perfDesc: 'Performance meta tags and link hints help browsers load your page faster by providing early hints about resources that will be needed.',
    h2_mobile: 'Mobile & App Meta Tags',
    mobileDesc: 'These meta tags control how your website behaves on mobile devices and when saved as a home screen app.',
    h2_structured: 'Meta Tags for Structured Data & Authorship',
    structuredDesc: 'These meta tags provide additional context about your content, useful for structured data and content attribution.',
    h2_mistakes: 'Common Meta Tag Mistakes to Avoid',
    mistakesList: '<ul><li><strong>Duplicate meta descriptions</strong> — Every page should have a unique meta description. Duplicate descriptions confuse search engines and hurt your click-through rate.</li><li><strong>Missing viewport tag</strong> — Without the viewport meta tag, your site will not be mobile-friendly, which hurts rankings on mobile search.</li><li><strong>Using meta keywords</strong> — Google has ignored the <code>meta keywords</code> tag since 2009. Do not waste time on it.</li><li><strong>Title tag too long</strong> — Keep titles under 60 characters. Longer titles get truncated in search results.</li><li><strong>Meta description too long</strong> — Keep descriptions between 120–160 characters. Google truncates longer descriptions.</li><li><strong>Missing Open Graph image</strong> — Social shares without an image get significantly less engagement. Always include <code>og:image</code>.</li><li><strong>Wrong image dimensions</strong> — Use 1200×630 pixels for Open Graph images and 1200×600 for Twitter cards.</li><li><strong>Forgetting canonical URLs</strong> — Without canonical tags, duplicate content can split your SEO authority across multiple URLs.</li><li><strong>Blocking indexing accidentally</strong> — Double-check your <code>robots</code> meta tag. A misplaced <code>noindex</code> can remove your page from search results entirely.</li><li><strong>Not testing social previews</strong> — Always test your Open Graph and Twitter Card tags using Facebook\'s Sharing Debugger and Twitter\'s Card Validator before publishing.</li></ul>',
    h2_template: 'Complete Copy-Paste Meta Tag Template',
    templateDesc: 'Here is a production-ready HTML head template with all the essential meta tags. Copy this into your project and replace the placeholder values:',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the optimal meta description length?',
    faq1_a: 'The optimal meta description length is between 120 and 160 characters. Google typically displays up to 155–160 characters on desktop and around 120 characters on mobile. Keep your most important information within the first 120 characters to ensure it\'s visible on all devices. Descriptions that are too short may not provide enough context, while descriptions that are too long will be truncated with an ellipsis.',
    faq2_q: 'Do meta keywords still matter for SEO?',
    faq2_a: 'No, meta keywords have no impact on SEO for Google, Bing, or any major search engine. Google officially confirmed in 2009 that it does not use the meta keywords tag as a ranking factor. In fact, stuffing keywords into this tag can be seen as a spam signal by some search engines. Focus your SEO efforts on quality content, proper title tags, meta descriptions, and structured data instead.',
    faq3_q: 'What is the difference between Open Graph and Twitter Cards?',
    faq3_a: 'Open Graph (OG) tags were created by Facebook and are used by most social platforms including Facebook, LinkedIn, Discord, and Slack. Twitter Cards are Twitter\'s proprietary system for rich link previews. The key difference is that Twitter Card tags use <code>twitter:</code> prefix (e.g., <code>twitter:title</code>) while Open Graph uses <code>og:</code> prefix (e.g., <code>og:title</code>). Twitter will fall back to Open Graph tags if Twitter-specific tags are not present, but having both gives you maximum control over how your content appears on each platform.',
    faq4_q: 'How do I test if my meta tags are working correctly?',
    faq4_a: 'Use these free tools to validate your meta tags: <strong>Google Rich Results Test</strong> for structured data, <strong>Facebook Sharing Debugger</strong> (developers.facebook.com/tools/debug) for Open Graph tags, <strong>Twitter Card Validator</strong> (cards-dev.twitter.com/validator) for Twitter Cards, and browser DevTools to inspect the HTML head. You can also use our Meta Tag Generator tool to create and preview your tags before adding them to your site.',
    faq5_q: 'Should I use the same meta tags on every page?',
    faq5_a: 'No. While structural meta tags like <code>charset</code>, <code>viewport</code>, and security tags should be consistent across all pages, content-specific tags like <code>title</code>, <code>description</code>, <code>og:title</code>, <code>og:description</code>, <code>og:image</code>, and <code>canonical</code> should be unique for every page. Using identical titles and descriptions across pages is a common SEO mistake that can cause search engines to treat your pages as duplicate content.',
    linkToolBottom: 'Try our Meta Tag Generator to create perfect meta tags →',
  },
  fr: {
    intro: 'Les balises meta sont l\'ossature invisible de chaque page web. Elles indiquent aux moteurs de recherche le sujet de votre page, contrôlent l\'affichage de votre contenu sur les réseaux sociaux et influencent le comportement du navigateur. Pourtant, de nombreux développeurs les ignorent ou les utilisent mal. Ce <strong>guide complet des balises meta HTML</strong> couvre toutes les balises meta dont votre site a besoin en 2026.',
    linkTool: 'Générez des balises meta parfaites avec notre outil gratuit →',
    h2_essential: 'Balises Meta Essentielles pour Chaque Page',
    essentialDesc: 'Ce sont les balises meta minimales que chaque page HTML devrait inclure. Sans elles, les navigateurs peuvent mal afficher votre page et les moteurs de recherche auront du mal à l\'indexer correctement.',
    h2_seo: 'Balises Meta SEO',
    seoDesc: 'Les balises meta pour le référencement aident Google, Bing et les autres moteurs de recherche à comprendre et indexer correctement votre contenu.',
    h2_og: 'Balises Meta Open Graph',
    ogDesc: 'Les balises Open Graph contrôlent l\'affichage de votre contenu lors du partage sur Facebook, LinkedIn, Discord, Slack et de nombreuses autres plateformes.',
    h2_twitter: 'Balises Meta Twitter Card',
    twitterDesc: 'Twitter (X) utilise son propre ensemble de balises meta pour les aperçus enrichis. Twitter peut se rabattre sur les balises Open Graph, mais les balises Twitter Card dédiées offrent plus de contrôle.',
    h2_security: 'Balises Meta de Sécurité',
    securityDesc: 'Les balises meta liées à la sécurité aident à protéger votre site et vos utilisateurs contre les vulnérabilités web courantes.',
    h2_perf: 'Balises Meta de Performance',
    perfDesc: 'Les balises meta de performance aident les navigateurs à charger votre page plus rapidement en fournissant des indices anticipés sur les ressources nécessaires.',
    h2_mobile: 'Balises Meta Mobile & Applications',
    mobileDesc: 'Ces balises meta contrôlent le comportement de votre site sur les appareils mobiles et lorsqu\'il est enregistré comme application.',
    h2_structured: 'Balises Meta pour Données Structurées',
    structuredDesc: 'Ces balises meta fournissent un contexte supplémentaire sur votre contenu, utile pour les données structurées et l\'attribution de contenu.',
    h2_mistakes: 'Erreurs Courantes à Éviter',
    mistakesList: '<ul><li><strong>Descriptions meta dupliquées</strong> — Chaque page doit avoir une description unique.</li><li><strong>Balise viewport manquante</strong> — Sans elle, votre site ne sera pas adapté aux mobiles.</li><li><strong>Utiliser les meta keywords</strong> — Google les ignore depuis 2009.</li><li><strong>Titre trop long</strong> — Gardez les titres sous 60 caractères.</li><li><strong>Description trop longue</strong> — Gardez entre 120–160 caractères.</li><li><strong>Image Open Graph manquante</strong> — Les partages sans image génèrent moins d\'engagement.</li><li><strong>Mauvaises dimensions d\'image</strong> — Utilisez 1200×630 px pour Open Graph.</li><li><strong>Oublier les URL canoniques</strong> — Sans elles, le contenu dupliqué peut diviser votre autorité SEO.</li><li><strong>Bloquer l\'indexation par accident</strong> — Vérifiez votre balise <code>robots</code>.</li><li><strong>Ne pas tester les aperçus sociaux</strong> — Testez toujours avec le débogueur de Facebook et le validateur Twitter.</li></ul>',
    h2_template: 'Modèle Complet de Balises Meta',
    templateDesc: 'Voici un modèle HTML head prêt pour la production. Copiez-le et remplacez les valeurs :',
    h2_faq: 'Questions Fréquentes',
    faq1_q: 'Quelle est la longueur optimale de la meta description ?',
    faq1_a: 'La longueur optimale est entre 120 et 160 caractères. Google affiche jusqu\'à 155–160 caractères sur desktop et environ 120 sur mobile.',
    faq2_q: 'Les meta keywords comptent-elles encore pour le SEO ?',
    faq2_a: 'Non, Google a confirmé en 2009 qu\'il n\'utilise pas les meta keywords comme facteur de classement. Concentrez-vous sur le contenu de qualité.',
    faq3_q: 'Quelle est la différence entre Open Graph et Twitter Cards ?',
    faq3_a: 'Open Graph a été créé par Facebook et est utilisé par la plupart des plateformes sociales. Les Twitter Cards sont le système propriétaire de Twitter. Twitter peut se rabattre sur les balises OG si les balises Twitter ne sont pas présentes.',
    faq4_q: 'Comment tester si mes balises meta fonctionnent ?',
    faq4_a: 'Utilisez le débogueur de partage Facebook, le validateur Twitter Card et le test de résultats enrichis de Google pour valider vos balises.',
    faq5_q: 'Dois-je utiliser les mêmes balises meta sur chaque page ?',
    faq5_a: 'Non. Les balises structurelles comme charset et viewport doivent être cohérentes, mais les balises de contenu comme title, description et og:image doivent être uniques par page.',
    linkToolBottom: 'Essayez notre générateur de balises meta →',
  },
  de: {
    intro: 'Meta-Tags sind das unsichtbare Rückgrat jeder Webseite. Sie teilen Suchmaschinen mit, worum es auf Ihrer Seite geht, steuern die Darstellung beim Teilen in sozialen Medien und beeinflussen das Browser-Verhalten. Dieser <strong>vollständige HTML-Meta-Tags-Leitfaden</strong> behandelt alle Meta-Tags, die Ihre Website 2026 benötigt.',
    linkTool: 'Generieren Sie perfekte Meta-Tags mit unserem kostenlosen Tool →',
    h2_essential: 'Essentielle Meta-Tags für Jede Seite',
    essentialDesc: 'Dies sind die absolut minimalen Meta-Tags, die jede HTML-Seite enthalten sollte.',
    h2_seo: 'SEO Meta-Tags',
    seoDesc: 'SEO-Meta-Tags helfen Google, Bing und anderen Suchmaschinen, Ihren Inhalt richtig zu verstehen und zu indexieren.',
    h2_og: 'Open Graph Meta-Tags',
    ogDesc: 'Open Graph Tags steuern die Darstellung Ihres Inhalts beim Teilen auf Facebook, LinkedIn, Discord und Slack.',
    h2_twitter: 'Twitter Card Meta-Tags',
    twitterDesc: 'Twitter (X) verwendet eigene Meta-Tags für Rich-Link-Vorschauen. Twitter kann auf Open Graph Tags zurückgreifen, aber dedizierte Twitter Card Tags geben mehr Kontrolle.',
    h2_security: 'Sicherheits-Meta-Tags',
    securityDesc: 'Sicherheitsbezogene Meta-Tags schützen Ihre Website und Benutzer vor häufigen Web-Schwachstellen.',
    h2_perf: 'Performance-Meta-Tags',
    perfDesc: 'Performance-Meta-Tags helfen Browsern, Ihre Seite schneller zu laden, indem sie frühe Hinweise auf benötigte Ressourcen geben.',
    h2_mobile: 'Mobile & App Meta-Tags',
    mobileDesc: 'Diese Meta-Tags steuern das Verhalten Ihrer Website auf Mobilgeräten.',
    h2_structured: 'Meta-Tags für Strukturierte Daten',
    structuredDesc: 'Diese Meta-Tags liefern zusätzlichen Kontext über Ihren Inhalt für strukturierte Daten und Autorenzuordnung.',
    h2_mistakes: 'Häufige Fehler Vermeiden',
    mistakesList: '<ul><li><strong>Doppelte Meta-Beschreibungen</strong> — Jede Seite braucht eine einzigartige Beschreibung.</li><li><strong>Fehlender Viewport-Tag</strong> — Ohne ihn ist Ihre Seite nicht mobilfreundlich.</li><li><strong>Meta-Keywords verwenden</strong> — Google ignoriert sie seit 2009.</li><li><strong>Titel zu lang</strong> — Halten Sie Titel unter 60 Zeichen.</li><li><strong>Beschreibung zu lang</strong> — Halten Sie 120–160 Zeichen ein.</li><li><strong>Fehlendes Open Graph Bild</strong> — Geteilte Links ohne Bild bekommen weniger Engagement.</li><li><strong>Falsche Bilddimensionen</strong> — Verwenden Sie 1200×630 px für Open Graph.</li><li><strong>Kanonische URLs vergessen</strong> — Ohne sie kann doppelter Inhalt Ihre SEO-Autorität aufteilen.</li><li><strong>Indexierung versehentlich blockieren</strong> — Überprüfen Sie Ihren <code>robots</code>-Tag.</li><li><strong>Social Previews nicht testen</strong> — Testen Sie immer mit Facebook Debugger und Twitter Validator.</li></ul>',
    h2_template: 'Vollständige Meta-Tag-Vorlage',
    templateDesc: 'Hier ist eine produktionsreife HTML-Head-Vorlage. Kopieren Sie sie und ersetzen Sie die Platzhalter:',
    h2_faq: 'Häufig Gestellte Fragen',
    faq1_q: 'Was ist die optimale Länge der Meta-Beschreibung?',
    faq1_a: 'Die optimale Länge liegt zwischen 120 und 160 Zeichen. Google zeigt bis zu 155–160 Zeichen auf dem Desktop und etwa 120 auf Mobilgeräten an.',
    faq2_q: 'Sind Meta-Keywords noch relevant für SEO?',
    faq2_a: 'Nein, Google hat 2009 bestätigt, dass Meta-Keywords kein Ranking-Faktor sind. Konzentrieren Sie sich auf qualitativ hochwertigen Inhalt.',
    faq3_q: 'Was ist der Unterschied zwischen Open Graph und Twitter Cards?',
    faq3_a: 'Open Graph wurde von Facebook erstellt und wird von den meisten sozialen Plattformen verwendet. Twitter Cards sind Twitters proprietäres System. Twitter greift auf OG-Tags zurück, wenn keine Twitter-Tags vorhanden sind.',
    faq4_q: 'Wie teste ich, ob meine Meta-Tags korrekt funktionieren?',
    faq4_a: 'Verwenden Sie den Facebook Sharing Debugger, den Twitter Card Validator und den Google Rich Results Test.',
    faq5_q: 'Sollte ich auf jeder Seite dieselben Meta-Tags verwenden?',
    faq5_a: 'Nein. Strukturelle Tags wie charset und viewport sollten konsistent sein, aber inhaltliche Tags wie title, description und og:image sollten pro Seite einzigartig sein.',
    linkToolBottom: 'Testen Sie unseren Meta-Tag-Generator →',
  },
  es: {
    intro: 'Las etiquetas meta son la columna vertebral invisible de cada página web. Indican a los motores de búsqueda de qué trata tu página, controlan cómo aparece tu contenido en redes sociales e influyen en el comportamiento del navegador. Esta <strong>guía completa de etiquetas meta HTML</strong> cubre todas las etiquetas que tu sitio web necesita en 2026.',
    linkTool: 'Genera etiquetas meta perfectas con nuestro generador gratuito →',
    h2_essential: 'Etiquetas Meta Esenciales para Cada Página',
    essentialDesc: 'Estas son las etiquetas meta mínimas que toda página HTML debe incluir.',
    h2_seo: 'Etiquetas Meta SEO',
    seoDesc: 'Las etiquetas meta SEO ayudan a Google, Bing y otros motores de búsqueda a comprender e indexar correctamente tu contenido.',
    h2_og: 'Etiquetas Meta Open Graph',
    ogDesc: 'Las etiquetas Open Graph controlan cómo aparece tu contenido al compartirlo en Facebook, LinkedIn, Discord y Slack.',
    h2_twitter: 'Etiquetas Meta Twitter Card',
    twitterDesc: 'Twitter (X) usa su propio conjunto de etiquetas meta para vistas previas enriquecidas.',
    h2_security: 'Etiquetas Meta de Seguridad',
    securityDesc: 'Las etiquetas meta de seguridad ayudan a proteger tu sitio y usuarios contra vulnerabilidades web comunes.',
    h2_perf: 'Etiquetas Meta de Rendimiento',
    perfDesc: 'Las etiquetas meta de rendimiento ayudan a los navegadores a cargar tu página más rápido proporcionando indicaciones tempranas sobre los recursos necesarios.',
    h2_mobile: 'Etiquetas Meta Móvil y Aplicaciones',
    mobileDesc: 'Estas etiquetas controlan cómo se comporta tu sitio en dispositivos móviles.',
    h2_structured: 'Etiquetas Meta para Datos Estructurados',
    structuredDesc: 'Estas etiquetas meta proporcionan contexto adicional sobre tu contenido para datos estructurados y atribución de autoría.',
    h2_mistakes: 'Errores Comunes a Evitar',
    mistakesList: '<ul><li><strong>Descripciones meta duplicadas</strong> — Cada página debe tener una descripción única.</li><li><strong>Etiqueta viewport faltante</strong> — Sin ella, tu sitio no será compatible con móviles.</li><li><strong>Usar meta keywords</strong> — Google las ignora desde 2009.</li><li><strong>Título demasiado largo</strong> — Mantén los títulos bajo 60 caracteres.</li><li><strong>Descripción demasiado larga</strong> — Mantén entre 120–160 caracteres.</li><li><strong>Imagen Open Graph faltante</strong> — Los enlaces compartidos sin imagen obtienen menos interacción.</li><li><strong>Dimensiones de imagen incorrectas</strong> — Usa 1200×630 px para Open Graph.</li><li><strong>Olvidar URLs canónicas</strong> — Sin ellas, el contenido duplicado divide tu autoridad SEO.</li><li><strong>Bloquear indexación accidentalmente</strong> — Verifica tu etiqueta <code>robots</code>.</li><li><strong>No probar vistas previas sociales</strong> — Siempre prueba con el depurador de Facebook y el validador de Twitter.</li></ul>',
    h2_template: 'Plantilla Completa de Etiquetas Meta',
    templateDesc: 'Aquí tienes una plantilla HTML head lista para producción. Cópiala y reemplaza los valores:',
    h2_faq: 'Preguntas Frecuentes',
    faq1_q: '¿Cuál es la longitud óptima de la meta description?',
    faq1_a: 'La longitud óptima es entre 120 y 160 caracteres. Google muestra hasta 155–160 caracteres en escritorio y alrededor de 120 en móvil.',
    faq2_q: '¿Las meta keywords todavía importan para el SEO?',
    faq2_a: 'No, Google confirmó en 2009 que no usa las meta keywords como factor de posicionamiento. Enfócate en contenido de calidad.',
    faq3_q: '¿Cuál es la diferencia entre Open Graph y Twitter Cards?',
    faq3_a: 'Open Graph fue creado por Facebook y es usado por la mayoría de plataformas sociales. Twitter Cards es el sistema propietario de Twitter. Twitter usa las etiquetas OG como respaldo si no hay etiquetas Twitter específicas.',
    faq4_q: '¿Cómo pruebo si mis etiquetas meta funcionan correctamente?',
    faq4_a: 'Usa el Depurador de Compartir de Facebook, el Validador de Twitter Card y la Prueba de Resultados Enriquecidos de Google.',
    faq5_q: '¿Debo usar las mismas etiquetas meta en cada página?',
    faq5_a: 'No. Las etiquetas estructurales como charset y viewport deben ser consistentes, pero las de contenido como title, description y og:image deben ser únicas por página.',
    linkToolBottom: 'Prueba nuestro Generador de Etiquetas Meta →',
  },
  zh: {
    intro: 'Meta 标签是每个网页的隐形骨架。它们告诉搜索引擎你的页面内容是什么，控制你的内容在社交媒体上的展示方式，并影响浏览器行为。然而许多开发者要么完全跳过它们，要么使用不当。这份<strong>完整的 HTML Meta 标签指南</strong>涵盖了你的网站在 2026 年需要的所有 meta 标签——从基础必备到高级 SEO、社交分享、安全和性能标签。',
    linkTool: '使用我们的免费 Meta 标签生成器即时生成完美的 meta 标签 →',
    h2_essential: '每个页面都需要的基础 Meta 标签',
    essentialDesc: '这些是每个 HTML 页面都应包含的最基本的 meta 标签。没有它们，浏览器可能无法正确渲染页面，搜索引擎也难以正确索引。',
    h2_seo: 'SEO Meta 标签',
    seoDesc: 'SEO meta 标签帮助 Google、Bing 和其他搜索引擎理解并正确索引你的内容。这些标签直接影响你的搜索排名和页面在搜索结果中的显示方式。',
    h2_og: 'Open Graph Meta 标签',
    ogDesc: 'Open Graph 标签控制你的内容在 Facebook、LinkedIn、Discord、Slack 等平台上分享时的显示方式。没有正确的 OG 标签，这些平台会尝试猜测你的内容——效果通常很差。',
    h2_twitter: 'Twitter Card Meta 标签',
    twitterDesc: 'Twitter（X）使用自己的一套 meta 标签来实现富链接预览。虽然 Twitter 可以回退到 Open Graph 标签，但使用专用的 Twitter Card 标签可以更好地控制内容在推文中的展示。',
    h2_security: '安全 Meta 标签',
    securityDesc: '安全相关的 meta 标签帮助保护你的网站和用户免受常见的 Web 安全漏洞。虽然许多安全策略最好通过 HTTP 头部设置，但 meta 标签提供了后备方案。',
    h2_perf: '性能 Meta 标签',
    perfDesc: '性能 meta 标签和链接提示帮助浏览器更快地加载你的页面，通过提供关于所需资源的早期提示。',
    h2_mobile: '移动端和应用 Meta 标签',
    mobileDesc: '这些 meta 标签控制你的网站在移动设备上的行为，以及保存为主屏幕应用时的表现。',
    h2_structured: '结构化数据和作者信息 Meta 标签',
    structuredDesc: '这些 meta 标签提供关于内容的额外上下文，对结构化数据和内容归属很有用。',
    h2_mistakes: '常见的 Meta 标签错误',
    mistakesList: '<ul><li><strong>重复的 meta 描述</strong>——每个页面都应有独特的 meta 描述。重复的描述会混淆搜索引擎并降低点击率。</li><li><strong>缺少 viewport 标签</strong>——没有 viewport meta 标签，你的网站不会对移动端友好，影响移动搜索排名。</li><li><strong>使用 meta keywords</strong>——Google 自 2009 年起就忽略了 meta keywords 标签，不要在上面浪费时间。</li><li><strong>标题太长</strong>——标题保持在 60 个字符以内，超出的部分会在搜索结果中被截断。</li><li><strong>描述太长</strong>——描述保持在 120–160 个字符之间。</li><li><strong>缺少 Open Graph 图片</strong>——没有图片的社交分享互动率明显更低，务必包含 <code>og:image</code>。</li><li><strong>图片尺寸错误</strong>——Open Graph 图片使用 1200×630 像素，Twitter 卡片使用 1200×600。</li><li><strong>忘记 canonical URL</strong>——没有 canonical 标签，重复内容会分散你的 SEO 权重。</li><li><strong>意外阻止索引</strong>——仔细检查 <code>robots</code> meta 标签，一个误放的 <code>noindex</code> 可能完全从搜索结果中移除你的页面。</li><li><strong>不测试社交预览</strong>——发布前务必使用 Facebook 分享调试器和 Twitter 卡片验证器测试。</li></ul>',
    h2_template: '完整的 Meta 标签模板',
    templateDesc: '以下是一个可用于生产环境的 HTML head 模板，包含所有必要的 meta 标签。复制到你的项目中并替换占位符值：',
    h2_faq: '常见问题',
    faq1_q: 'meta description 的最佳长度是多少？',
    faq1_a: '最佳长度在 120 到 160 个字符之间。Google 在桌面端通常显示最多 155–160 个字符，移动端约 120 个字符。将最重要的信息放在前 120 个字符内。',
    faq2_q: 'meta keywords 对 SEO 还有用吗？',
    faq2_a: '没有，Google 在 2009 年正式确认不使用 meta keywords 标签作为排名因素。将 SEO 精力集中在优质内容、title 标签、meta 描述和结构化数据上。',
    faq3_q: 'Open Graph 和 Twitter Cards 有什么区别？',
    faq3_a: 'Open Graph（OG）标签由 Facebook 创建，被大多数社交平台使用。Twitter Cards 是 Twitter 的专有系统。如果没有 Twitter 专用标签，Twitter 会回退到 OG 标签，但同时设置两者可以最大程度控制内容在各平台的展示。',
    faq4_q: '如何测试我的 meta 标签是否正确？',
    faq4_a: '使用 Facebook 分享调试器、Twitter 卡片验证器和 Google 富媒体结果测试来验证你的标签。也可以使用我们的 Meta 标签生成器工具在添加到网站之前预览。',
    faq5_q: '每个页面都应该使用相同的 meta 标签吗？',
    faq5_a: '不应该。charset、viewport 和安全标签等结构性标签应在所有页面保持一致，但 title、description、og:title、og:image 和 canonical 等内容标签应该每个页面都不同。',
    linkToolBottom: '试用我们的 Meta 标签生成器 →',
  },
  ja: {
    intro: 'メタタグはすべてのウェブページの見えない骨格です。検索エンジンにページの内容を伝え、SNSでのコンテンツ表示を制御し、ブラウザの動作に影響を与えます。この<strong>完全なHTML メタタグガイド</strong>は、2026年にあなたのウェブサイトに必要なすべてのメタタグをカバーします。',
    linkTool: '無料のメタタグジェネレーターで完璧なメタタグを生成 →',
    h2_essential: 'すべてのページに必要な基本メタタグ',
    essentialDesc: 'これらはすべてのHTMLページに含めるべき最低限のメタタグです。',
    h2_seo: 'SEOメタタグ',
    seoDesc: 'SEOメタタグは、Google、Bingなどの検索エンジンがコンテンツを理解し、適切にインデックスするのに役立ちます。',
    h2_og: 'Open Graphメタタグ',
    ogDesc: 'Open GraphタグはFacebook、LinkedIn、Discord、Slackなどでコンテンツが共有された際の表示を制御します。',
    h2_twitter: 'Twitter Cardメタタグ',
    twitterDesc: 'Twitter（X）はリッチリンクプレビュー用の独自のメタタグを使用します。',
    h2_security: 'セキュリティメタタグ',
    securityDesc: 'セキュリティ関連のメタタグは、一般的なWeb脆弱性からサイトとユーザーを保護します。',
    h2_perf: 'パフォーマンスメタタグ',
    perfDesc: 'パフォーマンスメタタグは、必要なリソースに関する早期ヒントを提供し、ブラウザがページをより速く読み込むのに役立ちます。',
    h2_mobile: 'モバイル＆アプリメタタグ',
    mobileDesc: 'これらのメタタグは、モバイルデバイスでのサイトの動作を制御します。',
    h2_structured: '構造化データ用メタタグ',
    structuredDesc: 'これらのメタタグは、構造化データとコンテンツの帰属に役立つ追加のコンテキストを提供します。',
    h2_mistakes: '避けるべき一般的な間違い',
    mistakesList: '<ul><li><strong>重複するメタディスクリプション</strong>——各ページにユニークな説明が必要です。</li><li><strong>viewportタグの欠如</strong>——これがないとモバイルフレンドリーになりません。</li><li><strong>meta keywordsの使用</strong>——Googleは2009年から無視しています。</li><li><strong>タイトルが長すぎる</strong>——60文字以内に保ちましょう。</li><li><strong>説明が長すぎる</strong>——120〜160文字に保ちましょう。</li><li><strong>Open Graph画像の欠如</strong>——画像なしの共有はエンゲージメントが低下します。</li><li><strong>画像サイズの間違い</strong>——Open Graphには1200×630pxを使用。</li><li><strong>canonical URLの忘れ</strong>——これがないと重複コンテンツがSEO権威を分散させます。</li><li><strong>誤ってインデックスをブロック</strong>——<code>robots</code>タグを再確認してください。</li><li><strong>ソーシャルプレビューのテスト忘れ</strong>——Facebook デバッガーとTwitterバリデーターで必ずテストしてください。</li></ul>',
    h2_template: '完全なメタタグテンプレート',
    templateDesc: '以下は本番環境で使えるHTMLヘッドテンプレートです。コピーしてプレースホルダーを置き換えてください：',
    h2_faq: 'よくある質問',
    faq1_q: 'メタディスクリプションの最適な長さは？',
    faq1_a: '最適な長さは120〜160文字です。Googleはデスクトップで最大155〜160文字、モバイルで約120文字を表示します。',
    faq2_q: 'meta keywordsはまだSEOに重要ですか？',
    faq2_a: 'いいえ。Googleは2009年にmeta keywordsをランキング要因として使用しないことを公式に確認しました。',
    faq3_q: 'Open GraphとTwitter Cardsの違いは？',
    faq3_a: 'Open GraphはFacebookが作成し、ほとんどのSNSで使用されます。Twitter CardsはTwitter独自のシステムです。Twitter固有のタグがない場合、OGタグにフォールバックします。',
    faq4_q: 'メタタグが正しく機能しているか確認するには？',
    faq4_a: 'Facebook共有デバッガー、Twitter Cardバリデーター、Googleリッチリザルトテストを使用してください。',
    faq5_q: 'すべてのページで同じメタタグを使うべきですか？',
    faq5_a: 'いいえ。charsetやviewportなどの構造タグは一貫させますが、title、description、og:imageなどのコンテンツタグはページごとにユニークにすべきです。',
    linkToolBottom: 'メタタグジェネレーターを試す →',
  },
  ko: {
    intro: '메타 태그는 모든 웹 페이지의 보이지 않는 뼈대입니다. 검색 엔진에 페이지 내용을 알려주고, 소셜 미디어에서 콘텐츠가 표시되는 방식을 제어하며, 브라우저 동작에 영향을 줍니다. 이 <strong>완벽한 HTML 메타 태그 가이드</strong>는 2026년 웹사이트에 필요한 모든 메타 태그를 다룹니다.',
    linkTool: '무료 메타 태그 생성기로 완벽한 메타 태그를 즉시 생성하세요 →',
    h2_essential: '모든 페이지에 필요한 필수 메타 태그',
    essentialDesc: '모든 HTML 페이지에 포함해야 할 최소한의 메타 태그입니다.',
    h2_seo: 'SEO 메타 태그',
    seoDesc: 'SEO 메타 태그는 Google, Bing 등의 검색 엔진이 콘텐츠를 이해하고 올바르게 색인하는 데 도움을 줍니다.',
    h2_og: 'Open Graph 메타 태그',
    ogDesc: 'Open Graph 태그는 Facebook, LinkedIn, Discord, Slack 등에서 콘텐츠가 공유될 때의 표시를 제어합니다.',
    h2_twitter: 'Twitter Card 메타 태그',
    twitterDesc: 'Twitter(X)는 리치 링크 미리보기를 위한 자체 메타 태그를 사용합니다.',
    h2_security: '보안 메타 태그',
    securityDesc: '보안 관련 메타 태그는 일반적인 웹 취약점으로부터 사이트와 사용자를 보호합니다.',
    h2_perf: '성능 메타 태그',
    perfDesc: '성능 메타 태그는 필요한 리소스에 대한 조기 힌트를 제공하여 브라우저가 페이지를 더 빨리 로드하도록 돕습니다.',
    h2_mobile: '모바일 및 앱 메타 태그',
    mobileDesc: '이 메타 태그는 모바일 기기에서의 웹사이트 동작을 제어합니다.',
    h2_structured: '구조화된 데이터용 메타 태그',
    structuredDesc: '이 메타 태그는 구조화된 데이터와 콘텐츠 귀속에 유용한 추가 컨텍스트를 제공합니다.',
    h2_mistakes: '피해야 할 일반적인 실수',
    mistakesList: '<ul><li><strong>중복된 메타 설명</strong> — 각 페이지마다 고유한 설명이 필요합니다.</li><li><strong>viewport 태그 누락</strong> — 이것이 없으면 모바일 친화적이지 않습니다.</li><li><strong>meta keywords 사용</strong> — Google은 2009년부터 무시합니다.</li><li><strong>제목이 너무 긴 경우</strong> — 60자 이내로 유지하세요.</li><li><strong>설명이 너무 긴 경우</strong> — 120~160자로 유지하세요.</li><li><strong>Open Graph 이미지 누락</strong> — 이미지 없는 공유는 참여도가 낮습니다.</li><li><strong>잘못된 이미지 크기</strong> — Open Graph에는 1200×630px를 사용하세요.</li><li><strong>canonical URL 누락</strong> — 이것이 없으면 중복 콘텐츠가 SEO 권한을 분산시킵니다.</li><li><strong>실수로 색인 차단</strong> — <code>robots</code> 태그를 다시 확인하세요.</li><li><strong>소셜 미리보기 테스트 안 함</strong> — Facebook 디버거와 Twitter 검증기로 반드시 테스트하세요.</li></ul>',
    h2_template: '완전한 메타 태그 템플릿',
    templateDesc: '다음은 프로덕션에서 사용할 수 있는 HTML head 템플릿입니다. 복사하여 플레이스홀더를 교체하세요:',
    h2_faq: '자주 묻는 질문',
    faq1_q: '메타 설명의 최적 길이는?',
    faq1_a: '최적 길이는 120~160자입니다. Google은 데스크톱에서 최대 155~160자, 모바일에서 약 120자를 표시합니다.',
    faq2_q: 'meta keywords가 아직 SEO에 중요한가요?',
    faq2_a: '아닙니다. Google은 2009년에 meta keywords를 순위 요소로 사용하지 않는다고 공식 확인했습니다.',
    faq3_q: 'Open Graph와 Twitter Cards의 차이는?',
    faq3_a: 'Open Graph는 Facebook이 만들었고 대부분의 소셜 플랫폼에서 사용됩니다. Twitter Cards는 Twitter의 독자적인 시스템입니다. Twitter 전용 태그가 없으면 OG 태그로 대체됩니다.',
    faq4_q: '메타 태그가 올바르게 작동하는지 어떻게 테스트하나요?',
    faq4_a: 'Facebook 공유 디버거, Twitter Card 검증기, Google 리치 결과 테스트를 사용하세요.',
    faq5_q: '모든 페이지에 같은 메타 태그를 사용해야 하나요?',
    faq5_a: '아닙니다. charset과 viewport 같은 구조 태그는 일관되게 유지하되, title, description, og:image 같은 콘텐츠 태그는 페이지마다 고유해야 합니다.',
    linkToolBottom: '메타 태그 생성기를 사용해 보세요 →',
  },
};

export default function MetaTagsGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
      { '@type': 'Question', name: s.faq4_q, acceptedAnswer: { '@type': 'Answer', text: s.faq4_a } },
      { '@type': 'Question', name: s.faq5_q, acceptedAnswer: { '@type': 'Answer', text: s.faq5_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <p>
        <Link href={`/${lang}/tools/meta-tag-generator`} style={{ fontWeight: 600 }}>
          {s.linkTool}
        </Link>
      </p>

      {/* ── Essential Meta Tags ── */}
      <h2>{s.h2_essential}</h2>
      <p>{s.essentialDesc}</p>

      <h3>charset</h3>
      <p>The <code>charset</code> meta tag declares the character encoding for the HTML document. UTF-8 is the universal standard that supports all languages and special characters.</p>
      <pre><code>{`<meta charset="UTF-8">`}</code></pre>
      <p>Always place this tag as the <strong>first element</strong> inside <code>&lt;head&gt;</code>. If the browser encounters content before knowing the encoding, it may re-parse the entire page, causing a flash of garbled text.</p>

      <h3>viewport</h3>
      <p>The viewport meta tag is essential for responsive design. It tells mobile browsers how to scale and size the page.</p>
      <pre><code>{`<meta name="viewport" content="width=device-width, initial-scale=1">`}</code></pre>
      <p>Without this tag, mobile browsers render the page at a desktop width (typically 980px) and then shrink it to fit the screen. This makes text unreadable and buttons untappable. Google uses mobile-first indexing, so a missing viewport tag directly hurts your search rankings.</p>

      <h3>title</h3>
      <p>While technically not a meta tag, the <code>&lt;title&gt;</code> element is the single most important tag for SEO. It appears in browser tabs, search results, and social shares.</p>
      <pre><code>{`<title>Your Page Title — Brand Name</title>`}</code></pre>
      <p>Best practices for title tags:</p>
      <ul>
        <li>Keep it under <strong>60 characters</strong> to avoid truncation in search results</li>
        <li>Put the primary keyword near the beginning</li>
        <li>Make each page title unique across your entire site</li>
        <li>Use a separator (—, |, or :) between the page title and brand name</li>
      </ul>

      <h3>description</h3>
      <p>The meta description provides a summary of the page content. Search engines display it below the title in search results.</p>
      <pre><code>{`<meta name="description" content="A concise, compelling summary of your page content. Include your target keyword naturally. Keep between 120-160 characters.">`}</code></pre>
      <p>A well-written meta description can significantly improve your click-through rate (CTR) from search results, even though Google has confirmed it is not a direct ranking factor. Think of it as your page&apos;s advertisement in the search results.</p>

      {/* ── SEO Meta Tags ── */}
      <h2>{s.h2_seo}</h2>
      <p>{s.seoDesc}</p>

      <h3>robots</h3>
      <p>The robots meta tag controls how search engines crawl and index your page. It is one of the most powerful — and most dangerous — meta tags if misconfigured.</p>
      <pre><code>{`<!-- Allow indexing and following (default behavior) -->
<meta name="robots" content="index, follow">

<!-- Block indexing but allow link following -->
<meta name="robots" content="noindex, follow">

<!-- Block everything -->
<meta name="robots" content="noindex, nofollow">

<!-- Prevent caching of the page -->
<meta name="robots" content="noarchive">

<!-- Prevent snippet in search results -->
<meta name="robots" content="nosnippet">

<!-- Specific to Google -->
<meta name="googlebot" content="index, follow">`}</code></pre>
      <p>Common <code>robots</code> directives include: <code>index</code> / <code>noindex</code> (whether to include in search results), <code>follow</code> / <code>nofollow</code> (whether to follow links on the page), <code>noarchive</code> (prevent cached copies), <code>nosnippet</code> (prevent text snippets), and <code>max-snippet:[number]</code> (limit snippet length).</p>

      <h3>canonical</h3>
      <p>The canonical link element tells search engines which URL is the &quot;master&quot; version of a page. This is critical for avoiding duplicate content penalties.</p>
      <pre><code>{`<link rel="canonical" href="https://example.com/blog/meta-tags-guide">`}</code></pre>
      <p>Use canonical tags when: the same content is accessible via multiple URLs (with/without trailing slash, with/without www, HTTP vs HTTPS), you have paginated content, or URL parameters create duplicate pages (e.g., <code>?sort=price</code>).</p>

      <h3>hreflang</h3>
      <p>If your site serves content in multiple languages or targets different regions, <code>hreflang</code> tags tell search engines which version to show to which audience.</p>
      <pre><code>{`<link rel="alternate" hreflang="en" href="https://example.com/en/page">
<link rel="alternate" hreflang="fr" href="https://example.com/fr/page">
<link rel="alternate" hreflang="de" href="https://example.com/de/page">
<link rel="alternate" hreflang="x-default" href="https://example.com/en/page">`}</code></pre>
      <p>The <code>x-default</code> value specifies the fallback URL for users whose language is not explicitly listed. Always include it as a best practice.</p>

      {/* ── Open Graph ── */}
      <h2>{s.h2_og}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.ogDesc }} />

      <pre><code>{`<!-- Required Open Graph Tags -->
<meta property="og:title" content="Meta Tags Every Website Needs">
<meta property="og:description" content="A complete guide to HTML meta tags for SEO, social sharing, security, and performance.">
<meta property="og:image" content="https://example.com/images/meta-tags-guide.jpg">
<meta property="og:url" content="https://example.com/blog/meta-tags-guide">
<meta property="og:type" content="article">

<!-- Recommended Open Graph Tags -->
<meta property="og:site_name" content="DevToolBox">
<meta property="og:locale" content="en_US">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Meta tags guide cover image">`}</code></pre>

      <p>Key points about Open Graph tags:</p>
      <ul>
        <li><code>og:image</code> should be at least <strong>1200 x 630 pixels</strong> for high-resolution displays</li>
        <li>Use an absolute URL for <code>og:image</code>, not a relative path</li>
        <li><code>og:type</code> should be <code>website</code> for homepages and <code>article</code> for blog posts</li>
        <li><code>og:url</code> should match your canonical URL</li>
        <li>Facebook caches Open Graph data aggressively — use the <strong>Sharing Debugger</strong> to refresh it after changes</li>
      </ul>

      {/* ── Twitter Cards ── */}
      <h2>{s.h2_twitter}</h2>
      <p>{s.twitterDesc}</p>

      <pre><code>{`<!-- Twitter Card Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Meta Tags Every Website Needs">
<meta name="twitter:description" content="A complete guide to HTML meta tags for SEO, social sharing, and performance.">
<meta name="twitter:image" content="https://example.com/images/meta-tags-guide.jpg">
<meta name="twitter:site" content="@yourtwitterhandle">
<meta name="twitter:creator" content="@authorhandle">`}</code></pre>

      <p>Twitter Card types:</p>
      <ul>
        <li><code>summary</code> — Small square image with title and description (default)</li>
        <li><code>summary_large_image</code> — Large rectangular image above the title (recommended for articles)</li>
        <li><code>player</code> — For video or audio content with an inline player</li>
        <li><code>app</code> — For mobile app deep links with install buttons</li>
      </ul>
      <p>For most websites, <code>summary_large_image</code> is the best choice as it provides the most visual impact in the Twitter timeline. The recommended image size is <strong>1200 x 600 pixels</strong> with a 2:1 aspect ratio.</p>

      {/* ── Security ── */}
      <h2>{s.h2_security}</h2>
      <p>{s.securityDesc}</p>

      <pre><code>{`<!-- Content Security Policy -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' https://cdn.example.com; style-src 'self' 'unsafe-inline'">

<!-- Prevent clickjacking (X-Frame-Options equivalent) -->
<meta http-equiv="X-Frame-Options" content="DENY">

<!-- Control referrer information -->
<meta name="referrer" content="strict-origin-when-cross-origin">

<!-- Prevent MIME type sniffing -->
<meta http-equiv="X-Content-Type-Options" content="nosniff">

<!-- Prevent DNS prefetching (privacy) -->
<meta http-equiv="x-dns-prefetch-control" content="off">`}</code></pre>

      <p>Important notes about security meta tags:</p>
      <ul>
        <li><strong>Content-Security-Policy (CSP)</strong> — Prevents XSS attacks by restricting where resources can be loaded from. While HTTP headers are preferred, the meta tag version works for static sites without server control.</li>
        <li><strong>referrer</strong> — The <code>strict-origin-when-cross-origin</code> value is the best balance between privacy and functionality. It sends the full URL for same-origin requests but only the origin for cross-origin requests.</li>
        <li><strong>X-Frame-Options</strong> — Prevents your page from being embedded in iframes on other sites (clickjacking protection). Use <code>DENY</code> to block all framing or <code>SAMEORIGIN</code> to allow same-domain framing only.</li>
      </ul>

      {/* ── Performance ── */}
      <h2>{s.h2_perf}</h2>
      <p>{s.perfDesc}</p>

      <pre><code>{`<!-- DNS Prefetch: resolve DNS for external domains early -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//cdn.example.com">

<!-- Preconnect: establish full connection (DNS + TCP + TLS) -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdn.example.com">

<!-- Preload: fetch critical resources immediately -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/css/critical.css" as="style">
<link rel="preload" href="/images/hero.webp" as="image">

<!-- Prefetch: fetch resources for likely next navigation -->
<link rel="prefetch" href="/next-page.html">

<!-- Module preload for ES modules -->
<link rel="modulepreload" href="/js/app.js">`}</code></pre>

      <p>Performance hint priority guide:</p>
      <ul>
        <li><strong>dns-prefetch</strong> — Cheapest hint. Use for any third-party domain you will reference. Saves 20–120ms per domain.</li>
        <li><strong>preconnect</strong> — More expensive but faster. Use for critical third-party resources (fonts, CDN). Limit to 2–4 domains to avoid connection contention.</li>
        <li><strong>preload</strong> — Forces immediate download. Use sparingly for above-the-fold critical resources (hero image, critical CSS, web fonts). Overuse can actually hurt performance by competing for bandwidth.</li>
        <li><strong>prefetch</strong> — Low-priority download during idle time. Use for resources needed on the next likely page navigation.</li>
      </ul>

      {/* ── Mobile & App ── */}
      <h2>{s.h2_mobile}</h2>
      <p>{s.mobileDesc}</p>

      <pre><code>{`<!-- Theme color for browser chrome (address bar, task switcher) -->
<meta name="theme-color" content="#1a1a2e">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)">

<!-- Apple iOS Web App -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="MyApp">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">

<!-- Microsoft Tiles -->
<meta name="msapplication-TileColor" content="#1a1a2e">
<meta name="msapplication-config" content="/browserconfig.xml">

<!-- Disable auto-detection (prevent phone numbers from becoming links) -->
<meta name="format-detection" content="telephone=no">`}</code></pre>

      <p>The <code>theme-color</code> meta tag is particularly impactful on mobile. It colors the browser&apos;s address bar and UI elements to match your brand. With the <code>media</code> attribute, you can set different colors for light and dark mode, creating a polished native-app feel.</p>

      {/* ── Structured Data & Authorship ── */}
      <h2>{s.h2_structured}</h2>
      <p>{s.structuredDesc}</p>

      <pre><code>{`<!-- Author information -->
<meta name="author" content="John Doe">
<link rel="author" href="https://example.com/about/john-doe">

<!-- Article metadata (for blog posts) -->
<meta property="article:published_time" content="2026-02-10T08:00:00Z">
<meta property="article:modified_time" content="2026-02-10T12:00:00Z">
<meta property="article:author" content="https://example.com/about/john-doe">
<meta property="article:section" content="Web Development">
<meta property="article:tag" content="meta tags">
<meta property="article:tag" content="SEO">
<meta property="article:tag" content="HTML">

<!-- Generator (if using a CMS or framework) -->
<meta name="generator" content="Next.js 16">`}</code></pre>

      <p>The <code>article:published_time</code> and <code>article:modified_time</code> tags use the ISO 8601 date format. Search engines use these dates to display &quot;Published on&quot; and &quot;Updated on&quot; labels in search results, which can improve click-through rates for fresh content.</p>

      {/* ── Common Mistakes ── */}
      <h2>{s.h2_mistakes}</h2>
      <div dangerouslySetInnerHTML={{ __html: s.mistakesList }} />

      {/* ── Complete Template ── */}
      <h2>{s.h2_template}</h2>
      <p>{s.templateDesc}</p>

      <pre><code>{`<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Essential -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page Title — Brand Name</title>
  <meta name="description" content="A compelling description of this page (120-160 characters).">

  <!-- SEO -->
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://example.com/current-page">
  <link rel="alternate" hreflang="en" href="https://example.com/en/current-page">
  <link rel="alternate" hreflang="fr" href="https://example.com/fr/current-page">
  <link rel="alternate" hreflang="x-default" href="https://example.com/en/current-page">

  <!-- Open Graph -->
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="A compelling description of this page.">
  <meta property="og:image" content="https://example.com/images/page-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Description of the image">
  <meta property="og:url" content="https://example.com/current-page">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Brand Name">
  <meta property="og:locale" content="en_US">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Page Title">
  <meta name="twitter:description" content="A compelling description of this page.">
  <meta name="twitter:image" content="https://example.com/images/page-image.jpg">
  <meta name="twitter:site" content="@brandhandle">

  <!-- Security -->
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta name="referrer" content="strict-origin-when-cross-origin">

  <!-- Performance -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Mobile & App -->
  <meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)">
  <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">

  <!-- Structured Data -->
  <meta name="author" content="Author Name">
  <meta property="article:published_time" content="2026-01-15T08:00:00Z">

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
</head>
<body>
  <!-- Your content here -->
</body>
</html>`}</code></pre>

      {/* ── FAQ ── */}
      <h2>{s.h2_faq}</h2>

      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />

      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />

      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />

      <h3>{s.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq4_a }} />

      <h3>{s.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq5_a }} />

      <p>
        <Link href={`/${lang}/tools/meta-tag-generator`} style={{ fontWeight: 600 }}>
          {s.linkToolBottom}
        </Link>
      </p>
    </>
  );
}
