#!/usr/bin/env bash
# Tests e2e et visuels dans l'image Docker officielle de Playwright, celle de la CI : seules les captures
# produites ici font référence (polices, rendu et optimisation d'images identiques).
# Usage : scripts/visuel-docker.sh [arguments de playwright test]
#   pnpm test:visuel:docker            vérifier
#   pnpm test:visuel:maj               régénérer les captures de référence (tests/e2e/captures)
# node_modules, .next et le magasin pnpm du conteneur vivent dans des volumes Docker : ceux de la machine ne sont pas touchés.
set -euo pipefail
cd "$(dirname "$0")/.."
VERSION=$(node -p "require('./package.json').devDependencies['@playwright/test']")
IMAGE="mcr.microsoft.com/playwright:v${VERSION}-noble"
PNPM="npx -y pnpm@9.15.9"
docker run --rm --init --ipc=host \
	-e CI=1 -e HOTE="$(id -u):$(id -g)" \
	-v "$PWD":/app -v taverne-e2e-node-modules:/app/node_modules -v taverne-e2e-next:/app/.next -v taverne-e2e-pnpm-store:/app/.pnpm-store \
	-w /app "$IMAGE" bash -c '
		set -e
		trap "chown -R \$HOTE tests/e2e/captures test-results playwright-report 2>/dev/null || true" EXIT
		'"$PNPM"' install --frozen-lockfile --config.confirmModulesPurge=false
		node scripts/instantane/avec-instantane.mjs node_modules/.bin/next build
		node_modules/.bin/playwright test "$@"
	' -- "$@"
