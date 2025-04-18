import { mount } from '@vue/test-utils'
import Header from '@/components/Header/Header.vue'
import SearchBar from '@/components/SearchBar/SearchBar.vue'
import Button from 'primevue/button'


const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))


describe('Header Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders back button', async () => {
    const wrapper = mount(Header, {
      props: {
        showBackHome: true
      },
      global: {
        components: {
          SearchBar,
          Button
        },
        stubs: {
          SearchBar: true
        }
      }
    })
    
    const button = wrapper.findComponent(Button)
    expect(button.exists()).toBe(true)
    
    await button.trigger('click')
    expect(mockPush).toHaveBeenCalledWith('/')
  })
  it('renders title', async () => {
    const wrapper = mount(Header, {
      props: {
        showBackHome: true,
        title: "Test title"
      },
      global: {
        components: {
          SearchBar,
          Button
        },
        stubs: {
          SearchBar: true
        }
      }
    })
    
    const component = wrapper.find('[data-testid="header"]')
    expect(component.exists()).toBe(true)
    expect(component.text()).toContain('Test title')
  })
  it('renders searchbar', async () => {
    const wrapper = mount(Header, {
      props: {
        showBackHome: true,
        title: "Test title"
      },
      global: {
        components: {
          SearchBar,
          Button
        },
        stubs: {
          SearchBar: true
        }
      }
    })
    
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true)
  })
})