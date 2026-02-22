export default function PlaywrightTestingGuide() {
  return (
    <>
      <h2>Playwright E2E Testing: The Complete Guide for 2026</h2>
      <p>
        Playwright is the leading end-to-end testing framework for web applications. Created by Microsoft,
        it supports Chromium, Firefox, and WebKit with a single API, runs tests in parallel by default,
        and provides powerful features like auto-waiting, network interception, and visual regression
        testing. This guide covers setup, writing tests, advanced patterns, and CI/CD integration.
      </p>

      <h2>Why Playwright?</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Playwright</th>
            <th>Cypress</th>
            <th>Selenium</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Multi-browser</td><td>Chromium, Firefox, WebKit</td><td>Chromium, Firefox, WebKit</td><td>All browsers</td></tr>
          <tr><td>Parallel execution</td><td>Built-in, per-worker</td><td>Paid (Cypress Cloud)</td><td>Via Selenium Grid</td></tr>
          <tr><td>Auto-waiting</td><td>Yes (all actions)</td><td>Yes (DOM only)</td><td>Manual waits</td></tr>
          <tr><td>Network mocking</td><td>Built-in (route API)</td><td>Built-in (intercept)</td><td>External tools</td></tr>
          <tr><td>Language support</td><td>JS/TS, Python, Java, C#</td><td>JS/TS only</td><td>Many languages</td></tr>
          <tr><td>iframes / tabs</td><td>Full support</td><td>Limited</td><td>Full support</td></tr>
          <tr><td>Test generator</td><td>codegen (records actions)</td><td>Cypress Studio</td><td>Selenium IDE</td></tr>
          <tr><td>Trace viewer</td><td>Built-in (visual timeline)</td><td>Screenshots + video</td><td>Logs</td></tr>
        </tbody>
      </table>

      <h2>Setup</h2>
      <pre><code className="language-bash">{`# Initialize Playwright in your project
npm init playwright@latest

# This creates:
# playwright.config.ts — configuration
# tests/ — test directory
# tests-examples/ — example tests

# Or add to existing project
npm install -D @playwright/test
npx playwright install  # Download browser binaries

# Run the code generator to record tests
npx playwright codegen https://your-app.com`}</code></pre>

      <h3>Configuration</h3>
      <pre><code className="language-typescript">{`// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',

  // Run tests in parallel
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,  // Auto-detect locally

  // Fail the build on CI if test.only is left in source
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Reporter
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['github']]
    : [['html', { open: 'on-failure' }]],

  // Shared settings for all tests
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',          // Capture trace on retry
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile viewports
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 15'] },
    },
  ],

  // Start dev server before running tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});`}</code></pre>

      <h2>Writing Tests</h2>
      <h3>Basic Test Structure</h3>
      <pre><code className="language-typescript">{`// tests/home.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/DevToolBox/);
  });

  test('navigation links work', async ({ page }) => {
    // Click a navigation link
    await page.getByRole('link', { name: 'Tools' }).click();

    // Assert the URL changed
    await expect(page).toHaveURL(/.*tools/);

    // Assert content loaded
    await expect(
      page.getByRole('heading', { name: 'Developer Tools' })
    ).toBeVisible();
  });

  test('search functionality', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search tools...');

    // Type in the search box
    await searchInput.fill('json');

    // Assert filtered results appear
    await expect(page.getByText('JSON Formatter')).toBeVisible();
    await expect(page.getByText('JSON to CSV')).toBeVisible();
  });
});`}</code></pre>

      <h3>Locator Strategies</h3>
      <pre><code className="language-typescript">{`// Playwright locator strategies — from most to least recommended

// 1. getByRole — accessibility-based (best practice)
page.getByRole('button', { name: 'Submit' });
page.getByRole('heading', { name: 'Welcome', level: 1 });
page.getByRole('link', { name: 'Sign in' });
page.getByRole('textbox', { name: 'Email' });
page.getByRole('checkbox', { name: 'Remember me' });
page.getByRole('dialog');
page.getByRole('navigation');

// 2. getByText — for non-interactive text
page.getByText('No results found');
page.getByText(/welcome/i);  // Case-insensitive regex

// 3. getByLabel — form inputs by label
page.getByLabel('Password');
page.getByLabel('Email address');

// 4. getByPlaceholder — inputs by placeholder
page.getByPlaceholder('Enter your email');

// 5. getByTestId — data-testid attribute (when no better option)
page.getByTestId('user-avatar');
page.getByTestId('notification-badge');

// 6. CSS / XPath — last resort
page.locator('.card:nth-child(3)');
page.locator('[data-status="active"]');

// Chaining and filtering
page.getByRole('listitem')
  .filter({ hasText: 'Product A' })
  .getByRole('button', { name: 'Add to cart' });

// nth element
page.getByRole('listitem').nth(2);
page.getByRole('listitem').first();
page.getByRole('listitem').last();`}</code></pre>

      <h2>Form Testing</h2>
      <pre><code className="language-typescript">{`// tests/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Login form', () => {
  test('successful login', async ({ page }) => {
    await page.goto('/login');

    // Fill form fields
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('securepassword');

    // Submit form
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Assert redirect and success state
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('shows validation errors', async ({ page }) => {
    await page.goto('/login');

    // Submit empty form
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Assert error messages
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('shows server error for wrong credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(
      page.getByText('Invalid email or password')
    ).toBeVisible();
  });
});`}</code></pre>

      <h2>Network Mocking and Interception</h2>
      <pre><code className="language-typescript">{`// tests/products.spec.ts
import { test, expect } from '@playwright/test';

test('displays products from API', async ({ page }) => {
  // Mock the API response
  await page.route('**/api/products', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'Widget', price: 9.99 },
        { id: 2, name: 'Gadget', price: 24.99 },
        { id: 3, name: 'Doohickey', price: 14.99 },
      ]),
    });
  });

  await page.goto('/products');

  await expect(page.getByText('Widget')).toBeVisible();
  await expect(page.getByText('$9.99')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(3);
});

test('handles API errors gracefully', async ({ page }) => {
  await page.route('**/api/products', async (route) => {
    await route.fulfill({ status: 500 });
  });

  await page.goto('/products');
  await expect(page.getByText('Failed to load products')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
});

test('intercepts and modifies requests', async ({ page }) => {
  // Add auth header to all API requests
  await page.route('**/api/**', async (route) => {
    await route.continue({
      headers: {
        ...route.request().headers(),
        Authorization: 'Bearer test-token-123',
      },
    });
  });

  await page.goto('/dashboard');
});

test('waits for specific network request', async ({ page }) => {
  await page.goto('/products');

  // Click "Load more" and wait for the API call
  const responsePromise = page.waitForResponse('**/api/products?page=2');
  await page.getByRole('button', { name: 'Load more' }).click();
  const response = await responsePromise;

  expect(response.status()).toBe(200);
});`}</code></pre>

      <h2>Page Object Model</h2>
      <pre><code className="language-typescript">{`// pages/LoginPage.ts
import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectError(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }

  async expectLoggedIn() {
    await expect(this.page).toHaveURL('/dashboard');
  }
}

// tests/login.spec.ts — using the Page Object
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('successful login', async () => {
    await loginPage.login('admin@test.com', 'password123');
    await loginPage.expectLoggedIn();
  });

  test('invalid credentials', async () => {
    await loginPage.login('wrong@test.com', 'wrong');
    await loginPage.expectError('Invalid email or password');
  });
});`}</code></pre>

      <h2>Visual Regression Testing</h2>
      <pre><code className="language-typescript">{`// tests/visual.spec.ts
import { test, expect } from '@playwright/test';

test('homepage matches snapshot', async ({ page }) => {
  await page.goto('/');

  // Full page screenshot comparison
  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.01,  // Allow 1% pixel difference
  });
});

test('component visual test', async ({ page }) => {
  await page.goto('/components');

  // Screenshot a specific element
  const card = page.getByTestId('feature-card');
  await expect(card).toHaveScreenshot('feature-card.png');
});

// Update snapshots: npx playwright test --update-snapshots`}</code></pre>

      <h2>Authentication State</h2>
      <pre><code className="language-typescript">{`// tests/auth.setup.ts — run once, save auth state
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('admin@test.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL('/dashboard');

  // Save signed-in state to file
  await page.context().storageState({ path: authFile });
});

// playwright.config.ts — reuse auth state
export default defineConfig({
  projects: [
    // Setup project — runs first
    { name: 'setup', testMatch: /.*\\.setup\\.ts/ },

    // Tests that need authentication
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});`}</code></pre>

      <h2>Running Tests</h2>
      <pre><code className="language-bash">{`# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/home.spec.ts

# Run tests matching a pattern
npx playwright test -g "login"

# Run in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox

# Run in headed mode (see the browser)
npx playwright test --headed

# Run in debug mode (step through)
npx playwright test --debug

# Run with UI mode (interactive runner)
npx playwright test --ui

# Show HTML report
npx playwright show-report

# Generate code by recording actions
npx playwright codegen http://localhost:3000

# Update visual snapshots
npx playwright test --update-snapshots`}</code></pre>

      <h2>CI/CD Integration</h2>
      <pre><code className="language-yaml">{`# .github/workflows/e2e.yml
name: E2E Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  e2e:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Build application
        run: npm run build

      - name: Run E2E tests
        run: npx playwright test

      - name: Upload test report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

      - name: Upload test traces
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: test-traces
          path: test-results/`}</code></pre>

      <h2>Best Practices</h2>
      <ul>
        <li><strong>Use role-based locators</strong> — getByRole is the most resilient and accessible selector strategy</li>
        <li><strong>Avoid hard waits</strong> — Playwright auto-waits; use assertions instead of sleep()</li>
        <li><strong>Isolate tests</strong> — each test should work independently; do not rely on test execution order</li>
        <li><strong>Mock external APIs</strong> — use page.route() to avoid flaky tests from network issues</li>
        <li><strong>Use Page Objects</strong> — encapsulate page interactions for maintainable, DRY tests</li>
        <li><strong>Run in CI with retries</strong> — set retries: 2 to handle transient failures</li>
        <li><strong>Capture traces on failure</strong> — trace: on-first-retry gives you a full debugging timeline</li>
        <li><strong>Test critical user flows</strong> — focus E2E tests on business-critical paths, not unit-level details</li>
      </ul>

      <p>
        When testing APIs alongside your E2E tests, use our <a href="/en/tools/json-formatter">JSON Formatter</a> to
        inspect mock data payloads. For understanding HTTP responses in your test assertions, check our{" "}
        <a href="/en/blog/http-status-codes-reference">HTTP Status Codes Reference</a>. For setting up
        your test configuration files, our <a href="/en/blog/json-vs-yaml-vs-toml">JSON vs YAML vs TOML</a>{" "}
        comparison helps you choose the right format.
      </p>
    </>
  );
}
