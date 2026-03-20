<script setup>
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans">
    
    <!-- Encabezado Principal -->
    <header class="pt-6 pb-2 border-b border-gray-800">
      <div class="max-w-6xl mx-auto px-4 py-6 text-center">
  <div class="flex flex-col items-center gap-4">
    
    <img 
      src="/logo.png" 
      alt="LIONESSS ACADEMY Logo" 
      class="h-20 md:h-28 w-auto object-contain"
    />
    
    <h1 class="text-2xl md:text-4xl font-extrabold text-white uppercase tracking-wider leading-tight">
      Evaluación Fisiológica<br class="hidden sm:block">Prueba de Ergoespirometría
    </h1>
    
  </div>
</div>
      
      <!-- Navegación -->
      <nav class="flex flex-wrap justify-center gap-2 mt-6 border-b border-gray-800">
  <router-link 
    to="/" 
    class="px-6 py-3 font-bold text-sm uppercase tracking-widest transition-all duration-300 border-b-2"
    active-class="border-yellow-500 text-yellow-500 bg-gray-900/50"
    exact-active-class="border-yellow-500 text-yellow-500 bg-gray-900/50"
    :class="'text-gray-500 border-transparent hover:text-gray-300'"
  >
    Astrand
  </router-link>
  
  <router-link 
    to="/fc-trabajo" 
    class="px-6 py-3 font-bold text-sm uppercase tracking-widest transition-all duration-300 border-b-2"
    active-class="border-yellow-500 text-yellow-500 bg-gray-900/50"
    :class="'text-gray-500 border-transparent hover:text-gray-300'"
  >
    FC Trabajo
  </router-link>
  
  <router-link 
    to="/karvonen" 
    class="px-6 py-3 font-bold text-sm uppercase tracking-widest transition-all duration-300 border-b-2"
    active-class="border-yellow-500 text-yellow-500 bg-gray-900/50"
    :class="'text-gray-500 border-transparent hover:text-gray-300'"
  >
    Karvonen
  </router-link>
</nav>
    </header>

    <!-- Contenedor Dinámico de las Calculadoras -->
    <main class="max-w-6xl mx-auto p-4 md:p-8">
      <!-- Aquí es donde Vue Router inyectará la calculadora seleccionada -->
      <router-view></router-view>
    </main>

  </div>
</template>

<style>
/* Aseguramos que el fondo general sea negro como en tu diseño */
body {
  background-color: black;
}
</style>