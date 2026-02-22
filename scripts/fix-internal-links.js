#!/usr/bin/env node
/**
 * Fix internal links in tools.ts and blog-posts.ts
 * Handles both \n and \r\n line endings
 */

const fs = require('fs');
const path = require('path');

const NL = '\\r?\\n'; // regex pattern for line endings

// ===== TOOLS.TS FIXES =====

const toolsPath = path.join(__dirname, '../src/lib/tools.ts');
let toolsContent = fs.readFileSync(toolsPath, 'utf-8');

// Detect line ending style
const lineEnding = toolsContent.includes('\r\n') ? '\r\n' : '\n';

// Define relatedTools for tools that are missing them
const missingRelatedTools = {
  'base64': ['base64-encoder', 'base64-decoder', 'url-encoder', 'image-base64'],
  'url-encoder': ['url-decoder', 'url-encode-online', 'percent-encoding-tool', 'base64'],
  'hash-generator': ['multi-hash-generator', 'md5-hash-generator', 'sha256-hash-generator', 'hmac-generator'],
  'uuid-generator': ['password-generator', 'fake-data', 'qrcode-generator', 'hash-generator'],
  'timestamp-converter': ['unix-timestamp-converter', 'cron-parser', 'json-formatter', 'number-base'],
  'color-converter': ['hex-to-rgb', 'color-palette', 'color-name-to-hex', 'tailwind-colors'],
  'regex-tester': ['regex-checker', 'regex-matcher', 'regex-generator', 'escape-unescape'],
  'markdown-preview': ['markdown-to-html', 'html-to-markdown', 'word-counter', 'text-diff'],
  'jwt-decoder': ['jwt-token-decoder', 'jwt-parser', 'jwt-validator', 'base64-decoder'],
  'qrcode-generator': ['favicon-generator', 'placeholder-image', 'slug-generator', 'meta-tag-generator'],
  'lorem-ipsum': ['fake-data', 'word-counter', 'text-repeater', 'ascii-art'],
  'html-entity': ['escape-unescape', 'url-encoder', 'html-to-jsx', 'percent-encoding-tool'],
  'css-minifier': ['js-html-formatter', 'css-to-tailwind', 'css-gradient', 'css-to-js'],
  'number-base': ['hex-to-decimal', 'hex-to-binary', 'octal-decimal-converter', 'binary-text'],
  'text-diff': ['word-counter', 'line-sorter', 'string-case', 'markdown-preview'],
  'word-counter': ['text-diff', 'lorem-ipsum', 'text-repeater', 'line-sorter'],
  'password-generator': ['bcrypt-generator', 'hash-generator', 'uuid-generator', 'fake-data'],
  'sql-formatter': ['sql-to-prisma', 'json-formatter', 'xml-formatter', 'csv-json'],
  'cron-parser': ['cron-generator', 'crontab-generator', 'cron-job-scheduler', 'cron-expression-parser'],
  'json-yaml': ['yaml-json-converter', 'yaml-validator', 'json-formatter', 'toml-yaml'],
  'string-case': ['slug-generator', 'word-counter', 'text-repeater', 'line-sorter'],
  'slug-generator': ['url-encoder', 'string-case', 'meta-tag-generator', 'url-parser'],
  'line-sorter': ['text-diff', 'word-counter', 'string-case', 'lorem-ipsum'],
  'js-html-formatter': ['css-minifier', 'json-formatter', 'html-to-jsx', 'xml-formatter'],
  'image-base64': ['base64', 'base64-encoder', 'svg-optimizer', 'placeholder-image'],
  'git-command-generator': ['gitignore-generator', 'slug-generator', 'cron-parser', 'docker-compose-generator'],
  'xml-formatter': ['xml-to-json', 'json-formatter', 'html-entity', 'json-yaml'],
  'csv-json': ['json-formatter', 'json-to-table', 'html-table', 'xml-to-json'],
  'http-status': ['curl-to-code', 'url-parser', 'csp-generator', 'meta-tag-generator'],
  'mime-types': ['http-status', 'url-parser', 'html-entity', 'pem-decoder'],
  'escape-unescape': ['html-entity', 'url-encoder', 'base64', 'json-formatter'],
  'ip-calculator': ['ip-to-binary', 'number-base', 'binary-text', 'hex-to-decimal'],
  'fake-data': ['lorem-ipsum', 'uuid-generator', 'password-generator', 'qrcode-generator'],
  'hmac-generator': ['hash-generator', 'multi-hash-generator', 'bcrypt-generator', 'password-generator'],
  'url-parser': ['url-encoder', 'slug-generator', 'http-status', 'curl-to-code'],
  'binary-text': ['number-base', 'hex-to-binary', 'ascii-text-converter', 'base64'],
  'pem-decoder': ['jwt-decoder', 'base64-decoder', 'hash-generator', 'password-generator'],
  'html-table': ['csv-json', 'json-to-table', 'json-formatter', 'xml-formatter'],
  'bcrypt-generator': ['hash-generator', 'multi-hash-generator', 'hmac-generator', 'password-generator'],
};

// Add relatedTools to tools that don't have them
let toolAddCount = 0;
for (const [toolId, related] of Object.entries(missingRelatedTools)) {
  const relatedStr = related.map(r => `'${r}'`).join(', ');
  // Match the path line for this tool, followed by a newline and `  },`
  const regex = new RegExp(
    `(    id: '${toolId}',(?:.*${NL})*?    path: '[^']+',)${NL}  \\},`
  );
  const match = toolsContent.match(regex);
  if (match) {
    toolsContent = toolsContent.replace(
      regex,
      `$1${lineEnding}    relatedTools: [${relatedStr}],${lineEnding}  },`
    );
    toolAddCount++;
  } else {
    console.log(`WARNING: Could not find tool block for ${toolId}`);
  }
}
console.log(`Added relatedTools to ${toolAddCount} tools`);

// Enhance existing relatedTools for specific tools
const enhanceRelatedTools = {
  'json-to-json-schema': ['json-to-zod', 'json-to-typescript', 'json-formatter', 'json-validator', 'json-viewer'],
  'typescript-to-javascript': ['json-to-typescript', 'js-html-formatter', 'html-to-jsx', 'graphql-to-typescript', 'svg-to-jsx'],
  'curl-to-code': ['url-parser', 'json-formatter', 'http-status', 'url-encoder', 'html-entity'],
  'svg-to-jsx': ['html-to-jsx', 'css-to-tailwind', 'image-base64', 'js-html-formatter', 'svg-optimizer'],
  'json-formatter': ['json-yaml', 'csv-json', 'xml-formatter', 'json-to-typescript', 'json-viewer', 'json-validator'],
  'json-to-typescript': ['json-formatter', 'json-to-go', 'json-to-java', 'json-to-zod', 'json-to-json-schema'],
};

let toolEnhCount = 0;
for (const [toolId, newRelated] of Object.entries(enhanceRelatedTools)) {
  const relatedStr = newRelated.map(r => `'${r}'`).join(', ');
  const regex = new RegExp(
    `(    id: '${toolId}',(?:.*${NL})*?)    relatedTools: \\[[^\\]]*\\],`
  );
  const match = toolsContent.match(regex);
  if (match) {
    toolsContent = toolsContent.replace(
      regex,
      `$1    relatedTools: [${relatedStr}],`
    );
    toolEnhCount++;
  } else {
    console.log(`WARNING: Could not find relatedTools for ${toolId}`);
  }
}
console.log(`Enhanced relatedTools for ${toolEnhCount} tools`);

fs.writeFileSync(toolsPath, toolsContent, 'utf-8');
console.log('tools.ts updated successfully');

// ===== BLOG-POSTS.TS FIXES =====

const blogPath = path.join(__dirname, '../src/data/blog-posts.ts');
let blogContent = fs.readFileSync(blogPath, 'utf-8');
const blogLE = blogContent.includes('\r\n') ? '\r\n' : '\n';

const blogFixes = {
  'uuid-v4-vs-v7-vs-ulid-vs-nanoid': {
    relatedTools: ['uuid-generator', 'hash-generator', 'password-generator', 'fake-data'],
    relatedPosts: ['base64-encoding-real-world-uses', 'json-to-typescript-complete-guide'],
  },
  'cron-schedule-serverless-github-actions-vercel-cloudflare': {
    relatedTools: ['cron-parser', 'cron-generator', 'crontab-generator', 'docker-compose-generator'],
    relatedPosts: ['docker-compose-yaml-errors', 'cron-expression-examples'],
  },
  'base64-encoding-real-world-uses': {
    relatedTools: ['base64', 'jwt-decoder', 'image-base64', 'base64-encoder'],
    relatedPosts: ['uuid-v4-vs-v7-vs-ulid-vs-nanoid', 'base64-encode-decode-command-line'],
  },
  'regex-patterns-copy-paste-ready': {
    relatedTools: ['regex-tester', 'regex-checker', 'regex-matcher', 'regex-generator'],
    relatedPosts: ['docker-compose-yaml-errors', 'regex-cheat-sheet'],
  },
  'docker-compose-yaml-errors': {
    relatedTools: ['json-yaml', 'json-formatter', 'yaml-validator', 'docker-compose-generator'],
    relatedPosts: ['cron-schedule-serverless-github-actions-vercel-cloudflare', 'docker-compose-cheat-sheet'],
  },
  'json-to-typescript-complete-guide': {
    relatedTools: ['json-to-typescript', 'json-formatter', 'json-to-go', 'json-to-zod'],
    relatedPosts: ['json-to-go-struct-guide', 'typescript-vs-javascript-when-to-convert'],
  },
  'html-to-jsx-react-migration': {
    relatedTools: ['html-to-jsx', 'svg-to-jsx', 'css-to-tailwind', 'js-html-formatter'],
    relatedPosts: ['svg-optimization-react', 'css-to-tailwind-migration'],
  },
  'json-to-go-struct-guide': {
    relatedTools: ['json-to-go', 'json-formatter', 'json-to-typescript', 'json-to-rust'],
    relatedPosts: ['json-to-typescript-complete-guide', 'json-to-kotlin-data-class-guide'],
  },
  'css-to-tailwind-migration': {
    relatedTools: ['css-to-tailwind', 'tailwind-colors', 'css-minifier', 'flexbox-generator'],
    relatedPosts: ['html-to-jsx-react-migration', 'tailwind-css-cheat-sheet'],
  },
  'svg-optimization-react': {
    relatedTools: ['svg-to-jsx', 'svg-optimizer', 'html-to-jsx', 'image-base64'],
    relatedPosts: ['html-to-jsx-react-migration', 'svg-viewbox-width-height-explained'],
  },
  'json-schema-validation-guide': {
    relatedTools: ['json-to-json-schema', 'json-to-zod', 'json-formatter', 'json-validator'],
    relatedPosts: ['json-to-typescript-complete-guide', 'json-formatter-validator-guide'],
  },
  'typescript-vs-javascript-when-to-convert': {
    relatedTools: ['typescript-to-javascript', 'json-to-typescript', 'graphql-to-typescript'],
    relatedPosts: ['json-to-typescript-complete-guide', 'typescript-generics-explained'],
  },
  'graphql-type-generation': {
    relatedTools: ['graphql-to-typescript', 'json-to-graphql', 'json-to-typescript'],
    relatedPosts: ['json-to-typescript-complete-guide', 'rest-api-best-practices-guide'],
  },
  'regex-cheat-sheet': {
    relatedTools: ['regex-tester', 'regex-checker', 'regex-matcher', 'regex-generator'],
    relatedPosts: ['regex-patterns-copy-paste-ready', 'regex-match-email-phone-url-patterns'],
  },
  'git-commands-cheat-sheet': {
    relatedTools: ['git-command-generator', 'gitignore-generator', 'slug-generator'],
    relatedPosts: ['regex-cheat-sheet', 'git-rebase-vs-merge-explained'],
  },
  'http-status-codes-reference': {
    relatedTools: ['http-status', 'curl-to-code', 'url-parser'],
    relatedPosts: ['rest-api-best-practices-guide', 'curl-command-cheat-sheet-examples'],
  },
  'css-gradient-guide': {
    relatedTools: ['css-gradient', 'color-converter', 'box-shadow', 'color-palette'],
    relatedPosts: ['meta-tags-guide', 'css-text-gradient-examples'],
  },
  'meta-tags-guide': {
    relatedTools: ['meta-tag-generator', 'schema-generator', 'og-image-preview', 'robots-generator'],
    relatedPosts: ['css-gradient-guide', 'open-graph-twitter-card-meta-tags-guide'],
  },
  'chmod-permissions-explained': {
    relatedTools: ['chmod-calculator', 'htaccess-generator', 'password-generator'],
    relatedPosts: ['git-commands-cheat-sheet', 'linux-chmod-chown-permissions-guide'],
  },
  'cron-expression-examples': {
    relatedTools: ['cron-parser', 'cron-generator', 'crontab-generator', 'cron-expression-parser'],
    relatedPosts: ['chmod-permissions-explained', 'cron-schedule-serverless-github-actions-vercel-cloudflare'],
  },
  'json-vs-yaml-vs-toml': {
    relatedTools: ['json-yaml', 'toml-yaml', 'json-formatter', 'yaml-validator'],
    relatedPosts: ['cron-expression-examples', 'docker-compose-yaml-errors'],
  },
  'jwt-token-explained': {
    relatedTools: ['jwt-decoder', 'base64', 'jwt-parser', 'jwt-validator'],
    relatedPosts: ['json-vs-yaml-vs-toml', 'api-authentication-oauth-jwt-apikey'],
  },
  'css-flexbox-cheat-sheet': {
    relatedTools: ['flexbox-generator', 'css-minifier', 'css-unit-converter'],
    relatedPosts: ['jwt-token-explained', 'css-grid-layout-cheat-sheet'],
  },
  'json-to-dart-flutter-guide': {
    relatedTools: ['json-to-dart', 'json-formatter', 'json-to-kotlin', 'json-to-typescript'],
    relatedPosts: ['yaml-syntax-validation-guide', 'json-to-kotlin-data-class-guide'],
  },
  'yaml-syntax-validation-guide': {
    relatedTools: ['yaml-validator', 'json-yaml', 'toml-yaml', 'docker-compose-generator'],
    relatedPosts: ['json-to-dart-flutter-guide', 'docker-compose-yaml-errors'],
  },
  'nginx-config-examples': {
    relatedTools: ['nginx-config', 'htaccess-generator', 'csp-generator'],
    relatedPosts: ['docker-compose-cheat-sheet', 'htaccess-redirect-cheat-sheet-examples'],
  },
  'docker-compose-cheat-sheet': {
    relatedTools: ['docker-compose-generator', 'yaml-validator', 'json-yaml'],
    relatedPosts: ['nginx-config-examples', 'docker-compose-yaml-errors'],
  },
  'csp-header-guide': {
    relatedTools: ['csp-generator', 'htaccess-generator', 'nginx-config', 'meta-tag-generator'],
    relatedPosts: ['docker-compose-cheat-sheet', 'how-to-fix-cors-errors-complete-guide'],
  },
  'sql-joins-explained-visual-guide': {
    relatedTools: ['sql-formatter', 'sql-to-prisma', 'json-formatter'],
    relatedPosts: ['json-vs-yaml-vs-toml', 'prisma-schema-relations-guide'],
  },
  'git-rebase-vs-merge-explained': {
    relatedTools: ['git-command-generator', 'gitignore-generator'],
    relatedPosts: ['git-commands-cheat-sheet', 'git-cherry-pick-revert-reset-guide'],
  },
  'tailwind-css-cheat-sheet': {
    relatedTools: ['css-to-tailwind', 'tailwind-colors', 'flexbox-generator'],
    relatedPosts: ['css-flexbox-cheat-sheet', 'css-to-tailwind-migration'],
  },
  'typescript-generics-explained': {
    relatedTools: ['json-to-typescript', 'typescript-to-javascript', 'graphql-to-typescript'],
    relatedPosts: ['json-to-typescript-complete-guide', 'typescript-vs-javascript-when-to-convert'],
  },
  'rest-api-best-practices-guide': {
    relatedTools: ['http-status', 'curl-to-code', 'jwt-decoder', 'json-formatter'],
    relatedPosts: ['http-status-codes-reference', 'api-authentication-oauth-jwt-apikey'],
  },
  'how-to-fix-cors-errors-complete-guide': {
    relatedTools: ['csp-generator', 'nginx-config', 'htaccess-generator', 'http-status'],
    relatedPosts: ['rest-api-best-practices-guide', 'csp-header-guide'],
  },
  'npm-vs-yarn-vs-pnpm-vs-bun-comparison': {
    relatedTools: ['json-formatter', 'yaml-validator', 'gitignore-generator'],
    relatedPosts: ['json-vs-yaml-vs-toml', 'npm-install-errors-fix-guide'],
  },
  'dotenv-environment-variables-best-practices': {
    relatedTools: ['docker-compose-generator', 'gitignore-generator', 'nginx-config'],
    relatedPosts: ['docker-compose-cheat-sheet', 'docker-env-file-vs-environment'],
  },
  'favicon-guide-sizes-formats-generator': {
    relatedTools: ['favicon-generator', 'image-base64', 'meta-tag-generator'],
    relatedPosts: ['open-graph-twitter-card-meta-tags-guide', 'meta-tags-guide'],
  },
  'curl-command-cheat-sheet-examples': {
    relatedTools: ['curl-to-code', 'url-parser', 'http-status', 'json-formatter'],
    relatedPosts: ['rest-api-best-practices-guide', 'http-status-codes-reference'],
  },
  'bcrypt-vs-argon2-vs-scrypt-password-hashing': {
    relatedTools: ['bcrypt-generator', 'hash-generator', 'hmac-generator', 'password-generator'],
    relatedPosts: ['jwt-token-explained', 'password-strength-requirements-2025'],
  },
  'npm-install-errors-fix-guide': {
    relatedTools: ['json-formatter', 'yaml-validator', 'gitignore-generator'],
    relatedPosts: ['npm-vs-yarn-vs-pnpm-vs-bun-comparison', 'dotenv-environment-variables-best-practices'],
  },
  'htaccess-redirect-cheat-sheet-examples': {
    relatedTools: ['htaccess-generator', 'nginx-config', 'url-encoder', 'robots-generator'],
    relatedPosts: ['nginx-config-examples', 'csp-header-guide'],
  },
  'docker-compose-secrets-environment-variables-guide': {
    relatedTools: ['docker-compose-generator', 'yaml-validator', 'gitignore-generator'],
    relatedPosts: ['docker-compose-cheat-sheet', 'dotenv-environment-variables-best-practices'],
  },
  'open-graph-twitter-card-meta-tags-guide': {
    relatedTools: ['meta-tag-generator', 'og-image-preview', 'schema-generator', 'favicon-generator'],
    relatedPosts: ['favicon-guide-sizes-formats-generator', 'meta-tags-guide'],
  },
  'base64-encode-decode-command-line': {
    relatedTools: ['base64', 'binary-text', 'base64-encoder', 'base64-decoder'],
    relatedPosts: ['base64-encoding-real-world-uses', 'base64-image-embed-html-css'],
  },
  'json-parse-error-unexpected-token': {
    relatedTools: ['json-formatter', 'json-yaml', 'escape-unescape', 'json-validator'],
    relatedPosts: ['json-vs-yaml-vs-toml', 'json-formatter-validator-guide'],
  },
  'yaml-multiline-string-block-folded': {
    relatedTools: ['json-yaml', 'toml-yaml', 'yaml-validator', 'docker-compose-generator'],
    relatedPosts: ['yaml-syntax-validation-guide', 'yaml-anchors-aliases-merge-keys'],
  },
  'git-undo-last-commit-keep-changes': {
    relatedTools: ['git-command-generator', 'gitignore-generator'],
    relatedPosts: ['git-commands-cheat-sheet', 'git-rebase-vs-merge-explained'],
  },
  'url-encode-special-characters-list': {
    relatedTools: ['url-encoder', 'url-parser', 'percent-encoding-tool'],
    relatedPosts: ['rest-api-best-practices-guide', 'url-encode-decode-complete-guide'],
  },
  'regex-match-email-phone-url-patterns': {
    relatedTools: ['regex-tester', 'regex-checker', 'regex-generator'],
    relatedPosts: ['regex-cheat-sheet', 'regex-patterns-copy-paste-ready'],
  },
  'unix-timestamp-to-date-conversion': {
    relatedTools: ['timestamp-converter', 'unix-timestamp-converter', 'cron-parser'],
    relatedPosts: ['cron-expression-examples', 'javascript-date-format-complete-guide'],
  },
  'css-text-gradient-examples': {
    relatedTools: ['css-gradient', 'css-minifier', 'color-converter', 'color-palette'],
    relatedPosts: ['css-gradient-guide', 'css-animation-keyframes-examples'],
  },
  'html-special-characters-entities-list': {
    relatedTools: ['html-entity', 'escape-unescape', 'url-encoder'],
    relatedPosts: ['meta-tags-guide', 'ascii-unicode-utf8-encoding-explained'],
  },
  'jwt-decode-without-library': {
    relatedTools: ['jwt-decoder', 'base64', 'jwt-parser', 'jwt-validator'],
    relatedPosts: ['jwt-token-explained', 'api-authentication-oauth-jwt-apikey'],
  },
  'qr-code-size-format-best-practices': {
    relatedTools: ['qrcode-generator', 'favicon-generator', 'image-base64'],
    relatedPosts: ['favicon-guide-sizes-formats-generator', 'meta-tags-guide'],
  },
  'javascript-string-replace-regex': {
    relatedTools: ['regex-tester', 'js-html-formatter', 'regex-generator'],
    relatedPosts: ['regex-cheat-sheet', 'regex-patterns-copy-paste-ready'],
  },
  'docker-env-file-vs-environment': {
    relatedTools: ['escape-unescape', 'docker-compose-generator', 'yaml-validator'],
    relatedPosts: ['docker-compose-cheat-sheet', 'docker-compose-secrets-environment-variables-guide'],
  },
  'ip-subnet-mask-cidr-explained': {
    relatedTools: ['ip-calculator', 'ip-to-binary', 'binary-text'],
    relatedPosts: ['rest-api-best-practices-guide', 'dns-record-types-a-cname-mx-txt'],
  },
  'markdown-cheat-sheet-github-readme': {
    relatedTools: ['markdown-preview', 'markdown-to-html', 'html-to-markdown'],
    relatedPosts: ['git-commands-cheat-sheet', 'gitignore-templates-common-patterns'],
  },
  'password-strength-requirements-2025': {
    relatedTools: ['password-generator', 'bcrypt-generator', 'hash-generator'],
    relatedPosts: ['bcrypt-vs-argon2-vs-scrypt-password-hashing', 'ssh-keygen-ed25519-rsa-guide'],
  },
  'svg-viewbox-width-height-explained': {
    relatedTools: ['svg-to-jsx', 'svg-optimizer', 'image-base64'],
    relatedPosts: ['svg-optimization-react', 'html-to-jsx-react-migration'],
  },
  'xml-vs-json-comparison': {
    relatedTools: ['xml-formatter', 'xml-to-json', 'json-formatter'],
    relatedPosts: ['json-vs-yaml-vs-toml', 'protobuf-vs-json-grpc-rest'],
  },
  'base64-image-embed-html-css': {
    relatedTools: ['image-base64', 'base64', 'base64-encoder'],
    relatedPosts: ['base64-encoding-real-world-uses', 'base64-encode-decode-command-line'],
  },
  'sql-formatting-best-practices': {
    relatedTools: ['sql-formatter', 'sql-to-prisma', 'json-formatter'],
    relatedPosts: ['sql-joins-explained-visual-guide', 'prisma-schema-relations-guide'],
  },
  'gitignore-templates-common-patterns': {
    relatedTools: ['gitignore-generator', 'git-command-generator'],
    relatedPosts: ['git-commands-cheat-sheet', 'git-branch-naming-convention'],
  },
  'css-grid-layout-cheat-sheet': {
    relatedTools: ['flexbox-generator', 'css-unit-converter', 'css-gradient'],
    relatedPosts: ['css-flexbox-cheat-sheet', 'css-media-queries-breakpoints-2025'],
  },
  'javascript-date-format-complete-guide': {
    relatedTools: ['timestamp-converter', 'unix-timestamp-converter', 'cron-parser'],
    relatedPosts: ['unix-timestamp-to-date-conversion', 'javascript-array-methods-cheat-sheet'],
  },
  'ssh-keygen-ed25519-rsa-guide': {
    relatedTools: ['hash-generator', 'password-generator', 'pem-decoder'],
    relatedPosts: ['bcrypt-vs-argon2-vs-scrypt-password-hashing', 'password-strength-requirements-2025'],
  },
  'javascript-array-methods-cheat-sheet': {
    relatedTools: ['json-formatter', 'js-html-formatter', 'regex-tester'],
    relatedPosts: ['javascript-string-replace-regex', 'javascript-map-filter-reduce-examples'],
  },
  'robots-txt-syntax-examples': {
    relatedTools: ['robots-generator', 'meta-tag-generator', 'schema-generator'],
    relatedPosts: ['meta-tags-guide', 'htaccess-redirect-cheat-sheet-examples'],
  },
  'ascii-unicode-utf8-encoding-explained': {
    relatedTools: ['binary-text', 'html-entity', 'base64', 'ascii-text-converter'],
    relatedPosts: ['html-special-characters-entities-list', 'base64-encoding-real-world-uses'],
  },
  'css-media-queries-breakpoints-2025': {
    relatedTools: ['css-unit-converter', 'flexbox-generator', 'css-minifier'],
    relatedPosts: ['css-flexbox-cheat-sheet', 'css-grid-layout-cheat-sheet'],
  },
  'git-branch-naming-convention': {
    relatedTools: ['git-command-generator', 'slug-generator', 'gitignore-generator'],
    relatedPosts: ['git-commands-cheat-sheet', 'git-rebase-vs-merge-explained'],
  },
  'dns-record-types-a-cname-mx-txt': {
    relatedTools: ['ip-calculator', 'nginx-config', 'url-parser'],
    relatedPosts: ['ip-subnet-mask-cidr-explained', 'nginx-config-examples'],
  },
  'dockerfile-best-practices-multi-stage': {
    relatedTools: ['docker-compose-generator', 'yaml-validator', 'gitignore-generator'],
    relatedPosts: ['docker-compose-cheat-sheet', 'docker-env-file-vs-environment'],
  },
  'css-animation-keyframes-examples': {
    relatedTools: ['css-gradient', 'box-shadow', 'css-minifier'],
    relatedPosts: ['css-gradient-guide', 'css-text-gradient-examples'],
  },
  'api-authentication-oauth-jwt-apikey': {
    relatedTools: ['jwt-decoder', 'base64', 'hash-generator', 'curl-to-code'],
    relatedPosts: ['jwt-token-explained', 'rest-api-best-practices-guide'],
  },
  'jq-command-tutorial-examples': {
    relatedTools: ['json-formatter', 'json-viewer', 'curl-to-code'],
    relatedPosts: ['curl-command-cheat-sheet-examples', 'json-formatter-validator-guide'],
  },
  'css-variables-custom-properties-guide': {
    relatedTools: ['color-converter', 'color-palette', 'tailwind-colors', 'css-minifier'],
    relatedPosts: ['css-gradient-guide', 'css-media-queries-breakpoints-2025'],
  },
  'protobuf-vs-json-grpc-rest': {
    relatedTools: ['json-to-protobuf', 'json-formatter', 'json-to-graphql'],
    relatedPosts: ['xml-vs-json-comparison', 'rest-api-best-practices-guide'],
  },
  'prisma-schema-relations-guide': {
    relatedTools: ['sql-to-prisma', 'json-to-typescript', 'sql-formatter'],
    relatedPosts: ['sql-joins-explained-visual-guide', 'sql-formatting-best-practices'],
  },
  'nginx-location-block-regex-guide': {
    relatedTools: ['nginx-config', 'regex-tester', 'htaccess-generator'],
    relatedPosts: ['nginx-config-examples', 'regex-cheat-sheet'],
  },
  'javascript-map-filter-reduce-examples': {
    relatedTools: ['json-formatter', 'js-html-formatter', 'regex-tester'],
    relatedPosts: ['javascript-array-methods-cheat-sheet', 'javascript-string-replace-regex'],
  },
  'html-input-types-attributes-guide': {
    relatedTools: ['html-table', 'meta-tag-generator', 'html-entity'],
    relatedPosts: ['html-special-characters-entities-list', 'html-to-jsx-react-migration'],
  },
  'css-specificity-calculator-rules': {
    relatedTools: ['css-minifier', 'tailwind-colors', 'css-to-tailwind'],
    relatedPosts: ['css-flexbox-cheat-sheet', 'css-variables-custom-properties-guide'],
  },
  'git-cherry-pick-revert-reset-guide': {
    relatedTools: ['git-command-generator', 'gitignore-generator'],
    relatedPosts: ['git-undo-last-commit-keep-changes', 'git-rebase-vs-merge-explained'],
  },
  'docker-volumes-bind-mounts-guide': {
    relatedTools: ['docker-compose-generator', 'yaml-validator'],
    relatedPosts: ['docker-compose-cheat-sheet', 'dockerfile-best-practices-multi-stage'],
  },
  'http-request-response-headers-list': {
    relatedTools: ['http-status', 'curl-to-code', 'csp-generator'],
    relatedPosts: ['http-status-codes-reference', 'rest-api-best-practices-guide'],
  },
  'vite-vs-webpack-esbuild-comparison': {
    relatedTools: ['js-html-formatter', 'json-formatter', 'gitignore-generator'],
    relatedPosts: ['npm-vs-yarn-vs-pnpm-vs-bun-comparison', 'typescript-vs-javascript-when-to-convert'],
  },
  'css-position-sticky-fixed-absolute': {
    relatedTools: ['flexbox-generator', 'css-unit-converter', 'css-minifier'],
    relatedPosts: ['css-flexbox-cheat-sheet', 'css-grid-layout-cheat-sheet'],
  },
  'linux-chmod-chown-permissions-guide': {
    relatedTools: ['chmod-calculator', 'htaccess-generator', 'password-generator'],
    relatedPosts: ['chmod-permissions-explained', 'ssh-keygen-ed25519-rsa-guide'],
  },
  'toml-syntax-config-guide': {
    relatedTools: ['toml-yaml', 'json-yaml', 'yaml-validator'],
    relatedPosts: ['json-vs-yaml-vs-toml', 'yaml-syntax-validation-guide'],
  },
  'yaml-anchors-aliases-merge-keys': {
    relatedTools: ['json-yaml', 'yaml-validator', 'toml-yaml'],
    relatedPosts: ['yaml-multiline-string-block-folded', 'yaml-syntax-validation-guide'],
  },
  'python-pip-requirements-virtualenv': {
    relatedTools: ['json-formatter', 'hash-generator', 'gitignore-generator'],
    relatedPosts: ['npm-vs-yarn-vs-pnpm-vs-bun-comparison', 'dotenv-environment-variables-best-practices'],
  },
  'json-formatter-validator-guide': {
    relatedTools: ['json-formatter', 'json-to-typescript', 'json-to-go', 'json-validator'],
  },
  'url-encode-decode-complete-guide': {
    relatedTools: ['url-encoder', 'url-parser', 'url-decoder', 'percent-encoding-tool'],
  },
  'base64-encode-decode-guide': {
    relatedTools: ['base64', 'base64-encoder', 'base64-decoder', 'jwt-decoder'],
  },
  'hex-to-rgb-converter-color-guide': {
    relatedTools: ['hex-to-rgb', 'color-converter', 'color-palette', 'tailwind-colors'],
  },
  'diff-checker-text-compare-guide': {
    relatedTools: ['text-diff', 'word-counter', 'line-sorter'],
  },
  'hash-generator-md5-sha256-guide': {
    relatedTools: ['hash-generator', 'multi-hash-generator', 'hmac-generator', 'bcrypt-generator'],
  },
  'csv-to-json-converter-guide': {
    relatedTools: ['csv-json', 'json-formatter', 'json-yaml', 'xml-formatter'],
  },
  'yaml-to-json-converter-guide': {
    relatedTools: ['json-yaml', 'yaml-validator', 'json-formatter', 'yaml-json-converter'],
  },
  'markdown-to-html-converter-guide': {
    relatedTools: ['markdown-to-html', 'html-to-markdown', 'word-counter', 'markdown-preview'],
  },
  'color-converter-rgb-hex-hsl-guide': {
    relatedTools: ['color-converter', 'hex-to-rgb', 'color-palette', 'tailwind-colors'],
  },
  'json-to-java-class-converter-guide': {
    relatedTools: ['json-to-java', 'json-to-kotlin', 'json-to-typescript', 'json-formatter'],
  },
  'xml-to-json-converter-guide': {
    relatedTools: ['xml-to-json', 'xml-formatter', 'json-formatter', 'json-yaml'],
  },
  'cron-expression-generator-parser-guide': {
    relatedTools: ['cron-parser', 'cron-generator', 'crontab-generator', 'cron-expression-parser'],
  },
  'json-to-kotlin-data-class-guide': {
    relatedTools: ['json-to-kotlin', 'json-to-java', 'json-to-typescript', 'json-formatter'],
  },
  'json-to-python-dataclass-guide': {
    relatedTools: ['json-to-python', 'json-to-typescript', 'json-formatter'],
  },
  'json-to-csharp-class-guide': {
    relatedTools: ['json-to-csharp', 'json-to-java', 'json-to-typescript', 'json-formatter'],
  },
  'chmod-calculator-linux-permissions-guide': {
    relatedTools: ['chmod-calculator', 'htaccess-generator', 'password-generator'],
  },
  'url-encoding-percent-encoding-guide': {
    relatedTools: ['url-encoder', 'url-parser', 'base64', 'percent-encoding-tool'],
  },
  'crontab-cheat-sheet-cron-examples-guide': {
    relatedTools: ['cron-generator', 'cron-parser', 'crontab-generator', 'cron-expression-parser'],
  },
  'how-to-open-json-file': {
    relatedTools: ['json-formatter', 'json-viewer', 'json-validator'],
  },
  'json-to-csv-conversion-guide': {
    relatedTools: ['csv-json', 'json-formatter', 'json-to-typescript', 'json-to-table'],
  },
};

// Apply blog post fixes
let blogFixCount = 0;
for (const [slug, fixes] of Object.entries(blogFixes)) {
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (fixes.relatedTools) {
    const relatedToolsStr = fixes.relatedTools.map(r => `'${r}'`).join(', ');
    const regex = new RegExp(
      `(slug: '${escapedSlug}',(?:.*${NL})*?)    relatedTools: \\[[^\\]]*\\],`
    );
    const match = blogContent.match(regex);
    if (match) {
      blogContent = blogContent.replace(regex, `$1    relatedTools: [${relatedToolsStr}],`);
      blogFixCount++;
    } else {
      console.log(`WARNING: Could not find relatedTools for blog post ${slug}`);
    }
  }
  if (fixes.relatedPosts) {
    const relatedPostsStr = fixes.relatedPosts.map(r => `'${r}'`).join(', ');
    const regex = new RegExp(
      `(slug: '${escapedSlug}',(?:.*${NL})*?)    relatedPosts: \\[[^\\]]*\\],`
    );
    const match = blogContent.match(regex);
    if (match) {
      blogContent = blogContent.replace(regex, `$1    relatedPosts: [${relatedPostsStr}],`);
      blogFixCount++;
    } else {
      console.log(`WARNING: Could not find relatedPosts for blog post ${slug}`);
    }
  }
}

fs.writeFileSync(blogPath, blogContent, 'utf-8');
console.log(`blog-posts.ts updated successfully (${blogFixCount} fixes applied)`);
console.log('Done! Run npm run build to verify.');
