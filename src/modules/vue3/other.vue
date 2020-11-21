<template>
    <div>
        <button @click="$router.push({ path: '/vue3' })">
            离开
        </button>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'Other',
    components: {
    },
    beforeRouteLeave(to, from, next) {
        console.log('444', this.counterAge)
        next()
    },
    props: {
    },
    emits: [ ],
    setup(){
        const counterAge = ref(28)
        return {
            counterAge,
        }
    },
})
</script>
<style scoped>

</style>
