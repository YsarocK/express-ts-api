import ApiService from "../services/api";

export default defineNuxtPlugin(() => {
  const { apiEndpointFront } = useRuntimeConfig().public
  const service = ApiService(apiEndpointFront)
  return {
    provide: {
      api: service
    }
  }
})