for ( let year = 2014; year <= 2050; year++) {
    let d = new Date(year, 0, 1); //year, month(0> 12), day
    if (d.getDay() === 1){
        console.log("1st january is being a sunday", year);
    }
}