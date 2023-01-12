import axios from "axios"


/**
 * Dummy example http get request
 * 
 * Uses the axios http library. Documentation can be found here: https://axios-http.com/
 * 
 * @returns Information about a planet
 */
export async function dummyHTTPSGet(): Promise<Planet | undefined> {

    let response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY').catch(err => { 
        console.error(err);
        return undefined;
    });

    let planet: Planet = {
        url: response.data.url,
        explanation: response.data.explanation
    };
    
    return planet;
}
