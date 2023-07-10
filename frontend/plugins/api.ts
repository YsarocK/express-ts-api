import ApiService from "../service/api";

export default defineNuxtPlugin(() => {
  const { apiEndpointFront } = useRuntimeConfig().public
  const service = new ApiService(apiEndpointFront)
  return {
    provide: {
      api: service
    }
  }
})