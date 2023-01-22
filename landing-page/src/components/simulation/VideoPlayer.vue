<script setup lang="ts">

import { onMounted, defineProps, reactive, ref } from 'vue';
import type { Ref } from "vue"
const vid: Ref<HTMLVideoElement | null> = ref(null)
    const props = defineProps<{
    height: number
}>()

window.addEventListener(
    "resize",
    () => {
        ytVidData.width = window.innerWidth * (9 / 10)
    },
    false
);

onMounted(() => {

})

function showOverlay() {

}


const ytVidData =reactive({width: window.innerWidth * (9 / 10)});


</script>

<template>
    <div id="video-player" class="video-player">
 
        <video src="../../assets/demo_coop.mp4" :width="ytVidData.width" ref="vid" class="vid" @click="showOverlay()" controls>

        </video>

       
    </div>
</template>


<style scoped>
.video-player {
    display: flex;
    flex-flow: column;
}
.btns {
    margin-top: 1%;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1%;
}

.vid {
    margin-left: auto;
    margin-right: auto;
}
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
    font-size: small;
    margin-left: 5%;
    text-align: center;
}

.canvas-configure-btn {
    margin-top: auto;
    margin-bottom: auto;
}

.component-container {
    position: fixed;
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
    height: fit-content;
    padding-top: 2%;
    display: flex;
    flex-flow: column;

}

canvas {
    padding-left: 2%;
    padding-right: 2%;
}

</style>