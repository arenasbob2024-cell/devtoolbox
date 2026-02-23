---
title: "Python Decorators Explained: From Basics to Advanced Patterns 2026"
tags: python, programming, webdev, beginners
canonical_url: https://viadreams.cc/en/blog/python-decorators-guide
published: true
---

Python decorators are one of the most powerful features in the language. Once you understand them, you'll use them everywhere. Here's everything you need to know.

## What is a Decorator?

A decorator is a function that takes another function and extends its behavior without modifying it. It's syntactic sugar for wrapping functions.

```python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before")
        result = func(*args, **kwargs)
        print("After")
        return result
    return wrapper

@my_decorator
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
# Before
# Hello, Alice!
# After
```

This is equivalent to `greet = my_decorator(greet)`.

## Preserving Function Metadata

Without `functools.wraps`, decorated functions lose their identity:

```python
import functools

def my_decorator(func):
    @functools.wraps(func)  # Preserves __name__, __doc__, etc.
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet(name):
    """Greet someone by name."""
    print(f"Hello, {name}!")

print(greet.__name__)  # greet (not wrapper)
print(greet.__doc__)   # Greet someone by name.
```

**Always use `@functools.wraps`** in your decorators.

## Decorators with Arguments

To pass arguments to a decorator, add another layer of nesting:

```python
def retry(max_attempts=3, delay=1.0):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=5, delay=0.5)
def fetch_data(url):
    return requests.get(url).json()
```

## Common Real-World Decorators

### Timing and Performance

```python
import time
import functools

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"{func.__name__} took {end - start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "done"
```

### Caching/Memoization

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Or use cache (unlimited size, Python 3.9+)
from functools import cache

@cache
def expensive_computation(x, y):
    return x ** y + sum(range(x * y))
```

### Input Validation

```python
def validate_types(**type_map):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            sig = inspect.signature(func)
            bound = sig.bind(*args, **kwargs)
            for param_name, expected_type in type_map.items():
                if param_name in bound.arguments:
                    value = bound.arguments[param_name]
                    if not isinstance(value, expected_type):
                        raise TypeError(
                            f"{param_name} must be {expected_type.__name__}, "
                            f"got {type(value).__name__}"
                        )
            return func(*args, **kwargs)
        return wrapper
    return decorator

@validate_types(name=str, age=int)
def create_user(name, age):
    return {"name": name, "age": age}
```

### Authentication (Flask/FastAPI pattern)

```python
from functools import wraps
from flask import g, redirect, url_for

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if g.user is None:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')
```

### Rate Limiting

```python
import time
from collections import defaultdict

def rate_limit(calls_per_second=1):
    min_interval = 1.0 / calls_per_second
    last_called = defaultdict(float)
    
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            now = time.time()
            elapsed = now - last_called[func]
            if elapsed < min_interval:
                time.sleep(min_interval - elapsed)
            last_called[func] = time.time()
            return func(*args, **kwargs)
        return wrapper
    return decorator

@rate_limit(calls_per_second=2)
def api_call(endpoint):
    return requests.get(endpoint)
```

## Class-Based Decorators

For stateful decorators, use classes:

```python
class CountCalls:
    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.count = 0
    
    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"Call #{self.count} to {self.func.__name__}")
        return self.func(*args, **kwargs)

@CountCalls
def say_hello():
    print("Hello!")

say_hello()  # Call #1 to say_hello
say_hello()  # Call #2 to say_hello
print(say_hello.count)  # 2
```

## Stacking Decorators

Multiple decorators are applied bottom-up:

```python
@timer
@retry(max_attempts=3)
@login_required
def fetch_user_data(user_id):
    return db.query(user_id)

# Equivalent to:
# fetch_user_data = timer(retry(max_attempts=3)(login_required(fetch_user_data)))
```

## Property Decorators

Built-in `@property` is a decorator:

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

temp = Temperature(100)
print(temp.fahrenheit)  # 212.0
temp.celsius = 200      # Uses setter
```

## Decorator Best Practices

1. **Always use `@functools.wraps`** to preserve metadata
2. **Return the wrapper's result** — easy to forget
3. **Handle `*args, **kwargs`** for flexibility
4. **Test decorated functions** — the original function is still accessible via `func.__wrapped__`
5. **Prefer function decorators over class decorators** for simplicity

## When to Use Decorators

✅ Logging, timing, caching  
✅ Authentication and authorization  
✅ Input validation and type checking  
✅ Retry logic and error handling  
✅ Rate limiting  
✅ Before/after hooks  

❌ Complex business logic (use regular functions)  
❌ When it obscures what a function does  
❌ When simple if-statements would be clearer  

Decorators are a cornerstone of Python's expressiveness. Use [DevToolBox's Python tools](https://viadreams.cc/en/tools/json-formatter) to format and validate Python-related JSON configs.
