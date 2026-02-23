'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'Python Virtual Environments: venv, conda, pipenv, and Poetry',
    intro: 'Virtual environments are the cornerstone of Python dependency management. Without them, packages from different projects conflict, system Python gets polluted, and reproducibility becomes impossible. This guide covers the four major tools — <strong>venv</strong>, <strong>conda</strong>, <strong>pipenv</strong>, and <strong>Poetry</strong> — with practical examples and recommendations for 2026.',
    h2Why: 'Why Virtual Environments Matter',
    whyP1: 'Every Python project has its own dependencies with specific version requirements. Project A might need Django 4.x while Project B needs Django 3.x. Without isolation, you can only have one version installed globally. Virtual environments solve this by creating isolated Python installations per project.',
    h2Venv: 'venv: Built-in Standard Library',
    venvP1: 'venv is included with Python 3.3+ and is the simplest option. It creates a lightweight virtual environment with its own site-packages directory. No additional installation required.',
    h2Conda: 'conda: Data Science Powerhouse',
    condaP1: 'conda is not just a virtual environment tool — it is a full package manager that can install non-Python dependencies (C libraries, CUDA, system packages). It is the standard in data science and machine learning.',
    h2Pipenv: 'pipenv: Pipfile-based Workflow',
    pipenvP1: 'pipenv combines pip and virtualenv into a single tool with a Pipfile (human-readable) and Pipfile.lock (exact versions). It simplifies the workflow but has been somewhat superseded by Poetry.',
    h2Poetry: 'Poetry: Modern Dependency Management',
    poetryP1: 'Poetry is the most modern and full-featured Python dependency manager. It handles virtual environments, dependency resolution, building, and publishing packages — all in one tool.',
    h2Comparison: 'Tool Comparison',
    comparisonP1: 'Choosing the right tool depends on your use case.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Which virtual environment tool should I use in 2026?',
    faq1A: 'For general Python development and web apps, use Poetry. It provides the best developer experience with lockfiles, dependency groups, and publishing. For data science and ML, use conda (or mamba for faster resolution). For simple scripts or when you want zero extra tools, use venv.',
    faq2Q: 'What is the difference between pip and conda?',
    faq2A: 'pip installs Python packages from PyPI only. conda installs packages from the Anaconda repository and can install non-Python packages (C libraries, CUDA, Fortran libraries). pip works with any Python installation; conda manages its own Python as well.',
    faq3Q: 'Can I use pip inside a conda environment?',
    faq3A: 'Yes, but with caution. Mixing pip and conda can sometimes cause conflicts. Best practice is to install as much as possible with conda first, then use pip only for packages not available in conda channels.',
    faq4Q: 'How do I share my environment with other developers?',
    faq4A: 'With Poetry: commit pyproject.toml and poetry.lock. Other developers run "poetry install". With pip: run "pip freeze > requirements.txt" and others run "pip install -r requirements.txt". With conda: export with "conda env export > environment.yml".',
    relatedTitle: 'Related Tools',
  },
  fr: {
    title: 'Environnements virtuels Python : venv, conda, pipenv et Poetry',
    intro: 'Les environnements virtuels sont la pierre angulaire de la gestion des dépendances Python. Ce guide couvre les quatre outils majeurs : <strong>venv</strong>, <strong>conda</strong>, <strong>pipenv</strong> et <strong>Poetry</strong>.',
    h2Why: 'Pourquoi les environnements virtuels sont importants',
    whyP1: 'Chaque projet Python a ses propres dépendances avec des exigences de version spécifiques. Les environnements virtuels résolvent cela en créant des installations Python isolées par projet.',
    h2Venv: 'venv : Bibliothèque standard intégrée',
    venvP1: 'venv est inclus avec Python 3.3+ et est l\'option la plus simple. Il crée un environnement virtuel léger sans installation supplémentaire.',
    h2Conda: 'conda : Puissance pour la data science',
    condaP1: 'conda est un gestionnaire de paquets complet qui peut installer des dépendances non-Python. C\'est le standard en data science et machine learning.',
    h2Pipenv: 'pipenv : Workflow basé sur Pipfile',
    pipenvP1: 'pipenv combine pip et virtualenv en un seul outil avec Pipfile et Pipfile.lock.',
    h2Poetry: 'Poetry : Gestion moderne des dépendances',
    poetryP1: 'Poetry est le gestionnaire de dépendances Python le plus moderne. Il gère les environnements virtuels, la résolution des dépendances, la construction et la publication.',
    h2Comparison: 'Comparaison des outils',
    comparisonP1: 'Le choix du bon outil dépend de votre cas d\'utilisation.',
    h2Faq: 'Questions fréquentes',
    faq1Q: 'Quel outil d\'environnement virtuel utiliser en 2026 ?',
    faq1A: 'Pour le développement Python général et les apps web, utilisez Poetry. Pour la data science et ML, utilisez conda.',
    faq2Q: 'Quelle est la différence entre pip et conda ?',
    faq2A: 'pip installe des paquets Python depuis PyPI uniquement. conda peut aussi installer des paquets non-Python.',
    faq3Q: 'Puis-je utiliser pip dans un environnement conda ?',
    faq3A: 'Oui, mais avec précaution. Mélanger pip et conda peut parfois causer des conflits.',
    faq4Q: 'Comment partager mon environnement avec d\'autres développeurs ?',
    faq4A: 'Avec Poetry : committez pyproject.toml et poetry.lock. Avec pip : utilisez requirements.txt. Avec conda : environment.yml.',
    relatedTitle: 'Outils associés',
  },
  de: {
    title: 'Python virtuelle Umgebungen: venv, conda, pipenv und Poetry',
    intro: 'Virtuelle Umgebungen sind der Grundstein der Python-Abhängigkeitsverwaltung. Dieser Leitfaden behandelt die vier wichtigsten Tools: <strong>venv</strong>, <strong>conda</strong>, <strong>pipenv</strong> und <strong>Poetry</strong>.',
    h2Why: 'Warum virtuelle Umgebungen wichtig sind',
    whyP1: 'Jedes Python-Projekt hat eigene Abhängigkeiten mit spezifischen Versionsanforderungen. Virtuelle Umgebungen lösen dies durch isolierte Python-Installationen pro Projekt.',
    h2Venv: 'venv: Eingebaute Standardbibliothek',
    venvP1: 'venv ist in Python 3.3+ enthalten und die einfachste Option. Keine zusätzliche Installation erforderlich.',
    h2Conda: 'conda: Data-Science-Powerhouse',
    condaP1: 'conda ist ein vollständiger Paketmanager, der auch Nicht-Python-Abhängigkeiten installieren kann.',
    h2Pipenv: 'pipenv: Pipfile-basierter Workflow',
    pipenvP1: 'pipenv kombiniert pip und virtualenv in einem Tool mit Pipfile und Pipfile.lock.',
    h2Poetry: 'Poetry: Modernes Abhängigkeitsmanagement',
    poetryP1: 'Poetry ist das modernste und umfangreichste Python-Abhängigkeitsverwaltungstool.',
    h2Comparison: 'Tool-Vergleich',
    comparisonP1: 'Die Wahl des richtigen Tools hängt von Ihrem Anwendungsfall ab.',
    h2Faq: 'Häufig gestellte Fragen',
    faq1Q: 'Welches virtuelle Umgebungstool sollte ich 2026 verwenden?',
    faq1A: 'Für allgemeine Python-Entwicklung und Web-Apps verwenden Sie Poetry. Für Data Science und ML verwenden Sie conda.',
    faq2Q: 'Was ist der Unterschied zwischen pip und conda?',
    faq2A: 'pip installiert Python-Pakete nur von PyPI. conda kann auch Nicht-Python-Pakete installieren.',
    faq3Q: 'Kann ich pip innerhalb einer conda-Umgebung verwenden?',
    faq3A: 'Ja, aber mit Vorsicht. Das Mischen von pip und conda kann manchmal zu Konflikten führen.',
    faq4Q: 'Wie teile ich meine Umgebung mit anderen Entwicklern?',
    faq4A: 'Mit Poetry: pyproject.toml und poetry.lock committen. Mit pip: requirements.txt. Mit conda: environment.yml.',
    relatedTitle: 'Verwandte Tools',
  },
  it: { title: 'Ambienti virtuali Python: venv, conda, pipenv e Poetry', intro: 'Gli ambienti virtuali sono la pietra angolare della gestione delle dipendenze Python. Questa guida copre i quattro strumenti principali: <strong>venv</strong>, <strong>conda</strong>, <strong>pipenv</strong> e <strong>Poetry</strong>.', h2Why: 'Perché gli ambienti virtuali sono importanti', whyP1: 'Ogni progetto Python ha le proprie dipendenze con requisiti di versione specifici. Gli ambienti virtuali risolvono questo problema creando installazioni Python isolate per progetto.', h2Venv: 'venv: Libreria standard integrata', venvP1: 'venv è incluso con Python 3.3+ ed è l\'opzione più semplice. Non richiede installazione aggiuntiva.', h2Conda: 'conda: Potenza per la data science', condaP1: 'conda è un gestore di pacchetti completo che può installare dipendenze non Python.', h2Pipenv: 'pipenv: Workflow basato su Pipfile', pipenvP1: 'pipenv combina pip e virtualenv in un unico strumento con Pipfile e Pipfile.lock.', h2Poetry: 'Poetry: Gestione moderna delle dipendenze', poetryP1: 'Poetry è il gestore di dipendenze Python più moderno e completo.', h2Comparison: 'Confronto degli strumenti', comparisonP1: 'La scelta dello strumento giusto dipende dal caso d\'uso.', h2Faq: 'Domande frequenti', faq1Q: 'Quale strumento usare nel 2026?', faq1A: 'Per lo sviluppo Python generale usa Poetry. Per data science usa conda.', faq2Q: 'Differenza tra pip e conda?', faq2A: 'pip installa solo da PyPI. conda può installare anche pacchetti non Python.', faq3Q: 'Posso usare pip in un ambiente conda?', faq3A: 'Sì, ma con cautela. Mescolare pip e conda può causare conflitti.', faq4Q: 'Come condividere l\'ambiente?', faq4A: 'Con Poetry: pyproject.toml e poetry.lock. Con pip: requirements.txt. Con conda: environment.yml.', relatedTitle: 'Strumenti correlati' },
  es: { title: 'Entornos virtuales Python: venv, conda, pipenv y Poetry', intro: 'Los entornos virtuales son la piedra angular de la gestión de dependencias en Python. Esta guía cubre las cuatro herramientas principales: <strong>venv</strong>, <strong>conda</strong>, <strong>pipenv</strong> y <strong>Poetry</strong>.', h2Why: 'Por qué son importantes los entornos virtuales', whyP1: 'Cada proyecto Python tiene sus propias dependencias con requisitos de versión específicos. Los entornos virtuales resuelven esto creando instalaciones Python aisladas por proyecto.', h2Venv: 'venv: Biblioteca estándar integrada', venvP1: 'venv está incluido con Python 3.3+ y es la opción más simple. No requiere instalación adicional.', h2Conda: 'conda: Potencia para ciencia de datos', condaP1: 'conda es un gestor de paquetes completo que puede instalar dependencias no Python.', h2Pipenv: 'pipenv: Flujo de trabajo basado en Pipfile', pipenvP1: 'pipenv combina pip y virtualenv en una sola herramienta con Pipfile y Pipfile.lock.', h2Poetry: 'Poetry: Gestión moderna de dependencias', poetryP1: 'Poetry es el gestor de dependencias Python más moderno y completo.', h2Comparison: 'Comparación de herramientas', comparisonP1: 'La elección de la herramienta correcta depende de tu caso de uso.', h2Faq: 'Preguntas frecuentes', faq1Q: 'Qué herramienta usar en 2026?', faq1A: 'Para desarrollo Python general usa Poetry. Para ciencia de datos usa conda.', faq2Q: 'Diferencia entre pip y conda?', faq2A: 'pip solo instala desde PyPI. conda puede instalar paquetes no Python.', faq3Q: 'Puedo usar pip en un entorno conda?', faq3A: 'Sí, pero con precaución. Mezclar pip y conda puede causar conflictos.', faq4Q: 'Como compartir el entorno?', faq4A: 'Con Poetry: pyproject.toml y poetry.lock. Con pip: requirements.txt. Con conda: environment.yml.', relatedTitle: 'Herramientas relacionadas' },
  pt: { title: 'Ambientes virtuais Python: venv, conda, pipenv e Poetry', intro: 'Ambientes virtuais são a base do gerenciamento de dependências Python. Este guia cobre as quatro ferramentas principais: <strong>venv</strong>, <strong>conda</strong>, <strong>pipenv</strong> e <strong>Poetry</strong>.', h2Why: 'Por que ambientes virtuais são importantes', whyP1: 'Cada projeto Python tem suas próprias dependências com requisitos de versão específicos. Ambientes virtuais resolvem isso criando instalações Python isoladas por projeto.', h2Venv: 'venv: Biblioteca padrão integrada', venvP1: 'venv está incluído no Python 3.3+ e é a opção mais simples. Não requer instalação adicional.', h2Conda: 'conda: Potência para ciência de dados', condaP1: 'conda é um gerenciador de pacotes completo que pode instalar dependências não Python.', h2Pipenv: 'pipenv: Fluxo de trabalho baseado em Pipfile', pipenvP1: 'pipenv combina pip e virtualenv em uma única ferramenta com Pipfile e Pipfile.lock.', h2Poetry: 'Poetry: Gerenciamento moderno de dependências', poetryP1: 'Poetry é o gerenciador de dependências Python mais moderno e completo.', h2Comparison: 'Comparação de ferramentas', comparisonP1: 'A escolha da ferramenta certa depende do seu caso de uso.', h2Faq: 'Perguntas frequentes', faq1Q: 'Qual ferramenta usar em 2026?', faq1A: 'Para desenvolvimento Python geral use Poetry. Para ciência de dados use conda.', faq2Q: 'Diferença entre pip e conda?', faq2A: 'pip só instala do PyPI. conda pode instalar pacotes não Python.', faq3Q: 'Posso usar pip em um ambiente conda?', faq3A: 'Sim, mas com cuidado. Misturar pip e conda pode causar conflitos.', faq4Q: 'Como compartilhar o ambiente?', faq4A: 'Com Poetry: pyproject.toml e poetry.lock. Com pip: requirements.txt. Com conda: environment.yml.', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'Python virtuele omgevingen: venv, conda, pipenv en Poetry', intro: 'Virtuele omgevingen zijn de hoeksteen van Python-afhankelijkheidsbeheer. Deze gids behandelt de vier belangrijkste tools: <strong>venv</strong>, <strong>conda</strong>, <strong>pipenv</strong> en <strong>Poetry</strong>.', h2Why: 'Waarom virtuele omgevingen belangrijk zijn', whyP1: 'Elk Python-project heeft zijn eigen afhankelijkheden met specifieke versievereisten. Virtuele omgevingen lossen dit op door geïsoleerde Python-installaties per project te maken.', h2Venv: 'venv: Ingebouwde standaardbibliotheek', venvP1: 'venv is inbegrepen bij Python 3.3+ en is de eenvoudigste optie.', h2Conda: 'conda: Data science krachtpatser', condaP1: 'conda is een volledige pakketmanager die ook niet-Python-afhankelijkheden kan installeren.', h2Pipenv: 'pipenv: Pipfile-gebaseerde workflow', pipenvP1: 'pipenv combineert pip en virtualenv in één tool.', h2Poetry: 'Poetry: Modern afhankelijkheidsbeheer', poetryP1: 'Poetry is de meest moderne Python-afhankelijkheidsmanager.', h2Comparison: 'Toolvergelijking', comparisonP1: 'De keuze van het juiste tool hangt af van uw gebruik.', h2Faq: 'Veelgestelde vragen', faq1Q: 'Welk tool te gebruiken in 2026?', faq1A: 'Voor algemene Python-ontwikkeling gebruik Poetry. Voor data science gebruik conda.', faq2Q: 'Verschil tussen pip en conda?', faq2A: 'pip installeert alleen van PyPI. conda kan ook niet-Python-pakketten installeren.', faq3Q: 'Kan ik pip gebruiken in een conda-omgeving?', faq3A: 'Ja, maar met voorzichtigheid.', faq4Q: 'Hoe deel ik mijn omgeving?', faq4A: 'Met Poetry: pyproject.toml en poetry.lock. Met pip: requirements.txt. Met conda: environment.yml.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Wirtualne środowiska Python: venv, conda, pipenv i Poetry', intro: 'Wirtualne środowiska to fundament zarządzania zależnościami w Python. Ten przewodnik omawia cztery główne narzędzia: <strong>venv</strong>, <strong>conda</strong>, <strong>pipenv</strong> i <strong>Poetry</strong>.', h2Why: 'Dlaczego wirtualne środowiska są ważne', whyP1: 'Każdy projekt Python ma własne zależności z konkretnymi wymaganiami wersji. Wirtualne środowiska rozwiązują to przez tworzenie izolowanych instalacji Python per projekt.', h2Venv: 'venv: Wbudowana biblioteka standardowa', venvP1: 'venv jest dołączony do Python 3.3+ i jest najprostszą opcją.', h2Conda: 'conda: Potęga dla data science', condaP1: 'conda to kompletny menedżer pakietów, który może instalować zależności non-Python.', h2Pipenv: 'pipenv: Workflow oparty na Pipfile', pipenvP1: 'pipenv łączy pip i virtualenv w jednym narzędziu.', h2Poetry: 'Poetry: Nowoczesne zarządzanie zależnościami', poetryP1: 'Poetry to najbardziej nowoczesny menedżer zależności Python.', h2Comparison: 'Porównanie narzędzi', comparisonP1: 'Wybór właściwego narzędzia zależy od przypadku użycia.', h2Faq: 'Często zadawane pytania', faq1Q: 'Którego narzędzia użyć w 2026?', faq1A: 'Do ogólnego rozwoju Python użyj Poetry. Do data science użyj conda.', faq2Q: 'Różnica między pip i conda?', faq2A: 'pip instaluje tylko z PyPI. conda może instalować pakiety non-Python.', faq3Q: 'Czy mogę używać pip w środowisku conda?', faq3A: 'Tak, ale ostrożnie.', faq4Q: 'Jak udostępnić środowisko innym?', faq4A: 'Z Poetry: pyproject.toml i poetry.lock. Z pip: requirements.txt. Z conda: environment.yml.', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'Python virtuella miljöer: venv, conda, pipenv och Poetry', intro: 'Virtuella miljöer är hörnstenen i Python-beroendehantering. Denna guide täcker de fyra huvudverktygen: <strong>venv</strong>, <strong>conda</strong>, <strong>pipenv</strong> och <strong>Poetry</strong>.', h2Why: 'Varför virtuella miljöer är viktiga', whyP1: 'Varje Python-projekt har egna beroenden med specifika versionskrav. Virtuella miljöer löser detta genom att skapa isolerade Python-installationer per projekt.', h2Venv: 'venv: Inbyggt standardbibliotek', venvP1: 'venv ingår med Python 3.3+ och är det enklaste alternativet.', h2Conda: 'conda: Data science-kraftpaket', condaP1: 'conda är en komplett pakethanterare som kan installera icke-Python-beroenden.', h2Pipenv: 'pipenv: Pipfile-baserat arbetsflöde', pipenvP1: 'pipenv kombinerar pip och virtualenv i ett verktyg.', h2Poetry: 'Poetry: Modern beroendehantering', poetryP1: 'Poetry är den mest moderna Python-beroendehanteraren.', h2Comparison: 'Verktygsjämförelse', comparisonP1: 'Valet av rätt verktyg beror på ditt användningsfall.', h2Faq: 'Vanliga frågor', faq1Q: 'Vilket verktyg bör jag använda 2026?', faq1A: 'För allmän Python-utveckling, använd Poetry. För data science, använd conda.', faq2Q: 'Skillnad mellan pip och conda?', faq2A: 'pip installerar bara från PyPI. conda kan installera icke-Python-paket.', faq3Q: 'Kan jag använda pip i en conda-miljö?', faq3A: 'Ja, men med försiktighet.', faq4Q: 'Hur delar jag min miljö med andra?', faq4A: 'Med Poetry: pyproject.toml och poetry.lock. Med pip: requirements.txt. Med conda: environment.yml.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'Python virtuelle miljøer: venv, conda, pipenv og Poetry', intro: 'Virtuelle miljøer er hjørnesteinen i Python-avhengighetsadministrasjon. Denne guiden dekker de fire hovedverktøyene: <strong>venv</strong>, <strong>conda</strong>, <strong>pipenv</strong> og <strong>Poetry</strong>.', h2Why: 'Hvorfor virtuelle miljøer er viktige', whyP1: 'Hvert Python-prosjekt har egne avhengigheter med spesifikke versjonskrav. Virtuelle miljøer løser dette ved å lage isolerte Python-installasjoner per prosjekt.', h2Venv: 'venv: Innebygd standardbibliotek', venvP1: 'venv er inkludert med Python 3.3+ og er det enkleste alternativet.', h2Conda: 'conda: Data science-kraftverk', condaP1: 'conda er en fullstendig pakkebehandler som kan installere ikke-Python-avhengigheter.', h2Pipenv: 'pipenv: Pipfile-basert arbeidsflyt', pipenvP1: 'pipenv kombinerer pip og virtualenv i ett verktøy.', h2Poetry: 'Poetry: Moderne avhengighetsadministrasjon', poetryP1: 'Poetry er den mest moderne Python-avhengighetsbehandleren.', h2Comparison: 'Verktøysammenligning', comparisonP1: 'Valget av riktig verktøy avhenger av brukstilfellet.', h2Faq: 'Vanlige spørsmål', faq1Q: 'Hvilket verktøy bør jeg bruke i 2026?', faq1A: 'For generell Python-utvikling, bruk Poetry. For data science, bruk conda.', faq2Q: 'Forskjell mellom pip og conda?', faq2A: 'pip installerer bare fra PyPI. conda kan installere ikke-Python-pakker.', faq3Q: 'Kan jeg bruke pip i et conda-miljø?', faq3A: 'Ja, men med forsiktighet.', faq4Q: 'Hvordan dele miljøet med andre?', faq4A: 'Med Poetry: pyproject.toml og poetry.lock. Med pip: requirements.txt. Med conda: environment.yml.', relatedTitle: 'Relaterte verktøy' },
  zh: { title: 'Python 虚拟环境指南：venv、conda、pipenv 和 Poetry', intro: '虚拟环境是 Python 依赖管理的基石。本指南涵盖四大主要工具：<strong>venv</strong>、<strong>conda</strong>、<strong>pipenv</strong> 和 <strong>Poetry</strong>。', h2Why: '为什么虚拟环境很重要', whyP1: '每个 Python 项目都有自己的依赖项和特定版本要求。虚拟环境通过为每个项目创建隔离的 Python 安装来解决冲突问题。', h2Venv: 'venv：内置标准库', venvP1: 'venv 自 Python 3.3 起内置，是最简单的选项，无需额外安装。', h2Conda: 'conda：数据科学利器', condaP1: 'conda 不只是虚拟环境工具，还是可以安装非 Python 依赖的完整包管理器。', h2Pipenv: 'pipenv：基于 Pipfile 的工作流', pipenvP1: 'pipenv 将 pip 和 virtualenv 合并为一个工具，使用 Pipfile 和 Pipfile.lock。', h2Poetry: 'Poetry：现代依赖管理', poetryP1: 'Poetry 是最现代、功能最全的 Python 依赖管理工具。', h2Comparison: '工具对比', comparisonP1: '选择合适的工具取决于你的使用场景。', h2Faq: '常见问题', faq1Q: '2026 年应该使用哪个虚拟环境工具？', faq1A: '通用 Python 开发和 Web 应用推荐 Poetry。数据科学和机器学习推荐 conda。', faq2Q: 'pip 和 conda 的区别是什么？', faq2A: 'pip 只从 PyPI 安装 Python 包。conda 可以安装非 Python 依赖（C 库、CUDA 等）。', faq3Q: '能在 conda 环境中使用 pip 吗？', faq3A: '可以，但需谨慎。混用 pip 和 conda 有时会导致冲突。', faq4Q: '如何与其他开发者共享环境？', faq4A: 'Poetry：提交 pyproject.toml 和 poetry.lock。pip：使用 requirements.txt。conda：使用 environment.yml。', relatedTitle: '相关工具' },
  ja: { title: 'Python仮想環境ガイド: venv、conda、pipenv、Poetry', intro: '仮想環境はPython依存関係管理の礎です。このガイドでは4つの主要ツール、<strong>venv</strong>、<strong>conda</strong>、<strong>pipenv</strong>、<strong>Poetry</strong>を解説します。', h2Why: '仮想環境が重要な理由', whyP1: '各Pythonプロジェクトは独自の依存関係と特定バージョン要件を持ちます。仮想環境はプロジェクトごとに隔離されたPythonインストールを作成して解決します。', h2Venv: 'venv: 組み込み標準ライブラリ', venvP1: 'venvはPython 3.3+に付属する最もシンプルなオプションです。追加インストール不要。', h2Conda: 'conda: データサイエンスの強力ツール', condaP1: 'condaはPython以外の依存関係もインストールできる完全なパッケージマネージャーです。', h2Pipenv: 'pipenv: Pipfileベースのワークフロー', pipenvP1: 'pipenvはpipとvirtualenvを1つのツールに統合します。', h2Poetry: 'Poetry: モダンな依存関係管理', poetryP1: 'Poetryは最もモダンで機能豊富なPython依存関係マネージャーです。', h2Comparison: 'ツール比較', comparisonP1: '適切なツールの選択はユースケースによります。', h2Faq: 'よくある質問', faq1Q: '2026年にはどの仮想環境ツールを使うべき？', faq1A: '一般的なPython開発やWebアプリにはPoetryを使用してください。データサイエンスとMLにはcondaを使用してください。', faq2Q: 'pipとcondaの違いは？', faq2A: 'pipはPyPIからのみPythonパッケージをインストールします。condaは非Pythonパッケージもインストールできます。', faq3Q: 'conda環境内でpipを使えますか？', faq3A: 'はい、ただし注意が必要です。pipとcondaを混在させると競合が発生することがあります。', faq4Q: '環境を他の開発者と共有するには？', faq4A: 'Poetryの場合：pyproject.tomlとpoetry.lockをコミット。pipの場合：requirements.txt。condaの場合：environment.yml。', relatedTitle: '関連ツール' },
  ko: { title: 'Python 가상환경 가이드: venv, conda, pipenv, Poetry', intro: '가상환경은 Python 의존성 관리의 기초입니다. 이 가이드는 네 가지 주요 도구인 <strong>venv</strong>, <strong>conda</strong>, <strong>pipenv</strong>, <strong>Poetry</strong>를 다룹니다.', h2Why: '가상환경이 중요한 이유', whyP1: '각 Python 프로젝트는 특정 버전 요구사항이 있는 자체 의존성을 가집니다. 가상환경은 프로젝트별로 격리된 Python 설치를 생성하여 이를 해결합니다.', h2Venv: 'venv: 내장 표준 라이브러리', venvP1: 'venv는 Python 3.3+에 포함된 가장 간단한 옵션입니다.', h2Conda: 'conda: 데이터 사이언스 강자', condaP1: 'conda는 비Python 의존성도 설치할 수 있는 완전한 패키지 관리자입니다.', h2Pipenv: 'pipenv: Pipfile 기반 워크플로', pipenvP1: 'pipenv는 pip와 virtualenv를 하나의 도구로 결합합니다.', h2Poetry: 'Poetry: 현대적인 의존성 관리', poetryP1: 'Poetry는 가장 현대적이고 기능이 풍부한 Python 의존성 관리자입니다.', h2Comparison: '도구 비교', comparisonP1: '올바른 도구 선택은 사용 사례에 따라 다릅니다.', h2Faq: '자주 묻는 질문', faq1Q: '2026년에 어떤 가상환경 도구를 사용해야 하나요?', faq1A: '일반 Python 개발과 웹 앱에는 Poetry를 사용하세요. 데이터 사이언스와 ML에는 conda를 사용하세요.', faq2Q: 'pip와 conda의 차이점은?', faq2A: 'pip는 PyPI에서만 Python 패키지를 설치합니다. conda는 비Python 패키지도 설치할 수 있습니다.', faq3Q: 'conda 환경 내에서 pip를 사용할 수 있나요?', faq3A: '예, 하지만 주의가 필요합니다. pip와 conda를 혼용하면 충돌이 발생할 수 있습니다.', faq4Q: '다른 개발자와 환경을 공유하는 방법은?', faq4A: 'Poetry: pyproject.toml과 poetry.lock을 커밋. pip: requirements.txt. conda: environment.yml.', relatedTitle: '관련 도구' },
  id: { title: 'Panduan Lingkungan Virtual Python: venv, conda, pipenv, dan Poetry', intro: 'Lingkungan virtual adalah dasar manajemen dependensi Python. Panduan ini mencakup empat alat utama: <strong>venv</strong>, <strong>conda</strong>, <strong>pipenv</strong>, dan <strong>Poetry</strong>.', h2Why: 'Mengapa Lingkungan Virtual Penting', whyP1: 'Setiap proyek Python memiliki dependensinya sendiri dengan persyaratan versi tertentu. Lingkungan virtual menyelesaikan ini dengan membuat instalasi Python yang terisolasi per proyek.', h2Venv: 'venv: Pustaka Standar Bawaan', venvP1: 'venv disertakan dengan Python 3.3+ dan merupakan opsi paling sederhana.', h2Conda: 'conda: Andalan Data Science', condaP1: 'conda adalah manajer paket lengkap yang dapat menginstal dependensi non-Python.', h2Pipenv: 'pipenv: Alur Kerja Berbasis Pipfile', pipenvP1: 'pipenv menggabungkan pip dan virtualenv dalam satu alat.', h2Poetry: 'Poetry: Manajemen Dependensi Modern', poetryP1: 'Poetry adalah manajer dependensi Python paling modern dan lengkap.', h2Comparison: 'Perbandingan Alat', comparisonP1: 'Pemilihan alat yang tepat tergantung pada kasus penggunaan Anda.', h2Faq: 'Pertanyaan yang Sering Diajukan', faq1Q: 'Alat mana yang harus digunakan di 2026?', faq1A: 'Untuk pengembangan Python umum gunakan Poetry. Untuk data science gunakan conda.', faq2Q: 'Perbedaan pip dan conda?', faq2A: 'pip hanya menginstal dari PyPI. conda dapat menginstal paket non-Python.', faq3Q: 'Bisakah saya menggunakan pip dalam lingkungan conda?', faq3A: 'Ya, tapi hati-hati. Mencampur pip dan conda terkadang dapat menyebabkan konflik.', faq4Q: 'Bagaimana berbagi lingkungan dengan developer lain?', faq4A: 'Dengan Poetry: commit pyproject.toml dan poetry.lock. Dengan pip: requirements.txt. Dengan conda: environment.yml.', relatedTitle: 'Alat Terkait' },
  th: { title: 'คู่มือ Python Virtual Environments: venv, conda, pipenv และ Poetry', intro: 'Virtual environments เป็นรากฐานของการจัดการ dependency ใน Python คู่มือนี้ครอบคลุมเครื่องมือหลัก 4 อย่าง: <strong>venv</strong>, <strong>conda</strong>, <strong>pipenv</strong> และ <strong>Poetry</strong>', h2Why: 'ทำไม Virtual Environments ถึงสำคัญ', whyP1: 'โปรเจกต์ Python แต่ละโปรเจกต์มี dependency ของตัวเองพร้อมข้อกำหนดเวอร์ชันเฉพาะ Virtual environments แก้ปัญหานี้ด้วยการสร้าง Python installation ที่แยกออกต่อโปรเจกต์', h2Venv: 'venv: Standard Library ในตัว', venvP1: 'venv รวมอยู่กับ Python 3.3+ และเป็นตัวเลือกที่ง่ายที่สุด', h2Conda: 'conda: พลังสำหรับ Data Science', condaP1: 'conda ไม่ใช่แค่เครื่องมือ virtual environment แต่เป็น package manager ที่สมบูรณ์', h2Pipenv: 'pipenv: Workflow แบบ Pipfile', pipenvP1: 'pipenv รวม pip และ virtualenv เป็นเครื่องมือเดียว', h2Poetry: 'Poetry: การจัดการ Dependency สมัยใหม่', poetryP1: 'Poetry เป็น Python dependency manager ที่ทันสมัยและมีคุณสมบัติครบถ้วนที่สุด', h2Comparison: 'การเปรียบเทียบเครื่องมือ', comparisonP1: 'การเลือกเครื่องมือที่เหมาะสมขึ้นอยู่กับกรณีการใช้งาน', h2Faq: 'คำถามที่พบบ่อย', faq1Q: 'ควรใช้เครื่องมือ virtual environment ไหนในปี 2026?', faq1A: 'สำหรับการพัฒนา Python ทั่วไปและ web apps ใช้ Poetry สำหรับ data science และ ML ใช้ conda', faq2Q: 'ความแตกต่างระหว่าง pip และ conda คืออะไร?', faq2A: 'pip ติดตั้งเฉพาะ Python packages จาก PyPI conda สามารถติดตั้ง packages ที่ไม่ใช่ Python ได้ด้วย', faq3Q: 'ฉันสามารถใช้ pip ใน conda environment ได้หรือไม่?', faq3A: 'ได้ แต่ต้องระวัง การผสม pip และ conda อาจทำให้เกิดความขัดแย้ง', faq4Q: 'จะแชร์ environment กับ developer คนอื่นได้อย่างไร?', faq4A: 'ด้วย Poetry: commit pyproject.toml และ poetry.lock ด้วย pip: requirements.txt ด้วย conda: environment.yml', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

const venvCode = `# venv — Built-in (Python 3.3+)

# Create a virtual environment
python -m venv .venv

# Activate (macOS/Linux)
source .venv/bin/activate

# Activate (Windows)
.venv\\Scripts\\activate

# Install packages
pip install django requests

# Save dependencies
pip freeze \u003e requirements.txt

# Install from requirements.txt
pip install -r requirements.txt

# Deactivate
deactivate

# Delete the environment
rm -rf .venv

# Recommended: add .venv to .gitignore
echo ".venv" \u003e\u003e .gitignore`;

const poetryCode = `# Poetry — Modern Dependency Management (Recommended 2026)

# Install Poetry
curl -sSL https://install.python-poetry.org | python3 -

# Create a new project
poetry new my-project
cd my-project

# Add dependencies
poetry add django
poetry add --group dev pytest black ruff

# Install all dependencies (from poetry.lock)
poetry install

# Run commands in the virtual environment
poetry run python manage.py runserver
poetry run pytest

# Open a shell in the virtual environment
poetry shell

# Update dependencies
poetry update

# Export to requirements.txt (for compatibility)
poetry export -f requirements.txt --output requirements.txt

# Build and publish a package
poetry build
poetry publish

# Show dependency tree
poetry show --tree

# pyproject.toml (auto-generated)
# [tool.poetry]
# name = "my-project"
# version = "0.1.0"
# description = ""
# [tool.poetry.dependencies]
# python = "^\u003e=3.11"
# django = "^\u003e=5.0"
# [tool.poetry.group.dev.dependencies]
# pytest = "^\u003e=8.0"`;

const condaCode = `# conda — Data Science / ML (Anaconda/Miniconda)

# Install Miniconda (minimal)
# https://docs.conda.io/projects/miniconda/

# Create environment with specific Python version
conda create -n myproject python=3.11

# Activate environment
conda activate myproject

# Install packages (conda packages first)
conda install numpy pandas scikit-learn matplotlib

# Install packages not in conda
pip install some-pytorch-extension

# Export environment
conda env export \u003e environment.yml

# Create from environment.yml
conda env create -f environment.yml

# List environments
conda env list

# Deactivate
conda deactivate

# Remove environment
conda env remove -n myproject

# Update conda
conda update conda

# environment.yml example:
# name: myproject
# channels:
#   - conda-forge
#   - defaults
# dependencies:
#   - python=3.11
#   - numpy=1.26
#   - pandas=2.1
#   - pip:
#     - custom-package==1.0`;

export default function PythonVirtualEnvironments({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <h2>{s.h2Why}</h2>
      <p>{s.whyP1}</p>

      <h2>{s.h2Venv}</h2>
      <p>{s.venvP1}</p>
      <pre><code className="language-bash">{venvCode}</code></pre>

      <h2>{s.h2Poetry}</h2>
      <p>{s.poetryP1}</p>
      <pre><code className="language-bash">{poetryCode}</code></pre>

      <h2>{s.h2Conda}</h2>
      <p>{s.condaP1}</p>
      <pre><code className="language-bash">{condaCode}</code></pre>

      <h2>{s.h2Comparison}</h2>
      <p>{s.comparisonP1}</p>
      <pre><code className="language-text">{`Tool        Installation  Lockfile  Non-Python  Build/Publish  Best For
------------------------------------------------------------------------
venv        Built-in      No        No          No             Simple scripts, learning
pipenv      pip install   Yes       No          No             Legacy projects
Poetry      curl install  Yes       No          Yes            General apps, libraries
conda       Installer     Yes       Yes         No             Data science, ML, AI
uv          cargo/pip     Yes       No          Yes            Fast pip replacement (2026)`}</code></pre>

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
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link></li>
        <li><Link href={`/${lang}/tools/base64`}>Base64 Encoder/Decoder</Link></li>
        <li><Link href={`/${lang}/blog/javascript-error-handling`}>JavaScript Error Handling</Link></li>
      </ul>
    </>
  );
}
