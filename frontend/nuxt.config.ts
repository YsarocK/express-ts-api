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
      apiURL: process.env.API_URL
    }
  },
  modules: [
    '@unocss/nuxt'
  ]
})
