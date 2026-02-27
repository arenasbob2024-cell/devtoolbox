---
title: "JSON to Python: Complete Guide to Dataclasses, Pydantic, and JSON Parsing"
tags: python, json, fastapi, backend
canonical_url: https://viadreams.cc/en/blog/json-to-python-online-guide
published: true
---

Parse JSON in Python with dataclasses or Pydantic. Here's the complete guide.

## Standard json Module

```python
import json
from typing import Any

# Parse JSON string
data: dict[str, Any] = json.loads(json_string)

# Parse JSON file
with open('data.json') as f:
    data = json.load(f)

# Serialize to JSON
json_string = json.dumps(data, indent=2)

# Python → JSON type mapping:
# str → string, int/float → number, bool → boolean
# list → array, dict → object, None → null
```

## Python Dataclasses

```python
from dataclasses import dataclass, field, asdict
from typing import Optional

@dataclass
class User:
    id: int
    name: str
    email: str
    bio: Optional[str] = None
    tags: list[str] = field(default_factory=list)

def from_dict(cls, data: dict):
    return cls(**{k: data[k] for k in data if k in cls.__dataclass_fields__})

user = from_dict(User, json.loads(json_string))
print(asdict(user))  # Back to dict
```

## Pydantic v2 (Recommended)

```python
from pydantic import BaseModel, Field
from typing import Optional

class User(BaseModel):
    id: int
    name: str
    email: str
    bio: Optional[str] = None
    avatar_url: Optional[str] = Field(default=None, alias="avatarUrl")

    class Config:
        populate_by_name = True  # allow both field name and alias

# From JSON string
user = User.model_validate_json(json_string)

# From dict
user = User.model_validate({"id": 1, "name": "Alice", "email": "alice@example.com"})

# To dict
data = user.model_dump()

# To JSON
json_str = user.model_dump_json()
```

## TypedDict (Lightweight)

```python
from typing import TypedDict, Optional, cast

class User(TypedDict):
    id: int
    name: str
    email: str
    bio: Optional[str]

# No runtime validation — just type hints
data = json.loads(json_string)
user = cast(User, data)
print(user["name"])  # type: str
```

## Nested Models

```python
class Address(BaseModel):
    street: str
    city: str
    zip: str

class Customer(BaseModel):
    name: str
    email: str
    address: Address  # Nested model — validated automatically

class Order(BaseModel):
    order_id: str
    customer: Customer
    items: list[str]
    total: float

# Full nested validation from dict
order = Order.model_validate(json.loads(json_string))
print(order.customer.address.city)
```

## Optional Fields

```python
from pydantic import BaseModel
from typing import Optional

class Profile(BaseModel):
    id: int
    name: str
    bio: Optional[str] = None           # null → None
    age: int | None = None              # Python 3.10+ union syntax
    score: float = 0.0                  # default value for missing fields
```

## Custom Validators

```python
from pydantic import BaseModel, field_validator, model_validator

class User(BaseModel):
    name: str
    email: str
    age: int

    @field_validator('email')
    @classmethod
    def email_must_be_valid(cls, v: str) -> str:
        if '@' not in v:
            raise ValueError('Invalid email address')
        return v.lower()

    @field_validator('age')
    @classmethod
    def age_must_be_positive(cls, v: int) -> int:
        if v < 0:
            raise ValueError('Age must be non-negative')
        return v
```

## FastAPI Integration

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class CreateUserRequest(BaseModel):
    name: str
    email: str
    age: int | None = None

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

@app.post("/users", response_model=UserResponse)
async def create_user(request: CreateUserRequest):
    # request is automatically parsed and validated from JSON body
    new_user = await db.create_user(request.name, request.email)
    return UserResponse(id=new_user.id, name=new_user.name, email=new_user.email)
```

## Quick Tool

For automatic Python class generation from JSON, use **[DevToolBox JSON to Python converter](https://viadreams.cc/en/tools/json-to-python)** — paste JSON, get dataclass or Pydantic model instantly.

---

*Generate Python dataclasses and Pydantic models from JSON instantly with [DevToolBox's free JSON to Python tool](https://viadreams.cc/en/tools/json-to-python).*
