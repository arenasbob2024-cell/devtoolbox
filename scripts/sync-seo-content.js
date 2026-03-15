#!/usr/bin/env node

/**
 * Sync HowTo/FAQ/UseCases SEO content from en.json to all other locale dictionaries.
 * Uses English content as fallback - having content in English is better than having none,
 * as it still enables structured data (HowTo, FAQ schema) for Google indexing.
 *
 * Run: bun scripts/sync-seo-content.js
 */

const fs = require('fs');
const path = require('path');

const DICT_DIR = path.join(__dirname, '..', 'src', 'i18n', 'dictionaries');
const LOCALES = ['de', 'es', 'fr', 'id', 'it', 'ja', 'ko', 'nl', 'no', 'pl', 'pt', 'sv', 'th', 'zh'];
const SEO_FIELDS = ['howToUseTitle', 'howToUseSteps', 'useCasesTitle', 'useCases', 'faqTitle', 'faqs'];

// Read English dictionary as source of truth
const enDict = JSON.parse(fs.readFileSync(path.join(DICT_DIR, 'en.json'), 'utf8'));
const enTools = enDict.tools;

let totalUpdated = 0;

for (const locale of LOCALES) {
  const filePath = path.join(DICT_DIR, `${locale}.json`);
  const dict = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let localeUpdated = 0;

  for (const [toolId, enTool] of Object.entries(enTools)) {
    if (!dict.tools[toolId]) continue; // Skip tools not in this locale

    for (const field of SEO_FIELDS) {
      if (enTool[field] && !dict.tools[toolId][field]) {
        dict.tools[toolId][field] = enTool[field];
        localeUpdated++;
      }
    }
  }

  if (localeUpdated > 0) {
    fs.writeFileSync(filePath, JSON.stringify(dict, null, 2) + '\n', 'utf8');
    console.log(`${locale}.json: synced ${localeUpdated} fields`);
    totalUpdated += localeUpdated;
  } else {
    console.log(`${locale}.json: already up to date`);
  }
}

console.log(`\nTotal fields synced: ${totalUpdated}`);
