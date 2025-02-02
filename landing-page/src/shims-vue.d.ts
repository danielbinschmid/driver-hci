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
    decisionWarningText: string,
    questionPending: boolean,
    invalid_action?: boolean
}

declare type SceneOptions3D = {
    rotateDesign?: boolean,
    canvasID: string,
    width: number,
    height: number
}


declare type ParagraphItem = { heading: string; type: string; paragraph: string; source?: undefined; } | { heading: string; type: string; source: string; paragraph: string; } | { heading: string; paragraph: string; type?: undefined; source?: undefined; }