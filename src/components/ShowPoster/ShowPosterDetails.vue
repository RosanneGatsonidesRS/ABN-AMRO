<script lang="ts" setup>
  import type { ShowPosterDetailsProps } from './ShowPoster.types'

  defineProps<ShowPosterDetailsProps>()
</script>

<template>
  <div class="show-poster__detail-item">
    <span class="show-poster-details-item__label">{{ label }}</span>
    <span class="show-poster-details-item__value">{{ value }}</span>
  </div>
</template>

<style lang="scss" scoped>
  .show-poster-details-item {
    display: flex;
    flex-direction: column;

    &__label {
      font-weight: 600;
      color: var(--abn-text-color-secondary);
      font-size: var(--abn-font-size-base);
      margin-right: var(--abn-spacing-xs);
    }
  }
</style>
