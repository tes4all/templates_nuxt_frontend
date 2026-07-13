# templates_nuxt_frontend

> **MOVED (2026-07-14):** development continues at `TES/nuxt-frontend` on the JEP platform forge
> (split into the `@tes/nuxt-layer` npm package + copier customer template).
> This GitHub repo is a snapshot up to Phase 1 (`d707c74`) and will become a read-only mirror of the new repo.

TES base template for customer websites: Nuxt 4 + Tailwind 4 + shadcn-vue (reka-ui).

Two delivery classes, one framework:

- **static** — `bun run generate`, output served from nginx/CDN (no Node at runtime)
- **dynamic** — `bun run build`, Node server container (see `Dockerfile`)

Blocks are static by default (no client JS). Interactivity is opt-in per block via
lazy hydration (`<LazyBlockX hydrate-on-visible />`). Per-tenant theming is done
exclusively through the CSS variables in `app/assets/css/main.css`.

## Setup

```bash
bun install
cp .env.example .env
```

Runtime configuration (also for containers, read at start — never baked into the build):
`NUXT_PUBLIC_SITE_URL`, `NUXT_PUBLIC_SITE_NAME`, `NUXT_PUBLIC_SITE_DESCRIPTION`.

## Development

```bash
bun run dev            # http://localhost:3000
bun run dev --inspect  # + Node inspector on :9229 (Zed: "Attach to Nuxt dev server")
```

Editor settings for Zed (format-on-save with Prettier, debug config) are committed
under `.zed/`. Install the Zed **Vue** extension for SFC support.

## Checks

```bash
bun run format:check   # prettier
bun run lint:check     # eslint (@nuxt/eslint)
bun run typecheck      # vue-tsc
bun run test           # vitest (@nuxt/test-utils)
```

## Production

```bash
bun run build          # Node server -> .output/
bun run generate       # static site -> .output/public/
docker build -t site . # multi-stage: bun build -> node:26-slim runtime
```

Health endpoint: `GET /api/health` (Docker HEALTHCHECK, k8s probes).

## i18n

`@nuxtjs/i18n`, default locale `de`, strategy `prefix_except_default`.
Locale files live in `i18n/locales/`.

## Adding UI components

```bash
bunx --bun shadcn-vue@latest add <component>
```

Components land in `app/components/ui/` (style `new-york`, reka-ui based).
