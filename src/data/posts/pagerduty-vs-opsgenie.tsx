'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'PagerDuty vs Opsgenie: Incident Response Platform Comparison',
    intro: 'PagerDuty and Opsgenie are leading incident response and on-call management platforms. Both provide alerting, escalation, on-call scheduling, and incident tracking. PagerDuty, founded in 2009, is the established market leader. Opsgenie, acquired by Atlassian in 2018, integrates tightly with Atlassian tools. This comparison examines their features, integrations, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose PagerDuty for mature, feature-rich incident management with extensive integrations and advanced automation. Choose Opsgenie for Atlassian ecosystem integration, cost-effectiveness, and modern UI. Both handle on-call and alerting well, but PagerDuty has more features while Opsgenie offers better value and Atlassian integration.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'PagerDuty has more mature features and larger ecosystem',
    takeaway2: 'Opsgenie integrates tightly with Atlassian tools (Jira, Confluence)',
    takeaway3: 'Opsgenie is generally more cost-effective',
    takeaway4: 'Both support advanced escalation and on-call scheduling',
    takeaway5: 'PagerDuty has more automation and AI features',
    takeaway6: 'Opsgenie offers better value for Atlassian users',
    
    whatIsPagerdutyTitle: 'What is PagerDuty?',
    whatIsPagerdutyContent: 'PagerDuty is a digital operations management platform founded in 2009. It provides incident response, on-call management, alerting, and event intelligence. PagerDuty aggregates alerts from monitoring tools, routes them to the right responders, and enables fast incident resolution. It is used by thousands of organizations worldwide.',
    
    whatIsOpsgenieTitle: 'What is Opsgenie?',
    whatIsOpsgenieContent: 'Opsgenie is an incident management and on-call alerting platform, founded in 2012 and acquired by Atlassian in 2018. It provides alerting, on-call scheduling, escalation policies, and incident tracking. Opsgenie integrates deeply with Atlassian tools like Jira, Confluence, and Statuspage.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core incident response capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Integration and API usage:',
    
    pagerdutyExampleTitle: 'PagerDuty Configuration',
    opsgenieExampleTitle: 'Opsgenie Configuration',
    
    integrationsTitle: 'Integration Ecosystem',
    integrationsIntro: 'Integration capabilities:',
    
    automationTitle: 'Automation Features',
    automationIntro: 'Automation and AI capabilities:',
    
    useCasesTitle: 'Best Use Cases',
    pagerdutyBestFor: 'PagerDuty is Best For:',
    opsgenieBestFor: 'Opsgenie is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'PagerDuty and Opsgenie both provide robust incident response platforms. PagerDuty is the mature market leader with more features, extensive integrations, and advanced automation capabilities. Opsgenie offers excellent value, especially for Atlassian users, with modern UI and tight integration with Jira and Confluence. Choose PagerDuty for complex enterprise requirements and extensive ecosystem needs. Choose Opsgenie for cost-effectiveness, Atlassian integration, and teams wanting a modern, intuitive platform. Both platforms handle core incident response effectively.',
    
    faq1q: 'Which is more expensive?',
    faq1a: 'PagerDuty is generally more expensive, especially at scale. PagerDuty pricing starts at higher tiers for similar features. Opsgenie offers more competitive pricing with a generous free tier. For budget-conscious teams, Opsgenie often provides better value.',
    
    faq2q: 'Which has better integrations?',
    faq2a: 'PagerDuty has 300+ integrations covering monitoring, ticketing, chat, and more. Opsgenie has 200+ integrations with superior Atlassian integration (Jira, Confluence, Statuspage). For non-Atlassian ecosystems, PagerDuty may have broader coverage. For Atlassian users, Opsgenie is superior.',
    
    faq3q: 'Can they work with Slack/Teams?',
    faq3a: 'Yes, both integrate well with Slack and Microsoft Teams. Both offer rich in-chat incident management, acknowledgments, and notifications. PagerDuty has slightly more mature chat integrations, but Opsgenie covers core needs well.',
    
    faq4q: 'Which is better for large teams?',
    faq4a: 'PagerDuty scales well for large enterprises with advanced features like AIOps, event intelligence, and business services. Opsgenie also scales well and may be more cost-effective at scale. For complex enterprise needs, PagerDuty has more features; for cost-effective scaling, Opsgenie.',
    
    faq5q: 'What about on-call scheduling?',
    faq5a: 'Both have excellent on-call scheduling with rotation support, overrides, and calendar views. PagerDuty has more advanced scheduling features like schedule predictions and time zone handling. Opsgenie provides robust scheduling that meets most needs.',
    
    faq6q: 'Which has better mobile apps?',
    faq6a: 'Both have well-rated mobile apps (iOS and Android). PagerDuty mobile app has more features and longer development history. Opsgenie app is modern and covers core incident response needs. Both support push notifications, ack, and resolve from mobile.',
    
    faq7q: 'How do they handle alert noise?',
    faq7a: 'PagerDuty has more advanced alert grouping, deduplication, and AIOps features for noise reduction. Opsgenie provides alert deduplication and grouping but with fewer AI-driven features. For high-alert-volume environments, PagerDuty\'s intelligence features may help more.',
    
    faq8q: 'Can I use both together?',
    faq8a: 'While possible through APIs, using both would add complexity and cost. Most organizations choose one platform. If migrating, both offer tools to help transition. Open standards and webhooks make integration with other tools straightforward.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'PagerDuty vs Opsgenie：事件响应平台对比',
    intro: 'PagerDuty和Opsgenie是领先的事件响应和值班管理平台。两者都提供告警、升级、值班安排和事件跟踪。PagerDuty成立于2009年，是成熟的市场领导者。Opsgenie于2018年被Atlassian收购，与Atlassian工具紧密集成。本比较考察它们的功能、集成和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为成熟、功能丰富的事件管理和广泛集成及高级自动化选择PagerDuty。为Atlassian生态系统集成、成本效益和现代UI选择Opsgenie。两者都很好地处理值班和告警，但PagerDuty功能更多，而Opsgenie提供更好的价值和Atlassian集成。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'PagerDuty有更成熟的功能和更大的生态系统',
    takeaway2: 'Opsgenie与Atlassian工具（Jira、Confluence）紧密集成',
    takeaway3: 'Opsgenie通常更具成本效益',
    takeaway4: '两者都支持高级升级和值班安排',
    takeaway5: 'PagerDuty有更多自动化和AI功能',
    takeaway6: 'Opsgenie为Atlassian用户提供更好的价值',
    
    whatIsPagerdutyTitle: '什么是PagerDuty？',
    whatIsPagerdutyContent: 'PagerDuty是成立于2009年的数字运营管理平台。它提供事件响应、值班管理、告警和事件智能。PagerDuty从监控工具聚合告警，将其路由到正确的响应者，并实现快速事件解决。全球数千家组织使用它。',
    
    whatIsOpsgenieTitle: '什么是Opsgenie？',
    whatIsOpsgenieContent: 'Opsgenie是事件管理和值班告警平台，成立于2012年，2018年被Atlassian收购。它提供告警、值班安排、升级策略和事件跟踪。Opsgenie与Atlassian工具（如Jira、Confluence和Statuspage）深度集成。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心事件响应能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '集成和API使用：',
    
    pagerdutyExampleTitle: 'PagerDuty配置',
    opsgenieExampleTitle: 'Opsgenie配置',
    
    integrationsTitle: '集成生态',
    integrationsIntro: '集成能力：',
    
    automationTitle: '自动化功能',
    automationIntro: '自动化和AI能力：',
    
    useCasesTitle: '最佳用例',
    pagerdutyBestFor: 'PagerDuty最适合：',
    opsgenieBestFor: 'Opsgenie最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'PagerDuty和Opsgenie都提供强大的事件响应平台。PagerDuty是成熟的市场领导者，具有更多功能、广泛集成和高级自动化能力。Opsgenie提供出色的价值，特别是对于Atlassian用户，具有现代UI和与Jira、Confluence的紧密集成。为复杂的企业需求和广泛的生态系统需求选择PagerDuty。为成本效益、Atlassian集成和需要现代、直观平台的团队选择Opsgenie。两个平台都有效地处理核心事件响应。',
    
    faq1q: '哪个更贵？',
    faq1a: 'PagerDuty通常更贵，特别是在大规模情况下。PagerDuty的类似功能定价从更高层级开始。Opsgenie提供更具竞争力的定价和慷慨的免费层。对于预算敏感的团队，Opsgenie通常提供更好的价值。',
    
    faq2q: '哪个集成更好？',
    faq2a: 'PagerDuty有300+集成，涵盖监控、工单、聊天等。Opsgenie有200+集成，与Atlassian（Jira、Confluence、Statuspage）集成更优越。对于非Atlassian生态系统，PagerDuty可能有更广泛的覆盖。对于Atlassian用户，Opsgenie更优越。',
    
    faq3q: '它们可以与Slack/Teams一起工作吗？',
    faq3a: '是的，两者都与Slack和Microsoft Teams良好集成。两者都提供丰富的聊天内事件管理、确认和通知。PagerDuty的聊天集成稍微更成熟，但Opsgenie很好地满足核心需求。',
    
    faq4q: '哪个更适合大团队？',
    faq4a: 'PagerDuty通过AIOps、事件智能和业务服务等高级功能为企业扩展良好。Opsgenie也扩展良好，在大规模时可能更具成本效益。对于复杂的企业需求，PagerDuty有更多功能；对于成本效益的扩展，选择Opsgenie。',
    
    faq5q: '值班安排怎么样？',
    faq5a: '两者都有优秀的值班安排，支持轮换、覆盖和日历视图。PagerDuty有更高级的安排功能，如安排预测和时区处理。Opsgenie提供满足大多数需求的强大安排功能。',
    
    faq6q: '哪个移动应用更好？',
    faq6a: '两者都有评价良好的移动应用（iOS和Android）。PagerDuty移动应用有更多功能和更长的开发历史。Opsgenie应用现代化，覆盖核心事件响应需求。两者都支持推送通知、从移动端确认和解决。',
    
    faq7q: '它们如何处理告警噪音？',
    faq7a: 'PagerDuty有更高级的告警分组、去重和AIOps功能来减少噪音。Opsgenie提供告警去重和分组，但AI驱动功能较少。对于高告警量环境，PagerDuty的智能功能可能更有帮助。',
    
    faq8q: '我可以同时使用两者吗？',
    faq8a: '虽然可以通过API实现，但同时使用两者会增加复杂性和成本。大多数组织选择一个平台。如果迁移，两者都提供工具帮助过渡。开放标准和webhook使与其他工具的集成变得简单。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PagerdutyVsOpsgenie({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      <h2 style={h2Style}>{ct.takeawaysTitle}</h2>
      <div style={{ ...boxStyle, borderLeft: '4px solid #22c55e' }}>
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{ct.takeaway1}</li>
          <li>{ct.takeaway2}</li>
          <li>{ct.takeaway3}</li>
          <li>{ct.takeaway4}</li>
          <li>{ct.takeaway5}</li>
          <li>{ct.takeaway6}</li>
        </ul>
      </div>

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsPagerdutyTitle}</h3>
      <p style={pStyle}>{ct.whatIsPagerdutyContent}</p>

      <h3 style={h3Style}>{ct.whatIsOpsgenieTitle}</h3>
      <p style={pStyle}>{ct.whatIsOpsgenieContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>PagerDuty</th>
              <th style={thStyle}>Opsgenie</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '值班安排' : 'On-Call Scheduling', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent'],
              [isZh ? '升级策略' : 'Escalation Policies', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent'],
              [isZh ? '告警分组' : 'Alert Grouping', isZh ? '高级' : 'Advanced', isZh ? '良好' : 'Good'],
              [isZh ? '事件追踪' : 'Incident Tracking', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent'],
              [isZh ? '移动应用' : 'Mobile Apps', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent'],
              [isZh ? 'AIOps功能' : 'AIOps Features', isZh ? '支持' : 'Yes', isZh ? '有限' : 'Limited'],
              [isZh ? '状态页面' : 'Status Pages', isZh ? '内置' : 'Built-in', isZh ? '与Statuspage集成' : 'Statuspage integration'],
              [isZh ? 'Atlassian集成' : 'Atlassian Integration', isZh ? '基础' : 'Basic', isZh ? '深度' : 'Deep'],
            ].map(([feature, pagerduty, opsgenie], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{pagerduty}</td>
                <td style={tdStyle}>{opsgenie}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>PagerDuty</th>
              <th style={thStyle}>Opsgenie</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '告警去重' : 'Alert Deduplication', isZh ? '智能去重' : 'Smart deduplication', isZh ? '支持' : 'Yes'],
              [isZh ? '服务依赖' : 'Service Dependencies', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '事后分析' : 'Post-Incident Review', isZh ? '内置' : 'Built-in', isZh ? '与Confluence集成' : 'Confluence integration'],
              [isZh ? '运行手册' : 'Runbooks', isZh ? '支持' : 'Yes', isZh ? '与Confluence集成' : 'Confluence integration'],
              [isZh ? '业务服务' : 'Business Services', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? 'Slack集成' : 'Slack Integration', isZh ? '深度' : 'Deep', isZh ? '深度' : 'Deep'],
              [isZh ? 'Teams集成' : 'Teams Integration', isZh ? '深度' : 'Deep', isZh ? '深度' : 'Deep'],
              [isZh ? '分析仪表盘' : 'Analytics Dashboard', isZh ? '高级' : 'Advanced', isZh ? '良好' : 'Good'],
            ].map(([cap, pagerduty, opsgenie], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{pagerduty}</td>
                <td style={tdStyle}>{opsgenie}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#06ac38' }}>{ct.pagerdutyExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# PagerDuty API - Create Incident
curl -X POST https://api.pagerduty.com/incidents \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Token token=your-api-token' \\
  -H 'Accept: application/vnd.pagerduty+json;version=2' \\
  -H 'From: user@email.com' \\
  -d '{
    "incident": {
      "type": "incident",
      "title": "Database server down",
      "service": {
        "id": "SERVICE_ID",
        "type": "service_reference"
      },
      "priority": {
        "id": "PRIORITY_ID",
        "type": "priority_reference"
      },
      "incident_key": "incident-key-123",
      "body": {
        "type": "incident_body",
        "details": "Production database is not responding"
      }
    }
  }'

# PagerDuty Webhook Integration (monitoring alert)
# Send event to PagerDuty Events API
curl -X POST https://events.pagerduty.com/v2/enqueue \\
  -H 'Content-Type: application/json' \\
  -d '{
    "routing_key": "your-integration-key",
    "event_action": "trigger",
    "dedup_key": "server-down-001",
    "payload": {
      "summary": "Server CPU usage over 90%",
      "severity": "critical",
      "source": "monitoring-server-01",
      "component": "CPU",
      "group": "prod-servers",
      "class": "performance",
      "custom_details": {
        "cpu_percent": 95,
        "server_name": "prod-web-01"
      }
    }
  }'

# PagerDuty Terraform Configuration
resource "pagerduty_service" "web_app" {
  name              = "Web Application"
  description       = "Production web application"
  auto_resolve_timeout   = 14400
  acknowledgement_timeout = 600
  escalation_policy      = pagerduty_escalation_policy.dev_team.id
}

resource "pagerduty_escalation_policy" "dev_team" {
  name = "Development Team"
  rule {
    id   = "rule-1"
    target {
      type = "user_reference"
      id   = pagerduty_user.oncall.id
    }
    escalation_delay_in_minutes = 5
  }
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#2684ff' }}>{ct.opsgenieExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Opsgenie API - Create Alert
curl -X POST https://api.opsgenie.com/v2/alerts \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: GenieKey your-api-key' \\
  -d '{
    "message": "Database server down",
    "alias": "db-server-down",
    "description": "Production database is not responding",
    "responders": [
      {
        "type": "team",
        "id": "team-id-123"
      }
    ],
    "visibleTo": [
      {
        "type": "team",
        "id": "team-id-456"
      }
    ],
    "priority": "P1",
    "tags": ["production", "database"],
    "details": {
      "server_name": "prod-db-01",
      "error_code": "503"
    }
  }'

# Opsgenie Webhook Integration (monitoring alert)
curl -X POST https://api.opsgenie.com/v1/json/integration \\
  -H 'Content-Type: application/json' \\
  -d '{
    "apiKey": "your-api-key",
    "message": "Server CPU usage over 90%",
    "alias": "server-cpu-high",
    "description": "CPU usage critical on production server",
    "priority": "P1",
    "teams": ["operations"],
    "details": {
      "cpu_percent": 95,
      "server_name": "prod-web-01"
    }
  }'

# Opsgenie Terraform Configuration
resource "opsgenie_team" "devops" {
  name        = "DevOps Team"
  description = "DevOps and infrastructure team"
}

resource "opsgenie_escalation" "devops_escalation" {
  name = "DevOps Escalation"
  rules {
    condition   = "if-not-acked"
    notify_type = "default"
    delay       = 5
    recipient {
      type = "team"
      id   = opsgenie_team.devops.id
    }
  }
}

resource "opsgenie_integration" "prometheus" {
  name = "Prometheus Integration"
  type = "Prometheus"
  
  responders {
    type = "team"
    id   = opsgenie_team.devops.id
  }
}

# Jira Integration (Opsgenie advantage)
resource "opsgenie_integration_action" "jira_action" {
  integration_id = opsgenie_integration.jira.id
  order          = 1
  action_type    = "create"
  filter {
    type = "match-all-conditions"
    conditions {
      field          = "priority"
      operation      = "equals"
      expected_value = "P1"
    }
  }
}`}</code></pre>

      <h2 style={h2Style}>{ct.integrationsTitle}</h2>
      <p style={pStyle}>{ct.integrationsIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '集成类型' : 'Integration Type'}</th>
              <th style={thStyle}>PagerDuty</th>
              <th style={thStyle}>Opsgenie</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '监控工具' : 'Monitoring Tools', '300+ (Datadog, Splunk, etc.)', '200+ (Prometheus, Grafana, etc.)'],
              ['ITSM', 'ServiceNow, Zendesk, Freshservice', isZh ? 'ServiceNow, Jira Service Management' : 'ServiceNow, Jira Service Management'],
              ['Chat', 'Slack, Teams, Discord', 'Slack, Teams'],
              ['Atlassian', 'Jira, Confluence (basic)', isZh ? 'Jira, Confluence, Statuspage (深度)' : 'Jira, Confluence, Statuspage (deep)'],
              ['CI/CD', 'GitHub, GitLab, Jenkins', 'GitHub, GitLab, Jenkins, Bitbucket'],
              [isZh ? '云服务' : 'Cloud Services', 'AWS, Azure, GCP', 'AWS, Azure, GCP'],
            ].map(([type, pagerduty, opsgenie], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{type}</td>
                <td style={tdStyle}>{pagerduty}</td>
                <td style={tdStyle}>{opsgenie}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.automationTitle}</h2>
      <p style={pStyle}>{ct.automationIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #06ac38' }}>
          <strong style={{ color: '#06ac38' }}>PagerDuty Automation</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '提供AIOps功能，包括智能告警分组、噪音抑制、异常检测。自动化事件响应和修复。事件智能减少噪音高达90%。运行手册自动化。' : 'Offers AIOps features including intelligent alert grouping, noise suppression, anomaly detection. Automated incident response and remediation. Event Intelligence reduces noise up to 90%. Runbook automation.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #2684ff' }}>
          <strong style={{ color: '#2684ff' }}>Opsgenie Automation</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '提供告警去重和分组。与Jira Automation集成用于工作流自动化。基于规则的路由和升级。与Bitbucket Pipelines集成用于CI/CD自动化。' : 'Provides alert deduplication and grouping. Integration with Jira Automation for workflow automation. Rule-based routing and escalation. Integration with Bitbucket Pipelines for CI/CD automation.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #06ac38' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#06ac38' }}>{ct.pagerdutyBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '复杂的企业事件管理' : 'Complex enterprise incident management'}</li>
            <li>{isZh ? '需要AIOps和高级自动化' : 'Need for AIOps and advanced automation'}</li>
            <li>{isZh ? '高告警量环境' : 'High alert volume environments'}</li>
            <li>{isZh ? '需要广泛的第三方集成' : 'Need for extensive third-party integrations'}</li>
            <li>{isZh ? '成熟的事件响应流程' : 'Mature incident response processes'}</li>
            <li>{isZh ? '企业级SLA要求' : 'Enterprise SLA requirements'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #2684ff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#2684ff' }}>{ct.opsgenieBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Atlassian生态系统用户' : 'Atlassian ecosystem users'}</li>
            <li>{isZh ? '预算敏感的团队' : 'Budget-conscious teams'}</li>
            <li>{isZh ? '需要Jira集成' : 'Need for Jira integration'}</li>
            <li>{isZh ? '快速实施需求' : 'Quick implementation needs'}</li>
            <li>{isZh ? '中小型团队' : 'Small to medium teams'}</li>
            <li>{isZh ? '需要现代UI/UX' : 'Need for modern UI/UX'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={"/" + lang + "/tools/url-parser"} style={{ color: '#3b82f6', textDecoration: 'none' }}>URL Parser</a>
      </div>

      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
        [ct.faq7q, ct.faq7a],
        [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
