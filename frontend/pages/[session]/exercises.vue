<template>
  <div class="w-full h-full max-w-2xl flex flex-col gap-10">
    <div class="w-full">
      <h1 class="text-2xl mb-4 font-bold">NOM DE LA SESSION</h1>
      <p class="text-sm text-slate-500">Votre score final est toujours le dernier score enregistré et non le score le plus élevé. Faîtes attention à ne pas impacter les exercices précedents.</p>
    </div>
    <div class="flex gap-4 items-center text-sm text-slate-500">
      <p><span class="font-bold">IP</span> : {{ session.ssh.host }}</p>
      <p><span class="font-bold">Username</span> : {{ session.ssh.username }}</p>
      <p><span class="font-bold">Utilisateur</span> : MOURETON Etienne</p>
    </div>
    <informations />
    <div>
      <p class="text-md text-slate-500">
        Score : <span>{{ exercises?.score || 'calcul...' }} / 20</span>
      </p>
    </div>
    <exercises-list :exercises="exercises" />
    <button class="btn" @click="verify">Tester</button>
  </div>
</template>

<script setup lang="ts">
import { ApiResponsesTypes } from '../../types';
import Informations from "../../components/Informations.vue";
import {useSessionStore} from "../../store/session";
import {storeToRefs} from "pinia";

const { $api } = useNuxtApp();

const { session } = storeToRefs(useSessionStore())

const exercises: Ref<undefined | ApiResponsesTypes.Verify> = ref(undefined);

onMounted(async () => {
  exercises.value = await $api.verifyExercises();
});

const verify = async () => {
  exercises.value ? exercises.value = undefined : null
  exercises.value = await $api.verifyExercises();
}
</script>
