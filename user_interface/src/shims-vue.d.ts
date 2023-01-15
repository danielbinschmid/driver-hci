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
    request_text: string,
    decision: number,
    default_choice: number,
    text: string
}

declare type RequestData = {
    event: EventJSON,
    decision: string,
    questionPending: boolean,
    invalid_action?: boolean
}