<script setup lang="ts">
import Timebar from './Timebar.vue';
import { reactive } from "vue";
const props = defineProps<{
  width: number
  height: number
}>();

const switch_ = reactive({val: false});
const request_data = reactive({text: "Question text", timeRemaining: 5, choices: ["left", "right"]});

// { type: 'request', choices: [ 'left', 'right' ], time_remaining: 10 }
window.electronAPI.handleEvent((event, value) => {
    if (value.type == "request") {
        request_data.text = value.request_text;
        request_data.choices = value.choices;
        request_data.timeRemaining = value.time_remaining;
        onButton();
    }
});

function onButton() {
    switch_.val = !switch_.val;
}

</script>

<template>
    <div id="hud-interface">
        <div class="display-container" :style="{height: props.height + 'px'}">
            <div class="top-indent">
                Invisible top indent
            </div>
            <div class="display">
                <timebar :question="request_data.text" :choices="request_data.choices" :time-remaining="request_data.timeRemaining" :switch_="switch_.val" />
            </div>
        </div>
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