const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Docker Networking Guide: Bridge, Host, Overlay Networks Explained',
    intro: 'Docker networking is one of the most critical aspects of containerized application architecture. Understanding how containers communicate with each other, with the host system, and with external networks is essential for building reliable, secure, and scalable applications. This comprehensive guide covers every Docker network type, docker-compose networking patterns, and troubleshooting strategies you need to master container networking.',
    overviewTitle: 'Docker Networking Overview',
    overviewDesc: 'Docker creates isolated network environments for containers. By default, Docker provides several network drivers, each designed for different use cases. When you install Docker, it automatically creates three networks: bridge, host, and none.',
    networkTypesTitle: 'Docker Network Types',
    bridgeTitle: 'Bridge Network (Default)',
    bridgeDesc: 'The bridge network is the default network driver for containers. When you run a container without specifying a network, it connects to the default bridge network. Containers on the same bridge network can communicate with each other via IP addresses. User-defined bridge networks additionally support automatic DNS resolution between containers using container names.',
    hostTitle: 'Host Network',
    hostDesc: 'The host network mode removes network isolation between the container and the Docker host. The container shares the host machine network stack directly. This means the container does not get its own IP address, and port mapping is not needed. Use host networking when you need maximum network performance or when a container needs to handle a large range of ports.',
    overlayTitle: 'Overlay Network',
    overlayDesc: 'Overlay networks connect multiple Docker daemons together and enable swarm services to communicate with each other. They are essential for multi-host networking in Docker Swarm or Kubernetes environments. Overlay networks use VXLAN technology to create a distributed network among multiple Docker daemon hosts.',
    macvlanTitle: 'Macvlan Network',
    macvlanDesc: 'Macvlan networks allow you to assign a MAC address to a container, making it appear as a physical device on your network. The Docker daemon routes traffic to containers by their MAC addresses. This is useful when you need containers to appear as physical hosts on the network, particularly for legacy applications.',
    noneTitle: 'None Network',
    noneDesc: 'The none network disables all networking for a container. The container only has a loopback interface. Use this for containers that do not need network access, improving security by complete network isolation.',
    composeNetTitle: 'Docker Compose Networking',
    composeNetDesc: 'Docker Compose sets up a single network for your application by default. Each container can reach other containers using the service name as a hostname. Understanding Compose networking is essential for building multi-container applications.',
    customNetTitle: 'Custom Networks in Compose',
    isolationTitle: 'Network Isolation Patterns',
    isolationDesc: 'You can use multiple networks to isolate services. For example, a frontend network for your web server and API, and a backend network for your API and database. The web server cannot directly access the database.',
    dnsTitle: 'DNS and Service Discovery',
    dnsDesc: 'Docker provides built-in DNS resolution for user-defined networks. Containers can resolve each other by name, making service discovery seamless. The embedded DNS server runs at 127.0.0.11 inside each container.',
    dnsRulesTitle: 'DNS Resolution Rules',
    connectTitle: 'Connecting Containers Across Networks',
    connectDesc: 'You can connect a running container to multiple networks simultaneously. This allows a container to act as a bridge between isolated network segments.',
    inspectTitle: 'Inspecting Networks',
    inspectDesc: 'Docker provides several commands to inspect and debug network configurations. These commands are essential for troubleshooting connectivity issues.',
    troubleshootTitle: 'Troubleshooting Docker Networking',
    troubleshoot1Title: 'Container Cannot Reach Another Container',
    troubleshoot1Desc: 'If containers cannot communicate, verify they are on the same network. Containers on the default bridge network cannot resolve each other by name. Use a user-defined bridge network for name resolution.',
    troubleshoot2Title: 'Port Conflicts',
    troubleshoot2Desc: 'If a port is already in use on the host, Docker will fail to start the container. Check for conflicting ports and either stop the conflicting service or map to a different host port.',
    troubleshoot3Title: 'DNS Resolution Failures',
    troubleshoot3Desc: 'DNS issues inside containers can be caused by incorrect DNS configuration on the host. You can specify custom DNS servers for containers.',
    troubleshoot4Title: 'Network Performance Issues',
    troubleshoot4Desc: 'If you experience slow network performance, consider using host networking for performance-critical services. Also check MTU settings and ensure they are consistent across your network infrastructure.',
    securityTitle: 'Network Security Best Practices',
    securityDesc: 'Follow these best practices to secure your Docker networking setup:',
    security1: 'Use user-defined bridge networks instead of the default bridge network for better isolation and DNS resolution.',
    security2: 'Use internal networks (internal: true) for services that should not have external access.',
    security3: 'Limit published ports to only what is necessary. Bind to 127.0.0.1 for services that should only be accessible locally.',
    security4: 'Use encrypted overlay networks for sensitive data in multi-host deployments.',
    security5: 'Implement network policies to control traffic flow between containers.',
    security6: 'Regularly audit your network configurations with docker network inspect.',
    advancedTitle: 'Advanced Networking Topics',
    ipamTitle: 'Custom IPAM Configuration',
    ipamDesc: 'You can configure custom IP address management (IPAM) for your Docker networks, including specifying subnet ranges, gateways, and IP ranges.',
    ipv6Title: 'IPv6 Support',
    ipv6Desc: 'Docker supports IPv6 networking. Enable it in the Docker daemon configuration and create networks with IPv6 enabled.',
    loadBalancingTitle: 'Built-in Load Balancing',
    loadBalancingDesc: 'Docker Swarm provides built-in load balancing for services. When you publish a port for a service, Docker creates an ingress overlay network and uses round-robin DNS for load distribution.',
    comparisonTitle: 'Network Driver Comparison',
    driver: 'Driver',
    useCase: 'Use Case',
    isolation: 'Isolation',
    performance: 'Performance',
    multiHost: 'Multi-Host',
    conclusionTitle: 'Conclusion',
    conclusionText: 'Docker networking is a fundamental skill for any developer working with containers. The bridge network handles most single-host scenarios, while overlay networks are essential for multi-host deployments. Use host networking sparingly for performance-critical applications, and leverage macvlan when containers need to appear as physical network devices. Always prioritize network isolation and security, use user-defined networks over the default bridge, and implement proper network segmentation in your docker-compose configurations. Master these networking concepts, and you will be well-equipped to build robust, scalable containerized applications.',
    faqTitle: 'FAQ',
    faq1q: 'What is the difference between bridge and host network in Docker?',
    faq1a: 'Bridge networks create an isolated network namespace with its own IP range and provide port mapping. Host networks remove all isolation and share the host network stack directly, offering better performance but no port isolation.',
    faq2q: 'When should I use overlay networks?',
    faq2a: 'Use overlay networks when you need containers on different Docker hosts to communicate, typically in Docker Swarm or Kubernetes deployments. They use VXLAN encapsulation to create distributed networks across hosts.',
    faq3q: 'Can containers on different networks communicate?',
    faq3a: 'By default, no. Containers on different networks are isolated. You can connect a container to multiple networks using docker network connect, allowing it to communicate with containers on both networks.',
    faq4q: 'How do I troubleshoot Docker DNS resolution?',
    faq4a: 'First ensure containers are on a user-defined network (the default bridge does not support name resolution). Use docker exec to run nslookup or dig inside the container. Check /etc/resolv.conf inside the container and verify the embedded DNS server at 127.0.0.11 is configured.',
  },
  zh: {
    title: 'Docker 网络指南：Bridge、Host、Overlay 网络详解',
    intro: 'Docker 网络是容器化应用架构中最关键的方面之一。理解容器之间、与宿主机以及与外部网络的通信方式，对于构建可靠、安全和可扩展的应用至关重要。本指南涵盖了所有 Docker 网络类型、docker-compose 网络模式和故障排查策略。',
    overviewTitle: 'Docker 网络概述',
    overviewDesc: 'Docker 为容器创建隔离的网络环境。默认情况下，Docker 提供多种网络驱动，每种针对不同的使用场景设计。',
    networkTypesTitle: 'Docker 网络类型',
    bridgeTitle: 'Bridge 网络（默认）',
    bridgeDesc: 'Bridge 网络是容器的默认网络驱动。用户定义的 bridge 网络支持使用容器名称进行自动 DNS 解析。',
    hostTitle: 'Host 网络',
    hostDesc: 'Host 网络模式消除了容器与宿主机之间的网络隔离。容器直接共享宿主机的网络栈。',
    overlayTitle: 'Overlay 网络',
    overlayDesc: 'Overlay 网络连接多个 Docker 守护进程，使 Swarm 服务能够相互通信。',
    macvlanTitle: 'Macvlan 网络',
    macvlanDesc: 'Macvlan 网络允许为容器分配 MAC 地址，使其看起来像网络上的物理设备。',
    noneTitle: 'None 网络',
    noneDesc: 'None 网络禁用容器的所有网络功能，提供完全的网络隔离。',
    composeNetTitle: 'Docker Compose 网络',
    composeNetDesc: 'Docker Compose 默认为应用创建一个网络。每个容器可以使用服务名作为主机名来访问其他容器。',
    customNetTitle: 'Compose 中的自定义网络',
    isolationTitle: '网络隔离模式',
    isolationDesc: '可以使用多个网络来隔离服务。例如，前端网络用于 Web 和 API，后端网络用于 API 和数据库。',
    dnsTitle: 'DNS 和服务发现',
    dnsDesc: 'Docker 为用户定义的网络提供内置 DNS 解析。容器可以通过名称互相解析。',
    dnsRulesTitle: 'DNS 解析规则',
    connectTitle: '跨网络连接容器',
    connectDesc: '可以将运行中的容器同时连接到多个网络。',
    inspectTitle: '网络检查',
    inspectDesc: 'Docker 提供多个命令来检查和调试网络配置。',
    troubleshootTitle: 'Docker 网络故障排查',
    troubleshoot1Title: '容器无法访问另一个容器', troubleshoot1Desc: '验证容器是否在同一网络上。',
    troubleshoot2Title: '端口冲突', troubleshoot2Desc: '检查冲突端口并更换映射。',
    troubleshoot3Title: 'DNS 解析失败', troubleshoot3Desc: '可以为容器指定自定义 DNS 服务器。',
    troubleshoot4Title: '网络性能问题', troubleshoot4Desc: '考虑对性能关键服务使用 host 网络。',
    securityTitle: '网络安全最佳实践', securityDesc: '遵循以下最佳实践来保护 Docker 网络：',
    security1: '使用用户定义的 bridge 网络。', security2: '使用内部网络限制外部访问。',
    security3: '仅发布必要端口。', security4: '使用加密的 overlay 网络。',
    security5: '实施网络策略控制流量。', security6: '定期审计网络配置。',
    advancedTitle: '高级网络主题',
    ipamTitle: '自定义 IPAM 配置', ipamDesc: '可以为 Docker 网络配置自定义 IP 地址管理。',
    ipv6Title: 'IPv6 支持', ipv6Desc: 'Docker 支持 IPv6 网络。',
    loadBalancingTitle: '内置负载均衡', loadBalancingDesc: 'Docker Swarm 为服务提供内置负载均衡。',
    comparisonTitle: '网络驱动对比', driver: '驱动', useCase: '使用场景', isolation: '隔离性', performance: '性能', multiHost: '多主机',
    conclusionTitle: '总结',
    conclusionText: 'Docker 网络是使用容器的开发者的基础技能。Bridge 网络处理大多数单主机场景，Overlay 网络用于多主机部署。掌握这些概念，你就能构建健壮、可扩展的容器化应用。',
    faqTitle: '常见问题',
    faq1q: 'Docker 中 bridge 和 host 网络有什么区别？', faq1a: 'Bridge 网络创建隔离的网络命名空间并提供端口映射。Host 网络直接共享宿主机网络栈，性能更好但没有端口隔离。',
    faq2q: '什么时候应该使用 overlay 网络？', faq2a: '当需要不同 Docker 主机上的容器通信时使用，通常用于 Docker Swarm 或 Kubernetes 部署。',
    faq3q: '不同网络上的容器能通信吗？', faq3a: '默认不能。可以使用 docker network connect 将容器连接到多个网络。',
    faq4q: '如何排查 Docker DNS 解析问题？', faq4a: '确保容器在用户定义的网络上，使用 docker exec 在容器内运行 nslookup 或 dig。',
  },
  ja: {
    title: 'Docker ネットワークガイド：Bridge、Host、Overlay ネットワーク解説',
    intro: 'Docker ネットワークはコンテナ化アプリケーションアーキテクチャの最も重要な側面の一つです。コンテナ間、ホストシステム、外部ネットワークとの通信方法を理解することが不可欠です。',
    overviewTitle: 'Docker ネットワーク概要', overviewDesc: 'Docker はコンテナに分離されたネットワーク環境を作成します。',
    networkTypesTitle: 'Docker ネットワークタイプ',
    bridgeTitle: 'Bridge ネットワーク（デフォルト）', bridgeDesc: 'Bridge ネットワークはコンテナのデフォルトネットワークドライバーです。',
    hostTitle: 'Host ネットワーク', hostDesc: 'Host ネットワークモードはコンテナとホスト間のネットワーク分離を解除します。',
    overlayTitle: 'Overlay ネットワーク', overlayDesc: 'Overlay ネットワークは複数の Docker デーモンを接続します。',
    macvlanTitle: 'Macvlan ネットワーク', macvlanDesc: 'Macvlan はコンテナに MAC アドレスを割り当てます。',
    noneTitle: 'None ネットワーク', noneDesc: 'None ネットワークはすべてのネットワークを無効にします。',
    composeNetTitle: 'Docker Compose ネットワーク', composeNetDesc: 'Docker Compose はデフォルトでアプリに単一ネットワークを設定します。',
    customNetTitle: 'Compose でのカスタムネットワーク',
    isolationTitle: 'ネットワーク分離パターン', isolationDesc: '複数のネットワークでサービスを分離できます。',
    dnsTitle: 'DNS とサービスディスカバリ', dnsDesc: 'Docker はユーザー定義ネットワークに組み込み DNS 解決を提供します。',
    dnsRulesTitle: 'DNS 解決ルール',
    connectTitle: 'ネットワーク間のコンテナ接続', connectDesc: '実行中のコンテナを複数のネットワークに接続できます。',
    inspectTitle: 'ネットワーク検査', inspectDesc: 'Docker はネットワーク設定を検査するコマンドを提供します。',
    troubleshootTitle: 'Docker ネットワークのトラブルシューティング',
    troubleshoot1Title: 'コンテナ間の通信不可', troubleshoot1Desc: '同じネットワーク上にあるか確認してください。',
    troubleshoot2Title: 'ポート競合', troubleshoot2Desc: '競合するポートを確認してください。',
    troubleshoot3Title: 'DNS 解決の失敗', troubleshoot3Desc: 'カスタム DNS サーバーを指定できます。',
    troubleshoot4Title: 'ネットワークパフォーマンスの問題', troubleshoot4Desc: 'パフォーマンス重視のサービスには host ネットワークを検討してください。',
    securityTitle: 'ネットワークセキュリティのベストプラクティス', securityDesc: '以下のベストプラクティスに従ってください：',
    security1: 'ユーザー定義 bridge ネットワークを使用。', security2: '内部ネットワークで外部アクセスを制限。',
    security3: '必要なポートのみ公開。', security4: '暗号化 overlay ネットワークを使用。',
    security5: 'ネットワークポリシーでトラフィックを制御。', security6: '定期的にネットワーク設定を監査。',
    advancedTitle: '高度なネットワークトピック',
    ipamTitle: 'カスタム IPAM 設定', ipamDesc: 'カスタム IP アドレス管理を設定できます。',
    ipv6Title: 'IPv6 サポート', ipv6Desc: 'Docker は IPv6 をサポートしています。',
    loadBalancingTitle: '組み込みロードバランシング', loadBalancingDesc: 'Docker Swarm はサービスに組み込みロードバランシングを提供します。',
    comparisonTitle: 'ネットワークドライバー比較', driver: 'ドライバー', useCase: '使用例', isolation: '分離', performance: 'パフォーマンス', multiHost: 'マルチホスト',
    conclusionTitle: '結論',
    conclusionText: 'Docker ネットワークはコンテナを扱う開発者にとって基本スキルです。これらの概念をマスターすれば、堅牢でスケーラブルなコンテナ化アプリケーションを構築できます。',
    faqTitle: 'FAQ',
    faq1q: 'Docker の bridge と host ネットワークの違いは？', faq1a: 'Bridge は分離されたネットワーク名前空間を作成し、ポートマッピングを提供します。Host はホストネットワークスタックを直接共有します。',
    faq2q: 'overlay ネットワークはいつ使うべき？', faq2a: '異なる Docker ホスト上のコンテナが通信する必要がある場合に使用します。',
    faq3q: '異なるネットワーク上のコンテナは通信できる？', faq3a: 'デフォルトではできません。docker network connect で複数ネットワークに接続できます。',
    faq4q: 'Docker DNS 解決のトラブルシューティング方法は？', faq4a: 'ユーザー定義ネットワーク上にあることを確認し、コンテナ内で nslookup を実行してください。',
  },
  ko: {
    title: 'Docker 네트워킹 가이드: Bridge, Host, Overlay 네트워크 설명',
    intro: 'Docker 네트워킹은 컨테이너화된 애플리케이션 아키텍처의 가장 중요한 측면 중 하나입니다. 컨테이너 간, 호스트 시스템, 외부 네트워크와의 통신 방법을 이해하는 것이 필수적입니다.',
    overviewTitle: 'Docker 네트워킹 개요', overviewDesc: 'Docker는 컨테이너를 위한 격리된 네트워크 환경을 생성합니다.',
    networkTypesTitle: 'Docker 네트워크 유형',
    bridgeTitle: 'Bridge 네트워크 (기본)', bridgeDesc: 'Bridge 네트워크는 컨테이너의 기본 네트워크 드라이버입니다.',
    hostTitle: 'Host 네트워크', hostDesc: 'Host 네트워크 모드는 컨테이너와 호스트 간의 네트워크 격리를 제거합니다.',
    overlayTitle: 'Overlay 네트워크', overlayDesc: 'Overlay 네트워크는 여러 Docker 데몬을 연결합니다.',
    macvlanTitle: 'Macvlan 네트워크', macvlanDesc: 'Macvlan은 컨테이너에 MAC 주소를 할당합니다.',
    noneTitle: 'None 네트워크', noneDesc: 'None 네트워크는 모든 네트워킹을 비활성화합니다.',
    composeNetTitle: 'Docker Compose 네트워킹', composeNetDesc: 'Docker Compose는 기본적으로 앱에 단일 네트워크를 설정합니다.',
    customNetTitle: 'Compose에서 커스텀 네트워크',
    isolationTitle: '네트워크 격리 패턴', isolationDesc: '여러 네트워크를 사용하여 서비스를 격리할 수 있습니다.',
    dnsTitle: 'DNS 및 서비스 디스커버리', dnsDesc: 'Docker는 사용자 정의 네트워크에 내장 DNS 해석을 제공합니다.',
    dnsRulesTitle: 'DNS 해석 규칙',
    connectTitle: '네트워크 간 컨테이너 연결', connectDesc: '실행 중인 컨테이너를 여러 네트워크에 연결할 수 있습니다.',
    inspectTitle: '네트워크 검사', inspectDesc: 'Docker는 네트워크 구성을 검사하는 명령어를 제공합니다.',
    troubleshootTitle: 'Docker 네트워킹 문제 해결',
    troubleshoot1Title: '컨테이너 간 통신 불가', troubleshoot1Desc: '동일 네트워크에 있는지 확인하세요.',
    troubleshoot2Title: '포트 충돌', troubleshoot2Desc: '충돌하는 포트를 확인하세요.',
    troubleshoot3Title: 'DNS 해석 실패', troubleshoot3Desc: '사용자 정의 DNS 서버를 지정할 수 있습니다.',
    troubleshoot4Title: '네트워크 성능 문제', troubleshoot4Desc: '성능이 중요한 서비스에는 host 네트워크를 고려하세요.',
    securityTitle: '네트워크 보안 모범 사례', securityDesc: '다음 모범 사례를 따르세요:',
    security1: '사용자 정의 bridge 네트워크 사용.', security2: '내부 네트워크로 외부 접근 제한.',
    security3: '필요한 포트만 공개.', security4: '암호화된 overlay 네트워크 사용.',
    security5: '네트워크 정책으로 트래픽 제어.', security6: '정기적으로 네트워크 구성 감사.',
    advancedTitle: '고급 네트워킹 주제',
    ipamTitle: '커스텀 IPAM 구성', ipamDesc: '사용자 정의 IP 주소 관리를 구성할 수 있습니다.',
    ipv6Title: 'IPv6 지원', ipv6Desc: 'Docker는 IPv6를 지원합니다.',
    loadBalancingTitle: '내장 로드 밸런싱', loadBalancingDesc: 'Docker Swarm은 서비스에 내장 로드 밸런싱을 제공합니다.',
    comparisonTitle: '네트워크 드라이버 비교', driver: '드라이버', useCase: '사용 사례', isolation: '격리', performance: '성능', multiHost: '멀티 호스트',
    conclusionTitle: '결론',
    conclusionText: 'Docker 네트워킹은 컨테이너를 다루는 개발자에게 기본 기술입니다. 이러한 개념을 마스터하면 견고하고 확장 가능한 컨테이너화된 애플리케이션을 구축할 수 있습니다.',
    faqTitle: 'FAQ',
    faq1q: 'Docker에서 bridge와 host 네트워크의 차이는?', faq1a: 'Bridge는 격리된 네트워크 네임스페이스를 만들고 포트 매핑을 제공합니다. Host는 호스트 네트워크 스택을 직접 공유합니다.',
    faq2q: 'overlay 네트워크는 언제 사용하나요?', faq2a: '다른 Docker 호스트의 컨테이너가 통신해야 할 때 사용합니다.',
    faq3q: '다른 네트워크의 컨테이너가 통신할 수 있나요?', faq3a: '기본적으로 불가합니다. docker network connect로 여러 네트워크에 연결할 수 있습니다.',
    faq4q: 'Docker DNS 해석 문제 해결 방법은?', faq4a: '사용자 정의 네트워크에 있는지 확인하고 컨테이너 내에서 nslookup을 실행하세요.',
  },
  fr: {
    title: 'Guide Docker Networking : Réseaux Bridge, Host et Overlay expliqués',
    intro: 'Le réseau Docker est l\'un des aspects les plus critiques de l\'architecture d\'applications conteneurisées. Comprendre comment les conteneurs communiquent entre eux, avec le système hôte et avec les réseaux externes est essentiel.',
    overviewTitle: 'Aperçu du réseau Docker', overviewDesc: 'Docker crée des environnements réseau isolés pour les conteneurs.',
    networkTypesTitle: 'Types de réseaux Docker',
    bridgeTitle: 'Réseau Bridge (par défaut)', bridgeDesc: 'Le réseau bridge est le pilote réseau par défaut pour les conteneurs.',
    hostTitle: 'Réseau Host', hostDesc: 'Le mode réseau host supprime l\'isolation réseau entre le conteneur et l\'hôte Docker.',
    overlayTitle: 'Réseau Overlay', overlayDesc: 'Les réseaux overlay connectent plusieurs démons Docker ensemble.',
    macvlanTitle: 'Réseau Macvlan', macvlanDesc: 'Les réseaux Macvlan permettent d\'attribuer une adresse MAC à un conteneur.',
    noneTitle: 'Réseau None', noneDesc: 'Le réseau none désactive tout le réseau pour un conteneur.',
    composeNetTitle: 'Réseau Docker Compose', composeNetDesc: 'Docker Compose configure un réseau unique par défaut.',
    customNetTitle: 'Réseaux personnalisés dans Compose',
    isolationTitle: 'Modèles d\'isolation réseau', isolationDesc: 'Utilisez plusieurs réseaux pour isoler les services.',
    dnsTitle: 'DNS et découverte de services', dnsDesc: 'Docker fournit une résolution DNS intégrée pour les réseaux définis par l\'utilisateur.',
    dnsRulesTitle: 'Règles de résolution DNS',
    connectTitle: 'Connexion de conteneurs entre réseaux', connectDesc: 'Vous pouvez connecter un conteneur à plusieurs réseaux.',
    inspectTitle: 'Inspection des réseaux', inspectDesc: 'Docker fournit des commandes pour inspecter les configurations réseau.',
    troubleshootTitle: 'Dépannage du réseau Docker',
    troubleshoot1Title: 'Communication impossible entre conteneurs', troubleshoot1Desc: 'Vérifiez qu\'ils sont sur le même réseau.',
    troubleshoot2Title: 'Conflits de ports', troubleshoot2Desc: 'Vérifiez les ports en conflit.',
    troubleshoot3Title: 'Échecs de résolution DNS', troubleshoot3Desc: 'Spécifiez des serveurs DNS personnalisés.',
    troubleshoot4Title: 'Problèmes de performance réseau', troubleshoot4Desc: 'Envisagez le réseau host pour les services critiques.',
    securityTitle: 'Bonnes pratiques de sécurité réseau', securityDesc: 'Suivez ces bonnes pratiques :',
    security1: 'Utilisez des réseaux bridge définis par l\'utilisateur.', security2: 'Utilisez des réseaux internes.',
    security3: 'Limitez les ports publiés.', security4: 'Utilisez des réseaux overlay chiffrés.',
    security5: 'Implémentez des politiques réseau.', security6: 'Auditez régulièrement les configurations.',
    advancedTitle: 'Sujets avancés',
    ipamTitle: 'Configuration IPAM personnalisée', ipamDesc: 'Configurez la gestion d\'adresses IP personnalisée.',
    ipv6Title: 'Support IPv6', ipv6Desc: 'Docker prend en charge IPv6.',
    loadBalancingTitle: 'Équilibrage de charge intégré', loadBalancingDesc: 'Docker Swarm fournit un équilibrage de charge intégré.',
    comparisonTitle: 'Comparaison des pilotes réseau', driver: 'Pilote', useCase: 'Cas d\'utilisation', isolation: 'Isolation', performance: 'Performance', multiHost: 'Multi-hôte',
    conclusionTitle: 'Conclusion',
    conclusionText: 'Le réseau Docker est une compétence fondamentale pour tout développeur. Maîtrisez ces concepts pour construire des applications conteneurisées robustes et évolutives.',
    faqTitle: 'FAQ',
    faq1q: 'Quelle est la différence entre bridge et host ?', faq1a: 'Bridge crée un espace de noms réseau isolé. Host partage directement la pile réseau de l\'hôte.',
    faq2q: 'Quand utiliser les réseaux overlay ?', faq2a: 'Quand les conteneurs sur différents hôtes doivent communiquer.',
    faq3q: 'Les conteneurs de différents réseaux peuvent-ils communiquer ?', faq3a: 'Par défaut, non. Utilisez docker network connect.',
    faq4q: 'Comment déboguer la résolution DNS Docker ?', faq4a: 'Vérifiez que les conteneurs sont sur un réseau défini par l\'utilisateur et utilisez nslookup.',
  },
  de: {
    title: 'Docker Networking Guide: Bridge, Host, Overlay Netzwerke erklärt',
    intro: 'Docker-Netzwerke sind einer der kritischsten Aspekte der containerisierten Anwendungsarchitektur. Das Verständnis der Container-Kommunikation ist für zuverlässige, sichere und skalierbare Anwendungen unerlässlich.',
    overviewTitle: 'Docker Netzwerk-Übersicht', overviewDesc: 'Docker erstellt isolierte Netzwerkumgebungen für Container.',
    networkTypesTitle: 'Docker Netzwerktypen',
    bridgeTitle: 'Bridge-Netzwerk (Standard)', bridgeDesc: 'Das Bridge-Netzwerk ist der Standard-Netzwerktreiber für Container.',
    hostTitle: 'Host-Netzwerk', hostDesc: 'Der Host-Netzwerkmodus entfernt die Netzwerkisolation zwischen Container und Host.',
    overlayTitle: 'Overlay-Netzwerk', overlayDesc: 'Overlay-Netzwerke verbinden mehrere Docker-Daemons.',
    macvlanTitle: 'Macvlan-Netzwerk', macvlanDesc: 'Macvlan ermöglicht die Zuweisung einer MAC-Adresse an Container.',
    noneTitle: 'None-Netzwerk', noneDesc: 'None deaktiviert alle Netzwerkfunktionen.',
    composeNetTitle: 'Docker Compose Netzwerke', composeNetDesc: 'Docker Compose richtet standardmäßig ein Netzwerk ein.',
    customNetTitle: 'Benutzerdefinierte Netzwerke in Compose',
    isolationTitle: 'Netzwerkisolationsmuster', isolationDesc: 'Verwenden Sie mehrere Netzwerke zur Service-Isolation.',
    dnsTitle: 'DNS und Service Discovery', dnsDesc: 'Docker bietet eingebaute DNS-Auflösung.',
    dnsRulesTitle: 'DNS-Auflösungsregeln',
    connectTitle: 'Container netzwerkübergreifend verbinden', connectDesc: 'Container können mit mehreren Netzwerken verbunden werden.',
    inspectTitle: 'Netzwerke inspizieren', inspectDesc: 'Docker bietet Befehle zur Netzwerkinspektion.',
    troubleshootTitle: 'Docker Netzwerk-Fehlerbehebung',
    troubleshoot1Title: 'Container können nicht kommunizieren', troubleshoot1Desc: 'Überprüfen Sie das gemeinsame Netzwerk.',
    troubleshoot2Title: 'Port-Konflikte', troubleshoot2Desc: 'Prüfen Sie auf Portkonflikte.',
    troubleshoot3Title: 'DNS-Auflösungsfehler', troubleshoot3Desc: 'Benutzerdefinierte DNS-Server angeben.',
    troubleshoot4Title: 'Netzwerk-Performance', troubleshoot4Desc: 'Host-Netzwerk für performance-kritische Dienste erwägen.',
    securityTitle: 'Netzwerk-Sicherheit Best Practices', securityDesc: 'Folgen Sie diesen Best Practices:',
    security1: 'Benutzerdefinierte Bridge-Netzwerke verwenden.', security2: 'Interne Netzwerke nutzen.',
    security3: 'Nur nötige Ports veröffentlichen.', security4: 'Verschlüsselte Overlay-Netzwerke.',
    security5: 'Netzwerkrichtlinien implementieren.', security6: 'Regelmäßig Konfigurationen prüfen.',
    advancedTitle: 'Erweiterte Themen',
    ipamTitle: 'Benutzerdefinierte IPAM-Konfiguration', ipamDesc: 'IP-Adressverwaltung konfigurieren.',
    ipv6Title: 'IPv6-Unterstützung', ipv6Desc: 'Docker unterstützt IPv6.',
    loadBalancingTitle: 'Integriertes Load Balancing', loadBalancingDesc: 'Docker Swarm bietet integriertes Load Balancing.',
    comparisonTitle: 'Netzwerktreiber-Vergleich', driver: 'Treiber', useCase: 'Anwendungsfall', isolation: 'Isolation', performance: 'Performance', multiHost: 'Multi-Host',
    conclusionTitle: 'Fazit',
    conclusionText: 'Docker-Netzwerke sind eine grundlegende Fähigkeit. Meistern Sie diese Konzepte für robuste containerisierte Anwendungen.',
    faqTitle: 'FAQ',
    faq1q: 'Was ist der Unterschied zwischen Bridge und Host?', faq1a: 'Bridge erstellt einen isolierten Netzwerk-Namespace. Host teilt den Host-Netzwerkstack direkt.',
    faq2q: 'Wann Overlay-Netzwerke verwenden?', faq2a: 'Wenn Container auf verschiedenen Hosts kommunizieren müssen.',
    faq3q: 'Können Container verschiedener Netzwerke kommunizieren?', faq3a: 'Standardmäßig nicht. Verwenden Sie docker network connect.',
    faq4q: 'Wie Docker-DNS-Probleme debuggen?', faq4a: 'Stellen Sie sicher, dass Container auf benutzerdefinierten Netzwerken sind.',
  },
  es: {
    title: 'Guía de Docker Networking: Redes Bridge, Host y Overlay explicadas',
    intro: 'La red Docker es uno de los aspectos más críticos de la arquitectura de aplicaciones contenedorizadas. Comprender cómo se comunican los contenedores entre sí, con el sistema host y con redes externas es esencial.',
    overviewTitle: 'Visión general de Docker Networking', overviewDesc: 'Docker crea entornos de red aislados para los contenedores.',
    networkTypesTitle: 'Tipos de redes Docker',
    bridgeTitle: 'Red Bridge (predeterminada)', bridgeDesc: 'La red bridge es el controlador de red predeterminado para contenedores.',
    hostTitle: 'Red Host', hostDesc: 'El modo de red host elimina el aislamiento de red entre el contenedor y el host.',
    overlayTitle: 'Red Overlay', overlayDesc: 'Las redes overlay conectan múltiples demonios Docker.',
    macvlanTitle: 'Red Macvlan', macvlanDesc: 'Macvlan permite asignar una dirección MAC a un contenedor.',
    noneTitle: 'Red None', noneDesc: 'None desactiva toda la red para un contenedor.',
    composeNetTitle: 'Redes en Docker Compose', composeNetDesc: 'Docker Compose configura una red única por defecto.',
    customNetTitle: 'Redes personalizadas en Compose',
    isolationTitle: 'Patrones de aislamiento de red', isolationDesc: 'Use múltiples redes para aislar servicios.',
    dnsTitle: 'DNS y descubrimiento de servicios', dnsDesc: 'Docker proporciona resolución DNS integrada.',
    dnsRulesTitle: 'Reglas de resolución DNS',
    connectTitle: 'Conectar contenedores entre redes', connectDesc: 'Puede conectar contenedores a múltiples redes.',
    inspectTitle: 'Inspección de redes', inspectDesc: 'Docker proporciona comandos para inspeccionar redes.',
    troubleshootTitle: 'Solución de problemas de red Docker',
    troubleshoot1Title: 'Contenedores no pueden comunicarse', troubleshoot1Desc: 'Verifique que están en la misma red.',
    troubleshoot2Title: 'Conflictos de puertos', troubleshoot2Desc: 'Verifique puertos en conflicto.',
    troubleshoot3Title: 'Fallos de resolución DNS', troubleshoot3Desc: 'Especifique servidores DNS personalizados.',
    troubleshoot4Title: 'Problemas de rendimiento de red', troubleshoot4Desc: 'Considere red host para servicios críticos.',
    securityTitle: 'Mejores prácticas de seguridad de red', securityDesc: 'Siga estas mejores prácticas:',
    security1: 'Use redes bridge definidas por el usuario.', security2: 'Use redes internas.',
    security3: 'Publique solo puertos necesarios.', security4: 'Use redes overlay cifradas.',
    security5: 'Implemente políticas de red.', security6: 'Audite configuraciones regularmente.',
    advancedTitle: 'Temas avanzados',
    ipamTitle: 'Configuración IPAM personalizada', ipamDesc: 'Configure la gestión de direcciones IP personalizada.',
    ipv6Title: 'Soporte IPv6', ipv6Desc: 'Docker soporta IPv6.',
    loadBalancingTitle: 'Balanceo de carga integrado', loadBalancingDesc: 'Docker Swarm proporciona balanceo de carga integrado.',
    comparisonTitle: 'Comparación de controladores de red', driver: 'Controlador', useCase: 'Caso de uso', isolation: 'Aislamiento', performance: 'Rendimiento', multiHost: 'Multi-host',
    conclusionTitle: 'Conclusión',
    conclusionText: 'La red Docker es una habilidad fundamental para desarrolladores. Domine estos conceptos para construir aplicaciones contenedorizadas robustas y escalables.',
    faqTitle: 'FAQ',
    faq1q: '¿Cuál es la diferencia entre bridge y host?', faq1a: 'Bridge crea un namespace de red aislado. Host comparte directamente la pila de red del host.',
    faq2q: '¿Cuándo usar redes overlay?', faq2a: 'Cuando contenedores en diferentes hosts necesitan comunicarse.',
    faq3q: '¿Pueden comunicarse contenedores de diferentes redes?', faq3a: 'Por defecto no. Use docker network connect.',
    faq4q: '¿Cómo depurar la resolución DNS de Docker?', faq4a: 'Asegúrese de que los contenedores estén en una red definida por el usuario.',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 17, fontWeight: 700, marginTop: 24, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 12 };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };

export default function DockerNetworkingGuide({ lang }: { lang: string }) {
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
    <article style={{ maxWidth: 800, margin: '0 auto', lineHeight: 1.8 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={pStyle}>{t.intro}</p>

      {/* Overview */}
      <h2 style={h2Style}>{t.overviewTitle}</h2>
      <p style={pStyle}>{t.overviewDesc}</p>
      <pre style={codeStyle}><code>{`# List all Docker networks
$ docker network ls

NETWORK ID     NAME      DRIVER    SCOPE
a1b2c3d4e5f6   bridge    bridge    local
f6e5d4c3b2a1   host      host      local
1a2b3c4d5e6f   none      null      local`}</code></pre>

      {/* Network Types */}
      <h2 style={h2Style}>{t.networkTypesTitle}</h2>

      {/* Bridge */}
      <h3 style={h3Style}>{t.bridgeTitle}</h3>
      <p style={pStyle}>{t.bridgeDesc}</p>
      <pre style={codeStyle}><code>{`# Create a user-defined bridge network
$ docker network create my-app-network

# Run containers on the custom network
$ docker run -d --name web --network my-app-network nginx:alpine
$ docker run -d --name api --network my-app-network node:20-alpine

# Containers can now reach each other by name
$ docker exec web ping api
PING api (172.18.0.3): 56 data bytes
64 bytes from 172.18.0.3: seq=0 ttl=64 time=0.089 ms

# User-defined bridge vs default bridge
# Default bridge: containers communicate only via IP addresses
# User-defined bridge: automatic DNS resolution by container name

# Create bridge with custom subnet
$ docker network create \\
  --driver bridge \\
  --subnet 172.20.0.0/16 \\
  --gateway 172.20.0.1 \\
  custom-bridge`}</code></pre>

      {/* Host */}
      <h3 style={h3Style}>{t.hostTitle}</h3>
      <p style={pStyle}>{t.hostDesc}</p>
      <pre style={codeStyle}><code>{`# Run container with host networking
$ docker run -d --network host nginx:alpine

# No port mapping needed — container uses host ports directly
# The nginx server is accessible at localhost:80

# Check: container shares host's network interfaces
$ docker exec <container-id> ip addr
# Shows the same interfaces as the host machine

# Warning: Only one container can bind to a given host port
# Host networking is only supported on Linux (not macOS/Windows)`}</code></pre>

      {/* Overlay */}
      <h3 style={h3Style}>{t.overlayTitle}</h3>
      <p style={pStyle}>{t.overlayDesc}</p>
      <pre style={codeStyle}><code>{`# Initialize Docker Swarm (required for overlay networks)
$ docker swarm init

# Create an overlay network
$ docker network create \\
  --driver overlay \\
  --attachable \\
  my-overlay-network

# Create a service on the overlay network
$ docker service create \\
  --name web \\
  --network my-overlay-network \\
  --replicas 3 \\
  nginx:alpine

# Create encrypted overlay network for sensitive data
$ docker network create \\
  --driver overlay \\
  --opt encrypted \\
  secure-overlay`}</code></pre>

      {/* Macvlan */}
      <h3 style={h3Style}>{t.macvlanTitle}</h3>
      <p style={pStyle}>{t.macvlanDesc}</p>
      <pre style={codeStyle}><code>{`# Create a Macvlan network
$ docker network create \\
  --driver macvlan \\
  --subnet 192.168.1.0/24 \\
  --gateway 192.168.1.1 \\
  -o parent=eth0 \\
  my-macvlan

# Run container with its own IP on the LAN
$ docker run -d \\
  --network my-macvlan \\
  --ip 192.168.1.100 \\
  --name legacy-app \\
  my-app:latest

# The container appears as 192.168.1.100 on the physical network`}</code></pre>

      {/* None */}
      <h3 style={h3Style}>{t.noneTitle}</h3>
      <p style={pStyle}>{t.noneDesc}</p>
      <pre style={codeStyle}><code>{`# Run container with no networking
$ docker run -d --network none alpine sleep 3600

# Only loopback interface is available
$ docker exec <container-id> ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536
    inet 127.0.0.1/8 scope host lo`}</code></pre>

      {/* Compose Networking */}
      <h2 style={h2Style}>{t.composeNetTitle}</h2>
      <p style={pStyle}>{t.composeNetDesc}</p>
      <pre style={codeStyle}><code>{`# docker-compose.yml — Default networking
# All services share a network named <project>_default
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
  api:
    image: node:20-alpine
    # Can reach web service at http://web:80
    # Can reach db service at postgres://db:5432
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret`}</code></pre>

      <h3 style={h3Style}>{t.customNetTitle}</h3>
      <pre style={codeStyle}><code>{`# docker-compose.yml — Custom networks for isolation
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    networks:
      - frontend

  api:
    build: ./api
    networks:
      - frontend
      - backend
    depends_on:
      - db
      - redis

  db:
    image: postgres:16
    volumes:
      - pg-data:/var/lib/postgresql/data
    networks:
      - backend

  redis:
    image: redis:7-alpine
    networks:
      - backend

  admin:
    image: adminer
    ports:
      - "8080:8080"
    networks:
      - backend

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true  # No external access

volumes:
  pg-data:`}</code></pre>

      {/* Network Isolation */}
      <h2 style={h2Style}>{t.isolationTitle}</h2>
      <p style={pStyle}>{t.isolationDesc}</p>
      <pre style={codeStyle}><code>{`# Three-tier architecture with network isolation
#
#  Internet
#     |
#  [nginx]     <-- frontend network
#     |
#   [api]      <-- frontend + backend network
#     |
#   [db]       <-- backend network (internal)
#
# nginx can reach api, but NOT db
# api can reach both nginx and db
# db is completely isolated from external access`}</code></pre>

      {/* DNS */}
      <h2 style={h2Style}>{t.dnsTitle}</h2>
      <p style={pStyle}>{t.dnsDesc}</p>
      <h3 style={h3Style}>{t.dnsRulesTitle}</h3>
      <pre style={codeStyle}><code>{`# DNS resolution in user-defined networks
# 1. Container name → IP address
$ docker exec web nslookup api
Server:    127.0.0.11
Address:   127.0.0.11#53
Name:      api
Address:   172.18.0.3

# 2. Service name in Compose → all container IPs (round-robin)
$ docker exec web nslookup api
# Returns IPs of all 'api' service replicas

# 3. Network aliases
$ docker run -d \\
  --network my-network \\
  --network-alias database \\
  --network-alias db \\
  --name postgres-primary \\
  postgres:16

# Container is reachable as: postgres-primary, database, or db

# 4. Check DNS configuration inside a container
$ docker exec web cat /etc/resolv.conf
nameserver 127.0.0.11
options ndots:0`}</code></pre>

      {/* Connecting across networks */}
      <h2 style={h2Style}>{t.connectTitle}</h2>
      <p style={pStyle}>{t.connectDesc}</p>
      <pre style={codeStyle}><code>{`# Connect a running container to an additional network
$ docker network connect backend api-container

# Connect with a specific IP address
$ docker network connect --ip 172.20.0.10 backend api-container

# Disconnect from a network
$ docker network disconnect frontend api-container

# A container connected to multiple networks can route between them
# This is useful for "gateway" containers`}</code></pre>

      {/* Inspecting */}
      <h2 style={h2Style}>{t.inspectTitle}</h2>
      <p style={pStyle}>{t.inspectDesc}</p>
      <pre style={codeStyle}><code>{`# List all networks
$ docker network ls

# Inspect a network (shows connected containers, config)
$ docker network inspect my-app-network

# Find which networks a container is connected to
$ docker inspect --format='{{json .NetworkSettings.Networks}}' my-container

# Check container IP address
$ docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my-container

# Check port mappings
$ docker port my-container

# Test connectivity between containers
$ docker exec web ping -c 3 api
$ docker exec web wget -qO- http://api:3000/health

# Debug with a temporary network tools container
$ docker run --rm -it --network my-app-network \\
  nicolaka/netshoot bash`}</code></pre>

      {/* Troubleshooting */}
      <h2 style={h2Style}>{t.troubleshootTitle}</h2>

      <h3 style={h3Style}>{t.troubleshoot1Title}</h3>
      <p style={pStyle}>{t.troubleshoot1Desc}</p>
      <pre style={codeStyle}><code>{`# Check if containers are on the same network
$ docker network inspect bridge --format='{{range .Containers}}{{.Name}} {{end}}'

# Solution: Use a user-defined network
$ docker network create app-net
$ docker run -d --name web --network app-net nginx
$ docker run -d --name api --network app-net node:20-alpine

# Now name resolution works
$ docker exec web ping api  # Works!`}</code></pre>

      <h3 style={h3Style}>{t.troubleshoot2Title}</h3>
      <p style={pStyle}>{t.troubleshoot2Desc}</p>
      <pre style={codeStyle}><code>{`# Error: port is already allocated
# Find what is using the port
$ lsof -i :8080
$ ss -tlnp | grep 8080

# Solution 1: Map to a different host port
$ docker run -d -p 8081:80 nginx

# Solution 2: Stop the conflicting service
$ sudo systemctl stop apache2`}</code></pre>

      <h3 style={h3Style}>{t.troubleshoot3Title}</h3>
      <p style={pStyle}>{t.troubleshoot3Desc}</p>
      <pre style={codeStyle}><code>{`# Specify custom DNS servers
$ docker run -d --dns 8.8.8.8 --dns 8.8.4.4 my-app

# Or in docker-compose.yml
services:
  web:
    image: nginx
    dns:
      - 8.8.8.8
      - 8.8.4.4`}</code></pre>

      <h3 style={h3Style}>{t.troubleshoot4Title}</h3>
      <p style={pStyle}>{t.troubleshoot4Desc}</p>
      <pre style={codeStyle}><code>{`# Check MTU settings
$ docker network inspect bridge | grep -i mtu

# Set custom MTU for a network
$ docker network create --opt com.docker.network.driver.mtu=1400 my-network

# Use host networking for maximum performance
$ docker run --network host my-performance-app`}</code></pre>

      {/* Security */}
      <h2 style={h2Style}>{t.securityTitle}</h2>
      <p style={pStyle}>{t.securityDesc}</p>
      <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 24 }}>
        <li>{t.security1}</li>
        <li>{t.security2}</li>
        <li>{t.security3}</li>
        <li>{t.security4}</li>
        <li>{t.security5}</li>
        <li>{t.security6}</li>
      </ul>
      <pre style={codeStyle}><code>{`# Bind to localhost only (not accessible from outside)
$ docker run -d -p 127.0.0.1:5432:5432 postgres:16

# Create internal network (no outbound internet)
$ docker network create --internal isolated-net

# In docker-compose.yml
networks:
  database:
    internal: true  # Containers cannot reach the internet`}</code></pre>

      {/* Advanced Topics */}
      <h2 style={h2Style}>{t.advancedTitle}</h2>

      <h3 style={h3Style}>{t.ipamTitle}</h3>
      <p style={pStyle}>{t.ipamDesc}</p>
      <pre style={codeStyle}><code>{`# Custom IPAM configuration
$ docker network create \\
  --driver bridge \\
  --subnet 10.10.0.0/16 \\
  --ip-range 10.10.1.0/24 \\
  --gateway 10.10.0.1 \\
  --aux-address "dns=10.10.0.2" \\
  custom-ipam-net

# In docker-compose.yml
networks:
  app-net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.28.0.0/16
          ip_range: 172.28.5.0/24
          gateway: 172.28.0.1`}</code></pre>

      <h3 style={h3Style}>{t.ipv6Title}</h3>
      <p style={pStyle}>{t.ipv6Desc}</p>
      <pre style={codeStyle}><code>{`# Enable IPv6 in Docker daemon (/etc/docker/daemon.json)
{
  "ipv6": true,
  "fixed-cidr-v6": "2001:db8:1::/64"
}

# Create a dual-stack network
$ docker network create \\
  --ipv6 \\
  --subnet 172.20.0.0/16 \\
  --subnet 2001:db8:2::/64 \\
  dual-stack-net`}</code></pre>

      <h3 style={h3Style}>{t.loadBalancingTitle}</h3>
      <p style={pStyle}>{t.loadBalancingDesc}</p>
      <pre style={codeStyle}><code>{`# Docker Swarm built-in load balancing
$ docker service create \\
  --name web \\
  --replicas 5 \\
  --publish published=80,target=80 \\
  --network my-overlay \\
  nginx:alpine

# Requests to port 80 on ANY swarm node
# are load-balanced across all 5 replicas
# using ingress routing mesh

# Scale the service
$ docker service scale web=10`}</code></pre>

      {/* Comparison Table */}
      <h2 style={h2Style}>{t.comparisonTitle}</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.driver}</th>
            <th style={thStyle}>{t.useCase}</th>
            <th style={thStyle}>{t.isolation}</th>
            <th style={thStyle}>{t.performance}</th>
            <th style={thStyle}>{t.multiHost}</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Bridge', 'Single-host containers', 'High', 'Good', 'No'],
            ['Host', 'Performance-critical apps', 'None', 'Best', 'No'],
            ['Overlay', 'Multi-host / Swarm', 'High', 'Good', 'Yes'],
            ['Macvlan', 'Legacy / physical network', 'High', 'Good', 'No'],
            ['None', 'Maximum isolation', 'Complete', 'N/A', 'No'],
          ].map(([driver, useCase, iso, perf, multi], i) => (
            <tr key={i}>
              <td style={{ ...tdStyle, fontWeight: 600 }}>{driver}</td>
              <td style={tdStyle}>{useCase}</td>
              <td style={tdStyle}>{iso}</td>
              <td style={tdStyle}>{perf}</td>
              <td style={tdStyle}>{multi}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Conclusion */}
      <h2 style={h2Style}>{t.conclusionTitle}</h2>
      <p style={pStyle}>{t.conclusionText}</p>

      {/* FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        { q: t.faq1q, a: t.faq1a },
        { q: t.faq2q, a: t.faq2a },
        { q: t.faq3q, a: t.faq3a },
        { q: t.faq4q, a: t.faq4a },
      ].map((faq, i) => (
        <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>{faq.q}</summary>
          <p style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
        </details>
      ))}
    </article>
  );
}
