<script lang="ts">
import { h } from 'vue'
export default function(props, { slots } ) {
    const title = h('h2', props.title)
    const exampleTitle = h('h3', 'Example')
    const summaryTitle = h('h3', 'Summary')
    return h('div', {
        class: 'example',
    }, [
        title,
        exampleTitle,
        slots.default && slots.default() || '',
        summaryTitle,
        slots.summary && slots.summary() || '',
    ])
}
</script>
<style>
.example {
    flex: 0 0 49%;
    width: 49%;
    padding: 0 15px;
    box-sizing: border-box;
    border: 1px solid #e2e2e2;
    border-radius: 12px;
}
ul {
    padding-left: 0;
}
ul li {
    list-style-position: inside;
}
</style>
