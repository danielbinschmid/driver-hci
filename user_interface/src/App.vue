<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import type { Ref } from 'vue'
import HudInterface from "./HudInterface.vue"

const LOGO_RELATIVE_HEIGHT = 0.2;
const SCENE_IMG_RELATIVE_SIZE = 0.8;

const sceneImgGhost: Ref<HTMLImageElement | null> = ref(null);

const logo = reactive({ height: 50 });
const windowSizes = reactive({ width: window.innerWidth, height: window.innerHeight });
const sceneSizes = reactive({ width: window.innerWidth, height: window.innerHeight });

onMounted(() => {
    let sceneImage: HTMLImageElement | null = sceneImgGhost.value;
    if (sceneImage != null) {
      sceneImage.onload = () => {
          computeSizes();
      }
    } // TODO: set timeout if sceneImage is null and try again
    window.electronAPI.handleCounter((event: any, value: any) => {
        console.log("from inside: " + value);
    })
});

function computeSizes() {
    if (sceneImgGhost.value === null) return;
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


window.onresize = () => { 
  if (sceneImgGhost.value === null) return;
  if (sceneImgGhost.value.complete) computeSizes(); 
}

</script>

<template>
    <main>

        <div class="ghost">
            <img src='./assets/road_scene.png' ref="sceneImgGhost" />
        </div>
        <div class="globalContainer" :style="{ width: windowSizes.width, height: windowSizes.height }">
            <div class="headerContainer" :style="{ width: sceneSizes.width + 'px' }">
                <h1 class="headerItem">
                    PROTOTYPE SIMULATION
                </h1>
                <div class="headerItem">
                    <div class="logoWrapper">
                        <img src='./assets/coop-logo.png' :height="logo.height" />
                    </div>
                </div>
                <h1 class="headerItem">
                    HCI FOR AUTONOMOUS DRIVING
                </h1>
            </div>

            <div class="container">
                <div class="scene">
                    <div class="interface" :style="{height: sceneSizes.height + 'px'}">
                        <hud-interface 
                                :style="{height: sceneSizes.height}" 
                                :width="sceneSizes.width" 
                                :height="sceneSizes.height"> 
                        </hud-interface>
                    </div>
                    
                    <div :style="{marginTop: -sceneSizes.height + 'px', height: sceneSizes.height + 'px'}">
                        <img src='./assets/road_scene.png' class="sceneImg" :width="sceneSizes.width" :height="sceneSizes.height" />

                    </div>
 
                </div>
                
            </div>
        </div>
    </main>
</template>

<style scoped>

.interface {
    z-index: 100;
}

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
    color: black;
}

h1 {
    font-size: medium;
    margin-top: auto;
    margin-bottom: auto;
    text-align: center;
    font-weight: 300;
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
