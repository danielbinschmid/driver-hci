<script setup lang="ts">
import { watch, ref, reactive } from 'vue';
import Simulation from './components/simulation/Simulation.vue';
import Slideshow from './components/slideshow/Slideshow.vue';
import Visualization from "./components/3dDesign/Visualization.vue"
const tabs = ["Simulation", "3D-prototyping", "Slideshow"]

const model_ = reactive({val: undefined})

watch(() => model_.val, (switch_old, switch_new) => { 
    console.log(model_.val);
 });


function toggle() {
    console.log("change")
}


</script>

<template>
  <v-app>
    <v-main>
      <v-app-bar absolute color="rgb(231, 229, 225)" dark shrink-on-scroll prominent
        fade-img-on-scroll scroll-target="#scrolling-techniques-3" class="top-bar" >
        <div class="tabs">
            <v-tabs v-model="model_.val" >   
                <div v-for="tab in tabs" :key="tab">
                    <v-tab class="tab">{{ tab }}</v-tab>
                </div>
            </v-tabs>
        </div>

      </v-app-bar>
      
        <section v-show="model_.val == 0">
            <Simulation />
        </section>

        <section v-show="model_.val == 1">
           <Visualization />
        </section>

        <section v-show="model_.val == 2">
            <Slideshow />
        </section>


    </v-main>
  </v-app>
</template>



<style scoped>
section {
    width: 100vw;
    height: 100vh;
    background-color: rgb(231, 229, 225);
}

.tab {
    width: 20vw;
    font-weight: 400;
}

.tabs {
    margin-left: auto;
    margin-right: auto;
}

.top-bar {
    width: 100vw;

}
</style>