<script setup lang="ts">
import { SceneRenderer } from './SceneRenderer';
import { onMounted } from 'vue';


onMounted(() => {
    const renderer = new SceneRenderer();
})

</script>

<template>
    <div id="visualization">
        <canvas id="canvas"></canvas>
    </div>
</template>

<style scoped>
canvas {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh
}

</style>