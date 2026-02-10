'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

// ---------------------------------------------------------------------------
// Font type: each character is an array of strings (rows).
// All characters in a font must have the same number of rows.
// ---------------------------------------------------------------------------
type FontMap = Record<string, string[]>;

// ---------------------------------------------------------------------------
// Helper: build a font map from a compact definition.
// Each character definition uses "|" to separate rows.
// ---------------------------------------------------------------------------
function buildFont(defs: Record<string, string>, rows: number): FontMap {
  const map: FontMap = {};
  for (const [ch, raw] of Object.entries(defs)) {
    const parts = raw.split('|');
    while (parts.length < rows) parts.push('');
    // pad each row to the width of the widest row in this character
    const w = Math.max(...parts.map(r => r.length));
    map[ch] = parts.map(r => r.padEnd(w));
  }
  return map;
}

// ============================  BANNER FONT  ================================
// 5 rows, built from # characters
const BANNER_DEFS: Record<string, string> = {
  A: ' ### |#   #|#####|#   #|#   #',
  B: '#### |#   #|#### |#   #|#### ',
  C: ' ####|#    |#    |#    | ####',
  D: '#### |#   #|#   #|#   #|#### ',
  E: '#####|#    |#### |#    |#####',
  F: '#####|#    |#### |#    |#    ',
  G: ' ####|#    |# ###|#   #| ####',
  H: '#   #|#   #|#####|#   #|#   #',
  I: '###| # | # | # |###',
  J: '  ###|   # |   # |#  # | ## ',
  K: '#  # |# #  |##   |# #  |#  # ',
  L: '#    |#    |#    |#    |#####',
  M: '#   #|## ##|# # #|#   #|#   #',
  N: '#   #|##  #|# # #|#  ##|#   #',
  O: ' ### |#   #|#   #|#   #| ### ',
  P: '#### |#   #|#### |#    |#    ',
  Q: ' ### |#   #|# # #|#  # | ## #',
  R: '#### |#   #|#### |# #  |#  # ',
  S: ' ####|#    | ### |    #|#### ',
  T: '#####|  #  |  #  |  #  |  #  ',
  U: '#   #|#   #|#   #|#   #| ### ',
  V: '#   #|#   #|#   #| # # |  #  ',
  W: '#   #|#   #|# # #|## ##|#   #',
  X: '#   #| # # |  #  | # # |#   #',
  Y: '#   #| # # |  #  |  #  |  #  ',
  Z: '#####|   # |  #  | #   |#####',
  '0': ' ### |#  ##|# # #|##  #| ### ',
  '1': '  #  | ##  |  #  |  #  | ### ',
  '2': ' ### |#   #|  ## | #   |#####',
  '3': ' ### |#   #|  ## |#   #| ### ',
  '4': '#   #|#   #|#####|    #|    #',
  '5': '#####|#    |#### |    #|#### ',
  '6': ' ### |#    |#### |#   #| ### ',
  '7': '#####|    #|   # |  #  |  #  ',
  '8': ' ### |#   #| ### |#   #| ### ',
  '9': ' ### |#   #| ####|    #| ### ',
  ' ': '     |     |     |     |     ',
};
const BANNER_FONT = buildFont(BANNER_DEFS, 5);

// ==========================  STANDARD FONT  ================================
// Classic figlet-like 6-row font
const STANDARD_DEFS: Record<string, string> = {
  A: '    _    |   / \\   |  / _ \\  | / ___ \\ |/_/   \\_\\|         ',
  B: ' ____  | | __ ) | | |  _ \\ | | |_) || |____/ |        ',
  C: '  ____ | / ___|  | |     | |     | \\____|        ',
  D: ' ____  | |  _ \\  | | | | | | | |_| | |____/ |        ',
  E: ' _____ | | ____|  | |  _|  | | |___ | |_____|        ',
  F: ' _____ | |  ___|  | | |_   | |  _|  | |_|    |        ',
  G: '  ____ | / ___|  | | |  _ | | |_| || \\____|        ',
  H: ' _   _ | | | | | | | |_| | | |  _  | | |_| |_|        ',
  I: ' ___ | |_ _| | | | | | | | |___||      ',
  J: '     _ | |   | | | _  | | | |_ | | \\___/ |        ',
  K: ' _  __ | | |/ / | |   /  | |  \\  | |_|\\_\\|        ',
  L: ' _     | | |    | | |    | | |___ | |_____|        ',
  M: ' __  __ | |  \\/  | | |\\/| | | |  | | | |_|  |_|        ',
  N: ' _   _ | | \\ | | | |\\  | | | | \\ || |_| \\_|        ',
  O: '  ___  | / _ \\ | | | | || | |_| || \\___/ |        ',
  P: ' ____  | |  _ \\ | | |_) || |  __/ | |_|    |        ',
  Q: '  ___  | / _ \\ | | | | || | |_| || \\__\\_\\|        ',
  R: ' ____  | |  _ \\ | | |_) || |  _ < | |_| \\_\\|        ',
  S: ' ____  | / ___| | \\___ \\ |  ___) || |____/ |        ',
  T: ' _____ | |_   _|| |  |  | |  |  | |  |  | |  |__|        ',
  U: ' _   _ | | | | | | | | | | | |_| | |  ___/ |        ',
  V: '__     __| \\ \\   / /|  \\ \\ / / |   \\ V /  |    \\_/   |          ',
  W: '__        __| \\ \\      / /|  \\ \\ /\\ / / |   \\ V  V /  |    \\_/\\_/   |              ',
  X: '__  __| \\ \\/ /|  \\  / |  /\\ \\ | /_/\\_\\|        ',
  Y: '__   __| \\ \\ / /|  \\ V / |   | |  |   |_|  |        ',
  Z: ' ____  | |__  / |   / /  |  / /__ | /_____|        ',
  '0': '  ___  | / _ \\ | | | | || | |_| || \\___/ |        ',
  '1': ' _ | / || | || | || |_||    ',
  '2': ' ____  | |___ \\ |  __) || / __/ | |_____|        ',
  '3': ' _____ | |___ / |  |_ \\ |  ___) || |____/ |        ',
  '4': ' _  _  | | || | | |_| || |__ _|| |   |_|        ',
  '5': ' ____  | | ___| | |___ \\ |  ___) || |____/ |        ',
  '6': '   __  |  / /  | |  __ \\ | | |__) || |____/ |        ',
  '7': ' _____ | |___  ||   / / |  / /  | /_/   |        ',
  '8': '  ___  | ( _ ) | / _ \\ || (_) || \\___/ |        ',
  '9': '  ___  | / _ \\ | \\_, / |  / /  | /_/   |        ',
  ' ': '      |      |      |      |      |      ',
};
const STANDARD_FONT = buildFont(STANDARD_DEFS, 6);

// ============================  SMALL FONT  =================================
// 3 rows, compact
const SMALL_DEFS: Record<string, string> = {
  A: ' _ |/_\\|/ \\',
  B: ' _ ||_)|_)',
  C: ' _|/ |\\_ ',
  D: ' _ | \\||_/',
  E: ' _||_|\\_ ',
  F: ' _||_||  ',
  G: ' _ / _|\\__|',
  H: '   ||_||  |',
  I: '_||| ',
  J: ' _| |\\| ',
  K: '  |/< |\\ ',
  L: '  || |\\_ ',
  M: '    ||\\/||   |',
  N: '   |\\ || \\|',
  O: ' _ | ||_|',
  P: ' _ |_) |  ',
  Q: ' _ |_\\  \\|',
  R: ' _ |_)|\\  ',
  S: ' _|_ | _)',
  T: '___|  |  ',
  U: '   || ||_|',
  V: '   |\\ /| V ',
  W: '      |\\    /| \\/\\/ ',
  X: '  |\\/||/\\',
  Y: '  |\\/ | / ',
  Z: '__|  / /__|',
  '0': ' _ | ||_|',
  '1': ' ||  |  ',
  '2': '_ | _)|_ ',
  '3': '_ | _) _)',
  '4': '   ||_|  |',
  '5': ' _|_  _)',
  '6': ' _|_ |_)',
  '7': '__|  / /  ',
  '8': ' _ |_||_|',
  '9': ' _ |_)  |',
  ' ': '  |  |  ',
};
const SMALL_FONT = buildFont(SMALL_DEFS, 3);

// ============================  BLOCK FONT  =================================
// 5 rows, using block characters
const BLOCK_DEFS: Record<string, string> = {
  A: ' ███ |█   █|█████|█   █|█   █',
  B: '████ |█   █|████ |█   █|████ ',
  C: ' ████|█    |█    |█    | ████',
  D: '████ |█   █|█   █|█   █|████ ',
  E: '█████|█    |████ |█    |█████',
  F: '█████|█    |████ |█    |█    ',
  G: ' ████|█    |█ ███|█   █| ████',
  H: '█   █|█   █|█████|█   █|█   █',
  I: '███| █ | █ | █ |███',
  J: '  ███|   █ |   █ |█  █ | ██ ',
  K: '█  █ |█ █  |██   |█ █  |█  █ ',
  L: '█    |█    |█    |█    |█████',
  M: '█   █|██ ██|█ █ █|█   █|█   █',
  N: '█   █|██  █|█ █ █|█  ██|█   █',
  O: ' ███ |█   █|█   █|█   █| ███ ',
  P: '████ |█   █|████ |█    |█    ',
  Q: ' ███ |█   █|█ █ █|█  █ | ██ █',
  R: '████ |█   █|████ |█ █  |█  █ ',
  S: ' ████|█    | ███ |    █|████ ',
  T: '█████|  █  |  █  |  █  |  █  ',
  U: '█   █|█   █|█   █|█   █| ███ ',
  V: '█   █|█   █|█   █| █ █ |  █  ',
  W: '█   █|█   █|█ █ █|██ ██|█   █',
  X: '█   █| █ █ |  █  | █ █ |█   █',
  Y: '█   █| █ █ |  █  |  █  |  █  ',
  Z: '█████|   █ |  █  | █   |█████',
  '0': ' ███ |█  ██|█ █ █|██  █| ███ ',
  '1': '  █  | ██  |  █  |  █  | ███ ',
  '2': ' ███ |█   █|  ██ | █   |█████',
  '3': ' ███ |█   █|  ██ |█   █| ███ ',
  '4': '█   █|█   █|█████|    █|    █',
  '5': '█████|█    |████ |    █|████ ',
  '6': ' ███ |█    |████ |█   █| ███ ',
  '7': '█████|    █|   █ |  █  |  █  ',
  '8': ' ███ |█   █| ███ |█   █| ███ ',
  '9': ' ███ |█   █| ████|    █| ███ ',
  ' ': '     |     |     |     |     ',
};
const BLOCK_FONT = buildFont(BLOCK_DEFS, 5);

// ===========================  SHADOW FONT  =================================
// 5 rows, with shadow effect using |_ characters
const SHADOW_DEFS: Record<string, string> = {
  A: ' __  |/  \\ |/---\\||   |||_  _|',
  B: ' __  ||__/ ||__ \\||__/ ||___/ ',
  C: ' ___ |/  _|||    ||\\__/ | \\___|',
  D: ' __  ||  \\ ||   |||  / ||__/  ',
  E: ' ___ ||___ ||__  ||___ ||____|',
  F: ' ___ ||___ ||__  ||    ||    |',
  G: ' ___ |/  _||/ __ ||\\__|||____|',
  H: '     ||   |||---|||   |||_  _|',
  I: ' ___ | | | | | | | | | |___|',
  J: ' ___|  | |  | ||  | || _/ ||_/  ',
  K: '     ||  / || /  ||  \\ ||   \\|',
  L: '     ||    ||    ||___ ||____|',
  M: '      ||\\  /|||\\/ |||   |||_  _|',
  N: '      ||\\  ||||\\ |||  \\|||   _|',
  O: ' ___ |/ _ \\||   |||_ / | \\_/ ',
  P: ' __  ||__/ ||___/ ||    ||    |',
  Q: ' ___ |/ _ \\||   ||| _\\ | \\_\\|',
  R: ' __  ||__/ ||__ \\||  \\ ||   \\|',
  S: ' ___ |/ __|||___ | ___)||___/ ',
  T: '_____|_ | _| | |  | |  |_| ',
  U: '     ||   |||   |||_ / | \\_/ ',
  V: '     ||   ||\\ / || \\ / |  V  ',
  W: '       ||  _  |||/ \\/ \\|| /  \\ ||/    \\|',
  X: '     ||\\ /|| X  ||/ \\|||_  _|',
  Y: '     ||\\ / | \\ / |  |  |  |_ |',
  Z: '_____|__ / | / /  |/ /_ |/____|',
  '0': ' ___ |/ _ \\|| | |||_/ / | \\_/ ',
  '1': ' _| / || | || | ||___|',
  '2': ' ___ ||__ \\| __) ||/ __ ||_____|',
  '3': ' ___ ||__ /| |_ \\| __) ||____/',
  '4': '     || | || |_| ||__ _||   |_|',
  '5': ' ____||| __|| ___\\| __) ||____/',
  '6': '   __ | / /  || __ \\|| |__)||____/',
  '7': '_____|___  |   / /|  / / | / /  ',
  '8': ' ___ |( _ )||/ _ \\||( ) || \\_/ ',
  '9': ' ___ |/ _ \\||\\_, ||  / / | / /  ',
  ' ': '     |     |     |     |     ',
};
const SHADOW_FONT = buildFont(SHADOW_DEFS, 5);

// ============================  MINI FONT  ==================================
// 3 rows, extremely minimal
const MINI_DEFS: Record<string, string> = {
  A: '/\\|/~\\|\\/|',
  B: '|>\\ |_/ |> /',
  C: '/~\\|| |\\_/',
  D: '|~\\ | |  |_/ ',
  E: '|~||_ |__|',
  F: '|~||_ |  ',
  G: '/~\\|__|\\__\\',
  H: '| ||=||_|',
  I: '~|~| | ~|~',
  J: '__|  | \\_|',
  K: '|/ |< |\\ ',
  L: '|  |  |__',
  M: '|\\/||  || |',
  N: '|\\ || \\|| \\|',
  O: '/~\\| |\\__/',
  P: '/~\\|_/ |   ',
  Q: '/~\\|_\\|  \\',
  R: '/~\\|_/ | \\',
  S: '/~\\\\__  __/',
  T: '~~~_|_  | ',
  U: '| || |\\__/',
  V: '\\ /|\\/| V ',
  W: '\\   /|\\ / |\\ /  ',
  X: '\\ /| \\/ / \\',
  Y: '\\ / \\/ | | ',
  Z: '~~/ / /~~',
  '0': '/~\\|+|\\__/',
  '1': '/| | ~|~',
  '2': '~\\ _/ /~~',
  '3': '~~\\  _) ~~/',
  '4': '| ||__|  |',
  '5': '|~~|__ __|',
  '6': ' /~|_ |_)',
  '7': '~~/ / /  ',
  '8': '/~\\|~|\\__/',
  '9': '/~\\|_)  |',
  ' ': '   |   |   ',
};
const MINI_FONT = buildFont(MINI_DEFS, 3);

// ---------------------------------------------------------------------------
// All fonts
// ---------------------------------------------------------------------------
const FONTS: Record<string, { label: string; map: FontMap; rows: number }> = {
  banner:   { label: 'Banner',   map: BANNER_FONT,   rows: 5 },
  standard: { label: 'Standard', map: STANDARD_FONT, rows: 6 },
  small:    { label: 'Small',    map: SMALL_FONT,    rows: 3 },
  block:    { label: 'Block',    map: BLOCK_FONT,    rows: 5 },
  shadow:   { label: 'Shadow',   map: SHADOW_FONT,   rows: 5 },
  mini:     { label: 'Mini',     map: MINI_FONT,     rows: 3 },
};

// ---------------------------------------------------------------------------
// Render text in the chosen font.
// Characters are placed side-by-side, row by row, with 1 column gap.
// ---------------------------------------------------------------------------
function renderAscii(text: string, fontKey: string): string {
  const font = FONTS[fontKey];
  if (!font) return '';
  const { map, rows } = font;
  const upper = text.toUpperCase();

  const lines: string[] = Array.from({ length: rows }, () => '');

  for (let ci = 0; ci < upper.length; ci++) {
    const ch = upper[ci];
    const glyph = map[ch];
    if (!glyph) {
      // unknown char: treat as space
      const sp = map[' '];
      if (sp) {
        for (let r = 0; r < rows; r++) lines[r] += sp[r] + ' ';
      }
      continue;
    }
    for (let r = 0; r < rows; r++) {
      lines[r] += (glyph[r] || '') + ' ';
    }
  }

  // Trim trailing whitespace from each line
  return lines.map(l => l.replace(/\s+$/, '')).join('\n');
}

// ===========================================================================
// Component
// ===========================================================================
export default function AsciiArtGenerator() {
  const { dict } = useLang();
  const t = dict.tools['ascii-art'] as Record<string, unknown>;

  const [input, setInput] = useState('HELLO');
  const [fontKey, setFontKey] = useState('banner');

  const output = useMemo(() => renderAscii(input, fontKey), [input, fontKey]);

  return (
    <ToolLayout
      title={t.pageTitle as string}
      description={t.pageDescription as string}
      toolId="ascii-art"
    >
      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
          Input Text
        </label>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type something..."
          maxLength={40}
          style={{
            width: '100%',
            padding: '10px 14px',
            fontSize: 14,
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            color: 'var(--text-primary)',
          }}
        />
      </div>

      {/* Font Selector */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
          Font Style
        </label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Object.entries(FONTS).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setFontKey(key)}
              style={{
                padding: '6px 14px',
                fontSize: 13,
                fontWeight: fontKey === key ? 700 : 400,
                borderRadius: 6,
                border: fontKey === key
                  ? '2px solid var(--accent-blue)'
                  : '1px solid var(--border-color)',
                background: fontKey === key ? 'var(--accent-blue)' : 'var(--bg-input)',
                color: fontKey === key ? '#fff' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Output */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>ASCII Art Output</label>
          {output && <CopyButton text={output} label="Copy" />}
        </div>
        <pre
          style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            padding: 16,
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: 13,
            lineHeight: 1.2,
            overflowX: 'auto',
            whiteSpace: 'pre',
            color: 'var(--text-primary)',
            minHeight: 100,
          }}
        >
          {output || 'Type something above to generate ASCII art...'}
        </pre>
      </div>

      {/* Character count */}
      {output && (
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
          {output.split('\n').length} lines | {output.length} characters
        </div>
      )}

      {/* SEO Section */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
          {(t.seoTitle as string) || 'ASCII Art Generator'}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {(t.seoContent as string) || 'Generate ASCII art text from any input. Choose from multiple font styles including Banner, Standard, Small, Block, Shadow, and Mini. Perfect for README files, code comments, terminal banners, and creative text displays.'}
        </p>
      </div>
    </ToolLayout>
  );
}
