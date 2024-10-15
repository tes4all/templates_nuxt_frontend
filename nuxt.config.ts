import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@nuxtjs/seo',
    '@nuxtjs/storybook',
    'shadcn-nuxt',
  ],

  site: {
    // set site by environment variables
    url: process.env.VITE_APP_SITE_URL,
    name: process.env.VITE_APP_SITE_NAME,
    description: process.env.VITE_APP_SITE_DESCRIPTION,
  },

  ssr: true,
  devtools: { enabled: true },
  nitro: {
    preset: 'aws-lambda',
  },

  build: {
    transpile: ['@heroicons/vue'],
  },
  css: ['~/assets/css/main.css'],

  //security: {
  //  headers: {},
  //},
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'last' }],
    config: {
      /* Extend the Tailwind config here */
      content: [
        './app/components/**/*.{js,vue,ts}',
        './app/layouts/**/*.vue',
        './app/pages/**/*.vue',
        './app/plugins/**/*.{js,ts}',
        './app/app.vue',
        './app/error.vue',
      ],
    },
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './app/components/ui',
  },

  vite: {
    optimizeDeps: {
      include: ['jsdoc-type-pratt-parser'],
    },
  },
  compatibilityDate: '2024-08-12',
})
