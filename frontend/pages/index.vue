<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <h1>Vue.js</h1>
    <p v-if="btn">COUCOU</p>
    <Button @click="btn = !btn">CLICK</Button>
  </div>
</template>

<script setup lang="ts">
  const btn = ref(false);

  console.log('couou');
</script>
