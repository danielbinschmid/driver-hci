<script setup lang="ts">
import { reactive, watch } from "vue";
import { gsap } from "gsap";
function compStep(start: number, end: number, stepSize_: number = stepSize): number { return (end - start) * stepSize_; }

const props = defineProps<{
    requestData: RequestData,
    show: boolean,
    switch_: boolean,
}>()

// CONSTANTS
const startColor = { r: 55, g: 146, b: 55 }
const endColor = { r: 146, g: 55, b: 55 }
const stepSize = 0.05;

const colorStepVector = {
    r: compStep(startColor.r, endColor.r),
    g: compStep(startColor.g, endColor.g),
    b: compStep(startColor.b, endColor.b)
}

// REACTIVE VARS
const timerVal = reactive({ time: 100 });
const tBarColor = reactive({ r: startColor.r, g: startColor.g, b: startColor.b })
const show = reactive({val: props.show});
const decided = reactive({val: false});
const localTimerExceeded = reactive({val: false});
// CONTROL VARS
var isRunning = false;
var interval: any = undefined;

// ANIMATION
function resetTimer() {
    tBarColor.r = startColor.r;
    tBarColor.g = startColor.g;
    tBarColor.b = startColor.b;

    timerVal.time = 100;
    clearInterval(interval)
    isRunning = false;
    
    
}

function startQuestion() {
    decided.val = false;
    show.val = true;
    localTimerExceeded.val = false;
    timerVal.time = 100;
    interval = setInterval(() => {
        if (isRunning) {
            // change colour
            tBarColor.r += colorStepVector.r
            tBarColor.g += colorStepVector.g
            tBarColor.b += colorStepVector.b

            // change time
            timerVal.time -= 100 * stepSize;
            if (timerVal.time <= 0) {
                localTimerExceeded.val = true;
            }
        } else {
            timerVal.time = 100;
            isRunning = true;
        }
    }, props.requestData.event.time_remaining * 1000 * stepSize);
}



watch(() => props.switch_, (switch_old, switch_new) => { if (!isRunning) startQuestion(); });
watch(() => props.show, (show_new, show_old) => { 
    show.val = show_new 
    if (!show.val) resetTimer();
});

watch(() => props.requestData.questionPending, (old, new_) => { 
    if (isRunning && show.val) {
        resetTimer();
        decided.val = true;        
        localTimerExceeded.val = false;
    }
    
});
</script>

<template>
    <div id="timebar" class="component-wrapper">
        
        <v-expand-transition>
            <div v-show="requestData.invalid_action" class="wrapper-invalid">
                <div  class="invalid-text">
                    {{ requestData.event.text.toLocaleUpperCase() }}
                </div>
            </div>
        </v-expand-transition>
    
        <v-expand-transition>
            <div class="wrapper" v-show="show.val">
                
                

                <div class="question-text">
                    {{ props.requestData.event.request_text.toLocaleUpperCase() }}
                </div>

                <div class="choicesWrapper">
                    <v-expand-transition>
                        <div class="choices" v-show="props.requestData.questionPending">
                            <div v-for="(item, i) in props.requestData.event.choices" class="choice">
                                <div class="choice-text">
                                    {{ item.toLocaleUpperCase() }}
                                </div>
                            </div>
                        </div>
                    </v-expand-transition>

                    <v-expand-transition>
                        <div class="choices" v-show="!props.requestData.questionPending">
                            <div v-if="props.requestData.decisionWarningText != ''">
                                <div class="choice-warning-text">
                                        {{ props.requestData.decisionWarningText.toLocaleUpperCase() + " '''" + props.requestData.decision.toLocaleUpperCase() + "''" }}
                                    </div>
                            </div>
                            <div v-else class="choice">
                                    
                                <div class="choice-text">
                                    {{ props.requestData.decision.toLocaleUpperCase() }}
                                </div>
                            </div>
                            
                        </div>
                    </v-expand-transition>
                </div>
                
                
                <v-expand-transition>
                    <v-progress-linear 
                        v-show="!decided.val"
                        :color="'rgb(' + tBarColor.r + ', ' + tBarColor.g + ', ' + tBarColor.b + ')'" 
                        rounded
                        class="timebar" 
                        height="10" 
                        v-model="timerVal.time" 
                        :indeterminate="localTimerExceeded.val"
                        stream>
                    </v-progress-linear>
                </v-expand-transition>
                
            </div>
        </v-expand-transition>
    </div>
</template>

<style scoped>

.choice
.choice-text {
    margin: 5%;
    color: white;
    text-align: center;
}

.choice-warning-text {
    margin: 5%;
    color: orangered;
    text-align: center;
    font-size: medium;
}

.invalid-text {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    font-size: medium;
    font-weight: 100;
    color: red;
    text-align: center;
}

.invalid-text-small {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    font-size:small;
    font-weight: 100;
    color: red;
    text-align: center;
}


.choice {
    font-size: medium;
    width: 30%;
    display: flex;
    justify-content: center;
    border: solid;
    border-color: whitesmoke;
    border-width: 0.05em;
    border-radius: 25px;

    background-color: rgba(140, 140, 140, 0.4);


}

.choices {
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
}
.question-text {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    font-size: medium;
    font-weight: 100;
    color: black;
    text-align: center;
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

.wrapper-invalid {
    display: flex;
    justify-content: center;
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