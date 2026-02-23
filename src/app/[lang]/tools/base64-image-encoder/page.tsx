import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Base64 Image Encoder - Convert Image to Base64 Online',
  description: 'Convert images to Base64 encoded strings online. Supports PNG, JPG, GIF, WebP. Use Base64 images in HTML, CSS, and JSON. Free, private, browser-based.',
  keywords: ['base64 image encoder', 'image to base64', 'convert image to base64', 'base64 image online', 'embed image html'],
  openGraph: {
    title: 'Base64 Image Encoder - Convert Image to Base64',
    description: 'Convert images to Base64 strings for embedding in HTML, CSS, and JSON.',
    type: 'website',
  },
};

export default function Base64ImageEncoderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Base64 Image Encoder
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Convert images to Base64 encoded strings for embedding in HTML, CSS, JavaScript,
          and JSON. Supports PNG, JPG, GIF, SVG, and WebP. Runs entirely in your browser.
        </p>
        <Link
          href="/en/tools/base64-encode-online"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg"
        >
          Open Base64 Encoder Tool →
        </Link>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
          How to Encode an Image to Base64
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-200">
          <li>Go to the Base64 Encoder tool</li>
          <li>Upload your image or paste image data</li>
          <li>Copy the Base64 string from the output</li>
          <li>Use in HTML: <code>{'<img src="data:image/png;base64,...">'}</code></li>
        </ol>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
        <h2>What is Base64 Image Encoding?</h2>
        <p>
          Base64 encoding converts binary image data into a text string that can be embedded
          directly in HTML, CSS, or JavaScript files. Instead of referencing an external image file,
          you include the image data inline using a data URL format.
        </p>

        <h2>When to Use Base64 Images</h2>
        <ul>
          <li><strong>Small icons and logos</strong> — Eliminates HTTP requests for tiny images</li>
          <li><strong>Email templates</strong> — Inline images that always display</li>
          <li><strong>Single-file deployments</strong> — Everything in one HTML file</li>
          <li><strong>CSS background images</strong> — Reduce requests in stylesheets</li>
          <li><strong>API responses</strong> — Return image data as JSON</li>
        </ul>

        <h2>Base64 Image Format</h2>
        <p>In HTML, use the data URL format:</p>
        <pre><code>{`<!-- PNG image -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." />

<!-- In CSS -->
.logo {
  background-image: url('data:image/svg+xml;base64,PHN2Zy...');
}

<!-- In JavaScript -->
const img = new Image();
img.src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgAB...';`}</code></pre>

        <h2>Size Considerations</h2>
        <p>
          Base64 encoding increases file size by approximately 33%. A 100KB image becomes
          ~133KB as Base64. For images larger than 10KB, it&apos;s usually better to serve
          them as separate files with proper caching headers.
        </p>

        <h2>Supported Image Formats</h2>
        <ul>
          <li>PNG (<code>image/png</code>)</li>
          <li>JPEG (<code>image/jpeg</code>)</li>
          <li>GIF (<code>image/gif</code>)</li>
          <li>WebP (<code>image/webp</code>)</li>
          <li>SVG (<code>image/svg+xml</code>)</li>
          <li>ICO (<code>image/x-icon</code>)</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Is my image secure when encoding online?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes. All encoding happens in your browser — your images are never uploaded to
              any server. Your data stays completely private.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Can I decode Base64 back to an image?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes. Our Base64 tool supports both encoding (image to Base64) and decoding
              (Base64 to image). Just switch to decode mode.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              What&apos;s the maximum image size?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our browser-based encoder handles images up to 5MB efficiently. For larger
              images, consider using command-line tools like <code>base64</code>.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Encode your images now
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Free Base64 encoding and decoding tool — no sign-up required.
        </p>
        <Link
          href="/en/tools/base64-encode-online"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Open Base64 Encoder →
        </Link>
      </div>
    </div>
  );
}
