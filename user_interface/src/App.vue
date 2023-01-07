<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

const LOGO_RELATIVE_HEIGHT = 0.2;
const SCENE_IMG_RELATIVE_SIZE = 0.7;

const scene = ref(null);
const sceneImgGhost = ref(null);

const logo = reactive({ height: 50 });
const windowSizes = reactive({ width: window.innerWidth, height: window.innerHeight });
const sceneSizes = reactive({ width: window.innerWidth, height: window.innerHeight });

onMounted(() => {
    let sceneImage: HTMLImageElement = sceneImgGhost.value;
    sceneImage.onload = () => {
        computeSizes();
    }
});

function computeSizes() {
    let ratioScene = sceneImgGhost.value.width / sceneImgGhost.value.height;
    let ratioWindow = window.innerWidth / window.innerHeight;

    if (ratioScene > ratioWindow) {
        sceneSizes.width = window.innerWidth * SCENE_IMG_RELATIVE_SIZE;
        sceneSizes.height = Math.floor(sceneSizes.width / ratioScene);
    } else {
        sceneSizes.height = window.innerHeight * SCENE_IMG_RELATIVE_SIZE;
        sceneSizes.width = Math.floor(ratioScene * sceneSizes.height);
    }

    logo.height = LOGO_RELATIVE_HEIGHT * sceneSizes.height;
}

window.onresize = () => { if (sceneImgGhost.value.complete) computeSizes(); }

</script>

<template>
    <main>

        <div class="ghost">
            <img src='@/assets/road_scene.png' ref="sceneImgGhost" />
        </div>
        <div class="globalContainer" :style="{ width: windowSizes.width, height: windowSizes.height }">
            <div class="headerContainer" :style="{ width: sceneSizes.width + 'px' }">
                <h1 class="headerItem">
                    PROTOTYPE SIMULATION
                </h1>
                <div class="headerItem">
                    <div class="logoWrapper">
                        <img src='@/assets/coop-logo.png' :height="logo.height" />
                    </div>
                </div>
                <h1 class="headerItem">
                    HCI FOR AUTONOMOUS DRIVING
                </h1>
            </div>

            <div class="container">
                <img src='@/assets/road_scene.png' ref="scene" :width="sceneSizes.width" :height="sceneSizes.height" />
            </div>
        </div>
    </main>
</template>

<style scoped>

.ghost {
    position: fixed;
    visibility: hidden;
}

.logoWrapper {
    display: flex;
    justify-content: center;
}

.headerItem {
    flex-basis: 33%;
    display: flex;
    justify-content: center;
    flex-flow: column;
}

h1 {
    font-size: medium;
    margin-top: auto;
    margin-bottom: auto;
    text-align: center;
    font-weight: 100;
}

.headerContainer {
    display: flex;
    justify-content: space-around;
    flex-flow: row;
    align-content: center;
}

.globalContainer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(231, 229, 225);
}

.container {
    display: flex;
    align-content: center;
    justify-content: center;
}

</style>
