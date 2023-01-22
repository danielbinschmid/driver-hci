<script setup lang="ts">
  //
</script>

<template>
    <div id="slideshow" class="project">
        <div class="paragraphs">
            <div class="paragraph-1">
                <h1>
                    What is COOP-Driving? 
                </h1>
                <p>
                    COOP-Driving was created by a team of students at the Technical University of Munich (TUM).
                    Our vision is to improve the user experience of Autonomous-Driving level 2 and 3 by implementing interaction between the user and the Autonomous-Driving-System (ADS). 
                    Especially in situations where the ADS has to deal with a high level of uncertainty, the system often struggles to make a decision and gives back control to the user. 
                    Another main issue with the current state of Autonomous-Driving is missing trust from the user in the ADS.
                    We therefore want to incorporate human decision making in order to create a symbiosis between the ADS and the user.
                </p>
            </div>

            <div class="paragraph-2">
                <h1>
                    HCI Concept
                </h1>
                <p>

                    Our idea is based on the assumption of current research that an ADS is able to generate a binary decision model. In practice this implies that the ADS has access to enough information about its enviroment to be able to generate a request with two options for the user to choose from. 
                    Every request must include a fail-safe default option, which has no implication on the behaviour of the ADS and allows the user to not take action at all. By reducing the problem down to, for example, yes or no questions, we make it really easy for the user to understand the situation and take action.
                    <!-- The figure below displays the logic that gets triggered when a new binary request is fired. -->

                    <br><br>
                    
                    <v-card
                        elevation="10"
                        class="canvas-card"
                        shaped
                        outlined
                        color="rgb(118, 113, 113)" 
                    >
                        <figure>
                            <v-img src="../../assets/control_diagram.png" width='90vw'/>
                            <figcaption>System diagram of concept</figcaption>
                        </figure>
                       
                    </v-card>
                    

                    <br><br>

                    Another big part of our solution is that it helps the user to generate trust in the ADS, as it's intentions are displayed on a HUD and intervene with them. 
                    During our problem space identification we received feedback that users lack trust in the ADS, therefore refusing to use it. We solve this problem by integrating more transparency and the ability to interact with the system, giving the user the ability to be in control.

                </p>
            </div>

            <div class="paragraph-3">
                <h1>
                    Working Prototype
                </h1>
                <p>
                    We implemented a working prototype which shows how our solution may be integrated into an existing ADS framework and used in a real world scenario. 
                    The main task was to realise a solution which is easy to use while still having a big impact on the user experience. The concept of including the user in the decision making process is not yet present in current ADS.
                    Therefore we made sure that it can be integrated seemlessy by manufacturers of ADS, while providing a lot of freedom for implementation details. 

                    <br><br>

                    For example, the user decision input can be realised with a camera mounted on the rearview-mirror which records handgestures from the user. 
                    The data is then classified on a standalone-machine using computer-vision algorithms. 
                    Different handgestures are mapped to decisions and forwarded to the ADS. You can watch a live demonstration of this concept in the 'Simulation' section.
                    

                    <!-- In the live-demo example below you can see the cockpit-view of a car equipped with our product. 
                    The HUD on the left displays information about map data and the ADS world view. On the right you see the view of the camera, which is mounted on the bottom of the rearview mirror and scans for handgesture input of the user. 
                    You can see that the driver approaches a slow driving car. The ADS wants to attempt a take-over maneuver in the near future, but asks the user for confirmation first.
                    It appears that the vehicle in front can not be trusted, as it drives in unpredictable wavy lines. Therefore, the ADS asks the user if it is safe to overtake now. The user declines the request and waits for a safe situation.
                    When it is safe to do so, the ADS asks the user again, if the take-over maneuver should be executed. The user confirms the action and takes over the car in front. -->
                </p>
            </div>

            <div>
                <!-- <h1>Data Flow Diagram</h1> -->
            </div>

        </div>
    </div>
</template>

<style scoped>
.canvas-card {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

figure {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 5%;
    max-width: 500px;
}

figcaption {
    text-align: center;
    margin-top: 1%;
    margin-bottom: 1%;
    color: rgb(231, 229, 225);
}

.project {
    padding-left: 4%;
    padding-right: 4%;
    margin-bottom: 5%;
}

h1 {
    text-align: center;
    padding-top: 2%;
}

.paragraphs {
    
    display: flex;
    flex-flow: column;

}
.paragraph-1 {
    margin-right: 2%;
}
.paragraph-2 {
    margin-right: 2%;
}

</style>

