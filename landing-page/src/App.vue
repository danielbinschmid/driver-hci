<script setup lang="ts">
import { watch, ref, reactive, onMounted } from 'vue';
import type { Ref } from 'vue';
import Simulation from './components/simulation/Simulation.vue';
import Slideshow from './components/slideshow/Slideshow.vue';
import Visualization from "./components/3dDesign/Visualization.vue"
const tabs = ["Simulation", "3D-prototyping", "Slideshow"]

const model_ = reactive({val: undefined});
const sectionData = reactive({height: 80, heightSuffix: 'vh'});

const topbar: Ref<HTMLElement | null> = ref(null);

watch(() => model_.val, (switch_old, switch_new) => { 
    console.log(model_.val);
 });


onMounted(() => {
    if (topbar.value) {
        let topBarHeight = topbar.value.clientHeight;
        sectionData.height = window.innerHeight - topBarHeight - 1;
        sectionData.heightSuffix = "px";
    }
})
window.addEventListener(
    "resize",
    () => {
        if (topbar.value) {

        let topBarHeight = topbar.value.clientHeight;
        sectionData.height = window.innerHeight - topBarHeight - 1;
        sectionData.heightSuffix = "px";
    }
    },
    false
);


</script>

<template>
  <v-app>
    <v-main>

        <div class="top-bar" ref="topbar">
        
            <div class="tabs">
                <v-tabs v-model="model_.val" >   
                    <div v-for="tab in tabs" :key="tab">
                        <v-tab class="tab">{{ tab }}</v-tab>
                    </div>
                </v-tabs>
            </div>
            
        </div>

      
        <section v-show="model_.val == 0" :style="{height: sectionData.height + sectionData.heightSuffix}">
            <Simulation />
        </section>

        <section v-show="model_.val == 1" :style="{height: sectionData.height + sectionData.heightSuffix}">
           <Visualization :height="sectionData.height" />
        </section>

        <section v-show="model_.val == 2" :style="{height: sectionData.height + sectionData.heightSuffix}">
            <Slideshow />
        </section>


    </v-main>
  </v-app>
</template>



<style scoped>
section {
    width: 100vw;
    height: 80vh;
    background-color: rgb(231, 229, 225);
}

.divider {
    position: relative;
    z-index: 2;
}

.tab {
    width: 20vw;
    font-weight: 300;
}

.tabs {
    margin-left: auto;
    margin-right: auto;
}

.top-bar {
    width: 100vw;
    height: fit-content;
    background-color: rgb(231, 229, 225);
    z-index: 5;
    display: flex;
    justify-content: center;
    position: relative;
    border-bottom: groove;
    border-color: gray;
    border-width: 0.0001rem;

}
</style>