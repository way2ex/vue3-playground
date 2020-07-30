<template>
    <example title="Reactive">
        <template #default>
            <ul>
                <li
                    v-for="key of infoList"
                    :key="key"
                >
                    {{ key }}
                    <span
                        v-for="subKey of Object.keys(person[key])"
                        :key="subKey"
                    >
                        <i>{{ subKey }}</i>:<i>{{ person[key][subKey] }}</i>
                    </span>
                </li>
            </ul>
            <button @click="addBaseInfo">
                add baseInfo
            </button>
            <button @click="addAge">
                Add age
            </button>
        </template>
        <template #summary>
            <ul>
                <li>You can make an object <code>creative</code> using <code>Vue.creative</code></li>
                <li>
                    <p>New property added on <code>creative object</code> is also <code>creative</code>.</p>
                    <p>Any change to new property can trigger update of view.</p>
                </li>
            </ul>
        </template>
    </example>
</template>
<script lang="ts">
import { reactive, computed } from 'vue'
export default {
    name: 'Reactive',
    components: {
        // Example,
    },
    setup(){
        const person = reactive({})
        const infoList = computed(() => Object.keys(person))
        const addBaseInfo = () => {
            (person as any).baseInfo = {
                age: 1,
            }
        }
        const addAge = () => {
            console.log(Object.keys(person))
            if (!(person as any).baseInfo.age) {
                (person as any).baseInfo.age = 1
            } else {
                (person as any).baseInfo.age = (person as any).baseInfo.age + 1
            }
        }
        return {
            person,
            infoList,

            addBaseInfo,
            addAge,
        }
    },
}
</script>
