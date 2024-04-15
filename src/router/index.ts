import { createRouter, createWebHistory } from 'vue-router'
import ReadingView from '../views/ReadingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ReadingView
    },
    {
      path: '/finished',
      name: 'finished',
      component: () => import('../views/FinishedView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/FinishedView.vue')
    }
  ]
})

export default router
