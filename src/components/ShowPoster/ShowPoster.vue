<script lang="ts" setup>
  import { formatDate, formatSchedule } from './ShowPoster.features'
  import type { ShowPosterProps } from './ShowPoster.types'
  import Button from 'primevue/button'
  import ShowPosterDetails from './ShowPosterDetails.vue'
  import Tag from 'primevue/tag'

  defineProps<ShowPosterProps>()
</script>
<template>
  <div
    class="show-poster"
    data-testid="show-poster"
  >
    <div class="show-poster__image">
      <img
        :src="show.image?.original || '/placeholder-image.png'"
        :alt="show.name"
      />
    </div>

    <div class="show-poster__info">
      <h1 class="show-poster__title">{{ show.name }}</h1>

      <div class="show-poster__meta">
        <Tag
          v-for="genre in show.genres"
          :key="genre"
          :value="genre"
        />

        <div
          class="show-poster__rating"
          v-if="show.rating?.average"
        >
          <i
            class="pi pi-star-fill"
            style="color: #ffcc00"
          ></i>
          <span>{{ show.rating.average }}/10</span>
        </div>
      </div>

      <div class="show-poster__details">
        <ShowPosterDetails
          v-if="show.status"
          label="Status:"
          :value="show.status"
        />
        <ShowPosterDetails
          v-if="show.premiered"
          label="Premiered:"
          :value="formatDate(show.premiered)"
        />
        <ShowPosterDetails
          v-if="show.schedule"
          label="Network:"
          :value="formatSchedule(show.schedule)"
        />
        <ShowPosterDetails
          v-if="show.network"
          label="Schedule:"
          :value="show.network.name"
        />
      </div>

      <div
        class="show-poster__summary"
        v-if="show.summary"
        v-html="show.summary"
      />

      <div class="show-poster__actions">
        <Button
          as="a"
          label="Official Site"
          :href="show.officialSite"
          icon="pi pi-external-link"
          iconPos="right"
          target="_blank"
          rel="noopener"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .show-poster {
    --abn-surface-card: var(--abn-color-surface);

    background-color: var(--abn-surface-card);
    border-radius: var(--abn-border-radius-md);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: var(--abn-spacing-xl);
    @include tablet-and-up {
      flex-direction: row;
    }

    &__image img {
      width: 100%;
      height: auto;
      border-radius: var(--abn-border-radius-md);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &__title {
      font-size: var(--abn-font-size-3xl);
      font-weight: 700;
    }

    &__meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: var(--abn-spacing-sm);
    }
    &__rating {
      display: flex;
      align-items: center;
      margin-top: var(--abn-spacing-xs);
      gap: 0.5rem;
      font-weight: 600;
    }

    &__details {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      margin: var(--abn-spacing-md) 0;
    }

    &__summary {
      line-height: 1.6;
      color: var(--abn-text-color);
    }

    &__actions {
      margin-top: var(--abn-spacing-md);
    }
  }
</style>
