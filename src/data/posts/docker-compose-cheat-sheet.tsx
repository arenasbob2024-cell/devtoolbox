const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Docker Compose Cheat Sheet: Services, Volumes, and Networks',
    intro: 'Docker Compose lets you define and run multi-container applications with a single YAML file. This cheat sheet covers everything from basic service definitions to production-ready stack configurations.',
    structureTitle: 'File Structure',
    structureDesc: 'A docker-compose.yml file consists of four main sections:',
    servicesTitle: 'Service Configuration',
    imageTitle: 'Image vs Build',
    portsTitle: 'Port Mapping',
    envTitle: 'Environment Variables',
    restartTitle: 'Restart Policies',
    dependsTitle: 'Service Dependencies',
    healthTitle: 'Health Checks',
    volumesTitle: 'Volumes',
    bindTitle: 'Bind Mounts',
    namedTitle: 'Named Volumes',
    roTitle: 'Read-Only Mounts',
    networksTitle: 'Networks',
    defaultNet: 'Default Network',
    customNet: 'Custom Networks',
    stacksTitle: 'Complete Stack Examples',
    stack1Title: 'Node.js + MongoDB + Redis',
    stack2Title: 'Django + PostgreSQL',
    stack3Title: 'WordPress + MySQL + phpMyAdmin',
    cliTitle: 'Essential CLI Commands',
    command: 'Command',
    description: 'Description',
    envFileTitle: 'Environment Files (.env)',
    envFileDesc: 'Docker Compose automatically reads a .env file in the same directory:',
    mistakesTitle: 'Common Mistakes',
    mistake: 'Mistake',
    fix: 'Fix',
    m1: 'Using `latest` tag in production', f1: 'Pin specific version tags (e.g., `postgres:16.1`)',
    m2: 'Storing secrets in docker-compose.yml', f2: 'Use .env files or Docker secrets',
    m3: 'Not using named volumes for data', f3: 'Named volumes persist across `docker compose down`',
    m4: 'Missing restart policy', f4: 'Add `restart: unless-stopped` for production services',
    m5: 'Not setting resource limits', f5: 'Use `deploy.resources.limits` for memory/CPU',
    faqTitle: 'FAQ',
    faq1q: 'What is the difference between docker-compose and docker compose?',
    faq1a: 'docker-compose (with hyphen) is the legacy Python-based tool (V1). docker compose (space, no hyphen) is the new Go-based plugin (V2) integrated into Docker CLI. Docker Compose V2 is now the default and recommended version.',
    faq2q: 'How do I persist data in Docker Compose?',
    faq2a: 'Use named volumes for database data and other persistent storage. Named volumes survive docker compose down. Bind mounts map host directories directly and are useful for development.',
    faq3q: 'How do containers communicate in Docker Compose?',
    faq3a: 'All services in a docker-compose.yml share a default network. Services can reach each other using the service name as hostname (e.g., `db:5432` from the app service to the database service).',
    faq4q: 'Can I use Docker Compose in production?',
    faq4a: 'Yes, but for larger deployments consider Docker Swarm or Kubernetes. Docker Compose is great for single-host deployments, development environments, and CI/CD pipelines.',
  },
  zh: {
    title: 'Docker Compose 速查表：服务、卷和网络',
    intro: 'Docker Compose 允许你用一个 YAML 文件定义和运行多容器应用。本速查表涵盖从基本服务定义到生产级栈配置的所有内容。',
    structureTitle: '文件结构', structureDesc: 'docker-compose.yml 文件由四个主要部分组成：',
    servicesTitle: '服务配置', imageTitle: '镜像 vs 构建', portsTitle: '端口映射',
    envTitle: '环境变量', restartTitle: '重启策略', dependsTitle: '服务依赖', healthTitle: '健康检查',
    volumesTitle: '卷', bindTitle: '绑定挂载', namedTitle: '命名卷', roTitle: '只读挂载',
    networksTitle: '网络', defaultNet: '默认网络', customNet: '自定义网络',
    stacksTitle: '完整栈示例', stack1Title: 'Node.js + MongoDB + Redis', stack2Title: 'Django + PostgreSQL', stack3Title: 'WordPress + MySQL + phpMyAdmin',
    cliTitle: '常用 CLI 命令', command: '命令', description: '说明',
    envFileTitle: '环境文件 (.env)', envFileDesc: 'Docker Compose 自动读取同目录下的 .env 文件：',
    mistakesTitle: '常见错误', mistake: '错误', fix: '修复',
    m1: '生产环境使用 `latest` 标签', f1: '使用特定版本标签（如 `postgres:16.1`）',
    m2: '在 docker-compose.yml 中存储密钥', f2: '使用 .env 文件或 Docker secrets',
    m3: '不使用命名卷存储数据', f3: '命名卷在 `docker compose down` 后保留',
    m4: '缺少重启策略', f4: '为生产服务添加 `restart: unless-stopped`',
    m5: '未设置资源限制', f5: '使用 `deploy.resources.limits` 限制内存/CPU',
    faqTitle: '常见问题',
    faq1q: 'docker-compose 和 docker compose 有什么区别？', faq1a: 'docker-compose（带连字符）是旧的 Python 工具（V1）。docker compose（空格）是新的 Go 插件（V2），已集成到 Docker CLI。V2 是默认推荐版本。',
    faq2q: '如何在 Docker Compose 中持久化数据？', faq2a: '使用命名卷。命名卷在 docker compose down 后保留。绑定挂载直接映射主机目录，适合开发环境。',
    faq3q: 'Docker Compose 中容器如何通信？', faq3a: '同一 docker-compose.yml 中的所有服务共享默认网络。服务可以使用服务名作为主机名互相访问。',
    faq4q: 'Docker Compose 可以用于生产环境吗？', faq4a: '可以，但大规模部署建议使用 Docker Swarm 或 Kubernetes。Docker Compose 适合单机部署、开发环境和 CI/CD。',
  },
  ja: {
    title: 'Docker Compose チートシート：サービス、ボリューム、ネットワーク',
    intro: 'Docker Composeは1つのYAMLファイルでマルチコンテナアプリケーションを定義・実行できます。',
    structureTitle: 'ファイル構造', structureDesc: 'docker-compose.ymlは4つのセクションで構成：',
    servicesTitle: 'サービス設定', imageTitle: 'Image vs Build', portsTitle: 'ポートマッピング',
    envTitle: '環境変数', restartTitle: '再起動ポリシー', dependsTitle: 'サービス依存関係', healthTitle: 'ヘルスチェック',
    volumesTitle: 'ボリューム', bindTitle: 'バインドマウント', namedTitle: '名前付きボリューム', roTitle: '読み取り専用マウント',
    networksTitle: 'ネットワーク', defaultNet: 'デフォルトネットワーク', customNet: 'カスタムネットワーク',
    stacksTitle: '完全なスタック例', stack1Title: 'Node.js + MongoDB + Redis', stack2Title: 'Django + PostgreSQL', stack3Title: 'WordPress + MySQL + phpMyAdmin',
    cliTitle: '必須CLIコマンド', command: 'コマンド', description: '説明',
    envFileTitle: '環境ファイル (.env)', envFileDesc: 'Docker Composeは同じディレクトリの.envファイルを自動的に読み取ります：',
    mistakesTitle: 'よくある間違い', mistake: '間違い', fix: '修正',
    m1: '本番で `latest` タグを使用', f1: '特定バージョンタグを使用', m2: 'docker-compose.ymlにシークレットを保存', f2: '.envファイルまたはDocker secretsを使用',
    m3: 'データに名前付きボリュームを使わない', f3: '名前付きボリュームはdownでも保持される', m4: '再起動ポリシーがない', f4: '`restart: unless-stopped`を追加',
    m5: 'リソース制限を設定しない', f5: '`deploy.resources.limits`を使用',
    faqTitle: 'FAQ',
    faq1q: 'docker-composeとdocker composeの違いは？', faq1a: 'docker-compose（ハイフン付き）はレガシーのPythonツール。docker compose（スペース）は新しいGoプラグイン（V2）です。',
    faq2q: 'データを永続化するには？', faq2a: '名前付きボリュームを使用します。docker compose down後も保持されます。',
    faq3q: 'コンテナ間の通信は？', faq3a: '同じcomposeファイルのサービスはデフォルトネットワークを共有し、サービス名でアクセスできます。',
    faq4q: '本番環境で使えますか？', faq4a: 'はい、但し大規模デプロイにはKubernetesを検討してください。',
  },
  ko: {
    title: 'Docker Compose 치트시트: 서비스, 볼륨, 네트워크',
    intro: 'Docker Compose는 하나의 YAML 파일로 멀티 컨테이너 애플리케이션을 정의하고 실행합니다.',
    structureTitle: '파일 구조', structureDesc: 'docker-compose.yml은 4개의 주요 섹션으로 구성:',
    servicesTitle: '서비스 설정', imageTitle: 'Image vs Build', portsTitle: '포트 매핑',
    envTitle: '환경 변수', restartTitle: '재시작 정책', dependsTitle: '서비스 의존성', healthTitle: '헬스 체크',
    volumesTitle: '볼륨', bindTitle: '바인드 마운트', namedTitle: '네임드 볼륨', roTitle: '읽기 전용 마운트',
    networksTitle: '네트워크', defaultNet: '기본 네트워크', customNet: '커스텀 네트워크',
    stacksTitle: '완전한 스택 예시', stack1Title: 'Node.js + MongoDB + Redis', stack2Title: 'Django + PostgreSQL', stack3Title: 'WordPress + MySQL + phpMyAdmin',
    cliTitle: '필수 CLI 명령어', command: '명령어', description: '설명',
    envFileTitle: '환경 파일 (.env)', envFileDesc: 'Docker Compose는 같은 디렉토리의 .env 파일을 자동으로 읽습니다:',
    mistakesTitle: '일반적인 실수', mistake: '실수', fix: '해결',
    m1: '프로덕션에서 `latest` 태그 사용', f1: '특정 버전 태그 사용',
    m2: 'docker-compose.yml에 시크릿 저장', f2: '.env 파일 또는 Docker secrets 사용',
    m3: '데이터에 네임드 볼륨 미사용', f3: '네임드 볼륨은 down 후에도 유지',
    m4: '재시작 정책 누락', f4: '`restart: unless-stopped` 추가',
    m5: '리소스 제한 미설정', f5: '`deploy.resources.limits` 사용',
    faqTitle: 'FAQ',
    faq1q: 'docker-compose와 docker compose의 차이는?', faq1a: 'docker-compose(하이픈)는 레거시 Python 도구. docker compose(공백)는 새로운 Go 플러그인(V2)입니다.',
    faq2q: '데이터를 영속화하려면?', faq2a: '네임드 볼륨을 사용합니다. docker compose down 후에도 유지됩니다.',
    faq3q: '컨테이너 간 통신은?', faq3a: '같은 compose 파일의 서비스는 기본 네트워크를 공유하며 서비스 이름으로 접근합니다.',
    faq4q: '프로덕션에서 사용 가능한가요?', faq4a: '네, 하지만 대규모 배포에는 Kubernetes를 고려하세요.',
  },
  fr: {
    title: 'Aide-mémoire Docker Compose : Services, volumes et réseaux',
    intro: 'Docker Compose permet de définir et exécuter des applications multi-conteneurs avec un seul fichier YAML.',
    structureTitle: 'Structure du fichier', structureDesc: 'Un fichier docker-compose.yml comprend quatre sections principales :',
    servicesTitle: 'Configuration des services', imageTitle: 'Image vs Build', portsTitle: 'Mapping de ports',
    envTitle: 'Variables d\'environnement', restartTitle: 'Politiques de redémarrage', dependsTitle: 'Dépendances', healthTitle: 'Health Checks',
    volumesTitle: 'Volumes', bindTitle: 'Bind Mounts', namedTitle: 'Volumes nommés', roTitle: 'Montages en lecture seule',
    networksTitle: 'Réseaux', defaultNet: 'Réseau par défaut', customNet: 'Réseaux personnalisés',
    stacksTitle: 'Exemples de stacks', stack1Title: 'Node.js + MongoDB + Redis', stack2Title: 'Django + PostgreSQL', stack3Title: 'WordPress + MySQL + phpMyAdmin',
    cliTitle: 'Commandes CLI essentielles', command: 'Commande', description: 'Description',
    envFileTitle: 'Fichiers d\'environnement (.env)', envFileDesc: 'Docker Compose lit automatiquement un fichier .env :',
    mistakesTitle: 'Erreurs courantes', mistake: 'Erreur', fix: 'Solution',
    m1: 'Tag `latest` en production', f1: 'Utiliser des tags de version spécifiques',
    m2: 'Secrets dans docker-compose.yml', f2: 'Utiliser des fichiers .env ou Docker secrets',
    m3: 'Pas de volumes nommés', f3: 'Les volumes nommés persistent après down',
    m4: 'Politique de redémarrage manquante', f4: 'Ajouter `restart: unless-stopped`',
    m5: 'Pas de limites de ressources', f5: 'Utiliser `deploy.resources.limits`',
    faqTitle: 'FAQ',
    faq1q: 'Différence entre docker-compose et docker compose ?', faq1a: 'docker-compose (avec tiret) est l\'ancien outil Python. docker compose (espace) est le nouveau plugin Go (V2).',
    faq2q: 'Comment persister les données ?', faq2a: 'Utilisez des volumes nommés.',
    faq3q: 'Comment les conteneurs communiquent ?', faq3a: 'Ils partagent un réseau par défaut et utilisent les noms de service.',
    faq4q: 'Peut-on l\'utiliser en production ?', faq4a: 'Oui, mais pour les grands déploiements, considérez Kubernetes.',
  },
  de: {
    title: 'Docker Compose Spickzettel: Services, Volumes und Netzwerke',
    intro: 'Docker Compose definiert und startet Multi-Container-Anwendungen mit einer einzigen YAML-Datei.',
    structureTitle: 'Dateistruktur', structureDesc: 'Eine docker-compose.yml besteht aus vier Hauptabschnitten:',
    servicesTitle: 'Service-Konfiguration', imageTitle: 'Image vs Build', portsTitle: 'Port-Mapping',
    envTitle: 'Umgebungsvariablen', restartTitle: 'Neustart-Richtlinien', dependsTitle: 'Abhängigkeiten', healthTitle: 'Health Checks',
    volumesTitle: 'Volumes', bindTitle: 'Bind Mounts', namedTitle: 'Benannte Volumes', roTitle: 'Nur-Lese-Mounts',
    networksTitle: 'Netzwerke', defaultNet: 'Standard-Netzwerk', customNet: 'Benutzerdefinierte Netzwerke',
    stacksTitle: 'Komplette Stack-Beispiele', stack1Title: 'Node.js + MongoDB + Redis', stack2Title: 'Django + PostgreSQL', stack3Title: 'WordPress + MySQL + phpMyAdmin',
    cliTitle: 'Wichtige CLI-Befehle', command: 'Befehl', description: 'Beschreibung',
    envFileTitle: 'Umgebungsdateien (.env)', envFileDesc: 'Docker Compose liest automatisch eine .env-Datei:',
    mistakesTitle: 'Häufige Fehler', mistake: 'Fehler', fix: 'Lösung',
    m1: '`latest` Tag in Produktion', f1: 'Spezifische Version verwenden', m2: 'Secrets in docker-compose.yml', f2: '.env oder Docker Secrets verwenden',
    m3: 'Keine benannten Volumes', f3: 'Benannte Volumes überleben down', m4: 'Fehlende Neustart-Richtlinie', f4: '`restart: unless-stopped` hinzufügen',
    m5: 'Keine Ressourcenlimits', f5: '`deploy.resources.limits` verwenden',
    faqTitle: 'FAQ',
    faq1q: 'Unterschied docker-compose vs docker compose?', faq1a: 'docker-compose (Bindestrich) ist das alte Python-Tool. docker compose (Leerzeichen) ist das neue Go-Plugin (V2).',
    faq2q: 'Daten persistieren?', faq2a: 'Benannte Volumes verwenden.',
    faq3q: 'Container-Kommunikation?', faq3a: 'Services teilen ein Standard-Netzwerk und nutzen Servicenamen.',
    faq4q: 'Für Produktion geeignet?', faq4a: 'Ja, für größere Deployments Kubernetes in Betracht ziehen.',
  },
  es: {
    title: 'Hoja de referencia Docker Compose: Servicios, volúmenes y redes',
    intro: 'Docker Compose permite definir y ejecutar aplicaciones multi-contenedor con un solo archivo YAML.',
    structureTitle: 'Estructura del archivo', structureDesc: 'Un archivo docker-compose.yml consta de cuatro secciones principales:',
    servicesTitle: 'Configuración de servicios', imageTitle: 'Image vs Build', portsTitle: 'Mapeo de puertos',
    envTitle: 'Variables de entorno', restartTitle: 'Políticas de reinicio', dependsTitle: 'Dependencias', healthTitle: 'Health Checks',
    volumesTitle: 'Volúmenes', bindTitle: 'Bind Mounts', namedTitle: 'Volúmenes nombrados', roTitle: 'Montajes de solo lectura',
    networksTitle: 'Redes', defaultNet: 'Red por defecto', customNet: 'Redes personalizadas',
    stacksTitle: 'Ejemplos de stacks completos', stack1Title: 'Node.js + MongoDB + Redis', stack2Title: 'Django + PostgreSQL', stack3Title: 'WordPress + MySQL + phpMyAdmin',
    cliTitle: 'Comandos CLI esenciales', command: 'Comando', description: 'Descripción',
    envFileTitle: 'Archivos de entorno (.env)', envFileDesc: 'Docker Compose lee automáticamente un archivo .env:',
    mistakesTitle: 'Errores comunes', mistake: 'Error', fix: 'Solución',
    m1: 'Tag `latest` en producción', f1: 'Usar tags de versión específicos', m2: 'Secrets en docker-compose.yml', f2: 'Usar archivos .env o Docker secrets',
    m3: 'No usar volúmenes nombrados', f3: 'Persisten después de down', m4: 'Sin política de reinicio', f4: 'Agregar `restart: unless-stopped`',
    m5: 'Sin límites de recursos', f5: 'Usar `deploy.resources.limits`',
    faqTitle: 'FAQ',
    faq1q: '¿Diferencia entre docker-compose y docker compose?', faq1a: 'docker-compose (con guión) es la herramienta Python antigua. docker compose (espacio) es el nuevo plugin Go (V2).',
    faq2q: '¿Cómo persistir datos?', faq2a: 'Usar volúmenes nombrados.',
    faq3q: '¿Cómo se comunican los contenedores?', faq3a: 'Comparten una red por defecto y usan nombres de servicio.',
    faq4q: '¿Se puede usar en producción?', faq4a: 'Sí, pero para grandes despliegues considere Kubernetes.',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };

export default function DockerComposeCheatSheet({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{t.intro}</p>

      <h2 style={h2Style}>{t.structureTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.structureDesc}</p>
      <pre style={codeStyle}><code>{`# docker-compose.yml
services:      # Container definitions
  web:
    image: nginx:alpine
  api:
    build: ./api

volumes:       # Persistent storage
  db-data:

networks:      # Custom networks
  frontend:
  backend:`}</code></pre>

      <h2 style={h2Style}>{t.servicesTitle}</h2>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' }}>{t.imageTitle}</h3>
      <pre style={codeStyle}><code>{`services:
  # Use a pre-built image
  db:
    image: postgres:16

  # Build from Dockerfile
  api:
    build: ./api

  # Build with custom options
  web:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
      args:
        NODE_ENV: production`}</code></pre>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' }}>{t.portsTitle}</h3>
      <pre style={codeStyle}><code>{`services:
  web:
    ports:
      - "80:80"         # host:container
      - "443:443"
      - "3000:3000"     # Expose to localhost
      - "127.0.0.1:8080:80"  # Bind to specific interface`}</code></pre>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' }}>{t.envTitle}</h3>
      <pre style={codeStyle}><code>{`services:
  api:
    # Inline environment variables
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - DB_PORT=5432

    # From external file
    env_file:
      - .env
      - .env.production`}</code></pre>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' }}>{t.restartTitle}</h3>
      <pre style={codeStyle}><code>{`services:
  web:
    restart: "no"             # Default: never restart
  api:
    restart: always           # Always restart
  db:
    restart: unless-stopped   # Restart unless manually stopped
  worker:
    restart: on-failure       # Restart only on failure
    # restart: on-failure:5   # Max 5 retries`}</code></pre>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' }}>{t.healthTitle}</h3>
      <pre style={codeStyle}><code>{`services:
  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s`}</code></pre>

      <h2 style={h2Style}>{t.volumesTitle}</h2>
      <pre style={codeStyle}><code>{`services:
  db:
    volumes:
      # Bind mount (host path : container path)
      - ./data:/var/lib/postgresql/data

      # Named volume
      - db-data:/var/lib/postgresql/data

      # Read-only mount
      - ./config:/etc/app/config:ro

volumes:
  db-data:           # Named volume declaration
    driver: local`}</code></pre>

      <h2 style={h2Style}>{t.networksTitle}</h2>
      <pre style={codeStyle}><code>{`services:
  web:
    networks:
      - frontend
  api:
    networks:
      - frontend
      - backend
  db:
    networks:
      - backend

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true    # No external access`}</code></pre>

      <h2 style={h2Style}>{t.stacksTitle}</h2>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--accent-blue)' }}>{t.stack1Title}</h3>
      <pre style={codeStyle}><code>{`services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGO_URL=mongodb://mongo:27017/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:7
    volumes:
      - mongo-data:/data/db
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    restart: unless-stopped

volumes:
  mongo-data:`}</code></pre>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--accent-blue)' }}>{t.stack2Title}</h3>
      <pre style={codeStyle}><code>{`services:
  web:
    build: .
    command: gunicorn myapp.wsgi:application --bind 0.0.0.0:8000
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgres://postgres:secret@db:5432/myapp
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - static:/app/static

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret
    volumes:
      - pg-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pg-data:
  static:`}</code></pre>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--accent-blue)' }}>{t.stack3Title}</h3>
      <pre style={codeStyle}><code>{`services:
  wordpress:
    image: wordpress:latest
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wp_user
      WORDPRESS_DB_PASSWORD: wp_pass
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wp-content:/var/www/html
    depends_on:
      - db

  db:
    image: mysql:8
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wp_user
      MYSQL_PASSWORD: wp_pass
      MYSQL_ROOT_PASSWORD: root_secret
    volumes:
      - db-data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin:latest
    ports:
      - "8081:80"
    environment:
      PMA_HOST: db

volumes:
  wp-content:
  db-data:`}</code></pre>

      <h2 style={h2Style}>{t.cliTitle}</h2>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>{t.command}</th><th style={thStyle}>{t.description}</th></tr></thead>
        <tbody>
          {[
            ['docker compose up -d', 'Start services in background'],
            ['docker compose down', 'Stop and remove containers'],
            ['docker compose down -v', 'Stop and remove containers + volumes'],
            ['docker compose logs -f', 'Follow service logs'],
            ['docker compose logs api', 'Logs for specific service'],
            ['docker compose ps', 'List running containers'],
            ['docker compose exec api sh', 'Shell into running container'],
            ['docker compose build', 'Build/rebuild images'],
            ['docker compose pull', 'Pull latest images'],
            ['docker compose restart api', 'Restart specific service'],
            ['docker compose config', 'Validate and view config'],
            ['docker compose top', 'Show running processes'],
          ].map(([cmd, desc], i) => (
            <tr key={i}>
              <td style={{...tdStyle, fontFamily: 'monospace', fontWeight: 600, fontSize: 13}}>{cmd}</td>
              <td style={tdStyle}>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={h2Style}>{t.envFileTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.envFileDesc}</p>
      <pre style={codeStyle}><code>{`# .env file
POSTGRES_VERSION=16
POSTGRES_PASSWORD=my_secret_pass
APP_PORT=3000

# docker-compose.yml
services:
  db:
    image: postgres:\${POSTGRES_VERSION}
    environment:
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
  app:
    ports:
      - "\${APP_PORT}:3000"`}</code></pre>

      <h2 style={h2Style}>{t.mistakesTitle}</h2>
      <table style={tableStyle}>
        <thead><tr><th style={thStyle}>{t.mistake}</th><th style={thStyle}>{t.fix}</th></tr></thead>
        <tbody>
          {[[t.m1,t.f1],[t.m2,t.f2],[t.m3,t.f3],[t.m4,t.f4],[t.m5,t.f5]].map(([m,f],i) => (
            <tr key={i}><td style={tdStyle}>{m}</td><td style={tdStyle}>{f}</td></tr>
          ))}
        </tbody>
      </table>

      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[{q:t.faq1q,a:t.faq1a},{q:t.faq2q,a:t.faq2a},{q:t.faq3q,a:t.faq3a},{q:t.faq4q,a:t.faq4a}].map((faq,i) => (
        <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>{faq.q}</summary>
          <p style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
