'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'CircleCI vs Travis CI: Cloud CI Comparison',
    intro: 'CircleCI and Travis CI are two pioneering cloud-based CI/CD platforms that have shaped modern continuous integration practices. Travis CI, launched in 2011, popularized CI for open-source projects, while CircleCI, founded in 2011, focused on speed and parallelism. This comparison examines their features, performance, and suitability for different development workflows.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose CircleCI for speed, parallelism, and Docker-first workflows with advanced caching. Choose Travis CI for simplicity, excellent open-source support, and easy configuration. CircleCI offers more advanced features and better performance; Travis CI provides straightforward setup and strong community for OSS projects. Both support multiple languages and containerized builds.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Both launched in 2011, different focus areas',
    takeaway2: 'CircleCI: Speed, parallelism, advanced workflows; Travis CI: Simplicity',
    takeaway3: 'Travis CI excels in open-source community support',
    takeaway4: 'CircleCI offers better Docker and Kubernetes integration',
    takeaway5: 'Travis CI has simpler YAML configuration',
    takeaway6: 'Both support macOS builds for iOS development',
    
    whatIsCircleCITitle: 'What is CircleCI?',
    whatIsCircleCIContent: 'CircleCI is a cloud-based CI/CD platform focused on speed and developer productivity. It provides powerful workflow orchestration, advanced caching mechanisms, and extensive Docker support. CircleCI offers both cloud-hosted and self-hosted options, supporting parallelism, resource classes, and orbs for reusable configurations. Its emphasis on performance makes it popular for teams prioritizing fast feedback loops.',
    
    whatIsTravisCITitle: 'What is Travis CI?',
    whatIsTravisCIContent: 'Travis CI is a hosted continuous integration service that pioneered easy CI for GitHub projects. Known for its simplicity and excellent open-source support, Travis CI uses straightforward YAML configuration and automatically detects project types. It supports multiple languages, including built-in support for Ruby, Python, Java, and others. Travis CI was acquired by Idera in 2019 and continues to serve both OSS and commercial users.',
    
    performanceTitle: 'Performance & Speed',
    performanceIntro: 'Comparing build performance and execution:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of capabilities:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Build and workflow configurations:',
    
    circleCIExampleTitle: 'CircleCI Config',
    travisCIExampleTitle: 'Travis CI Config',
    
    dataSourceTitle: 'Language & Platform Support',
    dataSourceIntro: 'Supported languages and platforms:',
    
    alertingTitle: 'Advanced Features',
    alertingIntro: 'Advanced capabilities and integrations:',
    
    useCasesTitle: 'Best Use Cases',
    circleCIBestFor: 'CircleCI is Best For:',
    travisCIBestFor: 'Travis CI is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'CircleCI and Travis CI cater to different priorities in the CI/CD space. CircleCI excels in performance optimization, complex workflows, and container-native development, making it ideal for teams needing fast builds and advanced pipeline orchestration. Its orbs ecosystem and resource classes provide flexibility for diverse build requirements. Travis CI maintains its strength in simplicity and open-source support, offering easy setup and excellent documentation. The choice depends on your needs: maximum performance and advanced features (CircleCI) vs. simplicity and strong OSS community (Travis CI). Many teams choose CircleCI for commercial projects and Travis CI for open-source work.',
    
    faq1q: 'Which is better for open-source projects?',
    faq1a: 'Travis CI has historically been the preferred choice for open-source projects with free unlimited builds for public repositories. While CircleCI also offers free tiers for OSS, Travis CI maintains a stronger community presence and more extensive documentation for open-source workflows. However, CircleCI provides more advanced features for complex open-source projects.',
    
    faq2q: 'How do they compare in terms of speed?',
    faq2a: 'CircleCI generally offers faster builds due to its emphasis on performance optimization, advanced caching (including Docker layer caching), and parallelism features. Travis CI provides good performance but has fewer optimization options. For teams where build speed is critical, CircleCI has clear advantages with features like speculative builds and workflow-level caching.',
    
    faq3q: 'What about pricing and free tiers?',
    faq3a: 'Travis CI offers free builds for open-source and various paid tiers for private repositories. CircleCI provides a free tier with limited credits and performance plans for commercial use. Travis CI may be more cost-effective for pure OSS; CircleCI offers better value for teams needing high performance and advanced features. Both have changed pricing models over time, so checking current plans is recommended.',
    
    faq4q: 'Can both platforms build Docker images?',
    faq4a: 'Yes, both support Docker builds. CircleCI has more advanced Docker support with Docker layer caching, remote Docker environments, and container orchestration. Travis CI supports Docker builds but with simpler configuration. For heavy containerized workflows, CircleCI provides better tooling and performance optimizations.',
    
    faq5q: 'Which has better parallelism support?',
    faq5a: 'CircleCI has superior parallelism with support for splitting tests across multiple containers, parallel workflows, and configurable parallelism levels. Travis CI supports parallelization but with fewer options. CircleCI also offers matrix builds and fan-out/fan-in workflows for complex parallel execution patterns.',
    
    faq6q: 'How do they handle caching?',
    faq6a: 'CircleCI offers more sophisticated caching with dependency caching, Docker layer caching, and workspace persistence between jobs. Travis CI provides directory-based caching with simpler configuration. CircleCI caching is more powerful but requires more configuration; Travis CI caching is easier to set up but less flexible.',
    
    faq7q: 'Which is better for iOS/macOS development?',
    faq7a: 'Both support macOS builds for iOS development. Travis CI has provided macOS support longer and has extensive iOS build documentation. CircleCI also offers macOS executors with Xcode support. Both are capable, but Travis CI may have a slight edge in iOS community support, while CircleCI offers better integration with cross-platform workflows.',
    
    faq8q: 'What about self-hosted options?',
    faq8a: 'CircleCI offers CircleCI Server for self-hosted installation, providing full control over infrastructure. Travis CI primarily operates as a cloud service with limited self-hosted options (Travis CI Enterprise, though availability varies). For organizations requiring on-premise CI/CD, CircleCI has better self-hosted solutions.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'CircleCI vs Travis CI：云CI对比',
    intro: 'CircleCI和Travis CI是两个开创性的基于云的CI/CD平台，塑造了现代持续集成实践。Travis CI于2011年推出，普及了开源项目的CI，而CircleCI成立于2011年，专注于速度和并行性。本比较考察它们的功能、性能和适用性。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为速度、并行性和高级缓存的Docker-first工作流程选择CircleCI。为简洁性、出色的开源支持和简单配置选择Travis CI。CircleCI提供更高级的功能和更好的性能；Travis CI提供简单的设置和强大的OSS项目社区。两者都支持多种语言和容器化构建。',
    
    takeawaysTitle: '核心要点',
    takeaway1: '两者都于2011年推出，不同关注点',
    takeaway2: 'CircleCI：速度、并行性、高级工作流程；Travis CI：简洁性',
    takeaway3: 'Travis CI在开源社区支持方面表现出色',
    takeaway4: 'CircleCI提供更好的Docker和Kubernetes集成',
    takeaway5: 'Travis CI有更简单的YAML配置',
    takeaway6: '两者都支持iOS开发的macOS构建',
    
    whatIsCircleCITitle: '什么是CircleCI？',
    whatIsCircleCIContent: 'CircleCI是一个专注于速度和开发者生产力的基于云的CI/CD平台。它提供强大的工作流程编排、高级缓存机制和广泛的Docker支持。CircleCI提供云托管和自托管选项，支持并行性、资源类和orbs用于可重用配置。其对性能的强调使其在优先考虑快速反馈循环的团队中受欢迎。',
    
    whatIsTravisCITitle: '什么是Travis CI？',
    whatIsTravisCIContent: 'Travis CI是一个托管的持续集成服务，为GitHub项目开创了简单CI。以简洁性和出色的开源支持而闻名，Travis CI使用简单的YAML配置并自动检测项目类型。它支持多种语言，包括对Ruby、Python、Java等的内置支持。Travis CI于2019年被Idera收购，继续服务于OSS和商业用户。',
    
    performanceTitle: '性能与速度',
    performanceIntro: '比较构建性能和执行：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '能力的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '构建和工作流程配置：',
    
    circleCIExampleTitle: 'CircleCI配置',
    travisCIExampleTitle: 'Travis CI配置',
    
    dataSourceTitle: '语言与平台支持',
    dataSourceIntro: '支持的语言和平台：',
    
    alertingTitle: '高级功能',
    alertingIntro: '高级能力和集成：',
    
    useCasesTitle: '最佳用例',
    circleCIBestFor: 'CircleCI最适合：',
    travisCIBestFor: 'Travis CI最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'CircleCI和Travis CI迎合CI/CD领域中的不同优先级。CircleCI在性能优化、复杂工作流程和容器原生开发方面表现出色，非常适合需要快速构建和高级流水线编排的团队。其orbs生态系统和资源类为多样化的构建需求提供灵活性。Travis CI在简洁性和开源支持方面保持优势，提供简单的设置和出色的文档。选择取决于你的需求：最大性能和高级功能（CircleCI）vs简洁性和强大的OSS社区（Travis CI）。许多团队为商业项目选择CircleCI，为开源工作选择Travis CI。',
    
    faq1q: '哪个更适合开源项目？',
    faq1a: 'Travis CI历史上一直是开源项目的首选，为公共仓库提供免费无限制构建。虽然CircleCI也为OSS提供免费层，但Travis CI在社区存在感和开源工作流程的更广泛文档方面保持更强。但是，CircleCI为复杂的开源项目提供更高级的功能。',
    
    faq2q: '它们在速度方面如何比较？',
    faq2a: 'CircleCI通常提供更快的构建，因为它强调性能优化、高级缓存（包括Docker层缓存）和并行性功能。Travis CI提供良好的性能，但优化选项较少。对于构建速度至关重要的团队，CircleCI凭借推测性构建和工作流程级缓存等功能具有明显优势。',
    
    faq3q: '定价和免费层怎么样？',
    faq3a: 'Travis CI为开源提供免费构建，为私有仓库提供各种付费层。CircleCI提供有限积分的免费层和商业用途的性能计划。对于纯OSS，Travis CI可能更具成本效益；对于需要高性能和高级功能的团队，CircleCI提供更好的价值。两者都随时间改变了定价模型，建议查看当前计划。',
    
    faq4q: '两个平台都可以构建Docker镜像吗？',
    faq4a: '是的，两者都支持Docker构建。CircleCI有更高级的Docker支持，包括Docker层缓存、远程Docker环境和容器编排。Travis CI支持Docker构建但配置更简单。对于重度容器化工作流程，CircleCI提供更好的工具和性能优化。',
    
    faq5q: '哪个有更好的并行性支持？',
    faq5a: 'CircleCI具有卓越的并行性，支持跨多个容器拆分测试、并行工作流程和可配置的并行性级别。Travis CI支持并行化但选项较少。CircleCI还提供矩阵构建和扇出/扇入工作流程，用于复杂的并行执行模式。',
    
    faq6q: '它们如何处理缓存？',
    faq6a: 'CircleCI提供更复杂的缓存，包括依赖缓存、Docker层缓存和作业间的工作区持久化。Travis CI提供基于目录的缓存，配置更简单。CircleCI缓存更强大但需要更多配置；Travis CI缓存更容易设置但灵活性较低。',
    
    faq7q: '哪个更适合iOS/macOS开发？',
    faq7a: '两者都支持iOS开发的macOS构建。Travis CI提供macOS支持的时间更长，有广泛的iOS构建文档。CircleCI也提供带Xcode支持的macOS执行器。两者都有能力，但Travis CI可能在iOS社区支持方面略有优势，而CircleCI与跨平台工作流程有更好的集成。',
    
    faq8q: '自托管选项怎么样？',
    faq8a: 'CircleCI提供CircleCI Server用于自托管安装，提供对基础设施的完全控制。Travis CI主要作为云服务运营，自托管选项有限（Travis CI Enterprise，尽管可用性有所不同）。对于需要本地CI/CD的组织，CircleCI有更好的自托管解决方案。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function CircleCIVsTravisCI({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      <h2 style={h2Style}>{ct.takeawaysTitle}</h2>
      <div style={{ ...boxStyle, borderLeft: '4px solid #22c55e' }}>
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{ct.takeaway1}</li>
          <li>{ct.takeaway2}</li>
          <li>{ct.takeaway3}</li>
          <li>{ct.takeaway4}</li>
          <li>{ct.takeaway5}</li>
          <li>{ct.takeaway6}</li>
        </ul>
      </div>

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsCircleCITitle}</h3>
      <p style={pStyle}>{ct.whatIsCircleCIContent}</p>

      <h3 style={h3Style}>{ct.whatIsTravisCITitle}</h3>
      <p style={pStyle}>{ct.whatIsTravisCIContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>CircleCI</th>
              <th style={thStyle}>Travis CI</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '构建速度' : 'Build Speed', isZh ? '快速（优化缓存）' : 'Fast (optimized caching)', isZh ? '良好' : 'Good'],
              [isZh ? '并行性' : 'Parallelism', isZh ? '高级（多级）' : 'Advanced (multi-level)', isZh ? '基础' : 'Basic'],
              [isZh ? '缓存机制' : 'Caching', isZh ? '多层缓存' : 'Multi-layer caching', isZh ? '目录缓存' : 'Directory caching'],
              [isZh ? 'Docker支持' : 'Docker Support', isZh ? '原生、高级' : 'Native, advanced', isZh ? '支持' : 'Supported'],
              [isZh ? '资源类' : 'Resource Classes', isZh ? '可配置' : 'Configurable', isZh ? '固定' : 'Fixed'],
              [isZh ? '工作流' : 'Workflows', isZh ? '复杂编排' : 'Complex orchestration', isZh ? '简单' : 'Simple'],
              [isZh ? '设置复杂度' : 'Setup Complexity', isZh ? '中等' : 'Moderate', isZh ? '低' : 'Low'],
              [isZh ? '自托管' : 'Self-hosted', 'CircleCI Server', isZh ? '有限' : 'Limited'],
            ].map(([feature, circleci, travis], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{circleci}</td>
                <td style={tdStyle}>{travis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>CircleCI</th>
              <th style={thStyle}>Travis CI</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '配置格式' : 'Config Format', 'YAML (.circleci/config.yml)', 'YAML (.travis.yml)'],
              [isZh ? '可重用配置' : 'Reusable Config', 'Orbs', isZh ? '无' : 'No'],
              [isZh ? '矩阵构建' : 'Matrix Builds', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '测试拆分' : 'Test Splitting', isZh ? '自动' : 'Automatic', isZh ? '手动' : 'Manual'],
              [isZh ? 'SSH访问' : 'SSH Access', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '制品存储' : 'Artifacts', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? 'API' : 'API', 'REST API v2', 'REST API'],
              [isZh ? '见解/分析' : 'Insights/Analytics', isZh ? '详细' : 'Detailed', isZh ? '基础' : 'Basic'],
            ].map(([cap, circleci, travis], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{circleci}</td>
                <td style={tdStyle}>{travis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#343434' }}>{ct.circleCIExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# CircleCI Configuration
version: 2.1

orbs:
  node: circleci/node@5.1.0
  docker: circleci/docker@2.2.0

executors:
  node-executor:
    docker:
      - image: cimg/node:18.20
    resource_class: medium

  docker-executor:
    docker:
      - image: cimg/base:stable
    resource_class: large

commands:
  setup_environment:
    steps:
      - checkout
      - restore_cache:
          keys:
            - v1-deps-{{ checksum "package-lock.json" }}
            - v1-deps-
      - run: npm ci
      - save_cache:
          key: v1-deps-{{ checksum "package-lock.json" }}
          paths:
            - node_modules

jobs:
  build_and_test:
    executor: node-executor
    parallelism: 4
    steps:
      - setup_environment
      - run:
          name: Run tests in parallel
          command: |
            TESTFILES=$(circleci tests glob "test/**/*.test.js" | circleci tests split --split-by=timings)
            npm test $TESTFILES
      - store_test_results:
          path: test-results
      - store_artifacts:
          path: coverage
          destination: coverage-report

  lint:
    executor: node-executor
    steps:
      - setup_environment
      - run: npm run lint

  build_docker:
    executor: docker-executor
    steps:
      - checkout
      - setup_remote_docker:
          docker_layer_caching: true
      - docker/build:
          image: myapp
          tag: $CIRCLE_SHA1,latest
      - docker/push:
          image: myapp
          tag: $CIRCLE_SHA1,latest

  deploy:
    executor: node-executor
    steps:
      - run:
          name: Deploy to production
          command: |
            echo "Deploying version $CIRCLE_SHA1"
            # Add deployment commands

workflows:
  version: 2
  build-test-deploy:
    jobs:
      - build_and_test
      - lint
      - build_docker:
          requires:
            - build_and_test
            - lint
          filters:
            branches:
              only: main
      - deploy:
          requires:
            - build_docker
          filters:
            branches:
              only: main`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3eaaaf' }}>{ct.travisCIExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Travis CI Configuration
language: node_js
node_js:
  - 18
  - 20

cache:
  directories:
    - node_modules

matrix:
  include:
    - node_js: 18
      env: TEST_SUITE=unit
    - node_js: 20
      env: TEST_SUITE=integration

before_install:
  - npm install -g npm@latest

install:
  - npm ci

script:
  - npm run lint
  - npm run test:$TEST_SUITE -- --coverage

after_success:
  - bash <(curl -s https://codecov.io/bash)

jobs:
  include:
    - stage: build
      node_js: 18
      script:
        - npm run build
      
    - stage: docker
      if: branch = main
      services:
        - docker
      script:
        - docker build -t myapp:$TRAVIS_COMMIT .
        - echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
        - docker push myapp:$TRAVIS_COMMIT
        - docker tag myapp:$TRAVIS_COMMIT myapp:latest
        - docker push myapp:latest
    
    - stage: deploy
      if: branch = main
      script:
        - echo "Deploying to production"
        # Add deployment commands

notifications:
  email:
    on_success: never
    on_failure: always
  slack:
    rooms:
      - secure: "encrypted-slack-webhook"
    on_success: change
    on_failure: always

branches:
  only:
    - main
    - develop

env:
  global:
    - NODE_ENV=test
    - CC_TEST_REPORTER_ID=your-reporter-id

before_script:
  - curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
  - chmod +x ./cc-test-reporter
  - ./cc-test-reporter before-build

after_script:
  - ./cc-test-reporter after-build --exit-code $TRAVIS_TEST_RESULT`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '类别' : 'Category'}</th>
              <th style={thStyle}>CircleCI</th>
              <th style={thStyle}>Travis CI</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '主要语言' : 'Major Languages', 'All major languages', 'Ruby, Python, Java, JS, Go, PHP, etc.'],
              [isZh ? '操作系统' : 'Operating Systems', 'Linux, macOS, Windows', 'Linux, macOS'],
              [isZh ? '容器支持' : 'Container Support', 'Docker native, Kubernetes', 'Docker'],
              [isZh ? '数据库支持' : 'Database Support', 'MySQL, Postgres, Redis, MongoDB', 'MySQL, Postgres, Redis, MongoDB'],
              [isZh ? '浏览器测试' : 'Browser Testing', 'Selenium, Cypress, Playwright', 'Selenium, Chrome, Firefox'],
              [isZh ? '移动开发' : 'Mobile Development', 'iOS, Android', 'iOS, Android'],
            ].map(([cat, circleci, travis], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{circleci}</td>
                <td style={tdStyle}>{travis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #343434' }}>
          <strong style={{ color: '#343434' }}>CircleCI Advanced Features</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Orbs生态系统（可重用配置包）、工作流程编排（扇出/扇入）、高级缓存策略、Docker层缓存、上下文和密钥管理、洞察仪表盘、自我修复作业、资源类自定义、自托管选项。' : 'Orbs ecosystem (reusable config packages), workflow orchestration (fan-out/fan-in), advanced caching strategies, Docker layer caching, contexts and secrets management, insights dashboard, self-healing jobs, resource class customization, self-hosted options.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3eaaaf' }}>
          <strong style={{ color: '#3eaaaf' }}>Travis CI Advanced Features</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '自动语言检测、构建矩阵、部署提供者集成、缓存和工件、cron作业、条件构建、env变量加密、社区维护的构建配置、广泛的OSS文档。' : 'Automatic language detection, build matrices, deployment provider integrations, caching and artifacts, cron jobs, conditional builds, encrypted env variables, community-maintained build configs, extensive OSS documentation.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #343434' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#343434' }}>{ct.circleCIBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '需要快速反馈的团队' : 'Teams needing fast feedback'}</li>
            <li>{isZh ? '复杂工作流编排' : 'Complex workflow orchestration'}</li>
            <li>{isZh ? 'Docker原生应用' : 'Docker-native applications'}</li>
            <li>{isZh ? '企业级项目' : 'Enterprise-level projects'}</li>
            <li>{isZh ? '需要高级缓存' : 'Advanced caching needs'}</li>
            <li>{isZh ? '自托管需求' : 'Self-hosted requirements'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3eaaaf' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3eaaaf' }}>{ct.travisCIBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '开源项目' : 'Open source projects'}</li>
            <li>{isZh ? '简单CI需求' : 'Simple CI needs'}</li>
            <li>{isZh ? '快速项目启动' : 'Quick project setup'}</li>
            <li>{isZh ? 'Ruby/Python项目' : 'Ruby/Python projects'}</li>
            <li>{isZh ? '社区驱动开发' : 'Community-driven development'}</li>
            <li>{isZh ? '学习CI/CD' : 'Learning CI/CD'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/yaml-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>YAML Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
      </div>

      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
        [ct.faq7q, ct.faq7a],
        [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
