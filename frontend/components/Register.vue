<template>
  <div>
    <div v-if="hasApplied === false" >
      <form class="grid gap-4 grid-cols-12" @submit="(e) => handleSubmit(e)">
        <p class="col-span-12">Session : {{ session }}</p>

        <label class="mt-8 col-span-12">Eleve</label>
        <input v-model="form.eleve.nom" type="text" placeholder="Nom" class="rounded-md col-span-6 px-5 py-3 bg-slate-50 text-slate-700 outline-none">
        <input v-model="form.eleve.prenom" type="text" placeholder="Prénom" class="rounded-md col-span-6 px-5 py-3 bg-slate-50 text-slate-700 outline-none">
        <input v-model="form.eleve.email" type="text" placeholder="Email" class="rounded-md col-span-12 px-5 py-3 bg-slate-50 text-slate-700 outline-none">

        <label class="mt-8 col-span-12">SSH</label>
        <input v-model="form.ssh.host" type="text" placeholder="Hote" class="rounded-md col-span-12 px-5 py-3 bg-slate-50 text-slate-700 outline-none">
        <input v-model="form.ssh.username" type="text" placeholder="Username" class="rounded-md col-span-12 px-5 py-3 bg-slate-50 text-slate-700 outline-none">
        <input type="submit" class="cursor-pointer btn !bg-blue-50 col-span-12 mt-8" value="Inscription">
      </form>
      <p v-if="error" class="mt-5 text-sm text-red-400">Impossible de rejoindre la session</p>
    </div>
    <div v-else>
      <p class="text-sm text-blue-500 text-center">Vous allez recevoir votre lien unique sur {{ form.eleve.email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormTypes } from "../types/";
import { useSessionStore } from "../store/session";
import { storeToRefs } from "pinia";

const { store } = storeToRefs(useSessionStore())

const { session } = useRoute().params
const { $api } = useNuxtApp()

const hasApplied = ref(false)
const error: Ref<undefined | string> = ref(undefined)

const form: Ref<FormTypes.Register> = ref({
  eleve: {
    nom: '',
    prenom: '',
    email: ''
  },
  ssh: {
    host: '',
    username: ''
  }
})

const handleSubmit = (e: Event) => {
  e.preventDefault()
  $api.register(session, form.value)
      .then(() => {
        hasApplied.value = true
      })
      .catch((err: string) => {
        error.value = err
      })
}
</script>