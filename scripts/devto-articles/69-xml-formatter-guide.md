---
title: "XML Formatter: Format and Validate XML Online — Complete Guide"
tags: xml, javascript, python, webdev
canonical_url: https://viadreams.cc/en/blog/xml-formatter-online-guide
published: true
---

Format, validate, and transform XML. Complete guide with JavaScript DOMParser, Python ElementTree, XPath queries, XSLT transforms, and XML Schema validation.

## XML Structure Quick Reference

```xml
<?xml version="1.0" encoding="UTF-8"?>
<library xmlns="http://example.com/library"
         xmlns:dc="http://purl.org/dc/elements/1.1/">
  <book id="1">
    <dc:title>JavaScript: The Good Parts</dc:title>
    <author>Douglas Crockford</author>
    <price currency="USD">29.99</price>
    <description><![CDATA[Covers the best & most <reliable> parts]]></description>
  </book>
</library>
```

## JavaScript — DOMParser (Browser)

```javascript
// Parse XML
const parser = new DOMParser();
const doc = parser.parseFromString(xmlString, 'application/xml');

// Check for parse errors
const error = doc.querySelector('parsererror');
if (error) throw new Error('Invalid XML: ' + error.textContent);

// Pretty-print
function prettyPrint(xml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  const serializer = new XMLSerializer();
  // Use XSLT for indentation in browsers
  const xslt = new DOMParser().parseFromString(`
    <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <xsl:output method="xml" indent="yes"/>
      <xsl:template match="@*|node()">
        <xsl:copy><xsl:apply-templates select="@*|node()"/></xsl:copy>
      </xsl:template>
    </xsl:stylesheet>`, 'application/xml');
  const xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xslt);
  return new XMLSerializer().serializeToString(
    xsltProcessor.transformToDocument(doc)
  );
}
```

## Python — xml.etree.ElementTree

```python
import xml.etree.ElementTree as ET

# Parse
tree = ET.parse('data.xml')
root = tree.getroot()

# Pretty print (Python 3.9+)
ET.indent(tree, space='  ')
print(ET.tostring(root, encoding='unicode'))

# minidom for older Python
from xml.dom.minidom import parseString
pretty = parseString(ET.tostring(root)).toprettyxml(indent='  ')
```

## XPath Queries

```python
# Python lxml — full XPath 1.0 support
from lxml import etree

tree = etree.parse('library.xml')

# Select all books
books = tree.xpath('//book')

# Select by attribute
first = tree.xpath('//book[@id="1"]')[0]

# Select text content
titles = tree.xpath('//title/text()')

# Count nodes
count = tree.xpath('count(//book)')
```

```javascript
// JavaScript XPath
const result = doc.evaluate(
  '//book[@id="1"]/title',
  doc, null,
  XPathResult.FIRST_ORDERED_NODE_TYPE, null
);
console.log(result.singleNodeValue?.textContent);
```

## XML Schema (XSD) Validation

```xml
<!-- books.xsd -->
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="library">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="book" maxOccurs="unbounded">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="title" type="xs:string"/>
              <xs:element name="author" type="xs:string"/>
            </xs:sequence>
            <xs:attribute name="id" type="xs:positiveInteger" use="required"/>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>
```

```python
from lxml import etree

schema = etree.XMLSchema(etree.parse('books.xsd'))
doc = etree.parse('library.xml')
if not schema.validate(doc):
    print(schema.error_log)
```

## XML vs JSON

| Feature | XML | JSON |
|---------|-----|------|
| Verbosity | High | Low |
| Attributes | Yes | No |
| Comments | Yes | No |
| Schema | XSD/DTD/RELAX NG | JSON Schema |
| Use cases | SOAP, RSS, SVG, Office | REST APIs, configs |
| Namespaces | Yes | No |

## Quick Tool

Use **[DevToolBox XML Formatter](https://viadreams.cc/en/tools/xml-formatter)** — format, validate, and minify XML instantly online.

---

*Format XML with [DevToolBox's free XML Formatter](https://viadreams.cc/en/tools/xml-formatter).*
