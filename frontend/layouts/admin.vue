<template>
  <nuxt-layout name="default">
    <nuxt-page />
    <div v-if="!loggedAsAdmin" class="fixed w-screen h-screen ">
      <div class="w-full h-full relative">
        <div class="absolute w-full h-full bg-black/5"></div>
        <form>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Mot de passe" name="password" />
          <input type="submit" value="Se connecter" class="btn" />
        </form>
      </div>
    </div>
  </nuxt-layout>
</template>

<script setup lang="ts">
const loggedAsAdmin = ref(false)
</script>
