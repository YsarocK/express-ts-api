import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost'
      }
    }
  },
  runtimeConfig: {
    public: {
      apiEndpoint: process.env.API_ENDPOINT
    }
  },
  modules: [
    '@unocss/nuxt',
    'nuxt-icons',
    '@pinia/nuxt',
  ],
  css: [
    'assets/styles/main.scss',
  ],
})
