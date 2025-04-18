import { useViewport } from '@/composables/useViewport'


describe('useViewport', () => {
  const originalInnerWidth = window.innerWidth
  
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    })
  })
  
  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth
    })
  })
  
  it('should return width and isMobile', () => {
    const { width, isMobile } = useViewport()
    
    expect(width.value).toBe(1024)
    expect(isMobile.value).toBe(false)
  })
  
  it('should respect custom breakpoint', () => {
    const { isMobile } = useViewport(1200)
    expect(isMobile.value).toBe(true)

    const { isMobile: isMobile2 } = useViewport(800)
    expect(isMobile2.value).toBe(false)
  })

})