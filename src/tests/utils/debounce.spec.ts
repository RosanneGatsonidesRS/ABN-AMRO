import { debounce } from '@/utils/debounce'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should call the function after the specified wait time', () => {
    const mockArg = vi.fn()
    const debouncedFn = debounce(mockArg, 100)

    debouncedFn()
    expect(mockArg).not.toHaveBeenCalled()

    // Fast-forward time by 50ms
    vi.advanceTimersByTime(50)
    expect(mockArg).not.toHaveBeenCalled()

    // Fast-forward time by another 50ms (total 100ms)
    vi.advanceTimersByTime(50)
    expect(mockArg).toHaveBeenCalledTimes(1)
  })

  it('should only call the function once for multiple rapid calls', () => {
    const mockArg = vi.fn()
    const debouncedFn = debounce(mockArg, 100)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    // Fast-forward time by 100ms
    vi.advanceTimersByTime(100)

    expect(mockArg).toHaveBeenCalledTimes(1)
  })

  it('should reset the timer on new calls', () => {
    const mockArg = vi.fn()
    const debouncedFn = debounce(mockArg, 100)

    debouncedFn()

    // Fast-forward time by 50ms
    vi.advanceTimersByTime(50)
    expect(mockArg).not.toHaveBeenCalled()
    debouncedFn()

    // Fast-forward time by another 50ms (total 100ms from first call)
    vi.advanceTimersByTime(50)
    expect(mockArg).not.toHaveBeenCalled()

    // Fast-forward time by another 50ms (total 100ms from second call)
    vi.advanceTimersByTime(50)
    expect(mockArg).toHaveBeenCalledTimes(1)
  })

  it('should call the function with the correct arguments', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn('test', 123)

    // Fast-forward time by 100ms
    vi.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledWith('test', 123)
  })

  it('should use the most recent arguments when called multiple times', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn('first', 1)
    debouncedFn('second', 2)
    debouncedFn('third', 3)

    // Fast-forward time by 100ms
    vi.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith('third', 3)
  })

  it('should handle edge cases like null or undefined arguments', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn(null, undefined)

    // Fast-forward time by 100ms
    vi.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledWith(null, undefined)
  })
})
