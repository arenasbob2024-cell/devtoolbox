'use client';

import Link from 'next/link';

export default function JsonSchemaValidationGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Is JSON Schema?</h2>
      <p>
        <strong>JSON Schema</strong> is a vocabulary that allows you to annotate and validate JSON documents. It describes the structure, data types, and constraints of your JSON data using JSON itself. Think of it as a contract or blueprint that defines what valid JSON data should look like.
      </p>
      <p>
        JSON Schema is used for API request/response validation, configuration file validation, form generation, documentation, and code generation. It is supported by virtually every programming language and is defined in a series of IETF drafts, with the latest being Draft 2020-12.
      </p>
      <p>
        <Link href={`/${lang}/tools/json-to-json-schema`} style={{ fontWeight: 600 }}>Generate JSON Schema from any JSON data instantly with our free online tool.</Link>
      </p>

      <h2>Your First JSON Schema</h2>
      <p>
        Let us start with a simple example. Say you have a user object and want to validate its structure:
      </p>
      <pre><code className="language-json">{`// The JSON data we want to validate
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 28,
  "active": true
}`}</code></pre>

      <pre><code className="language-json">{`// The JSON Schema that validates the data above
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "User",
  "description": "A user account",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    },
    "active": {
      "type": "boolean"
    }
  },
  "required": ["name", "email"],
  "additionalProperties": false
}`}</code></pre>

      <h2>Basic Types</h2>
      <p>
        JSON Schema supports all JSON data types plus additional validation keywords for each:
      </p>
      <pre><code className="language-json">{`// String type
{
  "type": "string",
  "minLength": 1,
  "maxLength": 255,
  "pattern": "^[a-zA-Z]+$",
  "format": "email"
}

// Number types
{
  "type": "number",
  "minimum": 0,
  "maximum": 100,
  "exclusiveMinimum": 0,
  "multipleOf": 0.01
}

{
  "type": "integer",
  "minimum": 1,
  "maximum": 65535
}

// Boolean
{
  "type": "boolean"
}

// Null
{
  "type": "null"
}

// Enum (fixed values)
{
  "type": "string",
  "enum": ["draft", "published", "archived"]
}

// Const (single fixed value)
{
  "const": "active"
}

// Multiple types (union)
{
  "type": ["string", "null"]
}`}</code></pre>

      <h3>String Formats</h3>
      <pre><code className="language-text">{`Built-in String Formats:

Format          Example                     Description
--------------  -------------------------   -------------------
"email"         user@example.com            Email address
"uri"           https://example.com         Full URI
"uri-reference" /path/to/resource           URI or relative reference
"date"          2026-02-22                  ISO 8601 date
"date-time"     2026-02-22T14:30:00Z        ISO 8601 date-time
"time"          14:30:00Z                   ISO 8601 time
"duration"      P3Y6M4DT12H30M5S           ISO 8601 duration
"ipv4"          192.168.1.1                 IPv4 address
"ipv6"          ::1                         IPv6 address
"hostname"      example.com                 Internet hostname
"uuid"          550e8400-e29b-41d4-...      UUID
"regex"         ^[a-z]+$                    Regular expression
"json-pointer"  /foo/bar/0                  JSON Pointer (RFC 6901)`}</code></pre>

      <h2>Objects: Required Fields and Properties</h2>
      <pre><code className="language-json">{`{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "description": "Unique user identifier"
    },
    "username": {
      "type": "string",
      "minLength": 3,
      "maxLength": 30,
      "pattern": "^[a-zA-Z0-9_]+$"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "role": {
      "type": "string",
      "enum": ["admin", "editor", "viewer"],
      "default": "viewer"
    },
    "metadata": {
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    }
  },
  "required": ["id", "username", "email"],
  "additionalProperties": false,
  "minProperties": 3,
  "maxProperties": 10
}`}</code></pre>

      <h2>Arrays: Items, MinItems, UniqueItems</h2>
      <pre><code className="language-json">{`// Array of strings
{
  "type": "array",
  "items": {
    "type": "string"
  },
  "minItems": 1,
  "maxItems": 10,
  "uniqueItems": true
}

// Array of objects
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "name": { "type": "string" },
      "price": { "type": "number", "minimum": 0 }
    },
    "required": ["name", "price"]
  },
  "minItems": 1
}

// Tuple validation (fixed-length array with specific types)
{
  "type": "array",
  "prefixItems": [
    { "type": "string" },
    { "type": "integer" },
    { "type": "boolean" }
  ],
  "items": false,
  "minItems": 3,
  "maxItems": 3
}
// Valid: ["hello", 42, true]
// Invalid: ["hello", "world", true]

// Array containing specific values
{
  "type": "array",
  "contains": {
    "type": "string",
    "const": "admin"
  }
}
// Must contain at least one "admin" string`}</code></pre>

      <h2>Nested Objects and Complex Structures</h2>
      <pre><code className="language-json">{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Blog Post",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "minLength": 5,
      "maxLength": 200
    },
    "slug": {
      "type": "string",
      "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$"
    },
    "content": {
      "type": "string",
      "minLength": 100
    },
    "author": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "email": { "type": "string", "format": "email" },
        "bio": { "type": "string", "maxLength": 500 }
      },
      "required": ["name", "email"]
    },
    "tags": {
      "type": "array",
      "items": { "type": "string", "minLength": 1 },
      "minItems": 1,
      "maxItems": 10,
      "uniqueItems": true
    },
    "metadata": {
      "type": "object",
      "properties": {
        "publishedAt": { "type": "string", "format": "date-time" },
        "updatedAt": { "type": "string", "format": "date-time" },
        "readingTime": { "type": "integer", "minimum": 1 },
        "featured": { "type": "boolean", "default": false }
      },
      "required": ["publishedAt"]
    },
    "status": {
      "type": "string",
      "enum": ["draft", "review", "published", "archived"]
    }
  },
  "required": ["title", "slug", "content", "author", "status"]
}`}</code></pre>

      <h2>$ref: Reusable Schema Definitions</h2>
      <p>
        The <code>$ref</code> keyword allows you to reference and reuse schema definitions, keeping your schemas DRY (Don't Repeat Yourself):
      </p>
      <pre><code className="language-json">{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$defs": {
    "address": {
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string", "minLength": 2, "maxLength": 2 },
        "zip": { "type": "string", "pattern": "^\\\\d{5}(-\\\\d{4})?$" },
        "country": { "type": "string", "default": "US" }
      },
      "required": ["street", "city", "state", "zip"]
    },
    "phone": {
      "type": "string",
      "pattern": "^\\\\+?[1-9]\\\\d{6,14}$"
    }
  },
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "billing_address": { "$ref": "#/$defs/address" },
    "shipping_address": { "$ref": "#/$defs/address" },
    "phone": { "$ref": "#/$defs/phone" },
    "alt_phone": { "$ref": "#/$defs/phone" }
  },
  "required": ["name", "billing_address"]
}`}</code></pre>

      <h2>Conditional Schemas: if/then/else</h2>
      <p>
        JSON Schema supports conditional validation with <code>if</code>/<code>then</code>/<code>else</code> keywords. This lets you apply different validation rules based on the data:
      </p>
      <pre><code className="language-json">{`{
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "enum": ["individual", "company"]
    },
    "name": { "type": "string" },
    "tax_id": { "type": "string" },
    "company_name": { "type": "string" }
  },
  "required": ["type", "name"],

  "if": {
    "properties": {
      "type": { "const": "company" }
    }
  },
  "then": {
    "required": ["company_name", "tax_id"],
    "properties": {
      "tax_id": {
        "pattern": "^\\\\d{2}-\\\\d{7}$"
      }
    }
  },
  "else": {
    "properties": {
      "tax_id": {
        "pattern": "^\\\\d{3}-\\\\d{2}-\\\\d{4}$"
      }
    }
  }
}

// When type="company": company_name and tax_id (EIN format) are required
// When type="individual": tax_id uses SSN format`}</code></pre>

      <h2>Composition: allOf, anyOf, oneOf, not</h2>
      <pre><code className="language-json">{`// allOf - must match ALL schemas (intersection)
{
  "allOf": [
    { "$ref": "#/$defs/base-entity" },
    {
      "properties": {
        "role": { "type": "string" }
      },
      "required": ["role"]
    }
  ]
}

// anyOf - must match at least ONE schema (union)
{
  "anyOf": [
    { "type": "string", "maxLength": 5 },
    { "type": "number", "minimum": 0 }
  ]
}
// Valid: "hello" (string <= 5 chars) or 42 (number >= 0)

// oneOf - must match EXACTLY ONE schema (exclusive)
{
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "type": { "const": "email" },
        "address": { "type": "string", "format": "email" }
      },
      "required": ["type", "address"]
    },
    {
      "type": "object",
      "properties": {
        "type": { "const": "phone" },
        "number": { "type": "string" }
      },
      "required": ["type", "number"]
    }
  ]
}

// not - must NOT match the schema
{
  "not": {
    "type": "string",
    "pattern": "^admin"
  }
}
// Valid: "user_alice", 42
// Invalid: "admin_alice"`}</code></pre>

      <h2>JSON Schema Draft Versions</h2>
      <pre><code className="language-text">{`JSON Schema Draft Version History:

Draft           Year    $schema URI                                    Key Features
-----------     ----    -------------------------------------------    -------------------------
Draft-04        2013    http://json-schema.org/draft-04/schema#        First widely adopted draft
Draft-06        2017    http://json-schema.org/draft-06/schema#        $ref improvements, const, contains
Draft-07        2018    http://json-schema.org/draft-07/schema#        if/then/else, readOnly, writeOnly
Draft 2019-09   2019    https://json-schema.org/draft/2019-09/schema   $defs, unevaluatedProperties
Draft 2020-12   2020    https://json-schema.org/draft/2020-12/schema   prefixItems, $dynamicRef

Recommendation: Use Draft 2020-12 for new projects.
Most validators support Draft-07 and later.`}</code></pre>

      <h2>Validation in Node.js with Ajv</h2>
      <p>
        <strong>Ajv</strong> (Another JSON Validator) is the fastest JSON Schema validator for JavaScript and Node.js:
      </p>
      <pre><code className="language-javascript">{`// Install: npm install ajv ajv-formats
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);  // Adds "email", "date-time", "uri", etc.

// Define schema
const userSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    age: { type: 'integer', minimum: 0 },
    role: { type: 'string', enum: ['admin', 'user', 'guest'] },
  },
  required: ['name', 'email'],
  additionalProperties: false,
};

// Compile schema (do this once, reuse the validate function)
const validate = ajv.compile(userSchema);

// Validate data
const validData = { name: 'Alice', email: 'alice@example.com', age: 28, role: 'admin' };
const invalidData = { name: '', email: 'not-an-email', age: -5, extra: 'field' };

console.log(validate(validData));   // true
console.log(validate(invalidData)); // false
console.log(validate.errors);
// [
//   { keyword: 'minLength', message: 'must NOT have fewer than 1 characters' },
//   { keyword: 'format', message: 'must match format "email"' },
//   { keyword: 'minimum', message: 'must be >= 0' },
//   { keyword: 'additionalProperties', message: 'must NOT have additional properties' }
// ]

// Express.js middleware
function validateBody(schema) {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    if (!validate(req.body)) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validate.errors,
      });
    }
    next();
  };
}

app.post('/api/users', validateBody(userSchema), (req, res) => {
  // req.body is guaranteed to be valid here
  res.json({ success: true });
});`}</code></pre>

      <h2>Validation in Python with jsonschema</h2>
      <pre><code className="language-python">{`# Install: pip install jsonschema
from jsonschema import validate, ValidationError, Draft202012Validator

schema = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
        "name": {"type": "string", "minLength": 1},
        "email": {"type": "string", "format": "email"},
        "age": {"type": "integer", "minimum": 0},
        "tags": {
            "type": "array",
            "items": {"type": "string"},
            "uniqueItems": True,
        },
    },
    "required": ["name", "email"],
    "additionalProperties": False,
}

# Basic validation (raises exception on failure)
try:
    validate(
        instance={"name": "Alice", "email": "alice@example.com", "age": 28},
        schema=schema,
    )
    print("Valid!")
except ValidationError as e:
    print(f"Invalid: {e.message}")

# Collect all errors
validator = Draft202012Validator(schema)
errors = list(validator.iter_errors({"name": "", "email": "bad", "extra": 1}))
for error in errors:
    print(f"  - {error.json_path}: {error.message}")

# FastAPI integration (automatic JSON Schema validation)
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI()

class User(BaseModel):
    name: str
    email: EmailStr
    age: int | None = None
    tags: list[str] = []

@app.post("/users")
def create_user(user: User):
    # Pydantic auto-validates and generates JSON Schema
    return {"id": 1, "name": user.name}

# Access generated schema:
print(User.model_json_schema())`}</code></pre>

      <h2>Common JSON Schema Patterns</h2>
      <pre><code className="language-json">{`// API Response envelope
{
  "type": "object",
  "properties": {
    "success": { "type": "boolean" },
    "data": {},
    "error": {
      "type": "object",
      "properties": {
        "code": { "type": "string" },
        "message": { "type": "string" }
      }
    },
    "pagination": {
      "type": "object",
      "properties": {
        "page": { "type": "integer", "minimum": 1 },
        "perPage": { "type": "integer", "minimum": 1, "maximum": 100 },
        "total": { "type": "integer", "minimum": 0 },
        "totalPages": { "type": "integer", "minimum": 0 }
      }
    }
  },
  "required": ["success"]
}

// Environment configuration
{
  "type": "object",
  "properties": {
    "NODE_ENV": { "enum": ["development", "staging", "production"] },
    "PORT": { "type": "integer", "minimum": 1, "maximum": 65535 },
    "DATABASE_URL": { "type": "string", "format": "uri" },
    "LOG_LEVEL": { "enum": ["debug", "info", "warn", "error"] },
    "CORS_ORIGINS": {
      "type": "array",
      "items": { "type": "string", "format": "uri" }
    }
  },
  "required": ["NODE_ENV", "PORT", "DATABASE_URL"]
}`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>What is the difference between JSON Schema and TypeScript types?</h3>
      <p>
        TypeScript types are compile-time constructs that are erased when TypeScript is compiled to JavaScript. They provide no runtime validation. JSON Schema provides runtime validation that can be used to check incoming API data, user input, or configuration files. Many tools can generate TypeScript types from JSON Schema (and vice versa), so you can use both together.
      </p>

      <h3>Which JSON Schema draft should I use?</h3>
      <p>
        Use Draft 2020-12 for new projects. It has the best features including <code>prefixItems</code> for tuple validation, <code>$dynamicRef</code> for advanced composition, and cleaner semantics. Draft-07 is the most widely supported if you need maximum compatibility.
      </p>

      <h3>How do I validate optional fields with specific types?</h3>
      <p>
        Define the property in <code>properties</code> with its type constraints but do not include it in the <code>required</code> array. If the field is present, it must match the schema. If absent, validation passes. For nullable fields, use <code>&quot;type&quot;: [&quot;string&quot;, &quot;null&quot;]</code>.
      </p>

      <h3>Can I generate JSON Schema from existing JSON data?</h3>
      <p>
        Yes. Many tools can infer a JSON Schema from sample data. Our <Link href={`/${lang}/tools/json-to-json-schema`}>JSON to JSON Schema generator</Link> analyzes your JSON and creates a matching schema automatically. You can then refine it by adding constraints like <code>minLength</code>, <code>pattern</code>, and <code>required</code> fields.
      </p>

      <h3>How do I handle recursive data structures in JSON Schema?</h3>
      <p>
        Use <code>$ref</code> to create recursive schemas. Define the schema in <code>$defs</code> and reference it from within itself. For example, a tree node that contains child nodes of the same type: define a &quot;node&quot; schema in <code>$defs</code> with a &quot;children&quot; property that is an array of <code>&#123;&quot;$ref&quot;: &quot;#/$defs/node&quot;&#125;</code>.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-to-json-schema`}>JSON to JSON Schema Generator</Link> - Generate schema from JSON data</li>
        <li><Link href={`/${lang}/tools/json-schema-generator`}>JSON Schema Generator</Link> - Build JSON Schema visually</li>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format and validate JSON data</li>
        <li><Link href={`/${lang}/blog/json-schema-complete-guide`}>JSON Schema Complete Guide</Link> - In-depth schema reference</li>
        <li><Link href={`/${lang}/blog/json-formatter-validator-guide`}>JSON Formatter Guide</Link> - JSON formatting best practices</li>
        <li><Link href={`/${lang}/blog/json-vs-yaml-vs-toml`}>JSON vs YAML vs TOML</Link> - Data format comparison</li>
        <li><Link href={`/${lang}/blog/rest-api-best-practices-guide`}>REST API Best Practices</Link> - API design patterns</li>
        <li><Link href={`/${lang}/blog/json-to-typescript-complete-guide`}>JSON to TypeScript Guide</Link> - Generate types from JSON</li>
      </ul>
    </>
  );
}
