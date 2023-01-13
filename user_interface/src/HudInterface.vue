<script setup lang="ts">
import Timebar from './Timebar.vue';
const props = defineProps<{
  width: number
  height: number
}>();

</script>

<template>
    <div id="hud-interface">
        <div class="display-container" :style="{height: props.height + 'px'}">
            <div class="top-indent">
                Invisible top indent
            </div>
            <div class="display">
                <div class="display-text">
                    Hello
                </div>
                
                <timebar>

                </timebar>
            </div>
        </div>
    </div>
</template>

<style scoped>

.top-indent {
    visibility: hidden;
    height: 60%;
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
    width: 40%;
    height: 30%;
}

</style>