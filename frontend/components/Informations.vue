<template>
  <div class="">
    <div class="w-full break-all flex flex-col">
      <div class="flex justify-between">
        <p class="text-sm">Clé SSH publique </p>
        <p v-if="copied" class="text-sm ml-2 text-green-300 active-scale-90">copié</p>
      </div>
      <p @click="() => copyToClipboard()" class="cursor-pointer text-sm text-slate-400 mb-5">{{ sshPublicKey }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { sshPublicKey } = useRuntimeConfig().public
const copied = ref(false)

const copyToClipboard = () => {
  navigator.clipboard.writeText(sshPublicKey)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>