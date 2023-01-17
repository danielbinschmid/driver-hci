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
                    Our vision is to improve the usability of AD level2/3 by implementing interaction between the user and the Autonomous-Driving-System (ADS). 
                    Especially in situations where the ADS has to deal with a high level of uncertainty, the system often struggles to make a decision and gives back control to the user. 
                    We therefore want to incorporate human decision making in order to extend the duration of an autonomous driving phase. 
                </p>
            </div>

            <div class="paragraph-2">
                <h1>
                    Working Prototype
                </h1>
                <p>
                    We implemented a working prototype which shows how our solution may be integrated and used in a real world scenario. 
                    In the live-demo example below you can see the cockpit-view of a car equipped with our product. 
                    The HUD on the left displays information about map data and the ADS world view. On the right you see the view of the camera, which is mounted on the bottom of the rearview mirror and scans for handgesture input of the user. 
                    You can see that the driver approaches a slow driving car. The ADS wants to attempt a take-over maneuver in the near future, but asks the user for confirmation first.
                    It appears that the vehicle in front can not be trusted, as it drives in unpredictable wavy lines. Therefore, the ADS asks the user if it is safe to overtake now. The user declines the request and waits for a safe situation.
                    When it is safe to do so, the ADS asks the user again, if the take-over maneuver should be executed. The user confirms the action and takes over the car in front.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>

.project {
    padding-left: 4%;
    padding-right: 4%;
}

h1 {
    text-align: center;
    padding-top: 3%;
}

.paragraphs {
    padding-top: 2%;
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

