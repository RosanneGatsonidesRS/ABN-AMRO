<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useShowsStore } from '../stores/shows'
  import LoadingContainer from '@/components/LoadingContainer/LoadingContainer.vue'
  import ErrorContainer from '@/components/ErrorContainer/ErrorContainer.vue'
  import Message from 'primevue/message'
  import ShowImageCard from '@/components/ShowImageCard/ShowImageCard.vue'
  import Header from '@/components/Header/Header.vue'

  const route = useRoute()
  const showsStore = useShowsStore()
  const { searchResults, isLoading, error } = storeToRefs(showsStore)

  const searchQuery = ref('')
  const query = ref('')

  onMounted(() => {
    performSearch()
  })

  watch(
    () => route.query.q,
    () => {
      performSearch()
    },
  )

  const performSearch = async () => {
    query.value = (route.query.q as string) || ''
    if (query.value) {
      searchQuery.value = query.value
      await showsStore.searchShows(query.value)
    } else {
      showsStore.searchResults = []
      searchQuery.value = ''
    }
  }
</script>

<template>
  <div class="search-results">
    <Header
      :showBackHome="true"
      title="Search Results"
    />
    <LoadingContainer
      v-if="isLoading"
      content="Searching..."
    />
    <ErrorContainer
      v-else-if="error"
      :error="error"
    />

    <div v-else>
      <div
        v-if="searchResults.length === 0"
        class="search-results__none"
      >
        <Message
          severity="info"
          :closable="false"
        >
          No shows found matching "{{ searchQuery }}"
        </Message>
      </div>

      <template v-else>
      <h3>Results for  {{`&quot;${searchQuery}&quot;`}}</h3>
      <div class="search-results__grid">
        <ShowImageCard
          v-for="show in searchResults"
          :key="show.id"
          :show="show"
        />
      </div>
    </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .search-results {
    max-width: 1200px;
    margin: 0 auto;
  

    &__none {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--abn-spacing-xl);
    gap: 1rem;
  } 

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
  }
}
</style>
