import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const session = ref({
    ssh: {
      host: '163.172.174.171',
      username: 'chucknorris'
    }
  })

  return { session }
})