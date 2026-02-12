'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: '<strong>jq</strong> is a lightweight, flexible command-line JSON processor that has become an indispensable tool for every developer working with APIs, configuration files, or log data. This comprehensive tutorial covers <strong>jq command examples</strong> from basic filters to advanced data transformations, so you can master JSON processing in your terminal.',
    link_tool: 'Format and view JSON with our online JSON Formatter \u2192',
    h2_what: '1. What is jq?',
    p_what_1: 'jq is like <code>sed</code> for JSON data \u2014 a command-line tool that lets you slice, filter, map, and transform structured data with ease. It is written in C with zero runtime dependencies, making it fast and portable across all major platforms.',
    p_what_2: 'jq takes JSON input (from a file or stdin), applies one or more filters, and produces JSON output. Its expression language is powerful yet concise, allowing complex data transformations in a single command.',
    h3_install: 'Installation',
    p_install: 'Install jq on any platform in seconds:',
    h3_basic_syntax: 'Basic Syntax',
    p_basic_syntax: 'The simplest jq command is the identity filter <code>.</code> which pretty-prints JSON input:',
    h2_basic_filters: '2. Basic Filters',
    p_basic_filters: 'jq filters extract and transform data from JSON input. The dot notation is the foundation of everything in jq.',
    h2_pipe: '3. Pipe & Chaining',
    p_pipe: 'Just like Unix shell pipes, jq uses <code>|</code> to chain filters together. The output of the left filter becomes the input of the right filter. This composability is what makes jq so powerful.',
    h2_select: '4. Select & Filter',
    p_select: 'The <code>select()</code> function filters elements based on a condition. Combined with <code>map()</code>, it becomes a powerful query engine for JSON data.',
    h2_string: '5. String Interpolation & Formatting',
    p_string: 'jq provides string interpolation with <code>\\(expr)</code> inside double quotes, plus several format strings for converting data to different output formats.',
    h2_array: '6. Array Operations',
    p_array: 'jq provides a rich set of built-in functions for working with arrays: sorting, grouping, filtering, flattening, and more.',
    h2_object: '7. Object Operations',
    p_object: 'jq makes it easy to inspect, transform, and reconstruct JSON objects using built-in functions like <code>keys</code>, <code>values</code>, <code>to_entries</code>, and <code>with_entries</code>.',
    h2_conditionals: '8. Conditionals & Error Handling',
    p_conditionals: 'jq supports if-then-else expressions, the alternative operator <code>//</code>, and try-catch for robust data processing pipelines.',
    h2_realworld: '9. Real-World Examples',
    p_realworld: 'Here are practical jq patterns you will use daily when working with APIs, cloud services, and log files.',
    h2_curl_jq: '10. jq with curl',
    p_curl_jq: 'The <code>curl | jq</code> pipeline is one of the most common patterns in API development. Pipe API responses directly into jq for instant formatting and data extraction.',
    h2_advanced: '11. Advanced jq',
    p_advanced: 'For complex data transformations, jq offers reduce, foreach, custom function definitions, environment variables, and command-line arguments.',
    h2_cheatsheet: '12. Cheat Sheet: Quick Reference',
    p_cheatsheet: 'The most commonly used jq patterns at a glance. Bookmark this table for quick lookup.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is jq used for?',
    faq1_a: 'jq is a command-line JSON processor used for parsing, filtering, transforming, and formatting JSON data. It is commonly used to process API responses, parse log files, transform configuration files, and extract specific fields from complex JSON structures. Think of it as grep/sed/awk but purpose-built for JSON.',
    faq2_q: 'How do I pretty-print JSON with jq?',
    faq2_a: 'Simply pipe JSON into jq with the identity filter: echo \'{"name":"Alice","age":30}\' | jq \'.\' This will output the JSON with proper indentation and syntax highlighting. You can also use jq \'.\' file.json to pretty-print a JSON file. To use compact output instead, add the -c flag: jq -c \'.\' file.json.',
    faq3_q: 'How do I extract a nested field from JSON using jq?',
    faq3_a: 'Use dot notation to navigate nested objects: jq \'.user.address.city\' data.json. For arrays, use .[index] to access specific elements: jq \'.users[0].name\' data.json. To iterate over all array elements, use .[]: jq \'.users[].name\' data.json. You can chain these as deep as needed.',
    faq4_q: 'What is the difference between jq map() and select()?',
    faq4_a: 'map() applies a transformation to every element in an array and returns a new array of the same length. select() filters elements based on a condition, returning only those that match. They are often combined: jq \'.users | map(select(.age > 30))\' filters the users array to only include users older than 30. map() transforms, select() filters.',
    faq5_q: 'How do I use jq with curl to parse API responses?',
    faq5_a: 'Pipe the curl output directly into jq: curl -s https://api.github.com/users/octocat | jq \'.name, .bio\'. The -s flag silences curl progress output. You can use any jq filter to extract, transform, or format the API response. For authenticated APIs, add headers: curl -s -H "Authorization: Bearer TOKEN" https://api.example.com/data | jq \'.results[]\'.',
    p_conclusion: 'Bookmark this tutorial and come back whenever you need a jq reference. For working with JSON data in the browser, try our online tools below.',
    link_tool_bottom: 'Try the JSON Formatter \u2192',
    link_viewer: 'Try the JSON Viewer \u2192',
    pattern: 'Pattern',
    description: 'Description',
    example: 'Example',
  },
  zh: {
    intro: '<strong>jq</strong> \u662f\u4e00\u4e2a\u8f7b\u91cf\u7ea7\u3001\u7075\u6d3b\u7684\u547d\u4ee4\u884c JSON \u5904\u7406\u5668\uff0c\u5df2\u7ecf\u6210\u4e3a\u6bcf\u4e2a\u4e0e API\u3001\u914d\u7f6e\u6587\u4ef6\u6216\u65e5\u5fd7\u6570\u636e\u6253\u4ea4\u9053\u7684\u5f00\u53d1\u8005\u4e0d\u53ef\u6216\u7f3a\u7684\u5de5\u5177\u3002\u8fd9\u4efd\u5168\u9762\u7684\u6559\u7a0b\u6db5\u76d6\u4e86\u4ece\u57fa\u672c\u8fc7\u6ee4\u5668\u5230\u9ad8\u7ea7\u6570\u636e\u8f6c\u6362\u7684 <strong>jq \u547d\u4ee4\u793a\u4f8b</strong>\uff0c\u5e2e\u52a9\u4f60\u638c\u63e1\u7ec8\u7aef\u4e2d\u7684 JSON \u5904\u7406\u3002',
    link_tool: '\u4f7f\u7528\u6211\u4eec\u7684\u5728\u7ebf JSON \u683c\u5f0f\u5316\u5de5\u5177\u683c\u5f0f\u5316\u548c\u67e5\u770b JSON \u2192',
    h2_what: '1. \u4ec0\u4e48\u662f jq\uff1f',
    p_what_1: 'jq \u5c31\u50cf JSON \u6570\u636e\u7684 <code>sed</code> \u2014\u2014 \u4e00\u4e2a\u547d\u4ee4\u884c\u5de5\u5177\uff0c\u8ba9\u4f60\u53ef\u4ee5\u8f7b\u677e\u5730\u5207\u7247\u3001\u8fc7\u6ee4\u3001\u6620\u5c04\u548c\u8f6c\u6362\u7ed3\u6784\u5316\u6570\u636e\u3002\u5b83\u7528 C \u8bed\u8a00\u7f16\u5199\uff0c\u96f6\u8fd0\u884c\u65f6\u4f9d\u8d56\uff0c\u56e0\u6b64\u5728\u6240\u6709\u4e3b\u8981\u5e73\u53f0\u4e0a\u90fd\u5feb\u901f\u4e14\u53ef\u79fb\u690d\u3002',
    p_what_2: 'jq \u63a5\u53d7 JSON \u8f93\u5165\uff08\u6765\u81ea\u6587\u4ef6\u6216\u6807\u51c6\u8f93\u5165\uff09\uff0c\u5e94\u7528\u4e00\u4e2a\u6216\u591a\u4e2a\u8fc7\u6ee4\u5668\uff0c\u5e76\u4ea7\u751f JSON \u8f93\u51fa\u3002\u5b83\u7684\u8868\u8fbe\u5f0f\u8bed\u8a00\u5f3a\u5927\u800c\u7b80\u6d01\uff0c\u5141\u8bb8\u5728\u5355\u4e2a\u547d\u4ee4\u4e2d\u5b8c\u6210\u590d\u6742\u7684\u6570\u636e\u8f6c\u6362\u3002',
    h3_install: '\u5b89\u88c5',
    p_install: '\u5728\u4efb\u4f55\u5e73\u53f0\u4e0a\u51e0\u79d2\u5185\u5b89\u88c5 jq\uff1a',
    h3_basic_syntax: '\u57fa\u672c\u8bed\u6cd5',
    p_basic_syntax: '\u6700\u7b80\u5355\u7684 jq \u547d\u4ee4\u662f\u6052\u7b49\u8fc7\u6ee4\u5668 <code>.</code>\uff0c\u5b83\u4f1a\u7f8e\u5316\u6253\u5370 JSON \u8f93\u5165\uff1a',
    h2_basic_filters: '2. \u57fa\u672c\u8fc7\u6ee4\u5668',
    p_basic_filters: 'jq \u8fc7\u6ee4\u5668\u4ece JSON \u8f93\u5165\u4e2d\u63d0\u53d6\u548c\u8f6c\u6362\u6570\u636e\u3002\u70b9\u8868\u793a\u6cd5\u662f jq \u4e2d\u4e00\u5207\u7684\u57fa\u7840\u3002',
    h2_pipe: '3. \u7ba1\u9053\u4e0e\u94fe\u63a5',
    p_pipe: '\u5c31\u50cf Unix shell \u7ba1\u9053\u4e00\u6837\uff0cjq \u4f7f\u7528 <code>|</code> \u5c06\u8fc7\u6ee4\u5668\u94fe\u63a5\u5728\u4e00\u8d77\u3002\u5de6\u4fa7\u8fc7\u6ee4\u5668\u7684\u8f93\u51fa\u6210\u4e3a\u53f3\u4fa7\u8fc7\u6ee4\u5668\u7684\u8f93\u5165\u3002\u8fd9\u79cd\u53ef\u7ec4\u5408\u6027\u662f jq \u5982\u6b64\u5f3a\u5927\u7684\u539f\u56e0\u3002',
    h2_select: '4. \u9009\u62e9\u4e0e\u8fc7\u6ee4',
    p_select: '<code>select()</code> \u51fd\u6570\u6839\u636e\u6761\u4ef6\u8fc7\u6ee4\u5143\u7d20\u3002\u4e0e <code>map()</code> \u7ed3\u5408\u4f7f\u7528\uff0c\u5b83\u6210\u4e3a JSON \u6570\u636e\u7684\u5f3a\u5927\u67e5\u8be2\u5f15\u64ce\u3002',
    h2_string: '5. \u5b57\u7b26\u4e32\u63d2\u503c\u4e0e\u683c\u5f0f\u5316',
    p_string: 'jq \u5728\u53cc\u5f15\u53f7\u5185\u63d0\u4f9b <code>\\(expr)</code> \u5b57\u7b26\u4e32\u63d2\u503c\uff0c\u8fd8\u6709\u591a\u79cd\u683c\u5f0f\u5b57\u7b26\u4e32\u7528\u4e8e\u5c06\u6570\u636e\u8f6c\u6362\u4e3a\u4e0d\u540c\u7684\u8f93\u51fa\u683c\u5f0f\u3002',
    h2_array: '6. \u6570\u7ec4\u64cd\u4f5c',
    p_array: 'jq \u63d0\u4f9b\u4e86\u4e30\u5bcc\u7684\u5185\u7f6e\u51fd\u6570\u6765\u5904\u7406\u6570\u7ec4\uff1a\u6392\u5e8f\u3001\u5206\u7ec4\u3001\u8fc7\u6ee4\u3001\u5c55\u5e73\u7b49\u3002',
    h2_object: '7. \u5bf9\u8c61\u64cd\u4f5c',
    p_object: 'jq \u4f7f\u7528 <code>keys</code>\u3001<code>values</code>\u3001<code>to_entries</code> \u548c <code>with_entries</code> \u7b49\u5185\u7f6e\u51fd\u6570\uff0c\u53ef\u4ee5\u8f7b\u677e\u5730\u68c0\u67e5\u3001\u8f6c\u6362\u548c\u91cd\u6784 JSON \u5bf9\u8c61\u3002',
    h2_conditionals: '8. \u6761\u4ef6\u5224\u65ad\u4e0e\u9519\u8bef\u5904\u7406',
    p_conditionals: 'jq \u652f\u6301 if-then-else \u8868\u8fbe\u5f0f\u3001\u66ff\u4ee3\u8fd0\u7b97\u7b26 <code>//</code> \u548c try-catch\uff0c\u7528\u4e8e\u6784\u5efa\u5065\u58ee\u7684\u6570\u636e\u5904\u7406\u7ba1\u9053\u3002',
    h2_realworld: '9. \u5b9e\u6218\u793a\u4f8b',
    p_realworld: '\u4ee5\u4e0b\u662f\u4f60\u5728\u65e5\u5e38\u5de5\u4f5c\u4e2d\u4f7f\u7528 API\u3001\u4e91\u670d\u52a1\u548c\u65e5\u5fd7\u6587\u4ef6\u65f6\u4f1a\u7528\u5230\u7684\u5b9e\u7528 jq \u6a21\u5f0f\u3002',
    h2_curl_jq: '10. jq \u4e0e curl \u914d\u5408\u4f7f\u7528',
    p_curl_jq: '<code>curl | jq</code> \u7ba1\u9053\u662f API \u5f00\u53d1\u4e2d\u6700\u5e38\u89c1\u7684\u6a21\u5f0f\u4e4b\u4e00\u3002\u5c06 API \u54cd\u5e94\u76f4\u63a5\u901a\u8fc7\u7ba1\u9053\u4f20\u9012\u7ed9 jq\uff0c\u5373\u53ef\u7acb\u5373\u683c\u5f0f\u5316\u548c\u63d0\u53d6\u6570\u636e\u3002',
    h2_advanced: '11. \u9ad8\u7ea7 jq',
    p_advanced: '\u5bf9\u4e8e\u590d\u6742\u7684\u6570\u636e\u8f6c\u6362\uff0cjq \u63d0\u4f9b\u4e86 reduce\u3001foreach\u3001\u81ea\u5b9a\u4e49\u51fd\u6570\u5b9a\u4e49\u3001\u73af\u5883\u53d8\u91cf\u548c\u547d\u4ee4\u884c\u53c2\u6570\u3002',
    h2_cheatsheet: '12. \u901f\u67e5\u8868\uff1a\u5feb\u901f\u53c2\u8003',
    p_cheatsheet: '\u6700\u5e38\u7528\u7684 jq \u6a21\u5f0f\u4e00\u89c8\u3002\u6536\u85cf\u6b64\u8868\u4ee5\u4fbf\u5feb\u901f\u67e5\u627e\u3002',
    h2_faq: '\u5e38\u89c1\u95ee\u9898',
    faq1_q: 'jq \u7528\u6765\u505a\u4ec0\u4e48\uff1f',
    faq1_a: 'jq \u662f\u4e00\u4e2a\u547d\u4ee4\u884c JSON \u5904\u7406\u5668\uff0c\u7528\u4e8e\u89e3\u6790\u3001\u8fc7\u6ee4\u3001\u8f6c\u6362\u548c\u683c\u5f0f\u5316 JSON \u6570\u636e\u3002\u5b83\u901a\u5e38\u7528\u4e8e\u5904\u7406 API \u54cd\u5e94\u3001\u89e3\u6790\u65e5\u5fd7\u6587\u4ef6\u3001\u8f6c\u6362\u914d\u7f6e\u6587\u4ef6\u4ee5\u53ca\u4ece\u590d\u6742 JSON \u7ed3\u6784\u4e2d\u63d0\u53d6\u7279\u5b9a\u5b57\u6bb5\u3002\u53ef\u4ee5\u628a\u5b83\u7406\u89e3\u4e3a\u4e13\u4e3a JSON \u8bbe\u8ba1\u7684 grep/sed/awk\u3002',
    faq2_q: '\u5982\u4f55\u7528 jq \u7f8e\u5316\u6253\u5370 JSON\uff1f',
    faq2_a: '\u53ea\u9700\u5c06 JSON \u901a\u8fc7\u7ba1\u9053\u4f20\u9012\u7ed9 jq \u7684\u6052\u7b49\u8fc7\u6ee4\u5668\uff1aecho \'{"name":"Alice","age":30}\' | jq \'.\'\u3002\u8fd9\u4f1a\u8f93\u51fa\u5e26\u6709\u9002\u5f53\u7f29\u8fdb\u548c\u8bed\u6cd5\u9ad8\u4eae\u7684 JSON\u3002\u4e5f\u53ef\u4ee5\u7528 jq \'.\' file.json \u7f8e\u5316\u6253\u5370 JSON \u6587\u4ef6\u3002\u8981\u4f7f\u7528\u7d27\u51d1\u8f93\u51fa\uff0c\u6dfb\u52a0 -c \u6807\u5fd7\uff1ajq -c \'.\' file.json\u3002',
    faq3_q: '\u5982\u4f55\u7528 jq \u63d0\u53d6\u5d4c\u5957\u5b57\u6bb5\uff1f',
    faq3_a: '\u4f7f\u7528\u70b9\u8868\u793a\u6cd5\u5bfc\u822a\u5d4c\u5957\u5bf9\u8c61\uff1ajq \'.user.address.city\' data.json\u3002\u5bf9\u4e8e\u6570\u7ec4\uff0c\u4f7f\u7528 .[index] \u8bbf\u95ee\u7279\u5b9a\u5143\u7d20\uff1ajq \'.users[0].name\' data.json\u3002\u8981\u904d\u5386\u6240\u6709\u6570\u7ec4\u5143\u7d20\uff0c\u4f7f\u7528 .[]\uff1ajq \'.users[].name\' data.json\u3002\u53ef\u4ee5\u6839\u636e\u9700\u8981\u65e0\u9650\u5d4c\u5957\u3002',
    faq4_q: 'jq \u7684 map() \u548c select() \u6709\u4ec0\u4e48\u533a\u522b\uff1f',
    faq4_a: 'map() \u5bf9\u6570\u7ec4\u4e2d\u7684\u6bcf\u4e2a\u5143\u7d20\u5e94\u7528\u8f6c\u6362\uff0c\u8fd4\u56de\u76f8\u540c\u957f\u5ea6\u7684\u65b0\u6570\u7ec4\u3002select() \u6839\u636e\u6761\u4ef6\u8fc7\u6ee4\u5143\u7d20\uff0c\u53ea\u8fd4\u56de\u5339\u914d\u7684\u5143\u7d20\u3002\u5b83\u4eec\u7ecf\u5e38\u7ec4\u5408\u4f7f\u7528\uff1ajq \'.users | map(select(.age > 30))\' \u8fc7\u6ee4\u7528\u6237\u6570\u7ec4\uff0c\u53ea\u4fdd\u7559\u5e74\u9f84\u5927\u4e8e 30 \u7684\u7528\u6237\u3002map() \u8d1f\u8d23\u8f6c\u6362\uff0cselect() \u8d1f\u8d23\u8fc7\u6ee4\u3002',
    faq5_q: '\u5982\u4f55\u5c06 jq \u4e0e curl \u914d\u5408\u4f7f\u7528\u6765\u89e3\u6790 API \u54cd\u5e94\uff1f',
    faq5_a: '\u5c06 curl \u8f93\u51fa\u76f4\u63a5\u901a\u8fc7\u7ba1\u9053\u4f20\u9012\u7ed9 jq\uff1acurl -s https://api.github.com/users/octocat | jq \'.name, .bio\'\u3002-s \u6807\u5fd7\u9759\u97f3 curl \u7684\u8fdb\u5ea6\u8f93\u51fa\u3002\u53ef\u4ee5\u4f7f\u7528\u4efb\u4f55 jq \u8fc7\u6ee4\u5668\u6765\u63d0\u53d6\u3001\u8f6c\u6362\u6216\u683c\u5f0f\u5316 API \u54cd\u5e94\u3002\u5bf9\u4e8e\u9700\u8981\u8ba4\u8bc1\u7684 API\uff0c\u6dfb\u52a0\u8bf7\u6c42\u5934\uff1acurl -s -H "Authorization: Bearer TOKEN" url | jq \'.results[]\'',
    p_conclusion: '\u6536\u85cf\u8fd9\u4efd\u6559\u7a0b\uff0c\u968f\u65f6\u67e5\u9605 jq \u53c2\u8003\u3002\u8981\u5728\u6d4f\u89c8\u5668\u4e2d\u5904\u7406 JSON \u6570\u636e\uff0c\u8bf7\u8bd5\u8bd5\u6211\u4eec\u7684\u5728\u7ebf\u5de5\u5177\u3002',
    link_tool_bottom: '\u8bd5\u8bd5 JSON \u683c\u5f0f\u5316\u5de5\u5177 \u2192',
    link_viewer: '\u8bd5\u8bd5 JSON \u67e5\u770b\u5668 \u2192',
    pattern: '\u6a21\u5f0f',
    description: '\u63cf\u8ff0',
    example: '\u793a\u4f8b',
  },
};

export default function JqCommandTutorial({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
    ],
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      <p>
        <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_tool}
        </Link>
      </p>

      {/* ============================================================ */}
      {/* 1. WHAT IS JQ */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_what_1 }} />
      <p>{t.p_what_2}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_install}</h3>
      <p>{t.p_install}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Ubuntu / Debian
sudo apt-get install jq

# macOS (Homebrew)
brew install jq

# Windows (Chocolatey)
choco install jq

# Windows (Scoop)
scoop install jq

# Alpine Linux
apk add jq

# From source / binary
# Download from https://jqlang.github.io/jq/download/
wget https://github.com/jqlang/jq/releases/download/jq-1.7.1/jq-linux-amd64
chmod +x jq-linux-amd64 && sudo mv jq-linux-amd64 /usr/local/bin/jq

# Verify installation
jq --version`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.h3_basic_syntax}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.p_basic_syntax }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Pretty-print JSON (identity filter)
echo '{"name":"Alice","age":30,"skills":["go","rust"]}' | jq '.'

# Output:
# {
#   "name": "Alice",
#   "age": 30,
#   "skills": [
#     "go",
#     "rust"
#   ]
# }

# Read from a file
jq '.' data.json

# Compact output (single line)
jq -c '.' data.json

# Raw string output (no quotes)
echo '{"name":"Alice"}' | jq -r '.name'
# Output: Alice  (without quotes)

# Sort keys alphabetically
echo '{"z":1,"a":2,"m":3}' | jq -S '.'`}</code></pre>

      {/* ============================================================ */}
      {/* 2. BASIC FILTERS */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_basic_filters}</h2>
      <p>{t.p_basic_filters}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Object Field Access</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Sample JSON
# {"name": "Alice", "age": 30, "address": {"city": "NYC", "zip": "10001"}}

# Access a top-level field
echo '{"name":"Alice","age":30}' | jq '.name'
# "Alice"

# Access a nested field
echo '{"address":{"city":"NYC","zip":"10001"}}' | jq '.address.city'
# "NYC"

# Multiple fields (comma-separated)
echo '{"name":"Alice","age":30,"role":"admin"}' | jq '.name, .age'
# "Alice"
# 30

# Optional field access (no error if missing)
echo '{"name":"Alice"}' | jq '.email?'
# null

# Field with special characters (use quotes)
echo '{"my-field": 42}' | jq '.["my-field"]'
# 42`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Array Access</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Access by index
echo '[10,20,30,40,50]' | jq '.[0]'
# 10

# Negative index (from end)
echo '[10,20,30,40,50]' | jq '.[-1]'
# 50

# Array slice
echo '[10,20,30,40,50]' | jq '.[1:3]'
# [20, 30]

# Slice from start
echo '[10,20,30,40,50]' | jq '.[:2]'
# [10, 20]

# Slice to end
echo '[10,20,30,40,50]' | jq '.[3:]'
# [40, 50]

# Iterate all elements (array value iterator)
echo '[1,2,3]' | jq '.[]'
# 1
# 2
# 3

# Iterate object values
echo '{"a":1,"b":2,"c":3}' | jq '.[]'
# 1
# 2
# 3`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Constructing New Objects & Arrays</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Build a new object from fields
echo '{"first":"Alice","last":"Smith","age":30}' | jq '{name: .first, years: .age}'
# {"name": "Alice", "years": 30}

# Wrap results in an array
echo '{"a":1,"b":2,"c":3}' | jq '[.a, .b, .c]'
# [1, 2, 3]

# Collect iterator results into an array
echo '[1,2,3,4,5]' | jq '[.[] | . * 2]'
# [2, 4, 6, 8, 10]`}</code></pre>

      {/* ============================================================ */}
      {/* 3. PIPE & CHAINING */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_pipe}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_pipe }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Chain filters with pipe
echo '{"users":[{"name":"Alice","age":30},{"name":"Bob","age":25}]}' | \\
  jq '.users[] | .name'
# "Alice"
# "Bob"

# Multiple pipes
echo '{"data":{"items":[{"id":1,"val":"a"},{"id":2,"val":"b"}]}}' | \\
  jq '.data.items[] | .val'
# "a"
# "b"

# Pipe into object construction
echo '{"users":[{"first":"Alice","last":"Smith"},{"first":"Bob","last":"Jones"}]}' | \\
  jq '.users[] | {full_name: (.first + " " + .last)}'
# {"full_name": "Alice Smith"}
# {"full_name": "Bob Jones"}

# Pipe with length
echo '{"users":[{"name":"Alice"},{"name":"Bob"},{"name":"Charlie"}]}' | \\
  jq '.users | length'
# 3

# Pipe with multiple outputs
echo '{"a":{"x":1},"b":{"x":2}}' | jq '.a, .b | .x'
# 1
# 2

# Parentheses for grouping
echo '{"a":1,"b":2}' | jq '(.a + .b) * 2'
# 6`}</code></pre>

      {/* ============================================================ */}
      {/* 4. SELECT & FILTER */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_select}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_select }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# select() - filter by condition
echo '[{"name":"Alice","age":30},{"name":"Bob","age":25},{"name":"Charlie","age":35}]' | \\
  jq '.[] | select(.age > 28)'
# {"name": "Alice", "age": 30}
# {"name": "Charlie", "age": 35}

# map(select()) - filter and keep as array
echo '[{"name":"Alice","age":30},{"name":"Bob","age":25},{"name":"Charlie","age":35}]' | \\
  jq 'map(select(.age >= 30))'
# [{"name": "Alice", "age": 30}, {"name": "Charlie", "age": 35}]

# String matching with select
echo '[{"name":"Alice"},{"name":"Bob"},{"name":"Anna"}]' | \\
  jq '.[] | select(.name | startswith("A"))'
# {"name": "Alice"}
# {"name": "Anna"}

# select with contains
echo '[{"tags":["go","api"]},{"tags":["python","ml"]},{"tags":["go","cli"]}]' | \\
  jq '.[] | select(.tags | contains(["go"]))'
# {"tags": ["go", "api"]}
# {"tags": ["go", "cli"]}

# select with test (regex)
echo '[{"email":"alice@gmail.com"},{"email":"bob@company.org"},{"email":"charlie@gmail.com"}]' | \\
  jq '.[] | select(.email | test("gmail"))'
# {"email": "alice@gmail.com"}
# {"email": "charlie@gmail.com"}

# has() - check if key exists
echo '{"name":"Alice","email":"alice@example.com"}' | jq 'has("email")'
# true

echo '[{"name":"Alice","email":"a@b.com"},{"name":"Bob"}]' | \\
  jq '.[] | select(has("email"))'
# {"name": "Alice", "email": "a@b.com"}

# in() - check if key exists in object
echo '{"admin":true,"user":true}' | jq '"admin" | in({"admin":true,"user":true})'
# true

# type checks
echo '[1,"hello",null,true,[],{}]' | jq '.[] | select(type == "string")'
# "hello"

# Negated select (NOT matching)
echo '[{"status":"active"},{"status":"inactive"},{"status":"active"}]' | \\
  jq '.[] | select(.status != "active")'
# {"status": "inactive"}`}</code></pre>

      {/* ============================================================ */}
      {/* 5. STRING INTERPOLATION & FORMATTING */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_string}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_string }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# String interpolation with \\()
echo '{"name":"Alice","age":30}' | jq '"\\(.name) is \\(.age) years old"'
# "Alice is 30 years old"

# Use -r for raw output (no surrounding quotes)
echo '{"name":"Alice","age":30}' | jq -r '"\\(.name) is \\(.age) years old"'
# Alice is 30 years old

# @text - plain text (default)
echo '"hello"' | jq '@text'
# "hello"

# @html - HTML-escaped
echo '"<script>alert(1)</script>"' | jq '@html'
# "&lt;script&gt;alert(1)&lt;/script&gt;"

# @csv - CSV format (use with -r)
echo '["Alice",30,"NYC"]' | jq -r '@csv'
# "Alice",30,"NYC"

# @tsv - Tab-separated values
echo '["Alice",30,"NYC"]' | jq -r '@tsv'
# Alice	30	NYC

# @json - JSON-encode a string
echo '"hello world"' | jq '@json'
# "\"hello world\""

# @base64 - Base64 encode
echo '"hello world"' | jq '@base64'
# "aGVsbG8gd29ybGQ="

# @base64d - Base64 decode
echo '"aGVsbG8gd29ybGQ="' | jq '@base64d'
# "hello world"

# @uri - URI-encode
echo '"hello world&foo=bar"' | jq '@uri'
# "hello%20world%26foo%3Dbar"

# Combining formats: CSV from array of arrays
echo '[[1,"Alice",30],[2,"Bob",25]]' | jq -r '.[] | @csv'
# 1,"Alice",30
# 2,"Bob",25

# Build formatted table with string interpolation
echo '[{"name":"Alice","age":30},{"name":"Bob","age":25}]' | \\
  jq -r '.[] | "\\(.name)\\t\\(.age)"'
# Alice	30
# Bob	25`}</code></pre>

      {/* ============================================================ */}
      {/* 6. ARRAY OPERATIONS */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_array}</h2>
      <p>{t.p_array}</p>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# length
echo '[1,2,3,4,5]' | jq 'length'
# 5

# map() - transform each element
echo '[1,2,3,4,5]' | jq 'map(. * 10)'
# [10, 20, 30, 40, 50]

echo '[{"name":"Alice"},{"name":"Bob"}]' | jq 'map(.name)'
# ["Alice", "Bob"]

# sort and sort_by
echo '[3,1,4,1,5,9,2,6]' | jq 'sort'
# [1, 1, 2, 3, 4, 5, 6, 9]

echo '[{"name":"Charlie","age":35},{"name":"Alice","age":30},{"name":"Bob","age":25}]' | \\
  jq 'sort_by(.age)'
# [{"name":"Bob","age":25},{"name":"Alice","age":30},{"name":"Charlie","age":35}]

# Reverse sort
echo '[{"name":"Alice","age":30},{"name":"Bob","age":25},{"name":"Charlie","age":35}]' | \\
  jq 'sort_by(.age) | reverse'

# group_by
echo '[{"dept":"eng","name":"Alice"},{"dept":"sales","name":"Bob"},{"dept":"eng","name":"Charlie"}]' | \\
  jq 'group_by(.dept)'
# [[{"dept":"eng","name":"Alice"},{"dept":"eng","name":"Charlie"}],[{"dept":"sales","name":"Bob"}]]

# unique and unique_by
echo '[1,2,2,3,3,3]' | jq 'unique'
# [1, 2, 3]

echo '[{"city":"NYC"},{"city":"LA"},{"city":"NYC"}]' | jq 'unique_by(.city)'
# [{"city":"LA"},{"city":"NYC"}]

# flatten
echo '[[1,2],[3,[4,5]],6]' | jq 'flatten'
# [1, 2, 3, 4, 5, 6]

# flatten with depth
echo '[[1,[2]],[3,[4,[5]]]]' | jq 'flatten(1)'
# [1, [2], 3, [4, [5]]]

# first, last, nth
echo '[10,20,30,40,50]' | jq 'first'
# 10
echo '[10,20,30,40,50]' | jq 'last'
# 50

# min, max, min_by, max_by
echo '[3,1,4,1,5,9]' | jq 'min'
# 1
echo '[3,1,4,1,5,9]' | jq 'max'
# 9

echo '[{"name":"Alice","score":85},{"name":"Bob","score":92}]' | jq 'max_by(.score)'
# {"name": "Bob", "score": 92}

# add - sum numbers or concatenate arrays/strings
echo '[1,2,3,4,5]' | jq 'add'
# 15

echo '[["a","b"],["c","d"]]' | jq 'add'
# ["a", "b", "c", "d"]

# indices / index
echo '["a","b","c","b","a"]' | jq 'index("b")'
# 1

# limit and until
echo 'null' | jq '[limit(5; range(100))]'
# [0, 1, 2, 3, 4]

# range - generate number sequences
echo 'null' | jq '[range(5)]'
# [0, 1, 2, 3, 4]

echo 'null' | jq '[range(2;8;2)]'
# [2, 4, 6]`}</code></pre>

      {/* ============================================================ */}
      {/* 7. OBJECT OPERATIONS */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_object}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_object }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# keys - get all keys as sorted array
echo '{"name":"Alice","age":30,"city":"NYC"}' | jq 'keys'
# ["age", "city", "name"]

# keys_unsorted - preserve original order
echo '{"name":"Alice","age":30,"city":"NYC"}' | jq 'keys_unsorted'
# ["name", "age", "city"]

# values - get all values
echo '{"name":"Alice","age":30,"city":"NYC"}' | jq 'values'
# ["Alice", 30, "NYC"]

# to_entries - convert to key-value pair array
echo '{"name":"Alice","age":30}' | jq 'to_entries'
# [{"key": "name", "value": "Alice"}, {"key": "age", "value": 30}]

# from_entries - convert key-value pairs back to object
echo '[{"key":"name","value":"Alice"},{"key":"age","value":30}]' | jq 'from_entries'
# {"name": "Alice", "age": 30}

# from_entries also works with "name"/"value" pairs
echo '[{"name":"x","value":1},{"name":"y","value":2}]' | jq 'from_entries'
# {"x": 1, "y": 2}

# with_entries - transform entries (to_entries | map(f) | from_entries)
echo '{"name":"Alice","age":30}' | jq 'with_entries(.key = "prefix_" + .key)'
# {"prefix_name": "Alice", "prefix_age": 30}

# with_entries - filter by key
echo '{"name":"Alice","age":30,"_internal":true}' | \\
  jq 'with_entries(select(.key | startswith("_") | not))'
# {"name": "Alice", "age": 30}

# Add / merge objects with +
echo '{"a":1,"b":2}' | jq '. + {"c":3,"d":4}'
# {"a": 1, "b": 2, "c": 3, "d": 4}

# Merge with override
echo '{"a":1,"b":2}' | jq '. + {"b":99}'
# {"a": 1, "b": 99}

# * for recursive merge
echo '{"a":{"x":1},"b":2}' | jq '. * {"a":{"y":2}}'
# {"a": {"x": 1, "y": 2}, "b": 2}

# del() - remove a key
echo '{"name":"Alice","age":30,"tmp":true}' | jq 'del(.tmp)'
# {"name": "Alice", "age": 30}

# del() multiple keys
echo '{"a":1,"b":2,"c":3,"d":4}' | jq 'del(.b, .d)'
# {"a": 1, "c": 3}

# Update a field with |=
echo '{"name":"alice","age":30}' | jq '.name |= ascii_upcase'
# {"name": "ALICE", "age": 30}

# Update nested field
echo '{"user":{"name":"Alice","score":85}}' | jq '.user.score |= . + 10'
# {"user": {"name": "Alice", "score": 95}}`}</code></pre>

      {/* ============================================================ */}
      {/* 8. CONDITIONALS & ERROR HANDLING */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_conditionals}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_conditionals }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# if-then-else
echo '{"age":25}' | jq 'if .age >= 18 then "adult" else "minor" end'
# "adult"

# if-then-elif-else
echo '{"score":85}' | jq '
  if .score >= 90 then "A"
  elif .score >= 80 then "B"
  elif .score >= 70 then "C"
  else "F"
  end'
# "B"

# if-then-else with map
echo '[{"name":"Alice","age":30},{"name":"Bob","age":15}]' | \\
  jq 'map(if .age >= 18 then . + {"status":"adult"} else . + {"status":"minor"} end)'
# [{"name":"Alice","age":30,"status":"adult"},{"name":"Bob","age":15,"status":"minor"}]

# Alternative operator // (default value if null or false)
echo '{"name":"Alice"}' | jq '.email // "not set"'
# "not set"

echo '{"name":"Alice","email":"alice@example.com"}' | jq '.email // "not set"'
# "alice@example.com"

# Nested alternative
echo '{"config":{}}' | jq '.config.timeout // .config.default_timeout // 30'
# 30

# try-catch (jq 1.6+)
echo '"not a number"' | jq 'try tonumber catch "invalid number"'
# "invalid number"

# try without catch (silently suppress errors)
echo '{"a":1}' | jq 'try .b.c.d'
# (no output, no error)

# try with array of mixed types
echo '[1,"two",3,"four",5]' | jq '[.[] | try (. + 10)]'
# [11, 13, 15]

# Error handling with if and type
echo '{"value":"hello"}' | jq '
  if (.value | type) == "number" then .value * 2
  else "expected number, got \\(.value | type)"
  end'
# "expected number, got string"

# empty - produce no output (useful in select-like patterns)
echo '[1,2,3,4,5]' | jq '.[] | if . > 3 then . else empty end'
# 4
# 5`}</code></pre>

      {/* ============================================================ */}
      {/* 9. REAL-WORLD EXAMPLES */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_realworld}</h2>
      <p>{t.p_realworld}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Parse GitHub API Responses</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# List repos - extract name, stars, and language
curl -s "https://api.github.com/users/torvalds/repos?per_page=5" | \\
  jq '.[] | {name: .name, stars: .stargazers_count, lang: .language}'

# Find most starred repo
curl -s "https://api.github.com/users/torvalds/repos?per_page=100" | \\
  jq 'max_by(.stargazers_count) | {name, stars: .stargazers_count}'

# List open issues with labels
curl -s "https://api.github.com/repos/jqlang/jq/issues?state=open&per_page=5" | \\
  jq '.[] | {title: .title, labels: [.labels[].name], created: .created_at}'

# Count repos by language
curl -s "https://api.github.com/users/octocat/repos" | \\
  jq 'group_by(.language) | map({lang: .[0].language, count: length}) | sort_by(.count) | reverse'`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">AWS CLI Output Processing</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# List EC2 instances - extract ID, type, state
aws ec2 describe-instances | \\
  jq '.Reservations[].Instances[] | {
    id: .InstanceId,
    type: .InstanceType,
    state: .State.Name,
    name: (.Tags // [] | map(select(.Key == "Name")) | first | .Value // "unnamed")
  }'

# Find running instances only
aws ec2 describe-instances | \\
  jq '[.Reservations[].Instances[] | select(.State.Name == "running")] | length'

# List S3 buckets with creation dates
aws s3api list-buckets | \\
  jq '.Buckets | sort_by(.CreationDate) | .[] | "\\(.Name) - \\(.CreationDate)"'

# Get Lambda function names and runtimes
aws lambda list-functions | \\
  jq '.Functions[] | {name: .FunctionName, runtime: .Runtime, memory: .MemorySize}'`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Log Processing</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Parse JSON log lines (one JSON object per line)
cat app.log | jq -r 'select(.level == "error") | "\\(.timestamp) \\(.message)"'

# Count errors by type
cat app.log | jq -s 'map(select(.level == "error")) | group_by(.error_code) |
  map({code: .[0].error_code, count: length}) | sort_by(.count) | reverse'

# Extract slow requests (>1s)
cat access.log | jq 'select(.response_time_ms > 1000) |
  {path: .request_path, time_ms: .response_time_ms, method: .method}'

# Aggregate stats from JSON logs
cat app.log | jq -s '{
  total: length,
  errors: map(select(.level == "error")) | length,
  avg_response_ms: (map(.response_time_ms) | add / length),
  unique_users: (map(.user_id) | unique | length)
}'`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Docker & Kubernetes</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Docker: list containers with ports
docker inspect $(docker ps -q) | \\
  jq '.[] | {name: .Name, image: .Config.Image, ports: .NetworkSettings.Ports}'

# Docker: get container IP addresses
docker network inspect bridge | \\
  jq '.[0].Containers | to_entries[] | {name: .value.Name, ip: .value.IPv4Address}'

# Kubernetes: get pod names and status
kubectl get pods -o json | \\
  jq '.items[] | {name: .metadata.name, status: .status.phase, restarts: (.status.containerStatuses[0].restartCount // 0)}'

# Kubernetes: find pods not in Running state
kubectl get pods -o json | \\
  jq '[.items[] | select(.status.phase != "Running") | .metadata.name]'`}</code></pre>

      {/* ============================================================ */}
      {/* 10. JQ WITH CURL */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_curl_jq}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p_curl_jq }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Basic: pretty-print API response
curl -s https://api.github.com/users/octocat | jq '.'

# Extract specific fields
curl -s https://api.github.com/users/octocat | jq '{name, bio, public_repos}'

# Process paginated API results
for page in 1 2 3; do
  curl -s "https://api.example.com/items?page=$page" | jq '.items[]'
done | jq -s 'length'

# POST then parse response
curl -s -X POST https://api.example.com/auth \\
  -H "Content-Type: application/json" \\
  -d '{"username":"admin","password":"secret"}' | \\
  jq -r '.token'

# Chain: get token, then use it
TOKEN=$(curl -s -X POST https://api.example.com/auth \\
  -d '{"user":"admin","pass":"secret"}' | jq -r '.token')
curl -s -H "Authorization: Bearer $TOKEN" https://api.example.com/data | jq '.'

# Save extracted data to file
curl -s https://api.github.com/users/octocat/repos | \\
  jq '[.[] | {name, stars: .stargazers_count, url: .html_url}]' > repos.json

# Handle errors in API response
curl -s https://api.example.com/data | \\
  jq 'if .error then "Error: \\(.error.message)" else .data end'

# Headers + jq for debugging
curl -s -D- https://api.example.com/data | \\
  sed '1,/^\\r$/d' | jq '.'

# Multiple API calls with xargs
echo "octocat torvalds gvanrossum" | tr ' ' '\\n' | \\
  xargs -I {} curl -s "https://api.github.com/users/{}" | \\
  jq '{login, name, public_repos}'

# GraphQL API with jq
curl -s -X POST https://api.github.com/graphql \\
  -H "Authorization: bearer $GITHUB_TOKEN" \\
  -d '{"query":"{ viewer { login name }}"}' | \\
  jq '.data.viewer'`}</code></pre>

      {/* ============================================================ */}
      {/* 11. ADVANCED JQ */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_advanced}</h2>
      <p>{t.p_advanced}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">reduce</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Sum with reduce
echo '[1,2,3,4,5]' | jq 'reduce .[] as $x (0; . + $x)'
# 15

# Build object from array with reduce
echo '[["name","Alice"],["age","30"],["city","NYC"]]' | \\
  jq 'reduce .[] as $pair ({}; . + {($pair[0]): $pair[1]})'
# {"name": "Alice", "age": "30", "city": "NYC"}

# Running total with reduce
echo '[10,20,30,40]' | \\
  jq 'reduce .[] as $x ([]; . + [((. | last) // 0) + $x])'
# [10, 30, 60, 100]

# Count occurrences with reduce
echo '["a","b","a","c","b","a"]' | \\
  jq 'reduce .[] as $x ({}; .[$x] = ((.[$x] // 0) + 1))'
# {"a": 3, "b": 2, "c": 1}`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">foreach</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# foreach produces intermediate results
echo 'null' | jq '[foreach range(5) as $x (0; . + $x)]'
# [0, 1, 3, 6, 10]

# foreach with extract expression
echo 'null' | jq '[foreach range(1;6) as $x (1; . * $x; .)]'
# [1, 2, 6, 24, 120]  (factorials)`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Custom Functions (def)</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Define a reusable function
echo '["hello","world"]' | jq 'def capitalize: (.[0:1] | ascii_upcase) + .[1:]; map(capitalize)'
# ["Hello", "World"]

# Function with parameters
echo '[1,2,3,4,5]' | jq 'def clamp(min; max): if . < min then min elif . > max then max else . end; map(clamp(2;4))'
# [2, 2, 3, 4, 4]

# Recursive function
echo '{"a":{"b":{"c":{"d":"found"}}}}' | \\
  jq 'def depth: if type == "object" then (to_entries | map(.value | depth) | max) + 1 elif type == "array" then (map(depth) | max) + 1 else 0 end; depth'
# 4

# Function for formatting bytes
echo '{"size":1073741824}' | jq 'def bytes:
  if . >= 1073741824 then "\\(. / 1073741824 | floor)GB"
  elif . >= 1048576 then "\\(. / 1048576 | floor)MB"
  elif . >= 1024 then "\\(. / 1024 | floor)KB"
  else "\\(.)B"
  end;
.size | bytes'
# "1GB"`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Environment Variables & Arguments</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Access environment variables with $ENV
export MY_VAR="hello"
echo 'null' | jq '$ENV.MY_VAR'
# "hello"

# Access all env vars
echo 'null' | jq '$ENV | keys[:5]'

# --arg: pass string arguments
jq -n --arg name "Alice" --arg age "30" '{name: $name, age: ($age | tonumber)}'
# {"name": "Alice", "age": 30}

# --argjson: pass JSON arguments
jq -n --argjson count 5 --argjson active true '{count: $count, active: $active}'
# {"count": 5, "active": true}

# --slurpfile: read JSON from file into variable
echo '{"name":"Alice"}' > /tmp/user.json
jq -n --slurpfile user /tmp/user.json '$user[0]'
# {"name": "Alice"}

# --slurp (-s): read all inputs into an array
echo -e '{"a":1}\\n{"a":2}\\n{"a":3}' | jq -s 'map(.a) | add'
# 6

# --null-input (-n): don't read stdin
jq -n '{timestamp: now, message: "hello"}'

# --rawfile: read raw file content as string
jq -n --rawfile tmpl template.txt '$tmpl'

# --jsonargs: pass remaining args as JSON
jq -n '$ARGS.positional' --jsonargs 1 2 3
# [1, 2, 3]

# --join-output / -j: no newline at end
echo '{"name":"Alice"}' | jq -j '.name'
# Alice (no trailing newline)

# --exit-status / -e: set exit code based on output
echo '{"ok":true}' | jq -e '.ok' > /dev/null && echo "success"
# success`}</code></pre>

      {/* ============================================================ */}
      {/* 12. CHEAT SHEET TABLE */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_cheatsheet}</h2>
      <p>{t.p_cheatsheet}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.pattern}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.description}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.example}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-700 px-4 py-2"><code>.</code></td><td className="border border-gray-700 px-4 py-2">Identity (pretty-print)</td><td className="border border-gray-700 px-4 py-2"><code>{`jq '.'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>.field</code></td><td className="border border-gray-700 px-4 py-2">Get object field</td><td className="border border-gray-700 px-4 py-2"><code>{`jq '.name'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>.a.b.c</code></td><td className="border border-gray-700 px-4 py-2">Nested field access</td><td className="border border-gray-700 px-4 py-2"><code>{`jq '.user.address.city'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>.[n]</code></td><td className="border border-gray-700 px-4 py-2">Array index</td><td className="border border-gray-700 px-4 py-2"><code>{`jq '.[0]'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>.[]</code></td><td className="border border-gray-700 px-4 py-2">Iterate array/object values</td><td className="border border-gray-700 px-4 py-2"><code>{`jq '.users[]'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>.[m:n]</code></td><td className="border border-gray-700 px-4 py-2">Array slice</td><td className="border border-gray-700 px-4 py-2"><code>{`jq '.[2:5]'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>|</code></td><td className="border border-gray-700 px-4 py-2">Pipe (chain filters)</td><td className="border border-gray-700 px-4 py-2"><code>{`jq '.[] | .name'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>select()</code></td><td className="border border-gray-700 px-4 py-2">Filter by condition</td><td className="border border-gray-700 px-4 py-2"><code>{`jq '.[] | select(.age>30)'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>map()</code></td><td className="border border-gray-700 px-4 py-2">Transform array elements</td><td className="border border-gray-700 px-4 py-2"><code>{`jq 'map(.name)'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>sort_by()</code></td><td className="border border-gray-700 px-4 py-2">Sort array by field</td><td className="border border-gray-700 px-4 py-2"><code>{`jq 'sort_by(.age)'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>group_by()</code></td><td className="border border-gray-700 px-4 py-2">Group by field</td><td className="border border-gray-700 px-4 py-2"><code>{`jq 'group_by(.type)'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>unique_by()</code></td><td className="border border-gray-700 px-4 py-2">Deduplicate by field</td><td className="border border-gray-700 px-4 py-2"><code>{`jq 'unique_by(.id)'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>keys</code></td><td className="border border-gray-700 px-4 py-2">Get object keys</td><td className="border border-gray-700 px-4 py-2"><code>{`jq 'keys'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>values</code></td><td className="border border-gray-700 px-4 py-2">Get object values</td><td className="border border-gray-700 px-4 py-2"><code>{`jq 'values'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>to_entries</code></td><td className="border border-gray-700 px-4 py-2">Object to key-value pairs</td><td className="border border-gray-700 px-4 py-2"><code>{`jq 'to_entries'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>from_entries</code></td><td className="border border-gray-700 px-4 py-2">Key-value pairs to object</td><td className="border border-gray-700 px-4 py-2"><code>{`jq 'from_entries'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>with_entries()</code></td><td className="border border-gray-700 px-4 py-2">Transform entries in place</td><td className="border border-gray-700 px-4 py-2"><code>{`jq 'with_entries(.key|=ascii_upcase)'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>length</code></td><td className="border border-gray-700 px-4 py-2">Array/object/string length</td><td className="border border-gray-700 px-4 py-2"><code>{`jq '.items | length'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>//</code></td><td className="border border-gray-700 px-4 py-2">Alternative (default value)</td><td className="border border-gray-700 px-4 py-2"><code>{`jq '.x // "default"'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>del()</code></td><td className="border border-gray-700 px-4 py-2">Delete key from object</td><td className="border border-gray-700 px-4 py-2"><code>{`jq 'del(.tmp)'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>add</code></td><td className="border border-gray-700 px-4 py-2">Sum array / concat</td><td className="border border-gray-700 px-4 py-2"><code>{`jq '[.[] | .score] | add'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>flatten</code></td><td className="border border-gray-700 px-4 py-2">Flatten nested arrays</td><td className="border border-gray-700 px-4 py-2"><code>{`jq 'flatten'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>@csv / @tsv</code></td><td className="border border-gray-700 px-4 py-2">Format as CSV/TSV</td><td className="border border-gray-700 px-4 py-2"><code>{`jq -r '.[] | @csv'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>@base64</code></td><td className="border border-gray-700 px-4 py-2">Base64 encode</td><td className="border border-gray-700 px-4 py-2"><code>{`jq '.token | @base64'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>--arg k v</code></td><td className="border border-gray-700 px-4 py-2">Pass string argument</td><td className="border border-gray-700 px-4 py-2"><code>{`jq --arg n "Alice" '.name==$n'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-r</code></td><td className="border border-gray-700 px-4 py-2">Raw output (no quotes)</td><td className="border border-gray-700 px-4 py-2"><code>{`jq -r '.name'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-s</code></td><td className="border border-gray-700 px-4 py-2">Slurp: read all inputs as array</td><td className="border border-gray-700 px-4 py-2"><code>{`jq -s 'add'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-c</code></td><td className="border border-gray-700 px-4 py-2">Compact output</td><td className="border border-gray-700 px-4 py-2"><code>{`jq -c '.'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-e</code></td><td className="border border-gray-700 px-4 py-2">Exit status based on output</td><td className="border border-gray-700 px-4 py-2"><code>{`jq -e '.ok'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>reduce</code></td><td className="border border-gray-700 px-4 py-2">Accumulate values</td><td className="border border-gray-700 px-4 py-2"><code>{`jq 'reduce .[] as $x (0;.+$x)'`}</code></td></tr>
          </tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* 13. FAQ */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_faq}</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq1_q}</h3>
      <p>{t.faq1_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq2_q}</h3>
      <p>{t.faq2_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq3_q}</h3>
      <p>{t.faq3_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq4_q}</h3>
      <p>{t.faq4_a}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq5_q}</h3>
      <p>{t.faq5_a}</p>

      {/* ============================================================ */}
      {/* CONCLUSION */}
      {/* ============================================================ */}
      <p className="mt-8">{t.p_conclusion}</p>
      <p>
        <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_tool_bottom}
        </Link>
        {' | '}
        <Link href={`/${lang}/tools/json-viewer`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_viewer}
        </Link>
      </p>
    </article>
  );
}
