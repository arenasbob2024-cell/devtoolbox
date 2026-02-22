'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Crontab Guru',
    description: 'Build and understand cron expressions interactively. Get natural language explanations and next run times.',
    expression: 'Cron Expression',
    minute: 'Minute',
    hour: 'Hour',
    dayMonth: 'Day (Month)',
    month: 'Month',
    dayWeek: 'Day (Week)',
    explanation: 'Explanation',
    nextRuns: 'Next 5 Run Times',
    presets: 'Common Presets',
    everyMinute: 'Every minute',
    everyHour: 'Every hour',
    everyDay: 'Every day at midnight',
    everyWeekday: 'Weekdays at 9 AM',
    everyMonday: 'Every Monday at 8 AM',
    everyMonth: 'First of month at midnight',
    every5min: 'Every 5 minutes',
    every15min: 'Every 15 minutes',
    every30min: 'Every 30 minutes',
    everyNight: 'Every night at 2 AM',
    valid: 'Valid',
    invalid: 'Invalid expression',
    fieldRef: 'Field Reference',
    introTitle: 'Free Online Crontab Expression Builder',
    introText: 'Build, test, and understand cron expressions with this interactive tool. Get human-readable explanations and see the next scheduled run times. Cron is a time-based job scheduler used in Unix-like operating systems. All parsing happens in your browser.',
    tipTitle: 'Cron Expression Tips',
    tip1: 'Use * for every value, */n for every nth value',
    tip2: 'Ranges use dashes: 1-5 means 1 through 5',
    tip3: 'Lists use commas: 1,3,5 means 1, 3, and 5',
    tip4: 'Day of week: 0=Sunday, 1=Monday, ..., 6=Saturday',
    tip5: 'Month values range from 1 (January) to 12 (December)',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is a cron expression?',
    faq1a: 'A cron expression is a string of five fields separated by spaces that defines a schedule. The fields represent minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6). Special characters like *, /, -, and , allow complex scheduling patterns.',
    faq2q: 'What does */5 mean in cron?',
    faq2a: 'The */5 syntax means "every 5th value." In the minute field, */5 means every 5 minutes (0, 5, 10, 15, ...). In the hour field, */5 means every 5 hours (0, 5, 10, 15, 20). It works the same way for any field.',
    faq3q: 'How do I run a job on weekdays only?',
    faq3a: 'Use 1-5 in the day of week field. For example, "0 9 * * 1-5" runs at 9 AM Monday through Friday. Day 0 is Sunday and day 6 is Saturday.',
    faq4q: 'Can I use month and day names?',
    faq4a: 'Standard cron uses numeric values. Some implementations support names like MON, TUE for days and JAN, FEB for months, but numbers are more portable and universally supported.',
    faq5q: 'Is this tool free?',
    faq5a: 'Yes, completely free. All cron parsing and next-run calculations happen client-side in your browser with no server required.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Crontab 大师',
    description: '交互式构建和理解 cron 表达式，获取自然语言解释和下次运行时间。',
    expression: 'Cron 表达式', minute: '分钟', hour: '小时', dayMonth: '日（月）', month: '月', dayWeek: '星期',
    explanation: '解释', nextRuns: '接下来5次运行时间', presets: '常用预设',
    everyMinute: '每分钟', everyHour: '每小时', everyDay: '每天午夜', everyWeekday: '工作日上午9点', everyMonday: '每周一上午8点',
    everyMonth: '每月1日午夜', every5min: '每5分钟', every15min: '每15分钟', every30min: '每30分钟', everyNight: '每晚凌晨2点',
    valid: '有效', invalid: '无效表达式', fieldRef: '字段参考',
    introTitle: '免费在线 Crontab 表达式构建器', introText: '使用此交互式工具构建、测试和理解 cron 表达式。获取人类可读的解释并查看计划运行时间。',
    tipTitle: '提示', tip1: '使用 * 表示所有值，*/n 表示每第 n 个值', tip2: '范围用破折号：1-5 表示 1 到 5', tip3: '列表用逗号：1,3,5', tip4: '星期：0=周日，1=周一，...，6=周六', tip5: '月份值从 1（一月）到 12（十二月）',
    faqTitle: '常见问题',
    faq1q: '什么是 cron 表达式？', faq1a: 'Cron 表达式是由5个字段组成的字符串，定义时间调度。字段分别是分钟、小时、日、月、星期。',
    faq2q: '*/5 是什么意思？', faq2a: '*/5 表示每隔5个值。在分钟字段中表示每5分钟。',
    faq3q: '如何只在工作日运行？', faq3a: '在星期字段使用 1-5，例如 "0 9 * * 1-5" 表示周一到周五上午9点。',
    faq4q: '可以使用月份和星期名称吗？', faq4a: '标准 cron 使用数字。某些实现支持名称但数字更通用。',
    faq5q: '免费吗？', faq5a: '完全免费，所有解析在浏览器端完成。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Crontab Guru',
    description: 'Construisez et comprenez les expressions cron de maniere interactive.',
    expression: 'Expression Cron', minute: 'Minute', hour: 'Heure', dayMonth: 'Jour (Mois)', month: 'Mois', dayWeek: 'Jour (Semaine)',
    explanation: 'Explication', nextRuns: '5 prochaines executions', presets: 'Presets courants',
    everyMinute: 'Chaque minute', everyHour: 'Chaque heure', everyDay: 'Chaque jour a minuit', everyWeekday: 'Jours ouvrables a 9h', everyMonday: 'Chaque lundi a 8h',
    everyMonth: 'Premier du mois', every5min: 'Toutes les 5 min', every15min: 'Toutes les 15 min', every30min: 'Toutes les 30 min', everyNight: 'Chaque nuit a 2h',
    valid: 'Valide', invalid: 'Expression invalide', fieldRef: 'Reference des champs',
    introTitle: 'Constructeur d\'expressions cron gratuit', introText: 'Construisez et comprenez les expressions cron avec cet outil interactif.',
    tipTitle: 'Conseils', tip1: '* pour toutes les valeurs, */n pour chaque nieme', tip2: 'Plages avec tirets: 1-5', tip3: 'Listes avec virgules: 1,3,5', tip4: 'Jour de la semaine: 0=Dimanche', tip5: 'Mois de 1 (Janvier) a 12 (Decembre)',
    faqTitle: 'FAQ',
    faq1q: 'Qu\'est-ce qu\'une expression cron?', faq1a: 'Une expression cron definit un calendrier avec 5 champs: minute, heure, jour, mois, jour de la semaine.',
    faq2q: 'Que signifie */5?', faq2a: '*/5 signifie chaque 5eme valeur. Dans le champ minute, chaque 5 minutes.',
    faq3q: 'Executer uniquement en semaine?', faq3a: 'Utilisez 1-5 dans le jour de la semaine: "0 9 * * 1-5".',
    faq4q: 'Noms de mois possibles?', faq4a: 'Le cron standard utilise des nombres. Les nombres sont plus portables.',
    faq5q: 'Est-ce gratuit?', faq5a: 'Oui, entierement gratuit.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'Crontab Guru',
    description: 'Cron-Ausdruecke interaktiv erstellen und verstehen.',
    expression: 'Cron-Ausdruck', minute: 'Minute', hour: 'Stunde', dayMonth: 'Tag (Monat)', month: 'Monat', dayWeek: 'Tag (Woche)',
    explanation: 'Erklaerung', nextRuns: 'Naechste 5 Ausfuehrungen', presets: 'Gaengige Vorlagen',
    everyMinute: 'Jede Minute', everyHour: 'Jede Stunde', everyDay: 'Taeglich um Mitternacht', everyWeekday: 'Werktags um 9 Uhr', everyMonday: 'Jeden Montag um 8 Uhr',
    everyMonth: 'Monatserster', every5min: 'Alle 5 Min', every15min: 'Alle 15 Min', every30min: 'Alle 30 Min', everyNight: 'Jede Nacht um 2 Uhr',
    valid: 'Gueltig', invalid: 'Ungueltiger Ausdruck', fieldRef: 'Feldreferenz',
    introTitle: 'Kostenloser Cron-Ausdruck-Builder', introText: 'Erstellen und verstehen Sie Cron-Ausdruecke mit diesem interaktiven Tool.',
    tipTitle: 'Tipps', tip1: '* fuer alle Werte, */n fuer jeden n-ten', tip2: 'Bereiche mit Bindestrich: 1-5', tip3: 'Listen mit Komma: 1,3,5', tip4: 'Wochentag: 0=Sonntag', tip5: 'Monat von 1 (Januar) bis 12 (Dezember)',
    faqTitle: 'FAQ',
    faq1q: 'Was ist ein Cron-Ausdruck?', faq1a: 'Ein Cron-Ausdruck definiert einen Zeitplan mit 5 Feldern: Minute, Stunde, Tag, Monat, Wochentag.',
    faq2q: 'Was bedeutet */5?', faq2a: '*/5 bedeutet jeden 5. Wert. Im Minutenfeld alle 5 Minuten.',
    faq3q: 'Nur an Werktagen ausfuehren?', faq3a: 'Verwenden Sie 1-5 im Wochentag: "0 9 * * 1-5".',
    faq4q: 'Monatsnamen moeglich?', faq4a: 'Standard-Cron verwendet Zahlen. Zahlen sind portabler.',
    faq5q: 'Ist es kostenlos?', faq5a: 'Ja, komplett kostenlos.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Crontab Guru',
    description: 'Construya y comprenda expresiones cron interactivamente.',
    expression: 'Expresion Cron', minute: 'Minuto', hour: 'Hora', dayMonth: 'Dia (Mes)', month: 'Mes', dayWeek: 'Dia (Semana)',
    explanation: 'Explicacion', nextRuns: 'Proximas 5 ejecuciones', presets: 'Presets comunes',
    everyMinute: 'Cada minuto', everyHour: 'Cada hora', everyDay: 'Diario a medianoche', everyWeekday: 'Laborables a las 9', everyMonday: 'Cada lunes a las 8',
    everyMonth: 'Primero del mes', every5min: 'Cada 5 min', every15min: 'Cada 15 min', every30min: 'Cada 30 min', everyNight: 'Cada noche a las 2',
    valid: 'Valido', invalid: 'Expresion invalida', fieldRef: 'Referencia de campos',
    introTitle: 'Constructor de expresiones cron gratuito', introText: 'Construya y comprenda expresiones cron con esta herramienta interactiva.',
    tipTitle: 'Consejos', tip1: '* para todos los valores, */n para cada enesimo', tip2: 'Rangos con guion: 1-5', tip3: 'Listas con coma: 1,3,5', tip4: 'Dia de semana: 0=Domingo', tip5: 'Mes de 1 (Enero) a 12 (Diciembre)',
    faqTitle: 'FAQ',
    faq1q: 'Que es una expresion cron?', faq1a: 'Una expresion cron define un horario con 5 campos: minuto, hora, dia, mes, dia de semana.',
    faq2q: 'Que significa */5?', faq2a: '*/5 significa cada 5to valor. En minutos, cada 5 minutos.',
    faq3q: 'Ejecutar solo en laborables?', faq3a: 'Use 1-5 en dia de semana: "0 9 * * 1-5".',
    faq4q: 'Nombres de meses?', faq4a: 'El cron estandar usa numeros. Los numeros son mas portables.',
    faq5q: 'Es gratis?', faq5a: 'Si, completamente gratis.',
    relatedTitle: 'Herramientas relacionadas',
  },
  it: {
    title: 'Crontab Guru', description: 'Costruisci e comprendi le espressioni cron in modo interattivo.',
    expression: 'Espressione Cron', minute: 'Minuto', hour: 'Ora', dayMonth: 'Giorno (Mese)', month: 'Mese', dayWeek: 'Giorno (Settimana)',
    explanation: 'Spiegazione', nextRuns: 'Prossime 5 esecuzioni', presets: 'Preset comuni',
    everyMinute: 'Ogni minuto', everyHour: 'Ogni ora', everyDay: 'Ogni giorno a mezzanotte', everyWeekday: 'Feriali alle 9', everyMonday: 'Ogni lunedi alle 8',
    everyMonth: 'Primo del mese', every5min: 'Ogni 5 min', every15min: 'Ogni 15 min', every30min: 'Ogni 30 min', everyNight: 'Ogni notte alle 2',
    valid: 'Valido', invalid: 'Espressione non valida', fieldRef: 'Riferimento campi',
    introTitle: 'Costruttore di espressioni cron gratuito', introText: 'Costruisci e comprendi le espressioni cron con questo strumento interattivo.',
    tipTitle: 'Suggerimenti', tip1: '* per tutti i valori, */n per ogni n-esimo', tip2: 'Intervalli con trattino: 1-5', tip3: 'Liste con virgola: 1,3,5', tip4: 'Giorno settimana: 0=Domenica', tip5: 'Mese da 1 (Gennaio) a 12 (Dicembre)',
    faqTitle: 'FAQ', faq1q: 'Cos\'e un\'espressione cron?', faq1a: 'Un\'espressione cron definisce un programma con 5 campi.',
    faq2q: 'Cosa significa */5?', faq2a: '*/5 significa ogni 5o valore.',
    faq3q: 'Solo nei feriali?', faq3a: 'Usa 1-5 nel giorno della settimana.',
    faq4q: 'Nomi dei mesi?', faq4a: 'Il cron standard usa numeri.',
    faq5q: 'E gratuito?', faq5a: 'Si, completamente gratuito.',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Crontab Guru', description: 'Construa e entenda expressoes cron interativamente.',
    expression: 'Expressao Cron', minute: 'Minuto', hour: 'Hora', dayMonth: 'Dia (Mes)', month: 'Mes', dayWeek: 'Dia (Semana)',
    explanation: 'Explicacao', nextRuns: 'Proximas 5 execucoes', presets: 'Presets comuns',
    everyMinute: 'A cada minuto', everyHour: 'A cada hora', everyDay: 'Diario a meia-noite', everyWeekday: 'Dias uteis as 9h', everyMonday: 'Toda segunda as 8h',
    everyMonth: 'Primeiro do mes', every5min: 'A cada 5 min', every15min: 'A cada 15 min', every30min: 'A cada 30 min', everyNight: 'Toda noite as 2h',
    valid: 'Valido', invalid: 'Expressao invalida', fieldRef: 'Referencia de campos',
    introTitle: 'Construtor de expressoes cron gratuito', introText: 'Construa e entenda expressoes cron com esta ferramenta interativa.',
    tipTitle: 'Dicas', tip1: '* para todos os valores, */n para cada enesimo', tip2: 'Intervalos com hifen: 1-5', tip3: 'Listas com virgula: 1,3,5', tip4: 'Dia da semana: 0=Domingo', tip5: 'Mes de 1 (Janeiro) a 12 (Dezembro)',
    faqTitle: 'FAQ', faq1q: 'O que e uma expressao cron?', faq1a: 'Uma expressao cron define um agendamento com 5 campos.',
    faq2q: 'O que significa */5?', faq2a: '*/5 significa cada 5o valor.',
    faq3q: 'Apenas em dias uteis?', faq3a: 'Use 1-5 no dia da semana.',
    faq4q: 'Nomes de meses?', faq4a: 'O cron padrao usa numeros.',
    faq5q: 'E gratuito?', faq5a: 'Sim, completamente gratuito.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'Crontab Guru', description: 'Bouw en begrijp cron-expressies interactief.',
    expression: 'Cron Expressie', minute: 'Minuut', hour: 'Uur', dayMonth: 'Dag (Maand)', month: 'Maand', dayWeek: 'Dag (Week)',
    explanation: 'Uitleg', nextRuns: 'Volgende 5 uitvoeringen', presets: 'Veelgebruikte presets',
    everyMinute: 'Elke minuut', everyHour: 'Elk uur', everyDay: 'Dagelijks om middernacht', everyWeekday: 'Werkdagen om 9u', everyMonday: 'Elke maandag om 8u',
    everyMonth: 'Eerste van de maand', every5min: 'Elke 5 min', every15min: 'Elke 15 min', every30min: 'Elke 30 min', everyNight: 'Elke nacht om 2u',
    valid: 'Geldig', invalid: 'Ongeldige expressie', fieldRef: 'Veldreferentie',
    introTitle: 'Gratis cron-expressie builder', introText: 'Bouw en begrijp cron-expressies met deze interactieve tool.',
    tipTitle: 'Tips', tip1: '* voor alle waarden, */n voor elke nde', tip2: 'Bereiken met streepje: 1-5', tip3: 'Lijsten met komma: 1,3,5', tip4: 'Dag van de week: 0=Zondag', tip5: 'Maand van 1 (Januari) tot 12 (December)',
    faqTitle: 'FAQ', faq1q: 'Wat is een cron-expressie?', faq1a: 'Een cron-expressie definieert een schema met 5 velden.',
    faq2q: 'Wat betekent */5?', faq2a: '*/5 betekent elke 5e waarde.',
    faq3q: 'Alleen op werkdagen?', faq3a: 'Gebruik 1-5 in dag van de week.',
    faq4q: 'Maandnamen?', faq4a: 'Standaard cron gebruikt nummers.',
    faq5q: 'Is het gratis?', faq5a: 'Ja, volledig gratis.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Crontab Guru', description: 'Buduj i rozumiej wyrazenia cron interaktywnie.',
    expression: 'Wyrazenie Cron', minute: 'Minuta', hour: 'Godzina', dayMonth: 'Dzien (Miesiac)', month: 'Miesiac', dayWeek: 'Dzien (Tydzien)',
    explanation: 'Wyjasnienie', nextRuns: 'Nastepne 5 wykonan', presets: 'Popularne presets',
    everyMinute: 'Co minute', everyHour: 'Co godzine', everyDay: 'Codziennie o polnocy', everyWeekday: 'Dni robocze o 9', everyMonday: 'Kazdy poniedzialek o 8',
    everyMonth: 'Pierwszy dzien miesiaca', every5min: 'Co 5 min', every15min: 'Co 15 min', every30min: 'Co 30 min', everyNight: 'Kazda noc o 2',
    valid: 'Prawidlowe', invalid: 'Nieprawidlowe wyrazenie', fieldRef: 'Referencja pol',
    introTitle: 'Darmowy kreator wyrazen cron', introText: 'Buduj i rozumiej wyrazenia cron za pomoca tego narzedzia.',
    tipTitle: 'Wskazowki', tip1: '* dla wszystkich wartosci', tip2: 'Zakresy z myslnikiem: 1-5', tip3: 'Listy z przecinkiem: 1,3,5', tip4: 'Dzien tygodnia: 0=Niedziela', tip5: 'Miesiac od 1 do 12',
    faqTitle: 'FAQ', faq1q: 'Czym jest wyrazenie cron?', faq1a: 'Wyrazenie cron definiuje harmonogram z 5 polami.',
    faq2q: 'Co oznacza */5?', faq2a: '*/5 oznacza co 5ta wartosc.',
    faq3q: 'Tylko w dni robocze?', faq3a: 'Uzyj 1-5 w dniu tygodnia.',
    faq4q: 'Nazwy miesiecy?', faq4a: 'Standardowy cron uzywa liczb.',
    faq5q: 'Czy jest darmowe?', faq5a: 'Tak, calkowicie darmowe.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'Crontab Guru', description: 'Bygg och foerstaa cron-uttryck interaktivt.',
    expression: 'Cron-uttryck', minute: 'Minut', hour: 'Timme', dayMonth: 'Dag (Maanad)', month: 'Maanad', dayWeek: 'Dag (Vecka)',
    explanation: 'Foerklaring', nextRuns: 'Naesta 5 koerningar', presets: 'Vanliga presets',
    everyMinute: 'Varje minut', everyHour: 'Varje timme', everyDay: 'Dagligen vid midnatt', everyWeekday: 'Vardagar kl 9', everyMonday: 'Varje maandag kl 8',
    everyMonth: 'Foersta i maanaden', every5min: 'Var 5:e min', every15min: 'Var 15:e min', every30min: 'Var 30:e min', everyNight: 'Varje natt kl 2',
    valid: 'Giltigt', invalid: 'Ogiltigt uttryck', fieldRef: 'Faeltreferens',
    introTitle: 'Gratis cron-uttrycksbyggare', introText: 'Bygg och foerstaa cron-uttryck med detta interaktiva verktyg.',
    tipTitle: 'Tips', tip1: '* foer alla vaerden', tip2: 'Intervall med bindestreck: 1-5', tip3: 'Listor med komma: 1,3,5', tip4: 'Veckodag: 0=Soendag', tip5: 'Maanad fraan 1 till 12',
    faqTitle: 'FAQ', faq1q: 'Vad aer ett cron-uttryck?', faq1a: 'Ett cron-uttryck definierar ett schema med 5 faelt.',
    faq2q: 'Vad betyder */5?', faq2a: '*/5 betyder var 5:e vaerde.',
    faq3q: 'Bara vardagar?', faq3a: 'Anvaend 1-5 i veckodagsfaltet.',
    faq4q: 'Maanadsnamn?', faq4a: 'Standard-cron anvaender siffror.',
    faq5q: 'Aer det gratis?', faq5a: 'Ja, helt gratis.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'Crontab Guru', description: 'Bygg og forstaa cron-uttrykk interaktivt.',
    expression: 'Cron-uttrykk', minute: 'Minutt', hour: 'Time', dayMonth: 'Dag (Maaned)', month: 'Maaned', dayWeek: 'Dag (Uke)',
    explanation: 'Forklaring', nextRuns: 'Neste 5 kjoeringer', presets: 'Vanlige presets',
    everyMinute: 'Hvert minutt', everyHour: 'Hver time', everyDay: 'Daglig ved midnatt', everyWeekday: 'Ukedager kl 9', everyMonday: 'Hver mandag kl 8',
    everyMonth: 'Foerste i maaneden', every5min: 'Hvert 5. min', every15min: 'Hvert 15. min', every30min: 'Hvert 30. min', everyNight: 'Hver natt kl 2',
    valid: 'Gyldig', invalid: 'Ugyldig uttrykk', fieldRef: 'Feltreferanse',
    introTitle: 'Gratis cron-uttrykksbygger', introText: 'Bygg og forstaa cron-uttrykk med dette interaktive verktoeyet.',
    tipTitle: 'Tips', tip1: '* for alle verdier', tip2: 'Omraader med bindestrek: 1-5', tip3: 'Lister med komma: 1,3,5', tip4: 'Ukedag: 0=Soendag', tip5: 'Maaned fra 1 til 12',
    faqTitle: 'FAQ', faq1q: 'Hva er et cron-uttrykk?', faq1a: 'Et cron-uttrykk definerer en tidsplan med 5 felt.',
    faq2q: 'Hva betyr */5?', faq2a: '*/5 betyr hver 5. verdi.',
    faq3q: 'Bare ukedager?', faq3a: 'Bruk 1-5 i ukedagsfeltet.',
    faq4q: 'Maanedsnavn?', faq4a: 'Standard cron bruker tall.',
    faq5q: 'Er det gratis?', faq5a: 'Ja, helt gratis.',
    relatedTitle: 'Relaterte verktoy',
  },
  ja: {
    title: 'Crontab Guru', description: 'Cron式をインタラクティブに構築・理解。',
    expression: 'Cron 式', minute: '分', hour: '時', dayMonth: '日', month: '月', dayWeek: '曜日',
    explanation: '説明', nextRuns: '次の5回の実行時刻', presets: 'よく使うプリセット',
    everyMinute: '毎分', everyHour: '毎時', everyDay: '毎日深夜', everyWeekday: '平日9時', everyMonday: '毎週月曜8時',
    everyMonth: '毎月1日', every5min: '5分毎', every15min: '15分毎', every30min: '30分毎', everyNight: '毎晩2時',
    valid: '有効', invalid: '無効な式', fieldRef: 'フィールド参照',
    introTitle: '無料Cron式ビルダー', introText: 'このインタラクティブツールでCron式を構築・理解できます。',
    tipTitle: 'ヒント', tip1: '* は全ての値、*/n はn番目毎', tip2: '範囲はハイフン: 1-5', tip3: 'リストはカンマ: 1,3,5', tip4: '曜日: 0=日曜', tip5: '月は1から12',
    faqTitle: 'FAQ', faq1q: 'Cron式とは？', faq1a: 'Cron式は5つのフィールドでスケジュールを定義する文字列です。',
    faq2q: '*/5の意味は？', faq2a: '*/5は5番目毎の値を意味します。',
    faq3q: '平日だけ実行するには？', faq3a: '曜日フィールドに1-5を使います。',
    faq4q: '月名は使える？', faq4a: '標準的なcronは数字を使います。',
    faq5q: '無料ですか？', faq5a: 'はい、完全に無料です。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'Crontab Guru', description: '대화형으로 cron 표현식을 구축하고 이해합니다.',
    expression: 'Cron 표현식', minute: '분', hour: '시', dayMonth: '일', month: '월', dayWeek: '요일',
    explanation: '설명', nextRuns: '다음 5회 실행 시간', presets: '일반 프리셋',
    everyMinute: '매분', everyHour: '매시', everyDay: '매일 자정', everyWeekday: '평일 오전 9시', everyMonday: '매주 월요일 오전 8시',
    everyMonth: '매월 1일', every5min: '5분마다', every15min: '15분마다', every30min: '30분마다', everyNight: '매일 밤 2시',
    valid: '유효', invalid: '잘못된 표현식', fieldRef: '필드 참조',
    introTitle: '무료 Cron 표현식 빌더', introText: '이 대화형 도구로 Cron 표현식을 구축하고 이해하세요.',
    tipTitle: '팁', tip1: '* 는 모든 값, */n 은 n번째마다', tip2: '범위는 하이픈: 1-5', tip3: '목록은 쉼표: 1,3,5', tip4: '요일: 0=일요일', tip5: '월은 1부터 12까지',
    faqTitle: 'FAQ', faq1q: 'Cron 표현식이란?', faq1a: 'Cron 표현식은 5개 필드로 스케줄을 정의하는 문자열입니다.',
    faq2q: '*/5의 의미는?', faq2a: '*/5는 5번째마다를 의미합니다.',
    faq3q: '평일만 실행하려면?', faq3a: '요일 필드에 1-5를 사용합니다.',
    faq4q: '월 이름 사용 가능?', faq4a: '표준 cron은 숫자를 사용합니다.',
    faq5q: '무료인가요?', faq5a: '네, 완전히 무료입니다.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Crontab Guru', description: 'Bangun dan pahami ekspresi cron secara interaktif.',
    expression: 'Ekspresi Cron', minute: 'Menit', hour: 'Jam', dayMonth: 'Hari (Bulan)', month: 'Bulan', dayWeek: 'Hari (Minggu)',
    explanation: 'Penjelasan', nextRuns: '5 eksekusi berikutnya', presets: 'Preset umum',
    everyMinute: 'Setiap menit', everyHour: 'Setiap jam', everyDay: 'Setiap hari tengah malam', everyWeekday: 'Hari kerja jam 9', everyMonday: 'Setiap Senin jam 8',
    everyMonth: 'Awal bulan', every5min: 'Setiap 5 menit', every15min: 'Setiap 15 menit', every30min: 'Setiap 30 menit', everyNight: 'Setiap malam jam 2',
    valid: 'Valid', invalid: 'Ekspresi tidak valid', fieldRef: 'Referensi field',
    introTitle: 'Pembuat ekspresi cron gratis', introText: 'Bangun dan pahami ekspresi cron dengan alat interaktif ini.',
    tipTitle: 'Tips', tip1: '* untuk semua nilai', tip2: 'Rentang dengan tanda hubung: 1-5', tip3: 'Daftar dengan koma: 1,3,5', tip4: 'Hari minggu: 0=Minggu', tip5: 'Bulan dari 1 sampai 12',
    faqTitle: 'FAQ', faq1q: 'Apa itu ekspresi cron?', faq1a: 'Ekspresi cron mendefinisikan jadwal dengan 5 field.',
    faq2q: 'Apa arti */5?', faq2a: '*/5 berarti setiap nilai ke-5.',
    faq3q: 'Hanya hari kerja?', faq3a: 'Gunakan 1-5 di field hari minggu.',
    faq4q: 'Nama bulan?', faq4a: 'Cron standar menggunakan angka.',
    faq5q: 'Apakah gratis?', faq5a: 'Ya, sepenuhnya gratis.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'Crontab Guru', description: 'สร้างและทำความเข้าใจ cron expression แบบอินเทอร์แอคทีฟ',
    expression: 'Cron Expression', minute: 'นาที', hour: 'ชั่วโมง', dayMonth: 'วัน (เดือน)', month: 'เดือน', dayWeek: 'วัน (สัปดาห์)',
    explanation: 'คำอธิบาย', nextRuns: '5 การทำงานถัดไป', presets: 'พรีเซ็ตทั่วไป',
    everyMinute: 'ทุกนาที', everyHour: 'ทุกชั่วโมง', everyDay: 'ทุกวันเที่ยงคืน', everyWeekday: 'วันทำงาน 9 โมง', everyMonday: 'ทุกวันจันทร์ 8 โมง',
    everyMonth: 'วันแรกของเดือน', every5min: 'ทุก 5 นาที', every15min: 'ทุก 15 นาที', every30min: 'ทุก 30 นาที', everyNight: 'ทุกคืน ตี 2',
    valid: 'ถูกต้อง', invalid: 'นิพจน์ไม่ถูกต้อง', fieldRef: 'อ้างอิงฟิลด์',
    introTitle: 'เครื่องมือสร้าง Cron Expression ฟรี', introText: 'สร้างและทำความเข้าใจ cron expression ด้วยเครื่องมือนี้',
    tipTitle: 'เคล็ดลับ', tip1: '* สำหรับทุกค่า', tip2: 'ช่วงด้วยขีด: 1-5', tip3: 'รายการด้วยจุลภาค: 1,3,5', tip4: 'วันในสัปดาห์: 0=อาทิตย์', tip5: 'เดือนจาก 1 ถึง 12',
    faqTitle: 'คำถามที่พบบ่อย', faq1q: 'Cron expression คืออะไร?', faq1a: 'Cron expression เป็นสตริงที่กำหนดตารางเวลาด้วย 5 ฟิลด์',
    faq2q: '*/5 หมายถึงอะไร?', faq2a: '*/5 หมายถึงทุกค่าที่ 5',
    faq3q: 'เฉพาะวันทำงาน?', faq3a: 'ใช้ 1-5 ในฟิลด์วันในสัปดาห์',
    faq4q: 'ใช้ชื่อเดือนได้ไหม?', faq4a: 'Cron มาตรฐานใช้ตัวเลข',
    faq5q: 'ฟรีไหม?', faq5a: 'ใช่ ฟรีทั้งหมด',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

const PRESETS: { expr: string; key: string }[] = [
  { expr: '* * * * *', key: 'everyMinute' },
  { expr: '0 * * * *', key: 'everyHour' },
  { expr: '0 0 * * *', key: 'everyDay' },
  { expr: '0 9 * * 1-5', key: 'everyWeekday' },
  { expr: '0 8 * * 1', key: 'everyMonday' },
  { expr: '0 0 1 * *', key: 'everyMonth' },
  { expr: '*/5 * * * *', key: 'every5min' },
  { expr: '*/15 * * * *', key: 'every15min' },
  { expr: '*/30 * * * *', key: 'every30min' },
  { expr: '0 2 * * *', key: 'everyNight' },
];

const FIELD_LABELS = ['minute', 'hour', 'dayMonth', 'month', 'dayWeek'] as const;
const FIELD_RANGES: [number, number][] = [[0, 59], [0, 23], [1, 31], [1, 12], [0, 6]];
const MONTHS = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function parseField(field: string, min: number, max: number): number[] | null {
  const results = new Set<number>();
  for (const part of field.split(',')) {
    const stepMatch = part.match(/^(.+)\/(\d+)$/);
    let range: string, step = 1;
    if (stepMatch) { range = stepMatch[1]; step = parseInt(stepMatch[2]); if (step < 1) return null; }
    else { range = part; }
    if (range === '*') { for (let i = min; i <= max; i += step) results.add(i); }
    else if (range.includes('-')) {
      const [a, b] = range.split('-').map(Number);
      if (isNaN(a) || isNaN(b) || a < min || b > max || a > b) return null;
      for (let i = a; i <= b; i += step) results.add(i);
    } else {
      const v = parseInt(range);
      if (isNaN(v) || v < min || v > max) return null;
      if (step === 1) results.add(v);
      else { for (let i = v; i <= max; i += step) results.add(i); }
    }
  }
  return [...results].sort((a, b) => a - b);
}

function explainField(field: string, idx: number, t: Record<string, string>): string {
  const labels = [t.minute, t.hour, t.dayMonth, t.month, t.dayWeek];
  const label = labels[idx];
  if (field === '*') return `${label}: *`;
  return `${label}: ${field}`;
}

function getNextRuns(fields: string[], count: number): Date[] {
  const runs: Date[] = [];
  const parsed = fields.map((f, i) => parseField(f, FIELD_RANGES[i][0], FIELD_RANGES[i][1]));
  if (parsed.some(p => p === null || p.length === 0)) return runs;
  const [minutes, hours, days, months, weekdays] = parsed as number[][];
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, 0);
  let safety = 0;
  while (runs.length < count && safety < 525960) {
    safety++;
    if (months.includes(d.getMonth() + 1) && days.includes(d.getDate()) && weekdays.includes(d.getDay()) && hours.includes(d.getHours()) && minutes.includes(d.getMinutes())) {
      runs.push(new Date(d));
    }
    d.setMinutes(d.getMinutes() + 1);
  }
  return runs;
}

function describeCron(fields: string[], t: Record<string, string>): string {
  const [min, hr, dom, mon, dow] = fields;
  if (fields.join(' ') === '* * * * *') return t.everyMinute;
  const parts: string[] = [];
  fields.forEach((f, i) => { if (f !== '*') parts.push(explainField(f, i, t)); });
  return parts.join(' | ');
}

export default function CrontabGuru() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [fields, setFields] = useState(['*/5', '*', '*', '*', '*']);

  const expression = fields.join(' ');
  const parsed = fields.map((f, i) => parseField(f, FIELD_RANGES[i][0], FIELD_RANGES[i][1]));
  const isValid = parsed.every(p => p !== null && p.length > 0);
  const nextRuns = useMemo(() => isValid ? getNextRuns(fields, 5) : [], [fields, isValid]);
  const explanation = useMemo(() => isValid ? describeCron(fields, t) : t.invalid, [fields, isValid, t]);

  const setField = (idx: number, val: string) => {
    const next = [...fields];
    next[idx] = val;
    setFields(next);
  };

  const applyPreset = (expr: string) => setFields(expr.split(' '));

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="crontab-guru">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Expression display */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.expression}</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, padding: '2px 10px', borderRadius: 6, background: isValid ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: isValid ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
              {isValid ? t.valid : t.invalid}
            </span>
            <CopyButton text={expression} />
          </div>
        </div>
        <div style={{ background: '#0a0a0a', padding: '16px 20px', borderRadius: 8, border: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: 24, fontWeight: 700, color: isValid ? '#22c55e' : '#ef4444', textAlign: 'center', letterSpacing: 4 }}>
          {expression}
        </div>
      </div>

      {/* Field inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 16 }}>
        {FIELD_LABELS.map((key, i) => (
          <div key={key}>
            <label style={{ fontSize: 11, fontWeight: 600, display: 'block', marginBottom: 4, color: parsed[i] ? 'var(--text-primary)' : '#ef4444' }}>{t[key]}</label>
            <input type="text" value={fields[i]} onChange={e => setField(i, e.target.value)}
              style={{ width: '100%', padding: '8px 10px', fontSize: 14, borderRadius: 8, border: `1px solid ${parsed[i] ? 'var(--border-color)' : '#ef4444'}`, background: 'var(--bg-input)', color: 'var(--text-primary)', fontFamily: 'monospace', textAlign: 'center' }} />
            <div style={{ fontSize: 9, color: 'var(--text-secondary)', marginTop: 2, textAlign: 'center' }}>{FIELD_RANGES[i][0]}-{FIELD_RANGES[i][1]}</div>
          </div>
        ))}
      </div>

      {/* Explanation */}
      <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 8, background: 'var(--bg-input)', border: '1px solid var(--border-color)' }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{t.explanation}</label>
        <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{explanation}</div>
      </div>

      {/* Next runs */}
      {isValid && nextRuns.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.nextRuns}</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {nextRuns.map((d, i) => (
              <div key={i} style={{ padding: '8px 12px', borderRadius: 6, background: 'var(--bg-input)', border: '1px solid var(--border-color)', fontSize: 13, fontFamily: 'monospace', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>#{i + 1}</span>
                {d.toLocaleString()}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Presets */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.presets}</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 6 }}>
          {PRESETS.map(p => (
            <button key={p.expr} onClick={() => applyPreset(p.expr)}
              style={{ padding: '8px 12px', borderRadius: 8, fontSize: 12, cursor: 'pointer', border: expression === p.expr ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)', background: expression === p.expr ? 'rgba(59,130,246,0.1)' : 'var(--bg-input)', color: 'var(--text-primary)', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{t[p.key as keyof typeof t] || p.key}</span>
              <code style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{p.expr}</code>
            </button>
          ))}
        </div>
      </div>

      {/* Field reference */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.fieldRef}</label>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)' }}>Field</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)' }}>Range</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-secondary)' }}>Special</th>
              </tr>
            </thead>
            <tbody>
              {[
                [t.minute, '0-59', '* , - /'],
                [t.hour, '0-23', '* , - /'],
                [t.dayMonth, '1-31', '* , - /'],
                [t.month, '1-12', '* , - /'],
                [t.dayWeek, '0-6 (Sun=0)', '* , - /'],
              ].map(([f, r, s], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-primary)' }}>{f}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--accent-blue)' }}>{r}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/cron-expression`, label: 'Cron Expression Parser' },
            { href: `/${lang}/tools/unix-timestamp`, label: 'Unix Timestamp Converter' },
            { href: `/${lang}/tools/regex`, label: 'Regex Tester' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
