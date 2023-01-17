<script setup lang="ts">
import Scene from './Scene.vue';
import { reactive, onMounted, ref } from 'vue';
import type { Ref } from "vue";
const sceneMetadata = reactive({ width: 0.6 * window.innerWidth });

const handgestVid: Ref<null | HTMLVideoElement> = ref(null);

const handgestVidMetadata = reactive({ width: window.innerWidth / 4 })

onMounted(() => {
    sceneMetadata.width = 0.6 * window.innerWidth;
    handgest()
})


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
                    What is COOP-Driving? 
                </h1>
                <p>
                    COOP-Driving was created by a team of students at the Technical University of Munich (TUM).
                    Our vision is to improve the usability of AD level2/3 by implementing interaction between the user and the Autonomous-Driving-System (ADS). 
                    Especially in situations where the ADS has to deal with a high level of uncertainty, the system often struggles to make a decision and gives back control to the user. 
                    We therefore want to incorporate human decision making in order to extend the duration of an autonomous driving phase. 
                </p>
            </div>

            <div class="paragraph-2">
                <h1>
                    Working Prototype
                </h1>
                <p>
                    We implemented a working prototype which shows how our solution may be integrated and used in a real world scenario. 
                    In the live-demo example below you can see the cockpit-view of a car equipped with our product. 
                    The HUD on the left displays information about map data and the ADS world view. On the right you see the view of the camera, which is mounted on the bottom of the rearview mirror and scans for handgesture input of the user. 
                    You can see that the driver approaches a slow driving car. The ADS wants to attempt a take-over maneuver in the near future, but asks the user for confirmation first.
                    It appears that the vehicle in front can not be trusted, as it drives in unpredictable wavy lines. Therefore, the ADS asks the user if it is safe to overtake now. The user declines the request and waits for a safe situation.
                    When it is safe to do so, the ADS asks the user again, if the take-over maneuver should be executed. The user confirms the action and takes over the car in front.
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

                        <video :width="handgestVidMetadata.width" autoplay muted ref="handgestVid"
                            class="hand-gest-video">
                            <source src="@/assets/handgesture.mp4" type="video/mp4">
                            <!-- source src="movie.ogg" type="video/ogg"> -->
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