<script lang="ts" setup>
  import Message from 'primevue/message'
  import type { ErrorContainerProps } from './ErrorContainer.types'

  defineProps<ErrorContainerProps>()
</script>
<template>
  <div
    class="container__error"
    data-testid="container-error"
  >
    <Message
      severity="error"
      :closable="false"
    >
      {{ error }}
    </Message>
  </div>
</template>
