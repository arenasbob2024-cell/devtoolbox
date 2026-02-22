'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JavaScript Event Loop Visualizer',
    description: 'Visualize the JavaScript event loop with call stack, task queue, and microtask queue. Understand async execution interactively.',
    callStack: 'Call Stack',
    taskQueue: 'Task Queue (Macrotasks)',
    microtaskQueue: 'Microtask Queue',
    webApis: 'Web APIs / Timers',
    console: 'Console Output',
    codeLabel: 'JavaScript Code',
    run: 'Run',
    step: 'Step',
    reset: 'Reset',
    speed: 'Speed',
    slow: 'Slow',
    fast: 'Fast',
    running: 'Running...',
    idle: 'Idle',
    empty: '(empty)',
    presets: 'Code Presets',
    preset1: 'setTimeout vs Promise',
    preset2: 'Nested Promises',
    preset3: 'Mixed Async',
    preset4: 'Fetch Simulation',
    introTitle: 'Understanding the JavaScript Event Loop',
    introText: 'The JavaScript event loop is the mechanism that handles asynchronous operations. It continuously checks the call stack and queues to determine what code to execute next. setTimeout callbacks go to the task queue (macrotask), while Promise callbacks go to the microtask queue, which has higher priority.',
    tipTitle: 'Key Concepts',
    tip1: 'The call stack executes synchronous code first (LIFO order)',
    tip2: 'Microtasks (Promises) always run before macrotasks (setTimeout)',
    tip3: 'Each macrotask is followed by all pending microtasks',
    tip4: 'The event loop checks queues only when the call stack is empty',
    tip5: 'Web APIs like setTimeout run outside the main thread',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the JavaScript event loop?',
    faq1a: 'The JavaScript event loop is a concurrency model that allows JavaScript to perform non-blocking I/O operations despite being single-threaded. It works by offloading operations to the browser (Web APIs), then queueing their callbacks to be executed when the call stack is empty.',
    faq2q: 'What is the difference between microtasks and macrotasks?',
    faq2a: 'Microtasks (Promise.then, queueMicrotask, MutationObserver) have higher priority and are processed after each macrotask. Macrotasks (setTimeout, setInterval, I/O, UI rendering) are processed one at a time, with all pending microtasks drained between each macrotask.',
    faq3q: 'Why does Promise.then execute before setTimeout?',
    faq3a: 'Promise callbacks are microtasks, which are processed immediately after the current synchronous code finishes and before any macrotask (like setTimeout). The event loop always drains the entire microtask queue before picking the next macrotask.',
    faq4q: 'What happens when the call stack is empty?',
    faq4a: 'When the call stack is empty, the event loop first checks the microtask queue and processes all pending microtasks. Once the microtask queue is empty, it picks the next macrotask from the task queue and pushes it onto the call stack for execution.',
    faq5q: 'Is this tool free to use?',
    faq5a: 'Yes, this JavaScript event loop visualizer is completely free. It simulates the event loop behavior in your browser to help you understand asynchronous JavaScript execution patterns.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JavaScript 事件循环可视化',
    description: '可视化 JavaScript 事件循环，包含调用栈、任务队列和微任务队列。交互式理解异步执行。',
    callStack: '调用栈',
    taskQueue: '任务队列（宏任务）',
    microtaskQueue: '微任务队列',
    webApis: 'Web APIs / 定时器',
    console: '控制台输出',
    codeLabel: 'JavaScript 代码',
    run: '运行',
    step: '单步',
    reset: '重置',
    speed: '速度',
    slow: '慢',
    fast: '快',
    running: '运行中...',
    idle: '空闲',
    empty: '（空）',
    presets: '代码预设',
    preset1: 'setTimeout vs Promise',
    preset2: '嵌套 Promise',
    preset3: '混合异步',
    preset4: 'Fetch 模拟',
    introTitle: '理解 JavaScript 事件循环',
    introText: 'JavaScript 事件循环是处理异步操作的机制。它持续检查调用栈和队列以确定下一步执行什么代码。setTimeout 回调进入任务队列（宏任务），而 Promise 回调进入微任务队列，微任务优先级更高。',
    tipTitle: '核心概念',
    tip1: '调用栈首先执行同步代码（后进先出顺序）',
    tip2: '微任务（Promise）始终在宏任务（setTimeout）之前运行',
    tip3: '每个宏任务之后都会执行所有待处理的微任务',
    tip4: '只有当调用栈为空时，事件循环才检查队列',
    tip5: 'setTimeout 等 Web API 在主线程之外运行',
    faqTitle: '常见问题',
    faq1q: '什么是 JavaScript 事件循环？', faq1a: 'JavaScript 事件循环是一种并发模型，允许单线程的 JavaScript 执行非阻塞 I/O 操作。它通过将操作卸载到浏览器（Web API），然后在调用栈为空时将其回调排队执行。',
    faq2q: '微任务和宏任务有什么区别？', faq2a: '微任务（Promise.then、queueMicrotask）优先级更高，在每个宏任务之后处理。宏任务（setTimeout、setInterval、I/O）每次处理一个，每个宏任务之间会清空所有微任务。',
    faq3q: '为什么 Promise.then 在 setTimeout 之前执行？', faq3a: 'Promise 回调是微任务，在当前同步代码完成后立即处理，在任何宏任务之前。事件循环总是先清空整个微任务队列，然后才处理下一个宏任务。',
    faq4q: '调用栈为空时会发生什么？', faq4a: '调用栈为空时，事件循环首先检查微任务队列并处理所有待处理的微任务。微任务队列为空后，它从任务队列中取出下一个宏任务推入调用栈执行。',
    faq5q: '这个工具免费吗？', faq5a: '是的，这个 JavaScript 事件循环可视化工具完全免费。它在您的浏览器中模拟事件循环行为，帮助您理解异步 JavaScript 执行模式。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Visualiseur Event Loop JavaScript',
    description: 'Visualisez la boucle d\'evenements JavaScript avec pile d\'appels, file de taches et microtaches.',
    callStack: 'Pile d\'appels', taskQueue: 'File de taches (Macrotaches)', microtaskQueue: 'File de microtaches',
    webApis: 'Web APIs / Minuteries', console: 'Sortie console', codeLabel: 'Code JavaScript',
    run: 'Executer', step: 'Etape', reset: 'Reinitialiser', speed: 'Vitesse', slow: 'Lent', fast: 'Rapide',
    running: 'En cours...', idle: 'Inactif', empty: '(vide)',
    presets: 'Presets de code', preset1: 'setTimeout vs Promise', preset2: 'Promesses imbriquees',
    preset3: 'Async mixte', preset4: 'Simulation Fetch',
    introTitle: 'Comprendre l\'Event Loop JavaScript', introText: 'L\'event loop JavaScript gere les operations asynchrones. Les callbacks setTimeout vont dans la file macrotaches, les callbacks Promise dans la file microtaches.',
    tipTitle: 'Concepts cles', tip1: 'La pile d\'appels execute le code synchrone en premier', tip2: 'Les microtaches ont priorite sur les macrotaches',
    tip3: 'Chaque macrotache est suivie de toutes les microtaches', tip4: 'L\'event loop verifie les files quand la pile est vide', tip5: 'Les Web APIs comme setTimeout s\'executent hors du thread principal',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que l\'event loop?', faq1a: 'L\'event loop est le mecanisme de concurrence de JavaScript pour les operations non-bloquantes malgre le mono-thread.',
    faq2q: 'Quelle difference entre microtaches et macrotaches?', faq2a: 'Les microtaches (Promise.then) ont une priorite plus elevee et s\'executent entre chaque macrotache.',
    faq3q: 'Pourquoi Promise.then avant setTimeout?', faq3a: 'Les callbacks Promise sont des microtaches traitees avant tout macrotache.',
    faq4q: 'Que se passe-t-il quand la pile est vide?', faq4a: 'L\'event loop traite d\'abord toutes les microtaches, puis la prochaine macrotache.',
    faq5q: 'Est-ce gratuit?', faq5a: 'Oui, ce visualiseur est entierement gratuit.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'JavaScript Event Loop Visualisierer',
    description: 'Visualisieren Sie die JavaScript Event Loop mit Call Stack, Task Queue und Microtask Queue.',
    callStack: 'Call Stack', taskQueue: 'Task Queue (Makrotasks)', microtaskQueue: 'Microtask Queue',
    webApis: 'Web APIs / Timer', console: 'Konsolenausgabe', codeLabel: 'JavaScript Code',
    run: 'Ausfuehren', step: 'Schritt', reset: 'Zuruecksetzen', speed: 'Geschwindigkeit', slow: 'Langsam', fast: 'Schnell',
    running: 'Laeuft...', idle: 'Leerlauf', empty: '(leer)',
    presets: 'Code-Vorlagen', preset1: 'setTimeout vs Promise', preset2: 'Verschachtelte Promises',
    preset3: 'Gemischtes Async', preset4: 'Fetch-Simulation',
    introTitle: 'Die JavaScript Event Loop verstehen', introText: 'Die JavaScript Event Loop behandelt asynchrone Operationen. setTimeout-Callbacks gehen in die Task Queue, Promise-Callbacks in die Microtask Queue.',
    tipTitle: 'Kernkonzepte', tip1: 'Der Call Stack fuehrt synchronen Code zuerst aus', tip2: 'Microtasks haben Vorrang vor Macrotasks',
    tip3: 'Jeder Macrotask wird von allen Microtasks gefolgt', tip4: 'Die Event Loop prueft Queues nur bei leerem Stack', tip5: 'Web APIs laufen ausserhalb des Hauptthreads',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist die JavaScript Event Loop?', faq1a: 'Die Event Loop ist das Nebenlaeufikeitsmodell von JavaScript fuer nicht-blockierende I/O-Operationen.',
    faq2q: 'Unterschied zwischen Microtasks und Macrotasks?', faq2a: 'Microtasks (Promise.then) haben hoehere Prioritaet und werden zwischen Macrotasks verarbeitet.',
    faq3q: 'Warum Promise.then vor setTimeout?', faq3a: 'Promise-Callbacks sind Microtasks und werden vor Macrotasks verarbeitet.',
    faq4q: 'Was passiert bei leerem Call Stack?', faq4a: 'Die Event Loop verarbeitet zuerst alle Microtasks, dann den naechsten Macrotask.',
    faq5q: 'Ist es kostenlos?', faq5a: 'Ja, dieser Visualisierer ist vollstaendig kostenlos.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Visualizador del Event Loop JavaScript',
    description: 'Visualice el bucle de eventos de JavaScript con pila de llamadas, cola de tareas y microtareas.',
    callStack: 'Pila de llamadas', taskQueue: 'Cola de tareas (Macrotareas)', microtaskQueue: 'Cola de microtareas',
    webApis: 'Web APIs / Temporizadores', console: 'Salida de consola', codeLabel: 'Codigo JavaScript',
    run: 'Ejecutar', step: 'Paso', reset: 'Reiniciar', speed: 'Velocidad', slow: 'Lento', fast: 'Rapido',
    running: 'Ejecutando...', idle: 'Inactivo', empty: '(vacio)',
    presets: 'Presets de codigo', preset1: 'setTimeout vs Promise', preset2: 'Promesas anidadas',
    preset3: 'Async mixto', preset4: 'Simulacion Fetch',
    introTitle: 'Entendiendo el Event Loop de JavaScript', introText: 'El event loop de JavaScript maneja las operaciones asincronas. Los callbacks de setTimeout van a la cola de macrotareas, y los de Promise a la cola de microtareas.',
    tipTitle: 'Conceptos clave', tip1: 'La pila ejecuta codigo sincrono primero', tip2: 'Las microtareas tienen prioridad sobre las macrotareas',
    tip3: 'Cada macrotarea es seguida por todas las microtareas', tip4: 'El event loop revisa las colas solo cuando la pila esta vacia', tip5: 'Las Web APIs como setTimeout se ejecutan fuera del hilo principal',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es el event loop?', faq1a: 'El event loop es el modelo de concurrencia de JavaScript para operaciones no bloqueantes.',
    faq2q: 'Diferencia entre microtareas y macrotareas?', faq2a: 'Las microtareas (Promise.then) tienen mayor prioridad y se ejecutan entre macrotareas.',
    faq3q: 'Por que Promise.then antes que setTimeout?', faq3a: 'Los callbacks de Promise son microtareas que se procesan antes de cualquier macrotarea.',
    faq4q: 'Que pasa cuando la pila esta vacia?', faq4a: 'El event loop procesa primero todas las microtareas, luego la siguiente macrotarea.',
    faq5q: 'Es gratis?', faq5a: 'Si, este visualizador es completamente gratuito.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'JavaScript イベントループ ビジュアライザー',
    description: 'コールスタック、タスクキュー、マイクロタスクキューで JavaScript イベントループを視覚化。',
    callStack: 'コールスタック', taskQueue: 'タスクキュー（マクロタスク）', microtaskQueue: 'マイクロタスクキュー',
    webApis: 'Web APIs / タイマー', console: 'コンソール出力', codeLabel: 'JavaScript コード',
    run: '実行', step: 'ステップ', reset: 'リセット', speed: '速度', slow: '遅い', fast: '速い',
    running: '実行中...', idle: 'アイドル', empty: '（空）',
    presets: 'コードプリセット', preset1: 'setTimeout vs Promise', preset2: 'ネストされた Promise',
    preset3: '混合非同期', preset4: 'Fetch シミュレーション',
    introTitle: 'JavaScript イベントループの理解', introText: 'JavaScript イベントループは非同期操作を処理するメカニズムです。setTimeout コールバックはタスクキューに、Promise コールバックはマイクロタスクキューに入ります。',
    tipTitle: 'キーコンセプト', tip1: 'コールスタックは同期コードを最初に実行', tip2: 'マイクロタスクはマクロタスクより優先',
    tip3: '各マクロタスクの後に全マイクロタスクが実行', tip4: 'コールスタックが空の時のみキューをチェック', tip5: 'Web API はメインスレッド外で実行',
    faqTitle: 'よくある質問',
    faq1q: 'イベントループとは？', faq1a: 'イベントループはシングルスレッドの JavaScript で非ブロッキング I/O を実現する並行性モデルです。',
    faq2q: 'マイクロタスクとマクロタスクの違いは？', faq2a: 'マイクロタスク（Promise.then）は優先度が高く、各マクロタスク間で処理されます。',
    faq3q: 'なぜ Promise.then が setTimeout より先に実行される？', faq3a: 'Promise コールバックはマイクロタスクで、マクロタスクより先に処理されます。',
    faq4q: 'コールスタックが空の時は？', faq4a: 'まず全マイクロタスクを処理し、次にマクロタスクを処理します。',
    faq5q: '無料ですか？', faq5a: 'はい、完全に無料です。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'JavaScript 이벤트 루프 시각화',
    description: '콜 스택, 태스크 큐, 마이크로태스크 큐와 함께 JavaScript 이벤트 루프를 시각화합니다.',
    callStack: '콜 스택', taskQueue: '태스크 큐 (매크로태스크)', microtaskQueue: '마이크로태스크 큐',
    webApis: 'Web APIs / 타이머', console: '콘솔 출력', codeLabel: 'JavaScript 코드',
    run: '실행', step: '단계', reset: '초기화', speed: '속도', slow: '느림', fast: '빠름',
    running: '실행 중...', idle: '대기', empty: '(비어있음)',
    presets: '코드 프리셋', preset1: 'setTimeout vs Promise', preset2: '중첩 Promise',
    preset3: '혼합 비동기', preset4: 'Fetch 시뮬레이션',
    introTitle: 'JavaScript 이벤트 루프 이해하기', introText: 'JavaScript 이벤트 루프는 비동기 작업을 처리하는 메커니즘입니다. setTimeout 콜백은 태스크 큐에, Promise 콜백은 마이크로태스크 큐에 들어갑니다.',
    tipTitle: '핵심 개념', tip1: '콜 스택은 동기 코드를 먼저 실행', tip2: '마이크로태스크는 매크로태스크보다 우선',
    tip3: '각 매크로태스크 후 모든 마이크로태스크 실행', tip4: '콜 스택이 비었을 때만 큐 확인', tip5: 'Web API는 메인 스레드 외부에서 실행',
    faqTitle: '자주 묻는 질문',
    faq1q: '이벤트 루프란?', faq1a: '이벤트 루프는 싱글 스레드 JavaScript에서 비차단 I/O를 가능하게 하는 동시성 모델입니다.',
    faq2q: '마이크로태스크와 매크로태스크의 차이?', faq2a: '마이크로태스크(Promise.then)는 우선순위가 높으며 각 매크로태스크 사이에서 처리됩니다.',
    faq3q: '왜 Promise.then이 setTimeout보다 먼저 실행?', faq3a: 'Promise 콜백은 마이크로태스크로 매크로태스크보다 먼저 처리됩니다.',
    faq4q: '콜 스택이 비었을 때?', faq4a: '먼저 모든 마이크로태스크를 처리한 후 다음 매크로태스크를 처리합니다.',
    faq5q: '무료인가요?', faq5a: '네, 완전히 무료입니다.',
    relatedTitle: '관련 도구',
  },
  it: {
    title: 'Visualizzatore Event Loop JavaScript',
    description: 'Visualizza l\'event loop JavaScript con call stack, coda dei task e microtask.',
    callStack: 'Call Stack', taskQueue: 'Coda dei Task (Macrotask)', microtaskQueue: 'Coda dei Microtask',
    webApis: 'Web APIs / Timer', console: 'Output Console', codeLabel: 'Codice JavaScript',
    run: 'Esegui', step: 'Passo', reset: 'Reimposta', speed: 'Velocita', slow: 'Lento', fast: 'Veloce',
    running: 'In esecuzione...', idle: 'Inattivo', empty: '(vuoto)',
    presets: 'Preset di codice', preset1: 'setTimeout vs Promise', preset2: 'Promise annidate',
    preset3: 'Async misto', preset4: 'Simulazione Fetch',
    introTitle: 'Capire l\'Event Loop di JavaScript', introText: 'L\'event loop JavaScript gestisce le operazioni asincrone. I callback setTimeout vanno nella coda macrotask, i callback Promise nella coda microtask.',
    tipTitle: 'Concetti chiave', tip1: 'Il call stack esegue il codice sincrono per primo', tip2: 'I microtask hanno priorita sui macrotask',
    tip3: 'Ogni macrotask e seguito da tutti i microtask', tip4: 'L\'event loop controlla le code solo quando lo stack e vuoto', tip5: 'Le Web API come setTimeout vengono eseguite fuori dal thread principale',
    faqTitle: 'Domande frequenti',
    faq1q: 'Cos\'e l\'event loop?', faq1a: 'L\'event loop e il modello di concorrenza di JavaScript per operazioni non bloccanti.',
    faq2q: 'Differenza tra microtask e macrotask?', faq2a: 'I microtask (Promise.then) hanno priorita piu alta e vengono elaborati tra i macrotask.',
    faq3q: 'Perche Promise.then prima di setTimeout?', faq3a: 'I callback Promise sono microtask elaborati prima di qualsiasi macrotask.',
    faq4q: 'Cosa succede con lo stack vuoto?', faq4a: 'L\'event loop elabora prima tutti i microtask, poi il prossimo macrotask.',
    faq5q: 'E gratuito?', faq5a: 'Si, completamente gratuito.',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Visualizador do Event Loop JavaScript',
    description: 'Visualize o event loop do JavaScript com call stack, fila de tarefas e microtarefas.',
    callStack: 'Call Stack', taskQueue: 'Fila de Tarefas (Macrotarefas)', microtaskQueue: 'Fila de Microtarefas',
    webApis: 'Web APIs / Temporizadores', console: 'Saida do Console', codeLabel: 'Codigo JavaScript',
    run: 'Executar', step: 'Passo', reset: 'Reiniciar', speed: 'Velocidade', slow: 'Lento', fast: 'Rapido',
    running: 'Executando...', idle: 'Inativo', empty: '(vazio)',
    presets: 'Presets de codigo', preset1: 'setTimeout vs Promise', preset2: 'Promises aninhadas',
    preset3: 'Async misto', preset4: 'Simulacao Fetch',
    introTitle: 'Entendendo o Event Loop do JavaScript', introText: 'O event loop do JavaScript lida com operacoes assincronas. Callbacks de setTimeout vao para a fila de macrotarefas, callbacks de Promise para a fila de microtarefas.',
    tipTitle: 'Conceitos-chave', tip1: 'O call stack executa codigo sincrono primeiro', tip2: 'Microtarefas tem prioridade sobre macrotarefas',
    tip3: 'Cada macrotarefa e seguida por todas as microtarefas', tip4: 'O event loop verifica as filas apenas quando o stack esta vazio', tip5: 'Web APIs como setTimeout rodam fora da thread principal',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'O que e o event loop?', faq1a: 'O event loop e o modelo de concorrencia do JavaScript para operacoes nao-bloqueantes.',
    faq2q: 'Diferenca entre microtarefas e macrotarefas?', faq2a: 'Microtarefas (Promise.then) tem prioridade mais alta e sao processadas entre macrotarefas.',
    faq3q: 'Por que Promise.then antes de setTimeout?', faq3a: 'Callbacks de Promise sao microtarefas processadas antes de qualquer macrotarefa.',
    faq4q: 'O que acontece com o stack vazio?', faq4a: 'O event loop processa primeiro todas as microtarefas, depois a proxima macrotarefa.',
    faq5q: 'E gratuito?', faq5a: 'Sim, completamente gratuito.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'JavaScript Event Loop Visualizer',
    description: 'Visualiseer de JavaScript event loop met call stack, taakwachtrij en microtask wachtrij.',
    callStack: 'Call Stack', taskQueue: 'Taakwachtrij (Macrotaken)', microtaskQueue: 'Microtask Wachtrij',
    webApis: 'Web APIs / Timers', console: 'Console Output', codeLabel: 'JavaScript Code',
    run: 'Uitvoeren', step: 'Stap', reset: 'Reset', speed: 'Snelheid', slow: 'Langzaam', fast: 'Snel',
    running: 'Bezig...', idle: 'Inactief', empty: '(leeg)',
    presets: 'Code presets', preset1: 'setTimeout vs Promise', preset2: 'Geneste Promises',
    preset3: 'Gemengd async', preset4: 'Fetch simulatie',
    introTitle: 'De JavaScript Event Loop begrijpen', introText: 'De JavaScript event loop behandelt asynchrone operaties. setTimeout callbacks gaan naar de macrotask queue, Promise callbacks naar de microtask queue.',
    tipTitle: 'Kernconcepten', tip1: 'De call stack voert synchrone code eerst uit', tip2: 'Microtasks hebben voorrang op macrotasks',
    tip3: 'Elke macrotask wordt gevolgd door alle microtasks', tip4: 'De event loop controleert queues alleen bij een lege stack', tip5: 'Web APIs draaien buiten de hoofdthread',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Wat is de event loop?', faq1a: 'De event loop is het gelijktijdigheidsmodel van JavaScript voor niet-blokkerende I/O operaties.',
    faq2q: 'Verschil tussen microtasks en macrotasks?', faq2a: 'Microtasks (Promise.then) hebben hogere prioriteit en worden tussen macrotasks verwerkt.',
    faq3q: 'Waarom Promise.then voor setTimeout?', faq3a: 'Promise callbacks zijn microtasks die voor macrotasks worden verwerkt.',
    faq4q: 'Wat gebeurt er bij een lege stack?', faq4a: 'De event loop verwerkt eerst alle microtasks, dan de volgende macrotask.',
    faq5q: 'Is het gratis?', faq5a: 'Ja, volledig gratis.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Wizualizator Petli Zdarzen JavaScript',
    description: 'Wizualizuj petle zdarzen JavaScript ze stosem wywolan, kolejka zadan i mikrozadan.',
    callStack: 'Stos wywolan', taskQueue: 'Kolejka zadan (Makrozadania)', microtaskQueue: 'Kolejka mikrozadan',
    webApis: 'Web APIs / Timery', console: 'Wyjscie konsoli', codeLabel: 'Kod JavaScript',
    run: 'Uruchom', step: 'Krok', reset: 'Resetuj', speed: 'Szybkosc', slow: 'Wolno', fast: 'Szybko',
    running: 'Uruchomione...', idle: 'Bezczynny', empty: '(pusty)',
    presets: 'Predefiniowane kody', preset1: 'setTimeout vs Promise', preset2: 'Zagniezdzone Promise',
    preset3: 'Mieszany async', preset4: 'Symulacja Fetch',
    introTitle: 'Zrozumienie petli zdarzen JavaScript', introText: 'Petla zdarzen JavaScript obsluguje operacje asynchroniczne. Callbacki setTimeout trafiaja do kolejki makrozadan, callbacki Promise do kolejki mikrozadan.',
    tipTitle: 'Kluczowe koncepcje', tip1: 'Stos wywolan wykonuje kod synchroniczny pierwszy', tip2: 'Mikrozadania maja priorytet nad makrozadaniami',
    tip3: 'Kazde makrozadanie jest nastepowane przez wszystkie mikrozadania', tip4: 'Petla zdarzen sprawdza kolejki tylko przy pustym stosie', tip5: 'Web API dzialaja poza glownym watkiem',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Czym jest petla zdarzen?', faq1a: 'Petla zdarzen to model wspolbieznosci JavaScript dla operacji nieblokujacych.',
    faq2q: 'Roznica miedzy mikro- i makrozadaniami?', faq2a: 'Mikrozadania (Promise.then) maja wyzszy priorytet i sa przetwarzane miedzy makrozadaniami.',
    faq3q: 'Dlaczego Promise.then przed setTimeout?', faq3a: 'Callbacki Promise sa mikrozadaniami przetwarzanymi przed makrozadaniami.',
    faq4q: 'Co sie dzieje przy pustym stosie?', faq4a: 'Petla zdarzen przetwarza najpierw wszystkie mikrozadania, potem nastepne makrozadanie.',
    faq5q: 'Czy jest darmowe?', faq5a: 'Tak, calkowicie darmowe.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'JavaScript Event Loop Visualiserare',
    description: 'Visualisera JavaScript event loop med anropsstack, uppgiftskoer och mikrouppgiftskoer.',
    callStack: 'Anropsstack', taskQueue: 'Uppgiftskoer (Makrouppgifter)', microtaskQueue: 'Mikrouppgiftskoer',
    webApis: 'Web APIs / Timers', console: 'Konsolutdata', codeLabel: 'JavaScript-kod',
    run: 'Koer', step: 'Steg', reset: 'Aterstall', speed: 'Hastighet', slow: 'Langsam', fast: 'Snabb',
    running: 'Koer...', idle: 'Inaktiv', empty: '(tom)',
    presets: 'Kodfoerval', preset1: 'setTimeout vs Promise', preset2: 'Nastlade Promises',
    preset3: 'Blandad async', preset4: 'Fetch-simulering',
    introTitle: 'Foerstaa JavaScript Event Loop', introText: 'JavaScript event loop hanterar asynkrona operationer. setTimeout-callbacks gaar till makrotask-koern, Promise-callbacks till mikrotask-koern.',
    tipTitle: 'Nyckelkoncept', tip1: 'Anropsstacken koer synkron kod foerst', tip2: 'Mikrouppgifter har prioritet oever makrouppgifter',
    tip3: 'Varje makrouppgift foeljs av alla mikrouppgifter', tip4: 'Event loop kontrollerar koeer bara vid tom stack', tip5: 'Web APIs koer utanfoer huvudtraaden',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vad aer event loop?', faq1a: 'Event loop aer JavaScripts samtidighetsmodell foer icke-blockerande I/O-operationer.',
    faq2q: 'Skillnad mellan mikro- och makrouppgifter?', faq2a: 'Mikrouppgifter (Promise.then) har hoegre prioritet och bearbetas mellan makrouppgifter.',
    faq3q: 'Varfoer Promise.then foere setTimeout?', faq3a: 'Promise-callbacks aer mikrouppgifter som bearbetas foere makrouppgifter.',
    faq4q: 'Vad haender med tom stack?', faq4a: 'Event loop bearbetar foerst alla mikrouppgifter, sedan naesta makrouppgift.',
    faq5q: 'Aer det gratis?', faq5a: 'Ja, helt gratis.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'JavaScript Event Loop Visualiseringsverktoy',
    description: 'Visualiser JavaScript event loop med kallstabel, oppgavekoer og mikrooppgavekoer.',
    callStack: 'Kallstabel', taskQueue: 'Oppgavekoer (Makrooppgaver)', microtaskQueue: 'Mikrooppgavekoer',
    webApis: 'Web APIs / Tidtakere', console: 'Konsollutdata', codeLabel: 'JavaScript-kode',
    run: 'Kjoer', step: 'Steg', reset: 'Tilbakestill', speed: 'Hastighet', slow: 'Sakte', fast: 'Rask',
    running: 'Kjoerer...', idle: 'Inaktiv', empty: '(tom)',
    presets: 'Kodefoervalg', preset1: 'setTimeout vs Promise', preset2: 'Nestede Promises',
    preset3: 'Blandet async', preset4: 'Fetch-simulering',
    introTitle: 'Forstaa JavaScript Event Loop', introText: 'JavaScript event loop handterer asynkrone operasjoner. setTimeout-callbacks gaar til makrotask-koeen, Promise-callbacks til mikrotask-koeen.',
    tipTitle: 'Noekkelkonsepter', tip1: 'Kallstabelen kjoerer synkron kode foerst', tip2: 'Mikrooppgaver har prioritet over makrooppgaver',
    tip3: 'Hver makrooppgave foelges av alle mikrooppgaver', tip4: 'Event loop sjekker koeer kun ved tom stabel', tip5: 'Web APIs kjoerer utenfor hovedtraaden',
    faqTitle: 'Ofte stilte sporsmaal',
    faq1q: 'Hva er event loop?', faq1a: 'Event loop er JavaScripts samtidighetsmodell for ikke-blokkerende I/O-operasjoner.',
    faq2q: 'Forskjell mellom mikro- og makrooppgaver?', faq2a: 'Mikrooppgaver (Promise.then) har hoeyere prioritet og behandles mellom makrooppgaver.',
    faq3q: 'Hvorfor Promise.then foer setTimeout?', faq3a: 'Promise-callbacks er mikrooppgaver som behandles foer makrooppgaver.',
    faq4q: 'Hva skjer med tom stabel?', faq4a: 'Event loop behandler foerst alle mikrooppgaver, deretter neste makrooppgave.',
    faq5q: 'Er det gratis?', faq5a: 'Ja, helt gratis.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Visualisasi Event Loop JavaScript',
    description: 'Visualisasikan event loop JavaScript dengan call stack, antrian tugas, dan antrian microtask.',
    callStack: 'Call Stack', taskQueue: 'Antrian Tugas (Macrotask)', microtaskQueue: 'Antrian Microtask',
    webApis: 'Web APIs / Timer', console: 'Output Konsol', codeLabel: 'Kode JavaScript',
    run: 'Jalankan', step: 'Langkah', reset: 'Reset', speed: 'Kecepatan', slow: 'Lambat', fast: 'Cepat',
    running: 'Berjalan...', idle: 'Idle', empty: '(kosong)',
    presets: 'Preset kode', preset1: 'setTimeout vs Promise', preset2: 'Promise Bersarang',
    preset3: 'Async Campuran', preset4: 'Simulasi Fetch',
    introTitle: 'Memahami Event Loop JavaScript', introText: 'Event loop JavaScript menangani operasi asinkron. Callback setTimeout masuk ke antrian macrotask, callback Promise masuk ke antrian microtask.',
    tipTitle: 'Konsep Utama', tip1: 'Call stack mengeksekusi kode sinkron terlebih dahulu', tip2: 'Microtask memiliki prioritas di atas macrotask',
    tip3: 'Setiap macrotask diikuti oleh semua microtask', tip4: 'Event loop memeriksa antrian hanya saat stack kosong', tip5: 'Web API berjalan di luar thread utama',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Apa itu event loop?', faq1a: 'Event loop adalah model konkurensi JavaScript untuk operasi non-blocking I/O.',
    faq2q: 'Perbedaan microtask dan macrotask?', faq2a: 'Microtask (Promise.then) memiliki prioritas lebih tinggi dan diproses di antara macrotask.',
    faq3q: 'Mengapa Promise.then sebelum setTimeout?', faq3a: 'Callback Promise adalah microtask yang diproses sebelum macrotask.',
    faq4q: 'Apa yang terjadi saat stack kosong?', faq4a: 'Event loop memproses semua microtask terlebih dahulu, kemudian macrotask berikutnya.',
    faq5q: 'Apakah gratis?', faq5a: 'Ya, sepenuhnya gratis.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'เครื่องมือแสดง Event Loop ของ JavaScript',
    description: 'แสดง Event Loop ของ JavaScript พร้อม Call Stack, Task Queue และ Microtask Queue แบบโต้ตอบ',
    callStack: 'Call Stack', taskQueue: 'Task Queue (Macrotask)', microtaskQueue: 'Microtask Queue',
    webApis: 'Web APIs / Timer', console: 'Console Output', codeLabel: 'โค้ด JavaScript',
    run: 'รัน', step: 'ทีละขั้น', reset: 'รีเซ็ต', speed: 'ความเร็ว', slow: 'ช้า', fast: 'เร็ว',
    running: 'กำลังรัน...', idle: 'ว่าง', empty: '(ว่าง)',
    presets: 'โค้ดตัวอย่าง', preset1: 'setTimeout vs Promise', preset2: 'Promise ซ้อน',
    preset3: 'Async แบบผสม', preset4: 'จำลอง Fetch',
    introTitle: 'ทำความเข้าใจ Event Loop ของ JavaScript', introText: 'Event Loop ของ JavaScript จัดการการทำงานแบบอะซิงโครนัส callback ของ setTimeout ไปที่ task queue ส่วน callback ของ Promise ไปที่ microtask queue',
    tipTitle: 'แนวคิดหลัก', tip1: 'Call Stack ทำงานโค้ดแบบซิงโครนัสก่อน', tip2: 'Microtask มีความสำคัญเหนือ Macrotask',
    tip3: 'ทุก Macrotask จะตามด้วย Microtask ทั้งหมด', tip4: 'Event Loop ตรวจสอบ Queue เมื่อ Stack ว่างเท่านั้น', tip5: 'Web API ทำงานนอก Main Thread',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'Event Loop คืออะไร?', faq1a: 'Event Loop เป็นโมเดลการทำงานพร้อมกันของ JavaScript สำหรับการดำเนินการ I/O แบบไม่บล็อก',
    faq2q: 'ความแตกต่างระหว่าง Microtask และ Macrotask?', faq2a: 'Microtask (Promise.then) มีความสำคัญสูงกว่าและถูกประมวลผลระหว่าง Macrotask',
    faq3q: 'ทำไม Promise.then ก่อน setTimeout?', faq3a: 'callback ของ Promise เป็น Microtask ที่ถูกประมวลผลก่อน Macrotask',
    faq4q: 'เกิดอะไรขึ้นเมื่อ Stack ว่าง?', faq4a: 'Event Loop ประมวลผล Microtask ทั้งหมดก่อน จากนั้น Macrotask ถัดไป',
    faq5q: 'ฟรีไหม?', faq5a: 'ใช่ ฟรีทั้งหมด',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

interface SimStep {
  callStack: string[];
  taskQueue: string[];
  microtaskQueue: string[];
  webApis: string[];
  log: string[];
  highlight: string;
}

const PRESETS = [
  {
    key: 'preset1',
    code: `console.log("Start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");`,
    steps: (t: Record<string, string>): SimStep[] => [
      { callStack: ['console.log("Start")'], taskQueue: [], microtaskQueue: [], webApis: [], log: ['> Start'], highlight: 'sync' },
      { callStack: ['setTimeout(cb, 0)'], taskQueue: [], microtaskQueue: [], webApis: ['setTimeout (0ms)'], log: ['> Start'], highlight: 'webapi' },
      { callStack: ['Promise.resolve().then(cb)'], taskQueue: [], microtaskQueue: ['Promise.then'], webApis: ['setTimeout (0ms)'], log: ['> Start'], highlight: 'microtask' },
      { callStack: ['console.log("End")'], taskQueue: [], microtaskQueue: ['Promise.then'], webApis: ['setTimeout (0ms)'], log: ['> Start', '> End'], highlight: 'sync' },
      { callStack: [], taskQueue: ['setTimeout cb'], microtaskQueue: ['Promise.then'], webApis: [], log: ['> Start', '> End'], highlight: 'drain' },
      { callStack: ['Promise.then cb', 'console.log("Promise")'], taskQueue: ['setTimeout cb'], microtaskQueue: [], webApis: [], log: ['> Start', '> End', '> Promise'], highlight: 'microtask' },
      { callStack: ['setTimeout cb', 'console.log("setTimeout")'], taskQueue: [], microtaskQueue: [], webApis: [], log: ['> Start', '> End', '> Promise', '> setTimeout'], highlight: 'macrotask' },
      { callStack: [], taskQueue: [], microtaskQueue: [], webApis: [], log: ['> Start', '> End', '> Promise', '> setTimeout'], highlight: 'done' },
    ],
  },
  {
    key: 'preset2',
    code: `Promise.resolve()
  .then(() => {
    console.log("then 1");
    return Promise.resolve();
  })
  .then(() => {
    console.log("then 2");
  });

Promise.resolve().then(() => {
  console.log("then 3");
});

console.log("Sync");`,
    steps: (): SimStep[] => [
      { callStack: ['Promise.resolve().then(cb1).then(cb2)'], taskQueue: [], microtaskQueue: ['then cb1'], webApis: [], log: [], highlight: 'microtask' },
      { callStack: ['Promise.resolve().then(cb3)'], taskQueue: [], microtaskQueue: ['then cb1', 'then cb3'], webApis: [], log: [], highlight: 'microtask' },
      { callStack: ['console.log("Sync")'], taskQueue: [], microtaskQueue: ['then cb1', 'then cb3'], webApis: [], log: ['> Sync'], highlight: 'sync' },
      { callStack: ['then cb1', 'console.log("then 1")'], taskQueue: [], microtaskQueue: ['then cb3'], webApis: [], log: ['> Sync', '> then 1'], highlight: 'microtask' },
      { callStack: ['then cb3', 'console.log("then 3")'], taskQueue: [], microtaskQueue: ['then cb2'], webApis: [], log: ['> Sync', '> then 1', '> then 3'], highlight: 'microtask' },
      { callStack: ['then cb2', 'console.log("then 2")'], taskQueue: [], microtaskQueue: [], webApis: [], log: ['> Sync', '> then 1', '> then 3', '> then 2'], highlight: 'microtask' },
      { callStack: [], taskQueue: [], microtaskQueue: [], webApis: [], log: ['> Sync', '> then 1', '> then 3', '> then 2'], highlight: 'done' },
    ],
  },
  {
    key: 'preset3',
    code: `console.log("1");

setTimeout(() => console.log("2"), 0);
setTimeout(() => console.log("3"), 0);

Promise.resolve()
  .then(() => console.log("4"))
  .then(() => console.log("5"));

console.log("6");`,
    steps: (): SimStep[] => [
      { callStack: ['console.log("1")'], taskQueue: [], microtaskQueue: [], webApis: [], log: ['> 1'], highlight: 'sync' },
      { callStack: ['setTimeout(cb, 0)'], taskQueue: [], microtaskQueue: [], webApis: ['setTimeout #1', 'setTimeout #2'], log: ['> 1'], highlight: 'webapi' },
      { callStack: ['Promise.resolve().then(cb)'], taskQueue: [], microtaskQueue: ['Promise.then #1'], webApis: ['setTimeout #1', 'setTimeout #2'], log: ['> 1'], highlight: 'microtask' },
      { callStack: ['console.log("6")'], taskQueue: [], microtaskQueue: ['Promise.then #1'], webApis: ['setTimeout #1', 'setTimeout #2'], log: ['> 1', '> 6'], highlight: 'sync' },
      { callStack: [], taskQueue: ['setTimeout #1', 'setTimeout #2'], microtaskQueue: ['Promise.then #1'], webApis: [], log: ['> 1', '> 6'], highlight: 'drain' },
      { callStack: ['Promise.then #1', 'console.log("4")'], taskQueue: ['setTimeout #1', 'setTimeout #2'], microtaskQueue: ['Promise.then #2'], webApis: [], log: ['> 1', '> 6', '> 4'], highlight: 'microtask' },
      { callStack: ['Promise.then #2', 'console.log("5")'], taskQueue: ['setTimeout #1', 'setTimeout #2'], microtaskQueue: [], webApis: [], log: ['> 1', '> 6', '> 4', '> 5'], highlight: 'microtask' },
      { callStack: ['setTimeout #1', 'console.log("2")'], taskQueue: ['setTimeout #2'], microtaskQueue: [], webApis: [], log: ['> 1', '> 6', '> 4', '> 5', '> 2'], highlight: 'macrotask' },
      { callStack: ['setTimeout #2', 'console.log("3")'], taskQueue: [], microtaskQueue: [], webApis: [], log: ['> 1', '> 6', '> 4', '> 5', '> 2', '> 3'], highlight: 'macrotask' },
      { callStack: [], taskQueue: [], microtaskQueue: [], webApis: [], log: ['> 1', '> 6', '> 4', '> 5', '> 2', '> 3'], highlight: 'done' },
    ],
  },
  {
    key: 'preset4',
    code: `console.log("Start fetch");

fetch("/api/data")
  .then(res => res.json())
  .then(data => {
    console.log("Data:", data);
  });

setTimeout(() => {
  console.log("Timeout");
}, 100);

console.log("End");`,
    steps: (): SimStep[] => [
      { callStack: ['console.log("Start fetch")'], taskQueue: [], microtaskQueue: [], webApis: [], log: ['> Start fetch'], highlight: 'sync' },
      { callStack: ['fetch("/api/data")'], taskQueue: [], microtaskQueue: [], webApis: ['fetch (pending...)'], log: ['> Start fetch'], highlight: 'webapi' },
      { callStack: ['setTimeout(cb, 100)'], taskQueue: [], microtaskQueue: [], webApis: ['fetch (pending...)', 'setTimeout (100ms)'], log: ['> Start fetch'], highlight: 'webapi' },
      { callStack: ['console.log("End")'], taskQueue: [], microtaskQueue: [], webApis: ['fetch (pending...)', 'setTimeout (100ms)'], log: ['> Start fetch', '> End'], highlight: 'sync' },
      { callStack: [], taskQueue: [], microtaskQueue: ['fetch.then(res.json)'], webApis: ['setTimeout (100ms)'], log: ['> Start fetch', '> End'], highlight: 'drain' },
      { callStack: ['fetch.then(cb)', 'console.log("Data:", data)'], taskQueue: [], microtaskQueue: [], webApis: ['setTimeout (100ms)'], log: ['> Start fetch', '> End', '> Data: {ok: true}'], highlight: 'microtask' },
      { callStack: ['setTimeout cb', 'console.log("Timeout")'], taskQueue: [], microtaskQueue: [], webApis: [], log: ['> Start fetch', '> End', '> Data: {ok: true}', '> Timeout'], highlight: 'macrotask' },
      { callStack: [], taskQueue: [], microtaskQueue: [], webApis: [], log: ['> Start fetch', '> End', '> Data: {ok: true}', '> Timeout'], highlight: 'done' },
    ],
  },
];

const COLORS = {
  callStack: '#ef4444',
  taskQueue: '#f59e0b',
  microtask: '#8b5cf6',
  webApis: '#06b6d4',
  console: '#22c55e',
};

export default function JavaScriptEventLoopVisualizer() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [presetIdx, setPresetIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(800);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const preset = PRESETS[presetIdx];
  const steps = preset.steps(t);
  const currentStep = stepIdx >= 0 && stepIdx < steps.length ? steps[stepIdx] : null;

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    stopTimer();
    setStepIdx(-1);
  }, [stopTimer]);

  const handleStep = useCallback(() => {
    stopTimer();
    setStepIdx(prev => {
      const next = prev + 1;
      return next < steps.length ? next : prev;
    });
  }, [stopTimer, steps.length]);

  const handleRun = useCallback(() => {
    if (isRunning) { stopTimer(); return; }
    setStepIdx(-1);
    setIsRunning(true);
    let idx = 0;
    timerRef.current = setInterval(() => {
      if (idx >= steps.length) { stopTimer(); return; }
      setStepIdx(idx);
      idx++;
    }, speed);
  }, [isRunning, speed, steps.length, stopTimer]);

  useEffect(() => { return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);
  useEffect(() => { handleReset(); }, [presetIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderQueue = (items: string[], color: string, label: string) => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
      <div style={{ minHeight: 44, border: `2px solid ${color}`, borderRadius: 8, padding: 8, background: `${color}11`, display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        {items.length === 0 ? (
          <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic' }}>{t.empty}</span>
        ) : (
          items.map((item, i) => (
            <div key={i} style={{
              padding: '4px 10px', borderRadius: 6, fontSize: 12, fontFamily: 'monospace',
              background: color, color: '#fff', fontWeight: 500, whiteSpace: 'nowrap',
              animation: 'fadeIn 0.3s ease',
            }}>
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="javascript-event-loop-visualizer">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }` }} />

      {/* Preset selector */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>{t.presets}</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {PRESETS.map((p, i) => (
            <button key={p.key} onClick={() => setPresetIdx(i)}
              style={{
                padding: '6px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
                border: i === presetIdx ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                background: i === presetIdx ? 'rgba(59,130,246,0.1)' : 'var(--bg-input)',
                color: 'var(--text-primary)', fontWeight: i === presetIdx ? 600 : 400,
              }}>
              {t[p.key as keyof typeof t] || p.key}
            </button>
          ))}
        </div>
      </div>

      {/* Code display */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.codeLabel}</label>
          <CopyButton text={preset.code} />
        </div>
        <pre style={{
          background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8,
          padding: 14, fontSize: 13, fontFamily: 'monospace', overflow: 'auto', maxHeight: 200,
          lineHeight: 1.6, color: 'var(--text-primary)',
        }}>{preset.code}</pre>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleRun} className="btn btn-primary" style={{ minWidth: 90 }}>
          {isRunning ? t.running : t.run}
        </button>
        <button onClick={handleStep} className="btn btn-secondary" disabled={isRunning || stepIdx >= steps.length - 1}>{t.step}</button>
        <button onClick={handleReset} className="btn btn-secondary">{t.reset}</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
          <span style={{ fontSize: 12 }}>{t.slow}</span>
          <input type="range" min={200} max={2000} step={100} value={2200 - speed}
            onChange={e => setSpeed(2200 - Number(e.target.value))}
            style={{ width: 100 }} />
          <span style={{ fontSize: 12 }}>{t.fast}</span>
        </div>
        {/* Step counter */}
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginLeft: 8 }}>
          {stepIdx >= 0 ? `${stepIdx + 1} / ${steps.length}` : t.idle}
        </span>
      </div>

      {/* Visualization grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div>
          {renderQueue(currentStep?.callStack || [], COLORS.callStack, t.callStack)}
          {renderQueue(currentStep?.webApis || [], COLORS.webApis, t.webApis)}
        </div>
        <div>
          {renderQueue(currentStep?.microtaskQueue || [], COLORS.microtask, t.microtaskQueue)}
          {renderQueue(currentStep?.taskQueue || [], COLORS.taskQueue, t.taskQueue)}
        </div>
      </div>

      {/* Console output */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, display: 'block', color: COLORS.console, textTransform: 'uppercase', letterSpacing: 1 }}>{t.console}</label>
        <div style={{
          border: `2px solid ${COLORS.console}`, borderRadius: 8, padding: 12,
          background: '#0a0a0a', minHeight: 80, fontFamily: 'monospace', fontSize: 13,
          color: '#22c55e', lineHeight: 1.8,
        }}>
          {(currentStep?.log || []).map((line, i) => (
            <div key={i} style={{ animation: 'fadeIn 0.3s ease' }}>{line}</div>
          ))}
          {(!currentStep || currentStep.log.length === 0) && (
            <span style={{ color: '#555', fontStyle: 'italic' }}>{t.empty}</span>
          )}
        </div>
      </div>

      {/* Execution order legend */}
      <div style={{
        display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24, padding: 12,
        background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)',
      }}>
        {[
          { color: COLORS.callStack, label: t.callStack },
          { color: COLORS.microtask, label: t.microtaskQueue },
          { color: COLORS.taskQueue, label: t.taskQueue },
          { color: COLORS.webApis, label: t.webApis },
          { color: COLORS.console, label: t.console },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: item.color }} />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li><li>{t.tip2}</li><li>{t.tip3}</li><li>{t.tip4}</li><li>{t.tip5}</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/regex-tester`, label: 'Regex Tester' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/typescript-to-javascript`, label: 'TypeScript to JS' },
            { href: `/${lang}/tools/css-box-model-visualizer`, label: 'CSS Box Model' },
          ].map(link => (
            <Link key={link.href} href={link.href}
              style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
