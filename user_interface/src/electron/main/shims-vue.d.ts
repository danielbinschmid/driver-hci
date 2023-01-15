
declare type EventJSON = {
    type: string,
    choices?: string[],
    time_remaining?: number,
    request_text?: string,
    decision?: number,
    default_decision?: number
}

declare type EventJSONParsed = {
    type: string,
    choices: string[],
    time_remaining: number,
    request_text: string,
    decision: number,
    default_decision: number
}
