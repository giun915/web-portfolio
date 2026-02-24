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

/* --- Google Analytics page tracking --- */
router.afterEach((to) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: to.fullPath,
    })
  }
})

export default router
