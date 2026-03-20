<template>
  <div class="mt-8 px-4">
    <h2 class="text-2xl font-bold mb-6 text-center text-white tracking-wide">
      Cálculo de FC Max - FC w trabajo Karvonen
    </h2>
    
    <div class="max-w-3xl mx-auto bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
        
        <div class="flex flex-col space-y-2">
          <label class="text-sm text-gray-400 font-medium">FC Máxima Teórica (Referencia)</label>
          <div class="relative">
            <input 
              v-model.number="fcReferencia" 
              type="number" 
              class="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
            />
            <span class="absolute right-4 top-3 text-gray-500 text-sm">lat/min</span>
          </div>
        </div>

        <div class="flex flex-col space-y-2">
          <label class="text-sm text-gray-400 font-medium">Edad</label>
          <div class="relative">
            <input 
              v-model.number="edad" 
              type="number" 
              class="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
            />
            <span class="absolute right-4 top-3 text-gray-500 text-sm">años</span>
          </div>
        </div>

        <div class="flex flex-col space-y-2">
          <label class="text-sm text-gray-400 font-medium">FC Reposo</label>
          <div class="relative">
            <input 
              v-model.number="fcReposo" 
              type="number" 
              class="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
            />
            <span class="absolute right-4 top-3 text-gray-500 text-sm">lat/min</span>
          </div>
        </div>

        <div class="flex flex-col space-y-2">
          <label class="text-sm text-gray-400 font-medium">% de Intensidad</label>
          <div class="relative">
            <input 
              v-model.number="intensidad" 
              type="number" 
              step="0.1"
              class="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" 
            />
          </div>
        </div>

      </div>

      <div class="bg-gray-800 p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center border-t border-gray-700 gap-4">
        <div class="text-center sm:text-left">
          <span class="block text-sm text-gray-400 font-medium mb-1">Resultado</span>
          <span class="block text-xl text-white font-semibold">FC w de trabajo</span>
        </div>
        
        <div class="flex items-center gap-3">
          <div class="bg-yellow-500 text-black text-4xl font-black py-3 px-8 rounded-lg shadow-inner">
            {{ fcTrabajo }}
          </div>
          <span class="text-gray-400 text-sm font-medium">UM<br>lat/min</span>
        </div>
      </div>

    </div>
    
    <p class="mt-6 text-sm text-gray-500 text-center max-w-2xl mx-auto flex items-start sm:items-center justify-center gap-2 px-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Fórmula: ((FC Máxima Teórica - Edad - FC reposo) * % de intensidad) + FC reposo
    </p>

    <!-- Botones de Acción -->
    <div class="max-w-3xl mx-auto mt-6 flex flex-col sm:flex-row gap-4">
      <button @click="guardarDatos" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors flex justify-center items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h-2v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
          <path fill-rule="evenodd" d="M3 3a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V3zm2 0v14h10V3H5z" clip-rule="evenodd" />
        </svg>
        Guardar en Historial
      </button>

      <button @click="compartirWhatsApp" class="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors flex justify-center items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
        Compartir por WhatsApp
      </button>
    </div>

    <!-- Historial de Evaluaciones -->
    <div v-if="historial.length > 0" class="max-w-4xl mx-auto mt-12 mb-8 px-4">
      <div class="flex flex-col sm:flex-row items-center justify-between mb-4 gap-3">
        <h3 class="text-lg font-bold text-white tracking-wide">Historial Guardado</h3>
        
        <div class="flex items-center gap-3">
          <button @click="compartirHistorialWhatsApp" class="bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded shadow transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/>
            </svg>
            Compartir Historial
          </button>
          <span class="bg-blue-900 text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full shadow hidden sm:block">
            SQLite Local
          </span>
        </div>
      </div>
      
      <div class="bg-gray-900 rounded-xl border border-gray-800 overflow-x-auto shadow-2xl">
        <table class="w-full text-left text-sm text-gray-400">
          <thead class="bg-gray-800 text-gray-200">
            <tr>
              <th class="p-4 border-b border-gray-700">ID</th>
              <th class="p-4 border-b border-gray-700">Fecha</th>
              <th class="p-4 border-b border-gray-700 text-center">Edad</th>
              <th class="p-4 border-b border-gray-700 text-center">Reposo</th>
              <th class="p-4 border-b border-gray-700 text-center">% Int.</th>
              <th class="p-4 border-b border-gray-700 text-center">Resultado</th>
              <th class="p-4 border-b border-gray-700 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in historial" :key="item.id" class="border-b border-gray-800 hover:bg-gray-800 transition-colors">
              <td class="p-4 font-mono text-gray-500">#{{ item.id }}</td>
              <td class="p-4 whitespace-nowrap">{{ new Date(item.fecha).toLocaleString() }}</td>
              <td class="p-4 text-center">{{ item.parametros.edad }}</td>
              <td class="p-4 text-center">{{ item.parametros.fcReposo }}</td>
              <td class="p-4 text-center">{{ item.parametros.intensidad * 100 }}%</td>
              <td class="p-4 text-center text-yellow-400 font-bold">{{ item.resultado }} lat/min</td>
              <td class="p-4 text-center">
                <button @click="abrirModal(item.id)" class="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-gray-700 transition-colors" title="Eliminar registro">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Reutilizable -->
    <ConfirmModal 
      :show="mostrarModal" 
      title="Confirmar Eliminación" 
      message="¿Estás seguro de que deseas eliminar este registro del historial?"
      @cancel="cerrarModal" 
      @confirm="confirmarBorrado" 
    />

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { guardarEvaluacion, obtenerHistorial, eliminarEvaluacion } from '../db/sqlite.js'
import ConfirmModal from '../components/ConfirmModal.vue'

// --- LÓGICA DEL MODAL ---
const mostrarModal = ref(false)
const idAEliminar = ref(null)

const abrirModal = (id) => {
  idAEliminar.value = id
  mostrarModal.value = true
}

const cerrarModal = () => {
  mostrarModal.value = false
  idAEliminar.value = null
}

const confirmarBorrado = async () => {
  if (idAEliminar.value !== null) {
    try {
      await eliminarEvaluacion(idAEliminar.value)
      await cargarHistorial()
      cerrarModal()
    } catch (error) {
      console.error('Error al eliminar:', error)
      alert("Hubo un error al intentar eliminar el registro.")
      cerrarModal()
    }
  }
}

// --- LÓGICA DE LA CALCULADORA ---
const fcReferencia = ref(220)
const edad = ref(80)
const fcReposo = ref(60)
const intensidad = ref(0.6)

const fcTrabajo = computed(() => {
  const calculo = ((fcReferencia.value - edad.value - fcReposo.value) * intensidad.value) + fcReposo.value
  return Math.round(calculo)
})

// --- LÓGICA DE LA BASE DE DATOS ---
const historial = ref([])

const cargarHistorial = async () => {
  try {
    const datos = await obtenerHistorial()
    // Filtramos para que aquí solo aparezcan los registros de "Karvonen"
    historial.value = datos.filter(item => item.tipo === 'Karvonen')
  } catch (error) {
    console.error("Error al cargar el historial:", error)
  }
}

onMounted(() => {
  cargarHistorial()
})

const guardarDatos = async () => {
  const parametros = {
    fcReferencia: fcReferencia.value,
    edad: edad.value,
    fcReposo: fcReposo.value,
    intensidad: intensidad.value
  }
  
  try {
    await guardarEvaluacion('Karvonen', parametros, fcTrabajo.value)
    await cargarHistorial() 
  } catch (error) {
    console.error('Error al guardar:', error)
    alert('Hubo un error al guardar los datos.')
  }
}

// --- LÓGICA DE WHATSAPP ---
const compartirWhatsApp = () => {
  const mensaje = `*LIONESSS ACADEMY* 🦁\nEvaluación Fisiológica (Karvonen)\n\n*Parámetros:*\n- FC Máx Teórica: ${fcReferencia.value} lat/min\n- Edad: ${edad.value} años\n- FC Reposo: ${fcReposo.value} lat/min\n- Intensidad: ${intensidad.value * 100}%\n\n*Resultado:*\n🎯 *FC Trabajo: ${fcTrabajo.value} lat/min*\n\nCreado y desarrollado por CesarJam94`;
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

const compartirHistorialWhatsApp = () => {
  if (historial.value.length === 0) {
    alert("No hay registros en el historial para compartir.");
    return;
  }

  let mensaje = `*LIONESSS ACADEMY* 🦁\n📋 *Historial de Evaluaciones (Karvonen)*\n\n`;
  
  historial.value.forEach((item, index) => {
    mensaje += `*Evaluación #${index + 1}*\n`;
    mensaje += `📅 Fecha: ${new Date(item.fecha).toLocaleString()}\n`;
    mensaje += `👤 Edad: ${item.parametros.edad} años\n`;
    mensaje += `🛌 FC Reposo: ${item.parametros.fcReposo} lat/min\n`;
    mensaje += `⚡ Intensidad: ${item.parametros.intensidad * 100}%\n`;
    mensaje += `🎯 Resultado: ${item.resultado} lat/min\n`;
    mensaje += `--------------------------\n`;
  });

  mensaje += `\nCreado y desarrollado por CesarJam94`;

  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}
</script>