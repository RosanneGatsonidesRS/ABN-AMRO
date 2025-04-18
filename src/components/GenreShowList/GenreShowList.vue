<script setup lang="ts">
  import { computed } from 'vue'
  import Carousel from 'primevue/carousel'
  import ShowImageCard from '@/components/ShowImageCard/ShowImageCard.vue'
  import { RESPONSIVE_OPTIONS } from './GenreShowList.const'
  import type { GenreShowListProps } from './GenreShowList.types'
  import { useViewport } from '@/composables/useViewport'

  const { isMobile } = useViewport()

  const props = defineProps<GenreShowListProps>()

  const numVisible = computed(() => {
    return Math.min(4, props.shows.length)
  })
</script>

<template>
  <div class="genre-show-list" data-testid="genre-show-list">
    <h2
      class="genre-show-list__title"
      data-testid="genre-show-list-title"
    >
      {{ genre }}
    </h2>

    <div
      v-if="isMobile"
      class="genre-show-list__mobile-carousel"
      data-testid="genre-show-list-carousel-mobile"
    >
      <div class="genre-show-list__header">
        <span class="genre-show-list__count">{{ shows.length }} shows</span>
      </div>

      <div class="genre-show-list__items">
        <ShowImageCard
          v-for="show in shows"
          :key="show.id"
          :show="show"
          class="genre-show-list__card"
        />
      </div>
    </div>

    <Carousel
      v-else
      :value="shows"
      :numVisible="numVisible"
      :numScroll="1"
      :responsiveOptions="RESPONSIVE_OPTIONS"
      :carousel="true"
      :showIndicators="true"
      containerClass="genre-show-list__carousel-container"
      class="genre-show-list__carousel"
      data-testid="genre-show-list-carousel-desktop"
    >
      <template #item="show">
        <div class="genre-show-list__item">
          <ShowImageCard
            :show="show.data"
            class="genre-show-list__card"
          />
        </div>
      </template>
      <template #header>
        <div class="genre-show-list__header">
          <span class="genre-show-list__count">{{ shows.length }} shows</span>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<style lang="scss">
  .genre-show-list {
    margin-bottom: var(--abn-spacing-xl);

    &__title {
      font-size: var(--abn-font-size-xl);
      font-weight: 600;
      margin-bottom: var(--abn-spacing-md);
      display: flex;
      align-items: center;

      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 1em;
        background-color: var(--abn-color-primary);
        margin-right: var(--abn-spacing-sm);
        border-radius: var(--abn-border-radius-sm);
      }
    }

    &__header {
      display: flex;
      justify-content: flex-end;
      margin-bottom: var(--abn-spacing-sm);
    }

    &__count {
      font-size: var(--abn-font-size-sm);
      color: var(--abn-color-text-secondary);
      background-color: var(--abn-color-surface);
      padding: var(--abn-spacing-xs) var(--abn-spacing-sm);
      border-radius: var(--abn-border-radius-sm);
    }

    &__carousel {
      --abn-carousel-content-gap: 0.25rem;
      --abn-disabled-opacity: 0;
      position: relative;

      .image-card {
        margin: 0 var(--abn-spacing-md);
      }
    }

    &__card {
      @include tablet-and-up {
        width: 15rem;
      }
    }

    &__mobile-carousel .genre-show-list__items {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      gap: 1rem;

      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;

      .genre-show-list__card {
        flex: 0 0 auto;
      }
    }
  }
</style>
