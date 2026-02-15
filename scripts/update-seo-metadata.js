const fs = require('fs');
const path = require('path');

const dictionaryPath = path.join(__dirname, '../src/i18n/dictionaries/en.json');

// Read the current dictionary
const dictionary = JSON.parse(fs.readFileSync(dictionaryPath, 'utf8'));

// Define the SEO-optimized updates
const updates = {
  'timestamp-converter': {
    pageTitle: 'Unix Timestamp Converter - Convert Timestamp to Date & DateTime Online',
    pageDescription: 'Free online Unix timestamp converter. Convert Unix timestamp to date, datetime, and human-readable format. Convert date to Unix timestamp instantly. Supports epoch time conversion.',
  },
  'color-converter': {
    pageTitle: 'Color Converter - HEX to RGB, Pantone, CMYK Color Conversion Online',
    pageDescription: 'Free online color converter tool. Convert between HEX, RGB, HSL, CMYK and Pantone color formats. Hexadecimal to RGB color converter with live preview and color picker.',
  },
  'hash-generator': {
    pageTitle: 'Hash Generator - MD5, SHA1, SHA256, SHA512 Online Hash Calculator',
    pageDescription: 'Free online hash generator. Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text instantly. Multi hash generator supporting all major hashing algorithms.',
  },
  'regex-tester': {
    pageTitle: 'Regex Tester Online - Test Regular Expressions for JavaScript, Python, C#',
    pageDescription: 'Free online regex tester and debugger. Test regular expressions in real-time with syntax highlighting. Supports JavaScript, Python, C#, Perl regex patterns with match highlighting.',
  },
  'uuid-generator': {
    pageTitle: 'UUID Generator Online - Generate UUID v4, v7 & GUID Instantly',
    pageDescription: 'Free online UUID generator. Generate random UUID v4, UUID v7, and GUID identifiers in bulk. Copy UUIDs instantly with our fast, secure UUID generation tool.',
  },
};

// Apply updates to the tools dictionary
if (dictionary.tools) {
  Object.keys(updates).forEach((toolId) => {
    if (dictionary.tools[toolId]) {
      dictionary.tools[toolId].pageTitle = updates[toolId].pageTitle;
      dictionary.tools[toolId].pageDescription = updates[toolId].pageDescription;
      console.log(`✓ Updated ${toolId}`);
    } else {
      console.warn(`⚠ Tool ${toolId} not found in dictionary`);
    }
  });
}

// Write the updated dictionary back
fs.writeFileSync(dictionaryPath, JSON.stringify(dictionary, null, 2) + '\n', 'utf8');
console.log('\n✓ SEO metadata updated successfully in en.json');
