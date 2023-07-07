<template>
    <button>{{ props.text }}</button>
</template>

<script setup lang="ts">
const props = defineProps(['text']);
</script>