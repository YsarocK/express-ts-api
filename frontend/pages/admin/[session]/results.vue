<template>
  <div class="w-full h-full max-w-5xl flex flex-col">
    <admin-results :session="session" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

useHead({
  title: 'Résultats',
})

const { session } = useRoute().params as { session: string }
</script>