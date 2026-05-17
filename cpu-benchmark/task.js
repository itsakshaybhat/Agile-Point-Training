function heavyComputation(size) {
    let total = 0;
    for ( let i = 0 ; i< size; i++) {
        total += Math.sqrt(i) *Math.sin(i) * Math.cos(i);
    }
    return total;
}

module.exports = {
    heavyComputation,
}