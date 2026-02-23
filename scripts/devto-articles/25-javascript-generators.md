---
title: "JavaScript Generators and Iterators: A Practical Guide"
tags: javascript, typescript, programming, webdev
canonical_url: https://viadreams.cc/en/blog/javascript-generators-guide
published: true
---

Generators are one of JavaScript's most underused features. Once you understand them, you'll find uses everywhere.

## The Core Concept

A generator function can pause and resume. It yields values one at a time.

```javascript
function* counter() {
  let n = 0;
  while (true) {
    yield n++; // Pause here, return n, resume on next call
  }
}

const gen = counter();
gen.next(); // { value: 0, done: false }
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
// Infinite sequence, no memory issues
```

The `*` makes it a generator. `yield` is the pause point.

## Infinite Sequences

```javascript
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Take first 10 Fibonacci numbers
function take(gen, n) {
  const result = [];
  for (const value of gen) {
    result.push(value);
    if (result.length === n) break;
  }
  return result;
}

take(fibonacci(), 10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

## Lazy Evaluation

Process huge datasets without loading them all into memory:

```javascript
function* processLargeFile(lines) {
  for (const line of lines) {
    if (line.startsWith('#')) continue;  // Skip comments
    const [key, value] = line.split('=');
    yield { key: key.trim(), value: value.trim() };
  }
}

// Only processes lines as needed - doesn't load 10GB into memory
for (const entry of processLargeFile(readFileLines('huge-config.txt'))) {
  if (entry.key === 'TARGET_KEY') {
    console.log(entry.value);
    break; // Stops reading the file
  }
}
```

## Two-Way Communication

You can send values INTO a generator:

```javascript
function* calculator() {
  let result = 0;
  while (true) {
    const input = yield result; // Send current result out, wait for input
    result += input;
  }
}

const calc = calculator();
calc.next();      // Start: { value: 0, done: false }
calc.next(10);    // Add 10: { value: 10, done: false }
calc.next(5);     // Add 5: { value: 15, done: false }
calc.next(-3);    // Subtract 3: { value: 12, done: false }
```

## Async Generators

Combine generators with async/await for streaming data:

```javascript
async function* streamPages(url) {
  let page = 1;
  while (true) {
    const response = await fetch(`${url}?page=${page}`);
    const data = await response.json();

    if (data.items.length === 0) return;

    yield* data.items;    // Yield each item individually
    page++;
  }
}

// Process API results as they stream in
for await (const user of streamPages('/api/users')) {
  await processUser(user);
}
```

## Generator-Based State Machine

```javascript
function* trafficLight() {
  while (true) {
    yield 'green';   // 30 seconds
    yield 'yellow';  // 5 seconds
    yield 'red';     // 30 seconds
  }
}

const light = trafficLight();
setInterval(() => {
  const { value } = light.next();
  updateLight(value);
}, 5000);
```

## Real-World: Redux-Saga Pattern

Generators power redux-saga for complex async flows:

```javascript
function* fetchUserSaga(action) {
  try {
    yield put({ type: 'FETCH_START' });
    const user = yield call(fetchUser, action.userId); // Pausable async call
    yield put({ type: 'FETCH_SUCCESS', payload: user });
  } catch (error) {
    yield put({ type: 'FETCH_ERROR', error });
  }
}
```

The testability is excellent — you can test each `yield` step in isolation without making real API calls.

Use the [JavaScript Minifier](https://viadreams.cc/en/tools/javascript-minifier) to optimize your generator code for production.

---

*Full generators guide at [viadreams.cc/en/blog/javascript-generators-guide](https://viadreams.cc/en/blog/javascript-generators-guide)*
