<template>
  <div>
    <form class="grid gap-4 grid-cols-12" @submit="(e) => handleSubmit(e)">
      <p class="col-span-12">Session : {{ session }}</p>

      <label class="mt-8 col-span-12">Eleve</label>
      <input v-model="form.eleve.nom" type="text" placeholder="Nom" class="rounded-md col-span-6 px-5 py-3 bg-slate-50 text-slate-700 outline-none">
      <input v-model="form.eleve.prenom" type="text" placeholder="Prénom" class="rounded-md col-span-6 px-5 py-3 bg-slate-50 text-slate-700 outline-none">
      <input v-model="form.eleve.email" type="text" placeholder="Email" class="rounded-md col-span-12 px-5 py-3 bg-slate-50 text-slate-700 outline-none">

      <label class="mt-8 col-span-12">SSH</label>
      <input v-model="form.ssh.host" type="text" placeholder="Hote" class="rounded-md col-span-12 px-5 py-3 bg-slate-50 text-slate-700 outline-none">
      <input v-model="form.ssh.username" type="text" placeholder="Username" class="rounded-md col-span-12 px-5 py-3 bg-slate-50 text-slate-700 outline-none">
      <input type="submit" class="btn !bg-blue-50 col-span-12 mt-8" value="Inscription">
    </form>
  </div>
</template>

<script setup lang="ts">
import { UserTypes } from '../types'

const { session } = useRoute().params
const { $api } = useNuxtApp()

const form: Ref<UserTypes.Register> = ref({
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

useHead({
  title: session as string
})

const handleSubmit = (e: Event) => {
  e.preventDefault()
  $api.register(session, form.value)
}
</script>