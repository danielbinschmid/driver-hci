
declare type EventJSON = {
    type: string,
    [field: string]: any;
}

declare type EventJSONParsed = {
    type: string,
    choices: string[],
    time_remaining: number,
    request_text: string,
    decision: number,
    default_choice: number,
    text: string
}
