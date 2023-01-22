<script setup lang="ts">
const tabs = ["Simulation"]
 
</script>

<template>
    <div id="top-bar">
        <div class="top-bar" ref="topbar">
            <div class="headerContainer">
                <h2 class="headerItem">
                    PROTOTYPE SIMULATION
                </h2>
                <div class="headerItem">
                    <div class="logoWrapper">
                        <img src='../assets/coop-logo.png' :height="100" />
                    </div>
                </div>
                <h2 class="headerItem">
                    HCI FOR AUTONOMOUS DRIVING
                </h2>
            </div>
            <div class="tabs">
                <v-tabs  >   
                    <div v-for="tab in tabs" :key="tab">
                        <v-tab class="tab">{{ tab }}</v-tab>
                    </div>
                </v-tabs>
            </div>
            
        </div>
       

    </div>
</template>

<style scoped>
.tabs {
    margin-left: auto;
    margin-right: auto;
}
.logoWrapper {
    display: flex;
    justify-content: center;
}
h2{
    font-size: medium;
    text-align: center;
    font-weight: 300;
}
.headerContainer {
    display: flex;
    justify-content: space-around;
    flex-flow: row;
    align-content: center;
}
.headerItem {
    flex-basis: 33%;
    display: flex;
    justify-content: center;
    flex-flow: column;
    color: black;
}
.top-bar {
    display: flex;
    flex-flow: column;
    width: 100vw;
    height: fit-content;
    background-color: rgb(231, 229, 225);
    z-index: 5;
    display: flex;
    justify-content: center;
    position: relative;
    border-bottom: groove;
    border-color: gray;
    border-width: 0.0001rem;

}

</style>