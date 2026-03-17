#!/usr/bin/env python3
"""
Split each {lang}.json into:
  - {lang}-ui.json: everything except tools (~5KB)
  - {lang}-tools.json: only the tools section (~697KB)
"""
import json
import os

DICT_DIR = os.path.join(os.path.dirname(__file__), '..', 'src', 'i18n', 'dictionaries')
LOCALES = ['en', 'fr', 'de', 'it', 'es', 'pt', 'nl', 'pl', 'sv', 'no', 'zh', 'ja', 'ko', 'id', 'th']

for locale in LOCALES:
    src = os.path.join(DICT_DIR, f'{locale}.json')
    if not os.path.exists(src):
        print(f'SKIP {locale}.json (not found)')
        continue

    with open(src, 'r', encoding='utf-8') as f:
        data = json.load(f)

    tools = data.get('tools', {})
    ui = {k: v for k, v in data.items() if k != 'tools'}

    ui_out = os.path.join(DICT_DIR, f'{locale}-ui.json')
    tools_out = os.path.join(DICT_DIR, f'{locale}-tools.json')

    with open(ui_out, 'w', encoding='utf-8') as f:
        json.dump(ui, f, ensure_ascii=False, separators=(',', ':'))

    with open(tools_out, 'w', encoding='utf-8') as f:
        json.dump(tools, f, ensure_ascii=False, separators=(',', ':'))

    ui_kb = os.path.getsize(ui_out) // 1024
    tools_kb = os.path.getsize(tools_out) // 1024
    print(f'{locale}: ui={ui_kb}KB  tools={tools_kb}KB')

print('\nDone.')
