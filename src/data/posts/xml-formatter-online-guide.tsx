'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'XML Formatter: Format and Validate XML Online — Complete Guide',
    description: 'Format, validate, and transform XML. Complete guide with JavaScript DOMParser, Python ElementTree, XPath, XSLT, namespaces, and XML Schema validation.',
  },
  zh: {
    title: 'XML 格式化工具：在线格式化和验证 XML — 完整指南',
    description: 'XML 格式化、验证和转换完整指南。含 JavaScript DOMParser、Python ElementTree、XPath、XSLT 和 XSD 验证示例。',
  },
};

export default function XmlFormatterOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is XML and how does it differ from HTML?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'XML (eXtensible Markup Language) is a markup language designed for storing and transporting data with strict structure rules. Unlike HTML, XML has no predefined tags — you define your own. XML is case-sensitive (Name vs name are different), all attributes must be quoted, and every tag must be properly closed. XML is used for configuration files (Maven pom.xml, Android layouts), data interchange (SOAP, RSS), and document formats (SVG, DOCX, XLSX). HTML is designed for display in browsers while XML is designed for structured data storage and transport.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I format (pretty-print) XML in JavaScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In browsers, use DOMParser to parse the XML string and XMLSerializer to serialize it, then add indentation manually. Example: const parser = new DOMParser(); const doc = parser.parseFromString(xmlString, "application/xml"); const serializer = new XMLSerializer(); const formatted = serializer.serializeToString(doc). For proper indentation, you can use a recursive function that walks the DOM tree adding newlines and spaces. In Node.js, use the fast-xml-parser or xml2js library which have built-in pretty-printing options.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between DTD, XSD (XML Schema), and RELAX NG?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'DTD (Document Type Definition) is the oldest XML validation format — simple but limited, cannot specify data types, and uses its own non-XML syntax. XSD (XML Schema Definition) is the most widely used, written in XML itself, supports data types (string, integer, date), namespaces, and complex validation rules. RELAX NG is more expressive and simpler than XSD, supports both XML and compact notation syntax. For enterprise systems and APIs use XSD. For document-centric XML use RELAX NG. DTD is mainly for legacy compatibility.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do XPath expressions work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'XPath (XML Path Language) is used to navigate XML documents. Key syntax: /root/child selects child elements directly under root. //element selects all elements anywhere in the document. @attribute selects attributes. [predicate] filters elements, e.g., //book[@price > 30] selects books with price over 30. //book[1] selects the first book. text() selects text content. parent::, child::, descendant::, ancestor:: are XPath axes. In JavaScript, use document.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null). In Python lxml, use element.xpath("//book/title/text()").',
        },
      },
      {
        '@type': 'Question',
        name: 'What are XML namespaces and when do I need them?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'XML namespaces prevent element name conflicts when combining XML from different vocabularies. A namespace is declared with xmlns:prefix="URI", e.g., xmlns:html="http://www.w3.org/1999/xhtml". Then elements are prefixed: html:div. The default namespace (xmlns="URI") applies to all unprefixed elements in scope. You need namespaces when mixing XML vocabularies (e.g., XHTML + MathML), working with SOAP (which uses xmlns:soap and xmlns:xsd), or processing SVG files. The namespace URI is just a unique identifier — it does not have to be a real URL.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is CDATA in XML and when should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CDATA (Character Data) sections allow literal text with special characters without escaping. Syntax: <![CDATA[ content with <, >, & ]]>. Inside CDATA, the parser treats everything as raw text, not markup. Use CDATA when embedding code, SQL, HTML, or JavaScript inside XML where escaping many characters would be cumbersome. However, CDATA cannot contain the closing sequence "]]>". For single characters, entity references are simpler: &amp; for &, &lt; for <, &gt; for >, &quot; for ", &apos; for \'.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I process large XML files without loading them into memory?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For large XML files, use streaming (SAX) parsers instead of DOM parsers. SAX (Simple API for XML) processes XML as a stream of events: startElement, endElement, characters, etc. In Python: xml.etree.ElementTree.iterparse() yields events while parsing, allowing you to process and discard elements. In Java: javax.xml.parsers.SAXParserFactory creates a SAX parser. In Node.js: the sax npm package streams parsing events. StAX (pull parsing) in Java lets you control the parsing pace by pulling events on demand. These approaches can handle XML files of any size with constant memory usage.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is XSLT and how does it transform XML?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'XSLT (eXtensible Stylesheet Language Transformations) is a language for transforming XML documents into other XML, HTML, or text formats. An XSLT stylesheet contains templates that match XML nodes and specify their output. Key elements: xsl:template match="/" defines the root template; xsl:value-of select="xpath" outputs element values; xsl:for-each select="xpath" iterates over nodes; xsl:if test="condition" adds conditional output. In browsers, use XSLTProcessor API to apply transformations. XSLT 1.0 is universally supported; XSLT 2.0/3.0 require Saxon processor in Java/Node.js.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Canonical meta */}
      <link rel="canonical" href="https://viadreams.cc/en/blog/xml-formatter-online-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          An <strong>XML formatter</strong> pretty-prints raw XML with proper indentation and validates its structure.
          Use <strong>DOMParser + XMLSerializer</strong> in browsers, <strong>xml.etree.ElementTree</strong> or <strong>lxml</strong> in Python,
          and <strong>fast-xml-parser</strong> in Node.js. Validate XML against an <strong>XSD schema</strong> using lxml in Python or
          JAXB in Java. Query XML with <strong>XPath</strong> and transform it with <strong>XSLT</strong>.
          Try our free{' '}
          <Link href={`/${lang}/tools/xml-formatter`} style={{ color: '#0284c7' }}>online XML formatter</Link> for
          instant formatting and validation, or follow the code examples below.
        </p>
      </div>

      {/* Section 1: What is XML */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        What Is XML? Structure, Elements, Attributes, and Namespaces
      </h2>
      <p>
        <strong>XML (eXtensible Markup Language)</strong> is a W3C standard markup language designed for storing
        and transporting structured data in a human-readable format. Unlike HTML, XML has no predefined tags —
        you define your own vocabulary to describe your data. XML separates data from presentation, making
        it ideal for data interchange between systems.
      </p>
      <p>A well-formed XML document has this fundamental structure:</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<?xml version="1.0" encoding="UTF-8"?>
<!-- XML declaration specifies version and character encoding -->
<library xmlns="http://example.com/library"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://example.com/library library.xsd">

  <book id="978-0-13-110362-7" category="programming">
    <title lang="en">The C Programming Language</title>
    <authors>
      <author>Brian W. Kernighan</author>
      <author>Dennis M. Ritchie</author>
    </authors>
    <price currency="USD">45.99</price>
    <description><![CDATA[
      Classic reference for the C language.
      Contains <examples> and & special chars.
    ]]></description>
    <tags>
      <tag>c</tag>
      <tag>programming</tag>
      <tag>systems</tag>
    </tags>
  </book>

</library>`}</code></pre>
      <p>Key XML concepts:</p>
      <ul>
        <li><strong>Elements</strong>: The basic building blocks — <code>&lt;element&gt;content&lt;/element&gt;</code>. Every element must have a closing tag or be self-closing: <code>&lt;br/&gt;</code>.</li>
        <li><strong>Attributes</strong>: Name-value pairs inside the opening tag. Values must always be quoted: <code>id=&quot;123&quot;</code> or <code>id=&apos;123&apos;</code>.</li>
        <li><strong>Root element</strong>: Every XML document must have exactly one root element that contains all others.</li>
        <li><strong>CDATA sections</strong>: <code>&lt;![CDATA[ ... ]]&gt;</code> allows embedding raw text with special characters without escaping.</li>
        <li><strong>Namespaces</strong>: <code>xmlns:prefix=&quot;URI&quot;</code> declarations prevent naming conflicts when combining XML vocabularies.</li>
        <li><strong>Processing instructions</strong>: <code>&lt;?xml-stylesheet type=&quot;text/xsl&quot; href=&quot;style.xsl&quot;?&gt;</code> provide metadata to applications.</li>
        <li><strong>Comments</strong>: <code>&lt;!-- comment --&gt;</code> — cannot contain double hyphens inside.</li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        XML vs HTML — Key Differences
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Feature</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>XML</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>HTML</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Purpose</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Store and transport data</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Display data in browsers</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Tags</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>User-defined (any name)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Predefined (div, p, span...)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Case sensitivity</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Case-sensitive (Name ≠ name)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Case-insensitive</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Closing tags</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Mandatory for all elements</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Optional for some (br, img)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Attribute values</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Must always be quoted</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Quotes optional in HTML5</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Error handling</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Fatal error on any malformed XML</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Lenient — browsers auto-correct</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>White space</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Preserved (significant)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Collapsed by browsers</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 2: XML Formatting and Pretty-Printing */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        XML Formatting and Pretty-Printing — Why Indentation Matters
      </h2>
      <p>
        Parsers treat whitespace between elements as either <strong>insignificant</strong> (in element-only content) or{' '}
        <strong>significant</strong> (in mixed content). For data-centric XML (like configuration files), whitespace
        between elements is insignificant and can be freely added for readability.
      </p>
      <p>
        Minified XML is valid but hard to read. Pretty-printed XML uses consistent indentation (2 or 4 spaces per level).
        The <code>xml:space=&quot;preserve&quot;</code> attribute signals that whitespace in that element should be preserved:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- Minified XML — valid but unreadable -->
<root><person id="1"><name>Alice</name><age>30</age></person></root>

<!-- Pretty-printed XML — same data, readable -->
<root>
  <person id="1">
    <name>Alice</name>
    <age>30</age>
  </person>
</root>

<!-- xml:space="preserve" preserves whitespace in pre-like content -->
<code xml:space="preserve">
  function hello() {
    return "world";
  }
</code>`}</code></pre>

      {/* Section 3: JavaScript DOMParser (Browser) */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JavaScript — DOMParser and XMLSerializer (Browser)
      </h2>
      <p>
        The browser provides <code>DOMParser</code> to parse XML strings into DOM documents and{' '}
        <code>XMLSerializer</code> to serialize DOM back to strings. For pretty-printing, you must implement
        indentation manually since browsers do not format XML by default.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Parse XML string in browser
function parseXml(xmlString: string): Document | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'application/xml');

  // Check for parse errors
  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    console.error('XML parse error:', parseError.textContent);
    return null;
  }
  return doc;
}

// Serialize DOM document back to string
function serializeXml(doc: Document): string {
  const serializer = new XMLSerializer();
  return serializer.serializeToString(doc);
}

// Pretty-print XML with indentation
function prettyPrintXml(xmlString: string, indent = '  '): string {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

  // Check for parse errors
  const error = xmlDoc.querySelector('parsererror');
  if (error) throw new Error('Invalid XML: ' + error.textContent);

  return formatNode(xmlDoc.documentElement, 0, indent);
}

function formatNode(node: Element, depth: number, indent: string): string {
  const pad = indent.repeat(depth);
  const childPad = indent.repeat(depth + 1);

  // Build opening tag with attributes
  let result = pad + '<' + node.nodeName;
  for (const attr of Array.from(node.attributes)) {
    result += \` \${attr.name}="\${attr.value}"\`;
  }

  const children = Array.from(node.childNodes).filter(
    n => n.nodeType === Node.ELEMENT_NODE ||
         (n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
  );

  if (children.length === 0) {
    result += '/>';
    return result;
  }

  result += '>';

  const hasElementChildren = children.some(n => n.nodeType === Node.ELEMENT_NODE);

  if (hasElementChildren) {
    result += '\\n';
    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        result += formatNode(child as Element, depth + 1, indent) + '\\n';
      } else if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent?.trim();
        if (text) result += childPad + text + '\\n';
      }
    }
    result += pad + '</' + node.nodeName + '>';
  } else {
    // Inline text content
    const text = node.textContent?.trim() || '';
    result += text + '</' + node.nodeName + '>';
  }

  return result;
}

// Usage
const xml = '<root><person id="1"><name>Alice</name><age>30</age></person></root>';
console.log(prettyPrintXml(xml));
/*
<root>
  <person id="1">
    <name>Alice</name>
    <age>30</age>
  </person>
</root>
*/

// Extract data from XML
function getPersonNames(xmlString: string): string[] {
  const doc = parseXml(xmlString);
  if (!doc) return [];
  return Array.from(doc.querySelectorAll('name')).map(el => el.textContent || '');
}

// Check if XML is well-formed
function isValidXml(xmlString: string): boolean {
  const doc = parseXml(xmlString);
  return doc !== null;
}`}</code></pre>

      {/* Section 4: Node.js xml2js and fast-xml-parser */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Node.js — xml2js and fast-xml-parser
      </h2>
      <p>
        Node.js does not include a native XML parser, so you need npm packages.{' '}
        <strong>fast-xml-parser</strong> is the fastest option with zero dependencies.{' '}
        <strong>xml2js</strong> is older but very widely used. Both convert XML to JavaScript objects and back.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Install
npm install fast-xml-parser
npm install xml2js  # alternative`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// fast-xml-parser — recommended for performance
import { XMLParser, XMLBuilder, XMLValidator } from 'fast-xml-parser';

const xmlString = \`<?xml version="1.0" encoding="UTF-8"?>
<library>
  <book id="1">
    <title>Clean Code</title>
    <author>Robert C. Martin</author>
    <price>39.99</price>
  </book>
  <book id="2">
    <title>The Pragmatic Programmer</title>
    <author>Andrew Hunt</author>
    <price>44.99</price>
  </book>
</library>\`;

// Parse XML to JavaScript object
const parser = new XMLParser({
  ignoreAttributes: false,     // include XML attributes
  attributeNamePrefix: '@_',   // prefix attribute keys with @_
  parseAttributeValue: true,   // parse attribute values as numbers/booleans
});
const result = parser.parse(xmlString);
console.log(result.library.book);
// => [{ '@_id': 1, title: 'Clean Code', author: 'Robert C. Martin', price: 39.99 }, ...]

// Validate XML before parsing
const validationResult = XMLValidator.validate(xmlString);
if (validationResult !== true) {
  console.error('XML validation error:', validationResult.err);
}

// Build XML from JavaScript object
const builder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  format: true,              // pretty-print with indentation
  indentBy: '  ',            // 2-space indent
  suppressEmptyNode: true,   // <empty/> instead of <empty></empty>
});
const jsObject = {
  library: {
    book: [
      { '@_id': 1, title: 'Refactoring', author: 'Martin Fowler', price: 49.99 },
      { '@_id': 2, title: 'SICP', author: 'Harold Abelson', price: 39.99 },
    ]
  }
};
const newXml = builder.build(jsObject);
console.log(newXml);

// xml2js — alternative with promise-based API
import { parseStringPromise, Builder } from 'xml2js';

const parsed = await parseStringPromise(xmlString, {
  explicitArray: false,  // don't wrap single elements in arrays
  mergeAttrs: true,      // merge attributes into the element object
  trim: true,
});
console.log(parsed.library.book);

// Build XML from object with xml2js
const xmlBuilder = new Builder({
  renderOpts: { pretty: true, indent: '  ' },
  xmldec: { version: '1.0', encoding: 'UTF-8' },
});
const xmlOutput = xmlBuilder.buildObject({ library: { book: [/* ... */] } });`}</code></pre>

      {/* Section 5: Python — xml.etree.ElementTree */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python — xml.etree.ElementTree and minidom
      </h2>
      <p>
        Python&apos;s standard library includes <code>xml.etree.ElementTree</code> (fast, minimal) and{' '}
        <code>xml.dom.minidom</code> (DOM-based, better for pretty-printing). Python 3.9+ added the{' '}
        <code>indent()</code> function to ElementTree for easy pretty-printing.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import xml.etree.ElementTree as ET
from xml.dom import minidom

xml_string = """<?xml version="1.0" encoding="UTF-8"?>
<library>
  <book id="1">
    <title>Clean Code</title>
    <author>Robert C. Martin</author>
    <price currency="USD">39.99</price>
  </book>
</library>"""

# Parse XML
tree = ET.parse('library.xml')  # from file
root = ET.fromstring(xml_string)  # from string

# Access elements
for book in root.findall('book'):
    title = book.find('title').text
    author = book.find('author').text
    price = book.find('price').text
    currency = book.find('price').get('currency', 'USD')
    book_id = book.get('id')
    print(f"Book {book_id}: {title} by {author} ({currency} {price})")

# Find all titles using findall with path
titles = [el.text for el in root.findall('./book/title')]

# Iterate all elements recursively
for element in root.iter():
    print(f"Tag: {element.tag}, Text: {element.text}")

# Modify XML
for book in root.findall('book'):
    price_el = book.find('price')
    if price_el is not None:
        old_price = float(price_el.text)
        price_el.text = str(round(old_price * 1.1, 2))  # 10% increase

# Pretty-print with Python 3.9+ indent() function
ET.indent(root, space='  ')
print(ET.tostring(root, encoding='unicode'))

# Pretty-print with minidom (works in older Python)
def pretty_print_xml(xml_string: str) -> str:
    parsed = minidom.parseString(xml_string)
    return parsed.toprettyxml(indent='  ', encoding=None)

pretty = pretty_print_xml(xml_string)
print(pretty)

# Create new XML from scratch
root = ET.Element('library')
root.set('xmlns', 'http://example.com/library')

book = ET.SubElement(root, 'book')
book.set('id', '1')

title = ET.SubElement(book, 'title')
title.text = 'The Pragmatic Programmer'

author = ET.SubElement(book, 'author')
author.text = 'Andrew Hunt'

# Serialize to string
ET.indent(root, space='  ')
xml_output = ET.tostring(root, encoding='unicode', xml_declaration=True)

# Write to file
tree = ET.ElementTree(root)
ET.indent(tree, space='  ')
tree.write('output.xml', encoding='utf-8', xml_declaration=True)`}</code></pre>

      {/* Section 6: Python lxml library */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python — lxml Library (XPath, XSD Validation, XSLT)
      </h2>
      <p>
        <code>lxml</code> is the most powerful Python XML library, built on libxml2 and libxslt. It supports
        full XPath 1.0, XSD/RELAX NG validation, XSLT transformations, and has much better performance than
        the standard library. Install with <code>pip install lxml</code>.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`from lxml import etree
import requests

xml_string = b"""<?xml version="1.0" encoding="UTF-8"?>
<library xmlns="http://example.com/library">
  <book id="1" price="39.99">
    <title>Clean Code</title>
    <author>Robert C. Martin</author>
  </book>
  <book id="2" price="29.99">
    <title>The Pragmatic Programmer</title>
    <author>Andrew Hunt</author>
  </book>
</library>"""

# Parse XML
root = etree.fromstring(xml_string)
# or from file: root = etree.parse('file.xml').getroot()

# Pretty-print
pretty = etree.tostring(root, pretty_print=True, encoding='unicode')
print(pretty)

# XPath queries — powerful element selection
ns = {'lib': 'http://example.com/library'}

# Get all book titles
titles = root.xpath('//lib:book/lib:title/text()', namespaces=ns)
print(titles)  # => ['Clean Code', 'The Pragmatic Programmer']

# Get books with price under 35
cheap_books = root.xpath('//lib:book[@price < 35]', namespaces=ns)
for book in cheap_books:
    print(book.xpath('lib:title/text()', namespaces=ns))

# Get the first book
first_book = root.xpath('//lib:book[1]', namespaces=ns)

# XSD Schema validation
xsd_string = b"""<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
                   targetNamespace="http://example.com/library"
                   xmlns="http://example.com/library">
  <xs:element name="library">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="book" maxOccurs="unbounded">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="title" type="xs:string"/>
              <xs:element name="author" type="xs:string"/>
            </xs:sequence>
            <xs:attribute name="id" type="xs:integer" use="required"/>
            <xs:attribute name="price" type="xs:decimal" use="required"/>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>"""

xsd_doc = etree.fromstring(xsd_string)
schema = etree.XMLSchema(xsd_doc)

# Validate XML against schema
if schema.validate(root):
    print("XML is valid!")
else:
    for error in schema.error_log:
        print(f"Validation error: {error.message} (line {error.line})")

# XSLT transformation
xslt_string = b"""<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:lib="http://example.com/library">
  <xsl:template match="/">
    <html>
      <body>
        <table border="1">
          <tr><th>ID</th><th>Title</th><th>Author</th></tr>
          <xsl:for-each select="//lib:book">
            <tr>
              <td><xsl:value-of select="@id"/></td>
              <td><xsl:value-of select="lib:title"/></td>
              <td><xsl:value-of select="lib:author"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>"""

xslt_doc = etree.fromstring(xslt_string)
transform = etree.XSLT(xslt_doc)
result_tree = transform(root)
print(str(result_tree))`}</code></pre>

      {/* Section 7: XML Validation */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        XML Validation — DTD vs XSD vs RELAX NG
      </h2>
      <p>
        XML validation checks that a document conforms to a defined structure beyond just being
        well-formed. There are three major schema languages:
      </p>
      <ul>
        <li>
          <strong>DTD (Document Type Definition)</strong>: The original XML schema format. Simple syntax,
          supports elements and attributes but not data types. Cannot validate that an element contains
          a number vs string. Used in legacy XML, XHTML, and HTML5 doctype declarations.
        </li>
        <li>
          <strong>XSD (XML Schema Definition)</strong>: The W3C standard, written in XML itself.
          Supports 44 built-in data types (string, integer, date, boolean, etc.), namespaces, inheritance,
          regular expression patterns for value constraints. Industry standard for SOAP, enterprise XML.
        </li>
        <li>
          <strong>RELAX NG</strong>: More expressive than XSD, simpler to write. Available in XML syntax
          and compact notation. Does not support data type facets like minInclusive directly. Used in
          document-centric XML, OpenDocument Format, EPUB.
        </li>
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- DTD (Document Type Definition) — inline or external -->
<!DOCTYPE library [
  <!ELEMENT library (book+)>
  <!ELEMENT book (title, author, price)>
  <!ATTLIST book
    id    ID       #REQUIRED
    category CDATA #IMPLIED>
  <!ELEMENT title  (#PCDATA)>
  <!ELEMENT author (#PCDATA)>
  <!ELEMENT price  (#PCDATA)>
]>
<library>
  <book id="b1">
    <title>Clean Code</title>
    <author>Robert C. Martin</author>
    <price>39.99</price>
  </book>
</library>

<!-- XSD Schema — external file (library.xsd) -->
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="library">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="book" type="BookType"
                    minOccurs="1" maxOccurs="unbounded"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <xs:complexType name="BookType">
    <xs:sequence>
      <xs:element name="title" type="xs:string"/>
      <xs:element name="author" type="xs:string" maxOccurs="5"/>
      <xs:element name="price">
        <xs:simpleType>
          <xs:restriction base="xs:decimal">
            <xs:minInclusive value="0"/>
            <xs:maxInclusive value="9999.99"/>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
      <xs:element name="isbn" minOccurs="0">
        <xs:simpleType>
          <xs:restriction base="xs:string">
            <!-- ISBN-13 pattern: 978-x-xxx-xxxxx-x -->
            <xs:pattern value="\\d{3}-\\d-\\d{3}-\\d{5}-\\d"/>
          </xs:restriction>
        </xs:simpleType>
      </xs:element>
    </xs:sequence>
    <xs:attribute name="id" type="xs:positiveInteger" use="required"/>
    <xs:attribute name="category">
      <xs:simpleType>
        <xs:restriction base="xs:string">
          <xs:enumeration value="programming"/>
          <xs:enumeration value="science"/>
          <xs:enumeration value="fiction"/>
        </xs:restriction>
      </xs:simpleType>
    </xs:attribute>
  </xs:complexType>

</xs:schema>`}</code></pre>

      {/* Section 8: XPath */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        XPath — Querying XML Documents
      </h2>
      <p>
        <strong>XPath (XML Path Language)</strong> is a query language for selecting nodes from an XML document.
        It uses a path expression syntax similar to filesystem paths, plus predicates for filtering.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- Sample XML for XPath examples -->
<bookstore>
  <book category="programming" lang="en">
    <title>Clean Code</title>
    <author>Robert C. Martin</author>
    <price>39.99</price>
    <year>2008</year>
  </book>
  <book category="programming" lang="en">
    <title>SICP</title>
    <author>Harold Abelson</author>
    <price>29.99</price>
    <year>1996</year>
  </book>
  <book category="science" lang="en">
    <title>A Brief History of Time</title>
    <author>Stephen Hawking</author>
    <price>14.99</price>
    <year>1988</year>
  </book>
</bookstore>

XPath Expression Reference:
/bookstore              — root element bookstore
//book                  — all book elements anywhere
/bookstore/book[1]      — first book child of bookstore
/bookstore/book[last()] — last book
//book/@category        — category attribute of all books
//book[@category]       — books that have a category attribute
//book[@category='programming'] — programming books only
//book[price > 20]      — books more expensive than 20
//book[price > 20 and @category='programming'] — combined predicate
//title/text()          — text content of all titles
//book[contains(title, 'Code')] — books whose title contains "Code"
//book[starts-with(title, 'Clean')] — books starting with "Clean"
count(//book)           — count of all books
sum(//price)            — sum of all prices
//book[year < 2000]/title — titles of books before 2000`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// XPath in JavaScript (browser) — XPathEvaluator API
function xpath(expression: string, doc: Document): string[] {
  const result = doc.evaluate(
    expression,
    doc,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  const nodes: string[] = [];
  for (let i = 0; i < result.snapshotLength; i++) {
    nodes.push(result.snapshotItem(i)?.textContent || '');
  }
  return nodes;
}

// Usage
const doc = new DOMParser().parseFromString(xmlString, 'application/xml');
const titles = xpath('//title/text()', doc);
// => ['Clean Code', 'SICP', 'A Brief History of Time']

const expensiveBooks = xpath('//book[price > 20]/title/text()', doc);
// => ['Clean Code', 'SICP']

// String value XPath result
function xpathString(expression: string, doc: Document): string {
  const result = doc.evaluate(expression, doc, null, XPathResult.STRING_TYPE, null);
  return result.stringValue;
}

const firstTitle = xpathString('//book[1]/title', doc);
// => 'Clean Code'`}</code></pre>

      {/* Section 9: XSLT Transformation */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        XSLT — Transforming XML to HTML, Text, or Other XML
      </h2>
      <p>
        <strong>XSLT (eXtensible Stylesheet Language Transformations)</strong> transforms XML documents
        into another format using template-based rules. An XSLT processor applies the stylesheet to the
        source XML and produces output. XSLT 1.0 is universally supported in browsers; XSLT 2.0/3.0
        require the Saxon library.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- XSLT 1.0 stylesheet — books XML to HTML table -->
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!-- Root template — matches the document root -->
  <xsl:template match="/">
    <html>
      <head>
        <title>Book Catalog</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background: #f4f4f4; }
        </style>
      </head>
      <body>
        <h1>Book Catalog</h1>
        <table>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Year</th>
          </tr>
          <!-- For each book element, create a table row -->
          <xsl:for-each select="bookstore/book">
            <!-- Sort by price descending -->
            <xsl:sort select="price" data-type="number" order="descending"/>
            <tr>
              <td><xsl:value-of select="title"/></td>
              <td><xsl:value-of select="author"/></td>
              <td>$<xsl:value-of select="price"/></td>
              <td><xsl:value-of select="year"/></td>
            </tr>
          </xsl:for-each>
        </table>
        <!-- Conditional output -->
        <p>
          Total books: <xsl:value-of select="count(bookstore/book)"/>
        </p>
        <xsl:if test="count(bookstore/book) > 5">
          <p>Large catalog!</p>
        </xsl:if>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Apply XSLT in browser using XSLTProcessor API
async function transformXml(xmlString: string, xsltString: string): Promise<string> {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
  const xsltDoc = parser.parseFromString(xsltString, 'application/xml');

  const xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsltDoc);

  // Apply transformation
  const resultDoc = xsltProcessor.transformToDocument(xmlDoc);
  const serializer = new XMLSerializer();
  return serializer.serializeToString(resultDoc);
}

// Usage
const htmlOutput = await transformXml(booksXml, xsltStylesheet);
document.getElementById('output')!.innerHTML = htmlOutput;`}</code></pre>

      {/* Section 10: Namespaces */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        XML Namespaces — Avoiding Name Conflicts
      </h2>
      <p>
        XML namespaces allow elements from different vocabularies to coexist in the same document without
        name collisions. A namespace is declared with <code>xmlns</code> or <code>xmlns:prefix</code>
        attributes, associating a URI with elements in scope.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<?xml version="1.0" encoding="UTF-8"?>
<!-- Multiple namespaces in one document -->
<root
  xmlns="http://default.example.com"           <!-- default namespace -->
  xmlns:book="http://books.example.com"
  xmlns:price="http://pricing.example.com"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Uses default namespace -->
  <title>Book Catalog</title>

  <!-- Uses book: namespace prefix -->
  <book:catalog version="2.0">
    <book:item book:id="1">
      <book:title>Clean Code</book:title>
      <!-- Mixed namespaces in one element tree -->
      <price:cost price:currency="USD">39.99</price:cost>
    </book:item>
  </book:catalog>

  <!-- Embedded XHTML with its own namespace -->
  <description>
    <xhtml:p>This is a <xhtml:strong>great</xhtml:strong> book.</xhtml:p>
  </description>

</root>

<!-- Real-world: SOAP envelope uses multiple namespaces -->
<soap:Envelope
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Header/>
  <soap:Body>
    <GetStockPrice xmlns="http://myservice.example.com/">
      <StockName>IBM</StockName>
    </GetStockPrice>
  </soap:Body>
</soap:Envelope>`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Handling namespaces in JavaScript
const xmlWithNs = \`<lib:library xmlns:lib="http://books.example.com">
  <lib:book lib:id="1">
    <lib:title>Clean Code</lib:title>
  </lib:book>
</lib:library>\`;

const parser = new DOMParser();
const doc = parser.parseFromString(xmlWithNs, 'application/xml');

// Use getElementsByTagNameNS for namespace-aware queries
const books = doc.getElementsByTagNameNS('http://books.example.com', 'book');
console.log(books.length);  // => 1

// getAttribute needs namespace for namespaced attributes
const book = books[0];
const id = book.getAttributeNS('http://books.example.com', 'id');
console.log(id);  // => '1'

// XPathEvaluator with namespace resolver
const nsResolver = {
  lookupNamespaceURI: (prefix: string | null) => {
    if (prefix === 'lib') return 'http://books.example.com';
    return null;
  }
};
const result = doc.evaluate(
  '//lib:book/lib:title',
  doc,
  nsResolver as XPathNSResolver,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null
);`}</code></pre>

      {/* Section 11: CDATA Sections */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CDATA Sections — Embedding Special Characters
      </h2>
      <p>
        CDATA sections let you include text that contains XML special characters (<code>&lt;</code>, <code>&gt;</code>,
        <code>&amp;</code>) without escaping them. The parser treats the entire CDATA block as raw character data.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- CDATA vs entity references — choose based on amount of special chars -->

<!-- Without CDATA — requires escaping every special character -->
<code>
  if (x &lt; 10 &amp;&amp; y &gt; 0) {
    document.write(&quot;Hello &amp; World&quot;);
  }
</code>

<!-- With CDATA — no escaping needed, much more readable -->
<code><![CDATA[
  if (x < 10 && y > 0) {
    document.write("Hello & World");
  }
]]></code>

<!-- CDATA is commonly used for: -->
<!-- 1. Embedding script code in XML-based formats -->
<script type="text/javascript">
<![CDATA[
  function validate() {
    var re = /^[a-z]+$/i;
    return re.test(document.getElementById('name').value);
  }
]]>
</script>

<!-- 2. Embedding SQL in configuration XML -->
<query><![CDATA[
  SELECT * FROM users
  WHERE name LIKE '%O''Brien%'
  AND age > 21 AND age < 65;
]]></query>

<!-- 3. Embedding HTML content in XML -->
<description><![CDATA[
  <p>Learn <strong>XML formatting</strong> &amp; validation.</p>
  <ul>
    <li>Parse XML</li>
    <li>Validate with XSD</li>
  </ul>
]]></description>

<!-- CDATA cannot contain ]]> (the closing sequence) -->
<!-- Workaround: split into two CDATA sections -->
<text><![CDATA[First part ]]]]><![CDATA[> second part]]></text>

<!-- XML Entity References for single special characters -->
<!-- &amp;  = &    (ampersand)                          -->
<!-- &lt;   = <    (less than)                          -->
<!-- &gt;   = >    (greater than)                       -->
<!-- &quot; = "    (double quote)                        -->
<!-- &apos; = '    (single quote / apostrophe)           -->`}</code></pre>

      {/* Section 12: XML vs JSON */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        XML vs JSON — Comparison Table and When to Use Each
      </h2>
      <p>
        Both XML and JSON are widely used for data interchange, but they have different strengths.
        JSON dominates modern REST APIs while XML remains essential for SOAP, RSS, SVG, and document formats.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Feature</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>XML</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>JSON</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Verbosity</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>More verbose (closing tags)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Compact, less overhead</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Parsing speed</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Slower (more complex)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Faster (JSON.parse)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Schema support</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>DTD, XSD, RELAX NG (mature)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>JSON Schema (less mature)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Attributes</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Elements + attributes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Keys and values only</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Comments</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Supported</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Not supported</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Namespaces</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Full namespace support</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No native namespaces</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Query language</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>XPath, XQuery</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>JSONPath, jq</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Transform</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>XSLT</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>jq, JavaScript</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Binary data</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Base64 or CDATA</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Base64 string</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><strong>Use cases</strong></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>SOAP, RSS, SVG, Office formats, config</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>REST APIs, web storage, config</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Choose XML when</strong>: working with SOAP/WSDL web services, generating or parsing RSS/Atom feeds,
        working with SVG graphics, processing Microsoft Office Open XML (.docx, .xlsx), or building Android UI layouts.
        <strong> Choose JSON when</strong>: building REST APIs, storing data in NoSQL databases, sending data between
        frontend and backend, or working with modern JavaScript frameworks.
      </p>

      {/* Section 13: Common XML Errors and Fixes */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Common XML Errors and How to Fix Them
      </h2>
      <p>
        XML parsers are strict — any well-formedness violation is a fatal error. Here are the most common
        XML errors and how to fix them:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- ERROR 1: Unclosed tags -->
<!-- Invalid -->
<root>
  <name>Alice
  <age>30</age>
</root>
<!-- Fixed -->
<root>
  <name>Alice</name>
  <age>30</age>
</root>

<!-- ERROR 2: Tags not properly nested (overlapping) -->
<!-- Invalid -->
<bold><italic>text</bold></italic>
<!-- Fixed -->
<bold><italic>text</italic></bold>

<!-- ERROR 3: Unquoted attribute values -->
<!-- Invalid -->
<book id=1 category=programming>
<!-- Fixed -->
<book id="1" category="programming">

<!-- ERROR 4: Unescaped special characters in text content -->
<!-- Invalid — ampersand must be escaped -->
<title>Kernighan & Ritchie</title>
<!-- Fixed -->
<title>Kernighan &amp; Ritchie</title>
<!-- Or use CDATA -->
<title><![CDATA[Kernighan & Ritchie]]></title>

<!-- ERROR 5: Unescaped angle brackets in attribute values -->
<!-- Invalid -->
<filter condition="price < 50">
<!-- Fixed -->
<filter condition="price &lt; 50">

<!-- ERROR 6: Invalid characters in element names -->
<!-- Invalid — element names cannot start with a number or contain spaces -->
<1st-book>, <book name>, <book@store>
<!-- Fixed -->
<first-book>, <book-name>, <book-store>

<!-- ERROR 7: Missing XML declaration encoding when using non-ASCII -->
<!-- Can cause issues with non-UTF-8 files -->
<!-- Add encoding declaration -->
<?xml version="1.0" encoding="UTF-8"?>

<!-- ERROR 8: Byte Order Mark (BOM) issues -->
<!-- Some editors add UTF-8 BOM (EF BB BF) before XML declaration -->
<!-- This breaks many parsers — save without BOM -->
<!-- In vim: :set nobomb | :w -->
<!-- In Python: use 'utf-8-sig' codec for BOM-aware reading -->

import xml.etree.ElementTree as ET
# Remove BOM if present
with open('file.xml', 'r', encoding='utf-8-sig') as f:
    content = f.read()
root = ET.fromstring(content)

<!-- ERROR 9: Duplicate attribute names -->
<!-- Invalid — attributes must be unique within an element -->
<book id="1" id="2">
<!-- Fixed — use different attribute names or child elements -->
<book primary-id="1" alternate-id="2">

<!-- ERROR 10: Multiple root elements -->
<!-- Invalid -->
<root1></root1>
<root2></root2>
<!-- Fixed — wrap in a single root -->
<root>
  <root1></root1>
  <root2></root2>
</root>`}</code></pre>

      {/* Section 14: Large XML Streaming */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Large XML Streaming — SAX Parsers and iterparse
      </h2>
      <p>
        DOM parsers load the entire XML document into memory as a tree structure. For large XML files
        (hundreds of MB or GB), this is impractical. <strong>SAX (Simple API for XML)</strong> and
        streaming parsers process XML as a sequence of events without loading the whole document.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Python — ElementTree iterparse (streaming, memory-efficient)
import xml.etree.ElementTree as ET

def count_books_streaming(filepath: str) -> int:
    """Process a large XML file with millions of books"""
    count = 0

    # iterparse yields (event, element) tuples
    for event, element in ET.iterparse(filepath, events=('start', 'end')):
        if event == 'end' and element.tag == 'book':
            count += 1
            # CRITICAL: Clear the element to free memory
            element.clear()

    return count

# Extract data from large XML with iterparse
def extract_books(filepath: str, max_price: float) -> list[dict]:
    books = []
    current_book = {}

    for event, element in ET.iterparse(filepath, events=('start', 'end')):
        if event == 'start':
            if element.tag == 'book':
                current_book = {'id': element.get('id')}

        elif event == 'end':
            if element.tag == 'title':
                current_book['title'] = element.text
            elif element.tag == 'price':
                current_book['price'] = float(element.text or 0)
            elif element.tag == 'book':
                if current_book.get('price', 0) <= max_price:
                    books.append(current_book.copy())
                element.clear()  # Free memory

    return books

# SAX Parser in Python — even more memory efficient
import xml.sax
import xml.sax.handler

class BookHandler(xml.sax.handler.ContentHandler):
    def __init__(self):
        self.books = []
        self.current_book = {}
        self.current_element = ''
        self.current_text = ''

    def startElement(self, name, attrs):
        self.current_element = name
        self.current_text = ''
        if name == 'book':
            self.current_book = {'id': attrs.get('id', '')}

    def characters(self, content):
        self.current_text += content

    def endElement(self, name):
        if name in ('title', 'author', 'price'):
            self.current_book[name] = self.current_text.strip()
        elif name == 'book':
            self.books.append(self.current_book.copy())
            self.current_book = {}

handler = BookHandler()
xml.sax.parse('large_library.xml', handler)
print(f"Parsed {len(handler.books)} books")`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Node.js SAX streaming with 'sax' package
// npm install sax @types/sax

import sax from 'sax';
import { createReadStream } from 'fs';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
}

function streamParseBooks(filePath: string): Promise<Book[]> {
  return new Promise((resolve, reject) => {
    const books: Book[] = [];
    let currentBook: Partial<Book> = {};
    let currentElement = '';
    let currentText = '';

    const parser = sax.createStream(true, { lowercase: false });

    parser.on('opentag', (node) => {
      currentElement = node.name;
      currentText = '';
      if (node.name === 'book') {
        currentBook = { id: node.attributes['id'] as string };
      }
    });

    parser.on('text', (text) => {
      currentText += text;
    });

    parser.on('closetag', (tagName) => {
      const text = currentText.trim();
      if (tagName === 'title') currentBook.title = text;
      else if (tagName === 'author') currentBook.author = text;
      else if (tagName === 'price') currentBook.price = parseFloat(text);
      else if (tagName === 'book') {
        books.push(currentBook as Book);
        currentBook = {};
      }
      currentText = '';
    });

    parser.on('error', reject);
    parser.on('end', () => resolve(books));

    createReadStream(filePath).pipe(parser);
  });
}

// Usage
const books = await streamParseBooks('library.xml');
console.log(\`Parsed \${books.length} books from large file\`);`}</code></pre>

      {/* Section 15: Real-World XML Formats */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Real-World XML Formats — RSS, SOAP, Maven, Android, Office
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        RSS 2.0 Feed
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Dev Blog</title>
    <link>https://example.com</link>
    <description>Latest developer articles</description>
    <language>en-us</language>
    <lastBuildDate>Thu, 27 Feb 2026 00:00:00 +0000</lastBuildDate>
    <atom:link href="https://example.com/rss.xml" rel="self" type="application/rss+xml"/>

    <item>
      <title>XML Formatting Guide 2026</title>
      <link>https://example.com/xml-guide</link>
      <description><![CDATA[Complete guide to XML formatting and validation.]]></description>
      <pubDate>Thu, 27 Feb 2026 12:00:00 +0000</pubDate>
      <guid isPermaLink="true">https://example.com/xml-guide</guid>
      <category>XML</category>
    </item>
  </channel>
</rss>`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Maven pom.xml
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                             http://maven.apache.org/xsd/maven-4.0.0.xsd">

  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0.0</version>
  <packaging>jar</packaging>

  <properties>
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
    <spring.boot.version>3.3.0</spring.boot.version>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
      <version>\${spring.boot.version}</version>
    </dependency>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.13.2</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>

</project>`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Android Layout XML (res/layout/activity_main.xml)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
  xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:app="http://schemas.android.com/apk/res-auto"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:orientation="vertical"
  android:padding="16dp">

  <TextView
    android:id="@+id/title"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/app_title"
    android:textSize="24sp"
    android:textStyle="bold"/>

  <EditText
    android:id="@+id/input"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="@string/enter_text"
    android:inputType="text"/>

  <Button
    android:id="@+id/submit"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/submit"
    app:backgroundTint="@color/primary"/>

</LinearLayout>`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        SOAP Request and Response
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- SOAP 1.1 Request -->
POST /StockPrice HTTP/1.1
Host: www.example.com
Content-Type: text/xml; charset=utf-8
SOAPAction: "GetStockPrice"

<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:m="http://www.example.com/stock/">
  <soap:Header>
    <m:AuthToken>Bearer eyJhbGciOiJSUzI1NiJ9...</m:AuthToken>
  </soap:Header>
  <soap:Body>
    <m:GetStockPrice>
      <m:StockName>IBM</m:StockName>
      <m:Currency>USD</m:Currency>
    </m:GetStockPrice>
  </soap:Body>
</soap:Envelope>

<!-- SOAP Response -->
<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <m:GetStockPriceResponse xmlns:m="http://www.example.com/stock/">
      <m:Price>175.43</m:Price>
      <m:Currency>USD</m:Currency>
      <m:Timestamp>2026-02-27T12:00:00Z</m:Timestamp>
    </m:GetStockPriceResponse>
  </soap:Body>
</soap:Envelope>

<!-- SOAP Fault (error response) -->
<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <soap:Fault>
      <faultcode>soap:Client</faultcode>
      <faultstring>Invalid stock symbol</faultstring>
      <detail>
        <m:StockError xmlns:m="http://www.example.com/stock/">
          <m:ErrorCode>INVALID_SYMBOL</m:ErrorCode>
        </m:StockError>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`}</code></pre>

      {/* Section 16: Java XML Validation */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Java — XML Validation with JAXB and javax.xml
      </h2>
      <p>
        Java provides comprehensive XML support through the standard library. <code>DocumentBuilder</code> parses XML,
        <code>javax.xml.validation.Validator</code> validates against schemas, and <code>JAXB</code> marshals between
        Java objects and XML.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import javax.xml.parsers.*;
import javax.xml.validation.*;
import javax.xml.transform.*;
import javax.xml.transform.stream.*;
import org.w3c.dom.*;
import java.io.*;

// Parse and validate XML against XSD in Java
public class XmlValidator {

    public static Document parseXml(String xmlFilePath) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setNamespaceAware(true);  // Required for namespace processing
        DocumentBuilder builder = factory.newDocumentBuilder();
        return builder.parse(new File(xmlFilePath));
    }

    public static boolean validateAgainstXsd(String xmlFilePath, String xsdFilePath) {
        try {
            SchemaFactory schemaFactory =
                SchemaFactory.newInstance("http://www.w3.org/2001/XMLSchema");
            Schema schema = schemaFactory.newSchema(new File(xsdFilePath));
            Validator validator = schema.newValidator();

            // Collect all errors instead of throwing on first error
            final java.util.List<String> errors = new java.util.ArrayList<>();
            validator.setErrorHandler(new org.xml.sax.ErrorHandler() {
                public void warning(org.xml.sax.SAXParseException e) {
                    errors.add("Warning: " + e.getMessage());
                }
                public void error(org.xml.sax.SAXParseException e) {
                    errors.add("Error at line " + e.getLineNumber() + ": " + e.getMessage());
                }
                public void fatalError(org.xml.sax.SAXParseException e) {
                    errors.add("Fatal: " + e.getMessage());
                }
            });

            validator.validate(new StreamSource(new File(xmlFilePath)));

            if (errors.isEmpty()) {
                System.out.println("XML is valid!");
                return true;
            } else {
                errors.forEach(System.err::println);
                return false;
            }
        } catch (Exception e) {
            System.err.println("Validation failed: " + e.getMessage());
            return false;
        }
    }

    public static void prettyPrint(Document doc) throws Exception {
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");
        transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");
        transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");

        StringWriter writer = new StringWriter();
        transformer.transform(
            new DOMSource(doc),
            new StreamResult(writer)
        );
        System.out.println(writer.toString());
    }

    // XPath queries in Java
    public static String xpathQuery(Document doc, String expression) throws Exception {
        javax.xml.xpath.XPathFactory xpathFactory =
            javax.xml.xpath.XPathFactory.newInstance();
        javax.xml.xpath.XPath xpath = xpathFactory.newXPath();
        return xpath.evaluate(expression, doc);
    }

    public static void main(String[] args) throws Exception {
        Document doc = parseXml("library.xml");
        boolean valid = validateAgainstXsd("library.xml", "library.xsd");
        prettyPrint(doc);

        // XPath query
        String firstTitle = xpathQuery(doc, "//book[1]/title");
        System.out.println("First book: " + firstTitle);
    }
}`}</code></pre>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>XML is strict</strong>: all tags must be closed, attributes must be quoted, and any malformed document causes a fatal error. HTML is lenient but XML is not.</li>
          <li>Use <strong>DOMParser + XMLSerializer</strong> in browsers for XML parsing; implement custom indentation for pretty-printing since browsers do not format by default.</li>
          <li><strong>fast-xml-parser</strong> is the recommended Node.js library — zero dependencies and the fastest parse speed. Use <code>XMLValidator.validate()</code> before parsing.</li>
          <li><strong>Python 3.9+</strong> added <code>ET.indent()</code> to ElementTree, making pretty-printing simple without minidom. Use <code>lxml</code> for XPath, XSD validation, and XSLT.</li>
          <li><strong>XSD (XML Schema)</strong> is the industry standard for XML validation — it validates data types, patterns, cardinality, and namespaces. DTD is legacy; RELAX NG is simpler than XSD.</li>
          <li><strong>XPath expressions</strong> select nodes using path syntax. Use <code>XPathEvaluator</code> in browsers and <code>element.xpath()</code> in Python lxml. Always specify namespaces when querying namespaced XML.</li>
          <li>For large XML files, use <strong>streaming parsers</strong>: Python <code>iterparse()</code> with <code>element.clear()</code>, or Node.js <code>sax</code> stream. DOM parsers load the entire file into memory.</li>
          <li><strong>CDATA sections</strong> (<code>&lt;![CDATA[ ... ]]&gt;</code>) let you embed raw text with special characters. Use for embedding code, SQL, or HTML inside XML without escaping every <code>&amp;</code> and <code>&lt;</code>.</li>
          <li><strong>XML namespaces</strong> prevent element name conflicts. Always specify <code>xmlns</code> when processing namespaced XML — querySelector does not work with namespaces, use <code>getElementsByTagNameNS()</code> instead.</li>
          <li>Real-world XML: <strong>RSS/Atom</strong> for feeds, <strong>SOAP</strong> for web services, <strong>Maven pom.xml</strong> for Java builds, <strong>Android layouts</strong>, and <strong>Office Open XML</strong> (.docx, .xlsx) all rely on XML.</li>
        </ul>
      </div>
    </article>
  );
}
