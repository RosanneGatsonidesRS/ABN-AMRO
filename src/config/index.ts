// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.tvmaze.com',
  CACHE_PREFIX: 'tvmaze_',
  ENDPOINTS: {
    SHOWS: '/shows',
    SHOW_DETAILS: (id: number) => `/shows/${id}?embed=cast`,
    SEARCH: (query: string) => `/search/shows?q=${encodeURIComponent(query)}`,
  },
}

// Cache Configuration
export const CACHE_CONFIG = {
  EXPIRATION: 5 * 60 * 1000, // 5 minutes in milliseconds
  KEYS: {
    ALL_SHOWS: 'tvmaze_all_shows',
    SHOW_DETAILS: (id: number) => `tvmaze_show_${id}`,
    SEARCH: (query: string) => `tvmaze_search_${query.trim().toLowerCase()}`,
  },
}
