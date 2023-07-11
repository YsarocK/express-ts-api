<template>
  <div class="max-w-2xl">
    <register />
  </div>
</template>

<script setup lang="ts">
import {useSessionStore} from "../../store/session";
import {storeToRefs} from "pinia";

const { store } = storeToRefs(useSessionStore())

useHead({
  titleTemplate: () => store.value ? `S'enregistrer - ${store.value.session.name}` : `S'enregister`
})
</script>