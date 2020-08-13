<template>
    <button @click="addItem">
        add item
    </button>
    <button @click="deleteItem">
        delete item
    </button>
    <button @click="changeShowB">
        change ShowB
    </button>
    <div>
        <comp-a
            v-for="item of list"
            :key="item"
        />
        <comp-b v-if="showB" />
    </div>
</template>
<script lang="ts">
import CompA from './comp-a/index.vue'
import CompB from './comp-b/index.vue'
import { reactive, ref } from 'vue'
export default {
    name: 'VueModel',
    components: {
        CompA,
        CompB,
    },
    setup(){
        const list = reactive([])
        const addItem = () => list.push(1)
        const deleteItem = () => list.pop()

        const showB = ref(true)
        const changeShowB = () => { showB.value = !showB.value }

        return {
            list,
            addItem,
            deleteItem,

            showB,
            changeShowB,
        }
    },
}
</script>
