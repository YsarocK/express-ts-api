<template>
  <div class="w-full flex flex-col gap-3" v-if="results && results.length > 0">
    <div
        class="w-full grid grid-cols-12 items-center text-slate-500"
    >
      <p class="col-span-4">Nom - Prénom</p>
      <p class="col-span-2">Score</p>
      <p class="col-span-2">Nombre d'essais</p>
      <button class="col-span-4 justify-self-end">Infos</button>
    </div>
    <div
      v-for="result in results"
      :key="result.User.firstname + result.User.lastname"
      class="w-full grid grid-cols-12 items-center"
    >
      <p class="col-span-4">{{ `${result.User.firstname} ${result.User.lastname}` }}</p>
      <p class="col-span-2">{{ result.note }}</p>
      <p class="col-span-2">{{ result.nb_try }}</p>
      <button class="btn col-span-4 justify-self-end">Voir plus</button>
    </div>
  </div>
  <div v-else class="min-h-xl flex">
    <Loader text="Chargement des résultats" />
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()

const props = defineProps<{
  session: string
}>()

const results: Ref<undefined | Array<any>> = ref(undefined)

onMounted(async () => {
  const { users_sessions } = await $api.admin.getSession(props.session)
  results.value = users_sessions
  console.log(results.value)
})
</script>