import * as Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import { store } from './store'
import Example from '@/components/example.vue'
import './styles/common.css'
const app = Vue.createApp(App)
// console.log('app', app)
// register component globally
app.use(router)
    .use(store)
    .component('example', Example)
    .mount('#app')
