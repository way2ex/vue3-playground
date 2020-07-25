<template>
  <div @click="$emit('bad')" />
  <div>88</div>
</template>
<script lang="ts">
export default {
    emits: ['good'],
    setup(props) {

        const b = [ 44, 3]
        const a = (a) => { console.log(a) }
        return {
            a: 7,
            b: 88
        }
    }
}
</script>
<style>
div {
  color: gold;
}
</style>
