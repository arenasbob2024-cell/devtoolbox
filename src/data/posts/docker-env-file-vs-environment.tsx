'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Docker Compose env_file vs environment: When to Use Which (With Examples)',
    intro: 'Docker Compose gives you multiple ways to inject environment variables into containers: the environment directive, the env_file directive, the root-level .env file, and build-time ARG values. Each behaves differently with distinct precedence rules, security implications, and use cases. This guide breaks down exactly when to use which, with copy-paste docker-compose.yml examples for every scenario.',

    quickTitle: 'Quick Answer: env_file for Secrets, environment for Config',
    quickDesc: 'If you just need a fast rule of thumb:',
    quickRule1: 'Use environment for non-sensitive, service-specific config that you want visible in your Compose file (port numbers, log levels, feature flags).',
    quickRule2: 'Use env_file for secrets and grouped variables you want to keep out of version control (API keys, database passwords, third-party credentials).',
    quickRule3: 'Use the root .env file for Compose file interpolation only (image tags, port mappings, replica counts).',
    quickRule4: 'Use ARG for build-time values that should NOT exist at runtime (build tool versions, dependency flags).',

    envTitle: 'environment: Inline and Map Syntax',
    envDesc: 'The environment directive defines key-value pairs directly in your docker-compose.yml. These values are visible in version control and override values from env_file.',
    envInlineTitle: 'List Syntax (Array)',
    envInlineDesc: 'Uses KEY=VALUE strings in an array. Most common in tutorials and quick setups:',
    envMapTitle: 'Map Syntax (Dictionary)',
    envMapDesc: 'Uses YAML key-value mapping. Cleaner for large configurations and supports YAML anchors:',
    envOverrideTitle: 'Override Behavior',
    envOverrideDesc: 'Values in environment always override the same key from env_file. This is by design, allowing you to set defaults in a file and override specific values inline:',
    envPassthroughTitle: 'Shell Passthrough',
    envPassthroughDesc: 'List a variable name without a value to pass the host shell variable into the container:',

    envFileTitle: 'env_file: External File Loading',
    envFileDesc: 'The env_file directive loads variables from one or more external files into the container environment. Unlike environment, these files can be gitignored to keep secrets out of version control.',
    envFileFormatTitle: '.env File Format Rules',
    envFileMultiTitle: 'Multiple Files and Merge Order',
    envFileMultiDesc: 'You can specify multiple files. Later files override earlier files for the same key:',
    envFilePathTitle: 'Path Resolution',
    envFilePathDesc: 'File paths in env_file are relative to the docker-compose.yml file location, NOT the current working directory. This is a common source of confusion:',
    envFileOptionalTitle: 'Optional env_file (Compose v2.24+)',
    envFileOptionalDesc: 'By default, a missing env_file causes an error. Use the required field to make it optional:',

    dotenvTitle: '.env File (Root Level): Auto-Loaded by Docker Compose',
    dotenvDesc: 'Docker Compose automatically reads a file named .env in the same directory as your docker-compose.yml (or the project directory). This file serves a special purpose that is frequently misunderstood.',
    dotenvPurposeTitle: 'What .env Actually Does',
    dotenvPurpose1: 'The .env file provides values for ${VARIABLE} substitution inside docker-compose.yml itself.',
    dotenvPurpose2: 'It does NOT automatically inject variables into containers.',
    dotenvPurpose3: 'To get .env values into containers, you must also use environment or env_file.',
    dotenvExampleTitle: 'How .env Works (and Doesn\'t Work)',
    dotenvOverrideTitle: 'Using --env-file to Override',
    dotenvOverrideDesc: 'You can point Compose to a different file for interpolation:',

    comparisonTitle: 'Comparison Table: env_file vs environment vs .env vs ARG',
    comparisonDesc: 'Here is a side-by-side comparison of all four methods:',
    colFeature: 'Feature',
    colEnvironment: 'environment',
    colEnvFile: 'env_file',
    colDotenv: '.env (root)',
    colArg: 'ARG (build)',
    rowPurpose: 'Purpose',
    rowScope: 'Scope',
    rowInCompose: 'In docker-compose.yml?',
    rowGitignore: 'Gitignore-able?',
    rowSecrets: 'Good for secrets?',
    rowPrecedence: 'Precedence',
    rowSubstitution: 'Supports ${} syntax?',
    valEnvPurpose: 'Direct container env vars',
    valEnvFilePurpose: 'Load env vars from file(s)',
    valDotenvPurpose: 'Compose file interpolation',
    valArgPurpose: 'Build-time variables',
    valEnvScope: 'Runtime (container)',
    valEnvFileScope: 'Runtime (container)',
    valDotenvScope: 'Compose file only',
    valArgScope: 'Build only (unless passed to ENV)',
    valYes: 'Yes',
    valNo: 'No',
    valPartial: 'Partial',
    valHighest: 'Highest',
    valMedium: 'Medium',
    valLowest: 'Lowest (interpolation only)',
    valBuildOnly: 'Build-time only',
    valInValues: 'In values only',
    valNotInFile: 'Not inside the file itself',
    valNa: 'N/A',

    varSubTitle: 'Variable Substitution: ${VAR:-default}, ${VAR:?error}',
    varSubDesc: 'Docker Compose supports shell-style variable substitution with powerful default and error-handling syntax. These work in docker-compose.yml values using variables from .env or the host shell.',
    varSubSyntax: 'Syntax',
    varSubResult: 'Result',
    varSubExample: 'Example',
    varSub1Syntax: '${VAR}',
    varSub1Result: 'Value of VAR, empty string if unset',
    varSub1Example: 'image: myapp:${TAG}',
    varSub2Syntax: '${VAR:-default}',
    varSub2Result: 'Value of VAR, or "default" if unset/empty',
    varSub2Example: 'image: myapp:${TAG:-latest}',
    varSub3Syntax: '${VAR-default}',
    varSub3Result: 'Value of VAR, or "default" if unset (allows empty)',
    varSub3Example: 'LOG_LEVEL: ${LOG:-}',
    varSub4Syntax: '${VAR:?error msg}',
    varSub4Result: 'Value of VAR, or EXIT with error if unset/empty',
    varSub4Example: 'DB_HOST: ${DB_HOST:?Must set DB_HOST}',
    varSub5Syntax: '${VAR?error msg}',
    varSub5Result: 'Value of VAR, or EXIT with error if unset (allows empty)',
    varSub5Example: 'API_KEY: ${API_KEY?Missing API_KEY}',
    varSub6Syntax: '${VAR:+replacement}',
    varSub6Result: '"replacement" if VAR is set and non-empty, else empty',
    varSub6Example: 'DEBUG: ${DEBUG:+true}',
    varSubPracticalTitle: 'Practical Example with Defaults and Validation',

    priorityTitle: 'Priority Order: environment > env_file > .env > Dockerfile ENV',
    priorityDesc: 'When the same variable is defined in multiple places, Docker Compose applies a strict precedence order. Understanding this prevents hours of debugging.',
    priorityOrder: 'From highest to lowest priority:',
    priority1: 'docker compose run -e KEY=VALUE (CLI override)',
    priority2: 'Host shell environment variables',
    priority3: 'environment directive in docker-compose.yml',
    priority4: 'env_file directive (later files override earlier files)',
    priority5: '.env file (for Compose interpolation only)',
    priority6: 'Dockerfile ENV instruction',
    priorityDemoTitle: 'Priority Demonstration',

    realWorldTitle: 'Real-World Setup: Dev, Staging, Production',
    realWorldDesc: 'Here is a complete, production-tested multi-environment setup that uses all the techniques above.',
    realWorldStructureTitle: 'Project Structure',
    realWorldBaseTitle: 'Base docker-compose.yml',
    realWorldDevTitle: 'Development: docker-compose.override.yml',
    realWorldDevDesc: 'This file is auto-loaded by docker compose up in development:',
    realWorldStagingTitle: 'Staging: docker-compose.staging.yml',
    realWorldProdTitle: 'Production: docker-compose.prod.yml',
    realWorldCommandsTitle: 'Commands per Environment',

    securityTitle: 'Security Best Practices',
    securityDesc: 'Environment variables are inherently insecure for sensitive data. Follow these practices to minimize risk.',
    secGitignoreTitle: '1. Always .gitignore Your .env Files',
    secTemplateTitle: '2. Commit a Template, Not the Real File',
    secSecretsTitle: '3. Use Docker Secrets for Production',
    secSecretsDesc: 'Docker secrets mount sensitive data as files at /run/secrets/ instead of exposing them as environment variables:',
    secInspectTitle: '4. Be Aware of docker inspect',
    secInspectDesc: 'Environment variables are visible via docker inspect. Anyone with Docker access can read them:',
    secRotateTitle: '5. Rotate Secrets per Environment',
    secRotateDesc: 'Never use the same passwords, API keys, or tokens across dev, staging, and production. Generate unique values for each.',

    debugTitle: 'Debugging: docker compose config, docker inspect',
    debugDesc: 'When environment variables are not working as expected, use these systematic debugging steps.',
    debugStep1Title: 'Step 1: See the Resolved Compose File',
    debugStep1Desc: 'docker compose config shows the fully interpolated Compose file with all variables resolved:',
    debugStep2Title: 'Step 2: Check Container Environment',
    debugStep2Desc: 'See all environment variables actually set inside a running container:',
    debugStep3Title: 'Step 3: Inspect a Stopped Container',
    debugStep3Desc: 'Check environment variables on a container that has exited:',
    debugStep4Title: 'Step 4: Verify .env File Location',
    debugStep4Desc: 'The .env file must be in the project directory (where docker-compose.yml is). Verify:',
    debugStep5Title: 'Step 5: Check for Overrides',
    debugStep5Desc: 'Host shell variables override .env values. Check what your shell has set:',
    debugCheatsheetTitle: 'Debug Command Cheatsheet',

    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the difference between env_file and .env in Docker Compose?',
    faq1a: 'env_file is a directive that loads variables directly into the container environment from an external file. The .env file (root level) is automatically read by Docker Compose for variable substitution inside docker-compose.yml itself, but does NOT inject variables into containers. They serve different purposes: env_file is for container configuration, .env is for Compose file templating.',
    faq2q: 'Can I use both environment and env_file for the same service?',
    faq2a: 'Yes, and this is a common pattern. Variables from env_file are loaded first, then environment values override any duplicate keys. This lets you keep defaults in a file and override specific values inline. For example, set shared config in .env.shared via env_file, then override DB_HOST in environment for a specific service.',
    faq3q: 'Why is my .env variable not reaching the container?',
    faq3a: 'The root .env file is only used for ${} interpolation in docker-compose.yml. It does NOT automatically set variables inside containers. To pass .env values into a container, you must either: (1) use env_file to point to the .env file explicitly, or (2) use environment with ${VAR} syntax to interpolate the value. This is the #1 source of confusion with Docker Compose environment variables.',
    faq4q: 'How do I handle secrets in Docker Compose without environment variables?',
    faq4a: 'Use Docker secrets. Define secrets in your docker-compose.yml pointing to local files, then grant services access. Secrets are mounted as files at /run/secrets/<name> inside the container. Many official images support the _FILE suffix convention (e.g., POSTGRES_PASSWORD_FILE=/run/secrets/db_password). This prevents secrets from appearing in docker inspect, process listings, or logs.',
    faq5q: 'Does env_file support variable substitution like ${VAR}?',
    faq5a: 'No. Unlike docker-compose.yml, files loaded via env_file do NOT support ${} variable substitution. Each line is treated as a literal KEY=VALUE pair. If you need variable expansion, define the variables in the environment directive using ${VAR} syntax, which will be interpolated from .env or host shell variables.',
  },
  zh: {
    title: 'Docker Compose env_file vs environment：何时用哪个（附示例）',
    intro: 'Docker Compose 提供多种方式将环境变量注入容器：environment 指令、env_file 指令、根级 .env 文件和构建时 ARG 值。每种方式行为不同，具有不同的优先级规则、安全影响和使用场景。本指南详细说明何时使用哪种方式，并提供可直接复制的 docker-compose.yml 示例。',

    quickTitle: '快速答案：env_file 用于密钥，environment 用于配置',
    quickDesc: '如果你只需要一个快速经验法则：',
    quickRule1: '使用 environment 设置非敏感的、服务特定的配置，这些配置你希望在 Compose 文件中可见（端口号、日志级别、功能开关）。',
    quickRule2: '使用 env_file 管理密钥和分组变量，将它们排除在版本控制之外（API 密钥、数据库密码、第三方凭证）。',
    quickRule3: '使用根级 .env 文件仅用于 Compose 文件插值（镜像标签、端口映射、副本数量）。',
    quickRule4: '使用 ARG 设置构建时的值，这些值不应在运行时存在（构建工具版本、依赖标志）。',

    envTitle: 'environment：内联和映射语法',
    envDesc: 'environment 指令直接在 docker-compose.yml 中定义键值对。这些值在版本控制中可见，并覆盖 env_file 中的值。',
    envInlineTitle: '列表语法（数组）',
    envInlineDesc: '使用数组中的 KEY=VALUE 字符串。在教程和快速设置中最常见：',
    envMapTitle: '映射语法（字典）',
    envMapDesc: '使用 YAML 键值映射。对大型配置更清晰，支持 YAML 锚点：',
    envOverrideTitle: '覆盖行为',
    envOverrideDesc: 'environment 中的值始终覆盖 env_file 中的相同键。这是设计使然，允许你在文件中设置默认值并内联覆盖特定值：',
    envPassthroughTitle: 'Shell 透传',
    envPassthroughDesc: '列出不带值的变量名，将主机 shell 变量传递到容器中：',

    envFileTitle: 'env_file：外部文件加载',
    envFileDesc: 'env_file 指令从一个或多个外部文件加载变量到容器环境中。与 environment 不同，这些文件可以被 gitignore，从而将密钥排除在版本控制之外。',
    envFileFormatTitle: '.env 文件格式规则',
    envFileMultiTitle: '多文件和合并顺序',
    envFileMultiDesc: '你可以指定多个文件。后面的文件会覆盖前面文件中的相同键：',
    envFilePathTitle: '路径解析',
    envFilePathDesc: 'env_file 中的文件路径相对于 docker-compose.yml 文件的位置，而非当前工作目录。这是一个常见的混淆源：',
    envFileOptionalTitle: '可选 env_file（Compose v2.24+）',
    envFileOptionalDesc: '默认情况下，缺失的 env_file 会导致错误。使用 required 字段使其可选：',

    dotenvTitle: '.env 文件（根级）：Docker Compose 自动加载',
    dotenvDesc: 'Docker Compose 自动读取与 docker-compose.yml 同目录（或项目目录）下名为 .env 的文件。这个文件有一个经常被误解的特殊用途。',
    dotenvPurposeTitle: '.env 实际做什么',
    dotenvPurpose1: '.env 文件为 docker-compose.yml 内部的 ${VARIABLE} 替换提供值。',
    dotenvPurpose2: '它不会自动将变量注入容器。',
    dotenvPurpose3: '要将 .env 的值传入容器，你必须同时使用 environment 或 env_file。',
    dotenvExampleTitle: '.env 如何工作（以及不如何工作）',
    dotenvOverrideTitle: '使用 --env-file 覆盖',
    dotenvOverrideDesc: '你可以让 Compose 指向不同的插值文件：',

    comparisonTitle: '对比表：env_file vs environment vs .env vs ARG',
    comparisonDesc: '以下是四种方法的并排对比：',
    colFeature: '特性',
    colEnvironment: 'environment',
    colEnvFile: 'env_file',
    colDotenv: '.env（根级）',
    colArg: 'ARG（构建）',
    rowPurpose: '用途',
    rowScope: '作用域',
    rowInCompose: '在 docker-compose.yml 中？',
    rowGitignore: '可被 gitignore？',
    rowSecrets: '适合存密钥？',
    rowPrecedence: '优先级',
    rowSubstitution: '支持 ${} 语法？',
    valEnvPurpose: '直接设置容器环境变量',
    valEnvFilePurpose: '从文件加载环境变量',
    valDotenvPurpose: 'Compose 文件插值',
    valArgPurpose: '构建时变量',
    valEnvScope: '运行时（容器）',
    valEnvFileScope: '运行时（容器）',
    valDotenvScope: '仅 Compose 文件',
    valArgScope: '仅构建时（除非传递给 ENV）',
    valYes: '是',
    valNo: '否',
    valPartial: '部分',
    valHighest: '最高',
    valMedium: '中',
    valLowest: '最低（仅插值）',
    valBuildOnly: '仅构建时',
    valInValues: '仅在值中',
    valNotInFile: '文件内部不支持',
    valNa: '不适用',

    varSubTitle: '变量替换：${VAR:-default}、${VAR:?error}',
    varSubDesc: 'Docker Compose 支持 shell 风格的变量替换，具有强大的默认值和错误处理语法。这些在 docker-compose.yml 的值中使用 .env 或主机 shell 的变量。',
    varSubSyntax: '语法',
    varSubResult: '结果',
    varSubExample: '示例',
    varSub1Syntax: '${VAR}',
    varSub1Result: 'VAR 的值，未设置则为空字符串',
    varSub1Example: 'image: myapp:${TAG}',
    varSub2Syntax: '${VAR:-default}',
    varSub2Result: 'VAR 的值，未设置/为空则使用 "default"',
    varSub2Example: 'image: myapp:${TAG:-latest}',
    varSub3Syntax: '${VAR-default}',
    varSub3Result: 'VAR 的值，未设置则使用 "default"（允许空值）',
    varSub3Example: 'LOG_LEVEL: ${LOG:-}',
    varSub4Syntax: '${VAR:?error msg}',
    varSub4Result: 'VAR 的值，未设置/为空则退出并报错',
    varSub4Example: 'DB_HOST: ${DB_HOST:?Must set DB_HOST}',
    varSub5Syntax: '${VAR?error msg}',
    varSub5Result: 'VAR 的值，未设置则退出并报错（允许空值）',
    varSub5Example: 'API_KEY: ${API_KEY?Missing API_KEY}',
    varSub6Syntax: '${VAR:+replacement}',
    varSub6Result: '如果 VAR 已设置且非空则为 "replacement"，否则为空',
    varSub6Example: 'DEBUG: ${DEBUG:+true}',
    varSubPracticalTitle: '带默认值和验证的实际示例',

    priorityTitle: '优先级顺序：environment > env_file > .env > Dockerfile ENV',
    priorityDesc: '当同一变量在多个位置定义时，Docker Compose 应用严格的优先级顺序。理解这一点可以避免数小时的调试。',
    priorityOrder: '从最高到最低优先级：',
    priority1: 'docker compose run -e KEY=VALUE（CLI 覆盖）',
    priority2: '主机 shell 环境变量',
    priority3: 'docker-compose.yml 中的 environment 指令',
    priority4: 'env_file 指令（后面的文件覆盖前面的文件）',
    priority5: '.env 文件（仅用于 Compose 插值）',
    priority6: 'Dockerfile ENV 指令',
    priorityDemoTitle: '优先级演示',

    realWorldTitle: '实际设置：开发、预发布、生产',
    realWorldDesc: '这是一个完整的、经过生产测试的多环境设置，使用了上述所有技术。',
    realWorldStructureTitle: '项目结构',
    realWorldBaseTitle: '基础 docker-compose.yml',
    realWorldDevTitle: '开发环境：docker-compose.override.yml',
    realWorldDevDesc: '此文件在开发环境中由 docker compose up 自动加载：',
    realWorldStagingTitle: '预发布环境：docker-compose.staging.yml',
    realWorldProdTitle: '生产环境：docker-compose.prod.yml',
    realWorldCommandsTitle: '各环境命令',

    securityTitle: '安全最佳实践',
    securityDesc: '环境变量对敏感数据本质上不安全。遵循以下实践来最小化风险。',
    secGitignoreTitle: '1. 始终 .gitignore 你的 .env 文件',
    secTemplateTitle: '2. 提交模板，而非真实文件',
    secSecretsTitle: '3. 生产环境使用 Docker Secrets',
    secSecretsDesc: 'Docker secrets 将敏感数据以文件形式挂载到 /run/secrets/，而不是作为环境变量暴露：',
    secInspectTitle: '4. 注意 docker inspect',
    secInspectDesc: '环境变量通过 docker inspect 可见。任何有 Docker 访问权限的人都能读取：',
    secRotateTitle: '5. 按环境轮换密钥',
    secRotateDesc: '永远不要在开发、预发布和生产环境使用相同的密码、API 密钥或令牌。为每个环境生成唯一值。',

    debugTitle: '调试：docker compose config、docker inspect',
    debugDesc: '当环境变量未按预期工作时，使用这些系统化的调试步骤。',
    debugStep1Title: '步骤1：查看解析后的 Compose 文件',
    debugStep1Desc: 'docker compose config 显示所有变量解析后的完整 Compose 文件：',
    debugStep2Title: '步骤2：检查容器环境',
    debugStep2Desc: '查看运行中容器内实际设置的所有环境变量：',
    debugStep3Title: '步骤3：检查已停止的容器',
    debugStep3Desc: '检查已退出容器的环境变量：',
    debugStep4Title: '步骤4：验证 .env 文件位置',
    debugStep4Desc: '.env 文件必须在项目目录中（docker-compose.yml 所在位置）。验证方法：',
    debugStep5Title: '步骤5：检查覆盖',
    debugStep5Desc: '主机 shell 变量会覆盖 .env 值。检查你的 shell 设置了什么：',
    debugCheatsheetTitle: '调试命令速查表',

    faqTitle: '常见问题',
    faq1q: 'Docker Compose 中 env_file 和 .env 有什么区别？',
    faq1a: 'env_file 是一个指令，从外部文件将变量直接加载到容器环境中。.env 文件（根级）由 Docker Compose 自动读取，用于 docker-compose.yml 内部的变量替换，但不会将变量注入容器。它们用途不同：env_file 用于容器配置，.env 用于 Compose 文件模板化。',
    faq2q: '同一服务可以同时使用 environment 和 env_file 吗？',
    faq2a: '可以，这是一种常见模式。env_file 的变量先加载，然后 environment 的值覆盖任何重复的键。这让你可以在文件中保留默认值，并在行内覆盖特定值。例如，通过 env_file 在 .env.shared 中设置共享配置，然后在 environment 中为特定服务覆盖 DB_HOST。',
    faq3q: '为什么我的 .env 变量没有到达容器？',
    faq3a: '根级 .env 文件仅用于 docker-compose.yml 中的 ${} 插值。它不会自动在容器内设置变量。要将 .env 值传入容器，你必须：(1) 使用 env_file 显式指向 .env 文件，或 (2) 使用 environment 配合 ${VAR} 语法进行插值。这是 Docker Compose 环境变量混淆的第一大来源。',
    faq4q: '如何在 Docker Compose 中不使用环境变量处理密钥？',
    faq4a: '使用 Docker secrets。在 docker-compose.yml 中定义指向本地文件的密钥，然后授予服务访问权限。密钥以文件形式挂载在容器内的 /run/secrets/<name>。许多官方镜像支持 _FILE 后缀约定（如 POSTGRES_PASSWORD_FILE=/run/secrets/db_password）。这防止密钥出现在 docker inspect、进程列表或日志中。',
    faq5q: 'env_file 支持像 ${VAR} 这样的变量替换吗？',
    faq5a: '不支持。与 docker-compose.yml 不同，通过 env_file 加载的文件不支持 ${} 变量替换。每行都被视为字面的 KEY=VALUE 对。如果你需要变量展开，请在 environment 指令中使用 ${VAR} 语法定义变量，这些变量会从 .env 或主机 shell 变量中插值。',
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

export default function DockerEnvFileVsEnvironment({ lang }: { lang: string }) {
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
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={pStyle}>{t.intro}</p>

      {/* Section 1: Quick Answer */}
      <h2 style={h2Style}>{t.quickTitle}</h2>
      <p style={pStyle}>{t.quickDesc}</p>
      <ul style={ulStyle}>
        <li style={{ marginBottom: 8 }}><strong>environment:</strong> {t.quickRule1}</li>
        <li style={{ marginBottom: 8 }}><strong>env_file:</strong> {t.quickRule2}</li>
        <li style={{ marginBottom: 8 }}><strong>.env:</strong> {t.quickRule3}</li>
        <li><strong>ARG:</strong> {t.quickRule4}</li>
      </ul>
      <pre style={codeStyle}><code>{`# Quick reference — same service using all methods:
services:
  api:
    build:
      context: .
      args:
        NODE_VERSION: 20          # ARG: build-time only
    image: myapp:\${TAG:-latest}   # .env: Compose interpolation
    env_file:
      - .env.secrets              # env_file: secrets (gitignored)
    environment:
      NODE_ENV: production        # environment: inline config
      LOG_LEVEL: info
      PORT: "3000"`}</code></pre>

      {/* Section 2: environment */}
      <h2 style={h2Style}>{t.envTitle}</h2>
      <p style={pStyle}>{t.envDesc}</p>

      <h3 style={h3Style}>{t.envInlineTitle}</h3>
      <p style={pStyle}>{t.envInlineDesc}</p>
      <pre style={codeStyle}><code>{`services:
  api:
    image: node:20-alpine
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - DB_PORT=5432
      - LOG_LEVEL=info
      - CACHE_TTL=3600`}</code></pre>

      <h3 style={h3Style}>{t.envMapTitle}</h3>
      <p style={pStyle}>{t.envMapDesc}</p>
      <pre style={codeStyle}><code>{`# Map syntax — cleaner for large configs
services:
  api:
    image: node:20-alpine
    environment:
      NODE_ENV: production
      DB_HOST: postgres
      DB_PORT: "5432"            # Quotes needed for numeric strings
      LOG_LEVEL: info
      CACHE_TTL: "3600"

  # YAML anchors work with map syntax
  x-common-env: &common-env
    NODE_ENV: production
    LOG_LEVEL: info
    TZ: UTC

  worker:
    image: node:20-alpine
    environment:
      <<: *common-env            # Merge common variables
      QUEUE_NAME: tasks
      CONCURRENCY: "4"`}</code></pre>

      <h3 style={h3Style}>{t.envOverrideTitle}</h3>
      <p style={pStyle}>{t.envOverrideDesc}</p>
      <pre style={codeStyle}><code>{`# .env.shared (loaded via env_file)
DB_HOST=shared-database
DB_PORT=5432
DB_NAME=myapp
LOG_LEVEL=warn

# docker-compose.yml
services:
  api:
    image: node:20-alpine
    env_file:
      - .env.shared              # DB_HOST=shared-database, LOG_LEVEL=warn
    environment:
      DB_HOST: custom-db         # OVERRIDES env_file! DB_HOST=custom-db
      LOG_LEVEL: debug           # OVERRIDES env_file! LOG_LEVEL=debug
      # DB_PORT and DB_NAME keep their env_file values

# Final result inside container:
#   DB_HOST=custom-db        (from environment, overrode env_file)
#   DB_PORT=5432             (from env_file, not overridden)
#   DB_NAME=myapp            (from env_file, not overridden)
#   LOG_LEVEL=debug          (from environment, overrode env_file)`}</code></pre>

      <h3 style={h3Style}>{t.envPassthroughTitle}</h3>
      <p style={pStyle}>{t.envPassthroughDesc}</p>
      <pre style={codeStyle}><code>{`# On your host machine:
export API_KEY=sk-abc123
export AWS_REGION=us-east-1

# docker-compose.yml
services:
  api:
    image: node:20-alpine
    environment:
      - API_KEY               # Passes host $API_KEY into container
      - AWS_REGION            # Passes host $AWS_REGION into container
      - CI                    # Empty string if $CI is not set on host
      - DEBUG                 # Empty string if $DEBUG is not set on host`}</code></pre>

      {/* Section 3: env_file */}
      <h2 style={h2Style}>{t.envFileTitle}</h2>
      <p style={pStyle}>{t.envFileDesc}</p>

      <h3 style={h3Style}>{t.envFileFormatTitle}</h3>
      <pre style={codeStyle}><code>{`# .env.api — env_file format rules

# Lines starting with # are comments
# Blank lines are ignored

# Basic KEY=VALUE (no spaces around =)
DB_HOST=postgres
DB_PORT=5432

# Values with spaces — use quotes
APP_NAME="My API Service"
GREETING='Hello World'

# No variable substitution! This is LITERAL:
# BASE_URL=\${DOMAIN}        # WRONG — will be literal "\${DOMAIN}"
BASE_URL=https://api.example.com

# Multi-line values (double quotes only)
RSA_KEY="-----BEGIN RSA KEY-----
MIIEpAIBAAKCAQEA...
-----END RSA KEY-----"

# export prefix is stripped (compatible with shell source)
export SECRET_KEY=mysecretkey

# Empty values
EMPTY_VAR=
ALSO_EMPTY=''`}</code></pre>

      <h3 style={h3Style}>{t.envFileMultiTitle}</h3>
      <p style={pStyle}>{t.envFileMultiDesc}</p>
      <pre style={codeStyle}><code>{`# .env.defaults
DB_HOST=localhost
DB_PORT=5432
LOG_LEVEL=info

# .env.overrides
DB_HOST=production-db         # Overrides .env.defaults
LOG_LEVEL=error               # Overrides .env.defaults

# docker-compose.yml
services:
  api:
    image: node:20-alpine
    env_file:
      - .env.defaults           # Loaded first
      - .env.overrides          # Loaded second, overrides duplicates

# Final result:
#   DB_HOST=production-db     (from .env.overrides)
#   DB_PORT=5432              (from .env.defaults, not overridden)
#   LOG_LEVEL=error           (from .env.overrides)`}</code></pre>

      <h3 style={h3Style}>{t.envFilePathTitle}</h3>
      <p style={pStyle}>{t.envFilePathDesc}</p>
      <pre style={codeStyle}><code>{`# Project structure:
my-project/
  docker-compose.yml            # Compose file lives here
  .env.api                      # Same directory — OK
  config/
    .env.db                     # Subdirectory — relative to compose file
  ../shared/
    .env.common                 # Parent directory — also relative

# docker-compose.yml
services:
  api:
    env_file:
      - .env.api                # ./my-project/.env.api
      - config/.env.db          # ./my-project/config/.env.db
      - ../shared/.env.common   # ./shared/.env.common

# WRONG: Paths are NOT relative to where you run docker compose from!
# If you run "docker compose up" from a different directory,
# paths are still relative to the docker-compose.yml location.`}</code></pre>

      <h3 style={h3Style}>{t.envFileOptionalTitle}</h3>
      <p style={pStyle}>{t.envFileOptionalDesc}</p>
      <pre style={codeStyle}><code>{`# docker-compose.yml
services:
  api:
    image: node:20-alpine
    env_file:
      - .env.shared                       # Required — error if missing
      - path: .env.local
        required: false                   # Optional — no error if missing
      - path: .env.secrets
        required: false                   # Optional — useful for dev

# Use case: .env.local exists only on developer machines
# for personal overrides, never committed to git.`}</code></pre>

      {/* Section 4: .env (root level) */}
      <h2 style={h2Style}>{t.dotenvTitle}</h2>
      <p style={pStyle}>{t.dotenvDesc}</p>

      <h3 style={h3Style}>{t.dotenvPurposeTitle}</h3>
      <div style={alertStyle}>
        <ul style={{ ...ulStyle, marginBottom: 0 }}>
          <li style={{ marginBottom: 8 }}><strong>YES:</strong> {t.dotenvPurpose1}</li>
          <li style={{ marginBottom: 8 }}><strong>NO:</strong> {t.dotenvPurpose2}</li>
          <li><strong>TIP:</strong> {t.dotenvPurpose3}</li>
        </ul>
      </div>

      <h3 style={h3Style}>{t.dotenvExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# .env (root level, auto-loaded)
TAG=3.2.1
EXTERNAL_PORT=8080
REPLICAS=3
DB_PASSWORD=supersecret

# docker-compose.yml
services:
  api:
    image: myapp:\${TAG}                # WORKS: Interpolated to myapp:3.2.1
    ports:
      - "\${EXTERNAL_PORT}:3000"        # WORKS: Interpolated to 8080:3000
    deploy:
      replicas: \${REPLICAS}            # WORKS: Interpolated to 3
    environment:
      - DB_PASSWORD                     # DOES NOT WORK the way you think!
      # This passes the HOST $DB_PASSWORD, not the .env value.
      # If host has no $DB_PASSWORD, the container gets an empty string.

      # To pass .env values into the container, do one of these:
      - DB_PASSWORD=\${DB_PASSWORD}     # Option 1: Explicit interpolation
    # OR:
    # env_file:
    #   - .env                          # Option 2: Load entire .env file`}</code></pre>

      <h3 style={h3Style}>{t.dotenvOverrideTitle}</h3>
      <p style={pStyle}>{t.dotenvOverrideDesc}</p>
      <pre style={codeStyle}><code>{`# Default: reads .env from project directory
docker compose up

# Use a different file for Compose interpolation:
docker compose --env-file .env.staging up

# Multiple env files (Compose v2.24+):
docker compose --env-file .env --env-file .env.local up

# This affects ONLY $\{} interpolation in docker-compose.yml.
# It does NOT affect env_file directives or container variables.`}</code></pre>

      {/* Section 5: Comparison Table */}
      <h2 style={h2Style}>{t.comparisonTitle}</h2>
      <p style={pStyle}>{t.comparisonDesc}</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.colFeature}</th>
            <th style={thStyle}>{t.colEnvironment}</th>
            <th style={thStyle}>{t.colEnvFile}</th>
            <th style={thStyle}>{t.colDotenv}</th>
            <th style={thStyle}>{t.colArg}</th>
          </tr>
        </thead>
        <tbody>
          {[
            [t.rowPurpose, t.valEnvPurpose, t.valEnvFilePurpose, t.valDotenvPurpose, t.valArgPurpose],
            [t.rowScope, t.valEnvScope, t.valEnvFileScope, t.valDotenvScope, t.valArgScope],
            [t.rowInCompose, t.valYes, t.valNo, t.valNo, t.valYes],
            [t.rowGitignore, t.valNo, t.valYes, t.valYes, t.valNo],
            [t.rowSecrets, t.valNo, t.valPartial, t.valNo, t.valNo],
            [t.rowPrecedence, t.valHighest, t.valMedium, t.valLowest, t.valBuildOnly],
            [t.rowSubstitution, t.valInValues, t.valNotInFile, t.valNa, t.valNa],
          ].map(([feature, env, envFile, dotenv, arg], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
              <td style={tdStyle}>{env}</td>
              <td style={tdStyle}>{envFile}</td>
              <td style={tdStyle}>{dotenv}</td>
              <td style={tdStyle}>{arg}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section 6: Variable Substitution */}
      <h2 style={h2Style}>{t.varSubTitle}</h2>
      <p style={pStyle}>{t.varSubDesc}</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.varSubSyntax}</th>
            <th style={thStyle}>{t.varSubResult}</th>
            <th style={thStyle}>{t.varSubExample}</th>
          </tr>
        </thead>
        <tbody>
          {[
            [t.varSub1Syntax, t.varSub1Result, t.varSub1Example],
            [t.varSub2Syntax, t.varSub2Result, t.varSub2Example],
            [t.varSub3Syntax, t.varSub3Result, t.varSub3Example],
            [t.varSub4Syntax, t.varSub4Result, t.varSub4Example],
            [t.varSub5Syntax, t.varSub5Result, t.varSub5Example],
            [t.varSub6Syntax, t.varSub6Result, t.varSub6Example],
          ].map(([syntax, result, example], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600, fontSize: 13 }}>{syntax}</td>
              <td style={tdStyle}>{result}</td>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 13 }}>{example}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={h3Style}>{t.varSubPracticalTitle}</h3>
      <pre style={codeStyle}><code>{`# .env
TAG=3.2.1
# DB_HOST is intentionally NOT set

# docker-compose.yml
services:
  api:
    image: myapp:\${TAG:-latest}                         # -> myapp:3.2.1
    environment:
      DB_HOST: \${DB_HOST:?Error: DB_HOST is required}   # -> exits with error!
      DB_PORT: \${DB_PORT:-5432}                          # -> 5432 (default)
      LOG_LEVEL: \${LOG_LEVEL:-info}                      # -> info (default)
      DEBUG: \${DEBUG:+true}                              # -> empty (DEBUG not set)
      REPLICAS: \${REPLICAS:-1}                           # -> 1 (default)

  db:
    image: postgres:\${PG_VERSION:-16}                    # -> postgres:16 (default)
    environment:
      POSTGRES_DB: \${DB_NAME:-myapp}                     # -> myapp (default)
      POSTGRES_PASSWORD: \${DB_PASSWORD:?Set DB_PASSWORD}  # -> exits with error!`}</code></pre>

      {/* Section 7: Priority Order */}
      <h2 style={h2Style}>{t.priorityTitle}</h2>
      <p style={pStyle}>{t.priorityDesc}</p>

      <p style={{ ...pStyle, fontWeight: 600 }}>{t.priorityOrder}</p>
      <ol style={{ ...ulStyle, paddingLeft: 28 }}>
        <li style={{ marginBottom: 6 }}><strong>1.</strong> {t.priority1}</li>
        <li style={{ marginBottom: 6 }}><strong>2.</strong> {t.priority2}</li>
        <li style={{ marginBottom: 6 }}><strong>3.</strong> {t.priority3}</li>
        <li style={{ marginBottom: 6 }}><strong>4.</strong> {t.priority4}</li>
        <li style={{ marginBottom: 6 }}><strong>5.</strong> {t.priority5}</li>
        <li><strong>6.</strong> {t.priority6}</li>
      </ol>

      <h3 style={h3Style}>{t.priorityDemoTitle}</h3>
      <pre style={codeStyle}><code>{`# Dockerfile
ENV DB_HOST=dockerfile-db          # Priority 6 (lowest)

# .env (root)
DB_HOST=dotenv-db                  # Priority 5 (Compose interpolation only)

# .env.file (loaded via env_file)
DB_HOST=envfile-db                 # Priority 4

# docker-compose.yml
services:
  api:
    build: .
    env_file:
      - .env.file                  # DB_HOST=envfile-db
    environment:
      DB_HOST: compose-db          # Priority 3 — WINS over env_file

# On host shell:
export DB_HOST=shell-db            # Priority 2 — WINS over environment

# CLI override:
docker compose run -e DB_HOST=cli-db api   # Priority 1 — WINS over everything

# Result with all defined:
#   docker compose run -e  ->  DB_HOST=cli-db
#   Without CLI override   ->  DB_HOST=shell-db
#   Without shell export   ->  DB_HOST=compose-db
#   Without environment:   ->  DB_HOST=envfile-db
#   Without env_file:      ->  DB_HOST=dockerfile-db`}</code></pre>

      {/* Section 8: Real-World Setup */}
      <h2 style={h2Style}>{t.realWorldTitle}</h2>
      <p style={pStyle}>{t.realWorldDesc}</p>

      <h3 style={h3Style}>{t.realWorldStructureTitle}</h3>
      <pre style={codeStyle}><code>{`my-project/
  docker-compose.yml              # Base config (shared across environments)
  docker-compose.override.yml     # Dev overrides (auto-loaded)
  docker-compose.staging.yml      # Staging overrides
  docker-compose.prod.yml         # Production overrides
  .env                            # Dev defaults (Compose interpolation)
  .env.staging                    # Staging defaults
  .env.prod                       # Production defaults
  .env.secrets                    # Secrets (gitignored)
  .env.secrets.example            # Template for secrets (committed)
  .gitignore                      # Ignores .env.secrets, .env.local, etc.`}</code></pre>

      <h3 style={h3Style}>{t.realWorldBaseTitle}</h3>
      <pre style={codeStyle}><code>{`# docker-compose.yml — shared base config
services:
  api:
    build:
      context: .
      args:
        NODE_VERSION: \${NODE_VERSION:-20}
    image: myapp:\${TAG:-latest}
    ports:
      - "\${API_PORT:-3000}:3000"
    env_file:
      - path: .env.secrets
        required: false
    environment:
      NODE_ENV: \${NODE_ENV:-development}
      DB_HOST: \${DB_HOST:-postgres}
      DB_PORT: \${DB_PORT:-5432}
      DB_NAME: \${DB_NAME:-myapp}
      REDIS_URL: redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started

  postgres:
    image: postgres:\${PG_VERSION:-16}
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: \${DB_NAME:-myapp}
      POSTGRES_USER: \${DB_USER:-myapp}
    env_file:
      - path: .env.secrets
        required: false
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${DB_USER:-myapp}"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:`}</code></pre>

      <h3 style={h3Style}>{t.realWorldDevTitle}</h3>
      <p style={pStyle}>{t.realWorldDevDesc}</p>
      <pre style={codeStyle}><code>{`# docker-compose.override.yml — auto-loaded in dev
services:
  api:
    build:
      target: development
    volumes:
      - .:/app                          # Hot reload
      - /app/node_modules
    environment:
      NODE_ENV: development
      LOG_LEVEL: debug
      DEBUG: "true"
    ports:
      - "9229:9229"                     # Node.js debugger

  postgres:
    ports:
      - "5432:5432"                     # Expose DB for local tools
    environment:
      POSTGRES_PASSWORD: devpassword    # OK for dev only!

# .env (dev defaults)
TAG=latest
API_PORT=3000
NODE_ENV=development
DB_HOST=postgres
DB_NAME=myapp_dev`}</code></pre>

      <h3 style={h3Style}>{t.realWorldStagingTitle}</h3>
      <pre style={codeStyle}><code>{`# docker-compose.staging.yml
services:
  api:
    build:
      target: production
    environment:
      NODE_ENV: staging
      LOG_LEVEL: info
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 512M
          cpus: "0.5"

  postgres:
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    secrets:
      - db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt

# .env.staging
TAG=3.2.1-rc.1
API_PORT=3000
NODE_ENV=staging
DB_NAME=myapp_staging`}</code></pre>

      <h3 style={h3Style}>{t.realWorldProdTitle}</h3>
      <pre style={codeStyle}><code>{`# docker-compose.prod.yml
services:
  api:
    build:
      target: production
    restart: unless-stopped
    environment:
      NODE_ENV: production
      LOG_LEVEL: warn
    deploy:
      replicas: 4
      resources:
        limits:
          memory: 1G
          cpus: "1.0"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    restart: unless-stopped
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    secrets:
      - db_password
    deploy:
      resources:
        limits:
          memory: 2G

  redis:
    restart: unless-stopped
    command: redis-server --requirepass \${REDIS_PASSWORD}

secrets:
  db_password:
    file: ./secrets/db_password.txt

# .env.prod
TAG=3.2.1
API_PORT=3000
NODE_ENV=production
DB_NAME=myapp_prod`}</code></pre>

      <h3 style={h3Style}>{t.realWorldCommandsTitle}</h3>
      <pre style={codeStyle}><code>{`# Development (auto-loads docker-compose.override.yml)
docker compose up

# Staging
docker compose -f docker-compose.yml -f docker-compose.staging.yml \\
  --env-file .env.staging up -d

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml \\
  --env-file .env.prod up -d

# Verify resolved config before deploying:
docker compose -f docker-compose.yml -f docker-compose.prod.yml \\
  --env-file .env.prod config`}</code></pre>

      {/* Section 9: Security Best Practices */}
      <h2 style={h2Style}>{t.securityTitle}</h2>
      <p style={pStyle}>{t.securityDesc}</p>

      <h3 style={h3Style}>{t.secGitignoreTitle}</h3>
      <pre style={codeStyle}><code>{`# .gitignore
.env.secrets
.env.local
.env.*.local
secrets/
*.pem
*.key`}</code></pre>

      <h3 style={h3Style}>{t.secTemplateTitle}</h3>
      <pre style={codeStyle}><code>{`# .env.secrets.example (committed to git)
# Copy this file to .env.secrets and fill in real values
DB_PASSWORD=
API_KEY=
JWT_SECRET=
SMTP_PASSWORD=
AWS_SECRET_ACCESS_KEY=

# .env.secrets (gitignored — never committed)
DB_PASSWORD=RealSuperSecretP@ssw0rd
API_KEY=sk-prod-abc123xyz789
JWT_SECRET=your-256-bit-secret-here
SMTP_PASSWORD=sendgrid-api-key
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCY`}</code></pre>

      <h3 style={h3Style}>{t.secSecretsTitle}</h3>
      <p style={pStyle}>{t.secSecretsDesc}</p>
      <pre style={codeStyle}><code>{`# docker-compose.yml with Docker secrets
services:
  api:
    image: myapp:latest
    secrets:
      - db_password
      - api_key
    environment:
      # App reads secrets from files instead of env vars
      DB_PASSWORD_FILE: /run/secrets/db_password
      API_KEY_FILE: /run/secrets/api_key

  postgres:
    image: postgres:16
    secrets:
      - db_password
    environment:
      # PostgreSQL natively supports _FILE suffix
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt
  api_key:
    file: ./secrets/api_key.txt`}</code></pre>

      <h3 style={h3Style}>{t.secInspectTitle}</h3>
      <p style={pStyle}>{t.secInspectDesc}</p>
      <pre style={codeStyle}><code>{`# Anyone with Docker access can see ALL environment variables:
docker inspect myapp-api-1 --format '{{range .Config.Env}}{{println .}}{{end}}'

# Output includes secrets if passed via environment:
# DB_PASSWORD=RealSuperSecretP@ssw0rd    <-- EXPOSED!
# API_KEY=sk-prod-abc123xyz789           <-- EXPOSED!

# Docker secrets are NOT visible via inspect.
# They only exist as files inside the container at /run/secrets/`}</code></pre>

      <h3 style={h3Style}>{t.secRotateTitle}</h3>
      <p style={pStyle}>{t.secRotateDesc}</p>
      <pre style={codeStyle}><code>{`# Generate unique secrets per environment:
# Dev
openssl rand -base64 32 > secrets/dev/db_password.txt
openssl rand -hex 32 > secrets/dev/jwt_secret.txt

# Staging
openssl rand -base64 32 > secrets/staging/db_password.txt
openssl rand -hex 32 > secrets/staging/jwt_secret.txt

# Production
openssl rand -base64 32 > secrets/prod/db_password.txt
openssl rand -hex 32 > secrets/prod/jwt_secret.txt`}</code></pre>

      {/* Section 10: Debugging */}
      <h2 style={h2Style}>{t.debugTitle}</h2>
      <p style={pStyle}>{t.debugDesc}</p>

      <h3 style={h3Style}>{t.debugStep1Title}</h3>
      <p style={pStyle}>{t.debugStep1Desc}</p>
      <pre style={codeStyle}><code>{`# See the fully resolved docker-compose.yml:
docker compose config

# With a specific env file:
docker compose --env-file .env.prod config

# Show only specific service:
docker compose config --services
docker compose config api

# Output shows all variables with their final values,
# so you can verify interpolation worked correctly.`}</code></pre>

      <h3 style={h3Style}>{t.debugStep2Title}</h3>
      <p style={pStyle}>{t.debugStep2Desc}</p>
      <pre style={codeStyle}><code>{`# List all env vars in a running container:
docker compose exec api env

# Search for a specific variable:
docker compose exec api env | grep DB_HOST

# Or using printenv:
docker compose exec api printenv DB_HOST`}</code></pre>

      <h3 style={h3Style}>{t.debugStep3Title}</h3>
      <p style={pStyle}>{t.debugStep3Desc}</p>
      <pre style={codeStyle}><code>{`# Inspect a stopped/exited container:
docker inspect myapp-api-1 --format '{{range .Config.Env}}{{println .}}{{end}}'

# Or as JSON:
docker inspect myapp-api-1 --format '{{json .Config.Env}}' | jq .`}</code></pre>

      <h3 style={h3Style}>{t.debugStep4Title}</h3>
      <p style={pStyle}>{t.debugStep4Desc}</p>
      <pre style={codeStyle}><code>{`# Check that .env exists in the right directory:
ls -la .env

# Check Compose project directory:
docker compose ls

# Explicitly specify the env file:
docker compose --env-file ./my-custom.env config`}</code></pre>

      <h3 style={h3Style}>{t.debugStep5Title}</h3>
      <p style={pStyle}>{t.debugStep5Desc}</p>
      <pre style={codeStyle}><code>{`# Check host shell for conflicting variables:
echo $DB_HOST
echo $NODE_ENV
printenv | grep -i db_

# Unset a conflicting variable:
unset DB_HOST

# Then re-run:
docker compose config`}</code></pre>

      <h3 style={h3Style}>{t.debugCheatsheetTitle}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Command</th>
            <th style={thStyle}>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['docker compose config', 'Show resolved Compose file with all variables'],
            ['docker compose config --format json', 'Resolved config as JSON (pipe to jq)'],
            ['docker compose exec <svc> env', 'List env vars inside running container'],
            ['docker compose exec <svc> printenv VAR', 'Get specific variable value'],
            ['docker inspect <container> --format \'{{.Config.Env}}\'', 'Env vars of any container (running or stopped)'],
            ['docker compose --env-file FILE config', 'Test with a specific .env file'],
            ['docker compose logs <svc> 2>&1 | head', 'Check for startup errors related to missing vars'],
          ].map(([cmd, purpose], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>{cmd}</td>
              <td style={tdStyle}>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section 11: FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>

      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <h3 style={{ ...h3Style, marginTop: i === 0 ? 16 : 28 }}>{q}</h3>
          <p style={pStyle}>{a}</p>
        </div>
      ))}
    </div>
  );
}
