import { tools } from '@/lib/tools';

export async function GET() {
  const categories = [
    { name: 'Converters', ids: tools.filter(t => t.category === 'converters').map(t => t.id) },
    { name: 'Generators', ids: tools.filter(t => t.category === 'generators').map(t => t.id) },
    { name: 'Formatters', ids: tools.filter(t => t.category === 'formatters').map(t => t.id) },
    { name: 'Encoders & Decoders', ids: tools.filter(t => t.category === 'encoders').map(t => t.id) },
    { name: 'Web & SEO', ids: tools.filter(t => t.category === 'web').map(t => t.id) },
    { name: 'CSS & Design', ids: tools.filter(t => t.category === 'css').map(t => t.id) },
    { name: 'Calculators', ids: tools.filter(t => t.category === 'calculators').map(t => t.id) },
  ];

  const toolLines = categories
    .filter(c => c.ids.length > 0)
    .map(c => {
      const links = c.ids.map(id => {
        const tool = tools.find(t => t.id === id)!;
        return `- [${tool.name}](https://viadreams.cc/en/tools/${id}): ${tool.description}`;
      }).join('\n');
      return `### ${c.name}\n${links}`;
    }).join('\n\n');

  const content = `# DevToolBox

> DevToolBox (viadreams.cc) is a free, open-source collection of 106+ online developer tools. All tools run entirely in the browser — no server processing, no data collection, no signup required. Available in 15 languages.

DevToolBox provides instant, privacy-first utilities for developers, including JSON formatters, code converters (JSON to TypeScript, Go, Java, Kotlin, Python, Rust, C#, Dart), encoders/decoders (Base64, URL, JWT), generators (UUID, password, QR code, fake data), CSS tools (gradient, box-shadow, flexbox), and SEO utilities (meta tags, schema markup, robots.txt). Every tool works offline in the browser.

## Tools (${tools.length} total)

${toolLines}

## Blog

DevToolBox publishes 106+ in-depth developer guides and tutorials covering tool usage, best practices, and cheat sheets.

- [All Blog Posts](https://viadreams.cc/en/blog)

## Links

- [Homepage](https://viadreams.cc)
- [GitHub](https://github.com/arenasbob2024-cell/devtoolbox)
- [Full Tool & Content Index](https://viadreams.cc/llms-full.txt)
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
