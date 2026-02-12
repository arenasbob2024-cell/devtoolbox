'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLang } from '@/i18n/LangContext';
import { getLocalizedPost, blogPosts } from '@/data/blog-posts';
import { tools } from '@/lib/tools';
import { i18n, type Locale } from '@/i18n/config';
import AdSlot from '@/components/AdSlot';
import NewsletterSignup from '@/components/NewsletterSignup';

/* ---------- lazy-load article bodies ---------- */
import UuidComparison from '@/data/posts/uuid-v4-vs-v7-vs-ulid';
import CronServerless from '@/data/posts/cron-schedule-serverless';
import Base64Uses from '@/data/posts/base64-encoding-real-world-uses';
import RegexPatterns from '@/data/posts/regex-patterns-copy-paste';
import DockerYamlErrors from '@/data/posts/docker-compose-yaml-errors';
import JsonToTsGuide from '@/data/posts/json-to-typescript-complete-guide';
import HtmlToJsxGuide from '@/data/posts/html-to-jsx-react-migration';
import JsonToGoGuide from '@/data/posts/json-to-go-struct-guide';
import CssToTailwindGuide from '@/data/posts/css-to-tailwind-migration';
import SvgOptimization from '@/data/posts/svg-optimization-react';
import JsonSchemaGuide from '@/data/posts/json-schema-validation-guide';
import TsVsJsGuide from '@/data/posts/typescript-vs-javascript-when-to-convert';
import GraphqlTypeGen from '@/data/posts/graphql-type-generation';
import RegexCheatSheet from '@/data/posts/regex-cheat-sheet';
import GitCommandsCheatSheet from '@/data/posts/git-commands-cheat-sheet';
import HttpStatusCodesRef from '@/data/posts/http-status-codes-reference';
import CssGradientGuide from '@/data/posts/css-gradient-guide';
import MetaTagsGuide from '@/data/posts/meta-tags-guide';
import ChmodPermissions from '@/data/posts/chmod-permissions-explained';
import CronExpressionExamples from '@/data/posts/cron-expression-examples';
import JsonVsYamlVsToml from '@/data/posts/json-vs-yaml-vs-toml';
import JwtTokenExplained from '@/data/posts/jwt-token-explained';
import CssFlexboxCheatSheet from '@/data/posts/css-flexbox-cheat-sheet';
import JsonToDartFlutterGuide from '@/data/posts/json-to-dart-flutter-guide';
import YamlSyntaxValidationGuide from '@/data/posts/yaml-syntax-validation-guide';
import NginxConfigExamples from '@/data/posts/nginx-config-examples';
import DockerComposeCheatSheet from '@/data/posts/docker-compose-cheat-sheet';
import CspHeaderGuide from '@/data/posts/csp-header-guide';
import SqlJoinsVisualGuide from '@/data/posts/sql-joins-explained-visual-guide';
import GitRebaseVsMerge from '@/data/posts/git-rebase-vs-merge-explained';
import TailwindCssCheatSheet from '@/data/posts/tailwind-css-cheat-sheet';
import TypescriptGenericsExplained from '@/data/posts/typescript-generics-explained';
import RestApiBestPractices from '@/data/posts/rest-api-best-practices-guide';
import CorsErrorsGuide from '@/data/posts/how-to-fix-cors-errors-complete-guide';
import NpmVsYarnVsPnpmVsBun from '@/data/posts/npm-vs-yarn-vs-pnpm-vs-bun-comparison';
import DotenvBestPractices from '@/data/posts/dotenv-environment-variables-best-practices';
import FaviconGuide from '@/data/posts/favicon-guide-sizes-formats-generator';
import CurlCheatSheet from '@/data/posts/curl-command-cheat-sheet-examples';
import BcryptVsArgon2 from '@/data/posts/bcrypt-vs-argon2-vs-scrypt-password-hashing';
import NpmInstallErrors from '@/data/posts/npm-install-errors-fix-guide';
import HtaccessRedirectCheatSheet from '@/data/posts/htaccess-redirect-cheat-sheet-examples';
import DockerComposeSecrets from '@/data/posts/docker-compose-secrets-environment-variables-guide';
import OpenGraphTwitterCard from '@/data/posts/open-graph-twitter-card-meta-tags-guide';
import Base64CommandLine from '@/data/posts/base64-encode-decode-command-line';
import JsonParseError from '@/data/posts/json-parse-error-unexpected-token';
import YamlMultilineString from '@/data/posts/yaml-multiline-string-block-folded';
import GitUndoLastCommit from '@/data/posts/git-undo-last-commit-keep-changes';
import UrlEncodeCharacters from '@/data/posts/url-encode-special-characters-list';
import RegexMatchPatterns from '@/data/posts/regex-match-email-phone-url-patterns';
import UnixTimestampToDate from '@/data/posts/unix-timestamp-to-date-conversion';
import CssTextGradient from '@/data/posts/css-text-gradient-examples';
import HtmlEntitiesList from '@/data/posts/html-special-characters-entities-list';
import JwtDecodeNoLib from '@/data/posts/jwt-decode-without-library';
import QrCodeBestPractices from '@/data/posts/qr-code-size-format-best-practices';
import JsStringReplaceRegex from '@/data/posts/javascript-string-replace-regex';
import DockerEnvFile from '@/data/posts/docker-env-file-vs-environment';
import IpSubnetCidr from '@/data/posts/ip-subnet-mask-cidr-explained';
import MarkdownCheatSheetGithub from '@/data/posts/markdown-cheat-sheet-github-readme';
import PasswordStrength2025 from '@/data/posts/password-strength-requirements-2025';
import SvgViewboxExplained from '@/data/posts/svg-viewbox-width-height-explained';
import XmlVsJson from '@/data/posts/xml-vs-json-comparison';
import Base64ImageEmbed from '@/data/posts/base64-image-embed-html-css';
import SqlFormattingGuide from '@/data/posts/sql-formatting-best-practices';

const postComponents: Record<string, React.ComponentType<{ lang: string }>> = {
  'uuid-v4-vs-v7-vs-ulid-vs-nanoid': UuidComparison,
  'cron-schedule-serverless-github-actions-vercel-cloudflare': CronServerless,
  'base64-encoding-real-world-uses': Base64Uses,
  'regex-patterns-copy-paste-ready': RegexPatterns,
  'docker-compose-yaml-errors': DockerYamlErrors,
  'json-to-typescript-complete-guide': JsonToTsGuide,
  'html-to-jsx-react-migration': HtmlToJsxGuide,
  'json-to-go-struct-guide': JsonToGoGuide,
  'css-to-tailwind-migration': CssToTailwindGuide,
  'svg-optimization-react': SvgOptimization,
  'json-schema-validation-guide': JsonSchemaGuide,
  'typescript-vs-javascript-when-to-convert': TsVsJsGuide,
  'graphql-type-generation': GraphqlTypeGen,
  'regex-cheat-sheet': RegexCheatSheet,
  'git-commands-cheat-sheet': GitCommandsCheatSheet,
  'http-status-codes-reference': HttpStatusCodesRef,
  'css-gradient-guide': CssGradientGuide,
  'meta-tags-guide': MetaTagsGuide,
  'chmod-permissions-explained': ChmodPermissions,
  'cron-expression-examples': CronExpressionExamples,
  'json-vs-yaml-vs-toml': JsonVsYamlVsToml,
  'jwt-token-explained': JwtTokenExplained,
  'css-flexbox-cheat-sheet': CssFlexboxCheatSheet,
  'json-to-dart-flutter-guide': JsonToDartFlutterGuide,
  'yaml-syntax-validation-guide': YamlSyntaxValidationGuide,
  'nginx-config-examples': NginxConfigExamples,
  'docker-compose-cheat-sheet': DockerComposeCheatSheet,
  'csp-header-guide': CspHeaderGuide,
  'sql-joins-explained-visual-guide': SqlJoinsVisualGuide,
  'git-rebase-vs-merge-explained': GitRebaseVsMerge,
  'tailwind-css-cheat-sheet': TailwindCssCheatSheet,
  'typescript-generics-explained': TypescriptGenericsExplained,
  'rest-api-best-practices-guide': RestApiBestPractices,
  'how-to-fix-cors-errors-complete-guide': CorsErrorsGuide,
  'npm-vs-yarn-vs-pnpm-vs-bun-comparison': NpmVsYarnVsPnpmVsBun,
  'dotenv-environment-variables-best-practices': DotenvBestPractices,
  'favicon-guide-sizes-formats-generator': FaviconGuide,
  'curl-command-cheat-sheet-examples': CurlCheatSheet,
  'bcrypt-vs-argon2-vs-scrypt-password-hashing': BcryptVsArgon2,
  'npm-install-errors-fix-guide': NpmInstallErrors,
  'htaccess-redirect-cheat-sheet-examples': HtaccessRedirectCheatSheet,
  'docker-compose-secrets-environment-variables-guide': DockerComposeSecrets,
  'open-graph-twitter-card-meta-tags-guide': OpenGraphTwitterCard,
  'base64-encode-decode-command-line': Base64CommandLine,
  'json-parse-error-unexpected-token': JsonParseError,
  'yaml-multiline-string-block-folded': YamlMultilineString,
  'git-undo-last-commit-keep-changes': GitUndoLastCommit,
  'url-encode-special-characters-list': UrlEncodeCharacters,
  'regex-match-email-phone-url-patterns': RegexMatchPatterns,
  'unix-timestamp-to-date-conversion': UnixTimestampToDate,
  'css-text-gradient-examples': CssTextGradient,
  'html-special-characters-entities-list': HtmlEntitiesList,
  'jwt-decode-without-library': JwtDecodeNoLib,
  'qr-code-size-format-best-practices': QrCodeBestPractices,
  'javascript-string-replace-regex': JsStringReplaceRegex,
  'docker-env-file-vs-environment': DockerEnvFile,
  'ip-subnet-mask-cidr-explained': IpSubnetCidr,
  'markdown-cheat-sheet-github-readme': MarkdownCheatSheetGithub,
  'password-strength-requirements-2025': PasswordStrength2025,
  'svg-viewbox-width-height-explained': SvgViewboxExplained,
  'xml-vs-json-comparison': XmlVsJson,
  'base64-image-embed-html-css': Base64ImageEmbed,
  'sql-formatting-best-practices': SqlFormattingGuide,
};

/* i18n for UI strings on this page */
const ui: Record<string, { home: string; blog: string; relatedTools: string; relatedArticles: string; by: string }> = {
  en: { home: 'Home', blog: 'Blog', relatedTools: 'Try These Related Tools', relatedArticles: 'Related Articles', by: 'by' },
  fr: { home: 'Accueil', blog: 'Blog', relatedTools: 'Essayez ces outils associés', relatedArticles: 'Articles connexes', by: 'par' },
  de: { home: 'Startseite', blog: 'Blog', relatedTools: 'Verwandte Tools ausprobieren', relatedArticles: 'Verwandte Artikel', by: 'von' },
  it: { home: 'Home', blog: 'Blog', relatedTools: 'Prova questi strumenti correlati', relatedArticles: 'Articoli correlati', by: 'di' },
  es: { home: 'Inicio', blog: 'Blog', relatedTools: 'Prueba estas herramientas relacionadas', relatedArticles: 'Artículos relacionados', by: 'por' },
  zh: { home: '首页', blog: '博客', relatedTools: '试试这些相关工具', relatedArticles: '相关文章', by: '作者' },
  id: { home: 'Beranda', blog: 'Blog', relatedTools: 'Coba Alat Terkait', relatedArticles: 'Artikel Terkait', by: 'oleh' },
  th: { home: 'หน้าแรก', blog: 'บล็อก', relatedTools: 'ลองเครื่องมือที่เกี่ยวข้อง', relatedArticles: 'บทความที่เกี่ยวข้อง', by: 'โดย' },
};

export default function BlogPostPage() {
  const params = useParams();
  const { lang: contextLang } = useLang();
  const slug = params.slug as string;
  // Prefer lang from URL - ensures article body and metadata use correct language
  const lang = (params?.lang && i18n.locales.includes(params.lang as Locale) ? params.lang : contextLang) as Locale;
  const post = getLocalizedPost(slug, lang);
  const uiText = ui[lang] || ui['en'];

  if (!post) {
    return (
      <div style={{ maxWidth: 800, margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800 }}>Post Not Found</h1>
        <Link href={`/${lang}/blog`} style={{ color: 'var(--accent-blue)' }}>← {uiText.blog}</Link>
      </div>
    );
  }

  const PostContent = postComponents[slug];
  const relatedToolsList = post.relatedTools.map(id => tools.find(t => t.id === id)).filter(Boolean);
  const relatedPostsList = post.relatedPosts
    .map(s => getLocalizedPost(s, lang) || blogPosts.find(p => p.slug === s))
    .filter(Boolean);

  /* JSON-LD Article Schema */
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: lang,
    author: { '@type': 'Organization', name: post.author, url: 'https://viadreams.cc' },
    publisher: { '@type': 'Organization', name: 'DevToolBox', url: 'https://viadreams.cc' },
    mainEntityOfPage: `https://viadreams.cc/${lang}/blog/${slug}`,
    image: 'https://viadreams.cc/og-image.png',
    keywords: post.keywords.join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: uiText.home, item: `https://viadreams.cc/${lang}` },
      { '@type': 'ListItem', position: 2, name: uiText.blog, item: `https://viadreams.cc/${lang}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://viadreams.cc/${lang}/blog/${slug}` },
    ],
  };

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '30px 24px 60px' }}>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24, display: 'flex', gap: 8 }}>
        <Link href={`/${lang}`} style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>{uiText.home}</Link>
        <span>/</span>
        <Link href={`/${lang}/blog`} style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>{uiText.blog}</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-secondary)' }}>{post.title.length > 50 ? post.title.slice(0, 50) + '...' : post.title}</span>
      </nav>

      {/* Article Header */}
      <header style={{ marginBottom: 32 }}>
        <h1 style={{
          fontSize: 34,
          fontWeight: 800,
          lineHeight: 1.2,
          marginBottom: 16,
          color: 'var(--text-primary)',
        }}>
          {post.title}
        </h1>
        <div style={{ display: 'flex', gap: 16, fontSize: 14, color: 'var(--text-secondary)' }}>
          <time>{post.date}</time>
          <span>{post.readingTime}</span>
          <span>{uiText.by} {post.author}</span>
        </div>
      </header>

      <AdSlot size="leaderboard" />

      {/* Article Body */}
      <article className="blog-article" style={{ marginTop: 24 }}>
        {PostContent ? <PostContent lang={lang} /> : <p>Content not available.</p>}
      </article>

      {/* Newsletter */}
      <NewsletterSignup variant="wide" />

      {/* Related Tools CTA */}
      {relatedToolsList.length > 0 && (
        <div style={{
          marginTop: 40,
          padding: 24,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))',
          borderRadius: 12,
          border: '1px solid rgba(59,130,246,0.2)',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
            {uiText.relatedTools}
          </h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {relatedToolsList.map(tool => tool && (
              <Link
                key={tool.id}
                href={`/${lang}${tool.path}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 18px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--accent-blue)',
                  transition: 'border-color 0.2s',
                }}
              >
                <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{tool.icon}</span>
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <AdSlot size="leaderboard" style={{ marginTop: 30 }} />

      {/* Related Posts */}
      {relatedPostsList.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{uiText.relatedArticles}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {relatedPostsList.map(rp => rp && (
              <Link
                key={rp.slug}
                href={`/${lang}/blog/${rp.slug}`}
                style={{
                  display: 'block',
                  padding: 20,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 10,
                  textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}
              >
                <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                  {rp.title}
                </h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  {rp.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
