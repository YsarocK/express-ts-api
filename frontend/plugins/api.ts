import ApiService from "../service/api";

export default defineNuxtPlugin(() => {
  const { apiEndpoint } = useRuntimeConfig().public
  const service = new ApiService('http://localhost:3000')
  return {
    provide: {
      api: service
    }
  }
})