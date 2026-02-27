'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'RxJS Complete Guide: Reactive Programming for JavaScript',
    description: 'Master RxJS reactive programming with Observables, Subjects, operators (map, switchMap, mergeMap, debounceTime), error handling, multicasting, schedulers, marble testing, Angular and React integration, and common patterns like typeahead search, polling, and retry with backoff.',
  },
  zh: {
    title: 'RxJS 完全指南：JavaScript 响应式编程',
    description: '掌握 RxJS 响应式编程，包括 Observable、Subject、操作符（map、switchMap、mergeMap、debounceTime）、错误处理、多播、调度器、弹珠测试、Angular 和 React 集成以及常见模式。',
  },
};

export default function RxjsGuide({ lang }: { lang: string }) {
  const t = (translations[lang] || translations.en);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is RxJS and why should I use it?', acceptedAnswer: { '@type': 'Answer', text: 'RxJS (Reactive Extensions for JavaScript) is a library for composing asynchronous and event-based programs using Observable sequences. It provides powerful operators to transform, combine, and manage data streams. Use it when dealing with complex async workflows, real-time data, event coordination, or when you need cancellation and backpressure support that Promises cannot provide.' } },
      { '@type': 'Question', name: 'What is the difference between an Observable and a Promise?', acceptedAnswer: { '@type': 'Answer', text: 'A Promise emits a single value and is eagerly executed — it starts immediately upon creation. An Observable can emit zero, one, or many values over time and is lazy — it only executes when subscribed to. Observables also support cancellation via unsubscribe(), while Promises cannot be cancelled once started.' } },
      { '@type': 'Question', name: 'When should I use switchMap vs mergeMap vs concatMap?', acceptedAnswer: { '@type': 'Answer', text: 'Use switchMap when you only care about the latest inner Observable (typeahead search, route changes). Use mergeMap when you want all inner Observables to run concurrently (parallel HTTP requests). Use concatMap when order matters and you want inner Observables to execute sequentially (file uploads, ordered API calls).' } },
      { '@type': 'Question', name: 'How do I prevent memory leaks with RxJS subscriptions?', acceptedAnswer: { '@type': 'Answer', text: 'Always unsubscribe from long-lived Observables. In Angular use the async pipe or takeUntilDestroyed(). In React, unsubscribe in the useEffect cleanup function. You can also use operators like take(n), takeUntil(), first(), or takeWhile() to auto-complete subscriptions.' } },
      { '@type': 'Question', name: 'What is a Subject in RxJS and when should I use it?', acceptedAnswer: { '@type': 'Answer', text: 'A Subject is both an Observable and an Observer — it can multicast values to multiple subscribers and accept values via next(). Use Subject for event buses, BehaviorSubject when you need an initial/current value, ReplaySubject to replay past emissions to late subscribers, and AsyncSubject when you only want the last value before completion.' } },
      { '@type': 'Question', name: 'How does error handling work in RxJS?', acceptedAnswer: { '@type': 'Answer', text: 'Use the catchError operator in a pipe to intercept errors and return a fallback Observable. The retry operator re-subscribes to the source on error. For conditional retry logic, use retry({ count, delay }) with exponential backoff. Errors terminate the Observable by default unless caught.' } },
      { '@type': 'Question', name: 'What are marble diagrams and how do I test with them?', acceptedAnswer: { '@type': 'Answer', text: 'Marble diagrams are a visual syntax for representing Observable sequences over time. In testing, you use the TestScheduler from rxjs/testing to create hot and cold Observables using marble strings like "--a--b--c|" where dashes are time frames, letters are emissions, and "|" is completion. This enables deterministic, synchronous testing of async streams.' } },
      { '@type': 'Question', name: 'Can I use RxJS with React or is it only for Angular?', acceptedAnswer: { '@type': 'Answer', text: 'RxJS works with any JavaScript framework or vanilla JS. While Angular has built-in RxJS integration through HttpClient and reactive forms, you can use RxJS in React with custom hooks, in Vue with composition API, in Node.js for stream processing, or in plain browser code for DOM event handling.' } },
    ],
  };

  const cs = { backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' as const, fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' };
  const h2s = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#0f172a' };
  const h3s = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem', color: '#1e293b' };
  const ps = { marginBottom: '1rem', lineHeight: '1.75' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1rem 1.25rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0, lineHeight: '1.7' }}>
          RxJS is the go-to library for reactive programming in JavaScript. It models everything as Observable streams that you transform with composable operators like map, filter, switchMap, and debounceTime. Observables are lazy (unlike Promises), support multiple emissions, and can be cancelled. This guide covers creating Observables, all four Subject types, 15+ essential operators, error handling, multicasting, schedulers, marble-diagram testing, Angular and React integration, and real-world patterns like typeahead search, polling, and retry with exponential backoff.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem', marginBottom: '2rem', borderRadius: '0.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#334155' }}>Key Takeaways</p>
        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>Observables are lazy, cancellable streams that emit zero to many values over time, unlike Promises which are eager and single-value.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>Operators like switchMap, mergeMap, and concatMap solve different concurrency scenarios; choosing the right one prevents bugs.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>BehaviorSubject, ReplaySubject, and AsyncSubject each serve distinct multicasting patterns beyond the base Subject.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>catchError and retry operators provide robust, composable error-handling pipelines.</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>Always unsubscribe from long-lived Observables to prevent memory leaks; use takeUntil, async pipe (Angular), or useEffect cleanup (React).</li>
          <li style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>Marble-diagram testing with TestScheduler enables deterministic, synchronous testing of async streams.</li>
        </ul>
      </div>

      {/* 1. What Is RxJS & Reactive Programming */}
      <h2 style={h2s}>1. What Is RxJS and Reactive Programming?</h2>
      <p style={ps}>
        RxJS (Reactive Extensions for JavaScript) is a library for composing asynchronous and event-based programs using Observable sequences. Reactive programming is a paradigm that treats data as streams that flow through transformation pipelines. Instead of imperatively pulling data, you declaratively describe how data should be transformed as it arrives.
      </p>
      <p style={ps}>
        Think of a spreadsheet: when you change cell A1, every formula referencing A1 updates automatically. RxJS brings this model to JavaScript. DOM events, HTTP responses, WebSocket messages, timers, and any async source become streams you can filter, combine, and transform with a consistent API.
      </p>
      <pre style={cs}><code>{'import { fromEvent } from \'rxjs\';\n' +
        'import { map, filter, debounceTime } from \'rxjs/operators\';\n' +
        '\n' +
        '// Reactive: declare the data pipeline\n' +
        'const clicks$ = fromEvent(document, \'click\').pipe(\n' +
        '  debounceTime(300),\n' +
        '  map(event => ({ x: event.clientX, y: event.clientY })),\n' +
        '  filter(pos => pos.x > 100)\n' +
        ');\n' +
        '\n' +
        '// Subscribe to start receiving values\n' +
        'clicks$.subscribe(pos => console.log(pos));'}</code></pre>

      {/* 2. Observables vs Promises */}
      <h2 style={h2s}>2. Observables vs Promises</h2>
      <p style={ps}>
        Both Observables and Promises handle asynchronous values, but they differ fundamentally. Understanding these differences is critical for choosing the right tool.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Feature</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Promise</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Observable</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Emissions', 'Single value', 'Zero to many values'],
              ['Execution', 'Eager (starts immediately)', 'Lazy (starts on subscribe)'],
              ['Cancellation', 'Not cancellable', 'Unsubscribe to cancel'],
              ['Operators', 'Limited (.then, .catch, .finally)', '100+ composable operators'],
              ['Multicasting', 'Shared by default', 'Unicast by default, multicast via Subjects'],
              ['Error handling', '.catch() or try/await', 'catchError, retry, retryWhen operators'],
              ['Async/await', 'Native support', 'Use firstValueFrom() or lastValueFrom()'],
            ].map(([feature, promise, obs], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontWeight: 600 }}>{feature}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>{promise}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>{obs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <pre style={cs}><code>{'// Promise: eager, single value\n' +
        'const promise = fetch(\'/api/data\'); // starts immediately\n' +
        '\n' +
        '// Observable: lazy, multiple values\n' +
        'import { interval } from \'rxjs\';\n' +
        'const obs$ = interval(1000); // does nothing until subscribed\n' +
        'const sub = obs$.subscribe(n => console.log(n)); // 0, 1, 2, ...\n' +
        'sub.unsubscribe(); // cancels the stream'}</code></pre>

      {/* 3. Creating Observables */}
      <h2 style={h2s}>3. Creating Observables</h2>
      <p style={ps}>
        RxJS provides many creation functions. Each wraps a different source into an Observable stream.
      </p>

      <h3 style={h3s}>of and from</h3>
      <pre style={cs}><code>{'import { of, from } from \'rxjs\';\n' +
        '\n' +
        '// of: emit each argument as a separate value\n' +
        'of(1, 2, 3).subscribe(v => console.log(v));\n' +
        '// Output: 1, 2, 3\n' +
        '\n' +
        '// from: convert iterable, array, or Promise to Observable\n' +
        'from([10, 20, 30]).subscribe(v => console.log(v));\n' +
        '// Output: 10, 20, 30\n' +
        '\n' +
        '// from with Promise\n' +
        'from(fetch(\'/api/users\').then(r => r.json()))\n' +
        '  .subscribe(data => console.log(data));\n' +
        '\n' +
        '// from with iterable (generator)\n' +
        'function* gen() { yield 1; yield 2; yield 3; }\n' +
        'from(gen()).subscribe(v => console.log(v));'}</code></pre>

      <h3 style={h3s}>interval and timer</h3>
      <pre style={cs}><code>{'import { interval, timer } from \'rxjs\';\n' +
        'import { take } from \'rxjs/operators\';\n' +
        '\n' +
        '// interval: emit 0, 1, 2, ... every N ms\n' +
        'interval(1000).pipe(take(5))\n' +
        '  .subscribe(n => console.log(n));\n' +
        '// Output: 0, 1, 2, 3, 4 (one per second)\n' +
        '\n' +
        '// timer: wait, then optionally repeat\n' +
        'timer(2000).subscribe(() => console.log(\'2s delay\'));\n' +
        '\n' +
        '// timer with period: wait 1s, then emit every 500ms\n' +
        'timer(1000, 500).pipe(take(4))\n' +
        '  .subscribe(n => console.log(n));\n' +
        '// Output: 0 (at 1s), 1 (at 1.5s), 2 (at 2s), 3 (at 2.5s)'}</code></pre>

      <h3 style={h3s}>fromEvent</h3>
      <pre style={cs}><code>{'import { fromEvent } from \'rxjs\';\n' +
        'import { map, throttleTime } from \'rxjs/operators\';\n' +
        '\n' +
        '// DOM click events\n' +
        'const clicks$ = fromEvent(document, \'click\').pipe(\n' +
        '  throttleTime(1000),\n' +
        '  map(e => ({ x: e.clientX, y: e.clientY }))\n' +
        ');\n' +
        'clicks$.subscribe(pos => console.log(pos));\n' +
        '\n' +
        '// Keyboard events\n' +
        'const keys$ = fromEvent<KeyboardEvent>(document, \'keydown\').pipe(\n' +
        '  map(e => e.key)\n' +
        ');\n' +
        'keys$.subscribe(key => console.log(\'Pressed:\', key));'}</code></pre>

      <h3 style={h3s}>Custom Observable with new Observable()</h3>
      <pre style={cs}><code>{'import { Observable } from \'rxjs\';\n' +
        '\n' +
        'const custom$ = new Observable(subscriber => {\n' +
        '  subscriber.next(\'Hello\');\n' +
        '  subscriber.next(\'World\');\n' +
        '\n' +
        '  const id = setTimeout(() => {\n' +
        '    subscriber.next(\'Async value\');\n' +
        '    subscriber.complete();\n' +
        '  }, 1000);\n' +
        '\n' +
        '  // Teardown logic (called on unsubscribe)\n' +
        '  return () => clearTimeout(id);\n' +
        '});\n' +
        '\n' +
        'custom$.subscribe({\n' +
        '  next: val => console.log(val),\n' +
        '  error: err => console.error(err),\n' +
        '  complete: () => console.log(\'Done\')\n' +
        '});'}</code></pre>

      {/* 4. Subjects */}
      <h2 style={h2s}>4. Subjects: Subject, BehaviorSubject, ReplaySubject, AsyncSubject</h2>
      <p style={ps}>
        A Subject is both an Observable and an Observer. It multicasts values to all subscribers. RxJS provides four types, each suited to different scenarios.
      </p>

      <h3 style={h3s}>Subject</h3>
      <p style={ps}>A plain Subject multicasts to current subscribers. Late subscribers miss previous emissions.</p>
      <pre style={cs}><code>{'import { Subject } from \'rxjs\';\n' +
        '\n' +
        'const subject = new Subject<number>();\n' +
        '\n' +
        'subject.subscribe(v => console.log(\'A:\', v));\n' +
        'subject.next(1); // A: 1\n' +
        'subject.next(2); // A: 2\n' +
        '\n' +
        'subject.subscribe(v => console.log(\'B:\', v));\n' +
        'subject.next(3); // A: 3, B: 3  (B missed 1 and 2)'}</code></pre>

      <h3 style={h3s}>BehaviorSubject</h3>
      <p style={ps}>Requires an initial value and immediately emits the current value to new subscribers.</p>
      <pre style={cs}><code>{'import { BehaviorSubject } from \'rxjs\';\n' +
        '\n' +
        'const state$ = new BehaviorSubject<string>(\'initial\');\n' +
        '\n' +
        'state$.subscribe(v => console.log(\'A:\', v)); // A: initial\n' +
        'state$.next(\'updated\'); // A: updated\n' +
        '\n' +
        'state$.subscribe(v => console.log(\'B:\', v)); // B: updated\n' +
        'console.log(\'Current:\', state$.getValue()); // Current: updated'}</code></pre>

      <h3 style={h3s}>ReplaySubject</h3>
      <p style={ps}>Replays a specified number of past emissions to new subscribers.</p>
      <pre style={cs}><code>{'import { ReplaySubject } from \'rxjs\';\n' +
        '\n' +
        'const replay$ = new ReplaySubject<number>(2); // buffer last 2\n' +
        '\n' +
        'replay$.next(1);\n' +
        'replay$.next(2);\n' +
        'replay$.next(3);\n' +
        '\n' +
        '// Late subscriber receives 2 and 3 (last 2 values)\n' +
        'replay$.subscribe(v => console.log(v)); // 2, 3\n' +
        '\n' +
        '// Time-bounded replay: buffer values from last 500ms\n' +
        'const timed$ = new ReplaySubject<number>(Infinity, 500);'}</code></pre>

      <h3 style={h3s}>AsyncSubject</h3>
      <p style={ps}>Only emits the last value, and only when complete() is called.</p>
      <pre style={cs}><code>{'import { AsyncSubject } from \'rxjs\';\n' +
        '\n' +
        'const async$ = new AsyncSubject<number>();\n' +
        'async$.subscribe(v => console.log(v));\n' +
        '\n' +
        'async$.next(1); // nothing yet\n' +
        'async$.next(2); // nothing yet\n' +
        'async$.next(3); // nothing yet\n' +
        'async$.complete(); // Output: 3 (only the last value)'}</code></pre>

      {/* 5. Essential Operators */}
      <h2 style={h2s}>5. Essential Operators</h2>
      <p style={ps}>
        Operators are the building blocks of RxJS pipelines. They transform, filter, combine, and manage Observable streams. Here are the most important ones.
      </p>

      <h3 style={h3s}>Transformation: map, scan, reduce</h3>
      <pre style={cs}><code>{'import { of } from \'rxjs\';\n' +
        'import { map, scan, reduce } from \'rxjs/operators\';\n' +
        '\n' +
        '// map: transform each value\n' +
        'of(1, 2, 3).pipe(\n' +
        '  map(x => x * 10)\n' +
        ').subscribe(v => console.log(v)); // 10, 20, 30\n' +
        '\n' +
        '// scan: accumulate (emits each intermediate result)\n' +
        'of(1, 2, 3, 4, 5).pipe(\n' +
        '  scan((acc, val) => acc + val, 0)\n' +
        ').subscribe(v => console.log(v)); // 1, 3, 6, 10, 15\n' +
        '\n' +
        '// reduce: accumulate (emits only final result)\n' +
        'of(1, 2, 3, 4, 5).pipe(\n' +
        '  reduce((acc, val) => acc + val, 0)\n' +
        ').subscribe(v => console.log(v)); // 15'}</code></pre>

      <h3 style={h3s}>Filtering: filter, distinctUntilChanged, debounceTime</h3>
      <pre style={cs}><code>{'import { from, fromEvent } from \'rxjs\';\n' +
        'import { filter, distinctUntilChanged, debounceTime, map } from \'rxjs/operators\';\n' +
        '\n' +
        '// filter: pass values meeting a condition\n' +
        'from([1, 2, 3, 4, 5, 6]).pipe(\n' +
        '  filter(x => x % 2 === 0)\n' +
        ').subscribe(v => console.log(v)); // 2, 4, 6\n' +
        '\n' +
        '// distinctUntilChanged: skip consecutive duplicates\n' +
        'from([1, 1, 2, 2, 3, 1]).pipe(\n' +
        '  distinctUntilChanged()\n' +
        ').subscribe(v => console.log(v)); // 1, 2, 3, 1\n' +
        '\n' +
        '// debounceTime: wait for silence, then emit latest\n' +
        'fromEvent(input, \'input\').pipe(\n' +
        '  map(e => e.target.value),\n' +
        '  debounceTime(300),\n' +
        '  distinctUntilChanged()\n' +
        ').subscribe(term => search(term));'}</code></pre>

      <h3 style={h3s}>Flattening: switchMap, mergeMap, concatMap, exhaustMap</h3>
      <p style={ps}>
        These are the most important operators to understand. Each handles inner Observables differently.
      </p>
      <pre style={cs}><code>{'import { fromEvent, interval } from \'rxjs\';\n' +
        'import { switchMap, mergeMap, concatMap, exhaustMap, take } from \'rxjs/operators\';\n' +
        '\n' +
        '// switchMap: cancel previous inner, keep only latest\n' +
        '// Best for: typeahead search, route changes\n' +
        'searchInput$.pipe(\n' +
        '  switchMap(term => http.get(\'/search?q=\' + term))\n' +
        '  // If user types fast, previous requests are cancelled\n' +
        ');\n' +
        '\n' +
        '// mergeMap: run all inner Observables concurrently\n' +
        '// Best for: parallel HTTP requests, logging\n' +
        'fileList$.pipe(\n' +
        '  mergeMap(file => uploadFile(file), 3) // max 3 concurrent\n' +
        ');\n' +
        '\n' +
        '// concatMap: queue inner Observables, run sequentially\n' +
        '// Best for: ordered operations, sequential writes\n' +
        'actions$.pipe(\n' +
        '  concatMap(action => saveToDatabase(action))\n' +
        '  // Each save completes before the next starts\n' +
        ');\n' +
        '\n' +
        '// exhaustMap: ignore new emissions while inner is active\n' +
        '// Best for: login buttons, form submissions\n' +
        'loginBtn$.pipe(\n' +
        '  exhaustMap(() => http.post(\'/login\', credentials))\n' +
        '  // Rapid clicks are ignored until request completes\n' +
        ');'}</code></pre>

      <h3 style={h3s}>Utility: tap, take, takeUntil</h3>
      <pre style={cs}><code>{'import { interval, Subject } from \'rxjs\';\n' +
        'import { tap, take, takeUntil } from \'rxjs/operators\';\n' +
        '\n' +
        '// tap: side effects without modifying the stream\n' +
        'source$.pipe(\n' +
        '  tap(v => console.log(\'Before:\', v)),\n' +
        '  map(v => v * 2),\n' +
        '  tap(v => console.log(\'After:\', v))\n' +
        ');\n' +
        '\n' +
        '// take: emit only the first N values\n' +
        'interval(1000).pipe(take(3))\n' +
        '  .subscribe(v => console.log(v)); // 0, 1, 2, then completes\n' +
        '\n' +
        '// takeUntil: emit until notifier Observable emits\n' +
        'const destroy$ = new Subject<void>();\n' +
        'interval(100).pipe(\n' +
        '  takeUntil(destroy$)\n' +
        ').subscribe(v => console.log(v));\n' +
        '\n' +
        '// Later: stop the stream\n' +
        'destroy$.next();\n' +
        'destroy$.complete();'}</code></pre>

      {/* 6. Piping & Composition */}
      <h2 style={h2s}>6. Piping and Composition</h2>
      <p style={ps}>
        The pipe() method chains operators into transformation pipelines. You can also create reusable custom operators.
      </p>
      <pre style={cs}><code>{'import { pipe } from \'rxjs\';\n' +
        'import { filter, map, tap } from \'rxjs/operators\';\n' +
        '\n' +
        '// Basic piping\n' +
        'source$.pipe(\n' +
        '  filter(x => x > 0),\n' +
        '  map(x => x * 2),\n' +
        '  tap(x => console.log(x))\n' +
        ');\n' +
        '\n' +
        '// Custom reusable operator\n' +
        'function multiplyPositive(factor: number) {\n' +
        '  return pipe(\n' +
        '    filter((x: number) => x > 0),\n' +
        '    map((x: number) => x * factor)\n' +
        '  );\n' +
        '}\n' +
        '\n' +
        '// Usage\n' +
        'of(-1, 2, -3, 4).pipe(\n' +
        '  multiplyPositive(10)\n' +
        ').subscribe(v => console.log(v)); // 20, 40\n' +
        '\n' +
        '// Combining multiple streams\n' +
        'import { combineLatest, merge, forkJoin, zip } from \'rxjs\';\n' +
        '\n' +
        '// combineLatest: emit when any source emits\n' +
        'combineLatest([obs1$, obs2$]).subscribe(([a, b]) => {});\n' +
        '\n' +
        '// forkJoin: wait for all to complete, emit last values\n' +
        'forkJoin([http1$, http2$]).subscribe(([res1, res2]) => {});\n' +
        '\n' +
        '// merge: combine outputs into single stream\n' +
        'merge(clicks$, keys$, timer$).subscribe(event => {});'}</code></pre>

      {/* 7. Error Handling */}
      <h2 style={h2s}>7. Error Handling</h2>
      <p style={ps}>
        Errors in RxJS terminate the Observable stream by default. The catchError and retry operators provide composable error recovery.
      </p>
      <pre style={cs}><code>{'import { of, throwError, timer } from \'rxjs\';\n' +
        'import { catchError, retry, tap, switchMap } from \'rxjs/operators\';\n' +
        '\n' +
        '// catchError: intercept and recover from errors\n' +
        'http.get(\'/api/data\').pipe(\n' +
        '  catchError(err => {\n' +
        '    console.error(\'Request failed:\', err);\n' +
        '    return of({ data: [], fallback: true }); // return fallback\n' +
        '  })\n' +
        ');\n' +
        '\n' +
        '// retry: re-subscribe N times on error\n' +
        'http.get(\'/api/data\').pipe(\n' +
        '  retry(3), // retry up to 3 times\n' +
        '  catchError(err => of({ error: \'All retries failed\' }))\n' +
        ');\n' +
        '\n' +
        '// retry with delay (exponential backoff)\n' +
        'http.get(\'/api/data\').pipe(\n' +
        '  retry({\n' +
        '    count: 3,\n' +
        '    delay: (error, retryCount) => {\n' +
        '      const delayMs = Math.pow(2, retryCount) * 1000;\n' +
        '      console.log(\'Retry \' + retryCount + \' in \' + delayMs + \'ms\');\n' +
        '      return timer(delayMs);\n' +
        '    }\n' +
        '  }),\n' +
        '  catchError(err => of({ error: \'Final failure\' }))\n' +
        ');\n' +
        '\n' +
        '// Error in inner Observable (switchMap)\n' +
        'clicks$.pipe(\n' +
        '  switchMap(() =>\n' +
        '    http.get(\'/api/data\').pipe(\n' +
        '      catchError(err => of(null)) // catch inside inner\n' +
        '    )\n' +
        '  )\n' +
        ');'}</code></pre>

      {/* 8. Multicasting */}
      <h2 style={h2s}>8. Multicasting</h2>
      <p style={ps}>
        By default, each subscription to an Observable creates a new execution. Multicasting shares a single execution across subscribers using share, shareReplay, or Subjects.
      </p>
      <pre style={cs}><code>{'import { interval } from \'rxjs\';\n' +
        'import { share, shareReplay, take } from \'rxjs/operators\';\n' +
        '\n' +
        '// Without sharing: each subscriber gets its own stream\n' +
        'const cold$ = interval(1000).pipe(take(3));\n' +
        'cold$.subscribe(v => console.log(\'A:\', v)); // own timer\n' +
        'cold$.subscribe(v => console.log(\'B:\', v)); // different timer\n' +
        '\n' +
        '// share(): multicast to current subscribers\n' +
        'const shared$ = interval(1000).pipe(\n' +
        '  take(3),\n' +
        '  share()\n' +
        ');\n' +
        'shared$.subscribe(v => console.log(\'A:\', v));\n' +
        'shared$.subscribe(v => console.log(\'B:\', v));\n' +
        '// Both see the same values at the same time\n' +
        '\n' +
        '// shareReplay(1): cache and replay latest to late subscribers\n' +
        'const data$ = http.get(\'/api/config\').pipe(\n' +
        '  shareReplay(1) // cache the response\n' +
        ');\n' +
        '// First subscriber triggers the HTTP call\n' +
        'data$.subscribe(config => renderHeader(config));\n' +
        '// Second subscriber reuses the cached response\n' +
        'data$.subscribe(config => renderFooter(config));'}</code></pre>

      {/* 9. Schedulers */}
      <h2 style={h2s}>9. Schedulers</h2>
      <p style={ps}>
        Schedulers control when and where Observable emissions happen. They are rarely used directly, but understanding them is essential for testing and performance tuning.
      </p>
      <pre style={cs}><code>{'import { of, asyncScheduler, asapScheduler, queueScheduler } from \'rxjs\';\n' +
        'import { observeOn, subscribeOn } from \'rxjs/operators\';\n' +
        '\n' +
        '// asyncScheduler: uses setTimeout (macrotask)\n' +
        'console.log(\'Before\');\n' +
        'of(1, 2, 3).pipe(\n' +
        '  observeOn(asyncScheduler)\n' +
        ').subscribe(v => console.log(v));\n' +
        'console.log(\'After\');\n' +
        '// Output: Before, After, 1, 2, 3\n' +
        '\n' +
        '// asapScheduler: uses Promise.resolve (microtask)\n' +
        '// Executes before setTimeout but after current synchronous code\n' +
        '\n' +
        '// queueScheduler: synchronous, but uses a queue to prevent recursion\n' +
        '\n' +
        '// subscribeOn: changes when subscribe() starts execution\n' +
        'source$.pipe(\n' +
        '  subscribeOn(asyncScheduler) // defer subscription to next macrotask\n' +
        ');\n' +
        '\n' +
        '// observeOn: changes when notifications are delivered\n' +
        'source$.pipe(\n' +
        '  observeOn(asyncScheduler) // deliver values asynchronously\n' +
        ');'}</code></pre>

      {/* 10. Testing with Marble Diagrams */}
      <h2 style={h2s}>10. Testing with Marble Diagrams</h2>
      <p style={ps}>
        Marble diagrams visually represent Observable timelines. The TestScheduler lets you write deterministic tests for async streams.
      </p>
      <pre style={cs}><code>{'// Marble syntax:\n' +
        '// -     = one frame of time (10ms by default)\n' +
        '// a-z   = emitted value\n' +
        '// |     = complete\n' +
        '// #     = error\n' +
        '// ()    = synchronous grouping\n' +
        '// ^     = subscription point (hot only)\n' +
        '// !     = unsubscription point\n' +
        '\n' +
        'import { TestScheduler } from \'rxjs/testing\';\n' +
        'import { map, delay } from \'rxjs/operators\';\n' +
        '\n' +
        'describe(\'RxJS marble tests\', () => {\n' +
        '  let scheduler: TestScheduler;\n' +
        '\n' +
        '  beforeEach(() => {\n' +
        '    scheduler = new TestScheduler((actual, expected) => {\n' +
        '      expect(actual).toEqual(expected);\n' +
        '    });\n' +
        '  });\n' +
        '\n' +
        '  it(\'should map values\', () => {\n' +
        '    scheduler.run(({ cold, expectObservable }) => {\n' +
        '      const source =  \'--a--b--c|\';\n' +
        '      const expected = \'--x--y--z|\';\n' +
        '      const values = { a: 1, b: 2, c: 3, x: 10, y: 20, z: 30 };\n' +
        '\n' +
        '      const result = cold(source, values).pipe(\n' +
        '        map(v => v * 10)\n' +
        '      );\n' +
        '      expectObservable(result).toBe(expected, values);\n' +
        '    });\n' +
        '  });\n' +
        '\n' +
        '  it(\'should test hot Observables\', () => {\n' +
        '    scheduler.run(({ hot, expectObservable }) => {\n' +
        '      // ^ marks subscription, values before ^ are ignored\n' +
        '      const source =  \'--a--^--b--c--|\';\n' +
        '      const expected =       \'--b--c--|\';\n' +
        '\n' +
        '      expectObservable(hot(source)).toBe(expected);\n' +
        '    });\n' +
        '  });\n' +
        '});'}</code></pre>

      {/* 11. RxJS in Angular */}
      <h2 style={h2s}>11. RxJS in Angular</h2>
      <p style={ps}>
        Angular uses RxJS extensively. The HttpClient returns Observables, reactive forms expose value changes as streams, and the async pipe handles subscriptions automatically.
      </p>
      <pre style={cs}><code>{'// Angular service with RxJS\n' +
        'import { Injectable } from \'@angular/core\';\n' +
        'import { HttpClient } from \'@angular/common/http\';\n' +
        'import { BehaviorSubject } from \'rxjs\';\n' +
        'import { switchMap, shareReplay, catchError } from \'rxjs/operators\';\n' +
        '\n' +
        '@Injectable({ providedIn: \'root\' })\n' +
        'export class UserService {\n' +
        '  private refresh$ = new BehaviorSubject<void>(undefined);\n' +
        '\n' +
        '  users$ = this.refresh$.pipe(\n' +
        '    switchMap(() => this.http.get<User[]>(\'/api/users\')),\n' +
        '    shareReplay(1),\n' +
        '    catchError(err => {\n' +
        '      console.error(err);\n' +
        '      return of([]);\n' +
        '    })\n' +
        '  );\n' +
        '\n' +
        '  constructor(private http: HttpClient) {}\n' +
        '  refresh() { this.refresh$.next(); }\n' +
        '}\n' +
        '\n' +
        '// Component with async pipe (auto-subscribes/unsubscribes)\n' +
        '// @Component({\n' +
        '//   template: `\n' +
        '//     <ul>\n' +
        '//       <li *ngFor="let user of userService.users$ | async">\n' +
        '//         {{ user.name }}\n' +
        '//       </li>\n' +
        '//     </ul>\n' +
        '//   `\n' +
        '// })\n' +
        '\n' +
        '// Angular 16+ takeUntilDestroyed\n' +
        'import { takeUntilDestroyed } from \'@angular/core/rxjs-interop\';\n' +
        '\n' +
        'export class MyComponent {\n' +
        '  constructor() {\n' +
        '    interval(1000).pipe(\n' +
        '      takeUntilDestroyed() // auto-unsubscribes on destroy\n' +
        '    ).subscribe(v => console.log(v));\n' +
        '  }\n' +
        '}'}</code></pre>

      {/* 12. RxJS with React */}
      <h2 style={h2s}>12. RxJS with React</h2>
      <p style={ps}>
        While React does not use RxJS natively, custom hooks make integration clean. The key is subscribing in useEffect and cleaning up on unmount.
      </p>
      <pre style={cs}><code>{'import { useState, useEffect, useRef } from \'react\';\n' +
        'import { BehaviorSubject, Subject } from \'rxjs\';\n' +
        'import { debounceTime, distinctUntilChanged, switchMap } from \'rxjs/operators\';\n' +
        '\n' +
        '// Generic hook to subscribe to an Observable\n' +
        'function useObservable<T>(observable$: Observable<T>, initial: T): T {\n' +
        '  const [value, setValue] = useState<T>(initial);\n' +
        '\n' +
        '  useEffect(() => {\n' +
        '    const sub = observable$.subscribe(setValue);\n' +
        '    return () => sub.unsubscribe(); // cleanup\n' +
        '  }, [observable$]);\n' +
        '\n' +
        '  return value;\n' +
        '}\n' +
        '\n' +
        '// Typeahead search hook\n' +
        'function useSearch() {\n' +
        '  const [results, setResults] = useState([]);\n' +
        '  const search$ = useRef(new Subject<string>()).current;\n' +
        '\n' +
        '  useEffect(() => {\n' +
        '    const sub = search$.pipe(\n' +
        '      debounceTime(300),\n' +
        '      distinctUntilChanged(),\n' +
        '      switchMap(term =>\n' +
        '        fetch(\'/api/search?q=\' + term).then(r => r.json())\n' +
        '      )\n' +
        '    ).subscribe(setResults);\n' +
        '\n' +
        '    return () => sub.unsubscribe();\n' +
        '  }, []);\n' +
        '\n' +
        '  return { results, search: (term: string) => search$.next(term) };\n' +
        '}'}</code></pre>

      {/* 13. Common Patterns */}
      <h2 style={h2s}>13. Common Real-World Patterns</h2>

      <h3 style={h3s}>Typeahead Search</h3>
      <pre style={cs}><code>{'import { fromEvent } from \'rxjs\';\n' +
        'import {\n' +
        '  map, debounceTime, distinctUntilChanged,\n' +
        '  switchMap, filter, catchError\n' +
        '} from \'rxjs/operators\';\n' +
        '\n' +
        'const input = document.getElementById(\'search\');\n' +
        '\n' +
        'const typeahead$ = fromEvent(input, \'input\').pipe(\n' +
        '  map(e => e.target.value.trim()),\n' +
        '  filter(term => term.length >= 2),\n' +
        '  debounceTime(300),\n' +
        '  distinctUntilChanged(),\n' +
        '  switchMap(term =>\n' +
        '    fetch(\'/api/search?q=\' + encodeURIComponent(term))\n' +
        '      .then(r => r.json())\n' +
        '  ),\n' +
        '  catchError((err, source$) => {\n' +
        '    console.error(err);\n' +
        '    return source$; // re-subscribe to keep listening\n' +
        '  })\n' +
        ');\n' +
        '\n' +
        'typeahead$.subscribe(results => renderResults(results));'}</code></pre>

      <h3 style={h3s}>Polling</h3>
      <pre style={cs}><code>{'import { timer, Subject } from \'rxjs\';\n' +
        'import {\n' +
        '  switchMap, takeUntil, retry, shareReplay\n' +
        '} from \'rxjs/operators\';\n' +
        '\n' +
        'const stop$ = new Subject<void>();\n' +
        '\n' +
        '// Poll every 5 seconds, starting immediately\n' +
        'const poll$ = timer(0, 5000).pipe(\n' +
        '  switchMap(() => fetch(\'/api/status\').then(r => r.json())),\n' +
        '  retry(2),\n' +
        '  takeUntil(stop$),\n' +
        '  shareReplay(1)\n' +
        ');\n' +
        '\n' +
        'poll$.subscribe(status => updateUI(status));\n' +
        '\n' +
        '// Stop polling\n' +
        '// stop$.next(); stop$.complete();'}</code></pre>

      <h3 style={h3s}>Retry with Exponential Backoff</h3>
      <pre style={cs}><code>{'import { Observable, timer, throwError } from \'rxjs\';\n' +
        'import { mergeMap, retryWhen, catchError } from \'rxjs/operators\';\n' +
        '\n' +
        'function fetchWithBackoff(url: string, maxRetries = 3) {\n' +
        '  return new Observable(subscriber => {\n' +
        '    fetch(url)\n' +
        '      .then(r => {\n' +
        '        if (!r.ok) throw new Error(\'HTTP \' + r.status);\n' +
        '        return r.json();\n' +
        '      })\n' +
        '      .then(data => {\n' +
        '        subscriber.next(data);\n' +
        '        subscriber.complete();\n' +
        '      })\n' +
        '      .catch(err => subscriber.error(err));\n' +
        '  }).pipe(\n' +
        '    retry({\n' +
        '      count: maxRetries,\n' +
        '      delay: (error, retryCount) => {\n' +
        '        const backoff = Math.pow(2, retryCount) * 1000;\n' +
        '        const jitter = Math.random() * 1000;\n' +
        '        return timer(backoff + jitter);\n' +
        '      }\n' +
        '    }),\n' +
        '    catchError(err => {\n' +
        '      console.error(\'All retries exhausted:\', err);\n' +
        '      return throwError(() => err);\n' +
        '    })\n' +
        '  );\n' +
        '}'}</code></pre>

      {/* 14. Memory Leaks & Unsubscription */}
      <h2 style={h2s}>14. Preventing Memory Leaks</h2>
      <p style={ps}>
        Forgetting to unsubscribe from long-lived Observables (intervals, WebSockets, fromEvent) is the most common RxJS mistake. Here are strategies for every context.
      </p>
      <pre style={cs}><code>{'// Strategy 1: Manual unsubscribe\n' +
        'const sub = interval(1000).subscribe(v => console.log(v));\n' +
        '// later...\n' +
        'sub.unsubscribe();\n' +
        '\n' +
        '// Strategy 2: takeUntil with destroy signal\n' +
        'const destroy$ = new Subject<void>();\n' +
        'interval(1000).pipe(\n' +
        '  takeUntil(destroy$)\n' +
        ').subscribe(v => console.log(v));\n' +
        '// On component destroy:\n' +
        '// destroy$.next(); destroy$.complete();\n' +
        '\n' +
        '// Strategy 3: take / first / takeWhile\n' +
        'interval(1000).pipe(take(5)).subscribe(); // auto-completes after 5\n' +
        'source$.pipe(first()).subscribe(); // auto-completes after 1\n' +
        'source$.pipe(\n' +
        '  takeWhile(v => v < 100) // completes when condition is false\n' +
        ').subscribe();\n' +
        '\n' +
        '// Strategy 4: Angular async pipe\n' +
        '// {{ data$ | async }} in template — auto-unsubscribes\n' +
        '\n' +
        '// Strategy 5: React useEffect cleanup\n' +
        '// useEffect(() => {\n' +
        '//   const sub = obs$.subscribe(...);\n' +
        '//   return () => sub.unsubscribe();\n' +
        '// }, []);\n' +
        '\n' +
        '// Strategy 6: Subscription bag\n' +
        'import { Subscription } from \'rxjs\';\n' +
        'const bag = new Subscription();\n' +
        'bag.add(stream1$.subscribe(...));\n' +
        'bag.add(stream2$.subscribe(...));\n' +
        '// Unsubscribe all at once:\n' +
        'bag.unsubscribe();'}</code></pre>

      {/* 15. Migration Tips */}
      <h2 style={h2s}>15. Migration Tips</h2>
      <p style={ps}>
        Migrating from callbacks or Promises to RxJS, or upgrading between RxJS versions, requires careful attention. Here are key tips.
      </p>

      <h3 style={h3s}>From Promises to Observables</h3>
      <pre style={cs}><code>{'// Before: Promise chains\n' +
        'async function loadData() {\n' +
        '  const user = await fetch(\'/api/user\').then(r => r.json());\n' +
        '  const posts = await fetch(\'/api/posts?userId=\' + user.id)\n' +
        '    .then(r => r.json());\n' +
        '  return { user, posts };\n' +
        '}\n' +
        '\n' +
        '// After: Observable pipeline\n' +
        'import { from, forkJoin } from \'rxjs\';\n' +
        'import { switchMap, map } from \'rxjs/operators\';\n' +
        '\n' +
        'const data$ = from(fetch(\'/api/user\').then(r => r.json())).pipe(\n' +
        '  switchMap(user =>\n' +
        '    from(fetch(\'/api/posts?userId=\' + user.id).then(r => r.json())).pipe(\n' +
        '      map(posts => ({ user, posts }))\n' +
        '    )\n' +
        '  )\n' +
        ');\n' +
        '\n' +
        '// Converting Observable to Promise (when needed)\n' +
        'import { firstValueFrom, lastValueFrom } from \'rxjs\';\n' +
        '\n' +
        'const result = await firstValueFrom(data$);\n' +
        'const last = await lastValueFrom(data$);'}</code></pre>

      <h3 style={h3s}>RxJS 6/7 to RxJS 7+ Key Changes</h3>
      <pre style={cs}><code>{'// 1. Import from \'rxjs\' instead of deep paths\n' +
        '// Before (RxJS 5): import { map } from \'rxjs/operators/map\';\n' +
        '// After (RxJS 7+): import { map } from \'rxjs/operators\';\n' +
        '// Or:               import { map } from \'rxjs\'; // tree-shakable\n' +
        '\n' +
        '// 2. toPromise() is deprecated, use firstValueFrom/lastValueFrom\n' +
        '// Before: const val = await obs$.toPromise();\n' +
        '// After:  const val = await firstValueFrom(obs$);\n' +
        '\n' +
        '// 3. subscribe with object (partial observer still supported)\n' +
        'source$.subscribe({\n' +
        '  next: val => console.log(val),\n' +
        '  error: err => console.error(err),\n' +
        '  complete: () => console.log(\'Done\')\n' +
        '});\n' +
        '\n' +
        '// 4. retry config object replaces retryWhen for most cases\n' +
        '// Before: retryWhen(errors => errors.pipe(delay(1000), take(3)))\n' +
        '// After:  retry({ count: 3, delay: 1000 })\n' +
        '\n' +
        '// 5. shareReplay requires explicit refCount config\n' +
        'source$.pipe(\n' +
        '  shareReplay({ bufferSize: 1, refCount: true })\n' +
        ');'}</code></pre>

      {/* 16. Quick Reference Table */}
      <h2 style={h2s}>16. Operator Quick Reference</h2>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Operator</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Category</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Use Case</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['map', 'Transform', 'Transform each emitted value'],
              ['filter', 'Filter', 'Emit only values passing a condition'],
              ['switchMap', 'Flatten', 'Cancel previous inner, use latest (search, routing)'],
              ['mergeMap', 'Flatten', 'Run inner Observables concurrently (parallel IO)'],
              ['concatMap', 'Flatten', 'Queue inner Observables sequentially (ordered writes)'],
              ['exhaustMap', 'Flatten', 'Ignore new emissions while inner is active (form submit)'],
              ['debounceTime', 'Filter', 'Wait for silence before emitting (input fields)'],
              ['distinctUntilChanged', 'Filter', 'Skip consecutive duplicate values'],
              ['catchError', 'Error', 'Intercept errors and return fallback Observable'],
              ['retry', 'Error', 'Re-subscribe on error N times'],
              ['tap', 'Utility', 'Side effects without modifying the stream'],
              ['take', 'Filter', 'Emit first N values then complete'],
              ['takeUntil', 'Filter', 'Emit until notifier Observable emits (unsubscribe pattern)'],
              ['scan', 'Transform', 'Accumulate values over time (running total)'],
              ['shareReplay', 'Multicast', 'Share execution and replay N values to late subscribers'],
            ].map(([op, cat, use], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontFamily: 'monospace', fontWeight: 600 }}>{op}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>{cat}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 17. FAQ */}
      <h2 style={h2s}>17. Frequently Asked Questions</h2>
      {faqSchema.mainEntity.map((faq, i) => (
        <div key={i} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1e293b' }}>
            {faq.name}
          </h3>
          <p style={{ margin: 0, lineHeight: '1.7', color: '#475569' }}>
            {faq.acceptedAnswer.text}
          </p>
        </div>
      ))}

      {/* Conclusion */}
      <h2 style={h2s}>Conclusion</h2>
      <p style={ps}>
        RxJS transforms how you think about asynchronous programming. Instead of managing callbacks, Promise chains, and manual state, you compose declarative pipelines that handle timing, concurrency, errors, and cancellation in a unified model. Start with the core operators (map, filter, switchMap, catchError, takeUntil) and expand to more specialized operators as your needs grow. Regardless of whether you use Angular, React, or plain JavaScript, the reactive patterns in this guide apply everywhere.
      </p>
      <p style={ps}>
        The most important habit to build is always managing subscriptions. Use takeUntil or the framework-specific cleanup patterns (async pipe in Angular, useEffect cleanup in React) to prevent memory leaks. Combine this with shareReplay for caching, marble testing for reliability, and error-handling pipelines for resilience, and you will have a robust reactive architecture.
      </p>
    </article>
  );
}
