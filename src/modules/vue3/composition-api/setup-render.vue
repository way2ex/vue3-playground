<script lang="ts">
import { h, resolveComponent, FunctionalComponent } from 'vue'
export default {
    name: 'SetupRender',
    components: {
    },
    props: {
        name: {
            type: String,
            default: '',
        },
    },
    emits: [ 'say-hello' ],
    setup(props, { emit }){
        const defaultSlot = () => [
            h('div', props.name),
            h('button', {
                onClick: () => { emit('say-hello') },
            }, 'sayHello'),
        ]
        const summarySlot = () => h('ul', [
            h('li', [ 'you can return a VNode in ', h('code', 'setup function') ]),
        ])
        const Example = resolveComponent('example')
        return () => h(Example as FunctionalComponent, {
            title: 'Setup return render',
        }, {
            $stable: true, // Vue won't force the child to update when the parent updates
            default: defaultSlot,
            summary: summarySlot,
        })
    },
}
</script>
