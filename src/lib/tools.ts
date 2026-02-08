export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  keywords: string[];
  path: string;
}

export const categories = [
  { id: 'encoder', name: 'Encoder / Decoder', icon: '🔐' },
  { id: 'formatter', name: 'Formatter / Beautifier', icon: '✨' },
  { id: 'generator', name: 'Generator', icon: '⚡' },
  { id: 'converter', name: 'Converter', icon: '🔄' },
  { id: 'text', name: 'Text Tools', icon: '📝' },
  { id: 'web', name: 'Web Tools', icon: '🌐' },
];

export const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON data with syntax highlighting',
    icon: '{ }',
    category: 'formatter',
    keywords: ['json', 'format', 'validate', 'beautify', 'pretty print', 'minify'],
    path: '/tools/json-formatter',
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode text to Base64 or decode Base64 back to text',
    icon: 'B64',
    category: 'encoder',
    keywords: ['base64', 'encode', 'decode', 'binary', 'text'],
    path: '/tools/base64',
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode or decode URL components and query parameters',
    icon: '%20',
    category: 'encoder',
    keywords: ['url', 'encode', 'decode', 'uri', 'percent encoding', 'query string'],
    path: '/tools/url-encoder',
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text',
    icon: '#',
    category: 'generator',
    keywords: ['hash', 'md5', 'sha1', 'sha256', 'sha512', 'checksum', 'digest'],
    path: '/tools/hash-generator',
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate random UUIDs (v4) in bulk with one click',
    icon: 'ID',
    category: 'generator',
    keywords: ['uuid', 'guid', 'unique id', 'random', 'identifier'],
    path: '/tools/uuid-generator',
  },
  {
    id: 'timestamp-converter',
    name: 'Unix Timestamp Converter',
    description: 'Convert between Unix timestamps and human-readable dates',
    icon: '🕐',
    category: 'converter',
    keywords: ['timestamp', 'unix', 'epoch', 'date', 'time', 'convert'],
    path: '/tools/timestamp-converter',
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert colors between HEX, RGB, HSL formats with preview',
    icon: '🎨',
    category: 'converter',
    keywords: ['color', 'hex', 'rgb', 'hsl', 'convert', 'picker', 'palette'],
    path: '/tools/color-converter',
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regular expressions with real-time matching and highlighting',
    icon: '.*',
    category: 'text',
    keywords: ['regex', 'regular expression', 'pattern', 'match', 'test', 'replace'],
    path: '/tools/regex-tester',
  },
  {
    id: 'markdown-preview',
    name: 'Markdown Preview',
    description: 'Write Markdown and see the rendered preview side by side',
    icon: 'MD',
    category: 'text',
    keywords: ['markdown', 'preview', 'render', 'md', 'editor'],
    path: '/tools/markdown-preview',
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode and inspect JSON Web Tokens (header, payload, signature)',
    icon: 'JWT',
    category: 'encoder',
    keywords: ['jwt', 'json web token', 'decode', 'header', 'payload', 'auth'],
    path: '/tools/jwt-decoder',
  },
  {
    id: 'qrcode-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes from text, URLs, or any data',
    icon: '▣',
    category: 'generator',
    keywords: ['qr', 'qrcode', 'barcode', 'generate', 'scan'],
    path: '/tools/qrcode-generator',
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text in paragraphs, sentences, or words',
    icon: 'Aa',
    category: 'generator',
    keywords: ['lorem', 'ipsum', 'placeholder', 'text', 'dummy', 'filler'],
    path: '/tools/lorem-ipsum',
  },
  {
    id: 'html-entity',
    name: 'HTML Entity Encoder',
    description: 'Encode and decode HTML entities and special characters',
    icon: '&;',
    category: 'encoder',
    keywords: ['html', 'entity', 'encode', 'decode', 'escape', 'special characters'],
    path: '/tools/html-entity',
  },
  {
    id: 'css-minifier',
    name: 'CSS Minifier / Beautifier',
    description: 'Minify or beautify CSS code for production or readability',
    icon: '{ }',
    category: 'formatter',
    keywords: ['css', 'minify', 'beautify', 'compress', 'format', 'style'],
    path: '/tools/css-minifier',
  },
  {
    id: 'number-base',
    name: 'Number Base Converter',
    description: 'Convert numbers between binary, octal, decimal, and hexadecimal',
    icon: '01',
    category: 'converter',
    keywords: ['binary', 'octal', 'decimal', 'hex', 'convert', 'base', 'number'],
    path: '/tools/number-base',
  },
  {
    id: 'text-diff',
    name: 'Text Diff Checker',
    description: 'Compare two texts and highlight the differences',
    icon: '±',
    category: 'text',
    keywords: ['diff', 'compare', 'difference', 'text', 'merge'],
    path: '/tools/text-diff',
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in text',
    icon: '123',
    category: 'text',
    keywords: ['word', 'count', 'character', 'sentence', 'paragraph', 'length'],
    path: '/tools/word-counter',
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure random passwords with customizable options',
    icon: '🔑',
    category: 'generator',
    keywords: ['password', 'generate', 'random', 'secure', 'strong'],
    path: '/tools/password-generator',
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Format and beautify SQL queries for better readability',
    icon: 'SQL',
    category: 'formatter',
    keywords: ['sql', 'format', 'beautify', 'query', 'database'],
    path: '/tools/sql-formatter',
  },
  {
    id: 'cron-parser',
    name: 'Cron Expression Parser',
    description: 'Parse and explain cron expressions with next run times',
    icon: '⏰',
    category: 'web',
    keywords: ['cron', 'schedule', 'parse', 'expression', 'time', 'job'],
    path: '/tools/cron-parser',
  },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter(t => t.category === categoryId);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return tools.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.keywords.some(k => k.includes(q))
  );
}
