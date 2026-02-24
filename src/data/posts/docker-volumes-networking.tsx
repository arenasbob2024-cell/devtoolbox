'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Docker Volumes and Networking: Complete Tutorial with Bind Mount vs Volume Guide',
    intro: `Docker volumes and networking are the two areas that trip up most developers moving from basic container usage to production deployments. This comprehensive tutorial explains named volumes, bind mounts, tmpfs, Docker networking modes, container communication, and load balancing with upstream servers — with practical examples for every concept.`,
    s1Title: 'Understanding Docker Storage: Volumes vs Bind Mounts',
    s2Title: 'Working with Docker Named Volumes',
    s3Title: 'Docker Networking Fundamentals',
    s4Title: 'Container-to-Container Communication',
    s5Title: 'Docker Compose: Volumes and Networks',
    s6Title: 'Production Patterns and Best Practices',
    faqTitle: 'Frequently Asked Questions',
    conclusionTitle: 'Conclusion',
    relatedTitle: 'Related Tools',
  },
  fr: { title: 'Volumes et réseaux Docker : tutoriel complet', intro: 'Les volumes et les réseaux Docker sont les deux domaines qui posent le plus de problèmes aux développeurs.', s1Title: 'Stockage Docker : Volumes vs Bind Mounts', s2Title: 'Travailler avec les volumes nommés', s3Title: 'Fondamentaux du réseau Docker', s4Title: 'Communication entre conteneurs', s5Title: 'Docker Compose : volumes et réseaux', s6Title: 'Patterns de production', faqTitle: 'Questions fréquentes', conclusionTitle: 'Conclusion', relatedTitle: 'Outils associés' },
  de: { title: 'Docker Volumes und Networking: Komplettes Tutorial', intro: 'Docker Volumes und Networking sind die beiden Bereiche, die Entwicklern beim Übergang zur Produktionsbereitstellung am meisten Schwierigkeiten bereiten.', s1Title: 'Docker Storage: Volumes vs. Bind Mounts', s2Title: 'Mit Docker Named Volumes arbeiten', s3Title: 'Docker Networking Grundlagen', s4Title: 'Container-zu-Container-Kommunikation', s5Title: 'Docker Compose: Volumes und Networks', s6Title: 'Produktionsmuster', faqTitle: 'Häufig gestellte Fragen', conclusionTitle: 'Fazit', relatedTitle: 'Verwandte Tools' },
  es: { title: 'Volúmenes y redes de Docker: tutorial completo', intro: 'Los volúmenes y la red de Docker son las dos áreas que más problemas causan a los desarrolladores.', s1Title: 'Almacenamiento Docker: Volúmenes vs Bind Mounts', s2Title: 'Trabajar con volúmenes nombrados', s3Title: 'Fundamentos de red Docker', s4Title: 'Comunicación entre contenedores', s5Title: 'Docker Compose: volúmenes y redes', s6Title: 'Patrones de producción', faqTitle: 'Preguntas frecuentes', conclusionTitle: 'Conclusión', relatedTitle: 'Herramientas relacionadas' },
  it: { title: 'Volumi e reti Docker: tutorial completo', intro: 'I volumi e le reti Docker sono le due aree che creano più problemi agli sviluppatori.', s1Title: 'Archiviazione Docker: volumi vs bind mount', s2Title: 'Lavorare con i volumi nominati', s3Title: 'Fondamentali di rete Docker', s4Title: 'Comunicazione tra contenitori', s5Title: 'Docker Compose: volumi e reti', s6Title: 'Pattern di produzione', faqTitle: 'Domande frequenti', conclusionTitle: 'Conclusione', relatedTitle: 'Strumenti correlati' },
  pt: { title: 'Volumes e redes Docker: tutorial completo', intro: 'Volumes e redes Docker são as duas áreas que mais causam problemas aos desenvolvedores.', s1Title: 'Armazenamento Docker: volumes vs bind mounts', s2Title: 'Trabalhando com volumes nomeados', s3Title: 'Fundamentos de rede Docker', s4Title: 'Comunicação entre contêineres', s5Title: 'Docker Compose: volumes e redes', s6Title: 'Padrões de produção', faqTitle: 'Perguntas frequentes', conclusionTitle: 'Conclusão', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'Docker volumes en netwerken: complete tutorial', intro: 'Docker volumes en netwerken zijn de twee gebieden die de meeste ontwikkelaars problemen geven.', s1Title: 'Docker opslag: volumes vs bind mounts', s2Title: 'Werken met Docker named volumes', s3Title: 'Docker netwerk fundamenten', s4Title: 'Container-naar-container communicatie', s5Title: 'Docker Compose: volumes en netwerken', s6Title: 'Productiepatronen', faqTitle: 'Veelgestelde vragen', conclusionTitle: 'Conclusie', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Woluminy i sieć Docker: kompletny samouczek', intro: 'Woluminy i sieć Docker to dwa obszary, które sprawiają deweloperom największe trudności.', s1Title: 'Przechowywanie Docker: woluminy vs bind mounty', s2Title: 'Praca z nazwanymi woluminami', s3Title: 'Podstawy sieci Docker', s4Title: 'Komunikacja między kontenerami', s5Title: 'Docker Compose: woluminy i sieci', s6Title: 'Wzorce produkcyjne', faqTitle: 'Często zadawane pytania', conclusionTitle: 'Podsumowanie', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'Docker volymer och nätverk: komplett handledning', intro: 'Docker-volymer och nätverk är de två områdena som orsakar mest problem för utvecklare.', s1Title: 'Docker-lagring: volymer vs bind mounts', s2Title: 'Arbeta med namngivna Docker-volymer', s3Title: 'Docker-nätverksfundament', s4Title: 'Container-till-container-kommunikation', s5Title: 'Docker Compose: volymer och nätverk', s6Title: 'Produktionsmönster', faqTitle: 'Vanliga frågor', conclusionTitle: 'Slutsats', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'Docker volumer og nettverk: komplett veiledning', intro: 'Docker-volumer og nettverk er de to områdene som skaper mest problemer for utviklere.', s1Title: 'Docker-lagring: volumer vs bind mounts', s2Title: 'Arbeide med navngitte Docker-volumer', s3Title: 'Docker-nettverksfundamenter', s4Title: 'Container-til-container-kommunikasjon', s5Title: 'Docker Compose: volumer og nettverk', s6Title: 'Produksjonsmønstre', faqTitle: 'Ofte stilte spørsmål', conclusionTitle: 'Konklusjon', relatedTitle: 'Relaterte verktøy' },
  zh: { title: 'Docker 卷和网络：完整教程（绑定挂载与卷对比）', intro: 'Docker 卷和网络是大多数开发者从基础容器使用过渡到生产部署时最容易遇到问题的两个领域。', s1Title: '理解 Docker 存储：卷与绑定挂载', s2Title: '使用 Docker 命名卷', s3Title: 'Docker 网络基础', s4Title: '容器间通信', s5Title: 'Docker Compose：卷和网络', s6Title: '生产模式和最佳实践', faqTitle: '常见问题', conclusionTitle: '总结', relatedTitle: '相关工具' },
  ja: { title: 'Docker ボリュームとネットワーキング: 完全チュートリアル', intro: 'Docker ボリュームとネットワーキングは、開発者が本番環境へ移行する際に最も問題になる 2 つの領域です。', s1Title: 'Docker ストレージ: ボリュームとバインドマウント', s2Title: 'Docker 名前付きボリュームの操作', s3Title: 'Docker ネットワークの基礎', s4Title: 'コンテナ間通信', s5Title: 'Docker Compose: ボリュームとネットワーク', s6Title: '本番環境のパターン', faqTitle: 'よくある質問', conclusionTitle: 'まとめ', relatedTitle: '関連ツール' },
  ko: { title: 'Docker 볼륨 및 네트워킹 완벽 가이드', intro: 'Docker 볼륨과 네트워킹은 개발자들이 기본 컨테이너 사용에서 프로덕션 배포로 이동할 때 가장 많은 문제를 겪는 두 영역입니다.', s1Title: 'Docker 스토리지: 볼륨 vs 바인드 마운트', s2Title: 'Docker 명명된 볼륨 작업', s3Title: 'Docker 네트워킹 기초', s4Title: '컨테이너 간 통신', s5Title: 'Docker Compose: 볼륨과 네트워크', s6Title: '프로덕션 패턴', faqTitle: '자주 묻는 질문', conclusionTitle: '결론', relatedTitle: '관련 도구' },
  id: { title: 'Volume dan Jaringan Docker: Tutorial Lengkap', intro: 'Volume dan jaringan Docker adalah dua area yang paling sering menyebabkan masalah bagi pengembang.', s1Title: 'Penyimpanan Docker: Volume vs Bind Mount', s2Title: 'Bekerja dengan Volume Docker Bernama', s3Title: 'Dasar-dasar Jaringan Docker', s4Title: 'Komunikasi Antar Kontainer', s5Title: 'Docker Compose: Volume dan Jaringan', s6Title: 'Pola Produksi', faqTitle: 'Pertanyaan yang Sering Diajukan', conclusionTitle: 'Kesimpulan', relatedTitle: 'Alat Terkait' },
  th: { title: 'Docker Volumes และ Networking: คู่มือฉบับสมบูรณ์', intro: 'Docker volumes และ networking เป็นสองพื้นที่ที่นักพัฒนาส่วนใหญ่ประสบปัญหามากที่สุด', s1Title: 'การจัดเก็บข้อมูล Docker: Volumes vs Bind Mounts', s2Title: 'การทำงานกับ Docker Named Volumes', s3Title: 'พื้นฐานเครือข่าย Docker', s4Title: 'การสื่อสารระหว่าง Container', s5Title: 'Docker Compose: Volumes และ Networks', s6Title: 'รูปแบบการใช้งานในสภาพแวดล้อม Production', faqTitle: 'คำถามที่พบบ่อย', conclusionTitle: 'สรุป', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

export default function DockerVolumesNetworking({ lang = 'en' }: { lang?: string }) {
  const s = t[lang] || t['en'];

  const storageTypes = `# Storage type comparison

# 1. Named Volume (recommended for persistent data)
docker run -v mydata:/app/data postgres:16
# Docker manages the volume at /var/lib/docker/volumes/mydata/

# 2. Bind Mount (recommended for development, source code)
docker run -v /home/user/myapp:/app node:20
# Or using --mount syntax (more explicit)
docker run --mount type=bind,source=/home/user/myapp,target=/app node:20

# 3. tmpfs (in-memory, never written to disk)
docker run --tmpfs /tmp:rw,size=100m nginx

# Key differences:
# Named volumes:
#   - Managed by Docker (docker volume ls, docker volume rm)
#   - Persist after container removal
#   - Can be shared between containers
#   - Better performance on Mac/Windows (no translation layer)
#   - Can be backed up with: docker run --volumes-from <container> -v backup:/backup busybox tar cvf /backup/backup.tar /data

# Bind mounts:
#   - Host filesystem path mounted into container
#   - Great for development (live code reloading)
#   - Host path must exist
#   - Full access to host filesystem (security consideration)`;

  const namedVolumes = `# Create and inspect volumes
docker volume create myapp-data
docker volume ls
docker volume inspect myapp-data

# Use volume with container
docker run -d \\
  --name postgres-db \\
  -e POSTGRES_PASSWORD=secret \\
  -v pgdata:/var/lib/postgresql/data \\
  postgres:16

# Backup a volume
docker run --rm \\
  --volumes-from postgres-db \\
  -v \$(pwd)/backup:/backup \\
  busybox \\
  tar czf /backup/pgdata-backup.tar.gz /var/lib/postgresql/data

# Restore from backup
docker run --rm \\
  -v pgdata-restored:/var/lib/postgresql/data \\
  -v \$(pwd)/backup:/backup \\
  busybox \\
  tar xzf /backup/pgdata-backup.tar.gz -C /

# Remove unused volumes (be careful!)
docker volume prune   # removes all unused local volumes
docker volume rm myapp-data  # remove specific volume`;

  const networking = `# Default networks
docker network ls
# bridge   - default; containers can communicate by IP
# host     - container uses host's network namespace
# none     - no networking

# Create custom bridge network
docker network create myapp-net

# Connect containers to custom network
docker run -d --name api --network myapp-net myapp-api:latest
docker run -d --name db  --network myapp-net postgres:16

# On custom bridge networks, containers resolve each other by NAME
# Inside 'api' container: ping db   (works!)
# On default bridge: must use IP address

# Inspect network
docker network inspect myapp-net

# Connect running container to network
docker network connect myapp-net my-container

# Port publishing
docker run -p 8080:3000 myapp      # host 8080 -> container 3000
docker run -p 127.0.0.1:8080:3000 myapp  # bind to localhost only
docker run -P myapp               # publish all exposed ports randomly`;

  const containerComm = `# Multi-container app communication example

# 1. Create shared network
docker network create webapp-net

# 2. Start database (not exposed to host)
docker run -d \\
  --name postgres \\
  --network webapp-net \\
  -e POSTGRES_DB=myapp \\
  -e POSTGRES_USER=app \\
  -e POSTGRES_PASSWORD=secret \\
  -v pgdata:/var/lib/postgresql/data \\
  postgres:16

# 3. Start Redis cache (not exposed to host)
docker run -d \\
  --name redis \\
  --network webapp-net \\
  redis:7-alpine

# 4. Start API (exposed on port 3000)
docker run -d \\
  --name api \\
  --network webapp-net \\
  -p 3000:3000 \\
  -e DATABASE_URL=postgres://app:secret@postgres/myapp \\
  -e REDIS_URL=redis://redis:6379 \\
  myapp-api:latest

# API reaches postgres by hostname "postgres" and redis by "redis"
# No need to know IP addresses - DNS resolution on custom networks`;

  const composeVolumesNetworks = `# docker-compose.yml
version: '3.9'

services:
  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/myapp
      REDIS_URL: redis://cache:6379
    volumes:
      - ./api:/app          # bind mount for development
      - /app/node_modules   # anonymous volume (don't overwrite)
    networks:
      - backend
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started

  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    networks:
      - backend
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

  cache:
    image: redis:7-alpine
    volumes:
      - redisdata:/data
    networks:
      - backend
    command: redis-server --appendonly yes

volumes:
  pgdata:           # named volume (Docker managed)
  redisdata:

networks:
  backend:
    driver: bridge`;

  const faqs = [
    {
      q: 'What is the difference between a Docker volume and a bind mount?',
      a: 'Named volumes are managed entirely by Docker — Docker chooses where to store them (usually /var/lib/docker/volumes/), and they persist after containers are removed. Bind mounts map a specific host directory into the container. Use named volumes for production data (databases, uploads) and bind mounts for development (mounting source code for live reloading).'
    },
    {
      q: 'Why can\'t containers on the default bridge network reach each other by name?',
      a: 'The default bridge network does not provide automatic DNS resolution. Containers can only communicate by IP address, which is dynamic and impractical. Custom bridge networks (created with docker network create) automatically provide DNS resolution so containers can reach each other using their container name as a hostname.'
    },
    {
      q: 'How do I share data between two Docker containers?',
      a: 'Create a named volume and mount it into both containers: docker run -v shared-data:/data container1 and docker run -v shared-data:/data container2. Both containers will read and write to the same underlying storage. Be careful about concurrent writes — ensure only one container writes at a time or use a database instead.'
    },
    {
      q: 'What happens to my data when I run docker-compose down?',
      a: 'docker-compose down stops and removes containers and networks, but preserves named volumes. Your database data is safe. To also remove volumes, run docker-compose down -v, but this will permanently delete all data in volumes. Always back up volumes before running down -v.'
    },
    {
      q: 'How do I backup a Docker volume?',
      a: 'Use a temporary busybox container to archive the volume contents: docker run --rm --volumes-from <container> -v $(pwd):/backup busybox tar czf /backup/backup.tar.gz /data. This creates a compressed archive in your current directory. To restore, reverse the process with tar xzf.'
    },
    {
      q: 'Should I use host networking mode in production?',
      a: 'Host networking (--network host) bypasses Docker\'s network isolation and lets the container use the host\'s network interfaces directly. It gives better performance but eliminates isolation — a security risk. Only use it for specialized use cases like network monitoring tools. For web apps, use bridge networking with published ports instead.'
    },
  ];

  return (
    <article className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold mb-4">{s.title}</h1>
      <p className="text-lg text-gray-700 mb-8">{s.intro}</p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s1Title}</h2>
        <p className="mb-4">
          Docker offers three types of storage: named volumes (Docker-managed, best for production data), bind mounts (host path mapped in, best for development), and tmpfs (in-memory only, for secrets and temp files).
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{storageTypes}</code>
        </pre>
        <p>The golden rule: use <strong>named volumes</strong> for any data you care about persisting, and <strong>bind mounts</strong> for development workflows where you need live code reloading.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s2Title}</h2>
        <p className="mb-4">
          Named volumes survive container removal, can be shared between containers, and support efficient backup and restore workflows.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{namedVolumes}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s3Title}</h2>
        <p className="mb-4">
          Docker provides several network drivers. Bridge is the default for most use cases, host removes network isolation for maximum performance, and none disables networking entirely.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{networking}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s4Title}</h2>
        <p className="mb-4">
          Containers on the same custom bridge network automatically resolve each other by name. This makes multi-container applications easy to wire together without hardcoding IP addresses.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{containerComm}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s5Title}</h2>
        <p className="mb-4">
          Docker Compose simplifies multi-container setups. Volumes and networks defined at the top level are shared across services, and Compose handles creation and teardown automatically.
        </p>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-4">
          <code>{composeVolumesNetworks}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.s6Title}</h2>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong>Never store sensitive data in images</strong> — use volumes or environment variables for secrets</li>
          <li><strong>Always set healthchecks</strong> on database containers so dependent services wait properly</li>
          <li><strong>Use read-only bind mounts</strong> for config files: <code>-v ./config.json:/app/config.json:ro</code></li>
          <li><strong>Limit network exposure</strong> — only publish ports that need to be reachable from the host</li>
          <li><strong>Use tmpfs for sensitive runtime data</strong> (session tokens, temp files) that should never touch disk</li>
          <li><strong>Automate volume backups</strong> with scheduled container jobs before any deployments</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.faqTitle}</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">{s.conclusionTitle}</h2>
        <p className="mb-4">
          Mastering Docker volumes and networking is essential for building reliable containerized applications. Use named volumes for persistent data, custom bridge networks for container communication, and Docker Compose to orchestrate multi-service applications with proper health checks and dependencies.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">{s.relatedTitle}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Link href="/tools/json-formatter" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">JSON Formatter</Link>
          <Link href="/tools/yaml-validator" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">YAML Validator</Link>
          <Link href="/tools/base64-decoder" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">Base64 Decoder</Link>
          <Link href="/tools/jwt-decoder" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">JWT Decoder</Link>
          <Link href="/tools/json-diff-tool" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">JSON Diff Tool</Link>
          <Link href="/tools/regex-tester" className="block p-3 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 font-medium text-sm">Regex Tester</Link>
        </div>
      </section>
    </article>
  );
}
