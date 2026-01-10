#!/usr/bin/env bash

[[ -d dist ]] && rm -rf dist
mkdir -p dist

node_modules/.bin/rimraf dist

node_modules/.bin/esbuild src/llm-util.ts --bundle \
  --platform=node \
  --target=es2024,node24 \
  --format=cjs \
  --tsconfig=tsconfig.json \
  --outfile=dist/llm-util.js \
  --allow-overwrite \
  --banner:js='#!/usr/bin/env node' \
  --tree-shaking=true \
  --minify \
  --sourcemap=inline \
  --analyze

chmod +x dist/llm-util.js
