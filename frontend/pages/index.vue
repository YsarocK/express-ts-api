<template>
  <div class="w-full max-w-2xl flex flex-col gap-10">
    <div>
      <p class="text-md text-slate-500">Score : <span>{{ exercises?.score }} / 20</span></p>
    </div>
    <exercises-list :exercises="exercises" />
    <button class="btn">Refresh</button>
  </div>
</template>

<script setup lang="ts">
import ApiService from "../service/api";

const { $api } = useNuxtApp()

const exercises = ref()

onMounted(async () => {
  exercises.value = await $api.verifyExercises()
})
</script>