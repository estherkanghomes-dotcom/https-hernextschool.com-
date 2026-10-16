#!/usr/bin/env bash
# Builds the static artifact preview (HANDOFF.md steps 1–5) into artifact-build/out/dist.
# Usage: bash artifact-build/build.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/artifact-build/out"
O="$ROOT/artifact-build/overrides"
mkdir -p "$OUT"
# Fresh copy of the source, keeping node_modules between runs.
find "$OUT" -mindepth 1 -maxdepth 1 ! -name node_modules -exec rm -rf {} +
tar -C "$ROOT" --exclude=./.git --exclude=./artifact-build --exclude=./node_modules -cf - . | tar -C "$OUT" -xf -
cd "$OUT"
rm -rf src/routes/_authenticated src/routes/lovable "src/routes/sitemap[.]xml.ts" src/routeTree.gen.ts src/server.ts src/start.ts bun.lock bunfig.toml
cp "$O/vite.config.ts" "$O/index.html" .
cp "$O/main.tsx" "$O/stub-start.ts" src/
cp "$O/ai-planner.functions.ts" "$O/contact.functions.ts" src/lib/
python3 - <<'PY'
p = "src/routes/__root.tsx"; s = open(p).read()
s = s.replace('import appCss from "../styles.css?url";\n', "")
s = s.replace('      {\n        rel: "stylesheet",\n        href: appCss,\n      },\n', "")
s = s.replace("  shellComponent: RootShell,\n", "")
open(p, "w").write(s)
PY
if [ ! -d node_modules/@tanstack/router-plugin ]; then
  npm install --no-audit --no-fund --legacy-peer-deps
  npm i -D --no-audit --no-fund --legacy-peer-deps vite@8.0.16 @vitejs/plugin-react@5.2.0 @tanstack/router-plugin@1.168.42
fi
npx vite build
python3 - <<'PY'
import glob
for f in glob.glob("dist/assets/index-*.js"):
    s = open(f, encoding="utf-8").read()
    open(f, "w", encoding="utf-8").write(s.replace("�", "\\uFFFD"))
PY
echo "Built: $OUT/dist"
