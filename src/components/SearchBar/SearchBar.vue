<script lang="ts" setup>
  import { useShowsStore } from '@/stores/shows'
  import { debounce } from '@/utils/debounce'
  import { IconField, InputIcon, InputText } from 'primevue'
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const route = useRoute()
  const showsStore = useShowsStore()
  const searchQuery = ref('')

  const handleSearch = () => {
    if (searchQuery.value.trim()) {
      router.push({
        name: 'search',
        query: { q: searchQuery.value },
      })
    }
  }

  // Debounce the search to avoid too many API calls
  const searchWithDebounce = debounce((query: string) => {
    showsStore.searchShows(query)
    handleSearch()
  }, 300)

  watch(
    () => route.query.q,
    newQuery => {
      searchQuery.value = (newQuery as string) || ''
    },
    { immediate: true },
  )
</script>

<template>
  <div class="search-bar">
    <form @submit.prevent="handleSearch">
      <div class="search-bar__input-container">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            type="text"
            v-model="searchQuery"
            placeholder="Search TV shows..."
            class="search-bar__input"
            @input="searchWithDebounce"
            aria-label="Search TV shows"
          />
        </IconField>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
  .search-bar {
    min-height: 3rem;

    min-width: 100%;

    @include tablet-and-up {
      min-width: 20rem;
    }

    &__input {
      width: 100%;
    }
  }
</style>
