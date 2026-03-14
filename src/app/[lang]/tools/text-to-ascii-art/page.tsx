'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

// ASCII Art Font Definitions
const fonts = {
  standard: {
    name: 'Standard',
    chars: {
      A: ['  A  ', ' / \\ ', '/   \\', 'A   A', '     '],
      B: ['BBBB ', 'B   B', 'BBBB ', 'B   B', 'BBBB '],
      C: [' CCC ', 'C   C', 'C    ', 'C   C', ' CCC '],
      D: ['DDDD ', 'D   D', 'D   D', 'D   D', 'DDDD '],
      E: ['EEEE ', 'E    ', 'EEE  ', 'E    ', 'EEEE '],
      F: ['FFFF ', 'F    ', 'FFF  ', 'F    ', 'F    '],
      G: [' GGG ', 'G   G', 'G  GG', 'G   G', ' GGG '],
      H: ['H   H', 'H   H', 'HHHHH', 'H   H', 'H   H'],
      I: ['IIIII', '  I  ', '  I  ', '  I  ', 'IIIII'],
      J: ['JJJJJ', '    J', '    J', 'J   J', ' JJJ '],
      K: ['K   K', 'K  K ', 'KKK  ', 'K  K ', 'K   K'],
      L: ['L    ', 'L    ', 'L    ', 'L    ', 'LLLL '],
      M: ['M   M', 'MM MM', 'M M M', 'M   M', 'M   M'],
      N: ['N   N', 'NN  N', 'N N N', 'N  NN', 'N   N'],
      O: [' OOO ', 'O   O', 'O   O', 'O   O', ' OOO '],
      P: ['PPPP ', 'P   P', 'PPPP ', 'P    ', 'P    '],
      Q: [' QQQ ', 'Q   Q', 'Q   Q', 'Q  Q ', ' QQ Q'],
      R: ['RRRR ', 'R   R', 'RRRR ', 'R  R ', 'R   R'],
      S: [' SSS ', 'S   S', ' SSS ', '    S', 'SSSS '],
      T: ['TTTTT', '  T  ', '  T  ', '  T  ', '  T  '],
      U: ['U   U', 'U   U', 'U   U', 'U   U', ' UUU '],
      V: ['V   V', 'V   V', 'V   V', ' V V ', '  V  '],
      W: ['W   W', 'W   W', 'W W W', 'WW WW', 'W   W'],
      X: ['X   X', ' X X ', '  X  ', ' X X ', 'X   X'],
      Y: ['Y   Y', ' Y Y ', '  Y  ', '  Y  ', '  Y  '],
      Z: ['ZZZZZ', '    Z', '   Z ', '  Z  ', 'ZZZZZ'],
      '0': [' 000 ', '0   0', '0   0', '0   0', ' 000 '],
      '1': ['  1  ', ' 11  ', '  1  ', '  1  ', '11111'],
      '2': [' 222 ', '2   2', '    2', '  2  ', '22222'],
      '3': ['3333 ', '    3', ' 333 ', '    3', '3333 '],
      '4': ['4   4', '4   4', '44444', '    4', '    4'],
      '5': ['55555', '5    ', '5555 ', '    5', '5555 '],
      '6': [' 666 ', '6    ', '6666 ', '6   6', ' 666 '],
      '7': ['77777', '    7', '   7 ', '  7  ', ' 7   '],
      '8': [' 888 ', '8   8', ' 888 ', '8   8', ' 888 '],
      '9': [' 999 ', '9   9', ' 9999', '    9', ' 999 '],
      ' ': ['     ', '     ', '     ', '     ', '     '],
      '.': ['     ', '     ', '     ', '     ', '  .  '],
      '!': ['  !  ', '  !  ', '  !  ', '     ', '  !  '],
      '?': [' ??? ', '?   ?', '   ? ', '     ', '  ?  '],
      ',': ['     ', '     ', '     ', '  ,  ', ' ,   '],
      '-': ['     ', '     ', '-----', '     ', '     '],
    }
  },
  banner: {
    name: 'Banner',
    chars: {
      A: ['###', '# #', '###', '#  #', '#  #'],
      B: ['##', '# #', '##', '# #', '##'],
      C: ['###', '#', '#', '#', '###'],
      D: ['##', '# #', '#  #', '# #', '##'],
      E: ['###', '#', '##', '#', '###'],
      F: ['###', '#', '##', '#', '#'],
      G: ['###', '#', '# ##', '#  #', '###'],
      H: ['# #', '# #', '###', '# #', '# #'],
      I: ['###', ' # ', ' # ', ' # ', '###'],
      J: ['###', '  #', '  #', '#  #', ' ##'],
      K: ['#  #', '# #', '##', '# #', '#  #'],
      L: ['#', '#', '#', '#', '###'],
      M: ['#   #', '## ##', '# # #', '#   #', '#   #'],
      N: ['#  #', '## #', '# ##', '#  #', '#  #'],
      O: ['###', '#  #', '#  #', '#  #', '###'],
      P: ['##', '# #', '##', '#', '#'],
      Q: ['###', '#  #', '#  #', '# #', ' ##'],
      R: ['##', '# #', '##', '# #', '#  #'],
      S: ['###', '#', '###', '  #', '###'],
      T: ['###', ' # ', ' # ', ' # ', ' # '],
      U: ['#  #', '#  #', '#  #', '#  #', '###'],
      V: ['#   #', '#   #', '#   #', ' # # ', '  #  '],
      W: ['#   #', '#   #', '# # #', '## ##', '#   #'],
      X: ['#   #', ' # # ', '  #  ', ' # # ', '#   #'],
      Y: ['#   #', ' # # ', '  #  ', '  #  ', '  #  '],
      Z: ['###', '  #', ' # ', '#  ', '###'],
      '0': ['###', '# #', '# #', '# #', '###'],
      '1': [' #', '##', ' #', ' #', '###'],
      '2': ['##', '  #', ' # ', '#  ', '###'],
      '3': ['##', '  #', ' ##', '  #', '##'],
      '4': ['# #', '# #', '###', '  #', '  #'],
      '5': ['###', '#', '##', '  #', '##'],
      '6': ['###', '#', '##', '# #', '###'],
      '7': ['###', '  #', ' # ', '#  ', '#  '],
      '8': ['###', '# #', '###', '# #', '###'],
      '9': ['###', '# #', '###', '  #', '###'],
      ' ': ['  ', '  ', '  ', '  ', '  '],
      '.': ['  ', '  ', '  ', '  ', '# '],
      '!': ['#', '#', '#', ' ', '#'],
      '?': ['##', '  #', ' # ', '  ', ' # '],
      ',': ['  ', '  ', '  ', ' #', '#  '],
      '-': ['   ', '   ', '###', '   ', '   '],
    }
  },
  big: {
    name: 'Big',
    chars: {
      A: ['    A    ', '   A A   ', '  A   A  ', ' A     A ', 'A       A', 'A       A', 'AAAAAAAAA'],
      B: ['BBBBBBBB ', 'B       B', 'BBBBBBBB ', 'B       B', 'B       B', 'B       B', 'BBBBBBBB '],
      C: [' CCCCCC  ', 'C        ', 'C        ', 'C        ', 'C        ', 'C        ', ' CCCCCC  '],
      D: ['DDDDDDD  ', 'D       D', 'D       D', 'D       D', 'D       D', 'D       D', 'DDDDDDD  '],
      E: ['EEEEEEEE', 'E       ', 'EEEEEEE ', 'E       ', 'E       ', 'E       ', 'EEEEEEEE'],
      F: ['FFFFFFF ', 'F       ', 'FFFFFF  ', 'F       ', 'F       ', 'F       ', 'F       '],
      G: [' GGGGGGG ', 'G        ', 'G        ', 'G    GGG', 'G       G', 'G       G', ' GGGGGGG '],
      H: ['H       H', 'H       H', 'HHHHHHHHH', 'H       H', 'H       H', 'H       H', 'H       H'],
      I: ['IIIIIII', '   I   ', '   I   ', '   I   ', '   I   ', '   I   ', 'IIIIIII'],
      J: ['JJJJJJJ', '      J ', '      J ', '      J ', 'J      J', 'J      J', ' JJJJJJ '],
      O: [' OOOOOOO ', 'O       O', 'O       O', 'O       O', 'O       O', 'O       O', ' OOOOOOO '],
      '0': [' 00000  ', '0     0 ', '0     0 ', '0     0 ', '0     0 ', '0     0 ', ' 00000  '],
      '1': ['   1   ', '  11   ', '   1   ', '   1   ', '   1   ', '   1   ', ' 11111 '],
      '2': [' 22222 ', '2     2', '      2', '  222  ', ' 2     ', '2      ', '2222222'],
      '3': [' 33333 ', '3     3', '      3', '  3333 ', '      3', '3     3', ' 33333 '],
      '4': ['4     4', '4     4', '4     4', '4444444', '      4', '      4', '      4'],
      '5': ['5555555', '5      ', '555555 ', '      5', '      5', '5     5', ' 55555 '],
      '6': [' 66666 ', '6     6', '6      ', '666666 ', '6     6', '6     6', ' 66666 '],
      '7': ['7777777', '      7', '     7 ', '    7  ', '   7   ', '  7    ', ' 7     '],
      '8': [' 88888 ', '8     8', '8     8', ' 88888 ', '8     8', '8     8', ' 88888 '],
      '9': [' 99999 ', '9     9', '9     9', ' 999999', '      9', '9     9', ' 99999 '],
      ' ': ['       ', '       ', '       ', '       ', '       ', '       ', '       '],
      '.': ['       ', '       ', '       ', '       ', '       ', '   .   ', '   .   '],
      '!': ['   !   ', '   !   ', '   !   ', '   !   ', '   !   ', '       ', '   !   '],
      '?': [' ????? ', '?     ?', '      ?', '   ?   ', '  ?    ', '       ', '  ?    '],
      ',': ['       ', '       ', '       ', '       ', '   ,   ', '  ,    ', ' ,     '],
      '-': ['        ', '        ', '        ', '--------', '        ', '        ', '        '],
    }
  },
  small: {
    name: 'Small',
    chars: {
      A: ['A A', 'AAA', 'A A'],
      B: ['BB', 'BB', 'BB'],
      C: ['CC', 'C', 'CC'],
      D: ['DD', 'D D', 'DD'],
      E: ['EE', 'EE', 'EE'],
      F: ['FF', 'FF', 'F'],
      G: ['GG', 'G', 'GG'],
      H: ['H H', 'HHH', 'H H'],
      I: ['I', 'I', 'I'],
      J: ['JJ', 'J', 'JJ'],
      K: ['K K', 'KK', 'K K'],
      L: ['L', 'L', 'LL'],
      M: ['M M', 'MMM', 'M M'],
      N: ['N N', 'NNN', 'N N'],
      O: ['O O', 'OOO', 'O O'],
      P: ['PP', 'PP', 'P'],
      Q: ['Q Q', 'QQQ', 'Q Q'],
      R: ['RR', 'RR', 'R R'],
      S: ['SS', 'SS', 'SS'],
      T: ['TTT', 'T', 'T'],
      U: ['U U', 'U U', 'UUU'],
      V: ['V V', 'V V', 'V'],
      W: ['W W', 'WWW', 'W W'],
      X: ['X X', 'X', 'X X'],
      Y: ['Y Y', 'YY', 'Y'],
      Z: ['ZZ', 'Z', 'ZZ'],
      '0': ['0 0', '000', '0 0'],
      '1': ['1', '1', '1'],
      '2': ['22', '2', '22'],
      '3': ['33', '3', '33'],
      '4': ['4 4', '44', '4'],
      '5': ['55', '5', '55'],
      '6': ['66', '6', '66'],
      '7': ['77', '7', '7'],
      '8': ['8 8', '8', '8 8'],
      '9': ['99', '9', '99'],
      ' ': [' ', ' ', ' '],
      '.': [' ', ' ', '.'],
      '!': ['!', '!', '!'],
      '?': ['?', ' ', '?'],
      ',': [' ', ' ', ','],
      '-': ['--', '--', '--'],
    }
  },
  shadow: {
    name: 'Shadow',
    chars: {
      A: [' A   ', 'A A  ', 'AAA  ', 'A  A ', 'A   A'],
      B: ['BBB  ', 'B  B ', 'BBB  ', 'B   B', 'BBBB '],
      C: [' CC  ', 'C    ', 'C    ', 'C    ', ' CC  '],
      D: ['DDD  ', 'D  D ', 'D   D', 'D  D ', 'DDD  '],
      E: ['EEE  ', 'E    ', 'EE   ', 'E    ', 'EEE  '],
      F: ['FFF  ', 'F    ', 'FF   ', 'F    ', 'F    '],
      G: [' GG  ', 'G    ', 'G GG ', 'G  G ', ' GG  '],
      H: ['H  H ', 'H  H ', 'HHH  ', 'H  H ', 'H  H '],
      I: ['III  ', ' I   ', ' I   ', ' I   ', 'III  '],
      J: ['JJJ  ', '  J  ', '  J  ', 'J  J ', ' JJ  '],
      K: ['K  K ', 'K K  ', 'KK   ', 'K K  ', 'K  K '],
      L: ['L    ', 'L    ', 'L    ', 'L    ', 'LLL  '],
      M: ['M   M', 'MM MM', 'M M M', 'M   M', 'M   M'],
      N: ['N   N', 'NN  N', 'N N N', 'N  NN', 'N   N'],
      O: [' OO  ', 'O  O ', 'O  O ', 'O  O ', ' OO  '],
      P: ['PPP  ', 'P  P ', 'PPP  ', 'P    ', 'P    '],
      Q: [' QQ  ', 'Q  Q ', 'Q  Q ', 'Q Q  ', ' QQ Q'],
      R: ['RRR  ', 'R  R ', 'RRR  ', 'R R  ', 'R  R '],
      S: [' SS  ', 'S    ', ' SS  ', '   S ', 'SSS  '],
      T: ['TTT  ', '  T  ', '  T  ', '  T  ', '  T  '],
      U: ['U  U ', 'U  U ', 'U  U ', 'U  U ', ' UU  '],
      V: ['V   V', 'V   V', 'V   V', ' V V ', '  V  '],
      W: ['W   W', 'W   W', 'W W W', 'WW WW', 'W   W'],
      X: ['X   X', ' X X ', '  X  ', ' X X ', 'X   X'],
      Y: ['Y   Y', ' Y Y ', '  Y  ', '  Y  ', '  Y  '],
      Z: ['ZZZ  ', '   Z ', '  Z  ', ' Z   ', 'ZZZ  '],
      '0': [' 00  ', '0  0 ', '0  0 ', '0  0 ', ' 00  '],
      '1': ['  1  ', ' 11  ', '  1  ', '  1  ', '111  '],
      '2': [' 22  ', '2  2 ', '   2 ', '  2  ', '222  '],
      '3': [' 33  ', '3  3 ', '  33 ', '   3 ', ' 33  '],
      '4': ['4   4', '4   4', '4444 ', '    4', '    4'],
      '5': ['555  ', '5    ', ' 55  ', '    5', '555  '],
      '6': [' 66  ', '6    ', '666  ', '6   6', ' 66  '],
      '7': ['777  ', '   7 ', '  7  ', ' 7   ', '7    '],
      '8': [' 88  ', '8  8 ', ' 88  ', '8  8 ', ' 88  '],
      '9': [' 99  ', '9  9 ', ' 999 ', '   9 ', ' 99  '],
      ' ': ['     ', '     ', '     ', '     ', '     '],
      '.': ['     ', '     ', '     ', '     ', ' .   '],
      '!': ['  !  ', '  !  ', '  !  ', '     ', '  !  '],
      '?': [' ??  ', '?  ? ', '   ? ', '     ', '  ?  '],
      ',': ['     ', '     ', '     ', '  ,  ', ' ,   '],
      '-': ['     ', '     ', '----', '     ', '     '],
    }
  }
};

function convertToAscii(text: string, fontKey: string): string {
  const font = fonts[fontKey as keyof typeof fonts];
  if (!font) return '';

  const lines = text.toUpperCase().split('\n');
  const result: string[] = [];

  lines.forEach(line => {
    if (!line.trim()) {
      result.push('');
      return;
    }

    const charHeight = Object.values(font.chars)[0]?.length || 5;
    const asciiLines: string[] = Array(charHeight).fill('');

    for (const char of line) {
      const charArt = font.chars[char as keyof typeof font.chars] || font.chars[' '];
      if (charArt) {
        charArt.forEach((line, idx) => {
          asciiLines[idx] = (asciiLines[idx] || '') + line;
        });
      }
    }

    result.push(...asciiLines);
  });

  return result.join('\n');
}

export default function TextToAsciiArt() {
  const { dict } = useLang();
  const t = dict.tools['text-to-ascii-art'];
  const [text, setText] = useState('HELLO');
  const [selectedFont, setSelectedFont] = useState('standard');

  const asciiOutput = useMemo(() => {
    return convertToAscii(text, selectedFont);
  }, [text, selectedFont]);

  const fontList = Object.entries(fonts).map(([key, font]) => ({
    id: key,
    name: font.name
  }));

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="text-to-ascii-art"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => setText('')} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Input */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={t.inputPlaceholder}
              style={{ minHeight: 120, fontFamily: 'monospace', fontSize: 14 }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.fontLabel}</label>
            <select
              value={selectedFont}
              onChange={e => setSelectedFont(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 14 }}
            >
              {fontList.map(font => (
                <option key={font.id} value={font.id}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>{t.fontInfo}</p>
          </div>
        </div>

        {/* Preview */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.previewLabel}</label>
          <div
            style={{
              flex: 1,
              background: 'var(--bg-secondary)',
              padding: 16,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              fontFamily: 'monospace',
              fontSize: 12,
              lineHeight: 1.4,
              overflowX: 'auto',
              overflowY: 'auto',
              minHeight: 200,
              color: 'var(--text-primary)',
              whiteSpace: 'pre',
              wordBreak: 'break-all',
            }}
          >
            {asciiOutput || t.previewPlaceholder}
          </div>
          {asciiOutput && (
            <div style={{ marginTop: 12 }}>
              <CopyButton text={asciiOutput} label={t.copyBtn} />
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1}</li>
          <li>{t.seoFeature2}</li>
          <li>{t.seoFeature3}</li>
          <li>{t.seoFeature4}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
