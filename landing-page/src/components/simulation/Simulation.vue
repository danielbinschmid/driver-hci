<script setup lang="ts">
import Scene from './Scene.vue';
import { reactive, onMounted, ref } from 'vue';
import type { Ref } from "vue";
const sceneMetadata = reactive({ width: 0.5 * window.innerWidth });

const handgestVid: Ref<null | HTMLVideoElement> = ref(null);

const handgestVidMetadata = reactive({ width: window.innerWidth / 4 })

onMounted(() => {
    sceneMetadata.width = 0.5 * window.innerWidth;
    handgest()
})

window.addEventListener(
    "resize",
    () => {
        sceneMetadata.width = 0.5 * window.innerWidth;
        handgestVidMetadata.width = window.innerWidth / 4;
    },
    false
);



function handgest() {
    if (handgestVid.value !== null) {
        console.log("pause video")
        handgestVid.value.pause();

    }
}

</script>

<template>
    <div id="simulation" class="simulation">
        <div class="paragraphs">
            <div class="paragraph-1">
                <h1>
                    Live demo
                </h1>
                <p>
                    Below you can find a pre-recorded run of our prototype.
                </p>
            </div>
        </div>




        <div class="videos">

            <div class="scene">

                <scene :width="sceneMetadata.width" />
                <!--<div class="canvas-configure-container">
mdiMovieOpenPlayOutline
                    </div>  -->

            </div>
            <div class="controls-container">
                <div class="controls">

                    <v-btn outlined rounded class="canvas-configure-btn" color="rgb(207, 10, 44)" @click="">
                        <v-icon color="white">mdi-reload</v-icon>
                        <div class="canvas-configure-btn-text">Load videos</div>
                    </v-btn>

                    <v-btn outlined rounded class="canvas-configure-btn" color="rgb(207, 10, 44)" @click="">
                        <v-icon color="white">mdi-movie-open-play-outline</v-icon>
                        <div class="canvas-configure-btn-text">Play simulation</div>
                    </v-btn>

                    <v-card elevation="0" class="canvas-card-video" shaped outlined color="rgba(118, 113, 113, 0)">

                        <div v-if="false">
                            <video :width="handgestVidMetadata.width" autoplay muted ref="handgestVid"
                                class="hand-gest-video">
                                <source src="" type="video/mp4">
                                <!-- source src="movie.ogg" type="video/ogg">  @/assets/handgesture.mp4"-->
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div v-else>
                            <canvas class="placeholder-video" ></canvas>
                        </div>
                        

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

.controls-container {
    width: 40vw;
    display: flex;
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

.control-panel {
    width: 100vw;
    align-content: center;
    display: flex;
    justify-content: space-evenly;
}

.videos {
    display: flex;
    flex-flow: row;
    ;
    justify-content: space-between;
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
    margin-left: 2%;
    margin-right: 2%;

}

.hand-gest-video {
    margin-top: auto;
    margin-bottom: auto;
}

.info {
    width: 40vw;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
}

.scene {}

.canvas-card {
    width: fit-content;
    height: fit-content;
    padding-top: 2%;

    padding-left: 2%;
    padding-right: 2%;
    margin-top: auto;
    margin-bottom: auto;
    border-radius: 2rem;


}
</style>