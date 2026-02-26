'use client';
import Link from 'next/link';
import React from 'react';

const translations: Record<string, Record<string, string | string[]>> = {
  en: {
    title: 'Word Counter Online Guide: Character Limits, SEO Length, Reading Time & More',
    intro: 'Whether you are writing a tweet, crafting a meta description, drafting a college essay, or optimizing a blog post for search engines, knowing your word count and character count is essential. Word counting goes far beyond simply tallying words: it influences SEO rankings, readability scores, social media engagement, and even speaking time for presentations. This comprehensive guide covers everything about word counting: why it matters for SEO, social media character limits across every major platform, reading time and speaking time calculations, programmatic word counting in JavaScript, Python, and the command line, character count vs word count differences, readability metrics like the Flesch reading ease score, CJK character counting for Chinese, Japanese, and Korean text, academic writing standards, and integration with popular writing tools. Whether you are a developer building a text editor, a content marketer optimizing for Google, or a student meeting essay requirements, this guide has you covered.',

    tldrTitle: 'TL;DR',
    tldr1: 'Use a word counter tool to check word count, character count, sentence count, and reading time instantly.',
    tldr2: 'SEO best practice: blog posts should be 1,500-2,500 words for competitive keywords.',
    tldr3: 'Twitter/X allows 280 characters. Meta descriptions should stay under 155 characters.',
    tldr4: 'Average reading speed is 238 words per minute. Speaking speed is 130 words per minute.',
    tldr5: 'JavaScript split(/\\s+/) is the simplest word count method but fails on CJK and edge cases.',
    tldr6: 'Flesch Reading Ease of 60-70 is ideal for general web content.',

    keyTitle: 'Key Takeaways',
    key1: 'Word count directly impacts SEO performance: longer, comprehensive content tends to rank higher for competitive queries.',
    key2: 'Each social media platform has different character limits that require careful content optimization.',
    key3: 'Reading time = word count / 238 (average adult reading speed). Display it on your blog to improve user experience.',
    key4: 'Character count (with and without spaces) matters for meta tags, SMS, database fields, and API payloads.',
    key5: 'CJK languages (Chinese, Japanese, Korean) count characters differently: each character typically equals one word.',
    key6: 'Readability scores like Flesch-Kincaid help ensure your content is accessible to your target audience.',

    whyTitle: '1. Why Word Count Matters',
    whyDesc: 'Word count is not just an academic metric. In the digital age, it directly impacts how your content performs across search engines, social media, email, and even legal documents. Understanding word count helps you write content that is the right length for its purpose, neither too short to be useful nor too long to lose readers.',
    whyPoint1: 'Search engines use content length as a quality signal. Thin content (under 300 words) rarely ranks for competitive keywords.',
    whyPoint2: 'Social media platforms enforce strict character limits. Exceeding them truncates your message or prevents posting.',
    whyPoint3: 'Email subject lines over 60 characters get cut off on mobile devices, reducing open rates.',
    whyPoint4: 'Academic institutions have strict word count requirements. Going over or under can result in grade penalties.',
    whyPoint5: 'Freelance writers and translators are often paid per word, making accurate counting a financial necessity.',
    whyConclusion: 'A reliable word counter tool gives you instant feedback on your content length, helping you optimize for any platform or requirement.',

    socialTitle: '2. Social Media Character Limits (2025)',
    socialDesc: 'Every social media platform has its own character and word limits. Here is a comprehensive reference table for all major platforms:',
    socialCol1: 'Platform',
    socialCol2: 'Post / Content Type',
    socialCol3: 'Character Limit',
    socialCol4: 'Approx. Words',
    socialRow1: ['Twitter / X', 'Tweet', '280', '40-50'],
    socialRow2: ['Twitter / X', 'Tweet (Premium)', '25,000', '~3,500'],
    socialRow3: ['Instagram', 'Caption', '2,200', '~310'],
    socialRow4: ['Instagram', 'Bio', '150', '~25'],
    socialRow5: ['LinkedIn', 'Post', '3,000', '~430'],
    socialRow6: ['LinkedIn', 'Article', '125,000', '~17,800'],
    socialRow7: ['Facebook', 'Post', '63,206', '~9,000'],
    socialRow8: ['TikTok', 'Caption', '2,200', '~310'],
    socialRow9: ['YouTube', 'Title', '100', '~15'],
    socialRow10: ['YouTube', 'Description', '5,000', '~715'],
    socialRow11: ['Pinterest', 'Pin description', '500', '~70'],
    socialRow12: ['Reddit', 'Title', '300', '~43'],
    socialRow13: ['Reddit', 'Post body', '40,000', '~5,700'],
    socialRow14: ['Threads', 'Post', '500', '~70'],
    socialTip: 'Pro tip: Even though some platforms allow very long posts, shorter content often performs better. Twitter data shows that tweets between 71-100 characters get the highest engagement.',

    seoTitle: '3. SEO Content Length Best Practices',
    seoDesc: 'Content length is one of the many signals search engines use to evaluate page quality. While there is no magic word count that guarantees rankings, research consistently shows correlations between content length and search performance.',
    seoMetaTitle: 'Meta Tags Character Limits',
    seoMetaCol1: 'Meta Element',
    seoMetaCol2: 'Recommended Length',
    seoMetaCol3: 'Max Display Length',
    seoMetaCol4: 'Tip',
    seoMetaRow1: ['Title tag', '50-60 characters', '~600px (Google)', 'Include primary keyword near the start'],
    seoMetaRow2: ['Meta description', '120-155 characters', '~920px (Google)', 'Include a call to action and target keyword'],
    seoMetaRow3: ['H1 heading', '20-70 characters', 'N/A', 'Should match search intent closely'],
    seoMetaRow4: ['URL slug', '3-5 words', '~75 characters', 'Use hyphens, keep it descriptive'],
    seoContentTitle: 'Content Length by Type',
    seoContentCol1: 'Content Type',
    seoContentCol2: 'Recommended Words',
    seoContentCol3: 'Notes',
    seoContentRow1: ['Blog post (general)', '1,000-1,500', 'Good for informational queries with moderate competition'],
    seoContentRow2: ['Blog post (competitive)', '1,500-2,500', 'Long-form ranks better for head terms'],
    seoContentRow3: ['Pillar page', '3,000-5,000+', 'Comprehensive topic coverage with internal links'],
    seoContentRow4: ['Product page', '300-1,000', 'Focus on conversion, not length'],
    seoContentRow5: ['Landing page', '500-1,500', 'Depends on funnel stage and complexity'],
    seoContentRow6: ['FAQ page', '1,000-2,000', 'Each answer should be 40-60 words for featured snippets'],
    seoConclusion: 'Remember: word count is a means to an end, not the goal itself. A 500-word article that perfectly answers a query will outrank a 3,000-word article that is padded with fluff. Focus on comprehensiveness and quality, then use word count as a benchmark.',

    readingTitle: '4. Reading Time and Speaking Time Calculations',
    readingDesc: 'Displaying estimated reading time on blog posts has become a standard UX pattern. Medium popularized this feature, and studies show it increases engagement by setting reader expectations.',
    readingFormulaTitle: 'Reading Time Formula',
    readingFormula: 'Reading time (minutes) = Total words / Words per minute (WPM)',
    readingSpeedCol1: 'Reading Type',
    readingSpeedCol2: 'Speed (WPM)',
    readingSpeedCol3: 'Use Case',
    readingSpeedRow1: ['Slow / careful reading', '150-180', 'Technical documentation, legal text'],
    readingSpeedRow2: ['Average adult reading', '238', 'Blog posts, news articles'],
    readingSpeedRow3: ['Fast / skimming', '300-400', 'Social media, headlines'],
    readingSpeedRow4: ['Screen reading', '200-230', 'Most web content (10-25% slower than print)'],
    speakingFormulaTitle: 'Speaking Time Formula',
    speakingFormula: 'Speaking time (minutes) = Total words / Speaking WPM',
    speakingSpeedCol1: 'Context',
    speakingSpeedCol2: 'Speed (WPM)',
    speakingSpeedCol3: 'Notes',
    speakingSpeedRow1: ['Slow presentation', '100-110', 'Complex technical content'],
    speakingSpeedRow2: ['Average presentation', '120-140', 'Conference talks, lectures'],
    speakingSpeedRow3: ['Conversational', '140-170', 'Podcasts, interviews'],
    speakingSpeedRow4: ['Fast speaking', '170-200', 'Auctioneers, debate'],
    speakingExamples: 'Quick Reference: Speaking Time Estimates',
    speakingEx1: '5-minute speech: approximately 650-700 words',
    speakingEx2: '10-minute presentation: approximately 1,300-1,400 words',
    speakingEx3: '20-minute TED talk: approximately 2,600-2,800 words',
    speakingEx4: '1-hour lecture: approximately 7,800-8,400 words',

    codeTitle: '5. Word Counting in JavaScript, Python, and CLI',
    codeDesc: 'Whether you are building a text editor, a CMS, or a command-line tool, here are robust word counting implementations in popular languages.',
    codeJsTitle: 'JavaScript Word Counter',
    codeJsNote: 'The basic split(/\\s+/) approach works for most English text but fails on CJK characters, multiple whitespace, and edge cases. The robust version below handles these cases.',
    codePyTitle: 'Python Word Counter',
    codePyNote: 'Python provides multiple approaches. The simplest is str.split(), but for accurate counting you should handle punctuation and CJK characters.',
    codeCliTitle: 'Command Line (Linux / macOS)',
    codeCliNote: 'The wc command is the standard Unix tool for word, line, and character counting.',

    charVsWordTitle: '6. Character Count vs Word Count: Key Differences',
    charVsWordDesc: 'Character count and word count measure different things and are used in different contexts. Understanding the distinction is crucial for content optimization.',
    charVsWordCol1: 'Aspect',
    charVsWordCol2: 'Word Count',
    charVsWordCol3: 'Character Count',
    charVsWordRow1: ['Definition', 'Number of words separated by whitespace', 'Number of individual characters (letters, digits, symbols)'],
    charVsWordRow2: ['Spaces included', 'No (spaces are delimiters)', 'Depends: with spaces or without spaces'],
    charVsWordRow3: ['Used for', 'Essays, articles, SEO content length', 'Social media, meta tags, SMS, database fields'],
    charVsWordRow4: ['CJK languages', 'Less meaningful (1 character = 1 word)', 'Primary metric for Chinese, Japanese, Korean'],
    charVsWordRow5: ['Average word length', 'N/A', 'English average: 4.7 characters per word'],
    charVsWordRow6: ['With vs without spaces', 'N/A', 'Twitter counts with spaces; some forms count without'],
    charVsWordNote: 'Quick conversion: For English text, you can roughly estimate characters (with spaces) = words x 5.7 (4.7 chars per word + 1 space). This is approximate and varies by writing style.',

    readabilityTitle: '7. Flesch Reading Ease and Readability Metrics',
    readabilityDesc: 'Readability scores measure how easy your text is to read. They are calculated from word count, sentence count, and syllable count. Higher readability scores correlate with better user engagement and lower bounce rates.',
    readabilityFleschTitle: 'Flesch Reading Ease Formula',
    readabilityFlesch: '206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)',
    readabilityScoreCol1: 'Score Range',
    readabilityScoreCol2: 'Difficulty',
    readabilityScoreCol3: 'Grade Level',
    readabilityScoreCol4: 'Typical Audience',
    readabilityScoreRow1: ['90-100', 'Very easy', '5th grade', 'Children, simple instructions'],
    readabilityScoreRow2: ['80-89', 'Easy', '6th grade', 'Conversational English'],
    readabilityScoreRow3: ['70-79', 'Fairly easy', '7th grade', 'Consumer content, marketing'],
    readabilityScoreRow4: ['60-69', 'Standard', '8th-9th grade', 'General web content (recommended)'],
    readabilityScoreRow5: ['50-59', 'Fairly difficult', '10th-12th grade', 'Technical blogs, industry reports'],
    readabilityScoreRow6: ['30-49', 'Difficult', 'College', 'Academic papers, legal documents'],
    readabilityScoreRow7: ['0-29', 'Very difficult', 'Graduate+', 'Scientific papers, specialized text'],
    readabilityOtherTitle: 'Other Readability Metrics',
    readabilityOther1: 'Flesch-Kincaid Grade Level: outputs a US school grade level. Target grade 7-8 for web content.',
    readabilityOther2: 'Gunning Fog Index: estimates years of formal education needed. Target 8-10 for blogs.',
    readabilityOther3: 'Coleman-Liau Index: uses character count instead of syllable count, making it easier to compute.',
    readabilityOther4: 'SMOG Index: predicts the years of education needed to understand a text. Reliable for health content.',
    readabilityOther5: 'Automated Readability Index (ARI): uses characters per word and words per sentence.',
    readabilityTip: 'For general web content and blog posts, aim for a Flesch Reading Ease score between 60 and 70. This means using short sentences (15-20 words), common words, and active voice.',

    cjkTitle: '8. CJK Character Counting (Chinese, Japanese, Korean)',
    cjkDesc: 'CJK languages present unique challenges for word counting because they do not use spaces between words. In Chinese, Japanese (kanji/hiragana/katakana), and Korean (when written without spaces), each character typically represents a meaningful unit.',
    cjkRulesTitle: 'CJK Counting Rules',
    cjkRule1: 'Chinese: Each hanzi character counts as one word. A 500-character Chinese article is roughly equivalent to a 500-word English article in information density.',
    cjkRule2: 'Japanese: Counting depends on context. Kanji and kana are counted individually. Spaces are not used between words. Japanese word segmentation (morphological analysis) tools like MeCab can split text into words.',
    cjkRule3: 'Korean: Modern Korean uses spaces between words (eojeol), so word counting is more similar to English. However, each eojeol can contain multiple morphemes.',
    cjkRule4: 'Mixed text: When text contains both CJK and Latin characters, count CJK characters individually and Latin words by spaces.',
    cjkUnicodeTitle: 'Unicode Ranges for CJK Detection',
    cjkUnicodeCol1: 'Range',
    cjkUnicodeCol2: 'Block Name',
    cjkUnicodeCol3: 'Characters',
    cjkUnicodeRow1: ['U+4E00 - U+9FFF', 'CJK Unified Ideographs', 'Common Chinese/Japanese kanji'],
    cjkUnicodeRow2: ['U+3400 - U+4DBF', 'CJK Extension A', 'Rare characters'],
    cjkUnicodeRow3: ['U+3040 - U+309F', 'Hiragana', 'Japanese hiragana'],
    cjkUnicodeRow4: ['U+30A0 - U+30FF', 'Katakana', 'Japanese katakana'],
    cjkUnicodeRow5: ['U+AC00 - U+D7AF', 'Hangul Syllables', 'Korean hangul'],
    cjkNote: 'When building a word counter that supports CJK, use the Unicode ranges above to detect CJK characters and count them individually, while counting Latin-script words by whitespace boundaries.',

    academicTitle: '9. Academic Writing Word Count Standards',
    academicDesc: 'Academic institutions enforce strict word count requirements. Understanding these standards helps students plan their writing and avoid penalties for going over or under the limit.',
    academicCol1: 'Document Type',
    academicCol2: 'Typical Word Count',
    academicCol3: 'Notes',
    academicRow1: ['Short essay', '500-1,000', 'Single argument or analysis'],
    academicRow2: ['Standard essay', '1,500-2,500', 'Multiple paragraphs with evidence'],
    academicRow3: ['Research paper', '3,000-5,000', 'Literature review + original analysis'],
    academicRow4: ['Thesis (Masters)', '15,000-30,000', 'Varies by field and institution'],
    academicRow5: ['Dissertation (PhD)', '60,000-100,000', 'Humanities tend to be longer than STEM'],
    academicRow6: ['Abstract', '150-300', 'Structured or unstructured'],
    academicRow7: ['Literature review', '3,000-5,000', 'Standalone or as thesis chapter'],
    academicTips: 'Academic Writing Tips',
    academicTip1: 'Most institutions allow a 10% tolerance above or below the word count limit.',
    academicTip2: 'Word count typically excludes the bibliography, title page, table of contents, and appendices unless stated otherwise.',
    academicTip3: 'In-text citations are usually included in the word count.',
    academicTip4: 'Use your word counter to check section balance: introduction (10%), body (80%), conclusion (10%).',
    academicTip5: 'Check your style guide (APA, MLA, Chicago) for specific word count conventions.',

    toolsTitle: '10. Word Count in Writing Tools',
    toolsDesc: 'Most writing tools include built-in word counters. Here is how to access word count in popular applications:',
    toolsGoogleDocsTitle: 'Google Docs',
    toolsGoogleDocs: 'Go to Tools > Word count, or press Ctrl+Shift+C (Cmd+Shift+C on Mac). You can check "Display word count while typing" to show a persistent counter at the bottom.',
    toolsVscodeTitle: 'VS Code',
    toolsVscode: 'The status bar shows word count for the active file when you install the "Word Count" extension (by Microsoft). For Markdown files, the built-in Markdown preview shows word count.',
    toolsWordTitle: 'Microsoft Word',
    toolsWord: 'Word count is displayed in the status bar at the bottom left by default. Click it for detailed statistics including pages, paragraphs, and characters.',
    toolsNotionTitle: 'Notion',
    toolsNotion: 'Click the three-dot menu (...) in the top right of any page, then select "Word count" to see words, characters, and reading time.',
    toolsOnlineTitle: 'Online Word Counters',
    toolsOnlineDesc: 'Online word counter tools provide additional features beyond simple counting. Our word counter tool gives you instant analysis of your text including word count, character count (with and without spaces), sentence count, paragraph count, reading time, speaking time, and keyword density.',
    toolsCta: 'Try our free Word Counter tool',

    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How are words counted exactly?',
    faq1a: 'Words are counted by splitting text on whitespace boundaries (spaces, tabs, line breaks). Hyphenated words like "well-known" may count as one or two words depending on the tool. Most standard word counters count them as one word. Numbers like "42" count as one word. Our word counter splits on whitespace and counts each resulting token as one word.',
    faq2q: 'Do spaces count as characters?',
    faq2a: 'It depends on the context. Character count "with spaces" includes all characters including spaces, tabs, and line breaks. Character count "without spaces" excludes them. Twitter and most social media platforms count spaces as characters. HTML meta descriptions count with spaces. Our tool shows both counts so you always have the number you need.',
    faq3q: 'What is a good word count for SEO blog posts?',
    faq3a: 'For competitive keywords, 1,500 to 2,500 words tends to perform best. However, the ideal length depends on search intent. A recipe might need only 800 words while a comprehensive guide might need 4,000+. Check what currently ranks on page 1 for your target keyword and aim for similar or slightly longer content with better quality.',
    faq4q: 'How do I calculate reading time from word count?',
    faq4a: 'Divide the total word count by 238 (the average adult reading speed in words per minute). For example, a 1,500-word article takes approximately 6.3 minutes to read. Round to the nearest minute for display. For technical content, use 200 WPM since readers slow down for complex material.',
    faq5q: 'How do you count words in Chinese, Japanese, or Korean?',
    faq5a: 'In Chinese, each character (hanzi) typically counts as one word since Chinese does not use spaces between words. In Japanese, you can count characters or use morphological analysis tools like MeCab to segment text into words. Korean uses spaces between word units (eojeol), so spacing-based counting works similarly to English. Our word counter detects CJK characters and counts them individually.',
    faq6q: 'What is the Flesch Reading Ease score?',
    faq6a: 'The Flesch Reading Ease score measures how easy text is to read on a scale of 0 to 100. It is calculated from average sentence length and average syllables per word. A score of 60-70 is considered ideal for standard web content (8th-9th grade reading level). Higher scores mean easier text. Most news articles score between 50 and 70. Academic papers often score below 30.',
    faq7q: 'Does word count affect Google rankings?',
    faq7a: 'Word count is not a direct Google ranking factor. However, comprehensive content that thoroughly covers a topic tends to satisfy search intent better, earn more backlinks, and rank higher as a result. Google has stated that there is no minimum word count for quality content. Focus on answering the query completely rather than hitting a specific word count target.',
    faq8q: 'How many words per page in a printed document?',
    faq8a: 'A standard printed page (A4 or Letter, 12pt font, double-spaced) contains approximately 250 words. Single-spaced, it is roughly 500 words per page. These are rough estimates: the actual count depends on font size, margins, line spacing, and paragraph formatting.',
  },
  zh: {
    title: '在线字数统计指南：字符限制、SEO长度、阅读时间等',
    intro: '无论你是在撰写推文、编写元描述、起草大学论文还是优化博客文章的搜索引擎排名，了解你的字数和字符数都至关重要。字数统计远不止简单地计算单词：它影响SEO排名、可读性分数、社交媒体参与度，甚至演讲时间。本指南涵盖了字数统计的方方面面：为什么它对SEO很重要、各大社交媒体平台的字符限制、阅读时间和演讲时间的计算方法、JavaScript和Python中的编程字数统计、字符数与字数的区别、Flesch可读性分数等可读性指标、中日韩文字计数、学术写作标准，以及与常用写作工具的集成。',

    tldrTitle: 'TL;DR',
    tldr1: '使用字数统计工具即时检查字数、字符数、句子数和阅读时间。',
    tldr2: 'SEO最佳实践：竞争性关键词的博客文章应在1,500-2,500字。',
    tldr3: 'Twitter/X允许280个字符。元描述应保持在155个字符以内。',
    tldr4: '平均阅读速度为每分钟238个单词。演讲速度为每分钟130个单词。',
    tldr5: 'JavaScript的split(/\\s+/)是最简单的字数统计方法，但在CJK和边缘情况下会失败。',
    tldr6: 'Flesch可读性指数60-70最适合一般网页内容。',

    keyTitle: '关键要点',
    key1: '字数直接影响SEO表现：更长、更全面的内容在竞争性查询中往往排名更高。',
    key2: '每个社交媒体平台都有不同的字符限制，需要针对性的内容优化。',
    key3: '阅读时间 = 字数 / 238（成人平均阅读速度）。在博客上显示阅读时间可以改善用户体验。',
    key4: '字符数（含空格和不含空格）对于元标签、短信、数据库字段和API负载很重要。',
    key5: 'CJK语言（中文、日文、韩文）的字数统计方式不同：每个字符通常等于一个词。',
    key6: 'Flesch-Kincaid等可读性分数有助于确保内容对目标受众来说易于理解。',

    whyTitle: '1. 为什么字数统计很重要',
    whyDesc: '字数统计不仅仅是学术指标。在数字时代，它直接影响你的内容在搜索引擎、社交媒体、电子邮件甚至法律文件中的表现。了解字数有助于你撰写长度合适的内容。',
    whyPoint1: '搜索引擎将内容长度作为质量信号。薄弱内容（少于300字）很少在竞争性关键词中排名。',
    whyPoint2: '社交媒体平台执行严格的字符限制。超出限制会截断你的消息或阻止发布。',
    whyPoint3: '超过60个字符的邮件主题行在移动设备上会被截断，降低打开率。',
    whyPoint4: '学术机构有严格的字数要求。超出或不足都可能导致扣分。',
    whyPoint5: '自由撰稿人和翻译人员通常按字计费，使准确计数成为经济必需。',
    whyConclusion: '可靠的字数统计工具能即时反馈内容长度，帮助你针对任何平台或要求进行优化。',

    socialTitle: '2. 社交媒体字符限制（2025年）',
    socialDesc: '每个社交媒体平台都有自己的字符和字数限制。以下是所有主要平台的完整参考表：',
    socialCol1: '平台',
    socialCol2: '内容类型',
    socialCol3: '字符限制',
    socialCol4: '约等于字数',
    socialRow1: ['Twitter / X', '推文', '280', '40-50'],
    socialRow2: ['Twitter / X', '推文（付费版）', '25,000', '~3,500'],
    socialRow3: ['Instagram', '图片说明', '2,200', '~310'],
    socialRow4: ['Instagram', '个人简介', '150', '~25'],
    socialRow5: ['LinkedIn', '帖子', '3,000', '~430'],
    socialRow6: ['LinkedIn', '文章', '125,000', '~17,800'],
    socialRow7: ['Facebook', '帖子', '63,206', '~9,000'],
    socialRow8: ['TikTok', '视频说明', '2,200', '~310'],
    socialRow9: ['YouTube', '标题', '100', '~15'],
    socialRow10: ['YouTube', '描述', '5,000', '~715'],
    socialRow11: ['Pinterest', 'Pin描述', '500', '~70'],
    socialRow12: ['Reddit', '标题', '300', '~43'],
    socialRow13: ['Reddit', '帖子正文', '40,000', '~5,700'],
    socialRow14: ['Threads', '帖子', '500', '~70'],
    socialTip: '专业提示：即使某些平台允许很长的帖子，较短的内容通常表现更好。Twitter数据显示71-100个字符的推文参与度最高。',

    seoTitle: '3. SEO内容长度最佳实践',
    seoDesc: '内容长度是搜索引擎评估页面质量的众多信号之一。虽然没有保证排名的神奇字数，但研究一直表明内容长度与搜索表现之间存在相关性。',
    seoMetaTitle: '元标签字符限制',
    seoMetaCol1: '元素',
    seoMetaCol2: '推荐长度',
    seoMetaCol3: '最大显示长度',
    seoMetaCol4: '提示',
    seoMetaRow1: ['标题标签', '50-60个字符', '~600px（Google）', '将主要关键词放在开头附近'],
    seoMetaRow2: ['元描述', '120-155个字符', '~920px（Google）', '包含行动号召和目标关键词'],
    seoMetaRow3: ['H1标题', '20-70个字符', 'N/A', '应紧密匹配搜索意图'],
    seoMetaRow4: ['URL路径', '3-5个词', '~75个字符', '使用连字符，保持描述性'],
    seoContentTitle: '不同内容类型的推荐长度',
    seoContentCol1: '内容类型',
    seoContentCol2: '推荐字数',
    seoContentCol3: '备注',
    seoContentRow1: ['博客文章（一般）', '1,000-1,500', '适合中等竞争的信息查询'],
    seoContentRow2: ['博客文章（竞争性）', '1,500-2,500', '长内容在头部词中排名更好'],
    seoContentRow3: ['支柱页面', '3,000-5,000+', '全面的主题覆盖加内部链接'],
    seoContentRow4: ['产品页面', '300-1,000', '关注转化而非长度'],
    seoContentRow5: ['着陆页', '500-1,500', '取决于漏斗阶段和复杂度'],
    seoContentRow6: ['FAQ页面', '1,000-2,000', '每个答案应在40-60字以获取精选摘要'],
    seoConclusion: '记住：字数是达到目的的手段，而不是目标本身。一篇完美回答查询的500字文章会比一篇充满水分的3,000字文章排名更高。关注全面性和质量，然后将字数作为基准。',

    readingTitle: '4. 阅读时间和演讲时间计算',
    readingDesc: '在博客文章上显示预估阅读时间已成为标准的用户体验模式。Medium推广了这一功能，研究表明它通过设定读者期望来增加参与度。',
    readingFormulaTitle: '阅读时间公式',
    readingFormula: '阅读时间（分钟）= 总字数 / 每分钟阅读字数（WPM）',
    readingSpeedCol1: '阅读类型',
    readingSpeedCol2: '速度（WPM）',
    readingSpeedCol3: '使用场景',
    readingSpeedRow1: ['慢速/仔细阅读', '150-180', '技术文档、法律文本'],
    readingSpeedRow2: ['成人平均阅读', '238', '博客文章、新闻'],
    readingSpeedRow3: ['快速/略读', '300-400', '社交媒体、标题'],
    readingSpeedRow4: ['屏幕阅读', '200-230', '大多数网页内容（比纸质慢10-25%）'],
    speakingFormulaTitle: '演讲时间公式',
    speakingFormula: '演讲时间（分钟）= 总字数 / 演讲WPM',
    speakingSpeedCol1: '场景',
    speakingSpeedCol2: '速度（WPM）',
    speakingSpeedCol3: '备注',
    speakingSpeedRow1: ['慢速演讲', '100-110', '复杂技术内容'],
    speakingSpeedRow2: ['平均演讲', '120-140', '会议演讲、讲座'],
    speakingSpeedRow3: ['对话式', '140-170', '播客、访谈'],
    speakingSpeedRow4: ['快速演讲', '170-200', '拍卖师、辩论'],
    speakingExamples: '快速参考：演讲时间估算',
    speakingEx1: '5分钟演讲：约650-700字',
    speakingEx2: '10分钟演示：约1,300-1,400字',
    speakingEx3: '20分钟TED演讲：约2,600-2,800字',
    speakingEx4: '1小时讲座：约7,800-8,400字',

    codeTitle: '5. JavaScript、Python和CLI中的字数统计',
    codeDesc: '无论你是在构建文本编辑器、CMS还是命令行工具，以下是常用语言中的健壮字数统计实现。',
    codeJsTitle: 'JavaScript 字数统计',
    codeJsNote: '基本的split(/\\s+/)方法适用于大多数英文文本，但在CJK字符、多个空白和边缘情况下会失败。下面的健壮版本处理了这些情况。',
    codePyTitle: 'Python 字数统计',
    codePyNote: 'Python提供多种方法。最简单的是str.split()，但要准确计数，你应该处理标点和CJK字符。',
    codeCliTitle: '命令行（Linux / macOS）',
    codeCliNote: 'wc命令是标准的Unix字数、行数和字符数统计工具。',

    charVsWordTitle: '6. 字符数与字数的关键区别',
    charVsWordDesc: '字符数和字数衡量的是不同的东西，用于不同的场景。理解这一区别对内容优化至关重要。',
    charVsWordCol1: '方面',
    charVsWordCol2: '字数',
    charVsWordCol3: '字符数',
    charVsWordRow1: ['定义', '由空白分隔的词数', '单个字符数（字母、数字、符号）'],
    charVsWordRow2: ['是否包含空格', '否（空格是分隔符）', '取决于：含空格或不含空格'],
    charVsWordRow3: ['用途', '论文、文章、SEO内容长度', '社交媒体、元标签、短信、数据库字段'],
    charVsWordRow4: ['CJK语言', '意义较小（1个字符=1个词）', '中文、日文、韩文的主要指标'],
    charVsWordRow5: ['平均词长', 'N/A', '英文平均：每个词4.7个字符'],
    charVsWordRow6: ['含空格与不含空格', 'N/A', 'Twitter计算含空格；某些表单计算不含空格'],
    charVsWordNote: '快速转换：对于英文文本，你可以大致估算字符数（含空格）= 字数 x 5.7（每词4.7个字符 + 1个空格）。这是近似值，因写作风格而异。',

    readabilityTitle: '7. Flesch可读性指数和可读性指标',
    readabilityDesc: '可读性分数衡量文本的易读程度。它们根据字数、句子数和音节数计算。更高的可读性分数与更好的用户参与度和更低的跳出率相关。',
    readabilityFleschTitle: 'Flesch阅读易度公式',
    readabilityFlesch: '206.835 - 1.015 * (总字数 / 总句子数) - 84.6 * (总音节数 / 总字数)',
    readabilityScoreCol1: '分数范围',
    readabilityScoreCol2: '难度',
    readabilityScoreCol3: '年级水平',
    readabilityScoreCol4: '典型受众',
    readabilityScoreRow1: ['90-100', '非常容易', '小学5年级', '儿童、简单说明'],
    readabilityScoreRow2: ['80-89', '容易', '小学6年级', '日常对话英语'],
    readabilityScoreRow3: ['70-79', '较容易', '初一', '消费者内容、营销'],
    readabilityScoreRow4: ['60-69', '标准', '初二-初三', '一般网页内容（推荐）'],
    readabilityScoreRow5: ['50-59', '较难', '高中', '技术博客、行业报告'],
    readabilityScoreRow6: ['30-49', '难', '大学', '学术论文、法律文件'],
    readabilityScoreRow7: ['0-29', '非常难', '研究生+', '科学论文、专业文本'],
    readabilityOtherTitle: '其他可读性指标',
    readabilityOther1: 'Flesch-Kincaid年级水平：输出美国学校年级水平。网页内容目标为7-8年级。',
    readabilityOther2: 'Gunning Fog指数：估算所需的正规教育年数。博客目标为8-10。',
    readabilityOther3: 'Coleman-Liau指数：使用字符数而非音节数，更容易计算。',
    readabilityOther4: 'SMOG指数：预测理解文本所需的教育年数。适用于健康内容。',
    readabilityOther5: '自动可读性指数（ARI）：使用每词字符数和每句词数。',
    readabilityTip: '对于一般网页内容和博客文章，目标Flesch阅读易度分数在60到70之间。这意味着使用短句（15-20个词）、常用词和主动语态。',

    cjkTitle: '8. CJK字符计数（中文、日文、韩文）',
    cjkDesc: 'CJK语言为字数统计带来了独特的挑战，因为它们在词与词之间不使用空格。在中文、日文（汉字/平假名/片假名）和韩文（不加空格书写时）中，每个字符通常代表一个有意义的单位。',
    cjkRulesTitle: 'CJK计数规则',
    cjkRule1: '中文：每个汉字计为一个词。一篇500字的中文文章在信息密度上大致相当于一篇500字的英文文章。',
    cjkRule2: '日文：计数取决于上下文。汉字和假名分别计数。词与词之间不使用空格。日语分词（形态分析）工具如MeCab可以将文本拆分成词。',
    cjkRule3: '韩文：现代韩语在词（eojeol）之间使用空格，因此字数统计与英语更为相似。但每个eojeol可以包含多个语素。',
    cjkRule4: '混合文本：当文本同时包含CJK和拉丁字符时，CJK字符单独计数，拉丁词按空格计数。',
    cjkUnicodeTitle: 'CJK检测的Unicode范围',
    cjkUnicodeCol1: '范围',
    cjkUnicodeCol2: '区块名称',
    cjkUnicodeCol3: '字符说明',
    cjkUnicodeRow1: ['U+4E00 - U+9FFF', 'CJK统一表意文字', '常用中文/日文汉字'],
    cjkUnicodeRow2: ['U+3400 - U+4DBF', 'CJK扩展A', '罕用字'],
    cjkUnicodeRow3: ['U+3040 - U+309F', '平假名', '日文平假名'],
    cjkUnicodeRow4: ['U+30A0 - U+30FF', '片假名', '日文片假名'],
    cjkUnicodeRow5: ['U+AC00 - U+D7AF', '韩文音节', '韩文字母'],
    cjkNote: '构建支持CJK的字数统计工具时，使用上述Unicode范围检测CJK字符并单独计数，同时按空格边界计数拉丁文字词。',

    academicTitle: '9. 学术写作字数标准',
    academicDesc: '学术机构执行严格的字数要求。了解这些标准有助于学生规划写作并避免超出或不足限制的扣分。',
    academicCol1: '文档类型',
    academicCol2: '典型字数',
    academicCol3: '备注',
    academicRow1: ['短文', '500-1,000', '单一论点或分析'],
    academicRow2: ['标准论文', '1,500-2,500', '多段落加证据'],
    academicRow3: ['研究论文', '3,000-5,000', '文献综述+原创分析'],
    academicRow4: ['硕士论文', '15,000-30,000', '因领域和学校而异'],
    academicRow5: ['博士论文', '60,000-100,000', '人文学科通常比STEM更长'],
    academicRow6: ['摘要', '150-300', '结构化或非结构化'],
    academicRow7: ['文献综述', '3,000-5,000', '独立或作为论文章节'],
    academicTips: '学术写作技巧',
    academicTip1: '大多数学校允许字数限制上下10%的容差。',
    academicTip2: '除非另有说明，字数通常不包括参考文献、扉页、目录和附录。',
    academicTip3: '文内引用通常包含在字数中。',
    academicTip4: '使用字数统计工具检查章节平衡：引言(10%)、正文(80%)、结论(10%)。',
    academicTip5: '检查你的格式指南（APA、MLA、芝加哥）以了解具体的字数规范。',

    toolsTitle: '10. 写作工具中的字数统计',
    toolsDesc: '大多数写作工具都包含内置字数统计功能。以下是如何在常用应用中访问字数统计：',
    toolsGoogleDocsTitle: 'Google Docs',
    toolsGoogleDocs: '进入工具 > 字数统计，或按Ctrl+Shift+C（Mac上为Cmd+Shift+C）。你可以勾选"输入时显示字数统计"在底部显示持久计数器。',
    toolsVscodeTitle: 'VS Code',
    toolsVscode: '安装"Word Count"扩展（Microsoft出品）后，状态栏会显示活动文件的字数。对于Markdown文件，内置Markdown预览显示字数。',
    toolsWordTitle: 'Microsoft Word',
    toolsWord: '字数统计默认显示在左下角的状态栏中。点击它可查看详细统计信息，包括页数、段落数和字符数。',
    toolsNotionTitle: 'Notion',
    toolsNotion: '点击任何页面右上角的三点菜单(...)，然后选择"字数统计"查看字数、字符数和阅读时间。',
    toolsOnlineTitle: '在线字数统计工具',
    toolsOnlineDesc: '在线字数统计工具提供超越简单计数的额外功能。我们的字数统计工具为你的文本提供即时分析，包括字数、字符数（含空格和不含空格）、句子数、段落数、阅读时间、演讲时间和关键词密度。',
    toolsCta: '试用我们的免费字数统计工具',

    faqTitle: '常见问题',
    faq1q: '字数是如何精确统计的？',
    faq1a: '字数通过在空白边界（空格、制表符、换行符）处拆分文本来统计。连字符词如"well-known"可能计为一个或两个词，取决于工具。大多数标准字数统计工具将其计为一个词。数字如"42"计为一个词。',
    faq2q: '空格算作字符吗？',
    faq2a: '取决于上下文。"含空格"的字符数包括所有字符，包括空格、制表符和换行符。"不含空格"的字符数则排除它们。Twitter和大多数社交媒体平台将空格计为字符。HTML元描述含空格计算。我们的工具同时显示两种计数。',
    faq3q: 'SEO博客文章的理想字数是多少？',
    faq3a: '对于竞争性关键词，1,500到2,500字往往表现最佳。然而，理想长度取决于搜索意图。查看目标关键词当前第一页排名的内容，并争取相似或略长的内容加上更好的质量。',
    faq4q: '如何从字数计算阅读时间？',
    faq4a: '将总字数除以238（成人平均每分钟阅读字数）。例如，1,500字的文章大约需要6.3分钟阅读。显示时四舍五入到最近的分钟。对于技术内容，使用200 WPM。',
    faq5q: '如何统计中文、日文或韩文的字数？',
    faq5a: '在中文中，每个汉字通常计为一个词，因为中文在词与词之间不使用空格。在日文中，你可以计算字符数或使用形态分析工具如MeCab来分词。韩文在词（eojeol）之间使用空格，因此基于空格的计数与英语类似。',
    faq6q: '什么是Flesch可读性指数？',
    faq6a: 'Flesch阅读易度分数在0到100的范围内衡量文本的易读程度。它根据平均句子长度和每词平均音节数计算。60-70的分数被认为最适合标准网页内容。更高的分数意味着更容易的文本。',
    faq7q: '字数会影响Google排名吗？',
    faq7a: '字数不是直接的Google排名因素。然而，全面覆盖主题的内容往往更好地满足搜索意图，获得更多反向链接，因此排名更高。专注于完全回答查询，而不是达到特定的字数目标。',
    faq8q: '印刷文档每页多少字？',
    faq8a: '标准印刷页面（A4或Letter，12pt字体，双倍行距）包含约250字。单倍行距约为每页500字。这些是粗略估计：实际计数取决于字体大小、页边距、行距和段落格式。',
  },
};

const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: 13, lineHeight: 1.7, fontFamily: 'monospace', color: 'var(--text-primary)', border: '1px solid var(--border-color)', margin: '12px 0' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 28, marginBottom: 12, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 };
const noteBoxStyle: React.CSSProperties = { background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' };
const warningBoxStyle: React.CSSProperties = { background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' };
const ulStyle: React.CSSProperties = { paddingLeft: 24, margin: '8px 0 16px', color: 'var(--text-secondary)', lineHeight: 1.8 };

export default function WordCounterOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6', 'faq7', 'faq8'];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqKeys.map(k => ({
      '@type': 'Question',
      name: t[k + 'q'] as string,
      acceptedAnswer: { '@type': 'Answer', text: t[k + 'a'] as string },
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{t.intro}</p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: 20, margin: '24px 0' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 0, marginBottom: 12, color: '#0369a1' }}>{t.tldrTitle}</h3>
        <ul style={{ ...ulStyle, margin: 0, color: '#0c4a6e' }}>
          {['tldr1', 'tldr2', 'tldr3', 'tldr4', 'tldr5', 'tldr6'].map(k => (
            <li key={k} style={{ marginBottom: 6 }}>{t[k] as string}</li>
          ))}
        </ul>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 8, padding: 20, margin: '24px 0' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 0, marginBottom: 12, color: 'var(--text-primary)' }}>{t.keyTitle}</h3>
        <ul style={{ ...ulStyle, margin: 0 }}>
          {['key1', 'key2', 'key3', 'key4', 'key5', 'key6'].map(k => (
            <li key={k} style={{ marginBottom: 6 }}>{t[k] as string}</li>
          ))}
        </ul>
      </div>

      {/* Section 1: Why Word Count Matters */}
      <h2 style={h2Style}>{t.whyTitle}</h2>
      <p style={pStyle}>{t.whyDesc}</p>
      <ul style={ulStyle}>
        {['whyPoint1', 'whyPoint2', 'whyPoint3', 'whyPoint4', 'whyPoint5'].map(k => (
          <li key={k} style={{ marginBottom: 6 }}>{t[k] as string}</li>
        ))}
      </ul>
      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.whyConclusion}</p>
      </div>
      <p style={{ ...pStyle, marginTop: 16 }}>
        <Link href={`/${lang}/tools/word-counter`} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>
          {lang === 'zh' ? '立即试用我们的在线字数统计工具' : 'Try our online Word Counter tool now'} &rarr;
        </Link>
      </p>

      {/* Section 2: Social Media Character Limits */}
      <h2 style={h2Style}>{t.socialTitle}</h2>
      <p style={pStyle}>{t.socialDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.socialCol1}</th>
              <th style={thStyle}>{t.socialCol2}</th>
              <th style={thStyle}>{t.socialCol3}</th>
              <th style={thStyle}>{t.socialCol4}</th>
            </tr>
          </thead>
          <tbody>
            {['socialRow1', 'socialRow2', 'socialRow3', 'socialRow4', 'socialRow5', 'socialRow6', 'socialRow7', 'socialRow8', 'socialRow9', 'socialRow10', 'socialRow11', 'socialRow12', 'socialRow13', 'socialRow14'].map((k, i) => {
              const row = t[k] as string[];
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                  <td style={tdStyle}>{row[1]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>{row[2]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{row[3]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={warningBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.socialTip}</p>
      </div>

      {/* Section 3: SEO Content Length */}
      <h2 style={h2Style}>{t.seoTitle}</h2>
      <p style={pStyle}>{t.seoDesc}</p>

      <h3 style={h3Style}>{t.seoMetaTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.seoMetaCol1}</th>
              <th style={thStyle}>{t.seoMetaCol2}</th>
              <th style={thStyle}>{t.seoMetaCol3}</th>
              <th style={thStyle}>{t.seoMetaCol4}</th>
            </tr>
          </thead>
          <tbody>
            {['seoMetaRow1', 'seoMetaRow2', 'seoMetaRow3', 'seoMetaRow4'].map((k, i) => {
              const row = t[k] as string[];
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{row[1]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{row[2]}</td>
                  <td style={tdStyle}>{row[3]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{t.seoContentTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.seoContentCol1}</th>
              <th style={thStyle}>{t.seoContentCol2}</th>
              <th style={thStyle}>{t.seoContentCol3}</th>
            </tr>
          </thead>
          <tbody>
            {['seoContentRow1', 'seoContentRow2', 'seoContentRow3', 'seoContentRow4', 'seoContentRow5', 'seoContentRow6'].map((k, i) => {
              const row = t[k] as string[];
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>{row[1]}</td>
                  <td style={tdStyle}>{row[2]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoConclusion}</p>
      </div>

      {/* Section 4: Reading Time & Speaking Time */}
      <h2 style={h2Style}>{t.readingTitle}</h2>
      <p style={pStyle}>{t.readingDesc}</p>

      <h3 style={h3Style}>{t.readingFormulaTitle}</h3>
      <pre style={codeStyle}><code>{t.readingFormula as string}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.readingSpeedCol1}</th>
              <th style={thStyle}>{t.readingSpeedCol2}</th>
              <th style={thStyle}>{t.readingSpeedCol3}</th>
            </tr>
          </thead>
          <tbody>
            {['readingSpeedRow1', 'readingSpeedRow2', 'readingSpeedRow3', 'readingSpeedRow4'].map((k, i) => {
              const row = t[k] as string[];
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>{row[1]}</td>
                  <td style={tdStyle}>{row[2]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{t.speakingFormulaTitle}</h3>
      <pre style={codeStyle}><code>{t.speakingFormula as string}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.speakingSpeedCol1}</th>
              <th style={thStyle}>{t.speakingSpeedCol2}</th>
              <th style={thStyle}>{t.speakingSpeedCol3}</th>
            </tr>
          </thead>
          <tbody>
            {['speakingSpeedRow1', 'speakingSpeedRow2', 'speakingSpeedRow3', 'speakingSpeedRow4'].map((k, i) => {
              const row = t[k] as string[];
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>{row[1]}</td>
                  <td style={tdStyle}>{row[2]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{t.speakingExamples}</h3>
      <ul style={ulStyle}>
        {['speakingEx1', 'speakingEx2', 'speakingEx3', 'speakingEx4'].map(k => (
          <li key={k} style={{ marginBottom: 6 }}>{t[k] as string}</li>
        ))}
      </ul>

      {/* Section 5: Word Counting in Code */}
      <h2 style={h2Style}>{t.codeTitle}</h2>
      <p style={pStyle}>{t.codeDesc}</p>

      <h3 style={h3Style}>{t.codeJsTitle}</h3>
      <p style={pStyle}>{t.codeJsNote}</p>
      <pre style={codeStyle}><code>{`// Basic word count (English only)
function countWords(text) {
  return text.trim().split(/\\s+/).filter(Boolean).length;
}

// Robust word count with CJK support
function countWordsRobust(text) {
  if (!text || !text.trim()) return 0;

  // Count CJK characters individually
  const cjkRegex = /[\\u4E00-\\u9FFF\\u3400-\\u4DBF\\u3040-\\u309F\\u30A0-\\u30FF\\uAC00-\\uD7AF]/g;
  const cjkChars = text.match(cjkRegex) || [];

  // Remove CJK characters, then count remaining words
  const withoutCjk = text.replace(cjkRegex, ' ');
  const latinWords = withoutCjk.trim().split(/\\s+/).filter(w => w.length > 0);

  return cjkChars.length + latinWords.length;
}

// Character count (with and without spaces)
function countChars(text) {
  return {
    withSpaces: text.length,
    withoutSpaces: text.replace(/\\s/g, '').length,
  };
}

// Reading time in minutes
function readingTime(text, wpm = 238) {
  const words = countWordsRobust(text);
  return Math.ceil(words / wpm);
}

// Example usage:
// countWords("Hello world! This is a test.");  // 6
// countWordsRobust("Hello world! This is a test.");  // 6`}</code></pre>

      <h3 style={h3Style}>{t.codePyTitle}</h3>
      <p style={pStyle}>{t.codePyNote}</p>
      <pre style={codeStyle}><code>{`import re
import math

def count_words(text: str) -> int:
    """Basic word count using split."""
    return len(text.split())

def count_words_robust(text: str) -> int:
    """Word count with CJK support."""
    if not text or not text.strip():
        return 0

    # Count CJK characters
    cjk_pattern = re.compile(
        r'[\\u4E00-\\u9FFF\\u3400-\\u4DBF'
        r'\\u3040-\\u309F\\u30A0-\\u30FF'
        r'\\uAC00-\\uD7AF]'
    )
    cjk_chars = cjk_pattern.findall(text)

    # Remove CJK, count Latin words
    without_cjk = cjk_pattern.sub(' ', text)
    latin_words = [w for w in without_cjk.split() if w]

    return len(cjk_chars) + len(latin_words)

def char_count(text: str) -> dict:
    """Character count with and without spaces."""
    return {
        "with_spaces": len(text),
        "without_spaces": len(text.replace(" ", "").replace("\\t", "").replace("\\n", "")),
    }

def reading_time(text: str, wpm: int = 238) -> int:
    """Estimated reading time in minutes."""
    words = count_words_robust(text)
    return math.ceil(words / wpm)

# Example usage:
# count_words("Hello world! This is a test.")  # 6
# reading_time("..." * 500)  # depends on content`}</code></pre>

      <h3 style={h3Style}>{t.codeCliTitle}</h3>
      <p style={pStyle}>{t.codeCliNote}</p>
      <pre style={codeStyle}><code>{`# Count words in a file
wc -w document.txt

# Count characters (bytes) in a file
wc -c document.txt

# Count characters (multibyte-aware, e.g., UTF-8 CJK)
wc -m document.txt

# Count lines in a file
wc -l document.txt

# All counts at once (lines, words, bytes)
wc document.txt

# Count words from clipboard (macOS)
pbpaste | wc -w

# Count words from clipboard (Linux with xclip)
xclip -selection clipboard -o | wc -w

# Count words in all .md files recursively
find . -name "*.md" -exec cat {} + | wc -w

# Word frequency (top 20 most common words)
tr -cs '[:alpha:]' '\\n' < document.txt | \\
  tr '[:upper:]' '[:lower:]' | \\
  sort | uniq -c | sort -rn | head -20`}</code></pre>

      <p style={{ ...pStyle, marginTop: 16 }}>
        <Link href={`/${lang}/tools/word-counter`} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>
          {lang === 'zh' ? '无需安装，直接在浏览器中使用字数统计工具' : 'Count words instantly in your browser with our Word Counter'} &rarr;
        </Link>
      </p>

      {/* Section 6: Character Count vs Word Count */}
      <h2 style={h2Style}>{t.charVsWordTitle}</h2>
      <p style={pStyle}>{t.charVsWordDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.charVsWordCol1}</th>
              <th style={thStyle}>{t.charVsWordCol2}</th>
              <th style={thStyle}>{t.charVsWordCol3}</th>
            </tr>
          </thead>
          <tbody>
            {['charVsWordRow1', 'charVsWordRow2', 'charVsWordRow3', 'charVsWordRow4', 'charVsWordRow5', 'charVsWordRow6'].map((k, i) => {
              const row = t[k] as string[];
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                  <td style={tdStyle}>{row[1]}</td>
                  <td style={tdStyle}>{row[2]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.charVsWordNote}</p>
      </div>

      {/* Section 7: Readability Metrics */}
      <h2 style={h2Style}>{t.readabilityTitle}</h2>
      <p style={pStyle}>{t.readabilityDesc}</p>

      <h3 style={h3Style}>{t.readabilityFleschTitle}</h3>
      <pre style={codeStyle}><code>{t.readabilityFlesch as string}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.readabilityScoreCol1}</th>
              <th style={thStyle}>{t.readabilityScoreCol2}</th>
              <th style={thStyle}>{t.readabilityScoreCol3}</th>
              <th style={thStyle}>{t.readabilityScoreCol4}</th>
            </tr>
          </thead>
          <tbody>
            {['readabilityScoreRow1', 'readabilityScoreRow2', 'readabilityScoreRow3', 'readabilityScoreRow4', 'readabilityScoreRow5', 'readabilityScoreRow6', 'readabilityScoreRow7'].map((k, i) => {
              const row = t[k] as string[];
              const color = i <= 2 ? '#22c55e' : i <= 4 ? '#f59e0b' : '#ef4444';
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600, color }}>{row[0]}</td>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[1]}</td>
                  <td style={tdStyle}>{row[2]}</td>
                  <td style={tdStyle}>{row[3]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{t.readabilityOtherTitle}</h3>
      <ul style={ulStyle}>
        {['readabilityOther1', 'readabilityOther2', 'readabilityOther3', 'readabilityOther4', 'readabilityOther5'].map(k => (
          <li key={k} style={{ marginBottom: 6 }}>{t[k] as string}</li>
        ))}
      </ul>
      <div style={warningBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.readabilityTip}</p>
      </div>

      {/* Section 8: CJK */}
      <h2 style={h2Style}>{t.cjkTitle}</h2>
      <p style={pStyle}>{t.cjkDesc}</p>

      <h3 style={h3Style}>{t.cjkRulesTitle}</h3>
      <ul style={ulStyle}>
        {['cjkRule1', 'cjkRule2', 'cjkRule3', 'cjkRule4'].map(k => (
          <li key={k} style={{ marginBottom: 8 }}>{t[k] as string}</li>
        ))}
      </ul>

      <h3 style={h3Style}>{t.cjkUnicodeTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.cjkUnicodeCol1}</th>
              <th style={thStyle}>{t.cjkUnicodeCol2}</th>
              <th style={thStyle}>{t.cjkUnicodeCol3}</th>
            </tr>
          </thead>
          <tbody>
            {['cjkUnicodeRow1', 'cjkUnicodeRow2', 'cjkUnicodeRow3', 'cjkUnicodeRow4', 'cjkUnicodeRow5'].map((k, i) => {
              const row = t[k] as string[];
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[1]}</td>
                  <td style={tdStyle}>{row[2]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={noteBoxStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.cjkNote}</p>
      </div>

      {/* Section 9: Academic Writing */}
      <h2 style={h2Style}>{t.academicTitle}</h2>
      <p style={pStyle}>{t.academicDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{t.academicCol1}</th>
              <th style={thStyle}>{t.academicCol2}</th>
              <th style={thStyle}>{t.academicCol3}</th>
            </tr>
          </thead>
          <tbody>
            {['academicRow1', 'academicRow2', 'academicRow3', 'academicRow4', 'academicRow5', 'academicRow6', 'academicRow7'].map((k, i) => {
              const row = t[k] as string[];
              return (
                <tr key={i}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>{row[1]}</td>
                  <td style={tdStyle}>{row[2]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{t.academicTips}</h3>
      <ul style={ulStyle}>
        {['academicTip1', 'academicTip2', 'academicTip3', 'academicTip4', 'academicTip5'].map(k => (
          <li key={k} style={{ marginBottom: 6 }}>{t[k] as string}</li>
        ))}
      </ul>

      {/* Section 10: Writing Tools Integration */}
      <h2 style={h2Style}>{t.toolsTitle}</h2>
      <p style={pStyle}>{t.toolsDesc}</p>

      <h3 style={h3Style}>{t.toolsGoogleDocsTitle}</h3>
      <p style={pStyle}>{t.toolsGoogleDocs}</p>

      <h3 style={h3Style}>{t.toolsVscodeTitle}</h3>
      <p style={pStyle}>{t.toolsVscode}</p>

      <h3 style={h3Style}>{t.toolsWordTitle}</h3>
      <p style={pStyle}>{t.toolsWord}</p>

      <h3 style={h3Style}>{t.toolsNotionTitle}</h3>
      <p style={pStyle}>{t.toolsNotion}</p>

      <h3 style={h3Style}>{t.toolsOnlineTitle}</h3>
      <p style={pStyle}>{t.toolsOnlineDesc}</p>

      <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', borderRadius: 12, padding: 24, margin: '24px 0', textAlign: 'center' }}>
        <p style={{ color: '#ffffff', fontSize: 18, fontWeight: 700, marginBottom: 12, marginTop: 0 }}>
          {t.toolsCta}
        </p>
        <Link
          href={`/${lang}/tools/word-counter`}
          style={{
            display: 'inline-block',
            background: '#ffffff',
            color: '#2563eb',
            padding: '12px 32px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            textDecoration: 'none',
          }}
        >
          {lang === 'zh' ? '打开字数统计工具' : 'Open Word Counter Tool'} &rarr;
        </Link>
      </div>

      {/* FAQ Section */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {faqKeys.map(k => (
        <div key={k} style={{ marginBottom: 20 }}>
          <h3 style={{ ...h3Style, marginTop: 20, fontSize: 17 }}>{t[k + 'q'] as string}</h3>
          <p style={pStyle}>{t[k + 'a'] as string}</p>
        </div>
      ))}

      {/* Final CTA */}
      <div style={{ borderTop: '2px solid var(--border-color)', marginTop: 40, paddingTop: 24 }}>
        <p style={{ ...pStyle, fontSize: 16, fontWeight: 600 }}>
          {lang === 'zh' ? '准备好统计你的文字了吗？' : 'Ready to count your words?'}
        </p>
        <p style={pStyle}>
          <Link href={`/${lang}/tools/word-counter`} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>
            {lang === 'zh' ? '使用我们的免费在线字数统计工具' : 'Use our free online Word Counter tool'} &rarr;
          </Link>
          {' '}
          {lang === 'zh'
            ? '即时获取字数、字符数、句子数、段落数、阅读时间和关键词密度分析。'
            : 'Get instant word count, character count, sentence count, paragraph count, reading time, and keyword density analysis.'}
        </p>
      </div>
    </div>
  );
}
