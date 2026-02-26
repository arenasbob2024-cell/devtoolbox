'use client';

import Link from 'next/link';

export default function JsonToJsonSchemaConverterGuide({ lang }: { lang: string }) {
  return (
    <>
      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          JSON Schema is a vocabulary that lets you validate, annotate, and describe the structure of JSON data. You can <strong>generate JSON Schema from JSON</strong> automatically using online converters like our <Link href={`/${lang}/tools/json-to-json-schema`}>JSON to JSON Schema tool</Link>, CLI tools like quicktype, or libraries in Python (genson) and JavaScript (to-json-schema). This guide covers the conversion algorithm, all major methods, schema customization, Draft 2020-12 vs Draft-07 differences, validation with Ajv, and real-world use cases.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>JSON Schema describes JSON structure using keywords like <code>type</code>, <code>properties</code>, <code>required</code>, and <code>additionalProperties</code>.</li>
          <li>Automatic schema generation infers types from sample data; always review and add constraints like <code>minimum</code>, <code>maxLength</code>, and <code>pattern</code>.</li>
          <li>Draft 2020-12 is the latest specification; Draft-07 remains the most widely supported in tooling.</li>
          <li>Ajv (JavaScript) and jsonschema (Python) are the leading validation libraries for enforcing schemas at runtime.</li>
          <li>Real-world use cases include API contract validation, configuration file checking, form generation, and OpenAPI specification authoring.</li>
          <li>Use our free <Link href={`/${lang}/tools/json-schema-generator`}>JSON Schema Generator</Link> to produce schemas instantly from any JSON input.</li>
        </ul>
      </div>

      <h2>What Is JSON Schema?</h2>
      <p>
        JSON Schema is a declarative language that allows you to define the expected structure, data types, and constraints for JSON documents. Written in JSON itself, a schema acts as a contract between data producers and consumers. It specifies which fields are required, what types they should be, whether additional properties are allowed, and what validation rules apply to each value.
      </p>
      <p>
        The specification is maintained by the JSON Schema organization and has gone through several drafts, with <strong>Draft 2020-12</strong> being the most recent stable release. Earlier versions such as Draft-07 and Draft-04 are still widely used in production systems. JSON Schema powers tools across every major programming language, from API documentation generators like OpenAPI and Swagger to form builders, configuration validators, and code generators.
      </p>
      <p>
        A simple example: given a JSON object representing a user, a JSON Schema might declare that <code>name</code> must be a string, <code>age</code> must be a non-negative integer, and <code>email</code> must match an email format pattern. Any JSON document can then be validated against this schema to ensure it meets the specified requirements before being processed.
      </p>

      <h2>Why Generate JSON Schema from JSON?</h2>
      <p>
        Writing JSON Schema by hand is tedious and error-prone, especially for complex or deeply nested structures. Generating a schema automatically from existing JSON samples offers several advantages:
      </p>
      <ul>
        <li><strong>Speed:</strong> Convert a 200-field API response into a schema in seconds rather than hours of manual typing.</li>
        <li><strong>Accuracy:</strong> Automated tools correctly identify nested objects, arrays of mixed types, and nullable fields that humans might miss.</li>
        <li><strong>Bootstrapping:</strong> Use generated schemas as a starting point, then refine with business-specific constraints like <code>minimum</code>, <code>maximum</code>, <code>pattern</code>, and <code>enum</code>.</li>
        <li><strong>Documentation:</strong> Schemas generated from real data serve as living documentation for APIs and data formats.</li>
        <li><strong>Testing:</strong> Quickly generate schemas from fixture data to use in integration tests and contract testing.</li>
      </ul>
      <p>
        Whether you are building an API, validating configuration files, or generating forms from data models, starting with an automatically generated schema from actual JSON saves significant development time. For related type generation workflows, see our guides on <Link href={`/${lang}/blog/json-to-typescript-complete-guide`}>JSON to TypeScript</Link> and <Link href={`/${lang}/blog/json-schema-validation-guide`}>JSON Schema validation</Link>.
      </p>

      <h2>How JSON-to-Schema Conversion Works</h2>
      <p>
        The conversion algorithm traverses a JSON document recursively and builds a corresponding schema tree. Here is a high-level breakdown of the process:
      </p>
      <ol>
        <li><strong>Type inference:</strong> For each value, the algorithm determines the JSON type (<code>string</code>, <code>number</code>, <code>integer</code>, <code>boolean</code>, <code>null</code>, <code>object</code>, or <code>array</code>).</li>
        <li><strong>Object handling:</strong> For objects, the algorithm iterates over all keys, recursively infers the schema for each value, and records them under <code>properties</code>. All observed keys are typically added to the <code>required</code> array.</li>
        <li><strong>Array handling:</strong> For arrays, the algorithm inspects all elements. If all elements share the same type, a single <code>items</code> schema is produced. If elements have different types, a <code>oneOf</code> or tuple-style <code>prefixItems</code> is used.</li>
        <li><strong>Number differentiation:</strong> Numbers without decimal parts are typed as <code>integer</code>; those with decimals are typed as <code>number</code>.</li>
        <li><strong>Null merging:</strong> When a field is <code>null</code> in the sample data, advanced generators produce a union type like <code>{'{\"type\": [\"string\", \"null\"]}'}</code> or a <code>oneOf</code> with a null branch.</li>
        <li><strong>Schema assembly:</strong> The root schema object is assembled with <code>$schema</code> (the meta-schema URI), <code>type</code>, and the inferred <code>properties</code> or <code>items</code>.</li>
      </ol>
      <p>
        Here is a concrete example of the input and output:
      </p>
      <p><strong>JSON Input:</strong></p>
      <pre><code className="language-json">{`{
  "id": 1,
  "name": "Widget",
  "price": 9.99,
  "in_stock": true,
  "tags": ["electronics", "sale"],
  "dimensions": {
    "width": 10,
    "height": 5,
    "unit": "cm"
  }
}`}</code></pre>
      <p><strong>Generated JSON Schema:</strong></p>
      <pre><code className="language-json">{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": "string" },
    "price": { "type": "number" },
    "in_stock": { "type": "boolean" },
    "tags": {
      "type": "array",
      "items": { "type": "string" }
    },
    "dimensions": {
      "type": "object",
      "properties": {
        "width": { "type": "integer" },
        "height": { "type": "integer" },
        "unit": { "type": "string" }
      },
      "required": ["width", "height", "unit"]
    }
  },
  "required": ["id", "name", "price", "in_stock", "tags", "dimensions"]
}`}</code></pre>
      <p>
        The algorithm correctly identifies <code>id</code> as an <code>integer</code>, <code>price</code> as a <code>number</code>, <code>tags</code> as an array of strings, and <code>dimensions</code> as a nested object with its own required properties.
      </p>

      <h2>Method 1: Online JSON to JSON Schema Converter</h2>
      <p>
        The fastest way to generate a JSON Schema is to use an online converter. Our <Link href={`/${lang}/tools/json-to-json-schema`}>JSON to JSON Schema tool</Link> provides instant conversion with these features:
      </p>
      <ul>
        <li>Paste any valid JSON and receive a complete schema immediately.</li>
        <li>Choose between Draft 2020-12, Draft-07, and Draft-04 output.</li>
        <li>Toggle whether all properties should be marked as <code>required</code>.</li>
        <li>Option to set <code>additionalProperties: false</code> for strict validation.</li>
        <li>Copy the generated schema with one click.</li>
      </ul>
      <p>
        For a more advanced schema authoring experience with title and description fields, try the <Link href={`/${lang}/tools/json-schema-generator`}>JSON Schema Generator</Link> tool which allows you to add metadata annotations directly.
      </p>
      <p>
        Online converters are ideal for quick one-off conversions, exploring JSON structures during development, and generating initial schemas that you refine by hand afterward.
      </p>

      <h2>Method 2: Using quicktype CLI</h2>
      <p>
        <strong>quicktype</strong> is a powerful command-line tool that generates types and schemas from JSON, JSON Schema, TypeScript, and GraphQL. It supports over 20 output languages and can produce JSON Schema from JSON samples.
      </p>
      <p><strong>Installation:</strong></p>
      <pre><code className="language-bash">{`npm install -g quicktype`}</code></pre>
      <p><strong>Generate JSON Schema from a JSON file:</strong></p>
      <pre><code className="language-bash">{`# From a local JSON file
quicktype -s json -o schema.json --lang schema data.json

# From a URL
quicktype -s json -o schema.json --lang schema \\
  "https://api.example.com/users/1"

# From stdin
echo '{"name":"Alice","age":30}' | quicktype -s json -o schema.json --lang schema`}</code></pre>
      <p><strong>Example output for a user object:</strong></p>
      <pre><code className="language-json">{`{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "$ref": "#/definitions/User",
  "definitions": {
    "User": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "name": { "type": "string" },
        "age": { "type": "integer" }
      },
      "required": ["age", "name"],
      "title": "User"
    }
  }
}`}</code></pre>
      <p>
        quicktype excels when you have multiple JSON samples and want to merge them into a single schema that covers all observed variations. You can pass multiple files and quicktype will compute the union of all properties, automatically using optional fields where appropriate.
      </p>

      <h2>Method 3: Python with genson Library</h2>
      <p>
        The <code>genson</code> library is the standard Python tool for generating JSON Schema from JSON instances. It is particularly useful when you need to process schemas programmatically or integrate generation into a Python pipeline.
      </p>
      <p><strong>Installation:</strong></p>
      <pre><code className="language-bash">{`pip install genson`}</code></pre>
      <p><strong>Basic usage:</strong></p>
      <pre><code className="language-python">{`from genson import SchemaBuilder
import json

# Sample JSON data
data = {
    "id": 1,
    "name": "Widget",
    "price": 9.99,
    "in_stock": True,
    "tags": ["electronics", "sale"],
    "dimensions": {
        "width": 10,
        "height": 5,
        "unit": "cm"
    }
}

# Build schema
builder = SchemaBuilder()
builder.add_object(data)

# Get the schema
schema = builder.to_schema()
print(json.dumps(schema, indent=2))`}</code></pre>
      <p><strong>Merging multiple samples:</strong></p>
      <pre><code className="language-python">{`from genson import SchemaBuilder
import json

builder = SchemaBuilder()

# Add multiple JSON instances to capture all possible fields
samples = [
    {"name": "Alice", "age": 30, "email": "alice@example.com"},
    {"name": "Bob", "age": 25, "phone": "+1234567890"},
    {"name": "Charlie", "age": None, "email": "charlie@test.com"},
]

for sample in samples:
    builder.add_object(sample)

schema = builder.to_schema()
print(json.dumps(schema, indent=2))
# Result: "age" allows integer and null,
# "email" and "phone" are optional (not in required)`}</code></pre>
      <p>
        The key advantage of genson is its ability to merge multiple samples. By feeding it several real API responses, you get a schema that accurately represents the full range of possible data shapes, including optional fields and nullable values.
      </p>

      <h2>Method 4: JavaScript/Node.js with to-json-schema</h2>
      <p>
        For JavaScript and Node.js projects, the <code>to-json-schema</code> package provides a straightforward conversion from JSON values to JSON Schema.
      </p>
      <p><strong>Installation:</strong></p>
      <pre><code className="language-bash">{`npm install to-json-schema`}</code></pre>
      <p><strong>Basic usage:</strong></p>
      <pre><code className="language-javascript">{`const toJsonSchema = require('to-json-schema');

const data = {
  id: 1,
  name: "Widget",
  price: 9.99,
  inStock: true,
  tags: ["electronics", "sale"],
  dimensions: {
    width: 10,
    height: 5,
    unit: "cm"
  }
};

const schema = toJsonSchema(data);
console.log(JSON.stringify(schema, null, 2));`}</code></pre>
      <p><strong>With configuration options:</strong></p>
      <pre><code className="language-javascript">{`const toJsonSchema = require('to-json-schema');

const data = {
  name: "Alice",
  email: "alice@example.com",
  created_at: "2026-01-15T10:30:00Z",
  score: 95.5
};

const schema = toJsonSchema(data, {
  required: true,            // mark all properties required
  postProcessFnc: (type, schema, value, defaultFnc) => {
    // Detect date-time strings
    if (type === 'string' &&
        typeof value === 'string' &&
        /^\\d{4}-\\d{2}-\\d{2}T/.test(value)) {
      schema.format = 'date-time';
    }
    return schema;
  }
});

console.log(JSON.stringify(schema, null, 2));`}</code></pre>
      <p>
        The <code>to-json-schema</code> package is lightweight and works in both Node.js and browser environments, making it suitable for client-side schema generation in web applications.
      </p>
      <p>
        For an alternative approach that generates runtime validators instead of schemas, see our guide on <Link href={`/${lang}/blog/json-to-zod-schema-guide`}>JSON to Zod Schema</Link>.
      </p>

      <h2>Understanding the Generated Schema</h2>
      <p>
        Whether you use an online tool, CLI, or library, the generated schema uses a standard set of JSON Schema keywords. Understanding these keywords is essential for reviewing and customizing the output.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Keyword</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Purpose</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>type</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Declares the expected data type</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{'"type": "string"'}</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>properties</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Defines sub-schemas for each object key</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{'"properties": {"name": {"type": "string"}}'}</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>required</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Lists which properties must be present</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{'"required": ["id", "name"]'}</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>additionalProperties</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Controls whether extra keys are allowed</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{'"additionalProperties": false'}</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>items</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Defines the schema for array elements</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{'"items": {"type": "string"}'}</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>$ref</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>References a reusable schema definition</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{'"$ref": "#/$defs/Address"'}</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>$defs</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Container for reusable sub-schemas</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>{'"$defs": {"Address": {...}}'}</code></td>
          </tr>
        </tbody>
      </table>
      <p>
        When reviewing generated schemas, pay attention to the <code>required</code> array. Automatic generators mark all observed properties as required because they appear in the sample. In practice, some fields may be optional in your actual data model. Similarly, <code>additionalProperties</code> defaults to <code>true</code> (allowing any extra fields) unless explicitly set to <code>false</code>.
      </p>

      <h2>Customizing Generated Schemas</h2>
      <p>
        Auto-generated schemas provide the structural skeleton, but production-grade schemas need business-specific constraints. Here are the most common customizations:
      </p>
      <p><strong>Adding numeric constraints:</strong></p>
      <pre><code className="language-json">{`{
  "type": "object",
  "properties": {
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    },
    "price": {
      "type": "number",
      "minimum": 0,
      "exclusiveMinimum": 0,
      "multipleOf": 0.01
    },
    "quantity": {
      "type": "integer",
      "minimum": 1,
      "maximum": 10000
    }
  }
}`}</code></pre>
      <p><strong>String constraints and patterns:</strong></p>
      <pre><code className="language-json">{`{
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "format": "email",
      "maxLength": 254
    },
    "phone": {
      "type": "string",
      "pattern": "^\\\\+[1-9]\\\\d{1,14}$"
    },
    "slug": {
      "type": "string",
      "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$",
      "minLength": 1,
      "maxLength": 100
    },
    "status": {
      "type": "string",
      "enum": ["active", "inactive", "pending", "archived"]
    }
  }
}`}</code></pre>
      <p><strong>Array constraints:</strong></p>
      <pre><code className="language-json">{`{
  "type": "object",
  "properties": {
    "tags": {
      "type": "array",
      "items": { "type": "string", "minLength": 1 },
      "minItems": 1,
      "maxItems": 10,
      "uniqueItems": true
    },
    "coordinates": {
      "type": "array",
      "prefixItems": [
        { "type": "number", "minimum": -180, "maximum": 180 },
        { "type": "number", "minimum": -90, "maximum": 90 }
      ],
      "items": false,
      "minItems": 2,
      "maxItems": 2
    }
  }
}`}</code></pre>
      <p><strong>Conditional schemas with if/then/else:</strong></p>
      <pre><code className="language-json">{`{
  "type": "object",
  "properties": {
    "payment_method": {
      "type": "string",
      "enum": ["credit_card", "bank_transfer", "paypal"]
    }
  },
  "if": {
    "properties": {
      "payment_method": { "const": "credit_card" }
    }
  },
  "then": {
    "required": ["card_number", "expiry_date", "cvv"]
  },
  "else": {
    "if": {
      "properties": {
        "payment_method": { "const": "bank_transfer" }
      }
    },
    "then": {
      "required": ["bank_name", "account_number"]
    }
  }
}`}</code></pre>
      <p>
        The key takeaway is that generated schemas provide an excellent starting point, but they should always be refined with domain-specific constraints before being used in production. For a complete reference on available keywords, check our <Link href={`/${lang}/blog/json-schema-complete-guide`}>JSON Schema complete guide</Link>.
      </p>

      <h2>Draft 2020-12 vs Draft-07 Differences</h2>
      <p>
        The two most commonly used JSON Schema versions are Draft 2020-12 (latest) and Draft-07 (most widely supported). Understanding their differences is important when choosing which to target.
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Feature</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Draft-07</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Draft 2020-12</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Meta-schema URI</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>http://json-schema.org/draft-07/schema#</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>https://json-schema.org/draft/2020-12/schema</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Definitions keyword</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>definitions</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>$defs</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Tuple validation</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>items</code> (array of schemas)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>prefixItems</code> + <code>items</code> (boolean or schema)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Dynamic references</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Not supported</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>$dynamicRef</code> / <code>$dynamicAnchor</code></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Vocabulary system</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Not supported</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>$vocabulary</code> for extensibility</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>if/then/else</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Supported</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Supported</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Tooling support</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Excellent (broadest support)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Good and growing</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Recommendation:</strong> Use Draft 2020-12 for new projects where your toolchain supports it. Fall back to Draft-07 when you need maximum compatibility, especially with OpenAPI 3.0 (which uses a modified subset of Draft-07). Our <Link href={`/${lang}/tools/json-to-json-schema`}>JSON to JSON Schema converter</Link> supports both drafts.
      </p>

      <h2>Validating Data Against Your Schema</h2>
      <p>
        Generating a schema is only half the story. The real value comes from using that schema to validate data at runtime, in CI pipelines, or at API boundaries.
      </p>
      <p><strong>JavaScript/TypeScript with Ajv (the fastest JSON Schema validator):</strong></p>
      <pre><code className="language-javascript">{`import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 0, maximum: 150 },
    tags: {
      type: 'array',
      items: { type: 'string' },
      uniqueItems: true
    }
  },
  required: ['id', 'name', 'email'],
  additionalProperties: false
};

const validate = ajv.compile(schema);

// Valid data
const validData = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 30,
  tags: ['admin']
};
console.log(validate(validData)); // true

// Invalid data
const invalidData = {
  id: 'not-a-number',
  name: '',
  email: 'invalid-email',
  age: -5,
  extra_field: 'not allowed'
};
console.log(validate(invalidData)); // false
console.log(validate.errors);
// Returns detailed error objects for each violation`}</code></pre>

      <p><strong>Python with jsonschema library:</strong></p>
      <pre><code className="language-python">{`from jsonschema import validate, ValidationError, Draft202012Validator
import json

schema = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
        "id": {"type": "integer"},
        "name": {"type": "string", "minLength": 1},
        "email": {"type": "string", "format": "email"},
        "age": {"type": "integer", "minimum": 0}
    },
    "required": ["id", "name", "email"],
    "additionalProperties": False
}

# Validate a single document
data = {"id": 1, "name": "Alice", "email": "alice@example.com"}
validate(instance=data, schema=schema)  # Passes silently

# Collect all errors
validator = Draft202012Validator(schema)
invalid_data = {"id": "bad", "name": "", "extra": True}
errors = list(validator.iter_errors(invalid_data))
for error in sorted(errors, key=lambda e: list(e.path)):
    print(f"{list(error.path)}: {error.message}")`}</code></pre>

      <p><strong>Integration patterns:</strong></p>
      <ul>
        <li><strong>API middleware:</strong> Validate request bodies against schemas before they reach your route handlers. Express.js libraries like <code>express-json-validator-middleware</code> or <code>fastify</code>&apos;s built-in schema support make this easy.</li>
        <li><strong>CI/CD pipelines:</strong> Validate configuration files (package.json, tsconfig.json, docker-compose.yml) against their schemas during build steps.</li>
        <li><strong>Contract testing:</strong> Use schemas as contracts in consumer-driven contract testing between microservices.</li>
      </ul>

      <h2>Real-World Use Cases</h2>
      <p>
        JSON Schema is used across the software development lifecycle. Here are the most impactful applications:
      </p>
      <p><strong>1. API Documentation with OpenAPI/Swagger</strong></p>
      <p>
        OpenAPI 3.x uses JSON Schema (Draft-07 subset) to describe request bodies, response payloads, query parameters, and headers. Generating schemas from sample API responses gives you a head start on writing OpenAPI specifications. Tools like Swagger UI then render interactive documentation from these schemas.
      </p>
      <p><strong>2. Configuration File Validation</strong></p>
      <p>
        Many tools use JSON Schema to validate their configuration files: <code>package.json</code>, <code>tsconfig.json</code>, <code>.eslintrc.json</code>, VS Code <code>settings.json</code>, and GitHub Actions workflow files all have published JSON Schemas. IDEs like VS Code use these schemas to provide autocompletion and inline validation as you edit.
      </p>
      <p><strong>3. Form Generation</strong></p>
      <p>
        Libraries like <code>react-jsonschema-form</code>, <code>Formily</code>, and <code>Ajv</code> + <code>JSON Forms</code> render HTML forms directly from JSON Schema definitions. Each schema property becomes a form field with the correct input type, validation rules, and error messages. This is particularly powerful for dynamic forms where the structure comes from a backend API.
      </p>
      <p><strong>4. Code Generation</strong></p>
      <p>
        JSON Schema serves as the input for code generators that produce typed data classes in various languages. Tools like <code>jsonschema2pojo</code> (Java), <code>quicktype</code> (multi-language), and <code>json-schema-to-typescript</code> convert schemas into language-specific types. This is the reverse of what we covered earlier: schema from JSON, then code from schema.
      </p>
      <p><strong>5. Data Pipeline Validation</strong></p>
      <p>
        In ETL pipelines and data engineering, JSON Schema validates incoming data before it enters a data warehouse or processing pipeline. This catches malformed records early, preventing downstream errors and data corruption.
      </p>
      <p>
        For more on how to work with JSON data transformations, see our guides on <Link href={`/${lang}/blog/json-formatter-validator-guide`}>JSON formatting and validation</Link> and <Link href={`/${lang}/blog/json-to-csv-conversion-guide`}>JSON to CSV conversion</Link>.
      </p>

      <h2>Advanced: Schema Composition with allOf, anyOf, oneOf</h2>
      <p>
        JSON Schema supports powerful composition keywords that let you combine multiple schemas:
      </p>
      <pre><code className="language-json">{`{
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "type": { "type": "string", "enum": ["personal", "business"] }
  },
  "required": ["id", "type"],
  "allOf": [
    {
      "if": {
        "properties": { "type": { "const": "personal" } }
      },
      "then": {
        "properties": {
          "first_name": { "type": "string" },
          "last_name": { "type": "string" },
          "date_of_birth": { "type": "string", "format": "date" }
        },
        "required": ["first_name", "last_name"]
      }
    },
    {
      "if": {
        "properties": { "type": { "const": "business" } }
      },
      "then": {
        "properties": {
          "company_name": { "type": "string" },
          "tax_id": { "type": "string" },
          "industry": { "type": "string" }
        },
        "required": ["company_name", "tax_id"]
      }
    }
  ]
}`}</code></pre>
      <p>
        <strong>Composition keywords explained:</strong>
      </p>
      <ul>
        <li><code>allOf</code>: Data must be valid against ALL listed schemas (intersection).</li>
        <li><code>anyOf</code>: Data must be valid against at least ONE schema (union).</li>
        <li><code>oneOf</code>: Data must be valid against EXACTLY ONE schema (discriminated union).</li>
        <li><code>not</code>: Data must NOT be valid against the given schema.</li>
      </ul>
      <p>
        These keywords are essential for modeling polymorphic data structures, discriminated unions, and conditional validation rules that go beyond what automatic generation can produce.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>What is the easiest way to generate JSON Schema from JSON?</h3>
      <p>
        The easiest way is to use an online converter. Paste your JSON into a tool like our <Link href={`/${lang}/tools/json-to-json-schema`}>JSON to JSON Schema converter</Link> and get the schema instantly. No installation or coding required. For programmatic use, Python developers can use the <code>genson</code> library and JavaScript developers can use <code>to-json-schema</code>, both requiring just a few lines of code.
      </p>

      <h3>What is the difference between JSON Schema Draft-07 and Draft 2020-12?</h3>
      <p>
        Draft 2020-12 introduces <code>$defs</code> (replacing <code>definitions</code>), <code>prefixItems</code> for tuple validation (replacing the overloaded <code>items</code> array syntax), <code>$dynamicRef</code> for dynamic references, and the <code>$vocabulary</code> system for extensibility. Draft-07 has broader tooling support, especially in the OpenAPI ecosystem. Choose Draft 2020-12 for new projects and Draft-07 when maximum compatibility is needed.
      </p>

      <h3>Can I validate JSON against a schema in the browser?</h3>
      <p>
        Yes. Ajv is fully compatible with browsers and can be bundled with any JavaScript framework. You can also use <code>ajv-formats</code> for format validation (email, URI, date-time). For React applications, <code>react-jsonschema-form</code> uses Ajv internally to validate form data against schemas in real time.
      </p>

      <h3>How do I handle nullable fields in JSON Schema?</h3>
      <p>
        In Draft 2020-12, use a type array: <code>{'"type": ["string", "null"]'}</code>. In Draft-07, you can also use <code>oneOf</code>: <code>{'"oneOf": [{"type": "string"}, {"type": "null"}]'}</code>. Most automatic generators detect null values in sample data and produce the correct nullable type declaration.
      </p>

      <h3>What is additionalProperties and should I set it to false?</h3>
      <p>
        The <code>additionalProperties</code> keyword controls whether an object can have properties not listed in <code>properties</code>. When set to <code>false</code>, any extra keys cause validation failure. Set it to <code>false</code> for strict API contracts where unexpected fields indicate a problem. Leave it as <code>true</code> (default) for extensible formats where consumers should ignore unknown fields.
      </p>

      <h3>How does JSON Schema relate to TypeScript types?</h3>
      <p>
        JSON Schema validates data at runtime while TypeScript types are checked at compile time. They are complementary: use JSON Schema to validate incoming API data, then use TypeScript interfaces for type-safe processing. Tools like <code>json-schema-to-typescript</code> can generate TypeScript interfaces from JSON Schema, and conversely, tools can generate JSON Schema from TypeScript types using <code>ts-json-schema-generator</code>. See our <Link href={`/${lang}/blog/json-to-typescript-complete-guide`}>JSON to TypeScript guide</Link> for more.
      </p>

      {/* FAQ Schema.org markup is handled by the parent page.tsx via JSON-LD */}

      <h2>Conclusion</h2>
      <p>
        Generating JSON Schema from JSON is one of the most practical skills in modern web development. Whether you need to validate API responses, document data contracts, generate forms, or enforce configuration file structure, JSON Schema provides a standardized, language-agnostic solution.
      </p>
      <p>
        Start by generating a schema automatically from your JSON data using our <Link href={`/${lang}/tools/json-to-json-schema`}>JSON to JSON Schema converter</Link> or the <Link href={`/${lang}/tools/json-schema-generator`}>JSON Schema Generator</Link>. Then refine the output by adding constraints, patterns, enums, and conditional logic. Finally, integrate validation into your application using Ajv (JavaScript) or jsonschema (Python) to enforce your schema at runtime.
      </p>
      <p>
        For related workflows, explore <Link href={`/${lang}/blog/json-schema-validation-guide`}>JSON Schema validation best practices</Link>, <Link href={`/${lang}/blog/json-to-typescript-complete-guide`}>JSON to TypeScript conversion</Link>, and <Link href={`/${lang}/blog/json-to-zod-schema-guide`}>JSON to Zod Schema for runtime validation</Link>.
      </p>
    </>
  );
}
