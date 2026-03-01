#!/usr/bin/env python3
"""
Generate dictionary entries for DevToolBox tools.
Reads missing_tools.txt and generates complete dictionary entries for each tool.
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Any


# Tool definitions with metadata for generating dictionary entries
TOOL_DEFINITIONS: Dict[str, Dict[str, Any]] = {
    "ascii-art-generator": {
        "name": "ASCII Art Generator",
        "description": "Convert text to ASCII art with various fonts and styles",
        "function": "Create ASCII Art",
        "category": "text",
        "steps": [
            "Enter your text in the input field",
            "Select your preferred font style from the dropdown",
            "Adjust width and other formatting options if needed",
            "Copy the generated ASCII art to use anywhere"
        ],
        "use_cases": [
            "Creating decorative headers for README files",
            "Adding visual flair to code comments",
            "Generating text-based logos and banners",
            "Creating fun messages for terminal output"
        ],
        "faqs": [
            {
                "q": "What is ASCII art?",
                "a": "ASCII art is a graphic design technique that uses printable characters from the ASCII standard to create images and decorative text."
            },
            {
                "q": "How many font styles are available?",
                "a": "The tool offers multiple font styles including block, bubble, digital, and decorative fonts to suit different needs."
            },
            {
                "q": "Can I use ASCII art in my code?",
                "a": "Yes. ASCII art is plain text and works in any text editor, terminal, code comment, or documentation file."
            }
        ]
    },
    "ascii-table-generator": {
        "name": "ASCII Table Generator",
        "description": "Generate ASCII tables from CSV, JSON, or tabular data",
        "function": "Generate ASCII Tables",
        "category": "text",
        "steps": [
            "Paste your CSV, JSON, or tabular data into the input",
            "Choose table style (grid, simple, markdown-compatible)",
            "Adjust column alignment and padding options",
            "Copy the generated ASCII table for documentation"
        ],
        "use_cases": [
            "Creating tables in plain text documentation",
            "Formatting data for README files",
            "Displaying tabular data in terminal output",
            "Converting spreadsheet data to text format"
        ],
        "faqs": [
            {
                "q": "What data formats are supported?",
                "a": "The tool accepts CSV (comma-separated values), JSON arrays, and plain text with tab or space-separated columns."
            },
            {
                "q": "Can I customize the table appearance?",
                "a": "Yes. Choose from multiple table styles including grid borders, simple lines, or Markdown-compatible formats."
            },
            {
                "q": "Will the table alignment be preserved?",
                "a": "Yes. The tool automatically aligns columns based on content type (numbers right-aligned, text left-aligned) for readability."
            }
        ]
    },
    "base64-decode": {
        "name": "Base64 Decode",
        "description": "Decode Base64 encoded text back to plain text",
        "function": "Decode Base64",
        "category": "encoder",
        "steps": [
            "Paste your Base64 encoded string in the input field",
            "The tool automatically detects and decodes the content",
            "View the decoded plain text output",
            "Copy the result to your clipboard"
        ],
        "use_cases": [
            "Decoding API response data",
            "Reading encoded configuration values",
            "Debugging encoded email attachments",
            "Extracting data from JWT token payloads"
        ],
        "faqs": [
            {
                "q": "What is Base64 decoding?",
                "a": "Base64 decoding converts Base64-encoded text back to its original binary or text format. It's the reverse of Base64 encoding."
            },
            {
                "q": "Why does my decoded text look strange?",
                "a": "The original data might be binary (like images) or use a different character encoding. Try the Base64 Image Decoder for image data."
            },
            {
                "q": "Is this tool safe for sensitive data?",
                "a": "Yes. All decoding happens locally in your browser. Your data is never sent to any server."
            }
        ]
    },
    "base64-decoder": {
        "name": "Base64 Decoder",
        "description": "Fast Base64 decoder for text and binary data",
        "function": "Decode Base64 Data",
        "category": "encoder",
        "steps": [
            "Enter the Base64 string you want to decode",
            "Click the Decode button to process",
            "View the decoded output in text or hex format",
            "Download or copy the decoded result"
        ],
        "use_cases": [
            "Decoding authentication tokens",
            "Extracting embedded data from APIs",
            "Converting encoded files back to original format",
            "Debugging data transmission issues"
        ],
        "faqs": [
            {
                "q": "What's the difference between Base64 decode and decoder?",
                "a": "This decoder offers additional features like hex output view and file download support for binary data."
            },
            {
                "q": "Can I decode large Base64 strings?",
                "a": "Yes. The tool handles large inputs efficiently, all processing is done locally in your browser."
            },
            {
                "q": "Does it validate the Base64 input?",
                "a": "Yes. The tool checks for valid Base64 format and reports any errors with the input data."
            }
        ]
    },
    "base64-decoder-online": {
        "name": "Base64 Decoder Online",
        "description": "Free online Base64 decoder with instant results",
        "function": "Decode Base64 Online",
        "category": "encoder",
        "steps": [
            "Paste your Base64 encoded data into the input box",
            "The decoder processes automatically in real-time",
            "View the decoded text instantly below",
            "Use the copy button to save the result"
        ],
        "use_cases": [
            "Quick decoding without installing software",
            "Decoding data on mobile devices",
            "Sharing decoded results with team members",
            "Learning how Base64 encoding works"
        ],
        "faqs": [
            {
                "q": "Is this decoder free to use?",
                "a": "Yes, completely free. No registration, no limits, no hidden fees."
            },
            {
                "q": "Do I need to install anything?",
                "a": "No. This is a web-based tool that works in any modern browser without installation."
            },
            {
                "q": "Can I decode on my phone?",
                "a": "Yes. The tool is fully responsive and works on desktop, tablet, and mobile devices."
            }
        ]
    },
    "base64-encode-online": {
        "name": "Base64 Encode Online",
        "description": "Free online Base64 encoder for text and files",
        "function": "Encode to Base64 Online",
        "category": "encoder",
        "steps": [
            "Type or paste the text you want to encode",
            "The encoding happens automatically as you type",
            "View the Base64 output in real-time",
            "Copy the encoded result with one click"
        ],
        "use_cases": [
            "Encoding data for URL parameters",
            "Preparing data for API requests",
            "Encoding configuration values",
            "Creating data URIs for embedding"
        ],
        "faqs": [
            {
                "q": "What can I encode with this tool?",
                "a": "You can encode any text string, including special characters, Unicode text, and emojis."
            },
            {
                "q": "Is there a size limit?",
                "a": "There's no strict limit, but very large inputs (over 1MB) may affect browser performance."
            },
            {
                "q": "Can I encode binary files?",
                "a": "For files, use the Image to Base64 converter tool which supports drag-and-drop file uploads."
            }
        ]
    },
    "base64-encoder": {
        "name": "Base64 Encoder",
        "description": "Encode text to Base64 format",
        "function": "Text to Base64",
        "category": "encoder",
        "steps": [
            "Enter your plain text in the input field",
            "Click the Encode button to convert",
            "The Base64 encoded string appears in the output",
            "Copy or download the encoded result"
        ],
        "use_cases": [
            "Encoding passwords for basic auth headers",
            "Preparing data for email transmission",
            "Encoding API credentials",
            "Creating URL-safe data strings"
        ],
        "faqs": [
            {
                "q": "What is Base64 encoding used for?",
                "a": "Base64 encoding converts binary data to ASCII text, making it safe to transmit over text-based protocols like HTTP and email."
            },
            {
                "q": "Does encoding make data secure?",
                "a": "No. Base64 is encoding, not encryption. Anyone can decode it. For security, use encryption tools."
            },
            {
                "q": "Why does encoded data look longer?",
                "a": "Base64 encoding increases data size by about 33% because it represents 3 bytes of binary data as 4 ASCII characters."
            }
        ]
    },
    "base64-encoder-decoder": {
        "name": "Base64 Encoder/Decoder",
        "description": "Encode and decode Base64 in one tool with bidirectional conversion",
        "function": "Base64 Encode & Decode",
        "category": "encoder",
        "steps": [
            "Choose encode or decode mode",
            "Enter your text or Base64 string",
            "Click Convert to process",
            "Switch modes instantly to reverse the operation"
        ],
        "use_cases": [
            "Testing Base64 encoding/decoding",
            "Converting data back and forth",
            "Debugging API data formats",
            "Learning Base64 transformations"
        ],
        "faqs": [
            {
                "q": "Can I switch between encode and decode?",
                "a": "Yes. The tool supports both directions. You can encode text to Base64, then immediately decode it back."
            },
            {
                "q": "Does it preserve special characters?",
                "a": "Yes. Base64 encoding preserves all characters including Unicode, emojis, and special symbols."
            },
            {
                "q": "Is there an auto-detect feature?",
                "a": "Yes. The tool can attempt to auto-detect whether input is plain text or Base64 encoded data."
            }
        ]
    },
    "base64-image-decoder": {
        "name": "Base64 Image Decoder",
        "description": "Convert Base64 image data back to image files",
        "function": "Decode Base64 Images",
        "category": "encoder",
        "steps": [
            "Paste your Base64 image data (data:image/... format)",
            "The image preview appears automatically",
            "Click Download to save the image file",
            "Supported formats: PNG, JPG, GIF, SVG, WebP"
        ],
        "use_cases": [
            "Extracting images from CSS data URIs",
            "Decoding images embedded in emails",
            "Recovering images from API responses",
            "Converting embedded images to files"
        ],
        "faqs": [
            {
                "q": "What image formats are supported?",
                "a": "PNG, JPEG/JPG, GIF, SVG, WebP, ICO, and BMP are all supported for decoding."
            },
            {
                "q": "How do I get Base64 image data?",
                "a": "Copy the data URI from CSS, HTML img tags, or API responses. It starts with 'data:image/'."
            },
            {
                "q": "Will the image quality be preserved?",
                "a": "Yes. Base64 decoding is lossless — the output image is identical to the original encoded image."
            }
        ]
    },
    "base64-image-encoder": {
        "name": "Base64 Image Encoder",
        "description": "Convert images to Base64 data URIs for embedding",
        "function": "Images to Base64",
        "category": "encoder",
        "steps": [
            "Drag and drop an image or click to browse",
            "The image converts to Base64 automatically",
            "Copy the data URI or HTML/CSS code snippets",
            "Use the result in your projects"
        ],
        "use_cases": [
            "Embedding small icons in CSS",
            "Creating self-contained HTML emails",
            "Reducing HTTP requests for tiny images",
            "Storing images in JSON or databases"
        ],
        "faqs": [
            {
                "q": "What image types can I encode?",
                "a": "PNG, JPEG, GIF, SVG, WebP, ICO, and most other image formats your browser supports."
            },
            {
                "q": "Is there a file size limit?",
                "a": "No hard limit, but Base64 increases size by ~33%. Images under 10KB work best for embedding."
            },
            {
                "q": "When should I use Base64 images?",
                "a": "Use for very small images (icons, bullets) where the HTTP request overhead outweighs the size increase."
            }
        ]
    },
    "base64-to-hex": {
        "name": "Base64 to Hex Converter",
        "description": "Convert Base64 encoded data to hexadecimal format",
        "function": "Base64 to Hexadecimal",
        "category": "converter",
        "steps": [
            "Paste your Base64 string in the input field",
            "Click Convert to transform to hex",
            "View the hexadecimal output",
            "Copy the hex result for your use"
        ],
        "use_cases": [
            "Analyzing binary data structures",
            "Debugging encoded network packets",
            "Converting between encoding formats",
            "Inspecting file headers and magic bytes"
        ],
        "faqs": [
            {
                "q": "Why convert Base64 to hex?",
                "a": "Hexadecimal is easier to read for binary analysis and is commonly used in debugging, cryptography, and low-level programming."
            },
            {
                "q": "Can I convert hex back to Base64?",
                "a": "Yes. Use the hex to Base64 conversion option in the tool to reverse the process."
            },
            {
                "q": "Does the output include '0x' prefix?",
                "a": "You can choose whether to include '0x' prefixes or plain hex digits in the output options."
            }
        ]
    },
    "base64-to-image": {
        "name": "Base64 to Image",
        "description": "Convert Base64 image strings to viewable and downloadable images",
        "function": "Base64 to Image Converter",
        "category": "converter",
        "steps": [
            "Paste the Base64 image data or data URI",
            "The image renders instantly in the preview",
            "Right-click to save or use the download button",
            "Supports all major image formats"
        ],
        "use_cases": [
            "Viewing Base64 images from API logs",
            "Extracting images from data URIs in CSS",
            "Converting embedded email images",
            "Testing Base64 image encoding"
        ],
        "faqs": [
            {
                "q": "What input format is expected?",
                "a": "You can paste either raw Base64 data or a complete data URI (data:image/png;base64,...)."
            },
            {
                "q": "Can I see the image before downloading?",
                "a": "Yes. A live preview displays the image as soon as valid Base64 data is entered."
            },
            {
                "q": "What if the image doesn't display?",
                "a": "Check that the Base64 data is complete and valid. The tool will show an error message if the data is corrupted."
            }
        ]
    },
    "base64-vs-url-encoding": {
        "name": "Base64 vs URL Encoding",
        "description": "Compare Base64 and URL encoding with side-by-side examples",
        "function": "Encoding Comparison",
        "category": "encoder",
        "steps": [
            "Enter text to see both encoding methods",
            "Compare Base64 and URL-encoded outputs side-by-side",
            "Learn when to use each encoding type",
            "Copy either encoded result as needed"
        ],
        "use_cases": [
            "Understanding encoding differences",
            "Choosing the right encoding for APIs",
            "Learning web development concepts",
            "Debugging encoding-related bugs"
        ],
        "faqs": [
            {
                "q": "What's the difference between Base64 and URL encoding?",
                "a": "Base64 is for binary-to-text conversion. URL encoding (percent-encoding) makes strings safe for URLs by escaping special characters."
            },
            {
                "q": "Which should I use for URLs?",
                "a": "Use URL encoding for query parameters and URL paths. Use Base64 for encoding binary data or when you need a compact representation."
            },
            {
                "q": "Can I use both encodings together?",
                "a": "Yes. You can Base64 encode data, then URL encode the result for use in a URL parameter."
            }
        ]
    },
    "binary-to-hex-converter": {
        "name": "Binary to Hex Converter",
        "description": "Convert binary numbers to hexadecimal format",
        "function": "Binary to Hexadecimal",
        "category": "converter",
        "steps": [
            "Enter binary numbers (0s and 1s)",
            "The hex conversion appears automatically",
            "View decimal and octal conversions too",
            "Copy any base format you need"
        ],
        "use_cases": [
            "Programming low-level hardware interfaces",
            "Working with memory addresses",
            "Converting binary flags to readable hex",
            "Learning number base conversions"
        ],
        "faqs": [
            {
                "q": "How does binary to hex conversion work?",
                "a": "Each group of 4 binary digits maps to one hexadecimal digit (0-9, A-F), making hex a compact representation of binary."
            },
            {
                "q": "Can I convert hex back to binary?",
                "a": "Yes. The tool supports bidirectional conversion between binary, hex, decimal, and octal."
            },
            {
                "q": "Is there a limit on binary input length?",
                "a": "The tool handles binary strings of any practical length, from single bits to thousands of digits."
            }
        ]
    },
    "character-counter": {
        "name": "Character Counter",
        "description": "Count characters, words, and bytes in text",
        "function": "Count Characters",
        "category": "text",
        "steps": [
            "Paste or type your text in the input area",
            "View real-time character and word counts",
            "Check with-spaces and without-spaces counts",
            "See byte count for different encodings"
        ],
        "use_cases": [
            "Checking social media character limits",
            "Measuring content length for SEO",
            "Validating form input lengths",
            "Counting text for translation quotes"
        ],
        "faqs": [
            {
                "q": "What's the difference between characters and bytes?",
                "a": "Characters are what you see. Bytes are how they're stored. ASCII uses 1 byte per character, UTF-8 uses 1-4 bytes."
            },
            {
                "q": "Does it count spaces?",
                "a": "The tool shows both counts: with spaces (total characters) and without spaces (letters/numbers/symbols only)."
            },
            {
                "q": "Can I count non-English text?",
                "a": "Yes. The counter supports Unicode text in all languages, including CJK characters and emojis."
            }
        ]
    },
    "chmod-visualizer": {
        "name": "Chmod Visualizer",
        "description": "Visualize Linux file permissions with interactive diagrams",
        "function": "Visualize File Permissions",
        "category": "web",
        "steps": [
            "Adjust the permission sliders for owner, group, and others",
            "Watch the visual representation update in real-time",
            "See the numeric (755) and symbolic (rwxr-xr-x) notations",
            "Copy the chmod command for your terminal"
        ],
        "use_cases": [
            "Learning Linux permission concepts",
            "Setting up web server file permissions",
            "Understanding security implications",
            "Teaching file permission basics"
        ],
        "faqs": [
            {
                "q": "What does chmod stand for?",
                "a": "chmod stands for 'change mode'. It's a Unix/Linux command to modify file and directory permissions."
            },
            {
                "q": "What are the three permission groups?",
                "a": "Owner (the file creator), Group (users in the file's group), and Others (everyone else on the system)."
            },
            {
                "q": "What do r, w, and x mean?",
                "a": "r = read (view contents), w = write (modify contents), x = execute (run as a program or access directory)."
            }
        ]
    },
    "color-contrast-checker": {
        "name": "Color Contrast Checker",
        "description": "Check WCAG color contrast ratios for accessibility",
        "function": "Check Color Contrast",
        "category": "css",
        "steps": [
            "Select foreground and background colors",
            "View the contrast ratio calculation",
            "Check WCAG AA and AAA compliance levels",
            "Adjust colors until they pass accessibility standards"
        ],
        "use_cases": [
            "Ensuring text accessibility compliance",
            "Designing accessible websites",
            "Meeting WCAG 2.1 requirements",
            "Choosing readable color combinations"
        ],
        "faqs": [
            {
                "q": "What is WCAG contrast ratio?",
                "a": "WCAG recommends a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text (AA level). AAA requires 7:1 for normal text."
            },
            {
                "q": "What does AA and AAA mean?",
                "a": "AA is the minimum accessibility standard. AAA is the highest level, providing enhanced accessibility for users with vision impairments."
            },
            {
                "q": "Can I check colors from my website?",
                "a": "Yes. Use the color picker or enter hex/RGB values to check any color combination you're using."
            }
        ]
    },
    "color-palette-generator": {
        "name": "Color Palette Generator",
        "description": "Generate harmonious color palettes for design projects",
        "function": "Generate Color Palettes",
        "category": "css",
        "steps": [
            "Enter a base color or use the color picker",
            "Select a palette type (complementary, analogous, triadic, etc.)",
            "View generated colors with hex codes",
            "Export the palette in various formats"
        ],
        "use_cases": [
            "Creating website color schemes",
            "Designing brand identity colors",
            "Finding harmonious color combinations",
            "Generating UI theme palettes"
        ],
        "faqs": [
            {
                "q": "What palette types are available?",
                "a": "Complementary, analogous, triadic, tetradic, split-complementary, monochromatic, and custom harmony rules."
            },
            {
                "q": "Can I save my palettes?",
                "a": "You can copy the hex codes or export as CSS, SCSS, JSON, or image formats for your design tools."
            },
            {
                "q": "How are colors harmonized?",
                "a": "Colors are generated based on color wheel relationships, ensuring visual harmony and aesthetic appeal."
            }
        ]
    },
    "color-picker-online": {
        "name": "Color Picker Online",
        "description": "Pick colors and convert between HEX, RGB, HSL formats",
        "function": "Online Color Picker",
        "category": "css",
        "steps": [
            "Use the color picker or enter a color value",
            "View automatic conversions to all formats",
            "Adjust sliders for precise color tuning",
            "Copy the color code in your preferred format"
        ],
        "use_cases": [
            "Finding colors from images or websites",
            "Converting between color formats",
            "Fine-tuning colors for design work",
            "Quick color lookup while coding"
        ],
        "faqs": [
            {
                "q": "What color formats are supported?",
                "a": "HEX (#RRGGBB), RGB (rgb(r,g,b)), RGBA, HSL, HSV, and CMYK color formats are all supported."
            },
            {
                "q": "Can I pick colors from my screen?",
                "a": "Use your browser's native color picker or upload an image to use the image color picker feature."
            },
            {
                "q": "Is there a color history?",
                "a": "Yes. Recently used colors are saved so you can quickly access colors you've picked before."
            }
        ]
    },
    "cors-tester": {
        "name": "CORS Tester",
        "description": "Test Cross-Origin Resource Sharing configuration",
        "function": "Test CORS Configuration",
        "category": "web",
        "steps": [
            "Enter the API endpoint URL to test",
            "Select HTTP method and add headers if needed",
            "Click Test to send the CORS preflight request",
            "Review the CORS headers in the response"
        ],
        "use_cases": [
            "Debugging CORS errors in APIs",
            "Verifying server CORS configuration",
            "Testing preflight request handling",
            "Checking allowed origins and methods"
        ],
        "faqs": [
            {
                "q": "What is CORS?",
                "a": "CORS (Cross-Origin Resource Sharing) is a security mechanism that controls how web pages can request resources from a different domain."
            },
            {
                "q": "Why am I getting CORS errors?",
                "a": "The server must include proper Access-Control-Allow-* headers. Without these, browsers block cross-origin requests for security."
            },
            {
                "q": "Can I fix CORS on the client side?",
                "a": "No. CORS must be configured on the server. Client-side workarounds like JSONP are outdated and insecure."
            }
        ]
    },
    "cron-expression-parser": {
        "name": "Cron Expression Parser",
        "description": "Parse cron expressions to human-readable schedules",
        "function": "Parse Cron Expressions",
        "category": "web",
        "steps": [
            "Enter a cron expression (e.g., '0 9 * * 1')",
            "Read the human-readable translation",
            "See the next scheduled execution times",
            "Use presets for common schedules"
        ],
        "use_cases": [
            "Understanding existing cron jobs",
            "Planning scheduled task timing",
            "Debugging cron expression syntax",
            "Learning cron format basics"
        ],
        "faqs": [
            {
                "q": "What is a cron expression?",
                "a": "A cron expression is a string of 5-6 fields that defines a schedule for recurring tasks: minute, hour, day of month, month, day of week."
            },
            {
                "q": "What's the format of a cron expression?",
                "a": "Standard cron has 5 fields: * * * * * (minute hour day month weekday). Some systems use a 6th field for seconds."
            },
            {
                "q": "Can I see when the job will run next?",
                "a": "Yes. The parser shows the next several execution times based on the cron expression you enter."
            }
        ]
    },
    "cron-job-scheduler": {
        "name": "Cron Job Scheduler",
        "description": "Schedule and manage cron jobs with visual interface",
        "function": "Schedule Cron Jobs",
        "category": "web",
        "steps": [
            "Define your task and schedule",
            "Set up notifications for failures",
            "Configure retry policies",
            "Monitor job execution history"
        ],
        "use_cases": [
            "Scheduling automated backups",
            "Running periodic data syncs",
            "Automating report generation",
            "Managing maintenance tasks"
        ],
        "faqs": [
            {
                "q": "What is a cron job?",
                "a": "A cron job is a scheduled task that runs automatically at specified intervals on Unix-like systems."
            },
            {
                "q": "How precise can scheduling be?",
                "a": "Standard cron supports minute-level precision. Some implementations support seconds for more granular control."
            },
            {
                "q": "What happens if a job fails?",
                "a": "Configure retry policies and notifications to handle failures gracefully and alert you when intervention is needed."
            }
        ]
    },
    "crontab-generator": {
        "name": "Crontab Generator",
        "description": "Generate crontab entries with visual schedule builder",
        "function": "Generate Crontab Entries",
        "category": "web",
        "steps": [
            "Select when you want the job to run",
            "Enter the command to execute",
            "Preview the generated crontab line",
            "Copy to your crontab file"
        ],
        "use_cases": [
            "Creating crontab entries without syntax errors",
            "Visual schedule building",
            "Generating cron lines for common tasks",
            "Learning crontab syntax"
        ],
        "faqs": [
            {
                "q": "Where do I put the generated crontab line?",
                "a": "Add it to your crontab file using 'crontab -e' command, or place it in /etc/cron.d/ for system-wide jobs."
            },
            {
                "q": "Can I specify which user runs the job?",
                "a": "Yes. System crontabs include a user field. User crontabs run as that user automatically."
            },
            {
                "q": "How do I view my current crontab?",
                "a": "Use the 'crontab -l' command to list your current cron jobs."
            }
        ]
    },
    "crontab-guru": {
        "name": "Crontab Guru",
        "description": "The ultimate cron schedule expression editor and validator",
        "function": "Master Cron Scheduling",
        "category": "web",
        "steps": [
            "Type any cron expression",
            "Get instant plain English explanation",
            "See next execution times",
            "Validate expression syntax"
        ],
        "use_cases": [
            "Mastering cron expression syntax",
            "Validating complex schedules",
            "Learning advanced cron features",
            "Debugging timing issues"
        ],
        "faqs": [
            {
                "q": "What makes this different from other parsers?",
                "a": "Crontab Guru provides detailed explanations and validation for even the most complex cron expressions."
            },
            {
                "q": "Does it support special strings?",
                "a": "Yes. @reboot, @yearly, @monthly, @weekly, @daily, @hourly and other special strings are supported."
            },
            {
                "q": "Can I share my cron expressions?",
                "a": "Yes. The URL updates with your expression, making it easy to share schedules with your team."
            }
        ]
    },
    "crontab-validator": {
        "name": "Crontab Validator",
        "description": "Validate crontab syntax and check for common errors",
        "function": "Validate Crontab",
        "category": "web",
        "steps": [
            "Paste your crontab entries",
            "Run validation to check syntax",
            "Review any errors or warnings",
            "Fix issues before deployment"
        ],
        "use_cases": [
            "Validating crontab before deployment",
            "Checking for syntax errors",
            "Preventing cron job failures",
            "Reviewing team crontab entries"
        ],
        "faqs": [
            {
                "q": "What errors can the validator catch?",
                "a": "Invalid field values, out-of-range numbers, incorrect number of fields, and common syntax mistakes."
            },
            {
                "q": "Does it check if commands exist?",
                "a": "No. The validator checks cron syntax only, not whether the commands themselves are valid on your system."
            },
            {
                "q": "Can I validate multiple entries at once?",
                "a": "Yes. Paste your entire crontab file to validate all entries in one go."
            }
        ]
    },
    "css-animation-generator": {
        "name": "CSS Animation Generator",
        "description": "Generate CSS animations with visual preview",
        "function": "Generate CSS Animations",
        "category": "css",
        "steps": [
            "Choose an animation type or customize keyframes",
            "Adjust timing, duration, and easing",
            "Preview the animation in real-time",
            "Copy the generated CSS code"
        ],
        "use_cases": [
            "Creating hover effects",
            "Building loading animations",
            "Adding entrance/exit animations",
            "Prototyping UI interactions"
        ],
        "faqs": [
            {
                "q": "What animation types are available?",
                "a": "Fade, slide, bounce, rotate, scale, flip, pulse, shake, and custom keyframe animations."
            },
            {
                "q": "Can I customize the timing?",
                "a": "Yes. Adjust duration, delay, iteration count, direction, fill mode, and timing function (easing)."
            },
            {
                "q": "Will it work in all browsers?",
                "a": "Generated CSS includes vendor prefixes for maximum browser compatibility."
            }
        ]
    },
    "css-animation-playground": {
        "name": "CSS Animation Playground",
        "description": "Experiment with CSS animations interactively",
        "function": "Experiment with Animations",
        "category": "css",
        "steps": [
            "Select properties to animate",
            "Adjust values with live sliders",
            "See changes instantly in the preview",
            "Export the final CSS when satisfied"
        ],
        "use_cases": [
            "Learning CSS animation concepts",
            "Prototyping animation ideas",
            "Fine-tuning animation parameters",
            "Teaching CSS animation techniques"
        ],
        "faqs": [
            {
                "q": "What can I animate?",
                "a": "Transform (translate, rotate, scale), opacity, colors, dimensions, and any animatable CSS property."
            },
            {
                "q": "Can I save my animations?",
                "a": "Copy the generated CSS to save your animations. You can also export as a shareable URL."
            },
            {
                "q": "Is there a preview mode?",
                "a": "Yes. All changes are reflected instantly in the live preview pane."
            }
        ]
    },
    "css-box-model-visualizer": {
        "name": "CSS Box Model Visualizer",
        "description": "Visualize CSS box model with interactive diagrams",
        "function": "Visualize Box Model",
        "category": "css",
        "steps": [
            "Adjust margin, border, padding, and content values",
            "Watch the visual diagram update in real-time",
            "See how box-sizing affects dimensions",
            "Copy CSS for the configured box model"
        ],
        "use_cases": [
            "Understanding CSS box model concepts",
            "Debugging layout spacing issues",
            "Learning how padding and margin differ",
            "Teaching CSS fundamentals"
        ],
        "faqs": [
            {
                "q": "What is the CSS box model?",
                "a": "The box model describes how elements are rendered: content (inner), padding, border, and margin (outer), from inside to out."
            },
            {
                "q": "What's the difference between content-box and border-box?",
                "a": "content-box: width/height applies to content only. border-box: width/height includes padding and border."
            },
            {
                "q": "Can I see the computed dimensions?",
                "a": "Yes. The visualizer shows both specified and computed dimensions for the element."
            }
        ]
    },
    "css-flexbox-generator": {
        "name": "CSS Flexbox Generator",
        "description": "Generate CSS flexbox code with visual editor",
        "function": "Generate Flexbox CSS",
        "category": "css",
        "steps": [
            "Configure flex container properties",
            "Add and arrange flex items",
            "Adjust alignment and spacing",
            "Copy the generated HTML and CSS"
        ],
        "use_cases": [
            "Creating responsive layouts",
            "Centering elements vertically/horizontally",
            "Building navigation bars",
            "Designing card grids"
        ],
        "faqs": [
            {
                "q": "What is CSS flexbox?",
                "a": "Flexbox is a CSS layout module that makes it easy to align and distribute space among items in a container."
            },
            {
                "q": "When should I use flexbox?",
                "a": "Use flexbox for one-dimensional layouts (row OR column). For two-dimensional layouts, consider CSS Grid."
            },
            {
                "q": "How do I center with flexbox?",
                "a": "Set display: flex, justify-content: center (horizontal), and align-items: center (vertical) on the container."
            }
        ]
    },
    "css-formatter": {
        "name": "CSS Formatter",
        "description": "Format and beautify CSS code with custom options",
        "function": "Format CSS Code",
        "category": "css",
        "steps": [
            "Paste your CSS code in the input",
            "Select formatting options (indent, sort, etc.)",
            "Click Format to beautify",
            "Copy the formatted CSS output"
        ],
        "use_cases": [
            "Cleaning up minified CSS",
            "Standardizing CSS formatting",
            "Making CSS readable for debugging",
            "Preparing CSS for code reviews"
        ],
        "faqs": [
            {
                "q": "What formatting options are available?",
                "a": "Indent size (2/4 spaces, tabs), brace style, property sorting, selector sorting, and line breaking options."
            },
            {
                "q": "Will formatting change my CSS behavior?",
                "a": "No. Formatting only changes whitespace and organization. The computed styles remain identical."
            },
            {
                "q": "Can I format SCSS/Sass?",
                "a": "Basic SCSS syntax is supported, though some advanced Sass features may not format perfectly."
            }
        ]
    }
}


def generate_page_title(tool_name: str, function_desc: str) -> str:
    """Generate SEO page title in the required format."""
    # Format: "[功能] Online Free — [工具名称] | DevToolBox"
    return f"{function_desc} Online Free — {tool_name} | DevToolBox"


def generate_page_description(tool_name: str, category: str) -> str:
    """Generate SEO page description with keywords and CTA."""
    descriptions = {
        "encoder": f"Free online {tool_name.lower()}. Encode and decode instantly in your browser with no data sent to servers. Fast, secure, and easy to use. Try it now!",
        "decoder": f"Free online {tool_name.lower()}. Decode instantly with 100% client-side processing. No signup required. Secure and fast conversion tool.",
        "converter": f"Free online {tool_name.lower()}. Convert between formats instantly with accurate results. No installation needed. Try this free tool today!",
        "text": f"Free online {tool_name.lower()}. Process text instantly in your browser. No data sent to servers. Fast, private, and completely free to use.",
        "web": f"Free online {tool_name.lower()}. Test and validate in your browser with instant results. No signup, 100% free. Start using it now!",
        "css": f"Free online {tool_name.lower()}. Generate and preview CSS instantly with live editing. No installation required. Try it for free!"
    }
    return descriptions.get(category, f"Free online {tool_name.lower()}. Use this tool instantly in your browser. No signup, no data sent to servers. Completely free!")


def generate_dict_entry(tool_id: str, definition: Dict[str, Any]) -> Dict[str, Any]:
    """Generate a complete dictionary entry for a tool."""
    name = definition["name"]
    function_desc = definition["function"]
    category = definition["category"]
    
    return {
        "name": name,
        "description": definition["description"],
        "pageTitle": generate_page_title(name, function_desc),
        "pageDescription": generate_page_description(name, category),
        "howToUseTitle": "How to Use",
        "howToUseSteps": definition["steps"],
        "useCasesTitle": "Common Use Cases",
        "useCases": definition["use_cases"],
        "faqTitle": "Frequently Asked Questions",
        "faqs": definition["faqs"]
    }


def load_json_file(path: str) -> Dict:
    """Load and parse a JSON file."""
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_json_file(path: str, data: Dict) -> None:
    """Save data to a JSON file with proper formatting."""
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write('\n')


def read_missing_tools(file_path: str) -> List[str]:
    """Read the list of missing tools from file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return [line.strip() for line in f if line.strip()]


def main():
    """Main function to generate and append dictionary entries."""
    # File paths
    missing_tools_file = "/tmp/missing_tools.txt"
    dict_file = "/Users/mengnan/devtoolbox/src/i18n/dictionaries/en.json"
    
    # Read missing tools
    print(f"Reading missing tools from {missing_tools_file}...")
    missing_tools = read_missing_tools(missing_tools_file)
    print(f"Found {len(missing_tools)} missing tools")
    
    # Load existing dictionary
    print(f"Loading dictionary from {dict_file}...")
    dictionary = load_json_file(dict_file)
    
    # Ensure 'tools' key exists
    if "tools" not in dictionary:
        dictionary["tools"] = {}
    
    # Track added and skipped tools
    added_count = 0
    skipped_count = 0
    not_found_count = 0
    
    # Process each missing tool
    for tool_id in missing_tools:
        # Skip if already exists
        if tool_id in dictionary["tools"]:
            print(f"  Skipping (already exists): {tool_id}")
            skipped_count += 1
            continue
        
        # Check if we have a definition for this tool
        if tool_id not in TOOL_DEFINITIONS:
            print(f"  Warning: No definition found for: {tool_id}")
            not_found_count += 1
            continue
        
        # Generate dictionary entry
        definition = TOOL_DEFINITIONS[tool_id]
        entry = generate_dict_entry(tool_id, definition)
        
        # Add to dictionary
        dictionary["tools"][tool_id] = entry
        print(f"  Added: {tool_id}")
        added_count += 1
    
    # Save updated dictionary
    print(f"\nSaving updated dictionary...")
    save_json_file(dict_file, dictionary)
    
    # Print summary
    print(f"\n{'='*50}")
    print(f"Summary:")
    print(f"  Total tools processed: {len(missing_tools)}")
    print(f"  Added: {added_count}")
    print(f"  Skipped (already exist): {skipped_count}")
    print(f"  No definition found: {not_found_count}")
    print(f"{'='*50}")
    
    if added_count > 0:
        print(f"\nSuccessfully updated {dict_file}")
    else:
        print(f"\nNo new entries were added.")


if __name__ == "__main__":
    main()
