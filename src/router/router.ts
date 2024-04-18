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
      path: '/readinglist',
      name: 'readinglist',
      component: () => import('../views/BookListView.vue')
    },
    {
      path: '/alreadyreadlist',
      name: 'alreadyreadlist',
      component: () => import('../views/BookListView.vue')
    }
  ]
})

export default router

