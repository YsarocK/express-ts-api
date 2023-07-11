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
      :key="result.user.firstname + result.user.lastname"
      class="w-full grid grid-cols-12 items-center"
    >
      <p class="col-span-4">{{ `${result.user.firstname} ${result.user.lastname}` }}</p>
      <p class="col-span-2">{{ result.session.score }}</p>
      <p class="col-span-2">{{ result.session.nb_try }}</p>
      <button class="btn col-span-4 justify-self-end">Voir plus</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()

const props = defineProps<{
  session: string
}>()

const results: Ref<undefined | Array<any>> = ref(undefined)

onMounted(async () => {
  results.value = await $api.admin.getSession(props.session)
  console.log(results.value)
})
</script>