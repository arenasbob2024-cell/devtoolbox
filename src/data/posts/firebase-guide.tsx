'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Firebase Complete Guide: Build Full-Stack Apps with Google\'s Platform',
    description:
      'Master Firebase from project setup to production: Authentication (email, Google, GitHub), Firestore CRUD and real-time listeners, Realtime Database, Cloud Storage, Cloud Functions, hosting and deployment, Admin SDK, analytics, performance monitoring, Firebase with React and Next.js, security best practices, and pricing.',
  },
  zh: {
    title: 'Firebase 完全指南：使用 Google 平台构建全栈应用',
    description:
      '从项目设置到生产环境全面掌握 Firebase：认证（邮箱、Google、GitHub）、Firestore CRUD 和实时监听、实时数据库、云存储、云函数、托管与部署、Admin SDK、分析、性能监控、Firebase 与 React/Next.js 集成、安全最佳实践和定价。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Firebase and what services does it include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Firebase is a comprehensive app development platform by Google that provides backend services including Authentication, Firestore (NoSQL database), Realtime Database, Cloud Storage, Cloud Functions (serverless compute), Hosting, Analytics, Performance Monitoring, Crashlytics, Remote Config, and Cloud Messaging. It supports web, iOS, Android, Unity, and Flutter applications with SDKs for each platform.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Firestore and Realtime Database?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Firestore is a document-based NoSQL database organized into collections and documents, supporting complex queries, indexing, and offline sync. Realtime Database is a JSON tree that synchronizes data in real time with lower latency but simpler querying. Firestore is recommended for new projects due to better scalability, richer queries, and multi-region support. Realtime Database is still useful for simple data models requiring extremely low-latency synchronization.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Firebase free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Firebase offers a generous free tier called the Spark plan. It includes 1 GiB Firestore storage, 50K reads and 20K writes per day, 1 GB Realtime Database storage, 5 GB Cloud Storage, 125K Cloud Function invocations per month, 10 GB hosting bandwidth, and unlimited Analytics. The Blaze plan is pay-as-you-go and includes all Spark free tier allowances before charges begin.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I set up Firebase Authentication?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enable authentication providers in the Firebase Console under Authentication > Sign-in method. Install the Firebase SDK, initialize your app, and use methods like createUserWithEmailAndPassword, signInWithEmailAndPassword, or signInWithPopup for OAuth providers like Google and GitHub. Firebase handles token management, session persistence, email verification, and password reset flows automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Firestore security rules work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Firestore security rules are server-side rules that control read and write access to your database. Rules use a match-based syntax where you define paths and conditions. You can check authentication status with request.auth, validate data with request.resource.data, compare with existing data using resource.data, and call custom functions. Rules are evaluated for every client request and cannot be bypassed from client SDKs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Firebase with React and Next.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Firebase works well with React and Next.js. For React, use the Firebase JavaScript SDK directly with hooks like useState and useEffect to manage auth state and Firestore listeners. For Next.js, use the Firebase Admin SDK in server components and API routes for secure server-side operations, and the client SDK for real-time features in client components. Libraries like react-firebase-hooks simplify integration.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are Firebase Cloud Functions and when should I use them?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Firebase Cloud Functions are serverless functions that run in response to Firebase events or HTTPS requests. Use them for server-side logic like sending notifications, processing payments, aggregating data, running scheduled tasks, integrating third-party APIs, and enforcing complex business rules. They run in a Node.js or Python environment and can access all Firebase services through the Admin SDK.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I deploy a Firebase project to production?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the Firebase CLI to deploy. Run firebase init to set up your project, then firebase deploy to deploy everything (hosting, functions, rules, indexes). You can deploy specific services with flags like --only hosting or --only functions. Firebase Hosting provides free SSL, global CDN, atomic deploys with instant rollback, and custom domain support. Use preview channels for staging environments before deploying to production.',
      },
    },
  ],
};

export default function FirebaseGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const ulStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
    paddingLeft: '24px',
  };

  const tldrBoxStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '16px 20px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: '#0c4a6e',
  };

  const keyTakeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '20px 24px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    marginBottom: '24px',
  };

  const thStyle: React.CSSProperties = {
    padding: '10px 14px',
    textAlign: 'left',
    background: '#1e293b',
    color: '#f1f5f9',
    fontWeight: '600',
  };

  const tdStyle: React.CSSProperties = {
    padding: '9px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
    verticalAlign: 'top',
  };

  const inlineCodeStyle: React.CSSProperties = {
    background: '#f1f5f9',
    color: '#dc2626',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.85em',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR */}
      <div style={tldrBoxStyle}>
        <strong>TL;DR</strong>
        <p style={{ margin: '8px 0 0 0' }}>
          {isZh
            ? 'Firebase 是 Google 提供的全面应用开发平台，包含认证、Firestore 数据库、实时数据库、云存储、云函数、托管和分析等服务。使用免费的 Spark 计划即可启动项目，Firestore 提供每天 50K 读取和 20K 写入。客户端 SDK 支持 Web、iOS 和 Android，Admin SDK 用于服务器端安全操作。Firebase Hosting 提供免费 SSL 和全球 CDN。'
            : 'Firebase is Google\'s comprehensive app development platform providing Authentication, Firestore database, Realtime Database, Cloud Storage, Cloud Functions, Hosting, and Analytics. Start with the free Spark plan offering 50K Firestore reads and 20K writes per day. Client SDKs support Web, iOS, and Android, while the Admin SDK handles secure server-side operations. Firebase Hosting includes free SSL and a global CDN.'}
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={keyTakeawaysStyle}>
        <strong style={{ color: '#0f172a', display: 'block', marginBottom: '8px' }}>
          {isZh ? '关键要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#374151' }}>
          <li>{isZh ? 'Firebase 提供完整的后端即服务，包含认证、数据库、存储和托管' : 'Firebase provides a complete Backend-as-a-Service with auth, database, storage, and hosting'}</li>
          <li>{isZh ? 'Firestore 是推荐的数据库，支持复杂查询和离线同步' : 'Firestore is the recommended database with complex queries and offline sync'}</li>
          <li>{isZh ? '安全规则在服务器端执行，控制所有客户端访问' : 'Security rules execute server-side and control all client access'}</li>
          <li>{isZh ? 'Cloud Functions 处理服务器端逻辑、触发器和定时任务' : 'Cloud Functions handle server-side logic, triggers, and scheduled tasks'}</li>
          <li>{isZh ? '免费 Spark 计划对原型开发和小型应用足够慷慨' : 'The free Spark plan is generous enough for prototypes and small apps'}</li>
          <li>{isZh ? 'Admin SDK 用于服务器端操作，绕过安全规则' : 'Admin SDK is used for server-side operations, bypassing security rules'}</li>
        </ul>
      </div>

      {/* What is Firebase */}
      <h2 style={h2Style}>{isZh ? '什么是 Firebase？' : 'What Is Firebase?'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Firebase 是 Google 提供的应用开发平台，为开发者提供构建、改进和扩展应用所需的一系列后端服务和工具。Firebase 于 2011 年成立，2014 年被 Google 收购，现已发展成为一个全面的平台，包含超过 18 个产品，涵盖数据库、认证、存储、托管、分析、消息推送等。'
          : 'Firebase is an application development platform by Google that provides developers with a suite of backend services and tools to build, improve, and scale applications. Founded in 2011 and acquired by Google in 2014, Firebase has grown into a comprehensive platform with over 18 products covering databases, authentication, storage, hosting, analytics, messaging, and more.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'Firebase 的核心优势在于它消除了管理服务器基础设施的需要。你可以专注于构建用户界面和业务逻辑，而 Firebase 负责后端的扩展、安全和维护。'
          : 'The core advantage of Firebase is that it eliminates the need to manage server infrastructure. You focus on building your user interface and business logic while Firebase handles backend scaling, security, and maintenance.'}
      </p>

      {/* Project Setup */}
      <h2 style={h2Style}>{isZh ? '项目设置与配置' : 'Project Setup & Configuration'}</h2>
      <p style={pStyle}>
        {isZh
          ? '开始使用 Firebase 需要创建项目、安装 SDK 并初始化配置。以下是完整的设置流程。'
          : 'Getting started with Firebase requires creating a project, installing the SDK, and initializing the configuration. Here is the complete setup process.'}
      </p>
      <pre style={preStyle}><code>{'# Install Firebase CLI globally\n' +
        'npm install -g firebase-tools\n\n' +
        '# Login to Firebase\n' +
        'firebase login\n\n' +
        '# Initialize a new project\n' +
        'firebase init\n\n' +
        '# Install Firebase SDK in your project\n' +
        'npm install firebase'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '在 Firebase 控制台创建项目后，你会获得一个配置对象。在你的应用中初始化 Firebase：'
          : 'After creating a project in the Firebase Console, you receive a configuration object. Initialize Firebase in your application:'}
      </p>
      <pre style={preStyle}><code>{'// src/lib/firebase.ts\n' +
        'import { initializeApp } from "firebase/app";\n' +
        'import { getAuth } from "firebase/auth";\n' +
        'import { getFirestore } from "firebase/firestore";\n' +
        'import { getStorage } from "firebase/storage";\n\n' +
        'const firebaseConfig = {\n' +
        '  apiKey: "AIzaSyD...",\n' +
        '  authDomain: "myapp.firebaseapp.com",\n' +
        '  projectId: "myapp-12345",\n' +
        '  storageBucket: "myapp-12345.appspot.com",\n' +
        '  messagingSenderId: "123456789",\n' +
        '  appId: "1:123456789:web:abc123",\n' +
        '  measurementId: "G-XXXXXXX"\n' +
        '};\n\n' +
        'const app = initializeApp(firebaseConfig);\n' +
        'export const auth = getAuth(app);\n' +
        'export const db = getFirestore(app);\n' +
        'export const storage = getStorage(app);'}</code></pre>

      {/* Authentication */}
      <h2 style={h2Style}>{isZh ? '认证 (Authentication)' : 'Authentication'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Firebase Authentication 提供完整的用户认证系统，支持邮箱/密码、Google、GitHub、Twitter、Facebook 等多种登录方式。它处理令牌管理、会话持久化和安全性。'
          : 'Firebase Authentication provides a complete user authentication system supporting email/password, Google, GitHub, Twitter, Facebook, and more. It handles token management, session persistence, and security.'}
      </p>

      <h3 style={h3Style}>{isZh ? '邮箱/密码认证' : 'Email/Password Authentication'}</h3>
      <pre style={preStyle}><code>{'import { getAuth, createUserWithEmailAndPassword,\n' +
        '  signInWithEmailAndPassword, signOut,\n' +
        '  onAuthStateChanged, sendPasswordResetEmail,\n' +
        '  sendEmailVerification } from "firebase/auth";\n\n' +
        'const auth = getAuth();\n\n' +
        '// Register a new user\n' +
        'async function register(email: string, password: string) {\n' +
        '  const userCredential = await createUserWithEmailAndPassword(\n' +
        '    auth, email, password\n' +
        '  );\n' +
        '  // Send email verification\n' +
        '  await sendEmailVerification(userCredential.user);\n' +
        '  return userCredential.user;\n' +
        '}\n\n' +
        '// Sign in existing user\n' +
        'async function login(email: string, password: string) {\n' +
        '  const userCredential = await signInWithEmailAndPassword(\n' +
        '    auth, email, password\n' +
        '  );\n' +
        '  return userCredential.user;\n' +
        '}\n\n' +
        '// Listen for auth state changes\n' +
        'onAuthStateChanged(auth, (user) => {\n' +
        '  if (user) {\n' +
        '    console.log("Signed in:", user.uid);\n' +
        '  } else {\n' +
        '    console.log("Signed out");\n' +
        '  }\n' +
        '});\n\n' +
        '// Sign out\n' +
        'await signOut(auth);\n\n' +
        '// Password reset\n' +
        'await sendPasswordResetEmail(auth, "user@example.com");'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Google 和 GitHub OAuth 登录' : 'Google & GitHub OAuth Sign-In'}</h3>
      <pre style={preStyle}><code>{'import { GoogleAuthProvider, GithubAuthProvider,\n' +
        '  signInWithPopup, signInWithRedirect } from "firebase/auth";\n\n' +
        '// Google Sign-In\n' +
        'async function signInWithGoogle() {\n' +
        '  const provider = new GoogleAuthProvider();\n' +
        '  provider.addScope("profile");\n' +
        '  provider.addScope("email");\n' +
        '  const result = await signInWithPopup(auth, provider);\n' +
        '  const credential = GoogleAuthProvider.credentialFromResult(result);\n' +
        '  const token = credential?.accessToken;\n' +
        '  return result.user;\n' +
        '}\n\n' +
        '// GitHub Sign-In\n' +
        'async function signInWithGitHub() {\n' +
        '  const provider = new GithubAuthProvider();\n' +
        '  provider.addScope("repo");\n' +
        '  const result = await signInWithPopup(auth, provider);\n' +
        '  return result.user;\n' +
        '}'}</code></pre>

      {/* Firestore */}
      <h2 style={h2Style}>{isZh ? 'Cloud Firestore 数据库' : 'Cloud Firestore Database'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Cloud Firestore 是 Firebase 推荐的 NoSQL 数据库，基于文档-集合模型。它支持实时同步、离线持久化、复杂查询和自动索引。数据组织为集合（collections）中的文档（documents），每个文档包含字段-值对。'
          : 'Cloud Firestore is Firebase\'s recommended NoSQL database built on a document-collection model. It supports real-time sync, offline persistence, complex queries, and automatic indexing. Data is organized as documents within collections, where each document contains field-value pairs.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'CRUD 操作' : 'CRUD Operations'}</h3>
      <pre style={preStyle}><code>{'import { collection, doc, addDoc, setDoc, getDoc,\n' +
        '  getDocs, updateDoc, deleteDoc, serverTimestamp,\n' +
        '  arrayUnion, increment } from "firebase/firestore";\n\n' +
        '// CREATE - Add a document with auto-generated ID\n' +
        'const docRef = await addDoc(collection(db, "posts"), {\n' +
        '  title: "Getting Started with Firebase",\n' +
        '  content: "Firebase is a powerful platform...",\n' +
        '  author: "jane_doe",\n' +
        '  tags: ["firebase", "tutorial"],\n' +
        '  likes: 0,\n' +
        '  createdAt: serverTimestamp()\n' +
        '});\n' +
        'console.log("Document ID:", docRef.id);\n\n' +
        '// CREATE - Set a document with a specific ID\n' +
        'await setDoc(doc(db, "users", "user123"), {\n' +
        '  name: "Jane Doe",\n' +
        '  email: "jane@example.com",\n' +
        '  role: "admin"\n' +
        '});\n\n' +
        '// READ - Get a single document\n' +
        'const docSnap = await getDoc(doc(db, "posts", docRef.id));\n' +
        'if (docSnap.exists()) {\n' +
        '  console.log("Data:", docSnap.data());\n' +
        '}\n\n' +
        '// READ - Get all documents in a collection\n' +
        'const querySnapshot = await getDocs(collection(db, "posts"));\n' +
        'querySnapshot.forEach((doc) => {\n' +
        '  console.log(doc.id, " => ", doc.data());\n' +
        '});\n\n' +
        '// UPDATE - Update specific fields\n' +
        'await updateDoc(doc(db, "posts", docRef.id), {\n' +
        '  title: "Updated Title",\n' +
        '  likes: increment(1),\n' +
        '  tags: arrayUnion("updated")\n' +
        '});\n\n' +
        '// DELETE\n' +
        'await deleteDoc(doc(db, "posts", docRef.id));'}</code></pre>

      <h3 style={h3Style}>{isZh ? '查询与过滤' : 'Queries & Filtering'}</h3>
      <pre style={preStyle}><code>{'import { query, where, orderBy, limit, startAfter,\n' +
        '  getDocs } from "firebase/firestore";\n\n' +
        '// Simple query with filter\n' +
        'const q1 = query(\n' +
        '  collection(db, "posts"),\n' +
        '  where("author", "==", "jane_doe"),\n' +
        '  where("likes", ">=", 10),\n' +
        '  orderBy("likes", "desc"),\n' +
        '  limit(20)\n' +
        ');\n' +
        'const snapshot = await getDocs(q1);\n\n' +
        '// Array contains query\n' +
        'const q2 = query(\n' +
        '  collection(db, "posts"),\n' +
        '  where("tags", "array-contains", "firebase")\n' +
        ');\n\n' +
        '// Pagination with cursors\n' +
        'const first = query(\n' +
        '  collection(db, "posts"),\n' +
        '  orderBy("createdAt", "desc"),\n' +
        '  limit(10)\n' +
        ');\n' +
        'const firstPage = await getDocs(first);\n' +
        'const lastDoc = firstPage.docs[firstPage.docs.length - 1];\n\n' +
        'const next = query(\n' +
        '  collection(db, "posts"),\n' +
        '  orderBy("createdAt", "desc"),\n' +
        '  startAfter(lastDoc),\n' +
        '  limit(10)\n' +
        ');'}</code></pre>

      <h3 style={h3Style}>{isZh ? '实时监听' : 'Real-Time Listeners'}</h3>
      <pre style={preStyle}><code>{'import { onSnapshot } from "firebase/firestore";\n\n' +
        '// Listen to a single document\n' +
        'const unsubDoc = onSnapshot(\n' +
        '  doc(db, "posts", "post123"),\n' +
        '  (doc) => {\n' +
        '    console.log("Current data:", doc.data());\n' +
        '  }\n' +
        ');\n\n' +
        '// Listen to a query\n' +
        'const unsubQuery = onSnapshot(\n' +
        '  query(collection(db, "posts"),\n' +
        '    where("author", "==", "jane_doe")),\n' +
        '  (snapshot) => {\n' +
        '    snapshot.docChanges().forEach((change) => {\n' +
        '      if (change.type === "added") {\n' +
        '        console.log("New post:", change.doc.data());\n' +
        '      }\n' +
        '      if (change.type === "modified") {\n' +
        '        console.log("Updated:", change.doc.data());\n' +
        '      }\n' +
        '      if (change.type === "removed") {\n' +
        '        console.log("Removed:", change.doc.id);\n' +
        '      }\n' +
        '    });\n' +
        '  }\n' +
        ');\n\n' +
        '// Unsubscribe when done\n' +
        'unsubDoc();\n' +
        'unsubQuery();'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Firestore 安全规则' : 'Firestore Security Rules'}</h3>
      <pre style={preStyle}><code>{'rules_version = \'2\';\n' +
        'service cloud.firestore {\n' +
        '  match /databases/{database}/documents {\n\n' +
        '    // Users can read/write their own profile\n' +
        '    match /users/{userId} {\n' +
        '      allow read: if request.auth != null;\n' +
        '      allow write: if request.auth.uid == userId;\n' +
        '    }\n\n' +
        '    // Posts: anyone can read, only author can write\n' +
        '    match /posts/{postId} {\n' +
        '      allow read: if true;\n' +
        '      allow create: if request.auth != null\n' +
        '        && request.resource.data.author == request.auth.uid\n' +
        '        && request.resource.data.title is string\n' +
        '        && request.resource.data.title.size() <= 200;\n' +
        '      allow update: if request.auth.uid ==\n' +
        '        resource.data.author;\n' +
        '      allow delete: if request.auth.uid ==\n' +
        '        resource.data.author;\n' +
        '    }\n\n' +
        '    // Helper function for admin check\n' +
        '    function isAdmin() {\n' +
        '      return request.auth != null\n' +
        '        && get(/databases/$(database)/documents/\n' +
        '          users/$(request.auth.uid)).data.role == "admin";\n' +
        '    }\n' +
        '  }\n' +
        '}'}</code></pre>

      {/* Realtime Database vs Firestore */}
      <h2 style={h2Style}>{isZh ? '实时数据库 vs Firestore' : 'Realtime Database vs Firestore'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Firebase 提供两个数据库产品。Realtime Database 是原始的 JSON 数据库，而 Firestore 是较新的文档数据库。以下是关键对比：'
          : 'Firebase offers two database products. Realtime Database is the original JSON database, and Firestore is the newer document database. Here is a key comparison:'}
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
            <th style={thStyle}>Firestore</th>
            <th style={thStyle}>Realtime Database</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '数据模型' : 'Data Model'}</td><td style={tdStyle}>{isZh ? '文档-集合' : 'Document-Collection'}</td><td style={tdStyle}>JSON Tree</td></tr>
          <tr><td style={tdStyle}>{isZh ? '查询' : 'Queries'}</td><td style={tdStyle}>{isZh ? '复合查询、索引' : 'Compound queries, indexing'}</td><td style={tdStyle}>{isZh ? '简单排序/过滤' : 'Simple sort/filter'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '离线支持' : 'Offline'}</td><td style={tdStyle}>{isZh ? 'Web、iOS、Android 全支持' : 'Web, iOS, Android'}</td><td style={tdStyle}>{isZh ? '仅 iOS、Android' : 'iOS, Android only'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '扩展性' : 'Scaling'}</td><td style={tdStyle}>{isZh ? '自动，多区域' : 'Automatic, multi-region'}</td><td style={tdStyle}>{isZh ? '需要分片' : 'Requires sharding'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '定价' : 'Pricing'}</td><td style={tdStyle}>{isZh ? '按操作计费' : 'Per operation'}</td><td style={tdStyle}>{isZh ? '按带宽和存储' : 'Bandwidth + storage'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '延迟' : 'Latency'}</td><td style={tdStyle}>{isZh ? '较低' : 'Low'}</td><td style={tdStyle}>{isZh ? '极低' : 'Very low'}</td></tr>
        </tbody>
      </table>
      <p style={pStyle}>
        {isZh
          ? '对于新项目，Google 推荐使用 Firestore。Realtime Database 适合需要极低延迟的简单数据同步场景，如在线状态指示器或多人游戏状态。'
          : 'For new projects, Google recommends Firestore. Realtime Database is suitable for scenarios requiring extremely low-latency data synchronization, such as presence indicators or multiplayer game state.'}
      </p>

      {/* Cloud Storage */}
      <h2 style={h2Style}>{isZh ? '云存储 (Cloud Storage)' : 'Cloud Storage'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Firebase Cloud Storage 基于 Google Cloud Storage 构建，用于存储和提供用户生成的内容，如图片、视频和文件。它支持断点续传、进度监控和安全规则。'
          : 'Firebase Cloud Storage is built on Google Cloud Storage for storing and serving user-generated content like images, videos, and files. It supports resumable uploads, progress monitoring, and security rules.'}
      </p>
      <pre style={preStyle}><code>{'import { ref, uploadBytes, uploadBytesResumable,\n' +
        '  getDownloadURL, deleteObject,\n' +
        '  listAll } from "firebase/storage";\n\n' +
        '// Upload a file\n' +
        'async function uploadFile(file: File, path: string) {\n' +
        '  const storageRef = ref(storage, path);\n' +
        '  const snapshot = await uploadBytes(storageRef, file);\n' +
        '  const url = await getDownloadURL(snapshot.ref);\n' +
        '  return url;\n' +
        '}\n\n' +
        '// Upload with progress tracking\n' +
        'function uploadWithProgress(file: File, path: string) {\n' +
        '  const storageRef = ref(storage, path);\n' +
        '  const uploadTask = uploadBytesResumable(storageRef, file);\n\n' +
        '  uploadTask.on("state_changed",\n' +
        '    (snapshot) => {\n' +
        '      const progress = (snapshot.bytesTransferred /\n' +
        '        snapshot.totalBytes) * 100;\n' +
        '      console.log("Upload:", progress + "% done");\n' +
        '    },\n' +
        '    (error) => console.error("Upload failed:", error),\n' +
        '    async () => {\n' +
        '      const url = await getDownloadURL(\n' +
        '        uploadTask.snapshot.ref\n' +
        '      );\n' +
        '      console.log("Download URL:", url);\n' +
        '    }\n' +
        '  );\n' +
        '}\n\n' +
        '// Download URL for a file\n' +
        'const url = await getDownloadURL(\n' +
        '  ref(storage, "images/photo.jpg")\n' +
        ');\n\n' +
        '// Delete a file\n' +
        'await deleteObject(ref(storage, "images/photo.jpg"));\n\n' +
        '// List all files in a directory\n' +
        'const result = await listAll(ref(storage, "images"));\n' +
        'result.items.forEach((itemRef) => {\n' +
        '  console.log(itemRef.fullPath);\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>{isZh ? '存储安全规则' : 'Storage Security Rules'}</h3>
      <pre style={preStyle}><code>{'rules_version = \'2\';\n' +
        'service firebase.storage {\n' +
        '  match /b/{bucket}/o {\n' +
        '    // Users can upload to their own folder\n' +
        '    match /users/{userId}/{allPaths=**} {\n' +
        '      allow read: if request.auth != null;\n' +
        '      allow write: if request.auth.uid == userId\n' +
        '        && request.resource.size < 5 * 1024 * 1024\n' +
        '        && request.resource.contentType\n' +
        '          .matches(\'image/.*\');\n' +
        '    }\n' +
        '    // Public read for published content\n' +
        '    match /public/{allPaths=**} {\n' +
        '      allow read: if true;\n' +
        '      allow write: if request.auth != null;\n' +
        '    }\n' +
        '  }\n' +
        '}'}</code></pre>

      {/* Cloud Functions */}
      <h2 style={h2Style}>{isZh ? '云函数 (Cloud Functions)' : 'Cloud Functions'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Firebase Cloud Functions 是无服务器函数，在 Firebase 事件或 HTTPS 请求触发时运行。它们适合处理后端逻辑，如发送通知、处理支付、数据聚合和定时任务。'
          : 'Firebase Cloud Functions are serverless functions that run in response to Firebase events or HTTPS requests. They are ideal for backend logic like sending notifications, processing payments, data aggregation, and scheduled tasks.'}
      </p>
      <pre style={preStyle}><code>{'// functions/src/index.ts\n' +
        'import { onRequest } from "firebase-functions/v2/https";\n' +
        'import { onDocumentCreated } from "firebase-functions/v2/firestore";\n' +
        'import { onSchedule } from "firebase-functions/v2/scheduler";\n' +
        'import { getFirestore } from "firebase-admin/firestore";\n' +
        'import { initializeApp } from "firebase-admin/app";\n\n' +
        'initializeApp();\n' +
        'const db = getFirestore();\n\n' +
        '// HTTPS function\n' +
        'export const helloWorld = onRequest((req, res) => {\n' +
        '  res.json({ message: "Hello from Firebase!" });\n' +
        '});\n\n' +
        '// Firestore trigger: on new post created\n' +
        'export const onPostCreated = onDocumentCreated(\n' +
        '  "posts/{postId}",\n' +
        '  async (event) => {\n' +
        '    const data = event.data?.data();\n' +
        '    if (!data) return;\n' +
        '    await db.doc("users/" + data.author).update({\n' +
        '      postCount: FieldValue.increment(1)\n' +
        '    });\n' +
        '  }\n' +
        ');\n\n' +
        '// Scheduled function: daily cleanup\n' +
        'export const dailyCleanup = onSchedule("every day 02:00",\n' +
        '  async () => {\n' +
        '    const cutoff = new Date();\n' +
        '    cutoff.setDate(cutoff.getDate() - 30);\n' +
        '    const old = await db.collection("logs")\n' +
        '      .where("createdAt", "<", cutoff).get();\n' +
        '    const batch = db.batch();\n' +
        '    old.docs.forEach((d) => batch.delete(d.ref));\n' +
        '    await batch.commit();\n' +
        '  }\n' +
        ');'}</code></pre>

      {/* Hosting & Deployment */}
      <h2 style={h2Style}>{isZh ? '托管与部署' : 'Hosting & Deployment'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Firebase Hosting 提供快速、安全的静态和动态内容托管，包含免费 SSL、全球 CDN、原子部署和即时回滚。它支持单页应用、静态站点以及通过 Cloud Functions 的服务端渲染。'
          : 'Firebase Hosting provides fast, secure hosting for static and dynamic content with free SSL, global CDN, atomic deploys, and instant rollback. It supports single-page apps, static sites, and server-side rendering via Cloud Functions.'}
      </p>
      <pre style={preStyle}><code>{'# firebase.json configuration\n' +
        '{\n' +
        '  "hosting": {\n' +
        '    "public": "build",\n' +
        '    "ignore": ["firebase.json", "**/node_modules/**"],\n' +
        '    "rewrites": [\n' +
        '      { "source": "/api/**", "function": "api" },\n' +
        '      { "source": "**", "destination": "/index.html" }\n' +
        '    ],\n' +
        '    "headers": [{\n' +
        '      "source": "**/*.@(js|css)",\n' +
        '      "headers": [{ "key": "Cache-Control",\n' +
        '        "value": "max-age=31536000" }]\n' +
        '    }]\n' +
        '  }\n' +
        '}\n\n' +
        '# Deploy commands\n' +
        'firebase deploy                          # deploy all\n' +
        'firebase deploy --only hosting           # hosting only\n' +
        'firebase hosting:channel:deploy staging   # preview\n' +
        'firebase hosting:rollback                 # rollback'}</code></pre>

      {/* Admin SDK */}
      <h2 style={h2Style}>{isZh ? 'Firebase Admin SDK' : 'Firebase Admin SDK'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Admin SDK 用于服务器端操作，它绕过安全规则并拥有完整的数据库和认证系统访问权限。用于 Node.js 后端、Cloud Functions 和服务器端渲染。'
          : 'The Admin SDK is for server-side operations. It bypasses security rules and has full access to the database and authentication system. Use it in Node.js backends, Cloud Functions, and server-side rendering.'}
      </p>
      <pre style={preStyle}><code>{'// Server-side: Admin SDK setup\n' +
        'import { initializeApp, cert } from "firebase-admin/app";\n' +
        'import { getFirestore } from "firebase-admin/firestore";\n' +
        'import { getAuth } from "firebase-admin/auth";\n\n' +
        'const app = initializeApp({\n' +
        '  credential: cert({\n' +
        '    projectId: "myapp-12345",\n' +
        '    clientEmail: "firebase-adminsdk@myapp.iam...",\n' +
        '    privateKey: process.env.FIREBASE_PRIVATE_KEY\n' +
        '  })\n' +
        '});\n\n' +
        'const db = getFirestore();\n' +
        'const auth = getAuth();\n\n' +
        '// Admin operations bypass security rules\n' +
        'const users = await auth.listUsers(100);\n' +
        'users.users.forEach((user) => {\n' +
        '  console.log(user.uid, user.email);\n' +
        '});\n\n' +
        '// Verify ID tokens from client\n' +
        'async function verifyToken(idToken: string) {\n' +
        '  const decoded = await auth.verifyIdToken(idToken);\n' +
        '  return decoded; // { uid, email, ... }\n' +
        '}\n\n' +
        '// Set custom claims for roles\n' +
        'await auth.setCustomUserClaims("user123", {\n' +
        '  admin: true,\n' +
        '  role: "editor"\n' +
        '});'}</code></pre>

      {/* Analytics */}
      <h2 style={h2Style}>{isZh ? '分析与性能监控' : 'Analytics & Performance Monitoring'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Firebase Analytics（基于 Google Analytics）提供免费、无限的应用分析，包含用户行为追踪、转化漏斗、受众细分和自定义事件。Performance Monitoring 自动追踪应用启动时间、网络请求延迟和屏幕渲染性能。'
          : 'Firebase Analytics (powered by Google Analytics) provides free, unlimited app analytics with user behavior tracking, conversion funnels, audience segmentation, and custom events. Performance Monitoring automatically tracks app start time, network request latency, and screen rendering performance.'}
      </p>
      <pre style={preStyle}><code>{'import { getAnalytics, logEvent,\n' +
        '  setUserProperties } from "firebase/analytics";\n' +
        'import { getPerformance, trace } from "firebase/performance";\n\n' +
        '// Initialize Analytics\n' +
        'const analytics = getAnalytics();\n\n' +
        '// Log custom events\n' +
        'logEvent(analytics, "tool_used", {\n' +
        '  tool_name: "json_formatter",\n' +
        '  input_size: 1024\n' +
        '});\n\n' +
        '// Log purchase event\n' +
        'logEvent(analytics, "purchase", {\n' +
        '  currency: "USD",\n' +
        '  value: 9.99,\n' +
        '  items: [{ item_name: "Pro Plan" }]\n' +
        '});\n\n' +
        '// Set user properties for segmentation\n' +
        'setUserProperties(analytics, {\n' +
        '  plan: "pro",\n' +
        '  preferred_language: "en"\n' +
        '});\n\n' +
        '// Performance Monitoring - custom trace\n' +
        'const perf = getPerformance();\n' +
        'const t = trace(perf, "data_load");\n' +
        't.start();\n' +
        '// ... perform operation\n' +
        't.putAttribute("data_source", "firestore");\n' +
        't.putMetric("item_count", 42);\n' +
        't.stop();'}</code></pre>

      {/* Firebase with React/Next.js */}
      <h2 style={h2Style}>{isZh ? 'Firebase 与 React / Next.js' : 'Firebase with React & Next.js'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Firebase 与 React 和 Next.js 集成非常好。在 React 中使用 hooks 管理认证状态和数据监听。在 Next.js 中，使用 Admin SDK 进行服务器端操作，客户端 SDK 用于实时功能。'
          : 'Firebase integrates well with React and Next.js. Use React hooks to manage auth state and data listeners. In Next.js, use the Admin SDK for server-side operations and the client SDK for real-time features.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'React 认证 Hook' : 'React Auth Hook'}</h3>
      <pre style={preStyle}><code>{'// hooks/useAuth.ts\n' +
        'import { useState, useEffect } from "react";\n' +
        'import { onAuthStateChanged, User } from "firebase/auth";\n' +
        'import { auth } from "../lib/firebase";\n\n' +
        'export function useAuth() {\n' +
        '  const [user, setUser] = useState<User | null>(null);\n' +
        '  const [loading, setLoading] = useState(true);\n\n' +
        '  useEffect(() => {\n' +
        '    const unsub = onAuthStateChanged(auth, (user) => {\n' +
        '      setUser(user);\n' +
        '      setLoading(false);\n' +
        '    });\n' +
        '    return () => unsub();\n' +
        '  }, []);\n\n' +
        '  return { user, loading };\n' +
        '}'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'React Firestore 实时 Hook' : 'React Firestore Real-Time Hook'}</h3>
      <pre style={preStyle}><code>{'// hooks/useCollection.ts\n' +
        'import { useState, useEffect } from "react";\n' +
        'import { collection, query, onSnapshot,\n' +
        '  QueryConstraint } from "firebase/firestore";\n' +
        'import { db } from "../lib/firebase";\n\n' +
        'export function useCollection<T>(\n' +
        '  path: string,\n' +
        '  constraints: QueryConstraint[] = []\n' +
        ') {\n' +
        '  const [data, setData] = useState<T[]>([]);\n' +
        '  const [loading, setLoading] = useState(true);\n\n' +
        '  useEffect(() => {\n' +
        '    const q = query(collection(db, path),\n' +
        '      ...constraints);\n' +
        '    const unsub = onSnapshot(q, (snap) => {\n' +
        '      const docs = snap.docs.map((d) => ({\n' +
        '        id: d.id,\n' +
        '        ...d.data()\n' +
        '      })) as T[];\n' +
        '      setData(docs);\n' +
        '      setLoading(false);\n' +
        '    });\n' +
        '    return () => unsub();\n' +
        '  }, [path]);\n\n' +
        '  return { data, loading };\n' +
        '}'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Next.js 服务器端操作' : 'Next.js Server-Side with Admin SDK'}</h3>
      <pre style={preStyle}><code>{'// app/api/posts/route.ts (Next.js App Router)\n' +
        'import { getFirestore } from "firebase-admin/firestore";\n' +
        'import { getAuth } from "firebase-admin/auth";\n' +
        'import { NextRequest, NextResponse } from "next/server";\n\n' +
        'const db = getFirestore();\n\n' +
        'export async function GET(req: NextRequest) {\n' +
        '  // Verify auth token from header\n' +
        '  const token = req.headers\n' +
        '    .get("Authorization")?.split("Bearer ")[1];\n' +
        '  if (!token) {\n' +
        '    return NextResponse.json(\n' +
        '      { error: "Unauthorized" }, { status: 401 }\n' +
        '    );\n' +
        '  }\n' +
        '  const decoded = await getAuth().verifyIdToken(token);\n\n' +
        '  // Fetch user posts server-side\n' +
        '  const snap = await db.collection("posts")\n' +
        '    .where("author", "==", decoded.uid)\n' +
        '    .orderBy("createdAt", "desc")\n' +
        '    .limit(20)\n' +
        '    .get();\n\n' +
        '  const posts = snap.docs.map((d) => ({\n' +
        '    id: d.id,\n' +
        '    ...d.data()\n' +
        '  }));\n\n' +
        '  return NextResponse.json({ posts });\n' +
        '}'}</code></pre>

      {/* Security Best Practices */}
      <h2 style={h2Style}>{isZh ? '安全最佳实践' : 'Security Best Practices'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Firebase 安全是应用安全的基础。以下是保护 Firebase 应用的关键实践：'
          : 'Firebase security is foundational to application security. Here are key practices for securing your Firebase application:'}
      </p>
      <ul style={ulStyle}>
        <li style={{ marginBottom: '8px' }}>
          <strong>{isZh ? '永远不要依赖客户端验证' : 'Never rely on client-side validation alone'}</strong>
          {isZh
            ? ' — 始终在安全规则中验证数据结构、类型和权限。客户端验证可以被绕过。'
            : ' — Always validate data structure, types, and permissions in security rules. Client-side validation can be bypassed.'}
        </li>
        <li style={{ marginBottom: '8px' }}>
          <strong>{isZh ? '使用最小权限原则' : 'Use the principle of least privilege'}</strong>
          {isZh
            ? ' — 默认拒绝所有访问，然后仅为需要的操作开放权限。不要使用 allow read, write: if true 。'
            : ' — Default deny all access, then only open permissions for needed operations. Never use allow read, write: if true in production.'}
        </li>
        <li style={{ marginBottom: '8px' }}>
          <strong>{isZh ? '保护 API 密钥' : 'Protect API keys'}</strong>
          {isZh
            ? ' — Firebase API 密钥是公开的标识符，但应在 Google Cloud Console 中限制其使用范围（域名限制、API 限制）。'
            : ' — Firebase API keys are public identifiers, but restrict their usage scope in Google Cloud Console (domain restrictions, API restrictions).'}
        </li>
        <li style={{ marginBottom: '8px' }}>
          <strong>{isZh ? '使用 App Check' : 'Enable App Check'}</strong>
          {isZh
            ? ' — Firebase App Check 验证请求来自你的合法应用，防止滥用。'
            : ' — Firebase App Check verifies that requests come from your legitimate app, preventing abuse.'}
        </li>
        <li style={{ marginBottom: '8px' }}>
          <strong>{isZh ? '验证自定义声明' : 'Validate custom claims'}</strong>
          {isZh
            ? ' — 在安全规则中使用 request.auth.token 检查角色和权限。'
            : ' — Use request.auth.token in security rules to check roles and permissions.'}
        </li>
        <li style={{ marginBottom: '8px' }}>
          <strong>{isZh ? '限制数据查询大小' : 'Limit query sizes'}</strong>
          {isZh
            ? ' — 在安全规则中使用 request.query.limit 防止客户端读取过多数据。'
            : ' — Use request.query.limit in security rules to prevent clients from reading excessive data.'}
        </li>
      </ul>

      {/* Pricing & Free Tier */}
      <h2 style={h2Style}>{isZh ? '定价与免费额度' : 'Pricing & Free Tier'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Firebase 提供两个计划：免费的 Spark 计划和按需付费的 Blaze 计划。Blaze 计划包含所有 Spark 免费额度。'
          : 'Firebase offers two plans: the free Spark plan and the pay-as-you-go Blaze plan. The Blaze plan includes all Spark free tier allowances.'}
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '服务' : 'Service'}</th>
            <th style={thStyle}>{isZh ? 'Spark（免费）' : 'Spark (Free)'}</th>
            <th style={thStyle}>{isZh ? 'Blaze（超出免费后）' : 'Blaze (Beyond Free)'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Firestore {isZh ? '存储' : 'Storage'}</td><td style={tdStyle}>1 GiB</td><td style={tdStyle}>$0.108/GiB</td></tr>
          <tr><td style={tdStyle}>Firestore {isZh ? '读取' : 'Reads'}</td><td style={tdStyle}>50K/{isZh ? '天' : 'day'}</td><td style={tdStyle}>$0.036/100K</td></tr>
          <tr><td style={tdStyle}>Firestore {isZh ? '写入' : 'Writes'}</td><td style={tdStyle}>20K/{isZh ? '天' : 'day'}</td><td style={tdStyle}>$0.108/100K</td></tr>
          <tr><td style={tdStyle}>Cloud Storage</td><td style={tdStyle}>5 GB</td><td style={tdStyle}>$0.026/GB</td></tr>
          <tr><td style={tdStyle}>Cloud Functions</td><td style={tdStyle}>125K/{isZh ? '月' : 'mo'}</td><td style={tdStyle}>$0.40/million</td></tr>
          <tr><td style={tdStyle}>Hosting</td><td style={tdStyle}>10 GB {isZh ? '带宽' : 'bandwidth'}</td><td style={tdStyle}>$0.15/GB</td></tr>
          <tr><td style={tdStyle}>Authentication</td><td style={tdStyle}>{isZh ? '无限' : 'Unlimited'}</td><td style={tdStyle}>{isZh ? '无限（电话认证除外）' : 'Unlimited (except phone auth)'}</td></tr>
          <tr><td style={tdStyle}>Analytics</td><td style={tdStyle}>{isZh ? '无限' : 'Unlimited'}</td><td style={tdStyle}>{isZh ? '无限' : 'Unlimited'}</td></tr>
        </tbody>
      </table>
      <p style={pStyle}>
        {isZh
          ? '提示：Blaze 计划可以设置预算警报来防止意外费用。对于大多数原型和小型应用，免费额度完全足够。'
          : 'Tip: The Blaze plan supports budget alerts to prevent unexpected charges. For most prototypes and small apps, the free tier is more than sufficient.'}
      </p>

      {/* Firebase Emulator Suite */}
      <h2 style={h2Style}>{isZh ? 'Firebase 模拟器套件' : 'Firebase Emulator Suite'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Firebase 模拟器套件让你在本地运行 Firebase 服务进行开发和测试，无需连接到生产项目。它支持 Auth、Firestore、Realtime Database、Storage、Functions 和 Hosting。'
          : 'The Firebase Emulator Suite lets you run Firebase services locally for development and testing without connecting to a production project. It supports Auth, Firestore, Realtime Database, Storage, Functions, and Hosting.'}
      </p>
      <pre style={preStyle}><code>{'# Install and start emulators\n' +
        'firebase init emulators\n' +
        'firebase emulators:start\n\n' +
        '# Default ports: Auth :9099, Firestore :8080,\n' +
        '# Functions :5001, Storage :9199, UI :4000\n\n' +
        '// Connect app to emulators in development\n' +
        'import { connectAuthEmulator } from "firebase/auth";\n' +
        'import { connectFirestoreEmulator } from "firebase/firestore";\n\n' +
        'if (process.env.NODE_ENV === "development") {\n' +
        '  connectAuthEmulator(auth, "http://localhost:9099");\n' +
        '  connectFirestoreEmulator(db, "localhost", 8080);\n' +
        '}'}</code></pre>

      {/* Comparison Table */}
      <h2 style={h2Style}>{isZh ? 'Firebase vs 替代方案' : 'Firebase vs Alternatives'}</h2>
      <p style={pStyle}>
        {isZh
          ? '以下是 Firebase 与其他热门 BaaS 平台的对比：'
          : 'Here is how Firebase compares with other popular BaaS platforms:'}
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
            <th style={thStyle}>Firebase</th>
            <th style={thStyle}>Supabase</th>
            <th style={thStyle}>PocketBase</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '数据库' : 'Database'}</td><td style={tdStyle}>Firestore (NoSQL)</td><td style={tdStyle}>PostgreSQL</td><td style={tdStyle}>SQLite</td></tr>
          <tr><td style={tdStyle}>{isZh ? '托管' : 'Hosting'}</td><td style={tdStyle}>Google Cloud</td><td style={tdStyle}>{isZh ? '云 / 自托管' : 'Cloud / Self-host'}</td><td style={tdStyle}>{isZh ? '自托管' : 'Self-hosted'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '实时' : 'Realtime'}</td><td style={tdStyle}>{isZh ? '内置' : 'Built-in'}</td><td style={tdStyle}>{isZh ? '内置' : 'Built-in'}</td><td style={tdStyle}>SSE</td></tr>
          <tr><td style={tdStyle}>{isZh ? '认证' : 'Auth'}</td><td style={tdStyle}>{isZh ? '多提供商' : 'Multi-provider'}</td><td style={tdStyle}>{isZh ? '多提供商' : 'Multi-provider'}</td><td style={tdStyle}>{isZh ? '邮箱 + OAuth' : 'Email + OAuth'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '函数' : 'Functions'}</td><td style={tdStyle}>Cloud Functions</td><td style={tdStyle}>Edge Functions</td><td style={tdStyle}>Go / JS hooks</td></tr>
          <tr><td style={tdStyle}>{isZh ? '开源' : 'Open Source'}</td><td style={tdStyle}>{isZh ? '否' : 'No'}</td><td style={tdStyle}>{isZh ? '是' : 'Yes'}</td><td style={tdStyle}>{isZh ? '是' : 'Yes'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '免费额度' : 'Free Tier'}</td><td style={tdStyle}>{isZh ? '慷慨' : 'Generous'}</td><td style={tdStyle}>{isZh ? '慷慨' : 'Generous'}</td><td style={tdStyle}>{isZh ? '完全免费' : 'Fully free'}</td></tr>
        </tbody>
      </table>

      {/* FAQ */}
      <h2 style={h2Style}>{isZh ? '常见问题' : 'Frequently Asked Questions'}</h2>

      <h3 style={h3Style}>{isZh ? 'Firebase 包含哪些服务？' : 'What services does Firebase include?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Firebase 包含 Authentication、Firestore、Realtime Database、Cloud Storage、Cloud Functions、Hosting、Analytics、Performance Monitoring、Crashlytics、Remote Config、Cloud Messaging 和 App Check 等超过 18 个服务。'
          : 'Firebase includes Authentication, Firestore, Realtime Database, Cloud Storage, Cloud Functions, Hosting, Analytics, Performance Monitoring, Crashlytics, Remote Config, Cloud Messaging, App Check, and over 18 services total.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Firestore 和 Realtime Database 有什么区别？' : 'What is the difference between Firestore and Realtime Database?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Firestore 是基于文档的 NoSQL 数据库，支持复杂查询和离线同步。Realtime Database 是 JSON 树结构，延迟更低但查询能力有限。新项目推荐 Firestore。'
          : 'Firestore is a document-based NoSQL database with complex queries and offline sync. Realtime Database is a JSON tree with lower latency but limited querying. Firestore is recommended for new projects.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Firebase 免费吗？' : 'Is Firebase free to use?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Spark 计划免费，含 1 GiB Firestore 存储、每天 50K 读取、5 GB Cloud Storage 和无限 Analytics。Blaze 计划按需付费，超出免费额度后才收费。'
          : 'The Spark plan is free with 1 GiB Firestore storage, 50K reads per day, 5 GB Cloud Storage, and unlimited Analytics. The Blaze plan is pay-as-you-go, charging only beyond free allowances.'}
      </p>

      <h3 style={h3Style}>{isZh ? '如何设置认证？' : 'How do I set up Authentication?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '在控制台启用认证提供商，安装 SDK，用 createUserWithEmailAndPassword 或 signInWithPopup 等方法。Firebase 自动处理令牌管理和会话。'
          : 'Enable providers in the Console, install the SDK, and use createUserWithEmailAndPassword or signInWithPopup. Firebase handles token management and sessions automatically.'}
      </p>

      <h3 style={h3Style}>{isZh ? '安全规则如何工作？' : 'How do security rules work?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '安全规则在服务器端执行，用 match 语法定义路径和条件，检查 request.auth 验证身份，用 request.resource.data 验证数据。规则不可被客户端绕过。'
          : 'Rules execute server-side using match syntax for paths and conditions. Check request.auth for identity and request.resource.data for validation. Rules cannot be bypassed from client SDKs.'}
      </p>

      <h3 style={h3Style}>{isZh ? '可以与 React/Next.js 一起使用吗？' : 'Can I use Firebase with React and Next.js?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '可以。React 中用客户端 SDK 配合 hooks 管理状态。Next.js 中 Server Components 用 Admin SDK，Client Components 用客户端 SDK。'
          : 'Yes. In React, use the client SDK with hooks. In Next.js, use the Admin SDK in Server Components and API Routes, and the client SDK in Client Components for real-time features.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Cloud Functions 什么时候用？' : 'When should I use Cloud Functions?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '用于发送通知、处理支付、数据聚合、定时任务和第三方 API 集成等服务器端逻辑。'
          : 'Use them for server-side logic like notifications, payment processing, data aggregation, scheduled tasks, and third-party API integrations.'}
      </p>

      <h3 style={h3Style}>{isZh ? '如何部署到生产环境？' : 'How do I deploy to production?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '用 Firebase CLI：firebase init 设置项目，firebase deploy 部署。用 --only hosting 或 --only functions 部署特定服务。Hosting 提供免费 SSL 和全球 CDN。'
          : 'Use the Firebase CLI: firebase init to set up, firebase deploy to deploy. Use --only hosting or --only functions for specific services. Hosting provides free SSL and global CDN.'}
      </p>

      {/* Conclusion */}
      <h2 style={h2Style}>{isZh ? '总结' : 'Conclusion'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Firebase 是构建全栈应用最快捷的方式之一。它消除了管理服务器基础设施的负担，让你专注于产品开发。从认证到数据库、存储到托管，Firebase 提供了构建现代应用所需的全部后端服务。免费的 Spark 计划对原型开发和小型应用足够慷慨，而 Blaze 计划的按需付费模式确保你只为实际使用付费。无论你是构建个人项目还是企业应用，Firebase 都是一个值得考虑的强大平台。'
          : 'Firebase is one of the fastest ways to build full-stack applications. It eliminates the burden of managing server infrastructure so you can focus on product development. From authentication to database, storage to hosting, Firebase provides all the backend services needed for modern applications. The free Spark plan is generous enough for prototypes and small apps, while the Blaze plan\'s pay-as-you-go model ensures you only pay for what you use. Whether you are building a personal project or an enterprise application, Firebase is a powerful platform worth considering.'}
      </p>
    </article>
  );
}
