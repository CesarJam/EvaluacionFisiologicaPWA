# 🦁 LIONESSS ACADEMY - Evaluación Fisiológica (PWA)

Esta es una **Aplicación Web Progresiva (PWA)** diseñada para especialistas en fisiología del ejercicio y entrenadores. Permite realizar cálculos precisos de frecuencia cardíaca máxima y zonas de trabajo durante pruebas de ergoespirometría.

## 🚀 Características principales

- **Calculadoras Fisiológicas:**
  - **Astrand:** Cálculo de FC Máxima teórica.
  - **FC w de Trabajo:** Cálculo basado en porcentaje de intensidad.
  - **Karvonen:** Cálculo avanzado considerando la FC de reposo.
- **Persistencia Local:** Almacenamiento de historial mediante **SQLite (sql.js)** y WebAssembly, permitiendo que los datos se guarden directamente en el navegador del usuario.
- **Experiencia UX/UI:** Interfaz responsiva (Mobile First), Modo Oscuro nativo y modales de confirmación personalizados.
- **Conectividad:** Capacidad de compartir resultados individuales o el historial completo a través de **WhatsApp**.
- **Instalable:** Funciona como una App nativa gracias a la configuración PWA (Service Workers & Manifest).

## 🛠️ Stack Tecnológico

- **Frontend:** [Vue 3](https://vuejs.org/) (Composition API + `<script setup>`)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Base de Datos:** [sql.js](https://sql.js.org/) (SQLite compilado a WebAssembly)
- **PWA:** `vite-plugin-pwa`
- **Iconos:** Heroicons & Lucide Vue

## 📦 Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/CesarJam/EvaluacionFisiologicaPWA.githttps://github.com/CesarJam/EvaluacionFisiologicaPWA.git](https://github.com/CesarJam/EvaluacionFisiologicaPWA.git)
   cd lioness-calculadora
   
2. **Instalar dependencias:**
    (Usar la bandera para evitar conflictos de versiones con Vite 8)
    ```bash
    npm install --legacy-peer-deps

3. **Ejecutar en desarrollo:**
    ```bash
    npm run dev

4. **Compilar para producción (Generar PWA):**
    ```bash
    npm run build

**📸 Previsualización**
La aplicación cuenta con un diseño optimizado para dispositivos móviles, asegurando que los inputs y tablas de historial sean legibles en cualquier pantalla.

Creado y desarrollado por CesarJam94 para LIONESSS ACADEMY.