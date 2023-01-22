<script setup lang="ts">
import { SceneRenderer } from "./SceneRenderer"

import { onMounted, ref, watch, reactive } from "vue";
import type { Ref } from "vue";
import { MapAnimationState } from "./MapAnimationStates";
// "../assets/map//edited/transparent_background_3.svg"
const mapWrapper: Ref<HTMLElement | null> = ref(null)
const props = defineProps<{
    width: number,
    height: number,
    animationState: MapAnimationState
}>()

const currentState = reactive({state: MapAnimationState.RESET});

let renderer: SceneRenderer | undefined = undefined;
onMounted(() => {
    var width = 100;
    var height = 100;
 

    console.log(mapWrapper.value?.clientHeight);
    setTimeout(() => {
        var width = 100;
        var height = 100;
        
        if (mapWrapper.value !== null) {
            width = mapWrapper.value.clientWidth;
            height = mapWrapper.value.clientHeight;
        }

        console.log(width, height);

        const rendererOptions: SceneOptions3D = {
            canvasID: "mapCanvas",
            width: width,
            height: height
        };

        renderer = new SceneRenderer(rendererOptions);
    }, 250)
    
    
})

watch(() => props.animationState, (_new, _old) => { 
    switch (props.animationState) {
        case MapAnimationState.PAUSE:
            if (renderer) {
                renderer.stopAnimation();
                currentState.state = props.animationState;
            }
            break;

        case MapAnimationState.RESET:
            if (renderer) {
                renderer.stopAnimation();
                renderer.resetAnimation();
                currentState.state = props.animationState;
            }
            break;
        case MapAnimationState.START:
            if (renderer) {
                console.log("start");
                renderer.startAnimation();
                currentState.state = props.animationState;
            }
            break;
        default:
            break;
    }
});
 
</script>

<template>
    <div id="map-info" class="component-wrapper" ref="mapWrapper">
            <canvas id="mapCanvas" width="0" height="0"> </canvas>
       

    </div>
</template>

<style scoped>


.component-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-content: center;
    height: 100%;
}
</style>