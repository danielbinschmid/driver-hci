<script setup lang="ts">
import Scene from './Scene.vue';
import { reactive, onMounted, ref, defineAsyncComponent } from 'vue';
import type { Ref } from "vue";
const props = defineProps<{
    height: number
}>()

const sceneMetadata = reactive({ width: 0.5 * window.innerWidth });

const handgestVid: Ref<null | HTMLVideoElement> = ref(null);

const handgestVidMetadata = reactive({ width: window.innerWidth / 4 })


const DemoPlayer = defineAsyncComponent(
    () => import('./VideoPlayer.vue') 
)

const ytVidData =reactive({width: window.innerWidth * (5 / 6)});
onMounted(() => {
    sceneMetadata.width = 0.5 * window.innerWidth;
    handgest()
})

window.addEventListener(
    "resize",
    () => {
        sceneMetadata.width = 0.5 * window.innerWidth;
        handgestVidMetadata.width = window.innerWidth / 4;

        ytVidData.width = window.innerWidth * (5 / 6);
        console.log("resize");
    },
    false
);



function handgest() {
    if (handgestVid.value !== null) {
        console.log("pause video")
        handgestVid.value.pause();

    }
}

function onReady() {
    console.log("pko")
}
</script>

<template>
    <div id="simulation" class="simulation">

        <div class="paragraphs-no-padding">
            <div class="paragraph-1">
                <h1>
                    Demonstration
                </h1>
                <p>
                    Below you can find a demonstration of our prototype.
                </p>
            </div>
        </div>
     
        <DemoPlayer class="youtube-wrapper" :height="props.height"/>

        <div class="paragraphs">
            <div class="paragraph-1">
                <h1>
                    Explanation
                </h1>
                <p>
                    In the live-demo example above you can see the cockpit-view of a car equipped with our product. 
                    The HUD on the left displays information about map data and the ADS world view. On the right you see the view of the camera, which is mounted on the bottom of the rearview mirror and scans for handgesture input of the user. 
                    You can see that the driver approaches a slow driving car. The ADS wants to attempt a take-over maneuver in the near future, but asks the user for confirmation first.
                    It appears that the vehicle in front can not be trusted, as it drives in unpredictable wavy lines. Therefore, the ADS asks the user if it is safe to overtake now. The user declines the request and waits for a safe situation.
                    When it is safe to do so, the ADS asks the user again, if the take-over maneuver should be executed. The user confirms the action and takes over the car in front.
                </p>
            </div>
        </div>



    </div>
</template>


<style scoped>
.youtube-wrapper {

    display: flex;
    justify-content: center;
}

figure {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 5%;
    max-width: 500px;
}

figcaption {
    text-align: center;
    margin-top: 1%;
    margin-bottom: 1%;
    color: rgb(231, 229, 225);
}

h1 {
    text-align: center;
}

p {
    text-align: center;
    padding-bottom: 2%;
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
    padding-top: 2%;
}

.paragraphs-no-padding {
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
    padding-top: 2%;
    padding-bottom: 5%;
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