import { defineStore } from 'pinia'
import { StoreType} from "../types";

export const useSessionStore = defineStore('session', () => {
  const store: Ref<StoreType.Main | undefined> = ref(undefined)
  return { store }
}, {
  persist: true
})