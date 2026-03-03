'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Stripe vs Paddle: Payment Platform Comparison for SaaS 2025',
    intro: 'Stripe and Paddle are two leading payment platforms for SaaS businesses, but they take fundamentally different approaches. Stripe offers maximum flexibility and control, while Paddle acts as a Merchant of Record (MoR) handling tax compliance globally. This comprehensive comparison examines pricing, features, global coverage, and real-world use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Stripe for maximum control, lower fees on high volumes, and if you can handle tax compliance yourself. Choose Paddle if you want to offload global tax compliance, reduce operational complexity, and prefer paying a higher fee for complete peace of mind. For most SaaS startups selling globally, Paddle simplifies operations significantly.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Paddle is a Merchant of Record (MoR) handling global tax compliance automatically',
    takeaway2: 'Stripe offers lower fees (2.9% + 30c) vs Paddle (5% + 50c) but requires tax management',
    takeaway3: 'Paddle handles VAT, GST, sales tax in 200+ countries automatically',
    takeaway4: 'Stripe has more extensive API and customization options',
    takeaway5: 'Paddle includes built-in subscription management, Stripe requires Stripe Billing',
    takeaway6: 'Stripe supports 135+ currencies, Paddle supports 100+ currencies',
    
    whatIsStripeTitle: 'What is Stripe?',
    whatIsStripeContent: 'Stripe is a payment infrastructure platform founded in 2010. It provides businesses with the tools to accept payments online, manage subscriptions, and handle financial operations. Stripe gives you full control over the payment experience but requires you to handle tax compliance, chargebacks, and merchant registration in each jurisdiction.',
    
    whatIsPaddleTitle: 'What is Paddle?',
    whatIsPaddleContent: 'Paddle, founded in 2012, is a complete payments, tax, and subscription platform designed specifically for SaaS and software companies. As a Merchant of Record, Paddle becomes the legal seller of your product, handling all tax compliance, fraud prevention, and local payment methods globally. This shifts regulatory burden from you to Paddle.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Understanding the true cost of each platform:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing core capabilities:',
    
    globalCoverageTitle: 'Global Coverage',
    globalCoverageIntro: 'Where can you sell with each platform?',
    
    taxComplianceTitle: 'Tax Compliance',
    taxComplianceIntro: 'How each platform handles global tax obligations:',
    
    apiTitle: 'Developer Experience & API',
    apiIntro: 'Comparing integration and customization options:',
    
    subscriptionTitle: 'Subscription Management',
    subscriptionIntro: 'Built-in recurring billing capabilities:',
    
    whenToUseTitle: 'When to Use Each Platform',
    stripeBestFor: 'Use Stripe When:',
    paddleBestFor: 'Use Paddle When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'For SaaS companies in 2025, the choice between Stripe and Paddle comes down to operational priorities. Choose Paddle if you want to minimize complexity and offload global tax compliance - the higher fee is often worth the saved operational overhead. Choose Stripe if you have significant volume (where fee differences matter), need maximum customization, or already have tax compliance infrastructure. Many successful SaaS companies start with Paddle for simplicity and switch to Stripe as they scale.',
    
    faq1q: 'Can I switch from Paddle to Stripe later?',
    faq1a: 'Yes, but it requires migrating customer payment data and re-handling tax compliance. Some companies start with Paddle for simplicity and transition to Stripe as they scale and build tax infrastructure.',
    
    faq2q: 'Does Paddle support one-time payments?',
    faq2a: 'Yes, Paddle supports both one-time and recurring payments. It is particularly well-suited for software licenses, digital products, and SaaS subscriptions.',
    
    faq3q: 'Can I use Stripe for global sales?',
    faq3a: 'Yes, Stripe supports 135+ currencies and operates in 46+ countries. However, you are responsible for registering for VAT/GST in each jurisdiction and handling tax remittance.',
    
    faq4q: 'What is a Merchant of Record (MoR)?',
    faq4a: 'A Merchant of Record is the legal entity responsible for processing payments and handling tax compliance. When you use Paddle, they become the seller of record, not you, which shifts tax liability to them.',
    
    faq5q: 'Does Stripe handle VAT?',
    faq5a: 'Stripe provides tools for VAT calculation and collection (Stripe Tax), but you remain responsible for registration and remittance. Paddle handles this entirely as the MoR.',
    
    faq6q: 'Which platform is better for startups?',
    faq6a: 'Paddle is often better for early-stage startups selling globally because it eliminates tax compliance overhead. Stripe may be better for startups focused on a single market or with existing tax infrastructure.',
    
    faq7q: 'Can I use both Stripe and Paddle?',
    faq7a: 'Technically yes, but it adds complexity. Some companies use Stripe in specific regions and Paddle elsewhere, though this is uncommon. Most choose one platform for consistency.',
    
    faq8q: 'How does payout timing compare?',
    faq8a: 'Stripe typically pays out in 2-7 business days depending on your location and history. Paddle pays out monthly or weekly (for higher volumes) with a slight delay for fraud review.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Stripe vs Paddle：2025年SaaS支付平台对比',
    intro: 'Stripe和Paddle是SaaS企业的两大领先支付平台，但它们采用完全不同的方式。Stripe提供最大的灵活性和控制权，而Paddle作为商户记录(MoR)处理全球税务合规。本全面比较 examines 定价、功能、全球覆盖和实际用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '如果你希望获得最大控制权、大额交易下费用更低，并且能自行处理税务合规，选择Stripe。如果你想免去全球税务合规负担、降低运营复杂度，并且愿意为完全省心支付更高费用，选择Paddle。对于大多数面向全球销售的SaaS初创公司，Paddle显著简化了运营。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Paddle是商户记录(MoR)，自动处理全球税务合规',
    takeaway2: 'Stripe费用较低(2.9% + 30c) vs Paddle(5% + 50c)，但需要管理税务',
    takeaway3: 'Paddle自动处理200+国家的VAT、GST、销售税',
    takeaway4: 'Stripe拥有更广泛的API和定制选项',
    takeaway5: 'Paddle内置订阅管理，Stripe需要Stripe Billing',
    takeaway6: 'Stripe支持135+货币，Paddle支持100+货币',
    
    whatIsStripeTitle: '什么是Stripe？',
    whatIsStripeContent: 'Stripe是2010年成立的支付基础设施平台。它为企业提供在线收款、管理订阅和处理金融操作的工具。Stripe让你完全控制支付体验，但要求你处理每个司法管辖区的税务合规、退款和商户注册。',
    
    whatIsPaddleTitle: '什么是Paddle？',
    whatIsPaddleContent: 'Paddle成立于2012年，是专为SaaS和软件公司设计的完整支付、税务和订阅平台。作为商户记录，Paddle成为你产品的合法销售者，处理所有税务合规、欺诈预防和全球本地支付方式。这将监管负担从你转移到Paddle。',
    
    pricingTitle: '定价对比',
    pricingIntro: '了解每个平台的真实成本：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较核心能力：',
    
    globalCoverageTitle: '全球覆盖',
    globalCoverageIntro: '你可以在哪里销售？',
    
    taxComplianceTitle: '税务合规',
    taxComplianceIntro: '每个平台如何处理全球税务义务：',
    
    apiTitle: '开发者体验与API',
    apiIntro: '比较集成和定制选项：',
    
    subscriptionTitle: '订阅管理',
    subscriptionIntro: '内置循环计费能力：',
    
    whenToUseTitle: '何时使用每个平台',
    stripeBestFor: '使用Stripe的场景：',
    paddleBestFor: '使用Paddle的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '对于2025年的SaaS公司，Stripe和Paddle的选择取决于运营优先级。如果你想最小化复杂度并免去全球税务合规负担，选择Paddle - 更高的费用通常值得节省的运营开销。如果你有大量交易（费用差异重要）、需要最大定制，或已有税务合规基础设施，选择Stripe。许多成功的SaaS公司从Paddle开始以简化运营，随着规模扩大再转向Stripe。',
    
    faq1q: '我可以稍后从Paddle切换到Stripe吗？',
    faq1a: '可以，但需要迁移客户支付数据并重新处理税务合规。一些公司从Paddle开始以简化运营，随着规模扩大和建立税务基础设施后转向Stripe。',
    
    faq2q: 'Paddle支持一次性付款吗？',
    faq2a: '是的，Paddle同时支持一次性付款和循环付款。它特别适合软件许可证、数字产品和SaaS订阅。',
    
    faq3q: '我可以用Stripe进行全球销售吗？',
    faq3a: '可以，Stripe支持135+货币，在46+国家运营。但是，你需要负责在每个司法管辖区注册VAT/GST并处理税务汇缴。',
    
    faq4q: '什么是商户记录(MoR)？',
    faq4a: '商户记录是负责处理支付和税务合规的法律实体。当你使用Paddle时，他们成为记录销售者，而不是你，这会将税务责任转移给他们。',
    
    faq5q: 'Stripe处理VAT吗？',
    faq5a: 'Stripe提供VAT计算和收取工具(Stripe Tax)，但你仍然负责注册和汇缴。Paddle作为MoR完全处理这些。',
    
    faq6q: '哪个平台更适合初创公司？',
    faq6a: 'Paddle通常更适合面向全球销售的早期初创公司，因为它消除了税务合规开销。Stripe可能更适合专注于单一市场或已有税务基础设施的初创公司。',
    
    faq7q: '我可以同时使用Stripe和Paddle吗？',
    faq7a: '技术上可以，但会增加复杂性。一些公司在特定地区使用Stripe，其他地区使用Paddle，但这不常见。大多数公司选择一个平台以保持一致性。',
    
    faq8q: '付款时间如何比较？',
    faq8a: 'Stripe通常在2-7个工作日内付款，具体取决于你的位置和历史记录。Paddle每月或每周付款（大额交易），并略有延迟以进行欺诈审查。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function StripeVsPaddle({ lang }: { lang: string }) {
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

      <div style={{ ...boxStyle, borderLeft: '4px solid #635bff', background: 'linear-gradient(135deg, rgba(99,91,255,0.1), rgba(234,76,137,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#635bff' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsStripeTitle}</h3>
      <p style={pStyle}>{ct.whatIsStripeContent}</p>

      <h3 style={h3Style}>{ct.whatIsPaddleTitle}</h3>
      <p style={pStyle}>{ct.whatIsPaddleContent}</p>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '项目' : 'Item'}</th>
              <th style={thStyle}>Stripe</th>
              <th style={thStyle}>Paddle</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '交易费率' : 'Transaction Fee', '2.9% + $0.30', '5% + $0.50'],
              [isZh ? '国际卡费用' : 'International Cards', '+1.5%', isZh ? '已包含' : 'Included'],
              [isZh ? '货币转换' : 'Currency Conversion', '+1%', isZh ? '已包含' : 'Included'],
              [isZh ? '订阅计费' : 'Subscription Billing', '$0.5% - 0.8% extra', isZh ? '已包含' : 'Included'],
              [isZh ? '税务合规' : 'Tax Compliance', 'Stripe Tax: +0.5%', isZh ? '已包含' : 'Included'],
              [isZh ? '欺诈防护' : 'Fraud Protection', 'Stripe Radar: +$0.05-0.10', isZh ? '已包含' : 'Included'],
              [isZh ? '月费' : 'Monthly Fee', isZh ? '无' : 'None', isZh ? '无' : 'None'],
            ].map(([item, stripe, paddle], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{item}</td>
                <td style={tdStyle}>{stripe}</td>
                <td style={{ ...tdStyle, color: '#ea4c89' }}>{paddle}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Stripe</th>
              <th style={thStyle}>Paddle</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '商户记录' : 'Merchant of Record', isZh ? '你是商户' : 'You are merchant', isZh ? 'Paddle是商户' : 'Paddle is merchant'],
              [isZh ? '全球税务处理' : 'Global Tax Handling', isZh ? '需Stripe Tax + 自行处理' : 'Stripe Tax + Self-managed', isZh ? '全自动处理' : 'Fully automatic'],
              [isZh ? '订阅管理' : 'Subscription Mgmt', 'Stripe Billing', isZh ? '内置' : 'Built-in'],
              [isZh ? '发票生成' : 'Invoice Generation', isZh ? '内置' : 'Built-in', isZh ? '内置 + 税务合规' : 'Built-in + Tax compliant'],
              [isZh ? '欺诈防护' : 'Fraud Protection', 'Stripe Radar (付费)', isZh ? '内置' : 'Built-in'],
              [isZh ? '客户支持' : 'Customer Support', isZh ? '针对支付问题' : 'Payment issues', isZh ? '全面支持(含税务)' : 'Full (including tax)'],
              [isZh ? 'API定制性' : 'API Customization', isZh ? '极高' : 'Very High', isZh ? '中等' : 'Moderate'],
              [isZh ? 'Checkout定制' : 'Checkout Customization', isZh ? '完全可定制' : 'Fully customizable', isZh ? '有限定制' : 'Limited'],
              [isZh ? 'Webhook事件' : 'Webhook Events', isZh ? '丰富' : 'Extensive', isZh ? '标准' : 'Standard'],
            ].map(([feature, stripe, paddle], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{stripe}</td>
                <td style={{ ...tdStyle, color: '#ea4c89' }}>{paddle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.globalCoverageTitle}</h2>
      <p style={pStyle}>{ct.globalCoverageIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '覆盖范围' : 'Coverage'}</th>
              <th style={thStyle}>Stripe</th>
              <th style={thStyle}>Paddle</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '支持国家' : 'Countries Supported', '46+', '200+'],
              [isZh ? '支持货币' : 'Currencies', '135+', '100+'],
              [isZh ? '支付方式' : 'Payment Methods', '100+', '200+'],
              [isZh ? '本地支付方式' : 'Local Payment Methods', isZh ? '需单独配置' : 'Requires setup', isZh ? '自动启用' : 'Auto-enabled'],
              [isZh ? 'VAT自动处理' : 'VAT Auto-handled', isZh ? '否(需Stripe Tax)' : 'No (Stripe Tax)', isZh ? '是(200+国家)' : 'Yes (200+ countries)'],
              [isZh ? 'GST自动处理' : 'GST Auto-handled', isZh ? '否' : 'No', isZh ? '是' : 'Yes'],
            ].map(([coverage, stripe, paddle], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{coverage}</td>
                <td style={tdStyle}>{stripe}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{paddle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.taxComplianceTitle}</h2>
      <p style={pStyle}>{ct.taxComplianceIntro}</p>

      <pre style={codeStyle}><code>{`// Tax Compliance Comparison

// STRIPE - You are responsible
// 1. Register for VAT in EU countries when you hit thresholds
// 2. Register for GST in Australia, India, etc.
// 3. Calculate correct tax rates for each jurisdiction
// 4. File tax returns in each country
// 5. Handle tax audits and inquiries

// With Stripe Tax (additional cost):
const taxCalculation = await stripe.tax.calculations.create({
  currency: 'usd',
  line_items: [{ amount: 1000, tax_code: 'txcd_10103000' }],
  customer_details: {
    address: { country: 'DE', postal_code: '10115' }
  }
});
// Returns: tax_amount, but YOU must remit to authorities

// PADDLE - They handle everything
// 1. No registration needed - Paddle is the seller
// 2. Automatic tax calculation for 200+ countries
// 3. Paddle files all tax returns
// 4. Paddle handles audits
// 5. You receive net revenue after tax

// Paddle automatically:
// - Charges correct VAT/GST rate
// - Displays tax-inclusive pricing
// - Generates compliant invoices
// - Remits taxes to authorities`}</code></pre>

      <h2 style={h2Style}>{ct.apiTitle}</h2>
      <p style={pStyle}>{ct.apiIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #635bff' }}>
          <strong style={{ color: '#635bff' }}>Stripe API</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '极其丰富的API，支持高度定制。完整的SDK覆盖(JavaScript, Python, Ruby, Go, PHP等)。丰富的webhook事件，细粒度控制。适合需要深度集成的复杂业务场景。' : 'Extremely rich API with high customization. Full SDK coverage (JavaScript, Python, Ruby, Go, PHP, etc.). Extensive webhook events with fine-grained control. Ideal for complex business scenarios requiring deep integration.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ea4c89' }}>
          <strong style={{ color: '#ea4c89' }}>Paddle API</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '专注于SaaS场景的API。较新的API设计(Paddle Billing 2023)。SDK支持主流语言。更简单但定制性较低。开箱即用的订阅和许可管理。' : 'API focused on SaaS scenarios. Newer API design (Paddle Billing 2023). SDK support for mainstream languages. Simpler but less customizable. Out-of-the-box subscription and license management.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.subscriptionTitle}</h2>
      <p style={pStyle}>{ct.subscriptionIntro}</p>

      <pre style={codeStyle}><code>{`// Subscription Management

// STRIPE - Requires Stripe Billing (extra cost)
const subscription = await stripe.subscriptions.create({
  customer: 'cus_xxx',
  items: [{ price: 'price_xxx' }],
  payment_behavior: 'default_incomplete',
  expand: ['latest_invoice.payment_intent']
});

// Manage upgrades/downgrades yourself
await stripe.subscriptions.update('sub_xxx', {
  items: [{ id: 'si_xxx', price: 'price_new' }],
  proration_behavior: 'create_prorations'
});

// PADDLE - Built-in, no extra cost
const transaction = await paddle.transactions.create({
  items: [{
    price_id: 'pri_xxx',
    quantity: 1
  }],
  custom_data: { user_id: '123' }
});

// Automatic proration and upgrade handling
// Built-in dunning and recovery
// Automatic license key generation`}</code></pre>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #635bff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#635bff' }}>{ct.stripeBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '高交易量(费用差异重要)' : 'High transaction volume'}</li>
            <li>{isZh ? '有税务合规团队/基础设施' : 'Have tax compliance team'}</li>
            <li>{isZh ? '需要深度定制支付流程' : 'Need deep payment customization'}</li>
            <li>{isZh ? '只面向单一市场' : 'Single market focus'}</li>
            <li>{isZh ? '需要复杂计费逻辑' : 'Complex billing logic'}</li>
            <li>{isZh ? '市场平台/多方支付' : 'Marketplace/split payments'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ea4c89' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ea4c89' }}>{ct.paddleBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '面向全球销售的SaaS' : 'Globally-selling SaaS'}</li>
            <li>{isZh ? '小团队，无税务专家' : 'Small teams, no tax experts'}</li>
            <li>{isZh ? '想简化运营复杂度' : 'Want operational simplicity'}</li>
            <li>{isZh ? '销售数字产品/软件' : 'Digital products/software'}</li>
            <li>{isZh ? '快速上线，省心运营' : 'Quick launch, worry-free ops'}</li>
            <li>{isZh ? '需要自动处理VAT/GST' : 'Need automatic VAT/GST'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(99,91,255,0.1), rgba(234,76,137,0.1))', borderRadius: 12, border: '1px solid rgba(99,91,255,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#635bff', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#635bff', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#635bff', textDecoration: 'none' }}>JWT Decoder</a>
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
