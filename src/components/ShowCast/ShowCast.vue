<script lang="ts" setup>
  import type { ShowCastProps } from './ShowCast.types'
  defineProps<ShowCastProps>()
</script>

<template>
  <div class="show-cast" data-testid="show-cast">
    <h2 data-testid="show-cast-title">Cast</h2>
    <div class="show-cast__list">
      <div
        v-for="member in cast.slice(0, 12)"
        :key="member.person.id"
        class="show-cast__member"
        data-testid="show-cast-member"
      >
        <div class="show-cast__image">
          <img
            data-testid="show-cast-img"
            :src="member.person.image?.medium || '/placeholder-person.png'"
            :alt="member.person.name"
          />
        </div>
        <div class="show-cast__info">
          <div class="show-cast__person-name" data-testid="show-cast-person-name">{{ member.person.name }}</div>
          <div class="show-cast__character-name" data-testid="show-cast-character-name">
            {{ member.character.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .show-cast {
    padding: 2rem;
    border-top: 1px solid var(--abn-surface-border);

    &__list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1.5rem;
    }

    &__member {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    &__image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 0.75rem;
    }

    &__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    &__person-name {
      font-weight: 600;
      font-size: 0.875rem;
    }

    &__character-name {
      font-size: 0.75rem;
      color: var(--abn-text-color-secondary);
    }
  }
</style>
