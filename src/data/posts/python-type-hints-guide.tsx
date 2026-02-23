'use client';
import React from 'react';

const codeBasicTypes = `# Python type hints — basic built-in types
def greet(name: str) -> str:
    return f"Hello, {name}!"

def add(x: int, y: int) -> int:
    return x + y

def ratio(total: int, count: int) -> float:
    return total / count

def is_valid(value: str) -> bool:
    return len(value) > 0

# Variables can be annotated too
user_id: int = 42
username: str = "alice"
scores: list[int] = [95, 87, 92]`;

const codeCollections = `from typing import Optional, Union, Any

# Python 3.9+: use built-in generics directly
names: list[str] = ["Alice", "Bob"]
counts: dict[str, int] = {"apples": 3, "bananas": 5}
coords: tuple[float, float] = (51.5, -0.1)
unique_ids: set[int] = {1, 2, 3}

# Optional: value may be None
def find_user(user_id: int) -> Optional[str]:
    db = {1: "Alice", 2: "Bob"}
    return db.get(user_id)  # may return None

# Union: multiple possible types (Python 3.10+: use X | Y)
def process(value: Union[int, str]) -> str:
    return str(value)

# Python 3.10+ syntax
def process_new(value: int | str) -> str:
    return str(value)

# Any: opt out of type checking
def legacy(data: Any) -> Any:
    return data`;

const codeTypingModule = `from typing import (
    Callable, Iterator, Generator,
    TypeVar, Generic, Protocol,
    TypedDict, Literal, Final,
    overload, cast, TYPE_CHECKING
)

# Callable: function signatures
Handler = Callable[[str, int], bool]

def apply(func: Callable[[int], int], value: int) -> int:
    return func(value)

# TypeVar: generic type parameters
T = TypeVar('T')
K = TypeVar('K')
V = TypeVar('V')

def first(items: list[T]) -> T:
    return items[0]

# Generic class
class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

    def is_empty(self) -> bool:
        return len(self._items) == 0

# Usage
stack: Stack[int] = Stack()
stack.push(1)
stack.push(2)
result: int = stack.pop()  # mypy knows this is int

# Literal: restrict to specific values
def set_direction(direction: Literal["left", "right", "up", "down"]) -> None:
    print(f"Moving {direction}")

# Final: constant that cannot be reassigned
MAX_SIZE: Final = 100

# TypedDict: typed dictionaries
class UserDict(TypedDict):
    name: str
    age: int
    email: str

def process_user(user: UserDict) -> str:
    return f"{user['name']} ({user['age']})"`;

const codeProtocol = `from typing import Protocol, runtime_checkable

# Protocol: structural subtyping (duck typing with types)
@runtime_checkable
class Drawable(Protocol):
    def draw(self) -> None: ...
    def get_color(self) -> str: ...

class Circle:
    def draw(self) -> None:
        print("Drawing circle")
    def get_color(self) -> str:
        return "red"

class Square:
    def draw(self) -> None:
        print("Drawing square")
    def get_color(self) -> str:
        return "blue"

def render(shape: Drawable) -> None:
    print(f"Color: {shape.get_color()}")
    shape.draw()

# Both work without inheriting from Drawable
render(Circle())
render(Square())

# Runtime check (requires @runtime_checkable)
print(isinstance(Circle(), Drawable))  # True`;

const codeDataclasses = `from dataclasses import dataclass, field
from typing import ClassVar

@dataclass
class Point:
    x: float
    y: float

    def distance_to(self, other: 'Point') -> float:
        return ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 0.5

@dataclass
class Employee:
    name: str
    department: str
    salary: float
    skills: list[str] = field(default_factory=list)
    _id_counter: ClassVar[int] = 0

    def __post_init__(self) -> None:
        Employee._id_counter += 1
        self.employee_id: int = Employee._id_counter

    def add_skill(self, skill: str) -> None:
        self.skills.append(skill)

# Frozen dataclass (immutable)
@dataclass(frozen=True)
class Color:
    r: int
    g: int
    b: int

    def to_hex(self) -> str:
        return f"#{self.r:02x}{self.g:02x}{self.b:02x}"

red = Color(255, 0, 0)
print(red.to_hex())  # #ff0000`;

const codeMypyConfig = `# mypy.ini
[mypy]
python_version = 3.12
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = True
disallow_any_generics = True
check_untyped_defs = True
strict_optional = True
no_implicit_optional = True

# Ignore missing stubs for third-party packages
[mypy-requests.*]
ignore_missing_imports = True

[mypy-numpy.*]
ignore_missing_imports = True`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Python Type Hints Complete Guide: typing, mypy, dataclasses, Protocol',
    intro: 'Python type hints (introduced in PEP 484, Python 3.5+) allow you to annotate your code with type information. They do not affect runtime behavior — Python remains dynamically typed — but enable static analysis tools like mypy, pyright, and IDE autocompletion to catch bugs before you run your code. In 2026, type hints are standard practice for any serious Python project.',
    basicTitle: 'Basic Type Annotations',
    basicDesc: 'Type annotations use a colon after variable or parameter names, and -> for return types. Python 3.9+ allows using built-in generics directly (list[str] instead of List[str]).',
    collectionsTitle: 'Collections and Optional Types',
    collectionsDesc: 'The typing module provides generic versions of collections and special forms for nullable and union types.',
    typingTitle: 'Advanced typing Module Features',
    typingDesc: 'The typing module offers powerful constructs for describing complex type relationships: Callable, TypeVar, Generic classes, Literal, Final, and TypedDict.',
    protocolTitle: 'Protocol: Structural Subtyping',
    protocolDesc: 'Protocol enables duck typing with type safety. Instead of requiring inheritance, Protocol checks that an object has the required methods and attributes.',
    dataclassTitle: 'dataclasses with Type Hints',
    dataclassDesc: 'dataclasses combine perfectly with type hints, providing auto-generated __init__, __repr__, and __eq__ based on annotated fields.',
    mypyTitle: 'Running mypy and Configuration',
    mypyDesc: 'mypy is the most popular static type checker for Python. Install it with pip install mypy, then run it on your code.',
    mypyRun: '# Install and run mypy\npip install mypy\nmypy src/\n\n# With strict mode (catches more issues)\nmypy --strict src/\n\n# Check a single file\nmypy mymodule.py',
    comparisonTitle: 'Type Hint Syntax: Python Version Comparison',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Start with return types and public API parameters — they give the most value for the least effort.',
    bp2: 'Use Optional[X] or X | None (Python 3.10+) whenever a value can be None. Never use Any unless interfacing with truly dynamic code.',
    bp3: 'Run mypy in CI with --strict or at least --disallow-untyped-defs to prevent type annotation regression.',
    bp4: 'Use Protocol over ABC for structural typing — it works without the class hierarchy.',
    bp5: 'Use TypedDict for dictionary structures, dataclasses for data objects, NamedTuple for lightweight immutable records.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Do Python type hints slow down my code?',
    faq1a: 'No. Type hints are completely ignored at runtime (unless you use typing.get_type_hints() explicitly). They add zero runtime overhead. The Python interpreter processes them as expressions that evaluate to nothing relevant.',
    faq2q: 'What is the difference between mypy and pyright?',
    faq2a: 'mypy is the original Python type checker, developed by Guido van Rossum\'s team. pyright is Microsoft\'s type checker, used in VS Code (Pylance). pyright is generally faster and stricter. Both support the same PEP standards. For CI, mypy is more configurable. For IDE integration, pyright (via Pylance) is excellent.',
    faq3q: 'When should I use TypeVar vs Protocol?',
    faq3a: 'Use TypeVar when you need generic functions or classes where the type is preserved (e.g., a function that returns the same type it receives). Use Protocol when you want to type-check that an object has certain methods/attributes, regardless of its class hierarchy.',
    faq4q: 'How do I type hint *args and **kwargs?',
    faq4a: 'Use *args: int for positional variadic arguments (all must be the same type), and **kwargs: str for keyword variadic arguments. For mixed types, use *args: Any. Python 3.11+ introduces TypeVarTuple for variadic generics.',
    faq5q: 'Should I add type hints to existing Python code?',
    faq5a: 'Yes, incrementally. Start with public functions and class methods. Use "# type: ignore" sparingly to suppress errors in complex third-party integrations. Enable mypy on new files first, then gradually expand coverage. The benefit compounds over time as the codebase grows.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Python 类型提示完整指南：typing、mypy、dataclasses、Protocol',
    intro: 'Python 类型提示（PEP 484 引入，Python 3.5+）允许你用类型信息注解代码。它们不影响运行时行为——Python 仍然是动态类型——但允许 mypy、pyright 等静态分析工具和 IDE 自动补全在运行代码之前发现错误。在 2026 年，类型提示是任何认真的 Python 项目的标准实践。',
    basicTitle: '基本类型注解',
    basicDesc: '类型注解在变量或参数名后使用冒号，返回类型使用 ->。Python 3.9+ 允许直接使用内置泛型（list[str] 而非 List[str]）。',
    collectionsTitle: '集合和可选类型',
    collectionsDesc: 'typing 模块为集合提供泛型版本，并为可空和联合类型提供特殊形式。',
    typingTitle: '高级 typing 模块特性',
    typingDesc: 'typing 模块提供了描述复杂类型关系的强大构造：Callable、TypeVar、泛型类、Literal、Final 和 TypedDict。',
    protocolTitle: 'Protocol：结构化子类型',
    protocolDesc: 'Protocol 支持带类型安全的鸭子类型。Protocol 不要求继承，而是检查对象是否具有所需的方法和属性。',
    dataclassTitle: '带类型提示的 dataclasses',
    dataclassDesc: 'dataclasses 与类型提示完美结合，根据注解字段自动生成 __init__、__repr__ 和 __eq__。',
    mypyTitle: '运行 mypy 和配置',
    mypyDesc: 'mypy 是最流行的 Python 静态类型检查器。用 pip install mypy 安装，然后在代码上运行它。',
    mypyRun: '# 安装并运行 mypy\npip install mypy\nmypy src/\n\n# 严格模式（发现更多问题）\nmypy --strict src/\n\n# 检查单个文件\nmypy mymodule.py',
    comparisonTitle: '类型提示语法：Python 版本对比',
    bestPracticesTitle: '最佳实践',
    bp1: '从返回类型和公共 API 参数开始——以最小的工作量获得最大的价值。',
    bp2: '当值可以为 None 时，使用 Optional[X] 或 X | None（Python 3.10+）。除非与真正的动态代码接口，否则永远不要使用 Any。',
    bp3: '在 CI 中使用 --strict 或至少 --disallow-untyped-defs 运行 mypy，以防止类型注解退步。',
    bp4: '对结构化类型使用 Protocol 而非 ABC——它无需类层次结构即可工作。',
    bp5: '对字典结构使用 TypedDict，对数据对象使用 dataclasses，对轻量级不可变记录使用 NamedTuple。',
    faqTitle: '常见问题',
    faq1q: 'Python 类型提示会降低代码速度吗？',
    faq1a: '不会。类型提示在运行时完全被忽略（除非显式使用 typing.get_type_hints()）。它们不增加任何运行时开销。Python 解释器将它们作为无关紧要的表达式处理。',
    faq2q: 'mypy 和 pyright 有什么区别？',
    faq2a: 'mypy 是最初的 Python 类型检查器，由 Guido van Rossum 团队开发。pyright 是微软的类型检查器，用于 VS Code（Pylance）。pyright 通常更快、更严格。两者都支持相同的 PEP 标准。对于 CI，mypy 更易配置。对于 IDE 集成，pyright（通过 Pylance）非常出色。',
    faq3q: '什么时候使用 TypeVar vs Protocol？',
    faq3a: '当需要保留类型的泛型函数或类时使用 TypeVar（例如，返回与接收相同类型的函数）。当想要类型检查对象是否具有某些方法/属性（不管其类层次结构）时使用 Protocol。',
    faq4q: '如何为 *args 和 **kwargs 添加类型提示？',
    faq4a: '使用 *args: int 表示位置可变参数（所有参数必须是相同类型），使用 **kwargs: str 表示关键字可变参数。对于混合类型，使用 *args: Any。Python 3.11+ 引入了 TypeVarTuple 用于可变泛型。',
    faq5q: '我应该为现有 Python 代码添加类型提示吗？',
    faq5a: '是的，逐步添加。从公共函数和类方法开始。谨慎使用 "# type: ignore" 来抑制复杂第三方集成中的错误。先在新文件上启用 mypy，然后逐步扩大覆盖范围。随着代码库增长，收益会随时间累积。',
    relatedTitle: '相关工具',
  },
};

export default function PythonTypeHintsGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  const versionRows = [
    { feature: 'Basic annotations', py38: 'typing.List, Dict', py39: 'list, dict', py310: 'list, dict', py312: 'list, dict' },
    { feature: 'Union types', py38: 'Union[X, Y]', py39: 'Union[X, Y]', py310: 'X | Y', py312: 'X | Y' },
    { feature: 'Optional', py38: 'Optional[X]', py39: 'Optional[X]', py310: 'X | None', py312: 'X | None' },
    { feature: 'TypeAlias', py38: 'MyType = ...', py39: 'MyType = ...', py310: 'TypeAlias', py312: 'type MyType = ...' },
    { feature: 'ParamSpec', py38: 'N/A', py39: 'N/A', py310: 'ParamSpec', py312: 'ParamSpec' },
    { feature: 'Self type', py38: 'N/A', py39: 'N/A', py310: 'N/A', py312: 'Self' },
  ];

  const preStyle: React.CSSProperties = { background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <h2>{t.basicTitle}</h2>
      <p>{t.basicDesc}</p>
      <pre style={preStyle}><code>{codeBasicTypes}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.collectionsTitle}</h2>
      <p>{t.collectionsDesc}</p>
      <pre style={preStyle}><code>{codeCollections}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.typingTitle}</h2>
      <p>{t.typingDesc}</p>
      <pre style={preStyle}><code>{codeTypingModule}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.protocolTitle}</h2>
      <p>{t.protocolDesc}</p>
      <pre style={preStyle}><code>{codeProtocol}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.dataclassTitle}</h2>
      <p>{t.dataclassDesc}</p>
      <pre style={preStyle}><code>{codeDataclasses}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.mypyTitle}</h2>
      <p>{t.mypyDesc}</p>
      <pre style={preStyle}><code>{t.mypyRun}</code></pre>
      <h3 style={{ marginTop: '1.5rem' }}>mypy.ini Configuration</h3>
      <pre style={preStyle}><code>{codeMypyConfig}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.comparisonTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Feature</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Python 3.8</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Python 3.9</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Python 3.10</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Python 3.12</th>
            </tr>
          </thead>
          <tbody>
            {versionRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 500 }}>{row.feature}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace', fontSize: '0.8rem' }}>{row.py38}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace', fontSize: '0.8rem' }}>{row.py39}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace', fontSize: '0.8rem' }}>{row.py310}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace', fontSize: '0.8rem' }}>{row.py312}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.bestPracticesTitle}</h2>
      <ul style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
      </ul>

      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #48bb78' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><a href="/en/tools/json-to-python" style={{ color: '#3182ce' }}>JSON to Python</a></li>
          <li><a href="/en/tools/regex-tester" style={{ color: '#3182ce' }}>Regex Tester</a></li>
          <li><a href="/en/tools/json-formatter" style={{ color: '#3182ce' }}>JSON Formatter</a></li>
        </ul>
      </div>
    </article>
  );
}
