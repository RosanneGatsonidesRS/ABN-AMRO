import { ref, onMounted, onUnmounted, computed } from 'vue'

export function useViewport(mobileBreakpoint = 768) {
  const width = ref(window.innerWidth)

  const updateWidth = () => {
    width.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  const isMobile = computed(() => width.value < mobileBreakpoint)

  return { width, isMobile }
}
