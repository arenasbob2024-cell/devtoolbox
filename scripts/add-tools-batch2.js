const fs = require('fs');
const path = require('path');

const BASE = '/var/www/devtoolbox';
const TOOLS_FILE = path.join(BASE, 'src/lib/tools.ts');
const DICT_DIR = path.join(BASE, 'src/i18n/dictionaries');
const TOOLS_DIR = path.join(BASE, 'src/app/[lang]/tools');

const newTools = [
  {
    id: 'websocket-tester',
    name: 'WebSocket Tester',
    icon: '🔌',
    category: 'web',
    keywords: ['websocket', 'ws', 'wss', 'realtime', 'socket', 'connection', 'test'],
    relatedTools: ['webhook-tester', 'api-tester', 'http-request-builder'],
    translations: {
      en: { name: 'WebSocket Tester', description: 'Test WebSocket connections, send/receive messages in real-time', pageTitle: 'Online WebSocket Tester - Real-time Connection Debug', pageDescription: 'Free online WebSocket tester. Connect to any WS/WSS endpoint, send messages, view responses in real-time with latency tracking.' },
      zh: { name: 'WebSocket 测试工具', description: '测试 WebSocket 连接，实时发送和接收消息', pageTitle: '在线 WebSocket 测试工具 - 实时连接调试', pageDescription: '免费在线 WebSocket 测试工具。连接任意 WS/WSS 端点，发送消息，实时查看响应和延迟。' },
      ja: { name: 'WebSocket テスター', description: 'WebSocket接続をテストし、リアルタイムでメッセージを送受信', pageTitle: 'オンライン WebSocket テスター - リアルタイム接続デバッグ', pageDescription: '無料オンラインWebSocketテスター。WS/WSSエンドポイントに接続、メッセージ送信、リアルタイム応答確認。' },
      ko: { name: 'WebSocket 테스터', description: 'WebSocket 연결 테스트, 실시간 메시지 송수신', pageTitle: '온라인 WebSocket 테스터 - 실시간 연결 디버그', pageDescription: '무료 온라인 WebSocket 테스터. WS/WSS 엔드포인트 연결, 메시지 전송, 실시간 응답 확인.' },
      fr: { name: 'Testeur WebSocket', description: 'Testez les connexions WebSocket, envoyez/recevez des messages en temps réel', pageTitle: 'Testeur WebSocket en ligne - Débogage en temps réel', pageDescription: 'Testeur WebSocket en ligne gratuit. Connectez-vous à n\'importe quel endpoint WS/WSS.' },
      de: { name: 'WebSocket Tester', description: 'WebSocket-Verbindungen testen, Nachrichten in Echtzeit senden/empfangen', pageTitle: 'Online WebSocket Tester - Echtzeit-Debugging', pageDescription: 'Kostenloser Online WebSocket Tester. Verbinden Sie sich mit jedem WS/WSS-Endpunkt.' },
      es: { name: 'Probador WebSocket', description: 'Prueba conexiones WebSocket, envía/recibe mensajes en tiempo real', pageTitle: 'Probador WebSocket en línea - Depuración en tiempo real', pageDescription: 'Probador WebSocket en línea gratuito. Conéctese a cualquier endpoint WS/WSS.' },
      it: { name: 'Tester WebSocket', description: 'Testa connessioni WebSocket, invia/ricevi messaggi in tempo reale', pageTitle: 'Tester WebSocket online - Debug in tempo reale', pageDescription: 'Tester WebSocket online gratuito. Connettiti a qualsiasi endpoint WS/WSS.' },
      pt: { name: 'Testador WebSocket', description: 'Teste conexões WebSocket, envie/receba mensagens em tempo real', pageTitle: 'Testador WebSocket online - Depuração em tempo real', pageDescription: 'Testador WebSocket online gratuito. Conecte-se a qualquer endpoint WS/WSS.' },
      nl: { name: 'WebSocket Tester', description: 'Test WebSocket-verbindingen, verzend/ontvang berichten in realtime', pageTitle: 'Online WebSocket Tester - Realtime debugging', pageDescription: 'Gratis online WebSocket tester. Maak verbinding met elk WS/WSS-endpoint.' },
      pl: { name: 'Tester WebSocket', description: 'Testuj połączenia WebSocket, wysyłaj/odbieraj wiadomości w czasie rzeczywistym', pageTitle: 'Tester WebSocket online - Debugowanie w czasie rzeczywistym', pageDescription: 'Darmowy tester WebSocket online. Połącz się z dowolnym endpointem WS/WSS.' },
      sv: { name: 'WebSocket-testare', description: 'Testa WebSocket-anslutningar, skicka/ta emot meddelanden i realtid', pageTitle: 'WebSocket-testare online - Realtidsfelsökning', pageDescription: 'Gratis WebSocket-testare online. Anslut till valfri WS/WSS-endpoint.' },
      no: { name: 'WebSocket-tester', description: 'Test WebSocket-tilkoblinger, send/motta meldinger i sanntid', pageTitle: 'WebSocket-tester online - Sanntidsfeilsøking', pageDescription: 'Gratis WebSocket-tester online. Koble til hvilken som helst WS/WSS-endepunkt.' },
      id: { name: 'Penguji WebSocket', description: 'Uji koneksi WebSocket, kirim/terima pesan secara real-time', pageTitle: 'Penguji WebSocket Online - Debug Real-time', pageDescription: 'Penguji WebSocket online gratis. Hubungkan ke endpoint WS/WSS mana pun.' },
      th: { name: 'ทดสอบ WebSocket', description: 'ทดสอบการเชื่อมต่อ WebSocket ส่ง/รับข้อความแบบเรียลไทม์', pageTitle: 'ทดสอบ WebSocket ออนไลน์ - ดีบักแบบเรียลไทม์', pageDescription: 'เครื่องมือทดสอบ WebSocket ออนไลน์ฟรี เชื่อมต่อกับ endpoint WS/WSS ใดก็ได้' }
    },
    pageCode: `'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/components/LangContext';

interface Message { type: 'sent' | 'received' | 'system'; content: string; time: string; }

export default function WebSocketTesterPage() {
  const lang = useLang();
  const [url, setUrl] = useState('wss://echo.websocket.org');
  const [message, setMessage] = useState('Hello WebSocket!');
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const addMsg = useCallback((msg: Message) => {
    setMessages(prev => [...prev, msg]);
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages]);

  const now = () => new Date().toLocaleTimeString();

  const connect = () => {
    try {
      const ws = new WebSocket(url);
      ws.onopen = () => { setConnected(true); addMsg({ type: 'system', content: 'Connected to ' + url, time: now() }); };
      ws.onmessage = (e) => { addMsg({ type: 'received', content: typeof e.data === 'string' ? e.data : '[Binary data]', time: now() }); };
      ws.onclose = (e) => { setConnected(false); addMsg({ type: 'system', content: 'Disconnected (code: ' + e.code + ')', time: now() }); };
      ws.onerror = () => { addMsg({ type: 'system', content: 'Connection error', time: now() }); };
      wsRef.current = ws;
    } catch (err) { addMsg({ type: 'system', content: 'Invalid URL', time: now() }); }
  };

  const disconnect = () => { wsRef.current?.close(); wsRef.current = null; };

  const send = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
      addMsg({ type: 'sent', content: message, time: now() });
    }
  };

  const allText = messages.map(m => '[' + m.time + '] ' + m.type.toUpperCase() + ': ' + m.content).join('\\n');

  return (
    <ToolLayout toolId="websocket-tester">
      <div className="space-y-4">
        <div className="flex gap-2">
          <input value={url} onChange={e => setUrl(e.target.value)} placeholder="wss://echo.websocket.org" className="flex-1 p-3 border rounded-lg font-mono text-sm dark:bg-gray-800 dark:border-gray-600" />
          {connected ? (
            <button onClick={disconnect} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">Disconnect</button>
          ) : (
            <button onClick={connect} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Connect</button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={'w-3 h-3 rounded-full ' + (connected ? 'bg-green-500' : 'bg-red-500')}></span>
          <span className="text-sm">{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
        <div className="flex gap-2">
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={2} className="flex-1 p-3 border rounded-lg font-mono text-sm dark:bg-gray-800 dark:border-gray-600" placeholder="Message to send..." />
          <button onClick={send} disabled={!connected} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">Send</button>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Messages</h3>
          <div className="flex gap-2">
            <button onClick={() => setMessages([])} className="text-sm text-gray-500 hover:text-gray-700">Clear</button>
            <CopyButton text={allText} />
          </div>
        </div>
        <div ref={logRef} className="h-80 overflow-y-auto border rounded-lg p-3 bg-gray-50 dark:bg-gray-900 space-y-1 font-mono text-sm">
          {messages.length === 0 && <p className="text-gray-400">No messages yet. Connect to start.</p>}
          {messages.map((m, i) => (
            <div key={i} className={'p-2 rounded ' + (m.type === 'sent' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : m.type === 'received' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 italic')}>
              <span className="text-xs opacity-60">[{m.time}]</span> {m.content}
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}`
  },
  {
    id: 'totp-generator',
    name: 'TOTP Generator',
    icon: '🔑',
    category: 'generator',
    keywords: ['totp', '2fa', 'authenticator', 'otp', 'two-factor', 'mfa', 'time-based'],
    relatedTools: ['password-generator', 'hmac-generator', 'hash-generator'],
    translations: {
      en: { name: 'TOTP Generator', description: 'Generate Time-based One-Time Passwords for 2FA testing', pageTitle: 'TOTP Generator - 2FA Code Generator Online', pageDescription: 'Free TOTP generator for testing two-factor authentication. Generate time-based OTP codes with custom secrets and intervals.' },
      zh: { name: 'TOTP 生成器', description: '生成基于时间的一次性密码用于 2FA 测试', pageTitle: 'TOTP 生成器 - 在线 2FA 验证码生成', pageDescription: '免费 TOTP 生成器，用于测试双因素认证。支持自定义密钥和时间间隔生成 OTP 验证码。' },
      ja: { name: 'TOTP ジェネレーター', description: '2FAテスト用の時間ベースワンタイムパスワードを生成', pageTitle: 'TOTP ジェネレーター - 2FAコード生成', pageDescription: '無料TOTPジェネレーター。カスタムシークレットとインターバルでOTPコードを生成。' },
      ko: { name: 'TOTP 생성기', description: '2FA 테스트를 위한 시간 기반 일회용 비밀번호 생성', pageTitle: 'TOTP 생성기 - 2FA 코드 생성기', pageDescription: '무료 TOTP 생성기. 사용자 정의 비밀키와 간격으로 OTP 코드를 생성합니다.' },
      fr: { name: 'Générateur TOTP', description: 'Générez des mots de passe à usage unique basés sur le temps pour tester le 2FA', pageTitle: 'Générateur TOTP - Générateur de codes 2FA', pageDescription: 'Générateur TOTP gratuit pour tester l\'authentification à deux facteurs.' },
      de: { name: 'TOTP-Generator', description: 'Zeitbasierte Einmalpasswörter für 2FA-Tests generieren', pageTitle: 'TOTP-Generator - 2FA-Code-Generator', pageDescription: 'Kostenloser TOTP-Generator zum Testen der Zwei-Faktor-Authentifizierung.' },
      es: { name: 'Generador TOTP', description: 'Genere contraseñas de un solo uso basadas en tiempo para pruebas 2FA', pageTitle: 'Generador TOTP - Generador de códigos 2FA', pageDescription: 'Generador TOTP gratuito para probar autenticación de dos factores.' },
      it: { name: 'Generatore TOTP', description: 'Genera password monouso basate sul tempo per test 2FA', pageTitle: 'Generatore TOTP - Generatore codici 2FA', pageDescription: 'Generatore TOTP gratuito per testare l\'autenticazione a due fattori.' },
      pt: { name: 'Gerador TOTP', description: 'Gere senhas únicas baseadas em tempo para testes 2FA', pageTitle: 'Gerador TOTP - Gerador de códigos 2FA', pageDescription: 'Gerador TOTP gratuito para testar autenticação de dois fatores.' },
      nl: { name: 'TOTP-generator', description: 'Genereer tijdgebaseerde eenmalige wachtwoorden voor 2FA-tests', pageTitle: 'TOTP-generator - 2FA-codegenerator', pageDescription: 'Gratis TOTP-generator voor het testen van tweefactorauthenticatie.' },
      pl: { name: 'Generator TOTP', description: 'Generuj jednorazowe hasła oparte na czasie do testów 2FA', pageTitle: 'Generator TOTP - Generator kodów 2FA', pageDescription: 'Darmowy generator TOTP do testowania uwierzytelniania dwuskładnikowego.' },
      sv: { name: 'TOTP-generator', description: 'Generera tidsbaserade engångslösenord för 2FA-testning', pageTitle: 'TOTP-generator - 2FA-kodgenerator', pageDescription: 'Gratis TOTP-generator för testning av tvåfaktorsautentisering.' },
      no: { name: 'TOTP-generator', description: 'Generer tidsbaserte engangspassord for 2FA-testing', pageTitle: 'TOTP-generator - 2FA-kodegenerator', pageDescription: 'Gratis TOTP-generator for testing av tofaktorautentisering.' },
      id: { name: 'Generator TOTP', description: 'Buat kata sandi sekali pakai berbasis waktu untuk pengujian 2FA', pageTitle: 'Generator TOTP - Generator Kode 2FA', pageDescription: 'Generator TOTP gratis untuk menguji autentikasi dua faktor.' },
      th: { name: 'ตัวสร้าง TOTP', description: 'สร้างรหัสผ่านครั้งเดียวแบบอิงเวลาสำหรับทดสอบ 2FA', pageTitle: 'ตัวสร้าง TOTP - สร้างรหัส 2FA ออนไลน์', pageDescription: 'ตัวสร้าง TOTP ฟรีสำหรับทดสอบการยืนยันตัวตนสองปัจจัย' }
    },
    pageCode: `'use client';
import { useState, useEffect, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/components/LangContext';

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
  const lang = useLang();
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
}`
  },
  {
    id: 'connection-string-builder',
    name: 'Connection String Builder',
    icon: '🔗',
    category: 'generator',
    keywords: ['database', 'connection', 'string', 'mysql', 'postgresql', 'mongodb', 'redis', 'sql-server'],
    relatedTools: ['sql-formatter', 'json-to-mysql-schema', 'env-file-editor'],
    translations: {
      en: { name: 'DB Connection String Builder', description: 'Build database connection strings for MySQL, PostgreSQL, MongoDB and more', pageTitle: 'Database Connection String Builder Online', pageDescription: 'Free online database connection string builder. Generate connection strings for MySQL, PostgreSQL, MongoDB, Redis, SQL Server and more.' },
      zh: { name: '数据库连接字符串生成器', description: '生成 MySQL、PostgreSQL、MongoDB 等数据库连接字符串', pageTitle: '在线数据库连接字符串生成器', pageDescription: '免费在线数据库连接字符串生成器。支持 MySQL、PostgreSQL、MongoDB、Redis、SQL Server 等。' },
      ja: { name: 'DB接続文字列ビルダー', description: 'MySQL、PostgreSQL、MongoDB等のデータベース接続文字列を生成', pageTitle: 'データベース接続文字列ビルダー', pageDescription: '無料のデータベース接続文字列ビルダー。MySQL、PostgreSQL、MongoDB、Redisなどに対応。' },
      ko: { name: 'DB 연결 문자열 빌더', description: 'MySQL, PostgreSQL, MongoDB 등의 데이터베이스 연결 문자열 생성', pageTitle: '데이터베이스 연결 문자열 빌더', pageDescription: '무료 데이터베이스 연결 문자열 빌더. MySQL, PostgreSQL, MongoDB, Redis 등 지원.' },
      fr: { name: 'Générateur de chaîne de connexion DB', description: 'Créez des chaînes de connexion pour MySQL, PostgreSQL, MongoDB et plus', pageTitle: 'Générateur de chaîne de connexion base de données', pageDescription: 'Générateur gratuit de chaînes de connexion pour MySQL, PostgreSQL, MongoDB, Redis.' },
      de: { name: 'DB-Verbindungsstring-Builder', description: 'Erstellen Sie Verbindungsstrings für MySQL, PostgreSQL, MongoDB und mehr', pageTitle: 'Datenbank-Verbindungsstring-Builder', pageDescription: 'Kostenloser Datenbank-Verbindungsstring-Builder für MySQL, PostgreSQL, MongoDB, Redis.' },
      es: { name: 'Constructor de cadena de conexión DB', description: 'Cree cadenas de conexión para MySQL, PostgreSQL, MongoDB y más', pageTitle: 'Constructor de cadena de conexión de base de datos', pageDescription: 'Constructor gratuito de cadenas de conexión para MySQL, PostgreSQL, MongoDB, Redis.' },
      it: { name: 'Generatore stringa connessione DB', description: 'Crea stringhe di connessione per MySQL, PostgreSQL, MongoDB e altro', pageTitle: 'Generatore stringa connessione database', pageDescription: 'Generatore gratuito di stringhe di connessione per MySQL, PostgreSQL, MongoDB, Redis.' },
      pt: { name: 'Construtor de string de conexão DB', description: 'Crie strings de conexão para MySQL, PostgreSQL, MongoDB e mais', pageTitle: 'Construtor de string de conexão de banco de dados', pageDescription: 'Construtor gratuito de strings de conexão para MySQL, PostgreSQL, MongoDB, Redis.' },
      nl: { name: 'DB-verbindingsstring-builder', description: 'Maak verbindingsstrings voor MySQL, PostgreSQL, MongoDB en meer', pageTitle: 'Database-verbindingsstring-builder', pageDescription: 'Gratis database-verbindingsstring-builder voor MySQL, PostgreSQL, MongoDB, Redis.' },
      pl: { name: 'Generator connection string', description: 'Generuj ciągi połączenia dla MySQL, PostgreSQL, MongoDB i więcej', pageTitle: 'Generator ciągów połączenia bazy danych', pageDescription: 'Darmowy generator ciągów połączenia dla MySQL, PostgreSQL, MongoDB, Redis.' },
      sv: { name: 'DB-anslutningssträngsbyggare', description: 'Bygg anslutningssträngar för MySQL, PostgreSQL, MongoDB och mer', pageTitle: 'Databasanslutningssträngsbyggare', pageDescription: 'Gratis databasanslutningssträngsbyggare för MySQL, PostgreSQL, MongoDB, Redis.' },
      no: { name: 'DB-tilkoblingsstrengbygger', description: 'Bygg tilkoblingsstrenger for MySQL, PostgreSQL, MongoDB og mer', pageTitle: 'Database-tilkoblingsstrengbygger', pageDescription: 'Gratis database-tilkoblingsstrengbygger for MySQL, PostgreSQL, MongoDB, Redis.' },
      id: { name: 'Pembuat Connection String DB', description: 'Buat connection string untuk MySQL, PostgreSQL, MongoDB dan lainnya', pageTitle: 'Pembuat Connection String Database', pageDescription: 'Pembuat connection string database gratis untuk MySQL, PostgreSQL, MongoDB, Redis.' },
      th: { name: 'สร้าง Connection String', description: 'สร้าง connection string สำหรับ MySQL, PostgreSQL, MongoDB และอื่นๆ', pageTitle: 'สร้าง Connection String ฐานข้อมูล', pageDescription: 'เครื่องมือสร้าง connection string ฐานข้อมูลฟรี รองรับ MySQL, PostgreSQL, MongoDB, Redis' }
    },
    pageCode: `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/components/LangContext';

const DB_CONFIGS: Record<string, { defaultPort: number; template: (c: any) => string; prisma?: (c: any) => string; }> = {
  postgresql: { defaultPort: 5432, template: (c) => 'postgresql://' + c.user + ':' + c.pass + '@' + c.host + ':' + c.port + '/' + c.db + (c.ssl ? '?sslmode=require' : ''), prisma: (c) => 'postgresql://' + c.user + ':' + c.pass + '@' + c.host + ':' + c.port + '/' + c.db + '?schema=public' },
  mysql: { defaultPort: 3306, template: (c) => 'mysql://' + c.user + ':' + c.pass + '@' + c.host + ':' + c.port + '/' + c.db, prisma: (c) => 'mysql://' + c.user + ':' + c.pass + '@' + c.host + ':' + c.port + '/' + c.db },
  mongodb: { defaultPort: 27017, template: (c) => 'mongodb://' + c.user + ':' + c.pass + '@' + c.host + ':' + c.port + '/' + c.db + (c.ssl ? '?ssl=true' : '') },
  redis: { defaultPort: 6379, template: (c) => 'redis://' + (c.user ? c.user + ':' : '') + c.pass + '@' + c.host + ':' + c.port + '/' + (c.dbNum || '0') },
  sqlserver: { defaultPort: 1433, template: (c) => 'Server=' + c.host + ',' + c.port + ';Database=' + c.db + ';User Id=' + c.user + ';Password=' + c.pass + ';' + (c.ssl ? 'Encrypt=true;' : '') },
};

export default function ConnectionStringBuilderPage() {
  const lang = useLang();
  const [dbType, setDbType] = useState('postgresql');
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState('5432');
  const [user, setUser] = useState('admin');
  const [pass, setPass] = useState('password');
  const [db, setDb] = useState('mydb');
  const [ssl, setSsl] = useState(false);

  const config = { host, port, user, pass, db, ssl, dbNum: '0' };
  const connStr = DB_CONFIGS[dbType]?.template(config) || '';
  const prismaStr = DB_CONFIGS[dbType]?.prisma?.(config) || '';

  const handleDbChange = (t: string) => {
    setDbType(t);
    setPort(String(DB_CONFIGS[t]?.defaultPort || 5432));
  };

  return (
    <ToolLayout toolId="connection-string-builder">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Database Type</label>
            <select value={dbType} onChange={e => handleDbChange(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600">
              <option value="postgresql">PostgreSQL</option><option value="mysql">MySQL</option><option value="mongodb">MongoDB</option><option value="redis">Redis</option><option value="sqlserver">SQL Server</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Host</label>
            <input value={host} onChange={e => setHost(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Port</label>
            <input value={port} onChange={e => setPort(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input value={user} onChange={e => setUser(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Database</label>
            <input value={db} onChange={e => setDb(e.target.value)} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
        </div>
        <label className="flex items-center gap-2"><input type="checkbox" checked={ssl} onChange={e => setSsl(e.target.checked)} /> Enable SSL</label>
        <div>
          <div className="flex justify-between items-center mb-1"><label className="text-sm font-medium">Connection String</label><CopyButton text={connStr} /></div>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-sm">{connStr}</pre>
        </div>
        {prismaStr && <div>
          <div className="flex justify-between items-center mb-1"><label className="text-sm font-medium">Prisma DATABASE_URL</label><CopyButton text={prismaStr} /></div>
          <pre className="p-4 bg-gray-900 text-yellow-400 rounded-lg overflow-x-auto text-sm">{prismaStr}</pre>
        </div>}
      </div>
    </ToolLayout>
  );
}`
  },
  {
    id: 'systemd-unit-validator',
    name: 'Systemd Unit Validator',
    icon: '🐧',
    category: 'validator',
    keywords: ['systemd', 'unit', 'service', 'linux', 'systemctl', 'daemon', 'init'],
    relatedTools: ['nginx-config-generator', 'dockerfile-generator', 'docker-compose-generator'],
    translations: {
      en: { name: 'Systemd Unit Validator', description: 'Validate and lint systemd service unit files', pageTitle: 'Systemd Unit File Validator Online', pageDescription: 'Free online systemd unit file validator. Check .service files for common errors, missing fields, and best practices.' },
      zh: { name: 'Systemd 单元文件验证器', description: '验证和检查 systemd 服务单元文件', pageTitle: '在线 Systemd 单元文件验证器', pageDescription: '免费在线 systemd 单元文件验证器。检查 .service 文件的常见错误、缺失字段和最佳实践。' },
      ja: { name: 'Systemd ユニットバリデーター', description: 'systemdサービスユニットファイルを検証', pageTitle: 'Systemd ユニットファイルバリデーター', pageDescription: '無料のsystemdユニットファイルバリデーター。.serviceファイルのエラーチェック。' },
      ko: { name: 'Systemd 유닛 검증기', description: 'systemd 서비스 유닛 파일 검증 및 린트', pageTitle: 'Systemd 유닛 파일 검증기', pageDescription: '무료 systemd 유닛 파일 검증기. .service 파일의 일반적인 오류 확인.' },
      fr: { name: 'Validateur Systemd', description: 'Validez les fichiers unité systemd', pageTitle: 'Validateur de fichiers unité Systemd', pageDescription: 'Validateur gratuit de fichiers unité systemd. Vérifiez les erreurs courantes.' },
      de: { name: 'Systemd Unit Validator', description: 'Validieren Sie systemd-Service-Unit-Dateien', pageTitle: 'Systemd Unit Datei Validator', pageDescription: 'Kostenloser systemd Unit Datei Validator. Prüfen Sie .service Dateien auf Fehler.' },
      es: { name: 'Validador Systemd', description: 'Valide archivos de unidad systemd', pageTitle: 'Validador de archivos Systemd', pageDescription: 'Validador gratuito de archivos de unidad systemd.' },
      it: { name: 'Validatore Systemd', description: 'Valida i file unità systemd', pageTitle: 'Validatore file unità Systemd', pageDescription: 'Validatore gratuito di file unità systemd.' },
      pt: { name: 'Validador Systemd', description: 'Valide arquivos de unidade systemd', pageTitle: 'Validador de arquivos Systemd', pageDescription: 'Validador gratuito de arquivos de unidade systemd.' },
      nl: { name: 'Systemd Unit Validator', description: 'Valideer systemd service unit-bestanden', pageTitle: 'Systemd Unit Bestand Validator', pageDescription: 'Gratis systemd unit bestand validator.' },
      pl: { name: 'Walidator Systemd', description: 'Waliduj pliki jednostek systemd', pageTitle: 'Walidator plików Systemd', pageDescription: 'Darmowy walidator plików jednostek systemd.' },
      sv: { name: 'Systemd-enhetvalidator', description: 'Validera systemd service unit-filer', pageTitle: 'Systemd enhetsfil-validator', pageDescription: 'Gratis systemd enhetsfil-validator.' },
      no: { name: 'Systemd-enhetsvalidator', description: 'Valider systemd service unit-filer', pageTitle: 'Systemd enhetsfil-validator', pageDescription: 'Gratis systemd enhetsfil-validator.' },
      id: { name: 'Validator Unit Systemd', description: 'Validasi file unit layanan systemd', pageTitle: 'Validator File Unit Systemd', pageDescription: 'Validator file unit systemd gratis.' },
      th: { name: 'ตรวจสอบ Systemd Unit', description: 'ตรวจสอบไฟล์ systemd service unit', pageTitle: 'ตรวจสอบไฟล์ Systemd Unit ออนไลน์', pageDescription: 'เครื่องมือตรวจสอบไฟล์ systemd unit ฟรี' }
    },
    pageCode: `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/components/LangContext';

const SAMPLE = \`[Unit]
Description=My Application Service
After=network.target
Wants=network-online.target

[Service]
Type=simple
User=app
WorkingDirectory=/opt/myapp
ExecStart=/opt/myapp/bin/start
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target\`;

interface Issue { level: 'error' | 'warning' | 'info'; message: string; }

function validate(content: string): Issue[] {
  const issues: Issue[] = [];
  const lines = content.split('\\n');
  const sections: string[] = [];
  const hasField = (f: string) => lines.some(l => l.trim().startsWith(f + '='));

  for (const line of lines) {
    const m = line.match(/^\\[(.+?)\\]/);
    if (m) sections.push(m[1]);
  }

  if (!sections.includes('Unit')) issues.push({ level: 'error', message: '[Unit] section is missing' });
  if (!sections.includes('Service') && !sections.includes('Timer') && !sections.includes('Socket'))
    issues.push({ level: 'error', message: 'No [Service], [Timer], or [Socket] section found' });
  if (!sections.includes('Install')) issues.push({ level: 'warning', message: '[Install] section is missing - unit cannot be enabled' });
  if (!hasField('Description')) issues.push({ level: 'warning', message: 'Missing Description field in [Unit]' });
  if (sections.includes('Service')) {
    if (!hasField('ExecStart')) issues.push({ level: 'error', message: 'Missing ExecStart in [Service]' });
    if (!hasField('Type')) issues.push({ level: 'info', message: 'No Type specified, defaults to "simple"' });
    if (!hasField('Restart')) issues.push({ level: 'warning', message: 'No Restart policy set - service won\\'t restart on failure' });
    if (!hasField('User')) issues.push({ level: 'warning', message: 'No User specified - will run as root' });
  }
  if (hasField('WantedBy') && !sections.includes('Install'))
    issues.push({ level: 'error', message: 'WantedBy outside [Install] section' });

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l && !l.startsWith('#') && !l.startsWith(';') && !l.startsWith('[') && !l.includes('='))
      issues.push({ level: 'error', message: 'Line ' + (i + 1) + ': Invalid syntax - "' + l.substring(0, 40) + '"' });
  }

  if (issues.length === 0) issues.push({ level: 'info', message: 'Unit file looks valid!' });
  return issues;
}

export default function SystemdValidatorPage() {
  const lang = useLang();
  const [input, setInput] = useState(SAMPLE);
  const issues = validate(input);
  const errors = issues.filter(i => i.level === 'error').length;
  const warnings = issues.filter(i => i.level === 'warning').length;

  return (
    <ToolLayout toolId="systemd-unit-validator">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Unit File</label>
            <button onClick={() => setInput(SAMPLE)} className="text-sm text-blue-600 hover:underline">Load Example</button>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={20} className="w-full p-3 border rounded-lg font-mono text-sm dark:bg-gray-800 dark:border-gray-600" spellCheck={false} />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Validation Results</label>
            <span className="text-sm">{errors > 0 ? errors + ' errors' : 'No errors'}{warnings > 0 ? ', ' + warnings + ' warnings' : ''}</span>
          </div>
          <div className="space-y-2">
            {issues.map((issue, i) => (
              <div key={i} className={'p-3 rounded-lg text-sm ' + (issue.level === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800' : issue.level === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800')}>
                <span className="font-semibold">{issue.level === 'error' ? '✗' : issue.level === 'warning' ? '⚠' : 'ℹ'}</span> {issue.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}`
  },
  {
    id: 'api-rate-limit-calculator',
    name: 'API Rate Limit Calculator',
    icon: '⏱️',
    category: 'web',
    keywords: ['api', 'rate', 'limit', 'throttle', 'quota', 'requests', 'llm', 'token', 'cost'],
    relatedTools: ['ai-token-counter', 'api-tester', 'http-request-builder'],
    translations: {
      en: { name: 'API Rate Limit Calculator', description: 'Calculate API rate limits, costs, and quota planning for LLM and REST APIs', pageTitle: 'API Rate Limit Calculator - Cost Estimator', pageDescription: 'Free API rate limit calculator. Plan API usage, estimate costs for OpenAI, Claude, and other LLM APIs with quota optimization.' },
      zh: { name: 'API 速率限制计算器', description: '计算 API 速率限制、成本和配额规划', pageTitle: 'API 速率限制计算器 - 成本估算', pageDescription: '免费 API 速率限制计算器。规划 API 用量，估算 OpenAI、Claude 等 LLM API 成本。' },
      ja: { name: 'APIレート制限計算機', description: 'APIレート制限、コスト、クォータ計画を計算', pageTitle: 'APIレート制限計算機 - コスト見積もり', pageDescription: '無料APIレート制限計算機。OpenAI、Claude等のLLM APIコストを見積もり。' },
      ko: { name: 'API 속도 제한 계산기', description: 'API 속도 제한, 비용, 할당량 계획 계산', pageTitle: 'API 속도 제한 계산기 - 비용 추정', pageDescription: '무료 API 속도 제한 계산기. OpenAI, Claude 등 LLM API 비용 추정.' },
      fr: { name: 'Calculateur de limites API', description: 'Calculez les limites, coûts et quotas d\'API', pageTitle: 'Calculateur de limites API', pageDescription: 'Calculateur gratuit de limites de taux API.' },
      de: { name: 'API Rate Limit Rechner', description: 'Berechnen Sie API-Ratenlimits, Kosten und Kontingentplanung', pageTitle: 'API Rate Limit Rechner', pageDescription: 'Kostenloser API Rate Limit Rechner.' },
      es: { name: 'Calculadora de límites API', description: 'Calcule límites de tasa, costos y planificación de cuotas', pageTitle: 'Calculadora de límites de API', pageDescription: 'Calculadora gratuita de límites de tasa de API.' },
      it: { name: 'Calcolatore limiti API', description: 'Calcola limiti, costi e pianificazione quote API', pageTitle: 'Calcolatore limiti API', pageDescription: 'Calcolatore gratuito di limiti API.' },
      pt: { name: 'Calculadora de limites de API', description: 'Calcule limites de taxa, custos e planejamento de cotas', pageTitle: 'Calculadora de limites de API', pageDescription: 'Calculadora gratuita de limites de taxa de API.' },
      nl: { name: 'API Rate Limit Calculator', description: 'Bereken API-snelheidslimieten, kosten en quotaplanning', pageTitle: 'API Rate Limit Calculator', pageDescription: 'Gratis API rate limit calculator.' },
      pl: { name: 'Kalkulator limitów API', description: 'Oblicz limity szybkości API, koszty i planowanie przydziałów', pageTitle: 'Kalkulator limitów API', pageDescription: 'Darmowy kalkulator limitów szybkości API.' },
      sv: { name: 'API-hastighetsgränsräknare', description: 'Beräkna API-hastighetsgränser, kostnader och kvotplanering', pageTitle: 'API-hastighetsgränsräknare', pageDescription: 'Gratis API-hastighetsgränsräknare.' },
      no: { name: 'API-hastighetsgrensekalkulator', description: 'Beregn API-hastighetsgrenser, kostnader og kvoteplanlegging', pageTitle: 'API-hastighetsgrensekalkulator', pageDescription: 'Gratis API-hastighetsgrensekalkulator.' },
      id: { name: 'Kalkulator Rate Limit API', description: 'Hitung rate limit API, biaya, dan perencanaan kuota', pageTitle: 'Kalkulator Rate Limit API', pageDescription: 'Kalkulator rate limit API gratis.' },
      th: { name: 'คำนวณ Rate Limit API', description: 'คำนวณ rate limit, ค่าใช้จ่าย และการวางแผนโควต้า API', pageTitle: 'คำนวณ Rate Limit API', pageDescription: 'เครื่องมือคำนวณ rate limit API ฟรี' }
    },
    pageCode: `'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/components/LangContext';

const MODELS = [
  { name: 'GPT-4o', inputCost: 2.5, outputCost: 10, rpmLimit: 500, tpmLimit: 30000 },
  { name: 'GPT-4o-mini', inputCost: 0.15, outputCost: 0.6, rpmLimit: 500, tpmLimit: 200000 },
  { name: 'Claude Opus 4', inputCost: 15, outputCost: 75, rpmLimit: 1000, tpmLimit: 80000 },
  { name: 'Claude Sonnet 4', inputCost: 3, outputCost: 15, rpmLimit: 1000, tpmLimit: 80000 },
  { name: 'Claude Haiku 3.5', inputCost: 0.8, outputCost: 4, rpmLimit: 1000, tpmLimit: 100000 },
  { name: 'Gemini 2.5 Pro', inputCost: 1.25, outputCost: 10, rpmLimit: 360, tpmLimit: 4000000 },
];

export default function APIRateLimitPage() {
  const lang = useLang();
  const [reqPerDay, setReqPerDay] = useState(1000);
  const [avgInputTokens, setAvgInputTokens] = useState(500);
  const [avgOutputTokens, setAvgOutputTokens] = useState(200);

  const calcCost = (m: typeof MODELS[0]) => {
    const inputCost = (reqPerDay * avgInputTokens / 1_000_000) * m.inputCost;
    const outputCost = (reqPerDay * avgOutputTokens / 1_000_000) * m.outputCost;
    return { daily: inputCost + outputCost, monthly: (inputCost + outputCost) * 30, rpmNeeded: Math.ceil(reqPerDay / 1440), withinLimits: Math.ceil(reqPerDay / 1440) <= m.rpmLimit };
  };

  return (
    <ToolLayout toolId="api-rate-limit-calculator">
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Requests per Day</label>
            <input type="number" value={reqPerDay} onChange={e => setReqPerDay(Number(e.target.value))} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Avg Input Tokens</label>
            <input type="number" value={avgInputTokens} onChange={e => setAvgInputTokens(Number(e.target.value))} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Avg Output Tokens</label>
            <input type="number" value={avgOutputTokens} onChange={e => setAvgOutputTokens(Number(e.target.value))} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left p-3">Model</th>
                <th className="text-right p-3">Input $/1M</th>
                <th className="text-right p-3">Output $/1M</th>
                <th className="text-right p-3">Daily Cost</th>
                <th className="text-right p-3">Monthly Cost</th>
                <th className="text-right p-3">RPM Needed</th>
                <th className="text-center p-3">Within Limits</th>
              </tr>
            </thead>
            <tbody>
              {MODELS.map(m => {
                const c = calcCost(m);
                return (
                  <tr key={m.name} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-3 font-medium">{m.name}</td>
                    <td className="p-3 text-right">${'{'}m.inputCost{'}'}</td>
                    <td className="p-3 text-right">${'{'}m.outputCost{'}'}</td>
                    <td className="p-3 text-right font-mono">${'{'}c.daily.toFixed(2){'}'}</td>
                    <td className="p-3 text-right font-mono font-bold">${'{'}c.monthly.toFixed(2){'}'}</td>
                    <td className="p-3 text-right">{'{'}c.rpmNeeded{'}'}/{'{'}m.rpmLimit{'}'}</td>
                    <td className="p-3 text-center">{'{'}c.withinLimits ? '✅' : '⚠️'{'}'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500">* Pricing as of March 2026. Actual costs may vary. Check provider documentation for current rates.</p>
      </div>
    </ToolLayout>
  );
}`
  }
];

// ====== EXECUTION ======
console.log('=== Creating 5 New Tools (Batch 2a) ===\n');

// 1. Add to tools.ts
console.log('1. Adding tool entries to tools.ts...');
let toolsContent = fs.readFileSync(TOOLS_FILE, 'utf8');
for (const tool of newTools) {
  if (toolsContent.includes("id: '" + tool.id + "'")) { console.log('  ⏭ ' + tool.id + ' already exists'); continue; }
  const entry = "  { id: '" + tool.id + "', name: '" + tool.name + "', description: '" + tool.translations.en.description + "', icon: '" + tool.icon + "', category: '" + tool.category + "', keywords: " + JSON.stringify(tool.keywords) + ", path: '/tools/" + tool.id + "', relatedTools: " + JSON.stringify(tool.relatedTools) + " },";
  toolsContent = toolsContent.replace(/\];[\s]*$/, entry + '\n];\n');
  console.log('  ✓ Added ' + tool.id);
}
fs.writeFileSync(TOOLS_FILE, toolsContent);

// 2. Create tool files
console.log('\n2. Creating tool files...');
for (const tool of newTools) {
  const dir = path.join(TOOLS_DIR, tool.id);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // layout.tsx
  const layout = `import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/getDictionary';
import ToolSeoServer from '@/components/ToolSeoServer';

type Props = { params: Promise<{ lang: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.tools?.['${tool.id}'];
  return {
    title: t?.pageTitle || '${tool.name}',
    description: t?.pageDescription || t?.description || '${tool.translations.en.description}',
    alternates: {
      languages: Object.fromEntries(
        ['en','zh','ja','ko','fr','de','es','it','pt','nl','pl','sv','no','id','th']
          .map(l => [l, '/' + l + '/tools/${tool.id}'])
      ),
    },
  };
}

export default async function Layout({ params, children }: Props) {
  const { lang } = await params;
  return <ToolSeoServer toolId="${tool.id}" lang={lang}>{children}</ToolSeoServer>;
}
`;
  fs.writeFileSync(path.join(dir, 'layout.tsx'), layout);
  fs.writeFileSync(path.join(dir, 'page.tsx'), tool.pageCode);
  console.log('  ✓ Created ' + tool.id + '/layout.tsx + page.tsx');
}

// 3. Update dictionaries
console.log('\n3. Updating dictionary files...');
const langs = ['en','zh','ja','ko','fr','de','es','it','pt','nl','pl','sv','no','id','th'];
for (const lang of langs) {
  const fp = path.join(DICT_DIR, lang + '.json');
  const dict = JSON.parse(fs.readFileSync(fp, 'utf8'));
  if (!dict.tools) dict.tools = {};
  let added = 0;
  for (const tool of newTools) {
    if (!dict.tools[tool.id]) {
      dict.tools[tool.id] = tool.translations[lang] || tool.translations.en;
      added++;
    }
  }
  fs.writeFileSync(fp, JSON.stringify(dict, null, 2));
  console.log('  ✓ Updated ' + lang + '.json (+' + added + ' tools)');
}

console.log('\n=== Done! Created ' + newTools.length + ' new tools ===');
console.log('Tools: ' + newTools.map(t => t.id).join(', '));
