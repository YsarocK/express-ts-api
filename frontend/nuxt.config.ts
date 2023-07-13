import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiEndpoint: process.env.API_ENDPOINT,
      apiEndpointFront: process.env.API_ENDPOINT_FRONT,
      sshPublicKey: process.env.SSH_PUBLIC_KEY,
      isProd: process.env.NODE_ENV === 'production',
    }
  },
  modules: [
    '@unocss/nuxt',
    'nuxt-icons',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  css: [
    'assets/styles/main.scss',
  ],
  piniaPersistedstate: {
    storage: 'localStorage'
  },
})
