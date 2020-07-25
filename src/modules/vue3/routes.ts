import { RouteRecordRaw } from 'vue-router'
import Index from './index.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/vue3',
        name: 'Vue3',
        component: Index,
    },
]
export default routes
