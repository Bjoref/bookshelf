import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            name: 'catalog',
            path: '/catalog',
            component: () => import('@/views/CatalogView.vue') 
        },
        {
            name: 'main',
            path: '',
            component: () => import('@/views/MainView.vue') 
        },
        {
            name: 'not-found',
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/NotFoundView.vue') 
        }
    ]
});

export default router