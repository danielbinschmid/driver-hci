<script setup lang="ts">
import Scene from './Scene.vue';
import { reactive, onMounted, ref } from 'vue';
import type { Ref } from "vue";
import { MapAnimationState } from './map/MapAnimationStates';
const LAYOUT_DATA = {relSceneWidth: 0.6, relControlWidth: 0.35}


const sceneMetadata = reactive({ width: LAYOUT_DATA.relSceneWidth * window.innerWidth });
const handgestVid: Ref<null | HTMLVideoElement> = ref(null);
const handgestVidMetadata = reactive({ width: window.innerWidth / 4, downloaded: false })
const sceneData = reactive({playVid: false, animationState: MapAnimationState.RESET});
const tabs = ["Simulation"]

onMounted(() => {
    computeSizes()
    handgest()
})
window.addEventListener(
    "resize",
    () => {
       computeSizes()
    },
    false
);
function computeSizes() {
    sceneMetadata.width = LAYOUT_DATA.relSceneWidth * window.innerWidth;
    handgestVidMetadata.width = window.innerWidth * (LAYOUT_DATA.relControlWidth - 0.05);

}
function handgest() {
    if (handgestVid.value !== null) {
        console.log("pause video")
        handgestVid.value.pause();
    }
}

function playAnimation() {
    handgestVid.value?.play();
    sceneData.animationState = MapAnimationState.START;

} 

function pauseAnimation() {
    handgestVid.value?.pause();
    sceneData.animationState = MapAnimationState.PAUSE;
}

function resetAnimation() {
    if (handgestVid.value) {
        handgestVid.value.pause();
        handgestVid.value.currentTime = 0;
    }
    sceneData.animationState = MapAnimationState.RESET;
    

    // if (handgestVid.value) handgestVid.value.play();
}
</script>
<template>
    <div id="simulation" class="simulation">
        
        <div class="videos">
            <div class="scene">
                <scene :width="sceneMetadata.width" :play-video-scene="sceneData.playVid" :animation-state="sceneData.animationState"/>
                <!--
                    <div class="canvas-configure-container">
                        mdiMovieOpenPlayOutline
                    </div>  
                -->
            </div>
            <div class="controls-container" :style="{width: LAYOUT_DATA.relControlWidth * 100 + 'vw'}">
                <div class="controls">
                    <div>
                        <div>
                            <div>
                                <!-- Detected gesture: -->
                                
                            </div>
                        </div>
                    </div>
                    <v-btn outlined rounded class="canvas-configure-btn" color="rgb(207, 10, 44)" @click="playAnimation()">
                        <div class="canvas-configure-btn-text">Play</div>
                    </v-btn>
                    <v-btn outlined rounded class="canvas-configure-btn" color="rgb(207, 10, 44)" @click="pauseAnimation()">
                        <div class="canvas-configure-btn-text">Pause</div>
                    </v-btn>
                    <v-btn outlined rounded class="canvas-configure-btn" color="rgb(207, 10, 44)" @click="resetAnimation()">
                        <div class="canvas-configure-btn-text">Reset</div>
                    </v-btn>
                    




                    <v-card elevation="0" class="canvas-card-video" shaped outlined color="rgba(118, 113, 113, 0)">
        
                        <video :width="handgestVidMetadata.width" muted ref="handgestVid"
                            class="hand-gest-video">  
                            <source src="../assets/handgesture.mp4" type="video/mp4">
                            <!-- source src="movie.ogg" type="video/ogg">  @/assets/handgesture.mp4"-->
                            Your browser does not support the video tag.
                        </video>
    
                      
                    </v-card>


                    <div class="caption">
                        {{ "(Replayed hand-gestures for control)" }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

h1 {
    text-align: center;
}

p {
    text-align: center;
}

.caption {
    text-align: center;
    font-size: small;
    font-weight: 300;
    margin-top: 2%;
    margin-bottom: 3%;
}
.paragraph-1 {
    width: 100%;
    margin-right: 2%;
}
.paragraph-2 {
    margin-right: 2%;
}
.hand-gest-video {
    margin-top: auto;
    margin-bottom: auto;
}
.paragraphs {
    display: flex;

}
.controls-container {
    width: 40vw;
    display: flex;
}
.controls {

    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    border: none;
    border-radius: 2rem;

    background-color: rgba(118, 113, 113, 0.2);
    display: flex;
    flex-flow: column;
}
.videos {
    display: flex;
    flex-flow: row;
    ;
    justify-content: space-evenly;
    width: 100vw;
}
.canvas-card-video {
    height: fit-content;
}
.canvas-configure-btn-text {
    color: white;
    font-size: xx-small;
    margin-left: 5%;
    text-align: center;
}
.canvas-configure-btn {
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
    margin-bottom: auto;
}
.canvas-configure-container {
    display: flex;
    justify-content: space-evenly;
    margin-top: 2%;
    margin-bottom: 2%;
}
.simulation {
    background-color: rgb(231, 229, 225);
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    height: 100%;

}
.hand-gest-video {
    margin-top: auto;
    margin-bottom: auto;
}
</style>
