import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request

articles = [
    {
        "file": "scripts/devto-articles/06-json-formatter-guide.md",
        "title": "JSON Formatting Best Practices Every Developer Should Know",
        "tags": ["json", "webdev", "javascript", "beginners"],
        "canonical": "https://viadreams.cc/en/tools/json-formatter",
        "desc": "Learn JSON formatting tips, common pitfalls, and how to validate JSON like a pro."
    },
    {
        "file": "scripts/devto-articles/07-base64-encoding-guide.md",
        "title": "Base64 Encoding Explained: When, Why, and How to Use It",
        "tags": ["webdev", "security", "tutorial", "beginners"],
        "canonical": "https://viadreams.cc/en/tools/base64-encode-online",
        "desc": "A practical guide to Base64 encoding for developers."
    },
    {
        "file": "scripts/devto-articles/08-css-tools-roundup.md",
        "title": "7 CSS Tools That Save Me Hours Every Week",
        "tags": ["css", "webdev", "productivity", "tools"],
        "canonical": "https://viadreams.cc/en/blog/css-container-queries-guide",
        "desc": "My go-to CSS tools for gradients, animations, flexbox debugging, and more."
    },
    {
        "file": "scripts/devto-articles/09-docker-tips-2026.md",
        "title": "Docker Tips That Actually Matter in 2026",
        "tags": ["docker", "devops", "tutorial", "productivity"],
        "canonical": "https://viadreams.cc/en/blog/docker-security-best-practices",
        "desc": "Practical Docker tips for faster builds, smaller images, and better security."
    },
    {
        "file": "scripts/devto-articles/10-typescript-tips.md",
        "title": "TypeScript Tips That Changed How I Write Code",
        "tags": ["typescript", "javascript", "webdev", "tutorial"],
        "canonical": "https://viadreams.cc/en/blog/typescript-type-guards",
        "desc": "Practical TypeScript tips for type guards, generics, and utility types."
    }
]

def parse_args():
    parser = argparse.ArgumentParser(description="Publish prepared Dev.to backlink articles.")
    parser.add_argument(
        "--publish",
        action="store_true",
        help="Actually create published Dev.to articles. Without this flag, the script only prints a dry run.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=0,
        help="Optional maximum number of articles to process.",
    )
    return parser.parse_args()


def article_body(file_path):
    with open(file_path) as f:
        content = f.read()
    parts = content.split("---", 2)
    return parts[2].strip() if len(parts) > 2 else content


args = parse_args()
selected_articles = articles[:args.limit] if args.limit and args.limit > 0 else articles

if not args.publish:
    print("DRY RUN: no articles will be created. Pass --publish with DEVTO_API_KEY set to publish.")
    for article in selected_articles:
        print(f"- {article['title']} -> {article['canonical']}")
    sys.exit(0)

api_key = os.environ.get("DEVTO_API_KEY", "").strip()
if not api_key:
    print("Missing DEVTO_API_KEY. Create a Dev.to API key and pass it via environment variable.", file=sys.stderr)
    sys.exit(1)

for a in selected_articles:
    body = article_body(a["file"])

    payload = {
        "article": {
            "title": a["title"],
            "published": True,
            "body_markdown": body,
            "tags": a["tags"],
            "canonical_url": a["canonical"],
            "description": a["desc"]
        }
    }

    req = urllib.request.Request(
        "https://dev.to/api/articles",
        data=json.dumps(payload).encode(),
        headers={
            "Content-Type": "application/json",
            "api-key": api_key
        }
    )
    try:
        resp = urllib.request.urlopen(req)
        data = json.loads(resp.read())
        url = data.get("url", "published")
        print("OK: " + url)
    except urllib.error.HTTPError as e:
        err = e.read().decode() if hasattr(e, "read") else str(e)
        title_short = a["title"][:30]
        print("FAIL (" + title_short + "): " + err[:150])
    except Exception as e:
        title_short = a["title"][:30]
        print("FAIL (" + title_short + "): " + str(e)[:150])
    time.sleep(3)
