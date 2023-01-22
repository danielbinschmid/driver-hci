<script setup lang="ts">
import { SceneRenderer, } from './SceneRenderer';
import { onMounted, defineProps, reactive } from 'vue';
import viscard from './Viscard.vue';
import explanation from "./explanation.json"

const props = defineProps<{
    height: number
}>()

function getIsHorizontal() {
    return window.innerWidth > window.innerHeight && window.innerWidth > 900;
}

const layout = reactive({isHorizontal: getIsHorizontal(), overlay: false});

window.onresize = () => { 
    layout.isHorizontal = getIsHorizontal();

}

onMounted(() => {

})

function showOverlay() {
    layout.overlay = true;
}

function closeOverlay() {
    layout.overlay = false;
}
const items: ParagraphItem[] = explanation



</script>

<template>
    <div id="visualization" class="component-container">


        <div v-if="!layout.isHorizontal" class="vertical-container">
     
           <!--
           
           -->
           

            <v-overlay v-model="layout.overlay">
                <div class="viscard_vertical">
                    <v-btn outlined
                        rounded
                        class="canvas-configure-btn"
                        color="rgb(118, 113, 113)"
                        @click="closeOverlay()"
                    >
                        <v-icon color="white">mdi-location-exit</v-icon>
                        <div class="canvas-configure-btn-text"></div>
                    </v-btn>
                    <viscard id="canvas_main" :is-shadow="false" :is-vertical="true"/>
                </div>
                
            </v-overlay>

           <div class="explanation-text">

                <h1>
                    Click here to show in 3D
            </h1>
            <div :style="{width: '100%', display: 'flex', marginTop: '2%'}">
                <v-btn outlined
                    rounded
                    class="canvas-configure-btn-2"
                    color="rgb(118, 113, 113)"
                    @click="showOverlay()"
                >
                    <v-icon color="white">mdi-printer-3d</v-icon>
                    <div class="canvas-configure-btn-text"></div>
                </v-btn>
            </div>
           
                
               <div v-for="(item, i) in items" :key="i">
                   <div v-if="item.type == 'Image'" >

                       <br> 

                       <v-card
                           elevation="10"
                           class="canvas-card"
                           shaped
                           outlined
                           color="rgb(118, 113, 113)" 
                       >
                           <figure>
                               <v-img src="../../assets/3DModelDescription.png" width='90vw'/>
                               <figcaption>TODO Add caption here</figcaption>
                           </figure>
                       
                       </v-card>
                       <br>
                   </div>
                   <div v-else class="paragraphs">
                       <h1>
                           {{ item.heading.toLocaleUpperCase() }}
                       </h1>
                       
                       <p>
                           {{ item.paragraph }}
                       </p>
                     
                           
                   </div>
               </div>
           </div>

    </div>
    <div v-else>
        <div class="container">
            <viscard class="viscard_" id="canvas_main" :is-shadow="false" :is-vertical="false"/>
            <div class="explanation-text-horizontal" >
                
                <v-virtual-scroll :items="items" :height="props.height">

                    <template v-slot:default="{ item }">
                        <div v-if="item.type == 'Image'" class="image-horizontal">

                            <figure>
                               <v-img src="../../assets/3DModelDescription.png" />
                               <figcaption>TODO Add caption here</figcaption>
                           </figure>

                            
                        </div>
                        <div v-else>
                            
                            <h1>
                                {{ item.heading.toLocaleUpperCase() }}
                            </h1>
                            <p>
                                {{ item.paragraph }}
                            </p>
                            <br>
                        </div>
                        
                    </template>
                </v-virtual-scroll>
            </div>
        </div>
    </div>
          
           <!--
           
           
           -->
           
       
        
        

    </div>
</template>



<style scoped>
.canvas-configure-btn-text {
    color: white;
    font-size: large;
    margin-left: 5%;
    text-align: center;
}
.canvas-configure-btn {
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    margin-bottom: 5%;
}

.canvas-configure-btn-2 {
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    margin-bottom: 5%;
}
.viscard_vertical {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: column;
    justify-content: center;
}


.overlay {
    z-index: 100;
}

.image-horizontal {
    margin-left: auto;
    margin-right: auto;
}

.vertical-container {
    padding-left: 4%;
    padding-right: 4%;
}

figure {
    margin-left: 5%;
    margin-right: 5%;

    max-width: 500px;
}

figcaption {
    text-align: center;
    margin-top: 1%;
    margin-bottom: 1%;
    color: rgb(231, 229, 225);
}

.canvas-card {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

.viscard_ {
    margin-right: auto;
    margin-left: auto;

    
}

.image {
    margin-left: auto;
    margin-right: auto;
}
.component-container {
    display: flex;
    justify-content: center;
    flex-flow: column;
    height: 95%;


}

.explanation-text {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    margin-bottom: 10%;
}

.explanation-text-horizontal {
    margin-left: auto;
    margin-right: auto;
    width: 50%;

}

.container {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
}
h1 {
    text-align: center;
    padding-top: 3%;
}

.paragraphs {
    padding-top: 2%;
    display: flex;
    flex-flow: column;

}


p{
    text-align: center;
}
</style>