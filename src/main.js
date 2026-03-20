import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'

// Importación para registrar el service worker de la PWA
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Nueva versión disponible. ¿Deseas actualizar?')) {
      updateSW()
    }
  },
  onOfflineReady() {
    console.log('La aplicación está lista para trabajar offline.')
  },
})

const app = createApp(App)
app.use(router)
app.mount('#app')