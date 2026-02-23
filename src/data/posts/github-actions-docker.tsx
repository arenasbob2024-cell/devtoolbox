'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'GitHub Actions + Docker CI/CD: Build, Push to Registry, and Deploy to Server',
    intro: 'A robust CI/CD pipeline with GitHub Actions and Docker automates the full deployment lifecycle: test, build Docker image, push to registry, and deploy to servers — all triggered by a git push. This guide builds a <strong>production-grade pipeline</strong> with multi-platform builds, security scanning, and zero-downtime deployments.',
    h2Overview: 'Pipeline Overview',
    overviewP1: 'The pipeline has four stages: CI (test), Build (Docker image), Push (to registry), and Deploy (to server). Each stage runs in isolated GitHub Actions runners.',
    h2DockerSetup: 'Dockerfile Best Practices',
    dockerP1: 'A well-structured Dockerfile is the foundation. Multi-stage builds dramatically reduce the final image size by separating build dependencies from runtime dependencies.',
    h2BasicPipeline: 'Basic CI/CD Pipeline',
    pipelineP1: 'This workflow builds and pushes to GitHub Container Registry (ghcr.io) on every push to main, and deploys to a server using SSH.',
    h2Advanced: 'Advanced Pipeline Features',
    advancedP1: 'Production pipelines need additional features: multi-platform builds, security scanning, environment-specific deployments, and rollback capabilities.',
    h2Deploy: 'Zero-Downtime Deployment',
    deployP1: 'Blue-green deployments switch traffic between two identical environments. Docker Compose makes this straightforward on a single server.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'How do I store secrets in GitHub Actions?',
    faq1A: 'Go to your repository Settings → Secrets and variables → Actions → New repository secret. Common secrets to add: DOCKERHUB_USERNAME, DOCKERHUB_TOKEN, SSH_PRIVATE_KEY, SERVER_HOST, SERVER_USER. Never hardcode secrets in workflow files. Access them with ${{ secrets.SECRET_NAME }}.',
    faq2Q: 'What is the difference between ghcr.io and Docker Hub?',
    faq2A: 'GitHub Container Registry (ghcr.io) is free for public repositories and integrated with GitHub permissions. Docker Hub offers a free tier with rate limits and one private repository. For GitHub-hosted projects, ghcr.io is the natural choice. For multi-platform deployments independent of GitHub, Docker Hub is more universal.',
    faq3Q: 'How do I build for both AMD64 and ARM64?',
    faq3A: 'Use docker/setup-qemu-action and docker/setup-buildx-action in your workflow, then set platforms: linux/amd64,linux/arm64 in the docker/build-push-action. QEMU provides software emulation; Buildx orchestrates the multi-platform build. This is essential for deploying to both x86 servers and ARM instances (AWS Graviton, Apple Silicon).',
    faq4Q: 'How do I implement environment-specific deployments?',
    faq4A: 'Use GitHub Environments for staging and production. Create environments in repository Settings → Environments, add protection rules (required reviewers for production), and environment-specific secrets. Trigger staging deployments on push to main, and production deployments on tagged releases or manual approval.',
    relatedTitle: 'Related Tools',
  },
  fr: { title: 'GitHub Actions + Docker CI/CD : Build, Push vers le registre et déploiement', intro: 'Un pipeline CI/CD robuste avec GitHub Actions et Docker automatise tout le cycle de déploiement. Ce guide construit un <strong>pipeline de niveau production</strong> avec des builds multi-plateforme et des déploiements sans temps d\'arrêt.', h2Overview: 'Vue d\'ensemble du pipeline', overviewP1: 'Le pipeline comporte quatre étapes : CI (test), Build (image Docker), Push (vers le registre) et Deploy (vers le serveur).', h2DockerSetup: 'Meilleures pratiques pour Dockerfile', dockerP1: 'Un Dockerfile bien structuré est la base. Les builds multi-étapes réduisent considérablement la taille de l\'image finale.', h2BasicPipeline: 'Pipeline CI/CD de base', pipelineP1: 'Ce workflow construit et pousse vers GitHub Container Registry (ghcr.io) à chaque push sur main.', h2Advanced: 'Fonctionnalités avancées du pipeline', advancedP1: 'Les pipelines de production nécessitent des fonctionnalités supplémentaires : builds multi-plateforme, analyse de sécurité et déploiements sans temps d\'arrêt.', h2Deploy: 'Déploiement sans temps d\'arrêt', deployP1: 'Les déploiements blue-green basculent le trafic entre deux environnements identiques.', h2Faq: 'Questions fréquentes', faq1Q: 'Comment stocker les secrets dans GitHub Actions ?', faq1A: 'Allez dans les paramètres du dépôt → Secrets and variables → Actions → New repository secret.', faq2Q: 'Différence entre ghcr.io et Docker Hub ?', faq2A: 'GitHub Container Registry est gratuit pour les dépôts publics et intégré aux permissions GitHub.', faq3Q: 'Comment builder pour AMD64 et ARM64 ?', faq3A: 'Utilisez docker/setup-qemu-action et docker/setup-buildx-action, puis définissez les plateformes dans docker/build-push-action.', faq4Q: 'Comment implémenter des déploiements spécifiques à l\'environnement ?', faq4A: 'Utilisez les environnements GitHub pour staging et production.', relatedTitle: 'Outils associés' },
  de: { title: 'GitHub Actions + Docker CI/CD: Build, Push in Registry und Deployment', intro: 'Eine robuste CI/CD-Pipeline mit GitHub Actions und Docker automatisiert den gesamten Deployment-Lebenszyklus. Dieser Leitfaden erstellt eine <strong>produktionsreife Pipeline</strong> mit Multi-Platform-Builds und Zero-Downtime-Deployments.', h2Overview: 'Pipeline-Übersicht', overviewP1: 'Die Pipeline hat vier Stufen: CI (Test), Build (Docker-Image), Push (zur Registry) und Deploy (zum Server).', h2DockerSetup: 'Dockerfile Best Practices', dockerP1: 'Ein gut strukturiertes Dockerfile ist die Grundlage. Multi-Stage-Builds reduzieren die endgültige Imagegröße erheblich.', h2BasicPipeline: 'Grundlegende CI/CD-Pipeline', pipelineP1: 'Dieser Workflow erstellt und pusht bei jedem Push auf main zur GitHub Container Registry.', h2Advanced: 'Erweiterte Pipeline-Funktionen', advancedP1: 'Produktionspipelines benötigen zusätzliche Funktionen: Multi-Platform-Builds, Sicherheitsscans und Rollback.', h2Deploy: 'Zero-Downtime-Deployment', deployP1: 'Blue-Green-Deployments schalten den Traffic zwischen zwei identischen Umgebungen um.', h2Faq: 'Häufig gestellte Fragen', faq1Q: 'Wie speichere ich Secrets in GitHub Actions?', faq1A: 'Gehen Sie zu Repository-Einstellungen → Secrets and variables → Actions → New repository secret.', faq2Q: 'Unterschied zwischen ghcr.io und Docker Hub?', faq2A: 'GitHub Container Registry ist für öffentliche Repositories kostenlos und in GitHub-Berechtigungen integriert.', faq3Q: 'Wie baue ich für AMD64 und ARM64?', faq3A: 'Verwenden Sie docker/setup-qemu-action und docker/setup-buildx-action.', faq4Q: 'Wie implementiere ich umgebungsspezifische Deployments?', faq4A: 'Verwenden Sie GitHub Environments für Staging und Produktion.', relatedTitle: 'Verwandte Tools' },
  it: { title: 'GitHub Actions + Docker CI/CD', intro: 'Una pipeline CI/CD robusta con GitHub Actions e Docker automatizza l\'intero ciclo di deployment. Questa guida costruisce una <strong>pipeline di livello produzione</strong> con build multi-piattaforma e deployment senza downtime.', h2Overview: 'Panoramica della pipeline', overviewP1: 'La pipeline ha quattro fasi: CI (test), Build (immagine Docker), Push (al registro) e Deploy (al server).', h2DockerSetup: 'Best practice per Dockerfile', dockerP1: 'Un Dockerfile ben strutturato è la base. Le build multi-stage riducono significativamente la dimensione dell\'immagine finale.', h2BasicPipeline: 'Pipeline CI/CD di base', pipelineP1: 'Questo workflow costruisce e fa push a GitHub Container Registry ad ogni push su main.', h2Advanced: 'Funzionalità avanzate della pipeline', advancedP1: 'Le pipeline di produzione richiedono funzionalità aggiuntive: build multi-piattaforma, scansione di sicurezza e rollback.', h2Deploy: 'Deployment senza downtime', deployP1: 'I deployment blue-green commutano il traffico tra due ambienti identici.', h2Faq: 'Domande frequenti', faq1Q: 'Come memorizzare i secret in GitHub Actions?', faq1A: 'Vai nelle impostazioni del repository → Secrets and variables → Actions → New repository secret.', faq2Q: 'Differenza tra ghcr.io e Docker Hub?', faq2A: 'GitHub Container Registry è gratuito per i repository pubblici e integrato con i permessi GitHub.', faq3Q: 'Come costruire per AMD64 e ARM64?', faq3A: 'Usa docker/setup-qemu-action e docker/setup-buildx-action.', faq4Q: 'Come implementare deployment specifici per ambiente?', faq4A: 'Usa gli ambienti GitHub per staging e produzione.', relatedTitle: 'Strumenti correlati' },
  es: { title: 'GitHub Actions + Docker CI/CD', intro: 'Una pipeline CI/CD robusta con GitHub Actions y Docker automatiza todo el ciclo de vida del despliegue. Esta guia construye una <strong>pipeline de nivel produccion</strong> con builds multiplataforma y despliegues sin tiempo de inactividad.', h2Overview: 'Descripcion general de la pipeline', overviewP1: 'La pipeline tiene cuatro etapas: CI (prueba), Build (imagen Docker), Push (al registro) y Deploy (al servidor).', h2DockerSetup: 'Mejores practicas para Dockerfile', dockerP1: 'Un Dockerfile bien estructurado es la base. Las builds multi-etapa reducen significativamente el tamano final de la imagen.', h2BasicPipeline: 'Pipeline CI/CD basica', pipelineP1: 'Este workflow construye y hace push a GitHub Container Registry en cada push a main.', h2Advanced: 'Caracteristicas avanzadas de la pipeline', advancedP1: 'Las pipelines de produccion necesitan caracteristicas adicionales: builds multiplataforma, escaneo de seguridad y rollback.', h2Deploy: 'Despliegue sin tiempo de inactividad', deployP1: 'Los despliegues blue-green cambian el trafico entre dos entornos identicos.', h2Faq: 'Preguntas frecuentes', faq1Q: 'Como almacenar secrets en GitHub Actions?', faq1A: 'Ve a los ajustes del repositorio → Secrets and variables → Actions → New repository secret.', faq2Q: 'Diferencia entre ghcr.io y Docker Hub?', faq2A: 'GitHub Container Registry es gratuito para repositorios publicos e integrado con los permisos de GitHub.', faq3Q: 'Como construir para AMD64 y ARM64?', faq3A: 'Usa docker/setup-qemu-action y docker/setup-buildx-action.', faq4Q: 'Como implementar despliegues especificos por entorno?', faq4A: 'Usa los entornos de GitHub para staging y produccion.', relatedTitle: 'Herramientas relacionadas' },
  pt: { title: 'GitHub Actions + Docker CI/CD', intro: 'Um pipeline CI/CD robusto com GitHub Actions e Docker automatiza todo o ciclo de vida de implantação. Este guia constrói um <strong>pipeline de nível produção</strong> com builds multiplataforma e implantações sem tempo de inatividade.', h2Overview: 'Visão geral do pipeline', overviewP1: 'O pipeline tem quatro estágios: CI (teste), Build (imagem Docker), Push (para o registro) e Deploy (para o servidor).', h2DockerSetup: 'Melhores práticas para Dockerfile', dockerP1: 'Um Dockerfile bem estruturado é a base. Builds multi-estágio reduzem significativamente o tamanho final da imagem.', h2BasicPipeline: 'Pipeline CI/CD básico', pipelineP1: 'Este workflow constrói e faz push para o GitHub Container Registry em cada push para main.', h2Advanced: 'Recursos avançados do pipeline', advancedP1: 'Pipelines de produção precisam de recursos adicionais: builds multiplataforma, varredura de segurança e rollback.', h2Deploy: 'Implantação sem tempo de inatividade', deployP1: 'Implantações blue-green alternam o tráfego entre dois ambientes idênticos.', h2Faq: 'Perguntas frequentes', faq1Q: 'Como armazenar secrets no GitHub Actions?', faq1A: 'Vá para as configurações do repositório → Secrets and variables → Actions → New repository secret.', faq2Q: 'Diferença entre ghcr.io e Docker Hub?', faq2A: 'GitHub Container Registry é gratuito para repositórios públicos e integrado com as permissões do GitHub.', faq3Q: 'Como construir para AMD64 e ARM64?', faq3A: 'Use docker/setup-qemu-action e docker/setup-buildx-action.', faq4Q: 'Como implementar implantações específicas por ambiente?', faq4A: 'Use os ambientes do GitHub para staging e produção.', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'GitHub Actions + Docker CI/CD', intro: 'Een robuuste CI/CD-pipeline met GitHub Actions en Docker automatiseert de volledige deployment-levenscyclus. Deze gids bouwt een <strong>productieklare pipeline</strong> met multi-platform builds en zero-downtime deployments.', h2Overview: 'Pipeline-overzicht', overviewP1: 'De pipeline heeft vier fasen: CI (test), Build (Docker-image), Push (naar registry) en Deploy (naar server).', h2DockerSetup: 'Dockerfile best practices', dockerP1: 'Een goed gestructureerde Dockerfile is de basis. Multi-stage builds verminderen de eindimage-grootte aanzienlijk.', h2BasicPipeline: 'Basis CI/CD-pipeline', pipelineP1: 'Deze workflow bouwt en pusht naar GitHub Container Registry bij elke push naar main.', h2Advanced: 'Geavanceerde pipeline-functies', advancedP1: 'Productiepipelines hebben extra functies nodig: multi-platform builds, beveiligingsscans en rollback.', h2Deploy: 'Zero-downtime deployment', deployP1: 'Blue-green deployments schakelen verkeer tussen twee identieke omgevingen.', h2Faq: 'Veelgestelde vragen', faq1Q: 'Hoe sla ik secrets op in GitHub Actions?', faq1A: 'Ga naar repository-instellingen → Secrets and variables → Actions → New repository secret.', faq2Q: 'Verschil tussen ghcr.io en Docker Hub?', faq2A: 'GitHub Container Registry is gratis voor openbare repositories en geïntegreerd met GitHub-machtigingen.', faq3Q: 'Hoe bouw ik voor AMD64 en ARM64?', faq3A: 'Gebruik docker/setup-qemu-action en docker/setup-buildx-action.', faq4Q: 'Hoe implementeer ik omgevingsspecifieke deployments?', faq4A: 'Gebruik GitHub Environments voor staging en productie.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'GitHub Actions + Docker CI/CD', intro: 'Solidna pipeline CI/CD z GitHub Actions i Dockerem automatyzuje cały cykl wdrożeń. Ten przewodnik buduje <strong>pipeline poziomu produkcyjnego</strong> z budowami wielu platform i wdrożeniami bez przestojów.', h2Overview: 'Przegląd pipeline', overviewP1: 'Pipeline ma cztery etapy: CI (test), Build (obraz Docker), Push (do rejestru) i Deploy (na serwer).', h2DockerSetup: 'Najlepsze praktyki Dockerfile', dockerP1: 'Dobrze ustrukturyzowany Dockerfile jest fundamentem. Wieloetapowe buildy znacznie zmniejszają rozmiar końcowego obrazu.', h2BasicPipeline: 'Podstawowa pipeline CI/CD', pipelineP1: 'Ten workflow buduje i wypycha do GitHub Container Registry przy każdym push na main.', h2Advanced: 'Zaawansowane funkcje pipeline', advancedP1: 'Produkcyjne pipeline potrzebują dodatkowych funkcji: buildy wielu platform, skanowanie bezpieczeństwa i rollback.', h2Deploy: 'Wdrożenie bez przestojów', deployP1: 'Wdrożenia blue-green przełączają ruch między dwoma identycznymi środowiskami.', h2Faq: 'Często zadawane pytania', faq1Q: 'Jak przechowywać sekrety w GitHub Actions?', faq1A: 'Przejdź do ustawień repozytorium → Secrets and variables → Actions → New repository secret.', faq2Q: 'Różnica między ghcr.io a Docker Hub?', faq2A: 'GitHub Container Registry jest darmowy dla publicznych repozytoriów i zintegrowany z uprawnieniami GitHub.', faq3Q: 'Jak budować dla AMD64 i ARM64?', faq3A: 'Użyj docker/setup-qemu-action i docker/setup-buildx-action.', faq4Q: 'Jak implementować wdrożenia specyficzne dla środowiska?', faq4A: 'Użyj GitHub Environments dla staging i produkcji.', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'GitHub Actions + Docker CI/CD', intro: 'En robust CI/CD-pipeline med GitHub Actions och Docker automatiserar hela deploymentlivscykeln. Den här guiden bygger en <strong>produktionsklar pipeline</strong> med multi-platform builds och zero-downtime deployments.', h2Overview: 'Pipeline-översikt', overviewP1: 'Pipeline har fyra steg: CI (test), Build (Docker-image), Push (till registry) och Deploy (till server).', h2DockerSetup: 'Dockerfile best practices', dockerP1: 'En välstrukturerad Dockerfile är grunden. Multi-stage builds minskar avsevärt den slutliga imagestorleken.', h2BasicPipeline: 'Grundläggande CI/CD-pipeline', pipelineP1: 'Det här arbetsflödet bygger och pushar till GitHub Container Registry vid varje push till main.', h2Advanced: 'Avancerade pipeline-funktioner', advancedP1: 'Produktionspipelines behöver extra funktioner: multi-platform builds, säkerhetsscanning och rollback.', h2Deploy: 'Zero-downtime deployment', deployP1: 'Blue-green deployments växlar trafik mellan två identiska miljöer.', h2Faq: 'Vanliga frågor', faq1Q: 'Hur lagrar jag secrets i GitHub Actions?', faq1A: 'Gå till repository-inställningar → Secrets and variables → Actions → New repository secret.', faq2Q: 'Skillnad mellan ghcr.io och Docker Hub?', faq2A: 'GitHub Container Registry är gratis för offentliga repositories och integrerat med GitHub-behörigheter.', faq3Q: 'Hur bygger jag för AMD64 och ARM64?', faq3A: 'Använd docker/setup-qemu-action och docker/setup-buildx-action.', faq4Q: 'Hur implementerar jag miljöspecifika deployments?', faq4A: 'Använd GitHub Environments för staging och produktion.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'GitHub Actions + Docker CI/CD', intro: 'En robust CI/CD-pipeline med GitHub Actions og Docker automatiserer hele deploymentlivssyklusen. Denne guiden bygger en <strong>produksjonsklar pipeline</strong> med multi-plattform builds og zero-downtime deployments.', h2Overview: 'Pipeline-oversikt', overviewP1: 'Pipeline har fire stadier: CI (test), Build (Docker-image), Push (til registry) og Deploy (til server).', h2DockerSetup: 'Dockerfile best practices', dockerP1: 'En velstrukturert Dockerfile er grunnlaget. Multi-stage builds reduserer den endelige bildestørrelsen betydelig.', h2BasicPipeline: 'Grunnleggende CI/CD-pipeline', pipelineP1: 'Dette arbeidsflyten bygger og pusher til GitHub Container Registry ved hvert push til main.', h2Advanced: 'Avanserte pipeline-funksjoner', advancedP1: 'Produksjonspipelines trenger ekstra funksjoner: multi-plattform builds, sikkerhetsscanning og rollback.', h2Deploy: 'Zero-downtime deployment', deployP1: 'Blue-green deployments bytter trafikk mellom to identiske miljøer.', h2Faq: 'Vanlige spørsmål', faq1Q: 'Hvordan lagrer jeg secrets i GitHub Actions?', faq1A: 'Gå til repository-innstillinger → Secrets and variables → Actions → New repository secret.', faq2Q: 'Forskjell mellom ghcr.io og Docker Hub?', faq2A: 'GitHub Container Registry er gratis for offentlige repositories og integrert med GitHub-tillatelser.', faq3Q: 'Hvordan bygger jeg for AMD64 og ARM64?', faq3A: 'Bruk docker/setup-qemu-action og docker/setup-buildx-action.', faq4Q: 'Hvordan implementerer jeg miljøspesifikke deployments?', faq4A: 'Bruk GitHub Environments for staging og produksjon.', relatedTitle: 'Relaterte verktøy' },
  zh: { title: 'GitHub Actions + Docker CI/CD：构建、推送到镜像仓库和部署到服务器', intro: '使用 GitHub Actions 和 Docker 的完整 CI/CD 流水线自动化整个部署生命周期。本指南构建一个包含多平台构建和零停机部署的<strong>生产级流水线</strong>。', h2Overview: '流水线概览', overviewP1: '流水线分四个阶段：CI（测试）、Build（Docker 镜像）、Push（推送到仓库）和 Deploy（部署到服务器）。', h2DockerSetup: 'Dockerfile 最佳实践', dockerP1: '结构良好的 Dockerfile 是基础。多阶段构建通过分离构建依赖和运行时依赖，显著减小最终镜像体积。', h2BasicPipeline: '基础 CI/CD 流水线', pipelineP1: '此工作流在每次推送到 main 时，构建并推送到 GitHub Container Registry（ghcr.io）。', h2Advanced: '高级流水线功能', advancedP1: '生产流水线需要额外功能：多平台构建、安全扫描、环境特定部署和回滚能力。', h2Deploy: '零停机部署', deployP1: '蓝绿部署通过切换流量在两个相同环境之间实现零停机更新。', h2Faq: '常见问题', faq1Q: '如何在 GitHub Actions 中存储密钥？', faq1A: '进入仓库 Settings → Secrets and variables → Actions → New repository secret。常见密钥：DOCKERHUB_USERNAME、SSH_PRIVATE_KEY、SERVER_HOST 等。', faq2Q: 'ghcr.io 和 Docker Hub 的区别是什么？', faq2A: 'GitHub Container Registry (ghcr.io) 对公开仓库免费，并与 GitHub 权限集成。对于 GitHub 托管项目，ghcr.io 是自然选择。', faq3Q: '如何同时构建 AMD64 和 ARM64 镜像？', faq3A: '在工作流中使用 docker/setup-qemu-action 和 docker/setup-buildx-action，然后在 docker/build-push-action 中设置 platforms: linux/amd64,linux/arm64。', faq4Q: '如何实现环境特定部署？', faq4A: '使用 GitHub Environments 管理 staging 和 production 环境，可以为 production 添加需要审批者的保护规则。', relatedTitle: '相关工具' },
  ja: { title: 'GitHub Actions + Docker CI/CD：ビルド、レジストリへのプッシュ、サーバーへのデプロイ', intro: 'GitHub ActionsとDockerによる堅牢なCI/CDパイプラインで、テスト、Dockerイメージのビルド、レジストリへのプッシュ、サーバーへのデプロイを自動化します。このガイドでは<strong>本番グレードのパイプライン</strong>を構築します。', h2Overview: 'パイプラインの概要', overviewP1: 'パイプラインはCI（テスト）、Build（Dockerイメージ）、Push（レジストリへ）、Deploy（サーバーへ）の4つのステージを持ちます。', h2DockerSetup: 'Dockerfileのベストプラクティス', dockerP1: '適切に構造化されたDockerfileが基礎です。マルチステージビルドにより最終イメージサイズを大幅に削減できます。', h2BasicPipeline: '基本的なCI/CDパイプライン', pipelineP1: 'このワークフローはmainへのプッシュごとにGitHub Container Registryにビルドしてプッシュします。', h2Advanced: '高度なパイプライン機能', advancedP1: '本番パイプラインにはマルチプラットフォームビルド、セキュリティスキャン、ロールバック機能が必要です。', h2Deploy: 'ゼロダウンタイムデプロイ', deployP1: 'Blue-greenデプロイは2つの同一環境間でトラフィックを切り替えます。', h2Faq: 'よくある質問', faq1Q: 'GitHub ActionsでSecretsを保存するには？', faq1A: 'リポジトリSettings → Secrets and variables → Actions → New repository secretに移動してください。', faq2Q: 'ghcr.ioとDocker Hubの違いは？', faq2A: 'GitHub Container Registry(ghcr.io)は公開リポジトリは無料でGitHub権限と統合されています。', faq3Q: 'AMD64とARM64両方のビルドは？', faq3A: 'docker/setup-qemu-actionとdocker/setup-buildx-actionを使用し、platforms: linux/amd64,linux/arm64を設定してください。', faq4Q: '環境固有のデプロイはどう実装する？', faq4A: 'GitHub EnvironmentsでstagingとproductionのEnvironmentsを作成し、保護ルールを設定してください。', relatedTitle: '関連ツール' },
  ko: { title: 'GitHub Actions + Docker CI/CD: 빌드, 레지스트리 푸시, 서버 배포', intro: 'GitHub Actions와 Docker를 사용한 강력한 CI/CD 파이프라인은 전체 배포 수명주기를 자동화합니다. 이 가이드는 멀티 플랫폼 빌드와 제로 다운타임 배포를 포함한 <strong>프로덕션 수준의 파이프라인</strong>을 구축합니다.', h2Overview: '파이프라인 개요', overviewP1: '파이프라인은 CI(테스트), Build(Docker 이미지), Push(레지스트리로), Deploy(서버로)의 4단계로 구성됩니다.', h2DockerSetup: 'Dockerfile 모범 사례', dockerP1: '잘 구조화된 Dockerfile이 기반입니다. 멀티 스테이지 빌드는 최종 이미지 크기를 크게 줄입니다.', h2BasicPipeline: '기본 CI/CD 파이프라인', pipelineP1: '이 워크플로우는 main에 푸시할 때마다 GitHub Container Registry에 빌드하고 푸시합니다.', h2Advanced: '고급 파이프라인 기능', advancedP1: '프로덕션 파이프라인은 멀티 플랫폼 빌드, 보안 스캐닝, 롤백 기능이 필요합니다.', h2Deploy: '제로 다운타임 배포', deployP1: '블루-그린 배포는 두 개의 동일한 환경 사이에서 트래픽을 전환합니다.', h2Faq: '자주 묻는 질문', faq1Q: 'GitHub Actions에서 시크릿을 저장하는 방법은?', faq1A: '저장소 Settings → Secrets and variables → Actions → New repository secret으로 이동하세요.', faq2Q: 'ghcr.io와 Docker Hub의 차이점은?', faq2A: 'GitHub Container Registry(ghcr.io)는 공개 저장소에 무료이고 GitHub 권한과 통합되어 있습니다.', faq3Q: 'AMD64와 ARM64 모두 빌드하는 방법은?', faq3A: 'docker/setup-qemu-action과 docker/setup-buildx-action을 사용하고 platforms: linux/amd64,linux/arm64를 설정하세요.', faq4Q: '환경별 배포를 구현하는 방법은?', faq4A: 'staging과 production을 위한 GitHub Environments를 사용하세요.', relatedTitle: '관련 도구' },
  id: { title: 'GitHub Actions + Docker CI/CD', intro: 'Pipeline CI/CD yang kuat dengan GitHub Actions dan Docker mengotomatiskan siklus hidup deployment penuh. Panduan ini membangun <strong>pipeline tingkat produksi</strong> dengan build multi-platform dan deployment tanpa downtime.', h2Overview: 'Ikhtisar Pipeline', overviewP1: 'Pipeline memiliki empat tahap: CI (test), Build (Docker image), Push (ke registry), dan Deploy (ke server).', h2DockerSetup: 'Best Practices Dockerfile', dockerP1: 'Dockerfile yang terstruktur dengan baik adalah fondasi. Build multi-stage mengurangi ukuran image akhir secara dramatis.', h2BasicPipeline: 'Pipeline CI/CD Dasar', pipelineP1: 'Workflow ini membangun dan mendorong ke GitHub Container Registry di setiap push ke main.', h2Advanced: 'Fitur Pipeline Lanjutan', advancedP1: 'Pipeline produksi membutuhkan fitur tambahan: build multi-platform, pemindaian keamanan, dan rollback.', h2Deploy: 'Deployment Tanpa Downtime', deployP1: 'Deployment blue-green mengalihkan lalu lintas antara dua lingkungan yang identik.', h2Faq: 'Pertanyaan yang Sering Diajukan', faq1Q: 'Bagaimana menyimpan secrets di GitHub Actions?', faq1A: 'Buka pengaturan repository → Secrets and variables → Actions → New repository secret.', faq2Q: 'Perbedaan antara ghcr.io dan Docker Hub?', faq2A: 'GitHub Container Registry gratis untuk repository publik dan terintegrasi dengan izin GitHub.', faq3Q: 'Bagaimana membangun untuk AMD64 dan ARM64?', faq3A: 'Gunakan docker/setup-qemu-action dan docker/setup-buildx-action.', faq4Q: 'Bagaimana mengimplementasikan deployment spesifik lingkungan?', faq4A: 'Gunakan GitHub Environments untuk staging dan produksi.', relatedTitle: 'Alat Terkait' },
  th: { title: 'GitHub Actions + Docker CI/CD', intro: 'Pipeline CI/CD ที่แข็งแกร่งด้วย GitHub Actions และ Docker ช่วยทำให้ deployment lifecycle อัตโนมัติ คู่มือนี้สร้าง <strong>pipeline ระดับ production</strong> พร้อม multi-platform builds และ zero-downtime deployments', h2Overview: 'ภาพรวม Pipeline', overviewP1: 'Pipeline มีสี่ขั้นตอน: CI (ทดสอบ), Build (Docker image), Push (ไปยัง registry) และ Deploy (ไปยัง server)', h2DockerSetup: 'แนวทางปฏิบัติที่ดีที่สุดสำหรับ Dockerfile', dockerP1: 'Dockerfile ที่มีโครงสร้างดีเป็นรากฐาน Multi-stage builds ลดขนาด image สุดท้ายได้อย่างมาก', h2BasicPipeline: 'Pipeline CI/CD พื้นฐาน', pipelineP1: 'Workflow นี้ build และ push ไปยัง GitHub Container Registry ในทุกการ push ไปยัง main', h2Advanced: 'คุณสมบัติ Pipeline ขั้นสูง', advancedP1: 'Production pipelines ต้องการคุณสมบัติเพิ่มเติม: multi-platform builds, security scanning และ rollback', h2Deploy: 'Zero-Downtime Deployment', deployP1: 'Blue-green deployments สลับ traffic ระหว่างสองสภาพแวดล้อมที่เหมือนกัน', h2Faq: 'คำถามที่พบบ่อย', faq1Q: 'จะเก็บ secrets ใน GitHub Actions ได้อย่างไร?', faq1A: 'ไปที่ repository Settings → Secrets and variables → Actions → New repository secret', faq2Q: 'ความแตกต่างระหว่าง ghcr.io และ Docker Hub คืออะไร?', faq2A: 'GitHub Container Registry ฟรีสำหรับ public repositories และรวมเข้ากับสิทธิ์ GitHub', faq3Q: 'จะ build สำหรับทั้ง AMD64 และ ARM64 ได้อย่างไร?', faq3A: 'ใช้ docker/setup-qemu-action และ docker/setup-buildx-action', faq4Q: 'จะใช้ environment-specific deployments ได้อย่างไร?', faq4A: 'ใช้ GitHub Environments สำหรับ staging และ production', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

const dockerfileCode = `# Multi-stage Dockerfile (Node.js example)

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && cp -R node_modules /prod_node_modules
RUN npm ci   # install ALL deps for building

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production runner (minimal image)
FROM node:20-alpine AS runner
WORKDIR /app

# Security: run as non-root user
RUN addgroup --system --gid 1001 nodejs \\
 && adduser --system --uid 1001 appuser

# Copy only what's needed for runtime
COPY --from=deps /prod_node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

USER appuser
EXPOSE 3000

# Health check for orchestrators
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \\
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "dist/index.js"]

# Result: ~150MB instead of ~800MB for the same app`;

const workflowCode = `# .github/workflows/deploy.yml

name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  # Stage 1: Test
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run lint
        run: npm run lint

  # Stage 2: Build and Push Docker image
  build-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    permissions:
      contents: read
      packages: write

    outputs:
      image-digest: \${{ steps.build.outputs.digest }}

    steps:
      - uses: actions/checkout@v4

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}  # Auto-provided by GitHub

      - name: Extract Docker metadata (tags, labels)
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=sha,prefix=sha-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        id: build
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # Stage 3: Deploy to server
  deploy:
    needs: build-push
    runs-on: ubuntu-latest
    environment: production  # GitHub Environment with protection rules

    steps:
      - name: Deploy to production server via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.SERVER_HOST }}
          username: \${{ secrets.SERVER_USER }}
          key: \${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            # Pull latest image
            echo \${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u \${{ github.actor }} --password-stdin
            docker pull ghcr.io/\${{ github.repository }}:latest

            # Zero-downtime restart
            docker compose -f /app/docker-compose.prod.yml up -d --no-deps app

            # Verify deployment
            sleep 10
            docker compose -f /app/docker-compose.prod.yml ps`;

const advancedWorkflowCode = `# Advanced Pipeline Features

# 1. Multi-platform builds (AMD64 + ARM64)
- name: Set up QEMU
  uses: docker/setup-qemu-action@v3

- name: Set up Docker Buildx
  uses: docker/setup-buildx-action@v3

- name: Build multi-platform image
  uses: docker/build-push-action@v5
  with:
    platforms: linux/amd64,linux/arm64
    push: true
    tags: \${{ steps.meta.outputs.tags }}

# 2. Security scanning with Trivy
- name: Scan image for vulnerabilities
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest
    format: 'sarif'
    output: 'trivy-results.sarif'
    severity: 'CRITICAL,HIGH'
    exit-code: '1'  # Fail pipeline on critical vulnerabilities

# 3. Semantic versioning with tags
on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  release:
    steps:
      - name: Extract version from tag
        id: version
        run: echo "VERSION=\${GITHUB_REF#refs/tags/}" \u003e\u003e \$GITHUB_OUTPUT

      - uses: docker/build-push-action@v5
        with:
          tags: |
            ghcr.io/myorg/myapp:\${{ steps.version.outputs.VERSION }}
            ghcr.io/myorg/myapp:latest

# 4. Rollback on failure
- name: Deploy with rollback
  run: |
    PREVIOUS_IMAGE=$(docker inspect --format='{{.Config.Image}}' app-container)
    docker pull \$NEW_IMAGE

    if docker run --rm \$NEW_IMAGE node -e "require('./dist/index.js')"; then
      docker stop app-container
      docker run -d --name app-container \$NEW_IMAGE
    else
      echo "New image failed healthcheck, keeping previous"
      exit 1
    fi`;

export default function GithubActionsDocker({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <h2>{s.h2Overview}</h2>
      <p>{s.overviewP1}</p>
      <pre><code className="language-text">{`Pipeline Flow:
  git push → GitHub Actions triggered
       │
       ├─ [Job 1] CI: npm test, lint, type-check
       │         (runs on all PRs and main pushes)
       │
       ├─ [Job 2] Build: docker build --platform linux/amd64,linux/arm64
       │         (runs only on main branch push)
       │         Push to ghcr.io/org/app:sha-abc1234
       │
       └─ [Job 3] Deploy: SSH to server, docker pull + restart
                 (runs after successful build)
                 Zero-downtime with blue-green or rolling restart`}</code></pre>

      <h2>{s.h2DockerSetup}</h2>
      <p>{s.dockerP1}</p>
      <pre><code className="language-dockerfile">{dockerfileCode}</code></pre>

      <h2>{s.h2BasicPipeline}</h2>
      <p>{s.pipelineP1}</p>
      <pre><code className="language-yaml">{workflowCode}</code></pre>

      <h2>{s.h2Advanced}</h2>
      <p>{s.advancedP1}</p>
      <pre><code className="language-yaml">{advancedWorkflowCode}</code></pre>

      <h2>{s.h2Faq}</h2>
      <h3>{s.faq1Q}</h3>
      <p>{s.faq1A}</p>
      <h3>{s.faq2Q}</h3>
      <p>{s.faq2A}</p>
      <h3>{s.faq3Q}</h3>
      <p>{s.faq3A}</p>
      <h3>{s.faq4Q}</h3>
      <p>{s.faq4A}</p>

      <h2>{s.relatedTitle}</h2>
      <ul>
        <li><Link href={`/${lang}/tools/docker-compose-generator`}>Docker Compose Generator</Link></li>
        <li><Link href={`/${lang}/tools/cron-parser`}>Cron Expression Parser</Link></li>
        <li><Link href={`/${lang}/blog/aws-s3-guide`}>AWS S3 for Developers</Link></li>
        <li><Link href={`/${lang}/blog/nodejs-performance-tips`}>Node.js Performance Tips</Link></li>
      </ul>
    </>
  );
}
