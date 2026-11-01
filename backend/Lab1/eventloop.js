// console.log("starting of code");
// process.nextTick(()=>{
// console.log("this process.nextTick operation")
// })
// setTimeout(()=>{

// console.log("this is first timeout operation");
// }, 10000);

// setImmediate(()=>{

// console.log("this is setImmediate operation");
// });

// console.log("this is the end");
// setTimeout(()=>{
// console.log("this is second")
// }, 11000);
// new Promise((resolve, reject)=>{
//     let success=true;
//     if(success)
//         resolve("data fetched successfully");
//     else
//         reject("data not fetched");
// }).then((message)=>{
//     console.log(message);
// }).catch((message)=>{
//     console.log(message);
// });
// console.log("this is starting of code");

import {EventEmitter} from "node:events";
function myFunction(){
    const myEmmiter = new EventEmitter();
    return{
        addEventListener(eventType,listener){
            myEmmiter.on(eventType,listener);
        },
        removeEventListener(eventType,listener){
            myEmmiter.off(eventType,listener);
        },
        dispatchEvent(event){
            event.target = this;
            event.currentTarget = this;
            myEmmiter.emit(event.eventType,event);
        }
    }
}
const button=myFunction();
button.addEventListener('save',()=>{
    console.log("saving ...");
})
button.dispatchEvent({
    eventType:"save",
    detail:"this is save dispatched"
});
function handleClick(event){
    console.log("button clicked");
    console.log(event.detail);
}



