<template>
  <div>
    <p>Redirection...</p>
    <p class="text-sm text-red-500 text-center" v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const token: string = useRoute().query.jwt
const error: Ref<undefined | string> = ref(undefined)

const { $api } = useNuxtApp()

onMounted(() => {
  $api.login(token)
      .then(r => r.json())
      .then((r) => {
        console.log(r)
        window.location.href = r.data.redirect_url
      })
      .catch((err) => {
        error.value = err.message
      })
})
</script>