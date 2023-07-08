<template>
  <div class="flex flex-col gap-4 w-full">
    <div
      v-if="exercises.tests && typeof exercises.tests !== 'string'"
      class="flex items-start gap-4 p-4 w-full rounded-md bg-slate-50"
      v-for="exercise in exercises.tests"
    >
      <div
        v-if="exercise.passed"
        class="bg-green-100 p-2 w-10 h-10 min-w-10 min-h-10 rounded-md flex"
      >
        <nuxt-icon
          name="check"
          class="text-green-400 text-md w-full h-full m-auto"
        />
      </div>
      <div v-else class="bg-red-100 p-2 w-10 h-10 min-w-10 min-h-10 rounded-md flex">
        <nuxt-icon
          name="close"
          class="text-red-400 text-md w-full h-full m-auto"
        />
      </div>
      <div class="exercises-list__card__content w-full grid gap-3">
        <p class="text-md leading-none exercises-list__card__content__title">{{ exercise.title }}</p>
        <p class="text-sm leading-none exercises-list__card__content__points text-slate-400">{{ exercise.points }} point{{ exercise.points > 1 ? 's' : '' }}</p>
        <p class="text-sm opacity-80 leading-normal exercises-list__card__content__description text-slate-600">{{ exercise.description }}</p>
      </div>
    </div>
    <div v-else>
      <p>Cannot fetch</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { exercises } = defineProps<{ exercises: any }>()
</script>

<style lang="scss">
.exercises-list {
  &__card {
    &__content {
      grid-template-areas: "title points" "description description";
      grid-template-columns: 1fr auto;

      &__title {
        grid-area: title;
      }

      &__points {
        grid-area: points;
      }

      &__description {
        grid-area: description;
      }
    }
  }
}
</style>