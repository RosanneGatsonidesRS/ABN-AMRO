import { fetchData, getCachedData, setCachedData } from '@/utils/fetchDataUtils'
import axios from 'axios'

vi.mock('axios')

describe('Fetch Data Utils', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    localStorage.clear()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.resetAllMocks()
  })

  describe('getCachedData', () => {
    it('should return null for non-existent cache key', () => {
      const result = getCachedData('non-existent-key')
      expect(result).toBeNull()
    })

    it('should return cached data if within expiration time', () => {
      const testData = { rock: 'star' }
      localStorage.setItem(
        'test-key',
        JSON.stringify({ data: testData, timestamp: Date.now() }),
      )
      const result = getCachedData('test-key')
      expect(result).toEqual(testData)
    })

    it('should return null if cached data is expired', () => {
      const testData = { rock: 'star' }
      localStorage.setItem(
        'test-key',
        JSON.stringify({
          data: testData,
          timestamp: Date.now() - 6 * 60 * 1000,
        }),
      )
      const result = getCachedData('test-key')
      expect(result).toBeNull()
    })
  })

  describe('setCachedData', () => {
    it('should set data in localStorage with current timestamp', () => {
      const testData = { foo: 'bar' }
      setCachedData('test-key', testData)
      const storedItem = localStorage.getItem('test-key')
      expect(storedItem).not.toBeNull()
      const parsedItem = JSON.parse(storedItem!)
      expect(parsedItem.data).toEqual(testData)
      expect(parsedItem.timestamp).toBeCloseTo(Date.now(), -2)
    })
  })

  describe('fetchData', () => {
    it('should return cached data if available', async () => {
      const testData = { rock: 'star' }
      localStorage.setItem(
        'test-key',
        JSON.stringify({ data: testData, timestamp: Date.now() }),
      )
      const result = await fetchData('http://example.com/api', 'test-key')
      expect(result).toEqual(testData)
      expect(axios.get).not.toHaveBeenCalled()
    })

    it('should fetch and cache data if not in cache', async () => {
      const testData = { rock: 'star' }
      vi.mocked(axios.get).mockResolvedValue({ data: testData })
      const result = await fetchData('http://example.com/api', 'test-key')
      expect(result).toEqual(testData)
      expect(axios.get).toHaveBeenCalledWith('http://example.com/api')
      const cachedData = getCachedData('test-key')
      expect(cachedData).toEqual(testData)
    })

    it('should throw error if fetch fails', async () => {
      vi.mocked(axios.get).mockRejectedValue(new Error('Network error'))
      await expect(
        fetchData('http://example.com/api', 'test-key'),
      ).rejects.toThrow('Network error')
    })
  })
})
