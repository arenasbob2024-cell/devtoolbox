'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLang } from '@/i18n/LangContext';
import { getLocalizedPost, blogPosts } from '@/data/blog-posts';
import { tools } from '@/lib/tools';
import { i18n, type Locale } from '@/i18n/config';
import AdSlot from '@/components/AdSlot';
import NewsletterSignup from '@/components/NewsletterSignup';
import ShareBar from '@/components/ugc/ShareBar';
import HelpfulButton from '@/components/ugc/HelpfulButton';

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
import GitignoreTemplates from '@/data/posts/gitignore-templates-common-patterns';
import CssGridCheatSheet from '@/data/posts/css-grid-layout-cheat-sheet';
import JsDateFormatGuide from '@/data/posts/javascript-date-format-complete-guide';
import SshKeygenGuide from '@/data/posts/ssh-keygen-ed25519-rsa-guide';
import JsArrayMethods from '@/data/posts/javascript-array-methods-cheat-sheet';
import RobotsTxtGuide from '@/data/posts/robots-txt-syntax-examples';
import AsciiUnicodeUtf8 from '@/data/posts/ascii-unicode-utf8-encoding-explained';
import CssMediaQueries from '@/data/posts/css-media-queries-breakpoints-2025';
import GitBranchNaming from '@/data/posts/git-branch-naming-convention';
import DnsRecordTypes from '@/data/posts/dns-record-types-a-cname-mx-txt';
import DockerfilePractices from '@/data/posts/dockerfile-best-practices-multi-stage';
import CssAnimationKeyframes from '@/data/posts/css-animation-keyframes-examples';
import ApiAuthOauthJwt from '@/data/posts/api-authentication-oauth-jwt-apikey';
import JqCommandTutorial from '@/data/posts/jq-command-tutorial-examples';
import CssVariablesGuide from '@/data/posts/css-variables-custom-properties-guide';
import ProtobufVsJson from '@/data/posts/protobuf-vs-json-grpc-rest';
import PrismaSchemaGuide from '@/data/posts/prisma-schema-relations-guide';
import NginxLocationGuide from '@/data/posts/nginx-location-block-regex-guide';
import JsMapFilterReduce from '@/data/posts/javascript-map-filter-reduce-examples';
import HtmlInputTypes from '@/data/posts/html-input-types-attributes-guide';
import CssSpecificity from '@/data/posts/css-specificity-calculator-rules';
import GitCherryPickGuide from '@/data/posts/git-cherry-pick-revert-reset-guide';
import DockerVolumesGuide from '@/data/posts/docker-volumes-bind-mounts-guide';
import HttpHeadersList from '@/data/posts/http-request-response-headers-list';
import ViteVsWebpack from '@/data/posts/vite-vs-webpack-esbuild-comparison';
import CssPositionGuide from '@/data/posts/css-position-sticky-fixed-absolute';
import LinuxChmodChown from '@/data/posts/linux-chmod-chown-permissions-guide';
import TomlSyntaxGuide from '@/data/posts/toml-syntax-config-guide';
import YamlAnchorsAliases from '@/data/posts/yaml-anchors-aliases-merge-keys';
import PythonPipVenv from '@/data/posts/python-pip-requirements-virtualenv';
import HexToRgbGuide from '@/data/posts/hex-to-rgb-converter-guide';
import Base64EncodeDecodeGuide from '@/data/posts/base64-encode-decode-guide';
import JsonFormatterGuide from '@/data/posts/json-formatter-validator-guide';
import UrlEncodeDecodeGuide from '@/data/posts/url-encode-decode-complete-guide';
import DiffCheckerTextCompareGuide from '@/data/posts/diff-checker-text-compare-guide';
import HashGeneratorMd5Sha256Guide from '@/data/posts/hash-generator-md5-sha256-guide';
import CsvToJsonConverterGuide from '@/data/posts/csv-to-json-converter-guide';
import YamlToJsonConverterGuide from '@/data/posts/yaml-to-json-converter-guide';
import MarkdownToHtmlConverterGuide from '@/data/posts/markdown-to-html-converter-guide';
import ColorConverterRgbHexHslGuide from '@/data/posts/color-converter-rgb-hex-hsl-guide';
import JsonToJavaClassConverterGuide from '@/data/posts/json-to-java-class-converter-guide';
import SvgToJsxReactGuide from '@/data/posts/svg-to-jsx-react-guide';
import GraphqlToTypescriptCodegenGuide from '@/data/posts/graphql-to-typescript-codegen-guide';
import XmlToJsonConverterGuide from '@/data/posts/xml-to-json-converter-guide';
import CronExpressionGeneratorParserGuide from '@/data/posts/cron-expression-generator-parser-guide';
import JsonToKotlinDataClassGuide from '@/data/posts/json-to-kotlin-data-class-guide';
import JsonToPythonDataclassGuide from '@/data/posts/json-to-python-dataclass-guide';
import JsonToCsharpClassGuide from '@/data/posts/json-to-csharp-class-guide';
import ChmodCalculatorLinuxPermissionsGuide from '@/data/posts/chmod-calculator-linux-permissions-guide';
import UrlEncodingPercentEncodingGuide from '@/data/posts/url-encoding-percent-encoding-guide';
import CrontabCheatSheetCronExamplesGuide from '@/data/posts/crontab-cheat-sheet-cron-examples-guide';
import HowToOpenJsonFile from '@/data/posts/how-to-open-json-file';
import JsonToCsvConversionGuide from '@/data/posts/json-to-csv-conversion-guide';
import JsonSchemaCompleteGuide from '@/data/posts/json-schema-complete-guide';
import TypescriptToJavascriptGuide from '@/data/posts/typescript-to-javascript-guide';
import CurlToCodeGuide from '@/data/posts/curl-to-code-guide';
import SvgToReactComponentGuide from '@/data/posts/svg-to-react-component-guide';
import JsonToGolangStructConversionGuide from '@/data/posts/json-to-golang-struct-conversion-guide';
import Base64EncodingGuide from '@/data/posts/base64-encoding-guide';
import JwtTokenGuide from '@/data/posts/jwt-token-guide';
import YamlVsJsonGuide from '@/data/posts/yaml-vs-json-guide';
import CurlCommandGuide from '@/data/posts/curl-command-guide';
import RegexCheatSheet2026 from '@/data/posts/regex-cheat-sheet-2026';
import CssFlexboxCompleteGuide from '@/data/posts/css-flexbox-complete-guide';
import DockerComposeTutorial from '@/data/posts/docker-compose-tutorial';
import HttpStatusCodesGuide from '@/data/posts/http-status-codes-guide';
import TypescriptGenericsGuide from '@/data/posts/typescript-generics-guide';
import JavascriptArrayMethods from '@/data/posts/javascript-array-methods';
import CssGridLayoutGuide from '@/data/posts/css-grid-layout-guide';
import ApiRateLimitingGuide from '@/data/posts/api-rate-limiting-guide';
import SqlJoinsExplained from '@/data/posts/sql-joins-explained';
import ReactHooksGuide from '@/data/posts/react-hooks-guide';
import PythonVsJavascript from '@/data/posts/python-vs-javascript';
import GraphqlVsRestApi from '@/data/posts/graphql-vs-rest-api';
import WebPerformanceOptimization from '@/data/posts/web-performance-optimization';
import TypescriptUtilityTypes from '@/data/posts/typescript-utility-types';
import NextjsAppRouterGuide from '@/data/posts/nextjs-app-router-guide';
import LinuxCommandCheatSheet from '@/data/posts/linux-command-cheat-sheet';
import WebSocketTutorial from '@/data/posts/websocket-tutorial';
import MongodbVsPostgresql from '@/data/posts/mongodb-vs-postgresql';
import JwtAuthenticationGuide from '@/data/posts/jwt-authentication-guide';
import NextjsVsRemix from '@/data/posts/nextjs-vs-remix';
import GitBranchingStrategies from '@/data/posts/git-branching-strategies';
import LinuxCommandsCheatSheet from '@/data/posts/linux-commands-cheat-sheet';
import VscodeShortcutsGuide from '@/data/posts/vscode-shortcuts-guide';
import CssAnimationsGuide from '@/data/posts/css-animations-guide';
import KuberneticsBasics from '@/data/posts/kubernetes-basics';
import KubernetesBeginnerGuide from '@/data/posts/kubernetes-beginners-guide';
import MicroservicesVsMonolith from '@/data/posts/microservices-vs-monolith';
import Oauth2AuthenticationGuide from '@/data/posts/oauth2-authentication-guide';
import CssHasSelectorGuide from '@/data/posts/css-has-selector-guide';
import RedisCachingPatterns from '@/data/posts/redis-caching-patterns';
import GithubActionsAdvanced from '@/data/posts/github-actions-advanced';
import TypescriptVsJavascript from '@/data/posts/typescript-vs-javascript';
import KubernetesBasicsGuide from '@/data/posts/kubernetes-basics-guide';
import GithubActionsCiCd from '@/data/posts/github-actions-ci-cd';
import RedisCachingGuide from '@/data/posts/redis-caching-guide';
import AwsLambdaServerless from '@/data/posts/aws-lambda-serverless';
import ReactPerformanceTips from '@/data/posts/react-performance-tips';
import NginxConfigurationGuide from '@/data/posts/nginx-configuration-guide';
import ReactVsVue2026 from '@/data/posts/react-vs-vue-2026';
import GithubActionsTutorial from '@/data/posts/github-actions-tutorial';
import DnsExplained from '@/data/posts/dns-explained';
import SvgOptimizationGuide from '@/data/posts/svg-optimization-guide';
import DockerVsKubernetes from '@/data/posts/docker-vs-kubernetes';
import GraphqlApolloTutorial from '@/data/posts/graphql-apollo-tutorial';
import TailwindVsCssModules from '@/data/posts/tailwind-vs-css-modules';
import GitWorkflowStrategies from '@/data/posts/git-workflow-strategies';
import PrismaVsDrizzleVsTypeorm from '@/data/posts/prisma-vs-drizzle-vs-typeorm';
import TailwindCssVsBootstrap from '@/data/posts/tailwind-css-vs-bootstrap';
import GraphqlTutorialBeginners from '@/data/posts/graphql-tutorial-beginners';
import DockerBestPractices from '@/data/posts/docker-best-practices';
import TypescriptDecoratorsGuide from '@/data/posts/typescript-decorators-guide';
import RestApiDesignGuide from '@/data/posts/rest-api-design-guide';
import ResponsiveDesignGuide from '@/data/posts/responsive-design-guide';
import PythonDecoratorsGuide from '@/data/posts/python-decorators-guide';
import JavascriptPromisesGuide from '@/data/posts/javascript-promises-guide';
import WebpackVsVite2026 from '@/data/posts/webpack-vs-vite-2026';
import GitRebaseVsMergeGuide from '@/data/posts/git-rebase-vs-merge';
import DockerNetworkingGuide from '@/data/posts/docker-networking-guide';
import NginxVsApache2026 from '@/data/posts/nginx-vs-apache-2026';
import ReactServerComponentsGuide from '@/data/posts/react-server-components-guide';
import SqlVsNosqlGuide from '@/data/posts/sql-vs-nosql-guide';
import CssContainerQueriesGuide from '@/data/posts/css-container-queries-guide';
import NextjsMiddlewareGuide from '@/data/posts/nextjs-middleware-guide';
import PythonFastapiTutorial from '@/data/posts/python-fastapi-tutorial';
import TypescriptTypeGuards from '@/data/posts/typescript-type-guards';
import NextjsVsNuxt2026 from '@/data/posts/nextjs-vs-nuxt-2026';
import TypescriptBestPractices2026 from '@/data/posts/typescript-best-practices-2026';
import DockerSecurityBestPractices from '@/data/posts/docker-security-best-practices';
import GraphqlSubscriptionsRealtime from '@/data/posts/graphql-subscriptions-realtime';
import TailwindV4NewFeatures from '@/data/posts/tailwind-v4-new-features';
import PostgresqlPerformanceTuning from '@/data/posts/postgresql-performance-tuning';
import WebAccessibilityWcagGuide from '@/data/posts/web-accessibility-wcag-guide';
import CiCdPipelineBestPractices from '@/data/posts/ci-cd-pipeline-best-practices';
import NodejsStreamsGuide from '@/data/posts/nodejs-streams-guide';
import ApiDesignBestPractices from '@/data/posts/api-design-best-practices';
import CssFlexboxGuide from '@/data/posts/css-flexbox-guide';
import ReactHooksCompleteGuide from '@/data/posts/react-hooks-complete-guide';
import RedisCachingStrategies from '@/data/posts/redis-caching-strategies';
import CssGridCompleteGuide from '@/data/posts/css-grid-complete-guide';
import ReactStateManagement2026 from '@/data/posts/react-state-management-2026';
import WebAccessibilityChecklist from '@/data/posts/web-accessibility-checklist';
import AwsLambdaBestPractices from '@/data/posts/aws-lambda-best-practices';
import MonorepoGuide2026 from '@/data/posts/monorepo-guide-2026';
import TailwindCssTips2026 from '@/data/posts/tailwind-css-tips-2026';
import GithubActionsGuide from '@/data/posts/github-actions-guide';
import DockerComposeProduction from '@/data/posts/docker-compose-production';
import NextjsSeoGuide from '@/data/posts/nextjs-seo-guide';
import GraphqlVsRestComparison from '@/data/posts/graphql-vs-rest-comparison';
import LinuxServerHardening from '@/data/posts/linux-server-hardening';
import MicroservicesPatterns from '@/data/posts/microservices-patterns';
import VueCompositionApiGuide from '@/data/posts/vue-composition-api-guide';
import RedisVsMemcached2026 from '@/data/posts/redis-vs-memcached-2026';
import TerraformInfrastructureAsCode from '@/data/posts/terraform-infrastructure-as-code';
import WebWorkersGuide from '@/data/posts/web-workers-guide';
import CssNestingNative2026 from '@/data/posts/css-nesting-native-2026';
import BunVsNodeDeno2026 from '@/data/posts/bun-vs-node-deno-2026';
import PnpmWorkspaceMonorepo from '@/data/posts/pnpm-workspace-monorepo';
import NextjsCachingStrategies from '@/data/posts/nextjs-caching-strategies';
import Oauth2OpenidConnectGuide from '@/data/posts/oauth2-openid-connect-guide';
import PlaywrightTestingGuide from '@/data/posts/playwright-testing-guide';
import RustVsGo2026 from '@/data/posts/rust-vs-go-2026';
import Deno2Guide from '@/data/posts/deno-2-guide';
import HtmxGuide2026 from '@/data/posts/htmx-guide-2026';
import TailwindV4Migration from '@/data/posts/tailwind-v4-migration';
import SqliteForProduction from '@/data/posts/sqlite-for-production';
import AstroVsNextjs2026 from '@/data/posts/astro-vs-nextjs-2026';
import TypeScript5Features from '@/data/posts/typescript-5-features';
import CloudflareWorkersGuide from '@/data/posts/cloudflare-workers-guide';
import ZodValidationGuide from '@/data/posts/zod-validation-guide';
import GithubCopilotTips from '@/data/posts/github-copilot-tips';
import VueVsReact2026 from '@/data/posts/vue-vs-react-2026';
import PythonTypeHintsGuide from '@/data/posts/python-type-hints-guide';
import GithubActionsSecretsGuide from '@/data/posts/github-actions-secrets-guide';
import NginxReverseProxyConfig from '@/data/posts/nginx-reverse-proxy-config';
import PostgresqlJsonbGuide from '@/data/posts/postgresql-jsonb-guide';
import ApiVersioningStrategies from '@/data/posts/api-versioning-strategies';
import CssLogicalPropertiesGuide from '@/data/posts/css-logical-properties-guide';
import DockerMultiStageBuilds from '@/data/posts/docker-multi-stage-builds';
import JavascriptClosuresGuide from '@/data/posts/javascript-closures-guide';
import RedisDataStructuresGuide from '@/data/posts/redis-data-structures-guide';
import BunPackageManager from '@/data/posts/bun-package-manager';
import MonorepoTools2026 from '@/data/posts/monorepo-tools-2026';
import TailwindComponentPatterns from '@/data/posts/tailwind-component-patterns';
import WebAssemblyGuide from '@/data/posts/web-assembly-guide';
import CssGridMastery from '@/data/posts/css-grid-mastery';
import ReactQueryPatterns from '@/data/posts/react-query-patterns';
import JavascriptGeneratorsGuide from '@/data/posts/javascript-generators-guide';
import VitePluginDevelopment from '@/data/posts/vite-plugin-development';
import SqlQueryOptimization from '@/data/posts/sql-query-optimization';
import LinuxCommandLineTools from '@/data/posts/linux-command-line-tools';
import HttpHeadersGuide from '@/data/posts/http-headers-guide';
import PostgresqlVsMysql from '@/data/posts/postgresql-vs-mysql';
import PythonVirtualEnvironments from '@/data/posts/python-virtual-environments';
import JavascriptErrorHandling from '@/data/posts/javascript-error-handling';
import NodejsPerformanceTips from '@/data/posts/nodejs-performance-tips';
import AwsS3Guide from '@/data/posts/aws-s3-guide';
import WebpackConfigGuide from '@/data/posts/webpack-config-guide';
import CssCustomPropertiesAdvanced from '@/data/posts/css-custom-properties-advanced';
import GithubActionsDocker from '@/data/posts/github-actions-docker';
import JsonWebTokensSecurity from '@/data/posts/json-web-tokens-security';
import JsonToZodSchemaGuide from '@/data/posts/json-to-zod-schema-guide';
import JsonToJsonSchemaConverterGuide from '@/data/posts/json-to-json-schema-converter-guide';
import TypescriptToJavascriptConversionGuide from '@/data/posts/typescript-to-javascript-conversion-guide';
import Base64EncodeDecodeCompleteGuide from '@/data/posts/base64-encode-decode-complete-guide';
import JsonFormatterBeautifierGuide from '@/data/posts/json-formatter-beautifier-guide';
import RegexTesterOnlineGuide from '@/data/posts/regex-tester-online-guide';
import JwtDecoderOnlineGuide from '@/data/posts/jwt-decoder-online-guide';
import UuidGeneratorGuide from '@/data/posts/uuid-generator-guide';
import HashGeneratorOnlineGuide from '@/data/posts/hash-generator-online-guide';
import CronExpressionGeneratorGuide from '@/data/posts/cron-expression-generator-guide';
import ColorConverterOnlineGuide from '@/data/posts/color-converter-online-guide';
import PasswordGeneratorOnlineGuide from '@/data/posts/password-generator-online-guide';
import DockerComposeGeneratorOnlineGuide from '@/data/posts/docker-compose-generator-online-guide';
import NginxConfigGeneratorOnlineGuide from '@/data/posts/nginx-config-generator-online-guide';
import QrCodeGeneratorOnlineGuide from '@/data/posts/qr-code-generator-online-guide';
import GitCommandGeneratorOnlineGuide from '@/data/posts/git-command-generator-online-guide';
import SqlFormatterOnlineGuide from '@/data/posts/sql-formatter-online-guide';
import CssFlexboxGeneratorOnlineGuide from '@/data/posts/css-flexbox-generator-online-guide';
import TimestampConverterOnlineGuide from '@/data/posts/timestamp-converter-online-guide';
import Base64OnlineGuide from '@/data/posts/base64-online-guide';
import TextDiffOnlineGuide from '@/data/posts/text-diff-online-guide';

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
  'gitignore-templates-common-patterns': GitignoreTemplates,
  'css-grid-layout-cheat-sheet': CssGridCheatSheet,
  'javascript-date-format-complete-guide': JsDateFormatGuide,
  'ssh-keygen-ed25519-rsa-guide': SshKeygenGuide,
  'javascript-array-methods-cheat-sheet': JsArrayMethods,
  'robots-txt-syntax-examples': RobotsTxtGuide,
  'ascii-unicode-utf8-encoding-explained': AsciiUnicodeUtf8,
  'css-media-queries-breakpoints-2025': CssMediaQueries,
  'git-branch-naming-convention': GitBranchNaming,
  'dns-record-types-a-cname-mx-txt': DnsRecordTypes,
  'dockerfile-best-practices-multi-stage': DockerfilePractices,
  'css-animation-keyframes-examples': CssAnimationKeyframes,
  'api-authentication-oauth-jwt-apikey': ApiAuthOauthJwt,
  'jq-command-tutorial-examples': JqCommandTutorial,
  'css-variables-custom-properties-guide': CssVariablesGuide,
  'protobuf-vs-json-grpc-rest': ProtobufVsJson,
  'prisma-schema-relations-guide': PrismaSchemaGuide,
  'nginx-location-block-regex-guide': NginxLocationGuide,
  'javascript-map-filter-reduce-examples': JsMapFilterReduce,
  'html-input-types-attributes-guide': HtmlInputTypes,
  'css-specificity-calculator-rules': CssSpecificity,
  'git-cherry-pick-revert-reset-guide': GitCherryPickGuide,
  'docker-volumes-bind-mounts-guide': DockerVolumesGuide,
  'http-request-response-headers-list': HttpHeadersList,
  'vite-vs-webpack-esbuild-comparison': ViteVsWebpack,
  'css-position-sticky-fixed-absolute': CssPositionGuide,
  'linux-chmod-chown-permissions-guide': LinuxChmodChown,
  'toml-syntax-config-guide': TomlSyntaxGuide,
  'yaml-anchors-aliases-merge-keys': YamlAnchorsAliases,
  'python-pip-requirements-virtualenv': PythonPipVenv,
  'hex-to-rgb-converter-color-guide': HexToRgbGuide,
  'base64-encode-decode-guide': Base64EncodeDecodeGuide,
  'json-formatter-validator-guide': JsonFormatterGuide,
  'url-encode-decode-complete-guide': UrlEncodeDecodeGuide,
  'diff-checker-text-compare-guide': DiffCheckerTextCompareGuide,
  'hash-generator-md5-sha256-guide': HashGeneratorMd5Sha256Guide,
  'csv-to-json-converter-guide': CsvToJsonConverterGuide,
  'yaml-to-json-converter-guide': YamlToJsonConverterGuide,
  'markdown-to-html-converter-guide': MarkdownToHtmlConverterGuide,
  'color-converter-rgb-hex-hsl-guide': ColorConverterRgbHexHslGuide,
  'json-to-java-class-converter-guide': JsonToJavaClassConverterGuide,
  'svg-to-jsx-react-guide': SvgToJsxReactGuide,
  'graphql-to-typescript-codegen-guide': GraphqlToTypescriptCodegenGuide,
  'xml-to-json-converter-guide': XmlToJsonConverterGuide,
  'cron-expression-generator-parser-guide': CronExpressionGeneratorParserGuide,
  'json-to-kotlin-data-class-guide': JsonToKotlinDataClassGuide,
  'json-to-python-dataclass-guide': JsonToPythonDataclassGuide,
  'json-to-csharp-class-guide': JsonToCsharpClassGuide,
  'chmod-calculator-linux-permissions-guide': ChmodCalculatorLinuxPermissionsGuide,
  'url-encoding-percent-encoding-guide': UrlEncodingPercentEncodingGuide,
  'crontab-cheat-sheet-cron-examples-guide': CrontabCheatSheetCronExamplesGuide,
  'how-to-open-json-file': HowToOpenJsonFile,
  'json-to-csv-conversion-guide': JsonToCsvConversionGuide,
  'json-schema-complete-guide': JsonSchemaCompleteGuide,
  'typescript-to-javascript-guide': TypescriptToJavascriptGuide,
  'curl-to-code-guide': CurlToCodeGuide,
  'svg-to-react-component-guide': SvgToReactComponentGuide,
  'json-to-golang-struct-conversion-guide': JsonToGolangStructConversionGuide,
  'base64-encoding-guide': Base64EncodingGuide,
  'jwt-token-guide': JwtTokenGuide,
  'yaml-vs-json-guide': YamlVsJsonGuide,
  'curl-command-guide': CurlCommandGuide,
  'regex-cheat-sheet-2026': RegexCheatSheet2026,
  'css-flexbox-complete-guide': CssFlexboxCompleteGuide,
  'docker-compose-tutorial': DockerComposeTutorial,
  'http-status-codes-guide': HttpStatusCodesGuide,
  'typescript-generics-guide': TypescriptGenericsGuide,
  'javascript-array-methods': JavascriptArrayMethods,
  'css-grid-layout-guide': CssGridLayoutGuide,
  'api-rate-limiting-guide': ApiRateLimitingGuide,
  'sql-joins-explained': SqlJoinsExplained,
  'react-hooks-guide': ReactHooksGuide,
  'python-vs-javascript': PythonVsJavascript,
  'graphql-vs-rest-api': GraphqlVsRestApi,
  'web-performance-optimization': WebPerformanceOptimization,
  'typescript-utility-types': TypescriptUtilityTypes,
  'nextjs-app-router-guide': NextjsAppRouterGuide,
  'linux-command-cheat-sheet': LinuxCommandCheatSheet,
  'websocket-tutorial': WebSocketTutorial,
  'mongodb-vs-postgresql': MongodbVsPostgresql,
  'jwt-authentication-guide': JwtAuthenticationGuide,
  'nextjs-vs-remix': NextjsVsRemix,
  'git-branching-strategies': GitBranchingStrategies,
  'linux-commands-cheat-sheet': LinuxCommandsCheatSheet,
  'vscode-shortcuts-guide': VscodeShortcutsGuide,
  'css-animations-guide': CssAnimationsGuide,
  'kubernetes-basics': KuberneticsBasics,
  'typescript-vs-javascript': TypescriptVsJavascript,
  'kubernetes-basics-guide': KubernetesBasicsGuide,
  'kubernetes-beginners-guide': KubernetesBeginnerGuide,
  'microservices-vs-monolith': MicroservicesVsMonolith,
  'oauth2-authentication-guide': Oauth2AuthenticationGuide,
  'css-has-selector-guide': CssHasSelectorGuide,
  'redis-caching-patterns': RedisCachingPatterns,
  'github-actions-advanced': GithubActionsAdvanced,
  'github-actions-ci-cd': GithubActionsCiCd,
  'redis-caching-guide': RedisCachingGuide,
  'aws-lambda-serverless': AwsLambdaServerless,
  'react-performance-tips': ReactPerformanceTips,
  'nginx-configuration-guide': NginxConfigurationGuide,
  'react-vs-vue-2026': ReactVsVue2026,
  'github-actions-tutorial': GithubActionsTutorial,
  'dns-explained': DnsExplained,
  'svg-optimization-guide': SvgOptimizationGuide,
  'docker-vs-kubernetes': DockerVsKubernetes,
  'graphql-apollo-tutorial': GraphqlApolloTutorial,
  'tailwind-vs-css-modules': TailwindVsCssModules,
  'git-workflow-strategies': GitWorkflowStrategies,
  'prisma-vs-drizzle-vs-typeorm': PrismaVsDrizzleVsTypeorm,
  'tailwind-css-vs-bootstrap': TailwindCssVsBootstrap,
  'graphql-tutorial-beginners': GraphqlTutorialBeginners,
  'docker-best-practices': DockerBestPractices,
  'typescript-decorators-guide': TypescriptDecoratorsGuide,
  'rest-api-design-guide': RestApiDesignGuide,
  'responsive-design-guide': ResponsiveDesignGuide,
  'python-decorators-guide': PythonDecoratorsGuide,
  'javascript-promises-guide': JavascriptPromisesGuide,
  'webpack-vs-vite-2026': WebpackVsVite2026,
  'git-rebase-vs-merge': GitRebaseVsMergeGuide,
  'docker-networking-guide': DockerNetworkingGuide,
  'nginx-vs-apache-2026': NginxVsApache2026,
  'react-server-components-guide': ReactServerComponentsGuide,
  'sql-vs-nosql-guide': SqlVsNosqlGuide,
  'css-container-queries-guide': CssContainerQueriesGuide,
  'nextjs-middleware-guide': NextjsMiddlewareGuide,
  'python-fastapi-tutorial': PythonFastapiTutorial,
  'typescript-type-guards': TypescriptTypeGuards,
  'nextjs-vs-nuxt-2026': NextjsVsNuxt2026,
  'typescript-best-practices-2026': TypescriptBestPractices2026,
  'docker-security-best-practices': DockerSecurityBestPractices,
  'graphql-subscriptions-realtime': GraphqlSubscriptionsRealtime,
  'tailwind-v4-new-features': TailwindV4NewFeatures,
  'postgresql-performance-tuning': PostgresqlPerformanceTuning,
  'web-accessibility-wcag-guide': WebAccessibilityWcagGuide,
  'ci-cd-pipeline-best-practices': CiCdPipelineBestPractices,
  'nodejs-streams-guide': NodejsStreamsGuide,
  'api-design-best-practices': ApiDesignBestPractices,
  'css-flexbox-guide': CssFlexboxGuide,
  'react-hooks-complete-guide': ReactHooksCompleteGuide,
  'redis-caching-strategies': RedisCachingStrategies,
  'css-grid-complete-guide': CssGridCompleteGuide,
  'react-state-management-2026': ReactStateManagement2026,
  'web-accessibility-checklist': WebAccessibilityChecklist,
  'aws-lambda-best-practices': AwsLambdaBestPractices,
  'monorepo-guide-2026': MonorepoGuide2026,
  'tailwind-css-tips-2026': TailwindCssTips2026,
  'github-actions-guide': GithubActionsGuide,
  'docker-compose-production': DockerComposeProduction,
  'nextjs-seo-guide': NextjsSeoGuide,
  'graphql-vs-rest-comparison': GraphqlVsRestComparison,
  'linux-server-hardening': LinuxServerHardening,
  'microservices-patterns': MicroservicesPatterns,
  'vue-composition-api-guide': VueCompositionApiGuide,
  'redis-vs-memcached-2026': RedisVsMemcached2026,
  'terraform-infrastructure-as-code': TerraformInfrastructureAsCode,
  'web-workers-guide': WebWorkersGuide,
  'css-nesting-native-2026': CssNestingNative2026,
  'bun-vs-node-deno-2026': BunVsNodeDeno2026,
  'pnpm-workspace-monorepo': PnpmWorkspaceMonorepo,
  'nextjs-caching-strategies': NextjsCachingStrategies,
  'oauth2-openid-connect-guide': Oauth2OpenidConnectGuide,
  'playwright-testing-guide': PlaywrightTestingGuide,
  'rust-vs-go-2026': RustVsGo2026,
  'deno-2-guide': Deno2Guide,
  'htmx-guide-2026': HtmxGuide2026,
  'tailwind-v4-migration': TailwindV4Migration,
  'sqlite-for-production': SqliteForProduction,
  'astro-vs-nextjs-2026': AstroVsNextjs2026,
  'typescript-5-features': TypeScript5Features,
  'cloudflare-workers-guide': CloudflareWorkersGuide,
  'zod-validation-guide': ZodValidationGuide,
  'github-copilot-tips': GithubCopilotTips,
  'vue-vs-react-2026': VueVsReact2026,
  'python-type-hints-guide': PythonTypeHintsGuide,
  'github-actions-secrets-guide': GithubActionsSecretsGuide,
  'nginx-reverse-proxy-config': NginxReverseProxyConfig,
  'postgresql-jsonb-guide': PostgresqlJsonbGuide,
  'api-versioning-strategies': ApiVersioningStrategies,
  'css-logical-properties-guide': CssLogicalPropertiesGuide,
  'docker-multi-stage-builds': DockerMultiStageBuilds,
  'javascript-closures-guide': JavascriptClosuresGuide,
  'redis-data-structures-guide': RedisDataStructuresGuide,
  'bun-package-manager': BunPackageManager,
  'monorepo-tools-2026': MonorepoTools2026,
  'tailwind-component-patterns': TailwindComponentPatterns,
  'web-assembly-guide': WebAssemblyGuide,
  'css-grid-mastery': CssGridMastery,
  'react-query-patterns': ReactQueryPatterns,
  'javascript-generators-guide': JavascriptGeneratorsGuide,
  'vite-plugin-development': VitePluginDevelopment,
  'sql-query-optimization': SqlQueryOptimization,
  'linux-command-line-tools': LinuxCommandLineTools,
  'http-headers-guide': HttpHeadersGuide,
  'postgresql-vs-mysql': PostgresqlVsMysql,
  'python-virtual-environments': PythonVirtualEnvironments,
  'javascript-error-handling': JavascriptErrorHandling,
  'nodejs-performance-tips': NodejsPerformanceTips,
  'aws-s3-guide': AwsS3Guide,
  'webpack-config-guide': WebpackConfigGuide,
  'css-custom-properties-advanced': CssCustomPropertiesAdvanced,
  'github-actions-docker': GithubActionsDocker,
  'json-web-tokens-security': JsonWebTokensSecurity,
  'json-to-zod-schema-guide': JsonToZodSchemaGuide,
  'json-to-json-schema-converter-guide': JsonToJsonSchemaConverterGuide,
  'typescript-to-javascript-conversion-guide': TypescriptToJavascriptConversionGuide,
  'base64-encode-decode-complete-guide': Base64EncodeDecodeCompleteGuide,
  'json-formatter-beautifier-guide': JsonFormatterBeautifierGuide,
  'regex-tester-online-guide': RegexTesterOnlineGuide,
  'jwt-decoder-online-guide': JwtDecoderOnlineGuide,
  'uuid-generator-guide': UuidGeneratorGuide,
  'hash-generator-online-guide': HashGeneratorOnlineGuide,
  'cron-expression-generator-guide': CronExpressionGeneratorGuide,
  'color-converter-online-guide': ColorConverterOnlineGuide,
  'password-generator-online-guide': PasswordGeneratorOnlineGuide,
  'docker-compose-generator-online-guide': DockerComposeGeneratorOnlineGuide,
  'nginx-config-generator-online-guide': NginxConfigGeneratorOnlineGuide,
  'qr-code-generator-online-guide': QrCodeGeneratorOnlineGuide,
  'git-command-generator-online-guide': GitCommandGeneratorOnlineGuide,
  'sql-formatter-online-guide': SqlFormatterOnlineGuide,
  'css-flexbox-generator-online-guide': CssFlexboxGeneratorOnlineGuide,
  'timestamp-converter-online-guide': TimestampConverterOnlineGuide,
  'base64-online-guide': Base64OnlineGuide,
  'text-diff-online-guide': TextDiffOnlineGuide,
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

      {/* Share & Helpful */}
      <ShareBar url={`https://viadreams.cc/${lang}/blog/${slug}`} title={post.title} lang={lang} />
      <HelpfulButton slug={slug} lang={lang} />

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
