'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface DockerService {
  id: string;
  name: string;
  image: string;
  ports: string[];
  volumes: string[];
  environment: Record<string, string>;
  networks: string[];
}

const TEMPLATES: Record<string, Omit<DockerService, 'id'>> = {
  mysql: {
    name: 'mysql',
    image: 'mysql:8.0',
    ports: ['3306:3306'],
    volumes: ['mysql_data:/var/lib/mysql'],
    environment: { MYSQL_ROOT_PASSWORD: 'root', MYSQL_DATABASE: 'mydb' },
    networks: ['backend'],
  },
  postgres: {
    name: 'postgres',
    image: 'postgres:15',
    ports: ['5432:5432'],
    volumes: ['postgres_data:/var/lib/postgresql/data'],
    environment: { POSTGRES_PASSWORD: 'postgres', POSTGRES_DB: 'mydb' },
    networks: ['backend'],
  },
  redis: {
    name: 'redis',
    image: 'redis:7-alpine',
    ports: ['6379:6379'],
    volumes: ['redis_data:/data'],
    environment: {},
    networks: ['backend'],
  },
  mongodb: {
    name: 'mongodb',
    image: 'mongo:6',
    ports: ['27017:27017'],
    volumes: ['mongo_data:/data/db'],
    environment: { MONGO_INITDB_ROOT_USERNAME: 'admin', MONGO_INITDB_ROOT_PASSWORD: 'password' },
    networks: ['backend'],
  },
  nginx: {
    name: 'nginx',
    image: 'nginx:alpine',
    ports: ['80:80', '443:443'],
    volumes: ['./nginx.conf:/etc/nginx/nginx.conf'],
    environment: {},
    networks: ['frontend'],
  },
};

export default function DockerComposeGenerator() {
  const { dict } = useLang();
  const t = dict.tools['docker-compose-generator'];
  const [services, setServices] = useState<DockerService[]>([]);
  const [networks, setNetworks] = useState<string[]>([]);

  const addService = () => {
    const newService: DockerService = {
      id: Date.now().toString(),
      name: 'service',
      image: 'image:latest',
      ports: [],
      volumes: [],
      environment: {},
      networks: [],
    };
    setServices([...services, newService]);
  };

  const addTemplate = (templateKey: keyof typeof TEMPLATES) => {
    const template = TEMPLATES[templateKey];
    const newService: DockerService = {
      id: Date.now().toString(),
      ...template,
    };
    setServices([...services, newService]);
  };

  const removeService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const updateService = (id: string, updates: Partial<DockerService>) => {
    setServices(services.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const generateYaml = (): string => {
    let yaml = 'version: "3.9"\n\nservices:\n';

    for (const service of services) {
      yaml += `  ${service.name}:\n`;
      yaml += `    image: ${service.image}\n`;

      if (service.ports.length > 0) {
        yaml += '    ports:\n';
        service.ports.forEach((port) => {
          yaml += `      - "${port}"\n`;
        });
      }

      if (service.volumes.length > 0) {
        yaml += '    volumes:\n';
        service.volumes.forEach((vol) => {
          yaml += `      - ${vol}\n`;
        });
      }

      if (Object.keys(service.environment).length > 0) {
        yaml += '    environment:\n';
        Object.entries(service.environment).forEach(([key, value]) => {
          yaml += `      ${key}: ${value}\n`;
        });
      }

      if (service.networks.length > 0) {
        yaml += '    networks:\n';
        service.networks.forEach((net) => {
          yaml += `      - ${net}\n`;
        });
      }

      yaml += '\n';
    }

    const uniqueNetworks = Array.from(new Set(services.flatMap((s) => s.networks)));
    if (uniqueNetworks.length > 0) {
      yaml += 'networks:\n';
      uniqueNetworks.forEach((net) => {
        yaml += `  ${net}:\n    driver: bridge\n`;
      });
    }

    const volumes = services.flatMap((s) => s.volumes.filter((v) => !v.startsWith('.')));
    if (volumes.length > 0) {
      yaml += '\nvolumes:\n';
      Array.from(new Set(volumes))
        .map((v) => v.split(':')[0])
        .forEach((vol) => {
          yaml += `  ${vol}:\n`;
        });
    }

    return yaml;
  };

  const yaml = generateYaml();

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="docker-compose-generator">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={addService} className="btn btn-primary">
          {t.addServiceBtn}
        </button>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={() => addTemplate('mysql')} className="btn btn-secondary" title="MySQL" style={{ fontSize: 11 }}>
            MySQL
          </button>
          <button onClick={() => addTemplate('postgres')} className="btn btn-secondary" title="PostgreSQL" style={{ fontSize: 11 }}>
            PostgreSQL
          </button>
          <button onClick={() => addTemplate('redis')} className="btn btn-secondary" title="Redis" style={{ fontSize: 11 }}>
            Redis
          </button>
          <button onClick={() => addTemplate('mongodb')} className="btn btn-secondary" title="MongoDB" style={{ fontSize: 11 }}>
            MongoDB
          </button>
          <button onClick={() => addTemplate('nginx')} className="btn btn-secondary" title="Nginx" style={{ fontSize: 11 }}>
            Nginx
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Services Configuration */}
        <div style={{
          border: '1px solid var(--border-color)',
          borderRadius: 8,
          padding: 16,
          maxHeight: 600,
          overflowY: 'auto',
        }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{t.servicesLabel} ({services.length})</h3>
          {services.length === 0 ? (
            <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.noServicesMsg}</p>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                style={{
                  padding: 12,
                  marginBottom: 12,
                  border: '1px solid var(--border-color)',
                  borderRadius: 6,
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) => updateService(service.id, { name: e.target.value })}
                    style={{ fontSize: 12, fontWeight: 600, flex: 1, marginRight: 8 }}
                  />
                  <button
                    onClick={() => removeService(service.id)}
                    style={{
                      padding: '4px 8px',
                      fontSize: 11,
                      background: 'rgba(244, 63, 94, 0.2)',
                      color: 'var(--accent-rose)',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </div>

                <input
                  type="text"
                  value={service.image}
                  onChange={(e) => updateService(service.id, { image: e.target.value })}
                  placeholder="image:tag"
                  style={{ width: '100%', fontSize: 11, marginBottom: 8 }}
                />

                <div style={{ fontSize: 10, color: 'var(--text-secondary)', display: 'flex', gap: 8 }}>
                  <span>Ports: {service.ports.length}</span>
                  <span>Volumes: {service.volumes.length}</span>
                  <span>Env: {Object.keys(service.environment).length}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* YAML Output */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700 }}>docker-compose.yml</h3>
            <CopyButton text={yaml} />
          </div>
          <textarea
            value={yaml}
            readOnly
            style={{
              width: '100%',
              minHeight: 540,
              fontFamily: 'monospace',
              fontSize: 11,
              padding: 12,
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
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
