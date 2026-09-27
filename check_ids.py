import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

html_ids = set(re.findall(r'id=["\']([^"\']+)["\']', html))
js_ids = set(re.findall(r'getElementById\(["\']([^"\']+)["\']\)', js))

missing = js_ids - html_ids
print("Missing IDs in index.html:", missing)

# Check classes and buttons
print("Found IDs in HTML:", len(html_ids))
print("Found IDs in JS:", len(js_ids))
