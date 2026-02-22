'use client';

import { useState, useCallback, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Cron Expression Generator',
    description: 'Build cron expressions visually with live preview of next run times. Supports standard 5-field cron syntax.',
    minute: 'Minute', hour: 'Hour', dayOfMonth: 'Day of Month', month: 'Month', dayOfWeek: 'Day of Week',
    every: 'Every', specific: 'Specific', range: 'Range', interval: 'Interval',
    expression: 'Cron Expression', nextRuns: 'Next 5 Run Times',
    presets: 'Common Presets',
    everyMinute: 'Every minute', everyHour: 'Every hour', everyDay: 'Every day at midnight',
    everyMonday: 'Every Monday at 9:00', everyWeekday: 'Weekdays at 8:00',
    firstOfMonth: '1st of every month', everyQuarterHour: 'Every 15 minutes',
    every6Hours: 'Every 6 hours', twiceDaily: 'Twice daily (9am & 5pm)',
    parseBtn: 'Parse Expression', parsePlaceholder: 'Enter a cron expression to parse (e.g., */5 * * * *)',
    from: 'from', to: 'to', step: 'every',
    introTitle: 'Free Online Cron Expression Generator',
    introText: 'Build and understand cron expressions with this visual cron job scheduler. Select individual fields (minute, hour, day, month, weekday) to generate valid cron syntax, see a human-readable description, and preview the next 5 scheduled run times. Ideal for setting up cron jobs on Linux/Unix servers, scheduling tasks in CI/CD pipelines, configuring recurring jobs in Kubernetes, and automating workflows.',
    tipTitle: 'Cron Expression Tips',
    tip1: 'Standard cron has 5 fields: minute (0-59), hour (0-23), day (1-31), month (1-12), weekday (0-6)',
    tip2: 'Use * for "every", */N for "every N", and comma-separated values for specific times',
    tip3: 'Day of week: 0=Sunday, 1=Monday, ..., 6=Saturday',
    tip4: 'Ranges use a hyphen (e.g., 1-5 for Monday through Friday)',
    tip5: 'Test your cron expressions by checking the "Next 5 Run Times" preview',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a cron expression?',
    faq1a: 'A cron expression is a string of five fields separated by spaces that defines a schedule for recurring tasks. The fields represent minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday). Special characters like * (every), / (interval), - (range), and , (list) allow complex scheduling patterns.',
    faq2q: 'How do I read a cron expression?',
    faq2a: 'Read a cron expression from left to right: minute, hour, day of month, month, day of week. For example, "30 9 * * 1-5" means "at 9:30 AM on weekdays". The * means every possible value for that field.',
    faq3q: 'What does */5 mean in cron?',
    faq3a: 'The */5 syntax means "every 5th" unit. In the minute field, */5 means every 5 minutes (0, 5, 10, 15, ..., 55). You can use any number: */2 for every 2 units, */10 for every 10 units, etc.',
    faq4q: 'Can I specify both day of month and day of week?',
    faq4a: 'Yes, but be aware that in standard cron, if both are specified (not *), the job runs when either condition is met (OR logic). It is best practice to set one to * when using the other.',
    faq5q: 'What timezone do cron jobs use?',
    faq5a: 'By default, cron jobs use the system timezone of the server they run on. In this tool, the next run times are calculated based on your browser local time. For production use, ensure your server timezone is correctly configured.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Cron 表达式生成器', description: '可视化构建 cron 表达式，实时预览下次运行时间。',
    minute: '分钟', hour: '小时', dayOfMonth: '日', month: '月', dayOfWeek: '星期',
    every: '每个', specific: '指定', range: '范围', interval: '间隔',
    expression: 'Cron 表达式', nextRuns: '接下来 5 次运行时间', presets: '常用预设',
    everyMinute: '每分钟', everyHour: '每小时', everyDay: '每天午夜',
    everyMonday: '每周一 9:00', everyWeekday: '工作日 8:00',
    firstOfMonth: '每月1号', everyQuarterHour: '每15分钟', every6Hours: '每6小时', twiceDaily: '每天两次',
    parseBtn: '解析表达式', parsePlaceholder: '输入 cron 表达式（例如 */5 * * * *）',
    from: '从', to: '到', step: '每隔',
    introTitle: '免费在线 Cron 表达式生成器', introText: '使用可视化编辑器构建和理解 cron 表达式。',
    tipTitle: 'Cron 技巧', tip1: '5个字段：分钟、小时、日、月、星期', tip2: '* 表示每个，*/N 表示每 N 个',
    tip3: '0=周日，1=周一，...，6=周六', tip4: '范围用连字符', tip5: '通过运行时间预览测试',
    faqTitle: '常见问题',
    faq1q: '什么是 cron 表达式？', faq1a: '由空格分隔的五个字段组成的字符串，定义重复任务的调度计划。',
    faq2q: '如何阅读？', faq2a: '从左到右：分钟、小时、日、月、星期。',
    faq3q: '*/5 是什么意思？', faq3a: '每 5 个单位。在分钟字段中表示每 5 分钟。',
    faq4q: '可以同时指定日和星期吗？', faq4a: '可以，但标准 cron 中两者是 OR 逻辑。',
    faq5q: '使用什么时区？', faq5a: '默认使用服务器系统时区。本工具基于浏览器本地时间。',
    relatedTitle: '相关工具',
  },
  fr: { title: 'Generateur d\'Expressions Cron', description: 'Construisez des expressions cron visuellement.', minute: 'Minute', hour: 'Heure', dayOfMonth: 'Jour du mois', month: 'Mois', dayOfWeek: 'Jour de la semaine', every: 'Chaque', specific: 'Specifique', range: 'Plage', interval: 'Intervalle', expression: 'Expression Cron', nextRuns: '5 Prochaines executions', presets: 'Predefinis', everyMinute: 'Chaque minute', everyHour: 'Chaque heure', everyDay: 'Chaque jour', everyMonday: 'Chaque lundi 9h', everyWeekday: 'Jours ouvrables 8h', firstOfMonth: '1er du mois', everyQuarterHour: 'Toutes les 15 min', every6Hours: 'Toutes les 6h', twiceDaily: '2x/jour', parseBtn: 'Analyser', parsePlaceholder: 'Expression cron...', from: 'de', to: 'a', step: 'chaque', introTitle: 'Generateur cron gratuit', introText: 'Construisez des expressions cron visuellement.', tipTitle: 'Conseils', tip1: '5 champs', tip2: '* pour chaque', tip3: '0=dimanche', tip4: 'Plages avec tiret', tip5: 'Testez avec l\'apercu', faqTitle: 'Questions frequentes', faq1q: 'Qu\'est-ce qu\'une expression cron?', faq1a: 'Une chaine de 5 champs definissant un planning.', faq2q: 'Comment lire?', faq2a: 'De gauche a droite.', faq3q: 'Que signifie */5?', faq3a: 'Chaque 5eme unite.', faq4q: 'Jour et jour de semaine?', faq4a: 'Logique OU en cron standard.', faq5q: 'Fuseau horaire?', faq5a: 'Fuseau du serveur par defaut.', relatedTitle: 'Outils connexes' },
  de: { title: 'Cron Ausdruck Generator', description: 'Erstellen Sie Cron-Ausdruecke visuell.', minute: 'Minute', hour: 'Stunde', dayOfMonth: 'Tag', month: 'Monat', dayOfWeek: 'Wochentag', every: 'Jeder', specific: 'Bestimmt', range: 'Bereich', interval: 'Intervall', expression: 'Cron Ausdruck', nextRuns: 'Naechste 5 Ausfuehrungen', presets: 'Voreinstellungen', everyMinute: 'Jede Minute', everyHour: 'Jede Stunde', everyDay: 'Taeglich', everyMonday: 'Montag 9:00', everyWeekday: 'Werktags 8:00', firstOfMonth: '1. des Monats', everyQuarterHour: 'Alle 15 Min', every6Hours: 'Alle 6 Std', twiceDaily: '2x taeglich', parseBtn: 'Analysieren', parsePlaceholder: 'Cron-Ausdruck...', from: 'von', to: 'bis', step: 'alle', introTitle: 'Kostenloser Cron Generator', introText: 'Erstellen Sie Cron-Ausdruecke visuell.', tipTitle: 'Tipps', tip1: '5 Felder', tip2: '* fuer jeder', tip3: '0=Sonntag', tip4: 'Bereiche mit Bindestrich', tip5: 'Testen mit Vorschau', faqTitle: 'Haeufig gestellte Fragen', faq1q: 'Was ist ein Cron-Ausdruck?', faq1a: 'Eine Zeichenkette aus 5 Feldern.', faq2q: 'Wie liest man?', faq2a: 'Von links nach rechts.', faq3q: '*/5 Bedeutung?', faq3a: 'Jede 5. Einheit.', faq4q: 'Tag und Wochentag?', faq4a: 'ODER-Logik im Standard.', faq5q: 'Zeitzone?', faq5a: 'Server-Zeitzone.', relatedTitle: 'Verwandte Tools' },
  es: { title: 'Generador de Expresiones Cron', description: 'Construya expresiones cron visualmente.', minute: 'Minuto', hour: 'Hora', dayOfMonth: 'Dia', month: 'Mes', dayOfWeek: 'Dia semana', every: 'Cada', specific: 'Especifico', range: 'Rango', interval: 'Intervalo', expression: 'Expresion Cron', nextRuns: 'Proximas 5 ejecuciones', presets: 'Preajustes', everyMinute: 'Cada minuto', everyHour: 'Cada hora', everyDay: 'Cada dia', everyMonday: 'Lunes 9:00', everyWeekday: 'Laborables 8:00', firstOfMonth: '1ro del mes', everyQuarterHour: 'Cada 15 min', every6Hours: 'Cada 6h', twiceDaily: '2x/dia', parseBtn: 'Analizar', parsePlaceholder: 'Expresion cron...', from: 'desde', to: 'hasta', step: 'cada', introTitle: 'Generador cron gratuito', introText: 'Construya expresiones cron visualmente.', tipTitle: 'Consejos', tip1: '5 campos', tip2: '* para cada', tip3: '0=domingo', tip4: 'Rangos con guion', tip5: 'Pruebe con vista previa', faqTitle: 'Preguntas frecuentes', faq1q: 'Que es una expresion cron?', faq1a: 'Una cadena de 5 campos.', faq2q: 'Como leer?', faq2a: 'De izquierda a derecha.', faq3q: '*/5 significado?', faq3a: 'Cada 5ta unidad.', faq4q: 'Dia y dia de semana?', faq4a: 'Logica OR en cron estandar.', faq5q: 'Zona horaria?', faq5a: 'Zona del servidor.', relatedTitle: 'Herramientas relacionadas' },
  ja: { title: 'Cron 式ジェネレーター', description: 'ビジュアルで cron 式を構築。', minute: '分', hour: '時', dayOfMonth: '日', month: '月', dayOfWeek: '曜日', every: '毎', specific: '指定', range: '範囲', interval: '間隔', expression: 'Cron 式', nextRuns: '次の5回', presets: 'プリセット', everyMinute: '毎分', everyHour: '毎時', everyDay: '毎日', everyMonday: '月曜 9:00', everyWeekday: '平日 8:00', firstOfMonth: '毎月1日', everyQuarterHour: '15分ごと', every6Hours: '6時間ごと', twiceDaily: '1日2回', parseBtn: '解析', parsePlaceholder: 'cron 式を入力...', from: 'から', to: 'まで', step: 'ごと', introTitle: '無料 Cron 式ジェネレーター', introText: 'ビジュアルで cron 式を構築。', tipTitle: 'コツ', tip1: '5フィールド', tip2: '* は毎', tip3: '0=日曜', tip4: '範囲はハイフン', tip5: 'プレビューでテスト', faqTitle: 'よくある質問', faq1q: 'Cron 式とは？', faq1a: '5フィールドのスケジュール定義。', faq2q: '読み方は？', faq2a: '左から右へ。', faq3q: '*/5 とは？', faq3a: '5番目ごと。', faq4q: '日と曜日同時？', faq4a: 'OR論理。', faq5q: 'タイムゾーン？', faq5a: 'サーバーのタイムゾーン。', relatedTitle: '関連ツール' },
  ko: { title: 'Cron 표현식 생성기', description: '비주얼로 cron 표현식 구축.', minute: '분', hour: '시', dayOfMonth: '일', month: '월', dayOfWeek: '요일', every: '매', specific: '지정', range: '범위', interval: '간격', expression: 'Cron 표현식', nextRuns: '다음 5회', presets: '프리셋', everyMinute: '매 분', everyHour: '매 시간', everyDay: '매일', everyMonday: '월요일 9:00', everyWeekday: '평일 8:00', firstOfMonth: '매월 1일', everyQuarterHour: '15분마다', every6Hours: '6시간마다', twiceDaily: '하루 2회', parseBtn: '파싱', parsePlaceholder: 'cron 표현식 입력...', from: '부터', to: '까지', step: '마다', introTitle: '무료 Cron 생성기', introText: '비주얼로 cron 표현식 구축.', tipTitle: '팁', tip1: '5개 필드', tip2: '*는 매', tip3: '0=일요일', tip4: '범위는 하이픈', tip5: '미리보기로 테스트', faqTitle: '자주 묻는 질문', faq1q: 'Cron 표현식이란?', faq1a: '5개 필드의 스케줄 정의.', faq2q: '읽는 법?', faq2a: '왼쪽에서 오른쪽으로.', faq3q: '*/5 의미?', faq3a: '5번째마다.', faq4q: '일과 요일 동시?', faq4a: 'OR 논리.', faq5q: '시간대?', faq5a: '서버 시간대.', relatedTitle: '관련 도구' },
  pt: { title: 'Gerador de Expressoes Cron', description: 'Construa expressoes cron visualmente.', minute: 'Minuto', hour: 'Hora', dayOfMonth: 'Dia', month: 'Mes', dayOfWeek: 'Dia semana', every: 'Cada', specific: 'Especifico', range: 'Faixa', interval: 'Intervalo', expression: 'Expressao Cron', nextRuns: 'Proximas 5', presets: 'Predefinicoes', everyMinute: 'A cada minuto', everyHour: 'A cada hora', everyDay: 'Diariamente', everyMonday: 'Segunda 9h', everyWeekday: 'Dias uteis 8h', firstOfMonth: '1o do mes', everyQuarterHour: 'Cada 15 min', every6Hours: 'Cada 6h', twiceDaily: '2x/dia', parseBtn: 'Analisar', parsePlaceholder: 'Expressao cron...', from: 'de', to: 'ate', step: 'cada', introTitle: 'Gerador cron gratis', introText: 'Construa expressoes cron visualmente.', tipTitle: 'Dicas', tip1: '5 campos', tip2: '* para cada', tip3: '0=domingo', tip4: 'Faixas com hifen', tip5: 'Teste com previa', faqTitle: 'Perguntas frequentes', faq1q: 'O que e cron?', faq1a: 'String de 5 campos.', faq2q: 'Como ler?', faq2a: 'Da esquerda para direita.', faq3q: '*/5?', faq3a: 'A cada 5a unidade.', faq4q: 'Dia e dia da semana?', faq4a: 'Logica OU.', faq5q: 'Fuso horario?', faq5a: 'Fuso do servidor.', relatedTitle: 'Ferramentas relacionadas' },
  it: { title: 'Generatore Espressioni Cron', description: 'Costruisci espressioni cron visivamente.', minute: 'Minuto', hour: 'Ora', dayOfMonth: 'Giorno', month: 'Mese', dayOfWeek: 'Giorno settimana', every: 'Ogni', specific: 'Specifico', range: 'Intervallo', interval: 'Intervallo', expression: 'Espressione Cron', nextRuns: 'Prossime 5', presets: 'Preset', everyMinute: 'Ogni minuto', everyHour: 'Ogni ora', everyDay: 'Ogni giorno', everyMonday: 'Lunedi 9:00', everyWeekday: 'Feriali 8:00', firstOfMonth: '1o del mese', everyQuarterHour: 'Ogni 15 min', every6Hours: 'Ogni 6 ore', twiceDaily: '2x/giorno', parseBtn: 'Analizza', parsePlaceholder: 'Espressione cron...', from: 'da', to: 'a', step: 'ogni', introTitle: 'Generatore cron gratuito', introText: 'Costruisci espressioni cron visivamente.', tipTitle: 'Consigli', tip1: '5 campi', tip2: '* per ogni', tip3: '0=domenica', tip4: 'Intervalli con trattino', tip5: 'Testa con anteprima', faqTitle: 'Domande frequenti', faq1q: 'Cos\'e cron?', faq1a: 'Stringa di 5 campi.', faq2q: 'Come leggere?', faq2a: 'Da sinistra a destra.', faq3q: '*/5?', faq3a: 'Ogni 5a unita.', faq4q: 'Giorno e giorno settimana?', faq4a: 'Logica OR.', faq5q: 'Fuso orario?', faq5a: 'Fuso del server.', relatedTitle: 'Strumenti correlati' },
  nl: { title: 'Cron Expressie Generator', description: 'Bouw cron-expressies visueel.', minute: 'Minuut', hour: 'Uur', dayOfMonth: 'Dag', month: 'Maand', dayOfWeek: 'Weekdag', every: 'Elke', specific: 'Specifiek', range: 'Bereik', interval: 'Interval', expression: 'Cron Expressie', nextRuns: 'Volgende 5', presets: 'Presets', everyMinute: 'Elke minuut', everyHour: 'Elk uur', everyDay: 'Dagelijks', everyMonday: 'Maandag 9:00', everyWeekday: 'Werkdagen 8:00', firstOfMonth: '1e van maand', everyQuarterHour: 'Elke 15 min', every6Hours: 'Elke 6 uur', twiceDaily: '2x/dag', parseBtn: 'Analyseren', parsePlaceholder: 'Cron-expressie...', from: 'van', to: 'tot', step: 'elke', introTitle: 'Gratis cron generator', introText: 'Bouw cron-expressies visueel.', tipTitle: 'Tips', tip1: '5 velden', tip2: '* voor elke', tip3: '0=zondag', tip4: 'Bereiken met streepje', tip5: 'Test met voorbeeld', faqTitle: 'Veelgestelde vragen', faq1q: 'Wat is cron?', faq1a: 'String van 5 velden.', faq2q: 'Hoe lezen?', faq2a: 'Van links naar rechts.', faq3q: '*/5?', faq3a: 'Elke 5e eenheid.', faq4q: 'Dag en weekdag?', faq4a: 'OF-logica.', faq5q: 'Tijdzone?', faq5a: 'Servertijdzone.', relatedTitle: 'Gerelateerde tools' },
  pl: { title: 'Generator Wyrazen Cron', description: 'Buduj wyrazenia cron wizualnie.', minute: 'Minuta', hour: 'Godzina', dayOfMonth: 'Dzien', month: 'Miesiac', dayOfWeek: 'Dzien tyg.', every: 'Kazdy', specific: 'Okreslony', range: 'Zakres', interval: 'Interwal', expression: 'Wyrazenie Cron', nextRuns: 'Nastepne 5', presets: 'Ustawienia', everyMinute: 'Co minute', everyHour: 'Co godzine', everyDay: 'Codziennie', everyMonday: 'Poniedzialek 9:00', everyWeekday: 'Dni robocze 8:00', firstOfMonth: '1. miesiaca', everyQuarterHour: 'Co 15 min', every6Hours: 'Co 6h', twiceDaily: '2x dziennie', parseBtn: 'Analizuj', parsePlaceholder: 'Wyrazenie cron...', from: 'od', to: 'do', step: 'co', introTitle: 'Darmowy generator cron', introText: 'Buduj wyrazenia cron wizualnie.', tipTitle: 'Wskazowki', tip1: '5 pol', tip2: '* dla kazdy', tip3: '0=niedziela', tip4: 'Zakresy z lacznikiem', tip5: 'Testuj z podgladem', faqTitle: 'FAQ', faq1q: 'Czym jest cron?', faq1a: 'Lancuch 5 pol.', faq2q: 'Jak czytac?', faq2a: 'Od lewej.', faq3q: '*/5?', faq3a: 'Co 5 jednostek.', faq4q: 'Dzien i dzien tyg.?', faq4a: 'Logika OR.', faq5q: 'Strefa czasowa?', faq5a: 'Strefa serwera.', relatedTitle: 'Powiazane narzedzia' },
  sv: { title: 'Cron Uttryck Generator', description: 'Bygg cron-uttryck visuellt.', minute: 'Minut', hour: 'Timme', dayOfMonth: 'Dag', month: 'Maanad', dayOfWeek: 'Veckodag', every: 'Varje', specific: 'Specifik', range: 'Intervall', interval: 'Intervall', expression: 'Cron Uttryck', nextRuns: 'Naesta 5', presets: 'Foerval', everyMinute: 'Varje minut', everyHour: 'Varje timme', everyDay: 'Varje dag', everyMonday: 'Maandag 9:00', everyWeekday: 'Vardagar 8:00', firstOfMonth: '1:a', everyQuarterHour: 'Var 15 min', every6Hours: 'Var 6 tim', twiceDaily: '2x/dag', parseBtn: 'Analysera', parsePlaceholder: 'Cron-uttryck...', from: 'fraan', to: 'till', step: 'varje', introTitle: 'Gratis cron generator', introText: 'Bygg cron-uttryck visuellt.', tipTitle: 'Tips', tip1: '5 faelt', tip2: '* foer varje', tip3: '0=soendag', tip4: 'Intervall med bindestreck', tip5: 'Testa med foerhandsvisning', faqTitle: 'Vanliga fragor', faq1q: 'Vad aer cron?', faq1a: 'Straeng med 5 faelt.', faq2q: 'Hur laesa?', faq2a: 'Fraan vaenster.', faq3q: '*/5?', faq3a: 'Var 5:e enhet.', faq4q: 'Dag och veckodag?', faq4a: 'ELLER-logik.', faq5q: 'Tidszon?', faq5a: 'Servertidszon.', relatedTitle: 'Relaterade verktyg' },
  no: { title: 'Cron Uttrykk Generator', description: 'Bygg cron-uttrykk visuelt.', minute: 'Minutt', hour: 'Time', dayOfMonth: 'Dag', month: 'Maanad', dayOfWeek: 'Ukedag', every: 'Hver', specific: 'Spesifikk', range: 'Rekkevidde', interval: 'Intervall', expression: 'Cron Uttrykk', nextRuns: 'Neste 5', presets: 'Forhåndsvalg', everyMinute: 'Hvert minutt', everyHour: 'Hver time', everyDay: 'Daglig', everyMonday: 'Mandag 9:00', everyWeekday: 'Hverdager 8:00', firstOfMonth: '1. i maaneden', everyQuarterHour: 'Hvert 15 min', every6Hours: 'Hver 6. time', twiceDaily: '2x daglig', parseBtn: 'Analyser', parsePlaceholder: 'Cron-uttrykk...', from: 'fra', to: 'til', step: 'hver', introTitle: 'Gratis cron generator', introText: 'Bygg cron-uttrykk visuelt.', tipTitle: 'Tips', tip1: '5 felt', tip2: '* for hver', tip3: '0=soendag', tip4: 'Rekkevidde med bindestrek', tip5: 'Test med foerhandsvisning', faqTitle: 'Vanlige spoersmaal', faq1q: 'Hva er cron?', faq1a: 'Streng med 5 felt.', faq2q: 'Hvordan lese?', faq2a: 'Fra venstre.', faq3q: '*/5?', faq3a: 'Hver 5. enhet.', faq4q: 'Dag og ukedag?', faq4a: 'ELLER-logikk.', faq5q: 'Tidssone?', faq5a: 'Servertidssone.', relatedTitle: 'Relaterte verktoy' },
  id: { title: 'Generator Ekspresi Cron', description: 'Bangun ekspresi cron secara visual.', minute: 'Menit', hour: 'Jam', dayOfMonth: 'Hari', month: 'Bulan', dayOfWeek: 'Hari minggu', every: 'Setiap', specific: 'Spesifik', range: 'Rentang', interval: 'Interval', expression: 'Ekspresi Cron', nextRuns: '5 Berikutnya', presets: 'Preset', everyMinute: 'Setiap menit', everyHour: 'Setiap jam', everyDay: 'Setiap hari', everyMonday: 'Senin 9:00', everyWeekday: 'Hari kerja 8:00', firstOfMonth: 'Tgl 1', everyQuarterHour: 'Setiap 15 mnt', every6Hours: 'Setiap 6 jam', twiceDaily: '2x/hari', parseBtn: 'Parse', parsePlaceholder: 'Ekspresi cron...', from: 'dari', to: 'hingga', step: 'setiap', introTitle: 'Generator cron gratis', introText: 'Bangun ekspresi cron secara visual.', tipTitle: 'Tips', tip1: '5 field', tip2: '* untuk setiap', tip3: '0=Minggu', tip4: 'Rentang dengan tanda hubung', tip5: 'Uji dengan pratinjau', faqTitle: 'FAQ', faq1q: 'Apa itu cron?', faq1a: 'String 5 field.', faq2q: 'Cara membaca?', faq2a: 'Dari kiri.', faq3q: '*/5?', faq3a: 'Setiap unit ke-5.', faq4q: 'Hari dan hari minggu?', faq4a: 'Logika OR.', faq5q: 'Zona waktu?', faq5a: 'Zona server.', relatedTitle: 'Alat terkait' },
  th: { title: 'ตัวสร้างนิพจน์ Cron', description: 'สร้างนิพจน์ cron แบบเห็นภาพ', minute: 'นาที', hour: 'ชั่วโมง', dayOfMonth: 'วัน', month: 'เดือน', dayOfWeek: 'วันในสัปดาห์', every: 'ทุก', specific: 'เจาะจง', range: 'ช่วง', interval: 'ช่วงเวลา', expression: 'นิพจน์ Cron', nextRuns: '5 ครั้งถัดไป', presets: 'พรีเซ็ต', everyMinute: 'ทุกนาที', everyHour: 'ทุกชั่วโมง', everyDay: 'ทุกวัน', everyMonday: 'จันทร์ 9:00', everyWeekday: 'วันทำงาน 8:00', firstOfMonth: 'วันที่ 1', everyQuarterHour: 'ทุก 15 นาที', every6Hours: 'ทุก 6 ชม.', twiceDaily: '2 ครั้ง/วัน', parseBtn: 'แยกวิเคราะห์', parsePlaceholder: 'นิพจน์ cron...', from: 'จาก', to: 'ถึง', step: 'ทุก', introTitle: 'ตัวสร้าง Cron ฟรี', introText: 'สร้างนิพจน์ cron แบบเห็นภาพ', tipTitle: 'เคล็ดลับ', tip1: '5 ฟิลด์', tip2: '* สำหรับทุก', tip3: '0=อาทิตย์', tip4: 'ช่วงด้วยขีด', tip5: 'ทดสอบด้วยตัวอย่าง', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'Cron คืออะไร?', faq1a: 'สตริง 5 ฟิลด์', faq2q: 'อ่านอย่างไร?', faq2a: 'จากซ้ายไปขวา', faq3q: '*/5?', faq3a: 'ทุก 5 หน่วย', faq4q: 'วันและวันในสัปดาห์?', faq4a: 'ตรรกะ OR', faq5q: 'เขตเวลา?', faq5a: 'เขตเวลาเซิร์ฟเวอร์', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง' },
};

interface CronField { type: 'every' | 'specific' | 'range' | 'interval'; values: number[]; from: number; to: number; step: number; }

const PRESETS: { key: string; cron: string }[] = [
  { key: 'everyMinute', cron: '* * * * *' }, { key: 'everyHour', cron: '0 * * * *' },
  { key: 'everyDay', cron: '0 0 * * *' }, { key: 'everyMonday', cron: '0 9 * * 1' },
  { key: 'everyWeekday', cron: '0 8 * * 1-5' }, { key: 'firstOfMonth', cron: '0 0 1 * *' },
  { key: 'everyQuarterHour', cron: '*/15 * * * *' }, { key: 'every6Hours', cron: '0 */6 * * *' },
  { key: 'twiceDaily', cron: '0 9,17 * * *' },
];

const FIELD_RANGES: [number, number][] = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 6]];
const FIELD_KEYS = ['minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'] as const;
const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function fieldToString(f: CronField): string {
  if (f.type === 'every') return '*';
  if (f.type === 'specific') return f.values.join(',');
  if (f.type === 'range') return `${f.from}-${f.to}`;
  return f.step === 1 ? '*' : `*/${f.step}`;
}

function parseField(s: string, idx: number): CronField {
  const [min, max] = FIELD_RANGES[idx];
  if (s === '*') return { type: 'every', values: [], from: min, to: max, step: 1 };
  if (s.includes('/')) { const step = parseInt(s.split('/')[1], 10) || 1; return { type: 'interval', values: [], from: min, to: max, step }; }
  if (s.includes('-')) { const parts = s.split('-').map(Number); return { type: 'range', values: [], from: parts[0], to: parts[1], step: 1 }; }
  if (s.includes(',')) { return { type: 'specific', values: s.split(',').map(Number), from: min, to: max, step: 1 }; }
  return { type: 'specific', values: [parseInt(s, 10)], from: min, to: max, step: 1 };
}

function matchField(f: CronField, val: number): boolean {
  if (f.type === 'every') return true;
  if (f.type === 'specific') return f.values.includes(val);
  if (f.type === 'range') return val >= f.from && val <= f.to;
  return f.step > 0 && val % f.step === 0;
}

function getNextRuns(cronStr: string, count: number = 5): Date[] {
  const parts = cronStr.trim().split(/\s+/);
  if (parts.length !== 5) return [];
  const fields = parts.map((p, i) => parseField(p, i));
  const results: Date[] = [];
  const now = new Date();
  const check = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, 0);
  for (let i = 0; i < 525960 && results.length < count; i++) {
    const d = new Date(check.getTime() + i * 60000);
    if (matchField(fields[0], d.getMinutes()) && matchField(fields[1], d.getHours()) && matchField(fields[2], d.getDate()) && matchField(fields[3], d.getMonth() + 1) && matchField(fields[4], d.getDay())) {
      results.push(d);
    }
  }
  return results;
}

export default function CronExpressionGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [fields, setFields] = useState<CronField[]>([
    { type: 'every', values: [0], from: 0, to: 59, step: 1 },
    { type: 'every', values: [0], from: 0, to: 23, step: 1 },
    { type: 'every', values: [1], from: 1, to: 31, step: 1 },
    { type: 'every', values: [1], from: 1, to: 12, step: 1 },
    { type: 'every', values: [0], from: 0, to: 6, step: 1 },
  ]);
  const [parseInput, setParseInput] = useState('');

  const cronExpression = useMemo(() => fields.map(fieldToString).join(' '), [fields]);
  const nextRuns = useMemo(() => getNextRuns(cronExpression), [cronExpression]);

  const updateField = useCallback((idx: number, updates: Partial<CronField>) => {
    setFields(prev => { const n = [...prev]; n[idx] = { ...n[idx], ...updates }; return n; });
  }, []);

  const applyPreset = (cron: string) => {
    const parts = cron.trim().split(/\s+/);
    if (parts.length === 5) setFields(parts.map((p, i) => parseField(p, i)));
  };

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
    { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
    { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
    { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
  ]};

  return (
    <ToolLayout title={t.title} description={t.description} toolId="cron-expression-generator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ background: 'var(--bg-input)', border: '2px solid var(--accent-blue)', borderRadius: 10, padding: '16px 20px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{t.expression}</label>
          <span style={{ fontSize: 24, fontFamily: 'monospace', fontWeight: 700, letterSpacing: 2 }}>{cronExpression}</span>
        </div>
        <CopyButton text={cronExpression} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.presets}</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {PRESETS.map(p => (
            <button key={p.key} onClick={() => applyPreset(p.cron)} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>
              {(t as Record<string, string>)[p.key] || p.key}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {FIELD_KEYS.map((key, idx) => {
          const [min, max] = FIELD_RANGES[idx];
          const field = fields[idx];
          return (
            <div key={key} style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{t[key]} <span style={{ fontWeight: 400, color: 'var(--text-secondary)', fontSize: 11 }}>({min}-{max})</span></span>
                <span style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--accent-blue)' }}>{fieldToString(field)}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                {(['every', 'specific', 'range', 'interval'] as const).map(tp => (
                  <button key={tp} onClick={() => updateField(idx, { type: tp })} className={field.type === tp ? 'btn btn-primary' : 'btn btn-secondary'} style={{ fontSize: 11, padding: '3px 10px' }}>{t[tp]}</button>
                ))}
              </div>
              {field.type === 'specific' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {Array.from({ length: max - min + 1 }, (_, i) => min + i).map(v => (
                    <button key={v} onClick={() => { const vals = field.values.includes(v) ? field.values.filter(x => x !== v) : [...field.values, v].sort((a, b) => a - b); updateField(idx, { values: vals.length ? vals : [min] }); }}
                    style={{ width: 32, height: 28, borderRadius: 6, fontSize: 11, border: '1px solid var(--border-color)', background: field.values.includes(v) ? 'var(--accent-blue)' : 'transparent', color: field.values.includes(v) ? '#fff' : 'var(--text-primary)', cursor: 'pointer', fontFamily: 'monospace' }}>
                      {idx === 4 ? WEEKDAY_NAMES[v] : idx === 3 ? MONTH_NAMES[v] : v}
                    </button>
                  ))}
                </div>
              )}
              {field.type === 'range' && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12 }}>
                  <span>{t.from}</span>
                  <input type="number" min={min} max={max} value={field.from} onChange={e => updateField(idx, { from: Number(e.target.value) })} style={{ width: 60, padding: '4px 6px', fontSize: 12 }} />
                  <span>{t.to}</span>
                  <input type="number" min={min} max={max} value={field.to} onChange={e => updateField(idx, { to: Number(e.target.value) })} style={{ width: 60, padding: '4px 6px', fontSize: 12 }} />
                </div>
              )}
              {field.type === 'interval' && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12 }}>
                  <span>{t.step}</span>
                  <input type="number" min={1} max={max} value={field.step} onChange={e => updateField(idx, { step: Number(e.target.value) || 1 })} style={{ width: 60, padding: '4px 6px', fontSize: 12 }} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <input type="text" value={parseInput} onChange={e => setParseInput(e.target.value)} placeholder={t.parsePlaceholder} onKeyDown={e => e.key === 'Enter' && applyPreset(parseInput)} style={{ flex: 1, padding: '8px 12px', fontSize: 13, fontFamily: 'monospace' }} />
        <button onClick={() => applyPreset(parseInput)} className="btn btn-secondary">{t.parseBtn}</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.nextRuns}</label>
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '12px 16px' }}>
          {nextRuns.length === 0 ? <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>--</span> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {nextRuns.map((d, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 12, fontSize: 13, fontFamily: 'monospace', alignItems: 'center' }}>
                  <span style={{ color: 'var(--accent-blue)', fontWeight: 600, minWidth: 20 }}>{idx + 1}.</span>
                  <span>{d.toLocaleString(lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : lang === 'ko' ? 'ko-KR' : lang, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li><li>{t.tip2}</li><li>{t.tip3}</li><li>{t.tip4}</li><li>{t.tip5}</li>
        </ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[{ href: `/${lang}/tools/chmod-calculator`, label: 'Chmod Calculator' }, { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' }, { href: `/${lang}/tools/password-generator-online`, label: 'Password Generator' }, { href: `/${lang}/tools/hash-generator`, label: 'Hash Generator' }].map((link) => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>{link.label}</Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
