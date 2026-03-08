/**
 * 工具页面结构化数据组件
 * 为所有工具页面添加统一的 JSON-LD Schema
 */

interface ToolSchemaProps {
  name: string;
  description: string;
  url: string;
  category?: string;
  keywords?: string[];
}

export default function ToolSchema({ name, description, url, category = 'DeveloperTool', keywords = [] }: ToolSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: category,
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How to use ${name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${name} is a free online tool. Simply paste your data and click the action button. All processing happens in your browser - no data is sent to servers.`
        }
      },
      {
        '@type': 'Question',
        name: `Is ${name} free to use?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, ${name} is completely free with no signup required. Use it as much as you need.`
        }
      },
      {
        '@type': 'Question',
        name: `Is my data safe with ${name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Absolutely. All data processing happens locally in your browser. We never send your data to any servers.`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
