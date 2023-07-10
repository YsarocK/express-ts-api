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
import { ApiResponsesTypes } from "../types";

const { $api } = useNuxtApp()

const exercises: Ref<undefined | ApiResponsesTypes.Verify> = ref(undefined)

onMounted(async () => {
  exercises.value = (await $api.verifyExercises())
  console.log(exercises.value)
})
</script>