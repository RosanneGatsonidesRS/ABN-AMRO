import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Show } from '@/types/Show'
import type { Genre } from '@/types/Genre'
import { fetchData } from '@/utils/fetchDataUtils'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://api.tvmaze.com'

export const useShowsStore = defineStore('shows', () => {
  const shows = ref<Show[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const selectedShow = ref<Show | null>(null)
  const searchResults = ref<Show[]>([])

  const genres = computed<Genre[]>(() => {
    const genreSet = new Set<string>()
    shows.value.forEach(show => {
      if (show.genres) {
        show.genres.forEach(genre => genreSet.add(genre))
      }
    })
    return Array.from(genreSet).sort()
  })

  const showsByGenre = computed(() => {
    const result: Record<string, Show[]> = {}

    genres.value.forEach(genre => {
      result[genre] = shows.value
        .filter(show => show.genres && show.genres.includes(genre))
        .sort((a, b) => {
          const ratingA = a.rating?.average || 0
          const ratingB = b.rating?.average || 0
          return ratingB - ratingA
        })
    })

    return result
  })

  async function getAllShows(forceRefresh = false) {
    isLoading.value = true
    error.value = null

    try {
      const cacheKey = 'tvmaze_all_shows'
      const endpoint = `${API_BASE_URL}/shows`

      if (forceRefresh) {
        localStorage.removeItem(cacheKey)
      }

      const data = await fetchData<Show[]>(endpoint, cacheKey)
      shows.value = data
    } catch (err: any) {
      error.value =
        err instanceof Error ? err.message : 'Unknown error occurred'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function getShowById(id: number, forceRefresh = false) {
    isLoading.value = true
    error.value = null

    try {
      const cacheKey = `tvmaze_show_${id}`
      const endpoint = `${API_BASE_URL}/shows/${id}?embed=cast`

      if (forceRefresh) {
        localStorage.removeItem(cacheKey)
      }

      const data = await fetchData<Show>(endpoint, cacheKey)
      selectedShow.value = data
    } catch (err: any) {
      error.value =
        err instanceof Error ? err.message : 'Unknown error occurred'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function searchShows(query: string, forceRefresh = false) {
    console.log('search ')
    if (!query.trim()) {
      searchResults.value = []
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const normalizedQuery = query.trim().toLowerCase()
      const cacheKey = `tvmaze_search_${normalizedQuery}`
      const endpoint = `${API_BASE_URL}/search/shows?q=${encodeURIComponent(normalizedQuery)}`

      if (forceRefresh) {
        localStorage.removeItem(cacheKey)
      }

      const data = await fetchData<Array<{ show: Show }>>(endpoint, cacheKey)
      searchResults.value = data.map(item => item.show)
    } catch (err: any) {
      error.value =
        err instanceof Error ? err.message : 'Unknown error occurred'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    shows,
    isLoading,
    error,
    selectedShow,
    searchResults,
    genres,
    showsByGenre,
    getAllShows,
    getShowById,
    searchShows,
  }
})
