<script setup lang="ts">
import { SceneRenderer, } from './SceneRenderer';
import { onMounted, defineProps, reactive } from 'vue';
import viscard from './Viscard.vue';
import explanation from "./explanation.json"

const props = defineProps<{
    height: number
}>()

const descriptionMetadata = reactive({
    height: window.innerHeight * (3 / 5)
})

window.onresize = () => { 

  descriptionMetadata.height = window.innerHeight * (3 / 5)
}

onMounted(() => {

})


const items: ParagraphItem[] = explanation

const benched = 0
</script>

<template>
    <div id="visualization" class="component-container">



        <div class="container">
            <viscard />

            <div class="explanation-text">
                <v-virtual-scroll :items="items" :height="descriptionMetadata.height">

                    <template v-slot:default="{ item }">
                        <div v-if="item.type == 'Image'" >

                            <v-img src="../../assets/3DModelDescription.png" width="500" />

                            
                        </div>
                        <div v-else>
                            <h1>
                                {{ item.heading.toLocaleUpperCase() }}
                            </h1>
                            <p>
                                {{ item.paragraph }}
                            </p>
                        </div>
                        
                    </template>
                </v-virtual-scroll>
            </div>
        </div>

    </div>
</template>


<style scoped>

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
    width: 50%;
    margin-top: auto;
    margin-bottom: auto;
}

.container {
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
}
</style>