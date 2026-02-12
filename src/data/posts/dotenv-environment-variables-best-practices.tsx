'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: '.env File Guide: Environment Variables Best Practices',
    intro: 'Environment variables keep secrets out of source code and let you change configuration without redeploying. The <strong>.env file</strong> has become the standard way to manage them locally. This guide covers syntax rules, framework setup, security, environment-specific files, Docker integration, common errors, and production alternatives.',
    h2_syntax: '.env Syntax Rules',
    syntax_intro: 'A .env file is a plain-text file with one variable per line. Here are the rules every developer should know:',
    h3_basic: 'Basic Syntax',
    basic_desc: 'Each line follows the KEY=VALUE pattern. No spaces around the equals sign.',
    h3_quoting: 'Quoting Rules',
    quoting_desc: 'Values can be unquoted, single-quoted, or double-quoted. The behavior differs:',
    quoting_unquoted: 'Unquoted: trailing whitespace is trimmed, no escape sequences.',
    quoting_single: 'Single-quoted: value is taken literally, no interpolation, no escapes.',
    quoting_double: 'Double-quoted: supports escape sequences (\\n, \\t) and variable interpolation.',
    h3_multiline: 'Multiline Values',
    multiline_desc: 'Use double quotes and \\n for newlines, or use actual newlines inside double quotes:',
    h3_comments: 'Comments',
    comments_desc: 'Lines starting with # are comments. Inline comments work only with unquoted values in some parsers:',
    h3_interpolation: 'Variable Interpolation',
    interpolation_desc: 'Reference other variables using ${VAR} syntax (supported by most parsers in double-quoted values):',
    h2_frameworks: 'Framework Setup',
    h3_nodejs: 'Node.js (dotenv)',
    nodejs_desc: 'The most popular .env loader for Node.js. Install and configure:',
    nodejs_note: 'Next.js, Vite, and Create React App load .env files automatically -- no package needed.',
    h3_python: 'Python (python-dotenv)',
    python_desc: 'Load .env in Python projects:',
    h3_go: 'Go (godotenv)',
    go_desc: 'Load .env in Go projects:',
    h3_php: 'PHP (vlucas/phpdotenv)',
    php_desc: 'Used by Laravel and most PHP frameworks:',
    h3_ruby: 'Ruby (dotenv gem)',
    ruby_desc: 'Used by Rails and other Ruby projects:',
    h2_security: 'Security: Never Commit .env Files',
    security_intro: 'Your .env file contains secrets (API keys, database passwords, tokens). Committing it to version control is the #1 security mistake.',
    h3_gitignore: '.gitignore Patterns',
    gitignore_desc: 'Add these patterns to your .gitignore file immediately:',
    h3_env_example: 'Use .env.example',
    env_example_desc: 'Commit a .env.example file with empty values so teammates know which variables are required:',
    h3_already_committed: 'Already Committed .env?',
    already_committed_desc: 'If you accidentally committed a .env file, remove it from tracking and rotate all secrets:',
    h2_env_specific: 'Environment-Specific Files',
    env_specific_intro: 'Most frameworks support multiple .env files for different environments. Understanding the loading order is critical.',
    h3_loading_order: 'Loading Order (Next.js / Vite / CRA)',
    loading_order_desc: 'Files are loaded in this priority (later files override earlier ones):',
    loading_note: '.env.local is always ignored by git (add it to .gitignore). It is NOT loaded during testing to keep tests deterministic.',
    h3_which_file: 'Which File for What?',
    h2_docker: 'Docker & Docker Compose Integration',
    h3_env_file: 'env_file Directive',
    env_file_desc: 'Docker Compose can load .env files directly into containers:',
    h3_environment: 'environment vs env_file',
    environment_desc: 'You can also inline environment variables. Here is the difference:',
    env_file_pros: 'env_file: loads from file, keeps compose.yml clean, easy to swap per environment.',
    environment_pros: 'environment: visible in compose.yml, good for non-secret values, supports variable substitution.',
    h3_docker_env: '.env for Docker Compose Variables',
    docker_env_desc: 'Docker Compose automatically reads a .env file in the project root for variable substitution in compose.yml:',
    h2_errors: '10 Common .env Errors and Fixes',
    errors_intro: 'Here are the most frequent .env problems developers encounter:',
    col_error: 'Error',
    col_cause: 'Cause',
    col_fix: 'Fix',
    err1_error: 'process.env.VAR is undefined',
    err1_cause: 'dotenv not loaded or loaded after usage',
    err1_fix: 'Call dotenv.config() at the very top of your entry file',
    err2_error: 'Variables empty in production',
    err2_cause: '.env file not deployed; relying on file instead of platform env vars',
    err2_fix: 'Set env vars in your hosting platform (Vercel, AWS, etc.)',
    err3_error: '.env values have quotes in them',
    err3_cause: 'Parser treats quotes as literal characters',
    err3_fix: 'Check your parser docs; most strip double quotes but not all',
    err4_error: 'Wrong .env file loaded',
    err4_cause: 'Working directory differs from expected path',
    err4_fix: 'Use path option: dotenv.config({ path: ".env.local" })',
    err5_error: 'Multiline value truncated',
    err5_cause: 'Value not properly double-quoted',
    err5_fix: 'Wrap multiline values in double quotes',
    err6_error: 'Special characters break value',
    err6_cause: '$ or # interpreted as interpolation/comment',
    err6_fix: 'Use single quotes to prevent interpolation, or escape with \\',
    err7_error: 'BOM encoding error',
    err7_cause: '.env saved with UTF-8 BOM by Windows editors',
    err7_fix: 'Save as UTF-8 without BOM; first variable may be unreadable otherwise',
    err8_error: 'Docker container env vars empty',
    err8_cause: 'env_file path incorrect or file not in build context',
    err8_fix: 'Verify path is relative to compose.yml location',
    err9_error: 'Spaces around = break parsing',
    err9_cause: 'KEY = VALUE instead of KEY=VALUE',
    err9_fix: 'Remove spaces around the equals sign',
    err10_error: 'Variables not available in browser (React/Next)',
    err10_cause: 'Missing required prefix (NEXT_PUBLIC_ or REACT_APP_)',
    err10_fix: 'Add the framework-required prefix to expose to client-side code',
    h2_production: 'Production Alternatives',
    production_intro: 'In production, .env files are not recommended. Use these alternatives instead:',
    h3_platform: 'Platform Environment Variables',
    platform_desc: 'Every major hosting platform provides a UI or CLI for setting environment variables:',
    h3_docker_secrets: 'Docker Secrets',
    docker_secrets_desc: 'For Docker Swarm or Compose, use secrets for sensitive data:',
    h3_vault: 'Secret Managers (Vault, AWS Secrets Manager)',
    vault_desc: 'For enterprise applications, use a dedicated secret manager:',
    vault_note: 'Secret managers provide rotation, audit logging, access control, and encryption at rest -- features .env files cannot offer.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Should I commit my .env file to Git?',
    faq1_a: 'Never commit .env files that contain secrets (API keys, passwords, tokens) to version control. Instead, commit a .env.example file with empty placeholder values so teammates know which variables are needed. Add .env* patterns to your .gitignore file.',
    faq2_q: 'What is the difference between .env, .env.local, and .env.production?',
    faq2_a: '.env contains default values loaded in all environments. .env.local contains local overrides and is not committed to git. .env.production contains production-specific values loaded only when NODE_ENV=production. The loading order is: .env, then .env.local, then .env.[environment], then .env.[environment].local, with later files overriding earlier ones.',
    faq3_q: 'Why is process.env.MY_VAR undefined in Node.js?',
    faq3_a: 'The most common causes are: 1) You forgot to install and call require("dotenv").config() at the top of your entry file, 2) Your .env file is not in the root directory where Node runs, 3) The variable name has a typo, 4) You are using ES modules and need to use "import dotenv/config" instead.',
    faq4_q: 'How do I use .env variables in Docker Compose?',
    faq4_a: 'Docker Compose automatically reads a .env file in the same directory as compose.yml for variable substitution using ${VAR} syntax. For passing variables into containers, use the env_file directive to load from a file, or the environment key to set them inline in compose.yml.',
    faq5_q: 'Can I use .env files in production?',
    faq5_a: 'It is not recommended. In production, use platform-provided environment variables (Vercel, AWS, Heroku dashboards), Docker secrets, or a secret manager like HashiCorp Vault or AWS Secrets Manager. These provide better security with encryption, rotation, audit logging, and access control.',
    faq6_q: 'How do I expose .env variables to the browser in React or Next.js?',
    faq6_a: 'In Next.js, prefix variables with NEXT_PUBLIC_ (e.g., NEXT_PUBLIC_API_URL). In Create React App, use REACT_APP_ prefix. In Vite, use VITE_ prefix. Only prefixed variables are embedded in the client bundle. Never expose secrets this way -- only use it for public configuration like API endpoints.',
  },
  zh: {
    title: '.env 文件指南：环境变量最佳实践',
    intro: '环境变量将密钥从源代码中分离，让你无需重新部署即可更改配置。<strong>.env 文件</strong>已成为本地管理环境变量的标准方式。本指南涵盖语法规则、框架配置、安全、环境特定文件、Docker 集成、常见错误和生产替代方案。',
    h2_syntax: '.env 语法规则',
    syntax_intro: '.env 文件是纯文本文件，每行一个变量。以下是每个开发者都应该知道的规则：',
    h3_basic: '基本语法',
    basic_desc: '每行遵循 KEY=VALUE 模式，等号周围不加空格。',
    h3_quoting: '引号规则',
    quoting_desc: '值可以不加引号、用单引号或双引号，行为各不相同：',
    quoting_unquoted: '不加引号：尾部空白被去除，无转义序列。',
    quoting_single: '单引号：值按字面量处理，无插值，无转义。',
    quoting_double: '双引号：支持转义序列（\\n, \\t）和变量插值。',
    h3_multiline: '多行值',
    multiline_desc: '使用双引号和 \\n 表示换行，或在双引号内使用实际换行：',
    h3_comments: '注释',
    comments_desc: '以 # 开头的行是注释。在某些解析器中，不加引号的值可以使用行内注释：',
    h3_interpolation: '变量插值',
    interpolation_desc: '使用 ${VAR} 语法引用其他变量（大多数解析器在双引号值中支持）：',
    h2_frameworks: '框架配置',
    h3_nodejs: 'Node.js (dotenv)',
    nodejs_desc: 'Node.js 最流行的 .env 加载器。安装并配置：',
    nodejs_note: 'Next.js、Vite 和 Create React App 会自动加载 .env 文件，无需额外安装包。',
    h3_python: 'Python (python-dotenv)',
    python_desc: '在 Python 项目中加载 .env：',
    h3_go: 'Go (godotenv)',
    go_desc: '在 Go 项目中加载 .env：',
    h3_php: 'PHP (vlucas/phpdotenv)',
    php_desc: 'Laravel 和大多数 PHP 框架使用：',
    h3_ruby: 'Ruby (dotenv gem)',
    ruby_desc: 'Rails 和其他 Ruby 项目使用：',
    h2_security: '安全：永远不要提交 .env 文件',
    security_intro: '.env 文件包含密钥（API 密钥、数据库密码、令牌）。将其提交到版本控制是第一大安全错误。',
    h3_gitignore: '.gitignore 模式',
    gitignore_desc: '立即将以下模式添加到 .gitignore 文件：',
    h3_env_example: '使用 .env.example',
    env_example_desc: '提交一个值为空的 .env.example 文件，让团队成员知道需要哪些变量：',
    h3_already_committed: '已经提交了 .env？',
    already_committed_desc: '如果你不小心提交了 .env 文件，将其从跟踪中移除并轮换所有密钥：',
    h2_env_specific: '环境特定文件',
    env_specific_intro: '大多数框架支持多个 .env 文件用于不同环境。理解加载顺序至关重要。',
    h3_loading_order: '加载顺序（Next.js / Vite / CRA）',
    loading_order_desc: '文件按以下优先级加载（后面的文件覆盖前面的）：',
    loading_note: '.env.local 始终被 git 忽略（将其添加到 .gitignore）。测试时不会加载此文件，以保持测试的确定性。',
    h3_which_file: '哪个文件用于什么？',
    h2_docker: 'Docker 和 Docker Compose 集成',
    h3_env_file: 'env_file 指令',
    env_file_desc: 'Docker Compose 可以直接将 .env 文件加载到容器中：',
    h3_environment: 'environment vs env_file',
    environment_desc: '你也可以内联环境变量。区别如下：',
    env_file_pros: 'env_file：从文件加载，保持 compose.yml 整洁，便于按环境切换。',
    environment_pros: 'environment：在 compose.yml 中可见，适合非敏感值，支持变量替换。',
    h3_docker_env: '.env 用于 Docker Compose 变量',
    docker_env_desc: 'Docker Compose 自动读取项目根目录的 .env 文件，用于 compose.yml 中的变量替换：',
    h2_errors: '10 个常见 .env 错误及修复',
    errors_intro: '以下是开发者最常遇到的 .env 问题：',
    col_error: '错误',
    col_cause: '原因',
    col_fix: '修复',
    err1_error: 'process.env.VAR 为 undefined',
    err1_cause: 'dotenv 未加载或在使用后才加载',
    err1_fix: '在入口文件最顶部调用 dotenv.config()',
    err2_error: '生产环境中变量为空',
    err2_cause: '.env 文件未部署；依赖文件而非平台环境变量',
    err2_fix: '在托管平台（Vercel、AWS 等）中设置环境变量',
    err3_error: '.env 值中包含引号',
    err3_cause: '解析器将引号视为字面字符',
    err3_fix: '查看解析器文档；大多数会去除双引号但并非全部',
    err4_error: '加载了错误的 .env 文件',
    err4_cause: '工作目录与预期路径不同',
    err4_fix: '使用 path 选项：dotenv.config({ path: ".env.local" })',
    err5_error: '多行值被截断',
    err5_cause: '值未正确使用双引号包裹',
    err5_fix: '用双引号包裹多行值',
    err6_error: '特殊字符破坏值',
    err6_cause: '$ 或 # 被解释为插值/注释',
    err6_fix: '使用单引号防止插值，或用 \\ 转义',
    err7_error: 'BOM 编码错误',
    err7_cause: 'Windows 编辑器以 UTF-8 BOM 保存 .env',
    err7_fix: '保存为不带 BOM 的 UTF-8；否则第一个变量可能无法读取',
    err8_error: 'Docker 容器环境变量为空',
    err8_cause: 'env_file 路径不正确或文件不在构建上下文中',
    err8_fix: '确认路径相对于 compose.yml 的位置',
    err9_error: '= 周围的空格导致解析失败',
    err9_cause: 'KEY = VALUE 而非 KEY=VALUE',
    err9_fix: '删除等号周围的空格',
    err10_error: '浏览器中变量不可用（React/Next）',
    err10_cause: '缺少必需的前缀（NEXT_PUBLIC_ 或 REACT_APP_）',
    err10_fix: '添加框架要求的前缀以暴露给客户端代码',
    h2_production: '生产替代方案',
    production_intro: '在生产环境中，不建议使用 .env 文件。请使用以下替代方案：',
    h3_platform: '平台环境变量',
    platform_desc: '每个主要托管平台都提供 UI 或 CLI 来设置环境变量：',
    h3_docker_secrets: 'Docker Secrets',
    docker_secrets_desc: '对于 Docker Swarm 或 Compose，使用 secrets 处理敏感数据：',
    h3_vault: '密钥管理器（Vault, AWS Secrets Manager）',
    vault_desc: '对于企业应用，使用专用密钥管理器：',
    vault_note: '密钥管理器提供轮换、审计日志、访问控制和静态加密——这些是 .env 文件无法提供的功能。',
    h2_faq: '常见问题',
    faq1_q: '应该将 .env 文件提交到 Git 吗？',
    faq1_a: '永远不要将包含密钥（API 密钥、密码、令牌）的 .env 文件提交到版本控制。相反，提交一个值为空的 .env.example 文件，让团队成员知道需要哪些变量。在 .gitignore 文件中添加 .env* 模式。',
    faq2_q: '.env、.env.local 和 .env.production 有什么区别？',
    faq2_a: '.env 包含所有环境加载的默认值。.env.local 包含本地覆盖，不提交到 git。.env.production 包含仅在 NODE_ENV=production 时加载的生产特定值。加载顺序为：.env、.env.local、.env.[环境]、.env.[环境].local，后面的文件覆盖前面的。',
    faq3_q: '为什么 Node.js 中 process.env.MY_VAR 是 undefined？',
    faq3_a: '最常见的原因是：1) 忘记安装并在入口文件顶部调用 require("dotenv").config()，2) .env 文件不在 Node 运行的根目录中，3) 变量名拼写错误，4) 使用 ES 模块需要用 "import dotenv/config"。',
    faq4_q: '如何在 Docker Compose 中使用 .env 变量？',
    faq4_a: 'Docker Compose 自动读取与 compose.yml 同目录的 .env 文件，使用 ${VAR} 语法进行变量替换。要将变量传入容器，使用 env_file 指令从文件加载，或使用 environment 键在 compose.yml 中内联设置。',
    faq5_q: '生产环境可以使用 .env 文件吗？',
    faq5_a: '不建议。在生产环境中，使用平台提供的环境变量（Vercel、AWS、Heroku 控制面板）、Docker secrets 或密钥管理器如 HashiCorp Vault 或 AWS Secrets Manager。这些提供更好的安全性，包括加密、轮换、审计日志和访问控制。',
    faq6_q: '如何在 React 或 Next.js 中将 .env 变量暴露给浏览器？',
    faq6_a: '在 Next.js 中，变量名前缀为 NEXT_PUBLIC_（如 NEXT_PUBLIC_API_URL）。在 Create React App 中使用 REACT_APP_ 前缀。在 Vite 中使用 VITE_ 前缀。只有带前缀的变量才会嵌入客户端包。永远不要用这种方式暴露密钥，仅用于公共配置如 API 端点。',
  },
  ja: {
    title: '.env ファイルガイド：環境変数のベストプラクティス',
    intro: '環境変数はシークレットをソースコードから分離し、再デプロイせずに設定を変更できます。<strong>.env ファイル</strong>はローカルで環境変数を管理する標準的な方法です。このガイドでは構文規則、フレームワーク設定、セキュリティ、環境別ファイル、Docker 統合、よくあるエラー、本番環境の代替手段を解説します。',
    h2_syntax: '.env 構文規則',
    syntax_intro: '.env ファイルは1行に1変数のプレーンテキストファイルです。すべての開発者が知っておくべきルール：',
    h3_basic: '基本構文',
    basic_desc: '各行は KEY=VALUE パターンに従います。等号の前後にスペースは入れません。',
    h3_quoting: 'クォート規則',
    quoting_desc: '値はクォートなし、シングルクォート、ダブルクォートが使えます。動作が異なります：',
    quoting_unquoted: 'クォートなし：末尾の空白は除去、エスケープシーケンスなし。',
    quoting_single: 'シングルクォート：値はリテラルとして扱われ、展開やエスケープなし。',
    quoting_double: 'ダブルクォート：エスケープシーケンス（\\n, \\t）と変数展開をサポート。',
    h3_multiline: '複数行の値',
    multiline_desc: 'ダブルクォートと \\n で改行を表すか、ダブルクォート内で実際の改行を使用：',
    h3_comments: 'コメント',
    comments_desc: '# で始まる行はコメントです。一部のパーサーではクォートなしの値でインラインコメントが使えます：',
    h3_interpolation: '変数展開',
    interpolation_desc: '${VAR} 構文で他の変数を参照（ほとんどのパーサーがダブルクォート内でサポート）：',
    h2_frameworks: 'フレームワーク設定',
    h3_nodejs: 'Node.js (dotenv)',
    nodejs_desc: 'Node.js で最も人気のある .env ローダー。インストールと設定：',
    nodejs_note: 'Next.js、Vite、Create React App は .env ファイルを自動的に読み込みます。パッケージのインストールは不要です。',
    h3_python: 'Python (python-dotenv)',
    python_desc: 'Python プロジェクトで .env を読み込む：',
    h3_go: 'Go (godotenv)',
    go_desc: 'Go プロジェクトで .env を読み込む：',
    h3_php: 'PHP (vlucas/phpdotenv)',
    php_desc: 'Laravel やほとんどの PHP フレームワークで使用：',
    h3_ruby: 'Ruby (dotenv gem)',
    ruby_desc: 'Rails やその他の Ruby プロジェクトで使用：',
    h2_security: 'セキュリティ：.env ファイルを絶対にコミットしない',
    security_intro: '.env ファイルにはシークレット（API キー、データベースパスワード、トークン）が含まれます。バージョン管理にコミットすることは最大のセキュリティミスです。',
    h3_gitignore: '.gitignore パターン',
    gitignore_desc: '以下のパターンをすぐに .gitignore ファイルに追加してください：',
    h3_env_example: '.env.example を使う',
    env_example_desc: '値を空にした .env.example ファイルをコミットして、チームメンバーに必要な変数を知らせます：',
    h3_already_committed: 'すでに .env をコミットした場合',
    already_committed_desc: '誤って .env ファイルをコミットした場合、トラッキングから削除してすべてのシークレットをローテーションしてください：',
    h2_env_specific: '環境別ファイル',
    env_specific_intro: 'ほとんどのフレームワークは異なる環境用に複数の .env ファイルをサポートしています。読み込み順序の理解が重要です。',
    h3_loading_order: '読み込み順序（Next.js / Vite / CRA）',
    loading_order_desc: 'ファイルは以下の優先順位で読み込まれます（後のファイルが前のファイルを上書き）：',
    loading_note: '.env.local は常に git で無視されます（.gitignore に追加）。テストの決定性を保つため、テスト時にはこのファイルは読み込まれません。',
    h3_which_file: 'どのファイルを何に使う？',
    h2_docker: 'Docker と Docker Compose の統合',
    h3_env_file: 'env_file ディレクティブ',
    env_file_desc: 'Docker Compose は .env ファイルをコンテナに直接読み込めます：',
    h3_environment: 'environment vs env_file',
    environment_desc: '環境変数をインラインで設定することもできます。違いは次の通り：',
    env_file_pros: 'env_file：ファイルから読み込み、compose.yml をきれいに保ち、環境ごとに簡単に切り替え可能。',
    environment_pros: 'environment：compose.yml 内で確認可能、シークレットでない値に適し、変数置換をサポート。',
    h3_docker_env: 'Docker Compose 変数用 .env',
    docker_env_desc: 'Docker Compose はプロジェクトルートの .env ファイルを自動読み込みし、compose.yml 内の変数置換に使用：',
    h2_errors: 'よくある .env エラー10選と修正方法',
    errors_intro: '開発者が最も頻繁に遭遇する .env の問題：',
    col_error: 'エラー',
    col_cause: '原因',
    col_fix: '修正',
    err1_error: 'process.env.VAR が undefined',
    err1_cause: 'dotenv が未読み込みまたは使用後に読み込み',
    err1_fix: 'エントリファイルの最上部で dotenv.config() を呼び出す',
    err2_error: '本番環境で変数が空',
    err2_cause: '.env ファイル未デプロイ、ファイルに依存している',
    err2_fix: 'ホスティングプラットフォーム（Vercel、AWS 等）で環境変数を設定',
    err3_error: '.env の値に引用符が含まれる',
    err3_cause: 'パーサーが引用符をリテラル文字として扱う',
    err3_fix: 'パーサーのドキュメントを確認',
    err4_error: '間違った .env ファイルが読み込まれる',
    err4_cause: '作業ディレクトリが想定パスと異なる',
    err4_fix: 'path オプションを使用: dotenv.config({ path: ".env.local" })',
    err5_error: '複数行の値が切り捨てられる',
    err5_cause: '値が正しくダブルクォートされていない',
    err5_fix: '複数行の値をダブルクォートで囲む',
    err6_error: '特殊文字が値を壊す',
    err6_cause: '$ や # が展開/コメントとして解釈される',
    err6_fix: 'シングルクォートで展開を防止、または \\ でエスケープ',
    err7_error: 'BOM エンコーディングエラー',
    err7_cause: 'Windows エディタが UTF-8 BOM で .env を保存',
    err7_fix: 'BOM なしの UTF-8 で保存。そうしないと最初の変数が読めなくなる可能性あり',
    err8_error: 'Docker コンテナの環境変数が空',
    err8_cause: 'env_file のパスが不正、またはファイルがビルドコンテキスト外',
    err8_fix: 'パスが compose.yml の場所からの相対パスであることを確認',
    err9_error: '= 前後のスペースでパースが失敗',
    err9_cause: 'KEY=VALUE ではなく KEY = VALUE',
    err9_fix: '等号の前後のスペースを削除',
    err10_error: 'ブラウザで変数が利用不可（React/Next）',
    err10_cause: '必要なプレフィックス（NEXT_PUBLIC_ または REACT_APP_）がない',
    err10_fix: 'フレームワークが要求するプレフィックスを追加してクライアント側コードに公開',
    h2_production: '本番環境の代替手段',
    production_intro: '本番環境では .env ファイルは推奨されません。以下の代替手段を使用してください：',
    h3_platform: 'プラットフォーム環境変数',
    platform_desc: 'すべての主要ホスティングプラットフォームが環境変数設定用の UI または CLI を提供：',
    h3_docker_secrets: 'Docker Secrets',
    docker_secrets_desc: 'Docker Swarm または Compose では、機密データに secrets を使用：',
    h3_vault: 'シークレットマネージャー（Vault, AWS Secrets Manager）',
    vault_desc: 'エンタープライズアプリケーションには専用のシークレットマネージャーを使用：',
    vault_note: 'シークレットマネージャーはローテーション、監査ログ、アクセス制御、保存時の暗号化を提供します。これらは .env ファイルでは実現できない機能です。',
    h2_faq: 'よくある質問',
    faq1_q: '.env ファイルを Git にコミットすべきですか？',
    faq1_a: 'シークレット（API キー、パスワード、トークン）を含む .env ファイルは絶対にバージョン管理にコミットしないでください。代わりに、値を空にした .env.example ファイルをコミットしてください。.gitignore に .env* パターンを追加してください。',
    faq2_q: '.env、.env.local、.env.production の違いは？',
    faq2_a: '.env はすべての環境で読み込まれるデフォルト値を含みます。.env.local はローカルの上書き値を含み、git にコミットしません。.env.production は NODE_ENV=production 時のみ読み込まれる本番固有の値を含みます。読み込み順序は：.env、.env.local、.env.[環境]、.env.[環境].local で、後のファイルが前のファイルを上書きします。',
    faq3_q: 'Node.js で process.env.MY_VAR が undefined なのはなぜ？',
    faq3_a: '最も一般的な原因：1) エントリファイルの先頭で require("dotenv").config() を呼び忘れ、2) .env ファイルが Node の実行ルートにない、3) 変数名のタイプミス、4) ES モジュールを使用していて "import dotenv/config" が必要。',
    faq4_q: 'Docker Compose で .env 変数を使うには？',
    faq4_a: 'Docker Compose は compose.yml と同じディレクトリの .env ファイルを自動的に読み込み、${VAR} 構文で変数置換を行います。コンテナに変数を渡すには、env_file ディレクティブでファイルから読み込むか、environment キーで compose.yml にインラインで設定します。',
    faq5_q: '本番環境で .env ファイルを使えますか？',
    faq5_a: '推奨されません。本番環境では、プラットフォーム提供の環境変数（Vercel、AWS、Heroku ダッシュボード）、Docker secrets、または HashiCorp Vault や AWS Secrets Manager などのシークレットマネージャーを使用してください。',
    faq6_q: 'React や Next.js で .env 変数をブラウザに公開するには？',
    faq6_a: 'Next.js では変数名に NEXT_PUBLIC_ プレフィックスを付けます（例：NEXT_PUBLIC_API_URL）。Create React App では REACT_APP_ プレフィックス、Vite では VITE_ プレフィックスを使います。プレフィックス付きの変数のみがクライアントバンドルに埋め込まれます。',
  },
  ko: {
    title: '.env 파일 가이드: 환경 변수 모범 사례',
    intro: '환경 변수는 시크릿을 소스 코드에서 분리하고 재배포 없이 설정을 변경할 수 있게 합니다. <strong>.env 파일</strong>은 로컬에서 환경 변수를 관리하는 표준 방법입니다. 이 가이드에서는 구문 규칙, 프레임워크 설정, 보안, 환경별 파일, Docker 통합, 일반적인 오류 및 프로덕션 대안을 다룹니다.',
    h2_syntax: '.env 구문 규칙',
    syntax_intro: '.env 파일은 한 줄에 하나의 변수가 있는 일반 텍스트 파일입니다. 모든 개발자가 알아야 할 규칙:',
    h3_basic: '기본 구문',
    basic_desc: '각 줄은 KEY=VALUE 패턴을 따릅니다. 등호 주위에 공백을 넣지 마세요.',
    h3_quoting: '따옴표 규칙',
    quoting_desc: '값은 따옴표 없이, 작은따옴표, 큰따옴표로 사용할 수 있습니다. 동작이 다릅니다:',
    quoting_unquoted: '따옴표 없음: 후행 공백이 제거되고, 이스케이프 시퀀스 없음.',
    quoting_single: '작은따옴표: 값이 리터럴로 처리되며, 보간이나 이스케이프 없음.',
    quoting_double: '큰따옴표: 이스케이프 시퀀스(\\n, \\t)와 변수 보간 지원.',
    h3_multiline: '여러 줄 값',
    multiline_desc: '큰따옴표와 \\n으로 줄 바꿈을 표현하거나, 큰따옴표 안에서 실제 줄 바꿈 사용:',
    h3_comments: '주석',
    comments_desc: '#으로 시작하는 줄은 주석입니다. 일부 파서에서는 따옴표 없는 값에 인라인 주석을 사용할 수 있습니다:',
    h3_interpolation: '변수 보간',
    interpolation_desc: '${VAR} 구문으로 다른 변수를 참조 (대부분의 파서가 큰따옴표 값에서 지원):',
    h2_frameworks: '프레임워크 설정',
    h3_nodejs: 'Node.js (dotenv)',
    nodejs_desc: 'Node.js에서 가장 인기 있는 .env 로더. 설치 및 설정:',
    nodejs_note: 'Next.js, Vite, Create React App은 .env 파일을 자동으로 로드합니다. 패키지 설치가 필요 없습니다.',
    h3_python: 'Python (python-dotenv)',
    python_desc: 'Python 프로젝트에서 .env 로드:',
    h3_go: 'Go (godotenv)',
    go_desc: 'Go 프로젝트에서 .env 로드:',
    h3_php: 'PHP (vlucas/phpdotenv)',
    php_desc: 'Laravel과 대부분의 PHP 프레임워크에서 사용:',
    h3_ruby: 'Ruby (dotenv gem)',
    ruby_desc: 'Rails와 기타 Ruby 프로젝트에서 사용:',
    h2_security: '보안: .env 파일을 절대 커밋하지 마세요',
    security_intro: '.env 파일에는 시크릿(API 키, 데이터베이스 비밀번호, 토큰)이 포함되어 있습니다. 이를 버전 관리에 커밋하는 것은 가장 큰 보안 실수입니다.',
    h3_gitignore: '.gitignore 패턴',
    gitignore_desc: '다음 패턴을 즉시 .gitignore 파일에 추가하세요:',
    h3_env_example: '.env.example 사용',
    env_example_desc: '빈 값으로 .env.example 파일을 커밋하여 팀원에게 필요한 변수를 알려주세요:',
    h3_already_committed: '이미 .env를 커밋한 경우',
    already_committed_desc: '실수로 .env 파일을 커밋한 경우, 추적에서 제거하고 모든 시크릿을 교체하세요:',
    h2_env_specific: '환경별 파일',
    env_specific_intro: '대부분의 프레임워크는 다양한 환경을 위한 여러 .env 파일을 지원합니다. 로딩 순서를 이해하는 것이 중요합니다.',
    h3_loading_order: '로딩 순서 (Next.js / Vite / CRA)',
    loading_order_desc: '파일은 다음 우선순위로 로드됩니다 (나중 파일이 이전 파일을 덮어씀):',
    loading_note: '.env.local은 항상 git에서 무시됩니다 (.gitignore에 추가). 테스트의 결정성을 유지하기 위해 테스트 중에는 이 파일이 로드되지 않습니다.',
    h3_which_file: '어떤 파일을 어디에 사용?',
    h2_docker: 'Docker 및 Docker Compose 통합',
    h3_env_file: 'env_file 지시자',
    env_file_desc: 'Docker Compose는 .env 파일을 컨테이너에 직접 로드할 수 있습니다:',
    h3_environment: 'environment vs env_file',
    environment_desc: '환경 변수를 인라인으로 설정할 수도 있습니다. 차이점:',
    env_file_pros: 'env_file: 파일에서 로드, compose.yml을 깔끔하게 유지, 환경별로 쉽게 교체.',
    environment_pros: 'environment: compose.yml에서 확인 가능, 비밀이 아닌 값에 적합, 변수 치환 지원.',
    h3_docker_env: 'Docker Compose 변수용 .env',
    docker_env_desc: 'Docker Compose는 프로젝트 루트의 .env 파일을 자동으로 읽어 compose.yml의 변수 치환에 사용:',
    h2_errors: '일반적인 .env 오류 10가지와 수정 방법',
    errors_intro: '개발자가 가장 자주 겪는 .env 문제:',
    col_error: '오류',
    col_cause: '원인',
    col_fix: '수정',
    err1_error: 'process.env.VAR가 undefined',
    err1_cause: 'dotenv가 로드되지 않았거나 사용 후 로드됨',
    err1_fix: '엔트리 파일 최상단에서 dotenv.config() 호출',
    err2_error: '프로덕션에서 변수가 비어 있음',
    err2_cause: '.env 파일이 배포되지 않음; 플랫폼 환경 변수 대신 파일에 의존',
    err2_fix: '호스팅 플랫폼(Vercel, AWS 등)에서 환경 변수 설정',
    err3_error: '.env 값에 따옴표가 포함됨',
    err3_cause: '파서가 따옴표를 리터럴 문자로 처리',
    err3_fix: '파서 문서 확인; 대부분은 큰따옴표를 제거하지만 전부는 아님',
    err4_error: '잘못된 .env 파일이 로드됨',
    err4_cause: '작업 디렉터리가 예상 경로와 다름',
    err4_fix: 'path 옵션 사용: dotenv.config({ path: ".env.local" })',
    err5_error: '여러 줄 값이 잘림',
    err5_cause: '값이 올바르게 큰따옴표로 감싸지지 않음',
    err5_fix: '여러 줄 값을 큰따옴표로 감싸기',
    err6_error: '특수 문자가 값을 손상',
    err6_cause: '$ 또는 #이 보간/주석으로 해석됨',
    err6_fix: '작은따옴표로 보간 방지, 또는 \\로 이스케이프',
    err7_error: 'BOM 인코딩 오류',
    err7_cause: 'Windows 편집기가 UTF-8 BOM으로 .env를 저장',
    err7_fix: 'BOM 없는 UTF-8로 저장; 그렇지 않으면 첫 번째 변수를 읽을 수 없을 수 있음',
    err8_error: 'Docker 컨테이너 환경 변수가 비어 있음',
    err8_cause: 'env_file 경로가 잘못되었거나 파일이 빌드 컨텍스트 밖에 있음',
    err8_fix: '경로가 compose.yml 위치 기준 상대 경로인지 확인',
    err9_error: '= 주위의 공백으로 파싱 실패',
    err9_cause: 'KEY=VALUE 대신 KEY = VALUE',
    err9_fix: '등호 주위의 공백 제거',
    err10_error: '브라우저에서 변수를 사용할 수 없음 (React/Next)',
    err10_cause: '필수 접두사(NEXT_PUBLIC_ 또는 REACT_APP_)가 없음',
    err10_fix: '프레임워크가 요구하는 접두사를 추가하여 클라이언트 측 코드에 노출',
    h2_production: '프로덕션 대안',
    production_intro: '프로덕션에서는 .env 파일이 권장되지 않습니다. 다음 대안을 사용하세요:',
    h3_platform: '플랫폼 환경 변수',
    platform_desc: '모든 주요 호스팅 플랫폼이 환경 변수 설정을 위한 UI 또는 CLI를 제공:',
    h3_docker_secrets: 'Docker Secrets',
    docker_secrets_desc: 'Docker Swarm 또는 Compose에서 민감한 데이터에 secrets 사용:',
    h3_vault: '시크릿 매니저 (Vault, AWS Secrets Manager)',
    vault_desc: '엔터프라이즈 애플리케이션에는 전용 시크릿 매니저 사용:',
    vault_note: '시크릿 매니저는 교체, 감사 로그, 접근 제어, 저장 시 암호화를 제공합니다. 이는 .env 파일로는 불가능한 기능입니다.',
    h2_faq: '자주 묻는 질문',
    faq1_q: '.env 파일을 Git에 커밋해야 하나요?',
    faq1_a: '시크릿(API 키, 비밀번호, 토큰)이 포함된 .env 파일은 절대 버전 관리에 커밋하지 마세요. 대신 빈 플레이스홀더 값이 있는 .env.example 파일을 커밋하세요. .gitignore에 .env* 패턴을 추가하세요.',
    faq2_q: '.env, .env.local, .env.production의 차이점은?',
    faq2_a: '.env는 모든 환경에서 로드되는 기본값을 포함합니다. .env.local은 로컬 오버라이드를 포함하며 git에 커밋하지 않습니다. .env.production은 NODE_ENV=production일 때만 로드되는 프로덕션 전용 값을 포함합니다.',
    faq3_q: 'Node.js에서 process.env.MY_VAR가 undefined인 이유는?',
    faq3_a: '가장 일반적인 원인: 1) 엔트리 파일 상단에서 require("dotenv").config() 호출을 잊음, 2) .env 파일이 Node가 실행되는 루트 디렉터리에 없음, 3) 변수 이름 오타, 4) ES 모듈을 사용하여 "import dotenv/config"가 필요.',
    faq4_q: 'Docker Compose에서 .env 변수를 사용하는 방법은?',
    faq4_a: 'Docker Compose는 compose.yml과 같은 디렉터리의 .env 파일을 자동으로 읽어 ${VAR} 구문으로 변수 치환을 수행합니다. 컨테이너에 변수를 전달하려면 env_file 지시자로 파일에서 로드하거나 environment 키로 인라인 설정합니다.',
    faq5_q: '프로덕션에서 .env 파일을 사용해도 되나요?',
    faq5_a: '권장되지 않습니다. 프로덕션에서는 플랫폼 제공 환경 변수, Docker secrets, 또는 HashiCorp Vault나 AWS Secrets Manager 같은 시크릿 매니저를 사용하세요.',
    faq6_q: 'React나 Next.js에서 .env 변수를 브라우저에 노출하는 방법은?',
    faq6_a: 'Next.js에서는 변수 이름에 NEXT_PUBLIC_ 접두사를 붙입니다 (예: NEXT_PUBLIC_API_URL). Create React App에서는 REACT_APP_, Vite에서는 VITE_ 접두사를 사용합니다. 접두사가 있는 변수만 클라이언트 번들에 포함됩니다.',
  },
  fr: {
    title: 'Guide .env : Bonnes pratiques des variables d\'environnement',
    intro: 'Les variables d\'environnement gardent les secrets hors du code source et permettent de modifier la configuration sans redéployer. Le <strong>fichier .env</strong> est devenu la méthode standard pour les gérer localement. Ce guide couvre les règles de syntaxe, la configuration des frameworks, la sécurité, les fichiers spécifiques à l\'environnement, l\'intégration Docker, les erreurs courantes et les alternatives en production.',
    h2_syntax: 'Règles de syntaxe .env',
    syntax_intro: 'Un fichier .env est un fichier texte brut avec une variable par ligne. Voici les règles que tout développeur doit connaître :',
    h3_basic: 'Syntaxe de base',
    basic_desc: 'Chaque ligne suit le modèle KEY=VALUE. Pas d\'espaces autour du signe égal.',
    h3_quoting: 'Règles de guillemets',
    quoting_desc: 'Les valeurs peuvent être sans guillemets, entre guillemets simples ou doubles. Le comportement diffère :',
    quoting_unquoted: 'Sans guillemets : les espaces en fin de ligne sont supprimés, pas de séquences d\'échappement.',
    quoting_single: 'Guillemets simples : la valeur est prise littéralement, pas d\'interpolation ni d\'échappement.',
    quoting_double: 'Guillemets doubles : supporte les séquences d\'échappement (\\n, \\t) et l\'interpolation de variables.',
    h3_multiline: 'Valeurs multilignes',
    multiline_desc: 'Utilisez des guillemets doubles et \\n pour les sauts de ligne, ou des sauts de ligne réels entre guillemets doubles :',
    h3_comments: 'Commentaires',
    comments_desc: 'Les lignes commençant par # sont des commentaires. Les commentaires en ligne fonctionnent uniquement avec les valeurs sans guillemets dans certains parseurs :',
    h3_interpolation: 'Interpolation de variables',
    interpolation_desc: 'Référencez d\'autres variables avec la syntaxe ${VAR} (supporté par la plupart des parseurs dans les valeurs entre guillemets doubles) :',
    h2_frameworks: 'Configuration des frameworks',
    h3_nodejs: 'Node.js (dotenv)',
    nodejs_desc: 'Le chargeur .env le plus populaire pour Node.js. Installation et configuration :',
    nodejs_note: 'Next.js, Vite et Create React App chargent automatiquement les fichiers .env — aucun package nécessaire.',
    h3_python: 'Python (python-dotenv)',
    python_desc: 'Charger .env dans les projets Python :',
    h3_go: 'Go (godotenv)',
    go_desc: 'Charger .env dans les projets Go :',
    h3_php: 'PHP (vlucas/phpdotenv)',
    php_desc: 'Utilisé par Laravel et la plupart des frameworks PHP :',
    h3_ruby: 'Ruby (gem dotenv)',
    ruby_desc: 'Utilisé par Rails et d\'autres projets Ruby :',
    h2_security: 'Sécurité : ne jamais commiter les fichiers .env',
    security_intro: 'Votre fichier .env contient des secrets (clés API, mots de passe de base de données, tokens). Le commiter dans le contrôle de version est l\'erreur de sécurité n°1.',
    h3_gitignore: 'Patterns .gitignore',
    gitignore_desc: 'Ajoutez immédiatement ces patterns à votre fichier .gitignore :',
    h3_env_example: 'Utiliser .env.example',
    env_example_desc: 'Commitez un fichier .env.example avec des valeurs vides pour que les coéquipiers sachent quelles variables sont requises :',
    h3_already_committed: '.env déjà commité ?',
    already_committed_desc: 'Si vous avez accidentellement commité un fichier .env, retirez-le du suivi et changez tous les secrets :',
    h2_env_specific: 'Fichiers spécifiques à l\'environnement',
    env_specific_intro: 'La plupart des frameworks supportent plusieurs fichiers .env pour différents environnements. Comprendre l\'ordre de chargement est crucial.',
    h3_loading_order: 'Ordre de chargement (Next.js / Vite / CRA)',
    loading_order_desc: 'Les fichiers sont chargés dans cet ordre de priorité (les fichiers suivants écrasent les précédents) :',
    loading_note: '.env.local est toujours ignoré par git (ajoutez-le à .gitignore). Il n\'est PAS chargé pendant les tests pour garder les tests déterministes.',
    h3_which_file: 'Quel fichier pour quoi ?',
    h2_docker: 'Intégration Docker et Docker Compose',
    h3_env_file: 'Directive env_file',
    env_file_desc: 'Docker Compose peut charger les fichiers .env directement dans les conteneurs :',
    h3_environment: 'environment vs env_file',
    environment_desc: 'Vous pouvez aussi définir les variables d\'environnement en ligne. Voici la différence :',
    env_file_pros: 'env_file : charge depuis un fichier, garde compose.yml propre, facile à changer par environnement.',
    environment_pros: 'environment : visible dans compose.yml, adapté aux valeurs non secrètes, supporte la substitution de variables.',
    h3_docker_env: '.env pour les variables Docker Compose',
    docker_env_desc: 'Docker Compose lit automatiquement un fichier .env à la racine du projet pour la substitution de variables dans compose.yml :',
    h2_errors: '10 erreurs .env courantes et corrections',
    errors_intro: 'Voici les problèmes .env les plus fréquents rencontrés par les développeurs :',
    col_error: 'Erreur',
    col_cause: 'Cause',
    col_fix: 'Correction',
    err1_error: 'process.env.VAR est undefined',
    err1_cause: 'dotenv non chargé ou chargé après utilisation',
    err1_fix: 'Appelez dotenv.config() tout en haut de votre fichier d\'entrée',
    err2_error: 'Variables vides en production',
    err2_cause: 'Fichier .env non déployé ; dépendance au fichier plutôt qu\'aux variables de la plateforme',
    err2_fix: 'Définissez les variables dans votre plateforme d\'hébergement (Vercel, AWS, etc.)',
    err3_error: 'Les valeurs .env contiennent des guillemets',
    err3_cause: 'Le parseur traite les guillemets comme des caractères littéraux',
    err3_fix: 'Vérifiez la documentation du parseur',
    err4_error: 'Mauvais fichier .env chargé',
    err4_cause: 'Le répertoire de travail diffère du chemin attendu',
    err4_fix: 'Utilisez l\'option path : dotenv.config({ path: ".env.local" })',
    err5_error: 'Valeur multiligne tronquée',
    err5_cause: 'Valeur non correctement entre guillemets doubles',
    err5_fix: 'Entourez les valeurs multilignes de guillemets doubles',
    err6_error: 'Les caractères spéciaux cassent la valeur',
    err6_cause: '$ ou # interprété comme interpolation/commentaire',
    err6_fix: 'Utilisez des guillemets simples ou échappez avec \\',
    err7_error: 'Erreur d\'encodage BOM',
    err7_cause: 'Éditeur Windows sauvegarde .env en UTF-8 BOM',
    err7_fix: 'Sauvegardez en UTF-8 sans BOM',
    err8_error: 'Variables d\'environnement Docker vides',
    err8_cause: 'Chemin env_file incorrect ou fichier hors du contexte de build',
    err8_fix: 'Vérifiez que le chemin est relatif à l\'emplacement de compose.yml',
    err9_error: 'Espaces autour de = cassent le parsing',
    err9_cause: 'KEY = VALUE au lieu de KEY=VALUE',
    err9_fix: 'Supprimez les espaces autour du signe égal',
    err10_error: 'Variables indisponibles dans le navigateur (React/Next)',
    err10_cause: 'Préfixe requis manquant (NEXT_PUBLIC_ ou REACT_APP_)',
    err10_fix: 'Ajoutez le préfixe requis par le framework pour exposer au code côté client',
    h2_production: 'Alternatives en production',
    production_intro: 'En production, les fichiers .env ne sont pas recommandés. Utilisez ces alternatives :',
    h3_platform: 'Variables d\'environnement de la plateforme',
    platform_desc: 'Chaque plateforme d\'hébergement majeure fournit une UI ou CLI pour définir les variables d\'environnement :',
    h3_docker_secrets: 'Docker Secrets',
    docker_secrets_desc: 'Pour Docker Swarm ou Compose, utilisez les secrets pour les données sensibles :',
    h3_vault: 'Gestionnaires de secrets (Vault, AWS Secrets Manager)',
    vault_desc: 'Pour les applications d\'entreprise, utilisez un gestionnaire de secrets dédié :',
    vault_note: 'Les gestionnaires de secrets fournissent la rotation, les logs d\'audit, le contrôle d\'accès et le chiffrement au repos — des fonctionnalités que les fichiers .env ne peuvent pas offrir.',
    h2_faq: 'Questions fréquentes',
    faq1_q: 'Dois-je commiter mon fichier .env dans Git ?',
    faq1_a: 'Ne commitez jamais les fichiers .env contenant des secrets dans le contrôle de version. Commitez plutôt un fichier .env.example avec des valeurs vides. Ajoutez les patterns .env* à votre .gitignore.',
    faq2_q: 'Quelle est la différence entre .env, .env.local et .env.production ?',
    faq2_a: '.env contient les valeurs par défaut chargées dans tous les environnements. .env.local contient les surcharges locales non commitées. .env.production contient les valeurs spécifiques à la production chargées uniquement quand NODE_ENV=production.',
    faq3_q: 'Pourquoi process.env.MY_VAR est undefined dans Node.js ?',
    faq3_a: 'Causes les plus courantes : 1) Oubli d\'appeler require("dotenv").config() en haut du fichier d\'entrée, 2) Le fichier .env n\'est pas à la racine, 3) Faute de frappe dans le nom de variable, 4) Avec ES modules, utilisez "import dotenv/config".',
    faq4_q: 'Comment utiliser les variables .env dans Docker Compose ?',
    faq4_a: 'Docker Compose lit automatiquement un fichier .env dans le même répertoire que compose.yml pour la substitution de variables ${VAR}. Pour passer des variables aux conteneurs, utilisez env_file ou environment.',
    faq5_q: 'Peut-on utiliser les fichiers .env en production ?',
    faq5_a: 'Ce n\'est pas recommandé. En production, utilisez les variables d\'environnement de la plateforme, Docker secrets ou un gestionnaire de secrets comme HashiCorp Vault ou AWS Secrets Manager.',
    faq6_q: 'Comment exposer les variables .env au navigateur dans React ou Next.js ?',
    faq6_a: 'Dans Next.js, préfixez avec NEXT_PUBLIC_. Dans Create React App, utilisez REACT_APP_. Dans Vite, utilisez VITE_. Seules les variables préfixées sont intégrées dans le bundle client.',
  },
  de: {
    title: '.env Datei Leitfaden: Best Practices für Umgebungsvariablen',
    intro: 'Umgebungsvariablen halten Geheimnisse aus dem Quellcode heraus und ermöglichen Konfigurationsänderungen ohne Redeployment. Die <strong>.env-Datei</strong> ist die Standardmethode zur lokalen Verwaltung geworden. Dieser Leitfaden behandelt Syntaxregeln, Framework-Setup, Sicherheit, umgebungsspezifische Dateien, Docker-Integration, häufige Fehler und Produktionsalternativen.',
    h2_syntax: '.env Syntaxregeln',
    syntax_intro: 'Eine .env-Datei ist eine Klartextdatei mit einer Variable pro Zeile. Hier sind die Regeln, die jeder Entwickler kennen sollte:',
    h3_basic: 'Grundsyntax',
    basic_desc: 'Jede Zeile folgt dem KEY=VALUE-Muster. Keine Leerzeichen um das Gleichheitszeichen.',
    h3_quoting: 'Anführungszeichenregeln',
    quoting_desc: 'Werte können ohne Anführungszeichen, in einfachen oder doppelten Anführungszeichen stehen. Das Verhalten unterscheidet sich:',
    quoting_unquoted: 'Ohne Anführungszeichen: nachfolgende Leerzeichen werden entfernt, keine Escape-Sequenzen.',
    quoting_single: 'Einfache Anführungszeichen: Wert wird wörtlich übernommen, keine Interpolation, kein Escaping.',
    quoting_double: 'Doppelte Anführungszeichen: unterstützt Escape-Sequenzen (\\n, \\t) und Variableninterpolation.',
    h3_multiline: 'Mehrzeilige Werte',
    multiline_desc: 'Verwenden Sie doppelte Anführungszeichen und \\n für Zeilenumbrüche oder tatsächliche Zeilenumbrüche in doppelten Anführungszeichen:',
    h3_comments: 'Kommentare',
    comments_desc: 'Zeilen, die mit # beginnen, sind Kommentare. Inline-Kommentare funktionieren nur bei nicht-gequoteten Werten in einigen Parsern:',
    h3_interpolation: 'Variableninterpolation',
    interpolation_desc: 'Referenzieren Sie andere Variablen mit ${VAR}-Syntax (von den meisten Parsern in doppelt gequoteten Werten unterstützt):',
    h2_frameworks: 'Framework-Setup',
    h3_nodejs: 'Node.js (dotenv)',
    nodejs_desc: 'Der beliebteste .env-Loader für Node.js. Installation und Konfiguration:',
    nodejs_note: 'Next.js, Vite und Create React App laden .env-Dateien automatisch — kein Paket nötig.',
    h3_python: 'Python (python-dotenv)',
    python_desc: '.env in Python-Projekten laden:',
    h3_go: 'Go (godotenv)',
    go_desc: '.env in Go-Projekten laden:',
    h3_php: 'PHP (vlucas/phpdotenv)',
    php_desc: 'Wird von Laravel und den meisten PHP-Frameworks verwendet:',
    h3_ruby: 'Ruby (dotenv Gem)',
    ruby_desc: 'Wird von Rails und anderen Ruby-Projekten verwendet:',
    h2_security: 'Sicherheit: .env-Dateien niemals committen',
    security_intro: 'Ihre .env-Datei enthält Geheimnisse (API-Schlüssel, Datenbankpasswörter, Tokens). Sie in die Versionskontrolle zu committen ist der Sicherheitsfehler Nr. 1.',
    h3_gitignore: '.gitignore Muster',
    gitignore_desc: 'Fügen Sie diese Muster sofort zu Ihrer .gitignore-Datei hinzu:',
    h3_env_example: '.env.example verwenden',
    env_example_desc: 'Committen Sie eine .env.example-Datei mit leeren Werten, damit Teammitglieder wissen, welche Variablen benötigt werden:',
    h3_already_committed: '.env bereits committet?',
    already_committed_desc: 'Wenn Sie versehentlich eine .env-Datei committet haben, entfernen Sie sie aus dem Tracking und rotieren Sie alle Geheimnisse:',
    h2_env_specific: 'Umgebungsspezifische Dateien',
    env_specific_intro: 'Die meisten Frameworks unterstützen mehrere .env-Dateien für verschiedene Umgebungen. Das Verständnis der Ladereihenfolge ist entscheidend.',
    h3_loading_order: 'Ladereihenfolge (Next.js / Vite / CRA)',
    loading_order_desc: 'Dateien werden in dieser Priorität geladen (spätere Dateien überschreiben frühere):',
    loading_note: '.env.local wird immer von git ignoriert (zu .gitignore hinzufügen). Es wird NICHT während Tests geladen, um Tests deterministisch zu halten.',
    h3_which_file: 'Welche Datei für was?',
    h2_docker: 'Docker & Docker Compose Integration',
    h3_env_file: 'env_file Direktive',
    env_file_desc: 'Docker Compose kann .env-Dateien direkt in Container laden:',
    h3_environment: 'environment vs env_file',
    environment_desc: 'Sie können Umgebungsvariablen auch inline setzen. Hier ist der Unterschied:',
    env_file_pros: 'env_file: lädt aus Datei, hält compose.yml sauber, leicht pro Umgebung wechselbar.',
    environment_pros: 'environment: in compose.yml sichtbar, gut für nicht-geheime Werte, unterstützt Variablensubstitution.',
    h3_docker_env: '.env für Docker Compose Variablen',
    docker_env_desc: 'Docker Compose liest automatisch eine .env-Datei im Projektstammverzeichnis für Variablensubstitution in compose.yml:',
    h2_errors: '10 häufige .env-Fehler und Lösungen',
    errors_intro: 'Die häufigsten .env-Probleme, auf die Entwickler stoßen:',
    col_error: 'Fehler',
    col_cause: 'Ursache',
    col_fix: 'Lösung',
    err1_error: 'process.env.VAR ist undefined',
    err1_cause: 'dotenv nicht geladen oder nach Verwendung geladen',
    err1_fix: 'dotenv.config() ganz oben in der Einstiegsdatei aufrufen',
    err2_error: 'Variablen in Produktion leer',
    err2_cause: '.env-Datei nicht deployed; Abhängigkeit von Datei statt Plattform-Umgebungsvariablen',
    err2_fix: 'Umgebungsvariablen in der Hosting-Plattform setzen (Vercel, AWS, etc.)',
    err3_error: '.env-Werte enthalten Anführungszeichen',
    err3_cause: 'Parser behandelt Anführungszeichen als literale Zeichen',
    err3_fix: 'Parser-Dokumentation prüfen',
    err4_error: 'Falsche .env-Datei geladen',
    err4_cause: 'Arbeitsverzeichnis weicht vom erwarteten Pfad ab',
    err4_fix: 'path-Option verwenden: dotenv.config({ path: ".env.local" })',
    err5_error: 'Mehrzeiliger Wert abgeschnitten',
    err5_cause: 'Wert nicht korrekt in doppelten Anführungszeichen',
    err5_fix: 'Mehrzeilige Werte in doppelte Anführungszeichen einschließen',
    err6_error: 'Sonderzeichen beschädigen Wert',
    err6_cause: '$ oder # als Interpolation/Kommentar interpretiert',
    err6_fix: 'Einfache Anführungszeichen verwenden oder mit \\ escapen',
    err7_error: 'BOM-Encoding-Fehler',
    err7_cause: 'Windows-Editor speichert .env mit UTF-8 BOM',
    err7_fix: 'Als UTF-8 ohne BOM speichern',
    err8_error: 'Docker-Container-Umgebungsvariablen leer',
    err8_cause: 'env_file-Pfad falsch oder Datei nicht im Build-Kontext',
    err8_fix: 'Pfad relativ zum compose.yml-Speicherort überprüfen',
    err9_error: 'Leerzeichen um = brechen Parsing',
    err9_cause: 'KEY = VALUE statt KEY=VALUE',
    err9_fix: 'Leerzeichen um das Gleichheitszeichen entfernen',
    err10_error: 'Variablen im Browser nicht verfügbar (React/Next)',
    err10_cause: 'Erforderliches Präfix fehlt (NEXT_PUBLIC_ oder REACT_APP_)',
    err10_fix: 'Framework-erforderliches Präfix hinzufügen',
    h2_production: 'Produktionsalternativen',
    production_intro: 'In der Produktion werden .env-Dateien nicht empfohlen. Verwenden Sie stattdessen diese Alternativen:',
    h3_platform: 'Plattform-Umgebungsvariablen',
    platform_desc: 'Jede große Hosting-Plattform bietet UI oder CLI zum Setzen von Umgebungsvariablen:',
    h3_docker_secrets: 'Docker Secrets',
    docker_secrets_desc: 'Für Docker Swarm oder Compose verwenden Sie Secrets für sensible Daten:',
    h3_vault: 'Secret Manager (Vault, AWS Secrets Manager)',
    vault_desc: 'Für Enterprise-Anwendungen einen dedizierten Secret Manager verwenden:',
    vault_note: 'Secret Manager bieten Rotation, Audit-Logging, Zugriffskontrolle und Verschlüsselung im Ruhezustand — Funktionen, die .env-Dateien nicht bieten können.',
    h2_faq: 'Häufig gestellte Fragen',
    faq1_q: 'Sollte ich meine .env-Datei in Git committen?',
    faq1_a: 'Committen Sie niemals .env-Dateien mit Geheimnissen in die Versionskontrolle. Committen Sie stattdessen eine .env.example-Datei mit leeren Platzhalterwerten. Fügen Sie .env*-Muster zu Ihrer .gitignore hinzu.',
    faq2_q: 'Was ist der Unterschied zwischen .env, .env.local und .env.production?',
    faq2_a: '.env enthält Standardwerte für alle Umgebungen. .env.local enthält lokale Überschreibungen und wird nicht committet. .env.production enthält produktionsspezifische Werte, die nur bei NODE_ENV=production geladen werden.',
    faq3_q: 'Warum ist process.env.MY_VAR in Node.js undefined?',
    faq3_a: 'Häufigste Ursachen: 1) Vergessen, require("dotenv").config() oben aufzurufen, 2) .env-Datei nicht im Stammverzeichnis, 3) Tippfehler im Variablennamen, 4) Bei ES-Modulen "import dotenv/config" verwenden.',
    faq4_q: 'Wie verwende ich .env-Variablen in Docker Compose?',
    faq4_a: 'Docker Compose liest automatisch eine .env-Datei im selben Verzeichnis wie compose.yml für ${VAR}-Variablensubstitution. Verwenden Sie env_file oder environment zum Weitergeben an Container.',
    faq5_q: 'Kann ich .env-Dateien in der Produktion verwenden?',
    faq5_a: 'Nicht empfohlen. In der Produktion verwenden Sie Plattform-Umgebungsvariablen, Docker Secrets oder einen Secret Manager wie HashiCorp Vault oder AWS Secrets Manager.',
    faq6_q: 'Wie exponiere ich .env-Variablen an den Browser in React oder Next.js?',
    faq6_a: 'In Next.js mit NEXT_PUBLIC_-Präfix. In Create React App REACT_APP_-Präfix. In Vite VITE_-Präfix. Nur präfixierte Variablen werden in das Client-Bundle eingebettet.',
  },
  es: {
    title: 'Guía .env: Mejores prácticas de variables de entorno',
    intro: 'Las variables de entorno mantienen los secretos fuera del código fuente y permiten cambiar la configuración sin redesplegar. El <strong>archivo .env</strong> se ha convertido en la forma estándar de gestionarlas localmente. Esta guía cubre reglas de sintaxis, configuración de frameworks, seguridad, archivos específicos por entorno, integración con Docker, errores comunes y alternativas en producción.',
    h2_syntax: 'Reglas de sintaxis .env',
    syntax_intro: 'Un archivo .env es un archivo de texto plano con una variable por línea. Estas son las reglas que todo desarrollador debe conocer:',
    h3_basic: 'Sintaxis básica',
    basic_desc: 'Cada línea sigue el patrón KEY=VALUE. Sin espacios alrededor del signo igual.',
    h3_quoting: 'Reglas de comillas',
    quoting_desc: 'Los valores pueden ir sin comillas, con comillas simples o dobles. El comportamiento difiere:',
    quoting_unquoted: 'Sin comillas: se eliminan espacios finales, sin secuencias de escape.',
    quoting_single: 'Comillas simples: el valor se toma literalmente, sin interpolación ni escape.',
    quoting_double: 'Comillas dobles: soporta secuencias de escape (\\n, \\t) e interpolación de variables.',
    h3_multiline: 'Valores multilínea',
    multiline_desc: 'Use comillas dobles y \\n para saltos de línea, o saltos de línea reales dentro de comillas dobles:',
    h3_comments: 'Comentarios',
    comments_desc: 'Las líneas que comienzan con # son comentarios. Los comentarios en línea funcionan solo con valores sin comillas en algunos parsers:',
    h3_interpolation: 'Interpolación de variables',
    interpolation_desc: 'Referencia otras variables usando la sintaxis ${VAR} (soportado por la mayoría de parsers en valores con comillas dobles):',
    h2_frameworks: 'Configuración de frameworks',
    h3_nodejs: 'Node.js (dotenv)',
    nodejs_desc: 'El cargador .env más popular para Node.js. Instalación y configuración:',
    nodejs_note: 'Next.js, Vite y Create React App cargan archivos .env automáticamente — no se necesita paquete.',
    h3_python: 'Python (python-dotenv)',
    python_desc: 'Cargar .env en proyectos Python:',
    h3_go: 'Go (godotenv)',
    go_desc: 'Cargar .env en proyectos Go:',
    h3_php: 'PHP (vlucas/phpdotenv)',
    php_desc: 'Usado por Laravel y la mayoría de frameworks PHP:',
    h3_ruby: 'Ruby (gem dotenv)',
    ruby_desc: 'Usado por Rails y otros proyectos Ruby:',
    h2_security: 'Seguridad: nunca hagas commit de archivos .env',
    security_intro: 'Tu archivo .env contiene secretos (claves API, contraseñas de base de datos, tokens). Hacer commit al control de versiones es el error de seguridad n.°1.',
    h3_gitignore: 'Patrones .gitignore',
    gitignore_desc: 'Agrega estos patrones a tu archivo .gitignore inmediatamente:',
    h3_env_example: 'Usar .env.example',
    env_example_desc: 'Haz commit de un archivo .env.example con valores vacíos para que los compañeros sepan qué variables se necesitan:',
    h3_already_committed: '¿Ya hiciste commit del .env?',
    already_committed_desc: 'Si accidentalmente hiciste commit de un archivo .env, elimínalo del seguimiento y rota todos los secretos:',
    h2_env_specific: 'Archivos específicos por entorno',
    env_specific_intro: 'La mayoría de frameworks soportan múltiples archivos .env para diferentes entornos. Entender el orden de carga es crítico.',
    h3_loading_order: 'Orden de carga (Next.js / Vite / CRA)',
    loading_order_desc: 'Los archivos se cargan en esta prioridad (los archivos posteriores sobrescriben a los anteriores):',
    loading_note: '.env.local siempre es ignorado por git (agrégalo a .gitignore). NO se carga durante las pruebas para mantener los tests deterministas.',
    h3_which_file: '¿Qué archivo para qué?',
    h2_docker: 'Integración con Docker y Docker Compose',
    h3_env_file: 'Directiva env_file',
    env_file_desc: 'Docker Compose puede cargar archivos .env directamente en contenedores:',
    h3_environment: 'environment vs env_file',
    environment_desc: 'También puedes definir variables de entorno en línea. Esta es la diferencia:',
    env_file_pros: 'env_file: carga desde archivo, mantiene compose.yml limpio, fácil de cambiar por entorno.',
    environment_pros: 'environment: visible en compose.yml, bueno para valores no secretos, soporta sustitución de variables.',
    h3_docker_env: '.env para variables de Docker Compose',
    docker_env_desc: 'Docker Compose lee automáticamente un archivo .env en la raíz del proyecto para sustitución de variables en compose.yml:',
    h2_errors: '10 errores comunes de .env y soluciones',
    errors_intro: 'Estos son los problemas .env más frecuentes que encuentran los desarrolladores:',
    col_error: 'Error',
    col_cause: 'Causa',
    col_fix: 'Solución',
    err1_error: 'process.env.VAR es undefined',
    err1_cause: 'dotenv no cargado o cargado después del uso',
    err1_fix: 'Llama a dotenv.config() al inicio del archivo de entrada',
    err2_error: 'Variables vacías en producción',
    err2_cause: 'Archivo .env no desplegado; dependencia del archivo en vez de variables de plataforma',
    err2_fix: 'Configura variables de entorno en tu plataforma de hosting (Vercel, AWS, etc.)',
    err3_error: 'Valores .env contienen comillas',
    err3_cause: 'El parser trata las comillas como caracteres literales',
    err3_fix: 'Revisa la documentación del parser',
    err4_error: 'Archivo .env incorrecto cargado',
    err4_cause: 'El directorio de trabajo difiere de la ruta esperada',
    err4_fix: 'Usa la opción path: dotenv.config({ path: ".env.local" })',
    err5_error: 'Valor multilínea truncado',
    err5_cause: 'Valor no correctamente entre comillas dobles',
    err5_fix: 'Envuelve valores multilínea en comillas dobles',
    err6_error: 'Caracteres especiales rompen el valor',
    err6_cause: '$ o # interpretado como interpolación/comentario',
    err6_fix: 'Usa comillas simples para prevenir interpolación, o escapa con \\',
    err7_error: 'Error de codificación BOM',
    err7_cause: 'Editor de Windows guarda .env con UTF-8 BOM',
    err7_fix: 'Guarda como UTF-8 sin BOM',
    err8_error: 'Variables de entorno del contenedor Docker vacías',
    err8_cause: 'Ruta de env_file incorrecta o archivo fuera del contexto de build',
    err8_fix: 'Verifica que la ruta sea relativa a la ubicación de compose.yml',
    err9_error: 'Espacios alrededor de = rompen el parsing',
    err9_cause: 'KEY = VALUE en vez de KEY=VALUE',
    err9_fix: 'Elimina espacios alrededor del signo igual',
    err10_error: 'Variables no disponibles en el navegador (React/Next)',
    err10_cause: 'Falta el prefijo requerido (NEXT_PUBLIC_ o REACT_APP_)',
    err10_fix: 'Agrega el prefijo requerido por el framework para exponer al código del cliente',
    h2_production: 'Alternativas en producción',
    production_intro: 'En producción, los archivos .env no son recomendados. Usa estas alternativas:',
    h3_platform: 'Variables de entorno de plataforma',
    platform_desc: 'Cada plataforma de hosting importante proporciona UI o CLI para configurar variables de entorno:',
    h3_docker_secrets: 'Docker Secrets',
    docker_secrets_desc: 'Para Docker Swarm o Compose, usa secrets para datos sensibles:',
    h3_vault: 'Gestores de secretos (Vault, AWS Secrets Manager)',
    vault_desc: 'Para aplicaciones empresariales, usa un gestor de secretos dedicado:',
    vault_note: 'Los gestores de secretos proporcionan rotación, logs de auditoría, control de acceso y cifrado en reposo — funciones que los archivos .env no pueden ofrecer.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: '¿Debo hacer commit de mi archivo .env en Git?',
    faq1_a: 'Nunca hagas commit de archivos .env con secretos al control de versiones. En su lugar, haz commit de un archivo .env.example con valores vacíos. Agrega patrones .env* a tu .gitignore.',
    faq2_q: '¿Cuál es la diferencia entre .env, .env.local y .env.production?',
    faq2_a: '.env contiene valores por defecto cargados en todos los entornos. .env.local contiene sobrecargas locales no committeadas. .env.production contiene valores específicos de producción cargados solo cuando NODE_ENV=production.',
    faq3_q: '¿Por qué process.env.MY_VAR es undefined en Node.js?',
    faq3_a: 'Causas más comunes: 1) Olvidar llamar require("dotenv").config() al inicio, 2) El archivo .env no está en la raíz, 3) Error tipográfico en el nombre de variable, 4) Con ES modules, usar "import dotenv/config".',
    faq4_q: '¿Cómo uso variables .env en Docker Compose?',
    faq4_a: 'Docker Compose lee automáticamente un archivo .env en el mismo directorio que compose.yml para sustitución de variables ${VAR}. Usa env_file o environment para pasar variables a contenedores.',
    faq5_q: '¿Se pueden usar archivos .env en producción?',
    faq5_a: 'No es recomendado. En producción, usa variables de entorno de plataforma, Docker secrets o un gestor de secretos como HashiCorp Vault o AWS Secrets Manager.',
    faq6_q: '¿Cómo expongo variables .env al navegador en React o Next.js?',
    faq6_a: 'En Next.js, prefija con NEXT_PUBLIC_. En Create React App, usa REACT_APP_. En Vite, usa VITE_. Solo las variables con prefijo se incluyen en el bundle del cliente.',
  },
};

export default function DotenvBestPractices({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
      { '@type': 'Question', name: t.faq6_q, acceptedAnswer: { '@type': 'Answer', text: t.faq6_a } },
    ],
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* ─── .env Syntax Rules ─── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_syntax}</h2>
      <p>{t.syntax_intro}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_basic}</h3>
      <p>{t.basic_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# .env
DATABASE_URL=postgres://localhost:5432/mydb
API_KEY=sk-1234567890abcdef
PORT=3000
DEBUG=true`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_quoting}</h3>
      <p>{t.quoting_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Unquoted — trailing whitespace trimmed
APP_NAME=My Application

# Single quotes — literal, no interpolation
PASSWORD='p@$$w0rd#123'

# Double quotes — escape sequences + interpolation
GREETING="Hello\\nWorld"
FULL_URL="\${BASE_URL}/api/v1"`}</code></pre>
      <ul>
        <li>{t.quoting_unquoted}</li>
        <li>{t.quoting_single}</li>
        <li>{t.quoting_double}</li>
      </ul>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_multiline}</h3>
      <p>{t.multiline_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Method 1: \\n in double quotes
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\\nMIIEpAIB...\\n-----END RSA PRIVATE KEY-----"

# Method 2: actual newlines in double quotes
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
-----END RSA PRIVATE KEY-----"`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_comments}</h3>
      <p>{t.comments_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# This is a full-line comment
DATABASE_URL=postgres://localhost/mydb  # inline comment (some parsers)

# Empty lines are ignored

API_KEY=abc123  # This may or may not work depending on the parser`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_interpolation}</h3>
      <p>{t.interpolation_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`BASE_URL=https://api.example.com
API_V1=\${BASE_URL}/v1
API_V2=\${BASE_URL}/v2

DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DATABASE_URL=postgres://\${DB_HOST}:\${DB_PORT}/\${DB_NAME}`}</code></pre>

      {/* ─── Framework Setup ─── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_frameworks}</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_nodejs}</h3>
      <p>{t.nodejs_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Install
npm install dotenv

# --- app.js (CommonJS) ---
require('dotenv').config();
console.log(process.env.DATABASE_URL);

# --- app.ts (ES Modules) ---
import 'dotenv/config';
console.log(process.env.DATABASE_URL);

# --- Or load from CLI ---
node -r dotenv/config app.js
node -r dotenv/config app.js dotenv_config_path=.env.local`}</code></pre>
      <p><em>{t.nodejs_note}</em></p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_python}</h3>
      <p>{t.python_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Install
pip install python-dotenv

# --- app.py ---
from dotenv import load_dotenv
import os

load_dotenv()  # loads .env from current directory
# load_dotenv('.env.local')  # or specify a path

database_url = os.getenv('DATABASE_URL')
print(database_url)

# --- Django: manage.py or settings.py ---
from dotenv import load_dotenv
from pathlib import Path

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_go}</h3>
      <p>{t.go_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Install
// go get github.com/joho/godotenv

package main

import (
    "fmt"
    "log"
    "os"
    "github.com/joho/godotenv"
)

func main() {
    err := godotenv.Load()  // loads .env
    if err != nil {
        log.Fatal("Error loading .env file")
    }
    dbURL := os.Getenv("DATABASE_URL")
    fmt.Println(dbURL)
}`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_php}</h3>
      <p>{t.php_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Install
// composer require vlucas/phpdotenv

<?php
require 'vendor/autoload.php';

$dotenv = Dotenv\\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Access variables
$dbUrl = $_ENV['DATABASE_URL'];
// or
$dbUrl = getenv('DATABASE_URL');

// Required variables (throws exception if missing)
$dotenv->required(['DATABASE_URL', 'API_KEY']);`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_ruby}</h3>
      <p>{t.ruby_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Gemfile
gem 'dotenv-rails', groups: [:development, :test]

# Or for non-Rails Ruby:
gem 'dotenv'

# --- app.rb ---
require 'dotenv/load'
puts ENV['DATABASE_URL']

# --- Rails: .env is loaded automatically ---
# Access via ENV['DATABASE_URL'] anywhere in your app`}</code></pre>

      {/* ─── Security ─── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_security}</h2>
      <p>{t.security_intro}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_gitignore}</h3>
      <p>{t.gitignore_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# .gitignore

# Ignore all .env files
.env
.env.local
.env.*.local
.env.development
.env.production

# More aggressive pattern — ignore all .env variants
.env*

# But DO commit the example file
!.env.example`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_env_example}</h3>
      <p>{t.env_example_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# .env.example — commit this file
# Copy to .env and fill in your values

DATABASE_URL=
API_KEY=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
REDIS_URL=
JWT_SECRET=

# Optional
DEBUG=false
LOG_LEVEL=info`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_already_committed}</h3>
      <p>{t.already_committed_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Step 1: Remove .env from Git tracking (keeps local file)
git rm --cached .env

# Step 2: Add to .gitignore
echo ".env" >> .gitignore

# Step 3: Commit the removal
git add .gitignore
git commit -m "Remove .env from tracking, add to .gitignore"

# Step 4: CRITICAL — Rotate ALL secrets in the .env file
# Every API key, password, and token that was exposed
# must be regenerated immediately`}</code></pre>

      {/* ─── Environment-Specific Files ─── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_env_specific}</h2>
      <p>{t.env_specific_intro}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_loading_order}</h3>
      <p>{t.loading_order_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Loading priority (highest to lowest):

# 1. Shell environment variables (always win)
# 2. .env.{NODE_ENV}.local   (e.g. .env.production.local)
# 3. .env.local               (NOT loaded in test)
# 4. .env.{NODE_ENV}          (e.g. .env.production)
# 5. .env                     (default fallback)

# Example for NODE_ENV=production:
# .env                     → loaded first (base defaults)
# .env.production          → overrides .env
# .env.local               → overrides .env.production
# .env.production.local    → overrides everything above`}</code></pre>
      <p><em>{t.loading_note}</em></p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_which_file}</h3>
      <table className="w-full border-collapse">
        <thead className="bg-gray-800">
          <tr>
            <th className="border border-gray-700 px-4 py-2 text-left">File</th>
            <th className="border border-gray-700 px-4 py-2 text-left">Purpose</th>
            <th className="border border-gray-700 px-4 py-2 text-left">Git</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-gray-700 px-4 py-2">.env</td><td className="border border-gray-700 px-4 py-2">Default values, non-secret config</td><td className="border border-gray-700 px-4 py-2">Commit</td></tr>
          <tr><td className="border border-gray-700 px-4 py-2">.env.example</td><td className="border border-gray-700 px-4 py-2">Template with empty values</td><td className="border border-gray-700 px-4 py-2">Commit</td></tr>
          <tr><td className="border border-gray-700 px-4 py-2">.env.local</td><td className="border border-gray-700 px-4 py-2">Local secrets &amp; overrides</td><td className="border border-gray-700 px-4 py-2">Ignore</td></tr>
          <tr><td className="border border-gray-700 px-4 py-2">.env.development</td><td className="border border-gray-700 px-4 py-2">Dev-specific (shared)</td><td className="border border-gray-700 px-4 py-2">Commit</td></tr>
          <tr><td className="border border-gray-700 px-4 py-2">.env.production</td><td className="border border-gray-700 px-4 py-2">Production-specific (non-secret)</td><td className="border border-gray-700 px-4 py-2">Commit</td></tr>
          <tr><td className="border border-gray-700 px-4 py-2">.env.test</td><td className="border border-gray-700 px-4 py-2">Test environment config</td><td className="border border-gray-700 px-4 py-2">Commit</td></tr>
          <tr><td className="border border-gray-700 px-4 py-2">.env.production.local</td><td className="border border-gray-700 px-4 py-2">Production secrets (local only)</td><td className="border border-gray-700 px-4 py-2">Ignore</td></tr>
        </tbody>
      </table>

      {/* ─── Docker Integration ─── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_docker}</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_env_file}</h3>
      <p>{t.env_file_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# docker-compose.yml (or compose.yml)
services:
  web:
    image: node:20-alpine
    env_file:
      - .env                  # base defaults
      - .env.production       # production overrides
    ports:
      - "3000:3000"

  db:
    image: postgres:16
    env_file:
      - .env.db               # separate file for DB secrets
    volumes:
      - pgdata:/var/lib/postgresql/data`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_environment}</h3>
      <p>{t.environment_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Using env_file (loads from file)
services:
  web:
    env_file:
      - .env

# Using environment (inline)
services:
  web:
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DATABASE_URL=\${DATABASE_URL}   # from shell or .env

# Using environment (mapping syntax)
services:
  web:
    environment:
      NODE_ENV: production
      PORT: 3000`}</code></pre>
      <ul>
        <li>{t.env_file_pros}</li>
        <li>{t.environment_pros}</li>
      </ul>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_docker_env}</h3>
      <p>{t.docker_env_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# .env (in same directory as compose.yml)
POSTGRES_VERSION=16
NODE_VERSION=20
APP_PORT=3000

# compose.yml — uses .env for variable substitution
services:
  web:
    image: node:\${NODE_VERSION}-alpine
    ports:
      - "\${APP_PORT}:3000"

  db:
    image: postgres:\${POSTGRES_VERSION}
    environment:
      POSTGRES_DB: myapp`}</code></pre>

      {/* ─── 10 Common Errors ─── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_errors}</h2>
      <p>{t.errors_intro}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">#</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.col_error}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.col_cause}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.col_fix}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-700 px-4 py-2">1</td><td className="border border-gray-700 px-4 py-2">{t.err1_error}</td><td className="border border-gray-700 px-4 py-2">{t.err1_cause}</td><td className="border border-gray-700 px-4 py-2">{t.err1_fix}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">2</td><td className="border border-gray-700 px-4 py-2">{t.err2_error}</td><td className="border border-gray-700 px-4 py-2">{t.err2_cause}</td><td className="border border-gray-700 px-4 py-2">{t.err2_fix}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">3</td><td className="border border-gray-700 px-4 py-2">{t.err3_error}</td><td className="border border-gray-700 px-4 py-2">{t.err3_cause}</td><td className="border border-gray-700 px-4 py-2">{t.err3_fix}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">4</td><td className="border border-gray-700 px-4 py-2">{t.err4_error}</td><td className="border border-gray-700 px-4 py-2">{t.err4_cause}</td><td className="border border-gray-700 px-4 py-2">{t.err4_fix}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">5</td><td className="border border-gray-700 px-4 py-2">{t.err5_error}</td><td className="border border-gray-700 px-4 py-2">{t.err5_cause}</td><td className="border border-gray-700 px-4 py-2">{t.err5_fix}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">6</td><td className="border border-gray-700 px-4 py-2">{t.err6_error}</td><td className="border border-gray-700 px-4 py-2">{t.err6_cause}</td><td className="border border-gray-700 px-4 py-2">{t.err6_fix}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">7</td><td className="border border-gray-700 px-4 py-2">{t.err7_error}</td><td className="border border-gray-700 px-4 py-2">{t.err7_cause}</td><td className="border border-gray-700 px-4 py-2">{t.err7_fix}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">8</td><td className="border border-gray-700 px-4 py-2">{t.err8_error}</td><td className="border border-gray-700 px-4 py-2">{t.err8_cause}</td><td className="border border-gray-700 px-4 py-2">{t.err8_fix}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">9</td><td className="border border-gray-700 px-4 py-2">{t.err9_error}</td><td className="border border-gray-700 px-4 py-2">{t.err9_cause}</td><td className="border border-gray-700 px-4 py-2">{t.err9_fix}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2">10</td><td className="border border-gray-700 px-4 py-2">{t.err10_error}</td><td className="border border-gray-700 px-4 py-2">{t.err10_cause}</td><td className="border border-gray-700 px-4 py-2">{t.err10_fix}</td></tr>
          </tbody>
        </table>
      </div>

      {/* ─── Production Alternatives ─── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_production}</h2>
      <p>{t.production_intro}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_platform}</h3>
      <p>{t.platform_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Vercel
vercel env add DATABASE_URL production
vercel env ls

# AWS (Parameter Store)
aws ssm put-parameter \\
  --name "/myapp/prod/DATABASE_URL" \\
  --value "postgres://..." \\
  --type SecureString

# Heroku
heroku config:set DATABASE_URL=postgres://...
heroku config

# Railway
railway variables set DATABASE_URL=postgres://...

# Fly.io
fly secrets set DATABASE_URL=postgres://...`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_docker_secrets}</h3>
      <p>{t.docker_secrets_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# compose.yml with Docker secrets
services:
  web:
    image: myapp:latest
    secrets:
      - db_password
      - api_key
    environment:
      DB_PASSWORD_FILE: /run/secrets/db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt    # for Compose
    # external: true                    # for Swarm
  api_key:
    file: ./secrets/api_key.txt

# In your app, read from file:
# const secret = fs.readFileSync('/run/secrets/db_password', 'utf8').trim();`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_vault}</h3>
      <p>{t.vault_desc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# HashiCorp Vault
vault kv put secret/myapp/production \\
  DATABASE_URL="postgres://..." \\
  API_KEY="sk-..."

# Read in application
vault kv get -field=DATABASE_URL secret/myapp/production

# AWS Secrets Manager
aws secretsmanager create-secret \\
  --name "myapp/production/db" \\
  --secret-string '{"url":"postgres://...","password":"..."}'

# Read in Node.js with AWS SDK
import { SecretsManager } from '@aws-sdk/client-secrets-manager';
const client = new SecretsManager({ region: 'us-east-1' });
const { SecretString } = await client.getSecretValue({
  SecretId: 'myapp/production/db'
});
const secrets = JSON.parse(SecretString);`}</code></pre>
      <p><em>{t.vault_note}</em></p>

      {/* ─── FAQ ─── */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_faq}</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq1_q}</h3>
      <p>{t.faq1_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq2_q}</h3>
      <p>{t.faq2_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq3_q}</h3>
      <p>{t.faq3_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq4_q}</h3>
      <p>{t.faq4_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq5_q}</h3>
      <p>{t.faq5_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq6_q}</h3>
      <p>{t.faq6_a}</p>
    </article>
  );
}
