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
    let payload = { type: 'request' };
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

// dummyHTTPSGet();
dummyPost();
