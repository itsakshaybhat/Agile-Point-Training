const EventEmitter = require('events');
var url = 'http://mylogger.io/log';

class Logger extends EventEmitter{
    log(msg) {
        console.log(msg);
        this.emit('messageLogged', {id: 1, url:''});
    }
}


module.exports = Logger; 