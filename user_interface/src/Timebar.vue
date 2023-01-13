<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import type { Ref } from 'vue'
const tbar: Ref<Element | null> = ref(null);

const props = defineProps<{
    foo: string
    bar?: number
}>()

const timerVal = reactive({ time: 100 });

// rgb(55, 146, 55)
const startColor = {
    r: 55,
    g: 146,
    b: 55
}

const timeForEvent = 4;
const stepSize = 0.01

const endColor = {
    r: 146,
    g: 55,
    b: 55
}

function compStep(start: number, end: number, stepSize_: number = stepSize): number {
    return (end - start) * stepSize_;
}

const colorStepVector = {
    r: compStep(startColor.r, endColor.r),
    g: compStep(startColor.g, endColor.g),
    b: compStep(startColor.b, endColor.b)
}


const tBarColor = reactive({ r: startColor.r, g: startColor.g, b: startColor.b })

const question = reactive({ text: "Take-over?" })


var isRunning = false;

var interval: any = undefined;
function onButton() {
    console.log("button");
    interval = setInterval(() => {
        if (isRunning) {
            // change colour
            tBarColor.r += colorStepVector.r
            tBarColor.g += colorStepVector.g
            tBarColor.b += colorStepVector.b

            // change time
            timerVal.time -= 100 * stepSize;
            if (timerVal.time <= 0) {
                tBarColor.r = startColor.r;
                tBarColor.g = startColor.g;
                tBarColor.b = startColor.b;

                timerVal.time = 100;
                clearInterval(interval)
                isRunning = false;
            }

        } else {
            timerVal.time = 100;
            isRunning = true;
        }


    }, timeForEvent * 1000 * stepSize);
}

</script>

<template>
    <div id="timebar" class="component-wrapper">

        <div class="wrapper">
            <div class="question-text">
                {{ question.text }}
            </div>
            <v-progress-linear :color="'rgb(' + tBarColor.r + ', ' + tBarColor.g + ', ' + tBarColor.b + ')'" rounded
                class="timebar" height="20" v-model="timerVal.time">
            </v-progress-linear>
            <v-btn @click="onButton" class="timebar" outlined> Trigger event</v-btn>

        </div>

    </div>
</template>

<style scoped>
.question-text {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

.component-wrapper {
    width: 100%;
}

.wrapper {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-content: center;
    height: 100%;
}



.timebar {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}
</style>