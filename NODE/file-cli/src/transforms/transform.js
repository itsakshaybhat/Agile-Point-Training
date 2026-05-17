import {Transform} from 'stream';

export class LineTransform extends Transform {
    constructor(){
        super();
        this.leftover = "" ;
    }
    _transform(chunk, encoding, callback){
        const data = this.leftover + chunk.toString();
        const lines = data.split('\n');
        this.leftover = lines.pop();

        for(let line of lines){
            this.push(line.toUpperCase() + "\n");
        }
        callback();
    }

    _flush(callback){
        if(this.leftover){
            this.push(this.leftover.toUpperCase() + "\n");
        }
        callback();
    }
}