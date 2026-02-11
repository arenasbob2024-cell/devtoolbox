'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'SQL Joins Explained: A Visual Guide with Examples',
    intro: 'SQL joins are the backbone of relational databases. They let you combine data from two or more tables based on related columns. Despite being fundamental, joins remain one of the most confusing topics for developers. This guide uses visual diagrams and practical examples to make every join type crystal clear.',
    sampleDataTitle: 'Sample Data: Our Two Tables',
    sampleDataDesc: 'Throughout this guide, we will use these two simple tables:',
    innerJoinTitle: 'INNER JOIN',
    innerJoinDesc: 'Returns only the rows that have matching values in both tables. Think of it as the intersection of two sets.',
    innerJoinWhen: 'Use when you only want records that exist in both tables.',
    leftJoinTitle: 'LEFT JOIN (LEFT OUTER JOIN)',
    leftJoinDesc: 'Returns all rows from the left table and matching rows from the right table. If there is no match, NULL values are returned for right table columns.',
    leftJoinWhen: 'Use when you need all records from the left table, regardless of whether they have matches.',
    rightJoinTitle: 'RIGHT JOIN (RIGHT OUTER JOIN)',
    rightJoinDesc: 'Returns all rows from the right table and matching rows from the left table. If there is no match, NULL values are returned for left table columns.',
    rightJoinWhen: 'Use when you need all records from the right table, regardless of whether they have matches.',
    fullJoinTitle: 'FULL OUTER JOIN',
    fullJoinDesc: 'Returns all rows from both tables. Where there is no match, NULL values fill in the missing side.',
    fullJoinWhen: 'Use when you need all records from both tables, including unmatched rows on either side.',
    crossJoinTitle: 'CROSS JOIN',
    crossJoinDesc: 'Returns the Cartesian product of both tables — every row from the left table is combined with every row from the right table. No ON clause is needed.',
    crossJoinWhen: 'Use for generating combinations, test data, or calendar grids. Avoid on large tables.',
    selfJoinTitle: 'Self JOIN',
    selfJoinDesc: 'A table joined with itself. Useful for hierarchical data or comparing rows within the same table.',
    selfJoinWhen: 'Use for employee-manager relationships, hierarchical categories, or row comparisons.',
    comparisonTitle: 'Which Join to Use? Quick Reference',
    perfTitle: 'Performance Tips',
    perfTip1: 'Always index your JOIN columns — this is the single biggest performance improvement.',
    perfTip2: 'Avoid SELECT * in production queries. Select only the columns you need.',
    perfTip3: 'Put the smaller table first in the FROM clause when possible (though most optimizers handle this).',
    perfTip4: 'Use EXPLAIN ANALYZE to inspect your query execution plan.',
    perfTip5: 'Prefer EXISTS over IN for correlated subqueries — it short-circuits on the first match.',
    perfTip6: 'Avoid joining on expressions or functions (e.g., JOIN ON LOWER(a.name) = LOWER(b.name)) — indexes cannot be used.',
    mistakesTitle: 'Common Mistakes',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the difference between INNER JOIN and OUTER JOIN?',
    faq1a: 'INNER JOIN returns only matching rows from both tables. OUTER JOIN (LEFT, RIGHT, or FULL) also includes unmatched rows from one or both tables, filling missing values with NULL.',
    faq2q: 'Can I join more than two tables?',
    faq2a: 'Yes. You can chain multiple JOINs. For example: SELECT * FROM A JOIN B ON A.id = B.a_id JOIN C ON B.id = C.b_id. There is no practical limit.',
    faq3q: 'What happens when I forget the ON clause in an INNER JOIN?',
    faq3a: 'In most SQL dialects, omitting the ON clause in an INNER JOIN will result in a syntax error. In some dialects, it may produce a CROSS JOIN (Cartesian product), which can return a huge number of rows.',
    faq4q: 'Is LEFT JOIN the same as LEFT OUTER JOIN?',
    faq4a: 'Yes. The OUTER keyword is optional. LEFT JOIN and LEFT OUTER JOIN are identical in all major SQL databases.',
    faq5q: 'Which join is the fastest?',
    faq5a: 'INNER JOIN is generally the fastest because it only processes matching rows. However, actual performance depends on indexes, table sizes, and the query optimizer. Always measure with EXPLAIN.',
    faq6q: 'What is a NATURAL JOIN?',
    faq6a: 'A NATURAL JOIN automatically joins on columns with the same name in both tables. It is generally discouraged in production because adding a column can silently change the join behavior.',
    joinType: 'Join Type',
    returns: 'Returns',
    useCase: 'Best Use Case',
    mistake: 'Mistake',
    problem: 'Problem',
    fix: 'Fix',
    result: 'Result',
  },
  zh: {
    title: 'SQL Join 详解：图解指南与实战示例',
    intro: 'SQL 连接是关系型数据库的核心。它允许你根据关联列将两个或多个表的数据组合在一起。尽管连接是基础概念，但对很多开发者来说仍然令人困惑。本指南通过可视化图表和实际示例，让每种连接类型都变得清晰易懂。',
    sampleDataTitle: '示例数据：两张表',
    sampleDataDesc: '本指南中，我们将使用以下两张简单的表：',
    innerJoinTitle: 'INNER JOIN（内连接）',
    innerJoinDesc: '只返回两张表中都有匹配值的行。可以理解为两个集合的交集。',
    innerJoinWhen: '当你只需要两张表中都存在的记录时使用。',
    leftJoinTitle: 'LEFT JOIN（左外连接）',
    leftJoinDesc: '返回左表的所有行和右表的匹配行。如果没有匹配，右表列返回 NULL。',
    leftJoinWhen: '当你需要左表的所有记录时使用，不管它们是否有匹配。',
    rightJoinTitle: 'RIGHT JOIN（右外连接）',
    rightJoinDesc: '返回右表的所有行和左表的匹配行。如果没有匹配，左表列返回 NULL。',
    rightJoinWhen: '当你需要右表的所有记录时使用。',
    fullJoinTitle: 'FULL OUTER JOIN（全外连接）',
    fullJoinDesc: '返回两张表的所有行。没有匹配的地方用 NULL 填充。',
    fullJoinWhen: '当你需要两张表的所有记录，包括不匹配的行时使用。',
    crossJoinTitle: 'CROSS JOIN（交叉连接）',
    crossJoinDesc: '返回两张表的笛卡尔积——左表的每一行与右表的每一行组合。不需要 ON 子句。',
    crossJoinWhen: '用于生成组合、测试数据或日历网格。避免在大表上使用。',
    selfJoinTitle: '自连接（Self JOIN）',
    selfJoinDesc: '表与自身连接。适用于层级数据或同一表内的行比较。',
    selfJoinWhen: '用于员工-经理关系、层级分类或行间比较。',
    comparisonTitle: '用哪种连接？速查表',
    perfTitle: '性能优化技巧',
    perfTip1: '始终为 JOIN 列创建索引——这是最大的性能提升。',
    perfTip2: '生产环境避免 SELECT *，只查询需要的列。',
    perfTip3: '尽量将小表放在 FROM 子句前面（虽然大多数优化器会自动处理）。',
    perfTip4: '使用 EXPLAIN ANALYZE 检查查询执行计划。',
    perfTip5: '对关联子查询优先使用 EXISTS 而不是 IN——它在第一次匹配时就会停止。',
    perfTip6: '避免在表达式或函数上连接（如 JOIN ON LOWER(a.name) = LOWER(b.name)）——无法使用索引。',
    mistakesTitle: '常见错误',
    faqTitle: '常见问题',
    faq1q: 'INNER JOIN 和 OUTER JOIN 有什么区别？',
    faq1a: 'INNER JOIN 只返回两张表中匹配的行。OUTER JOIN（LEFT、RIGHT 或 FULL）还包含一个或两个表中不匹配的行，用 NULL 填充缺失值。',
    faq2q: '可以连接两张以上的表吗？',
    faq2a: '可以。你可以链式使用多个 JOIN。例如：SELECT * FROM A JOIN B ON A.id = B.a_id JOIN C ON B.id = C.b_id。没有实际限制。',
    faq3q: 'INNER JOIN 忘记写 ON 子句会怎样？',
    faq3a: '在大多数 SQL 方言中，INNER JOIN 缺少 ON 子句会导致语法错误。在某些方言中，可能产生 CROSS JOIN（笛卡尔积），返回大量行。',
    faq4q: 'LEFT JOIN 和 LEFT OUTER JOIN 一样吗？',
    faq4a: '是的。OUTER 关键字是可选的。在所有主流 SQL 数据库中，LEFT JOIN 和 LEFT OUTER JOIN 完全相同。',
    faq5q: '哪种连接最快？',
    faq5a: 'INNER JOIN 通常最快，因为它只处理匹配的行。但实际性能取决于索引、表大小和查询优化器。始终使用 EXPLAIN 测量。',
    faq6q: '什么是 NATURAL JOIN？',
    faq6a: 'NATURAL JOIN 自动在两个表中同名的列上进行连接。生产环境中通常不建议使用，因为添加列可能会悄悄改变连接行为。',
    joinType: '连接类型',
    returns: '返回内容',
    useCase: '最佳使用场景',
    mistake: '错误',
    problem: '问题',
    fix: '修复方法',
    result: '结果',
  },
  ja: {
    title: 'SQL Joinを図解で完全理解：実例付きビジュアルガイド',
    intro: 'SQL結合はリレーショナルデータベースの基盤です。関連する列に基づいて、2つ以上のテーブルからデータを組み合わせることができます。基本的な概念でありながら、多くの開発者にとって最も混乱するトピックの1つです。このガイドではビジュアル図と実用的な例を使って、各結合タイプを明確に解説します。',
    sampleDataTitle: 'サンプルデータ：2つのテーブル',
    sampleDataDesc: 'このガイドでは、以下の2つのシンプルなテーブルを使用します：',
    innerJoinTitle: 'INNER JOIN（内部結合）',
    innerJoinDesc: '両方のテーブルで一致する値を持つ行のみを返します。2つの集合の共通部分と考えてください。',
    innerJoinWhen: '両方のテーブルに存在するレコードだけが必要な場合に使用します。',
    leftJoinTitle: 'LEFT JOIN（左外部結合）',
    leftJoinDesc: '左テーブルの全行と右テーブルの一致する行を返します。一致がない場合、右テーブルの列はNULLになります。',
    leftJoinWhen: '一致があるかどうかに関係なく、左テーブルの全レコードが必要な場合に使用します。',
    rightJoinTitle: 'RIGHT JOIN（右外部結合）',
    rightJoinDesc: '右テーブルの全行と左テーブルの一致する行を返します。一致がない場合、左テーブルの列はNULLになります。',
    rightJoinWhen: '右テーブルの全レコードが必要な場合に使用します。',
    fullJoinTitle: 'FULL OUTER JOIN（完全外部結合）',
    fullJoinDesc: '両方のテーブルの全行を返します。一致がない場合はNULLで埋めます。',
    fullJoinWhen: '両方のテーブルの全レコードが必要な場合に使用します。',
    crossJoinTitle: 'CROSS JOIN（クロス結合）',
    crossJoinDesc: '両テーブルのデカルト積を返します。ON句は不要です。',
    crossJoinWhen: '組み合わせの生成、テストデータ、カレンダーグリッドに使用します。大きなテーブルでは避けてください。',
    selfJoinTitle: '自己結合（Self JOIN）',
    selfJoinDesc: 'テーブルを自分自身と結合します。階層データや同じテーブル内の行比較に便利です。',
    selfJoinWhen: '従業員とマネージャーの関係、階層カテゴリ、行の比較に使用します。',
    comparisonTitle: 'どの結合を使うべき？クイックリファレンス',
    perfTitle: 'パフォーマンスのヒント',
    perfTip1: 'JOIN列には必ずインデックスを作成してください。',
    perfTip2: '本番クエリではSELECT *を避け、必要な列のみ選択。',
    perfTip3: '可能であれば小さいテーブルをFROM句の先頭に配置。',
    perfTip4: 'EXPLAIN ANALYZEでクエリ実行計画を確認。',
    perfTip5: '相関サブクエリではINよりEXISTSを優先。',
    perfTip6: '式や関数での結合を避ける（インデックスが使えなくなる）。',
    mistakesTitle: 'よくある間違い',
    faqTitle: 'よくある質問',
    faq1q: 'INNER JOINとOUTER JOINの違いは？',
    faq1a: 'INNER JOINは両テーブルの一致する行のみ返します。OUTER JOINは一致しない行も含め、NULLで埋めます。',
    faq2q: '3つ以上のテーブルを結合できますか？',
    faq2a: 'はい。複数のJOINをチェーンできます。実質的な制限はありません。',
    faq3q: 'INNER JOINでON句を忘れるとどうなりますか？',
    faq3a: 'ほとんどのSQL方言では構文エラーになります。一部ではCROSS JOINになる可能性があります。',
    faq4q: 'LEFT JOINとLEFT OUTER JOINは同じですか？',
    faq4a: 'はい。OUTERキーワードはオプションです。全く同じです。',
    faq5q: 'どの結合が最も速いですか？',
    faq5a: 'INNER JOINは一般的に最速です。しかし実際のパフォーマンスはインデックス、テーブルサイズ、オプティマイザに依存します。',
    faq6q: 'NATURAL JOINとは何ですか？',
    faq6a: '同名の列で自動的に結合します。列の追加で動作が変わる可能性があるため、本番では非推奨です。',
    joinType: '結合タイプ',
    returns: '返す内容',
    useCase: '最適な使用場面',
    mistake: '間違い',
    problem: '問題',
    fix: '修正方法',
    result: '結果',
  },
  ko: {
    title: 'SQL Join 완벽 가이드: 시각적 설명과 예제',
    intro: 'SQL 조인은 관계형 데이터베이스의 핵심입니다. 관련 열을 기반으로 두 개 이상의 테이블에서 데이터를 결합할 수 있습니다. 기본적인 개념임에도 많은 개발자에게 가장 혼란스러운 주제 중 하나입니다. 이 가이드는 시각적 다이어그램과 실용적인 예제를 사용하여 각 조인 유형을 명확하게 설명합니다.',
    sampleDataTitle: '샘플 데이터: 두 개의 테이블',
    sampleDataDesc: '이 가이드에서는 다음 두 개의 간단한 테이블을 사용합니다:',
    innerJoinTitle: 'INNER JOIN (내부 조인)',
    innerJoinDesc: '두 테이블 모두에서 일치하는 값이 있는 행만 반환합니다. 두 집합의 교집합으로 생각하세요.',
    innerJoinWhen: '두 테이블 모두에 존재하는 레코드만 필요할 때 사용합니다.',
    leftJoinTitle: 'LEFT JOIN (왼쪽 외부 조인)',
    leftJoinDesc: '왼쪽 테이블의 모든 행과 오른쪽 테이블의 일치하는 행을 반환합니다. 일치하지 않으면 NULL이 반환됩니다.',
    leftJoinWhen: '일치 여부와 관계없이 왼쪽 테이블의 모든 레코드가 필요할 때 사용합니다.',
    rightJoinTitle: 'RIGHT JOIN (오른쪽 외부 조인)',
    rightJoinDesc: '오른쪽 테이블의 모든 행과 왼쪽 테이블의 일치하는 행을 반환합니다.',
    rightJoinWhen: '오른쪽 테이블의 모든 레코드가 필요할 때 사용합니다.',
    fullJoinTitle: 'FULL OUTER JOIN (완전 외부 조인)',
    fullJoinDesc: '두 테이블의 모든 행을 반환합니다. 일치하지 않는 곳은 NULL로 채웁니다.',
    fullJoinWhen: '두 테이블의 모든 레코드가 필요할 때 사용합니다.',
    crossJoinTitle: 'CROSS JOIN (교차 조인)',
    crossJoinDesc: '두 테이블의 카르테시안 곱을 반환합니다. ON 절이 필요 없습니다.',
    crossJoinWhen: '조합 생성, 테스트 데이터, 캘린더 그리드에 사용합니다.',
    selfJoinTitle: '셀프 조인 (Self JOIN)',
    selfJoinDesc: '테이블을 자기 자신과 조인합니다. 계층 데이터나 같은 테이블 내 행 비교에 유용합니다.',
    selfJoinWhen: '직원-관리자 관계, 계층적 카테고리, 행 비교에 사용합니다.',
    comparisonTitle: '어떤 조인을 사용할까? 빠른 참조',
    perfTitle: '성능 팁',
    perfTip1: 'JOIN 열에는 항상 인덱스를 생성하세요.',
    perfTip2: '프로덕션에서는 SELECT *를 피하고 필요한 열만 선택하세요.',
    perfTip3: '가능하면 작은 테이블을 FROM 절 앞에 배치하세요.',
    perfTip4: 'EXPLAIN ANALYZE로 쿼리 실행 계획을 확인하세요.',
    perfTip5: '상관 서브쿼리에서는 IN보다 EXISTS를 사용하세요.',
    perfTip6: '표현식이나 함수에서의 조인을 피하세요 (인덱스 사용 불가).',
    mistakesTitle: '흔한 실수',
    faqTitle: '자주 묻는 질문',
    faq1q: 'INNER JOIN과 OUTER JOIN의 차이는?',
    faq1a: 'INNER JOIN은 일치하는 행만 반환합니다. OUTER JOIN은 일치하지 않는 행도 포함하며 NULL로 채웁니다.',
    faq2q: '3개 이상의 테이블을 조인할 수 있나요?',
    faq2a: '네. 여러 JOIN을 체이닝할 수 있습니다. 실질적인 제한은 없습니다.',
    faq3q: 'INNER JOIN에서 ON 절을 빠뜨리면?',
    faq3a: '대부분의 SQL에서 구문 오류가 발생합니다. 일부에서는 CROSS JOIN이 될 수 있습니다.',
    faq4q: 'LEFT JOIN과 LEFT OUTER JOIN은 같나요?',
    faq4a: '네. OUTER 키워드는 선택 사항입니다. 완전히 동일합니다.',
    faq5q: '어떤 조인이 가장 빠른가요?',
    faq5a: 'INNER JOIN이 일반적으로 가장 빠릅니다. 하지만 실제 성능은 인덱스, 테이블 크기, 옵티마이저에 따라 다릅니다.',
    faq6q: 'NATURAL JOIN이란?',
    faq6a: '같은 이름의 열에서 자동으로 조인합니다. 열 추가 시 동작이 변경될 수 있어 프로덕션에서는 비권장입니다.',
    joinType: '조인 유형',
    returns: '반환 내용',
    useCase: '최적 사용 사례',
    mistake: '실수',
    problem: '문제',
    fix: '해결',
    result: '결과',
  },
  fr: {
    title: 'Les jointures SQL expliquées : Guide visuel avec exemples',
    intro: 'Les jointures SQL sont le fondement des bases de données relationnelles. Elles vous permettent de combiner des données de deux ou plusieurs tables basées sur des colonnes liées. Ce guide utilise des diagrammes visuels et des exemples pratiques pour clarifier chaque type de jointure.',
    sampleDataTitle: 'Données d\'exemple : Nos deux tables',
    sampleDataDesc: 'Dans ce guide, nous utiliserons ces deux tables simples :',
    innerJoinTitle: 'INNER JOIN (Jointure interne)',
    innerJoinDesc: 'Retourne uniquement les lignes qui ont des valeurs correspondantes dans les deux tables. C\'est l\'intersection de deux ensembles.',
    innerJoinWhen: 'Utilisez quand vous ne voulez que les enregistrements existant dans les deux tables.',
    leftJoinTitle: 'LEFT JOIN (Jointure externe gauche)',
    leftJoinDesc: 'Retourne toutes les lignes de la table gauche et les lignes correspondantes de la table droite. Sans correspondance, les colonnes droites sont NULL.',
    leftJoinWhen: 'Utilisez quand vous avez besoin de tous les enregistrements de la table gauche.',
    rightJoinTitle: 'RIGHT JOIN (Jointure externe droite)',
    rightJoinDesc: 'Retourne toutes les lignes de la table droite et les lignes correspondantes de la table gauche.',
    rightJoinWhen: 'Utilisez quand vous avez besoin de tous les enregistrements de la table droite.',
    fullJoinTitle: 'FULL OUTER JOIN (Jointure externe complète)',
    fullJoinDesc: 'Retourne toutes les lignes des deux tables. Les valeurs manquantes sont remplies avec NULL.',
    fullJoinWhen: 'Utilisez quand vous avez besoin de tous les enregistrements des deux tables.',
    crossJoinTitle: 'CROSS JOIN (Jointure croisée)',
    crossJoinDesc: 'Retourne le produit cartésien des deux tables. Pas de clause ON nécessaire.',
    crossJoinWhen: 'Utilisez pour générer des combinaisons ou des données de test.',
    selfJoinTitle: 'Auto-jointure (Self JOIN)',
    selfJoinDesc: 'Une table jointe avec elle-même. Utile pour les données hiérarchiques.',
    selfJoinWhen: 'Utilisez pour les relations employé-manager ou les catégories hiérarchiques.',
    comparisonTitle: 'Quelle jointure utiliser ? Référence rapide',
    perfTitle: 'Conseils de performance',
    perfTip1: 'Indexez toujours vos colonnes de JOIN.',
    perfTip2: 'Évitez SELECT * en production.',
    perfTip3: 'Placez la plus petite table en premier dans FROM.',
    perfTip4: 'Utilisez EXPLAIN ANALYZE pour inspecter le plan d\'exécution.',
    perfTip5: 'Préférez EXISTS à IN pour les sous-requêtes corrélées.',
    perfTip6: 'Évitez les jointures sur des expressions ou fonctions.',
    mistakesTitle: 'Erreurs courantes',
    faqTitle: 'Questions fréquemment posées',
    faq1q: 'Quelle est la différence entre INNER JOIN et OUTER JOIN ?',
    faq1a: 'INNER JOIN retourne uniquement les lignes correspondantes. OUTER JOIN inclut aussi les lignes non correspondantes avec des NULL.',
    faq2q: 'Peut-on joindre plus de deux tables ?',
    faq2a: 'Oui. Vous pouvez chaîner plusieurs JOINs sans limite pratique.',
    faq3q: 'Que se passe-t-il si j\'oublie la clause ON ?',
    faq3a: 'Dans la plupart des dialectes SQL, cela provoque une erreur de syntaxe.',
    faq4q: 'LEFT JOIN et LEFT OUTER JOIN sont-ils identiques ?',
    faq4a: 'Oui. Le mot-clé OUTER est optionnel.',
    faq5q: 'Quelle jointure est la plus rapide ?',
    faq5a: 'INNER JOIN est généralement la plus rapide. La performance réelle dépend des index et de l\'optimiseur.',
    faq6q: 'Qu\'est-ce qu\'un NATURAL JOIN ?',
    faq6a: 'Un NATURAL JOIN joint automatiquement sur les colonnes de même nom. Déconseillé en production.',
    joinType: 'Type de jointure',
    returns: 'Retourne',
    useCase: 'Cas d\'utilisation',
    mistake: 'Erreur',
    problem: 'Problème',
    fix: 'Solution',
    result: 'Résultat',
  },
  de: {
    title: 'SQL Joins erklärt: Ein visueller Leitfaden mit Beispielen',
    intro: 'SQL Joins sind das Rückgrat relationaler Datenbanken. Sie ermöglichen es, Daten aus zwei oder mehr Tabellen basierend auf verwandten Spalten zu kombinieren. Dieser Leitfaden verwendet visuelle Diagramme und praktische Beispiele, um jeden Join-Typ klar zu erklären.',
    sampleDataTitle: 'Beispieldaten: Unsere zwei Tabellen',
    sampleDataDesc: 'In diesem Leitfaden verwenden wir diese zwei einfachen Tabellen:',
    innerJoinTitle: 'INNER JOIN',
    innerJoinDesc: 'Gibt nur Zeilen zurück, die in beiden Tabellen übereinstimmende Werte haben.',
    innerJoinWhen: 'Verwenden Sie es, wenn Sie nur Datensätze benötigen, die in beiden Tabellen existieren.',
    leftJoinTitle: 'LEFT JOIN',
    leftJoinDesc: 'Gibt alle Zeilen der linken Tabelle und übereinstimmende Zeilen der rechten Tabelle zurück.',
    leftJoinWhen: 'Verwenden Sie es, wenn Sie alle Datensätze der linken Tabelle benötigen.',
    rightJoinTitle: 'RIGHT JOIN',
    rightJoinDesc: 'Gibt alle Zeilen der rechten Tabelle und übereinstimmende Zeilen der linken Tabelle zurück.',
    rightJoinWhen: 'Verwenden Sie es, wenn Sie alle Datensätze der rechten Tabelle benötigen.',
    fullJoinTitle: 'FULL OUTER JOIN',
    fullJoinDesc: 'Gibt alle Zeilen beider Tabellen zurück. Fehlende Werte werden mit NULL gefüllt.',
    fullJoinWhen: 'Verwenden Sie es, wenn Sie alle Datensätze beider Tabellen benötigen.',
    crossJoinTitle: 'CROSS JOIN',
    crossJoinDesc: 'Gibt das kartesische Produkt beider Tabellen zurück. Keine ON-Klausel nötig.',
    crossJoinWhen: 'Für Kombinationen, Testdaten oder Kalenderraster.',
    selfJoinTitle: 'Self JOIN',
    selfJoinDesc: 'Eine Tabelle wird mit sich selbst verknüpft. Nützlich für hierarchische Daten.',
    selfJoinWhen: 'Für Mitarbeiter-Manager-Beziehungen oder Zeilenvergleiche.',
    comparisonTitle: 'Welchen Join verwenden? Kurzreferenz',
    perfTitle: 'Performance-Tipps',
    perfTip1: 'Erstellen Sie immer Indizes für JOIN-Spalten.',
    perfTip2: 'Vermeiden Sie SELECT * in Produktionsabfragen.',
    perfTip3: 'Platzieren Sie die kleinere Tabelle zuerst in FROM.',
    perfTip4: 'Verwenden Sie EXPLAIN ANALYZE zur Überprüfung.',
    perfTip5: 'Bevorzugen Sie EXISTS gegenüber IN bei korrelierten Unterabfragen.',
    perfTip6: 'Vermeiden Sie Joins auf Ausdrücken oder Funktionen.',
    mistakesTitle: 'Häufige Fehler',
    faqTitle: 'Häufig gestellte Fragen',
    faq1q: 'Was ist der Unterschied zwischen INNER JOIN und OUTER JOIN?',
    faq1a: 'INNER JOIN gibt nur übereinstimmende Zeilen zurück. OUTER JOIN enthält auch nicht übereinstimmende Zeilen mit NULL.',
    faq2q: 'Kann man mehr als zwei Tabellen joinen?',
    faq2a: 'Ja. Sie können mehrere JOINs verketten.',
    faq3q: 'Was passiert ohne ON-Klausel?',
    faq3a: 'In den meisten SQL-Dialekten ergibt das einen Syntaxfehler.',
    faq4q: 'Sind LEFT JOIN und LEFT OUTER JOIN identisch?',
    faq4a: 'Ja. Das OUTER-Schlüsselwort ist optional.',
    faq5q: 'Welcher Join ist am schnellsten?',
    faq5a: 'INNER JOIN ist in der Regel am schnellsten. Die tatsächliche Performance hängt von Indizes und dem Optimierer ab.',
    faq6q: 'Was ist ein NATURAL JOIN?',
    faq6a: 'Ein automatischer Join auf gleichnamigen Spalten. In Produktion nicht empfohlen.',
    joinType: 'Join-Typ',
    returns: 'Gibt zurück',
    useCase: 'Anwendungsfall',
    mistake: 'Fehler',
    problem: 'Problem',
    fix: 'Lösung',
    result: 'Ergebnis',
  },
  es: {
    title: 'SQL Joins explicados: Guía visual con ejemplos',
    intro: 'Los joins SQL son la base de las bases de datos relacionales. Permiten combinar datos de dos o más tablas basándose en columnas relacionadas. Esta guía utiliza diagramas visuales y ejemplos prácticos para aclarar cada tipo de join.',
    sampleDataTitle: 'Datos de ejemplo: Nuestras dos tablas',
    sampleDataDesc: 'En esta guía, usaremos estas dos tablas simples:',
    innerJoinTitle: 'INNER JOIN',
    innerJoinDesc: 'Devuelve solo las filas que tienen valores coincidentes en ambas tablas.',
    innerJoinWhen: 'Usa cuando solo necesitas registros que existen en ambas tablas.',
    leftJoinTitle: 'LEFT JOIN',
    leftJoinDesc: 'Devuelve todas las filas de la tabla izquierda y las filas coincidentes de la tabla derecha.',
    leftJoinWhen: 'Usa cuando necesitas todos los registros de la tabla izquierda.',
    rightJoinTitle: 'RIGHT JOIN',
    rightJoinDesc: 'Devuelve todas las filas de la tabla derecha y las filas coincidentes de la tabla izquierda.',
    rightJoinWhen: 'Usa cuando necesitas todos los registros de la tabla derecha.',
    fullJoinTitle: 'FULL OUTER JOIN',
    fullJoinDesc: 'Devuelve todas las filas de ambas tablas. Los valores faltantes se rellenan con NULL.',
    fullJoinWhen: 'Usa cuando necesitas todos los registros de ambas tablas.',
    crossJoinTitle: 'CROSS JOIN',
    crossJoinDesc: 'Devuelve el producto cartesiano de ambas tablas. No necesita cláusula ON.',
    crossJoinWhen: 'Para generar combinaciones o datos de prueba.',
    selfJoinTitle: 'Self JOIN (Auto-unión)',
    selfJoinDesc: 'Una tabla unida consigo misma. Útil para datos jerárquicos.',
    selfJoinWhen: 'Para relaciones empleado-gerente o comparaciones de filas.',
    comparisonTitle: '¿Qué join usar? Referencia rápida',
    perfTitle: 'Consejos de rendimiento',
    perfTip1: 'Siempre indexa tus columnas de JOIN.',
    perfTip2: 'Evita SELECT * en producción.',
    perfTip3: 'Coloca la tabla más pequeña primero en FROM.',
    perfTip4: 'Usa EXPLAIN ANALYZE para inspeccionar el plan de ejecución.',
    perfTip5: 'Prefiere EXISTS sobre IN para subconsultas correlacionadas.',
    perfTip6: 'Evita joins sobre expresiones o funciones.',
    mistakesTitle: 'Errores comunes',
    faqTitle: 'Preguntas frecuentes',
    faq1q: '¿Cuál es la diferencia entre INNER JOIN y OUTER JOIN?',
    faq1a: 'INNER JOIN solo devuelve filas coincidentes. OUTER JOIN también incluye filas no coincidentes con NULL.',
    faq2q: '¿Se pueden unir más de dos tablas?',
    faq2a: 'Sí. Puedes encadenar múltiples JOINs sin límite práctico.',
    faq3q: '¿Qué pasa si olvido la cláusula ON?',
    faq3a: 'En la mayoría de dialectos SQL, causa un error de sintaxis.',
    faq4q: '¿LEFT JOIN y LEFT OUTER JOIN son iguales?',
    faq4a: 'Sí. La palabra clave OUTER es opcional.',
    faq5q: '¿Qué join es más rápido?',
    faq5a: 'INNER JOIN es generalmente el más rápido. El rendimiento real depende de los índices y el optimizador.',
    faq6q: '¿Qué es NATURAL JOIN?',
    faq6a: 'Una unión automática en columnas con el mismo nombre. No recomendado en producción.',
    joinType: 'Tipo de Join',
    returns: 'Devuelve',
    useCase: 'Caso de uso',
    mistake: 'Error',
    problem: 'Problema',
    fix: 'Solución',
    result: 'Resultado',
  },
};

export default function SqlJoinsVisualGuide({ lang }: { lang: string }) {
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
      { '@type': 'Question', name: t.faq6q, acceptedAnswer: { '@type': 'Answer', text: t.faq6a } },
    ],
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p className="text-lg leading-relaxed mb-8">{t.intro}</p>

      {/* Sample Data */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.sampleDataTitle}</h2>
      <p className="mb-4">{t.sampleDataDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`-- employees table
+----+----------+---------------+
| id | name     | department_id |
+----+----------+---------------+
| 1  | Alice    | 1             |
| 2  | Bob      | 2             |
| 3  | Charlie  | 1             |
| 4  | Diana    | NULL          |
+----+----------+---------------+

-- departments table
+----+-------------+
| id | dept_name   |
+----+-------------+
| 1  | Engineering |
| 2  | Marketing   |
| 3  | Sales       |
+----+-------------+`}</code></pre>

      {/* INNER JOIN */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.innerJoinTitle}</h2>
      <p className="mb-4">{t.innerJoinDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`    Table A         Table B
  +---------+     +---------+
  |         |     |         |
  |    +----+-----+----+    |
  |    |  INNER JOIN   |    |
  |    +----+-----+----+    |
  |         |     |         |
  +---------+     +---------+`}</code></pre>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4"><code>{`SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;`}</code></pre>
      <p className="mt-2 mb-1 font-semibold">{t.result}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`+----------+-------------+
| name     | dept_name   |
+----------+-------------+
| Alice    | Engineering |
| Bob      | Marketing   |
| Charlie  | Engineering |
+----------+-------------+
-- Diana excluded (department_id is NULL)
-- Sales excluded (no employee in Sales)`}</code></pre>
      <p className="text-sm text-gray-400 mt-2">{t.innerJoinWhen}</p>

      {/* LEFT JOIN */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.leftJoinTitle}</h2>
      <p className="mb-4">{t.leftJoinDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`    Table A         Table B
  +---------+     +---------+
  |XXXXXXXXX|     |         |
  |XXXX+----+-----+----+    |
  |XXXX| LEFT JOIN XXXX|    |
  |XXXX+----+-----+----+    |
  |XXXXXXXXX|     |         |
  +---------+     +---------+
  (all of A + matching B)`}</code></pre>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4"><code>{`SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;`}</code></pre>
      <p className="mt-2 mb-1 font-semibold">{t.result}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`+----------+-------------+
| name     | dept_name   |
+----------+-------------+
| Alice    | Engineering |
| Bob      | Marketing   |
| Charlie  | Engineering |
| Diana    | NULL        |
+----------+-------------+
-- Diana included with NULL dept_name`}</code></pre>
      <p className="text-sm text-gray-400 mt-2">{t.leftJoinWhen}</p>

      {/* RIGHT JOIN */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.rightJoinTitle}</h2>
      <p className="mb-4">{t.rightJoinDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`    Table A         Table B
  +---------+     +---------+
  |         |     |XXXXXXXXX|
  |    +----+-----+XXXX+XXXX|
  |    |XXXX RIGHT JOINXXXX|
  |    +----+-----+XXXX+XXXX|
  |         |     |XXXXXXXXX|
  +---------+     +---------+
  (matching A + all of B)`}</code></pre>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4"><code>{`SELECT e.name, d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;`}</code></pre>
      <p className="mt-2 mb-1 font-semibold">{t.result}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`+----------+-------------+
| name     | dept_name   |
+----------+-------------+
| Alice    | Engineering |
| Charlie  | Engineering |
| Bob      | Marketing   |
| NULL     | Sales       |
+----------+-------------+
-- Sales included with NULL name`}</code></pre>
      <p className="text-sm text-gray-400 mt-2">{t.rightJoinWhen}</p>

      {/* FULL OUTER JOIN */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.fullJoinTitle}</h2>
      <p className="mb-4">{t.fullJoinDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`    Table A         Table B
  +---------+     +---------+
  |XXXXXXXXX|     |XXXXXXXXX|
  |XXXX+----+-----+XXXX+XXXX|
  |XXXX|FULL OUTER JOINXXXX|
  |XXXX+----+-----+XXXX+XXXX|
  |XXXXXXXXX|     |XXXXXXXXX|
  +---------+     +---------+
  (everything from both)`}</code></pre>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4"><code>{`SELECT e.name, d.dept_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;`}</code></pre>
      <p className="mt-2 mb-1 font-semibold">{t.result}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`+----------+-------------+
| name     | dept_name   |
+----------+-------------+
| Alice    | Engineering |
| Bob      | Marketing   |
| Charlie  | Engineering |
| Diana    | NULL        |
| NULL     | Sales       |
+----------+-------------+`}</code></pre>
      <p className="text-sm text-gray-400 mt-2">{t.fullJoinWhen}</p>

      {/* CROSS JOIN */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.crossJoinTitle}</h2>
      <p className="mb-4">{t.crossJoinDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4"><code>{`SELECT e.name, d.dept_name
FROM employees e
CROSS JOIN departments d;

-- Returns 4 × 3 = 12 rows`}</code></pre>
      <p className="mt-2 mb-1 font-semibold">{t.result}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`+----------+-------------+
| name     | dept_name   |
+----------+-------------+
| Alice    | Engineering |
| Alice    | Marketing   |
| Alice    | Sales       |
| Bob      | Engineering |
| Bob      | Marketing   |
| Bob      | Sales       |
| Charlie  | Engineering |
| Charlie  | Marketing   |
| Charlie  | Sales       |
| Diana    | Engineering |
| Diana    | Marketing   |
| Diana    | Sales       |
+----------+-------------+`}</code></pre>
      <p className="text-sm text-gray-400 mt-2">{t.crossJoinWhen}</p>

      {/* Self JOIN */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.selfJoinTitle}</h2>
      <p className="mb-4">{t.selfJoinDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`-- employees_v2 with manager_id column
+----+---------+------------+
| id | name    | manager_id |
+----+---------+------------+
| 1  | Alice   | NULL       |
| 2  | Bob     | 1          |
| 3  | Charlie | 1          |
| 4  | Diana   | 2          |
+----+---------+------------+

SELECT
  e.name AS employee,
  m.name AS manager
FROM employees_v2 e
LEFT JOIN employees_v2 m ON e.manager_id = m.id;`}</code></pre>
      <p className="mt-2 mb-1 font-semibold">{t.result}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`+----------+---------+
| employee | manager |
+----------+---------+
| Alice    | NULL    |
| Bob      | Alice   |
| Charlie  | Alice   |
| Diana    | Bob     |
+----------+---------+`}</code></pre>
      <p className="text-sm text-gray-400 mt-2">{t.selfJoinWhen}</p>

      {/* Comparison Table */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.comparisonTitle}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.joinType}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.returns}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.useCase}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-700 px-4 py-2 font-mono text-sm">INNER JOIN</td><td className="border border-gray-700 px-4 py-2">A ∩ B</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '只要匹配数据' : lang === 'ja' ? '一致データのみ' : lang === 'ko' ? '일치 데이터만' : 'Only matching data'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2 font-mono text-sm">LEFT JOIN</td><td className="border border-gray-700 px-4 py-2">A + (A ∩ B)</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '所有左表 + 匹配右表' : lang === 'ja' ? '左テーブル全部 + 一致' : lang === 'ko' ? '왼쪽 전체 + 일치' : 'All left + matching right'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2 font-mono text-sm">RIGHT JOIN</td><td className="border border-gray-700 px-4 py-2">(A ∩ B) + B</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '所有右表 + 匹配左表' : lang === 'ja' ? '右テーブル全部 + 一致' : lang === 'ko' ? '오른쪽 전체 + 일치' : 'All right + matching left'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2 font-mono text-sm">FULL OUTER JOIN</td><td className="border border-gray-700 px-4 py-2">A ∪ B</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '两表所有数据' : lang === 'ja' ? '両テーブルの全データ' : lang === 'ko' ? '두 테이블 전체' : 'Everything from both'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2 font-mono text-sm">CROSS JOIN</td><td className="border border-gray-700 px-4 py-2">A × B</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '生成所有组合' : lang === 'ja' ? '全組み合わせ' : lang === 'ko' ? '모든 조합 생성' : 'Generate all combinations'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2 font-mono text-sm">Self JOIN</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '取决于连接类型' : lang === 'ja' ? '結合タイプ依存' : lang === 'ko' ? '조인 유형에 따라' : 'Depends on join type'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '层级/自引用数据' : lang === 'ja' ? '階層/自己参照データ' : lang === 'ko' ? '계층/자기참조 데이터' : 'Hierarchical / self-referencing data'}</td></tr>
          </tbody>
        </table>
      </div>

      {/* Performance Tips */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.perfTitle}</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>{t.perfTip1}</li>
        <li>{t.perfTip2}</li>
        <li>{t.perfTip3}</li>
        <li>{t.perfTip4}</li>
        <li>{t.perfTip5}</li>
        <li>{t.perfTip6}</li>
      </ul>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4"><code>{`-- Create index on JOIN column
CREATE INDEX idx_emp_dept ON employees(department_id);

-- Use EXPLAIN to check query plan
EXPLAIN ANALYZE
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;`}</code></pre>

      {/* Common Mistakes */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.mistakesTitle}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.mistake}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.problem}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.fix}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-700 px-4 py-2 font-mono text-sm">{lang === 'zh' ? '使用 SELECT *' : 'Using SELECT *'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '返回不必要的列，浪费带宽和内存' : 'Returns unnecessary columns, wastes bandwidth'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '只选择需要的列' : 'Select only needed columns'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2 font-mono text-sm">{lang === 'zh' ? '缺少 JOIN 列索引' : 'Missing index on JOIN column'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '全表扫描导致查询极慢' : 'Full table scan, extremely slow'}</td><td className="border border-gray-700 px-4 py-2">CREATE INDEX</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2 font-mono text-sm">{lang === 'zh' ? 'NULL 比较陷阱' : 'NULL comparison trap'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? 'NULL = NULL 结果为 FALSE' : 'NULL = NULL evaluates to FALSE'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '使用 IS NULL 或 COALESCE' : 'Use IS NULL or COALESCE'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2 font-mono text-sm">{lang === 'zh' ? '笛卡尔积意外' : 'Accidental Cartesian product'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '缺少 ON 条件导致行数爆炸' : 'Missing ON condition, row explosion'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '始终检查 ON 子句' : 'Always verify ON clause'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2 font-mono text-sm">{lang === 'zh' ? '在 WHERE 中过滤 OUTER JOIN' : 'Filtering OUTER JOIN in WHERE'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? 'WHERE 过滤会把 LEFT JOIN 变成 INNER JOIN' : 'WHERE filter turns LEFT JOIN into INNER JOIN'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '将条件放在 ON 子句中' : 'Put conditions in ON clause'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2 font-mono text-sm">{lang === 'zh' ? '多余的 DISTINCT' : 'Unnecessary DISTINCT'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '掩盖了错误的 JOIN 逻辑' : 'Hides incorrect JOIN logic'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '修复 JOIN 条件而非加 DISTINCT' : 'Fix JOIN condition, don\'t add DISTINCT'}</td></tr>
            <tr><td className="border border-gray-700 px-4 py-2 font-mono text-sm">{lang === 'zh' ? '在函数上 JOIN' : 'Joining on functions'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '索引无法使用，强制全表扫描' : 'Index unusable, forces full scan'}</td><td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '存储规范化数据或使用计算列' : 'Store normalized data or use computed columns'}</td></tr>
          </tbody>
        </table>
      </div>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4"><code>{`-- ❌ Wrong: WHERE turns LEFT JOIN into INNER JOIN
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
WHERE d.dept_name = 'Engineering';   -- filters out NULLs!

-- ✅ Correct: Put condition in ON clause
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d
  ON e.department_id = d.id
  AND d.dept_name = 'Engineering';   -- preserves NULLs`}</code></pre>

      {/* FAQ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.faqTitle}</h2>
      <div className="space-y-6">
        {[
          [t.faq1q, t.faq1a], [t.faq2q, t.faq2a], [t.faq3q, t.faq3a],
          [t.faq4q, t.faq4a], [t.faq5q, t.faq5a], [t.faq6q, t.faq6a],
        ].map(([q, a], i) => (
          <div key={i} className="border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">{q}</h3>
            <p className="text-gray-300">{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
