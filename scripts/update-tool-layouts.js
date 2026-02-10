// update-tool-layouts.js
// Batch-updates all src/app/[lang]/tools/*/layout.tsx files to add
// x-default hreflang to the alternates.languages section.

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const toolsDir = path.join(rootDir, 'src', 'app', '[lang]', 'tools');

const toolDirs = fs.readdirSync(toolsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

console.log('Found ' + toolDirs.length + ' tool directories to process.\n');

let updatedCount = 0;
let skippedCount = 0;
let errorCount = 0;

for (const toolDir of toolDirs) {
  const filePath = path.join(toolsDir, toolDir, 'layout.tsx');

  if (!fs.existsSync(filePath)) {
    console.log('SKIP (no layout.tsx): ' + toolDir);
    skippedCount++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes("'x-default'") || content.includes('"x-default"')) {
    console.log('SKIP (already has x-default): ' + toolDir);
    skippedCount++;
    continue;
  }

  // Extract tool name from URL pattern
  const toolNameMatch = content.match(/https:\/\/viadreams\.cc\/\$\{l\}\/tools\/([\w-]+)/);
  if (!toolNameMatch) {
    console.log('ERROR (could not extract tool name): ' + toolDir);
    errorCount++;
    continue;
  }
  const toolName = toolNameMatch[1];

  let newContent = content;
  let matched = false;

  // Pattern A: Multi-line alternates block
  const multiLineRegex = new RegExp(
    'languages:\s*Object\.fromEntries\(\s*\n\s*i18n\.locales\.map\(\(l\)\s*=>\s*\[l,\s*`https://viadreams\.cc/\$\{l\}/tools/' + toolName + '`\]\)\s*\n\s*\)',
    's'
  );

  if (multiLineRegex.test(newContent)) {
    newContent = newContent.replace(multiLineRegex, function() {
      return 'languages: {\n        ...Object.fromEntries(\n          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/' + toolName + '`])\n        ),\n        \'x-default\': `https://viadreams.cc/en/tools/' + toolName + '`,\n      }';
    });
    matched = true;
  }

  // Pattern B: Single-line alternates block
  if (!matched) {
    const singleLineRegex = new RegExp(
      'languages:\s*Object\.fromEntries\(i18n\.locales\.map\(\(l\)\s*=>\s*\[l,\s*`https://viadreams\.cc/\$\{l\}/tools/' + toolName + '`\]\)\)',
      's'
    );

    if (singleLineRegex.test(newContent)) {
      newContent = newContent.replace(singleLineRegex, function() {
      return 'languages: {\n        ...Object.fromEntries(\n          i18n.locales.map((l) => [l, `https://viadreams.cc/${l}/tools/' + toolName + '`])\n        ),\n        \'x-default\': `https://viadreams.cc/en/tools/' + toolName + '`,\n      }';
      });
      matched = true;
    }
  }

  if (matched) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log('UPDATED: ' + toolDir);
    updatedCount++;
  } else {
    console.log('ERROR (no pattern matched): ' + toolDir);
    errorCount++;
  }
}

console.log('\nDone. Updated: ' + updatedCount + ', Skipped: ' + skippedCount + ', Errors: ' + errorCount);
