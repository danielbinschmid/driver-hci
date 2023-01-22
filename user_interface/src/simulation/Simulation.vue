<script setup lang="ts">
import Scene from './Scene.vue';
import { reactive, onMounted, ref } from 'vue';
import type { Ref } from "vue";
import { MapAnimationState } from './map/MapAnimationStates';
const LAYOUT_DATA = {relSceneWidth: 0.7, relControlWidth: 0.25}


const sceneMetadata = reactive({ width: LAYOUT_DATA.relSceneWidth * window.innerWidth });
const handgestVid: Ref<null | HTMLVideoElement> = ref(null);
const handgestVidMetadata = reactive({ width: window.innerWidth / 4, downloaded: false })
const sceneData = reactive({playVid: false, animationState: MapAnimationState.RESET});
const handgestData = reactive({detectedGest: "-", detected: false})
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

const timeouts: any[] = [];
var timeout: any = undefined;
function playAnimation() {
    setTimeout(() => {
        if (handgestVid.value !== null) {
        handgestVid.value.play();
        sceneData.animationState = MapAnimationState.START;
        timeout = setTimeout(() => {
            pauseAnimation();
        }, 20000);

        setTimeout(() => {
            handgestData.detected = true;
            handgestData.detectedGest = "OK";

            setTimeout(() => {
                handgestData.detected = false;
            }, 500);
        }, 5100);

        setTimeout(() => {
            handgestData.detected = true;
            handgestData.detectedGest = "Swipe right";

            setTimeout(() => {
                handgestData.detected = false;
            }, 500);
        }, 11700);
    }
    }, 1000);
    
    

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
                    
                    <div class="control-btns">
                        <v-btn 
                            outlined 
                            rounded 
                            class="canvas-configure-btn" 
                            :color="sceneData.animationState == MapAnimationState.START || sceneData.animationState == MapAnimationState.PAUSE ? 'rgb(118, 113, 113)' : 'rgb(207, 10, 44)'" 
                            @click="playAnimation()" 
                            :disabled="sceneData.animationState == MapAnimationState.START || sceneData.animationState == MapAnimationState.PAUSE"
                        >
                            <div class="canvas-configure-btn-text">Play</div>
                        </v-btn>
                        <v-btn 
                            outlined 
                            rounded 
                            class="canvas-configure-btn" 
                            :color="sceneData.animationState == MapAnimationState.START? 'rgb(207, 10, 44)': 'rgb(118, 113, 113)'" 
                            @click="pauseAnimation()"
                            :disabled="sceneData.animationState != MapAnimationState.START"
                        >
                            <div class="canvas-configure-btn-text">Pause</div>
                        </v-btn>
                        <v-btn outlined rounded class="canvas-configure-btn" color="rgb(207, 10, 44)" @click="resetAnimation()">
                            <div class="canvas-configure-btn-text">Reset</div>
                        </v-btn>
                    </div>
                    <v-divider> </v-divider>
                    <div class="context-info">
                        <v-btn 
                            outlined 
                            rounded 
                            class="canvas-info-btn" 
                            :color="handgestData.detected? 'rgb(10, 255, 10)' : 'rgba(100, 100, 100, 0.2)'" 
                            @click="pauseAnimation()"
                            :disabled="true"
                        >
                            <div class="canvas-configure-btn-text">Detected <br>  handgesture:</div>
                        </v-btn>
                        <v-btn 
                            outlined 
                            rounded 
                            class="canvas-info-btn" 
                            :color="handgestData.detected? 'rgb(10, 255, 10)' :'rgb(118, 113, 113)'" 
                            @click="pauseAnimation()"
                            :disabled="true"
                        >
                            <div class="canvas-configure-btn-text"> {{ handgestData.detectedGest }} </div>
                        </v-btn>

                    </div>



                    <div>
                        <v-card elevation="0" class="canvas-card-video" shaped outlined color="rgba(118, 113, 113, 0)">
        
                            <video :width="handgestVidMetadata.width" muted ref="handgestVid"
                                class="hand-gest-video">  
                                <source src="../assets/handgest.mp4" type="video/mp4">
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
    </div>
</template>
<style scoped>

.context-info {
    display: flex;
    justify-content: space-evenly;
}

h3 {
    text-align: center;
}

.control-btns {
    display: flex;
}

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
    justify-content: space-evenly;
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
.canvas-info-btn {
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
