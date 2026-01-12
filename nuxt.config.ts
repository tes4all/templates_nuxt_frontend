import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  modules: ['nuxt-headlessui', '@nuxtjs/seo', 'shadcn-nuxt', '@nuxt/content'],

  site: {
    // set site by environment variables
    url: process.env.VITE_APP_SITE_URL,
    name: process.env.VITE_APP_SITE_NAME,
    description: process.env.VITE_APP_SITE_DESCRIPTION,
  },

  ssr: true,
  devtools: { enabled: true },
  nitro: {
    preset: 'node-server',
    prerender: {
      // Pre-render the homepage
      routes: ['/'],
      // Then crawl all the links on the page
      crawlLinks: true,
    },
  },
  css: ['~/assets/css/main.css'],

  //security: {
  //  headers: {},
  //},

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
  content: {
    database: {
      type: 'sqlite',
      filename: '/tmp/contents.sqlite',
    },
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['jsdoc-type-pratt-parser'],
    },
  },
  compatibilityDate: '2024-08-12',
})
