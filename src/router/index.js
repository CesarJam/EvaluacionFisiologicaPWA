import { createRouter, createWebHistory } from 'vue-router'
import AstrandView from '../views/AstrandView.vue'
import FCTrabajoView from '../views/FCTrabajoView.vue'
import KarvonenView from '../views/KarvonenView.vue'

const routes = [
  { path: '/', name: 'Astrand', component: AstrandView },
  { path: '/fc-trabajo', name: 'FCTrabajo', component: FCTrabajoView },
  { path: '/karvonen', name: 'Karvonen', component: KarvonenView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})