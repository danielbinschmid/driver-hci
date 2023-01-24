<script setup lang="ts">
import Timebar from './Timebar.vue';
import MapInfo from "./map/MapInfo.vue"
import { reactive, onMounted, watch, defineEmits, ref } from "vue";
import { MapAnimationState } from './map/MapAnimationStates';

const props = defineProps<{
  width: number,
  height: number,
  animationState: MapAnimationState
}>();

const switch_ = reactive({val: false});

const emit = defineEmits(['startSimulation'])


let requestData: RequestData = {
    event: {
        type: "",
        choices: ["", ""],
        time_remaining: 1,
        request_text: "",
        decision: 0,
        default_choice: 0,
        text: "",
    },
    decisionWarningText: "",
    decision: "left",
    questionPending: false
}
const request_data = reactive(requestData);
const mapData = reactive({show: true});
const showQuestion = reactive({val: false});

onMounted(() => {
    setTimeout(() => {
        let payload: EventJSON = { type: 'request', request_text: "Risk of animals crossing. Drive slower?", choices: ["yes", "no"], time_remaining: 30, default_choice: 0, decision: 0, text: "" };
        // doEvent(payload);

    }, )
})





watch(() => props.animationState, (_new, _old) => { 
    switch (props.animationState) {
        case MapAnimationState.PAUSE:

            break;

        case MapAnimationState.RESET:

            break;
        case MapAnimationState.START:
            break;
        default:
            break;
    }
});

// { type: 'request', choices: [ 'left', 'right' ], time_remaining: 10 }
window.electronAPI.handleEvent((event, value) => {

    request_data.invalid_action = value.type == "invalid_action" && !showQuestion.val;
    requestData.decisionWarningText = "";

    switch(value.type) {
        case "request":
            showQuestion.val = true;
            request_data.event = value;
            request_data.questionPending = true;
            switch_.val = !switch_.val;
            break;
        case "user_response":
            request_data.decision = request_data.event.choices[value.decision];
            request_data.questionPending = false;
            break;
        case "time_exceeded":
            requestData.decisionWarningText = "Took too long to take action. Used default choice";
            request_data.decision = request_data.event.choices[value.default_choice];
            request_data.questionPending = false;
            break;
        case "clear":
            showQuestion.val = false;
            break;
        case "invalid_action":
            request_data.event.text = value.text;
            break;
        case "start_simulation":
            emit("startSimulation");
            break;
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
                    <map-info v-show="mapData.show" :width="100" :height="100" :animation-state="props.animationState"/>
                </v-expand-x-transition>
                 
                
                 
            </div>
        </div>
        <!--
            <v-btn @click="mapBtn()">
                show map
            </v-btn>
        -->
        
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
    height: 70%;
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
    height: 25%;
    z-index: 1;
}

</style>