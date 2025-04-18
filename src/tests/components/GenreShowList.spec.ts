import { mount, flushPromises } from '@vue/test-utils'
import GenreShowList from '@/components/GenreShowList/GenreShowList.vue'
import Carousel from 'primevue/carousel'
import ShowImageCard from '@/components/ShowImageCard/ShowImageCard.vue'

// Mock the useViewport composable
vi.mock('@/composables/useViewport', () => ({
  useViewport: vi.fn(() => ({
    isMobile: false
  }))
}))

import { useViewport } from '@/composables/useViewport'
import { computed, ref } from 'vue'

describe('GenreShowList Extended Tests', () => {
  const mockShows = [
    { id: 1, title: 'Show 1', image: 'image1.jpg' },
    { id: 2, title: 'Show 2', image: 'image2.jpg' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('handles switching between mobile and desktop views', async () => {
    // Start with desktop view
    vi.mocked(useViewport).mockReturnValue({ width: ref(1200), isMobile: computed(() => false) })
    
    const wrapper = mount(GenreShowList, {
      props: {
        genre: 'Action',
        shows: mockShows
      },
      global: {
        components: {
          Carousel,
          ShowImageCard
        },
        stubs: {
          Carousel: true,
          ShowImageCard: true
        }
      }
    })
    
    await flushPromises()
    expect(wrapper.find('[data-testid="genre-show-list-carousel-desktop"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="genre-show-list-carousel-mobile"]').exists()).toBe(false)
    
    vi.mocked(useViewport).mockReturnValue({width: ref(500), isMobile: computed(() => true)})
    
    const mobileWrapper = mount(GenreShowList, {
      props: {
        genre: 'Action',
        shows: mockShows
      },
      global: {
        components: {
          Carousel,
          ShowImageCard
        },
        stubs: {
          Carousel: true,
          ShowImageCard: true
        }
      }
    })
    
    await flushPromises()
    expect(mobileWrapper.find('[data-testid="genre-show-list-carousel"]').exists()).toBe(false)
    expect(mobileWrapper.find('[data-testid="genre-show-list-carousel-mobile"]').exists()).toBe(true)
  })
  it('renders write desktop template', async () => {
    vi.mocked(useViewport).mockReturnValue({ width: ref(1200), isMobile: computed(() => false) })
    
    const wrapper = mount(GenreShowList, {
      props: {
        genre: 'Action',
        shows: mockShows
      },
      global: {
        components: {
          Carousel,
          ShowImageCard
        },
        stubs: {
          Carousel: true,
          ShowImageCard: true
        }
      }
    })
    
    await flushPromises()
    const component = wrapper.find('[data-testid="genre-show-list"]')
    expect(component.exists()).toBe(true)
    expect(component.text()).toContain('Action')
    expect(wrapper.find('[data-testid="genre-show-list-carousel-desktop"]').exists()).toBe(true)
    expect(wrapper.findComponent(Carousel).exists()).toBe(true)
  })

  it('renders write mobile template', async () => {
    vi.mocked(useViewport).mockReturnValue({ width: ref(700), isMobile: computed(() => true) })
    
    const wrapper = mount(GenreShowList, {
      props: {
        genre: 'Comedy',
        shows: mockShows
      },
      global: {
        components: {
          Carousel,
          ShowImageCard
        },
        stubs: {
          Carousel: true,
          ShowImageCard: true
        }
      }
    })
    
    await flushPromises()
    const component = wrapper.find('[data-testid="genre-show-list"]')
    expect(component.exists()).toBe(true)
    expect(component.text()).toContain('Comedy')
    expect(wrapper.find('[data-testid="genre-show-list-carousel-mobile"]').exists()).toBe(true)
    expect(wrapper.findComponent(Carousel).exists()).toBe(false)
  })
})