#!/usr/bin/env tsx
/**
 * 工具页面 SEO 迁移脚本
 * 
 * 将硬编码 SEO 的 layout.tsx 迁移到 ToolSeoServer 标准模式
 * 
 * 使用方法:
 *   npx tsx scripts/migrate-to-toolseoserver.ts [--dry-run] [--tool <tool-id>]
 * 
 * 选项:
 *   --dry-run    预览变更，不实际写入文件
 *   --tool       仅迁移指定工具（如: base64-encoder）
 */

import * as fs from 'fs';
import * as path from 'path';

const TOOLS_DIR = path.join(process.cwd(), 'src/app/[lang]/tools');

interface MigrationOptions {
  dryRun: boolean;
  specificTool?: string;
}

function parseArgs(): MigrationOptions {
  const args = process.argv.slice(2);
  return {
    dryRun: args.includes('--dry-run'),
    specificTool: args.find((_, i) => args[i - 1] === '--tool'),
  };
}

function getToolIdFromLayout(layoutPath: string): string {
  return path.basename(path.dirname(layoutPath));
}

function extractMetadataFromHardcoded(content: string): { title: string; description: string } | null {
  // 尝试从硬编码的 meta 对象中提取标题和描述
  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
  
  if (titleMatch && descMatch) {
    return {
      title: titleMatch[1],
      description: descMatch[1],
    };
  }
  return null;
}

function generateNewLayout(toolId: string): string {
  return `import type { Metadata } from 'next';
import ToolSeoServer from '@/components/ToolSeoServer';
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

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = (i18n.locales.includes(rawLang as Locale) ? rawLang : i18n.defaultLocale) as Locale;
  return (
    <ToolSeoServer toolId="${toolId}" lang={lang}>
      {children}
    </ToolSeoServer>
  );
}
`;
}

async function findHardcodedLayouts(): Promise<string[]> {
  const layouts: string[] = [];
  const toolDirs = fs.readdirSync(TOOLS_DIR);
  
  for (const toolDir of toolDirs) {
    const layoutPath = path.join(TOOLS_DIR, toolDir, 'layout.tsx');
    if (fs.existsSync(layoutPath)) {
      const content = fs.readFileSync(layoutPath, 'utf-8');
      if (!content.includes('ToolSeoServer')) {
        layouts.push(layoutPath);
      }
    }
  }
  
  return layouts.sort();
}

async function migrateTool(layoutPath: string, options: MigrationOptions): Promise<boolean> {
  const toolId = getToolIdFromLayout(layoutPath);
  const content = fs.readFileSync(layoutPath, 'utf-8');
  
  // 检查是否已经有对应的字典条目
  const dictPath = path.join(process.cwd(), 'src/i18n/dictionaries/en.json');
  const dict = JSON.parse(fs.readFileSync(dictPath, 'utf-8'));
  
  if (!dict.tools[toolId]) {
    console.log(`  ⚠️  跳过: ${toolId} - 字典中缺少对应条目`);
    return false;
  }
  
  // 检查字典是否有必要的字段
  const toolDict = dict.tools[toolId];
  const requiredFields = ['pageTitle', 'pageDescription', 'howToUseSteps', 'useCases'];
  const missingFields = requiredFields.filter(f => !toolDict[f]);
  
  if (missingFields.length > 0) {
    console.log(`  ⚠️  跳过: ${toolId} - 字典缺少字段: ${missingFields.join(', ')}`);
    return false;
  }
  
  const newContent = generateNewLayout(toolId);
  
  if (options.dryRun) {
    console.log(`  🔍 [预览] 将迁移: ${toolId}`);
    console.log(`     新内容预览 (前 500 字符):`);
    console.log(newContent.substring(0, 500) + '...');
  } else {
    fs.writeFileSync(layoutPath, newContent, 'utf-8');
    console.log(`  ✅ 已迁移: ${toolId}`);
  }
  
  return true;
}

async function main() {
  const options = parseArgs();
  
  console.log('========================================');
  console.log('   工具页面 SEO 迁移脚本');
  console.log('========================================');
  console.log('');
  
  if (options.dryRun) {
    console.log('🔍 干运行模式 (不实际修改文件)');
    console.log('');
  }
  
  let layouts: string[];
  
  if (options.specificTool) {
    const layoutPath = path.join(TOOLS_DIR, options.specificTool, 'layout.tsx');
    if (!fs.existsSync(layoutPath)) {
      console.error(`❌ 工具不存在: ${options.specificTool}`);
      process.exit(1);
    }
    layouts = [layoutPath];
  } else {
    layouts = await findHardcodedLayouts();
  }
  
  console.log(`找到 ${layouts.length} 个需要迁移的工具`);
  console.log('');
  
  let success = 0;
  let skipped = 0;
  
  for (const layoutPath of layouts) {
    const migrated = await migrateTool(layoutPath, options);
    if (migrated) {
      success++;
    } else {
      skipped++;
    }
  }
  
  console.log('');
  console.log('========================================');
  console.log('迁移统计:');
  console.log(`  成功: ${success}`);
  console.log(`  跳过: ${skipped}`);
  console.log(`  总计: ${layouts.length}`);
  console.log('========================================');
  
  if (skipped > 0) {
    console.log('');
    console.log('提示: 被跳过的工具需要先完善字典中的对应条目。');
    console.log('字典文件位置: src/i18n/dictionaries/*.json');
    console.log('');
    console.log('每个工具字典需要包含:');
    console.log('  - pageTitle');
    console.log('  - pageDescription');
    console.log('  - howToUseSteps (数组)');
    console.log('  - useCases (数组)');
    console.log('  - faqs (数组, 可选)');
  }
}

main().catch(console.error);
