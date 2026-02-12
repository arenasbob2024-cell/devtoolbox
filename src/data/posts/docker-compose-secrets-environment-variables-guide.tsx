'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Docker Compose Secrets & Environment Variables: The Right Way',
    intro: 'Environment variables are the primary mechanism for configuring containers in Docker Compose. But there are 4 different ways to pass them, each with distinct behaviors, security implications, and gotchas. This guide covers every approach, from simple .env files to production-grade Docker secrets, with real-world patterns for multi-environment setups.',
    fourWaysTitle: '4 Ways to Pass Environment Variables in Docker Compose',
    fourWaysDesc: 'Docker Compose supports four distinct methods for injecting environment variables into containers. Understanding when to use each is critical for maintainable, secure configurations.',
    way1Title: '1. Inline with the environment Directive',
    way1Desc: 'Define key-value pairs directly in your docker-compose.yml. Best for non-sensitive, service-specific configuration that rarely changes.',
    way2Title: '2. External File with env_file',
    way2Desc: 'Load variables from one or more external files. Best for managing groups of related variables and keeping secrets out of version control.',
    way3Title: '3. Shell Environment Variable Passthrough',
    way3Desc: 'Pass variables from your host shell into the container. Best for CI/CD pipelines and dynamic values.',
    way4Title: '4. Variable Substitution in docker-compose.yml',
    way4Desc: 'Interpolate host environment variables directly in your Compose file values. Best for making your Compose file configurable across environments.',
    comparisonTitle: 'Comparison Table',
    method: 'Method',
    bestFor: 'Best For',
    inVCS: 'In VCS?',
    secretSafe: 'Secret-Safe?',
    dotenvTitle: '.env File: Syntax, Placement, and Interpolation',
    dotenvDesc: 'Docker Compose automatically reads a file named .env in the same directory as your docker-compose.yml. This is the most common way to externalize configuration.',
    dotenvSyntaxTitle: 'Syntax Rules',
    dotenvPlacementTitle: 'File Placement and Priority',
    dotenvPlacementDesc: 'Compose looks for .env in the project directory (where docker-compose.yml lives). You can override this with the --env-file flag:',
    dotenvInterpolationTitle: 'Interpolation in docker-compose.yml',
    dotenvInterpolationDesc: 'Variables from .env are available for substitution in docker-compose.yml, but they are NOT automatically injected into containers:',
    envFileVsEnvTitle: 'env_file vs environment: Differences and Gotchas',
    envFileVsEnvDesc: 'These two directives look similar but behave differently. Understanding the distinctions prevents subtle bugs.',
    directive: 'Directive',
    behavior: 'Behavior',
    envFileVsEnvGotchasTitle: 'Critical Gotchas',
    gotcha1: 'Precedence: environment values override env_file values for the same key. This is intentional and useful for overrides.',
    gotcha2: 'The .env file (auto-loaded) is for Compose file interpolation only. It does NOT inject variables into containers unless you explicitly use env_file or environment.',
    gotcha3: 'env_file paths are relative to the docker-compose.yml file, not the current working directory.',
    gotcha4: 'If an env_file is missing, Compose will fail with an error. Use required: false (Compose v2.24+) to make it optional.',
    secretsTitle: 'Docker Secrets: File-Based Secrets for Production',
    secretsDesc: 'Docker secrets provide a more secure alternative to environment variables for sensitive data. Secrets are mounted as files inside the container, not exposed as environment variables.',
    secretsStep1: 'Step 1: Create Your Secret Files',
    secretsStep2: 'Step 2: Define Secrets in docker-compose.yml',
    secretsStep3: 'Step 3: Read Secrets in Your Application',
    secretsStep4: 'Step 4: Handle Secrets in Your Code',
    secretsBenefitsTitle: 'Why Secrets Over Environment Variables?',
    benefit1: 'Environment variables can leak via docker inspect, /proc/environ, error logs, and crash dumps',
    benefit2: 'Secrets are file-based and only accessible inside the container at /run/secrets/',
    benefit3: 'Secrets support granular access control per service',
    benefit4: 'Many databases and services natively support _FILE suffix for secret files (e.g., POSTGRES_PASSWORD_FILE)',
    varSubTitle: 'Variable Substitution: ${VAR:-default} Syntax',
    varSubDesc: 'Docker Compose supports shell-style variable substitution with default values and error handling.',
    syntax: 'Syntax',
    result: 'Result',
    varSubExampleTitle: 'Practical Example',
    multiEnvTitle: 'Multi-Environment Setup: Dev/Staging/Production Patterns',
    multiEnvDesc: 'Real projects need different configurations for development, staging, and production. Here are proven patterns.',
    pattern1Title: 'Pattern 1: Override Files (Recommended)',
    pattern1Desc: 'Use a base docker-compose.yml with environment-specific override files. Compose merges them automatically.',
    pattern2Title: 'Pattern 2: Environment-Specific .env Files',
    pattern2Desc: 'Use the --env-file flag to load different variable sets per environment.',
    pattern3Title: 'Pattern 3: Profiles for Optional Services',
    pattern3Desc: 'Use Compose profiles to include or exclude services per environment.',
    securityTitle: 'Security Checklist: What NEVER to Put in Environment Variables',
    securityDesc: 'Environment variables are convenient but inherently insecure for sensitive data. Follow these rules:',
    neverDo: 'NEVER Do This',
    doInstead: 'Do This Instead',
    never1: 'Hardcode passwords in docker-compose.yml',
    instead1: 'Use .env files (gitignored) or Docker secrets',
    never2: 'Commit .env files to version control',
    instead2: 'Add .env to .gitignore, commit .env.example instead',
    never3: 'Use environment variables for private keys or certificates',
    instead3: 'Mount them as files via volumes or Docker secrets',
    never4: 'Log environment variables in application code',
    instead4: 'Redact sensitive values in logs',
    never5: 'Share .env files via Slack, email, or chat',
    instead5: 'Use a secrets manager (Vault, AWS Secrets Manager, 1Password)',
    never6: 'Use the same secrets across dev/staging/production',
    instead6: 'Generate unique secrets per environment',
    debugTitle: 'Debugging: Why Isn\'t My Env Var Loading?',
    debugDesc: 'Follow this systematic flowchart when an environment variable isn\'t reaching your container.',
    debugStep1: 'Step 1: Is the variable defined?',
    debugStep1Desc: 'Check that the variable exists in your .env file, env_file, or environment directive.',
    debugStep2: 'Step 2: Is it reaching the container?',
    debugStep2Desc: 'Run docker compose exec <service> env to see all environment variables inside the container.',
    debugStep3: 'Step 3: Is the .env file in the right place?',
    debugStep3Desc: 'The .env file must be in the same directory as docker-compose.yml, or specified with --env-file.',
    debugStep4: 'Step 4: Is there a naming conflict?',
    debugStep4Desc: 'Check for typos, case sensitivity, and precedence (environment > env_file > .env).',
    debugStep5: 'Step 5: Is the Compose file valid?',
    debugStep5Desc: 'Run docker compose config to see the fully resolved configuration with all variables substituted.',
    debugStep6: 'Step 6: Is the variable being overridden?',
    debugStep6Desc: 'Shell environment variables override .env file values. Check with echo $VAR_NAME on your host.',
    debugCommandsTitle: 'Useful Debug Commands',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the difference between .env and env_file in Docker Compose?',
    faq1a: 'The .env file is automatically read by Docker Compose for variable substitution in docker-compose.yml itself. The env_file directive loads variables directly into the container environment. They serve different purposes: .env is for Compose file interpolation, env_file is for container environment injection.',
    faq2q: 'How do I pass environment variables from the host to a Docker container?',
    faq2a: 'You can pass host environment variables by listing the variable name without a value in the environment directive (e.g., "- MY_VAR"), or by using variable substitution syntax like ${MY_VAR} in your docker-compose.yml. The host shell must have the variable set before running docker compose up.',
    faq3q: 'Are Docker environment variables secure?',
    faq3a: 'No, environment variables are not secure for sensitive data. They can be viewed with docker inspect, appear in /proc/environ inside the container, and may be logged by applications. For sensitive data like passwords and API keys, use Docker secrets (file-based) or a dedicated secrets manager.',
    faq4q: 'What is the precedence order for environment variables in Docker Compose?',
    faq4a: 'The precedence from highest to lowest is: 1) Values set with docker compose run -e, 2) Shell environment variables on the host, 3) The environment directive in docker-compose.yml, 4) The env_file directive, 5) Values from the Dockerfile ENV instruction. Higher-precedence values override lower ones.',
    faq5q: 'How do I use different environment variables for development and production?',
    faq5a: 'Use override files: create a base docker-compose.yml with shared config, then docker-compose.override.yml for development and docker-compose.prod.yml for production. Run with docker compose -f docker-compose.yml -f docker-compose.prod.yml up for production. Alternatively, use --env-file to load environment-specific .env files.',
    faq6q: 'How do Docker secrets differ from environment variables?',
    faq6a: 'Docker secrets are mounted as files (at /run/secrets/<secret_name>) rather than set as environment variables. They are more secure because they don\'t appear in docker inspect, process listings, or crash dumps. Many official Docker images support reading config from secret files using the _FILE suffix convention (e.g., POSTGRES_PASSWORD_FILE).',
  },
  zh: {
    title: 'Docker Compose 密钥与环境变量：正确的使用方式',
    intro: '环境变量是 Docker Compose 中配置容器的主要机制。但有4种不同的传递方式，每种都有不同的行为、安全影响和注意事项。本指南涵盖所有方法，从简单的 .env 文件到生产级 Docker secrets，以及多环境设置的实际模式。',
    fourWaysTitle: 'Docker Compose 中传递环境变量的4种方式',
    fourWaysDesc: 'Docker Compose 支持四种不同的方法将环境变量注入容器。了解何时使用每种方法对于可维护、安全的配置至关重要。',
    way1Title: '1. 使用 environment 指令内联定义',
    way1Desc: '直接在 docker-compose.yml 中定义键值对。最适合不敏感的、特定于服务的、很少变化的配置。',
    way2Title: '2. 使用 env_file 加载外部文件',
    way2Desc: '从一个或多个外部文件加载变量。最适合管理相关变量组并将密钥排除在版本控制之外。',
    way3Title: '3. Shell 环境变量透传',
    way3Desc: '将主机 shell 中的变量传递到容器中。最适合 CI/CD 管道和动态值。',
    way4Title: '4. docker-compose.yml 中的变量替换',
    way4Desc: '直接在 Compose 文件值中插值主机环境变量。最适合使 Compose 文件在不同环境间可配置。',
    comparisonTitle: '对比表',
    method: '方法',
    bestFor: '最适合',
    inVCS: '纳入版本控制？',
    secretSafe: '密钥安全？',
    dotenvTitle: '.env 文件：语法、位置和插值',
    dotenvDesc: 'Docker Compose 会自动读取与 docker-compose.yml 同目录下名为 .env 的文件。这是外部化配置最常见的方式。',
    dotenvSyntaxTitle: '语法规则',
    dotenvPlacementTitle: '文件位置和优先级',
    dotenvPlacementDesc: 'Compose 在项目目录（docker-compose.yml 所在位置）中查找 .env。可以使用 --env-file 标志覆盖：',
    dotenvInterpolationTitle: '在 docker-compose.yml 中插值',
    dotenvInterpolationDesc: '.env 中的变量可用于 docker-compose.yml 中的替换，但它们不会自动注入到容器中：',
    envFileVsEnvTitle: 'env_file 与 environment：区别和注意事项',
    envFileVsEnvDesc: '这两个指令看起来相似但行为不同。了解区别可以防止微妙的错误。',
    directive: '指令',
    behavior: '行为',
    envFileVsEnvGotchasTitle: '关键注意事项',
    gotcha1: '优先级：environment 的值会覆盖 env_file 中相同键的值。这是有意设计的，用于覆盖。',
    gotcha2: '.env 文件（自动加载）仅用于 Compose 文件插值。除非显式使用 env_file 或 environment，否则不会注入到容器中。',
    gotcha3: 'env_file 路径相对于 docker-compose.yml 文件，而非当前工作目录。',
    gotcha4: '如果 env_file 缺失，Compose 会报错。使用 required: false（Compose v2.24+）使其可选。',
    secretsTitle: 'Docker Secrets：生产环境的基于文件的密钥',
    secretsDesc: 'Docker secrets 为敏感数据提供了比环境变量更安全的替代方案。密钥以文件形式挂载在容器内，不会暴露为环境变量。',
    secretsStep1: '步骤1：创建密钥文件',
    secretsStep2: '步骤2：在 docker-compose.yml 中定义密钥',
    secretsStep3: '步骤3：在应用中读取密钥',
    secretsStep4: '步骤4：在代码中处理密钥',
    secretsBenefitsTitle: '为什么选择 Secrets 而非环境变量？',
    benefit1: '环境变量可通过 docker inspect、/proc/environ、错误日志和崩溃转储泄露',
    benefit2: '密钥基于文件，仅在容器内的 /run/secrets/ 可访问',
    benefit3: '密钥支持按服务的细粒度访问控制',
    benefit4: '许多数据库和服务原生支持 _FILE 后缀的密钥文件（如 POSTGRES_PASSWORD_FILE）',
    varSubTitle: '变量替换：${VAR:-default} 语法',
    varSubDesc: 'Docker Compose 支持 shell 风格的变量替换，包含默认值和错误处理。',
    syntax: '语法',
    result: '结果',
    varSubExampleTitle: '实际示例',
    multiEnvTitle: '多环境设置：开发/预发布/生产模式',
    multiEnvDesc: '实际项目需要不同的开发、预发布和生产配置。以下是经过验证的模式。',
    pattern1Title: '模式1：覆盖文件（推荐）',
    pattern1Desc: '使用基础 docker-compose.yml 配合环境特定的覆盖文件。Compose 会自动合并它们。',
    pattern2Title: '模式2：环境特定的 .env 文件',
    pattern2Desc: '使用 --env-file 标志为每个环境加载不同的变量集。',
    pattern3Title: '模式3：使用 Profiles 控制可选服务',
    pattern3Desc: '使用 Compose profiles 按环境包含或排除服务。',
    securityTitle: '安全检查清单：绝不能放入环境变量的内容',
    securityDesc: '环境变量方便但对敏感数据本质上不安全。遵循以下规则：',
    neverDo: '绝不要这样做',
    doInstead: '应该这样做',
    never1: '在 docker-compose.yml 中硬编码密码',
    instead1: '使用 .env 文件（已 gitignore）或 Docker secrets',
    never2: '将 .env 文件提交到版本控制',
    instead2: '将 .env 添加到 .gitignore，提交 .env.example 代替',
    never3: '用环境变量传递私钥或证书',
    instead3: '通过卷或 Docker secrets 以文件形式挂载',
    never4: '在应用代码中记录环境变量',
    instead4: '在日志中脱敏敏感值',
    never5: '通过 Slack、邮件或聊天分享 .env 文件',
    instead5: '使用密钥管理器（Vault、AWS Secrets Manager、1Password）',
    never6: '在开发/预发布/生产环境使用相同的密钥',
    instead6: '为每个环境生成唯一密钥',
    debugTitle: '调试：为什么我的环境变量没有加载？',
    debugDesc: '当环境变量没有到达容器时，按此系统流程排查。',
    debugStep1: '步骤1：变量是否已定义？',
    debugStep1Desc: '检查变量是否存在于 .env 文件、env_file 或 environment 指令中。',
    debugStep2: '步骤2：变量是否到达了容器？',
    debugStep2Desc: '运行 docker compose exec <service> env 查看容器内的所有环境变量。',
    debugStep3: '步骤3：.env 文件是否在正确位置？',
    debugStep3Desc: '.env 文件必须与 docker-compose.yml 在同一目录，或用 --env-file 指定。',
    debugStep4: '步骤4：是否存在命名冲突？',
    debugStep4Desc: '检查拼写错误、大小写敏感和优先级（environment > env_file > .env）。',
    debugStep5: '步骤5：Compose 文件是否有效？',
    debugStep5Desc: '运行 docker compose config 查看所有变量替换后的完整解析配置。',
    debugStep6: '步骤6：变量是否被覆盖？',
    debugStep6Desc: 'Shell 环境变量会覆盖 .env 文件的值。在主机上用 echo $VAR_NAME 检查。',
    debugCommandsTitle: '有用的调试命令',
    faqTitle: '常见问题',
    faq1q: 'Docker Compose 中 .env 和 env_file 有什么区别？',
    faq1a: '.env 文件由 Docker Compose 自动读取，用于 docker-compose.yml 本身的变量替换。env_file 指令将变量直接加载到容器环境中。它们用途不同：.env 用于 Compose 文件插值，env_file 用于容器环境注入。',
    faq2q: '如何将主机的环境变量传递到 Docker 容器？',
    faq2a: '可以通过在 environment 指令中列出不带值的变量名（如 "- MY_VAR"），或在 docker-compose.yml 中使用 ${MY_VAR} 变量替换语法。主机 shell 必须在运行 docker compose up 之前设置好该变量。',
    faq3q: 'Docker 环境变量安全吗？',
    faq3a: '不安全。环境变量可通过 docker inspect 查看，出现在容器内的 /proc/environ 中，并可能被应用记录。对于密码和 API 密钥等敏感数据，使用 Docker secrets（基于文件）或专用密钥管理器。',
    faq4q: 'Docker Compose 中环境变量的优先级顺序是什么？',
    faq4a: '从高到低的优先级为：1) docker compose run -e 设置的值，2) 主机 shell 环境变量，3) docker-compose.yml 中的 environment 指令，4) env_file 指令，5) Dockerfile ENV 指令的值。高优先级覆盖低优先级。',
    faq5q: '如何为开发和生产使用不同的环境变量？',
    faq5a: '使用覆盖文件：创建共享配置的基础 docker-compose.yml，然后用 docker-compose.override.yml 用于开发，docker-compose.prod.yml 用于生产。生产环境运行 docker compose -f docker-compose.yml -f docker-compose.prod.yml up。也可以使用 --env-file 加载环境特定的 .env 文件。',
    faq6q: 'Docker secrets 与环境变量有何不同？',
    faq6a: 'Docker secrets 以文件形式挂载（在 /run/secrets/<secret_name>）而非设置为环境变量。它们更安全，因为不会出现在 docker inspect、进程列表或崩溃转储中。许多官方 Docker 镜像支持使用 _FILE 后缀约定从密钥文件读取配置（如 POSTGRES_PASSWORD_FILE）。',
  },
  ja: {
    title: 'Docker Compose Secrets と環境変数：正しい使い方',
    intro: '環境変数は Docker Compose でコンテナを設定する主要なメカニズムです。しかし、4つの異なる渡し方があり、それぞれ異なる動作、セキュリティへの影響、注意点があります。このガイドでは、シンプルな .env ファイルから本番グレードの Docker secrets まで、マルチ環境セットアップの実践的なパターンを網羅します。',
    fourWaysTitle: 'Docker Compose で環境変数を渡す4つの方法',
    fourWaysDesc: 'Docker Compose はコンテナに環境変数を注入する4つの方法をサポートしています。それぞれの使い分けを理解することが、保守しやすく安全な設定の鍵です。',
    way1Title: '1. environment ディレクティブでインライン定義',
    way1Desc: 'docker-compose.yml にキーバリューペアを直接定義します。機密性がなく、サービス固有で、めったに変更されない設定に最適です。',
    way2Title: '2. env_file で外部ファイルを読み込み',
    way2Desc: '1つ以上の外部ファイルから変数を読み込みます。関連する変数のグループ管理やバージョン管理からのシークレット除外に最適です。',
    way3Title: '3. シェル環境変数のパススルー',
    way3Desc: 'ホストシェルの変数をコンテナに渡します。CI/CD パイプラインや動的な値に最適です。',
    way4Title: '4. docker-compose.yml での変数展開',
    way4Desc: 'Compose ファイルの値にホスト環境変数を直接展開します。Compose ファイルを環境間で設定可能にするのに最適です。',
    comparisonTitle: '比較表',
    method: '方法',
    bestFor: '最適な用途',
    inVCS: 'VCS に含める？',
    secretSafe: 'シークレット安全？',
    dotenvTitle: '.env ファイル：構文、配置、展開',
    dotenvDesc: 'Docker Compose は docker-compose.yml と同じディレクトリにある .env ファイルを自動的に読み取ります。設定の外部化で最も一般的な方法です。',
    dotenvSyntaxTitle: '構文ルール',
    dotenvPlacementTitle: 'ファイル配置と優先順位',
    dotenvPlacementDesc: 'Compose はプロジェクトディレクトリ（docker-compose.yml のある場所）で .env を探します。--env-file フラグで上書きできます：',
    dotenvInterpolationTitle: 'docker-compose.yml での展開',
    dotenvInterpolationDesc: '.env の変数は docker-compose.yml での置換に使えますが、自動的にコンテナには注入されません：',
    envFileVsEnvTitle: 'env_file vs environment：違いと注意点',
    envFileVsEnvDesc: 'これら2つのディレクティブは似ていますが動作が異なります。違いを理解することで微妙なバグを防げます。',
    directive: 'ディレクティブ',
    behavior: '動作',
    envFileVsEnvGotchasTitle: '重要な注意点',
    gotcha1: '優先順位：environment の値は同じキーの env_file の値を上書きします。これは上書きのために意図的に設計されています。',
    gotcha2: '.env ファイル（自動読み込み）は Compose ファイルの展開専用です。env_file または environment を明示的に使わない限り、コンテナには注入されません。',
    gotcha3: 'env_file のパスは docker-compose.yml ファイルからの相対パスで、現在の作業ディレクトリからではありません。',
    gotcha4: 'env_file が見つからない場合、Compose はエラーで失敗します。required: false（Compose v2.24+）でオプションにできます。',
    secretsTitle: 'Docker Secrets：本番環境のファイルベースのシークレット',
    secretsDesc: 'Docker secrets は機密データに対して環境変数よりも安全な代替手段を提供します。シークレットは環境変数としてではなく、コンテナ内にファイルとしてマウントされます。',
    secretsStep1: 'ステップ1：シークレットファイルを作成',
    secretsStep2: 'ステップ2：docker-compose.yml でシークレットを定義',
    secretsStep3: 'ステップ3：アプリケーションでシークレットを読み取る',
    secretsStep4: 'ステップ4：コードでシークレットを処理',
    secretsBenefitsTitle: '環境変数よりも Secrets を選ぶ理由',
    benefit1: '環境変数は docker inspect、/proc/environ、エラーログ、クラッシュダンプで漏洩する可能性があります',
    benefit2: 'シークレットはファイルベースで、コンテナ内の /run/secrets/ でのみアクセス可能です',
    benefit3: 'シークレットはサービスごとのきめ細かなアクセス制御をサポートします',
    benefit4: '多くのデータベースやサービスは _FILE サフィックスのシークレットファイルをネイティブサポートしています（例：POSTGRES_PASSWORD_FILE）',
    varSubTitle: '変数展開：${VAR:-default} 構文',
    varSubDesc: 'Docker Compose はデフォルト値とエラー処理を含むシェルスタイルの変数展開をサポートしています。',
    syntax: '構文',
    result: '結果',
    varSubExampleTitle: '実践例',
    multiEnvTitle: 'マルチ環境セットアップ：開発/ステージング/本番パターン',
    multiEnvDesc: '実際のプロジェクトには開発、ステージング、本番の異なる設定が必要です。実証済みのパターンを紹介します。',
    pattern1Title: 'パターン1：オーバーライドファイル（推奨）',
    pattern1Desc: 'ベースの docker-compose.yml と環境固有のオーバーライドファイルを使用します。Compose が自動的にマージします。',
    pattern2Title: 'パターン2：環境固有の .env ファイル',
    pattern2Desc: '--env-file フラグで環境ごとに異なる変数セットを読み込みます。',
    pattern3Title: 'パターン3：オプショナルサービスの Profiles',
    pattern3Desc: 'Compose profiles で環境ごとにサービスを含めたり除外したりします。',
    securityTitle: 'セキュリティチェックリスト：環境変数に絶対入れてはいけないもの',
    securityDesc: '環境変数は便利ですが、機密データには本質的に安全ではありません。以下のルールに従ってください：',
    neverDo: '絶対にやってはいけない',
    doInstead: '代わりにこうする',
    never1: 'docker-compose.yml にパスワードをハードコード',
    instead1: '.env ファイル（gitignore済み）または Docker secrets を使用',
    never2: '.env ファイルをバージョン管理にコミット',
    instead2: '.env を .gitignore に追加し、代わりに .env.example をコミット',
    never3: '環境変数で秘密鍵や証明書を渡す',
    instead3: 'ボリュームまたは Docker secrets でファイルとしてマウント',
    never4: 'アプリケーションコードで環境変数をログに記録',
    instead4: 'ログで機密値をマスク',
    never5: 'Slack、メール、チャットで .env ファイルを共有',
    instead5: 'シークレットマネージャー（Vault、AWS Secrets Manager、1Password）を使用',
    never6: '開発/ステージング/本番で同じシークレットを使用',
    instead6: '環境ごとに一意のシークレットを生成',
    debugTitle: 'デバッグ：環境変数がロードされない理由',
    debugDesc: '環境変数がコンテナに届かない場合、この体系的なフローチャートに従ってください。',
    debugStep1: 'ステップ1：変数は定義されていますか？',
    debugStep1Desc: '.env ファイル、env_file、または environment ディレクティブに変数が存在するか確認します。',
    debugStep2: 'ステップ2：コンテナに届いていますか？',
    debugStep2Desc: 'docker compose exec <service> env を実行してコンテナ内のすべての環境変数を確認します。',
    debugStep3: 'ステップ3：.env ファイルは正しい場所にありますか？',
    debugStep3Desc: '.env ファイルは docker-compose.yml と同じディレクトリに置くか、--env-file で指定します。',
    debugStep4: 'ステップ4：名前の競合はありますか？',
    debugStep4Desc: 'タイポ、大文字小文字の区別、優先順位（environment > env_file > .env）を確認します。',
    debugStep5: 'ステップ5：Compose ファイルは有効ですか？',
    debugStep5Desc: 'docker compose config を実行して、すべての変数が展開された完全な設定を確認します。',
    debugStep6: 'ステップ6：変数が上書きされていませんか？',
    debugStep6Desc: 'シェル環境変数は .env ファイルの値を上書きします。ホストで echo $VAR_NAME で確認してください。',
    debugCommandsTitle: '便利なデバッグコマンド',
    faqTitle: 'よくある質問',
    faq1q: 'Docker Compose の .env と env_file の違いは？',
    faq1a: '.env ファイルは Docker Compose が docker-compose.yml 自体の変数展開のために自動的に読み取ります。env_file ディレクティブは変数をコンテナ環境に直接ロードします。用途が異なります：.env は Compose ファイルの展開用、env_file はコンテナ環境注入用です。',
    faq2q: 'ホストからDockerコンテナに環境変数を渡すには？',
    faq2a: 'environment ディレクティブで値なしの変数名をリスト（例："- MY_VAR"）するか、docker-compose.yml で ${MY_VAR} 変数展開構文を使用します。docker compose up 実行前にホストシェルで変数を設定しておく必要があります。',
    faq3q: 'Docker の環境変数は安全ですか？',
    faq3a: 'いいえ。環境変数は docker inspect で表示でき、コンテナ内の /proc/environ に表示され、アプリケーションでログに記録される可能性があります。パスワードや API キーなどの機密データには Docker secrets またはシークレットマネージャーを使用してください。',
    faq4q: 'Docker Compose の環境変数の優先順位は？',
    faq4a: '高い順に：1) docker compose run -e、2) ホストのシェル環境変数、3) docker-compose.yml の environment ディレクティブ、4) env_file ディレクティブ、5) Dockerfile の ENV 命令。高優先度が低優先度を上書きします。',
    faq5q: '開発と本番で異なる環境変数を使うには？',
    faq5a: 'オーバーライドファイルを使用：共有設定のベース docker-compose.yml を作成し、開発用に docker-compose.override.yml、本番用に docker-compose.prod.yml を用意します。本番は docker compose -f docker-compose.yml -f docker-compose.prod.yml up で実行します。',
    faq6q: 'Docker secrets と環境変数の違いは？',
    faq6a: 'Docker secrets は環境変数ではなくファイル（/run/secrets/<secret_name>）としてマウントされます。docker inspect、プロセスリスト、クラッシュダンプに表示されないためより安全です。多くの公式 Docker イメージは _FILE サフィックス規則をサポートしています。',
  },
  ko: {
    title: 'Docker Compose Secrets와 환경 변수: 올바른 사용법',
    intro: '환경 변수는 Docker Compose에서 컨테이너를 구성하는 주요 메커니즘입니다. 하지만 4가지 다른 전달 방법이 있으며, 각각 다른 동작, 보안 영향, 주의사항이 있습니다. 이 가이드는 간단한 .env 파일부터 프로덕션급 Docker secrets까지, 멀티 환경 설정의 실제 패턴을 다룹니다.',
    fourWaysTitle: 'Docker Compose에서 환경 변수를 전달하는 4가지 방법',
    fourWaysDesc: 'Docker Compose는 컨테이너에 환경 변수를 주입하는 4가지 방법을 지원합니다. 각각의 사용 시기를 이해하는 것이 유지보수 가능하고 안전한 설정의 핵심입니다.',
    way1Title: '1. environment 지시어로 인라인 정의',
    way1Desc: 'docker-compose.yml에 키-값 쌍을 직접 정의합니다. 민감하지 않고, 서비스별이며, 거의 변경되지 않는 설정에 가장 적합합니다.',
    way2Title: '2. env_file로 외부 파일 로드',
    way2Desc: '하나 이상의 외부 파일에서 변수를 로드합니다. 관련 변수 그룹 관리와 버전 관리에서 시크릿을 제외하는 데 적합합니다.',
    way3Title: '3. 셸 환경 변수 패스스루',
    way3Desc: '호스트 셸의 변수를 컨테이너로 전달합니다. CI/CD 파이프라인과 동적 값에 가장 적합합니다.',
    way4Title: '4. docker-compose.yml에서 변수 치환',
    way4Desc: 'Compose 파일 값에 호스트 환경 변수를 직접 보간합니다. Compose 파일을 환경 간에 구성 가능하게 만드는 데 적합합니다.',
    comparisonTitle: '비교 표',
    method: '방법',
    bestFor: '최적 용도',
    inVCS: 'VCS 포함?',
    secretSafe: '시크릿 안전?',
    dotenvTitle: '.env 파일: 구문, 배치, 보간',
    dotenvDesc: 'Docker Compose는 docker-compose.yml과 같은 디렉토리에 있는 .env 파일을 자동으로 읽습니다. 설정 외부화의 가장 일반적인 방법입니다.',
    dotenvSyntaxTitle: '구문 규칙',
    dotenvPlacementTitle: '파일 배치 및 우선순위',
    dotenvPlacementDesc: 'Compose는 프로젝트 디렉토리(docker-compose.yml 위치)에서 .env를 찾습니다. --env-file 플래그로 재정의할 수 있습니다:',
    dotenvInterpolationTitle: 'docker-compose.yml에서의 보간',
    dotenvInterpolationDesc: '.env의 변수는 docker-compose.yml에서 치환에 사용할 수 있지만, 자동으로 컨테이너에 주입되지 않습니다:',
    envFileVsEnvTitle: 'env_file vs environment: 차이점과 주의사항',
    envFileVsEnvDesc: '이 두 지시어는 비슷해 보이지만 동작이 다릅니다. 차이를 이해하면 미묘한 버그를 방지할 수 있습니다.',
    directive: '지시어',
    behavior: '동작',
    envFileVsEnvGotchasTitle: '핵심 주의사항',
    gotcha1: '우선순위: environment 값은 같은 키의 env_file 값을 덮어씁니다. 이는 오버라이드를 위해 의도적으로 설계되었습니다.',
    gotcha2: '.env 파일(자동 로드)은 Compose 파일 보간 전용입니다. env_file 또는 environment를 명시적으로 사용하지 않으면 컨테이너에 주입되지 않습니다.',
    gotcha3: 'env_file 경로는 docker-compose.yml 파일 기준 상대 경로이며, 현재 작업 디렉토리 기준이 아닙니다.',
    gotcha4: 'env_file이 없으면 Compose가 오류로 실패합니다. required: false(Compose v2.24+)로 선택적으로 만들 수 있습니다.',
    secretsTitle: 'Docker Secrets: 프로덕션을 위한 파일 기반 시크릿',
    secretsDesc: 'Docker secrets는 민감한 데이터에 대해 환경 변수보다 더 안전한 대안을 제공합니다. 시크릿은 환경 변수가 아닌 컨테이너 내부에 파일로 마운트됩니다.',
    secretsStep1: '단계 1: 시크릿 파일 생성',
    secretsStep2: '단계 2: docker-compose.yml에서 시크릿 정의',
    secretsStep3: '단계 3: 애플리케이션에서 시크릿 읽기',
    secretsStep4: '단계 4: 코드에서 시크릿 처리',
    secretsBenefitsTitle: '환경 변수 대신 Secrets를 선택하는 이유',
    benefit1: '환경 변수는 docker inspect, /proc/environ, 오류 로그, 크래시 덤프를 통해 유출될 수 있습니다',
    benefit2: '시크릿은 파일 기반이며 컨테이너 내 /run/secrets/에서만 접근 가능합니다',
    benefit3: '시크릿은 서비스별 세분화된 접근 제어를 지원합니다',
    benefit4: '많은 데이터베이스와 서비스가 _FILE 접미사의 시크릿 파일을 네이티브 지원합니다 (예: POSTGRES_PASSWORD_FILE)',
    varSubTitle: '변수 치환: ${VAR:-default} 구문',
    varSubDesc: 'Docker Compose는 기본값과 오류 처리가 포함된 셸 스타일 변수 치환을 지원합니다.',
    syntax: '구문',
    result: '결과',
    varSubExampleTitle: '실전 예제',
    multiEnvTitle: '멀티 환경 설정: 개발/스테이징/프로덕션 패턴',
    multiEnvDesc: '실제 프로젝트에는 개발, 스테이징, 프로덕션의 다른 설정이 필요합니다. 검증된 패턴을 소개합니다.',
    pattern1Title: '패턴 1: 오버라이드 파일 (권장)',
    pattern1Desc: '기본 docker-compose.yml과 환경별 오버라이드 파일을 사용합니다. Compose가 자동으로 병합합니다.',
    pattern2Title: '패턴 2: 환경별 .env 파일',
    pattern2Desc: '--env-file 플래그로 환경별 다른 변수 세트를 로드합니다.',
    pattern3Title: '패턴 3: 선택적 서비스를 위한 Profiles',
    pattern3Desc: 'Compose profiles로 환경별 서비스를 포함하거나 제외합니다.',
    securityTitle: '보안 체크리스트: 환경 변수에 절대 넣지 말아야 할 것',
    securityDesc: '환경 변수는 편리하지만 민감한 데이터에는 본질적으로 안전하지 않습니다. 다음 규칙을 따르세요:',
    neverDo: '절대 하지 마세요',
    doInstead: '대신 이렇게 하세요',
    never1: 'docker-compose.yml에 비밀번호 하드코딩',
    instead1: '.env 파일(gitignore 처리) 또는 Docker secrets 사용',
    never2: '.env 파일을 버전 관리에 커밋',
    instead2: '.env를 .gitignore에 추가하고 대신 .env.example 커밋',
    never3: '환경 변수로 개인키나 인증서 전달',
    instead3: '볼륨 또는 Docker secrets로 파일로 마운트',
    never4: '애플리케이션 코드에서 환경 변수 로깅',
    instead4: '로그에서 민감한 값 마스킹',
    never5: 'Slack, 이메일, 채팅으로 .env 파일 공유',
    instead5: '시크릿 매니저 사용 (Vault, AWS Secrets Manager, 1Password)',
    never6: '개발/스테이징/프로덕션에서 같은 시크릿 사용',
    instead6: '환경별 고유 시크릿 생성',
    debugTitle: '디버깅: 환경 변수가 로드되지 않는 이유',
    debugDesc: '환경 변수가 컨테이너에 도달하지 않을 때 이 체계적인 플로우차트를 따르세요.',
    debugStep1: '단계 1: 변수가 정의되어 있나요?',
    debugStep1Desc: '.env 파일, env_file 또는 environment 지시어에 변수가 있는지 확인합니다.',
    debugStep2: '단계 2: 컨테이너에 도달하고 있나요?',
    debugStep2Desc: 'docker compose exec <service> env를 실행하여 컨테이너 내 모든 환경 변수를 확인합니다.',
    debugStep3: '단계 3: .env 파일이 올바른 위치에 있나요?',
    debugStep3Desc: '.env 파일은 docker-compose.yml과 같은 디렉토리에 있거나 --env-file로 지정해야 합니다.',
    debugStep4: '단계 4: 이름 충돌이 있나요?',
    debugStep4Desc: '오타, 대소문자 구분, 우선순위(environment > env_file > .env)를 확인합니다.',
    debugStep5: '단계 5: Compose 파일이 유효한가요?',
    debugStep5Desc: 'docker compose config를 실행하여 모든 변수가 치환된 전체 설정을 확인합니다.',
    debugStep6: '단계 6: 변수가 덮어쓰여지고 있나요?',
    debugStep6Desc: '셸 환경 변수가 .env 파일 값을 덮어씁니다. 호스트에서 echo $VAR_NAME으로 확인하세요.',
    debugCommandsTitle: '유용한 디버그 명령어',
    faqTitle: '자주 묻는 질문',
    faq1q: 'Docker Compose에서 .env와 env_file의 차이는?',
    faq1a: '.env 파일은 Docker Compose가 docker-compose.yml 자체의 변수 치환을 위해 자동으로 읽습니다. env_file 지시어는 변수를 컨테이너 환경에 직접 로드합니다. 용도가 다릅니다: .env는 Compose 파일 보간용, env_file은 컨테이너 환경 주입용입니다.',
    faq2q: '호스트에서 Docker 컨테이너로 환경 변수를 전달하려면?',
    faq2a: 'environment 지시어에서 값 없이 변수 이름만 나열(예: "- MY_VAR")하거나, docker-compose.yml에서 ${MY_VAR} 변수 치환 구문을 사용합니다. docker compose up 실행 전에 호스트 셸에서 변수를 설정해야 합니다.',
    faq3q: 'Docker 환경 변수는 안전한가요?',
    faq3a: '아닙니다. 환경 변수는 docker inspect로 볼 수 있고, 컨테이너 내 /proc/environ에 나타나며, 애플리케이션에서 로깅될 수 있습니다. 비밀번호와 API 키 같은 민감한 데이터에는 Docker secrets 또는 시크릿 매니저를 사용하세요.',
    faq4q: 'Docker Compose에서 환경 변수의 우선순위는?',
    faq4a: '높은 순서대로: 1) docker compose run -e, 2) 호스트 셸 환경 변수, 3) docker-compose.yml의 environment 지시어, 4) env_file 지시어, 5) Dockerfile ENV 명령. 높은 우선순위가 낮은 우선순위를 덮어씁니다.',
    faq5q: '개발과 프로덕션에서 다른 환경 변수를 사용하려면?',
    faq5a: '오버라이드 파일 사용: 공유 설정의 기본 docker-compose.yml을 만들고, 개발용 docker-compose.override.yml과 프로덕션용 docker-compose.prod.yml을 준비합니다. 프로덕션은 docker compose -f docker-compose.yml -f docker-compose.prod.yml up으로 실행합니다.',
    faq6q: 'Docker secrets와 환경 변수의 차이는?',
    faq6a: 'Docker secrets는 환경 변수가 아닌 파일(/run/secrets/<secret_name>)로 마운트됩니다. docker inspect, 프로세스 목록, 크래시 덤프에 나타나지 않아 더 안전합니다. 많은 공식 Docker 이미지가 _FILE 접미사 규칙을 지원합니다.',
  },
  fr: {
    title: 'Docker Compose Secrets et variables d\'environnement : la bonne approche',
    intro: 'Les variables d\'environnement sont le principal mecanisme de configuration des conteneurs dans Docker Compose. Mais il existe 4 facons differentes de les transmettre, chacune avec des comportements, des implications de securite et des pieges distincts. Ce guide couvre toutes les approches, des simples fichiers .env aux secrets Docker de production.',
    fourWaysTitle: '4 facons de passer des variables d\'environnement dans Docker Compose',
    fourWaysDesc: 'Docker Compose prend en charge quatre methodes distinctes pour injecter des variables d\'environnement dans les conteneurs.',
    way1Title: '1. En ligne avec la directive environment',
    way1Desc: 'Definissez des paires cle-valeur directement dans votre docker-compose.yml. Ideal pour la configuration non sensible et specifique au service.',
    way2Title: '2. Fichier externe avec env_file',
    way2Desc: 'Chargez des variables depuis un ou plusieurs fichiers externes. Ideal pour gerer des groupes de variables et garder les secrets hors du controle de version.',
    way3Title: '3. Transmission des variables shell',
    way3Desc: 'Passez des variables du shell hote au conteneur. Ideal pour les pipelines CI/CD et les valeurs dynamiques.',
    way4Title: '4. Substitution de variables dans docker-compose.yml',
    way4Desc: 'Interpolez les variables d\'environnement hote dans les valeurs de votre fichier Compose.',
    comparisonTitle: 'Tableau comparatif',
    method: 'Methode',
    bestFor: 'Ideal pour',
    inVCS: 'Dans VCS ?',
    secretSafe: 'Secret-safe ?',
    dotenvTitle: 'Fichier .env : syntaxe, emplacement et interpolation',
    dotenvDesc: 'Docker Compose lit automatiquement un fichier .env dans le meme repertoire que votre docker-compose.yml.',
    dotenvSyntaxTitle: 'Regles de syntaxe',
    dotenvPlacementTitle: 'Emplacement et priorite',
    dotenvPlacementDesc: 'Compose cherche .env dans le repertoire du projet. Vous pouvez le remplacer avec --env-file :',
    dotenvInterpolationTitle: 'Interpolation dans docker-compose.yml',
    dotenvInterpolationDesc: 'Les variables de .env sont disponibles pour la substitution dans docker-compose.yml, mais elles ne sont PAS automatiquement injectees dans les conteneurs :',
    envFileVsEnvTitle: 'env_file vs environment : differences et pieges',
    envFileVsEnvDesc: 'Ces deux directives se ressemblent mais se comportent differemment.',
    directive: 'Directive',
    behavior: 'Comportement',
    envFileVsEnvGotchasTitle: 'Pieges critiques',
    gotcha1: 'Priorite : les valeurs environment ecrasent les valeurs env_file pour la meme cle.',
    gotcha2: 'Le fichier .env (charge automatiquement) sert uniquement a l\'interpolation du fichier Compose. Il n\'injecte PAS de variables dans les conteneurs.',
    gotcha3: 'Les chemins env_file sont relatifs au fichier docker-compose.yml, pas au repertoire de travail actuel.',
    gotcha4: 'Si un env_file est manquant, Compose echouera. Utilisez required: false (Compose v2.24+) pour le rendre optionnel.',
    secretsTitle: 'Docker Secrets : secrets bases sur des fichiers pour la production',
    secretsDesc: 'Les secrets Docker offrent une alternative plus securisee aux variables d\'environnement pour les donnees sensibles.',
    secretsStep1: 'Etape 1 : Creer vos fichiers secrets',
    secretsStep2: 'Etape 2 : Definir les secrets dans docker-compose.yml',
    secretsStep3: 'Etape 3 : Lire les secrets dans votre application',
    secretsStep4: 'Etape 4 : Gerer les secrets dans votre code',
    secretsBenefitsTitle: 'Pourquoi les secrets plutot que les variables d\'environnement ?',
    benefit1: 'Les variables d\'environnement peuvent fuiter via docker inspect, /proc/environ, les logs d\'erreur',
    benefit2: 'Les secrets sont bases sur des fichiers et accessibles uniquement dans /run/secrets/',
    benefit3: 'Les secrets prennent en charge le controle d\'acces granulaire par service',
    benefit4: 'De nombreuses bases de donnees supportent nativement le suffixe _FILE pour les fichiers secrets',
    varSubTitle: 'Substitution de variables : syntaxe ${VAR:-default}',
    varSubDesc: 'Docker Compose supporte la substitution de variables style shell avec des valeurs par defaut.',
    syntax: 'Syntaxe',
    result: 'Resultat',
    varSubExampleTitle: 'Exemple pratique',
    multiEnvTitle: 'Configuration multi-environnement : dev/staging/production',
    multiEnvDesc: 'Les projets reels necessitent des configurations differentes. Voici des patterns eprouves.',
    pattern1Title: 'Pattern 1 : Fichiers override (recommande)',
    pattern1Desc: 'Utilisez un docker-compose.yml de base avec des fichiers override specifiques a l\'environnement.',
    pattern2Title: 'Pattern 2 : Fichiers .env specifiques',
    pattern2Desc: 'Utilisez --env-file pour charger differents ensembles de variables par environnement.',
    pattern3Title: 'Pattern 3 : Profiles pour services optionnels',
    pattern3Desc: 'Utilisez les profiles Compose pour inclure ou exclure des services par environnement.',
    securityTitle: 'Checklist securite : ce qu\'il ne faut JAMAIS mettre dans les variables d\'environnement',
    securityDesc: 'Les variables d\'environnement sont pratiques mais inheremment non securisees pour les donnees sensibles.',
    neverDo: 'NE JAMAIS faire',
    doInstead: 'Faire plutot',
    never1: 'Coder en dur les mots de passe dans docker-compose.yml',
    instead1: 'Utiliser des fichiers .env (gitignored) ou Docker secrets',
    never2: 'Commiter les fichiers .env dans le controle de version',
    instead2: 'Ajouter .env au .gitignore, commiter .env.example',
    never3: 'Utiliser les variables d\'environnement pour les cles privees',
    instead3: 'Les monter comme fichiers via volumes ou Docker secrets',
    never4: 'Journaliser les variables d\'environnement dans le code',
    instead4: 'Masquer les valeurs sensibles dans les logs',
    never5: 'Partager les fichiers .env par Slack ou email',
    instead5: 'Utiliser un gestionnaire de secrets (Vault, AWS Secrets Manager)',
    never6: 'Utiliser les memes secrets en dev/staging/production',
    instead6: 'Generer des secrets uniques par environnement',
    debugTitle: 'Debogage : pourquoi ma variable d\'environnement ne se charge pas ?',
    debugDesc: 'Suivez ce processus systematique quand une variable d\'environnement n\'atteint pas votre conteneur.',
    debugStep1: 'Etape 1 : La variable est-elle definie ?',
    debugStep1Desc: 'Verifiez qu\'elle existe dans votre fichier .env, env_file ou directive environment.',
    debugStep2: 'Etape 2 : Atteint-elle le conteneur ?',
    debugStep2Desc: 'Executez docker compose exec <service> env pour voir toutes les variables.',
    debugStep3: 'Etape 3 : Le fichier .env est-il au bon endroit ?',
    debugStep3Desc: 'Le fichier .env doit etre dans le meme repertoire que docker-compose.yml.',
    debugStep4: 'Etape 4 : Y a-t-il un conflit de noms ?',
    debugStep4Desc: 'Verifiez les fautes de frappe, la casse et la priorite.',
    debugStep5: 'Etape 5 : Le fichier Compose est-il valide ?',
    debugStep5Desc: 'Executez docker compose config pour voir la configuration resolue.',
    debugStep6: 'Etape 6 : La variable est-elle surchargee ?',
    debugStep6Desc: 'Les variables shell du hote ecrasent les valeurs .env. Verifiez avec echo $VAR_NAME.',
    debugCommandsTitle: 'Commandes de debogage utiles',
    faqTitle: 'Questions frequentes',
    faq1q: 'Quelle est la difference entre .env et env_file dans Docker Compose ?',
    faq1a: 'Le fichier .env est lu automatiquement pour la substitution dans docker-compose.yml. La directive env_file charge les variables directement dans l\'environnement du conteneur. Ils servent des objectifs differents.',
    faq2q: 'Comment passer des variables d\'environnement du hote au conteneur ?',
    faq2a: 'Listez le nom de la variable sans valeur dans la directive environment ou utilisez la syntaxe ${MY_VAR} dans docker-compose.yml.',
    faq3q: 'Les variables d\'environnement Docker sont-elles securisees ?',
    faq3a: 'Non. Elles peuvent etre vues avec docker inspect et apparaissent dans /proc/environ. Utilisez Docker secrets pour les donnees sensibles.',
    faq4q: 'Quel est l\'ordre de priorite des variables d\'environnement ?',
    faq4a: 'Du plus eleve au plus bas : 1) docker compose run -e, 2) Variables shell hote, 3) Directive environment, 4) Directive env_file, 5) Dockerfile ENV.',
    faq5q: 'Comment utiliser des variables differentes pour dev et production ?',
    faq5a: 'Utilisez des fichiers override : docker-compose.yml de base + docker-compose.override.yml pour dev + docker-compose.prod.yml pour la production.',
    faq6q: 'Quelle difference entre Docker secrets et variables d\'environnement ?',
    faq6a: 'Les secrets sont montes comme fichiers dans /run/secrets/ plutot que comme variables d\'environnement. Ils sont plus securises et supportent le suffixe _FILE.',
  },
  de: {
    title: 'Docker Compose Secrets und Umgebungsvariablen: Der richtige Weg',
    intro: 'Umgebungsvariablen sind der primaere Mechanismus zur Konfiguration von Containern in Docker Compose. Es gibt jedoch 4 verschiedene Wege, sie zu uebergeben, jeder mit unterschiedlichem Verhalten, Sicherheitsimplikationen und Fallstricken. Dieser Leitfaden behandelt alle Ansaetze.',
    fourWaysTitle: '4 Wege zur Uebergabe von Umgebungsvariablen in Docker Compose',
    fourWaysDesc: 'Docker Compose unterstuetzt vier verschiedene Methoden zur Injektion von Umgebungsvariablen in Container.',
    way1Title: '1. Inline mit der environment-Direktive',
    way1Desc: 'Schluessel-Wert-Paare direkt in docker-compose.yml definieren. Am besten fuer nicht-sensible, service-spezifische Konfiguration.',
    way2Title: '2. Externe Datei mit env_file',
    way2Desc: 'Variablen aus externen Dateien laden. Am besten fuer die Verwaltung zusammengehoeriger Variablen.',
    way3Title: '3. Shell-Umgebungsvariablen-Durchreichung',
    way3Desc: 'Host-Shell-Variablen an den Container weiterleiten. Am besten fuer CI/CD-Pipelines.',
    way4Title: '4. Variablensubstitution in docker-compose.yml',
    way4Desc: 'Host-Umgebungsvariablen direkt in Compose-Dateiwerten interpolieren.',
    comparisonTitle: 'Vergleichstabelle',
    method: 'Methode',
    bestFor: 'Am besten fuer',
    inVCS: 'In VCS?',
    secretSafe: 'Secret-sicher?',
    dotenvTitle: '.env-Datei: Syntax, Platzierung und Interpolation',
    dotenvDesc: 'Docker Compose liest automatisch eine .env-Datei im selben Verzeichnis wie docker-compose.yml.',
    dotenvSyntaxTitle: 'Syntaxregeln',
    dotenvPlacementTitle: 'Dateiplatzierung und Prioritaet',
    dotenvPlacementDesc: 'Compose sucht .env im Projektverzeichnis. Mit --env-file ueberschreibbar:',
    dotenvInterpolationTitle: 'Interpolation in docker-compose.yml',
    dotenvInterpolationDesc: 'Variablen aus .env stehen fuer die Substitution in docker-compose.yml zur Verfuegung, werden aber NICHT automatisch in Container injiziert:',
    envFileVsEnvTitle: 'env_file vs environment: Unterschiede und Fallstricke',
    envFileVsEnvDesc: 'Diese beiden Direktiven sehen aehnlich aus, verhalten sich aber unterschiedlich.',
    directive: 'Direktive',
    behavior: 'Verhalten',
    envFileVsEnvGotchasTitle: 'Kritische Fallstricke',
    gotcha1: 'Prioritaet: environment-Werte ueberschreiben env_file-Werte fuer denselben Schluessel.',
    gotcha2: 'Die .env-Datei (automatisch geladen) dient nur der Compose-Datei-Interpolation. Sie injiziert KEINE Variablen in Container.',
    gotcha3: 'env_file-Pfade sind relativ zur docker-compose.yml-Datei, nicht zum aktuellen Arbeitsverzeichnis.',
    gotcha4: 'Wenn eine env_file fehlt, schlaegt Compose fehl. Verwenden Sie required: false (Compose v2.24+).',
    secretsTitle: 'Docker Secrets: Dateibasierte Secrets fuer die Produktion',
    secretsDesc: 'Docker Secrets bieten eine sicherere Alternative zu Umgebungsvariablen fuer sensible Daten.',
    secretsStep1: 'Schritt 1: Secret-Dateien erstellen',
    secretsStep2: 'Schritt 2: Secrets in docker-compose.yml definieren',
    secretsStep3: 'Schritt 3: Secrets in der Anwendung lesen',
    secretsStep4: 'Schritt 4: Secrets im Code verarbeiten',
    secretsBenefitsTitle: 'Warum Secrets statt Umgebungsvariablen?',
    benefit1: 'Umgebungsvariablen koennen ueber docker inspect, /proc/environ und Fehlerprotokolle lecken',
    benefit2: 'Secrets sind dateibasiert und nur in /run/secrets/ zugaenglich',
    benefit3: 'Secrets unterstuetzen granulare Zugriffskontrolle pro Service',
    benefit4: 'Viele Datenbanken unterstuetzen nativ den _FILE-Suffix fuer Secret-Dateien',
    varSubTitle: 'Variablensubstitution: ${VAR:-default}-Syntax',
    varSubDesc: 'Docker Compose unterstuetzt Shell-aehnliche Variablensubstitution mit Standardwerten.',
    syntax: 'Syntax',
    result: 'Ergebnis',
    varSubExampleTitle: 'Praktisches Beispiel',
    multiEnvTitle: 'Multi-Umgebungs-Setup: Dev/Staging/Production-Muster',
    multiEnvDesc: 'Reale Projekte benoetigen unterschiedliche Konfigurationen. Hier sind bewaehrte Muster.',
    pattern1Title: 'Muster 1: Override-Dateien (empfohlen)',
    pattern1Desc: 'Verwenden Sie eine Basis-docker-compose.yml mit umgebungsspezifischen Override-Dateien.',
    pattern2Title: 'Muster 2: Umgebungsspezifische .env-Dateien',
    pattern2Desc: 'Verwenden Sie --env-file zum Laden verschiedener Variablensets pro Umgebung.',
    pattern3Title: 'Muster 3: Profiles fuer optionale Services',
    pattern3Desc: 'Verwenden Sie Compose-Profiles zum Ein- oder Ausschliessen von Services pro Umgebung.',
    securityTitle: 'Sicherheitscheckliste: Was NIEMALS in Umgebungsvariablen gehoert',
    securityDesc: 'Umgebungsvariablen sind praktisch, aber fuer sensible Daten inherent unsicher.',
    neverDo: 'NIEMALS',
    doInstead: 'Stattdessen',
    never1: 'Passwoerter in docker-compose.yml hartcodieren',
    instead1: '.env-Dateien (gitignored) oder Docker Secrets verwenden',
    never2: '.env-Dateien in Versionskontrolle committen',
    instead2: '.env zu .gitignore hinzufuegen, .env.example committen',
    never3: 'Private Schluessel ueber Umgebungsvariablen uebergeben',
    instead3: 'Als Dateien ueber Volumes oder Docker Secrets mounten',
    never4: 'Umgebungsvariablen im Anwendungscode protokollieren',
    instead4: 'Sensible Werte in Logs maskieren',
    never5: '.env-Dateien ueber Slack oder E-Mail teilen',
    instead5: 'Einen Secrets-Manager verwenden (Vault, AWS Secrets Manager)',
    never6: 'Gleiche Secrets in dev/staging/production verwenden',
    instead6: 'Einzigartige Secrets pro Umgebung generieren',
    debugTitle: 'Debugging: Warum laedt meine Umgebungsvariable nicht?',
    debugDesc: 'Folgen Sie diesem systematischen Ablauf, wenn eine Umgebungsvariable Ihren Container nicht erreicht.',
    debugStep1: 'Schritt 1: Ist die Variable definiert?',
    debugStep1Desc: 'Pruefen Sie, ob die Variable in .env, env_file oder environment-Direktive existiert.',
    debugStep2: 'Schritt 2: Erreicht sie den Container?',
    debugStep2Desc: 'Fuehren Sie docker compose exec <service> env aus, um alle Variablen zu sehen.',
    debugStep3: 'Schritt 3: Ist die .env-Datei am richtigen Ort?',
    debugStep3Desc: 'Die .env-Datei muss im selben Verzeichnis wie docker-compose.yml sein.',
    debugStep4: 'Schritt 4: Gibt es einen Namenskonflikt?',
    debugStep4Desc: 'Pruefen Sie Tippfehler, Gross-/Kleinschreibung und Prioritaet.',
    debugStep5: 'Schritt 5: Ist die Compose-Datei gueltig?',
    debugStep5Desc: 'Fuehren Sie docker compose config aus, um die aufgeloeste Konfiguration zu sehen.',
    debugStep6: 'Schritt 6: Wird die Variable ueberschrieben?',
    debugStep6Desc: 'Shell-Umgebungsvariablen ueberschreiben .env-Werte. Pruefen Sie mit echo $VAR_NAME.',
    debugCommandsTitle: 'Nuetzliche Debug-Befehle',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist der Unterschied zwischen .env und env_file in Docker Compose?',
    faq1a: 'Die .env-Datei wird automatisch fuer die Variablensubstitution in docker-compose.yml gelesen. Die env_file-Direktive laedt Variablen direkt in die Container-Umgebung.',
    faq2q: 'Wie uebergebe ich Host-Umgebungsvariablen an einen Container?',
    faq2a: 'Listen Sie den Variablennamen ohne Wert in der environment-Direktive auf oder verwenden Sie ${MY_VAR} in docker-compose.yml.',
    faq3q: 'Sind Docker-Umgebungsvariablen sicher?',
    faq3a: 'Nein. Sie sind ueber docker inspect sichtbar und erscheinen in /proc/environ. Verwenden Sie Docker Secrets fuer sensible Daten.',
    faq4q: 'Welche Prioritaetsreihenfolge haben Umgebungsvariablen?',
    faq4a: 'Von hoch nach niedrig: 1) docker compose run -e, 2) Host-Shell-Variablen, 3) environment-Direktive, 4) env_file-Direktive, 5) Dockerfile ENV.',
    faq5q: 'Wie verwende ich verschiedene Variablen fuer Dev und Production?',
    faq5a: 'Override-Dateien verwenden: Basis docker-compose.yml + docker-compose.override.yml fuer Dev + docker-compose.prod.yml fuer Production.',
    faq6q: 'Was ist der Unterschied zwischen Docker Secrets und Umgebungsvariablen?',
    faq6a: 'Secrets werden als Dateien in /run/secrets/ gemountet statt als Umgebungsvariablen gesetzt. Sie sind sicherer und unterstuetzen den _FILE-Suffix.',
  },
  es: {
    title: 'Docker Compose Secrets y variables de entorno: la forma correcta',
    intro: 'Las variables de entorno son el mecanismo principal para configurar contenedores en Docker Compose. Pero hay 4 formas diferentes de pasarlas, cada una con comportamientos, implicaciones de seguridad y trampas distintas. Esta guia cubre todos los enfoques.',
    fourWaysTitle: '4 formas de pasar variables de entorno en Docker Compose',
    fourWaysDesc: 'Docker Compose soporta cuatro metodos distintos para inyectar variables de entorno en contenedores.',
    way1Title: '1. En linea con la directiva environment',
    way1Desc: 'Define pares clave-valor directamente en docker-compose.yml. Ideal para configuracion no sensible y especifica del servicio.',
    way2Title: '2. Archivo externo con env_file',
    way2Desc: 'Carga variables desde archivos externos. Ideal para gestionar grupos de variables relacionadas.',
    way3Title: '3. Paso de variables del shell',
    way3Desc: 'Pasa variables del shell del host al contenedor. Ideal para pipelines CI/CD.',
    way4Title: '4. Sustitucion de variables en docker-compose.yml',
    way4Desc: 'Interpola variables de entorno del host directamente en los valores del archivo Compose.',
    comparisonTitle: 'Tabla comparativa',
    method: 'Metodo',
    bestFor: 'Ideal para',
    inVCS: 'En VCS?',
    secretSafe: 'Seguro?',
    dotenvTitle: 'Archivo .env: sintaxis, ubicacion e interpolacion',
    dotenvDesc: 'Docker Compose lee automaticamente un archivo .env en el mismo directorio que docker-compose.yml.',
    dotenvSyntaxTitle: 'Reglas de sintaxis',
    dotenvPlacementTitle: 'Ubicacion y prioridad del archivo',
    dotenvPlacementDesc: 'Compose busca .env en el directorio del proyecto. Puede sobrescribirse con --env-file:',
    dotenvInterpolationTitle: 'Interpolacion en docker-compose.yml',
    dotenvInterpolationDesc: 'Las variables de .env estan disponibles para sustitucion en docker-compose.yml, pero NO se inyectan automaticamente en los contenedores:',
    envFileVsEnvTitle: 'env_file vs environment: diferencias y trampas',
    envFileVsEnvDesc: 'Estas dos directivas parecen similares pero se comportan diferente.',
    directive: 'Directiva',
    behavior: 'Comportamiento',
    envFileVsEnvGotchasTitle: 'Trampas criticas',
    gotcha1: 'Precedencia: los valores de environment sobrescriben los de env_file para la misma clave.',
    gotcha2: 'El archivo .env (cargado automaticamente) es solo para interpolacion del archivo Compose. NO inyecta variables en contenedores.',
    gotcha3: 'Las rutas de env_file son relativas al archivo docker-compose.yml, no al directorio de trabajo actual.',
    gotcha4: 'Si falta un env_file, Compose fallara. Use required: false (Compose v2.24+) para hacerlo opcional.',
    secretsTitle: 'Docker Secrets: secretos basados en archivos para produccion',
    secretsDesc: 'Los secretos Docker proporcionan una alternativa mas segura a las variables de entorno para datos sensibles.',
    secretsStep1: 'Paso 1: Crear archivos de secretos',
    secretsStep2: 'Paso 2: Definir secretos en docker-compose.yml',
    secretsStep3: 'Paso 3: Leer secretos en la aplicacion',
    secretsStep4: 'Paso 4: Manejar secretos en el codigo',
    secretsBenefitsTitle: 'Por que Secrets en lugar de variables de entorno?',
    benefit1: 'Las variables de entorno pueden filtrarse via docker inspect, /proc/environ y logs de error',
    benefit2: 'Los secretos son basados en archivos y solo accesibles en /run/secrets/',
    benefit3: 'Los secretos soportan control de acceso granular por servicio',
    benefit4: 'Muchas bases de datos soportan nativamente el sufijo _FILE para archivos de secretos',
    varSubTitle: 'Sustitucion de variables: sintaxis ${VAR:-default}',
    varSubDesc: 'Docker Compose soporta sustitucion de variables estilo shell con valores por defecto.',
    syntax: 'Sintaxis',
    result: 'Resultado',
    varSubExampleTitle: 'Ejemplo practico',
    multiEnvTitle: 'Configuracion multi-entorno: patrones dev/staging/produccion',
    multiEnvDesc: 'Los proyectos reales necesitan configuraciones diferentes. Aqui hay patrones probados.',
    pattern1Title: 'Patron 1: Archivos override (recomendado)',
    pattern1Desc: 'Use un docker-compose.yml base con archivos override especificos del entorno.',
    pattern2Title: 'Patron 2: Archivos .env especificos del entorno',
    pattern2Desc: 'Use --env-file para cargar diferentes conjuntos de variables por entorno.',
    pattern3Title: 'Patron 3: Profiles para servicios opcionales',
    pattern3Desc: 'Use perfiles Compose para incluir o excluir servicios por entorno.',
    securityTitle: 'Checklist de seguridad: lo que NUNCA debe ir en variables de entorno',
    securityDesc: 'Las variables de entorno son convenientes pero inherentemente inseguras para datos sensibles.',
    neverDo: 'NUNCA haga esto',
    doInstead: 'Haga esto',
    never1: 'Codificar contrasenas en docker-compose.yml',
    instead1: 'Usar archivos .env (gitignored) o Docker secrets',
    never2: 'Commitear archivos .env al control de versiones',
    instead2: 'Agregar .env a .gitignore, commitear .env.example',
    never3: 'Usar variables de entorno para claves privadas',
    instead3: 'Montarlas como archivos via volumenes o Docker secrets',
    never4: 'Registrar variables de entorno en el codigo',
    instead4: 'Enmascarar valores sensibles en los logs',
    never5: 'Compartir archivos .env por Slack o email',
    instead5: 'Usar un gestor de secretos (Vault, AWS Secrets Manager)',
    never6: 'Usar los mismos secretos en dev/staging/produccion',
    instead6: 'Generar secretos unicos por entorno',
    debugTitle: 'Depuracion: por que no se carga mi variable de entorno?',
    debugDesc: 'Siga este proceso sistematico cuando una variable de entorno no llega a su contenedor.',
    debugStep1: 'Paso 1: Esta definida la variable?',
    debugStep1Desc: 'Verifique que existe en su archivo .env, env_file o directiva environment.',
    debugStep2: 'Paso 2: Llega al contenedor?',
    debugStep2Desc: 'Ejecute docker compose exec <servicio> env para ver todas las variables.',
    debugStep3: 'Paso 3: Esta el archivo .env en el lugar correcto?',
    debugStep3Desc: 'El archivo .env debe estar en el mismo directorio que docker-compose.yml.',
    debugStep4: 'Paso 4: Hay un conflicto de nombres?',
    debugStep4Desc: 'Verifique errores tipograficos, sensibilidad a mayusculas y precedencia.',
    debugStep5: 'Paso 5: Es valido el archivo Compose?',
    debugStep5Desc: 'Ejecute docker compose config para ver la configuracion resuelta.',
    debugStep6: 'Paso 6: Se esta sobrescribiendo la variable?',
    debugStep6Desc: 'Las variables shell del host sobrescriben los valores de .env. Verifique con echo $VAR_NAME.',
    debugCommandsTitle: 'Comandos de depuracion utiles',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Cual es la diferencia entre .env y env_file en Docker Compose?',
    faq1a: 'El archivo .env se lee automaticamente para la sustitucion en docker-compose.yml. La directiva env_file carga variables directamente en el entorno del contenedor.',
    faq2q: 'Como paso variables de entorno del host al contenedor?',
    faq2a: 'Liste el nombre de la variable sin valor en la directiva environment o use la sintaxis ${MY_VAR} en docker-compose.yml.',
    faq3q: 'Son seguras las variables de entorno de Docker?',
    faq3a: 'No. Son visibles con docker inspect y aparecen en /proc/environ. Use Docker secrets para datos sensibles.',
    faq4q: 'Cual es el orden de precedencia de las variables de entorno?',
    faq4a: 'De mayor a menor: 1) docker compose run -e, 2) Variables shell del host, 3) Directiva environment, 4) Directiva env_file, 5) Dockerfile ENV.',
    faq5q: 'Como usar variables diferentes para desarrollo y produccion?',
    faq5a: 'Use archivos override: docker-compose.yml base + docker-compose.override.yml para dev + docker-compose.prod.yml para produccion.',
    faq6q: 'Cual es la diferencia entre Docker secrets y variables de entorno?',
    faq6a: 'Los secretos se montan como archivos en /run/secrets/ en lugar de variables de entorno. Son mas seguros y soportan el sufijo _FILE.',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 12 };
const ulStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 24, marginBottom: 12 };
const alertStyle: React.CSSProperties = { padding: '14px 18px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-input)', marginBottom: 16, lineHeight: 1.7, color: 'var(--text-secondary)' };

export default function DockerComposeSecrets({ lang }: { lang: string }) {
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

      <p style={pStyle}>{t.intro}</p>

      {/* Section 1: 4 Ways to Pass Env Vars */}
      <h2 style={h2Style}>{t.fourWaysTitle}</h2>
      <p style={pStyle}>{t.fourWaysDesc}</p>

      <h3 style={h3Style}>{t.way1Title}</h3>
      <p style={pStyle}>{t.way1Desc}</p>
      <pre style={codeStyle}><code>{`services:
  api:
    image: node:20-alpine
    environment:
      NODE_ENV: production
      DB_HOST: postgres
      DB_PORT: "5432"
      LOG_LEVEL: info

  # List syntax (also valid)
  worker:
    image: node:20-alpine
    environment:
      - NODE_ENV=production
      - QUEUE_NAME=tasks
      - CONCURRENCY=4`}</code></pre>

      <h3 style={h3Style}>{t.way2Title}</h3>
      <p style={pStyle}>{t.way2Desc}</p>
      <pre style={codeStyle}><code>{`services:
  api:
    image: node:20-alpine
    env_file:
      - .env              # Shared variables
      - .env.api          # Service-specific variables
      - .env.local        # Local overrides (gitignored)

  db:
    image: postgres:16
    env_file:
      - .env
      - .env.db`}</code></pre>

      <h3 style={h3Style}>{t.way3Title}</h3>
      <p style={pStyle}>{t.way3Desc}</p>
      <pre style={codeStyle}><code>{`# In your shell:
export API_KEY=sk-abc123
export DEBUG=true

# docker-compose.yml
services:
  api:
    image: node:20-alpine
    environment:
      - API_KEY          # Passes host $API_KEY into container
      - DEBUG            # Passes host $DEBUG into container
      - CI               # Passes host $CI (empty string if unset)`}</code></pre>

      <h3 style={h3Style}>{t.way4Title}</h3>
      <p style={pStyle}>{t.way4Desc}</p>
      <pre style={codeStyle}><code>{`# .env file
POSTGRES_VERSION=16
APP_PORT=3000
REPLICAS=3

# docker-compose.yml
services:
  db:
    image: postgres:\${POSTGRES_VERSION}    # Resolved from .env or shell
  app:
    ports:
      - "\${APP_PORT}:3000"                 # Resolved from .env or shell
    deploy:
      replicas: \${REPLICAS}               # Resolved from .env or shell`}</code></pre>

      <h3 style={h3Style}>{t.comparisonTitle}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.method}</th>
            <th style={thStyle}>{t.bestFor}</th>
            <th style={thStyle}>{t.inVCS}</th>
            <th style={thStyle}>{t.secretSafe}</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['environment', 'Non-sensitive defaults', 'Yes', 'No'],
            ['env_file', 'Grouped config, secrets', 'No (.gitignore)', 'Partial'],
            ['Shell passthrough', 'CI/CD, dynamic values', 'N/A', 'Partial'],
            ['${} substitution', 'Compose file templating', 'Yes (file), No (.env)', 'No'],
          ].map(([method, best, vcs, safe], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600, fontSize: 13 }}>{method}</td>
              <td style={tdStyle}>{best}</td>
              <td style={tdStyle}>{vcs}</td>
              <td style={tdStyle}>{safe}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section 2: .env File */}
      <h2 style={h2Style}>{t.dotenvTitle}</h2>
      <p style={pStyle}>{t.dotenvDesc}</p>

      <h3 style={h3Style}>{t.dotenvSyntaxTitle}</h3>
      <pre style={codeStyle}><code>{`# Comments start with #
# Blank lines are ignored

# Simple key=value (no spaces around =)
DB_HOST=localhost
DB_PORT=5432

# Values with spaces need quotes
APP_NAME="My Docker App"
GREETING='Hello World'

# Multi-line values (double quotes only)
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
-----END RSA PRIVATE KEY-----"

# Variable expansion (Compose v2.20+)
BASE_URL=https://api.example.com
HEALTH_URL=\${BASE_URL}/health

# Export prefix is ignored (compatible with shell source)
export SECRET_KEY=mysecretkey

# Empty values
EMPTY_VAR=
ALSO_EMPTY=''`}</code></pre>

      <h3 style={h3Style}>{t.dotenvPlacementTitle}</h3>
      <p style={pStyle}>{t.dotenvPlacementDesc}</p>
      <pre style={codeStyle}><code>{`# Default: reads .env from project directory
docker compose up

# Override with --env-file
docker compose --env-file .env.staging up

# Multiple --env-file flags (Compose v2.24+)
docker compose --env-file .env --env-file .env.local up

# Project directory structure:
my-project/
  docker-compose.yml    # Compose file
  .env                  # Auto-loaded by Compose
  .env.staging          # Loaded with --env-file
  .env.production       # Loaded with --env-file`}</code></pre>

      <h3 style={h3Style}>{t.dotenvInterpolationTitle}</h3>
      <p style={pStyle}>{t.dotenvInterpolationDesc}</p>
      <pre style={codeStyle}><code>{`# .env
TAG=3.2.1
EXTERNAL_PORT=8080

# docker-compose.yml
services:
  web:
    image: myapp:\${TAG}              # Uses TAG from .env -> myapp:3.2.1
    ports:
      - "\${EXTERNAL_PORT}:80"        # Uses EXTERNAL_PORT from .env -> 8080:80
    environment:
      - TAG                           # WRONG! This passes host $TAG, not .env TAG
      - TAG=\${TAG}                   # RIGHT! Explicitly interpolate .env value

# Key insight:
# .env -> docker-compose.yml interpolation   (automatic)
# .env -> container environment              (NOT automatic, use env_file)`}</code></pre>

      {/* Section 3: env_file vs environment */}
      <h2 style={h2Style}>{t.envFileVsEnvTitle}</h2>
      <p style={pStyle}>{t.envFileVsEnvDesc}</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.directive}</th>
            <th style={thStyle}>{t.behavior}</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['environment:', 'Inlined in docker-compose.yml. Visible in version control. Supports variable substitution. Overrides env_file.'],
            ['env_file:', 'Loaded from external file(s). Can be gitignored. No variable substitution inside the file. Lower priority than environment.'],
            ['.env (auto)', 'Only for Compose file interpolation (${} syntax). NOT injected into containers. Lowest priority.'],
          ].map(([dir, beh], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600, fontSize: 13 }}>{dir}</td>
              <td style={tdStyle}>{beh}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={h3Style}>{t.envFileVsEnvGotchasTitle}</h3>
      <div style={alertStyle}>
        <ul style={{ ...ulStyle, marginBottom: 0 }}>
          <li style={{ marginBottom: 8 }}><strong>1.</strong> {t.gotcha1}</li>
          <li style={{ marginBottom: 8 }}><strong>2.</strong> {t.gotcha2}</li>
          <li style={{ marginBottom: 8 }}><strong>3.</strong> {t.gotcha3}</li>
          <li><strong>4.</strong> {t.gotcha4}</li>
        </ul>
      </div>

      <pre style={codeStyle}><code>{`# Precedence demonstration:

# .env.shared
DB_HOST=shared-db
DB_PORT=5432

# docker-compose.yml
services:
  api:
    env_file:
      - .env.shared              # DB_HOST=shared-db, DB_PORT=5432
    environment:
      DB_HOST: override-db       # Overrides env_file! DB_HOST=override-db
      # DB_PORT not listed here  # Keeps env_file value: DB_PORT=5432

# Result inside container:
# DB_HOST=override-db    (from environment, overrides env_file)
# DB_PORT=5432           (from env_file)

# Optional env_file (Compose v2.24+):
services:
  api:
    env_file:
      - path: .env.local
        required: false          # Won't fail if file doesn't exist`}</code></pre>

      {/* Section 4: Docker Secrets */}
      <h2 style={h2Style}>{t.secretsTitle}</h2>
      <p style={pStyle}>{t.secretsDesc}</p>

      <h3 style={h3Style}>{t.secretsStep1}</h3>
      <pre style={codeStyle}><code>{`# Create secret files (don't commit these!)
echo "SuperSecretPassword123" > db_password.txt
echo "sk-prod-abc123xyz789" > api_key.txt

# Add to .gitignore
echo "*.txt" >> .gitignore
echo "secrets/" >> .gitignore

# Alternative: use a secrets directory
mkdir secrets
echo "SuperSecretPassword123" > secrets/db_password
echo "sk-prod-abc123xyz789" > secrets/api_key`}</code></pre>

      <h3 style={h3Style}>{t.secretsStep2}</h3>
      <pre style={codeStyle}><code>{`# docker-compose.yml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password  # Note: _FILE suffix
    secrets:
      - db_password                    # Grant access to this secret

  api:
    image: myapp:latest
    secrets:
      - db_password
      - api_key
    # Secrets available at:
    # /run/secrets/db_password
    # /run/secrets/api_key

# Top-level secrets definition
secrets:
  db_password:
    file: ./secrets/db_password        # From local file
  api_key:
    file: ./secrets/api_key            # From local file

  # Alternative: use environment variable as source
  # jwt_secret:
  #   environment: JWT_SECRET_VALUE    # From host env var (Compose v2.23+)`}</code></pre>

      <h3 style={h3Style}>{t.secretsStep3}</h3>
      <pre style={codeStyle}><code>{`# Inside the container, secrets are plain text files:
$ docker compose exec api cat /run/secrets/db_password
SuperSecretPassword123

$ docker compose exec api cat /run/secrets/api_key
sk-prod-abc123xyz789

$ docker compose exec api ls -la /run/secrets/
total 8
-r--r--r-- 1 root root 24 Jan  1 00:00 db_password
-r--r--r-- 1 root root 22 Jan  1 00:00 api_key`}</code></pre>

      <h3 style={h3Style}>{t.secretsStep4}</h3>
      <pre style={codeStyle}><code>{`// Node.js - Read secret from file
const fs = require('fs');

function getSecret(name) {
  const secretPath = \`/run/secrets/\${name}\`;
  try {
    return fs.readFileSync(secretPath, 'utf8').trim();
  } catch (err) {
    // Fallback to environment variable (for development)
    return process.env[name.toUpperCase()];
  }
}

const dbPassword = getSecret('db_password');
const apiKey = getSecret('api_key');`}</code></pre>
      <pre style={codeStyle}><code>{`# Python - Read secret from file
import os

def get_secret(name: str) -> str:
    secret_path = f"/run/secrets/{name}"
    try:
        with open(secret_path) as f:
            return f.read().strip()
    except FileNotFoundError:
        # Fallback to environment variable
        return os.environ.get(name.upper(), "")

db_password = get_secret("db_password")
api_key = get_secret("api_key")`}</code></pre>

      <h3 style={h3Style}>{t.secretsBenefitsTitle}</h3>
      <div style={alertStyle}>
        <ul style={{ ...ulStyle, marginBottom: 0 }}>
          <li style={{ marginBottom: 8 }}>{t.benefit1}</li>
          <li style={{ marginBottom: 8 }}>{t.benefit2}</li>
          <li style={{ marginBottom: 8 }}>{t.benefit3}</li>
          <li>{t.benefit4}</li>
        </ul>
      </div>

      {/* Section 5: Variable Substitution */}
      <h2 style={h2Style}>{t.varSubTitle}</h2>
      <p style={pStyle}>{t.varSubDesc}</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.syntax}</th>
            <th style={thStyle}>{t.result}</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['${VAR}', 'Value of VAR. Error if unset.'],
            ['${VAR:-default}', 'Value of VAR if set, otherwise "default".'],
            ['${VAR-default}', 'Value of VAR if set (even if empty), otherwise "default".'],
            ['${VAR:?error msg}', 'Value of VAR if set, otherwise exit with "error msg".'],
            ['${VAR?error msg}', 'Value of VAR if set (even if empty), otherwise exit with "error msg".'],
            ['${VAR:+replacement}', '"replacement" if VAR is set and non-empty, otherwise empty.'],
            ['${VAR+replacement}', '"replacement" if VAR is set (even if empty), otherwise empty.'],
          ].map(([syn, res], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600, fontSize: 13 }}>{syn}</td>
              <td style={tdStyle}>{res}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={h3Style}>{t.varSubExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# docker-compose.yml with variable substitution
services:
  web:
    image: nginx:\${NGINX_VERSION:-1.25-alpine}     # Default: 1.25-alpine
    ports:
      - "\${WEB_PORT:-80}:80"                        # Default: 80
      - "\${SSL_PORT:-443}:443"                      # Default: 443
    volumes:
      - \${CONFIG_PATH:-./nginx.conf}:/etc/nginx/nginx.conf:ro

  api:
    image: \${REGISTRY:-docker.io}/myapp:\${TAG:?TAG is required}
    #                                     ^ Fails if TAG is not set
    environment:
      NODE_ENV: \${NODE_ENV:-development}
      LOG_LEVEL: \${LOG_LEVEL:-info}
      DATABASE_URL: postgres://\${DB_USER:-postgres}:\${DB_PASS:?DB_PASS required}@db:5432/\${DB_NAME:-myapp}

  db:
    image: postgres:\${PG_VERSION:-16}
    volumes:
      - \${DATA_DIR:-./data}/postgres:/var/lib/postgresql/data`}</code></pre>

      {/* Section 6: Multi-Environment Setup */}
      <h2 style={h2Style}>{t.multiEnvTitle}</h2>
      <p style={pStyle}>{t.multiEnvDesc}</p>

      <h3 style={h3Style}>{t.pattern1Title}</h3>
      <p style={pStyle}>{t.pattern1Desc}</p>
      <pre style={codeStyle}><code>{`# File structure:
project/
  docker-compose.yml              # Base configuration
  docker-compose.override.yml     # Dev overrides (auto-loaded!)
  docker-compose.staging.yml      # Staging overrides
  docker-compose.prod.yml         # Production overrides`}</code></pre>
      <pre style={codeStyle}><code>{`# docker-compose.yml (base)
services:
  api:
    image: myapp:\${TAG:-latest}
    restart: unless-stopped
    depends_on:
      - db
      - redis

  db:
    image: postgres:16
    volumes:
      - pg-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

volumes:
  pg-data:`}</code></pre>
      <pre style={codeStyle}><code>{`# docker-compose.override.yml (development - auto-loaded)
services:
  api:
    build: .
    volumes:
      - .:/app                          # Hot reload
      - /app/node_modules
    ports:
      - "3000:3000"
      - "9229:9229"                     # Debugger
    environment:
      NODE_ENV: development
      LOG_LEVEL: debug
      DB_HOST: db

  db:
    ports:
      - "5432:5432"                     # Expose DB for local tools
    environment:
      POSTGRES_PASSWORD: devpassword    # OK for dev only`}</code></pre>
      <pre style={codeStyle}><code>{`# docker-compose.prod.yml (production)
services:
  api:
    # No build, no volumes, no debug port
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      LOG_LEVEL: warn
    env_file:
      - .env.production
    secrets:
      - db_password
      - api_key
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '1.0'
          memory: 512M

  db:
    # No exposed ports
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    secrets:
      - db_password
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 1G

secrets:
  db_password:
    file: ./secrets/db_password
  api_key:
    file: ./secrets/api_key`}</code></pre>
      <pre style={codeStyle}><code>{`# Usage:

# Development (auto-loads docker-compose.override.yml)
docker compose up

# Staging
docker compose -f docker-compose.yml -f docker-compose.staging.yml up -d

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Validate merged config before deploying
docker compose -f docker-compose.yml -f docker-compose.prod.yml config`}</code></pre>

      <h3 style={h3Style}>{t.pattern2Title}</h3>
      <p style={pStyle}>{t.pattern2Desc}</p>
      <pre style={codeStyle}><code>{`# .env.development
TAG=latest
APP_PORT=3000
DB_PASSWORD=devpassword
LOG_LEVEL=debug
REPLICAS=1

# .env.staging
TAG=rc-1.2.3
APP_PORT=3000
DB_PASSWORD=staging-secret-pw
LOG_LEVEL=info
REPLICAS=2

# .env.production
TAG=1.2.3
APP_PORT=3000
DB_PASSWORD=prod-ultra-secret-pw
LOG_LEVEL=warn
REPLICAS=3

# Usage:
docker compose --env-file .env.development up       # Dev
docker compose --env-file .env.staging up -d         # Staging
docker compose --env-file .env.production up -d      # Production`}</code></pre>

      <h3 style={h3Style}>{t.pattern3Title}</h3>
      <p style={pStyle}>{t.pattern3Desc}</p>
      <pre style={codeStyle}><code>{`# docker-compose.yml
services:
  api:
    image: myapp:\${TAG:-latest}
    ports:
      - "3000:3000"

  db:
    image: postgres:16
    volumes:
      - pg-data:/var/lib/postgresql/data

  # Dev-only services
  adminer:
    image: adminer
    ports:
      - "8080:8080"
    profiles:
      - dev                           # Only starts with --profile dev

  mailhog:
    image: mailhog/mailhog
    ports:
      - "1025:1025"
      - "8025:8025"
    profiles:
      - dev                           # Only starts with --profile dev

  # Monitoring (staging + production)
  prometheus:
    image: prom/prometheus
    profiles:
      - monitoring                    # Only starts with --profile monitoring

volumes:
  pg-data:

# Usage:
docker compose --profile dev up                     # Includes adminer + mailhog
docker compose --profile monitoring up -d           # Includes prometheus
docker compose --profile dev --profile monitoring up  # Both profiles`}</code></pre>

      {/* Section 7: Security Checklist */}
      <h2 style={h2Style}>{t.securityTitle}</h2>
      <p style={pStyle}>{t.securityDesc}</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thStyle, color: '#ef4444' }}>{t.neverDo}</th>
            <th style={{ ...thStyle, color: '#22c55e' }}>{t.doInstead}</th>
          </tr>
        </thead>
        <tbody>
          {[
            [t.never1, t.instead1],
            [t.never2, t.instead2],
            [t.never3, t.instead3],
            [t.never4, t.instead4],
            [t.never5, t.instead5],
            [t.never6, t.instead6],
          ].map(([never, instead], i) => (
            <tr key={i}>
              <td style={tdStyle}>{never}</td>
              <td style={tdStyle}>{instead}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <pre style={codeStyle}><code>{`# .gitignore — essential entries for Docker projects
.env
.env.*
!.env.example
secrets/
*.pem
*.key
*.crt`}</code></pre>

      <pre style={codeStyle}><code>{`# .env.example — commit this as a template
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=myapp
DB_PASSWORD=CHANGE_ME

# API Keys
API_KEY=CHANGE_ME
JWT_SECRET=CHANGE_ME

# Application
NODE_ENV=development
LOG_LEVEL=debug
APP_PORT=3000`}</code></pre>

      {/* Section 8: Debugging Flowchart */}
      <h2 style={h2Style}>{t.debugTitle}</h2>
      <p style={pStyle}>{t.debugDesc}</p>

      <div style={{ ...alertStyle, borderLeft: '4px solid var(--accent-blue)' }}>
        <p style={{ margin: '0 0 12px 0', fontWeight: 700, color: 'var(--text-primary)' }}>{t.debugStep1}</p>
        <p style={{ margin: '0 0 16px 0' }}>{t.debugStep1Desc}</p>

        <p style={{ margin: '0 0 12px 0', fontWeight: 700, color: 'var(--text-primary)' }}>{t.debugStep2}</p>
        <p style={{ margin: '0 0 16px 0' }}>{t.debugStep2Desc}</p>

        <p style={{ margin: '0 0 12px 0', fontWeight: 700, color: 'var(--text-primary)' }}>{t.debugStep3}</p>
        <p style={{ margin: '0 0 16px 0' }}>{t.debugStep3Desc}</p>

        <p style={{ margin: '0 0 12px 0', fontWeight: 700, color: 'var(--text-primary)' }}>{t.debugStep4}</p>
        <p style={{ margin: '0 0 16px 0' }}>{t.debugStep4Desc}</p>

        <p style={{ margin: '0 0 12px 0', fontWeight: 700, color: 'var(--text-primary)' }}>{t.debugStep5}</p>
        <p style={{ margin: '0 0 16px 0' }}>{t.debugStep5Desc}</p>

        <p style={{ margin: '0 0 12px 0', fontWeight: 700, color: 'var(--text-primary)' }}>{t.debugStep6}</p>
        <p style={{ margin: 0 }}>{t.debugStep6Desc}</p>
      </div>

      <h3 style={h3Style}>{t.debugCommandsTitle}</h3>
      <pre style={codeStyle}><code>{`# 1. See the fully resolved Compose config (all variables substituted)
docker compose config

# 2. Check environment variables inside a running container
docker compose exec api env

# 3. Check a specific variable
docker compose exec api sh -c 'echo $DATABASE_URL'

# 4. Inspect container config (shows env vars, mounts, etc.)
docker inspect <container_id> --format '{{json .Config.Env}}' | jq .

# 5. Check if .env file is being read
docker compose config --format json | jq '.services.api.environment'

# 6. Verify env_file exists and is readable
docker compose config 2>&1 | grep -i "env_file"

# 7. Run a one-off container to test environment
docker compose run --rm api env | sort

# 8. Check for shell variable conflicts
env | grep -i "DB_"

# 9. Validate Compose file syntax
docker compose config --quiet && echo "Valid" || echo "Invalid"

# 10. Show variable substitution warnings
docker compose --verbose up 2>&1 | grep -i "variable"`}</code></pre>

      {/* Section 9: FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        { q: t.faq1q, a: t.faq1a },
        { q: t.faq2q, a: t.faq2a },
        { q: t.faq3q, a: t.faq3a },
        { q: t.faq4q, a: t.faq4a },
        { q: t.faq5q, a: t.faq5a },
        { q: t.faq6q, a: t.faq6a },
      ].map((faq, i) => (
        <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>{faq.q}</summary>
          <p style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
