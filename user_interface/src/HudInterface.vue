<script setup lang="ts">
import Timebar from './Timebar.vue';
import { reactive } from "vue";
const props = defineProps<{
  width: number
  height: number
}>();

const switch_ = reactive({val: false});

let requestData: RequestData = {
    event: {
        type: "idle",
        choices: ["left", "right"],
        time_remaining: 1,
        request_text: "text"
    },
    decision: "left",
    questionPending: false
}
const request_data = reactive(requestData);

const showQuestion = reactive({val: true})

// { type: 'request', choices: [ 'left', 'right' ], time_remaining: 10 }
window.electronAPI.handleEvent((event, value) => {
    console.log(value)
    if (value.type == "request") {
        request_data.event = value
        request_data.questionPending = true;
        onButton();
    }
});

function onButton() {
    switch_.val = !switch_.val;
}

function decideQuestion() {
    request_data.questionPending = !request_data.questionPending;
}

function clearQuestion() {
    showQuestion.val = !showQuestion.val;
} 

</script>

<template>
    <div id="hud-interface">
        <div class="display-container" :style="{height: props.height + 'px'}">
            <div class="top-indent">
                Invisible top indent
            </div>
            <div class="display">
                <timebar :request-data="request_data" :switch_="switch_.val" :show="showQuestion.val" />
            </div>
        </div>
        <v-btn @click="decideQuestion()">Decide</v-btn>
        <v-btn @click="clearQuestion()">Clear</v-btn>
    </div>
</template>

<style scoped>

.top-indent {
    visibility: hidden;
    height: 50%;
}

.display-text {
    font-weight: 100;
}

.display-container {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-flow: column;
}

.display {
    display: flex;
    justify-content: center;
    border: solid;
    border-color: black;
    border-width: 0em;
    border-radius: 25px;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(140, 140, 140, 0.4);
    width: 50%;
    height: 40%;
}

</style>