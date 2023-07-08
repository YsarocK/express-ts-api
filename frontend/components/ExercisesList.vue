<template>
  <div class="flex flex-col gap-2 w-full max-w-2xl">
    <div
      v-if="exercises.tests && typeof exercises.tests !== 'string'"
      class="flex items-center gap-4 p-4 w-full rounded-md bg-slate-50"
      v-for="exercise in exercises.tests"
    >
      <div
        v-if="exercise.passed"
        class="bg-green-100 p-2 w-10 h-10 rounded-md flex"
      >
        <nuxt-icon
          name="check"
          class="text-green-400 text-md w-full h-full m-auto"
        />
      </div>
      <div v-else class="bg-red-100 p-2 w-10 h-10 rounded-md flex">
        <nuxt-icon
          name="close"
          class="text-red-400 text-md w-full h-full m-auto"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p class="text-xl">{{ exercise.title }}</p>
        <p class="text-sm opacity-80">{{ exercise.description }}</p>
      </div>
    </div>
    <div v-else>
      <p>Cannot fetch</p>
    </div>
    <button class="btn mt-5" @click="() => refresh()">Refresh</button>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '../store/session';
import { storeToRefs } from 'pinia';

const { user } = storeToRefs(useSessionStore());

const {
  data: exercises,
  error,
  refresh,
} = await useAsyncData('exercises', async () => {
  const { apiEndpoint } = useRuntimeConfig().public;
  const res = await fetch(`${apiEndpoint}/exercises/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      host: user.value.ssh.host,
      username: user.value.ssh.username,
    }),
  });
  return await res.json();
});
</script>
