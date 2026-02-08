import Link from 'next/link';

export default function DockerYamlErrors({ lang }: { lang: string }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I validate a Docker Compose file before running it?',
        acceptedAnswer: { '@type': 'Answer', text: 'Run "docker compose config" (or "docker-compose config" for v1) to validate and display the resolved configuration. This command parses the YAML, resolves variables, and shows any syntax errors. You can also use online YAML validators or our JSON-YAML Converter tool to check syntax.' },
      },
      {
        '@type': 'Question',
        name: 'Why does Docker Compose say "service must be a mapping" or "services must be a mapping"?',
        acceptedAnswer: { '@type': 'Answer', text: 'This error means your services section (or an individual service) is not properly structured as a YAML mapping (key-value pairs). Common causes: missing indentation under a service name, using a list (-) where a mapping (key:value) is expected, or a typo in the service structure.' },
      },
      {
        '@type': 'Question',
        name: 'Should I use tabs or spaces in Docker Compose YAML files?',
        acceptedAnswer: { '@type': 'Answer', text: 'Always use spaces. YAML does not allow tabs for indentation — this is the single most common source of YAML parse errors. Configure your editor to insert 2 spaces when you press Tab. Most editors have a "Convert Indentation to Spaces" command.' },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p>
        Docker Compose YAML files are deceptively simple — until they break. A single misplaced space,
        a wrong indentation level, or an unquoted special character can produce cryptic error messages.
        Here are the <strong>10 most common mistakes</strong> and exactly how to fix each one.
      </p>

      <p>
        <Link href={`/${lang}/tools/json-yaml`} style={{ fontWeight: 600 }}>
          Validate your YAML with our JSON-YAML Converter &rarr;
        </Link>
      </p>

      <h2>Error 1: Tabs Instead of Spaces</h2>
      <p><strong>Error message:</strong></p>
      <pre><code>{`yaml: line 5: found a tab character where an indentation space is expected`}</code></pre>
      <p><strong>Problem:</strong> YAML strictly prohibits tab characters for indentation. This is the #1 mistake.</p>
      <p><strong>Fix:</strong> Replace all tabs with spaces (2 spaces per indent level is standard).</p>
      <pre><code>{`# BAD (tabs - invisible but breaks YAML)
services:
\tweb:
\t\timage: nginx

# GOOD (2 spaces)
services:
  web:
    image: nginx`}</code></pre>
      <blockquote>
        <p>
          <strong>Editor tip:</strong> Enable &quot;Render Whitespace&quot; in your editor to see the difference
          between tabs and spaces. In VS Code: Settings → Render Whitespace → &quot;all&quot;.
        </p>
      </blockquote>

      <h2>Error 2: Inconsistent Indentation</h2>
      <p><strong>Error message:</strong></p>
      <pre><code>{`yaml: line 8: mapping values are not allowed in this context`}</code></pre>
      <p><strong>Problem:</strong> Mixing different indentation levels (e.g., 2 spaces for some, 4 for others).</p>
      <pre><code>{`# BAD (inconsistent: 2 spaces then 4 spaces)
services:
  web:
      image: nginx     # 4 spaces - inconsistent!
      ports:
        - "80:80"

# GOOD (consistent 2 spaces)
services:
  web:
    image: nginx       # 2 spaces - consistent
    ports:
      - "80:80"`}</code></pre>

      <h2>Error 3: Unquoted Special Characters in Values</h2>
      <p><strong>Error message:</strong></p>
      <pre><code>{`yaml: line 6: did not find expected key`}</code></pre>
      <p><strong>Problem:</strong> YAML interprets certain characters specially. Colons, hashes, and braces need quoting.</p>
      <pre><code>{`# BAD
services:
  web:
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb  # colon in value!
      - APP_TITLE=My App: The Best                       # colon in value!

# GOOD (quote values with special characters)
services:
  web:
    environment:
      - "DATABASE_URL=postgres://user:pass@db:5432/mydb"
      - "APP_TITLE=My App: The Best"`}</code></pre>
      <p><strong>Characters that need quoting:</strong> <code>: &#123; &#125; [ ] , & * # ? | - &lt; &gt; = ! % @</code></p>

      <h2>Error 4: Wrong Port Mapping Format</h2>
      <p><strong>Error message:</strong></p>
      <pre><code>{`services.web.ports contains an invalid type, it should be a number, or an object`}</code></pre>
      <p><strong>Problem:</strong> Port values that look like base-60 numbers to YAML (e.g., <code>80:80</code> without quotes).</p>
      <pre><code>{`# RISKY (YAML may interpret as base-60)
services:
  web:
    ports:
      - 80:80        # Works but risky
      - 5432:5432    # May cause issues

# SAFE (always quote port mappings)
services:
  web:
    ports:
      - "80:80"
      - "5432:5432"
      - "127.0.0.1:3000:3000"`}</code></pre>

      <h2>Error 5: Missing or Wrong Version Key</h2>
      <p><strong>Error message:</strong></p>
      <pre><code>{`(root) Additional property version is not allowed`}</code></pre>
      <p><strong>Problem:</strong> Docker Compose v2 (the current version) no longer requires or accepts the <code>version</code> key.</p>
      <pre><code>{`# OUTDATED (Docker Compose v1 format)
version: "3.8"
services:
  web:
    image: nginx

# CURRENT (Docker Compose v2 - no version needed)
services:
  web:
    image: nginx`}</code></pre>
      <p>
        If you&apos;re using <code>docker compose</code> (v2, with a space), remove the <code>version</code> key.
        If you&apos;re using <code>docker-compose</code> (v1, with a hyphen), keep it.
      </p>

      <h2>Error 6: Environment Variables as Mapping vs List</h2>
      <p><strong>Error message:</strong></p>
      <pre><code>{`services.web.environment must be a mapping or an array`}</code></pre>
      <p><strong>Problem:</strong> Mixing mapping and list syntax for environment variables.</p>
      <pre><code>{`# Format A: List (with dashes)
services:
  web:
    environment:
      - NODE_ENV=production
      - PORT=3000

# Format B: Mapping (key: value)
services:
  web:
    environment:
      NODE_ENV: production
      PORT: 3000

# BAD: Mixing both formats
services:
  web:
    environment:
      NODE_ENV: production
      - PORT=3000          # ERROR: mixing formats!`}</code></pre>

      <h2>Error 7: Boolean Values Not Quoted</h2>
      <p><strong>Error message:</strong> No error, but unexpected behavior.</p>
      <p><strong>Problem:</strong> YAML interprets <code>yes</code>, <code>no</code>, <code>true</code>, <code>false</code>,
        <code>on</code>, <code>off</code> as booleans, not strings.</p>
      <pre><code>{`# BAD (YAML converts to boolean true/false)
services:
  web:
    environment:
      FEATURE_FLAG: yes       # becomes boolean true, not string "yes"
      DEBUG: on               # becomes boolean true
      COUNTRY: NO             # becomes boolean false (Norway code!)

# GOOD (quote string values)
services:
  web:
    environment:
      FEATURE_FLAG: "yes"
      DEBUG: "on"
      COUNTRY: "NO"`}</code></pre>

      <h2>Error 8: Duplicate Keys</h2>
      <p><strong>Error message:</strong> Often no error — the second value silently overwrites the first.</p>
      <pre><code>{`# BAD (duplicate 'ports' key - second one silently wins)
services:
  web:
    image: nginx
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    ports:                    # DUPLICATE! This replaces the first ports
      - "443:443"

# GOOD (combine under single key)
services:
  web:
    image: nginx
    ports:
      - "80:80"
      - "443:443"
    environment:
      - NODE_ENV=production`}</code></pre>

      <h2>Error 9: Volumes Path Mapping Issues</h2>
      <p><strong>Error message:</strong></p>
      <pre><code>{`services.web.volumes contains an invalid type`}</code></pre>
      <pre><code>{`# BAD (Windows paths without quotes)
services:
  web:
    volumes:
      - C:\\Users\\me\\app:/app     # Backslashes cause issues

# GOOD (use forward slashes or quotes)
services:
  web:
    volumes:
      - "./app:/app"
      - "/home/user/data:/data"
      - "C:/Users/me/app:/app"      # Forward slashes on Windows`}</code></pre>

      <h2>Error 10: YAML Anchors Used Incorrectly</h2>
      <p><strong>Error message:</strong></p>
      <pre><code>{`yaml: unknown anchor 'common'`}</code></pre>
      <p><strong>Problem:</strong> Referencing an anchor (<code>*name</code>) before defining it (<code>&amp;name</code>).</p>
      <pre><code>{`# BAD (reference before definition)
services:
  web:
    <<: *common          # ERROR: 'common' not defined yet

x-common: &common
  restart: always

# GOOD (define anchor first, then reference)
x-common: &common
  restart: always
  logging:
    driver: json-file

services:
  web:
    <<: *common
    image: nginx
  api:
    <<: *common
    image: node:20`}</code></pre>

      <h2>Quick Validation Checklist</h2>
      <p>Before running <code>docker compose up</code>, verify:</p>
      <ol>
        <li>Run <code>docker compose config</code> to validate syntax</li>
        <li>Check for tabs: <code>grep -P &apos;\t&apos; docker-compose.yml</code></li>
        <li>Ensure all port mappings are quoted</li>
        <li>Verify no duplicate keys at the same level</li>
        <li>Quote all values containing special characters</li>
        <li>Use consistent indentation (2 spaces recommended)</li>
      </ol>

      <p>
        <Link href={`/${lang}/tools/json-yaml`} style={{ fontWeight: 600 }}>
          Validate and convert YAML with our JSON-YAML Converter &rarr;
        </Link>
      </p>
      <p>
        <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>
          Format JSON output from &quot;docker compose config&quot; &rarr;
        </Link>
      </p>

      {/* FAQ */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <h3>How do I validate a Docker Compose file before running it?</h3>
        <p>
          Run <code>docker compose config</code> (or <code>docker-compose config</code> for v1) to validate
          and display the resolved configuration. This command parses the YAML, resolves variables, and
          shows any syntax errors. You can also use online YAML validators or our JSON-YAML Converter
          tool to check syntax.
        </p>

        <h3>Why does Docker Compose say &quot;service must be a mapping&quot;?</h3>
        <p>
          This error means your services section (or an individual service) is not properly structured as
          a YAML mapping (key-value pairs). Common causes: missing indentation under a service name, using
          a list (<code>-</code>) where a mapping (<code>key: value</code>) is expected, or a typo in the service structure.
        </p>

        <h3>Should I use tabs or spaces in Docker Compose YAML files?</h3>
        <p>
          Always use spaces. YAML does not allow tabs for indentation — this is the single most common
          source of YAML parse errors. Configure your editor to insert 2 spaces when you press Tab.
        </p>
      </div>
    </>
  );
}
