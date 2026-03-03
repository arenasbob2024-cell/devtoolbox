'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Axios vs Fetch API: HTTP Client Comparison 2025',
    intro: 'Axios and the native Fetch API are the two primary ways to make HTTP requests in JavaScript. Axios provides a feature-rich wrapper, while Fetch is built into browsers. This comparison covers capabilities, developer experience, performance, and real-world scenarios to help you choose.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Axios offers automatic JSON transformation, request/response interceptors, timeout support, and better error handling. Fetch is native, zero-dependency, and improving with each browser update. For complex applications needing interceptors and transformations, Axios excels. For modern projects minimizing dependencies, Fetch is ideal.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Axios automatically transforms JSON; Fetch requires manual .json() call',
    takeaway2: 'Axios has built-in request/response interceptors; Fetch requires custom implementation',
    takeaway3: 'Fetch is native to browsers, adding zero bytes to bundle',
    takeaway4: 'Axios has better timeout and error handling out of the box',
    takeaway5: 'Both support aborting requests via AbortController',
    takeaway6: 'Axios supports older browsers; Fetch requires polyfills for IE11',
    
    whatIsAxiosTitle: 'What is Axios?',
    whatIsAxiosContent: 'Axios is a popular promise-based HTTP client for JavaScript, created in 2014. It works in both browser and Node.js environments, providing a consistent API for making HTTP requests. With over 40 million weekly npm downloads, it is one of the most trusted HTTP libraries in the JavaScript ecosystem.',
    
    whatIsFetchTitle: 'What is Fetch API?',
    whatIsFetchContent: 'The Fetch API is a modern native browser API for making HTTP requests, introduced in 2015. It replaced XMLHttpRequest with a more powerful and flexible interface using Promises. Fetch is now supported in all modern browsers and is the standard way to make network requests in web applications.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance benchmarks across different scenarios:',
    
    bundleTitle: 'Bundle Size',
    bundleIntro: 'Package size comparison:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing built-in capabilities:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Common usage patterns compared:',
    
    axiosExampleTitle: 'Axios',
    fetchExampleTitle: 'Fetch API',
    
    errorHandlingTitle: 'Error Handling',
    errorHandlingIntro: 'How each handles errors:',
    
    interceptorsTitle: 'Interceptors',
    interceptorsIntro: 'Request and response interception:',
    
    uploadDownloadTitle: 'Upload & Download Progress',
    uploadDownloadIntro: 'Tracking file transfer progress:',
    
    whenToUseTitle: 'When to Use Each',
    axiosBestFor: 'Use Axios When:',
    fetchBestFor: 'Use Fetch When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, the choice between Axios and Fetch depends on your project needs. Axios remains the better choice for applications requiring interceptors, automatic transformations, timeout handling, and older browser support. Fetch is ideal for modern applications prioritizing zero dependencies and native APIs. Many teams now use Fetch for simple requests and Axios for complex scenarios, getting the best of both worlds.',
    
    faq1q: 'Is Fetch slower than Axios?',
    faq1a: 'No, Fetch is not inherently slower. In fact, Fetch can be slightly faster since it has no overhead. The difference is negligible in most applications. Axios adds about 13KB to your bundle, which affects initial load time but not request performance.',
    
    faq2q: 'Can I use Fetch with async/await?',
    faq2a: 'Yes, Fetch works perfectly with async/await. It returns a Promise, so you can use try/catch for error handling. This makes Fetch code very clean and readable, similar to Axios syntax.',
    
    faq3q: 'How do I cancel requests in Fetch?',
    faq3a: 'Fetch uses AbortController for cancellation. Create an AbortController, pass its signal to fetch options, and call abort() when needed. Axios also supports AbortController, as well as its legacy CancelToken API.',
    
    faq4q: 'Does Axios work in Node.js?',
    faq4a: 'Yes, Axios works in both browser and Node.js environments with the same API. This makes it ideal for isomorphic/universal JavaScript applications. Fetch in Node.js requires Node 18+ or a polyfill like node-fetch.',
    
    faq5q: 'How do I handle timeouts in Fetch?',
    faq5a: 'Fetch does not have built-in timeout support. You need to use AbortController with setTimeout. Wrap the fetch in a Promise.race with a timeout promise. This is more verbose than Axios timeout option.',
    
    faq6q: 'Which is better for TypeScript?',
    faq6a: 'Both work well with TypeScript. Axios ships with its own type definitions and provides generic types for responses. Fetch Response type is well-defined in TypeScript lib.dom.d.ts. Axios may have a slight edge for typed interceptors.',
    
    faq7q: 'Can I use interceptors with Fetch?',
    faq7a: 'Not directly, but you can create a wrapper function or use libraries like fetch-intercept. This requires more code than Axios interceptors. For complex interceptor needs, Axios is more convenient.',
    
    faq8q: 'What about security (XSRF/CSRF)?',
    faq8a: 'Axios has built-in XSRF protection that can be configured with xsrfCookieName and xsrfHeaderName. With Fetch, you need to manually read the CSRF token from cookies and add it to headers. Both are equally secure when properly implemented.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Axios vs Fetch API：2025年HTTP客户端对比',
    intro: 'Axios和原生Fetch API是JavaScript中发起HTTP请求的两种主要方式。Axios提供功能丰富的封装，而Fetch内置于浏览器中。本比较涵盖功能、开发者体验、性能和真实场景，帮助你选择。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Axios提供自动JSON转换、请求/响应拦截器、超时支持和更好的错误处理。Fetch是原生的、零依赖的，并随着浏览器更新不断改进。对于需要拦截器和转换的复杂应用，Axios是优秀选择。对于最小化依赖的现代项目，Fetch是理想选择。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Axios自动转换JSON；Fetch需要手动调用.json()',
    takeaway2: 'Axios内置请求/响应拦截器；Fetch需要自定义实现',
    takeaway3: 'Fetch原生支持浏览器，不增加任何包体积',
    takeaway4: 'Axios开箱即用的超时和错误处理更好',
    takeaway5: '两者都通过AbortController支持取消请求',
    takeaway6: 'Axios支持旧浏览器；Fetch在IE11需要polyfill',
    
    whatIsAxiosTitle: '什么是Axios？',
    whatIsAxiosContent: 'Axios是一个流行的基于Promise的JavaScript HTTP客户端，创建于2014年。它在浏览器和Node.js环境中都能工作，为发起HTTP请求提供一致的API。每周npm下载量超过4000万，是JavaScript生态中最受信任的HTTP库之一。',
    
    whatIsFetchTitle: '什么是Fetch API？',
    whatIsFetchContent: 'Fetch API是一个现代原生浏览器API，用于发起HTTP请求，于2015年引入。它用更强大灵活的Promise接口取代了XMLHttpRequest。Fetch现在在所有现代浏览器中都受支持，是Web应用发起网络请求的标准方式。',
    
    performanceTitle: '性能对比',
    performanceIntro: '不同场景下的性能基准测试：',
    
    bundleTitle: '包体积',
    bundleIntro: '包大小对比：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较内置功能：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '常见使用模式对比：',
    
    axiosExampleTitle: 'Axios',
    fetchExampleTitle: 'Fetch API',
    
    errorHandlingTitle: '错误处理',
    errorHandlingIntro: '各自如何处理错误：',
    
    interceptorsTitle: '拦截器',
    interceptorsIntro: '请求和响应拦截：',
    
    uploadDownloadTitle: '上传和下载进度',
    uploadDownloadIntro: '跟踪文件传输进度：',
    
    whenToUseTitle: '何时使用',
    axiosBestFor: '使用Axios的场景：',
    fetchBestFor: '使用Fetch的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Axios和Fetch的选择取决于你的项目需求。对于需要拦截器、自动转换、超时处理和旧浏览器支持的应用，Axios仍是更好的选择。对于优先考虑零依赖和原生API的现代应用，Fetch是理想选择。许多团队现在对简单请求使用Fetch，对复杂场景使用Axios，两全其美。',
    
    faq1q: 'Fetch比Axios慢吗？',
    faq1a: '不，Fetch本质上并不慢。事实上，由于没有开销，Fetch可能稍快一些。在大多数应用中差异可以忽略不计。Axios会给你的包增加约13KB，这会影响初始加载时间但不影响请求性能。',
    
    faq2q: '我可以在Fetch中使用async/await吗？',
    faq2a: '可以，Fetch与async/await完美配合。它返回Promise，所以你可以使用try/catch进行错误处理。这使得Fetch代码非常干净易读，类似于Axios语法。',
    
    faq3q: '如何在Fetch中取消请求？',
    faq3a: 'Fetch使用AbortController进行取消。创建一个AbortController，将其signal传递给fetch选项，并在需要时调用abort()。Axios也支持AbortController及其传统的CancelToken API。',
    
    faq4q: 'Axios能在Node.js中工作吗？',
    faq4a: '可以，Axios在浏览器和Node.js环境中都能工作，使用相同的API。这使其成为同构/通用JavaScript应用的理想选择。Node.js中的Fetch需要Node 18+或像node-fetch这样的polyfill。',
    
    faq5q: '如何在Fetch中处理超时？',
    faq5a: 'Fetch没有内置超时支持。你需要使用AbortController配合setTimeout。将fetch包装在Promise.race中与超时promise一起使用。这比Axios超时选项更冗长。',
    
    faq6q: '哪个对TypeScript更好？',
    faq6a: '两者都能很好地与TypeScript配合。Axios自带类型定义并为响应提供泛型类型。Fetch Response类型在TypeScript lib.dom.d.ts中定义良好。对于类型化拦截器，Axios可能略有优势。',
    
    faq7q: '我可以在Fetch中使用拦截器吗？',
    faq7a: '不能直接使用，但你可以创建包装函数或使用像fetch-intercept这样的库。这比Axios拦截器需要更多代码。对于复杂的拦截器需求，Axios更方便。',
    
    faq8q: '安全性（XSRF/CSRF）呢？',
    faq8a: 'Axios有内置XSRF保护，可以用xsrfCookieName和xsrfHeaderName配置。使用Fetch，你需要手动从cookie读取CSRF令牌并将其添加到headers。当正确实现时，两者同样安全。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function AxiosVsFetch2025({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      {/* Key Takeaways */}
      <h2 style={h2Style}>{ct.takeawaysTitle}</h2>
      <div style={{ ...boxStyle, borderLeft: '4px solid #22c55e' }}>
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{ct.takeaway1}</li>
          <li>{ct.takeaway2}</li>
          <li>{ct.takeaway3}</li>
          <li>{ct.takeaway4}</li>
          <li>{ct.takeaway5}</li>
          <li>{ct.takeaway6}</li>
        </ul>
      </div>

      {/* Overview */}
      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsAxiosTitle}</h3>
      <p style={pStyle}>{ct.whatIsAxiosContent}</p>

      <h3 style={h3Style}>{ct.whatIsFetchTitle}</h3>
      <p style={pStyle}>{ct.whatIsFetchContent}</p>

      {/* Comparison Table */}
      <h2 style={h2Style}>{isZh ? '对比概览' : 'Comparison Overview'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Axios</th>
              <th style={thStyle}>Fetch</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2014', '2015 (Chrome 42)'],
              [isZh ? '依赖' : 'Dependency', '13KB (min+gzip)', '0 (native)'],
              [isZh ? '浏览器支持' : 'Browser Support', isZh ? '包括IE11' : 'Including IE11', isZh ? '现代浏览器' : 'Modern browsers'],
              [isZh ? 'Node.js支持' : 'Node.js Support', '✓ Built-in', '✓ Node 18+'],
              [isZh ? 'JSON转换' : 'JSON Transform', '✓ Automatic', '✗ Manual .json()'],
              [isZh ? '拦截器' : 'Interceptors', '✓ Built-in', '✗ Custom needed'],
              [isZh ? '超时' : 'Timeout', '✓ Built-in', '✗ AbortController needed'],
              [isZh ? 'XSRF保护' : 'XSRF Protection', '✓ Built-in', '✗ Manual'],
            ].map(([feature, axios, fetch], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{axios}</td>
                <td style={tdStyle}>{fetch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bundle Size */}
      <h2 style={h2Style}>{ct.bundleTitle}</h2>
      <p style={pStyle}>{ct.bundleIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Axios</th>
              <th style={thStyle}>Fetch</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '压缩后大小' : 'Minified + Gzipped', '13KB', '0KB'],
              [isZh ? '压缩前大小' : 'Minified', '48KB', '0KB'],
              [isZh ? '解析时间' : 'Parse Time', '~8ms', '0ms'],
              [isZh ? '额外下载' : 'Additional Download', 'Yes', 'None'],
            ].map(([metric, axios, fetch], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{axios}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{fetch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#5b21b6' }}>{ct.axiosExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Axios - Basic GET Request
import axios from 'axios';

// Simple GET
const response = await axios.get('/api/users');
console.log(response.data); // JSON already parsed

// GET with params
const users = await axios.get('/api/users', {
  params: { page: 1, limit: 10 },
  headers: { 'Authorization': 'Bearer token' },
  timeout: 5000,
});

// POST request
const created = await axios.post('/api/users', {
  name: 'John',
  email: 'john@example.com',
});

// Concurrent requests
const [users, posts] = await Promise.all([
  axios.get('/api/users'),
  axios.get('/api/posts'),
]);

// Instance with defaults
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'value' },
});

const data = await api.get('/endpoint');`}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.fetchExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Fetch - Basic GET Request

// Simple GET
const response = await fetch('/api/users');
const data = await response.json(); // Manual JSON parsing
console.log(data);

// GET with params
const params = new URLSearchParams({ page: '1', limit: '10' });
const response2 = await fetch('/api/users?' + params, {
  headers: { 
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json',
  },
});
const users = await response2.json();

// POST request
const created = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John',
    email: 'john@example.com',
  }),
});
const result = await created.json();

// Concurrent requests
const [usersRes, postsRes] = await Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
]);
const [users2, posts] = await Promise.all([
  usersRes.json(),
  postsRes.json(),
]);

// Wrapper function with defaults
const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch('https://api.example.com' + endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return response.json();
};

const data2 = await apiFetch('/endpoint');`}</code></pre>

      {/* Error Handling */}
      <h2 style={h2Style}>{ct.errorHandlingTitle}</h2>
      <p style={pStyle}>{ct.errorHandlingIntro}</p>

      <pre style={codeStyle}><code>{`// Axios - Error Handling
try {
  const response = await axios.get('/api/users');
  console.log(response.data);
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error status
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.log('No response received');
    } else {
      // Error setting up request
      console.log('Error:', error.message);
    }
  }
}

// Fetch - Error Handling
try {
  const response = await fetch('/api/users');
  
  // Fetch does NOT reject on HTTP errors!
  // Must check response.ok manually
  if (!response.ok) {
    throw new Error('HTTP error! status: ' + response.status);
  }
  
  const data = await response.json();
  console.log(data);
} catch (error) {
  if (error instanceof TypeError) {
    // Network error or CORS issue
    console.log('Network error');
  } else {
    console.log('Error:', error.message);
  }
}

// Better Fetch error handling wrapper
const fetchWithError = async (url, options = {}) => {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const error = new Error('HTTP error! status: ' + response.status);
    error.response = response;
    throw error;
  }
  
  return response.json();
};`}</code></pre>

      {/* Interceptors */}
      <h2 style={h2Style}>{ct.interceptorsTitle}</h2>
      <p style={pStyle}>{ct.interceptorsIntro}</p>

      <pre style={codeStyle}><code>{`// Axios - Interceptors
const api = axios.create();

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    console.log('Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Fetch - Custom interceptor wrapper
const createFetchWithInterceptors = () => {
  const requestInterceptors = [];
  const responseInterceptors = [];
  
  return {
    addRequestInterceptor: (fn) => requestInterceptors.push(fn),
    addResponseInterceptor: (fn) => responseInterceptors.push(fn),
    
    fetch: async (url, options = {}) => {
      let config = { url, ...options };
      
      // Apply request interceptors
      for (const interceptor of requestInterceptors) {
        config = await interceptor(config);
      }
      
      let response = await fetch(config.url, config);
      
      // Apply response interceptors
      for (const interceptor of responseInterceptors) {
        response = await interceptor(response);
      }
      
      return response;
    },
  };
};

const api2 = createFetchWithInterceptors();
api2.addRequestInterceptor((config) => {
  config.headers = {
    ...config.headers,
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  return config;
});`}</code></pre>

      {/* Upload/Download Progress */}
      <h2 style={h2Style}>{ct.uploadDownloadTitle}</h2>
      <p style={pStyle}>{ct.uploadDownloadIntro}</p>

      <pre style={codeStyle}><code>{`// Axios - Upload Progress
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post('/api/upload', formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log('Upload progress:', percentCompleted + '%');
    },
  });
  
  return response.data;
};

// Axios - Download Progress
const downloadFile = async () => {
  const response = await axios.get('/api/download', {
    responseType: 'blob',
    onDownloadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log('Download progress:', percentCompleted + '%');
    },
  });
  
  return response.data;
};

// Fetch - Upload Progress (more complex)
const uploadFileWithProgress = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        console.log('Upload progress:', percentComplete.toFixed(0) + '%');
      }
    });
    
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error('Upload failed'));
      }
    });
    
    xhr.addEventListener('error', () => reject(new Error('Network error')));
    
    xhr.open('POST', '/api/upload');
    xhr.send(formData);
  });
};

// Fetch - Download Progress
const downloadWithProgress = async (url) => {
  const response = await fetch(url);
  const reader = response.body.getReader();
  const contentLength = +response.headers.get('Content-Length');
  
  let receivedLength = 0;
  let chunks = [];
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    chunks.push(value);
    receivedLength += value.length;
    
    const percentComplete = (receivedLength / contentLength) * 100;
    console.log('Download progress:', percentComplete.toFixed(0) + '%');
  }
  
  return new Blob(chunks);
};`}</code></pre>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Axios</th>
              <th style={thStyle}>Fetch</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '自动JSON解析' : 'Auto JSON Parsing', '✓', '✗'],
              [isZh ? '请求/响应拦截器' : 'Request/Response Interceptors', '✓', '✗'],
              [isZh ? '请求超时' : 'Request Timeout', '✓ timeout option', '✗ AbortController'],
              [isZh ? '请求取消' : 'Request Cancellation', '✓ AbortController/CancelToken', '✓ AbortController'],
              [isZh ? '上传进度' : 'Upload Progress', '✓ onUploadProgress', '✗ XMLHttpRequest needed'],
              [isZh ? '下载进度' : 'Download Progress', '✓ onDownloadProgress', '✓ Streams API'],
              [isZh ? 'XSRF保护' : 'XSRF Protection', '✓ Built-in', '✗ Manual'],
              [isZh ? '并发请求' : 'Concurrent Requests', '✓ axios.all', '✓ Promise.all'],
              [isZh ? '默认配置' : 'Default Config', '✓ axios.create', '✗ Custom wrapper'],
              [isZh ? '响应类型' : 'Response Types', 'json, blob, text, stream, arraybuffer', 'json(), blob(), text(), arrayBuffer()'],
              [isZh ? 'Node.js支持' : 'Node.js Support', '✓ Built-in', '✓ Node 18+'],
              [isZh ? 'TypeScript支持' : 'TypeScript Support', '✓ Built-in', '✓ Built-in'],
            ].map(([feature, axios, fetch], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{axios}</td>
                <td style={tdStyle}>{fetch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #5b21b6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#5b21b6' }}>{ct.axiosBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '需要拦截器' : 'Need interceptors'}</li>
            <li>{isZh ? '自动JSON转换需求' : 'Auto JSON transformation'}</li>
            <li>{isZh ? '需要上传进度' : 'Upload progress required'}</li>
            <li>{isZh ? '旧浏览器支持' : 'Old browser support'}</li>
            <li>{isZh ? '同构应用' : 'Isomorphic apps'}</li>
            <li>{isZh ? '复杂错误处理' : 'Complex error handling'}</li>
            <li>{isZh ? '需要超时配置' : 'Need timeout config'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{ct.fetchBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '最小化包体积' : 'Minimize bundle size'}</li>
            <li>{isZh ? '简单API调用' : 'Simple API calls'}</li>
            <li>{isZh ? '现代浏览器项目' : 'Modern browser projects'}</li>
            <li>{isZh ? 'Service Workers' : 'Service Workers'}</li>
            <li>{isZh ? '需要流式响应' : 'Need streaming response'}</li>
            <li>{isZh ? '原生API偏好' : 'Prefer native APIs'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/url-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>URL Encoder</a> • {' '}
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
      </div>

      {/* FAQ */}
      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
        [ct.faq7q, ct.faq7a],
        [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
