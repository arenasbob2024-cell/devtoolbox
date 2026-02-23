import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'JSON Minifier Online - Compress JSON Free',
  description: 'Free online JSON minifier. Remove whitespace and compress JSON data instantly. Supports large files, validates JSON syntax. No upload required.',
  keywords: ['json minifier online', 'compress json', 'minify json', 'json compressor', 'free json tool'],
  openGraph: {
    title: 'JSON Minifier Online - Compress JSON Free',
    description: 'Free online JSON minifier. Remove whitespace and compress JSON instantly.',
    type: 'website',
  },
};

export default function JsonMinifierOnlinePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          JSON Minifier Online
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Compress and minify JSON data instantly in your browser. Remove whitespace,
          newlines, and indentation to reduce file size. Free, private, no upload required.
        </p>
        <Link
          href="/en/tools/json-formatter"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg"
        >
          Open JSON Minifier Tool →
        </Link>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
          How to Minify JSON
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-200">
          <li>Paste your JSON into the input area</li>
          <li>Select &quot;Minify&quot; mode in the JSON Formatter</li>
          <li>The compressed JSON appears instantly in the output</li>
          <li>Click Copy to copy the minified JSON to clipboard</li>
        </ol>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
        <h2>What Does a JSON Minifier Do?</h2>
        <p>
          A JSON minifier removes all unnecessary whitespace characters — spaces, tabs,
          newlines, and carriage returns — from JSON data. The resulting JSON is functionally
          identical but takes up significantly less space.
        </p>
        <p>
          For example, a 10KB formatted JSON file typically compresses to 4-6KB when minified,
          a 40-60% size reduction. This makes a real difference for API responses, configuration
          files, and data transferred over networks.
        </p>
        <h2>When to Minify JSON</h2>
        <ul>
          <li><strong>API responses</strong> — Reduce bandwidth and speed up mobile apps</li>
          <li><strong>Build artifacts</strong> — Package your config files smaller</li>
          <li><strong>Storage</strong> — Save space when storing JSON in databases</li>
          <li><strong>Embedded JSON</strong> — JSON in HTML attributes or JavaScript</li>
        </ul>
        <h2>JSON Minifier vs JSON Formatter</h2>
        <p>
          Use a JSON <strong>formatter</strong> (also called beautifier or pretty-printer)
          when you want to read and edit JSON. Use a JSON <strong>minifier</strong> for
          production use where file size matters more than readability.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Is it safe to minify JSON online?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes. Our JSON minifier runs entirely in your browser using JavaScript.
              Your data is never sent to any server, ensuring complete privacy.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Does minifying JSON change the data?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No. Minification only removes whitespace. All keys, values, arrays,
              and nested objects remain exactly the same.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              How much does minification reduce file size?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Typically 30-60% depending on how much whitespace the original JSON contains.
              Heavily indented JSON with long arrays benefits the most.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Ready to minify JSON?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Use our free JSON Formatter & Minifier tool — no sign-up required.
        </p>
        <Link
          href="/en/tools/json-formatter"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Open JSON Minifier →
        </Link>
      </div>
    </div>
  );
}
