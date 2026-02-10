"""
update-tool-layouts.py
Batch-updates all src/app/[lang]/tools/*/layout.tsx files to add
x-default hreflang to the alternates.languages section.
"""
import os
import re

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
tools_dir = os.path.join(root_dir, 'src', 'app', '[lang]', 'tools')

tool_dirs = sorted([
    d for d in os.listdir(tools_dir)
    if os.path.isdir(os.path.join(tools_dir, d))
])

print(f'Found {len(tool_dirs)} tool directories to process.\n')

updated = 0
skipped = 0
errors = 0

REPLACEMENT = """languages: {{
        ...Object.fromEntries(
          i18n.locales.map((l) => [l, `https://viadreams.cc/${{l}}/tools/{tool}`])
        ),
        'x-default': `https://viadreams.cc/en/tools/{tool}`,
      }}"""

for tool_dir in tool_dirs:
    filepath = os.path.join(tools_dir, tool_dir, 'layout.tsx')
    if not os.path.exists(filepath):
        print(f'SKIP (no layout.tsx): {tool_dir}')
        skipped += 1
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if "'x-default'" in content or '"x-default"' in content:
        print(f'SKIP (already has x-default): {tool_dir}')
        skipped += 1
        continue

    # Extract tool name from the URL pattern
    m = re.search(r'https://viadreams\.cc/\$\{l\}/tools/([\w-]+)', content)
    if not m:
        print(f'ERROR (could not extract tool name): {tool_dir}')
        errors += 1
        continue
    tool_name = m.group(1)

    replacement = REPLACEMENT.format(tool=tool_name)

    # Pattern A: Multi-line
    pattern_a = re.compile(
        r'languages:\s*Object\.fromEntries\(\s*\n\s*i18n\.locales\.map\(\(l\)\s*=>\s*\[l,\s*`https://viadreams\.cc/\$\{l\}/tools/'
        + re.escape(tool_name)
        + r'`\]\)\s*\n\s*\)',
        re.DOTALL
    )

    # Pattern B: Single-line
    pattern_b = re.compile(
        r'languages:\s*Object\.fromEntries\(i18n\.locales\.map\(\(l\)\s*=>\s*\[l,\s*`https://viadreams\.cc/\$\{l\}/tools/'
        + re.escape(tool_name)
        + r'`\]\)\)',
        re.DOTALL
    )

    new_content = content
    matched = False

    if pattern_a.search(new_content):
        new_content = pattern_a.sub(replacement, new_content)
        matched = True
    elif pattern_b.search(new_content):
        new_content = pattern_b.sub(replacement, new_content)
        matched = True

    if matched:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'UPDATED: {tool_dir}')
        updated += 1
    else:
        print(f'ERROR (no pattern matched): {tool_dir}')
        errors += 1

print(f'\nDone. Updated: {updated}, Skipped: {skipped}, Errors: {errors}')
