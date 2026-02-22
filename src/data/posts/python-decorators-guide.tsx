'use client';

import Link from 'next/link';

export default function PythonDecoratorsGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Are Python Decorators?</h2>
      <p>
        A <strong>decorator</strong> in Python is a function that takes another function as input and extends its behavior without modifying it. Decorators are one of Python's most powerful features, enabling clean separation of concerns, code reuse, and elegant metaprogramming. They are used extensively in frameworks like Flask, Django, FastAPI, and pytest.
      </p>
      <p>
        At its core, a decorator is syntactic sugar for higher-order functions. When you write <code>@decorator</code> above a function definition, Python passes that function to the decorator and replaces it with the return value.
      </p>
      <pre><code className="language-python">{`# These two are equivalent:

# Using decorator syntax
@my_decorator
def say_hello():
    print("Hello!")

# Manual decoration
def say_hello():
    print("Hello!")
say_hello = my_decorator(say_hello)`}</code></pre>

      <h2>Creating Your First Decorator</h2>
      <pre><code className="language-python">{`import functools

def my_decorator(func):
    @functools.wraps(func)  # Preserves original function metadata
    def wrapper(*args, **kwargs):
        print(f"Before calling {func.__name__}")
        result = func(*args, **kwargs)
        print(f"After calling {func.__name__}")
        return result
    return wrapper

@my_decorator
def greet(name):
    """Greet someone by name."""
    print(f"Hello, {name}!")
    return f"Greeted {name}"

# Usage
result = greet("Alice")
# Output:
# Before calling greet
# Hello, Alice!
# After calling greet

# Metadata is preserved thanks to @functools.wraps
print(greet.__name__)  # "greet" (not "wrapper")
print(greet.__doc__)   # "Greet someone by name."`}</code></pre>

      <h3>Why functools.wraps Matters</h3>
      <p>
        Without <code>@functools.wraps</code>, the decorated function loses its original name, docstring, and other metadata. This causes problems with debugging, documentation generation, and introspection tools. Always use <code>@functools.wraps(func)</code> in your decorators.
      </p>

      <h2>Practical Decorator Examples</h2>

      <h3>1. Timing Decorator</h3>
      <pre><code className="language-python">{`import functools
import time

def timer(func):
    """Measure execution time of a function."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def fetch_data(url):
    """Simulate fetching data."""
    time.sleep(1.2)
    return {"status": "ok"}

fetch_data("https://api.example.com")
# Output: fetch_data took 1.2003s`}</code></pre>

      <h3>2. Retry Decorator</h3>
      <pre><code className="language-python">{`import functools
import time
import random

def retry(max_attempts=3, delay=1.0, backoff=2.0, exceptions=(Exception,)):
    """Retry a function on failure with exponential backoff."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            current_delay = delay

            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    if attempt < max_attempts:
                        # Add jitter to prevent thundering herd
                        jitter = random.uniform(0, current_delay * 0.1)
                        sleep_time = current_delay + jitter
                        print(f"Attempt {attempt} failed: {e}. "
                              f"Retrying in {sleep_time:.1f}s...")
                        time.sleep(sleep_time)
                        current_delay *= backoff
                    else:
                        print(f"All {max_attempts} attempts failed")

            raise last_exception
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5, exceptions=(ConnectionError, TimeoutError))
def call_api(endpoint):
    """Call an external API."""
    if random.random() < 0.7:
        raise ConnectionError("Connection refused")
    return {"data": "success"}

# Will retry up to 3 times with exponential backoff
result = call_api("/users")`}</code></pre>

      <h3>3. Caching / Memoization Decorator</h3>
      <pre><code className="language-python">{`import functools
from typing import Any

def memoize(func):
    """Cache function results based on arguments."""
    cache = {}

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # Create a hashable key from args and kwargs
        key = (args, tuple(sorted(kwargs.items())))

        if key not in cache:
            cache[key] = func(*args, **kwargs)

        return cache[key]

    wrapper.cache = cache  # Expose cache for inspection
    wrapper.clear_cache = cache.clear  # Allow cache clearing
    return wrapper

@memoize
def fibonacci(n):
    """Calculate fibonacci number (recursive)."""
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(100))  # Instant, without memoization this takes forever

# Python has a built-in alternative:
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci_builtin(n):
    if n < 2:
        return n
    return fibonacci_builtin(n - 1) + fibonacci_builtin(n - 2)

# Check cache stats
print(fibonacci_builtin.cache_info())
# CacheInfo(hits=98, misses=101, maxsize=128, currsize=101)`}</code></pre>

      <h3>4. Authentication / Authorization Decorator</h3>
      <pre><code className="language-python">{`import functools

def require_auth(func):
    """Ensure user is authenticated before calling function."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # In a real app, check session/token
        request = kwargs.get('request') or (args[0] if args else None)
        if not request or not getattr(request, 'user', None):
            raise PermissionError("Authentication required")
        return func(*args, **kwargs)
    return wrapper

def require_role(*roles):
    """Ensure user has one of the specified roles."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            request = kwargs.get('request') or (args[0] if args else None)
            user_role = getattr(request, 'user_role', None)
            if user_role not in roles:
                raise PermissionError(
                    f"Requires one of {roles}, got {user_role}"
                )
            return func(*args, **kwargs)
        return wrapper
    return decorator

# Stack multiple decorators
@require_auth
@require_role('admin', 'moderator')
def delete_user(request, user_id):
    """Delete a user (admin/moderator only)."""
    print(f"Deleting user {user_id}")
    return {"deleted": user_id}`}</code></pre>

      <h3>5. Rate Limiting Decorator</h3>
      <pre><code className="language-python">{`import functools
import time
from collections import defaultdict

def rate_limit(max_calls, period):
    """Limit function calls to max_calls per period (seconds)."""
    calls = defaultdict(list)

    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            key = func.__name__

            # Remove expired timestamps
            calls[key] = [t for t in calls[key] if now - t < period]

            if len(calls[key]) >= max_calls:
                wait = period - (now - calls[key][0])
                raise RuntimeError(
                    f"Rate limit exceeded. Try again in {wait:.1f}s"
                )

            calls[key].append(now)
            return func(*args, **kwargs)
        return wrapper
    return decorator

@rate_limit(max_calls=5, period=60)
def send_email(to, subject, body):
    """Send an email (max 5 per minute)."""
    print(f"Sending email to {to}: {subject}")
    return True`}</code></pre>

      <h2>Decorators with Arguments</h2>
      <p>
        When a decorator needs arguments, you add an extra level of nesting. The outer function takes the decorator arguments, the middle function takes the function being decorated, and the inner function is the actual wrapper.
      </p>
      <pre><code className="language-python">{`import functools

def repeat(n=2):
    """Call the function n times and return results as a list."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(n):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

@repeat(n=3)
def roll_dice():
    import random
    return random.randint(1, 6)

print(roll_dice())  # [4, 2, 6]

# Flexible decorator (works with and without arguments)
def flexible_decorator(func=None, *, debug=False):
    """Can be used as @flexible_decorator or @flexible_decorator(debug=True)."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            if debug:
                print(f"Calling {func.__name__}({args}, {kwargs})")
            result = func(*args, **kwargs)
            if debug:
                print(f"{func.__name__} returned {result}")
            return result
        return wrapper

    if func is not None:
        return decorator(func)  # Called without arguments
    return decorator  # Called with arguments

@flexible_decorator
def add(a, b):
    return a + b

@flexible_decorator(debug=True)
def multiply(a, b):
    return a * b`}</code></pre>

      <h2>Class-Based Decorators</h2>
      <p>
        Decorators can also be implemented as classes using the <code>__call__</code> method. This is useful when the decorator needs to maintain state.
      </p>
      <pre><code className="language-python">{`import functools
import time

class CountCalls:
    """Track how many times a function is called."""

    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"{self.func.__name__} called {self.count} times")
        return self.func(*args, **kwargs)

@CountCalls
def process_item(item):
    return item.upper()

process_item("hello")   # process_item called 1 times
process_item("world")   # process_item called 2 times
print(process_item.count)  # 2

# Class decorator with arguments
class Throttle:
    """Ensure minimum interval between calls."""

    def __init__(self, min_interval=1.0):
        self.min_interval = min_interval
        self.last_call = 0

    def __call__(self, func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            elapsed = now - self.last_call

            if elapsed < self.min_interval:
                wait = self.min_interval - elapsed
                time.sleep(wait)

            self.last_call = time.time()
            return func(*args, **kwargs)
        return wrapper

@Throttle(min_interval=0.5)
def rapid_fire():
    print(f"Called at {time.time():.2f}")

for _ in range(3):
    rapid_fire()  # Each call separated by at least 0.5s`}</code></pre>

      <h2>Decorating Classes</h2>
      <p>
        Decorators are not limited to functions. You can decorate classes to modify their behavior, add methods, or register them in a registry.
      </p>
      <pre><code className="language-python">{`import functools

# Add methods to a class
def add_repr(cls):
    """Auto-generate __repr__ from __init__ parameters."""
    original_init = cls.__init__

    @functools.wraps(original_init)
    def new_init(self, *args, **kwargs):
        self._init_args = args
        self._init_kwargs = kwargs
        original_init(self, *args, **kwargs)

    def __repr__(self):
        args = [repr(a) for a in self._init_args]
        kwargs = [f"{k}={v!r}" for k, v in self._init_kwargs.items()]
        params = ", ".join(args + kwargs)
        return f"{self.__class__.__name__}({params})"

    cls.__init__ = new_init
    cls.__repr__ = __repr__
    return cls

@add_repr
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

print(Point(3, 4))  # Point(3, 4)

# Plugin/handler registry
class Registry:
    """Registry decorator for plugins."""

    def __init__(self):
        self._handlers = {}

    def register(self, name=None):
        def decorator(cls):
            key = name or cls.__name__
            self._handlers[key] = cls
            return cls
        return decorator

    def get(self, name):
        return self._handlers.get(name)

    def list(self):
        return list(self._handlers.keys())

handlers = Registry()

@handlers.register("json")
class JsonHandler:
    def parse(self, data):
        import json
        return json.loads(data)

@handlers.register("csv")
class CsvHandler:
    def parse(self, data):
        return data.split(",")

# Use the registry
handler = handlers.get("json")()
result = handler.parse('{"key": "value"}')`}</code></pre>

      <h2>Built-in Python Decorators</h2>
      <pre><code className="language-python">{`# @property - Create managed attributes
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self):
        import math
        return math.pi * self._radius ** 2

circle = Circle(5)
print(circle.area)    # 78.54
circle.radius = 10    # Uses setter
# circle.radius = -1  # Raises ValueError

# @staticmethod - No access to instance or class
class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b

# @classmethod - Access to the class, not instance
class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    @classmethod
    def from_string(cls, date_string):
        year, month, day = map(int, date_string.split('-'))
        return cls(year, month, day)

    @classmethod
    def today(cls):
        import datetime
        d = datetime.date.today()
        return cls(d.year, d.month, d.day)

date = Date.from_string('2026-02-22')

# @abstractmethod - Define interface contracts
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass`}</code></pre>

      <h2>Real-World Framework Examples</h2>
      <pre><code className="language-python">{`# Flask route decorators
from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify({"users": []})

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    return jsonify({"id": user_id})

# FastAPI with type hints
from fastapi import FastAPI, Depends
app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

# pytest fixtures and markers
import pytest

@pytest.fixture
def sample_data():
    return {"name": "test", "value": 42}

@pytest.mark.parametrize("input,expected", [
    ("hello", 5),
    ("world", 5),
    ("", 0),
])
def test_string_length(input, expected):
    assert len(input) == expected

# Django decorators
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import cache_page

@login_required
@cache_page(60 * 15)  # Cache for 15 minutes
def dashboard(request):
    return render(request, 'dashboard.html')`}</code></pre>

      <h2>Advanced: Decorator Stacking</h2>
      <p>
        When you stack multiple decorators, they are applied bottom-up. Understanding this order is crucial for correct behavior.
      </p>
      <pre><code className="language-python">{`@decorator_a    # Applied second (outermost)
@decorator_b    # Applied first (innermost)
def my_function():
    pass

# Equivalent to:
# my_function = decorator_a(decorator_b(my_function))

# Example: logging + timing + auth
@require_auth          # 3rd: Check auth before anything
@timer                 # 2nd: Time the authenticated operation
@retry(max_attempts=3) # 1st: Retry on failure
def fetch_protected_data(request, resource_id):
    return api.get(f"/resources/{resource_id}")

# Execution flow:
# 1. require_auth checks authentication
# 2. timer starts measuring
# 3. retry wrapper catches exceptions and retries
# 4. fetch_protected_data executes`}</code></pre>

      <h2>Common Pitfalls</h2>
      <ul>
        <li><strong>Forgetting @functools.wraps:</strong> Always use it to preserve the original function's metadata</li>
        <li><strong>Not returning the result:</strong> The wrapper must <code>return func(*args, **kwargs)</code>, not just call it</li>
        <li><strong>Mutable default arguments in decorators:</strong> Use factory functions or instance variables instead of mutable defaults</li>
        <li><strong>Decorator order matters:</strong> Stack decorators carefully -- the bottom decorator is applied first</li>
        <li><strong>Performance overhead:</strong> Each decorator adds a function call. For hot code paths, consider alternatives</li>
        <li><strong>Testing decorated functions:</strong> Access the original function via <code>func.__wrapped__</code> when needed</li>
      </ul>

      <h2>Summary</h2>
      <p>
        Python decorators are a powerful metaprogramming tool that enables clean, reusable, and composable code. Start with simple function decorators for cross-cutting concerns like logging, timing, and caching. Progress to decorators with arguments for configurable behavior, and class-based decorators for stateful decorators. Always use <code>@functools.wraps</code>, understand the stacking order, and leverage Python's built-in decorators (<code>@property</code>, <code>@classmethod</code>, <code>@staticmethod</code>) in your class designs. Decorators are used throughout the Python ecosystem, so mastering them makes you more effective with every Python framework.
      </p>
    </>
  );
}
