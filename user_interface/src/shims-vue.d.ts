declare module '*.glsl?raw'
declare module '*.gltf'

declare type Planet = {
    url: string,
    explanation: string
};

declare type EventJSON = {
    type: string,
    choices: string[],
    time_remaining: number,
    request_text: string
}
