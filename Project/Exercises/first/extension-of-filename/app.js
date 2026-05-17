//Write a program to get the extension of file name

const fileExtension = (str)=> {
    return str.slice(str.lastIndexOf('.'));
}

console.log(fileExtension("program.apex"));