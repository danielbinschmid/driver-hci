export {}
// export function doEvent(value: EventJSON) {
//     request_data.invalid_action = value.type == "invalid_action" && !showQuestion.val;
//     requestData.decisionWarningText = "";
//     if (value.type == "request") {
//         showQuestion.val = true;
//         request_data.event = value;
//         request_data.questionPending = true;
//         switch_.val = !switch_.val;
//     } else if (value.type == "user_response") {
//         request_data.decision = request_data.event.choices[value.decision];
// 
//         request_data.questionPending = false;
//     } else if (value.type == "time_exceeded") {
//         requestData.decisionWarningText = "Took too long to take action. Used default choice";
//         request_data.decision = request_data.event.choices[value.default_choice];
//         request_data.questionPending = false;
//     } else if (value.type == "clear") {
//         showQuestion.val = false;
//     } else if (value.type == "invalid_action") {
//         
//         request_data.event.text = value.text;
//     }
// }
// 
// const clear_: EventJSON = {
//         type: "clear",
//         decision: 1,
//         choices: [],
//         default_choice: 0,
//         time_remaining: 0,
//         text: "",
//         request_text: ""
//     }
// var timeout: any = undefined;
// /**
//  * 
//  */
// export function startSimulation() {
//     const START_REQUEST: EventJSON = {
//         type: "request",
//         request_text: "Car in front is slow. Overtake when ready?",
//         choices: ["yes", "no"],
//         default_choice: 1, 
//         time_remaining: 4,
//         decision: 0,
//         text: ""
//     }
// 
//     const request_2: EventJSON = {
//         type: "request",
//         request_text: "I feel safe to take-over. Overtake now?",
//         choices: ["yes", "no"],
//         default_choice: 1, 
//         time_remaining: 3,
//         decision: 0,
//         text: ""
//     }
// 
//     const request_3: EventJSON = {
//         type: "request",
//         request_text: "Overtake now?",
//         choices: ["yes", "no"],
//         default_choice: 1, 
//         time_remaining: 5,
//         decision: 0,
//         text: ""
//     }
// 
//     const response_1: EventJSON = {
//         type: "user_response",
//         decision: 0,
//         choices: [],
//         default_choice: 0,
//         time_remaining: 0,
//         text: "",
//         request_text: ""
//     }
// 
//     
// 
//     const response_2: EventJSON = {
//         type: "user_response",
//         decision: 1,
//         choices: [],
//         default_choice: 0,
//         time_remaining: 0,
//         text: "",
//         request_text: ""
//     }
// 
//     const response_3: EventJSON = {
//         type: "user_response",
//         decision: 1,
//         choices: [],
//         default_choice: 0,
//         time_remaining: 0,
//         text: "",
//         request_text: ""
//     }
// 
//     timeout = setTimeout(() => {
//         doEvent(START_REQUEST);
// 
//         timeout = setTimeout(() => {
//             doEvent(response_1);
// 
//             timeout = setTimeout(() => {
//                 doEvent(clear_);
// 
//                 timeout = setTimeout(() => {
//                     doEvent(request_2);
// 
//                     timeout = setTimeout(() => {
//                         doEvent(response_2);
// 
//                         timeout = setTimeout(() => {
//                             doEvent(clear_);
//                         }, 1500);
//                     }, 2500)
//                 }, 2600); // i feel safe to take over
//             }, 1500)
//         }, 2500);
//     }, 3000);
// }