<template>
    <div>
        <div>Name: {{ name }}</div>
        <div>Age: {{ age }}</div>
        <button @click="changeName">
            Change name
        </button>
        <button @click="changeAge">
            Add age
        </button>
        <p>{{ modelValue }}</p>
        <button @click="changeModelValue">
            Change model value
        </button>
    </div>
</template>
<script lang="ts">
// import {} from 'vue'
import { shuffle } from 'lodash'
export default {
    name: 'Counter',
    components: {
    },
    props: {
        name: {
            type: String,
            default: '',
        },
        age: {
            type: Number,
            required: true,
        },
        modelValue: {
            type: String,
            default: '',
        },
    },
    emits: [ 'update:name', 'update:age', 'update:modelValue' ],
    setup(props, { emit }){
        const changeName = () => {
            emit('update:name', shuffle(props.name.split('')).join(''))
        }
        const changeAge = () => {
            emit('update:age', props.age + 1)
        }
        const changeModelValue = () => {
            emit('update:modelValue', props.modelValue.slice(0, -1))
        }
        return {
            changeName,
            changeAge,
            changeModelValue,
        }
    },
}
</script>
<style scoped>

</style>
