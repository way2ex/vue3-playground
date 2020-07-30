import { RouteRecordRaw } from 'vue-router'
import Index from './index.vue'
import Other from './other.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/vue3',
        name: 'Vue3',
        component: Index,
    },
    {
        path: '/other',
        name: 'Other',
        component: Other,
    },
]
export default routes
