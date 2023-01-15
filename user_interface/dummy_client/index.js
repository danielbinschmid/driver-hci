const axios = require("axios");

/**
 * Dummy example http get request
 * 
 * Uses the axios http library. Documentation can be found here: https://axios-http.com/
 * 
 * @returns Information about a planet
 */
async function dummyHTTPSGet() {

    let response = await axios.get('http://localhost:40002/').catch(err => { 
        console.error(err);
        return undefined;
    });

    console.log(response.data);
    // let planet = {
    //     url: response.data.url,
    //     explanation: response.data.explanation
    // };
    // 
// 
    // console.log(planet);
    // return planet;
}

async function dummyPost() {
    let payload = { type: 'request', request_text: "Attempt to take over in next possible situation?", choices: ["yes", "no"], time_remaining: 1 };
    console.log("before");
    let res = await axios.post('http://localhost:40002/login', payload, function(data){
        if(data === 'yes') {
            alert("login success");
          }
      });

    console.log("after");

    
    // let data = res.data;
    // console.log("yes");
}

async function dummyDecide() {
    let payload = { type: 'decision_taken', decision: 0 };
    console.log("before");
    let res = await axios.post('http://localhost:40002/login', payload, function(data){
        if(data === 'yes') {
            alert("login success");
          }
      });
    console.log("after");
}

async function dummyTimeExceeded() {
    let payload = { type: 'time_exceeded'};
    console.log("before");
    let res = await axios.post('http://localhost:40002/login', payload, function(data){
        if(data === 'yes') {
            alert("login success");
          }
      });
    console.log("after");
}

async function dummyClear() {
    let payload = { type: 'clear'};
    console.log("before");
    let res = await axios.post('http://localhost:40002/login', payload, function(data){
        if(data === 'yes') {
            alert("login success");
          }
      });
    console.log("after");
}

async function dummyInvalidAction() {
    let payload = { type: 'invalid_action'};
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
if (mode == "question") {
    dummyPost();
} else if (mode == "decide"){
    dummyDecide();
} else if(mode == "idle"){
    dummyTimeExceeded();
} else if(mode == "clear"){
    dummyClear();
} else if(mode == "invalid"){
    dummyInvalidAction()
} else {
    dummyPost();
}
