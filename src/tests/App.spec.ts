import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import { mount } from '@vue/test-utils'

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: {
        template: '<div data-testid="mock-home-view">Home View</div>',
      },
    },
  ],
})

describe('App.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })
  })

  it('renders the app container', () => {
    const container = wrapper.find('[data-testid="app-container"]')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('app-container')
  })

  it('renders the main content area', () => {
    const main = wrapper.find('[data-testid="main-content"]')
    expect(main.exists()).toBe(true)
    expect(main.element.tagName).toBe('MAIN')
  })

  it('renders the router view', async () => {
    await router.push('/')
    await router.isReady()

    wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })
    await wrapper.vm.$nextTick()

    const homeView = wrapper.find('[data-testid="mock-home-view"]')
    expect(homeView.exists()).toBe(true)
    expect(homeView.text()).toBe('Home View')
  })
})
