import { setActivePinia, createPinia } from 'pinia'
import { useShowsStore } from '@/stores/shows'
import { fetchData } from '@/utils/fetchDataUtils'
import type { Show } from '@/types/Show'

vi.mock('@/utils/fetchDataUtils', () => ({
  fetchData: vi.fn(),
}))

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString()
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
    getAllKeys: vi.fn(() => Object.keys(store)),
  }
})()

const mockShows: Show[] = [
  {
    id: 1,
    name: 'Show 1',
    genres: ['Drama', 'Thriller'],
    rating: { average: 8.5 },
    summary: 'Test summary 1',
    image: { medium: 'image1.jpg', original: 'image1_original.jpg' },
  },
  {
    id: 2,
    name: 'Show 2',
    genres: ['Comedy', 'Drama'],
    rating: { average: 9.0 },
    summary: 'Test summary 2',
    image: { medium: 'image2.jpg', original: 'image2_original.jpg' },
  },
  {
    id: 3,
    name: 'Show 3',
    genres: ['Thriller', 'Horror'],
    rating: { average: 7.5 },
    summary: 'Test summary 3',
    image: { medium: 'image3.jpg', original: 'image3_original.jpg' },
  },
] as Show[]

const mockShowDetail: Show = {
  id: 1,
  name: 'Show 1',
  genres: ['Drama', 'Thriller'],
  rating: { average: 8.5 },
  summary: 'Test summary 1',
  image: { medium: 'image1.jpg', original: 'image1_original.jpg' },
  _embedded: {
    cast: [
      {
        person: {
          id: 101,
          name: 'Actor 1',
          image: { medium: 'actor1.jpg', original: 'actor1.jpg' },
        },
        character: {
          id: 201,
          name: 'Character 1',
        },
      },
    ],
  },
} as Show

const mockSearchResults = [{ show: mockShows[0] }, { show: mockShows[1] }]

describe('Shows Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    })

    vi.clearAllMocks()
    localStorageMock.clear()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('Initial State', () => {
    it('should have empty initial state', () => {
      const store = useShowsStore()

      expect(store.shows).toEqual([])
      expect(store.isLoading).toBe(false)
      expect(store.error).toBe(null)
      expect(store.selectedShow).toBe(null)
      expect(store.searchResults).toEqual([])
      expect(store.genres).toEqual([])
      expect(store.showsByGenre).toEqual({})
    })
  })

  describe('getAllShows', () => {
    it('should get all shows and update state', async () => {
      const store = useShowsStore()

      ;(fetchData as any).mockResolvedValue(mockShows)

      await store.getAllShows()

      expect(fetchData).toHaveBeenCalledWith(
        expect.stringContaining('/shows'),
        expect.stringContaining('tvmaze_all_shows'),
      )

      expect(store.shows).toEqual(mockShows)
      expect(store.isLoading).toBe(false)
      expect(store.error).toBe(null)
    })

    it('should handle errors when fetching shows', async () => {
      const store = useShowsStore()
      const errorMessage = 'Network error'

      ;(fetchData as any).mockRejectedValue(new Error(errorMessage))
      await expect(store.getAllShows()).rejects.toThrow(errorMessage)

      expect(store.shows).toEqual([])
      expect(store.isLoading).toBe(false)
      expect(store.error).toBe(errorMessage)
    })

    it('should clear cache when forceRefresh is true', async () => {
      const store = useShowsStore()

      ;(fetchData as any).mockResolvedValue(mockShows)

      await store.getAllShows(true)

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        expect.stringContaining('tvmaze_all_shows'),
      )
    })
  })

  describe('fetchShowById', () => {
    it('should fetch a show by ID and update selectedShow', async () => {
      const store = useShowsStore()
      const showId = 1

      ;(fetchData as any).mockResolvedValue(mockShowDetail)

      await store.getShowById(showId)

      expect(fetchData).toHaveBeenCalledWith(
        expect.stringContaining(`/shows/${showId}`),
        expect.stringContaining(`tvmaze_show_${showId}`),
      )

      expect(store.selectedShow).toEqual(mockShowDetail)
      expect(store.isLoading).toBe(false)
      expect(store.error).toBe(null)
    })

    it('should handle errors when fetching a show by ID', async () => {
      const store = useShowsStore()
      const showId = 999
      const errorMessage = 'Show not found'

      ;(fetchData as any).mockRejectedValue(new Error(errorMessage))

      await expect(store.getShowById(showId)).rejects.toThrow(errorMessage)

      expect(store.selectedShow).toBe(null)
      expect(store.isLoading).toBe(false)
      expect(store.error).toBe(errorMessage)
    })

    it('should clear cache when forceRefresh is true', async () => {
      const store = useShowsStore()
      const showId = 1

      ;(fetchData as any).mockResolvedValue(mockShowDetail)

      await store.getShowById(showId, true)

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        expect.stringContaining(`tvmaze_show_${showId}`),
      )
    })
  })

  describe('searchShows', () => {
    it('should search shows and update searchResults', async () => {
      const store = useShowsStore()
      const query = 'test'

      ;(fetchData as any).mockResolvedValue(mockSearchResults)

      await store.searchShows(query)

      expect(fetchData).toHaveBeenCalledWith(
        expect.stringContaining(`/search/shows?q=${query}`),
        expect.stringContaining(`tvmaze_search_${query}`),
      )

      expect(store.searchResults).toEqual([mockShows[0], mockShows[1]])
      expect(store.isLoading).toBe(false)
      expect(store.error).toBe(null)
    })

    it('should handle empty query', async () => {
      const store = useShowsStore()
      const query = ''

      await store.searchShows(query)

      expect(fetchData).not.toHaveBeenCalled()
      expect(store.searchResults).toEqual([])
    })

    it('should handle errors when searching shows', async () => {
      const store = useShowsStore()
      const query = 'test'
      const errorMessage = 'Search failed'

      ;(fetchData as any).mockRejectedValue(new Error(errorMessage))

      await expect(store.searchShows(query)).rejects.toThrow(errorMessage)

      expect(store.searchResults).toEqual([])
      expect(store.isLoading).toBe(false)
      expect(store.error).toBe(errorMessage)
    })
  })

  describe('Computed Properties', () => {
    it('should compute genres correctly', async () => {
      const store = useShowsStore()

      store.shows = mockShows

      expect(store.genres).toEqual(
        ['Comedy', 'Drama', 'Horror', 'Thriller'].sort(),
      )
    })

    it('should compute showsByGenre correctly', async () => {
      const store = useShowsStore()

      store.shows = mockShows

      const expected = {
        Drama: [mockShows[1], mockShows[0]], // Show 2 (9.0) comes before Show 1 (8.5)
        Comedy: [mockShows[1]],
        Thriller: [mockShows[0], mockShows[2]], // Show 1 (8.5) comes before Show 3 (7.5)
        Horror: [mockShows[2]],
      }

      expect(store.showsByGenre).toEqual(expected)
    })

    // it('should handle shows with no genres', async () => {
    //   const store = useShowsStore();

    //   // Set up the store with mock data including a show with no genres
    //   const showWithNoGenres = { ...mockShows[0], genres: undefined };
    //   store.shows = [showWithNoGenres];

    //   // Verify that genres are computed correctly (should be empty)
    //   expect(store.genres).toEqual([]);

    //   // Verify that showsByGenre is computed correctly (should be empty)
    //   expect(store.showsByGenre).toEqual({});
    // });

    // it('should handle shows with no ratings', async () => {
    //   const store = useShowsStore();

    //   // Set up the store with mock data including shows with no ratings
    //   const showWithNoRating = { ...mockShows[0], rating: undefined };
    //   const showWithNullRating = { ...mockShows[1], rating: null };
    //   store.shows = [showWithNoRating, showWithNullRating, mockShows[2]];

    //   // Expected result: shows with no ratings should be treated as having a rating of 0
    //   const expected = {
    //     'Drama': [showWithNoRating],
    //     'Thriller': [mockShows[2], showWithNoRating],  // Show 3 (7.5) comes before Show 1 (0)
    //     'Comedy': [showWithNullRating],
    //     'Horror': [mockShows[2]],
    //   };

    //   // Verify that showsByGenre is computed correctly
    //   expect(store.showsByGenre).toEqual(expected);
    // });
  })
})
