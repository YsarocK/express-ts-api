<template>
  <form class="flex flex-col gap-4" @submit="(e) => createSession(e)">
    <p class="mb-3 font-bold text-2xl">Créer une session</p>
    <input v-model="sessionName" class="rounded-md col-span-6 px-5 py-3 bg-slate-50 text-slate-700 outline-none" type="text" name="name" id="name" placeholder="Hetic mt4">
    <input class="btn !bg-blue-50 active-scale-90" type="submit" value="Créer">
    <p v-if="submitResult">{{ submitResult }}</p>
  </form>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()

const sessionName = ref('')
const submitResult = ref(undefined)
const createSession = async (e: Event) => {
  e.preventDefault()
  $api.admin.createSession(sessionName.value)
      .then(() => {
        submitResult.value = 'Session créee avec succès'
      })
      .catch(() => {
        submitResult.value = 'Erreur lors de la création de la session'
      })
}
</script>