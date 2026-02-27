---
title: "Fake Data Generator: Generate Mock Data Online — Complete Guide"
tags: javascript, python, testing, webdev
canonical_url: https://viadreams.cc/en/blog/fake-data-generator-online-guide
published: true
---

Generate realistic fake data for testing and development. Complete guide with Faker.js, Python Faker, Factory Boy, database seeding, and TypeScript type-safe mocks.

## Faker.js (JavaScript/TypeScript)

```bash
npm install @faker-js/faker
```

```javascript
import { faker } from '@faker-js/faker';

// Basic usage
faker.person.fullName()         // "John Smith"
faker.internet.email()          // "john.smith@gmail.com"
faker.location.streetAddress()  // "123 Main St"
faker.phone.number()            // "+1 555-123-4567"
faker.string.uuid()             // "d1e8a700-..."
faker.date.birthdate()          // Date object

// Deterministic (same output every time)
faker.seed(42);
faker.person.fullName();  // always "Maximillian Mayer"
```

## Structured Fake Objects

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  address: { street: string; city: string; country: string };
}

function createUser(overrides?: Partial<User>): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.countryCode(),
    },
    ...overrides,
  };
}

// Generate 100 users
const users = Array.from({ length: 100 }, () => createUser());
```

## Database Seeding (Prisma)

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  // Create 50 users with 3 posts each
  await Promise.all(
    Array.from({ length: 50 }, async () => {
      const user = await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          posts: {
            create: Array.from({ length: 3 }, () => ({
              title: faker.lorem.sentence(),
              content: faker.lorem.paragraphs(3),
            })),
          },
        },
      });
    })
  );
}
```

## Python Faker

```python
from faker import Faker
fake = Faker('en_US')  # or 'zh_CN', 'ja_JP', 'de_DE', etc.

fake.name()           # "John Smith"
fake.email()          # "john@example.com"
fake.address()        # "123 Main St\nNew York, NY 10001"
fake.phone_number()   # "+1-555-123-4567"
fake.uuid4()          # "d1e8a700-..."
fake.date_of_birth()  # datetime.date(1985, 3, 15)
fake.text(200)        # 200-char lorem text
```

## Factory Boy (Python)

```python
import factory
from factory.django import DjangoModelFactory
from myapp.models import User, Post

class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
    
    name = factory.Faker('name')
    email = factory.Faker('email')
    
    # Derived field
    username = factory.LazyAttribute(lambda o: o.email.split('@')[0])
    
    # Sequence for unique values
    employee_id = factory.Sequence(lambda n: f'EMP{n:04d}')

class PostFactory(DjangoModelFactory):
    class Meta:
        model = Post
    
    # SubFactory for relationships
    author = factory.SubFactory(UserFactory)
    title = factory.Faker('sentence')

# Usage
user = UserFactory()            # single user
users = UserFactory.create_batch(50)  # 50 users
post = PostFactory(author__name="John")  # override nested
```

## TypeScript Zod + zod-mock

```typescript
import { z } from 'zod';
import { generateMock } from '@anatine/zod-mock';

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().int().min(18).max(99),
});

type User = z.infer<typeof UserSchema>;

// Auto-generate mock matching schema
const mockUser: User = generateMock(UserSchema);
```

## Quick Tool

Use **[DevToolBox Fake Data Generator](https://viadreams.cc/en/tools/fake-data)** — generate realistic fake data for names, emails, addresses, and more instantly.

---

*Generate mock data with [DevToolBox's free Fake Data Generator](https://viadreams.cc/en/tools/fake-data).*
