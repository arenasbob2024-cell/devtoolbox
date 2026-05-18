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
 *   npm run adsterra:report -- readiness
 *   npm run adsterra:report -- stats --file=exports/adsterra-placement.csv
 *   npm run adsterra:report -- goal --file=exports/adsterra-daily.csv --target=10
 *   npm run adsterra:report -- recommend --placements-file=exports/placements.csv --countries-file=exports/countries.csv
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
  recommend   Rank placements/countries and print optimization actions.
  readiness   Check local Adsterra env/reporting readiness without printing secrets.
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
  --json                   Print machine-readable readiness result.
`;

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
      name === 'ADSTERRA_API_KEY'
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

function envValue(env, key) {
  const value = env[key];
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : '';
}

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
        ['NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_MID_KEY', 'Blog article post-body slot'],
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

async function buildReadinessReport(args) {
  const envFile = args['env-file'] || '.env.local';
  const vercelScope = args['vercel-scope'] || args.scope || '';
  const [
    { text: envFileText, path: envFilePath },
    { text: adsTxtText, path: adsTxtPath },
    csvFiles,
    vercelEnv,
  ] = await Promise.all([
    readOptionalTextFile(envFile),
    readOptionalTextFile('public/ads.txt'),
    listOptionalCsvFiles('exports'),
    loadVercelEnvPresence(vercelScope),
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
  const hasAdsterraSellerLine = /^adsterra\.com\s*,\s*(?!ADSTERRA_PUBLISHER_ID_PLACEHOLDER\b)[^,\s#]+,\s*DIRECT\b/im.test(adsTxtText);
  const hasAdsTxtPlaceholder = /ADSTERRA_PUBLISHER_ID_PLACEHOLDER/.test(adsTxtText);
  const hasOwnerDomain = /^OWNERDOMAIN=viadreams\.cc\s*$/im.test(adsTxtText);
  const revenueCsvFiles = csvFiles.filter(file => /adsterra|daily|placement|country|revenue/i.test(file));
  const hasRevenueProofSource = Boolean(envValue(env, 'ADSTERRA_API_KEY')) || revenueCsvFiles.length > 0;
  const warnings = [
    ...recommendedMissing.map(name => `Missing recommended env: ${name}`),
    ...verificationMissing.map(name => `Missing verification env: ${name}`),
  ];

  if (!hasAdsterraSellerLine) {
    warnings.push('public/ads.txt does not contain the exact active Adsterra seller line.');
  }

  if (!hasRevenueProofSource) {
    warnings.push('No API token or exports/*.csv report is available for real revenue goal verification.');
  }

  if (vercelEnv.error) {
    warnings.push(`Could not inspect Vercel env names: ${vercelEnv.error}`);
  }

  const status = requiredMissing.length > 0
    ? 'FAIL'
    : warnings.length > 0
    ? 'WARN'
    : 'PASS';

  return {
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
      hasOwnerDomain,
      hasAdsterraSellerLine,
      hasPlaceholder: hasAdsTxtPlaceholder,
    },
    reports: {
      csvFiles: revenueCsvFiles,
      hasRevenueProofSource,
    },
    envGroups,
    requiredMissing,
    recommendedMissing,
    verificationMissing,
    warnings,
  };
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
  console.log(`  - ${report.adsTxt.found ? 'OK' : 'MISSING'} file: ${report.adsTxt.path}`);
  console.log(`  - ${report.adsTxt.hasOwnerDomain ? 'OK' : 'MISSING'} OWNERDOMAIN=viadreams.cc`);
  console.log(`  - ${report.adsTxt.hasAdsterraSellerLine ? 'OK' : 'MISSING'} active Adsterra seller line`);
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

  if (report.warnings.length > 0) {
    console.log('\nWarnings');
    for (const warning of report.warnings) {
      console.log(`  - ${warning}`);
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
    const { start, end } = getDateRange(args);
    const days = Number(args.days || inclusiveDateCount(start, end) || 7);
    const targetDailyRevenue = Number(args.target || 10);
    const payload = args.file
      ? await readCsvFile(args.file)
      : args.sample
      ? [
          { date: '2026-05-12', revenue: 8.25 },
          { date: '2026-05-13', revenue: 9.8 },
          { date: '2026-05-14', revenue: 10.4 },
          { date: '2026-05-15', revenue: 11.1 },
          { date: '2026-05-16', revenue: 10.95 },
          { date: '2026-05-17', revenue: 11.4 },
          { date: '2026-05-18', revenue: 12.2 },
        ]
      : await request('stats.json', {
          start_date: start,
          finish_date: end,
          group_by: 'date',
          domain: args.domain,
        });
    const report = buildGoalReport({
      payload,
      start,
      end,
      days: Number.isFinite(days) && days > 0 ? days : 7,
      targetDailyRevenue: Number.isFinite(targetDailyRevenue) && targetDailyRevenue > 0 ? targetDailyRevenue : 10,
    });

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
