import { createRouter, createWebHistory } from 'vue-router'
import BookListView from '../views/BookListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BookListView
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
