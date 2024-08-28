import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

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

  modules: ['nuxt-headlessui', '@nuxtjs/seo'],
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  //security: {
  //  headers: {},
  //},

  vite: {},
  compatibilityDate: '2024-08-12',
})
