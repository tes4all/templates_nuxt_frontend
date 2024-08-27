import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  ssr: true,
  devtools: { enabled: true },

  build: {
    transpile: ['@heroicons/vue'],
  },

  modules: ['nuxt-headlessui'],
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
