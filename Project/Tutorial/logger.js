console.log(__filename);
console.log(__dirname);
var url = 'http://mylogger.io/log';

function log(message) {
    //sending http request
    return (name,rollno)=>{
        return `The name and rollNo is : ${name} ${rollno} and also printing the message ${message}`;
    }
        
    }

module.exports = log;
// module.exports.endPoint = url;
// console.log(module) ;