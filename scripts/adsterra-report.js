#!/usr/bin/env node

/**
 * Pull Adsterra Publisher API reports from the command line.
 *
 * Usage:
 *   ADSTERRA_API_KEY=... npm run adsterra:report -- stats --days=7 --group-by=placement
 *   ADSTERRA_API_KEY=... npm run adsterra:report -- stats --start=2026-05-01 --end=2026-05-15 --group-by=country
 *   ADSTERRA_API_KEY=... npm run adsterra:report -- domains
 *
 * Keep the token out of git. Generate it in the Adsterra publisher dashboard:
 * API page -> GENERATE NEW TOKEN.
 */

const API_BASE = 'https://api3.adsterratools.com/publisher';

const HELP = `
Adsterra report helper

Commands:
  stats       Fetch revenue stats. Default command.
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
  --json                   Print raw JSON instead of a compact table.
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

function printStatsTable(payload) {
  const rows = rowsFromStats(payload);
  if (rows.length === 0) {
    console.log('No rows returned.');
    return;
  }

  const columns = [
    ['date', ['date', 'day']],
    ['domain', ['domain', 'domain_name', 'domain_id']],
    ['placement', ['placement', 'placement_name', 'placement_id']],
    ['country', ['country', 'geo']],
    ['impressions', ['impressions', 'views', 'loads']],
    ['clicks', ['clicks']],
    ['ctr', ['ctr']],
    ['cpm', ['cpm', 'ecpm']],
    ['revenue', ['revenue', 'profit', 'earnings']],
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

  if (command !== 'stats') {
    console.error(`Unknown command: ${command}`);
    console.log(HELP.trim());
    process.exit(1);
  }

  const { start, end } = getDateRange(args);
  const payload = await request('stats.json', {
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
