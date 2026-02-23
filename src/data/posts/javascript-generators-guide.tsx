'use client';
import React from 'react';

const codeBasicGenerator = `// Generator function syntax: function* with yield
function* counter(start = 0) {
    let i = start;
    while (true) {
        yield i++;    // pauses here, returns i, resumes on next()
    }
}

const gen = counter(1);
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }

// Finite generator
function* range(start, end, step = 1) {
    for (let i = start; i \u003c end; i += step) {
        yield i;
    }
}

// for...of automatically calls .next() and stops at done: true
for (const num of range(0, 10, 2)) {
    console.log(num); // 0, 2, 4, 6, 8
}

// Spread operator works with generators
const nums = [...range(1, 6)]; // [1, 2, 3, 4, 5]

// Destructuring works too
const [a, b, c] = range(10, 20); // a=10, b=11, c=12`;

const codeTwoWay = `// Generators support two-way communication
// yield receives values via next(value)
function* calculator() {
    let result = 0;
    while (true) {
        const input = yield result;  // pauses and sends result; receives input
        if (input === null) break;
        result += input;
    }
    return result;
}

const calc = calculator();
calc.next();        // start: { value: 0, done: false }
calc.next(10);      // add 10: { value: 10, done: false }
calc.next(5);       // add 5: { value: 15, done: false }
calc.next(null);    // stop: { value: 15, done: true }

// Generator as stateful iterator
function* idGenerator(prefix = 'id') {
    let id = 1;
    while (true) {
        const reset = yield \`\${prefix}-\${id}\`;
        if (reset) {
            id = 1;
        } else {
            id++;
        }
    }
}

const ids = idGenerator('user');
console.log(ids.next().value);       // 'user-1'
console.log(ids.next().value);       // 'user-2'
console.log(ids.next(true).value);   // 'user-1' (reset)
console.log(ids.next().value);       // 'user-2'`;

const codeYieldStar = `// yield* — delegate to another iterable
function* innerGen() {
    yield 'a';
    yield 'b';
    yield 'c';
}

function* outerGen() {
    yield 1;
    yield* innerGen();    // delegate: yields 'a', 'b', 'c'
    yield* [4, 5, 6];    // works with any iterable
    yield 7;
}

console.log([...outerGen()]); // [1, 'a', 'b', 'c', 4, 5, 6, 7]

// Practical: flatten nested arrays
function* flatten(arr) {
    for (const item of arr) {
        if (Array.isArray(item)) {
            yield* flatten(item); // recursive delegation
        } else {
            yield item;
        }
    }
}

const nested = [1, [2, [3, 4], 5], [6, 7]];
console.log([...flatten(nested)]); // [1, 2, 3, 4, 5, 6, 7]

// Tree traversal with yield*
function* walkTree(node) {
    yield node.value;
    for (const child of node.children ?? []) {
        yield* walkTree(child); // depth-first traversal
    }
}`;

const codeAsyncGenerator = `// Async generators: async function* with yield
async function* streamLines(url) {
    const response = await fetch(url);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            if (buffer) yield buffer;
            break;
        }
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
            yield line;   // yield each complete line
        }
    }
}

// Usage with for await...of
async function processCSV(url) {
    let lineNumber = 0;
    for await (const line of streamLines(url)) {
        lineNumber++;
        if (lineNumber === 1) continue; // skip header
        const [name, score] = line.split(',');
        console.log(\`\${name}: \${score}\`);
    }
}

// SSE (Server-Sent Events) as async generator
async function* sseStream(url) {
    const response = await fetch(url);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    for await (const chunk of readChunks(reader)) {
        const text = decoder.decode(chunk);
        for (const line of text.split('\\n')) {
            if (line.startsWith('data: ')) {
                yield JSON.parse(line.slice(6));
            }
        }
    }
}`;

const codeRealWorld = `// Real-world: infinite scroll with generator
function* paginator(fetchPage) {
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        const { items, totalPages } = yield fetchPage(page);
        hasMore = page \u003c totalPages;
        page++;
    }
}

// Lazy pipeline with generators
function* map(iterable, fn) {
    for (const item of iterable) {
        yield fn(item);
    }
}

function* filter(iterable, predicate) {
    for (const item of iterable) {
        if (predicate(item)) yield item;
    }
}

function* take(iterable, n) {
    let count = 0;
    for (const item of iterable) {
        if (count++ \u003e= n) break;
        yield item;
    }
}

// Lazy pipeline — no intermediate arrays created!
const first10EvenSquares = [
    ...take(
        filter(
            map(range(1, Infinity), x => x * x),
            x => x % 2 === 0
        ),
        10
    )
];
// [4, 16, 36, 64, 100, 144, 196, 256, 324, 400]

// Observable-like: cancelable async iteration
async function* withTimeout(asyncIterable, timeoutMs) {
    const timeout = setTimeout(() => {
        throw new Error('Stream timed out');
    }, timeoutMs);
    try {
        for await (const item of asyncIterable) {
            yield item;
        }
    } finally {
        clearTimeout(timeout);
    }
}`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'JavaScript Generators and Iterators: A Practical Guide',
    intro: 'JavaScript generators (function*) are special functions that can pause and resume execution using the yield keyword. They enable lazy evaluation, infinite sequences, bidirectional communication, and elegant async patterns. While generators are sometimes overlooked in favor of async/await, they solve problems that promises cannot — including cancelable streams, infinite data sources, and memory-efficient pipelines.',
    basicTitle: 'Generator Basics: function* and yield',
    basicDesc: 'A generator function returns a generator object that implements the Iterator protocol. Each yield pauses execution and returns a value; calling next() resumes it. Generators are lazy — they compute values on demand.',
    twoWayTitle: 'Two-Way Communication: yield as Expression',
    twoWayDesc: 'yield is not just a return statement — it is an expression that receives a value when next(value) is called. This enables stateful coroutines and the classic Redux-Saga pattern.',
    yieldStarTitle: 'yield*: Delegating to Other Iterables',
    yieldStarDesc: 'yield* delegates to another iterable — whether a generator, array, Set, Map, or string. It forwards all values and return values from the inner iterable.',
    asyncTitle: 'Async Generators: Streaming Data',
    asyncDesc: 'Async generators (async function*) combine generators with async/await. They are perfect for streaming APIs — processing data as it arrives rather than waiting for everything to load.',
    realWorldTitle: 'Real-World Patterns',
    realWorldDesc: 'Generators enable lazy pipelines that process only the data needed. Combined with filter(), map(), and take() generators, you can compose data transformations without creating intermediate arrays.',
    comparisonTitle: 'Generators vs Alternatives',
    bestPracticesTitle: 'Best Practices',
    bp1: 'Use generators for lazy sequences and infinite data sources. Use async/await for one-shot async operations that return a single value.',
    bp2: 'Return early from generators with return to set done: true. Any code after return is unreachable. Use try/finally for cleanup when a generator is abandoned.',
    bp3: 'Async generators are ideal for streaming HTTP responses, SSE streams, and WebSocket message processing.',
    bp4: 'Build reusable pipeline helpers (map, filter, take, zip) as generator functions for memory-efficient data transformations.',
    bp5: 'TypeScript: annotate generator return types as Generator\u003cYieldType, ReturnType, NextType\u003e for full type safety.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the difference between a generator and an iterator?',
    faq1a: 'An iterator is any object with a next() method that returns { value, done }. A generator is a function that automatically creates and manages an iterator. All generators are iterators, but not all iterators are generators. Arrays, Sets, Maps, and strings have built-in iterators; you implement custom iterators manually.',
    faq2q: 'Can generators replace async/await?',
    faq2a: 'They once did — before async/await existed, libraries like co() used generators to simulate async code. Today, async/await is simpler for one-shot promises. But async generators shine for streaming: processing data as it arrives, handling SSE, or implementing cancelable operations.',
    faq3q: 'What is the Iterator Protocol?',
    faq3a: 'An object implementing the Iterator Protocol has a next() method returning { value: T, done: boolean }. An Iterable has a [Symbol.iterator]() method returning an iterator. Generator objects implement both. This protocol is what enables for...of, spread, and destructuring to work with any custom data structure.',
    faq4q: 'Are generators good for Redux-Saga?',
    faq4a: 'Yes — Redux-Saga uses generators extensively. Sagas are generator functions that yield effect descriptors (call, put, take, fork). The middleware interprets these effects and handles async execution. This makes side effects testable without mocking — you just check the yielded descriptors.',
    faq5q: 'How do I cancel a generator or async generator?',
    faq5a: 'Call generator.return(value) to force-finish it. For async generators used in for await...of, breaking or returning from the loop calls the generator\'s return() method automatically. Use try/finally inside the generator for cleanup on cancellation. AbortController integrates naturally for fetch-based async generators.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JavaScript 生成器和迭代器：实用指南',
    intro: 'JavaScript 生成器（function*）是可以使用 yield 关键字暂停和恢复执行的特殊函数。它们支持惰性求值、无限序列、双向通信和优雅的异步模式。',
    basicTitle: '生成器基础：function* 和 yield',
    basicDesc: '生成器函数返回一个实现迭代器协议的生成器对象。每个 yield 暂停执行并返回一个值；调用 next() 恢复它。生成器是惰性的——它们按需计算值。',
    twoWayTitle: '双向通信：yield 作为表达式',
    twoWayDesc: 'yield 不仅是 return 语句——它是一个在调用 next(value) 时接收值的表达式。这使得有状态协程和经典 Redux-Saga 模式成为可能。',
    yieldStarTitle: 'yield*：委托给其他可迭代对象',
    yieldStarDesc: 'yield* 委托给另一个可迭代对象——无论是生成器、数组、Set、Map 还是字符串。',
    asyncTitle: '异步生成器：流式数据',
    asyncDesc: '异步生成器（async function*）将生成器与 async/await 结合。非常适合流式 API——数据到达时处理，而不是等待所有内容加载完毕。',
    realWorldTitle: '实际应用场景',
    realWorldDesc: '生成器支持惰性管道，只处理所需的数据。结合 filter()、map() 和 take() 生成器，可以组合数据转换而不创建中间数组。',
    comparisonTitle: '生成器 vs 其他方案',
    bestPracticesTitle: '最佳实践',
    bp1: '对惰性序列和无限数据源使用生成器。对返回单个值的一次性异步操作使用 async/await。',
    bp2: '使用 return 从生成器提前退出以设置 done: true。使用 try/finally 在生成器被放弃时进行清理。',
    bp3: '异步生成器非常适合流式 HTTP 响应、SSE 流和 WebSocket 消息处理。',
    bp4: '将可复用的管道助手（map、filter、take、zip）构建为生成器函数，以实现内存高效的数据转换。',
    bp5: 'TypeScript：用 Generator\u003cYieldType, ReturnType, NextType\u003e 注解生成器返回类型以获得完整类型安全。',
    faqTitle: '常见问题',
    faq1q: '生成器和迭代器有什么区别？',
    faq1a: '迭代器是任何具有返回 { value, done } 的 next() 方法的对象。生成器是自动创建和管理迭代器的函数。所有生成器都是迭代器，但并非所有迭代器都是生成器。',
    faq2q: '生成器可以替代 async/await 吗？',
    faq2a: '曾经可以——在 async/await 出现之前，co() 等库使用生成器模拟异步代码。今天，async/await 对于一次性 Promise 更简单。但异步生成器在流式处理方面很出色。',
    faq3q: '什么是迭代器协议？',
    faq3a: '实现迭代器协议的对象有一个 next() 方法，返回 { value: T, done: boolean }。可迭代对象有一个 [Symbol.iterator]() 方法返回迭代器。生成器对象两者都实现。',
    faq4q: '生成器适合用于 Redux-Saga 吗？',
    faq4a: '是的——Redux-Saga 大量使用生成器。Sagas 是 yield 效果描述符（call、put、take、fork）的生成器函数。',
    faq5q: '如何取消生成器或异步生成器？',
    faq5a: '调用 generator.return(value) 强制结束它。对于在 for await...of 中使用的异步生成器，从循环中 break 或 return 会自动调用生成器的 return() 方法。',
    relatedTitle: '相关工具',
  },
  fr: { title: 'Générateurs et itérateurs JavaScript : guide pratique', intro: 'Les générateurs JavaScript (function*) sont des fonctions qui peuvent être pausées et reprises avec yield.', basicTitle: 'Bases des générateurs : function* et yield', basicDesc: 'Une fonction générateur retourne un objet générateur implémentant le protocole Iterator.', twoWayTitle: 'Communication bidirectionnelle : yield comme expression', twoWayDesc: 'yield n\'est pas seulement un return — c\'est une expression qui reçoit une valeur via next(value).', yieldStarTitle: 'yield* : déléguer à d\'autres itérables', yieldStarDesc: 'yield* délègue à un autre itérable.', asyncTitle: 'Générateurs asynchrones : streaming de données', asyncDesc: 'Les générateurs asynchrones combinent générateurs et async/await pour le streaming.', realWorldTitle: 'Patterns du monde réel', realWorldDesc: 'Les générateurs permettent des pipelines paresseux qui ne traitent que les données nécessaires.', comparisonTitle: 'Générateurs vs alternatives', bestPracticesTitle: 'Bonnes pratiques', bp1: 'Générateurs pour séquences paresseuses et données infinies, async/await pour opérations ponctuelles.', bp2: 'Utiliser return pour terminer tôt, try/finally pour le nettoyage.', bp3: 'Générateurs async parfaits pour streaming HTTP, SSE, WebSocket.', bp4: 'Créer des helpers de pipeline réutilisables (map, filter, take).', bp5: 'TypeScript: typer avec Generator pour la sécurité de type.', faqTitle: 'FAQ', faq1q: 'Différence entre générateur et itérateur ?', faq1a: 'Un itérateur est tout objet avec next(). Un générateur crée et gère automatiquement un itérateur.', faq2q: 'Les générateurs peuvent-ils remplacer async/await ?', faq2a: 'Pour les opérations ponctuelles, non. Pour le streaming, les générateurs async sont supérieurs.', faq3q: 'Qu\'est-ce que le protocole Iterator ?', faq3a: 'Un objet avec next() retournant { value, done }, et [Symbol.iterator]() pour les itérables.', faq4q: 'Générateurs bons pour Redux-Saga ?', faq4a: 'Oui — Redux-Saga les utilise pour les effets testables.', faq5q: 'Comment annuler un générateur ?', faq5a: 'Appeler generator.return(value) ou utiliser break dans for...of.', relatedTitle: 'Outils associés' },
  de: { title: 'JavaScript Generatoren und Iteratoren: Ein praktischer Leitfaden', intro: 'JavaScript-Generatoren (function*) sind spezielle Funktionen, die mit yield pausiert und fortgesetzt werden können.', basicTitle: 'Generator-Grundlagen: function* und yield', basicDesc: 'Eine Generatorfunktion gibt ein Generatorobjekt zurück, das das Iterator-Protokoll implementiert.', twoWayTitle: 'Bidirektionale Kommunikation: yield als Ausdruck', twoWayDesc: 'yield ist nicht nur eine return-Anweisung — es ist ein Ausdruck, der einen Wert via next(value) empfängt.', yieldStarTitle: 'yield*: An andere Iterables delegieren', yieldStarDesc: 'yield* delegiert an ein anderes Iterable.', asyncTitle: 'Async-Generatoren: Streaming von Daten', asyncDesc: 'Async-Generatoren kombinieren Generatoren mit async/await für Streaming.', realWorldTitle: 'Praxismuster', realWorldDesc: 'Generatoren ermöglichen Lazy-Pipelines, die nur die benötigten Daten verarbeiten.', comparisonTitle: 'Generatoren vs. Alternativen', bestPracticesTitle: 'Best Practices', bp1: 'Generatoren für Lazy-Sequenzen und unendliche Datenquellen, async/await für einmalige Async-Operationen.', bp2: 'return für frühzeitigen Abbruch, try/finally für Aufräumarbeiten.', bp3: 'Async-Generatoren ideal für HTTP-Streaming, SSE, WebSocket.', bp4: 'Wiederverwendbare Pipeline-Helfer (map, filter, take) als Generatorfunktionen erstellen.', bp5: 'TypeScript: Rückgabetypen mit Generator typisieren.', faqTitle: 'FAQ', faq1q: 'Unterschied zwischen Generator und Iterator?', faq1a: 'Ein Iterator ist jedes Objekt mit next(). Ein Generator erstellt und verwaltet automatisch einen Iterator.', faq2q: 'Können Generatoren async/await ersetzen?', faq2a: 'Für einmalige Operationen nein. Für Streaming sind Async-Generatoren überlegen.', faq3q: 'Was ist das Iterator-Protokoll?', faq3a: 'Ein Objekt mit next(), das { value, done } zurückgibt, und [Symbol.iterator]() für Iterables.', faq4q: 'Generatoren gut für Redux-Saga?', faq4a: 'Ja — Redux-Saga verwendet sie für testbare Effekte.', faq5q: 'Wie bricht man einen Generator ab?', faq5a: 'generator.return(value) aufrufen oder break in for...of verwenden.', relatedTitle: 'Verwandte Tools' },
  es: { title: 'Generadores e iteradores de JavaScript: guía práctica', intro: 'Los generadores de JavaScript (function*) son funciones especiales que pueden pausarse y reanudarse con yield.', basicTitle: 'Conceptos básicos de generadores: function* y yield', basicDesc: 'Una función generadora devuelve un objeto generador que implementa el protocolo Iterator.', twoWayTitle: 'Comunicación bidireccional: yield como expresión', twoWayDesc: 'yield no es solo return — es una expresión que recibe un valor mediante next(value).', yieldStarTitle: 'yield*: delegar a otros iterables', yieldStarDesc: 'yield* delega a otro iterable.', asyncTitle: 'Generadores asíncronos: streaming de datos', asyncDesc: 'Los generadores asíncronos combinan generadores con async/await para streaming.', realWorldTitle: 'Patrones del mundo real', realWorldDesc: 'Los generadores permiten pipelines perezosas que solo procesan los datos necesarios.', comparisonTitle: 'Generadores vs alternativas', bestPracticesTitle: 'Mejores prácticas', bp1: 'Generadores para secuencias perezosas, async/await para operaciones puntuales.', bp2: 'Usar return para salida temprana, try/finally para limpieza.', bp3: 'Generadores async perfectos para HTTP streaming, SSE, WebSocket.', bp4: 'Crear helpers de pipeline reutilizables (map, filter, take).', bp5: 'TypeScript: anotar con Generator para seguridad de tipos.', faqTitle: 'FAQ', faq1q: '¿Diferencia entre generador e iterador?', faq1a: 'Un iterador es cualquier objeto con next(). Un generador crea y gestiona un iterador automáticamente.', faq2q: '¿Pueden los generadores reemplazar async/await?', faq2a: 'Para operaciones puntuales, no. Para streaming, los generadores async son superiores.', faq3q: '¿Qué es el protocolo Iterator?', faq3a: 'Un objeto con next() que devuelve { value, done }, y [Symbol.iterator]() para iterables.', faq4q: '¿Generadores buenos para Redux-Saga?', faq4a: 'Sí — Redux-Saga los usa para efectos testables.', faq5q: '¿Cómo cancelar un generador?', faq5a: 'Llamar a generator.return(value) o usar break en for...of.', relatedTitle: 'Herramientas relacionadas' },
  ja: { title: 'JavaScriptジェネレーターとイテレーター：実践ガイド', intro: 'JavaScriptジェネレーター（function*）はyieldキーワードで一時停止・再開できる特殊な関数です。', basicTitle: 'ジェネレーターの基本：function*とyield', basicDesc: 'ジェネレーター関数はIteratorプロトコルを実装するジェネレーターオブジェクトを返します。', twoWayTitle: '双方向通信：式としてのyield', twoWayDesc: 'yieldはreturn文だけでなく、next(value)で値を受け取る式でもあります。', yieldStarTitle: 'yield*：他のiterableへの委譲', yieldStarDesc: 'yield*は他のiterable（ジェネレーター、配列など）に委譲します。', asyncTitle: '非同期ジェネレーター：データのストリーミング', asyncDesc: '非同期ジェネレーターはジェネレーターとasync/awaitを組み合わせてストリーミングに使います。', realWorldTitle: '実際のパターン', realWorldDesc: 'ジェネレーターは必要なデータだけを処理するレイジーパイプラインを実現します。', comparisonTitle: 'ジェネレーター vs 代替手段', bestPracticesTitle: 'ベストプラクティス', bp1: 'レイジーシーケンスと無限データにジェネレーター、一回限りの非同期にasync/await。', bp2: 'returnで早期終了、try/finallyでクリーンアップ。', bp3: '非同期ジェネレーターはHTTPストリーミング、SSE、WebSocketに最適。', bp4: '再利用可能なパイプラインヘルパー（map、filter、take）をジェネレーター関数で作成。', bp5: 'TypeScript：Generator型でアノテーション。', faqTitle: 'よくある質問', faq1q: 'ジェネレーターとイテレーターの違いは？', faq1a: 'イテレーターはnext()を持つオブジェクト。ジェネレーターはイテレーターを自動的に作成・管理する関数。', faq2q: 'ジェネレーターはasync/awaitを置き換えられる？', faq2a: '一回限りには不向き。ストリーミングには非同期ジェネレーターが優れる。', faq3q: 'Iteratorプロトコルとは？', faq3a: '{ value, done }を返すnext()を持つオブジェクト、[Symbol.iterator]()を持つIterable。', faq4q: 'ジェネレーターはRedux-Sagaに向いている？', faq4a: 'はい — Redux-Sagaはテスト可能なエフェクトにジェネレーターを使用。', faq5q: 'ジェネレーターをキャンセルするには？', faq5a: 'generator.return(value)を呼ぶか、for...ofでbreakを使う。', relatedTitle: '関連ツール' },
  ko: { title: 'JavaScript 제너레이터와 이터레이터: 실용 가이드', intro: 'JavaScript 제너레이터(function*)는 yield 키워드로 실행을 일시 중지하고 재개할 수 있는 특수 함수입니다.', basicTitle: '제너레이터 기본: function*과 yield', basicDesc: '제너레이터 함수는 Iterator 프로토콜을 구현하는 제너레이터 객체를 반환합니다.', twoWayTitle: '양방향 통신: 표현식으로서의 yield', twoWayDesc: 'yield는 단순한 return이 아니라 next(value)로 값을 받는 표현식입니다.', yieldStarTitle: 'yield*: 다른 iterable에 위임', yieldStarDesc: 'yield*는 다른 iterable(제너레이터, 배열 등)에 위임합니다.', asyncTitle: '비동기 제너레이터: 데이터 스트리밍', asyncDesc: '비동기 제너레이터는 제너레이터와 async/await를 결합하여 스트리밍에 사용합니다.', realWorldTitle: '실제 패턴', realWorldDesc: '제너레이터는 필요한 데이터만 처리하는 지연 파이프라인을 가능하게 합니다.', comparisonTitle: '제너레이터 vs 대안', bestPracticesTitle: '모범 사례', bp1: '지연 시퀀스와 무한 데이터에는 제너레이터, 단발 비동기에는 async/await.', bp2: '조기 종료에는 return, 정리에는 try/finally 사용.', bp3: '비동기 제너레이터는 HTTP 스트리밍, SSE, WebSocket에 이상적.', bp4: '재사용 가능한 파이프라인 헬퍼(map, filter, take)를 제너레이터 함수로 생성.', bp5: 'TypeScript: Generator 타입으로 어노테이션.', faqTitle: '자주 묻는 질문', faq1q: '제너레이터와 이터레이터의 차이는?', faq1a: '이터레이터는 next()를 가진 객체. 제너레이터는 이터레이터를 자동으로 만들고 관리하는 함수.', faq2q: '제너레이터가 async/await를 대체할 수 있나요?', faq2a: '단발 작업에는 아니오. 스트리밍에는 비동기 제너레이터가 우수.', faq3q: 'Iterator 프로토콜이란?', faq3a: '{ value, done }을 반환하는 next()를 가진 객체, [Symbol.iterator]()를 가진 Iterable.', faq4q: '제너레이터는 Redux-Saga에 적합한가요?', faq4a: '네 — Redux-Saga는 테스트 가능한 이펙트에 제너레이터를 사용.', faq5q: '제너레이터를 취소하려면?', faq5a: 'generator.return(value)를 호출하거나 for...of에서 break 사용.', relatedTitle: '관련 도구' },
  pt: { title: 'Geradores e iteradores JavaScript: guia prático', intro: 'Geradores JavaScript (function*) são funções especiais que podem ser pausadas e retomadas com yield.', basicTitle: 'Conceitos básicos de geradores: function* e yield', basicDesc: 'Uma função geradora retorna um objeto gerador que implementa o protocolo Iterator.', twoWayTitle: 'Comunicação bidirecional: yield como expressão', twoWayDesc: 'yield não é apenas return — é uma expressão que recebe um valor via next(value).', yieldStarTitle: 'yield*: delegar para outros iteráveis', yieldStarDesc: 'yield* delega para outro iterável.', asyncTitle: 'Geradores assíncronos: streaming de dados', asyncDesc: 'Geradores assíncronos combinam geradores com async/await para streaming.', realWorldTitle: 'Padrões do mundo real', realWorldDesc: 'Geradores permitem pipelines preguiçosas que processam apenas os dados necessários.', comparisonTitle: 'Geradores vs alternativas', bestPracticesTitle: 'Boas práticas', bp1: 'Geradores para sequências preguiçosas, async/await para operações únicas.', bp2: 'Usar return para saída antecipada, try/finally para limpeza.', bp3: 'Geradores assíncronos perfeitos para HTTP streaming, SSE, WebSocket.', bp4: 'Criar helpers de pipeline reutilizáveis (map, filter, take).', bp5: 'TypeScript: anotar com Generator para segurança de tipos.', faqTitle: 'FAQ', faq1q: 'Diferença entre gerador e iterador?', faq1a: 'Um iterador é qualquer objeto com next(). Um gerador cria e gerencia um iterador automaticamente.', faq2q: 'Geradores podem substituir async/await?', faq2a: 'Para operações únicas, não. Para streaming, geradores assíncronos são superiores.', faq3q: 'O que é o protocolo Iterator?', faq3a: 'Um objeto com next() retornando { value, done }, e [Symbol.iterator]() para iteráveis.', faq4q: 'Geradores são bons para Redux-Saga?', faq4a: 'Sim — Redux-Saga os usa para efeitos testáveis.', faq5q: 'Como cancelar um gerador?', faq5a: 'Chamar generator.return(value) ou usar break em for...of.', relatedTitle: 'Ferramentas relacionadas' },
  it: { title: 'Generatori e iteratori JavaScript: guida pratica', intro: 'I generatori JavaScript (function*) sono funzioni speciali che possono essere messe in pausa e riprese con yield.', basicTitle: 'Basi dei generatori: function* e yield', basicDesc: 'Una funzione generatore restituisce un oggetto generatore che implementa il protocollo Iterator.', twoWayTitle: 'Comunicazione bidirezionale: yield come espressione', twoWayDesc: 'yield non è solo return — è un\'espressione che riceve un valore tramite next(value).', yieldStarTitle: 'yield*: delegare ad altri iterabili', yieldStarDesc: 'yield* delega a un altro iterabile.', asyncTitle: 'Generatori asincroni: streaming di dati', asyncDesc: 'I generatori asincroni combinano generatori e async/await per lo streaming.', realWorldTitle: 'Pattern nel mondo reale', realWorldDesc: 'I generatori consentono pipeline pigre che elaborano solo i dati necessari.', comparisonTitle: 'Generatori vs alternative', bestPracticesTitle: 'Best practice', bp1: 'Generatori per sequenze pigre, async/await per operazioni una tantum.', bp2: 'Usare return per uscita anticipata, try/finally per pulizia.', bp3: 'Generatori asincroni perfetti per HTTP streaming, SSE, WebSocket.', bp4: 'Creare helper di pipeline riutilizzabili (map, filter, take).', bp5: 'TypeScript: annotare con Generator per la sicurezza dei tipi.', faqTitle: 'FAQ', faq1q: 'Differenza tra generatore e iteratore?', faq1a: 'Un iteratore è qualsiasi oggetto con next(). Un generatore crea e gestisce automaticamente un iteratore.', faq2q: 'I generatori possono sostituire async/await?', faq2a: 'Per operazioni una tantum, no. Per streaming, i generatori asincroni sono superiori.', faq3q: 'Cos\'è il protocollo Iterator?', faq3a: 'Un oggetto con next() che restituisce { value, done }, e [Symbol.iterator]() per gli iterabili.', faq4q: 'I generatori sono adatti per Redux-Saga?', faq4a: 'Sì — Redux-Saga li usa per effetti testabili.', faq5q: 'Come annullare un generatore?', faq5a: 'Chiamare generator.return(value) o usare break in for...of.', relatedTitle: 'Strumenti correlati' },
  nl: { title: 'JavaScript generatoren en iteratoren: een praktische gids', intro: 'JavaScript-generatoren (function*) zijn speciale functies die kunnen worden gepauzeerd en hervat met yield.', basicTitle: 'Generator-basisprincipes: function* en yield', basicDesc: 'Een generatorfunctie geeft een generatorobject terug dat het Iterator-protocol implementeert.', twoWayTitle: 'Tweerichtingscommunicatie: yield als uitdrukking', twoWayDesc: 'yield is niet alleen return — het is een uitdrukking die een waarde ontvangt via next(value).', yieldStarTitle: 'yield*: delegeren naar andere iterables', yieldStarDesc: 'yield* delegeert naar een andere iterable.', asyncTitle: 'Async-generatoren: gegevensstreaming', asyncDesc: 'Async-generatoren combineren generatoren met async/await voor streaming.', realWorldTitle: 'Praktijkpatronen', realWorldDesc: 'Generatoren maken lazy pipelines mogelijk die alleen de benodigde gegevens verwerken.', comparisonTitle: 'Generatoren vs alternatieven', bestPracticesTitle: 'Best practices', bp1: 'Generatoren voor lazy sequenties, async/await voor eenmalige operaties.', bp2: 'return gebruiken voor vroeg afbreken, try/finally voor opruiming.', bp3: 'Async-generatoren perfect voor HTTP-streaming, SSE, WebSocket.', bp4: 'Herbruikbare pipeline-helpers (map, filter, take) maken.', bp5: 'TypeScript: annoteren met Generator voor typeveiligheid.', faqTitle: 'Veelgestelde vragen', faq1q: 'Verschil tussen generator en iterator?', faq1a: 'Een iterator is elk object met next(). Een generator maakt en beheert automatisch een iterator.', faq2q: 'Kunnen generatoren async/await vervangen?', faq2a: 'Voor eenmalige operaties niet. Voor streaming zijn async-generatoren superieur.', faq3q: 'Wat is het Iterator-protocol?', faq3a: 'Een object met next() dat { value, done } geeft, en [Symbol.iterator]() voor iterables.', faq4q: 'Generatoren goed voor Redux-Saga?', faq4a: 'Ja — Redux-Saga gebruikt ze voor testbare effecten.', faq5q: 'Hoe een generator annuleren?', faq5a: 'generator.return(value) aanroepen of break gebruiken in for...of.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Generatory i iteratory JavaScript: praktyczny przewodnik', intro: 'Generatory JavaScript (function*) to specjalne funkcje, które mogą być wstrzymywane i wznawiane za pomocą yield.', basicTitle: 'Podstawy generatorów: function* i yield', basicDesc: 'Funkcja generatora zwraca obiekt generatora implementujący protokół Iterator.', twoWayTitle: 'Komunikacja dwukierunkowa: yield jako wyrażenie', twoWayDesc: 'yield to nie tylko return — to wyrażenie, które otrzymuje wartość przez next(value).', yieldStarTitle: 'yield*: delegowanie do innych iterowalnych', yieldStarDesc: 'yield* deleguje do innego iterable.', asyncTitle: 'Generatory asynchroniczne: streaming danych', asyncDesc: 'Generatory asynchroniczne łączą generatory z async/await dla streamingu.', realWorldTitle: 'Wzorce z praktyki', realWorldDesc: 'Generatory umożliwiają leniwe potoki przetwarzające tylko potrzebne dane.', comparisonTitle: 'Generatory vs alternatywy', bestPracticesTitle: 'Najlepsze praktyki', bp1: 'Generatory dla leniwych sekwencji, async/await dla jednorazowych operacji.', bp2: 'Używać return dla wczesnego wyjścia, try/finally dla czyszczenia.', bp3: 'Generatory asynchroniczne idealne dla HTTP streaming, SSE, WebSocket.', bp4: 'Tworzyć wielokrotnego użytku helpery pipeline (map, filter, take).', bp5: 'TypeScript: adnotować typem Generator dla bezpieczeństwa typów.', faqTitle: 'FAQ', faq1q: 'Różnica między generatorem a iteratorem?', faq1a: 'Iterator to każdy obiekt z next(). Generator automatycznie tworzy iterator i nim zarządza.', faq2q: 'Czy generatory mogą zastąpić async/await?', faq2a: 'Dla jednorazowych operacji nie. Do streamingu generatory asynchroniczne są lepsze.', faq3q: 'Co to protokół Iterator?', faq3a: 'Obiekt z next() zwracający { value, done } i [Symbol.iterator]() dla iterable.', faq4q: 'Generatory dobre dla Redux-Saga?', faq4a: 'Tak — Redux-Saga używa ich dla testowalnych efektów.', faq5q: 'Jak anulować generator?', faq5a: 'Wywołać generator.return(value) lub użyć break w for...of.', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'JavaScript generatorer och iteratorer: en praktisk guide', intro: 'JavaScript-generatorer (function*) är speciella funktioner som kan pausas och återupptas med yield.', basicTitle: 'Generator-grunder: function* och yield', basicDesc: 'En generatorfunktion returnerar ett generatorobjekt som implementerar Iterator-protokollet.', twoWayTitle: 'Tvåvägskommunikation: yield som uttryck', twoWayDesc: 'yield är inte bara return — det är ett uttryck som tar emot ett värde via next(value).', yieldStarTitle: 'yield*: delegera till andra iterables', yieldStarDesc: 'yield* delegerar till ett annat iterable.', asyncTitle: 'Async-generatorer: streaming av data', asyncDesc: 'Async-generatorer kombinerar generatorer med async/await för streaming.', realWorldTitle: 'Verkliga mönster', realWorldDesc: 'Generatorer möjliggör lata pipelines som bara bearbetar nödvändig data.', comparisonTitle: 'Generatorer vs alternativ', bestPracticesTitle: 'Bästa praxis', bp1: 'Generatorer för lata sekvenser, async/await för engångsoperationer.', bp2: 'return för tidigt avslut, try/finally för rensning.', bp3: 'Async-generatorer perfekta för HTTP-streaming, SSE, WebSocket.', bp4: 'Skapa återanvändbara pipeline-helpers (map, filter, take).', bp5: 'TypeScript: annotera med Generator för typsäkerhet.', faqTitle: 'Vanliga frågor', faq1q: 'Skillnad mellan generator och iterator?', faq1a: 'En iterator är ett objekt med next(). En generator skapar och hanterar automatiskt en iterator.', faq2q: 'Kan generatorer ersätta async/await?', faq2a: 'För engångsoperationer nej. För streaming är async-generatorer överlägsna.', faq3q: 'Vad är Iterator-protokollet?', faq3a: 'Ett objekt med next() som returnerar { value, done }, och [Symbol.iterator]() för iterables.', faq4q: 'Generatorer bra för Redux-Saga?', faq4a: 'Ja — Redux-Saga använder dem för testbara effekter.', faq5q: 'Hur avbryta en generator?', faq5a: 'Anropa generator.return(value) eller använd break i for...of.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'JavaScript generatorer og iteratorer: en praktisk guide', intro: 'JavaScript-generatorer (function*) er spesielle funksjoner som kan settes på pause og gjenopptas med yield.', basicTitle: 'Generator-grunnlag: function* og yield', basicDesc: 'En generatorfunksjon returnerer et generatorobjekt som implementerer Iterator-protokollen.', twoWayTitle: 'Toveiskommunikasjon: yield som uttrykk', twoWayDesc: 'yield er ikke bare return — det er et uttrykk som mottar en verdi via next(value).', yieldStarTitle: 'yield*: delegere til andre iterables', yieldStarDesc: 'yield* delegerer til et annet iterable.', asyncTitle: 'Async-generatorer: streaming av data', asyncDesc: 'Async-generatorer kombinerer generatorer med async/await for streaming.', realWorldTitle: 'Virkelige mønstre', realWorldDesc: 'Generatorer muliggjør late pipelines som bare behandler nødvendige data.', comparisonTitle: 'Generatorer vs alternativer', bestPracticesTitle: 'Beste praksis', bp1: 'Generatorer for late sekvenser, async/await for enkeltoperasjoner.', bp2: 'return for tidlig avslutning, try/finally for opprydding.', bp3: 'Async-generatorer perfekte for HTTP-streaming, SSE, WebSocket.', bp4: 'Lage gjenbrukbare pipeline-hjelpere (map, filter, take).', bp5: 'TypeScript: annotere med Generator for typesikkerhet.', faqTitle: 'Ofte stilte sp\u00f8rsm\u00e5l', faq1q: 'Forskjell mellom generator og iterator?', faq1a: 'En iterator er ethvert objekt med next(). En generator oppretter og administrerer automatisk en iterator.', faq2q: 'Kan generatorer erstatte async/await?', faq2a: 'For enkeltoperasjoner nei. For streaming er async-generatorer overlegne.', faq3q: 'Hva er Iterator-protokollen?', faq3a: 'Et objekt med next() som returnerer { value, done }, og [Symbol.iterator]() for iterables.', faq4q: 'Generatorer gode for Redux-Saga?', faq4a: 'Ja — Redux-Saga bruker dem for testbare effekter.', faq5q: 'Hvordan avbryte en generator?', faq5a: 'Kalle generator.return(value) eller bruke break i for...of.', relatedTitle: 'Relaterte verkt\u00f8y' },
  id: { title: 'Generator dan Iterator JavaScript: Panduan Praktis', intro: 'Generator JavaScript (function*) adalah fungsi khusus yang dapat dijeda dan dilanjutkan menggunakan kata kunci yield.', basicTitle: 'Dasar Generator: function* dan yield', basicDesc: 'Fungsi generator mengembalikan objek generator yang mengimplementasikan protokol Iterator.', twoWayTitle: 'Komunikasi Dua Arah: yield sebagai Ekspresi', twoWayDesc: 'yield bukan hanya return — ini adalah ekspresi yang menerima nilai melalui next(value).', yieldStarTitle: 'yield*: Mendelegasikan ke Iterables Lain', yieldStarDesc: 'yield* mendelegasikan ke iterable lain.', asyncTitle: 'Generator Asinkron: Streaming Data', asyncDesc: 'Generator asinkron menggabungkan generator dengan async/await untuk streaming.', realWorldTitle: 'Pola Dunia Nyata', realWorldDesc: 'Generator memungkinkan pipeline malas yang hanya memproses data yang diperlukan.', comparisonTitle: 'Generator vs Alternatif', bestPracticesTitle: 'Praktik Terbaik', bp1: 'Gunakan generator untuk urutan malas dan sumber data tak terbatas.', bp2: 'Gunakan return untuk keluar lebih awal, try/finally untuk pembersihan.', bp3: 'Generator asinkron ideal untuk HTTP streaming, SSE, WebSocket.', bp4: 'Buat helper pipeline yang dapat digunakan kembali (map, filter, take).', bp5: 'TypeScript: anotasi dengan Generator untuk keamanan tipe.', faqTitle: 'Pertanyaan yang Sering Diajukan', faq1q: 'Perbedaan antara generator dan iterator?', faq1a: 'Iterator adalah objek apa pun dengan next(). Generator membuat dan mengelola iterator secara otomatis.', faq2q: 'Bisakah generator menggantikan async/await?', faq2a: 'Untuk operasi sekali jalan, tidak. Untuk streaming, generator asinkron lebih unggul.', faq3q: 'Apa itu Protokol Iterator?', faq3a: 'Objek dengan next() yang mengembalikan { value, done }, dan [Symbol.iterator]() untuk iterable.', faq4q: 'Generator bagus untuk Redux-Saga?', faq4a: 'Ya — Redux-Saga menggunakannya untuk efek yang dapat diuji.', faq5q: 'Bagaimana membatalkan generator?', faq5a: 'Panggil generator.return(value) atau gunakan break dalam for...of.', relatedTitle: 'Alat Terkait' },
  th: { title: 'JavaScript Generators และ Iterators: คู่มือปฏิบัติ', intro: 'JavaScript generators (function*) คือฟังก์ชันพิเศษที่สามารถหยุดชั่วคราวและดำเนินการต่อได้โดยใช้ yield', basicTitle: 'พื้นฐาน Generator: function* และ yield', basicDesc: 'ฟังก์ชัน generator ส่งคืน generator object ที่ implements Iterator protocol', twoWayTitle: 'การสื่อสารสองทาง: yield เป็น Expression', twoWayDesc: 'yield ไม่ใช่แค่ return มันเป็น expression ที่รับค่าผ่าน next(value)', yieldStarTitle: 'yield*: การมอบหมายให้ Iterables อื่น', yieldStarDesc: 'yield* มอบหมายให้ iterable อื่น', asyncTitle: 'Async Generators: การ Streaming ข้อมูล', asyncDesc: 'Async generators รวม generators กับ async/await สำหรับการ streaming', realWorldTitle: 'รูปแบบในโลกจริง', realWorldDesc: 'Generators ช่วยให้สร้าง lazy pipelines ที่ประมวลผลเฉพาะข้อมูลที่จำเป็น', comparisonTitle: 'Generators vs ทางเลือก', bestPracticesTitle: 'แนวปฏิบัติที่ดีที่สุด', bp1: 'ใช้ generators สำหรับ lazy sequences async/await สำหรับ async ครั้งเดียว', bp2: 'ใช้ return สำหรับออกก่อน try/finally สำหรับ cleanup', bp3: 'Async generators เหมาะกับ HTTP streaming, SSE, WebSocket', bp4: 'สร้าง pipeline helpers ที่ใช้ซ้ำได้ (map, filter, take)', bp5: 'TypeScript: annotate ด้วย Generator type', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'Generator กับ Iterator ต่างกันอย่างไร?', faq1a: 'Iterator คือ object ที่มี next() Generator คือฟังก์ชันที่สร้างและจัดการ iterator อัตโนมัติ', faq2q: 'Generators สามารถแทนที่ async/await ได้ไหม?', faq2a: 'สำหรับ operation ครั้งเดียว ไม่ได้ สำหรับ streaming async generators ดีกว่า', faq3q: 'Iterator Protocol คืออะไร?', faq3a: 'Object ที่มี next() คืน { value, done } และ [Symbol.iterator]() สำหรับ iterable', faq4q: 'Generators เหมาะกับ Redux-Saga ไหม?', faq4a: 'ใช่ Redux-Saga ใช้สำหรับ effects ที่ test ได้', faq5q: 'จะยกเลิก generator ได้อย่างไร?', faq5a: 'เรียก generator.return(value) หรือใช้ break ใน for...of', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

export default function JavascriptGeneratorsGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

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

  const compRows = [
    { feature: 'Infinite sequences', gen: 'Perfect', asyncAwait: 'No', promise: 'No', observable: 'Yes' },
    { feature: 'Lazy evaluation', gen: 'Yes (pull-based)', asyncAwait: 'No', promise: 'No', observable: 'Yes (push)' },
    { feature: 'Backpressure', gen: 'Natural (pull)', asyncAwait: 'No', promise: 'No', observable: 'Yes' },
    { feature: 'Streaming async', gen: 'async function*', asyncAwait: 'No', promise: 'No', observable: 'Yes (RxJS)' },
    { feature: 'Two-way comms', gen: 'yield expression', asyncAwait: 'No', promise: 'No', observable: 'No' },
    { feature: 'Browser support', gen: 'ES2015+ (all)', asyncAwait: 'ES2017+', promise: 'ES2015+', observable: 'Requires RxJS' },
  ];

  const preStyle: React.CSSProperties = { background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <h2>{t.basicTitle}</h2>
      <p>{t.basicDesc}</p>
      <pre style={preStyle}><code>{codeBasicGenerator}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.twoWayTitle}</h2>
      <p>{t.twoWayDesc}</p>
      <pre style={preStyle}><code>{codeTwoWay}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.yieldStarTitle}</h2>
      <p>{t.yieldStarDesc}</p>
      <pre style={preStyle}><code>{codeYieldStar}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.asyncTitle}</h2>
      <p>{t.asyncDesc}</p>
      <pre style={preStyle}><code>{codeAsyncGenerator}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.realWorldTitle}</h2>
      <p>{t.realWorldDesc}</p>
      <pre style={preStyle}><code>{codeRealWorld}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.comparisonTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {['Feature', 'Generator', 'async/await', 'Promise', 'Observable'].map(h => (
                <th key={h} style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontWeight: 500 }}>{row.feature}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', color: row.gen === 'Perfect' || row.gen.startsWith('Yes') ? '#38a169' : undefined }}>{row.gen}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.asyncAwait}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.promise}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.observable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.bestPracticesTitle}</h2>
      <ul style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
      </ul>

      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[[t.faq1q, t.faq1a],[t.faq2q, t.faq2a],[t.faq3q, t.faq3a],[t.faq4q, t.faq4a],[t.faq5q, t.faq5a]].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #48bb78' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><a href="/en/tools/regex-tester" style={{ color: '#3182ce' }}>Regex Tester</a></li>
          <li><a href="/en/tools/json-formatter" style={{ color: '#3182ce' }}>JSON Formatter</a></li>
          <li><a href="/en/tools/jwt-decoder" style={{ color: '#3182ce' }}>JWT Decoder</a></li>
        </ul>
      </div>
    </article>
  );
}
