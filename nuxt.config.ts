import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-07-01',

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    'nuxt-security',
    'shadcn-nuxt',
  ],

  ssr: true,
  devtools: { enabled: true },

  components: [
    // No path prefixes: blocks/BlockHero.vue -> <BlockHero>
    { path: '~/components', pathPrefix: false },
  ],

  runtimeConfig: {
    public: {
      // Overridden at runtime via NUXT_PUBLIC_SITE_URL / _NAME / _DESCRIPTION
      // (build-once-run-anywhere images; no build-time env baking)
      siteUrl: 'https://example.com',
      siteName: 'TES Template Site',
      siteDescription: 'Welcome to the TES template site!',
    },
  },

  // nuxt-site-config (used by @nuxtjs/seo) reads NUXT_PUBLIC_SITE_* at runtime too
  site: {
    url: 'https://example.com',
    name: 'TES Template Site',
    description: 'Welcome to the TES template site!',
  },

  routeRules: {
    // Content pages are prerendered by default (performance mandate).
    // Customer apps override per route: `isr`/`swr` for CMS-driven pages,
    // `ssr: true` only where genuinely needed.
    '/': { prerender: true },
  },

  nitro: {
    preset: 'node-server',
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },

  css: ['~/assets/css/main.css'],

  security: {
    headers: {
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
      },
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'img-src': ["'self'", 'data:'],
        'font-src': ["'self'"],
        'object-src': ["'none'"],
        'script-src': ["'self'", "'nonce-{{nonce}}'", "'strict-dynamic'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'base-uri': ["'self'"],
        'frame-ancestors': ["'none'"],
        'upgrade-insecure-requests': true,
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      xFrameOptions: 'DENY',
      crossOriginEmbedderPolicy: false,
    },
  },

  i18n: {
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
  },

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  typescript: {
    strict: true,
  },

  eslint: {
    config: {
      // Prettier owns formatting; keep ESLint to correctness rules only
      stylistic: false,
    },
  },

  vite: {
    // Cast: vite 7 dual rollup/rolldown typings clash when the optional
    // `rolldown` package is installed; runtime is unaffected.
    plugins: [tailwindcss() as never],
  },
})
