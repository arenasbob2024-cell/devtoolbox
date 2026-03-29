import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output: creates minimal production server, saves ~700MB (no full node_modules needed)
  output: 'standalone',
  // 跳过 TypeScript 和 ESLint 检查以减少构建内存
  typescript: { ignoreBuildErrors: true },
  // better-sqlite3 是原生模块，只在服务端运行，不打包进客户端
  serverExternalPackages: ['better-sqlite3'],
  // ==========================================
  // 图片优化配置
  // ==========================================
  images: {
    // 禁用 unoptimized 模式，启用 Next.js 图片优化
    unoptimized: false,
    
    // 支持的图片格式（按优先级排序）
    // avif: 最优压缩率，但编码较慢
    // webp: 广泛支持，良好压缩率
    formats: ['image/avif', 'image/webp'],
    
    // 设备响应式图片尺寸
    // 覆盖常见的设备视口宽度
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // 图片组件尺寸
    // 用于 layout="fixed" 或 layout="intrinsic" 的图片
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // 图片缓存时间（秒）
    // 30天 = 2592000秒
    minimumCacheTTL: 2592000,
    
    // 允许的图片域名（如需从外部加载图片）
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'example.com',
    //   },
    // ],
    
    // 禁用静态导入图片的优化（如果需要）
    // disableStaticImages: false,
  },

  // ==========================================
  // URL 和路由配置
  // ==========================================
  // 启用尾部斜杠，统一 URL 格式
  trailingSlash: true,
  
  // ==========================================
  // 安全和 HTTP 头配置
  // ==========================================
  // 禁用 X-Powered-By 头（安全最佳实践）
  poweredByHeader: false,
  
  // ==========================================
  // 压缩配置
  // ==========================================
  // 启用 gzip 压缩
  compress: true,
  
  // ==========================================
  // 实验性功能（可选）
  // ==========================================
  // 启用部分预渲染（Next.js 14+）
  // experimental: {
  //   ppr: true,
  // },
  
  // ==========================================
  // 重定向配置 - 将别名/变体页面重定向到核心工具页面
  // ==========================================
  async redirects() {
    return [
      { source: '/:lang/tools/ascii-art-generator', destination: '/:lang/tools/ascii-art', permanent: true },
      { source: '/:lang/tools/ascii-table-generator', destination: '/:lang/tools/csv-json', permanent: true },
      { source: '/:lang/tools/base64-decode', destination: '/:lang/tools/base64', permanent: true },
      { source: '/:lang/tools/base64-decoder', destination: '/:lang/tools/base64', permanent: true },
      { source: '/:lang/tools/base64-encode-online', destination: '/:lang/tools/base64', permanent: true },
      { source: '/:lang/tools/base64-encoder', destination: '/:lang/tools/base64', permanent: true },
      { source: '/:lang/tools/base64-encoder-decoder', destination: '/:lang/tools/base64', permanent: true },
      { source: '/:lang/tools/base64-image-converter', destination: '/:lang/tools/image-base64', permanent: true },
      { source: '/:lang/tools/base64-image-decoder', destination: '/:lang/tools/image-base64', permanent: true },
      { source: '/:lang/tools/base64-image-encoder', destination: '/:lang/tools/image-base64', permanent: true },
      { source: '/:lang/tools/base64-to-hex', destination: '/:lang/tools/base64', permanent: true },
      { source: '/:lang/tools/base64-to-image', destination: '/:lang/tools/image-base64', permanent: true },
      { source: '/:lang/tools/base64-vs-url-encoding', destination: '/:lang/tools/base64', permanent: true },
      { source: '/:lang/tools/binary-to-hex-converter', destination: '/:lang/tools/hex-to-binary', permanent: true },
      { source: '/:lang/tools/character-counter', destination: '/:lang/tools/word-counter', permanent: true },
      { source: '/:lang/tools/chmod-visualizer', destination: '/:lang/tools/chmod-calculator', permanent: true },
      { source: '/:lang/tools/color-blindness-simulator', destination: '/:lang/tools/color-converter', permanent: true },
      { source: '/:lang/tools/color-contrast-checker', destination: '/:lang/tools/color-converter', permanent: true },
      { source: '/:lang/tools/color-palette-generator', destination: '/:lang/tools/color-palette', permanent: true },
      { source: '/:lang/tools/color-picker-online', destination: '/:lang/tools/color-converter', permanent: true },
      { source: '/:lang/tools/cron-expression-generator', destination: '/:lang/tools/cron-parser', permanent: true },
      { source: '/:lang/tools/cron-expression-parser', destination: '/:lang/tools/cron-parser', permanent: true },
      { source: '/:lang/tools/cron-generator', destination: '/:lang/tools/cron-parser', permanent: true },
      { source: '/:lang/tools/cron-job-scheduler', destination: '/:lang/tools/cron-parser', permanent: true },
      { source: '/:lang/tools/cron-to-human', destination: '/:lang/tools/cron-parser', permanent: true },
      { source: '/:lang/tools/crontab-generator', destination: '/:lang/tools/cron-parser', permanent: true },
      { source: '/:lang/tools/crontab-guru', destination: '/:lang/tools/cron-parser', permanent: true },
      { source: '/:lang/tools/crontab-validator', destination: '/:lang/tools/cron-parser', permanent: true },
      { source: '/:lang/tools/csp-generator', destination: '/:lang/tools/htaccess-generator', permanent: true },
      { source: '/:lang/tools/css-animation-playground', destination: '/:lang/tools/css-animation-generator', permanent: true },
      { source: '/:lang/tools/css-beautifier', destination: '/:lang/tools/css-minifier', permanent: true },
      { source: '/:lang/tools/css-box-model-visualizer', destination: '/:lang/tools/flexbox-generator', permanent: true },
      { source: '/:lang/tools/css-flexbox-generator', destination: '/:lang/tools/flexbox-generator', permanent: true },
      { source: '/:lang/tools/css-formatter', destination: '/:lang/tools/css-minifier', permanent: true },
      { source: '/:lang/tools/css-gradient-generator', destination: '/:lang/tools/css-gradient', permanent: true },
      { source: '/:lang/tools/css-shadow-generator', destination: '/:lang/tools/box-shadow', permanent: true },
      { source: '/:lang/tools/css-triangle-generator', destination: '/:lang/tools/css-gradient', permanent: true },
      { source: '/:lang/tools/css-variables-generator', destination: '/:lang/tools/css-minifier', permanent: true },
      { source: '/:lang/tools/csv-to-json-converter', destination: '/:lang/tools/csv-json', permanent: true },
      { source: '/:lang/tools/csv-to-json-online', destination: '/:lang/tools/csv-json', permanent: true },
      { source: '/:lang/tools/curl-to-javascript', destination: '/:lang/tools/curl-to-code', permanent: true },
      { source: '/:lang/tools/dns-lookup-tool', destination: '/:lang/tools/dns-record-checker', permanent: true },
      { source: '/:lang/tools/docker-run-to-compose', destination: '/:lang/tools/docker-compose-generator', permanent: true },
      { source: '/:lang/tools/docker-vs-kubernetes', destination: '/:lang/tools/docker-compose-generator', permanent: true },
      { source: '/:lang/tools/email-validator-online', destination: '/:lang/tools/regex-tester', permanent: true },
      { source: '/:lang/tools/git-ignore-generator', destination: '/:lang/tools/gitignore-generator', permanent: true },
      { source: '/:lang/tools/hex-color-picker', destination: '/:lang/tools/color-converter', permanent: true },
      { source: '/:lang/tools/hex-to-rgb-converter', destination: '/:lang/tools/hex-to-rgb', permanent: true },
      { source: '/:lang/tools/hex-to-rgba', destination: '/:lang/tools/hex-to-rgb', permanent: true },
      { source: '/:lang/tools/html-beautifier', destination: '/:lang/tools/js-html-formatter', permanent: true },
      { source: '/:lang/tools/html-encoder-online', destination: '/:lang/tools/html-entity', permanent: true },
      { source: '/:lang/tools/html-entity-encoder', destination: '/:lang/tools/html-entity', permanent: true },
      { source: '/:lang/tools/html-minifier-online', destination: '/:lang/tools/js-html-formatter', permanent: true },
      { source: '/:lang/tools/html-table', destination: '/:lang/tools/csv-json', permanent: true },
      { source: '/:lang/tools/html-to-react', destination: '/:lang/tools/html-to-jsx', permanent: true },
      { source: '/:lang/tools/http-header-analyzer', destination: '/:lang/tools/http-status', permanent: true },
      { source: '/:lang/tools/http-header-checker', destination: '/:lang/tools/http-status', permanent: true },
      { source: '/:lang/tools/http-status-codes-reference', destination: '/:lang/tools/http-status', permanent: true },
      { source: '/:lang/tools/image-to-base64', destination: '/:lang/tools/image-base64', permanent: true },
      { source: '/:lang/tools/ip-address-lookup', destination: '/:lang/tools/ip-calculator', permanent: true },
      { source: '/:lang/tools/ip-lookup-tool', destination: '/:lang/tools/ip-calculator', permanent: true },
      { source: '/:lang/tools/ip-subnet-calculator', destination: '/:lang/tools/ip-calculator', permanent: true },
      { source: '/:lang/tools/ip-to-binary', destination: '/:lang/tools/ip-calculator', permanent: true },
      { source: '/:lang/tools/javascript-minifier', destination: '/:lang/tools/js-html-formatter', permanent: true },
      { source: '/:lang/tools/js-to-typescript-converter', destination: '/:lang/tools/json-to-typescript', permanent: true },
      { source: '/:lang/tools/json-beautifier', destination: '/:lang/tools/json-formatter', permanent: true },
      { source: '/:lang/tools/json-beautifier-online', destination: '/:lang/tools/json-formatter', permanent: true },
      { source: '/:lang/tools/json-diff-tool', destination: '/:lang/tools/text-diff', permanent: true },
      { source: '/:lang/tools/json-formatter-validator', destination: '/:lang/tools/json-formatter', permanent: true },
      { source: '/:lang/tools/json-minifier', destination: '/:lang/tools/json-formatter', permanent: true },
      { source: '/:lang/tools/json-minifier-online', destination: '/:lang/tools/json-formatter', permanent: true },
      { source: '/:lang/tools/json-minifier-online-new', destination: '/:lang/tools/json-formatter', permanent: true },
      { source: '/:lang/tools/json-minify-online', destination: '/:lang/tools/json-formatter', permanent: true },
      { source: '/:lang/tools/json-path-finder', destination: '/:lang/tools/json-viewer', permanent: true },
      { source: '/:lang/tools/json-path-tester', destination: '/:lang/tools/json-viewer', permanent: true },
      { source: '/:lang/tools/json-prettifier', destination: '/:lang/tools/json-formatter', permanent: true },
      { source: '/:lang/tools/json-schema-generator', destination: '/:lang/tools/json-to-json-schema', permanent: true },
      { source: '/:lang/tools/json-to-csv-converter', destination: '/:lang/tools/json-to-csv', permanent: true },
      { source: '/:lang/tools/json-to-mysql-schema', destination: '/:lang/tools/sql-to-prisma', permanent: true },
      { source: '/:lang/tools/json-to-typescript-online', destination: '/:lang/tools/json-to-typescript', permanent: true },
      { source: '/:lang/tools/json-to-xml-converter', destination: '/:lang/tools/json-to-xml', permanent: true },
      { source: '/:lang/tools/json-to-yaml', destination: '/:lang/tools/json-yaml', permanent: true },
      { source: '/:lang/tools/json-to-yaml-converter', destination: '/:lang/tools/json-yaml', permanent: true },
      { source: '/:lang/tools/json-to-zod-converter', destination: '/:lang/tools/json-to-zod', permanent: true },
      { source: '/:lang/tools/json-validator', destination: '/:lang/tools/json-formatter', permanent: true },
      { source: '/:lang/tools/json-validator-online', destination: '/:lang/tools/json-formatter', permanent: true },
      { source: '/:lang/tools/json-vs-xml', destination: '/:lang/tools/json-formatter', permanent: true },
      { source: '/:lang/tools/json-vs-yaml', destination: '/:lang/tools/json-yaml', permanent: true },
      { source: '/:lang/tools/jwt-debugger', destination: '/:lang/tools/jwt-decoder', permanent: true },
      { source: '/:lang/tools/jwt-decoder-online', destination: '/:lang/tools/jwt-decoder', permanent: true },
      { source: '/:lang/tools/jwt-generator', destination: '/:lang/tools/jwt-decoder', permanent: true },
      { source: '/:lang/tools/jwt-parser', destination: '/:lang/tools/jwt-decoder', permanent: true },
      { source: '/:lang/tools/jwt-token-decoder', destination: '/:lang/tools/jwt-decoder', permanent: true },
      { source: '/:lang/tools/jwt-validator', destination: '/:lang/tools/jwt-decoder', permanent: true },
      { source: '/:lang/tools/jwt-vs-session', destination: '/:lang/tools/jwt-decoder', permanent: true },
      { source: '/:lang/tools/lorem-ipsum-generator', destination: '/:lang/tools/lorem-ipsum', permanent: true },
      { source: '/:lang/tools/markdown-editor-online', destination: '/:lang/tools/markdown-preview', permanent: true },
      { source: '/:lang/tools/markdown-table-generator', destination: '/:lang/tools/csv-json', permanent: true },
      { source: '/:lang/tools/markdown-to-html-converter', destination: '/:lang/tools/markdown-to-html', permanent: true },
      { source: '/:lang/tools/markdown-to-html-online', destination: '/:lang/tools/markdown-to-html', permanent: true },
      { source: '/:lang/tools/md5-hash-generator', destination: '/:lang/tools/hash-generator', permanent: true },
      { source: '/:lang/tools/md5-vs-sha256', destination: '/:lang/tools/hash-generator', permanent: true },
      { source: '/:lang/tools/mysql-vs-postgresql', destination: '/:lang/tools/sql-formatter', permanent: true },
      { source: '/:lang/tools/nginx-config', destination: '/:lang/tools/htaccess-generator', permanent: true },
      { source: '/:lang/tools/npm-vs-yarn-vs-pnpm', destination: '/:lang/tools/json-formatter', permanent: true },
      { source: '/:lang/tools/number-base-converter', destination: '/:lang/tools/number-base', permanent: true },
      { source: '/:lang/tools/online-hash-generator', destination: '/:lang/tools/hash-generator', permanent: true },
      { source: '/:lang/tools/online-json-editor', destination: '/:lang/tools/json-formatter', permanent: true },
      { source: '/:lang/tools/open-graph-preview', destination: '/:lang/tools/og-image-preview', permanent: true },
      { source: '/:lang/tools/password-generator-online', destination: '/:lang/tools/password-generator', permanent: true },
      { source: '/:lang/tools/password-strength-checker', destination: '/:lang/tools/password-generator', permanent: true },
      { source: '/:lang/tools/percent-encoding-tool', destination: '/:lang/tools/url-encoder', permanent: true },
      { source: '/:lang/tools/pixel-to-rem-converter', destination: '/:lang/tools/em-px-converter', permanent: true },
      { source: '/:lang/tools/regex-builder', destination: '/:lang/tools/regex-tester', permanent: true },
      { source: '/:lang/tools/regex-checker', destination: '/:lang/tools/regex-tester', permanent: true },
      { source: '/:lang/tools/regex-generator', destination: '/:lang/tools/regex-tester', permanent: true },
      { source: '/:lang/tools/regex-matcher', destination: '/:lang/tools/regex-tester', permanent: true },
      { source: '/:lang/tools/regex-tester-online', destination: '/:lang/tools/regex-tester', permanent: true },
      { source: '/:lang/tools/responsive-breakpoint-tester', destination: '/:lang/tools/flexbox-generator', permanent: true },
      { source: '/:lang/tools/rest-vs-graphql', destination: '/:lang/tools/json-to-graphql', permanent: true },
      { source: '/:lang/tools/rgb-to-hex-converter', destination: '/:lang/tools/rgb-to-hex', permanent: true },
      { source: '/:lang/tools/robots-generator', destination: '/:lang/tools/htaccess-generator', permanent: true },
      { source: '/:lang/tools/schema-generator', destination: '/:lang/tools/meta-tag-generator', permanent: true },
      { source: '/:lang/tools/sha1-hash-generator', destination: '/:lang/tools/hash-generator', permanent: true },
      { source: '/:lang/tools/sha256-hash-generator', destination: '/:lang/tools/hash-generator', permanent: true },
      { source: '/:lang/tools/sha256-hash-online', destination: '/:lang/tools/hash-generator', permanent: true },
      { source: '/:lang/tools/sha512-hash-generator', destination: '/:lang/tools/hash-generator', permanent: true },
      { source: '/:lang/tools/sql-formatter-online', destination: '/:lang/tools/sql-formatter', permanent: true },
      { source: '/:lang/tools/sql-query-formatter', destination: '/:lang/tools/sql-formatter', permanent: true },
      { source: '/:lang/tools/string-case-converter', destination: '/:lang/tools/string-case', permanent: true },
      { source: '/:lang/tools/string-hash-generator', destination: '/:lang/tools/hash-generator', permanent: true },
      { source: '/:lang/tools/string-to-base64', destination: '/:lang/tools/base64', permanent: true },
      { source: '/:lang/tools/string-utilities', destination: '/:lang/tools/string-case', permanent: true },
      { source: '/:lang/tools/svg-to-png-converter', destination: '/:lang/tools/svg-to-png', permanent: true },
      { source: '/:lang/tools/svg-to-react', destination: '/:lang/tools/svg-to-jsx', permanent: true },
      { source: '/:lang/tools/text-case-converter', destination: '/:lang/tools/string-case', permanent: true },
      { source: '/:lang/tools/text-counter', destination: '/:lang/tools/word-counter', permanent: true },
      { source: '/:lang/tools/text-diff-checker', destination: '/:lang/tools/text-diff', permanent: true },
      { source: '/:lang/tools/text-diff-tool', destination: '/:lang/tools/text-diff', permanent: true },
      { source: '/:lang/tools/text-repeater', destination: '/:lang/tools/lorem-ipsum', permanent: true },
      { source: '/:lang/tools/text-to-binary', destination: '/:lang/tools/binary-text', permanent: true },
      { source: '/:lang/tools/ts-to-js-converter', destination: '/:lang/tools/typescript-to-javascript', permanent: true },
      { source: '/:lang/tools/typescript-playground', destination: '/:lang/tools/typescript-to-javascript', permanent: true },
      { source: '/:lang/tools/typescript-to-javascript-converter', destination: '/:lang/tools/typescript-to-javascript', permanent: true },
      { source: '/:lang/tools/typescript-vs-javascript', destination: '/:lang/tools/typescript-to-javascript', permanent: true },
      { source: '/:lang/tools/unix-timestamp-converter', destination: '/:lang/tools/timestamp-converter', permanent: true },
      { source: '/:lang/tools/url-decoder', destination: '/:lang/tools/url-encoder', permanent: true },
      { source: '/:lang/tools/url-encode-decode', destination: '/:lang/tools/url-encoder', permanent: true },
      { source: '/:lang/tools/url-encode-online', destination: '/:lang/tools/url-encoder', permanent: true },
      { source: '/:lang/tools/url-encoder-online', destination: '/:lang/tools/url-encoder', permanent: true },
      { source: '/:lang/tools/url-shortener-tool', destination: '/:lang/tools/url-parser', permanent: true },
      { source: '/:lang/tools/uuid-generator-online', destination: '/:lang/tools/uuid-generator', permanent: true },
      { source: '/:lang/tools/uuid-generator-v4', destination: '/:lang/tools/uuid-generator', permanent: true },
      { source: '/:lang/tools/xml-formatter-online', destination: '/:lang/tools/xml-formatter', permanent: true },
      { source: '/:lang/tools/xml-to-json-converter', destination: '/:lang/tools/xml-to-json', permanent: true },
      { source: '/:lang/tools/yaml-to-json', destination: '/:lang/tools/yaml-json-converter', permanent: true },
      { source: '/:lang/tools/yaml-to-json-converter', destination: '/:lang/tools/yaml-json-converter', permanent: true },
      { source: '/:lang/tools/yaml-to-json-online', destination: '/:lang/tools/yaml-json-converter', permanent: true },
      { source: '/:lang/tools/yaml-validator-online', destination: '/:lang/tools/yaml-validator', permanent: true },
    ];
  },
  
  // ==========================================
  // HTTP 头配置（安全 + 缓存）
  // ==========================================
  async headers() {
    return [
      {
        // 为所有路由应用安全头
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        // 静态资源长期缓存
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // 图片资源缓存
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // 公共资源缓存
        source: '/:path*(svg|png|jpg|jpeg|gif|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
