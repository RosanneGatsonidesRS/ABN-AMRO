<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useShowsStore } from '@/stores/shows'
  import GenreShowList from '@/components/GenreShowList/GenreShowList.vue'
  import LoadingContainer from '@/components/LoadingContainer/LoadingContainer.vue'
  import ErrorContainer from '@/components/ErrorContainer/ErrorContainer.vue'
  import { onMounted } from 'vue'
  import Header from '@/components/Header/Header.vue'

  const showsStore = useShowsStore()
  const { genres, showsByGenre, isLoading, error } = storeToRefs(showsStore)

  onMounted(async () => {
    await showsStore.getAllShows()
  })
</script>

<template>
  <div
    class="dashboard"
    data-testid="dashboard-page"
  >
    <Header title="Popular TV Shows by Genre" />
    <LoadingContainer
      v-if="isLoading"
      content="Loading shows..."
    />
    <ErrorContainer
      v-else-if="error"
      :error="error"
    />

    <div v-else>
      <div
        v-for="genre in genres"
        :key="genre"
        class="dashboard__genre-section"
        data-testid="dashboard-genre-section"
      >
        <GenreShowList
          :genre="genre"
          :shows="showsByGenre[genre]"
        />
      </div>
    </div>
  </div>
</template>
