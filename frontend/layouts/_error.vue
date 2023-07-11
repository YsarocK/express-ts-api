<template>
  <main class="px-8 py-10 font-sans w-screen min-h-screen flex flex-col justify-center items-center">
    <p>Wesh</p>
  </main>
</template>

<script setup lang="ts">
import '@unocss/reset/normalize.css'
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/tailwind.css'

const error = useError()
console.log(useError())
</script>