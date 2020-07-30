<template>
    <p>This is the Vue 3 playground. You can find vue3 features here.</p>
    <composition-api />
    <VModels />
</template>
<script lang="ts">
import CompositionApi from './composition-api/index.vue'
import VModels from './v-models/index.vue'
// import {} from 'vue'
export default {
    name: 'Vue3',
    components: {
        CompositionApi,
        VModels,
    },
    props: {
    },
    setup(){
        return {

        }
    },
}
</script>
<style scoped>
.item {
    display: flex;
    justify-content: space-between;
}
</style>
