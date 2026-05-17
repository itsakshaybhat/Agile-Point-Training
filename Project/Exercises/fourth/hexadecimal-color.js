const getrand = () => {
    return Math.floor(Math.random() * 16).toString(16);
}

const gethex = () =>{
    return '#' + Array.from({length:6}).map(getrand).join('');
}
console.log(gethex());