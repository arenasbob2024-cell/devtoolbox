export default function VueCompositionApiGuide() {
  return (
    <>
      <h2>Vue 3 Composition API: The Complete Guide to ref, reactive, computed, watch, and Lifecycle Hooks</h2>
      <p>
        The Composition API is the recommended way to write Vue 3 components. It replaces the Options API
        with a more flexible, function-based approach that improves code reuse, TypeScript support, and
        logical organization. Whether you are migrating from Vue 2 or starting fresh, this guide covers
        every essential Composition API feature with practical examples.
      </p>

      <h2>Why the Composition API?</h2>
      <p>
        The Options API organized code by option type (data, methods, computed, watch). This worked fine
        for small components but caused "feature fragmentation" in large ones — a single logical concern
        was scattered across multiple options. The Composition API lets you group related logic together,
        extract it into composables, and get full TypeScript inference without extra type annotations.
      </p>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Options API</th>
            <th>Composition API</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Code organization</td><td>By option type</td><td>By logical concern</td></tr>
          <tr><td>TypeScript support</td><td>Requires defineComponent + workarounds</td><td>Full inference out of the box</td></tr>
          <tr><td>Code reuse</td><td>Mixins (naming collisions)</td><td>Composables (explicit, typed)</td></tr>
          <tr><td>Tree-shaking</td><td>Entire options included</td><td>Only imported APIs bundled</td></tr>
          <tr><td>Learning curve</td><td>Lower for beginners</td><td>Slightly higher but more scalable</td></tr>
        </tbody>
      </table>

      <h2>Setting Up: script setup</h2>
      <p>
        The <code>&lt;script setup&gt;</code> syntax is the recommended way to use the Composition API in
        Single File Components. It reduces boilerplate by automatically exposing top-level bindings to the
        template.
      </p>
      <pre><code className="language-html">{`<script setup lang="ts">
import { ref, computed } from 'vue'

// Everything declared here is available in the template
const message = ref('Hello Vue 3!')
const reversed = computed(() => message.value.split('').reverse().join(''))
</script>

<template>
  <div>
    <p>{{ message }}</p>
    <p>{{ reversed }}</p>
    <input v-model="message" />
  </div>
</template>`}</code></pre>

      <h2>ref — Reactive Primitive Values</h2>
      <p>
        <code>ref()</code> creates a reactive reference that wraps any value. Access the inner value via
        <code>.value</code> in JavaScript; in templates, Vue auto-unwraps it.
      </p>
      <pre><code className="language-typescript">{`import { ref, type Ref } from 'vue'

// Basic ref
const count = ref(0)          // Ref<number>
const name = ref('Alice')     // Ref<string>
const items = ref<string[]>([])  // Explicit generic type

// Updating
count.value++                  // Must use .value in script
name.value = 'Bob'
items.value.push('new item')

// Ref with complex types
interface User {
  id: number
  name: string
  email: string
}

const user = ref<User | null>(null)

// Fetch and assign
async function loadUser(id: number) {
  const response = await fetch(\`/api/users/\${id}\`)
  user.value = await response.json()  // TypeScript knows the shape
}

// DOM refs — access template elements
const inputEl = ref<HTMLInputElement | null>(null)

function focusInput() {
  inputEl.value?.focus()  // Safe access with optional chaining
}`}</code></pre>
      <pre><code className="language-html">{`<template>
  <!-- Auto-unwrapped in template — no .value needed -->
  <p>Count: {{ count }}</p>
  <button @click="count++">Increment</button>

  <!-- DOM ref binding -->
  <input ref="inputEl" />
  <button @click="focusInput">Focus Input</button>

  <!-- Conditional rendering with ref -->
  <div v-if="user">
    <p>{{ user.name }} — {{ user.email }}</p>
  </div>
</template>`}</code></pre>

      <h2>reactive — Reactive Objects</h2>
      <p>
        <code>reactive()</code> makes an entire object deeply reactive. Unlike <code>ref</code>, you do
        not need <code>.value</code> — you work with the object directly. However, you cannot reassign the
        whole object or destructure it without losing reactivity.
      </p>
      <pre><code className="language-typescript">{`import { reactive } from 'vue'

// Basic reactive object
const state = reactive({
  count: 0,
  items: [] as string[],
  nested: {
    deep: true,   // Deep reactivity by default
  },
})

// Direct mutation — no .value needed
state.count++
state.items.push('hello')
state.nested.deep = false

// Typed reactive
interface FormState {
  username: string
  email: string
  password: string
  errors: Record<string, string>
}

const form = reactive<FormState>({
  username: '',
  email: '',
  password: '',
  errors: {},
})

function validate() {
  form.errors = {}  // Reset errors
  if (!form.username) form.errors.username = 'Required'
  if (!form.email.includes('@')) form.errors.email = 'Invalid email'
  if (form.password.length < 8) form.errors.password = 'Min 8 characters'
  return Object.keys(form.errors).length === 0
}

// WARNING: Destructuring loses reactivity!
// const { count } = state     // count is NOT reactive
// Use toRefs() instead:
import { toRefs } from 'vue'
const { count, items } = toRefs(state)  // Each is now a Ref`}</code></pre>

      <h3>ref vs reactive: When to Use Which</h3>
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Use ref</th>
            <th>Use reactive</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Primitives (string, number, boolean)</td><td>Yes</td><td>No (wraps in object)</td></tr>
          <tr><td>Object that might be reassigned</td><td>Yes</td><td>No (loses reactivity)</td></tr>
          <tr><td>Form state with many fields</td><td>Possible but verbose</td><td>Yes — cleaner syntax</td></tr>
          <tr><td>DOM template refs</td><td>Yes</td><td>No</td></tr>
          <tr><td>Composable return values</td><td>Yes (easy to destructure)</td><td>Wrap with toRefs()</td></tr>
        </tbody>
      </table>

      <h2>computed — Derived State</h2>
      <p>
        <code>computed()</code> creates a cached, reactive value derived from other reactive sources.
        It only re-evaluates when its dependencies change.
      </p>
      <pre><code className="language-typescript">{`import { ref, computed } from 'vue'

const items = ref([
  { name: 'Apple', price: 1.5, inStock: true },
  { name: 'Banana', price: 0.75, inStock: false },
  { name: 'Cherry', price: 3.0, inStock: true },
])

const searchQuery = ref('')
const sortBy = ref<'name' | 'price'>('name')

// Read-only computed
const availableItems = computed(() =>
  items.value.filter(item => item.inStock)
)

// Chained computed — filters and sorts
const filteredItems = computed(() => {
  let result = availableItems.value
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item =>
      item.name.toLowerCase().includes(query)
    )
  }
  return [...result].sort((a, b) => {
    if (sortBy.value === 'price') return a.price - b.price
    return a.name.localeCompare(b.name)
  })
})

const totalPrice = computed(() =>
  filteredItems.value.reduce((sum, item) => sum + item.price, 0)
)

// Writable computed
const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  get: () => \`\${firstName.value} \${lastName.value}\`,
  set: (newValue: string) => {
    const [first, ...rest] = newValue.split(' ')
    firstName.value = first
    lastName.value = rest.join(' ')
  },
})

fullName.value = 'Jane Smith'
// firstName.value === 'Jane', lastName.value === 'Smith'`}</code></pre>

      <h2>watch and watchEffect — Side Effects</h2>
      <p>
        <code>watch()</code> runs a callback when specific reactive sources change. <code>watchEffect()</code>
        automatically tracks all reactive dependencies used inside it.
      </p>
      <pre><code className="language-typescript">{`import { ref, watch, watchEffect } from 'vue'

const searchQuery = ref('')
const page = ref(1)
const results = ref<any[]>([])

// Watch a single ref
watch(searchQuery, (newQuery, oldQuery) => {
  console.log(\`Search changed: "\${oldQuery}" → "\${newQuery}"\`)
  page.value = 1  // Reset page on new search
})

// Watch with options
watch(searchQuery, async (query) => {
  if (query.length < 2) return
  const res = await fetch(\`/api/search?q=\${query}&page=\${page.value}\`)
  results.value = await res.json()
}, {
  debounce: 300,       // Vue 3.5+ built-in debounce
  immediate: false,    // Don't run on mount (default)
})

// Watch multiple sources
watch([searchQuery, page], ([newQuery, newPage], [oldQuery, oldPage]) => {
  console.log(\`Query: \${newQuery}, Page: \${newPage}\`)
  fetchResults(newQuery, newPage)
})

// Deep watch for objects
const formState = ref({ name: '', address: { city: '', zip: '' } })
watch(formState, (newVal) => {
  console.log('Form changed:', newVal)
}, { deep: true })

// watchEffect — auto-tracks dependencies
watchEffect(async () => {
  // Automatically watches searchQuery.value and page.value
  if (searchQuery.value.length < 2) return
  const res = await fetch(
    \`/api/search?q=\${searchQuery.value}&page=\${page.value}\`
  )
  results.value = await res.json()
})

// watchEffect with cleanup (abort previous request)
watchEffect((onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())

  fetch(\`/api/data?q=\${searchQuery.value}\`, {
    signal: controller.signal,
  })
    .then(r => r.json())
    .then(data => { results.value = data })
    .catch(() => {})  // Ignore abort errors
})`}</code></pre>

      <h2>Lifecycle Hooks</h2>
      <p>
        In the Composition API, lifecycle hooks are imported functions prefixed with <code>on</code>.
        They must be called synchronously during <code>setup()</code> or <code>&lt;script setup&gt;</code>.
      </p>
      <pre><code className="language-typescript">{`import {
  ref,
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  onErrorCaptured,
} from 'vue'

const data = ref<any>(null)
const timer = ref<number | null>(null)

onBeforeMount(() => {
  console.log('Component is about to mount')
})

onMounted(() => {
  console.log('Component mounted — DOM is available')
  fetchData()
  timer.value = window.setInterval(pollForUpdates, 30000)
})

onBeforeUpdate(() => {
  console.log('Component is about to re-render')
})

onUpdated(() => {
  console.log('Component re-rendered')
})

onBeforeUnmount(() => {
  console.log('About to unmount — last chance to read DOM')
})

onUnmounted(() => {
  console.log('Component unmounted — clean up!')
  if (timer.value) clearInterval(timer.value)
})

// Error boundary for child components
onErrorCaptured((err, instance, info) => {
  console.error('Child error:', err, info)
  return false  // Prevent propagation
})

// For <KeepAlive> cached components
onActivated(() => {
  console.log('Component activated from cache')
})

onDeactivated(() => {
  console.log('Component deactivated into cache')
})`}</code></pre>

      <h2>Composables — Reusable Logic</h2>
      <p>
        Composables are functions that encapsulate and reuse stateful logic. They are the Composition API's
        replacement for mixins, providing explicit dependencies, full TypeScript support, and no naming
        collisions.
      </p>
      <pre><code className="language-typescript">{`// composables/useFetch.ts
import { ref, watchEffect, type Ref } from 'vue'

interface UseFetchReturn<T> {
  data: Ref<T | null>
  error: Ref<string | null>
  isLoading: Ref<boolean>
  refetch: () => Promise<void>
}

export function useFetch<T>(url: Ref<string> | string): UseFetchReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  async function fetchData() {
    isLoading.value = true
    error.value = null
    try {
      const urlValue = typeof url === 'string' ? url : url.value
      const response = await fetch(urlValue)
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`)
      data.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  // Auto-refetch when URL changes (if it's a ref)
  if (typeof url !== 'string') {
    watchEffect(() => {
      if (url.value) fetchData()
    })
  } else {
    fetchData()
  }

  return { data, error, isLoading, refetch: fetchData }
}

// composables/useLocalStorage.ts
import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const stored = localStorage.getItem(key)
  const data = ref<T>(
    stored ? JSON.parse(stored) : defaultValue
  ) as Ref<T>

  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })

  return data
}

// composables/useDebounce.ts
import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(source: Ref<T>, delay = 300): Ref<T> {
  const debounced = ref(source.value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout>

  watch(source, (newValue) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debounced.value = newValue
    }, delay)
  })

  return debounced
}`}</code></pre>

      <h3>Using Composables in Components</h3>
      <pre><code className="language-html">{`<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFetch } from '@/composables/useFetch'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { useDebounce } from '@/composables/useDebounce'

// Composables compose naturally
const searchInput = ref('')
const debouncedSearch = useDebounce(searchInput, 500)

const apiUrl = computed(() =>
  debouncedSearch.value
    ? \`/api/users?q=\${debouncedSearch.value}\`
    : '/api/users'
)

const { data: users, isLoading, error } = useFetch<User[]>(apiUrl)
const theme = useLocalStorage('theme', 'light')
</script>

<template>
  <div :class="theme">
    <input v-model="searchInput" placeholder="Search users..." />
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="error" class="error">{{ error }}</p>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
    <button @click="theme = theme === 'light' ? 'dark' : 'light'">
      Toggle Theme
    </button>
  </div>
</template>`}</code></pre>

      <h2>provide / inject — Dependency Injection</h2>
      <pre><code className="language-typescript">{`// Parent component
import { provide, ref } from 'vue'

const theme = ref('light')
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// Type-safe injection keys
import type { InjectionKey } from 'vue'

interface ThemeContext {
  theme: Ref<string>
  toggleTheme: () => void
}

export const ThemeKey: InjectionKey<ThemeContext> = Symbol('theme')

provide(ThemeKey, { theme, toggleTheme })

// Child component (any depth)
import { inject } from 'vue'
import { ThemeKey } from '@/keys'

const themeCtx = inject(ThemeKey)
if (!themeCtx) throw new Error('ThemeKey not provided')

// Now fully typed
console.log(themeCtx.theme.value)  // 'light' or 'dark'
themeCtx.toggleTheme()`}</code></pre>

      <h2>defineProps and defineEmits with TypeScript</h2>
      <pre><code className="language-html">{`<script setup lang="ts">
// Type-based props declaration (recommended)
const props = defineProps<{
  title: string
  count?: number
  items: Array<{ id: number; label: string }>
}>()

// With defaults
const props = withDefaults(
  defineProps<{
    title: string
    count?: number
    variant?: 'primary' | 'secondary'
  }>(),
  {
    count: 0,
    variant: 'primary',
  }
)

// Type-based emits
const emit = defineEmits<{
  (e: 'update', id: number): void
  (e: 'delete', id: number): void
  (e: 'search', query: string): void
}>()

// Vue 3.3+ shorthand
const emit = defineEmits<{
  update: [id: number]
  delete: [id: number]
  search: [query: string]
}>()

function handleClick(id: number) {
  emit('update', id)
}

// defineModel (Vue 3.4+) — two-way binding made easy
const modelValue = defineModel<string>()           // v-model
const title = defineModel<string>('title')         // v-model:title
const count = defineModel<number>('count', {       // with options
  default: 0,
  required: false,
})
</script>`}</code></pre>

      <h2>Best Practices and Common Patterns</h2>
      <ul>
        <li><strong>Prefer ref over reactive</strong> — ref works for all types and is easier to destructure from composables</li>
        <li><strong>Keep composables focused</strong> — each composable should handle one concern (data fetching, form state, animation)</li>
        <li><strong>Return refs from composables</strong> — callers can destructure without losing reactivity</li>
        <li><strong>Use computed for derived state</strong> — never manually sync derived values in watch callbacks</li>
        <li><strong>Clean up side effects</strong> — always clear timers, listeners, and subscriptions in onUnmounted</li>
        <li><strong>Type injection keys</strong> — use InjectionKey for type-safe provide/inject</li>
        <li><strong>Avoid over-watching</strong> — prefer computed when you just need derived data; use watch only for side effects</li>
      </ul>

      <p>
        When building Vue 3 projects, use our <a href="/en/tools/json-formatter">JSON Formatter</a> to
        validate API response payloads and configuration files. For structuring component data contracts,
        check out our <a href="/en/blog/json-vs-yaml-vs-toml">JSON vs YAML vs TOML</a> comparison. If
        your Vue app needs authentication, read our{" "}
        <a href="/en/blog/api-authentication-oauth-jwt-apikey">API Authentication Guide</a> for
        integrating OAuth and JWT with frontend frameworks.
      </p>
    </>
  );
}
