#!/usr/bin/env node

/**
 * Pull Adsterra Publisher API reports from the command line.
 *
 * Usage:
 *   ADSTERRA_API_KEY=... npm run adsterra:report -- stats --days=7 --group-by=placement
 *   ADSTERRA_API_KEY=... npm run adsterra:report -- recommend --days=7
 *   ADSTERRA_API_KEY=... npm run adsterra:report -- stats --start=2026-05-01 --end=2026-05-15 --group-by=country
 *   ADSTERRA_API_KEY=... npm run adsterra:report -- domains
 *   npm run adsterra:report -- stats --file=exports/adsterra-placement.csv
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
  recommend   Rank placements/countries and print optimization actions.
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

Options for recommend:
  --days=7                 Days to include, ending yesterday by default.
  --start=YYYY-MM-DD       Start date.
  --end=YYYY-MM-DD         End date.
  --min-impressions=1000   Minimum impressions before judging CPM.
  --placements-file=PATH   Read placement CSV export instead of calling the API.
  --countries-file=PATH    Read country CSV export instead of calling the API.
  --sample                 Run with built-in sample rows, no API token needed.
  --json                   Print machine-readable recommendations.
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
