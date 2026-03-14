'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface DockerStep {
  type: 'FROM' | 'RUN' | 'COPY' | 'ENV' | 'EXPOSE' | 'CMD' | 'WORKDIR';
  value: string;
  id: string;
}

export default function DockerfileGenerator() {
  const { dict } = useLang();
  const t = dict.tools['dockerfile-generator'];
  const [baseImage, setBaseImage] = useState('node:20-alpine');
  const [steps, setSteps] = useState<DockerStep[]>([]);
  const [workdir, setWorkdir] = useState('/app');
  const [enableMultiStage, setEnableMultiStage] = useState(false);
  const [builderImage, setBuilderImage] = useState('node:20-alpine');

  const addStep = (type: DockerStep['type']) => {
    const newId = Date.now().toString();
    setSteps([...steps, { type, value: '', id: newId }]);
  };

  const updateStep = (id: string, value: string) => {
    setSteps(steps.map(s => s.id === id ? { ...s, value } : s));
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(s => s.id !== id));
  };

  const generateDockerfile = (): string => {
    let dockerfile = '';

    if (enableMultiStage) {
      dockerfile += `# Builder stage\nFROM ${builderImage} as builder\nWORKDIR /app\n`;
      dockerfile += `COPY package*.json ./\nRUN npm ci --only=production\n\n`;
    }

    dockerfile += `FROM ${baseImage}\n`;
    dockerfile += `WORKDIR ${workdir}\n\n`;

    for (const step of steps) {
      switch (step.type) {
        case 'RUN':
          dockerfile += `RUN ${step.value}\n`;
          break;
        case 'COPY':
          dockerfile += `COPY ${step.value}\n`;
          break;
        case 'ENV':
          dockerfile += `ENV ${step.value}\n`;
          break;
        case 'EXPOSE':
          dockerfile += `EXPOSE ${step.value}\n`;
          break;
        case 'WORKDIR':
          dockerfile += `WORKDIR ${step.value}\n`;
          break;
        case 'CMD':
          dockerfile += `CMD ${step.value}\n`;
          break;
      }
    }

    if (enableMultiStage && !steps.some(s => s.type === 'COPY' && s.value.includes('--from=builder'))) {
      dockerfile += `\nCOPY --from=builder /app/node_modules ./node_modules\n`;
    }

    return dockerfile;
  };

  const dockerfileContent = generateDockerfile();

  const loadNodeSample = () => {
    setBaseImage('node:20-alpine');
    setWorkdir('/app');
    setSteps([
      { type: 'COPY', value: 'package*.json ./', id: '1' },
      { type: 'RUN', value: 'npm ci --only=production', id: '2' },
      { type: 'COPY', value: '. .', id: '3' },
      { type: 'EXPOSE', value: '3000', id: '4' },
      { type: 'CMD', value: '["node", "server.js"]', id: '5' },
    ]);
    setEnableMultiStage(true);
  };

  const loadPythonSample = () => {
    setBaseImage('python:3.11-slim');
    setWorkdir('/app');
    setSteps([
      { type: 'RUN', value: 'apt-get update && apt-get install -y --no-install-recommends build-essential && rm -rf /var/lib/apt/lists/*', id: '1' },
      { type: 'COPY', value: 'requirements.txt .', id: '2' },
      { type: 'RUN', value: 'pip install --no-cache-dir -r requirements.txt', id: '3' },
      { type: 'COPY', value: '. .', id: '4' },
      { type: 'ENV', value: 'PYTHONUNBUFFERED=1', id: '5' },
      { type: 'CMD', value: '["python", "app.py"]', id: '6' },
    ]);
    setEnableMultiStage(false);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="dockerfile-generator"
    >
      {/* Sample Buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <button onClick={loadNodeSample} className="btn btn-secondary">{t.nodeSampleBtn || 'Load Node.js Sample'}</button>
        <button onClick={loadPythonSample} className="btn btn-secondary">{t.pythonSampleBtn || 'Load Python Sample'}</button>
        <button onClick={() => {
          setSteps([]);
          setBaseImage('node:20-alpine');
          setWorkdir('/app');
          setEnableMultiStage(false);
        }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      {/* Configuration */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.baseImageLabel || 'Base Image'}</label>
          <input
            type="text"
            value={baseImage}
            onChange={e => setBaseImage(e.target.value)}
            placeholder="node:20-alpine"
            style={{ fontSize: 13 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.workdirLabel || 'Working Directory'}</label>
          <input
            type="text"
            value={workdir}
            onChange={e => setWorkdir(e.target.value)}
            placeholder="/app"
            style={{ fontSize: 13 }}
          />
        </div>
      </div>

      {/* Multi-stage option */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={enableMultiStage}
            onChange={e => setEnableMultiStage(e.target.checked)}
          />
          {t.multiStageLabel || 'Enable Multi-stage Build'}
        </label>
        {enableMultiStage && (
          <input
            type="text"
            value={builderImage}
            onChange={e => setBuilderImage(e.target.value)}
            placeholder="Builder image"
            style={{ fontSize: 13, marginTop: 8 }}
          />
        )}
      </div>

      {/* Add Steps */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.stepsLabel || 'Build Steps'}</h3>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {['COPY', 'RUN', 'ENV', 'EXPOSE', 'WORKDIR', 'CMD'].map(type => (
            <button
              key={type}
              onClick={() => addStep(type as any)}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: 'none',
                background: 'var(--accent-blue)',
                color: 'white',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              + {type}
            </button>
          ))}
        </div>

        {/* Steps List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {steps.length === 0 && (
            <div style={{ color: 'var(--text-secondary)', fontSize: 13, padding: 16, textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: 6 }}>
              {t.noStepsMsg || 'No steps added yet. Click a button above to add steps.'}
            </div>
          )}
          {steps.map((step, idx) => (
            <div key={step.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 8, alignItems: 'flex-start' }}>
              <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
                {step.type}
              </div>
              <input
                type="text"
                value={step.value}
                onChange={e => updateStep(step.id, e.target.value)}
                placeholder={`${step.type} command...`}
                style={{ fontSize: 13 }}
              />
              <button
                onClick={() => removeStep(step.id)}
                style={{
                  padding: '6px 12px',
                  background: 'rgba(244, 63, 94, 0.1)',
                  color: 'var(--accent-rose)',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {dict.common.remove || 'Remove'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Output */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600 }}>{t.dockerfileOutputLabel || 'Generated Dockerfile'}</h3>
          <CopyButton text={dockerfileContent} />
        </div>
        <textarea
          value={dockerfileContent}
          readOnly
          style={{ minHeight: 300, background: 'var(--bg-secondary)', cursor: 'default', fontFamily: 'monospace', fontSize: 12 }}
        />
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'Dockerfile Generator'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'Generate production-ready Dockerfiles with visual builder. Add steps, configure base images, enable multi-stage builds, and export optimized container configurations.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle || 'Features'}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 || 'Visual builder for Dockerfile steps'}</li>
          <li>{t.seoFeature2 || 'Multi-stage build support'}</li>
          <li>{t.seoFeature3 || 'Pre-built samples for Node.js and Python'}</li>
          <li>{t.seoFeature4 || 'Copy generated Dockerfile with one click'}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
