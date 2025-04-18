import { mount } from '@vue/test-utils'
import ErrorContainer from '@/components/ErrorContainer/ErrorContainer.vue'
import { Message } from 'primevue'


describe('ErrorContainer.vue', () => {
  it('renders correctly with error message', () => {
    const errorMessage = 'Test error message'
    
    const wrapper = mount(ErrorContainer, {
      props: {
        error: errorMessage
      },
      global: {
        components: { Message }
      }
    })

    expect(wrapper.exists()).toBe(true)
    
    const container = wrapper.find('[data-testid="container-error"]')
    expect(container.exists()).toBe(true)
    
    const message = wrapper.findComponent(Message)
    expect(message.exists()).toBe(true)
    
    // Check that the error message is displayed
    expect(message.text()).toBe(errorMessage)
  })
  
})