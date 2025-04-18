import { beforeEach, expect, vi, vitest } from 'vitest'

beforeEach(() => {
  vi.clearAllMocks()
  expect.hasAssertions()
})

vitest.spyOn(console, 'info').mockImplementation(vi.fn())
