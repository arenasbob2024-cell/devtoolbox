'use client';

import { useState, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const MORSE_CODE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  "'": '.----', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
};

const REVERSE_MORSE_MAP = Object.entries(MORSE_CODE_MAP).reduce((acc, [key, val]) => {
  acc[val] = key;
  return acc;
}, {} as Record<string, string>);

function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      if (char === ' ') return '/';
      return MORSE_CODE_MAP[char] || '';
    })
    .filter(morse => morse !== '')
    .join(' ');
}

function morseToText(morse: string): string {
  return morse
    .split(' ')
    .map(code => {
      if (code === '/') return ' ';
      return REVERSE_MORSE_MAP[code] || '';
    })
    .join('');
}

export default function TextToMorse() {
  const { dict } = useLang();
  const t = dict.tools['text-to-morse'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'text-to-morse' | 'morse-to-text'>('text-to-morse');
  const [dashDuration, setDashDuration] = useState(200);
  const [wpm, setWpm] = useState(20);
  const [frequency, setFrequency] = useState(800);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const convert = () => {
    if (mode === 'text-to-morse') {
      setOutput(textToMorse(input));
    } else {
      setOutput(morseToText(input));
    }
  };

  const playMorse = async () => {
    if (!output) return;

    setIsPlaying(true);
    try {
      const audioContext = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const dotDuration = dashDuration / 3;
      const space = dashDuration;
      const charSpace = dashDuration * 3;

      const codes = output.split(' ');
      for (const code of codes) {
        if (!code) continue;

        for (const symbol of code) {
          const duration = symbol === '-' ? dashDuration : dotDuration;
          playTone(audioContext, frequency, duration);
          await sleep(duration);
          await sleep(space);
        }
        await sleep(charSpace);
      }
    } finally {
      setIsPlaying(false);
    }
  };

  const playTone = (audioContext: AudioContext, freq: number, duration: number) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + duration / 1000);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="text-to-morse"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <select
          value={mode}
          onChange={e => {
            setMode(e.target.value as 'text-to-morse' | 'morse-to-text');
            setInput('');
            setOutput('');
          }}
          style={{ padding: '6px 10px', fontSize: 13 }}
        >
          <option value="text-to-morse">{t.textToMorse}</option>
          <option value="morse-to-text">{t.morseToText}</option>
        </select>
        <button onClick={convert} className="btn btn-primary">{t.convertBtn}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{dict.common.clear}</button>
        {mode === 'text-to-morse' && (
          <button onClick={playMorse} disabled={isPlaying || !output} className="btn btn-secondary">
            {isPlaying ? t.playing : t.playAudio}
          </button>
        )}
      </div>

      {mode === 'text-to-morse' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', minWidth: 100 }}>{t.dashDuration} (ms):</label>
            <input
              type="number"
              value={dashDuration}
              onChange={e => setDashDuration(Number(e.target.value))}
              min="50"
              max="500"
              style={{ padding: '4px 8px', fontSize: 12, width: 80 }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', minWidth: 60 }}>WPM:</label>
            <input
              type="number"
              value={wpm}
              onChange={e => setWpm(Number(e.target.value))}
              min="5"
              max="50"
              style={{ padding: '4px 8px', fontSize: 12, width: 80 }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', minWidth: 80 }}>{t.frequency} (Hz):</label>
            <input
              type="number"
              value={frequency}
              onChange={e => setFrequency(Number(e.target.value))}
              min="200"
              max="2000"
              style={{ padding: '4px 8px', fontSize: 12, width: 80 }}
            />
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
          </div>
          <textarea
            value={input}
            onChange={e => { setInput(e.target.value); convert(); }}
            placeholder={mode === 'text-to-morse' ? t.textPlaceholder : t.morsePlaceholder}
            style={{ minHeight: 300 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={t.outputPlaceholder}
            style={{ minHeight: 300, opacity: output ? 1 : 0.5, fontFamily: 'monospace' }}
          />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{t.morseLegend}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 20 }}>
          {Object.entries(MORSE_CODE_MAP)
            .filter(([char]) => /[A-Z0-9]/.test(char))
            .slice(0, 20)
            .map(([char, code]) => (
              <div key={char} style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                <strong>{char}</strong>: {code}
              </div>
            ))}
        </div>
      </div>

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
