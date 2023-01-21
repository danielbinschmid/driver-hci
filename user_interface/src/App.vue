<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import type { Ref } from 'vue'
import HudInterface from "./HudInterface.vue"
import Simulation from "./simulation/Simulation.vue";

</script>

<template>
    <main>
        <div class="background">
            <simulation />
        </div>
        
        
    </main>
</template>

<style scoped>

.background {
    width: 100vw;
    height: 100vh
}

</style>
