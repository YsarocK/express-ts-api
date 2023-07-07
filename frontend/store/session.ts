import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const user = ref({
    ssh: {
      host: '163.172.174.171',
      username: 'root'
    }
  })

  return { user }
})