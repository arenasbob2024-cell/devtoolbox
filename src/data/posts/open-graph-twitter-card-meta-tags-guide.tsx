'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Open Graph & Twitter Card Meta Tags: Complete Developer Reference',
    intro: 'When you share a link on Facebook, Twitter, LinkedIn, Discord, or Slack, the rich preview card that appears is powered by <strong>Open Graph (OG) meta tags</strong> and <strong>Twitter Card tags</strong>. Getting these right means more clicks, more engagement, and a more professional appearance. Getting them wrong means broken previews, missing images, and lost traffic. This complete reference covers every tag, every platform requirement, and every common mistake — with copy-paste code for all major frameworks.',
    linkTool: 'Generate perfect meta tags instantly with our free Meta Tag Generator →',

    h2_og_essential: 'Essential Open Graph Tags',
    ogEssentialDesc: 'Open Graph protocol was created by Facebook in 2010 and has since been adopted by nearly every social platform. These four tags are the absolute minimum for any page:',
    ogTitleLabel: 'og:title',
    ogTitleDesc: 'The title of your page as it should appear in the social share card. Keep it under 60 characters for best display. This can differ from your HTML <code>&lt;title&gt;</code> tag — use it to craft a more compelling social headline.',
    ogDescLabel: 'og:description',
    ogDescDesc: 'A brief summary of the page content shown below the title in the preview card. Aim for 120-160 characters. This is your chance to hook the reader into clicking.',
    ogImageLabel: 'og:image',
    ogImageDesc: 'The image displayed in the social share card. This is the single most impactful tag — posts with images get 2-3x more engagement. Must be an absolute URL (not relative).',
    ogUrlLabel: 'og:url',
    ogUrlDesc: 'The canonical URL of the page. This tells platforms which URL to associate with the shared content, preventing duplicate shares of the same content from different URLs.',
    ogTypeLabel: 'og:type',
    ogTypeDesc: 'The type of content. Common values: <code>website</code> (default), <code>article</code> (blog posts), <code>product</code>, <code>video.movie</code>, <code>music.song</code>, <code>profile</code>.',

    h3_og_additional: 'Additional Open Graph Tags',
    ogAdditionalDesc: 'Beyond the basics, these tags give you finer control over how your content appears:',

    h2_twitter: 'Twitter Card Tags',
    twitterDesc: 'Twitter (now X) supports its own card system with four card types. Twitter will fall back to Open Graph tags if Twitter-specific tags are missing, but dedicated tags give you full control.',
    twitterCardTypes: 'Twitter Card Types',
    cardType: 'Card Type',
    cardDesc: 'Description',
    cardUseCase: 'Use Case',
    summaryCard: 'summary',
    summaryCardDesc: 'Small square image with title and description',
    summaryCardUse: 'Blog posts, articles, general pages',
    largeCard: 'summary_large_image',
    largeCardDesc: 'Large prominent image above title and description',
    largeCardUse: 'Visual content, featured articles, landing pages',
    playerCard: 'player',
    playerCardDesc: 'Inline video/audio player embedded in the tweet',
    playerCardUse: 'Video hosting, podcasts, music platforms',
    appCard: 'app',
    appCardDesc: 'Direct download card for mobile applications',
    appCardUse: 'App Store / Google Play promotion',

    h2_image_req: 'Image Requirements by Platform',
    imageReqDesc: 'Every platform has different image size requirements. Using the wrong dimensions results in cropped, stretched, or missing images. Here is the definitive reference:',
    platform: 'Platform',
    recSize: 'Recommended Size',
    minSize: 'Minimum Size',
    maxFileSize: 'Max File Size',
    aspectRatio: 'Aspect Ratio',
    formats: 'Formats',

    h2_complete_markup: 'Complete HTML Markup Example',
    completeMarkupDesc: 'Here is a production-ready HTML head with every Open Graph and Twitter Card tag you need. Copy this and replace the placeholder values:',

    h2_framework: 'Framework-Specific Examples',
    frameworkDesc: 'Modern frameworks provide built-in APIs for managing meta tags. Here is how to implement OG and Twitter Card tags in the most popular frameworks:',
    h3_nextjs: 'Next.js (App Router — Metadata API)',
    h3_nuxt: 'Nuxt 3 (useSeoMeta)',
    h3_static: 'Static HTML / Vanilla',

    h2_mistakes: 'Common Mistakes & How to Fix Them',
    mistakesDesc: 'These are the most frequent issues developers encounter with social meta tags. Each one can break your share previews:',
    mistake: 'Mistake',
    problem: 'Problem',
    solution: 'Solution',

    h2_testing: 'Testing & Debugging Tools',
    testingDesc: 'Always validate your meta tags before publishing. Each platform caches previews aggressively, so fixing tags after sharing means waiting for cache expiration or manually clearing it.',
    tool: 'Tool',
    toolPlatform: 'Platform',
    toolUrl: 'URL',
    toolNotes: 'Notes',

    h2_dynamic: 'Dynamic OG Images',
    dynamicDesc: 'Generating unique social images per page dramatically increases click-through rates. Instead of one generic image for your entire site, each page gets a custom card showing its title, description, or data.',
    h3_dynamic_why: 'Why Dynamic OG Images Matter',
    dynamicWhyDesc: 'Sites like GitHub, Vercel, and DEV.to generate per-page OG images. The result: their links stand out in social feeds because every share looks unique and professional.',
    h3_dynamic_vercel: 'Generating with @vercel/og',
    h3_dynamic_canvas: 'Generating with Node Canvas',
    h3_dynamic_cloudinary: 'Using Cloudinary URL Transforms',

    h2_faq: 'Frequently Asked Questions',
    faq1q: 'What is the difference between Open Graph and Twitter Card tags?',
    faq1a: 'Open Graph (OG) was created by Facebook and is now the universal standard used by Facebook, LinkedIn, Discord, Slack, WhatsApp, Telegram, and most other platforms. Twitter Cards are Twitter/X\'s proprietary system. The key difference: Twitter Card tags use the <code>twitter:</code> prefix while OG tags use the <code>og:</code> prefix. Twitter will fall back to OG tags if Twitter-specific tags are absent, but having both ensures optimal display on all platforms.',
    faq2q: 'Do I need both Open Graph and Twitter Card tags?',
    faq2a: 'Technically, no — Twitter will read OG tags as a fallback. However, including both is best practice because: (1) <code>twitter:card</code> has no OG equivalent and is required for Twitter to display a card at all, (2) you may want different titles or descriptions optimized for each platform, and (3) some Twitter card types (player, app) have no OG equivalent.',
    faq3q: 'Why is my OG image not showing when I share my link?',
    faq3a: 'The most common causes are: (1) Using a relative URL instead of an absolute URL — <code>og:image</code> must start with <code>https://</code>, (2) The image URL returns a 404 or redirect, (3) The image file is too large (Facebook limits to 8MB), (4) The platform has cached an old version — use the platform\'s debug tool to clear the cache, (5) Missing <code>og:image:width</code> and <code>og:image:height</code> tags which some platforms require for first-time fetches.',
    faq4q: 'What is the ideal OG image size?',
    faq4a: 'The recommended size is <strong>1200 x 630 pixels</strong> with a 1.91:1 aspect ratio. This works well across Facebook, LinkedIn, Discord, and most platforms. For Twitter\'s <code>summary_large_image</code>, use 1200 x 675 (16:9). If you can only create one image, 1200 x 630 is the safest universal choice.',
    faq5q: 'How do I force platforms to refresh my OG preview?',
    faq5a: 'Each platform has its own cache-clearing tool: Facebook — use the <strong>Sharing Debugger</strong> and click "Scrape Again". Twitter — use the <strong>Card Validator</strong> to fetch a fresh preview. LinkedIn — use the <strong>Post Inspector</strong> to refresh the cache. For other platforms like Discord and Slack, you may need to wait for the cache to expire naturally (usually 24-48 hours) or append a query string like <code>?v=2</code> to your URL.',
    faq6q: 'Can I use different images for Facebook and Twitter?',
    faq6a: 'Yes. Set your Facebook image with <code>og:image</code> and your Twitter image with <code>twitter:image</code>. Twitter will prefer <code>twitter:image</code> over <code>og:image</code> when both are present. This is useful because the optimal aspect ratios differ: Facebook prefers 1.91:1 (1200x630) while Twitter\'s large image card uses 2:1 (1200x600) or 16:9 (1200x675).',

    linkToolBottom: 'Try our Meta Tag Generator to create perfect OG & Twitter Card tags →',
  },
  zh: {
    title: 'Open Graph 与 Twitter Card 元标签：开发者完全参考指南',
    intro: '当你在 Facebook、Twitter、LinkedIn、Discord 或 Slack 上分享链接时，出现的富媒体预览卡片是由 <strong>Open Graph (OG) 元标签</strong>和 <strong>Twitter Card 标签</strong>驱动的。正确设置这些标签意味着更多点击、更高互动和更专业的外观。设置错误则意味着预览损坏、图片缺失和流量流失。本完整参考指南涵盖了每个标签、每个平台要求和每个常见错误——并附带所有主流框架的可复制代码。',
    linkTool: '使用我们的免费 Meta 标签生成器立即创建完美元标签 →',
    h2_og_essential: '必备 Open Graph 标签',
    ogEssentialDesc: 'Open Graph 协议由 Facebook 于 2010 年创建，此后几乎被所有社交平台采用。这四个标签是任何页面的最低要求：',
    ogTitleLabel: 'og:title', ogTitleDesc: '页面在社交分享卡片中显示的标题。保持在 60 个字符以内以获得最佳显示效果。',
    ogDescLabel: 'og:description', ogDescDesc: '预览卡片中标题下方显示的页面内容简介。目标 120-160 个字符。',
    ogImageLabel: 'og:image', ogImageDesc: '社交分享卡片中显示的图片。这是影响最大的标签——带图片的帖子获得 2-3 倍的互动。必须是绝对 URL。',
    ogUrlLabel: 'og:url', ogUrlDesc: '页面的规范 URL。告诉平台将分享内容与哪个 URL 关联。',
    ogTypeLabel: 'og:type', ogTypeDesc: '内容类型。常用值：<code>website</code>（默认）、<code>article</code>（博客文章）、<code>product</code>、<code>profile</code>。',
    h3_og_additional: '其他 Open Graph 标签',
    ogAdditionalDesc: '除了基础标签外，这些标签让你对内容显示有更精细的控制：',
    h2_twitter: 'Twitter Card 标签',
    twitterDesc: 'Twitter（现为 X）支持自己的卡片系统，有四种卡片类型。如果缺少 Twitter 专属标签，Twitter 会回退使用 Open Graph 标签。',
    twitterCardTypes: 'Twitter Card 类型', cardType: '卡片类型', cardDesc: '描述', cardUseCase: '使用场景',
    summaryCard: 'summary', summaryCardDesc: '小方形图片配标题和描述', summaryCardUse: '博客文章、一般页面',
    largeCard: 'summary_large_image', largeCardDesc: '标题和描述上方的大图', largeCardUse: '视觉内容、特色文章',
    playerCard: 'player', playerCardDesc: '推文中嵌入的视频/音频播放器', playerCardUse: '视频托管、播客',
    appCard: 'app', appCardDesc: '移动应用直接下载卡片', appCardUse: '应用商店推广',
    h2_image_req: '各平台图片要求',
    imageReqDesc: '每个平台有不同的图片尺寸要求。使用错误的尺寸会导致图片被裁剪、拉伸或缺失：',
    platform: '平台', recSize: '推荐尺寸', minSize: '最小尺寸', maxFileSize: '最大文件', aspectRatio: '宽高比', formats: '格式',
    h2_complete_markup: '完整 HTML 标记示例',
    completeMarkupDesc: '这是一个包含所有 Open Graph 和 Twitter Card 标签的生产就绪 HTML head。复制并替换占位值：',
    h2_framework: '框架专属示例',
    frameworkDesc: '现代框架提供了管理元标签的内置 API。以下是在最流行框架中实现 OG 和 Twitter Card 标签的方法：',
    h3_nextjs: 'Next.js（App Router — Metadata API）', h3_nuxt: 'Nuxt 3（useSeoMeta）', h3_static: '静态 HTML',
    h2_mistakes: '常见错误及修复方法',
    mistakesDesc: '这些是开发者在社交元标签中最常遇到的问题。每一个都可能破坏你的分享预览：',
    mistake: '错误', problem: '问题', solution: '解决方案',
    h2_testing: '测试与调试工具',
    testingDesc: '发布前务必验证你的元标签。每个平台都会积极缓存预览，修复标签后需要等待缓存过期或手动清除。',
    tool: '工具', toolPlatform: '平台', toolUrl: 'URL', toolNotes: '说明',
    h2_dynamic: '动态 OG 图片',
    dynamicDesc: '为每个页面生成唯一的社交图片可以显著提高点击率。每个页面都有展示其标题或数据的自定义卡片，而不是整个网站使用一张通用图片。',
    h3_dynamic_why: '为什么动态 OG 图片很重要', dynamicWhyDesc: 'GitHub、Vercel 和 DEV.to 等网站为每个页面生成 OG 图片。结果：它们的链接在社交信息流中脱颖而出。',
    h3_dynamic_vercel: '使用 @vercel/og 生成', h3_dynamic_canvas: '使用 Node Canvas 生成', h3_dynamic_cloudinary: '使用 Cloudinary URL 转换',
    h2_faq: '常见问题',
    faq1q: 'Open Graph 和 Twitter Card 标签有什么区别？',
    faq1a: 'Open Graph 由 Facebook 创建，现在是 Facebook、LinkedIn、Discord、Slack、WhatsApp 等大多数平台使用的通用标准。Twitter Card 是 Twitter/X 的专有系统。Twitter 在没有专属标签时会回退使用 OG 标签，但两者都有可确保在所有平台上最佳显示。',
    faq2q: '我需要同时使用 Open Graph 和 Twitter Card 标签吗？',
    faq2a: '技术上不需要——Twitter 会读取 OG 标签作为后备。但最佳实践是两者都包含，因为 twitter:card 没有 OG 等价物且是 Twitter 显示卡片所必需的。',
    faq3q: '为什么分享链接时 OG 图片不显示？',
    faq3a: '最常见的原因：使用相对 URL 而非绝对 URL、图片 URL 返回 404、图片文件过大、平台缓存了旧版本、缺少 og:image:width 和 og:image:height 标签。',
    faq4q: '理想的 OG 图片尺寸是多少？',
    faq4a: '推荐尺寸为 <strong>1200 x 630 像素</strong>，宽高比 1.91:1。这在 Facebook、LinkedIn、Discord 等平台都表现良好。如果只能创建一张图片，1200 x 630 是最安全的通用选择。',
    faq5q: '如何强制平台刷新 OG 预览？',
    faq5a: '每个平台有自己的缓存清除工具：Facebook 使用 Sharing Debugger 点击"重新抓取"，Twitter 使用 Card Validator，LinkedIn 使用 Post Inspector。',
    faq6q: '可以为 Facebook 和 Twitter 使用不同的图片吗？',
    faq6a: '可以。用 og:image 设置 Facebook 图片，用 twitter:image 设置 Twitter 图片。当两者都存在时 Twitter 优先使用 twitter:image。',
    linkToolBottom: '试试我们的 Meta 标签生成器，创建完美的 OG 和 Twitter Card 标签 →',
  },
  ja: {
    title: 'Open Graph & Twitter Card メタタグ：開発者完全リファレンス',
    intro: 'Facebook、Twitter、LinkedIn、Discord、Slackでリンクを共有すると表示されるリッチプレビューカードは、<strong>Open Graph (OG) メタタグ</strong>と<strong>Twitter Cardタグ</strong>によって制御されています。正しく設定すればクリック率とエンゲージメントが向上します。この完全リファレンスでは、すべてのタグ、プラットフォーム要件、よくある間違いをカバーします。',
    linkTool: '無料のメタタグジェネレーターで完璧なメタタグを生成 →',
    h2_og_essential: '必須 Open Graph タグ',
    ogEssentialDesc: 'Open Graphプロトコルは2010年にFacebookによって作成され、現在はほぼすべてのソーシャルプラットフォームで採用されています。',
    ogTitleLabel: 'og:title', ogTitleDesc: 'ソーシャルシェアカードに表示されるページタイトル。60文字以内に収めてください。',
    ogDescLabel: 'og:description', ogDescDesc: 'プレビューカードのタイトル下に表示されるページ内容の概要。120-160文字を目標に。',
    ogImageLabel: 'og:image', ogImageDesc: 'ソーシャルシェアカードに表示される画像。最も影響力のあるタグです。絶対URLである必要があります。',
    ogUrlLabel: 'og:url', ogUrlDesc: 'ページの正規URL。プラットフォームにどのURLと関連付けるか伝えます。',
    ogTypeLabel: 'og:type', ogTypeDesc: 'コンテンツタイプ。一般的な値：<code>website</code>、<code>article</code>、<code>product</code>、<code>profile</code>。',
    h3_og_additional: '追加のOpen Graphタグ',
    ogAdditionalDesc: '基本以外に、コンテンツの表示をより細かく制御できるタグ：',
    h2_twitter: 'Twitter Card タグ',
    twitterDesc: 'Twitter（現X）は4種類のカードタイプをサポートしています。Twitter固有のタグがない場合、Open Graphタグにフォールバックします。',
    twitterCardTypes: 'Twitter Cardの種類', cardType: 'カードタイプ', cardDesc: '説明', cardUseCase: '用途',
    summaryCard: 'summary', summaryCardDesc: 'タイトルと説明付きの小さい正方形画像', summaryCardUse: 'ブログ記事、一般ページ',
    largeCard: 'summary_large_image', largeCardDesc: 'タイトルと説明の上に大きな画像', largeCardUse: 'ビジュアルコンテンツ',
    playerCard: 'player', playerCardDesc: 'ツイート内の動画/音声プレーヤー', playerCardUse: '動画、ポッドキャスト',
    appCard: 'app', appCardDesc: 'アプリ直接ダウンロードカード', appCardUse: 'アプリストアプロモーション',
    h2_image_req: 'プラットフォーム別画像要件',
    imageReqDesc: '各プラットフォームには異なる画像サイズ要件があります。間違ったサイズは切り取り、引き伸ばし、画像欠落の原因になります：',
    platform: 'プラットフォーム', recSize: '推奨サイズ', minSize: '最小サイズ', maxFileSize: '最大ファイル', aspectRatio: 'アスペクト比', formats: 'フォーマット',
    h2_complete_markup: '完全なHTMLマークアップ例',
    completeMarkupDesc: 'すべてのOpen GraphとTwitter Cardタグを含む本番対応HTMLヘッド：',
    h2_framework: 'フレームワーク別の例',
    frameworkDesc: 'モダンフレームワークにはメタタグ管理用の組み込みAPIがあります：',
    h3_nextjs: 'Next.js（App Router — Metadata API）', h3_nuxt: 'Nuxt 3（useSeoMeta）', h3_static: '静的HTML',
    h2_mistakes: 'よくある間違いと修正方法',
    mistakesDesc: '開発者がソーシャルメタタグで最も頻繁に遭遇する問題：',
    mistake: '間違い', problem: '問題', solution: '解決策',
    h2_testing: 'テスト＆デバッグツール',
    testingDesc: '公開前にメタタグを必ず検証してください。各プラットフォームはプレビューを積極的にキャッシュします。',
    tool: 'ツール', toolPlatform: 'プラットフォーム', toolUrl: 'URL', toolNotes: '備考',
    h2_dynamic: '動的OG画像',
    dynamicDesc: 'ページごとにユニークなソーシャル画像を生成すると、クリック率が大幅に向上します。',
    h3_dynamic_why: '動的OG画像が重要な理由', dynamicWhyDesc: 'GitHub、Vercel、DEV.toなどのサイトはページごとにOG画像を生成しています。',
    h3_dynamic_vercel: '@vercel/og で生成', h3_dynamic_canvas: 'Node Canvas で生成', h3_dynamic_cloudinary: 'Cloudinary URL変換を使用',
    h2_faq: 'よくある質問',
    faq1q: 'Open GraphとTwitter Cardタグの違いは？',
    faq1a: 'Open GraphはFacebookが作成し、現在はFacebook、LinkedIn、Discord、Slackなどで使われる共通標準です。Twitter CardはTwitter/X独自のシステムです。Twitterは専用タグがない場合OGタグにフォールバックしますが、両方あればすべてのプラットフォームで最適表示されます。',
    faq2q: 'Open GraphとTwitter Cardタグの両方が必要ですか？',
    faq2a: '技術的にはNo — TwitterはOGタグをフォールバックとして読みます。ただし、twitter:cardにはOG相当がなく、Twitter表示に必須なため、両方を含めるのがベストプラクティスです。',
    faq3q: 'リンク共有時にOG画像が表示されないのはなぜ？',
    faq3a: '最も一般的な原因：相対URLの使用、画像URLが404を返す、ファイルサイズが大きすぎる、プラットフォームが古いバージョンをキャッシュ、og:image:widthとog:image:heightの欠如。',
    faq4q: '理想的なOG画像サイズは？',
    faq4a: '推奨サイズは<strong>1200 x 630ピクセル</strong>、アスペクト比1.91:1です。Facebook、LinkedIn、Discordなどで最適に表示されます。',
    faq5q: 'プラットフォームにOGプレビューの更新を強制するには？',
    faq5a: '各プラットフォームにキャッシュクリアツールがあります：FacebookのSharing Debugger、TwitterのCard Validator、LinkedInのPost Inspector。',
    faq6q: 'FacebookとTwitterで異なる画像を使えますか？',
    faq6a: 'はい。og:imageでFacebook画像、twitter:imageでTwitter画像を設定できます。両方存在する場合、Twitterはtwitter:imageを優先します。',
    linkToolBottom: 'メタタグジェネレーターで完璧なOG & Twitter Cardタグを作成 →',
  },
  ko: {
    title: 'Open Graph & Twitter Card 메타 태그: 개발자 완전 참조 가이드',
    intro: 'Facebook, Twitter, LinkedIn, Discord, Slack에서 링크를 공유할 때 나타나는 리치 프리뷰 카드는 <strong>Open Graph (OG) 메타 태그</strong>와 <strong>Twitter Card 태그</strong>로 구동됩니다. 올바르게 설정하면 더 많은 클릭과 참여를 얻을 수 있습니다. 이 완전한 참조 가이드는 모든 태그, 플랫폼 요구사항, 일반적인 실수를 다룹니다.',
    linkTool: '무료 메타 태그 생성기로 완벽한 메타 태그를 즉시 생성하세요 →',
    h2_og_essential: '필수 Open Graph 태그',
    ogEssentialDesc: 'Open Graph 프로토콜은 2010년 Facebook에서 만들었으며, 현재 거의 모든 소셜 플랫폼에서 채택하고 있습니다.',
    ogTitleLabel: 'og:title', ogTitleDesc: '소셜 공유 카드에 표시되는 페이지 제목. 최적 표시를 위해 60자 이내로 유지하세요.',
    ogDescLabel: 'og:description', ogDescDesc: '프리뷰 카드에서 제목 아래 표시되는 페이지 내용 요약. 120-160자를 목표로 하세요.',
    ogImageLabel: 'og:image', ogImageDesc: '소셜 공유 카드에 표시되는 이미지. 가장 영향력 있는 태그입니다. 절대 URL이어야 합니다.',
    ogUrlLabel: 'og:url', ogUrlDesc: '페이지의 정규 URL. 플랫폼에 어떤 URL과 연결할지 알려줍니다.',
    ogTypeLabel: 'og:type', ogTypeDesc: '콘텐츠 유형. 일반 값: <code>website</code>, <code>article</code>, <code>product</code>, <code>profile</code>.',
    h3_og_additional: '추가 Open Graph 태그',
    ogAdditionalDesc: '기본 외에 콘텐츠 표시를 더 세밀하게 제어할 수 있는 태그:',
    h2_twitter: 'Twitter Card 태그',
    twitterDesc: 'Twitter(현 X)는 4가지 카드 유형을 지원합니다. Twitter 전용 태그가 없으면 Open Graph 태그로 폴백합니다.',
    twitterCardTypes: 'Twitter Card 유형', cardType: '카드 유형', cardDesc: '설명', cardUseCase: '사용 사례',
    summaryCard: 'summary', summaryCardDesc: '제목과 설명이 있는 작은 정사각형 이미지', summaryCardUse: '블로그 글, 일반 페이지',
    largeCard: 'summary_large_image', largeCardDesc: '제목과 설명 위 큰 이미지', largeCardUse: '시각적 콘텐츠',
    playerCard: 'player', playerCardDesc: '트윗 내 동영상/오디오 플레이어', playerCardUse: '동영상, 팟캐스트',
    appCard: 'app', appCardDesc: '모바일 앱 직접 다운로드 카드', appCardUse: '앱스토어 프로모션',
    h2_image_req: '플랫폼별 이미지 요구사항',
    imageReqDesc: '각 플랫폼마다 다른 이미지 크기 요구사항이 있습니다. 잘못된 크기는 잘림, 늘어남, 이미지 누락의 원인이 됩니다:',
    platform: '플랫폼', recSize: '권장 크기', minSize: '최소 크기', maxFileSize: '최대 파일', aspectRatio: '종횡비', formats: '형식',
    h2_complete_markup: '완전한 HTML 마크업 예제',
    completeMarkupDesc: '모든 Open Graph 및 Twitter Card 태그가 포함된 프로덕션용 HTML head:',
    h2_framework: '프레임워크별 예제',
    frameworkDesc: '최신 프레임워크는 메타 태그 관리를 위한 내장 API를 제공합니다:',
    h3_nextjs: 'Next.js (App Router — Metadata API)', h3_nuxt: 'Nuxt 3 (useSeoMeta)', h3_static: '정적 HTML',
    h2_mistakes: '흔한 실수와 해결 방법',
    mistakesDesc: '개발자들이 소셜 메타 태그에서 가장 자주 겪는 문제:',
    mistake: '실수', problem: '문제', solution: '해결책',
    h2_testing: '테스트 및 디버깅 도구',
    testingDesc: '게시 전 메타 태그를 반드시 검증하세요. 각 플랫폼은 프리뷰를 적극적으로 캐시합니다.',
    tool: '도구', toolPlatform: '플랫폼', toolUrl: 'URL', toolNotes: '참고',
    h2_dynamic: '동적 OG 이미지',
    dynamicDesc: '페이지별 고유한 소셜 이미지를 생성하면 클릭률이 크게 향상됩니다.',
    h3_dynamic_why: '동적 OG 이미지가 중요한 이유', dynamicWhyDesc: 'GitHub, Vercel, DEV.to 등은 페이지별 OG 이미지를 생성합니다.',
    h3_dynamic_vercel: '@vercel/og로 생성', h3_dynamic_canvas: 'Node Canvas로 생성', h3_dynamic_cloudinary: 'Cloudinary URL 변환 사용',
    h2_faq: '자주 묻는 질문',
    faq1q: 'Open Graph와 Twitter Card 태그의 차이점은?',
    faq1a: 'Open Graph는 Facebook이 만들었으며 현재 Facebook, LinkedIn, Discord, Slack 등에서 사용되는 범용 표준입니다. Twitter Card는 Twitter/X의 독자 시스템입니다. Twitter는 전용 태그가 없으면 OG 태그로 폴백하지만, 둘 다 있으면 모든 플랫폼에서 최적 표시됩니다.',
    faq2q: 'Open Graph와 Twitter Card 태그 둘 다 필요한가요?',
    faq2a: '기술적으로는 아닙니다. Twitter는 OG 태그를 폴백으로 읽습니다. 하지만 twitter:card는 OG 동등물이 없고 Twitter에서 카드 표시에 필수이므로, 둘 다 포함하는 것이 모범 사례입니다.',
    faq3q: '링크 공유 시 OG 이미지가 표시되지 않는 이유는?',
    faq3a: '가장 흔한 원인: 상대 URL 사용, 이미지 URL이 404 반환, 파일 크기 초과, 플랫폼이 이전 버전 캐시, og:image:width와 og:image:height 누락.',
    faq4q: '이상적인 OG 이미지 크기는?',
    faq4a: '권장 크기는 <strong>1200 x 630 픽셀</strong>, 종횡비 1.91:1입니다. Facebook, LinkedIn, Discord 등에서 잘 표시됩니다.',
    faq5q: '플랫폼에서 OG 프리뷰 새로고침을 강제하려면?',
    faq5a: '각 플랫폼에 캐시 삭제 도구가 있습니다: Facebook Sharing Debugger, Twitter Card Validator, LinkedIn Post Inspector.',
    faq6q: 'Facebook과 Twitter에 다른 이미지를 사용할 수 있나요?',
    faq6a: '네. og:image로 Facebook 이미지, twitter:image로 Twitter 이미지를 설정할 수 있습니다. 둘 다 있으면 Twitter는 twitter:image를 우선합니다.',
    linkToolBottom: '메타 태그 생성기로 완벽한 OG & Twitter Card 태그 만들기 →',
  },
  fr: {
    title: 'Balises Meta Open Graph & Twitter Card : Référence Complète pour Développeurs',
    intro: 'Lorsque vous partagez un lien sur Facebook, Twitter, LinkedIn, Discord ou Slack, la carte de prévisualisation riche qui apparaît est alimentée par les <strong>balises meta Open Graph (OG)</strong> et les <strong>balises Twitter Card</strong>. Bien les configurer signifie plus de clics et un aspect plus professionnel. Ce guide complet couvre chaque balise, chaque exigence de plateforme et chaque erreur courante.',
    linkTool: 'Générez des balises meta parfaites avec notre outil gratuit →',
    h2_og_essential: 'Balises Open Graph Essentielles',
    ogEssentialDesc: 'Le protocole Open Graph a été créé par Facebook en 2010 et est maintenant adopté par presque toutes les plateformes sociales.',
    ogTitleLabel: 'og:title', ogTitleDesc: 'Le titre de votre page tel qu\'il apparaît dans la carte de partage. Gardez-le sous 60 caractères.',
    ogDescLabel: 'og:description', ogDescDesc: 'Un résumé du contenu de la page affiché sous le titre. Visez 120-160 caractères.',
    ogImageLabel: 'og:image', ogImageDesc: 'L\'image affichée dans la carte de partage. La balise la plus impactante — les publications avec images obtiennent 2-3x plus d\'engagement. Doit être une URL absolue.',
    ogUrlLabel: 'og:url', ogUrlDesc: 'L\'URL canonique de la page.',
    ogTypeLabel: 'og:type', ogTypeDesc: 'Le type de contenu. Valeurs courantes : <code>website</code>, <code>article</code>, <code>product</code>, <code>profile</code>.',
    h3_og_additional: 'Balises Open Graph Supplémentaires',
    ogAdditionalDesc: 'Au-delà des bases, ces balises offrent un contrôle plus fin sur l\'affichage de votre contenu :',
    h2_twitter: 'Balises Twitter Card',
    twitterDesc: 'Twitter (maintenant X) prend en charge son propre système de cartes avec quatre types. Twitter se rabat sur les balises OG si les balises Twitter sont absentes.',
    twitterCardTypes: 'Types de Twitter Card', cardType: 'Type de carte', cardDesc: 'Description', cardUseCase: 'Cas d\'utilisation',
    summaryCard: 'summary', summaryCardDesc: 'Petite image carrée avec titre et description', summaryCardUse: 'Articles de blog, pages générales',
    largeCard: 'summary_large_image', largeCardDesc: 'Grande image au-dessus du titre et de la description', largeCardUse: 'Contenu visuel, articles vedettes',
    playerCard: 'player', playerCardDesc: 'Lecteur vidéo/audio intégré dans le tweet', playerCardUse: 'Hébergement vidéo, podcasts',
    appCard: 'app', appCardDesc: 'Carte de téléchargement direct d\'application', appCardUse: 'Promotion App Store / Google Play',
    h2_image_req: 'Exigences d\'Image par Plateforme',
    imageReqDesc: 'Chaque plateforme a des exigences de taille d\'image différentes :',
    platform: 'Plateforme', recSize: 'Taille recommandée', minSize: 'Taille minimum', maxFileSize: 'Taille max fichier', aspectRatio: 'Ratio', formats: 'Formats',
    h2_complete_markup: 'Exemple de Balisage HTML Complet',
    completeMarkupDesc: 'Voici un head HTML prêt pour la production avec toutes les balises OG et Twitter Card :',
    h2_framework: 'Exemples par Framework',
    frameworkDesc: 'Les frameworks modernes fournissent des API intégrées pour gérer les balises meta :',
    h3_nextjs: 'Next.js (App Router — Metadata API)', h3_nuxt: 'Nuxt 3 (useSeoMeta)', h3_static: 'HTML Statique',
    h2_mistakes: 'Erreurs Courantes & Solutions',
    mistakesDesc: 'Les problèmes les plus fréquents rencontrés par les développeurs avec les balises meta sociales :',
    mistake: 'Erreur', problem: 'Problème', solution: 'Solution',
    h2_testing: 'Outils de Test & Débogage',
    testingDesc: 'Validez toujours vos balises meta avant de publier. Chaque plateforme met en cache les aperçus de manière agressive.',
    tool: 'Outil', toolPlatform: 'Plateforme', toolUrl: 'URL', toolNotes: 'Notes',
    h2_dynamic: 'Images OG Dynamiques',
    dynamicDesc: 'Générer des images sociales uniques par page augmente considérablement le taux de clics.',
    h3_dynamic_why: 'Pourquoi les Images OG Dynamiques Comptent', dynamicWhyDesc: 'Des sites comme GitHub, Vercel et DEV.to génèrent des images OG par page.',
    h3_dynamic_vercel: 'Génération avec @vercel/og', h3_dynamic_canvas: 'Génération avec Node Canvas', h3_dynamic_cloudinary: 'Utilisation des Transformations URL Cloudinary',
    h2_faq: 'Questions Fréquentes',
    faq1q: 'Quelle est la différence entre Open Graph et Twitter Card ?',
    faq1a: 'Open Graph a été créé par Facebook et est la norme universelle utilisée par Facebook, LinkedIn, Discord, Slack, WhatsApp, etc. Twitter Cards est le système propriétaire de Twitter/X. Twitter se rabat sur les balises OG si les balises Twitter sont absentes.',
    faq2q: 'Ai-je besoin des deux types de balises ?',
    faq2a: 'Techniquement non — Twitter lit les balises OG en secours. Mais inclure les deux est la meilleure pratique car twitter:card n\'a pas d\'équivalent OG et est nécessaire pour que Twitter affiche une carte.',
    faq3q: 'Pourquoi mon image OG n\'apparaît pas lors du partage ?',
    faq3a: 'Causes les plus courantes : URL relative au lieu d\'absolue, URL d\'image retourne 404, fichier trop volumineux, plateforme a mis en cache l\'ancienne version, balises og:image:width et og:image:height manquantes.',
    faq4q: 'Quelle est la taille idéale d\'image OG ?',
    faq4a: 'La taille recommandée est <strong>1200 x 630 pixels</strong> avec un ratio 1.91:1. Cela fonctionne bien sur Facebook, LinkedIn, Discord et la plupart des plateformes.',
    faq5q: 'Comment forcer le rafraîchissement de l\'aperçu OG ?',
    faq5a: 'Chaque plateforme a son propre outil : Facebook Sharing Debugger, Twitter Card Validator, LinkedIn Post Inspector.',
    faq6q: 'Puis-je utiliser des images différentes pour Facebook et Twitter ?',
    faq6a: 'Oui. Définissez l\'image Facebook avec og:image et l\'image Twitter avec twitter:image. Twitter préfère twitter:image quand les deux sont présentes.',
    linkToolBottom: 'Essayez notre générateur de balises meta pour des tags OG & Twitter Card parfaits →',
  },
  de: {
    title: 'Open Graph & Twitter Card Meta-Tags: Vollständige Entwickler-Referenz',
    intro: 'Wenn Sie einen Link auf Facebook, Twitter, LinkedIn, Discord oder Slack teilen, wird die angezeigte Rich-Preview-Karte von <strong>Open Graph (OG) Meta-Tags</strong> und <strong>Twitter Card Tags</strong> gesteuert. Diese richtig zu konfigurieren bedeutet mehr Klicks und ein professionelleres Erscheinungsbild. Diese vollständige Referenz deckt jeden Tag, jede Plattformanforderung und jeden häufigen Fehler ab.',
    linkTool: 'Generieren Sie perfekte Meta-Tags mit unserem kostenlosen Tool →',
    h2_og_essential: 'Essentielle Open Graph Tags',
    ogEssentialDesc: 'Das Open Graph Protokoll wurde 2010 von Facebook erstellt und wird heute von nahezu jeder sozialen Plattform unterstützt.',
    ogTitleLabel: 'og:title', ogTitleDesc: 'Der Titel Ihrer Seite in der Sharing-Karte. Halten Sie ihn unter 60 Zeichen.',
    ogDescLabel: 'og:description', ogDescDesc: 'Eine Zusammenfassung des Seiteninhalts unter dem Titel. Zielen Sie auf 120-160 Zeichen.',
    ogImageLabel: 'og:image', ogImageDesc: 'Das Bild in der Sharing-Karte. Der wirkungsvollste Tag — Posts mit Bildern erhalten 2-3x mehr Engagement. Muss eine absolute URL sein.',
    ogUrlLabel: 'og:url', ogUrlDesc: 'Die kanonische URL der Seite.',
    ogTypeLabel: 'og:type', ogTypeDesc: 'Der Inhaltstyp. Gängige Werte: <code>website</code>, <code>article</code>, <code>product</code>, <code>profile</code>.',
    h3_og_additional: 'Zusätzliche Open Graph Tags',
    ogAdditionalDesc: 'Über die Grundlagen hinaus bieten diese Tags feinere Kontrolle über die Darstellung:',
    h2_twitter: 'Twitter Card Tags',
    twitterDesc: 'Twitter (jetzt X) unterstützt vier Kartentypen. Twitter fällt auf OG-Tags zurück, wenn Twitter-spezifische Tags fehlen.',
    twitterCardTypes: 'Twitter Card Typen', cardType: 'Kartentyp', cardDesc: 'Beschreibung', cardUseCase: 'Anwendungsfall',
    summaryCard: 'summary', summaryCardDesc: 'Kleines quadratisches Bild mit Titel und Beschreibung', summaryCardUse: 'Blog-Beiträge, allgemeine Seiten',
    largeCard: 'summary_large_image', largeCardDesc: 'Großes Bild über Titel und Beschreibung', largeCardUse: 'Visuelle Inhalte',
    playerCard: 'player', playerCardDesc: 'Eingebetteter Video-/Audio-Player im Tweet', playerCardUse: 'Video-Hosting, Podcasts',
    appCard: 'app', appCardDesc: 'Direkte App-Download-Karte', appCardUse: 'App Store / Google Play Werbung',
    h2_image_req: 'Bildanforderungen nach Plattform',
    imageReqDesc: 'Jede Plattform hat unterschiedliche Bildgrößenanforderungen:',
    platform: 'Plattform', recSize: 'Empfohlene Größe', minSize: 'Mindestgröße', maxFileSize: 'Max. Dateigröße', aspectRatio: 'Seitenverhältnis', formats: 'Formate',
    h2_complete_markup: 'Vollständiges HTML-Markup Beispiel',
    completeMarkupDesc: 'Hier ist ein produktionsreifer HTML-Head mit allen OG- und Twitter Card Tags:',
    h2_framework: 'Framework-spezifische Beispiele',
    frameworkDesc: 'Moderne Frameworks bieten integrierte APIs zur Verwaltung von Meta-Tags:',
    h3_nextjs: 'Next.js (App Router — Metadata API)', h3_nuxt: 'Nuxt 3 (useSeoMeta)', h3_static: 'Statisches HTML',
    h2_mistakes: 'Häufige Fehler & Lösungen',
    mistakesDesc: 'Die häufigsten Probleme bei sozialen Meta-Tags:',
    mistake: 'Fehler', problem: 'Problem', solution: 'Lösung',
    h2_testing: 'Test- & Debug-Tools',
    testingDesc: 'Validieren Sie Ihre Meta-Tags immer vor der Veröffentlichung. Jede Plattform cached Vorschauen aggressiv.',
    tool: 'Tool', toolPlatform: 'Plattform', toolUrl: 'URL', toolNotes: 'Hinweise',
    h2_dynamic: 'Dynamische OG-Bilder',
    dynamicDesc: 'Die Generierung einzigartiger Social-Bilder pro Seite erhöht die Klickrate erheblich.',
    h3_dynamic_why: 'Warum dynamische OG-Bilder wichtig sind', dynamicWhyDesc: 'Seiten wie GitHub, Vercel und DEV.to generieren OG-Bilder pro Seite.',
    h3_dynamic_vercel: 'Generierung mit @vercel/og', h3_dynamic_canvas: 'Generierung mit Node Canvas', h3_dynamic_cloudinary: 'Cloudinary URL-Transformationen nutzen',
    h2_faq: 'Häufig gestellte Fragen',
    faq1q: 'Was ist der Unterschied zwischen Open Graph und Twitter Card?',
    faq1a: 'Open Graph wurde von Facebook erstellt und ist der universelle Standard für Facebook, LinkedIn, Discord, Slack, WhatsApp usw. Twitter Cards ist Twitters/X\'s proprietäres System. Twitter fällt auf OG-Tags zurück, wenn Twitter-Tags fehlen.',
    faq2q: 'Brauche ich beide Arten von Tags?',
    faq2a: 'Technisch nein — Twitter liest OG-Tags als Fallback. Aber Best Practice ist, beide einzuschließen, da twitter:card kein OG-Äquivalent hat und für die Twitter-Kartenanzeige erforderlich ist.',
    faq3q: 'Warum wird mein OG-Bild beim Teilen nicht angezeigt?',
    faq3a: 'Häufigste Ursachen: Relative statt absolute URL, Bild-URL liefert 404, Datei zu groß, Plattform hat alte Version gecached, fehlende og:image:width und og:image:height Tags.',
    faq4q: 'Was ist die ideale OG-Bildgröße?',
    faq4a: 'Die empfohlene Größe ist <strong>1200 x 630 Pixel</strong> mit einem Seitenverhältnis von 1.91:1.',
    faq5q: 'Wie erzwinge ich eine Aktualisierung der OG-Vorschau?',
    faq5a: 'Jede Plattform hat ihr eigenes Tool: Facebook Sharing Debugger, Twitter Card Validator, LinkedIn Post Inspector.',
    faq6q: 'Kann ich für Facebook und Twitter verschiedene Bilder verwenden?',
    faq6a: 'Ja. Setzen Sie das Facebook-Bild mit og:image und das Twitter-Bild mit twitter:image. Twitter bevorzugt twitter:image, wenn beide vorhanden sind.',
    linkToolBottom: 'Erstellen Sie perfekte OG & Twitter Card Tags mit unserem Meta-Tag-Generator →',
  },
  es: {
    title: 'Meta Tags Open Graph y Twitter Card: Referencia Completa para Desarrolladores',
    intro: 'Cuando compartes un enlace en Facebook, Twitter, LinkedIn, Discord o Slack, la tarjeta de vista previa enriquecida que aparece está impulsada por las <strong>meta tags Open Graph (OG)</strong> y las <strong>tags Twitter Card</strong>. Configurarlas correctamente significa más clics y una apariencia más profesional. Esta referencia completa cubre cada tag, cada requisito de plataforma y cada error común.',
    linkTool: 'Genera meta tags perfectas con nuestro generador gratuito →',
    h2_og_essential: 'Tags Open Graph Esenciales',
    ogEssentialDesc: 'El protocolo Open Graph fue creado por Facebook en 2010 y ahora es adoptado por casi todas las plataformas sociales.',
    ogTitleLabel: 'og:title', ogTitleDesc: 'El título de tu página en la tarjeta de compartir. Mantenlo bajo 60 caracteres.',
    ogDescLabel: 'og:description', ogDescDesc: 'Un resumen del contenido mostrado bajo el título. Apunta a 120-160 caracteres.',
    ogImageLabel: 'og:image', ogImageDesc: 'La imagen en la tarjeta de compartir. El tag más impactante — las publicaciones con imagen obtienen 2-3x más engagement. Debe ser una URL absoluta.',
    ogUrlLabel: 'og:url', ogUrlDesc: 'La URL canónica de la página.',
    ogTypeLabel: 'og:type', ogTypeDesc: 'El tipo de contenido. Valores comunes: <code>website</code>, <code>article</code>, <code>product</code>, <code>profile</code>.',
    h3_og_additional: 'Tags Open Graph Adicionales',
    ogAdditionalDesc: 'Más allá de lo básico, estos tags ofrecen control más fino sobre cómo se muestra tu contenido:',
    h2_twitter: 'Tags Twitter Card',
    twitterDesc: 'Twitter (ahora X) soporta su propio sistema de tarjetas con cuatro tipos. Twitter recurre a las tags OG si faltan las tags específicas de Twitter.',
    twitterCardTypes: 'Tipos de Twitter Card', cardType: 'Tipo de tarjeta', cardDesc: 'Descripción', cardUseCase: 'Caso de uso',
    summaryCard: 'summary', summaryCardDesc: 'Imagen cuadrada pequeña con título y descripción', summaryCardUse: 'Posts de blog, páginas generales',
    largeCard: 'summary_large_image', largeCardDesc: 'Imagen grande sobre título y descripción', largeCardUse: 'Contenido visual',
    playerCard: 'player', playerCardDesc: 'Reproductor de video/audio integrado en el tweet', playerCardUse: 'Hosting de video, podcasts',
    appCard: 'app', appCardDesc: 'Tarjeta de descarga directa de aplicación', appCardUse: 'Promoción App Store / Google Play',
    h2_image_req: 'Requisitos de Imagen por Plataforma',
    imageReqDesc: 'Cada plataforma tiene diferentes requisitos de tamaño de imagen:',
    platform: 'Plataforma', recSize: 'Tamaño recomendado', minSize: 'Tamaño mínimo', maxFileSize: 'Tamaño máx.', aspectRatio: 'Relación aspecto', formats: 'Formatos',
    h2_complete_markup: 'Ejemplo Completo de Marcado HTML',
    completeMarkupDesc: 'Aquí hay un head HTML listo para producción con todas las tags OG y Twitter Card:',
    h2_framework: 'Ejemplos por Framework',
    frameworkDesc: 'Los frameworks modernos proporcionan APIs integradas para gestionar meta tags:',
    h3_nextjs: 'Next.js (App Router — Metadata API)', h3_nuxt: 'Nuxt 3 (useSeoMeta)', h3_static: 'HTML Estático',
    h2_mistakes: 'Errores Comunes y Soluciones',
    mistakesDesc: 'Los problemas más frecuentes con las meta tags sociales:',
    mistake: 'Error', problem: 'Problema', solution: 'Solución',
    h2_testing: 'Herramientas de Prueba y Depuración',
    testingDesc: 'Siempre valida tus meta tags antes de publicar. Cada plataforma cachea las vistas previas agresivamente.',
    tool: 'Herramienta', toolPlatform: 'Plataforma', toolUrl: 'URL', toolNotes: 'Notas',
    h2_dynamic: 'Imágenes OG Dinámicas',
    dynamicDesc: 'Generar imágenes sociales únicas por página aumenta dramáticamente la tasa de clics.',
    h3_dynamic_why: 'Por Qué Importan las Imágenes OG Dinámicas', dynamicWhyDesc: 'Sitios como GitHub, Vercel y DEV.to generan imágenes OG por página.',
    h3_dynamic_vercel: 'Generación con @vercel/og', h3_dynamic_canvas: 'Generación con Node Canvas', h3_dynamic_cloudinary: 'Usando Transformaciones URL de Cloudinary',
    h2_faq: 'Preguntas Frecuentes',
    faq1q: '¿Cuál es la diferencia entre Open Graph y Twitter Card?',
    faq1a: 'Open Graph fue creado por Facebook y es el estándar universal usado por Facebook, LinkedIn, Discord, Slack, WhatsApp, etc. Twitter Cards es el sistema propietario de Twitter/X. Twitter recurre a tags OG si faltan las tags de Twitter.',
    faq2q: '¿Necesito ambos tipos de tags?',
    faq2a: 'Técnicamente no — Twitter lee las tags OG como respaldo. Pero la mejor práctica es incluir ambos ya que twitter:card no tiene equivalente OG y es necesario para que Twitter muestre una tarjeta.',
    faq3q: '¿Por qué no aparece mi imagen OG al compartir?',
    faq3a: 'Causas más comunes: URL relativa en lugar de absoluta, URL de imagen devuelve 404, archivo demasiado grande, plataforma ha cacheado versión anterior, tags og:image:width y og:image:height faltantes.',
    faq4q: '¿Cuál es el tamaño ideal de imagen OG?',
    faq4a: 'El tamaño recomendado es <strong>1200 x 630 píxeles</strong> con relación de aspecto 1.91:1.',
    faq5q: '¿Cómo forzar la actualización de la vista previa OG?',
    faq5a: 'Cada plataforma tiene su propia herramienta: Facebook Sharing Debugger, Twitter Card Validator, LinkedIn Post Inspector.',
    faq6q: '¿Puedo usar imágenes diferentes para Facebook y Twitter?',
    faq6a: 'Sí. Configura la imagen de Facebook con og:image y la de Twitter con twitter:image. Twitter prefiere twitter:image cuando ambas están presentes.',
    linkToolBottom: 'Crea tags OG y Twitter Card perfectas con nuestro generador de meta tags →',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 15, marginBottom: 12 };
const linkStyle: React.CSSProperties = { color: 'var(--accent)', textDecoration: 'underline' };

export default function OpenGraphTwitterCard({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
      { '@type': 'Question', name: t.faq6q, acceptedAnswer: { '@type': 'Answer', text: t.faq6a } },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Introduction */}
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.intro }} />
      <p style={{ marginBottom: 24 }}><a href={`/${lang}/tools/meta-tags`} style={linkStyle}>{t.linkTool}</a></p>

      {/* Section 1: Essential OG Tags */}
      <h2 style={h2Style}>{t.h2_og_essential}</h2>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.ogEssentialDesc }} />

      <h3 style={h3Style}>{t.ogTitleLabel}</h3>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.ogTitleDesc }} />
      <pre style={codeStyle}><code>{`<meta property="og:title" content="How to Build a REST API with Node.js in 2026" />`}</code></pre>

      <h3 style={h3Style}>{t.ogDescLabel}</h3>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.ogDescDesc }} />
      <pre style={codeStyle}><code>{`<meta property="og:description" content="Step-by-step guide to building a production-ready REST API with Node.js, Express, and TypeScript. Includes auth, validation, and deployment." />`}</code></pre>

      <h3 style={h3Style}>{t.ogImageLabel}</h3>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.ogImageDesc }} />
      <pre style={codeStyle}><code>{`<meta property="og:image" content="https://example.com/images/rest-api-guide-og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="REST API with Node.js — Complete Guide" />
<meta property="og:image:type" content="image/png" />`}</code></pre>

      <h3 style={h3Style}>{t.ogUrlLabel}</h3>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.ogUrlDesc }} />
      <pre style={codeStyle}><code>{`<meta property="og:url" content="https://example.com/blog/rest-api-nodejs" />`}</code></pre>

      <h3 style={h3Style}>{t.ogTypeLabel}</h3>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.ogTypeDesc }} />
      <pre style={codeStyle}><code>{`<!-- For a general page -->
<meta property="og:type" content="website" />

<!-- For a blog post / article -->
<meta property="og:type" content="article" />
<meta property="article:published_time" content="2026-02-10T08:00:00Z" />
<meta property="article:author" content="https://example.com/about" />
<meta property="article:section" content="Technology" />
<meta property="article:tag" content="Node.js" />
<meta property="article:tag" content="REST API" />`}</code></pre>

      {/* Additional OG Tags */}
      <h3 style={h3Style}>{t.h3_og_additional}</h3>
      <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.ogAdditionalDesc }} />
      <pre style={codeStyle}><code>{`<!-- Site name — shown above the title on Facebook -->
<meta property="og:site_name" content="DevToolBox" />

<!-- Locale — language_TERRITORY format -->
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="fr_FR" />
<meta property="og:locale:alternate" content="de_DE" />
<meta property="og:locale:alternate" content="es_ES" />
<meta property="og:locale:alternate" content="ja_JP" />

<!-- Video (for og:type = video.*) -->
<meta property="og:video" content="https://example.com/video.mp4" />
<meta property="og:video:width" content="1280" />
<meta property="og:video:height" content="720" />
<meta property="og:video:type" content="video/mp4" />

<!-- Audio -->
<meta property="og:audio" content="https://example.com/podcast-ep1.mp3" />
<meta property="og:audio:type" content="audio/mpeg" />`}</code></pre>

      {/* Section 2: Twitter Card Tags */}
      <h2 style={h2Style}>{t.h2_twitter}</h2>
      <p style={pStyle}>{t.twitterDesc}</p>

      <h3 style={h3Style}>{t.twitterCardTypes}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.cardType}</th>
              <th style={thStyle}>{t.cardDesc}</th>
              <th style={thStyle}>{t.cardUseCase}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>{t.summaryCard}</td><td style={tdStyle}>{t.summaryCardDesc}</td><td style={tdStyle}>{t.summaryCardUse}</td></tr>
            <tr><td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>{t.largeCard}</td><td style={tdStyle}>{t.largeCardDesc}</td><td style={tdStyle}>{t.largeCardUse}</td></tr>
            <tr><td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>{t.playerCard}</td><td style={tdStyle}>{t.playerCardDesc}</td><td style={tdStyle}>{t.playerCardUse}</td></tr>
            <tr><td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>{t.appCard}</td><td style={tdStyle}>{t.appCardDesc}</td><td style={tdStyle}>{t.appCardUse}</td></tr>
          </tbody>
        </table>
      </div>

      <pre style={codeStyle}><code>{`<!-- Summary Card (small image) -->
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@yourusername" />
<meta name="twitter:creator" content="@authorname" />
<meta name="twitter:title" content="How to Build a REST API with Node.js" />
<meta name="twitter:description" content="Complete guide with auth, validation, and deployment." />
<meta name="twitter:image" content="https://example.com/images/rest-api-square.png" />
<meta name="twitter:image:alt" content="REST API Guide illustration" />

<!-- Summary Card with Large Image -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@yourusername" />
<meta name="twitter:title" content="How to Build a REST API with Node.js" />
<meta name="twitter:description" content="Complete guide with auth, validation, and deployment." />
<meta name="twitter:image" content="https://example.com/images/rest-api-wide.png" />

<!-- Player Card (video/audio) -->
<meta name="twitter:card" content="player" />
<meta name="twitter:player" content="https://example.com/embed/video123" />
<meta name="twitter:player:width" content="1280" />
<meta name="twitter:player:height" content="720" />

<!-- App Card -->
<meta name="twitter:card" content="app" />
<meta name="twitter:app:id:iphone" content="123456789" />
<meta name="twitter:app:id:googleplay" content="com.example.app" />
<meta name="twitter:app:name:iphone" content="My App" />
<meta name="twitter:app:name:googleplay" content="My App" />`}</code></pre>

      {/* Section 3: Image Requirements by Platform */}
      <h2 style={h2Style}>{t.h2_image_req}</h2>
      <p style={pStyle}>{t.imageReqDesc}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.platform}</th>
              <th style={thStyle}>{t.recSize}</th>
              <th style={thStyle}>{t.minSize}</th>
              <th style={thStyle}>{t.maxFileSize}</th>
              <th style={thStyle}>{t.aspectRatio}</th>
              <th style={thStyle}>{t.formats}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Facebook', '1200 x 630', '600 x 315', '8 MB', '1.91:1', 'JPG, PNG, GIF, WebP'],
              ['Twitter (summary)', '144 x 144', '144 x 144', '5 MB', '1:1', 'JPG, PNG, GIF, WebP'],
              ['Twitter (large image)', '1200 x 675', '300 x 157', '5 MB', '2:1 / 16:9', 'JPG, PNG, GIF, WebP'],
              ['LinkedIn', '1200 x 627', '200 x 200', '5 MB', '1.91:1', 'JPG, PNG'],
              ['Discord', '1200 x 630', '256 x 256', '8 MB', '1.91:1', 'JPG, PNG, GIF'],
              ['WhatsApp', '1200 x 630', '300 x 200', '5 MB', '1.91:1', 'JPG, PNG'],
              ['Slack', '1200 x 630', '250 x 250', '5 MB', '1.91:1', 'JPG, PNG, GIF'],
              ['Telegram', '1200 x 630', '200 x 200', '5 MB', '1.91:1', 'JPG, PNG'],
              ['Pinterest', '1000 x 1500', '600 x 600', '10 MB', '2:3', 'JPG, PNG'],
              ['iMessage', '1200 x 630', '300 x 300', '5 MB', '1.91:1', 'JPG, PNG'],
            ].map(([plat, rec, min, max, ratio, fmt], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{plat}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{rec}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{min}</td>
                <td style={tdStyle}>{max}</td>
                <td style={tdStyle}>{ratio}</td>
                <td style={tdStyle}>{fmt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 4: Complete HTML Markup */}
      <h2 style={h2Style}>{t.h2_complete_markup}</h2>
      <p style={pStyle}>{t.completeMarkupDesc}</p>
      <pre style={codeStyle}><code>{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary Meta Tags -->
  <title>How to Build a REST API with Node.js in 2026</title>
  <meta name="description" content="Step-by-step guide to building a production-ready REST API with Node.js, Express, and TypeScript." />
  <link rel="canonical" href="https://example.com/blog/rest-api-nodejs" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://example.com/blog/rest-api-nodejs" />
  <meta property="og:title" content="How to Build a REST API with Node.js in 2026" />
  <meta property="og:description" content="Step-by-step guide to building a production-ready REST API with Node.js, Express, and TypeScript." />
  <meta property="og:image" content="https://example.com/images/rest-api-og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="REST API with Node.js guide banner" />
  <meta property="og:site_name" content="My Dev Blog" />
  <meta property="og:locale" content="en_US" />

  <!-- Article-specific OG tags -->
  <meta property="article:published_time" content="2026-02-10T08:00:00Z" />
  <meta property="article:modified_time" content="2026-02-10T12:00:00Z" />
  <meta property="article:author" content="https://example.com/about" />
  <meta property="article:section" content="Web Development" />
  <meta property="article:tag" content="Node.js" />
  <meta property="article:tag" content="REST API" />
  <meta property="article:tag" content="TypeScript" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@yourusername" />
  <meta name="twitter:creator" content="@authorname" />
  <meta name="twitter:title" content="How to Build a REST API with Node.js in 2026" />
  <meta name="twitter:description" content="Step-by-step guide to building a production-ready REST API." />
  <meta name="twitter:image" content="https://example.com/images/rest-api-twitter.png" />
  <meta name="twitter:image:alt" content="REST API with Node.js guide banner" />
</head>
<body>
  <!-- Page content -->
</body>
</html>`}</code></pre>

      {/* Section 5: Framework Examples */}
      <h2 style={h2Style}>{t.h2_framework}</h2>
      <p style={pStyle}>{t.frameworkDesc}</p>

      <h3 style={h3Style}>{t.h3_nextjs}</h3>
      <pre style={codeStyle}><code>{`// app/blog/[slug]/page.tsx
import { Metadata } from 'next';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: \`https://example.com/blog/\${params.slug}\`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: \`https://example.com/blog/\${params.slug}\`,
      siteName: 'My Dev Blog',
      locale: 'en_US',
      images: [
        {
          url: post.ogImage,      // Must be absolute URL
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@yourusername',
      creator: '@authorname',
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.twitterImage,  // Can differ from OG image
          alt: post.title,
        },
      ],
    },
  };
}

export default function BlogPost({ params }: Props) {
  // Page component...
}`}</code></pre>

      <h3 style={h3Style}>{t.h3_nuxt}</h3>
      <pre style={codeStyle}><code>{`<!-- pages/blog/[slug].vue -->
<script setup lang="ts">
const route = useRoute();
const { data: post } = await useFetch(\`/api/posts/\${route.params.slug}\`);

useSeoMeta({
  title: post.value.title,
  description: post.value.excerpt,
  ogType: 'article',
  ogTitle: post.value.title,
  ogDescription: post.value.excerpt,
  ogUrl: \`https://example.com/blog/\${route.params.slug}\`,
  ogImage: post.value.ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: post.value.title,
  ogSiteName: 'My Dev Blog',
  ogLocale: 'en_US',
  articlePublishedTime: post.value.date,
  articleAuthor: post.value.author,
  articleTag: post.value.tags,
  twitterCard: 'summary_large_image',
  twitterSite: '@yourusername',
  twitterCreator: '@authorname',
  twitterTitle: post.value.title,
  twitterDescription: post.value.excerpt,
  twitterImage: post.value.twitterImage,
  twitterImageAlt: post.value.title,
});
</script>

<template>
  <article>
    <!-- Page content -->
  </article>
</template>`}</code></pre>

      <h3 style={h3Style}>{t.h3_static}</h3>
      <pre style={codeStyle}><code>{`<!-- For static HTML sites, simply add meta tags in <head> -->
<!-- You can automate this with a build tool or templating engine -->

<!-- Example with Eleventy (11ty) Nunjucks template -->
<head>
  <title>{{ title }}</title>
  <meta name="description" content="{{ description }}" />
  <meta property="og:type" content="{% if layout == 'post' %}article{% else %}website{% endif %}" />
  <meta property="og:title" content="{{ title }}" />
  <meta property="og:description" content="{{ description }}" />
  <meta property="og:image" content="{{ site.url }}{{ ogImage }}" />
  <meta property="og:url" content="{{ site.url }}{{ page.url }}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{{ title }}" />
  <meta name="twitter:description" content="{{ description }}" />
  <meta name="twitter:image" content="{{ site.url }}{{ ogImage }}" />
</head>

<!-- Example with Hugo -->
<!-- layouts/partials/head.html -->
<meta property="og:title" content="{{ .Title }}" />
<meta property="og:description" content="{{ .Description }}" />
<meta property="og:image" content="{{ .Params.ogImage | absURL }}" />
<meta property="og:url" content="{{ .Permalink }}" />
<meta property="og:type" content="{{ if .IsPage }}article{{ else }}website{{ end }}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{{ .Title }}" />
<meta name="twitter:image" content="{{ .Params.ogImage | absURL }}" />`}</code></pre>

      {/* Section 6: Common Mistakes */}
      <h2 style={h2Style}>{t.h2_mistakes}</h2>
      <p style={pStyle}>{t.mistakesDesc}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>{t.mistake}</th>
              <th style={thStyle}>{t.problem}</th>
              <th style={thStyle}>{t.solution}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                'Relative image URLs',
                'og:image="/images/og.png" — platforms cannot resolve relative paths',
                'Always use absolute URLs: og:image="https://example.com/images/og.png"',
              ],
              [
                'Missing image dimensions',
                'Facebook may not display the image on first share without width/height',
                'Always include og:image:width and og:image:height tags',
              ],
              [
                'HTTP instead of HTTPS',
                'Many platforms reject or warn about non-HTTPS image URLs',
                'Serve all OG images over HTTPS. Use protocol-relative URLs as last resort',
              ],
              [
                'Not handling cache',
                'Platforms cache previews for hours/days; updating tags has no immediate effect',
                'Use platform debug tools to force refresh. Append ?v=2 for cache-busting',
              ],
              [
                'Same tags on every page',
                'Every page shows the same preview card — confusing and poor CTR',
                'Generate unique og:title, og:description, og:image per page',
              ],
              [
                'Missing twitter:card tag',
                'Twitter will not render any card at all without this tag',
                'Always include <meta name="twitter:card" content="summary_large_image" />',
              ],
              [
                'Image too large (>8MB)',
                'Facebook silently fails; Twitter shows no image',
                'Optimize images: compress to <1MB, use JPEG for photos, PNG for graphics',
              ],
              [
                'Wrong image aspect ratio',
                'Image gets cropped awkwardly — text cut off, faces cropped',
                'Use 1200x630 (1.91:1) for OG, 1200x675 (16:9) for Twitter large image',
              ],
              [
                'Duplicate og:image tags',
                'Unpredictable behavior — platform may pick the wrong image',
                'Use only one og:image tag per page (or intentionally provide multiple with primary first)',
              ],
              [
                'Forgetting og:url',
                'Shares from different URLs (www vs non-www, query params) counted separately',
                'Set og:url to the canonical URL to consolidate share counts',
              ],
            ].map(([mistake, prob, sol], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600, textAlign: 'center' }}>{i + 1}</td>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{mistake}</td>
                <td style={tdStyle}>{prob}</td>
                <td style={tdStyle}>{sol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 7: Testing Tools */}
      <h2 style={h2Style}>{t.h2_testing}</h2>
      <p style={pStyle}>{t.testingDesc}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.tool}</th>
              <th style={thStyle}>{t.toolPlatform}</th>
              <th style={thStyle}>{t.toolUrl}</th>
              <th style={thStyle}>{t.toolNotes}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Facebook Sharing Debugger', 'Facebook / Meta', 'developers.facebook.com/tools/debug/', 'Shows all OG tags, image preview, and errors. Click "Scrape Again" to refresh cache.'],
              ['Twitter Card Validator', 'Twitter / X', 'cards-dev.twitter.com/validator', 'Preview your Twitter Card. Validates tag structure. Requires Twitter login.'],
              ['LinkedIn Post Inspector', 'LinkedIn', 'linkedin.com/post-inspector/', 'Validates OG tags for LinkedIn. Click "Inspect" to refresh cached preview.'],
              ['OpenGraph.xyz', 'Universal', 'opengraph.xyz', 'Preview how your URL appears on Facebook, Twitter, LinkedIn, Discord simultaneously.'],
              ['Metatags.io', 'Universal', 'metatags.io', 'Real-time preview editor. Edit tags and see Facebook/Twitter/Google previews instantly.'],
              ['Social Share Preview (VS Code)', 'Development', 'VS Code Extension', 'Preview OG tags directly in your IDE without deploying.'],
              ['Ngrok / Cloudflare Tunnel', 'Development', 'ngrok.com', 'Expose localhost to test with real platform validators during development.'],
            ].map(([name, plat, url, notes], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{name}</td>
                <td style={tdStyle}>{plat}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>{url}</td>
                <td style={tdStyle}>{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 8: Dynamic OG Images */}
      <h2 style={h2Style}>{t.h2_dynamic}</h2>
      <p style={pStyle}>{t.dynamicDesc}</p>

      <h3 style={h3Style}>{t.h3_dynamic_why}</h3>
      <p style={pStyle}>{t.dynamicWhyDesc}</p>
      <pre style={codeStyle}><code>{`<!-- Instead of this (same image for every page): -->
<meta property="og:image" content="https://example.com/default-og.png" />

<!-- Generate this (unique per page): -->
<meta property="og:image" content="https://example.com/api/og?title=How+to+Build+a+REST+API" />`}</code></pre>

      <h3 style={h3Style}>{t.h3_dynamic_vercel}</h3>
      <pre style={codeStyle}><code>{`// app/api/og/route.tsx — Next.js Edge Route Handler
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Default Title';
  const description = searchParams.get('desc') || '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{
          fontSize: 56,
          fontWeight: 800,
          color: '#f8fafc',
          lineHeight: 1.2,
          marginBottom: 20,
        }}>
          {title}
        </div>
        {description && (
          <div style={{
            fontSize: 24,
            color: '#94a3b8',
            lineHeight: 1.5,
          }}>
            {description}
          </div>
        )}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 'auto',
          fontSize: 20,
          color: '#64748b',
        }}>
          example.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

// Usage in metadata:
// openGraph: { images: [\`/api/og?title=\${encodeURIComponent(post.title)}\`] }`}</code></pre>

      <h3 style={h3Style}>{t.h3_dynamic_canvas}</h3>
      <pre style={codeStyle}><code>{`// scripts/generate-og-images.ts — Build-time generation
import { createCanvas, registerFont } from 'canvas';
import fs from 'fs';
import path from 'path';

registerFont('fonts/Inter-Bold.ttf', { family: 'Inter', weight: 'bold' });

interface OGConfig {
  title: string;
  slug: string;
  theme?: string;
}

function generateOGImage(config: OGConfig): Buffer {
  const { title, theme = '#0f172a' } = config;
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, theme);
  gradient.addColorStop(1, '#1e293b');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Title text
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 52px Inter';
  const words = title.split(' ');
  let line = '';
  let y = 240;
  for (const word of words) {
    const test = line + word + ' ';
    if (ctx.measureText(test).width > 1040) {
      ctx.fillText(line.trim(), 80, y);
      line = word + ' ';
      y += 70;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), 80, y);

  // Site name
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 24px Inter';
  ctx.fillText('example.com', 80, 560);

  return canvas.toBuffer('image/png');
}

// Generate for all posts
const posts: OGConfig[] = [
  { title: 'How to Build a REST API with Node.js', slug: 'rest-api-nodejs' },
  { title: 'TypeScript Generics Explained', slug: 'typescript-generics' },
];

for (const post of posts) {
  const buffer = generateOGImage(post);
  const outPath = path.join('public', 'og', \`\${post.slug}.png\`);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buffer);
  console.log(\`Generated: \${outPath}\`);
}`}</code></pre>

      <h3 style={h3Style}>{t.h3_dynamic_cloudinary}</h3>
      <pre style={codeStyle}><code>{`// Using Cloudinary URL-based image transformations
// No server-side code needed — just construct the URL

function getCloudinaryOGImage(title: string): string {
  const cloudName = 'your-cloud-name';
  const baseImage = 'og-template.png';  // Upload a background template first

  // URL-encode the title
  const encodedTitle = encodeURIComponent(title);

  // Cloudinary text overlay transformation
  return [
    \`https://res.cloudinary.com/\${cloudName}/image/upload\`,
    // Resize to OG dimensions
    'w_1200,h_630,c_fill',
    // Add text overlay
    \`l_text:Inter_52_bold:\${encodedTitle}\`,
    'co_rgb:f8fafc',       // Text color
    'g_west',              // Left-align
    'x_80,y_-40',          // Position
    'w_1040,c_fit',        // Max text width
    // Base image
    baseImage,
  ].join('/');
}

// Usage:
// <meta property="og:image"
//   content={getCloudinaryOGImage('How to Build a REST API with Node.js')} />

// Result URL looks like:
// https://res.cloudinary.com/your-cloud-name/image/upload/
//   w_1200,h_630,c_fill/
//   l_text:Inter_52_bold:How%20to%20Build%20a%20REST%20API/
//   co_rgb:f8fafc,g_west,x_80,y_-40,w_1040,c_fit/
//   og-template.png`}</code></pre>

      {/* Section 9: FAQ */}
      <h2 style={h2Style}>{t.h2_faq}</h2>

      {[
        { q: t.faq1q, a: t.faq1a },
        { q: t.faq2q, a: t.faq2a },
        { q: t.faq3q, a: t.faq3a },
        { q: t.faq4q, a: t.faq4a },
        { q: t.faq5q, a: t.faq5a },
        { q: t.faq6q, a: t.faq6a },
      ].map((faq, i) => (
        <div key={i} style={{ marginBottom: 24 }}>
          <h3 style={{ ...h3Style, marginBottom: 8 }}>{faq.q}</h3>
          <p style={pStyle} dangerouslySetInnerHTML={{ __html: faq.a }} />
        </div>
      ))}

      {/* Bottom CTA */}
      <div style={{ marginTop: 48, padding: 24, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', textAlign: 'center' }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
          <a href={`/${lang}/tools/meta-tags`} style={linkStyle}>{t.linkToolBottom}</a>
        </p>
      </div>
    </div>
  );
}
