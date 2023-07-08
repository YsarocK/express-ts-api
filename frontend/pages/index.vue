<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <div class="w-full max-w-2xl flex flex-col gap-10">
      <div>
        <p class="text-md text-slate-500">Score : <span>{{ exercises?.score }} / 20</span></p>
      </div>
      <exercises-list :exercises="exercises" />
      <button class="btn">Refresh</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '../store/session';
import { storeToRefs } from 'pinia';
import type { ApiResponsesTypes } from "../types";

const { user } = storeToRefs(useSessionStore());

const {
  data: exercises,
  error,
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

  const json: ApiResponsesTypes.Verify = await res.json()

  if (!json.success) {
    throw new Error(json.error);
  }

  return json.data;
});
</script>