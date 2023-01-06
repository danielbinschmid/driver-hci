<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { dummyHTTPSGet } from "./api";


// reactive variables
const counter = reactive({ value: 0 });

let initPlanet: Planet = {
    url: "-",
    explanation: "-"
}
const planetInfo = reactive(initPlanet); 

// called on mount
onMounted(() => {
    setInterval(() => {
        counter.value ++;
    }, 1000); 
});


function getDummy(): void {
    dummyHTTPSGet().then(value => {
        initPlanet.url = value.url;
        initPlanet.explanation = value.explanation;
    });
}

function clearPlanetInfo(): void { 
    initPlanet.url = "-";
    initPlanet.explanation = "-";
}

</script>

<template>
    <main>

        <div class="canvas-container"> 
            <canvas id="canvas"> </canvas>
        </div>
        
        
        
        <div> 
            Time since deployment: {{ counter.value }}
        </div>
        <div>
            Planet url: {{ planetInfo.url }}
        </div>
        <div>
            {{ planetInfo.explanation }}
        </div>

        <button @click="getDummy()">
            Click me to get planet information
        </button>
        <button @click="clearPlanetInfo()">
            Clear planet information
        </button>

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
