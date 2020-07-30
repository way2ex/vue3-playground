<template>
    <h2>Multiple vModels</h2>
    <section class="item-list">
        <div class="item">
            <example title="Base use">
                <input
                    v-model="inputVal1"
                    type="text"
                >
                <counter
                    v-model:name="counterName"
                    v-model:age="counterAge"
                    v-model="modelValue"
                />
                <template #summary>
                    <ul>
                        <li>You can only use <code>v-model</code> on an element</li>
                        <li>You can add argument in <code>v-model</code> O=on a component</li>
                    </ul>
                </template>
            </example>
        </div>
    </section>
</template>
<script lang="ts">
import { ref, watchEffect } from 'vue'
import Counter from './counter.vue'
export default {
    name: 'VModels',
    components: {
        Counter,
    },
    props: {
    },
    emits: [ ],
    setup(){
        const inputVal1 = ref('input value 1')
        watchEffect(() => {
            console.log(inputVal1.value)
        })

        const counterAge = ref(19)
        const counterName = ref('LeBron')
        const modelValue = ref('This is modelValue, it\'s default model bind prop.')
        return {
            inputVal1,

            counterAge,
            counterName,
            modelValue,
        }
    },
}
</script>
<style scoped>
</style>
