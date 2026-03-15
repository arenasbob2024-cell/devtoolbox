'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface Message { type: 'sent' | 'received' | 'system'; content: string; time: string; }

export default function WebSocketTesterPage() {
  const { dict, lang } = useLang();
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

  const allText = messages.map(m => '[' + m.time + '] ' + m.type.toUpperCase() + ': ' + m.content).join('\n');

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
}