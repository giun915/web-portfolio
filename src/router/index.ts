import { createRouter, createWebHistory } from 'vue-router'
import PortfolioMain from '@/views/PortfolioMain.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PortfolioMain',
      component: PortfolioMain,
    },
  ],
})

export default router
