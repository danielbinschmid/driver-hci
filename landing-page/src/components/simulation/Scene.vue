<script setup lang="ts">
import { onMounted, reactive, ref,  } from "vue";
import type { Ref } from 'vue'
import HudInterface from "./HudInterface.vue"

const props = defineProps<{
    width: number,

}>();


const sceneImgGhost: Ref<HTMLImageElement | null> = ref(null);

const sceneSizes = reactive({ width: 0, height: 0});

onMounted(() => {
    let sceneImage: HTMLImageElement | null = sceneImgGhost.value;
    if (sceneImage != null) {
      sceneImage.onload = () => {
          computeSizes();
      }
    } // TODO: set timeout if sceneImage is null and try again

});

function computeSizes() {
    if (sceneImgGhost.value === null) return;
    let ratioScene = sceneImgGhost.value.width / sceneImgGhost.value.height;

    sceneSizes.width = props.width;
    sceneSizes.height = Math.floor(sceneSizes.width / ratioScene);



}


window.onresize = () => { 
  if (sceneImgGhost.value === null) return;
  if (sceneImgGhost.value.complete) computeSizes(); 
}
</script>

<template>
    <div class="ghost">
        <img src='@/assets/road_scene.png' ref="sceneImgGhost" />
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
                <img src='@/assets/road_scene.png' class="sceneImg" :width="sceneSizes.width" :height="sceneSizes.height" />

            </div>

        </div>
        
    </div>
</template>

<style scoped>

.interface {
    z-index: 100;
}

.ghost {
    position: fixed;
    visibility: hidden;
}


h1 {
    font-size: medium;
    margin-top: auto;
    margin-bottom: auto;
    text-align: center;
    font-weight: 300;
}




.container {
    display: flex;
    align-content: center;
    justify-content: center;
    background-color: rgb(231, 229, 225);
}

</style>

  