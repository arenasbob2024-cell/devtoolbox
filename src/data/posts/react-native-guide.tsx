'use client';

const translations = {
  en: {
    title: 'React Native Complete Guide 2026: Build Cross-Platform Apps with JavaScript',
    description: 'Master React Native from setup to production. Learn core components, navigation, state management, native APIs, styling, and performance optimization for iOS and Android apps.',
    tldr: 'React Native lets you build native iOS and Android apps with JavaScript and React. Share up to 90% of code across platforms while accessing true native components. Use Expo for fast prototyping or bare workflow for full native control. React Navigation handles routing; Zustand or Context handles state. The New Architecture (JSI + Fabric) brings significant performance improvements in 2026.',
  },
  zh: {
    title: 'React Native 完整指南 2026：用 JavaScript 构建跨平台应用',
    description: '从安装到生产全面掌握 React Native。学习核心组件、导航、状态管理、原生 API、样式和性能优化。',
    tldr: 'React Native 让你用 JavaScript 和 React 构建原生 iOS 和 Android 应用。两端代码复用率可达 90%，同时使用真正的原生组件。用 Expo 快速原型开发，或用裸工作流获得完全的原生控制。React Navigation 处理路由；Zustand 或 Context 处理状态。新架构（JSI + Fabric）在 2026 年带来了显著的性能提升。',
  },
};

const codeStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  borderRadius: 8,
  padding: 16,
  overflowX: 'auto',
  fontSize: 13,
  lineHeight: 1.7,
  fontFamily: 'monospace',
  color: 'var(--text-primary)',
  border: '1px solid var(--border-color)',
  margin: '12px 0',
};

const h2Style: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  marginTop: 40,
  marginBottom: 16,
  color: 'var(--text-primary)',
};

const h3Style: React.CSSProperties = {
  fontSize: 17,
  fontWeight: 700,
  marginTop: 24,
  marginBottom: 10,
  color: 'var(--text-primary)',
};

const pStyle: React.CSSProperties = {
  color: 'var(--text-secondary)',
  lineHeight: 1.8,
  marginBottom: 12,
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 14,
  margin: '16px 0',
  overflowX: 'auto',
  display: 'block',
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  borderBottom: '2px solid var(--border-color)',
  fontWeight: 700,
  color: 'var(--text-primary)',
  background: 'var(--bg-input)',
  whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderBottom: '1px solid var(--border-color)',
  color: 'var(--text-secondary)',
  verticalAlign: 'top',
};

const tdGreenStyle: React.CSSProperties = {
  ...tdStyle,
  color: '#16a34a',
  fontWeight: 600,
};

const tdRedStyle: React.CSSProperties = {
  ...tdStyle,
  color: '#dc2626',
};

const liStyle: React.CSSProperties = {
  color: 'var(--text-secondary)',
  lineHeight: 1.8,
  marginBottom: 6,
};

export default function ReactNativeGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is React Native New Architecture and should I use it in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The New Architecture replaces the old bridge with JSI (JavaScript Interface) for synchronous native calls, and Fabric for the new rendering system. It is stable in React Native 0.74+ and enabled by default in new projects. You should migrate existing projects to the New Architecture for significant performance gains, especially in animations and native module interactions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use Expo or bare React Native?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use Expo (managed workflow) for most projects — it handles certificates, build servers, OTA updates, and 50+ pre-built native modules. Use bare React Native or Expo bare workflow when you need to write custom native code in Swift/Kotlin or integrate third-party SDKs not supported by Expo. Expo Go lets you test on real devices instantly without a Mac.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use TypeScript with React Native?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, TypeScript is fully supported and recommended. New React Native projects created with npx react-native init or create-expo-app include TypeScript by default. You get full type safety for props, navigation params, API responses, and StyleSheet definitions. The React Native community types (@types/react-native) are well-maintained.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I debug React Native apps?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use Flipper for network inspection, layout debugging, and performance profiling. React DevTools works for component tree inspection. Metro Bundler provides fast refresh. For native crashes, use Xcode for iOS and Android Studio for Android. Expo Go includes a built-in developer menu with reload, inspector, and performance monitor.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I navigate between screens in React Native?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'React Navigation is the standard library. Install @react-navigation/native plus a navigator (stack, bottom-tabs, drawer). Wrap your app in NavigationContainer. Use createNativeStackNavigator for stack navigation, createBottomTabNavigator for tabs. Access navigation with the useNavigation hook and read route params with useRoute.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Expo Router and how does it differ from React Navigation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Expo Router is a file-based routing system built on top of React Navigation (similar to Next.js). Files in the app/ directory automatically become routes. It supports deep linking, shared routes, and typed routes out of the box. React Navigation gives more programmatic control. Expo Router is recommended for new Expo projects as of SDK 50+.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I handle state management in React Native?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For local state use useState and useReducer. For shared state use React Context (small apps) or Zustand (medium-large apps). Redux Toolkit is also popular for large teams. Zustand is lightweight, has no boilerplate, works great with React Native, and supports AsyncStorage persistence via zustand/middleware. Avoid prop drilling by lifting state or using a state manager early.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I deploy a React Native app to the App Store and Google Play?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'With Expo, use EAS Build (eas build --platform ios/android) to create production binaries in the cloud, then EAS Submit to upload directly to stores. For bare React Native, build with Xcode (iOS) or Gradle (Android), then submit manually. You need an Apple Developer account ($99/year) for iOS and a Google Play Console account ($25 one-time) for Android.',
        },
      },
    ],
  };

  return (
    <article style={{ maxWidth: 820, margin: '0 auto', lineHeight: 1.8 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '0 8px 8px 0',
          padding: '16px 20px',
          marginBottom: 28,
        }}
      >
        <p style={{ margin: 0, fontWeight: 700, color: '#0369a1', marginBottom: 6 }}>TL;DR</p>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: 1.7, fontSize: 15 }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 8,
          padding: '16px 20px',
          marginBottom: 32,
        }}
      >
        <p style={{ margin: 0, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
          Key Takeaways
        </p>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li style={liStyle}>React Native renders <strong>true native components</strong>, not WebViews — resulting in near-native performance</li>
          <li style={liStyle}><strong>Expo SDK 52+</strong> is the recommended starting point for most projects in 2026</li>
          <li style={liStyle}><strong>New Architecture (JSI + Fabric)</strong> is enabled by default and eliminates bridge bottlenecks</li>
          <li style={liStyle}><strong>FlatList</strong> is preferred over ScrollView for long lists; always set <code>keyExtractor</code></li>
          <li style={liStyle}><strong>React Navigation 7</strong> supports typed routes and deep linking with minimal configuration</li>
          <li style={liStyle}><strong>Hermes</strong> JavaScript engine is the default and dramatically improves startup time and memory</li>
          <li style={liStyle}><strong>EAS Build</strong> replaces manual Xcode/Gradle builds for Expo users</li>
        </ul>
      </div>

      {/* Section 1 */}
      <h2 style={h2Style}>1. What Is React Native?</h2>
      <p style={pStyle}>
        <strong>React Native</strong> is an open-source framework created by Meta that lets you build mobile applications for iOS and Android using JavaScript and React. Unlike hybrid frameworks that wrap a WebView, React Native translates your JavaScript components into <strong>actual native UI elements</strong> — the same ones used by apps written in Swift, Objective-C, Kotlin, or Java.
      </p>
      <p style={pStyle}>
        When you write <code>&lt;View&gt;</code> in React Native, it becomes a <code>UIView</code> on iOS and an <code>android.view.View</code> on Android. This is the fundamental difference from Ionic or Cordova, which render HTML inside a WebView. The result is a look, feel, and performance that matches platform conventions.
      </p>

      <h3 style={h3Style}>Native Components vs WebView</h3>
      <p style={pStyle}>
        React Native maps each component to its native counterpart at the platform level. The JavaScript code runs on a separate JS thread, communicates with the native layer, and instructs it to render. With the <strong>New Architecture</strong>, this communication uses JSI (JavaScript Interface) — a C++ binding that enables direct synchronous calls, eliminating the old asynchronous message bridge that was a known bottleneck.
      </p>

      <h3 style={h3Style}>The New Architecture (2024–2026)</h3>
      <p style={pStyle}>
        React Native&apos;s New Architecture consists of three main pillars:
      </p>
      <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
        <li style={liStyle}><strong>JSI (JavaScript Interface)</strong> — replaces the old bridge; allows JS to hold direct references to native objects and call native methods synchronously</li>
        <li style={liStyle}><strong>Fabric</strong> — a re-implementation of the UI rendering layer; React&apos;s reconciler runs on native threads, enabling synchronous layout and concurrent features</li>
        <li style={liStyle}><strong>TurboModules</strong> — lazy-loaded native modules that are initialized only when first used, reducing startup time</li>
      </ul>
      <p style={pStyle}>
        As of React Native 0.74+, the New Architecture is enabled by default for new projects. Existing projects should migrate using the official migration guide.
      </p>
      <pre style={codeStyle}><code>{`// Check your React Native version and New Architecture status
// In react-native.config.js or package.json

// package.json
{
  "dependencies": {
    "react-native": "0.76.5",   // New Architecture default in 0.74+
    "react": "18.3.1"
  }
}

// android/gradle.properties — enable New Architecture
newArchEnabled=true

// iOS: set in Podfile
# Enable New Architecture (default true for new projects)
ENV['RCT_NEW_ARCH_ENABLED'] = '1'`}</code></pre>

      {/* Section 2 */}
      <h2 style={h2Style}>2. Core Components</h2>
      <p style={pStyle}>
        React Native ships with a set of built-in components that map to native platform UI elements. These are the building blocks every React Native developer must know.
      </p>

      <h3 style={h3Style}>View and Text</h3>
      <p style={pStyle}>
        <code>View</code> is the fundamental building block, equivalent to <code>&lt;div&gt;</code> in web development. <code>Text</code> is the only way to render text — you cannot place raw strings directly inside a <code>View</code>.
      </p>
      <pre style={codeStyle}><code>{`import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Card({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,       // Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});`}</code></pre>

      <h3 style={h3Style}>Image and ScrollView</h3>
      <pre style={codeStyle}><code>{`import { Image, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Local image (bundled with app)
<Image source={require('./assets/logo.png')} style={{ width: 100, height: 100 }} />

// Remote image — requires explicit width/height
<Image
  source={{ uri: 'https://example.com/photo.jpg' }}
  style={{ width: width - 32, height: 200, borderRadius: 8 }}
  resizeMode="cover"
/>

// ScrollView — good for small lists or mixed content
// WARNING: renders all children at once; use FlatList for long lists
<ScrollView
  contentContainerStyle={{ padding: 16 }}
  showsVerticalScrollIndicator={false}
  keyboardShouldPersistTaps="handled"
>
  {items.map(item => <Card key={item.id} {...item} />)}
</ScrollView>`}</code></pre>

      <h3 style={h3Style}>FlatList — Virtualized Lists</h3>
      <p style={pStyle}>
        <code>FlatList</code> is the go-to component for long data sets. It only renders items currently visible on screen (windowing), dramatically reducing memory usage and improving scroll performance.
      </p>
      <pre style={codeStyle}><code>{`import { FlatList, View, Text, StyleSheet } from 'react-native';

type User = { id: string; name: string; email: string };

export default function UserList({ users }: { users: User[] }) {
  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.row}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}       // Stable unique key
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={<Text>No users found</Text>}
      ListHeaderComponent={<Text style={styles.header}>Team Members</Text>}
      getItemLayout={(_, index) => ({         // Optimization: skip layout calculation
        length: 72,
        offset: 72 * index,
        index,
      })}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}           // Android: recycle off-screen views
    />
  );
}

const styles = StyleSheet.create({
  row: { padding: 16, backgroundColor: '#fff' },
  name: { fontSize: 16, fontWeight: '600' },
  email: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  separator: { height: 1, backgroundColor: '#f3f4f6' },
  header: { fontSize: 20, fontWeight: '700', padding: 16 },
});`}</code></pre>

      <h3 style={h3Style}>TouchableOpacity and Pressable</h3>
      <pre style={codeStyle}><code>{`import { TouchableOpacity, Pressable, Text } from 'react-native';

// TouchableOpacity — reduces opacity on press (classic approach)
<TouchableOpacity
  onPress={() => console.log('pressed')}
  activeOpacity={0.7}
  style={{ padding: 12, backgroundColor: '#3b82f6', borderRadius: 8 }}
>
  <Text style={{ color: '#fff', fontWeight: '600' }}>Submit</Text>
</TouchableOpacity>

// Pressable — more flexible, supports pressed state styling (recommended)
<Pressable
  onPress={handlePress}
  onLongPress={handleLongPress}
  style={({ pressed }) => ({
    padding: 12,
    backgroundColor: pressed ? '#2563eb' : '#3b82f6',
    borderRadius: 8,
    transform: [{ scale: pressed ? 0.97 : 1 }],
  })}
>
  {({ pressed }) => (
    <Text style={{ color: pressed ? '#e0f2fe' : '#fff', fontWeight: '600' }}>
      {pressed ? 'Submitting...' : 'Submit'}
    </Text>
  )}
</Pressable>`}</code></pre>

      {/* Section 3 */}
      <h2 style={h2Style}>3. Expo vs Bare React Native</h2>
      <p style={pStyle}>
        One of the first decisions you&apos;ll make is whether to use <strong>Expo</strong> or plain React Native. Both are valid choices with different trade-offs.
      </p>

      <h3 style={h3Style}>Expo Managed Workflow</h3>
      <p style={pStyle}>
        Expo abstracts away iOS and Android native build tooling. You write JavaScript/TypeScript and Expo handles the rest: code signing, certificates, build servers, OTA updates, and 50+ built-in modules (camera, notifications, location, sensors, etc.). You do not need a Mac to build iOS apps — EAS Build runs Xcode on Expo&apos;s cloud infrastructure.
      </p>
      <pre style={codeStyle}><code>{`# Create a new Expo project (recommended for most developers)
npx create-expo-app MyApp --template blank-typescript
cd MyApp

# Start development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android

# Install Expo modules
npx expo install expo-camera expo-location expo-notifications

# Build for production with EAS
npx eas build --platform ios --profile production
npx eas build --platform android --profile production

# Submit to stores
npx eas submit --platform ios
npx eas submit --platform android`}</code></pre>

      <h3 style={h3Style}>Bare React Native Workflow</h3>
      <p style={pStyle}>
        The bare workflow gives you full access to the native <code>ios/</code> and <code>android/</code> project directories. You can write native modules in Swift and Kotlin, integrate any third-party SDK, and have complete control over every build setting. The trade-off is more complexity and the need for Xcode on macOS for iOS builds.
      </p>
      <pre style={codeStyle}><code>{`# Create bare React Native project
npx react-native@latest init MyApp --template react-native-template-typescript
cd MyApp

# iOS (requires macOS + Xcode)
cd ios && pod install && cd ..
npx react-native run-ios

# Android (requires Android Studio + SDK)
npx react-native run-android

# Expo bare workflow — starts managed, ejects to bare
npx create-expo-app MyApp
cd MyApp
npx expo prebuild          # Generates ios/ and android/ directories
npx expo run:ios
npx expo run:android`}</code></pre>

      <h3 style={h3Style}>When to Use Each</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Scenario</th>
              <th style={thStyle}>Recommended</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>New project, standard features</td>
              <td style={tdGreenStyle}>Expo Managed</td>
            </tr>
            <tr>
              <td style={tdStyle}>Need custom native code (Swift/Kotlin)</td>
              <td style={tdStyle}>Bare / Expo Bare</td>
            </tr>
            <tr>
              <td style={tdStyle}>No Mac available, build iOS</td>
              <td style={tdGreenStyle}>Expo EAS Build</td>
            </tr>
            <tr>
              <td style={tdStyle}>OTA updates without App Store review</td>
              <td style={tdGreenStyle}>Expo EAS Update</td>
            </tr>
            <tr>
              <td style={tdStyle}>Integrating legacy native SDKs</td>
              <td style={tdStyle}>Bare React Native</td>
            </tr>
            <tr>
              <td style={tdStyle}>File-based routing (like Next.js)</td>
              <td style={tdGreenStyle}>Expo Router (SDK 50+)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 4 */}
      <h2 style={h2Style}>4. Navigation with React Navigation</h2>
      <p style={pStyle}>
        <strong>React Navigation</strong> is the de facto standard for navigation in React Native. It provides Stack, Tab, Drawer navigators and supports deep linking, typed routes, and animations that feel native on both platforms.
      </p>

      <h3 style={h3Style}>Installation and Setup</h3>
      <pre style={codeStyle}><code>{`# Core library + native dependencies
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context

# Stack Navigator (most common)
npm install @react-navigation/native-stack

# Bottom Tab Navigator
npm install @react-navigation/bottom-tabs

# Drawer Navigator
npm install @react-navigation/drawer
npx expo install react-native-gesture-handler react-native-reanimated`}</code></pre>

      <h3 style={h3Style}>Stack Navigation</h3>
      <pre style={codeStyle}><code>{`import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';

// Define your param types for TypeScript
type RootStackParamList = {
  Home: undefined;
  UserDetail: { userId: string; userName: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// App entry point
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#3b82f6' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={({ route }) => ({ title: route.params.userName })}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Navigate from a screen
function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('UserDetail', {
          userId: 'user_123',
          userName: 'Alice Johnson',
        })
      }
    >
      <Text>Go to User Detail</Text>
    </Pressable>
  );
}

// Read params in the target screen
function UserDetailScreen() {
  const route = useRoute();
  const { userId, userName } = route.params as { userId: string; userName: string };

  return <Text>Viewing profile: {userName} ({userId})</Text>;
}`}</code></pre>

      <h3 style={h3Style}>Tab and Drawer Navigators</h3>
      <pre style={codeStyle}><code>{`import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName =
            route.name === 'Feed' ? 'home' :
            route.name === 'Search' ? 'search' :
            route.name === 'Profile' ? 'person' : 'ellipsis-horizontal';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: { paddingBottom: 4 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Drawer navigator
const Drawer = createDrawerNavigator();

function RootDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: '#3b82f6',
        drawerStyle: { backgroundColor: '#f9fafb' },
      }}
    >
      <Drawer.Screen name="Home" component={MainTabs} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
    </Drawer.Navigator>
  );
}`}</code></pre>

      {/* Section 5 */}
      <h2 style={h2Style}>5. State Management</h2>
      <p style={pStyle}>
        React Native uses the same state management patterns as React web applications. Choose the right tool based on your app&apos;s complexity.
      </p>

      <h3 style={h3Style}>useState and useReducer (Local State)</h3>
      <pre style={codeStyle}><code>{`import React, { useState, useReducer } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';

// useState — simple values
function SearchBar() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    await performSearch(query);
    setIsLoading(false);
  };

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search..."
        style={{ flex: 1, borderWidth: 1, borderRadius: 8, padding: 10 }}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <Pressable onPress={handleSearch} style={{ padding: 10, backgroundColor: '#3b82f6', borderRadius: 8 }}>
        <Text style={{ color: '#fff' }}>{isLoading ? '...' : 'Go'}</Text>
      </Pressable>
    </View>
  );
}

// useReducer — complex state machines
type CartState = { items: CartItem[]; total: number };
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };
    case 'REMOVE_ITEM':
      const removed = state.items.find(i => i.id === action.payload);
      return {
        items: state.items.filter(i => i.id !== action.payload),
        total: state.total - (removed?.price ?? 0),
      };
    case 'CLEAR':
      return { items: [], total: 0 };
    default:
      return state;
  }
}

function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <View>
      <Text>Total: \${cart.total.toFixed(2)}</Text>
      <Pressable onPress={() => dispatch({ type: 'CLEAR' })}>
        <Text>Clear Cart</Text>
      </Pressable>
    </View>
  );
}`}</code></pre>

      <h3 style={h3Style}>Zustand for Global State (Recommended)</h3>
      <p style={pStyle}>
        Zustand is a lightweight, hooks-based state manager that works exceptionally well with React Native. It has zero boilerplate, supports persistence with AsyncStorage, and does not require a Provider wrapper.
      </p>
      <pre style={codeStyle}><code>{`import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define store interface
interface AuthStore {
  user: { id: string; name: string; token: string } | null;
  isAuthenticated: boolean;
  login: (user: { id: string; name: string; token: string }) => void;
  logout: () => void;
}

// Create persisted store — survives app restarts
const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Use in any component — no Provider needed
function ProfileScreen() {
  const { user, logout, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <LoginScreen />;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Welcome, {user?.name}</Text>
      <Pressable onPress={logout} style={{ marginTop: 20, padding: 12, backgroundColor: '#ef4444', borderRadius: 8 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Sign Out</Text>
      </Pressable>
    </View>
  );
}`}</code></pre>

      {/* Section 6 */}
      <h2 style={h2Style}>6. Native APIs</h2>
      <p style={pStyle}>
        React Native and Expo provide access to device hardware and OS capabilities. Here are the most commonly used native APIs.
      </p>

      <h3 style={h3Style}>Camera</h3>
      <pre style={codeStyle}><code>{`import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Camera access is required to take photos</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setFacing(f => f === 'back' ? 'front' : 'back')}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  camera: { flex: 1 },
  buttonContainer: { flex: 1, flexDirection: 'row', backgroundColor: 'transparent', margin: 64 },
  message: { textAlign: 'center', paddingBottom: 10 },
  text: { fontSize: 24, fontWeight: 'bold', color: 'white' },
});`}</code></pre>

      <h3 style={h3Style}>Location Services</h3>
      <pre style={codeStyle}><code>{`import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

type Coords = { latitude: number; longitude: number };

export function useCurrentLocation() {
  const [location, setLocation] = useState<Coords | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  return { location, error };
}

// Watch location changes in real time
export function useLocationTracking() {
  const [locations, setLocations] = useState<Coords[]>([]);

  useEffect(() => {
    let sub: Location.LocationSubscription;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
        (loc) => setLocations(prev => [...prev, { latitude: loc.coords.latitude, longitude: loc.coords.longitude }])
      );
    })();

    return () => sub?.remove();
  }, []);

  return locations;
}`}</code></pre>

      <h3 style={h3Style}>Push Notifications</h3>
      <pre style={codeStyle}><code>{`import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotifications(): Promise<string | null> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return null;

  const token = await Notifications.getExpoPushTokenAsync({
    projectId: 'your-project-id',  // From app.json extra.eas.projectId
  });

  return token.data;
}

// Send a local notification (useful for reminders)
export async function scheduleLocalNotification(
  title: string,
  body: string,
  trigger: Notifications.NotificationTriggerInput
) {
  return Notifications.scheduleNotificationAsync({
    content: { title, body, sound: 'default' },
    trigger,
  });
}

// Listen to notification events
export function useNotificationListener(onReceive: (n: Notifications.Notification) => void) {
  const listenerRef = useRef<Notifications.Subscription>();

  useEffect(() => {
    listenerRef.current = Notifications.addNotificationReceivedListener(onReceive);
    return () => listenerRef.current?.remove();
  }, [onReceive]);
}`}</code></pre>

      <h3 style={h3Style}>AsyncStorage and SecureStore</h3>
      <pre style={codeStyle}><code>{`import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

// AsyncStorage — unencrypted key-value storage (good for preferences/cache)
const storeData = async (key: string, value: unknown) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

const getData = async <T>(key: string): Promise<T | null> => {
  const item = await AsyncStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const removeData = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

// SecureStore — encrypted storage backed by Keychain (iOS) / Keystore (Android)
// Use this for tokens, passwords, sensitive user data
const storeToken = async (token: string) => {
  await SecureStore.setItemAsync('auth_token', token);
};

const getToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync('auth_token');
};

const deleteToken = async () => {
  await SecureStore.deleteItemAsync('auth_token');
};`}</code></pre>

      {/* Section 7 */}
      <h2 style={h2Style}>7. Styling in React Native</h2>
      <p style={pStyle}>
        React Native does not use CSS. Instead, styles are JavaScript objects created with <code>StyleSheet.create()</code>. The styling system is inspired by CSS but uses <strong>camelCase</strong> property names, and all dimensions are in density-independent pixels (dp) by default.
      </p>

      <h3 style={h3Style}>StyleSheet API</h3>
      <pre style={codeStyle}><code>{`import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Flexbox is the default layout system
  container: {
    flex: 1,
    flexDirection: 'column',   // 'row' | 'column' (default is column, unlike CSS!)
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
  },

  // Text styles
  heading: {
    fontSize: 24,
    fontWeight: '700',         // '100' - '900' or 'bold' | 'normal'
    letterSpacing: 0.5,
    lineHeight: 32,
    color: '#111827',
  },

  // Borders
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    padding: 16,
    // Shorthand: no 'border: 1px solid ...' in RN
    // Shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    // Shadow (Android)
    elevation: 4,
  },

  // Responsive with Dimensions
  image: {
    width: width - 32,          // Full width minus margins
    height: (width - 32) * 0.5625, // 16:9 ratio
    borderRadius: 8,
  },

  // Platform-specific styles
  platformText: {
    ...Platform.select({
      ios: { fontFamily: 'San Francisco', fontSize: 15 },
      android: { fontFamily: 'Roboto', fontSize: 15 },
      default: { fontSize: 15 },
    }),
  },
});`}</code></pre>

      <h3 style={h3Style}>Platform-Specific Code</h3>
      <pre style={codeStyle}><code>{`import { Platform } from 'react-native';

// Inline platform check
const shadowStyle = Platform.OS === 'ios'
  ? { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }
  : { elevation: 4 };

// Platform.select
const statusBarHeight = Platform.select({ ios: 44, android: 0, default: 0 });

// Platform-specific files (automatic selection by Metro bundler)
// Button.ios.tsx   — loaded on iOS
// Button.android.tsx — loaded on Android
// Button.tsx       — fallback for both

// Safe area handling
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function ScreenWithSafeArea() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {/* Content is never hidden behind notch or home indicator */}
    </View>
  );
}`}</code></pre>

      {/* Section 8 */}
      <h2 style={h2Style}>8. Performance Optimization</h2>
      <p style={pStyle}>
        React Native performance hinges on minimizing JavaScript thread work and re-renders, optimizing list rendering, and leveraging the native thread for animations.
      </p>

      <h3 style={h3Style}>React.memo and useMemo</h3>
      <pre style={codeStyle}><code>{`import React, { memo, useMemo, useCallback } from 'react';

// React.memo — prevent re-render if props haven't changed
const ProductCard = memo(function ProductCard({ id, name, price, onPress }: ProductCardProps) {
  return (
    <Pressable onPress={() => onPress(id)}>
      <Text>{name}</Text>
      <Text>\${price.toFixed(2)}</Text>
    </Pressable>
  );
});

// useMemo — expensive computation
function ProductList({ products, minPrice }: ProductListProps) {
  // Only re-computes when products or minPrice changes
  const filteredProducts = useMemo(
    () => products.filter(p => p.price >= minPrice).sort((a, b) => a.price - b.price),
    [products, minPrice]
  );

  // useCallback — stable reference for callbacks passed to memoized components
  const handlePress = useCallback((id: string) => {
    navigation.navigate('ProductDetail', { productId: id });
  }, [navigation]);

  return (
    <FlatList
      data={filteredProducts}
      renderItem={({ item }) => <ProductCard {...item} onPress={handlePress} />}
      keyExtractor={item => item.id}
    />
  );
}`}</code></pre>

      <h3 style={h3Style}>Hermes JavaScript Engine</h3>
      <p style={pStyle}>
        <strong>Hermes</strong> is a JavaScript engine optimized for React Native, open-sourced by Meta. It uses ahead-of-time (AOT) bytecode compilation, which significantly reduces app startup time (sometimes by 50%), lowers memory consumption, and improves battery usage. Hermes is the default engine in React Native 0.70+ and all new Expo projects.
      </p>
      <pre style={codeStyle}><code>{`// android/app/build.gradle — Hermes enabled by default
android {
    defaultConfig {
        // Hermes is enabled via build.gradle in RN 0.70+
    }
}

// Check if Hermes is running at runtime
const isHermes = () => !!global.HermesInternal;
console.log('Hermes engine:', isHermes()); // true in production builds

// iOS: enabled in Podfile (default true for new projects)
# In ios/Podfile:
# :hermes_enabled => true

// Verify Hermes in Metro logs:
// "Hermes is enabled" appears in the Metro bundler output`}</code></pre>

      <h3 style={h3Style}>Animation with Reanimated 3</h3>
      <pre style={codeStyle}><code>{`import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

// Reanimated runs animations on the UI thread — no bridge involved
function AnimatedCard() {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const tap = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.95);
      opacity.value = withTiming(0.8, { duration: 150 });
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
      opacity.value = withTiming(1, { duration: 150 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text>Tap me!</Text>
      </Animated.View>
    </GestureDetector>
  );
}`}</code></pre>

      <h3 style={h3Style}>Debugging with Flipper</h3>
      <pre style={codeStyle}><code>{`# Flipper — desktop debugging tool for React Native
# Available at https://fbflipper.com/

# Features:
# - Network Inspector: view all HTTP/WebSocket requests
# - React DevTools: inspect component tree and props
# - Layout Inspector: visualize the view hierarchy
# - Performance Monitor: JS/UI frame rate graphs
# - Hermes Debugger: breakpoints, profiling, memory snapshots
# - Redux DevTools via flipper-plugin-redux-debugger

# Install Flipper debug client in your app (dev builds only):
# iOS: automatically connected when running in debug mode
# Android: enable USB debugging and connect via ADB

# In development, shake the device or press Cmd+D (iOS Simulator)
# to open the developer menu with:
# - Reload JS
# - Performance Monitor
# - Element Inspector
# - Toggle Remote JS Debugging

# For Expo:
npx expo start --dev-client   # Full Flipper support with dev client`}</code></pre>

      {/* Section 9 — Comparison Table */}
      <h2 style={h2Style}>9. React Native vs Flutter vs Ionic vs Expo</h2>
      <p style={pStyle}>
        Choosing a cross-platform framework is one of the most important architectural decisions. Here is a comprehensive comparison of the leading options in 2026.
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ ...tableStyle, display: 'table' }}>
          <thead>
            <tr>
              <th style={thStyle}>Feature</th>
              <th style={thStyle}>React Native</th>
              <th style={thStyle}>Flutter</th>
              <th style={thStyle}>Ionic</th>
              <th style={thStyle}>Expo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text-primary)' }}>Language</td>
              <td style={tdStyle}>JavaScript / TypeScript</td>
              <td style={tdStyle}>Dart</td>
              <td style={tdStyle}>HTML / CSS / JS</td>
              <td style={tdStyle}>JavaScript / TypeScript</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text-primary)' }}>Rendering</td>
              <td style={tdStyle}>Native components (JSI + Fabric)</td>
              <td style={tdStyle}>Custom renderer (Skia)</td>
              <td style={tdStyle}>WebView (Capacitor)</td>
              <td style={tdStyle}>Native via React Native</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text-primary)' }}>Performance</td>
              <td style={tdGreenStyle}>Excellent (New Arch)</td>
              <td style={tdGreenStyle}>Excellent</td>
              <td style={tdRedStyle}>Good (WebView limited)</td>
              <td style={tdGreenStyle}>Excellent</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text-primary)' }}>Code Sharing</td>
              <td style={tdStyle}>iOS + Android + Web (RNW)</td>
              <td style={tdStyle}>iOS + Android + Web + Desktop</td>
              <td style={tdStyle}>iOS + Android + Web</td>
              <td style={tdStyle}>iOS + Android + Web (EAS)</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text-primary)' }}>Learning Curve</td>
              <td style={tdGreenStyle}>Low (if you know React)</td>
              <td style={tdStyle}>Medium (new language)</td>
              <td style={tdGreenStyle}>Low (web skills)</td>
              <td style={tdGreenStyle}>Very Low</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text-primary)' }}>Ecosystem</td>
              <td style={tdGreenStyle}>Very large (npm)</td>
              <td style={tdStyle}>Growing (pub.dev)</td>
              <td style={tdStyle}>Large (npm)</td>
              <td style={tdGreenStyle}>Large (Expo SDK)</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text-primary)' }}>Hot Reload</td>
              <td style={tdGreenStyle}>Fast Refresh</td>
              <td style={tdGreenStyle}>Hot Reload + Hot Restart</td>
              <td style={tdGreenStyle}>Live Reload</td>
              <td style={tdGreenStyle}>Fast Refresh + OTA</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text-primary)' }}>Native Modules</td>
              <td style={tdGreenStyle}>Full (Swift / Kotlin)</td>
              <td style={tdGreenStyle}>Full (Platform Channels)</td>
              <td style={tdStyle}>Via Capacitor plugins</td>
              <td style={tdStyle}>Expo modules or bare</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text-primary)' }}>OTA Updates</td>
              <td style={tdStyle}>Via CodePush</td>
              <td style={tdRedStyle}>Limited</td>
              <td style={tdStyle}>Via Appflow</td>
              <td style={tdGreenStyle}>EAS Update (built-in)</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text-primary)' }}>Best For</td>
              <td style={tdStyle}>React devs, complex apps</td>
              <td style={tdStyle}>Pixel-perfect custom UI</td>
              <td style={tdStyle}>Web devs, simple apps</td>
              <td style={tdStyle}>Rapid development, prototypes</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600, color: 'var(--text-primary)' }}>Backed By</td>
              <td style={tdStyle}>Meta (open source)</td>
              <td style={tdStyle}>Google (open source)</td>
              <td style={tdStyle}>Ionic / Capacitor team</td>
              <td style={tdStyle}>Expo (Shopify-backed)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>Quick Decision Guide</h3>
      <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
        <li style={liStyle}><strong>Already know React?</strong> Use React Native or Expo — reuse your skills and npm ecosystem</li>
        <li style={liStyle}><strong>Need maximum visual customization?</strong> Flutter renders every pixel with Skia, giving pixel-perfect control across platforms</li>
        <li style={liStyle}><strong>Building a simple app quickly?</strong> Expo managed workflow is the fastest path to a working iOS + Android app</li>
        <li style={liStyle}><strong>Web developer with no native experience?</strong> Ionic/Capacitor lets you use familiar HTML/CSS/JS with web frameworks like React, Vue, or Angular</li>
        <li style={liStyle}><strong>Enterprise app needing native features?</strong> React Native bare workflow with EAS Build provides the best balance of control and convenience</li>
      </ul>

      {/* Section 10 — FAQ */}
      <h2 style={h2Style}>10. Frequently Asked Questions</h2>

      <h3 style={h3Style}>What is React Native New Architecture and should I use it in 2026?</h3>
      <p style={pStyle}>
        The New Architecture replaces the old asynchronous JavaScript bridge with <strong>JSI (JavaScript Interface)</strong> — a C++ layer enabling direct, synchronous calls between JavaScript and native code. The new rendering system <strong>Fabric</strong> runs React&apos;s reconciler on native threads, enabling concurrent rendering and eliminating frame drops during animations. TurboModules load native modules lazily, reducing startup time. It is stable in React Native 0.74+ and enabled by default in all new projects. Existing projects should migrate — the performance improvements are significant, especially for animation-heavy apps.
      </p>

      <h3 style={h3Style}>Should I use Expo or bare React Native?</h3>
      <p style={pStyle}>
        Use <strong>Expo managed workflow</strong> for most projects. It handles certificates, build servers, over-the-air updates, and provides 50+ pre-built native modules. EAS Build lets you build iOS apps from any OS — you do not need a Mac. Choose bare React Native (or Expo bare) when you need to write custom native code in Swift or Kotlin, integrate proprietary SDKs, or have complex native build requirements.
      </p>

      <h3 style={h3Style}>Can I use TypeScript with React Native?</h3>
      <p style={pStyle}>
        Yes — TypeScript is fully supported and is the recommended default. New projects created with <code>npx create-expo-app --template blank-typescript</code> or <code>npx react-native init MyApp</code> include TypeScript configuration out of the box. You get full type safety for component props, navigation params (with typed route definitions), StyleSheet definitions, and API response shapes.
      </p>

      <h3 style={h3Style}>How do I debug React Native apps?</h3>
      <p style={pStyle}>
        Use <strong>Flipper</strong> for network inspection, component tree debugging, and performance profiling. React DevTools works for inspecting component state and props. For native crashes, use Xcode Instruments for iOS and Android Studio&apos;s profiler for Android. Shake the device (or press Cmd+D on iOS simulator / Cmd+M on Android emulator) to access the developer menu with reload, element inspector, and performance monitor.
      </p>

      <h3 style={h3Style}>How do I navigate between screens?</h3>
      <p style={pStyle}>
        Install <strong>React Navigation</strong> (<code>@react-navigation/native</code>) plus the navigator packages you need. Wrap your app in <code>NavigationContainer</code>. Use <code>createNativeStackNavigator</code> for stack navigation, <code>createBottomTabNavigator</code> for tabs. Access the navigation object via the <code>useNavigation</code> hook and read route params via <code>useRoute</code>. For Expo projects, consider <strong>Expo Router</strong> (SDK 50+) for file-based routing similar to Next.js.
      </p>

      <h3 style={h3Style}>What is Expo Router and how does it differ from React Navigation?</h3>
      <p style={pStyle}>
        Expo Router is a <strong>file-based routing system</strong> built on top of React Navigation. Files in the <code>app/</code> directory automatically become routes — no manual navigator setup required. It supports deep linking automatically, shared layouts (similar to Next.js layouts), and typed routes. React Navigation gives more programmatic control and is better for complex custom navigation patterns. Expo Router is recommended for new Expo SDK 50+ projects.
      </p>

      <h3 style={h3Style}>How do I handle global state in React Native?</h3>
      <p style={pStyle}>
        For small apps, React Context with <code>useReducer</code> is sufficient. For medium to large apps, <strong>Zustand</strong> is the recommended choice — it is lightweight, requires no Provider boilerplate, supports AsyncStorage persistence, and works perfectly with React Native. Redux Toolkit remains popular in large enterprise teams. Avoid using Context for high-frequency updates (like real-time data) as it re-renders all consumers.
      </p>

      <h3 style={h3Style}>How do I deploy a React Native app to the App Store and Google Play?</h3>
      <p style={pStyle}>
        With Expo, use <strong>EAS Build</strong> (<code>eas build --platform ios</code> and <code>eas build --platform android</code>) to create production binaries in Expo&apos;s cloud, then <strong>EAS Submit</strong> to upload directly to the App Store and Google Play. For bare React Native, build with Xcode (iOS) or Gradle (<code>./gradlew bundleRelease</code> for Android), then submit through App Store Connect and Google Play Console. You need an Apple Developer account ($99/year) and a Google Play Developer account ($25 one-time fee).
      </p>

      {/* Conclusion */}
      <h2 style={h2Style}>Conclusion</h2>
      <p style={pStyle}>
        React Native in 2026 is more capable than ever. The New Architecture removes the main performance bottlenecks of the old bridge, Expo&apos;s EAS platform streamlines the build and deployment workflow, and the ecosystem — including React Navigation, Zustand, Reanimated, and Expo&apos;s SDK — is mature and well-maintained.
      </p>
      <p style={pStyle}>
        For most developers coming from a React web background, <strong>Expo with the managed workflow</strong> is the fastest path to a production-quality iOS and Android app. Start with <code>npx create-expo-app --template blank-typescript</code>, add React Navigation for routing, Zustand for state management, and EAS Build when you are ready to ship.
      </p>
      <p style={pStyle}>
        Master the core components (<code>View</code>, <code>Text</code>, <code>FlatList</code>, <code>Pressable</code>), understand React Native&apos;s flexbox-first layout system, apply the <code>StyleSheet</code> API for optimized styles, and profile your app with Flipper and Hermes. With these fundamentals in place, you have everything you need to build performant, polished cross-platform mobile applications.
      </p>
    </article>
  );
}
