<template>
  <div class="flex flex-col gap-2 w-full max-w-lg">
    <button @click="() => refresh()">Refresh</button>
    <div v-if="exercises" class="px-4 py-2 w-full bg-blue-50" v-for="exercise in exercises.tests">
      <p>{{ exercise.name }}</p>
      <p>{{ exercise.passed ? 'Passed' : 'Failed' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: exercises, error, refresh } = await useAsyncData('exercises', async (app) => {
  const { apiEndpoint } = useRuntimeConfig().public
  const res = await fetch(
    `${apiEndpoint}/exercises/verify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "host": "163.172.174.171",
        "username": "root"
      })
    })
  return await res.json()
})
</script>