'use client';

import { useState, useEffect, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

export default function TextToSpeech() {
  const { dict } = useLang();
  const t = dict.tools['text-to-speech'] as Record<string, string>;

  const [text, setText] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState<string>('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setUnsupported(true);
      return;
    }
    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      if (list.length) {
        setVoices(list);
        if (!voiceName) {
          const preferred =
            list.find((v) => v.default) ||
            list.find((v) => v.lang.startsWith('en')) ||
            list[0];
          if (preferred) setVoiceName(preferred.name);
        }
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const speak = () => {
    if (!text.trim()) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === voiceName);
    if (voice) u.voice = voice;
    u.rate = rate;
    u.pitch = pitch;
    u.volume = volume;
    u.onstart = () => { setIsSpeaking(true); setIsPaused(false); };
    u.onend = () => { setIsSpeaking(false); setIsPaused(false); };
    u.onerror = () => { setIsSpeaking(false); setIsPaused(false); };
    utteranceRef.current = u;
    window.speechSynthesis.speak(u);
  };

  const pause = () => { window.speechSynthesis.pause(); setIsPaused(true); };
  const resume = () => { window.speechSynthesis.resume(); setIsPaused(false); };
  const stop = () => { window.speechSynthesis.cancel(); setIsSpeaking(false); setIsPaused(false); };

  const loadSample = () => {
    setText(
      (t.sampleText as string) ||
        'Hello! This is a free online text-to-speech tool. It works entirely in your browser, with no data sent to any server. Try different voices, rates, and pitches to find the perfect combination for your needs.'
    );
  };

  // Group voices by language for a cleaner UI
  const voicesByLang = voices.reduce<Record<string, SpeechSynthesisVoice[]>>((acc, v) => {
    const key = v.lang || 'unknown';
    (acc[key] = acc[key] || []).push(v);
    return acc;
  }, {});
  const langs = Object.keys(voicesByLang).sort();

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="text-to-speech">
      {unsupported ? (
        <div style={{
          padding: 20, background: 'rgba(251,191,36,0.1)', borderRadius: 10,
          border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24', fontSize: 14,
        }}>
          {t.unsupported || 'Your browser does not support the Web Speech API. Try Chrome, Edge, or Safari.'}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
          <div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>
                {t.inputLabel}
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t.inputPlaceholder}
                style={{ minHeight: 200, width: '100%' }}
                maxLength={10000}
              />
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4, textAlign: 'right' }}>
                {text.length} / 10000
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {!isSpeaking ? (
                <button onClick={speak} disabled={!text.trim()} className="btn btn-primary">
                  ▶ {t.play}
                </button>
              ) : (
                <>
                  {!isPaused ? (
                    <button onClick={pause} className="btn btn-primary">⏸ {t.pause}</button>
                  ) : (
                    <button onClick={resume} className="btn btn-primary">▶ {t.resume}</button>
                  )}
                  <button onClick={stop} className="btn btn-ghost">⏹ {t.stop}</button>
                </>
              )}
              <button onClick={loadSample} className="btn btn-ghost">{dict.common.loadSample}</button>
              <button onClick={() => setText('')} className="btn btn-ghost">{dict.common.clear}</button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              padding: 10, background: 'var(--bg-input)',
              borderRadius: 8, border: '1px solid var(--border-color)',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.voice}</div>
              <select
                value={voiceName}
                onChange={(e) => setVoiceName(e.target.value)}
                style={{ width: '100%', fontSize: 13, padding: '6px 8px' }}
              >
                {langs.map((lang) => (
                  <optgroup key={lang} label={lang}>
                    {voicesByLang[lang].map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.name} {v.default ? '(default)' : ''}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
                {voices.length} {t.voicesAvailable}
              </div>
            </div>

            <SliderControl label={t.rate} min={0.1} max={2} step={0.1} value={rate} onChange={setRate} />
            <SliderControl label={t.pitch} min={0} max={2} step={0.1} value={pitch} onChange={setPitch} />
            <SliderControl label={t.volume} min={0} max={1} step={0.1} value={volume} onChange={setVolume} />
          </div>
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}

function SliderControl({
  label, min, max, step, value, onChange,
}: {
  label: string; min: number; max: number; step: number;
  value: number; onChange: (v: number) => void;
}) {
  return (
    <div style={{
      padding: 10, background: 'var(--bg-input)',
      borderRadius: 8, border: '1px solid var(--border-color)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 600 }}>{label}</label>
        <span style={{ fontSize: 13, color: 'var(--accent-blue)', fontWeight: 700 }}>{value.toFixed(1)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--accent-blue)' }}
      />
    </div>
  );
}
