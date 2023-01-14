<script setup lang="ts">
import { reactive, watch } from "vue";

function compStep(start: number, end: number, stepSize_: number = stepSize): number { return (end - start) * stepSize_; }

const props = defineProps<{
    question: string,
    timeRemaining: number,
    switch_: boolean
}>()

// CONSTANTS
const startColor = { r: 55, g: 146, b: 55 }
const endColor = { r: 146, g: 55, b: 55 }
const stepSize = 0.025;

const colorStepVector = {
    r: compStep(startColor.r, endColor.r),
    g: compStep(startColor.g, endColor.g),
    b: compStep(startColor.b, endColor.b)
}

// REACTIVE VARS
const timerVal = reactive({ time: 100 });
const tBarColor = reactive({ r: startColor.r, g: startColor.g, b: startColor.b })

// CONTROL VARS
var isRunning = false;
var interval: any = undefined;

// ANIMATION
function startQuestion() {
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
    }, props.timeRemaining * 1000 * stepSize);
}

watch(() => props.switch_, (switch_old, switch_new) => { if (!isRunning) startQuestion(); });

</script>

<template>
    <div id="timebar" class="component-wrapper">

        <div class="wrapper">
            <div class="question-text">
                {{ props.question }}
            </div>
            <v-progress-linear 
                :color="'rgb(' + tBarColor.r + ', ' + tBarColor.g + ', ' + tBarColor.b + ')'" 
                rounded
                class="timebar" 
                height="20" 
                v-model="timerVal.time" 
                stream>
            </v-progress-linear>
        </div>
    </div>
</template>

<style scoped>
.question-text {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    font-size: x-large;
    font-weight: 500;
    color: grey;
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