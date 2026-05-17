// const date = date.now();
// console.log(date);

const today = new Date();
const day = today.getDay();
const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
console.log("Today is" , dayList[day],".");

//Time
let hour = today.getHours();
let min = today.getMinutes();
let sec = today.getSeconds();


const prepand = (hour>=12) ? "PM" : "AM" ;

hour = (hour >=12) ? hour - 12 : hour;

if (hour === 0 && prepand === ' PM ') {
    if (min === 0 && sec === 0) {
        hour = 12;
        prepand = "NOON";
    } else {
        hour = 12;
        prepand = "PM";
    }
}

if (hour === 0 && prepand === 'AM'){
    if (min === 0 && sec === 0){
        hour = 12;
        prepand = "MidNight";
    } else {
        hour = 12;
        prepand = " AM";
    }
}

console.log("Current Time: " , hour, prepand , ":", min,"minutes", ":" , sec, "seconds") ;