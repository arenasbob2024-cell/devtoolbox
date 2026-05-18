#!/usr/bin/env node

/**
 * Pull Adsterra Publisher API reports from the command line.
 *
 * Usage:
 *   ADSTERRA_API_KEY=... npm run adsterra:report -- stats --days=7 --group-by=placement
 *   ADSTERRA_API_KEY=... npm run adsterra:report -- recommend --days=7
 *   ADSTERRA_API_KEY=... npm run adsterra:report -- stats --start=2026-05-01 --end=2026-05-15 --group-by=country
 *   ADSTERRA_API_KEY=... npm run adsterra:report -- goal --days=7 --target=10
 *   ADSTERRA_API_KEY=... npm run adsterra:report -- domains
 *   npm run adsterra:ads-txt -- --seller-line='adsterra.com, ... , DIRECT'
 *   npm run adsterra:setup -- --vercel-scope=arenas-projects-ac293cdb --site-url=https://viadreams.cc
 *   npm run adsterra:report -- readiness
 *   npm run adsterra:report -- stats --file=exports/adsterra-placement.csv
 *   npm run adsterra:report -- goal --file=exports/adsterra-daily.csv --target=10
 *   npm run adsterra:report -- recommend --placements-file=exports/placements.csv --countries-file=exports/countries.csv
 *   ADSTERRA_API_KEY=... ADSTERRA_ADS_TXT_SELLER_LINE='adsterra.com, ... , DIRECT' npm run adsterra:gate
 *
 * Keep the token out of git. Generate it in the Adsterra publisher dashboard:
 * API page -> GENERATE NEW TOKEN.
 */

const API_BASE = 'https://api3.adsterratools.com/publisher';

const HELP = `
Adsterra report helper

Commands:
  stats       Fetch revenue stats. Default command.
  goal        Check whether average daily revenue meets a target.
  gate        Final non-sample $10/day gate: live ads.txt + inventory + real revenue.
  recommend   Rank placements/countries and print optimization actions.
  ads-txt     Validate and preview the Adsterra ads.txt seller line.
  setup       Print the exact Adsterra unit/env setup checklist.
  readiness   Check local Adsterra env/reporting readiness and next actions without printing secrets.
  domains     Fetch domains as CSV.
  placements  Fetch placements as CSV.

Options for stats:
  --days=7                 Days to include, ending yesterday by default.
  --start=YYYY-MM-DD       Start date.
  --end=YYYY-MM-DD         End date.
  --group-by=placement     date | placement | country | placement_sub_id
  --domain=ID              Optional Adsterra domain ID.
  --placement=ID           Optional Adsterra placement ID.
  --country=US             Optional country filter.
  --file=PATH              Read a CSV export instead of calling the API.
  --json                   Print raw JSON instead of a compact table.

Options for goal:
  --days=7                 Days to include, ending yesterday by default.
  --start=YYYY-MM-DD       Start date.
  --end=YYYY-MM-DD         End date.
  --target=10              Required average daily revenue in USD.
  --domain=ID              Optional Adsterra domain ID.
  --file=PATH              Read a CSV export instead of calling the API.
  --sample                 Run with built-in sample rows, no API token needed.
  --json                   Print machine-readable result.

Options for gate:
  --days=7                 Days to include, ending yesterday by default.
  --start=YYYY-MM-DD       Start date.
  --end=YYYY-MM-DD         End date.
  --target=10              Required average daily revenue in USD.
  --domain=ID              Optional Adsterra domain ID.
  --file=PATH              Read a real daily CSV export instead of calling the API.
  --site-url=https://...    Live site to verify. Defaults to https://viadreams.cc.
  --vercel-scope=SLUG       Also inspect Vercel env var names via vercel env ls.
  --json                   Print machine-readable gate result.

Options for recommend:
  --days=7                 Days to include, ending yesterday by default.
  --start=YYYY-MM-DD       Start date.
  --end=YYYY-MM-DD         End date.
  --min-impressions=1000   Minimum impressions before judging CPM.
  --placements-file=PATH   Read placement CSV export instead of calling the API.
  --countries-file=PATH    Read country CSV export instead of calling the API.
  --sample                 Run with built-in sample rows, no API token needed.
  --json                   Print machine-readable recommendations.

Options for readiness:
  --env-file=.env.local     Env file to inspect in addition to process env.
  --vercel-scope=SLUG       Also inspect Vercel env var names via vercel env ls.
  --site-url=https://...    Also fetch and verify the live /ads.txt response.
  --json                   Print machine-readable readiness result.

Options for ads-txt:
  --seller-line='...'       Preflight a seller line copied from Adsterra.
  --env-file=.env.local     Env file to inspect in addition to process env.
  --site-url=https://...    Also fetch and verify the live /ads.txt response.
  --json                   Print machine-readable ads.txt validation result.

Options for setup:
  --env-file=.env.local     Env file to inspect in addition to process env.
  --vercel-scope=SLUG       Include scoped Vercel env add commands.
  --site-url=https://...    Also fetch and verify the live /ads.txt response.
  --csv                    Print CSV for copy/paste into an operating sheet.
  --json                   Print machine-readable setup result.
`;

const ADSTERRA_SELLER_LINE_PATTERN =
  /^adsterra\.com\s*,\s*([a-z0-9_-]+)\s*,\s*DIRECT(?:\s*,\s*[a-z0-9_-]+)?\s*$/i;

const LIVE_INVENTORY_PAGES = [
  {
    name: 'Homepage discovery',
    path: '/en/',
    expectedPlacements: ['site-top-leaderboard', 'home-inline', 'home-tools-grid', 'site-bottom-native'],
  },
  {
    name: 'Tool workspace',
    path: '/en/tools/json-formatter/',
    expectedPlacements: [
      'site-top-leaderboard',
      'tool-top',
      'tool-mid',
      'tool-sidebar-secondary',
      'tool-sidebar-primary',
      'tool-bottom',
      'site-bottom-native',
    ],
  },
  {
    name: 'Blog article',
    path: '/en/blog/cursor-vs-windsurf/',
    expectedPlacements: [
      'site-top-leaderboard',
      'blog-article-top',
      'blog-article-mid',
      'blog-article-bottom',
      'blog-article-sidebar',
      'site-bottom-native',
    ],
  },
  {
    name: 'Blog listing',
    path: '/en/blog/',
    expectedPlacements: ['site-top-leaderboard', 'blog-list-top', 'blog-list-mid', 'blog-list-bottom', 'site-bottom-native'],
  },
  {
    name: 'All tools index',
    path: '/en/tools/',
    expectedPlacements: ['site-top-leaderboard', 'tools-index-top', 'tools-index-mid', 'tools-index-bottom', 'site-bottom-native'],
  },
  {
    name: 'Category landing',
    path: '/en/category/json-tools/',
    expectedPlacements: ['site-top-leaderboard', 'category-top', 'category-mid', 'category-bottom', 'site-bottom-native'],
  },
];

const SOURCE_INVENTORY_CHECKS = [
  {
    name: 'Mobile homepage rectangle',
    sourcePath: 'src/app/[lang]/HomePageClient.tsx',
    expectedPlacements: ['home-mobile-rectangle'],
  },
  {
    name: 'Mobile tool rectangle',
    sourcePath: 'src/components/ToolLayout.tsx',
    expectedPlacements: ['tool-mobile-rectangle'],
  },
  {
    name: 'Mobile tools index rectangle',
    sourcePath: 'src/app/[lang]/tools/page.tsx',
    expectedPlacements: ['tools-index-mobile-rectangle'],
  },
  {
    name: 'Mobile blog listing rectangle',
    sourcePath: 'src/app/[lang]/blog/page.tsx',
    expectedPlacements: ['blog-list-mobile-rectangle'],
  },
  {
    name: 'Mobile blog article rectangle',
    sourcePath: 'src/app/[lang]/blog/[slug]/page.tsx',
    expectedPlacements: ['blog-article-mobile-top-rectangle', 'blog-mobile-rectangle'],
  },
  {
    name: 'Mobile category rectangle',
    sourcePath: 'src/app/[lang]/category/[slug]/page.tsx',
    expectedPlacements: ['category-mobile-rectangle'],
  },
];

function parseArgs(argv) {
  const args = { _: [] };
  for (const arg of argv) {
    if (!arg.startsWith('--')) {
      args._.push(arg);
      continue;
    }
    const [key, value] = arg.slice(2).split('=');
    args[key] = value ?? true;
  }
  return args;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function inclusiveDateCount(start, end) {
  const startTime = Date.parse(`${start}T00:00:00.000Z`);
  const endTime = Date.parse(`${end}T00:00:00.000Z`);
  if (!Number.isFinite(startTime) || !Number.isFinite(endTime) || endTime < startTime) {
    return 0;
  }

  return Math.floor((endTime - startTime) / 86400000) + 1;
}

function getDateRange(args) {
  if (args.start && args.end) {
    return { start: args.start, end: args.end };
  }

  const days = Number(args.days || 7);
  const end = addDays(new Date(), -1);
  const start = addDays(end, -(Number.isFinite(days) && days > 0 ? days - 1 : 6));

  return { start: formatDate(start), end: formatDate(end) };
}

function normalizeHeader(header) {
  return header
    .replace(/^\uFEFF/, '')
    .trim()
    .toLowerCase()
    .replace(/[%$]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(cell);
      cell = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(cell);
      if (row.some(value => value.trim() !== '')) rows.push(row);
      row = [];
      cell = '';
      continue;
    }

    cell += char;
  }

  if (cell !== '' || row.length > 0) {
    row.push(cell);
    if (row.some(value => value.trim() !== '')) rows.push(row);
  }

  if (rows.length === 0) return [];

  const headers = rows[0].map(normalizeHeader);
  return rows.slice(1).map(values => (
    Object.fromEntries(headers.map((header, index) => [header || `column_${index + 1}`, values[index] ?? '']))
  ));
}

async function readCsvFile(filePath) {
  const [{ readFile }, path] = await Promise.all([
    import('node:fs/promises'),
    import('node:path'),
  ]);
  const resolvedPath = path.resolve(process.cwd(), filePath);
  try {
    return parseCsv(await readFile(resolvedPath, 'utf8'));
  } catch (error) {
    console.error(`Could not read CSV file: ${resolvedPath}`);
    console.error(error.message);
    process.exit(1);
  }
}

async function request(path, query = {}) {
  const token = process.env.ADSTERRA_API_KEY;
  if (!token) {
    console.error('Missing ADSTERRA_API_KEY. Generate a publisher API token in Adsterra and pass it via env.');
    process.exit(1);
  }

  const url = new URL(`${API_BASE}/${path}`);
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    headers: {
      Accept: path.endsWith('.json') ? 'application/json' : 'text/csv',
      'X-API-Key': token,
    },
  });

  const body = await response.text();
  if (!response.ok) {
    console.error(`Adsterra API error ${response.status} for ${url.toString()}`);
    console.error(body.slice(0, 2000));
    process.exit(1);
  }

  if (!path.endsWith('.json')) return body;

  try {
    return JSON.parse(body);
  } catch {
    console.error('Adsterra returned non-JSON data:');
    console.error(body.slice(0, 2000));
    process.exit(1);
  }
}

function parseEnvFileText(text) {
  const result = {};

  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const normalized = trimmed.startsWith('export ') ? trimmed.slice(7).trim() : trimmed;
    const equalsIndex = normalized.indexOf('=');
    if (equalsIndex <= 0) continue;

    const key = normalized.slice(0, equalsIndex).trim();
    let value = normalized.slice(equalsIndex + 1).trim();
    if (!key) continue;

    const quote = value[0];
    if ((quote === '"' || quote === "'") && value.endsWith(quote)) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

async function readOptionalTextFile(filePath) {
  const [{ readFile }, path] = await Promise.all([
    import('node:fs/promises'),
    import('node:path'),
  ]);
  const resolvedPath = path.resolve(process.cwd(), filePath);

  try {
    return {
      path: resolvedPath,
      text: await readFile(resolvedPath, 'utf8'),
    };
  } catch {
    return {
      path: resolvedPath,
      text: '',
    };
  }
}

async function listOptionalCsvFiles(dirPath) {
  const [{ readdir }, path] = await Promise.all([
    import('node:fs/promises'),
    import('node:path'),
  ]);
  const resolvedPath = path.resolve(process.cwd(), dirPath);

  try {
    const entries = await readdir(resolvedPath, { withFileTypes: true });
    return entries
      .filter(entry => entry.isFile() && entry.name.toLowerCase().endsWith('.csv'))
      .map(entry => path.join(resolvedPath, entry.name));
  } catch {
    return [];
  }
}

function parseVercelEnvNames(output) {
  const names = new Set();

  for (const line of output.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z][A-Z0-9_]+)\s{2,}/);
    if (!match) continue;

    const name = match[1];
    if (
      name.startsWith('NEXT_PUBLIC_ADSTERRA_') ||
      name === 'ADSTERRA_API_KEY' ||
      name === 'ADSTERRA_ADS_TXT_SELLER_LINE'
    ) {
      names.add(name);
    }
  }

  return Array.from(names).sort();
}

async function loadVercelEnvPresence(scope) {
  if (!scope) {
    return {
      enabled: false,
      names: [],
      error: '',
    };
  }

  const { execFile } = await import('node:child_process');
  const { promisify } = await import('node:util');
  const execFileAsync = promisify(execFile);

  try {
    const { stdout } = await execFileAsync('npx', [
      '--yes',
      'vercel',
      'env',
      'ls',
      '--scope',
      scope,
    ], {
      cwd: process.cwd(),
      maxBuffer: 1024 * 1024,
    });

    return {
      enabled: true,
      names: parseVercelEnvNames(stdout),
      error: '',
    };
  } catch (error) {
    return {
      enabled: true,
      names: [],
      error: error.message || String(error),
    };
  }
}

async function loadLiveAdsTxt(siteUrl) {
  if (!siteUrl) {
    return {
      enabled: false,
      url: '',
      text: '',
      error: '',
    };
  }

  let url;
  try {
    url = new URL('/ads.txt', siteUrl).toString();
  } catch {
    return {
      enabled: true,
      url: siteUrl,
      text: '',
      error: `Invalid site URL: ${siteUrl}`,
    };
  }

  try {
    const response = await fetch(url, {
      headers: { Accept: 'text/plain' },
    });
    const text = await response.text();

    if (!response.ok) {
      return {
        enabled: true,
        url,
        text,
        error: `HTTP ${response.status}`,
      };
    }

    return {
      enabled: true,
      url,
      text,
      error: '',
    };
  } catch (error) {
    return {
      enabled: true,
      url,
      text: '',
      error: error.message || String(error),
    };
  }
}

function extractLivePlacements(html) {
  const placements = [
    ...html.matchAll(/data-ad-placement=["']([^"']+)["']/g),
  ].map(match => match[1]);

  return [...new Set(placements)].sort();
}

async function loadLiveInventory(siteUrl) {
  if (!siteUrl) {
    return {
      enabled: false,
      pages: [],
      missingPlacements: [],
      errors: [],
    };
  }

  let baseUrl;
  try {
    baseUrl = new URL(siteUrl);
  } catch {
    return {
      enabled: true,
      pages: [],
      missingPlacements: [],
      errors: [`Invalid site URL: ${siteUrl}`],
    };
  }

  const pages = await Promise.all(LIVE_INVENTORY_PAGES.map(async (page) => {
    const url = new URL(page.path, baseUrl).toString();

    try {
      const response = await fetch(url, {
        headers: { Accept: 'text/html' },
      });
      const text = await response.text();
      const placements = extractLivePlacements(text);
      const missingPlacements = page.expectedPlacements.filter(placement => !placements.includes(placement));

      return {
        ...page,
        url,
        status: response.ok ? 'OK' : 'ERROR',
        httpStatus: response.status,
        placements,
        missingPlacements,
        error: response.ok ? '' : `HTTP ${response.status}`,
      };
    } catch (error) {
      return {
        ...page,
        url,
        status: 'ERROR',
        httpStatus: 0,
        placements: [],
        missingPlacements: page.expectedPlacements,
        error: error.message || String(error),
      };
    }
  }));

  return {
    enabled: true,
    pages,
    missingPlacements: pages.flatMap(page => (
      page.missingPlacements.map(placement => `${page.path}:${placement}`)
    )),
    errors: pages.filter(page => page.error).map(page => `${page.path}: ${page.error}`),
  };
}

async function loadSourceInventory() {
  const checks = await Promise.all(SOURCE_INVENTORY_CHECKS.map(async (check) => {
    const { text, path } = await readOptionalTextFile(check.sourcePath);
    const placements = check.expectedPlacements.filter(placement => text.includes(placement));
    const missingPlacements = check.expectedPlacements.filter(placement => !placements.includes(placement));

    return {
      ...check,
      path,
      status: text && missingPlacements.length === 0 ? 'OK' : 'WARN',
      sourceFound: Boolean(text),
      placements,
      missingPlacements,
      error: text ? '' : 'source file not found or unreadable',
    };
  }));

  return {
    enabled: true,
    checks,
    missingPlacements: checks.flatMap(check => (
      check.missingPlacements.map(placement => `${check.sourcePath}:${placement}`)
    )),
    errors: checks.filter(check => check.error).map(check => `${check.sourcePath}: ${check.error}`),
  };
}

function envValue(env, key) {
  const value = env[key];
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : '';
}

function sellerLinesFromText(text) {
  return String(text || '')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));
}

function isValidAdsterraSellerLine(line) {
  const match = String(line || '').trim().match(ADSTERRA_SELLER_LINE_PATTERN);
  if (!match) return false;

  return !match[1].toLowerCase().includes('placeholder');
}

function canonicalAdsterraSellerLine(line) {
  const trimmed = String(line || '').trim();
  if (!isValidAdsterraSellerLine(trimmed)) return '';

  return trimmed.replace(/\s+/g, '').toLowerCase();
}

function validateAdsterraSellerLines(text) {
  const lines = sellerLinesFromText(text);
  const validLines = lines.filter(isValidAdsterraSellerLine);
  const invalidLines = lines.filter(line => !isValidAdsterraSellerLine(line));

  return {
    lines,
    validLines,
    invalidLines,
    valid: validLines.length > 0 && invalidLines.length === 0,
    hasValidLine: validLines.length > 0,
  };
}

function buildAdsTxtBody(sellerLines) {
  const validLines = sellerLines.filter(isValidAdsterraSellerLine);
  return [
    '# DevToolBox ads.txt - https://viadreams.cc',
    '# Authorized digital sellers (IAB ads.txt 1.1)',
    '',
    'OWNERDOMAIN=viadreams.cc',
    '',
    validLines.length > 0
      ? '# Adsterra'
      : '# Adsterra - set ADSTERRA_ADS_TXT_SELLER_LINE from the publisher dashboard',
    ...(validLines.length > 0
      ? validLines
      : [
          '# Format: adsterra.com, <publisher-id>, DIRECT, <optional-cert>',
          '# Copy the exact seller line from the Adsterra publisher dashboard.',
        ]),
    '',
  ].join('\n');
}

const ADSTERRA_SETUP_ITEMS = [
  {
    priority: 'P0',
    group: 'Trust and proof',
    name: 'ads.txt seller line',
    envNames: ['ADSTERRA_ADS_TXT_SELLER_LINE'],
    adsterraAction: 'Copy exact ads.txt seller line from the Adsterra publisher dashboard',
    format: 'ads.txt',
    size: 'n/a',
    placement: '/ads.txt',
    purpose: 'Improve demand trust and fill eligibility',
  },
  {
    priority: 'P0',
    group: 'Trust and proof',
    name: 'Publisher API token or daily CSV export',
    envNames: ['ADSTERRA_API_KEY'],
    adsterraAction: 'Generate a Publisher API token, or export a date-grouped revenue CSV',
    format: 'reporting',
    size: 'n/a',
    placement: 'revenue verification',
    purpose: 'Prove the $10/day goal with real Adsterra revenue data',
  },
  {
    priority: 'P0',
    group: 'Required active units',
    name: 'Global top leaderboard',
    envNames: ['NEXT_PUBLIC_ADSTERRA_TOP_KEY'],
    adsterraAction: 'Create or reuse a 728x90 iframe/banner unit',
    format: 'iframe banner',
    size: '728x90',
    placement: 'site-top-leaderboard and leaderboard fallbacks',
    purpose: 'Keep the primary above-the-fold inventory active',
  },
  {
    priority: 'P0',
    group: 'Required active units',
    name: 'Global sidebar rectangle',
    envNames: ['NEXT_PUBLIC_ADSTERRA_SIDEBAR_KEY'],
    adsterraAction: 'Create or reuse a 300x250 iframe/banner unit',
    format: 'iframe banner',
    size: '300x250',
    placement: 'tool-sidebar-primary and rectangle fallbacks',
    purpose: 'Keep the primary desktop sidebar inventory active',
  },
  {
    priority: 'P0',
    group: 'Required active units',
    name: 'Bottom native banner',
    envNames: ['NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT', 'NEXT_PUBLIC_ADSTERRA_NATIVE_KEY'],
    adsterraAction: 'Create or reuse a Native Banner unit and copy both invoke.js URL and container key',
    format: 'native banner',
    size: 'responsive',
    placement: 'site-bottom-native',
    purpose: 'Keep bottom native inventory active across pages',
  },
  {
    priority: 'P1',
    group: 'High-impact experiments',
    name: 'Smart Direct Link',
    envNames: ['NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_URL'],
    adsterraAction: 'Create a Smart Direct Link / Smartlink URL',
    format: 'direct link',
    size: 'n/a',
    placement: 'high-intent partner, support, and fallback surfaces',
    purpose: 'Test click revenue without adding another page-level banner',
  },
  {
    priority: 'P1',
    group: 'High-impact experiments',
    name: 'Mobile sticky banner',
    envNames: ['NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_KEY'],
    adsterraAction: 'Create a mobile 320x50 iframe/banner unit',
    format: 'iframe banner',
    size: '320x50',
    placement: 'mobile-sticky',
    purpose: 'Add high-viewability mobile inventory',
  },
  {
    priority: 'P1',
    group: 'High-impact experiments',
    name: 'Delayed Social Bar',
    envNames: ['NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SCRIPT'],
    adsterraAction: 'Create a Social Bar / high-yield script unit',
    format: 'script',
    size: 'responsive',
    placement: 'site-social-bar',
    purpose: 'Run a capped high-yield format test against bounce rate',
  },
  {
    priority: 'P2',
    group: 'Dedicated RPM placements',
    name: 'Homepage inline leaderboard',
    envNames: ['NEXT_PUBLIC_ADSTERRA_HOME_INLINE_KEY'],
    adsterraAction: 'Create a dedicated 728x90 iframe/banner unit',
    format: 'iframe banner',
    size: '728x90',
    placement: 'home-inline',
    purpose: 'Measure homepage RPM separately from global fallback traffic',
  },
  {
    priority: 'P2',
    group: 'Dedicated RPM placements',
    name: 'Tool page top leaderboard',
    envNames: ['NEXT_PUBLIC_ADSTERRA_TOOL_TOP_KEY'],
    adsterraAction: 'Create a dedicated 728x90 iframe/banner unit',
    format: 'iframe banner',
    size: '728x90',
    placement: 'tool-top',
    purpose: 'Measure tool-page above-fold RPM',
  },
  {
    priority: 'P2',
    group: 'Dedicated RPM placements',
    name: 'Tool page mid leaderboard',
    envNames: ['NEXT_PUBLIC_ADSTERRA_TOOL_MID_KEY'],
    adsterraAction: 'Create a dedicated 728x90 iframe/banner unit',
    format: 'iframe banner',
    size: '728x90',
    placement: 'tool-mid',
    purpose: 'Measure engaged post-tool RPM',
  },
  {
    priority: 'P2',
    group: 'Dedicated RPM placements',
    name: 'Tool page bottom leaderboard',
    envNames: ['NEXT_PUBLIC_ADSTERRA_TOOL_BOTTOM_KEY'],
    adsterraAction: 'Create a dedicated 728x90 iframe/banner unit',
    format: 'iframe banner',
    size: '728x90',
    placement: 'tool-bottom',
    purpose: 'Measure lower-page tool RPM',
  },
  {
    priority: 'P2',
    group: 'Dedicated RPM placements',
    name: 'Tool sidebar secondary rectangle',
    envNames: ['NEXT_PUBLIC_ADSTERRA_SIDEBAR_SECONDARY_KEY'],
    adsterraAction: 'Create a dedicated 300x250 iframe/banner unit',
    format: 'iframe banner',
    size: '300x250',
    placement: 'tool-sidebar-secondary',
    purpose: 'Measure second desktop sidebar rectangle RPM',
  },
  {
    priority: 'P2',
    group: 'Dedicated RPM placements',
    name: 'All tools index top leaderboard',
    envNames: ['NEXT_PUBLIC_ADSTERRA_TOOLS_INDEX_TOP_KEY'],
    adsterraAction: 'Create a dedicated 728x90 iframe/banner unit',
    format: 'iframe banner',
    size: '728x90',
    placement: 'tools-index-top',
    purpose: 'Measure all-tools index top RPM',
  },
  {
    priority: 'P2',
    group: 'Dedicated RPM placements',
    name: 'All tools index bottom leaderboard',
    envNames: ['NEXT_PUBLIC_ADSTERRA_TOOLS_INDEX_BOTTOM_KEY'],
    adsterraAction: 'Create a dedicated 728x90 iframe/banner unit',
    format: 'iframe banner',
    size: '728x90',
    placement: 'tools-index-bottom',
    purpose: 'Measure all-tools index bottom RPM',
  },
  {
    priority: 'P2',
    group: 'Dedicated RPM placements',
    name: 'Blog listing top leaderboard',
    envNames: ['NEXT_PUBLIC_ADSTERRA_BLOG_TOP_KEY'],
    adsterraAction: 'Create a dedicated 728x90 iframe/banner unit',
    format: 'iframe banner',
    size: '728x90',
    placement: 'blog-list-top',
    purpose: 'Measure blog-listing top RPM',
  },
  {
    priority: 'P2',
    group: 'Dedicated RPM placements',
    name: 'Blog listing bottom leaderboard',
    envNames: ['NEXT_PUBLIC_ADSTERRA_BLOG_BOTTOM_KEY'],
    adsterraAction: 'Create a dedicated 728x90 iframe/banner unit',
    format: 'iframe banner',
    size: '728x90',
    placement: 'blog-list-bottom',
    purpose: 'Measure blog-listing bottom RPM',
  },
  {
    priority: 'P2',
    group: 'Dedicated RPM placements',
    name: 'Blog article top leaderboard',
    envNames: ['NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_TOP_KEY'],
    adsterraAction: 'Create a dedicated 728x90 iframe/banner unit',
    format: 'iframe banner',
    size: '728x90',
    placement: 'blog-article-top',
    purpose: 'Measure long-read above-fold RPM',
  },
  {
    priority: 'P2',
    group: 'Dedicated RPM placements',
    name: 'Blog article mid leaderboard',
    envNames: ['NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_MID_KEY'],
    adsterraAction: 'Create a dedicated 728x90 iframe/banner unit',
    format: 'iframe banner',
    size: '728x90',
    placement: 'blog-article-mid',
    purpose: 'Measure engaged post-article RPM',
  },
  {
    priority: 'P2',
    group: 'Dedicated RPM placements',
    name: 'Blog article bottom leaderboard',
    envNames: ['NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_BOTTOM_KEY'],
    adsterraAction: 'Create a dedicated 728x90 iframe/banner unit',
    format: 'iframe banner',
    size: '728x90',
    placement: 'blog-article-bottom',
    purpose: 'Measure lower article RPM',
  },
  {
    priority: 'P2',
    group: 'Dedicated RPM placements',
    name: 'Blog article sidebar rectangle',
    envNames: ['NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_SIDEBAR_KEY'],
    adsterraAction: 'Create a dedicated 300x250 iframe/banner unit',
    format: 'iframe banner',
    size: '300x250',
    placement: 'blog-article-sidebar',
    purpose: 'Measure desktop article sidebar RPM',
  },
  {
    priority: 'P2',
    group: 'Dedicated RPM placements',
    name: 'Category top leaderboard',
    envNames: ['NEXT_PUBLIC_ADSTERRA_CATEGORY_TOP_KEY'],
    adsterraAction: 'Create a dedicated 728x90 iframe/banner unit',
    format: 'iframe banner',
    size: '728x90',
    placement: 'category-top',
    purpose: 'Measure category landing top RPM',
  },
  {
    priority: 'P2',
    group: 'Dedicated RPM placements',
    name: 'Category bottom leaderboard',
    envNames: ['NEXT_PUBLIC_ADSTERRA_CATEGORY_BOTTOM_KEY'],
    adsterraAction: 'Create a dedicated 728x90 iframe/banner unit',
    format: 'iframe banner',
    size: '728x90',
    placement: 'category-bottom',
    purpose: 'Measure category landing bottom RPM',
  },
];

function buildEnvChecks(env) {
  const groups = [
    {
      title: 'Active production ad units',
      severity: 'required',
      checks: [
        ['NEXT_PUBLIC_ADSTERRA_TOP_KEY', 'Global top leaderboard and fallback leaderboard slots'],
        ['NEXT_PUBLIC_ADSTERRA_SIDEBAR_KEY', 'Tool sidebar rectangle and secondary rectangle fallback'],
        ['NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT', 'Bottom native banner script'],
        ['NEXT_PUBLIC_ADSTERRA_NATIVE_KEY', 'Bottom native banner container'],
      ],
    },
    {
      title: 'High-impact optional Adsterra tests',
      severity: 'recommended',
      checks: [
        ['NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_URL', 'Smart Direct Link offers across high-intent surfaces'],
        ['NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_KEY', 'Mobile sticky banner'],
        ['NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SCRIPT', 'Delayed Social Bar experiment'],
      ],
    },
    {
      title: 'Dedicated placement keys for clean RPM reporting',
      severity: 'recommended',
      checks: [
        ['NEXT_PUBLIC_ADSTERRA_HOME_INLINE_KEY', 'Homepage inline slot'],
        ['NEXT_PUBLIC_ADSTERRA_TOOL_TOP_KEY', 'Tool page top slot'],
        ['NEXT_PUBLIC_ADSTERRA_TOOL_MID_KEY', 'Tool page post-tool slot'],
        ['NEXT_PUBLIC_ADSTERRA_TOOL_BOTTOM_KEY', 'Tool page bottom slot'],
        ['NEXT_PUBLIC_ADSTERRA_SIDEBAR_SECONDARY_KEY', 'Tool sidebar secondary rectangle'],
        ['NEXT_PUBLIC_ADSTERRA_TOOLS_INDEX_TOP_KEY', 'All tools index top slot'],
        ['NEXT_PUBLIC_ADSTERRA_TOOLS_INDEX_BOTTOM_KEY', 'All tools index bottom slot'],
        ['NEXT_PUBLIC_ADSTERRA_BLOG_TOP_KEY', 'Blog listing top slot'],
        ['NEXT_PUBLIC_ADSTERRA_BLOG_BOTTOM_KEY', 'Blog listing bottom slot'],
        ['NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_TOP_KEY', 'Blog article top slot'],
        ['NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_MID_KEY', 'Blog article post-body slot'],
        ['NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_BOTTOM_KEY', 'Blog article bottom slot'],
        ['NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_SIDEBAR_KEY', 'Blog article desktop sidebar rectangle'],
        ['NEXT_PUBLIC_ADSTERRA_CATEGORY_TOP_KEY', 'Category landing page top slot'],
        ['NEXT_PUBLIC_ADSTERRA_CATEGORY_BOTTOM_KEY', 'Category landing page bottom slot'],
      ],
    },
    {
      title: 'Revenue verification',
      severity: 'verification',
      checks: [
        ['ADSTERRA_API_KEY', 'Publisher API token for real goal checks'],
      ],
    },
  ];

  return groups.map(group => ({
    ...group,
    checks: group.checks.map(([name, purpose]) => ({
      name,
      purpose,
      present: Boolean(envValue(env, name)),
    })),
  }));
}

function hasMissing(report, names) {
  const missing = new Set([
    ...report.requiredMissing,
    ...report.recommendedMissing,
    ...report.verificationMissing,
  ]);

  return names.some(name => missing.has(name));
}

function vercelEnvCommand(report, name, environment = 'production') {
  const scope = report.vercelEnv.scope ? ` --scope ${report.vercelEnv.scope}` : '';
  return `npx vercel env add ${name} ${environment}${scope}`;
}

function buildReadinessActions(report) {
  const actions = [];

  if (report.requiredMissing.length > 0) {
    actions.push({
      priority: 'P0',
      title: 'Restore required active Adsterra ad units',
      reason: 'Required top/sidebar/native env vars are missing, so existing ad inventory may not render.',
      commands: report.requiredMissing.map(name => vercelEnvCommand(report, name)),
    });
  }

  if (!report.adsTxt.hasAdsterraSellerLine) {
    actions.push({
      priority: 'P0',
      title: 'Fill the exact Adsterra ads.txt seller line',
      reason: 'A missing seller line can reduce demand trust and fill. Copy the exact line from the Adsterra publisher dashboard into Vercel env.',
      commands: [
        vercelEnvCommand(report, 'ADSTERRA_ADS_TXT_SELLER_LINE'),
        'git commit --allow-empty -m "Redeploy with Adsterra ads.txt seller line" && git push origin main',
        report.vercelEnv.scope
          ? `npm run adsterra:readiness -- --vercel-scope=${report.vercelEnv.scope} --site-url=https://viadreams.cc`
          : 'npm run adsterra:readiness -- --site-url=https://viadreams.cc',
      ],
    });
  }

  if (report.verificationMissing.includes('ADSTERRA_API_KEY') && report.reports.csvFiles.length === 0) {
    actions.push({
      priority: 'P0',
      title: 'Add a real revenue verification source',
      reason: 'The $10/day goal cannot be proven from sample data. Use an Adsterra Publisher API token or export a real daily CSV report.',
      commands: [
        'ADSTERRA_API_KEY=... npm run adsterra:goal -- --days=7 --target=10',
        'npm run adsterra:goal -- --file=exports/adsterra-daily.csv --target=10',
      ],
    });
  }

  if (hasMissing(report, ['NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_URL'])) {
    actions.push({
      priority: 'P1',
      title: 'Enable Smart Direct Link surfaces',
      reason: 'The code already shows Direct Link offers in high-intent surfaces when the URL exists, including header, sponsor fallbacks, post-action nudges, and support buttons.',
      commands: [
        'Create a Smart Direct Link / Smartlink unit in Adsterra',
        vercelEnvCommand(report, 'NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_URL'),
        'git commit --allow-empty -m "Redeploy with Adsterra direct link" && git push origin main',
        report.vercelEnv.scope
          ? `npm run adsterra:readiness -- --vercel-scope=${report.vercelEnv.scope}`
          : 'npm run adsterra:readiness',
      ],
    });
  }

  if (hasMissing(report, ['NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_KEY'])) {
    actions.push({
      priority: 'P1',
      title: 'Enable the mobile sticky banner experiment',
      reason: 'Mobile sticky inventory has high viewability and the component is already shipped with fallback and close-state behavior.',
      commands: [
        'Create a 320x50 mobile banner unit in Adsterra',
        vercelEnvCommand(report, 'NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_KEY'),
        'git commit --allow-empty -m "Redeploy with Adsterra mobile sticky" && git push origin main',
      ],
    });
  }

  if (hasMissing(report, ['NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SCRIPT'])) {
    actions.push({
      priority: 'P1',
      title: 'Run a delayed Social Bar test',
      reason: 'The Social Bar can lift revenue per session, but should be tested against bounce rate and returning-user behavior.',
      commands: [
        'Create a Social Bar unit in Adsterra',
        vercelEnvCommand(report, 'NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SCRIPT'),
        `Optional: ${vercelEnvCommand(report, 'NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_DELAY_MS')}`,
      ],
    });
  }

  const dedicatedPlacementVars = report.recommendedMissing.filter(name => (
    name.startsWith('NEXT_PUBLIC_ADSTERRA_') &&
    ![
      'NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_URL',
      'NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_KEY',
      'NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SCRIPT',
    ].includes(name)
  ));

  if (dedicatedPlacementVars.length > 0) {
    actions.push({
      priority: 'P2',
      title: 'Create dedicated placement keys for RPM isolation',
      reason: 'The current site reuses global top/sidebar keys as fallbacks. Dedicated keys are needed to know which surfaces actually earn.',
      commands: [
        ...dedicatedPlacementVars.map(name => vercelEnvCommand(report, name)),
        'npm run adsterra:report -- recommend --days=7 --min-impressions=1000',
      ],
    });
  }

  if (actions.length === 0) {
    actions.push({
      priority: 'OK',
      title: 'Run the real revenue gate',
      reason: 'Configuration readiness has no missing items. The remaining proof is measured Adsterra revenue.',
      commands: [
        'ADSTERRA_API_KEY=... npm run adsterra:goal -- --days=7 --target=10',
      ],
    });
  }

  return actions;
}

async function buildReadinessReport(args) {
  const envFile = args['env-file'] || '.env.local';
  const vercelScope = args['vercel-scope'] || args.scope || '';
  const siteUrl = args['site-url'] || args.site || '';
  const [
    { text: envFileText, path: envFilePath },
    { text: adsTxtText, path: adsTxtPath },
    { text: adsTxtRouteText, path: adsTxtRoutePath },
    csvFiles,
    vercelEnv,
    liveAdsTxt,
    liveInventory,
    sourceInventory,
  ] = await Promise.all([
    readOptionalTextFile(envFile),
    readOptionalTextFile('public/ads.txt'),
    readOptionalTextFile('src/app/ads.txt/route.ts'),
    listOptionalCsvFiles('exports'),
    loadVercelEnvPresence(vercelScope),
    loadLiveAdsTxt(siteUrl),
    loadLiveInventory(siteUrl),
    loadSourceInventory(),
  ]);
  const fileEnv = parseEnvFileText(envFileText);
  const vercelEnvPresence = Object.fromEntries(
    vercelEnv.names.map(name => [name, '__present_in_vercel__'])
  );
  const env = { ...vercelEnvPresence, ...fileEnv, ...process.env };
  const envGroups = buildEnvChecks(env);
  const requiredMissing = envGroups
    .filter(group => group.severity === 'required')
    .flatMap(group => group.checks.filter(check => !check.present).map(check => check.name));
  const recommendedMissing = envGroups
    .filter(group => group.severity === 'recommended')
    .flatMap(group => group.checks.filter(check => !check.present).map(check => check.name));
  const verificationMissing = envGroups
    .filter(group => group.severity === 'verification')
    .flatMap(group => group.checks.filter(check => !check.present).map(check => check.name));
  const adsTxtEnvLine = envValue(env, 'ADSTERRA_ADS_TXT_SELLER_LINE');
  const adsTxtSourceText = [adsTxtText, adsTxtRouteText, adsTxtEnvLine, liveAdsTxt.text].join('\n');
  const envSellerValidation = validateAdsterraSellerLines(adsTxtEnvLine);
  const liveSellerValidation = validateAdsterraSellerLines(liveAdsTxt.text);
  const liveCanonicalSellerLines = new Set(liveSellerValidation.validLines.map(canonicalAdsterraSellerLine));
  const liveMissingEnvSellerLine = Boolean(adsTxtEnvLine) && liveAdsTxt.enabled
    ? envSellerValidation.validLines.filter(line => !liveCanonicalSellerLines.has(canonicalAdsterraSellerLine(line)))
    : [];
  const hasAdsterraSellerLine = validateAdsterraSellerLines(adsTxtText).hasValidLine ||
    envSellerValidation.hasValidLine ||
    liveSellerValidation.hasValidLine;
  const invalidAdsTxtEnvLines = envSellerValidation.invalidLines;
  const hasAdsTxtPlaceholder = !adsTxtEnvLine &&
    /ADSTERRA_PUBLISHER_ID_PLACEHOLDER/.test(adsTxtSourceText);
  const hasOwnerDomain = /^OWNERDOMAIN=viadreams\.cc\s*$/im.test(adsTxtSourceText) ||
    /OWNER_DOMAIN\s*=\s*['"]viadreams\.cc['"]/.test(adsTxtRouteText);
  const revenueCsvFiles = csvFiles.filter(file => /adsterra|daily|placement|country|revenue/i.test(file));
  const hasRevenueProofSource = Boolean(envValue(env, 'ADSTERRA_API_KEY')) || revenueCsvFiles.length > 0;
  const warnings = [
    ...recommendedMissing.map(name => `Missing recommended env: ${name}`),
    ...verificationMissing.map(name => `Missing verification env: ${name}`),
  ];

  if (!hasAdsterraSellerLine) {
    warnings.push('ads.txt does not contain the exact active Adsterra seller line.');
  }

  if (invalidAdsTxtEnvLines.length > 0) {
    warnings.push('ADSTERRA_ADS_TXT_SELLER_LINE is present but does not match the expected Adsterra ads.txt format.');
  }

  if (liveMissingEnvSellerLine.length > 0) {
    warnings.push('Live ads.txt does not contain the exact seller line from ADSTERRA_ADS_TXT_SELLER_LINE.');
  }

  if (!hasRevenueProofSource) {
    warnings.push('No API token or exports/*.csv report is available for real revenue goal verification.');
  }

  if (vercelEnv.error) {
    warnings.push(`Could not inspect Vercel env names: ${vercelEnv.error}`);
  }

  if (liveAdsTxt.error) {
    warnings.push(`Could not verify live ads.txt: ${liveAdsTxt.error}`);
  }

  for (const error of liveInventory.errors) {
    warnings.push(`Could not verify live ad inventory: ${error}`);
  }

  for (const missingPlacement of liveInventory.missingPlacements) {
    warnings.push(`Live ad inventory missing expected placement: ${missingPlacement}`);
  }

  for (const error of sourceInventory.errors) {
    warnings.push(`Could not verify source ad inventory: ${error}`);
  }

  for (const missingPlacement of sourceInventory.missingPlacements) {
    warnings.push(`Source ad inventory missing expected client placement: ${missingPlacement}`);
  }

  const status = requiredMissing.length > 0
    ? 'FAIL'
    : warnings.length > 0
    ? 'WARN'
    : 'PASS';

  const report = {
    status,
    envFile: {
      path: envFilePath,
      found: Boolean(envFileText),
    },
    vercelEnv: {
      enabled: vercelEnv.enabled,
      scope: vercelScope,
      names: vercelEnv.names,
      error: vercelEnv.error,
    },
    adsTxt: {
      path: adsTxtPath,
      found: Boolean(adsTxtText),
      routePath: adsTxtRoutePath,
      routeFound: Boolean(adsTxtRouteText),
      liveUrl: liveAdsTxt.url,
      liveChecked: liveAdsTxt.enabled,
      liveFound: Boolean(liveAdsTxt.text && !liveAdsTxt.error),
      liveError: liveAdsTxt.error,
      hasOwnerDomain,
      hasAdsterraSellerLine,
      liveMatchesEnvLine: Boolean(adsTxtEnvLine) && liveAdsTxt.enabled && liveMissingEnvSellerLine.length === 0,
      hasPlaceholder: hasAdsTxtPlaceholder,
      envName: 'ADSTERRA_ADS_TXT_SELLER_LINE',
      envPresent: Boolean(adsTxtEnvLine),
    },
    reports: {
      csvFiles: revenueCsvFiles,
      hasRevenueProofSource,
    },
    liveInventory,
    sourceInventory,
    envGroups,
    requiredMissing,
    recommendedMissing,
    verificationMissing,
    warnings,
  };
  report.nextActions = buildReadinessActions(report);

  return report;
}

function buildReadinessPresenceMap(report) {
  const presence = new Map();

  for (const group of report.envGroups) {
    for (const check of group.checks) {
      presence.set(check.name, check.present);
    }
  }

  presence.set(
    'ADSTERRA_ADS_TXT_SELLER_LINE',
    report.adsTxt.envPresent || report.adsTxt.hasAdsterraSellerLine
  );
  presence.set('ADSTERRA_API_KEY', report.reports.hasRevenueProofSource);

  return presence;
}

function setupItemCommands(report, item, missingEnvNames) {
  if (item.envNames.includes('ADSTERRA_API_KEY')) {
    return [
      'ADSTERRA_API_KEY=... npm run adsterra:goal -- --days=7 --target=10',
      'npm run adsterra:goal -- --file=exports/adsterra-daily.csv --target=10',
    ];
  }

  return missingEnvNames.map(name => vercelEnvCommand(report, name));
}

async function buildSetupReport(args) {
  const readiness = await buildReadinessReport(args);
  const presence = buildReadinessPresenceMap(readiness);
  const items = ADSTERRA_SETUP_ITEMS.map((item) => {
    const missingEnvNames = item.envNames.filter(name => !presence.get(name));

    return {
      ...item,
      status: missingEnvNames.length === 0 ? 'OK' : 'MISSING',
      env: item.envNames.join(' + '),
      missingEnvNames,
      commands: missingEnvNames.length > 0 ? setupItemCommands(readiness, item, missingEnvNames) : [],
    };
  });

  return {
    status: items.some(item => item.status === 'MISSING') ? 'INCOMPLETE' : 'READY',
    missingCount: items.filter(item => item.status === 'MISSING').length,
    configuredCount: items.filter(item => item.status === 'OK').length,
    readinessStatus: readiness.status,
    readinessWarnings: readiness.warnings,
    items,
  };
}

async function buildAdsTxtReport(args) {
  const envFile = args['env-file'] || '.env.local';
  const siteUrl = args['site-url'] || args.site || '';
  const [
    { text: envFileText, path: envFilePath },
    liveAdsTxt,
  ] = await Promise.all([
    readOptionalTextFile(envFile),
    loadLiveAdsTxt(siteUrl),
  ]);
  const env = { ...parseEnvFileText(envFileText), ...process.env };
  const inputText = args['seller-line'] || args.sellerLine || envValue(env, 'ADSTERRA_ADS_TXT_SELLER_LINE');
  const inputValidation = validateAdsterraSellerLines(inputText);
  const liveValidation = validateAdsterraSellerLines(liveAdsTxt.text);
  const liveCanonicalLines = new Set(liveValidation.validLines.map(canonicalAdsterraSellerLine));
  const liveMissingInputLines = liveAdsTxt.enabled
    ? inputValidation.validLines.filter(line => !liveCanonicalLines.has(canonicalAdsterraSellerLine(line)))
    : [];
  const preview = buildAdsTxtBody(inputValidation.validLines);
  const status = inputValidation.valid && (
    !liveAdsTxt.enabled ||
    (liveValidation.hasValidLine && liveMissingInputLines.length === 0 && !liveAdsTxt.error)
  )
    ? 'PASS'
    : 'FAIL';
  const warnings = [];

  if (!inputValidation.hasValidLine) {
    warnings.push('No valid Adsterra seller line found in --seller-line, process env, or env file.');
  }

  if (inputValidation.invalidLines.length > 0) {
    warnings.push('One or more provided seller lines are invalid and would be ignored by the ads.txt route.');
  }

  if (liveAdsTxt.enabled && !liveValidation.hasValidLine) {
    warnings.push(`Live ads.txt does not contain a valid Adsterra seller line: ${liveAdsTxt.url}`);
  }

  if (liveMissingInputLines.length > 0) {
    warnings.push('Live ads.txt does not contain the provided Adsterra seller line.');
  }

  if (liveAdsTxt.error) {
    warnings.push(`Could not verify live ads.txt: ${liveAdsTxt.error}`);
  }

  return {
    status,
    envFile: {
      path: envFilePath,
      found: Boolean(envFileText),
    },
    input: inputValidation,
    live: {
      checked: liveAdsTxt.enabled,
      url: liveAdsTxt.url,
      error: liveAdsTxt.error,
      hasValidLine: liveValidation.hasValidLine,
      matchesInput: liveAdsTxt.enabled && inputValidation.hasValidLine && liveMissingInputLines.length === 0,
      validLines: liveValidation.validLines,
    },
    preview,
    warnings,
  };
}

function csvValue(value) {
  const text = String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function printAdsTxtReport(report) {
  console.log('Adsterra ads.txt validation');
  console.log(`Status: ${report.status}`);
  console.log(`Env file: ${report.envFile.found ? 'found' : 'missing'} (${report.envFile.path})`);
  console.log(`Input valid lines: ${report.input.validLines.length}`);
  console.log(`Input invalid lines: ${report.input.invalidLines.length}`);

  if (report.live.checked) {
    console.log(`Live ads.txt: ${report.live.hasValidLine ? 'OK' : 'MISSING'} (${report.live.url}${report.live.error ? `, ${report.live.error}` : ''})`);
    console.log(`Live seller line matches input: ${report.live.matchesInput ? 'OK' : 'MISSING'}`);
  }

  if (report.warnings.length > 0) {
    console.log('\nWarnings');
    for (const warning of report.warnings) {
      console.log(`  - ${warning}`);
    }
  }

  if (report.input.hasValidLine) {
    console.log('\nPreview');
    console.log(report.preview.trimEnd());
  }

  console.log('\nNext actions');
  if (report.input.hasValidLine) {
    console.log('  - Add the validated line to Vercel production env:');
    console.log('    $ npx vercel env add ADSTERRA_ADS_TXT_SELLER_LINE production --scope arenas-projects-ac293cdb');
    console.log('  - Redeploy and verify live ads.txt:');
    console.log('    $ git commit --allow-empty -m "Redeploy with Adsterra ads.txt seller line" && git push origin main');
    console.log('    $ npm run adsterra:ads-txt -- --site-url=https://viadreams.cc');
  } else {
    console.log('  - Copy the exact seller line from the Adsterra publisher dashboard.');
    console.log('  - Preflight it before adding the Vercel env:');
    console.log("    $ npm run adsterra:ads-txt -- --seller-line='adsterra.com, <publisher-id>, DIRECT'");
  }
}

function printSetupCsv(report) {
  const columns = [
    'priority',
    'group',
    'status',
    'name',
    'env',
    'format',
    'size',
    'placement',
    'adsterraAction',
    'purpose',
    'commands',
  ];

  console.log(columns.map(csvValue).join(','));
  for (const item of report.items) {
    const row = {
      ...item,
      commands: item.commands.join('\n'),
    };
    console.log(columns.map(column => csvValue(row[column])).join(','));
  }
}

function printSetupReport(report) {
  console.log('Adsterra setup checklist');
  console.log(`Status: ${report.status}`);
  console.log(`Configured items: ${report.configuredCount}`);
  console.log(`Missing items: ${report.missingCount}`);

  const groupKeys = Array.from(new Set(
    ADSTERRA_SETUP_ITEMS.map(item => `${item.priority}|${item.group}`)
  ));

  for (const key of groupKeys) {
    const [priority, group] = key.split('|');
    const items = report.items.filter(item => item.priority === priority && item.group === group);
    console.log(`\n${priority} ${group}`);

    for (const item of items) {
      console.log(`  - ${item.status} ${item.name}`);
      console.log(`    Env: ${item.env}`);
      console.log(`    Format: ${item.format}; size: ${item.size}; placement: ${item.placement}`);
      console.log(`    Dashboard: ${item.adsterraAction}`);
      console.log(`    Purpose: ${item.purpose}`);

      if (item.commands.length > 0) {
        for (const command of item.commands) {
          console.log(`    $ ${command}`);
        }
      }
    }
  }

  if (report.readinessWarnings.length > 0) {
    console.log('\nReadiness warnings');
    for (const warning of report.readinessWarnings) {
      console.log(`  - ${warning}`);
    }
  }

  console.log('\nCompletion gate');
  console.log('  - Run `npm run adsterra:goal -- --days=7 --target=10` with a real API token, or run it against a real daily CSV export.');
  console.log('  - Do not treat this setup checklist as revenue proof; it only prepares the site to measure and optimize Adsterra revenue.');
}

function printReadinessReport(report) {
  console.log('Adsterra monetization readiness');
  console.log(`Status: ${report.status}`);
  console.log(`Env file: ${report.envFile.found ? 'found' : 'missing'} (${report.envFile.path})`);
  if (report.vercelEnv.enabled) {
    console.log(`Vercel env names: ${report.vercelEnv.error ? 'unavailable' : `${report.vercelEnv.names.length} found`} (${report.vercelEnv.scope})`);
  }

  for (const group of report.envGroups) {
    console.log(`\n${group.title}`);
    for (const check of group.checks) {
      console.log(`  - ${check.present ? 'OK' : 'MISSING'} ${check.name}: ${check.purpose}`);
    }
  }

  console.log('\nads.txt');
  console.log(`  - ${report.adsTxt.found ? 'OK static file' : report.adsTxt.routeFound ? 'OK no static file shadowing route' : 'MISSING static file'}: ${report.adsTxt.path}`);
  console.log(`  - ${report.adsTxt.routeFound ? 'OK' : 'MISSING'} dynamic route: ${report.adsTxt.routePath}`);
  if (report.adsTxt.liveChecked) {
    console.log(`  - ${report.adsTxt.liveFound ? 'OK' : 'MISSING'} live response: ${report.adsTxt.liveUrl}${report.adsTxt.liveError ? ` (${report.adsTxt.liveError})` : ''}`);
  }
  console.log(`  - ${report.adsTxt.envPresent ? 'OK' : 'MISSING'} ${report.adsTxt.envName}`);
  console.log(`  - ${report.adsTxt.hasOwnerDomain ? 'OK' : 'MISSING'} OWNERDOMAIN=viadreams.cc`);
  console.log(`  - ${report.adsTxt.hasAdsterraSellerLine ? 'OK' : 'MISSING'} active Adsterra seller line`);
  if (report.adsTxt.liveChecked && report.adsTxt.envPresent) {
    console.log(`  - ${report.adsTxt.liveMatchesEnvLine ? 'OK' : 'MISSING'} live seller line matches env`);
  }
  if (report.adsTxt.hasPlaceholder) {
    console.log('  - WARNING placeholder publisher ID is still present');
  }

  console.log('\nRevenue proof source');
  console.log(`  - ${report.reports.hasRevenueProofSource ? 'OK' : 'MISSING'} API token or CSV export for real goal checks`);
  if (report.reports.csvFiles.length > 0) {
    for (const file of report.reports.csvFiles) {
      console.log(`    ${file}`);
    }
  }

  if (report.liveInventory.enabled) {
    console.log('\nLive ad inventory');
    for (const page of report.liveInventory.pages) {
      const status = page.status === 'OK' && page.missingPlacements.length === 0 ? 'OK' : 'WARN';
      console.log(`  - ${status} ${page.name}: ${page.url}`);
      console.log(`    placements: ${page.placements.length > 0 ? page.placements.join(', ') : 'none found'}`);
      if (page.missingPlacements.length > 0) {
        console.log(`    missing: ${page.missingPlacements.join(', ')}`);
      }
      if (page.error) {
        console.log(`    error: ${page.error}`);
      }
    }
  }

  if (report.sourceInventory.enabled) {
    console.log('\nSource ad inventory');
    for (const check of report.sourceInventory.checks) {
      const status = check.status === 'OK' && check.missingPlacements.length === 0 ? 'OK' : 'WARN';
      console.log(`  - ${status} ${check.name}: ${check.sourcePath}`);
      console.log(`    placements: ${check.placements.length > 0 ? check.placements.join(', ') : 'none found'}`);
      if (check.missingPlacements.length > 0) {
        console.log(`    missing: ${check.missingPlacements.join(', ')}`);
      }
      if (check.error) {
        console.log(`    error: ${check.error}`);
      }
    }
  }

  if (report.warnings.length > 0) {
    console.log('\nWarnings');
    for (const warning of report.warnings) {
      console.log(`  - ${warning}`);
    }
  }

  if (report.nextActions.length > 0) {
    console.log('\nNext actions');
    for (const action of report.nextActions) {
      console.log(`  - ${action.priority} ${action.title}`);
      console.log(`    ${action.reason}`);
      for (const command of action.commands) {
        console.log(`    $ ${command}`);
      }
    }
  }

  console.log('\nNote: readiness checks configuration only. Use `npm run adsterra:goal` with the API token or a real CSV export to prove the $10/day revenue goal.');
}

function rowsFromStats(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  for (const key of ['items', 'data', 'result', 'rows', 'stats']) {
    if (Array.isArray(payload[key])) return payload[key];
  }

  return [payload];
}

function valueFor(row, candidates) {
  for (const key of candidates) {
    if (row[key] !== undefined && row[key] !== null) return row[key];
  }
  return '';
}

function numberFor(row, candidates) {
  const raw = valueFor(row, candidates);
  if (raw === '') return 0;
  const parsed = Number(String(raw).replace(/[$,%\s,]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function labelFor(row, candidates, fallback) {
  const value = valueFor(row, candidates);
  return value === '' ? fallback : String(value);
}

function dimensionCandidateKeys(dimension) {
  const keys = [dimension, `${dimension}_name`, `${dimension}_id`];

  if (dimension === 'placement') {
    keys.push('ad_unit', 'ad_unit_name', 'ad_unit_id', 'zone', 'zone_id', 'spot', 'spot_id');
  }

  if (dimension === 'country') {
    keys.push('country_code', 'country_name', 'geo', 'geo_name');
  }

  return keys;
}

function normalizeMetricRows(payload, dimension) {
  return rowsFromStats(payload).map((row) => {
    const impressions = numberFor(row, ['impressions', 'impression', 'views', 'loads']);
    const clicks = numberFor(row, ['clicks', 'click']);
    const revenue = numberFor(row, ['revenue', 'revenue_usd', 'profit', 'profit_usd', 'earnings', 'earnings_usd', 'income']);
    const cpmFromApi = numberFor(row, ['cpm', 'ecpm', 'cpm_usd', 'ecpm_usd']);
    const ctrFromApi = numberFor(row, ['ctr', 'ctr_percent']);
    const cpm = cpmFromApi || (impressions > 0 ? (revenue / impressions) * 1000 : 0);
    const ctr = ctrFromApi || (impressions > 0 ? (clicks / impressions) * 100 : 0);

    return {
      name: labelFor(row, dimensionCandidateKeys(dimension), 'unknown'),
      impressions,
      clicks,
      ctr,
      cpm,
      revenue,
    };
  });
}

function median(values) {
  const sorted = values.filter(value => value > 0).sort((a, b) => a - b);
  if (sorted.length === 0) return 0;
  const midpoint = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[midpoint - 1] + sorted[midpoint]) / 2
    : sorted[midpoint];
}

function money(value) {
  return `$${value.toFixed(2)}`;
}

function percentage(value) {
  return `${value.toFixed(2)}%`;
}

function buildRecommendations({ placementPayload, countryPayload, minImpressions }) {
  const placements = normalizeMetricRows(placementPayload, 'placement')
    .sort((a, b) => b.revenue - a.revenue);
  const countries = normalizeMetricRows(countryPayload, 'country')
    .sort((a, b) => b.revenue - a.revenue);

  const placementMedianCpm = median(placements.map(row => row.cpm));
  const countryMedianCpm = median(countries.map(row => row.cpm));

  const scalablePlacements = placements
    .filter(row => row.impressions >= minImpressions && placementMedianCpm > 0 && row.cpm >= placementMedianCpm * 1.25)
    .slice(0, 5);
  const weakPlacements = placements
    .filter(row => row.impressions >= minImpressions && placementMedianCpm > 0 && row.cpm <= placementMedianCpm * 0.5)
    .slice(0, 5);
  const highValueCountries = countries
    .filter(row => row.impressions >= minImpressions && countryMedianCpm > 0 && row.cpm >= countryMedianCpm * 1.25)
    .slice(0, 8);

  return {
    minImpressions,
    baselines: {
      placementMedianCpm,
      countryMedianCpm,
    },
    topPlacements: placements.slice(0, 8),
    scalablePlacements,
    weakPlacements,
    topCountries: countries.slice(0, 10),
    highValueCountries,
  };
}

function printRows(title, rows) {
  console.log(`\n${title}`);
  if (rows.length === 0) {
    console.log('  No qualified rows.');
    return;
  }

  for (const row of rows) {
    console.log(
      `  - ${row.name}: revenue ${money(row.revenue)}, CPM ${money(row.cpm)}, CTR ${percentage(row.ctr)}, impressions ${Math.round(row.impressions)}`
    );
  }
}

function printRecommendations(report) {
  console.log('Adsterra optimization recommendations');
  console.log(`Minimum impressions for CPM decisions: ${report.minImpressions}`);
  console.log(`Placement median CPM: ${money(report.baselines.placementMedianCpm)}`);
  console.log(`Country median CPM: ${money(report.baselines.countryMedianCpm)}`);

  printRows('Top revenue placements', report.topPlacements);
  printRows('Scale candidates: high CPM placements', report.scalablePlacements);
  printRows('Review candidates: low CPM placements with enough traffic', report.weakPlacements);
  printRows('Top revenue countries', report.topCountries);
  printRows('High-value countries: CPM above country baseline', report.highValueCountries);

  console.log('\nNext actions');
  console.log('  - Create dedicated Adsterra units for scalable placements so RPM is isolated.');
  console.log('  - Move or remove weak placements only after checking bounce rate and revenue/session in GA.');
  console.log('  - Write more English content for high-value countries and categories that already monetize.');
  console.log('  - Keep country and placement winners separate from generic fallback ad keys.');
}

function rowDate(row) {
  const value = valueFor(row, ['date', 'day']);
  return value === '' ? '' : String(value).slice(0, 10);
}

function buildGoalReport({ payload, start, end, days, targetDailyRevenue }) {
  const rows = rowsFromStats(payload);
  const dailyRevenue = new Map();
  let totalRevenue = 0;

  for (const row of rows) {
    const revenue = numberFor(row, ['revenue', 'revenue_usd', 'profit', 'profit_usd', 'earnings', 'earnings_usd', 'income']);
    totalRevenue += revenue;

    const date = rowDate(row);
    if (date) {
      dailyRevenue.set(date, (dailyRevenue.get(date) || 0) + revenue);
    }
  }

  const inferredDays = dailyRevenue.size || inclusiveDateCount(start, end) || days;
  const normalizedDays = Number.isFinite(inferredDays) && inferredDays > 0 ? inferredDays : 1;
  const averageDailyRevenue = totalRevenue / normalizedDays;
  const requiredTotalRevenue = targetDailyRevenue * normalizedDays;
  const gapPerDay = Math.max(0, targetDailyRevenue - averageDailyRevenue);
  const requiredAdditionalRevenue = Math.max(0, requiredTotalRevenue - totalRevenue);
  const dailyRows = Array.from(dailyRevenue.entries())
    .map(([date, revenue]) => ({ date, revenue }))
    .sort((a, b) => a.date.localeCompare(b.date));
  const periodStart = dailyRows[0]?.date || start;
  const periodEnd = dailyRows[dailyRows.length - 1]?.date || end;

  return {
    achieved: averageDailyRevenue >= targetDailyRevenue,
    targetDailyRevenue,
    start: periodStart,
    end: periodEnd,
    days: normalizedDays,
    totalRevenue,
    averageDailyRevenue,
    requiredTotalRevenue,
    gapPerDay,
    requiredAdditionalRevenue,
    rowCount: rows.length,
    dailyRows,
  };
}

function sampleGoalRows() {
  return [
    { date: '2026-05-12', revenue: 8.25 },
    { date: '2026-05-13', revenue: 9.8 },
    { date: '2026-05-14', revenue: 10.4 },
    { date: '2026-05-15', revenue: 11.1 },
    { date: '2026-05-16', revenue: 10.95 },
    { date: '2026-05-17', revenue: 11.4 },
    { date: '2026-05-18', revenue: 12.2 },
  ];
}

async function buildGoalReportFromArgs(args, { allowSample = true } = {}) {
  const { start, end } = getDateRange(args);
  const days = Number(args.days || inclusiveDateCount(start, end) || 7);
  const targetDailyRevenue = Number(args.target || 10);

  if (args.sample && !allowSample) {
    return {
      report: null,
      error: 'The final gate does not allow --sample; use a real Adsterra API token or a real daily CSV export.',
    };
  }

  if (!args.file && !args.sample && !envValue(process.env, 'ADSTERRA_API_KEY')) {
    return {
      report: null,
      error: 'Missing ADSTERRA_API_KEY. Generate a publisher API token in Adsterra and pass it via env, or use --file=exports/adsterra-daily.csv.',
    };
  }

  const payload = args.file
    ? await readCsvFile(args.file)
    : args.sample
    ? sampleGoalRows()
    : await request('stats.json', {
        start_date: start,
        finish_date: end,
        group_by: 'date',
        domain: args.domain,
      });

  return {
    report: buildGoalReport({
      payload,
      start,
      end,
      days: Number.isFinite(days) && days > 0 ? days : 7,
      targetDailyRevenue: Number.isFinite(targetDailyRevenue) && targetDailyRevenue > 0 ? targetDailyRevenue : 10,
    }),
    error: '',
  };
}

function summarizeAdsTxtForGate(report) {
  return {
    status: report.status,
    inputValid: report.input.valid,
    inputValidLineCount: report.input.validLines.length,
    inputInvalidLineCount: report.input.invalidLines.length,
    live: {
      checked: report.live.checked,
      url: report.live.url,
      error: report.live.error,
      hasValidLine: report.live.hasValidLine,
      matchesInput: report.live.matchesInput,
    },
    warnings: report.warnings,
  };
}

async function buildGateReport(args) {
  const siteUrl = args['site-url'] || args.site || 'https://viadreams.cc';
  const gateArgs = {
    ...args,
    'site-url': siteUrl,
  };
  const [adsTxt, readiness, goalResult] = await Promise.all([
    buildAdsTxtReport(gateArgs),
    buildReadinessReport(gateArgs),
    buildGoalReportFromArgs(gateArgs, { allowSample: false }),
  ]);
  const failures = [];

  if (adsTxt.status !== 'PASS') {
    failures.push('Live ads.txt does not contain the configured Adsterra seller line.');
  }

  if (readiness.vercelEnv.enabled && !readiness.vercelEnv.error && readiness.requiredMissing.length > 0) {
    failures.push(`Required Adsterra ad env vars are missing: ${readiness.requiredMissing.join(', ')}`);
  }

  if (readiness.liveInventory.errors.length > 0 || readiness.liveInventory.missingPlacements.length > 0) {
    failures.push('Live ad inventory is missing one or more expected placements.');
  }

  if (readiness.sourceInventory.errors.length > 0 || readiness.sourceInventory.missingPlacements.length > 0) {
    failures.push('Source ad inventory is missing one or more expected mobile placements.');
  }

  if (!goalResult.report) {
    failures.push(goalResult.error);
  } else if (!goalResult.report.achieved) {
    failures.push(
      `Measured Adsterra revenue is ${money(goalResult.report.averageDailyRevenue)} / day, below the ${money(goalResult.report.targetDailyRevenue)} / day target.`
    );
  }

  return {
    status: failures.length === 0 ? 'PASS' : 'FAIL',
    achieved: failures.length === 0,
    siteUrl,
    adsTxt: summarizeAdsTxtForGate(adsTxt),
    readiness: {
      status: readiness.status,
      vercelEnvChecked: readiness.vercelEnv.enabled && !readiness.vercelEnv.error,
      requiredMissing: readiness.requiredMissing,
      verificationMissing: readiness.verificationMissing,
      recommendedMissing: readiness.recommendedMissing,
      liveInventoryMissing: readiness.liveInventory.missingPlacements,
      sourceInventoryMissing: readiness.sourceInventory.missingPlacements,
      warningCount: readiness.warnings.length,
    },
    goal: goalResult.report,
    failures,
  };
}

function printGoalReport(report) {
  console.log('Adsterra revenue goal check');
  console.log(`Status: ${report.achieved ? 'PASS' : 'FAIL'}`);
  console.log(`Period: ${report.start} to ${report.end} (${report.days} days)`);
  console.log(`Target average: ${money(report.targetDailyRevenue)} / day`);
  console.log(`Actual average: ${money(report.averageDailyRevenue)} / day`);
  console.log(`Total revenue: ${money(report.totalRevenue)} of ${money(report.requiredTotalRevenue)} required`);

  if (!report.achieved) {
    console.log(`Gap: ${money(report.gapPerDay)} / day, ${money(report.requiredAdditionalRevenue)} total for this period`);
  }

  if (report.dailyRows.length > 0) {
    console.log('\nDaily revenue');
    for (const row of report.dailyRows) {
      console.log(`  - ${row.date}: ${money(row.revenue)}`);
    }
  } else {
    console.log('\nDaily revenue breakdown was not present in the source data.');
    console.log('Use a date-grouped Adsterra export or API report for per-day validation.');
  }
}

function printGateReport(report) {
  console.log('Adsterra revenue completion gate');
  console.log(`Status: ${report.status}`);
  console.log(`Site: ${report.siteUrl}`);
  console.log(`ads.txt: ${report.adsTxt.status}`);
  if (report.adsTxt.live.checked) {
    console.log(`Live seller line: ${report.adsTxt.live.hasValidLine ? 'present' : 'missing'}`);
    console.log(`Live seller line matches input: ${report.adsTxt.live.matchesInput ? 'yes' : 'no'}`);
  }
  console.log(`Live ad inventory: ${report.readiness.liveInventoryMissing.length === 0 ? 'OK' : 'MISSING'}`);
  console.log(
    `Required Vercel ad env vars: ${
      report.readiness.vercelEnvChecked
        ? report.readiness.requiredMissing.length === 0 ? 'OK' : 'MISSING'
        : 'not checked'
    }`
  );

  if (report.goal) {
    console.log(`Revenue period: ${report.goal.start} to ${report.goal.end} (${report.goal.days} days)`);
    console.log(`Target average: ${money(report.goal.targetDailyRevenue)} / day`);
    console.log(`Actual average: ${money(report.goal.averageDailyRevenue)} / day`);
    console.log(`Total revenue: ${money(report.goal.totalRevenue)} of ${money(report.goal.requiredTotalRevenue)} required`);
  } else {
    console.log('Revenue period: not verified');
  }

  if (report.failures.length > 0) {
    console.log('\nFailures');
    for (const failure of report.failures) {
      console.log(`  - ${failure}`);
    }
  }

  if (report.readiness.warningCount > 0) {
    console.log(`\nReadiness warnings: ${report.readiness.warningCount}`);
    console.log('Run `npm run adsterra:readiness -- --vercel-scope=arenas-projects-ac293cdb --site-url=https://viadreams.cc` for the full list.');
  }
}

function printStatsTable(payload) {
  const rows = rowsFromStats(payload);
  if (rows.length === 0) {
    console.log('No rows returned.');
    return;
  }

  const columns = [
    ['date', ['date', 'day']],
    ['domain', ['domain', 'domain_name', 'domain_id']],
    ['placement', ['placement', 'placement_name', 'placement_id', 'ad_unit', 'ad_unit_name', 'ad_unit_id', 'zone', 'zone_id']],
    ['country', ['country', 'country_code', 'country_name', 'geo']],
    ['impressions', ['impressions', 'impression', 'views', 'loads']],
    ['clicks', ['clicks', 'click']],
    ['ctr', ['ctr', 'ctr_percent']],
    ['cpm', ['cpm', 'ecpm', 'cpm_usd', 'ecpm_usd']],
    ['revenue', ['revenue', 'revenue_usd', 'profit', 'profit_usd', 'earnings', 'earnings_usd', 'income']],
  ];

  const normalized = rows.map((row) => (
    Object.fromEntries(columns.map(([label, keys]) => [label, String(valueFor(row, keys))]))
  ));

  const widths = Object.fromEntries(
    columns.map(([label]) => [
      label,
      Math.min(
        24,
        Math.max(label.length, ...normalized.map((row) => row[label].length))
      ),
    ])
  );

  const formatCell = (label, value) => value.slice(0, widths[label]).padEnd(widths[label], ' ');
  const header = columns.map(([label]) => formatCell(label, label)).join('  ');
  const divider = columns.map(([label]) => '-'.repeat(widths[label])).join('  ');

  console.log(header);
  console.log(divider);
  for (const row of normalized) {
    console.log(columns.map(([label]) => formatCell(label, row[label])).join('  '));
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0] || 'stats';

  if (args.help || args.h) {
    console.log(HELP.trim());
    return;
  }

  if (command === 'domains') {
    console.log(await request('domains.csv'));
    return;
  }

  if (command === 'placements') {
    console.log(await request('placements.csv'));
    return;
  }

  if (command === 'readiness') {
    const report = await buildReadinessReport(args);

    if (args.json) {
      console.log(JSON.stringify(report, null, 2));
    } else {
      printReadinessReport(report);
    }

    if (report.status === 'FAIL') {
      process.exitCode = 1;
    }
    return;
  }

  if (command === 'ads-txt') {
    const report = await buildAdsTxtReport(args);

    if (args.json) {
      console.log(JSON.stringify(report, null, 2));
    } else {
      printAdsTxtReport(report);
    }

    if (report.status === 'FAIL') {
      process.exitCode = 1;
    }
    return;
  }

  if (command === 'setup') {
    const report = await buildSetupReport(args);

    if (args.json) {
      console.log(JSON.stringify(report, null, 2));
    } else if (args.csv) {
      printSetupCsv(report);
    } else {
      printSetupReport(report);
    }

    return;
  }

  if (command === 'gate') {
    const report = await buildGateReport(args);

    if (args.json) {
      console.log(JSON.stringify(report, null, 2));
    } else {
      printGateReport(report);
    }

    if (report.status !== 'PASS') {
      process.exitCode = 1;
    }
    return;
  }

  if (command === 'recommend') {
    const { start, end } = getDateRange(args);
    const minImpressions = Number(args['min-impressions'] || 1000);
    const placementFile = args['placements-file'] || args['placement-file'];
    const countryFile = args['countries-file'] || args['country-file'];
    const [placementPayload, countryPayload] = placementFile || countryFile
      ? [
          placementFile ? await readCsvFile(placementFile) : [],
          countryFile ? await readCsvFile(countryFile) : [],
        ]
      : args.sample
      ? [
          [
            { placement: 'tool-sidebar-primary', impressions: 8200, clicks: 45, revenue: 3.9 },
            { placement: 'site-top-leaderboard', impressions: 12000, clicks: 38, revenue: 2.1 },
            { placement: 'blog-article-bottom', impressions: 1700, clicks: 18, revenue: 2.4 },
            { placement: 'mobile-sticky', impressions: 9000, clicks: 40, revenue: 0.7 },
          ],
          [
            { country: 'US', impressions: 3100, clicks: 22, revenue: 5.4 },
            { country: 'DE', impressions: 1500, clicks: 11, revenue: 2.0 },
            { country: 'CN', impressions: 9000, clicks: 19, revenue: 0.5 },
            { country: 'IN', impressions: 4200, clicks: 16, revenue: 0.9 },
          ],
        ]
      : await Promise.all([
          request('stats.json', {
            start_date: start,
            finish_date: end,
            group_by: 'placement',
            domain: args.domain,
          }),
          request('stats.json', {
            start_date: start,
            finish_date: end,
            group_by: 'country',
            domain: args.domain,
          }),
        ]);
    const report = buildRecommendations({
      placementPayload,
      countryPayload,
      minImpressions: Number.isFinite(minImpressions) && minImpressions > 0 ? minImpressions : 1000,
    });

    if (args.json) {
      console.log(JSON.stringify(report, null, 2));
      return;
    }

    printRecommendations(report);
    return;
  }

  if (command === 'goal') {
    const { report, error } = await buildGoalReportFromArgs(args);

    if (!report) {
      if (args.json) {
        console.log(JSON.stringify({ achieved: false, error }, null, 2));
      } else {
        console.error(error);
      }
      process.exitCode = 1;
      return;
    }

    if (args.json) {
      console.log(JSON.stringify(report, null, 2));
    } else {
      printGoalReport(report);
    }

    if (!report.achieved) {
      process.exitCode = 1;
    }
    return;
  }

  if (command !== 'stats') {
    console.error(`Unknown command: ${command}`);
    console.log(HELP.trim());
    process.exit(1);
  }

  const { start, end } = getDateRange(args);
  const payload = args.file
    ? await readCsvFile(args.file)
    : await request('stats.json', {
        start_date: start,
        finish_date: end,
        group_by: args['group-by'] || 'placement',
        domain: args.domain,
        placement: args.placement,
        country: args.country,
      });

  if (args.json) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  printStatsTable(payload);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
