<template>
    <example title="Base setup">
        <template #default>
            <p>{{ name }}</p>
            <slot name="profile">
                He is lazy and say nothing...
            </slot>
            <slot />
            <button @click="sayHello">
                Say Hello
            </button>
        </template>
        <template #summary>
            <ul>
                <li>props cannot be destructed</li>
                <li>attrs is equal to <code>this.$attrs</code></li>
                <li>slots is equal to <code>this.$slots</code></li>
                <li>emit is equal to <code>this.$emit</code></li>
                <li>The props, slots and attrs objects here are proxies, so they will always be pointing to the latest values when used in render functions.</li>
                <li>props data can be resolved in <code>template</code></li>
            </ul>
        </template>
    </example>
</template>
<script lang="ts">
// import Example from '@/components/example.vue'
export default {
    name: 'SetupComp',
    components: {
        // Example,
    },
    props: {
        name: {
            type: String,
            default: '',
        },
        age: {
            type: Number,
            default: 20,
        },
    },
    emits: [ 'greeted' ],
    setup(props, { attrs, slots, emit }){
        console.log(props.name)
        console.log(attrs)
        console.log(slots)

        const sayHello = () => {
            alert('Hello, I am ' + props.name)
            emit('greeted')
        }
        return {
            sayHello,
        }
    },
}
</script>
