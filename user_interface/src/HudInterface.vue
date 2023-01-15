<script setup lang="ts">
import Timebar from './Timebar.vue';
import MapInfo from "./MapInfo.vue"
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
        request_text: "text",
        decision: 0,
        default_choice: 0,
        text: "",
    },
    decisionWarningText: "",
    decision: "left",
    questionPending: false
}
const request_data = reactive(requestData);
const mapData = reactive({show: false});
const showQuestion = reactive({val: true})

// { type: 'request', choices: [ 'left', 'right' ], time_remaining: 10 }
window.electronAPI.handleEvent((event, value) => {
    request_data.invalid_action = value.type == "invalid_action" && !showQuestion.val;
    requestData.decisionWarningText = "";
    if (value.type == "request") {
        showQuestion.val = true;
        request_data.event = value;
        request_data.questionPending = true;
        switch_.val = !switch_.val;
    } else if (value.type == "user_response") {
        request_data.decision = request_data.event.choices[value.decision];

        request_data.questionPending = false;
    } else if (value.type == "time_exceeded") {
        requestData.decisionWarningText = "Took too long to take action. Used default choice";
        request_data.decision = request_data.event.choices[value.default_choice];
        request_data.questionPending = false;
    } else if (value.type == "clear") {
        showQuestion.val = false;
    } else if (value.type == "invalid_action") {
        
        request_data.event.text = value.text;
    }
});


function mapBtn() {
    mapData.show = !mapData.show;
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
                <v-expand-x-transition>
                    <map-info v-show="mapData.show"/>
                </v-expand-x-transition>
                
                
                
            </div>
        </div>
        <v-btn @click="mapBtn()">
            show map
        </v-btn>
    </div>
</template>

<style scoped>

.wrapper {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-content: center;
    height: 100%;
}

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

.map-timebar-wrapper {
    display: flex;
    justify-content: space-between;
    flex-flow: row;
    width: 100%;
}

.display {
    display: flex;
    justify-content: center;
    flex-flow: row;
    border: solid;
    border-color: black;
    border-width: 0em;
    border-radius: 25px;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(140, 140, 140, 0.4);
    width: 55%;
    height: 45%;
}

</style>