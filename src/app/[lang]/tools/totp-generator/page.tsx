'use client';
import { useState, useEffect, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function generateSecret(len = 20): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

function base32Decode(s: string): Uint8Array {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  for (const c of s.toUpperCase()) { const v = alpha.indexOf(c); if (v >= 0) bits += v.toString(2).padStart(5, '0'); }
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2));
  return new Uint8Array(bytes);
}

async function hmacSha1(key: Uint8Array, msg: Uint8Array): Promise<Uint8Array> {
  const ck = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', ck, msg);
  return new Uint8Array(sig);
}

async function generateTOTP(secret: string, period: number, digits: number): Promise<string> {
  const time = Math.floor(Date.now() / 1000 / period);
  const timeBytes = new Uint8Array(8);
  let t = time;
  for (let i = 7; i >= 0; i--) { timeBytes[i] = t & 0xff; t >>= 8; }
  const key = base32Decode(secret);
  const hash = await hmacSha1(key, timeBytes);
  const offset = hash[hash.length - 1] & 0xf;
  const code = ((hash[offset] & 0x7f) << 24 | hash[offset + 1] << 16 | hash[offset + 2] << 8 | hash[offset + 3]) % Math.pow(10, digits);
  return code.toString().padStart(digits, '0');
}

export default function TOTPGeneratorPage() {
  const { dict, lang } = useLang();
  const [secret, setSecret] = useState(generateSecret());
  const [period, setPeriod] = useState(30);
  const [digits, setDigits] = useState(6);
  const [code, setCode] = useState('------');
  const [remaining, setRemaining] = useState(30);

  const update = useCallback(async () => {
    try {
      const c = await generateTOTP(secret, period, digits);
      setCode(c);
      setRemaining(period - (Math.floor(Date.now() / 1000) % period));
    } catch { setCode('Error'); }
  }, [secret, period, digits]);

  useEffect(() => { update(); const t = setInterval(update, 1000); return () => clearInterval(t); }, [update]);

  const uri = 'otpauth://totp/DevToolBox:user@example.com?secret=' + secret + '&issuer=DevToolBox&period=' + period + '&digits=' + digits;

  return (
    <ToolLayout toolId="totp-generator">
      <div className="space-y-6">
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <div className="text-6xl font-mono font-bold tracking-widest text-blue-600">{code}</div>
          <div className="mt-4 flex justify-center items-center gap-2">
            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: (remaining / period * 100) + '%' }}></div>
            </div>
            <span className="text-sm text-gray-500">{remaining}s</span>
          </div>
          <div className="mt-2"><CopyButton text={code} /></div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Secret (Base32)</label>
            <div className="flex gap-2">
              <input value={secret} onChange={e => setSecret(e.target.value.toUpperCase())} className="flex-1 p-2 border rounded font-mono text-sm dark:bg-gray-800 dark:border-gray-600" />
              <button onClick={() => setSecret(generateSecret())} className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 text-sm">New</button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Period (seconds)</label>
            <select value={period} onChange={e => setPeriod(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600">
              <option value={30}>30</option><option value={60}>60</option><option value={90}>90</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Digits</label>
            <select value={digits} onChange={e => setDigits(Number(e.target.value))} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600">
              <option value={6}>6</option><option value={8}>8</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">OTPAuth URI</label>
          <div className="flex gap-2">
            <input value={uri} readOnly className="flex-1 p-2 border rounded font-mono text-xs bg-gray-50 dark:bg-gray-900 dark:border-gray-600" />
            <CopyButton text={uri} />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}