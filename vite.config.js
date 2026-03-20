import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'logo.png', 'sql-wasm.wasm'],
      manifest: {
        name: 'LIONESSS ACADEMY - Evaluacion Fisiologica',
        short_name: 'Lionesss Fit - - Evaluacion Fisiologica',
        description: 'Calculadora de FC Max y Vo2 para Ergoespirometría',
        theme_color: '#000000', // Color de la barra de estado en el móvil
        background_color: '#000000', // Color de fondo al abrir la app
        display: 'standalone', // Hace que se vea como una app nativa (sin barra de navegador)
        orientation: 'portrait',
        icons: [
          {
            src: '/icons.svg', // Asegúrate de tener este archivo o usa un .png de 192x192
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        // Esto asegura que el archivo .wasm se guarde en caché para uso offline
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}']
      }
    })
  ]
})