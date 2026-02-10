'use client';

import { useState, useMemo, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

// ── Types ────────────────────────────────────────────────────────────────

interface EnvVar { key: string; value: string }
interface VolumeMapping { host: string; container: string }
interface PortMapping { host: string; container: string }

interface Service {
  name: string;
  image: string;
  ports: PortMapping[];
  environment: EnvVar[];
  volumes: VolumeMapping[];
  dependsOn: string[];
  restart: string;
  networks: string[];
}

interface NetworkDef { name: string; driver: string }
interface VolumeDef { name: string; driver: string }

// ── Defaults ─────────────────────────────────────────────────────────────

const RESTART_POLICIES = ['no', 'always', 'on-failure', 'unless-stopped'];

function createService(name = '', image = ''): Service {
  return {
    name,
    image,
    ports: [],
    environment: [],
    volumes: [],
    dependsOn: [],
    restart: 'unless-stopped',
    networks: [],
  };
}

// ── Preset Stacks ────────────────────────────────────────────────────────

interface PresetStack {
  label: string;
  services: Service[];
  networks: NetworkDef[];
  volumes: VolumeDef[];
}

const PRESETS: PresetStack[] = [
  {
    label: 'MEAN (Mongo + Express + Angular + Node)',
    services: [
      {
        ...createService('mongo', 'mongo:7'),
        ports: [{ host: '27017', container: '27017' }],
        volumes: [{ host: 'mongo-data', container: '/data/db' }],
        networks: ['app-network'],
      },
      {
        ...createService('api', 'node:20-alpine'),
        ports: [{ host: '3000', container: '3000' }],
        environment: [{ key: 'MONGO_URI', value: 'mongodb://mongo:27017/app' }],
        dependsOn: ['mongo'],
        volumes: [{ host: './api', container: '/app' }],
        networks: ['app-network'],
      },
      {
        ...createService('client', 'node:20-alpine'),
        ports: [{ host: '4200', container: '4200' }],
        dependsOn: ['api'],
        volumes: [{ host: './client', container: '/app' }],
        networks: ['app-network'],
      },
    ],
    networks: [{ name: 'app-network', driver: 'bridge' }],
    volumes: [{ name: 'mongo-data', driver: 'local' }],
  },
  {
    label: 'MERN (Mongo + Express + React + Node)',
    services: [
      {
        ...createService('mongo', 'mongo:7'),
        ports: [{ host: '27017', container: '27017' }],
        volumes: [{ host: 'mongo-data', container: '/data/db' }],
        networks: ['app-network'],
      },
      {
        ...createService('api', 'node:20-alpine'),
        ports: [{ host: '5000', container: '5000' }],
        environment: [{ key: 'MONGO_URI', value: 'mongodb://mongo:27017/app' }],
        dependsOn: ['mongo'],
        volumes: [{ host: './server', container: '/app' }],
        networks: ['app-network'],
      },
      {
        ...createService('client', 'node:20-alpine'),
        ports: [{ host: '3000', container: '3000' }],
        dependsOn: ['api'],
        volumes: [{ host: './client', container: '/app' }],
        networks: ['app-network'],
      },
    ],
    networks: [{ name: 'app-network', driver: 'bridge' }],
    volumes: [{ name: 'mongo-data', driver: 'local' }],
  },
  {
    label: 'LAMP (Linux + Apache + MySQL + PHP)',
    services: [
      {
        ...createService('mysql', 'mysql:8'),
        ports: [{ host: '3306', container: '3306' }],
        environment: [
          { key: 'MYSQL_ROOT_PASSWORD', value: 'rootpass' },
          { key: 'MYSQL_DATABASE', value: 'app' },
          { key: 'MYSQL_USER', value: 'user' },
          { key: 'MYSQL_PASSWORD', value: 'password' },
        ],
        volumes: [{ host: 'mysql-data', container: '/var/lib/mysql' }],
        networks: ['lamp-network'],
      },
      {
        ...createService('php-apache', 'php:8.3-apache'),
        ports: [{ host: '80', container: '80' }],
        dependsOn: ['mysql'],
        volumes: [{ host: './src', container: '/var/www/html' }],
        networks: ['lamp-network'],
      },
    ],
    networks: [{ name: 'lamp-network', driver: 'bridge' }],
    volumes: [{ name: 'mysql-data', driver: 'local' }],
  },
  {
    label: 'Django + Postgres',
    services: [
      {
        ...createService('db', 'postgres:16-alpine'),
        ports: [{ host: '5432', container: '5432' }],
        environment: [
          { key: 'POSTGRES_DB', value: 'django_db' },
          { key: 'POSTGRES_USER', value: 'django' },
          { key: 'POSTGRES_PASSWORD', value: 'password' },
        ],
        volumes: [{ host: 'pg-data', container: '/var/lib/postgresql/data' }],
        networks: ['django-network'],
      },
      {
        ...createService('web', 'python:3.12-slim'),
        ports: [{ host: '8000', container: '8000' }],
        environment: [
          { key: 'DATABASE_URL', value: 'postgres://django:password@db:5432/django_db' },
        ],
        dependsOn: ['db'],
        volumes: [{ host: '.', container: '/app' }],
        networks: ['django-network'],
      },
    ],
    networks: [{ name: 'django-network', driver: 'bridge' }],
    volumes: [{ name: 'pg-data', driver: 'local' }],
  },
  {
    label: 'Rails + Postgres',
    services: [
      {
        ...createService('db', 'postgres:16-alpine'),
        ports: [{ host: '5432', container: '5432' }],
        environment: [
          { key: 'POSTGRES_DB', value: 'rails_db' },
          { key: 'POSTGRES_USER', value: 'rails' },
          { key: 'POSTGRES_PASSWORD', value: 'password' },
        ],
        volumes: [{ host: 'pg-data', container: '/var/lib/postgresql/data' }],
        networks: ['rails-network'],
      },
      {
        ...createService('web', 'ruby:3.3-slim'),
        ports: [{ host: '3000', container: '3000' }],
        environment: [
          { key: 'DATABASE_URL', value: 'postgres://rails:password@db:5432/rails_db' },
          { key: 'RAILS_ENV', value: 'development' },
        ],
        dependsOn: ['db'],
        volumes: [{ host: '.', container: '/app' }],
        networks: ['rails-network'],
      },
    ],
    networks: [{ name: 'rails-network', driver: 'bridge' }],
    volumes: [{ name: 'pg-data', driver: 'local' }],
  },
  {
    label: 'WordPress + MySQL',
    services: [
      {
        ...createService('mysql', 'mysql:8'),
        environment: [
          { key: 'MYSQL_ROOT_PASSWORD', value: 'rootpass' },
          { key: 'MYSQL_DATABASE', value: 'wordpress' },
          { key: 'MYSQL_USER', value: 'wp_user' },
          { key: 'MYSQL_PASSWORD', value: 'wp_pass' },
        ],
        volumes: [{ host: 'db-data', container: '/var/lib/mysql' }],
        networks: ['wp-network'],
      },
      {
        ...createService('wordpress', 'wordpress:latest'),
        ports: [{ host: '8080', container: '80' }],
        environment: [
          { key: 'WORDPRESS_DB_HOST', value: 'mysql:3306' },
          { key: 'WORDPRESS_DB_USER', value: 'wp_user' },
          { key: 'WORDPRESS_DB_PASSWORD', value: 'wp_pass' },
          { key: 'WORDPRESS_DB_NAME', value: 'wordpress' },
        ],
        dependsOn: ['mysql'],
        volumes: [{ host: 'wp-data', container: '/var/www/html' }],
        networks: ['wp-network'],
      },
    ],
    networks: [{ name: 'wp-network', driver: 'bridge' }],
    volumes: [{ name: 'db-data', driver: 'local' }, { name: 'wp-data', driver: 'local' }],
  },
  {
    label: 'Node + Redis + Mongo',
    services: [
      {
        ...createService('mongo', 'mongo:7'),
        ports: [{ host: '27017', container: '27017' }],
        volumes: [{ host: 'mongo-data', container: '/data/db' }],
        networks: ['app-network'],
      },
      {
        ...createService('redis', 'redis:7-alpine'),
        ports: [{ host: '6379', container: '6379' }],
        volumes: [{ host: 'redis-data', container: '/data' }],
        networks: ['app-network'],
      },
      {
        ...createService('app', 'node:20-alpine'),
        ports: [{ host: '3000', container: '3000' }],
        environment: [
          { key: 'MONGO_URI', value: 'mongodb://mongo:27017/app' },
          { key: 'REDIS_URL', value: 'redis://redis:6379' },
        ],
        dependsOn: ['mongo', 'redis'],
        volumes: [{ host: '.', container: '/app' }],
        networks: ['app-network'],
      },
    ],
    networks: [{ name: 'app-network', driver: 'bridge' }],
    volumes: [{ name: 'mongo-data', driver: 'local' }, { name: 'redis-data', driver: 'local' }],
  },
];

// ── YAML Generator ───────────────────────────────────────────────────────

function generateYaml(
  services: Service[],
  networks: NetworkDef[],
  volumeDefs: VolumeDef[],
): string {
  const lines: string[] = [];

  // Services
  if (services.length > 0) {
    lines.push('services:');
    for (const svc of services) {
      const svcName = svc.name.trim() || 'unnamed';
      lines.push(`  ${svcName}:`);
      if (svc.image.trim()) {
        lines.push(`    image: ${svc.image.trim()}`);
      }
      if (svc.restart && svc.restart !== 'no') {
        lines.push(`    restart: ${svc.restart}`);
      }
      if (svc.ports.length > 0) {
        const validPorts = svc.ports.filter(p => p.host.trim() || p.container.trim());
        if (validPorts.length > 0) {
          lines.push('    ports:');
          for (const p of validPorts) {
            lines.push(`      - "${p.host.trim()}:${p.container.trim()}"`);
          }
        }
      }
      if (svc.environment.length > 0) {
        const validEnvs = svc.environment.filter(e => e.key.trim());
        if (validEnvs.length > 0) {
          lines.push('    environment:');
          for (const e of validEnvs) {
            lines.push(`      - ${e.key.trim()}=${e.value}`);
          }
        }
      }
      if (svc.volumes.length > 0) {
        const validVols = svc.volumes.filter(v => v.host.trim() || v.container.trim());
        if (validVols.length > 0) {
          lines.push('    volumes:');
          for (const v of validVols) {
            lines.push(`      - ${v.host.trim()}:${v.container.trim()}`);
          }
        }
      }
      if (svc.dependsOn.length > 0) {
        const validDeps = svc.dependsOn.filter(d => d.trim());
        if (validDeps.length > 0) {
          lines.push('    depends_on:');
          for (const d of validDeps) {
            lines.push(`      - ${d.trim()}`);
          }
        }
      }
      if (svc.networks.length > 0) {
        const validNets = svc.networks.filter(n => n.trim());
        if (validNets.length > 0) {
          lines.push('    networks:');
          for (const n of validNets) {
            lines.push(`      - ${n.trim()}`);
          }
        }
      }
      lines.push('');
    }
  }

  // Networks
  if (networks.length > 0) {
    lines.push('networks:');
    for (const net of networks) {
      if (net.name.trim()) {
        lines.push(`  ${net.name.trim()}:`);
        lines.push(`    driver: ${net.driver || 'bridge'}`);
      }
    }
    lines.push('');
  }

  // Volumes
  if (volumeDefs.length > 0) {
    lines.push('volumes:');
    for (const vol of volumeDefs) {
      if (vol.name.trim()) {
        lines.push(`  ${vol.name.trim()}:`);
        lines.push(`    driver: ${vol.driver || 'local'}`);
      }
    }
    lines.push('');
  }

  return lines.join('\n');
}

// ── Styles ───────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)',
  display: 'block', marginBottom: 4,
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 12px', fontSize: 13, borderRadius: 8,
  border: '1px solid var(--border-color)', background: 'var(--bg-input)',
  color: 'var(--text-primary)', boxSizing: 'border-box',
};

const smallInputStyle: React.CSSProperties = {
  ...inputStyle,
  padding: '6px 10px', fontSize: 12,
};

const smallBtnStyle: React.CSSProperties = {
  fontSize: 11, padding: '4px 10px', cursor: 'pointer',
  borderRadius: 6, border: '1px solid var(--border-color)',
  background: 'var(--bg-input)', color: 'var(--text-primary)',
};

const removeBtnStyle: React.CSSProperties = {
  ...smallBtnStyle,
  color: 'var(--accent-rose)',
  border: '1px solid rgba(244, 63, 94, 0.3)',
  background: 'rgba(244, 63, 94, 0.1)',
};

const addBtnStyle: React.CSSProperties = {
  ...smallBtnStyle,
  color: 'var(--accent-blue)',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  background: 'rgba(59, 130, 246, 0.1)',
};

const cardStyle: React.CSSProperties = {
  padding: 16, marginBottom: 12, borderRadius: 10,
  border: '1px solid var(--border-color)', background: 'var(--bg-card)',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)',
  marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5,
};

// ── Component ────────────────────────────────────────────────────────────

export default function DockerComposeGenerator() {
  const { dict } = useLang();
  const t = dict.tools['docker-compose-generator'] as Record<string, unknown>;

  const [services, setServices] = useState<Service[]>([createService('web', 'nginx:alpine')]);
  const [networks, setNetworks] = useState<NetworkDef[]>([]);
  const [volumeDefs, setVolumeDefs] = useState<VolumeDef[]>([]);

  // ── Service helpers ─────────────────────────────────────────────────

  const updateService = useCallback((index: number, updater: (svc: Service) => Service) => {
    setServices(prev => prev.map((s, i) => i === index ? updater(s) : s));
  }, []);

  const removeService = useCallback((index: number) => {
    setServices(prev => prev.filter((_, i) => i !== index));
  }, []);

  const addService = useCallback(() => {
    setServices(prev => [...prev, createService()]);
  }, []);

  // ── Preset loader ───────────────────────────────────────────────────

  const loadPreset = useCallback((preset: PresetStack) => {
    setServices(preset.services);
    setNetworks(preset.networks);
    setVolumeDefs(preset.volumes);
  }, []);

  // ── Reset ───────────────────────────────────────────────────────────

  const handleReset = useCallback(() => {
    setServices([createService('web', 'nginx:alpine')]);
    setNetworks([]);
    setVolumeDefs([]);
  }, []);

  // ── YAML output ─────────────────────────────────────────────────────

  const yamlOutput = useMemo(() => {
    return generateYaml(services, networks, volumeDefs);
  }, [services, networks, volumeDefs]);

  // ── Render service card ─────────────────────────────────────────────

  const renderServiceCard = (svc: Service, index: number) => {
    const otherServiceNames = services
      .filter((_, i) => i !== index)
      .map(s => s.name.trim())
      .filter(Boolean);

    return (
      <div key={index} style={cardStyle}>
        {/* Service header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
            Service #{index + 1}{svc.name ? `: ${svc.name}` : ''}
          </span>
          {services.length > 1 && (
            <button style={removeBtnStyle} onClick={() => removeService(index)}>Remove</button>
          )}
        </div>

        {/* Name + Image */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <label style={labelStyle}>Service Name</label>
            <input
              style={inputStyle}
              value={svc.name}
              onChange={e => updateService(index, s => ({ ...s, name: e.target.value }))}
              placeholder="e.g. web, db, redis"
            />
          </div>
          <div>
            <label style={labelStyle}>Image</label>
            <input
              style={inputStyle}
              value={svc.image}
              onChange={e => updateService(index, s => ({ ...s, image: e.target.value }))}
              placeholder="e.g. nginx:alpine, postgres:16"
            />
          </div>
        </div>

        {/* Restart + Depends On */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <label style={labelStyle}>Restart Policy</label>
            <select
              style={inputStyle}
              value={svc.restart}
              onChange={e => updateService(index, s => ({ ...s, restart: e.target.value }))}
            >
              {RESTART_POLICIES.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Depends On</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {otherServiceNames.length > 0 ? otherServiceNames.map(name => {
                const isSelected = svc.dependsOn.includes(name);
                return (
                  <button
                    key={name}
                    onClick={() => {
                      updateService(index, s => ({
                        ...s,
                        dependsOn: isSelected
                          ? s.dependsOn.filter(d => d !== name)
                          : [...s.dependsOn, name],
                      }));
                    }}
                    style={{
                      ...smallBtnStyle,
                      fontSize: 11,
                      padding: '3px 8px',
                      background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-input)',
                      color: isSelected ? 'var(--accent-blue)' : 'var(--text-secondary)',
                      border: isSelected ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid var(--border-color)',
                    }}
                  >
                    {name}
                  </button>
                );
              }) : (
                <span style={{ fontSize: 11, color: 'var(--text-secondary)', padding: '4px 0' }}>No other services</span>
              )}
            </div>
          </div>
        </div>

        {/* Ports */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ ...labelStyle, marginBottom: 0 }}>Ports</label>
            <button
              style={addBtnStyle}
              onClick={() => updateService(index, s => ({ ...s, ports: [...s.ports, { host: '', container: '' }] }))}
            >
              + Add Port
            </button>
          </div>
          {svc.ports.map((port, pi) => (
            <div key={pi} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <input
                style={{ ...smallInputStyle, flex: 1 }}
                value={port.host}
                onChange={e => {
                  const val = e.target.value;
                  updateService(index, s => ({
                    ...s,
                    ports: s.ports.map((p, j) => j === pi ? { ...p, host: val } : p),
                  }));
                }}
                placeholder="Host port"
              />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>:</span>
              <input
                style={{ ...smallInputStyle, flex: 1 }}
                value={port.container}
                onChange={e => {
                  const val = e.target.value;
                  updateService(index, s => ({
                    ...s,
                    ports: s.ports.map((p, j) => j === pi ? { ...p, container: val } : p),
                  }));
                }}
                placeholder="Container port"
              />
              <button
                style={removeBtnStyle}
                onClick={() => updateService(index, s => ({ ...s, ports: s.ports.filter((_, j) => j !== pi) }))}
              >
                x
              </button>
            </div>
          ))}
        </div>

        {/* Environment Variables */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ ...labelStyle, marginBottom: 0 }}>Environment Variables</label>
            <button
              style={addBtnStyle}
              onClick={() => updateService(index, s => ({ ...s, environment: [...s.environment, { key: '', value: '' }] }))}
            >
              + Add Env
            </button>
          </div>
          {svc.environment.map((env, ei) => (
            <div key={ei} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <input
                style={{ ...smallInputStyle, flex: 1 }}
                value={env.key}
                onChange={e => {
                  const val = e.target.value;
                  updateService(index, s => ({
                    ...s,
                    environment: s.environment.map((ev, j) => j === ei ? { ...ev, key: val } : ev),
                  }));
                }}
                placeholder="KEY"
              />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>=</span>
              <input
                style={{ ...smallInputStyle, flex: 1 }}
                value={env.value}
                onChange={e => {
                  const val = e.target.value;
                  updateService(index, s => ({
                    ...s,
                    environment: s.environment.map((ev, j) => j === ei ? { ...ev, value: val } : ev),
                  }));
                }}
                placeholder="value"
              />
              <button
                style={removeBtnStyle}
                onClick={() => updateService(index, s => ({ ...s, environment: s.environment.filter((_, j) => j !== ei) }))}
              >
                x
              </button>
            </div>
          ))}
        </div>

        {/* Volumes */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ ...labelStyle, marginBottom: 0 }}>Volumes</label>
            <button
              style={addBtnStyle}
              onClick={() => updateService(index, s => ({ ...s, volumes: [...s.volumes, { host: '', container: '' }] }))}
            >
              + Add Volume
            </button>
          </div>
          {svc.volumes.map((vol, vi) => (
            <div key={vi} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <input
                style={{ ...smallInputStyle, flex: 1 }}
                value={vol.host}
                onChange={e => {
                  const val = e.target.value;
                  updateService(index, s => ({
                    ...s,
                    volumes: s.volumes.map((v, j) => j === vi ? { ...v, host: val } : v),
                  }));
                }}
                placeholder="Host path or volume name"
              />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>:</span>
              <input
                style={{ ...smallInputStyle, flex: 1 }}
                value={vol.container}
                onChange={e => {
                  const val = e.target.value;
                  updateService(index, s => ({
                    ...s,
                    volumes: s.volumes.map((v, j) => j === vi ? { ...v, container: val } : v),
                  }));
                }}
                placeholder="Container path"
              />
              <button
                style={removeBtnStyle}
                onClick={() => updateService(index, s => ({ ...s, volumes: s.volumes.filter((_, j) => j !== vi) }))}
              >
                x
              </button>
            </div>
          ))}
        </div>

        {/* Networks */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ ...labelStyle, marginBottom: 0 }}>Networks</label>
            <button
              style={addBtnStyle}
              onClick={() => updateService(index, s => ({ ...s, networks: [...s.networks, ''] }))}
            >
              + Add Network
            </button>
          </div>
          {svc.networks.map((net, ni) => (
            <div key={ni} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <input
                style={{ ...smallInputStyle, flex: 1 }}
                value={net}
                onChange={e => {
                  const val = e.target.value;
                  updateService(index, s => ({
                    ...s,
                    networks: s.networks.map((n, j) => j === ni ? val : n),
                  }));
                }}
                placeholder="Network name"
              />
              <button
                style={removeBtnStyle}
                onClick={() => updateService(index, s => ({ ...s, networks: s.networks.filter((_, j) => j !== ni) }))}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── Main Render ─────────────────────────────────────────────────────

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'Docker Compose Generator'}
      description={(t.pageDescription as string) || 'Generate docker-compose.yml files visually'}
      toolId="docker-compose-generator"
    >
      {/* Preset Stacks */}
      <div style={{ marginBottom: 20 }}>
        <div style={sectionTitleStyle}>Preset Stacks</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {PRESETS.map((preset, i) => (
            <button
              key={i}
              onClick={() => loadPreset(preset)}
              className="btn btn-ghost"
              style={{ fontSize: 12, padding: '6px 12px' }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Left: Service Builder */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={sectionTitleStyle}>Services ({services.length})</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleReset} className="btn btn-secondary" style={{ fontSize: 12, padding: '6px 12px' }}>
                {(dict.common.clear as string) || 'Reset'}
              </button>
              <button onClick={addService} className="btn btn-primary" style={{ fontSize: 12, padding: '6px 12px' }}>
                + Add Service
              </button>
            </div>
          </div>

          {services.map((svc, i) => renderServiceCard(svc, i))}

          {/* Global Network Definitions */}
          <div style={{ ...cardStyle, marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={sectionTitleStyle}>Network Definitions</span>
              <button
                style={addBtnStyle}
                onClick={() => setNetworks(prev => [...prev, { name: '', driver: 'bridge' }])}
              >
                + Add Network
              </button>
            </div>
            {networks.map((net, ni) => (
              <div key={ni} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <input
                  style={{ ...smallInputStyle, flex: 2 }}
                  value={net.name}
                  onChange={e => {
                    const val = e.target.value;
                    setNetworks(prev => prev.map((n, j) => j === ni ? { ...n, name: val } : n));
                  }}
                  placeholder="Network name"
                />
                <select
                  style={{ ...smallInputStyle, flex: 1 }}
                  value={net.driver}
                  onChange={e => {
                    const val = e.target.value;
                    setNetworks(prev => prev.map((n, j) => j === ni ? { ...n, driver: val } : n));
                  }}
                >
                  <option value="bridge">bridge</option>
                  <option value="host">host</option>
                  <option value="overlay">overlay</option>
                  <option value="none">none</option>
                </select>
                <button
                  style={removeBtnStyle}
                  onClick={() => setNetworks(prev => prev.filter((_, j) => j !== ni))}
                >
                  x
                </button>
              </div>
            ))}
            {networks.length === 0 && (
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>No custom networks defined</span>
            )}
          </div>

          {/* Global Volume Definitions */}
          <div style={{ ...cardStyle, marginTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={sectionTitleStyle}>Volume Definitions</span>
              <button
                style={addBtnStyle}
                onClick={() => setVolumeDefs(prev => [...prev, { name: '', driver: 'local' }])}
              >
                + Add Volume
              </button>
            </div>
            {volumeDefs.map((vol, vi) => (
              <div key={vi} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <input
                  style={{ ...smallInputStyle, flex: 2 }}
                  value={vol.name}
                  onChange={e => {
                    const val = e.target.value;
                    setVolumeDefs(prev => prev.map((v, j) => j === vi ? { ...v, name: val } : v));
                  }}
                  placeholder="Volume name"
                />
                <select
                  style={{ ...smallInputStyle, flex: 1 }}
                  value={vol.driver}
                  onChange={e => {
                    const val = e.target.value;
                    setVolumeDefs(prev => prev.map((v, j) => j === vi ? { ...v, driver: val } : v));
                  }}
                >
                  <option value="local">local</option>
                  <option value="none">none</option>
                </select>
                <button
                  style={removeBtnStyle}
                  onClick={() => setVolumeDefs(prev => prev.filter((_, j) => j !== vi))}
                >
                  x
                </button>
              </div>
            ))}
            {volumeDefs.length === 0 && (
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>No custom volumes defined</span>
            )}
          </div>
        </div>

        {/* Right: YAML Output */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={sectionTitleStyle}>docker-compose.yml</div>
            <CopyButton text={yamlOutput} label="Copy" />
          </div>
          <pre style={{
            background: '#0d1117',
            borderRadius: 10,
            border: '1px solid var(--border-color)',
            padding: '16px 20px',
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
            fontSize: 12,
            lineHeight: 1.6,
            overflowX: 'auto',
            overflowY: 'auto',
            maxHeight: 700,
            color: '#e6edf3',
            margin: 0,
            whiteSpace: 'pre',
            position: 'sticky',
            top: 24,
          }}>
            {yamlOutput || '# Add services to generate docker-compose.yml'}
          </pre>
        </div>
      </div>

      {/* SEO Content */}
      {(t.seoTitle || t.seoContent) ? (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          {t.seoTitle ? (
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle as string}</h2>
          ) : null}
          {t.seoContent ? (
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {t.seoContent as string}
            </p>
          ) : null}
        </div>
      ) : null}
    </ToolLayout>
  );
}
