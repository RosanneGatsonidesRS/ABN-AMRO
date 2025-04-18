import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import router from './router'
import 'primeicons/primeicons.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: 'Aura',
    options: {
      prefix: 'abn',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
})

app.mount('#app')
