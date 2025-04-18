<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import SearchBar from '@/components/SearchBar/SearchBar.vue'
  import type { HeaderProps } from './Header.types'
  import Button from 'primevue/button'
  defineProps<HeaderProps>()

  const router = useRouter()
</script>

<template>
  <header class="header" data-testid='header'>
    <div class="header__start">
      <Button
        v-if="showBackHome"
        class="abn-button"
        icon="pi pi-arrow-left"
        text
        @click="router.push('/')"
        label="Home"
      />
      <h2
        v-if="title"
        class="header__title"
      >
        {{ title }}
      </h2>
    </div>
    <SearchBar />
  </header>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: var(--abn-spacing-xl);

    @include tablet-and-up {
      flex-direction: row;
      justify-content: space-between;
    }

    &__start {
      display: flex;
      align-items: center;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      margin-bottom: var(--abn-spacing-md);
      gap: 1rem;
      @include tablet-and-up {
        justify-content: start;
      }
    }

    &__title {
      margin-bottom: 0;
    }
  }
</style>
