'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Django Complete Guide: Build Production-Ready Web Apps with Python (ORM, REST API, Deployment)',
    description: 'A comprehensive Django tutorial covering models and ORM, views, URLs, templates, Django REST Framework, authentication with JWT, deployment with Docker and Nginx, and a comparison with Flask, FastAPI, and Ruby on Rails.',
    tldr: 'Django is Python\'s most complete web framework — batteries-included with an ORM, admin panel, authentication, migrations, and templating out of the box. Use Django when you need rapid development with a relational database. Use DRF (Django REST Framework) to build APIs. Deploy with Gunicorn + Nginx for production, and use environment variables for all secrets. Never run with DEBUG=True in production.',
  },
  zh: {
    title: 'Django 完全指南：用 Python 构建生产级 Web 应用（ORM、REST API、部署）',
    description: '全面的 Django 教程，涵盖模型与 ORM、视图、URL、模板、Django REST Framework、JWT 认证、Docker 和 Nginx 部署，以及与 Flask、FastAPI 和 Ruby on Rails 的对比。',
    tldr: 'Django 是 Python 中最完整的 Web 框架——内置 ORM、管理面板、认证、迁移和模板系统，开箱即用。需要快速开发关系型数据库应用时选择 Django。使用 DRF（Django REST Framework）构建 API。生产环境使用 Gunicorn + Nginx 部署，所有密钥使用环境变量管理。切勿在生产环境中使用 DEBUG=True。',
  },
};

export default function DjangoGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const faqData = [
    {
      question: isZh ? 'Django 和 Flask 哪个更好？' : 'Is Django better than Flask?',
      answer: isZh
        ? 'Django 更适合需要完整功能的大型项目：内置 ORM、管理面板、认证系统和迁移工具。Flask 更适合小型微服务或需要高度定制的场景。如果你在构建 CRUD 应用或需要快速搭建原型，Django 的"开箱即用"优势会节省大量时间。'
        : 'Django is better for larger projects needing a full feature set: built-in ORM, admin panel, authentication, and migrations. Flask suits smaller microservices or highly custom stacks. For CRUD applications or rapid prototyping with a relational database, Django\'s batteries-included approach saves significant development time.',
    },
    {
      question: isZh ? 'Django ORM 性能如何？能处理大规模数据吗？' : 'How does the Django ORM perform at scale?',
      answer: isZh
        ? 'Django ORM 在大多数场景下性能出色，但需要注意 N+1 查询问题。使用 select_related() 处理 ForeignKey，使用 prefetch_related() 处理 ManyToMany 关系。对于复杂查询可以使用 .raw() 或 django.db.connection.cursor()。配合数据库索引和 QuerySet 的 .only()/.defer() 进一步优化。'
        : 'The Django ORM performs well in most scenarios, but beware of N+1 queries. Use select_related() for ForeignKey traversals and prefetch_related() for ManyToMany relationships. For complex queries, use .raw() or django.db.connection.cursor(). Combine with database indexes and QuerySet.only()/defer() for further optimization.',
    },
    {
      question: isZh ? 'Django REST Framework 和 FastAPI 如何选择？' : 'When should I choose FastAPI over Django REST Framework?',
      answer: isZh
        ? '如果你的应用需要高并发异步处理（如 WebSocket、实时数据流）或者只需要构建轻量级 API 而不需要 Django 其他功能，FastAPI 是更好的选择。如果你已经在使用 Django 或需要 Django 的 ORM、Admin、Auth 等功能，DRF 是自然的选择，集成更紧密。'
        : 'Choose FastAPI when you need high-concurrency async handling (WebSockets, real-time streams) or are building a lightweight API without needing Django\'s other features. Choose DRF when you are already using Django or need its ORM, Admin, and Auth systems — the integration is seamless and you avoid maintaining two separate frameworks.',
    },
    {
      question: isZh ? '如何在 Django 中处理大文件上传？' : 'How do I handle large file uploads in Django?',
      answer: isZh
        ? '对于大文件上传，在 settings.py 中设置 FILE_UPLOAD_MAX_MEMORY_SIZE 和 DATA_UPLOAD_MAX_MEMORY_SIZE。使用 FileField 或 ImageField 存储文件，生产环境推荐配合 django-storages 将文件存储到 S3 或其他云存储。使用 chunked uploads（分块上传）处理超大文件，可以考虑 django-chunked-upload 库。'
        : 'For large file uploads, configure FILE_UPLOAD_MAX_MEMORY_SIZE and DATA_UPLOAD_MAX_MEMORY_SIZE in settings.py. Use FileField or ImageField for storage, and in production use django-storages to store files in S3 or other cloud storage. For very large files, implement chunked uploads using the django-chunked-upload library.',
    },
    {
      question: isZh ? 'Django 如何做数据库迁移？' : 'How does Django handle database migrations?',
      answer: isZh
        ? 'Django 的迁移系统会自动检测 models.py 的变更并生成迁移文件。使用 makemigrations 生成迁移文件，migrate 执行迁移。迁移文件应提交到版本控制中。生产环境部署时，在启动应用前运行 migrate。如需回滚，使用 migrate app_name migration_number 指定迁移版本。'
        : 'Django\'s migration system automatically detects changes in models.py and generates migration files. Use makemigrations to generate them and migrate to apply them. Migration files should be committed to version control. In production deployments, run migrate before starting the application. To roll back, use migrate app_name migration_number to target a specific migration.',
    },
    {
      question: isZh ? '如何在 Django 中实现缓存？' : 'How do I implement caching in Django?',
      answer: isZh
        ? 'Django 支持多种缓存后端：内存缓存（适合开发）、Memcached 和 Redis（适合生产）。使用 django-redis 集成 Redis 缓存。可以缓存整个视图（@cache_page）、模板片段（{% cache %}）或手动使用 cache.get()/cache.set()。数据库查询结果缓存是最常见的优化点。'
        : 'Django supports multiple cache backends: in-memory (for development), Memcached, and Redis (for production). Use django-redis to integrate Redis. Cache entire views (@cache_page), template fragments ({% cache %}), or use cache.get()/cache.set() manually. Caching database query results is the most impactful optimization.',
    },
    {
      question: isZh ? 'Django 支持异步视图吗？' : 'Does Django support async views?',
      answer: isZh
        ? '从 Django 3.1 开始，Django 支持异步视图、中间件和 ORM 操作。使用 async def 定义异步视图，配合 ASGI 服务器（如 Daphne 或 Uvicorn）运行。注意：Django ORM 的异步支持需要使用 sync_to_async 包装同步 ORM 调用，或使用原生异步 ORM 方法（Django 4.1+）。'
        : 'Since Django 3.1, Django supports async views, middleware, and ORM operations. Define async views with async def and run with an ASGI server like Daphne or Uvicorn. Note: async ORM support requires wrapping synchronous ORM calls with sync_to_async, or using native async ORM methods available in Django 4.1+.',
    },
    {
      question: isZh ? 'Django 项目如何处理多租户（Multi-tenancy）？' : 'How do I implement multi-tenancy in Django?',
      answer: isZh
        ? 'Django 多租户主要有三种方案：1) 行级隔离：每个模型添加 tenant 外键，查询时过滤；2) Schema 隔离：每个租户独立的 PostgreSQL schema，使用 django-tenant-schemas 或 django-tenants 库；3) 独立数据库：每个租户独立数据库，使用 Django 的多数据库路由。大多数 SaaS 应用推荐方案 2，兼顾隔离性和资源效率。'
        : 'There are three main approaches to multi-tenancy in Django: 1) Row-level isolation: add a tenant foreign key to each model and filter queries accordingly; 2) Schema isolation: separate PostgreSQL schemas per tenant using django-tenant-schemas or django-tenants; 3) Separate databases: independent databases per tenant using Django\'s multi-database routing. Schema isolation (option 2) is recommended for most SaaS applications, balancing isolation and resource efficiency.',
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
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '0 8px 8px 0', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <p style={{ margin: 0, fontWeight: 600, color: '#0369a1', marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</p>
        <p style={{ margin: 0, color: '#0c4a6e', fontSize: '1rem' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', marginBottom: '2.5rem' }}>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#1e293b', fontWeight: 700 }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </h2>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? '使用 python -m venv 创建虚拟环境，始终将依赖记录在 requirements.txt 或 pyproject.toml 中。' : 'Always use python -m venv for virtual environments and pin dependencies in requirements.txt or pyproject.toml.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? 'Django ORM 的 select_related() 和 prefetch_related() 是解决 N+1 查询问题的关键工具。' : 'Django ORM\'s select_related() and prefetch_related() are essential for avoiding N+1 query problems.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? '生产环境必须设置 DEBUG=False、配置 ALLOWED_HOSTS 并使用环境变量管理 SECRET_KEY。' : 'Set DEBUG=False, configure ALLOWED_HOSTS, and use environment variables for SECRET_KEY in production — never commit secrets to version control.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? 'Django REST Framework 的 ViewSet + Router 组合可以用最少的代码生成完整的 CRUD API。' : 'DRF ViewSets combined with Routers generate full CRUD APIs with minimal code — use them for standard resource endpoints.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? '使用 collectstatic 和 WhiteNoise（开发/小规模）或 Nginx（生产）提供静态文件。' : 'Use collectstatic with WhiteNoise for small deployments or Nginx for production to serve static files efficiently.'}</li>
          <li style={{ marginBottom: '0', color: '#334155' }}>{isZh ? '数据库迁移文件必须提交到版本控制，并在部署时在启动应用之前运行。' : 'Migration files must be committed to version control and run before starting the application on every deployment.'}</li>
        </ul>
      </div>

      {/* Section 1: What is Django */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '1. 什么是 Django？' : '1. What is Django?'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Django 是一个用 Python 编写的高级 Web 框架，由 Adrian Holovaty 和 Simon Willison 于 2003 年在 Lawrence Journal-World 报社开发，2005 年开源发布。Django 的核心理念是"开箱即用"（batteries-included）：框架内置了你构建现代 Web 应用所需的几乎一切——ORM（对象关系映射）、URL 路由、模板引擎、表单处理、认证系统、管理后台和安全防护。'
          : 'Django is a high-level Python web framework built on the "batteries-included" philosophy. Created by Adrian Holovaty and Simon Willison at Lawrence Journal-World in 2003 and open-sourced in 2005, Django bundles nearly everything you need to build a modern web application: an ORM, URL routing, templating engine, form handling, authentication, admin interface, and security protections — all in one cohesive package.'}
      </p>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Django 遵循 MTV（Model-Template-View）架构模式，这是 MVC 模式的变体：Model 负责数据结构和数据库交互，Template 负责展示层，View 负责业务逻辑和请求处理。Django 的 URL 配置（urls.py）相当于传统 MVC 中的 Controller 路由层。'
          : 'Django follows the MTV (Model-Template-View) architectural pattern, a variant of MVC: Model handles data structure and database interaction, Template handles the presentation layer, and View handles business logic and request processing. Django\'s URL configuration (urls.py) serves as the controller\'s routing layer in the traditional MVC sense.'}
      </p>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Django 被 Instagram、Pinterest、Disqus、Mozilla、National Geographic 等知名网站和公司使用。它特别适合内容管理系统、电子商务平台、新闻网站和需要复杂数据关系的 Web 应用。'
          : 'Django powers Instagram, Pinterest, Disqus, Mozilla, and National Geographic, among many others. It excels at content management systems, e-commerce platforms, news sites, and web applications with complex relational data requirements.'}
      </p>

      {/* Section 2: Getting Started */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '2. 安装与项目初始化' : '2. Installation and Project Setup'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '始终在虚拟环境中安装 Django，避免污染全局 Python 环境。以下是完整的项目初始化流程：'
          : 'Always install Django inside a virtual environment to keep your global Python environment clean. Here is the complete project initialization workflow:'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# Create and activate a virtual environment\n' +
          'python -m venv venv\n' +
          'source venv/bin/activate  # On Windows: venv\\Scripts\\activate\n\n' +
          '# Install Django\n' +
          'pip install django djangorestframework\n' +
          'pip freeze > requirements.txt\n\n' +
          '# Create a new Django project\n' +
          'django-admin startproject myproject .\n\n' +
          '# Create an application inside the project\n' +
          'python manage.py startapp blog\n\n' +
          '# Run the development server\n' +
          'python manage.py runserver\n' +
          '# Visit http://127.0.0.1:8000/'
        }</code>
      </pre>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '项目创建后，需要在 settings.py 中注册新建的应用，并配置数据库连接：'
          : 'After creating the project, register your new app in settings.py and configure the database connection:'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# myproject/settings.py\n\n' +
          'import os\n' +
          'from pathlib import Path\n\n' +
          'BASE_DIR = Path(__file__).resolve().parent.parent\n\n' +
          '# SECURITY WARNING: keep the secret key used in production secret!\n' +
          'SECRET_KEY = os.environ.get("SECRET_KEY", "django-insecure-dev-key-change-in-prod")\n\n' +
          '# SECURITY WARNING: do not run with debug turned on in production!\n' +
          'DEBUG = os.environ.get("DEBUG", "True") == "True"\n\n' +
          'ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")\n\n' +
          'INSTALLED_APPS = [\n' +
          '    "django.contrib.admin",\n' +
          '    "django.contrib.auth",\n' +
          '    "django.contrib.contenttypes",\n' +
          '    "django.contrib.sessions",\n' +
          '    "django.contrib.messages",\n' +
          '    "django.contrib.staticfiles",\n' +
          '    "rest_framework",    # Django REST Framework\n' +
          '    "blog",              # Our application\n' +
          ']\n\n' +
          '# Database configuration (PostgreSQL recommended for production)\n' +
          'DATABASES = {\n' +
          '    "default": {\n' +
          '        "ENGINE": "django.db.backends.postgresql",\n' +
          '        "NAME": os.environ.get("DB_NAME", "mydb"),\n' +
          '        "USER": os.environ.get("DB_USER", "postgres"),\n' +
          '        "PASSWORD": os.environ.get("DB_PASSWORD", ""),\n' +
          '        "HOST": os.environ.get("DB_HOST", "localhost"),\n' +
          '        "PORT": os.environ.get("DB_PORT", "5432"),\n' +
          '    }\n' +
          '}\n\n' +
          '# Static files\n' +
          'STATIC_URL = "/static/"\n' +
          'STATIC_ROOT = BASE_DIR / "staticfiles"\n' +
          'MEDIA_URL = "/media/"\n' +
          'MEDIA_ROOT = BASE_DIR / "media"'
        }</code>
      </pre>

      {/* Section 3: Models and ORM */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '3. 模型与 ORM' : '3. Models and ORM'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Django 的 ORM（Object-Relational Mapper）允许你用 Python 类定义数据库表结构，并通过 Python 对象操作数据，而无需编写 SQL。每个 Model 类对应数据库中的一张表，每个类属性对应一个数据库字段。'
          : 'Django\'s ORM (Object-Relational Mapper) lets you define database tables as Python classes and interact with data through Python objects without writing SQL. Each Model class maps to a database table, and each class attribute maps to a column.'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# blog/models.py\n\n' +
          'from django.db import models\n' +
          'from django.contrib.auth.models import User\n' +
          'from django.utils import timezone\n\n\n' +
          'class Category(models.Model):\n' +
          '    name = models.CharField(max_length=100, unique=True)\n' +
          '    slug = models.SlugField(max_length=100, unique=True)\n' +
          '    description = models.TextField(blank=True)\n\n' +
          '    class Meta:\n' +
          '        verbose_name_plural = "categories"\n' +
          '        ordering = ["name"]\n\n' +
          '    def __str__(self):\n' +
          '        return self.name\n\n\n' +
          'class Post(models.Model):\n' +
          '    STATUS_DRAFT = "draft"\n' +
          '    STATUS_PUBLISHED = "published"\n' +
          '    STATUS_CHOICES = [\n' +
          '        (STATUS_DRAFT, "Draft"),\n' +
          '        (STATUS_PUBLISHED, "Published"),\n' +
          '    ]\n\n' +
          '    title = models.CharField(max_length=200)\n' +
          '    slug = models.SlugField(max_length=200, unique_for_date="published_at")\n' +
          '    author = models.ForeignKey(\n' +
          '        User, on_delete=models.CASCADE, related_name="posts"\n' +
          '    )\n' +
          '    category = models.ForeignKey(\n' +
          '        Category, on_delete=models.SET_NULL, null=True, related_name="posts"\n' +
          '    )\n' +
          '    tags = models.ManyToManyField("Tag", blank=True, related_name="posts")\n' +
          '    body = models.TextField()\n' +
          '    status = models.CharField(\n' +
          '        max_length=10, choices=STATUS_CHOICES, default=STATUS_DRAFT\n' +
          '    )\n' +
          '    created_at = models.DateTimeField(auto_now_add=True)\n' +
          '    updated_at = models.DateTimeField(auto_now=True)\n' +
          '    published_at = models.DateTimeField(null=True, blank=True)\n\n' +
          '    class Meta:\n' +
          '        ordering = ["-published_at"]\n' +
          '        indexes = [\n' +
          '            models.Index(fields=["status", "published_at"]),\n' +
          '            models.Index(fields=["author", "status"]),\n' +
          '        ]\n\n' +
          '    def __str__(self):\n' +
          '        return self.title\n\n' +
          '    def publish(self):\n' +
          '        self.status = self.STATUS_PUBLISHED\n' +
          '        self.published_at = timezone.now()\n' +
          '        self.save()\n\n\n' +
          'class Tag(models.Model):\n' +
          '    name = models.CharField(max_length=50, unique=True)\n' +
          '    slug = models.SlugField(max_length=50, unique=True)\n\n' +
          '    def __str__(self):\n' +
          '        return self.name'
        }</code>
      </pre>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh ? '定义模型后，运行迁移命令创建数据库表：' : 'After defining models, run migrations to create the database tables:'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# Generate migration files from model changes\n' +
          'python manage.py makemigrations blog\n\n' +
          '# Apply migrations to the database\n' +
          'python manage.py migrate\n\n' +
          '# View migration SQL without applying\n' +
          'python manage.py sqlmigrate blog 0001'
        }</code>
      </pre>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh ? 'Django QuerySet API 提供了强大的数据库查询接口：' : 'The Django QuerySet API provides a powerful database query interface:'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# QuerySet API examples\n\n' +
          'from blog.models import Post, Category\n' +
          'from django.db.models import Count, Q, Prefetch\n\n' +
          '# Get all published posts\n' +
          'posts = Post.objects.filter(status="published")\n\n' +
          '# Chain filters\n' +
          'recent_posts = Post.objects.filter(\n' +
          '    status="published",\n' +
          '    published_at__year=2025\n' +
          ').order_by("-published_at")[:10]\n\n' +
          '# Complex Q object queries (OR conditions)\n' +
          'search_results = Post.objects.filter(\n' +
          '    Q(title__icontains="django") | Q(body__icontains="django")\n' +
          ')\n\n' +
          '# Avoid N+1: use select_related for ForeignKey\n' +
          'posts_with_author = Post.objects.select_related("author", "category").all()\n\n' +
          '# Avoid N+1: use prefetch_related for ManyToMany\n' +
          'posts_with_tags = Post.objects.prefetch_related("tags").all()\n\n' +
          '# Aggregation: count posts per category\n' +
          'categories_with_count = Category.objects.annotate(\n' +
          '    post_count=Count("posts", filter=Q(posts__status="published"))\n' +
          ').filter(post_count__gt=0)\n\n' +
          '# Update: bulk update without loading objects\n' +
          'Post.objects.filter(status="draft").update(status="archived")\n\n' +
          '# Get or create\n' +
          'category, created = Category.objects.get_or_create(\n' +
          '    slug="python",\n' +
          '    defaults={"name": "Python", "description": "Python programming"}\n' +
          ')'
        }</code>
      </pre>

      {/* Section 4: Views and URLs */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '4. 视图与 URL 路由' : '4. Views and URL Routing'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Django 支持两种视图类型：函数视图（FBV）和类视图（CBV）。函数视图更简单直接，类视图通过继承提供代码复用。'
          : 'Django supports two types of views: Function-Based Views (FBVs) and Class-Based Views (CBVs). FBVs are simpler and more explicit; CBVs provide code reuse through inheritance and are better for standard CRUD patterns.'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# blog/views.py\n\n' +
          'from django.shortcuts import render, get_object_or_404\n' +
          'from django.views.generic import ListView, DetailView, CreateView\n' +
          'from django.contrib.auth.mixins import LoginRequiredMixin\n' +
          'from django.contrib.auth.decorators import login_required\n' +
          'from django.http import JsonResponse\n' +
          'from .models import Post\n\n\n' +
          '# Function-Based View (FBV)\n' +
          'def post_list(request):\n' +
          '    posts = Post.objects.filter(\n' +
          '        status="published"\n' +
          '    ).select_related("author", "category")[:20]\n' +
          '    return render(request, "blog/post_list.html", {"posts": posts})\n\n\n' +
          '# Class-Based View (CBV)\n' +
          'class PostListView(ListView):\n' +
          '    model = Post\n' +
          '    template_name = "blog/post_list.html"\n' +
          '    context_object_name = "posts"\n' +
          '    paginate_by = 20\n\n' +
          '    def get_queryset(self):\n' +
          '        return Post.objects.filter(\n' +
          '            status="published"\n' +
          '        ).select_related("author", "category")\n\n\n' +
          'class PostDetailView(DetailView):\n' +
          '    model = Post\n' +
          '    template_name = "blog/post_detail.html"\n' +
          '    slug_field = "slug"\n\n' +
          '    def get_queryset(self):\n' +
          '        return Post.objects.filter(status="published")\n\n\n' +
          'class PostCreateView(LoginRequiredMixin, CreateView):\n' +
          '    model = Post\n' +
          '    fields = ["title", "body", "category", "tags", "status"]\n' +
          '    template_name = "blog/post_form.html"\n\n' +
          '    def form_valid(self, form):\n' +
          '        form.instance.author = self.request.user\n' +
          '        return super().form_valid(form)\n\n\n' +
          '# FBV with login required decorator\n' +
          '@login_required\n' +
          'def post_publish(request, pk):\n' +
          '    post = get_object_or_404(Post, pk=pk, author=request.user)\n' +
          '    post.publish()\n' +
          '    return JsonResponse({"status": "published", "id": post.pk})'
        }</code>
      </pre>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh ? 'URL 配置将 URL 模式映射到视图函数：' : 'URL configuration maps URL patterns to view functions:'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# blog/urls.py\n\n' +
          'from django.urls import path\n' +
          'from . import views\n\n' +
          'app_name = "blog"  # Namespace for URL reversing\n\n' +
          'urlpatterns = [\n' +
          '    path("", views.PostListView.as_view(), name="post-list"),\n' +
          '    path("<slug:slug>/", views.PostDetailView.as_view(), name="post-detail"),\n' +
          '    path("create/", views.PostCreateView.as_view(), name="post-create"),\n' +
          '    path("<int:pk>/publish/", views.post_publish, name="post-publish"),\n' +
          ']\n\n\n' +
          '# myproject/urls.py (root URL configuration)\n\n' +
          'from django.contrib import admin\n' +
          'from django.urls import path, include\n' +
          'from django.conf import settings\n' +
          'from django.conf.urls.static import static\n\n' +
          'urlpatterns = [\n' +
          '    path("admin/", admin.site.urls),\n' +
          '    path("blog/", include("blog.urls", namespace="blog")),\n' +
          '    path("api/", include("blog.api_urls")),\n' +
          '] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)'
        }</code>
      </pre>

      {/* Section 5: Templates */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '5. 模板系统（DTL）' : '5. Django Template Language (DTL)'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Django 模板语言（DTL）是一个功能完整的模板引擎，支持模板继承、自定义标签和过滤器。推荐的目录结构是在每个应用下创建 templates/app_name/ 子目录。'
          : 'The Django Template Language (DTL) is a full-featured template engine with inheritance, custom tags, and filters. The recommended structure places templates in a templates/app_name/ subdirectory within each app.'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '{# templates/base.html — base template using template inheritance #}\n' +
          '<!DOCTYPE html>\n' +
          '<html lang="en">\n' +
          '<head>\n' +
          '    <meta charset="UTF-8">\n' +
          '    <title>{% block title %}My Blog{% endblock %}</title>\n' +
          '    {% load static %}\n' +
          '    <link rel="stylesheet" href="{% static \'css/main.css\' %}">\n' +
          '</head>\n' +
          '<body>\n' +
          '    <nav>...</nav>\n' +
          '    <main>\n' +
          '        {% block content %}\n' +
          '        {% endblock %}\n' +
          '    </main>\n' +
          '    <footer>...</footer>\n' +
          '</body>\n' +
          '</html>\n\n\n' +
          '{# templates/blog/post_list.html — child template #}\n' +
          '{% extends "base.html" %}\n\n' +
          '{% block title %}Blog Posts | My Site{% endblock %}\n\n' +
          '{% block content %}\n' +
          '<h1>Latest Posts</h1>\n\n' +
          '{# Loop through posts from context #}\n' +
          '{% for post in posts %}\n' +
          '  <article>\n' +
          '    <h2>\n' +
          '      <a href="{% url \'blog:post-detail\' post.slug %}">{{ post.title }}</a>\n' +
          '    </h2>\n' +
          '    <p>By {{ post.author.get_full_name }} on {{ post.published_at|date:"N j, Y" }}</p>\n' +
          '    <p>{{ post.body|truncatewords:50 }}</p>\n' +
          '  </article>\n' +
          '{% empty %}\n' +
          '  <p>No posts yet.</p>\n' +
          '{% endfor %}\n\n' +
          '{# Pagination #}\n' +
          '{% if is_paginated %}\n' +
          '  {% if page_obj.has_previous %}\n' +
          '    <a href="?page={{ page_obj.previous_page_number }}">Previous</a>\n' +
          '  {% endif %}\n' +
          '  <span>Page {{ page_obj.number }} of {{ page_obj.paginator.num_pages }}</span>\n' +
          '  {% if page_obj.has_next %}\n' +
          '    <a href="?page={{ page_obj.next_page_number }}">Next</a>\n' +
          '  {% endif %}\n' +
          '{% endif %}\n' +
          '{% endblock %}'
        }</code>
      </pre>

      {/* Section 6: Django REST Framework */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '6. Django REST Framework（DRF）' : '6. Django REST Framework (DRF)'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Django REST Framework（DRF）是构建 Django API 的标准库，提供序列化器、APIView、ViewSet、权限系统和可浏览 API 界面。安装后在 INSTALLED_APPS 中添加 "rest_framework"。'
          : 'Django REST Framework (DRF) is the standard library for building APIs with Django. It provides serializers, APIView, ViewSets, a permissions system, and a browsable API interface. Install it with pip and add "rest_framework" to INSTALLED_APPS.'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# blog/serializers.py\n\n' +
          'from rest_framework import serializers\n' +
          'from .models import Post, Category, Tag\n' +
          'from django.contrib.auth.models import User\n\n\n' +
          'class UserSerializer(serializers.ModelSerializer):\n' +
          '    class Meta:\n' +
          '        model = User\n' +
          '        fields = ["id", "username", "first_name", "last_name"]\n\n\n' +
          'class TagSerializer(serializers.ModelSerializer):\n' +
          '    class Meta:\n' +
          '        model = Tag\n' +
          '        fields = ["id", "name", "slug"]\n\n\n' +
          'class PostListSerializer(serializers.ModelSerializer):\n' +
          '    author = UserSerializer(read_only=True)\n' +
          '    category_name = serializers.CharField(\n' +
          '        source="category.name", read_only=True\n' +
          '    )\n' +
          '    tags = TagSerializer(many=True, read_only=True)\n' +
          '    tag_ids = serializers.PrimaryKeyRelatedField(\n' +
          '        source="tags", queryset=Tag.objects.all(),\n' +
          '        many=True, write_only=True\n' +
          '    )\n\n' +
          '    class Meta:\n' +
          '        model = Post\n' +
          '        fields = [\n' +
          '            "id", "title", "slug", "author", "category", "category_name",\n' +
          '            "tags", "tag_ids", "status", "published_at", "created_at"\n' +
          '        ]\n' +
          '        read_only_fields = ["author", "created_at"]\n\n' +
          '    def create(self, validated_data):\n' +
          '        tags = validated_data.pop("tags", [])\n' +
          '        post = Post.objects.create(**validated_data)\n' +
          '        post.tags.set(tags)\n' +
          '        return post'
        }</code>
      </pre>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh ? 'ViewSet 和 Router 是 DRF 中最高效的 API 构建方式：' : 'ViewSets and Routers are the most efficient way to build APIs in DRF:'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# blog/api_views.py\n\n' +
          'from rest_framework import viewsets, permissions, filters\n' +
          'from rest_framework.decorators import action\n' +
          'from rest_framework.response import Response\n' +
          'from django_filters.rest_framework import DjangoFilterBackend\n' +
          'from .models import Post\n' +
          'from .serializers import PostListSerializer\n\n\n' +
          'class PostViewSet(viewsets.ModelViewSet):\n' +
          '    """Full CRUD API for posts."""\n' +
          '    queryset = Post.objects.select_related("author", "category").prefetch_related("tags")\n' +
          '    serializer_class = PostListSerializer\n' +
          '    permission_classes = [permissions.IsAuthenticatedOrReadOnly]\n' +
          '    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]\n' +
          '    filterset_fields = ["status", "category", "author"]\n' +
          '    search_fields = ["title", "body"]\n' +
          '    ordering_fields = ["published_at", "created_at"]\n\n' +
          '    def perform_create(self, serializer):\n' +
          '        serializer.save(author=self.request.user)\n\n' +
          '    @action(detail=True, methods=["post"],\n' +
          '            permission_classes=[permissions.IsAuthenticated])\n' +
          '    def publish(self, request, pk=None):\n' +
          '        post = self.get_object()\n' +
          '        if post.author != request.user:\n' +
          '            return Response({"error": "Not authorized"}, status=403)\n' +
          '        post.publish()\n' +
          '        return Response({"status": "published"})\n\n\n' +
          '# blog/api_urls.py\n\n' +
          'from django.urls import path, include\n' +
          'from rest_framework.routers import DefaultRouter\n' +
          'from .api_views import PostViewSet\n\n' +
          'router = DefaultRouter()\n' +
          'router.register(r"posts", PostViewSet)\n\n' +
          'urlpatterns = [\n' +
          '    path("", include(router.urls)),\n' +
          ']\n' +
          '# This generates:\n' +
          '# GET  /api/posts/           -> list\n' +
          '# POST /api/posts/           -> create\n' +
          '# GET  /api/posts/{id}/      -> retrieve\n' +
          '# PUT  /api/posts/{id}/      -> update\n' +
          '# PATCH /api/posts/{id}/     -> partial_update\n' +
          '# DELETE /api/posts/{id}/    -> destroy\n' +
          '# POST /api/posts/{id}/publish/ -> custom action'
        }</code>
      </pre>

      {/* Section 7: Authentication and Permissions */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '7. 认证与权限' : '7. Authentication and Permissions'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Django 内置了完整的认证系统，包括用户模型、登录/登出视图、密码哈希和会话管理。对于 API，推荐使用 JWT（JSON Web Token）认证，使用 djangorestframework-simplejwt 库。'
          : 'Django has a complete built-in authentication system including user models, login/logout views, password hashing, and session management. For APIs, JWT (JSON Web Token) authentication is recommended, provided by the djangorestframework-simplejwt library.'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# Install JWT library\n' +
          '# pip install djangorestframework-simplejwt\n\n' +
          '# settings.py — configure JWT authentication\n\n' +
          'from datetime import timedelta\n\n' +
          'REST_FRAMEWORK = {\n' +
          '    "DEFAULT_AUTHENTICATION_CLASSES": [\n' +
          '        "rest_framework_simplejwt.authentication.JWTAuthentication",\n' +
          '    ],\n' +
          '    "DEFAULT_PERMISSION_CLASSES": [\n' +
          '        "rest_framework.permissions.IsAuthenticatedOrReadOnly",\n' +
          '    ],\n' +
          '    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",\n' +
          '    "PAGE_SIZE": 20,\n' +
          '    "DEFAULT_THROTTLE_CLASSES": [\n' +
          '        "rest_framework.throttling.AnonRateThrottle",\n' +
          '        "rest_framework.throttling.UserRateThrottle",\n' +
          '    ],\n' +
          '    "DEFAULT_THROTTLE_RATES": {\n' +
          '        "anon": "100/hour",\n' +
          '        "user": "1000/hour",\n' +
          '    },\n' +
          '}\n\n' +
          'SIMPLE_JWT = {\n' +
          '    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),\n' +
          '    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),\n' +
          '    "ROTATE_REFRESH_TOKENS": True,\n' +
          '    "BLACKLIST_AFTER_ROTATION": True,\n' +
          '    "ALGORITHM": "HS256",\n' +
          '    "AUTH_HEADER_TYPES": ("Bearer",),\n' +
          '}\n\n\n' +
          '# urls.py — add JWT token endpoints\n\n' +
          'from rest_framework_simplejwt.views import (\n' +
          '    TokenObtainPairView,\n' +
          '    TokenRefreshView,\n' +
          '    TokenVerifyView,\n' +
          ')\n\n' +
          'urlpatterns += [\n' +
          '    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),\n' +
          '    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),\n' +
          '    path("api/auth/token/verify/", TokenVerifyView.as_view(), name="token_verify"),\n' +
          ']'
        }</code>
      </pre>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh ? 'DRF 提供细粒度的权限控制，可以自定义权限类：' : 'DRF provides granular permission control with custom permission classes:'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# blog/permissions.py\n\n' +
          'from rest_framework import permissions\n\n\n' +
          'class IsAuthorOrReadOnly(permissions.BasePermission):\n' +
          '    """Allow only the author of an object to modify it."""\n\n' +
          '    def has_object_permission(self, request, view, obj):\n' +
          '        # Read permissions are allowed to any request\n' +
          '        if request.method in permissions.SAFE_METHODS:\n' +
          '            return True\n' +
          '        # Write permissions only to the author\n' +
          '        return obj.author == request.user\n\n\n' +
          'class IsAdminOrReadOnly(permissions.BasePermission):\n' +
          '    """Allow only admin users to modify; read-only for others."""\n\n' +
          '    def has_permission(self, request, view):\n' +
          '        if request.method in permissions.SAFE_METHODS:\n' +
          '            return True\n' +
          '        return request.user and request.user.is_staff'
        }</code>
      </pre>

      {/* Section 8: Deployment */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '8. 生产部署' : '8. Production Deployment'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '生产部署 Django 的标准方案是：Gunicorn（WSGI 服务器）+ Nginx（反向代理）。Docker 使部署更加一致和可移植。以下是完整的 Docker 配置：'
          : 'The standard production deployment stack for Django is Gunicorn (WSGI server) + Nginx (reverse proxy). Docker makes deployments consistent and portable. Here is a complete Docker configuration:'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# Dockerfile\n\n' +
          'FROM python:3.12-slim\n\n' +
          'ENV PYTHONDONTWRITEBYTECODE=1 \\\n' +
          '    PYTHONUNBUFFERED=1 \\\n' +
          '    PIP_NO_CACHE_DIR=1\n\n' +
          'WORKDIR /app\n\n' +
          '# Install system dependencies\n' +
          'RUN apt-get update && apt-get install -y \\\n' +
          '    postgresql-client \\\n' +
          '    && rm -rf /var/lib/apt/lists/*\n\n' +
          '# Install Python dependencies\n' +
          'COPY requirements.txt .\n' +
          'RUN pip install --upgrade pip && pip install -r requirements.txt\n\n' +
          '# Copy project\n' +
          'COPY . .\n\n' +
          '# Collect static files\n' +
          'RUN python manage.py collectstatic --noinput\n\n' +
          'EXPOSE 8000\n\n' +
          'CMD ["gunicorn", "myproject.wsgi:application", \\\n' +
          '     "--bind", "0.0.0.0:8000", \\\n' +
          '     "--workers", "4", \\\n' +
          '     "--worker-class", "gthread", \\\n' +
          '     "--threads", "2", \\\n' +
          '     "--timeout", "60", \\\n' +
          '     "--access-logfile", "-"]'
        }</code>
      </pre>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# docker-compose.yml\n\n' +
          'version: "3.9"\n\n' +
          'services:\n' +
          '  db:\n' +
          '    image: postgres:16-alpine\n' +
          '    volumes:\n' +
          '      - postgres_data:/var/lib/postgresql/data/\n' +
          '    environment:\n' +
          '      POSTGRES_DB: ${DB_NAME}\n' +
          '      POSTGRES_USER: ${DB_USER}\n' +
          '      POSTGRES_PASSWORD: ${DB_PASSWORD}\n\n' +
          '  redis:\n' +
          '    image: redis:7-alpine\n\n' +
          '  web:\n' +
          '    build: .\n' +
          '    command: >\n' +
          '      sh -c "python manage.py migrate &&\n' +
          '             gunicorn myproject.wsgi:application\n' +
          '             --bind 0.0.0.0:8000 --workers 4"\n' +
          '    volumes:\n' +
          '      - static_volume:/app/staticfiles\n' +
          '      - media_volume:/app/media\n' +
          '    env_file: .env\n' +
          '    depends_on:\n' +
          '      - db\n' +
          '      - redis\n\n' +
          '  nginx:\n' +
          '    image: nginx:alpine\n' +
          '    ports:\n' +
          '      - "80:80"\n' +
          '      - "443:443"\n' +
          '    volumes:\n' +
          '      - ./nginx.conf:/etc/nginx/conf.d/default.conf\n' +
          '      - static_volume:/static\n' +
          '      - media_volume:/media\n' +
          '    depends_on:\n' +
          '      - web\n\n' +
          'volumes:\n' +
          '  postgres_data:\n' +
          '  static_volume:\n' +
          '  media_volume:'
        }</code>
      </pre>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# nginx.conf\n\n' +
          'upstream django {\n' +
          '    server web:8000;\n' +
          '}\n\n' +
          'server {\n' +
          '    listen 80;\n' +
          '    server_name yourdomain.com;\n\n' +
          '    client_max_body_size 20M;\n\n' +
          '    location /static/ {\n' +
          '        alias /static/;\n' +
          '        expires 1y;\n' +
          '        add_header Cache-Control "public, immutable";\n' +
          '    }\n\n' +
          '    location /media/ {\n' +
          '        alias /media/;\n' +
          '    }\n\n' +
          '    location / {\n' +
          '        proxy_pass http://django;\n' +
          '        proxy_set_header Host $host;\n' +
          '        proxy_set_header X-Real-IP $remote_addr;\n' +
          '        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n' +
          '        proxy_set_header X-Forwarded-Proto $scheme;\n' +
          '    }\n' +
          '}'
        }</code>
      </pre>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '生产环境的 .env 文件应包含所有敏感配置，永远不要提交到版本控制：'
          : 'The production .env file should contain all sensitive configuration and must never be committed to version control:'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# .env (add to .gitignore!)\n\n' +
          'SECRET_KEY=your-long-random-secret-key-here\n' +
          'DEBUG=False\n' +
          'ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com\n\n' +
          'DB_NAME=mydb\n' +
          'DB_USER=dbuser\n' +
          'DB_PASSWORD=your-strong-db-password\n' +
          'DB_HOST=db\n' +
          'DB_PORT=5432\n\n' +
          'REDIS_URL=redis://redis:6379/0\n\n' +
          'EMAIL_HOST=smtp.sendgrid.net\n' +
          'EMAIL_PORT=587\n' +
          'EMAIL_HOST_USER=apikey\n' +
          'EMAIL_HOST_PASSWORD=your-sendgrid-api-key\n' +
          'DEFAULT_FROM_EMAIL=noreply@yourdomain.com'
        }</code>
      </pre>

      {/* Section 9: Comparison Table */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '9. Django vs Flask vs FastAPI vs Ruby on Rails' : '9. Django vs Flask vs FastAPI vs Ruby on Rails'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1.25rem' }}>
        {isZh
          ? '选择 Web 框架时，需要根据项目规模、团队经验、性能需求和生态系统来决策。以下对比四种主流框架的关键维度：'
          : 'Choosing a web framework depends on project scale, team experience, performance requirements, and ecosystem. Here is a comparison of four major frameworks across key dimensions:'}
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#f8fafc' }}>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>{isZh ? '特性' : 'Feature'}</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Django</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Flask</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>FastAPI</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>Rails</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                feature: isZh ? '语言' : 'Language',
                django: 'Python',
                flask: 'Python',
                fastapi: 'Python',
                rails: 'Ruby',
              },
              {
                feature: isZh ? '类型' : 'Type',
                django: isZh ? '全栈' : 'Full-stack',
                flask: isZh ? '微框架' : 'Micro',
                fastapi: isZh ? 'API 框架' : 'API framework',
                rails: isZh ? '全栈' : 'Full-stack',
              },
              {
                feature: isZh ? '内置 ORM' : 'Built-in ORM',
                django: '✓',
                flask: '✗',
                fastapi: '✗',
                rails: '✓',
              },
              {
                feature: isZh ? '管理后台' : 'Admin Panel',
                django: '✓',
                flask: '✗',
                fastapi: '✗',
                rails: '✗',
              },
              {
                feature: isZh ? '自动迁移' : 'Auto Migrations',
                django: '✓',
                flask: isZh ? '插件' : 'Plugin',
                fastapi: isZh ? '需 Alembic' : 'Alembic',
                rails: '✓',
              },
              {
                feature: isZh ? 'REST API' : 'REST API',
                django: 'DRF',
                flask: 'Flask-RESTful',
                fastapi: isZh ? '内置' : 'Built-in',
                rails: 'Native',
              },
              {
                feature: isZh ? '异步支持' : 'Async Support',
                django: isZh ? 'Django 3.1+' : 'Django 3.1+',
                flask: isZh ? '有限' : 'Limited',
                fastapi: isZh ? '原生' : 'Native',
                rails: isZh ? '有限' : 'Limited',
              },
              {
                feature: isZh ? '性能（吞吐量）' : 'Performance',
                django: isZh ? '中等' : 'Moderate',
                flask: isZh ? '中等' : 'Moderate',
                fastapi: isZh ? '高（异步）' : 'High (async)',
                rails: isZh ? '中等' : 'Moderate',
              },
              {
                feature: isZh ? '学习曲线' : 'Learning Curve',
                django: isZh ? '中等' : 'Medium',
                flask: isZh ? '低' : 'Low',
                fastapi: isZh ? '低' : 'Low',
                rails: isZh ? '中等' : 'Medium',
              },
              {
                feature: isZh ? '文档质量' : 'Documentation',
                django: isZh ? '优秀' : 'Excellent',
                flask: isZh ? '良好' : 'Good',
                fastapi: isZh ? '优秀' : 'Excellent',
                rails: isZh ? '优秀' : 'Excellent',
              },
              {
                feature: isZh ? '社区规模' : 'Community Size',
                django: isZh ? '大' : 'Large',
                flask: isZh ? '大' : 'Large',
                fastapi: isZh ? '快速增长' : 'Fast-growing',
                rails: isZh ? '大' : 'Large',
              },
              {
                feature: isZh ? '适合场景' : 'Best For',
                django: isZh ? '全功能 Web 应用' : 'Full-featured web apps',
                flask: isZh ? '小型服务' : 'Small services',
                fastapi: isZh ? '高性能 API' : 'High-perf APIs',
                rails: isZh ? '快速原型' : 'Rapid prototyping',
              },
            ].map((row, idx) => (
              <tr key={idx} style={{ background: idx % 2 === 0 ? '#ffffff' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: '#334155' }}>{row.feature}</td>
                <td style={{ padding: '0.65rem 1rem', color: '#475569' }}>{row.django}</td>
                <td style={{ padding: '0.65rem 1rem', color: '#475569' }}>{row.flask}</td>
                <td style={{ padding: '0.65rem 1rem', color: '#475569' }}>{row.fastapi}</td>
                <td style={{ padding: '0.65rem 1rem', color: '#475569' }}>{row.rails}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '决策指南：如果你需要快速构建包含管理后台、用户认证和数据库操作的 Web 应用，选 Django。如果你在构建高并发的纯 API 服务，考虑 FastAPI。如果你需要最大灵活性或者项目非常简单，选 Flask。如果你的团队有 Ruby 背景或者在构建 SaaS MVP，选 Rails。'
          : 'Decision guide: Choose Django for rapid development of full-featured web applications with admin, auth, and database needs. Choose FastAPI for high-concurrency pure API services. Choose Flask for maximum flexibility or very simple projects. Choose Rails when your team has Ruby experience or you are building a SaaS MVP.'}
      </p>

      {/* Section 10: Admin and Additional Features */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '10. Django Admin 与信号系统' : '10. Django Admin and Signals'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Django 自动生成的管理后台（Admin）是其最强大的特性之一。通过简单的配置，你可以获得功能完整的数据管理界面，支持搜索、过滤、批量操作和自定义视图。'
          : 'Django\'s auto-generated Admin interface is one of its most powerful features. With minimal configuration, you get a fully functional data management interface with search, filtering, bulk actions, and custom views.'}
      </p>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# blog/admin.py\n\n' +
          'from django.contrib import admin\n' +
          'from .models import Post, Category, Tag\n\n\n' +
          '@admin.register(Post)\n' +
          'class PostAdmin(admin.ModelAdmin):\n' +
          '    list_display = ["title", "author", "category", "status", "published_at"]\n' +
          '    list_filter = ["status", "category", "author", "created_at"]\n' +
          '    search_fields = ["title", "body"]\n' +
          '    prepopulated_fields = {"slug": ("title",)}\n' +
          '    raw_id_fields = ["author"]\n' +
          '    date_hierarchy = "published_at"\n' +
          '    ordering = ["-created_at"]\n' +
          '    actions = ["make_published", "make_draft"]\n\n' +
          '    @admin.action(description="Mark selected posts as published")\n' +
          '    def make_published(self, request, queryset):\n' +
          '        updated = queryset.update(status="published")\n' +
          '        self.message_user(request, f"{updated} posts marked as published.")\n\n' +
          '    @admin.action(description="Mark selected posts as draft")\n' +
          '    def make_draft(self, request, queryset):\n' +
          '        queryset.update(status="draft")\n\n\n' +
          '@admin.register(Category)\n' +
          'class CategoryAdmin(admin.ModelAdmin):\n' +
          '    list_display = ["name", "slug"]\n' +
          '    prepopulated_fields = {"slug": ("name",)}\n\n\n' +
          '# Django Signals — decoupled event handling\n\n' +
          'from django.db.models.signals import post_save\n' +
          'from django.dispatch import receiver\n' +
          'from django.core.mail import send_mail\n\n\n' +
          '@receiver(post_save, sender=Post)\n' +
          'def notify_on_publish(sender, instance, created, **kwargs):\n' +
          '    """Send notification email when a post is published."""\n' +
          '    if not created and instance.status == "published":\n' +
          '        send_mail(\n' +
          '            subject=f"New post published: {instance.title}",\n' +
          '            message=f"Check out the new post: {instance.title}",\n' +
          '            from_email="noreply@example.com",\n' +
          '            recipient_list=["editor@example.com"],\n' +
          '            fail_silently=True,\n' +
          '        )'
        }</code>
      </pre>

      {/* FAQ Section */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '常见问题' : 'Frequently Asked Questions'}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqData.map((item, index) => (
          <div key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem 1.5rem', background: '#ffffff' }}>
            <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>
              {item.question}
            </h3>
            <p style={{ margin: 0, color: '#475569', lineHeight: '1.7' }}>
              {item.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Conclusion */}
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1.5rem', marginTop: '2.5rem' }}>
        <h2 style={{ margin: '0 0 0.75rem 0', fontSize: '1.1rem', fontWeight: 700, color: '#166534' }}>
          {isZh ? '总结' : 'Conclusion'}
        </h2>
        <p style={{ margin: 0, color: '#15803d', lineHeight: '1.7' }}>
          {isZh
            ? 'Django 是 Python 生态中最成熟、最完整的 Web 框架。其"开箱即用"的设计哲学让开发者可以专注于业务逻辑而非基础设施。核心要点：使用虚拟环境管理依赖，优化 ORM 查询避免 N+1 问题，使用 DRF 构建标准化的 REST API，生产环境使用 Docker + Gunicorn + Nginx，始终通过环境变量管理密钥。掌握 Django 将让你有能力独立构建从简单博客到复杂电商平台的任何 Web 应用。'
            : 'Django is the most mature and complete web framework in the Python ecosystem. Its batteries-included philosophy lets developers focus on business logic rather than infrastructure plumbing. Key principles: manage dependencies with virtual environments, optimize ORM queries to avoid N+1 problems, use DRF for standardized REST APIs, deploy with Docker + Gunicorn + Nginx in production, and always manage secrets via environment variables. Mastering Django gives you the capability to independently build anything from a simple blog to a complex e-commerce platform.'}
        </p>
      </div>
    </article>
  );
}
