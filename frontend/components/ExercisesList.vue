<template>
  <div class="flex flex-col gap-4 w-full">
    <Loader v-if="exercises.length < 1" text="Chargement des exercices..." />
    <div
      v-else
      class="flex items-start gap-4 p-4 w-full rounded-md bg-slate-50"
      v-for="exercise in exercises"
    >
      <div
        v-if="exercise.passed"
        class="bg-green-100 p-2 w-10 h-10 min-w-10 min-h-10 rounded-md flex"
      >
        <nuxt-icon
          name="check"
          class="text-green-400 text-md w-full h-full m-auto"
        />
      </div>
      <div v-else class="bg-red-100 p-2 w-10 h-10 min-w-10 min-h-10 rounded-md flex">
        <nuxt-icon
          name="close"
          class="text-red-400 text-md w-full h-full m-auto"
        />
      </div>
      <div class="w-full grid grid-cols-12 gap-3">
        <p class="text-md leading-none col-span-8">{{ exercise.title }}</p>
        <p class="text-sm leading-none text-slate-400 col-span-4 text-right">{{ exercise.points }} point{{ exercise.points > 1 ? 's' : '' }}</p>
        <p class="text-sm opacity-80 leading-normal text-slate-600 col-span-12">{{ exercise.description }}</p>
        <p class="rounded-sm px-3 py-2 bg-blue-50 text-sm leading-normal text-blue-600 col-span-12" v-if="exercise.help && !exercise.passed">{{ exercise.help }}</p>
        <p class="text-sm text-red-400 col-span-12" v-if="exercise.error">{{ exercise.error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { exercises } = defineProps<{ exercises: any }>()
</script>