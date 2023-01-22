<script setup lang="ts">
import { watch, ref, reactive, onMounted } from 'vue';
import type { Ref } from 'vue';
import Simulation from './components/simulation/Simulation.vue';
import Slideshow from './components/slideshow/Slideshow.vue';
import Visualization from "./components/3dDesign/Visualization.vue"
const tabs = ["Project", "3D-prototyping", "Simulation"]

const model_ = reactive({val: undefined});
const sectionData = reactive({height: 80, heightSuffix: 'vh'});

const topbar: Ref<HTMLElement | null> = ref(null);

watch(() => model_.val, (switch_old, switch_new) => { 
    console.log(model_.val);
 });


onMounted(() => {
    if (topbar.value) {
        let topBarHeight = topbar.value.clientHeight;
        sectionData.height = window.innerHeight - topBarHeight -2;
        sectionData.heightSuffix = "px";
    }
})
window.addEventListener(
    "resize",
    () => {
        if (topbar.value) {

        let topBarHeight = topbar.value.clientHeight;
        sectionData.height = window.innerHeight - topBarHeight;
        sectionData.heightSuffix = "px";
    }
    },
    false
);


</script>

<template>
  <v-app>
    <v-main class="main">

        <div class="top-bar" ref="topbar">
            <div class="headerContainer">
                <h2 class="headerItem">
                    PROTOTYPE SIMULATION
                </h2>
                <div class="headerItem">
                    <v-img src='./assets/coop-logo.png' :height="100" ></v-img>

                </div>
                <h2 class="headerItem">
                    HCI FOR AUTONOMOUS DRIVING
                </h2>
            </div>
            <div class="tabs">
                <v-tabs v-model="model_.val" >   
                    <div v-for="tab in tabs" :key="tab">
                        <v-tab class="tab">{{ tab }}</v-tab>
                    </div>
                </v-tabs>
            </div>
            
        </div>


            <div class="top-bar-ghost">
            <div class="headerContainer">
                <h2 class="headerItem">
                    PROTOTYPE SIMULATION
                </h2>
                <div class="headerItem">
                    <v-img src='./assets/coop-logo.png' :height="100" ></v-img>

                </div>
                <h2 class="headerItem">
                    HCI FOR AUTONOMOUS DRIVING
                </h2>
            </div>
            <div class="tabs">
                <v-tabs v-model="model_.val" >   
                    <div v-for="tab in tabs" :key="tab">
                        <v-tab class="tab">{{ tab }}</v-tab>
                    </div>
                </v-tabs>
            </div>
            
        </div>
        
        

      
        <section v-show="model_.val == 0">
            <Slideshow />
        </section>

        <section v-show="model_.val == 1" >
            <Visualization :height="sectionData.height" />
           
        </section>

        <section v-show="model_.val == 2" >
            <Simulation /> 
            
        </section>


    </v-main>
  </v-app>
</template>



<style scoped>
.main {
    background-color: rgb(231, 229, 225);
}

.headerContainer {
    display: flex;
    justify-content: space-around;
    flex-flow: row;
    align-content: center;
}
.logoWrapper {
    display: flex;
    justify-content: center;
}

h2{
    font-size: medium;
    text-align: center;
    font-weight: 300;
}
.headerItem {
    flex-basis: 33%;
    display: flex;
    justify-content: center;
    flex-flow: column;
    color: black;
}
section {
    width: 100vw;
    height: fit-content;
    background-color: rgb(231, 229, 225);
}

.divider {
    position: relative;
    z-index: 2;
}

.tab {
    width: 33vw;
    font-weight: 300;
}

.tabs {
    margin-left: auto;
    margin-right: auto;
}

.top-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    background-color: rgb(231, 229, 225);
    z-index: 10;

}

.top-bar-ghost {

    width: 100vw;
    background-color: rgb(231, 229, 225);
    z-index: 1;

}
</style>