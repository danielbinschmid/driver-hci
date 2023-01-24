const axios = require("axios");

/**
 * const types_ = [
    {
        "type": "request",
        "fields": [
            "request_text",
            "choices",
            "default_choice",
            "time_remaining"
        ]
    },
    {
        "type": "user_response",
        "fields": [
            "decision"
        ]
    },
    {
        "type": "clear",
        "fields": []
    },
    {
        "type": "time_exceeded",
        "fields": []
    },
    {
        "type": "invalid_action",
        "fields": [
            "text"
        ]
    }
]
 * 
 * 
 */

async function startSimulation() {
    let payload = { type: 'start_simulation' };
    console.log("before");
    let res = await axios.post('http://localhost:40002/login', payload, function(data){
        if(data === 'yes') {
            alert("login success");
          }
      });
}

async function resetSimulation() {
    let payload = { type: 'reset_simulation' };
    console.log("before");
    let res = await axios.post('http://localhost:40002/login', payload, function(data){
        if(data === 'yes') {
            alert("login success");
          }
      });
}

async function request1() {
    let payload = { type: 'request', request_text: "Car in front is slow. Overtake when ready?", choices: ["yes", "no"], time_remaining: 5, default_choice: 1 };
    console.log("before");
    let res = await axios.post('http://localhost:40002/login', payload, function(data){
        if(data === 'yes') {
            alert("login success");
          }
      });

    console.log("after");
}



async function request2() {
    let payload = { type: 'request', request_text: "I feel safe to take-over. Overtake now?", choices: ["yes", "no"], time_remaining: 5, default_choice: 1 };
    console.log("before");
    let res = await axios.post('http://localhost:40002/login', payload, function(data){
        if(data === 'yes') {
            alert("login success");
          }
      });

    console.log("after");
}


async function decisionA() {
    let payload = { type: 'user_response', decision: 0 };
    console.log("before");
    let res = await axios.post('http://localhost:40002/login', payload, function(data){
        if(data === 'yes') {
            alert("login success");
          }
      });
    console.log("after");
}

async function decisionB() {
    let payload = { type: 'user_response', decision: 1 };
    console.log("before");
    let res = await axios.post('http://localhost:40002/login', payload, function(data){
        if(data === 'yes') {
            alert("login success");
          }
      });
    console.log("after");
}

// dummyHTTPSGet();
const mode = process.argv[2]; 
if (mode == "start") {
    startSimulation();
} else if (mode == "req1"){
    request1();
} else if (mode == "reset"){
    resetSimulation();
} else if(mode == "decA"){
    decisionA();
} else if(mode == "decB"){
    decisionB();
} else if(mode == "req2"){
    request2()
} else {
    console.log("mode not known");
}
