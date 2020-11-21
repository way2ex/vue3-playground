import { RouteRecordRaw } from 'vue-router'
import Clipboard from './clipboard/index.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/web-demo/clipboard',
        name: 'clipboard',
        component: Clipboard,
        meta: {
            title: 'Clipboard API Demo',
        },
    },
]
export default routes
