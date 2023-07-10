<template>
  <div class="flex flex-col gap-4 w-full">
    <div class="w-full flex flex-col justify-center items-center bg-slate-50 p-10 rounded-md" v-if="!exercises">
      <p class="text-sm text-slate-400 mb-5">Chargement des exercices...</p>
      <div role="status">
        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div
      v-else-if="typeof exercises.tests !== 'string'"
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
        <p class="p-3 bg-blue-50 text-sm leading-normal exercises-list__card__content__help text-blue-600" v-if="exercise.help && !exercise.passed">{{ exercise.help }}</p>
        <p class="text-sm text-red-400" v-if="exercise.error">{{ exercise.error }}</p>
      </div>
    </div>
    <div v-else class="w-full flex flex-col justify-center items-center red p-10 rounded-md">
      <p class="text-sm text-red-400 mb-5">{{ exercises }}</p>
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

      &__help {
        grid-area: help;
      }
    }
  }
}
</style>