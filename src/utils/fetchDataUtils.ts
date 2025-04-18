import axios from 'axios'

const CACHE_EXPIRATION =
  parseInt(import.meta.env.VITE_CACHE_EXPIRATION as string) || 5 * 60 * 1000 // 5 minutes in milliseconds

interface CacheItem<T> {
  data: T
  timestamp: number
}

export function getCachedData<T>(key: string): T | null {
  const cachedItem = localStorage.getItem(key)
  if (cachedItem) {
    const { data, timestamp }: CacheItem<T> = JSON.parse(cachedItem)
    if (Date.now() - timestamp < CACHE_EXPIRATION) {
      return data
    }
  }
  return null
}

export function setCachedData<T>(key: string, data: T): void {
  const cacheItem: CacheItem<T> = {
    data,
    timestamp: Date.now(),
  }
  localStorage.setItem(key, JSON.stringify(cacheItem))
}

export async function fetchData<T>(
  endpoint: string,
  cacheKey: string,
): Promise<T> {
  const cachedData = getCachedData<T>(cacheKey)

  if (cachedData) {
    return Promise.resolve(cachedData)
  }

  try {
    const response = await axios.get<T>(endpoint)
    setCachedData(cacheKey, response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
