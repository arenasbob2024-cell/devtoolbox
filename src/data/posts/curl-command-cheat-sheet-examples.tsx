'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'Whether you are testing REST APIs, debugging webhooks, or automating HTTP requests, <strong>curl</strong> is the Swiss Army knife every developer needs. This comprehensive cheat sheet covers <strong>50+ curl command examples</strong> organized by category so you can copy-paste and adapt them instantly.',
    link_tool: 'Convert curl commands to code with our cURL to Code Converter \u2192',
    h2_basics: 'Basic HTTP Methods',
    p_basics: 'The foundation of API testing with curl. These commands cover the five core HTTP methods used in RESTful APIs: GET, POST, PUT, DELETE, and PATCH.',
    h2_headers: 'Headers & Authentication Headers',
    p_headers: 'HTTP headers let you pass additional information with your requests. Authentication headers are the most common headers you will use when working with APIs.',
    h2_data: 'Sending Data',
    p_data: 'Most API interactions require sending data in the request body. curl supports JSON payloads, form data, file uploads, and multipart requests.',
    h2_auth: 'Authentication Methods',
    p_auth: 'APIs use various authentication mechanisms. Here are curl examples for the most common auth patterns including OAuth, API keys, cookies, and JWT tokens.',
    h2_debug: 'Debugging & Troubleshooting',
    p_debug: 'When API calls fail or behave unexpectedly, these curl flags help you inspect exactly what is happening at the HTTP level.',
    h2_advanced: 'Advanced Usage',
    p_advanced: 'Power-user curl features for production workflows: proxies, retries, rate limiting, and saving responses to files.',
    h2_convert: 'Converting curl to Code',
    p_convert: 'Once you have a working curl command, you often need to convert it to your programming language. Instead of manually translating curl flags to Python requests, JavaScript fetch, or Go http calls, use an automated converter.',
    h2_reference: 'Quick Reference: Top 20 curl Flags',
    p_reference: 'The most commonly used curl flags at a glance. Bookmark this table for quick lookup.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between curl and wget?',
    faq1_a: 'curl is designed for transferring data with URLs and supports a wide range of protocols (HTTP, HTTPS, FTP, SMTP, etc.) with fine-grained control over requests. wget is primarily a file downloader that excels at recursive downloads and mirroring websites. For API testing and development, curl is the standard choice because it supports all HTTP methods, custom headers, and request bodies.',
    faq2_q: 'How do I send a POST request with JSON data using curl?',
    faq2_a: 'Use the -X POST flag with -H "Content-Type: application/json" and -d to specify the JSON body: curl -X POST -H "Content-Type: application/json" -d \'{"key":"value"}\' https://api.example.com/endpoint. The -d flag automatically sets the method to POST, so -X POST is technically optional.',
    faq3_q: 'How do I handle SSL certificate errors in curl?',
    faq3_a: 'Use the -k or --insecure flag to skip SSL certificate verification: curl -k https://self-signed.example.com. This is useful for development with self-signed certificates but should never be used in production. For proper SSL, use --cacert to specify a custom CA bundle or --cert for client certificates.',
    faq4_q: 'How do I save curl output to a file?',
    faq4_a: 'Use -o (lowercase) to save with a custom filename: curl -o response.json https://api.example.com/data. Use -O (uppercase) to save with the remote filename. You can also redirect output using shell redirection: curl https://api.example.com/data > response.json.',
    faq5_q: 'How do I send multiple headers with curl?',
    faq5_a: 'Add multiple -H flags, one for each header: curl -H "Content-Type: application/json" -H "Authorization: Bearer token123" -H "X-Custom-Header: value" https://api.example.com/endpoint. There is no limit to the number of -H flags you can use.',
    faq6_q: 'How do I measure the response time of an API with curl?',
    faq6_a: 'Use the -w (write-out) flag with timing variables: curl -w "\\nTotal time: %{time_total}s\\nDNS: %{time_namelookup}s\\nConnect: %{time_connect}s\\nTTFB: %{time_starttransfer}s\\n" -o /dev/null -s https://api.example.com. This shows total time, DNS lookup time, connection time, and time to first byte.',
    p_conclusion: 'Bookmark this cheat sheet and come back whenever you need a quick curl reference. For converting curl commands to production code, try our converter tool below.',
    link_tool_bottom: 'Try the cURL to Code Converter \u2192',
    flag: 'Flag',
    description: 'Description',
    example: 'Example',
  },
  zh: {
    intro: '\u65e0\u8bba\u4f60\u662f\u5728\u6d4b\u8bd5 REST API\u3001\u8c03\u8bd5 webhook \u8fd8\u662f\u81ea\u52a8\u5316 HTTP \u8bf7\u6c42\uff0c<strong>curl</strong> \u90fd\u662f\u6bcf\u4e2a\u5f00\u53d1\u8005\u5fc5\u5907\u7684\u745e\u58eb\u519b\u5200\u3002\u8fd9\u4efd\u5168\u9762\u7684\u901f\u67e5\u8868\u5305\u542b <strong>50+ \u4e2a curl \u547d\u4ee4\u793a\u4f8b</strong>\uff0c\u6309\u7c7b\u522b\u7ec4\u7ec7\uff0c\u65b9\u4fbf\u4f60\u7acb\u5373\u590d\u5236\u5e76\u4f7f\u7528\u3002',
    link_tool: '\u4f7f\u7528\u6211\u4eec\u7684 cURL \u8f6c\u4ee3\u7801\u8f6c\u6362\u5668\u5c06 curl \u547d\u4ee4\u8f6c\u6362\u4e3a\u4ee3\u7801 \u2192',
    h2_basics: '\u57fa\u672c HTTP \u65b9\u6cd5',
    p_basics: '\u4f7f\u7528 curl \u8fdb\u884c API \u6d4b\u8bd5\u7684\u57fa\u7840\u3002\u8fd9\u4e9b\u547d\u4ee4\u6db5\u76d6 RESTful API \u4e2d\u4f7f\u7528\u7684\u4e94\u79cd\u6838\u5fc3 HTTP \u65b9\u6cd5\uff1aGET\u3001POST\u3001PUT\u3001DELETE \u548c PATCH\u3002',
    h2_headers: '\u8bf7\u6c42\u5934\u4e0e\u8ba4\u8bc1\u5934',
    p_headers: 'HTTP \u8bf7\u6c42\u5934\u8ba9\u4f60\u5728\u8bf7\u6c42\u4e2d\u4f20\u9012\u989d\u5916\u4fe1\u606f\u3002\u8ba4\u8bc1\u5934\u662f\u4f60\u5728\u4f7f\u7528 API \u65f6\u6700\u5e38\u7528\u7684\u5934\u4fe1\u606f\u3002',
    h2_data: '\u53d1\u9001\u6570\u636e',
    p_data: '\u5927\u591a\u6570 API \u4ea4\u4e92\u9700\u8981\u5728\u8bf7\u6c42\u4f53\u4e2d\u53d1\u9001\u6570\u636e\u3002curl \u652f\u6301 JSON \u8d1f\u8f7d\u3001\u8868\u5355\u6570\u636e\u3001\u6587\u4ef6\u4e0a\u4f20\u548c\u591a\u90e8\u5206\u8bf7\u6c42\u3002',
    h2_auth: '\u8ba4\u8bc1\u65b9\u6cd5',
    p_auth: 'API \u4f7f\u7528\u5404\u79cd\u8ba4\u8bc1\u673a\u5236\u3002\u4ee5\u4e0b\u662f\u6700\u5e38\u89c1\u8ba4\u8bc1\u6a21\u5f0f\u7684 curl \u793a\u4f8b\uff0c\u5305\u62ec OAuth\u3001API \u5bc6\u94a5\u3001Cookie \u548c JWT \u4ee4\u724c\u3002',
    h2_debug: '\u8c03\u8bd5\u4e0e\u6392\u9519',
    p_debug: '\u5f53 API \u8c03\u7528\u5931\u8d25\u6216\u884c\u4e3a\u5f02\u5e38\u65f6\uff0c\u8fd9\u4e9b curl \u6807\u5fd7\u53ef\u5e2e\u52a9\u4f60\u68c0\u67e5 HTTP \u5c42\u9762\u5230\u5e95\u53d1\u751f\u4e86\u4ec0\u4e48\u3002',
    h2_advanced: '\u9ad8\u7ea7\u7528\u6cd5',
    p_advanced: '\u9002\u7528\u4e8e\u751f\u4ea7\u73af\u5883\u5de5\u4f5c\u6d41\u7684 curl \u9ad8\u7ea7\u529f\u80fd\uff1a\u4ee3\u7406\u3001\u91cd\u8bd5\u3001\u901f\u7387\u9650\u5236\u548c\u4fdd\u5b58\u54cd\u5e94\u5230\u6587\u4ef6\u3002',
    h2_convert: '\u5c06 curl \u8f6c\u6362\u4e3a\u4ee3\u7801',
    p_convert: '\u5f53\u4f60\u6709\u4e86\u4e00\u4e2a\u53ef\u7528\u7684 curl \u547d\u4ee4\u540e\uff0c\u901a\u5e38\u9700\u8981\u5c06\u5176\u8f6c\u6362\u4e3a\u7f16\u7a0b\u8bed\u8a00\u3002\u4e0e\u5176\u624b\u52a8\u5c06 curl \u6807\u5fd7\u8f6c\u6362\u4e3a Python requests\u3001JavaScript fetch \u6216 Go http \u8c03\u7528\uff0c\u4e0d\u5982\u4f7f\u7528\u81ea\u52a8\u8f6c\u6362\u5668\u3002',
    h2_reference: '\u5feb\u901f\u53c2\u8003\uff1a\u524d 20 \u4e2a curl \u6807\u5fd7',
    p_reference: '\u6700\u5e38\u7528\u7684 curl \u6807\u5fd7\u4e00\u89c8\u3002\u6536\u85cf\u6b64\u8868\u4ee5\u4fbf\u5feb\u901f\u67e5\u627e\u3002',
    h2_faq: '\u5e38\u89c1\u95ee\u9898',
    faq1_q: 'curl \u548c wget \u6709\u4ec0\u4e48\u533a\u522b\uff1f',
    faq1_a: 'curl \u4e13\u4e3a\u4f7f\u7528 URL \u4f20\u8f93\u6570\u636e\u800c\u8bbe\u8ba1\uff0c\u652f\u6301\u5e7f\u6cdb\u7684\u534f\u8bae\uff08HTTP\u3001HTTPS\u3001FTP\u3001SMTP \u7b49\uff09\uff0c\u5bf9\u8bf7\u6c42\u6709\u7cbe\u7ec6\u7684\u63a7\u5236\u3002wget \u4e3b\u8981\u662f\u6587\u4ef6\u4e0b\u8f7d\u5668\uff0c\u64c5\u957f\u9012\u5f52\u4e0b\u8f7d\u548c\u955c\u50cf\u7f51\u7ad9\u3002\u5bf9\u4e8e API \u6d4b\u8bd5\u548c\u5f00\u53d1\uff0ccurl \u662f\u6807\u51c6\u9009\u62e9\u3002',
    faq2_q: '\u5982\u4f55\u4f7f\u7528 curl \u53d1\u9001\u5e26 JSON \u6570\u636e\u7684 POST \u8bf7\u6c42\uff1f',
    faq2_a: '\u4f7f\u7528 -X POST \u6807\u5fd7\u914d\u5408 -H "Content-Type: application/json" \u548c -d \u6765\u6307\u5b9a JSON \u4f53\uff1acurl -X POST -H "Content-Type: application/json" -d \'{"key":"value"}\' https://api.example.com/endpoint\u3002-d \u6807\u5fd7\u4f1a\u81ea\u52a8\u5c06\u65b9\u6cd5\u8bbe\u4e3a POST\uff0c\u56e0\u6b64 -X POST \u5728\u6280\u672f\u4e0a\u662f\u53ef\u9009\u7684\u3002',
    faq3_q: '\u5982\u4f55\u5904\u7406 curl \u4e2d\u7684 SSL \u8bc1\u4e66\u9519\u8bef\uff1f',
    faq3_a: '\u4f7f\u7528 -k \u6216 --insecure \u6807\u5fd7\u8df3\u8fc7 SSL \u8bc1\u4e66\u9a8c\u8bc1\u3002\u8fd9\u5bf9\u4e8e\u4f7f\u7528\u81ea\u7b7e\u540d\u8bc1\u4e66\u7684\u5f00\u53d1\u5f88\u6709\u7528\uff0c\u4f46\u4e0d\u5e94\u5728\u751f\u4ea7\u73af\u5883\u4e2d\u4f7f\u7528\u3002\u5bf9\u4e8e\u6b63\u786e\u7684 SSL\uff0c\u4f7f\u7528 --cacert \u6307\u5b9a\u81ea\u5b9a\u4e49 CA \u5305\u6216 --cert \u7528\u4e8e\u5ba2\u6237\u7aef\u8bc1\u4e66\u3002',
    faq4_q: '\u5982\u4f55\u5c06 curl \u8f93\u51fa\u4fdd\u5b58\u5230\u6587\u4ef6\uff1f',
    faq4_a: '\u4f7f\u7528 -o\uff08\u5c0f\u5199\uff09\u4fdd\u5b58\u4e3a\u81ea\u5b9a\u4e49\u6587\u4ef6\u540d\uff1acurl -o response.json https://api.example.com/data\u3002\u4f7f\u7528 -O\uff08\u5927\u5199\uff09\u4ee5\u8fdc\u7a0b\u6587\u4ef6\u540d\u4fdd\u5b58\u3002\u4e5f\u53ef\u4ee5\u4f7f\u7528 shell \u91cd\u5b9a\u5411\uff1acurl url > response.json\u3002',
    faq5_q: '\u5982\u4f55\u5728 curl \u4e2d\u53d1\u9001\u591a\u4e2a\u5934\u4fe1\u606f\uff1f',
    faq5_a: '\u6dfb\u52a0\u591a\u4e2a -H \u6807\u5fd7\uff0c\u6bcf\u4e2a\u5934\u4fe1\u606f\u4e00\u4e2a\uff1acurl -H "Content-Type: application/json" -H "Authorization: Bearer token" -H "X-Custom: value" url\u3002-H \u6807\u5fd7\u7684\u6570\u91cf\u6ca1\u6709\u9650\u5236\u3002',
    faq6_q: '\u5982\u4f55\u7528 curl \u6d4b\u91cf API \u7684\u54cd\u5e94\u65f6\u95f4\uff1f',
    faq6_a: '\u4f7f\u7528 -w \u6807\u5fd7\u914d\u5408\u8ba1\u65f6\u53d8\u91cf\uff1acurl -w "Total: %{time_total}s" -o /dev/null -s url\u3002\u8fd9\u53ef\u4ee5\u663e\u793a\u603b\u65f6\u95f4\u3001DNS \u67e5\u627e\u65f6\u95f4\u3001\u8fde\u63a5\u65f6\u95f4\u548c\u9996\u5b57\u8282\u65f6\u95f4\u3002',
    p_conclusion: '\u6536\u85cf\u8fd9\u4efd\u901f\u67e5\u8868\uff0c\u968f\u65f6\u67e5\u9605 curl \u53c2\u8003\u3002\u8981\u5c06 curl \u547d\u4ee4\u8f6c\u6362\u4e3a\u751f\u4ea7\u4ee3\u7801\uff0c\u8bf7\u8bd5\u8bd5\u6211\u4eec\u7684\u8f6c\u6362\u5668\u5de5\u5177\u3002',
    link_tool_bottom: '\u8bd5\u8bd5 cURL \u8f6c\u4ee3\u7801\u8f6c\u6362\u5668 \u2192',
    flag: '\u6807\u5fd7',
    description: '\u63cf\u8ff0',
    example: '\u793a\u4f8b',
  },
  ja: {
    intro: 'REST API\u306e\u30c6\u30b9\u30c8\u3001Webhook\u306e\u30c7\u30d0\u30c3\u30b0\u3001HTTP\u30ea\u30af\u30a8\u30b9\u30c8\u306e\u81ea\u52d5\u5316\u306a\u3069\u3001<strong>curl</strong>\u306f\u3059\u3079\u3066\u306e\u958b\u767a\u8005\u306b\u5fc5\u8981\u306a\u4e07\u80fd\u30c4\u30fc\u30eb\u3067\u3059\u3002\u3053\u306e\u5305\u62ec\u7684\u306a\u30c1\u30fc\u30c8\u30b7\u30fc\u30c8\u306b\u306f\u3001\u30ab\u30c6\u30b4\u30ea\u5225\u306b\u6574\u7406\u3055\u308c\u305f<strong>50\u4ee5\u4e0a\u306ecurl\u30b3\u30de\u30f3\u30c9\u4f8b</strong>\u304c\u542b\u307e\u308c\u3066\u3044\u307e\u3059\u3002',
    link_tool: 'cURL\u30b3\u30fc\u30c9\u5909\u63db\u30c4\u30fc\u30eb\u3067curl\u30b3\u30de\u30f3\u30c9\u3092\u30b3\u30fc\u30c9\u306b\u5909\u63db \u2192',
    h2_basics: '\u57fa\u672cHTTP\u30e1\u30bd\u30c3\u30c9',
    p_basics: 'curl\u3067\u306eAPI\u30c6\u30b9\u30c8\u306e\u57fa\u672c\u3002RESTful API\u3067\u4f7f\u7528\u3055\u308c\u308b5\u3064\u306e\u4e3b\u8981HTTP\u30e1\u30bd\u30c3\u30c9\uff1aGET\u3001POST\u3001PUT\u3001DELETE\u3001PATCH\u3002',
    h2_headers: '\u30d8\u30c3\u30c0\u30fc\u3068\u8a8d\u8a3c\u30d8\u30c3\u30c0\u30fc',
    p_headers: 'HTTP\u30d8\u30c3\u30c0\u30fc\u3067\u30ea\u30af\u30a8\u30b9\u30c8\u306b\u8ffd\u52a0\u60c5\u5831\u3092\u6e21\u3059\u3053\u3068\u304c\u3067\u304d\u307e\u3059\u3002\u8a8d\u8a3c\u30d8\u30c3\u30c0\u30fc\u306fAPI\u3067\u6700\u3082\u3088\u304f\u4f7f\u308f\u308c\u308b\u30d8\u30c3\u30c0\u30fc\u3067\u3059\u3002',
    h2_data: '\u30c7\u30fc\u30bf\u306e\u9001\u4fe1',
    p_data: '\u307b\u3068\u3093\u3069\u306eAPI\u64cd\u4f5c\u306b\u306f\u30ea\u30af\u30a8\u30b9\u30c8\u30dc\u30c7\u30a3\u3067\u306e\u30c7\u30fc\u30bf\u9001\u4fe1\u304c\u5fc5\u8981\u3067\u3059\u3002curl\u306fJSON\u3001\u30d5\u30a9\u30fc\u30e0\u30c7\u30fc\u30bf\u3001\u30d5\u30a1\u30a4\u30eb\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u3001\u30de\u30eb\u30c1\u30d1\u30fc\u30c8\u30ea\u30af\u30a8\u30b9\u30c8\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u307e\u3059\u3002',
    h2_auth: '\u8a8d\u8a3c\u65b9\u6cd5',
    p_auth: 'API\u306f\u3055\u307e\u3056\u307e\u306a\u8a8d\u8a3c\u30e1\u30ab\u30cb\u30ba\u30e0\u3092\u4f7f\u7528\u3057\u307e\u3059\u3002OAuth\u3001API\u30ad\u30fc\u3001Cookie\u3001JWT\u30c8\u30fc\u30af\u30f3\u306ecurl\u4f8b\u3067\u3059\u3002',
    h2_debug: '\u30c7\u30d0\u30c3\u30b0\u3068\u30c8\u30e9\u30d6\u30eb\u30b7\u30e5\u30fc\u30c6\u30a3\u30f3\u30b0',
    p_debug: 'API\u30b3\u30fc\u30eb\u304c\u5931\u6557\u3057\u305f\u308a\u4e88\u671f\u3057\u306a\u3044\u52d5\u4f5c\u3092\u3057\u305f\u5834\u5408\u3001\u3053\u308c\u3089\u306ecurl\u30d5\u30e9\u30b0\u3067HTTP\u30ec\u30d9\u30eb\u3067\u4f55\u304c\u8d77\u304d\u3066\u3044\u308b\u304b\u3092\u78ba\u8a8d\u3067\u304d\u307e\u3059\u3002',
    h2_advanced: '\u9ad8\u5ea6\u306a\u4f7f\u3044\u65b9',
    p_advanced: '\u30d7\u30ed\u30c0\u30af\u30b7\u30e7\u30f3\u30ef\u30fc\u30af\u30d5\u30ed\u30fc\u5411\u3051\u306ecurl\u30d1\u30ef\u30fc\u30e6\u30fc\u30b6\u30fc\u6a5f\u80fd\uff1a\u30d7\u30ed\u30ad\u30b7\u3001\u30ea\u30c8\u30e9\u30a4\u3001\u30ec\u30fc\u30c8\u5236\u9650\u3001\u30ec\u30b9\u30dd\u30f3\u30b9\u306e\u30d5\u30a1\u30a4\u30eb\u4fdd\u5b58\u3002',
    h2_convert: 'curl\u3092\u30b3\u30fc\u30c9\u306b\u5909\u63db',
    p_convert: '\u52d5\u4f5c\u3059\u308bcurl\u30b3\u30de\u30f3\u30c9\u304c\u3067\u304d\u305f\u3089\u3001\u30d7\u30ed\u30b0\u30e9\u30df\u30f3\u30b0\u8a00\u8a9e\u306b\u5909\u63db\u3059\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002\u624b\u52d5\u3067\u5909\u63db\u3059\u308b\u4ee3\u308f\u308a\u306b\u3001\u81ea\u52d5\u5909\u63db\u30c4\u30fc\u30eb\u3092\u4f7f\u3044\u307e\u3057\u3087\u3046\u3002',
    h2_reference: '\u30af\u30a4\u30c3\u30af\u30ea\u30d5\u30a1\u30ec\u30f3\u30b9\uff1acurl\u30d5\u30e9\u30b0\u30c8\u30c3\u30d720',
    p_reference: '\u6700\u3082\u3088\u304f\u4f7f\u308f\u308c\u308bcurl\u30d5\u30e9\u30b0\u4e00\u89a7\u3002\u3053\u306e\u8868\u3092\u30d6\u30c3\u30af\u30de\u30fc\u30af\u3057\u3066\u7d20\u65e9\u304f\u53c2\u7167\u3002',
    h2_faq: '\u3088\u304f\u3042\u308b\u8cea\u554f',
    faq1_q: 'curl\u3068wget\u306e\u9055\u3044\u306f\uff1f',
    faq1_a: 'curl\u306fURL\u3067\u306e\u30c7\u30fc\u30bf\u8ee2\u9001\u7528\u306b\u8a2d\u8a08\u3055\u308c\u3001\u5e45\u5e83\u3044\u30d7\u30ed\u30c8\u30b3\u30eb\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u307e\u3059\u3002wget\u306f\u4e3b\u306b\u30d5\u30a1\u30a4\u30eb\u30c0\u30a6\u30f3\u30ed\u30fc\u30c0\u30fc\u3067\u3059\u3002API\u30c6\u30b9\u30c8\u306b\u306fcurl\u304c\u6a19\u6e96\u3067\u3059\u3002',
    faq2_q: 'curl\u3067JSON\u30c7\u30fc\u30bf\u3092POST\u3059\u308b\u306b\u306f\uff1f',
    faq2_a: '-X POST -H "Content-Type: application/json" -d \u3067JSON\u30dc\u30c7\u30a3\u3092\u6307\u5b9a\u3057\u307e\u3059\u3002-d\u30d5\u30e9\u30b0\u306f\u81ea\u52d5\u7684\u306bPOST\u3092\u8a2d\u5b9a\u3059\u308b\u306e\u3067-X POST\u306f\u6280\u8853\u7684\u306b\u306f\u4e0d\u8981\u3067\u3059\u3002',
    faq3_q: 'curl\u306eSSL\u8a3c\u660e\u66f8\u30a8\u30e9\u30fc\u3092\u51e6\u7406\u3059\u308b\u306b\u306f\uff1f',
    faq3_a: '-k\u307e\u305f\u306f--insecure\u30d5\u30e9\u30b0\u3067SSL\u8a3c\u660e\u66f8\u691c\u8a3c\u3092\u30b9\u30ad\u30c3\u30d7\u3057\u307e\u3059\u3002\u958b\u767a\u7528\u306b\u306f\u4fbf\u5229\u3067\u3059\u304c\u3001\u672c\u756a\u74b0\u5883\u3067\u306f\u4f7f\u308f\u306a\u3044\u3067\u304f\u3060\u3055\u3044\u3002',
    faq4_q: 'curl\u306e\u51fa\u529b\u3092\u30d5\u30a1\u30a4\u30eb\u306b\u4fdd\u5b58\u3059\u308b\u306b\u306f\uff1f',
    faq4_a: '-o\uff08\u5c0f\u6587\u5b57\uff09\u3067\u30ab\u30b9\u30bf\u30e0\u30d5\u30a1\u30a4\u30eb\u540d\u3001-O\uff08\u5927\u6587\u5b57\uff09\u3067\u30ea\u30e2\u30fc\u30c8\u30d5\u30a1\u30a4\u30eb\u540d\u3067\u4fdd\u5b58\u3057\u307e\u3059\u3002',
    faq5_q: 'curl\u3067\u8907\u6570\u306e\u30d8\u30c3\u30c0\u30fc\u3092\u9001\u308b\u306b\u306f\uff1f',
    faq5_a: '\u8907\u6570\u306e-H\u30d5\u30e9\u30b0\u3092\u8ffd\u52a0\u3057\u307e\u3059\u3002-H\u30d5\u30e9\u30b0\u306e\u6570\u306b\u5236\u9650\u306f\u3042\u308a\u307e\u305b\u3093\u3002',
    faq6_q: 'curl\u3067API\u306e\u30ec\u30b9\u30dd\u30f3\u30b9\u6642\u9593\u3092\u6e2c\u5b9a\u3059\u308b\u306b\u306f\uff1f',
    faq6_a: '-w\u30d5\u30e9\u30b0\u3068\u30bf\u30a4\u30df\u30f3\u30b0\u5909\u6570\u3092\u4f7f\u7528\u3057\u307e\u3059\u3002\u7dcf\u6642\u9593\u3001DNS\u67e5\u7d22\u6642\u9593\u3001\u63a5\u7d9a\u6642\u9593\u3001\u6700\u521d\u306e\u30d0\u30a4\u30c8\u307e\u3067\u306e\u6642\u9593\u3092\u8868\u793a\u3067\u304d\u307e\u3059\u3002',
    p_conclusion: '\u3053\u306e\u30c1\u30fc\u30c8\u30b7\u30fc\u30c8\u3092\u30d6\u30c3\u30af\u30de\u30fc\u30af\u3057\u3066\u304f\u3060\u3055\u3044\u3002curl\u30b3\u30de\u30f3\u30c9\u3092\u30b3\u30fc\u30c9\u306b\u5909\u63db\u3059\u308b\u306b\u306f\u3001\u4ee5\u4e0b\u306e\u30c4\u30fc\u30eb\u3092\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002',
    link_tool_bottom: 'cURL\u30b3\u30fc\u30c9\u5909\u63db\u30c4\u30fc\u30eb\u3092\u8a66\u3059 \u2192',
    flag: '\u30d5\u30e9\u30b0',
    description: '\u8aac\u660e',
    example: '\u4f8b',
  },
  ko: {
    intro: 'REST API \ud14c\uc2a4\ud2b8, \uc6f9\ud6c5 \ub514\ubc84\uadf8, HTTP \uc694\uccad \uc790\ub3d9\ud654 \ub4f1 <strong>curl</strong>\uc740 \ubaa8\ub4e0 \uac1c\ubc1c\uc790\uc5d0\uac8c \ud544\uc694\ud55c \ub9cc\ub2a5 \ub3c4\uad6c\uc785\ub2c8\ub2e4. \uc774 \ud3ec\uad04\uc801\uc778 \uce58\ud2b8\uc2dc\ud2b8\uc5d0\ub294 \uce74\ud14c\uace0\ub9ac\ubcc4\ub85c \uc815\ub9ac\ub41c <strong>50\uac1c \uc774\uc0c1\uc758 curl \uba85\ub839\uc5b4 \uc608\uc81c</strong>\uac00 \ud3ec\ud568\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4.',
    link_tool: 'cURL \ucf54\ub4dc \ubcc0\ud658\uae30\ub85c curl \uba85\ub839\uc5b4\ub97c \ucf54\ub4dc\ub85c \ubcc0\ud658 \u2192',
    h2_basics: '\uae30\ubcf8 HTTP \uba54\uc11c\ub4dc',
    p_basics: 'curl\ub85c API \ud14c\uc2a4\ud2b8\uc758 \uae30\ucd08. RESTful API\uc5d0\uc11c \uc0ac\uc6a9\ub418\ub294 5\uac00\uc9c0 \ud575\uc2ec HTTP \uba54\uc11c\ub4dc: GET, POST, PUT, DELETE, PATCH.',
    h2_headers: '\ud5e4\ub354 \ubc0f \uc778\uc99d \ud5e4\ub354',
    p_headers: 'HTTP \ud5e4\ub354\ub85c \uc694\uccad\uc5d0 \ucd94\uac00 \uc815\ubcf4\ub97c \uc804\ub2ec\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc778\uc99d \ud5e4\ub354\ub294 API \uc791\uc5c5 \uc2dc \uac00\uc7a5 \ub9ce\uc774 \uc0ac\uc6a9\ud558\ub294 \ud5e4\ub354\uc785\ub2c8\ub2e4.',
    h2_data: '\ub370\uc774\ud130 \uc804\uc1a1',
    p_data: '\ub300\ubd80\ubd84\uc758 API \uc0c1\ud638\uc791\uc6a9\uc740 \uc694\uccad \ubcf8\ubb38\uc5d0 \ub370\uc774\ud130\ub97c \ubcf4\ub0b4\uc57c \ud569\ub2c8\ub2e4. curl\uc740 JSON, \ud3fc \ub370\uc774\ud130, \ud30c\uc77c \uc5c5\ub85c\ub4dc, \uba40\ud2f0\ud30c\ud2b8 \uc694\uccad\uc744 \uc9c0\uc6d0\ud569\ub2c8\ub2e4.',
    h2_auth: '\uc778\uc99d \ubc29\ubc95',
    p_auth: 'API\ub294 \ub2e4\uc591\ud55c \uc778\uc99d \uba54\ucee4\ub2c8\uc998\uc744 \uc0ac\uc6a9\ud569\ub2c8\ub2e4. OAuth, API \ud0a4, \ucfe0\ud0a4, JWT \ud1a0\ud070 \ub4f1 \uac00\uc7a5 \uc77c\ubc18\uc801\uc778 \uc778\uc99d \ud328\ud134\uc758 curl \uc608\uc81c\uc785\ub2c8\ub2e4.',
    h2_debug: '\ub514\ubc84\uadf8 \ubc0f \ud2b8\ub7ec\ube14\uc288\ud305',
    p_debug: 'API \ud638\ucd9c\uc774 \uc2e4\ud328\ud558\uac70\ub098 \uc608\uc0c1\uce58 \ubabb\ud55c \ub3d9\uc791\uc744 \ud560 \ub54c, \uc774\ub7ec\ud55c curl \ud50c\ub798\uadf8\ub85c HTTP \ub808\ubca8\uc5d0\uc11c \ubb34\uc2a8 \uc77c\uc774 \uc77c\uc5b4\ub098\ub294\uc9c0 \ud655\uc778\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.',
    h2_advanced: '\uace0\uae09 \uc0ac\uc6a9\ubc95',
    p_advanced: '\ud504\ub85c\ub355\uc158 \uc6cc\ud06c\ud50c\ub85c\uc6b0\ub97c \uc704\ud55c curl \uace0\uae09 \uae30\ub2a5: \ud504\ub85d\uc2dc, \uc7ac\uc2dc\ub3c4, \uc18d\ub3c4 \uc81c\ud55c, \uc751\ub2f5 \ud30c\uc77c \uc800\uc7a5.',
    h2_convert: 'curl\uc744 \ucf54\ub4dc\ub85c \ubcc0\ud658',
    p_convert: '\uc791\ub3d9\ud558\ub294 curl \uba85\ub839\uc5b4\uac00 \uc788\uc73c\uba74 \ud504\ub85c\uadf8\ub798\ubc0d \uc5b8\uc5b4\ub85c \ubcc0\ud658\ud574\uc57c \ud569\ub2c8\ub2e4. \uc218\ub3d9\uc73c\ub85c \ubcc0\ud658\ud558\ub294 \ub300\uc2e0 \uc790\ub3d9 \ubcc0\ud658\uae30\ub97c \uc0ac\uc6a9\ud558\uc138\uc694.',
    h2_reference: '\ube60\ub978 \ucc38\uc870: curl \ud50c\ub798\uadf8 \ud1b1 20',
    p_reference: '\uac00\uc7a5 \ub9ce\uc774 \uc0ac\uc6a9\ub418\ub294 curl \ud50c\ub798\uadf8 \ud55c\ub208\uc5d0 \ubcf4\uae30. \uc774 \ud45c\ub97c \ubd81\ub9c8\ud06c\ud558\uc5ec \ube60\ub974\uac8c \ucc38\uc870\ud558\uc138\uc694.',
    h2_faq: '\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38',
    faq1_q: 'curl\uacfc wget\uc758 \ucc28\uc774\uc810\uc740?',
    faq1_a: 'curl\uc740 URL\ub85c \ub370\uc774\ud130 \uc804\uc1a1\uc6a9\uc73c\ub85c \uc124\uacc4\ub418\uc5b4 \ub2e4\uc591\ud55c \ud504\ub85c\ud1a0\ucf5c\uc744 \uc9c0\uc6d0\ud569\ub2c8\ub2e4. wget\uc740 \uc8fc\ub85c \ud30c\uc77c \ub2e4\uc6b4\ub85c\ub354\uc785\ub2c8\ub2e4. API \ud14c\uc2a4\ud2b8\uc5d0\ub294 curl\uc774 \ud45c\uc900\uc785\ub2c8\ub2e4.',
    faq2_q: 'curl\ub85c JSON \ub370\uc774\ud130\ub97c POST\ud558\ub824\uba74?',
    faq2_a: '-X POST -H "Content-Type: application/json" -d\ub85c JSON \ubcf8\ubb38\uc744 \uc9c0\uc815\ud569\ub2c8\ub2e4. -d \ud50c\ub798\uadf8\ub294 \uc790\ub3d9\uc73c\ub85c POST\ub97c \uc124\uc815\ud558\ubbc0\ub85c -X POST\ub294 \uae30\uc220\uc801\uc73c\ub85c \uc120\ud0dd\uc0ac\ud56d\uc785\ub2c8\ub2e4.',
    faq3_q: 'curl\uc5d0\uc11c SSL \uc778\uc99d\uc11c \uc624\ub958\ub97c \ucc98\ub9ac\ud558\ub824\uba74?',
    faq3_a: '-k \ub610\ub294 --insecure \ud50c\ub798\uadf8\ub85c SSL \uc778\uc99d\uc11c \uac80\uc99d\uc744 \uac74\ub108\ub705\ub2c8\ub2e4. \uac1c\ubc1c\uc5d0\ub294 \uc720\uc6a9\ud558\uc9c0\ub9cc \ud504\ub85c\ub355\uc158\uc5d0\uc11c\ub294 \uc0ac\uc6a9\ud558\uc9c0 \ub9c8\uc138\uc694.',
    faq4_q: 'curl \ucd9c\ub825\uc744 \ud30c\uc77c\ub85c \uc800\uc7a5\ud558\ub824\uba74?',
    faq4_a: '-o(\uc18c\ubb38\uc790)\ub85c \uc0ac\uc6a9\uc790 \uc9c0\uc815 \ud30c\uc77c\uba85, -O(\ub300\ubb38\uc790)\ub85c \uc6d0\uaca9 \ud30c\uc77c\uba85\uc73c\ub85c \uc800\uc7a5\ud569\ub2c8\ub2e4.',
    faq5_q: 'curl\uc5d0\uc11c \uc5ec\ub7ec \ud5e4\ub354\ub97c \ubcf4\ub0b4\ub824\uba74?',
    faq5_a: '\uc5ec\ub7ec \uac1c\uc758 -H \ud50c\ub798\uadf8\ub97c \ucd94\uac00\ud569\ub2c8\ub2e4. -H \ud50c\ub798\uadf8 \uc218\uc5d0\ub294 \uc81c\ud55c\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.',
    faq6_q: 'curl\ub85c API \uc751\ub2f5 \uc2dc\uac04\uc744 \uce21\uc815\ud558\ub824\uba74?',
    faq6_a: '-w \ud50c\ub798\uadf8\uc640 \ud0c0\uc774\ubc0d \ubcc0\uc218\ub97c \uc0ac\uc6a9\ud569\ub2c8\ub2e4. \ucd1d \uc2dc\uac04, DNS \uc870\ud68c \uc2dc\uac04, \uc5f0\uacb0 \uc2dc\uac04, \uccab \ubc14\uc774\ud2b8\uae4c\uc9c0\uc758 \uc2dc\uac04\uc744 \ud45c\uc2dc\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.',
    p_conclusion: '\uc774 \uce58\ud2b8\uc2dc\ud2b8\ub97c \ubd81\ub9c8\ud06c\ud558\uc138\uc694. curl \uba85\ub839\uc5b4\ub97c \ucf54\ub4dc\ub85c \ubcc0\ud658\ud558\ub824\uba74 \uc544\ub798 \ubcc0\ud658 \ub3c4\uad6c\ub97c \uc0ac\uc6a9\ud574 \ubcf4\uc138\uc694.',
    link_tool_bottom: 'cURL \ucf54\ub4dc \ubcc0\ud658\uae30 \uc0ac\uc6a9\ud558\uae30 \u2192',
    flag: '\ud50c\ub798\uadf8',
    description: '\uc124\uba85',
    example: '\uc608\uc81c',
  },
  fr: {
    intro: 'Que vous testiez des API REST, d\u00e9boguiez des webhooks ou automatisiez des requ\u00eates HTTP, <strong>curl</strong> est le couteau suisse dont chaque d\u00e9veloppeur a besoin. Ce guide complet contient <strong>plus de 50 exemples de commandes curl</strong> organis\u00e9s par cat\u00e9gorie.',
    link_tool: 'Convertissez les commandes curl en code avec notre convertisseur cURL vers Code \u2192',
    h2_basics: 'M\u00e9thodes HTTP de base',
    p_basics: 'Les fondamentaux des tests API avec curl. Ces commandes couvrent les cinq m\u00e9thodes HTTP principales : GET, POST, PUT, DELETE et PATCH.',
    h2_headers: 'En-t\u00eates et en-t\u00eates d\'authentification',
    p_headers: 'Les en-t\u00eates HTTP permettent de passer des informations suppl\u00e9mentaires avec vos requ\u00eates. Les en-t\u00eates d\'authentification sont les plus couramment utilis\u00e9s.',
    h2_data: 'Envoi de donn\u00e9es',
    p_data: 'La plupart des interactions API n\u00e9cessitent l\'envoi de donn\u00e9es dans le corps de la requ\u00eate. curl prend en charge les payloads JSON, les donn\u00e9es de formulaire, le t\u00e9l\u00e9chargement de fichiers et les requ\u00eates multipart.',
    h2_auth: 'M\u00e9thodes d\'authentification',
    p_auth: 'Les API utilisent divers m\u00e9canismes d\'authentification. Voici des exemples curl pour les mod\u00e8les d\'auth les plus courants : OAuth, cl\u00e9s API, cookies et jetons JWT.',
    h2_debug: 'D\u00e9bogage et d\u00e9pannage',
    p_debug: 'Lorsque les appels API \u00e9chouent ou se comportent de mani\u00e8re inattendue, ces flags curl vous aident \u00e0 inspecter ce qui se passe au niveau HTTP.',
    h2_advanced: 'Utilisation avanc\u00e9e',
    p_advanced: 'Fonctionnalit\u00e9s avanc\u00e9es de curl pour les workflows de production : proxies, retry, limitation de d\u00e9bit et sauvegarde des r\u00e9ponses.',
    h2_convert: 'Convertir curl en code',
    p_convert: 'Une fois que vous avez une commande curl fonctionnelle, vous devez souvent la convertir dans votre langage de programmation. Utilisez un convertisseur automatis\u00e9 plut\u00f4t que de traduire manuellement.',
    h2_reference: 'R\u00e9f\u00e9rence rapide : Top 20 des flags curl',
    p_reference: 'Les flags curl les plus utilis\u00e9s en un coup d\'\u0153il. Mettez ce tableau en favori.',
    h2_faq: 'Questions fr\u00e9quentes',
    faq1_q: 'Quelle est la diff\u00e9rence entre curl et wget ?',
    faq1_a: 'curl est con\u00e7u pour transf\u00e9rer des donn\u00e9es via URL et supporte de nombreux protocoles. wget est principalement un t\u00e9l\u00e9chargeur de fichiers. Pour les tests API, curl est le choix standard.',
    faq2_q: 'Comment envoyer une requ\u00eate POST avec des donn\u00e9es JSON ?',
    faq2_a: 'Utilisez -X POST avec -H "Content-Type: application/json" et -d pour sp\u00e9cifier le corps JSON. Le flag -d d\u00e9finit automatiquement la m\u00e9thode POST.',
    faq3_q: 'Comment g\u00e9rer les erreurs de certificat SSL ?',
    faq3_a: 'Utilisez le flag -k ou --insecure pour ignorer la v\u00e9rification SSL. Utile en d\u00e9veloppement avec des certificats auto-sign\u00e9s, mais \u00e0 ne jamais utiliser en production.',
    faq4_q: 'Comment sauvegarder la sortie curl dans un fichier ?',
    faq4_a: 'Utilisez -o (minuscule) pour un nom personnalis\u00e9 : curl -o response.json url. Utilisez -O (majuscule) pour le nom distant.',
    faq5_q: 'Comment envoyer plusieurs en-t\u00eates avec curl ?',
    faq5_a: 'Ajoutez plusieurs flags -H, un par en-t\u00eate. Il n\'y a pas de limite au nombre de flags -H.',
    faq6_q: 'Comment mesurer le temps de r\u00e9ponse d\'une API ?',
    faq6_a: 'Utilisez le flag -w avec des variables de timing : curl -w "Total: %{time_total}s" -o /dev/null -s url.',
    p_conclusion: 'Mettez cette fiche en favori. Pour convertir des commandes curl en code de production, essayez notre outil ci-dessous.',
    link_tool_bottom: 'Essayer le convertisseur cURL vers Code \u2192',
    flag: 'Flag',
    description: 'Description',
    example: 'Exemple',
  },
  de: {
    intro: 'Ob Sie REST-APIs testen, Webhooks debuggen oder HTTP-Anfragen automatisieren \u2014 <strong>curl</strong> ist das Schweizer Taschenmesser, das jeder Entwickler braucht. Dieses umfassende Cheat Sheet enth\u00e4lt <strong>\u00fcber 50 curl-Befehlsbeispiele</strong>, nach Kategorien organisiert.',
    link_tool: 'Konvertieren Sie curl-Befehle in Code mit unserem cURL-zu-Code-Konverter \u2192',
    h2_basics: 'Grundlegende HTTP-Methoden',
    p_basics: 'Die Grundlagen des API-Tests mit curl. Diese Befehle decken die f\u00fcnf wichtigsten HTTP-Methoden ab: GET, POST, PUT, DELETE und PATCH.',
    h2_headers: 'Header und Authentifizierungs-Header',
    p_headers: 'HTTP-Header erm\u00f6glichen es, zus\u00e4tzliche Informationen mit Anfragen zu \u00fcbermitteln. Authentifizierungs-Header sind die am h\u00e4ufigsten verwendeten Header bei der API-Arbeit.',
    h2_data: 'Daten senden',
    p_data: 'Die meisten API-Interaktionen erfordern das Senden von Daten im Request-Body. curl unterst\u00fctzt JSON-Payloads, Formulardaten, Datei-Uploads und Multipart-Anfragen.',
    h2_auth: 'Authentifizierungsmethoden',
    p_auth: 'APIs verwenden verschiedene Authentifizierungsmechanismen. Hier sind curl-Beispiele f\u00fcr die g\u00e4ngigsten Auth-Muster: OAuth, API-Schl\u00fcssel, Cookies und JWT-Tokens.',
    h2_debug: 'Debugging und Fehlerbehebung',
    p_debug: 'Wenn API-Aufrufe fehlschlagen oder sich unerwartet verhalten, helfen diese curl-Flags, genau zu untersuchen, was auf HTTP-Ebene passiert.',
    h2_advanced: 'Fortgeschrittene Nutzung',
    p_advanced: 'curl-Power-User-Funktionen f\u00fcr Produktions-Workflows: Proxies, Retries, Rate-Limiting und Speichern von Antworten in Dateien.',
    h2_convert: 'curl in Code konvertieren',
    p_convert: 'Sobald Sie einen funktionierenden curl-Befehl haben, m\u00fcssen Sie ihn oft in Ihre Programmiersprache konvertieren. Verwenden Sie einen automatisierten Konverter statt manueller \u00dcbersetzung.',
    h2_reference: 'Schnellreferenz: Top 20 curl-Flags',
    p_reference: 'Die am h\u00e4ufigsten verwendeten curl-Flags auf einen Blick. Speichern Sie diese Tabelle als Lesezeichen.',
    h2_faq: 'H\u00e4ufig gestellte Fragen',
    faq1_q: 'Was ist der Unterschied zwischen curl und wget?',
    faq1_a: 'curl ist f\u00fcr die Daten\u00fcbertragung \u00fcber URLs konzipiert und unterst\u00fctzt viele Protokolle. wget ist haupts\u00e4chlich ein Datei-Downloader. F\u00fcr API-Tests ist curl die Standardwahl.',
    faq2_q: 'Wie sende ich eine POST-Anfrage mit JSON-Daten?',
    faq2_a: 'Verwenden Sie -X POST mit -H "Content-Type: application/json" und -d f\u00fcr den JSON-Body. Das -d Flag setzt die Methode automatisch auf POST.',
    faq3_q: 'Wie behandle ich SSL-Zertifikatsfehler?',
    faq3_a: 'Verwenden Sie -k oder --insecure um die SSL-Verifizierung zu \u00fcberspringen. N\u00fctzlich in der Entwicklung, aber niemals in der Produktion verwenden.',
    faq4_q: 'Wie speichere ich die curl-Ausgabe in einer Datei?',
    faq4_a: 'Verwenden Sie -o (Kleinbuchstabe) f\u00fcr einen benutzerdefinierten Dateinamen. -O (Gro\u00dfbuchstabe) f\u00fcr den entfernten Dateinamen.',
    faq5_q: 'Wie sende ich mehrere Header mit curl?',
    faq5_a: 'F\u00fcgen Sie mehrere -H Flags hinzu, eines pro Header. Es gibt keine Begrenzung f\u00fcr die Anzahl der -H Flags.',
    faq6_q: 'Wie messe ich die Antwortzeit einer API?',
    faq6_a: 'Verwenden Sie das -w Flag mit Timing-Variablen: curl -w "Total: %{time_total}s" -o /dev/null -s url.',
    p_conclusion: 'Speichern Sie dieses Cheat Sheet als Lesezeichen. Zum Konvertieren von curl-Befehlen in Produktionscode nutzen Sie unser Tool unten.',
    link_tool_bottom: 'cURL-zu-Code-Konverter ausprobieren \u2192',
    flag: 'Flag',
    description: 'Beschreibung',
    example: 'Beispiel',
  },
  es: {
    intro: 'Ya sea que est\u00e9s probando APIs REST, depurando webhooks o automatizando solicitudes HTTP, <strong>curl</strong> es la navaja suiza que todo desarrollador necesita. Esta hoja de referencia completa contiene <strong>m\u00e1s de 50 ejemplos de comandos curl</strong> organizados por categor\u00eda.',
    link_tool: 'Convierte comandos curl a c\u00f3digo con nuestro convertidor de cURL a C\u00f3digo \u2192',
    h2_basics: 'M\u00e9todos HTTP b\u00e1sicos',
    p_basics: 'La base de las pruebas de API con curl. Estos comandos cubren los cinco m\u00e9todos HTTP principales: GET, POST, PUT, DELETE y PATCH.',
    h2_headers: 'Cabeceras y cabeceras de autenticaci\u00f3n',
    p_headers: 'Las cabeceras HTTP permiten pasar informaci\u00f3n adicional con las solicitudes. Las cabeceras de autenticaci\u00f3n son las m\u00e1s utilizadas al trabajar con APIs.',
    h2_data: 'Env\u00edo de datos',
    p_data: 'La mayor\u00eda de las interacciones con API requieren enviar datos en el cuerpo de la solicitud. curl soporta payloads JSON, datos de formulario, subida de archivos y solicitudes multipart.',
    h2_auth: 'M\u00e9todos de autenticaci\u00f3n',
    p_auth: 'Las APIs usan diversos mecanismos de autenticaci\u00f3n. Aqu\u00ed tienes ejemplos curl para los patrones m\u00e1s comunes: OAuth, claves API, cookies y tokens JWT.',
    h2_debug: 'Depuraci\u00f3n y soluci\u00f3n de problemas',
    p_debug: 'Cuando las llamadas API fallan o se comportan inesperadamente, estos flags de curl te ayudan a inspeccionar qu\u00e9 est\u00e1 pasando a nivel HTTP.',
    h2_advanced: 'Uso avanzado',
    p_advanced: 'Funciones avanzadas de curl para flujos de trabajo en producci\u00f3n: proxies, reintentos, limitaci\u00f3n de velocidad y guardar respuestas en archivos.',
    h2_convert: 'Convertir curl a c\u00f3digo',
    p_convert: 'Una vez que tienes un comando curl funcional, a menudo necesitas convertirlo a tu lenguaje de programaci\u00f3n. Usa un convertidor automatizado en lugar de traducir manualmente.',
    h2_reference: 'Referencia r\u00e1pida: Top 20 flags de curl',
    p_reference: 'Los flags de curl m\u00e1s utilizados de un vistazo. Guarda esta tabla en favoritos.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: '\u00bfCu\u00e1l es la diferencia entre curl y wget?',
    faq1_a: 'curl est\u00e1 dise\u00f1ado para transferir datos con URLs y soporta muchos protocolos. wget es principalmente un descargador de archivos. Para pruebas de API, curl es la elecci\u00f3n est\u00e1ndar.',
    faq2_q: '\u00bfC\u00f3mo env\u00edo una solicitud POST con datos JSON?',
    faq2_a: 'Usa -X POST con -H "Content-Type: application/json" y -d para el cuerpo JSON. El flag -d establece autom\u00e1ticamente el m\u00e9todo POST.',
    faq3_q: '\u00bfC\u00f3mo manejo errores de certificado SSL?',
    faq3_a: 'Usa el flag -k o --insecure para omitir la verificaci\u00f3n SSL. \u00datil en desarrollo pero nunca en producci\u00f3n.',
    faq4_q: '\u00bfC\u00f3mo guardo la salida de curl en un archivo?',
    faq4_a: 'Usa -o (min\u00fascula) para un nombre personalizado. -O (may\u00fascula) para el nombre remoto.',
    faq5_q: '\u00bfC\u00f3mo env\u00edo m\u00faltiples cabeceras con curl?',
    faq5_a: 'A\u00f1ade m\u00faltiples flags -H, uno por cabecera. No hay l\u00edmite en el n\u00famero de flags -H.',
    faq6_q: '\u00bfC\u00f3mo mido el tiempo de respuesta de una API?',
    faq6_a: 'Usa el flag -w con variables de timing: curl -w "Total: %{time_total}s" -o /dev/null -s url.',
    p_conclusion: 'Guarda esta hoja de referencia en favoritos. Para convertir comandos curl a c\u00f3digo de producci\u00f3n, prueba nuestra herramienta.',
    link_tool_bottom: 'Probar el convertidor de cURL a C\u00f3digo \u2192',
    flag: 'Flag',
    description: 'Descripci\u00f3n',
    example: 'Ejemplo',
  },
};

export default function CurlCheatSheet({ lang }: { lang: string }) {
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
      { '@type': 'Question', name: t.faq6_q, acceptedAnswer: { '@type': 'Answer', text: t.faq6_a } },
    ],
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      <p>
        <a href={`/${lang}/tools/curl-to-code`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_tool}
        </a>
      </p>

      {/* ============================================================ */}
      {/* 1. BASIC HTTP METHODS */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_basics}</h2>
      <p>{t.p_basics}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">GET Request</h3>
      <p>The most basic curl command. By default, curl performs a GET request. Use it to retrieve data from any URL.</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Simple GET request
curl https://api.example.com/users

# GET with query parameters
curl "https://api.example.com/users?page=1&limit=10"

# GET and show response headers too
curl -i https://api.example.com/users

# GET only the response headers
curl -I https://api.example.com/users

# GET with a specific HTTP version
curl --http2 https://api.example.com/users`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">POST Request</h3>
      <p>Send data to create a new resource. The <code>-X POST</code> flag is optional when using <code>-d</code> since curl automatically uses POST when data is included.</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# POST with JSON data
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John", "email": "john@example.com"}'

# POST with data from a file
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d @payload.json

# POST with URL-encoded form data
curl -X POST https://api.example.com/login \\
  -d "username=admin&password=secret"

# POST and follow redirects
curl -L -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John"}'`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">PUT Request</h3>
      <p>Replace an entire resource with new data. PUT is idempotent, meaning multiple identical requests have the same effect as a single one.</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# PUT to update a resource
curl -X PUT https://api.example.com/users/123 \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John Updated", "email": "john.new@example.com"}'

# PUT with data from file
curl -X PUT https://api.example.com/users/123 \\
  -H "Content-Type: application/json" \\
  -d @updated-user.json`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">DELETE Request</h3>
      <p>Remove a resource from the server. DELETE requests typically do not require a body.</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# DELETE a resource
curl -X DELETE https://api.example.com/users/123

# DELETE with authentication
curl -X DELETE https://api.example.com/users/123 \\
  -H "Authorization: Bearer your-token-here"

# DELETE with confirmation body
curl -X DELETE https://api.example.com/users/123 \\
  -H "Content-Type: application/json" \\
  -d '{"confirm": true}'`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">PATCH Request</h3>
      <p>Partially update a resource. Unlike PUT, PATCH only sends the fields that need to be changed.</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# PATCH to partially update
curl -X PATCH https://api.example.com/users/123 \\
  -H "Content-Type: application/json" \\
  -d '{"email": "newemail@example.com"}'

# PATCH with JSON Merge Patch
curl -X PATCH https://api.example.com/users/123 \\
  -H "Content-Type: application/merge-patch+json" \\
  -d '{"nickname": null, "email": "new@example.com"}'`}</code></pre>

      {/* ============================================================ */}
      {/* 2. HEADERS & AUTHENTICATION HEADERS */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_headers}</h2>
      <p>{t.p_headers}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Bearer Token (OAuth 2.0)</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Bearer token authentication
curl https://api.example.com/protected \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."

# Bearer token with POST
curl -X POST https://api.example.com/data \\
  -H "Authorization: Bearer your-access-token" \\
  -H "Content-Type: application/json" \\
  -d '{"key": "value"}'`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Basic Authentication</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Basic auth with -u flag (recommended)
curl -u username:password https://api.example.com/protected

# Basic auth with header (manual base64)
curl https://api.example.com/protected \\
  -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ="

# Prompt for password (more secure)
curl -u username https://api.example.com/protected`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Custom Headers</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Set Content-Type
curl https://api.example.com/data \\
  -H "Content-Type: application/json"

# Set Accept header
curl https://api.example.com/data \\
  -H "Accept: application/xml"

# Multiple custom headers
curl https://api.example.com/data \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -H "X-Request-ID: abc-123" \\
  -H "X-API-Version: 2"

# Remove a default header (send empty)
curl https://api.example.com/data \\
  -H "User-Agent:"`}</code></pre>

      {/* ============================================================ */}
      {/* 3. SENDING DATA */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_data}</h2>
      <p>{t.p_data}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">JSON Body</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Inline JSON
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Alice", "age": 30, "roles": ["admin", "user"]}'

# JSON from file
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d @data.json

# JSON with nested objects
curl -X POST https://api.example.com/orders \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer": {"id": 123, "name": "Alice"},
    "items": [
      {"product": "Widget", "qty": 2, "price": 9.99},
      {"product": "Gadget", "qty": 1, "price": 24.99}
    ]
  }'`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Form Data</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# URL-encoded form data (application/x-www-form-urlencoded)
curl -X POST https://api.example.com/login \\
  -d "username=admin&password=secret123"

# Form data with --data-urlencode (auto-encodes special chars)
curl -X POST https://api.example.com/search \\
  --data-urlencode "query=hello world&special=a+b"

# Read form value from file
curl -X POST https://api.example.com/submit \\
  --data-urlencode "essay@essay.txt"`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">File Upload</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Upload a single file
curl -X POST https://api.example.com/upload \\
  -F "file=@/path/to/document.pdf"

# Upload with custom filename
curl -X POST https://api.example.com/upload \\
  -F "file=@localfile.jpg;filename=avatar.jpg"

# Upload with content type
curl -X POST https://api.example.com/upload \\
  -F "file=@data.csv;type=text/csv"`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Multipart Form Data</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# File + text fields (multipart/form-data)
curl -X POST https://api.example.com/profile \\
  -F "name=Alice" \\
  -F "avatar=@photo.jpg" \\
  -F "bio=Software developer"

# Multiple files
curl -X POST https://api.example.com/gallery \\
  -F "images=@photo1.jpg" \\
  -F "images=@photo2.jpg" \\
  -F "images=@photo3.jpg"

# Multipart with JSON field
curl -X POST https://api.example.com/submit \\
  -F "metadata={\\\"title\\\":\\\"Report\\\"};type=application/json" \\
  -F "attachment=@report.pdf"`}</code></pre>

      {/* ============================================================ */}
      {/* 4. AUTHENTICATION METHODS */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_auth}</h2>
      <p>{t.p_auth}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">OAuth 2.0 Token Flow</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Step 1: Get access token (client credentials)
curl -X POST https://auth.example.com/oauth/token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=client_credentials" \\
  -d "client_id=your-client-id" \\
  -d "client_secret=your-client-secret"

# Step 2: Use the token
curl https://api.example.com/resource \\
  -H "Authorization: Bearer ACCESS_TOKEN_HERE"

# Refresh an expired token
curl -X POST https://auth.example.com/oauth/token \\
  -d "grant_type=refresh_token" \\
  -d "refresh_token=your-refresh-token" \\
  -d "client_id=your-client-id"`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">API Key Authentication</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# API key in header
curl https://api.example.com/data \\
  -H "X-API-Key: your-api-key-here"

# API key in query parameter
curl "https://api.example.com/data?api_key=your-api-key-here"

# API key in Authorization header
curl https://api.example.com/data \\
  -H "Authorization: ApiKey your-api-key-here"`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Cookie-Based Authentication</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Send cookies with request
curl https://api.example.com/dashboard \\
  -b "session_id=abc123; csrf_token=xyz789"

# Save cookies from response to file
curl -c cookies.txt https://api.example.com/login \\
  -d "username=admin&password=secret"

# Use saved cookies in subsequent request
curl -b cookies.txt https://api.example.com/dashboard

# Save and send cookies (cookie jar)
curl -b cookies.txt -c cookies.txt https://api.example.com/profile`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">JWT Token Authentication</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Login to get JWT
curl -X POST https://api.example.com/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "secret"}'

# Use JWT in Authorization header
curl https://api.example.com/protected \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Refresh JWT token
curl -X POST https://api.example.com/auth/refresh \\
  -H "Content-Type: application/json" \\
  -d '{"refresh_token": "your-refresh-token"}'`}</code></pre>

      {/* ============================================================ */}
      {/* 5. DEBUGGING & TROUBLESHOOTING */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_debug}</h2>
      <p>{t.p_debug}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Verbose Output (-v)</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Show full request and response headers
curl -v https://api.example.com/users

# Even more verbose (includes SSL handshake)
curl -vvv https://api.example.com/users

# Verbose output to stderr, response to file
curl -v -o response.json https://api.example.com/users

# Trace full data transfer (hex dump)
curl --trace trace.log https://api.example.com/users

# Trace as ASCII
curl --trace-ascii trace.txt https://api.example.com/users`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Timing & Performance</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Show detailed timing information
curl -w "\\n---TIMING---\\nDNS Lookup:    %{time_namelookup}s\\nTCP Connect:   %{time_connect}s\\nSSL Handshake: %{time_appconnect}s\\nServer Process:%{time_starttransfer}s\\nTotal Time:    %{time_total}s\\nDownload Size: %{size_download} bytes\\nHTTP Code:     %{http_code}\\n" \\
  -o /dev/null -s https://api.example.com/data

# Simple total time only
curl -w "\\nTime: %{time_total}s\\n" -o /dev/null -s https://api.example.com

# Show HTTP status code only
curl -o /dev/null -s -w "%{http_code}\\n" https://api.example.com

# Timing with format file (reusable)
# Create curl-timing.txt with: time_total: %{time_total}\\n
curl -w @curl-timing.txt -o /dev/null -s https://api.example.com`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Follow Redirects (-L)</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Follow redirects automatically
curl -L https://example.com/short-url

# Follow redirects with a max limit
curl -L --max-redirs 5 https://example.com/short-url

# Show redirect chain
curl -L -v https://example.com/short-url 2>&1 | grep "< HTTP\\|< Location"

# Follow redirects but change POST to GET after redirect
curl -L --post301 --post302 -X POST https://example.com/api \\
  -d "data=value"`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">SSL Issues (-k)</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Skip SSL verification (development only!)
curl -k https://self-signed.example.com/api

# Use a custom CA certificate
curl --cacert /path/to/ca-cert.pem https://api.example.com

# Client certificate authentication
curl --cert client-cert.pem --key client-key.pem https://api.example.com

# Show SSL certificate info
curl -vI https://api.example.com 2>&1 | grep -A6 "Server certificate"

# Force TLS version
curl --tlsv1.2 https://api.example.com
curl --tlsv1.3 https://api.example.com`}</code></pre>

      {/* ============================================================ */}
      {/* 6. ADVANCED USAGE */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_advanced}</h2>
      <p>{t.p_advanced}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Proxy</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Use HTTP proxy
curl -x http://proxy.example.com:8080 https://api.example.com

# Use SOCKS5 proxy
curl --socks5 socks5://proxy.example.com:1080 https://api.example.com

# Proxy with authentication
curl -x http://user:pass@proxy.example.com:8080 https://api.example.com

# Use HTTPS proxy
curl --proxy-cacert proxy-ca.pem -x https://proxy.example.com:443 https://api.example.com

# Bypass proxy for specific hosts
curl --noproxy "localhost,127.0.0.1,.internal.com" \\
  -x http://proxy:8080 https://api.example.com`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Retry</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Retry on transient errors (3 times)
curl --retry 3 https://api.example.com/data

# Retry with delay between attempts
curl --retry 5 --retry-delay 2 https://api.example.com/data

# Retry with exponential backoff (max wait)
curl --retry 5 --retry-max-time 60 https://api.example.com/data

# Retry on all errors (not just transient)
curl --retry 3 --retry-all-errors https://api.example.com/data`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Rate Limiting & Timeouts</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Limit download speed
curl --limit-rate 100K https://example.com/large-file.zip -o file.zip

# Set connection timeout (seconds)
curl --connect-timeout 5 https://api.example.com

# Set maximum time for entire operation
curl --max-time 30 https://api.example.com/slow-endpoint

# Both timeouts together
curl --connect-timeout 5 --max-time 30 https://api.example.com`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Save Response to File</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Save with custom filename
curl -o response.json https://api.example.com/data

# Save with remote filename
curl -O https://example.com/files/report.pdf

# Save headers and body separately
curl -D headers.txt -o body.json https://api.example.com/data

# Append to file
curl https://api.example.com/logs >> all-logs.txt

# Download multiple files
curl -O https://example.com/file1.zip -O https://example.com/file2.zip

# Resume interrupted download
curl -C - -O https://example.com/large-file.iso`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">Other Advanced Options</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Silent mode (suppress progress bar)
curl -s https://api.example.com/data

# Silent but show errors
curl -sS https://api.example.com/data

# Send request from specific network interface
curl --interface eth0 https://api.example.com

# Set custom DNS resolver
curl --resolve api.example.com:443:127.0.0.1 https://api.example.com

# Parallel requests (curl 7.66+)
curl --parallel --parallel-max 5 \\
  -O https://example.com/file1.zip \\
  -O https://example.com/file2.zip \\
  -O https://example.com/file3.zip

# Use a config file
curl -K curl.config https://api.example.com`}</code></pre>

      {/* ============================================================ */}
      {/* 7. CONVERTING CURL TO CODE */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_convert}</h2>
      <p>{t.p_convert}</p>

      <p>For example, this curl command:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer token123" \\
  -d '{"name": "Alice", "email": "alice@example.com"}'`}</code></pre>

      <p>Can be converted to <strong>Python</strong>:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`import requests

response = requests.post(
    "https://api.example.com/users",
    headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer token123"
    },
    json={"name": "Alice", "email": "alice@example.com"}
)
print(response.json())`}</code></pre>

      <p>Or to <strong>JavaScript (fetch)</strong>:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer token123"
  },
  body: JSON.stringify({
    name: "Alice",
    email: "alice@example.com"
  })
});
const data = await response.json();`}</code></pre>

      <p>Or to <strong>Go</strong>:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

func main() {
    body, _ := json.Marshal(map[string]string{
        "name":  "Alice",
        "email": "alice@example.com",
    })

    req, _ := http.NewRequest("POST", "https://api.example.com/users",
        bytes.NewBuffer(body))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Authorization", "Bearer token123")

    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
}`}</code></pre>

      <p style={{ marginTop: '1rem' }}>
        Instead of writing these conversions by hand, use our{' '}
        <a href={`/${lang}/tools/curl-to-code`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          cURL to Code Converter
        </a>{' '}
        to instantly generate production-ready code in Python, JavaScript, Go, PHP, Ruby, Java, C#, and more.
      </p>

      {/* ============================================================ */}
      {/* 8. QUICK REFERENCE TABLE */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_reference}</h2>
      <p>{t.p_reference}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.flag}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.description}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.example}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-X</code></td><td className="border border-gray-700 px-4 py-2">Set HTTP method (GET, POST, PUT, DELETE, PATCH)</td><td className="border border-gray-700 px-4 py-2"><code>{`-X POST`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-H</code></td><td className="border border-gray-700 px-4 py-2">Add a custom header</td><td className="border border-gray-700 px-4 py-2"><code>{`-H "Content-Type: application/json"`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-d</code></td><td className="border border-gray-700 px-4 py-2">Send data in request body</td><td className="border border-gray-700 px-4 py-2"><code>{`-d '{"key":"val"}'`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-F</code></td><td className="border border-gray-700 px-4 py-2">Send multipart form data / file upload</td><td className="border border-gray-700 px-4 py-2"><code>{`-F "file=@photo.jpg"`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-u</code></td><td className="border border-gray-700 px-4 py-2">Basic authentication (user:password)</td><td className="border border-gray-700 px-4 py-2"><code>{`-u admin:secret`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-o</code></td><td className="border border-gray-700 px-4 py-2">Save output to file (custom name)</td><td className="border border-gray-700 px-4 py-2"><code>{`-o result.json`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-O</code></td><td className="border border-gray-700 px-4 py-2">Save output using remote filename</td><td className="border border-gray-700 px-4 py-2"><code>{`-O`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-i</code></td><td className="border border-gray-700 px-4 py-2">Include response headers in output</td><td className="border border-gray-700 px-4 py-2"><code>{`-i`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-I</code></td><td className="border border-gray-700 px-4 py-2">Fetch headers only (HEAD request)</td><td className="border border-gray-700 px-4 py-2"><code>{`-I`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-v</code></td><td className="border border-gray-700 px-4 py-2">Verbose output (debug requests)</td><td className="border border-gray-700 px-4 py-2"><code>{`-v`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-s</code></td><td className="border border-gray-700 px-4 py-2">Silent mode (hide progress bar)</td><td className="border border-gray-700 px-4 py-2"><code>{`-s`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-S</code></td><td className="border border-gray-700 px-4 py-2">Show errors in silent mode</td><td className="border border-gray-700 px-4 py-2"><code>{`-sS`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-L</code></td><td className="border border-gray-700 px-4 py-2">Follow redirects (3xx responses)</td><td className="border border-gray-700 px-4 py-2"><code>{`-L`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-k</code></td><td className="border border-gray-700 px-4 py-2">Skip SSL certificate verification</td><td className="border border-gray-700 px-4 py-2"><code>{`-k`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-b</code></td><td className="border border-gray-700 px-4 py-2">Send cookies (string or file)</td><td className="border border-gray-700 px-4 py-2"><code>{`-b cookies.txt`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-c</code></td><td className="border border-gray-700 px-4 py-2">Save response cookies to file</td><td className="border border-gray-700 px-4 py-2"><code>{`-c cookies.txt`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>-w</code></td><td className="border border-gray-700 px-4 py-2">Write-out format (timing, status code)</td><td className="border border-gray-700 px-4 py-2"><code>{`-w "%{http_code}"`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>--retry</code></td><td className="border border-gray-700 px-4 py-2">Retry on transient failures</td><td className="border border-gray-700 px-4 py-2"><code>{`--retry 3`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>--connect-timeout</code></td><td className="border border-gray-700 px-4 py-2">Max time for connection (seconds)</td><td className="border border-gray-700 px-4 py-2"><code>{`--connect-timeout 5`}</code></td></tr>
            <tr><td className="border border-gray-700 px-4 py-2"><code>--max-time</code></td><td className="border border-gray-700 px-4 py-2">Max time for entire operation (seconds)</td><td className="border border-gray-700 px-4 py-2"><code>{`--max-time 30`}</code></td></tr>
          </tbody>
        </table>
      </div>

      {/* ============================================================ */}
      {/* 9. FAQ */}
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

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq6_q}</h3>
      <p>{t.faq6_a}</p>

      {/* ============================================================ */}
      {/* CONCLUSION */}
      {/* ============================================================ */}
      <p className="mt-8">{t.p_conclusion}</p>
      <p>
        <a href={`/${lang}/tools/curl-to-code`} style={{ fontWeight: 600, color: '#38bdf8' }}>
          {t.link_tool_bottom}
        </a>
      </p>
    </article>
  );
}
