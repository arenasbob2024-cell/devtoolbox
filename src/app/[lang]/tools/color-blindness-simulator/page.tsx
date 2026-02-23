'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Color Blindness Simulator',
    description: 'Preview how colors look with different types of color blindness. Enter hex colors to simulate.',
    inputLabel: 'Enter Colors (one per line)',
    placeholder: '#FF0000\n#00FF00\n#0000FF\n#FFFF00\n#FF6600',
    simulateBtn: 'Simulate',
    clearBtn: 'Clear',
    loadSampleBtn: 'Load Sample',
    normalLabel: 'Normal Vision',
    protanopiaLabel: 'Protanopia (Red-blind)',
    deuteranopiaLabel: 'Deuteranopia (Green-blind)',
    tritanopiaLabel: 'Tritanopia (Blue-blind)',
    achromatopsiaLabel: 'Achromatopsia (No color)',
    protanomalyLabel: 'Protanomaly (Red-weak)',
    deuteranomalyLabel: 'Deuteranomaly (Green-weak)',
    typeLabel: 'Blindness Type',
    affectsLabel: 'Affects',
    colorSwatchLabel: 'Color Swatch',
    hexLabel: 'HEX',
    infoTitle: 'About Color Blindness',
    infoText: 'Color blindness affects ~8% of males and 0.5% of females. Testing your UI with these simulations helps ensure accessibility for all users.',
  },
  fr: { title: 'Simulateur de Daltonisme', description: 'Prévisualisez comment les couleurs apparaissent avec différents types de daltonisme.', inputLabel: 'Entrez des couleurs (une par ligne)', placeholder: '#FF0000\n#00FF00\n#0000FF', simulateBtn: 'Simuler', clearBtn: 'Effacer', loadSampleBtn: 'Exemple', normalLabel: 'Vision normale', protanopiaLabel: 'Protanopie (aveugle au rouge)', deuteranopiaLabel: 'Deutéranopie (aveugle au vert)', tritanopiaLabel: 'Tritanopie (aveugle au bleu)', achromatopsiaLabel: 'Achromatopsie (sans couleur)', protanomalyLabel: 'Protanomalie (rouge faible)', deuteranomalyLabel: 'Deutéranomalie (vert faible)', typeLabel: 'Type', affectsLabel: 'Affecte', colorSwatchLabel: 'Échantillon', hexLabel: 'HEX', infoTitle: 'À propos du daltonisme', infoText: 'Le daltonisme affecte environ 8% des hommes et 0,5% des femmes.' },
  de: { title: 'Farbenblindheit Simulator', description: 'Vorschau auf Farben mit verschiedenen Arten von Farbenblindheit.', inputLabel: 'Farben eingeben (eine pro Zeile)', placeholder: '#FF0000\n#00FF00\n#0000FF', simulateBtn: 'Simulieren', clearBtn: 'Löschen', loadSampleBtn: 'Beispiel laden', normalLabel: 'Normalsicht', protanopiaLabel: 'Protanopie (Rotblind)', deuteranopiaLabel: 'Deuteranopie (Grünblind)', tritanopiaLabel: 'Tritanopie (Blaufarbenblind)', achromatopsiaLabel: 'Achromatopsie (keine Farbe)', protanomalyLabel: 'Protanomalie (Rotschwäche)', deuteranomalyLabel: 'Deuteranomalie (Grünschwäche)', typeLabel: 'Typ', affectsLabel: 'Betrifft', colorSwatchLabel: 'Farbmuster', hexLabel: 'HEX', infoTitle: 'Über Farbenblindheit', infoText: 'Farbenblindheit betrifft ~8% der Männer und 0,5% der Frauen.' },
  it: { title: 'Simulatore di Daltonismo', description: 'Anteprima di come appaiono i colori con diversi tipi di daltonismo.', inputLabel: 'Inserisci colori (uno per riga)', placeholder: '#FF0000\n#00FF00\n#0000FF', simulateBtn: 'Simula', clearBtn: 'Cancella', loadSampleBtn: 'Esempio', normalLabel: 'Visione normale', protanopiaLabel: 'Protanopia (cieco al rosso)', deuteranopiaLabel: 'Deuteranopia (cieco al verde)', tritanopiaLabel: 'Tritanopia (cieco al blu)', achromatopsiaLabel: 'Acromatopsia (nessun colore)', protanomalyLabel: 'Protanomalia (rosso debole)', deuteranomalyLabel: 'Deuteranomalia (verde debole)', typeLabel: 'Tipo', affectsLabel: 'Colpisce', colorSwatchLabel: 'Campione', hexLabel: 'HEX', infoTitle: 'Informazioni sul daltonismo', infoText: 'Il daltonismo colpisce circa l\'8% dei maschi e lo 0,5% delle femmine.' },
  es: { title: 'Simulador de Daltonismo', description: 'Vista previa de cómo los colores se ven con diferentes tipos de daltonismo.', inputLabel: 'Ingresa colores (uno por línea)', placeholder: '#FF0000\n#00FF00\n#0000FF', simulateBtn: 'Simular', clearBtn: 'Limpiar', loadSampleBtn: 'Ejemplo', normalLabel: 'Visión normal', protanopiaLabel: 'Protanopía (ciego al rojo)', deuteranopiaLabel: 'Deuteranopía (ciego al verde)', tritanopiaLabel: 'Tritanopía (ciego al azul)', achromatopsiaLabel: 'Acromatopsia (sin color)', protanomalyLabel: 'Protanomalía (rojo débil)', deuteranomalyLabel: 'Deuteranomalía (verde débil)', typeLabel: 'Tipo', affectsLabel: 'Afecta', colorSwatchLabel: 'Muestra', hexLabel: 'HEX', infoTitle: 'Sobre el daltonismo', infoText: 'El daltonismo afecta al ~8% de los hombres y al 0,5% de las mujeres.' },
  pt: { title: 'Simulador de Daltonismo', description: 'Pré-visualize como as cores aparecem com diferentes tipos de daltonismo.', inputLabel: 'Digite cores (uma por linha)', placeholder: '#FF0000\n#00FF00\n#0000FF', simulateBtn: 'Simular', clearBtn: 'Limpar', loadSampleBtn: 'Exemplo', normalLabel: 'Visão normal', protanopiaLabel: 'Protanopia (cego ao vermelho)', deuteranopiaLabel: 'Deuteranopia (cego ao verde)', tritanopiaLabel: 'Tritanopia (cego ao azul)', achromatopsiaLabel: 'Acromatopsia (sem cor)', protanomalyLabel: 'Protanomalia (vermelho fraco)', deuteranomalyLabel: 'Deuteranomalia (verde fraco)', typeLabel: 'Tipo', affectsLabel: 'Afeta', colorSwatchLabel: 'Amostra', hexLabel: 'HEX', infoTitle: 'Sobre o daltonismo', infoText: 'O daltonismo afeta ~8% dos homens e 0,5% das mulheres.' },
  nl: { title: 'Kleurenblindheid Simulator', description: 'Bekijk hoe kleuren eruitzien bij verschillende soorten kleurenblindheid.', inputLabel: 'Voer kleuren in (één per regel)', placeholder: '#FF0000\n#00FF00\n#0000FF', simulateBtn: 'Simuleer', clearBtn: 'Wissen', loadSampleBtn: 'Voorbeeld', normalLabel: 'Normaal zicht', protanopiaLabel: 'Protanopie (roodblind)', deuteranopiaLabel: 'Deuteranopie (groenblind)', tritanopiaLabel: 'Tritanopie (blauwblind)', achromatopsiaLabel: 'Achromatopsie (geen kleur)', protanomalyLabel: 'Protanomalie (rood zwak)', deuteranomalyLabel: 'Deuteranomalie (groen zwak)', typeLabel: 'Type', affectsLabel: 'Betreft', colorSwatchLabel: 'Kleurstaal', hexLabel: 'HEX', infoTitle: 'Over kleurenblindheid', infoText: 'Kleurenblindheid treft ~8% van de mannen en 0,5% van de vrouwen.' },
  pl: { title: 'Symulator Daltonizmu', description: 'Podgląd kolorów dla różnych typów daltonizmu.', inputLabel: 'Wprowadź kolory (jeden na linię)', placeholder: '#FF0000\n#00FF00\n#0000FF', simulateBtn: 'Symuluj', clearBtn: 'Wyczyść', loadSampleBtn: 'Przykład', normalLabel: 'Normalne widzenie', protanopiaLabel: 'Protanopia (ślepota na czerwień)', deuteranopiaLabel: 'Deuteranopia (ślepota na zieleń)', tritanopiaLabel: 'Tritanopia (ślepota na błękit)', achromatopsiaLabel: 'Acromatopsia (brak kolorów)', protanomalyLabel: 'Protanomalia (słaba czerwień)', deuteranomalyLabel: 'Deuteranomalia (słaba zieleń)', typeLabel: 'Typ', affectsLabel: 'Dotyczy', colorSwatchLabel: 'Próbka', hexLabel: 'HEX', infoTitle: 'O daltonizmie', infoText: 'Daltonizm dotyczy ~8% mężczyzn i 0,5% kobiet.' },
  sv: { title: 'Färgblindhet Simulator', description: 'Förhandsgranska hur färger ser ut vid olika typer av färgblindhet.', inputLabel: 'Ange färger (en per rad)', placeholder: '#FF0000\n#00FF00\n#0000FF', simulateBtn: 'Simulera', clearBtn: 'Rensa', loadSampleBtn: 'Exempel', normalLabel: 'Normal syn', protanopiaLabel: 'Protanopi (röd-blind)', deuteranopiaLabel: 'Deuteranopi (grön-blind)', tritanopiaLabel: 'Tritanopi (blå-blind)', achromatopsiaLabel: 'Akromatopsi (ingen färg)', protanomalyLabel: 'Protanomali (röd-svag)', deuteranomalyLabel: 'Deuteranomali (grön-svag)', typeLabel: 'Typ', affectsLabel: 'Påverkar', colorSwatchLabel: 'Färgprov', hexLabel: 'HEX', infoTitle: 'Om färgblindhet', infoText: 'Färgblindhet drabbar ~8% av männen och 0,5% av kvinnorna.' },
  no: { title: 'Fargeblindhet Simulator', description: 'Forhåndsvis farger for ulike typer fargeblindhet.', inputLabel: 'Skriv inn farger (én per linje)', placeholder: '#FF0000\n#00FF00\n#0000FF', simulateBtn: 'Simimer', clearBtn: 'Tøm', loadSampleBtn: 'Eksempel', normalLabel: 'Normal syn', protanopiaLabel: 'Protanopi (rødblind)', deuteranopiaLabel: 'Deuteranopi (grønnblind)', tritanopiaLabel: 'Tritanopi (blåblind)', achromatopsiaLabel: 'Akromatopsi (ingen farge)', protanomalyLabel: 'Protanomali (rød-svak)', deuteranomalyLabel: 'Deuteranomali (grønn-svak)', typeLabel: 'Type', affectsLabel: 'Påvirker', colorSwatchLabel: 'Fargeprøve', hexLabel: 'HEX', infoTitle: 'Om fargeblindhet', infoText: 'Fargeblindhet rammer ~8% av menn og 0,5% av kvinner.' },
  zh: { title: '色盲模拟器', description: '预览不同类型色盲所看到的颜色效果。', inputLabel: '输入颜色（每行一个）', placeholder: '#FF0000\n#00FF00\n#0000FF', simulateBtn: '模拟', clearBtn: '清除', loadSampleBtn: '加载示例', normalLabel: '正常视觉', protanopiaLabel: '红色盲（第一色盲）', deuteranopiaLabel: '绿色盲（第二色盲）', tritanopiaLabel: '蓝色盲（第三色盲）', achromatopsiaLabel: '全色盲', protanomalyLabel: '红色弱', deuteranomalyLabel: '绿色弱', typeLabel: '类型', affectsLabel: '影响', colorSwatchLabel: '色块', hexLabel: 'HEX', infoTitle: '关于色盲', infoText: '色盲影响约8%的男性和0.5%的女性，为UI设计做无障碍测试非常重要。' },
  ja: { title: '色覚異常シミュレーター', description: '様々な種類の色覚異常で色がどう見えるかをシミュレート。', inputLabel: '色を入力（1行に1色）', placeholder: '#FF0000\n#00FF00\n#0000FF', simulateBtn: 'シミュレート', clearBtn: 'クリア', loadSampleBtn: 'サンプル', normalLabel: '通常視覚', protanopiaLabel: '第一色覚異常（赤盲）', deuteranopiaLabel: '第二色覚異常（緑盲）', tritanopiaLabel: '第三色覚異常（青盲）', achromatopsiaLabel: '全色盲', protanomalyLabel: '第一色覚弱（赤弱）', deuteranomalyLabel: '第二色覚弱（緑弱）', typeLabel: '種類', affectsLabel: '影響', colorSwatchLabel: 'スウォッチ', hexLabel: 'HEX', infoTitle: '色覚異常について', infoText: '色覚異常は男性の約8%、女性の0.5%に影響します。' },
  ko: { title: '색맹 시뮬레이터', description: '다양한 색맹 유형에서 색상이 어떻게 보이는지 미리보기.', inputLabel: '색상 입력 (줄당 하나)', placeholder: '#FF0000\n#00FF00\n#0000FF', simulateBtn: '시뮬레이션', clearBtn: '지우기', loadSampleBtn: '샘플', normalLabel: '정상 시각', protanopiaLabel: '제1색맹 (적색맹)', deuteranopiaLabel: '제2색맹 (녹색맹)', tritanopiaLabel: '제3색맹 (청색맹)', achromatopsiaLabel: '전색맹', protanomalyLabel: '제1색약 (적색약)', deuteranomalyLabel: '제2색약 (녹색약)', typeLabel: '유형', affectsLabel: '영향', colorSwatchLabel: '색상 견본', hexLabel: 'HEX', infoTitle: '색맹에 대하여', infoText: '색맹은 남성의 약 8%, 여성의 0.5%에 영향을 미칩니다.' },
  id: { title: 'Simulator Buta Warna', description: 'Pratinjau tampilan warna bagi orang dengan berbagai jenis buta warna.', inputLabel: 'Masukkan warna (satu per baris)', placeholder: '#FF0000\n#00FF00\n#0000FF', simulateBtn: 'Simulasikan', clearBtn: 'Hapus', loadSampleBtn: 'Contoh', normalLabel: 'Visi normal', protanopiaLabel: 'Protanopia (buta merah)', deuteranopiaLabel: 'Deuteranopia (buta hijau)', tritanopiaLabel: 'Tritanopia (buta biru)', achromatopsiaLabel: 'Akromatopsia (tanpa warna)', protanomalyLabel: 'Protanomali (merah lemah)', deuteranomalyLabel: 'Deuteranomali (hijau lemah)', typeLabel: 'Jenis', affectsLabel: 'Mempengaruhi', colorSwatchLabel: 'Sampel', hexLabel: 'HEX', infoTitle: 'Tentang Buta Warna', infoText: 'Buta warna mempengaruhi ~8% pria dan 0,5% wanita.' },
  th: { title: 'จำลองตาบอดสี', description: 'ดูตัวอย่างว่าสีปรากฏอย่างไรสำหรับผู้มีภาวะตาบอดสีประเภทต่างๆ', inputLabel: 'ใส่สี (หนึ่งสีต่อบรรทัด)', placeholder: '#FF0000\n#00FF00\n#0000FF', simulateBtn: 'จำลอง', clearBtn: 'ล้าง', loadSampleBtn: 'ตัวอย่าง', normalLabel: 'การมองเห็นปกติ', protanopiaLabel: 'Protanopia (ตาบอดสีแดง)', deuteranopiaLabel: 'Deuteranopia (ตาบอดสีเขียว)', tritanopiaLabel: 'Tritanopia (ตาบอดสีน้ำเงิน)', achromatopsiaLabel: 'Achromatopsia (ไม่เห็นสี)', protanomalyLabel: 'Protanomaly (สีแดงอ่อน)', deuteranomalyLabel: 'Deuteranomaly (สีเขียวอ่อน)', typeLabel: 'ประเภท', affectsLabel: 'ส่งผล', colorSwatchLabel: 'ตัวอย่างสี', hexLabel: 'HEX', infoTitle: 'เกี่ยวกับตาบอดสี', infoText: 'ตาบอดสีส่งผลต่อผู้ชายประมาณ 8% และผู้หญิง 0.5%' },
};

// Color blindness transformation matrices
type Matrix3x3 = [number, number, number, number, number, number, number, number, number];
const MATRICES: Record<string, Matrix3x3> = {
  normal:        [1, 0, 0, 0, 1, 0, 0, 0, 1],
  protanopia:    [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758],
  deuteranopia:  [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7],
  tritanopia:    [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525],
  achromatopsia: [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114],
  protanomaly:   [0.817, 0.183, 0, 0.333, 0.667, 0, 0, 0.125, 0.875],
  deuteranomaly: [0.8, 0.2, 0, 0.258, 0.742, 0, 0, 0.142, 0.858],
};

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function applyMatrix([r, g, b]: [number, number, number], m: Matrix3x3): [number, number, number] {
  return [
    Math.round(Math.min(255, Math.max(0, r * m[0] + g * m[1] + b * m[2]))),
    Math.round(Math.min(255, Math.max(0, r * m[3] + g * m[4] + b * m[5]))),
    Math.round(Math.min(255, Math.max(0, r * m[6] + g * m[7] + b * m[8]))),
  ];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0').toUpperCase()).join('');
}

const SAMPLE_COLORS = '#FF0000\n#00CC00\n#0066FF\n#FF6600\n#FFDD00\n#9933CC\n#00CCCC\n#FF3399';

const TYPES = [
  { key: 'normal', labelKey: 'normalLabel', affects: '' },
  { key: 'protanopia', labelKey: 'protanopiaLabel', affects: '~1% males' },
  { key: 'deuteranopia', labelKey: 'deuteranopiaLabel', affects: '~1% males' },
  { key: 'tritanopia', labelKey: 'tritanopiaLabel', affects: '~0.01%' },
  { key: 'protanomaly', labelKey: 'protanomalyLabel', affects: '~1% males' },
  { key: 'deuteranomaly', labelKey: 'deuteranomalyLabel', affects: '~5% males' },
  { key: 'achromatopsia', labelKey: 'achromatopsiaLabel', affects: '~0.003%' },
];

export default function ColorBlindnessSimulator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [colors, setColors] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState('protanopia');

  const simulate = useCallback(() => {
    const parsed = input
      .split('\n')
      .map(l => l.trim())
      .filter(l => /^#?[0-9a-f]{6}$/i.test(l))
      .map(l => (l.startsWith('#') ? l : '#' + l).toUpperCase());
    setColors(parsed);
  }, [input]);

  const getSimulatedColor = (hex: string, type: string): string => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    const matrix = MATRICES[type];
    if (!matrix) return hex;
    const simulated = applyMatrix(rgb, matrix);
    return rgbToHex(simulated);
  };

  const getLuminance = (hex: string): number => {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    return (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  };

  const copyResults = colors.length > 0 ? TYPES.map(type => {
    const label = t[type.labelKey as keyof typeof t] || type.key;
    const row = colors.map(c => `${c} → ${getSimulatedColor(c, type.key)}`).join(', ');
    return `${label}: ${row}`;
  }).join('\n') : '';

  return (
    <ToolLayout title={t.title} description={t.description} toolId="color-blindness-simulator">
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t.placeholder}
          style={{ minHeight: 120, fontFamily: 'monospace', fontSize: 13 }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <button onClick={simulate} className="btn btn-primary">{t.simulateBtn}</button>
        <button onClick={() => { setInput(SAMPLE_COLORS); }} className="btn btn-secondary">{t.loadSampleBtn}</button>
        <button onClick={() => { setInput(''); setColors([]); }} className="btn btn-secondary">{t.clearBtn}</button>
        {copyResults && <CopyButton text={copyResults} />}
      </div>

      {colors.length > 0 && (
        <div>
          {/* Type selector tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
            {TYPES.map(type => (
              <button
                key={type.key}
                onClick={() => setSelectedType(type.key)}
                className={selectedType === type.key ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: 12, padding: '5px 10px' }}
              >
                {t[type.labelKey as keyof typeof t] || type.key}
              </button>
            ))}
          </div>

          {/* Comparison: Normal vs Selected */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {['normal', selectedType].map(type => (
              <div key={type}>
                <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)' }}>
                  {t[TYPES.find(t2 => t2.key === type)?.labelKey as keyof typeof t] || type}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {colors.map((color, idx) => {
                    const simColor = getSimulatedColor(color, type);
                    const textColor = getLuminance(simColor) > 0.5 ? '#000' : '#fff';
                    return (
                      <div key={idx} style={{ width: 80 }}>
                        <div style={{ width: 80, height: 80, borderRadius: 8, background: simColor, border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: 10, fontFamily: 'monospace', color: textColor, fontWeight: 700 }}>{simColor}</span>
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 4, textAlign: 'center', fontFamily: 'monospace' }}>{color}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* All types grid for each color */}
          <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>All Simulations</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ borderCollapse: 'collapse', fontSize: 12, minWidth: 600 }}>
                <thead>
                  <tr>
                    <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '2px solid var(--border-color)', whiteSpace: 'nowrap' }}>Original</th>
                    {TYPES.filter(t2 => t2.key !== 'normal').map(type => (
                      <th key={type.key} style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '2px solid var(--border-color)', whiteSpace: 'nowrap', fontSize: 11 }}>
                        {t[type.labelKey as keyof typeof t]?.split(' ')[0] || type.key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {colors.map((color, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '8px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 24, height: 24, borderRadius: 4, background: color, border: '1px solid var(--border-color)' }} />
                          <span style={{ fontFamily: 'monospace' }}>{color}</span>
                        </div>
                      </td>
                      {TYPES.filter(t2 => t2.key !== 'normal').map(type => {
                        const sim = getSimulatedColor(color, type.key);
                        return (
                          <td key={type.key} style={{ padding: '8px 12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                              <div style={{ width: 24, height: 24, borderRadius: 4, background: sim, border: '1px solid var(--border-color)' }} />
                              <span style={{ fontFamily: 'monospace', fontSize: 10 }}>{sim}</span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 24, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--text-secondary)' }}>
        <strong>{t.infoTitle}:</strong> {t.infoText}
      </div>
    </ToolLayout>
  );
}
