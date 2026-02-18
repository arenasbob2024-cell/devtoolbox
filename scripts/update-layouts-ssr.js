#!/usr/bin/env node
/**
 * Batch update tool layout.tsx files to wrap children with ToolSeoServer
 * This moves JSON-LD, HowTo, and FAQ to server-side rendering
 */

const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '..', 'src', 'app', '[lang]', 'tools');
const dirs = fs.readdirSync(toolsDir).filter(d => {
  const stat = fs.statSync(path.join(toolsDir, d));
  return stat.isDirectory();
});

let updated = 0;
let skipped = 0;

for (const toolId of dirs) {
  const layoutPath = path.join(toolsDir, toolId, 'layout.tsx');
  if (!fs.existsSync(layoutPath)) {
    console.log(`SKIP (no layout): ${toolId}`);
    skipped++;
    continue;
  }

  let content = fs.readFileSync(layoutPath, 'utf-8');

  // Skip if already has ToolSeoServer
  if (content.includes('ToolSeoServer')) {
    console.log(`SKIP (already updated): ${toolId}`);
    skipped++;
    continue;
  }

  // Check if it has the simple "return children" pattern
  if (!content.includes('return children')) {
    console.log(`SKIP (non-standard pattern): ${toolId}`);
    skipped++;
    continue;
  }

  // Add ToolSeoServer import
  if (!content.includes("import ToolSeoServer")) {
    content = content.replace(
      "import type { Metadata } from 'next';",
      "import type { Metadata } from 'next';\nimport ToolSeoServer from '@/components/ToolSeoServer';"
    );
  }

  // Replace the Layout function
  // Pattern 1: Multi-line
  content = content.replace(
    /export default function Layout\(\{ children \}: \{ children: React\.ReactNode \}\) \{\s*return children;\s*\}/,
    `export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  return (
    <ToolSeoServer toolId="${toolId}" lang={lang}>
      {children}
    </ToolSeoServer>
  );
}`
  );

  fs.writeFileSync(layoutPath, content, 'utf-8');
  console.log(`UPDATED: ${toolId}`);
  updated++;
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped`);
