<template>
  <div class="w-full flex flex-col gap-3">
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
const props = defineProps({
  session: {
    type: String,
    required: true
  }
})

const results = ref([
  {
    user: {
      firstname: 'John',
      lastname: 'Doe'
    },
    session: {
      score: 10,
      nb_try: 3
    }
  },
  {
    user: {
      firstname: 'Jane',
      lastname: 'Doe'
    },
    session: {
      score: 17,
      nb_try: 9
    }
  }
])
</script>