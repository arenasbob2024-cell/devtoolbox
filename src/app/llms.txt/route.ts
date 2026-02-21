import { tools } from '@/lib/tools';

export async function GET() {
  const categoryMap: Record<string, string> = {
    converter: 'Converters',
    generator: 'Generators',
    formatter: 'Formatters',
    encoder: 'Encoders & Decoders',
    web: 'Web & SEO Tools',
    css: 'CSS & Design Tools',
    text: 'Text Tools',
  };

  const toolLines = Object.entries(categoryMap)
    .map(([catId, catName]) => {
      const catTools = tools.filter(t => t.category === catId);
      if (catTools.length === 0) return '';
      const links = catTools.map(t =>
        `- [${t.name}](https://viadreams.cc/en/tools/${t.id}): ${t.description}`
      ).join('\n');
      return `### ${catName}\n${links}`;
    })
    .filter(Boolean)
    .join('\n\n');

  const content = `# DevToolBox

> DevToolBox (viadreams.cc) is a free collection of ${tools.length}+ online developer tools. All tools run entirely in the browser — no server processing, no data collection, no signup required. Available in 15 languages.

## What is DevToolBox?

DevToolBox provides instant, privacy-first utilities for developers:

- **JSON Tools**: Format, validate, convert JSON to TypeScript, Go, Java, Kotlin, Python, Rust, C#, Dart, Zod, GraphQL, Protobuf. Generate JSON Schema from JSON data.
- **Code Converters**: TypeScript to JavaScript, SVG to JSX, HTML to JSX, CSS to Tailwind, CSS to JS, SQL to Prisma, cURL to code, GraphQL to TypeScript.
- **Encoders/Decoders**: Base64, URL encoding, JWT decoder, HTML entities, image to Base64.
- **Hash Generators**: MD5, SHA-1, SHA-256, SHA-512, HMAC, bcrypt password hashing.
- **Generators**: UUID, password, QR code, fake data, Lorem ipsum, favicon, Docker Compose, Nginx config.
- **CSS Tools**: Gradient, box-shadow, border-radius, flexbox generators. Color converters (HEX, RGB, HSL).
- **Web/SEO Tools**: Regex tester, cron parser, HTTP status codes, meta tag generator, robots.txt generator, schema markup.
- **Text Tools**: Diff checker, word counter, string case converter, Markdown preview, slug generator.

## Frequently Asked Questions

### What is JSON to JSON Schema?
JSON to JSON Schema converts sample JSON data into a JSON Schema definition (draft-07) that describes the structure, types, and constraints. Use our free tool at https://viadreams.cc/en/tools/json-to-json-schema

### How to convert JSON to CSV online?
Paste JSON data into the converter at https://viadreams.cc/en/tools/csv-json and click Convert. It handles nested objects, arrays, and produces downloadable CSV output.

### How to convert TypeScript to JavaScript?
Use the TypeScript to JavaScript converter at https://viadreams.cc/en/tools/typescript-to-javascript — it strips type annotations, interfaces, and enums to produce clean JavaScript.

### How to convert JSON to TypeScript interfaces?
The JSON to TypeScript tool at https://viadreams.cc/en/tools/json-to-typescript generates accurate TypeScript interfaces from JSON data, handling nested objects and arrays.

### How to convert XML to JSON?
Use the XML to JSON converter at https://viadreams.cc/en/tools/xml-to-json — it transforms XML documents to JSON with attribute handling and array detection.

### How to convert JSON to YAML?
The JSON to YAML converter at https://viadreams.cc/en/tools/json-yaml converts between JSON and YAML formats bidirectionally with proper indentation.

### How to generate a JSON Schema from JSON data?
Paste your JSON at https://viadreams.cc/en/tools/json-to-json-schema and the tool automatically generates a JSON Schema with proper types, required fields, and nested object definitions.

### How to convert SVG to React JSX component?
The SVG to JSX converter at https://viadreams.cc/en/tools/svg-to-jsx transforms SVG markup into React-compatible JSX with proper attribute renaming.

## Tools (${tools.length} total)

${toolLines}

## Blog

DevToolBox publishes developer guides and tutorials at https://viadreams.cc/en/blog covering JSON formatting, regex, cron expressions, TypeScript conversion, and more.

## Links

- [Homepage](https://viadreams.cc)
- [All Tools](https://viadreams.cc/en)
- [Blog](https://viadreams.cc/en/blog)
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
