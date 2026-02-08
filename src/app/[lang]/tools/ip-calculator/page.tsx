'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

function ipToNum(ip: string): number {
  const parts = ip.split('.').map(Number);
  return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
}

function numToIp(n: number): string {
  return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join('.');
}

function calcSubnet(ipStr: string, cidr: number) {
  const ip = ipToNum(ipStr);
  const mask = cidr >= 0 && cidr <= 32 ? ~((1 << (32 - cidr)) - 1) >>> 0 : 0xffffffff;
  const network = (ip & mask) >>> 0;
  const wildcard = ~mask >>> 0;
  const broadcast = (network | wildcard) >>> 0;
  const firstHost = cidr <= 30 ? network + 1 : network;
  const lastHost = cidr <= 30 ? broadcast - 1 : broadcast;
  const hosts = cidr <= 30 ? Math.max(0, broadcast - network - 1) : 0;
  return {
    network: numToIp(network),
    broadcast: numToIp(broadcast),
    subnetMask: numToIp(mask),
    wildcard: numToIp(wildcard),
    firstHost: numToIp(firstHost),
    lastHost: numToIp(lastHost),
    hosts,
  };
}

export default function IpCalculator() {
  const { dict } = useLang();
  const t = dict.tools['ip-calculator'];
  const [ip, setIp] = useState('192.168.1.0');
  const [cidr, setCidr] = useState(24);

  const match = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  const valid = match && match.slice(1).every(p => parseInt(p, 10) >= 0 && parseInt(p, 10) <= 255);
  const result = useMemo(() => valid && cidr >= 0 && cidr <= 32 ? calcSubnet(ip, cidr) : null, [ip, cidr, valid]);

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="ip-calculator">
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>IP Address</label>
          <input
            type="text"
            value={ip}
            onChange={e => setIp(e.target.value)}
            placeholder="192.168.1.0"
            style={{ width: 140, padding: '8px 12px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)' }}
          />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>CIDR</label>
          <input
            type="number"
            value={cidr}
            onChange={e => setCidr(Math.min(32, Math.max(0, parseInt(e.target.value) || 0)))}
            min={0}
            max={32}
            style={{ width: 60, padding: '8px 12px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)' }}
          />
        </div>
      </div>
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'Network', value: result.network },
            { label: 'Broadcast', value: result.broadcast },
            { label: 'Subnet Mask', value: result.subnetMask },
            { label: 'Wildcard', value: result.wildcard },
            { label: 'First Host', value: result.firstHost },
            { label: 'Last Host', value: result.lastHost },
            { label: 'Hosts', value: String(result.hosts) },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
              <code style={{ fontSize: 14 }}>{value}</code>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
