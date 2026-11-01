import {EventEmitter} from "node:events";
function createDomElements(){
    const emitter=new EventEmitter();
    return {
        addEventListener(eventType,listener){
            emitter.on(eventType,listener);
        },
        removeEventListener(eventType,listener){
            emitter.off(eventType,listener);
        },
        dispatchEvent(event){
            event.target=this;
            event.currentTarget=this;
            emitter.emit(event.eventType,event);
        }
    } 
}
const button=createDomElements();
button.addEventListener("submit",()=>{
    console.log("submitting...");

})
button.dispatchEvent({
    eventType:"submit",
    detail:"data submitted"
});

function handleclick(event){
    console.log("mouse clicked");
    console.log(event.eventType);
    console.log(`Message: ${event.detail}`);
}
button.addEventListener("click", event=>{ console.log("mouse clicked");
    console.log(event.eventType);
    console.log(`Message: ${event.detail}`);});
