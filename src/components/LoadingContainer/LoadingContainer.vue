<script lang="ts" setup>
  import ProgressSpinner from 'primevue/progressspinner'
  import type { LoadingContainerProps } from './LoadingContainer.types'

  defineProps<LoadingContainerProps>()
</script>

<template>
  <div
    class="container__loading"
    data-testid="container-loading"
  >
    <ProgressSpinner />
    <p>{{ content }}</p>
  </div>
</template>
