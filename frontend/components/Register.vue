<template>
  <div>
    <form class="grid gap-4 grid-cols-12" @submit="(e) => handleSubmit(e)">
      <p class="col-span-12">Session : {{ session }}</p>

      <label class="mt-8 col-span-12">Eleve</label>
      <input type="text" placeholder="Nom" class="rounded-md col-span-6 px-5 py-3 bg-slate-50 text-slate-700 outline-none">
      <input type="text" placeholder="Prénom" class="rounded-md col-span-6 px-5 py-3 bg-slate-50 text-slate-700 outline-none">
      <input type="text" placeholder="Email" class="rounded-md col-span-12 px-5 py-3 bg-slate-50 text-slate-700 outline-none">

      <label class="mt-8 col-span-12">SSH</label>
      <input type="text" placeholder="Hote" class="rounded-md col-span-12 px-5 py-3 bg-slate-50 text-slate-700 outline-none">
      <input type="text" placeholder="Username" class="rounded-md col-span-12 px-5 py-3 bg-slate-50 text-slate-700 outline-none">
      <input type="submit" class="btn !bg-blue-50 col-span-12 mt-8" value="Inscription">
    </form>
  </div>
</template>

<script setup lang="ts">
const { session } = useRoute().params

useHead({
  title: session
})

const handleSubmit = (e) => {
  e.preventDefault()

  // Vérifier la connexion SSH et throw une error si ça ne fonctionne pas
}
</script>