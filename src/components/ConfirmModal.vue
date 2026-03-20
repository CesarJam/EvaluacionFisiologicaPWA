<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-80 transition-opacity">
    <div class="bg-gray-900 rounded-xl shadow-2xl border border-gray-700 p-6 max-w-sm w-full transform transition-all">
      <div class="flex flex-col items-center">
        
        <!-- Icono de Advertencia -->
        <div class="bg-red-900/30 p-4 rounded-full mb-4 border border-red-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h3 class="text-xl font-bold text-white mb-2">{{ title }}</h3>
        <p class="text-sm text-gray-400 text-center mb-6">
          {{ message }}
        </p>
        
        <!-- Botones del Modal -->
        <div class="flex gap-3 w-full">
          <button @click="$emit('cancel')" class="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors">
            Cancelar
          </button>
          <button @click="$emit('confirm')" class="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-lg transition-colors flex justify-center items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Definimos las propiedades que recibirá el componente
defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Confirmar Acción'
  },
  message: {
    type: String,
    default: '¿Estás seguro de continuar?'
  }
})

// Definimos los eventos que el componente enviará hacia la vista padre
defineEmits(['confirm', 'cancel'])
</script>