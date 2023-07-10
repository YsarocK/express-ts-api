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
      apiEndpoint: process.env.API_ENDPOINT,
      apiEndpointFront: process.env.API_ENDPOINT_FRONT
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
