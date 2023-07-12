<template>
  <div class="w-full h-full max-w-5xl flex flex-col">
    <admin-create-session class="mb-30" />
    <admin-session-list />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

useHead({
  title: 'Admin',
})
</script>
