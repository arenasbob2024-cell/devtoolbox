const fs = require('fs');
const path = require('path');

// ============================================================
// 1. Fix relatedTools for 10 new tools in tools.ts
// ============================================================

const toolsPath = path.join(__dirname, '../src/lib/tools.ts');
let toolsContent = fs.readFileSync(toolsPath, 'utf-8');

const newToolRelations = {
  'image-resizer': ['image-cropper', 'webp-converter', 'base64-image-converter', 'favicon-converter'],
  'image-cropper': ['image-resizer', 'webp-converter', 'base64-image-converter', 'favicon-converter'],
  'webp-converter': ['image-resizer', 'image-cropper', 'base64-image-converter', 'favicon-converter'],
  'css-glassmorphism-generator': ['css-neumorphism-generator', 'css-gradient-text', 'css-gradient-generator', 'css-shadow-generator'],
  'css-neumorphism-generator': ['css-glassmorphism-generator', 'css-gradient-text', 'css-gradient-generator', 'css-shadow-generator'],
  'aspect-ratio-calculator': ['image-resizer', 'image-cropper', 'css-unit-converter', 'viewport-units-calculator'],
  'sitemap-generator': ['robots-txt-generator', 'meta-tag-generator', 'open-graph-generator', 'htaccess-generator'],
  'html-to-text': ['html-entity-encoder', 'html-minifier', 'markdown-to-html', 'xml-formatter'],
  'json-sorter': ['json-formatter', 'json-validator', 'json-to-yaml', 'json-to-typescript'],
  'css-gradient-text': ['css-glassmorphism-generator', 'css-neumorphism-generator', 'css-gradient-generator', 'css-shadow-generator'],
};

for (const [toolId, related] of Object.entries(newToolRelations)) {
  // Check if tool exists in the file
  const toolPattern = new RegExp(`id:\\s*'${toolId}'`);
  if (!toolPattern.test(toolsContent)) {
    console.log(`⚠ Tool ${toolId} not found in tools.ts`);
    continue;
  }

  // Check if it already has relatedTools
  // Find the tool block and check
  const blockRegex = new RegExp(`(id:\\s*'${toolId}'[\\s\\S]*?)(relatedTools:\\s*\\[[^\\]]*\\])`, 'g');
  if (blockRegex.test(toolsContent)) {
    console.log(`✓ ${toolId} already has relatedTools, updating...`);
    toolsContent = toolsContent.replace(blockRegex, `$1relatedTools: [${related.map(r => `'${r}'`).join(', ')}]`);
  } else {
    // Add relatedTools before the closing },
    const insertRegex = new RegExp(`(id:\\s*'${toolId}'[\\s\\S]*?path:\\s*'[^']*',?)\\s*\\}`, 'g');
    toolsContent = toolsContent.replace(insertRegex, `$1\n    relatedTools: [${related.map(r => `'${r}'`).join(', ')}],\n  }`);
    console.log(`✓ Added relatedTools for ${toolId}`);
  }
}

fs.writeFileSync(toolsPath, toolsContent);
console.log('\n✓ Updated tools.ts with relatedTools\n');

// ============================================================
// 2. Optimize English pageTitles for better CTR
// ============================================================

const dictDir = path.join(__dirname, '../src/i18n/dictionaries');
const enPath = path.join(dictDir, 'en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

let titleUpdates = 0;
let descUpdates = 0;

for (const [toolId, tool] of Object.entries(en.tools)) {
  if (!tool.pageTitle) continue;

  let title = tool.pageTitle;
  let desc = tool.pageDescription;
  const titleLower = title.toLowerCase();

  // Ensure "Free" is in title
  if (!titleLower.includes('free')) {
    if (title.includes(' – ')) {
      // Add "Free" after the dash
      title = title.replace(' – ', ' – Free ');
    } else if (title.includes(' - ')) {
      title = title.replace(' - ', ' - Free ');
    } else {
      title += ' – Free Online Tool';
    }
    titleUpdates++;
  }

  // Ensure "Online" is in title
  if (!title.toLowerCase().includes('online')) {
    if (title.includes('Free ')) {
      title = title.replace('Free ', 'Free Online ');
    }
    titleUpdates++;
  }

  // Ensure description mentions "free", "no signup", "instant"
  if (desc && !desc.toLowerCase().includes('free') && !desc.toLowerCase().includes('no signup')) {
    desc = desc.replace(/\.$/, '') + '. Free, no signup required.';
    descUpdates++;
  }

  en.tools[toolId].pageTitle = title;
  if (desc) en.tools[toolId].pageDescription = desc;
}

fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n');
console.log(`✓ Updated en.json: ${titleUpdates} title improvements, ${descUpdates} description improvements\n`);

// ============================================================
// 3. Add "Free" / "No Signup" signals to other language descriptions
// ============================================================

const langFiles = fs.readdirSync(dictDir).filter(f => f.endsWith('.json') && f !== 'en.json');
const freeTranslations = {
  'fr.json': '. Gratuit, sans inscription.',
  'de.json': '. Kostenlos, keine Anmeldung erforderlich.',
  'it.json': '. Gratuito, nessuna registrazione.',
  'es.json': '. Gratis, sin registro.',
  'pt.json': '. Gratuito, sem cadastro.',
  'nl.json': '. Gratis, geen registratie vereist.',
  'pl.json': '. Bezpłatne, bez rejestracji.',
  'sv.json': '. Gratis, ingen registrering krävs.',
  'no.json': '. Gratis, ingen registrering nødvendig.',
  'zh.json': '。免费使用，无需注册。',
  'ja.json': '。無料で登録不要。',
  'ko.json': '. 무료, 가입 불필요.',
  'id.json': '. Gratis, tanpa pendaftaran.',
  'th.json': ' ฟรี ไม่ต้องสมัครสมาชิก',
};

for (const langFile of langFiles) {
  const langPath = path.join(dictDir, langFile);
  const dict = JSON.parse(fs.readFileSync(langPath, 'utf-8'));
  const suffix = freeTranslations[langFile];

  if (!suffix) continue;

  let updates = 0;
  for (const [toolId, tool] of Object.entries(dict.tools)) {
    if (!tool.pageDescription) continue;
    const descLower = tool.pageDescription.toLowerCase();

    // Check if it already has "free" equivalent
    const hasFreeSignal = descLower.includes('free') || descLower.includes('gratis') ||
      descLower.includes('gratuit') || descLower.includes('kostenlos') ||
      descLower.includes('免费') || descLower.includes('無料') || descLower.includes('무료') ||
      descLower.includes('bezpłatn') || descLower.includes('ฟรี');

    if (!hasFreeSignal) {
      dict.tools[toolId].pageDescription = tool.pageDescription.replace(/[.。!！]$/, '') + suffix;
      updates++;
    }
  }

  fs.writeFileSync(langPath, JSON.stringify(dict, null, 2) + '\n');
  console.log(`✓ Updated ${langFile}: ${updates} descriptions improved`);
}

console.log('\n=== SEO Optimization Complete ===');
