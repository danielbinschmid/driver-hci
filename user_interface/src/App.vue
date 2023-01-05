<script setup lang="ts">
import { onMounted, reactive } from "vue";

const counter = reactive({ value: 0 });

onMounted(() => {
    setInterval(() => {
        counter.value ++;
    }, 1000); 
});


</script>

<template>
    <main>

        <div class="canvas-container"> 
            <canvas id="canvas"> </canvas>
        </div>
        
        
        
        <div> 
            Time since deployment: {{ counter.value }}
        </div>

    </main>
</template>

<style scoped>
.canvas-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}

#canvas {

    background: inherit;
}
</style>
