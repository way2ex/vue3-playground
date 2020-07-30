<template>
    <div>
        <h2>composition api</h2>
        <section class="item-list">
            <div class="item">
                <setup-comp
                    :name="personName"
                    :age="19"
                    @greeted="onGreeted"
                >
                    <template
                        v-if="showProfile"
                        #profile
                    >
                        This is my profile. Only after i say hello, it will display.
                    </template>
                    <template #default>
                        This is other info.
                    </template>
                </setup-comp>
                <setup-render
                    :name="setUpRenderName"
                    :age="19"
                    @say-hello="onSayHello"
                />
            </div>
            <div class="item">
                <reactive />
            </div>
        </section>
    </div>
</template>
<script lang="ts">
import SetupComp from './setup-com.vue'
import SetupRender from './setup-render.vue'
import Reactive from './reactive.vue'
import { ref } from 'vue'
export default {
    name: 'Setup',
    components: {
        SetupComp,
        SetupRender,
        Reactive,
    },
    props: {
    },
    setup(){
        const showProfile = ref(false)
        const personName = ref('Bob')
        const onGreeted = () => {
            showProfile.value = true
        }

        const setUpRenderName = ref('Danny')
        const onSayHello = () => {
            setUpRenderName.value = 'Jenny'
        }
        return {
            showProfile,
            personName,
            setUpRenderName,

            onGreeted,
            onSayHello,
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
