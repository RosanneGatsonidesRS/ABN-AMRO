<script lang="ts" setup>
  import type { Show } from '@/types/Show'

  defineProps<{
    show: Show
  }>()
</script>

<template>
  <div class="image-card">
    <router-link :to="{ name: 'show-detail', params: { id: show.id } }">
      <div class="show-image">
        <img
          :src="show.image?.medium || '/placeholder-image.png'"
          :alt="show.name"
        />
        <div
          class="image-card__rating"
          v-if="show.rating.average"
        >
          <span>{{ show.rating.average }}</span>
        </div>
      </div>
      <div class="image-card__info">
        <h3 class="image-card__title">{{ show.name }}</h3>
        <div class="image-card__genres">
          <span
            v-for="(genre, index) in show.genres"
            :key="genre"
          >
            {{ genre }}{{ index < show.genres.length - 1 ? ', ' : '' }}
          </span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  .image-card {
    --abn-surface-card: var(--abn-color-surface);

    position: relative;
    transition: transform 0.2s;
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: var(--abn-surface-card);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-5px);
    }

    &__image {
      position: relative;
      aspect-ratio: 2/3;
    }

    img {
      width: 100%;
      height: 19rem;
      object-fit: cover;

      @include tablet-and-up {
          height: 100%;
      }
    }

    &__rating {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background-color: rgba(0, 0, 0, 0.7);
      color: #ffcc00;
      border-radius: 0.25rem;
      padding: 0.25rem 0.5rem;
      font-weight: bold;
      font-size: 0.875rem;
    }

    &__info {
      padding: 1rem;
    }

    &__title {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    &__genres {
      font-size: 0.75rem;
      color: var(--abn-text-color-secondary);
    }
  }

  .genre-show-list__card {
    @include tablet-and-up {
      width: 15rem;
    }
  }
</style>
