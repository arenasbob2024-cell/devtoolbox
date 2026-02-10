const fs = require('fs');
const path = require('path');

const tools = [
  'css-gradient',
  'box-shadow',
  'meta-tag-generator',
  'schema-generator',
  'robots-generator',
  'json-viewer',
  'favicon-generator',
  'ascii-art',
  'svg-optimizer',
  'placeholder-image',
];

function generateLayout(toolId) {
  return `import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import { i18n, type Locale } from '@/i18n/config';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  const dict = await getDictionary(lang);
  const t = dict.tools['${toolId}'];
  const url = \`https://viadreams.cc/\${lang}/tools/${toolId}\`;
  return {
    title: t.pageTitle,
    description: t.pageDescription,
    openGraph: {
      title: \`\${t.pageTitle} | DevToolBox\`,
      description: t.pageDescription,
      url,
      type: 'website',
      siteName: 'DevToolBox',
      images: [{ url: 'https://viadreams.cc/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: \`\${t.pageTitle} | DevToolBox\`,
      description: t.pageDescription,
      images: ['https://viadreams.cc/og-image.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          i18n.locales.map((l) => [l, \`https://viadreams.cc/\${l}/tools/${toolId}\`])
        ),
        'x-default': \`https://viadreams.cc/en/tools/${toolId}\`,
      },
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
`;
}

const baseDir = path.join(__dirname, '..', 'src', 'app', '[lang]', 'tools');

for (const toolId of tools) {
  const toolDir = path.join(baseDir, toolId);

  // Create directory if it doesn't exist
  if (!fs.existsSync(toolDir)) {
    fs.mkdirSync(toolDir, { recursive: true });
    console.log(`Created directory: ${toolDir}`);
  } else {
    console.log(`Directory already exists: ${toolDir}`);
  }

  // Write layout.tsx
  const layoutPath = path.join(toolDir, 'layout.tsx');
  const content = generateLayout(toolId);
  fs.writeFileSync(layoutPath, content, 'utf-8');
  console.log(`Written: ${layoutPath}`);
}

console.log(`\nDone! Generated layout.tsx for ${tools.length} tools.`);
