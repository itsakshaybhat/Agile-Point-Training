const today = new Date();

let bday = new Date(today.getFullYear(), 10, 4);

if (today.getMonth() == 10 && today.getDate() > 4) {
    bday.setFullYear(bday.getFullYear() + 1);
}

let one_day = 1000 * 60 * 60 * 24;
let daysLeft = Math.ceil((bday.getTime() - today.getTime()) / one_day);

console.log(daysLeft + " days left until November 4th!");