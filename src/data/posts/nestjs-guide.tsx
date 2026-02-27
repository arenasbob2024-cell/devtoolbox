'use client';

import React from 'react';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is NestJS and why should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NestJS is a TypeScript-first Node.js framework that brings Angular-inspired architecture to the backend. It is built on top of Express (or Fastify) and adds a powerful module system, dependency injection, decorators, and built-in support for REST APIs, GraphQL, WebSockets, microservices, and more. Use it when you need a scalable, maintainable, enterprise-grade Node.js application with strong conventions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is NestJS better than Express.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NestJS and Express solve different problems. Express is minimal and flexible — great for small APIs and microservices where you want full control. NestJS provides opinionated architecture with built-in dependency injection, modules, decorators, and TypeScript support — better for large teams and complex enterprise apps. NestJS actually runs on top of Express by default, so you do not sacrifice compatibility. Choose NestJS when structure and maintainability matter more than minimalism.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are NestJS modules and why are they important?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Modules are the fundamental building blocks of NestJS applications. Each module is a class decorated with @Module() that encapsulates a related set of controllers, services, and providers. Modules enforce clear boundaries between features, enable dependency injection scoping, and make it easy to import/export functionality between different parts of the application. Every NestJS app has at least one root module (AppModule).',
      },
    },
    {
      '@type': 'Question',
      name: 'How does dependency injection work in NestJS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NestJS has a built-in IoC (Inversion of Control) container that manages class instantiation automatically. You mark a class as injectable with @Injectable(), register it as a provider in a module, and then inject it into any controller or service via the constructor. NestJS resolves the dependency graph at startup, creates singleton instances by default, and injects them wherever they are needed. This eliminates manual wiring and makes code testable.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I implement JWT authentication in NestJS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the @nestjs/jwt and @nestjs/passport packages. Install passport-jwt strategy, create an AuthModule with JwtModule.register(), write an AuthService that signs tokens with jwtService.sign(), create a JwtStrategy class that validates tokens, and protect routes with @UseGuards(JwtAuthGuard). The guard automatically calls the strategy to verify the Bearer token from the Authorization header.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Guards, Interceptors, and Pipes in NestJS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Guards determine if a request should proceed (authorization checks) and return true/false. Interceptors wrap the request/response cycle and can transform data before or after route handlers — useful for logging, caching, or response transformation. Pipes transform or validate incoming data (DTOs) before it reaches the controller. They run in order: Guards first, then Interceptors (before), then Pipes, then the route handler, then Interceptors (after).',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I connect NestJS to a database?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NestJS has official integration packages for TypeORM (@nestjs/typeorm), Mongoose (@nestjs/mongoose), Prisma, and Sequelize. For TypeORM: install @nestjs/typeorm and typeorm, add TypeOrmModule.forRoot() to AppModule with your database config, then use TypeOrmModule.forFeature([Entity]) in feature modules to inject repositories. For Prisma: install the Prisma CLI, generate your client, create a PrismaService that extends PrismaClient, and inject it into your services.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I test NestJS applications?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NestJS includes built-in testing utilities via @nestjs/testing. For unit tests, use Test.createTestingModule() to create an isolated module with mocked dependencies, then test controllers and services in isolation. For e2e tests, use the same module builder with supertest to make real HTTP requests against an in-memory app. NestJS CLI generates spec files automatically with each resource. Run tests with npm run test (unit) and npm run test:e2e (end-to-end).',
      },
    },
  ],
};

const translations = {
  en: {
    title: 'NestJS Complete Guide: TypeScript Node.js Framework in 2026',
    description:
      'Master NestJS from scratch with this comprehensive tutorial. Learn modules, controllers, services, dependency injection, TypeORM/Prisma database integration, JWT authentication, Guards, Pipes, Interceptors, and testing with Jest in 2026.',
    tldr: 'NestJS is a TypeScript-first Node.js framework with Angular-inspired architecture. Install with npm i -g @nestjs/cli && nest new my-app. Core concepts: Modules (feature boundaries), Controllers (HTTP handlers), Services (business logic), Providers (DI tokens). Protect routes with Guards, transform data with Pipes, log/cache with Interceptors. Integrate databases via TypeORM or Prisma. Test with Jest using Test.createTestingModule().',
  },
  zh: {
    title: 'NestJS 完整指南：2026 年 TypeScript Node.js 框架',
    description:
      '从零开始掌握 NestJS。本教程涵盖模块、控制器、服务、依赖注入、TypeORM/Prisma 数据库集成、JWT 认证、Guards、Pipes、Interceptors 以及 Jest 测试。',
    tldr: 'NestJS 是 TypeScript 优先的 Node.js 框架，采用 Angular 风格的架构。通过 npm i -g @nestjs/cli && nest new my-app 安装。核心概念：Modules（功能边界）、Controllers（HTTP 处理器）、Services（业务逻辑）、Providers（DI 令牌）。使用 Guards 保护路由，使用 Pipes 转换数据，使用 Interceptors 实现日志/缓存。通过 TypeORM 或 Prisma 集成数据库，使用 Test.createTestingModule() 进行 Jest 测试。',
  },
};

function EnglishContent() {
  return (
    <>
      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          padding: '16px',
          margin: '24px 0',
          borderRadius: '4px',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          TL;DR — NestJS Quick Reference
        </strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: '1.8' }}>
          {translations.en.tldr}
        </p>
      </div>

      <h2>What Is NestJS?</h2>
      <p>
        <strong>NestJS</strong> is a progressive, TypeScript-first Node.js framework for building efficient, scalable
        server-side applications. Created by Kamil Mysliwiec in 2017, NestJS draws heavy inspiration from
        <strong> Angular</strong> — bringing decorators, dependency injection, and a module-based architecture to the
        Node.js backend world.
      </p>
      <p>
        Under the hood, NestJS is built on top of <strong>Express.js</strong> by default (with optional Fastify
        support), giving you access to the entire Express ecosystem while layering on powerful abstractions that make
        large applications maintainable.
      </p>
      <p>
        As of 2026, NestJS has over <strong>65,000 GitHub stars</strong>, 9+ million weekly npm downloads, and is
        used in production by companies like Adidas, Roche, Autodesk, and hundreds of enterprise engineering teams.
      </p>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          padding: '20px',
          borderRadius: '8px',
          margin: '24px 0',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '12px' }}>
          Key Takeaways
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', lineHeight: '1.8' }}>
          <li>NestJS is TypeScript-first and runs on Express or Fastify under the hood.</li>
          <li>Modules, Controllers, Services, and Providers form the four pillars of every NestJS app.</li>
          <li>Built-in dependency injection (IoC container) wires classes together automatically.</li>
          <li>Decorators like <code>@Controller()</code>, <code>@Get()</code>, <code>@Injectable()</code> drive the framework.</li>
          <li>Guards handle authorization, Pipes validate/transform data, Interceptors wrap the request lifecycle.</li>
          <li>Use TypeORM or Prisma for database access with first-party integration modules.</li>
          <li>JWT authentication is implemented via <code>@nestjs/passport</code> and <code>@nestjs/jwt</code>.</li>
          <li>Testing is built-in: <code>Test.createTestingModule()</code> creates isolated test environments.</li>
        </ul>
      </div>

      <h2>Installation and Project Setup</h2>
      <p>
        The NestJS CLI is the recommended way to scaffold a new project. It generates the initial file structure,
        sets up TypeScript configuration, installs all required dependencies, and even initializes a Git repository.
      </p>
      <pre><code className="language-bash">{`# Install the NestJS CLI globally
npm install -g @nestjs/cli

# Create a new project
nest new my-nestjs-app

# Choose your preferred package manager (npm, yarn, or pnpm)
# The CLI scaffolds the entire project for you

cd my-nestjs-app

# Start the development server with hot reload
npm run start:dev
# Application is running on: http://localhost:3000`}</code></pre>

      <p>The generated project structure looks like this:</p>
      <pre><code className="language-bash">{`my-nestjs-app/
├── src/
│   ├── app.controller.ts       # Root controller
│   ├── app.controller.spec.ts  # Unit test for root controller
│   ├── app.module.ts           # Root module
│   ├── app.service.ts          # Root service
│   └── main.ts                 # Application entry point
├── test/
│   ├── app.e2e-spec.ts         # End-to-end test
│   └── jest-e2e.json           # e2e Jest config
├── nest-cli.json               # NestJS CLI config
├── tsconfig.json               # TypeScript config
└── package.json`}</code></pre>

      <p>The entry point <code>main.ts</code> bootstraps the application:</p>
      <pre><code className="language-typescript">{`// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe (recommended for all apps)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        // Strip properties not in DTO
    forbidNonWhitelisted: true, // Throw on extra properties
    transform: true,        // Auto-transform payloads to DTO types
  }));

  // Enable CORS for frontend apps
  app.enableCors();

  // Global prefix for all routes
  app.setGlobalPrefix('api/v1');

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();`}</code></pre>

      <h2>Core Concepts: Modules and Architecture</h2>
      <p>
        NestJS applications are organized around <strong>modules</strong>. A module is a class annotated with the{' '}
        <code>@Module()</code> decorator. It provides metadata that NestJS uses to organize the application structure.
      </p>
      <p>
        Every application has at least one module — the <strong>root module</strong> (<code>AppModule</code>). Feature
        modules group related functionality: a Users module handles everything about users, a Products module handles
        products, and so on.
      </p>

      <h3>The @Module() Decorator</h3>
      <pre><code className="language-typescript">{`// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import entity repositories
  ],
  controllers: [UsersController],    // Handle incoming HTTP requests
  providers: [UsersService],         // Business logic + DI providers
  exports: [UsersService],           // Make service available to other modules
})
export class UsersModule {}

// src/app.module.ts — Root module
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // Disable in production!
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}`}</code></pre>

      <h3>Generating Modules with the CLI</h3>
      <pre><code className="language-bash">{`# Generate a complete module with controller, service, and spec files
nest generate module users
nest generate controller users
nest generate service users

# Or use the resource shorthand (generates CRUD boilerplate)
nest generate resource users
# ? What transport layer do you use? REST API
# ? Would you like to generate CRUD entry points? Yes
# Creates: users.module.ts, users.controller.ts, users.service.ts,
#          entities/user.entity.ts, dto/create-user.dto.ts, dto/update-user.dto.ts`}</code></pre>

      <h2>Controllers and Services</h2>
      <p>
        Controllers are responsible for handling incoming HTTP requests and returning responses. They are thin layers
        that delegate actual business logic to <strong>services</strong>.
      </p>
      <p>
        Services contain all the business logic and data-access code. Keeping controllers thin and services fat is
        a NestJS best practice — it makes both easier to test independently.
      </p>

      <h3>Controllers with Decorators</h3>
      <pre><code className="language-typescript">{`// src/users/users.controller.ts
import {
  Controller, Get, Post, Put, Delete, Patch,
  Body, Param, Query, ParseIntPipe, HttpCode, HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users') // All routes: /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users?page=1&limit=20
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.usersService.findAll({ page, limit });
  }

  // GET /users/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // POST /users
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // PATCH /users/:id (protected by JWT Guard)
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  // DELETE /users/:id
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}`}</code></pre>

      <h3>Services: Business Logic Layer</h3>
      <pre><code className="language-typescript">{`// src/users/users.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(options: { page: number; limit: number }) {
    const { page, limit } = options;
    const [users, total] = await this.userRepository.findAndCount({
      select: ['id', 'email', 'name', 'createdAt'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return {
      data: users,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'name', 'createdAt'],
    });
    if (!user) {
      throw new NotFoundException('User #' + id + ' not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existing) {
      throw new ConflictException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}`}</code></pre>

      <h3>Data Transfer Objects (DTOs) with class-validator</h3>
      <pre><code className="language-typescript">{`// src/users/dto/create-user.dto.ts
import {
  IsEmail, IsString, MinLength, MaxLength,
  IsOptional, IsEnum
} from 'class-validator';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole = UserRole.USER;
}

// Install: npm install class-validator class-transformer
// ValidationPipe in main.ts automatically validates incoming bodies`}</code></pre>

      <h2>Dependency Injection in Depth</h2>
      <p>
        Dependency Injection (DI) is the core pattern that makes NestJS applications testable and maintainable.
        NestJS's IoC container automatically instantiates and wires dependencies, so you never write{' '}
        <code>new SomeService()</code> manually.
      </p>
      <p>
        When NestJS starts up, it scans all modules, builds a dependency graph, and instantiates every provider
        exactly once (singleton scope by default). When a controller or service declares a dependency in its
        constructor, NestJS injects the pre-created instance automatically.
      </p>

      <h3>Provider Scopes</h3>
      <pre><code className="language-typescript">{`import { Injectable, Scope } from '@nestjs/common';

// DEFAULT — Singleton: one instance shared across the entire application
@Injectable()
export class SingletonService {}

// REQUEST — New instance created for each incoming request
@Injectable({ scope: Scope.REQUEST })
export class RequestScopedService {}

// TRANSIENT — New instance every time it is injected
@Injectable({ scope: Scope.TRANSIENT })
export class TransientService {}`}</code></pre>

      <h3>Custom Providers</h3>
      <pre><code className="language-typescript">{`// Value provider — inject a config object
const configProvider = {
  provide: 'APP_CONFIG',
  useValue: {
    apiUrl: process.env.API_URL,
    timeout: 5000,
  },
};

// Factory provider — inject the result of a factory function
const databaseProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async (configService: ConfigService) => {
    const connection = await createConnection({
      host: configService.get('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
    });
    return connection;
  },
  inject: [ConfigService], // Dependencies of the factory
};

// Class provider — substitute one class for another (useful for testing)
const loggerProvider = {
  provide: Logger,
  useClass: process.env.NODE_ENV === 'test' ? MockLogger : Logger,
};

@Module({
  providers: [configProvider, databaseProvider, loggerProvider],
})
export class AppModule {}

// Inject a custom provider with @Inject()
@Injectable()
export class UserService {
  constructor(
    @Inject('APP_CONFIG') private config: AppConfig,
    @Inject('DATABASE_CONNECTION') private db: Connection,
  ) {}
}`}</code></pre>

      <h3>Circular Dependencies and forwardRef</h3>
      <pre><code className="language-typescript">{`// When two services depend on each other, use forwardRef()
// service-a.ts
@Injectable()
export class ServiceA {
  constructor(
    @Inject(forwardRef(() => ServiceB))
    private serviceB: ServiceB,
  ) {}
}

// service-b.ts
@Injectable()
export class ServiceB {
  constructor(
    @Inject(forwardRef(() => ServiceA))
    private serviceA: ServiceA,
  ) {}
}

// Note: Circular dependencies are usually a design smell.
// Prefer refactoring to a shared third service instead.`}</code></pre>

      <h2>Database Integration with TypeORM and Prisma</h2>
      <p>
        NestJS provides official integration packages for the most popular Node.js ORMs. TypeORM is tightly
        integrated with NestJS's decorator-based approach, while Prisma offers a schema-first approach with
        exceptional type safety and developer experience.
      </p>

      <h3>TypeORM Integration</h3>
      <pre><code className="language-bash">{`# Install TypeORM and the NestJS integration package
npm install @nestjs/typeorm typeorm pg

# For MySQL/MariaDB use: mysql2
# For SQLite use: sqlite3
# For MongoDB use: mongodb`}</code></pre>

      <pre><code className="language-typescript">{`// src/users/entities/user.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, OneToMany,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ select: false }) // Excluded from SELECT by default
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// src/posts/entities/post.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.posts, { eager: false })
  author: User;

  @CreateDateColumn()
  createdAt: Date;
}

// Using QueryBuilder for complex queries
async findUserWithPosts(userId: number) {
  return this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.posts', 'post')
    .where('user.id = :id', { id: userId })
    .andWhere('user.isActive = :active', { active: true })
    .orderBy('post.createdAt', 'DESC')
    .getOne();
}`}</code></pre>

      <h3>Prisma Integration</h3>
      <pre><code className="language-bash">{`# Install Prisma
npm install prisma @prisma/client
npx prisma init

# Define your schema in prisma/schema.prisma
# Then generate the Prisma client
npx prisma generate

# Apply migrations
npx prisma migrate dev --name init`}</code></pre>

      <pre><code className="language-typescript">{`// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  password  String
  role      String   @default("user")
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
}

// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

// src/users/users.service.ts (Prisma version)
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, name: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, 12),
      },
    });
  }
}`}</code></pre>

      <h2>Authentication and Guards</h2>
      <p>
        Authentication in NestJS is typically implemented using <strong>Passport.js</strong> strategies wrapped in
        the <code>@nestjs/passport</code> package. The most common pattern uses JWT (JSON Web Tokens) for stateless
        authentication — perfect for REST APIs and microservices.
      </p>

      <h3>Setting Up JWT Authentication</h3>
      <pre><code className="language-bash">{`npm install @nestjs/passport @nestjs/jwt passport passport-jwt
npm install --save-dev @types/passport-jwt`}</code></pre>

      <pre><code className="language-typescript">{`// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    const { password: _, ...result } = user;
    return result;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.login(user.email, createUserDto.password);
  }
}`}</code></pre>

      <h3>JWT Strategy and Guard</h3>
      <pre><code className="language-typescript">{`// src/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecret',
    });
  }

  async validate(payload: JwtPayload) {
    // This return value is attached to req.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}

// src/auth/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// src/auth/guards/roles.guard.ts
import {
  Injectable, CanActivate, ExecutionContext, ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) throw new ForbiddenException('Insufficient permissions');
    return true;
  }
}

// src/auth/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// Usage in a controller
@Get('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
getAdminData(@Request() req) {
  return { message: 'Admin only data', user: req.user };
}`}</code></pre>

      <h3>Auth Controller</h3>
      <pre><code className="language-typescript">{`// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}`}</code></pre>

      <h2>Pipes, Interceptors, and Exception Filters</h2>
      <p>
        NestJS provides three powerful mechanisms to intercept and transform the request/response lifecycle beyond
        simple guards. These run in a specific order: Guards → Interceptors (before) → Pipes → Handler → Interceptors (after) → Filters (on exception).
      </p>

      <h3>Custom Pipes</h3>
      <p>
        Pipes transform incoming data (e.g., string to number) or validate it before it reaches a route handler.
        NestJS ships with built-in pipes: <code>ValidationPipe</code>, <code>ParseIntPipe</code>,{' '}
        <code>ParseUUIDPipe</code>, <code>DefaultValuePipe</code>.
      </p>
      <pre><code className="language-typescript">{`// Custom pipe: trim and lowercase a string
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class TrimLowercasePipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (typeof value !== 'string') {
      throw new BadRequestException('Expected a string value');
    }
    return value.trim().toLowerCase();
  }
}

// Custom pipe: parse and validate a positive integer
@Injectable()
export class ParsePositiveIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val) || val <= 0) {
      throw new BadRequestException('Expected a positive integer');
    }
    return val;
  }
}

// Use in a controller
@Get('search')
search(@Query('q', TrimLowercasePipe) query: string) {
  return this.searchService.search(query);
}

@Get(':id')
findOne(@Param('id', ParsePositiveIntPipe) id: number) {
  return this.usersService.findOne(id);
}`}</code></pre>

      <h3>Interceptors</h3>
      <p>
        Interceptors can modify requests before they reach the handler, modify responses after the handler runs,
        catch exceptions, or add extra logic like logging and caching.
      </p>
      <pre><code className="language-typescript">{`// Logging interceptor — logs request duration
import {
  Injectable, NestInterceptor, ExecutionContext, CallHandler
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;
    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        console.log(method + ' ' + url + ' - ' + duration + 'ms');
      }),
    );
  }
}

// Transform interceptor — wrap all responses in a data envelope
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, { data: T; timestamp: string }> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        data,
        timestamp: new Date().toISOString(),
        success: true,
      })),
    );
  }
}

// Register globally in main.ts
app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());`}</code></pre>

      <h3>Exception Filters</h3>
      <pre><code className="language-typescript">{`// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter, Catch, ArgumentsHost,
  HttpException, HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error =
      typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    response.status(status).json({
      ...error,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

// Catch everything (including non-HTTP errors)
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.error('Unhandled exception:', exception);

    response.status(status).json({
      statusCode: status,
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

// Register globally
app.useGlobalFilters(new AllExceptionsFilter());`}</code></pre>

      <h2>Testing NestJS Applications</h2>
      <p>
        NestJS is designed with testability as a first-class concern. The <code>@nestjs/testing</code> package
        provides utilities to create isolated testing modules where you can replace real dependencies with mocks.
        The NestJS CLI automatically generates <code>.spec.ts</code> test files alongside every generated resource.
      </p>
      <p>
        NestJS uses Jest as the default test runner. All test configuration is pre-configured in{' '}
        <code>package.json</code>.
      </p>

      <h3>Unit Testing Services</h3>
      <pre><code className="language-typescript">{`// src/users/users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';

// Mock repository factory
const mockUserRepository = () => ({
  findAndCount: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  describe('findOne', () => {
    it('should return a user when found', async () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };
      userRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne(1);
      expect(result).toEqual(mockUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        select: ['id', 'email', 'name', 'createdAt'],
      });
    });

    it('should throw NotFoundException when user not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const dto = { name: 'Alice', email: 'alice@example.com', password: 'password123' };
      userRepository.findOne.mockResolvedValue(null); // No duplicate
      userRepository.create.mockReturnValue({ id: 1, ...dto });
      userRepository.save.mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto);
      expect(result).toHaveProperty('id', 1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw ConflictException if email already exists', async () => {
      userRepository.findOne.mockResolvedValue({ id: 1, email: 'alice@example.com' });
      const dto = { name: 'Alice', email: 'alice@example.com', password: 'password123' };
      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });
});`}</code></pre>

      <h3>Unit Testing Controllers</h3>
      <pre><code className="language-typescript">{`// src/users/users.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// Mock the entire service
const mockUsersService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated users', async () => {
      const mockResult = { data: [], meta: { page: 1, limit: 20, total: 0 } };
      mockUsersService.findAll.mockResolvedValue(mockResult);

      const result = await controller.findAll(1, 20);
      expect(result).toEqual(mockResult);
      expect(mockUsersService.findAll).toHaveBeenCalledWith({ page: 1, limit: 20 });
    });
  });
});`}</code></pre>

      <h3>End-to-End Tests with Supertest</h3>
      <pre><code className="language-typescript">{`// test/users.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue({
        findAndCount: jest.fn().mockResolvedValue([[], 0]),
        findOne: jest.fn().mockResolvedValue(null),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (GET) — returns 200 with empty array', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toBeDefined();
        expect(Array.isArray(res.body.data)).toBe(true);
      });
  });

  it('/users (POST) — returns 400 with invalid body', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ email: 'not-an-email', password: 'short' })
      .expect(400);
  });

  it('/users/999 (GET) — returns 404 for missing user', () => {
    return request(app.getHttpServer())
      .get('/users/999')
      .expect(404);
  });
});

// Run tests
// npm run test           — unit tests
// npm run test:e2e       — end-to-end tests
// npm run test:cov       — test coverage report`}</code></pre>

      <h2>NestJS vs Express.js: Which Should You Choose?</h2>
      <p>
        Both frameworks run on Node.js and can power production-grade APIs. The decision comes down to your
        team size, application complexity, and how much structure you want out of the box.
      </p>

      <div style={{ overflowX: 'auto', margin: '24px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: '600' }}>Aspect</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: '600' }}>Express.js</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: '600' }}>NestJS</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Architecture', 'Unopinionated — you design it', 'Opinionated — modules/controllers/services'],
              ['TypeScript', 'Optional (add manually)', 'First-class, built-in'],
              ['DI Container', 'None built-in', 'Built-in IoC container'],
              ['Learning Curve', 'Low', 'Medium (Angular familiarity helps)'],
              ['Boilerplate', 'Minimal', 'More (but CLI generates it)'],
              ['Testing', 'Manual setup', 'Built-in testing utilities'],
              ['Performance', '~28K req/s (vanilla)', '~25K req/s (Express adapter)'],
              ['Ecosystem', 'Vast (30M+ npm pkgs)', 'Growing, plus Express compat'],
              ['Best For', 'Small APIs, microservices', 'Large enterprise apps, teams'],
              ['GraphQL', 'Manual setup', '@nestjs/graphql (built-in)'],
              ['WebSockets', 'socket.io (manual)', '@nestjs/websockets (built-in)'],
              ['Microservices', 'Manual', '@nestjs/microservices (built-in)'],
            ].map(([aspect, express, nest], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '10px 16px', fontWeight: '500', color: '#374151' }}>{aspect}</td>
                <td style={{ padding: '10px 16px', color: '#6b7280' }}>{express}</td>
                <td style={{ padding: '10px 16px', color: '#6b7280' }}>{nest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>When to Choose Express</h3>
      <ul>
        <li>Small to medium REST APIs where you want full control over structure</li>
        <li>Microservices that need minimal overhead and fast cold starts</li>
        <li>Teams already deeply familiar with Express middleware patterns</li>
        <li>Projects where you want to cherry-pick only what you need</li>
        <li>Prototypes and MVPs where speed of initial development matters most</li>
      </ul>

      <h3>When to Choose NestJS</h3>
      <ul>
        <li>Large enterprise APIs with multiple teams working in the same codebase</li>
        <li>Applications that will grow significantly over time</li>
        <li>Teams coming from Angular or Java Spring Boot who want familiar patterns</li>
        <li>Projects needing built-in support for GraphQL, WebSockets, or microservices</li>
        <li>When you want architecture enforced by convention rather than documentation</li>
        <li>Monorepo setups where multiple apps share code (NestJS has native monorepo support)</li>
      </ul>

      <h2>Advanced Topics and Production Tips</h2>

      <h3>Configuration Management</h3>
      <pre><code className="language-typescript">{`# Install the config module
npm install @nestjs/config

// app.module.ts
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,    // Available in every module without re-import
      envFilePath: '.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
        PORT: Joi.number().default(3000),
        DB_HOST: Joi.string().required(),
        JWT_SECRET: Joi.string().min(32).required(),
      }),
    }),
  ],
})
export class AppModule {}

// Inject config in any service
@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDatabaseUrl(): string {
    const host = this.configService.get<string>('DB_HOST');
    const port = this.configService.get<number>('DB_PORT', 5432);
    return 'postgres://' + host + ':' + port + '/mydb';
  }
}`}</code></pre>

      <h3>Caching with Redis</h3>
      <pre><code className="language-typescript">{`npm install @nestjs/cache-manager cache-manager cache-manager-redis-store redis

// app.module.ts
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: 6379,
      ttl: 300, // seconds
    }),
  ],
})
export class AppModule {}

// Use in a controller or service
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async findAll() {
    const cached = await this.cacheManager.get('all_products');
    if (cached) return cached;

    const products = await this.productRepository.find();
    await this.cacheManager.set('all_products', products, 300);
    return products;
  }
}

// Or use the built-in @CacheKey and @CacheTTL decorators on controllers
@Controller('products')
@UseInterceptors(CacheInterceptor)
export class ProductsController {
  @Get()
  @CacheKey('all_products')
  @CacheTTL(300)
  findAll() {
    return this.productsService.findAll();
  }
}`}</code></pre>

      <h3>OpenAPI / Swagger Documentation</h3>
      <pre><code className="language-typescript">{`npm install @nestjs/swagger swagger-ui-express

// main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}

// Annotate DTOs and controllers with Swagger decorators
import { ApiProperty, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Alice Johnson', description: 'Full name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'alice@example.com' })
  @IsEmail()
  email: string;
}

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  @ApiOperation({ summary: 'Get all users with pagination' })
  @Get()
  findAll() { ... }
}
// Visit http://localhost:3000/api/docs for the Swagger UI`}</code></pre>

      <h3>Health Checks</h3>
      <pre><code className="language-typescript">{`npm install @nestjs/terminus

// health/health.module.ts
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
})
export class HealthModule {}

// health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator, HttpHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
    ]);
  }
}
// GET /health returns: { status: "ok", info: { database: { status: "up" } } }`}</code></pre>

      <h3>Production Checklist</h3>
      <ul>
        <li>Set <code>NODE_ENV=production</code> — disables TypeORM <code>synchronize</code> warning and enables optimizations</li>
        <li>Use environment variables for all secrets — never hardcode JWT secrets or DB passwords</li>
        <li>Enable Helmet for security headers: <code>app.use(helmet())</code></li>
        <li>Enable rate limiting with <code>@nestjs/throttler</code> to prevent abuse</li>
        <li>Use a <code>ValidationPipe</code> globally with <code>whitelist: true</code> to strip unknown fields</li>
        <li>Disable TypeORM <code>synchronize: true</code> in production — use migrations instead</li>
        <li>Add health check endpoints for load balancer readiness probes</li>
        <li>Use <code>app.setGlobalPrefix('api/v1')</code> for API versioning</li>
        <li>Configure PM2 or similar process manager with cluster mode for multi-core usage</li>
        <li>Enable structured logging with Pino via <code>nestjs-pino</code> package</li>
      </ul>

      <h2>Summary</h2>
      <p>
        NestJS is the most mature, feature-complete TypeScript Node.js framework available in 2026. Its Angular-inspired
        architecture brings decades of enterprise software design patterns to the backend: dependency injection,
        modular organization, decorator-based configuration, and built-in testing utilities.
      </p>
      <p>
        The learning curve is real — especially if you are coming from plain Express — but the investment pays off
        in large codebases where consistency, testability, and maintainability matter. NestJS's CLI, first-party
        integrations for TypeORM, Prisma, GraphQL, WebSockets, and microservices, combined with comprehensive
        documentation and active community, make it the top choice for enterprise Node.js development.
      </p>
      <p>
        Start with <code>nest new my-app</code>, generate resources with <code>nest generate resource</code>, and
        follow the module pattern — your future self (and your teammates) will thank you.
      </p>
    </>
  );
}

function ChineseContent() {
  return (
    <>
      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          padding: '16px',
          margin: '24px 0',
          borderRadius: '4px',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          TL;DR — NestJS 快速参考
        </strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: '1.8' }}>
          {translations.zh.tldr}
        </p>
      </div>

      <h2>什么是 NestJS？</h2>
      <p>
        <strong>NestJS</strong> 是一个渐进式的、TypeScript 优先的 Node.js 框架，用于构建高效、可扩展的服务端应用。
        NestJS 深受 <strong>Angular</strong> 的启发——将装饰器、依赖注入和模块化架构带入了 Node.js 后端世界。
      </p>
      <p>
        在底层，NestJS 默认构建于 <strong>Express.js</strong> 之上（也可选择 Fastify），让你可以访问整个 Express 生态系统，
        同时提供强大的抽象层，使大型应用易于维护。
      </p>
      <p>
        截至 2026 年，NestJS 拥有超过 <strong>65,000 个 GitHub Star</strong>、每周 900 万次 npm 下载，
        并被 Adidas、Roche、Autodesk 等公司用于生产环境。
      </p>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          padding: '20px',
          borderRadius: '8px',
          margin: '24px 0',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '12px' }}>
          核心要点
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', lineHeight: '1.8' }}>
          <li>NestJS 以 TypeScript 为核心，底层运行在 Express 或 Fastify 上。</li>
          <li>模块（Module）、控制器（Controller）、服务（Service）和提供者（Provider）是每个 NestJS 应用的四大支柱。</li>
          <li>内置依赖注入（IoC 容器）自动完成类的连接，无需手动实例化。</li>
          <li>装饰器如 <code>@Controller()</code>、<code>@Get()</code>、<code>@Injectable()</code> 驱动整个框架。</li>
          <li>Guards 处理授权，Pipes 验证/转换数据，Interceptors 包装请求生命周期。</li>
          <li>通过 TypeORM 或 Prisma 集成数据库，均有官方一流支持包。</li>
          <li>JWT 认证通过 <code>@nestjs/passport</code> 和 <code>@nestjs/jwt</code> 实现。</li>
          <li>内置测试能力：<code>Test.createTestingModule()</code> 创建隔离测试环境。</li>
        </ul>
      </div>

      <h2>安装与项目搭建</h2>
      <pre><code className="language-bash">{`# 全局安装 NestJS CLI
npm install -g @nestjs/cli

# 创建新项目
nest new my-nestjs-app

# 进入项目目录并启动开发服务器
cd my-nestjs-app
npm run start:dev
# 应用运行在: http://localhost:3000`}</code></pre>

      <h2>核心概念：模块与架构</h2>
      <p>
        NestJS 应用围绕<strong>模块</strong>组织。模块是使用 <code>@Module()</code> 装饰器标注的类，
        提供 NestJS 组织应用结构所需的元数据。每个模块封装一组相关的控制器、服务和提供者。
      </p>
      <pre><code className="language-typescript">{`// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],  // 处理 HTTP 请求
  providers: [UsersService],       // 业务逻辑 + DI 提供者
  exports: [UsersService],         // 导出供其他模块使用
})
export class UsersModule {}`}</code></pre>

      <h2>控制器与服务</h2>
      <p>
        控制器负责处理传入的 HTTP 请求并返回响应，是轻量层，将实际业务逻辑委托给服务。
        服务包含所有业务逻辑和数据访问代码，使两者都易于独立测试。
      </p>
      <pre><code className="language-typescript">{`// src/users/users.controller.ts
import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll({ page: 1, limit: 20 });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}`}</code></pre>

      <h2>依赖注入</h2>
      <p>
        NestJS 内置 IoC（控制反转）容器，自动管理类的实例化。
        用 <code>@Injectable()</code> 标记类，在模块中注册为提供者，
        然后通过构造函数注入到任何控制器或服务中。
        NestJS 在启动时解析依赖图，默认创建单例实例，并在需要时注入。
      </p>
      <pre><code className="language-typescript">{`// 标记为可注入
@Injectable()
export class EmailService {
  sendWelcome(email: string) {
    // 发送邮件逻辑
  }
}

// 在 UsersService 中注入
@Injectable()
export class UsersService {
  constructor(private emailService: EmailService) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.save(dto);
    await this.emailService.sendWelcome(user.email);
    return user;
  }
}`}</code></pre>

      <h2>数据库集成</h2>
      <p>
        NestJS 为 TypeORM 和 Prisma 提供官方集成包，两者都有一流的 TypeScript 支持。
      </p>
      <pre><code className="language-typescript">{`// TypeORM 实体示例
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}

// Prisma Schema 示例 (prisma/schema.prisma)
// model User {
//   id        Int      @id @default(autoincrement())
//   email     String   @unique
//   name      String
//   createdAt DateTime @default(now())
// }`}</code></pre>

      <h2>JWT 认证与 Guards</h2>
      <p>
        NestJS 中的认证通常通过 <code>@nestjs/passport</code> 包装的 Passport.js 策略实现。
        最常见的模式是使用 JWT（JSON Web Token）进行无状态认证。
      </p>
      <pre><code className="language-typescript">{`// Guard 保护路由
@Controller('profile')
export class ProfileController {
  @Get()
  @UseGuards(JwtAuthGuard)   // 只有持有有效 JWT 的请求才能通过
  getProfile(@Request() req) {
    return req.user;  // 由 JwtStrategy.validate() 设置
  }
}

// 基于角色的访问控制
@Get('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
getAdminData() {
  return { secret: 'admin only' };
}`}</code></pre>

      <h2>测试</h2>
      <p>
        NestJS 内置测试工具，使用 <code>Test.createTestingModule()</code> 创建隔离测试环境，
        替换真实依赖为 Mock 对象。
      </p>
      <pre><code className="language-typescript">{`// 单元测试示例
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should throw NotFoundException for missing user', async () => {
    jest.spyOn(service['userRepository'], 'findOne').mockResolvedValue(null);
    await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
  });
});

# 运行测试
# npm run test          — 单元测试
# npm run test:e2e      — 端到端测试
# npm run test:cov      — 测试覆盖率报告`}</code></pre>

      <h2>总结</h2>
      <p>
        NestJS 是 2026 年最成熟、功能最完整的 TypeScript Node.js 框架。
        其 Angular 风格的架构将企业级软件设计模式带入后端：依赖注入、模块化组织、
        基于装饰器的配置以及内置测试工具。
      </p>
      <p>
        从 Express 迁移有一定学习曲线，但在大型代码库中，一致性、可测试性和可维护性的回报
        远超前期投入。从 <code>nest new my-app</code> 开始，用 <code>nest generate resource</code>{' '}
        生成资源，遵循模块模式——你的未来自己和队友都会感谢你。
      </p>
    </>
  );
}

export default function NestjsGuide({ lang = 'en' }: { lang?: string }) {
  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {lang === 'zh' ? <ChineseContent /> : <EnglishContent />}
    </div>
  );
}

export { translations };
