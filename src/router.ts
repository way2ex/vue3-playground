import { createRouter, createWebHistory } from 'vue-router'
import Vue3 from '@/modules/vue3/routes'
import VueModel from '@/modules/vue-model/index.vue'

export const routerHistory = createWebHistory()
export const router = createRouter({
    history: routerHistory,
    strict: true,
    routes: [
        { path: '/', redirect: '/vue3' },
        ...Vue3,
        { path: '/vue-model', component: VueModel },
    ],
})
