import { notFound } from 'next/navigation';
import { i18n, type Locale } from '@/i18n/config';
import { getDictionary, getUIDictionary } from '@/i18n/getDictionary';
import { LangProvider } from '@/i18n/LangContext';
import { tools, type Tool } from '@/lib/tools';
import Link from 'next/link';
import type { Metadata } from 'next';

// Category filter configuration
const categoryConfigs: Record<string, {
  filterCategories: string[];
  filterKeywords: string[];
}> = {
  'json-tools': { filterCategories: ['json'], filterKeywords: ['json'] },
  'css-tools': { filterCategories: ['css'], filterKeywords: ['css', 'tailwind'] },
  'converter-tools': { filterCategories: ['converter'], filterKeywords: [] },
  'encoder-decoder-tools': { filterCategories: ['encoder', 'encoding'], filterKeywords: ['encode', 'decode', 'hash'] },
  'formatter-tools': { filterCategories: ['formatter'], filterKeywords: ['formatter', 'beautifier', 'prettifier'] },
  'generator-tools': { filterCategories: ['generator', 'generators'], filterKeywords: ['generator'] },
  'text-tools': { filterCategories: ['text'], filterKeywords: ['text', 'string', 'word', 'character', 'counter', 'diff'] },
  'web-tools': { filterCategories: ['web', 'network'], filterKeywords: ['http', 'api', 'dns', 'cors', 'webhook', 'meta-tag', 'og-', 'sitemap', 'robots'] },
  'image-tools': { filterCategories: [], filterKeywords: ['image', 'img', 'png', 'jpg', 'svg', 'webp', 'favicon', 'icon', 'color', 'pixel'] },
  'security-tools': { filterCategories: [], filterKeywords: ['hash', 'password', 'jwt', 'bcrypt', 'hmac', 'sha', 'md5', 'ssl', 'cert', 'saml', 'oauth', 'totp', 'htpasswd', 'pem'] },
  'devops-tools': { filterCategories: ['developer'], filterKeywords: ['docker', 'kubernetes', 'nginx', 'terraform', 'helm', 'systemd', 'cron', 'git', 'dockerfile', 'github-actions', 'openapi'] },
  'markdown-tools': { filterCategories: ['markdown'], filterKeywords: ['markdown', 'md-'] },
};

const validSlugs = Object.keys(categoryConfigs);

// SEO metadata per category per language
const categoryMeta: Record<string, Record<string, { title: string; description: string; h1: string }>> = {
  'json-tools': {
    en: { title: 'Free Online JSON Tools - Formatter, Validator, Converter & More', description: 'Collection of 50+ free online JSON tools: formatter, validator, converter, diff checker, schema generator, and more. No signup required.', h1: 'Free Online JSON Tools' },
    zh: { title: '免费在线 JSON 工具合集 - 格式化、验证、转换', description: '50+ 免费在线 JSON 工具：格式化器、验证器、转换器、差异比较、Schema 生成器等。无需注册。', h1: '免费在线 JSON 工具' },
    ja: { title: '無料オンラインJSONツール集 - フォーマッター・バリデーター・コンバーター', description: '50以上の無料オンラインJSONツール：フォーマッター、バリデーター、コンバーターなど。登録不要。', h1: '無料オンラインJSONツール' },
    ko: { title: '무료 온라인 JSON 도구 모음 - 포매터, 검증기, 변환기', description: '50개 이상의 무료 온라인 JSON 도구: 포매터, 검증기, 변환기 등. 가입 불필요.', h1: '무료 온라인 JSON 도구' },
    fr: { title: 'Outils JSON en ligne gratuits - Formateur, Validateur, Convertisseur', description: 'Plus de 50 outils JSON gratuits en ligne : formateur, validateur, convertisseur et plus encore.', h1: 'Outils JSON en ligne gratuits' },
    de: { title: 'Kostenlose Online JSON-Tools - Formatierer, Validator, Konverter', description: 'Über 50 kostenlose Online JSON-Tools: Formatierer, Validator, Konverter und mehr. Keine Anmeldung nötig.', h1: 'Kostenlose Online JSON-Tools' },
    es: { title: 'Herramientas JSON en línea gratuitas - Formateador, Validador, Convertidor', description: 'Más de 50 herramientas JSON gratuitas en línea: formateador, validador, convertidor y más.', h1: 'Herramientas JSON gratuitas' },
    pt: { title: 'Ferramentas JSON Online Gratuitas - Formatador, Validador, Conversor', description: 'Mais de 50 ferramentas JSON gratuitas online: formatador, validador, conversor e mais.', h1: 'Ferramentas JSON Online Gratuitas' },
    it: { title: 'Strumenti JSON Online Gratuiti - Formattatore, Validatore, Convertitore', description: 'Oltre 50 strumenti JSON gratuiti online: formattatore, validatore, convertitore e altro.', h1: 'Strumenti JSON Online Gratuiti' },
  },
  'css-tools': {
    en: { title: 'Free Online CSS Tools - Generators, Converters & Formatters', description: 'Free CSS tools: gradient generator, flexbox playground, grid generator, Tailwind converter, animation builder, and more.', h1: 'Free Online CSS Tools' },
    zh: { title: '免费在线 CSS 工具 - 生成器、转换器、格式化', description: '免费 CSS 工具：渐变生成器、Flexbox 工具、Grid 生成器、Tailwind 转换器、动画构建器等。', h1: '免费在线 CSS 工具' },
  },
  'converter-tools': {
    en: { title: 'Free Online Code & Data Converters - 100+ Format Converters', description: 'Convert between data formats instantly: JSON to YAML, XML to JSON, TypeScript to JavaScript, and 100+ more converters. Free, no signup.', h1: 'Free Online Code & Data Converters' },
    zh: { title: '免费在线代码和数据转换器 - 100+ 格式转换工具', description: '即时转换各种数据格式：JSON 转 YAML、XML 转 JSON、TypeScript 转 JavaScript 等。', h1: '免费在线代码和数据转换工具' },
  },
  'encoder-decoder-tools': {
    en: { title: 'Free Online Encoder & Decoder Tools - Base64, URL, Hash & More', description: 'Encode and decode data online: Base64, URL encoding, HTML entities, hashing (MD5, SHA-256), JWT, and more.', h1: 'Free Online Encoder & Decoder Tools' },
    zh: { title: '免费在线编码解码工具 - Base64、URL、Hash 等', description: '在线编码和解码数据：Base64、URL 编码、HTML 实体、哈希（MD5、SHA-256）、JWT 等。', h1: '免费在线编码解码工具' },
  },
  'formatter-tools': {
    en: { title: 'Free Online Code Formatters & Beautifiers - JSON, SQL, HTML, CSS', description: 'Format and beautify your code online: JSON, SQL, HTML, CSS, XML, JavaScript, Python formatters. Free code formatting tools.', h1: 'Free Online Code Formatters & Beautifiers' },
    zh: { title: '免费在线代码格式化工具 - JSON、SQL、HTML、CSS', description: '在线格式化和美化代码：JSON、SQL、HTML、CSS、XML、JavaScript 格式化。', h1: '免费在线代码格式化工具' },
  },
  'generator-tools': {
    en: { title: 'Free Online Generator Tools - UUID, Password, QR Code & More', description: 'Generate UUIDs, passwords, QR codes, lorem ipsum, fake data, hashes, and more. All generators are free with no signup.', h1: 'Free Online Generator Tools' },
    zh: { title: '免费在线生成器工具 - UUID、密码、二维码等', description: '生成 UUID、密码、二维码、占位文本、模拟数据、哈希等。所有生成器工具免费无需注册。', h1: '免费在线生成器工具' },
  },
  'text-tools': {
    en: { title: 'Free Online Text Tools - Counter, Diff Checker, Converter & More', description: 'Online text tools: word counter, text diff checker, case converter, line sorter, regex tester, ASCII converter, and more.', h1: 'Free Online Text Tools' },
    zh: { title: '免费在线文本工具 - 计数器、差异比较、转换等', description: '在线文本处理工具：字数统计、文本差异比较、大小写转换、行排序、正则测试等。', h1: '免费在线文本工具' },
  },
  'web-tools': {
    en: { title: 'Free Online Web Developer Tools - HTTP, API, DNS & SEO Tools', description: 'Web development utilities: HTTP header checker, API tester, DNS lookup, CORS tester, meta tag generator, robots.txt generator, and more.', h1: 'Free Online Web Developer Tools' },
    zh: { title: '免费在线 Web 开发工具 - HTTP、API、DNS、SEO', description: 'Web 开发工具：HTTP 头检查、API 测试、DNS 查询、CORS 测试、Meta 标签生成器等。', h1: '免费在线 Web 开发工具' },
  },
  'image-tools': {
    en: { title: 'Free Online Image Tools - Converter, Compressor, Resizer & Color Tools', description: 'Process images online: format conversion, compression, resizing, cropping, favicon generation, Base64 encoding, and color tools.', h1: 'Free Online Image & Color Tools' },
    zh: { title: '免费在线图片工具 - 转换、压缩、调整大小、颜色工具', description: '在线处理图片：格式转换、压缩、调整大小、裁剪、图标生成、Base64 编码和颜色工具。', h1: '免费在线图片和颜色工具' },
  },
  'security-tools': {
    en: { title: 'Free Online Security Tools - Hash, JWT, SSL, Password & Encryption', description: 'Online security tools: hash generators (MD5, SHA), JWT decoder, password generator, SSL checker, bcrypt, HMAC, and more.', h1: 'Free Online Security Tools' },
    zh: { title: '免费在线安全工具 - 哈希、JWT、SSL、密码、加密', description: '在线安全工具：哈希生成器（MD5、SHA）、JWT 解码器、密码生成器、SSL 检查、bcrypt 等。', h1: '免费在线安全工具' },
  },
  'devops-tools': {
    en: { title: 'Free Online DevOps Tools - Docker, Kubernetes, Nginx, Terraform & CI/CD', description: 'DevOps utilities: Docker Compose generator, Kubernetes YAML validator, Nginx config, Terraform formatter, GitHub Actions, and more.', h1: 'Free Online DevOps Tools' },
    zh: { title: '免费在线 DevOps 工具 - Docker、K8s、Nginx、Terraform', description: 'DevOps 工具：Docker Compose 生成器、K8s YAML 验证、Nginx 配置、Terraform 格式化等。', h1: '免费在线 DevOps 工具' },
  },
  'markdown-tools': {
    en: { title: 'Free Online Markdown Tools - Editor, Preview, Converter & More', description: 'Markdown tools: live editor, preview, table generator, HTML converter, link checker, and PDF export. Free markdown utilities.', h1: 'Free Online Markdown Tools' },
    zh: { title: '免费在线 Markdown 工具 - 编辑器、预览、转换', description: 'Markdown 在线工具：实时编辑器、预览、表格生成、HTML 转换、链接检查、PDF 导出。', h1: '免费在线 Markdown 工具' },
  },
};

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of i18n.locales) {
    for (const slug of validSlugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

function getToolsForCategory(slug: string): Tool[] {
  const config = categoryConfigs[slug];
  if (!config) return [];

  const seen = new Set<string>();
  return tools.filter(tool => {
    if (seen.has(tool.id)) return false;
    let match = false;
    if (config.filterCategories.length > 0 && config.filterCategories.includes(tool.category)) {
      match = true;
    }
    if (!match && config.filterKeywords.length > 0) {
      match = config.filterKeywords.some(kw =>
        tool.id.toLowerCase().includes(kw) ||
        tool.name.toLowerCase().includes(kw) ||
        (tool.keywords && tool.keywords.some((k: string) => k.toLowerCase().includes(kw)))
      );
    }
    if (match) seen.add(tool.id);
    return match;
  });
}

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!validSlugs.includes(slug)) return {};

  const meta = categoryMeta[slug]?.[lang] || categoryMeta[slug]?.['en'];
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://viadreams.cc/${lang}/category/${slug}`,
      languages: Object.fromEntries(
        i18n.locales.map(l => [l, `https://viadreams.cc/${l}/category/${slug}`])
      ),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://viadreams.cc/${lang}/category/${slug}`,
      siteName: 'DevToolBox',
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { lang: rawLang, slug } = await params;

  if (!i18n.locales.includes(rawLang as Locale) || !validSlugs.includes(slug)) {
    notFound();
  }

  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);
  const ui = await getUIDictionary(lang);
  const categoryTools = getToolsForCategory(slug);
  const meta = categoryMeta[slug]?.[lang] || categoryMeta[slug]?.['en'];

  const isZh = lang === 'zh';

  // JSON-LD CollectionPage + ItemList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: meta?.title || slug,
        description: meta?.description || '',
        url: `https://viadreams.cc/${lang}/category/${slug}`,
      },
      {
        '@type': 'ItemList',
        numberOfItems: categoryTools.length,
        itemListElement: categoryTools.slice(0, 50).map((tool, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `https://viadreams.cc/${lang}/tools/${tool.id}`,
          name: dict.tools?.[tool.id]?.name || tool.name,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `https://viadreams.cc/${lang}` },
          { '@type': 'ListItem', position: 2, name: meta?.h1 || slug, item: `https://viadreams.cc/${lang}/category/${slug}` },
        ],
      },
    ],
  };

  const toolCount = categoryTools.length;

  return (
    <LangProvider lang={lang} dict={{...dict, ...ui}}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-gray-400" aria-label="Breadcrumb">
          <Link href={`/${lang}`} className="hover:text-blue-400 transition-colors">Home</Link>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-gray-200">{meta?.h1 || slug}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {meta?.h1 || slug}
        </h1>
        <p className="text-gray-400 mb-2 max-w-3xl text-lg">
          {meta?.description || ''}
        </p>
        <p className="text-sm text-gray-500 mb-8">
          {isZh ? `${toolCount} 个工具可用` : `${toolCount} tools available`}
        </p>

        {/* Tools grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryTools.map(tool => {
            const toolDict = dict.tools?.[tool.id];
            return (
              <Link
                key={tool.id}
                href={`/${lang}/tools/${tool.id}`}
                className="group block p-5 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800/80 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{tool.icon}</span>
                  <div className="min-w-0">
                    <h2 className="text-white font-medium group-hover:text-blue-400 transition-colors truncate">
                      {toolDict?.name || tool.name}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {toolDict?.description || tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* SEO content block */}
        <section className="mt-16 border-t border-gray-800 pt-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            {isZh ? `关于${meta?.h1 || '这些工具'}` : `About ${meta?.h1 || 'These Tools'}`}
          </h2>
          <div className="text-gray-400 space-y-3 max-w-3xl">
            <p>
              {isZh
                ? `DevToolBox 提供一系列免费的在线开发者工具，帮助你高效完成日常开发任务。此分类下共有 ${toolCount} 个工具，全部在浏览器中运行，无需安装任何软件。你的数据不会发送到服务器，确保隐私安全。`
                : `DevToolBox provides a collection of free online developer tools to help you efficiently complete everyday development tasks. This category includes ${toolCount} tools, all running directly in your browser with no installation required. Your data stays on your device and is never sent to our servers, ensuring complete privacy.`
              }
            </p>
            <p>
              {isZh
                ? '所有工具完全免费，无需注册或登录。支持 15 种语言，随时随地使用。'
                : 'All tools are completely free with no registration or login required. Available in 15 languages for developers worldwide.'
              }
            </p>
          </div>
        </section>

        {/* Cross-linking to other categories */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            {isZh ? '浏览其他工具类别' : 'Browse Other Tool Categories'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {validSlugs.filter(s => s !== slug).map(s => {
              const sMeta = categoryMeta[s]?.[lang] || categoryMeta[s]?.['en'];
              return (
                <Link
                  key={s}
                  href={`/${lang}/category/${s}`}
                  className="px-3 py-1.5 rounded-full bg-gray-800 border border-gray-700 text-sm text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all"
                >
                  {sMeta?.h1 || s}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </LangProvider>
  );
}
