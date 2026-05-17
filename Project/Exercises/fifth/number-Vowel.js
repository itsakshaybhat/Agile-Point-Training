const countLetters = 
    (str, letters = ['a', 'e', 'i', 'o', 'u']) =>{
        return str.split('').filter(s => letters.indexOf(s) > -1).length;
    }

console.log(countLetters('abcde'));
console.log(countLetters('abcde', ['b', 'c']));
