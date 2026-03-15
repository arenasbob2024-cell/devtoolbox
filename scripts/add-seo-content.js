const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'i18n', 'dictionaries', 'en.json');
const en = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const missing = Object.keys(en.tools).filter(t => !en.tools[t].howToUseSteps);
console.log(`Found ${missing.length} tools missing howToUseSteps`);

// Classify tool by examining name and description
function classifyTool(name, desc) {
  const n = (name + ' ' + desc).toLowerCase();
  if (n.includes('converter') || n.includes('convert') || n.includes(' to ')) return 'converter';
  if (n.includes('generator') || n.includes('generate') || n.includes('builder')) return 'generator';
  if (n.includes('formatter') || n.includes('format') || n.includes('beautif')) return 'formatter';
  if (n.includes('encoder') || n.includes('decoder') || n.includes('encode') || n.includes('decode')) return 'encoder';
  if (n.includes('editor') || n.includes('edit')) return 'editor';
  if (n.includes('validator') || n.includes('validate')) return 'validator';
  if (n.includes('tester') || n.includes('test')) return 'tester';
  if (n.includes('checker') || n.includes('check')) return 'checker';
  if (n.includes('viewer') || n.includes('preview') || n.includes('visuali')) return 'viewer';
  if (n.includes('lookup') || n.includes('search') || n.includes('reference')) return 'lookup';
  if (n.includes('compressor') || n.includes('compress') || n.includes('optimi')) return 'compressor';
  if (n.includes('counter') || n.includes('count') || n.includes('statistic')) return 'counter';
  if (n.includes('obfuscat')) return 'obfuscator';
  if (n.includes('playground') || n.includes('interactive')) return 'playground';
  if (n.includes('repeater')) return 'generator';
  return 'tool';
}

function getSteps(type, name) {
  const steps = {
    converter: [
      `Paste or upload your input data into the ${name} input area`,
      "Select the desired output format or conversion options",
      "Click Convert to transform your data instantly",
      "Copy the converted result or download the output file"
    ],
    generator: [
      `Configure your ${name} settings and parameters`,
      "Adjust options to customize the output to your needs",
      "Click Generate to create your output",
      "Copy the generated result or download it for use"
    ],
    formatter: [
      `Paste your code or data into the ${name} input area`,
      "Select your preferred formatting options",
      "Click Format to beautify and structure your code",
      "Copy the formatted output using the copy button"
    ],
    encoder: [
      `Paste your input text or data into the ${name}`,
      "Choose between encode or decode mode",
      "Click the action button to process your data",
      "Copy the encoded or decoded result"
    ],
    editor: [
      `Open or paste your content in the ${name}`,
      "Use the editing tools and options to modify your content",
      "Preview your changes in real time",
      "Copy or export the final result"
    ],
    validator: [
      `Paste your data into the ${name} input area`,
      "Click Validate to check your data against the rules",
      "Review any errors or warnings shown in the results",
      "Fix issues based on the detailed error messages provided"
    ],
    tester: [
      `Enter your input or configuration in the ${name}`,
      "Set up test parameters and options as needed",
      "Click Test or Run to execute the test",
      "Review the results and output details"
    ],
    checker: [
      `Enter your values into the ${name}`,
      "Configure any checking options or thresholds",
      "Click Check to analyze your input",
      "Review the detailed results and recommendations"
    ],
    viewer: [
      `Paste or upload your data into the ${name}`,
      "The tool will automatically render a visual preview",
      "Interact with the visualization to explore your data",
      "Export or copy the results as needed"
    ],
    lookup: [
      `Enter your search query in the ${name}`,
      "Browse or filter the results to find what you need",
      "Click on an entry to see detailed information",
      "Copy the relevant details for your use"
    ],
    compressor: [
      `Upload or paste your file into the ${name}`,
      "Adjust compression quality and settings",
      "Click Compress to reduce the file size",
      "Download the compressed output"
    ],
    counter: [
      `Paste or type your text into the ${name}`,
      "The tool will automatically analyze your input",
      "Review the detailed statistics and counts",
      "Use the insights for your content optimization"
    ],
    obfuscator: [
      `Paste your code into the ${name} input area`,
      "Configure obfuscation level and options",
      "Click Obfuscate to protect your code",
      "Copy the obfuscated output for deployment"
    ],
    playground: [
      `Open the ${name} and explore the interactive controls`,
      "Adjust properties and values using the visual interface",
      "See real-time changes reflected in the preview",
      "Copy the generated CSS code for your project"
    ],
    tool: [
      `Open the ${name} and enter your input data`,
      "Configure the available options to suit your needs",
      "Click the action button to process your data",
      "Copy or download the output result"
    ]
  };
  return steps[type] || steps.tool;
}

function getUseCases(toolId, name, desc) {
  const n = (name + ' ' + desc + ' ' + toolId).toLowerCase();

  // Tool-specific use cases based on keywords
  const useCaseMap = {
    'hash': [
      "Verifying file integrity after downloads or transfers",
      "Generating checksums for data validation",
      "Comparing hash values to detect file modifications",
      "Creating password hashes for secure storage"
    ],
    'text-converter': [
      "Converting text between uppercase, lowercase, and title case",
      "Formatting text for consistent styling in documents",
      "Preparing text for code variable naming conventions",
      "Batch converting text cases for content management"
    ],
    'git': [
      "Looking up Git commands quickly during development",
      "Learning new Git workflows and techniques",
      "Finding the right Git command for complex operations",
      "Teaching Git to team members with clear examples"
    ],
    'json-to-go': [
      "Converting API JSON responses to Go struct definitions",
      "Generating type-safe Go code from JSON data",
      "Speeding up Go backend development with auto-generated structs",
      "Creating Go models from JSON configuration files"
    ],
    'json-to-python': [
      "Converting API responses to Python dataclass definitions",
      "Generating Pydantic models from JSON schemas",
      "Creating TypedDict definitions for type-safe Python code",
      "Speeding up Python development with auto-generated models"
    ],
    'css-unit': [
      "Converting pixel values to rem for responsive design",
      "Switching between em and px for typography",
      "Calculating viewport-based units from pixel values",
      "Building consistent spacing systems with unit conversions"
    ],
    'json-to-dart': [
      "Converting API JSON responses to Dart/Flutter classes",
      "Generating type-safe Flutter model classes automatically",
      "Creating serializable Dart objects from JSON data",
      "Speeding up Flutter app development with auto-generated code"
    ],
    'htaccess': [
      "Setting up URL redirects for website migration",
      "Configuring custom error pages for Apache servers",
      "Enabling GZIP compression via .htaccess rules",
      "Setting up security headers and access controls"
    ],
    'docker': [
      "Creating Docker Compose configurations for multi-container apps",
      "Setting up development environments with Docker",
      "Configuring service dependencies and networking",
      "Generating production-ready Docker configurations"
    ],
    'protobuf': [
      "Converting JSON API schemas to Protobuf definitions",
      "Generating .proto files from existing JSON data",
      "Migrating from JSON APIs to gRPC with Protobuf",
      "Creating Protocol Buffer message types from sample data"
    ],
    'csp': [
      "Creating Content Security Policy headers for web applications",
      "Preventing XSS attacks with proper CSP directives",
      "Configuring CSP for sites with third-party scripts",
      "Testing and debugging Content Security Policy rules"
    ],
    'cron': [
      "Building cron expressions for scheduled tasks",
      "Understanding complex cron schedules in plain English",
      "Setting up automated backup schedules",
      "Creating recurring job schedules for CI/CD pipelines"
    ],
    'yaml': [
      "Converting YAML configuration to JSON for API consumption",
      "Formatting and validating YAML config files",
      "Converting JSON data to YAML for Kubernetes configs",
      "Editing and validating YAML with real-time feedback"
    ],
    'hex': [
      "Converting color codes between hex and RGB formats",
      "Debugging hexadecimal data in network protocols",
      "Converting hex values for embedded systems programming",
      "Working with hex color values in CSS and design tools"
    ],
    'rgb': [
      "Converting hex color codes to RGB values for CSS",
      "Finding exact RGB values from design mockups",
      "Adjusting color values for accessibility compliance",
      "Converting between color formats for different platforms"
    ],
    'octal': [
      "Converting Unix file permissions between octal and decimal",
      "Working with octal numbers in low-level programming",
      "Understanding chmod permission values",
      "Converting between number systems for CS coursework"
    ],
    'roman': [
      "Converting dates to Roman numerals for formal documents",
      "Decoding Roman numerals found in historical texts",
      "Adding Roman numeral formatting to applications",
      "Creating Roman numeral chapter or section numbers"
    ],
    'byte': [
      "Converting file sizes between KB, MB, GB, and TB",
      "Calculating storage requirements for projects",
      "Understanding bandwidth and data transfer sizes",
      "Converting between binary and decimal byte units"
    ],
    'ascii': [
      "Looking up ASCII codes for special characters",
      "Converting between ASCII values and characters",
      "Debugging character encoding issues in applications",
      "Working with ASCII art and text-based graphics"
    ],
    'binary': [
      "Converting text to binary for educational purposes",
      "Debugging binary data in network communications",
      "Understanding binary encoding of text characters",
      "Converting binary strings back to readable text"
    ],
    'fraction': [
      "Converting fractions to decimals for calculations",
      "Simplifying fractions to their lowest terms",
      "Converting decimal results back to fractions",
      "Working with mixed numbers and improper fractions"
    ],
    'scientific': [
      "Converting large numbers to scientific notation",
      "Converting scientific notation to standard form",
      "Working with very small or very large measurements",
      "Formatting numbers for scientific papers and reports"
    ],
    'color': [
      "Converting CSS color names to hex codes for styling",
      "Finding color values across different color formats",
      "Looking up named colors for web development",
      "Building consistent color palettes for design systems"
    ],
    'text-repeater': [
      "Generating repeated text patterns for testing layouts",
      "Creating placeholder content for UI development",
      "Generating test data with repeated strings",
      "Building text patterns for regex testing"
    ],
    'em-px': [
      "Converting pixel values to em for responsive typography",
      "Building scalable CSS with em and rem units",
      "Calculating relative units from pixel-based designs",
      "Ensuring consistent sizing across different screen sizes"
    ],
    'ip': [
      "Converting IP addresses to binary for network analysis",
      "Understanding subnet masks in binary format",
      "Debugging network configurations and routing",
      "Learning about IP address structure and classes"
    ],
    'timestamp': [
      "Converting Unix timestamps from API responses to dates",
      "Generating timestamps for database queries",
      "Debugging time-related issues in applications",
      "Converting between time zones and epoch time"
    ],
    'string-case': [
      "Converting variable names between coding conventions",
      "Transforming text to camelCase, snake_case, or kebab-case",
      "Standardizing naming conventions across codebases",
      "Preparing strings for different programming languages"
    ],
    'csv': [
      "Converting JSON API data to CSV for spreadsheet analysis",
      "Exporting structured data to CSV format",
      "Transforming JSON arrays into downloadable CSV files",
      "Preparing data for import into Excel or Google Sheets"
    ],
    'text-counter': [
      "Counting words and characters for content length requirements",
      "Analyzing text statistics for SEO optimization",
      "Checking reading time estimates for blog posts",
      "Monitoring character limits for social media posts"
    ],
    'text-case': [
      "Converting variable names between camelCase and snake_case",
      "Transforming text for consistent naming conventions",
      "Converting between PascalCase and kebab-case for code",
      "Batch converting text cases for code refactoring"
    ],
    'image-compress': [
      "Reducing image file sizes for faster web page loading",
      "Optimizing images for email attachments",
      "Compressing photos for social media uploads",
      "Batch compressing images for website optimization"
    ],
    'svg': [
      "Converting SVG icons to PNG for compatibility",
      "Exporting SVG graphics at specific resolutions",
      "Creating raster versions of vector graphics",
      "Generating PNG assets from SVG source files"
    ],
    'base64-image': [
      "Embedding images directly in HTML or CSS as Base64",
      "Converting images to data URIs for email templates",
      "Reducing HTTP requests by inlining small images",
      "Decoding Base64 image strings back to image files"
    ],
    'contrast': [
      "Checking text and background color accessibility compliance",
      "Ensuring WCAG AA and AAA contrast ratio requirements",
      "Testing color combinations for readability",
      "Auditing website designs for accessibility standards"
    ],
    'css-variables': [
      "Creating CSS custom property systems for design tokens",
      "Building theme-able CSS with custom properties",
      "Generating CSS variable declarations for color palettes",
      "Setting up consistent spacing and sizing variables"
    ],
    'xml': [
      "Converting JSON data to XML for legacy system integration",
      "Transforming API responses between JSON and XML formats",
      "Generating XML from JSON for SOAP web services",
      "Validating XML syntax and structure"
    ],
    'jwt': [
      "Generating JWT tokens for API authentication testing",
      "Creating signed tokens with custom claims and expiry",
      "Testing JWT-based authentication flows",
      "Building sample tokens for development and debugging"
    ],
    'markdown': [
      "Creating well-formatted Markdown tables for documentation",
      "Building tables for GitHub READMEs and wikis",
      "Converting tabular data to Markdown format",
      "Generating Markdown tables from structured data"
    ],
    'toml': [
      "Converting TOML config files to JSON for processing",
      "Transforming JSON data to TOML for Rust projects",
      "Editing and validating TOML configuration files",
      "Converting between TOML, JSON, and YAML formats"
    ],
    'json-schema': [
      "Validating API payloads against JSON Schema definitions",
      "Testing JSON data structure compliance",
      "Debugging schema validation errors in applications",
      "Verifying JSON documents meet specification requirements"
    ],
    'http-status': [
      "Looking up HTTP status codes and their meanings",
      "Understanding API error responses quickly",
      "Finding the right status code for REST API endpoints",
      "Learning about HTTP response codes for web development"
    ],
    'qr': [
      "Generating QR codes for URLs and website links",
      "Creating QR codes for business cards and marketing",
      "Encoding contact information into scannable QR codes",
      "Generating QR codes for WiFi network credentials"
    ],
    'border-radius': [
      "Creating custom border-radius shapes for UI elements",
      "Designing rounded corners with visual CSS preview",
      "Generating organic blob shapes with border-radius",
      "Building consistent corner radius values for design systems"
    ],
    'epoch': [
      "Converting epoch timestamps from logs and databases",
      "Generating Unix timestamps for API parameters",
      "Debugging time-related bugs with epoch conversion",
      "Converting human-readable dates to Unix timestamps"
    ],
    'swift': [
      "Converting JSON API responses to Swift Codable structs",
      "Generating type-safe Swift models from JSON data",
      "Creating Codable structures for iOS app development",
      "Speeding up Swift development with auto-generated types"
    ],
    'graphql': [
      "Formatting and beautifying GraphQL queries and mutations",
      "Cleaning up auto-generated GraphQL operations",
      "Making GraphQL schemas more readable for documentation",
      "Standardizing GraphQL query formatting across teams"
    ],
    'php': [
      "Converting JSON data to PHP arrays for backend processing",
      "Generating PHP class definitions from JSON structures",
      "Transforming API JSON responses to PHP data types",
      "Creating PHP models from JSON configuration data"
    ],
    'pug': [
      "Converting HTML templates to Pug syntax",
      "Migrating existing HTML to Pug for cleaner templates",
      "Learning Pug syntax by converting familiar HTML",
      "Transforming HTML snippets to Pug for Node.js projects"
    ],
    'zod': [
      "Converting TypeScript types to Zod validation schemas",
      "Generating runtime type validation from TypeScript definitions",
      "Creating Zod schemas for form validation",
      "Building type-safe API validation with Zod"
    ],
    'mongodb': [
      "Converting SQL queries to MongoDB query syntax",
      "Migrating database queries from SQL to MongoDB",
      "Learning MongoDB query language from SQL knowledge",
      "Translating complex SQL joins to MongoDB aggregations"
    ],
    'env': [
      "Converting .env files to JSON for configuration management",
      "Transforming environment variables to JSON format",
      "Parsing .env files for application configuration",
      "Exporting environment variables in JSON structure"
    ],
    'regex': [
      "Understanding complex regex patterns in plain English",
      "Debugging regular expressions with visual highlighting",
      "Learning regex syntax through pattern explanation",
      "Testing regular expressions against sample text"
    ],
    'form': [
      "Generating HTML forms from JSON schema definitions",
      "Creating form prototypes quickly from data structures",
      "Building HTML forms from API response schemas",
      "Automating form creation from JSON configurations"
    ],
    'graphql-schema': [
      "Converting JSON data to GraphQL type definitions",
      "Generating GraphQL schemas from sample JSON responses",
      "Creating GraphQL types from existing API data",
      "Building GraphQL schemas quickly from JSON structures"
    ],
    'openapi': [
      "Converting OpenAPI specs to TypeScript client code",
      "Generating type-safe API clients from Swagger definitions",
      "Creating TypeScript interfaces from OpenAPI schemas",
      "Building typed API wrappers from OpenAPI documentation"
    ],
    'base32': [
      "Encoding data in Base32 format for TOTP/2FA secrets",
      "Decoding Base32 strings from authentication systems",
      "Converting between Base32 and plain text",
      "Working with Base32 encoded data in security applications"
    ],
    'sql': [
      "Converting JSON data arrays to SQL INSERT statements",
      "Generating SQL from JSON for database seeding",
      "Creating SQL insert scripts from JSON data exports",
      "Transforming API data to SQL for database import"
    ],
    'scss': [
      "Converting SCSS/Sass code to plain CSS for compatibility",
      "Generating browser-ready CSS from SCSS source",
      "Previewing compiled CSS output from SCSS code",
      "Learning CSS output from SCSS nesting and variables"
    ],
    'diff': [
      "Comparing two versions of code to find differences",
      "Reviewing text changes with visual diff highlighting",
      "Spotting configuration file changes between versions",
      "Debugging by comparing expected vs actual output"
    ],
    'api': [
      "Testing REST API endpoints directly in the browser",
      "Debugging API responses with custom headers and body",
      "Sending HTTP requests without Postman or cURL",
      "Quick API testing during frontend development"
    ],
    'gradient': [
      "Creating custom CSS gradient backgrounds visually",
      "Generating linear and radial gradient CSS code",
      "Designing color gradient combinations for web design",
      "Building gradient-based UI components with CSS"
    ],
    'scala': [
      "Converting JSON data to Scala case class definitions",
      "Generating type-safe Scala models from JSON responses",
      "Creating serializable Scala objects from JSON data",
      "Speeding up Scala development with auto-generated classes"
    ],
    'morse': [
      "Converting text messages to Morse code",
      "Decoding Morse code back to readable text",
      "Learning Morse code with interactive conversion",
      "Encoding messages in Morse for educational purposes"
    ],
    'png-to-jpg': [
      "Converting PNG images to JPG for smaller file sizes",
      "Batch converting image formats for web optimization",
      "Removing PNG transparency by converting to JPG",
      "Converting screenshots from PNG to JPG format"
    ],
    'base58': [
      "Encoding data in Base58 for cryptocurrency addresses",
      "Decoding Base58 encoded blockchain data",
      "Working with Bitcoin address encoding",
      "Converting between Base58 and plain text formats"
    ],
    'css-selector': [
      "Testing CSS selectors against sample HTML markup",
      "Learning CSS selector syntax with instant feedback",
      "Debugging CSS selectors that aren't matching elements",
      "Validating complex CSS selectors before deployment"
    ],
    'curl': [
      "Converting cURL commands to Python, JavaScript, or Go code",
      "Translating API cURL examples to your programming language",
      "Generating fetch or axios code from cURL commands",
      "Converting browser-copied cURL to usable code snippets"
    ],
    'rust': [
      "Converting JSON data to Rust struct definitions with serde",
      "Generating type-safe Rust models from API JSON responses",
      "Creating serializable Rust structs from JSON data",
      "Speeding up Rust development with auto-generated types"
    ],
    'tailwind': [
      "Converting Tailwind utility classes to vanilla CSS",
      "Understanding what CSS Tailwind classes generate",
      "Migrating from Tailwind to plain CSS",
      "Learning CSS equivalents of Tailwind utility classes"
    ],
    'text-to-ascii-art': [
      "Creating ASCII art banners for terminal applications",
      "Generating text-based logos for CLI tools",
      "Making ASCII art headings for code comments",
      "Creating visual text art for README files"
    ],
    'shadow': [
      "Creating custom CSS box-shadow effects visually",
      "Designing layered shadow effects for UI cards",
      "Generating text-shadow CSS for typography effects",
      "Building elevation-based shadow systems for design"
    ],
    'crontab': [
      "Editing crontab entries with a visual interface",
      "Understanding when cron jobs will next execute",
      "Building complex cron schedules with presets",
      "Managing and organizing multiple cron job entries"
    ],
    'sql-to-json': [
      "Converting SQL CREATE TABLE statements to JSON Schema",
      "Generating JSON schemas from database table definitions",
      "Transforming SQL DDL to JSON for documentation",
      "Creating API schemas from existing database structures"
    ],
    'http-method': [
      "Testing HTTP GET, POST, PUT, DELETE requests in browser",
      "Debugging API endpoints with custom headers and body",
      "Sending HTTP requests with different methods and payloads",
      "Testing API responses without external tools"
    ],
    'markdown-to-pdf': [
      "Converting Markdown documents to print-ready PDF format",
      "Creating styled PDF reports from Markdown source",
      "Previewing Markdown as formatted print output",
      "Exporting documentation from Markdown to PDF"
    ],
    'svg-editor': [
      "Editing SVG code with live visual preview",
      "Tweaking SVG icons and graphics in real time",
      "Learning SVG syntax with instant visual feedback",
      "Creating and modifying SVG illustrations"
    ],
    'obfuscat': [
      "Protecting JavaScript source code from reverse engineering",
      "Obfuscating client-side JS before deployment",
      "Making JavaScript code harder to read and copy",
      "Adding code protection layer for production JavaScript"
    ],
    'clip-path': [
      "Creating custom CSS clip-path shapes visually",
      "Designing polygon and circle clip-path effects",
      "Building creative image masks with CSS clip-path",
      "Generating CSS clip-path code for UI elements"
    ],
    'xml-validator': [
      "Validating XML document syntax and structure",
      "Finding errors in XML configuration files",
      "Checking XML well-formedness before processing",
      "Debugging XML parsing issues in applications"
    ],
    'filter': [
      "Creating CSS filter effects like blur, brightness, and contrast",
      "Designing image filter combinations visually",
      "Generating CSS filter code for photo effects",
      "Building Instagram-style filters with CSS"
    ],
    'nginx': [
      "Generating Nginx server block configurations",
      "Setting up reverse proxy configurations for Nginx",
      "Creating SSL/HTTPS Nginx configurations",
      "Building Nginx configs for static sites and SPAs"
    ],
    'dockerfile': [
      "Generating Dockerfiles for various application types",
      "Creating optimized multi-stage Docker build files",
      "Building Dockerfile templates for different languages",
      "Setting up containerized application configurations"
    ],
    'transition': [
      "Creating CSS transition effects with visual preview",
      "Designing smooth animation transitions for UI elements",
      "Generating CSS transition timing function code",
      "Building hover and state transition effects"
    ],
    'api-response': [
      "Generating mock API response data for frontend development",
      "Creating sample JSON responses for API prototyping",
      "Building test data for API integration testing",
      "Mocking API endpoints during development"
    ],
    'entity': [
      "Encoding special characters as HTML entities",
      "Decoding HTML entities back to readable text",
      "Converting symbols to HTML entity codes",
      "Fixing HTML entity encoding issues in content"
    ],
    'flexbox': [
      "Learning CSS flexbox layout with interactive controls",
      "Experimenting with flex container and item properties",
      "Building complex layouts using flexbox visually",
      "Generating CSS flexbox code for responsive designs"
    ],
    'jsonpath': [
      "Testing JSONPath expressions against JSON data",
      "Extracting specific values from complex JSON structures",
      "Debugging JSONPath queries for data processing",
      "Learning JSONPath syntax with interactive examples"
    ],
    'webhook': [
      "Testing webhook endpoints before going to production",
      "Inspecting incoming webhook payloads and headers",
      "Debugging webhook integrations with third-party services",
      "Verifying webhook delivery and payload format"
    ],
    'text-shadow': [
      "Creating CSS text-shadow effects visually",
      "Designing 3D text effects with multiple shadows",
      "Generating text-shadow CSS for neon glow effects",
      "Building typography effects with CSS text-shadow"
    ],
    'geolocation': [
      "Looking up geographic location of IP addresses",
      "Finding country, city, and ISP of an IP address",
      "Debugging geo-targeting by checking IP location",
      "Verifying VPN and proxy server locations"
    ],
    'svg-to-css': [
      "Converting SVG icons to CSS background-image data URIs",
      "Embedding SVG graphics directly in CSS files",
      "Reducing HTTP requests by inlining SVG in CSS",
      "Creating CSS-only icon systems from SVG files"
    ],
    'cron-job': [
      "Building cron expressions with an interactive visual editor",
      "Creating scheduled task configurations with presets",
      "Understanding cron syntax with human-readable descriptions",
      "Setting up automated job schedules for servers"
    ],
    'css-units': [
      "Converting between CSS units like px, rem, em, and vw",
      "Calculating responsive unit values from pixel designs",
      "Understanding CSS unit relationships and conversions",
      "Building consistent sizing with relative CSS units"
    ]
  };

  // Find matching key
  for (const [key, cases] of Object.entries(useCaseMap)) {
    if (n.includes(key)) return cases;
  }

  // Fallback: generate generic use cases from description
  return [
    `Processing and transforming data with ${name}`,
    `Automating repetitive tasks in your development workflow`,
    `Debugging and testing during software development`,
    `Learning and exploring ${name.toLowerCase().replace(/converter|generator|formatter|tool/gi, '').trim()} concepts`
  ];
}

function getFaqs(toolId, name, desc, type) {
  const n = (name + ' ' + desc + ' ' + toolId).toLowerCase();
  const safeName = name;

  // Common FAQ patterns
  const baseFaqs = [
    {
      q: `Is ${safeName} free to use?`,
      a: `Yes, ${safeName} is completely free with no signup required. You can use it as many times as you need.`
    },
    {
      q: `Is my data safe when using ${safeName}?`,
      a: `Absolutely. All processing happens directly in your browser. Your data is never sent to any server or stored anywhere.`
    }
  ];

  // Type-specific FAQs
  const typeFaqs = {
    converter: [
      {
        q: `What formats does ${safeName} support?`,
        a: `${safeName} supports the formats described above. Simply paste your input data and the tool will handle the conversion automatically.`
      },
      {
        q: `Can I convert large files?`,
        a: `Yes, since all processing happens in your browser, you can convert files of any reasonable size. Very large files may take a moment to process.`
      },
      {
        q: `Will the conversion preserve my data accurately?`,
        a: `Yes, the conversion is lossless and preserves all data accurately. The tool handles edge cases and special characters properly.`
      }
    ],
    generator: [
      {
        q: `Can I customize the generated output?`,
        a: `Yes, ${safeName} provides various configuration options to customize the output to match your specific requirements.`
      },
      {
        q: `Can I use the generated output in my projects?`,
        a: `Yes, all generated output is free to use in any personal or commercial project without attribution.`
      },
      {
        q: `Does the generator handle edge cases?`,
        a: `Yes, ${safeName} is designed to handle common edge cases and produce valid, standards-compliant output.`
      }
    ],
    formatter: [
      {
        q: `What formatting options are available?`,
        a: `${safeName} supports multiple formatting options including indentation levels, line wrapping, and style preferences.`
      },
      {
        q: `Does formatting change the functionality of my code?`,
        a: `No, formatting only changes the visual presentation. The functionality and logic of your code remain exactly the same.`
      },
      {
        q: `Can I undo the formatting?`,
        a: `You can paste your original code again at any time. The tool doesn't modify your source files, only the displayed output.`
      }
    ],
    encoder: [
      {
        q: `What is the difference between encoding and decoding?`,
        a: `Encoding converts data into a specific format for safe transmission or storage. Decoding reverses this process to retrieve the original data.`
      },
      {
        q: `Can I encode and decode in both directions?`,
        a: `Yes, ${safeName} supports both encoding and decoding. Simply switch between modes to convert in either direction.`
      },
      {
        q: `Is the encoding reversible?`,
        a: `Yes, the encoding used by ${safeName} is fully reversible. You can decode any encoded string back to its original form.`
      }
    ],
    editor: [
      {
        q: `Can I save my work?`,
        a: `You can copy the output or download it. The editor runs in your browser, so content is not persisted between sessions.`
      },
      {
        q: `Does the editor support syntax highlighting?`,
        a: `Yes, ${safeName} provides syntax highlighting and real-time validation to help you write correct code.`
      },
      {
        q: `Can I import existing files?`,
        a: `Yes, you can paste content directly into the editor or use the import feature if available.`
      }
    ],
    validator: [
      {
        q: `What validation rules are checked?`,
        a: `${safeName} checks against the official specification and reports syntax errors, structural issues, and common mistakes.`
      },
      {
        q: `Can I validate large documents?`,
        a: `Yes, validation happens in your browser and can handle documents of any reasonable size efficiently.`
      },
      {
        q: `Does it show where errors are located?`,
        a: `Yes, ${safeName} highlights the exact location of errors and provides descriptive messages to help you fix them.`
      }
    ],
    tester: [
      {
        q: `Do I need to install anything?`,
        a: `No installation is needed. ${safeName} runs entirely in your browser and is ready to use immediately.`
      },
      {
        q: `Can I save or share test results?`,
        a: `You can copy the results from the output area. All testing happens locally in your browser for maximum privacy.`
      },
      {
        q: `Are there any rate limits?`,
        a: `No, since processing happens in your browser, there are no rate limits or usage restrictions.`
      }
    ],
    checker: [
      {
        q: `What standards does this checker use?`,
        a: `${safeName} checks against widely-accepted industry standards and best practices to provide reliable results.`
      },
      {
        q: `How accurate are the results?`,
        a: `The checker uses standard algorithms and specifications, providing highly accurate results you can rely on.`
      },
      {
        q: `Can I check multiple items at once?`,
        a: `The tool is designed for checking one item at a time to provide detailed, focused feedback.`
      }
    ]
  };

  const specificFaqs = typeFaqs[type] || typeFaqs.converter;
  return [...baseFaqs, ...specificFaqs];
}

// Process each missing tool
for (const toolId of missing) {
  const tool = en.tools[toolId];
  const name = tool.name || toolId;
  const desc = tool.description || '';
  const type = classifyTool(name, desc);

  tool.howToUseTitle = `How to Use ${name}`;
  tool.howToUseSteps = getSteps(type, name);
  tool.useCasesTitle = "Common Use Cases";
  tool.useCases = getUseCases(toolId, name, desc);
  tool.faqTitle = "Frequently Asked Questions";
  tool.faqs = getFaqs(toolId, name, desc, type);

  console.log(`  ✓ ${toolId} (${type})`);
}

// Write back
fs.writeFileSync(filePath, JSON.stringify(en, null, 2) + '\n', 'utf8');
console.log(`\nDone! Updated ${missing.length} tools in en.json`);
