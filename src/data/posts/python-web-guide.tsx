'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Python Web Development Guide 2026: Django vs FastAPI vs Flask — Complete Comparison & Tutorial',
    description: 'A comprehensive Python web development guide covering Django, FastAPI, and Flask — when to use each, async programming with asyncio and aiohttp, SQLAlchemy 2.0 ORM, Alembic migrations, Celery background tasks, testing with pytest, and production deployment with Gunicorn, Uvicorn, and Docker.',
    tldr: 'For new APIs choose FastAPI (async, auto-docs, Pydantic validation). For full-stack web apps with admin and ORM choose Django. For lightweight microservices or prototypes choose Flask. SQLAlchemy 2.0 is the standard ORM for non-Django projects. Use Alembic for migrations, Celery for background tasks, pytest for testing, and Gunicorn+Uvicorn behind Nginx for production deployment.',
  },
  zh: {
    title: 'Python Web 开发完全指南 2026：Django vs FastAPI vs Flask 深度对比与实战教程',
    description: '全面的 Python Web 开发指南，涵盖 Django、FastAPI 和 Flask 的选型对比、asyncio 异步编程、SQLAlchemy 2.0 ORM、Alembic 数据库迁移、Celery 后台任务、pytest 测试以及 Gunicorn、Uvicorn 和 Docker 生产部署。',
    tldr: '新项目 API 开发选 FastAPI（异步、自动文档、Pydantic 验证）；需要完整 admin 后台和 ORM 的全栈 Web 应用选 Django；轻量级微服务或原型开发选 Flask。非 Django 项目的标准 ORM 是 SQLAlchemy 2.0，迁移用 Alembic，后台任务用 Celery，测试用 pytest，生产环境用 Gunicorn+Uvicorn 配合 Nginx。',
  },
};

export default function PythonWebGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const faqData = [
    {
      question: isZh ? 'Django、FastAPI 和 Flask 该如何选择？' : 'How do I choose between Django, FastAPI, and Flask?',
      answer: isZh
        ? '选择依据：需要完整的 admin 后台、ORM 和认证系统时选 Django（适合 CMS、电商、内容平台）；构建高性能 REST API 或需要自动 OpenAPI 文档时选 FastAPI（适合微服务、数据 API、ML 推理接口）；构建轻量级原型或小型应用时选 Flask（灵活但需要自己搭建更多基础设施）。'
        : 'Choose based on needs: Django for full-stack apps needing admin, ORM, and auth out-of-the-box (CMS, e-commerce, content platforms). FastAPI for high-performance APIs with automatic OpenAPI docs and async support (microservices, data APIs, ML inference). Flask for lightweight prototypes or small apps where you prefer to assemble your own stack.',
    },
    {
      question: isZh ? 'FastAPI 比 Flask 快多少？' : 'How much faster is FastAPI than Flask?',
      answer: isZh
        ? 'FastAPI 基于 ASGI（Starlette + Uvicorn），支持原生异步 I/O。在 I/O 密集型工作负载下，FastAPI 的吞吐量通常是 Flask（WSGI + Gunicorn）的 2-3 倍。对于 CPU 密集型任务，两者差异不大，因为都受 Python GIL 限制。真实场景下 FastAPI 每秒可处理数万个请求，而标准 Flask 配置通常在数千个。'
        : 'FastAPI runs on ASGI (Starlette + Uvicorn) with native async I/O. For I/O-bound workloads, FastAPI typically achieves 2-3x the throughput of Flask (WSGI + Gunicorn). For CPU-bound tasks, both are similarly limited by the Python GIL. In real-world scenarios, FastAPI can handle tens of thousands of requests per second vs. thousands for a standard Flask setup.',
    },
    {
      question: isZh ? 'SQLAlchemy 2.0 和 Django ORM 有什么区别？' : 'What is the difference between SQLAlchemy 2.0 and Django ORM?',
      answer: isZh
        ? 'Django ORM 与 Django 框架深度集成，API 更简洁，适合快速开发，但灵活性相对较低。SQLAlchemy 2.0 是独立的 ORM 库，可与任何框架配合使用，提供 Core（SQL 表达式语言）和 ORM 两层 API，复杂查询更灵活，支持原生异步会话（async Session）。新的 Flask/FastAPI 项目推荐使用 SQLAlchemy 2.0。'
        : 'Django ORM is tightly integrated with Django, offers a simpler API for rapid development, but has less flexibility for complex queries. SQLAlchemy 2.0 is a standalone ORM usable with any framework, providing both a Core SQL Expression layer and an ORM layer, with superior flexibility for complex queries and native async session support. For new Flask/FastAPI projects, SQLAlchemy 2.0 is the standard choice.',
    },
    {
      question: isZh ? 'Python 异步 Web 开发中如何避免阻塞事件循环？' : 'How do I avoid blocking the event loop in async Python web development?',
      answer: isZh
        ? '关键规则：所有 I/O 操作（数据库查询、HTTP 请求、文件读写）必须使用 async/await 版本的库（asyncpg、aiohttp、aiofiles）。CPU 密集型任务（图像处理、数据计算）应使用 asyncio.run_in_executor() 放入线程池或进程池执行。避免在 async 函数中调用同步的 time.sleep()、requests.get() 等阻塞函数。'
        : 'The core rule: all I/O operations (database queries, HTTP requests, file reads) must use async/await versions of libraries (asyncpg, aiohttp, aiofiles). CPU-bound tasks (image processing, data computation) should be offloaded with asyncio.run_in_executor() into thread or process pools. Never call blocking functions like time.sleep() or requests.get() inside async functions.',
    },
    {
      question: isZh ? 'Alembic 和 Django migrations 有什么区别？' : 'What is the difference between Alembic and Django migrations?',
      answer: isZh
        ? 'Django migrations 与 Django ORM 深度集成，可自动检测模型变更并生成迁移文件（makemigrations），执行简单。Alembic 是 SQLAlchemy 的迁移工具，需要手动或半自动生成迁移脚本，但对自定义 SQL 和复杂迁移逻辑的支持更强。两者都应将迁移文件提交到版本控制，并在部署时优先于应用启动执行。'
        : 'Django migrations are deeply integrated with Django ORM, auto-detect model changes via makemigrations, and are simple to use. Alembic is SQLAlchemy\'s migration tool, requiring manual or semi-automatic script generation, but offers stronger support for custom SQL and complex migration logic. Both require committing migration files to version control and running them before application startup on every deployment.',
    },
    {
      question: isZh ? 'Celery 和 FastAPI 的 BackgroundTasks 有什么区别？' : 'What is the difference between Celery and FastAPI BackgroundTasks?',
      answer: isZh
        ? 'FastAPI BackgroundTasks 在同一进程内异步执行轻量级任务（发邮件通知、更新统计数据），任务随进程退出而终止，不支持重试或持久化。Celery 是独立的分布式任务队列，支持任务重试、定时调度、优先级队列、结果存储和跨服务分发，适合耗时任务（视频处理、大批量数据导入）。生产环境中复杂的后台任务应使用 Celery。'
        : 'FastAPI BackgroundTasks run lightweight tasks in the same process (sending notification emails, updating counters) — tasks die with the process and have no retry or persistence. Celery is a distributed task queue supporting retries, scheduled tasks, priority queues, result storage, and cross-service distribution — ideal for long-running tasks (video processing, bulk data imports). Use Celery in production for complex background work.',
    },
    {
      question: isZh ? '生产环境应该用 Gunicorn 还是 Uvicorn？' : 'Should I use Gunicorn or Uvicorn in production?',
      answer: isZh
        ? '推荐组合：Gunicorn 作为进程管理器（管理多个工作进程的生命周期），配合 UvicornWorker 作为 ASGI 工作进程（处理实际请求）。命令：gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker。对于 Django（同步），使用 gunicorn -w 4 myproject.wsgi:application。纯 Uvicorn 适合容器环境（Docker + Kubernetes），由容器编排平台管理进程数量。'
        : 'Recommended combination: Gunicorn as the process manager (lifecycle management of multiple worker processes) with UvicornWorker as the ASGI worker class (handling actual requests). Command: gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker. For Django (sync), use gunicorn -w 4 myproject.wsgi:application. Pure Uvicorn suits container environments (Docker + Kubernetes) where the orchestration platform manages process count.',
    },
    {
      question: isZh ? '如何在 FastAPI 中实现 JWT 认证？' : 'How do I implement JWT authentication in FastAPI?',
      answer: isZh
        ? '使用 python-jose 库处理 JWT，passlib 处理密码哈希。创建 /token 端点接受 OAuth2PasswordRequestForm，验证用户凭据后生成 JWT。使用 OAuth2PasswordBearer 依赖项提取 Bearer token，在保护路由中通过 Depends(get_current_user) 验证 token 并注入当前用户。将 JWT SECRET_KEY 存入环境变量，生产环境使用 RS256 非对称算法代替 HS256。'
        : 'Use python-jose for JWT operations and passlib for password hashing. Create a /token endpoint accepting OAuth2PasswordRequestForm, validate credentials, and issue a JWT. Use the OAuth2PasswordBearer dependency to extract Bearer tokens, then verify them in protected routes via Depends(get_current_user). Store the JWT SECRET_KEY in environment variables, and use RS256 asymmetric signing instead of HS256 in production.',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b', lineHeight: '1.7' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <p style={{ margin: 0, fontWeight: 600, color: '#0369a1', marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</p>
        <p style={{ margin: 0, color: '#0c4a6e', fontSize: '1rem' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#1e293b', fontWeight: 700 }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </h2>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? 'FastAPI 适合高性能 API 开发，内置 Pydantic 验证、自动 OpenAPI 文档和原生异步支持。' : 'FastAPI is the best choice for high-performance APIs: built-in Pydantic validation, automatic OpenAPI docs, and native async support.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? 'Django 的"开箱即用"优势（ORM、Admin、Auth、迁移）使其成为全栈 Web 应用的首选。' : 'Django\'s batteries-included approach (ORM, Admin, Auth, migrations) makes it the top choice for full-stack web applications.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? 'SQLAlchemy 2.0 引入了统一的 2.0 查询风格和原生异步会话，是非 Django 项目的标准 ORM。' : 'SQLAlchemy 2.0 introduces a unified query style and native async sessions — it is the standard ORM for non-Django projects.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? 'Alembic 迁移脚本必须提交到版本控制，并在每次部署时优先于应用启动执行。' : 'Alembic migration scripts must be committed to version control and run before application startup on every deployment.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? '生产环境使用 Gunicorn + UvicornWorker（ASGI）或 Gunicorn + sync worker（WSGI/Django），配合 Nginx 反向代理。' : 'In production use Gunicorn + UvicornWorker for ASGI apps or Gunicorn sync workers for Django/WSGI, behind an Nginx reverse proxy.'}</li>
          <li style={{ marginBottom: '0', color: '#334155' }}>{isZh ? '使用 pytest 和 FastAPI TestClient 或 Django test client 编写测试，永远不要在没有测试覆盖的情况下部署。' : 'Write tests with pytest and FastAPI TestClient or Django test client — never deploy without test coverage on critical endpoints.'}</li>
        </ul>
      </div>

      {/* Section 1: Framework Comparison */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '1. Django vs FastAPI vs Flask — 如何选择？' : '1. Django vs FastAPI vs Flask — When to Use Which?'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Python 生态中有三个主流 Web 框架，各有其适用场景。选择正确的框架是项目成功的第一步，错误的选择会在后期带来大量技术债务。'
          : 'Python has three mainstream web frameworks, each suited to different scenarios. Choosing the right framework is the first step to project success — the wrong choice leads to significant technical debt down the line.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'Framework Comparison: Django vs FastAPI vs Flask\n' +
          '=================================================\n\n' +
          'Feature               Django          FastAPI         Flask\n' +
          '-------               ------          -------         -----\n' +
          'Type                  Full-stack      API-first       Micro\n' +
          'ORM                   Built-in        None (SQLAlch.) None (SQLAlch.)\n' +
          'Admin Panel           Built-in        None            None\n' +
          'Auth System           Built-in        Manual/Libs     Manual/Libs\n' +
          'Migrations            Built-in        Alembic         Alembic\n' +
          'Async Support         Partial (3.1+)  Native (ASGI)   No (WSGI)\n' +
          'Data Validation       Forms/DRF       Pydantic        Manual/Marshmallow\n' +
          'Auto API Docs         No              Yes (OpenAPI)   No\n' +
          'Performance           Medium          Very High       Medium\n' +
          'Learning Curve        Steep           Medium          Low\n' +
          'Best For              Full-stack apps APIs/Microsvcs  Prototypes/Simple\n\n' +
          'Choose Django when:\n' +
          '  - You need a relational database with admin interface\n' +
          '  - Building a CMS, e-commerce, or content platform\n' +
          '  - Team is familiar with Django ecosystem\n' +
          '  - Need batteries-included: auth, sessions, forms\n\n' +
          'Choose FastAPI when:\n' +
          '  - Building REST APIs or GraphQL backends\n' +
          '  - Need high throughput with async I/O\n' +
          '  - Serving ML models or data science APIs\n' +
          '  - Want automatic Swagger/ReDoc documentation\n\n' +
          'Choose Flask when:\n' +
          '  - Building a small microservice or prototype\n' +
          '  - Need maximum flexibility in stack assembly\n' +
          '  - Minimal overhead and simplicity are priorities'
        }</code>
      </pre>

      {/* Section 2: FastAPI */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '2. FastAPI 深度指南：异步路由、Pydantic 与 JWT 认证' : '2. FastAPI Deep Dive: Async Routes, Pydantic Models, and JWT Auth'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'FastAPI 基于 Starlette（ASGI 框架）和 Pydantic（数据验证），提供接近 Node.js 和 Go 的性能，同时保持 Python 的开发体验。其自动生成的 OpenAPI 文档（Swagger UI 和 ReDoc）是构建公共 API 和团队协作的重要特性。'
          : 'FastAPI is built on Starlette (ASGI framework) and Pydantic (data validation), delivering near Node.js and Go performance while keeping Python\'s developer experience. Its automatically generated OpenAPI documentation (Swagger UI and ReDoc) is a standout feature for public APIs and team collaboration.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '项目结构与基本设置' : 'Project Structure and Basic Setup'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# Install dependencies\n' +
          'pip install fastapi uvicorn[standard] pydantic pydantic-settings\n' +
          'pip install sqlalchemy asyncpg alembic python-jose[cryptography] passlib[bcrypt]\n\n' +
          '# Recommended project structure\n' +
          'myapp/\n' +
          '  app/\n' +
          '    __init__.py\n' +
          '    main.py          # FastAPI app instance, startup/shutdown events\n' +
          '    config.py        # Settings via pydantic-settings\n' +
          '    database.py      # SQLAlchemy engine and session\n' +
          '    models/          # SQLAlchemy ORM models\n' +
          '      __init__.py\n' +
          '      user.py\n' +
          '    schemas/         # Pydantic request/response models\n' +
          '      __init__.py\n' +
          '      user.py\n' +
          '    routers/         # APIRouter modules\n' +
          '      __init__.py\n' +
          '      users.py\n' +
          '      auth.py\n' +
          '    services/        # Business logic\n' +
          '      user_service.py\n' +
          '    dependencies.py  # Shared Depends() functions\n' +
          '  tests/\n' +
          '    conftest.py\n' +
          '    test_users.py\n' +
          '  alembic/\n' +
          '    versions/\n' +
          '  alembic.ini\n' +
          '  requirements.txt\n' +
          '  Dockerfile'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '异步路由与 Pydantic 模型' : 'Async Routes and Pydantic Models'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# app/schemas/user.py\n' +
          'from pydantic import BaseModel, EmailStr, Field\n' +
          'from typing import Optional\n' +
          'from datetime import datetime\n\n\n' +
          'class UserBase(BaseModel):\n' +
          '    email: EmailStr\n' +
          '    username: str = Field(..., min_length=3, max_length=50, pattern=r"^[a-zA-Z0-9_]+$")\n' +
          '    full_name: Optional[str] = Field(None, max_length=100)\n\n\n' +
          'class UserCreate(UserBase):\n' +
          '    password: str = Field(..., min_length=8)\n\n\n' +
          'class UserUpdate(BaseModel):\n' +
          '    full_name: Optional[str] = None\n' +
          '    email: Optional[EmailStr] = None\n\n\n' +
          'class UserResponse(UserBase):\n' +
          '    id: int\n' +
          '    is_active: bool\n' +
          '    created_at: datetime\n\n' +
          '    model_config = {"from_attributes": True}  # Pydantic v2: replaces orm_mode\n\n\n' +
          '# app/routers/users.py\n' +
          'from fastapi import APIRouter, Depends, HTTPException, status\n' +
          'from sqlalchemy.ext.asyncio import AsyncSession\n' +
          'from typing import List\n\n' +
          'from app.database import get_db\n' +
          'from app.schemas.user import UserCreate, UserResponse, UserUpdate\n' +
          'from app.services.user_service import UserService\n' +
          'from app.dependencies import get_current_user\n\n\n' +
          'router = APIRouter(prefix="/users", tags=["users"])\n\n\n' +
          '@router.get("/", response_model=List[UserResponse])\n' +
          'async def list_users(\n' +
          '    skip: int = 0,\n' +
          '    limit: int = 100,\n' +
          '    db: AsyncSession = Depends(get_db),\n' +
          '    current_user = Depends(get_current_user),\n' +
          '):\n' +
          '    """List all users (paginated). Requires authentication."""\n' +
          '    service = UserService(db)\n' +
          '    return await service.get_users(skip=skip, limit=limit)\n\n\n' +
          '@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)\n' +
          'async def create_user(\n' +
          '    user_in: UserCreate,\n' +
          '    db: AsyncSession = Depends(get_db),\n' +
          '):\n' +
          '    """Register a new user."""\n' +
          '    service = UserService(db)\n' +
          '    existing = await service.get_by_email(user_in.email)\n' +
          '    if existing:\n' +
          '        raise HTTPException(\n' +
          '            status_code=status.HTTP_409_CONFLICT,\n' +
          '            detail="Email already registered",\n' +
          '        )\n' +
          '    return await service.create_user(user_in)\n\n\n' +
          '@router.get("/{user_id}", response_model=UserResponse)\n' +
          'async def get_user(\n' +
          '    user_id: int,\n' +
          '    db: AsyncSession = Depends(get_db),\n' +
          '):\n' +
          '    service = UserService(db)\n' +
          '    user = await service.get_by_id(user_id)\n' +
          '    if not user:\n' +
          '        raise HTTPException(status_code=404, detail="User not found")\n' +
          '    return user'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? 'JWT 认证实现' : 'JWT Authentication Implementation'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# app/routers/auth.py\n' +
          'from datetime import datetime, timedelta\n' +
          'from fastapi import APIRouter, Depends, HTTPException, status\n' +
          'from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm\n' +
          'from jose import JWTError, jwt\n' +
          'from passlib.context import CryptContext\n' +
          'from sqlalchemy.ext.asyncio import AsyncSession\n\n' +
          'from app.config import settings\n' +
          'from app.database import get_db\n' +
          'from app.services.user_service import UserService\n\n\n' +
          'pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")\n' +
          'oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")\n' +
          'router = APIRouter(prefix="/auth", tags=["auth"])\n\n\n' +
          'def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=1)):\n' +
          '    payload = data.copy()\n' +
          '    payload["exp"] = datetime.utcnow() + expires_delta\n' +
          '    return jwt.encode(payload, settings.secret_key, algorithm="HS256")\n\n\n' +
          '@router.post("/token")\n' +
          'async def login(\n' +
          '    form: OAuth2PasswordRequestForm = Depends(),\n' +
          '    db: AsyncSession = Depends(get_db),\n' +
          '):\n' +
          '    service = UserService(db)\n' +
          '    user = await service.get_by_email(form.username)\n' +
          '    if not user or not pwd_context.verify(form.password, user.hashed_password):\n' +
          '        raise HTTPException(\n' +
          '            status_code=status.HTTP_401_UNAUTHORIZED,\n' +
          '            detail="Incorrect email or password",\n' +
          '            headers={"WWW-Authenticate": "Bearer"},\n' +
          '        )\n' +
          '    token = create_access_token({"sub": str(user.id)})\n' +
          '    return {"access_token": token, "token_type": "bearer"}\n\n\n' +
          '# app/dependencies.py\n' +
          'async def get_current_user(\n' +
          '    token: str = Depends(oauth2_scheme),\n' +
          '    db: AsyncSession = Depends(get_db),\n' +
          '):\n' +
          '    credentials_exception = HTTPException(\n' +
          '        status_code=status.HTTP_401_UNAUTHORIZED,\n' +
          '        detail="Could not validate credentials",\n' +
          '        headers={"WWW-Authenticate": "Bearer"},\n' +
          '    )\n' +
          '    try:\n' +
          '        payload = jwt.decode(token, settings.secret_key, algorithms=["HS256"])\n' +
          '        user_id: str = payload.get("sub")\n' +
          '        if user_id is None:\n' +
          '            raise credentials_exception\n' +
          '    except JWTError:\n' +
          '        raise credentials_exception\n' +
          '    service = UserService(db)\n' +
          '    user = await service.get_by_id(int(user_id))\n' +
          '    if user is None:\n' +
          '        raise credentials_exception\n' +
          '    return user'
        }</code>
      </pre>

      {/* Section 3: Django */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '3. Django 核心：ORM、视图、模板与 REST Framework' : '3. Django Core: ORM, Views, Templates, and REST Framework'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Django 以"开箱即用"著称。其 ORM 通过 Python 类定义数据模型，自动生成迁移文件，内置的 Admin 界面可以零配置实现数据管理后台，Django REST Framework（DRF）则提供了完整的 API 构建工具集。'
          : 'Django is famous for its batteries-included philosophy. Its ORM defines data models as Python classes with automatic migration generation. The built-in Admin interface provides a zero-config data management backend, while Django REST Framework (DRF) provides a complete API building toolkit.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? 'Django ORM：模型定义与查询' : 'Django ORM: Models and Queries'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# blog/models.py\n' +
          'from django.db import models\n' +
          'from django.contrib.auth.models import User\n' +
          'from django.utils.text import slugify\n\n\n' +
          'class Category(models.Model):\n' +
          '    name = models.CharField(max_length=100, unique=True)\n' +
          '    slug = models.SlugField(unique=True)\n\n' +
          '    class Meta:\n' +
          '        verbose_name_plural = "categories"\n' +
          '        ordering = ["name"]\n\n' +
          '    def __str__(self):\n' +
          '        return self.name\n\n\n' +
          'class Post(models.Model):\n' +
          '    STATUS_DRAFT = "draft"\n' +
          '    STATUS_PUBLISHED = "published"\n' +
          '    STATUS_CHOICES = [(STATUS_DRAFT, "Draft"), (STATUS_PUBLISHED, "Published")]\n\n' +
          '    title = models.CharField(max_length=255)\n' +
          '    slug = models.SlugField(unique=True)\n' +
          '    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")\n' +
          '    category = models.ForeignKey(\n' +
          '        Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="posts"\n' +
          '    )\n' +
          '    tags = models.ManyToManyField("Tag", blank=True, related_name="posts")\n' +
          '    body = models.TextField()\n' +
          '    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_DRAFT)\n' +
          '    created_at = models.DateTimeField(auto_now_add=True)\n' +
          '    updated_at = models.DateTimeField(auto_now=True)\n' +
          '    published_at = models.DateTimeField(null=True, blank=True)\n\n' +
          '    class Meta:\n' +
          '        ordering = ["-created_at"]\n' +
          '        indexes = [\n' +
          '            models.Index(fields=["status", "-published_at"]),\n' +
          '            models.Index(fields=["author", "status"]),\n' +
          '        ]\n\n' +
          '    def save(self, *args, **kwargs):\n' +
          '        if not self.slug:\n' +
          '            self.slug = slugify(self.title)\n' +
          '        super().save(*args, **kwargs)\n\n\n' +
          '# ORM queries — efficient patterns\n' +
          '# select_related() for ForeignKey (SQL JOIN, avoids N+1)\n' +
          'posts = Post.objects.select_related("author", "category").filter(\n' +
          '    status=Post.STATUS_PUBLISHED\n' +
          ').order_by("-published_at")[:20]\n\n' +
          '# prefetch_related() for ManyToMany (separate queries, Python-side join)\n' +
          'posts_with_tags = Post.objects.prefetch_related("tags").filter(\n' +
          '    status=Post.STATUS_PUBLISHED\n' +
          ')\n\n' +
          '# Aggregation\n' +
          'from django.db.models import Count, Avg\n' +
          'stats = Post.objects.values("category__name").annotate(\n' +
          '    post_count=Count("id")\n' +
          ').order_by("-post_count")\n\n' +
          '# only() — load specific fields (reduces memory)\n' +
          'titles = Post.objects.only("title", "slug", "published_at").filter(\n' +
          '    status=Post.STATUS_PUBLISHED\n' +
          ')'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? 'Django REST Framework (DRF)' : 'Django REST Framework (DRF)'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# blog/serializers.py\n' +
          'from rest_framework import serializers\n' +
          'from .models import Post, Category\n\n\n' +
          'class CategorySerializer(serializers.ModelSerializer):\n' +
          '    class Meta:\n' +
          '        model = Category\n' +
          '        fields = ["id", "name", "slug"]\n\n\n' +
          'class PostSerializer(serializers.ModelSerializer):\n' +
          '    author_name = serializers.CharField(source="author.get_full_name", read_only=True)\n' +
          '    category = CategorySerializer(read_only=True)\n' +
          '    category_id = serializers.PrimaryKeyRelatedField(\n' +
          '        queryset=Category.objects.all(), source="category", write_only=True\n' +
          '    )\n\n' +
          '    class Meta:\n' +
          '        model = Post\n' +
          '        fields = [\n' +
          '            "id", "title", "slug", "author_name", "category", "category_id",\n' +
          '            "body", "status", "created_at", "published_at",\n' +
          '        ]\n' +
          '        read_only_fields = ["id", "slug", "created_at"]\n\n\n' +
          '# blog/views.py — ViewSet with Router generates full CRUD\n' +
          'from rest_framework import viewsets, permissions, filters\n' +
          'from rest_framework.decorators import action\n' +
          'from rest_framework.response import Response\n' +
          'from django_filters.rest_framework import DjangoFilterBackend\n\n\n' +
          'class PostViewSet(viewsets.ModelViewSet):\n' +
          '    serializer_class = PostSerializer\n' +
          '    permission_classes = [permissions.IsAuthenticatedOrReadOnly]\n' +
          '    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]\n' +
          '    filterset_fields = ["status", "category"]\n' +
          '    search_fields = ["title", "body"]\n' +
          '    ordering_fields = ["created_at", "published_at"]\n\n' +
          '    def get_queryset(self):\n' +
          '        return Post.objects.select_related("author", "category").prefetch_related("tags")\n\n' +
          '    def perform_create(self, serializer):\n' +
          '        serializer.save(author=self.request.user)\n\n' +
          '    @action(detail=False, methods=["get"])\n' +
          '    def published(self, request):\n' +
          '        qs = self.get_queryset().filter(status=Post.STATUS_PUBLISHED)\n' +
          '        serializer = self.get_serializer(qs, many=True)\n' +
          '        return Response(serializer.data)\n\n\n' +
          '# blog/urls.py\n' +
          'from rest_framework.routers import DefaultRouter\n' +
          'from .views import PostViewSet\n\n' +
          'router = DefaultRouter()\n' +
          'router.register(r"posts", PostViewSet, basename="post")\n' +
          'urlpatterns = router.urls\n' +
          '# Generates: GET/POST /posts/, GET/PUT/PATCH/DELETE /posts/{id}/, GET /posts/published/'
        }</code>
      </pre>

      {/* Section 4: Flask */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '4. Flask：轻量级应用、Blueprints 与 SQLAlchemy' : '4. Flask: Lightweight Apps, Blueprints, and SQLAlchemy'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Flask 是一个微框架，核心极为精简，通过扩展库按需添加功能。Flask Blueprints 用于模块化组织路由，Flask-SQLAlchemy 集成 SQLAlchemy ORM，Flask-Migrate（基于 Alembic）处理数据库迁移。'
          : 'Flask is a micro-framework with a minimal core — functionality is added via extensions as needed. Flask Blueprints organize routes into modules, Flask-SQLAlchemy integrates the SQLAlchemy ORM, and Flask-Migrate (based on Alembic) handles database migrations.'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# pip install flask flask-sqlalchemy flask-migrate flask-jwt-extended\n\n' +
          '# app/__init__.py — Application factory pattern\n' +
          'from flask import Flask\n' +
          'from flask_sqlalchemy import SQLAlchemy\n' +
          'from flask_migrate import Migrate\n\n' +
          'db = SQLAlchemy()\n' +
          'migrate = Migrate()\n\n\n' +
          'def create_app(config=None):\n' +
          '    app = Flask(__name__)\n' +
          '    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://user:pass@localhost/mydb"\n' +
          '    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False\n' +
          '    app.config["SECRET_KEY"] = "change-me-in-production"\n\n' +
          '    db.init_app(app)\n' +
          '    migrate.init_app(app, db)\n\n' +
          '    # Register blueprints\n' +
          '    from app.auth.routes import auth_bp\n' +
          '    from app.api.routes import api_bp\n' +
          '    app.register_blueprint(auth_bp, url_prefix="/auth")\n' +
          '    app.register_blueprint(api_bp, url_prefix="/api/v1")\n\n' +
          '    return app\n\n\n' +
          '# app/api/routes.py — Blueprint\n' +
          'from flask import Blueprint, jsonify, request, abort\n' +
          'from app import db\n' +
          'from app.models import Post\n\n' +
          'api_bp = Blueprint("api", __name__)\n\n\n' +
          '@api_bp.route("/posts", methods=["GET"])\n' +
          'def list_posts():\n' +
          '    page = request.args.get("page", 1, type=int)\n' +
          '    per_page = request.args.get("per_page", 20, type=int)\n' +
          '    pagination = Post.query.order_by(Post.created_at.desc()).paginate(\n' +
          '        page=page, per_page=per_page, error_out=False\n' +
          '    )\n' +
          '    return jsonify({\n' +
          '        "posts": [p.to_dict() for p in pagination.items],\n' +
          '        "total": pagination.total,\n' +
          '        "pages": pagination.pages,\n' +
          '        "current_page": page,\n' +
          '    })\n\n\n' +
          '@api_bp.route("/posts/<int:post_id>", methods=["GET"])\n' +
          'def get_post(post_id):\n' +
          '    post = db.get_or_404(Post, post_id)\n' +
          '    return jsonify(post.to_dict())\n\n\n' +
          '@api_bp.errorhandler(404)\n' +
          'def not_found(error):\n' +
          '    return jsonify({"error": "Resource not found"}), 404'
        }</code>
      </pre>

      {/* Section 5: Async Python */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '5. Python 异步编程：asyncio 与 aiohttp' : '5. Python Async Programming: asyncio and aiohttp'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Python 的 asyncio 模块提供了基于事件循环的异步 I/O 框架。在 Web 开发中，异步对于提高 I/O 密集型服务（数据库查询、外部 API 调用、文件操作）的并发性能至关重要。aiohttp 是最流行的异步 HTTP 客户端/服务器库。'
          : 'Python\'s asyncio module provides an event loop-based async I/O framework. In web development, async is critical for improving concurrency in I/O-bound services (database queries, external API calls, file operations). aiohttp is the most popular async HTTP client/server library.'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# asyncio fundamentals\n' +
          'import asyncio\n' +
          'import aiohttp\n' +
          'from typing import List\n\n\n' +
          '# Basic coroutine\n' +
          'async def fetch_user(session: aiohttp.ClientSession, user_id: int) -> dict:\n' +
          '    url = f"https://api.example.com/users/{user_id}"\n' +
          '    async with session.get(url) as response:\n' +
          '        response.raise_for_status()\n' +
          '        return await response.json()\n\n\n' +
          '# Fetch multiple URLs concurrently (not sequentially)\n' +
          'async def fetch_all_users(user_ids: List[int]) -> List[dict]:\n' +
          '    async with aiohttp.ClientSession() as session:\n' +
          '        # asyncio.gather runs coroutines concurrently\n' +
          '        tasks = [fetch_user(session, uid) for uid in user_ids]\n' +
          '        results = await asyncio.gather(*tasks, return_exceptions=True)\n' +
          '        return [r for r in results if not isinstance(r, Exception)]\n\n\n' +
          '# Timeout and retry with asyncio\n' +
          'async def fetch_with_timeout(url: str, timeout_sec: float = 5.0) -> dict:\n' +
          '    timeout = aiohttp.ClientTimeout(total=timeout_sec)\n' +
          '    async with aiohttp.ClientSession(timeout=timeout) as session:\n' +
          '        try:\n' +
          '            async with session.get(url) as resp:\n' +
          '                return await resp.json()\n' +
          '        except asyncio.TimeoutError:\n' +
          '            raise TimeoutError(f"Request to {url} timed out after {timeout_sec}s")\n\n\n' +
          '# Run CPU-bound work without blocking the event loop\n' +
          'import concurrent.futures\n\n\n' +
          'async def process_image_async(image_data: bytes) -> bytes:\n' +
          '    loop = asyncio.get_event_loop()\n' +
          '    # Run CPU-bound work in a thread pool\n' +
          '    with concurrent.futures.ThreadPoolExecutor() as pool:\n' +
          '        result = await loop.run_in_executor(pool, _process_image_sync, image_data)\n' +
          '    return result\n\n\n' +
          'def _process_image_sync(image_data: bytes) -> bytes:\n' +
          '    # Synchronous CPU-bound image processing\n' +
          '    from PIL import Image\n' +
          '    import io\n' +
          '    img = Image.open(io.BytesIO(image_data))\n' +
          '    img = img.resize((800, 600))\n' +
          '    output = io.BytesIO()\n' +
          '    img.save(output, format="JPEG", quality=85)\n' +
          '    return output.getvalue()\n\n\n' +
          '# asyncio.Semaphore — limit concurrent connections\n' +
          'async def fetch_with_semaphore(urls: List[str], max_concurrent: int = 10):\n' +
          '    semaphore = asyncio.Semaphore(max_concurrent)\n\n' +
          '    async def fetch_one(session, url):\n' +
          '        async with semaphore:\n' +
          '            async with session.get(url) as resp:\n' +
          '                return await resp.text()\n\n' +
          '    async with aiohttp.ClientSession() as session:\n' +
          '        tasks = [fetch_one(session, url) for url in urls]\n' +
          '        return await asyncio.gather(*tasks)'
        }</code>
      </pre>

      {/* Section 6: SQLAlchemy 2.0 */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '6. SQLAlchemy 2.0：Core、ORM 与异步会话' : '6. SQLAlchemy 2.0: Core, ORM, and Async Sessions'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'SQLAlchemy 2.0 带来了重大更新：统一的 2.0 查询风格（不再使用 Session.query()，改用 select() 语句），原生 AsyncSession 支持，以及改进的类型注解。2.0 是非 Django 项目的首选 ORM。'
          : 'SQLAlchemy 2.0 brings major updates: a unified 2.0 query style (replacing Session.query() with select() statements), native AsyncSession support, and improved type annotations. SQLAlchemy 2.0 is the preferred ORM for non-Django projects.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? 'ORM 模型定义（2.0 风格）' : 'ORM Model Definition (2.0 Style)'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# app/models/user.py — SQLAlchemy 2.0 declarative style\n' +
          'from sqlalchemy import String, Boolean, DateTime, ForeignKey, Text\n' +
          'from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship\n' +
          'from datetime import datetime\n' +
          'from typing import Optional, List\n\n\n' +
          'class Base(DeclarativeBase):\n' +
          '    pass\n\n\n' +
          'class User(Base):\n' +
          '    __tablename__ = "users"\n\n' +
          '    id: Mapped[int] = mapped_column(primary_key=True, index=True)\n' +
          '    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)\n' +
          '    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)\n' +
          '    hashed_password: Mapped[str] = mapped_column(String(255))\n' +
          '    is_active: Mapped[bool] = mapped_column(Boolean, default=True)\n' +
          '    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)\n\n' +
          '    # Relationship: one user has many posts\n' +
          '    posts: Mapped[List["Post"]] = relationship("Post", back_populates="author")\n\n\n' +
          'class Post(Base):\n' +
          '    __tablename__ = "posts"\n\n' +
          '    id: Mapped[int] = mapped_column(primary_key=True, index=True)\n' +
          '    title: Mapped[str] = mapped_column(String(255))\n' +
          '    body: Mapped[str] = mapped_column(Text)\n' +
          '    published: Mapped[bool] = mapped_column(Boolean, default=False)\n' +
          '    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"))\n' +
          '    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)\n\n' +
          '    author: Mapped["User"] = relationship("User", back_populates="posts")'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '异步会话与 CRUD 操作' : 'Async Sessions and CRUD Operations'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# app/database.py — Async engine and session\n' +
          'from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker\n' +
          'from app.models import Base\n\n' +
          '# Use asyncpg driver for PostgreSQL async\n' +
          'DATABASE_URL = "postgresql+asyncpg://user:password@localhost/mydb"\n\n' +
          'engine = create_async_engine(DATABASE_URL, echo=False, pool_size=10, max_overflow=20)\n' +
          'AsyncSessionLocal = async_sessionmaker(\n' +
          '    engine, class_=AsyncSession, expire_on_commit=False\n' +
          ')\n\n\n' +
          'async def get_db():\n' +
          '    async with AsyncSessionLocal() as session:\n' +
          '        try:\n' +
          '            yield session\n' +
          '            await session.commit()\n' +
          '        except Exception:\n' +
          '            await session.rollback()\n' +
          '            raise\n\n\n' +
          '# app/services/user_service.py — SQLAlchemy 2.0 query style\n' +
          'from sqlalchemy.ext.asyncio import AsyncSession\n' +
          'from sqlalchemy import select, update, delete\n' +
          'from app.models.user import User\n' +
          'from app.schemas.user import UserCreate\n' +
          'from passlib.context import CryptContext\n\n' +
          'pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")\n\n\n' +
          'class UserService:\n' +
          '    def __init__(self, db: AsyncSession):\n' +
          '        self.db = db\n\n' +
          '    async def get_by_id(self, user_id: int) -> User | None:\n' +
          '        # SQLAlchemy 2.0 style: use select() instead of session.query()\n' +
          '        result = await self.db.execute(select(User).where(User.id == user_id))\n' +
          '        return result.scalar_one_or_none()\n\n' +
          '    async def get_by_email(self, email: str) -> User | None:\n' +
          '        result = await self.db.execute(select(User).where(User.email == email))\n' +
          '        return result.scalar_one_or_none()\n\n' +
          '    async def get_users(self, skip: int = 0, limit: int = 100) -> list[User]:\n' +
          '        result = await self.db.execute(\n' +
          '            select(User).where(User.is_active == True).offset(skip).limit(limit)\n' +
          '        )\n' +
          '        return list(result.scalars().all())\n\n' +
          '    async def create_user(self, user_in: UserCreate) -> User:\n' +
          '        user = User(\n' +
          '            email=user_in.email,\n' +
          '            username=user_in.username,\n' +
          '            hashed_password=pwd_context.hash(user_in.password),\n' +
          '        )\n' +
          '        self.db.add(user)\n' +
          '        await self.db.flush()  # Get the generated id without committing\n' +
          '        await self.db.refresh(user)\n' +
          '        return user\n\n' +
          '    async def deactivate_user(self, user_id: int) -> None:\n' +
          '        await self.db.execute(\n' +
          '            update(User).where(User.id == user_id).values(is_active=False)\n' +
          '        )'
        }</code>
      </pre>

      {/* Section 7: Alembic */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '7. Alembic 数据库迁移' : '7. Alembic Database Migrations'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Alembic 是 SQLAlchemy 官方的数据库迁移工具，支持自动检测模型变更生成迁移脚本，也支持手动编写复杂迁移逻辑。所有迁移脚本必须提交到版本控制。'
          : 'Alembic is the official migration tool for SQLAlchemy, supporting auto-generation of migration scripts from model changes as well as manual migration logic for complex scenarios. All migration scripts must be committed to version control.'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# Initialize Alembic in your project\n' +
          'pip install alembic\n' +
          'alembic init alembic\n\n' +
          '# alembic/env.py — configure for async SQLAlchemy\n' +
          'import asyncio\n' +
          'from logging.config import fileConfig\n' +
          'from sqlalchemy.ext.asyncio import create_async_engine\n' +
          'from alembic import context\n' +
          'from app.models import Base  # import your models\n\n' +
          'config = context.config\n' +
          'target_metadata = Base.metadata\n\n\n' +
          'def run_migrations_offline():\n' +
          '    context.configure(\n' +
          '        url=config.get_main_option("sqlalchemy.url"),\n' +
          '        target_metadata=target_metadata,\n' +
          '        literal_binds=True,\n' +
          '    )\n' +
          '    with context.begin_transaction():\n' +
          '        context.run_migrations()\n\n\n' +
          'async def run_migrations_online():\n' +
          '    connectable = create_async_engine(\n' +
          '        config.get_main_option("sqlalchemy.url")\n' +
          '    )\n' +
          '    async with connectable.connect() as connection:\n' +
          '        await connection.run_sync(\n' +
          '            lambda sync_conn: context.configure(\n' +
          '                connection=sync_conn,\n' +
          '                target_metadata=target_metadata,\n' +
          '            )\n' +
          '        )\n' +
          '        async with connection.begin():\n' +
          '            await connection.run_sync(lambda _: context.run_migrations())\n\n\n' +
          'if context.is_offline_mode():\n' +
          '    run_migrations_offline()\n' +
          'else:\n' +
          '    asyncio.run(run_migrations_online())\n\n\n' +
          '# Common Alembic commands\n' +
          '# Generate migration from model changes (auto-detect)\n' +
          'alembic revision --autogenerate -m "add users table"\n\n' +
          '# Apply all pending migrations\n' +
          'alembic upgrade head\n\n' +
          '# Roll back the last migration\n' +
          'alembic downgrade -1\n\n' +
          '# Roll back to a specific revision\n' +
          'alembic downgrade abc123\n\n' +
          '# View migration history\n' +
          'alembic history --verbose\n\n' +
          '# View current revision\n' +
          'alembic current'
        }</code>
      </pre>

      {/* Section 8: Celery */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '8. Celery 后台任务队列' : '8. Celery for Background Task Processing'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Celery 是 Python 生态中最流行的分布式任务队列，支持异步任务、定时任务（Celery Beat）、任务重试、结果存储和任务链。常见的消息代理（Broker）是 Redis 或 RabbitMQ，任务结果后端推荐 Redis。'
          : 'Celery is the most popular distributed task queue in the Python ecosystem, supporting async tasks, scheduled tasks (Celery Beat), retries, result storage, and task chains. Redis or RabbitMQ are common message brokers, with Redis also recommended as the result backend.'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# pip install celery redis\n\n' +
          '# app/celery_app.py\n' +
          'from celery import Celery\n\n' +
          'celery_app = Celery(\n' +
          '    "myapp",\n' +
          '    broker="redis://localhost:6379/0",\n' +
          '    backend="redis://localhost:6379/1",\n' +
          '    include=["app.tasks"],\n' +
          ')\n\n' +
          'celery_app.conf.update(\n' +
          '    task_serializer="json",\n' +
          '    result_serializer="json",\n' +
          '    accept_content=["json"],\n' +
          '    timezone="UTC",\n' +
          '    enable_utc=True,\n' +
          '    task_acks_late=True,           # Ack only after task completes\n' +
          '    worker_prefetch_multiplier=1,   # Prevent worker overload\n' +
          ')\n\n\n' +
          '# app/tasks.py\n' +
          'from app.celery_app import celery_app\n' +
          'import time\n\n\n' +
          '@celery_app.task(bind=True, max_retries=3, default_retry_delay=60)\n' +
          'def send_welcome_email(self, user_id: int, email: str):\n' +
          '    """Send welcome email — retries up to 3 times on failure."""\n' +
          '    try:\n' +
          '        # Your email sending logic here\n' +
          '        _send_email(to=email, subject="Welcome!", body="...")\n' +
          '    except Exception as exc:\n' +
          '        raise self.retry(exc=exc)\n\n\n' +
          '@celery_app.task\n' +
          'def process_video(video_id: int, output_format: str = "mp4"):\n' +
          '    """Long-running video processing task."""\n' +
          '    # Process video...\n' +
          '    return {"video_id": video_id, "status": "completed"}\n\n\n' +
          '# Call tasks from FastAPI/Django/Flask\n' +
          '# .delay() is a shortcut for .apply_async()\n' +
          'send_welcome_email.delay(user_id=42, email="user@example.com")\n\n' +
          '# .apply_async() with options\n' +
          'process_video.apply_async(\n' +
          '    args=[video_id],\n' +
          '    kwargs={"output_format": "webm"},\n' +
          '    countdown=10,         # Start after 10 seconds\n' +
          '    expires=3600,         # Discard if not consumed in 1 hour\n' +
          '    priority=5,           # 0-9, higher = higher priority\n' +
          ')\n\n\n' +
          '# Celery Beat — Periodic tasks (cron-like scheduling)\n' +
          'from celery.schedules import crontab\n\n' +
          'celery_app.conf.beat_schedule = {\n' +
          '    "daily-report": {\n' +
          '        "task": "app.tasks.generate_daily_report",\n' +
          '        "schedule": crontab(hour=8, minute=0),  # Every day at 8:00 AM\n' +
          '    },\n' +
          '    "cleanup-sessions": {\n' +
          '        "task": "app.tasks.cleanup_expired_sessions",\n' +
          '        "schedule": 300.0,  # Every 300 seconds\n' +
          '    },\n' +
          '}\n\n\n' +
          '# Start workers\n' +
          'celery -A app.celery_app worker --loglevel=info --concurrency=4\n' +
          'celery -A app.celery_app beat --loglevel=info'
        }</code>
      </pre>

      {/* Section 9: Testing */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '9. 测试 Python Web 应用：pytest 与 FastAPI TestClient' : '9. Testing Python Web Apps: pytest and FastAPI TestClient'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'pytest 是 Python 测试的事实标准。FastAPI 提供了基于 httpx 的 TestClient，可以在不启动服务器的情况下测试 API 端点。测试策略包括单元测试（业务逻辑）、集成测试（数据库交互）和端到端测试（完整 API 流程）。'
          : 'pytest is the de facto standard for Python testing. FastAPI provides a TestClient based on httpx for testing API endpoints without starting a server. Testing strategy includes unit tests (business logic), integration tests (database interaction), and end-to-end tests (full API flows).'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# pip install pytest pytest-asyncio httpx pytest-cov\n\n' +
          '# tests/conftest.py — shared fixtures\n' +
          'import pytest\n' +
          'from httpx import AsyncClient\n' +
          'from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker\n' +
          'from app.main import app\n' +
          'from app.database import get_db\n' +
          'from app.models import Base\n\n' +
          'TEST_DATABASE_URL = "postgresql+asyncpg://user:pass@localhost/test_db"\n\n\n' +
          '@pytest.fixture(scope="session")\n' +
          'def event_loop():\n' +
          '    import asyncio\n' +
          '    loop = asyncio.get_event_loop_policy().new_event_loop()\n' +
          '    yield loop\n' +
          '    loop.close()\n\n\n' +
          '@pytest.fixture(scope="session")\n' +
          'async def test_engine():\n' +
          '    engine = create_async_engine(TEST_DATABASE_URL, echo=False)\n' +
          '    async with engine.begin() as conn:\n' +
          '        await conn.run_sync(Base.metadata.create_all)\n' +
          '    yield engine\n' +
          '    async with engine.begin() as conn:\n' +
          '        await conn.run_sync(Base.metadata.drop_all)\n' +
          '    await engine.dispose()\n\n\n' +
          '@pytest.fixture\n' +
          'async def db_session(test_engine):\n' +
          '    TestSession = async_sessionmaker(test_engine, expire_on_commit=False)\n' +
          '    async with TestSession() as session:\n' +
          '        yield session\n' +
          '        await session.rollback()  # Roll back after each test\n\n\n' +
          '@pytest.fixture\n' +
          'async def client(db_session):\n' +
          '    def override_get_db():\n' +
          '        yield db_session\n\n' +
          '    app.dependency_overrides[get_db] = override_get_db\n' +
          '    async with AsyncClient(app=app, base_url="http://test") as ac:\n' +
          '        yield ac\n' +
          '    app.dependency_overrides.clear()\n\n\n' +
          '# tests/test_users.py\n' +
          'import pytest\n\n\n' +
          '@pytest.mark.asyncio\n' +
          'async def test_create_user(client):\n' +
          '    response = await client.post("/users/", json={\n' +
          '        "email": "test@example.com",\n' +
          '        "username": "testuser",\n' +
          '        "password": "securepassword123",\n' +
          '    })\n' +
          '    assert response.status_code == 201\n' +
          '    data = response.json()\n' +
          '    assert data["email"] == "test@example.com"\n' +
          '    assert "id" in data\n' +
          '    assert "password" not in data  # Never expose passwords\n\n\n' +
          '@pytest.mark.asyncio\n' +
          'async def test_duplicate_email_returns_409(client):\n' +
          '    payload = {"email": "dup@example.com", "username": "user1", "password": "pass12345"}\n' +
          '    await client.post("/users/", json=payload)\n' +
          '    # Second registration with same email\n' +
          '    response = await client.post("/users/", json={**payload, "username": "user2"})\n' +
          '    assert response.status_code == 409\n\n\n' +
          '@pytest.mark.asyncio\n' +
          'async def test_get_user_not_found(client):\n' +
          '    response = await client.get("/users/99999")\n' +
          '    assert response.status_code == 404\n\n\n' +
          '# Run tests\n' +
          'pytest tests/ -v --cov=app --cov-report=html'
        }</code>
      </pre>

      {/* Section 10: Deployment */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '10. 生产部署：Gunicorn、Uvicorn 与 Docker' : '10. Production Deployment: Gunicorn, Uvicorn, and Docker'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Python Web 应用的生产部署推荐使用 Gunicorn 作为进程管理器，配合 UvicornWorker（用于 ASGI/FastAPI）或默认同步 worker（用于 Django/Flask）。始终在 Nginx 或 Caddy 等反向代理后面运行 Python 服务，处理 SSL 终止、静态文件和请求缓冲。'
          : 'For production deployment of Python web apps, use Gunicorn as the process manager with UvicornWorker (for ASGI/FastAPI) or the default sync worker (for Django/Flask). Always run Python services behind a reverse proxy like Nginx or Caddy to handle SSL termination, static files, and request buffering.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? 'Gunicorn + Uvicorn（FastAPI）' : 'Gunicorn + Uvicorn (FastAPI)'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# FastAPI / ASGI app\n' +
          '# -w: worker count (recommended: 2 * CPU cores + 1)\n' +
          '# -k: worker class\n' +
          '# -b: bind address\n' +
          '# --timeout: worker timeout in seconds\n' +
          'gunicorn app.main:app \\\n' +
          '    -w 4 \\\n' +
          '    -k uvicorn.workers.UvicornWorker \\\n' +
          '    -b 0.0.0.0:8000 \\\n' +
          '    --timeout 120 \\\n' +
          '    --keep-alive 5 \\\n' +
          '    --access-logfile - \\\n' +
          '    --error-logfile -\n\n' +
          '# Django / WSGI app\n' +
          'gunicorn myproject.wsgi:application \\\n' +
          '    -w 4 \\\n' +
          '    -b 0.0.0.0:8000 \\\n' +
          '    --timeout 120\n\n' +
          '# gunicorn.conf.py — configuration file\n' +
          'bind = "0.0.0.0:8000"\n' +
          'workers = 4\n' +
          'worker_class = "uvicorn.workers.UvicornWorker"\n' +
          'worker_connections = 1000\n' +
          'timeout = 120\n' +
          'keepalive = 5\n' +
          'max_requests = 1000          # Restart workers after N requests (prevent memory leaks)\n' +
          'max_requests_jitter = 100    # Random jitter to prevent all workers restarting at once\n' +
          'loglevel = "info"\n' +
          'accesslog = "-"\n' +
          'errorlog = "-"\n' +
          'preload_app = True           # Load app code before forking workers (saves memory)'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? 'Docker 容器化' : 'Dockerfile for Python Web Apps'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# Dockerfile — multi-stage for FastAPI\n' +
          'FROM python:3.12-slim AS builder\n\n' +
          'WORKDIR /app\n\n' +
          '# Install build dependencies\n' +
          'RUN apt-get update && apt-get install -y --no-install-recommends \\\n' +
          '    build-essential libpq-dev \\\n' +
          '    && rm -rf /var/lib/apt/lists/*\n\n' +
          '# Install Python dependencies\n' +
          'COPY requirements.txt .\n' +
          'RUN pip install --no-cache-dir --user -r requirements.txt\n\n\n' +
          '# Production stage\n' +
          'FROM python:3.12-slim\n\n' +
          'WORKDIR /app\n\n' +
          'RUN apt-get update && apt-get install -y --no-install-recommends libpq5 \\\n' +
          '    && rm -rf /var/lib/apt/lists/*\n\n' +
          '# Copy installed packages from builder\n' +
          'COPY --from=builder /root/.local /root/.local\n\n' +
          '# Copy application code\n' +
          'COPY . .\n\n' +
          '# Create non-root user for security\n' +
          'RUN useradd --no-create-home --shell /bin/false appuser\n' +
          'USER appuser\n\n' +
          'ENV PATH=/root/.local/bin:$PATH\n' +
          'ENV PYTHONDONTWRITEBYTECODE=1\n' +
          'ENV PYTHONUNBUFFERED=1\n\n' +
          'EXPOSE 8000\n\n' +
          'CMD ["gunicorn", "app.main:app", "-w", "4", "-k", \\\n' +
          '     "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]\n\n\n' +
          '# docker-compose.yml\n' +
          'version: "3.9"\n' +
          'services:\n' +
          '  api:\n' +
          '    build: .\n' +
          '    ports:\n' +
          '      - "8000:8000"\n' +
          '    environment:\n' +
          '      - DATABASE_URL=postgresql+asyncpg://postgres:password@db/mydb\n' +
          '      - SECRET_KEY=${SECRET_KEY}\n' +
          '      - REDIS_URL=redis://redis:6379/0\n' +
          '    depends_on:\n' +
          '      db:\n' +
          '        condition: service_healthy\n' +
          '      redis:\n' +
          '        condition: service_started\n\n' +
          '  db:\n' +
          '    image: postgres:16-alpine\n' +
          '    volumes:\n' +
          '      - pgdata:/var/lib/postgresql/data\n' +
          '    environment:\n' +
          '      POSTGRES_PASSWORD: password\n' +
          '      POSTGRES_DB: mydb\n' +
          '    healthcheck:\n' +
          '      test: ["CMD-SHELL", "pg_isready -U postgres"]\n' +
          '      interval: 5s\n' +
          '      timeout: 5s\n' +
          '      retries: 5\n\n' +
          '  redis:\n' +
          '    image: redis:7-alpine\n\n' +
          '  worker:\n' +
          '    build: .\n' +
          '    command: celery -A app.celery_app worker -l info -c 4\n' +
          '    environment:\n' +
          '      - DATABASE_URL=postgresql+asyncpg://postgres:password@db/mydb\n' +
          '      - REDIS_URL=redis://redis:6379/0\n' +
          '    depends_on:\n' +
          '      - db\n' +
          '      - redis\n\n' +
          'volumes:\n' +
          '  pgdata:'
        }</code>
      </pre>

      {/* Comparison Table */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '11. 框架详细对比表' : '11. Detailed Framework Comparison Table'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '以下是 Django、FastAPI 和 Flask 在各维度的详细对比，帮助你根据项目需求做出最终选择：'
          : 'Here is a detailed comparison of Django, FastAPI, and Flask across multiple dimensions to help you make the final decision for your project:'}
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#f8fafc' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, borderRight: '1px solid #334155' }}>{isZh ? '维度' : 'Dimension'}</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, borderRight: '1px solid #334155' }}>Django</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, borderRight: '1px solid #334155' }}>FastAPI</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>Flask</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'Initial Release', '2005', '2018', '2010'],
              [isZh ? '架构模式' : 'Architecture', 'MTV (Full-stack)', 'ASGI (API-first)', 'WSGI (Micro)'],
              [isZh ? 'ORM' : 'ORM', isZh ? '内置 Django ORM' : 'Built-in ORM', isZh ? '无（推荐 SQLAlchemy）' : 'None (SQLAlchemy)', isZh ? '无（推荐 SQLAlchemy）' : 'None (SQLAlchemy)'],
              [isZh ? '迁移工具' : 'Migrations', isZh ? '内置 makemigrations' : 'Built-in makemigrations', 'Alembic', 'Alembic / Flask-Migrate'],
              [isZh ? '异步支持' : 'Async Support', isZh ? '部分（3.1+，需 ASGI）' : 'Partial (3.1+, needs ASGI)', isZh ? '原生（ASGI）' : 'Native (ASGI)', isZh ? '不支持（WSGI）' : 'No (WSGI)'],
              [isZh ? '数据验证' : 'Data Validation', 'Forms / DRF Serializers', 'Pydantic (built-in)', 'Marshmallow / WTForms'],
              [isZh ? 'API 文档' : 'API Documentation', 'DRF Browsable API', 'Auto Swagger + ReDoc', isZh ? '无（需插件）' : 'None (need extensions)'],
              [isZh ? 'Admin 后台' : 'Admin Panel', isZh ? '内置（零配置）' : 'Built-in (zero-config)', isZh ? '无（需第三方）' : 'None (third-party)', isZh ? '无（需 Flask-Admin）' : 'None (Flask-Admin)'],
              [isZh ? '认证系统' : 'Auth System', isZh ? '内置 User/Session/JWT' : 'Built-in User/Session', 'python-jose + passlib', 'Flask-Login + JWT'],
              [isZh ? '测试工具' : 'Testing', 'django.test.Client', 'TestClient (httpx)', 'Flask test client'],
              [isZh ? '性能（相对）' : 'Performance (relative)', isZh ? '中等（同步 WSGI）' : 'Medium (sync WSGI)', isZh ? '高（异步 ASGI）' : 'High (async ASGI)', isZh ? '中等（同步 WSGI）' : 'Medium (sync WSGI)'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '陡（概念多）' : 'Steep (many concepts)', isZh ? '中（Pydantic + async）' : 'Medium (Pydantic + async)', isZh ? '低（极简）' : 'Low (minimal)'],
              [isZh ? '最适合场景' : 'Best For', isZh ? 'CMS、电商、内容平台' : 'CMS, e-commerce, content', isZh ? 'API、ML 服务、微服务' : 'APIs, ML serving, microsvcs', isZh ? '原型、简单应用' : 'Prototypes, simple apps'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '9px 14px', fontWeight: 600, color: '#475569', borderRight: '1px solid #e2e8f0' }}>{row[0]}</td>
                <td style={{ padding: '9px 14px', color: '#334155', borderRight: '1px solid #e2e8f0' }}>{row[1]}</td>
                <td style={{ padding: '9px 14px', color: '#334155', borderRight: '1px solid #e2e8f0' }}>{row[2]}</td>
                <td style={{ padding: '9px 14px', color: '#334155' }}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ Section */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '常见问题' : 'Frequently Asked Questions'}
      </h2>
      <div style={{ marginBottom: '2rem' }}>
        {faqData.map((faq, index) => (
          <div key={index} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: index < faqData.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem', marginTop: 0 }}>
              {faq.question}
            </h3>
            <p style={{ color: '#334155', margin: 0, lineHeight: '1.7' }}>{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* Conclusion */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '总结' : 'Conclusion'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Python Web 开发生态在 2026 年已经相当成熟。FastAPI 凭借原生异步支持、自动 OpenAPI 文档和 Pydantic 数据验证，成为构建新 API 服务的首选框架。Django 凭借其完整的生态和"开箱即用"的特性，在全栈 Web 应用开发中仍然占据重要地位。Flask 则在需要最大灵活性的轻量级场景中依然适用。'
          : 'The Python web development ecosystem is mature and robust in 2026. FastAPI has become the preferred framework for new API services, thanks to native async support, automatic OpenAPI documentation, and Pydantic validation. Django maintains its dominant position in full-stack web application development with its batteries-included philosophy. Flask remains relevant for lightweight scenarios requiring maximum flexibility.'}
      </p>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '无论选择哪个框架，以下实践都应该坚守：使用 SQLAlchemy 2.0（或 Django ORM）管理数据层，Alembic（或 Django migrations）管理数据库变更，Celery 处理耗时后台任务，pytest 确保代码质量，以及 Docker + Gunicorn/Uvicorn + Nginx 实现生产部署。环境变量管理所有密钥，永远不要将密码或 API 密钥硬编码在代码中。'
          : 'Regardless of which framework you choose, certain practices are universal: use SQLAlchemy 2.0 (or Django ORM) for the data layer, Alembic (or Django migrations) for schema changes, Celery for long-running background tasks, pytest for code quality, and Docker + Gunicorn/Uvicorn + Nginx for production deployment. Manage all secrets via environment variables — never hardcode passwords or API keys in your codebase.'}
      </p>
      <p style={{ color: '#334155', marginBottom: 0 }}>
        {isZh
          ? '掌握这些工具和模式，你将能够构建可靠、高性能、易于维护的 Python Web 应用，从小型原型到处理每秒数万请求的生产系统。'
          : 'Master these tools and patterns and you will be equipped to build reliable, high-performance, maintainable Python web applications — from small prototypes to production systems handling tens of thousands of requests per second.'}
      </p>
    </article>
  );
}
