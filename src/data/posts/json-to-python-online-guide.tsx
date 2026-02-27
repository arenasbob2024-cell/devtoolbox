'use client';
import React from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  JSON to Python Online Guide                                         */
/* ------------------------------------------------------------------ */

export default function JsonToPythonOnlineGuide({ lang }: { lang: string }) {
  const l = lang || 'en';
  const toolLink = `/${l}/tools/json-to-python`;

  /* ---------- translations ---------- */
  const translations: Record<string, {
    tldr: string;
    whyTitle: string;
    takeawaysTitle: string;
    tryTool: string;
    faqTitle: string;
  }> = {
    zh: {
      tldr: '使用 json.loads() 将 JSON 解析为 Python 字典，使用 dataclass 获得结构化数据，或使用 Pydantic 进行验证。Pydantic v2 是 API 数据建模的行业标准，具有自动类型强制转换和验证功能。',
      whyTitle: '为什么要将 JSON 映射到 Python 类？',
      takeawaysTitle: '核心要点',
      tryTool: '立即使用免费的 JSON 转 Python 工具 \u2192',
      faqTitle: '常见问题',
    },
    en: {
      tldr: 'Parse JSON in Python using json.loads() for dicts, dataclasses for structured data, or Pydantic for validation. Pydantic v2 is the industry standard for API data modeling with automatic type coercion and validation.',
      whyTitle: 'Why Model JSON with Python Classes?',
      takeawaysTitle: 'Key Takeaways',
      tryTool: 'Try our free JSON to Python tool \u2192',
      faqTitle: 'Frequently Asked Questions',
    },
  };

  const t = translations[l] || translations['en'];

  /* ---------- FAQ items ---------- */
  const faqItems = [
    {
      q: "What's the difference between dataclass and Pydantic BaseModel?",
      a: "Dataclasses are Python stdlib with no validation — they provide structured attribute access and type hints but do not enforce types at runtime. If you pass a string where an int is expected, dataclass will accept it silently. Pydantic BaseModel validates and coerces types at instantiation time, raises ValidationError for invalid data, supports nested models, custom validators, alias handling, and JSON serialization out of the box. Use dataclasses for lightweight internal data structures and Pydantic for API boundaries, configuration, and anywhere data integrity matters.",
    },
    {
      q: 'How do I parse a JSON array in Python?',
      a: "Use json.loads() which returns a Python list when the root JSON value is an array: data = json.loads('[{\"id\": 1}, {\"id\": 2}]') returns a list of dicts. To map each element to a class, use a list comprehension: users = [User(**item) for item in data] for dataclasses, or [User.model_validate(item) for item in data] for Pydantic. With Pydantic you can also use TypeAdapter: adapter = TypeAdapter(list[User]); users = adapter.validate_python(data).",
    },
    {
      q: 'How do I handle optional fields in Python JSON parsing?',
      a: "Use Optional[str] = None (from typing import Optional) or the modern Python 3.10+ syntax str | None = None. In a dataclass: @dataclass class User: name: str; email: Optional[str] = None. In Pydantic: class User(BaseModel): name: str; email: Optional[str] = None. Pydantic also supports field(default=None) for more control: email: str | None = Field(default=None, description='User email'). If the JSON key may be absent entirely, both approaches handle it gracefully when the default is set.",
    },
    {
      q: 'What is Pydantic v2 and how is it different from v1?',
      a: "Pydantic v2 (released June 2023) is rewritten in Rust via the pydantic-core library, making it 5-50x faster than v1. The main API changes: model.dict() is replaced by model.model_dump(), model.json() by model.model_dump_json(), Model.parse_obj() by Model.model_validate(), and validator decorators by @field_validator and @model_validator. The model_config class attribute replaces the inner Config class. Most v1 code can be migrated with minimal changes, and pydantic provides a v1 compatibility layer.",
    },
    {
      q: 'How do I serialize Python objects to JSON?',
      a: "For Pydantic v2 models: model.model_dump() returns a dict, model.model_dump_json() returns a JSON string. For Pydantic v1: model.dict() and model.json(). For dataclasses: import dataclasses; dataclasses.asdict(obj) returns a dict, then pass to json.dumps(). For plain objects: subclass json.JSONEncoder and override default() to handle custom types. json.dumps(data, default=str) is a quick workaround that converts non-serializable types (like datetime) to strings.",
    },
    {
      q: 'How do I handle snake_case in Python vs camelCase in JSON?',
      a: "Pydantic model_config supports alias_generator for automatic mapping. Use model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True) where to_camel comes from pydantic.alias_generators. This allows the model to accept camelCase JSON keys while using snake_case Python attributes. Alternatively use Field(alias='firstName') per field. For deserialization with aliases: User.model_validate(data) respects aliases automatically. For serialization with aliases: model.model_dump(by_alias=True).",
    },
    {
      q: 'Can I use TypedDict instead of dataclass or Pydantic?',
      a: "Yes. TypedDict (from typing import TypedDict) is lightweight and provides type hints without any runtime overhead or object instantiation. It is essentially a dict at runtime — type checkers like mypy and pyright use the hints for static analysis only. TypedDict is ideal when you want documentation and static typing but don't need validation or attribute-style access. It does not support default values, validators, or methods. For full validation, use Pydantic; for runtime attribute access, use dataclasses.",
    },
    {
      q: 'How do I validate nested JSON in Python?',
      a: "With Pydantic, define nested models and use them as field types — validation cascades automatically. Example: class Address(BaseModel): street: str; city: str and class User(BaseModel): name: str; address: Address. Pydantic.model_validate({'name': 'Alice', 'address': {'street': '123 Main', 'city': 'NY'}}) validates both levels and raises ValidationError with field paths for any nested error. For dataclasses, you need to manually instantiate nested objects: user = User(name='Alice', address=Address(**data['address'])).",
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const codeStyle: React.CSSProperties = {
    background: '#1e293b',
    color: '#e2e8f0',
    padding: '16px 20px',
    borderRadius: 8,
    overflowX: 'auto',
    fontSize: 14,
    lineHeight: 1.6,
    marginBottom: 16,
  };

  const inlineCode: React.CSSProperties = {
    background: '#f1f5f9',
    padding: '1px 5px',
    borderRadius: 3,
    fontFamily: 'monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: 26,
    fontWeight: 800,
    marginTop: 48,
    marginBottom: 16,
  };

  const h3Style: React.CSSProperties = {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 24,
    marginBottom: 10,
  };

  const pStyle: React.CSSProperties = {
    fontSize: 15,
    marginBottom: 12,
  };

  return (
    <article style={{ maxWidth: 820, margin: '0 auto', lineHeight: 1.75 }}>
      {/* FAQ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ---- TL;DR Box ---- */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 32,
      }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, marginTop: 0 }}>TL;DR</p>
        <p style={{ margin: 0, fontSize: 15 }}>
          {t.tldr}{' '}
          <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
            {t.tryTool}
          </Link>
        </p>
      </div>

      {/* ---- Key Takeaways ---- */}
      <div style={{
        background: '#f8fafc',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 40,
      }}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, marginTop: 0 }}>{t.takeawaysTitle}</p>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li><code style={inlineCode}>json.loads()</code> deserializes JSON strings to Python dicts; <code style={inlineCode}>json.dumps()</code> serializes back.</li>
          <li><code style={inlineCode}>@dataclass</code> provides type hints but no validation — just structured attribute access.</li>
          <li>Pydantic <code style={inlineCode}>BaseModel</code> validates types, coerces values, and handles complex nested models.</li>
          <li><code style={inlineCode}>Optional[str] = None</code> represents nullable/optional JSON fields in Python.</li>
          <li>Pydantic&apos;s <code style={inlineCode}>model_validator</code> and <code style={inlineCode}>field_validator</code> add custom validation logic.</li>
          <li>FastAPI automatically deserializes request bodies into Pydantic models.</li>
          <li>Use <code style={inlineCode}>model.model_dump()</code> (Pydantic v2) or <code style={inlineCode}>model.dict()</code> (v1) to serialize back to dict.</li>
        </ul>
      </div>

      {/* ---- Section 1: Why Model JSON with Python Classes ---- */}
      <h2 style={h2Style}>Why Model JSON with Python Classes?</h2>
      <p style={pStyle}>
        JSON is the universal data-exchange format for REST APIs, webhooks, and configuration files. When
        you receive JSON in Python, you have several options: work with raw dicts, use the lightweight
        standard library <code style={inlineCode}>dataclasses</code>, or adopt Pydantic&apos;s
        <code style={inlineCode}>BaseModel</code> for full validation. The right choice depends on your
        use case.
      </p>

      <h3 style={h3Style}>Dicts vs Dataclasses vs Pydantic</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Approach</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Validation</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Type Safety</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['dict / json.loads()', 'None', 'Runtime only', 'Quick scripts, one-off parsing'],
              ['@dataclass', 'None', 'Static (mypy)', 'Internal data structures, no external input'],
              ['TypedDict', 'None', 'Static only', 'Type hints on dicts, zero runtime cost'],
              ['Pydantic BaseModel', 'Full', 'Static + Runtime', 'APIs, external data, config validation'],
              ['attrs', 'Optional', 'Static + Runtime', 'High-performance alternative to dataclass'],
            ].map(([approach, validation, typeSafety, bestFor], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontWeight: 600 }}>{approach}</td>
                <td style={{ padding: '8px 14px' }}>{validation}</td>
                <td style={{ padding: '8px 14px' }}>{typeSafety}</td>
                <td style={{ padding: '8px 14px' }}>{bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={pStyle}>
        For production APIs consuming external JSON, Pydantic is the clear winner: it validates types,
        raises structured errors, handles nested models, and integrates natively with FastAPI.
        Dataclasses shine for internal domain objects where you control all inputs.
      </p>
      <p style={{ fontSize: 15, marginBottom: 20 }}>
        <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
          Generate Python dataclasses and Pydantic models from JSON instantly &rarr;
        </Link>
      </p>

      {/* ---- Section 2: Standard json module ---- */}
      <h2 style={h2Style}>Standard json Module: json.loads and json.dumps</h2>
      <p style={pStyle}>
        Python&apos;s built-in <code style={inlineCode}>json</code> module is your starting point. It converts
        between JSON strings and Python native types (dict, list, str, int, float, bool, None).
      </p>
      <pre style={codeStyle}>{`import json

# Deserialize JSON string → Python dict
raw = '{"user_id": 42, "name": "Alice", "active": true}'
data = json.loads(raw)
print(data["name"])   # Alice
print(type(data))     # <class 'dict'>

# Serialize Python dict → JSON string
output = json.dumps(data, indent=2)
print(output)
# {
#   "user_id": 42,
#   "name": "Alice",
#   "active": true
# }

# Reading JSON from a file
with open("config.json") as f:
    config = json.load(f)   # json.load() for file objects

# Writing JSON to a file
with open("output.json", "w") as f:
    json.dump(data, f, indent=2)  # json.dump() for file objects`}</pre>

      <p style={pStyle}>
        The <code style={inlineCode}>json</code> module has no validation — it simply maps JSON types to
        Python types. All values remain generic: numbers become <code style={inlineCode}>int</code> or
        <code style={inlineCode}>float</code>, objects become <code style={inlineCode}>dict</code>, arrays
        become <code style={inlineCode}>list</code>. For structured access with type safety, move to
        dataclasses or Pydantic.
      </p>

      <h3 style={h3Style}>Type Mapping Reference</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>JSON Type</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Python Type</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['string', 'str', '"hello" → "hello"'],
              ['number (integer)', 'int', '42 → 42'],
              ['number (float)', 'float', '3.14 → 3.14'],
              ['boolean', 'bool', 'true → True, false → False'],
              ['null', 'None', 'null → None'],
              ['object', 'dict', '{"key": "val"} → {"key": "val"}'],
              ['array', 'list', '[1, 2, 3] → [1, 2, 3]'],
            ].map(([jsonType, pyType, example], idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace' }}>{jsonType}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace' }}>{pyType}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'monospace', fontSize: 13 }}>{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---- Section 3: Python Dataclasses ---- */}
      <h2 style={h2Style}>Python Dataclasses: @dataclass + from_dict</h2>
      <p style={pStyle}>
        The <code style={inlineCode}>@dataclass</code> decorator (Python 3.7+) automatically generates
        <code style={inlineCode}>__init__</code>, <code style={inlineCode}>__repr__</code>, and
        <code style={inlineCode}>__eq__</code> from class field annotations. It&apos;s stdlib — no extra
        dependencies needed.
      </p>
      <pre style={codeStyle}>{`from dataclasses import dataclass, field, asdict
from typing import Optional, List
import json

@dataclass
class Address:
    street: str
    city: str
    zip_code: str

@dataclass
class User:
    user_id: int
    name: str
    email: str
    address: Address
    tags: List[str] = field(default_factory=list)
    phone: Optional[str] = None

# Manual deserialization from dict
def user_from_dict(data: dict) -> User:
    return User(
        user_id=data["user_id"],
        name=data["name"],
        email=data["email"],
        address=Address(**data["address"]),
        tags=data.get("tags", []),
        phone=data.get("phone"),
    )

raw_json = """
{
  "user_id": 42,
  "name": "Alice",
  "email": "alice@example.com",
  "address": {"street": "123 Main St", "city": "NYC", "zip_code": "10001"},
  "tags": ["admin", "verified"]
}
"""
data = json.loads(raw_json)
user = user_from_dict(data)
print(user.name)           # Alice
print(user.address.city)   # NYC
print(user.phone)          # None

# Serialize back to dict / JSON
user_dict = asdict(user)
user_json = json.dumps(user_dict, indent=2)
print(user_json)`}</pre>

      <p style={pStyle}>
        Dataclasses do not validate types. If the JSON contains <code style={inlineCode}>"user_id": "42"</code> (a
        string), the dataclass will store it as a string without complaint. For type enforcement, use Pydantic.
      </p>

      {/* ---- Section 4: Pydantic v2 ---- */}
      <h2 style={h2Style}>Pydantic v2: BaseModel — The Industry Standard</h2>
      <p style={pStyle}>
        Pydantic v2 (released June 2023) is written in Rust and is 5-50x faster than v1. It validates,
        coerces, and serializes Python data with a minimal, expressive API. Install with:
        <code style={inlineCode}>pip install pydantic</code>
      </p>
      <pre style={codeStyle}>{`from pydantic import BaseModel, Field
from typing import Optional, List
import json

class Address(BaseModel):
    street: str
    city: str
    zip_code: str

class User(BaseModel):
    user_id: int
    name: str
    email: str
    address: Address
    tags: List[str] = Field(default_factory=list)
    phone: Optional[str] = None

raw_json = """
{
  "user_id": "42",
  "name": "Alice",
  "email": "alice@example.com",
  "address": {"street": "123 Main St", "city": "NYC", "zip_code": "10001"},
  "tags": ["admin", "verified"]
}
"""
# Pydantic coerces "42" → 42 automatically
user = User.model_validate_json(raw_json)
print(user.user_id)        # 42  (int, not "42")
print(user.address.city)   # NYC
print(user.phone)          # None

# Serialize to dict
user_dict = user.model_dump()

# Serialize to JSON string
user_json = user.model_dump_json(indent=2)
print(user_json)

# Validate from dict
data = json.loads(raw_json)
user2 = User.model_validate(data)
print(user2.name)          # Alice`}</pre>

      <p style={pStyle}>
        Key Pydantic v2 methods: <code style={inlineCode}>Model.model_validate(dict)</code>,
        <code style={inlineCode}>Model.model_validate_json(str)</code>,
        <code style={inlineCode}>model.model_dump()</code>, and
        <code style={inlineCode}>model.model_dump_json()</code>.
        Invalid data raises <code style={inlineCode}>pydantic.ValidationError</code> with detailed field-level messages.
      </p>

      {/* ---- Section 5: TypedDict ---- */}
      <h2 style={h2Style}>TypedDict for Lightweight Typing</h2>
      <p style={pStyle}>
        <code style={inlineCode}>TypedDict</code> (Python 3.8+) adds type annotations to dicts without
        any runtime overhead. It is essentially a dict — type checkers enforce the shape, but Python
        itself does not validate at runtime.
      </p>
      <pre style={codeStyle}>{`from typing import TypedDict, Optional, List
import json

class AddressDict(TypedDict):
    street: str
    city: str
    zip_code: str

class UserDict(TypedDict, total=False):
    user_id: int
    name: str
    email: str
    address: AddressDict
    tags: List[str]
    phone: Optional[str]

raw_json = '{"user_id": 42, "name": "Alice", "email": "a@b.com"}'
# json.loads returns a plain dict; we "cast" it with type: ignore or cast()
from typing import cast
user: UserDict = cast(UserDict, json.loads(raw_json))
print(user["name"])   # Alice

# mypy / pyright will flag wrong key access at analysis time
# No runtime validation — this is purely for the type checker`}</pre>

      <p style={pStyle}>
        Use <code style={inlineCode}>total=False</code> to make all fields optional, or use
        <code style={inlineCode}>Required</code> / <code style={inlineCode}>NotRequired</code> (Python 3.11+)
        to control individual field optionality.
      </p>

      {/* ---- Section 6: Attrs ---- */}
      <h2 style={h2Style}>Attrs Library: A Powerful Dataclass Alternative</h2>
      <p style={pStyle}>
        The <code style={inlineCode}>attrs</code> library predates Python dataclasses and offers more
        features: validators, converters, slots, and frozen (immutable) instances.
        Install with: <code style={inlineCode}>pip install attrs</code>
      </p>
      <pre style={codeStyle}>{`import attr
from typing import Optional, List
import json

@attr.s(auto_attribs=True)
class User:
    user_id: int
    name: str
    email: str
    tags: List[str] = attr.Factory(list)
    phone: Optional[str] = None

    # Built-in validator example
    @name.validator
    def _check_name(self, attribute, value):
        if len(value) < 1:
            raise ValueError("Name cannot be empty")

raw = {"user_id": 42, "name": "Alice", "email": "alice@example.com"}
user = User(**raw)
print(user.name)    # Alice

# attrs also works with cattrs for structured deserialization
# pip install cattrs
import cattrs
user2 = cattrs.structure(raw, User)
print(user2.user_id)  # 42`}</pre>

      <p style={pStyle}>
        <code style={inlineCode}>attrs</code> with <code style={inlineCode}>cattrs</code> provides
        deserialization similar to Pydantic but with a more explicit API. It&apos;s particularly popular
        in high-performance contexts where slot classes are needed.
      </p>

      {/* ---- Section 7: Nested Models ---- */}
      <h2 style={h2Style}>Nested Models with Pydantic BaseModel</h2>
      <p style={pStyle}>
        Pydantic handles arbitrarily nested JSON structures. Each nested object maps to its own
        <code style={inlineCode}>BaseModel</code> subclass, and validation cascades through all levels.
      </p>
      <pre style={codeStyle}>{`from pydantic import BaseModel
from typing import List

class Tag(BaseModel):
    id: int
    name: str
    color: str = "#000000"

class Company(BaseModel):
    name: str
    domain: str

class User(BaseModel):
    id: int
    username: str
    company: Company
    tags: List[Tag] = []

raw = {
    "id": 1,
    "username": "alice",
    "company": {"name": "Acme Corp", "domain": "acme.com"},
    "tags": [
        {"id": 10, "name": "admin", "color": "#ff0000"},
        {"id": 11, "name": "verified"},  # color uses default
    ]
}

user = User.model_validate(raw)
print(user.company.name)       # Acme Corp
print(user.tags[0].color)      # #ff0000
print(user.tags[1].color)      # #000000

# Serialize nested structure
print(user.model_dump())
# {'id': 1, 'username': 'alice', 'company': {'name': 'Acme Corp', ...}, ...}

# Serialize with JSON indentation
print(user.model_dump_json(indent=2))`}</pre>

      <p style={pStyle}>
        When a nested field fails validation, Pydantic includes the full path in the error:
        <code style={inlineCode}>ValidationError: 1 validation error for User — tags.0.id — Input should be a valid integer</code>.
        This makes debugging API responses significantly easier.
      </p>

      {/* ---- Section 8: Optional / Nullable Fields ---- */}
      <h2 style={h2Style}>Optional and Nullable Fields</h2>
      <p style={pStyle}>
        JSON fields can be absent (missing key) or explicitly null. Python handles both scenarios with
        <code style={inlineCode}>Optional</code> and default values.
      </p>
      <pre style={codeStyle}>{`from pydantic import BaseModel, Field
from typing import Optional
import json

class UserProfile(BaseModel):
    user_id: int
    username: str
    # Optional field: may be absent or null in JSON
    bio: Optional[str] = None
    # Python 3.10+ shorthand: bio: str | None = None

    # Field with metadata and default
    avatar_url: Optional[str] = Field(
        default=None,
        description="URL to profile image",
        examples=["https://cdn.example.com/avatar.png"]
    )
    follower_count: int = Field(default=0, ge=0)  # ge=0 means >= 0

# All these are valid:
p1 = UserProfile(user_id=1, username="alice")
p2 = UserProfile(user_id=2, username="bob", bio=None)
p3 = UserProfile(user_id=3, username="carol", bio="Developer")
print(p1.bio)           # None
print(p3.bio)           # Developer

# JSON with missing optional field
raw = '{"user_id": 4, "username": "dave"}'
p4 = UserProfile.model_validate_json(raw)
print(p4.bio)           # None
print(p4.avatar_url)    # None
print(p4.follower_count) # 0`}</pre>

      {/* ---- Section 9: Enum Handling ---- */}
      <h2 style={h2Style}>Enum Handling in JSON Parsing</h2>
      <p style={pStyle}>
        Use Python&apos;s <code style={inlineCode}>enum.Enum</code> to represent JSON string or integer
        constants. Pydantic automatically validates and coerces enum values.
      </p>
      <pre style={codeStyle}>{`from pydantic import BaseModel
from enum import Enum
from typing import Optional

class UserRole(str, Enum):
    ADMIN = "admin"
    EDITOR = "editor"
    VIEWER = "viewer"

class Priority(int, Enum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3

class Task(BaseModel):
    title: str
    role: UserRole = UserRole.VIEWER
    priority: Priority = Priority.MEDIUM
    assigned_to: Optional[str] = None

# Pydantic coerces string "admin" → UserRole.ADMIN
task = Task.model_validate({
    "title": "Fix bug",
    "role": "admin",
    "priority": 3,
    "assigned_to": "alice"
})
print(task.role)              # UserRole.ADMIN
print(task.role.value)        # admin
print(task.priority)          # Priority.HIGH
print(task.priority.value)    # 3

# Serialization includes enum values by default
print(task.model_dump())
# {'title': 'Fix bug', 'role': <UserRole.ADMIN: 'admin'>, ...}

# To serialize as plain values:
print(task.model_dump(mode='json'))
# {'title': 'Fix bug', 'role': 'admin', 'priority': 3, ...}`}</pre>

      {/* ---- Section 10: Date/Time ---- */}
      <h2 style={h2Style}>Date and Time Handling with datetime</h2>
      <p style={pStyle}>
        JSON has no native date type. Dates are typically serialized as ISO 8601 strings
        (e.g., <code style={inlineCode}>"2026-02-27T14:30:00Z"</code>). Pydantic automatically
        parses ISO 8601 strings into Python <code style={inlineCode}>datetime</code> objects.
      </p>
      <pre style={codeStyle}>{`from pydantic import BaseModel
from datetime import datetime, date, timedelta
from typing import Optional
import json

class Event(BaseModel):
    title: str
    start_at: datetime          # ISO 8601 string → datetime
    end_at: Optional[datetime] = None
    event_date: date            # "2026-02-27" → date
    duration_minutes: int = 60

raw = {
    "title": "Team Standup",
    "start_at": "2026-02-27T09:00:00Z",
    "end_at": "2026-02-27T09:30:00Z",
    "event_date": "2026-02-27",
}
event = Event.model_validate(raw)
print(event.start_at)              # 2026-02-27 09:00:00+00:00
print(type(event.start_at))       # <class 'datetime.datetime'>
print(event.event_date)            # 2026-02-27

# Serialize datetime back to JSON (ISO 8601 string)
serialized = event.model_dump_json()
print(serialized)
# {"title":"Team Standup","start_at":"2026-02-27T09:00:00Z",...}

# For plain dataclasses, convert manually:
import dataclasses
@dataclasses.dataclass
class Event2:
    title: str
    start_at: datetime

raw2 = json.loads('{"title": "Meeting", "start_at": "2026-02-27T10:00:00Z"}')
e2 = Event2(
    title=raw2["title"],
    start_at=datetime.fromisoformat(raw2["start_at"].replace("Z", "+00:00"))
)
print(e2.start_at)  # 2026-02-27 10:00:00+00:00`}</pre>

      {/* ---- Section 11: Custom Validators ---- */}
      <h2 style={h2Style}>Custom Validators with Pydantic @field_validator</h2>
      <p style={pStyle}>
        Pydantic v2 provides <code style={inlineCode}>@field_validator</code> for field-level validation
        and <code style={inlineCode}>@model_validator</code> for cross-field validation. These replace
        v1&apos;s <code style={inlineCode}>@validator</code> decorator.
      </p>
      <pre style={codeStyle}>{`from pydantic import BaseModel, field_validator, model_validator, Field
from typing import Optional
import re

class UserRegistration(BaseModel):
    username: str
    email: str
    password: str
    confirm_password: str
    age: int = Field(ge=0, le=150)

    @field_validator("username")
    @classmethod
    def username_alphanumeric(cls, v: str) -> str:
        if not re.match(r"^[a-zA-Z0-9_]{3,20}$", v):
            raise ValueError(
                "Username must be 3-20 chars, alphanumeric and underscores only"
            )
        return v.lower()

    @field_validator("email")
    @classmethod
    def email_valid(cls, v: str) -> str:
        if "@" not in v or "." not in v.split("@")[-1]:
            raise ValueError("Invalid email address")
        return v.lower()

    @model_validator(mode="after")
    def passwords_match(self) -> "UserRegistration":
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self

# Valid data
user = UserRegistration(
    username="Alice_99",
    email="Alice@Example.COM",
    password="secret123",
    confirm_password="secret123",
    age=30
)
print(user.username)   # alice_99 (lowercased by validator)
print(user.email)      # alice@example.com

# Invalid data raises ValidationError
from pydantic import ValidationError
try:
    UserRegistration(
        username="a",  # too short
        email="not-an-email",
        password="abc",
        confirm_password="xyz",  # mismatch
        age=200  # out of range
    )
except ValidationError as e:
    print(e.error_count(), "errors")  # 4 errors`}</pre>

      {/* ---- Section 12: FastAPI Integration ---- */}
      <h2 style={h2Style}>FastAPI Integration: Automatic JSON Deserialization</h2>
      <p style={pStyle}>
        FastAPI is built on Pydantic. Declare a Pydantic model as a request body parameter and
        FastAPI automatically deserializes the incoming JSON, validates it, and provides IDE-complete
        typed access — no manual parsing needed.
      </p>
      <pre style={codeStyle}>{`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

app = FastAPI()

class CreateUserRequest(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    email: str
    role: str = "viewer"
    tags: List[str] = []

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    role: str
    created_at: datetime
    tags: List[str]

@app.post("/users", response_model=UserResponse, status_code=201)
async def create_user(body: CreateUserRequest):
    # FastAPI has already validated body against CreateUserRequest
    # body.username, body.email etc. are fully typed
    new_user = {
        "id": 100,
        "username": body.username,
        "email": body.email,
        "role": body.role,
        "created_at": datetime.utcnow(),
        "tags": body.tags,
    }
    return UserResponse(**new_user)

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int):
    # Path params are also validated by FastAPI
    if user_id <= 0:
        raise HTTPException(status_code=404, detail="User not found")
    return UserResponse(
        id=user_id,
        username="alice",
        email="alice@example.com",
        role="admin",
        created_at=datetime.utcnow(),
        tags=["verified"]
    )

# FastAPI auto-generates OpenAPI docs at /docs
# Invalid JSON bodies return 422 Unprocessable Entity with field-level errors`}</pre>

      <p style={pStyle}>
        FastAPI uses the <code style={inlineCode}>response_model</code> parameter to automatically
        filter and serialize the response using the specified Pydantic model, ensuring the output
        matches the declared shape and excluding any extra fields.
      </p>

      {/* ---- Section 13: Tools ---- */}
      <h2 style={h2Style}>
        Generate Python Classes Instantly with DevToolBox
      </h2>
      <p style={pStyle}>
        Writing Pydantic models or dataclasses by hand from complex JSON is tedious and error-prone.
        The{' '}
        <Link href={`/${l}/tools/json-to-python`} style={{ color: '#2563eb', fontWeight: 600 }}>
          DevToolBox JSON to Python converter
        </Link>{' '}
        at{' '}
        <Link href="https://viadreams.cc/en/tools/json-to-python" style={{ color: '#2563eb' }}>
          viadreams.cc/en/tools/json-to-python
        </Link>{' '}
        generates production-ready Pydantic v2 models and dataclasses from any JSON payload:
      </p>
      <ul style={{ fontSize: 15, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
        <li>Paste any JSON object or array — get instant Python classes</li>
        <li>Supports Pydantic v2 <code style={inlineCode}>BaseModel</code>, <code style={inlineCode}>@dataclass</code>, and <code style={inlineCode}>TypedDict</code> output</li>
        <li>Handles nested objects, arrays, optional fields, and mixed types</li>
        <li>Generates <code style={inlineCode}>Optional[T]</code> for nullable fields automatically</li>
        <li>Free to use, no sign-up required, works in-browser</li>
      </ul>
      <p style={{ fontSize: 15, marginBottom: 20 }}>
        <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>
          Open the JSON to Python tool now &rarr;
        </Link>
      </p>

      <p style={pStyle}>
        Related tools also available on DevToolBox:{' '}
        <Link href={`/${l}/tools/json-formatter`} style={{ color: '#2563eb' }}>JSON Formatter</Link>,{' '}
        <Link href={`/${l}/tools/json-validator`} style={{ color: '#2563eb' }}>JSON Validator</Link>,{' '}
        <Link href={`/${l}/tools/json-to-typescript`} style={{ color: '#2563eb' }}>JSON to TypeScript</Link>.
      </p>

      {/* ---- Section 14: Common Pitfalls ---- */}
      <h2 style={h2Style}>Common Pitfalls and How to Avoid Them</h2>

      <h3 style={h3Style}>1. JSON Numbers: int vs float Ambiguity</h3>
      <p style={pStyle}>
        JSON does not distinguish integers from floats — <code style={inlineCode}>42</code> and
        <code style={inlineCode}>42.0</code> are both valid numbers. Python&apos;s
        <code style={inlineCode}>json.loads()</code> maps integers to <code style={inlineCode}>int</code>
        and decimals to <code style={inlineCode}>float</code>, but <code style={inlineCode}>42.0</code>
        becomes a float, not an int. Pydantic coerces <code style={inlineCode}>42.0</code> to
        <code style={inlineCode}>42</code> when the field is typed as <code style={inlineCode}>int</code>.
      </p>
      <pre style={codeStyle}>{`import json
from pydantic import BaseModel

data = json.loads('{"count": 42.0}')
print(type(data["count"]))  # <class 'float'>

class MyModel(BaseModel):
    count: int

m = MyModel.model_validate(data)
print(m.count)              # 42 (int) — Pydantic coerced it
print(type(m.count))        # <class 'int'>

# But precision loss is possible for large floats:
data2 = json.loads('{"value": 9007199254740993.0}')
print(data2["value"])       # May lose precision!
# Use Decimal for financial data:
from decimal import Decimal
from pydantic import BaseModel
class Financial(BaseModel):
    amount: Decimal`}</pre>

      <h3 style={h3Style}>2. datetime Serialization Pitfalls</h3>
      <p style={pStyle}>
        <code style={inlineCode}>datetime</code> objects are not JSON-serializable by default. Using
        <code style={inlineCode}>{'json.dumps({"ts": datetime.utcnow()})'}</code> raises a
        <code style={inlineCode}>TypeError: Object of type datetime is not JSON serializable</code>.
        Use Pydantic&apos;s <code style={inlineCode}>model_dump_json()</code> which handles datetime
        automatically, or use <code style={inlineCode}>json.dumps(data, default=str)</code> as a quick
        workaround.
      </p>
      <pre style={codeStyle}>{`from datetime import datetime
import json

now = datetime.utcnow()

# This FAILS:
# json.dumps({"ts": now})  # TypeError!

# Quick fix (loses timezone info):
print(json.dumps({"ts": now}, default=str))
# {"ts": "2026-02-27 14:30:00.123456"}

# Better: use isoformat()
print(json.dumps({"ts": now.isoformat() + "Z"}))
# {"ts": "2026-02-27T14:30:00.123456Z"}

# Best: use Pydantic (handles tz, precision, ISO 8601)
from pydantic import BaseModel
class Event(BaseModel):
    ts: datetime

e = Event(ts=now)
print(e.model_dump_json())
# {"ts":"2026-02-27T14:30:00.123456"}`}</pre>

      <h3 style={h3Style}>3. snake_case vs camelCase Mapping</h3>
      <p style={pStyle}>
        JSON APIs often use camelCase keys (e.g., <code style={inlineCode}>userId</code>), but Python
        convention is snake_case (<code style={inlineCode}>user_id</code>). Pydantic handles this
        with <code style={inlineCode}>alias_generator</code>:
      </p>
      <pre style={codeStyle}>{`from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel

class UserResponse(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True  # allow both alias and field name
    )
    user_id: int
    first_name: str
    last_name: str
    is_active: bool = True

# Accepts camelCase JSON
user = UserResponse.model_validate({
    "userId": 42,
    "firstName": "Alice",
    "lastName": "Smith"
})
print(user.user_id)      # 42
print(user.first_name)   # Alice

# Serializes with camelCase aliases
print(user.model_dump(by_alias=True))
# {'userId': 42, 'firstName': 'Alice', 'lastName': 'Smith', 'isActive': True}`}</pre>

      <h3 style={h3Style}>4. Mutable Default Arguments in Dataclasses</h3>
      <p style={pStyle}>
        Never use mutable defaults like <code style={inlineCode}>tags: list = []</code> in a dataclass —
        this is a common Python footgun where all instances share the same list object. Use
        <code style={inlineCode}>field(default_factory=list)</code> instead:
      </p>
      <pre style={codeStyle}>{`from dataclasses import dataclass, field
from typing import List, Dict

@dataclass
class User:
    name: str
    # WRONG — all User instances share same list!
    # tags: List[str] = []

    # CORRECT — new list per instance
    tags: List[str] = field(default_factory=list)
    metadata: Dict[str, str] = field(default_factory=dict)

u1 = User(name="Alice")
u2 = User(name="Bob")
u1.tags.append("admin")
print(u2.tags)   # [] — separate list, not affected`}</pre>

      {/* ---- FAQ Section ---- */}
      <h2 style={{ ...h2Style, marginTop: 56 }}>{t.faqTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {faqItems.map((item, idx) => (
          <details
            key={idx}
            style={{
              borderBottom: '1px solid #e2e8f0',
              padding: '16px 0',
            }}
          >
            <summary style={{
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              listStyle: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              {item.q}
              <span style={{ fontSize: 20, marginLeft: 12, flexShrink: 0 }}>+</span>
            </summary>
            <p style={{ marginTop: 12, marginBottom: 0, fontSize: 15, color: '#374151' }}>{item.a}</p>
          </details>
        ))}
      </div>

      {/* ---- Final CTA ---- */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: 8,
        padding: '20px 24px',
        marginTop: 48,
        textAlign: 'center',
      }}>
        <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, marginTop: 0 }}>
          Ready to convert your JSON to Python?
        </p>
        <p style={{ fontSize: 15, marginBottom: 16, color: '#374151' }}>
          Use our free online tool to instantly generate Pydantic models, dataclasses, and TypedDicts
          from any JSON payload. No sign-up, no installation required.
        </p>
        <Link
          href={toolLink}
          style={{
            display: 'inline-block',
            background: '#2563eb',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            textDecoration: 'none',
          }}
        >
          Open JSON to Python Tool &rarr;
        </Link>
      </div>
    </article>
  );
}
