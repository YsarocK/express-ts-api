<template>
  <div>
    <p>Redirection...</p>
    <p class="text-sm text-red-500 text-center" v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useSessionStore} from "../store/session";

const token: string = useRoute().query.jwt
const error: Ref<undefined | string> = ref(undefined)

const { store } = storeToRefs(useSessionStore())

const { $api } = useNuxtApp()

onMounted(() => {
  $api.login(token)
      .then(async r => {
        store.value = {
          user: r.data.user,
          user_session: r.data.user_session,
          session: r.data.session
        }
        await navigateTo(r.data.redirect_url)
      })
      .catch((err) => {
        console.log(err);
        error.value = err.message
      })
})
</script>