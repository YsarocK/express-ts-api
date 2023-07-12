<template>
  <div class="fixed w-screen h-screen ">
    <div class="w-full h-full relative flex">
      <form @submit="(e) => handleSubmit(e)" class="m-auto min-w-lg flex flex-col gap-4 z-10 p-5 bg-white rounded-md">
        <p class="mb-5 text-2xl font-bold">Connectez-vous</p>
        <input v-model="form.email" class="rounded-md col-span-6 px-5 py-3 bg-slate-50 text-slate-700 outline-none" type="text" placeholder="Email" name="email" />
        <input v-model="form.password" class="rounded-md col-span-6 px-5 py-3 bg-slate-50 text-slate-700 outline-none" type="password" placeholder="Mot de passe" name="password" />
        <input type="submit" value="Se connecter" class="btn !bg-blue-50" />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Connexion',
})

const { $api } = useNuxtApp()

const form = ref({
  email: '',
  password: ''
})

const handleSubmit = (e) => {
  e.preventDefault()
  $api.admin.login(form.value.email, form.value.password)
      .then(success => {
        if(success) navigateTo('/admin')
      })
}
</script>