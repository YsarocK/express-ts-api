<template>
  <div class="flex flex-col">
    <div class="flex justify-between mb-4">
      <p class="mb-3 font-bold text-2xl">Liste des sessions</p>
      <nuxt-icon class="w-6 text-blue-500 cursor-pointer" name="refresh" @click="() => getSessions()"/>
    </div>
    <div class="flex flex-col gap-4" v-if="sessions">
      <div v-for="session in sessions" :key="session" class="flex items-center gap-6 px-4 py-3 bg-slate-50 rounded-md">
        <div
            class="w-3 h-3 rounded-full cursor-pointer"
            :class="session.isActive ? 'bg-green-400' : 'bg-orange-400'"
            @click="() => handleSessionUpdate(session.id, !session.isActive)"
        >
        </div>
        <div class="flex flex-col gap-1">
          <p>{{ session.name }}</p>
          <p class="text-xs">{{ session.id }}</p  >
        </div>
        <div class="flex gap-4 mr-0 ml-auto">
          <p @click="copyLink(session.id)" class="active-scale-90">
            Lien d'inscription
          </p>
          <a target="_blank" :href="`/admin/${session.id}/results`">
            Résultats
          </a>
        </div>
      </div>
    </div>
    <Loader v-else text="Chargement des sessions..." />
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const sessions = ref(undefined)

onMounted(async () => {
  getSessions()
})

const getSessions = async () => {
  sessions.value = undefined
  const { sessions: res } = await $api.admin.getAllSessions()
  sessions.value = res
}

const copyLink = (id: string) => {
  const link = `${window.location.origin}/${id}/register`
  navigator.clipboard.writeText(link)
}

const handleSessionUpdate = async (id: string, isActive: boolean) => {
  $api.admin.updateSession(id, isActive)
      .then(sessions.value.filter((session: any) => session.id === id)[0].isActive = isActive)
}
</script>