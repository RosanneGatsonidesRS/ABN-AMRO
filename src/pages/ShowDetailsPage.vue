<script setup lang="ts">
  import { onMounted, computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useShowsStore } from '../stores/shows'
  import ShowCast from '@/components/ShowCast/ShowCast.vue'
  import LoadingContainer from '@/components/LoadingContainer/LoadingContainer.vue'
  import ErrorContainer from '@/components/ErrorContainer/ErrorContainer.vue'
  import Header from '@/components/Header/Header.vue'
  import ShowPoster from '@/components/ShowPoster/ShowPoster.vue'

  const route = useRoute()

  const showsStore = useShowsStore()
  const { selectedShow, isLoading, error } = storeToRefs(showsStore)

  const show = computed(() => selectedShow.value)

  const showId = ref<number | null>(null)

  onMounted(async () => {
    const id = Number(route.params.id)
    if (!isNaN(id)) {
      showId.value = id
      await showsStore.getShowById(id)
    }
  })
</script>

<template>
  <div class="show-detail">
    <Header
      :show-back-home="true"
      title="Show details"
    />
    <LoadingContainer
      v-if="isLoading"
      content="Loading show details..."
    />
    <ErrorContainer
      v-else-if="error"
      :error="error"
    />

    <template v-else-if="show">
      <ShowPoster
        :show="show"
        data-testid="show-poster"
      />

      <ShowCast
        v-if="show._embedded?.cast?.length"
        :cast="show._embedded.cast"
      />
    </template>
  </div>
</template>
