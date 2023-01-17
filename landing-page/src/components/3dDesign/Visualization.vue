<script setup lang="ts">
import { SceneRenderer, } from './SceneRenderer';
import { onMounted, defineProps } from 'vue';


const props = defineProps<{
    height: number
}>()

var renderer: undefined | SceneRenderer = undefined

onMounted(() => {
    console.log(props.height)
    renderer = new SceneRenderer({rotateDesign: false, canvasID: "canvas", width: window.innerWidth / 2, height: window.innerHeight / 2});
})


function rotate() {
    if (renderer) {
        renderer.options.rotateDesign = true;
    }

}

function pauseRotation() {
    if (renderer) {
        renderer.options.rotateDesign = false;
    }
}

function resetScene() {
    if (renderer) {
        renderer.resetScene();
    }
}

</script>

<template>
    <div id="visualization" class="component-container">
        <div class="canvas-container">  
            <v-card
                elevation="10"
                class="canvas-card"
                shaped
                outlined
                color="rgb(118, 113, 113)" 
            >
                <canvas id="canvas"></canvas>
                <div class="canvas-configure-container">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn outlined
                                    rounded
                                    class="canvas-configure-btn"
                                    color="rgb(207, 10, 44)"
                                    @click="rotate()"
                                >
                                    <v-icon color="white">mdi-rotate-3d</v-icon>
                                    <div class="canvas-configure-btn-text">Rotate</div>
                                </v-btn>
                            </template>
                            <span ></span>
                        </v-tooltip>

                       
                        <v-btn outlined
                            rounded
                            class="canvas-configure-btn"
                            color="rgb(207, 10, 44)"
                            @click="pauseRotation()"
                        >
                            <v-icon color="white">mdi-pause</v-icon>
                            <div class="canvas-configure-btn-text">Pause</div>
                        </v-btn>

                        <v-btn outlined
                            rounded
                            class="canvas-configure-btn"
                            color="rgb(207, 10, 44)"
                            @click="resetScene()"
                        >
                            <v-icon color="white">mdi-backup-restore</v-icon>
                            <div class="canvas-configure-btn-text">Reset cam</div>
                        </v-btn>

                </div>                
            </v-card>
        </div>
        
        
    </div>
</template>


<style scoped>

.canvas-configure-container-single {
    display: flex;
    justify-content: center;
}
.canvas-configure-container {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 2%;
}

.canvas-configure-btn-text {
    color: white;
    font-size: xx-small;
    margin-left: 5%;
    text-align: center;
}

.canvas-configure-btn {
    margin-top: auto;
    margin-bottom: auto;
}

.component-container {
    display: flex;
    justify-content: center;
    flex-flow: column;
    height: 100%;

}
.canvas-container {
    display: flex;
    justify-content: center;
}

.canvas-card {
    width: fit-content;
    padding-left: 2%;
    padding-right: 2%;
    padding-top: 2%;
}

canvas {

}

</style>