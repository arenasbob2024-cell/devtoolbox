'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    title: 'JavaScript Error Handling Best Practices: try/catch, Async Errors, and Custom Error Types',
    intro: 'Robust error handling is what separates production-ready JavaScript from fragile demos. Unhandled errors crash user sessions, make debugging impossible, and silently corrupt application state. This guide covers <strong>try/catch patterns</strong>, <strong>async error handling</strong>, <strong>custom error classes</strong>, and production-grade error management strategies.',
    h2TryCatch: 'try/catch Fundamentals',
    tryCatchP1: 'The try/catch/finally block is the foundation of synchronous error handling in JavaScript. Understanding its nuances prevents common mistakes.',
    h2AsyncErrors: 'Async/Await Error Handling',
    asyncP1: 'Async functions return Promises, so errors must be caught differently. The async/await syntax makes async error handling feel synchronous but has important gotchas.',
    h2CustomErrors: 'Custom Error Classes',
    customP1: 'Creating custom error classes enables structured error handling, better stack traces, and programmatic error type checking — essential for any production application.',
    h2GlobalHandlers: 'Global Error Handlers',
    globalP1: 'Some errors slip through local try/catch blocks. Global handlers are your last line of defense to prevent silent failures.',
    h2Production: 'Production Error Monitoring',
    productionP1: 'In production, errors need to be captured, reported, and analyzed. Never rely on console.log for production error monitoring.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Should I catch every error?',
    faq1A: 'No. Only catch errors you can meaningfully handle at the current level. Catching everything and swallowing errors is worse than letting them propagate. Let errors bubble up to a level where you can provide proper user feedback or log them appropriately.',
    faq2Q: 'What is the difference between throw and throw new Error()?',
    faq2A: 'You can throw any value in JavaScript — throw "string", throw 42, throw {message: "error"}. However, throwing non-Error objects loses the stack trace. Always use throw new Error() or throw new CustomError() to preserve the call stack for debugging.',
    faq3Q: 'How do I handle errors in Promise.all()?',
    faq3A: 'Promise.all() rejects as soon as any promise rejects, discarding other results. Use Promise.allSettled() to get results from all promises regardless of rejection. Then filter for fulfilled/rejected status.',
    faq4Q: 'What should I include in error messages?',
    faq4A: 'Error messages should be actionable and specific. Include: what went wrong, what was expected vs what happened, and how to fix it. Never include sensitive data (passwords, tokens) in error messages. Use error codes for programmatic handling.',
    relatedTitle: 'Related Tools',
  },
  fr: { title: 'Meilleures pratiques de gestion des erreurs JavaScript', intro: 'La gestion robuste des erreurs distingue le JavaScript prêt pour la production des démos fragiles. Ce guide couvre les <strong>patterns try/catch</strong>, la <strong>gestion des erreurs async</strong>, les <strong>classes d\'erreur personnalisées</strong>.', h2TryCatch: 'Fondamentaux de try/catch', tryCatchP1: 'Le bloc try/catch/finally est la base de la gestion synchrone des erreurs en JavaScript.', h2AsyncErrors: 'Gestion des erreurs async/await', asyncP1: 'Les fonctions async retournent des Promises, donc les erreurs doivent être capturées différemment.', h2CustomErrors: 'Classes d\'erreur personnalisées', customP1: 'Les classes d\'erreur personnalisées permettent une gestion structurée des erreurs et des traces de pile meilleures.', h2GlobalHandlers: 'Gestionnaires d\'erreurs globaux', globalP1: 'Certaines erreurs passent à travers les blocs try/catch locaux. Les gestionnaires globaux sont votre dernier recours.', h2Production: 'Surveillance des erreurs en production', productionP1: 'En production, les erreurs doivent être capturées et analysées.', h2Faq: 'Questions fréquentes', faq1Q: 'Dois-je capturer chaque erreur ?', faq1A: 'Non. Capturez uniquement les erreurs que vous pouvez gérer de manière significative au niveau actuel.', faq2Q: 'Quelle est la différence entre throw et throw new Error() ?', faq2A: 'Vous pouvez lancer n\'importe quelle valeur, mais lancer des non-Error perd la trace de pile. Utilisez toujours new Error().', faq3Q: 'Comment gérer les erreurs dans Promise.all() ?', faq3A: 'Promise.all() rejette dès qu\'une promesse est rejetée. Utilisez Promise.allSettled() pour obtenir tous les résultats.', faq4Q: 'Que dois-je inclure dans les messages d\'erreur ?', faq4A: 'Les messages d\'erreur doivent être exploitables et spécifiques. N\'incluez jamais de données sensibles.', relatedTitle: 'Outils associés' },
  de: { title: 'Beste Praktiken für JavaScript-Fehlerbehandlung', intro: 'Robuste Fehlerbehandlung unterscheidet produktionsbereites JavaScript von fragilen Demos. Dieser Leitfaden behandelt <strong>try/catch-Muster</strong>, <strong>async-Fehlerbehandlung</strong> und <strong>benutzerdefinierte Fehlerklassen</strong>.', h2TryCatch: 'try/catch-Grundlagen', tryCatchP1: 'Der try/catch/finally-Block ist die Basis der synchronen Fehlerbehandlung in JavaScript.', h2AsyncErrors: 'Async/Await-Fehlerbehandlung', asyncP1: 'Async-Funktionen geben Promises zurück, daher müssen Fehler anders abgefangen werden.', h2CustomErrors: 'Benutzerdefinierte Fehlerklassen', customP1: 'Benutzerdefinierte Fehlerklassen ermöglichen strukturierte Fehlerbehandlung und bessere Stack-Traces.', h2GlobalHandlers: 'Globale Fehler-Handler', globalP1: 'Manche Fehler gleiten durch lokale try/catch-Blöcke. Globale Handler sind Ihre letzte Verteidigungslinie.', h2Production: 'Produktions-Fehlerüberwachung', productionP1: 'In der Produktion müssen Fehler erfasst und analysiert werden.', h2Faq: 'Häufig gestellte Fragen', faq1Q: 'Sollte ich jeden Fehler abfangen?', faq1A: 'Nein. Fangen Sie nur Fehler ab, die Sie auf der aktuellen Ebene sinnvoll behandeln können.', faq2Q: 'Was ist der Unterschied zwischen throw und throw new Error()?', faq2A: 'Beim Werfen von Nicht-Error-Objekten geht der Stack-Trace verloren. Verwenden Sie immer new Error().', faq3Q: 'Wie behandle ich Fehler in Promise.all()?', faq3A: 'Promise.all() lehnt ab, sobald eine Promise abgelehnt wird. Verwenden Sie Promise.allSettled() für alle Ergebnisse.', faq4Q: 'Was soll ich in Fehlermeldungen einschließen?', faq4A: 'Fehlermeldungen sollten umsetzbar und spezifisch sein. Niemals sensible Daten einschließen.', relatedTitle: 'Verwandte Tools' },
  it: { title: 'Best practice per la gestione degli errori in JavaScript', intro: 'Una gestione robusta degli errori distingue il JavaScript pronto per la produzione dai demo fragili. Questa guida copre i <strong>pattern try/catch</strong>, la <strong>gestione degli errori async</strong> e le <strong>classi di errore personalizzate</strong>.', h2TryCatch: 'Fondamentali di try/catch', tryCatchP1: 'Il blocco try/catch/finally è la base della gestione sincrona degli errori in JavaScript.', h2AsyncErrors: 'Gestione degli errori async/await', asyncP1: 'Le funzioni async restituiscono Promise, quindi gli errori devono essere catturati diversamente.', h2CustomErrors: 'Classi di errore personalizzate', customP1: 'Le classi di errore personalizzate abilitano la gestione strutturata degli errori.', h2GlobalHandlers: 'Gestori di errori globali', globalP1: 'Alcuni errori sfuggono ai blocchi try/catch locali. I gestori globali sono la tua ultima difesa.', h2Production: 'Monitoraggio degli errori in produzione', productionP1: 'In produzione, gli errori devono essere catturati e analizzati.', h2Faq: 'Domande frequenti', faq1Q: 'Devo catturare ogni errore?', faq1A: 'No. Cattura solo gli errori che puoi gestire in modo significativo al livello corrente.', faq2Q: 'Qual è la differenza tra throw e throw new Error()?', faq2A: 'Lanciare oggetti non-Error perde lo stack trace. Usa sempre new Error().', faq3Q: 'Come gestire gli errori in Promise.all()?', faq3A: 'Promise.all() rifiuta non appena una promise viene rifiutata. Usa Promise.allSettled() per tutti i risultati.', faq4Q: 'Cosa includere nei messaggi di errore?', faq4A: 'I messaggi devono essere specifici. Non includere mai dati sensibili.', relatedTitle: 'Strumenti correlati' },
  es: { title: 'Mejores practicas para manejo de errores en JavaScript', intro: 'El manejo robusto de errores distingue el JavaScript listo para produccion de las demos fragiles. Esta guia cubre los <strong>patrones try/catch</strong>, el <strong>manejo de errores async</strong> y las <strong>clases de error personalizadas</strong>.', h2TryCatch: 'Fundamentos de try/catch', tryCatchP1: 'El bloque try/catch/finally es la base del manejo sincrono de errores en JavaScript.', h2AsyncErrors: 'Manejo de errores async/await', asyncP1: 'Las funciones async devuelven Promises, por lo que los errores deben capturarse de manera diferente.', h2CustomErrors: 'Clases de error personalizadas', customP1: 'Las clases de error personalizadas permiten el manejo estructurado de errores.', h2GlobalHandlers: 'Manejadores de errores globales', globalP1: 'Algunos errores pasan a traves de los bloques try/catch locales. Los manejadores globales son tu ultima defensa.', h2Production: 'Monitoreo de errores en produccion', productionP1: 'En produccion, los errores deben capturarse y analizarse.', h2Faq: 'Preguntas frecuentes', faq1Q: 'Debo capturar cada error?', faq1A: 'No. Solo captura errores que puedas manejar significativamente en el nivel actual.', faq2Q: 'Cual es la diferencia entre throw y throw new Error()?', faq2A: 'Lanzar objetos no-Error pierde el stack trace. Siempre usa new Error().', faq3Q: 'Como manejar errores en Promise.all()?', faq3A: 'Promise.all() rechaza tan pronto como una promesa es rechazada. Usa Promise.allSettled() para todos los resultados.', faq4Q: 'Que incluir en los mensajes de error?', faq4A: 'Los mensajes deben ser especificos. Nunca incluyas datos sensibles.', relatedTitle: 'Herramientas relacionadas' },
  pt: { title: 'Melhores práticas de tratamento de erros em JavaScript', intro: 'O tratamento robusto de erros distingue o JavaScript pronto para produção dos demos frágeis. Este guia cobre os <strong>padrões try/catch</strong>, o <strong>tratamento de erros async</strong> e as <strong>classes de erro personalizadas</strong>.', h2TryCatch: 'Fundamentos de try/catch', tryCatchP1: 'O bloco try/catch/finally é a base do tratamento síncrono de erros em JavaScript.', h2AsyncErrors: 'Tratamento de erros async/await', asyncP1: 'Funções async retornam Promises, então erros devem ser capturados de forma diferente.', h2CustomErrors: 'Classes de erro personalizadas', customP1: 'Classes de erro personalizadas permitem tratamento estruturado de erros.', h2GlobalHandlers: 'Manipuladores de erros globais', globalP1: 'Alguns erros escapam dos blocos try/catch locais. Manipuladores globais são sua última linha de defesa.', h2Production: 'Monitoramento de erros em produção', productionP1: 'Em produção, os erros precisam ser capturados e analisados.', h2Faq: 'Perguntas frequentes', faq1Q: 'Devo capturar cada erro?', faq1A: 'Não. Capture apenas erros que você possa tratar significativamente no nível atual.', faq2Q: 'Qual a diferença entre throw e throw new Error()?', faq2A: 'Lançar objetos não-Error perde o stack trace. Sempre use new Error().', faq3Q: 'Como tratar erros em Promise.all()?', faq3A: 'Promise.all() rejeita assim que qualquer promise é rejeitada. Use Promise.allSettled() para todos os resultados.', faq4Q: 'O que incluir nas mensagens de erro?', faq4A: 'As mensagens devem ser específicas. Nunca inclua dados sensíveis.', relatedTitle: 'Ferramentas relacionadas' },
  nl: { title: 'Beste praktijken voor JavaScript-foutafhandeling', intro: 'Robuuste foutafhandeling onderscheidt productieklaar JavaScript van fragiele demo\'s. Deze gids behandelt <strong>try/catch-patronen</strong>, <strong>async-foutafhandeling</strong> en <strong>aangepaste foutklassen</strong>.', h2TryCatch: 'try/catch-basisprincipes', tryCatchP1: 'Het try/catch/finally-blok is de basis van synchrone foutafhandeling in JavaScript.', h2AsyncErrors: 'Async/await-foutafhandeling', asyncP1: 'Async-functies retourneren Promises, dus fouten moeten anders worden afgehandeld.', h2CustomErrors: 'Aangepaste foutklassen', customP1: 'Aangepaste foutklassen maken gestructureerde foutafhandeling mogelijk.', h2GlobalHandlers: 'Globale fout-handlers', globalP1: 'Sommige fouten glippen door lokale try/catch-blokken. Globale handlers zijn uw laatste verdedigingslinie.', h2Production: 'Productiefoutmonitoring', productionP1: 'In productie moeten fouten worden vastgelegd en geanalyseerd.', h2Faq: 'Veelgestelde vragen', faq1Q: 'Moet ik elke fout opvangen?', faq1A: 'Nee. Vang alleen fouten op die u op het huidige niveau zinvol kunt afhandelen.', faq2Q: 'Wat is het verschil tussen throw en throw new Error()?', faq2A: 'Het gooien van niet-Error-objecten verliest de stack trace. Gebruik altijd new Error().', faq3Q: 'Hoe ga ik om met fouten in Promise.all()?', faq3A: 'Promise.all() weigert zodra een promise wordt geweigerd. Gebruik Promise.allSettled() voor alle resultaten.', faq4Q: 'Wat moet ik in foutmeldingen opnemen?', faq4A: 'Foutmeldingen moeten specifiek zijn. Nooit gevoelige gegevens opnemen.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Najlepsze praktyki obsługi błędów w JavaScript', intro: 'Solidna obsługa błędów odróżnia JavaScript gotowy do produkcji od kruchych demek. Ten przewodnik omawia <strong>wzorce try/catch</strong>, <strong>obsługę błędów asynchronicznych</strong> i <strong>niestandardowe klasy błędów</strong>.', h2TryCatch: 'Podstawy try/catch', tryCatchP1: 'Blok try/catch/finally jest podstawą synchronicznej obsługi błędów w JavaScript.', h2AsyncErrors: 'Obsługa błędów async/await', asyncP1: 'Funkcje async zwracają Promises, więc błędy muszą być przechwytywane inaczej.', h2CustomErrors: 'Niestandardowe klasy błędów', customP1: 'Niestandardowe klasy błędów umożliwiają strukturyzowaną obsługę błędów.', h2GlobalHandlers: 'Globalne obsługi błędów', globalP1: 'Niektóre błędy wymykają się przez lokalne bloki try/catch. Globalne obsługi są ostatnią linią obrony.', h2Production: 'Monitorowanie błędów produkcyjnych', productionP1: 'W produkcji błędy muszą być przechwytywane i analizowane.', h2Faq: 'Często zadawane pytania', faq1Q: 'Czy powinienem przechwytywać każdy błąd?', faq1A: 'Nie. Przechwytuj tylko błędy, które możesz znacząco obsłużyć na bieżącym poziomie.', faq2Q: 'Jaka jest różnica między throw a throw new Error()?', faq2A: 'Rzucanie nie-Error obiektów traci stos wywołań. Zawsze używaj new Error().', faq3Q: 'Jak obsługiwać błędy w Promise.all()?', faq3A: 'Promise.all() odrzuca gdy jakakolwiek obietnica zostanie odrzucona. Użyj Promise.allSettled() dla wszystkich wyników.', faq4Q: 'Co uwzględnić w komunikatach błędów?', faq4A: 'Komunikaty błędów powinny być konkretne. Nigdy nie dołączaj wrażliwych danych.', relatedTitle: 'Powiązane narzędzia' },
  sv: { title: 'Bästa praxis för JavaScript-felhantering', intro: 'Robust felhantering skiljer produktionsklar JavaScript från sköra demos. Denna guide täcker <strong>try/catch-mönster</strong>, <strong>async-felhantering</strong> och <strong>anpassade felklasser</strong>.', h2TryCatch: 'Grunderna i try/catch', tryCatchP1: 'Try/catch/finally-blocket är grunden för synkron felhantering i JavaScript.', h2AsyncErrors: 'Async/await-felhantering', asyncP1: 'Async-funktioner returnerar Promises, så fel måste fångas på ett annat sätt.', h2CustomErrors: 'Anpassade felklasser', customP1: 'Anpassade felklasser möjliggör strukturerad felhantering.', h2GlobalHandlers: 'Globala felhanterare', globalP1: 'Vissa fel glider igenom lokala try/catch-block. Globala hanterare är din sista försvarslinje.', h2Production: 'Produktionsfelsövervakning', productionP1: 'I produktion måste fel fångas och analyseras.', h2Faq: 'Vanliga frågor', faq1Q: 'Ska jag fånga varje fel?', faq1A: 'Nej. Fånga bara fel som du kan hantera meningsfullt på den aktuella nivån.', faq2Q: 'Vad är skillnaden mellan throw och throw new Error()?', faq2A: 'Att kasta icke-Error-objekt förlorar stackspårningen. Använd alltid new Error().', faq3Q: 'Hur hanterar jag fel i Promise.all()?', faq3A: 'Promise.all() avvisar så snart en promise avvisas. Använd Promise.allSettled() för alla resultat.', faq4Q: 'Vad ska jag inkludera i felmeddelanden?', faq4A: 'Felmeddelanden ska vara specifika. Inkludera aldrig känslig data.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'Beste praksiser for JavaScript-feilhåndtering', intro: 'Robust feilhåndtering skiller produksjonsklar JavaScript fra skjøre demoer. Denne guiden dekker <strong>try/catch-mønstre</strong>, <strong>async-feilhåndtering</strong> og <strong>tilpassede feilklasser</strong>.', h2TryCatch: 'Grunnleggende om try/catch', tryCatchP1: 'Try/catch/finally-blokken er grunnlaget for synkron feilhåndtering i JavaScript.', h2AsyncErrors: 'Async/await-feilhåndtering', asyncP1: 'Async-funksjoner returnerer Promises, så feil må fanges på en annen måte.', h2CustomErrors: 'Tilpassede feilklasser', customP1: 'Tilpassede feilklasser muliggjør strukturert feilhåndtering.', h2GlobalHandlers: 'Globale feilbehandlere', globalP1: 'Noen feil glir gjennom lokale try/catch-blokker. Globale behandlere er din siste forsvarslinje.', h2Production: 'Produksjonsfeilovervåking', productionP1: 'I produksjon må feil fanges og analyseres.', h2Faq: 'Vanlige spørsmål', faq1Q: 'Bør jeg fange hver feil?', faq1A: 'Nei. Fang bare feil du kan håndtere meningsfullt på det nåværende nivået.', faq2Q: 'Hva er forskjellen mellom throw og throw new Error()?', faq2A: 'Å kaste ikke-Error-objekter mister stakksporing. Bruk alltid new Error().', faq3Q: 'Hvordan håndtere feil i Promise.all()?', faq3A: 'Promise.all() avviser så snart en promise avvises. Bruk Promise.allSettled() for alle resultater.', faq4Q: 'Hva bør jeg inkludere i feilmeldinger?', faq4A: 'Feilmeldinger bør være spesifikke. Inkluder aldri sensitive data.', relatedTitle: 'Relaterte verktøy' },
  zh: { title: 'JavaScript 错误处理最佳实践：try/catch、异步错误与自定义错误类型', intro: '健壮的错误处理是区分生产级 JavaScript 和脆弱演示的关键。本指南涵盖 <strong>try/catch 模式</strong>、<strong>异步错误处理</strong>、<strong>自定义错误类</strong>和生产级错误管理策略。', h2TryCatch: 'try/catch 基础', tryCatchP1: 'try/catch/finally 块是 JavaScript 同步错误处理的基础。', h2AsyncErrors: 'async/await 错误处理', asyncP1: 'async 函数返回 Promise，因此错误需要用不同的方式捕获。', h2CustomErrors: '自定义错误类', customP1: '创建自定义错误类可以实现结构化错误处理、更好的堆栈跟踪和程序化错误类型检查。', h2GlobalHandlers: '全局错误处理器', globalP1: '一些错误会逃过本地的 try/catch 块。全局处理器是防止静默失败的最后一道防线。', h2Production: '生产环境错误监控', productionP1: '在生产环境中，错误需要被捕获、上报和分析。', h2Faq: '常见问题', faq1Q: '我应该捕获每一个错误吗？', faq1A: '不应该。只捕获你能在当前层级有意义地处理的错误。捕获一切并吞掉错误比让它们传播更糟糕。', faq2Q: 'throw 和 throw new Error() 有什么区别？', faq2A: 'JavaScript 中可以抛出任何值，但抛出非 Error 对象会丢失堆栈跟踪。始终使用 throw new Error() 来保留调用栈。', faq3Q: '如何处理 Promise.all() 中的错误？', faq3A: 'Promise.all() 会在任何一个 Promise 拒绝时立即拒绝。使用 Promise.allSettled() 可以获取所有 Promise 的结果。', faq4Q: '错误消息应该包含什么？', faq4A: '错误消息应该具有可操作性和针对性。永远不要在错误消息中包含敏感数据（密码、令牌）。', relatedTitle: '相关工具' },
  ja: { title: 'JavaScriptエラー処理のベストプラクティス：try/catch、非同期エラー、カスタムエラー型', intro: '堅牢なエラー処理は、本番対応のJavaScriptと壊れやすいデモを区別するものです。このガイドでは<strong>try/catchパターン</strong>、<strong>非同期エラー処理</strong>、<strong>カスタムエラークラス</strong>を解説します。', h2TryCatch: 'try/catchの基礎', tryCatchP1: 'try/catch/finallyブロックはJavaScriptの同期エラー処理の基盤です。', h2AsyncErrors: 'async/awaitエラー処理', asyncP1: 'async関数はPromiseを返すため、エラーは異なる方法でキャッチする必要があります。', h2CustomErrors: 'カスタムエラークラス', customP1: 'カスタムエラークラスで構造化されたエラー処理とより良いスタックトレースが実現できます。', h2GlobalHandlers: 'グローバルエラーハンドラー', globalP1: '一部のエラーはローカルのtry/catchをすり抜けます。グローバルハンドラーは最後の防衛線です。', h2Production: '本番エラーモニタリング', productionP1: '本番では、エラーをキャプチャし、報告し、分析する必要があります。', h2Faq: 'よくある質問', faq1Q: 'すべてのエラーをキャッチすべきですか？', faq1A: 'いいえ。現在のレベルで意味のある処理ができるエラーのみキャッチしてください。', faq2Q: 'throwとthrow new Error()の違いは？', faq2A: 'JavaScriptでは任意の値をthrowできますが、非Errorオブジェクトをthrowするとスタックトレースが失われます。常にnew Error()を使用してください。', faq3Q: 'Promise.all()でエラーを処理するには？', faq3A: 'Promise.all()はいずれかのPromiseが拒否されるとすぐに拒否されます。全結果を得るにはPromise.allSettled()を使用してください。', faq4Q: 'エラーメッセージには何を含めるべきですか？', faq4A: 'エラーメッセージは実行可能で具体的である必要があります。パスワードやトークンなどの機密データは絶対に含めないでください。', relatedTitle: '関連ツール' },
  ko: { title: 'JavaScript 오류 처리 모범 사례: try/catch, 비동기 오류, 사용자 정의 오류 유형', intro: '강력한 오류 처리는 프로덕션 준비가 된 JavaScript와 취약한 데모를 구별합니다. 이 가이드는 <strong>try/catch 패턴</strong>, <strong>비동기 오류 처리</strong>, <strong>사용자 정의 오류 클래스</strong>를 다룹니다.', h2TryCatch: 'try/catch 기초', tryCatchP1: 'try/catch/finally 블록은 JavaScript의 동기 오류 처리의 기반입니다.', h2AsyncErrors: 'async/await 오류 처리', asyncP1: 'async 함수는 Promise를 반환하므로 오류는 다르게 잡아야 합니다.', h2CustomErrors: '사용자 정의 오류 클래스', customP1: '사용자 정의 오류 클래스는 구조화된 오류 처리와 더 나은 스택 추적을 가능하게 합니다.', h2GlobalHandlers: '전역 오류 처리기', globalP1: '일부 오류는 로컬 try/catch 블록을 통과합니다. 전역 처리기는 마지막 방어선입니다.', h2Production: '프로덕션 오류 모니터링', productionP1: '프로덕션에서 오류는 캡처, 보고 및 분석되어야 합니다.', h2Faq: '자주 묻는 질문', faq1Q: '모든 오류를 잡아야 하나요?', faq1A: '아니요. 현재 수준에서 의미 있게 처리할 수 있는 오류만 잡으세요.', faq2Q: 'throw와 throw new Error()의 차이점은?', faq2A: '비Error 객체를 throw하면 스택 추적이 손실됩니다. 항상 new Error()를 사용하세요.', faq3Q: 'Promise.all()에서 오류를 처리하는 방법은?', faq3A: 'Promise.all()은 어떤 promise가 거부되면 즉시 거부됩니다. 모든 결과를 얻으려면 Promise.allSettled()를 사용하세요.', faq4Q: '오류 메시지에 무엇을 포함해야 하나요?', faq4A: '오류 메시지는 구체적이어야 합니다. 민감한 데이터는 절대 포함하지 마세요.', relatedTitle: '관련 도구' },
  id: { title: 'Praktik Terbaik Penanganan Error JavaScript', intro: 'Penanganan error yang kuat membedakan JavaScript siap produksi dari demo yang rapuh. Panduan ini mencakup <strong>pola try/catch</strong>, <strong>penanganan error async</strong>, dan <strong>kelas error kustom</strong>.', h2TryCatch: 'Dasar-dasar try/catch', tryCatchP1: 'Blok try/catch/finally adalah fondasi penanganan error sinkron di JavaScript.', h2AsyncErrors: 'Penanganan Error async/await', asyncP1: 'Fungsi async mengembalikan Promise, sehingga error harus ditangkap secara berbeda.', h2CustomErrors: 'Kelas Error Kustom', customP1: 'Kelas error kustom memungkinkan penanganan error yang terstruktur.', h2GlobalHandlers: 'Handler Error Global', globalP1: 'Beberapa error lolos dari blok try/catch lokal. Handler global adalah pertahanan terakhir Anda.', h2Production: 'Pemantauan Error Produksi', productionP1: 'Dalam produksi, error perlu ditangkap dan dianalisis.', h2Faq: 'Pertanyaan yang Sering Diajukan', faq1Q: 'Haruskah saya menangkap setiap error?', faq1A: 'Tidak. Hanya tangkap error yang dapat Anda tangani secara bermakna di level saat ini.', faq2Q: 'Apa perbedaan throw dan throw new Error()?', faq2A: 'Melempar objek non-Error kehilangan stack trace. Selalu gunakan new Error().', faq3Q: 'Bagaimana menangani error di Promise.all()?', faq3A: 'Promise.all() menolak segera setelah promise mana pun ditolak. Gunakan Promise.allSettled() untuk semua hasil.', faq4Q: 'Apa yang harus saya sertakan dalam pesan error?', faq4A: 'Pesan error harus spesifik. Jangan pernah menyertakan data sensitif.', relatedTitle: 'Alat Terkait' },
  th: { title: 'แนวทางปฏิบัติที่ดีที่สุดสำหรับการจัดการ Error ใน JavaScript', intro: 'การจัดการ error ที่แข็งแกร่งคือสิ่งที่แยกแยะ JavaScript ระดับ production จาก demo ที่เปราะบาง คู่มือนี้ครอบคลุม <strong>รูปแบบ try/catch</strong>, <strong>การจัดการ error แบบ async</strong> และ <strong>คลาส error แบบกำหนดเอง</strong>', h2TryCatch: 'พื้นฐาน try/catch', tryCatchP1: 'บล็อก try/catch/finally เป็นรากฐานของการจัดการ error แบบ synchronous ใน JavaScript', h2AsyncErrors: 'การจัดการ Error แบบ async/await', asyncP1: 'ฟังก์ชัน async ส่งคืน Promise ดังนั้น error จะต้องถูก catch ด้วยวิธีที่แตกต่างกัน', h2CustomErrors: 'คลาส Error แบบกำหนดเอง', customP1: 'การสร้างคลาส error แบบกำหนดเองช่วยให้จัดการ error ได้อย่างมีโครงสร้าง', h2GlobalHandlers: 'Global Error Handlers', globalP1: 'บาง error หลุดผ่านบล็อก try/catch ในท้องถิ่น Global handlers คือด่านสุดท้ายของคุณ', h2Production: 'การติดตาม Error ใน Production', productionP1: 'ใน production error ต้องถูกจับ รายงาน และวิเคราะห์', h2Faq: 'คำถามที่พบบ่อย', faq1Q: 'ฉันควร catch ทุก error หรือไม่?', faq1A: 'ไม่ catch เฉพาะ error ที่คุณสามารถจัดการได้อย่างมีความหมายในระดับปัจจุบัน', faq2Q: 'ความแตกต่างระหว่าง throw และ throw new Error() คืออะไร?', faq2A: 'การ throw object ที่ไม่ใช่ Error จะสูญเสีย stack trace ควรใช้ new Error() เสมอ', faq3Q: 'จะจัดการ error ใน Promise.all() ได้อย่างไร?', faq3A: 'Promise.all() จะ reject ทันทีที่ promise ใดก็ตาม reject ใช้ Promise.allSettled() สำหรับผลลัพธ์ทั้งหมด', faq4Q: 'ควรรวมอะไรในข้อความ error?', faq4A: 'ข้อความ error ควรเฉพาะเจาะจง อย่ารวมข้อมูลที่ละเอียดอ่อนเด็ดขาด', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

const tryCatchCode = `// try/catch/finally fundamentals

// Basic structure
try {
  const data = JSON.parse(userInput); // Can throw SyntaxError
  processData(data);
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error('Invalid JSON:', error.message);
  } else {
    throw error; // Re-throw errors you can't handle here
  }
} finally {
  cleanup(); // Always runs — use for resource cleanup
}

// What catch does NOT catch:
// 1. Errors in async callbacks (use async/await instead)
// 2. Errors in setTimeout/setInterval
// 3. Errors in event handlers

// Wrong: setTimeout error is not caught
try {
  setTimeout(() =\u003e {
    throw new Error('This is NOT caught by outer try/catch');
  }, 100);
} catch (e) {
  // This never runs
}

// Right: wrap async code
setTimeout(() =\u003e {
  try {
    throw new Error('This IS caught');
  } catch (e) {
    console.error(e);
  }
}, 100);

// Distinguishing error types
function handleError(error) {
  if (error instanceof TypeError) {
    // Null dereference, wrong type
  } else if (error instanceof RangeError) {
    // Array out of bounds, recursion limit
  } else if (error instanceof NetworkError) {
    // Custom: network failure
  } else {
    // Unknown: re-throw
    throw error;
  }
}`;

const asyncErrorCode = `// Async/Await Error Handling

// 1. Basic async error handling
async function fetchUser(id) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request was aborted');
      return null;
    }
    throw error; // Re-throw for caller to handle
  }
}

// 2. Handling multiple async operations
async function loadDashboard(userId) {
  // Run in parallel, catch errors individually
  const [user, posts, stats] = await Promise.allSettled([
    fetchUser(userId),
    fetchPosts(userId),
    fetchStats(userId),
  ]);

  return {
    user: user.status === 'fulfilled' ? user.value : null,
    posts: posts.status === 'fulfilled' ? posts.value : [],
    stats: stats.status === 'fulfilled' ? stats.value : {},
    errors: [user, posts, stats]
      .filter(r =\u003e r.status === 'rejected')
      .map(r =\u003e r.reason),
  };
}

// 3. Async error handling utility
async function tryCatchAsync\u003cT\u003e(
  promise: Promise\u003cT\u003e
): Promise\u003c[T | null, Error | null]\u003e {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}

// Usage: avoids nested try/catch
const [user, error] = await tryCatchAsync(fetchUser(id));
if (error) {
  console.error('Failed to fetch user:', error.message);
  return;
}
console.log(user.name);`;

const customErrorCode = `// Custom Error Classes

class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: string,
    statusCode = 500,
    isOperational = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintains proper prototype chain (important for instanceof)
    Object.setPrototypeOf(this, new.target.prototype);

    // Captures stack trace (V8 only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class ValidationError extends AppError {
  public readonly fields: Record\u003cstring, string[]\u003e;

  constructor(message: string, fields: Record\u003cstring, string[]\u003e = {}) {
    super(message, 'VALIDATION_ERROR', 400);
    this.fields = fields;
  }
}

class NotFoundError extends AppError {
  constructor(resource: string, id: string | number) {
    super(\`\${resource} with id \${id} not found\`, 'NOT_FOUND', 404);
  }
}

class NetworkError extends AppError {
  public readonly url: string;

  constructor(message: string, url: string) {
    super(message, 'NETWORK_ERROR', 503);
    this.url = url;
  }
}

// Usage
function findUser(id: number) {
  const user = db.find(id);
  if (!user) throw new NotFoundError('User', id);
  return user;
}

// Error type checking
try {
  findUser(999);
} catch (error) {
  if (error instanceof NotFoundError) {
    res.status(404).json({ error: error.message, code: error.code });
  } else if (error instanceof ValidationError) {
    res.status(400).json({ error: error.message, fields: error.fields });
  } else {
    // Unknown error — log and return 500
    logger.error('Unexpected error', { error });
    res.status(500).json({ error: 'Internal server error' });
  }
}`;

const globalHandlerCode = `// Global Error Handlers

// Browser: uncaught synchronous errors
window.onerror = (message, source, lineno, colno, error) =\u003e {
  console.error('Uncaught error:', { message, source, lineno, colno, error });
  reportToSentry(error);
  return true; // Prevents default browser error dialog
};

// Browser: unhandled promise rejections
window.addEventListener('unhandledrejection', (event) =\u003e {
  console.error('Unhandled promise rejection:', event.reason);
  reportToSentry(event.reason);
  event.preventDefault(); // Prevents console error
});

// Node.js: uncaught exceptions
process.on('uncaughtException', (error) =\u003e {
  console.error('Uncaught exception:', error);
  reportToSentry(error);
  // Exit after logging — cannot safely continue after uncaughtException
  process.exit(1);
});

// Node.js: unhandled promise rejections
process.on('unhandledRejection', (reason, promise) =\u003e {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  reportToSentry(reason instanceof Error ? reason : new Error(String(reason)));
});

// Express.js: error middleware (must have 4 params)
app.use((err, req, res, next) =\u003e {
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational || false;

  if (!isOperational) {
    // Unexpected error — log full details
    console.error('Unexpected error:', err);
    reportToSentry(err, { url: req.url, method: req.method });
  }

  res.status(statusCode).json({
    error: {
      message: isOperational ? err.message : 'Internal server error',
      code: err.code || 'INTERNAL_ERROR',
    },
  });
});`;

export default function JavaScriptErrorHandling({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: s.intro }} />

      <h2>{s.h2TryCatch}</h2>
      <p>{s.tryCatchP1}</p>
      <pre><code className="language-typescript">{tryCatchCode}</code></pre>

      <h2>{s.h2AsyncErrors}</h2>
      <p>{s.asyncP1}</p>
      <pre><code className="language-typescript">{asyncErrorCode}</code></pre>

      <h2>{s.h2CustomErrors}</h2>
      <p>{s.customP1}</p>
      <pre><code className="language-typescript">{customErrorCode}</code></pre>

      <h2>{s.h2GlobalHandlers}</h2>
      <p>{s.globalP1}</p>
      <pre><code className="language-typescript">{globalHandlerCode}</code></pre>

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
        <li><Link href={`/${lang}/tools/jwt-decoder`}>JWT Decoder</Link></li>
        <li><Link href={`/${lang}/blog/json-web-tokens-security`}>JWT Security Best Practices</Link></li>
        <li><Link href={`/${lang}/blog/nodejs-performance-tips`}>Node.js Performance Tips</Link></li>
      </ul>
    </>
  );
}
