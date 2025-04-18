import { mount } from '@vue/test-utils'
import ShowCast from '@/components/ShowCast/ShowCast.vue'
import type { CastMember } from '@/types/CastMember'

describe('ShowCast', () => {
  const createMockCast = (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
      person: {
        id: index + 1,
        name: `Actor ${index + 1}`,
        image: index % 3 === 0 ? null : { medium: `https://example.com/person-${index + 1}.jpg`, original: `https://example.com/person-${index + 1}.jpg`}
      },
      character: {
        id: index + 100,
        name: `Character ${index + 1}`,
        image: index % 3 === 0 ? null : { medium: `https://example.com/character-${index + 1}.jpg`, original: `https://example.com/character-${index + 1}.jpg`}
      }
    })) as CastMember[]
  } 

  it('renders correctly with cast members', () => {
    const cast = createMockCast(5)
    const wrapper = mount(ShowCast, {
      props: { cast }
    })
    
    expect(wrapper.find('[data-testid="show-cast"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="show-cast-title"]').text()).toBe('Cast')
    
    // Check if all cast members are rendered
    const castMembers = wrapper.findAll('[data-testid="show-cast-member"]')
    expect(castMembers.length).toBe(5)
  })

  it('limits display to 12 cast members when more are provided', () => {
    const cast = createMockCast(20)
    const wrapper = mount(ShowCast, {
      props: { cast }
    })
    
    const castMembers = wrapper.findAll('.show-cast__member')
    expect(castMembers.length).toBe(12)
  })

  it('displays all cast members when less than 12 are provided', () => {
    const cast = createMockCast(8)
    const wrapper = mount(ShowCast, {
      props: { cast }
    })
    
    const castMembers = wrapper.findAll('.show-cast__member')
    expect(castMembers.length).toBe(8)
  })

  it('uses fallback image when person image is missing', () => {
    const cast = [
      {
        person: {
          id: 1,
          name: 'Actor Without Image',
          image: null
        },
        character: {
          id: 101,
          name: 'Character 1'
        }
      }
    ]
    
    const wrapper = mount(ShowCast, {
      props: { cast }
    })
    
    // Check if the fallback image is used
    const img = wrapper.find('[data-testid="show-cast-img"]')
    expect(img.attributes('src')).toBe('/placeholder-person.png')
  })

  it('displays person and character names correctly', () => {
    const cast = [
      {
        person: {
          id: 1,
          name: 'John Doe',
          image: { medium: 'https://example.com/john-doe.jpg' }
        },
        character: {
          id: 101,
          name: 'Hero Character'
        }
      }
    ]
    
    const wrapper = mount(ShowCast, {
      props: { cast }
    })
    
    // Check if person name is displayed correctly
    expect(wrapper.find('[data-testid="show-cast-person-name"]').text()).toBe('John Doe')
    
    // Check if character name is displayed correctly
    expect(wrapper.find('[data-testid="show-cast-character-name"]').text()).toBe('Hero Character')
  })

  it('handles empty cast array', () => {
    const wrapper = mount(ShowCast, {
      props: { cast: [] }
    })
    
    // Component should still render
    expect(wrapper.find('.show-cast').exists()).toBe(true)
    
    // No cast members should be rendered
    const castMembers = wrapper.findAll('.show-cast__member')
    expect(castMembers.length).toBe(0)
  })

  it('renders multiple cast members correctly', () => {
    const cast = createMockCast(3)
    const wrapper = mount(ShowCast, {
      props: { cast }
    })
    
    // Check if all cast members are rendered
    const castMembers = wrapper.findAll('.show-cast__member')
    expect(castMembers.length).toBe(3)
    
    // Check first cast member
    const firstMember = castMembers[0]
    expect(firstMember.find('[data-testid="show-cast-person-name"]').text()).toBe('Actor 1')
    expect(firstMember.find('[data-testid="show-cast-character-name"]').text()).toBe('Character 1')
    
    // Check image source for first member (should be placeholder since index % 3 === 0)
    expect(firstMember.find('[data-testid="show-cast-img"]').attributes('src')).toBe('/placeholder-person.png')
    
    // Check second cast member
    const secondMember = castMembers[1]
    expect(secondMember.find('[data-testid="show-cast-person-name"]').text()).toBe('Actor 2')
    expect(secondMember.find('[data-testid="show-cast-character-name"]').text()).toBe('Character 2')
    
    // Check image source for second member (should have an image)
    expect(secondMember.find('[data-testid="show-cast-img"]').attributes('src')).toBe('https://example.com/person-2.jpg')
  })
})