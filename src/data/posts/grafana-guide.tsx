'use client';
import React from 'react';

const translations: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Grafana Complete Guide: Dashboards and Observability for DevOps',
    description: 'Learn Grafana from scratch: install with Docker, Helm, or apt, connect Prometheus, Loki, and InfluxDB data sources, build dashboards with time series, gauges, heatmaps, set up alerting rules, provisioning as code, Grafana Cloud, RBAC, plugins, and production best practices.',
  },
  zh: {
    title: 'Grafana 完全指南：DevOps 仪表板与可观测性',
    description: '从零开始学习 Grafana：使用 Docker、Helm 或 apt 安装，连接 Prometheus、Loki 和 InfluxDB 数据源，构建时间序列、仪表盘、热力图面板，配置告警规则、代码化配置、Grafana Cloud、RBAC、插件及生产最佳实践。',
  },
};

export default function GrafanaGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Grafana and what is it used for?',
        acceptedAnswer: { '@type': 'Answer', text: 'Grafana is an open-source observability platform for visualizing metrics, logs, and traces. It connects to data sources like Prometheus, Loki, InfluxDB, Elasticsearch, and many others, allowing you to build interactive dashboards for monitoring infrastructure, applications, and business metrics.' },
      },
      {
        '@type': 'Question',
        name: 'How do I install Grafana with Docker?',
        acceptedAnswer: { '@type': 'Answer', text: 'Run docker run -d -p 3000:3000 --name grafana grafana/grafana-oss:latest. Then open http://localhost:3000 and log in with the default credentials admin/admin. For production, mount a volume for persistent storage and configure environment variables.' },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Grafana and Prometheus?',
        acceptedAnswer: { '@type': 'Answer', text: 'Prometheus is a time-series database that collects and stores metrics via a pull model. Grafana is a visualization platform that queries data from Prometheus and other sources to create dashboards. They are complementary: Prometheus stores data, Grafana displays it.' },
      },
      {
        '@type': 'Question',
        name: 'How do I add Prometheus as a data source in Grafana?',
        acceptedAnswer: { '@type': 'Answer', text: 'Go to Configuration > Data Sources > Add data source > Prometheus. Enter the Prometheus server URL (e.g., http://prometheus:9090), configure authentication if needed, and click Save & Test. You can also provision data sources via YAML configuration files.' },
      },
      {
        '@type': 'Question',
        name: 'What panel types are available in Grafana?',
        acceptedAnswer: { '@type': 'Answer', text: 'Grafana offers many panel types including Time Series for metrics over time, Stat for single values, Gauge for progress indicators, Table for tabular data, Bar Chart for comparisons, Heatmap for density visualization, Pie Chart, Logs panel, Node Graph for service maps, and Geomap for geographic data.' },
      },
      {
        '@type': 'Question',
        name: 'How does Grafana alerting work?',
        acceptedAnswer: { '@type': 'Answer', text: 'Grafana Alerting uses alert rules that evaluate queries at regular intervals. When a condition is met, notifications are sent via contact points such as email, Slack, PagerDuty, or webhooks. You can define notification policies to route alerts to the right teams and set silence or mute timings.' },
      },
      {
        '@type': 'Question',
        name: 'What is Grafana Loki and how is it different from Elasticsearch?',
        acceptedAnswer: { '@type': 'Answer', text: 'Grafana Loki is a log aggregation system that indexes only labels (metadata), not the full log content. This makes it significantly cheaper to operate and easier to scale compared to Elasticsearch, which indexes the full text. Loki uses LogQL as its query language and integrates natively with Grafana.' },
      },
      {
        '@type': 'Question',
        name: 'Can I provision Grafana dashboards and data sources as code?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. Grafana supports provisioning via YAML files placed in the provisioning directory. You can define data sources, dashboards, alert rules, and notification channels as code, enabling GitOps workflows and infrastructure-as-code deployments with tools like Terraform or Ansible.' },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px 20px', marginBottom: '24px', borderRadius: '0 8px 8px 0' }}>
        <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          Grafana is the industry-standard open-source platform for monitoring and observability. It connects to 100+ data sources including Prometheus, Loki, InfluxDB, and Elasticsearch. This guide covers installation, dashboard creation, panel types, alerting, provisioning as code, Grafana Loki, Tempo, Cloud, RBAC, plugins, and production best practices for DevOps teams.
        </p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '16px 20px', marginBottom: '32px', borderRadius: '8px' }}>
        <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Grafana supports 100+ data sources and is free, open-source, and extensible via plugins</li>
          <li>Install via Docker, apt/yum, Helm chart, or use Grafana Cloud for a managed experience</li>
          <li>Dashboards use panels (time series, stat, gauge, table, heatmap, bar chart, logs) to visualize data</li>
          <li>Variables and templating make dashboards dynamic and reusable across environments</li>
          <li>Alerting rules evaluate queries on a schedule and send notifications via contact points</li>
          <li>Provision dashboards, data sources, and alerts as code for GitOps workflows</li>
          <li>Grafana Loki handles logs, Grafana Tempo handles distributed traces, completing the observability stack</li>
          <li>RBAC, organizations, and teams control access at granular levels in production</li>
        </ul>
      </div>

      {/* Section 1: What is Grafana */}
      <h2>What is Grafana?</h2>
      <p>
        <strong>Grafana</strong> is an open-source observability and data visualization platform created by Grafana Labs. It allows you to query, visualize, alert on, and understand metrics, logs, and traces from any storage system. Grafana connects to over 100 data sources out of the box, including Prometheus, Graphite, InfluxDB, Elasticsearch, PostgreSQL, MySQL, and cloud services like AWS CloudWatch and Azure Monitor.
      </p>
      <p>
        Originally focused on time-series visualization for infrastructure monitoring, Grafana has evolved into a full observability platform with the LGTM stack: <strong>Loki</strong> (logs), <strong>Grafana</strong> (visualization), <strong>Tempo</strong> (traces), and <strong>Mimir</strong> (metrics). DevOps teams, SREs, and platform engineers use Grafana to monitor everything from Kubernetes clusters to application performance to business KPIs.
      </p>

      {/* Section 2: Installation */}
      <h2>Installing Grafana</h2>
      <p>Grafana can be installed via multiple methods depending on your environment. Below are the most common approaches.</p>

      <h3>Docker (Recommended for Development)</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# Run Grafana OSS with Docker\n'
        + 'docker run -d \\\n'
        + '  --name grafana \\\n'
        + '  -p 3000:3000 \\\n'
        + '  -v grafana-storage:/var/lib/grafana \\\n'
        + '  -e "GF_SECURITY_ADMIN_PASSWORD=strongpassword" \\\n'
        + '  grafana/grafana-oss:latest\n'
        + '\n'
        + '# Docker Compose with Prometheus + Grafana\n'
        + '# docker-compose.yml\n'
        + 'version: "3.9"\n'
        + 'services:\n'
        + '  prometheus:\n'
        + '    image: prom/prometheus:latest\n'
        + '    volumes:\n'
        + '      - ./prometheus.yml:/etc/prometheus/prometheus.yml\n'
        + '    ports:\n'
        + '      - "9090:9090"\n'
        + '\n'
        + '  grafana:\n'
        + '    image: grafana/grafana-oss:latest\n'
        + '    depends_on:\n'
        + '      - prometheus\n'
        + '    ports:\n'
        + '      - "3000:3000"\n'
        + '    volumes:\n'
        + '      - grafana-data:/var/lib/grafana\n'
        + '    environment:\n'
        + '      - GF_SECURITY_ADMIN_PASSWORD=admin\n'
        + '\n'
        + 'volumes:\n'
        + '  grafana-data:'}</code></pre>

      <h3>APT (Ubuntu / Debian)</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# Install prerequisites\n'
        + 'sudo apt-get install -y apt-transport-https software-properties-common wget\n'
        + '\n'
        + '# Add Grafana GPG key and repository\n'
        + 'sudo mkdir -p /etc/apt/keyrings/\n'
        + 'wget -q -O - https://apt.grafana.com/gpg.key | \\\n'
        + '  gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null\n'
        + 'echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] \\\n'
        + '  https://apt.grafana.com stable main" | \\\n'
        + '  sudo tee /etc/apt/sources.list.d/grafana.list\n'
        + '\n'
        + '# Install and start Grafana\n'
        + 'sudo apt-get update\n'
        + 'sudo apt-get install grafana\n'
        + 'sudo systemctl enable grafana-server\n'
        + 'sudo systemctl start grafana-server\n'
        + '\n'
        + '# Check status\n'
        + 'sudo systemctl status grafana-server'}</code></pre>

      <h3>Helm (Kubernetes)</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# Add the Grafana Helm repository\n'
        + 'helm repo add grafana https://grafana.github.io/helm-charts\n'
        + 'helm repo update\n'
        + '\n'
        + '# Install Grafana with custom values\n'
        + 'helm install grafana grafana/grafana \\\n'
        + '  --namespace monitoring \\\n'
        + '  --create-namespace \\\n'
        + '  --set persistence.enabled=true \\\n'
        + '  --set persistence.size=10Gi \\\n'
        + '  --set adminPassword=strongpassword \\\n'
        + '  --set service.type=LoadBalancer\n'
        + '\n'
        + '# Get the admin password if auto-generated\n'
        + 'kubectl get secret --namespace monitoring grafana \\\n'
        + '  -o jsonpath="{.data.admin-password}" | base64 --decode'}</code></pre>

      {/* Section 3: Data Sources */}
      <h2>Connecting Data Sources</h2>
      <p>
        Data sources are the backbone of Grafana. Each data source is a storage backend that Grafana queries to fetch metrics, logs, or traces. You can configure data sources via the Grafana UI or provision them as code.
      </p>

      <h3>Prometheus</h3>
      <p>
        Prometheus is the most common data source for Grafana. It uses PromQL (Prometheus Query Language) for querying time-series metrics. Prometheus scrapes targets at regular intervals, storing data in its own time-series database.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# prometheus.yml - Scrape configuration\n'
        + 'global:\n'
        + '  scrape_interval: 15s\n'
        + '  evaluation_interval: 15s\n'
        + '\n'
        + 'scrape_configs:\n'
        + '  - job_name: "prometheus"\n'
        + '    static_configs:\n'
        + '      - targets: ["localhost:9090"]\n'
        + '\n'
        + '  - job_name: "node-exporter"\n'
        + '    static_configs:\n'
        + '      - targets: ["node-exporter:9100"]\n'
        + '\n'
        + '  - job_name: "application"\n'
        + '    metrics_path: /metrics\n'
        + '    static_configs:\n'
        + '      - targets: ["app:8080"]\n'
        + '\n'
        + '# Common PromQL queries for Grafana dashboards:\n'
        + '# CPU usage: rate(node_cpu_seconds_total{mode!="idle"}[5m])\n'
        + '# Memory: node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes\n'
        + '# HTTP rate: rate(http_requests_total[5m])\n'
        + '# Error rate: rate(http_requests_total{status=~"5.."}[5m])'}</code></pre>

      <h3>Loki (Logs)</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# Grafana data source configuration for Loki\n'
        + '# Configuration > Data Sources > Add > Loki\n'
        + '# URL: http://loki:3100\n'
        + '\n'
        + '# LogQL query examples in Grafana:\n'
        + '# All logs from a specific app:\n'
        + '#   {app="frontend"}\n'
        + '\n'
        + '# Filter logs containing "error":\n'
        + '#   {app="frontend"} |= "error"\n'
        + '\n'
        + '# Regex filter:\n'
        + '#   {app="api"} |~ "status=(4|5)\\\\d{2}"\n'
        + '\n'
        + '# Parse JSON logs and filter:\n'
        + '#   {app="api"} | json | level="error" | line_format "{{.message}}"'}</code></pre>

      <h3>InfluxDB</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# InfluxDB 2.x data source configuration\n'
        + '# URL: http://influxdb:8086\n'
        + '# Organization: my-org\n'
        + '# Token: <your-influxdb-token>\n'
        + '# Default Bucket: my-bucket\n'
        + '\n'
        + '# Flux query example:\n'
        + 'from(bucket: "my-bucket")\n'
        + '  |> range(start: -1h)\n'
        + '  |> filter(fn: (r) => r._measurement == "cpu")\n'
        + '  |> filter(fn: (r) => r._field == "usage_user")\n'
        + '  |> aggregateWindow(every: 1m, fn: mean)\n'
        + '  |> yield(name: "mean")'}</code></pre>

      <h3>Elasticsearch</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# Elasticsearch data source configuration\n'
        + '# URL: http://elasticsearch:9200\n'
        + '# Index name: logs-*\n'
        + '# Time field: @timestamp\n'
        + '# Version: 8.x\n'
        + '\n'
        + '# In Grafana, use the query editor to build\n'
        + '# Lucene or KQL queries:\n'
        + '#   level:error AND service:api\n'
        + '#   status:>=400 AND method:POST\n'
        + '\n'
        + '# Aggregations: Date Histogram, Terms,\n'
        + '# Percentiles, Extended Stats, etc.'}</code></pre>

      {/* Section 4: Creating Dashboards */}
      <h2>Creating Dashboards</h2>
      <p>
        Dashboards are the core of Grafana. A dashboard is a collection of panels arranged on a grid, each visualizing data from one or more queries. You can create dashboards manually via the UI or import community dashboards from grafana.com/grafana/dashboards.
      </p>
      <p>
        To create a new dashboard, click the <strong>+</strong> icon in the sidebar and select <strong>New dashboard</strong>. Then click <strong>Add visualization</strong> to add your first panel. Select a data source, write your query, choose a panel type, and configure display options.
      </p>

      <h3>Dashboard JSON Model</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'{\n'
        + '  "dashboard": {\n'
        + '    "title": "Application Overview",\n'
        + '    "tags": ["production", "api"],\n'
        + '    "timezone": "browser",\n'
        + '    "refresh": "30s",\n'
        + '    "time": {\n'
        + '      "from": "now-6h",\n'
        + '      "to": "now"\n'
        + '    },\n'
        + '    "panels": [\n'
        + '      {\n'
        + '        "type": "timeseries",\n'
        + '        "title": "Request Rate",\n'
        + '        "gridPos": { "h": 8, "w": 12, "x": 0, "y": 0 },\n'
        + '        "targets": [\n'
        + '          {\n'
        + '            "expr": "rate(http_requests_total[5m])",\n'
        + '            "legendFormat": "{{method}} {{path}}"\n'
        + '          }\n'
        + '        ]\n'
        + '      },\n'
        + '      {\n'
        + '        "type": "stat",\n'
        + '        "title": "Total Requests (24h)",\n'
        + '        "gridPos": { "h": 4, "w": 6, "x": 12, "y": 0 },\n'
        + '        "targets": [\n'
        + '          {\n'
        + '            "expr": "increase(http_requests_total[24h])"\n'
        + '          }\n'
        + '        ]\n'
        + '      }\n'
        + '    ]\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Section 5: Panel Types */}
      <h2>Panel Types</h2>
      <p>
        Grafana offers a rich library of panel types. Choosing the right panel is critical for effective data visualization.
      </p>

      <h3>Time Series</h3>
      <p>
        The default and most common panel type. Ideal for displaying metrics over time with support for line, area, bar, and point visualizations. Supports multiple queries, legend formatting, axis configuration, thresholds, and overrides.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# PromQL queries for a Time Series panel\n'
        + '\n'
        + '# Request rate by status code\n'
        + 'sum by (status_code) (\n'
        + '  rate(http_requests_total[5m])\n'
        + ')\n'
        + '\n'
        + '# 95th percentile latency\n'
        + 'histogram_quantile(0.95,\n'
        + '  sum by (le) (\n'
        + '    rate(http_request_duration_seconds_bucket[5m])\n'
        + '  )\n'
        + ')'}</code></pre>

      <h3>Stat Panel</h3>
      <p>
        Displays a single numeric value with optional sparkline. Use it for high-level KPIs like total requests, error count, or uptime percentage. Supports color thresholds and value mappings.
      </p>

      <h3>Gauge Panel</h3>
      <p>
        Shows a value within a range, perfect for CPU usage, memory utilization, or disk space. Configure min/max values and threshold colors (green, yellow, red) to quickly identify problems.
      </p>

      <h3>Table Panel</h3>
      <p>
        Renders data in a tabular format. Useful for displaying instant query results, top-N lists, or detailed breakdowns. Supports column filtering, sorting, cell coloring, and links.
      </p>

      <h3>Heatmap Panel</h3>
      <p>
        Visualizes data density over two dimensions. Ideal for histogram distributions (like request latency buckets) and understanding patterns across time. Works well with Prometheus histogram metrics.
      </p>

      <h3>Bar Chart Panel</h3>
      <p>
        Compares categorical data with horizontal or vertical bars. Use it for top-N endpoints by request count, error rates by service, or resource usage comparison across teams.
      </p>

      {/* Section 6: Variables & Templating */}
      <h2>Variables and Templating</h2>
      <p>
        Variables make dashboards dynamic and reusable. Instead of hardcoding values like server names or environments, you define variables that appear as dropdown menus at the top of the dashboard. Users can switch between environments, namespaces, or services without editing queries.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# Variable configuration examples\n'
        + '\n'
        + '# Query variable - fetches values from Prometheus\n'
        + '# Name: namespace\n'
        + '# Type: Query\n'
        + '# Query: label_values(kube_pod_info, namespace)\n'
        + '# Multi-value: enabled\n'
        + '# Include All: enabled\n'
        + '\n'
        + '# Using variables in panel queries:\n'
        + 'rate(http_requests_total{namespace=~"\\$namespace"}[5m])\n'
        + '\n'
        + '# Custom variable\n'
        + '# Name: environment\n'
        + '# Type: Custom\n'
        + '# Values: production, staging, development\n'
        + '\n'
        + '# Interval variable\n'
        + '# Name: interval\n'
        + '# Type: Interval\n'
        + '# Values: 1m, 5m, 15m, 1h\n'
        + '# Used in: rate(http_requests_total[\\$interval])\n'
        + '\n'
        + '# Chained variables - filter pods by selected namespace\n'
        + '# Name: pod\n'
        + '# Query: label_values(kube_pod_info{namespace=~"\\$namespace"}, pod)'}</code></pre>

      {/* Section 7: Alerting */}
      <h2>Alerting Rules and Notifications</h2>
      <p>
        Grafana Alerting (unified alerting since Grafana 9) lets you define alert rules that evaluate queries on a schedule. When conditions are met, notifications are sent to configured contact points. The alerting system supports multi-dimensional alerts, routing, silences, and mute timings.
      </p>

      <h3>Creating Alert Rules</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# Alert rule configuration (YAML provisioning)\n'
        + '# File: provisioning/alerting/rules.yml\n'
        + 'apiVersion: 1\n'
        + 'groups:\n'
        + '  - orgId: 1\n'
        + '    name: application-alerts\n'
        + '    folder: Production\n'
        + '    interval: 1m\n'
        + '    rules:\n'
        + '      - uid: high-error-rate\n'
        + '        title: High Error Rate\n'
        + '        condition: C\n'
        + '        data:\n'
        + '          - refId: A\n'
        + '            relativeTimeRange:\n'
        + '              from: 300\n'
        + '              to: 0\n'
        + '            datasourceUid: prometheus\n'
        + '            model:\n'
        + '              expr: >\n'
        + '                sum(rate(http_requests_total{status=~"5.."}[5m]))\n'
        + '                /\n'
        + '                sum(rate(http_requests_total[5m]))\n'
        + '          - refId: B\n'
        + '            datasourceUid: __expr__\n'
        + '            model:\n'
        + '              type: reduce\n'
        + '              reducer: last\n'
        + '              expression: A\n'
        + '          - refId: C\n'
        + '            datasourceUid: __expr__\n'
        + '            model:\n'
        + '              type: threshold\n'
        + '              expression: B\n'
        + '              conditions:\n'
        + '                - evaluator:\n'
        + '                    type: gt\n'
        + '                    params: [0.05]\n'
        + '        for: 5m\n'
        + '        labels:\n'
        + '          severity: critical\n'
        + '        annotations:\n'
        + '          summary: Error rate above 5%'}</code></pre>

      <h3>Contact Points and Notification Policies</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# provisioning/alerting/contactpoints.yml\n'
        + 'apiVersion: 1\n'
        + 'contactPoints:\n'
        + '  - orgId: 1\n'
        + '    name: slack-ops\n'
        + '    receivers:\n'
        + '      - uid: slack-1\n'
        + '        type: slack\n'
        + '        settings:\n'
        + '          recipient: "#ops-alerts"\n'
        + '          token: xoxb-your-slack-token\n'
        + '          title: \'{{ template "slack.default.title" . }}\'\n'
        + '  - orgId: 1\n'
        + '    name: pagerduty-critical\n'
        + '    receivers:\n'
        + '      - uid: pd-1\n'
        + '        type: pagerduty\n'
        + '        settings:\n'
        + '          integrationKey: your-pd-integration-key\n'
        + '          severity: critical\n'
        + '\n'
        + '# provisioning/alerting/policies.yml\n'
        + 'apiVersion: 1\n'
        + 'policies:\n'
        + '  - orgId: 1\n'
        + '    receiver: slack-ops\n'
        + '    group_by: [alertname, namespace]\n'
        + '    group_wait: 30s\n'
        + '    group_interval: 5m\n'
        + '    repeat_interval: 4h\n'
        + '    routes:\n'
        + '      - receiver: pagerduty-critical\n'
        + '        matchers:\n'
        + '          - severity = critical\n'
        + '        continue: false'}</code></pre>

      {/* Section 8: Provisioning */}
      <h2>Provisioning: Dashboards and Data Sources as Code</h2>
      <p>
        Provisioning allows you to configure Grafana from files instead of the UI. This is essential for infrastructure-as-code workflows, version-controlled configurations, and automated deployments. Provisioning files are placed in Grafana&#39;s <code>provisioning/</code> directory.
      </p>

      <h3>Data Source Provisioning</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# provisioning/datasources/datasources.yml\n'
        + 'apiVersion: 1\n'
        + 'datasources:\n'
        + '  - name: Prometheus\n'
        + '    type: prometheus\n'
        + '    access: proxy\n'
        + '    url: http://prometheus:9090\n'
        + '    isDefault: true\n'
        + '    editable: false\n'
        + '\n'
        + '  - name: Loki\n'
        + '    type: loki\n'
        + '    access: proxy\n'
        + '    url: http://loki:3100\n'
        + '    jsonData:\n'
        + '      derivedFields:\n'
        + '        - name: TraceID\n'
        + '          matcherRegex: "traceID=(\\\\w+)"\n'
        + '          url: "\\$\\${__value.raw}"\n'
        + '          datasourceUid: tempo\n'
        + '\n'
        + '  - name: Tempo\n'
        + '    type: tempo\n'
        + '    access: proxy\n'
        + '    url: http://tempo:3200\n'
        + '    uid: tempo\n'
        + '    jsonData:\n'
        + '      tracesToLogsV2:\n'
        + '        datasourceUid: loki\n'
        + '        filterByTraceID: true'}</code></pre>

      <h3>Dashboard Provisioning</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# provisioning/dashboards/dashboards.yml\n'
        + 'apiVersion: 1\n'
        + 'providers:\n'
        + '  - name: "default"\n'
        + '    orgId: 1\n'
        + '    folder: "Provisioned"\n'
        + '    type: file\n'
        + '    disableDeletion: true\n'
        + '    updateIntervalSeconds: 30\n'
        + '    allowUiUpdates: false\n'
        + '    options:\n'
        + '      path: /var/lib/grafana/dashboards\n'
        + '      foldersFromFilesStructure: true\n'
        + '\n'
        + '# Place dashboard JSON files in /var/lib/grafana/dashboards/\n'
        + '# Grafana will auto-load them on startup\n'
        + '# Directory structure becomes folder structure in Grafana:\n'
        + '#   dashboards/\n'
        + '#     infrastructure/\n'
        + '#       node-exporter.json\n'
        + '#       kubernetes.json\n'
        + '#     application/\n'
        + '#       api-overview.json\n'
        + '#       frontend-metrics.json'}</code></pre>

      {/* Section 9: Grafana Loki */}
      <h2>Grafana Loki: Log Aggregation</h2>
      <p>
        <strong>Grafana Loki</strong> is a horizontally scalable, highly available log aggregation system inspired by Prometheus. Unlike Elasticsearch, Loki indexes only the labels (metadata) of logs rather than the full log content, making it significantly cheaper to operate while still being fast for label-based queries.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# docker-compose for Loki + Promtail + Grafana\n'
        + 'services:\n'
        + '  loki:\n'
        + '    image: grafana/loki:latest\n'
        + '    ports:\n'
        + '      - "3100:3100"\n'
        + '    volumes:\n'
        + '      - ./loki-config.yml:/etc/loki/config.yml\n'
        + '    command: -config.file=/etc/loki/config.yml\n'
        + '\n'
        + '  promtail:\n'
        + '    image: grafana/promtail:latest\n'
        + '    volumes:\n'
        + '      - /var/log:/var/log\n'
        + '      - ./promtail-config.yml:/etc/promtail/config.yml\n'
        + '    command: -config.file=/etc/promtail/config.yml\n'
        + '\n'
        + '# promtail-config.yml\n'
        + 'server:\n'
        + '  http_listen_port: 9080\n'
        + '\n'
        + 'positions:\n'
        + '  filename: /tmp/positions.yaml\n'
        + '\n'
        + 'clients:\n'
        + '  - url: http://loki:3100/loki/api/v1/push\n'
        + '\n'
        + 'scrape_configs:\n'
        + '  - job_name: system\n'
        + '    static_configs:\n'
        + '      - targets: [localhost]\n'
        + '        labels:\n'
        + '          job: varlogs\n'
        + '          __path__: /var/log/*.log'}</code></pre>

      <h3>LogQL Query Examples</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# Stream selector - select logs by labels\n'
        + '{job="api", namespace="production"}\n'
        + '\n'
        + '# Line filter - case sensitive contains\n'
        + '{job="api"} |= "error"\n'
        + '\n'
        + '# Negative filter - exclude lines\n'
        + '{job="api"} != "healthcheck"\n'
        + '\n'
        + '# Regex filter\n'
        + '{job="api"} |~ "status=(4|5)\\\\d{2}"\n'
        + '\n'
        + '# JSON parser - extract fields from JSON logs\n'
        + '{job="api"} | json | level="error" | duration > 1s\n'
        + '\n'
        + '# Log metrics - count errors per minute\n'
        + 'sum(rate({job="api"} |= "error" [1m])) by (service)\n'
        + '\n'
        + '# Unwrap numeric values from logs\n'
        + 'avg_over_time(\n'
        + '  {job="api"} | json | unwrap duration [5m]\n'
        + ') by (endpoint)'}</code></pre>

      {/* Section 10: Grafana Tempo */}
      <h2>Grafana Tempo: Distributed Tracing</h2>
      <p>
        <strong>Grafana Tempo</strong> is a distributed tracing backend that requires only object storage (S3, GCS, Azure Blob) to operate. It accepts traces in Jaeger, Zipkin, OpenTelemetry, and OpenCensus formats. Tempo integrates tightly with Grafana, Loki, and Mimir to correlate traces with logs and metrics.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# tempo-config.yml\n'
        + 'server:\n'
        + '  http_listen_port: 3200\n'
        + '\n'
        + 'distributor:\n'
        + '  receivers:\n'
        + '    otlp:\n'
        + '      protocols:\n'
        + '        grpc:\n'
        + '          endpoint: 0.0.0.0:4317\n'
        + '        http:\n'
        + '          endpoint: 0.0.0.0:4318\n'
        + '    jaeger:\n'
        + '      protocols:\n'
        + '        thrift_http:\n'
        + '          endpoint: 0.0.0.0:14268\n'
        + '\n'
        + 'storage:\n'
        + '  trace:\n'
        + '    backend: s3\n'
        + '    s3:\n'
        + '      bucket: tempo-traces\n'
        + '      endpoint: s3.amazonaws.com\n'
        + '      region: us-east-1\n'
        + '\n'
        + 'metrics_generator:\n'
        + '  registry:\n'
        + '    external_labels:\n'
        + '      source: tempo\n'
        + '  storage:\n'
        + '    path: /var/tempo/generator/wal\n'
        + '    remote_write:\n'
        + '      - url: http://prometheus:9090/api/v1/write'}</code></pre>

      {/* Section 11: Grafana Cloud */}
      <h2>Grafana Cloud</h2>
      <p>
        <strong>Grafana Cloud</strong> is the fully managed SaaS platform from Grafana Labs. It includes hosted Grafana, Prometheus (Mimir), Loki, Tempo, and additional features like synthetic monitoring, k6 load testing, and Incident Response Management (IRM). The free tier includes 10,000 series for metrics, 50 GB of logs, and 50 GB of traces per month.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# Sending metrics to Grafana Cloud Prometheus\n'
        + '# Add remote_write to your prometheus.yml:\n'
        + 'remote_write:\n'
        + '  - url: https://prometheus-prod-01-eu-west-0.grafana.net/api/prom/push\n'
        + '    basic_auth:\n'
        + '      username: <instance_id>\n'
        + '      password: <api_key>\n'
        + '\n'
        + '# Sending logs to Grafana Cloud Loki\n'
        + '# Update your Promtail or Alloy config:\n'
        + 'clients:\n'
        + '  - url: https://logs-prod-eu-west-0.grafana.net/loki/api/v1/push\n'
        + '    basic_auth:\n'
        + '      username: <instance_id>\n'
        + '      password: <api_key>\n'
        + '\n'
        + '# Grafana Alloy (the OpenTelemetry collector by Grafana)\n'
        + '# is the recommended agent for Grafana Cloud\n'
        + '# It replaces Promtail, Grafana Agent, and OTel Collector'}</code></pre>

      {/* Section 12: User Management & RBAC */}
      <h2>User Management and RBAC</h2>
      <p>
        Grafana supports Organizations, Teams, and Role-Based Access Control (RBAC) for fine-grained permission management. RBAC is available in Grafana Enterprise and Grafana Cloud.
      </p>
      <ul>
        <li><strong>Organizations</strong>: Isolated tenants with separate dashboards, data sources, and users. Each user can belong to multiple organizations.</li>
        <li><strong>Teams</strong>: Groups of users within an organization. Assign dashboard and folder permissions to teams.</li>
        <li><strong>Roles</strong>: Admin, Editor, Viewer. Custom roles (Enterprise/Cloud) allow granular permissions like data source access, alert rule management, or annotation creation.</li>
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# grafana.ini - Authentication configuration\n'
        + '[auth]\n'
        + 'disable_login_form = false\n'
        + '\n'
        + '# LDAP authentication\n'
        + '[auth.ldap]\n'
        + 'enabled = true\n'
        + 'config_file = /etc/grafana/ldap.toml\n'
        + '\n'
        + '# OAuth2 / OIDC (e.g., Keycloak, Okta, Azure AD)\n'
        + '[auth.generic_oauth]\n'
        + 'enabled = true\n'
        + 'name = SSO\n'
        + 'client_id = grafana\n'
        + 'client_secret = your-client-secret\n'
        + 'scopes = openid profile email\n'
        + 'auth_url = https://sso.example.com/auth\n'
        + 'token_url = https://sso.example.com/token\n'
        + 'api_url = https://sso.example.com/userinfo\n'
        + 'role_attribute_path = role\n'
        + '\n'
        + '# Auto-assign roles based on org\n'
        + '[users]\n'
        + 'auto_assign_org = true\n'
        + 'auto_assign_org_role = Viewer'}</code></pre>

      {/* Section 13: Embedding & Sharing */}
      <h2>Embedding and Sharing Dashboards</h2>
      <p>
        Grafana provides multiple ways to share dashboards and panels with stakeholders. You can share via direct links, snapshots, embedded iframes, or public dashboards.
      </p>
      <ul>
        <li><strong>Direct link</strong>: Share the dashboard URL with time range and variable parameters preserved</li>
        <li><strong>Snapshot</strong>: Create a point-in-time snapshot that does not require authentication to view</li>
        <li><strong>Embedded panels</strong>: Embed individual panels into external web pages using iframe URLs</li>
        <li><strong>Public dashboards</strong> (Grafana 10+): Make a dashboard publicly accessible without login</li>
        <li><strong>PDF/PNG reports</strong> (Enterprise): Schedule automated reports delivered via email</li>
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# Enable public dashboards and anonymous access\n'
        + '# grafana.ini\n'
        + '[feature_toggles]\n'
        + 'publicDashboards = true\n'
        + '\n'
        + '[auth.anonymous]\n'
        + 'enabled = true\n'
        + 'org_name = Public\n'
        + 'org_role = Viewer\n'
        + '\n'
        + '# Embedding: allow Grafana to be loaded in iframes\n'
        + '[security]\n'
        + 'allow_embedding = true\n'
        + 'cookie_samesite = none\n'
        + 'cookie_secure = true\n'
        + '\n'
        + '# Embed URL pattern:\n'
        + '# https://grafana.example.com/d-solo/DASHBOARD_UID/\n'
        + '#   ?orgId=1&panelId=2&from=now-6h&to=now\n'
        + '#\n'
        + '# Use in HTML:\n'
        + '# <iframe src="..." width="100%" height="400"\n'
        + '#   frameborder="0"></iframe>'}</code></pre>

      {/* Section 14: Plugins */}
      <h2>Grafana Plugins</h2>
      <p>
        Grafana&#39;s plugin system extends its functionality with additional data sources, panel types, and applications. Plugins are available on the official Grafana plugin catalog at grafana.com/grafana/plugins.
      </p>
      <ul>
        <li><strong>Data source plugins</strong>: Connect to additional backends (Datadog, Splunk, MongoDB, GitHub, Jira, Snowflake)</li>
        <li><strong>Panel plugins</strong>: New visualization types (Flowcharting, Worldmap, Treemap, Diagram, Polystat)</li>
        <li><strong>App plugins</strong>: Complete applications like Kubernetes monitoring, synthetic monitoring, and performance testing</li>
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# Install plugins via CLI\n'
        + 'grafana-cli plugins install grafana-piechart-panel\n'
        + 'grafana-cli plugins install grafana-worldmap-panel\n'
        + 'grafana-cli plugins install grafana-clock-panel\n'
        + '\n'
        + '# Install via Docker environment variable\n'
        + 'docker run -d \\\n'
        + '  -e "GF_INSTALL_PLUGINS=grafana-clock-panel,grafana-piechart-panel" \\\n'
        + '  grafana/grafana-oss:latest\n'
        + '\n'
        + '# Install via Helm values\n'
        + '# values.yaml\n'
        + 'plugins:\n'
        + '  - grafana-piechart-panel\n'
        + '  - grafana-worldmap-panel\n'
        + '  - grafana-clock-panel\n'
        + '\n'
        + '# List installed plugins\n'
        + 'grafana-cli plugins ls\n'
        + '\n'
        + '# Update all plugins\n'
        + 'grafana-cli plugins update-all'}</code></pre>

      {/* Section 15: Best Practices */}
      <h2>Grafana Best Practices for Production</h2>

      <h3>Dashboard Organization</h3>
      <ul>
        <li>Use <strong>folders</strong> to organize dashboards by team, service, or environment</li>
        <li>Follow a naming convention: <code>[Team] Service - View</code> (e.g., Platform - Kubernetes Overview)</li>
        <li>Create a <strong>home dashboard</strong> with links to the most important dashboards</li>
        <li>Use dashboard <strong>tags</strong> for easy filtering and search</li>
        <li>Limit dashboards to 15-20 panels for performance</li>
      </ul>

      <h3>Query Performance</h3>
      <ul>
        <li>Use <strong>recording rules</strong> in Prometheus to precompute expensive queries</li>
        <li>Set appropriate <strong>time ranges</strong>; avoid querying more data than needed</li>
        <li>Use the <strong>Min interval</strong> setting to prevent over-sampling on wide time ranges</li>
        <li>Enable <strong>query caching</strong> to reduce load on data sources</li>
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# Prometheus recording rules for Grafana performance\n'
        + '# rules.yml\n'
        + 'groups:\n'
        + '  - name: http_metrics\n'
        + '    interval: 1m\n'
        + '    rules:\n'
        + '      # Pre-compute request rate\n'
        + '      - record: job:http_requests:rate5m\n'
        + '        expr: sum by (job) (rate(http_requests_total[5m]))\n'
        + '\n'
        + '      # Pre-compute error rate percentage\n'
        + '      - record: job:http_errors:ratio5m\n'
        + '        expr: >\n'
        + '          sum by (job) (rate(http_requests_total{status=~"5.."}[5m]))\n'
        + '          /\n'
        + '          sum by (job) (rate(http_requests_total[5m]))\n'
        + '\n'
        + '      # Pre-compute p95 latency\n'
        + '      - record: job:http_duration:p95_5m\n'
        + '        expr: >\n'
        + '          histogram_quantile(0.95,\n'
        + '            sum by (job, le) (\n'
        + '              rate(http_request_duration_seconds_bucket[5m])\n'
        + '            )\n'
        + '          )'}</code></pre>

      <h3>High Availability</h3>
      <ul>
        <li>Run <strong>multiple Grafana instances</strong> behind a load balancer</li>
        <li>Use a shared <strong>external database</strong> (PostgreSQL or MySQL) instead of the default SQLite</li>
        <li>Configure shared <strong>session storage</strong> with Redis or Memcached</li>
        <li>Use <strong>Grafana Image Renderer</strong> as a separate service for rendering panels to PNG</li>
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# grafana.ini - High Availability configuration\n'
        + '[database]\n'
        + 'type = postgres\n'
        + 'host = pg-primary:5432\n'
        + 'name = grafana\n'
        + 'user = grafana\n'
        + 'password = secret\n'
        + 'ssl_mode = require\n'
        + '\n'
        + '[remote_cache]\n'
        + 'type = redis\n'
        + 'connstr = addr=redis:6379,pool_size=100,db=0\n'
        + '\n'
        + '[unified_alerting]\n'
        + 'enabled = true\n'
        + 'ha_listen_address = "0.0.0.0:9094"\n'
        + 'ha_peers = "grafana-1:9094,grafana-2:9094,grafana-3:9094"\n'
        + '\n'
        + '[rendering]\n'
        + 'server_url = http://grafana-image-renderer:8081/render\n'
        + 'callback_url = http://grafana:3000/'}</code></pre>

      <h3>Security Best Practices</h3>
      <ul>
        <li>Change the default admin password immediately after installation</li>
        <li>Use <strong>HTTPS</strong> with valid TLS certificates (terminate at load balancer or configure in Grafana)</li>
        <li>Enable <strong>SSO/OAuth</strong> and disable basic authentication in production</li>
        <li>Set <code>cookie_secure = true</code> and <code>cookie_samesite = strict</code></li>
        <li>Use <strong>API keys or service accounts</strong> with least-privilege roles for automation</li>
        <li>Restrict data source access to prevent users from running arbitrary queries</li>
        <li>Regularly <strong>update Grafana</strong> to patch security vulnerabilities</li>
      </ul>

      {/* Section 16: Grafana API */}
      <h2>Grafana HTTP API</h2>
      <p>
        Grafana exposes a comprehensive HTTP API for automation. You can manage dashboards, data sources, users, organizations, annotations, and alerts programmatically.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px' }}><code>{'# Create a service account and token\n'
        + 'curl -X POST http://localhost:3000/api/serviceaccounts \\\n'
        + '  -H "Authorization: Bearer admin-token" \\\n'
        + '  -H "Content-Type: application/json" \\\n'
        + '  -d \'{"name": "ci-deploy", "role": "Editor"}\'\n'
        + '\n'
        + '# Search dashboards\n'
        + 'curl -H "Authorization: Bearer sa-token" \\\n'
        + '  "http://localhost:3000/api/search?query=kubernetes"\n'
        + '\n'
        + '# Export a dashboard\n'
        + 'curl -H "Authorization: Bearer sa-token" \\\n'
        + '  "http://localhost:3000/api/dashboards/uid/abc123"\n'
        + '\n'
        + '# Import a dashboard\n'
        + 'curl -X POST http://localhost:3000/api/dashboards/db \\\n'
        + '  -H "Authorization: Bearer sa-token" \\\n'
        + '  -H "Content-Type: application/json" \\\n'
        + '  -d @dashboard.json\n'
        + '\n'
        + '# Create an annotation\n'
        + 'curl -X POST http://localhost:3000/api/annotations \\\n'
        + '  -H "Authorization: Bearer sa-token" \\\n'
        + '  -H "Content-Type: application/json" \\\n'
        + '  -d \'{"dashboardId":1,"text":"Deployment v2.3.1","tags":["deploy"]}\''}</code></pre>

      {/* FAQ Section */}
      <h2>Frequently Asked Questions</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '8px' }}>What is Grafana and what is it used for?</h3>
          <p style={{ margin: 0 }}>Grafana is an open-source observability platform for visualizing metrics, logs, and traces. It connects to data sources like Prometheus, Loki, InfluxDB, and Elasticsearch, allowing you to build interactive dashboards for monitoring infrastructure, applications, and business metrics.</p>
        </div>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '8px' }}>How do I install Grafana with Docker?</h3>
          <p style={{ margin: 0 }}>Run <code>docker run -d -p 3000:3000 --name grafana grafana/grafana-oss:latest</code>. Open http://localhost:3000 and log in with admin/admin. For production, mount a volume for persistent storage and set environment variables for configuration.</p>
        </div>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '8px' }}>What is the difference between Grafana and Prometheus?</h3>
          <p style={{ margin: 0 }}>Prometheus is a time-series database that collects and stores metrics via a pull model. Grafana is a visualization platform that queries data from Prometheus and other sources to create dashboards. They are complementary: Prometheus stores data, Grafana displays it.</p>
        </div>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '8px' }}>How do I add Prometheus as a data source?</h3>
          <p style={{ margin: 0 }}>Go to Configuration, then Data Sources, then Add data source, and select Prometheus. Enter the Prometheus server URL (e.g., http://prometheus:9090), configure authentication if needed, and click Save and Test. You can also provision data sources via YAML files.</p>
        </div>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '8px' }}>What panel types are available in Grafana?</h3>
          <p style={{ margin: 0 }}>Grafana offers Time Series, Stat, Gauge, Table, Bar Chart, Heatmap, Pie Chart, Logs, Node Graph, Geomap, Canvas, and many more via plugins. Each panel type is suited for different types of data visualization.</p>
        </div>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '8px' }}>How does Grafana alerting work?</h3>
          <p style={{ margin: 0 }}>Grafana Alerting uses alert rules that evaluate queries at regular intervals. When a condition is met, notifications are sent via contact points such as email, Slack, PagerDuty, or webhooks. Notification policies route alerts to the right teams.</p>
        </div>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '8px' }}>What is Grafana Loki and how does it compare to Elasticsearch?</h3>
          <p style={{ margin: 0 }}>Grafana Loki is a log aggregation system that indexes only labels, not the full log content. This makes it significantly cheaper to operate and easier to scale than Elasticsearch. Loki uses LogQL and integrates natively with Grafana for querying and visualization.</p>
        </div>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '8px' }}>Can I provision dashboards and data sources as code?</h3>
          <p style={{ margin: 0 }}>Yes. Grafana supports provisioning via YAML files placed in the provisioning directory. You can define data sources, dashboards, alert rules, and notification channels as code, enabling GitOps workflows and infrastructure-as-code deployments.</p>
        </div>
      </div>

      {/* Conclusion */}
      <h2>Conclusion</h2>
      <p>
        Grafana has become the industry standard for observability and monitoring dashboards. Whether you are monitoring a single application or a fleet of Kubernetes clusters, Grafana provides the visualization, alerting, and collaboration features you need. Start with Docker for local development, connect Prometheus for metrics and Loki for logs, and gradually adopt provisioning as code and Grafana Cloud as your observability needs grow.
      </p>
      <p>
        The combination of Grafana, Prometheus, Loki, and Tempo (the LGTM stack) provides a complete, open-source observability solution that scales from small teams to enterprise deployments. By following the best practices in this guide, you will build maintainable, performant dashboards that give your team real-time visibility into your systems.
      </p>
    </>
  );
}
