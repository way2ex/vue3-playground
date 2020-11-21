import { createRouter, createWebHistory } from 'vue-router'
import Vue3 from '@/modules/vue3/routes'
import WebDemo from '@/modules/web-demo/routes'
import VueModel from '@/modules/vue-model/index.vue'

export const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    strict: true,
    routes: [
        { path: '/', redirect: '/vue3' },
        ...Vue3,
        { path: '/vue-model', component: VueModel,
        },
        ...WebDemo,
    ],
})
router.afterEach((to) => {
    if (to.meta) {
        console.log(to)
        document.title = to.meta.title || document.title
        console.log(document.title)
    }
})
export {
    router,
}