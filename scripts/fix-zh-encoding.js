#!/usr/bin/env node
/**
 * Fix zh.json - regenerate with proper UTF-8 Chinese translations.
 * Run: node scripts/fix-zh-encoding.js
 */
const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, '../src/i18n/dictionaries/en.json');
const zhPath = path.join(__dirname, '../src/i18n/dictionaries/zh.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Comprehensive Chinese translations - map from English value to Chinese
const zhMap = {
  // common
  "Search tools... (e.g. json, base64, uuid)": "搜索工具...（如 json、base64、uuid）",
  "All Tools": "全部工具",
  "FREE": "免费",
  "Home": "首页",
  "More Tools": "更多工具",
  "Copy": "复制",
  "Copied!": "已复制！",
  "Clear": "清除",
  "Clear All": "全部清除",
  "Privacy Policy": "隐私政策",
  "About": "关于",
  "Error": "错误",
  "No tools found for": "未找到相关工具：",
  "Try a different search term": "请尝试其他搜索词",
  "Input": "输入",
  "Output": "输出",
  "Encode": "编码",
  "Decode": "解码",
  "Generate": "生成",
  "Convert": "转换",
  "Swap": "交换",
  "Download": "下载",
  "Load Sample": "加载示例",
  "Format": "格式化",
  "Minify": "压缩",
  "Beautify": "美化",
  "Validate": "校验",
  "Parse": "解析",
  "Compare": "对比",
  "Copy All": "全部复制",
  "Result will appear here...": "结果将在此处显示...",
  "characters": "字符",
  "saved": "已保存",
  "words": "词",
  "added": "新增",
  "removed": "移除",
  "unchanged": "未修改",
  // home
  "Free Online": "免费在线",
  "Developer Tools": "开发者工具",
  "40+ essential tools for developers. No signup, no limits. All processing happens right in your browser — your data never leaves your device.": "40 多款开发者必备工具。无需注册，没有限制。所有数据处理均在浏览器本地完成——数据绝不离开你的设备。",
  "Search tools... (json, base64, uuid, hash...)": "搜索工具...（json、base64、uuid、hash...）",
  "Why": "为什么",
  "Privacy First": "隐私优先",
  "All data is processed locally in your browser. Nothing is sent to any server.": "所有数据均在浏览器本地处理，不会发送到任何服务器。",
  "Instant & Fast": "即时高效",
  "No loading, no waiting. Tools work instantly with zero latency.": "无需加载，无需等待。工具即开即用，零延迟。",
  "100% Free": "完全免费",
  "No signup, no limits, no hidden fees. Free forever.": "无需注册、没有限制、没有隐式费用。永久免费。",
  "Works Everywhere": "全平台适配",
  "Fully responsive. Use on desktop, tablet, or mobile.": "完全响应式设计，支持桌面、平板和手机。",
  // categories
  "Encoder / Decoder": "编码 / 解码",
  "Formatter / Beautifier": "格式化 / 美化",
  "Generator": "生成器",
  "Converter": "转换器",
  "Text Tools": "文本工具",
  "Web Tools": "Web 工具",
  // footer
  "Free online developer tools. No signup required. All processing happens in your browser — your data never leaves your device.": "免费在线开发者工具。无需注册。所有数据处理均在浏览器中完成——你的数据绝不会离开设备。",
  "DevToolBox. All tools are free and open-source.": "DevToolBox。所有工具均免费且开源。",
  // about
  "About DevToolBox": "关于 DevToolBox",
  "DevToolBox is a collection of free, online developer tools built for programmers, designers, and everyone who works with data.": "DevToolBox 是一套免费的在线开发者工具合集，专为程序员、设计师以及所有与数据打交道的人打造。",
  "Our Mission": "我们的使命",
  "We believe developer tools should be free, fast, and private. Every tool on DevToolBox processes data entirely in your browser — nothing is ever sent to a server.": "我们相信开发者工具应该是免费、快速和保护隐私的。DevToolBox 上的每个工具都完全在浏览器中处理数据——绝不会将任何内容发送到服务器。",
  "Features": "功能特性",
  "40+ essential developer tools": "40 多款开发者必备工具",
  "100% client-side processing — your data never leaves your browser": "100% 客户端处理——你的数据绝不会离开浏览器",
  "No signup, no accounts, no tracking": "无需注册、无需账户、无跟踪",
  "Works on desktop, tablet, and mobile": "支持桌面端、平板和手机",
  "Fast and lightweight": "快速且轻量",
  "Contact": "联系我们",
  "Have feedback or suggestions? Open an issue on our": "有反馈或建议？请在我们的",
  // meta
  "DevToolBox - Free Online Developer Tools": "DevToolBox - 免费在线开发者工具",
  "Free online developer tools: JSON formatter, Base64 encoder, UUID generator, regex tester, hash generator, and 40+ more. No signup required. All processing in your browser.": "免费在线开发者工具：JSON 格式化、Base64 编码、UUID 生成器、正则测试、哈希生成器等 40 多款工具。无需注册。所有处理均在浏览器中完成。",
  // blog
  "Blog": "博客",
  "DevToolBox Blog": "DevToolBox 博客",
  "Developer guides, tutorials, and best practices for working with online tools": "开发者指南、教程及在线工具最佳实践",
  "Read More": "阅读更多",
  // privacy
  "Privacy Policy": "隐私政策",
  "At DevToolBox, your privacy is our top priority.": "在 DevToolBox，您的隐私是我们的首要任务。",
  "Data Processing": "数据处理",
  "All tools on DevToolBox process data entirely in your browser. We never send your data to any server. Your input never leaves your device.": "DevToolBox 上的所有工具均在浏览器中处理数据。我们绝不会将您的数据发送到任何服务器。您的输入绝不会离开您的设备。",
  "Cookies": "Cookies",
  "We may use cookies for analytics purposes (e.g. Google Analytics) and advertising (e.g. Google AdSense) to understand how visitors use our site and to display relevant ads. These third-party services may collect anonymous usage data.": "我们可能使用 Cookies 进行分析（如 Google Analytics）和广告（如 Google AdSense），以了解访客如何使用我们的网站并展示相关广告。这些第三方服务可能会收集匿名使用数据。",
  "Advertising": "广告",
  "We display advertisements through Google AdSense to support the free operation of this website. AdSense may use cookies and web beacons to serve ads based on your prior visits.": "我们通过 Google AdSense 展示广告以支持本网站免费运营。AdSense 可能使用 Cookies 和网络信标根据您之前的访问记录投放广告。",
  "Third-Party Services": "第三方服务",
  "We use the following third-party services:": "我们使用以下第三方服务：",
  "Google Analytics — for anonymous usage statistics": "Google Analytics — 匿名使用统计",
  "Google AdSense — for displaying advertisements": "Google AdSense — 展示广告",
  "Changes": "变更",
  "We may update this privacy policy from time to time. Check back periodically for updates.": "我们可能会不时更新本隐私政策。请定期查看更新。",
  "Questions about this policy? Open an issue on our GitHub repository.": "对本政策有疑问？请在我们的 GitHub 仓库提交 Issue。",
};

// Tool-specific translations (name, description, pageTitle, pageDescription)
const toolZhMap = {
  "json-formatter": { name: "JSON 格式化", description: "格式化、校验和美化 JSON 数据，支持语法高亮", pageTitle: "JSON 格式化与校验", pageDescription: "在线格式化、美化、压缩和校验 JSON 数据。支持语法检查和自定义缩进。" },
  "base64": { name: "Base64 编码/解码", description: "将文本编码为 Base64 或将 Base64 解码回文本", pageTitle: "Base64 编码 / 解码", pageDescription: "将文本编码为 Base64 或将 Base64 字符串解码回纯文本。支持 UTF-8。" },
  "url-encoder": { name: "URL 编码/解码", description: "编码或解码 URL 组件和查询参数", pageTitle: "URL 编码 / 解码", pageDescription: "编码或解码 URL 和 URI 组件。支持 encodeURIComponent 和 encodeURI。" },
  "hash-generator": { name: "哈希生成器", description: "从文本生成 MD5、SHA-1、SHA-256、SHA-512 哈希", pageTitle: "哈希生成器", pageDescription: "从任意文本生成 SHA-1、SHA-256、SHA-384、SHA-512 哈希。均在浏览器中计算。" },
  "uuid-generator": { name: "UUID 生成器", description: "一键批量生成随机 UUID (v4)", pageTitle: "UUID 生成器", pageDescription: "批量生成随机 UUID (v4)。支持大写、无横线格式。" },
  "timestamp-converter": { name: "Unix 时间戳转换", description: "在 Unix 时间戳与可读日期之间转换", pageTitle: "Unix 时间戳转换器", pageDescription: "将 Unix 时间戳转换为可读日期，反之亦然。自动识别秒和毫秒。" },
  "color-converter": { name: "颜色转换器", description: "在 HEX、RGB、HSL 格式之间转换颜色并预览", pageTitle: "颜色转换器", pageDescription: "在 HEX、RGB 和 HSL 格式之间转换颜色，支持实时预览。" },
  "regex-tester": { name: "正则测试", description: "实时匹配和高亮测试正则表达式", pageTitle: "正则表达式测试", pageDescription: "测试正则表达式，支持实时匹配、高亮和捕获组。" },
  "markdown-preview": { name: "Markdown 预览", description: "编写 Markdown 并实时预览渲染效果", pageTitle: "Markdown 预览", pageDescription: "编写 Markdown 并实时预览渲染的 HTML。左右分栏编辑器和预览。" },
  "jwt-decoder": { name: "JWT 解码器", description: "解码并检查 JSON Web Token（header、payload、signature）", pageTitle: "JWT 解码器", pageDescription: "解码并检查 JSON Web Token。查看 header、payload 和 signature。" },
  "qrcode-generator": { name: "二维码生成器", description: "从文本、URL 或任意数据生成二维码", pageTitle: "二维码生成器", pageDescription: "从文本、URL 或任意数据生成二维码。可下载为 PNG 图片。" },
  "lorem-ipsum": { name: "Lorem Ipsum 生成器", description: "生成段落、句子或词语占位文本", pageTitle: "Lorem Ipsum 生成器", pageDescription: "生成段落、句子或词语占位文本，用于设计和开发。" },
  "html-entity": { name: "HTML 实体编码器", description: "编码和解码 HTML 实体及特殊字符", pageTitle: "HTML 实体编码器 / 解码器", pageDescription: "将特殊字符编码为 HTML 实体或将实体解码回字符。" },
  "css-minifier": { name: "CSS 压缩 / 美化", description: "压缩或美化 CSS 代码", pageTitle: "CSS 压缩器 / 美化器", pageDescription: "压缩 CSS 用于生产环境或美化为可读格式。移除注释和多余空白。" },
  "number-base": { name: "进制转换器", description: "在二进制、八进制、十进制和十六进制之间转换数字", pageTitle: "进制转换器", pageDescription: "在十进制、二进制、八进制和十六进制之间即时转换数字。" },
  "text-diff": { name: "文本差异对比", description: "对比两段文本并高亮差异", pageTitle: "文本差异对比", pageDescription: "左右对比两段文本并高亮差异。" },
  "word-counter": { name: "字数统计", description: "统计文本的字数、字符数、句子数和段落数", pageTitle: "字数统计", pageDescription: "统计字数、字符数、句子数、段落数，并估算阅读时间。" },
  "password-generator": { name: "密码生成器", description: "生成安全随机密码，支持自定义选项", pageTitle: "密码生成器", pageDescription: "生成强随机密码，支持自定义长度和字符类型。" },
  "sql-formatter": { name: "SQL 格式化", description: "格式化和美化 SQL 查询以提高可读性", pageTitle: "SQL 格式化", pageDescription: "格式化和美化 SQL 查询以提高可读性。支持常见 SQL 方言。" },
  "cron-parser": { name: "Cron 表达式解析", description: "解析 Cron 表达式并显示下次执行时间", pageTitle: "Cron 表达式解析器", pageDescription: "将 Cron 表达式解析为可读描述，并显示下次计划执行时间。" },
  "json-yaml": { name: "JSON ↔ YAML 转换", description: "在 JSON 和 YAML 格式之间即时转换", pageTitle: "JSON 转 YAML 转换器", pageDescription: "在线将 JSON 转为 YAML，YAML 转为 JSON。快速、免费，在浏览器中运行。" },
  "string-case": { name: "命名格式转换", description: "在 camelCase、snake_case、kebab-case 等格式之间转换文本", pageTitle: "命名格式转换器", pageDescription: "在 camelCase、PascalCase、snake_case、kebab-case 等命名规范之间转换。" },
  "slug-generator": { name: "URL 别名生成", description: "将文本转换为 SEO 友好的 URL 别名", pageTitle: "URL 别名生成器", pageDescription: "将任意文本转换为干净、SEO 友好的 URL 别名。" },
  "chmod-calculator": { name: "Chmod 计算器", description: "用交互式复选框计算 Linux 文件权限", pageTitle: "Linux Chmod 计算器", pageDescription: "交互式 chmod 权限计算器。在数字 (755) 和符号 (rwxr-xr-x) 之间转换。" },
  "line-sorter": { name: "行排序与去重", description: "排序行、去重、反转、打乱等", pageTitle: "行排序与去重工具", pageDescription: "按字母、数字排序行，去重，反转，打乱等。免费在线文本行排序工具。" },
  "js-html-formatter": { name: "JS/HTML 格式化", description: "压缩或美化 JavaScript 和 HTML 代码", pageTitle: "JavaScript 与 HTML 压缩器 / 美化器", pageDescription: "在线压缩或美化 JavaScript 和 HTML 代码。移除注释、压缩空白或格式化为可读。" },
  "image-base64": { name: "图片 Base64 转换", description: "将图片转换为 Base64 字符串和 data URI，支持拖放", pageTitle: "图片转 Base64 转换器", pageDescription: "将图片转换为 Base64 编码字符串和 data URI。支持 PNG、JPG、GIF、SVG、WebP。拖放上传。" },
  "git-command-generator": { name: "Git 命令生成器", description: "可视化 Git 命令构建器 — 选择操作，填写参数，复制命令", pageTitle: "Git 命令生成器", pageDescription: "可视化 Git 命令构建器。选择操作，自定义参数，复制即用命令。覆盖 init、branch、commit、merge 等。" },
  "xml-formatter": { name: "XML 格式化器", description: "格式化、压缩和验证 XML", pageTitle: "XML 格式化器和验证器", pageDescription: "在线格式化、压缩和验证 XML。" },
  "csv-json": { name: "CSV ↔ JSON 转换器", description: "在 CSV 和 JSON 之间转换", pageTitle: "CSV 转 JSON 转换器", pageDescription: "在线将 CSV 转换为 JSON，JSON 转换为 CSV。" },
  "http-status": { name: "HTTP 状态码参考", description: "查找 HTTP 状态码含义", pageTitle: "HTTP 状态码参考", pageDescription: "查找 HTTP 状态码：1xx、2xx、3xx、4xx、5xx。" },
  "mime-types": { name: "MIME 类型查询", description: "按文件扩展名查找 MIME 类型", pageTitle: "MIME 类型查询", pageDescription: "按文件扩展名查找 MIME 类型。" },
  "escape-unescape": { name: "Escape / Unescape", description: "对 HTML、JavaScript 和 JSON 进行转义或反转义", pageTitle: "Escape Unescape 工具", pageDescription: "为 HTML、JavaScript 或 JSON 转义特殊字符。" },
  "ip-calculator": { name: "IP 子网计算器", description: "计算子网掩码、网络和广播地址", pageTitle: "IP 子网计算器", pageDescription: "计算子网掩码、网络地址和广播地址。" },
  "fake-data": { name: "假数据生成器", description: "生成假姓名、邮箱用于测试", pageTitle: "假数据生成器", pageDescription: "生成假姓名、邮箱和地址，用于测试。" },
  "hmac-generator": { name: "HMAC 生成器", description: "生成 HMAC-SHA256、HMAC-SHA1", pageTitle: "HMAC 生成器", pageDescription: "使用 SHA-256 或 SHA-1 生成 HMAC 签名。" },
  "url-parser": { name: "URL 解析器", description: "将 URL 解析为组件", pageTitle: "URL 解析器", pageDescription: "将 URL 解析为协议、host、pathname 和参数。" },
  "binary-text": { name: "文本 ↔ 二进制转换器", description: "将文本转换为二进制，反之亦然", pageTitle: "文本转二进制转换器", pageDescription: "将文本转换为二进制，二进制转换为文本。" },
  "pem-decoder": { name: "PEM / 证书解码器", description: "解码 PEM 证书", pageTitle: "PEM 证书解码器", pageDescription: "解码 PEM 格式的证书。" },
  "html-table": { name: "HTML 表格生成器", description: "将 CSV 或 JSON 转换为 HTML 表格", pageTitle: "HTML 表格生成器", pageDescription: "将 CSV 或 JSON 转换为 HTML 表格标记。" },
  "bcrypt-generator": { name: "Bcrypt Hash 生成器", description: "生成可配置成本的 bcrypt hash", pageTitle: "Bcrypt Hash 生成器", pageDescription: "生成可配置成本因子的 bcrypt 密码 hash。" },
};

// Additional common tool UI strings
Object.assign(zhMap, {
  "Format / Beautify": "格式化 / 美化",
  "Input JSON": "输入 JSON",
  "Paste your JSON here...\n\n{\"key\": \"value\"}": "在此粘贴你的 JSON...\n\n{\"key\": \"value\"}",
  "Formatted output will appear here...": "格式化结果将在此显示...",
  "Indent": "缩进",
  "✓ Valid JSON": "✓ 有效 JSON",
  "Invalid JSON": "无效 JSON",
  "Frequently Asked Questions": "常见问题",
  "How to Use": "使用方法",
  "Common Use Cases": "常见用途",
  "Plain Text": "纯文本",
  "Base64 String": "Base64 字符串",
  "URI Component": "URI 组件",
  "Full URI": "完整 URI",
  "Input Text": "输入文本",
  "Count:": "数量：",
  "Uppercase": "大写",
  "Generate Hashes": "生成哈希",
});

function translateObj(obj, path = '') {
  if (typeof obj === 'string') {
    const toolId = path.match(/tools\.([^.]+)/)?.[1];
    if (toolId && toolZhMap[toolId]) {
      const key = path.split('.').pop();
      if (toolZhMap[toolId][key]) return toolZhMap[toolId][key];
    }
    return zhMap[obj] ?? obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item, i) => translateObj(item, `${path}[${i}]`));
  }
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const k of Object.keys(obj)) {
      out[k] = translateObj(obj[k], path ? `${path}.${k}` : k);
    }
    return out;
  }
  return obj;
}

const zh = translateObj(en);
const jsonStr = JSON.stringify(zh, null, 2);

// Write with explicit UTF-8 encoding (no BOM)
fs.writeFileSync(zhPath, jsonStr, { encoding: 'utf8' });
console.log('zh.json regenerated successfully with UTF-8 encoding.');
