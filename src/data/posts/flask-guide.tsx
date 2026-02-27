'use client';

const translations = {
  en: {
    title: 'Flask Complete Guide: Build Python Web Apps & REST APIs in 2026',
    description: 'Master Flask from scratch — micro-framework architecture, routing, SQLAlchemy, JWT authentication, REST APIs with Flask-RESTX, testing with pytest, and deployment best practices.',
    tldr: 'Flask is a lightweight WSGI micro-framework for Python. Install with pip, define routes with decorators, integrate SQLAlchemy for databases, Flask-JWT-Extended for auth, and deploy with Gunicorn + Nginx or Docker. Choose Flask when you want full control over your stack.',
  },
  zh: {
    title: 'Flask 完整指南：2026 年构建 Python Web 应用和 REST API',
    description: '从零掌握 Flask — 微框架架构、路由、SQLAlchemy、JWT 认证、Flask-RESTX REST API、pytest 测试和部署最佳实践。',
    tldr: 'Flask 是 Python 的轻量级 WSGI 微框架。通过 pip 安装，使用装饰器定义路由，集成 SQLAlchemy 处理数据库，Flask-JWT-Extended 处理认证，并使用 Gunicorn + Nginx 或 Docker 部署。当你想完全掌控技术栈时，选择 Flask。',
  },
};

export default function FlaskGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqData = [
    {
      q: 'Is Flask production-ready?',
      a: 'Yes. Flask itself is production-ready, but the built-in development server is not. For production, run Flask behind Gunicorn or uWSGI with Nginx as a reverse proxy. Many large companies including Pinterest, LinkedIn, and Netflix have used Flask in production at scale.',
    },
    {
      q: 'Does Flask support async/await?',
      a: 'Flask 2.0+ added native async support. You can define async view functions using "async def" and Flask will run them in a thread pool. For full async performance, consider using an ASGI server like Hypercorn instead of Gunicorn. FastAPI is a better choice if async-first is a hard requirement.',
    },
    {
      q: 'What is the difference between Flask and Django?',
      a: 'Flask is a micro-framework that gives you just the essentials (routing, templating, request handling) and lets you choose your own ORM, auth, and admin tools. Django is a batteries-included framework with a built-in ORM, admin panel, auth system, and more. Flask is better for APIs and microservices; Django is better for full-featured web applications.',
    },
    {
      q: 'How do I handle CORS in Flask?',
      a: 'Install Flask-CORS (pip install flask-cors) and use CORS(app) to allow all origins, or configure specific origins: CORS(app, origins=["https://yourfrontend.com"]). You can also apply CORS to individual blueprints for fine-grained control.',
    },
    {
      q: 'What is the Flask application factory pattern?',
      a: 'The application factory pattern creates the Flask app inside a function (usually called create_app). This allows you to create multiple instances of the app with different configurations — great for testing. It also avoids circular imports when using blueprints.',
    },
    {
      q: 'How does Flask compare to FastAPI in performance?',
      a: 'FastAPI is significantly faster than Flask for I/O-bound workloads because it runs on ASGI with native async support. Flask (WSGI) typically handles ~2,000-5,000 requests/sec on a single worker; FastAPI can handle 10,000+ req/sec. However, with multiple Gunicorn workers, Flask performance scales linearly and is sufficient for most applications.',
    },
    {
      q: 'How do I run database migrations in Flask?',
      a: 'Use Flask-Migrate (built on Alembic). After setting it up: run "flask db init" once, then "flask db migrate -m message" to generate migrations, and "flask db upgrade" to apply them. Always commit migration files to version control.',
    },
    {
      q: 'Can Flask be used for WebSockets?',
      a: 'Yes, with Flask-SocketIO. It provides WebSocket support on top of Flask using the Socket.IO protocol, which also handles fallbacks for older browsers. For a simpler WebSocket-only solution, consider using aiohttp or FastAPI with native WebSocket support.',
    },
  ];

  const faqJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(function(item) {
      return {
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      };
    }),
  });

  const containerStyle: React.CSSProperties = {
    maxWidth: '860px',
    margin: '0 auto',
    padding: '0 1rem',
    color: '#1e293b',
    lineHeight: '1.7',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  };

  const tldrStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '1rem 1.25rem',
    borderRadius: '0 8px 8px 0',
    marginBottom: '2rem',
    fontSize: '0.97rem',
  };

  const takeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '1.25rem 1.5rem',
    marginBottom: '2rem',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginTop: '2.5rem',
    marginBottom: '0.75rem',
    color: '#0f172a',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '0.4rem',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.15rem',
    fontWeight: 600,
    marginTop: '1.75rem',
    marginBottom: '0.5rem',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    marginBottom: '1rem',
    color: '#334155',
  };

  const codeBlockStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    borderRadius: '8px',
    padding: '1.25rem',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    marginBottom: '1.25rem',
    fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
  };

  const inlineCodeStyle: React.CSSProperties = {
    background: '#f1f5f9',
    color: '#0f172a',
    borderRadius: '4px',
    padding: '0.15em 0.45em',
    fontSize: '0.875em',
    fontFamily: '"Fira Code", monospace',
    border: '1px solid #e2e8f0',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    overflowX: 'auto',
    display: 'block',
  };

  const thStyle: React.CSSProperties = {
    background: '#1e293b',
    color: '#f8fafc',
    padding: '0.65rem 1rem',
    textAlign: 'left',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  };

  const tdStyle: React.CSSProperties = {
    padding: '0.6rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    verticalAlign: 'top',
  };

  const tdAltStyle: React.CSSProperties = {
    ...tdStyle,
    background: '#f8fafc',
  };

  const badgeGreen: React.CSSProperties = {
    background: '#dcfce7',
    color: '#166534',
    borderRadius: '4px',
    padding: '0.1em 0.5em',
    fontSize: '0.8em',
    fontWeight: 600,
  };

  const badgeYellow: React.CSSProperties = {
    background: '#fef9c3',
    color: '#854d0e',
    borderRadius: '4px',
    padding: '0.1em 0.5em',
    fontSize: '0.8em',
    fontWeight: 600,
  };

  const badgeBlue: React.CSSProperties = {
    background: '#dbeafe',
    color: '#1e40af',
    borderRadius: '4px',
    padding: '0.1em 0.5em',
    fontSize: '0.8em',
    fontWeight: 600,
  };

  const alertStyle: React.CSSProperties = {
    background: '#fefce8',
    border: '1px solid #fde047',
    borderRadius: '8px',
    padding: '0.9rem 1.1rem',
    marginBottom: '1.25rem',
    fontSize: '0.92rem',
    color: '#713f12',
  };

  const tipStyle: React.CSSProperties = {
    background: '#f0fdf4',
    border: '1px solid #86efac',
    borderRadius: '8px',
    padding: '0.9rem 1.1rem',
    marginBottom: '1.25rem',
    fontSize: '0.92rem',
    color: '#14532d',
  };

  const faqItemStyle: React.CSSProperties = {
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '1rem',
    marginBottom: '1rem',
  };

  const faqQStyle: React.CSSProperties = {
    fontWeight: 700,
    color: '#0f172a',
    marginBottom: '0.4rem',
    fontSize: '1rem',
  };

  return (
    <div style={containerStyle}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />

      {/* TL;DR */}
      <div style={tldrStyle}>
        <strong style={{ color: '#0369a1' }}>TL;DR &mdash; </strong>
        {t.tldr}
      </div>

      {/* Key Takeaways */}
      <div style={takeawaysStyle}>
        <strong style={{ display: 'block', marginBottom: '0.6rem', fontSize: '1rem', color: '#0f172a' }}>
          Key Takeaways
        </strong>
        <ul style={{ margin: 0, paddingLeft: '1.4rem', color: '#475569', lineHeight: '1.8' }}>
          <li>Flask is a WSGI micro-framework built on <strong>Werkzeug</strong> (routing/request) and <strong>Jinja2</strong> (templating)</li>
          <li>Use the <strong>application factory pattern</strong> (<code style={inlineCodeStyle}>create_app()</code>) for scalable, testable apps</li>
          <li><strong>Blueprints</strong> let you modularize routes into separate files — essential for large projects</li>
          <li><strong>Flask-SQLAlchemy</strong> + <strong>Flask-Migrate</strong> handle ORM and database migrations</li>
          <li><strong>Flask-JWT-Extended</strong> provides access tokens, refresh tokens, and protected route decorators</li>
          <li>Run Flask in production with <strong>Gunicorn</strong> (multiple workers) behind Nginx</li>
          <li>Flask 2.0+ supports <code style={inlineCodeStyle}>async def</code> views natively</li>
        </ul>
      </div>

      {/* Section 1: What is Flask */}
      <h2 style={h2Style}>1. What Is Flask?</h2>
      <p style={pStyle}>
        <strong>Flask</strong> is a lightweight WSGI micro-framework for Python, created by Armin Ronacher in 2010. Unlike Django, which ships with an ORM, admin interface, and authentication system built in, Flask provides only the bare essentials: URL routing, request/response handling, and templating. Everything else &mdash; databases, authentication, caching, forms &mdash; is added through extensions or custom code.
      </p>
      <p style={pStyle}>
        This philosophy of &ldquo;do one thing and do it well&rdquo; makes Flask an excellent choice for REST APIs, microservices, and developers who want full control over their architecture. Flask is built on two core libraries:
      </p>
      <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', color: '#334155', lineHeight: '1.9' }}>
        <li><strong>Werkzeug</strong> &mdash; a comprehensive WSGI utility library that handles HTTP routing, request parsing, and response generation</li>
        <li><strong>Jinja2</strong> &mdash; a fast, secure templating engine used for rendering HTML (less relevant for pure API backends)</li>
      </ul>

      <h3 style={h3Style}>Flask Architecture Overview</h3>
      <pre style={codeBlockStyle}><code>{
'# Flask request lifecycle\n' +
'#\n' +
'#  HTTP Request\n' +
'#       ↓\n' +
'#  WSGI Server (Gunicorn/uWSGI)\n' +
'#       ↓\n' +
'#  Werkzeug WSGI middleware\n' +
'#       ↓\n' +
'#  Flask app.__call__(environ, start_response)\n' +
'#       ↓\n' +
'#  URL Router (Werkzeug Map)\n' +
'#       ↓\n' +
'#  Before-request hooks  (@app.before_request)\n' +
'#       ↓\n' +
'#  View function          (@app.route)\n' +
'#       ↓\n' +
'#  After-request hooks   (@app.after_request)\n' +
'#       ↓\n' +
'#  Response object\n' +
'#       ↓\n' +
'#  HTTP Response\n' +
'\n' +
'# Core Flask dependencies\n' +
'flask                  # Web framework\n' +
'werkzeug               # WSGI toolkit (auto-installed with Flask)\n' +
'jinja2                 # Templating (auto-installed with Flask)\n' +
'click                  # CLI support (auto-installed with Flask)\n' +
'itsdangerous           # Secure signing (sessions, tokens)\n'
      }</code></pre>

      <p style={pStyle}>
        Flask follows the <strong>WSGI</strong> (Web Server Gateway Interface) standard, which defines a simple interface between web servers and Python web applications. This means Flask apps can run on any WSGI-compatible server: Gunicorn, uWSGI, mod_wsgi (Apache), or even the built-in development server.
      </p>

      {/* Section 2: Getting Started */}
      <h2 style={h2Style}>2. Getting Started</h2>
      <p style={pStyle}>
        Set up a proper Flask project from the start with a virtual environment, the application factory pattern, and a clean directory structure. The factory pattern is critical for testability and avoiding circular imports.
      </p>

      <h3 style={h3Style}>Installation & Project Structure</h3>
      <pre style={codeBlockStyle}><code>{
'# Create and activate virtual environment\n' +
'python -m venv venv\n' +
'source venv/bin/activate    # Linux/macOS\n' +
'# venv\\Scripts\\activate   # Windows\n' +
'\n' +
'# Install Flask and common extensions\n' +
'pip install flask flask-sqlalchemy flask-migrate \\\n' +
'    flask-jwt-extended flask-cors flask-restx\n' +
'\n' +
'pip freeze > requirements.txt\n' +
'\n' +
'# Recommended project structure\n' +
'myapp/\n' +
'├── app/\n' +
'│   ├── __init__.py        # Application factory (create_app)\n' +
'│   ├── config.py          # Configuration classes\n' +
'│   ├── models/\n' +
'│   │   ├── __init__.py\n' +
'│   │   └── user.py        # SQLAlchemy models\n' +
'│   ├── routes/\n' +
'│   │   ├── __init__.py\n' +
'│   │   ├── auth.py        # Auth blueprint\n' +
'│   │   └── users.py       # Users blueprint\n' +
'│   ├── schemas/\n' +
'│   │   └── user.py        # Marshmallow/Pydantic schemas\n' +
'│   └── extensions.py      # Extension instances (db, jwt, etc.)\n' +
'├── tests/\n' +
'│   ├── conftest.py\n' +
'│   └── test_users.py\n' +
'├── migrations/            # Flask-Migrate files\n' +
'├── .env\n' +
'├── wsgi.py                # Production entry point\n' +
'└── requirements.txt\n'
      }</code></pre>

      <h3 style={h3Style}>Application Factory Pattern</h3>
      <pre style={codeBlockStyle}><code>{
'# app/extensions.py\n' +
'from flask_sqlalchemy import SQLAlchemy\n' +
'from flask_migrate import Migrate\n' +
'from flask_jwt_extended import JWTManager\n' +
'from flask_cors import CORS\n' +
'\n' +
'db = SQLAlchemy()\n' +
'migrate = Migrate()\n' +
'jwt = JWTManager()\n' +
'cors = CORS()\n' +
'\n' +
'\n' +
'# app/__init__.py  — Application Factory\n' +
'from flask import Flask\n' +
'from .extensions import db, migrate, jwt, cors\n' +
'from .config import config_map\n' +
'\n' +
'def create_app(config_name: str = "development") -> Flask:\n' +
'    app = Flask(__name__)\n' +
'    app.config.from_object(config_map[config_name])\n' +
'\n' +
'    # Initialize extensions with app\n' +
'    db.init_app(app)\n' +
'    migrate.init_app(app, db)\n' +
'    jwt.init_app(app)\n' +
'    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})\n' +
'\n' +
'    # Register blueprints\n' +
'    from .routes.auth import auth_bp\n' +
'    from .routes.users import users_bp\n' +
'    app.register_blueprint(auth_bp, url_prefix="/api/auth")\n' +
'    app.register_blueprint(users_bp, url_prefix="/api/users")\n' +
'\n' +
'    return app\n' +
'\n' +
'\n' +
'# app/config.py\n' +
'import os\n' +
'from dotenv import load_dotenv\n' +
'\n' +
'load_dotenv()\n' +
'\n' +
'class BaseConfig:\n' +
'    SECRET_KEY = os.environ.get("SECRET_KEY", "change-me-in-production")\n' +
'    SQLALCHEMY_TRACK_MODIFICATIONS = False\n' +
'    JWT_ACCESS_TOKEN_EXPIRES = 900    # 15 minutes\n' +
'    JWT_REFRESH_TOKEN_EXPIRES = 2592000  # 30 days\n' +
'\n' +
'class DevelopmentConfig(BaseConfig):\n' +
'    DEBUG = True\n' +
'    SQLALCHEMY_DATABASE_URI = os.environ.get(\n' +
'        "DATABASE_URL", "sqlite:///dev.db"\n' +
'    )\n' +
'\n' +
'class ProductionConfig(BaseConfig):\n' +
'    DEBUG = False\n' +
'    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")\n' +
'    SQLALCHEMY_ENGINE_OPTIONS = {\n' +
'        "pool_size": 10,\n' +
'        "pool_recycle": 3600,\n' +
'        "pool_pre_ping": True,\n' +
'    }\n' +
'\n' +
'class TestingConfig(BaseConfig):\n' +
'    TESTING = True\n' +
'    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"\n' +
'    JWT_SECRET_KEY = "test-secret"\n' +
'\n' +
'config_map = {\n' +
'    "development": DevelopmentConfig,\n' +
'    "production": ProductionConfig,\n' +
'    "testing": TestingConfig,\n' +
'}\n' +
'\n' +
'\n' +
'# wsgi.py — Production entry point\n' +
'import os\n' +
'from app import create_app\n' +
'\n' +
'app = create_app(os.environ.get("FLASK_ENV", "production"))\n' +
'\n' +
'if __name__ == "__main__":\n' +
'    app.run()\n'
      }</code></pre>

      {/* Section 3: Routing and Views */}
      <h2 style={h2Style}>3. Routing and Views</h2>
      <p style={pStyle}>
        Flask routing uses Python decorators to map URL patterns to view functions. The <code style={inlineCodeStyle}>@app.route()</code> decorator registers a URL rule with the underlying Werkzeug URL map. Blueprints let you organize routes into modular components.
      </p>

      <h3 style={h3Style}>Route Decorators & URL Variables</h3>
      <pre style={codeBlockStyle}><code>{
'from flask import Flask, jsonify, abort\n' +
'\n' +
'app = Flask(__name__)\n' +
'\n' +
'# Basic route\n' +
'@app.route("/")\n' +
'def index():\n' +
'    return jsonify({"message": "Hello, Flask!"})\n' +
'\n' +
'# URL variable with type converter\n' +
'# Converters: string (default), int, float, path, uuid\n' +
'@app.route("/users/<int:user_id>")\n' +
'def get_user(user_id: int):\n' +
'    user = User.query.get_or_404(user_id)\n' +
'    return jsonify(user.to_dict())\n' +
'\n' +
'# Multiple HTTP methods\n' +
'@app.route("/users", methods=["GET", "POST"])\n' +
'def users():\n' +
'    if request.method == "POST":\n' +
'        data = request.get_json(force=True)\n' +
'        # ... create user\n' +
'    users = User.query.all()\n' +
'    return jsonify([u.to_dict() for u in users])\n' +
'\n' +
'# URL with string and uuid converters\n' +
'@app.route("/posts/<uuid:post_id>/comments/<int:comment_id>")\n' +
'def get_comment(post_id, comment_id):\n' +
'    return jsonify({"post_id": str(post_id), "comment_id": comment_id})\n' +
'\n' +
'# Route with optional trailing slash\n' +
'@app.route("/about/")       # Redirects /about → /about/\n' +
'@app.route("/contact")      # Returns 404 for /contact/\n' +
'def static_pages():\n' +
'    return jsonify({"page": "static"})\n'
      }</code></pre>

      <h3 style={h3Style}>Blueprints for Modular Routes</h3>
      <pre style={codeBlockStyle}><code>{
'# app/routes/users.py\n' +
'from flask import Blueprint, jsonify, request\n' +
'from ..extensions import db\n' +
'from ..models.user import User\n' +
'\n' +
'users_bp = Blueprint("users", __name__)\n' +
'\n' +
'@users_bp.route("/")\n' +
'def list_users():\n' +
'    """List all users with pagination."""\n' +
'    page = request.args.get("page", 1, type=int)\n' +
'    per_page = request.args.get("per_page", 20, type=int)\n' +
'    per_page = min(per_page, 100)   # Cap at 100\n' +
'\n' +
'    pagination = User.query.order_by(User.created_at.desc()).paginate(\n' +
'        page=page, per_page=per_page, error_out=False\n' +
'    )\n' +
'    return jsonify({\n' +
'        "users": [u.to_dict() for u in pagination.items],\n' +
'        "total": pagination.total,\n' +
'        "pages": pagination.pages,\n' +
'        "current_page": page,\n' +
'    })\n' +
'\n' +
'@users_bp.route("/<int:user_id>", methods=["GET", "PUT", "DELETE"])\n' +
'def user_detail(user_id):\n' +
'    user = User.query.get_or_404(user_id)\n' +
'\n' +
'    if request.method == "GET":\n' +
'        return jsonify(user.to_dict())\n' +
'\n' +
'    if request.method == "PUT":\n' +
'        data = request.get_json()\n' +
'        for key, value in data.items():\n' +
'            if hasattr(user, key) and key not in ("id", "password_hash"):\n' +
'                setattr(user, key, value)\n' +
'        db.session.commit()\n' +
'        return jsonify(user.to_dict())\n' +
'\n' +
'    if request.method == "DELETE":\n' +
'        db.session.delete(user)\n' +
'        db.session.commit()\n' +
'        return "", 204\n'
      }</code></pre>

      {/* Section 4: Request and Response Handling */}
      <h2 style={h2Style}>4. Request and Response Handling</h2>
      <p style={pStyle}>
        Flask&apos;s <code style={inlineCodeStyle}>request</code> proxy object gives you access to all incoming data: JSON body, form data, query parameters, headers, cookies, and uploaded files. Response helpers like <code style={inlineCodeStyle}>jsonify</code> and <code style={inlineCodeStyle}>make_response</code> let you control status codes, headers, and content type.
      </p>

      <pre style={codeBlockStyle}><code>{
'from flask import Flask, request, jsonify, make_response, abort\n' +
'\n' +
'app = Flask(__name__)\n' +
'\n' +
'@app.route("/api/data", methods=["POST"])\n' +
'def handle_data():\n' +
'    # ---- Reading the request ----\n' +
'\n' +
'    # JSON body (Content-Type: application/json)\n' +
'    data = request.get_json()              # Returns None if not JSON\n' +
'    data = request.get_json(force=True)    # Parse even without Content-Type header\n' +
'    data = request.get_json(silent=True)   # Return None instead of raising error\n' +
'\n' +
'    # Query parameters: /api/data?sort=asc&page=2\n' +
'    sort = request.args.get("sort", "desc")\n' +
'    page = request.args.get("page", 1, type=int)\n' +
'\n' +
'    # Form data (Content-Type: multipart/form-data or application/x-www-form-urlencoded)\n' +
'    username = request.form.get("username")\n' +
'\n' +
'    # Headers\n' +
'    auth = request.headers.get("Authorization")\n' +
'    content_type = request.content_type\n' +
'\n' +
'    # Cookies\n' +
'    session_id = request.cookies.get("session_id")\n' +
'\n' +
'    # File uploads\n' +
'    file = request.files.get("upload")\n' +
'    if file:\n' +
'        filename = secure_filename(file.filename)\n' +
'        file.save(f"/uploads/{filename}")\n' +
'\n' +
'    # Request metadata\n' +
'    client_ip = request.remote_addr\n' +
'    method = request.method\n' +
'    path = request.path\n' +
'\n' +
'    # ---- Building responses ----\n' +
'\n' +
'    # Simple JSON response (200 OK by default)\n' +
'    return jsonify({"status": "ok", "page": page})\n' +
'\n' +
'    # With explicit status code\n' +
'    return jsonify({"user": "created"}), 201\n' +
'\n' +
'    # make_response for full control\n' +
'    resp = make_response(jsonify({"data": "..."}), 200)\n' +
'    resp.headers["X-Custom-Header"] = "value"\n' +
'    resp.set_cookie("session", "abc123", httponly=True, secure=True, samesite="Lax")\n' +
'    return resp\n' +
'\n' +
'\n' +
'# Global error handlers\n' +
'@app.errorhandler(400)\n' +
'def bad_request(e):\n' +
'    return jsonify({"error": "Bad request", "message": str(e)}), 400\n' +
'\n' +
'@app.errorhandler(404)\n' +
'def not_found(e):\n' +
'    return jsonify({"error": "Not found"}), 404\n' +
'\n' +
'@app.errorhandler(500)\n' +
'def server_error(e):\n' +
'    return jsonify({"error": "Internal server error"}), 500\n' +
'\n' +
'\n' +
'# Custom exception class\n' +
'class APIError(Exception):\n' +
'    def __init__(self, message: str, status_code: int = 400):\n' +
'        super().__init__(message)\n' +
'        self.message = message\n' +
'        self.status_code = status_code\n' +
'\n' +
'@app.errorhandler(APIError)\n' +
'def handle_api_error(e: APIError):\n' +
'    return jsonify({"error": e.message}), e.status_code\n' +
'\n' +
'# Usage:\n' +
'# raise APIError("Email already registered", 409)\n'
      }</code></pre>

      {/* Section 5: Database Integration */}
      <h2 style={h2Style}>5. Database Integration with SQLAlchemy</h2>
      <p style={pStyle}>
        <strong>Flask-SQLAlchemy</strong> wraps SQLAlchemy with Flask-friendly conveniences: automatic database session management, model base class, and integration with the application factory. <strong>Flask-Migrate</strong> adds Alembic-powered schema migrations so you never manually alter tables in production.
      </p>

      <h3 style={h3Style}>Defining Models</h3>
      <pre style={codeBlockStyle}><code>{
'# app/models/user.py\n' +
'from datetime import datetime, timezone\n' +
'from ..extensions import db\n' +
'\n' +
'class User(db.Model):\n' +
'    __tablename__ = "users"\n' +
'\n' +
'    id         = db.Column(db.Integer, primary_key=True)\n' +
'    username   = db.Column(db.String(80), unique=True, nullable=False, index=True)\n' +
'    email      = db.Column(db.String(120), unique=True, nullable=False, index=True)\n' +
'    password_hash = db.Column(db.String(255), nullable=False)\n' +
'    is_active  = db.Column(db.Boolean, default=True)\n' +
'    created_at = db.Column(db.DateTime(timezone=True),\n' +
'                           default=lambda: datetime.now(timezone.utc))\n' +
'    updated_at = db.Column(db.DateTime(timezone=True),\n' +
'                           default=lambda: datetime.now(timezone.utc),\n' +
'                           onupdate=lambda: datetime.now(timezone.utc))\n' +
'\n' +
'    # One-to-many relationship\n' +
'    posts = db.relationship("Post", back_populates="author",\n' +
'                             cascade="all, delete-orphan", lazy="dynamic")\n' +
'\n' +
'    def set_password(self, password: str) -> None:\n' +
'        from werkzeug.security import generate_password_hash\n' +
'        self.password_hash = generate_password_hash(password)\n' +
'\n' +
'    def check_password(self, password: str) -> bool:\n' +
'        from werkzeug.security import check_password_hash\n' +
'        return check_password_hash(self.password_hash, password)\n' +
'\n' +
'    def to_dict(self) -> dict:\n' +
'        return {\n' +
'            "id": self.id,\n' +
'            "username": self.username,\n' +
'            "email": self.email,\n' +
'            "is_active": self.is_active,\n' +
'            "created_at": self.created_at.isoformat(),\n' +
'        }\n' +
'\n' +
'    def __repr__(self) -> str:\n' +
'        return f"<User {self.username}>"\n' +
'\n' +
'\n' +
'class Post(db.Model):\n' +
'    __tablename__ = "posts"\n' +
'\n' +
'    id         = db.Column(db.Integer, primary_key=True)\n' +
'    title      = db.Column(db.String(200), nullable=False)\n' +
'    body       = db.Column(db.Text, nullable=False)\n' +
'    author_id  = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)\n' +
'    created_at = db.Column(db.DateTime(timezone=True),\n' +
'                           default=lambda: datetime.now(timezone.utc))\n' +
'\n' +
'    author = db.relationship("User", back_populates="posts")\n' +
'\n' +
'    def to_dict(self) -> dict:\n' +
'        return {\n' +
'            "id": self.id,\n' +
'            "title": self.title,\n' +
'            "body": self.body,\n' +
'            "author": self.author.username,\n' +
'            "created_at": self.created_at.isoformat(),\n' +
'        }\n'
      }</code></pre>

      <h3 style={h3Style}>CRUD Operations</h3>
      <pre style={codeBlockStyle}><code>{
'from .extensions import db\n' +
'from .models.user import User\n' +
'\n' +
'# CREATE\n' +
'def create_user(username: str, email: str, password: str) -> User:\n' +
'    user = User(username=username, email=email)\n' +
'    user.set_password(password)\n' +
'    db.session.add(user)\n' +
'    db.session.commit()\n' +
'    return user\n' +
'\n' +
'# READ — single record\n' +
'user = User.query.get(1)                    # by primary key\n' +
'user = User.query.get_or_404(1)             # raises 404 if not found\n' +
'user = User.query.filter_by(email="a@b.com").first()\n' +
'user = User.query.filter(User.email == "a@b.com").one_or_none()\n' +
'\n' +
'# READ — multiple records\n' +
'users = User.query.all()\n' +
'users = User.query.filter(User.is_active == True).order_by(User.created_at.desc()).limit(10).all()\n' +
'count = User.query.filter_by(is_active=True).count()\n' +
'\n' +
'# Pagination\n' +
'pagination = User.query.paginate(page=2, per_page=20, error_out=False)\n' +
'users = pagination.items\n' +
'total = pagination.total\n' +
'\n' +
'# UPDATE\n' +
'user = User.query.get_or_404(1)\n' +
'user.email = "newemail@example.com"\n' +
'db.session.commit()\n' +
'\n' +
'# Bulk update (SQLAlchemy 2.x style)\n' +
'db.session.execute(\n' +
'    db.update(User).where(User.is_active == False).values(is_active=True)\n' +
')\n' +
'db.session.commit()\n' +
'\n' +
'# DELETE\n' +
'user = User.query.get_or_404(1)\n' +
'db.session.delete(user)\n' +
'db.session.commit()\n' +
'\n' +
'# Bulk delete\n' +
'User.query.filter(User.is_active == False).delete()\n' +
'db.session.commit()\n'
      }</code></pre>

      <h3 style={h3Style}>Database Migrations with Flask-Migrate</h3>
      <pre style={codeBlockStyle}><code>{
'# 1. Initialize migrations (once per project)\n' +
'flask db init\n' +
'# Creates a migrations/ directory with Alembic config\n' +
'\n' +
'# 2. Generate a migration after changing models\n' +
'flask db migrate -m "add users and posts tables"\n' +
'# Creates migrations/versions/abc123_add_users_and_posts_tables.py\n' +
'# ALWAYS review the generated migration before applying!\n' +
'\n' +
'# 3. Apply migrations\n' +
'flask db upgrade\n' +
'\n' +
'# 4. Roll back the last migration\n' +
'flask db downgrade\n' +
'\n' +
'# 5. Check current migration status\n' +
'flask db current\n' +
'flask db history\n' +
'\n' +
'# Typical production deployment script:\n' +
'# git pull origin main\n' +
'# pip install -r requirements.txt\n' +
'# flask db upgrade\n' +
'# systemctl restart gunicorn\n'
      }</code></pre>

      <div style={alertStyle}>
        <strong>Warning:</strong> Always review auto-generated migrations before running <code style={inlineCodeStyle}>flask db upgrade</code> in production. Alembic cannot detect all schema changes (e.g., column type changes, constraint renames) and may generate incomplete or incorrect migrations.
      </div>

      {/* Section 6: Flask-RESTX */}
      <h2 style={h2Style}>6. REST APIs with Flask-RESTX</h2>
      <p style={pStyle}>
        <strong>Flask-RESTX</strong> (the actively maintained fork of Flask-RESTPlus) builds REST API infrastructure on top of Flask: resource-based routing, automatic Swagger UI documentation, request parsing and validation, and response marshalling. It&apos;s the quickest way to build a documented, validated REST API with Flask.
      </p>

      <pre style={codeBlockStyle}><code>{
'from flask import Flask\n' +
'from flask_restx import Api, Resource, fields, reqparse\n' +
'from flask_jwt_extended import jwt_required, get_jwt_identity\n' +
'\n' +
'app = Flask(__name__)\n' +
'api = Api(\n' +
'    app,\n' +
'    version="1.0",\n' +
'    title="My REST API",\n' +
'    description="A production-ready Flask REST API",\n' +
'    doc="/swagger",           # Swagger UI available at /swagger\n' +
'    authorizations={\n' +
'        "Bearer": {\n' +
'            "type": "apiKey",\n' +
'            "in": "header",\n' +
'            "name": "Authorization",\n' +
'            "description": "Add: Bearer <your-token>",\n' +
'        }\n' +
'    },\n' +
'    security="Bearer",\n' +
')\n' +
'\n' +
'# Namespace (equivalent to Blueprint)\n' +
'users_ns = api.namespace("users", description="User operations")\n' +
'\n' +
'# Response models (used for Swagger docs + marshalling)\n' +
'user_model = api.model("User", {\n' +
'    "id":         fields.Integer(readonly=True, description="User ID"),\n' +
'    "username":   fields.String(required=True, description="Username", min_length=3),\n' +
'    "email":      fields.String(required=True, description="Email address"),\n' +
'    "is_active":  fields.Boolean(description="Account status"),\n' +
'    "created_at": fields.DateTime(readonly=True),\n' +
'})\n' +
'\n' +
'user_create_model = api.model("UserCreate", {\n' +
'    "username": fields.String(required=True, min_length=3, max_length=80),\n' +
'    "email":    fields.String(required=True),\n' +
'    "password": fields.String(required=True, min_length=8),\n' +
'})\n' +
'\n' +
'# Request parser for query parameters\n' +
'list_parser = reqparse.RequestParser()\n' +
'list_parser.add_argument("page", type=int, default=1, location="args")\n' +
'list_parser.add_argument("per_page", type=int, default=20, location="args")\n' +
'list_parser.add_argument("search", type=str, location="args")\n' +
'\n' +
'\n' +
'@users_ns.route("/")\n' +
'class UserList(Resource):\n' +
'    @users_ns.doc("list_users")\n' +
'    @users_ns.expect(list_parser)\n' +
'    @users_ns.marshal_list_with(user_model)\n' +
'    @jwt_required()\n' +
'    def get(self):\n' +
'        """List all users (paginated)."""\n' +
'        args = list_parser.parse_args()\n' +
'        query = User.query\n' +
'        if args.search:\n' +
'            query = query.filter(User.username.ilike(f"%{args.search}%"))\n' +
'        return query.paginate(\n' +
'            page=args.page, per_page=args.per_page\n' +
'        ).items\n' +
'\n' +
'    @users_ns.doc("create_user")\n' +
'    @users_ns.expect(user_create_model, validate=True)\n' +
'    @users_ns.marshal_with(user_model, code=201)\n' +
'    def post(self):\n' +
'        """Create a new user."""\n' +
'        data = api.payload\n' +
'        if User.query.filter_by(email=data["email"]).first():\n' +
'            api.abort(409, "Email already registered")\n' +
'        user = User(username=data["username"], email=data["email"])\n' +
'        user.set_password(data["password"])\n' +
'        db.session.add(user)\n' +
'        db.session.commit()\n' +
'        return user, 201\n' +
'\n' +
'\n' +
'@users_ns.route("/<int:user_id>")\n' +
'@users_ns.param("user_id", "The user identifier")\n' +
'class UserDetail(Resource):\n' +
'    @users_ns.marshal_with(user_model)\n' +
'    @jwt_required()\n' +
'    def get(self, user_id):\n' +
'        """Get a user by ID."""\n' +
'        return User.query.get_or_404(user_id)\n' +
'\n' +
'    @users_ns.expect(user_model)\n' +
'    @users_ns.marshal_with(user_model)\n' +
'    @jwt_required()\n' +
'    def put(self, user_id):\n' +
'        """Update a user."""\n' +
'        user = User.query.get_or_404(user_id)\n' +
'        current_user_id = get_jwt_identity()\n' +
'        if user.id != current_user_id:\n' +
'            api.abort(403, "Cannot update another user")\n' +
'        data = api.payload\n' +
'        for key in ("username", "email"):\n' +
'            if key in data:\n' +
'                setattr(user, key, data[key])\n' +
'        db.session.commit()\n' +
'        return user\n' +
'\n' +
'    @users_ns.response(204, "User deleted")\n' +
'    @jwt_required()\n' +
'    def delete(self, user_id):\n' +
'        """Delete a user."""\n' +
'        user = User.query.get_or_404(user_id)\n' +
'        db.session.delete(user)\n' +
'        db.session.commit()\n' +
'        return "", 204\n'
      }</code></pre>

      <div style={tipStyle}>
        <strong>Tip:</strong> Access the auto-generated Swagger UI at <code style={inlineCodeStyle}>/swagger</code> when using Flask-RESTX. It provides interactive documentation where you can test every endpoint directly in the browser &mdash; no Postman needed during development.
      </div>

      {/* Section 7: JWT Authentication */}
      <h2 style={h2Style}>7. Authentication with Flask-JWT-Extended</h2>
      <p style={pStyle}>
        <strong>Flask-JWT-Extended</strong> provides JSON Web Token authentication with access tokens (short-lived), refresh tokens (long-lived), token revocation via a blocklist, and decorators for protecting routes. This is the most production-ready JWT library for Flask.
      </p>

      <pre style={codeBlockStyle}><code>{
'# app/routes/auth.py\n' +
'from flask import Blueprint, jsonify, request\n' +
'from flask_jwt_extended import (\n' +
'    create_access_token,\n' +
'    create_refresh_token,\n' +
'    jwt_required,\n' +
'    get_jwt_identity,\n' +
'    get_jwt,\n' +
'    decode_token,\n' +
')\n' +
'from ..extensions import db, jwt\n' +
'from ..models.user import User, TokenBlocklist\n' +
'\n' +
'auth_bp = Blueprint("auth", __name__)\n' +
'\n' +
'\n' +
'@auth_bp.route("/login", methods=["POST"])\n' +
'def login():\n' +
'    """Exchange credentials for JWT tokens."""\n' +
'    data = request.get_json(silent=True) or {}\n' +
'    email = data.get("email", "").strip().lower()\n' +
'    password = data.get("password", "")\n' +
'\n' +
'    if not email or not password:\n' +
'        return jsonify({"error": "Email and password required"}), 400\n' +
'\n' +
'    user = User.query.filter_by(email=email).first()\n' +
'    if not user or not user.check_password(password):\n' +
'        return jsonify({"error": "Invalid credentials"}), 401\n' +
'\n' +
'    if not user.is_active:\n' +
'        return jsonify({"error": "Account disabled"}), 403\n' +
'\n' +
'    # Create tokens — identity can be any JSON-serializable value\n' +
'    access_token  = create_access_token(identity=user.id)\n' +
'    refresh_token = create_refresh_token(identity=user.id)\n' +
'\n' +
'    return jsonify({\n' +
'        "access_token":  access_token,\n' +
'        "refresh_token": refresh_token,\n' +
'        "token_type":    "Bearer",\n' +
'        "user":          user.to_dict(),\n' +
'    })\n' +
'\n' +
'\n' +
'@auth_bp.route("/refresh", methods=["POST"])\n' +
'@jwt_required(refresh=True)       # Requires refresh token in Authorization header\n' +
'def refresh():\n' +
'    """Issue a new access token using a valid refresh token."""\n' +
'    current_user_id = get_jwt_identity()\n' +
'    new_access_token = create_access_token(identity=current_user_id)\n' +
'    return jsonify({"access_token": new_access_token})\n' +
'\n' +
'\n' +
'@auth_bp.route("/logout", methods=["DELETE"])\n' +
'@jwt_required()\n' +
'def logout():\n' +
'    """Revoke the current access token (add to blocklist)."""\n' +
'    jti = get_jwt()["jti"]       # JWT ID — unique per token\n' +
'    db.session.add(TokenBlocklist(jti=jti))\n' +
'    db.session.commit()\n' +
'    return jsonify({"message": "Token revoked"})\n' +
'\n' +
'\n' +
'@auth_bp.route("/me")\n' +
'@jwt_required()\n' +
'def me():\n' +
'    """Get the current authenticated user."""\n' +
'    user_id = get_jwt_identity()\n' +
'    user = User.query.get_or_404(user_id)\n' +
'    return jsonify(user.to_dict())\n' +
'\n' +
'\n' +
'# Token blocklist model\n' +
'class TokenBlocklist(db.Model):\n' +
'    id         = db.Column(db.Integer, primary_key=True)\n' +
'    jti        = db.Column(db.String(36), nullable=False, index=True)\n' +
'    created_at = db.Column(db.DateTime, server_default=db.func.now())\n' +
'\n' +
'\n' +
'# Register blocklist checker in app factory\n' +
'@jwt.token_in_blocklist_loader\n' +
'def check_if_token_revoked(jwt_header, jwt_payload):\n' +
'    jti = jwt_payload["jti"]\n' +
'    return db.session.query(\n' +
'        TokenBlocklist.id\n' +
'    ).filter_by(jti=jti).scalar() is not None\n' +
'\n' +
'\n' +
'@jwt.expired_token_loader\n' +
'def expired_token_callback(jwt_header, jwt_payload):\n' +
'    return jsonify({"error": "Token has expired", "code": "TOKEN_EXPIRED"}), 401\n' +
'\n' +
'\n' +
'@jwt.invalid_token_loader\n' +
'def invalid_token_callback(error):\n' +
'    return jsonify({"error": "Invalid token", "code": "INVALID_TOKEN"}), 401\n' +
'\n' +
'\n' +
'# Using protected routes:\n' +
'# Authorization: Bearer <access_token>\n' +
'@auth_bp.route("/admin-only")\n' +
'@jwt_required()\n' +
'def admin_only():\n' +
'    user_id = get_jwt_identity()\n' +
'    user = User.query.get_or_404(user_id)\n' +
'    if user.role != "admin":\n' +
'        return jsonify({"error": "Admin access required"}), 403\n' +
'    return jsonify({"data": "secret admin data"})\n'
      }</code></pre>

      {/* Section 8: Testing */}
      <h2 style={h2Style}>8. Testing with pytest</h2>
      <p style={pStyle}>
        Flask has excellent testing support through its built-in test client. Using the application factory pattern, you can create isolated test instances with an in-memory SQLite database. <strong>pytest fixtures</strong> handle setup and teardown automatically.
      </p>

      <pre style={codeBlockStyle}><code>{
'# tests/conftest.py\n' +
'import pytest\n' +
'from app import create_app\n' +
'from app.extensions import db as _db\n' +
'from app.models.user import User\n' +
'\n' +
'\n' +
'@pytest.fixture(scope="session")\n' +
'def app():\n' +
'    """Create application for the whole test session."""\n' +
'    app = create_app("testing")\n' +
'    with app.app_context():\n' +
'        _db.create_all()\n' +
'        yield app\n' +
'        _db.drop_all()\n' +
'\n' +
'\n' +
'@pytest.fixture(scope="function")\n' +
'def client(app):\n' +
'    """Test client that resets database state per test."""\n' +
'    return app.test_client()\n' +
'\n' +
'\n' +
'@pytest.fixture(scope="function")\n' +
'def db_session(app):\n' +
'    """Isolated database session — rolls back after each test."""\n' +
'    with app.app_context():\n' +
'        connection = _db.engine.connect()\n' +
'        transaction = connection.begin()\n' +
'        session = _db.session\n' +
'        yield session\n' +
'        session.close()\n' +
'        transaction.rollback()\n' +
'        connection.close()\n' +
'\n' +
'\n' +
'@pytest.fixture\n' +
'def sample_user(db_session):\n' +
'    """Create a user fixture available to any test."""\n' +
'    user = User(username="testuser", email="test@example.com")\n' +
'    user.set_password("testpassword")\n' +
'    db_session.add(user)\n' +
'    db_session.commit()\n' +
'    return user\n' +
'\n' +
'\n' +
'@pytest.fixture\n' +
'def auth_headers(client, sample_user):\n' +
'    """Return Authorization headers for a logged-in user."""\n' +
'    resp = client.post(\n' +
'        "/api/auth/login",\n' +
'        json={"email": "test@example.com", "password": "testpassword"},\n' +
'    )\n' +
'    token = resp.get_json()["access_token"]\n' +
'    return {"Authorization": f"Bearer {token}"}\n' +
'\n' +
'\n' +
'# tests/test_users.py\n' +
'import pytest\n' +
'\n' +
'\n' +
'class TestAuth:\n' +
'    def test_login_success(self, client, sample_user):\n' +
'        resp = client.post(\n' +
'            "/api/auth/login",\n' +
'            json={"email": "test@example.com", "password": "testpassword"},\n' +
'        )\n' +
'        assert resp.status_code == 200\n' +
'        data = resp.get_json()\n' +
'        assert "access_token" in data\n' +
'        assert "refresh_token" in data\n' +
'\n' +
'    def test_login_wrong_password(self, client, sample_user):\n' +
'        resp = client.post(\n' +
'            "/api/auth/login",\n' +
'            json={"email": "test@example.com", "password": "wrongpassword"},\n' +
'        )\n' +
'        assert resp.status_code == 401\n' +
'        assert resp.get_json()["error"] == "Invalid credentials"\n' +
'\n' +
'    def test_protected_route_without_token(self, client):\n' +
'        resp = client.get("/api/auth/me")\n' +
'        assert resp.status_code == 401\n' +
'\n' +
'    def test_protected_route_with_token(self, client, auth_headers):\n' +
'        resp = client.get("/api/auth/me", headers=auth_headers)\n' +
'        assert resp.status_code == 200\n' +
'        assert resp.get_json()["email"] == "test@example.com"\n' +
'\n' +
'\n' +
'class TestUsers:\n' +
'    def test_create_user(self, client):\n' +
'        resp = client.post(\n' +
'            "/api/users/",\n' +
'            json={\n' +
'                "username": "newuser",\n' +
'                "email": "new@example.com",\n' +
'                "password": "securePass123",\n' +
'            },\n' +
'        )\n' +
'        assert resp.status_code == 201\n' +
'        data = resp.get_json()\n' +
'        assert data["username"] == "newuser"\n' +
'        assert "password" not in data   # Never expose password\n' +
'\n' +
'    def test_duplicate_email(self, client, sample_user):\n' +
'        resp = client.post(\n' +
'            "/api/users/",\n' +
'            json={"username": "other", "email": "test@example.com", "password": "pass"},\n' +
'        )\n' +
'        assert resp.status_code == 409\n' +
'\n' +
'    def test_get_user_list_requires_auth(self, client):\n' +
'        resp = client.get("/api/users/")\n' +
'        assert resp.status_code == 401\n' +
'\n' +
'    def test_get_user_list(self, client, auth_headers, sample_user):\n' +
'        resp = client.get("/api/users/", headers=auth_headers)\n' +
'        assert resp.status_code == 200\n' +
'        data = resp.get_json()\n' +
'        assert isinstance(data, list)\n' +
'        assert len(data) >= 1\n' +
'\n' +
'\n' +
'# Run tests:\n' +
'# pytest tests/ -v\n' +
'# pytest tests/ -v --cov=app --cov-report=html\n'
      }</code></pre>

      {/* Section 9: Comparison Table */}
      <h2 style={h2Style}>9. Flask vs FastAPI vs Django vs Bottle</h2>
      <p style={pStyle}>
        Choosing a Python web framework depends on your project requirements. Here is a detailed comparison of the four most popular options:
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Feature</th>
              <th style={thStyle}>Flask</th>
              <th style={thStyle}>FastAPI</th>
              <th style={thStyle}>Django</th>
              <th style={thStyle}>Bottle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}><strong>Type</strong></td>
              <td style={tdStyle}>Micro-framework</td>
              <td style={tdAltStyle}>API framework</td>
              <td style={tdStyle}>Full-stack</td>
              <td style={tdAltStyle}>Micro-framework</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Interface</strong></td>
              <td style={tdStyle}>WSGI</td>
              <td style={tdAltStyle}>ASGI</td>
              <td style={tdStyle}>WSGI / ASGI</td>
              <td style={tdAltStyle}>WSGI</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Async Support</strong></td>
              <td style={tdStyle}><span style={badgeYellow}>Partial (2.0+)</span></td>
              <td style={tdAltStyle}><span style={badgeGreen}>Native</span></td>
              <td style={tdStyle}><span style={badgeYellow}>Partial (3.1+)</span></td>
              <td style={tdAltStyle}><span style={badgeYellow}>No</span></td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Performance</strong></td>
              <td style={tdStyle}>Medium</td>
              <td style={tdAltStyle}><span style={badgeGreen}>High</span></td>
              <td style={tdStyle}>Medium</td>
              <td style={tdAltStyle}>Medium</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Auto Docs</strong></td>
              <td style={tdStyle}>Via Flask-RESTX</td>
              <td style={tdAltStyle}><span style={badgeGreen}>Built-in (OpenAPI)</span></td>
              <td style={tdStyle}>Via DRF</td>
              <td style={tdAltStyle}>No</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Data Validation</strong></td>
              <td style={tdStyle}>Marshmallow / WTForms</td>
              <td style={tdAltStyle}><span style={badgeGreen}>Pydantic (built-in)</span></td>
              <td style={tdStyle}>Serializers (DRF)</td>
              <td style={tdAltStyle}>Manual</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>ORM</strong></td>
              <td style={tdStyle}>Any (SQLAlchemy recommended)</td>
              <td style={tdAltStyle}>Any (SQLAlchemy recommended)</td>
              <td style={tdStyle}><span style={badgeGreen}>Built-in Django ORM</span></td>
              <td style={tdAltStyle}>Any</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Admin Panel</strong></td>
              <td style={tdStyle}>Flask-Admin (extension)</td>
              <td style={tdAltStyle}>No (use separate tool)</td>
              <td style={tdStyle}><span style={badgeGreen}>Built-in</span></td>
              <td style={tdAltStyle}>No</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Auth System</strong></td>
              <td style={tdStyle}>Flask-Login / JWT-Extended</td>
              <td style={tdAltStyle}>JWT / OAuth2 (manual)</td>
              <td style={tdStyle}><span style={badgeGreen}>Built-in</span></td>
              <td style={tdAltStyle}>Manual</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Learning Curve</strong></td>
              <td style={tdStyle}><span style={badgeGreen}>Low</span></td>
              <td style={tdAltStyle}><span style={badgeGreen}>Low–Medium</span></td>
              <td style={tdStyle}><span style={badgeYellow}>Medium–High</span></td>
              <td style={tdAltStyle}><span style={badgeGreen}>Very Low</span></td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Best For</strong></td>
              <td style={tdStyle}>REST APIs, microservices, flexibility</td>
              <td style={tdAltStyle}>High-perf APIs, type-safe code</td>
              <td style={tdStyle}>Full web apps, content sites</td>
              <td style={tdAltStyle}>Simple scripts, single-file apps</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>GitHub Stars</strong></td>
              <td style={tdStyle}>~68K</td>
              <td style={tdAltStyle}><span style={badgeGreen}>~80K</span></td>
              <td style={tdStyle}>~80K</td>
              <td style={tdAltStyle}>~8K</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Dependencies</strong></td>
              <td style={tdStyle}><span style={badgeGreen}>Minimal</span></td>
              <td style={tdAltStyle}>Starlette + Pydantic</td>
              <td style={tdStyle}>Heavy (batteries included)</td>
              <td style={tdAltStyle}><span style={badgeGreen}>Zero (stdlib only)</span></td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Community</strong></td>
              <td style={tdStyle}><span style={badgeGreen}>Large, mature</span></td>
              <td style={tdAltStyle}><span style={badgeGreen}>Fast-growing</span></td>
              <td style={tdStyle}><span style={badgeGreen}>Very large</span></td>
              <td style={tdAltStyle}><span style={badgeBlue}>Small</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>When to Choose Flask</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem', color: '#334155', lineHeight: '1.9' }}>
        <li>You want <strong>full control</strong> over every component of your stack</li>
        <li>Building a <strong>REST API or microservice</strong> that doesn&apos;t need Django&apos;s admin panel or ORM</li>
        <li>You have an <strong>existing Flask codebase</strong> to maintain or extend</li>
        <li>You need <strong>server-rendered HTML</strong> templates alongside API routes (Jinja2 integration is seamless)</li>
        <li>Your team is already familiar with Flask and ecosystem extensions</li>
        <li>You prefer gradual adoption of async rather than a fully async codebase</li>
      </ul>

      {/* Section 10: Deployment */}
      <h2 style={h2Style}>10. Production Deployment</h2>
      <p style={pStyle}>
        Never run the Flask development server (<code style={inlineCodeStyle}>flask run</code>) in production. Use <strong>Gunicorn</strong> as the WSGI application server with multiple worker processes, and <strong>Nginx</strong> as a reverse proxy to handle SSL termination, static files, and connection limiting.
      </p>

      <h3 style={h3Style}>Gunicorn + Nginx Configuration</h3>
      <pre style={codeBlockStyle}><code>{
'# Install production dependencies\n' +
'pip install gunicorn\n' +
'\n' +
'# Start Flask app with Gunicorn\n' +
'# Formula: workers = (2 * CPU cores) + 1\n' +
'gunicorn wsgi:app \\\n' +
'    --workers 4 \\\n' +
'    --worker-class sync \\\n' +
'    --bind 0.0.0.0:8000 \\\n' +
'    --timeout 120 \\\n' +
'    --keepalive 5 \\\n' +
'    --max-requests 1000 \\\n' +
'    --max-requests-jitter 50 \\\n' +
'    --log-level info \\\n' +
'    --access-logfile /var/log/gunicorn/access.log \\\n' +
'    --error-logfile /var/log/gunicorn/error.log\n' +
'\n' +
'# /etc/nginx/sites-available/myapp\n' +
'server {\n' +
'    listen 80;\n' +
'    server_name myapp.com www.myapp.com;\n' +
'    return 301 https://$host$request_uri;\n' +
'}\n' +
'\n' +
'server {\n' +
'    listen 443 ssl http2;\n' +
'    server_name myapp.com www.myapp.com;\n' +
'\n' +
'    ssl_certificate     /etc/letsencrypt/live/myapp.com/fullchain.pem;\n' +
'    ssl_certificate_key /etc/letsencrypt/live/myapp.com/privkey.pem;\n' +
'\n' +
'    # Security headers\n' +
'    add_header Strict-Transport-Security "max-age=31536000" always;\n' +
'    add_header X-Content-Type-Options    "nosniff";\n' +
'    add_header X-Frame-Options           "DENY";\n' +
'\n' +
'    location / {\n' +
'        proxy_pass         http://127.0.0.1:8000;\n' +
'        proxy_set_header   Host $host;\n' +
'        proxy_set_header   X-Real-IP $remote_addr;\n' +
'        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;\n' +
'        proxy_set_header   X-Forwarded-Proto $scheme;\n' +
'        proxy_read_timeout 120s;\n' +
'    }\n' +
'\n' +
'    location /static/ {\n' +
'        root /var/www/myapp;\n' +
'        expires 30d;\n' +
'        add_header Cache-Control "public, immutable";\n' +
'    }\n' +
'}\n'
      }</code></pre>

      <h3 style={h3Style}>Docker Deployment</h3>
      <pre style={codeBlockStyle}><code>{
'# Dockerfile\n' +
'FROM python:3.12-slim\n' +
'\n' +
'# Security: run as non-root user\n' +
'RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup\n' +
'\n' +
'WORKDIR /app\n' +
'\n' +
'# Install dependencies first (layer caching)\n' +
'COPY requirements.txt .\n' +
'RUN pip install --no-cache-dir -r requirements.txt\n' +
'\n' +
'# Copy application code\n' +
'COPY . .\n' +
'\n' +
'# Change ownership\n' +
'RUN chown -R appuser:appgroup /app\n' +
'USER appuser\n' +
'\n' +
'EXPOSE 8000\n' +
'\n' +
'CMD ["gunicorn", "wsgi:app",\n' +
'     "--workers", "4",\n' +
'     "--bind", "0.0.0.0:8000",\n' +
'     "--timeout", "120"]\n' +
'\n' +
'\n' +
'# docker-compose.yml\n' +
'version: "3.9"\n' +
'services:\n' +
'  app:\n' +
'    build: .\n' +
'    ports:\n' +
'      - "8000:8000"\n' +
'    environment:\n' +
'      - FLASK_ENV=production\n' +
'      - DATABASE_URL=postgresql://user:pass@db:5432/mydb\n' +
'      - SECRET_KEY=${SECRET_KEY}\n' +
'    depends_on:\n' +
'      db:\n' +
'        condition: service_healthy\n' +
'    restart: unless-stopped\n' +
'\n' +
'  db:\n' +
'    image: postgres:16-alpine\n' +
'    environment:\n' +
'      POSTGRES_DB: mydb\n' +
'      POSTGRES_USER: user\n' +
'      POSTGRES_PASSWORD: pass\n' +
'    volumes:\n' +
'      - postgres_data:/var/lib/postgresql/data\n' +
'    healthcheck:\n' +
'      test: ["CMD", "pg_isready", "-U", "user"]\n' +
'      interval: 10s\n' +
'      timeout: 5s\n' +
'      retries: 5\n' +
'\n' +
'  nginx:\n' +
'    image: nginx:alpine\n' +
'    ports:\n' +
'      - "80:80"\n' +
'      - "443:443"\n' +
'    volumes:\n' +
'      - ./nginx.conf:/etc/nginx/conf.d/default.conf\n' +
'      - ./certs:/etc/nginx/certs\n' +
'    depends_on:\n' +
'      - app\n' +
'\n' +
'volumes:\n' +
'  postgres_data:\n'
      }</code></pre>

      {/* Section 11: Best Practices */}
      <h2 style={h2Style}>11. Flask Best Practices</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.25rem', color: '#334155', lineHeight: '2' }}>
        <li><strong>Always use the application factory pattern</strong> &mdash; it enables testing, multiple configs, and avoids circular imports.</li>
        <li><strong>Store all secrets in environment variables</strong> &mdash; never hardcode <code style={inlineCodeStyle}>SECRET_KEY</code>, database URLs, or API keys in source code.</li>
        <li><strong>Use Flask-Migrate for all schema changes</strong> &mdash; never manually ALTER TABLE in a production database.</li>
        <li><strong>Validate all input</strong> &mdash; use Marshmallow, Flask-RESTX models, or Pydantic to validate and deserialize incoming data. Never trust raw <code style={inlineCodeStyle}>request.get_json()</code> directly.</li>
        <li><strong>Use blueprints for everything</strong> &mdash; even small APIs benefit from separation. Register blueprints in <code style={inlineCodeStyle}>create_app()</code> to keep the factory clean.</li>
        <li><strong>Handle errors globally</strong> &mdash; register <code style={inlineCodeStyle}>@app.errorhandler</code> for 400, 401, 403, 404, and 500 to ensure consistent JSON error responses.</li>
        <li><strong>Set up connection pooling</strong> &mdash; configure <code style={inlineCodeStyle}>SQLALCHEMY_ENGINE_OPTIONS</code> with <code style={inlineCodeStyle}>pool_pre_ping=True</code> and <code style={inlineCodeStyle}>pool_recycle</code> in production to avoid stale connections.</li>
        <li><strong>Write tests before deploying</strong> &mdash; use the test client and in-memory SQLite. Aim for at least 80% coverage of your route handlers and service layer.</li>
      </ul>

      {/* FAQ */}
      <h2 style={h2Style}>Frequently Asked Questions</h2>
      <div>
        {faqData.map(function(item, idx) {
          return (
            <div key={idx} style={faqItemStyle}>
              <div style={faqQStyle}>{item.q}</div>
              <p style={{ margin: 0, color: '#475569', lineHeight: '1.7' }}>{item.a}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
