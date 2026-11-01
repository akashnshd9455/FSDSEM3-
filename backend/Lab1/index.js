import EventEmmiter from "node:events";
const myEmmiter = new EventEmmiter();
myEmmiter.on("greet", (teacher)=>{
    console.log(`class started by ${teacher}`);
});
myEmmiter.on("exit", (teacher)=>{
    console.log(`class finished by ${teacher}`);
    
});
myEmmiter.on("game", (teacher)=>{
    console.log(`game finished by ${teacher}`);
    
});
myEmmiter.emit("greet","Adarsh");
myEmmiter.emit("exit","Adarsh");
myEmmiter.emit("game","Adarsh");
