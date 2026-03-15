'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

const CHART_SAMPLE = 'apiVersion: v2\nname: my-app\nversion: 1.0.0\ntype: application\ndescription: A sample Helm chart\nappVersion: "1.16.0"';
const VALUES_SAMPLE = 'replicaCount: 1\n\nimage:\n  repository: nginx\n  pullPolicy: IfNotPresent\n  tag: ""\n\nservice:\n  type: ClusterIP\n  port: 80';

function validateChart(chart) {
  const issues = [];
  if (!chart.trim()) return [{ level: 'error', msg: 'Chart.yaml is empty' }];
  if (!chart.includes('apiVersion:')) issues.push({ level: 'error', msg: 'Missing required field: apiVersion (v1 or v2)' });
  else if (chart.includes('apiVersion: v1')) issues.push({ level: 'warning', msg: 'apiVersion v1 is deprecated, use v2' });
  if (!chart.includes('name:')) issues.push({ level: 'error', msg: 'Missing required field: name' });
  if (!chart.includes('version:')) issues.push({ level: 'error', msg: 'Missing required field: version' });
  if (!chart.includes('description:')) issues.push({ level: 'warning', msg: 'Missing description - recommended for chart discoverability' });
  if (!chart.includes('type:')) issues.push({ level: 'info', msg: 'No type specified - defaults to application' });
  if (!chart.includes('appVersion:')) issues.push({ level: 'warning', msg: 'Missing appVersion - recommended to track app version' });
  if (chart.includes('\t')) issues.push({ level: 'error', msg: 'YAML must not contain tabs - use spaces' });
  if (issues.length === 0) issues.push({ level: 'info', msg: 'Chart.yaml looks valid!' });
  return issues;
}

function validateValues(values) {
  const issues = [];
  if (!values.trim()) return [{ level: 'info', msg: 'values.yaml is empty (optional)' }];
  if (values.includes('\t')) issues.push({ level: 'error', msg: 'YAML must not contain tabs' });
  if (!values.includes('image:')) issues.push({ level: 'info', msg: 'No image configuration found' });
  if (values.includes('tag: ""') || values.includes("tag: ''")) issues.push({ level: 'warning', msg: 'Image tag is empty - will use Chart appVersion or latest' });
  if (!values.includes('resources:')) issues.push({ level: 'warning', msg: 'No resource limits defined - recommended for production' });
  if (issues.length === 0) issues.push({ level: 'info', msg: 'values.yaml looks good!' });
  return issues;
}

export default function HelmChartValidatorPage() {
  const { dict, lang } = useLang();
  const [chart, setChart] = useState(CHART_SAMPLE);
  const [values, setValues] = useState(VALUES_SAMPLE);
  const chartIssues = validateChart(chart);
  const valuesIssues = validateValues(values);

  const Badge = ({ level }) => (
    <span className={'inline-block w-2 h-2 rounded-full mr-2 ' + (level === 'error' ? 'bg-red-500' : level === 'warning' ? 'bg-yellow-500' : 'bg-blue-500')}></span>
  );

  return (
    <ToolLayout toolId="helm-chart-validator">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Chart.yaml</label>
            <textarea value={chart} onChange={e => setChart(e.target.value)} rows={10} className="w-full p-3 border rounded-lg font-mono text-sm dark:bg-gray-800 dark:border-gray-600" spellCheck={false} />
          </div>
          <div>
            <label className="block font-medium mb-2">values.yaml</label>
            <textarea value={values} onChange={e => setValues(e.target.value)} rows={10} className="w-full p-3 border rounded-lg font-mono text-sm dark:bg-gray-800 dark:border-gray-600" spellCheck={false} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Chart.yaml Results</h3>
            <div className="space-y-2">
              {chartIssues.map((issue, i) => (
                <div key={i} className={'p-2 rounded text-sm ' + (issue.level === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' : issue.level === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400')}>
                  <Badge level={issue.level} />{issue.msg}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">values.yaml Results</h3>
            <div className="space-y-2">
              {valuesIssues.map((issue, i) => (
                <div key={i} className={'p-2 rounded text-sm ' + (issue.level === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' : issue.level === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400')}>
                  <Badge level={issue.level} />{issue.msg}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
