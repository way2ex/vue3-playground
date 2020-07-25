// https://github.com/vuejs/vue-next-webpack-preview/issues/5
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const ComponentOptions: ComponentOptions
  export default ComponentOptions
}